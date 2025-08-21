#!/bin/bash

# Build the Expo web app
npm run build:web

# Copy redirects file to build directory for client-side routing
mkdir -p dist
cp public/_redirects dist/_redirects 2>/dev/null || echo "_redirects file not found, continuing without it"

echo "Build completed successfully!"
