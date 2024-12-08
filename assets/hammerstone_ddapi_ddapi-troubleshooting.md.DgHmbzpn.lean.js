import{_ as o,c as t,a2 as a,o as i}from"./chunks/framework.BQmytedh.js";const b=JSON.parse('{"title":"Troubleshooting the DDAPI","description":"","frontmatter":{},"headers":[],"relativePath":"hammerstone/ddapi/ddapi-troubleshooting.md","filePath":"hammerstone/ddapi/ddapi-troubleshooting.md","lastUpdated":1733695063000}'),n={name:"hammerstone/ddapi/ddapi-troubleshooting.md"};function s(d,e,r,l,h,c){return i(),t("div",null,e[0]||(e[0]=[a('<h1 id="troubleshooting-the-ddapi" tabindex="-1">Troubleshooting the DDAPI <a class="header-anchor" href="#troubleshooting-the-ddapi" aria-label="Permalink to &quot;Troubleshooting the DDAPI&quot;">​</a></h1><p>Modding in Sapiens is error prone, and although Hammerstone improves this in some ways, in other ways it can add more confusion. Also, the DDAPI opens the doors to additional bugs to sneak in!</p><p>This section will explain some common issues and their solutions.</p><h2 id="debug-boolean" tabindex="-1">Debug Boolean <a class="header-anchor" href="#debug-boolean" aria-label="Permalink to &quot;Debug Boolean&quot;">​</a></h2><p>Simply set <code>&quot;debug&quot;: true</code> at the top of your JSON file (per config, not fully standardized), and Hammerstone will print additional information about the object.</p><h2 id="commonly-encountered-issues" tabindex="-1">Commonly encountered issues <a class="header-anchor" href="#commonly-encountered-issues" aria-label="Permalink to &quot;Commonly encountered issues&quot;">​</a></h2><h3 id="buildable-doesn-t-start-building" tabindex="-1">Buildable doesn&#39;t start Building <a class="header-anchor" href="#buildable-doesn-t-start-building" aria-label="Permalink to &quot;Buildable doesn&#39;t start Building&quot;">​</a></h3><p>If you notice that sapiens will gather the resources for a buildable but not start building it, this could be caused by the &quot;requirements&quot; being ill-matched. For example the &#39;tool&#39; or &#39;skill&#39; being defined in a weird or unexpected way.</p><h3 id="buildable-doesn-t-complete" tabindex="-1">Buildable doesn&#39;t Complete <a class="header-anchor" href="#buildable-doesn-t-complete" aria-label="Permalink to &quot;Buildable doesn&#39;t Complete&quot;">​</a></h3><p>If the buildable is finished, but never &quot;completed&quot;, this could be caused by an incorrect &#39;action_sequence&#39;. For example the sequence created from <code>createStandardBuildSequence</code> doesn&#39;t work for buildables.</p><h3 id="object-crashes-when-i-click-on-it" tabindex="-1">Object crashes when I click on it <a class="header-anchor" href="#object-crashes-when-i-click-on-it" aria-label="Permalink to &quot;Object crashes when I click on it&quot;">​</a></h3><p>Objects in Sapiens need the &quot;plans&quot; to be added. Resources have their own plans. Harvestables have their own plans. You can also add custom plans. But if you don&#39;t do any of this, the object will crash when you click on it.</p><h3 id="object-crashes-when-a-sapien-picks-it-up" tabindex="-1">Object crashes when a Sapien picks it up <a class="header-anchor" href="#object-crashes-when-a-sapien-picks-it-up" aria-label="Permalink to &quot;Object crashes when a Sapien picks it up&quot;">​</a></h3><p>Likely a storage issue. Confirm that the object has a valid storage definition (defined in resource component)</p>',14)]))}const p=o(n,[["render",s]]);export{b as __pageData,p as default};