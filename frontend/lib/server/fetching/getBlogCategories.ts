import qs from "qs"
import { getApiUrl } from "../../api"
import {  BlogCardFull, BlogCard } from "../../types/JSON/parsed/parsedBlogs"
import { handleBlogCards } from "../jsonParsers/parseBlogCategoryPosts"
import { handleBlogCategories } from "../jsonParsers/parseDietCategories"

export const getBlogCategories = async (): Promise<BlogCard[]> => {
  const queryString = qs.stringify(
    {
      populate: ["image"],
    },
    {
      encodeValuesOnly: true,
    }
  )

  const request = await fetch(
    `${getApiUrl()}/api/blog-categories?${queryString}`,
    {}
  )
  const rawJSON = await request.json()
  const data = handleBlogCategories(rawJSON)
  return data
}
export const getBlogCardsFromCategory = async (
  category: string
): Promise<BlogCardFull[]> => {
  const queryString = qs.stringify(
    {
      populate: [
        "blogs",
        "blogs.mainImage",
        "blogs.mainImage.image",
        "blogs.blogCategories",
        "blogs.cardData",
        "blogs.cardData.image",
      ],
      filters: {
        slug: {
          $eq: category,
        },
      },
    },

    {
      encodeValuesOnly: true,
    }
  )

  const request = await fetch(
    `${getApiUrl()}/api/blog-categories?${queryString}`,
    {}
  )

  const rawJSON = await request.json()
  const data = handleBlogCards(rawJSON)
  return data
}
