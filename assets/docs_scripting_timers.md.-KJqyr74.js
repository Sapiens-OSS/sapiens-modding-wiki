import{_ as s,c as i,o as a,a3 as t}from"./chunks/framework.COm4hYgr.js";const m=JSON.parse('{"title":"Timers","description":"","frontmatter":{},"headers":[],"relativePath":"docs/scripting/timers.md","filePath":"docs/scripting/timers.md","lastUpdated":1714807325000}'),e={name:"docs/scripting/timers.md"},n=t(`<h1 id="timers" tabindex="-1">Timers <a class="header-anchor" href="#timers" aria-label="Permalink to &quot;Timers&quot;">​</a></h1><p>Timers in lua can be used to schedule events in the future:</p><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">local</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> timer </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> mjrequire</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;common/timer&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">timer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">addCallbackTimer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(delay </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0.25</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">	slideOn</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(subMenu)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">end</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div>`,3),l=[n];function h(p,r,k,d,c,o){return a(),i("div",null,l)}const g=s(e,[["render",h]]);export{m as __pageData,g as default};
