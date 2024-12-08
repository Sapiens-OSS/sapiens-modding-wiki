import{_ as a,c as i,a2 as e,o as t}from"./chunks/framework.BQmytedh.js";const g=JSON.parse('{"title":"Getting Started with Lua","description":"","frontmatter":{},"headers":[],"relativePath":"guide/lua-getting-started.md","filePath":"guide/lua-getting-started.md","lastUpdated":1714807325000}'),n={name:"guide/lua-getting-started.md"};function o(l,s,h,r,p,d){return t(),i("div",null,s[0]||(s[0]=[e(`<h1 id="getting-started-with-lua" tabindex="-1">Getting Started with Lua <a class="header-anchor" href="#getting-started-with-lua" aria-label="Permalink to &quot;Getting Started with Lua&quot;">​</a></h1><p>This guide will walk you through setting up a project for a Lua mod. However, we recommend using the <a href="./vscode-getting-started.html">VSCode Extension</a>, as it does this setup for you and makes it easy to get started.</p><h2 id="software-and-installation" tabindex="-1">Software and Installation <a class="header-anchor" href="#software-and-installation" aria-label="Permalink to &quot;Software and Installation&quot;">​</a></h2><p>To get started modding Sapiens you should install a suitable code editor. We suggest <a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer">Visual Studio Code</a> from Microsoft and the <a href="https://marketplace.visualstudio.com/items?itemName=yinfei.luahelper" target="_blank" rel="noreferrer">Lua</a> plugin to get started.</p><h2 id="creating-the-mod" tabindex="-1">Creating the mod <a class="header-anchor" href="#creating-the-mod" aria-label="Permalink to &quot;Creating the mod&quot;">​</a></h2><p>To create a mod, create a folder in one of these locations:</p><ul><li>Windows (official platform): <code>C:\\Users\\[user_name]\\AppData\\Roaming\\majicjungle\\sapiens\\mods\\</code></li><li>MacOSX (official platform): <code>~/Library/Application\\ Support/majicjungle/sapiens/mods</code></li><li>Proton (unoffical): <ul><li><code>~/.steam/steam/steamapps/compatdata/1060230/pfx/drive_c/users/steamuser/AppData/Roaming/majicjungle/sapiens/mods/</code> or</li><li><code>[steamlibrary]/steamapps/compatdata/1060230/pfx/drive_c/users/steamuser/AppData/Roaming/majicjungle/sapiens/mods/</code> (if you&#39;ve changed the install directory)</li></ul></li></ul><p>Next, create a <code>modInfo.lua</code>. This contains most of the important information about your mod. Example <code>modInfo.lua</code>, copy and change as necessary:</p><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">local</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> modInfo </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;My Example Mod Name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  description </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;A super-duper groovy mod that does... stuff&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  type </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">-- We&#39;ll get back to this</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  developer </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Me&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> modInfo</span></span></code></pre></div><p>Here is a full list of modInfo parameters (optional):</p><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">local</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> modInfo </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;My Example Mod Name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    description </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;A super-duper groovy mod that does... stuff&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    preview </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;preview.jpg&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    version </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;0.0.1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    type </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;app&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    developer </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Me&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    website </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;https://sirlich.github.io/sapiens-modding-wiki/&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> modInfo</span></span></code></pre></div><h3 id="mod-types" tabindex="-1">Mod Types <a class="header-anchor" href="#mod-types" aria-label="Permalink to &quot;Mod Types&quot;">​</a></h3><p>As you can see above, we have yet to fill the <code>type</code> parameter of our <code>modInfo.lua</code>. This is because it changes depending on the type of mod we want to make.</p><ul><li><strong>World</strong> mods are the &#39;standard&#39; type of mod. They are run both on the client and the server, and are very useful when trying to add any sort of content.</li><li><strong>App</strong> mods are mods that affect the whole game. They are run on the client, and are useful for things like <a href="https://github.com/Majic-Jungle/sapiens-mod-creation/wiki/Localizations#creating-a-translation-mod" target="_blank" rel="noreferrer">Localization</a></li></ul><p>Depending on the type of mod you&#39;d like to create, <code>type</code> is either <code>world</code> (for World mods) or <code>app</code> (for App mods). Read more about it <a href="/docs/engine/mod-types.html">here</a>.</p><h2 id="what-to-do-from-here" tabindex="-1">What to do from here? <a class="header-anchor" href="#what-to-do-from-here" aria-label="Permalink to &quot;What to do from here?&quot;">​</a></h2><p>This guide just sets up a mod for you, nothing more. To make the game do what you want to do, look over on the sidebar and read up on how it works before trying to implement it. Some topics I suggest checking out:</p><ul><li><a href="/guide/shadowing.html">Shadowing</a> - Further your knowledge on how shadowing works so you don&#39;t run into weird issues later.</li><li><a href="/docs/engine/mod-types.html">Mod Types</a> - Understand what each type of mod does and how to develop them properly.</li><li><a href="/hammerstone/introduction.html">Hammerstone Framework</a> - Hammerstone Framework is a library that&#39;s designed to help modders and provide a level of &#39;protection&#39; from the Sapiens codebase.</li></ul>`,18)]))}const u=a(n,[["render",o]]);export{g as __pageData,u as default};