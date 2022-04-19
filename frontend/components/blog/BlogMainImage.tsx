import React from "react"
import { Stack } from "@chakra-ui/react"
import Attribution, { AttributionProps } from "./Atrribution"
import {  MyImage } from "../general/Images"
import { StrapiImage } from "../../lib/types/generalTypes"
interface BlogMainImageProps {
  image: StrapiImage
  attributionData: AttributionProps
}
const BlogMainImage = ({ image, attributionData }: BlogMainImageProps) => {
  return (
    <Stack w="100%" justify="center" align="center">
      <MyImage image={image} variant="fullW" />
      <Attribution data={attributionData} />
    </Stack>
  )
}

export default BlogMainImage
