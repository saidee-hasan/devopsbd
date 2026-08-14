import { Metadata } from "next";
import { pageOg, pageTwitter } from "@/lib/seo/og";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About Us — DevOpsBD Technologies",
  description:
    "Learn about DevOpsBD Technologies, our global software engineering team, mission, cloud infrastructure expertise, and enterprise product capabilities.",
  openGraph: pageOg(
    "About Us — DevOpsBD Technologies",
    "Learn about DevOpsBD Technologies, our global software engineering team, mission, cloud infrastructure expertise, and enterprise product capabilities.",
    "/about",
  ),
  twitter: pageTwitter(
    "About Us — DevOpsBD Technologies",
    "Learn about DevOpsBD Technologies, our global software engineering team, mission, cloud infrastructure expertise, and enterprise product capabilities.",
  ),
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
