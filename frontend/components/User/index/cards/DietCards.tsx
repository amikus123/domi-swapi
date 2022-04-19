import { Flex, Text, Button, Collapse, useDisclosure } from "@chakra-ui/react"
import React from "react"
import { ParsedDiet } from "../../../../lib/types/JSON/parsed/parsedDiets"
import ImageCard from "../../../general/ImageCards/ImageCard"

interface DietCardsProps {
  diets: Record<string, ParsedDiet>
  selectedDietName: string
}
const DietCards = ({ diets, selectedDietName }: DietCardsProps) => {
  const { isOpen, onToggle } = useDisclosure()
  return (
    <Flex justify="space-evenly" wrap="wrap" w="1000px" direction="column">
      <Flex>
        <Text>Selkected diet: </Text>
        <ImageCard
          name={diets[selectedDietName].name}
          image={diets[selectedDietName].dietImage}
        />
      </Flex>

      <Flex direction="column">
        <Button w={150} onClick={onToggle}>
          Show other diets
        </Button>
        <Collapse in={isOpen} animateOpacity>
          <Flex>
            {Object.values(diets).map((item, index) => {
              return item.name === selectedDietName ? null : (
                <ImageCard
                  name={item.name}
                  image={item.dietImage}
                  key={index}
                />
              )
            })}
          </Flex>
        </Collapse>
      </Flex>
    </Flex>
  )
}

export default DietCards
