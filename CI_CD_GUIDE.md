# CI/CD Pipeline Documentation

This document describes the automated Continuous Integration and Continuous Deployment (CI/CD) pipelines configured for the **Care** project.

---

## 📌 Overview

The CI/CD system is implemented using **GitHub Actions** and divided into two core workflows:

```
[ Git Push / PR ]
       │
       ├───► CI Pipeline (.github/workflows/ci.yml)
       │         ├── 1. Backend: Dependency Cache, Syntax & Smoke Tests
       │         ├── 2. Frontend: Dependency Cache, ESLint & Production Build
       │         └── 3. Docker: Multi-stage Container Build Validation
       │
       └───► CD Pipeline (.github/workflows/cd.yml) (Runs on push to `main`)
                 ├── 1. Frontend: Deploy to GitHub Pages
                 ├── 2. Backend: Build & Push Docker image to GitHub Container Registry (ghcr.io)
                 └── 3. Cloud Webhook: Optional zero-downtime deploy trigger (Render / Railway / etc.)
```

---

## 1. Continuous Integration (CI)

- **File**: [`.github/workflows/ci.yml`](.github/workflows/ci.yml)
- **Triggers**:
  - `push` to `main`, `master`, `develop`, and `feature/**` branches
  - `pull_request` targeting `main` or `master`
  - Manual execution via `workflow_dispatch`

### What it does:
1. **Concurrency Control**: Cancels obsolete in-progress workflow runs on the same branch/PR to save build minutes.
2. **Backend Job**:
   - Checks out the repository.
   - Sets up Node.js 20 with npm caching for `backend/package-lock.json`.
   - Runs `npm ci` for fast, deterministic installs.
   - Executes `npm test` (syntax validation across `index.js`, `routes.js`, and model smoke tests).
3. **Frontend Job**:
   - Checks out the repository.
   - Sets up Node.js 20 with npm caching for `frontend/package-lock.json`.
   - Runs `npm ci`.
   - Executes `npm run lint` to enforce formatting and React standards.
   - Executes `npm run build` to verify Vite bundle compilation.
   - Uploads production build artifacts (`dist/`) retained for 7 days.
4. **Docker Validation Job**:
   - Uses Docker Buildx to test-build `backend/Dockerfile` and `frontend/Dockerfile`.
   - Ensures containers build without runtime or dependency surprises.

---

## 2. Continuous Deployment (CD)

- **File**: [`.github/workflows/cd.yml`](.github/workflows/cd.yml)
- **Triggers**:
  - `push` to `main` branch (after merges or direct commits)
  - Manual execution via `workflow_dispatch`

### Deploy Targets:

### A. Frontend (GitHub Pages)
The CD pipeline automatically packages and deploys the Vite frontend build to GitHub Pages.

**To enable GitHub Pages in your repository:**
1. Navigate to your repository on GitHub: `https://github.com/hrishob0108/Care`.
2. Go to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. Once pushed to `main`, your site will be live at:
   `https://hrishob0108.github.io/Care/`

### B. Backend (GitHub Container Registry - GHCR)
The CD pipeline automatically builds and publishes a production-ready container image to GitHub's container registry:
- **Image URL**: `ghcr.io/hrishob0108/care/backend:latest` and `ghcr.io/hrishob0108/care/backend:<commit-sha>`
- Authentication uses the built-in `GITHUB_TOKEN` (no external configuration required).
- You can pull and run this image on any cloud server:
  ```bash
  docker pull ghcr.io/hrishob0108/care/backend:latest
  docker run -p 3000:3000 -e MONGODB_URI="mongodb+srv://..." ghcr.io/hrishob0108/care/backend:latest
  ```

### C. Cloud Webhook Auto-Deploy (Render / Railway / Koyeb)
If you host your backend on cloud providers like Render or Railway:
1. Copy the Deploy Hook URL from your provider's dashboard.
2. Go to your GitHub repository > **Settings** > **Secrets and variables** > **Actions**.
3. Add a New Repository Secret:
   - **Name**: `DEPLOY_WEBHOOK_URL` (or `RENDER_DEPLOY_HOOK`)
   - **Value**: `https://api.render.com/deploy/srv-xxxxxx?key=yyyyyy`
4. When code is pushed to `main`, the CD pipeline will automatically trigger your cloud provider to roll out the new release.

---

## 3. Local Verification

Before pushing code to Git, you can test all pipeline checks locally:

```bash
# Test backend
cd backend
npm test

# Test frontend
cd ../frontend
npm run lint
npm run build
```

