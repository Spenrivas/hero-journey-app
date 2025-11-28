# Quick Setup Guide

## First Time Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to [http://localhost:3004](http://localhost:3004)

4. **Create Your First Account**
   - Click "Start Your Journey"
   - Sign up with your email and password
   - Start exploring!

## Testing All Features

### 1. Authentication
- ✅ Sign up with a new account
- ✅ Login with existing credentials
- ✅ Logout functionality

### 2. Hero's Journey Stages
- ✅ Navigate to Stage 1 from dashboard
- ✅ Answer all 3 questions for a stage
- ✅ Save your answers
- ✅ Clear answers and re-enter
- ✅ Navigate between stages

### 3. Progress Tracking
- ✅ View progress on dashboard
- ✅ See completed stages highlighted
- ✅ Check completion percentage

### 4. Voice & Video Recording
- ✅ Click "Record Audio" button
- ✅ Allow microphone access
- ✅ Record and save audio response
- ✅ Click "Record Video" button
- ✅ Allow camera/microphone access
- ✅ Record and save video response

### 5. 3D Journey Visualization
- ✅ Navigate to "3D Journey" from dashboard
- ✅ Rotate the 3D scene (click and drag)
- ✅ Zoom in/out (scroll)
- ✅ See your progress visualized

### 6. Community Features
- ✅ Navigate to "Community" from dashboard
- ✅ Create a new post
- ✅ Select a stage (optional)
- ✅ Share your thoughts
- ✅ Support other posts (click heart icon)

### 7. Completion
- ✅ Complete all 12 stages (answer all 3 questions per stage)
- ✅ View the epic congratulations page
- ✅ Share your achievement

## Database Location

The SQLite database is automatically created at:
```
data/hero-journey.db
```

This file stores:
- User accounts
- All progress and answers
- Community posts
- Support interactions

## Troubleshooting

### Port 3004 Already in Use
If port 3004 is busy, you can change it:
1. Edit `package.json`
2. Change `-p 3004` to `-p 3005` (or any available port)
3. Restart the server

### Database Errors
- Make sure the `data/` directory exists
- Check file permissions
- Delete `data/hero-journey.db` to reset (⚠️ deletes all data)

### Build Errors
- Run `npm install` again
- Delete `node_modules` and `.next` folders
- Run `npm install` and `npm run dev`

### Audio/Video Recording Not Working
- Check browser permissions (allow microphone/camera)
- Use HTTPS or localhost (required for media access)
- Try a different browser (Chrome/Firefox recommended)

## Next Steps

1. **Test Locally**: Complete all features above
2. **Share for Testing**: Deploy to Cloudflare (see CLOUDFLARE_DEPLOY.md)
3. **Gather Feedback**: Share preview URL with test users
4. **Iterate**: Make improvements based on feedback

## Development Tips

- Hot reload is enabled - changes appear automatically
- Check browser console for errors
- Database resets when you delete `data/hero-journey.db`
- All user data is stored locally in SQLite

Happy coding! 🚀







