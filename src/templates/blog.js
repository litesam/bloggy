import React from 'react';
import { graphql } from 'gatsby';
// import { css } from 'styled-components'

import Layout from '../components/layout';
import Head from '../components/head';
import reformatTimeToRead from '../styles/reformatTimeToRead';

export const query = graphql`
query ($slug: String!) {
  markdownRemark (fields: { slug: { eq: $slug } }) {
    frontmatter {
      title
      date
    }
    html
    timeToRead
  }
}
`;

const Blog = (props) => {
  return (
  <Layout title={"Blog"}>
    <Head pageTitle={props.data.markdownRemark.frontmatter.title} />
    <h1>{props.data.markdownRemark.frontmatter.title}</h1>
    <p>{props.data.markdownRemark.frontmatter.date} • {reformatTimeToRead(props.data.markdownRemark.timeToRead)}</p>
    <div dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }}></div>
  </Layout>);
}

export default Blog;