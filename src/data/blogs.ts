import type { Blog } from "@/types/blog";

const AWH = {
    name: "Abdoul-Wahabou H. Tiambou",
    role: "MSc Computer Science · AI/ML & Computer Vision",
    avatar: "/assets/images/me-coding.jpg",
};

const blogYoloSegmentation: Blog = {
    id: "blog-1",
    slug: "instance-segmentation-yolo-maskrcnn-sam",
    title: "Instance Segmentation at Scale: YOLO, Mask R-CNN & SAM on HoloLens 2 Data",
    subtitle: "A deep comparative study of three state-of-the-art segmentation architectures applied to a real mixed-reality dataset — with pipeline design, training tricks, and honest benchmark results.",
    excerpt: "How do YOLO, Mask R-CNN and SAM compare when pushed to segment objects in the wild from HoloLens 2 sensor data? I trained, tuned and benchmarked all three on a custom dataset of 200+ indoor objects — here is everything I learned.",
    coverImage: "/assets/images/blog/segmentation-cover.jpg",
    readingTime: 18,
    publishedAt: "2025-06-15",
    updatedAt: "2025-07-01",
    author: AWH,
    categories: ["computer-vision", "deep-learning", "research", "3d-reconstruction"],
    tags: ["YOLO", "Mask R-CNN", "SAM", "Instance Segmentation", "HoloLens 2", "PyTorch", "Mixed Reality", "LIARA"],
    readingLevel: "advanced",
    featured: true,
    relatedSlugs: ["3d-reconstruction-hololens2-occupancynet"],
    sections: [
        {
            id: "introduction", label: "Introduction", heading: "Why instance segmentation in mixed reality?",
            elements: [
                { type: "text", variant: "lead", content: "Mixed reality devices like the **Microsoft HoloLens 2** open a fascinating frontier: they can perceive the physical world through depth sensors and RGB cameras, yet they need to *understand* that world — not just see it. For our research at LIARA lab (Laboratoire d'Intelligence Ambiante pour la Reconnaissance d'Activités, UQAC), the key question was: can we automatically segment every object in a room, reconstruct it in 3D, and overlay digital information on top in real time?" },
                { type: "text", content: "The first critical step is **instance segmentation** — distinguishing not just *what* is in the scene (semantic segmentation) but *which individual instance* of each class each pixel belongs to. This is harder, computationally heavier, and far more useful for AR overlays where each physical object needs its own digital twin." },
                { type: "callout", variant: "insight", title: "Research context", content: "This article is drawn from applied research conducted during my MSc at UQAC (2024–2025) within the LIARA laboratory. The work was submitted to UCAml 2025 (17th Int. Conf. on Ubiquitous Computing and Ambient Intelligence, Springer LNNS). All experiments were run on our custom HoloLens 2 dataset." },
                { type: "text", content: "We evaluated three leading architectures: **YOLOv8-seg** (the fastest), **Mask R-CNN** with a ResNet-50-FPN backbone (the established baseline), and **SAM** (Segment Anything Model by Meta, the most recent zero/few-shot approach). Each has a radically different design philosophy, and the results — spoiler: SAM does *not* automatically win — were genuinely surprising." },
            ],
        },
        {
            id: "dataset", label: "Dataset", heading: "Building a custom HoloLens 2 segmentation dataset",
            elements: [
                { type: "text", content: "No public dataset captured with a HoloLens 2 existed at the scale we needed. We collected 1,400+ RGB frames across 8 indoor scenes (office, kitchen, corridor, lab benches…), then annotated 200+ object instances using polygon masks in CVAT. The annotation pipeline was the most labour-intensive part — roughly 3 weeks of part-time work for two people." },
                {
                    type: "stat-grid", stats: [
                        { label: "Total frames", value: "1,420", note: "RGB @ 1920×1080", trend: "neutral" },
                        { label: "Annotated masks", value: "3,850+", note: "Polygon instances", trend: "neutral" },
                        { label: "Object classes", value: "28", note: "Indoor objects", trend: "neutral" },
                        { label: "Scenes", value: "8", note: "Unique environments", trend: "neutral" },
                    ]
                },
                { type: "text", content: "The dataset exhibits three challenges not present in standard benchmarks like COCO: (1) **near-infrared sensor noise** from the depth camera bleeding into colour channels, (2) **motion blur** from users moving their heads naturally while wearing the device, and (3) **extreme occlusion** since the device captures from a first-person perspective where hands and arms frequently occlude objects." },
                { type: "callout", variant: "warning", title: "Data imbalance", content: "Eight classes (chair, table, laptop, mug, bottle, keyboard, monitor, book) account for 71% of all instances. Rare classes like 'microscope' or 'projector' had fewer than 40 training samples. We addressed this with targeted augmentation and class-weighted loss." },
                { type: "text", content: "The train/val/test split was 70/15/15 **stratified by scene**, not by frame — meaning the test set contains entirely unseen environments. This makes the benchmark more realistic and harder than random splits would produce." },
            ],
        },
        {
            id: "architectures", label: "Architectures", heading: "YOLOv8-seg vs Mask R-CNN vs SAM — a design perspective",
            elements: [
                { type: "text", variant: "lead", content: "Before comparing numbers, it is worth understanding *why* the three architectures are built so differently — because the design choices directly explain the benchmark results." },
                { type: "heading", level: 3, content: "YOLOv8-seg: single-stage speed" },
                { type: "text", content: "YOLOv8 (Ultralytics, 2023) extends the YOLO detection family with a lightweight segmentation head. A CSPDarknet backbone extracts features, a Path Aggregation Network (PANNet) fuses multi-scale representations, and a prototype-based mask head predicts instance masks in a single forward pass. The model has **~11M parameters** in the `-n` variant and can run at **80+ FPS** on a mid-range GPU." },
                { type: "code", language: "python", filename: "train_yolo.py", lineNumbers: true, content: "from ultralytics import YOLO\n\n# Load YOLOv8n-seg pretrained on COCO\nmodel = YOLO(\"yolov8n-seg.pt\")\n\nresults = model.train(\n    data=\"hololens2.yaml\",\n    epochs=100,\n    imgsz=640,\n    batch=16,\n    lr0=1e-3,\n    lrf=1e-2,\n    mosaic=0.8,\n    mixup=0.1,\n    copy_paste=0.3,\n    degrees=10.0,\n    translate=0.1,\n    scale=0.5,\n    cls=0.5,\n    device=\"cuda:0\",\n    workers=8,\n    project=\"runs/segment\",\n    name=\"yolov8n_holo\",\n)" },
                { type: "heading", level: 3, content: "Mask R-CNN: two-stage robustness" },
                { type: "text", content: "Mask R-CNN (He et al., 2017) remains the gold standard for instance segmentation in constrained settings. It adds a small FCN mask branch in parallel to the box-regression head of Faster R-CNN. The **Region Proposal Network** generates candidate boxes, **RoIAlign** extracts fixed-size feature maps, and the mask head generates a 28×28 binary mask per proposal. This two-stage approach sacrifices speed but gains significant robustness on small and occluded objects." },
                { type: "heading", level: 3, content: "SAM: zero-shot foundation model" },
                { type: "text", content: "**Segment Anything Model** (Kirillov et al., Meta AI, 2023) is a prompt-based foundation model trained on 1.1 billion masks. SAM does not learn class-specific detectors — instead it accepts a point, a box, or a text prompt and returns a mask. For our use case, we used the **automatic mask generator** mode. SAM ViT-H has **636M parameters** and is orders of magnitude larger than the other two models." },
                { type: "callout", variant: "tip", title: "SAM fine-tuning with SAM-2", content: "Meta released SAM 2 (2024) which supports video and can be fine-tuned. We experimented with it briefly but the full fine-tuning pipeline was outside our compute budget. The numbers reported here use the original SAM ViT-H in automatic mode without fine-tuning." },
            ],
        },
        {
            id: "training", label: "Training", heading: "Training strategy and augmentation pipeline",
            elements: [
                { type: "text", content: "Training on a small, domain-shifted dataset demands careful regularisation. We applied a multi-stage augmentation pipeline designed specifically for the HoloLens 2 failure modes." },
                {
                    type: "table", headers: ["Augmentation", "YOLO", "Mask R-CNN", "SAM (auto)"], striped: true, caption: "Augmentation strategies applied per model. SAM was used in zero-shot mode.", rows: [
                        ["Horizontal flip", "✓", "✓", "N/A"], ["Colour jitter (HSV)", "✓", "✓", "N/A"], ["Gaussian blur (σ≤2)", "✓", "✓", "N/A"],
                        ["Mosaic (4-image)", "✓", "✗", "N/A"], ["Copy-paste", "✓", "✗", "N/A"], ["Random scale (0.5–1.5×)", "✓", "✓", "N/A"],
                        ["Synthetic motion blur", "✓", "✓", "N/A"], ["MixUp (α=0.1)", "✓", "✗", "N/A"], ["Simulated IR noise", "✓", "✓", "N/A"],
                    ]
                },
                { type: "text", content: "For **Mask R-CNN**, we used a step LR schedule (warm-up for 1k iterations, decay at epoch 60 and 80), SGD with momentum=0.9, weight_decay=1e-4, and learning rate 0.005. Training for 100 epochs on a single NVIDIA T4 took approximately 4 hours." },
            ],
        },
        {
            id: "results", label: "Results", heading: "Benchmark results and critical analysis",
            elements: [
                { type: "text", variant: "lead", content: "All three models were evaluated on the held-out test split using **mask AP at IoU=0.50:0.95** (COCO standard), **mask AP50**, inference time, and GPU memory." },
                {
                    type: "stat-grid", stats: [
                        { label: "YOLOv8n-seg mAP@50", value: "79.4%", note: "Best accuracy", trend: "up" },
                        { label: "Mask R-CNN mAP@50", value: "72.1%", note: "Most stable", trend: "neutral" },
                        { label: "SAM (auto) mAP@50", value: "41.8%", note: "Zero-shot baseline", trend: "down" },
                        { label: "YOLOv8 FPS", value: "94 FPS", note: "RTX 3070, 640px", trend: "up" },
                    ]
                },
                {
                    type: "table", headers: ["Model", "mAP@50", "mAP@50:95", "FPS (GPU)", "Params", "GPU Mem"], striped: true, caption: "Benchmark results on the HoloLens 2 test set. FPS measured with batch=1, RTX 3070 8GB.", rows: [
                        ["YOLOv8n-seg", "79.4%", "52.3%", "94", "11M", "1.8 GB"], ["YOLOv8m-seg", "80.1%", "54.7%", "61", "27M", "3.2 GB"],
                        ["Mask R-CNN R50", "72.1%", "44.8%", "22", "44M", "4.1 GB"], ["SAM ViT-H", "41.8%", "29.3%", "4.2", "636M", "16+ GB"],
                    ]
                },
                { type: "callout", variant: "insight", title: "Why does SAM underperform?", content: "SAM was trained on natural web images and its automatic mode tends to over-segment: it creates dozens of tiny fragments per object rather than clean instance masks. It also has no class awareness — it cannot distinguish a 'mug' from a 'bowl'. In our use case where we need both precise instance boundaries AND class labels, SAM in zero-shot mode is simply not competitive." },
                { type: "text", content: "The **YOLOv8 superiority on mAP@50** is explained by its aggressive augmentation pipeline (mosaic, copy-paste) which dramatically improves recall on occluded objects. Mask R-CNN's **RoIAlign** gives it noticeably better mask boundary precision on thin objects like pens and cables." },
            ],
        },
        {
            id: "pipeline", label: "Pipeline", heading: "Integrating segmentation into the HoloLens 2 MR pipeline",
            elements: [
                { type: "text", content: "The segmentation model is one component in a larger pipeline. The full system flow is: *HoloLens 2 RGB stream → YOLO segmentation → depth-aligned bounding volume extraction → OccupancyNet 3D reconstruction → mesh export → HoloLens MRTK overlay*." },
                {
                    type: "steps", steps: [
                        { title: "RGB & Depth Capture", description: "HoloLens 2 streams 1080p RGB at 30 FPS alongside a 512×512 depth map from the time-of-flight sensor.", icon: "📷" },
                        { title: "Instance Segmentation (YOLOv8)", description: "YOLOv8m-seg runs at 61 FPS on a companion GPU server. Each frame returns bounding boxes, class labels, and binary masks.", icon: "🧠" },
                        { title: "Depth Masking & Point Cloud", description: "For each instance mask, we back-project the depth values to extract a partial 3D point cloud for that object.", icon: "☁️" },
                        { title: "3D Reconstruction (OccupancyNet)", description: "The point cloud is fed to OccupancyNet which predicts a continuous occupancy field and extracts the mesh via Marching Cubes.", icon: "🔷" },
                        { title: "HoloLens MRTK Overlay", description: "Reconstructed meshes are streamed back to the HoloLens 2 and rendered as holographic overlays using Unity + MRTK.", icon: "🥽" },
                    ]
                },
                { type: "callout", variant: "warning", title: "Latency challenge", content: "The full round-trip latency (capture → GPU server → HoloLens display) is 180–240ms over Wi-Fi 6. We are investigating edge deployment using YOLO on the device's NPU to remove the network hop." },
            ],
        },
        {
            id: "takeaways", label: "Takeaways", heading: "What I learned — and what I'd do differently",
            elements: [
                {
                    type: "list", variant: "check", items: [
                        "**Annotate more, train later.** We underestimated annotation time. Going from 1,400 to 3,000 frames would likely have pushed mAP above 85%.",
                        "**YOLOv8 copy-paste is transformative** for scenes with heavy occlusion.",
                        "**SAM is not a free lunch.** It shines as a *post-processing refinement* tool rather than as a standalone detector.",
                        "**Mixed precision training is non-optional** on small GPU budgets — it halved memory usage with no accuracy penalty.",
                        "**Validate on unseen scenes from day one.** We initially validated on random frame splits and saw optimistically inflated numbers.",
                    ]
                },
                { type: "blockquote", content: "The most dangerous metric is validation accuracy on in-distribution data. Always hold out entire scenes, sessions, or domains as your test set.", author: "Lesson learned", source: "LIARA Lab, 2025" },
            ],
        },
        {
            id: "conclusion", label: "Conclusion", heading: "Summary and next steps",
            elements: [
                { type: "text", variant: "lead", content: "Instance segmentation on custom, domain-shifted data is a solvable problem — but it requires attention to every link in the chain. YOLOv8 is the right choice for real-time AR applications today; Mask R-CNN remains relevant when boundary precision matters more than speed; SAM's role is evolving toward fine-tuned specialisation." },
                { type: "text", content: "Next steps for this research: (1) expand the dataset to 5,000+ annotated frames, (2) explore SAM 2 fine-tuning on our domain, (3) benchmark YOLOv10 and RT-DETR as drop-in replacements, and (4) push for on-device inference on the HoloLens 2's integrated NPU." },
                {
                    type: "link-list", variant: "cards", links: [
                        { label: "UCAml 2025 Paper", href: "#", description: "Full paper: Automatic 3D Object Segmentation and Reconstruction from HoloLens 2 Data", external: true },
                        { label: "Ultralytics YOLOv8 Docs", href: "https://docs.ultralytics.com/tasks/segment/", description: "Official segmentation documentation and training guide", external: true },
                        { label: "Segment Anything (Meta AI)", href: "https://segment-anything.com", description: "SAM model weights, demo, and research paper", external: true },
                    ]
                },
            ],
        },
    ],
};

const blog3DReconstruction: Blog = {
    id: "blog-2",
    slug: "3d-reconstruction-hololens2-occupancynet",
    title: "From 2D Masks to 3D Meshes: Object Reconstruction with OccupancyNet on HoloLens 2",
    subtitle: "How implicit neural representations can turn a handful of depth-masked point clouds into watertight 3D meshes — and why this is a game-changer for mixed reality spatial understanding.",
    excerpt: "OccupancyNet learns a continuous occupancy function over 3D space instead of predicting discrete voxels. I explore how we used it to reconstruct 200+ indoor objects from partial HoloLens 2 observations — and what the limits are.",
    coverImage: "/assets/images/blog/3d-reconstruction-cover.jpg",
    readingTime: 22,
    publishedAt: "2025-07-10",
    updatedAt: "2025-07-20",
    author: AWH,
    categories: ["computer-vision", "3d-reconstruction", "mixed-reality", "deep-learning", "research"],
    tags: ["OccupancyNet", "3D Reconstruction", "Implicit Neural Representation", "HoloLens 2", "Marching Cubes", "PyTorch", "LIARA", "Point Cloud"],
    readingLevel: "advanced",
    featured: true,
    relatedSlugs: ["instance-segmentation-yolo-maskrcnn-sam", "vision-transformers-vit-dinov2"],
    sections: [
        {
            id: "introduction", label: "Introduction", heading: "The 3D reconstruction problem in augmented reality",
            elements: [
                { type: "text", variant: "lead", content: "Imagine wearing a **HoloLens 2** and walking into any room. You want the device to not only know where walls and floors are but to *understand each individual object*: its precise 3D shape, orientation, and surface, so that you can attach digital annotations, simulate physical interactions, or replace it with a virtual counterpart." },
                { type: "text", content: "This is the 3D object reconstruction problem in AR, and it is surprisingly hard. A HoloLens 2 sees each object from a limited viewing angle, with significant depth noise, and often only partially. Classical approaches — volumetric fusion, photogrammetry — require dense, calibrated multi-view capture incompatible with a freely-moving headset." },
                { type: "callout", variant: "insight", title: "Key insight: implicit representations", content: "Instead of representing a 3D shape as a mesh, voxel grid, or point cloud, **implicit neural representations (INR)** learn a function f(x,y,z) → occupancy probability. This function is differentiable, resolution-independent, and can generalise to unseen shapes by learning a latent shape space." },
                { type: "text", content: "In this post I walk through **OccupancyNet** (Mescheder et al., CVPR 2019), explain *why* it fits our constraints, show the full reconstruction pipeline, and share honest results including the cases where it fails." },
            ],
        },
        {
            id: "representations", label: "Background", heading: "A brief taxonomy of 3D shape representations",
            elements: [
                { type: "text", content: "To appreciate why occupancy networks are interesting, it helps to understand what came before them." },
                {
                    type: "table", headers: ["Representation", "Memory", "Resolution", "Watertight?", "Generative?"], striped: true, rows: [
                        ["Point Cloud", "O(N)", "Discrete", "✗", "✓ (PointNet)"], ["Voxel Grid", "O(r³)", "Discrete", "✓", "✓ (3D-GAN)"],
                        ["Mesh", "Variable", "Discrete", "✓", "Difficult"], ["SDF / TSDF", "O(r³)", "Discrete", "✓", "✗"],
                        ["Occupancy Network", "O(1)*", "Continuous", "✓", "✓"], ["NeRF", "O(1)*", "Continuous", "✗", "Partial"],
                    ], caption: "* Network weights are fixed size; only query time scales with desired resolution."
                },
                { type: "text", content: "The key advantage of **OccupancyNet** over voxel grids is that it does not discretise space upfront: you can extract a mesh at any resolution by running Marching Cubes at whatever grid density you want." },
                { type: "heading", level: 3, content: "Why not NeRF?" },
                { type: "text", content: "**NeRF** requires dense multi-view capture (100+ calibrated images) and takes hours to train per scene. Our use case provides at most 5–10 partial views of a single object from a moving headset. **OccupancyNet** with a learned shape prior can reconstruct from a *single partial point cloud* by drawing on the latent space it learned during training on ShapeNet." },
            ],
        },
        {
            id: "architecture", label: "Architecture", heading: "OccupancyNet architecture deep-dive",
            elements: [
                { type: "text", variant: "lead", content: "OccupancyNet defines a binary classifier `f_θ(p, z) → [0,1]` where `p` is a 3D query point and `z` is a latent code encoding the shape. Training minimises binary cross-entropy over randomly sampled surface and free-space points." },
                { type: "heading", level: 3, content: "Encoder: PointNet for partial observations" },
                { type: "text", content: "The input is a **partial point cloud** from HoloLens 2 depth data. A **PointNet** encoder applies a shared MLP to each point independently, then max-pools over all points to produce a permutation-invariant global feature vector `z ∈ ℝ^256`." },
                { type: "code", language: "python", filename: "encoder.py", lineNumbers: true, content: "import torch\nimport torch.nn as nn\n\nclass PointNetEncoder(nn.Module):\n    \"\"\"Encode a partial point cloud into a global shape latent code.\"\"\"\n    def __init__(self, latent_dim: int = 256):\n        super().__init__()\n        self.mlp = nn.Sequential(\n            nn.Linear(3, 64),   nn.ReLU(),\n            nn.Linear(64, 128), nn.ReLU(),\n            nn.Linear(128, latent_dim),\n        )\n\n    def forward(self, pts: torch.Tensor) -> torch.Tensor:\n        features = self.mlp(pts)        # (B, N, latent_dim)\n        z, _ = features.max(dim=1)      # global max-pool\n        return z" },
                { type: "heading", level: 3, content: "Decoder: conditioned occupancy MLP" },
                { type: "text", content: "The decoder takes query point `p ∈ ℝ³` and shape code `z ∈ ℝ^256`, outputting occupancy probability. We use **Conditional Batch Normalisation (CBN)** to inject the shape code at each layer — this improves reconstruction quality on thin structures." },
                { type: "heading", level: 3, content: "Mesh extraction with Marching Cubes" },
                { type: "text", content: "Once trained, we extract meshes by evaluating the occupancy function on a dense 3D grid and running **Marching Cubes** at the 0.5 iso-surface. Resolution is a trade-off: 32³ is fast (0.05s) but blocky; 128³ gives smooth surfaces but takes ~2s per object." },
            ],
        },
        {
            id: "training", label: "Training", heading: "Pre-training on ShapeNet and fine-tuning for indoor objects",
            elements: [
                { type: "text", content: "We pre-trained OccupancyNet on **ShapeNet Core55** — 51,300 3D models across 55 categories. Pre-training provides a rich shape prior: the encoder learns a latent space where similar shapes cluster, and the decoder learns smooth implicit surfaces." },
                {
                    type: "stat-grid", stats: [
                        { label: "ShapeNet shapes", value: "51,300", note: "Pre-training", trend: "neutral" },
                        { label: "Indoor objects", value: "214", note: "Fine-tuning", trend: "neutral" },
                        { label: "Pre-training epochs", value: "300", note: "~18h on 2× A100", trend: "neutral" },
                        { label: "Fine-tuning epochs", value: "150", note: "~4h on 1× T4", trend: "neutral" },
                    ]
                },
                { type: "text", content: "Fine-tuning on our custom 214-object dataset improved Chamfer Distance by **34%** over zero-shot inference. The biggest gains were on non-ShapeNet categories like 'lab equipment' and 'wiring panels'." },
                { type: "callout", variant: "tip", title: "Training tip: occupancy sampling matters enormously", content: "Don't sample query points uniformly — oversample near the surface. We use 70% near-surface points (Gaussian noise σ=0.05) and 30% uniform. This dramatically improves boundary sharpness." },
            ],
        },
        {
            id: "results", label: "Results", heading: "Reconstruction results and failure modes",
            elements: [
                { type: "text", variant: "lead", content: "We evaluated on 42 held-out objects using **Chamfer Distance (CD)**, **F-Score at τ=0.01**, and **volumetric IoU**." },
                {
                    type: "table", headers: ["Method", "Chamfer ↓", "F-Score ↑", "Vol. IoU ↑", "Time/obj"], striped: true, caption: "Reconstruction quality on 42 held-out indoor objects.", rows: [
                        ["3D-EPN (voxel, 32³)", "0.142", "0.58", "0.51", "0.08s"], ["PCN (point comp.)", "0.098", "0.67", "0.57", "0.12s"],
                        ["OccNet (ours, 64³)", "0.061", "0.79", "0.71", "0.45s"], ["OccNet (ours, 128³)", "0.058", "0.81", "0.74", "2.10s"],
                    ]
                },
                { type: "heading", level: 3, content: "Where the model fails" },
                {
                    type: "list", variant: "arrow", items: [
                        "**Very thin structures** (cables, pens, chair legs under 5mm): Marching Cubes at 128³ cannot resolve sub-voxel details.",
                        "**Symmetric objects with extreme partial occlusion**: when less than 15% of the surface is observed, the latent code is ambiguous.",
                        "**Transparent objects** (glass, bottles): the depth sensor returns no depth returns for transparent surfaces.",
                        "**Objects outside ShapeNet categories**: near-total failure on fume hoods and wall-mounted projector screens.",
                    ]
                },
                { type: "callout", variant: "danger", title: "Transparent objects: a hard limit", content: "Time-of-flight depth sensors fundamentally cannot measure transparent surfaces — the IR light passes through. Until depth estimation from RGB becomes reliable, our system skips objects flagged as 'transparent'." },
            ],
        },
        {
            id: "integration", label: "Integration", heading: "Deploying reconstructed meshes on the HoloLens 2 with MRTK",
            elements: [
                { type: "text", content: "The output of OccupancyNet is a standard `.obj` mesh. Deploying it into a running HoloLens 2 mixed reality session requires several engineering steps beyond the ML pipeline." },
                {
                    type: "steps", steps: [
                        { title: "Mesh post-processing", description: "Laplacian smoothing, remove small components, decimate to ≤5,000 triangles for real-time rendering.", icon: "🔧" },
                        { title: "Coordinate frame alignment", description: "PCA for orientation estimation, then Procrustes alignment to the HoloLens world coordinate frame.", icon: "📐" },
                        { title: "Unity + MRTK streaming", description: "Meshes serialised to binary format, streamed via WebSocket, rendered as holographic wireframe overlays.", icon: "🎮" },
                        { title: "Annotation attachment", description: "Digital annotations parented to the mesh GameObject. MRTK spatial anchoring keeps them locked to physical objects.", icon: "📌" },
                    ]
                },
            ],
        },
        {
            id: "conclusion", label: "Conclusion", heading: "Key takeaways",
            elements: [
                {
                    type: "list", variant: "check", items: [
                        "**OccupancyNet is the right tool** for shape completion from sparse partial observations.",
                        "**Pre-training on ShapeNet is essential.** Training from scratch on 200 objects produces degenerate results.",
                        "**128³ resolution is the practical sweet spot**: good surface quality, 2s per object, 8GB VRAM.",
                        "**Transparent and very thin objects are unresolved problems** requiring different sensor modalities.",
                        "**The engineering around the ML model** — coordinate alignment, mesh post-processing, MRTK streaming — takes more time than the model itself.",
                    ]
                },
                {
                    type: "link-list", variant: "cards", links: [
                        { label: "OccupancyNet Paper (CVPR 2019)", href: "https://arxiv.org/abs/1812.03828", description: "Mescheder et al. — the original paper.", external: true },
                        { label: "ConvONet (ECCV 2020)", href: "https://arxiv.org/abs/2003.04618", description: "Peng et al. — convolutional occupancy networks.", external: true },
                        { label: "3D Gaussian Splatting", href: "https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/", description: "Kerbl et al. (SIGGRAPH 2023) — real-time novel view synthesis.", external: true },
                    ]
                },
            ],
        },
    ],
};

const blogViT: Blog = {
    id: "blog-3",
    slug: "vision-transformers-vit-dinov2",
    title: "Vision Transformers Explained: From ViT to DINOv2 — A Practitioner's Guide",
    subtitle: "The complete landscape of Vision Transformers in 2025: how they work, when to use them over CNNs, and practical fine-tuning recipes for real-world computer vision tasks.",
    excerpt: "Vision Transformers have gone from 'interesting NeurIPS paper' to 'default backbone for everything'. This guide covers ViT, DeiT, Swin, and DINOv2 — with practical code, performance benchmarks, and honest advice on when CNNs still win.",
    coverImage: "/assets/images/blog/vit-cover.jpg",
    readingTime: 25,
    publishedAt: "2025-08-05",
    updatedAt: "2025-08-15",
    author: AWH,
    categories: ["computer-vision", "deep-learning", "tutorial"],
    tags: ["Vision Transformer", "ViT", "DINOv2", "Swin Transformer", "DeiT", "Self-Supervised Learning", "PyTorch", "Transfer Learning"],
    readingLevel: "intermediate",
    featured: true,
    relatedSlugs: ["instance-segmentation-yolo-maskrcnn-sam", "3d-reconstruction-hololens2-occupancynet"],
    sections: [
        {
            id: "introduction", label: "Introduction", heading: "Why transformers conquered computer vision",
            elements: [
                { type: "text", variant: "lead", content: "In 2017, the transformer architecture changed natural language processing forever. By 2020, **Vision Transformer (ViT)** proved that the same self-attention mechanism could match or beat the best convolutional neural networks on image classification — and the field has never looked back." },
                { type: "text", content: "Today, transformer-based backbones power the state-of-the-art in **image classification**, **object detection**, **segmentation**, **depth estimation**, **video understanding**, and even **3D reconstruction**. If you are building computer vision systems in 2025, you need to understand this landscape." },
                { type: "callout", variant: "insight", title: "Article scope", content: "This is not a theoretical deep-dive into attention mechanisms — plenty of excellent resources exist for that. This article is a **practitioner's guide**: which model to pick, how to fine-tune it, what the real-world trade-offs are, and when you should still reach for a ConvNet." },
                { type: "text", content: "We will cover four milestones in the ViT evolution: the original **ViT** (Dosovitskiy et al., 2020), **DeiT** (Touvron et al., 2021) which made ViTs data-efficient, **Swin Transformer** (Liu et al., 2021) which introduced hierarchical structure, and **DINOv2** (Oquab et al., 2024) — Meta's self-supervised powerhouse that may be the most useful foundation model for CV today." },
            ],
        },
        {
            id: "vit-fundamentals", label: "ViT Basics", heading: "How Vision Transformers work — the 5-minute version",
            elements: [
                { type: "text", content: "The core insight of ViT is brutally simple: **split an image into fixed-size patches, flatten them into vectors, and feed them to a standard transformer encoder** — the same architecture used for text." },
                {
                    type: "steps", steps: [
                        { title: "Patch Embedding", description: "A 224×224 image is split into 196 patches of 16×16 pixels. Each patch is linearly projected into a D-dimensional embedding vector (typically D=768 for ViT-Base).", icon: "🖼️" },
                        { title: "Position Encoding", description: "Learnable position embeddings are added to each patch embedding so the model knows spatial arrangement. A special [CLS] token is prepended.", icon: "📍" },
                        { title: "Transformer Encoder", description: "The sequence of 197 tokens passes through L layers of multi-head self-attention + MLP blocks (L=12 for ViT-Base). Every token can attend to every other token — global context from layer 1.", icon: "⚡" },
                        { title: "Classification Head", description: "The final [CLS] token representation is fed to a linear classifier for the downstream task. For dense tasks, all patch tokens are used.", icon: "🎯" },
                    ]
                },
                { type: "text", content: "The key difference from CNNs: a ViT has **global receptive field from the very first layer**. A CNN builds receptive field gradually through stacked convolutions. This is why ViTs excel on tasks requiring long-range spatial reasoning (e.g., understanding that a cat's tail 200px away belongs to the same instance as its head)." },
                { type: "callout", variant: "warning", title: "The data hunger problem", content: "The original ViT trained on **JFT-300M** (300 million images). On ImageNet alone (1.2M images), ViT-Base performs *worse* than a ResNet-50. Transformers lack the inductive biases of convolutions (translation equivariance, locality) and compensate with sheer data volume. This is the problem DeiT and DINOv2 solve." },
            ],
        },
        {
            id: "model-landscape", label: "Landscape", heading: "The Vision Transformer family tree",
            elements: [
                { type: "text", variant: "lead", content: "The ViT ecosystem has exploded. Here are the four models every CV practitioner should know, ranked by practical impact." },
                { type: "heading", level: 3, content: "1. ViT (2020): the proof of concept" },
                { type: "text", content: "Dosovitskiy et al. proved that a pure transformer — with zero convolutions — could match EfficientNet on ImageNet when pre-trained on enough data. Impact: enormous for research. Practical use: limited unless you have Google-scale data." },
                { type: "heading", level: 3, content: "2. DeiT (2021): data-efficient training" },
                { type: "text", content: "Touvron et al. (Facebook AI) showed that with the right **training recipe** — aggressive augmentation, regularisation, and a knowledge distillation token — ViTs can be trained competitively on ImageNet-1K alone. DeiT-B achieves 81.8% top-1 accuracy on ImageNet without external data." },
                { type: "heading", level: 3, content: "3. Swin Transformer (2021): hierarchical + efficient" },
                { type: "text", content: "Liu et al. (Microsoft Research) replaced global self-attention with **shifted window (Swin) attention** — computing attention within local windows and shifting them to enable cross-window information flow. This produces hierarchical feature maps, making Swin a drop-in replacement for ResNet in detection and segmentation frameworks like Mask R-CNN and UPerNet." },
                { type: "heading", level: 3, content: "4. DINOv2 (2024): self-supervised everything" },
                { type: "text", content: "Oquab et al. (Meta AI) trained ViT models on **142M curated images** using a combination of self-supervised objectives (self-distillation + masked image modelling). The result: **DINOv2 produces features that are useful for everything** — classification, segmentation, depth estimation, retrieval — without any task-specific fine-tuning. Frozen DINOv2 features + a linear probe often beat fully fine-tuned supervised models." },
                {
                    type: "table", headers: ["Model", "Year", "ImageNet Top-1", "Pre-training data", "Key innovation"], striped: true, caption: "Progression of Vision Transformer milestones. * Without external data. † Linear probe accuracy.", rows: [
                        ["ViT-B/16", "2020", "77.9%*", "ImageNet-1K", "Pure transformer for vision"],
                        ["ViT-L/16", "2020", "85.3%", "JFT-300M", "Scale is all you need"],
                        ["DeiT-B", "2021", "81.8%", "ImageNet-1K", "Training recipe + distillation"],
                        ["Swin-B", "2021", "83.5%", "ImageNet-1K", "Shifted window attention"],
                        ["DINOv2 ViT-g", "2024", "86.5%†", "LVD-142M", "Self-supervised foundation"],
                    ]
                },
            ],
        },
        {
            id: "when-to-use", label: "Decision Guide", heading: "ViTs vs CNNs: a practical decision framework",
            elements: [
                { type: "text", content: "Despite the hype, **CNNs are not dead**. Here is an honest decision framework based on practical experience." },
                {
                    type: "table", headers: ["Criterion", "Use ViT/DINOv2", "Use CNN (ResNet/EfficientNet)"], striped: true, rows: [
                        ["Dataset size", "> 10K images (or use pre-trained)", "< 5K images, no pre-training"],
                        ["Task type", "Dense prediction, global context needed", "Speed-critical, edge deployment"],
                        ["Compute budget", "GPU available (V100+)", "CPU or mobile NPU"],
                        ["Latency requirement", "> 20ms acceptable", "< 5ms required"],
                        ["Transfer learning", "DINOv2 frozen features are best-in-class", "EfficientNet is still very competitive"],
                    ]
                },
                { type: "callout", variant: "tip", title: "The DINOv2 shortcut", content: "For most practical problems in 2025, the fastest path to a strong model is: extract DINOv2 features (frozen backbone) → train a lightweight head (linear layer or small MLP). This requires minimal compute, no augmentation tuning, and often matches fully supervised baselines." },
                { type: "text", content: "On **edge devices** (mobile phones, embedded systems, IoT), CNNs still dominate. MobileNetV3 and EfficientNet-Lite run at 30+ FPS on a smartphone CPU. ViTs require dedicated NPU/GPU acceleration and even then lag behind in latency-per-accuracy on small models." },
            ],
        },
        {
            id: "fine-tuning", label: "Fine-tuning", heading: "Practical fine-tuning recipe for DINOv2",
            elements: [
                { type: "text", variant: "lead", content: "Here is the recipe I use for fine-tuning DINOv2 on custom datasets. It works for classification, segmentation, and retrieval tasks with minimal modification." },
                { type: "code", language: "python", filename: "finetune_dinov2.py", lineNumbers: true, content: "import torch\nimport torch.nn as nn\nfrom torchvision import transforms\n\n# Load DINOv2 ViT-Base from torch.hub\nbackbone = torch.hub.load('facebookresearch/dinov2', 'dinov2_vitb14')\n\n# Freeze the backbone — train only the head\nfor param in backbone.parameters():\n    param.requires_grad = False\n\n# Add classification head\nclass DINOv2Classifier(nn.Module):\n    def __init__(self, backbone, num_classes: int):\n        super().__init__()\n        self.backbone = backbone\n        self.head = nn.Sequential(\n            nn.LayerNorm(768),\n            nn.Linear(768, 256),\n            nn.GELU(),\n            nn.Dropout(0.1),\n            nn.Linear(256, num_classes),\n        )\n\n    def forward(self, x):\n        with torch.no_grad():\n            features = self.backbone(x)  # [CLS] token\n        return self.head(features)\n\nmodel = DINOv2Classifier(backbone, num_classes=10)\n\n# Training config\noptimizer = torch.optim.AdamW(\n    model.head.parameters(), lr=1e-3, weight_decay=0.05\n)\nscheduler = torch.optim.lr_scheduler.CosineAnnealingLR(\n    optimizer, T_max=30\n)" },
                {
                    type: "list", variant: "check", items: [
                        "**Freeze the backbone** for small datasets (< 10K images). Only train the head.",
                        "**Use AdamW** with weight_decay=0.05 and lr=1e-3 for the head.",
                        "**Cosine annealing** schedule for 30 epochs is usually sufficient.",
                        "**Minimal augmentation needed** — DINOv2 features are already robust to transformations.",
                        "**Input resolution**: DINOv2 ViT-B/14 expects 518×518 by default. You can use 224×224 with interpolated position embeddings for 2× speed-up with ~1% accuracy loss.",
                    ]
                },
                { type: "callout", variant: "insight", title: "When to unfreeze", content: "If your dataset is > 50K images and domain-shifted from natural images (medical imaging, satellite imagery, industrial inspection), unfreezing the last 4 transformer blocks and fine-tuning with lr=1e-5 can improve accuracy by 2–5%." },
            ],
        },
        {
            id: "benchmarks", label: "Benchmarks", heading: "Real-world benchmarks: ViTs in my projects",
            elements: [
                { type: "text", content: "I have used ViTs in several projects. Here are honest benchmarks from production-adjacent work — not cherry-picked paper results." },
                {
                    type: "table", headers: ["Task", "Model", "Accuracy/mAP", "Inference", "Notes"], striped: true, caption: "Real-world ViT performance from my projects.", rows: [
                        ["Indoor object classification", "DINOv2-B + linear", "91.2% top-1", "12ms (T4)", "28 classes, 3,850 images"],
                        ["Indoor object classification", "ResNet-50 (fine-tuned)", "87.4% top-1", "4ms (T4)", "Same dataset"],
                        ["Instance segmentation", "YOLOv8m (ConvNet)", "80.1% mAP50", "16ms (3070)", "HoloLens 2 data"],
                        ["Depth estimation", "DINOv2-B + DPT head", "Rel. err 0.11", "45ms (T4)", "NYU Depth V2"],
                        ["Image retrieval", "DINOv2-B frozen", "R@1: 89.3%", "8ms (T4)", "Indoor scene retrieval"],
                    ]
                },
                { type: "text", content: "The pattern is clear: **DINOv2 frozen features are extraordinarily good** for classification and retrieval. For dense prediction (segmentation, depth), you need a proper decoder head, but the backbone quality still gives you a significant advantage over training from scratch." },
                { type: "blockquote", content: "Foundation models like DINOv2 represent a genuine paradigm shift. The question is no longer 'how do I train a good backbone?' but 'how do I build the best head for my task?'", author: "Personal reflection", source: "After 6 months of experiments, 2025" },
            ],
        },
        {
            id: "conclusion", label: "Conclusion", heading: "The bottom line",
            elements: [
                { type: "text", variant: "lead", content: "Vision Transformers are no longer experimental — they are the default choice for most computer vision tasks in 2025. But knowing *which* ViT to use and *how* to deploy it efficiently is where the real skill lies." },
                {
                    type: "list", variant: "check", items: [
                        "**DINOv2 is the best starting point** for most CV tasks. Frozen features + lightweight head = fast iteration.",
                        "**Swin Transformer** is the best drop-in replacement for ResNet in detection/segmentation frameworks.",
                        "**CNNs still win** on edge devices, tiny datasets, and extreme latency requirements.",
                        "**Don't train ViTs from scratch** unless you have 10M+ images. Use pre-trained weights and fine-tune.",
                        "**Self-supervised pre-training** (DINO, MAE, I-JEPA) is the future — it removes the data labelling bottleneck.",
                    ]
                },
                {
                    type: "link-list", variant: "cards", links: [
                        { label: "DINOv2 Official Repo", href: "https://github.com/facebookresearch/dinov2", description: "Model weights, fine-tuning notebooks, and evaluation benchmarks.", external: true },
                        { label: "ViT Paper (ICLR 2021)", href: "https://arxiv.org/abs/2010.11929", description: "Dosovitskiy et al. — An Image is Worth 16x16 Words.", external: true },
                        { label: "Swin Transformer Paper", href: "https://arxiv.org/abs/2103.14030", description: "Liu et al. — Hierarchical Vision Transformer using Shifted Windows.", external: true },
                    ]
                },
            ],
        },
    ],
};

export const blogs: Blog[] = [blogYoloSegmentation, blog3DReconstruction, blogViT];

export function getBlogBySlug(slug: string): Blog | undefined {
    return blogs.find((b) => b.slug === slug);
}
export function getAllBlogSlugs(): string[] {
    return blogs.map((b) => b.slug);
}
export function getFeaturedBlogs(): Blog[] {
    return blogs.filter((b) => b.featured);
}
export function getBlogsByCategory(category: Blog["categories"][0]): Blog[] {
    return blogs.filter((b) => b.categories.includes(category));
}
export function getAllBlogCategories(): Blog["categories"][0][] {
    return Array.from(new Set(blogs.flatMap((b) => b.categories)));
}