import App from "next/app"
import Head from "next/head"
import "../style/index.css"
import "../assets/css/style.css"
import { createContext } from "react"
import { fetchAPI } from "../lib/api"
import { ChakraProvider } from "@chakra-ui/react"
import { theme } from "../style/theme"
import Header from "../components/Single/Header"
import Footer from "../components/Single/Footer"
import { Chakra } from "../style/chakraProvider"
import { useRouter } from "next/router"
import {DefaultSEO} from "next-seo"
import SEO from "../config/next-seo-config"
// Store Strapi Global object in context
export const GlobalContext = createContext({})

const MyApp = ({ Component, pageProps }) => {
  const { global,navData } = pageProps
  const router = useRouter()
  // normal header  and foter is not rendered on auth pages
  const isOnAuthPage = router.pathname.startsWith("/auth/")
  return (
    <>
    {/* <DefaultSEO  {...SEO}/> */}
      <Chakra cookies={pageProps.cookies}>
        <GlobalContext.Provider value={global.attributes}>
          {isOnAuthPage || <Header  navData={navData}/>}
          <Component {...pageProps} />
          {isOnAuthPage || <Footer />}
        </GlobalContext.Provider>
      </Chakra>
    </>
  )
}

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx)
  // Fetch global site settings from Strapi
  const globalRes = await fetchAPI("/global", {
    populate: {
      favicon: "*",
      defaultSeo: {
        populate: "*",
      },
    },
  })
  const nav = await fetchAPI("/navigations")
  // Pass the data to our page via props
  return { ...appProps, pageProps: { global: globalRes.data,navData:nav.data, } }
}

export default MyApp
