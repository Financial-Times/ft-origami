## This is a gh-pages branch

Please visit http://origami.ft.com to view the site

## Building

Since this is a GitHub pages site, built CSS bundle must be committed to the repository.  We store it in `buildcache` to avoid any confusion - files in the `buildcache` directory should not be edited.  To regenerate them, use Grunt:

1. Clone the repository
2. Ensure `grunt-cli` is installed globally by checking it's listed with `grunt --version`.  If it's not, install with `npm install -g grunt-cli`.
3. Run `npm install`
4. Edit main.scss as desired
5. Run `grunt`

## Viewing locally

1. Install Jekyll `gem install jekyll`
2. Run `npm start` (or `jekyll serve --watch --baseurl=''` and `grunt watch`) and view on http://localhost:4000/
