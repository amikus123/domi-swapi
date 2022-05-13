import { formatISO9075, getISODay } from "date-fns"
import React from "react"
import { Text, View, StyleSheet } from "@react-pdf/renderer"
import { capitalize } from "lodash"
import { DishColumnData } from "../../../../lib/types/dietPage/dishTypes"
import MarkdownPdf from "./MarkdownPdf"
interface GenerateHtmlProps {
  item: DishColumnData
}
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

const styles = StyleSheet.create({
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
    marginHorizontal:20
  },
})

const DayPdf = ({ item }: GenerateHtmlProps) => {
  const { date, fullDietDay } = item

  const { dishes, kcalCount } = fullDietDay

  return (
    <View style={styles.dayWrap}>
      <View style={styles.dateContainer}>
        <Text>{daysOfWeek[getISODay(date)]}</Text>
        <Text>{formatISO9075(date, { representation: "date" })}</Text>
        <Text>{kcalCount} kcal</Text>
      </View>
      {dishes.map((item, index) => {
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
    </View>
  )
}

export default DayPdf
