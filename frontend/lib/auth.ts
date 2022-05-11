import axios from "axios"
import { setCookie } from "nookies"
import Router from "next/router"


export const registerEmail = async (email: string, password: string) => {
  const res = await axios
    .post(`${process.env.API_URL}/api/auth/local/register`, {
      email,
      password,
    })
    .then((response) => {
      setCookie(null, "jwt", response.data.jwt, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      })
      Router.replace("/")
      return response.data
    })
    .catch((error) => {
      console.error(error.response.data.error.message)
      return error.response.data.error.message
    })
  return res
}

// currently a placeholder
export const loginWithEmail = async (email: string, password: string) => {
  const res = await axios
    .post(`${process.env.API_URL}/api/auth/local`, {
      identifier: email,
      password,
    })
    .then((response) => {
      setCookie(null, "jwt", response.data.jwt, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      })
      Router.replace("/")
      return response.data
    })
    .catch((error) => {
      console.error("An error occurred:", error.response)
      return error.response.data.error.message
    })
  return res
}

export const resetPassword = async (email: string) => {
  const res = await axios
    .post(`${process.env.API_URL}/api/auth/forgot-password`, {
      email,
    })
    .then((response) => {
      Router.replace("/")
      return response.data
    })
    .catch((error) => {
      console.error("An error occurred:", error.response)
      return error.response.data.error.message
    })
  return res
}
