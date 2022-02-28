import axios from "axios"
import { cloneDeep, omit } from "lodash"
import { SetterOrUpdater } from "recoil"
import { getApiUrl } from "../../../../../../lib/api"
import { DishPreferencesJson } from "../../../api/parseJSON/userJsonTypes.ts"
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

interface IngredientApiProps {
  userDataId: number
}

interface RemoveProps {}

export const removePreferenceBack = async ({
  userDataId,
}: IngredientApiProps) => {
  //  * get id of user mobined datz
  //  * cre
  const url = `${getApiUrl()}/api/user-combined-datas/${userDataId}`
  const body = {
    data: {
      dishPreferences: [{ base: 1, replacement: 2 }],
    },
  }
  try {
    const res = await axios({
      method: "PUT",
      url: url,
      data: body,
    })

    return res
  } catch (e) {
    console.log(e, "!!!!")
    return 1
  }
}

export const removeIngredientPreferences = async ({
  userDataId,
}: IngredientApiProps) => {
  const url = `${getApiUrl()}/api/user-combined-datas/${userDataId}`
  const body = {
    data: {
      ingredientPreferences: [
        {
          dish: 1,
          preferredReplacements: [{ originalName: "a", preferredName: "V" }],
        },
      ],
    },
  }
  try {
    const res = await axios({
      method: "PUT",
      url: url,
      data: body,
    })
  } catch (e) {
    console.log(e, "!!!!")
    return 1
  }
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
