import { cloneDeep, omit } from "lodash"
import { SetterOrUpdater } from "recoil"
import { DishPreference } from "../../../api/types"

interface Full {
  // * defaul dish
  originalName: string
  // * clicked dish
  newName: string
  // * global preferences
  dishPreference: Record<string, DishPreference>
  setDishPreference: SetterOrUpdater<Record<string, DishPreference>>
}
type CheckIfOriginalProps = Omit<Full, "dishPreference" | "setDishPreference">
type RemovePreferenceProps = Omit<Full, "originalName">

const checkIfOriginal = ({ newName, originalName }: CheckIfOriginalProps) => {
  return originalName === newName
}

const removePreference = ({
  dishPreference,
  newName,
  setDishPreference,
}: RemovePreferenceProps) => {
  let copy = cloneDeep(dishPreference)
  copy = omit(copy, newName)
  setDishPreference(copy)
}

const modifyPreference = ({
  dishPreference,
  newName,
  originalName,
  setDishPreference,
}: Full) => {
  const copy = cloneDeep(dishPreference)
  copy[originalName] = {
    preferedName: newName,
    id: 1,
    originalName: originalName,
  }

  setDishPreference(copy)
}

export const handleDishChange = (data: Full) => {
    //* it makes no sense for dish to be replaced with itself
  if (checkIfOriginal(data)) {
    //* removes preference, shows default
    removePreference(data)
  } else {
    //* changes displayed dish
    modifyPreference(data)
  }
}
