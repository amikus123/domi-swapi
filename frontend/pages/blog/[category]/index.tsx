import React, { useEffect } from "react"
import { Flex,Text } from "@chakra-ui/react"
import { fetchAPI } from "../../../lib/api"

const blog = ({catgoryData}) => {
  useEffect(()=>{
    console.log(catgoryData)
  },[catgoryData])
  return (
    <Flex width="100%" mx="20" my={4}>
      <p>
        <span>list fo all articles in that category</span>
        {JSON.stringify(catgoryData)}
      </p>
      {/* <Blog data={blogData.attributes} /> */}
    </Flex>
  )
}

export default blog

// sets whcih pages should be statucly rendered
export async function getStaticPaths() {
  const articlesRes = await fetchAPI("/blog-categories/", {
    urlParamsObject: { fields: ["slug"] },
  })
  const a = articlesRes.data
  a.forEach((x)=>{
    console.log(x.attributes,"xd ")

  }
  )
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
  // const blogData = await fetchAPI(`/blogs/`, {
  //   urlParamsObject: {
  //     filters: {
  //       slug: params.slug,
  //     },

  //     populate: {
  //       populate: "*",
  //       mainImage: {
  //         populate: "*",
  //       },
  //       cardData: {
  //         populate: "*",
  //       },
  //       blogCategories: {
  //         populate: "",
  //       },
  //       content: {
  //         populate: {
  //           image: "*",
  //         },
  //       },
  //     },
  //     encodeValuesOnly: true,
  //   },
  // })

  // return {
  //   props: { blogData: blogData.data[0] },
  //   revalidate: 1,
  // }

 

  const articlesRes = await fetchAPI("/blog-categories/",
  {
  urlParamsObject: {
        filters: {
          slug: params.category
        },
  
        populate: {
          populate: "*",
          blogs: {
            populate: "mainImage",
          },
          cardData: {
            populate: "*",
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
      }
    }
    )

  console.log(articlesRes,"aaaa ",params)
  return {
 
    props: { catgoryData: articlesRes.data[0].attributes },
      revalidate: 1,
  }
}
