import {Link} from 'gatsby';
import React from 'react';

const Header = () => {
  return (
    <section className="header">
      <Link to="/">
        <h1>Stevy's wavyLog 🌊</h1>
      </Link>
      <nav>
        <Link to="/">Archive</Link>
        <Link to="/aboutMe">About Me</Link>
      </nav>
    </section>
  );
};

export default Header;
