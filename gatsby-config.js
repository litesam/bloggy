/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: 'Portfolio',
    author: 'Sam Light 😃',
    pageTitle: 'Bloggy - A Portfolio and Blog combined together'
  },
  plugins: [{
    resolve: 'gatsby-plugin-styled-components'
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'src',
      path: `${__dirname}/src/`
    }
  },
  'gatsby-transformer-remark',
  'gatsby-plugin-react-helmet', {
    resolve: 'gatsby-remark-prismjs'
    // options: {
    //   inlineCodeMarker: 
    // }
  }]
}
