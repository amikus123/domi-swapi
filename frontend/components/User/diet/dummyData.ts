import { addDays, startOfToday } from "date-fns"
import {
  ReplecableIndegredient,
  Ingredient,
  BaseDishData,
  TrueDishData,
  SingleDietDayData,
} from "../../../pages/user/diet"

const recipe =
  "Na dużą patelnię wsypać kaszę, dodać łyżkę oleju i chwilę podsmażyć. W międzyczasie dodać suszone oregano. Przesunąć składniki na bok patelni, w wolne miejsce wlać 1 łyżeczkę oleju, włożyć pokrojonego w kosteczkę indyka. Polać sosem sojowym i obsmażać przez około 7 minut mieszając od czasu do czasu. Wymieszać wszystkie składniki na patelni i wlać gorącą wodę, doprawić pieprzem i zagotować. Przykryć pokrywą i gotować pod przykryciem przez 20 minut. Fasolkę przyciąć na końcach i pokroić na kawałki (mrożoną fasolkę należy najpierw rozmrozić, np. na sitku, durszlaku). Gotować przez około 10 minut pod przykryciem, w międzyczasie raz składniki przemieszać. Otworzyć, wymieszać i gotować jeszcze przez około 5 minut do miękkości kaszy. 2 minuty przed końcem gotowania dodać umyty szpinak w liściach i gotować do jego zwiędnięcia."

const indgredientsExample: ReplecableIndegredient[] = [
  {
    name: "Papryka czerwona",
    amount: "2 sztuki",
    replacements: [
      { name: "Papryka żółta", amount: "2 sztuki" },
      { name: "Papryka zielona ", amount: "2 sztuki" },
    ],
  },
  {
    name: "Kurczak",
    amount: "2 udka sztuki",
    replacements: [
      { name: "Gęś", amount: "200g" },
      { name: "Wieprzowina", amount: "2kg" },
    ],
  },
  {
    name: "cebula",
    amount: "50 g",
    replacements: [
      { name: "Czerwona cebula", amount: "2 sztuki" },
      { name: "czosnek", amount: "3 ząbki" },
    ],
  },
]
const nutrientsExample: Ingredient[] = [{ name: "kalorie", amount: "12asdasd" }]

const replacementsExample: BaseDishData[] = [
  {
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "",
    name: "Kule mięsne",
  },
  {
    description:
      " Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    image: "",
    name: "Kule bez mięsa",
  },
]

const spaghtetti: TrueDishData = {
  category: "Obiad",
  id: 2,
  imageData: "",
  indgredients: [],
  name: "Spaghetti",
  nutrients: [],
  recipe: "",
  replacements: [],
}

const dishes: TrueDishData[] = [
  {
    category: "Śniadanie",
    imageData: "",
    indgredients: indgredientsExample,
    name: "Jajecznica z jajkami",
    nutrients: nutrientsExample,
    recipe: recipe,
    replacements: replacementsExample,
    id: 1,
  },
  spaghtetti,
]

export const dietExample: SingleDietDayData[] = [
  { date: startOfToday(), dishes: dishes, id: 1 },
  {
    date: addDays(startOfToday(), 1),
    dishes: dishes,
    id: 1,
  },
]
