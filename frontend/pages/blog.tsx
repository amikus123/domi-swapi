import React from "react"
import Atrribution, { PossibleData } from "../components/blog/Atrribution"
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


const blog = ({ movies }) => {
  return (
    <div>
      {JSON.stringify(movies)}
      {data.map((i, k) => {
        return <Atrribution data={i} key={k} />
      })}
    </div>
  )
}

export default blog

export async function getServerSideProps() {
  // const res = await fetch(`${API_URL}/ingredient`)

  const articlesRes = await fetchAPI("/blogs/")

  console.log(articlesRes)
  return {
    props: {
      movies: arti