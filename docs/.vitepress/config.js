export default {
  title: "Sapiens Modding Wiki",
  description: "Modding documentation for the Sapiens video game.",
  base: "/sapiens-modding-wiki/",
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
          { text: 'Coordinates', link: '/docs/coordinates' },
          { text: 'Model Format', link: '/docs/model-format' },
          { text: 'Shaders', link: '/docs/shaders' },
          { text: 'Mod Types', link: '/docs/mod-types' },
          { text: 'Materials', link: '/docs/materials' },
          { text: 'Mobs', link: '/docs/mobs' },
          { text: 'C++ Bridges', link: '/docs/bridge' },
          { text: 'Cheats', link: '/docs/cheat' },
          { text: 'User Interface', link: '/docs/creating-ui' },
          { text: 'Game Saves', link: '/docs/game-saves' },
          { text: 'Input', link: '/docs/handling-input' },
          { text: 'Threading', link: '/docs/thread-management' },
          { text: 'Timers', link: '/docs/timers' },
          { text: 'C Mods', link: '/docs/c-mods' },
          { text: 'Miscellaneous', link: '/docs/notes' }, // Put other entries above this one
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
          { text: 'Locale Manager', link: '/hammerstone/locale-manager' },
          { text: 'Input Manager', link: '/hammerstone/input-manager' },
          { text: 'Save State', link: '/hammerstone/save-state' }
        ]
      }
    ],
    logo: '/logo.png',
    siteTitle: 'Sapiens Modding Wiki',editLink: {
      pattern: 'https://github.com/Sapiens-OSS/sapiens-modding-wiki/edit/master/docs/:path'
    },
  }
};
