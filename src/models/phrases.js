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
  }

  async search(query) {
    const text = query.text || '';
    const offset = query.offset || 0;

    return await db.any(
      `SELECT
         ${this.columnsViewAs}, array_agg(w.text) AS related_words
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
}

export default Phrases;
