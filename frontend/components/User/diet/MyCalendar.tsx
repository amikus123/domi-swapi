import React, { forwardRef, useState } from "react"
import ReactDatePicker, {
  registerLocale,
} from "react-datepicker"
import pl from "date-fns/locale/pl"
import { addDays, subDays } from "date-fns"
import "react-datepicker/dist/react-datepicker.css"
import { Button, Stack } from "@chakra-ui/react"
import { StartAndEndDate } from "../../../pages/user/diet"

registerLocale("pl", pl)

export interface DatePickerProps {

  minMaxDate:StartAndEndDate,
    dates:StartAndEndDate,
setDates:React.Dispatch<React.SetStateAction<StartAndEndDate>>

}

export default function DatePicker({dates,setDates,minMaxDate}:DatePickerProps) {
  
  const onChange = (dates) => {
    const [start, end] = dates
    setDates({start,end})
  }
  const setStartDate = (date)=>{
    setDates({...dates,start:date})
  }
  const [showRange, setShowRange] = useState(false)

  const {start:startDate,end:endDate} = dates
  const {start:minDate,end:maxDate} = minMaxDate

  return (
    <Stack className={"light-theme"} w="300px">
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
      ) : (
        <ReactDatePicker
          locale="pl"
          id="date"
          selected={startDate}
          onChange={setStartDate}
          dateFormat="dd/MM/yyyy"
          minDate={minDate}
          maxDate={maxDate}
          showPopperArrow={true}
          selectsRange={false}
        />
      )}
      <Button
        onClick={() => {
          if (showRange) {
            setDates({...dates,end:null})
          }
          setShowRange(!showRange)
        }}
        colorScheme="teal"
        variant={showRange ? "outline" : "solid"}
      >
        {showRange ? "Zakres dat" : "Pojedyńczy dzień"}
      </Button>
    </Stack>
  )
}
