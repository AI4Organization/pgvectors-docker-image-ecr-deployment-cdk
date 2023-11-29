import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecrDeploy from 'cdk-ecr-deployment';
import * as ecr from 'aws-cdk-lib/aws-ecr';

export class PgvectorsDockerImageEcrDeploymentCdkStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const repo = new ecr.Repository(this, 'PgvectorsDockerImageEcrRepository', {
            repositoryName: 'pgvectorsrepository',
            removalPolicy: cdk.RemovalPolicy.DESTROY,
        });

        // Copy from docker registry to ECR.
        new ecrDeploy.ECRDeployment(this, 'PgvectorsDockerImageECRDeployment', {
            src: new ecrDeploy.DockerImageName('tensorchord/pgvecto-rs:pg16-latest'),
            dest: new ecrDeploy.DockerImageName(`${repo.repositoryUri}:latest`),
        });
    }
}
