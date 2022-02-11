import { Button, Divider, Flex, Stack } from "@chakra-ui/react"
import React from "react"
import BlogCardWide from "./BlogCardWide"

interface CardStackProps {
  cards: any[]
}

const CardStack = ({ cards }: CardStackProps) => {
  return (
    <Stack spacing={6}>
      {cards.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <BlogCardWide data={item} />

            {index === cards.length ? null : <Divider />}
          </React.Fragment>
        )
      })}
      <Flex py={4} pb={8} align="center" justify="center">
        <Button colorScheme="teal" size="lg">
          Pokaż więcej
        </Button>
      </Flex>
    </Stack>
  )
}

export default CardStack
