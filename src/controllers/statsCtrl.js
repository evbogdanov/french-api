import * as stats from '../models/stats';

export const countWordsAndPhrases = async (req, res) => {
  const data = await stats.countWordsAndPhrases();
  res.status(200).json({data});
};
