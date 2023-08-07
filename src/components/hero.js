import React from 'react';
import IconGrid from '../images/hero-icons.svg';

const Hero = ({ title, subtitle }) => {
    return (
        <div className="hero-section">
            <div className="boxed-regular">
                <div className="hero-icons">
                    <IconGrid aria-hidden="true" />
                </div>
                <div className="hero-body">
                    <h1>{ title }</h1>
                    <p>{ subtitle }</p>
                </div>
            </div>
        </div>
    );
};

export default Hero;
