import { parseCookies } from "nookies"
import React from "react"
import { fetchAPI } from "../lib/api"

const prrotected = ({ res }) => {
  return <div>{JSON.stringify(res)}</div>
}
export async function getServerSideProps(ctx) {
  const jwt = parseCookies(ctx).jwt
  console.log(jwt)
  const res = await fetchAPI(
    "/prots/",
    {},
    {
      Authorization: `Bearer ${jwt}`,
    }
  )
  console.log(res, "res")
  return {
    props: { res },
  }
}

export default prrotected
