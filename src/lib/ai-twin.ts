import { companyInfo, services, companyPortfolio, stats, techStack } from "@/data/portfolio";

export const CHAT_MEMORY_WINDOW = 10;
export const CHAT_STORAGE_KEY = "devopsbd-ai-consultant-chat";
export const PROJECT_ANCHOR_PREFIX = "portfolio-";
export const WELCOME_MESSAGE = "Hi — I’m the DevOpsBD AI Tech Consultant. I can help you evaluate project scopes, estimate software development timelines, recommend technology stack solutions, and explain our 12 core services. You can also [explore services](#services) or [request a consultation](#contact).";

type ConversationWindowMessage = {
  content: string;
  id?: string;
  role?: "user" | "assistant";
  sender?: "user" | "ai";
};

function getConversationWindowRole(message: ConversationWindowMessage) {
  if (message.id === "welcome") return null;
  if (message.role === "user" || message.role === "assistant") return message.role;
  if (message.sender === "user" || message.sender === "ai") return message.sender;
  return null;
}

export function trimConversationHistory<T extends ConversationWindowMessage>(
  messages: T[],
  maxMessages = CHAT_MEMORY_WINDOW
) {
  if (maxMessages <= 0) return [];

  const turns: T[][] = [];
  let currentTurn: T[] = [];

  messages.forEach((message) => {
    const role = getConversationWindowRole(message);

    if (!role) return;

    if (role === "user") {
      if (currentTurn.length > 0) {
        turns.push(currentTurn);
      }

      currentTurn = [message];
      return;
    }

    if (currentTurn.length === 0) return;
    currentTurn.push(message);
  });

  if (currentTurn.length > 0) {
    turns.push(currentTurn);
  }

  const trimmed: T[] = [];

  for (let index = turns.length - 1; index >= 0; index -= 1) {
    const turn = turns[index];

    if (trimmed.length + turn.length > maxMessages) {
      break;
    }

    trimmed.unshift(...turn);
  }

  return trimmed;
}

export function getProjectAnchor(slug: string) {
  return `#${PROJECT_ANCHOR_PREFIX}${slug}`;
}

export function normalizeText(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const projectMatchers = companyPortfolio.map((project) => ({
  project,
  phrases: Array.from(
    new Set(
      [
        normalizeText(project.title),
        normalizeText(project.slug.replace(/-/g, " ")),
        ...project.title.split(/[-:|\u2013\u2014]/).map((part) => normalizeText(part)),
      ].filter((phrase) => phrase.length > 0)
    )
  ),
}));

const projectAnchorMap = new Map(companyPortfolio.map((project) => [getProjectAnchor(project.slug), project]));

const companyStats = stats.map((stat) => `${stat.value}${stat.suffix} ${stat.label}`).join(", ");

const serviceContext = services
  .map((s) => `- ${s.title}: ${s.description} (Features: ${s.features.join(", ")})`)
  .join("\n");

const portfolioContext = companyPortfolio
  .map(
    (project) =>
      `- ${project.title} (${project.category})\n  - Description: ${project.description}\n  - Impact: ${project.impact}\n  - Tech: ${project.tech.join(", ")}\n  - Internal link: ${getProjectAnchor(project.slug)}`
  )
  .join("\n");

const techStackContext = techStack
  .map((cat) => `- ${cat.category}: ${cat.items.map((i) => i.name).join(", ")}`)
  .join("\n");

export const PORTFOLIO_CONTEXT = `
Company: DevOpsBD Technologies (${companyInfo.name})
Tagline: ${companyInfo.tagline}
Subhead: ${companyInfo.heroSubhead}
Email: ${companyInfo.email}
Sales Email: ${companyInfo.salesEmail}
Phone: ${companyInfo.phone} | US: ${companyInfo.phoneUS}
Address: ${companyInfo.address}

Company Stats:
${companyStats}

12 Core Services:
${serviceContext}

Enterprise Portfolio Case Studies:
${portfolioContext}

Technology Stack & Infrastructure:
${techStackContext}

Navigation links:
- Consultation / Contact section: #contact
- Services section: #services
- Solutions section: #solutions
- Portfolio section: #portfolio
- Pricing section: #pricing
`;

export const PORTFOLIO_LINK_GUIDE = `
When links would help the user, use these markdown links directly in the answer:
- [Request Consultation](#contact)
- [Explore Services](#services)
- [View Solutions](#solutions)
- [Browse Portfolio](#portfolio)
- [View Pricing](#pricing)
${companyPortfolio
  .map(
    (project) =>
      `- [View ${project.title}](${getProjectAnchor(project.slug)})`
  )
  .join("\n")}
`;

export function findMatchingProjects(text: string) {
  const corpus = normalizeText(text);

  return projectMatchers
    .filter(({ phrases }) => phrases.some((phrase) => phrase.length > 0 && corpus.includes(phrase)))
    .map(({ project }) => project)
    .slice(0, 2);
}

function getAnchorLabel(href: string) {
  if (href === "#contact") return "Contact section";
  if (href === "#services") return "Services section";
  if (href === "#portfolio") return "Portfolio section";

  const project = projectAnchorMap.get(href);
  if (project) return project.title;

  return href.replace(/^#/, "");
}

function normalizeGeneratedLinks(response: string) {
  let next = response;

  next = next.replace(/\[(#(?:portfolio-[a-z0-9-]+|portfolio|services|contact))\]/gi, (_, href: string) => {
    return `[${getAnchorLabel(href)}](${href})`;
  });

  return next;
}

type InlineLink = {
  href: string;
  label: string;
  kind: "linkedin" | "github" | "contact" | "portfolio" | "services" | "project";
};

function buildInlineLinkSentence(links: InlineLink[]) {
  if (links.length === 0) return "";

  const clauses = links.map((link) => {
    switch (link.kind) {
      case "linkedin":
        return `view DevOpsBD [LinkedIn](${link.href})`;
      case "github":
        return `browse DevOpsBD [GitHub](${link.href})`;
      case "contact":
        return `jump to [Contact & Consultation](${link.href})`;
      case "portfolio":
        return `browse [Company Portfolio](${link.href})`;
      case "services":
        return `explore [Core Services](${link.href})`;
      case "project":
        return `view [${link.label}](${link.href})`;
      default:
        return `open [${link.label}](${link.href})`;
    }
  });

  if (clauses.length === 1) {
    return `You can ${clauses[0]} here.`;
  }

  if (clauses.length === 2) {
    return `You can ${clauses[0]} and ${clauses[1]} here.`;
  }

  const lastClause = clauses[clauses.length - 1];
  return `You can ${clauses.slice(0, -1).join(", ")}, and ${lastClause} here.`;
}

export function appendContextualLinks(userMessage: string, aiResponse: string) {
  const response = normalizeGeneratedLinks(aiResponse.trim());
  const normalizedUserMessage = normalizeText(userMessage);
  const links: InlineLink[] = [];
  const asksForLinkedIn = /(linkedin|linked in)/i.test(normalizedUserMessage);
  const asksForGitHub = /(github|git hub)/i.test(normalizedUserMessage);
  const asksForContactSection = /(contact section|open contact|consultation|inquiry)/i.test(normalizedUserMessage);
  const asksForPortfolioSection = /(portfolio|case study|projects)/i.test(normalizedUserMessage);
  const asksForServicesSection = /(services|what do you offer|what do you do)/i.test(normalizedUserMessage);

  const addLink = (link: InlineLink) => {
    const { href } = link;
    if (response.includes(href) || links.some((link) => link.href === href)) return;
    links.push(link);
  };

  if (asksForLinkedIn) {
    addLink({ label: "LinkedIn", href: companyInfo.social.linkedin, kind: "linkedin" });
  }

  if (asksForGitHub) {
    addLink({ label: "GitHub", href: companyInfo.social.github, kind: "github" });
  }

  if (asksForContactSection) {
    addLink({ label: "Contact section", href: "#contact", kind: "contact" });
  }

  if (asksForPortfolioSection) {
    addLink({ label: "Portfolio section", href: "#portfolio", kind: "portfolio" });
  }

  if (asksForServicesSection) {
    addLink({ label: "Services section", href: "#services", kind: "services" });
  }

  const matchedProjects = findMatchingProjects(userMessage);

  matchedProjects.forEach((project) => {
    addLink({ label: project.title, href: getProjectAnchor(project.slug), kind: "project" });
  });

  if (links.length === 0) return response;

  const inlineLinkSentence = buildInlineLinkSentence(links);
  return inlineLinkSentence ? `${response}\n\n${inlineLinkSentence}` : response;
}
