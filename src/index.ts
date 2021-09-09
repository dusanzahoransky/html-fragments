import {Dirent} from "fs"

const { resolve, dirname, basename } = require('path')
const { readFileSync, writeFileSync, readdirSync } = require('fs')

function processDir(inDir: string, outDir: string, recursive: boolean = false) {
    const files = readdirSync(inDir,  { withFileTypes: true }) as Dirent[]

    for (const file of files) {
        const filePath = resolve(inDir, file.name)
        if(file.isDirectory()){
            if(recursive){
                processDir(filePath, outDir, recursive)
            }
        } else{
            console.debug(`processing file: ${filePath}`)
            const processedContent = processFile(filePath)
            const outFilePath = resolve(outDir, file.name)
            writeFileSync(outFilePath, processedContent)
        }
    }
}

function processFile(file: string): string {
    const currentDir = dirname(file)
    const content = (readFileSync(file)).toString()

    if(!content) {
        return ''
    }

    return content.replace(/<include \s*src\s*=\s*"(.+)"\s*\/>/g,
        (match: string, path : string) => replaceInclude(currentDir, path, match, file))
}

function replaceInclude(currentDir: string, path: string, match: string, file: string) {
    const replacementPath = resolve(currentDir, path)

    try {
        return processFile(replacementPath)
    } catch (e) {
        console.warn(`failed to replace ${match}: ${e}`)
    }
}