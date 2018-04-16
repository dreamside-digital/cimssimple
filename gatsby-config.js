module.exports = {
  siteMetadata: {
    title: 'CIMS Simple Form Generator',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "CIMSsimple: Planning, Docketing, and Evaluation Tool",
        short_name: "CIMSsimple",
        start_url: "/",
        background_color: "#F0F2EF",
        theme_color: "#13505B",
        display: "minimal-ui",
        icon: "static/icon.png" // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
  ],
}
