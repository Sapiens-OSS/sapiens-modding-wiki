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
      { icon: 'github', link: 'https://github.com/SirLich/sapiens-modding-wiki' },
      { icon: 'discord', link: 'https://discord.gg/WnN8hj2Fyg' }
    ],
    sidebar: [
      {
        text: 'Guides',
        collapsible: false,
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Materials', link: '/guide/Materials' }
        ]
      },
      {
        text: 'Documentation',
        collapsible: true,
        items: [
          { text: 'Mobs', link: '/docs/mobs' },
          { text: 'C++ Bridges', link: '/docs/bridge' },
          { text: 'Cheats', link: '/docs/cheat' },
          { text: 'User Interface', link: '/docs/creating-ui' },
          { text: 'Game Saves', link: '/docs/game-saves' },
          { text: 'Input', link: '/docs/handling-input' },
          { text: 'Notes', link: '/docs/notes' },
          { text: 'Threading', link: '/docs/thread-management' },
          { text: 'Timers', link: '/docs/timers' },

        ]
      },
      {
        text: 'Hammerstone',
        collapsible: false,
        items: [
          { text: 'Introduction', link: '/hammerstone/introduction' },
          { text: 'Getting Started', link: '/hammerstone/getting-started' },
          { text: 'Installing', link: '/hammerstone/installing' },
          { text: 'Logger', link: '/hammerstone/logger' },
          { text: 'UI Manager', link: '/hammerstone/ui-manager' },
          { text: 'Locale Manager', link: '/hammerstone/locale-manager' },
          { text: 'Input Manager', link: '/hammerstone/input-manager' }
        ]
      }
    ],
    logo: '/logo.png',
    siteTitle: 'Sapiens Modding Wiki',
  }
};
