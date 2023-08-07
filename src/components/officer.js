import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { StaticImage, GatsbyImage, getImage } from 'gatsby-plugin-image';
import { FaEnvelope, FaGlobe, FaTwitter } from 'react-icons/fa';

const Officer = ({ name, imageSrc, position, affiliation, website, email, twitter }) => {
    const query = useStaticQuery(graphql`
        query {
            allFile(filter: { relativePath: { glob: "officers/*" } }) {
                nodes {
                    name
                    childImageSharp {
                        gatsbyImageData(width: 100, height: 100)
                    }
                }
            }
        }
    `);

    const image = getImage(
        query.allFile.nodes.find(image => image.name === imageSrc)
    );

    return (
        <article className="officer-single">
            { image ? (
                <GatsbyImage
                    image={image}
                    className="officer-image"
                    alt={`${name} headshot`}
                />
            ) : (
                <StaticImage
                    src="../images/no-avatar.jpg"
                    className="officer-image"
                    width="100"
                    height="100"
                    alt="Generic avatar"
                />
            ) }
            <h3 className="officer-name">{name}</h3>
            <div className="officer-content">
                {position && <p className="officer-subtitle">{position}</p>}
                { affiliation && (
                    <p className="officer-description">{affiliation}</p>
                ) }
            </div>
            <div className="officer-socials">
                { website && (
                    <a href={website} target="_blank" rel="noreferrer">
                        <FaGlobe className="icon" aria-hidden="true" />
                    </a>
                ) }
                { email && (
                    <a href={`mailto:${email}`}>
                        <FaEnvelope className="icon" aria-hidden="true" />
                    </a>
                ) }
                { twitter && (
                    <a href={`https://twitter.com/${twitter}`} target="_blank" rel="noreferrer">
                        <FaTwitter className="icon" aria-hidden="true" />
                    </a>
                ) }
            </div>
        </article>
    );
};

export default Officer;
