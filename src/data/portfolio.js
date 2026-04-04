import { FaReact, FaNodeJs, FaPython, FaDocker, FaGitAlt, FaJava, FaDatabase, FaBrain, FaRobot, FaChartBar, FaCubes, FaMicrophone, FaCode, FaNetworkWired } from 'react-icons/fa'
import {
  SiTensorflow, SiPytorch, SiMongodb, SiTailwindcss, SiJavascript,
  SiPostgresql, SiOpencv, SiOpenai, SiFlask, SiKeras, SiScikitlearn, 
  SiNumpy, SiPandas, SiCodechef, SiCodeforces, SiLeetcode, SiGithub,
  SiSelenium
} from 'react-icons/si'

// ─── Navigation ───
export const navLinks = [
  { name: 'About', href: '#hero' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Coding', href: '#coding' },
  { name: 'Contact', href: '#contact' },
]

// ─── Personal info ───
export const personalInfo = {
  name: 'Satwik Tomar',
  tagline: 'ML Engineer & Developer',
  email: 'satwiktomar77@gmail.com',
  location: 'Bengaluru, India',
  resumeUrl: '/assets/resume/resume_march_2.pdf',
  avatarUrl: '/assets/profile.jpg', // Place your photo at public/assets/profile.jpg
  bio: [
    "I am a Machine Learning Engineer and Developer pursuing a BE in Computer Science (Cybersecurity) at Dayananda Sagar College of Engineering (GPA: 9.0).",
    "Passionate about Machine Learning & AI.",
    "Exploring Blockchain Technologies.",
    "Interested in NLP & Deep Learning.",
    "Love building scalable ML solutions.",
    "Constantly learning and improving."
  ],
  stats: [
    { value: '9.0', label: 'Current GPA' },
    { value: '150+', label: 'DSA Problems' },
  ],
}

// ─── Social links ───
export const socialLinks = {
  github: 'https://github.com/Satwiktomar',
  linkedin: 'https://www.linkedin.com/in/satwiktomar49/',
  leetcode: 'https://leetcode.com/u/satwickk49/',
  codechef: 'https://www.codechef.com/users/satwickk49',
  codeforces: 'https://codeforces.com/profile/satwickk49',
  email: 'mailto:satwiktomar77@gmail.com',
}

// ─── Coding Profiles ───
export const codingProfiles = [
  {
    platform: 'CodeChef',
    rating: '2-Star Developer',
    icon: SiCodechef,
    url: socialLinks.codechef,
    color: '#5B4638'
  },
  {
    platform: 'LeetCode',
    rating: '150+ Problems Solved',
    icon: SiLeetcode,
    url: socialLinks.leetcode,
    color: '#FFA116'
  },
  {
    platform: 'Codeforces',
    rating: 'Active Contributor',
    icon: SiCodeforces,
    url: socialLinks.codeforces,
    color: '#1F8ACB'
  },
  {
    platform: 'GitHub',
    rating: 'Open Source',
    icon: SiGithub,
    url: socialLinks.github,
    color: '#ffffff'
  }
]

// ─── Services ───
export const services = [
  {
    title: 'Machine Learning & AI',
    description: 'Fine-tuning LLMs, designing RAG pipelines, deploying TTS models, and optimizing computer vision inference with tools like TensorFlow and PyTorch.',
    icon: '🧠',
  },
  {
    title: 'Data Engineering',
    description: 'Building robust data scraping pipelines, synthesizing metrics, optimizing databases (PostgreSQL), and running sentiment analysis on scale.',
    icon: '📊',
  },
  {
    title: 'Full-Stack Web Dev',
    description: 'Developing high-performance, interactive applications via FastAPI, Flask, React, and seamlessly integrating complex AI endpoints.',
    icon: '⚡',
  },
  {
    title: 'Cybersecurity',
    description: 'Applying security practices natively into applications, and participating dynamically in Capture the Flag (CTF) competitions.',
    icon: '🛡️',
  },
]

// ─── Projects ───
export const projects = [
  {
    title: 'BeaverAI',
    description: 'Multimodal AI interview platform integrating Whisper transcription, LLM questioning, and neural speech synthesis. Automated proctoring via OpenCV and MediaPipe.',
    tags: ['Python', 'FastAPI', 'Whisper', 'MediaPipe', 'LLM'],
    github: 'https://github.com/Satwiktomar',
    image: '/assets/projects/beaverai.jpeg',
    featured: true,
  },
  {
    title: 'AlignithmAI',
    description: 'AI Resume & ATS Analyzer using Gemini embeddings and cosine similarity. Features a 7-dim ATS scoring pipeline and TTL vector caching for low latency.',
    tags: ['Python', 'FastAPI', 'Gemini API', 'PostgreSQL'],
    github: 'https://github.com/Satwiktomar',
    image: '/assets/projects/alignithmai.jpeg',
    featured: true,
  },
  {
    title: 'AquaGenesis',
    description: 'AI eDNA Taxonomic Classifier built to classify eukaryotic taxa. Utilizes a hybrid CNN + HDBSCAN architecture for novel species discovery.',
    tags: ['TensorFlow', 'Keras', 'BioPython', 'HDBSCAN'],
    github: 'https://github.com/Satwiktomar',
    image: '/assets/projects/aquagenesis.jpg',
    featured: true,
  },
  {
    title: 'ReviewNexus',
    description: 'Data pipeline scraping 150K+ reviews from Google Maps using Playwright. Includes DistilBERT-based sentiment analysis and complex weighted rankings.',
    tags: ['Python', 'Playwright', 'Flask', 'DistilBERT'],
    github: 'https://github.com/Satwiktomar',
    image: '/assets/projects/reviewnexus.jpeg',
    featured: false,
  },
  {
    title: 'MediPal',
    description: 'Medical platform bridging doctors and patients with appointment scheduling, medical history tracking, and an integrated AI-powered medical assistant.',
    tags: ['MERN Stack', 'React', 'Node.js', 'Cloudinary'],
    github: 'https://github.com/Satwiktomar/hacknocturne-MediPal',
    image: '/assets/projects/MediPal.jpeg',
    featured: false,
  },
]

// ─── Experience ───
export const experiences = [
  {
    role: 'Machine Learning Engineer',
    company: 'Padho.AI',
    period: 'Oct 2025 — Jan 2026',
    description: 'Reduced TTS infrastructure costs by 80% by fine-tuning and deploying Piper TTS locally. Improved image generation efficiency and reduced costs by 60% using optimized Stable Diffusion and OwlViT pipelines.',
    technologies: ['Python', 'Piper TTS', 'Stable Diffusion', 'OwlViT'],
  }
]

// ─── Tech Stack ───
export const techStack = [
  // Programming & Base
  { name: 'Python', icon: FaPython, color: '#3776AB' },
  { name: 'C++', icon: FaCode, color: '#00599C' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'SQL', icon: FaDatabase, color: '#4169E1' },
  
  // Data & ML
  { name: 'Pandas', icon: SiPandas, color: '#150458' },
  { name: 'NumPy', icon: SiNumpy, color: '#013243' },
  { name: 'Scikit-learn', icon: SiScikitlearn, color: '#F7931E' },
  
  // DL & Frameworks
  { name: 'TensorFlow', icon: SiTensorflow, color: '#FF6F00' },
  { name: 'PyTorch', icon: SiPytorch, color: '#EE4C2C' },
  { name: 'Keras', icon: SiKeras, color: '#D00000' },
  
  // NLP & LLMs
  { name: 'Transformers', icon: FaRobot, color: '#FFD21E' },
  { name: 'spaCy', icon: FaCode, color: '#09A3D5' },
  { name: 'NLTK', icon: FaCode, color: '#3776AB' },
  { name: 'ChromaDB', icon: FaDatabase, color: '#F38020' },
  { name: 'LLMs & RAG', icon: FaBrain, color: '#ffffff' },
  
  // Gen AI & CV
  { name: 'Stable Diffusion', icon: FaBrain, color: '#8854d0' },
  { name: 'OWL-ViT', icon: FaCubes, color: '#f368e0' },
  { name: 'OpenCV', icon: SiOpencv, color: '#5C3EE8' },
  { name: 'MediaPipe', icon: FaNetworkWired, color: '#00B4D8' },
  
  // Speech & Clustering
  { name: 'Librosa', icon: FaMicrophone, color: '#FFB74D' },
  { name: 'HDBSCAN', icon: FaChartBar, color: '#4CAF50' },
  
  // Scraping
  { name: 'Selenium', icon: SiSelenium, color: '#43B02A' },
  { name: 'Playwright', icon: FaRobot, color: '#2EAD33' },
  { name: 'BeautifulSoup', icon: FaCode, color: '#ffffff' },
  
  // Bioinformatics
  { name: 'BioPython', icon: FaCubes, color: '#FFEB3B' },
  
  // Web & Infrastructure
  { name: 'React', icon: FaReact, color: '#61DAFB' },
  { name: 'Flask / FastAPI', icon: SiFlask, color: '#ffffff' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
  { name: 'Docker', icon: FaDocker, color: '#2496ED' },
  { name: 'Git', icon: FaGitAlt, color: '#F05032' },
]

// ─── Certifications ───
export const certifications = [
  {
    title: 'Oracle AI Vector Search Certified Professional',
    issuer: 'Oracle',
    year: '2025',
    image: '/assets/oracle.png',
    link: import.meta.env.VITE_CERT_ORACLE_VECTOR,
  },
  {
    title: 'OCI Generative AI Certified Professional',
    issuer: 'Oracle',
    year: '2025',
    image: '/assets/oracle.png',
    link: import.meta.env.VITE_CERT_ORACLE_GEN_AI,
  },
  {
    title: 'OCI AI Foundations Associate',
    issuer: 'Oracle',
    year: '2025',
    image: '/assets/oracle.png',
    link: import.meta.env.VITE_CERT_ORACLE_AI_FOUNDATION,
  }
];

// ─── Achievements ───
export const achievements = [
  {
    title: 'GATE DA 2026',
    description: 'Qualified the GATE DA exam, demonstrating strong analytical and mathematical problem-solving skills.',
    year: '2026',
    type: 'award',
  },
  {
    title: '150+ Problems Solved',
    description: 'Actively solving Data Structures & Algorithms challenges across multiple platforms.',
    year: '2024-Present',
    type: 'award',
  },
  {
    title: 'Top 16 in CTF',
    description: 'Secured a Top 16 finish globally in a Capture the Flag (CTF) security competition.',
    year: '2024',
    type: 'award',
  },
  {
    title: 'Hackathon & Tech Fest Organizer',
    description: 'Managed and helped organize SANDBOX (Karnataka’s largest cybersecurity hackathon) and GlitchCraft tech fest.',
    year: '2024',
    type: 'hackathon',
  },
]

// ─── Chatbot Knowledge Base ───
export const chatbotKnowledge = {
  greetings: [
    "Hey there! 👋 I'm Satwik's AI assistant. Ask me anything about his skills, projects, or experience!",
  ],
  about: "Satwik Tomar is a Machine Learning Engineer and Cybersecurity student (GPA: 9.0) at Dayananda Sagar College of Engineering. He specializes in LLMs, RAG, Web Automation, and Cybersecurity.",
  skills: "Satwik works with Python, C++, SQL, TensorFlow, Keras, HuggingFace Transformers, FastAPI, Flask, Playwright, PostgreSQL, and Docker. He's an expert in ML/AI, NLP, Computer Vision, and full-stack API design.",
  projects: {
    'beaverai': "BeaverAI is a multimodal AI interview platform. It integrates Whisper for transcription, LLMs for questioning, neural TTS, and automated webcam proctoring using OpenCV & MediaPipe.",
    'alignithmai': "AlignithmAI is an AI Resume & ATS Analyzer. It uses Gemini embeddings for resume-job matching and a 7-dim objective ATS scoring pipeline.",
    'aquagenesis': "AquaGenesis is an AI eDNA Taxonomic Classifier combining a CNN and HDBSCAN to classify eukaryotic taxa from environmental DNA.",
    'reviewnexus': "ReviewNexus is a data pipeline that scraped 150K+ Google Maps reviews using Playwright and generated DistilBERT-based sentiment rankings.",
    'medipal': "MediPal is a medical platform connecting doctors and patients, featuring appointment scheduling and an AI-powered medical assistant.",
  },
  experience: "Satwik worked as a Machine Learning Engineer at Padho.AI (Oct 2025 - Jan 2026), where he reduced TTS infrastructure costs by 80% with local Piper TTS and optimized image generation models like Stable Diffusion.",
  education: "Satwik is pursuing a BE in Computer Science (Cybersecurity) at Dayananda Sagar College of Engineering, expected to graduate in 2027 with a current GPA of 9.0.",
  contact: "You can reach Satwik at satwiktomar77@gmail.com, on LinkedIn at linkedin.com/in/satwiktomar49, or check out his code on GitHub at github.com/Satwiktomar.",
  hobbies: "Satwik is deeply involved in competitive programming (150+ DSA problems, 2-star on CodeChef), and he holds multiple Oracle AI Certifications.",
  certifications: "Satwik is an Oracle AI Vector Search Certified Professional, an OCI Generative AI Certified Professional, and holds the OCI AI Foundations Associate certification.",
  achievements: "Satwik qualified for the GATE DA 2026 exam, secured a Top 16 Global finish in a cybersecurity CTF, and organized SANDBOX, Karnataka's largest cybersecurity hackathon.",
  fallback: "I can only answer questions about Satwik Tomar's resume, including Padho.AI experience, AI projects like BeaverAI and AquaGenesis, or his skills in Python and ML. Try asking about his experience!",
}
