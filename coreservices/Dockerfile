# Use the specified prebuilt image as the base
FROM tensorchord/pgvecto-rs:pg16-latest

# Define arguments that can be passed at build time
ARG POSTGRES_USER=postgres
ARG POSTGRES_DB_NAME=postgres
ARG POSTGRES_PASSWORD=postgres
ARG POSTGRES_PORT=5432

# Set environment variables from the arguments
ENV POSTGRES_USER=$POSTGRES_USER \
    POSTGRES_DB_NAME=$POSTGRES_DB_NAME \
    POSTGRES_PORT=$POSTGRES_PORT \
    POSTGRES_PASSWORD=$POSTGRES_PASSWORD

# Copy init.sql script and init-db.sh script to the container and make the init-db.sh script executable
COPY init.sql init-db.sh /docker-entrypoint-initdb.d/
RUN chmod +x /docker-entrypoint-initdb.d/init-db.sh

# Expose the port the app runs on
EXPOSE $POSTGRES_PORT
