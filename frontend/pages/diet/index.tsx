import { Flex, Heading, Stack, useToast } from "@chakra-ui/react"
import React, { useState } from "react"
import CategoryBreadcrumbs from "../../components/blog/Categories/CategoryBreadcrumbs"
import DietControl from "../../components/DietControl/DietControl"
import DietPicker from "../../components/publicDiet/DietPicker"
import { getFullDiets } from "../../lib/server/fetching/getDiets"
import { getAllDishes } from "../../lib/server/fetching/getDishes"
import { Dish } from "../../lib/types/dietPage/dishTypes"
import { UserFullData } from "../../lib/types/dietPage/userTypes"
import { ParsedFullDiet } from "../../lib/types/JSON/parsed/parsedDiets"

interface DietPageProps {
  dishes: Record<string, Dish>
  diets: Record<string, ParsedFullDiet>
}

const index = ({ dishes, diets }: DietPageProps) => {
  const toast = useToast()

  const [selectedDiet, setSelectedDiet] = useState(diets[Object.keys(diets)[0]])
  const setDiet = (dietName: string, currentDietName: string) => {
    if (currentDietName !== dietName) {
      setSelectedDiet(diets[dietName])

      toast({
        title: "Wybrałeś nową diete",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Stack justify="flex-start" align="center" w="100%" textAlign="left">
      <Flex w="100%" alignContent="left" pb={4} maxW="100%">
        <CategoryBreadcrumbs links={[{ href: "/diet", name: "Dieta" }]} />
      </Flex>

      <Heading my={8} textAlign={["center", "center", "start"]}>
        Wybrana dieta: {selectedDiet.name}
      </Heading>
      <DietPicker diets={diets} setDiet={setDiet} currentDietName={selectedDiet.name} />

      <DietControl
        originalDishes={dishes}
        user={user}
        isPagePublic={true}
        diet={selectedDiet}
      />
    </Stack>
  )
}

export default index

export async function getServerSideProps() {
  const diets = await getFullDiets()
  const dishes = await getAllDishes()

  return {
    props: { dishes, diets },
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
