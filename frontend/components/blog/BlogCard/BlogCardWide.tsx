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
    // h={"260px"}
    <LinkBox as={Flex} h={["unset","unset","300px"]} cursor="pointer" justify="space-between">
      <Stack w={["100%", "100%", "50%"]} direction="column" spacing={4}>
        <Heading
          color={useColorModeValue("gray.700", "white")}
          fontSize={"2xl"}
          fontFamily={"body"}
        >
          <NextLink href={createLink(slug, category)} passHref>
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

        <BlogTags blogCategories={blogCategories} pt={0} />
        {/* w="100%" h={200} */}
      </Stack>

      <Box display={["none", "none", "block"]} w="50%" h="100%">
        <MyImage variant="fullH" image={mainImage.image}  />
      </Box>
    </LinkBox>
  )
}
