
import React from "react"

import * as Yup from "yup"
import { loginWithEmail } from "../../lib/auth"
import {  FormTemplateData, InputsData, LinkData } from "./authTypes"
import FormTemplate from "./FormTemplete"


// const LoginData: FormTemplateData = {
//     buttonText: "",
//     header: "",
//     initialValues: {},
//     inputsData: {},
//     linksData: [],
//     onSubmit: () => {},
//     subheader: "",
//     validationSchema: {},
//   }

const inputData: InputsData = {
  email: {
    label: "Wprowadź adres email",
    placeholder: "przykład@mail.com",
    type: "email",
  },
  password: { label: "Wprowadź hasło", placeholder: "", type: "password" },
}

const initialData= { email: "", password: "" }

const SignupSchema = Yup.object({
  email: Yup.string()
    .email("Nieprawidłowy adres email")
    .required("Pole jest wymagane")
    .max(50, "Zyt długi email!"),
  password: Yup.string()
    .required("Hasło jest wymagane")
    .max(50, "Zbyt długie hasło!"),
})

const links: LinkData[] = [
  { text: " Nie masz konta? Zajeresturj się", href: "/auth/signin" },
  { text: "Zapomniałeś hasła?", href: "/auth/forgor" },
]

const LoginData: FormTemplateData = {
  buttonText: "Zaloguj się",
  header: "Zaloguj się",
  initialValues: initialData,
  inputsData: inputData,
  linksData: links,
  onSubmit: loginWithEmail,
  subheader: "żeby zobaczyć twoją diete",
  validationSchema: SignupSchema,
}

const Login = () => {
  return (
  <FormTemplate formData={LoginData}/>
  )
}

export default Login
