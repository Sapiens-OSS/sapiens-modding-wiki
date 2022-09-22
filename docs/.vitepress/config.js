import { SearchPlugin } from "vitepress-plugin-search";

export default {
  head: [
    ['link', { rel: 'stylesheet', href: '/index.css' }]
  ],
  title: "Sapiens Modding Wiki",
  description: "Modding documentation for the Sapiens video game.",
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: 'Sapiens Website', link: 'https://www.playsapiens.com/' },
      { text: 'Official Sapiens Wiki', link: 'https://wiki.playsapiens.com/' }
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
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Lua Shadows', link: '/guide/shadowing' },
          { text: 'Common Issues', link: '/guide/common-issues' },
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
              { text: 'User Interface', link: '/docs/visuals/creating-ui' },

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
              { text: 'C++ Bridges', link: '/docs/scripting/bridge' },
              { text: 'Cheats', link: '/docs/scripting/cheat' },
              { text: 'Game Saves', link: '/docs/scripting/game-saves' },
              { text: 'Input', link: '/docs/scripting/handling-input' },
              { text: 'Threading', link: '/docs/scripting/thread-management' },
              { text: 'Timers', link: '/docs/scripting/timers' },
              { text: 'C Mods', link: '/docs/scripting/c-mods' },
            ]
          },
          {
            text: 'Miscellaneous',
            collapsible: true,
            items: [
              { text: 'Miscellaneous', link: '/docs/misc/notes' }, // Put other entries above this one

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
          { text: 'Installing', link: '/hammerstone/installing' },
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
    SearchPlugin()
  ],
  markdown: {
    
  }
};
