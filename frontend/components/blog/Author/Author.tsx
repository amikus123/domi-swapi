import { Stack, Avatar,Text } from '@chakra-ui/react'
import React from 'react'

const Author = () => {
  return (
    <Stack direction={"row"} spacing={4} align={"center"}>
    <Avatar
      src={"https://avatars0.githubusercontent.com/u/1164541?v=4"}
      alt={"Author"}
    />
    <Stack direction={"column"} spacing={0} fontSize={"sm"}>
      <Text fontWeight={600}>Achim Rolle</Text>
      <Text color={"gray.500"}>Feb 08, 2021 · 6min read</Text>
    </Stack>
  </Stack>
  )
}

export default Author