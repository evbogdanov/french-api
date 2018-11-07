CREATE TABLE related_words (
  phrase_id INTEGER NOT NULL,
  word_id   INTEGER NOT NULL,

  PRIMARY KEY (phrase_id, word_id),
  FOREIGN KEY (phrase_id) REFERENCES phrases(id) ON DELETE CASCADE,
  FOREIGN KEY (word_id)   REFERENCES words(id)   ON DELETE CASCADE
);
