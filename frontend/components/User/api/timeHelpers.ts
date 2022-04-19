import {
  differenceInCalendarDays,
  isSameDay,
  addDays,
  startOfToday,
} from "date-fns"
import { DietDay, FullDietDay } from "../../../lib/types/dietPage/dietTypes"
import { DishColumnData } from "../../../lib/types/dietPage/dishTypes"
import { DateRange } from "../../../lib/types/dietPage/timeTypes"

export const stringToDate = (dateStr: string): Date => {
  //* dateStr should be in format  YYYY-MM-DD (same as recived from strapi)
  const [y, m, d] = dateStr.split("-")
  return new Date(`${m} ${d}, ${y} 00:00:00`)
}

// get diet, return array of number
// number is index of dietDay for selectedDat
export const getDietArr = (
  dateRange: DateRange,
  dietDays: DietDay[]
): number[] => {
  const uniqueDietDayCount = dietDays.length
  const dayDifference = calculateOffset(dateRange.start, dateRange.end)
  const dietArr: number[] = []
  let index = 0
  for (let i = 0; i <= dayDifference; i++) {
    dietArr.push(index)
    index++
    if (index >= uniqueDietDayCount) {
      index = 0
    }
  }

  const newMethod = []
  for (let i = 0; i <= uniqueDietDayCount; i++) {
    newMethod.push(i)
  }
  console.log(newMethod, "NEW METHOD", dietDays)
  return dietArr
}

//* calculate offset from first day to find the proper index

const calculateOffset = (date: Date, firstPossibleDate: Date) => {
  return Math.abs(differenceInCalendarDays(firstPossibleDate, date))
}

export const filterSingleDay = (
  date: Date,
  fullDietDays: FullDietDay[]
): DishColumnData[] => {
  // * calculate offset from today
  // * get diet based on modulo
  const today = startOfToday()
  return [
    {
      date,
      fullDietDay:
        fullDietDays[calculateOffset(date, today) % fullDietDays.length],
    },
  ]
}

export const filterRange = (
  firstDate: Date,
  lastDate: Date,
  fullDietDays: FullDietDay[]
): DishColumnData[] => {
  let firstDateLocal = firstDate
  const arr: DishColumnData[] = []

  while (!isSameDay(firstDateLocal, lastDate)) {
    const indexInMainArr =
      calculateOffset(firstDateLocal, firstDate) % fullDietDays.length
    arr.push({
      date: firstDateLocal,
      fullDietDay: fullDietDays[indexInMainArr],
    })
    firstDateLocal = addDays(firstDateLocal, 1)
  }
  const indexInMainArr =
    calculateOffset(firstDateLocal, firstDate) % fullDietDays.length

  arr.push({
    date: firstDateLocal,
    fullDietDay: fullDietDays[indexInMainArr],
  })

  return arr
}
