import { ImageRaw, StrapiImage } from "../../types/generalTypes"
import { BlogImage } from "../../types/JSON/parsed/parsedBlogs"
import { BlogImageJson } from "../../types/JSON/raw/blogJsonTypes"

export const handleImage = (raw: ImageRaw): StrapiImage => {
  const { attributes } = raw.data
  return attributes
}



export const handleBlogImage=(img:BlogImageJson) :BlogImage=>{
  const {description,image} = img
  const {attributes} = image.data
  return{
    description,
  image:attributes
  }
}
