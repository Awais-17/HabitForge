# Deployment Guide for Render and Supabase

This project is a monorepo consisting of a Node.js/Express server and a Vite/React client. The server is configured to serve the built client as static files.

## Prerequisites

1.  **Supabase Account:** You need a PostgreSQL connection string.
    -   Create a project on [Supabase](https://supabase.com/).
    -   Go to **Project Settings** > **Database**.
    -   Copy the **Connection string** (Transaction mode is recommended for serverless/pooled connections, but Session mode works fine for this server).
    -   It should look like: `postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:6543/postgres`

## Deployment Steps on Render

1.  **Create a New Web Service:**
    -   Go to [Render Dashboard](https://dashboard.render.com/).
    -   Click **New +** and select **Web Service**.
    -   Connect your GitHub/GitLab repository.

2.  **Configure the Service:**
    -   **Name:** `habitforge` (or your preferred name)
    -   **Environment:** `Node`
    -   **Build Command:** `npm run install-all && npm run build`
    -   **Start Command:** `npm start`

3.  **Add Environment Variables:**
    -   Click on **Advanced** or go to the **Env Vars** tab.
    -   Add the following variables:
        -   `DATABASE_URL`: Your Supabase PostgreSQL connection string.
        -   `NODE_VERSION`: `18` or higher.
        -   `PORT`: `10000` (Render's default, but the app will use whatever Render assigns).

4.  **Deploy:**
    -   Click **Create Web Service**.
    -   Render will install dependencies, build the client, build the server, and start the app.

## Local Development

1.  Create a `.env` file in the `server` directory.
2.  Add `DATABASE_URL=your_supabase_connection_string`.
3.  Run `npm install-all` from the root.
4.  Run `npm run dev --prefix server` to start the backend.
5.  Run `npm run dev --prefix client` to start the frontend.

## How it Works

-   The root `package.json` coordinates the build for both `client` and `server`.
-   The server (`server/src/index.ts`) serves the static files from `client/dist`.
-   All client API calls use relative paths (e.g., `/api/...`), so they automatically point to the same host in production.
