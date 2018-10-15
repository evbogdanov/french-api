# french-api
Back end for my French app

## Postgres

Save the DB URL in `.env` file:
```
DATABASE_URL=postgres://user@127.0.0.1:5432/french
```

Create the database, extensions, and tables:

```
$ createdb french
$ psql -d french -a -f src/sql/createExtensionUnaccent.sql
$ psql -d french -a -f src/sql/createTableWords.sql
```

## Development

```
npm start
```
