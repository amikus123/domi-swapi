import {
  BlogCardFull,
  BlogCardOnlyData,
  BlogCategory,
  BlogContent,
  BlogPost,
} from "../../types/JSON/parsed/parsedBlogs"
import {
  CardDataJson,
  BlogCategoriesWrapJson,
  BlogWrapJson,
  BlogContentJson,
  BlogImageJson,
  BlogFullCardWrapJson,
} from "../../types/JSON/raw/blogJsonTypes"
import { handleBlogImage, handleImage } from "./parseImage"

export const handleCardData = (
  data: CardDataJson,
  backUp: BlogImageJson
): BlogCardOnlyData => {
  if (data === null) {
    const { description, image } = backUp
    return { description, image: handleImage(image) }
  } else {
    const { description, image } = data
    return { description, image: handleImage(image) }
  }
}

export const handleCategories = (
  data: BlogCategoriesWrapJson
): BlogCategory[] => {
  const res: BlogCategory[] = data.data.map((item) => {
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
  const { attributes, id } = data[0]

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
    image: handleBlogImage(mainImage),
    description,
    readingTime,
    blogCategories: handleCategories(blogCategories),
    cardData: handleCardData(cardData, mainImage),
    content: handleContent(content),
    id,
  }

  return res
}

const handleContent = (data: BlogContentJson[]): BlogContent[] => {
  const res: BlogContent[] = data.map((item) => {
    const { __component, id, description, image, text } = item
    const tmp: BlogContent = { id, __component }

    if (image !== undefined) {
      tmp.image = handleImage(image)
    }
    if (description !== undefined) {
      tmp.description = description
    }
    if (text !== undefined) {
      tmp.text = text
    }
    return tmp
  })

  return res
}

export const handleBlogsById = (
  initial: BlogFullCardWrapJson
): BlogCardFull[] => {
  const blogs = initial.data
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
