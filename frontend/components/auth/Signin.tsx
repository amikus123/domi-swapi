import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Link,
  FormErrorMessage,
} from "@chakra-ui/react"
import { Formik, Form, Field } from "formik"
import React from "react"
import { registerEmail } from "../../lib/auth"
import Layout from "./Layout"

import * as Yup from "yup"
import FormTemplate from "./FormTemplete"
import { InputsData, LinkData, FormTemplateData } from "./authTypes"








const inputData: InputsData = {
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

const initialData={ email: "", password: "", confirmPassword: "" }

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

const links: LinkData[] = [
  { text: " Już masz konto? Zaloguj się", href: "/auth/login" },
]

const LoginData: FormTemplateData = {
  buttonText: "Zajerestruj się!",
  header: "Stwórz własne konto",
  subheader: "żeby otrzymać spersonalizowną diete!",
  initialValues: initialData,
  inputsData: inputData,
  linksData: links,
  onSubmit:registerEmail,
  validationSchema: SignupSchema,
}


const Signin = () => {
  return (
    <FormTemplate  formData={LoginData}  />
  )
}

export default Signin
