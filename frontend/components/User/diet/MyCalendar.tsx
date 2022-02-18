import React, { forwardRef, useState } from "react"
import ReactDatePicker, {
  ReactDatePickerProps,
  registerLocale,
} from "react-datepicker"
import pl from "date-fns/locale/pl"
import { addDays, subDays } from "date-fns"
import "react-datepicker/dist/react-datepicker.css"

registerLocale("pl", pl)

export default function DatePicker() {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const onChange = (dates) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }
  const [showRange, setShowRange] = useState(false)
  return (
    <div className={"light-theme"}>
      <ReactDatePicker
        locale="pl"
        id="date"
        selected={startDate}
        onChange={setStartDate}
        dateFormat="MM/dd/yyyy"
        minDate={new Date()}
        maxDate={addDays(new Date(), 4)}
        showPopperArrow={true}
        selectsRange={false}
      />
      <ReactDatePicker
        locale="pl"
        id="ds"
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        dateFormat="MM/dd/yyyy"
        minDate={new Date()}
        maxDate={addDays(new Date(), 4)}
        showPopperArrow={true}
        selectsRange={true}
      allowSameDay
      
      />
    </div>
  )
}
