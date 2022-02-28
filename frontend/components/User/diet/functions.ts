import { stringToDate } from "./api/timeHelpers"
import {  UserFullData, DateRange } from "./api/types"


export const datesFromUser = (user: UserFullData): DateRange => {
  return {
    end: stringToDate(user.userDiet.timeRange.end),
    start: stringToDate(user.userDiet.timeRange.start),
  }
}
