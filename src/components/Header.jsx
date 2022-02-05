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
        <Link to="/aboutMe">
          <div class="me-wrapper">
            <img src={profile} alt="profile" width="50" height="50" />
            <div class="info-wrapper">
              <span class="name">Stevy</span>
              <span class="job">Web Developer</span>
            </div>
          </div>
        </Link>
      </nav>
    </section>
  );
};

export default Header;
