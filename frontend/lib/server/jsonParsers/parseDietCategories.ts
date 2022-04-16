import {
  BlogCategoriesJsonWrap,
  BlogCategory,
} from "../exampleData/blogCategories"

export const handleBlogCategories = (
  raw: BlogCategoriesJsonWrap
): Record<string, BlogCategory> => {
  const { data } = raw
  const res = {}

  data.forEach((item) => {
    const { attributes } = item
    const { image, name, slug, description } = attributes
    res[name] = {
      image,
      name,
      slug,
      description,
    }
  })

  return res
}




