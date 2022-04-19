import { Stack } from "@chakra-ui/react"

const index = ({ data = {}, dataRaw = {} }) => {
  console.log(data, dataRaw, "AASSDDD")

  return (
    <Stack justify="flex-start" align="center" w="100%" textAlign="left">
      <p>{JSON.stringify(data)}</p>
      <p>{JSON.stringify(dataRaw)}</p>
    </Stack>
  )
}

export default index

export async function getServerSideProps() {
  // const { data, rawJSON } = await

  return {
    props: { data: {}, dataRaw: {} },
  }
}
