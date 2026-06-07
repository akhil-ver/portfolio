# Premium Software Engineer Portfolio

Portfolio for Akhil Verma, student at Vellore Institute of Technology, Vellore, Tamil Nadu.

Welcome to the **Premium SDE Portfolio**, a state-of-the-art, fully dynamic, and animated personal portfolio built for modern software engineers. This portfolio is designed to not only showcase your projects and resume but to act as a comprehensive "career dashboard" featuring coding analytics, academic tracking, and AI-driven insights.

## 🌟 Key Features

- **Admin Control Panel**: Almost every section, title, metric, and insight on the website is editable directly from the UI. An integrated Admin mode allows you to tweak data on the fly.
- **Internet-wide Admin Persistence**: Admin edits are saved through a Vercel API route into Vercel KV/Upstash Redis, then loaded by every visitor before the app renders.
- **Premium Aesthetics**: Built with Tailwind CSS, utilizing glassmorphism, subtle gradients, rich dark-mode contrast, and interactive 3D tilt hover effects via Framer Motion.
- **Data Visualization**: Extensive use of `recharts` to render beautiful, interactive Area, Bar, Pie, and Radar charts to visualize your coding velocity, topic mastery, and academic performance.
- **Responsive Design**: Flawless experience across desktop, tablet, and mobile devices.

---

## 🛠️ Technology Stack

- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://motion.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Visualization**: [Recharts](https://recharts.org/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/) (Cards, Dialogs, Inputs, Buttons)
- **State Management**: React Hooks (`useState`, `useEffect`) + `localStorage`

---

## 📂 Architecture & Directory Structure

```text
frontend/
├── public/                # Static assets (images, certificates)
├── src/
│   ├── components/        # Reusable UI components (Buttons, Cards, Dialogs)
│   ├── data/              # Mock data definitions (studentData)
│   ├── lib/               # Utility functions (utils.ts) and Admin wrappers
│   ├── pages/             # Main Application Views (Overview, Projects, etc.)
│   ├── App.tsx            # Main application router and layout wrapper
│   └── index.css          # Global CSS, Tailwind directives, and custom animations
└── package.json           # Project dependencies
```

---

## 🖥️ Detailed Section & Component Breakdown

The application is broken down into modular pages, each serving as a specialized dashboard. Below is a detailed explanation of how each page works.

### 1. Overview Dashboard (`src/pages/Overview.tsx`)
**Purpose**: The central hub that gives visitors a quick summary of your profile, key metrics, and AI-generated insights.
- **KPI Cards**: Displays quick stats like Global Rank, Total Solved, and Consistency Score.
- **DSA Topic Mastery (Radar Chart)**: A visual representation of your proficiency across different Data Structure and Algorithm topics.
- **EduTrack Intelligence (AI Insights)**: A customizable insight panel that presents dynamic observations about your profile. 
- **Admin Capabilities**: You can edit the main header, the AI Insights text, and the Development Roadmap directly from the UI.

### 2. Projects (`src/pages/Projects.tsx`)
**Purpose**: A dynamic showcase of your software engineering projects.
- **Featured Projects**: Highlights your best work with large, prominent cards.
- **Project Grid & Filtering**: A searchable grid of all your projects, filterable by categories like "AI/ML", "Full Stack", etc.
- **Technologies I Use**: A visually engaging grid of your tech stack (React, Python, AWS, etc.). This section is fully editable—you can add or remove technologies, change their icons, and modify their colors.
- **AI Project Insights**: Provides high-level observations about your project portfolio (e.g., "Strong focus on AI/ML + NLP-based systems").
- **Development Timeline**: A chronological view of your engineering journey.
- **Admin Capabilities**: Add, edit, or delete projects. Modify the Tech Stack and AI Insights.

### 3. Coding Analytics (`src/pages/CodingAnalytics.tsx`)
**Purpose**: A deep dive into your competitive programming and problem-solving metrics.
- **Solving Velocity (Area Chart)**: Tracks the number of problems you solve over time.
- **Difficulty Distribution (Pie Chart)**: Breaks down your solved problems into Easy, Medium, and Hard categories.
- **Platform Comparison (Bar Chart)**: Compares your activity across platforms like LeetCode and GeeksForGeeks.
- **Strengths & Weaknesses**: A dual-column progress bar layout analyzing your best and worst algorithmic topics.
- **AI Recommendation**: A dedicated card providing actionable advice (e.g., "Solve 10 medium Graph problems").
- **Admin Capabilities**: Edit chart data points, update your strengths/weaknesses, and modify AI recommendations.

### 4. Certifications (`src/pages/Certifications.tsx`)
**Purpose**: Displays your professional credentials and continuous learning progress.
- **Certificate Grid**: A responsive grid of your acquired certifications. Images are scaled beautifully using `object-contain` to ensure full visibility without cropping. Includes sharing and download functionalities.
- **Learning Path Progress**: Tracks courses you are currently taking, complete with progress bars and estimated completion times.
- **AI Learning Insights**: Suggests the next best certification for your career path based on your current skills.
- **Admin Capabilities**: Add, edit, or delete certificates. Update your Learning Path and tweak the AI's certification recommendations.

### 5. Academics (`src/pages/Academics.tsx`)
**Purpose**: Tracks your educational journey, semester performance, and overall GPA.
- **Semester Breakdown (Bar Chart)**: Visualizes your SGPA across multiple semesters.
- **Detailed Academic Records**: An expandable accordion list detailing the courses and grades for each semester.
- **Predictive Analytics & AI Insights**: Projects your final CGPA based on current trends and provides academic advice.
- **Admin Capabilities**: Edit semester data, modify the predictive analytics text, and update overall GPA metrics.

### 6. Resume & Experience (`src/pages/Resume.tsx`)
**Purpose**: A digital representation of your traditional resume.
- **Experience Timeline**: A vertical timeline detailing your work history, internships, and roles.
- **Skills Matrix**: A categorized breakdown of your technical proficiencies (Languages, Frameworks, Tools).
- **Download Action**: A quick action button to download your static PDF resume.

### 7. Contact (`src/pages/Contact.tsx`)
**Purpose**: Provides ways for recruiters and peers to get in touch with you.
- **Contact Information**: Displays your email, phone, and location.
- **Social Profiles**: Links to your GitHub, LinkedIn, Instagram, etc.
- **Message Form**: A beautifully styled contact form interface.
- **Admin Capabilities**: Update your contact details, add or remove social media links, and customize the form's placeholder text.

---

## ⚙️ How the Admin & Data System Works

This portfolio uses an `<AdminOnly>` wrapper for edit controls and a shared remote storage layer for deployed changes.

1. **The `<AdminOnly>` Component**: 
   Throughout the codebase, edit buttons and forms are wrapped in `<AdminOnly>`. This component checks if the user is in "Admin Mode" before rendering the UI controls.
   
2. **Remote Storage Synchronization**:
   The app loads `/api/content` before React renders and copies saved remote values into `localStorage`, so the existing page editors keep working. When an Admin makes a change, `localStorage.setItem` is mirrored to `/api/content`, which saves the value in Vercel KV/Upstash Redis.
   
   *Example:*
   ```javascript
   const saveTechStack = (newTechStack) => {
     setTechStack(newTechStack); // Update UI
     localStorage.setItem("portfolio-project-tech", JSON.stringify(newTechStack)); // Persist locally and remotely
   };
   ```

3. **Required Vercel Environment Variables**:
   Add a Vercel KV database to the project, or connect an Upstash Redis database, then set these environment variables in Vercel:
   ```text
   KV_REST_API_URL
   KV_REST_API_TOKEN
   ADMIN_USERNAME
   ADMIN_PASSWORD
   VITE_ADMIN_USERNAME
   VITE_ADMIN_PASSWORD
   ```
   `KV_REST_API_URL` and `KV_REST_API_TOKEN` are created automatically by Vercel KV. If you use Upstash directly, use `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` instead.

4. **Local Development Fallback**:
   If the KV variables are not configured locally, the app still works with browser-only local storage. Internet-wide sync starts after deployment with the KV variables configured.

---

## 🚀 Getting Started Locally

1. **Clone the repository** and navigate to the frontend directory.
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the development server**:
   ```bash
   npm run dev
   ```
4. **Access the application** at `http://localhost:5173` (or the port specified by Vite).

## 🎨 Customizing the Theme

The application's theme is driven by Tailwind CSS and CSS variables located in `src/index.css`.
- Colors: Modify the `--primary`, `--secondary`, and `--background` variables to instantly change the global color scheme.
- Animations: Custom keyframes (like `blob`, `shimmer`, and `float`) are defined in `index.css` and can be tweaked to alter the behavior of the background elements and cards.

---
*Built with modern web standards to provide a premium, interactive showcase of software engineering excellence.*
