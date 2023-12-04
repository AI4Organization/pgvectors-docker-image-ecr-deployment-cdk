import * as cdk from 'aws-cdk-lib';
import { IEnvTyped } from '../process-env-typed';

export interface PgvectorsDockerImageEcrDeploymentCdkStackProps extends cdk.StackProps {
    readonly repositoryName: string;
    readonly appName: string;
    readonly imageVersion?: string;
    readonly environment?: string;
    readonly envTyped: IEnvTyped;
}
