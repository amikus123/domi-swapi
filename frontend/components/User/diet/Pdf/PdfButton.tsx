import React from "react"
import {
  Document,
  Page,
  StyleSheet,
  PDFDownloadLink,
  Font,
} from "@react-pdf/renderer"
import DayPdf from "./DayPdf"
import { Button } from "@chakra-ui/react"
import { DishColumnData } from "../../../../lib/types/dietPage/dishTypes"
import { DateRangeNullable } from "../../../../lib/types/dietPage/timeTypes"
import { formatISO9075 } from "date-fns"

Font.register({
  family: "Roboto-b",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf",
})

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
})
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    fontFamily: "Roboto",
    width: "100%",
    padding: 10,
  },
  title: {
    marginVertical: 10,
    fontFamily: "Roboto-b",
  },
  section: {
    margin: 30,
  },
})

interface MyPdfDocProps {
  dishColumnData: DishColumnData[]
}
interface MyPdfProps extends MyPdfDocProps {
  dates: DateRangeNullable
  singleDate: Date
  showRange: boolean
  dietName: string
}

// Create Document Component
const MyDocument = ({ dishColumnData }: MyPdfDocProps) => (
  <Document language="PL">
    <Page size="A4" style={styles.page}>
      {dishColumnData.map((item, index) => {
        return <DayPdf key={index} item={item} />
      })}
    </Page>
  </Document>
)

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
}: MyPdfProps) => {
  return (
    <PDFDownloadLink
      document={<MyDocument dishColumnData={dishColumnData} />}
      fileName={createFileName(dates, singleDate, showRange, dietName)}
    >
      {({ loading }) => (
        <>
          <Button isLoading={loading}>Pobierz</Button>
        </>
      )}
    </PDFDownloadLink>
  )
}
export default PdfButton
