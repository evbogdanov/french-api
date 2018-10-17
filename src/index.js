import express from 'express';

// What the heck is asyncHandler?
// https://medium.com/@Abazhenov/using-async-await-in-express-b8af872c0016
import asyncHandler from 'express-async-handler';

import * as wordsCtrl from './controllers/wordsCtrl';
import * as phrasesCtrl from './controllers/phrasesCtrl';

const app = express();
app.use(express.json());

// Words API
app.post('/v1/words', asyncHandler(wordsCtrl.create));
app.get('/v1/words/search', asyncHandler(wordsCtrl.search));
app.get('/v1/words/:id', asyncHandler(wordsCtrl.getById));
app.put('/v1/words/:id', asyncHandler(wordsCtrl.upd));
app.delete('/v1/words/:id', asyncHandler(wordsCtrl.del));

// Phrases API
app.post('/v1/phrases', asyncHandler(phrasesCtrl.create));
app.get('/v1/phrases/search', asyncHandler(phrasesCtrl.search));
app.get('/v1/phrases/:id', asyncHandler(phrasesCtrl.getById));
app.put('/v1/phrases/:id', asyncHandler(phrasesCtrl.upd));
app.delete('/v1/phrases/:id', asyncHandler(phrasesCtrl.del));


app.listen(4000);
