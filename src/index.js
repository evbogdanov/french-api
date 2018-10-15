import express from 'express';

// What the heck is asyncHandler?
// https://medium.com/@Abazhenov/using-async-await-in-express-b8af872c0016
import asyncHandler from 'express-async-handler';

import * as wordsCtrl from './controllers/wordsCtrl';

const app = express();
app.use(express.json());

// Words API
app.post('/v1/words', asyncHandler(wordsCtrl.create));
app.get('/v1/words/search', asyncHandler(wordsCtrl.search));
app.get('/v1/words/:id', asyncHandler(wordsCtrl.getById));
app.put('/v1/words/:id', asyncHandler(wordsCtrl.upd));
app.delete('/v1/words/:id', asyncHandler(wordsCtrl.del));

app.listen(4000);
