import React, { useEffect } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
  Flex,
  Heading,
  Link,
  Stack,
} from "@chakra-ui/react"
import { fetchAPI } from "../../../lib/api"
import CategoryBreadcrumbs from "../../../components/blog/Categories/CategoryBreadcrumbs"
import CardStack from "../../../components/blog/BlogCard/CardStack"
import BlogCardWide from "../../../components/blog/BlogCard/BlogCardWide"
import { BlogPost } from "../../../lib/server/jsonParsers/parseBlog"
import { getBlogFromCategory } from "../../../lib/server/fetching/serverSide"

interface C {
  id: number
  attributes: BlogPost
}
interface B {
  data: C[]
}
interface A {
  name: string
  slug: string
  description: string
  blogs: B
}

interface BlogProps {
  catgoryData: A
  xd: any
}
const blog = ({ catgoryData, xd }: BlogProps) => {
  useEffect(() => {
    console.log(catgoryData)
  }, [catgoryData])
  const { name, blogs, slug } = catgoryData
  const data = blogs.data
  useEffect(() => {
    console.log(xd)
  }, [xd])
  return (
    <Stack width="100%" mx="20" my={4}>
      <p>{JSON.stringify(xd)}</p>

      {/* <CategoryBreadcrumbs category={name} />

      <Heading> {name}</Heading>

      <p>
        <span>list fo all articles in that category</span>
        <br />
        {JSON.stringify(catgoryData)}

        {data.map((item, index) => {
          const itemData = item.attributes
          return (
            <React.Fragment key={index}>
              <p>{JSON.stringify(itemData)}</p>
              <BlogCardWide data={itemData} />

              {index === blogs.data.length ? null : <Divider />}
            </React.Fragment>
          )
        })}
      </p> */}
      {/* <Blog data={blogData.attributes} /> */}
    </Stack>
  )
}

export default blog

// sets whcih pages should be statucly rendered
export async function getStaticPaths() {
  const articlesRes = await fetchAPI("/blog-categories/", {
    urlParamsObject: { fields: ["slug"] },
  })
  const a = articlesRes.data
  a.forEach((x) => {
    console.log(x.attributes, "xd ")
  })
  return {
    paths: articlesRes.data.map((article) => ({
      params: {
        category: article.attributes.slug,
      },
    })),
    fallback: false,
  }
}

// gets data for selected page
export async function getStaticProps({ params }) {
  const articlesRes = await fetchAPI("/blog-categories/", {
    urlParamsObject: {
      filters: {
        slug: params.category,
      },

      populate: {
        populate: "*",
        mainImage: {
          image: {
            populate: "*",
          },
          populate: "*",
        },
        blogs: {
          mainImage: {
            image: {
              populate: "*",
            },
            populate: "*",
          },
          populate: "*",
        },
        cardData: {
          populate: "*",
          image: "*",
        },
        content: {
          populate: {
            image: "*",
          },
        },
      },
      encodeValuesOnly: true,
    },
  })

  try {
    const blogData = await fetchAPI(`/blogs/`, {
      urlParamsObject: {
        filters: {
          // slug: params.slug,
          blogCategories: ["zdrowie"],
        },
        populate: {
          populate: "*",
          mainImage: {
            populate: "*",
          },
          cardData: {
            populate: "*",
            image: "*",
          },
          blogCategories: {
            populate: "",
          },
          content: {
            populate: {
              image: "*",
            },
          },
        },
        encodeValuesOnly: true,
      },
    })

    console.log(blogData, "PIG")
  } catch (e) {
    console.error("jeblo")
  }

  const xd = await getBlogFromCategory(params.category)
  return {
    props: { catgoryData: articlesRes.data[0].attributes, xd },
    revalidate: 1,
  }
}
