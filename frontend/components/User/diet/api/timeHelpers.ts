import { differenceInCalendarDays, isSameDay, addDays } from "date-fns"
import { DateRange, DietDay, DishColumnData, FullDietDay } from "./types"

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
  return dietArr
}

//* calculate offset from first day to find the proper index

const calculateOffset = (date: Date, firstPossibleDate: Date) => {
  return Math.abs(differenceInCalendarDays(firstPossibleDate, date))
}

export const filterSingleDay = (
  date: Date,
  firstPossibleDate: Date,
  indexesOfDays: number[],
  fullDietDays: FullDietDay[]
): DishColumnData[] => {
  const indexInMainArr = indexesOfDays[calculateOffset(date, firstPossibleDate)]
  return [{ date, fullDietDay: fullDietDays[indexInMainArr] }]
}

export const filterRange = (
  firstDate: Date,
  lastDate: Date,
  firstPossibleDate: Date,
  indexesOfDays: number[],
  fullDietDays: FullDietDay[]
): DishColumnData[] => {
  const arr: DishColumnData[] = []
  while (!isSameDay(firstDate, lastDate)) {
    const offSet = calculateOffset(firstDate, firstPossibleDate)
    const indexInMainArr = indexesOfDays[offSet]
    arr.push({
      date: firstDate,
      fullDietDay: fullDietDays[indexInMainArr],
    })
    firstDate = addDays(firstDate, 1)
  }
  const offSet = calculateOffset(firstDate, firstPossibleDate)
  const indexInMainArr = indexesOfDays[offSet]
  arr.push({
    date: firstDate,
    fullDietDay: fullDietDays[indexInMainArr],
  })

  return arr
}
