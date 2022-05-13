import {
  Document,
  Page,
  StyleSheet,
  View,
  Text,
} from "@react-pdf/renderer"
import { getISODay, formatISO9075 } from "date-fns"
import { capitalize } from "lodash"
import React, { useEffect, useState } from "react"
import { DietDay } from "../../../../lib/types/dietPage/dietTypes"
import { DishColumnData } from "../../../../lib/types/dietPage/dishTypes"
import MarkdownPdf from "./MarkdownPdf"
import { MyPdfDocProps } from "./PdfButton"

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
  dayWrap: {
    margin: 20,
  },
  dateContainer: {
    fontFamily: "Roboto-b",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
  dishName: {
    textAlign: "center",
    fontFamily: "Roboto-b",
    marginVertical: 10,
    fontSize: 22,
  },
  contentContainers: {},
  twoColumns: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-around",
  },
  column: {},
  recipe: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
})

const daysOfWeek = [
  "",
  "Poniedziałek",
  "Wtorek",
  "Środa",
  "Czwartek",
  "Piątek",
  "Sobota",
  "Niedziela",
]

const renderContent = (
  dishColumnData: DishColumnData[],
  days: DietDay[]
): JSX.Element[] => {
  const res = []
  days.forEach((day, index) => {
    const data = dishColumnData[index]
    if (data !== undefined) {
      const { fullDietDay } = data
      const JSX = (
        <>
          {fullDietDay.dishes.map((item, index) => {
            const { ingredients, nutrients, recipe, name } = item.dish
            return (
              <View style={styles.contentContainers} key={index} wrap={true}>
                <Text style={styles.dishName}>{name}</Text>
                <View style={styles.twoColumns}>
                  <View style={styles.column}>
                    {ingredients.map((i, k) => {
                      const { amount, name } = i
                      return (
                        <Text key={k}>
                          {capitalize(name)} - {amount}
                        </Text>
                      )
                    })}
                  </View>
                  <View style={styles.column}>
                    {nutrients.map((i, k) => {
                      const { amount, name } = i
                      return (
                        <Text key={k}>
                          {capitalize(name)} - {amount}
                        </Text>
                      )
                    })}
                  </View>
                </View>
                <View style={styles.recipe}>
                  <MarkdownPdf text={recipe} />
                </View>
              </View>
            )
          })}
        </>
      )

      res.push(JSX)
    }
  })

  return res
}

const DocumentPdf = ({ dishColumnData, days }: MyPdfDocProps) => {
  const [renderedComponents, setRenderedComponents] = useState<JSX.Element[]>(
    renderContent(dishColumnData, days)
  )
  useEffect(() => {
    console.log(renderedComponents, "asdasdads")
  }, [])
  return (
    <Document language="PL">
      <Page size="A4" style={styles.page}>
        {dishColumnData.map((item, index) => {
          const { date, fullDietDay, dayId } = item
          const { kcalCount } = fullDietDay

          return (
            <View style={styles.dayWrap} key={index}>
              <View style={styles.dateContainer}>
                <Text>{daysOfWeek[getISODay(date)]}</Text>
                <Text>{formatISO9075(date, { representation: "date" })}</Text>
                <Text>{kcalCount} kcal</Text>
              </View>
              {renderedComponents[dayId]}
            </View>
          )
        })}
      </Page>
    </Document>
  )
}

export default DocumentPdf
