import { loginWithEmail, registerEmail, resetPassword } from "../../lib/auth"
import * as Yup from "yup"
import { InputsData, LinkData, FormTemplateData } from "../../lib/types/authTypes/authTypes"

// *  YUP SCHEMAS

const yupSchema = {
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
  loginPassword: Yup.string()
    .required("Hasło jest wymagane")
    .max(50, "Zbyt długie hasło!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Hasła różnią się")
    .required("Potwierdź hasło"),
}

const loginSchema = Yup.object({
  email: yupSchema.email,
  password: yupSchema.loginPassword,
})

const signinSchema = Yup.object({
  email: yupSchema.email,
  password: yupSchema.password,
  confirmPassword: yupSchema.confirmPassword,
})

const SignupSchema = Yup.object({
  email: yupSchema.email,
})
// *  INPUT SCHEMAS

const inputData = {
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
  error: {
    label: "",
    placeholder: "",
    type: "password",
  },
}

const loginInputData: InputsData = {
  email: inputData.email,
  password: inputData.password,
}

const forgorinputData: InputsData = {
  email: inputData.email,
}

const signinInputData: InputsData = {
  email: inputData.email,
  password: inputData.password,
  confirmPassword: inputData.confirmPassword,
}
// *  INITIAL DATA

const loginInitialData = { email: "", password: "" }
const signinInitialData = { email: "", password: "", confirmPassword: "" }
const forgorinitialData = { email: "" }

// *  LINKS

const loginlinks: LinkData[] = [
  { text: "Nie masz konta? Zajeresturj się", href: "/auth/signin" },
  { text: "Zapomniałeś hasła?", href: "/auth/forgor" },
]
const signinLinks: LinkData[] = [
  { text: "Już masz konto? Zaloguj się", href: "/auth/login" },
]
const forgorlinks: LinkData[] = [
  { text: "Przypomniałeś sobie hasło?", href: "/auth/login" },
  { text: "Nie masz konta? Zajerestuj się", href: "/auth/signin" },
]

// *  TEMPLATES
export const loginData: FormTemplateData = {
  buttonText: "Zaloguj się",
  header: "Zaloguj się",
  initialValues: loginInitialData,
  inputsData: loginInputData,
  linksData: loginlinks,
  onSubmit: loginWithEmail,
  subheader: "żeby zobaczyć twoją diete",
  validationSchema: loginSchema,
  toastData: {
    errorTitle: "Nie udało się zalogować",
    successDesc: "",
    successTitle: "Udało się zalogować",
  },
}

export const signinData: FormTemplateData = {
  buttonText: "Zajerestruj się!",
  header: "Stwórz własne konto",
  subheader: "żeby otrzymać spersonalizowną diete!",
  initialValues: signinInitialData,
  inputsData: signinInputData,
  linksData: signinLinks,
  onSubmit: registerEmail,
  validationSchema: signinSchema,
  toastData: {
    errorTitle: "Nie udało się zarejestrować",
    successDesc: "",
    successTitle: "Udało się zajrestrować",
  },
}

export const forgorData: FormTemplateData = {
  buttonText: "Przypomnij hasło",
  header: "Przypomnij hasło",
  subheader: "podaj email i wyślemy na niego link",
  initialValues: forgorinitialData,
  inputsData: forgorinputData,
  linksData: forgorlinks,
  onSubmit: resetPassword,
  validationSchema: SignupSchema,
  toastData: {
    errorTitle: "Nie udało sie przypomnieć hasła",
    successDesc: "Wysłaliśmy ci maila ",
    successTitle: "Udało się",
  },
}
