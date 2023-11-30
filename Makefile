.PHONY: cdk-deploy
cdk-deploy:
	cdk deploy -- --env-file .env