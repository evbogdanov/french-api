import express from 'express';

// What the heck is asyncHandler?
// https://medium.com/@Abazhenov/using-async-await-in-express-b8af872c0016
import asyncHandler from 'express-async-handler';

import * as wordsCtrl from './controllers/wordsCtrl';

const app = express();

// Words API
app.get('/v1/words', asyncHandler(wordsCtrl.getAll));
// ...

app.listen(4000);
