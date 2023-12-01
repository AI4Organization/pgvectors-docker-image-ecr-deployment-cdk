.PHONY: cdk-deploy
cdk-deploy:
    cdk deploy PgvectorsDockerImageEcrDeploymentCdkStack --profile hanseek-admin-user

.PHONY: cdk-destroy
cdk-destroy:
    cdk destroy PgvectorsDockerImageEcrDeploymentCdkStack --profile hanseek-admin-user
