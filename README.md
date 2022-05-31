# Alephium Wiki

Built using [Docusaurus 2](https://docusaurus.io/).

## Development

Install depedencies:

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

You are welcome to submit translations of the wiki pages. So far we only have a small portion of the wiki translated to French. We currently only have capacity to review the following languages:

- French
- German
- Swedish
- Turkish

If your translation is a mere Google translation without any correction, the Pull Request will likely not be accepted.

### Enable a new language for translation

1. Create a folder for the documents inside the `i18n` folder. For example german: `mkdir -p i18n/<two-letter-international-code>/docusaurus-plugin-content-docs/current` (*note that you will need replace `<two-letter-international-code>` with the actual two-letter international code*).
2. Copy all the content from `/docs` into the new folder: `cp -r docs i18n/<two-letter-international-code>/docusaurus-plugin-content-docs/current` (*again, note that you will need replace `<two-letter-international-code>` with the actual two-letter international code*).
3. Remove all the `_category_.json` files from the subfolders inside `i18n/<two-letter-international-code>/docusaurus-plugin-content-docs/current`.
4. Build the translation files for the navbar and the footer: `npm run write-translations -- --locale <two-letter-international-code>`.

Now you can start translating any and all file in `i18n/<two-letter-international-code>/docusaurus-plugin-content-docs/current`

To test your content, run the following command: `npm run start -- --locale <two-letter-international-code>` 

This will only load the wiki in the language you are translating. To locally test the whole site, you can first do `npm run build` and then `npm run serve`)
