import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import Head from '../components/head';
import reformatTimeToRead from '../styles/reformatTimeToRead';
import blogStyles from './blog.module.css';

const BlogPage = () => {

  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            timeToRead
            frontmatter {
              title
              date
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  return (
    <Layout>
      <Head pageTitle="The Blog" />
      <h1>Blog</h1>
      <ol className={blogStyles.posts}>
        {data.allMarkdownRemark.edges.map(post => <li key={post.node.fields.slug} className={blogStyles.post}>
          <Link to={`/blog/${post.node.fields.slug}`}>
            <h3>{post.node.frontmatter.title}</h3>
            <p>{post.node.frontmatter.date} • {reformatTimeToRead(post.node.timeToRead)}</p>
          </Link>
        </li>)}
      </ol>
    </Layout>
  );
}

export default BlogPage;