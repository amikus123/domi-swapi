import React from "react"
import NextImage from "next/image"
import { Flex, Box } from "@chakra-ui/react"
import { getStrapiMedia } from "../../../../lib/media"

interface DishLeftProps {
  image: any
}

const fixHeight = (w: number, h: number) => {
  const ratio = w / h
  //* w 100 h 300  1/3
  return { h: 200, w: 200 * ratio }
}
const DishLeft = ({ image }: DishLeftProps) => {
  const attributes = image.data.attributes
  const { alternativeText, formats } = attributes
  const { height, width, url } = formats.small
  const { w, h } = fixHeight(width, height)
  return (
    <Flex
      w={["100%", "100%", "300px"]}
      direction="column"
      justify="center"
      align="center"
      pt={[0, 0, 12]}
      py={[6, 6, 0]}
    >
      <Box w={w} h={h} overflow="hidden">
        <NextImage
          width={w}
          height={h}
          src={getStrapiMedia(url)}
          alt={alternativeText}
        />
      </Box>
    </Flex>
  )
}

export default DishLeft
// * example of image
// {
//   "data": {
//     "id": 18,
//     "attributes": {
//       "name": "spaghtetti.jpg",
//       "alternativeText": "spaghtetti.jpg",
//       "caption": "spaghtetti.jpg",
//       "width": 6000,
//       "height": 4000,
//       "formats": {
//         "thumbnail": {
//           "name": "thumbnail_spaghtetti.jpg",
//           "hash": "thumbnail_spaghtetti_2e33fb7a5f",
//           "ext": ".jpg",
//           "mime": "image/jpeg",
//           "width": 234,
//           "height": 156,
//           "size": 10.01,
//           "path": null,
//           "url": "/uploads/thumbnail_spaghtetti_2e33fb7a5f.jpg"
//         },
//         "large": {
//           "name": "large_spaghtetti.jpg",
//           "hash": "large_spaghtetti_2e33fb7a5f",
//           "ext": ".jpg",
//           "mime": "image/jpeg",
//           "width": 1000,
//           "height": 667,
//           "size": 105.31,
//           "path": null,
//           "url": "/uploads/large_spaghtetti_2e33fb7a5f.jpg"
//         },
//         "medium": {
//           "name": "medium_spaghtetti.jpg",
//           "hash": "medium_spaghtetti_2e33fb7a5f",
//           "ext": ".jpg",
//           "mime": "image/jpeg",
//           "width": 750,
//           "height": 500,
//           "size": 64.7,
//           "path": null,
//           "url": "/uploads/medium_spaghtetti_2e33fb7a5f.jpg"
//         },
//         "small": {
//           "name": "small_spaghtetti.jpg",
//           "hash": "small_spaghtetti_2e33fb7a5f",
//           "ext": ".jpg",
//           "mime": "image/jpeg",
//           "width": 500,
//           "height": 333,
//           "size": 33.53,
//           "path": null,
//           "url": "/uploads/small_spaghtetti_2e33fb7a5f.jpg"
//         }
//       },
//       "hash": "spaghtetti_2e33fb7a5f",
//       "ext": ".jpg",
//       "mime": "image/jpeg",
//       "size": 3248.26,
//       "url": "/uploads/spaghtetti_2e33fb7a5f.jpg",
//       "previewUrl": null,
//       "provider": "local",
//       "provider_metadata": null,
//       "createdAt": "2022-02-22T13:34:00.328Z",
//       "updatedAt": "2022-02-22T13:34:00.328Z"
//     }
//   }
// }
