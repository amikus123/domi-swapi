import React from "react"
import Atrribution, { PossibleData } from "../components/blog/Atrribution"
import Blog from "../components/blog/Blog"
import { fetchAPI } from "../lib/api"

const data: PossibleData[] = [
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

{/* {data.map((i, k) => {
  return <Atrribution data={i} key={k} />
})} */}

const blog = ({ blogData }) => {
  return (<>
    <Blog data={blogData}/>
    {/* {JSON.stringify(blogData)} */}
    </>
  )
}

export default blog

export async function getServerSideProps() {
  const articlesRes = await fetchAPI("/blogs", {
    populate: "*",
  })

  return {
    props: {
        blogData: articlesRes.data[0].attributes    ,
    },
  }
}
