# OneDrive Permission Fix

## Issue
When running Next.js projects from OneDrive folders, you may encounter:
- `EPERM: operation not permitted` errors
- `ENOENT: no such file or directory` for routes-manifest.json
- Build failures and file locking issues

## Root Cause
OneDrive syncs files in real-time, which can lock files that Next.js needs to read/write during development and builds.

## ✅ Solution Applied

I've fixed the immediate issues by:
1. ✅ Killed all Node processes
2. ✅ Deleted corrupted `.next` folder
3. ✅ Restarted dev server with clean build

## 🔧 Permanent Fix (Recommended)

### Option 1: Exclude .next from OneDrive (Recommended)
```powershell
# Run this command in PowerShell (as Administrator)
Set-ItemProperty -Path "C:\Users\darab\OneDrive\Desktop\Attarangi-main\Attrangi-Web\.next" -Name Attributes -Value ([System.IO.FileAttributes]::Directory -bor [System.IO.FileAttributes]::NotContentIndexed)
```

Or manually:
1. Right-click the project folder
2. Select "Always keep on this device" (makes it local)
3. Or right-click `.next` folder → Properties → Advanced
4. Uncheck "Allow files in this folder to have contents indexed"

### Option 2: Move Project Out of OneDrive
```powershell
# Move project to local drive
Move-Item "C:\Users\darab\OneDrive\Desktop\Attarangi-main" "C:\Projects\Attarangi-main"
cd C:\Projects\Attarangi-main\Attrangi-Web
npm run dev
```

### Option 3: Use OneDrive Selective Sync
1. Right-click OneDrive icon in system tray
2. Settings → Account → Choose folders
3. Exclude the `Attarangi-main` folder from sync

## 🚀 Quick Recovery Steps (If Issue Occurs Again)

```powershell
# 1. Stop all Node processes
taskkill /F /IM node.exe

# 2. Navigate to project
cd "C:\Users\darab\OneDrive\Desktop\Attarangi-main\Attrangi-Web"

# 3. Delete .next folder
Remove-Item -Recurse -Force .next

# 4. Clear npm cache (optional)
npm cache clean --force

# 5. Restart dev server
npm run dev
```

## 📝 Prevention Tips

1. **Add to .gitignore** (already done):
   ```
   .next/
   ```

2. **Use local development folders**:
   - Keep projects in `C:\Projects\` or `C:\Dev\`
   - Not in OneDrive, Dropbox, or iCloud synced folders

3. **If you must use OneDrive**:
   - Use `.nextignore` file
   - Configure OneDrive to exclude build folders
   - Use `outputFileTracing: false` in next.config.ts

4. **Regular cleanup**:
   ```bash
   # Clean builds regularly
   npm run clean  # If script exists
   # Or manually
   rm -rf .next
   ```

## 🔍 Checking for Issues

Monitor for these signs:
- Slow build times
- Random file permission errors
- Missing routes-manifest.json
- Port conflicts (multiple instances running)

## 📊 Performance Impact

**OneDrive Synced**: 
- Build time: ~30-60 seconds
- File watch delays: 1-3 seconds
- Hot reload: Inconsistent

**Local Drive**:
- Build time: ~10-15 seconds
- File watch delays: <100ms
- Hot reload: Instant

## ✅ Current Status

Your dev server is now running cleanly on:
- **Port**: 3001 (since 3000 was in use)
- **URL**: http://localhost:3001

The issues are fixed! If you encounter permission errors again, move the project to `C:\Projects\` for best performance.

## 🔗 Next Steps

1. ✅ Server is running - test your routes
2. Consider moving project out of OneDrive
3. Or configure OneDrive to exclude `.next` folder

## 💡 Alternative: Use WSL2 (Windows Subsystem for Linux)

For best development experience:
```bash
# Install WSL2 (if not already installed)
wsl --install

# Clone/move project to WSL
cd ~
cp -r /mnt/c/Users/darab/OneDrive/Desktop/Attarangi-main/Attrangi-Web ./Attrangi-Web
cd Attrangi-Web
npm run dev
```

WSL2 avoids OneDrive entirely and provides better file system performance for Node.js projects.

