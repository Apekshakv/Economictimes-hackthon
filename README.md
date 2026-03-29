
# Economictimes Hackathon – AI Enterprise Content Automation

## Overview

This project is built for the **Economic Times Hackathon** and focuses on creating an **AI-powered multi-agent system that automates the full lifecycle of enterprise content** — from creation to distribution.

The goal is to **reduce content turnaround time, maintain brand consistency, and automate enterprise publishing workflows** using intelligent agents.

---

## Problem Statement

Build an **AI agent system** that automates the full lifecycle of enterprise content:

* Content creation
* Compliance and brand review
* Localization for different audiences
* Multi-channel distribution

The system should improve **speed, consistency, and efficiency** in enterprise content management.

---

## Solution

Our platform provides an **AI-driven content operations dashboard** that allows teams to:

1. **Generate AI-powered content**
2. **Review content for compliance**
3. **Localize content for multiple audiences**
4. **Distribute content across multiple platforms**

The system integrates intelligent agents that automate each stage while allowing **human-in-the-loop approval** when necessary.

---

## Key Features

### 1. AI Content Generation

Generate marketing or enterprise content using AI based on internal knowledge, reports, or prompts.

### 2. Multi-Agent Pipeline

A pipeline of AI agents performs different tasks:

* Drafting content
* Compliance and brand checks
* Localization
* Publishing preparation

### 3. Brand Governance Agent

Ensures that all generated content follows:

* Brand tone
* Terminology guidelines
* Regulatory compliance

### 4. Content Intelligence

Agents analyze engagement data across platforms to:

* Identify performance patterns
* Suggest improvements
* Optimize publishing strategy

### 5. Multi-Channel Distribution

The **Distribution Hub** allows publishing content across platforms such as:

* LinkedIn
* Twitter/X
* Email
* Websites

---

## Tech Stack

**Frontend**

* React
* React Router
* React Icons
* Inline CSS / UI Dashboard

**Backend / AI**

* Groq API
* AI agent pipelines

**Tools**

* Git
* GitHub
* Node.js

---

## Project Structure

```
project-root
│
├── src
│   ├── components
│   │   └── ProtectedRoute.jsx
│   │
│   ├── pages
│   │   ├── DistributionHub.jsx
│   │   └── ContentGenerator.jsx
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .env
├── package.json
└── README.md
```

---

## Installation

### 1. Clone the repository

```
git clone https://github.com/Apekshakv/Economictimes-hackthon.git
```

### 2. Navigate to the project

```
cd Economictimes-hackthon
```

### 3. Install dependencies

```
npm install
```

### 4. Create environment variables

Create a `.env` file:

```
GROQ_API_KEY=your_api_key_here
```

### 5. Run the project

```
npm run dev
```

---

## How It Works

1. Users generate enterprise content using AI.
2. AI agents review and refine the content.
3. Compliance and brand checks ensure governance.
4. Content is localized if needed.
5. The Distribution Hub publishes the content across multiple channels.

---

## Future Improvements

* Automated scheduling for posts
* Advanced analytics dashboard
* AI-driven content strategy recommendations
* Integration with CMS and CRM systems
* Real-time compliance monitoring

---

## Team

Developed for the **Economic Times Hackathon**.

---

## License

This project is for **hackathon demonstration purposes**.
