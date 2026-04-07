import Article from "./models/article.model"
import Category from "./models/category.model";
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

interface GetCategoryArgs {
  id: string
}
interface CategoryInput {
  title: string;
  avatar?: string;
  description?: string;
}

interface CreateCategoryArgs {
  category: CategoryInput;
}
interface updateCategoryArgs{
  id: string,
  category: CategoryInput
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
      const article = await Article.findOne({
        _id: id,
        deleted: false
      })
      return article
    },
    getListCategory: async () =>{
      const categories = await Category.find({
        deleted: false
      })
      return categories
    },
    getCategory: async(_:any, args: GetCategoryArgs)=>{
      const {id} = args
      const category = await Category.findOne({
        _id: id,
        deleted: false
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



     createCategory: async (_: any, args: CreateCategoryArgs) =>{
      const {category} = args
      const record = new Category(category)
      await record.save()
      return record
    },
    updateCategory: async (_: any, args: updateCategoryArgs) =>{
      const {id, category} = args
      await Category.updateOne({
        _id: id
      }, category)
      const record = await Category.findOne({
        _id: id
      })
      return record
    },
    deleteCategory: async (_: any, args: ({id:string})) =>{
      const {id} = args
      await Category.updateOne({
        _id: id
      },{
        deleted: true,
        deletedAt: new Date()
      })
      return "Đã xóa"
    },
  }
}