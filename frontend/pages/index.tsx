import React from "react"
import { Center, VStack } from "@chakra-ui/react"
import Hero from "../components/landing/Hero"
import { getBlogCardDatas } from "../lib/server/fetching/getBlogPost"
import { BlogCardFull } from "../lib/types/JSON/parsed/parsedBlogs"
import NewestArticles from "../components/landing/NewestArticles"
import { getGlobal } from "../lib/server/fetching/getGlobal"
import { StrapiImage } from "../lib/types/generalTypes"
import { NextSeo } from "next-seo"
import { landingSEO } from "../lib/SEO"

interface LandingPageProps {
  cards: BlogCardFull[]
  image: StrapiImage
}

const LandingPage = ({ cards, image }: LandingPageProps) => {
  return (
    <Center w="100%">
      <NextSeo {...landingSEO} />
      <VStack spacing={100} w="100%">
        <Hero image={image} />
        <NewestArticles cards={cards} />
      </VStack>
    </Center>
  )
}

export default LandingPage

export async function getStaticProps() {
  const cards = await getBlogCardDatas()
  const image = await getGlobal()
  return {
    props: { cards, image },
  }
}
