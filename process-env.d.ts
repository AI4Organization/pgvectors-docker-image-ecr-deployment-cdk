declare module NodeJS {
    interface ProcessEnv {
        [key: string]: string | undefined;
        CDK_DEPLOY_REGIONS: string;
        ENVIRONMENTS: string;
        ECR_REPOSITORY_NAME: string;
        APP_NAME: string;
        IMAGE_VERSION: string;
        POSTGRES_USER: string;
        POSTGRES_DB_NAME: string;
        POSTGRES_PORT: string;
        POSTGRES_PASSWORD: string;
    }
}
