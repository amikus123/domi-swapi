import { Stack, Heading, Text, Flex, Button, Divider } from "@chakra-ui/react"
import React, { useEffect } from "react"
import rehypeRaw from "rehype-raw"
import ReactMarkdown from "react-markdown"
import BlogContent from "./content/BlogContent"
import BlogDescriptionImage from "./content/BlogDescriptionImage"
import BlogTags from "./BlogTags"
import SocialRow from "./socials/SocialRow"
import CardStack from "./BlogCard/CardStack"
import BlogBreadcrumbs from "./BlogBreadcrumbs"
import { BlogPost } from "../../lib/server/jsonParsers/parseBlog"

interface BlogProps {
  data: BlogPost
  category: string
}

const Blog = ({ data, category }: BlogProps) => {
  const {
    content,
    date,
    description,
    mainImage,
    title,
    blogCategories,
    cardData,
    readingTime,
    slug,
  } = data
  useEffect(() => {
    console.log(data)
  })
  return (
    <>
      <Stack
        justify="flex-start"
        align="center"
        w="100%"
        textAlign="left"
        spacing={0}
      >
        <Flex w="100%" alignContent="left">
          <BlogBreadcrumbs category={category} />
        </Flex>
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

        {/* <CardStack cards={[data, data, data, data]} category={category} /> */}
      </Stack>
    </>
  )
}

export default Blog
