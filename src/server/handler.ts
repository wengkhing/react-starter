import serverless from 'serverless-http';
import express, { Request } from 'express';
import render from './render';
import { APIGatewayEvent, Context } from 'aws-lambda';
const app = express();

app.get('*', async (req: Request, res) => {
  res.send(await render(req.path));
});

const handler = serverless(app);

exports.main = async (event: APIGatewayEvent, context: Context) => {
  const result = await handler(event, context);
  return result;
}
