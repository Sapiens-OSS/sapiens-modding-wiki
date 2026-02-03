# Contributing

We'd love some help making this wiki! Get started by creating a fork, commiting some changes, then creating a pull request!

  

## Format

```

# Title

[Short introduction]

## Topic

[Contents]

## Topic

[Contents]

## Example (optional)

[Example]

```

  

If you don't have time or can't finish a wiki page, put this block at the end:

```

::: danger Oh-no!

This wiki page isn't done. But you can help! Click the 'Edit Page' button at the bottom.

:::

```

  

## Testing changes

1. Install the dependencies:  node.js & vitepress

    Node.js: https://nodejs.org/en/download

    `npm i vitepress`


2. Build

    `npm run docs:build`

  

3. Serve

    `npm run docs:serve`

  

All in one command for Ubuntu users to quickly test changes:

    npm run docs:build && npm run docs:serve

  

## How to use headers

Headers (`#, ##, ###, ####`) are used to section a page.

  

`#` should ONLY be used once, and at the top for the title.

`##` should be used for each 'topic', so things like 'Creating a model' or 'Example'

`###` should be used for each 'step' or part to a section. Like 'Importing a model' then 'Editing the model'

`####` should be used for further division of a section, but isn't super common

  

# Categories

## Guides

The guides sections are for walkthroughs to do a specific thing. For example, setting up a project or using a specific feature

  

## Documentation

The documentation contains specific pages on a part of the game. It can contain an example, but generally **doesn't** walk the reader through implementation.

  

### Visuals

This contains stuff for everything visual, like modelling but also UI.

  

### Scripting

This contains the 'behind the scenes' topics, like handling input or UI events.

  

### Miscellaneous

This contains stuff that doesn't fit in any of the other categories

  

## Hammerstone

This contains the documentation for Hammerstone modules.
