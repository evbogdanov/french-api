import db from '../db';

export const currentUser = async () => {
  const data = await db.one('SELECT current_user');
  return data.current_user;
};

export const currentTime = async () => {
  const data = await db.one('SELECT current_time');
  return data.current_time;
};
