<div align="center">

# 🚀 SmartPrep

### AI-Powered Interview Preparation Platform

<img src="https://readme-typing-svg.demolab.com?font=Poppins&weight=600&size=28&pause=1000&color=00C2FF&center=true&vCenter=true&width=700&lines=AI+Powered+Interview+Preparation+Platform;Resume+Optimization+with+Gemini+AI;Personalized+Interview+Roadmaps;Built+with+MERN+%2B+Google+Gemini+AI" />

<br>

<p align="center">
<img src="https://img.shields.io/github/stars/deveshtyagi725/AI-Powered-Interview-prepation-platform---SmartPrep?style=for-the-badge&color=yellow" />
<img src="https://img.shields.io/github/forks/deveshtyagi725/AI-Powered-Interview-prepation-platform---SmartPrep?style=for-the-badge&color=blue" />
<img src="https://img.shields.io/github/license/deveshtyagi725/AI-Powered-Interview-prepation-platform---SmartPrep?style=for-the-badge&color=green" />
<img src="https://img.shields.io/github/repo-size/deveshtyagi725/AI-Powered-Interview-prepation-platform---SmartPrep?style=for-the-badge&color=red" />
</p>

<p align="center">
<img src="https://img.shields.io/badge/Frontend-React.js-61DAFB?style=flat-square&logo=react" />
<img src="https://img.shields.io/badge/Backend-Node.js-339933?style=flat-square&logo=node.js" />
<img src="https://img.shields.io/badge/Database-MongoDB-47A248?style=flat-square&logo=mongodb" />
<img src="https://img.shields.io/badge/AI-Google_Gemini-4285F4?style=flat-square&logo=google" />
<img src="https://img.shields.io/badge/Deployment-Vercel-black?style=flat-square&logo=vercel" />
<img src="https://img.shields.io/badge/Deployment-Render-46E3B7?style=flat-square" />
</p>

</div>

---

# 🌟 Overview

SmartPrep is an **AI-Powered Interview Preparation Platform** designed to help job seekers improve their interview readiness through intelligent resume analysis, job matching, interview question generation, skill-gap detection, and personalized preparation roadmaps.

The platform leverages **Google Gemini AI** to deliver customized interview preparation strategies and ATS-optimized resumes.

---

# 🎯 Problem Statement

Most candidates face challenges such as:

❌ Unclear Resume Quality

❌ Poor ATS Compatibility

❌ Lack of Interview Preparation

❌ Difficulty Understanding Skill Gaps

❌ No Personalized Learning Roadmap

SmartPrep solves all these problems using Artificial Intelligence.

---

# ✨ Key Features

<table>
<tr>
<td width="50%">

### 🤖 AI Interview Analysis

* Resume Evaluation
* Match Score Calculation
* Technical Questions
* Behavioral Questions
* Interview Insights

</td>

<td width="50%">

### 📄 AI Resume Builder

* ATS Friendly Resume
* Resume Optimization
* Tailored Job Applications
* PDF Resume Generation

</td>
</tr>

<tr>
<td>

### 📊 Skill Gap Analysis

* Missing Skills Detection
* Severity Analysis
* Improvement Suggestions
* Learning Recommendations

</td>

<td>

### 🗺️ Preparation Roadmap

* Personalized Plans
* Daily Tasks
* Interview Strategy
* Career Growth Guidance

</td>
</tr>
</table>

---

# 🧠 AI Workflow

```mermaid
graph TD

A[Upload Resume] --> B[Self Description]
B --> C[Job Description]

C --> D[Google Gemini AI]

D --> E[Resume Analysis]
D --> F[Match Score]
D --> G[Technical Questions]
D --> H[Behavioral Questions]
D --> I[Skill Gap Analysis]
D --> J[Preparation Plan]

J --> K[Candidate Improvement]
```

---

# 🏗️ System Architecture

```mermaid
graph LR

A[React + Vite Frontend]
--> B[Express API]

B --> C[MongoDB Atlas]

B --> D[Google Gemini AI]

D --> E[Interview Report]

D --> F[Resume Generator]

E --> G[User Dashboard]

F --> G
```

---

# ⚡ Tech Stack

## Frontend

| Technology   | Purpose         |
| ------------ | --------------- |
| React.js     | UI Development  |
| Vite         | Fast Build Tool |
| Axios        | API Requests    |
| React Router | Routing         |
| Tailwind CSS | Styling         |

---

## Backend

| Technology | Purpose           |
| ---------- | ----------------- |
| Node.js    | Runtime           |
| Express.js | Backend Framework |
| MongoDB    | Database          |
| Mongoose   | ODM               |
| JWT        | Authentication    |
| Multer     | File Uploads      |

---

## AI Integration

| Technology       | Purpose            |
| ---------------- | ------------------ |
| Google Gemini AI | AI Analysis        |
| Gemini 2.5 Flash | Content Generation |

---

# 📂 Project Structure

```bash
SmartPrep
│
├── Frontend
│   │
│   ├── src
│   │   ├── pages
│   │   ├── components
│   │   ├── hooks
│   │   ├── services
│   │   └── assets
│   │
│   └── public
│
├── Backend
│   │
│   ├── src
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── routes
│   │   ├── services
│   │   ├── models
│   │   └── config
│   │
│   └── server.js
│
└── README.md
```

---

# 🔐 Authentication Flow

```mermaid
sequenceDiagram

User->>Frontend: Login Request
Frontend->>Backend: Credentials
Backend->>MongoDB: Verify User
MongoDB-->>Backend: User Found
Backend-->>Frontend: JWT Token
Frontend-->>User: Access Granted
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/deveshtyagi725/AI-Powered-Interview-prepation-platform---SmartPrep.git
```

---

## Backend Setup

```bash
cd Backend

npm install

npm run dev
```

---

## Frontend Setup

```bash
cd Frontend

npm install

npm run dev
```

---

# ⚙️ Environment Variables

```env
PORT=3000

MONGODB_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET

GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

---


---

# 🔥 Why SmartPrep?

✅ Personalized Interview Preparation

✅ AI Powered Resume Analysis

✅ ATS Optimization

✅ Skill Gap Identification

✅ Interview Readiness Score

✅ Personalized Roadmap

✅ Modern Full Stack Architecture

---

# 📈 Future Roadmap

* 🎙️ Voice Based Mock Interviews
* 🎥 Video Interview Simulation
* 🤖 AI Interviewer Avatar
* 📊 Analytics Dashboard
* 🌎 Multi-Language Support
* 📱 Mobile Application
* 📚 AI Learning Recommendations

---

# 👨‍💻 Developer

<div align="center">

## Devesh Tyagi

Full Stack Developer | MERN Stack | AI Enthusiast

<a href="https://github.com/deveshtyagi725">
<img src="https://img.shields.io/badge/GitHub-Profile-black?style=for-the-badge&logo=github">
</a>

</div>

---

<div align="center">

# ⭐ Support The Project

If you found this project useful,

### Give it a Star ⭐

### Fork it 🍴

### Contribute 🚀

<br>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:00C2FF,100:8A2BE2&height=120&section=footer"/>

</div>
