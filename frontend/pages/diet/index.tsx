import { Flex, Stack } from "@chakra-ui/react"
import React, { useState } from "react"
import CategoryBreadcrumbs from "../../components/blog/Categories/CategoryBreadcrumbs"
import DietPicker from "../../components/publicDiet/DietPicker"
import { getBlogCategories } from "../../lib/server/fetching/getBlogCategories"
import {
  getDiets,
} from "../../lib/server/fetching/getDiets"
import { getAllDishes } from "../../lib/server/fetching/getDishes"
import { UserFullData } from "../../lib/types/dietPage/userTypes"
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

export async function getServerSideProps() {
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

