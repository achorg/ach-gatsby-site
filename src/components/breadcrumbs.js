import React, { Fragment } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { FaChevronRight } from 'react-icons/fa';

const Breadcrumbs = ({ location }) => {
    const query = useStaticQuery(
        graphql`
            {
                genericPages: allMdx(
                    filter: {
                        internal: { contentFilePath: { regex: "/\/pages\//" } }
                    }
                ) {
                    nodes {
                        fields {
                            slug
                        }
                        frontmatter {
                            title
                        }
                    }
                }
                newsPosts: allMdx(
                    filter: {
                        internal: { contentFilePath: { regex: "/\/news\//" } }
                    }
                ) {
                    nodes {
                        fields {
                            slug
                        }
                        frontmatter {
                            title
                        }
                    }
                }
                site {
                    siteMetadata {
                        menuLinks {
                            slug: link
                            title: name
                        }
                    }
                }
            }
        `
    );

    const allPages = query.newsPosts.nodes
        .map(page => ({
            slug: `/news${page.fields.slug}`,
            title: page.frontmatter.title,
        }))
        .concat(
            query.genericPages.nodes.map(page => ({
                slug: page.fields.slug,
                title: page.frontmatter.title,
            }))
        )
        .concat(query.site.siteMetadata.menuLinks)
        .filter(page => !page.slug.startsWith('http'))
        .map(page =>
            page.slug.endsWith('/') ? page : { slug: `${page.slug}/`, ...page }
        );

    const pathComponents = location.pathname
        .split('/')
        .filter(component => component);

    const pathSlugs = pathComponents.map((component, index) => {
        return (
            '/' +
            pathComponents.slice(0, index + 1).reduce((previous, current) => {
                return previous + '/' + current;
            }) +
            '/'
        );
    });

    const pageComponents = pathSlugs
        .map(slug => {
            return allPages.find(page => {
                return page.slug === slug;
            });
        })
        .filter(page => page);

    return (
        <nav className="breadcrumbs" aria-label="breadcrumbs">
            <ol>
                { pageComponents.map((page, index) => (
                    <Fragment key={page.slug}>
                        <li>
                            <Link to={page.slug} key={page.slug}>
                                {page.title}
                            </Link>
                        </li>
                        { index !== pageComponents.length - 1 && (
                            <li role="presentation">
                                <FaChevronRight className="icon" aria-hidden="true" />
                            </li>
                        ) }
                    </Fragment>
                )) }
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
