export const example = {
  userId: 8,
  createdAt: "2022-02-22T22:53:29.566Z",
  updatedAt: "2022-02-28T16:44:56.405Z",

  userData: {
    id: 3,
    age: 18,
  },

  userDiet: {
    id: 8,
    timeRange: {
      id: 8,
      start: "2015-08-01",
      end: "2015-08-01",
    },
    diet: {
      data: {
        id: 1,
        attributes: {
          createdAt: "2022-02-22T13:59:06.019Z",
          updatedAt: "2022-02-28T16:39:38.089Z",
          name: "Dieta testowa",
        },
      },
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
