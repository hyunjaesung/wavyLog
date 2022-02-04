import {useStaticQuery} from 'gatsby';
import {graphql} from 'gatsby';
import React from 'react';

const BlogPage = () => {
  const data = useStaticQuery(
    graphql`
      query MyQuery {
        allMdx(sort: {fields: frontmatter___date, order: DESC}) {
          nodes {
            body
            id
            frontmatter {
              date
              category
              title
            }
          }
        }
      }
    `
  );
  console.log(data);
  return (
    <div>
      {data.allMdx.nodes.map(node => (
        <article key={node.id}>
          <h2>{node.frontmatter.title}</h2>
          <p>Posted: {node.frontmatter.date}</p>
        </article>
      ))}
    </div>
  );
};

export default BlogPage;
