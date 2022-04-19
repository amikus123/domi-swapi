import { DishUniqueData, DietDay, Diet } from "../../types/dietPage/dietTypes"
import { DishReplacement, DishPreference } from "../../types/dietPage/dishTypes"
import { TimeRange } from "../../types/dietPage/timeTypes"
import {
  UserFullData,
  IngredientPreference,
  UserDiet,
  UserPersonalData,
} from "../../types/dietPage/userTypes"
import {
  DayJson,
  StubDishesWrapJson,
  DishReplacementJson,
  DietJsonWrap,
  UserRequestDataJson,
  IngredientPreferenceJson,
  DishPreferencesJson,
  TimeRangeJson,
  UserDietJson,
  UserDataJson,
} from "../../types/JSON/raw/userJsonTypes.ts"

export const handleDietDays = (
  dietDays: DayJson[],
  uniqueDishes: Record<string, DishUniqueData>
): DietDay[] => {
  // console.log(dietDays,"XD")
  const res: DietDay[] = dietDays.map((day) => {
    return {
      id: day.id,
      uniqeDishDatas: handleDishUniqueData(day.dishes, uniqueDishes),
    }
  })

  return res
}

export const handleDishUniqueData = (
  dishes: StubDishesWrapJson,
  uniqueDishes: Record<string, DishUniqueData>
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

export const handleDishReplacements = (
  dishReplacements: DishReplacementJson[],
  uniqueDishes: Record<string, DishUniqueData>
): Record<string, DishReplacement> => {
  const res: Record<string, DishReplacement> = {}
  dishReplacements.forEach((i) => {
    const { possibleReplacements, original } = i
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

export const handleDiet = (
  diet: DietJsonWrap,
  uniqueDishes: Record<string, DishUniqueData>
): Diet => {
  return {
    name: diet.data.attributes.name,
    days: handleDietDays(diet.data.attributes.days, uniqueDishes),
    dishReplacements: handleDishReplacements(
      diet.data.attributes.dishReplacements,
      uniqueDishes
    ),
  }
}
export const handleUser = (data: UserRequestDataJson): UserFullData => {
  const uniqueDishes: Record<string, DishUniqueData> = {}
  //* FUNCTIONS

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

  const handleUniqueDishes = (): Record<string, DishUniqueData> => {
    return uniqueDishes
  }

  const handleUserDiet = (diet: UserDietJson): UserDiet => {
    const res: UserDiet = {
      timeRange: handleTimeRange(diet.timeRange),
      diet: handleDiet(diet.diet, uniqueDishes),
    }

    return res
  }
  const handlePersonalData = (personalData: UserDataJson): UserPersonalData => {
    const { age } = personalData
    return {
      age,
    }
  }

  const { attributes, id } = data
  const { dishPreferences, ingredientPreferences, userData, userDiet, userId } =
    attributes

  const res: UserFullData = {
    userId: userId,
    userPersonalData: handlePersonalData(userData),
    userDiet: handleUserDiet(userDiet),
    dishPreferences: handleDishPreferences(dishPreferences),
    ingredientPreferences: handleIngredientPreferences(ingredientPreferences),
    uniqueDishes: {},
    userDataId: id,
  }

  res.uniqueDishes = handleUniqueDishes()
  return res
}
