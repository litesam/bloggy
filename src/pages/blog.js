import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import blogStyles from './blog.module.css';

const BlogPage = () => {

  // const [isLight, setLight] = useState(window.localStorage.getItem('theme'));

  // useEffect(() => {
  //   if (isLight === 'light') {
  //     setLight('dark');
  //   } else {
  //     setLight('light')
  //   }
  // }, [window.localStorage.getItem('theme')]);
  // console.log(isLight);

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
      <h1>Blog</h1>
      <p>Posts will show up here.</p>
      <ol className={blogStyles.posts}>
        {data.allMarkdownRemark.edges.map(post => <li key={post.node.fields.slug} className={blogStyles.post}>
          <Link to={`/blog/${post.node.fields.slug}`}>
            <h3>{post.node.frontmatter.title}</h3>
            <p>{post.node.frontmatter.date} • {post.node.timeToRead}</p>
          </Link>
        </li>)}
      </ol>
    </Layout>
  );
}

export default BlogPage;