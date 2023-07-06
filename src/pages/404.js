import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <section className="boxed-regular error-page">
        <div className="error-container">
          <h1>404</h1>
          <p>Sorry, we couldn't find that page.</p>
          <a href="/" className="button-pill">Take me back home</a>
        </div>
      </section>
    </Layout>
  )
}

export const Head = () => <Seo title="404" />

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
