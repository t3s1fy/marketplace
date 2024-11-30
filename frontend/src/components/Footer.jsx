import React, { useContext } from "react";
import "../styles/Footer.css";
import { Context } from "../index";

import instagram_icon from "../assets/icons/instagram-icon.svg";
import telegram_icon from "../assets/icons/telegram_icon.svg";
import facebook_icon from "../assets/icons/facebook_icon.svg";
import twitter_icon from "../assets/icons/twitter_icon.svg";
import dribble_icon from "../assets/icons/dribbble_icon.svg";
import linkedin_icon from "../assets/icons/linkedin_icon.svg";

const Footer = () => {
  const { user } = useContext(Context);
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-icons">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={instagram_icon} alt="instagram icon" />
          </a>

          <a
            href="https://web.telegram.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={telegram_icon} alt="telegram icon" />
          </a>

          <a
            href="https://facebook.com.vn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={facebook_icon} alt="facebook icon" />
          </a>

          <a href="https://x.com" target="_blank" rel="noopener noreferrer">
            <img src={twitter_icon} alt="twitter icon" />
          </a>

          <a
            href="https://dribbble.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={dribble_icon} alt="dribbble icon" />
          </a>

          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedin_icon} alt="linkedin icon" />
          </a>
        </div>
        <div className="footer-links">
          <a href="#" className="footer-link">
            Item first
          </a>
          <a href="#" className="footer-link">
            Item two
          </a>
          <a href="#" className="footer-link">
            Item three
          </a>
          <a href="#" className="footer-link">
            Item four
          </a>
          <a href="#" className="footer-link">
            Item five
          </a>
          <a href="#" className="footer-link">
            Item six
          </a>
        </div>
        {/* Линия */}
        <hr className="footer-line" />
        <p className="footer-text">© 2024 All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
