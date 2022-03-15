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

// * go through all days, change dishes with preffered disehs if possible
export const changeDishesInDays = (
  dietDays: DietDay[],
  dishReplacements: Record<string, DishReplacement>,
  dishPreferences: Record<string, DishPreference>,
  dishes: Record<string, Dish>
): FullDietDay[] => {
  const res: FullDietDay[] = []
  // * memoization
  const readySolutions: Record<string, FullDish> = {}

  const handleReplacement = (dishName: string):  FullDish => {
    if (dishName in readySolutions) {
      return readySolutions[dishName]
    } else {
      // * check if replacement is possible

      //*  if there are no replacments, skip item
      if (dishReplacements[dishName] === undefined) {
        const repl = dishReplacements[dishName]
          ? dishReplacements[dishName].replacements
          : []
        const obj: FullDish = {
          originalDishName: dishName,
          dish: dishes[dishName],
          replacements: repl,
        }
        readySolutions[dishName] = obj
        return obj
      }
      const originalDish = dishes[dishName]
      const preferenceName = dishPreferences[dishName].preferedName
      const possibleReplacments = dishReplacements[dishName].replacements
      const replacementIndex = possibleReplacments.indexOf(preferenceName)
      if (replacementIndex !== -1) {
        const newDish = dishes[preferenceName]
        const newReplacements = cloneDeep(possibleReplacments)
        newReplacements[replacementIndex] = dishName

        const obj: FullDish = {
          originalDishName: dishName,
          dish: newDish,
          replacements: newReplacements,
        }
        readySolutions[dishName] = obj
        return obj
      } else {
        const repl = dishReplacements[dishName]
          ? dishReplacements[dishName].replacements
          : []
        const obj: FullDish = {
          originalDishName: dishName,
          dish: originalDish,
          replacements: repl,
        }
        readySolutions[dishName] = obj
        return obj
      }
    }
  }

  dietDays.forEach((day) => {
    //* we go through all dishes of day
    const a: FullDish[] = []
    day.uniqeDishDatas.forEach((item) => {
      const { name } = item
      // * check if there are any prefrences for name
      if (name in dishPreferences) {
        //* we start changes
        const tmp: FullDish = handleReplacement(name)
        a.push(tmp)
      } else {
        // * if it is not in array, we create empty one
        const replacements = dishReplacements[name]
          ? dishReplacements[name].replacements
          : []
        const tmp: FullDish = {
          originalDishName: name,
          dish: dishes[name],
          replacements: replacements,
        }
        a.push(tmp)
      }
    })
    res.push({ dishes: a, kcalCount: getKcal(a) })
  })

  return res
}

export const getKcal = (dishes: FullDish[]) => {
  let kcalCount = 0
  dishes.forEach((item) => {
    // * if item has no calories for some reason, it does not break
    try {
      for (const nut of item.dish.nutrients) {
        if (nut.name.toLowerCase().trim() === "kalorie") {
          const kcalString = nut.amount
          const kcalNumber = Number(kcalString.replace("kcal", ""))
          if (!isNaN(kcalNumber)) {
            kcalCount += kcalNumber
          }
          break
        }
      }
    } catch (e) {}
  })
  return kcalCount
}
