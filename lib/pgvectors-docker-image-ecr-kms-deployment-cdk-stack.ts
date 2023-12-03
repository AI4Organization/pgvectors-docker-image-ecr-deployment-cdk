import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import * as kms from 'aws-cdk-lib/aws-kms';
import { Construct } from 'constructs';
import * as ecrDeploy from 'cdk-ecr-deployment';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import { DockerImageAsset, Platform } from 'aws-cdk-lib/aws-ecr-assets';
import { PgvectorsDockerImageEcrDeploymentCdkStackProps } from './PgvectorsDockerImageEcrDeploymentCdkStackProps';

export class PgvectorsDockerImageEcrDeploymentCdkStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: PgvectorsDockerImageEcrDeploymentCdkStackProps) {
        super(scope, id, props);

        const kmsKey = new kms.Key(this, `${props.appName}-ECRRepositoryKmsKey`, {
            enableKeyRotation: true,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            enabled: true,
        });

        const ecrRepository = new ecr.Repository(this, `${props.appName}-${props.environment}-DockerImageEcrRepository`, {
            repositoryName: props.repositoryName,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            autoDeleteImages: true,
            encryption: ecr.RepositoryEncryption.KMS,
            encryptionKey: kmsKey,
        });

        ecrRepository.addLifecycleRule({ maxImageCount: 4, rulePriority: 1 }); // keep last 4 images
        ecrRepository.addLifecycleRule({ maxImageAge: cdk.Duration.days(7), rulePriority: 2, tagStatus: ecr.TagStatus.UNTAGGED }); // delete images older than 7 days

        const dockerImageAsset = new DockerImageAsset(this, `${props.appName}-${props.environment}-DockerImageAsset`, {
            directory: path.join(__dirname, '../coreservices'),
            platform: Platform.LINUX_ARM64,
            buildArgs: {
                POSTGRES_PORT: process.env.POSTGRES_PORT,
                POSTGRES_USER: process.env.POSTGRES_USER,
                POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
                POSTGRES_DB_NAME: process.env.POSTGRES_DB_NAME,
            },
        });

        new ecrDeploy.ECRDeployment(this, `${props.appName}-${props.environment}-DockerImageECRDeployment`, {
            src: new ecrDeploy.DockerImageName(dockerImageAsset.imageUri),
            dest: new ecrDeploy.DockerImageName(`${ecrRepository.repositoryUri}:${props.imageVersion}`),
        });
    }
}
