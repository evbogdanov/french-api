import express from 'express';
import cors from 'cors';

// What the heck is asyncHandler?
// https://medium.com/@Abazhenov/using-async-await-in-express-b8af872c0016
import asyncHandler from 'express-async-handler';

import secrets from './secrets';

import * as wordsCtrl from './controllers/wordsCtrl';
import * as phrasesCtrl from './controllers/phrasesCtrl';
import * as secretsCtrl from './controllers/secretsCtrl';


////////////////////////////////////////////////////////////////////////////////
/// Express + JSON parser + CORS
////////////////////////////////////////////////////////////////////////////////

const app = express();
app.use(express.json());
app.use(cors());


////////////////////////////////////////////////////////////////////////////////
/// Handle protected routes
////////////////////////////////////////////////////////////////////////////////

const handleProtectedRoutes = (req, res, next) => {
  // GET routes are public
  if (req.method === 'GET') {
    return next();
  }

  // Other routes are protected by FR_SECRET
  if (req.header('FR_SECRET') === secrets.FR_SECRET) {
    return next();
  }

  res.status(401).json({
    message: 'Tell me the secret'
  });
};

app.use(handleProtectedRoutes);


////////////////////////////////////////////////////////////////////////////////
/// Secret API
////////////////////////////////////////////////////////////////////////////////

app.post('/v1/secrets', secretsCtrl.ping);


////////////////////////////////////////////////////////////////////////////////
/// Words API
////////////////////////////////////////////////////////////////////////////////

app.post('/v1/words', asyncHandler(wordsCtrl.create));
app.get('/v1/words/search', asyncHandler(wordsCtrl.search));
app.get('/v1/words/suggestions', asyncHandler(wordsCtrl.getSuggestions));
app.get('/v1/words/:id', asyncHandler(wordsCtrl.getById));
app.put('/v1/words/:id', asyncHandler(wordsCtrl.upd));
app.delete('/v1/words/:id', asyncHandler(wordsCtrl.del));


////////////////////////////////////////////////////////////////////////////////
/// Phrases API
////////////////////////////////////////////////////////////////////////////////

app.post('/v1/phrases', asyncHandler(phrasesCtrl.create));
app.get('/v1/phrases/suggestions', asyncHandler(phrasesCtrl.getSuggestions));
app.get('/v1/phrases/search', asyncHandler(phrasesCtrl.search));
app.get('/v1/phrases/:id', asyncHandler(phrasesCtrl.getById));
app.put('/v1/phrases/:id', asyncHandler(phrasesCtrl.upd));
app.delete('/v1/phrases/:id', asyncHandler(phrasesCtrl.del));
app.post('/v1/phrases/:id/words', asyncHandler(phrasesCtrl.addManyWords));
app.put('/v1/phrases/:id/words/:wid', asyncHandler(phrasesCtrl.addWord));
app.delete('/v1/phrases/:id/words/:wid', asyncHandler(phrasesCtrl.removeWord));


////////////////////////////////////////////////////////////////////////////////
/// Start!
////////////////////////////////////////////////////////////////////////////////

app.listen(4000);
