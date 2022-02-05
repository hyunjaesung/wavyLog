const title = `Stevy's wavyLog`;
const description = `Stevy의 개발 블로그 입니다.`;
const thumbnail = "/thumbnail.png";
const siteUrl = `https://www.stevy.dev`;

module.exports = {
  siteMetadata: {
    title: title,
    titleTemplate: "%s | Stevy's wavyLog",
    siteUrl: siteUrl,
    description: description,
    author: "hyunjaesung",
    image: thumbnail,
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    `gatsby-plugin-sass`,
    "gatsby-plugin-image",
    {
      resolve: "gatsby-plugin-manifest", // PWA
      options: {
        name: `Stevy's wavyLog`,
        short_name: "wavyLog",
        start_url: "/",
        background_color: `#2e3437`,
        theme_color: `#2e3437`,
        display: "standalone",
        icon: "src/images/profile.jpeg",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts/`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      extensions: ["mdx", "md"],
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null, // `~`에 대한 오지랖
              aliases: {
                js: "javascript",
                ts: "typescript",
                py: "python",
                kt: "kotlin",
              },
              showLineNumbers: true,
              noInlineHighlight: true,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1000,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
    // SEO
    {
      resolve: "gatsby-plugin-next-seo",
      options: {
        language: "ko",
        openGraph: {
          title: title,
          description: description,
          type: "website",
          locale: "ko_KR",
          url: siteUrl,
          site_name: title,
          images: [
            {
              url: thumbnail,
              width: 800,
              height: 400,
              alt: "stevy's wavy log thumbnail",
            },
          ],
        },
      },
    },
    "gatsby-remark-autolink-headers",
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `
          {
            allSitePage {
              nodes {
                path
              }
            }
            allMdx {
              nodes {
                parent {
                  ... on File {
                    modifiedTime
                  }
                }
                slug
              }
            }
          }
        `,

        resolveSiteUrl: () => siteUrl,

        resolvePages: ({
          allSitePage: { nodes: allPages },
          allMdx: { nodes: allBlogPostPages },
        }) => {
          const wpNodeMap = allBlogPostPages.reduce((acc, node) => {
            const {
              parent: { modifiedTime },
              slug,
            } = node;
            const uri = `/${slug}`;
            acc[uri] = { modifiedTime };

            return acc;
          }, {});

          return allPages.map((page) => {
            return {
              ...page,
              ...wpNodeMap[page.path],
            };
          });
        },

        excludes: [],

        filterPages: ({ path }, excludedRoute) => {
          return path.startsWith(excludedRoute);
        },

        serialize: ({ path, modifiedTime }) => {
          if (modifiedTime) {
            return {
              url:
                path[path.length - 1] === "/"
                  ? path.slice(0, path.length - 1)
                  : path,
              url: path,
              lastmod: modifiedTime,
              changefreq: `monthly`,
              priority: 0.9,
            };
          }
          return {
            url:
              path[path.length - 1] === "/"
                ? path.slice(0, path.length - 1)
                : path,
            lastmod: path === "/" ? new Date() : null,
            changefreq: path === "/" ? "weekly" : `monthly`,
            priority: path === "/" ? 0.9 : 0.7,
          };
        },
      },
    },
  ],
};
