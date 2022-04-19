/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Box,
  useColorModeValue,
  Text,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react"
import { MyImage } from "../Images"
import NextLink from "next/link"
import { StrapiImage } from "../../../lib/types/generalTypes"

interface DietCardProps {
  image: StrapiImage
  name: string
  onClick?: () => void
  href?: null | string
}

const PlainCard = ({
  image,
  name,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick = () => {},
}: DietCardProps) => {
  return (
    <Box
      onClick={onClick}
      mt={10}
      mx={2}
      bg={useColorModeValue("white", "gray.800")}
      w={200}
      borderWidth="1px"
      rounded="lg"
      shadow="lg"
      position="relative"
      roundedTop="lg"
      overflow="hidden"
    >
      <MyImage
        variant="fullW"
        image={image}
        idealWidth={200}
        w={200}
        h={200}
        roundedTop="lg"
        overflow="hidden"
      />
      <Text
        py={4}
        pl={2}
        fontSize="2xl"
        fontWeight="semibold"
        lineHeight="tight"
        isTruncated
      >
        {name}
      </Text>
    </Box>
  )
}

const LinkCard = ({
  image,
  name,
  onClick = () => {},
  href = null,
}: DietCardProps) => {
  return (
    <LinkBox
      onClick={onClick}
      mt={10}
      mx={2}
      bg={useColorModeValue("white", "gray.800")}
      w={200}
      borderWidth="1px"
      rounded="lg"
      shadow="lg"
      position="relative"
      roundedTop="lg"
      overflow="hidden"
    >
      <MyImage
        variant="fullW"
        image={image}
        idealWidth={200}
        w={200}
        h={200}
        roundedTop="lg"
        overflow="hidden"
      />
      <NextLink href={href} passHref>
        <LinkOverlay
          py={4}
          pl={2}
          fontSize="2xl"
          fontWeight="semibold"
          lineHeight="tight"
          isTruncated
        >
          {name}
        </LinkOverlay>
      </NextLink>
    </LinkBox>
  )
}

export default function DietCard({
  image,
  name,
  onClick = () => {},
  href = null,
}: DietCardProps) {
  return (
    <>
      {href === null ? (
        <PlainCard image={image} name={name} onClick={onClick} />
      ) : (
        <LinkCard image={image} name={name} href={href} onClick={onClick} />
      )}
    </>
  )
}
