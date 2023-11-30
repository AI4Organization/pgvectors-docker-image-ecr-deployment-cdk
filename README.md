# pgvectors-docker-image-ecr-deployment-cdk

This repository contains the necessary infrastructure code to build and deploy a Docker image containing the `pgvectors` PostgreSQL extension to Amazon Elastic Container Registry (ECR) using AWS Cloud Development Kit (CDK).

## Project Structure

- `bin/`: Contains the CDK entry point script.
- `coreservices/`: Contains the Dockerfile and related scripts for the `pgvectors` Docker image.
- `lib/`: Contains the CDK stack definition.
- `test/`: Contains test files for the CDK stack.
- `package.json`: Defines the project dependencies and build scripts.
- `package-lock.json`: Lock file automatically generated for any operations where npm modifies either the `node_modules` tree or `package.json`.
- `tsconfig.json`: Contains TypeScript compiler options.

## Key Components

- **Dockerfile**: Describes the steps to create the Docker image with the `pgvectors` extension.
- **CDK Stack (`lib/pgvectors-docker-image-ecr-deployment-cdk-stack.ts`)**: Defines an AWS ECR repository and handles the deployment of the Docker image to ECR.
- **CDK Entry Point (`bin/pgvectors-docker-image-ecr-deployment-cdk.ts`)**: The entry point for the CDK application that synthesizes the infrastructure.

## Usage

To use this repository, ensure you have AWS CDK installed and configured with appropriate AWS credentials. Then, you can run the following commands:

- `npm install`: Install the dependencies.
- `npm run build`: Compile the TypeScript source to JavaScript.
- `npm run test`: Run the tests defined in the `test/` directory.
- `cdk deploy`: Deploy the stack to your AWS account.

## Scripts

- `build`: Compiles the TypeScript code.
- `watch`: Watches for changes and recompiles.
- `test`: Runs Jest tests.
- `cdk`: Alias to the AWS CDK command.

## Dependencies

- `aws-cdk-lib`: AWS CDK library for defining cloud infrastructure.
- `cdk-ecr-deployment`: CDK construct for deploying Docker images to ECR.
- `constructs`: Constructs programming model for CDK.
- `source-map-support`: Provides source map support for stack traces in Node.js.

## Development Dependencies

- `@types/jest`: Type definitions for Jest.
- `@types/node`: Type definitions for Node.js.
- `jest`: JavaScript testing framework.
- `ts-jest`: TypeScript preprocessor for Jest.
- `ts-node`: TypeScript execution environment and REPL for Node.js.
- `typescript`: TypeScript compiler.

## Environment Variables

The Dockerfile accepts the following build arguments which can be supplied as environment variables:

- `POSTGRES_USER`: The PostgreSQL user.
- `POSTGRES_DB`: The PostgreSQL database.
- `POSTGRES_PASSWORD`: The PostgreSQL password.

## Security Notice

The Dockerfile contains `echo` commands that print out the values of the build arguments. These should be removed to prevent exposing sensitive information in logs.

## License

This project is licensed under the terms of the MIT license.

## Contributions

Contributions to this project are welcome. Please ensure that your code adheres to the project's coding standards and includes appropriate tests.
