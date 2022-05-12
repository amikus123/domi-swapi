import { Stack, Heading, Text, Flex, Divider, Box } from "@chakra-ui/react"
import React from "react"
import BlogContent from "./content/BlogContent"
import BlogDescriptionImage from "./content/BlogDescriptionImage"
import BlogTags from "./BlogTags"
import SocialRow from "./socials/SocialRow"
import CategoryBreadcrumbs from "./Categories/CategoryBreadcrumbs"
import RelatedBlogPosts from "./RelatedBlogPosts/RelatedBlogPosts"
import { BlogPost } from "../../lib/types/JSON/parsed/parsedBlogs"
import { StrapiImage } from "../../lib/types/generalTypes"
import BlogMarkdown from "../Markdown/Blog/BlogMarkdown"

interface BlogProps {
  data: BlogPost
  category: string
  blogIds: Record<number, boolean>
}

const Blog = ({ data, category, blogIds }: BlogProps) => {
  const {
    content = [],
    description = "",
    image: mainImage = { image: {}, description: "" },
    title = "",
    blogCategories = [],
    slug = "",
    id = -1,
  } = data

  return (
    <>
      {data ? (
        <Stack w="100%">
          <Box w="100%" alignSelf="flex-start" maxW="100%">
            <CategoryBreadcrumbs
              links={[
                { href: "/blog/", name: "Kategorie" },
                { href: `/blog/${category}`, name: category },
                { href: `/blog/${category}/${slug}`, name: "Artykuł" },
              ]}
            />
          </Box>

          <Stack
            justify="center"
            align="center"
            w="100%"
            m="0 auto"
            alignSelf="center"
            spacing={4}
            px={[4, 12, 20]}
            py={4}
            maxW="1000px"
            minW={["unset", "unset", "675px"]}
          >
            <Heading w="100%">{title}</Heading>
            <Text as="span" w="100%" fontSize="2xl" color="gray.600">
              <BlogMarkdown  text={description}  />
            </Text>

            <BlogTags blogCategories={blogCategories} pb={4} />

            <BlogDescriptionImage
              image={mainImage.image as StrapiImage}
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
        </Stack>
      ) : null}
    </>
  )
}

export default Blog
