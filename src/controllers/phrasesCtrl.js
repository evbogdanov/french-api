import Phrases from '../models/phrases';
import * as status from '../status';

const phrases = new Phrases();

export const create = async (req, res) => {
  const data = await phrases.create(req.body);
  if (data.length === 0) {
    return res
      .status(status.ERROR_OTHER)
      .json({ message: 'Phrase already exists' });
  }
  res.status(status.OK).json({ data: data[0] });
};

export const search = async (req, res) => {
  const data = await phrases.search(req.query);
  res.status(status.OK).json({ data });
};

export const getSuggestions = async (req, res) => {
  const data = await phrases.getSuggestions(req.query);
  res.status(status.OK).json({ data });
};

export const getById = async (req, res) => {
  const id = req.params.id;
  const data = await phrases.getById(id);
  res.status(status.OK).json({ data });
};

export const upd = async (req, res) => {
  const id = req.params.id;
  const props = req.body;
  await phrases.upd(id, props);
  res.status(status.OK_NO_DATA).json({ data: null });
};

export const del = async (req, res) => {
  const id = req.params.id;
  await phrases.del(id);
  res.status(status.OK_NO_DATA).json({ data: null });
};

export const addManyWords = async (req, res) => {
  for (const wid of req.body.wordIds) {
    await phrases.addWord(req.params.id, wid);
  }
  res.status(status.OK_NO_DATA).json({ data: null });
};

export const addWord = async (req, res) => {
  await phrases.addWord(req.params.id, req.params.wid);
  res.status(status.OK_NO_DATA).json({ data: null });
};

export const removeWord = async (req, res) => {
  await phrases.removeWord(req.params.id, req.params.wid);
  res.status(status.OK_NO_DATA).json({ data: null });
};
