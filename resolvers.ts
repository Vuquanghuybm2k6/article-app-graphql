import Article from "./models/article.model"
export const resolvers = {
  Query: {
    hello: () => "Hello World!",
    getListArticle: async () =>{
      const articles = await Article.find({
        deleted: false
      })
      return articles
    },
    getArticle: async (_: any, args: { id: string }) =>{
      const {id} = args
      const articles = await Article.findOne({
        _id: id,
        deleted: false
      })
      return articles
    }
  },
}