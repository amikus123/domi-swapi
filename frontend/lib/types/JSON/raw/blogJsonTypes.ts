import { GenericMetaData, ImageRaw } from "../../generalTypes"

export interface BlogWrapJson {
  data: { id: number; attributes: BlogDataJson }[]
  meta: GenericMetaData
}

export interface BlogDataJson extends BlogDataContentLessJson {
  content: BlogContentJson[]
}

export interface BlogDataContentLessJson {
  title: string
  description: string
  date: string
  slug: string
  readingTime: number
  createdAt: string
  updatedAt: string
  blogCategories: BlogCategoriesWrapJson
  mainImage: BlogImageJson
  cardData: CardDataJson
}

export interface BlogImageJson {
  description: string
  image: ImageRaw
  id: number
}

export interface BlogContentJson {
  id: number
  __component: string
  text?: string
  description?: string
  image?: ImageRaw
}

export interface BlogCategoriesWrapJson {
  data: BlogCategoriesJson[]
}
export interface BlogCategoriesJson {
  id: number
  attributes: {
    name: string
    slug: string
    description: string
    createdAt: string
    updatedAt: string
  }
}

export interface CardDataJson {
  description: string
  image: ImageRaw
  id: number
}


export interface BlogFullCardWrapJson {
  data: { id: number; attributes: BlogDataContentLessJson }[]
  meta: GenericMetaData
}
