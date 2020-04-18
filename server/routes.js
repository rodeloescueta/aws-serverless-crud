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
