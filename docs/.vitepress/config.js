export default {
  head: [
    ['link', { rel: 'stylesheet', href: '/index.css' }],
    ['link', { rel: 'icon', href: '/favicon.ico'}]
  ],
  lang: 'en-US',
  title: "Unofficial Sapiens Modding Wiki",
  description: "Modding documentation for the Sapiens video game.",
  lastUpdated: true,
  themeConfig: {
    algolia: {
      // Search only key
      apiKey: '56fc5c07ebe891feedd03953cc55884e',
      appId: 'QS6BR6DKN3',
      indexName: 'sapiens'
    },
    nav: [
      { text: 'Sapiens Website', link: 'https://www.playsapiens.com/' },
      { text: 'Sapiens Wiki', link: 'https://wiki.playsapiens.com/' },
      { text: 'Official Sapiens Modding Wiki', link: 'https://github.com/Majic-Jungle/sapiens-mod-creation/wiki' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Sapiens-OSS/sapiens-modding-wiki' },
      { icon: 'discord', link: 'https://discord.gg/WnN8hj2Fyg' }
    ],
    sidebar: [
      {
        text: 'Guides',
        collapsible: true,
        items: [
          { text: 'Getting Started with VSCode', link: '/guide/vscode-getting-started' },
          { text: 'Getting Started with Lua', link: '/guide/lua-getting-started' },
          { text: 'Getting Started with C', link: '/guide/c-getting-started' },
          { text: 'Using Lua Shadows', link: '/guide/shadowing' },
        ]
      },
      {
        text: 'Documentation',
        collapsible: true,
        items: [
          {
            text: 'Visuals',
            collapsible: true,
            items: [
              { text: 'Materials', link: '/docs/visuals/materials' },
              { text: 'Shaders', link: '/docs/visuals/shaders' },
              { text: 'Model Format', link: '/docs/visuals/model-format' },
              { text: 'Coordinates', link: '/docs/visuals/coordinates' },
              { text: 'User Interface', link: '/docs/visuals/user-interface' },
            ]
          },
          {
            // Might need a better name
            // Means everything that the user can't see
            // Handing input, save state, timers, threading etc
            text: 'Scripts',
            collapsible: true,
            items: [
              { text: 'Mod Types', link: '/docs/scripting/mod-types' },
              { text: 'Mobs', link: '/docs/scripting/mobs' },
              { text: 'Engine Bridges', link: '/docs/scripting/bridge' },
              { text: 'Dev Tools', link: '/docs/scripting/cheat' },
              { text: 'Game Saves', link: '/docs/scripting/game-saves' },
              { text: 'Input', link: '/docs/scripting/handling-input' },
              { text: 'Thread Management', link: '/docs/scripting/thread-management' },
              { text: 'Timers', link: '/docs/scripting/timers' },
              { text: "World Generation", link: '/docs/scripting/worldgen' },
            ]
          },
          {
            text: 'Miscellaneous',
            collapsible: true,
            items: [
              { text: "Abbreviations", link: '/docs/misc/abbrev' },
              { text: 'Common Issues', link: '/docs/misc/common-issues' },
              { text: 'Other Notes', link: '/docs/misc/notes' },

            ]
          }
        ]
      },
      {
        text: 'Hammerstone',
        collapsible: true,
        items: [
          { text: 'Introduction', link: '/hammerstone/introduction' },
          { text: 'Getting Started', link: '/hammerstone/getting-started' },
          { text: 'Shadowing Util', link: '/hammerstone/shadowing' },
          { text: 'UI Manager', link: '/hammerstone/ui-manager' },
          { text: 'Input Manager', link: '/hammerstone/input-manager' },
          { text: 'Save State', link: '/hammerstone/save-state' },
          { text: 'Patching', link: '/hammerstone/patching' },
          {
            text: 'DDAPI',
            collapsible: true,
            items: [
              { text: 'Getting Started',  link: '/hammerstone/ddapi/ddapi-getting-started' },
              { text: 'Objects',          link: '/hammerstone/ddapi/ddapi-objects' },
              { text: 'Remaps',           link: '/hammerstone/ddapi/ddapi-remaps' },
              { text: 'Troubleshooting',  link: '/hammerstone/ddapi/ddapi-troubleshooting' },
            ]
          }
        ]
      },
      {
        text: 'Tutorials',
        collapsible: true,
        items: [
          { text: 'Craftable object in Lua', link: '/tutorials/creating-craftable-objects' }
        ]
      }
    ],
    logo: '/logo.png',
    siteTitle: 'Sapiens Modding Wiki',
    editLink: {
      pattern: 'https://github.com/Sapiens-OSS/sapiens-modding-wiki/edit/master/docs/:path'
    },
  },
  plugins: [

  ],
  markdown: {

  }
};
