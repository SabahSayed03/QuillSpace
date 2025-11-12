const fs = require('fs');
const path = require('path');

// Read backend URL from environment variable set in Render (e.g., BACKEND_URL)
const backendUrl = process.env.BACKEND_URL || process.env.VITE_BACKEND_URL || '';

if (!backendUrl) {
  console.warn(
    'WARNING: BACKEND_URL is not set. generateRedirects will create _redirects with a placeholder.\n' +
      'Set the BACKEND_URL environment variable in your hosting provider to avoid exposing it in the repo.'
  );
}

const target = backendUrl || 'https://example-backend.example.com';

const redirectsContent = `/api/*  ${target}/:splat  200\n`;

const outPath = path.join(__dirname, '..', 'public', '_redirects');

fs.writeFileSync(outPath, redirectsContent, { encoding: 'utf8' });
console.log(`Wrote _redirects -> ${outPath}`);
