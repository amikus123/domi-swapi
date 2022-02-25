import { stringToDate } from "./api/timeHelpers"
import { Dish, User, DateRange } from "./api/types"

export const getKcal = (dishes: Dish[]) => {
  let kcalCount = 0
  dishes.forEach((item) => {
    for (const nut of item.nutrients) {
      if (nut.name.toLowerCase() === "kalorie") {
        const kcalString = nut.amount
        const kcalNumber = Number(kcalString.replace("kcal", ""))
        if (!isNaN(kcalNumber)) {
          kcalCount += kcalNumber
        }
        break
      }
    }
  })
  return kcalCount
}

export const datesFromUser = (user: User): DateRange => {
  return {
    end: stringToDate(user.userDiet.timeRange.end),
    start: stringToDate(user.userDiet.timeRange.start),
  }
}
