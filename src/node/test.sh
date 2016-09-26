#!/bin/bash
echo "### Running Tests for Hybrid Letterbox Node Server ###";
pm2 start main.js -s --name HybridLetterboxTest -- test; 
./node_modules/.bin/mocha tests/main.js --reporter spec;
pm2 delete HybridLetterboxTest -s;