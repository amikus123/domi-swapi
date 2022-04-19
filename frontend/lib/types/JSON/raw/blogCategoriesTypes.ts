import { ImageRaw, GenericMetaData } from "../../generalTypes"
import { BlogDataContentLessJson } from "./blogJsonTypes"

export interface BlogCategoriesJsonWrap {
  data: { id: number; attributes: BlogCategoryJson }[]
  meta: ImageRaw
}

export interface BlogCategoryJson {
  name: string
  slug: string
  description: string
  image: ImageRaw
  createdAt: string
  updatedAt: string
}

interface BlogCategortWithBlogCardsJson {
  name: string
  slug: string
  description: string
  createdAt: string
  updatedAt: string
  blogs: {
    data: { id: number; attributes: BlogDataContentLessJson }[]
  }
}

export interface BlogCategoryWithBlogCardsWrapJson {
  data: { id: number; attributes: BlogCategortWithBlogCardsJson }[]
  meta: GenericMetaData
}
