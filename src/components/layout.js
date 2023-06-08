import * as React from "react"
import { Link } from "gatsby"
import Navigation from "./navigation"
import { FaCreativeCommons, FaCreativeCommonsBy, FaCreativeCommonsSa } from "react-icons/fa"

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
      <main className="boxed-regular">{children}</main>
      <footer>
        <div className="license-icons" aria-hidden="true">
          <FaCreativeCommons className="icon" />
          <FaCreativeCommonsBy className="icon" />
          <FaCreativeCommonsSa className="icon" />
        </div>
        <p>Content licensed under <a href="http://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noreferrer">CC BY-SA 3.0</a>.</p>
      </footer>
    </div>
  )
}

export default Layout
