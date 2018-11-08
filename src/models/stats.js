import db from '../db';

export const countWordsAndPhrases = async () => {
  return await db.one(
    `SELECT (SELECT COUNT(*) FROM words) AS words,
            (SELECT COUNT(*) FROM phrases) AS phrases`
  );
};
