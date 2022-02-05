import React from "react"
import { Stack } from "@chakra-ui/react"
import { FullWidthImage } from "../image"
import Attribution, { AttributionProps } from "./Atrribution"
interface BlogMainImageProps {
  image: any
  attributionData: AttributionProps
}
const BlogMainImage = ({ image, attributionData }: BlogMainImageProps) => {
  return (
    <Stack w="100%" justify="center" align="center">
      <FullWidthImage image={image.data.attributes.formats.large} />
      <Attribution data={attributionData} />
    </Stack>
  )
}

export default BlogMainImage
