# BÜFA fire retardant

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/bufa-tennebs-projects/v0-bu-e-fa-fire-retardant)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/mTphVtOXxS6)

## Overview

This repository contains a comprehensive website for BÜFA fire retardant products, built with Next.js and configured for static export. The website features product catalogs, filtering capabilities, system solutions, glossary, and contact information.

## Deployment

Your project is live at:

**[https://vercel.com/bufa-tennebs-projects/v0-bu-e-fa-fire-retardant](https://vercel.com/bufa-tennebs-projects/v0-bu-e-fa-fire-retardant)**

## Build your app

Continue building your app on:

**[https://v0.app/chat/projects/mTphVtOXxS6](https://v0.app/chat/projects/mTphVtOXxS6)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## Static Export for IONOS Deploy Now

This project is fully configured for static export and deployment on IONOS Deploy Now:

### Build Commands
- `pnpm dev` - Development server
- `pnpm build` - Build and export static files to `/out` directory

### Configuration
- **next.config.mjs**: Configured with `output: 'export'`, `images: { unoptimized: true }`, and `trailingSlash: true`
- **GitHub Workflow**: Automatically builds and deploys to IONOS using the `/out` directory
- **Static Generation**: All dynamic routes use `generateStaticParams()` for complete static export

### Deployment Process
1. Push changes to the main branch
2. GitHub Actions automatically runs `pnpm build`
3. Static files are generated in the `/out` directory
4. IONOS Deploy Now deploys the static site

The project contains no server-side functionality, API routes, or server actions - it's a pure static website optimized for fast loading and reliable hosting.
