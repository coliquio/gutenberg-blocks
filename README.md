# gutenberg-blocks

Custom blocks for displaying content within Drupal.

## Our custom blocks
* Image
* CTA link
* Highlight (wrapper)
* Image gallery (overlay)
* iFrame (with 3 types)
* Checklist
* Accordion


## Deployment
* Run `npm run build` before committing
* Builed JS/CSS is loaded via custom Drupal module directly from git pages
* Run `npm run buildNative` to create CSS for native iOS app (just copy generated file to xcode project)

## Docu

https://developer.wordpress.org/block-editor/developers/

## To Do's

* enable dev server with fast refresh
* think about responsive images (e.g. with `picture` element and different variants)
* Remove gutenberg-block-image repo
* Integrate fontawesome (https://github.com/FortAwesome/react-fontawesome doesen't work)

## Alternative approach for extending gutenberg blocks

* there is alternative way wich looks like the right way to customize functionality of existing modules used for Media & Text component
* it's not documented well and not recomended officially as the right way to customize blocks but seems to work fine
* some examples of implementing is here - https://jeffreycarandang.com/extending-gutenberg-core-blocks-with-custom-attributes-and-controls/

