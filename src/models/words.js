import db from '../db';


////////////////////////////////////////////////////////////////////////////////
/// Constants
////////////////////////////////////////////////////////////////////////////////

const PROP_NAMES = [
  // 'id' and 'date' are handled by Postgres
  'text',
  'image',
  'notes',
  'gender',
];

const PROP_NAMES_STRING = PROP_NAMES.join(', ');


////////////////////////////////////////////////////////////////////////////////
/// Methods
////////////////////////////////////////////////////////////////////////////////

export const create = async (props) => {
  const values = [];
  for (const propName of PROP_NAMES) {
    const value = props[propName] || '';
    values.push(value);
  }

  await db.none(
    `INSERT INTO words (${PROP_NAMES_STRING})
     VALUES ($1, $2, $3, $4)`,
    values
  );
};

export const search = async (query) => {
  const text = query.text || '';
  const offset = query.offset || 0;
  const limit = 20;

  return await db.any(
    `SELECT * FROM words
     WHERE unaccent(text) ILIKE (unaccent('$1#') || '%')
     ORDER BY id DESC
     OFFSET $2
     LIMIT $3`,
    [
      text,
      offset,
      limit,
    ]
  );
};

export const getById = async (id) => {
  return await db.one('SELECT * FROM words WHERE id = $1', [id]);
};

export const upd = async (id, props) => {
  const word = await getById(id);
  const values = [];

  for (const propName of PROP_NAMES) {
    let value = word[propName];
    if (typeof props[propName] !== 'undefined') {
      value = props[propName];
    }
    values.push(value);
  }

  await db.none(
    `UPDATE words SET (${PROP_NAMES_STRING}) = ($1, $2, $3, $4)
     WHERE id = $5`,
    [...values, id]
  );
};

export const del = async (id) => {
  await db.none('DELETE FROM words WHERE id = $1', [id]);
};
