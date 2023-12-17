import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecrDeploy from 'cdk-ecr-deployment';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import { DockerImageAsset, Platform } from 'aws-cdk-lib/aws-ecr-assets';
import { PgvectorsDockerImageEcrDeploymentCdkStackProps } from './PgvectorsDockerImageEcrDeploymentCdkStackProps';
import { LATEST_IMAGE_VERSION } from '../bin/pgvectors-docker-image-ecr-deployment-cdk';

export class PgvectorsDockerImageEcrDeploymentCdkStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: PgvectorsDockerImageEcrDeploymentCdkStackProps) {
        super(scope, id, props);

        const ecrRepository = new ecr.Repository(this, `${props.appName}-${props.environment}-DockerImageEcrRepository`, {
            repositoryName: props.repositoryName,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            autoDeleteImages: true,
            encryption: ecr.RepositoryEncryption.AES_256,
            imageScanOnPush: true,
        });

        ecrRepository.addLifecycleRule({ maxImageAge: cdk.Duration.days(7), rulePriority: 1, tagStatus: ecr.TagStatus.UNTAGGED }); // delete images older than 7 days
        ecrRepository.addLifecycleRule({ maxImageCount: 4, rulePriority: 2, tagStatus: ecr.TagStatus.ANY }); // keep last 4 images

        const dockerImageAsset = new DockerImageAsset(this, `${props.appName}-${props.environment}-DockerImageAsset`, {
            directory: path.join(__dirname, '../coreservices'),
            platform: Platform.LINUX_ARM64,
            buildArgs: {
                POSTGRES_PORT: props.envTyped.POSTGRES_PORT,
                POSTGRES_USER: props.envTyped.POSTGRES_USER,
                POSTGRES_PASSWORD: props.envTyped.POSTGRES_PASSWORD,
                POSTGRES_BASE_VERSION: props.envTyped.POSTGRES_BASE_VERSION,
                POSTGRES_DB: props.envTyped.POSTGRES_DB,
            },
        });

        const deployImageVersions = props.imageVersion === LATEST_IMAGE_VERSION ? [props.imageVersion] : [props.imageVersion, LATEST_IMAGE_VERSION];
        for (const deployImageVersion of deployImageVersions) {
            new ecrDeploy.ECRDeployment(this, `${props.appName}-${props.environment}-${deployImageVersion}-ECRDeployment`, {
                src: new ecrDeploy.DockerImageName(dockerImageAsset.imageUri),
                dest: new ecrDeploy.DockerImageName(`${ecrRepository.repositoryUri}:${deployImageVersion}`),
            });
        }

        // print out ecrRepository arn
        new cdk.CfnOutput(this, `${props.appName}-${props.environment}-ECRRepositoryArn`, {
            value: ecrRepository.repositoryArn,
            exportName: `${props.appName}-${props.environment}-ECRRepositoryArn`,
        });

        // print out ecrRepository repository name
        new cdk.CfnOutput(this, `${props.appName}-${props.environment}-ECRRepositoryName`, {
            value: ecrRepository.repositoryName,
            exportName: `${props.appName}-${props.environment}-ECRRepositoryName`,
        });
    }
}
