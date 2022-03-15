export const handleDiets = (initial: DietJsonInitial): ParsedDiet[] => {
  const { data } = initial

  const res: ParsedDiet[] = data.map((item, index) => {
    const { attributes, id } = item
    const { dietImage, name } = attributes
    const diet: ParsedDiet = {
      dietImage,
      id,
      name,
    }
    return diet
  })
  return res
}

export interface DietJsonInitial {
  data: DietJson[]
}
export interface DietJson {
  id: number
  attributes: {
    name: string
    dietImage: any
  }
}
export interface ParsedDiet {
  id: number
  name: string
  dietImage: any
}
const rawExample = {
  data: [
    {
      id: 1,
      attributes: {
        createdAt: "2022-02-22T13:59:06.019Z",
        updatedAt: "2022-03-15T15:03:22.874Z",
        name: "Dieta testowa",
        dietImage: {
          data: {
            id: 23,
            attributes: {
              name: "photo-1572449043416-55f4685c9bb7 (1).jpg",
              alternativeText: "photo-1572449043416-55f4685c9bb7 (1).jpg",
              caption: "photo-1572449043416-55f4685c9bb7 (1).jpg",
              width: 880,
              height: 880,
              formats: {
                thumbnail: {
                  name: "thumbnail_photo-1572449043416-55f4685c9bb7 (1).jpg",
                  hash: "thumbnail_photo_1572449043416_55f4685c9bb7_1_f0ab78a357",
                  ext: ".jpg",
                  mime: "image/jpeg",
                  width: 156,
                  height: 156,
                  size: 5.76,
                  path: null,
                  url: "/uploads/thumbnail_photo_1572449043416_55f4685c9bb7_1_f0ab78a357.jpg",
                },
                medium: {
                  name: "medium_photo-1572449043416-55f4685c9bb7 (1).jpg",
                  hash: "medium_photo_1572449043416_55f4685c9bb7_1_f0ab78a357",
                  ext: ".jpg",
                  mime: "image/jpeg",
                  width: 750,
                  height: 750,
                  size: 76.96,
                  path: null,
                  url: "/uploads/medium_photo_1572449043416_55f4685c9bb7_1_f0ab78a357.jpg",
                },
                small: {
                  name: "small_photo-1572449043416-55f4685c9bb7 (1).jpg",
                  hash: "small_photo_1572449043416_55f4685c9bb7_1_f0ab78a357",
                  ext: ".jpg",
                  mime: "image/jpeg",
                  width: 500,
                  height: 500,
                  size: 39.56,
                  path: null,
                  url: "/uploads/small_photo_1572449043416_55f4685c9bb7_1_f0ab78a357.jpg",
                },
              },
              hash: "photo_1572449043416_55f4685c9bb7_1_f0ab78a357",
              ext: ".jpg",
              mime: "image/jpeg",
              size: 97.54,
              url: "/uploads/photo_1572449043416_55f4685c9bb7_1_f0ab78a357.jpg",
              previewUrl: null,
              provider: "local",
              provider_metadata: null,
              createdAt: "2022-03-15T15:03:13.120Z",
              updatedAt: "2022-03-15T15:03:13.120Z",
            },
          },
        },
      },
    },
    {
      id: 2,
      attributes: {
        createdAt: "2022-03-15T15:20:19.441Z",
        updatedAt: "2022-03-15T15:20:19.441Z",
        name: "Dieta Cud",
        dietImage: {
          data: {
            id: 24,
            attributes: {
              name: "photo-1599964815811-30b9aea11d17.jpg",
              alternativeText: "photo-1599964815811-30b9aea11d17.jpg",
              caption: "photo-1599964815811-30b9aea11d17.jpg",
              width: 1170,
              height: 780,
              formats: {
                thumbnail: {
                  name: "thumbnail_photo-1599964815811-30b9aea11d17.jpg",
                  hash: "thumbnail_photo_1599964815811_30b9aea11d17_3677e7f24d",
                  ext: ".jpg",
                  mime: "image/jpeg",
                  width: 234,
                  height: 156,
                  size: 8.59,
                  path: null,
                  url: "/uploads/thumbnail_photo_1599964815811_30b9aea11d17_3677e7f24d.jpg",
                },
                large: {
                  name: "large_photo-1599964815811-30b9aea11d17.jpg",
                  hash: "large_photo_1599964815811_30b9aea11d17_3677e7f24d",
                  ext: ".jpg",
                  mime: "image/jpeg",
                  width: 1000,
                  height: 667,
                  size: 95.77,
                  path: null,
                  url: "/uploads/large_photo_1599964815811_30b9aea11d17_3677e7f24d.jpg",
                },
                medium: {
                  name: "medium_photo-1599964815811-30b9aea11d17.jpg",
                  hash: "medium_photo_1599964815811_30b9aea11d17_3677e7f24d",
                  ext: ".jpg",
                  mime: "image/jpeg",
                  width: 750,
                  height: 500,
                  size: 59.69,
                  path: null,
                  url: "/uploads/medium_photo_1599964815811_30b9aea11d17_3677e7f24d.jpg",
                },
                small: {
                  name: "small_photo-1599964815811-30b9aea11d17.jpg",
                  hash: "small_photo_1599964815811_30b9aea11d17_3677e7f24d",
                  ext: ".jpg",
                  mime: "image/jpeg",
                  width: 500,
                  height: 333,
                  size: 29.38,
                  path: null,
                  url: "/uploads/small_photo_1599964815811_30b9aea11d17_3677e7f24d.jpg",
                },
              },
              hash: "photo_1599964815811_30b9aea11d17_3677e7f24d",
              ext: ".jpg",
              mime: "image/jpeg",
              size: 124.7,
              url: "/uploads/photo_1599964815811_30b9aea11d17_3677e7f24d.jpg",
              previewUrl: null,
              provider: "local",
              provider_metadata: null,
              createdAt: "2022-03-15T15:05:00.861Z",
              updatedAt: "2022-03-15T15:05:00.861Z",
            },
          },
        },
      },
    },
  ],
  meta: { pagination: { page: 1, pageSize: 25, pageCount: 1, total: 2 } },
}
