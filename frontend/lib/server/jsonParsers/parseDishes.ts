import { Dish, Ingredient } from "../../../components/User/api/types"
import { DishPageJson, IngredientJson, DishJson, DishesJson } from "../JsonTypes/dishJsonTypes"


const createUrl = (slug: string) => {
  //* will create link to relevant dish post
  return slug
}
// ! TAKE CARE OF DIET PAGES

const handleDishPage = (dishPage: DishPageJson): null => {
  console.log(dishPage, "XDD")
  //* if page in not linked, we return null

  // if (dishPage && dishPage.data) {
  //   const slug: string = dishPage.data
  //   return createUrl(slug)
  // } else {
  //   return null
  // }
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
  const res: Dish = {
    image: dish.attributes.image,
    dishPage: handleDishPage(dish.attributes.dishPage),
    id: dish.id,
    name: dish.attributes.name,
    slug: dish.attributes.slug,
    ingredients: handleIngredients(dish.attributes.ingredients),
    nutrients: dish.attributes.nutrients,
    timeCategory: dish.attributes.meal,
    description: dish.attributes.description,
    recipe: dish.attributes.recipe,
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
