// Will be successful only when the secret header is ok
export const ping = (req, res) => {
  res.status(204).json({data: null});
};
