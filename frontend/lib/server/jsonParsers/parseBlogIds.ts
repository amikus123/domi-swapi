import { BlogCategoriesWrapJson } from "../../types/JSON/raw/blogJsonTypes"

export const handleBlogIds = (
    initial: BlogCategoriesWrapJson
  ): Record<number,boolean> => {
    const blogs = initial.data
    const res = {}
    blogs.forEach((item) => {
        res[item.id] = true
  
    })
  
    return res
  }