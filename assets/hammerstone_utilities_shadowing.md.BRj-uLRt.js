import{_ as s,c as i,o as a,a3 as n}from"./chunks/framework.COm4hYgr.js";const E=JSON.parse('{"title":"Shadowing with Hammerstone","description":"","frontmatter":{},"headers":[],"relativePath":"hammerstone/utilities/shadowing.md","filePath":"hammerstone/utilities/shadowing.md","lastUpdated":1714807325000}'),e={name:"hammerstone/utilities/shadowing.md"},t=n(`<h1 id="shadowing-with-hammerstone" tabindex="-1">Shadowing with Hammerstone <a class="header-anchor" href="#shadowing-with-hammerstone" aria-label="Permalink to &quot;Shadowing with Hammerstone&quot;">​</a></h1><p>Shadowing is what allows us to hook our logic into Sapiens. This page introduces the Hammerstone shadowing utility which makes this job easier, by introducing a simpler syntax.</p><div class="info custom-block"><p class="custom-block-title">INFO</p><p>This page builds upon the explanation inside of the base-game <a href="/guide/shadowing.html">shadowing explanation</a>.</p></div><h2 id="normal-shadowing" tabindex="-1">Normal Shadowing <a class="header-anchor" href="#normal-shadowing" aria-label="Permalink to &quot;Normal Shadowing&quot;">​</a></h2><p>In the base game, shadowing is implemented by calling a special function called <code>onload</code>, with a single param, representing the original base game module. This module can be used to &#39;hook&#39; or override functions, change local state, etc.</p><details class="details custom-block"><summary>Normal Shadowing example, for reference.</summary><p>Here is an example, which shows:</p><ul><li>Injecting a variable (greet)</li><li>Shadowing a function (setMapMode)</li><li>Injecting a new function (newFunction)</li></ul><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">local</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> mod </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {loadOrder </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">-- Define a new function.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">local</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> newFunction</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	mj</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;New Function&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> mod</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">onload</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(localPlayer)              </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">-- localPlayer variable refers to the</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	localPlayer.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">greet</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Hello World&quot;         </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">-- Define a new &#39;greet&#39; variable on the module</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	mj</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Onload Called&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	super_setMapMode </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> localPlayer.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setMapMode</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> -- Save the original &#39;setMapMode&#39; function to a local var (the &quot;super&quot;), so we can re-call it layer</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	localPlayer.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setMapMode</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(self, newMapModeOrNil, shouldSnap)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">		mj</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Before setMapMode&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">		super_setMapMode</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(newMapModeOrNil, shouldSnap) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">-- Call the super, so that the base game logic continues to be called.</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">		mj</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;After setMapMode&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	localPlayer.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">newFunction</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> newFunction </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">-- Remap the local &#39;newFunction&#39; so that it&#39;s available on the \`localPlayer\` module.</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">end</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> mod</span></span></code></pre></div><p>As you can see, once you have access to the <code>localPlayer</code> module you have a lot of freedom to update and change it&#39;s behavior - it&#39;s just a bit finicky.</p></details><h2 id="shadowing-utility" tabindex="-1">Shadowing Utility <a class="header-anchor" href="#shadowing-utility" aria-label="Permalink to &quot;Shadowing Utility&quot;">​</a></h2><p>While the &#39;onload&#39; based syntax from above is very powerful, it can be a bit annoying to write. A shadow file tends to look very different than a base game file which can make it harder to read and understand.</p><p>The Hammerstone shadowing utility solves this. You can import like so:</p><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">local</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> shadow </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> mjrequire</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;hammerstone/utils/shadow&quot;</span></span></code></pre></div><p>Once you&#39;ve imported this module, you have access to the <code>shadow:shadow</code> function, which takes in a Lua module, and re-configures it as a valid shadow. This is a transformation step, and allows you to author a normal Lua file, without defining <code>onload</code>.</p><p>Here is the same example from above, rewritten using this utility:</p><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">-- Include the shadowing utility</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">mjrequire</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;hammerstone/utils/shadow&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">-- Start by defining a module matching the name of the shadowed module. No more need for &#39;mod&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">local</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> localPlayer </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	greet </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Hello World&quot; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">-- The public state you define here will also be available on the parent module</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">-- &#39;preload&#39; amd &#39;postload&#39; are called automatically when the file is first required. It&#39;s equivalent to placing code directly into &#39;onload&#39;, as you can see above.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> localPlayer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">preload</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(parent)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	mj</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Onload Called&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">-- To shadow a function, just define it. The only different is the first argument should always be called &#39;super&#39;, and represents</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">-- the original function (which you should probably call).</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> localPlayer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setMapMode</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(super, newMapModeOrNil, shouldSnap)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	mj</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Before setMapMode&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">	super</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(newMapModeOrNil, shouldSnap)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	mj</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;After setMapMode&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">-- Public non-shadow functions that you define will automatically be available on the base game module.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> localPlayer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">newFunction</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	mj</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;New Function&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">-- This line does all the work for you. It will convert the current \`localPlayer\` module, into a module matching the format of Sapiens.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">return</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> shadow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">shadow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(localPlayer)</span></span></code></pre></div><p>In case this example wasn&#39;t clear, what&#39;s happening here is that <code>shadow:shadow</code> performs a transformation on your code, taking a straight-forward Lua file, and re-configuring it under the hood to use the <code>mod:onload</code> syntax.</p><p>So, in a nutshell, <code>shadow:shadow</code> defines <code>mod:onload</code>, and runs the following logic inside of it:</p><ul><li>Copies local variables from the shadow module into the parent module (i.e., greet)</li><li>Iterates over the functions in the parent module, and checks the shadow for functions with the same name. If they exist, shadow them automatically.</li><li>Takes any remaining functions in the shadow, and copies them into the parent (i.e., newFunction)</li></ul><h2 id="style-suggestion" tabindex="-1">Style Suggestion <a class="header-anchor" href="#style-suggestion" aria-label="Permalink to &quot;Style Suggestion&quot;">​</a></h2><p>To make it easier to understand shadows, I suggest two style tips:</p><ol><li>Always call the first argument of a shadowed function <code>super</code></li><li>Use the @shadow annotation comment</li></ol><p>Example:</p><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">--- @shadow</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> localPlayer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setMapMode</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(super, newMapModeOrNil, shouldSnap)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">	...</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">end</span></span></code></pre></div><h2 id="debugging-tip" tabindex="-1">Debugging Tip <a class="header-anchor" href="#debugging-tip" aria-label="Permalink to &quot;Debugging Tip&quot;">​</a></h2><p>To debug the shadowing module, you can always print out the resulting module:</p><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">local</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> debugLocalPlayer </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> shadow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">shadow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(localPlayer)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mj</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(debugLocalPlayer)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> debugLocalPlayer</span></span></code></pre></div><h2 id="common-issue" tabindex="-1">Common Issue <a class="header-anchor" href="#common-issue" aria-label="Permalink to &quot;Common Issue&quot;">​</a></h2><p>One last thing to note, is <code>self</code> vs. the module name.</p><div class="info custom-block"><p class="custom-block-title">INFO</p><p>In short: Use <code>self</code> inside of shadowed functions to gain a reference to the true parent module. Using the module name will just give you a copy of the current file, which isn&#39;t what you want.</p><p>If this is confusing for you, try printing out <code>self</code> and <code>localPlayer</code> to see the difference.</p></div><p>Imagine you&#39;re shadowing a fake file called &#39;birdBath.lua&#39;</p><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> birdBath</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">fillWithWater</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(super, liters)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">	...</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">end</span></span></code></pre></div><p>Inside of this function, it&#39;s very natural that you want to access the &#39;birdBath&#39; module, to access the internal state. For example:</p><p><strong>WRONG</strong></p><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> birdBath</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">fillWithWater</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(super, liters)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">	super</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(liters)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	mj</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;New Water Level: &quot; </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">..</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> birdBath.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">waterLevel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">end</span></span></code></pre></div><p>As you might have noticed, using <code>birdBath</code> to refer to the module is WRONG. At this point, <code>birdBath</code> will refer to the <em>current file</em>, not the actual birdBath module (the base game module, containing water level information).</p><p><strong>RIGHT</strong></p><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> birdBath</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">fillWithWater</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(super, liters)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">	super</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(liters)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	mj</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;New Water Level: &quot; </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">..</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">waterLevel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">end</span></span></code></pre></div><p>The correct way to refer to the actual <code>birdBath</code> module is using the <code>self</code> variable, which is special in lua, and contains the parent module. Once the <code>shadow:shadow</code> nonsense is finished, the shadowed function will exist in <code>birdBath</code>, meaning that <code>self</code> correctly refers to the <em>parent</em> module, not the current module.</p>`,36),l=[t];function h(p,k,o,d,r,g){return a(),i("div",null,l)}const u=s(e,[["render",h]]);export{E as __pageData,u as default};
