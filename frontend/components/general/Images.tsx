import { getStrapiMedia } from "../../lib/media"
import NextImage from "next/image"
import { Box, chakra, Image } from "@chakra-ui/react"
import { FormatImage, StrapiImage } from "../../lib/types/generalTypes"

export const getImageWithBestWidth = (
  image: StrapiImage,
  idealWidth = 1000
) => {
  // * gets  the  next biggest size
  const { formats, url } = image
  if (formats == null) {
    return url
  }
  const sizeNames = Object.keys(formats)
  console.log(sizeNames)
  let smallestDifference = 999999
  let smallestSize = formats[sizeNames[0]]
  sizeNames.forEach((sizeName) => {
    const item = formats[sizeName]
    const offset = item.width - idealWidth

    if (offset > 0 && offset < smallestDifference) {
      smallestDifference = offset
      smallestSize = item
    }
  })
  smallestSize =
    smallestDifference == 999999
      ? formats[sizeNames[sizeNames.length - 1]]
      : smallestSize
  return smallestSize.url
}
interface ImageProps {
  image: StrapiImage
  idealWidth?: number
  idealHeight?: number
  variant?: "full" | "fullH" | "fullW"
  [key: string]: string | number | StrapiImage
}

const BlogImg = chakra(Image, {
  shouldForwardProp: (prop) =>
    ["height", "width", "quality", "src", "alt"].includes(prop),
})

export const MyImage = ({
  image,
  idealWidth = 1000,
  idealHeight = 1000,
  variant,
  ...rest
}: ImageProps) => {
  const { alternativeText = "" } = image

  return (
    <>
      {JSON.stringify(image)}

      {variant === "full" ? (
        <NextImage
          src={getStrapiMedia(getImageWithBestWidth(image, idealWidth))}
          alt={alternativeText}
          layout="fill"
          aria-label={alternativeText}
          {...rest}
        />
      ) : variant === "fullH" ? (
        <Box className="fullHeightImageWrap" style={{ height: "100%" }}>
          <NextImage
            src={getStrapiMedia(getImageWithBestWidth(image, idealHeight))}
            objectFit="contain"
            alt={alternativeText}
            layout="fill"
            className="fullHeightImage"
            aria-label={alternativeText}
            {...rest}
          />
        </Box>
      ) : (
        <BlogImg
          {...rest}
          objectFit="contain"
          src={getStrapiMedia(getImageWithBestWidth(image, idealWidth))}
          alt={alternativeText}
          layout="fill"
          className=""
          aria-label={alternativeText}
        />
      )}
    </>
  )
}

const b = {
  data: [
    {
      id: 1,
      attributes: {
        name: "Zdrowie",
        slug: "zdrowie",
        description: "Naucz się jak dbać o siebie.",
        createdAt: "2022-02-03T15:55:17.356Z",
        updatedAt: "2022-03-17T17:27:08.236Z",
        blogs: {
          data: [
            {
              id: 2,
              attributes: {
                createdAt: "2022-02-14T12:20:33.280Z",
                updatedAt: "2022-04-15T19:55:06.253Z",
                title: "sda",
                description: "asd",
                date: "2022-02-22",
                slug: "test",
                readingTime: null,
                cardData: {
                  id: 6,
                  description: "asdsd",
                  image: {
                    data: {
                      id: 15,
                      attributes: {
                        name: "1_NFUbaFmS4AfIs1pyntRpzg.jpeg",
                        alternativeText: "kochankowie",
                        caption: "Milosc milosc",
                        width: 700,
                        height: 464,
                        formats: {
                          thumbnail: {
                            name: "thumbnail_1_NFUbaFmS4AfIs1pyntRpzg.jpeg",
                            hash: "thumbnail_1_NF_Uba_Fm_S4_Af_Is1pynt_Rpzg_26b8f56fec",
                            ext: ".jpeg",
                            mime: "image/jpeg",
                            width: 235,
                            height: 156,
                            size: 11.41,
                            path: null,
                            url: "/uploads/thumbnail_1_NF_Uba_Fm_S4_Af_Is1pynt_Rpzg_26b8f56fec.jpeg",
                          },
                          small: {
                            name: "small_1_NFUbaFmS4AfIs1pyntRpzg.jpeg",
                            hash: "small_1_NF_Uba_Fm_S4_Af_Is1pynt_Rpzg_26b8f56fec",
                            ext: ".jpeg",
                            mime: "image/jpeg",
                            width: 500,
                            height: 331,
                            size: 40.82,
                            path: null,
                            url: "/uploads/small_1_NF_Uba_Fm_S4_Af_Is1pynt_Rpzg_26b8f56fec.jpeg",
                          },
                        },
                        hash: "1_NF_Uba_Fm_S4_Af_Is1pynt_Rpzg_26b8f56fec",
                        ext: ".jpeg",
                        mime: "image/jpeg",
                        size: 80.72,
                        url: "/uploads/1_NF_Uba_Fm_S4_Af_Is1pynt_Rpzg_26b8f56fec.jpeg",
                        previewUrl: null,
                        provider: "local",
                        provider_metadata: null,
                        createdAt: "2022-02-03T19:13:38.353Z",
                        updatedAt: "2022-02-06T17:34:42.737Z",
                      },
                    },
                  },
                },
                blogCategories: {
                  data: [
                    {
                      id: 1,
                      attributes: {
                        name: "Zdrowie",
                        slug: "zdrowie",
                        description: "Naucz się jak dbać o siebie.",
                        createdAt: "2022-02-03T15:55:17.356Z",
                        updatedAt: "2022-03-17T17:27:08.236Z",
                      },
                    },
                    {
                      id: 2,
                      attributes: {
                        name: "Ćwiczenia",
                        slug: "cwiczenia",
                        description: "opis kategorii",
                        createdAt: "2022-02-03T15:57:13.957Z",
                        updatedAt: "2022-03-17T17:31:34.100Z",
                      },
                    },
                  ],
                },
                mainImage: {
                  id: 5,
                  description: null,
                  image: {
                    data: {
                      id: 15,
                      attributes: {
                        name: "1_NFUbaFmS4AfIs1pyntRpzg.jpeg",
                        alternativeText: "kochankowie",
                        caption: "Milosc milosc",
                        width: 700,
                        height: 464,
                        formats: {
                          thumbnail: {
                            name: "thumbnail_1_NFUbaFmS4AfIs1pyntRpzg.jpeg",
                            hash: "thumbnail_1_NF_Uba_Fm_S4_Af_Is1pynt_Rpzg_26b8f56fec",
                            ext: ".jpeg",
                            mime: "image/jpeg",
                            width: 235,
                            height: 156,
                            size: 11.41,
                            path: null,
                            url: "/uploads/thumbnail_1_NF_Uba_Fm_S4_Af_Is1pynt_Rpzg_26b8f56fec.jpeg",
                          },
                          small: {
                            name: "small_1_NFUbaFmS4AfIs1pyntRpzg.jpeg",
                            hash: "small_1_NF_Uba_Fm_S4_Af_Is1pynt_Rpzg_26b8f56fec",
                            ext: ".jpeg",
                            mime: "image/jpeg",
                            width: 500,
                            height: 331,
                            size: 40.82,
                            path: null,
                            url: "/uploads/small_1_NF_Uba_Fm_S4_Af_Is1pynt_Rpzg_26b8f56fec.jpeg",
                          },
                        },
                        hash: "1_NF_Uba_Fm_S4_Af_Is1pynt_Rpzg_26b8f56fec",
                        ext: ".jpeg",
                        mime: "image/jpeg",
                        size: 80.72,
                        url: "/uploads/1_NF_Uba_Fm_S4_Af_Is1pynt_Rpzg_26b8f56fec.jpeg",
                        previewUrl: null,
                        provider: "local",
                        provider_metadata: null,
                        createdAt: "2022-02-03T19:13:38.353Z",
                        updatedAt: "2022-02-06T17:34:42.737Z",
                      },
                    },
                  },
                },
              },
            },
          ],
        },
      },
    },
  ],
}
