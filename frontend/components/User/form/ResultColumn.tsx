import { Input, Stack } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import {
  CalcData,
  CalcRes,
  totalCalc,
} from "../../../pages/user/dietCalculation"
import InputItem from "./inputs/InputItem"
import Poop from "./inputs/Poop"

interface ResultColumnProps {
  formData: CalcData
}
const ResultColumn = ({ formData }: ResultColumnProps) => {
  const [data, setData] = useState<CalcRes>({ BMI: "10", BMR: "10", CPM: "10" })
  useEffect(() => {
    setData(totalCalc(formData))
  }, [formData])

  return (
    <Stack spacing={8} w="100%">
      <InputItem textData={{ start: "BMI" }}>
        <Poop
          header="Co to Bmi?"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus deleniti vel consectetur fugiat."
        />
        <Input
          w={200}
          value={data.BMI}
          isDisabled={true}
          color="black"
          opacity="0.8!important"
        />
      </InputItem>

      <InputItem textData={{ start: "PPM", end: "kcal" }}>
        <Poop
          header="Co to Bmi?"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus deleniti vel consectetur fugiat."
        />
        <Input
          w={200}
          value={data.BMR}
          isDisabled={true}
          color="black"
          opacity="0.8!important"
        />
      </InputItem>
      <InputItem textData={{ start: "CPM", end: "kcal" }}>
        <Poop
          header="Co to Bmi?"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus deleniti vel consectetur fugiat."
        />
        <Input
          w={200}
          value={data.CPM}
          isDisabled={true}
          color="black"
          opacity="0.8!important"
        />
      </InputItem>
    </Stack>
  )
}

export default ResultColumn
