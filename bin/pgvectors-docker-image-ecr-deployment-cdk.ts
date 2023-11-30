#!/usr/bin/env node
import 'source-map-support/register';

import * as cdk from 'aws-cdk-lib';
import { PgvectorsDockerImageEcrDeploymentCdkStack } from '../lib/pgvectors-docker-image-ecr-deployment-cdk-stack';

const app = new cdk.App();
new PgvectorsDockerImageEcrDeploymentCdkStack(app, 'PgvectorsDockerImageEcrDeploymentCdkStack', {
    const { CDK_DEFAULT_ACCOUNT: account, CDK_DEFAULT_REGION: region } = process.env;
    env: {
        account,
        region
    },
});

app.synth();
