import React from "react"
import {
  Document,
  Page,
  StyleSheet,
  PDFDownloadLink,
  Font,
} from "@react-pdf/renderer"
import { DishColumnData } from "../api/types"
import DayPdf from "./DayPdf"
import { Button } from "@chakra-ui/react"
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

interface MyPdfProps {
  dishColumnData: DishColumnData[]
}

// Create Document Component
const MyDocument = ({ dishColumnData }: MyPdfProps) => (
  <Document language="PL">
    <Page size="A4" style={styles.page}>
      {dishColumnData.map((item, index) => {
        return <DayPdf key={index} item={item} />
      })}
    </Page>
  </Document>
)

const PdfButton = ({ dishColumnData }: MyPdfProps) => {
  return (
    <PDFDownloadLink
      document={<MyDocument dishColumnData={dishColumnData} />}
      fileName="dietka.pdf"
    >
      {({ blob, url, loading, error }) => (
        <>
          <Button isLoading={loading}>Pobierz</Button>
        </>
      )}
    </PDFDownloadLink>
  )
}
export default PdfButton

// const Test = ({ dishColumnData }: MyPdfProps) => {
//   return (
//     <>
//       <PDFDownloadLink
//         document={<MyDocument dishColumnData={dishColumnData} />}
//         fileName="dietka.pdf"
//       >
//         {({ blob, url, loading, error }) =>
//           loading ? "Loading document..." : "Download now!"
//         }
//       </PDFDownloadLink>
//     </>
//   )
// }
