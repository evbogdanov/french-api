import * as words from '../models/words';

export const getAll = async (req, res) => {
  const user  = await words.currentUser();
  const time = await words.currentTime();
  res.json({user, time});
};
