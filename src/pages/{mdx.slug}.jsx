import * as React from 'react';
import {graphql} from 'gatsby';
import {MDXRenderer} from 'gatsby-plugin-mdx';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

const BlogPost = ({
  data: {
    mdx: {
      body,
      frontmatter: {date, title},
    },
  },
}) => {
  return (
    <Layout>
      <SEO title={`${title}`}/>
      {body && (
      <>
        <section className="post">
          <h1 className="title">{title}</h1>
          <p className="date">{date}</p>
          <MDXRenderer>{body}</MDXRenderer>
        </section>
      </>
      )}
    </Layout>
  );
};

export const query = graphql`
  query ($id: String) {
    mdx(id: {eq: $id}) {
      frontmatter {
        title
        date
      }
      body
    }
  }
`;

export default BlogPost;
