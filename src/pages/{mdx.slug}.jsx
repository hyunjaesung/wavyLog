import * as React from 'react';
import {graphql} from 'gatsby';
import {MDXRenderer} from 'gatsby-plugin-mdx';
import Layout from '../components/Layout';
import {GatsbySeo} from 'gatsby-plugin-next-seo';
import AboutMe from '../components/AboutMe';

const BlogPost = ({
  data: {
    allSite: {
      nodes: [meta],
    },
    mdx: {
      slug,
      body,
      frontmatter: {date, title, category},
    },
  },
}) => {
  return (
    <Layout>
      <GatsbySeo
        title={`${title} | Stevy's wavyLog`}
        description={`Stevy의 개발 블로그 입니다.`}
        openGraph={{
          title,
          url: `${meta.siteMetadata.siteUrl}/${slug}`,
        }}
      />
      {category === 'Resume' ? (
        <AboutMe title={title} body={body} />
      ) : (
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
        icon
        title
        date(formatString: "MMMM YYYY")
        category
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
