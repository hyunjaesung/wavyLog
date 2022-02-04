import {graphql, Link, useStaticQuery} from 'gatsby';
import React from 'react';

import Layout from '../components/Layout';

const Title = ({title}) => (
  <h3>
    <span>{title}</span>
  </h3>
);

const ListWrapper = ({children}) => <div className="category-list-wrapper">{children}</div>;

const Item = ({date, title, slug}) => (
  <Link to={`/${slug}`}>
    <div className="post-item">
      <span className="date">{date}</span>
      <span className="title">{title}</span>
    </div>
  </Link>
);

const Main = () => {
  const {
    allMdx: {nodes},
  } = useStaticQuery(
    graphql`
      query MdxList {
        allMdx(sort: {fields: frontmatter___date, order: DESC}) {
          nodes {
            id
            frontmatter {
              date
              category
              title
            }
            slug
          }
        }
      }
    `
  );

  const result = nodes.reduce((acc, {frontmatter: {category, date, title} = {}, id, slug}) => {
    console.log(category);
    if (acc[category] === undefined) {
      acc[category] = [];
    }
    acc[category].push({
      date,
      category,
      title,
      id,
      slug,
    });
    return acc;
  }, {});

  return (
    <Layout>
      <section className="list">
        {Object.entries(result).map(([key, value]) => (
          <ListWrapper key={key}>
            <Title title={key} />
            <>
              {value.map(({id, ...rest}) => (
                <Item key={id} {...rest} />
              ))}
            </>
          </ListWrapper>
        ))}
      </section>
    </Layout>
  );
};

export default Main;
