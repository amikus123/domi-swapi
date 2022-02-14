import React from "react"
import Seo from "../components/seo"
import { fetchAPI } from "../lib/api"
import Hero from "../components/landing/Hero"
import ThreeItems from "../components/landing/ThreeItems"
import ImageWithText from "../components/landing/ImageWithText"
import Testimonials from "../components/landing/Testimonials"
import Wall from "../components/landing/Wall"
import { Center, VStack } from "@chakra-ui/react"
const landing = () => {
  const space = 140
  return (
    <Center>
      <VStack spacing={space} mb={space}>
        <Hero />
        <ThreeItems />
        <ImageWithText />
        <Testimonials />
        <Wall />
      </VStack>
    </Center>
  )
}

export default landing

const Home = ({ articles, categories, homepage }) => {
  return (
    // <Layout categories={categories}>
    <>
      <Seo seo={homepage.attributes.seo} />
      {/* <div className="uk-section">
        <div className="uk-container uk-container -large">
          <h1>{homepage.attributes.hero.title}</h1> */}
      {/* </div>
      </div> */}
    </>
    // </Layout>
  )
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [articlesRes, categoriesRes, homepageRes] = await Promise.all([
    fetchAPI("/articles", { populate: "*" }),
    fetchAPI("/categories", { populate: "*" }),
    fetchAPI("/homepage", {
      populate: {
        hero: "*",
        seo: { populate: "*" },
      },
    }),
  ])

  return {
    props: {
      articles: articlesRes.data,
      categories: categoriesRes.data,
      homepage: homepageRes.data,
    },
    revalidate: 1,
  }
}
