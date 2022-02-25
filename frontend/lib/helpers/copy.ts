export type DishTimeCategory = "Obiad" | "Kolacja" | "Sniadanie"

// * user has array of these, dish name is name of the dish
// * for which prefered ingredienst should be applied
export interface IngredientPreference {
  id: number
  dishName: string
  preferredIngredients: PreferedIngredient[]
}

// * if possible we should swap original ingredient for the preferred one
export interface PreferedIngredient {
  id: number
  originalName: string
  preferredName: string
}

// * user personal information, age height etc
export interface UserData {
  age: number
}

// * these string are in format YYYY-MM-DD
// * they show the days for which diet is prescribed
export interface TimeRange {
  start: string
  end: string
}

export interface DateRange {
  start: Date
  end: Date
}
// * if possible in diet, we should swap the dish for the preffered one
export interface DishPreference {
  id: number
  originalName: string
  preferedName: string
}

export interface UserDiet {
  ingredientPreferences: IngredientPreference[]
  dishPreferences: DishPreference[]
  timeRange: TimeRange
  diet: Diet
  uniqueDishes: Record<string, DishUniqueData>
}
export interface User {
  userId: number
  userData: UserData
  userDiet: UserDiet
}

export interface Ingredient extends NameAmount {
  replacements: NameAmount[]
}
export interface NameAmount {
  name: string
  amount: string
}

export interface Dish {
  id: number
  name: string
  slug: string
  nutrients: NameAmount[]
  ingredients: Ingredient[]
  timeCategory: DishTimeCategory
  // * if it exists, create url to page
  dishPage: null | string
  // * image object, idk how to type it
  image: any
}
export interface DietDay {
  id: number
  uniqeDishDatas: DishUniqueData[]
}
export interface DishReplacement {
  // name of base dish
  original: string
  replacements: string[]
}
export interface DishUniqueData {
  id: number
  name: string
}
export interface Diet {
  name: string
  days: DietDay[]
  dishReplacements: DishReplacement[]
}

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
  ): IngredientPreference[] => {
    // return array
    const preferenceArr = ingredientPreferences.map((preference) => {
      return {
        id: preference.id,
        dishName: preference.attributes.dish.data.attributes.name,
        preferredIngredients: preference.attributes.preferredIngredients,
      }
    })
    return preferenceArr
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

const createUrl = (slug: string) => {
  //* will create link to relevant dish post
  return slug
}

const handleDishPage = (dishPage) => {
  console.log(dishPage, "XDD")
  //* if page in not linked, we return null

  if (dishPage && dishPage.data) {
    const slug: string = dishPage.data.attributes.slug
    return createUrl(slug)
  } else {
    return null
  }
}

const handleDish = (dish): Dish => {
  const res: Dish = {
    image: dish.attributes.image,
    dishPage: handleDishPage(dish.attributes.dishPage),
    id: dish.id,
    name: dish.attributes.name,
    slug: dish.attributes.slug,
    ingredients: dish.attributes.ingredients,
    nutrients: dish.attributes.nutrients,
    timeCategory: dish.attributes.meal,
  }
  return res
}

export const uniqueDishHandler = (dishData: any): Record<string, Dish> => {
  const res: Record<string, Dish> = {}
  dishData.data.forEach((dish) => {
    const formatedDist = handleDish(dish)
    const name = formatedDist.name
    res[name] = formatedDist
  })
  return res
}
