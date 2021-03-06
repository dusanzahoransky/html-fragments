"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
class HtmlFragments {
    processDir(inDir, outDir, recursive = false) {
        if (!fs_1.existsSync(outDir)) {
            fs_1.mkdirSync(outDir);
        }
        const files = fs_1.readdirSync(inDir, { withFileTypes: true });
        for (const file of files) {
            const filePath = path_1.resolve(inDir, file.name);
            if (file.isDirectory()) {
                if (recursive) {
                    this.processDir(filePath, outDir, recursive);
                }
            }
            else {
                console.debug(`processing file: ${filePath}`);
                const processedContent = this.processFile(filePath);
                const outFilePath = path_1.resolve(outDir, file.name);
                fs_1.writeFileSync(outFilePath, processedContent);
            }
        }
    }
    processFile(file) {
        const currentDir = path_1.dirname(file);
        const content = (fs_1.readFileSync(file)).toString();
        if (!content) {
            return '';
        }
        return content.replace(/<include \s*src\s*=\s*"(.+)"\s*\/>/g, (match, path) => this.replaceInclude(currentDir, path, match));
    }
    replaceInclude(currentDir, path, match) {
        const replacementPath = path_1.resolve(currentDir, path);
        try {
            return this.processFile(replacementPath);
        }
        catch (e) {
            console.warn(`failed to replace ${match}: ${e}`);
            return match;
        }
    }
}
exports.HtmlFragments = HtmlFragments;
