import { Flex, Button } from "@chakra-ui/react"
import React from "react"

const RelatedBlogPosts = () => {
  return (
    <>
      <Flex py={4} pb={8}>
        <Button colorScheme="teal" size="lg">
          Więcej artykułów
        </Button>
      </Flex>

      {/* <CardStack cards={[data, data, data, data]} category={category} /> */}
    </>
  )
}

export default RelatedBlogPosts
