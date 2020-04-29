# Serverside

## Configure AWS – Create Lambda function with API Gateway and DynamoDB database table creation

Go to [https://console.aws.amazon.com/lambda](https://console.aws.amazon.com/lambda/home)

Choose the region from the top right and click **Create Function**

![create function](https://lh3.googleusercontent.com/1pETPnThYcPv0D0pNq-hpqNM-rH1Fe4xwA5uJGuMzmG6Yyc4eqBhvnuKZH9-gNuSFQ_x_EYmiBJZfP_VpgVpmKHY9gIwIiTdqGY1QyUgD_UEGd5y97fzLW0mqeVzKRHCmr2L9r99AQ)

Fill the function name, I will use ‘deloTutorialFunction’ for this example, Runtime – Node.js 12.x.

![create function2](https://lh3.googleusercontent.com/G5JwemlX00ptI_J-uemQjtoKy5eRS5IcRzYRKfVUoF_mUvnRi1kjxheCTUhV_ToOedHU66GeBofF_x-B5i2qg2q-Uc7beyGWLJiCKuDReZckhMBT_sLGvUSg4mtvKSUCjdZVC1OtHg)

> Leave the Permissions field as it is, we will get back later to it to add permission our Lambda to access DynamoDB. Until then, our function will use the basic role which has really limited access and will be able to only upload logs to CloudWatch.

Click Create Function. It will take a few seconds before a success message “Congratulations! Your Lambda function _“deloTutorialFunction”_ has been successfully created. You can now change its code and configuration. Choose Test to input a test event when you want to test your function.” appear.

We will also be redirected to the newly created lambda.

![lambda1](https://lh3.googleusercontent.com/wK20PY5dSnX9pAq2rtOqTwSeg3KX62g8f0WP7zacS-mzRSMK9a--T0zEAwfePkaA3ZAMITkOnuKkLakk4FPkDPIfr2u_VRjqBEphIgS_9Zo1lnCkES6BpagOrC3vR7QpkTxkJIxFJA)

Now, when our function is created, let’s switch for a moment to **IAM**(Identity and Access Management) and create a role for it. We will need it, as I already mentioned, to grant access to **DynamoDB** – the database we will use.

Go to [https://console.aws.amazon.com/iam](https://console.aws.amazon.com/iam)

Click **Roles** and then **Create Role**.

![iam](https://lh3.googleusercontent.com/s6ZVVm4q27a27TR6URX6IfzbaxcUqqNuzHT9XVE_29nVRQDhOcbtl6IkW5Oz1EMPNKT_csACOD6f-qAJOvc5A9fj4lJRoSkZ933S4AXa1prVnS0Bbac_fzQWnne7_VIPB7JT778hzQ)

Choose the service that will use this role – in our case **Lambda** and click **Next: Permissions**

> Here, we can create our own custom policy or use the already available ones. The policies are basically rules in JSON format that tells the role what permissions should be given to the service attached to it. For our example here, we will use the already available AmazonDynamoDBFullAccess policy.

Type _dynamodb_ in search box and select **AmazonDynamoDBFullAccess** then click next.

Click **Next** and again **Next** and you should view the Review part.

Fill the desired role name, something like ‘delo-tutorial-lambda-role’ and click **Create Role**

![iam2](https://lh3.googleusercontent.com/QBMP4nGyRkD6JAuosBiR0IwQmfxoLl7gO-pV-jIPlL1309qpS2fcTsfyslJ8vmxaHC35OBKQm8_HeoXDYsmoDWeKRB8pX82gQqXqmKB9ZG_2pIeOro4GeDLJPU24SMGbYLeY09yOVw)

The role should be created and available in the list of roles available in **IAM**.

![iam3](https://lh3.googleusercontent.com/XIdOS3Cv5FMU93mjO50hlKI1AiHkAwUH68gckvC1BRSyu4djQzZsWVouFirAWQ1sGc7Ry3wUlNGrn9VQ02A8Y8Y_t8sAMK-410TvM14D4Msf-i0L8BswcdIALV_pjyDlNdUO0RjClA)

Now, we can get back to our lambda and assign this role to it.

Go to [https://console.aws.amazon.com/lambda](https://console.aws.amazon.com/lambda) and choose your function (deloTutorialFunction, in my case).

You will be redirected to the specific Lambda page. Go to the “Environment variables” section and include two variables which we will use later when writing our Node.JS logic. **Edit** add 'TABLE' and 'NODE_ENV' then **Save**.

TABLE: tutorial // the name of our future database table (will create it soon)

NODE_ENV: production // the environment, let’s call it ‘production’. This will help us to identify if it is local or serverless instance of the server

![lambda4](https://lh3.googleusercontent.com/n5K-3e1d1rXGh2d56Ws0qAAoAZnwrl6jh34XYg8gbLc4jxxMhiDGtaFEwhgZaaEWqNW7JbP1dxpYRuvP7bJXaNUuDpHMgwUj5HuARzWjG3-u8hWD7-_QSAcxBvrOajVV4QbGnKKoxg)

Select Permission and Scroll down to Execution role and click **Edit**.

![lambda3](https://lh3.googleusercontent.com/epG4gtd1AQ6eCB_u0V2zL5cbe8UoIF--53Lch1F0G1GSeoBKruLHhGfLiKZLSYlYEGrzc99y0SJWux7U3nn-xGDfHR66nEZPrav7DoCF2C8btytUdiSxeFTKT94Uy39oOWiK-pBBOg)

Choose the role you want to use, in my case _‘delo-tutorial-lambda-role’_. Click **Save**.

Okay, so far so good. It’s time to configure **DynamoDB**.

Go to [https://console.aws.amazon.com/dynamodb](https://console.aws.amazon.com/dynamodb)

Click **Create Table**

Fill the table name to 'tutorial' (change tutorial as your 'TABLE' value) and Primary key id(index) with type string.

And click **Create**.

When the table is created you should be redirected to the table management route.

This means that your table creation was successfully. We are done with the **DynamoDB** configuration.

Now it’s time to create **API Gateway** and connect it to the **Lambda** we have created earlier.

Go to [https://console.aws.amazon.com/apigateway](https://console.aws.amazon.com/apigateway) and click **Get Started**.

We will create a brand new API by choosing New API and scroll down choose REST API as API type then click **Build**.

- Choose REST as Protocol
- New API
- API name in my case 'tutorial-api'
- Endpoint is Regional
- Click **Create API**

![api1](https://lh3.googleusercontent.com/4FygwW4PUpsZj-qRXFxxgVm8wEa6zVxSslnZGgmvanFm4HnAeEwT1VAuq2Jlzb9Q6oJpaOy7hkCXlT1arNtb6isngfSBcOpIIFGEgPteh3awgmaLiwd-wYquxz3XKFp8m19YG7FOow)

Got to the actions tab and choose **Create Resource**.

**Configure as proxy** resource have to be checked ? this way we will handle the routes in our Lambda function and there will be no need to manually add every endpoint in the gateway every time we create one.

**Resource name** - ‘tutorial-api’ and **Resource path** - {proxy+} (you can find more information below the field what {proxy+} means).

**Enable API Gateway CORS** is not required, but I suggest you to also check it. This way you can configure later the origins you want to have access to your resource, methods and etc.

![api2](https://lh3.googleusercontent.com/vv01yyXR_v07BsF0wcOFODQp57z3RdIIF2oxJuyDuZGKzyaaQpwhkFHuma3S7jB-_PeXsIY6Hbkk0c4KrKZZG8Q_e-ckc_MqaEV9lKOFisEQBk9TMIifN5bv1_Jp0ghznnBsWZhhRg)

And click **Create Resource**

Then specify the Lambda function you want to connect to your newly created API Gateway resource.

![api3](https://lh3.googleusercontent.com/DlY8cM_Y5rzK7qdjO8w6NqqrF0kWXDhVCocCFy7AU4AVuv2BFOPVIlDJ_T_Z2Xsh-UB5gZ0AYmpSM5VM-e9Wp2YqRBuOjLIIyqYyUfWWawoWyLI0P31tSr6AHhFJOF-iXYlIQNsAvg)

And the last thing is to deploy this resource.

Click on **Actions** -> **Deploy**

Choose the Deployment stage -> [New Stage] and Stage Name -> 'prod' then click **Deploy** and soon you will see your API endpoint, like the one below:

![api4](https://lh3.googleusercontent.com/fLvx_T3fz91phrwYiwTZn9cOzPNrPnjpoIh9aYzx_NNoLImln9CQvNTl1ax5XDVyjF2t2rW9NAQd332mk2XK4_scQ1rwaW6noq7j77xw9aA2g05CHPjES-mh0y01G5LuZe6LM5ue5w)

This is your base API url, which we will use from now on to access it.

Well done! This is the initial configuration for our API and very important part of the tutorial. This is the last time we will use the AWS console, from now on the AWS Cli will be our friend for future deploys and configurations. Make sure you configure it before continue.

Now, we can create the application.

## Setup new Node.JS project using Serverless Express and implement basic routes

Create a new directory, I will name it **express-serverless-crud**.

Go to that newly created directory and initialize a new Node.JS project.

Initialize npm

```
npm init
# configure your npm or
npm init -y
# choose default for all
```

We will need a few packages. Use the following command to install them:

```
yarn add aws-sdk aws-serverless-express cors express
#or use npm
npm i aws-sdk aws-serverless-express cors express --save
```

What we will use each of them for:

- **aws-sdk** – to interact with AWS
- **express & aws-serverless-express** – to use the power of express, rather than writing vanilla Node.JS
- **cors** – package to enable cors for as a middleware in express

Add a new **app.js** file in the root folder with the following content:

```
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const routes = require("./routes");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(awsServerlessExpressMiddleware.eventContext());
app.use("/", routes);
module.exports = app;
```

It’s a standard entry file for express applications with and extra middleware

```
awsServerlessExpressMiddleware.eventContext()
```

This middleware is taking care of the **eventContext** object received by the API Gateway and transform the object to something more understandable by express.

You can notice that there is also routes imported in this file(we can not go without routes, right :)). Create a new file called **routes.js** and include the following code there.

```
const AWS = require("aws-sdk");
const express = require("express");

const IS_OFFLINE = process.env.NODE_ENV !== "production";
const TUTORIAL = IS_OFFLINE === true ? "tutorial" : process.env.TABLE;
const dynamoDb =
  IS_OFFLINE === true
    ? new AWS.DynamoDB.DocumentClient({
        region: "us-east-2",
        endpoint: "http://127.0.0.1:8000",
      })
    : new AWS.DynamoDB.DocumentClient();
const router = express.Router();

router.get("/records", (req, res) => {
  const params = {
    TableName: TUTORIAL,
  };
  dynamoDb.scan(params, (error, result) => {
    if (error) {
      res.status(400).json({ error: "Error fetching the employees" });
    }
    res.json(result.Items);
  });
});
router.get("/records/:id", (req, res) => {
  const id = req.params.id;
  const params = {
    TableName: TUTORIAL,
    Key: {
      id,
    },
  };
  dynamoDb.get(params, (error, result) => {
    if (error) {
      res.status(400).json({ error: "Error retrieving Employee" });
    }
    if (result.Item) {
      res.json(result.Item);
    } else {
      res.status(404).json({ error: `Employee with id: ${id} not found` });
    }
  });
});
router.post("/records", (req, res) => {
  const name = req.body.name;
  const id = req.body.id;
  const params = {
    TableName: TUTORIAL,
    Item: {
      id,
      name,
    },
  };
  dynamoDb.put(params, (error) => {
    if (error) {
      res.status(400).json({ error: "Could not create Employee" });
    }
    res.json({
      id,
      name,
    });
  });
});
router.delete("/records/:id", (req, res) => {
  const id = req.params.id;
  const params = {
    TableName: TUTORIAL,
    Key: {
      id,
    },
  };
  dynamoDb.delete(params, (error) => {
    if (error) {
      res.status(400).json({ error: "Could not delete Employee" });
    }
    res.json({ success: true });
  });
});
router.put("/records", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const params = {
    TableName: TUTORIAL,
    Key: {
      id,
    },
    UpdateExpression: "set #name = :name",
    ExpressionAttributeNames: { "#name": "name" },
    ExpressionAttributeValues: { ":name": name },
    ReturnValues: "ALL_NEW",
  };
  dynamoDb.update(params, (error, result) => {
    if (error) {
      res.status(400).json({ error: "Could not update Employee" });
    }
    res.json(result.Attributes);
  });
});

module.exports = router;

```

For now on, skip the **IS_OFFLINE** variable, we will use it a little bit later when adjusting the project to work with local version of AWS and DynamoDB. This variable will always be false when deployed to AWS as we have included a NODE_ENV to be **production** in the Lambda.

The rest of the code are basic CRUD operations with DynamoDB – Get all records, Get specific record, Add record, Delete record and Update(Edit) record.

One more thing needed is the entry file for the **LAMBDA**(yes, it’s different than the app.js file we created before). It’s a file/code specific for the online version of the app, we will not use it for local development.

Create an **index.js** file with the following content:

```
const awsServerlessExpress = require('aws-serverless-express')
const app = require('./app')
const server = awsServerlessExpress.createServer(app)
exports.handler = (event, context) => { awsServerlessExpress.proxy(server, event, context) }
```

Basically it just proxify the request/response to be compatible with serverless express.

## Automate the deploy process using AWS CLI

Okay, now we can take the **node_modules** folder, **index.js**(the entry point of the lamba), **app.js**(the hearth of the application) and **routes.js**(well the routes :)), pack them to zip, go to the lambda page and upload them. Instead of doing this, we will use aws cli to do the job for us.

Go to the **package.json** and include the following three lines in scripts part:

```
"deploy": "npm run clean && npm run build && aws lambda update-function-code --function-name deloTutorialFunction --zip-file fileb://build.zip --publish",
"clean": "rm build.zip",
"build": "zip -r build.zip node_modules index.js app.js routes.js"
```

If you have successfully configured the aws cli, executing the following command:

```
yarn deploy
#or :npm run deploy
```

It will:

1. Clean the old build (need to skip on first deploy)
2. Create a new one by packing/zip the required files
3. Publish it to AWS Lambda

When the deploy is completed, you should receive a JSON response with details about the version of the lambda and some other things. In order to be sure it’s successfully deployed, you can go to the Amazon Console -> AWS Lambda and check when was the last update of the lambda. If it was a minutes ago, congrats! You are now able to deploy your application to AWS with one single command :wink:

The API endpoints are now available and you can test them:

```
Example GET
{apiUrl}/records - Return all records (for now it is just an empty array [])
```

# Implement local development capabilities

Now comes the question, how we can develop and test the things locally before deploy. Something very important in order to avoid bad code in the so called production.

## AWS Dynamodb Local

1. Download and Install: Java Runtime Environment (JRE)
2. Download and Extract: [Dynamodb local](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html)
3. Run local dynamodb:

```
java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
```

4. Access at http://localhost:8000/shell/

The database is now available and up, but it’s empty. We have to create a table, but in order to do that we will need the table model.

We can take the one from our already existing table in AWS, but it will need some tweaks in order to be in the same format as expected by the aws-cli. So, you can use the following one:

```
{
    "TableName": "tutorial",
    "KeySchema": [
      {
        "AttributeName": "id",
        "KeyType": "HASH"
      }
    ],
    "AttributeDefinitions": [
      {
        "AttributeName": "id",
        "AttributeType": "S"
      }
    ],
    "ProvisionedThroughput": {
      "ReadCapacityUnits": 1,
      "WriteCapacityUnits": 1
    }
}
```

Create a new file in your project with name tutorial-table-model.json and paste that model there.

One more script will be needed to create the table. Copy, Paste the following line in package.json scripts.

```
"create-database": "aws dynamodb create-table --cli-input-json file://tutorial-table-model.json --endpoint-url http://localhost:8000"
```

> What we do is to use the aws cli to create the table and specify the endpoint-url to our local DynamoDB instance. If not specify endpoint, it will target your aws based on aws-cli configuration

Run the script by npm run create-database and the table will be created, which is indicated by the returned TableDescription in JSON format. So, the database is available and the table is created.

The next thing is to create a local entry point for the application, because the current one is adjusted to AWS Lambda and is not suitable for local development.

Create app-local.js file in the root folder of your project with the following content:

```
const app = require('./app');
const port = 3000;
app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});
```

It’s using the already available app logic and the only thing on top of it is to start local server using the listen method provided by express.

One more script will be needed to start the application locally:

```
"start": "node app-local",
```

We are setting the Table environment variable to _**tutorial**_ and executing the local development file with node app-local. If it was successfully started, you should see on the console the following output:

```
listening on http://localhost:3000
```

The routes mentioned and tested earlier should be working now locally.
