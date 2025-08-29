# Kanban App

A minimal, fast Kanban board to organize tasks by status and priority. Drag cards between lists, quickly add/edit tasks, and stay on top of your workflow.

**Live demo:** https://kanban-app-brown.vercel.app/

---

## ✨ Features

- Create, edit, delete **boards**, **lists** (columns), and **cards** (tasks)
- **Drag & drop** cards between lists
- Task details: title, description, (optional) labels & due dates
- **Search / filter** tasks (optional — remove if not in your build)
- **Responsive** layout for desktop and mobile
- Local, client-side persistence (easy to switch to an API later)

> Tip: If your current build doesn’t include some items above, just remove that bullet. This README is structured so you can toggle sections easily.

---

## 🧱 Tech Stack

- Frontend SPA (generated with **JDoodle.ai**)
- Deployed on **Vercel**
- JavaScript/TypeScript + modern UI component styles
- Drag & drop via a lightweight DnD library (e.g., `@dnd-kit/core` or `@hello-pangea/dnd`) — adjust to match your code

---

## 📸 Screenshots

> Replace the placeholders with your own images from `/public` or an issue/PR:

<img width="500" height="300" alt="Screenshot 2025-08-29 223353" src="https://github.com/user-attachments/assets/4cf698ed-162d-4a68-a831-c55f18710a8a" />
<img width="500" height="300" alt="image" src="https://github.com/user-attachments/assets/1f67ac09-48f2-401b-9f1e-60937d67a94e" />


---

## 🚀 Getting Started (Local)

> Works for most React/Vite/Next-style projects. Adjust scripts if needed.

```bash
# 1) Clone your repo
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>

# 2) Install deps
npm install
# or: pnpm install / yarn

# 3) Run dev server
npm run dev

# 4) Build & preview
npm run build
npm run preview
