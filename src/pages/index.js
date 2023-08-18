import * as React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import Seo from '../components/seo';
import Hero from '../components/hero';
import RecentPosts from '../components/recent-posts';
import CallToAction from '../components/call-to-action';

const Index = ({ data, location }) => {
    const siteTitle = data.site.siteMetadata.title;

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
                <RecentPosts
                    layoutStyle="grid"
                    maxPosts={6}
                    headingLevel="h3"
                />
            </section>
            <section className="boxed-fullwidth">
                <CallToAction
                    title="Solidarity with BLM"
                    body="The Association for Computers and the Humanities stands in solidarity with the Black Lives Matter protest movement. See our statement on Black Lives Matter, Structural Racism, and Our Organization."
                    image={
                        <StaticImage
                            src="../images/black-lives-matter.jpg"
                            alt="Hands holding up various Black Lives Matter protest signs"
                        />
                    }
                    link={
                        <Link to="/news/2020/06/ach-statement-on-black-lives-matter-structural-racism-and-our-organization/" className="button-pill button-accent">
                            Read more
                        </Link>
                    }
                />
            </section>
        </Layout>
    );
};

export default Index;

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />;

export const pageQuery = graphql`
    {
        site {
            siteMetadata {
                title
            }
        }
    }
`;
