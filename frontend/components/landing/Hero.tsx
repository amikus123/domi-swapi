import {
  Button,
  Flex,
  Heading,
  Image,
  LinkBox,
  Stack,
  LinkOverlay,
  Text,
} from "@chakra-ui/react"
import NextImage from "next/image"
import NextLink from "next/link"

export default function SplitScreen() {
  return (
    <Stack
      minH={"100vh"}
      direction={{ base: "column", lg: "row" }}
      minW={[0, 0, 0, 0, 1200]}
      maxW="100%"
      justifyContent="flex-start"
      overflow="hidden"
    >
      <Flex
        p={8}
        flex={1}
        overflow="hidden"
        align={"center"}
        justify={"center"}
      >
        <Stack spacing={6} w={"full"} maxW={"lg"}>
          <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: { base: "20%", md: "30%" },
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "teal.400",
                zIndex: -1,
              }}
            >
              Zdrowa dieta
            </Text>
            <br />
            <Text color={"teal.400"} as={"span"}>
              Na wyciągnięcie ręki
            </Text>
          </Heading>
          <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
            Lorem ipsum dolor sit amet. Qui sequi minima ut expedita saepe id
            numquam maiores. Ut cupiditate modi et dolorem laudantium a
            dignissimos amet.
          </Text>
          <Stack direction={{ base: "row", md: "row" }} spacing={4}>
            <LinkBox as="div" w="min-content">
              <NextLink href="/diet" passHref>
                <LinkOverlay>
                  <Button
                    rounded={"full"}
                    bg={"teal.400"}
                    color={"white"}
                    _hover={{
                      bg: "teal.500",
                    }}
                  >
                    Zobacz diete
                  </Button>
                </LinkOverlay>
              </NextLink>
            </LinkBox>

            <LinkBox as="div" w="min-content">
              <NextLink href="/blog" passHref>
                <LinkOverlay>
                  <Button rounded={"full"}>Czytaj bloga</Button>
                </LinkOverlay>
              </NextLink>
            </LinkBox>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image alt={"Kobieta z arbuzem"} objectFit={"cover"} src={"/xd.jpg"} />
      </Flex>
    </Stack>
  )
}
