import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

// Dynamic import for better-sqlite3 to avoid build issues
let Database: any = null;
let db: any = null;

async function loadDatabase() {
  if (!Database) {
    try {
      Database = (await import('better-sqlite3')).default;
    } catch (error) {
      console.error('better-sqlite3 not available:', error);
      throw new Error('Database module not available. This may be a build-time issue.');
    }
  }
  return Database;
}

function getDatabase() {
  if (db) {
    return db;
  }

  // For Cloudflare build, return a mock database
  if (typeof window !== 'undefined' || process.env.NEXT_PHASE === 'phase-production-build') {
    throw new Error('Database not available in browser or during build');
  }

  const dbPath = join(process.cwd(), 'data', 'hero-journey.db');
  const dataDir = join(process.cwd(), 'data');

  // Ensure data directory exists
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }

  // Load database module
  if (!Database) {
    try {
      Database = require('better-sqlite3');
    } catch (error) {
      console.error('Failed to load better-sqlite3:', error);
      throw new Error('Database module not available');
    }
  }

  db = new Database(dbPath);

  // Initialize database tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      age INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS user_progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      stage INTEGER NOT NULL,
      question_number INTEGER NOT NULL,
      answer TEXT,
      audio_url TEXT,
      video_url TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      UNIQUE(user_id, stage, question_number)
    );

    CREATE TABLE IF NOT EXISTS community_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      stage INTEGER,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS community_support (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      post_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (post_id) REFERENCES community_posts(id),
      FOREIGN KEY (user_id) REFERENCES users(id),
      UNIQUE(post_id, user_id)
    );
  `);

  return db;
}

// Export the function, not the result
export default getDatabase;






