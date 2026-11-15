# RAKESH S. — Premium Cinematic Cybersecurity Portfolio

A bespoke, editorial cybersecurity portfolio built with **React 18**, **TypeScript**, **Framer Motion**, and **Vite**.

Designed with an Awwwards-quality cinematic dark aesthetic:
- **70% Charcoal Black (`#171717`)**
- **20% Forest Green (`#06110C`)**
- **10% Crimson Red (`#A31C1B`)**
- **Editorial Typography**: *Cormorant Garamond* (headings), *Inter* (body), *JetBrains Mono* (code & technical labels)

---

## 💻 How to Open and Run in Visual Studio Code

### Step 1: Extract the ZIP Archive
1. Right-click `Rakesh-Portfolio-Complete.zip`.
2. Select **Extract All...** (or use 7-Zip / WinRAR) and choose a destination folder (e.g., `Documents\My Portfolio`).

### Step 2: Open in Visual Studio Code
1. Open **Visual Studio Code**.
2. Go to **File** > **Open Folder...** (or press `Ctrl + K, Ctrl + O`).
3. Select the extracted project folder containing `package.json`.

### Step 3: Install Dependencies
1. Open the integrated terminal in VS Code (`Ctrl + ~` or **Terminal** > **New Terminal**).
2. Run:
   ```bash
   npm install
   ```
   *(Ensure you have [Node.js](https://nodejs.org/) v18+ installed on your computer).*

### Step 4: Start the Local Development Server
1. In the terminal, run:
   ```bash
   npm run dev
   ```
2. Click the link in the terminal or navigate to:
   👉 **http://localhost:5173**

---

## 🛠️ Available Scripts

- **`npm run dev`**: Starts the local Vite development server with Hot Module Replacement (HMR).
- **`npm run build`**: Compiles TypeScript and creates an optimized production build in the `dist/` directory.
- **`npm run preview`**: Previews the production build locally.

---

## 📁 Project Structure

```
Rakesh-Portfolio/
├── public/                     # Static assets (images, fonts, resume)
│   ├── favicon.svg             # Crimson monogram icon
│   ├── hero-foundation-hd.jpg  # Full HD cinematic visual foundation plate
│   ├── portrait.jpg            # Original high-resolution photograph
│   └── resume.pdf              # Downloadable resume PDF
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── Navigation.tsx      # Sticky translucent desktop & mobile navigation
│   │   ├── Navigation.css
│   │   ├── AtmosphericCanvas.tsx # 60fps GPU ambient dust & ember particle system
│   │   ├── CustomCursor.tsx    # Dual-element cursor with crimson hover glow
│   │   ├── ScrollProgress.tsx  # Top crimson scroll-depth tracker
│   │   └── Footer.tsx          # Minimalist footer
│   ├── sections/               # Portfolio sections
│   │   ├── Hero.tsx            # Cinematic hero with real interactive HTML controls
│   │   ├── Hero.css
│   │   ├── About.tsx           # Editorial bio, education & philosophy
│   │   ├── Expertise.tsx       # 4 verified technical domains
│   │   ├── Projects.tsx        # CyberLens, Smart Helmet, HydroSense, and SentinelMail
│   │   ├── CyberLensCase.tsx   # Dedicated full-screen modal case study for CyberLens
│   │   ├── SentinelMailCase.tsx# Dedicated full-screen modal case study for SentinelMail
│   │   ├── Labs.tsx            # Interactive Cyber Labs (Network, Web, Linux, Forensics, Cloud, CTF)
│   │   ├── Experience.tsx      # Practical experience timeline
│   │   ├── Certifications.tsx  # Completed vs. In-Progress certs
│   │   ├── Education.tsx       # MCA (Cybersecurity) & BCA
│   │   ├── Skills.tsx          # Categorized technical skills
│   │   ├── Resume.tsx          # Interactive call-to-action & download
│   │   └── Contact.tsx         # Contact links & social connections
│   ├── data/
│   │   ├── portfolio.ts        # Single source of truth for portfolio data
│   │   └── cyberLabs.ts        # Dynamic labs registry
│   ├── styles/
│   │   └── index.css           # Global design tokens and typography
│   ├── App.tsx                 # Root application component
│   └── main.tsx                # Entry point
├── index.html                  # HTML entry point with Google Fonts
├── vercel.json                 # Vercel deployment configuration
├── package.json                # Project dependencies and scripts
├── package-lock.json           # Locked dependency tree
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite build configuration
└── README.md                   # Complete documentation
```

---

## 🚀 Deployment to Vercel

### Method 1: Deploy with Vercel CLI
```bash
npx vercel
```
Follow the interactive prompts to link and deploy your project. For production:
```bash
npx vercel --prod
```

### Method 2: Deploy via GitHub (Recommended)
1. Push this repository to your GitHub account (`https://github.com/rakeshhraki/portfolio`).
2. Log into [Vercel](https://vercel.com).
3. Click **Add New...** > **Project**.
4. Import your GitHub repository.
5. Framework Preset will auto-detect **Vite**; keep default build command `npm run build` and output directory `dist`.
6. Click **Deploy**. Your site will be live instantly with automated CI/CD!

---

## ✏️ Personalization & Placeholders Checklist

When you want to update your details:

1. **Resume File**: Drop your real `resume.pdf` into the `public/` folder.
2. **Contact Links** (`src/sections/Contact.tsx` & `src/data/portfolio.ts`):
   - Replace placeholder email with your real email.
   - Replace `href="#"` with your actual **LinkedIn** profile URL.
   - Replace `href="#"` with your actual **GitHub** profile URL.
3. **Project Screenshots** (`src/sections/Projects.tsx` & `src/sections/CyberLensCase.tsx`):
   - Add screenshots for **CyberLens**, **Smart Helmet**, and **HydroSense**.

---

## 🛡️ Truthful Content Guarantee

This portfolio strictly adheres to factual claims:
- No invented jobs, companies, or clients.
- Certifications clearly differentiate between **Completed** and **In Progress** (*Google Cybersecurity Professional Certificate*).
- Education accurately reflects your completed **BCA** from *St. Francis College, Bengaluru* and current **MCA (Cybersecurity)**.
- CyberLens is described as a **defensive static analysis workbench**.
