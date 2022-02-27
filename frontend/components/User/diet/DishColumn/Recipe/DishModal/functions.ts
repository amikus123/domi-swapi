import { cloneDeep, omit } from "lodash"
import { SetterOrUpdater } from "recoil"
import { DishPreference } from "../../../api/types"

const checkIfOriginal = (originalName: string, newName: string) => {
  return originalName === newName
}

const removePreference = (
  name: string,
  dishPreference: Record<string, DishPreference>,
  setDishPreference: SetterOrUpdater<Record<string, DishPreference>>
) => {
  // * by removing the key, we return to default
  let copy = cloneDeep(dishPreference)
  copy = omit(copy, name)
  setDishPreference(copy)
}
const modifyPreference = (
  originalName: string,
  newName: string,
  dishPreference: Record<string, DishPreference>,
  setDishPreference: SetterOrUpdater<Record<string, DishPreference>>
) => {
  const copy = cloneDeep(dishPreference)
  copy[originalName] = {
    preferedName: newName,
    id: 1,
    originalName: originalName,
  }

  setDishPreference(copy)
}

export const handleDishChange = (
  // * name of dish specifed in dietDay
  originalName: string,
  //* name of item to which we swap
  newName: string,
  dishPreference: Record<string, DishPreference>,
  setDishPreference: SetterOrUpdater<Record<string, DishPreference>>
) => {
  console.log(newName, originalName, dishPreference, "XDDD")
  if (!checkIfOriginal(originalName, newName)) {
    modifyPreference(originalName, newName, dishPreference, setDishPreference)
  } else {
    removePreference(newName, dishPreference, setDishPreference)
  }
}
