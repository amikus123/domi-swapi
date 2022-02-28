export interface UserJson {
  userId: number
  createdAt: string
  updatedAt: string
  userData: UserDataJson
  userDiet: UserDietJson
  dishPreferences: DishPreferencesJson[]
  ingredientPreferences: IngredientPreferenceJson[]
}
export interface UserDataJson {
  id: number
  age: number
}
export interface UserDietJson {
  id: number
  timeRange: TimeRangeJson
  diet: DietJsonWrap
}

export interface DietJsonWrap {
  data: {
    id: number
    attributes: DietJson
  }
}
export interface DietJson {
  createdAt: string
  updatedAt: string
  name: string
  dishReplacements: DishReplacementJson[]
  days: DayJson[]
}

export interface DishReplacementJson {
  id: number
  possibleReplacements: StubDishesWrapJson
  original: StubDishWrapJson
}
export interface DayJson {
  id: number
  dishes: StubDishesWrapJson
}
export interface TimeRangeJson {
  start: string
  end: string
  id: number
}

export interface PreferedIngredientReplacementJson {
  id: number
  originalName: string
  preferredName: string
}
export interface IngredientPreferenceJson {
  id: number
  preferredReplacements: PreferedIngredientReplacementJson[]
  dish: StubDishWrapJson
}

export interface DishPreferencesJson {
  id: number
  replacement: StubDishWrapJson

  base: StubDishWrapJson
}

export interface StubDishWrapJson {
  data: {
    id: number
    attributes: StubDishJson
  }
}

export interface StubDishesWrapJson {
  data: {
    id: number
    attributes: StubDishJson
  }[]
}

export interface StubDishJson {
  name: string
  createdAt: string
  updatedAt: string
  slug: string
  meal: string
  recipe: string
  description: string
}

export const exampleJson: UserJson = {
  userId: 8,
  createdAt: "2022-02-22T22:53:29.566Z",
  updatedAt: "2022-02-28T16:44:56.405Z",
  userData: {
    id: 3,
    age: 18,
  },
  userDiet: {
    id: 8,
    diet: {
      data: {
        id: 1,
        attributes: {
          createdAt: "2022-02-22T13:59:06.019Z",
          updatedAt: "2022-02-28T16:39:38.089Z",
          name: "Dieta testowa",
          dishReplacements: [
            {
              id: 1,
              possibleReplacements: {
                data: [
                  {
                    id: 3,
                    attributes: {
                      name: "Salad",
                      createdAt: "2022-02-25T00:27:57.868Z",
                      updatedAt: "2022-02-28T16:54:05.976Z",
                      slug: "sala",
                      meal: "obiad",
                      recipe: "a",
                      description: "s",
                    },
                  },
                  {
                    id: 4,
                    attributes: {
                      name: "Pancake",
                      createdAt: "2022-02-25T00:40:50.344Z",
                      updatedAt: "2022-02-28T16:53:55.364Z",
                      slug: "pan",
                      meal: "obiad",
                      recipe: "a",
                      description: "s",
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
                    updatedAt: "2022-02-28T16:53:46.765Z",
                    slug: "jajecznica",
                    meal: "sniadanie",
                    recipe: "a",
                    description: "s",
                  },
                },
              },
            },

            {
              id: 2,
              possibleReplacements: {
                data: [
                  {
                    id: 5,
                    attributes: {
                      name: "Tost",
                      createdAt: "2022-02-25T00:48:48.107Z",
                      updatedAt: "2022-02-28T16:54:22.167Z",
                      slug: "tost",
                      meal: "sniadanie",
                      recipe: "a",
                      description: "s",
                    },
                  },
                ],
              },
              original: {
                data: {
                  id: 3,
                  attributes: {
                    name: "Salad",
                    createdAt: "2022-02-25T00:27:57.868Z",
                    updatedAt: "2022-02-28T16:54:05.976Z",
                    slug: "sala",
                    meal: "obiad",
                    recipe: "a",
                    description: "s",
                  },
                },
              },
            },
            {
              id: 3,
              possibleReplacements: {
                data: [
                  {
                    id: 1,
                    attributes: {
                      name: "Spaghetti",
                      createdAt: "2022-02-22T13:38:04.474Z",
                      updatedAt: "2022-02-28T16:54:14.966Z",
                      slug: "spaghetti",
                      meal: "obiad",
                      recipe: "a",
                      description: "s",
                    },
                  },
                ],
              },
              original: {
                data: {
                  id: 4,
                  attributes: {
                    name: "Pancake",
                    createdAt: "2022-02-25T00:40:50.344Z",
                    updatedAt: "2022-02-28T16:53:55.364Z",
                    slug: "pan",
                    meal: "obiad",
                    recipe: "a",
                    description: "s",
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
                      updatedAt: "2022-02-28T16:54:14.966Z",
                      slug: "spaghetti",
                      meal: "obiad",
                      recipe: "a",
                      description: "s",
                    },
                  },
                  {
                    id: 2,
                    attributes: {
                      name: "Jajecznica",
                      createdAt: "2022-02-22T13:49:30.901Z",
                      updatedAt: "2022-02-28T16:53:46.765Z",
                      slug: "jajecznica",
                      meal: "sniadanie",
                      recipe: "a",
                      description: "s",
                    },
                  },
                  {
                    id: 3,
                    attributes: {
                      name: "Salad",
                      createdAt: "2022-02-25T00:27:57.868Z",
                      updatedAt: "2022-02-28T16:54:05.976Z",
                      slug: "sala",
                      meal: "obiad",
                      recipe: "a",
                      description: "s",
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
                      updatedAt: "2022-02-28T16:54:14.966Z",
                      slug: "spaghetti",
                      meal: "obiad",
                      recipe: "a",
                      description: "s",
                    },
                  },
                  {
                    id: 4,
                    attributes: {
                      name: "Pancake",
                      createdAt: "2022-02-25T00:40:50.344Z",
                      updatedAt: "2022-02-28T16:53:55.364Z",
                      slug: "pan",
                      meal: "obiad",
                      recipe: "a",
                      description: "s",
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    },
    timeRange: {
      id: 8,
      start: "2015-08-01",
      end: "2015-08-01",
    },
  },
  dishPreferences: [
    {
      id: 2,
      replacement: {
        data: {
          id: 2,
          attributes: {
            name: "Jajecznica",
            createdAt: "2022-02-22T13:49:30.901Z",
            updatedAt: "2022-02-28T16:53:46.765Z",
            slug: "jajecznica",
            meal: "sniadanie",
            recipe: "a",
            description: "s",
          },
        },
      },
      base: {
        data: {
          id: 1,
          attributes: {
            name: "Spaghetti",
            createdAt: "2022-02-22T13:38:04.474Z",
            updatedAt: "2022-02-28T16:54:14.966Z",
            slug: "spaghetti",
            meal: "obiad",
            recipe: "a",
            description: "s",
          },
        },
      },
    },
  ],
  ingredientPreferences: [
    {
      id: 2,
      preferredReplacements: [
        {
          id: 6,
          originalName: "a",
          preferredName: "a",
        },
        {
          id: 7,
          originalName: "s",
          preferredName: "s",
        },
      ],
      dish: {
        data: {
          id: 1,
          attributes: {
            name: "Spaghetti",
            createdAt: "2022-02-22T13:38:04.474Z",
            updatedAt: "2022-02-28T16:54:14.966Z",
            slug: "spaghetti",
            meal: "obiad",
            recipe: "a",
            description: "s",
          },
        },
      },
    },
  ],
}

// ! DATA FOR FOLLOWING REQUEST
// const query = qs.stringify(
//     {
//       populate: [
//         "userData",
//         "userDiet",
//         "userDiet.diet",
//         "userDiet.timeRange",
//         "dishPreferences",
//         "dishPreferences.base",
//         "dishPreferences.replacement",
//         "ingredientPreferences",
//         "ingredientPreferences.dish",
//         "ingredientPreferences.preferredReplacements",
//       ],
//       filters: {
//         userId: {
//           $eq: id,
//         },
//       },
//     },
//     {
//       encodeValuesOnly: true,
//     }
//   )
