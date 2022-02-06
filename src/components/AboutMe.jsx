import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';

const AboutMe = ({body}) => {
  return (
    <section className="resume">
      <MDXRenderer>{body}</MDXRenderer>
    </section>
  );
};

export default AboutMe;
