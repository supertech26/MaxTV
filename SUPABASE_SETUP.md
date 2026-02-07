# Supabase Setup Guide

Follow these steps to create your database and storage for the project.

## 1. Create a Supabase Project
1.  Go to [supabase.com](https://supabase.com/) and click **"Start your project"**.
2.  Sign in with GitHub.
3.  Click **"New Project"**.
4.  **Name**: `ipshoptv` (or anything you like).
5.  **Database Password**: **IMPORTANT!** Click "Generate a password" and **COPY IT** to a safe place (e.g., Notepad). You will need this later.
6.  **Region**: Choose a region close to your users (e.g., Frankfurt or London).
7.  Click **"Create new project"**.

## 2. Get Connection Strings
Once the project is created (it takes ~2 minutes):
1.  Go to **Project Settings** (gear icon ⚙️ at the bottom left).
2.  Click **"API"** in the sidebar.
3.  Copy the **Project URL** and **anon public** key. You will need these for Vercel.

## 3. Get Database URL (for Prisma)
1.  In **Project Settings**, go to **"Database"**.
2.  Scroll down to **"Connection string"**.
3.  Click **"URI"** (not Transaction Pooler for now).
4.  Copy the string. It looks like: `postgresql://postgres:[YOUR-PASSWORD]@db.Ref...supabase.co:5432/postgres`
5.  **Replace `[YOUR-PASSWORD]`** with the password you saved in Step 1.

## 4. Setup Storage (For Payment Proofs)
1.  Click the **Storage** icon (bucket) in the left sidebar.
2.  Click **"New Bucket"**.
3.  **Name**: `payment-proofs`.
4.  **Public bucket**: **CHECK this box** (so we can view the proofs).
5.  Click **"Save"**.
6.  **Policy**:
    *   Click on the `payment-proofs` bucket.
    *   Click **"Configuration"** tab -> **"Policies"**.
    *   Click **"New Policy"** -> **"For full customization"**.
    *   **Name**: `Allow Public Uploads`.
    *   **Allowed operations**: Check `INSERT` and `SELECT`.
    *   **Target roles**: Check `anon` and `authenticated`.
    *   Click **"Review"** -> **"Save"**.

## 5. Deployment to Vercel
When you import your project to Vercel, it will ask for Environment Variables. Add these:

*   **`DATABASE_URL`**: The URI from Step 3 (with your password).
*   **`NEXT_PUBLIC_SUPABASE_URL`**: The Project URL from Step 2.
*   **`SUPABASE_SERVICE_ROLE_KEY`**: Go to Supabase -> Settings -> API -> `service_role` (secret) key. **Copy this.**

**That's it!** Your backend is ready.
