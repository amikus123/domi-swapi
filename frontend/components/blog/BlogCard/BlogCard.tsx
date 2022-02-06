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
} from "@chakra-ui/react"
import BlogTags from "../BlogTags"
import BlogDescriptionImage from "../content/BlogDescriptionImage"
import { BlogPost } from "../Blog"
import { getStrapiMedia } from "../../../lib/media"
import { StrapiImage } from "../../general/Images"
import NextLink from "next/link"
interface BlogCardProps {
  data: any
}
export default function BlogCard({ data }: BlogCardProps) {
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
    <Center py={6}>
      <NextLink href={href}>
        <Box
          cursor="pointer"
          maxW={"445px"}
          w={"full"}
          h="500px"
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          rounded={"md"}
          p={6}
          overflow={"hidden"}
        >
          <Box
            h={"210px"}
            bg={"gray.100"}
            mt={-6}
            mx={-6}
            mb={6}
            pos={"relative"}
          >
            <StrapiImage image={cardData.image} />
          </Box>
          <Stack spacing={3}>
            <Heading
              color={useColorModeValue("gray.700", "white")}
              fontSize={"2xl"}
              fontFamily={"body"}
            >
              {title}
            </Heading>
            <BlogTags blogCategories={blogCategories} pt={0} />

            <Text color={"gray.500"} maxH="100px" noOfLines={[2,2]}  >
              {cardData.description} {cardData.description}
            </Text>
            <Box pt={2}>
              <NextLink href={href} passHref>
                <Link color="blue.500" >
                  Czytaj dalej...
                </Link>
              </NextLink>
            </Box>
          </Stack>

          {/* <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
            <Avatar
              src={"https://avatars0.githubusercontent.com/u/1164541?v=4"}
              alt={"Author"}
            />
            <Stack direction={"column"} spacing={0} fontSize={"sm"}>
              <Text fontWeight={600}>Achim Rolle</Text>
              <Text color={"gray.500"}>Feb 08, 2021 · 6min read</Text>
            </Stack>
          </Stack> */}
        </Box>
      </NextLink>
    </Center>
  )
}