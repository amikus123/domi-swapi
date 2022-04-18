import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Link,
  FormErrorMessage,
  useToast,
  Text,
} from "@chakra-ui/react"
import { Formik, Form, Field } from "formik"
import React, { useState } from "react"
import Layout from "./Layout"
import { FormTemplateData } from "./authTypes"
import NextLink from "next/link"
import { useRouter } from "next/dist/client/router"
interface FormTemplateProps {
  formData: FormTemplateData
}
const FormTemplate = ({ formData }: FormTemplateProps) => {
  // fucntion to return an inpuit element for each item
  const toast = useToast()
  const router = useRouter()
  const {
    inputsData,
    validationSchema,
    initialValues,
    buttonText,
    linksData,
    header,
    subheader,
    onSubmit,
    toastData,
  } = formData
  const { errorTitle, successDesc, successTitle } = toastData
  const [globalError, setGlobalError] = useState("")
  return (
    <Layout header={header} subHeader={subheader}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        initialErrors={{ error: "XD" }}
        onSubmit={async (values) => {
          setGlobalError("")
          const res = await onSubmit(values.email, values.password)
          // either returts string or object
          console.log(res, "WHA WE GOT")
          if (typeof res === "string") {
            //TODO add some function to translate this in to polish
            const errorDesc = res
            toast({
              title: errorTitle,
              description: errorDesc,
              status: "error",
              duration: 9000,
              isClosable: true,
            })
            setGlobalError(errorDesc)
          } else {
            toast({
              title: successTitle,
              description: successDesc,
              status: "success",
              duration: 9000,
              isClosable: true,
            })
            // redirect if necessary
          }
        }}
      >
        {({ isSubmitting, errors, touched, values }) => (
          <Form>
            <Stack spacing={4}>
              {Object.keys(values).map((item, i) => {
                return (
                  <Field name={item} key={i}>
                    {({ field }) => (
                      <FormControl isInvalid={errors[item] && touched[item]}>
                        <FormLabel htmlFor={item}>
                          {inputsData[item].label}
                        </FormLabel>
                        <Input
                          {...field}
                          id={item}
                          placeholder={inputsData[item].placeholder}
                          type={inputsData[item].type}
                          onInput={() => {
                            // removes glogbal error
                            if (globalError !== "") {
                              setGlobalError("")
                            }
                          }}
                        />
                        <FormErrorMessage>{errors[item]}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                )
              })}
              <Text color="red.400" fontSize={20} fontWeight={700}>
                {globalError}
              </Text>

              <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
                {buttonText}
              </Button>
              <Stack pt={2}>
                {linksData.map((item, i) => {
                  return (
                    <NextLink href={item.href} passHref key={i}>
                      <Link
                        color={
                          router.pathname === item.href ? "red.400" : "blue.400"
                        }
                      >
                        {item.text}
                      </Link>
                    </NextLink>
                  )
                })}
              </Stack>
            </Stack>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default FormTemplate
