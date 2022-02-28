import {
  UserPersonalData,
  DishUniqueData,
  DietDay,
  IngredientPreference,
  DishPreference,
  TimeRange,
  DishReplacement,
  Diet,
  UserDiet,
  UserFullData,
} from "../types"
import {
  DayJson,
  DietJsonWrap,
  DishPreferencesJson,
  DishReplacementJson,
  IngredientPreferenceJson,
  StubDishesWrapJson,
  TimeRangeJson,
  UserDataJson,
  UserDietJson,
  UserJson,
} from "./userJsonTypes.ts"

export const handleUser = (data: UserJson): UserFullData => {
  const uniqueDishes: Record<string, DishUniqueData> = {}
  //* FUNCTIONS

  const handleDishUniqueData = (
    dishes: StubDishesWrapJson
  ): DishUniqueData[] => {
    const { data } = dishes

    const res: DishUniqueData[] = data.map((item) => {
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

  const handleDietDays = (dietDays: DayJson[]): DietDay[] => {
    // console.log(dietDays,"XD")
    const res: DietDay[] = dietDays.map((day) => {
      return {
        id: day.id,
        uniqeDishDatas: handleDishUniqueData(day.dishes),
      }
    })

    return res
  }
  const handleIngredientPreferences = (
    ingredientPreferences: IngredientPreferenceJson[]
  ): Record<string, IngredientPreference> => {
    // return array
    const res: Record<string, IngredientPreference> = {}
    ingredientPreferences.forEach((preference) => {
      const obj: IngredientPreference = {
        id: preference.id,
        dishName: preference.dish.data.attributes.name,
        preferredIngredients: preference.preferredReplacements,
      }
      res[obj.dishName] = obj
    })
    return res
  }

  const handleDishPreferences = (
    dishPreferences: DishPreferencesJson[]
  ): Record<string, DishPreference> => {
    const res: Record<string, DishPreference> = {}
    dishPreferences.forEach((preference) => {
      const obj: DishPreference = {
        id: preference.id,
        originalName: preference.base.data.attributes.name,
        preferedName: preference.replacement.data.attributes.name,
      }
      res[preference.base.data.attributes.name] = obj
    })
    return res
  }
  const handleTimeRange = (timeRange: TimeRangeJson): TimeRange => {
    return {
      start: timeRange.start,
      end: timeRange.end,
    }
  }

  const handleDishReplacements = (
    dishReplacements: DishReplacementJson[]
  ): Record<string, DishReplacement> => {
    const res: Record<string, DishReplacement> = {}
    dishReplacements.forEach((i) => {
      const { possibleReplacements, original, id } = i
      const originalName = original.data.attributes.name
      const arr: string[] = []
      possibleReplacements.data.forEach((d) => {
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

  const handleDiet = (diet: DietJsonWrap): Diet => {
    return {
      name: diet.data.attributes.name,
      days: handleDietDays(diet.data.attributes.days),
      dishReplacements: handleDishReplacements(
        diet.data.attributes.dishReplacements
      ),
    }
  }

  const handleUniqueDishes = (): Record<string, DishUniqueData> => {
    return uniqueDishes
  }

  const handleUserDiet = (diet: UserDietJson): UserDiet => {
    const res: UserDiet = {
      timeRange: handleTimeRange(diet.timeRange),
      diet: handleDiet(diet.diet),
    }

    return res
  }
  const handlePersonalData = (personalData: UserDataJson): UserPersonalData => {
    const { age, id } = personalData
    return {
      age,
    }
  }
  const res: UserFullData = {
    userId: data.userId,
    userPersonalData: handlePersonalData(data.userData),
    userDiet: handleUserDiet(data.userDiet),
    dishPreferences: handleDishPreferences(data.dishPreferences),
    ingredientPreferences: handleIngredientPreferences(
      data.ingredientPreferences
    ),
    uniqueDishes: {},
  }

  res.uniqueDishes = handleUniqueDishes()
  return res
}
