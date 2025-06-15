#! /bin/sh

# Clean dist
rm -rf dist

# Create necessary directories
mkdir -p dist/assets/js/ dist/assets/css/

# Copy assets
cp -R assets/images dist/assets
cp -R assets/misc dist/assets
cp CNAME dist

npx node-minify --compressor uglify-js --input assets/js/script.js --output dist/assets/js/script.js
npx node-minify --compressor cssnano --input assets/css/style.css --output dist/assets/css/style.css
npx node-minify --compressor html-minifier --input index.html --output dist/index.html

./scripts/image-minifier.js
npx svgo -rf assets/images -o dist/assets/images
