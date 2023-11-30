.PHONY: cdk-deploy
cdk-deploy:
	cdk deploy -- --env-file .env

help:
    @echo "cdk-deploy - Deploy the CDK stack"
    @echo "help       - Display this help message"