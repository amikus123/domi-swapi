import { SetterOrUpdater } from "recoil"
import { Dish, DishPreference } from "../../../../../../lib/types/dietPage/dishTypes"
import { updateDishes } from "./APIRequest"
import { changeDishPreference } from "./functions"

export interface HandleDishChangeProps {
  newName: string
  originalName: string
  dishes: Record<string, Dish>
  userDataId: number
  // * object from use toast hook
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toast: any
  loading: boolean
  toastSuccessTitle?: string
  toastFailTitle?: string
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  dishPreference: Record<string, DishPreference>
  setDishPreference: SetterOrUpdater<Record<string, DishPreference>>
  isPublic?: boolean
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
    isPublic = false,
  } = data
  if (!loading) {
    const newDishPreferences = changeDishPreference({
      newName,
      originalName,
      dishPreference,
    })

    if (isPublic) {
      toast({
        title: toastSuccessTitle,
        description: "",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      setDishPreference(newDishPreferences)
    } else {
      //  * default behaviour
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
}
