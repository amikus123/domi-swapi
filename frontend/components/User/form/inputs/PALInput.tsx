import { Select } from "@chakra-ui/react"
import React from "react"

interface PALInputProps {
  value: number
  changeValue: (arg: number | boolean) => void
}

interface Option {
  value: number
  text: string
}
const options: Option[] = [
  { text: "Brak aktywności fizycznej", value: 1.2 },
  { text: "Lekka aktywność", value: 1.4 },
  { text: "Średnia aktywność", value: 1.6 },
  { text: "Wysoka aktywność", value: 1.8 },
  { text: "Bardzo wysoka aktywność fizyczna", value: 2 },
]

const PALInput = ({ changeValue, value }: PALInputProps) => {
  return (
    <Select
      w={300}
      value={value}
      onChange={(e) => {
        changeValue(Number(e.target.value))
      }}
    >
      {options.map((item, index) => {
        return (
          <option key={index} value={item.value}>
            {item.text}
          </option>
        )
      })}
    </Select>
  )
}

export default PALInput
