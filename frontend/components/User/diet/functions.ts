import { stringToDate } from "../../../lib/helpers/formating"
import { DateRange, User } from "../../../lib/helpers/jsonToState"
import { TrueDishData } from "../../../pages/user/diet"

export const getKcal = (dishes: TrueDishData[]) => {
  let kcalCount = 0
  dishes.forEach((item) => {
    const kcalString = item.nutrients["kalorie"]
      ? item.nutrients["kalorie"]
      : item.nutrients["Kalorie"]
    if (kcalString) {
      const kcalNumber = Number(kcalString.replace("kcal", ""))
      if (!isNaN(kcalNumber)) {
        kcalCount += kcalNumber
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


//* based on original base Date range, calculate which day should have which dietDay


// * prepare dietg based on preferences