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
export type DishTimeCategory = "Obiad" | "Kolacja" | "Sniadanie"
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
  dishes: Dish[]
}
export interface DishReplacements {
  // name of base dish
  original: string
  replacements: string[]
}
export interface Diet {
  name: string
  days: DietDay[]
  dishReplacements: DishReplacements[]
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
      timeCategory: item.attributes.meal,
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
const handleDishReplacements = (dishReplacements): DishReplacements[] => {
  const res: DishReplacements[] = dishReplacements.map((i) => {
    const replacements = i.replacements.data.map((d) => d.attributes.name)
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
                  updatedAt: "2022-02-25T00:48:08.793Z",
                  slug: "spaghetti",
                  meal: "obiad",
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
                  updatedAt: "2022-02-25T00:48:16.390Z",
                  slug: "jajecznica",
                  meal: "sniadanie",
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
              updatedAt: "2022-02-25T00:48:08.793Z",
              slug: "spaghetti",
              meal: "obiad",
            },
          },
        },
        preferred: {
          data: {
            id: 2,
            attributes: {
              name: "Jajecznica",
              createdAt: "2022-02-22T13:49:30.901Z",
              updatedAt: "2022-02-25T00:48:16.390Z",
              slug: "jajecznica",
              meal: "sniadanie",
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
              updatedAt: "2022-02-25T00:48:16.390Z",
              slug: "jajecznica",
              meal: "sniadanie",
            },
          },
        },
        preferred: {
          data: {
            id: 1,
            attributes: {
              name: "Spaghetti",
              createdAt: "2022-02-22T13:38:04.474Z",
              updatedAt: "2022-02-25T00:48:08.793Z",
              slug: "spaghetti",
              meal: "obiad",
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
          updatedAt: "2022-02-25T00:50:08.729Z",
          name: "Dieta testowa",
          dishReplacements: [
            {
              id: 1,
              replacements: {
                data: [
                  {
                    id: 2,
                    attributes: {
                      name: "Jajecznica",
                      createdAt: "2022-02-22T13:49:30.901Z",
                      updatedAt: "2022-02-25T00:48:16.390Z",
                      slug: "jajecznica",
                      meal: "sniadanie",
                    },
                  },
                  {
                    id: 3,
                    attributes: {
                      name: "Salad",
                      createdAt: "2022-02-25T00:27:57.868Z",
                      updatedAt: "2022-02-25T00:48:01.631Z",
                      slug: "sala",
                      meal: "obiad",
                    },
                  },
                ],
              },
              original: {
                data: {
                  id: 5,
                  attributes: {
                    name: "Tost",
                    createdAt: "2022-02-25T00:48:48.107Z",
                    updatedAt: "2022-02-25T00:48:48.107Z",
                    slug: "tost",
                    meal: "sniadanie",
                  },
                },
              },
            },
            {
              id: 2,
              replacements: {
                data: [
                  {
                    id: 2,
                    attributes: {
                      name: "Jajecznica",
                      createdAt: "2022-02-22T13:49:30.901Z",
                      updatedAt: "2022-02-25T00:48:16.390Z",
                      slug: "jajecznica",
                      meal: "sniadanie",
                    },
                  },
                ],
              },
              original: {
                data: {
                  id: 1,
                  attributes: {
                    name: "Spaghetti",
                    createdAt: "2022-02-22T13:38:04.474Z",
                    updatedAt: "2022-02-25T00:48:08.793Z",
                    slug: "spaghetti",
                    meal: "obiad",
                  },
                },
              },
            },
            {
              id: 3,
              replacements: {
                data: [
                  {
                    id: 1,
                    attributes: {
                      name: "Spaghetti",
                      createdAt: "2022-02-22T13:38:04.474Z",
                      updatedAt: "2022-02-25T00:48:08.793Z",
                      slug: "spaghetti",
                      meal: "obiad",
                    },
                  },
                ],
              },
              original: {
                data: {
                  id: 2,
                  attributes: {
                    name: "Jajecznica",
                    createdAt: "2022-02-22T13:49:30.901Z",
                    updatedAt: "2022-02-25T00:48:16.390Z",
                    slug: "jajecznica",
                    meal: "sniadanie",
                  },
                },
              },
            },
          ],
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
                      updatedAt: "2022-02-25T00:48:08.793Z",
                      slug: "spaghetti",
                      meal: "obiad",

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
                      dishPage: {
                        data: null,
                      },
                    },
                  },
                  {
                    id: 2,
                    attributes: {
                      name: "Jajecznica",
                      createdAt: "2022-02-22T13:49:30.901Z",
                      updatedAt: "2022-02-25T00:48:16.390Z",
                      slug: "jajecznica",
                      meal: "sniadanie",

                      nutrients: [
                        {
                          id: 17,
                          name: "Kalorie",
                          amount: "100 kcal",
                        },
                      ],
                      ingredients: [
                        {
                          id: 7,
                          name: "jaja",
                          amount: "3 sztuki",
                          replacements: [],
                        },
                      ],
                      dishPage: {
                        data: null,
                      },
                    },
                  },
                  {
                    id: 3,
                    attributes: {
                      name: "Salad",
                      createdAt: "2022-02-25T00:27:57.868Z",
                      updatedAt: "2022-02-25T00:48:01.631Z",
                      slug: "sala",
                      meal: "obiad",

                      nutrients: [
                        {
                          id: 16,
                          name: "Kalorie",
                          amount: "100 kcal",
                        },
                      ],
                      ingredients: [
                        {
                          id: 6,
                          name: "salata",
                          amount: "10 lisi",
                          replacements: [],
                        },
                        {
                          id: 8,
                          name: "a",
                          amount: "b",
                          replacements: [
                            {
                              id: 18,
                              name: "c",
                              amount: "d",
                            },
                          ],
                        },
                      ],
                      dishPage: {
                        data: null,
                      },
                    },
                  },
                ],
              },
            },
            {
              id: 5,
              dishes: {
                data: [
                  {
                    id: 1,
                    attributes: {
                      name: "Spaghetti",
                      createdAt: "2022-02-22T13:38:04.474Z",
                      updatedAt: "2022-02-25T00:48:08.793Z",
                      slug: "spaghetti",
                      meal: "obiad",

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
                      dishPage: {
                        data: null,
                      },
                    },
                  },
                  {
                    id: 4,
                    attributes: {
                      name: "Pancake",
                      createdAt: "2022-02-25T00:40:50.344Z",
                      updatedAt: "2022-02-25T00:47:50.189Z",
                      slug: "pan",
                      meal: "obiad",

                      nutrients: [
                        {
                          id: 19,
                          name: "sss",
                          amount: "ss",
                        },
                      ],
                      ingredients: [
                        {
                          id: 9,
                          name: "1",
                          amount: "2",
                          replacements: [
                            {
                              id: 20,
                              name: "3",
                              amount: "4",
                            },
                            {
                              id: 21,
                              name: "5",
                              amount: "6",
                            },
                          ],
                        },
                      ],
                      dishPage: {
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
