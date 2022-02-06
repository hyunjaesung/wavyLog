import {Link} from 'gatsby';
import React from 'react';
import profile from "../../src/images/profile.jpeg"

const Header = () => {
  return (
    <section className="header">
      <Link to="/">
        <h1>
          Stevy<strong>'</strong>s wavyLog 🌊
        </h1>
      </Link>
      <nav>
        <Link to="/about-me">
          <div className="me-wrapper">
            <img src={profile} alt="profile" width="50" height="50" />
            <div className="info-wrapper">
              <span className="name">Stevy</span>
              <span className="job">Web Developer / kakao</span>
            </div>
          </div>
        </Link>
      </nav>
    </section>
  );
};

export default Header;
