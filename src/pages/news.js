import React, { useState } from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import Seo from '../components/seo';
import RecentPosts from '../components/recent-posts';

const News = ({ data, location }) => {
    const postsPerPage = 10;
    const totalPostCount = data.allMdx.totalCount;
    
    const [ visiblePostCount, setVisiblePostCount ] = useState(postsPerPage);
    const [ focusedPostIndex, setFocusedPostIndex ] = useState();
    
    const showNextPage = () => {
        setFocusedPostIndex(visiblePostCount);
        setVisiblePostCount(Math.min(visiblePostCount + postsPerPage, totalPostCount));
    };
    
    const siteTitle = data.site.siteMetadata.title;

    return (
        <Layout location={location} title={siteTitle}>
            <header className="page-header boxed-regular">
                <h1>News</h1>
            </header>
            <section className="boxed-regular">
                <RecentPosts
                    layoutStyle="list"
                    maxPosts={ visiblePostCount }
                    focusedPostIndex={ focusedPostIndex }
                />
                { (visiblePostCount < totalPostCount) && (
                    <button
                        className="button-pill button-accent mt-8"
                        onClick={ showNextPage }
                    >
                        Show more posts
                    </button>
                ) }
            </section>
        </Layout>
    );
};

export default News;

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="News" />;

export const pageQuery = graphql`
    {
        site {
            siteMetadata {
                title
            }
        }
        allMdx(filter: {internal: {contentFilePath: {regex: "/\/news\//"}}}) {
            totalCount
        }
    }
`;
