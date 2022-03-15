import { Stack, Text } from "@chakra-ui/react"
import React from "react"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import {  MyImage } from "../../general/Images"
import BMHeading from "../../Markdown/Blog/BMHeading"
import BMLink from "../../Markdown/Blog/BMLink"
import BMParagraph from "../../Markdown/Blog/BMParagraph"
import BMQuote from "../../Markdown/Blog/BMQuote"
interface BlogDescriptionImageProps {
  image: any
  text: any
  margin?: any
}

const ImageDesctiption = ({ text }) => {
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
  margin,
}: BlogDescriptionImageProps) => {
  return (
    <Stack w="100%" justify="center" align="center" py="1.5rem">
      <MyImage variant="fullW" image={image} margin={margin} />
      <ImageDesctiption text={text} />
    </Stack>
  )
}

export default BlogDescriptionImage
