import * as React from 'react';
import {graphql, Link} from 'gatsby';
import {MDXRenderer} from 'gatsby-plugin-mdx';
import Layout from '../components/Layout';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import { Helmet } from 'react-helmet';

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
      <Helmet>
        <title>{`${title} | Stevy's wavyLog 🌊`}</title>
        {/* <meta name="description" content={`${description}`}></meta>
        <meta property="og:description" content={`${description}`}></meta>
        <meta name="twitter:description" content={`${description}`}></meta> */}
      </Helmet>
      {body && (
      <>
        <Link to="/">
          <span style={{color: 'white'}}>
            <FontAwesomeIcon icon={faChevronLeft} size="2x" />
          </span>
        </Link>
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
