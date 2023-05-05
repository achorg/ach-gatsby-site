import * as React from "react"
import { Link } from "gatsby"
import Navigation from "./navigation"

const Layout = ({ title, children }) => {
  return (
    <div className="global-wrapper">
      <header className="global-header">
        <h1 className="main-heading">
          <Link to="/">
            <img src="/images/logo.png" alt={title} />
          </Link>
        </h1>
        <Navigation />
      </header>
      <main>{children}</main>
      <footer>
        Content licensed under <a href="http://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noreferrer">CC BY-SA 3.0</a>.
      </footer>
    </div>
  )
}

export default Layout
