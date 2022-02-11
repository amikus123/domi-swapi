import {
  Stack,
  Heading,
  Text,
  Box,
  Flex,
  Button,
  Divider,
} from "@chakra-ui/react"
import React from "react"
import rehypeRaw from "rehype-raw"
import ReactMarkdown from "react-markdown"
import BlogContent from "./content/BlogContent"
import BlogDescriptionImage from "./content/BlogDescriptionImage"
import BlogTags from "./BlogTags"
import SocialRow from "./socials/SocialRow"
import BlogCard from "./BlogCard/BlogCard"
import BlogCardWide from "./BlogCard/BlogCardWide"
import CardStack from "./BlogCard/CardStack"
import TextCard from "./BlogCard/TextCard"
export interface BlogPost {
  title: string
  description: string
  date: string
  content: any[]
  mainImage: any
  blogCategories: any[]
}

interface BlogProps {
  data: BlogPost
}

const Blog = ({ data }: BlogProps) => {
  const { content, date, description, mainImage, title, blogCategories } = data
  return (
    <>
      <Stack
        justify="flex-start"
        align="center"
        w="100%"
        textAlign="left"
        spacing={0}
      >
        <Box py={10} w="100%">
          <TextCard data={data} />
        </Box>
        <Heading w="100%">{title}</Heading>
        <Text as="span" w="100%" fontSize="2xl" color="gray.600" pt={4}>
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {description}
          </ReactMarkdown>
        </Text>
        <BlogTags blogCategories={blogCategories} />
        <BlogDescriptionImage
          margin={0}
          image={mainImage.image}
          text={mainImage.description}
        />
        <BlogContent data={content} />
        <Divider py={4} />
        <Flex w="100%" justify="flex-end" pt={4}>
          <SocialRow />
        </Flex>
        <Flex py={4} pb={8}>
          <Button colorScheme="teal" size="lg">
            Więcej artykułów
          </Button>
        </Flex>

        <CardStack cards={[data, data, data, data]} />
      </Stack>
    </>
  )
}

export default Blog
