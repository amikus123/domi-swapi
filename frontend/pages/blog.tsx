import React from "react"
import Atrribution, { AttributionProps } from "../components/blog/Atrribution"
import Blog from "../components/blog/Blog"
import { fetchAPI } from "../lib/api"

const data: AttributionProps[] = [
  { pageName: "unsplash", authorLink: "a" },
  {
    authorName: "asdasd",
    pageName: "Adasd",
    authorLink: "assad",
    pageLink: "as",
  },
  {},
  {},
]

{
  /* {data.map((i, k) => {
  return <Atrribution data={i} key={k} />
})} */
}

const blog = ({ blogData }) => {
  return (
    <>
      {/* <p>{JSON.stringify(blogData)}</p>
      <br />

      <p>{JSON.stringify(Object.keys(blogData.data.attributes))}</p>
      <br /> */}
      <Blog data={blogData.data.attributes}/>
    </>
  )
}

export default blog

export async function getServerSideProps() {
  // fetching overall data
  const blogData = await fetchAPI("/blogs/1", {
    populate: "*",
    encodeValuesOnly: true,
  })
  // fetching dynamic zone images
  const imageData = await fetchAPI("/blogs/1", {
    populate: {
      content: {
        populate: {
          image: "*",
        },
      },
    },
    encodeValuesOnly: true,
  })

  // replacing blogData content with imageData contnet, makes image elements accessbile
  blogData.data.attributes.content = imageData.data.attributes.content

  return {
    props: {
      blogData,
    },
  }
}
