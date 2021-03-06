#!/usr/bin/env bash

################################################################################
### Create an environment file
################################################################################

read -p 'Enter secret: ' fr_secret
read -p 'Enter DB user: ' fr_db_user
read -p 'Enter DB password: ' fr_db_password

cat > .env <<ENV
FR_SECRET=$fr_secret
FR_DATABASE_URL=postgres://$fr_db_user:$fr_db_password@127.0.0.1:5432/french
ENV


################################################################################
### Create database and tables
################################################################################

createdb french
psql -d french -a -f src/sql/createExtensionUnaccent.sql
psql -d french -a -f src/sql/createTableWords.sql
psql -d french -a -f src/sql/createTablePhrases.sql
psql -d french -a -f src/sql/createTableRelatedWords.sql


################################################################################
### Install dependencies
################################################################################

npm install
