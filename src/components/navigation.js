import React, { useState } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { FaBars, FaTimes } from "react-icons/fa"

const Navigation = () => {
  const [ opened, setOpened ] = useState(false);
  
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
  
  const renderNavLevel = links => (
    <ul>
      {links.map(link => (
        <li
          key={link.name}
        >
          {
            !link.link.startsWith("http") ?
            <Link
              to={link.link}
              activeClassName="active"
            >
              {link.name}
            </Link> :
            <a href={link.link}>
              {link.name}
            </a>
          }
          {link.subMenu && renderNavLevel(link.subMenu)}
        </li>
      ))}
    </ul>
  )
  
  const handleMenuToggle = () => setOpened(!opened);
  
  return (
    <nav className={opened ? "primary-nav menu-open" : "primary-nav"}>
      <button
        className="menu-toggle"
        aria-label="Toggle menu"
        aria-expanded={opened}
        onClick={handleMenuToggle}
      >
        {
          !opened ?
          <FaBars className="icon" aria-hidden="true" /> :
          <FaTimes className="icon" aria-hidden="true" />
        }
      </button>
      {renderNavLevel(menuLinks)}
    </nav>
  );
}

export default Navigation