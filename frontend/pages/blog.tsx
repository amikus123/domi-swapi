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
      <Blog data={blogData.data.attributes} />
  )
}


// xlarge: 1920,
// large: 1000,
// medium: 750,
// small: 500,
// xsmall: 64
export default blog

export async function getServerSideProps() {

  const imageData = await fetchAPI("/blogs/1", {
    populate: {
      populate: "*",
      mainImage: {
        populate: "*",
      },
      content: {
        populate: {
          image: "*",
        },
      },
    },
    encodeValuesOnly: true,
  })


  return {
    props: {
      blogData: imageData,
    },
  }
}
