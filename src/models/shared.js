import db from '../db';

class SharedModel {
  constructor(table, columns) {
    this.table = table;
    this.tableShortcut = table[0];
    this.tableWithShortcut = `${this.table} ${this.tableShortcut}`;

    this.columns = columns;

    // Objects per page
    this.limit = 30;

    this.columnsEditableNames = this.columns
      .filter(c => c.editable)
      .map(c => c.name);

    // I use $() as my named placeholder
    this.columnsEditablePlaceholders = this.columnsEditableNames
      .map(n => `$(${n})`)
      .join(', ');

    this.columnsEditableNamesString = this.columnsEditableNames.join(', ');

    this.columnsViewAs = this.columns
      .map(c => c.view || `${this.tableShortcut}.${c.name}`)
      .join(', ');
  }

  async create(props) {
    const values = {};
    for (const name of this.columnsEditableNames) {
      values[name] = props[name] || '';
    }
    return await db.one(
      `INSERT INTO ${this.table} (${this.columnsEditableNamesString})
       VALUES (${this.columnsEditablePlaceholders})
       RETURNING id`,
      values
    );
  }

  async getById(id) {
    return await db.one(
      `SELECT ${this.columnsViewAs}
       FROM ${this.tableWithShortcut}
       WHERE ${this.tableShortcut}.id = $(id)`,
      {id}
    );
  }

  async upd(id, props) {
    const obj = await this.getById(id);
    const values = {id};

    for (const name of this.columnsEditableNames) {
      let value = obj[name];
      if (typeof props[name] !== 'undefined') {
        value = props[name];
      }
      values[name] = value;
    }

    await db.none(
      `UPDATE ${this.table}
       SET (${this.columnsEditableNamesString}) =
           (${this.columnsEditablePlaceholders})
       WHERE id = $(id)`,
      values
    );
  }

  async del(id) {
    await db.none(
      `DELETE FROM ${this.table}
       WHERE id = $(id)`,
      {id}
    );
  }
}

export default SharedModel;
