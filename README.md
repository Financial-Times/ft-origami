## This is a gh-pages branch

Please visit http://origami.ft.com to view the site

## Building

Since this is a GitHub pages site, built CSS and JS bundles must be committed to the repository.  We store them in `buildcache` to avoid any confusion - these files should not be edited.  To regenerate them, use Grunt:

1. Clone the repo
2. Ensure the prerequisites (`bower`, `grunt-cli`) are installed globally by checking they're listed in `npm list -g --depth=0`.  If they are not listed, install with `npm install -g bower` or `npm install -g grunt-cli`.
3. Run `npm install` and `bower install`
4. Edit main.scss and main.js as desired
5. Run `grunt` (or if you prefer, `grunt js` or `grunt css`)

## Viewing locally

1. Install Jekyll `gem install jekyll`
2. Run `jekyll serve --watch --baseurl=''` and view on http://localhost:4000/ 
