import { SetterOrUpdater } from "recoil"
import { Dish } from "../../../../../../lib/types/dietPage/dishTypes"
import { IngredientPreference } from "../../../../../../lib/types/dietPage/userTypes"
import { updateIngredients } from "./APIRequest"
import { changeIngredients, removeAllPreferences } from "./functions"


export interface HandleIngredientChangeProps {
  newName: string
  dishName: string
  ingredientPreferences: Record<string, IngredientPreference>
  originalName: string
  dishes: Record<string, Dish>
  userDataId: number
  loading: boolean
  // * object from use toast hook
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toast: any
  setLoading: React.Dispatch<React.SetStateAction<boolean>>

  toastSuccessTitle?: string
  toastFailTitle?: string
  setIngredientPreferences: SetterOrUpdater<
    Record<string, IngredientPreference>
  >
  removeAll?: boolean
  isPublic?: boolean
}

export const handleIngredientChange = async (
  data: HandleIngredientChangeProps
) => {
  const {
    newName,
    dishName,
    dishes,
    ingredientPreferences,
    originalName,
    userDataId,
    toast,
    loading,
    setIngredientPreferences,
    setLoading,
    toastSuccessTitle = "Udało się zmienić składnik",
    toastFailTitle = "Nie udało się zmienić składnik",
    removeAll = false,
    isPublic = false,
  } = data
  if (!loading) {
    const newIngredients = removeAll
      ? removeAllPreferences({
          dishName,
          dishes,
          ingredientPreferences,
          originalName,
        })
      : changeIngredients({
          dishName,
          ingredientPreferences,
          newName,
          originalName,
          dishes,
        })

    if (isPublic) {
      toast({
        title: toastSuccessTitle,
        description: "",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      setIngredientPreferences(newIngredients)
    } else {
      setLoading(true)

      const wasRequestSuccessful = await updateIngredients({
        data: newIngredients,
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
        setIngredientPreferences(newIngredients)
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
