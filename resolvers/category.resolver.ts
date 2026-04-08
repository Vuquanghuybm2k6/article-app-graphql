import Category from "../models/category.model";

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
interface UpdateCategoryArgs{
  id: string,
  category: CategoryInput
}
export const resolversCategory = {
  
  Query: {
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
    createCategory: async (_: any, args: CreateCategoryArgs) =>{
      const {category} = args
      const record = new Category(category)
      await record.save()
      return record
    },
    updateCategory: async (_: any, args: UpdateCategoryArgs) =>{
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