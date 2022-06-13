export default {
  title: "Sapiens Modding Wiki",
  description: "Mod docs for the Sapiens video game.",
  base: "/sapiens-modding-wiki/",
  themeConfig: {
    nav: [
      { text: 'Hammerstone', link: 'https://github.com/SirLich/hammerstone-framework' },
      { text: 'Sapiens', link: 'https://www.playsapiens.com/' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/SirLich/sapiens-modding-wiki' },
      { icon: 'discord', link: 'https://discord.gg/WnN8hj2Fyg' }
    ],
    sidebar: [
      {
        text: 'Getting Started',
        collapsible: false,
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' }
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
      }
    ],
    logo: '/logo.png',
    siteTitle: 'Sapiens Modding Wiki',
  }
};
