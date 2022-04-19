import { BlogCard } from "../../types/JSON/parsed/parsedBlogs"
import { BlogCategoriesJsonWrap } from "../../types/JSON/raw/blogCategoriesTypes"
import { handleImage } from "./parseImage"

export const handleBlogCategories = (
  raw: BlogCategoriesJsonWrap
): BlogCard[] => {
  const { data } = raw
  const res = data.map((item) => {
    const { attributes } = item
    const { image, name, slug, description } = attributes
    return {
      image: handleImage(image),
      title: name,
      slug,
      description,
    }
  })

  return res
}
