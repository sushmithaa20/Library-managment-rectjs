import React from 'react';
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="social-links">
                <a href="https://github.com" target="https://github.com/sushmithaa20" rel="noopener noreferrer">
                    <i className="fab fa-github"></i>
                </a>
                <a href="https://linkedin.com" target="https://www.linkedin.com/in/sushmitha-4216a9219/" rel="noopener noreferrer">
                    <i className="fab fa-linkedin"></i>
                </a>
                <a href="mailto:example@gmail.com" target="sushmitha.20.2001@gmail.com" rel="noopener noreferrer">
                    <i className="far fa-envelope"></i>
                </a>
            </div>
            <p className="copy">© sushmitha...</p>
        </footer>
    );
}

export default Footer;
