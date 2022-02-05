import {graphql, Link, useStaticQuery} from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
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

  const categories = {
    Essay: [],
    DeepDive: [],
    Book: [],
  };

  nodes.forEach(({frontmatter: {category, date, title} = {}, id, slug}) => {
    categories[category].push({
      date,
      category,
      title,
      id,
      slug,
    });
  });

  return (
    <Layout>
      <Helmet>
        <title>Stevy's wavyLog 🌊</title>
      </Helmet>
      <section className="list">
        {Object.entries(categories).map(([key, value]) => (
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
