declare module NodeJS {
    interface ProcessEnv {
        [key: string]: string | undefined;
        CDK_DEPLOY_REGIONS: string;
        ENVIRONMENTS: string;
        ECR_REPOSITORY_NAME: string;
    }
}
