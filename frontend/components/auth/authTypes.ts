import { OptionalObjectSchema } from "yup/lib/object"

export interface ItemData {
  label: string
  placeholder: string
  type: string
}
export type InputsData = Record<string,ItemData>
export type InitialValues = Record<string,string>

export interface LinkData {
  href: string
  text: string
}


export interface FormTemplateData{
    validationSchema: OptionalObjectSchema<any>
  inputsData: InputsData
  initialValues: InitialValues
  buttonText: string
  linksData: LinkData[]
  header: string
  subheader: string;
  toastData :ToastFormData;
  onSubmit :  (email: string, password: string) => Promise<any>
}



export interface ToastFormData{
  successTitle:string;
  successDesc:string
  errorTitle:string;

}