import React, { useState } from "react"
import ReactDatePicker, { registerLocale } from "react-datepicker"
import pl from "date-fns/locale/pl"
import { Button, Flex } from "@chakra-ui/react"
import { StartAndEndDate } from "../../../pages/user/diet"

registerLocale("pl", pl)

export interface DatePickerProps {
  minMaxDate: StartAndEndDate
  dates: StartAndEndDate
  setDates: React.Dispatch<React.SetStateAction<StartAndEndDate>>
  singleDate: Date
  setSingleDate: React.Dispatch<React.SetStateAction<Date>>
}

export default function DatePicker({
  dates,
  setDates,
  minMaxDate,
  setSingleDate,
  singleDate,
}: DatePickerProps) {
  const onChange = (dates) => {
    const [start, end] = dates
    setDates({ start, end })
  }

  const [showRange, setShowRange] = useState(false)

  const { start: startDate, end: endDate } = dates
  const { start: minDate, end: maxDate } = minMaxDate
  // * for some reason this works, one "if" statmentg causes graphical bugs
  return (
    <Flex className={"light-theme"} w="300px" pt={12} pb={2} direction="column">
      {showRange ? null : (
        <ReactDatePicker
          locale="pl"
          id="date"
          selected={singleDate}
          onChange={setSingleDate}
          dateFormat="dd/MM/yyyy"
          minDate={minDate}
          maxDate={maxDate}
          showPopperArrow={true}
          selectsRange={false}
        />
      )}
      {showRange ? (
        <ReactDatePicker
          locale="pl"
          id="ds"
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          dateFormat="dd/MM/yyyy"
          minDate={minDate}
          maxDate={maxDate}
          showPopperArrow={true}
          selectsRange={true}
          allowSameDay
        />
      ) : null}
      <Button
        mt={4}
        onClick={() => {
          setShowRange(!showRange)
        }}
        colorScheme="teal"
        variant={showRange ? "outline" : "solid"}
      >
        {showRange ? "Zakres dat" : "Pojedyńczy dzień"}
      </Button>
    </Flex>
  )
}