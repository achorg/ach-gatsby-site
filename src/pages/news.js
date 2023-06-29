import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import RecentPosts from "../components/recent-posts"

const News = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <header className="page-header boxed-regular">
        <h1>News</h1>
      </header>
      <section className="boxed-regular">
        <RecentPosts layoutStyle="list" />
      </section>
    </Layout>
  )
}

export default News

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="News" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
  }
`
