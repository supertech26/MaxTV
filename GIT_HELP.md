# Fixing GitHub Permissions 🔒

The error `Permission to supertech26/MAXTV.git denied to majidmaro` means:
1.  **Git expects**: `supertech26` (The owner of the repo).
2.  **Git sees**: `majidmaro` (The account currently signed in).

Even though your local name is "supertech26", your **Login Token** belongs to "majidmaro".

## Solution: Switch Account in GitHub Desktop

1.  Open **GitHub Desktop**.
2.  Go to **File** -> **Options** (on Windows) or **GitHub Desktop** -> **Settings** (on Mac).
3.  Click **Accounts**.
4.  You will likely see "Signed in as **majidmaro**".
5.  Click **Sign Out**.
6.  Click **Sign In** and log in with **`supertech26`**.
7.  Try forcing the push again:
    *   In VS Code terminal: `git push origin main --force`
    *   OR in GitHub Desktop: **Push origin**.

## Alternative: Credential Manager (If not using GitHub Desktop)
1.  Open Windows Start Menu -> Type **"Credential Manager"**.
2.  Click **Windows Credentials**.
3.  Look for `git:https://github.com`.
4.  **Remove** it.
5.  Next time you push, it will ask for a password/token. Sign in as `supertech26`.
