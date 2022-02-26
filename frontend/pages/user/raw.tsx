import { Stack, Button, useControllableState } from "@chakra-ui/react"
import { startOfToday } from "date-fns"
import React, { useEffect, useState } from "react"
import DishColumn from "../../components/User/diet/DishColumn/DishColumn"
import MyCalendar from "../../components/User/diet/MyCalendar"
// perchance move to difftent file so it does not always load
import "react-datepicker/dist/react-datepicker.css"
import qs from "qs"
import { fetchAPI } from "../../lib/api"
import { parseCookies } from "nookies"
import { uniqueDishHandler } from "../../components/User/diet/api/parseJSON/parseDishes"
import { handleUser } from "../../components/User/diet/api/parseJSON/parseUset"
import { User, Dish } from "../../components/User/diet/api/types"

interface DietProps {
  user: User
  raw: any
  dishData: any
  dishesData: Record<string, Dish>
}

const diet = ({ raw, user, dishData, dishesData }: DietProps) => {
  useEffect(() => {
    console.log(raw)
    console.log(user)
    console.log(dishData)
    console.log(dishesData)
  }, [])
  return (
    <Stack w="1000px" justify="center" align="center" spacing={20}>
      <pre>{JSON.stringify(raw, null, 2)}</pre>
      <p>XDDDDDDDDDDDDDDDDDDD</p>
      <pre>{JSON.stringify(dishData, null, 2)}</pre>
    </Stack>
  )
}

export default diet

export async function getServerSideProps(ctx) {
  const jwt = parseCookies(ctx).jwt

  //* from this call we receive id
  const userData = await fetchAPI(`/users/me`, {
    urlParamsObject: {
      populate: {
        populate: "*",
        role: {
          populate: "*",
        },
        userData: {
          populate: "*",
        },
      },
    },
    jwt,
  })

  const id = userData.id

  const query = qs.stringify(
    {
      populate: [
        "userData",
        "userDiet",
        "userDiet.diet",
        "userDiet.diet.dishReplacements",
        "userDiet.diet.dishReplacements.original",
        "userDiet.diet.dishReplacements.replacements",
        "userDiet.diet.days",
        "userDiet.diet.days.dishes",
        "userDiet.timeRange",
        "userDiet.dishPreferences",
        "userDiet.dishPreferences.original",
        "userDiet.dishPreferences.preferred",
        "userDiet.ingredientPreferences",
        "userDiet.ingredientPreferences.dish",
        "userDiet.ingredientPreferences.preferredIngredients",
      ],
      filters: {
        userId: {
          $eq: id,
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  )

  let userDiet = await fetch(
    `http://localhost:1337/api/user-combined-datas?${query}`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  )
  const temp = await userDiet.json()

  const raw = temp.data[0].attributes
  const user = {}

  //* getting uniqueDishesId
  const arr = (user: User): number[] => {
    return Object.values(user.userDiet.uniqueDishes).map((i) => {
      return i.id
    })
  }

  // fetch dishes
  const dishQuery = qs.stringify(
    {
      populate: [
        "image",
        "nutrients",
        "ingredients",
        "ingredients.replacements",
        "dishPage",
      ],
      filters: {
        id: {
          $in: arr,
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  )

  const dishRequest = await fetch(
    `http://localhost:1337/api/dishes?${dishQuery}`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  )
  const dishData = await dishRequest.json()
  const dishesData = uniqueDishHandler(dishData)
  return {
    props: { raw, user, dishData, dishesData },
  }
}

const xd = {
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
                  updatedAt: "2022-02-26T01:07:19.250Z",
                  slug: "spaghetti",
                  meal: "obiad",
                  recipe:
                    "Lorem ipsum dolor sit amet, **consectetur** adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing elit ut _aliquam_ purus sit amet luctus venenatis lectus. Leo in <u>vitae</u> turpis massa sed elementum tempus egestas sed. Quam vulputate dignissim _suspendisse_**Bold** in est ante in nibh. Pretium fusce id velit ut tortor pretium viverra.",
                  description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque.",
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
                  updatedAt: "2022-02-26T21:11:22.795Z",
                  slug: "jajecznica",
                  meal: "sniadanie",
                  recipe:
                    "Lorem ipsum dolor sit amet, **consectetur** adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit _esse_ cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n",
                  description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Maecenas accumsan lacus vel facilisis volutpat.",
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
              updatedAt: "2022-02-26T01:07:19.250Z",
              slug: "spaghetti",
              meal: "obiad",
              recipe:
                "Lorem ipsum dolor sit amet, **consectetur** adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing elit ut _aliquam_ purus sit amet luctus venenatis lectus. Leo in <u>vitae</u> turpis massa sed elementum tempus egestas sed. Quam vulputate dignissim _suspendisse_**Bold** in est ante in nibh. Pretium fusce id velit ut tortor pretium viverra.",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque.",
            },
          },
        },
        preferred: {
          data: {
            id: 2,
            attributes: {
              name: "Jajecznica",
              createdAt: "2022-02-22T13:49:30.901Z",
              updatedAt: "2022-02-26T21:11:22.795Z",
              slug: "jajecznica",
              meal: "sniadanie",
              recipe:
                "Lorem ipsum dolor sit amet, **consectetur** adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit _esse_ cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Maecenas accumsan lacus vel facilisis volutpat.",
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
              updatedAt: "2022-02-26T21:11:22.795Z",
              slug: "jajecznica",
              meal: "sniadanie",
              recipe:
                "Lorem ipsum dolor sit amet, **consectetur** adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit _esse_ cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Maecenas accumsan lacus vel facilisis volutpat.",
            },
          },
        },
        preferred: {
          data: {
            id: 1,
            attributes: {
              name: "Spaghetti",
              createdAt: "2022-02-22T13:38:04.474Z",
              updatedAt: "2022-02-26T01:07:19.250Z",
              slug: "spaghetti",
              meal: "obiad",
              recipe:
                "Lorem ipsum dolor sit amet, **consectetur** adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing elit ut _aliquam_ purus sit amet luctus venenatis lectus. Leo in <u>vitae</u> turpis massa sed elementum tempus egestas sed. Quam vulputate dignissim _suspendisse_**Bold** in est ante in nibh. Pretium fusce id velit ut tortor pretium viverra.",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque.",
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
          updatedAt: "2022-02-26T22:32:26.452Z",
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
                      updatedAt: "2022-02-26T21:11:22.795Z",
                      slug: "jajecznica",
                      meal: "sniadanie",
                      recipe:
                        "Lorem ipsum dolor sit amet, **consectetur** adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit _esse_ cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n",
                      description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Maecenas accumsan lacus vel facilisis volutpat.",
                    },
                  },
                  {
                    id: 3,
                    attributes: {
                      name: "Salad",
                      createdAt: "2022-02-25T00:27:57.868Z",
                      updatedAt: "2022-02-26T01:06:51.785Z",
                      slug: "sala",
                      meal: "obiad",
                      recipe:
                        "Lorem **ipsum** dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id aliquet risus feugiat in ante metus _dictum_. Vivamus at augue eget arcu dictum varius duis. <u>Semper</u> eget duis at tellus. Tristique magna sit amet purus.\n\n",
                      description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et malesuada fames ac turpis.",
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
                    updatedAt: "2022-02-26T01:07:41.500Z",
                    slug: "tost",
                    meal: "sniadanie",
                    recipe:
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing elit ut aliquam purus sit **amet** luctus venenatis lectus. Leo_Italic_ in vitae turpis <u>massa</u> sed elementum tempus egestas sed. Quam vulputate dignissim suspendisse in est ante in nibh. Pretium fusce id velit ut tortor pretium viverra.",
                    description:
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Integer feugiat scelerisque varius morbi enim nunc faucibus a.",
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
                      updatedAt: "2022-02-26T21:11:22.795Z",
                      slug: "jajecznica",
                      meal: "sniadanie",
                      recipe:
                        "Lorem ipsum dolor sit amet, **consectetur** adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit _esse_ cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n",
                      description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Maecenas accumsan lacus vel facilisis volutpat.",
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
                    updatedAt: "2022-02-26T01:07:19.250Z",
                    slug: "spaghetti",
                    meal: "obiad",
                    recipe:
                      "Lorem ipsum dolor sit amet, **consectetur** adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing elit ut _aliquam_ purus sit amet luctus venenatis lectus. Leo in <u>vitae</u> turpis massa sed elementum tempus egestas sed. Quam vulputate dignissim _suspendisse_**Bold** in est ante in nibh. Pretium fusce id velit ut tortor pretium viverra.",
                    description:
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque.",
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
                      updatedAt: "2022-02-26T01:07:19.250Z",
                      slug: "spaghetti",
                      meal: "obiad",
                      recipe:
                        "Lorem ipsum dolor sit amet, **consectetur** adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing elit ut _aliquam_ purus sit amet luctus venenatis lectus. Leo in <u>vitae</u> turpis massa sed elementum tempus egestas sed. Quam vulputate dignissim _suspendisse_**Bold** in est ante in nibh. Pretium fusce id velit ut tortor pretium viverra.",
                      description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque.",
                    },
                  },
                  {
                    id: 3,
                    attributes: {
                      name: "Salad",
                      createdAt: "2022-02-25T00:27:57.868Z",
                      updatedAt: "2022-02-26T01:06:51.785Z",
                      slug: "sala",
                      meal: "obiad",
                      recipe:
                        "Lorem **ipsum** dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id aliquet risus feugiat in ante metus _dictum_. Vivamus at augue eget arcu dictum varius duis. <u>Semper</u> eget duis at tellus. Tristique magna sit amet purus.\n\n",
                      description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et malesuada fames ac turpis.",
                    },
                  },
                  {
                    id: 5,
                    attributes: {
                      name: "Tost",
                      createdAt: "2022-02-25T00:48:48.107Z",
                      updatedAt: "2022-02-26T01:07:41.500Z",
                      slug: "tost",
                      meal: "sniadanie",
                      recipe:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing elit ut aliquam purus sit **amet** luctus venenatis lectus. Leo_Italic_ in vitae turpis <u>massa</u> sed elementum tempus egestas sed. Quam vulputate dignissim suspendisse in est ante in nibh. Pretium fusce id velit ut tortor pretium viverra.",
                      description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Integer feugiat scelerisque varius morbi enim nunc faucibus a.",
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
                    updatedAt: "2022-02-26T21:11:22.795Z",
                    slug: "jajecznica",
                    meal: "sniadanie",
                    recipe:
                      "Lorem ipsum dolor sit amet, **consectetur** adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit _esse_ cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n",
                    description:
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Maecenas accumsan lacus vel facilisis volutpat.",
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
                      updatedAt: "2022-02-26T01:07:19.250Z",
                      slug: "spaghetti",
                      meal: "obiad",
                      recipe:
                        "Lorem ipsum dolor sit amet, **consectetur** adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing elit ut _aliquam_ purus sit amet luctus venenatis lectus. Leo in <u>vitae</u> turpis massa sed elementum tempus egestas sed. Quam vulputate dignissim _suspendisse_**Bold** in est ante in nibh. Pretium fusce id velit ut tortor pretium viverra.",
                      description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque.",
                    },
                  },
                  {
                    id: 2,
                    attributes: {
                      name: "Jajecznica",
                      createdAt: "2022-02-22T13:49:30.901Z",
                      updatedAt: "2022-02-26T21:11:22.795Z",
                      slug: "jajecznica",
                      meal: "sniadanie",
                      recipe:
                        "Lorem ipsum dolor sit amet, **consectetur** adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit _esse_ cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n",
                      description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Maecenas accumsan lacus vel facilisis volutpat.",
                    },
                  },
                  {
                    id: 3,
                    attributes: {
                      name: "Salad",
                      createdAt: "2022-02-25T00:27:57.868Z",
                      updatedAt: "2022-02-26T01:06:51.785Z",
                      slug: "sala",
                      meal: "obiad",
                      recipe:
                        "Lorem **ipsum** dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id aliquet risus feugiat in ante metus _dictum_. Vivamus at augue eget arcu dictum varius duis. <u>Semper</u> eget duis at tellus. Tristique magna sit amet purus.\n\n",
                      description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et malesuada fames ac turpis.",
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
                      updatedAt: "2022-02-26T01:07:19.250Z",
                      slug: "spaghetti",
                      meal: "obiad",
                      recipe:
                        "Lorem ipsum dolor sit amet, **consectetur** adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing elit ut _aliquam_ purus sit amet luctus venenatis lectus. Leo in <u>vitae</u> turpis massa sed elementum tempus egestas sed. Quam vulputate dignissim _suspendisse_**Bold** in est ante in nibh. Pretium fusce id velit ut tortor pretium viverra.",
                      description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque.",
                    },
                  },
                  {
                    id: 4,
                    attributes: {
                      name: "Pancake",
                      createdAt: "2022-02-25T00:40:50.344Z",
                      updatedAt: "2022-02-26T01:06:25.417Z",
                      slug: "pan",
                      meal: "obiad",
                      recipe:
                        "Lorem **ipsum** dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent semper feugiat nibh sed. _Interdum_ varius sit amet mattis. Vestibulum morbi blandit cursus <u>risus</u> at ultrices. Consequat mauris nunc congue nisi.",
                      description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio morbi quis commodo odio aenean.",
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
