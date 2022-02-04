import {graphql, useStaticQuery} from 'gatsby';
import React from 'react';

import Layout from '../components/Layout';

const Main = () => {
  const data = useStaticQuery(
    graphql`
      query HeaderQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  );
  console.log(data);
  return (
    <Layout>
      <p className="text-lg">
        hihihihihihihihihihihihihihhihihih ihihihihihihihihihihhihihihihihihih ihihihihihihhihihihihihihihihihihihih
        ihhihihihihihihihihihihihihihhihihihihi hihihihihihihihihhi
        hihihihihihihihihihihihihhihihihihihihihihihihihihihi
      </p>
    </Layout>
  );
};

export default Main;
