import { Flex } from "@chakra-ui/react"
import React from "react"
import { ParsedDiet } from "../../api/parseJSON/parseDiets"
import DietCard from "./DietCard"

interface DietCardsProps {
  diets: ParsedDiet[]
}
const DietCards = ({ diets }: DietCardsProps) => {
  return (
    <Flex justify="start">
      {diets.map((item, index) => {
        return <DietCard diet={item} key={index} />
      })}
    </Flex>
  )
}

export default DietCards
