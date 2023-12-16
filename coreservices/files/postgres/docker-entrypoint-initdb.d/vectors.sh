#!/bin/bash

set -euo pipefail # using the 'set -euo pipefail' in lieu of 'set -e' command to ensure that the script stops on the first error it encounters.

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE EXTENSION IF NOT EXISTS vectors;
    ALTER EXTENSION vectors UPDATE;
    ALTER DATABASE "${POSTGRES_DB}" SET default_table_access_method = 'vectors';
EOSQL

if [ $? -eq 0 ]
then
  echo "Script ran successfully."
else
  echo "Script encountered an error." >&2
fi