#!/usr/bin/env node
import 'source-map-support/register';

import * as cdk from 'aws-cdk-lib';
import { PgvectorsDockerImageEcrDeploymentCdkStack } from '../lib/pgvectors-docker-image-ecr-deployment-cdk-stack';

const app = new cdk.App();
new PgvectorsDockerImageEcrDeploymentCdkStack(app, 'PgvectorsDockerImageEcrDeploymentCdkStack', {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION
    },
});

app.synth();
