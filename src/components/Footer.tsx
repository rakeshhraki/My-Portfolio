import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <span className="footer-name">RAKESH S.</span>
          <span className="footer-pipe">|</span>
          <span className="footer-role">ASPIRING CYBERSECURITY PROFESSIONAL</span>
        </div>
        <div className="footer-center">
          <span>&copy; {new Date().getFullYear()} ALL RIGHTS RESERVED</span>
        </div>
        <div className="footer-right">
          <span className="footer-tagline">BUILDING WITH SECURITY IN MIND</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
