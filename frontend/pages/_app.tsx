import App from 'next/app';
import '../style/index.css';
import { createContext } from 'react';
import Router from 'next/router';
import { parseCookies } from 'nookies';
import {
  RecoilRoot,
} from 'recoil';
import { fetchAPI } from '../lib/api';
import { Chakra } from '../style/chakraProvider';
import Layout from '../components/Single/Layout';

export const GlobalContext = createContext({});

function MyApp(props) {
  const { Component, pageProps, user } = props;
  const { global } = pageProps;

  return (
    <>
      {/* <DefaultSEO  {...SEO}/> */}
      <Chakra cookies={pageProps.cookies}>
        <GlobalContext.Provider value={global.attributes}>
          <RecoilRoot>

            <Layout user={user}>
              <Component {...pageProps} />
            </Layout>
          </RecoilRoot>

        </GlobalContext.Provider>
      </Chakra>
    </>
  );
}

const redirectUser = (ctx, location) => {
  if (ctx.req) {
    ctx.res.writeHead(302, { location });
    ctx.res.end();
  } else {
    Router.push(location);
  }
};
// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949

MyApp.getInitialProps = async (context) => {
  const { Component, ctx } = context;
  const { jwt } = parseCookies(ctx);
  let user = null;
  if (!jwt) {
    // us there is no token, dont allow use to go to the /user pages
    if (ctx.pathname.startsWith('/user')) {
      redirectUser(ctx, '/auth/login');
    }
  } else {
    // if there is token, dont allow use to go to the auth pages
    if (ctx.pathname.startsWith('/auth')) {
      redirectUser(ctx, '/');
    }
    user = await fetchAPI('/users/me', { jwt });
  }
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(context);
  // Fetch global site settings from Strapi
  const globalRes = await fetchAPI('/global', {
    urlParamsObject: {
      populate: {
        favicon: '*',
        defaultSeo: {
          populate: '*',
        },
      },
    },
  });
  // Pass the data to our page via props
  return { ...appProps, pageProps: { global: globalRes.data }, user };
};

export default MyApp;
