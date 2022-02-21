import { Stack, Button } from "@chakra-ui/react"
import {
  addDays,
  isAfter,
  isBefore,
  isSameDay,
  startOfToday,
  subDays,
} from "date-fns"
import React, { useState } from "react"
import DishColumn from "../../components/User/diet/DishColumn/DishColumn"
import MyCalendar from "../../components/User/diet/MyCalendar"
// perchance move to difftent file so it does not always load
import "react-datepicker/dist/react-datepicker.css"
export interface StartAndEndDate {
  start: Date
  end: Date | null
}
export interface Ingredient {
  name: string
  amount: string
}

export interface DishData {
  imageData: any
  name: string
  category: string
  recipe: string
  indigredietnts: Ingredient[]
  nutritions: Ingredient[]
}

export interface DayDate {
  dayName: string
  dateString: string
  kcalCount: number
}
const recipe =
  "Na dużą patelnię wsypać kaszę, dodać łyżkę oleju i chwilę podsmażyć. W międzyczasie dodać suszone oregano. Przesunąć składniki na bok patelni, w wolne miejsce wlać 1 łyżeczkę oleju, włożyć pokrojonego w kosteczkę indyka. Polać sosem sojowym i obsmażać przez około 7 minut mieszając od czasu do czasu. Wymieszać wszystkie składniki na patelni i wlać gorącą wodę, doprawić pieprzem i zagotować. Przykryć pokrywą i gotować pod przykryciem przez 20 minut. Fasolkę przyciąć na końcach i pokroić na kawałki (mrożoną fasolkę należy najpierw rozmrozić, np. na sitku, durszlaku). Gotować przez około 10 minut pod przykryciem, w międzyczasie raz składniki przemieszać. Otworzyć, wymieszać i gotować jeszcze przez około 5 minut do miękkości kaszy. 2 minuty przed końcem gotowania dodać umyty szpinak w liściach i gotować do jego zwiędnięcia."

export interface DayData {
  dishes: DishData[]
  dayData: DayDate
}

export type TrueIngredients = Record<string, string>

export interface BaseDishData {
  name: string
  image: any
  description: any
}
export interface TrueDishData {
  category: string
  name: string
  imageData: any
  // markdown
  recipe: any
  replacements: BaseDishData[]
  indgredients: TrueIngredients
  nutrients: TrueIngredients
}
const indgredientsExample: TrueIngredients = {
  marchewka: "2 sztuki",
  ziemniaki: "2 sztuki",
  kurczak: "50 g",
}
const nutrientsExample: TrueIngredients = {
  kalorie: "2500 kcal",
  białko: "20g",
}

const replacementsExample: BaseDishData[] = []

const dishExample: TrueDishData = {
  category: "Śniadanie",
  imageData: "",
  indgredients: indgredientsExample,
  name: "Jajecznica z jajkami",
  nutrients: nutrientsExample,
  recipe: recipe,
  replacements: replacementsExample,
}

export interface SingleDietDayData {
  date: Date
  dishes: TrueDishData[]
}

const singleDietDay: SingleDietDayData = {
  date: startOfToday(),
  dishes: [dishExample],
}


const diets: SingleDietDayData[] = [singleDietDay]
const diet = () => {
  const [dates, setDates] = useState<StartAndEndDate>({
    start: startOfToday(),
    end: null,
  })
  const minMaxDate: StartAndEndDate = {
    start: subDays(startOfToday(), 4),
    end: addDays(startOfToday(), 4),
  }

  const [singleDate, setSingleDate] = useState<Date>(startOfToday())
  const [showRange, setShowRange] = useState(false)

  const [dietData, setDietData] = useState<SingleDietDayData[]>(diets)

  const filterDiet = (diets: SingleDietDayData[]): SingleDietDayData[] => {
    if (showRange) {
      const x = diets.filter((item) => {
        // filtering based on range, this handles edge cases (or at least it should)
        return (
          (isAfter(item.date, dates.start) ||
            isSameDay(item.date, dates.start)) &&
          (isBefore(item.date, dates.end) || isSameDay(item.date, dates.end))
        )
      })
      console.log(x)
      return x
    } else {
      const x = diets.filter((item) => {
        return isSameDay(item.date, singleDate)
      })
      console.log(x, diets, singleDate)
      return x
    }
  }
  // const [dietData, setDietData] = useState<>([])
  // * date controls data passed to the next components

  return (
    <Stack w="1000px" justify="center" align="center" spacing={20}>
      <MyCalendar
        singleDate={singleDate}
        setSingleDate={setSingleDate}
        dates={dates}
        setDates={setDates}
        minMaxDate={minMaxDate}
        showRange={showRange}
        setShowRange={setShowRange}
      />
      <DishColumn diet={filterDiet(dietData)} />
      <Button>Pobierz</Button>
    </Stack>
  )
}

export default diet

// from api we get the data reange
