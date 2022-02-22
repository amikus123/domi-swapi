import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react"
import React from "react"
import {  Ingredient,ObjectFrontendIndexes,ReplecableIndegredient} from "../../../../pages/user/diet"
import Dishingredients from "./Dishingredients"
import DishNutrition from "./DishNutrition"
import DishRecipe from "./DishRecipe"
interface DishRightProps {
  indgredients:ReplecableIndegredient[]
  nutrients:  Ingredient[]
  recipe: string
  indexes:ObjectFrontendIndexes
  replaceIngredient:(IDs: ObjectFrontendIndexes) => void,
}
const DishRight = ({ indgredients,nutrients, recipe,indexes,replaceIngredient }: DishRightProps) => {
  return (
    
    <Tabs isFitted variant="enclosed" w="100%" pl={8}>
      <TabList mb="1em">
        <Tab>Przepis</Tab>
        <Tab>Składniki</Tab>
        <Tab>Wartości odżywcze</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <DishRecipe recipe={recipe} />
        </TabPanel>
        <TabPanel>
          <Dishingredients data={indgredients}           replaceIngredient={replaceIngredient}
          indexes={indexes}  />
        </TabPanel>
        <TabPanel>
          <DishNutrition data={nutrients} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default DishRight
