import React, { useRef, useEffect } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { FaArrowRight } from 'react-icons/fa';

const RecentPosts = ({
    layoutStyle,
    maxPosts,
    focusedPostIndex = -1,
    headingLevel = 'h2'
}) => {
    const query = useStaticQuery(
        graphql`
            {
                allMdx(
                    filter: {
                        internal: { contentFilePath: { regex: "/\/news\//" } }
                    }
                    sort: { frontmatter: { date: DESC } }
                ) {
                    nodes {
                        excerpt
                        fields {
                            slug
                        }
                        frontmatter {
                            title
                            description
                            dateFormatted: date(formatString: "MMMM D, YYYY")
                            date(formatString: "YYYY-MM-DD")
                        }
                    }
                }
            }
        `
    );

    let posts = query.allMdx.nodes;
    
    const focusedPostRef = useRef();
    
    useEffect(() => {
        focusedPostRef.current?.focus();
    }, [ focusedPostIndex ]);

    if (maxPosts) {
        posts = posts.slice(0, maxPosts);
    }
    
    const Heading = headingLevel;

    return (
        <ol className={`recent-posts recent-posts-${layoutStyle ?? 'grid'}`}>
            { posts.map((post, index) => {
                const title = post.frontmatter.title || post.fields.slug;

                return (
                    <li key={post.fields.slug}>
                        <article
                            className="recent-posts-item"
                            itemScope
                            itemType="http://schema.org/Article"
                        >
                            <header>
                                <Heading>
                                    <Link
                                        to={`/news${post.fields.slug}`}
                                        itemProp="url"
                                        ref={ index === focusedPostIndex ? focusedPostRef : undefined }
                                    >
                                        <span itemProp="headline">{title}</span>
                                    </Link>
                                </Heading>
                                <small>
                                    <time dateTime={post.frontmatter.date}>
                                        {post.frontmatter.dateFormatted}
                                    </time>
                                </small>
                            </header>
                            <section>
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            post.frontmatter.description ||
                                            post.excerpt,
                                    }}
                                    itemProp="description"
                                />
                                <Link
                                    to={`/news${post.fields.slug}`}
                                    itemProp="url"
                                    className="button-slim button-accent"
                                >
                                    Continue reading
                                    <FaArrowRight className="icon icon-animate" aria-hidden="true" />
                                </Link>
                            </section>
                        </article>
                    </li>
                );
            }) }
        </ol>
    );
};

export default RecentPosts;
