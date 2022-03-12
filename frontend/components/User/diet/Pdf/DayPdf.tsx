import { formatISO9075, getISODay } from "date-fns"
import React from "react"
import { DishColumnData } from "../api/types"
import { Text, View, StyleSheet } from "@react-pdf/renderer"
import { capitalize } from "lodash"
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
  dayWrap: { margin: 20, marginBottom: 40 },
  dateContainer: {
    fontFamily: "Roboto-b",

    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
  dishName: {
    fontFamily: "Roboto-b",
    marginVertical: 10,
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
          <View style={styles.contentContainers} key={index} wrap={false}>
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
                {/* wartosci odz */}
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
              {/* przepis */}
              <Text>
                {recipe} Lorem ipsum dolor sit, amet consectetur adipisicing
                elit. Sit soluta facilis officia, recusandae, exercitationem
                distinctio vero tempore quam aspernatur, quis facere commodi!
                Reprehenderit libero tempore dolorem laboriosam ratione numquam
                quae!
              </Text>
            </View>
          </View>
        )
      })}
    </View>
  )
}

export default DayPdf
