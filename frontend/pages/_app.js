import App from "next/app"
import Head from "next/head"
import "../style/index.css"
import { createContext } from "react"
import { fetchAPI } from "../lib/api"
import { ChakraProvider } from "@chakra-ui/react"
import Header from "../components/Single/Header"
import Footer from "../components/Single/Footer"
import { Chakra } from "../style/chakraProvider"
import Router, { useRouter } from "next/router"
import { DefaultSEO } from "next-seo"
import SEO from "../config/next-seo-config"
import { parseCookies } from "nookies"
// Store Strapi Global object in context
export const GlobalContext = createContext({})

const MyApp = ({ Component, pageProps }) => {
  const { global, navData } = pageProps
  const router = useRouter()

  const isOnAuthPage = router.pathname.startsWith("/auth/")

  return (
    <>
      {/* <DefaultSEO  {...SEO}/> */}
      <Chakra cookies={pageProps.cookies}>
        <GlobalContext.Provider value={global.attributes}>
          {isOnAuthPage || <Header navData={navData} />}
          <Component {...pageProps} />
          {isOnAuthPage || <Footer />}
        </GlobalContext.Provider>
      </Chakra>
    </>
  )
}

const redirectUser = (ctx, location) => {
  if (ctx.req) {
    ctx.res.writeHead(302, { location: location })
    ctx.res.end()
  } else {
    Router.push(location)
  }
}
// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949

MyApp.getInitialProps = async (context) => {
  const { Component, ctx } = context
  const jwt = parseCookies(ctx).jwt
  console.log(Object.keys(ctx), ctx.pathname, "XXX")
  if (!jwt) {
    // us there is no token, dont allow use to go to the /user pages
    if (ctx.pathname.startsWith("/user")) {
      redirectUser(ctx, "/auth/login")
    }
  } else {
    // if there is token, dont allow use to go to the auth pages
    if (ctx.pathname.startsWith("/auth")) {
      redirectUser(ctx, "/")
    }
  }
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(context)
  // Fetch global site settings from Strapi
  const globalRes = await fetchAPI("/global", {
    populate: {
      favicon: "*",
      defaultSeo: {
        populate: "*",
      },
    },
  })
  // Pass the data to our page via props
  return { ...appProps, pageProps: { global: globalRes.data } }
}

export default MyApp
