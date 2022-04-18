import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react"
import React from "react"

type dataTypes = "age" | "height" | "weight"

interface DataVariant {
  max: number
}

const variants: Record<dataTypes, DataVariant> = {
  age: {
    max: 120,
  },
  height: {
    max: 300,
  },
  weight: {
    max: 500,
  },
}
interface DataInputProps {
  variant: dataTypes
  value: number
  changeValue: (arg: number | boolean) => void
}

const DataInput = ({ changeValue, value, variant }: DataInputProps) => {
  //input have internal string vlue but it is changed to number
  const { max } = variants[variant]
  // add mobile desing
  return (
    <NumberInput
      w={200}
      allowMouseWheel
      value={value}
      onChange={(str, num) => {
        changeValue(num)
      }}
      max={max}
      keepWithinRange={false}
      clampValueOnBlur={false}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  )
}

export default DataInput
