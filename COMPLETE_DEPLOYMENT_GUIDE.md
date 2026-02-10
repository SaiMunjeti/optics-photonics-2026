# Complete Deployment Guide - OPTICPHOTONSUMMIT2026

## Overview
This guide will help you deploy both the frontend and backend of your conference website.

---

## Part 1: Backend Deployment (Render)

### Step 1: Prepare Backend for Deployment

1. **Ensure your backend code is ready**
   - Location: `backend/` folder
   - Entry point: `backend/src/index.js`
   - Dependencies in: `backend/package.json`

2. **Check Environment Variables**
   Your backend needs these variables (already in `backend/.env`):
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

### Step 2: Deploy Backend to Render

1. **Go to Render**: https://render.com
2. **Sign up/Login** with your GitHub account
3. **Click "New +"** → Select **"Web Service"**
4. **Connect your GitHub repository**: `optics-photonics-2026`
5. **Configure the service**:
   - **Name**: `optics-backend` (or any name you prefer)
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node src/index.js`
   - **Instance Type**: Free

6. **Add Environment Variables** (in Render dashboard):
   - Click "Environment" tab
   - Add these variables:
     ```
     MONGODB_URI = your_mongodb_atlas_connection_string
     PORT = 5000
     ```

7. **Click "Create Web Service"**
8. **Wait for deployment** (5-10 minutes)
9. **Copy your backend URL**: It will be something like:
   ```
   https://optics-backend-xxxx.onrender.com
   ```

### Step 3: Setup MongoDB Atlas (if not done)

1. **Go to**: https://www.mongodb.com/cloud/atlas
2. **Sign up/Login**
3. **Create a FREE cluster**
4. **Create Database User**:
   - Username: `admin`
   - Password: (create a strong password)
5. **Whitelist IP Address**:
   - Click "Network Access"
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
6. **Get Connection String**:
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password
   - Example: `mongodb+srv://admin:yourpassword@cluster0.xxxxx.mongodb.net/optics-conference?retryWrites=true&w=majority`

---

## Part 2: Frontend Deployment (Netlify)

### Step 1: Update Frontend Environment Variables

1. **Open**: `frontend/.env.production`
2. **Update with your Render backend URL**:
   ```
   REACT_APP_API_URL=https://optics-backend-xxxx.onrender.com
   ```
   (Replace with your actual Render URL from Part 1, Step 2, #9)

### Step 2: Build Frontend Locally (Optional Test)

```bash
cd frontend
npm run build
```

This creates a `build` folder with optimized production files.

### Step 3: Deploy Frontend to Netlify

#### Option A: Deploy via Netlify Dashboard (Easiest)

1. **Go to**: https://www.netlify.com
2. **Sign up/Login** with GitHub
3. **Click**: "Add new site" → "Import an existing project"
4. **Connect to GitHub**: Select your `optics-photonics-2026` repository
5. **Configure build settings**:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/build`
   - **Branch to deploy**: `main`

6. **Add Environment Variables**:
   - Click "Site settings" → "Environment variables"
   - Add:
     ```
     REACT_APP_API_URL = https://optics-backend-xxxx.onrender.com
     ```
   (Use your actual Render backend URL)

7. **Click "Deploy site"**
8. **Wait for deployment** (3-5 minutes)
9. **Your site will be live** at: `https://random-name-12345.netlify.app`

10. **Optional - Custom Domain**:
    - Click "Domain settings"
    - Click "Add custom domain"
    - Follow instructions to connect your domain

#### Option B: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Navigate to frontend
cd frontend

# Build the project
npm run build

# Deploy
netlify deploy --prod

# Follow the prompts:
# - Create & configure a new site
# - Publish directory: build
```

---

## Part 3: Testing Your Deployment

### Test Backend
1. Open your browser
2. Go to: `https://your-backend-url.onrender.com/api/test`
3. You should see a response (or 404 if no test route exists)

### Test Frontend
1. Open your browser
2. Go to your Netlify URL: `https://your-site.netlify.app`
3. Test the website:
   - ✅ All pages load correctly
   - ✅ Navigation works
   - ✅ Images display
   - ✅ Forms work (Registration & Contact)

### Test Forms (Most Important!)
1. **Go to Registration page**
2. **Fill out the form**
3. **Submit**
4. **Check if you get a confirmation code** ← This confirms backend is connected!

---

## Part 4: Commit and Push Changes

Before deploying, make sure all your latest changes are on GitHub:

```bash
# Navigate to project root
cd C:\Users\SAI\optics-photonics-2026

# Check status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Final updates before deployment"

# Push to GitHub
git push origin main
```

---

## Part 5: Troubleshooting

### Backend Issues

**Problem**: Backend not starting on Render
- **Solution**: Check Render logs for errors
- Verify `Start Command` is: `node src/index.js`
- Check environment variables are set correctly

**Problem**: Database connection fails
- **Solution**: 
  - Verify MongoDB Atlas connection string
  - Check MongoDB Atlas IP whitelist (should be 0.0.0.0/0)
  - Ensure database user has correct permissions

### Frontend Issues

**Problem**: Frontend loads but forms don't work
- **Solution**: 
  - Check `REACT_APP_API_URL` in Netlify environment variables
  - Verify backend URL is correct (no trailing slash)
  - Check browser console for CORS errors

**Problem**: Images not loading
- **Solution**: 
  - Ensure images are in `frontend/public/images/` folder
  - Check image paths in code
  - Verify images are committed to GitHub

**Problem**: "Failed to fetch" error on forms
- **Solution**:
  - Backend might be sleeping (Render free tier sleeps after 15 min)
  - Wait 30 seconds and try again
  - Check if backend URL is correct

---

## Part 6: Post-Deployment Checklist

- [ ] Backend is deployed and running on Render
- [ ] MongoDB Atlas is configured and connected
- [ ] Frontend is deployed on Netlify
- [ ] Environment variables are set correctly
- [ ] All pages load without errors
- [ ] Registration form works and returns confirmation code
- [ ] Contact form works and shows success message
- [ ] All images display correctly
- [ ] Navigation works smoothly
- [ ] Mobile responsive design works
- [ ] Custom domain configured (optional)

---

## Your Deployment URLs

**Backend (Render)**: `https://your-backend.onrender.com`
**Frontend (Netlify)**: `https://your-site.netlify.app`
**GitHub Repository**: `https://github.com/SaiMunjeti/optics-photonics-2026`

---

## Important Notes

1. **Render Free Tier**: Backend sleeps after 15 minutes of inactivity. First request after sleep takes 30-60 seconds.

2. **Netlify Free Tier**: 
   - 100GB bandwidth/month
   - 300 build minutes/month
   - Automatic HTTPS

3. **MongoDB Atlas Free Tier**:
   - 512MB storage
   - Shared cluster
   - Perfect for this project

4. **Environment Variables**: Never commit `.env` files to GitHub! They're already in `.gitignore`.

---

## Need Help?

If you encounter issues:
1. Check Render logs (Backend)
2. Check Netlify deploy logs (Frontend)
3. Check browser console for errors
4. Verify all environment variables are set correctly

---

## Next Steps After Deployment

1. **Test thoroughly** on different devices
2. **Share the URL** with your team
3. **Monitor** form submissions in MongoDB
4. **Set up email notifications** (optional - requires email service)
5. **Add Google Analytics** (optional)
6. **Configure custom domain** (optional)

---

**Good luck with your deployment! 🚀**
