import{_ as s,c as a,a2 as i,o as t}from"./chunks/framework.BQmytedh.js";const u=JSON.parse('{"title":"Creating Objects in DDAPI","description":"","frontmatter":{},"headers":[],"relativePath":"hammerstone/ddapi/ddapi-objects.md","filePath":"hammerstone/ddapi/ddapi-objects.md","lastUpdated":1733695063000}'),n={name:"hammerstone/ddapi/ddapi-objects.md"};function o(l,e,c,r,h,d){return t(),a("div",null,e[0]||(e[0]=[i(`<h1 id="creating-objects-in-ddapi" tabindex="-1">Creating Objects in DDAPI <a class="header-anchor" href="#creating-objects-in-ddapi" aria-label="Permalink to &quot;Creating Objects in DDAPI&quot;">​</a></h1><p>Objects can be created by defining a config file in <code>mod/hammerstone/objects/&lt;name&gt;.json</code></p><div class="tip custom-block"><p class="custom-block-title">Use Cheats</p><p>When testing your mods, it&#39;s very useful if you can quickly inspect and cheat in items. Since you&#39;ve already started using Hammerstone, you might as well pull in <a href="https://github.com/SirLich/sapiens-creative-mode" target="_blank" rel="noreferrer">Creative Mode</a> as well for development.</p></div><h2 id="hello-world-example" tabindex="-1">Hello World example <a class="header-anchor" href="#hello-world-example" aria-label="Permalink to &quot;Hello World example&quot;">​</a></h2><p>Here is a simple example which creates a linked <code>resource</code> and <code>object</code>. It references base-game models, so you can safely copy/paste directly into your mod. After adding this file, the new item should appear in game.</p><p>This will create a new item called <code>coconut_2</code>, which you can spawn and decorate with. It can be picked up and stored with the other coconuts (link to storage), but it has no other behaviors (cannot be eaten, or rot, or crafted with).</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;hammerstone:object_definition&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;description&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;identifier&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;coconut_2&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;components&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;hs_object&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;model&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;coconut&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;hs_resource&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;storage_identifier&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;coconut&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="game-objects-vs-resources" tabindex="-1">Game Objects vs Resources <a class="header-anchor" href="#game-objects-vs-resources" aria-label="Permalink to &quot;Game Objects vs Resources&quot;">​</a></h2><p>There are two main lists of items in Sapiens, with huge crossover:</p><ul><li><code>gameObject.lua</code> defines a <em>list of distinct objects</em> such as <code>apple</code> and <code>birchBranch</code> and <code>pineBranch</code></li><li><code>resource.lua</code> defines <em>object categories</em> such as <code>apple</code> or <code>branch</code></li></ul><p>The general rule is that game objects are <em>linked</em> to resources. i.e., every branch in Sapiens is part of the <code>branch</code> resource. For simple objects, like <code>coconut</code>, it&#39;s fully expected that it will be defined as both a <code>gameObject</code> and a <code>resource</code>.</p><p>Here is a quick refresher:</p><h3 id="game-object" tabindex="-1">Game Object <a class="header-anchor" href="#game-object" aria-label="Permalink to &quot;Game Object&quot;">​</a></h3><ul><li>Can be spawned <code>spawn(...)</code></li><li>Exists physically in the world (has a model)</li><li>Contains properties like physics, model scale</li><li>How object transforms when eaten (i.e., meat -&gt; bone)</li></ul><h3 id="resource" tabindex="-1">Resource <a class="header-anchor" href="#resource" aria-label="Permalink to &quot;Resource&quot;">​</a></h3><ul><li>Defines how the object is stored/carried (i.e., all branches have same storage definition)</li><li>Defines food nutrition</li><li>Can be crafted with (i.e., you don&#39;t craft with a <code>birchBranch</code> you craft with a <code>branch</code> -the game figures the rest out)</li></ul><h2 id="schema" tabindex="-1">Schema <a class="header-anchor" href="#schema" aria-label="Permalink to &quot;Schema&quot;">​</a></h2><p>Refer to the <a href="https://github.com/Sapiens-OSS/hammerstone-schemas/blob/main/schemas/object.schema.json" target="_blank" rel="noreferrer">JSON schema</a> for all the possible values.</p>`,18)]))}const k=s(n,[["render",o]]);export{u as __pageData,k as default};