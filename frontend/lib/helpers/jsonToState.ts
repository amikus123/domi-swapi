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
interface UserData {
  age: number
}

// * these string are in format YYYY-MM-DD
// * they show the days for which diet is prescribed
interface TimeRange {
  start: string
  end: string
}
// * if possible in diet, we should swap the dish for the preffered one
interface DishPreference {
  id: number
  originalName: string
  preferedName: string
}

interface UserDiet {
  ingredientPreferences: IngredientPreference[]
  dishPreferences: DishPreference[]
  timeRange: TimeRange
  diet: Diet
}
export interface User {
  userId: number
  userData: UserData
  userDiet: UserDiet
}

// TODO !!!
interface Diet {
  name: string
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
const handleDiet = (diet): Diet => {
  return {
    name: diet.data.attributes.name,
  }
}
const handleUserDiet = (diet: any): UserDiet => {
  const res = {
    ingredientPreferences: handleIngredientPreferences(
      diet.ingredientPreferences.data
    ),
    dishPreferences: handleDishPreferences(diet.dishPreferences),
    timeRange: handleTimeRange(diet.timeRange),
    diet: handleDiet(diet.diet),
  }

  return res
}

export const handleUser = (data: any): User => {
  const res = {
    userId: data.userId,
    userData: data.userData,
    userDiet: handleUserDiet(data.userDiet),
  }

  return res
}

export const fire = () => {
  return handleUser(example)
}

export const example = {
  userId: 8,
  userData: {
    id: 1,
    age: 18,
  },
  userDiet: {
    id: 1,
    ingredientPreferences: {
      data: [
        {
          id: 1,
          attributes: {
            dish: {
              data: {
                id: 1,
                attributes: {
                  name: "Spaghetti",
                  slug: null,
                },
              },
            },
            preferredIngredients: [
              {
                id: 2,
                originalName: "makaron",
                preferredName: "pigwa",
              },
              {
                id: 4,
                originalName: "pog ",
                preferredName: "champ",
              },
            ],
          },
        },
        {
          id: 2,
          attributes: {
            dish: {
              data: {
                id: 2,
                attributes: {
                  name: "Jajecznica",
                  slug: null,
                },
              },
            },
            preferredIngredients: [
              {
                id: 3,
                originalName: "cebula",
                preferredName: "ser",
              },
              {
                id: 5,
                originalName: "asdads",
                preferredName: "asdasd",
              },
            ],
          },
        },
      ],
    },
    dishPreferences: [
      {
        id: 1,
        original: {
          data: {
            id: 1,
            attributes: {
              name: "Spaghetti",
              slug: null,
            },
          },
        },
        preferred: {
          data: {
            id: 2,
            attributes: {
              name: "Jajecznica",
              slug: null,
            },
          },
        },
      },
      {
        id: 2,
        original: {
          data: {
            id: 2,
            attributes: {
              name: "Jajecznica",
              slug: null,
            },
          },
        },
        preferred: {
          data: {
            id: 1,
            attributes: {
              name: "Spaghetti",
              slug: null,
            },
          },
        },
      },
    ],
    timeRange: {
      id: 1,
      start: "2022-02-08",
      end: "2022-02-24",
    },
    diet: {
      data: {
        id: 1,
        attributes: {
          name: "Dieta testowa",
        },
      },
    },
  },
}
