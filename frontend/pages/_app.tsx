import App from "next/app"
import "../style/index.css"
import { createContext } from "react"
import Router from "next/router"
import { parseCookies } from "nookies"
import { RecoilRoot } from "recoil"
import { Chakra } from "../style/chakraProvider"
import Layout from "../components/Single/Layout"
import { User } from "../lib/types/global/user"
import { DefaultSeo } from "next-seo"
import { defaultSEO } from "../lib/SEO"

export const GlobalContext = createContext({})

interface MyAppProps {
  Component?: any
  user: User | null
  pageProps: any
}

function MyApp({ Component, pageProps, user }: MyAppProps) {
  return (
    <>
      <DefaultSeo {...defaultSEO} />
      <Chakra cookies={pageProps.cookies}>
        <GlobalContext.Provider value={{}}>
          <RecoilRoot>
            <Layout user={user}>
              <Component {...pageProps} />
            </Layout>
          </RecoilRoot>
        </GlobalContext.Provider>
      </Chakra>
    </>
  )
}

const redirectUser = (ctx, location) => {
  if (ctx.req) {
    ctx.res.writeHead(302, { location })
    ctx.res.end()
  } else {
    Router.push(location)
  }
}

MyApp.getInitialProps = async (context): Promise<MyAppProps> => {
  const { ctx } = context
  const { jwt } = parseCookies(ctx)
  const user = null
  // if (!jwt) {
  //   // us there is no token, dont allow use to go to the /user pages
  //   if (ctx.pathname.startsWith("/user")) {
  //     redirectUser(ctx, "/auth/login")
  //   }
  // } else {
  //   // if there is token, dont allow use to go to the auth pages
  //   if (ctx.pathname.startsWith("/auth")) {
  //     redirectUser(ctx, "/")
  //   }
  //   user = await fetchAPI("/users/me", { jwt })
  // }
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(context)
  // Fetch global site settings from Strapi
  // const globalRes = await fetchAPI("/global", {
  //   urlParamsObject: {
  //     populate: {
  //       favicon: "*",
  //       defaultSeo: {
  //         populate: "*",
  //       },
  //     },
  //   },
  // })
  // Pass the data to our page via props
  return { ...appProps, pageProps: { global: { attributes: {} } }, user }
}

export default MyApp
