import * as status from '../status';

// Will be successful only when the secret header is ok
export const ping = (req, res) => {
  res.status(status.OK_NO_DATA).json({data: null});
};
