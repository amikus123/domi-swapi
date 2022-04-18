import { stringToDate } from "../api/timeHelpers"
import {  UserFullData, DateRange } from "../api/types"


export const datesFromUser = (user: UserFullData): DateRange => {
  return {
    end: stringToDate(user.userDiet.timeRange.end),
    start: stringToDate(user.userDiet.timeRange.start),
  }
}




export const noLimits = (): DateRange => {
  return {
    end: stringToDate("2100-01-01"),
    start: stringToDate("2000-01-01"),
  }
}