# Installation Instructions - Fixing PowerShell Execution Policy

Windows is blocking the PowerShell script due to security policies. Here are **3 easy solutions**:

## Solution 1: Use the CMD Script (Easiest) ✅

I've created a `.cmd` file that doesn't require execution policy changes:

1. **Double-click** `install-deps.cmd` in Windows Explorer
   
   OR
   
2. **Run in Command Prompt:**
   ```cmd
   install-deps.cmd
   ```

This will install all dependencies without any PowerShell restrictions!

---

## Solution 2: Fix PowerShell Execution Policy (One-time setup)

Run this command in PowerShell **as Administrator**:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then you can run:
```powershell
.\install-deps.ps1
```

**Note:** You only need to do this once. After that, PowerShell scripts will work.

---

## Solution 3: Run npm install Directly

If scripts still don't work, run npm directly:

1. **Open Command Prompt** (not PowerShell)
2. Navigate to your project:
   ```cmd
   cd "C:\Users\rivas\Find your spark"
   ```
3. Run:
   ```cmd
   npm install
   ```

If that fails, try:
```cmd
npm install --legacy-peer-deps
```

---

## Recommended: Use Solution 1

The easiest way is to use the new `install-deps.cmd` file. Just double-click it or run it from Command Prompt - no execution policy issues!

---

## After Installation

Once dependencies are installed, start the server:

**Option A: Use CMD**
```cmd
npm run dev
```

**Option B: Use PowerShell (if execution policy is fixed)**
```powershell
.\start-server.ps1
```

**Option C: Direct command**
```cmd
npm run dev
```

Then open: **http://localhost:3004**

---

## Troubleshooting

### "npm is not recognized"
- Make sure Node.js is installed
- Restart your terminal after installing Node.js
- Check: `node --version` and `npm --version`

### "Permission denied" errors
- Close any programs that might be using the folder
- Run Command Prompt as Administrator
- Try deleting `node_modules` folder and reinstalling

### Still having issues?
- Check that you're in the correct directory
- Verify Node.js is installed: `node --version`
- Try running `npm install` directly without any script


