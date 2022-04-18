import { Flex, Stack } from "@chakra-ui/react"
import React, { useState } from "react"
import CategoryBreadcrumbs from "../../components/blog/Categories/CategoryBreadcrumbs"
import DietPicker from "../../components/publicDiet/DietPicker"
import { UserFullData } from "../../components/User/api/types"
import {
  getAllDishes,
  getBlogCategories,
  getDiets,
} from "../../lib/server/fetching/serverSide"
import DietComponent from "../user/diet"

const index = ({ dishes, diets, categories }) => {
  console.log(diets, categories, "AASSDDD", dishes)
  const [n, setN] = useState(0)

  return (
    <Stack justify="flex-start" align="center" w="100%" textAlign="left">
      <Flex w="100%" alignContent="left" pb={4} maxW="100%">
        <CategoryBreadcrumbs links={[{ href: "/diet", name: "Dieta" }]} />
      </Flex>
      <button
        onClick={() => {
          setN(n + 1)
        }}
      >
        adsads
      </button>
      <DietPicker categories={categories} />
      <DietComponent
        originalDishes={dishes}
        user={user}
        isPagePublic={true}
        diet={diets[Object.keys(diets)[n]]}
      />
    </Stack>
  )
}

export default index

export async function getServerSideProps(ctx) {
  // HARDCODE TEST  USER , OR GIVE FAKE DATA
  // const user = await getUser(jwt)
  // FETCH LIST OF DIETS
  // const dishes = await getDishes(user, jwt)
  const diets = await getDiets({ full: true })
  const dishes = await getAllDishes()

  const categories = await getBlogCategories()

  return {
    props: { dishes, diets, categories },
  }
}

const user: UserFullData = {
  userId: 8,
  userPersonalData: {
    age: 18,
  },
  userDiet: {
    timeRange: {
      start: "2022-02-28",
      end: "2022-05-07",
    },
    diet: {
      name: "Dieta testowa",
      days: [
        {
          id: 3,
          uniqeDishDatas: [
            {
              id: 1,
              name: "Spaghetti",
              originalName: "Spaghetti",
            },
            {
              id: 2,
              name: "Jajecznica",
              originalName: "Jajecznica",
            },
            {
              id: 3,
              name: "Salad",
              originalName: "Salad",
            },
          ],
        },
        {
          id: 5,
          uniqeDishDatas: [
            {
              id: 1,
              name: "Spaghetti",
              originalName: "Spaghetti",
            },
            {
              id: 4,
              name: "Pancake",
              originalName: "Pancake",
            },
          ],
        },
      ],
      dishReplacements: {
        Jajecznica: {
          original: "Jajecznica",
          replacements: ["Salad", "Pancake"],
          currrent: "Jajecznica",
        },
        Salad: {
          original: "Salad",
          replacements: ["Tost"],
          currrent: "Salad",
        },
        Pancake: {
          original: "Pancake",
          replacements: ["Spaghetti"],
          currrent: "Pancake",
        },
      },
    },
  },
  dishPreferences: {},
  ingredientPreferences: {},
  uniqueDishes: {},
  userDataId: 1,
}

const originalDishes = {
  Spaghetti: {
    image: {
      data: {
        id: 18,
        attributes: {
          name: "spaghtetti.jpg",
          alternativeText: "spaghtetti.jpg",
          caption: "spaghtetti.jpg",
          width: 6000,
          height: 4000,
          formats: {
            thumbnail: {
              name: "thumbnail_spaghtetti.jpg",
              hash: "thumbnail_spaghtetti_2e33fb7a5f",
              ext: ".jpg",
              mime: "image/jpeg",
              width: 234,
              height: 156,
              size: 10.01,
              path: null,
              url: "/uploads/thumbnail_spaghtetti_2e33fb7a5f.jpg",
            },
            large: {
              name: "large_spaghtetti.jpg",
              hash: "large_spaghtetti_2e33fb7a5f",
              ext: ".jpg",
              mime: "image/jpeg",
              width: 1000,
              height: 667,
              size: 105.31,
              path: null,
              url: "/uploads/large_spaghtetti_2e33fb7a5f.jpg",
            },
            medium: {
              name: "medium_spaghtetti.jpg",
              hash: "medium_spaghtetti_2e33fb7a5f",
              ext: ".jpg",
              mime: "image/jpeg",
              width: 750,
              height: 500,
              size: 64.7,
              path: null,
              url: "/uploads/medium_spaghtetti_2e33fb7a5f.jpg",
            },
            small: {
              name: "small_spaghtetti.jpg",
              hash: "small_spaghtetti_2e33fb7a5f",
              ext: ".jpg",
              mime: "image/jpeg",
              width: 500,
              height: 333,
              size: 33.53,
              path: null,
              url: "/uploads/small_spaghtetti_2e33fb7a5f.jpg",
            },
          },
          hash: "spaghtetti_2e33fb7a5f",
          ext: ".jpg",
          mime: "image/jpeg",
          size: 3248.26,
          url: "/uploads/spaghtetti_2e33fb7a5f.jpg",
          previewUrl: null,
          provider: "local",
          provider_metadata: null,
          createdAt: "2022-02-22T13:34:00.328Z",
          updatedAt: "2022-02-22T13:34:00.328Z",
        },
      },
    },
    dishPage: null,
    id: 1,
    name: "Spaghetti",
    slug: "spaghetti",
    ingredients: [
      {
        amount: "100g",
        name: "Makaron",
        originalName: "Makaron",
        replacements: [
          {
            id: 8,
            name: "Makaron rurki",
            amount: "100g",
          },
          {
            id: 9,
            name: "Makaron spaghtetii",
            amount: "100g",
          },
          {
            id: 26,
            name: "pigwa",
            amount: "zmiana",
          },
        ],
      },
      {
        amount: "100g",
        name: "Sos pomidorowy",
        originalName: "Sos pomidorowy",
        replacements: [],
      },
      {
        amount: "10g",
        name: "Oregano",
        originalName: "Oregano",
        replacements: [
          {
            id: 10,
            name: "Curry",
            amount: "10g",
          },
        ],
      },
    ],
    nutrients: [
      {
        id: 1,
        name: "Kalorie",
        amount: "300 kcal",
      },
      {
        id: 2,
        name: "Białko",
        amount: "20g",
      },
      {
        id: 3,
        name: "Tłuszcz",
        amount: "10g",
      },
      {
        id: 4,
        name: "Witamina A",
        amount: "10ug",
      },
    ],
    timeCategory: "obiad",
    description: "s",
    recipe: "a",
  },
  Jajecznica: {
    image: {
      data: {
        id: 19,
        attributes: {
          name: "jajecznica.jpg",
          alternativeText: "jajecznica.jpg",
          caption: "jajecznica.jpg",
          width: 1170,
          height: 780,
          formats: {
            thumbnail: {
              name: "thumbnail_jajecznica.jpg",
              hash: "thumbnail_jajecznica_764bb6377d",
              ext: ".jpg",
              mime: "image/jpeg",
              width: 234,
              height: 156,
              size: 6.86,
              path: null,
              url: "/uploads/thumbnail_jajecznica_764bb6377d.jpg",
            },
            large: {
              name: "large_jajecznica.jpg",
              hash: "large_jajecznica_764bb6377d",
              ext: ".jpg",
              mime: "image/jpeg",
              width: 1000,
              height: 667,
              size: 70.47,
              path: null,
              url: "/uploads/large_jajecznica_764bb6377d.jpg",
            },
            medium: {
              name: "medium_jajecznica.jpg",
              hash: "medium_jajecznica_764bb6377d",
              ext: ".jpg",
              mime: "image/jpeg",
              width: 750,
              height: 500,
              size: 44.06,
              path: null,
              url: "/uploads/medium_jajecznica_764bb6377d.jpg",
            },
            small: {
              name: "small_jajecznica.jpg",
              hash: "small_jajecznica_764bb6377d",
              ext: ".jpg",
              mime: "image/jpeg",
              width: 500,
              height: 333,
              size: 22.29,
              path: null,
              url: "/uploads/small_jajecznica_764bb6377d.jpg",
            },
          },
          hash: "jajecznica_764bb6377d",
          ext: ".jpg",
          mime: "image/jpeg",
          size: 90.78,
          url: "/uploads/jajecznica_764bb6377d.jpg",
          previewUrl: null,
          provider: "local",
          provider_metadata: null,
          createdAt: "2022-02-22T13:47:39.190Z",
          updatedAt: "2022-02-22T13:47:39.190Z",
        },
      },
    },
    dishPage: null,
    id: 2,
    name: "Jajecznica",
    slug: "jajecznica",
    ingredients: [
      {
        amount: "3 sztuki",
        name: "Duże jaja",
        originalName: "Duże jaja",
        replacements: [
          {
            id: 28,
            name: "Srednie jaja",
            amount: "4 sztuki",
          },
          {
            id: 29,
            name: "Gęsie jaja ",
            amount: "3 sztuki",
          },
        ],
      },
      {
        amount: "50g",
        name: "Plasterki boczku",
        originalName: "Plasterki boczku",
        replacements: [
          {
            id: 27,
            name: "Szynka gotowana",
            amount: "50g",
          },
        ],
      },
      {
        amount: "10g",
        name: "cebula",
        originalName: "cebula",
        replacements: [
          {
            id: 30,
            name: "ser",
            amount: "10g",
          },
          {
            id: 31,
            name: "niw",
            amount: "10g",
          },
        ],
      },
    ],
    nutrients: [
      {
        id: 17,
        name: "kalorie",
        amount: "100 kcal",
      },
    ],
    timeCategory: "sniadanie",
    description: "s",
    recipe: "a",
  },
  Salad: {
    image: {
      data: {
        id: 20,
        attributes: {
          name: "salad.jpg",
          alternativeText: "salad.jpg",
          caption: "salad.jpg",
          width: 3854,
          height: 2876,
          formats: {
            thumbnail: {
              name: "thumbnail_salad.jpg",
              hash: "thumbnail_salad_40032c698a",
              ext: ".jpg",
              mime: "image/jpeg",
              width: 209,
              height: 156,
              size: 6.28,
              path: null,
              url: "/uploads/thumbnail_salad_40032c698a.jpg",
            },
            large: {
              name: "large_salad.jpg",
              hash: "large_salad_40032c698a",
              ext: ".jpg",
              mime: "image/jpeg",
              width: 1000,
              height: 746,
              size: 80.53,
              path: null,
              url: "/uploads/large_salad_40032c698a.jpg",
            },
            medium: {
              name: "medium_salad.jpg",
              hash: "medium_salad_40032c698a",
              ext: ".jpg",
              mime: "image/jpeg",
              width: 750,
              height: 560,
              size: 48.71,
              path: null,
              url: "/uploads/medium_salad_40032c698a.jpg",
            },
            small: {
              name: "small_salad.jpg",
              hash: "small_salad_40032c698a",
              ext: ".jpg",
              mime: "image/jpeg",
              width: 500,
              height: 373,
              size: 25.27,
              path: null,
              url: "/uploads/small_salad_40032c698a.jpg",
            },
          },
          hash: "salad_40032c698a",
          ext: ".jpg",
          mime: "image/jpeg",
          size: 778.24,
          url: "/uploads/salad_40032c698a.jpg",
          previewUrl: null,
          provider: "local",
          provider_metadata: null,
          createdAt: "2022-02-25T00:27:24.724Z",
          updatedAt: "2022-02-25T00:27:24.724Z",
        },
      },
    },
    dishPage: null,
    id: 3,
    name: "Salad",
    slug: "sala",
    ingredients: [
      {
        amount: "10 lisi",
        name: "salata",
        originalName: "salata",
        replacements: [],
      },
      {
        amount: "b",
        name: "a",
        originalName: "a",
        replacements: [
          {
            id: 18,
            name: "c",
            amount: "d",
          },
        ],
      },
    ],
    nutrients: [
      {
        id: 16,
        name: "Kalorie",
        amount: "100 kcal",
      },
    ],
    timeCategory: "obiad",
    description: "s",
    recipe: "a",
  },
  Pancake: {
    image: {
      data: {
        id: 22,
        attributes: {
          name: "pancke.jpg",
          alternativeText: "pancke.jpg",
          caption: "pancke.jpg",
          width: 5718,
          height: 3812,
          formats: {
            thumbnail: {
              name: "thumbnail_pancke.jpg",
              hash: "thumbnail_pancke_183a015742",
              ext: ".jpg",
              mime: "image/jpeg",
              width: 234,
              height: 156,
              size: 10.01,
              path: null,
              url: "/uploads/thumbnail_pancke_183a015742.jpg",
            },
            large: {
              name: "large_pancke.jpg",
              hash: "large_pancke_183a015742",
              ext: ".jpg",
              mime: "image/jpeg",
              width: 1000,
              height: 667,
              size: 88.6,
              path: null,
              url: "/uploads/large_pancke_183a015742.jpg",
            },
            medium: {
              name: "medium_pancke.jpg",
              hash: "medium_pancke_183a015742",
              ext: ".jpg",
              mime: "image/jpeg",
              width: 750,
              height: 500,
              size: 56.83,
              path: null,
              url: "/uploads/medium_pancke_183a015742.jpg",
            },
            small: {
              name: "small_pancke.jpg",
              hash: "small_pancke_183a015742",
              ext: ".jpg",
              mime: "image/jpeg",
              width: 500,
              height: 333,
              size: 30.55,
              path: null,
              url: "/uploads/small_pancke_183a015742.jpg",
            },
          },
          hash: "pancke_183a015742",
          ext: ".jpg",
          mime: "image/jpeg",
          size: 2404.39,
          url: "/uploads/pancke_183a015742.jpg",
          previewUrl: null,
          provider: "local",
          provider_metadata: null,
          createdAt: "2022-02-25T00:27:25.479Z",
          updatedAt: "2022-02-25T00:27:25.479Z",
        },
      },
    },
    dishPage: null,
    id: 4,
    name: "Pancake",
    slug: "pan",
    ingredients: [
      {
        amount: "2",
        name: "1",
        originalName: "1",
        replacements: [
          {
            id: 20,
            name: "3",
            amount: "4",
          },
          {
            id: 21,
            name: "5",
            amount: "6",
          },
        ],
      },
    ],
    nutrients: [
      {
        id: 19,
        name: "sss",
        amount: "ss",
      },
    ],
    timeCategory: "obiad",
    description: "s",
    recipe: "a",
  },
  Tost: {
    image: {
      data: {
        id: 21,
        attributes: {
          name: "tost.jpg",
          alternativeText: "tost.jpg",
          caption: "tost.jpg",
          width: 3900,
          height: 2600,
          formats: {
            thumbnail: {
              name: "thumbnail_tost.jpg",
              hash: "thumbnail_tost_ae3d034b51",
              ext: ".jpg",
              mime: "image/jpeg",
              width: 234,
              height: 156,
              size: 11.09,
              path: null,
              url: "/uploads/thumbnail_tost_ae3d034b51.jpg",
            },
            large: {
              name: "large_tost.jpg",
              hash: "large_tost_ae3d034b51",
              ext: ".jpg",
              mime: "image/jpeg",
              width: 1000,
              height: 667,
              size: 108.82,
              path: null,
              url: "/uploads/large_tost_ae3d034b51.jpg",
            },
            medium: {
              name: "medium_tost.jpg",
              hash: "medium_tost_ae3d034b51",
              ext: ".jpg",
              mime: "image/jpeg",
              width: 750,
              height: 500,
              size: 68.28,
              path: null,
              url: "/uploads/medium_tost_ae3d034b51.jpg",
            },
            small: {
              name: "small_tost.jpg",
              hash: "small_tost_ae3d034b51",
              ext: ".jpg",
              mime: "image/jpeg",
              width: 500,
              height: 333,
              size: 36.49,
              path: null,
              url: "/uploads/small_tost_ae3d034b51.jpg",
            },
          },
          hash: "tost_ae3d034b51",
          ext: ".jpg",
          mime: "image/jpeg",
          size: 992.09,
          url: "/uploads/tost_ae3d034b51.jpg",
          previewUrl: null,
          provider: "local",
          provider_metadata: null,
          createdAt: "2022-02-25T00:27:24.879Z",
          updatedAt: "2022-02-25T00:27:24.879Z",
        },
      },
    },
    dishPage: null,
    id: 5,
    name: "Tost",
    slug: "tost",
    ingredients: [
      {
        amount: "a",
        name: "a",
        originalName: "a",
        replacements: [
          {
            id: 24,
            name: "v",
            amount: "v",
          },
          {
            id: 25,
            name: "s",
            amount: "s",
          },
        ],
      },
    ],
    nutrients: [
      {
        id: 22,
        name: "a",
        amount: "a",
      },
      {
        id: 23,
        name: "b",
        amount: "b",
      },
    ],
    timeCategory: "sniadanie",
    description: "s",
    recipe: "a",
  },
}
