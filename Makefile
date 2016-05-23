HOST = localhost:4000
NPM_BIN = ./node_modules/.bin
export PATH := $(NPM_BIN):$(PATH)

# Install dependencies
install:
	@echo "Installing Pa11y..."
	@npm install pa11y@^3
	@echo "Installing GitHub Pages gem..."
	@gem install github-pages

# Build the site
build:
	@echo "Building site"
	@exec jekyll build --drafts

# Watch the site for changes, then build
watch:
	@echo "Watching and building site"
	@exec jekyll build --watch

# Serve the site locally
serve:
	@echo "Watching files and serving site on localhost:4000"
	@exec jekyll serve --watch

# List all of the URLs in a locally running site
list-urls:
	@curl -s http://$(HOST)/sitemap.xml | grep "<loc>" \
		| sed -e 's/<loc>//g' \
		| sed -e 's/<\/loc>//g' \
		| sed -e "s/^\//http:\/\/$(HOST)\//g" \
		| sort

# Run pa11y against the site
test:
	@echo "Testing site"
	@make list-urls | sed '/^$$/d' | { while read i; do pa11y --ignore "notice;warning" $$i || exit 1; done }
# This is set up to fail on a page when it finds at least one accessibility error.
# If it passes on a page, it will move onto the next until an error is found.
