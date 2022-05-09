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
import { StrapiImage } from "../../lib/types/generalTypes"

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
            image={mainImage.image as StrapiImage }
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
      ) : null}
    </>
  )
}

export default Blog

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const a: BlogPost = {
  date: "2022-05-02",
  slug: "z",
  title: "z",
  image: {
    description: "z",
    image: {
      name: "emma-simpson-mNGaaLeWEp0-unsplash.jpg",
      alternativeText: "emma-simpson-mNGaaLeWEp0-unsplash.jpg",
      caption: "emma-simpson-mNGaaLeWEp0-unsplash.jpg",
      width: 5472,
      height: 3648,
      formats: {
        large: {
          ext: ".jpg",
          url: "/uploads/large_emma_simpson_m_N_Gaa_Le_W_Ep0_unsplash_11bb4d6736.jpg",
          hash: "large_emma_simpson_m_N_Gaa_Le_W_Ep0_unsplash_11bb4d6736",
          mime: "image/jpeg",
          name: "large_emma-simpson-mNGaaLeWEp0-unsplash.jpg",
          path: null,
          size: 134.12,
          width: 1000,
          height: 667,
        },
        small: {
          ext: ".jpg",
          url: "/uploads/small_emma_simpson_m_N_Gaa_Le_W_Ep0_unsplash_11bb4d6736.jpg",
          hash: "small_emma_simpson_m_N_Gaa_Le_W_Ep0_unsplash_11bb4d6736",
          mime: "image/jpeg",
          name: "small_emma-simpson-mNGaaLeWEp0-unsplash.jpg",
          path: null,
          size: 39.02,
          width: 500,
          height: 333,
        },
        medium: {
          ext: ".jpg",
          url: "/uploads/medium_emma_simpson_m_N_Gaa_Le_W_Ep0_unsplash_11bb4d6736.jpg",
          hash: "medium_emma_simpson_m_N_Gaa_Le_W_Ep0_unsplash_11bb4d6736",
          mime: "image/jpeg",
          name: "medium_emma-simpson-mNGaaLeWEp0-unsplash.jpg",
          path: null,
          size: 82.02,
          width: 750,
          height: 500,
        },
        thumbnail: {
          ext: ".jpg",
          url: "/uploads/thumbnail_emma_simpson_m_N_Gaa_Le_W_Ep0_unsplash_11bb4d6736.jpg",
          hash: "thumbnail_emma_simpson_m_N_Gaa_Le_W_Ep0_unsplash_11bb4d6736",
          mime: "image/jpeg",
          name: "thumbnail_emma-simpson-mNGaaLeWEp0-unsplash.jpg",
          path: null,
          size: 9.97,
          width: 234,
          height: 156,
        },
      },
      hash: "emma_simpson_m_N_Gaa_Le_W_Ep0_unsplash_11bb4d6736",
      ext: ".jpg",
      mime: "image/jpeg",
      size: 1999.39,
      url: "/uploads/emma_simpson_m_N_Gaa_Le_W_Ep0_unsplash_11bb4d6736.jpg",
      previewUrl: null,
      provider: "local",
      provider_metadata: null,
      createdAt: "2022-05-09T14:24:36.761Z",
      updatedAt: "2022-05-09T14:24:36.761Z",
    },
  },
  description: "z",
  readingTime: 6,
  blogCategories: [{ name: "zdrowie", description: "Lorem", slug: "zdrowie" }],
  cardData: {
    description: "z",
    image: {
      name: "emma-simpson-mNGaaLeWEp0-unsplash.jpg",
      alternativeText: "emma-simpson-mNGaaLeWEp0-unsplash.jpg",
      caption: "emma-simpson-mNGaaLeWEp0-unsplash.jpg",
      width: 5472,
      height: 3648,
      formats: {
        large: {
          ext: ".jpg",
          url: "/uploads/large_emma_simpson_m_N_Gaa_Le_W_Ep0_unsplash_d8805ee44b.jpg",
          hash: "large_emma_simpson_m_N_Gaa_Le_W_Ep0_unsplash_d8805ee44b",
          mime: "image/jpeg",
          name: "large_emma-simpson-mNGaaLeWEp0-unsplash.jpg",
          path: null,
          size: 134.12,
          width: 1000,
          height: 667,
        },
        small: {
          ext: ".jpg",
          url: "/uploads/small_emma_simpson_m_N_Gaa_Le_W_Ep0_unsplash_d8805ee44b.jpg",
          hash: "small_emma_simpson_m_N_Gaa_Le_W_Ep0_unsplash_d8805ee44b",
          mime: "image/jpeg",
          name: "small_emma-simpson-mNGaaLeWEp0-unsplash.jpg",
          path: null,
          size: 39.02,
          width: 500,
          height: 333,
        },
        medium: {
          ext: ".jpg",
          url: "/uploads/medium_emma_simpson_m_N_Gaa_Le_W_Ep0_unsplash_d8805ee44b.jpg",
          hash: "medium_emma_simpson_m_N_Gaa_Le_W_Ep0_unsplash_d8805ee44b",
          mime: "image/jpeg",
          name: "medium_emma-simpson-mNGaaLeWEp0-unsplash.jpg",
          path: null,
          size: 82.02,
          width: 750,
          height: 500,
        },
        thumbnail: {
          ext: ".jpg",
          url: "/uploads/thumbnail_emma_simpson_m_N_Gaa_Le_W_Ep0_unsplash_d8805ee44b.jpg",
          hash: "thumbnail_emma_simpson_m_N_Gaa_Le_W_Ep0_unsplash_d8805ee44b",
          mime: "image/jpeg",
          name: "thumbnail_emma-simpson-mNGaaLeWEp0-unsplash.jpg",
          path: null,
          size: 9.97,
          width: 234,
          height: 156,
        },
      },
      hash: "emma_simpson_m_N_Gaa_Le_W_Ep0_unsplash_d8805ee44b",
      ext: ".jpg",
      mime: "image/jpeg",
      size: 1999.39,
      url: "/uploads/emma_simpson_m_N_Gaa_Le_W_Ep0_unsplash_d8805ee44b.jpg",
      previewUrl: null,
      provider: "local",
      provider_metadata: null,
      createdAt: "2022-05-09T14:25:22.423Z",
      updatedAt: "2022-05-09T14:25:22.423Z",
    },
  },
  content: [{ id: 1, __component: "blog.text", text: "z" }],
  id: 1,
}
