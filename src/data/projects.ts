import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "proj-1",
    slug: "ml-sentiment-analysis",
    title: "ML Sentiment Analysis Engine",
    description:
      "A deep learning model for real-time sentiment analysis using transformers and BERT, achieving 94% accuracy on benchmark datasets.",
    longDescription: `
# Sentiment Analysis Engine

## Overview
Built an end-to-end sentiment analysis system using state-of-the-art NLP techniques. The system processes text in real-time and classifies sentiment as positive, negative, or neutral with high accuracy.

## Key Features
- Real-time sentiment classification
- Support for multiple languages
- RESTful API for easy integration
- Interactive dashboard for visualization
- Model performance monitoring

## Technical Implementation
- Fine-tuned BERT model on custom dataset
- Deployed using FastAPI and Docker
- Implemented model versioning with MLflow
- Set up CI/CD pipeline for automated deployments

## Results
- 94% accuracy on test dataset
- < 100ms inference time
- Successfully processed 1M+ requests
    `,
    image: "/projects/sentiment-analysis.png",
    technologies: ["Python", "PyTorch", "Transformers", "BERT", "FastAPI", "Docker", "MLflow"],
    category: "ml",
    featured: true,
    startDate: "2024-01",
    endDate: "2024-03",
    status: "completed",
    liveUrl: "https://sentiment-demo.example.com",
    githubUrl: "https://github.com/username/sentiment-analysis",
  },
  {
    id: "proj-2",
    slug: "ai-chatbot-platform",
    title: "AI Chatbot Platform",
    description:
      "An intelligent chatbot platform using LLMs with RAG architecture for contextual conversations and document Q&A.",
    longDescription: `
# AI Chatbot Platform

## Overview
Developed a sophisticated chatbot platform leveraging Large Language Models with Retrieval-Augmented Generation (RAG) for accurate, contextual responses.

## Key Features
- Contextual conversation memory
- Document upload and Q&A
- Multi-model support (GPT-4, Claude)
- Custom knowledge base integration
- Analytics dashboard

## Technical Implementation
- Built with LangChain for LLM orchestration
- Vector database for semantic search
- Real-time WebSocket communication
- Modular architecture for easy extension
    `,
    image: "/projects/chatbot-platform.png",
    technologies: ["Python", "LangChain", "OpenAI", "Pinecone", "Next.js", "WebSocket", "Redis"],
    category: "ai",
    featured: true,
    startDate: "2024-06",
    status: "in-progress",
    githubUrl: "https://github.com/username/chatbot-platform",
  },
  {
    id: "proj-3",
    slug: "mlops-pipeline",
    title: "End-to-End MLOps Pipeline",
    description:
      "A comprehensive MLOps infrastructure with automated training, testing, model versioning, and deployment workflows.",
    longDescription: `
# MLOps Pipeline

## Overview
Designed and implemented a production-grade MLOps pipeline that automates the entire machine learning lifecycle from data ingestion to model deployment.

## Key Features
- Automated data validation and preprocessing
- Distributed model training
- A/B testing framework
- Model monitoring and alerting
- One-click rollback capability

## Technical Implementation
- Kubernetes for orchestration
- GitHub Actions for CI/CD
- MLflow for experiment tracking
- Prometheus + Grafana for monitoring
    `,
    image: "/projects/mlops-pipeline.png",
    technologies: ["Docker", "Kubernetes", "MLflow", "GitHub Actions", "Prometheus", "Grafana", "Terraform"],
    category: "mlops",
    featured: true,
    startDate: "2024-03",
    endDate: "2024-05",
    status: "completed",
    githubUrl: "https://github.com/username/mlops-pipeline",
  },
  {
    id: "proj-4",
    slug: "computer-vision-detection",
    title: "Object Detection System",
    description:
      "Real-time object detection system using YOLO for industrial quality control applications.",
    longDescription: `
# Object Detection System

## Overview
Built a computer vision system for automated quality control in manufacturing, detecting defects in real-time with high precision.

## Key Features
- Real-time video processing
- Multi-class defect detection
- Edge deployment capability
- Integration with existing systems
- Detailed reporting dashboard
    `,
    image: "/projects/object-detection.png",
    technologies: ["Python", "PyTorch", "YOLOv8", "OpenCV", "ONNX", "TensorRT", "FastAPI"],
    category: "ml",
    featured: false,
    startDate: "2023-10",
    endDate: "2024-01",
    status: "completed",
    githubUrl: "https://github.com/username/object-detection",
  },
  {
    id: "proj-5",
    slug: "portfolio-website",
    title: "Personal Portfolio",
    description:
      "Modern portfolio website built with Next.js, TypeScript, and Tailwind CSS featuring dark mode and smooth animations.",
    longDescription: `
# Portfolio Website

## Overview
This very website you're viewing! A modern, responsive portfolio showcasing my work and skills.

## Key Features
- Dark/Light theme support
- Smooth page transitions
- Mobile-first responsive design
- SEO optimized
- Performance optimized
    `,
    image: "/projects/portfolio.png",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "MUI"],
    category: "web",
    featured: false,
    startDate: "2024-11",
    status: "in-progress",
    liveUrl: "https://awhtiambou.com",
    githubUrl: "https://github.com/username/portfolio",
  },
];

// Helper functions
export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsByCategory(category: Project["category"]): Project[] {
  return projects.filter((project) => project.category === category);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}
