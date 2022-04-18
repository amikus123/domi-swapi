import {
  BlogCategoriesWrapJson,
  BlogImageJson,
  BlogWrapJson,
  CardDataJson,
} from "../JsonTypes/blogJsonTypes"

export interface BlogPost {
  title: string
  description: string
  date: string
  content: any[]
  mainImage: BlogImageJson
  blogCategories: Category[]
  readingTime: number
  slug: string
  cardData: BlogCard
  id?:number
}

export interface Category {
  description: string
  slug: string
  name: string
}
export interface BlogCard {
  description: string
  image: any
}

export const handleCardData = (data: CardDataJson): BlogCard => {

  if(data===null){
    return{
      description:"",
      image:{}
    }
  }
  const { description, image } = data
  return {
    description,
    image,
  }
}

export const handleCategories = (data: BlogCategoriesWrapJson): Category[] => {
  const res: Category[] = data.data.map((item) => {
    const { description, name, slug } = item.attributes
    return {
      name,
      description,
      slug,
    }
  })
  return res
}
export const handleBlogPost = (initial: BlogWrapJson): BlogPost => {
  const { data } = initial
  const { attributes,id } = data[0]
  const {
    blogCategories,
    cardData,
    content,

    date,
    description,
    mainImage,
    readingTime,
    slug,
    title,
  } = attributes

  const res: BlogPost = {
    date,
    slug,
    title,
    mainImage,
    description,
    readingTime,
    blogCategories: handleCategories(blogCategories),
    cardData: handleCardData(cardData),
    content,
    id,
  }

  return res
}

