const {
  config
} = require('vuepress-theme-hope');

const sidebar = require('./sidebar');
const nav = require('./nav');

module.exports = config({
  title: "宁采桃花不采臣",
  description: "欢迎来到梅林的桃源梦幻结界",
  markdown: {
      extendMarkdown: md => {
          md.set({
              html: true,
              lineNumbers: true
          })
          md.use(require('markdown-it-katex'))
      }
  },
  chainWebpack: config => {
      config.resolve.alias.set('core-js/library/fn', 'core-js/features')
  },
  themeConfig: {
      author: '李豪',
      sidebar,
      nav,
      iconPrefix: "icon-",
      docsBranch: 'master',
      docsDir: 'docs',
      docsRepo: 'https://github.com/carefulbird/blog',
      editLinks: true,
      prevLinks: true,
      nextLinks: true,
      mdEnhance: {
          align: true,
          flowchart: true,
          tex: false,
          lineNumbers: false,
          demo: true,
          mermaid: true
      },
  },
  plugins: [
      "@vuepress/nprogress",
      "vuepress-plugin-viewer",
      ['disqus', {
          shortname: 'lastknightcoder'
      }],
      "element-ui"
  ],
  base: '/blog/',
  head: [
      ['link', {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css'
      }],
      ['link', {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.min.css"
      }]
  ]
})