import { AppProps } from 'next/app'
import Head from 'next/head'

import '../styles/global.css'

export default function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width,initial-scale=1,shrink-to-fit=no,viewport-fit=cover' />
        <title>URL Shortener « Guillem</title>
        <link rel='icon' type='image/png' href='/favicon-32x32.png' sizes='32x32' />
        <link rel='icon' type='image/png' href='/favicon-16x16.png' sizes='16x16' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#f68d2e' />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
