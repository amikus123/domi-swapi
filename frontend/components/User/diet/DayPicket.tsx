import React, { useState } from "react"
import { SingleDatepicker,RangeDatepicker } from "chakra-dayzed-datepicker"
export const DayPicket = () => {
  const [date, setDate] = useState(new Date())
  const [selectedDates, setSelectedDates] = useState<Date[]>([
    new Date(),
    new Date(),
  ])

  return (
    <div>
      <SingleDatepicker name="date-input" date={date} onDateChange={setDate}  />
      <RangeDatepicker
        selectedDates={selectedDates}
        onDateChange={setSelectedDates}
      />
    </div>
  )
}
