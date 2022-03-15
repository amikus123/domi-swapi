import { Flex, Box, Image, Badge, useColorModeValue } from "@chakra-ui/react"
import { FullWidthImage, StrapiImage } from "../../../general/Images"
import { ParsedDiet } from "../../api/parseJSON/parseDiets"

const data = {
  isNew: true,
  imageURL:
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80",
  name: "Wayfarer Classic",
  price: 4.5,
  rating: 4.2,
  numReviews: 34,
}

interface DietCardProps {
  diet: ParsedDiet
}

export default function DietCard({ diet }: DietCardProps) {
  const { dietImage, id, name } = diet
  return (
    <Flex w="full" alignItems="center" justifyContent="center">
      <Box
        bg={useColorModeValue("white", "gray.800")}
        w={300}
        h={400}
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
        roundedTop="lg"
      >
        <FullWidthImage
          image={dietImage}
          idealWidth={300}
          roundedTop="lg"
          margin={0}
          overflow="hidden"
        />
        <Box>
          <Flex justifyContent="space-between" alignContent="center">
            <Box
              pt={4}
              pl={2}
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {name}
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  )
}
