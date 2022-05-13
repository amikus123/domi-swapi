import { Stack, Text } from "@chakra-ui/react"
import React from "react"
import { StrapiImage } from "../../../lib/types/generalTypes"
import { MyImage } from "../../general/Images"
import BlogMarkdown from "../../Markdown/Blog/BlogMarkdown"
interface BlogDescriptionImageProps extends ImageDesctiptionProps {
  image: StrapiImage
  height: number
}

interface ImageDesctiptionProps {
  text: string
}
const ImageDesctiption = ({ text }: ImageDesctiptionProps) => {
  return (
    <>
      {text && (
        <Text as="span" color="gray.500">
          <BlogMarkdown text={text} />
        </Text>
      )}
    </>
  )
}

const BlogDescriptionImage = ({
  image,
  text,
  height,
}: BlogDescriptionImageProps) => {
  return (
    <Stack justify="center" align="center" w="100%" pt={4}>
      <MyImage variant="fullW" image={image} idealHeight={height} />
      <ImageDesctiption text={text} />
    </Stack>
  )
}

export default BlogDescriptionImage
