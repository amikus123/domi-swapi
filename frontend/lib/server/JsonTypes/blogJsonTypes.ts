export interface BlogWrapJson {
  data: BlogDataWrapJson[]
  meta: any
}
export interface BlogDataWrapJson {
  id: number
  attributes: BlogDataJson
}
export interface BlogDataJson {
  title: string
  description: string
  date: string
  slug: string
  readingTime: number
  content: any
  mainImage: BlogImageJson
  blogCategories: BlogCategoriesWrapJson
  cardData: CardDataJson
}

export interface BlogContentJson {}

export interface BlogImageJson {
  description: string
  image: any
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
  }
}

export interface CardDataJson {
  description: string
  image: any
}
