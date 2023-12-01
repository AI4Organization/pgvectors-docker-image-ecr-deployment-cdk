import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import * as kms from 'aws-cdk-lib/aws-kms';
import { Construct } from 'constructs';
import * as ecrDeploy from 'cdk-ecr-deployment';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import { DockerImageAsset } from 'aws-cdk-lib/aws-ecr-assets';
import { PgvectorsDockerImageEcrDeploymentCdkStackProps } from './PgvectorsDockerImageEcrDeploymentCdkStackProps';

export class PgvectorsDockerImageEcrDeploymentCdkStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: PgvectorsDockerImageEcrDeploymentCdkStackProps) {
        super(scope, id, props);

        const kmsKey = new kms.Key(this, `${props.appName}-ECRRepositoryKmsKey`, {
            enableKeyRotation: true,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            enabled: true,
        });

        const repo = new ecr.Repository(this, `${props.appName}-PgvectorsDockerImageEcrRepository`, {
            repositoryName: props?.repositoryName || 'pgvectors-docker-image-ecr-deployment-cdk',
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            encryption: ecr.RepositoryEncryption.KMS,
            encryptionKey: kmsKey,
        });

        const image = new DockerImageAsset(this, `${props.appName}-PgvectorsDockerImageAsset`, {
            directory: path.join(__dirname, '../coreservices'),
        });

        new ecrDeploy.ECRDeployment(this, `${props.appName}-PgvectorsDockerImageECRDeployment`, {
            src: new ecrDeploy.DockerImageName(image.imageUri),
            dest: new ecrDeploy.DockerImageName(`${repo.repositoryUri}:latest`),
        });
    }
}
