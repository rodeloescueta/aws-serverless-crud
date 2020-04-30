# Serverless CRUD using AWS Lambda, DynamoDB, API Gateway Node, Express, Vue and Vuetify

[demo](http://tutorialhrd.s3-website.us-east-2.amazonaws.com)

You can see and download the complete code in this repository but in order to understand the code, we will explore it file by file, step by step.

> This is an example implementation of modern application development process using [aws-modern-app](https://aws.amazon.com/modern-apps/)

## Application Diagram

![aws-modern-app](https://lh3.googleusercontent.com/BpxrjI12boOTNrZExxnMCDhQIp1R5amSZPSzyowfFK3RC4o-NJCstBljgcNjZrXxx_xL-hc0ldhVYISvLZLnJrNuhS42p9GfeUyYhYtYXR1Q0z7iKSk3QLV7QJv5dWhKPn89-mXnIA)

## Implementation plan:

### Server side

- Configure AWS – Create Lambda function with API Gateway and DynamoDB database table creation
- Setup new Node.JS project using Serverless Express and implement basic routes
- Automate the deploy process in AWS Lambda using AWS CLI
- Implement local development capabilities using Docker Compose (for easier development and testing)

### Client Side

- Setups vue.js and vuetify crud application
- Connect to serverside through API gateway
- Setup Deploy process in AWS S3 using AWS CLI

## AWS-CLI Setup

- Windows: Download the appropriate MSI installer [here](https://docs.aws.amazon.com/cli/latest/userguide/install-windows.html)
- Run the downloaded MSI installer or the setup file.
- Check if successfully installed: `aws --version`
- Configuring AWS-CLI

```
aws configure
AWS Access Key ID [None]: <youraccesskeyid>
AWS Secret Access Key [None]: <yoursecretkey>
Default region name [None]: us-east-2
Default output format [None]: json
```

[wheres-my-secret/id-access-key](https://aws.amazon.com/blogs/security/wheres-my-secret-access-key/)

> When you enter this command, the AWS CLI prompts you for four pieces of information (access key, secret access key, AWS Region, and output format). These are described in the following sections. The AWS CLI stores this information in a profile (a collection of settings) named default. The information in the default profile is used any time you run an AWS CLI command that doesn't explicitly specify a profile to use.

## Getting started

- ### [Serverside](https://github.com/rodeloescueta/aws-serverless-crud/tree/master/server)
- ### [ClientSide](https://github.com/rodeloescueta/aws-serverless-crud/tree/master/server)

## Projects following this architecture

- ### GCPortal (_ongoing_)
- ### JESS (except S3)
- ### HRDPlans
- ### Notice (_pending_)
