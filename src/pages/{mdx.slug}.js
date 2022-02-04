import * as React from 'react';
import {graphql, useStaticQuery} from 'gatsby';
import {MDXRenderer} from 'gatsby-plugin-mdx';
import Layout from '../components/Layout';

const BlogPost = () => {
  const {
    mdx: {
      body,
      frontmatter: {date},
    },
  } = useStaticQuery(
    graphql`
      query ($id: String) {
        mdx(id: {eq: $id}) {
          frontmatter {
            title
            date
          }
          body
        }
      }
    `
  );
  console.log(body);
  return (
    <Layout>
      <p>{date}</p>
      <MDXRenderer>{body}</MDXRenderer>
    </Layout>
  );
};

export default BlogPost;
