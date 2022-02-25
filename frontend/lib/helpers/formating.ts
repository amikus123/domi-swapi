import {
  addDays,
  daysToWeeks,
  differenceInCalendarDays,
  isSameDay,
} from "date-fns"
import { cloneDeep } from "lodash"
import Dishingredients from "../../components/User/diet/DishColumn/Dishingredients"
import { DishColumnData } from "../../pages/user/diet"
import {
  DateRange,
  Diet,
  DietDay,
  Dish,
  DishPreference,
  IngredientPreference,
} from "./jsonToState"

export const stringToDate = (dateStr: string): Date => {
  //* dateStr should be in format  YYYY-MM-DD (same as revided from strapi)
  let [y, m, d] = dateStr.split("-")
  return new Date(`${m} ${d}, ${y} 00:00:00`)
}

// get diet, return array of number
// number is index of dietDay for selectedDat
export const getDietArr = (
  dateRange: DateRange,
  dietDays: DietDay[]
): DietDay[] => {
  const uniqueDietDayCount = dietDays.length
  const dayDifference = calculateOffset(dateRange.start, dateRange.end)
  const dietArr: DietDay[] = []
  let index = 0
  for (let i = 0; i <= dayDifference; i++) {
    dietArr.push(dietDays[index])
    index++
    if (index >= uniqueDietDayCount) {
      index = 0
    }
  }
  return dietArr
}

//* calculate offset from first day to find the proper index

const calculateOffset = (date: Date, firstPossibleDate: Date) => {
  return Math.abs(differenceInCalendarDays(firstPossibleDate, date))
}

export const filterSingleDay = (
  date: Date,
  firstPossibleDate: Date,
  dietArr: DietDay[]
): DishColumnData[] => {
  return [{ date, dietDay: dietArr[calculateOffset(date, firstPossibleDate)] }]
}

export const filterRange = (
  firstDate: Date,
  lastDate: Date,
  firstPossibleDate: Date,
  dietArr: DietDay[]
): DishColumnData[] => {
  const arr: DishColumnData[] = []

  while (!isSameDay(firstDate, lastDate)) {
    arr.push({
      date: firstDate,
      dietDay: dietArr[calculateOffset(firstDate, firstPossibleDate)],
    })
    firstDate = addDays(firstDate, 1)
  }
  arr.push({
    date: firstDate,
    dietDay: dietArr[calculateOffset(firstDate, firstPossibleDate)],
  })

  return arr
}

//* create deep copy,
const actOnPreferences = (
  diet: Diet,
  dishPreferences: DishPreference[],
  ingredientPreferences: IngredientPreference[]
) => {
  const newDiet = cloneDeep(diet)
  //* get all dishes, including the replacements and modify them based on preferences
  const dishes: Record<string, Dish> = {}
  newDiet.days.forEach((day) => {
    day.dishes.forEach((dish) => {
      if (dishes[dish.name] === undefined) {
        dishes[dish.name] = dish
      } 
      
    })
  })
  Object.values(dishes).forEach((dish) => {
    // *
  })
}
