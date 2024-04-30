import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const table = "perpus"

export const handler = async (event) => {
  // TODO implement
  const command = new ScanCommand({
    TableName: table
  });

  const response = await docClient.send(command);  
  return response.Items;
};
