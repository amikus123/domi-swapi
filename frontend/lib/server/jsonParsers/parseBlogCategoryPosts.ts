import { BlogDataJson } from "../JsonTypes/blogJsonTypes"
import { BlogPost, handleCardData, handleCategories } from "./parseBlog"

export type CategoryBlogPost = Omit<BlogPost, "content">

export const handleBlogCategoryPosts = (
  initial: BlogCategoryPostWrapJson
): CategoryBlogPost[] => {
  const blogs = initial.data[0].attributes.blogs.data
  const res: CategoryBlogPost[] = blogs.map((item) => {
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
      cardData: handleCardData(cardData),
      mainImage,
      blogCategories: handleCategories(blogCategories),
    }
  })

  return res
}
export const handleBlogsById = (
  initial:any
): CategoryBlogPost[] => {
  const blogs = initial.data
  const res: CategoryBlogPost[] = blogs.map((item) => {
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
      cardData: handleCardData(cardData),
      mainImage,
      blogCategories: handleCategories(blogCategories),
    }
  })

  return res
}




export type BlogCategoryPostData = Omit<BlogDataJson, "content">

interface BlogCategoryPostDataWrap {
  id: number
  attributes: BlogCategoryPostData
}

interface BlogCategoryPostAttributesJson {
  name: string
  slug: string
  description: string
  blogs: {
    data: BlogCategoryPostDataWrap[]
  }
}
interface BlogCategoryPostDataJson {
  id: number
  attributes: BlogCategoryPostAttributesJson
}
export interface BlogCategoryPostWrapJson {
  data: BlogCategoryPostDataJson[]
  meta: any
}
