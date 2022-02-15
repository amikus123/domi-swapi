import axios from  "axios"
import {setCookie} from "nookies"
// Request API.
// Add your own code here to customize or restrict how the public can register new users.

export const registerEmail = async (email: string, password: string) => {
  const res = await axios
    .post(`${process.env.API_URL}/api/auth/local/register`, {
      email,
      password,
    })
    .then((response) => {
      // Handle success.
      console.log(`Well done!`)
      console.log(`User profile`, response.data.user)
      console.log(`User token`, response.data.jwt)
      return response.data
    })
    .catch((error) => {
      // Handle error.
      console.log(error.response.data.error.message)
      console.log(`An error occurred:`, error.response)
      return error.response.data.error.message
    })
  console.log(res, `XDDDD`)
  return res
}

// currently a placeholder
export const loginWithEmail = async (email: string, password: string) => {
  console.log(email,password)
  const res = await axios
    .post(`${process.env.API_URL}/api/auth/local`, {
      identifier: email,
      password,
    })
    .then((response) => {
      // Handle success.
      console.log(`Well done!`)
      console.log(`User profile`, response.data.user)
      console.log(`User token`, response.data.jwt)
      // setting cookie 
      setCookie(null,"jwt",response.data.jwt,{
        maxAge:30*24*60*60,
        path:"/"
      })
      return response.data
    })
    .catch((error) => {
      // Handle error.
      console.log(`An error occurred:`, error.response)
      return error.response.data.error.message
    })
  console.log(res, `XDDDD`)
  return res
}

export const resetPassword = async (email: string, password: string) => {
  console.log(email,`sent`)
  const res = await axios
    .post(`${process.env.API_URL}/api/auth/forgot-password`, {
      email,
    })
    .then((response) => {
      // Handle success.
      console.log(`Well done!`)
      console.log(`User profile`, response.data.user)
      console.log(`User token`, response.data.jwt)
      return response.data
    })
    .catch((error) => {
      // Handle error.
      console.log(`An error occurred:`, error.response)
      return error.response.data.error.message
    })
  console.log(res, `XDDDD`)
  return res
}
