# TS-Bot Frontend

### Repo Structure
```plaintext
.
├── public/
├── src/
│   ├── assets/
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── requirements.txt
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

### Local Development Setup
This frontend project uses Vite, React, and Typescript. To run and develop locally, follow the steps below:
1. Pull the entire repo from GitLab using: `git clone https://gitlab.com/ycpe/ts-bot-frontend.git`
2. Run the following command to work in development mode:
```bash
npm run dev
```
3. Build the Vite project into static files using the following command:
```bash
npm run build
```