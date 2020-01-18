/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: 'Portfolio',
    author: 'Sam Light 😃'
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
  'gatsby-plugin-react-helmet'
  ]
}
