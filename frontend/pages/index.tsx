import React, { useEffect } from "react"
import { Center, VStack } from "@chakra-ui/react"
import Hero from "../components/landing/Hero"
import ThreeItems from "../components/landing/ThreeItems"
import ImageWithText from "../components/landing/ImageWithText"
import Testimonials from "../components/landing/Testimonials"
import Wall from "../components/landing/Wall"
import { getBlogCardDatas } from "../lib/server/fetching/getBlogPost"
import { BlogCardFull } from "../lib/types/JSON/parsed/parsedBlogs"
import NewestArticles from "../components/landing/NewestArticles"
import { getGlobal } from "../lib/server/fetching/getGlobal"
import { StrapiImage } from "../lib/types/generalTypes"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface LandingPageProps {
  cards: BlogCardFull[]
  image: StrapiImage
}

// eslint-disable-next-line no-empty-pattern
const LandingPage = ({ cards, image }: LandingPageProps) => {
  useEffect(() => {
    console.log(image, cards)
  }, [cards, image])
  const space = 140
  return (
    <Center w="100%">
      <VStack spacing={space} mb={space} w="100%">
        <Hero image={image} />
        <NewestArticles cards={cards} />
        {/* <ThreeItems /> */}
        {/* <ImageWithText /> */}
        {/* <Testimonials /> */}
        {/* <Wall /> */}
      </VStack>
    </Center>
  )
}

export default LandingPage

export async function getStaticProps() {
  const cards = await getBlogCardDatas()
  const image = await getGlobal()
  return {
    props: { cards, image }, // will be passed to the page component as props
  }
}
