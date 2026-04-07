import Article from "./models/article.model"
export const resolvers = {
  Query: {
    hello: () => "Hello World!",
    getListArticle: async () =>{
      const articles = await Article.find({
        deleted: false
      })
      return articles
    }
  },
}