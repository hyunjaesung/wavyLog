import {graphql, Link, useStaticQuery} from 'gatsby';
import React from 'react';
import Layout from '../components/Layout';

const Title = ({title}) => (
  <div className="list_title">
    <span>{title}</span>
  </div>
);

const ListWrapper = ({children}) => <div className="category-list-wrapper">{children}</div>;

const Item = ({date, title, slug, icon}) => (
  <Link to={`/${slug}`}>
    <div className="post-item">
      <span className="date">{date}</span>
      <span className="title">{`${icon} ${title}`}</span>
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
              date(formatString: "MMMM YYYY")
              category
              title
              icon
            }
            slug
          }
        }
      }
    `
  );

  const categories = {
    DeepDive: [],
    Essay: [],
    Book: [],
    BriefDive: [],
  };

  nodes.forEach(({frontmatter: {category, date, title, icon} = {}, id, slug}) => {
    if (categories[category] !== undefined) {
      categories[category].push({
        date,
        category,
        title,
        id,
        slug,
        icon,
      });
    }
  });

  return (
    <Layout>
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
