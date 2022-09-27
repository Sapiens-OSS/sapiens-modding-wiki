export default {
  head: [
    ['link', { rel: 'stylesheet', href: '/index.css' }],
    ['link', { rel: 'icon', href: '/favicon.ico'}]
  ],
  title: "Sapiens Modding Wiki",
  description: "Modding documentation for the Sapiens video game.",
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: 'Sapiens Website', link: 'https://www.playsapiens.com/' },
      { text: 'Sapiens Wiki', link: 'https://wiki.playsapiens.com/' },
      { text: 'Sapiens Modding Wiki', link: 'https://github.com/Majic-Jungle/sapiens-mod-creation/wiki' },
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
          { text: 'Installing', link: '/hammerstone/installing' },
          { text: 'Getting Started', link: '/hammerstone/getting-started' },
          { text: 'Logger', link: '/hammerstone/logger' },
          { text: 'UI Manager', link: '/hammerstone/ui-manager' },
          { text: 'Input Manager', link: '/hammerstone/input-manager' },
          { text: 'Save State', link: '/hammerstone/save-state' }
        ]
      }
    ],
    logo: '/logo.png',
    siteTitle: 'Sapiens Modding Wiki', editLink: {
      pattern: 'https://github.com/Sapiens-OSS/sapiens-modding-wiki/edit/master/docs/:path'
    },
  },
  plugins: [

  ],
  markdown: {

  }
};
