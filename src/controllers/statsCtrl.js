import * as stats from '../models/stats';
import * as status from '../status';

export const countWordsAndPhrases = async (req, res) => {
  const data = await stats.countWordsAndPhrases();
  res.status(status.OK).json({ data });
};
