import getDb from './db';
const db = getDb();

export interface Progress {
  stage: number;
  questionNumber: number;
  answer: string | null;
  audioUrl: string | null;
  videoUrl: string | null;
}

export function saveAnswer(userId: number, stage: number, questionNumber: number, answer: string | null, audioUrl?: string | null, videoUrl?: string | null) {
  const stmt = db.prepare(`
    INSERT INTO user_progress (user_id, stage, question_number, answer, audio_url, video_url)
    VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(user_id, stage, question_number) 
    DO UPDATE SET answer = ?, audio_url = ?, video_url = ?, updated_at = CURRENT_TIMESTAMP
  `);
  stmt.run(userId, stage, questionNumber, answer, audioUrl || null, videoUrl || null, answer, audioUrl || null, videoUrl || null);
}

export function getProgress(userId: number): Progress[] {
  const stmt = db.prepare('SELECT stage, question_number as questionNumber, answer, audio_url as audioUrl, video_url as videoUrl FROM user_progress WHERE user_id = ?');
  return stmt.all(userId) as Progress[];
}

export function getStageProgress(userId: number, stage: number): Progress[] {
  const stmt = db.prepare('SELECT stage, question_number as questionNumber, answer, audio_url as audioUrl, video_url as videoUrl FROM user_progress WHERE user_id = ? AND stage = ?');
  return stmt.all(userId, stage) as Progress[];
}

export function clearAnswer(userId: number, stage: number, questionNumber: number) {
  const stmt = db.prepare('DELETE FROM user_progress WHERE user_id = ? AND stage = ? AND question_number = ?');
  stmt.run(userId, stage, questionNumber);
}

export function getCompletedStages(userId: number): number[] {
  const stmt = db.prepare(`
    SELECT DISTINCT stage 
    FROM user_progress 
    WHERE user_id = ? 
    AND answer IS NOT NULL 
    AND answer != ''
    GROUP BY stage
    HAVING COUNT(*) = 3
  `);
  const results = stmt.all(userId) as { stage: number }[];
  return results.map(r => r.stage);
}







