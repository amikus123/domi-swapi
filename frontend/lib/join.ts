export const xd = {
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
}

const a = [
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
]

const xdd = [
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
]
