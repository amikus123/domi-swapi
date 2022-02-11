import Image from "next/image"
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Link,
  Flex,
} from "@chakra-ui/react"
import BlogTags from "../BlogTags"
import {
  FullHeightImage,
  FullWidthImage,
  StrapiImage,
} from "../../general/Images"
import NextLink from "next/link"
interface TextCardProps {
  data: any
}
export default function TextCard({ data }: TextCardProps) {
  const {
    content,
    date,
    description,
    mainImage,
    title,
    blogCategories,
    cardData,
    slug,
  } = data

  const x = [
    "createdAt",
    "updatedAt",
    "title",
    "description",
    "date",
    "slug",
    "mainImage",
    "cardData",
    "blogCategories",
    "content",
  ]
  const href = `/blogs/${slug}`
  return (
    <NextLink href="#">
      <Flex
        h={"120px"}
        w="100%"
        cursor="pointer"
        justify="space-between"
        px={4}
      >
        <Heading
          color={useColorModeValue("gray.700", "white")}
          fontSize={"2xl"}
          fontFamily={"body"}
          pr={4}
          w="fit-content"
        >
          {title}
        </Heading>
        <Box h="100%" w={100}>
          <FullHeightImage image={mainImage.image} margin={0} />
        </Box>
      </Flex>
    </NextLink>
  )
}