import { Stack,Button } from "@chakra-ui/react"
import { addDays, subDays } from "date-fns"
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

export interface DayDate{
  dayName:string,
  dateString:string,
  kcalCount:number
}
const recipe = "Na dużą patelnię wsypać kaszę, dodać łyżkę oleju i chwilę podsmażyć. W międzyczasie dodać suszone oregano. Przesunąć składniki na bok patelni, w wolne miejsce wlać 1 łyżeczkę oleju, włożyć pokrojonego w kosteczkę indyka. Polać sosem sojowym i obsmażać przez około 7 minut mieszając od czasu do czasu. Wymieszać wszystkie składniki na patelni i wlać gorącą wodę, doprawić pieprzem i zagotować. Przykryć pokrywą i gotować pod przykryciem przez 20 minut. Fasolkę przyciąć na końcach i pokroić na kawałki (mrożoną fasolkę należy najpierw rozmrozić, np. na sitku, durszlaku). Gotować przez około 10 minut pod przykryciem, w międzyczasie raz składniki przemieszać. Otworzyć, wymieszać i gotować jeszcze przez około 5 minut do miękkości kaszy. 2 minuty przed końcem gotowania dodać umyty szpinak w liściach i gotować do jego zwiędnięcia."

const nut: Ingredient[] = [
  { name: "Białko", amount: "34g" },
  { name: "Białko", amount: "34g" },
  { name: "Białko", amount: "34g" },
  { name: "Białko", amount: "34g" },
  { name: "Białko", amount: "34g" },

]
const ind :Ingredient[] = [
  { name: "Czerwona papryka", amount: "1 sztuka" },
  { name: "Czerwona papryka", amount: "1 sztuka" },
  { name: "Czerwona papryka", amount: "1 sztuka" },
  { name: "Czerwona papryka", amount: "1 sztuka" },
]

const data: DishData[] = [
  {
    category: "Śniadanie",
    imageData: "/86400.jpg",
    indigredietnts: ind,
    nutritions: nut,
    recipe: recipe,
    name: "Jajecznica z jajkami",
  },
  {
    category: "Obiad",
    imageData: "/86400.jpg",
    indigredietnts: ind,
    nutritions: nut,
    recipe: recipe,
    name: "Jajecznica z jajkami",
  },
]

const daily :DayDate = {
  dayName:"Wtorek",
dateString:"11-02-2022",
kcalCount:2500
}

export interface DayData{
  dishes:DishData[],
  dayData:DayDate
}

const dishes :DayData[] = [
  {dishes:data,dayData:daily},
  {dishes:data,dayData:daily},

]

const diet = () => {
  const [dates, setDates] = useState<StartAndEndDate>({
    start: new Date(),
    end: null,
  })
  const minMaxDate: StartAndEndDate = {
    start: subDays(new Date(), 4),
    end: addDays(new Date(), 4),
  }

  const [singleDate, setSingleDate] = useState<Date>(new Date())

  return (
    <Stack w="1000px" justify="center" align="center" spacing={20}>
      <MyCalendar singleDate={singleDate}  setSingleDate={setSingleDate}dates={dates} setDates={setDates} minMaxDate={minMaxDate} />
      <DishColumn  data={dishes} />
      <Button>
        Pobierz
        </Button>
    </Stack>
  )
}

export default diet

// from api we get the data reange
