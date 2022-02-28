import {
  User,
  DishUniqueData,
  DietDay,
  IngredientPreference,
  DishPreference,
  TimeRange,
  DishReplacement,
  Diet,
  UserDiet,
} from "../types"
import {example }from "./exaple"


type JSONDAta = typeof example



export const handleUser = (data: JSONDAta): User => {
  const uniqueDishes: Record<string, DishUniqueData> = {}
  //* FUNCTIONS

  const handleDishUniqueData = (dishes): DishUniqueData[] => {
    const res: DishUniqueData[] = dishes.map((item) => {
      const a: DishUniqueData = {
        id: item.id,
        name: item.attributes.name,
        originalName: item.attributes.name,
      }

      //* add dish if possible
      if (uniqueDishes[item.attributes.name] === undefined) {
        uniqueDishes[item.attributes.name] = a
      }
      return a
    })
    return res
  }

  const handleDietDays = (dietDays): DietDay[] => {
    // console.log(dietDays,"XD")
    const res: DietDay[] = dietDays.map((day) => {
      return {
        id: day.id,
        uniqeDishDatas: handleDishUniqueData(day.dishes.data),
      }
    })

    return res
  }
  const handleIngredientPreferences = (
    ingredientPreferences
  ): Record<string, IngredientPreference> => {
    // return array
    const res: Record<string, IngredientPreference> = {}
    ingredientPreferences.forEach((preference) => {
      const obj: IngredientPreference = {
        id: preference.id,
        dishName: preference.attributes.dish.data.attributes.name,
        preferredIngredients: preference.attributes.preferredIngredients,
      }
      res[obj.dishName] = obj
    })
    return res
  }

  const handleDishPreferences = (
    dishPreferences
  ): Record<string, DishPreference> => {
    const res: Record<string, DishPreference> = {}
    dishPreferences.forEach((preference) => {
      const obj: DishPreference = {
        id: preference.id,
        originalName: preference.original.data.attributes.name,
        preferedName: preference.preferred.data.attributes.name,
      }
      res[preference.original.data.attributes.name] = obj
    })
    return res
  }
  const handleTimeRange = (timeRange): TimeRange => {
    return {
      start: timeRange.start,
      end: timeRange.end,
    }
  }

  const handleDishReplacements = (
    dishReplacements: any[]
  ): Record<string, DishReplacement> => {
    const res: Record<string, DishReplacement> = {}
    dishReplacements.forEach((i) => {
      const { replacements, original } = i
      const originalName = original.data.attributes.name
      const arr: string[] = []
      replacements.data.forEach((d) => {
        arr.push(d.attributes.name)
        if (uniqueDishes[d.attributes.name] === undefined) {
          console.log("ADDDEDD")
          uniqueDishes[d.attributes.name] = {
            name: d.attributes.name,
            id: d.id,
            originalName: d.attributes.name,
          }
        }
      })
      res[originalName] = {
        original: originalName,
        replacements: arr,
        currrent: originalName,
      }
    })
    return res
  }

  const handleDiet = (diet): Diet => {
    return {
      name: diet.data.attributes.name,
      days: handleDietDays(diet.data.attributes.days),
      dishReplacements: handleDishReplacements(
        diet.data.attributes.dishReplacements
      ),
    }
  }

  const handleUniqueDishes = () => {
    console.log(uniqueDishes, "ASSSSSSSSSSSSSS")
    return uniqueDishes
  }

  const handleUserDiet = (diet: any): UserDiet => {
    const res: UserDiet = {
      ingredientPreferences: handleIngredientPreferences(
        diet.ingredientPreferences.data
      ),
      dishPreferences: handleDishPreferences(diet.dishPreferences),
      timeRange: handleTimeRange(diet.timeRange),
      diet: handleDiet(diet.diet),
      uniqueDishes: handleUniqueDishes(),
    }

    return res
  }




  const res = {
    userId: data.userId,
    userData: data.userData,
    userDiet: handleUserDiet(data.userDiet),
  }

  return res
}
