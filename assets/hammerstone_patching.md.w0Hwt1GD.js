import{_ as e,c as t,o as a,a3 as i}from"./chunks/framework.COm4hYgr.js";const g=JSON.parse('{"title":"Patching","description":"","frontmatter":{},"headers":[],"relativePath":"hammerstone/patching.md","filePath":"hammerstone/patching.md","lastUpdated":1714807325000}'),s={name:"hammerstone/patching.md"},n=i(`<h1 id="patching" tabindex="-1">Patching <a class="header-anchor" href="#patching" aria-label="Permalink to &quot;Patching&quot;">​</a></h1><p>Patching is a powerful way to mod Sapiens. Patching allows you to edit the vanilla scripts before they are loaded into the environment. This means that patches are applied before the regular mods are loaded. Hammerstone helps you with this by introducing patch mods.</p><h3 id="how-it-works" tabindex="-1">How it works <a class="header-anchor" href="#how-it-works" aria-label="Permalink to &quot;How it works&quot;">​</a></h3><p>At the start of scripts, you&#39;ll often find a function called &quot;mjrequire&quot; followed by the path of a module. This function first loads the vanilla lua file and then checks if the enabled mods provide a mod file of the same path. Hammerstone intercepts this steps and loads the vanilla lua file as a text file. It then checks for patch mods matching the same path and does some text editing before returning it to the modManager for it to apply regular mods to.</p><p>Everything is done in memory. This means that the original files on the disk are never edited and there is no danger of permanently damaging the game&#39;s files.</p><h3 id="when-to-use-patch-mods" tabindex="-1">When to use patch mods <a class="header-anchor" href="#when-to-use-patch-mods" aria-label="Permalink to &quot;When to use patch mods&quot;">​</a></h3><p>Patch mods should only be used when regular mods simply don&#39;t cut it. A good example would be to override a local function. Hammerstone already provides a way for you to make that function global. You can then create a regular mod to override it as usual.</p><h3 id="when-not-to-use-patch-mods" tabindex="-1">When NOT to use patch mods <a class="header-anchor" href="#when-not-to-use-patch-mods" aria-label="Permalink to &quot;When NOT to use patch mods&quot;">​</a></h3><p>Patch mods should not be used to add new global functions or variables (unless part of a bigger patch). This can already be done via regular mods.</p><p>The reason is that the more patches are applied to one file, the harder it is for other modders to patch it themselves. Their own operations might fail because a patch with a lower patchOrder has removed or renamed what they wanted to patch.</p><p>Please be careful and mindful when using patch mods! (Otherwise, have lots of fun and enjoy the power 😃 )</p><h2 id="creating-patch-mods" tabindex="-1">Creating patch mods <a class="header-anchor" href="#creating-patch-mods" aria-label="Permalink to &quot;Creating patch mods&quot;">​</a></h2><p>To create a patch mod, create a &quot;patches&quot; folder at the root of your mod folder. Then, create a lua file matching the same path as the &quot;script&quot; file you want to patch as you would with regular script mods. For example, if you want to patch the game file &quot;server/planManager.lua&quot;, your patch would be at &quot;modFolder/patches/server/planManager.lua&quot;</p><p>Inside this file, return the following information:</p><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">local</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> patch </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	version </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;0.4.2.5&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">--for future use. The version of the game the patch was made for</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	patchOrder </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">-- same as &quot;loadOrder&quot; in regular mods. Indicates the priority of the patch vs other patches</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	debugCopyBefore </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">-- if true, Hammerstone will save a &quot;before&quot; copy of the file at the same location as your patch mod file. This could be useful in case an other patch mod modified the file before you did</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	debugCopyAfter </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">-- if true, Hammerstone will save an &quot;after&quot; copy of the file so you can see your edits</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	debugOnly </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">--if true, Hammerstone will patch the file but won&#39;t load it into the environment. Use this in combinaison with &quot;debugCopyAfter&quot; while you&#39;re working on your patch</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	appliesTo </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {}, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">-- for &#39;Universal patches&#39; only. Specifies which files this patch is for</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	operations </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {} </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">-- see &quot;Operations&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> patch</span></span></code></pre></div><h3 id="universal-patches" tabindex="-1">Universal patches <a class="header-anchor" href="#universal-patches" aria-label="Permalink to &quot;Universal patches&quot;">​</a></h3><p>If you want to patch something in many files, you can make a &#39;Universal patch&#39;. These kinds of patch MUST be placed at the root of the <code>patches</code> folder and contain a table named <code>appliesTo</code>.</p><p>Each entry in this table represents the path of the module(s) to patch as a pattern. For example, if you want to patch everything under &quot;mainThread/ui&quot;, use <code>mainThread/ui/.+</code>.</p><h3 id="chunk-files" tabindex="-1">Chunk Files <a class="header-anchor" href="#chunk-files" aria-label="Permalink to &quot;Chunk Files&quot;">​</a></h3><p>If you have a lot of code to insert or replace, typing one long multiline string just isn&#39;t manageable. For this purpose, you can create separate lua files containing all that neat code and place it in &quot;modFolder/chunks&quot;. The name of the file without the extension will become the name of the chunk.</p><h2 id="operations" tabindex="-1">Operations <a class="header-anchor" href="#operations" aria-label="Permalink to &quot;Operations&quot;">​</a></h2><p>Operations are the &quot;edits&quot; you want to make to the original lua file. Hammerstone will run each operation sequentially. If an operation fails, unless it is allowed to fail, the whole patch will be abandonned and the original file will remain as is. An operation can either be a table or a function.</p><p>NOTE: Operations are an indexed array iterated through &quot;ipairs&quot;. If you set the indices yourself (as I like to do to better be able to debug if the logs say &quot;operation &#39;x&#39; failed&quot;), make sure they are sequential!</p><h3 id="function-operations" tabindex="-1">Function operations <a class="header-anchor" href="#function-operations" aria-label="Permalink to &quot;Function operations&quot;">​</a></h3><p>This function only receives one parameter: the content of the file as it is currently patched. This function must return two things: the new patched file string and a success indicator. Ex:</p><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">operations </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(fileContent)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            fileContent, count </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> fileContent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">gsub</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;variableName&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;newVariableName&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> fileContent, count </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">~=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">         end</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="table-operations" tabindex="-1">Table operations <a class="header-anchor" href="#table-operations" aria-label="Permalink to &quot;Table operations&quot;">​</a></h3><p>Table operations are a clean and short way to write edits. By default, all table operations will contain these fields:</p><ul><li><code>type</code> The type of operation (see Operation Types below)</li><li><code>skipOnFail</code> (optional) If true, Hammerstone will move onto the next operation instead of failing the whole patch if the operation fails</li><li><code>condition</code> (optional) A function which receives the fileContent and the context as a parameter and returns a boolean indicating if this operation should be run or not</li></ul><p>The rest of the fields will depend on the operation <code>type</code>.</p><p>Ex:</p><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">operations </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   --replaces the whole local function &quot;doStuff&quot; with the content of the chunk file at &quot;chunks/newDoStuff.lua&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { type </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;replace&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, startAt</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;local function doStuff(&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, repl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{chunk</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;newDoStuff&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}, endAt</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\r\\n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">end&quot; </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="context" tabindex="-1">Context <a class="header-anchor" href="#context" aria-label="Permalink to &quot;Context&quot;">​</a></h3><p>The context contains useful information about the file currently being patched:</p><ul><li><code>path</code> Path of the module (ex: &quot;common/skills&quot;)</li><li><code>moduleName</code> Name of the module (ex: &quot;skills&quot;)</li></ul><h3 id="operation-types" tabindex="-1">Operation Types <a class="header-anchor" href="#operation-types" aria-label="Permalink to &quot;Operation Types&quot;">​</a></h3><p>Hammerstone provides the following operation types:</p><ul><li><code>replace</code> Equivalent of calling <code>string.gsub</code><ul><li><code>pattern</code> (string+) The pattern to search the file with</li><li><code>repl</code> (string+) The replacement string</li></ul></li><li><code>replaceAt</code> Replaces the file content (inclusive) between &quot;startAt&quot; and &quot;endAt&quot; <ul><li><code>startAt</code> (nodes) Where to start looking for the text to replace</li><li><code>endAt</code> (nodes) (optional) Where to stop looking for the text to replace</li><li><code>repl</code> (string+) The replacement string</li></ul></li><li><code>replaceBetween</code> Replaces the file content (exclusive) between &quot;startAt&quot; and &quot;endAt&quot; <ul><li><code>startAt</code> (nodes) Where to start looking for the text to replace</li><li><code>endAt</code> (nodes) Where to stop looking for the text to replace</li><li><code>repl</code> (string+) The replacement string</li></ul></li><li><code>removeAt</code> Removes text from the file content (inclusive) between &quot;startAt&quot; and &quot;endAt&quot; <ul><li><code>startAt</code> (nodes) Where to start looking for the text to remove</li><li><code>endAt</code> (nodes) (optional) Where to stop looking for the text to remove</li></ul></li><li><code>insertAfter</code> Inserts text after &quot;after&quot; <ul><li><code>after</code> (nodes) (optional) Where to insert the text. If nil, the string will be added at the end of the file</li><li><code>string</code> (string+) The text to insert</li></ul></li><li><code>insertBefore</code> Inserts text before &quot;before&quot; <ul><li><code>before</code> (nodes) (optional) Where to insert the text. If nil, the string will be added at the top of the file</li><li><code>string</code> (string+) The text to insert</li></ul></li><li><code>localVariableToModule</code> Transform a local variable into part of the module so it can be recalled with moduleName.variableName <ul><li><code>moduleName</code> (string+) The name of the module</li><li><code>variableName</code> (string+) The name of the variable</li></ul></li><li><code>localFunctionToGlobal</code> Transform a local function into a global one <ul><li><code>moduleName</code> (string+) The name of the module</li><li><code>variableName</code> (string+) The name of the variable</li></ul></li></ul><p>Note: When <code>endAt</code> is optional, the end of the edit is the end of the file.</p><h3 id="inclusive-vs-exclusive-replacements" tabindex="-1">Inclusive vs Exclusive replacements <a class="header-anchor" href="#inclusive-vs-exclusive-replacements" aria-label="Permalink to &quot;Inclusive vs Exclusive replacements&quot;">​</a></h3><p>Inclusive means that the last string at <code>startAt</code> and the last string at <code>endAt</code> will be included in the replacement. Exclusive means the opposite.</p><h3 id="string" tabindex="-1">string+ <a class="header-anchor" href="#string" aria-label="Permalink to &quot;string+&quot;">​</a></h3><p>In order to be as powerful as can be, Hammerstone provides many ways to fill in operation parameters. A string+ can be the following:</p><ul><li><code>string</code> Plain old regular string (or <code>pattern</code> in the case of <code>replace</code>)</li><li><code>function</code> Receives the fileContent and name of the parameter and returns the value of the parameter</li><li><code>sub-table</code> Must contain the name and value of the argument (no use for now)</li><li><code>chunk table</code> Used to fill the parameter with the content of a chunk <ul><li><code>chunk</code> (string) The name of the chunk. Equivalent to the name of the chunk file without the &quot;.lua&quot; extension</li><li><code>indent</code> (number) (Optional) Number of times to indent the content of the chunk. 1 indent equals to 4 spaces</li></ul></li></ul><h4 id="keywords" tabindex="-1">Keywords <a class="header-anchor" href="#keywords" aria-label="Permalink to &quot;Keywords&quot;">​</a></h4><p>All string+ can use <code>keywords</code>. They are placeholders for values pertaining to the current file being patched. They correspond to the values of the <code>context</code>.</p><p>You use them by putting the name of the context value surrounded by a pound sign (ex: &quot;#PATH#&quot;).</p><p>During the operation, they keywords will be replaced by the value in the <code>context</code>.</p><h3 id="nodes" tabindex="-1">nodes <a class="header-anchor" href="#nodes" aria-label="Permalink to &quot;nodes&quot;">​</a></h3><p>In order to better search for the right place in the file to start or stop an edit, Hammerstone provide &quot;nodes&quot;. They can be the following:</p><ul><li><code>string</code> Hammerstone will search for that string in plain text</li><li><code>text table</code> Contains the following: <ul><li><code>text</code> (string) The text to search for</li><li><code>plain</code> (boolean) If true, Hammerstone will search with a plain text. If false, it will search with a pattern</li><li><code>reps</code> (number) (optional) How many times the text should be looked for. If nil, the default value is 1. If the value is -1, the text will be searched for until it can&#39;t be found anymore.</li></ul></li><li><code>function</code> Receives the fileContent and the index to start its search at as parameter. Must return the first and last index of its search result</li><li><code>nodes table</code> Contains a list of nodes. Each node within that list must be either a string, a text table or a function as previously defined.</li></ul><p>Nodes are used to pinpoint the location of an edit with better accuracy. Consider the following code:</p><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">local</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> foo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    local</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> result </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> getResult</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> result </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">then</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">       doSomething</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    end</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">local</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> bar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   local</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> result </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> getResult</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> result </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">then</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">       doSomethingElse</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   end</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">end</span></span></code></pre></div><p>We would like to replace <code>getResult()</code> with <code>getMyNewResult()</code> BUT only when it is being called by <code>bar</code>. If we search for the string <code>local result = </code>, it&#39;ll return the location of the first result, which is under <code>foo</code>.</p><p>This is not what we want. We first want to search for <code>local function bar()</code> and THEN search for <code>local result = </code>. To tell Hammerstone this, we setup the startAt nodes as such:</p><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">startAt </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">   &quot;local function bar()&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">   &quot;local result = &quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>The <code>endAt</code> node always start their search after the results of <code>startAt</code>. This means that it&#39;s not necessary to repeat the nodes from <code>startAt</code>.</p><h2 id="hammerstone-s-patches" tabindex="-1">Hammerstone&#39;s patches <a class="header-anchor" href="#hammerstone-s-patches" aria-label="Permalink to &quot;Hammerstone&#39;s patches&quot;">​</a></h2><p>Hammerstone already patches some files for its own needs in order to better serve you.</p><p>Some of these changes are minor, some are massive. By default, a copy of the patched files can be found in Hammerstone&#39;s mod folder under &quot;patched&quot; if you ever need to consult them. They are created when Hammerstone patches a module. This means that, for example, if you want to see if a certain UI module has been patched, you must first open up that UI in game so that its file and patch are loaded.</p><p>This file will contain ALL patches applied to the original file. If you only want to see the patches done by Hammerstone unload all other mods.</p>`,61),o=[n];function l(h,r,p,d,c,k){return a(),t("div",null,o)}const f=e(s,[["render",l]]);export{g as __pageData,f as default};
