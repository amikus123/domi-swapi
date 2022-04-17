import { BlogCategoryPostWrapJson } from "./parseBlogCategoryPosts"

export const handleBlogIds = (
    initial: BlogCategoryPostWrapJson
  ): Record<number,boolean> => {
    const blogs = initial.data
    const res = {}
    blogs.forEach((item) => {
        res[item.id] = true
  
    })
  
    return res
  }