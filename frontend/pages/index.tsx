import React from "react";
import { Center, VStack } from "@chakra-ui/react";
import Hero from "../components/landing/Hero";
import ThreeItems from "../components/landing/ThreeItems";
import ImageWithText from "../components/landing/ImageWithText";
import Testimonials from "../components/landing/Testimonials";
import Wall from "../components/landing/Wall";

const landing = () => {
  const space = 140;
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
  );
};

export default landing;
