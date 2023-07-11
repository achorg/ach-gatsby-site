/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

// Define the template for news post
const newsPostTemplate = path.resolve(`./src/templates/news-post.js`)
const genericPageTemplate = path.resolve(`./src/templates/generic-page.js`)

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Get all markdown news posts sorted by date
  const result = await graphql(`
    {
      newsPosts: allMdx(
        filter: { internal: { contentFilePath: { regex: "/\/news\//" } } },
        sort: { frontmatter: { date: ASC } },
        limit: 1000
      ) {
        nodes {
          id
          fields {
            slug
          }
          internal {
            contentFilePath
          }
        }
      },
      genericPages: allMdx(
        filter: { internal: { contentFilePath: { regex: "/\/pages\//" } } },
        sort: { frontmatter: { date: ASC } },
        limit: 1000
      ) {
        nodes {
          id
          fields {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your news posts`,
      result.errors
    )
    return
  }

  const posts = result.data.newsPosts.nodes

  // Create news posts pages
  // But only if there's at least one markdown file found at "content/news" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: `/news${post.fields.slug}`,
        component: `${newsPostTemplate}?__contentFilePath=${post.internal.contentFilePath}`,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }
  
  const pages = result.data.genericPages.nodes
  
  if (pages.length > 0) {
    pages.forEach(page => {
      createPage({
        path: page.fields.slug,
        component: `${genericPageTemplate}?__contentFilePath=${page.internal.contentFilePath}`,
        context: {
          id: page.id
        },
      })
    })
  }
}

/**
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

/**
 * @type {import('gatsby').GatsbyNode['createSchemaCustomization']}
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "Mdx" queries will return `null` even when no
  // news posts are stored inside "content/news" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      siteUrl: String
      menuLinks: [MenuLinks]!
    }
    
    type MenuLinks {
      name: String!
      link: String!
      subMenu: [SubMenu]
    }
    
    type SubMenu {
      name: String
      link: String
    }

    type Mdx implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      author: String
      authors: [String]
      language: String
    }

    type Fields {
      slug: String
    }
  `)
}
