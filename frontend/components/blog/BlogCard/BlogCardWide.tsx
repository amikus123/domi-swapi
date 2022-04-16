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
import {
  MyImage,
} from "../../general/Images"
import NextLink from "next/link"
interface BlogCardProps {
  data: Temp
}

interface Temp {
  readingTime:number,
  description:string,
  title:string
} 


const createLink = (blogCategories:any[],slug:string) =>{
  
}

export default function BlogCardWide({ data }: BlogCardProps) {
  const {
    description,
    readingTime,
    title,
  } = data





  return (
    <NextLink href="#">
      <Flex h={"260px"} cursor="pointer" justify="space-between">
        <Stack w="60%" direction="column" spacing={2}>
          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
          >
            {title}
          </Heading>
          <Text color={"gray.500"}>Feb 08, 2021· {readingTime} min read</Text>

          <Text noOfLines={[3, 3]}>
            {description}
          </Text>

          {/* <BlogTags blogCategories={blogCategories} pt={0} /> */}
        </Stack>

        <Box w="33%" h="100%" py={8}>

          {/* <MyImage variant="fullH" image={mainImage.image}  /> */}
        </Box>
      </Flex>
    </NextLink>
  )
}
