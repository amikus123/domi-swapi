import React from "react"
import {
  Flex,
  Box,
  Stack,
  Heading,
  Text,
} from "@chakra-ui/react"

interface LayoutProps {
  header: string
  subHeader: string
  children: React.ReactNode
}
const Layout = ({ children, header, subHeader }: LayoutProps) => {
  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.50"}>
      <Stack spacing={8}  minW={["300px","400px"]} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>{header}</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            {subHeader}
          </Text>
        </Stack>
        <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
          {children}
        </Box>
      </Stack>
    </Flex>
  )
}

export default Layout
