import {
  Button,
  Flex,
  Heading,
  LinkBox,
  Stack,
  LinkOverlay,
  Text,
} from "@chakra-ui/react"
import NextLink from "next/link"
import { StrapiImage } from "../../lib/types/generalTypes"
import { MyImage } from "../general/Images"

interface HeroProps {
  image: StrapiImage
}

export default function Hero({ image }: HeroProps) {
  return (
    <Stack
      direction={{ base: "column", lg: "row" }}
      w="100%"
      justifyContent="flex-start"
      overflow="hidden"
    >
      <Flex
        p={8}
        // flex={1}
        minW={[0, 0, 0, 400, 700]}
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
                bg: "green.400",
                zIndex: -1,
              }}
            >
              Zdrowa dieta
            </Text>
            <br />
            <Text color={"green.400"} as={"span"}>
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
                    bg={"green.400"}
                    color={"white"}
                    _hover={{
                      bg: "green.500",
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
        <MyImage variant="fullW" image={image} />
        {/* <Img
          alt={"Kobieta z arbuzem"}
          fallbackSrc="https://via.placeholder.com/150"
          objectFit={"cover"}
          src={"/xd.jpg"}
        /> */}
      </Flex>
    </Stack>
  )
}
