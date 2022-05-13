import React, { useState } from "react"
import { PDFDownloadLink, Font } from "@react-pdf/renderer"
import { Button, useToast } from "@chakra-ui/react"
import { DishColumnData } from "../../../../lib/types/dietPage/dishTypes"
import { DateRangeNullable } from "../../../../lib/types/dietPage/timeTypes"
import { formatISO9075 } from "date-fns"
import DocumentPdf from "./DocumentPdf"
import { DietDay } from "../../../../lib/types/dietPage/dietTypes"

Font.register({
  family: "Roboto-b",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf",
})

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
})

export interface MyPdfDocProps {
  dishColumnData: DishColumnData[]
  days: DietDay[]
}
interface MyPdfProps extends MyPdfDocProps {
  dates: DateRangeNullable
  singleDate: Date
  showRange: boolean
  dietName: string
  generatedPdf: boolean
  setGeneratedPdf: React.Dispatch<React.SetStateAction<boolean>>
}

const createFileName = (
  dates: DateRangeNullable,
  singleDate: Date,
  showRange: boolean,
  dietName: string
): string => {
  let dateString = ""
  if (showRange && dates.end !== null) {
    dateString = `${formatISO9075(dates.start, {
      representation: "date",
    })}-${formatISO9075(dates.end, { representation: "date" })}`
  } else if (showRange && dates.end === null) {
    dateString = `${formatISO9075(dates.start, { representation: "date" })}`
  } else {
    dateString = `${formatISO9075(singleDate, { representation: "date" })}`
  }

  return `dieta-${dietName}-${dateString}.pdf`
}

const PdfButton = ({
  dishColumnData,
  dates,
  showRange,
  singleDate,
  dietName,
  days,
  generatedPdf,
  setGeneratedPdf,
}: MyPdfProps) => {
  const toast = useToast()

  return (
    <>
      {!generatedPdf ? (
        <Button
          onClick={() => {
            setGeneratedPdf(true)
            toast({
              title: "Pdf jest gotowy do pobrania",
              description: "",
              status: "success",
              duration: 3000,
              isClosable: true,
            })
          }}
        >
          Stwórz Pdf
        </Button>
      ) : (
        <PDFDownloadLink
          document={<DocumentPdf dishColumnData={dishColumnData} days={days} />}
          fileName={createFileName(dates, singleDate, showRange, dietName)}
        >
          {({ loading }) => (
            <Button isLoading={loading && generatedPdf}>Pobierz</Button>
          )}
        </PDFDownloadLink>
      )}
    </>
  )
}
export default PdfButton
