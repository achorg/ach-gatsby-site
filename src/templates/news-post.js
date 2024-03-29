import * as React from 'react';
import { Link, graphql } from 'gatsby';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import Layout from '../components/layout';
import Seo from '../components/seo';

const NewsPostTemplate = ({
    data: { previous, next, site, mdx: post },
    location,
    children,
}) => {
    const siteTitle = site.siteMetadata?.title || `Title`;

    const authorLine = (post.frontmatter.authors && post.frontmatter.authors.join(', '))
        ?? post.frontmatter?.author;

    return (
        <Layout location={location} title={siteTitle}>
            <article
                className="news-post boxed-regular"
                itemScope
                itemType="http://schema.org/Article"
                lang={post.frontmatter?.language}
            >
                <header className="page-header">
                    <h1 itemProp="headline">{post.frontmatter.title}</h1>
                    <p className="post-metadata">
                        {authorLine && <span>by {authorLine}</span>}
                        <span>
                            <time dateTime={post.frontmatter.date}>
                                {post.frontmatter.dateFormatted}
                            </time>
                        </span>
                    </p>
                </header>
                <section itemProp="articleBody" className="prose">
                    { children }
                </section>
            </article>
            <nav className="related-posts boxed-regular">
                <ul>
                    { previous && (
                        <li className="previous-post">
                            <Link to={`/news${previous.fields.slug}`} rel="prev">
                                <small className="post-date">
                                    <time dateTime={previous.frontmatter.date}>
                                        {previous.frontmatter.dateFormatted}
                                    </time>
                                </small>
                                <span className="post-title">
                                    <FaArrowLeft className="icon" aria-hidden="true" />
                                    {previous.frontmatter.title}
                                </span>
                            </Link>
                        </li>
                    ) }
                    { next && (
                        <li className="next-post">
                            <Link to={`/news${next.fields.slug}`} rel="next">
                                <small className="post-date">
                                    <time dateTime={next.frontmatter.date}>
                                        {next.frontmatter.dateFormatted}
                                    </time>
                                </small>
                                <span className="post-title">
                                    <FaArrowRight className="icon" aria-hidden="true" />
                                    {next.frontmatter.title}
                                </span>
                            </Link>
                        </li>
                    ) }
                </ul>
            </nav>
        </Layout>
    );
};

export const Head = ({ data: { mdx: post } }) => {
    return (
        <Seo
            title={post.frontmatter.title}
            description={post.frontmatter.description || post.excerpt}
        />
    );
};

export default NewsPostTemplate;

export const pageQuery = graphql`
    query NewsPostBySlug(
        $id: String!
        $previousPostId: String
        $nextPostId: String
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
                dateFormatted: date(formatString: "MMMM D, YYYY")
                date(formatString: "YYYY-MM-DD")
                description
                author
                authors
                language
            }
        }
        previous: mdx(id: { eq: $previousPostId }) {
            fields {
                slug
            }
            frontmatter {
                title
                dateFormatted: date(formatString: "MMMM D, YYYY")
                date(formatString: "YYYY-MM-DD")
            }
        }
        next: mdx(id: { eq: $nextPostId }) {
            fields {
                slug
            }
            frontmatter {
                title
                dateFormatted: date(formatString: "MMMM D, YYYY")
                date(formatString: "YYYY-MM-DD")
            }
        }
    }
`;
