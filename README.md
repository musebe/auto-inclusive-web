# 🌐 Auto-Inclusive Web

### *Autonomous Accessibility Pipelines for the Modern Web*

**Auto-Inclusive Web** is a professional-grade full-stack platform designed to eradicate **Accessibility Debt** at scale. By leveraging the **Cloudinary AI v5 Engine**, we automate the generation of high-fidelity alternative text, ensuring that every visual asset is born inclusive and compliant with **WCAG 2.1 AA** standards.



## The Mission

Millions of users with vision impairments rely on screen readers that cannot interpret images without proper alternative text. Manual captioning is slow and often overlooked, leading to systemic "accessibility debt". This project eliminates that debt by moving accessibility from a manual chore to an **autonomous engineering standard**.



## 🛠️ Technical Architecture

### 1. Ingestion & AI Analysis

* **Pipeline Gateway**: A high-fidelity ingestion area built with the **Cloudinary Upload Widget** for high-speed asset deployment.
* **v5 Captioning Engine**: Uses state-of-the-art AI to generate descriptive, natural-language captions for complex visual scenes.
* **Object Detection**: Automatically identifies and tags objects within images to enhance searchability and context.

### 2. The Persistence Layer

* **On-Success Scripting**: To maintain security with unsigned uploads, the system utilizes server-side `on_success` scripts.
* **Metadata Commitment**: These scripts capture the AI findings and permanently commit them to the asset's **Contextual Metadata**.
* **Admin API Integration**: The Gallery Engine uses the Cloudinary Admin API to fetch these committed records, ensuring the data is reliable and persistent.

### 3. Developer Experience (DX)

* **Mission-Driven Dashboard**: A clean, professional UI that prioritizes visual prominence and technical validation.
* **Compliance Logic**: Integrated badges and typography designed to highlight descriptive, inclusive metadata.
* **1-Click Utility**: Built-in functionality to copy secure Asset URLs and generated Alt-Text directly to the clipboard for production use.


## 📦 Getting Started

This project is built on **TanStack Start**, demonstrating the fundamentals of building full-stack applications with **TanStack Router**.

### **Installation**

Ensure you have the latest version of Node.js. From your terminal, run:

```sh
# Install dependencies
npm install

# Start the development server
npm run dev

```

The development server will rebuild your assets automatically on file changes.

### **Production Build**

To build the app for production:

```sh
npm run build

```


## 🌍 Deployment

* **Netlify**: This project is configured for "automagical" deployment with **Netlify**, providing a live environment for the accessibility pipeline.
* **Environment Variables**: Ensure `CLOUDINARY_API_SECRET` and your `VITE_` keys are configured in your deployment settings to allow the Admin API to fetch secure metadata.


## 📝 Standards & Documentation

All core components and utility files follow strict **TSDoc** standards to ensure clarity and maintainability.

* **Cloudinary SDK**: Configured for AI-driven asset processing in `src/utils/cloudinary.ts`.
* **Gallery Engine**: Server-side functions for metadata retrieval in `src/utils/gallery-engine.ts`.
* **Responsive Shell**: A mobile-first navigation and root document in `src/routes/__root.tsx`.


> "We don't just host images; we make the web speak." — **Auto-Inclusive Web Pipeline**