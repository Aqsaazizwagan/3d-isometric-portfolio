export const portfolioData = {
  developer: {
    name: "Aqsa Aziz",
    handle: "@Aqsaazizwagan",
    title: "Software Developer & Security Researcher",
    tagline: "Building high-performance network defense engines, PyTorch steganalysis pipelines, 3D WebGL experiences, and full-stack platforms.",
    location: "Jamshoro, Sindh, Pakistan",
    status: "Available for Software Engineering Roles & Research",
    stats: {
      degree: "BS in Computer Science (Final Semester)",
      institution: "IMCS, University of Sindh",
      githubUsername: "Aqsaazizwagan",
      focusAreas: "Cybersecurity, PyTorch, 3D WebGL & Full-Stack Systems",
    },
    socials: {
      github: "https://github.com/Aqsaazizwagan",
      linkedin: "https://linkedin.com/in/Aqsaazizwagan",
      email: "mailto:aqsaaziz.dev@gmail.com",
    },
    bio: "Final-semester Computer Science student at the Institute of Mathematics and Computer Science (IMCS), University of Sindh, Jamshoro. Experienced in designing 802.11 wireless defense engines with Python and Wireshark Lua, deep learning forensic pipelines using PyTorch and FastAPI, interactive 3D WebGL graphics with Three.js, and production full-stack web platforms.",
  },

  categories: ["All", "Cybersecurity", "AI / Deep Learning", "Full-Stack", "3D / Simulation"],

  projects: [
    {
      id: "packet-guard",
      title: "PacketGuard (Wi-Fi Deauth Detector)",
      category: "Cybersecurity",
      featured: true,
      summary: "Open-source 802.11 deauthentication attack detection engine featuring a CustomTkinter dashboard, Python Scapy generator, and custom Wireshark Lua dissector.",
      tags: ["Python", "Scapy", "Wireshark", "Lua", "CustomTkinter"],
      github: "https://github.com/Aqsaazizwagan/PacketGuard",
      liveDemo: "https://github.com/Aqsaazizwagan/PacketGuard",
      metrics: "Real-time 802.11 packet dissection & instant deauth flood alerts",
      architecture: "Continuous monitor-mode Wireshark Lua dissector and Scapy frame sniffer capturing 802.11 management frames, identifying deauthentication floods, and streaming telemetry to a reactive CustomTkinter GUI.",
      features: [
        "Automated 802.11 deauth flood and disassociation attack detection",
        "CustomTkinter modern desktop UI with real-time attack alerts",
        "Scapy packet parser & Wireshark custom Lua protocol dissector",
        "PCAP logging and automated MAC address telemetry analysis",
        "Configurable threshold heuristics for wireless intrusion defense"
      ],
      previewColor: "from-emerald-500/20 to-teal-500/20",
    },
    {
      id: "steg-shield",
      title: "StegShield (steg-defense-pipeline)",
      category: "AI / Deep Learning",
      featured: true,
      summary: "Open-source steganalysis and self-healing media pipeline featuring PyTorch models, C++/CUDA OpenMP acceleration, and FastAPI microservices.",
      tags: ["PyTorch", "FastAPI", "Python", "C++", "CUDA"],
      github: "https://github.com/Aqsaazizwagan/steg-defense-pipeline",
      liveDemo: "https://github.com/Aqsaazizwagan/steg-defense-pipeline",
      metrics: "Sub-50ms inference with high-precision LSB stego detection & automated payload stripping",
      architecture: "PyTorch deep convolutional neural network trained on spatial bit-planes and spatial rich models (SRM), accelerated with C++/CUDA OpenMP kernels and deployed with FastAPI for real-time media sanitization.",
      features: [
        "Deep neural network classifier identifying hidden payload artifacts",
        "C++/CUDA OpenMP accelerated high-performance filter preprocessing",
        "FastAPI async inference microservice with automated OpenAPI docs",
        "Self-healing media pipeline stripping steganographic anomalies",
        "Batch image forensic analysis and confidence probability scoring"
      ],
      previewColor: "from-purple-500/20 to-pink-500/20",
    },
    {
      id: "imcs-taskvault",
      title: "IMCS TaskVault",
      category: "Full-Stack",
      featured: true,
      summary: "Assignment submission and final year project repository portal for IMCS, University of Sindh featuring role-based portals, GitHub link submissions, dynamic course selection, countdown timers, and automated notifications.",
      tags: ["JavaScript", "Node.js", "Express", "Web Development"],
      github: "https://github.com/Aqsaazizwagan/imcs-taskvault",
      liveDemo: "https://github.com/Aqsaazizwagan/imcs-taskvault",
      metrics: "Role-based student/faculty portals & live submission countdowns",
      architecture: "Modular Express.js and Node.js backend architecture with authentication middleware, dynamic semester/course selection routes, submission verification webhooks, and automated deadline reminders.",
      features: [
        "Role-based portals for students and IMCS faculty evaluators",
        "Direct GitHub repository link submissions with commit verification",
        "Dynamic course selection customized per academic semester",
        "Real-time countdown timers and automated deadline notifications",
        "Centralized Final Year Project (FYP) repository archive"
      ],
      previewColor: "from-amber-500/20 to-orange-500/20",
    },
    {
      id: "3d-campus-navigator",
      title: "3D Interactive Campus & Building Navigator",
      category: "3D / Simulation",
      featured: true,
      summary: "WebGL spatial campus navigator for the IMCS building at the University of Sindh built using Three.js and React Three Fiber.",
      tags: ["Three.js", "React Three Fiber", "WebGL", "JavaScript"],
      github: "https://github.com/Aqsaazizwagan/3d-campus-navigator",
      liveDemo: "https://github.com/Aqsaazizwagan/3d-campus-navigator",
      metrics: "60 FPS spatial WebGL building navigation with interactive raycasting",
      architecture: "Procedural 3D model of the IMCS academic building rendered with Three.js and React Three Fiber, featuring custom spatial materials, floor-by-floor raycasting navigation, and optimized orbit controls.",
      features: [
        "Full WebGL 3D spatial building exploration at continuous 60 FPS",
        "Interactive floor-by-floor dissection and department room raycasting",
        "Smooth GSAP camera transitions and dynamic zoom controls",
        "Holographic 3D point-of-interest labels for computer labs and lecture halls",
        "Laptop trackpad and mobile responsive touch controls"
      ],
      previewColor: "from-cyan-500/20 to-blue-500/20",
    },
    {
      id: "retropulse",
      title: "RetroPulse (Vintage Electronics Marketplace)",
      category: "Full-Stack",
      featured: true,
      summary: "E-commerce SDLC project featuring Sprint 1 architecture/Mermaid ERD and Sprint 2 database schema, seeds, Express backend services, and automated tests.",
      tags: ["React", "Express", "PostgreSQL", "Node.js"],
      github: "https://github.com/Aqsaazizwagan/retropulse",
      liveDemo: "https://github.com/Aqsaazizwagan/retropulse",
      metrics: "100% CI/CD automated test coverage across Sprint 1 & Sprint 2",
      architecture: "Agile SDLC engineering workflow showcasing Mermaid ERD models, PostgreSQL relational schema with seed datasets, secure Express.js REST API, and automated Jest/Supertest coverage.",
      features: [
        "Sprint 1 domain architecture with detailed Mermaid ERDs",
        "Sprint 2 relational database schema, seed migrations & indexes",
        "Express.js RESTful API with JWT authentication & security middleware",
        "Automated unit and integration testing pipelines across SDLC",
        "React modern storefront with shopping cart & order fulfillment"
      ],
      previewColor: "from-blue-500/20 to-cyan-500/20",
    },
    {
      id: "smart-traffic-controller",
      title: "Smart Traffic Signal Controller",
      category: "3D / Simulation",
      featured: true,
      summary: "Simulation application built with Python, PyQt5, and Matplotlib featuring priority optimization algorithms and emergency vehicle preemption.",
      tags: ["Python", "PyQt5", "Matplotlib", "Simulation"],
      github: "https://github.com/Aqsaazizwagan/smart-traffic-signal-controller",
      liveDemo: "https://github.com/Aqsaazizwagan/smart-traffic-signal-controller",
      metrics: "Dynamic cycle time reduction by 42% in heavy congestion simulation",
      architecture: "Multi-threaded traffic simulation engine in Python implementing real-time queue-length analysis, dynamic green light time adjustments, emergency vehicle preemption, and interactive PyQt5 / Matplotlib visual telemetry.",
      features: [
        "Priority optimization algorithms adapting signal timing to real-time queues",
        "Instant emergency vehicle preemption routing (ambulances, sirens)",
        "Interactive PyQt5 dashboard with live intersection visualization",
        "Matplotlib real-time charts plotting queue lengths, throughput, and delays",
        "Customizable traffic influx profiles for peak hour stress testing"
      ],
      previewColor: "from-emerald-500/20 to-amber-500/20",
    },
    {
      id: "pehchan-x",
      title: "Pehchan X (Telecom OSINT & Identity Correlation)",
      category: "Cybersecurity",
      featured: true,
      summary: "High-performance full-stack intelligence platform tailored for telecom OSINT, fraud attribution, burner detection, and digital identity correlation.",
      tags: ["Python", "FastAPI", "OSINT", "PostgreSQL", "Cybersecurity"],
      github: "https://github.com/Aqsaazizwagan/pehchan-x",
      liveDemo: "https://github.com/Aqsaazizwagan/pehchan-x",
      metrics: "Multi-point carrier attribution & sub-100ms record querying",
      architecture: "High-throughput asynchronous Python FastAPI backend with PostgreSQL indexing, carrier routing analysis, carrier metadata extraction, and suspicious footprint scoring.",
      features: [
        "Carrier prefix identification and regional attribution engine",
        "Burner and virtual VOIP line heuristics detection",
        "Entity relationship graph mapping suspicious digital footprints",
        "REST API endpoints with rate-limiting and authorization guards"
      ],
      previewColor: "from-red-500/20 to-orange-500/20",
    },
    {
      id: "su-pointconnect",
      title: "SU PointConnect (Campus Bus Fleet Telematics)",
      category: "Full-Stack",
      featured: true,
      summary: "AI-powered campus bus and fleet tracking system for the University of Sindh (Jamshoro) featuring live telematics, WebSocket updates, and route optimization.",
      tags: ["Python", "FastAPI", "WebSockets", "Flutter", "GIS"],
      github: "https://github.com/Aqsaazizwagan/su-pointconnect",
      liveDemo: "https://github.com/Aqsaazizwagan/su-pointconnect",
      metrics: "Real-time bus GPS streaming with <250ms WebSocket latency",
      architecture: "Distributed fleet management architecture utilizing FastAPI WebSockets for real-time telemetry streaming, geospatial route buffering, and driver route allocation.",
      features: [
        "Live student-facing bus tracking map with estimated time of arrival (ETA)",
        "Real-time WebSocket telemetry pipeline connecting bus hardware trackers",
        "Dynamic route schedule management for university commute points",
        "Geo-fencing alerts and speed threshold monitoring for campus transit"
      ],
      previewColor: "from-teal-500/20 to-emerald-500/20",
    },
    {
      id: "vulngrid",
      title: "VulnGrid (Cybersecurity Interactive Sandbox)",
      category: "Cybersecurity",
      featured: true,
      summary: "Self-hosted web-based cybersecurity interactive sandbox platform featuring containerized vulnerability testing environments and automated flags.",
      tags: ["Docker", "Next.js", "Python", "FastAPI", "Penetration Testing"],
      github: "https://github.com/Aqsaazizwagan/vulngrid",
      liveDemo: "https://github.com/Aqsaazizwagan/vulngrid",
      metrics: "Isolated multi-tenant Docker sandbox provisioning in <3 seconds",
      architecture: "Next.js web console communicating with an asynchronous FastAPI orchestrator managing isolated Docker containers for live security capture-the-flag (CTF) challenges.",
      features: [
        "Ephemeral containerized sandbox instances for vulnerability testing",
        "Interactive browser terminal connecting to target vulnerable machines",
        "Automated flag validation and dynamic scoring leaderboard",
        "Web exploit scenarios: SQL injection, XSS, SSRF, and privilege escalation"
      ],
      previewColor: "from-indigo-500/20 to-purple-500/20",
    },
    {
      id: "safarsafe",
      title: "SafarSafe (Intercity Bus & Fair Ticketing)",
      category: "Full-Stack",
      featured: false,
      summary: "Safe and fair-priced bus ticketing and terminal schedule platform tailored for transit routes across Sindh and Pakistan.",
      tags: ["React", "Tailwind CSS", "Node.js", "Express", "Vite"],
      github: "https://github.com/Aqsaazizwagan/safarsafe",
      liveDemo: "https://github.com/Aqsaazizwagan/safarsafe",
      metrics: "Interactive seat selection matrix & verified price transparent booking",
      architecture: "Modern responsive web application built with React and Tailwind CSS featuring dynamic seat map selection, route scheduling, and transparent fair-pricing algorithms.",
      features: [
        "Real-time interactive seat selection layout for intercity coaches",
        "Verified terminal departure schedules with transparent fare breakdown",
        "Bilingual interface with regional transit route coverage",
        "Instant digital ticket generation with QR code verification"
      ],
      previewColor: "from-teal-500/20 to-cyan-500/20",
    },
    {
      id: "edustack-hub",
      title: "EduStack Hub (Academic Code Execution Portal)",
      category: "Full-Stack",
      featured: false,
      summary: "Academic assignment management and sandbox code execution portal featuring automated test runner suites and student performance analytics.",
      tags: ["TypeScript", "React", "Node.js", "Tailwind CSS", "Sandbox"],
      github: "https://github.com/Aqsaazizwagan/edustack-hub",
      liveDemo: "https://github.com/Aqsaazizwagan/edustack-hub",
      metrics: "Automated test suite evaluation with instant grading telemetry",
      architecture: "TypeScript/React client paired with code evaluation sandboxes executing unit test suites and generating granular grade reports for instructors.",
      features: [
        "In-browser code editor with multi-language syntax highlighting",
        "Automated unit test execution and test coverage reporting",
        "Faculty submission review queue with rubric-based scoring",
        "Plagiarism prevention and commit timestamp logging"
      ],
      previewColor: "from-indigo-500/20 to-blue-500/20",
    },
    {
      id: "imcs-scholarsync",
      title: "IMCS ScholarSync (FYP Review & Archive Portal)",
      category: "Full-Stack",
      featured: false,
      summary: "Centralized Final Year Project (FYP) submission, supervisor allocation, and review portal for IMCS, University of Sindh.",
      tags: ["React", "Node.js", "Express", "MongoDB", "Academic"],
      github: "https://github.com/Aqsaazizwagan/imcs-scholarsync",
      liveDemo: "https://github.com/Aqsaazizwagan/imcs-scholarsync",
      metrics: "End-to-end FYP lifecycle tracking from proposal to defense",
      architecture: "Full-stack institutional repository architecture with tiered access for students, project supervisors, and department committee reviewers.",
      features: [
        "Online proposal submission with milestone documentation tracking",
        "Supervisor allocation matrix and feedback communication channels",
        "Departmental FYP archive with categorized search and tags",
        "Committee grading sheets and defense schedule publication"
      ],
      previewColor: "from-rose-500/20 to-amber-500/20",
    },
    {
      id: "omnianalyst-studio",
      title: "OmniAnalyst Studio (Enterprise Telemetry Studio)",
      category: "AI / Deep Learning",
      featured: false,
      summary: "High-end dark glassmorphism interactive analytics dashboard for enterprise model telemetry, anomaly detection, and operational intelligence.",
      tags: ["JavaScript", "HTML5", "CSS3", "Data Visualization", "Analytics"],
      github: "https://github.com/Aqsaazizwagan/omnianalyst-studio",
      liveDemo: "https://github.com/Aqsaazizwagan/omnianalyst-studio",
      metrics: "Zero-dependency real-time glassmorphism data rendering",
      architecture: "Engineered with modular ES6 JavaScript and responsive CSS grid architectures featuring custom SVG micro-charts, real-time KPI streaming, and event logs.",
      features: [
        "Executive KPI monitor cards with trend direction and delta metrics",
        "Real-time event anomaly timeline with urgency categorizations",
        "Dark glassmorphism aesthetic tailored for command centers",
        "Exportable analytics reports in CSV and JSON formats"
      ],
      previewColor: "from-purple-500/20 to-blue-500/20",
    },
    {
      id: "portfolio-tracker",
      title: "Sarmaya (Stock & Crypto Portfolio Tracker)",
      category: "Full-Stack",
      featured: false,
      summary: "Full-stack stock and crypto asset portfolio tracker application built with Flutter (Riverpod 3) and Python FastAPI.",
      tags: ["Python", "FastAPI", "Flutter", "PostgreSQL", "FinTech"],
      github: "https://github.com/Aqsaazizwagan/portfolio-tracker",
      liveDemo: "https://github.com/Aqsaazizwagan/portfolio-tracker",
      metrics: "Live financial asset valuation & profit/loss telemetry",
      architecture: "Flutter cross-platform client with Riverpod state management communicating with an asynchronous FastAPI backend querying historical price feeds and computing portfolio allocations.",
      features: [
        "Real-time portfolio net-worth calculation across stocks and cryptocurrencies",
        "Interactive profit and loss percentage breakdown with interactive charts",
        "Secure transaction ledger with buy/sell order tracking",
        "Custom price alert notifications and currency conversion"
      ],
      previewColor: "from-emerald-500/20 to-cyan-500/20",
    },
    {
      id: "netguard",
      title: "NetGuard (Network Security & Port Scanner)",
      category: "Cybersecurity",
      featured: false,
      summary: "Lightweight network reconnaissance tool and port mapper for identifying active hosts and exposed services on local subnets.",
      tags: ["Python", "Socket Programming", "Scapy", "Networking"],
      github: "https://github.com/Aqsaazizwagan/netguard",
      liveDemo: "https://github.com/Aqsaazizwagan/netguard",
      metrics: "Multi-threaded subnet host discovery & port enumeration",
      architecture: "Multi-threaded raw socket and Scapy SYN/ACK probe scanner performing rapid service fingerprinting across TCP/UDP ports.",
      features: [
        "Fast concurrent port scanning across customized port ranges",
        "Live host discovery using ARP sweep and ICMP echo requests",
        "Basic banner grabbing and service identification",
        "Clean terminal formatting with color-coded vulnerability flags"
      ],
      previewColor: "from-blue-500/20 to-slate-500/20",
    }
  ],

  // Core Technical Skills list
  skillsList: [
    "Python",
    "C++",
    "JavaScript",
    "PyTorch",
    "FastAPI",
    "React",
    "Three.js",
    "Node.js",
    "Scapy",
    "Wireshark",
    "Docker",
    "CustomTkinter",
    "Git"
  ],

  // Categorized Technical Skills with proficiency percentages and badges for Canva CV
  categorizedSkills: {
    languages: [
      { name: "Python", badge: "Primary", level: 95 },
      { name: "C++", badge: "Systems / CUDA", level: 90 },
      { name: "JavaScript (ES6+)", badge: "Modern Web", level: 92 },
      { name: "TypeScript", badge: "Full-Stack", level: 88 },
      { name: "Lua", badge: "Dissectors", level: 85 },
      { name: "SQL", badge: "Relational", level: 90 }
    ],
    frameworks: [
      { name: "PyTorch", badge: "Deep Learning", level: 92 },
      { name: "FastAPI", badge: "Async REST", level: 94 },
      { name: "React", badge: "Front-End", level: 92 },
      { name: "Three.js & R3F", badge: "3D WebGL", level: 90 },
      { name: "Node.js & Express", badge: "Backend APIs", level: 92 },
      { name: "CustomTkinter", badge: "Modern GUI", level: 88 },
      { name: "PyQt5 & Matplotlib", badge: "Simulation", level: 88 }
    ],
    securityTools: [
      { name: "Scapy", badge: "Packet Crafting", level: 95 },
      { name: "Wireshark", badge: "Protocol Dissection", level: 92 },
      { name: "802.11 Deauth Detector", badge: "Wireless Defense", level: 96 },
      { name: "LSB Steganalysis", badge: "Media Forensics", level: 90 },
      { name: "OSINT & Footprinting", badge: "Attribution", level: 88 }
    ],
    platformUtilities: [
      { name: "Docker", badge: "Containers", level: 88 },
      { name: "Git & GitHub", badge: "Version Control", level: 96 },
      { name: "PostgreSQL & SQLite", badge: "Databases", level: 90 },
      { name: "CUDA & OpenMP", badge: "HPC Acceleration", level: 85 },
      { name: "Linux / Bash", badge: "Systems Administration", level: 90 }
    ]
  },

  education: [
    {
      degree: "BS in Computer Science (Final Semester)",
      institution: "Institute of Mathematics and Computer Science (IMCS), University of Sindh",
      location: "Jamshoro, Sindh, Pakistan",
      period: "2021 – 2025 (Final Semester)",
      honors: "High Academic Standing / Dean's List",
      highlights: [
        "Rigorous academic curriculum in Systems Programming, Network Security, Deep Learning, and Distributed Web Architecture.",
        "Engineered IMCS TaskVault as the assignment submission and final year project repository portal for IMCS.",
        "Created the 3D Interactive Campus & Building Navigator for IMCS using Three.js and React Three Fiber.",
        "Conducted research and developed open-source PacketGuard 802.11 deauth detector and StegShield forensic pipelines."
      ]
    }
  ],

  certifications: [
    {
      title: "DeepLearning.AI Supervised Machine Learning",
      issuer: "Coursera (DeepLearning.AI / Stanford)",
      grade: "100% Score",
      badge: "Deep Learning Specialization",
      description: "Supervised machine learning algorithms: linear regression, logistic regression, neural networks, decision trees, and model evaluation metrics."
    },
    {
      title: "AWS Cloud Technical Essentials",
      issuer: "Coursera (Amazon Web Services)",
      grade: "Verified Credential",
      badge: "AWS Certified",
      description: "Cloud computing fundamentals, AWS compute (EC2), storage (S3), identity management (IAM), and networking (VPC)."
    }
  ],

  achievements: [
    "Constructed open-source PacketGuard: real-time 802.11 deauth detection suite featuring custom Wireshark Lua dissector and Scapy generator.",
    "Engineered StegShield: high-throughput neural network steganalysis pipeline with C++/CUDA OpenMP acceleration and FastAPI.",
    "Built IMCS TaskVault adopted for institutional coursework, student project submissions, and automated tracking.",
    "Architected high-fidelity 3D WebGL spatial interactive campus explorer for the IMCS building at University of Sindh using Three.js and R3F.",
    "Designed RetroPulse full-stack e-commerce SDLC architecture with comprehensive Mermaid ERD and automated test coverage.",
    "Built Pehchan X telecom OSINT footprinting suite with carrier attribution and graph correlation.",
    "Engineered SU PointConnect campus transit tracking system with sub-250ms WebSocket telematics.",
    "Engineered Smart Traffic Signal Controller with dynamic priority optimization and emergency vehicle preemption using Python and PyQt5."
  ]
};
