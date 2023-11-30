#!/usr/bin/env node
import 'source-map-support/register';

import * as cdk from 'aws-cdk-lib';
import { PgvectorsDockerImageEcrDeploymentCdkStack } from '../lib/pgvectors-docker-image-ecr-deployment-cdk-stack';

const app = new cdk.App();

const { CDK_DEFAULT_ACCOUNT: account, CDK_DEFAULT_REGION: region } = process.env;
new PgvectorsDockerImageEcrDeploymentCdkStack(app, 'PgvectorsDockerImageEcrDeploymentCdkStack', {
    env: {
        account,
        region
    },
});

app.synth();
