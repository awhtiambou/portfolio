import type { Project } from "@/types";

export const projects: Project[] = [
  // 1. KALFOU - Transportation Ecosystem
  {
    id: "proj-1",
    slug: "kalfou-transportation-ecosystem",
    title: "Kalfou",
    description:
      "Comprehensive transportation platform with ride-hailing, package delivery, and food delivery services. Built with microservices architecture featuring 1 API, 3 mobile apps, and 3 web applications.",
    longDescription: `
# Kalfou - Complete Transportation & Delivery Platform

## Project Vision
Kalfou is an ambitious, full-scale transportation and delivery ecosystem designed to serve multiple user segments through a unified platform. The system integrates ride-hailing, package delivery, and food delivery services into a cohesive, scalable solution.

## System Architecture

### Microservices Backend
**Central Web API** (ASP.NET Core)
- Unified RESTful API serving all client applications
- Microservices-oriented architecture for scalability
- Service separation: User Management, Ride Service, Delivery Service, Payment Service
- Real-time location tracking with SignalR
- JWT-based authentication and authorization
- Rate limiting and API gateway pattern

### Mobile Applications (Flutter/Dart)

**1. Customer Mobile App**
- Request rides with real-time driver tracking
- Order food from local restaurants
- Send packages with courier tracking
- Payment integration (Mobile Money, Cards)
- Order history and receipts
- In-app chat with drivers/couriers
- Rating and review system

**2. Driver Mobile App**
- Accept/reject ride requests
- Real-time navigation and routing
- Earnings dashboard and analytics
- Trip history and performance metrics
- In-app communication with customers
- Offline mode for basic operations

**3. Delivery Personnel App**
- Accept food and package delivery requests
- Optimized route planning
- Proof of delivery (photos, signatures)
- Earnings tracking
- Customer communication

### Web Applications (React + TypeScript)

**1. Customer Web Portal**
- Full-featured web version of mobile app
- Desktop-optimized UI for easier browsing
- Advanced search and filtering
- Booking management
- Account settings and preferences

**2. Business/Restaurant Dashboard**
- Restaurant partners can manage menus
- Track orders in real-time
- Analytics and sales reports
- Promotion management
- Delivery coordination

**3. Admin Dashboard**
- Comprehensive system monitoring
- User management (customers, drivers, restaurants)
- Order and ride tracking across platform
- Financial analytics and reporting
- Support ticket management
- Configuration and settings
- Fraud detection and prevention

## Core Features

### Ride-Hailing Service
- Real-time GPS tracking
- Dynamic pricing based on demand
- Multiple vehicle categories
- Scheduled rides
- Ride sharing options
- Safety features (emergency button, trip sharing)

### Food Delivery Service
- Restaurant browsing and search
- Menu management
- Real-time order tracking
- Estimated delivery time
- Special instructions and preferences
- Multiple cuisine categories

### Package Delivery Service
- Same-day and scheduled deliveries
- Package size and weight categories
- Fragile item handling
- Delivery proof (photos, signatures)
- Package tracking
- Insurance options

## Technical Stack

### Backend
- ASP.NET Core 6.0 Web API
- SQL Server for relational data
- Redis for caching and sessions
- SignalR for real-time communication
- Entity Framework Core
- Azure Service Bus for message queuing

### Mobile (Cross-platform)
- Flutter 3.x
- Dart programming language
- Google Maps SDK
- Firebase Cloud Messaging (push notifications)
- Local storage (Hive/SQLite)
- Riverpod for state management

### Web Frontend
- React 18 with TypeScript
- Next.js for SSR and routing
- Redux Toolkit for state management
- Socket.io for real-time updates
- Mapbox for web mapping
- Tailwind CSS + Material-UI

### Infrastructure & DevOps
- Docker containerization
- Kubernetes orchestration
- Azure cloud hosting
- CI/CD with Azure DevOps
- Monitoring with Application Insights
- Automated testing (unit, integration, E2E)

## Database Design
- 30+ normalized tables
- Optimized for high-frequency reads/writes
- Geospatial indexing for location queries
- Partitioning for scalability
- Backup and disaster recovery

## Security & Compliance
- End-to-end encryption for sensitive data
- PCI DSS compliance for payments
- GDPR-compliant data handling
- Role-based access control (RBAC)
- API rate limiting and throttling
- Regular security audits

## Scalability Features
- Horizontal scaling capability
- Load balancing across services
- Database sharding for high volume
- CDN for static assets
- Caching strategy (Redis)
- Asynchronous processing with queues

## Business Impact
- Multi-service platform reduces customer app fatigue
- Unified driver/courier pool increases efficiency
- Centralized admin reduces operational overhead
- Data insights across services for business intelligence
- Platform economy creating employment opportunities
    `,
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2670&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551817958-11e0f7bbea7d?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=2680&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop",
    ],
    technologies: [
      "ASP.NET Core",
      "C#",
      "Flutter",
      "Dart",
      "React",
      "Next.js",
      "TypeScript",
      "SQL Server",
      "Redis",
      "SignalR",
      "Azure",
      "Docker",
      "Kubernetes",
      "Google Maps API",
      "Firebase",
      "Socket.io",
      "Redux Toolkit"
    ],
    categories: ["web", "mobile", "design", "devops"],
    featured: true,
    startDate: "2023-06",
    status: "in-progress",
  },

  // 2. MRLABELLING (HoloLens 3D Reconstruction)
  {
    id: "proj-2",
    slug: "mrlabelling-3d-reconstruction-hololens",
    title: "MrLabelling",
    description:
      "Advanced research platform for automatic 3D object segmentation and reconstruction using HoloLens 2. Combines multiple AI models (YOLO, Mask R-CNN, SAM) achieving 80% precision for mixed reality applications.",
    longDescription: `
# MrLabelling - 3D Object Reconstruction for Mixed Reality

## Overview
MrLabelling is a cutting-edge research project developed as part of my Master's thesis at UQAC, focused on automatic 3D object segmentation and reconstruction from Microsoft HoloLens 2 data. The platform serves dual purposes: advancing mixed reality experiences in smart environments and providing a robust annotation tool for creating high-quality training datasets.

## Research Objectives
- Develop automated 3D reconstruction pipeline from HoloLens 2 sensor data
- Compare state-of-the-art segmentation models for real-world performance
- Create practical mixed reality application for smart environment interaction
- Build professional annotation platform for machine learning dataset creation
- Contribute to academic research in computer vision and mixed reality

## Segmentation & Annotation Platform

### Multi-Model AI Pipeline
**YOLO Integration**
- Fast object detection and classification
- Real-time performance optimization
- Custom training on HoloLens 2 captured data
- Bounding box generation for rapid annotation

**Mask R-CNN Implementation**
- Precise instance segmentation
- Pixel-perfect object boundaries
- Multi-class object detection
- High-quality mask generation

**SAM (Segment Anything Model)**
- Zero-shot segmentation capabilities
- Interactive point-and-click annotation
- Automatic mask refinement
- Transfer learning optimization

**Performance Metrics**
- Achieved up to 80% precision on custom dataset
- Comparative analysis across all three models
- Optimized for HoloLens 2 computational constraints
- Real-time inference capabilities

### Professional Annotation Features

**Annotation Types**
- Bounding Boxes: Object detection dataset creation
- Polygon Segmentation: Precise object boundary annotation
- 3D Point Cloud Annotation: Spatial data labeling
- Semantic Segmentation: Pixel-level classification
- Keypoint Annotation: For 3D pose estimation

**Collaborative Workflows**
- Multi-user annotation sessions
- Role-based access (Admin, Annotator, Reviewer)
- Quality control and review system
- Version control for annotations
- Inter-annotator agreement metrics

**Productivity Tools**
- AI-assisted pre-annotation
- Keyboard shortcuts for rapid labeling
- Batch operations across images
- Reusable annotation templates
- Export to multiple formats (COCO, YOLO, Pascal VOC)

## 3D Reconstruction Pipeline

### OccupancyNet Architecture
- Deep learning-based volumetric reconstruction
- Learned implicit surface representation
- High-quality mesh generation
- Successfully processed 200+ segmented objects

### HoloLens 2 Data Processing
- Depth sensor fusion
- RGB-D image alignment
- Point cloud generation and filtering
- Spatial mapping integration
- Real-time mesh updating

### Reconstruction Workflow
1. **Capture**: HoloLens 2 spatial scanning
2. **Segmentation**: AI model object detection
3. **Annotation**: Manual refinement (if needed)
4. **Reconstruction**: OccupancyNet mesh generation
5. **Validation**: Quality assurance and metrics
6. **Export**: Multiple format support (OBJ, PLY, FBX)

## Mixed Reality Application

### HoloLens 2 Integration
- Native Unity-based MR application
- Real-time object visualization
- Gesture-based interaction controls
- Voice command support
- Spatial anchors for persistent placement

### Smart Environment Features
- Object recognition in real spaces
- Contextual information overlay
- Interactive virtual annotations
- Remote collaboration capabilities
- AR navigation and guidance

### User Experience Design
- Intuitive hand gesture controls
- Gaze-based selection system
- Voice command integration
- Haptic feedback
- Accessibility considerations

## Technical Implementation

### Development Stack
**AI/ML Framework**
- PyTorch for model training
- TensorFlow for deployment
- ONNX for model optimization
- OpenCV for image processing
- Open3D for point cloud operations

**Mixed Reality**
- Unity 2021 LTS
- Mixed Reality Toolkit (MRTK)
- HoloLens 2 SDK
- Spatial Mapping APIs
- Azure Spatial Anchors

**Backend & Infrastructure**
- Python Flask API
- MongoDB for annotation storage
- AWS S3 for image/mesh storage
- Docker containerization
- CI/CD with GitHub Actions

### Performance Optimizations
- Model quantization for edge deployment
- Mesh decimation for rendering performance
- Async processing pipelines
- Efficient memory management
- Battery life optimization for HoloLens

## Research Contributions

### Academic Output
**Publication**
- Co-authored paper: "Automatic 3D Object Segmentation and Reconstruction from HoloLens 2 Data for Mixed Reality in Smart Environments"
- Submitted to UCAml 2025 (17th International Conference on Ubiquitous Computing and Ambient Intelligence)
- Springer Lecture Notes in Networks and Systems

**Novel Contributions**
- Comparative analysis of segmentation models on HoloLens data
- Hybrid annotation-reconstruction pipeline
- Real-time MR visualization of reconstructed objects
- Open-source tools for research community

### Practical Applications
- Medical imaging and surgical planning
- Industrial maintenance and repair
- Architectural visualization
- Museum and cultural heritage preservation
- Education and training simulations

## Dataset Creation

### Custom Dataset Statistics
- 1000+ HoloLens 2 captured scenes
- 200+ fully annotated 3D objects
- Multiple object categories (furniture, electronics, tools)
- Diverse lighting and environmental conditions
- High-quality ground truth annotations

### Annotation Quality
- Inter-annotator agreement > 85%
- Multiple validation passes
- Expert review for complex objects
- Automated quality checks
- Comprehensive metadata

## Future Work
- Real-time collaborative MR annotation
- Integration with more AI models
- Cloud-based processing pipeline
- Mobile device support (ARKit/ARCore)
- Expanded object categories
- Automatic texture reconstruction
    `,
    image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?q=80&w=2670&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=2678&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1535378620166-273708d44e4c?q=80&w=2666&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=2670&auto=format&fit=crop",
    ],
    technologies: [
      "Python",
      "PyTorch",
      "TensorFlow",
      "YOLO",
      "Mask R-CNN",
      "SAM",
      "Unity",
      "HoloLens 2",
      "OpenCV",
      "Open3D",
      "Flask",
      "MongoDB",
      "AWS S3",
      "Mixed Reality",
      "MRTK"
    ],
    categories: ["ai", "ml", "mlops"],
    featured: true,
    startDate: "2024-12",
    endDate: "2025-07",
    status: "completed",
  },

  // 3. TIAMSHOP - E-Commerce Platform
  {
    id: "proj-3",
    slug: "tiamshop-ecommerce-platform",
    title: "Tiamshop",
    description:
      "Full-stack e-commerce platform for electronics sales with ASP.NET Core backend and React frontend. Features complete product management, order processing, and delivery tracking. Best capstone project award (18.5/20).",
    longDescription: `
# Tiamshop - Modern E-Commerce Solution

## Overview
Tiamshop is a comprehensive e-commerce platform developed as a Bachelor's thesis project, specializing in electronic products sales. The platform addresses the growing demand for online shopping in Niger while providing a robust, scalable solution.

## Project Context
- **Academic Achievement**: Best capstone project award (18.5/20)
- **Market Need**: Addresses the emerging e-commerce market in Niger
- **Complete System**: From product catalog to delivery management

## Key Features

### Customer Features
- **Product Catalog**: Browse 70+ electronic products with detailed specifications
- **Advanced Search**: Filter by category, price, brand, and technical specifications
- **Shopping Cart**: Persistent cart with local storage
- **Order Tracking**: Real-time order status updates
- **Multiple Payment Methods**: Airtel Money, Orange Money, and cash on delivery
- **User Accounts**: Secure authentication with email verification

### Admin Dashboard
- **Product Management**: CRUD operations for products, categories, and brands
- **Order Processing**: Validate, reject, and track customer orders
- **Delivery Management**: Assign orders to delivery personnel by sector
- **Inventory Control**: Manage stock levels and product availability
- **Analytics**: Sales tracking and business insights

### Delivery Personnel Interface
- **Delivery Queue**: View assigned deliveries by location
- **Status Updates**: Mark deliveries as in progress or completed
- **Route Optimization**: Sector-based assignment system

## Technical Architecture

### Backend (ASP.NET Core Web API)
- **RESTful API**: Clean architecture with service layer pattern
- **Authentication**: JWT-based secure authentication
- **Database**: SQL Server with Entity Framework Core
- **Email Service**: Mailgun integration for transactional emails
- **ORM**: Dapper for optimized database queries

### Frontend (React + TypeScript)
- **Modern UI**: React with TypeScript for type safety
- **State Management**: Redux Toolkit for complex state
- **Styling**: Tailwind CSS + Material-UI components
- **Responsive Design**: Mobile-first approach
- **Performance**: Code splitting and lazy loading

## Development Methodology
- **Scrum Framework**: 6 sprints over 6 months
- **Version Control**: Git with feature branch workflow
- **Testing**: Unit tests (Jest, NUnit) and integration tests (Postman)
- **Documentation**: UML diagrams for system design

## Deployment
- **Frontend**: Netlify with continuous deployment
- **Backend**: Microsoft Azure App Service
- **Database**: Azure SQL Database
- **CI/CD**: Automated deployment pipeline via GitHub Actions

## Database Design
- Relational database with 15+ tables
- Normalized schema (3NF) for data integrity
- Optimized queries with proper indexing
- Support for 1000+ product entries

## Business Impact
- Addresses trust issues in online payments in Niger
- Provides reliable delivery service
- Supports local electronic retailers
- Enables digital transformation for traditional businesses
    `,
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2832&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2670&auto=format&fit=crop",
    ],
    technologies: [
      "ASP.NET Core",
      "C#",
      "React",
      "TypeScript",
      "Redux Toolkit",
      "SQL Server",
      "Tailwind CSS",
      "Material-UI",
      "JWT",
      "Azure",
      "Netlify",
      "Dapper",
      "Entity Framework",
      "Mailgun"
    ],
    categories: ["web", "backend"],
    featured: true,
    startDate: "2022-10",
    endDate: "2023-05",
    status: "completed",
    liveUrl: "https://tiamshop.netlify.app",
    githubUrl: "https://github.com/awhtiambou/tiamshop",
  },

  // 4. PERSONAL PORTFOLIO
  {
    id: "proj-4",
    slug: "personal-portfolio-website",
    title: "Personal Portfolio",
    description:
      "Modern, high-performance portfolio built with Next.js 15, featuring advanced animations, dark/light themes, and full English/French internationalization. Showcases projects and professional journey.",
    longDescription: `
# Professional Portfolio Website

## Overview
This very website you're viewing! A modern, meticulously crafted portfolio showcasing my work, skills, and professional journey. Built with cutting-edge technologies and best practices in web development.

## Design Philosophy
- **Minimalist Aesthetic**: Clean, focused design that highlights content
- **Performance First**: Optimized for speed and user experience
- **Accessibility**: WCAG 2.1 AA compliant
- **Mobile-First**: Responsive design for all screen sizes

## Key Features

### Technical Excellence
- **Next.js 15 App Router**: Latest React Server Components architecture
- **TypeScript**: Full type safety across the application
- **Server-Side Rendering**: Fast initial page loads and SEO optimization
- **Static Site Generation**: Pre-rendered pages for maximum performance
- **Image Optimization**: Next.js Image component with automatic format selection

### User Experience
- **Framer Motion Animations**: Smooth, professional page transitions
- **Dark/Light Mode**: Seamless theme switching with system preference detection
- **Internationalization**: Full English and French support
- **Responsive Design**: Perfect experience on mobile, tablet, and desktop
- **Interactive Elements**: Engaging hover effects and micro-interactions

### Advanced Features
- **Custom Design System**: Tailored Tailwind CSS configuration
- **Typography**: Carefully selected font combinations (Besley, Inter, Work Sans)
- **Spotlight Effects**: Interactive project card highlighting
- **Scroll Animations**: Smooth reveal effects on scroll
- **Performance Monitoring**: Optimized Core Web Vitals

## Technical Implementation

### Architecture
- Component-based architecture with React Server Components
- Modular design system with reusable UI components
- Type-safe internationalization with next-intl
- Automatic route-based code splitting

### Styling
- Tailwind CSS for utility-first styling
- CSS-in-JS with Framer Motion for animations
- Custom design tokens for colors and spacing
- Dark mode with CSS variables

### Performance
- Optimized bundle size with tree shaking
- Image lazy loading and responsive images
- Font optimization with next/font
- Minimal JavaScript for fast Time to Interactive

### SEO & Accessibility
- Semantic HTML5 structure
- Proper heading hierarchy
- ARIA labels and roles
- Open Graph and Twitter Cards
- Sitemap and robots.txt

## Development Workflow
- **Version Control**: Git with conventional commits
- **Code Quality**: ESLint and Prettier
- **Type Checking**: Strict TypeScript configuration
- **Deployment**: Automated CI/CD with Vercel/Netlify

## Lessons Learned
This project deepened my understanding of:
- Modern React patterns and Server Components
- Performance optimization techniques
- Internationalization implementation
- Advanced CSS and animation
- Type-safe development practices

## Continuous Improvement
The portfolio is continuously updated with:
- New projects and experiences
- Performance optimizations
- Design refinements
- Feature additions based on feedback
    `,
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=2669&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop",
    ],
    technologies: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "next-intl",
      "Vercel",
      "ESLint",
      "Prettier"
    ],
    categories: ["web", "design"],
    featured: false,
    startDate: "2024-11",
    status: "in-progress",
    liveUrl: "https://awhtiambou.com",
    githubUrl: "https://github.com/awhtiambou/portfolio",
  },

  // 5. THORAXVISION - AI Medical Imaging
  {
    id: "proj-5",
    slug: "thoraxvision-pulmonary-disease-detection",
    title: "ThoraxVision",
    description:
      "AI-powered web application for detecting pulmonary diseases from chest X-rays using deep learning. Features YOLO-based detection with 80% accuracy on NIH dataset.",
    longDescription: `
# ThoraxVision - AI Pulmonary Disease Detection

## Overview
ThoraxVision is an innovative deep learning application designed to assist medical professionals in diagnosing pulmonary diseases from chest X-ray images. The system combines state-of-the-art computer vision with an intuitive web interface.

## Key Features
- **AI-Powered Detection**: Deep learning model trained on the NIH Chest X-ray Dataset
- **Multi-Disease Classification**: Detects various pulmonary conditions including pneumonia, tuberculosis, and more
- **Patient Data Integration**: Combines image analysis with patient medical data for comprehensive diagnosis
- **RESTful API**: Flask-based API for integration with existing medical systems
- **Real-time Analysis**: Processes X-ray images and provides results within seconds
- **User-Friendly Interface**: Modern React-based UI designed for medical professionals

## Technical Implementation
- **Model**: YOLO architecture adapted for medical imaging
- **Training Data**: NIH Chest X-ray Dataset with thousands of annotated images
- **Backend**: Flask API with TensorFlow integration
- **Frontend**: React with Material-UI and Tailwind CSS
- **Deployment**: Docker containerization for easy deployment

## Results & Impact
- Achieved 80%+ accuracy on test dataset
- Reduced diagnosis time from hours to seconds
- Designed for both local deployment and third-party system integration
- Open-source API for medical research applications
    `,
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=2831&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=2687&auto=format&fit=crop",
    ],
    technologies: ["Python", "TensorFlow", "YOLO", "Flask", "React", "Tailwind CSS", "Material-UI", "Docker"],
    categories: ["ai", "ml", "web"],
    featured: true,
    startDate: "2024-06",
    endDate: "2024-06",
    status: "completed",
    githubUrl: "https://github.com/awhtiambou/thoraxvision",
  },
];

// Helper functions
export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsByCategory(category: Project["categories"][0]): Project[] {
  return projects.filter((project) => project.categories.includes(category));
}

export function getAllProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}

// Get all unique categories from all projects
export function getAllCategories(): Project["categories"][0][] {
  const allCategories = projects.flatMap(p => p.categories);
  return Array.from(new Set(allCategories));
}