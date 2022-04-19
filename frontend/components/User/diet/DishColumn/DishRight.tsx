import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react"
import React from "react"
import { FullDish } from "../../../../lib/types/dietPage/dishTypes"

import Dishingredients from "./Ingredients/Dishingredients"
import DishNutrition from "./Nutrients/DishNutrition"
import DishRecipe from "./Recipe/DishRecipe"
interface DishRightProps {
  dishData: FullDish
}
const DishRight = ({ dishData }: DishRightProps) => {
  const { dish } = dishData
  const { ingredients, nutrients, name } = dish


  // ! CONSIDER MAKING SPACES UNBREAKABLE
  return (
    <Tabs isFitted variant="enclosed" w="100%" pl={[0,0,8]}>
      <TabList mb="1em">
        <Tab>Przepis</Tab>
        <Tab>Składniki</Tab>
        <Tab>Wartości odżywcze</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <DishRecipe
          dishData={dishData}
          />
        </TabPanel>
        <TabPanel>
          <Dishingredients ingredients={ingredients} name={name} />
        </TabPanel>
        <TabPanel>
          <DishNutrition nutrients={nutrients} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default DishRight
