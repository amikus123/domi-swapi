import React from "react"

import Hero from "../components/landing/Hero"
import ThreeItems from "../components/landing/ThreeItems"
import ImageWithText from "../components/landing/ImageWithText"
import Testimonials from "../components/landing/Testimonials"
import Wall from "../components/landing/Wall"
import {  Center, VStack } from "@chakra-ui/react"
const landing = () => {
const space = 140
  return (
    <Center>
      <VStack spacing={space} mb={space}>
        <Hero />
        <ThreeItems />
        <ImageWithText />
        <Testimonials />
        <Wall  />
      </VStack>
    </Center>
  )
}

export default landing
