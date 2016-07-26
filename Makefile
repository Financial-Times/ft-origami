HOST = localhost:4000
NPM_BIN = ./node_modules/.bin
export PATH := $(NPM_BIN):$(PATH)

# Install dependencies
install:
	@echo "Installing Pa11y..."
	@npm install pa11y-ci@^0.2
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

# Run pa11y against the site
test:
	@echo "Testing site"
	@pa11y-ci --sitemap "http://$(HOST)/sitemap.xml" --sitemap-find "^/" --sitemap-replace "http://$(HOST)/"
