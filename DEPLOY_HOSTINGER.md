
# 🚀 How to Deploy IPMAX TV to Hostinger (VPS or Shared Hosting)

You are seeing a **403 Forbidden** error because Next.js is a **Server-Side Rendered (SSR)** application, not a static HTML site. You cannot simply upload the files to `public_html`. You must run it as a **Node.js Application**.

---

## Option A: Hostinger Shared Hosting (Business/Cloud Plans)

If you have a "Business Shared Hosting" or "Cloud Hosting" plan with cPanel/hPanel:

### 1. Prepare Your Project locally
1.  **Delete** the `node_modules` folder and `.next` folder on your computer (to keep the zip small).
2.  **Zip** the entire project folder (including `server.js`, `package.json`, `public`, `app`, `components`, `lib`, `prisma`, `.env `etc.).
    *   *Do NOT include node_modules or .git*

### 2. Setup Node.js App in Hostinger
1.  Log in to **hPanel**.
2.  Go to **Websites** -> **Manage**.
3.  Search for **"Node.js"** and click **Setup Node.js App**.
4.  Click **Create Application**:
    *   **Node.js Version**: Select **18** or **20** (Recommended).
    *   **Application Mode**: **Production**.
    *   **Application Root**: `ipshoptv` (or any name).
    *   **Application URL**: `ipmaxtv.shop` (your domain).
    *   **Application Startup File**: `server.js` (THIS IS IMPORTANT).
5.  Click **Create**.

### 3. Upload Files
1.  Click **File Manager** (or use FileZilla).
2.  Navigate to the folder created (e.g., `ipshoptv`). **Clear any default files**.
3.  **Upload your Zip file** and **Extract** it here.
4.  Ensure all files (`server.js`, `package.json`, etc.) are directly in this folder, not in a subfolder.

### 4. Install Dependencies
1.  Go back to the **Node.js App** page in hPanel.
2.  Click the **"NPM Install"** button. This will install all dependencies.
    *   *If this fails, you may need to run `npm install` via SSH.*

### 5. Build the App
1.  You need to build the app on the server.
2.  In the **Node.js App** page, look for **"Run NPM Scripts"**.
3.  Type `build` and click **Run**.
    *   *Alternatively, connect via SSH and run `npm run build` inside the folder.*

### 6. Database Setup
1.  Go to **Databases** -> **Management** in hPanel.
2.  Create a new MySQL Database and User.
3.  Edit the `.env` file in File Manager:
    ```env
    DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/DATABASE_NAME"
    NEXTAUTH_URL="https://ipmaxtv.shop"
    NEXTAUTH_SECRET="your-secret-key"
    ```
4.  Run Prisma Migration (via SSH):
    ```bash
    npx prisma db push
    ```

### 7. Start the App
1.  Go back to **Node.js App** page.
2.  Click **Restart Application**.
3.  Wait 1-2 minutes. Your site should be live!

---

## Option B: Hostinger VPS (Ubuntu/Debian)

If you have a VPS plan, you have full control.

1.  **Connect via SSH**: `ssh root@your_vps_ip`
2.  **Install Node.js & MySQL**:
    ```bash
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs mysql-server nginx
    ```
3.  **Clone/Upload Code**: Upload your project to `/var/www/ipshoptv`.
4.  **Install & Build**:
    ```bash
    cd /var/www/ipshoptv
    npm install
    npm run build
    npx prisma db push
    ```
5.  **Use PM2 to run persistent**:
    ```bash
    npm install -g pm2
    pm2 start npm --name "ipshoptv" -- start
    pm2 save
    ```
6.  **Configure Nginx Proxy**:
    *   Edit `/etc/nginx/sites-available/default` to proxy port 3000 to port 80.
    ```nginx
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    ```
    *   Restart Nginx: `systemctl restart nginx`.

---

## Troubleshooting "403 Forbidden"
*   **Cause**: The server is looking for `index.html` in `public_html`, but the app is running on a port (usually 3000).
*   **Fix**: You must ensure the **Node.js App** is created in hPanel and pointed to `server.js`. The hPanel Node.js integration maps the port automatically using Phusion Passenger or a reverse proxy.
