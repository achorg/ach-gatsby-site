/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `The Association for Computers and the Humanities`,
    description: `The Association for Computers and the Humanities (ACH) is a major professional society for the digital humanities. We support and disseminate research and cultivate a vibrant professional community through conferences, publications, and outreach activities.`,
    menuLinks: [
      {
        "name": "About",
        "link": "/about",
        "subMenu": [
          {
            "name": "Constitution & Bylaws",
            "link": "/about/constitution/"
          },
          {
            "name": "Elections",
            "link": "/about/elections"
          },
          {
            "name": "History",
            "link": "/about/history"
          },
          {
            "name": "Standing Committees",
            "link": "/about/standing-committees"
          },
          {
            "name": "Officers and Council Members",
            "link": "/about/officers"
          }
        ]
      },
      {
        "name": "Activities",
        "link": "/activities",
        "subMenu": [
          {
            "name": "Advocacy",
            "link": "/activities/advocacy"
          },
          {
            "name": "Grants and Awards",
            "link": "/activities/grants-and-awards"
          },
          {
            "name": "Mentoring",
            "link": "/activities/mentoring"
          }
        ]
      },
      {
        "name": "Conferences",
        "link": "/conferences",
        "subMenu": [
          {
            "name": "Modern Language Association",
            "link": "/conferences/mla-pages"
          },
          {
            "name": "Past Conferences",
            "link": "/conferences/past-conferences"
          }
        ]
      },
      {
        "name": "Publications",
        "link": "/publications"
      },
      {
        "name": "Join ACH",
        "link": "https://members.ach.org/"
      }
    ],
    siteUrl: `https://ach.org/`
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        include: `${__dirname}/src/images`,
      }
    },
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/pages`,
        name: `pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `{
              allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
                nodes {
                  excerpt
                  html
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    date
                  }
                }
              }
            }`,
            output: "/rss.xml",
            title: "Gatsby Starter Blog RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `The Association for Computers and the Humanities`,
        short_name: `ACH`,
        start_url: `/`,
        background_color: `#ffffff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
  ],
}
