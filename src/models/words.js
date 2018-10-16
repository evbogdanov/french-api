import db from '../db';


////////////////////////////////////////////////////////////////////////////////
/// Columns
////////////////////////////////////////////////////////////////////////////////

const COLUMNS = [
  {name: 'id',     editable: false},
  {name: 'text',   editable: true},
  {name: 'image',  editable: true},
  {name: 'notes',  editable: true},
  {name: 'gender', editable: true},
  {name: 'date',   editable: false, view: 'CURRENT_DATE - date AS days_ago'},
];

const COLUMNS_EDITABLE_NAMES = COLUMNS
      .filter(c => c.editable)
      .map(c => c.name);

// I use $() as my named placeholder
const COLUMNS_EDITABLE_PLACEHOLDERS = COLUMNS_EDITABLE_NAMES
      .map(n => `$(${n})`)
      .join(', ');

const COLUMNS_EDITABLE_NAMES_STRING = COLUMNS_EDITABLE_NAMES.join(', ');

const COLUMNS_VIEW_STRING = COLUMNS
      .map(c => c.view || c.name)
      .join(', ');


////////////////////////////////////////////////////////////////////////////////
/// Methods
////////////////////////////////////////////////////////////////////////////////

export const create = async (props) => {
  const values = {};
  for (const name of COLUMNS_EDITABLE_NAMES) {
    values[name] = props[name] || '';
  }
  await db.none(
    `INSERT INTO words (${COLUMNS_EDITABLE_NAMES_STRING})
     VALUES (${COLUMNS_EDITABLE_PLACEHOLDERS})`,
    values
  );
};

export const search = async (query) => {
  const text = query.text || '';
  const offset = query.offset || 0;
  const limit = 20;

  return await db.any(
    `SELECT ${COLUMNS_VIEW_STRING} FROM words
     WHERE unaccent(text) ILIKE (unaccent('$(text:value)') || '%')
     ORDER BY id DESC
     OFFSET $(offset)
     LIMIT $(limit)`,
    {
      text,
      offset,
      limit,
    }
  );
};

export const getById = async (id) => {
  return await db.one(
    `SELECT ${COLUMNS_VIEW_STRING} FROM words
     WHERE id = $(id)`,
    {id}
  );
};

export const upd = async (id, props) => {
  const word = await getById(id);
  const values = {id};

  for (const name of COLUMNS_EDITABLE_NAMES) {
    let value = word[name];
    if (typeof props[name] !== 'undefined') {
      value = props[name];
    }
    values[name] = value;
  }

  await db.none(
    `UPDATE words
     SET (${COLUMNS_EDITABLE_NAMES_STRING}) = (${COLUMNS_EDITABLE_PLACEHOLDERS})
     WHERE id = $(id)`,
    values
  );
};

export const del = async (id) => {
  await db.none('DELETE FROM words WHERE id = $(id)', {id});
};
