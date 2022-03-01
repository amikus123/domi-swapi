import { cloneDeep, omit } from "lodash"
import { DishPreference } from "../../../api/types"

interface Full {
  // * defaul dish
  originalName: string
  // * clicked dish
  newName: string
  // * global preferences
  dishPreference: Record<string, DishPreference>,
}
type CheckIfOriginalProps = Omit<Full, "dishPreference" >
type RemovePreferenceProps = Omit<Full, "originalName">

const checkIfOriginal = ({ newName, originalName }: CheckIfOriginalProps) => {
  return originalName === newName
}

const removePreference = ({
  dishPreference,
  newName,
  
}: RemovePreferenceProps) => {
  let copy = cloneDeep(dishPreference)
  copy = omit(copy, newName)
  return copy
}

const modifyPreference = ({
  dishPreference,
  newName,
  originalName,
}: Full) => {
  const copy = cloneDeep(dishPreference)
  copy[originalName] = {
    preferedName: newName,
    id: 1,
    originalName: originalName,
  }

  return copy
}

export const changeDishPreference = (data: Full):Record<string, DishPreference> => {
  //* it makes no sense for dish to be replaced with itself
  if (checkIfOriginal(data)) {
    //* removes preference, shows default
    return removePreference(data)
  } else {
    //* changes displayed dish
    return modifyPreference(data)
  }
}
