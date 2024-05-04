import { defineConfig } from 'vitepress'

export default defineConfig({
  head: [
    ["link", { rel: "stylesheet", href: "/index.css" }],
    ["link", { rel: "icon", href: "/favicon.ico" }],
  ],
  lang: "en-US",
  title: "Unofficial Sapiens Modding Wiki",
  description: "Modding documentation for the Sapiens video game.",
  lastUpdated: true,
  sitemap: {
    hostname: "https://wiki.sapiens.dev"
  },
  themeConfig: {
    search: {
      provider: 'local'
    },
    nav: [
      { text: "Sapiens Website", link: "https://www.playsapiens.com/" },
      { text: "Sapiens Wiki", link: "https://wiki.playsapiens.com/" },
      {
        text: "Official Sapiens Modding Wiki",
        link: "https://github.com/Majic-Jungle/sapiens-mod-creation/wiki",
      },
    ],
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/Sapiens-OSS/sapiens-modding-wiki",
      },
      { icon: "discord", link: "https://discord.gg/WnN8hj2Fyg" },
    ],
    sidebar: [
      {
        text: "Guides",
        items: [
          {
            text: "Getting Started", items: [
              {
                text: "Visual Studio Code",
                link: "/guide/vscode-getting-started",
              },
              {
                text: "Lua",
                link: "/guide/lua-getting-started",
              },
              { text: "C/C++", link: "/guide/c-getting-started" },

            ]
          },
          { text: "Using Lua Shadows", link: "/guide/shadowing" },
        ],
      },
      {
        text: "Documentation",
        items: [
          {
            text: "Engine Fundamentals",
            items: [
              { text: "Mod Types", link: "/docs/engine/mod-types" },
              { text: "Coordinates", link: "/docs/engine/coordinates" },
              {
                text: "Threads",
                link: "/docs/engine/threads",
              },
              { text: "Bridges", link: "/docs/engine/bridges" },

            ]
          },
          {
            text: "Models",
            items: [
              { text: "Materials", link: "/docs/models/materials" },
              { text: "Model Format", link: "/docs/models/model-format" },
            ],
          },
          {
            text: "Visuals",
            items: [
              { text: "Shaders", link: "/docs/visuals/shaders" },
              { text: "User Interface (UI)", link: "/docs/visuals/user-interface" },
            ]
          },
          {
            text: "Scripts",
            items: [
              { text: "Mobs", link: "/docs/scripting/mobs" },
              { text: "Dev Tools", link: "/docs/scripting/cheat" },
              { text: "Game Saves", link: "/docs/scripting/game-saves" },
              { text: "Input", link: "/docs/scripting/input" },
              { text: "Timers", link: "/docs/scripting/timers" },
              { text: "World Generation", link: "/docs/scripting/worldgen" },
              { text: "Object Sets", link: "/docs/scripting/object-sets" }
            ],
          },
          {
            text: "Miscellaneous",
            items: [
              { text: "Abbreviations", link: "/docs/misc/abbrev" },
              { text: "Common Issues", link: "/docs/misc/common-issues" },
              { text: "Other Notes", link: "/docs/misc/notes" },
            ],
          },
        ],
      },
      {
        text: "Hammerstone",
        items: [
          { text: "Introduction", link: "/hammerstone/introduction" },
          { text: "Getting Started", link: "/hammerstone/getting-started" },
          {
            text: "Utilities",
            items: [
              { text: "Shadowing", link: "/hammerstone/utilities/shadowing" },
              { text: "Logger", link: "/hammerstone/utilities/logger" }
            ]
          },
          {
            text: "Systems",
            items: [
              { text: "UI Manager", link: "/hammerstone/systems/ui-manager" },
              { text: "Input Manager", link: "/hammerstone/systems/input-manager" },
              { text: "Save State", link: "/hammerstone/systems/save-state" },
            ]
          },
          { text: "Patching", link: "/hammerstone/patching" },
          {
            text: "DDAPI",
            collapsible: true,
            items: [
              {
                text: "Getting Started",
                link: "/hammerstone/ddapi/ddapi-getting-started",
              },
              { text: "Objects", link: "/hammerstone/ddapi/ddapi-objects" },
              { text: "Remaps", link: "/hammerstone/ddapi/ddapi-remaps" },
              {
                text: "Troubleshooting",
                link: "/hammerstone/ddapi/ddapi-troubleshooting",
              },
            ],
          },
        ],
      },
      {
        text: "Tutorials",
        items: [
          {
            text: "Craftable object in Lua",
            link: "/tutorials/creating-craftable-objects",
          },
        ],
      },
    ],
    logo: "/logo.png",
    siteTitle: "Sapiens Modding Wiki",
    footer: {
      message: "Created with &hearts; by the Sapiens Modding Community"
    },
  },
  plugins: [],
  markdown: {},
});
