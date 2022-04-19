import {
  Box,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Flex,
  LinkOverlay,
  LinkBox,
} from "@chakra-ui/react"
import BlogTags from "../BlogTags"
import { MyImage } from "../../general/Images"
import NextLink from "next/link"
import { BlogCardFull } from "../../../lib/types/JSON/parsed/parsedBlogs"
interface BlogCardProps {
  data: BlogCardFull
  categorySlug?: string
  fullW?: boolean
}

// export type BlogCardData = Omit<BlogPost,  "content">

const createLink = (slug: string, category: string) => {
  return `/blog/${category}/${slug}`
}

export default function BlogCardWide({
  data,
  categorySlug = data.blogCategories[0].slug,
  fullW = false,
}: BlogCardProps) {
  const {
    description,
    readingTime,
    title,
    blogCategories,
    image: mainImage,
    slug,
    date,
  } = data

  return (
    <LinkBox
      as={Flex}
      h={["unset", "unset", "300px"]}
      w={["unset", "unset", fullW ? "unset" : "675px"]}
      cursor="pointer"
      justify="space-between"
    >
      <Stack w={["100%", "100%", "50%"]} direction="column" spacing={4}>
        <Heading
          color={useColorModeValue("gray.700", "white")}
          fontSize={"2xl"}
          fontFamily={"body"}
        >
          <NextLink href={createLink(slug, categorySlug)} passHref>
            <LinkOverlay>{title}</LinkOverlay>
          </NextLink>
        </Heading>
        <Text color={"gray.500"}>
          {date} - {readingTime} min
        </Text>

        <Text noOfLines={[3, 3]}>{description}</Text>
        <Box display={["flex", "flex", "none"]} justifyContent="center">
          <MyImage variant="fullW" image={mainImage.image} idealHeight={150} />
        </Box>

        <BlogTags blogCategories={blogCategories}  />
      </Stack>

      <Box display={["none", "none", "block"]} w="50%" h="100%">
        <MyImage variant="fullH" image={mainImage.image} />
      </Box>
    </LinkBox>
  )
}
