import Article from "../models/article.model"
import Category from "../models/category.model";
interface GetArticleArgs {
  id: string;
}
interface ArticleInput {
  title: string,
  avatar?: string,
  description?: string,
  categoryId: string

}

interface CreateArticleArgs {
  article: ArticleInput;
}
interface UpdateArticleArgs{
  id: string,
  article: ArticleInput
}
interface GetListArticleArgs{
  sortKey: string,
  sortValue: string
  currentPage: number,
  limitItems: number
}

export const resolversArticle = {
  
  Query: {
    getListArticle: async (_:any, args:GetListArticleArgs ) =>{
      const {
        sortKey,
        sortValue,
        currentPage,
        limitItems
        } = args

      // Sort 
      const sort:any = {}
      if(sortKey && sortValue){
        sort[sortKey] = sortValue
      }
      // End Sort 

      // Pagination
      const skip = (currentPage-1)*limitItems
      // End Pagination

      const articles = await Article.find({
        deleted: false
      }).sort(sort).limit(limitItems).skip(skip)
      return articles
    },
    getArticle: async (_: any, args: GetArticleArgs) =>{
      const {id} = args
      const article = await Article.findOne({
        _id: id,
        deleted: false
      })
      return article
    }

  
  },
  Article: {
    category: async (article:ArticleInput)=>{
      const categoryId = article.categoryId
      const category = await Category.findOne({
        _id: categoryId
      })
      return category
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
    updateArticle: async (_: any, args: UpdateArticleArgs) =>{
      const {id, article} = args
      await Article.updateOne({
        _id: id
      }, article)
      const record = await Article.findOne({
        _id: id
      })
      return record
    }
  }
}