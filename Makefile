
HOST = localhost:4000
NPM_BIN = ./node_modules/.bin

# Install dependencies
install:
	@echo "Installing dependencies"
	@bundle install
	@npm install pa11y-ci

# Build the site
build:
	@echo "Building site"
	@bundle exec jekyll build --drafts

# Watch the site for changes, then build
watch:
	@echo "Watching and building site"
	@bundle exec jekyll build --watch --drafts

# Serve the site
serve:
	@echo "Serving site"
	@bundle exec jekyll serve --watch --drafts

# Run pa11y against the site
test:
	@echo "Testing site"
	@$(NPM_BIN)/pa11y-ci --sitemap "http://$(HOST)/sitemap.xml"
