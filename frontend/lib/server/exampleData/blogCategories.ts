

export interface BlogCategoriesJsonWrap {
  data: BlogCategoryWrap[]
  meta: any
}


export interface BlogCategoryWrap {
  id: number
  attributes: BlogCategoryJson
}
export interface BlogCategoryJson {
  name: string
  slug: string
  description: string
  image: any
  createdAt: string
  updatedAt: string
}


export interface BlogCategory{
    name: string
    slug: string
    description: string
    image: any
}