import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

let Database: any = null;
let db: any = null;

function getDatabase() {
  if (db) {
    return db;
  }

  // Skip database initialization during build (Cloudflare compatibility)
  if (process.env.NEXT_PHASE === 'phase-production-build' || process.env.SKIP_DB === 'true') {
    // Return mock database for build time
    return {
      prepare: () => ({
        run: () => ({ lastInsertRowid: 0 }),
        get: () => null,
        all: () => [],
        exec: () => {},
      }),
      exec: () => {},
    };
  }

  // Load database module dynamically
  if (!Database) {
    try {
      Database = require('better-sqlite3');
    } catch (error) {
      // If better-sqlite3 is not available (e.g., Cloudflare), use mock
      console.warn('better-sqlite3 not available, using mock database');
      return {
        prepare: () => ({
          run: () => ({ lastInsertRowid: 0 }),
          get: () => null,
          all: () => [],
          exec: () => {},
        }),
        exec: () => {},
      };
    }
  }

  const dbPath = join(process.cwd(), 'data', 'hero-journey.db');
  const dataDir = join(process.cwd(), 'data');

  // Ensure data directory exists
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
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






