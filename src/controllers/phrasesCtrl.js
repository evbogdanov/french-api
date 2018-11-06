import Phrases from '../models/phrases';

const phrases = new Phrases();

export const create = async (req, res) => {
  const data = await phrases.create(req.body);
  res.status(200).json({data});
};

export const search = async (req, res) => {
  const data = await phrases.search(req.query);
  res.status(200).json({data});
};

export const getSuggestions = async (req, res) => {
  const data = await phrases.getSuggestions(req.query);
  res.status(200).json({data});
};

export const getById = async (req, res) => {
  const id = req.params.id;
  const data = await phrases.getById(id);
  res.status(200).json({data});
};

export const upd = async (req, res) => {
  const id = req.params.id;
  const props = req.body;
  await phrases.upd(id, props);
  res.status(204).json({data: null});
};

export const del = async (req, res) => {
  const id = req.params.id;
  await phrases.del(id);
  res.status(204).json({data: null});
};

export const addWord = async (req, res) => {
  await phrases.addWord(
    req.params.id,
    req.params.wid
  );
  res.status(204).json({data: null});
};

export const removeWord = async (req, res) => {
  await phrases.removeWord(
    req.params.id,
    req.params.wid
  );
  res.status(204).json({data: null});
};
