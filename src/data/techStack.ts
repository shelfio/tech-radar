export type TechStackTool = {
  name: string;
  icon: string;
  usage: string;
};

export type TechStackCategory = {
  id: string;
  name: string;
  icon: string;
  description: string;
  tools: TechStackTool[];
};

const baseCategories = [
  {
    id: "application_and_data",
    name: "Application and Data",
    icon: "🖥️",
    description:
      "Core infrastructure components including caching systems, application hosting platforms, and development frameworks that power our services.",
  },
  {
    id: "databases_data_warehouse_data_storage",
    name: "Databases, Data Warehouse, Data Storage",
    icon: "🗄️",
    description:
      "Database systems, data warehouses, and data storage solutions for scalable, reliable data management and analytics.",
  },
  {
    id: "aaa_ai_agents_automation",
    name: "AAA - AI, Agents, Automation",
    icon: "🤖",
    description:
      "Intelligent AI agents and assistants that enhance productivity and accelerate software development workflows.",
  },
  {
    id: "utilities",
    name: "Utilities",
    icon: "🔧",
    description:
      "Third-party services and specialized tools that enhance development capabilities and provide additional functionality.",
  },
  {
    id: "devops",
    name: "DevOps",
    icon: "⚙️",
    description:
      "Development operations tools for building, testing, deploying, and monitoring applications.",
  },
  {
    id: "security_identity",
    name: "Security & Identity",
    icon: "🔒",
    description:
      "Security, identity management, compliance, and threat detection tools for protecting applications and data.",
  },
  {
    id: "business_tools",
    name: "Business Tools",
    icon: "💼",
    description:
      "Productivity and business management tools that support operations and collaboration.",
  },
];

const techStackData = {
  techStack: {
    application_and_data: {
      tools: [
        {
          name: "React",
          icon: "react.dev",
          usage:
            "JavaScript library for building user interfaces with component-based architecture",
        },
        {
          name: "Node.js",
          icon: "nodejs.org",
          usage:
            "JavaScript runtime built on Chrome's V8 JavaScript engine for server-side development",
        },
        {
          name: "TypeScript",
          icon: "typescriptlang.org",
          usage:
            "Strongly typed programming language that builds on JavaScript with static type definitions",
        },
        {
          name: "Amazon S3",
          icon: "https://cdn.brandfetch.io/idVoqFQ-78/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1691083841257",
          usage:
            "Object storage service for data backup, archival, and analytics",
        },
        {
          name: "AWS Lambda",
          icon: "https://cdn.brandfetch.io/idVoqFQ-78/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1691083841257",
          usage:
            "Serverless computing service that runs code without provisioning or managing servers",
        },
        {
          name: "Amazon CloudFront",
          icon: "https://cdn.brandfetch.io/idVoqFQ-78/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1691083841257",
          usage:
            "Content delivery network (CDN) service for fast, secure content delivery",
        },
        {
          name: "Next.js",
          icon: "nextjs.org",
          usage:
            "React framework for production with features like server-side rendering and static site generation",
        },
        {
          name: "Tailwind CSS",
          icon: "tailwindcss.com",
          usage:
            "Utility-first CSS framework for rapidly building custom user interfaces with low-level utility classes",
        },
        {
          name: "Styled Components",
          icon: "styled-components.com",
          usage:
            "CSS-in-JS library for styling React components with tagged template literals and theming support",
        },
        {
          name: "Microsoft Azure",
          icon: "azure.microsoft.com",
          usage: "Cloud computing platform and infrastructure service",
        },
        {
          name: "Amazon SQS",
          icon: "https://cdn.brandfetch.io/idVoqFQ-78/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1691083841257",
          usage:
            "Message queuing service for decoupling and scaling microservices",
        },
        {
          name: "Amazon VPC",
          icon: "https://cdn.brandfetch.io/idVoqFQ-78/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1691083841257",
          usage:
            "Virtual private cloud for launching AWS resources in a logically isolated virtual network",
        },
        {
          name: "Serverless",
          icon: "serverless.com",
          usage:
            "Framework for building applications with serverless architectures on AWS Lambda",
        },
        {
          name: "Highcharts",
          icon: "highcharts.com",
          usage:
            "JavaScript charting library for adding interactive charts to web applications",
        },
        {
          name: "DataGrip",
          icon: "jetbrains.com",
          usage:
            "Database IDE for managing and querying databases with advanced SQL support",
        },
        {
          name: "React Storybook",
          icon: "storybook.js.org",
          usage:
            "Tool for building UI components and pages in isolation for development and testing",
        },
        {
          name: "AWS Glue",
          icon: "https://cdn.brandfetch.io/idVoqFQ-78/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1691083841257",
          usage:
            "Serverless data integration service for discovering, preparing, and combining data",
        },
        {
          name: "Amazon EventBridge",
          icon: "https://cdn.brandfetch.io/idVoqFQ-78/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1691083841257",
          usage:
            "Serverless event bus service for connecting applications using events",
        },
        {
          name: "SWR",
          icon: "swr.vercel.app",
          usage:
            "React hooks library for data fetching with caching, revalidation, and error handling",
        },
        {
          name: "Vercel",
          icon: "vercel.com",
          usage:
            "Cloud platform for static sites and serverless functions with Git integration and automatic deployments",
        },
        {
          name: "Radix UI",
          icon: "radix-ui.com",
          usage:
            "Low-level UI primitives and components for building high-quality design systems and web apps",
        },
      ],
    },
    databases_data_warehouse_data_storage: {
      tools: [
        {
          name: "Amazon DynamoDB",
          icon: "https://cdn.brandfetch.io/idVoqFQ-78/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1691083841257",
          usage:
            "NoSQL database service for applications that need consistent, single-digit millisecond latency",
        },
        {
          name: "Elasticsearch",
          icon: "elastic.co",
          usage:
            "Distributed search and analytics engine for full-text search and real-time analytics",
        },
        {
          name: "AWS Aurora PostgreSQL",
          icon: "https://cdn.brandfetch.io/idVoqFQ-78/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1691083841257",
          usage:
            "MySQL and PostgreSQL-compatible relational database built for the cloud",
        },
        {
          name: "AWS ValKey",
          icon: "https://cdn.brandfetch.io/idVoqFQ-78/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1691083841257",
          usage:
            "High-performance in-memory key-value data store compatible with Redis, designed for ultra-low latency and high throughput",
        },
        {
          name: "MongoDB",
          icon: "mongodb.com",
          usage:
            "NoSQL document database designed for modern application development and cloud computing",
        },
        {
          name: "Snowflake",
          icon: "snowflake.com",
          usage:
            "Cloud-based data warehouse platform for scalable data storage, processing, and analytics",
        },
        {
          name: "Databricks",
          icon: "databricks.com",
          usage:
            "Unified analytics platform for big data processing, machine learning, and collaborative data science",
        },
        {
          name: "Amazon EFS",
          icon: "https://cdn.brandfetch.io/idVoqFQ-78/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1691083841257",
          usage:
            "Scalable file storage service for use with Amazon EC2 instances",
        },
      ],
    },
    aaa_ai_agents_automation: {
      tools: [
        {
          name: "MCP",
          icon: "https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/mcp.png?w=1650&fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=777d825ac0e80aaa4e2bddfc7e55e629",
          usage:
            "We build our in-house MCP servers for AI automation",
        },
        {
          name: "OpenAI Codex",
          icon: "https://cdn.brandfetch.io/idR3duQxYl/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX&t=1749527471692",
          usage:
            "AI code generation model powering developer tools and automation",
        },
        {
          name: "Claude Code",
          icon: "claude.ai",
          usage:
            "AI coding assistant for writing, debugging, and refactoring code with advanced reasoning capabilities",
        },
        {
          name: "GitHub Copilot",
          icon: "github.com",
          usage: "AI pair programmer that suggests code and entire functions",
        },
        {
          name: "TypingMind",
          icon: "typingmind.com",
          usage:
            "AI company workspace with custom agents, plugins, and unified chat interface for all major LLMs",
        },
        {
          name: "n8n",
          icon: "n8n.io",
          usage:
            "Workflow automation tool for connecting apps and services with custom integrations",
        },
        {
          name: "LangChain",
          icon: "langchain.com",
          usage:
            "Framework for developing applications powered by language models",
        },
        {
          name: "Zapier",
          icon: "zapier.com",
          usage:
            "Automation platform for connecting apps and automating workflows without code",
        },
      ],
    },
    utilities: {
      tools: [
        {
          name: "Amazon Route 53",
          icon: "https://cdn.brandfetch.io/idVoqFQ-78/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1691083841257",
          usage: "Scalable domain name system (DNS) web service",
        },
        {
          name: "Amazon SES",
          icon: "https://cdn.brandfetch.io/idVoqFQ-78/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1691083841257",
          usage: "Email sending service for transactional and marketing emails",
        },
        {
          name: "Amazon SNS",
          icon: "https://cdn.brandfetch.io/idVoqFQ-78/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1691083841257",
          usage:
            "Notification service for sending messages to subscribers via multiple protocols",
        },
        {
          name: "Amazon API Gateway",
          icon: "https://cdn.brandfetch.io/idVoqFQ-78/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1691083841257",
          usage:
            "Managed service for creating, publishing, and managing APIs at scale",
        },
        {
          name: "Amazon Kinesis",
          icon: "https://cdn.brandfetch.io/idVoqFQ-78/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1691083841257",
          usage: "Platform for real-time data streaming and analytics",
        },
        {
          name: "Amazon SageMaker",
          icon: "https://cdn.brandfetch.io/idVoqFQ-78/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1691083841257",
          usage:
            "Machine learning platform for building, training, and deploying ML models",
        },
        {
          name: "Stripe",
          icon: "stripe.com",
          usage: "Payment processing platform for online businesses",
        },
        {
          name: "Mixpanel",
          icon: "https://cdn.brandfetch.io/idr_rhI2FS/theme/dark/idMJ8uODLv.svg?c=1bxid64Mup7aczewSAYMX&t=1717143401811",
          usage:
            "Product analytics platform for tracking user interactions and behavior",
        },
        {
          name: "Hotjar",
          icon: "hotjar.com",
          usage:
            "User behavior analytics platform for understanding how users interact with websites through heatmaps and recordings",
        },
        {
          name: "PyTorch",
          icon: "pytorch.org",
          usage:
            "Open source machine learning library for Python based on Torch",
        },
        {
          name: "Streamlit",
          icon: "streamlit.io",
          usage:
            "Open-source framework for creating data science and machine learning web apps",
        },
        {
          name: "OpenAPI Specification",
          icon: "https://cdn.brandfetch.io/idkndPduFy/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1757454850131",
          usage:
            "Specification for describing REST APIs with standardized documentation",
        },
        {
          name: "AWS Step Functions",
          icon: "https://cdn.brandfetch.io/idVoqFQ-78/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1691083841257",
          usage:
            "Serverless orchestration service for coordinating distributed applications",
        },
        {
          name: "Amazon Kinesis Firehose",
          icon: "https://cdn.brandfetch.io/idVoqFQ-78/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1691083841257",
          usage:
            "Data delivery service for loading streaming data into AWS data stores",
        },
        {
          name: "SpaCy",
          icon: "spacy.io",
          usage:
            "Industrial-strength natural language processing library for Python",
        },
        {
          name: "Gitbook",
          icon: "gitbook.com",
          usage:
            "Documentation platform for creating and sharing knowledge bases",
        },
        {
          name: "Transformers",
          icon: "huggingface.co",
          usage:
            "State-of-the-art machine learning library for natural language processing",
        },
        {
          name: "Amazon QuickSight",
          icon: "https://cdn.brandfetch.io/idVoqFQ-78/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1691083841257",
          usage:
            "Business intelligence service for creating interactive dashboards and visualizations",
        },
        {
          name: "Crowdin",
          icon: "crowdin.com",
          usage:
            "Localization management platform for translating applications and content",
        },
      ],
    },
    devops: {
      tools: [
        {
          name: "Git",
          icon: "git-scm.com",
          usage: "Distributed version control system for tracking code changes",
        },
        {
          name: "GitHub",
          icon: "github.com",
          usage:
            "Code hosting platform for version control and collaboration using Git",
        },
        {
          name: "Visual Studio Code",
          icon: "code.visualstudio.com",
          usage: "Lightweight code editor with rich ecosystem of extensions",
        },
        {
          name: "Docker",
          icon: "docker.com",
          usage:
            "Platform for developing, shipping, and running applications in containers",
        },
        {
          name: "npm",
          icon: "npmjs.com",
          usage: "Package manager for JavaScript and Node.js applications",
        },
        {
          name: "ESLint",
          icon: "eslint.org",
          usage:
            "JavaScript linting tool for identifying and fixing code quality issues",
        },
        {
          name: "PyCharm",
          icon: "jetbrains.com",
          usage: "Integrated development environment for Python development",
        },
        {
          name: "Yarn",
          icon: "yarnpkg.com",
          usage:
            "Fast, reliable, and secure dependency management for JavaScript",
        },
        {
          name: "pnpm",
          icon: "https://cdn.brandfetch.io/idA03rMeg7/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1709852232671",
          usage:
            "Fast, disk space efficient package manager for JavaScript with strict dependency resolution",
        },
        {
          name: "Kibana",
          icon: "elastic.co",
          usage: "Data visualization and exploration tool for Elasticsearch",
        },
        {
          name: "Terraform",
          icon: "terraform.io",
          usage:
            "Infrastructure as code tool for building, changing, and versioning infrastructure",
        },
        {
          name: "Spacelift",
          icon: "https://cdn.brandfetch.io/idqUcBlHVz/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1746407670171",
          usage:
            "Continuous delivery platform managing OpenTofu infrastructure pipelines",
        },
        {
          name: "WebStorm",
          icon: "jetbrains.com",
          usage:
            "Integrated development environment for JavaScript and web development",
        },
        {
          name: "CircleCI",
          icon: "circleci.com",
          usage:
            "Continuous integration and delivery platform for automating development workflows",
        },
        {
          name: "Elastic Load Balancing",
          icon: "https://cdn.brandfetch.io/idVoqFQ-78/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1691083841257",
          usage:
            "Service for distributing incoming application traffic across multiple targets",
        },
        {
          name: "Amazon CloudWatch",
          icon: "https://cdn.brandfetch.io/idVoqFQ-78/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1691083841257",
          usage:
            "Monitoring and observability service for AWS resources and applications",
        },
        {
          name: "Jest",
          icon: "jestjs.io",
          usage:
            "JavaScript testing framework for unit and integration testing",
        },
        {
          name: "Datadog",
          icon: "datadoghq.com",
          usage:
            "Monitoring and analytics platform for cloud applications and infrastructure",
        },
        {
          name: "Prettier",
          icon: "prettier.io",
          usage:
            "Code formatter for maintaining consistent code style across teams",
        },
        {
          name: "AWS CloudFormation",
          icon: "https://cdn.brandfetch.io/idVoqFQ-78/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1691083841257",
          usage:
            "Infrastructure as code service for modeling and provisioning AWS resources",
        },
        {
          name: "Vite",
          icon: "vitejs.dev",
          usage:
            "Build tool for modern web projects with fast hot module replacement",
        },
        {
          name: "Puppeteer",
          icon: "pptr.dev",
          usage:
            "Node.js library for controlling Chrome browser for testing and automation",
        },
        {
          name: "AWS Fargate",
          icon: "https://cdn.brandfetch.io/idVoqFQ-78/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1691083841257",
          usage:
            "Serverless compute engine for containers without managing servers",
        },
        {
          name: "Playwright",
          icon: "playwright.dev",
          usage: "End-to-end testing framework for modern web applications",
        },
        {
          name: "Amazon ECR",
          icon: "https://cdn.brandfetch.io/idVoqFQ-78/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1691083841257",
          usage:
            "Container registry service for storing and managing Docker container images",
        },
        {
          name: "StatusPage.io",
          icon: "statuspage.io",
          usage: "Status page service for communicating system status to users",
        },
        {
          name: "ngrok",
          icon: "ngrok.com",
          usage:
            "Secure tunneling service for exposing local servers to the internet",
        },
        {
          name: "Esbuild",
          icon: "esbuild.github.io",
          usage: "Extremely fast JavaScript bundler and minifier",
        },
        {
          name: "Studio 3T",
          icon: "studio3t.com",
          usage:
            "Professional GUI and IDE for MongoDB with advanced query and aggregation tools",
        },
        {
          name: "Lerna",
          icon: "lerna.js.org",
          usage:
            "Tool for managing JavaScript projects with multiple packages in a single repository (monorepo)",
        },
        {
          name: "OpsLevel",
          icon: "opslevel.com",
          usage:
            "Service catalog and developer portal for managing microservices and infrastructure",
        },
        {
          name: "Script Kit",
          icon: "scriptkit.com",
          usage:
            "Tool for creating and running scripts with a simple interface for automating tasks and workflows",
        },
      ],
    },
    security_identity: {
      tools: [
        {
          name: "AWS IAM",
          icon: "https://cdn.brandfetch.io/idVoqFQ-78/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1691083841257",
          usage:
            "Identity and access management service for securely controlling access to AWS services",
        },
        {
          name: "Auth0",
          icon: "auth0.com",
          usage:
            "Identity platform for application authentication and authorization",
        },
        {
          name: "AWS Key Management Service",
          icon: "https://cdn.brandfetch.io/idVoqFQ-78/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1691083841257",
          usage: "Managed service for creating and controlling encryption keys",
        },
        {
          name: "AWS WAF",
          icon: "https://cdn.brandfetch.io/idVoqFQ-78/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1691083841257",
          usage:
            "Web application firewall for protecting web applications from common exploits",
        },
        {
          name: "AWS Certificate Manager",
          icon: "https://cdn.brandfetch.io/idVoqFQ-78/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1691083841257",
          usage: "Service for provisioning and managing SSL/TLS certificates",
        },
        {
          name: "Whistic",
          icon: "whistic.com",
          usage:
            "Security and compliance platform for managing vendor risk assessments and security questionnaires",
        },
        {
          name: "Amazon GuardDuty",
          icon: "https://cdn.brandfetch.io/idVoqFQ-78/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1691083841257",
          usage:
            "Threat detection service for monitoring malicious activity and unauthorized behavior",
        },
        {
          name: "AWS CloudTrail",
          icon: "https://cdn.brandfetch.io/idVoqFQ-78/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1691083841257",
          usage:
            "Service for logging and monitoring API calls and user activity",
        },
        {
          name: "Renovate Bot",
          icon: "https://cdn.brandfetch.io/id9DgV_SAW/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1755028743130",
          usage:
            "Automated dependency update service keeping libraries current and reducing supply-chain risk",
        },
        {
          name: "1Password",
          icon: "https://cdn.brandfetch.io/ids0xxqhX-/theme/light/symbol.svg?c=1bxid64Mup7aczewSAYMX&t=1668082116841",
          usage: "Password manager for securing and managing login credentials",
        },
      ],
    },
    business_tools: {
      tools: [
        {
          name: "Slack",
          icon: "https://cdn.brandfetch.io/idJ_HhtG0Z/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1745381282564",
          usage:
            "Team collaboration platform for messaging, file sharing, and workflow integration",
        },
        {
          name: "Jira",
          icon: "atlassian.com",
          usage:
            "Project management and issue tracking tool for agile development teams",
        },
        {
          name: "G Suite",
          icon: "https://cdn.brandfetch.io/id6O2oGzv-/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX&t=1755835725776",
          usage:
            "Cloud-based productivity and collaboration suite including Gmail, Docs, and Drive",
        },
        {
          name: "Confluence",
          icon: "atlassian.com",
          usage:
            "Team workspace for creating, sharing, and collaborating on documentation",
        },
        {
          name: "Intercom",
          icon: "https://cdn.brandfetch.io/idYJNDWF1m/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX&t=1668070639176",
          usage:
            "Customer messaging platform for support, sales, and marketing automation",
        },
        {
          name: "Figma",
          icon: "https://cdn.brandfetch.io/idZHcZ_i7F/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX&t=1729268241679",
          usage:
            "Collaborative design tool for creating user interfaces and prototypes",
        },
        {
          name: "Zoom",
          icon: "https://cdn.brandfetch.io/id3aO4Szj3/w/140/h/139/theme/dark/symbol.png?c=1bxid64Mup7aczewSAYMX&t=1668070435617",
          usage:
            "Video conferencing and communication platform for remote meetings",
        },
        {
          name: "Google Meet",
          icon: "meet.google.com",
          usage:
            "Video conferencing service integrated with Google Workspace for virtual meetings",
        },
        {
          name: "Zeplin",
          icon: "zeplin.io",
          usage:
            "Collaboration tool for designers and developers to handoff design specifications",
        },
        {
          name: "Salesforce",
          icon: "https://cdn.brandfetch.io/idVE84WdIN/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1668516062674",
          usage:
            "Customer relationship management (CRM) platform for sales and marketing",
        },
        {
          name: "Medium",
          icon: "medium.com",
          usage:
            "Publishing platform for sharing ideas and stories through articles",
        },
        {
          name: "drawio",
          icon: "diagrams.net",
          usage:
            "Diagramming tool for creating flowcharts, wireframes, and technical diagrams",
        },
        {
          name: "DocuSign",
          icon: "docusign.com",
          usage:
            "Electronic signature platform for secure document signing and workflow automation",
        },
        {
          name: "Productboard",
          icon: "productboard.com",
          usage:
            "Product management platform for prioritizing features and roadmap planning",
        },
        {
          name: "Whimsical Wireframes",
          icon: "https://cdn.brandfetch.io/idD-EtaX7Y/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1756475751377",
          usage:
            "Visual workspace for creating wireframes, flowcharts, and mind maps",
        },
        {
          name: "Excalidraw",
          icon: "excalidraw.com",
          usage:
            "Virtual whiteboard for sketching hand-drawn diagrams and collaborative brainstorming",
        },
      ],
    },
  },
};

type TechStackRecord = typeof techStackData.techStack;

export const techStackCategories: TechStackCategory[] = baseCategories.map(
  (category) => {
    const tools = techStackData.techStack[
      category.id as keyof TechStackRecord
    ]?.tools;

    return {
      ...category,
      tools: Array.isArray(tools) ? [...tools] : [],
    };
  },
);
