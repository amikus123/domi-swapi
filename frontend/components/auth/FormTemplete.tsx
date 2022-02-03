import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Link,
  FormErrorMessage,useToast ,
} from "@chakra-ui/react"
import { Formik, Form, Field } from "formik"
import React from "react"
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
  } = formData
  return (
    <Layout header={header} subHeader={subheader}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          const res = await onSubmit(values.email, values.password)
          
          if (res) {
            toast({
              title: "Account created.",
              description: "We've created your account for you.",
              status: "success",
              duration: 9000,
              isClosable: true,
            })
          }
        }}
      >
        {({ isSubmitting, errors, touched, values }) => (
          <Form>
            <Stack spacing={4}>
              {Object.keys(values).map((item, i) => {
                return (
                  <Field name={item} key={i}>
                    {({ field, form }) => (
                      <FormControl isInvalid={errors[item] && touched[item]}>
                        <FormLabel htmlFor={item}>
                          {inputsData[item].label}
                        </FormLabel>
                        <Input
                          {...field}
                          id={item}
                          placeholder={inputsData[item].placeholder}
                          type={inputsData[item].type}
                        />
                        <FormErrorMessage>{errors[item]}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                )
              })}
              <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
                {buttonText}
              </Button>
              <Stack pt={2}>
                {linksData.map((item, i) => {
                  return (
                    <NextLink href={item.href} passHref key={i}>
                    <Link color={router.pathname===item.href?"red.400": "blue.400"} >
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
