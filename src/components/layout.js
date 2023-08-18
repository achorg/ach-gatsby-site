import * as React from 'react';
import { Link } from 'gatsby';
import { SkipNavLink, SkipNavContent } from '@reach/skip-nav';
import { StaticImage } from 'gatsby-plugin-image';
import Navigation from './navigation';
import Breadcrumbs from './breadcrumbs';
import { FaCreativeCommons, FaCreativeCommonsBy, FaCreativeCommonsSa } from 'react-icons/fa';

import "@reach/skip-nav/styles.css"

const Layout = ({ location, title, children, usingHero }) => {
    const isNestedPage = location.pathname
        .split('/').filter(component => component).length > 1;

    return (
        <div className="global-wrapper">
            <SkipNavLink />
            <header
                className={
                    usingHero ?
                    'global-header header-with-hero' :
                    'global-header'
                }
            >
                <div className="header-inner boxed-regular">
                    <Link to="/">
                        <StaticImage
                            src="../images/logo.png"
                            alt={title}
                            loading="eager"
                            className="logo"
                            imgClassName="!transition-none"
                        />
                    </Link>
                    <Navigation />
                </div>
            </header>
            <SkipNavContent />
            <main>
                { isNestedPage && (
                    <section className="boxed-regular">
                        <Breadcrumbs location={location} />
                    </section>
                ) }
                {children}
            </main>
            <footer className="boxed-regular">
                <div className="license-icons" aria-hidden="true">
                    <FaCreativeCommons className="icon" />
                    <FaCreativeCommonsBy className="icon" />
                    <FaCreativeCommonsSa className="icon" />
                </div>
                <p>Content licensed under <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noreferrer">CC BY-SA 3.0</a>.</p>
            </footer>
        </div>
    );
};

export default Layout;
