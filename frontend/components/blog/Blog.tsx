import { Stack, Heading, Text, Flex, Divider } from "@chakra-ui/react"
import React from "react"
import rehypeRaw from "rehype-raw"
import ReactMarkdown from "react-markdown"
import BlogContent from "./content/BlogContent"
import BlogDescriptionImage from "./content/BlogDescriptionImage"
import BlogTags from "./BlogTags"
import SocialRow from "./socials/SocialRow"
import CategoryBreadcrumbs from "./Categories/CategoryBreadcrumbs"
import RelatedBlogPosts from "./RelatedBlogPosts/RelatedBlogPosts"
import { BlogPost } from "../../lib/types/JSON/parsed/parsedBlogs"

interface BlogProps {
  data: BlogPost
  category: string
  blogIds: Record<number, boolean>
}

const Blog = ({ data, category, blogIds }: BlogProps) => {
  const {
    content,
    description,
    image: mainImage,
    title,
    blogCategories,
    slug,
    id = -1,
  } = data


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
        minW={["unset", "unset", "675px"]}
      >
        <Flex w="100%" alignContent="left" pb={4} maxW="100%">
          <CategoryBreadcrumbs
            links={[
              { href: "/blog/", name: "Kategorie" },
              { href: `/blog/${category}`, name: category },
              { href: `/blog/${category}/${slug}`, name: "Artykuł" },
            ]}
          />
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

        <RelatedBlogPosts
          currentBlogId={id}
          blogIds={blogIds}
          category={category}
        />
      </Stack>
    </>
  )
}

export default Blog
