import { addDays, differenceInCalendarDays, isSameDay } from "date-fns"
import { DateRange, DietDay } from "./jsonToState"

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
  console.log(
    "OFF",
    differenceInCalendarDays(firstPossibleDate, date),
    date,
    firstPossibleDate
  )
  return differenceInCalendarDays(firstPossibleDate, date)
}

export const filterSingleDay = (
  date: Date,
  firstPossibleDate: Date,
  dietArr: DietDay[]
): DietDay[] => {
  return [dietArr[calculateOffset(date, firstPossibleDate)]]
}

export const filterRange = (
  firstDate: Date,
  lastDate: Date,
  firstPossibleDate: Date,
  dietArr: DietDay[]
): DietDay[] => {
  const arr = []

  while (!isSameDay(firstDate, lastDate)) {
    arr.push(dietArr[calculateOffset(firstDate, firstPossibleDate)])
    firstDate = addDays(firstDate, 1)
  }
  arr.push(dietArr[calculateOffset(firstDate, firstPossibleDate)])

  return arr
}
