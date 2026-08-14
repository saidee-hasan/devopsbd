import { Metadata } from "next";
import { pageOg, pageTwitter } from "@/lib/seo/og";
import TeamPageClient from "./TeamPageClient";

export const metadata: Metadata = {
  title: "Engineering Team & Leadership — DevOpsBD Technologies",
  description:
    "Meet the senior software engineers, cloud architects, UI/UX designers, and DevOps leads at DevOpsBD Technologies.",
  openGraph: pageOg(
    "Engineering Team & Leadership — DevOpsBD Technologies",
    "Meet the senior software engineers, cloud architects, UI/UX designers, and DevOps leads at DevOpsBD Technologies.",
    "/team",
  ),
  twitter: pageTwitter(
    "Engineering Team & Leadership — DevOpsBD Technologies",
    "Meet the senior software engineers, cloud architects, UI/UX designers, and DevOps leads at DevOpsBD Technologies.",
  ),
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  return <TeamPageClient />;
}
