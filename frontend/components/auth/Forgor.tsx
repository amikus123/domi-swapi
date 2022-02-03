import React from "react"
import { registerEmail, resetPassword } from "../../lib/auth"

import * as Yup from "yup"
import FormTemplate from "./FormTemplete"
import { InputsData, LinkData, FormTemplateData } from "./authTypes"

const inputData: InputsData = {
  email: {
    label: "Wprowadź adres email",
    placeholder: "przykład@mail.com",
    type: "email",
  },
}

const initialData = { email: "" }

const SignupSchema = Yup.object({
  email: Yup.string()
    .email("Nieprawidłowy adres email")
    .required("Pole jest wymagane")
    .max(50, "Zyt długi email!"),
})

const links: LinkData[] = [
  { text: " Przypomniałeś sobie hasło?", href: "/auth/login" },
  { text: " Nie masz konta? Zajerestuj się", href: "/auth/signin" },
]

const LoginData: FormTemplateData = {
  buttonText: "Przypomnij hasło",
  header: "Przypomnij hasło",
  subheader: "podaj email i wyślemy na niego link",
  initialValues: initialData,
  inputsData: inputData,
  linksData: links,
  onSubmit: resetPassword,
  validationSchema: SignupSchema,
}

const Forgor = () => {
  return <FormTemplate formData={LoginData} />
}

export default Forgor
