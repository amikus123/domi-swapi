import {
  DietDay,
  DishReplacement,
  DishUniqueData,
} from "../../../components/User/api/types"
import { handleDietDays, handleDishReplacements } from "./parseUset"

export const handleFullDiets = (
  initial: any
): Record<string, ParsedFullDiet> => {
  const { data } = initial

  const res: Record<string, ParsedFullDiet> = {}
  const uniqueDishes: Record<string, DishUniqueData> = {}

  data.map((item) => {
    const { attributes, id } = item
    const { dietImage, name, dietDescription, dishReplacements, days } =
      attributes
    const diet: ParsedFullDiet = {
      dietImage,
      id,
      name,
      dietDescription,
      days: handleDietDays(days, uniqueDishes),
      dishReplacements: handleDishReplacements(dishReplacements, uniqueDishes),
    }
    res[name] = diet
  })
  return res
}

export interface DietFullJsonInitial {
  data: DietFullJson[]
}
export interface DietFullJson {
  id: number
  attributes: {
    name: string
    dietImage: any
    dietDescription: string
  }
}
export interface ParsedFullDiet {
  id: number
  name: string
  dietImage: any
  dietDescription: string
  days: DietDay[]
  dishReplacements: Record<string, DishReplacement>
}

export const exampleData = {
  data: [
    {
      id: 1,
      attributes: {
        createdAt: "2022-02-22T13:59:06.019Z",
        updatedAt: "2022-04-17T22:06:14.674Z",
        name: "Dieta testowa",
        dietDescription: "adsaasdasd",
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
        dishReplacements: [
          {
            id: 1,
            possibleReplacements: {
              data: [
                {
                  id: 3,
                  attributes: {
                    name: "Salad",
                    createdAt: "2022-02-25T00:27:57.868Z",
                    updatedAt: "2022-02-28T16:54:05.976Z",
                    slug: "sala",
                    meal: "obiad",
                    recipe: "a",
                    description: "s",
                  },
                },
                {
                  id: 4,
                  attributes: {
                    name: "Pancake",
                    createdAt: "2022-02-25T00:40:50.344Z",
                    updatedAt: "2022-02-28T16:53:55.364Z",
                    slug: "pan",
                    meal: "obiad",
                    recipe: "a",
                    description: "s",
                  },
                },
              ],
            },
            original: {
              data: {
                id: 2,
                attributes: {
                  name: "Jajecznica",
                  createdAt: "2022-02-22T13:49:30.901Z",
                  updatedAt: "2022-02-28T16:53:46.765Z",
                  slug: "jajecznica",
                  meal: "sniadanie",
                  recipe: "a",
                  description: "s",
                },
              },
            },
          },
          {
            id: 2,
            possibleReplacements: {
              data: [
                {
                  id: 5,
                  attributes: {
                    name: "Tost",
                    createdAt: "2022-02-25T00:48:48.107Z",
                    updatedAt: "2022-02-28T16:54:22.167Z",
                    slug: "tost",
                    meal: "sniadanie",
                    recipe: "a",
                    description: "s",
                  },
                },
              ],
            },
            original: {
              data: {
                id: 3,
                attributes: {
                  name: "Salad",
                  createdAt: "2022-02-25T00:27:57.868Z",
                  updatedAt: "2022-02-28T16:54:05.976Z",
                  slug: "sala",
                  meal: "obiad",
                  recipe: "a",
                  description: "s",
                },
              },
            },
          },
          {
            id: 3,
            possibleReplacements: {
              data: [
                {
                  id: 1,
                  attributes: {
                    name: "Spaghetti",
                    createdAt: "2022-02-22T13:38:04.474Z",
                    updatedAt: "2022-02-28T16:54:14.966Z",
                    slug: "spaghetti",
                    meal: "obiad",
                    recipe: "a",
                    description: "s",
                  },
                },
              ],
            },
            original: {
              data: {
                id: 4,
                attributes: {
                  name: "Pancake",
                  createdAt: "2022-02-25T00:40:50.344Z",
                  updatedAt: "2022-02-28T16:53:55.364Z",
                  slug: "pan",
                  meal: "obiad",
                  recipe: "a",
                  description: "s",
                },
              },
            },
          },
        ],
        days: [
          {
            id: 3,
            dishes: {
              data: [
                {
                  id: 1,
                  attributes: {
                    name: "Spaghetti",
                    createdAt: "2022-02-22T13:38:04.474Z",
                    updatedAt: "2022-02-28T16:54:14.966Z",
                    slug: "spaghetti",
                    meal: "obiad",
                    recipe: "a",
                    description: "s",
                  },
                },
                {
                  id: 2,
                  attributes: {
                    name: "Jajecznica",
                    createdAt: "2022-02-22T13:49:30.901Z",
                    updatedAt: "2022-02-28T16:53:46.765Z",
                    slug: "jajecznica",
                    meal: "sniadanie",
                    recipe: "a",
                    description: "s",
                  },
                },
                {
                  id: 3,
                  attributes: {
                    name: "Salad",
                    createdAt: "2022-02-25T00:27:57.868Z",
                    updatedAt: "2022-02-28T16:54:05.976Z",
                    slug: "sala",
                    meal: "obiad",
                    recipe: "a",
                    description: "s",
                  },
                },
              ],
            },
          },
          {
            id: 5,
            dishes: {
              data: [
                {
                  id: 1,
                  attributes: {
                    name: "Spaghetti",
                    createdAt: "2022-02-22T13:38:04.474Z",
                    updatedAt: "2022-02-28T16:54:14.966Z",
                    slug: "spaghetti",
                    meal: "obiad",
                    recipe: "a",
                    description: "s",
                  },
                },
                {
                  id: 4,
                  attributes: {
                    name: "Pancake",
                    createdAt: "2022-02-25T00:40:50.344Z",
                    updatedAt: "2022-02-28T16:53:55.364Z",
                    slug: "pan",
                    meal: "obiad",
                    recipe: "a",
                    description: "s",
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      id: 2,
      attributes: {
        createdAt: "2022-03-15T15:20:19.441Z",
        updatedAt: "2022-04-17T22:05:44.842Z",
        name: "Dieta Cud",
        dietDescription: "ads",
        dietImage: {
          data: {
            id: 25,
            attributes: {
              name: "photo-1626788460425-80be45dd088d.jpg",
              alternativeText: "photo-1626788460425-80be45dd088d.jpg",
              caption: "photo-1626788460425-80be45dd088d.jpg",
              width: 880,
              height: 880,
              formats: {
                thumbnail: {
                  name: "thumbnail_photo-1626788460425-80be45dd088d.jpg",
                  hash: "thumbnail_photo_1626788460425_80be45dd088d_2b9503d996",
                  ext: ".jpg",
                  mime: "image/jpeg",
                  width: 156,
                  height: 156,
                  size: 7.9,
                  path: null,
                  url: "/uploads/thumbnail_photo_1626788460425_80be45dd088d_2b9503d996.jpg",
                },
                medium: {
                  name: "medium_photo-1626788460425-80be45dd088d.jpg",
                  hash: "medium_photo_1626788460425_80be45dd088d_2b9503d996",
                  ext: ".jpg",
                  mime: "image/jpeg",
                  width: 750,
                  height: 750,
                  size: 89.1,
                  path: null,
                  url: "/uploads/medium_photo_1626788460425_80be45dd088d_2b9503d996.jpg",
                },
                small: {
                  name: "small_photo-1626788460425-80be45dd088d.jpg",
                  hash: "small_photo_1626788460425_80be45dd088d_2b9503d996",
                  ext: ".jpg",
                  mime: "image/jpeg",
                  width: 500,
                  height: 500,
                  size: 47.96,
                  path: null,
                  url: "/uploads/small_photo_1626788460425_80be45dd088d_2b9503d996.jpg",
                },
              },
              hash: "photo_1626788460425_80be45dd088d_2b9503d996",
              ext: ".jpg",
              mime: "image/jpeg",
              size: 111.68,
              url: "/uploads/photo_1626788460425_80be45dd088d_2b9503d996.jpg",
              previewUrl: null,
              provider: "local",
              provider_metadata: null,
              createdAt: "2022-03-15T17:28:34.112Z",
              updatedAt: "2022-03-15T17:28:34.112Z",
            },
          },
        },
        dishReplacements: [
          {
            id: 4,
            possibleReplacements: {
              data: [
                {
                  id: 4,
                  attributes: {
                    name: "Pancake",
                    createdAt: "2022-02-25T00:40:50.344Z",
                    updatedAt: "2022-02-28T16:53:55.364Z",
                    slug: "pan",
                    meal: "obiad",
                    recipe: "a",
                    description: "s",
                  },
                },
              ],
            },
            original: {
              data: {
                id: 2,
                attributes: {
                  name: "Jajecznica",
                  createdAt: "2022-02-22T13:49:30.901Z",
                  updatedAt: "2022-02-28T16:53:46.765Z",
                  slug: "jajecznica",
                  meal: "sniadanie",
                  recipe: "a",
                  description: "s",
                },
              },
            },
          },
        ],
        days: [
          {
            id: 6,
            dishes: {
              data: [
                {
                  id: 2,
                  attributes: {
                    name: "Jajecznica",
                    createdAt: "2022-02-22T13:49:30.901Z",
                    updatedAt: "2022-02-28T16:53:46.765Z",
                    slug: "jajecznica",
                    meal: "sniadanie",
                    recipe: "a",
                    description: "s",
                  },
                },
                {
                  id: 3,
                  attributes: {
                    name: "Salad",
                    createdAt: "2022-02-25T00:27:57.868Z",
                    updatedAt: "2022-02-28T16:54:05.976Z",
                    slug: "sala",
                    meal: "obiad",
                    recipe: "a",
                    description: "s",
                  },
                },
                {
                  id: 4,
                  attributes: {
                    name: "Pancake",
                    createdAt: "2022-02-25T00:40:50.344Z",
                    updatedAt: "2022-02-28T16:53:55.364Z",
                    slug: "pan",
                    meal: "obiad",
                    recipe: "a",
                    description: "s",
                  },
                },
              ],
            },
          },
          {
            id: 7,
            dishes: {
              data: [
                {
                  id: 2,
                  attributes: {
                    name: "Jajecznica",
                    createdAt: "2022-02-22T13:49:30.901Z",
                    updatedAt: "2022-02-28T16:53:46.765Z",
                    slug: "jajecznica",
                    meal: "sniadanie",
                    recipe: "a",
                    description: "s",
                  },
                },
              ],
            },
          },
          {
            id: 8,
            dishes: {
              data: [
                {
                  id: 3,
                  attributes: {
                    name: "Salad",
                    createdAt: "2022-02-25T00:27:57.868Z",
                    updatedAt: "2022-02-28T16:54:05.976Z",
                    slug: "sala",
                    meal: "obiad",
                    recipe: "a",
                    description: "s",
                  },
                },
                {
                  id: 5,
                  attributes: {
                    name: "Tost",
                    createdAt: "2022-02-25T00:48:48.107Z",
                    updatedAt: "2022-02-28T16:54:22.167Z",
                    slug: "tost",
                    meal: "sniadanie",
                    recipe: "a",
                    description: "s",
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      id: 3,
      attributes: {
        createdAt: "2022-03-15T19:03:24.366Z",
        updatedAt: "2022-04-17T22:05:57.253Z",
        name: "Dieta Wege",
        dietDescription: "adsasd",
        dietImage: {
          data: {
            id: 26,
            attributes: {
              name: "photo-1608376630927-d064ac74866e.jpg",
              alternativeText: "photo-1608376630927-d064ac74866e.jpg",
              caption: "photo-1608376630927-d064ac74866e.jpg",
              width: 858,
              height: 892,
              formats: {
                thumbnail: {
                  name: "thumbnail_photo-1608376630927-d064ac74866e.jpg",
                  hash: "thumbnail_photo_1608376630927_d064ac74866e_1f97b09e30",
                  ext: ".jpg",
                  mime: "image/jpeg",
                  width: 150,
                  height: 156,
                  size: 6.11,
                  path: null,
                  url: "/uploads/thumbnail_photo_1608376630927_d064ac74866e_1f97b09e30.jpg",
                },
                medium: {
                  name: "medium_photo-1608376630927-d064ac74866e.jpg",
                  hash: "medium_photo_1608376630927_d064ac74866e_1f97b09e30",
                  ext: ".jpg",
                  mime: "image/jpeg",
                  width: 721,
                  height: 750,
                  size: 75.38,
                  path: null,
                  url: "/uploads/medium_photo_1608376630927_d064ac74866e_1f97b09e30.jpg",
                },
                small: {
                  name: "small_photo-1608376630927-d064ac74866e.jpg",
                  hash: "small_photo_1608376630927_d064ac74866e_1f97b09e30",
                  ext: ".jpg",
                  mime: "image/jpeg",
                  width: 481,
                  height: 500,
                  size: 37.83,
                  path: null,
                  url: "/uploads/small_photo_1608376630927_d064ac74866e_1f97b09e30.jpg",
                },
              },
              hash: "photo_1608376630927_d064ac74866e_1f97b09e30",
              ext: ".jpg",
              mime: "image/jpeg",
              size: 99.22,
              url: "/uploads/photo_1608376630927_d064ac74866e_1f97b09e30.jpg",
              previewUrl: null,
              provider: "local",
              provider_metadata: null,
              createdAt: "2022-03-15T19:02:39.002Z",
              updatedAt: "2022-03-15T19:02:39.002Z",
            },
          },
        },
        dishReplacements: [
          {
            id: 5,
            possibleReplacements: {
              data: [
                {
                  id: 3,
                  attributes: {
                    name: "Salad",
                    createdAt: "2022-02-25T00:27:57.868Z",
                    updatedAt: "2022-02-28T16:54:05.976Z",
                    slug: "sala",
                    meal: "obiad",
                    recipe: "a",
                    description: "s",
                  },
                },
              ],
            },
            original: {
              data: {
                id: 2,
                attributes: {
                  name: "Jajecznica",
                  createdAt: "2022-02-22T13:49:30.901Z",
                  updatedAt: "2022-02-28T16:53:46.765Z",
                  slug: "jajecznica",
                  meal: "sniadanie",
                  recipe: "a",
                  description: "s",
                },
              },
            },
          },
          {
            id: 6,
            possibleReplacements: {
              data: [],
            },
            original: {
              data: null,
            },
          },
        ],
        days: [
          {
            id: 9,
            dishes: {
              data: [
                {
                  id: 2,
                  attributes: {
                    name: "Jajecznica",
                    createdAt: "2022-02-22T13:49:30.901Z",
                    updatedAt: "2022-02-28T16:53:46.765Z",
                    slug: "jajecznica",
                    meal: "sniadanie",
                    recipe: "a",
                    description: "s",
                  },
                },
                {
                  id: 4,
                  attributes: {
                    name: "Pancake",
                    createdAt: "2022-02-25T00:40:50.344Z",
                    updatedAt: "2022-02-28T16:53:55.364Z",
                    slug: "pan",
                    meal: "obiad",
                    recipe: "a",
                    description: "s",
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      id: 4,
      attributes: {
        createdAt: "2022-03-15T19:18:08.685Z",
        updatedAt: "2022-04-17T22:06:05.008Z",
        name: "Dieta mięsna",
        dietDescription: "asdasd",
        dietImage: {
          data: {
            id: 27,
            attributes: {
              name: "photo-1585238342018-78ef8ee55a59.jpg",
              alternativeText: "photo-1585238342018-78ef8ee55a59.jpg",
              caption: "photo-1585238342018-78ef8ee55a59.jpg",
              width: 880,
              height: 880,
              formats: {
                thumbnail: {
                  name: "thumbnail_photo-1585238342018-78ef8ee55a59.jpg",
                  hash: "thumbnail_photo_1585238342018_78ef8ee55a59_c0c6bc48e1",
                  ext: ".jpg",
                  mime: "image/jpeg",
                  width: 156,
                  height: 156,
                  size: 8.06,
                  path: null,
                  url: "/uploads/thumbnail_photo_1585238342018_78ef8ee55a59_c0c6bc48e1.jpg",
                },
                medium: {
                  name: "medium_photo-1585238342018-78ef8ee55a59.jpg",
                  hash: "medium_photo_1585238342018_78ef8ee55a59_c0c6bc48e1",
                  ext: ".jpg",
                  mime: "image/jpeg",
                  width: 750,
                  height: 750,
                  size: 118.31,
                  path: null,
                  url: "/uploads/medium_photo_1585238342018_78ef8ee55a59_c0c6bc48e1.jpg",
                },
                small: {
                  name: "small_photo-1585238342018-78ef8ee55a59.jpg",
                  hash: "small_photo_1585238342018_78ef8ee55a59_c0c6bc48e1",
                  ext: ".jpg",
                  mime: "image/jpeg",
                  width: 500,
                  height: 500,
                  size: 60.68,
                  path: null,
                  url: "/uploads/small_photo_1585238342018_78ef8ee55a59_c0c6bc48e1.jpg",
                },
              },
              hash: "photo_1585238342018_78ef8ee55a59_c0c6bc48e1",
              ext: ".jpg",
              mime: "image/jpeg",
              size: 152.35,
              url: "/uploads/photo_1585238342018_78ef8ee55a59_c0c6bc48e1.jpg",
              previewUrl: null,
              provider: "local",
              provider_metadata: null,
              createdAt: "2022-03-15T19:18:04.845Z",
              updatedAt: "2022-03-15T19:18:04.845Z",
            },
          },
        },
        dishReplacements: [
          {
            id: 7,
            possibleReplacements: {
              data: [
                {
                  id: 4,
                  attributes: {
                    name: "Pancake",
                    createdAt: "2022-02-25T00:40:50.344Z",
                    updatedAt: "2022-02-28T16:53:55.364Z",
                    slug: "pan",
                    meal: "obiad",
                    recipe: "a",
                    description: "s",
                  },
                },
              ],
            },
            original: {
              data: {
                id: 2,
                attributes: {
                  name: "Jajecznica",
                  createdAt: "2022-02-22T13:49:30.901Z",
                  updatedAt: "2022-02-28T16:53:46.765Z",
                  slug: "jajecznica",
                  meal: "sniadanie",
                  recipe: "a",
                  description: "s",
                },
              },
            },
          },
        ],
        days: [
          {
            id: 10,
            dishes: {
              data: [
                {
                  id: 4,
                  attributes: {
                    name: "Pancake",
                    createdAt: "2022-02-25T00:40:50.344Z",
                    updatedAt: "2022-02-28T16:53:55.364Z",
                    slug: "pan",
                    meal: "obiad",
                    recipe: "a",
                    description: "s",
                  },
                },
                {
                  id: 5,
                  attributes: {
                    name: "Tost",
                    createdAt: "2022-02-25T00:48:48.107Z",
                    updatedAt: "2022-02-28T16:54:22.167Z",
                    slug: "tost",
                    meal: "sniadanie",
                    recipe: "a",
                    description: "s",
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
  meta: {
    pagination: {
      page: 1,
      pageSize: 25,
      pageCount: 1,
      total: 4,
    },
  },
}
