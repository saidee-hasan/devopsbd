import { Metadata } from "next";
import { pageOg, pageTwitter } from "@/lib/seo/og";
import CareersPageClient from "./CareersPageClient";

export const metadata: Metadata = {
  title: "Careers & Open Positions — DevOpsBD Technologies",
  description:
    "Join the engineering team at DevOpsBD Technologies. Explore open developer, cloud architect, UI/UX designer, and QA roles.",
  openGraph: pageOg(
    "Careers & Open Positions — DevOpsBD Technologies",
    "Join the engineering team at DevOpsBD Technologies. Explore open developer, cloud architect, UI/UX designer, and QA roles.",
    "/careers",
  ),
  twitter: pageTwitter(
    "Careers & Open Positions — DevOpsBD Technologies",
    "Join the engineering team at DevOpsBD Technologies. Explore open developer, cloud architect, UI/UX designer, and QA roles.",
  ),
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return <CareersPageClient />;
}
