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

Fill the table name to 'tutorial' (change tutorial as your 'TABLE' value) and Primary key id with type string.
