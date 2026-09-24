// Single source of truth for all portfolio content.
// Every fact here comes directly from Mohamed Idris — nothing invented.
// Update this file to change content anywhere on the site.

export const identity = {
  name: "Mohamed Idris",
  brand: "IdrisVerse",
  role: "AI Engineer",
  positioning: "AI Engineer | Machine Learning & Deep Learning | AI Agents & Automation",
  tagline: "I build intelligent systems that can understand, automate and act.",
  about: [
    "I'm Mohamed Idris, an AI Engineer focused on building practical intelligent systems.",
    "My background spans Machine Learning, Deep Learning, Computer Vision, NLP and LLM applications. More recently, I've been focusing on AI Agents, Agentic AI and automation — turning AI capabilities into systems that can actually perform useful multi-step tasks.",
    "I'm interested in the space where AI engineering meets real-world business processes.",
  ],
};

export const rotatingWords = [
  "Machine Learning",
  "Deep Learning",
  "Computer Vision",
  "NLP",
  "LLMs",
  "AI Agents",
  "Automation",
];

export const social = {
  github: "https://github.com/IdrisVerse",
  githubUsername: "IdrisVerse",
  linkedin: "https://www.linkedin.com/in/mohammed-idris-516945168",
  tiktok: "https://www.tiktok.com/@mohamed.idris94",
  instagram: "https://www.instagram.com/mohamed_idris94",
  facebook: "https://www.facebook.com/share/1cmpWJbJzN/",
};

export type JourneyNode = {
  id: string;
  system: string; // system-level label: MODEL, INTELLIGENCE, AGENT, WORKFLOW, BUSINESS SYSTEM
  technical: string; // technical label: Machine Learning, Deep Learning, etc.
  description: string;
  relatedSkills: string[];
};

export const journey: JourneyNode[] = [
  {
    id: "model",
    system: "MODEL",
    technical: "Machine Learning",
    description: "Foundations: learning patterns from data with classical ML algorithms.",
    relatedSkills: ["Python", "Scikit-learn", "Machine Learning"],
  },
  {
    id: "intelligence",
    system: "INTELLIGENCE",
    technical: "Deep Learning",
    description: "Neural networks capable of modeling complex, high-dimensional problems.",
    relatedSkills: ["TensorFlow", "PyTorch", "Deep Learning"],
  },
  {
    id: "perception",
    system: "PERCEPTION",
    technical: "Computer Vision / NLP",
    description: "Teaching systems to interpret images and language — sight and text.",
    relatedSkills: ["Computer Vision", "NLP", "Hugging Face"],
  },
  {
    id: "reasoning",
    system: "REASONING",
    technical: "LLMs",
    description: "Large language models as a reasoning and interaction layer.",
    relatedSkills: ["LLMs", "RAG", "LoRA / Fine-tuning"],
  },
  {
    id: "agent",
    system: "AGENT",
    technical: "AI Agents",
    description: "Wrapping models with tools, memory and decision-making to act autonomously.",
    relatedSkills: ["AI Agents", "Agentic AI", "LangChain", "LangGraph"],
  },
  {
    id: "workflow",
    system: "WORKFLOW / BUSINESS SYSTEM",
    technical: "Automation",
    description: "Connecting agents to real workflows and APIs to automate business processes.",
    relatedSkills: ["n8n", "Agentic Workflows", "APIs", "Webhooks"],
  },
];

export type SkillCategory = {
  title: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "AI / Machine Learning",
    skills: [
      "Python",
      "TensorFlow",
      "PyTorch",
      "Scikit-learn",
      "Hugging Face",
      "Machine Learning",
      "Deep Learning",
      "NLP",
      "Computer Vision",
      "LLMs",
      "LoRA / Fine-tuning",
      "RAG",
    ],
  },
  {
    title: "AI Agents & Automation",
    skills: [
      "AI Agents",
      "Agentic AI",
      "n8n",
      "Agentic Workflows",
      "LangChain",
      "LangGraph",
      "APIs",
      "Webhooks",
      "Telegram Bots",
      "LLM Integrations",
    ],
  },
  {
    title: "Backend / Engineering",
    skills: ["FastAPI", "Supabase", "Docker", "REST APIs", "Git", "GitHub"],
  },
];

export const constellationNodes = [
  "Python",
  "TensorFlow",
  "PyTorch",
  "FastAPI",
  "n8n",
  "LangChain",
  "LangGraph",
  "Docker",
  "Supabase",
  "LLMs",
  "Computer Vision",
  "NLP",
];

export type CaseStudy = {
  problem: string;
  approach: string;
  intelligence: string[];
  automation: string;
  system: string[]; // pipeline steps, top to bottom
  result: string;
};

export type FeaturedProject = {
  slug: string;
  name: string;
  summary: string;
  technologies: string[];
  capabilities: string[];
  system: string[]; // pipeline steps for the compact system diagram
  caseStudy: CaseStudy;
  sourceUrl: string | null;
};

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "cipher-courier",
    name: "Cipher Courier",
    summary:
      "An AI-powered e-commerce order management and delivery coordination platform.",
    technologies: [
      "Arabic NLP",
      "EGYBERT",
      "Named Entity Recognition",
      "LLM",
      "Qwen",
      "LoRA fine-tuning",
      "Computer Vision",
      "EfficientNetB0",
      "FastAPI",
      "Supabase",
      "AI agents / automation",
    ],
    capabilities: [
      "Extracting structured information from Arabic customer orders",
      "Handling order-related requests",
      "Package damage detection",
      "Driver face recognition",
      "Delivery coordination",
      "AI-powered customer interaction",
    ],
    system: ["USER", "ORDER", "NLP / NER", "LLM", "DATABASE", "AI / AUTOMATION", "DELIVERY"],
    caseStudy: {
      problem:
        "E-commerce order management in Arabic is hard to automate — customer messages are unstructured, order-related requests vary widely, and delivery coordination (including verifying packages and drivers) is manual.",
      approach:
        "Combine Arabic NLP for structured extraction with an LLM layer for order-related conversation, backed by computer vision for physical verification (package condition, driver identity) — all coordinated through a FastAPI backend and Supabase as the data layer.",
      intelligence: [
        "EGYBERT-based Arabic NLP for language understanding",
        "Named Entity Recognition to pull structured fields out of raw customer orders",
        "Qwen LLM with LoRA fine-tuning for order-related interaction",
        "EfficientNetB0 computer vision model for package damage detection and driver face recognition",
      ],
      automation:
        "Structured information extraction from raw Arabic order text, package condition checks, and driver verification are automated, feeding into an AI/automation layer that coordinates delivery.",
      system: ["USER", "ORDER", "NLP / NER", "LLM", "DATABASE", "AI / AUTOMATION", "DELIVERY"],
      result:
        "A working system that ties Arabic order understanding, LLM-based interaction and computer vision verification into one delivery coordination pipeline. Built as a graduation project.",
    },
    sourceUrl: null,
  },
  {
    slug: "ai-social-media-manager",
    name: "AI Social Media Manager",
    summary:
      "An AI-powered social media management and content automation system controlled through Telegram.",
    technologies: [
      "n8n",
      "Telegram",
      "Google Sheets",
      "LLMs",
      "AI image generation",
      "Facebook",
      "Instagram",
      "APIs",
      "Webhooks",
      "automation workflows",
    ],
    capabilities: [
      "Turning a content idea into a publish-ready post",
      "AI caption generation",
      "AI creative/image generation",
      "Human approval step before anything goes live",
      "Automated publishing to Facebook and Instagram",
    ],
    system: ["IDEA", "AI PROCESSING", "CAPTION GENERATION", "CREATIVE GENERATION", "APPROVAL", "PUBLISHING"],
    caseStudy: {
      problem:
        "Repetitive content creation and publishing is time-consuming for businesses — turning an idea into a captioned, on-brand post across platforms takes manual effort every time.",
      approach:
        "Build an agentic automation workflow, orchestrated in n8n and controlled through Telegram, so a person can submit an idea and the system carries it through AI processing, content generation and an approval gate before publishing.",
      intelligence: [
        "LLMs for caption generation from a raw content idea",
        "AI image generation for the accompanying creative",
      ],
      automation:
        "The full pipeline — from idea intake through caption generation, creative generation, and publishing to Facebook and Instagram — is automated via n8n workflows and platform APIs/webhooks, with Google Sheets used for tracking and Telegram as the control interface. A human approval step remains before publishing.",
      system: ["IDEA", "AI PROCESSING", "CAPTION GENERATION", "CREATIVE GENERATION", "APPROVAL", "PUBLISHING"],
      result:
        "A functioning agentic workflow that lets a business go from a Telegram message to an approved, published post on Facebook and Instagram without manually operating each platform.",
    },
    sourceUrl: null,
  },
];

export type OtherProject = {
  name: string;
  category: string;
  description: string;
  sourceUrl: string | null;
};

export const otherProjects: OtherProject[] = [
  {
    name: "Customer Churn Prediction",
    category: "Machine Learning",
    description: "Machine learning project involving customer churn prediction and classification.",
    sourceUrl: "https://github.com/IdrisVerse/bank-churn-prediction",
  },
  {
    name: "Package Damage Detection",
    category: "Computer Vision",
    description: "Computer vision project using EfficientNetB0 to classify package images as damaged or intact.",
    sourceUrl: null,
  },
  {
    name: "Brain Tumor MRI Classification",
    category: "Deep Learning / Computer Vision",
    description: "Deep learning computer vision project for multi-class brain MRI classification.",
    sourceUrl: null,
  },
  {
    name: "Arabic NER",
    category: "NLP",
    description: "Natural Language Processing project involving Arabic Named Entity Recognition using an IOB-formatted dataset.",
    sourceUrl: null,
  },
];

export const currentFocus = [
  "AI Agents",
  "Agentic AI",
  "Agentic Workflows",
  "Business Automation",
  "LLM Applications",
];

export const education = {
  school: "Cairo University",
  faculty: "Faculty of Computers & Artificial Intelligence",
  track: "AI Track",
};

export const certifications = [
  "Machinefy — Data Science",
  "HCIA-AI",
  "HCIP-AI",
  "ALX Professional Foundations",
  "Anthropic AI Fluency",
  "Star Union AI Automation Mastery",
];

export const terminalCommands: Record<string, string[]> = {
  whoami: ["Mohamed Idris", "AI Engineer"],
  about: identity.about,
  skills: [
    ...skillCategories.map((c) => `${c.title}:`),
  ],
  projects: [
    "cipher-courier",
    "ai-social-media-manager",
    "customer-churn-prediction",
    "package-damage-detection",
    "brain-tumor-mri-classification",
    "arabic-ner",
  ],
  contact: [`LinkedIn: ${social.linkedin}`, `GitHub: ${social.github}`],
};
