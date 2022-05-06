import { ImageRaw, StrapiImage } from "../../types/generalTypes"
import { BlogImage } from "../../types/JSON/parsed/parsedBlogs"
import { BlogImageJson } from "../../types/JSON/raw/blogJsonTypes"

export const handleImage = (raw: ImageRaw): StrapiImage => {
  const { attributes } = raw.data
  return attributes
}

export const handleBlogImage = (img: BlogImageJson): BlogImage => {
  const { description, image } = img
  const { attributes } = image.data
  return {
    description,
    image: attributes,
  }
}

const a = {
  data: [
    {
      id: 1,
      attributes: {
        name: "zdrowie",
        slug: "zdrowie",
        description:
          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.\n\n",
        createdAt: "2022-05-06T21:00:21.965Z",
        updatedAt: "2022-05-06T21:00:21.965Z",
        blogs: {
          data: [
            {
              id: 1,
              attributes: {
                title: "Jak być zdrowym",
                description:
                  "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.\n\n",
                date: "2022-05-17",
                slug: "blog",
                readingTime: 6,
                createdAt: "2022-05-06T21:01:25.661Z",
                updatedAt: "2022-05-06T21:13:00.753Z",
                cardData: {
                  id: 2,
                  description:
                    "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.\n\n",
                  image: {
                    data: {
                      id: 13,
                      attributes: {
                        name: "photo-1506126613408-eca07ce68773.avif",
                        alternativeText:
                          "photo-1506126613408-eca07ce68773.avif",
                        caption: "photo-1506126613408-eca07ce68773.avif",
                        width: 799,
                        height: 929,
                        formats: null,
                        hash: "photo_1506126613408_eca07ce68773_c15411f9c4",
                        ext: ".avif",
                        mime: "image/avif",
                        size: 120.97,
                        url: "/uploads/photo_1506126613408_eca07ce68773_c15411f9c4.avif",
                        previewUrl: null,
                        provider: "local",
                        provider_metadata: null,
                        createdAt: "2022-05-06T21:01:09.265Z",
                        updatedAt: "2022-05-06T21:01:09.265Z",
                      },
                    },
                  },
                },
                blogCategories: {
                  data: [
                    {
                      id: 1,
                      attributes: {
                        name: "zdrowie",
                        slug: "zdrowie",
                        description:
                          "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.\n\n",
                        createdAt: "2022-05-06T21:00:21.965Z",
                        updatedAt: "2022-05-06T21:00:21.965Z",
                      },
                    },
                  ],
                },
                mainImage: {
                  id: 1,
                  description:
                    "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.\n\n",
                  image: {
                    data: {
                      id: 13,
                      attributes: {
                        name: "photo-1506126613408-eca07ce68773.avif",
                        alternativeText:
                          "photo-1506126613408-eca07ce68773.avif",
                        caption: "photo-1506126613408-eca07ce68773.avif",
                        width: 799,
                        height: 929,
                        formats: null,
                        hash: "photo_1506126613408_eca07ce68773_c15411f9c4",
                        ext: ".avif",
                        mime: "image/avif",
                        size: 120.97,
                        url: "/uploads/photo_1506126613408_eca07ce68773_c15411f9c4.avif",
                        previewUrl: null,
                        provider: "local",
                        provider_metadata: null,
                        createdAt: "2022-05-06T21:01:09.265Z",
                        updatedAt: "2022-05-06T21:01:09.265Z",
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
