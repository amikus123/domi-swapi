import { cloneDeep } from "lodash"
import { Dish } from "../../../../../../lib/types/dietPage/dishTypes"
import { IngredientPreference } from "../../../../../../lib/types/dietPage/userTypes"

interface FullProps {
  //* name of default ingredient
  originalName: string
  // * shown dish
  dishName: string
  // * name of new ingredient
  newName: string
  // * global object with preferece
  ingredientPreferences: Record<string, IngredientPreference>
  // * used to look up dish id
  dishes: Record<string, Dish>
}
type CheckOriginalProps = Omit<
  FullProps,
  "ingredientPreferences" | "setIngredientPreferences" | "dishName"
>
type RemovePreferenceProps = Omit<FullProps, "newName">
type AddPreferenceProps = Omit<FullProps, "">
type ModifyPreferenceProps = Omit<FullProps, "originalName">
type CheckInsideProps = Omit<
  FullProps,
  "originalName" | "setIngredientPreferences" | "newName"
>

export const checkIfOriginal = ({
  newName,
  originalName,
}: CheckOriginalProps): boolean => {
  return originalName === newName
}

const removePreference = ({
  dishName,
  ingredientPreferences,
  originalName,
  dishes,
}: RemovePreferenceProps) => {
  const ingredientPreference = ingredientPreferences[dishName] || {
    dishName,
    id: dishes[dishName].id,
    preferredIngredients: [],
  }
  const copy = cloneDeep(ingredientPreference)
  const arr = copy.preferredIngredients.filter((pref) => {
    return pref.originalName !== originalName
  })
  copy.preferredIngredients = arr
  return { ...ingredientPreferences, [dishName]: copy }
}

const addPreference = ({
  dishName,
  ingredientPreferences,
  newName,
  originalName,
  dishes,
}: AddPreferenceProps) => {
  const ingredientPreference = ingredientPreferences[dishName] || {
    dishName,
    id: dishes[dishName].id,
    preferredIngredients: [],
  }
  const copy = cloneDeep(ingredientPreference)
  // * removing fromm array

  copy.preferredIngredients.push({
    id: 1,
    originalName: originalName,
    preferredName: newName,
  })
  const newState = { ...ingredientPreferences, [dishName]: copy }
  return newState
}
const modifyPreference = ({
  dishName,
  ingredientPreferences,
  newName,
  dishes,
}: ModifyPreferenceProps) => {
  const ingredientPreference = ingredientPreferences[dishName] || {
    dishName,
    id: dishes[dishName].id,
    preferredIngredients: [],
  }
  const copy = cloneDeep(ingredientPreference)
  for (const pref of copy.preferredIngredients) {
    if (pref.originalName === dishName) {
      pref.preferredName = newName
      break
    }
  }

  const newState = { ...ingredientPreferences, [dishName]: copy }
  return newState
}

const checkIfInside = ({
  ingredientPreferences,
  dishName,
}: CheckInsideProps): boolean => {
  // * makes app not crash when property is not specifed
  try {
    for (const pref of ingredientPreferences[dishName].preferredIngredients) {
      if (pref.originalName === dishName) {
        return true
      }
    }
    return false
  } catch (e) {
    return false
  }
}

export const changeIngredients = (
  data: FullProps
): Record<string, IngredientPreference> => {
  // * probably not neccessary
  // data.ingredientPreferences = cloneDeep(data.ingredientPreferences)
  //* it makes no sense for ingredient to be replaced with itself
  if (checkIfOriginal(data)) {
    return removePreference(data)
  } else {
    if (checkIfInside(data)) {
      return modifyPreference(data)
    } else {
      return addPreference(data)
    }
  }
}

export const removeAllPreferences = ({
  dishName,
  ingredientPreferences,
  dishes,
}: RemovePreferenceProps) => {
  const ingredientPreference = {
    dishName,
    id: dishes[dishName].id,
    preferredIngredients: [],
  }

  return { ...ingredientPreferences, [dishName]: ingredientPreference }
}
