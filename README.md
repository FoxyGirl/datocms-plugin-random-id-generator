# ID Generator DatoCMS plugin

A simple plugin to generate IDs for your documents in DatoCMS

## Configuration
___

Please specify a read-only DatoCMS API key on the plugin global settings:

![Plugin settings DatoCMS API key](https://github.com/FoxyGirl/datocms-plugin-random-id-generator/raw/master/docs/01-configuration.jpg)


## Using
___

To enable the random ID generator for your single-line text field, choose "ID Generator" as a field add-on.

![Plugin settings field add-on](https://github.com/FoxyGirl/datocms-plugin-random-id-generator/raw/master/docs/02-configuration.jpg)

When applying this plugin to your field you can set the following settings:
1. ID Prefix if you need it to add before generated IDs.
2. The minimum length for your IDs, default is 3.
3. Upper case for generated ID to convert it to uppercase, default is true.
4. Auto generation, default is true.

![Plugin settings fields](https://github.com/FoxyGirl/datocms-plugin-random-id-generator/raw/master/docs/03-configuration.jpg)

The result of plugin working appears in the field:

![ID generator](https://github.com/FoxyGirl/datocms-plugin-random-id-generator/raw/master/docs/04-using.jpg)

Click on the link "Generate ..." generates random ID according to settings.

## Development
____

Install all the project dependencies with:

```
yarn install
```

Add this plugin in development mode to one of your DatoCMS project with:

```
yarn addToProject
```

Start the local development server with:

```
yarn start
```

The plugin will be served from [http://localhost:5000/](http://localhost:5000/). Insert this URL as the plugin [Entry point URL](https://www.datocms.com/docs/plugins/creating-a-new-plugin/).

## Publishing
____

Before publishing this plugin, make sure:

* you've properly described any configuration parameters in this README file;
* you've properly compiled this project's `package.json` following the [official rules](https://www.datocms.com/docs/plugins/publishing/);
* you've added a cover image (`cover.png`) and a preview GIF (`preview.gif`) into the `docs` folder.

When everything's ready, just run:

```
yarn publish
```
