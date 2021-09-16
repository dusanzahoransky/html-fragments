#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlFragments_1 = require("./HtmlFragments");
const [, , ...args] = process.argv;
if (args.length < 2 || args.length > 3) {
    console.log(`
        Usage:
            fragments [input directory] [output directory] [process recursively]?
            
        Example:
            fragments site/src site/out
    `);
}
else {
    const inputDir = args[0];
    const outputDir = args[1];
    const recursive = !!args[2] && args[2].toLowerCase() === 'true';
    new HtmlFragments_1.HtmlFragments().processDir(inputDir, outputDir, recursive);
}
