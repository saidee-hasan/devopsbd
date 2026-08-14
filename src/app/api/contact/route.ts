import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { companyInfo } from "@/data/portfolio";
import {
  CONTACT_REQUEST_TIMEOUT_MS,
  contactRequestSchema,
  getContactSubmissionIssue,
} from "@/lib/contact";
import { checkRateLimit, getClientKey, getRateLimitHeaders } from "@/lib/rate-limit";

export const runtime = "nodejs";

const RATE_LIMIT = 5;
const WINDOW_MS = 10 * 60_000;
const SMTP_TIMEOUT_MS = CONTACT_REQUEST_TIMEOUT_MS;

const requestStore = new Map<string, { count: number; resetAt: number }>();

function withTimeout<T>(promise: Promise<T>, timeoutMs: number) {
  return new Promise<T>((resolve, reject) => {
    const timeoutId = setTimeout(() => reject(new Error("Email request timed out.")), timeoutMs);
    promise.then(
      (value) => { clearTimeout(timeoutId); resolve(value); },
      (error) => { clearTimeout(timeoutId); reject(error); }
    );
  });
}

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function getRecipients(recipientList?: string) {
  const recipients = recipientList?.split(/[;,]/).map((v) => v.trim()).filter(Boolean);
  return recipients && recipients.length > 0 ? [...new Set(recipients)] : [companyInfo.email];
}

function getTransporter() {
  const host = process.env.SMTP_HOST?.trim();
  const port = Number(process.env.SMTP_PORT) || 465;
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();

  if (!host || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    connectionTimeout: 15000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
}

export async function POST(request: Request) {
  const rateLimitResult = checkRateLimit(requestStore, getClientKey(request), {
    limit: RATE_LIMIT,
    windowMs: WINDOW_MS,
  });
  const rateLimitHeaders = getRateLimitHeaders(RATE_LIMIT, rateLimitResult.remaining, rateLimitResult.resetAt);

  if (rateLimitResult.limited) {
    return NextResponse.json(
      { error: "Too many contact requests. Please wait a few minutes before trying again." },
      { status: 429, headers: { ...rateLimitHeaders, "Retry-After": String(rateLimitResult.retryAfter) } }
    );
  }

  try {
    const body = await request.json();
    const parsed = contactRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid contact form submission." },
        { status: 400, headers: rateLimitHeaders }
      );
    }

    const submissionIssue = getContactSubmissionIssue(parsed.data);
    if (submissionIssue) {
      if (submissionIssue.kind === "honeypot") {
        return NextResponse.json(
          { success: true, message: "Message sent successfully." },
          { headers: rateLimitHeaders }
        );
      }
      return NextResponse.json(
        { error: submissionIssue.message },
        { status: 400, headers: rateLimitHeaders }
      );
    }

    const transporter = getTransporter();
    const sender = process.env.CONTACT_EMAIL_FROM?.trim() || process.env.SMTP_USER?.trim();
    const recipients = getRecipients(process.env.CONTACT_EMAIL_TO);

    if (!transporter || !sender) {
      return NextResponse.json(
        { error: "Contact email is not configured on the server yet." },
        { status: 503, headers: rateLimitHeaders }
      );
    }

    const { name, email, reason, message } = parsed.data;
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

    const result = await withTimeout(
      transporter.sendMail({
        from: sender,
        to: recipients,
        replyTo: email,
        subject: `[Portfolio] ${reason} inquiry from ${name}`,
        text: [
          "New portfolio contact form submission",
          "",
          `Name: ${name}`,
          `Email: ${email}`,
          `Reason: ${reason}`,
          "",
          "Message:",
          message,
        ].join("\n"),
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827; max-width: 600px;">
            <div style="background: linear-gradient(135deg, #0A111C, #111A29); padding: 24px; border-radius: 12px 12px 0 0;">
              <h2 style="color: #D4F12A; margin: 0; font-size: 20px;">New Portfolio Contact</h2>
              <p style="color: #9CA3AF; margin: 8px 0 0; font-size: 13px;">devopsbd.com contact form submission</p>
            </div>
            <div style="padding: 24px; background: #ffffff; border: 1px solid #E5E7EB; border-top: 0; border-radius: 0 0 12px 12px;">
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr><td style="padding: 8px 0; font-weight: 600; color: #374151; width: 80px;">Name</td><td style="padding: 8px 0; color: #111827;">${escapeHtml(name)}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: 600; color: #374151;">Email</td><td style="padding: 8px 0; color: #111827;"><a href="mailto:${escapeHtml(email)}" style="color: #2563EB;">${escapeHtml(email)}</a></td></tr>
                <tr><td style="padding: 8px 0; font-weight: 600; color: #374151;">Reason</td><td style="padding: 8px 0; color: #111827;">${escapeHtml(reason)}</td></tr>
              </table>
              <div style="border-top: 1px solid #E5E7EB; padding-top: 16px;">
                <p style="font-weight: 600; color: #374151; margin: 0 0 8px;">Message:</p>
                <div style="padding: 16px; border-radius: 8px; background: #F9FAFB; border: 1px solid #E5E7EB; color: #374151; line-height: 1.7;">${safeMessage}</div>
              </div>
            </div>
            <p style="text-align: center; font-size: 11px; color: #9CA3AF; margin-top: 16px;">
              Sent from devopsbd.com contact form · <a href="https://devopsbd.com" style="color: #9CA3AF;">DevOpsBD Technologies Ltd</a>
            </p>
          </div>
        `,
      }),
      SMTP_TIMEOUT_MS
    );

    return NextResponse.json(
      { success: true, message: "Message sent successfully.", id: result.messageId },
      { headers: rateLimitHeaders }
    );
  } catch (error) {
    console.error("Contact form request failed", error);
    return NextResponse.json(
      { error: "Something went wrong while sending your message. Please try again later." },
      { status: 500, headers: rateLimitHeaders }
    );
  }
}
