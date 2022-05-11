import React from "react"
import { Button, Divider, Heading, Stack } from "@chakra-ui/react"
import { fetchAPI, getApiUrl } from "../../../lib/api"
import CategoryBreadcrumbs from "../../../components/blog/Categories/CategoryBreadcrumbs"
import BlogCardWide from "../../../components/blog/BlogCard/BlogCardWide"
import { capitalize } from "lodash"
import NextLink from "next/link"
import { getBlogCardsFromCategory } from "../../../lib/server/fetching/getBlogCategories"
import { BlogCardFull } from "../../../lib/types/JSON/parsed/parsedBlogs"
import qs from "qs"

interface BlogCategoryPostsProps {
  relatedBlogs: BlogCardFull[]
  category: string
}

const blog = ({ relatedBlogs, category }: BlogCategoryPostsProps) => {
  return (
    <Stack
      width="100%"
      mx="20"
      maxW={1000}
      my={4}
      pb={4}
      spacing={8}
      display="flex"
    >
      ~
      <CategoryBreadcrumbs
        links={[
          { href: "/blog/", name: "Kategorie" },
          { href: `/blog/${category}`, name: category },
        ]}
      />
      <Heading textAlign="center"> {capitalize(category)}</Heading>
      {relatedBlogs.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <BlogCardWide data={item} categorySlug={category} fullW={true} />

            {index === relatedBlogs.length - 1 ? null : <Divider />}
          </React.Fragment>
        )
      })}
      <Button
        w="60"
        colorScheme="teal"
        size="lg"
        justifySelf="center"
        alignSelf="center"
      >
        <NextLink href="/blog/">Sprawdź inne kategorie</NextLink>
      </Button>
    </Stack>
  )
}

export default blog
// sets whcih pages should be statucly rendered
export async function getStaticPaths() {
  // const articlesRes = await fetchAPI("/blog-categories/", {
  //   urlParamsObject: { fields: ["slug"] },
  // })

  const queryString = qs.stringify(
    {},

    {
      encodeValuesOnly: false,
    }
  )

  const res = await fetch(`${getApiUrl()}/api/blog-categories/?${queryString}`)
  const as = await res.json()

  return {
    paths: as.data.map((article) => ({
      params: {
        category: article.attributes.slug,
      },
    })),
    fallback: false,
  }
}

// gets data for selected page
export async function getStaticProps({ params }) {
  const { category } = params
  const relatedBlogs = await getBlogCardsFromCategory(category)

  return {
    props: { relatedBlogs, category },
    revalidate: 1,
  }
}

  const c = {
    name: "photo-1599964815811-30b9aea11d17.jpg",
    alternativeText: "photo-1599964815811-30b9aea11d17.jpg",
    caption: "photo-1599964815811-30b9aea11d17.jpg",
    width: 1170,
    height: 780,
    formats: {
      large: {
        ext: ".jpg",
        url: "/uploads/large_photo_1599964815811_30b9aea11d17_1cfe6e99dd.jpg",
        hash: "large_photo_1599964815811_30b9aea11d17_1cfe6e99dd",
        mime: "image/jpeg",
        name: "large_photo-1599964815811-30b9aea11d17.jpg",
        path: null,
        size: 95.77,
        width: 1000,
        height: 667,
      },
      small: {
        ext: ".jpg",
        url: "/uploads/small_photo_1599964815811_30b9aea11d17_1cfe6e99dd.jpg",
        hash: "small_photo_1599964815811_30b9aea11d17_1cfe6e99dd",
        mime: "image/jpeg",
        name: "small_photo-1599964815811-30b9aea11d17.jpg",
        path: null,
        size: 29.38,
        width: 500,
        height: 333,
      },
      medium: {
        ext: ".jpg",
        url: "/uploads/medium_photo_1599964815811_30b9aea11d17_1cfe6e99dd.jpg",
        hash: "medium_photo_1599964815811_30b9aea11d17_1cfe6e99dd",
        mime: "image/jpeg",
        name: "medium_photo-1599964815811-30b9aea11d17.jpg",
        path: null,
        size: 59.69,
        width: 750,
        height: 500,
      },
      thumbnail: {
        ext: ".jpg",
        url: "/uploads/thumbnail_photo_1599964815811_30b9aea11d17_1cfe6e99dd.jpg",
        hash: "thumbnail_photo_1599964815811_30b9aea11d17_1cfe6e99dd",
        mime: "image/jpeg",
        name: "thumbnail_photo-1599964815811-30b9aea11d17.jpg",
        path: null,
        size: 8.59,
        width: 234,
        height: 156,
      },
    },
    hash: "photo_1599964815811_30b9aea11d17_1cfe6e99dd",
    ext: ".jpg",
    mime: "image/jpeg",
    size: 124.7,
    url: "/uploads/photo_1599964815811_30b9aea11d17_1cfe6e99dd.jpg",
    previewUrl: null,
    provider: "local",
    provider_metadata: null,
    createdAt: "2022-05-11T13:44:37.175Z",
    updatedAt: "2022-05-11T13:44:37.175Z",
  }

const b = {
  name: "photo-1599964815811-30b9aea11d17.jpg",
  alternativeText: "photo-1599964815811-30b9aea11d17.jpg",
  caption: "photo-1599964815811-30b9aea11d17.jpg",
  width: 1170,
  height: 780,
  formats: {
    large: {
      ext: ".jpg",
      url: "/uploads/large_photo_1599964815811_30b9aea11d17_1cfe6e99dd.jpg",
      hash: "large_photo_1599964815811_30b9aea11d17_1cfe6e99dd",
      mime: "image/jpeg",
      name: "large_photo-1599964815811-30b9aea11d17.jpg",
      path: null,
      size: 95.77,
      width: 1000,
      height: 667,
    },
    small: {
      ext: ".jpg",
      url: "/uploads/small_photo_1599964815811_30b9aea11d17_1cfe6e99dd.jpg",
      hash: "small_photo_1599964815811_30b9aea11d17_1cfe6e99dd",
      mime: "image/jpeg",
      name: "small_photo-1599964815811-30b9aea11d17.jpg",
      path: null,
      size: 29.38,
      width: 500,
      height: 333,
    },
    medium: {
      ext: ".jpg",
      url: "/uploads/medium_photo_1599964815811_30b9aea11d17_1cfe6e99dd.jpg",
      hash: "medium_photo_1599964815811_30b9aea11d17_1cfe6e99dd",
      mime: "image/jpeg",
      name: "medium_photo-1599964815811-30b9aea11d17.jpg",
      path: null,
      size: 59.69,
      width: 750,
      height: 500,
    },
    thumbnail: {
      ext: ".jpg",
      url: "/uploads/thumbnail_photo_1599964815811_30b9aea11d17_1cfe6e99dd.jpg",
      hash: "thumbnail_photo_1599964815811_30b9aea11d17_1cfe6e99dd",
      mime: "image/jpeg",
      name: "thumbnail_photo-1599964815811-30b9aea11d17.jpg",
      path: null,
      size: 8.59,
      width: 234,
      height: 156,
    },
  },
  hash: "photo_1599964815811_30b9aea11d17_1cfe6e99dd",
  ext: ".jpg",
  mime: "image/jpeg",
  size: 124.7,
  url: "/uploads/photo_1599964815811_30b9aea11d17_1cfe6e99dd.jpg",
  previewUrl: null,
  provider: "local",
  provider_metadata: null,
  createdAt: "2022-05-11T13:44:37.175Z",
  updatedAt: "2022-05-11T13:44:37.175Z",
}
