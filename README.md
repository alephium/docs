# Alephium Docs

Built using [Docusaurus 2](https://docusaurus.io/).

## Development

Install dependencies:

```shell
npm i
```

Start dev server:

```shell
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```shell
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Internationalization (i18n)

You are welcome to submit translations of the docs pages. So far we only have a small portion of the docs translated to French. We currently only have capacity to review the following languages:

- French
- German
- Swedish
- Turkish

If your translation is a mere Google translation without any correction, the Pull Request will likely not be accepted.

**Before you begin translating, please consider your submission as _commitment_ to maintain the pages in sync with any changes happening in the English version**

### Enable a new language for translation

1. Find the ISO 689-1 two-letter code for your language [here](https://www.loc.gov/standards/iso639-2/php/English_list.php)
2. Create a folder for the documents inside the `i18n` folder. For example german: `mkdir -p i18n/<ISO639-1>/docusaurus-plugin-content-docs/current` (_note that you will need replace `<ISO639-1>` with the actual two-letter international code_).
3. Copy all the content from `/docs` into the new folder: `cp -r docs i18n/<ISO639-1>/docusaurus-plugin-content-docs/current/` (_again, note that you will need replace `<ISO639-1>` with the actual two-letter international code_).
4. Remove all the `_category_.json` files from the subfolders inside `i18n/<ISO639-1>/docusaurus-plugin-content-docs/current`.
5. Build the translation files for the navbar and the footer: `npm run write-translations -- --locale <ISO639-1>`.

Now you can start translating any and all file in `i18n/<ISO639-1>/docusaurus-plugin-content-docs/current`

To test your content, run the following command: `npm run start -- --locale <ISO639-1>`

This will only load the wiki in the language you are translating. To locally test the whole site, you can do `npm run build && npm run serve`)
