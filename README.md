# [Frontend] YouTube-Mentions Bot for Truth Social

### Repo Structure
> ⚠️ There are some hidden files that are required but will not automatically appear in this repository on GitHub when you perform a `git clone`. To properly configure the app file architecture, perform an `npm install` and follow the instructions in the [Local Development Setup](#local-development-setup) section.

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
├── README.md (you are here)
├── requirements.txt
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

### Local Development Setup
This project uses a combination of Vite + React and Typescript. To develop and run the frontend locally, perform the following steps:
1. Clone the repo from GitHub: `git clone https://github.com/hellokelci/ts-bot-frontend`
2. Run this bash command in the terminal to start a Vite server in development mode: `npm run dev`
3. To build the project for production, produce the static files using this bash command: `npm run build`