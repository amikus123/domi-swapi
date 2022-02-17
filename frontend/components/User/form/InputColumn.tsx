import { Stack } from "@chakra-ui/react"
import React from "react"
import { CalcData } from "../../../pages/user/dietCalculation"
import DataInput from "./inputs/DataInput"
import GenderButtons from "./inputs/GenderButtons"
import InputItem from "./inputs/InputItem"
import PALInput from "./inputs/PALInput"

interface InputColumnProps {
  formData: CalcData
  setFormData: React.Dispatch<React.SetStateAction<CalcData>>
}

export interface InputTextData {
  end?: string
  start?: string
}

const InputColumn = ({ formData, setFormData }: InputColumnProps) => {
  const changeValueGenerator = (propertyName: keyof CalcData) => {
    return (val: number | boolean) => {
      setFormData({ ...formData, [propertyName]: val })
    }
  }

  const textData: Record<keyof CalcData, InputTextData> = {
    isMale: {
      end: "",
      start: "Płeć",
    },
    age: {
      end: "lat",
      start: "Wiek",
    },
    height: {
      end: "cm",
      start: "Wzrost",
    },
    weight: {
      end: "kg",
      start: "Waga",
    },
    activityMultiplyer: {
      end: "",
      start: "Aktywność\n(PAL)",
    },
  }

  return (
    <Stack spacing={8} w="100%">
      <InputItem textData={textData["age"]}>
        <DataInput
          value={formData.age}
          variant="age"
          changeValue={changeValueGenerator("age")}
        />
      </InputItem>
      <InputItem textData={textData["weight"]}>
        <DataInput
          value={formData.weight}
          variant="weight"
          changeValue={changeValueGenerator("weight")}
        />
      </InputItem>
      <InputItem textData={textData["height"]}>
        <DataInput
          value={formData.height}
          variant="height"
          changeValue={changeValueGenerator("height")}
        />
      </InputItem>
      <InputItem textData={textData["activityMultiplyer"]}>
        <PALInput
          value={formData.activityMultiplyer}
          changeValue={changeValueGenerator("activityMultiplyer")}
        />
      </InputItem>
      <InputItem textData={textData["isMale"]}>
        <GenderButtons
          value={formData.isMale}
          changeValue={changeValueGenerator("isMale")}
        />
      </InputItem>
    </Stack>
  )
}

export default InputColumn
