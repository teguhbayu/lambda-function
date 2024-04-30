import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const table = "perpus"
const topicArn = "XXXXXXXXXXXXXXX"
export const snsClient = new SNSClient({});

export const handler = async (event,context) => {
  // TODO implement
  try{
  const command = new PutCommand({
    TableName: table,
    Item: {
      timestamp: event.time,
      judul: event.title
    }
  });
  

  const response = await docClient.send(command);
  await snsClient.send(
    new PublishCommand({
      Message: `berhasil menambahkan "${event.title}"`,
      TopicArn: topicArn,
    }),
  );
  return response;
  }
  catch(e){
    return e
  }
};
