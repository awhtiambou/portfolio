# Portfolio Website

A modern, high-performance personal portfolio website engineered with Next.js 15, TypeScript, and Tailwind CSS. It features a sophisticated design system with comprehensive dark/light mode support, buttery-smooth animations, and full internationalization capabilities.

## 🚀 Key Features

### 🏗️ Architecture & Performance
- **Next.js 15 App Router**: Leveraging the latest React Server Components (RSC) architecture for optimal performance and SEO.
- **Server-Side Rendering (SSR) & Static Site Generation (SSG)**: Hybrid rendering strategies to balance dynamic content with fast load times.
- **Optimized Assets**: utilizing `next/font` for zero layout shift and `next/image` for responsive image optimization.
- **Code Splitting**: Automatic route-based code splitting for faster initial page loads.

### 🎨 Design & UX
- **Custom Design System**: Extensive Tailwind CSS configuration extending theme tokens for colors, typography, and spacing.
- **Typography**: A curated font stack using `Besley` (Headings), `Inter` (Body), and `Work Sans` (Accents).
- **Advanced Animations**: Powered by **Framer Motion**, featuring:
  - Page transition effects.
  - Interactive spotlight effects on project cards.
  - Smooth scroll-triggered reveals.
  - Complex micro-interactions (hover states, buttons).
- **Theming**: seamless Dark/Light mode switching with system preference detection via `next-themes`.
- **Responsive Layout**: Mobile-first design ensuring a perfect experience across all device sizes.

### 🌐 Internationalization (i18n)
- **Multi-language Support**: Full English and French localization.
- **Routing**: Locale-based routing (e.g., `/en/projects`, `/fr/about`).
- **Middleware**: Automatic locale detection and redirection based on user preference.
- **Type-safe Translations**: Using `next-intl` for robust and error-free text management.

## 🛠️ Tech Stack & Ecosystem

- **Core**: [Next.js 15](https://nextjs.org/), [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [PostCSS](https://postcss.org/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: React Context & Hooks (for specific UI states like menus and filters)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Linting & Formatting**: ESLint, Prettier

## 🧠 Advanced Implementation Details

### ✨ Spotlight & Glassmorphism
The project implements advanced UI patterns such as the "Spotlight Effect" on project cards. This is achieved using `framer-motion` to track mouse movements and dynamically update CSS gradients. Glassmorphism employs `backdrop-filter: blur()` combined with semi-transparent backgrounds to create depth and hierarchy, especially in the navigation drawer and headers.

### 📱 Responsive Navigation
The navigation system is built to handle complex responsive requirements:
- **Desktop**: A clean, accessible top bar with hover effects.
- **Mobile**: A full-screen drawer implementation with staggering animations for menu items, mesh gradient backgrounds, and gesture support.

## 📦 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/awhtiambou/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)** with your browser to see the result.

## 📁 Project Structure

```
src/
├── app/                  # Next.js App Router (pages, layouts, loading ui, error boundaries)
│   ├── (pages)/          # Standard route pages
│   └── [locale]/         # Localized routes
├── components/           # Reusable React components
│   ├── layout/           # Structure components (Header, Footer, MenuDrawer)
│   ├── sections/         # Complex page sections (ProjectsGrid, Hero, etc.)
│   └── ui/               # Atomic UI primitives (Button, Card, Badge)
├── config/               # App-wide configuration (navigation links, theme tokens)
├── data/                 # Static data sources (projects.ts, profile.ts)
├── hooks/                # Custom React hooks (useMediaQuery, etc.)
├── i18n/                 # Internationalization logic
│   ├── locales/          # Translation JSON files (en.json, fr.json)
│   ├── request.ts        # i18n request configuration
│   └── config.ts         # Supported locales config
├── lib/                  # Utility functions (cn, formatters)
├── providers/            # Context providers (ThemeProvider, etc.)
└── types/                # TypeScript type definitions (Project, Profile, etc.)
```

## 🎨 Customizing & Extensibility

This portfolio is designed to be easily customizable:

- **Content**:
    - **Projects**: Edit `src/data/projects.ts` to add your own case studies. The type definition ensures you provide all necessary fields.
    - **Profile**: Update your personal info in `src/data/profile.ts`.
    - **Translations**: Modify text in `src/i18n/locales/en.json` & `fr.json`.

- **Theme & Design**:
    - **Colors/Fonts**: Adjust variables in `src/app/globals.css` and `tailwind.config.ts`.
    - **Navigation**: Update menu links in `src/config/navigation.ts`.
    - **Components**: UI components are modular. You can freely modify `src/components/ui` to change the base look of buttons, cards, etc.

## ✅ Best Practices Followed

- **Semantic HTML**: Proper use of HTML5 tags for accessibility and SEO.
- **Component Composition**: Small, focused components for reusability and testing.
- **Type Safety**: Strict TypeScript configuration to catch errors at build time.
- **Performance**: Heavy assets are optimized, and expensive computations are memoized.

## 🚀 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
