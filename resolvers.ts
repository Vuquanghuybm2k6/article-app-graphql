import Article from "./models/article.model"
interface GetArticleArgs {
  id: string;
}

interface ArticleInput {
  title: string;
  avatar?: string;
  description?: string;
}

interface CreateArticleArgs {
  article: ArticleInput;
}
interface updateArticleArgs{
  id: string,
  article: ArticleInput
}
export const resolvers = {
  
  Query: {
    getListArticle: async () =>{
      const articles = await Article.find({
        deleted: false
      })
      return articles
    },
    getArticle: async (_: any, args: GetArticleArgs) =>{
      const {id} = args
      const articles = await Article.findOne({
        _id: id,
        deleted: false
      })
      return articles
    }
  },
  
  Mutation: {
    createArticle: async (_: any, args: CreateArticleArgs) =>{
      const {article} = args
      const record = new Article(article)
      await record.save()
      return record
    },
    deleteArticle: async (_: any, args: ({id:string})) =>{
      const {id} = args
      await Article.updateOne({
        _id: id
      },{
        deleted: true,
        deletedAt: new Date()
      })
      return "Đã xóa"
    },
    updateArticle: async (_: any, args: updateArticleArgs) =>{
      const {id, article} = args
      await Article.updateOne({
        _id: id
      }, article)
      const record = await Article.findOne({
        _id: id
      })
      return record
    },
  }
}