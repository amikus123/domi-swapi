import { AnyObject, OptionalObjectSchema, TypeOfShape } from "yup/lib/object"

export interface ItemData {
  label: string
  placeholder: string
  type: string
}
export type InputsData = Record<string, ItemData>
export type InitialValues = Record<string, string>

export interface LinkData {
  href: string
  text: string
}

export interface FormTemplateData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validationSchema: OptionalObjectSchema<any, AnyObject, TypeOfShape<any>>
  inputsData: InputsData
  initialValues: InitialValues
  buttonText: string
  linksData: LinkData[]
  header: string
  subheader: string
  toastData: ToastFormData
  onSubmit: (email: string, password: string) => Promise<unknown>
}

export interface ToastFormData {
  successTitle: string
  successDesc: string
  errorTitle: string
}
