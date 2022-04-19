import { BlogCardFull } from "../../types/JSON/parsed/parsedBlogs"
import { BlogCategoryWithBlogCardsWrapJson } from "../../types/JSON/raw/blogCategoriesTypes"
import { handleCardData, handleCategories } from "./parseBlog"
import { handleBlogImage } from "./parseImage"

export const handleBlogCards = (
  initial: BlogCategoryWithBlogCardsWrapJson
): BlogCardFull[] => {
  const blogs = initial.data[0].attributes.blogs.data
  const res: BlogCardFull[] = blogs.map((item) => {
    const {
      blogCategories,
      cardData,
      date,
      description,
      mainImage,
      readingTime,
      slug,
      title,
    } = item.attributes
    return {
      slug,
      title,
      readingTime,
      description,
      date,
      cardData: handleCardData(cardData, mainImage),
      image: handleBlogImage(mainImage),
      blogCategories: handleCategories(blogCategories),
    }
  })

  return res
}



