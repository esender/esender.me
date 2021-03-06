module.exports = {
  blogPrefixPath: "/blog",
  tagPrefixPath: "/blog/tags",
  queries: {
    getAllPosts: `{
      allMarkdownRemark(
        sort: { order: DESC, fields: frontmatter___date }
        filter: { fileAbsolutePath: { regex: "/blog/" } }
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }`,
    getPostsByTags: `{
      allMarkdownRemark {
        group(field: frontmatter___tags) {
          tag: fieldValue
          totalCount
        }
      }
    }`,
  },
};
