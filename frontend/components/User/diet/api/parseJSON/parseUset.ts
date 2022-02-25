import { User, DishUniqueData, DietDay, IngredientPreference, DishPreference, TimeRange, DishReplacement, Diet, UserDiet } from "../types"

export const handleUser = (data: any): User => {
    const uniqueDishes: Record<string, DishUniqueData> = {}
    //* FUNCTIONS
  
    const handleDishUniqueData = (dishes): DishUniqueData[] => {
      const res: DishUniqueData[] = dishes.map((item) => {
        const a: DishUniqueData = {
          id: item.id,
          name: item.attributes.name,
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
    ): Record<string, IngredientPreference>=> {
      // return array
      const res : Record<string, IngredientPreference>= {}
      ingredientPreferences.forEach((preference) => {
        const obj:IngredientPreference = {
          id: preference.id,
          dishName: preference.attributes.dish.data.attributes.name,
          preferredIngredients: preference.attributes.preferredIngredients,
        }
        res[obj.dishName] = obj
      })
      return res
    }
  
    const handleDishPreferences = (dishPreferences): DishPreference[] => {
      const preferenceArr = dishPreferences.map((preference) => {
        return {
          id: preference.id,
          originalNmae: preference.original.data.attributes.name,
          preferedName: preference.preferred.data.attributes.name,
        }
      })
      return preferenceArr
    }
    const handleTimeRange = (timeRange): TimeRange => {
      return {
        start: timeRange.start,
        end: timeRange.end,
      }
    }
  
    const handleDishReplacements = (dishReplacements): DishReplacement[] => {
      const res: DishReplacement[] = dishReplacements.map((i) => {
        const replacements = i.replacements.data.map((d) => {
          if (uniqueDishes[d.attributes.name] === undefined) {
            uniqueDishes[d.attributes.name] = {
              name: d.attribute.name,
              id: d.attribute.id,
            }
          }
          return d.attributes.name
        })
        return { original: i.original.data.attributes.name, replacements }
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
  
  