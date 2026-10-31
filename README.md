# Care (CareCompanion) 🏥

[![CI Pipeline](https://github.com/hrishob0108/Care/actions/workflows/ci.yml/badge.svg)](https://github.com/hrishob0108/Care/actions/workflows/ci.yml)
[![CD Pipeline](https://github.com/hrishob0108/Care/actions/workflows/cd.yml/badge.svg)](https://github.com/hrishob0108/Care/actions/workflows/cd.yml)

**CareCompanion** is a full-stack digital care management application designed to support elderly individuals and their families. It enables medication tracking, health monitoring, emergency contacts, and family communication.

---

## 🏗️ Architecture

- **Frontend**: React 19, Vite, Tailwind CSS v4, React Router 7, Framer Motion
- **Backend**: Node.js, Express 5, Mongoose (MongoDB ODM), JWT Authentication, Bcrypt
- **Database**: MongoDB
- **DevOps & Containers**: Docker, Docker Compose, Nginx
- **CI/CD**: GitHub Actions (Continuous Integration & Continuous Deployment)

---

## 🚀 Quick Start (Local Development)

### Option 1: Run with Docker Compose (Recommended)

Run the full stack (Frontend, Backend, and MongoDB) with a single command:

```bash
docker compose up --build
```

- Frontend: `http://localhost:80`
- Backend API: `http://localhost:3000`
- MongoDB: `localhost:27017`

### Option 2: Run Services Individually

#### 1. Start MongoDB
Ensure MongoDB is running locally on `mongodb://localhost:27017`.

#### 2. Start Backend
```bash
cd backend
npm install
npm run dev     # Starts nodemon development server
# or
npm start       # Starts standard node server
```

#### 3. Start Frontend
```bash
cd frontend
npm install
npm run dev     # Starts Vite development server at http://localhost:5173
```

---

## 🧪 Testing & Quality Checks

Run backend syntax validation and smoke tests:
```bash
cd backend
npm test
```

Run frontend linting and build validation:
```bash
cd frontend
npm run lint
npm run build
```

---

## 🔄 Automatic CI/CD Pipeline

The project features a fully automated CI/CD pipeline powered by **GitHub Actions**:

### 1. Continuous Integration (`.github/workflows/ci.yml`)
Triggered automatically on every `push` and `pull_request` to `main`:
- **Backend Job**: Sets up Node.js v20, caches npm packages, runs dependency installation with `npm ci`, and executes `npm test`.
- **Frontend Job**: Sets up Node.js v20, validates code quality with `npm run lint`, builds production assets with `npm run build`, and archives artifacts.
- **Docker Verification Job**: Verifies that both backend and frontend Docker containers build cleanly without errors.

### 2. Continuous Deployment (`.github/workflows/cd.yml`)
Triggered automatically on merge or push to `main`:
- **Frontend Deployment**: Deploys the built frontend directly to **GitHub Pages**.
- **Backend Container Registry**: Builds and publishes production Docker images to **GitHub Container Registry (`ghcr.io`)**.
- **Cloud Deployment Webhook**: Automatically triggers cloud hosting platforms (e.g. Render, Railway) if `DEPLOY_WEBHOOK_URL` is configured in repository secrets.

For complete CI/CD configuration details, see [CI/CD Documentation](CI_CD_GUIDE.md).

