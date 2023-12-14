import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import "../styles/Footer.css";

export function Footer() {
  const currentYear = new Date().getFullYear(); // Gets the current year

  return (
    <div className="footer-container">
      <div className="footer-section footer-social-media">
        <h3>Follow Us</h3>
        <div className="social-icons">
          <a href="https://facebook.com" aria-label="Facebook"><FacebookIcon /></a>
          <a href="https://www.instagram.com/wastewisetech/" aria-label="Instagram"><InstagramIcon /></a>
          <a href="https://github.com/garbage-group" aria-label="GitHub"><GitHubIcon /></a>
        </div>
      </div>

      <div className="footer-section footer-credits">
        <h3>Credits</h3>
        <p>Developed by The Garbage Crew</p>
        <p>© {currentYear} The Garbage Crew. All rights reserved.</p>
      </div>
    </div>
  );
}
