import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

const RecentPosts = ({ layoutStyle, maxPosts }) => {
  const query = useStaticQuery(
    graphql`
      {
        allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/\/blog\//" } },
          sort: { frontmatter: { date: DESC } }
        ) {
          nodes {
            excerpt
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
              description
            }
          }
        }
      }
    `
  );
  
  let posts = query.allMarkdownRemark.nodes;
  
  if (maxPosts) {
    posts = posts.slice(0, maxPosts);
  }
  
  return (
    <ol className={`recent-posts recent-posts-${layoutStyle ?? 'grid'}`}>
      {posts.map(post => {
        const title = post.frontmatter.title || post.fields.slug
  
        return (
          <li key={post.fields.slug}>
            <article
              className="recent-posts-item"
              itemScope
              itemType="http://schema.org/Article"
            >
              <header>
                <h2>
                  <Link to={`/blog${post.fields.slug}`} itemProp="url">
                    <span itemProp="headline">{title}</span>
                  </Link>
                </h2>
                <small>{post.frontmatter.date}</small>
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: post.frontmatter.description || post.excerpt,
                  }}
                  itemProp="description"
                />
              </section>
            </article>
          </li>
        )
      })}
    </ol>
  );
}

export default RecentPosts