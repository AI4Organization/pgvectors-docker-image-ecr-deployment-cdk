# Use the specified prebuilt image as the base
FROM tensorchord/pgvecto-rs:pg16-latest

# Define arguments that can be passed at build time
ARG POSTGRES_USER
ARG POSTGRES_DB
ARG POSTGRES_PASSWORD

# Print out the values of build arguments
RUN echo "POSTGRES_USER: ${POSTGRES_USER}"
RUN echo "POSTGRES_DB: ${POSTGRES_DB}"
RUN echo "POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}"

# Set environment variables from the arguments
ENV POSTGRES_USER=${POSTGRES_USER} \
    POSTGRES_DB=${POSTGRES_DB} \
    POSTGRES_PASSWORD=${POSTGRES_PASSWORD}

# Create a non-root user and switch to it
RUN adduser --disabled-password --gecos '' appuser
USER appuser

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

# Mount the volume to pg data directory for persistence to acheive full performance, readmore: https://github.com/tensorchord/pgvecto.rs/blob/main/docs/installation.md
VOLUME ["$PWD/pgdata:/var/lib/postgresql/data"]
