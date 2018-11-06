import Words from '../models/words';

const words = new Words();

////////////////////////////////////////////////////////////////////////////////
// Use HTTP Status Codes:
// 200 -> request was successful and there's some data to return
// 204 -> request was successful but has no data to return
////////////////////////////////////////////////////////////////////////////////

export const create = async (req, res) => {
  const data = await words.create(req.body);
  res.status(200).json({data});
};

export const search = async (req, res) => {
  const data = await words.search(req.query);
  res.status(200).json({data});
};

export const getById = async (req, res) => {
  const id = req.params.id;
  const data = await words.getById(id);
  res.status(200).json({data});
};

export const upd = async (req, res) => {
  const id = req.params.id;
  const props = req.body;
  await words.upd(id, props);
  res.status(204).json({data: null});
};

export const del = async (req, res) => {
  const id = req.params.id;
  await words.del(id);
  res.status(204).json({data: null});
};
