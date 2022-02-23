import { TrueDishData } from "../../../pages/user/diet"

export const getKcal = (dishes: TrueDishData[]) => {
  let kcalCount = 0
  dishes.forEach((item) => {
    const kcalString = item.nutrients["kalorie"]?item.nutrients["kalorie"] :item.nutrients["Kalorie"] 
    if(kcalString){
       const kcalNumber = Number( kcalString.replace("kcal",""))
       if(!isNaN(kcalNumber)){
           kcalCount+=kcalNumber
       }
    }
  })
  return kcalCount
}
