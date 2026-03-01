#!/usr/bin/env node
// build.js — run before each Netlify deploy to regenerate manifest.json
// Netlify will call this via the build command in netlify.toml

const fs = require('fs');
const path = require('path');

const pizzeriaDir = path.join(__dirname, 'public', 'pizzerias');
const manifestPath = path.join(pizzeriaDir, 'manifest.json');

const ids = fs.readdirSync(pizzeriaDir)
  .filter(f => f.endsWith('.json') && f !== 'manifest.json')
  .map(f => f.replace('.json', ''))
  .sort();

fs.writeFileSync(manifestPath, JSON.stringify(ids, null, 2));
console.log(`✓ manifest.json updated — ${ids.length} pizzerias`);
