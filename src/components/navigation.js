import React, { useState } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

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
          <Link
            to={link.link}
            activeClassName="active"
          >
            {link.name}
          </Link>
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
        aria-expanded={opened}
        onClick={handleMenuToggle}
      >Toggle</button>
      {renderNavLevel(menuLinks)}
    </nav>
  );
}

export default Navigation