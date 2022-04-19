import { StrapiImage } from "../../generalTypes"

// *used on dedicated blog page
export interface BlogPost extends BlogCardFull {
  content: BlogContent[]
  
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BlogContent {
  id:number,
  __component:string
  text?:string,
  description?:string,
  image?:StrapiImage
}

export interface BlogImage {
  description: string
  image: StrapiImage
}

export interface BlogCategory {
  slug: string
  name: string
  description: string
}
// * We may use special data for cardView of blog
export interface BlogCardOnlyData {
  image: StrapiImage
  description: string
}

export interface BlogCardFull extends BlogCardBase {
  date: string
  image: BlogImage
  blogCategories: BlogCategory[]
  readingTime: number
  cardData:BlogCardOnlyData
  id?: number
}

export interface BlogCardBase {
  description: string
  slug: string
  title: string
}

export interface BlogCard extends BlogCardBase {
  image: StrapiImage
}
