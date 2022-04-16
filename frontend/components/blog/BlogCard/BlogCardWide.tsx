import {
  Box,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react"
import BlogTags from "../BlogTags"
import { MyImage } from "../../general/Images"
import NextLink from "next/link"
import { BlogPost } from "../../../lib/server/jsonParsers/parseBlog"
interface BlogCardProps {
  data: Temp
  category?: string
}

type Temp = Omit<BlogPost, "cardData" | "content">

const createLink = (slug: string, category: string) => {
  return `/blog/${category}/${slug}`
}

export default function BlogCardWide({
  data,
  category = data.blogCategories[0].slug,
}: BlogCardProps) {
  const {
    description,
    readingTime,
    title,
    blogCategories,
    mainImage,
    slug,
    date,
  } = data

  return (
    <NextLink href={createLink(slug, category)} passHref>
      <Flex h={"260px"} cursor="pointer" justify="space-between">
        <Stack w="60%" direction="column" spacing={2}>
          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
          >
            {title}
          </Heading>
          <Text color={"gray.500"}>
            {date}, {readingTime} min read
          </Text>

          <Text noOfLines={[3, 3]}>{description}</Text>

          <BlogTags blogCategories={blogCategories} pt={0} />
        </Stack>

        <Box w="33%" h="100%" py={8}>
          <MyImage variant="fullH" image={mainImage.image} />
        </Box>
      </Flex>
    </NextLink>
  )
}
