# Use the specified prebuilt image as the base
FROM tensorchord/pgvecto-rs:pg16-latest

# Define arguments that can be passed at build time
ARG POSTGRES_USER
ARG POSTGRES_DB_NAME
ARG POSTGRES_PASSWORD
ARG POSTGRES_PORT

# Set environment variables from the arguments
ENV POSTGRES_USER=${POSTGRES_USER:-postgres} \
    POSTGRES_DB=${POSTGRES_DB_NAME:-postgres} \
    POSTGRES_PORT=${POSTGRES_PORT:-5432} \
    POSTGRES_PASSWORD=${POSTGRES_PASSWORD:-postgres}

# Copy init.sql script to the container
COPY init.sql /docker-entrypoint-initdb.d/init.sql

# Copy init-db.sh script to the container
COPY init-db.sh /docker-entrypoint-initdb.d/init-db.sh
# Make the init-db.sh script executable
# This is necessary because the script needs execute permission to run inside the container.
# The chmod command changes the file mode to make it executable (x) for the user (owner of the file).
RUN chmod +x /docker-entrypoint-initdb.d/init-db.sh

# Expose the port the app runs on
EXPOSE 5432
