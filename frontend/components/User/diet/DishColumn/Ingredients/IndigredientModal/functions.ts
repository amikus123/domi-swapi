import { cloneDeep } from "lodash"
import { SetterOrUpdater } from "recoil"
import { IngredientPreference } from "../../../api/types"

interface FullProps {
  //* name of default ingredient
  originalName: string
  // * shown dish
  dishName: string
  // * name of new ingredient
  newName: string
  // * global object with preferece
  ingredientPreferences: Record<string, IngredientPreference>
  setIngredientPreferences: SetterOrUpdater<
    Record<string, IngredientPreference>
  >
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
// ! id of preference is not important

export const checkIfOriginal = ({
  newName,
  originalName,
}: CheckOriginalProps) => {
  return originalName === newName
}

const removePreference = ({
  dishName,
  ingredientPreferences,
  originalName,
  setIngredientPreferences,
}: RemovePreferenceProps) => {
  const ingredientPreference = ingredientPreferences[dishName] || {
    dishName,
    id: 11,
    preferredIngredients: [],
  }
  const copy = cloneDeep(ingredientPreference)
  const arr = copy.preferredIngredients.filter((pref) => {
    return pref.originalName !== originalName
  })
  copy.preferredIngredients = arr

  setIngredientPreferences({ ...ingredientPreferences, [dishName]: copy })
}

const addPreference = ({
  dishName,
  ingredientPreferences,
  newName,
  originalName,
  setIngredientPreferences,
}: AddPreferenceProps) => {
  const ingredientPreference = ingredientPreferences[dishName] || {
    dishName,
    id: 11,
    preferredIngredients: [],
  }
  let copy = cloneDeep(ingredientPreference)
  // * removing fromm array

  copy.preferredIngredients.push({
    id: 1,
    originalName: originalName,
    preferredName: newName,
  })

  setIngredientPreferences({ ...ingredientPreferences, [dishName]: copy })
}
const modifyPreference = ({
  dishName,
  ingredientPreferences,
  setIngredientPreferences,
  newName,
}: ModifyPreferenceProps) => {
  const ingredientPreference = ingredientPreferences[dishName] || {
    dishName,
    id: 11,
    preferredIngredients: [],
  }
  const copy = cloneDeep(ingredientPreference)
  for (const pref of copy.preferredIngredients) {
    if (pref.originalName === dishName) {
      pref.preferredName = newName
      break
    }
  }
  setIngredientPreferences({ ...ingredientPreferences, [dishName]: copy })
}

const checkIfInside = ({
  ingredientPreferences,
  dishName,
}: CheckInsideProps): Boolean => {
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

export const changeIngredients = (data: FullProps) => {
  //* it makes no sense for ingredient to be replaced with itself
  if (checkIfOriginal(data)) {
    removePreference(data)
  } else {
    if (checkIfInside(data)) {
      modifyPreference(data)
    } else {
      addPreference(data)
    }
  }
}
