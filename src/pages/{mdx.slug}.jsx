import * as React from 'react';
import {graphql} from 'gatsby';
import {MDXRenderer} from 'gatsby-plugin-mdx';
import Layout from '../components/Layout';
import { GatsbySeo } from 'gatsby-plugin-next-seo';

const BlogPost = ({
  data: {
    allSite:{
      nodes:[
        meta
      ]
    },
    mdx: {
      slug,
      body,
      frontmatter: {date, title, icon},
    },
  },
}) => {
  return (
    <Layout>
      <GatsbySeo
        title={`${title} | Stevy's wavyLog`}
        openGraph={{
          title,
          url:`${meta.siteMetadata.siteUrl}/${slug}`
        }}
      />
      <section className="post">
        <h1 className="title">{title}</h1>
        <p className="date">{date}</p>
        <MDXRenderer>{body}</MDXRenderer>
      </section>
    </Layout>
  );
};

export const query = graphql`
  query ($id: String) {
    mdx(id: {eq: $id}) {
      frontmatter {
        icon
        title
        date(formatString: "MMMM YYYY")
      }
      body
      slug
    }
    allSite {
      nodes {
        siteMetadata {
          siteUrl
        }
      }
    }
  }
`;

export default BlogPost;
