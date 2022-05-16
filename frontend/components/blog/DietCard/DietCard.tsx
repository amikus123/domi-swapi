import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react"
import NextLink from "next/link"
import { StrapiImage } from "../../../lib/types/generalTypes"
import { MyImage } from "../../general/Images"
import "react-datepicker/dist/react-datepicker.css"
import { BlogCategory } from "../../../lib/types/JSON/parsed/parsedBlogs"
import BlogTags from "../BlogTags"

interface DietCardProps {
  slug: string | null
  name: string
  image: StrapiImage
  description: string
  blogCategories?: BlogCategory[]
  isBlogLink?: boolean
}

export default function DietCard({
  image,
  name,
  slug,
  description,
  blogCategories = [],
}: DietCardProps) {
  return (
    <LinkBox py={6} as={Center}>
      <Box
        cursor="pointer"
        w={[300]}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <Box h={300} bg={"gray.100"} mt={-6} mx={-6} mb={6} pos={"relative"}>
          <MyImage
            variant="fullH"
            image={image}
            roundedTop="lg"
            overflow="hidden"
          />
        </Box>
        <Stack>
          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
          >
            {slug ? (
              <NextLink
                href={
                  blogCategories.length > 0
                    ? `/blog/${blogCategories[0].slug}/${slug}`
                    : `/blog/${slug}`
                }
                passHref
              >
                <LinkOverlay>{name}</LinkOverlay>
              </NextLink>
            ) : (
              <Text>{name}</Text>
            )}
          </Heading>
          {blogCategories.length > 0 ? (
            <Box py={2}>
              <BlogTags blogCategories={blogCategories} />
            </Box>
          ) : null}
          <Text color={"gray.500"}>{description}</Text>
        </Stack>
      </Box>
    </LinkBox>
  )
}
