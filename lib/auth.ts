import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import getDb from './db';
const db = getDb();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export interface User {
  id: number;
  email: string;
  name: string;
  age?: number;
}

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}

export function verifyPassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}

export function generateToken(userId: number): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '30d' });
}

export function verifyToken(token: string): { userId: number } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: number };
  } catch {
    return null;
  }
}

export function createUser(email: string, password: string, name: string, age?: number) {
  const hashedPassword = hashPassword(password);
  const stmt = db.prepare('INSERT INTO users (email, password, name, age) VALUES (?, ?, ?, ?)');
  const result = stmt.run(email, hashedPassword, name, age || null);
  return result.lastInsertRowid as number;
}

export function getUserByEmail(email: string): User | null {
  const stmt = db.prepare('SELECT id, email, name, age FROM users WHERE email = ?');
  const user = stmt.get(email) as any;
  return user || null;
}

export function getUserById(id: number): User | null {
  const stmt = db.prepare('SELECT id, email, name, age FROM users WHERE id = ?');
  const user = stmt.get(id) as any;
  return user || null;
}

export function getUserWithPassword(email: string): { id: number; email: string; password: string; name: string } | null {
  const stmt = db.prepare('SELECT id, email, password, name FROM users WHERE email = ?');
  const user = stmt.get(email) as any;
  return user || null;
}

