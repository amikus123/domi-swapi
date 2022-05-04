// ! TAKE CARE OF DIET PAGES

import { Ingredient, Dish } from "../../types/dietPage/dishTypes"
import {
  IngredientJson,
  DishJson,
  DishesJson,
} from "../../types/JSON/raw/dishJsonTypes"
import { handleImage } from "./parseImage"

const handleDishPage = (): null => {
  return null
}

const handleIngredients = (ingredients: IngredientJson[]): Ingredient[] => {
  return ingredients.map((ingredient) => {
    const res: Ingredient = {
      amount: ingredient.amount,
      name: ingredient.name,
      originalName: ingredient.name,
      replacements: ingredient.replacements,
    }
    return res
  })
}

const handleDish = (dish: DishJson): Dish => {
  const {
    description,
    image,
    ingredients,
    meal,
    name,
    nutrients,
    recipe,
    slug,
  } = dish.attributes
  const res: Dish = {
    image:handleImage(image),
    dishPage: handleDishPage(),
    id: dish.id,
    name,
    slug,
    ingredients: handleIngredients(ingredients),
    nutrients,
    timeCategory: meal,
    description,
    recipe,
  }
  return res
}

export const uniqueDishHandler = (
  dishData: DishesJson
): Record<string, Dish> => {
  const res: Record<string, Dish> = {}
  dishData.data.forEach((dish) => {
    const formatedDist = handleDish(dish)
    const name = formatedDist.name
    res[name] = formatedDist
  })
  return res
}
