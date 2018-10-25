import db from '../db';
import SharedModel from './shared';

class Phrases extends SharedModel {
  constructor() {
    const table = 'phrases';
    const columns = [
      {name: 'id',    editable: false},
      {name: 'text',  editable: true},
      {name: 'image', editable: true},
      {name: 'notes', editable: true},
      {name: 'date',  editable: false, view: 'CURRENT_DATE - p.date AS days_ago'},
    ];
    super(table, columns);

    // Need this subquery to collect all related words
    // (not just the matched one by search)
    this.selectRelatedWords = `(
      SELECT array_agg(w.text) FROM words w
      WHERE w.id IN (SELECT word_id FROM related_words WHERE phrase_id = p.id)
    ) AS related_words`;
  }

  async getById(id) {
    return await db.one(
      `SELECT ${this.columnsViewAs}, ${this.selectRelatedWords}
         FROM ${this.tableWithShortcut}
        WHERE p.id = $(id)`,
      {id}
    );
  }

  async search(query) {
    const text = query.text || '';
    const offset = query.offset || 0;

    return await db.any(
      `SELECT
         ${this.columnsViewAs}, ${this.selectRelatedWords}
       FROM
         ${this.tableWithShortcut}
       LEFT JOIN
         related_words rw ON rw.phrase_id = p.id
       LEFT JOIN
         words w ON rw.word_id = w.id
       WHERE
         (' ' || unaccent(p.text)) ILIKE ('% ' || unaccent('$(text:value)') || '%')
         OR
         unaccent(w.text) ILIKE (unaccent('$(text:value)') || '%')
       GROUP BY p.id
       ORDER BY p.id DESC
       OFFSET $(offset)
       LIMIT ${this.limit}`,
      {text, offset}
    );
  }

  async addWord(phrase_id, word_id) {
    await db.none(
      `INSERT INTO related_words VALUES ($(phrase_id), $(word_id))`,
      {phrase_id, word_id}
    );
  }

  async removeWord(phrase_id, word_id) {
    await db.none(
      `DELETE FROM related_words
        WHERE phrase_id=$(phrase_id) AND word_id=$(word_id)`,
      {phrase_id, word_id}
    );
  }
}

export default Phrases;
