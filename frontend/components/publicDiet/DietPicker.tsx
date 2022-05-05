import {
  Box,
  Button,
  Collapse,
  Fade,
  Stack,
  useDisclosure,
  Wrap,
  WrapItem,
} from "@chakra-ui/react"
import React from "react"
import { ParsedFullDiet } from "../../lib/types/JSON/parsed/parsedDiets"
import DietCard from "../blog/DietCard/DietCard"

interface BlogCategoryBoxProps {
  diets: Record<string, ParsedFullDiet>
  setDiet: (name: string) => void
}

const DietPicker = ({ diets, setDiet }: BlogCategoryBoxProps) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Stack align="center" py={4} spacing={4}>
      <Button onClick={onToggle} w={120}>
        Pokaż diety
      </Button>

      <Collapse in={isOpen} animateOpacity>
        <Wrap spacing="20px" py="8px" justify="center" height="fit-content">
          {Object.values(diets).map((item, index) => {
            const { dietImage, dietDescription, name } = item
            return (
              <WrapItem
                key={index}
                onClick={() => {
                  setDiet(name)
                }}
              >
                <DietCard
                  image={dietImage}
                  name={name}
                  slug={null}
                  description={dietDescription}
                />
              </WrapItem>
            )
          })}
        </Wrap>
      </Collapse>
    </Stack>
  )
}

export default DietPicker
