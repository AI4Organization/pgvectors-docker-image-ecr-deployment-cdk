.PHONY: cdk-deploy
cdk-deploy:
    cdk deploy -- --env-file .env

.PHONY: cdk-destroy
cdk-destroy:
    cdk destroy

help:
    @echo "cdk-deploy - Deploy the CDK stack"
    @echo "help       - Display this help message"