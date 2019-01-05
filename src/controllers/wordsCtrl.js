import Words from '../models/words';
import * as status from '../status';

const words = new Words();

export const create = async (req, res) => {
  const data = await words.create(req.body);
  if (data.length === 0) {
    return res
      .status(status.ERROR_OTHER)
      .json({ message: 'Word already exists' });
  }
  res.status(status.OK).json({ data: data[0] });
};

export const search = async (req, res) => {
  const data = await words.search(req.query);
  res.status(status.OK).json({ data });
};

export const getSuggestions = async (req, res) => {
  const data = await words.getSuggestions(req.query);
  res.status(status.OK).json({ data });
};

export const getById = async (req, res) => {
  const id = req.params.id;
  const data = await words.getById(id);
  res.status(status.OK).json({ data });
};

export const upd = async (req, res) => {
  const id = req.params.id;
  const props = req.body;
  await words.upd(id, props);
  res.status(status.OK_NO_DATA).json({ data: null });
};

export const del = async (req, res) => {
  const id = req.params.id;
  await words.del(id);
  res.status(status.OK_NO_DATA).json({ data: null });
};
