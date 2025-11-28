# How to Run Git Commands - Step by Step

## ✅ Where to Run the Commands

Run these commands in **PowerShell** or **Command Prompt**, in your project folder.

## 📍 Your Project Location

Your project is located at:
```
C:\Users\rivas\Find your spark
```

## 🚀 Step-by-Step Instructions

### Step 1: Open PowerShell or Command Prompt

**Option A: PowerShell (Recommended)**
1. Press `Win + X`
2. Click "Windows PowerShell" or "Terminal"
3. Or search for "PowerShell" in Start menu

**Option B: Command Prompt**
1. Press `Win + R`
2. Type `cmd` and press Enter
3. Or search for "Command Prompt" in Start menu

### Step 2: Navigate to Your Project Folder

In PowerShell or Command Prompt, type:

```cmd
cd "C:\Users\rivas\Find your spark"
```

Press Enter.

### Step 3: Verify You're in the Right Place

Type:
```cmd
dir
```

You should see files like:
- `package.json`
- `app/`
- `components/`
- `.git/`

If you see these, you're in the right place! ✅

### Step 4: Run the Git Commands

Now run these commands **one at a time**:

```cmd
git remote add origin https://github.com/Spenrivas/hero-journey-app.git
```

Press Enter. Wait for it to finish.

Then:
```cmd
git branch -M main
```

Press Enter.

Then:
```cmd
git push -u origin main
```

Press Enter. This will ask for authentication.

## 📸 Visual Guide

```
┌─────────────────────────────────────┐
│  PowerShell Window                  │
├─────────────────────────────────────┤
│  PS C:\Users\rivas>                 │
│  cd "C:\Users\rivas\Find your spark"│  ← Type this
│  PS C:\Users\rivas\Find your spark> │  ← You're here!
│                                     │
│  git remote add origin ...          │  ← Run commands here
│  git branch -M main                 │
│  git push -u origin main            │
└─────────────────────────────────────┘
```

## ⚠️ Common Mistakes

### ❌ Don't Run in:
- GitHub website (browser)
- Cloudflare dashboard
- VS Code terminal (unless it's PowerShell/CMD)
- File Explorer

### ✅ Do Run in:
- PowerShell
- Command Prompt
- VS Code integrated terminal (if it's PowerShell/CMD)
- Windows Terminal

## 🔍 How to Know You're in the Right Place

Run this command:
```cmd
pwd
```

It should show:
```
C:\Users\rivas\Find your spark
```

Or:
```cmd
dir
```

You should see `package.json` and other project files.

## ✅ Quick Checklist

- [ ] Opened PowerShell or Command Prompt
- [ ] Navigated to project folder: `cd "C:\Users\rivas\Find your spark"`
- [ ] Verified location (saw `package.json` with `dir`)
- [ ] Ready to run git commands!

## 🎯 Summary

1. **Open:** PowerShell or Command Prompt
2. **Navigate:** `cd "C:\Users\rivas\Find your spark"`
3. **Run:** The git commands one by one
4. **Done!** Code will be pushed to GitHub

---

**Remember:** Run commands in PowerShell/Command Prompt, NOT in the browser! 🚀

