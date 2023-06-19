import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Hero from "../components/hero"
import RecentPosts from "../components/recent-posts"

const Index = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle} usingHero>
      <section className="boxed-fullwidth">
        <Hero
          title="Uplifting digital humanities."
          subtitle="Our most important activities center on cultivating and strengthening the field of digital humanities, and providing guidance and support to those entering the field."
        />
      </section>
      <section className="boxed-regular">
        <h2 className="section-title">The latest from ACH</h2>
        <RecentPosts maxPosts={6} />
      </section>
    </Layout>
  )
}

export default Index

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
  }
`
