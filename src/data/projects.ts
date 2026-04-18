import type { Project } from "@/types";

//
// Key format:  $t:<slug>.sections.<sectionId>.<field>
// Example:     $t:kalfou-transportation-ecosystem.sections.vision.heading
//

export const projects: Project[] = [

  {
    id: "proj-1",
    slug: "kalfou-transportation-ecosystem",
    title: "Kalfou",
    description: "$t:kalfou-transportation-ecosystem.description",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2670&auto=format&fit=crop",
    sections: [
      {
        label: "$t:kalfou-transportation-ecosystem.sections.vision.label",
        heading: "$t:kalfou-transportation-ecosystem.sections.vision.heading",
        elements: [
          {
            type: "text",
            content: "$t:kalfou-transportation-ecosystem.sections.vision.text",
          },
          {
            type: "stat-grid",
            stats: [
              { label: "$t:kalfou-transportation-ecosystem.sections.vision.stat0.label", value: "2", note: "$t:kalfou-transportation-ecosystem.sections.vision.stat0.note" },
              { label: "$t:kalfou-transportation-ecosystem.sections.vision.stat1.label", value: "3", note: "$t:kalfou-transportation-ecosystem.sections.vision.stat1.note" },
              { label: "$t:kalfou-transportation-ecosystem.sections.vision.stat2.label", value: "3", note: "$t:kalfou-transportation-ecosystem.sections.vision.stat2.note" },
              { label: "$t:kalfou-transportation-ecosystem.sections.vision.stat3.label", value: "1", note: "$t:kalfou-transportation-ecosystem.sections.vision.stat3.note" },
            ],
          },
        ],
      },
      {
        fullwidth: true,
        elements: [
          {
            type: "image-fullwidth",
            src: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2670&auto=format&fit=crop",
            alt: "$t:kalfou-transportation-ecosystem.sections.coverImage.alt",
            height: "h-[60vh]",
          },
        ],
      },
      {
        label: "$t:kalfou-transportation-ecosystem.sections.architecture.label",
        heading: "$t:kalfou-transportation-ecosystem.sections.architecture.heading",
        elements: [
          {
            type: "text",
            content: "$t:kalfou-transportation-ecosystem.sections.architecture.text",
          },
          {
            type: "list",
            variant: "check",
            items: [
              "$t:kalfou-transportation-ecosystem.sections.architecture.list.0",
              "$t:kalfou-transportation-ecosystem.sections.architecture.list.1",
              "$t:kalfou-transportation-ecosystem.sections.architecture.list.2",
              "$t:kalfou-transportation-ecosystem.sections.architecture.list.3",
              "$t:kalfou-transportation-ecosystem.sections.architecture.list.4",
              "$t:kalfou-transportation-ecosystem.sections.architecture.list.5",
            ],
          },
          {
            type: "image-grid",
            cols: 2,
            images: [
              {
                src: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2670&auto=format&fit=crop",
                alt: "$t:kalfou-transportation-ecosystem.sections.architecture.img0.alt",
                caption: "$t:kalfou-transportation-ecosystem.sections.architecture.img0.caption",
              },
              {
                src: "https://images.unsplash.com/photo-1551817958-11e0f7bbea7d?q=80&w=2670&auto=format&fit=crop",
                alt: "$t:kalfou-transportation-ecosystem.sections.architecture.img1.alt",
                caption: "$t:kalfou-transportation-ecosystem.sections.architecture.img1.caption",
              },
            ],
          },
        ],
      },
      {
        label: "$t:kalfou-transportation-ecosystem.sections.mobile.label",
        heading: "$t:kalfou-transportation-ecosystem.sections.mobile.heading",
        elements: [
          {
            type: "text",
            content: "$t:kalfou-transportation-ecosystem.sections.mobile.text",
          },
          {
            type: "list",
            variant: "bullet",
            items: [
              "$t:kalfou-transportation-ecosystem.sections.mobile.list.0",
              "$t:kalfou-transportation-ecosystem.sections.mobile.list.1",
              "$t:kalfou-transportation-ecosystem.sections.mobile.list.2",
            ],
          },
          {
            type: "image",
            src: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=2680&auto=format&fit=crop",
            alt: "$t:kalfou-transportation-ecosystem.sections.mobile.img.alt",
            size: "large",
            caption: "$t:kalfou-transportation-ecosystem.sections.mobile.img.caption",
          },
        ],
      },
      {
        fullwidth: true,
        elements: [
          {
            type: "image-fullwidth",
            src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop",
            alt: "$t:kalfou-transportation-ecosystem.sections.adminImage.alt",
            height: "h-[55vh]",
            caption: "$t:kalfou-transportation-ecosystem.sections.adminImage.caption",
          },
        ],
      },
      {
        label: "$t:kalfou-transportation-ecosystem.sections.web.label",
        heading: "$t:kalfou-transportation-ecosystem.sections.web.heading",
        elements: [
          {
            type: "list",
            variant: "numbered",
            items: [
              "$t:kalfou-transportation-ecosystem.sections.web.list.0",
              "$t:kalfou-transportation-ecosystem.sections.web.list.1",
              "$t:kalfou-transportation-ecosystem.sections.web.list.2",
            ],
          },
        ],
      },
      {
        label: "$t:kalfou-transportation-ecosystem.sections.stack.label",
        heading: "$t:kalfou-transportation-ecosystem.sections.stack.heading",
        elements: [
          {
            type: "text",
            content: "$t:kalfou-transportation-ecosystem.sections.stack.text",
          },
          {
            type: "callout",
            variant: "info",
            title: "$t:kalfou-transportation-ecosystem.sections.stack.callout.title",
            content: "$t:kalfou-transportation-ecosystem.sections.stack.callout.content",
          },
          {
            type: "image-grid",
            cols: 2,
            images: [
              {
                src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop",
                alt: "$t:kalfou-transportation-ecosystem.sections.stack.img0.alt",
                caption: "$t:kalfou-transportation-ecosystem.sections.stack.img0.caption",
              },
              {
                src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2668&auto=format&fit=crop",
                alt: "$t:kalfou-transportation-ecosystem.sections.stack.img1.alt",
                caption: "$t:kalfou-transportation-ecosystem.sections.stack.img1.caption",
              },
            ],
          },
        ],
      },
      {
        label: "$t:kalfou-transportation-ecosystem.sections.impact.label",
        elements: [
          {
            type: "stat-grid",
            stats: [
              { label: "$t:kalfou-transportation-ecosystem.sections.impact.stat0.label", value: "↓", note: "$t:kalfou-transportation-ecosystem.sections.impact.stat0.note" },
              { label: "$t:kalfou-transportation-ecosystem.sections.impact.stat1.label", value: "↑", note: "$t:kalfou-transportation-ecosystem.sections.impact.stat1.note" },
              { label: "$t:kalfou-transportation-ecosystem.sections.impact.stat2.label", value: "↓", note: "$t:kalfou-transportation-ecosystem.sections.impact.stat2.note" },
              { label: "$t:kalfou-transportation-ecosystem.sections.impact.stat3.label", value: "+", note: "$t:kalfou-transportation-ecosystem.sections.impact.stat3.note" },
            ],
          },
        ],
      },
    ],
    technologies: [
      "ASP.NET Core", "C#", "Flutter", "Dart", "React", "Next.js", "TypeScript", "Redis", "SignalR", "AWS", "Docker", "Kubernetes",
      "Google Maps API", "Firebase", "Socket.io", "Redux Toolkit", "Tailwind CSS", "PostgreSQL", "EF Core", "SEO",
    ],
    categories: ["web", "mobile", "design", "devops"],
    featured: true,
    startDate: "2025-12",
    status: "in-progress",
  },

  {
    id: "proj-2",
    slug: "mrlabelling-3d-reconstruction-hololens",
    title: "MrLabelling",
    description: "$t:mrlabelling-3d-reconstruction-hololens.description",
    image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?q=80&w=2670&auto=format&fit=crop",
    sections: [
      {
        label: "$t:mrlabelling-3d-reconstruction-hololens.sections.overview.label",
        heading: "$t:mrlabelling-3d-reconstruction-hololens.sections.overview.heading",
        elements: [
          {
            type: "text",
            content: "$t:mrlabelling-3d-reconstruction-hololens.sections.overview.text",
          },
          {
            type: "stat-grid",
            stats: [
              { label: "$t:mrlabelling-3d-reconstruction-hololens.sections.overview.stat0.label", value: "80%", note: "$t:mrlabelling-3d-reconstruction-hololens.sections.overview.stat0.note" },
              { label: "$t:mrlabelling-3d-reconstruction-hololens.sections.overview.stat1.label", value: "200+", note: "$t:mrlabelling-3d-reconstruction-hololens.sections.overview.stat1.note" },
              { label: "$t:mrlabelling-3d-reconstruction-hololens.sections.overview.stat2.label", value: "3", note: "$t:mrlabelling-3d-reconstruction-hololens.sections.overview.stat2.note" },
              { label: "$t:mrlabelling-3d-reconstruction-hololens.sections.overview.stat3.label", value: "UCAml 2025", note: "$t:mrlabelling-3d-reconstruction-hololens.sections.overview.stat3.note" },
            ],
          },
        ],
      },
      {
        fullwidth: true,
        elements: [
          {
            type: "image-fullwidth",
            src: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?q=80&w=2670&auto=format&fit=crop",
            alt: "$t:mrlabelling-3d-reconstruction-hololens.sections.coverImage.alt",
            height: "h-[65vh]",
          },
        ],
      },
      {
        label: "$t:mrlabelling-3d-reconstruction-hololens.sections.pipeline.label",
        heading: "$t:mrlabelling-3d-reconstruction-hololens.sections.pipeline.heading",
        elements: [
          {
            type: "list",
            variant: "bullet",
            items: [
              "$t:mrlabelling-3d-reconstruction-hololens.sections.pipeline.list.0",
              "$t:mrlabelling-3d-reconstruction-hololens.sections.pipeline.list.1",
              "$t:mrlabelling-3d-reconstruction-hololens.sections.pipeline.list.2",
            ],
          },
          {
            type: "image-grid",
            cols: 2,
            images: [
              {
                src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=2678&auto=format&fit=crop",
                alt: "$t:mrlabelling-3d-reconstruction-hololens.sections.pipeline.img0.alt",
                caption: "$t:mrlabelling-3d-reconstruction-hololens.sections.pipeline.img0.caption",
              },
              {
                src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
                alt: "$t:mrlabelling-3d-reconstruction-hololens.sections.pipeline.img1.alt",
                caption: "$t:mrlabelling-3d-reconstruction-hololens.sections.pipeline.img1.caption",
              },
            ],
          },
        ],
      },
      {
        label: "$t:mrlabelling-3d-reconstruction-hololens.sections.reconstruction.label",
        heading: "$t:mrlabelling-3d-reconstruction-hololens.sections.reconstruction.heading",
        elements: [
          {
            type: "list",
            variant: "numbered",
            items: [
              "$t:mrlabelling-3d-reconstruction-hololens.sections.reconstruction.list.0",
              "$t:mrlabelling-3d-reconstruction-hololens.sections.reconstruction.list.1",
              "$t:mrlabelling-3d-reconstruction-hololens.sections.reconstruction.list.2",
              "$t:mrlabelling-3d-reconstruction-hololens.sections.reconstruction.list.3",
              "$t:mrlabelling-3d-reconstruction-hololens.sections.reconstruction.list.4",
              "$t:mrlabelling-3d-reconstruction-hololens.sections.reconstruction.list.5",
            ],
          },
          {
            type: "image-grid",
            cols: 2,
            images: [
              {
                src: "https://images.unsplash.com/photo-1535378620166-273708d44e4c?q=80&w=2666&auto=format&fit=crop",
                alt: "$t:mrlabelling-3d-reconstruction-hololens.sections.reconstruction.img0.alt",
                caption: "$t:mrlabelling-3d-reconstruction-hololens.sections.reconstruction.img0.caption",
              },
              {
                src: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=2670&auto=format&fit=crop",
                alt: "$t:mrlabelling-3d-reconstruction-hololens.sections.reconstruction.img1.alt",
                caption: "$t:mrlabelling-3d-reconstruction-hololens.sections.reconstruction.img1.caption",
              },
            ],
          },
        ],
      },
      {
        label: "$t:mrlabelling-3d-reconstruction-hololens.sections.publication.label",
        elements: [
          {
            type: "callout",
            variant: "success",
            title: "$t:mrlabelling-3d-reconstruction-hololens.sections.publication.callout.title",
            content: "$t:mrlabelling-3d-reconstruction-hololens.sections.publication.callout.content",
          },
        ],
      },
    ],
    technologies: [
      "Python", "PyTorch", "TensorFlow", "YOLO", "Mask R-CNN", "SAM",
      "Unity", "HoloLens 2", "OpenCV", "Open3D", "Flask", "MongoDB", "AWS S3", "MRTK",
    ],
    categories: ["ai", "ml", "mlops"],
    featured: true,
    startDate: "2024-12",
    endDate: "2025-07",
    status: "completed",
  },

  {
    id: "proj-3",
    slug: "tiamshop-ecommerce-platform",
    title: "Tiamshop",
    description: "$t:tiamshop-ecommerce-platform.description",
    image: "/assets/images/projects/tiamshop/1.jpg",
    sections: [
      {
        label: "$t:tiamshop-ecommerce-platform.sections.overview.label",
        heading: "$t:tiamshop-ecommerce-platform.sections.overview.heading",
        elements: [
          {
            type: "text",
            content: "$t:tiamshop-ecommerce-platform.sections.overview.text",
          },
          {
            type: "stat-grid",
            stats: [
              { label: "$t:tiamshop-ecommerce-platform.sections.overview.stat0.label", value: "3-Tier", note: "$t:tiamshop-ecommerce-platform.sections.overview.stat0.note" },
              { label: "$t:tiamshop-ecommerce-platform.sections.overview.stat1.label", value: "18.5/20", note: "$t:tiamshop-ecommerce-platform.sections.overview.stat1.note" },
              { label: "$t:tiamshop-ecommerce-platform.sections.overview.stat2.label", value: "3", note: "$t:tiamshop-ecommerce-platform.sections.overview.stat2.note" },
              { label: "$t:tiamshop-ecommerce-platform.sections.overview.stat3.label", value: "4", note: "$t:tiamshop-ecommerce-platform.sections.overview.stat3.note" },
            ],
          },
        ],
      },
      {
        fullwidth: true,
        elements: [
          {
            type: "image-fullwidth",
            src: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2832&auto=format&fit=crop",
            alt: "$t:tiamshop-ecommerce-platform.sections.coverImage.alt",
            height: "h-[60vh]",
          },
        ],
      },
      {
        label: "$t:tiamshop-ecommerce-platform.sections.architecture.label",
        heading: "$t:tiamshop-ecommerce-platform.sections.architecture.heading",
        elements: [
          {
            type: "text",
            content: "$t:tiamshop-ecommerce-platform.sections.architecture.text",
          },
          {
            type: "list",
            variant: "check",
            items: [
              "$t:tiamshop-ecommerce-platform.sections.architecture.list.0",
              "$t:tiamshop-ecommerce-platform.sections.architecture.list.1",
              "$t:tiamshop-ecommerce-platform.sections.architecture.list.2",
            ],
          },
          {
            type: "image",
            src: "/assets/images/projects/tiamshop/architecture.png",
            alt: "$t:tiamshop-ecommerce-platform.sections.architecture.img.alt",
            size: "large",
            caption: "$t:tiamshop-ecommerce-platform.sections.architecture.img.caption",
          },
        ],
      },
      {
        label: "$t:tiamshop-ecommerce-platform.sections.database.label",
        heading: "$t:tiamshop-ecommerce-platform.sections.database.heading",
        elements: [
           {
            type: "text",
            content: "$t:tiamshop-ecommerce-platform.sections.database.text",
          },
          {
            type: "callout",
            variant: "info",
            title: "$t:tiamshop-ecommerce-platform.sections.database.callout.title",
            content: "$t:tiamshop-ecommerce-platform.sections.database.callout.content",
          },
          {
            type: "image",
            src: "/assets/images/projects/tiamshop/tiamshop-class-diagram.png",
            alt: "$t:tiamshop-ecommerce-platform.sections.database.img.alt",
            size: "large",
            caption: "$t:tiamshop-ecommerce-platform.sections.database.img.caption",
          },
        ]
      },
      {
        label: "$t:tiamshop-ecommerce-platform.sections.features.label",
        heading: "$t:tiamshop-ecommerce-platform.sections.features.heading",
        elements: [
          {
            type: "list",
            variant: "bullet",
            items: [
              "$t:tiamshop-ecommerce-platform.sections.features.list.0",
              "$t:tiamshop-ecommerce-platform.sections.features.list.1",
              "$t:tiamshop-ecommerce-platform.sections.features.list.2",
            ],
          },
          {
            type: "video",
            src: "/assets/videos/projects/tiamshop/user-journey.mp4",
            caption: "$t:tiamshop-ecommerce-platform.sections.features.video.caption",
          },
        ],
      },
    ],
    technologies: [
      "ASP.NET Core", "C#", "React", "TypeScript", "Redux Toolkit",
      "SQL Server", "Tailwind CSS", "Material-UI", "JWT", "Azure", "Netlify",
      "Dapper", "Entity Framework Core", "Mailgun",
    ],
    categories: ["web", "backend"],
    featured: true,
    startDate: "2022-10",
    endDate: "2023-05",
    status: "completed",
    liveUrl: "https://tiamshop.netlify.app",
    githubUrl: "https://github.com/awhtiambou/tiamshop",
  },

  {
    id: "proj-7",
    slug: "clearsheet-document-scanner-ocr",
    title: "ClearSheet",
    description: "$t:clearsheet-document-scanner-ocr.description",
    image: "/assets/images/projects/clearsheet/cover.png",
    sections: [
      {
        label: "$t:clearsheet-document-scanner-ocr.sections.overview.label",
        heading: "$t:clearsheet-document-scanner-ocr.sections.overview.heading",
        elements: [
          {
            type: "text",
            content: "$t:clearsheet-document-scanner-ocr.sections.overview.text",
          },
          {
            type: "stat-grid",
            stats: [
              { label: "$t:clearsheet-document-scanner-ocr.sections.overview.stat0.label", value: "4-stage", note: "$t:clearsheet-document-scanner-ocr.sections.overview.stat0.note" },
              { label: "$t:clearsheet-document-scanner-ocr.sections.overview.stat1.label", value: "FR + EN", note: "$t:clearsheet-document-scanner-ocr.sections.overview.stat1.note" },
              { label: "$t:clearsheet-document-scanner-ocr.sections.overview.stat2.label", value: "3", note: "$t:clearsheet-document-scanner-ocr.sections.overview.stat2.note" },
              { label: "$t:clearsheet-document-scanner-ocr.sections.overview.stat3.label", value: "PNG + PDF", note: "$t:clearsheet-document-scanner-ocr.sections.overview.stat3.note" },
            ],
          },
        ],
      },
      {
        fullwidth: true,
        elements: [
          {
            type: "image-fullwidth",
            src: "/assets/images/projects/clearsheet/cover.png",
            alt: "$t:clearsheet-document-scanner-ocr.sections.coverImage.alt",
            height: "h-[60vh]",
          },
        ],
      },
      {
        label: "$t:clearsheet-document-scanner-ocr.sections.pipeline.label",
        heading: "$t:clearsheet-document-scanner-ocr.sections.pipeline.heading",
        elements: [
          {
            type: "text",
            content: "$t:clearsheet-document-scanner-ocr.sections.pipeline.text",
          },
          {
            type: "list",
            variant: "check",
            items: [
              "$t:clearsheet-document-scanner-ocr.sections.pipeline.list.0",
              "$t:clearsheet-document-scanner-ocr.sections.pipeline.list.1",
              "$t:clearsheet-document-scanner-ocr.sections.pipeline.list.2",
              "$t:clearsheet-document-scanner-ocr.sections.pipeline.list.3",
              "$t:clearsheet-document-scanner-ocr.sections.pipeline.list.4",
            ],
          },
        ],
      },
      {
        fullwidth: true,
        elements: [
          {
            type: "image-fullwidth",
            height: "h-[100vh]",
            src: "/assets/images/projects/clearsheet/workbench.png",
            alt: "$t:clearsheet-document-scanner-ocr.sections.pipeline.img1.alt",
            caption: "$t:clearsheet-document-scanner-ocr.sections.pipeline.img1.caption",
          },
        ]
      },

      {
        label: "$t:clearsheet-document-scanner-ocr.sections.product.label",
        heading: "$t:clearsheet-document-scanner-ocr.sections.product.heading",
        elements: [
          {
            type: "text",
            content: "$t:clearsheet-document-scanner-ocr.sections.product.text",
          },
          {
            type: "list",
            variant: "bullet",
            items: [
              "$t:clearsheet-document-scanner-ocr.sections.product.list.0",
              "$t:clearsheet-document-scanner-ocr.sections.product.list.1",
              "$t:clearsheet-document-scanner-ocr.sections.product.list.2",
              "$t:clearsheet-document-scanner-ocr.sections.product.list.3",
              "$t:clearsheet-document-scanner-ocr.sections.product.list.4",
            ],
          },
          {
            type: "callout",
            variant: "info",
            title: "$t:clearsheet-document-scanner-ocr.sections.product.callout.title",
            content: "$t:clearsheet-document-scanner-ocr.sections.product.callout.content",
          },
        ],
      },
      {
        label: "$t:clearsheet-document-scanner-ocr.sections.delivery.label",
        heading: "$t:clearsheet-document-scanner-ocr.sections.delivery.heading",
        elements: [
          {
            type: "list",
            variant: "bullet",
            items: [
              "$t:clearsheet-document-scanner-ocr.sections.delivery.list.0",
              "$t:clearsheet-document-scanner-ocr.sections.delivery.list.1",
              "$t:clearsheet-document-scanner-ocr.sections.delivery.list.2",
              "$t:clearsheet-document-scanner-ocr.sections.delivery.list.3",
            ],
          },
          {
            type: "link-list",
            links: [
              {
                label: "$t:clearsheet-document-scanner-ocr.sections.delivery.link0.label",
                href: "https://clearsheet.netlify.app",
                description: "$t:clearsheet-document-scanner-ocr.sections.delivery.link0.description",
              },
              {
                label: "$t:clearsheet-document-scanner-ocr.sections.delivery.link1.label",
                href: "https://github.com/awhtiambou/clearsheet",
                description: "$t:clearsheet-document-scanner-ocr.sections.delivery.link1.description",
              },
              {
                label: "$t:clearsheet-document-scanner-ocr.sections.delivery.link2.label",
                href: "https://awhtiambou-clearsheet.hf.space",
                description: "$t:clearsheet-document-scanner-ocr.sections.delivery.link2.description",
              },
            ],
          },
        ],
      },
    ],
    technologies: [
      "Python", "FastAPI", "OpenCV", "NumPy", "pytesseract",
      "Tesseract OCR", "pytest", "Next.js 16", "React 19", "Tailwind CSS 4",
      "Material UI", "Framer Motion", "Docker", "Netlify", "Hugging Face Spaces",
    ],
    categories: ["ai", "web", "backend", "cv"],
    featured: true,
    startDate: "2026-04",
    endDate: "2026-04",
    status: "completed",
    liveUrl: "https://clearsheet.netlify.app",
    githubUrl: "https://github.com/awhtiambou/clearsheet",
  },

  {
    id: "proj-4",
    slug: "personal-portfolio-website",
    title: "Personal Portfolio",
    description: "$t:personal-portfolio-website.description",
    image: "/assets/images/projects/portfolio/dark-theme-zoomed-in-about-page-screenshot.png",
    sections: [
      {
        label: "$t:personal-portfolio-website.sections.overview.label",
        heading: "$t:personal-portfolio-website.sections.overview.heading",
        elements: [
          {
            type: "text",
            content: "$t:personal-portfolio-website.sections.overview.text",
          },
          {
            type: "stat-grid",
            stats: [
              { label: "$t:personal-portfolio-website.sections.overview.stat0.label", value: "Next.js 15", note: "$t:personal-portfolio-website.sections.overview.stat0.note" },
              { label: "$t:personal-portfolio-website.sections.overview.stat1.label", value: "2", note: "$t:personal-portfolio-website.sections.overview.stat1.note" },
              { label: "$t:personal-portfolio-website.sections.overview.stat2.label", value: "2", note: "$t:personal-portfolio-website.sections.overview.stat2.note" },
              { label: "$t:personal-portfolio-website.sections.overview.stat3.label", value: "∞", note: "$t:personal-portfolio-website.sections.overview.stat3.note" },
            ],
          },
        ],
      },
      {
        fullwidth: true,
        elements: [
          {
            type: "image-fullwidth",
            src: "/assets/images/projects/portfolio/cover.png",
            alt: "$t:personal-portfolio-website.sections.coverImage.alt",
            height: "h-[80vh]",
          },
        ],
      },
      {
        label: "$t:personal-portfolio-website.sections.highlights.label",
        elements: [
          {
            type: "list",
            variant: "check",
            items: [
              "$t:personal-portfolio-website.sections.highlights.list.0",
              "$t:personal-portfolio-website.sections.highlights.list.1",
              "$t:personal-portfolio-website.sections.highlights.list.2",
              "$t:personal-portfolio-website.sections.highlights.list.3",
              "$t:personal-portfolio-website.sections.highlights.list.4",
              "$t:personal-portfolio-website.sections.highlights.list.5",
            ],
          },
          {
            type: "image-grid",
            cols: 2,
            images: [
              {
                src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2670&auto=format&fit=crop",
                alt: "$t:personal-portfolio-website.sections.highlights.img0.alt",
                caption: "$t:personal-portfolio-website.sections.highlights.img0.caption",
              },
              {
                src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop",
                alt: "$t:personal-portfolio-website.sections.highlights.img1.alt",
                caption: "$t:personal-portfolio-website.sections.highlights.img1.caption",
              },
            ],
          },
        ],
      },
    ],
    technologies: [
      "Next.js 15", "React 19", "TypeScript", "Tailwind CSS",
      "Framer Motion", "next-intl", "Vercel", "ESLint", "Prettier",
    ],
    categories: ["web", "design"],
    featured: false,
    startDate: "2024-11",
    status: "in-progress",
    liveUrl: "https://awhtiambou.com",
    githubUrl: "https://github.com/awhtiambou/portfolio",
  },

  {
    id: "proj-6",
    slug: "le-decryptage-news-platform",
    title: "Le Décryptage",
    description: "$t:le-decryptage-news-platform.description",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2670&auto=format&fit=crop",
    sections: [
      {
        label: "$t:le-decryptage-news-platform.sections.overview.label",
        heading: "$t:le-decryptage-news-platform.sections.overview.heading",
        elements: [
          {
            type: "text",
            content: "$t:le-decryptage-news-platform.sections.overview.text",
          },
          {
            type: "stat-grid",
            stats: [
              { label: "$t:le-decryptage-news-platform.sections.overview.stat0.label", value: "React", note: "$t:le-decryptage-news-platform.sections.overview.stat0.note" },
              { label: "$t:le-decryptage-news-platform.sections.overview.stat1.label", value: "Firebase", note: "$t:le-decryptage-news-platform.sections.overview.stat1.note" },
              { label: "$t:le-decryptage-news-platform.sections.overview.stat2.label", value: "2", note: "$t:le-decryptage-news-platform.sections.overview.stat2.note" },
              { label: "$t:le-decryptage-news-platform.sections.overview.stat3.label", value: "FR", note: "$t:le-decryptage-news-platform.sections.overview.stat3.note" },
            ],
          },
        ],
      },
      {
        fullwidth: true,
        elements: [
          {
            type: "image-fullwidth",
            src: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2670&auto=format&fit=crop",
            alt: "$t:le-decryptage-news-platform.sections.coverImage.alt",
            height: "h-[60vh]",
          },
        ],
      },
      {
        label: "$t:le-decryptage-news-platform.sections.features.label",
        heading: "$t:le-decryptage-news-platform.sections.features.heading",
        elements: [
          {
            type: "text",
            content: "$t:le-decryptage-news-platform.sections.features.text",
          },
          {
            type: "list",
            variant: "check",
            items: [
              "$t:le-decryptage-news-platform.sections.features.list.0",
              "$t:le-decryptage-news-platform.sections.features.list.1",
              "$t:le-decryptage-news-platform.sections.features.list.2",
              "$t:le-decryptage-news-platform.sections.features.list.3",
              "$t:le-decryptage-news-platform.sections.features.list.4",
              "$t:le-decryptage-news-platform.sections.features.list.5",
              "$t:le-decryptage-news-platform.sections.features.list.6",
              "$t:le-decryptage-news-platform.sections.features.list.7",
            ],
          },
          {
            type: "image-grid",
            cols: 2,
            images: [
              {
                src: "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?q=80&w=2670&auto=format&fit=crop",
                alt: "$t:le-decryptage-news-platform.sections.features.img0.alt",
                caption: "$t:le-decryptage-news-platform.sections.features.img0.caption",
              },
              {
                src: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?q=80&w=2674&auto=format&fit=crop",
                alt: "$t:le-decryptage-news-platform.sections.features.img1.alt",
                caption: "$t:le-decryptage-news-platform.sections.features.img1.caption",
              },
            ],
          },
        ],
      },
      {
        label: "$t:le-decryptage-news-platform.sections.stack.label",
        heading: "$t:le-decryptage-news-platform.sections.stack.heading",
        elements: [
          {
            type: "text",
            content: "$t:le-decryptage-news-platform.sections.stack.text",
          },
          {
            type: "list",
            variant: "bullet",
            items: [
              "$t:le-decryptage-news-platform.sections.stack.list.0",
              "$t:le-decryptage-news-platform.sections.stack.list.1",
              "$t:le-decryptage-news-platform.sections.stack.list.2",
              "$t:le-decryptage-news-platform.sections.stack.list.3",
            ],
          },
        ],
      },
      {
        label: "$t:le-decryptage-news-platform.sections.impact.label",
        elements: [
          {
            type: "callout",
            variant: "info",
            title: "$t:le-decryptage-news-platform.sections.impact.callout.title",
            content: "$t:le-decryptage-news-platform.sections.impact.callout.content",
          },
          {
            type: "stat-grid",
            stats: [
              { label: "$t:le-decryptage-news-platform.sections.impact.stat0.label", value: "2", note: "$t:le-decryptage-news-platform.sections.impact.stat0.note" },
              { label: "$t:le-decryptage-news-platform.sections.impact.stat1.label", value: "8+", note: "$t:le-decryptage-news-platform.sections.impact.stat1.note" },
              { label: "$t:le-decryptage-news-platform.sections.impact.stat2.label", value: "100%", note: "$t:le-decryptage-news-platform.sections.impact.stat2.note" },
              { label: "$t:le-decryptage-news-platform.sections.impact.stat3.label", value: "↗", note: "$t:le-decryptage-news-platform.sections.impact.stat3.note" },
            ],
          },
        ],
      },
    ],
    technologies: ["React", "TypeScript", "Firebase", "Material-UI", "Tailwind CSS", "react-icons", "Netlify"],
    categories: ["web", "design"],
    featured: false,
    startDate: "2024-03",
    endDate: "2024-04",
    status: "completed",
    liveUrl: "https://maykouanoni.netlify.app",
    githubUrl: "https://github.com/awhtiambou/blog-maykouanoni",
  },

  {
    id: "proj-5",
    slug: "thoraxvision-pulmonary-disease-detection",
    title: "ThoraxVision",
    description: "$t:thoraxvision-pulmonary-disease-detection.description",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=2831&auto=format&fit=crop",
    sections: [
      {
        label: "$t:thoraxvision-pulmonary-disease-detection.sections.overview.label",
        heading: "$t:thoraxvision-pulmonary-disease-detection.sections.overview.heading",
        elements: [
          {
            type: "text",
            content: "$t:thoraxvision-pulmonary-disease-detection.sections.overview.text",
          },
          {
            type: "stat-grid",
            stats: [
              { label: "$t:thoraxvision-pulmonary-disease-detection.sections.overview.stat0.label", value: "80%+", note: "$t:thoraxvision-pulmonary-disease-detection.sections.overview.stat0.note" },
              { label: "$t:thoraxvision-pulmonary-disease-detection.sections.overview.stat1.label", value: "YOLO", note: "$t:thoraxvision-pulmonary-disease-detection.sections.overview.stat1.note" },
              { label: "$t:thoraxvision-pulmonary-disease-detection.sections.overview.stat2.label", value: "Seconds", note: "$t:thoraxvision-pulmonary-disease-detection.sections.overview.stat2.note" },
              { label: "$t:thoraxvision-pulmonary-disease-detection.sections.overview.stat3.label", value: "NIH", note: "$t:thoraxvision-pulmonary-disease-detection.sections.overview.stat3.note" },
            ],
          },
        ],
      },
      {
        fullwidth: true,
        elements: [
          {
            type: "image-fullwidth",
            src: "https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=2831&auto=format&fit=crop",
            alt: "$t:thoraxvision-pulmonary-disease-detection.sections.coverImage.alt",
            height: "h-[65vh]",
          },
        ],
      },
      {
        label: "$t:thoraxvision-pulmonary-disease-detection.sections.features.label",
        elements: [
          {
            type: "list",
            variant: "check",
            items: [
              "$t:thoraxvision-pulmonary-disease-detection.sections.features.list.0",
              "$t:thoraxvision-pulmonary-disease-detection.sections.features.list.1",
              "$t:thoraxvision-pulmonary-disease-detection.sections.features.list.2",
              "$t:thoraxvision-pulmonary-disease-detection.sections.features.list.3",
              "$t:thoraxvision-pulmonary-disease-detection.sections.features.list.4",
              "$t:thoraxvision-pulmonary-disease-detection.sections.features.list.5",
            ],
          },
          {
            type: "image-grid",
            cols: 2,
            images: [
              {
                src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2670&auto=format&fit=crop",
                alt: "$t:thoraxvision-pulmonary-disease-detection.sections.features.img0.alt",
                caption: "$t:thoraxvision-pulmonary-disease-detection.sections.features.img0.caption",
              },
              {
                src: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=2687&auto=format&fit=crop",
                alt: "$t:thoraxvision-pulmonary-disease-detection.sections.features.img1.alt",
                caption: "$t:thoraxvision-pulmonary-disease-detection.sections.features.img1.caption",
              },
            ],
          },
        ],
      },
      {
        label: "$t:thoraxvision-pulmonary-disease-detection.sections.impact.label",
        elements: [
          {
            type: "callout",
            variant: "success",
            title: "$t:thoraxvision-pulmonary-disease-detection.sections.impact.callout.title",
            content: "$t:thoraxvision-pulmonary-disease-detection.sections.impact.callout.content",
          },
        ],
      },
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


export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
export function getProjectsByCategory(category: Project["categories"][0]): Project[] {
  return projects.filter((p) => p.categories.includes(category));
}
export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
export function getAllCategories(): Project["categories"][0][] {
  return Array.from(new Set(projects.flatMap((p) => p.categories)));
}
