import { stringToDate } from "./api/timeHelpers"
import { Dish, User, DateRange } from "./api/types"


export const datesFromUser = (user: User): DateRange => {
  return {
    end: stringToDate(user.userDiet.timeRange.end),
    start: stringToDate(user.userDiet.timeRange.start),
  }
}
