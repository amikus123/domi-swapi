export interface CalcData {
  isMale: boolean
  age: number
  height: number
  weight: number
  activityMultiplyer: number
}
export interface CalcRes {
  BMR: string
  CPM: string
  BMI: string
}
export const totalCalc = ({
  activityMultiplyer,
  age,
  height,
  isMale,
  weight,
}: CalcData): CalcRes => {
  const calculateBMR = () => {
    const base = 9.99 * weight + 6.25 * height - 4.92 * age
    if (isMale) {
      return base + 5
    }
    return base - 161
  }
  const BMR = calculateBMR()

  const calculateBMI = () => {
    return (weight / Math.pow(height / 100, 2))
  }
  const BMI = calculateBMI()
  const calculateCPM = (bmr: number) => {
    return (bmr * activityMultiplyer)
  }
  const CPM = calculateCPM(BMR)

  // makroskaldniki
  // 25 B
  // 35 T
  // 40W
  //   const [bRatio, tRatio, wRatio] = [0.25, 0.35, 0.4]
  //   const calculateMicro = () => {
  //     const b = (CPM * bRatio) / 4
  //     const t = (CPM * tRatio) / 9
  //     const w = (CPM * wRatio) / 4
  //     return { b, t, w }
  //   }

  return { BMI:BMI.toFixed(2), BMR:BMR.toFixed(0), CPM:CPM.toFixed(0) }
}

