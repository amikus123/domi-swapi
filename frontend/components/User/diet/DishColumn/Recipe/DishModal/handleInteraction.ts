import { SetterOrUpdater } from "recoil"
import { IngredientPreference, Dish, DishPreference } from "../../../api/types"
import { updateDishes } from "./APIRequest"
import { changeDishPreference } from "./functions"

export interface HandleDishChangeProps {
  newName: string
  originalName: string
  dishes: Record<string, Dish>
  userDataId: number
  // * object from use toast hook
  toast: any
  loading: boolean
  toastSuccessTitle?: string
  toastFailTitle?: string
  setLoading: React.Dispatch<React.SetStateAction<boolean>>

  dishPreference: Record<string, DishPreference>

  setDishPreference: SetterOrUpdater<Record<string, DishPreference>>
}

export const handlDishChange = async (data: HandleDishChangeProps) => {
  const {
    newName,
    dishes,
    originalName,
    userDataId,
    toast,
    dishPreference,
    setDishPreference,
    setLoading,
    loading,
    toastSuccessTitle = "Udało się zmienić danie",
    toastFailTitle = "Nie udało się zmienić dania",
  } = data
  if (!loading) {
    const newDishPreferences = changeDishPreference({
      newName,
      originalName,
      dishPreference,
    })

    setLoading(true)

    const wasRequestSuccessful = await updateDishes({
      data: newDishPreferences,
      userDataId,
      dishes,
    })
    if (wasRequestSuccessful) {
      toast({
        title: toastSuccessTitle,
        description: "",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      setDishPreference(newDishPreferences)
    } else {
      toast({
        title: toastFailTitle,
        description: "",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }
    setLoading(false)
  }
}
