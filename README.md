# DAOS

This project is a monorepo workspace containing a React frontend and a NestJS API backend for the DAOS application.

## Prerequisites

- Node.js (version >= 18.16.1)
- npm (latest version)

## Getting Started

### Clone the repository:

git clone https://github.com/Dignaa/DAOS.git
cd daos

Install dependencies:

npm install

Start the development servers:

npm start

This command will start both the API (http://localhost:3000) and the frontend (http://localhost:8080) concurrently.

Project Configuration
Workspaces

This project uses npm workspaces. The workspace configuration can be found in the root package.json.

Scripts

The following scripts are available in the root package.json:

    npm start: Starts both the API and frontend servers.
    npm run start:dev: Starts the API server in development mode.
    npm run dev: Starts the React frontend development server.
    npm run format: Runs Prettier to format all files.

API (NestJS)
Key scripts in api/package.json:

    start:dev: Starts the API server in watch mode.

Web (React)
Key scripts in web/package.json:

    dev: Starts the React development server.

Authors

    Digna Bringule
    Frej Dahl Linneke
    Matej Rolko
