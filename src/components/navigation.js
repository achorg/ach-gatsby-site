import React, { useState } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { FaBars, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Navigation = () => {
    const query = useStaticQuery(
        graphql`
            {
                site {
                    siteMetadata {
                        menuLinks {
                            name
                            link
                            subMenu {
                                name
                                link
                            }
                        }
                    }
                }
            }
        `
    );

    const { menuLinks } = query.site.siteMetadata;

    return (
        <nav className="primary-nav">
            <NavigationLevel links={menuLinks} />
        </nav>
    );
};

const NavigationLevel = ({ links, isRoot = true }) => {
    const [opened, setOpened] = useState(false);

    const handleMenuToggle = () => setOpened(!opened);

    return (
        <>
            { isRoot ? (
                <button
                    className="menu-toggle"
                    aria-label="Toggle menu"
                    aria-expanded={opened}
                    onClick={handleMenuToggle}
                >
                    { !opened ? (
                        <FaBars className="icon" aria-hidden="true" />
                    ) : (
                        <FaTimes className="icon" aria-hidden="true" />
                    ) }
                </button>
            ) : (
                <button
                    className="submenu-toggle"
                    aria-label="Toggle submenu"
                    aria-expanded={opened}
                    onClick={handleMenuToggle}
                >
                    { !opened ? (
                        <FaChevronDown className="icon" aria-hidden="true" />
                    ) : (
                        <FaChevronUp className="icon" aria-hidden="true" />
                    ) }
                </button>
            ) }
            <ul className={opened ? 'submenu-open' : ''}>
                {links.map(link => (
                    <li key={link.name}>
                        { !link.link.startsWith('http') ? (
                            <Link to={link.link} activeClassName="active">
                                {link.name}
                            </Link>
                        ) : (
                            <a href={link.link}>{link.name}</a>
                        ) }
                        { link.subMenu && (
                            <NavigationLevel
                                isRoot={false}
                                links={link.subMenu}
                            />
                        ) }
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Navigation;
