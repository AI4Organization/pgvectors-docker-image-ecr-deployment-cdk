#!/bin/bash
set -euo pipefail # using the 'set -euo pipefail' in lieu of 'set -e' command to ensure that the script stops on the first error it encounters.

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    \i /docker-entrypoint-initdb.d/init.sql
EOSQL

if [ $? -eq 0 ]
then
  echo "Script ran successfully."
else
  echo "Script encountered an error." >&2
fi