import { Button, Divider, Flex, Stack } from "@chakra-ui/react"
import { random } from "lodash"
import React, { useEffect } from "react"
import { fetchAPI } from "../../../lib/api"
import BlogCardWide from "./BlogCardWide"

interface CardStackProps {
  cards: any[]
  category: string
}

const fecthBlogCategory = async (category: string) => {
  const articlesRes = await fetchAPI("/blog-categories", {
    urlParamsObject: {
      fields: ["slug"],
      filters: {
        slug: category,
      },
      populate: "*",
      encodeValuesOnly: true,
    },
  })
  return articlesRes.data
}

const CardStack = ({ cards, category }: CardStackProps) => {
  useEffect(() => {
    const a = async () => {
      try {
        const xd = await fecthBlogCategory(category)
        console.log(random(1, 12), xd)
      } catch (e) {
        console.log(e, "XDD")
      }
    }
    a()
  })

  return (
    <Stack spacing={6}>
      {/* {cards.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <BlogCardWide data={item} />

            {index === cards.length ? null : <Divider />}
          </React.Fragment>
        )
      })} */}
      <Flex py={4} pb={8} align="center" justify="center">
        <Button colorScheme="teal" size="lg">
          Pokaż więcej
        </Button>
      </Flex>
    </Stack>
  )
}

export default CardStack


