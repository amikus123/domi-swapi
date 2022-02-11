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
interface BlogCardProps {
  data: any
}
export default function BlogCardWide({ data }: BlogCardProps) {
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
      <Flex h={"260px"} cursor="pointer" justify="space-between">
        <Flex w="60%" direction="column" justify="space-between">
          <Stack direction={"row"} spacing={4} align={"center"}>
            <Avatar
              src={"https://avatars0.githubusercontent.com/u/1164541?v=4"}
              alt={"Author"}
            />
            <Stack direction={"column"} spacing={0} fontSize={"sm"}>
              <Text fontWeight={600}>Achim Rolle</Text>
              <Text color={"gray.500"}>Feb 08, 2021 · 6min read</Text>
            </Stack>
          </Stack>
          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
          >
            {title}
          </Heading>

          <Text noOfLines={[3, 3]}>
            {cardData.description} {cardData.description}
          </Text>

          <BlogTags blogCategories={blogCategories} pt={0} />
        </Flex>

        <Box w="33%" h="100%" py={8}>
          <FullHeightImage image={mainImage.image} margin={0} />
        </Box>
      </Flex>
    </NextLink>
  )
}
