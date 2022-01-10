import App from "next/app";
import type { AppProps, AppContext } from 'next/app'
import Head from 'next/head'
import SessionWrapper from "@Hoc/SessionWrapper";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Genesis | Sena App</title>
        <meta name="description" content="This project if focused on SENA" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionWrapper>
        <Component {...pageProps} />
      </SessionWrapper>
    </>
  )
}

export default MyApp
