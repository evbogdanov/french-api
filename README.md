# french-api
Back end for my French app

## Environment
Put secrets in `.env` file:
```
FR_SECRET=my-secret
FR_DATABASE_URL=postgres://user@127.0.0.1:5432/french
```

## Postgres
```
createdb french
psql -d french -a -f src/sql/createExtensionUnaccent.sql
psql -d french -a -f src/sql/createTableWords.sql
psql -d french -a -f src/sql/createTablePhrases.sql
psql -d french -a -f src/sql/createTableRelatedWords.sql
```

## Development
```
npm start
```
