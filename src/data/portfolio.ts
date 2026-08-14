export const companyInfo = {
  name: "DevOpsBD",
  brandName: "DevOpsBD",
  fullName: "DevOpsBD Technologies Ltd",
  tagline: "Building Modern Digital Products for Businesses Worldwide.",
  heroHeadline: "Transforming Ideas Into Powerful Digital Solutions",
  heroSubhead:
    "DevOpsBD Technologies Ltd helps startups and businesses build scalable websites, mobile applications, cloud infrastructure, modern UI/UX designs, and enterprise software solutions.",
  email: "contact@devopsbd.com",
  salesEmail: "sales@devopsbd.com",
  phone: "+880 1700-000000",
  phoneUS: "+1 (555) 019-2834",
  address: "Level 8, Tech Tower, Gulshan-2, Dhaka 1212, Bangladesh",
  globalHubs: ["Dhaka, Bangladesh", "London, UK", "New York, USA", "Dubai, UAE"],
  targetMarkets: [
    "Startups",
    "Businesses",
    "Enterprise",
    "International Clients",
    "Bangladesh Market",
    "European Market",
    "Middle East",
    "USA",
  ],
  social: {
    linkedin: "https://linkedin.com/company/devopsbd",
    github: "https://github.com/devopsbd",
    twitter: "https://twitter.com/devopsbd",
    facebook: "https://facebook.com/devopsbd",
    youtube: "https://youtube.com/@devopsbd",
  },
};

// Backwards compatibility alias
export const personalInfo = {
  name: companyInfo.fullName,
  role: "Software Engineering & Cloud Solutions Firm",
  tagline: companyInfo.tagline,
  focus: "Delivering modern web applications, mobile apps, cloud infrastructure, and enterprise software.",
  email: companyInfo.email,
  linkedin: companyInfo.social.linkedin,
  github: companyInfo.social.github,
  resumeUrl: "#contact",
};

export const stats = [
  { value: 4, suffix: "+", label: "Years Experience" },
  { value: 15, suffix: "+", label: "Projects Completed" },
  { value: 80, suffix: "+", label: "Happy Clients" },
  { value: 99, suffix: "%", label: "Success Rate" },
];

export const aboutCompany = {
  title: "About DevOpsBD Technologies",
  summary:
    "DevOpsBD Technologies is a full-service software development company delivering modern digital solutions for businesses worldwide. We specialise in building scalable web applications, mobile apps, cloud infrastructure, UI/UX design, DevOps automation, and enterprise software. Our mission is to help companies grow through technology with clean architecture, high performance, security, and outstanding user experience.",
  mission:
    "To empower startups, growth-stage businesses, and global enterprises with world-class engineering, bulletproof infrastructure, and intuitive digital product experiences.",
  highlights: [
    "Full-Service Digital Product Engineering from ideation to production cloud operations.",
    "Certified engineers in React, Next.js, Node.js, Kubernetes, AWS, and Cloud Architecture.",
    "Proven track record serving clients across Bangladesh, Europe, the Middle East, and North America.",
    "Strict adherence to security, clean architecture, automated testing, and CI/CD pipelines.",
    "Agile development methodology with 24/7 client communication and milestone transparency.",
    "Dedicated post-launch support, monitoring, scaling, and continuous product enhancement.",
  ],
};

// Backwards compatibility alias
export const about = {
  summary: aboutCompany.summary,
  highlights: aboutCompany.highlights,
};

export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  cta: string;
}

export const services: ServiceItem[] = [
  {
    id: "website-development",
    icon: "Globe",
    title: "Website Development",
    description: "High-performance, responsive, and SEO-optimized corporate websites engineered for conversion.",
    features: ["Custom Next.js / React Frontend", "Pixel-Perfect Responsive Layouts", "SEO & Speed Optimization (100/100)", "CMS Integration (Headless/Strapi)"],
    cta: "Build Your Website",
  },
  {
    id: "web-app-development",
    icon: "Code2",
    title: "Web Application Development",
    description: "Scalable, feature-rich web applications built with modern frontend and backend architectures.",
    features: ["Single Page & Server-Rendered Apps", "Real-Time WebSockets & Dashboards", "Role-Based Access & Authentication", "Clean API & Component Architecture"],
    cta: "Launch Web App",
  },
  {
    id: "ui-ux-design",
    icon: "Palette",
    title: "UI/UX Design",
    description: "User-centric interface design, interactive wireframes, and design systems built for engagement.",
    features: ["User Research & Journey Mapping", "Interactive Figma Prototypes", "Design System & Pattern Library", "Accessibility (WCAG 2.1) Compliance"],
    cta: "Design Products",
  },
  {
    id: "mobile-app-development",
    icon: "Smartphone",
    title: "Mobile App Development",
    description: "Native and cross-platform mobile apps for iOS and Android delivering smooth native feel.",
    features: ["React Native & Flutter Solutions", "Offline Storage & Syncing", "Push Notifications & Analytics", "App Store & Play Store Publishing"],
    cta: "Build Mobile App",
  },
  {
    id: "devops-cloud",
    icon: "Cloud",
    title: "DevOps & Cloud Solutions",
    description: "Automated deployment pipelines, cloud architecture design, and infrastructure management.",
    features: ["Docker & Kubernetes Orchestration", "CI/CD Pipelines (GitHub Actions)", "AWS, DigitalOcean, Cloudflare Setup", "24/7 Infrastructure Monitoring"],
    cta: "Optimize Cloud",
  },
  {
    id: "software-engineering",
    icon: "Cpu",
    title: "Software Engineering",
    description: "Custom enterprise software systems engineered for complex business operations and high reliability.",
    features: ["Microservices Architecture", "Scalable System Design", "Automated Testing & Code Quality", "Database Modeling & Optimization"],
    cta: "Engineered Solutions",
  },
  {
    id: "api-development",
    icon: "Network",
    title: "API Development",
    description: "Secure, high-throughput RESTful and GraphQL APIs connecting complex digital ecosystems.",
    features: ["OpenAPI / Swagger Documentation", "OAuth2 & JWT Token Security", "Rate Limiting & Caching", "Third-Party Service Integration"],
    cta: "Build APIs",
  },
  {
    id: "saas-development",
    icon: "Layers",
    title: "SaaS Development",
    description: "End-to-end Multi-Tenant SaaS platform creation with subscription billing and client management.",
    features: ["Multi-Tenant Architecture", "Stripe & SSLCommerz Payment Gateway", "Usage Analytics & Quotas", "Tenant Dashboard & Management"],
    cta: "Build SaaS",
  },
  {
    id: "e-commerce-solutions",
    icon: "ShoppingCart",
    title: "E-Commerce Solutions",
    description: "Custom e-commerce platforms and storefronts engineered for fast checkout and conversion.",
    features: ["Custom Shopping Cart & Checkout", "Multi-Currency & Regional Payments", "Inventory & Order Management", "Headless Shopify / Next.js Commerce"],
    cta: "Start E-Commerce",
  },
  {
    id: "business-automation",
    icon: "Zap",
    title: "Business Automation",
    description: "Automate internal workflows, data pipelines, and manual tasks to drastically reduce operational costs.",
    features: ["Workflow Automation Scripts", "AI & LLM Integration", "Automated Data Processing", "CRM & ERP Integrations"],
    cta: "Automate Business",
  },
  {
    id: "custom-software",
    icon: "Terminal",
    title: "Custom Software Development",
    description: "Tailor-made software applications engineered from the ground up to solve unique business challenges.",
    features: ["Bespoke Requirements Engineering", "High Security & Compliance", "Legacy Software Refactoring", "Full Source Code Ownership"],
    cta: "Get Custom Software",
  },
  {
    id: "maintenance-support",
    icon: "ShieldCheck",
    title: "Maintenance & Support",
    description: "Proactive maintenance, security patching, cloud optimization, and continuous SLA support.",
    features: ["24/7 Server SLA Monitoring", "Security Audits & Patching", "Performance Optimization", "Dedicated Maintenance Team"],
    cta: "Get Support",
  },
  {
    id: "website-rebuild",
    icon: "RefreshCw",
    title: "Website Rebuild & Revamp",
    description: "Modernize your outdated website with high-performance frameworks, fresh UI/UX, and better SEO.",
    features: [
      "Complete UI/UX Redesign",
      "Performance & SEO Overhaul",
      "Migration to Modern Frameworks (Next.js)",
      "Mobile-First Optimization"
    ],
    cta: "Rebuild Website",
  },
  {
    id: "tech-migration",
    icon: "Rocket",
    title: "Technology Stack Migration",
    description: "Upgrade legacy codebases and migrate to scalable, modern cloud technologies and enterprise frameworks.",
    features: [
      "Legacy System Refactoring",
      "Database Migration & Optimization",
      "Transition to Cloud Infrastructure",
      "Zero-Downtime Deployment Strategies"
    ],
    cta: "Upgrade Tech Stack",
  },
];

export interface TechnologyCategory {
  category: string;
  description: string;
  items: { name: string; icon: string; tag: string }[];
}

export const techStack: TechnologyCategory[] = [
  {
    category: "Frontend",
    description: "Modern client-side frameworks for lightning-fast responsive UIs.",
    items: [
      { name: "React", icon: "react", tag: "UI Framework" },
      { name: "Next.js", icon: "nextjs", tag: "SSR & App Router" },
      { name: "TypeScript", icon: "typescript", tag: "Type Safety" },
      { name: "Tailwind CSS", icon: "tailwind", tag: "Styling System" },
      { name: "Redux", icon: "redux", tag: "State Management" },
    ],
  },
  {
    category: "Backend",
    description: "High-throughput server environments and API architectures.",
    items: [
      { name: "Node.js", icon: "nodejs", tag: "Runtime Environment" },
      { name: "Express", icon: "express", tag: "REST API Framework" },
      { name: "NestJS", icon: "nestjs", tag: "Enterprise Backend" },
      { name: "GraphQL", icon: "graphql", tag: "Query Language" },
    ],
  },
  {
    category: "Database",
    description: "Reliable SQL, NoSQL, and caching storage solutions.",
    items: [
      { name: "PostgreSQL", icon: "postgresql", tag: "Relational Database" },
      { name: "MongoDB", icon: "mongodb", tag: "Document Database" },
      { name: "Redis", icon: "redis", tag: "In-Memory Cache" },
      { name: "Prisma", icon: "prisma", tag: "TypeScript ORM" },
    ],
  },
  {
    category: "Cloud & Container",
    description: "Production infrastructure, containerization, and edge networks.",
    items: [
      { name: "Docker", icon: "docker", tag: "Containerization" },
      { name: "Kubernetes", icon: "kubernetes", tag: "Orchestration" },
      { name: "AWS", icon: "aws", tag: "Cloud Infrastructure" },
      { name: "DigitalOcean", icon: "digitalocean", tag: "Cloud Hosting" },
      { name: "Cloudflare", icon: "cloudflare", tag: "Edge & CDN" },
    ],
  },
  {
    category: "CI/CD & DevOps",
    description: "Automated pipelines, infrastructure as code, and monitoring.",
    items: [
      { name: "GitHub Actions", icon: "github", tag: "Automation Pipeline" },
      { name: "Jenkins", icon: "jenkins", tag: "Build Server" },
      { name: "Terraform", icon: "terraform", tag: "Infrastructure as Code" },
    ],
  },
  {
    category: "Mobile Apps",
    description: "Cross-platform and native mobile application frameworks.",
    items: [
      { name: "React Native", icon: "reactnative", tag: "Cross-Platform" },
      { name: "Expo", icon: "expo", tag: "App Framework" },
      { name: "Swift", icon: "swift", tag: "Native iOS" },
      { name: "Kotlin", icon: "kotlin", tag: "Native Android" },
    ],
  },
];

// Backwards compatibility alias
export const skillCategories = techStack.map((ts) => ({
  title: ts.category,
  description: ts.description,
  skills: ts.items.map((i) => i.name),
}));

export const portfolioCategories = [
  "All",
  "Business Websites",
  "E-Commerce",
  "ERP",
  "CRM",
  "Healthcare",
  "Education",
  "Logistics",
  "Fintech",
  "Real Estate",
  "Mobile Apps",
  "Dashboard",
  "Admin Panel",
  "Landing Pages",
];

export interface CompanyProject {
  slug: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  impact: string;
  client: string;
  timeline: string;
  complexity: string;
  tech: string[];
  images: string[];
  imageLinks?: string[];
  github?: string;
  live?: string;
  metrics?: { label: string; value: string }[];
}

export const companyPortfolio: CompanyProject[] = [
  {
    slug: "codenex-cloud-saas",
    title: "CodeNex Enterprise AI Builder Platform",
    category: "Dashboard",
    summary: "An enterprise AI-driven codegen SaaS platform enabling full React application generation with live Kubernetes preview pods.",
    description: "Designed and engineered an enterprise AI Builder SaaS platform supporting concurrent streaming code generation, distributed file persistence, automated build pods, multi-tenant billing, and granular RBAC controls.",
    impact: "Scaled to support 10,000+ active user streams with sub-2-second preview initialization and 99.9% platform uptime.",
    client: "Fintech & Developer Tooling Enterprise",
    timeline: "6 Months Engineering Cycle",
    complexity: "Distributed microservices, Server-Sent Events, Kubernetes preview pods, MinIO, and Stripe integration.",
    images: [
      "/images/projects/codenex/landing-page-dark.png",
      "/images/projects/codenex/landing-page-light.png",
      "/images/projects/codenex/system-architecture-dark.png",
      "/images/projects/codenex/dashboard-overview-dark.png",
      "/images/projects/codenex/project-builder-dark.png",
    ],
    tech: ["Next.js", "TypeScript", "Spring Boot", "Kubernetes", "Docker", "PostgreSQL", "Redis", "Stripe"],
    live: "https://www.devopsbd.com/case-studies/codenex",
    metrics: [
      { label: "Uptime", value: "99.99%" },
      { label: "Active Streams", value: "10K+" },
      { label: "Preview Latency", value: "<1.8s" },
    ],
  },
  {
    slug: "fintech-global-pay",
    title: "OmniPay Global Fintech & Remittance Platform",
    category: "Fintech",
    summary: "A high-security cross-border digital wallet and remittance payment gateway serving European and Asian markets.",
    description: "Built a compliance-first fintech platform supporting multi-currency digital wallets, real-time FX exchange calculations, automated KYC/AML verification workflows, and instant bank transfers.",
    impact: "Processed over $45M in transaction volume within the first year with zero security incidents.",
    client: "Global Remittance Corp (UK & BD)",
    timeline: "8 Months Full Lifecycle",
    complexity: "Bank-level PCI-DSS security, HSM encryption, micro-transactions engine, and automated KYC processing.",
    images: [
      "/images/projects/codenex-proxy/dashbord.png",
      "/images/projects/codenex-proxy/providers.png",
      "/images/projects/codenex-proxy/api-docs.png",
    ],
    tech: ["React", "Node.js", "NestJS", "PostgreSQL", "Redis", "Docker", "AWS"],
    live: "https://www.devopsbd.com/case-studies/omnipay",
    metrics: [
      { label: "Processed Volume", value: "$45M+" },
      { label: "Tx Speed", value: "<800ms" },
      { label: "Security Rating", value: "PCI-DSS Level 1" },
    ],
  },
  {
    slug: "healthflow-telehealth",
    title: "HealthFlow Smart Patient Portal & Telehealth ERP",
    category: "Healthcare",
    summary: "HIPAA-compliant healthcare ERP system connecting patients, doctors, labs, and pharmacies in real-time.",
    description: "Developed an integrated healthcare ecosystem featuring encrypted video consultations, electronic health record (EHR) management, automated prescription generation, and smart lab report dispatch.",
    impact: "Adopted by 35+ medical clinics and hospitals, streamlining 120,000+ annual patient appointments.",
    client: "HealthCare International Group",
    timeline: "5 Months Engineering",
    complexity: "HIPAA compliance, real-time WebRTC video, end-to-end encryption, and multi-branch hospital syncing.",
    images: [
      "/images/projects/serenify/landing-page-light.png",
      "/images/projects/serenify/dashboard-light.png",
      "/images/projects/serenify/chat-light.png",
    ],
    tech: ["Next.js", "TypeScript", "GraphQL", "Node.js", "PostgreSQL", "WebRTC", "Docker"],
    live: "https://www.devopsbd.com/case-studies/healthflow",
    metrics: [
      { label: "Clinics Onboarded", value: "35+" },
      { label: "Appointments", value: "120K+" },
      { label: "Compliance", value: "HIPAA Certified" },
    ],
  },
  {
    slug: "logix-fleet-crm",
    title: "LogixMove Enterprise Logistics & ERP Platform",
    category: "Logistics",
    summary: "Real-time fleet tracking, route optimization, and supply chain ERP platform for regional logistics providers.",
    description: "Engineered an end-to-end logistics platform incorporating GPS fleet tracking, automated dispatch algorithms, automated invoice generation, driver mobile applications, and warehouse inventory control.",
    impact: "Reduced client fuel costs by 22% and increased delivery dispatch efficiency by 38%.",
    client: "LogixMove Transport Solutions",
    timeline: "7 Months Engineering",
    complexity: "High-density geospatial tracking, route calculation engines, mobile app integration, and inventory sync.",
    images: [
      "/images/projects/codenex-proxy/dashbord.png",
      "/images/projects/codenex-proxy/providers.png",
    ],
    tech: ["React Native", "Next.js", "Express", "MongoDB", "Redis", "Google Maps SDK", "AWS"],
    live: "https://www.devopsbd.com/case-studies/logixmove",
    metrics: [
      { label: "Fuel Saved", value: "22%" },
      { label: "Vehicles Managed", value: "1,500+" },
      { label: "Daily Orders", value: "25K+" },
    ],
  },
  {
    slug: "estate-prime-portal",
    title: "EstatePrime Luxury Real Estate Portal & CRM",
    category: "Real Estate",
    summary: "Premium real estate listing platform with 3D virtual tours, lead management CRM, and automated agent tools.",
    description: "Built a high-converting real estate portal with interactive map filtering, 360-degree virtual property tours, mortgage calculators, and an automated lead distribution CRM for real estate agencies.",
    impact: "Boosted property inquiry conversions by 45% and reduced agent follow-up latency to under 10 minutes.",
    client: "EstatePrime Middle East & Asia",
    timeline: "4 Months Build",
    complexity: "Mapbox integration, 360 VR rendering, multi-channel lead routing, and dynamic PDF property brochures.",
    images: [
      "/images/projects/resumefit/landing-page-light.png",
      "/images/projects/resumefit/landing-page-dark.png",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "Cloudflare"],
    live: "https://www.devopsbd.com/case-studies/estateprime",
    metrics: [
      { label: "Conversion Lift", value: "+45%" },
      { label: "Listings Hosted", value: "12,000+" },
      { label: "Monthly Users", value: "450K" },
    ],
  },
  {
    slug: "shophive-ecommerce-platform",
    title: "ShopHive Headless E-Commerce Platform",
    category: "E-Commerce",
    summary: "Ultra-fast headless e-commerce store with multi-vendor marketplace functionality and sub-second page loads.",
    description: "Developed a headless e-commerce engine leveraging Next.js App Router, Tailwind CSS, Redis caching, and custom payment integrations (SSLCommerz, Stripe, PayPal).",
    impact: "Achieved 99/100 Lighthouse performance score and handled 50,000 concurrent peak shoppers during Black Friday sales.",
    client: "ShopHive Retail Networks",
    timeline: "5 Months Engineering",
    complexity: "Headless architecture, inventory locks, instant search index, multi-vendor payout automation.",
    images: [
      "/images/projects/codenex-images/generation-workspace-dark.png",
      "/images/projects/codenex-images/login-page-dark.png",
    ],
    tech: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Redis", "Tailwind CSS", "Docker"],
    live: "https://www.devopsbd.com/case-studies/shophive",
    metrics: [
      { label: "Lighthouse Score", value: "99/100" },
      { label: "Peak Traffic", value: "50K Users" },
      { label: "Order Latency", value: "<400ms" },
    ],
  },
];

// Backwards compatibility alias
export const projects = companyPortfolio;

export interface WhyChooseUsItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export const whyChooseUs: WhyChooseUsItem[] = [
  {
    id: "experienced-engineers",
    icon: "Users",
    title: "Experienced Engineers",
    description: "Our senior software developers, cloud architects, and UI designers average 6+ years of production experience.",
  },
  {
    id: "modern-technology",
    icon: "Cpu",
    title: "Modern Technology",
    description: "We leverage modern frameworks like Next.js 15, React 19, TypeScript, Node.js, Docker, and Kubernetes.",
  },
  {
    id: "scalable-architecture",
    icon: "Layers",
    title: "Scalable Architecture",
    description: "Clean code practices, modular microservices, and elastic cloud setups built to scale effortlessly with growth.",
  },
  {
    id: "fast-delivery",
    icon: "Zap",
    title: "Fast Delivery",
    description: "Agile sprint workflows, continuous integration, and rapid prototyping ensure rapid time-to-market.",
  },
  {
    id: "support-24-7",
    icon: "Clock",
    title: "24/7 Support",
    description: "Round-the-clock server SLA monitoring, continuous maintenance, and instant emergency response teams.",
  },
  {
    id: "affordable-pricing",
    icon: "DollarSign",
    title: "Affordable Pricing",
    description: "Competitive global rates delivering Silicon Valley engineering quality without inflated agency margins.",
  },
  {
    id: "clean-code",
    icon: "CheckCircle2",
    title: "Clean Code",
    description: "Well-documented, fully typed, tested, and maintainable codebase adhering to SOLID principles.",
  },
  {
    id: "seo-optimized",
    icon: "TrendingUp",
    title: "SEO Optimized",
    description: "Built-in technical SEO, structured JSON-LD schema, server rendering, and 100/100 Core Web Vitals targets.",
  },
  {
    id: "secure-development",
    icon: "ShieldAlert",
    title: "Secure Development",
    description: "Enterprise security standards, OWASP top 10 protection, role-based access control, and data encryption.",
  },
  {
    id: "high-performance",
    icon: "Activity",
    title: "High Performance",
    description: "Sub-second load times, optimized bundle sizes, automated edge caching, and stress-tested database queries.",
  },
];

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  deliverables: string[];
}

export const workProcess: ProcessStep[] = [
  {
    step: "01",
    title: "Discovery",
    description: "We understand your business goals, user requirements, market challenges, and project vision before development begins.",
    deliverables: ["Business Analysis", "Project Roadmap", "Requirement Specification"],
  },
  {
    step: "02",
    title: "System Architecture",
    description: "We design a scalable, secure, and high-performance software architecture to ensure long-term reliability and future growth.",
    deliverables: ["System Architecture Diagram", "Technology Stack Selection", "Infrastructure Blueprint"],
  },
  {
    step: "03",
    title: "Database Design",
    description: "We create optimized database structures, relationships, indexing strategies, and data models for maximum performance and scalability.",
    deliverables: ["ER Diagram", "Database Schema", "Data Relationships"],
  },
  {
    step: "04",
    title: "UI/UX Design",
    description: "We craft modern, responsive, and intuitive interfaces with interactive prototypes and reusable design systems.",
    deliverables: ["Figma Design", "High-Fidelity UI", "Interactive Prototype"],
  },
  {
    step: "05",
    title: "Development",
    description: "Our engineers build secure frontend, backend, APIs, authentication systems, and cloud-ready applications using modern technologies.",
    deliverables: ["Production-Ready Code", "REST/GraphQL APIs", "Modular Components"],
  },
  {
    step: "06",
    title: "Testing & Quality Assurance",
    description: "Every feature is tested for quality, security, compatibility, accessibility, and performance before launch.",
    deliverables: ["QA Reports", "Security Audit", "Performance Optimization"],
  },
  {
    step: "07",
    title: "Deployment & DevOps",
    description: "We deploy your application with CI/CD pipelines, Docker containers, cloud infrastructure, SSL security, and monitoring.",
    deliverables: ["Cloud Deployment", "CI/CD Pipeline", "DNS & SSL Configuration"],
  },
  {
    step: "08",
    title: "Support & Optimization",
    description: "After launch, we continuously monitor, secure, optimize, and enhance your application for long-term success.",
    deliverables: ["24/7 Monitoring", "Security Updates", "Feature Enhancements"],
  },
];

export interface TeamMember {
  name: string;
  role: string;
  department: string;
  experience: string;
  skills: string[];
  avatar: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: "Saidee Hasan",
    role: "Founder & Chief Executive Officer (CEO)",
    department: "Leadership",
    experience: "10+ Years",
    skills: ["Executive Leadership", "Cloud Architecture", "Product Strategy", "Enterprise Engineering"],
    avatar: "/images/ceo-saidee-hasan.jpg",
  },
  {
    name: "Tanvir Rahman",
    role: "Chief Technology Officer & Lead Architect",
    department: "Leadership",
    experience: "10+ Years",
    skills: ["Cloud Architecture", "Kubernetes", "Distributed Systems", "Node.js"],
    avatar: "/images/team/tanvir.png",
  },
  {
    name: "Nusrat Jahan",
    role: "Head of Product & UI/UX Design",
    department: "Leadership",
    experience: "8+ Years",
    skills: ["Design Systems", "Figma", "User Research", "Product Strategy"],
    avatar: "/images/team/nusrat.png",
  },
  {
    name: "Arif Hossain",
    role: "Principal DevOps & Cloud Engineer",
    department: "DevOps Engineers",
    experience: "7+ Years",
    skills: ["AWS", "Docker", "Terraform", "CI/CD", "Linux"],
    avatar: "/images/team/arif.png",
  },
  {
    name: "Sabrina Islam",
    role: "Senior Frontend Lead Engineer",
    department: "Frontend Developers",
    experience: "6+ Years",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Performance"],
    avatar: "/images/team/sabrina.png",
  },
  {
    name: "Mahmudul Hasan",
    role: "Senior Backend Systems Engineer",
    department: "Backend Developers",
    experience: "6+ Years",
    skills: ["Node.js", "NestJS", "PostgreSQL", "Redis", "GraphQL"],
    avatar: "/images/team/mahmudul.png",
  },
  {
    name: "Farhan Ahmed",
    role: "Full Stack Software Engineer",
    department: "Software Engineers",
    experience: "5+ Years",
    skills: ["MERN Stack", "Prisma", "REST APIs", "Microservices"],
    avatar: "/images/team/farhan.png",
  },
  {
    name: "Ayesha Siddiqua",
    role: "Lead QA & Automation Engineer",
    department: "QA Engineers",
    experience: "5+ Years",
    skills: ["Cypress", "Jest", "Security Auditing", "Load Testing"],
    avatar: "/images/team/ayesha.png",
  },
  {
    name: "Zubair Al-Mamun",
    role: "Senior Engineering Project Manager",
    department: "Project Managers",
    experience: "7+ Years",
    skills: ["Agile/Scrum", "Client Success", "Sprint Planning", "Jira"],
    avatar: "/images/team/zubair.png",
  },
];

export const teamDepartments = [
  "All",
  "Leadership",
  "Software Engineers",
  "Frontend Developers",
  "Backend Developers",
  "UI/UX Designers",
  "DevOps Engineers",
  "QA Engineers",
  "Project Managers",
];

export interface Experience {
  company: string;
  role: string;
  period: string;
  type: "work" | "education";
  summary: string;
  bullets: string[];
}

// Backwards compatibility alias
export const experiences: Experience[] = teamMembers.map((tm) => ({
  company: "DevOpsBD Technologies",
  role: tm.role,
  period: tm.experience,
  type: "work" as const,
  summary: `${tm.name} leads ${tm.department} at DevOpsBD Technologies.`,
  bullets: tm.skills.map((s) => `Specialized in ${s} and enterprise implementation`),
}));

export interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  company: string;
  location: string;
  content: string;
  rating: number;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    clientName: "David Sterling",
    clientRole: "VP of Product",
    company: "CloudScale Inc.",
    location: "London, UK",
    content: "DevOpsBD Technologies transformed our legacy platform into a modern Next.js and Kubernetes architecture. Their engineering speed, attention to detail, and proactive DevOps support are truly top-tier.",
    rating: 5,
    avatar: "DS",
  },
  {
    id: "2",
    clientName: "Rashid Al-Maktoum",
    clientRole: "Chief Executive Officer",
    company: "OmniPay Financial",
    location: "Dubai, UAE",
    content: "We needed a bank-grade fintech remittance engine built within a tight 8-month deadline. DevOpsBD delivered a PCI-DSS compliant solution ahead of schedule. Exceptional technical execution!",
    rating: 5,
    avatar: "RM",
  },
  {
    id: "3",
    clientName: "Dr. Sarah Jenkins",
    clientRole: "Operations Director",
    company: "HealthFlow Global",
    location: "Austin, TX, USA",
    content: "The custom HIPAA-compliant telehealth ERP developed by DevOpsBD has streamlined our 35 medical clinics. The user experience and system reliability have been outstanding.",
    rating: 5,
    avatar: "SJ",
  },
  {
    id: "4",
    clientName: "Kazi Shafiqul Alam",
    clientRole: "Managing Director",
    company: "ShopHive Retail BD",
    location: "Dhaka, Bangladesh",
    content: "DevOpsBD Technologies is by far the most reliable software company in Bangladesh. They built our headless e-commerce platform that comfortably handles over 50,000 peak users during mega sales.",
    rating: 5,
    avatar: "KS",
  },
];

export interface PricingPlan {
  name: string;
  tagline: string;
  price: string;
  period: string;
  popular?: boolean;
  features: string[];
  cta: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    tagline: "Ideal for startups and small businesses launching their first digital product.",
    price: "$999",
    period: "one-time / project base",
    features: [
      "Custom Next.js / React Website or Landing Page",
      "Responsive & Mobile-First Design",
      "Basic REST API / Contact Integration",
      "SEO Setup & 100/100 Core Web Vitals",
      "Domain & Cloud Hosting Configuration",
      "1 Month Free SLA Maintenance & Support",
    ],
    cta: "Start Starter Plan",
  },
  {
    name: "Business",
    tagline: "Comprehensive full-stack web/mobile application engineered for scale.",
    price: "$2,999",
    period: "project base",
    popular: true,
    features: [
      "Full-Stack Web App (React / Next.js / Node.js)",
      "Database Architecture (PostgreSQL / MongoDB)",
      "Custom Admin Dashboard & User Management",
      "Payment Gateway Integration (Stripe / SSLCommerz)",
      "Docker Containerization & CI/CD Pipeline",
      "Security Audit & Penetration Testing",
      "3 Months Free SLA Maintenance & Support",
    ],
    cta: "Launch Business Plan",
  },
  {
    name: "Enterprise",
    tagline: "Dedicated engineering team for large-scale custom software and cloud infrastructure.",
    price: "Custom",
    period: "monthly retainer or milestone base",
    features: [
      "Dedicated Full-Stack & DevOps Engineering Team",
      "Microservices Architecture & Kubernetes Setup",
      "Multi-Tenant SaaS or Complex Fintech Engine",
      "24/7 SLA Server Monitoring & Emergency Support",
      "HIPAA / PCI-DSS Security Compliance Setup",
      "Custom SLA Contract & Source Code Ownership",
    ],
    cta: "Contact Enterprise Team",
  },
];

export interface FAQItem {
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  {
    question: "What services does DevOpsBD Technologies provide?",
    answer: "DevOpsBD Technologies offers full-service software development including website development, full-stack web applications, mobile app development (iOS/Android), UI/UX design, DevOps automation, cloud infrastructure (AWS/Kubernetes), custom software engineering, API development, SaaS platforms, and 24/7 ongoing maintenance.",
  },
  {
    question: "Where are your clients located and which markets do you serve?",
    answer: "We serve startups, growing businesses, and enterprise clients globally across Bangladesh, Europe, the Middle East, and the United States. We maintain regional communication hubs to accommodate all global time zones seamlessly.",
  },
  {
    question: "How long does a typical software project take to complete?",
    answer: "Project timelines depend on scope. A corporate website or landing page typically takes 1 to 2 weeks. Full-stack web applications or mobile apps take 4 to 8 weeks, while complex enterprise systems or custom SaaS platforms range from 3 to 6 months.",
  },
  {
    question: "Do I get full source code ownership and IP rights?",
    answer: "Yes, 100%. Upon project completion and final milestone sign-off, full intellectual property rights, source code repositories, design assets, and cloud deployment credentials are handed over directly to your company.",
  },
  {
    question: "What is your development and communication process?",
    answer: "We follow an Agile development methodology with 1 or 2-week sprint cycles. Clients get access to live staging environments, weekly progress demos, Slack/Teams communication channels, and Jira/Trello boards for total transparency.",
  },
  {
    question: "Do you offer post-launch maintenance and 24/7 technical support?",
    answer: "Yes. All our plans include dedicated post-launch support. We also provide ongoing SLA maintenance packages covering 24/7 server monitoring, security updates, performance optimization, and continuous feature updates.",
  },
];

export interface CareerPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
}

export const careerPositions: CareerPosition[] = [
  {
    id: "frontend-dev",
    title: "Senior Frontend Developer (Next.js / TypeScript)",
    department: "Engineering",
    location: "Dhaka, Bangladesh / Remote",
    type: "Full-Time",
    description: "We are seeking an experienced Frontend Developer to build high-performance, pixel-perfect user interfaces using Next.js 15, React 19, TypeScript, and Tailwind CSS.",
    requirements: [
      "4+ years of experience with React, Next.js, and TypeScript.",
      "Deep understanding of Core Web Vitals, SSR, ISR, and Tailwind CSS.",
      "Experience with state management (Redux, Zustand) and API integration.",
    ],
  },
  {
    id: "backend-dev",
    title: "Backend Engineer (Node.js / Express / NestJS)",
    department: "Engineering",
    location: "Dhaka, Bangladesh / Remote",
    type: "Full-Time",
    description: "Looking for a robust Backend Engineer to design scalable REST/GraphQL APIs, microservices, and database systems with PostgreSQL, Redis, and Node.js.",
    requirements: [
      "3+ years experience with Node.js, Express, or NestJS.",
      "Strong proficiency with PostgreSQL, Prisma ORM, and Redis.",
      "Experience writing unit tests and designing microservices.",
    ],
  },
  {
    id: "uiux-designer",
    title: "UI/UX Product Designer",
    department: "Design",
    location: "Dhaka, Bangladesh / Remote",
    type: "Full-Time",
    description: "Join our creative team to craft modern Figma wireframes, design systems, and user interaction flows for global enterprise products.",
    requirements: [
      "Portfolio showcasing clean, modern SaaS and web design work.",
      "Expertise in Figma, prototyping, typography, and design systems.",
      "Understanding of frontend responsive implementation constraints.",
    ],
  },
  {
    id: "devops-engineer",
    title: "DevOps & Cloud Engineer (Kubernetes / AWS)",
    department: "Infrastructure",
    location: "Dhaka, Bangladesh / Remote",
    type: "Full-Time",
    description: "Lead cloud infrastructure deployments, CI/CD automation pipelines, Docker container orchestration, and server monitoring.",
    requirements: [
      "Hands-on experience with Docker, Kubernetes, AWS, and Linux administration.",
      "Proficiency in GitHub Actions, Jenkins, Terraform, and Nginx.",
      "Experience with monitoring tools like Prometheus and Grafana.",
    ],
  },
  {
    id: "software-intern",
    title: "Full-Stack Software Engineering Intern",
    department: "Engineering",
    location: "Dhaka, Bangladesh",
    type: "Internship (6 Months)",
    description: "Great opportunity for passionate computer science graduates to gain hands-on production experience in MERN stack, Next.js, and DevOps workflows.",
    requirements: [
      "Solid knowledge of JavaScript ES6+, HTML5, CSS3, and Git.",
      "Basic familiarity with React, Node.js, and MongoDB.",
      "Strong problem-solving attitude and eagerness to learn.",
    ],
  },
];

export const chatSuggestions = [
  "What software services does DevOpsBD Technologies provide?",
  "Can DevOpsBD help build our web app or mobile product?",
  "What is DevOpsBD's technology stack for cloud & backend?",
  "How much does a custom SaaS application cost?",
  "Tell me about DevOpsBD's development and QA process.",
];

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  author: string;
  authorRole: string;
  readTime: string;
  image: string;
  summary: string;
  href: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "nextjs-16-react-19-performance",
    title: "Building High-Throughput Web Apps with Next.js 16 App Router & React 19",
    category: "FRONTEND ARCHITECTURE",
    date: "JANUARY 24, 2026",
    author: "Sabrina Islam",
    authorRole: "Senior Frontend Lead",
    readTime: "6 MIN READ",
    image: "/images/unsplash/blog_1.jpg",
    summary: "Deep dive into server components, dynamic streaming, and zero-bundle-size layouts for sub-second page loads.",
    href: "/blog",
  },
  {
    slug: "fintech-pci-dss-security-lessons",
    title: "PCI-DSS Level 1 Fintech Architecture: Lessons from $45M Remittance Operations",
    category: "FINTECH & SECURITY",
    date: "JANUARY 18, 2026",
    author: "Mahmudul Hasan",
    authorRole: "Senior Backend Engineer",
    readTime: "8 MIN READ",
    image: "/images/unsplash/blog_2.jpg",
    summary: "How to engineer multi-currency digital wallets with HSM encryption, automated KYC, and sub-800ms transactional throughput.",
    href: "/blog",
  },
  {
    slug: "kubernetes-zero-downtime-saas-scaling",
    title: "Automating Zero-Downtime Kubernetes Deployments for Enterprise SaaS",
    category: "DEVOPS & CLOUD",
    date: "JANUARY 10, 2026",
    author: "Arif Hossain",
    authorRole: "Principal DevOps Lead",
    readTime: "7 MIN READ",
    image: "/images/unsplash/blog_3.jpg",
    summary: "A practical guide to GitHub Actions CI/CD, Helm chart versioning, rolling pod updates, and automated failovers on AWS EKS.",
    href: "/blog",
  },
];

