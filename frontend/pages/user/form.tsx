import { Button, Flex, Stack, Text } from "@chakra-ui/react"
import React, { useState } from "react"
import FirstTimeModal from "../../components/User/form/FirstTimeModal"
import InputColumn from "../../components/User/form/InputColumn"
import ResultColumn from "../../components/User/form/ResultColumn"
import { CalcData } from "../../components/User/form/inputs/dietCalculation"

const form = () => {
  // get information from api if user has eddited his data or not
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<CalcData>({
    activityMultiplyer: 1.2,
    age: 20,
    height: 180,
    isMale: true,
    weight: 70,
  })
  return (
    <>
    <FirstTimeModal/>
    <Stack spacing={8} w={800}>
      {/* if user has never saved his data, modal will be shown */}
      <Text fontSize="40" variant="h2">
        Edytuj twoje dane
      </Text>
      <Flex w="100%" justify="space-between">
        <InputColumn formData={formData} setFormData={setFormData} />
        <ResultColumn formData={formData} />
      </Flex>
      <Flex justify="flex-end">
        <Button
          isLoading={loading}
          onClick={() => {
            setLoading(!loading)
            // make request to save data, show toast on resolve
          }}
          colorScheme="teal"
          variant="solid"
        >
          Zapisz zmiany
        </Button>
      </Flex>
    </Stack>
    </>

  )
}

export default form
