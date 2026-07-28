<!-- # React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project. -->


<div align="center">

# SkillSync AI

### Embedding-Powered Semantic Recruitment Platform

AI-powered resume analysis, semantic job matching, and intelligent candidate ranking using vector embeddings.

![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)
![OpenRouter](https://img.shields.io/badge/OpenRouter-AI-blue?style=flat-square)
![Semantic Search](https://img.shields.io/badge/Semantic-Embeddings-purple?style=flat-square)

## Live Demo

Frontend:
https://skillsync-ai-2-nfh0.onrender.com

Backend API:
https://backend-skillsync-ai-2.onrender.com

</div>

---

# Overview

SkillSync AI is an AI-powered recruitment platform that enhances hiring through **semantic search** and **vector embeddings**.

Unlike traditional Applicant Tracking Systems (ATS) that rely on keyword matching, SkillSync AI understands the contextual meaning of resumes and job descriptions. By transforming candidate profiles and job descriptions into vector embeddings and comparing them using cosine similarity, the platform delivers intelligent, explainable, and context-aware candidate recommendations.

The application provides separate workflows for students and recruiters, integrating AI-powered resume analysis, semantic job matching, resume storage, and intelligent applicant ranking into a unified recruitment platform.

---

# Motivation

Conventional recruitment systems often struggle to identify suitable candidates because they depend heavily on exact keyword matching. This approach may overlook qualified applicants whose resumes use different terminology despite having relevant skills and experience.

SkillSync AI addresses this limitation by introducing semantic understanding into the recruitment process, enabling recruiters to discover candidates based on contextual relevance rather than identical keywords.

---

# Proposed Solution

SkillSync AI combines Large Language Models, vector embeddings, and cosine similarity to create an intelligent recruitment pipeline.

```
Resume PDF
      │
      ▼
Resume Parsing
      │
      ▼
Text Extraction
      │
      ▼
Embedding Generation
      │
      ▼
Semantic Similarity
      │
      ▼
Match Score
      │
      ▼
AI Recommendation
      │
      ▼
HR Dashboard
```

---

# System Architecture

```
                 React Frontend
                        │
                        ▼
                 Express.js API
        ┌───────────────┼────────────────┐
        │               │                │
        ▼               ▼                ▼
     MongoDB       OpenRouter AI     Supabase Storage
        │
        ▼
   Embedding Engine
        │
        ▼
  Cosine Similarity
        │
        ▼
 Semantic Candidate Ranking
```

---

# Core Features

## Student Portal

- Student authentication using JWT
- Resume upload and cloud storage
- AI-powered resume analysis
- Resume quality scoring
- Semantic job recommendations
- Apply for jobs
- Profile management

## Recruiter Portal

- Recruiter authentication
- Create, edit and delete job postings
- View applicants
- AI-powered candidate ranking
- Accept or reject applications
- Semantic hiring recommendations

## AI Engine

- Resume parsing
- Semantic embeddings
- Cosine similarity matching
- Resume summarization
- Resume scoring
- Explainable AI recommendations

---

# Technology Stack

| Layer | Technology |
|--------|------------|
| Frontend | React, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Authentication | JWT |
| AI Models | OpenRouter |
| Embedding Engine | Hugging Face Embeddings |
| Storage | Supabase Storage |
| Matching Algorithm | Cosine Similarity |

---

# Project Structure

```
skillsync-ai/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── server.js
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   └── main.jsx
│
├── public/
├── package.json
└── README.md
```

---

# Installation

Clone the repository

```bash
git clone https://github.com/your-username/skillsync-ai.git
```

Navigate into the project

```bash
cd skillsync-ai
```

Install frontend dependencies

```bash
npm install
```

Install backend dependencies

```bash
cd backend
npm install
```

Start the backend

```bash
npm run dev
```

Start the frontend

```bash
cd ..
npm run dev
```

---

# Environment Variables

Create a `.env` file inside the `backend` directory.

```env
PORT=

MONGODB_URI=

JWT_SECRET=

SUPABASE_URL=

SUPABASE_ANON_KEY=

OPENROUTER_API_KEY=

HUGGINGFACE_API_KEY=
```

Never commit your `.env` file to GitHub.

---

# Screenshots

> Screenshots will be added after deployment.

- Landing Page
- Student Registration
- Hr Register
- Student Dashboard
- HR Dashboard
- Resume Analysis
- Semantic Matching

---

# Future Enhancements

- AI Interview Copilot
- Resume ATS Optimisation
- Recruiter Analytics Dashboard
- Skill Gap Analysis
- Interview Scheduling
- Email Notifications
- Multi-language Resume Analysis
- Retrieval-Augmented Generation (RAG) for candidate recommendations

---

# Author

**Kashish Singh**

B.Tech Computer Science Engineering

Interests:
- Artificial Intelligence
- Semantic Search
- Machine Learning
- Full-Stack Development
- Vector Embeddings

GitHub:
https://github.com/kashish-Singh25

---

# License

This project is intended for educational, research, and portfolio purposes.
