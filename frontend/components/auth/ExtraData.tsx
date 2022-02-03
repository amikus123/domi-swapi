import {
    Stack,
    FormControl,
    FormLabel,
    Input,
    Button,
    Checkbox,
    Link,
    FormErrorMessage,
  } from "@chakra-ui/react"
  import { Formik, Form, Field } from "formik"
  import React from "react"
  import { registerEmail } from "../../lib/auth"
  import Layout from "./Layout"
  
  import * as Yup from "yup"
  
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
  
  const Example = () => (
    <div>
      <h1>Sign Up</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
        }}
        onSubmit={async (values) => {
          await sleep(500)
          alert(JSON.stringify(values, null, 2))
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="firstName">First Name</label>
            <Field name="firstName" placeholder="Jane" />
  
            <label htmlFor="lastName">Last Name</label>
            <Field name="lastName" placeholder="Doe" />
  
            <label htmlFor="email">Email</label>
            <Field name="email" placeholder="jane@acme.com" type="email" />
  
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
  
  interface ItemData {
    label: string
    placeholder: string
    type: string
  }
  interface Config {
    password: ItemData
    email: ItemData
    confirmPassword: ItemData
  }
  function FormikExample() {
    const config: Config = {
      email: {
        label: "Wprowadź adres email",
        placeholder: "przykład@mail.com",
        type: "email",
      },
      password: { label: "Wprowadź hasło", placeholder: "", type: "password" },
      confirmPassword: {
        label: "Potwierdź hasło",
        placeholder: "",
        type: "password",
      },
    }
  
    const SignupSchema = Yup.object({
      email: Yup.string()
        .email("Nieprawidłowy adres email")
        .required("Pole jest wymagane")
        .max(50, "Zyt długi email!"),
      password: Yup.string()
        .required("Hasło jest wymagane")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
          "Hasło musi mieć conajmniej 8 symboli, w tym liczbę, małą i dużą litere."
        )
        .max(50, "Zbyt długie hasło!"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Hasła różnią się")
        .required("Potwierdź hasło"),
    })
    // fucntion to return an inpuit element for each item
    return (
      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        validationSchema={SignupSchema}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            actions.setSubmitting(false)
          }, 1000)
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
                        <FormLabel htmlFor={item}>{config[item].label}</FormLabel>
                        <Input
                          {...field}
                          id={item}
                          placeholder={config[item].placeholder}
                          type={config[item].type}
                        />
                        <FormErrorMessage>{errors[item]}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                )
              })}
              <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
                Submit
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    )
  }
  
  const SignInForm = () => {
    return (
      <Stack spacing={4}>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input type="email" />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input type="password" />
          <Button
            type="submit"
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
          >
            Sign in
          </Button>
        </FormControl>
  
        <Stack spacing={10}>
          <Stack
            direction={{ base: "column", sm: "row" }}
            align={"start"}
            justify={"space-between"}
          >
            <Checkbox>Remember me</Checkbox>
            <Link color={"blue.400"}>Forgot password?</Link>
          </Stack>
        </Stack>
      </Stack>
    )
  }
  
  const ExtraData = () => {
    return (
      <Layout
        subHeader="to enjoy all of our cool features"
        header="Sign in to your account"
      >
        <FormikExample />
        {/* <SignInForm /> */}
      </Layout>
    )
  }
  
  export default ExtraData
  