import React from "react"
import { Stack } from "@chakra-ui/react"
import Attribution, { AttributionProps } from "./Atrribution"
import { FullWidthImage } from "../general/Images"
interface BlogMainImageProps {
  image: any
  attributionData: AttributionProps
}
const BlogMainImage = ({ image, attributionData }: BlogMainImageProps) => {
  return (
    <Stack w="100%" justify="center" align="center">
      <FullWidthImage image={image} />
      <Attribution data={attributionData} />
    </Stack>
  )
}

export default BlogMainImage
