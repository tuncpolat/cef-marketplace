import React from "react"

import { Header } from "./shared/Header"
import { Footer } from "./shared/Footer"
import { FullHeightLayout } from "./shared/FullHeightLayout"

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <FullHeightLayout>
        {children}
        <Footer />
      </FullHeightLayout>
    </>
  )
}

export default Layout
