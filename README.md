# Find Your Spark - Hero's Journey App

A transformative web application designed to help individuals aged 14-18 navigate through the 12 stages of the Hero's Journey framework. Users reflect on guided questions, track their progress, connect with a community, and visualize their journey in 3D.

## Features

- **12 Stages of the Hero's Journey**: Complete guided reflection through all stages
- **Progress Tracking**: Save answers, track completion, and visualize progress
- **Voice & Video Recording**: Record audio or video responses to questions
- **3D Journey Visualization**: Interactive 3D representation of your progress
- **Community Support**: Share experiences and support others on their journey
- **User Authentication**: Secure signup/login system with progress persistence
- **Epic Completion**: Celebratory completion page for finishing the journey

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Styling
- **SQLite (better-sqlite3)** - Database for user data and progress
- **React Three Fiber** - 3D journey visualization
- **Framer Motion** - Animations
- **React Hot Toast** - Notifications

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Git

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd "Find your spark"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create the data directory** (if it doesn't exist)
   ```bash
   mkdir -p data
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3004](http://localhost:3004)

### Testing Locally

The app runs on **port 3004** by default. You can test all features:

- **Sign Up/Login**: Create an account or login
- **Dashboard**: View progress and navigate to stages
- **Stages**: Complete questions for each of the 12 stages
- **3D Journey**: Visualize your progress in 3D
- **Community**: Share posts and support others
- **Completion**: See the epic congratulations when all stages are done

## Project Structure

```
├── app/
│   ├── api/              # API routes (auth, progress, community)
│   ├── dashboard/        # Main dashboard page
│   ├── stage/            # Individual stage pages
│   ├── journey-3d/       # 3D visualization
│   ├── community/        # Community support page
│   ├── completion/       # Completion celebration page
│   ├── login/            # Login page
│   ├── signup/           # Signup page
│   └── page.tsx          # Landing page
├── components/           # Reusable components
├── lib/                  # Database and auth utilities
├── data/                 # Stage data and questions
└── data/                 # SQLite database (created automatically)
```

## Database Schema

The app uses SQLite with the following tables:

- **users**: User accounts (email, password, name, age)
- **user_progress**: Answers and recordings for each question
- **community_posts**: Community posts and sharing
- **community_support**: Support/likes on community posts

## Deployment to Cloudflare

To share the site for testing via Cloudflare:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Cloudflare Pages**
   - Connect your repository to Cloudflare Pages
   - Set build command: `npm run build`
   - Set output directory: `.next`
   - Set Node.js version: 18 or higher

3. **Environment Variables** (if needed)
   - Add `JWT_SECRET` in Cloudflare Pages settings

4. **Database Considerations**
   - For production, consider migrating to a cloud database
   - SQLite works for testing but may need migration for production scale

## Features in Detail

### Hero's Journey Stages

Each stage includes:
- Stage description
- 3 reflection questions
- Save/clear functionality
- Audio/video recording options

### Progress Tracking

- Visual progress bar
- Stage completion indicators
- Current stage highlighting
- Completion percentage

### 3D Visualization

- Interactive 3D journey path
- Color-coded stage markers:
  - Green: Completed
  - Purple: Current
  - Gray: Upcoming
- Rotate, zoom, and pan controls

### Community Features

- Share posts about your journey
- Support others with likes
- Filter by stage
- Anonymous-friendly (shows usernames only)

## Development Notes

- The database is created automatically on first run
- User passwords are hashed using bcrypt
- JWT tokens are used for authentication
- All API routes require authentication except signup/login
- Audio/video recordings are stored as blob URLs (consider cloud storage for production)

## Testing Checklist

- [ ] Sign up with new account
- [ ] Login with existing account
- [ ] Navigate to stage pages
- [ ] Answer questions and save
- [ ] Record audio responses
- [ ] Record video responses
- [ ] Clear answers
- [ ] View progress on dashboard
- [ ] Explore 3D journey visualization
- [ ] Post in community
- [ ] Support community posts
- [ ] Complete all 12 stages
- [ ] View completion page

## Future Enhancements

- Cloud storage for audio/video recordings
- Email notifications
- Mobile app version
- Advanced analytics
- Mentor matching system
- Export journey summary

## License

This project is created for educational and personal development purposes.

## Support

For issues or questions, please check the codebase or reach out to the development team.

---

**Remember**: You are not alone. This journey fuels connection and bonds you with others who are struggling toward a meaningful goal. ✨







