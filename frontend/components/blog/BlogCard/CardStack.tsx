import { Box, Divider, Stack } from "@chakra-ui/react"
import React from "react"
import { BlogCardFull } from "../../../lib/types/JSON/parsed/parsedBlogs"
import BlogCardWide from "./BlogCardWide"

interface CardStackProps {
  cards: BlogCardFull[]
}

const CardStack = ({ cards }: CardStackProps) => {
  return (
    <Stack spacing={6} w="100%" mw="80vw">
      {cards.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <BlogCardWide data={item} fullW={true} />

            {index === cards.length - 1 ? <Box py={4}></Box> : <Divider />}
          </React.Fragment>
        )
      })}
    </Stack>
  )
}

export default CardStack
