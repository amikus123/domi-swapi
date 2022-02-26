import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react"
import React from "react"
import { Dish } from "../api/types"

import Dishingredients from "./Ingredients/Dishingredients"
import DishNutrition from "./Nutrients/DishNutrition"
import DishRecipe from "./Recipe/DishRecipe"
interface DishRightProps {

  dish:Dish
}
const DishRight = ({dish }: DishRightProps) => {
  const { ingredients, nutrients, recipe,name} = dish
  return (
    <Tabs isFitted variant="enclosed" w="100%" pl={8}>
      <TabList mb="1em">
        <Tab>Przepis</Tab>
        <Tab>Składniki</Tab>
        <Tab>Wartości odżywcze</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <DishRecipe recipe={recipe} replacements={[]} />
        </TabPanel>
        <TabPanel>
          <Dishingredients
            ingredients={ingredients}
            name={name}
          />
        </TabPanel>
        <TabPanel>
          <DishNutrition nutrients={nutrients} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default DishRight
