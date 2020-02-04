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
  }, {
    resolve: 'gatsby-transformer-remark',
    options: {
      plugins: [
        {
          resolve: 'gatsby-remark-prismjs',
          options: {
            classPrefix: 'language-',
            inlineCodeMarker: null
          }
        }
      ]
    }
  },
  'gatsby-plugin-react-helmet',
  ]
}
