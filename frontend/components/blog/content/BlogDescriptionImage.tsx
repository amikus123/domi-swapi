import { Stack, Text } from "@chakra-ui/react"
import React from "react"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import { StrapiImage } from "../../../lib/types/generalTypes"
import { MyImage } from "../../general/Images"
import BMHeading from "../../Markdown/Blog/BMHeading"
import BMLink from "../../Markdown/Blog/BMLink"
import BMParagraph from "../../Markdown/Blog/BMParagraph"
import BMQuote from "../../Markdown/Blog/BMQuote"
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
          <ReactMarkdown
            components={{
              h1: BMHeading,
              blockquote: BMQuote,
              p: BMParagraph,
              a: BMLink,
            }}
            rehypePlugins={[rehypeRaw]}
          >
            {text}
          </ReactMarkdown>
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
