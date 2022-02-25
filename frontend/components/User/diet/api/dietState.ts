import { cloneDeep } from "lodash"
import { Dish, Ingredient, IngredientPreference, NameAmount } from "./types"

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

  console.log("XD", ingredientPreferences, originalDishes)
  Object.values(dishCopy).forEach((dish) => {
    // * modify each dish
    const { ingredients, name } = dish
    console.log(name, "nazwa")
    if (name in ingredientPreferences) {
      console.log("nawza jest", name)
      // * go through all the preferences
      const preferedForDish = ingredientPreferences[name].preferredIngredients
      preferedForDish.forEach((item) => {
        const { originalName, preferredName } = item
        //* check if it exists in array
        const indexOfOriginal = findNameInIngredients(ingredients, originalName)
        console.log(
          indexOfOriginal,
          originalName,
          preferredName,
          ingredients,
          "XDDD"
        )
        if (indexOfOriginal !== -1) {
          console.log("indexOg jest", originalName, indexOfOriginal)
          // * check if preffered is in array
          const originalIngredient: Ingredient = ingredients[indexOfOriginal]
          const { replacements } = originalIngredient
          const replacementIndex = findNameInReplacements(
            replacements,
            preferredName
          )
          if (replacementIndex !== -1) {
            //* swap string
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
  console.log("COPIED", dishCopy)
  return dishCopy
}
