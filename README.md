# RAKESH S. —  Portfolio

A bespoke, editorial cybersecurity portfolio built with **React 18**, **TypeScript**, **Framer Motion**, and **Vite**.

Designed with an Awwwards-quality cinematic dark aesthetic:
- **70% Charcoal Black (`#171717`)**
- **20% Forest Green (`#06110C`)**
- **10% Crimson Red (`#A31C1B`)**
- **Editorial Typography**: *Cormorant Garamond* (headings), *Inter* (body), *JetBrains Mono* (code & technical labels)

---

## 🚀 Getting Started

### 1. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Build for Production
```bash
npm run build
```
Creates an optimized production bundle in the `dist/` directory.

### 3. Preview Production Build
```bash
npm run preview
```

---

## 📁 Project Structure

```
My Portfolio/
├── public/
│   ├── favicon.svg             # Minimalist crimson brand monogram
│   ├── portrait.jpg            # Your real professional photograph
│   └── resume.pdf              # (Drop your real resume PDF here)
├── src/
│   ├── components/
│   │   ├── Navigation.tsx      # Sticky translucent desktop & full-screen mobile menu
│   │   ├── AtmosphericCanvas.tsx # 60fps GPU ambient dust & ember particle system
│   │   ├── CustomCursor.tsx    # Dual-element desktop cursor with crimson hover glow
│   │   ├── ScrollProgress.tsx  # Top 2px crimson scroll-depth tracker
│   │   └── Footer.tsx          # Minimalist footer
│   ├── sections/
│   │   ├── Hero.tsx            # Cinematic hero with masked typography & art-directed portrait
│   │   ├── About.tsx           # Editorial bio, geometric frames, and education cards
│   │   ├── Expertise.tsx       # 4 verified technical domains with honest skill levels
│   │   ├── Projects.tsx        # CyberLens (featured), Smart Helmet, and HydroSense
│   │   ├── CyberLensCase.tsx   # Dedicated full-screen modal case study for CyberLens
│   │   ├── Labs.tsx            # Cyber labs in a tasteful "Coming Soon" state
│   │   ├── Experience.tsx      # Vertical timeline with honest placeholder
│   │   ├── Certifications.tsx  # Completed vs. In-Progress (Google Cybersecurity Cert)
│   │   ├── Education.tsx       # Alternating vertical timeline (MCA & BCA)
│   │   ├── Skills.tsx          # Pill tags categorized across 4 areas (no fake % bars)
│   │   ├── Resume.tsx          # Magnetic hover call-to-action
│   │   └── Contact.tsx         # "LET'S CONNECT." with structured links
│   ├── data/
│   │   └── portfolio.ts        # Single source of truth for verified portfolio data
│   ├── styles/
│   │   └── index.css           # Global design tokens and reset
│   ├── App.tsx                 # Root application component
│   └── main.tsx                # Entry point
└── package.json
```

---

## ✏️ Personalization & Placeholders Checklist

When you're ready to update your personal details:

1. **Resume File**:
   - Place your real `resume.pdf` into the `public/` folder.
2. **Contact Links** (`src/sections/Contact.tsx` & `src/data/portfolio.ts`):
   - Replace `placeholder@email.com` with your real email.
   - Replace `href="#"` with your actual **LinkedIn** profile URL.
   - Replace `href="#"` with your actual **GitHub** profile URL.
3. **Project Screenshots** (`src/sections/Projects.tsx` & `src/sections/CyberLensCase.tsx`):
   - Drop screenshots for **CyberLens**, **Smart Helmet**, and **HydroSense** into `public/projects/` and replace the styled placeholders.
4. **Cyber Labs Writeups** (`src/sections/Labs.tsx`):
   - As you complete TryHackMe, HackTheBox, or PortSwigger labs, add your walkthrough links directly to the category cards.

---

## 🛡️ Truthful Content Guarantee

This portfolio strictly adheres to factual claims:
- No invented jobs, companies, or clients.
- Certifications clearly differentiate between **Completed** and **In Progress** (*Google Cybersecurity Professional Certificate*).
- Education accurately reflects your completed **BCA** from *St. Francis College, Bengaluru* and current **MCA (Cybersecurity)**.
- CyberLens is described as a **defensive static analysis workbench** (no false claims of a silver-bullet malware detector).
