# GitHub Pages Deployment Guide

This guide explains how to deploy the Amity University Student Portal website using GitHub Pages.

## 🚀 Quick Start - Accessing the Website

Once GitHub Pages is enabled, your website will be available at:

**https://rv6730.github.io/webtech/**

## 📋 Deployment Instructions

### Option 1: Automatic Deployment (Recommended)

The repository now includes a GitHub Actions workflow that automatically deploys the website to GitHub Pages.

#### Steps:

1. **Merge this Pull Request** to the main branch
2. **Enable GitHub Pages** in repository settings:
   - Go to repository **Settings** → **Pages**
   - Under "Build and deployment":
     - **Source**: Select "GitHub Actions"
   - Save the settings

3. **Verify Deployment**:
   - Go to the **Actions** tab in your repository
   - You should see a "Deploy static content to Pages" workflow running
   - Once complete (green checkmark), your site is live!

4. **Access Your Website**:
   - Visit: https://rv6730.github.io/webtech/
   - The website should load with the Amity University Student Portal

### Option 2: Manual Deployment from Branch

If you prefer to deploy from a specific branch:

1. Go to repository **Settings** → **Pages**
2. Under "Build and deployment":
   - **Source**: Select "Deploy from a branch"
   - **Branch**: Select `main` (or your preferred branch)
   - **Folder**: Select `/ (root)`
3. Click **Save**
4. Wait 1-2 minutes for deployment
5. Visit: https://rv6730.github.io/webtech/

## 🔧 Configuration Files

The repository includes the following deployment files:

### `.github/workflows/static.yml`
- GitHub Actions workflow for automatic deployment
- Triggers on push to main branch
- Can also be manually triggered from Actions tab

### `.nojekyll`
- Tells GitHub Pages not to process the site with Jekyll
- Ensures all files and folders are served correctly

### `README.md`
- Project documentation
- Includes deployment instructions and features

## ✅ Verification Steps

After deployment, verify your website:

1. **Homepage**: https://rv6730.github.io/webtech/
   - Should display the Amity University landing page
   - Login and Register buttons should be visible

2. **Navigation**:
   - Test Login page: https://rv6730.github.io/webtech/login.html
   - Test Signup page: https://rv6730.github.io/webtech/signup.html
   - Test Main portal: https://rv6730.github.io/webtech/main.html

3. **Resources**:
   - Images should load correctly
   - CSS styles should be applied
   - Links should work properly

## 🐛 Troubleshooting

### Website shows 404 error
- **Solution**: Wait 1-2 minutes after enabling GitHub Pages
- **Solution**: Check that GitHub Pages is enabled in Settings
- **Solution**: Ensure the branch contains the HTML files

### Styles not loading
- **Solution**: Clear browser cache
- **Solution**: Verify CSS files are in the repository root
- **Solution**: Check browser console for errors

### Images not displaying
- **Solution**: Ensure image files are committed to repository
- **Solution**: Check image paths in HTML files
- **Solution**: Verify images are not blocked by browser

### Workflow not running
- **Solution**: Ensure GitHub Actions is enabled in repository settings
- **Solution**: Merge PR to main branch to trigger workflow
- **Solution**: Manually trigger workflow from Actions tab

## 📱 Testing Locally

Before deployment, test the website locally:

```bash
# Clone the repository
git clone https://github.com/RV6730/webtech.git
cd webtech

# Start a local server (Python)
python -m http.server 8000

# Or using Node.js
npx http-server

# Visit http://localhost:8000 in your browser
```

## 🔐 Security Notes

- This is a static website with client-side authentication
- For production use, implement proper server-side authentication
- Store sensitive data securely, never in client-side code
- Use HTTPS (GitHub Pages provides this automatically)

## 📞 Support

If you encounter issues:
1. Check the Actions tab for workflow errors
2. Review the deployment logs
3. Ensure all required files are in the repository
4. Contact repository administrator for help

---

**Note**: After merging this PR, GitHub Pages will be available. The website URL will be:
**https://rv6730.github.io/webtech/**
