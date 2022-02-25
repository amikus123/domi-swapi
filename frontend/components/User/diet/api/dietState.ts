import { cloneDeep } from "lodash"
import {
  DietDay,
  Dish,
  DishPreference,
  DishReplacement,
  FullDietDay,
  FullDish,
  Ingredient,
  IngredientPreference,
  NameAmount,
} from "./types"

// TODO conider changing:
// * comparing using lower case , minimize amount off errors
const findNameInIngredients = (ingredeints: Ingredient[], name: string) => {
  for (const i in ingredeints) {
    if (ingredeints[i].originalName.toLowerCase() === name.toLowerCase())
      return i
  }
  return -1
}

const findNameInReplacements = (replacements: NameAmount[], name: string) => {
  for (const i in replacements) {
    if (replacements[i].name.toLowerCase() === name.toLowerCase()) return i
  }
  return -1
}

export const changeDishesIngredients = (
  originalDishes: Record<string, Dish>,
  ingredientPreferences: Record<string, IngredientPreference>
): Record<string, Dish> => {
  const dishCopy = cloneDeep(originalDishes)

  Object.values(dishCopy).forEach((dish) => {
    // * modify each dish
    const { ingredients, name } = dish
    //* if there are preferences for the dish, continiue
    if (name in ingredientPreferences) {
      // * go through all the preferences for the dish
      const preferedForDish = ingredientPreferences[name].preferredIngredients
      preferedForDish.forEach((item) => {
        const { originalName, preferredName } = item
        //* check if ingredeint to replace is in dish
        const indexOfOriginal = findNameInIngredients(ingredients, originalName)
        if (indexOfOriginal !== -1) {
          // * check if prefered replacement is valid
          const originalIngredient: Ingredient = ingredients[indexOfOriginal]
          const { replacements } = originalIngredient
          const replacementIndex = findNameInReplacements(
            replacements,
            preferredName
          )
          if (replacementIndex !== -1) {
            //* swap content, old data is moved to the replacements
            const previousIngredientName = originalIngredient.name
            const previousIngredientAmount = originalIngredient.amount
            originalIngredient.name = preferredName
            originalIngredient.amount = replacements[replacementIndex].amount
            replacements[replacementIndex].name = previousIngredientName
            replacements[replacementIndex].amount = previousIngredientAmount
          }
        }
      })
    }
  })
  return dishCopy
}

const getAllMatching = (
  names: string[],
  dishes: Record<string, Dish>
): Dish[] => {
  const res: Dish[] = []
  names.forEach((name) => {
    if (name in dishes) {
      res.push(dishes[name])
    }
  })
  return res
}

// * changes abstract dietDay to days filled with Objects
export const changeDishesInDays = (
  dietDays: DietDay[],
  dishReplacements: Record<string, DishReplacement>,
  dishPreferences: DishPreference[],
  dishes: Record<string, Dish>
): FullDietDay[] => {
  const res: FullDietDay[] = dietDays.map((day) => {
    const a: FullDish[] = []
    day.uniqeDishDatas.forEach((item) => {
      console.log(
        item,
        dishReplacements,
        dishReplacements[item.name],
        dishes,
        "XDD"
      )
      if (item.name in dishReplacements) {
        a.push({
          originalDishName: item.name,
          dish: dishes[item.name],
          replacements: getAllMatching(
            dishReplacements[item.name].replacements,
            dishes
          ),
        })
      }
    })

    return { dishes: a }
  })
  console.log(res)
  return res
}
