import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

const Head = ({ pageTitle }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          pageTitle
        }
      }
    }
  `);
  
  return (
    <Helmet title={`${pageTitle} | ${data.site.siteMetadata.pageTitle}`} />
  );
}

export default Head;