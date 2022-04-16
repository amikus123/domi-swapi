import { Stack, Heading, Text, Flex, Button, Divider } from "@chakra-ui/react"
import React, { useEffect } from "react"
import rehypeRaw from "rehype-raw"
import ReactMarkdown from "react-markdown"
import BlogContent from "./content/BlogContent"
import BlogDescriptionImage from "./content/BlogDescriptionImage"
import BlogTags from "./BlogTags"
import SocialRow from "./socials/SocialRow"
import { BlogPost } from "../../lib/server/jsonParsers/parseBlog"
import CategoryBreadcrumbs from "./Categories/CategoryBreadcrumbs"
import RelatedBlogPosts from "./RelatedBlogPosts/RelatedBlogPosts"

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
        px={[4, 12, 20]}
        maxW="1000px"
      >
        <Flex w="100%" alignContent="left" pb={4} maxW="100%">
          <CategoryBreadcrumbs
            links={[
              { href: "/blog/", name: "Kategorie" },
              { href: `/blog/${category}`, name: category },
              { href: `/blog/${category}/${slug}`, name: "Artykuł" },
            ]}
          />{" "}
        </Flex>
        <Heading w="100%">{title}</Heading>
        <Text as="span" w="100%" fontSize="2xl" color="gray.600" pt={4}>
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {description}
          </ReactMarkdown>
        </Text>
        <BlogTags blogCategories={blogCategories} />
        <BlogDescriptionImage
          image={mainImage.image}
          text={mainImage.description}
          height={800}
      
        />
        <BlogContent data={content} />
        <Divider py={4} />
        <Flex w="100%" justify="flex-end" pt={4}>
          <SocialRow category={category} slug={slug} />
        </Flex>

        <RelatedBlogPosts />
      </Stack>
    </>
  )
}

export default Blog
