#!/usr/bin/env node
import 'source-map-support/register';

import * as cdk from 'aws-cdk-lib';
import * as dotenv from 'dotenv';
import { PgvectorsDockerImageEcrDeploymentCdkStack } from '../lib/pgvectors-docker-image-ecr-deployment-cdk-stack';
import { IEnvTyped } from '../process-env-typed';

dotenv.config(); // Load environment variables from .env file
const app = new cdk.App();

const { CDK_DEFAULT_ACCOUNT: account, CDK_DEFAULT_REGION: region } = process.env;

const cdkRegions = process.env.CDK_DEPLOY_REGIONS?.split(',') ?? [region]; // Parsing comma separated list of regions
const environments = process.env.ENVIRONMENTS?.split(',') ?? ['dev']; // Parsing comma separated list of environments

export const LATEST_IMAGE_VERSION = 'latest';

/*
 * Check if the environment variables are set
 * @param args - Environment variables to check
 * @throws Error if any of the environment variables is not set
 * @returns void
 * */
function checkEnvVariables(...args: string[]) {
    args.forEach((arg) => {
        if (!process.env[arg]) {
            throw new Error(`Environment variable ${arg} is not set yet. Please set it in .env file.`);
        }
    });
}

// check if the environment variables are set
checkEnvVariables('ECR_REPOSITORY_NAME', 'APP_NAME', 'POSTGRES_PORT', 'POSTGRES_USER', 'POSTGRES_PASSWORD', 'POSTGRES_BASE_VERSION', 'POSTGRES_DB');

const envTyped: IEnvTyped = {
    POSTGRES_PORT: process.env.POSTGRES_PORT ?? '5432',
    POSTGRES_USER: process.env.POSTGRES_USER ?? 'postgres',
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD ?? 'postgres',
    POSTGRES_BASE_VERSION: process.env.POSTGRES_BASE_VERSION ?? '16',
    POSTGRES_DB: process.env.POSTGRES_DB ?? 'pgvectors',
};

for (const cdkRegion of cdkRegions) {
    for (const environment of environments) {
        new PgvectorsDockerImageEcrDeploymentCdkStack(app, `PgvectorsDockerImageEcrDeploymentCdkStack-${cdkRegion}-${environment}`, {
            env: {
                account,
                region: cdkRegion,
            },
            tags: {
                environment,
            },
            repositoryName: `${process.env.ECR_REPOSITORY_NAME}-${environment}-${cdkRegion}`,
            appName: process.env.APP_NAME ?? `pgvectors-database`,
            imageVersion: process.env.IMAGE_VERSION ?? LATEST_IMAGE_VERSION,
            environment: environment,
            envTyped: envTyped,
        });
    }
}

app.synth();
