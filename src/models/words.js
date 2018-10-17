import db from '../db';
import SharedModel from './shared';

class Words extends SharedModel {
  constructor() {
    const table = 'words';
    const columns = [
      {name: 'id',     editable: false},
      {name: 'text',   editable: true},
      {name: 'image',  editable: true},
      {name: 'notes',  editable: true},
      {name: 'gender', editable: true},
      {name: 'date',   editable: false, view: 'CURRENT_DATE - date AS days_ago'},
    ];
    super(table, columns);
  }

  async search(query) {
    const text = query.text || '';
    const offset = query.offset || 0;

    return await db.any(
      `SELECT ${this.columnsViewAs} FROM ${this.table}
       WHERE unaccent(text) ILIKE (unaccent('$(text:value)') || '%')
       ORDER BY id DESC
       OFFSET $(offset)
       LIMIT ${this.limit}`,
      {text, offset}
    );
  }
}

export default Words;
