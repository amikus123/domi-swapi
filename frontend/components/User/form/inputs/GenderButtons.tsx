import { useRadio, Box, useRadioGroup, HStack } from "@chakra-ui/react"

// 1. Create a component that consumes the `useRadio` hook

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "teal.600",
          color: "white",
          borderColor: "teal.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  )
}

// Step 2: Use the `useRadioGroup` hook to control a group of custom radios.

interface GenderButtonsProps {
  value: boolean
  changeValue: (arg: number | boolean) => void
}

export default function GenderButtons({
  changeValue,
  value,
}: GenderButtonsProps) {
  const parseToString = (bool: Boolean) => (bool ? "male" : "female")
  const parseToBool = (gender: string) => gender === "male"

  const options = ["male", "female"]

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    value: parseToString(value),
    onChange: (v) => {
      changeValue(parseToBool(v))
    },
  })

  const group = getRootProps()

  return (
    <HStack {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value })
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        )
      })}
    </HStack>
  )
}
