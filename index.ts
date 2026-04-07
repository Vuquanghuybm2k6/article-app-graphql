import express, { Express, Request, Response } from "express";
import * as database from './config/database'
import dotenv from "dotenv"
import Article from "./models/article.model";
dotenv.config()
const app: Express = express();
const port: string | number = process.env.PORT || 3000;

database.connect()
// Rest API
app.get("/articles",  async (req: Request, res: Response) => {
  const articles = await Article.find({
    deleted: false
  })
  res.json({
    articles: articles
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});