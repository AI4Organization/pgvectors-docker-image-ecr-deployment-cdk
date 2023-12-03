export const EnvTyped = {
    POSTGRES_PORT:process.env.POSTGRES_PORT ?? '5432',
    POSTGRES_USER:process.env.POSTGRES_USER ?? 'postgres',
    POSTGRES_PASSWORD:process.env.POSTGRES_PASSWORD ?? 'postgres',
    POSTGRES_BASE_VERSION:process.env.POSTGRES_BASE_VERSION ?? '16',
    POSTGRES_DB_NAME:process.env.POSTGRES_DB_NAME ?? 'hydra',
}
