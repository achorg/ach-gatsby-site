import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const GenericPageTemplate = ({
  data: { site, mdx: post },
  location,
  children
}) => {
  const siteTitle = site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <header className="page-header boxed-regular">
        <h1 itemProp="headline">{post.frontmatter.title}</h1>
      </header>
      <section
        itemProp="articleBody"
        className="prose boxed-regular"
      >
        { children }
      </section>
    </Layout>
  )
}

export const Head = ({ data: { mdx: post } }) => {
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
    />
  )
}

export default GenericPageTemplate

export const pageQuery = graphql`
  query GenericPageBySlug(
    $id: String!
  ) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      frontmatter {
        title
        description
      }
    }
  }
`
