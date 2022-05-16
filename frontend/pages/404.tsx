import React from "react"
import { Box, Heading, Text, Button, Flex } from "@chakra-ui/react"
import NextLink from "next/link"
import { NextSeo } from "next-seo"
import { _404SEO } from "../lib/SEO"

const errorPage = () => (
  <>
    <NextSeo {..._404SEO} />

    <Flex
      grow={1}
      minH="100%"
      direction="column"
      align="center"
      justify="center"
    >
      <Box textAlign="center" py={10} px={6}>
        <Heading
          display="inline-block"
          as="h2"
          size="2xl"
          bgGradient="linear(to-r, teal.400, teal.600)"
          backgroundClip="text"
        >
          404
        </Heading>
        <Text fontSize="18px" mt={3} mb={2}>
          Strona nie istnieje
        </Text>
        <Text color="gray.500" mb={6}>
          Materiały mogły zostać usunięte
        </Text>

        <Button
          colorScheme="teal"
          bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
          color="white"
          variant="solid"
        >
          <NextLink href="/">Strona główna</NextLink>
        </Button>
      </Box>
    </Flex>
  </>
)

export default errorPage
