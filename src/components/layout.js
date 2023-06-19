import * as React from "react"
import { Link } from "gatsby"
import Navigation from "./navigation"
import { FaCreativeCommons, FaCreativeCommonsBy, FaCreativeCommonsSa } from "react-icons/fa"

const Layout = ({ title, children, usingHero }) => {
  return (
    <div className="global-wrapper">
      <header className={usingHero ? "global-header header-with-hero" : "global-header"}>
        <div className="header-inner boxed-regular">
          <h1 className="main-heading">
            <Link to="/">
              <img src="/images/logo.png" alt={title} />
            </Link>
          </h1>
          <Navigation />
        </div>
      </header>
      <main>{children}</main>
      <footer className="boxed-regular">
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
