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

interface Ingredient extends NameAmount {
  replacements: NameAmount[]
}
interface NameAmount {
  name: string
  amount: string
}
type DishTimeCategory = "Obiad" | "Kolacja" | "Sniadanie"
interface Dish {
  id: number
  name: string
  slug: string
  nutrients: NameAmount[]
  ingredients: Ingredient[]
  timeCategory: DishTimeCategory
  // if it exists, create
  dishPage: null | string
  // * image object, idk how to type it
  image: any
}
interface DietDay {
  id: number
  dishes: Dish[]
}
interface Diet {
  name: string
  days: DietDay[]
}

const createUrl = (slug: string) => {
  //* will create link to relevant dish post
  return slug
}

const handleDishPage = (dishPage) => {
  console.log(dishPage, "XDD")
  //* if page in not linked, we return null

  if (dishPage && dishPage.data) {
    const slug = dishPage.data.attributes.slug
    return createUrl(slug)
  } else {
    return null
  }
}

export const handleDishes = (dishes): Dish[] => {
  const res: Dish[] = dishes.map((item) => {
    console.log(item.attributes)
    const a: Dish = {
      image: item.attributes.image,
      dishPage: handleDishPage(item.attributes.dishPage),
      id: item.id,
      name: item.attributes.name,
      slug: item.attributes.slug,
      ingredients: item.attributes.ingredients,
      nutrients: item.attributes.nutrients,
      timeCategory: item.attributes.timeCategory.data.attributes.name,
    }
    return a
  })
  return res
}

const handleDietDays = (dietDays): DietDay[] => {
  // console.log(dietDays,"XD")
  const res = dietDays.map((day) => {
    return { id: day.id, dishes: handleDishes(day.dishes.data) }
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
const handleDiet = (diet): Diet => {
  return {
    name: diet.data.attributes.name,
    days: handleDietDays(diet.data.attributes.days),
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
  createdAt: "2022-02-22T22:53:29.566Z",
  updatedAt: "2022-02-23T21:36:13.915Z",
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
            createdAt: "2022-02-23T00:52:53.610Z",
            updatedAt: "2022-02-23T21:21:51.140Z",
            dish: {
              data: {
                id: 1,
                attributes: {
                  name: "Spaghetti",
                  createdAt: "2022-02-22T13:38:04.474Z",
                  updatedAt: "2022-02-22T13:52:36.475Z",
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
            createdAt: "2022-02-23T00:54:08.764Z",
            updatedAt: "2022-02-23T21:36:28.937Z",
            dish: {
              data: {
                id: 2,
                attributes: {
                  name: "Jajecznica",
                  createdAt: "2022-02-22T13:49:30.901Z",
                  updatedAt: "2022-02-22T13:53:30.242Z",
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
              createdAt: "2022-02-22T13:38:04.474Z",
              updatedAt: "2022-02-22T13:52:36.475Z",
              slug: null,
            },
          },
        },
        preferred: {
          data: {
            id: 2,
            attributes: {
              name: "Jajecznica",
              createdAt: "2022-02-22T13:49:30.901Z",
              updatedAt: "2022-02-22T13:53:30.242Z",
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
              createdAt: "2022-02-22T13:49:30.901Z",
              updatedAt: "2022-02-22T13:53:30.242Z",
              slug: null,
            },
          },
        },
        preferred: {
          data: {
            id: 1,
            attributes: {
              name: "Spaghetti",
              createdAt: "2022-02-22T13:38:04.474Z",
              updatedAt: "2022-02-22T13:52:36.475Z",
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
          createdAt: "2022-02-22T13:59:06.019Z",
          updatedAt: "2022-02-23T23:10:42.518Z",
          name: "Dieta testowa",
          days: [
            {
              id: 3,
              dishes: {
                data: [
                  {
                    id: 1,
                    attributes: {
                      name: "Spaghetti",
                      createdAt: "2022-02-22T13:38:04.474Z",
                      updatedAt: "2022-02-22T13:52:36.475Z",
                      slug: null,
                      nutrients: [
                        {
                          id: 1,
                          name: "Kalorie",
                          amount: "300 kcal",
                        },
                        {
                          id: 2,
                          name: "Białko",
                          amount: "20g",
                        },
                        {
                          id: 3,
                          name: "Tłuszcz",
                          amount: "10g",
                        },
                        {
                          id: 4,
                          name: "Witamina A",
                          amount: "10ug",
                        },
                      ],
                      ingredients: [
                        {
                          id: 2,
                          name: "Makaron",
                          amount: "100g",
                          replacements: [
                            {
                              id: 8,
                              name: "Makaron rurki",
                              amount: "100g",
                            },
                            {
                              id: 9,
                              name: "Makaron spaghtetii",
                              amount: "100g",
                            },
                          ],
                        },
                        {
                          id: 1,
                          name: "Sos pomidorowy",
                          amount: "100g",
                          replacements: [],
                        },
                        {
                          id: 3,
                          name: "Oregano",
                          amount: "10g",
                          replacements: [
                            {
                              id: 10,
                              name: "Curry",
                              amount: "10g",
                            },
                          ],
                        },
                      ],
                      timeCategory: {
                        data: null,
                      },
                    },
                  },
                  {
                    id: 2,
                    attributes: {
                      name: "Jajecznica",
                      createdAt: "2022-02-22T13:49:30.901Z",
                      updatedAt: "2022-02-22T13:53:30.242Z",
                      slug: null,
                      nutrients: [
                        {
                          id: 11,
                          name: "Kalorie",
                          amount: "100 kcal",
                        },
                      ],
                      ingredients: [
                        {
                          id: 4,
                          name: "Jaja kurze",
                          amount: "3 jaja",
                          replacements: [
                            {
                              id: 14,
                              name: "Jaja gęsie",
                              amount: "3",
                            },
                          ],
                        },
                        {
                          id: 5,
                          name: "Olej",
                          amount: "1 łyżka",
                          replacements: [
                            {
                              id: 15,
                              name: "Oliwa",
                              amount: "1 łyżka",
                            },
                          ],
                        },
                      ],
                      timeCategory: {
                        data: null,
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    },
  },
}
