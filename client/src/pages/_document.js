import React from "react"
import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html className="h-full bg-slate-50" lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
        <link rel="apple-touch-icon" href="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter" rel="stylesheet" />
      </Head>
      <body className="h-full bg-gray-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

