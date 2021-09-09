"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { resolve, dirname, basename } = require('path');
const { readFileSync, writeFileSync, readdirSync } = require('fs');
function processDir(inDir, outDir, recursive = false) {
    const files = readdirSync(inDir, { withFileTypes: true });
    for (const file of files) {
        const filePath = resolve(inDir, file.name);
        if (file.isDirectory()) {
            if (recursive) {
                processDir(filePath, outDir, recursive);
            }
        }
        else {
            const processedContent = processFile(filePath);
            const outFilePath = resolve(outDir, basename(file));
            return writeFileSync(outFilePath, processedContent);
        }
    }
}
function processFile(file) {
    const currentDir = dirname(file);
    const content = (readFileSync(file)).toString();
    if (!content) {
        return '';
    }
    return content.replace(/<include \s*src\s*=\s*"(.+)"\s*\/>/g, (match, path) => replaceInclude(currentDir, path, match, file));
}
function replaceInclude(currentDir, path, match, file) {
    const replacementPath = resolve(currentDir, path);
    try {
        return processFile(replacementPath);
    }
    catch (e) {
        console.warn(`failed to replace ${match} in ${file}: ${e}`);
    }
}
