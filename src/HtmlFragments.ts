import {Dirent, readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync} from 'fs'
import {resolve, dirname} from 'path'

export class HtmlFragments {

    processDir(inDir: string, outDir: string, recursive: boolean = false) {
        if (!existsSync(outDir)){
            mkdirSync(outDir);
        }

        const files = readdirSync(inDir, {withFileTypes: true}) as Dirent[]

        for (const file of files) {
            const filePath = resolve(inDir, file.name)
            if (file.isDirectory()) {
                if (recursive) {
                    this.processDir(filePath, outDir, recursive)
                }
            } else {
                console.debug(`processing file: ${filePath}`)
                const processedContent = this.processFile(filePath)
                const outFilePath = resolve(outDir, file.name)
                writeFileSync(outFilePath, processedContent)
            }
        }
    }

    private processFile(file: string): string {
        const currentDir = dirname(file)
        const content = (readFileSync(file)).toString()

        if (!content) {
            return ''
        }

        return content.replace(/<include \s*src\s*=\s*"(.+)"\s*\/>/g,
            (match: string, path: string) => this.replaceInclude(currentDir, path, match))
    }

    private replaceInclude(currentDir: string, path: string, match: string): string {
        const replacementPath = resolve(currentDir, path)

        try {
            return this.processFile(replacementPath)
        } catch (e) {
            console.warn(`failed to replace ${match}: ${e}`)
            return match
        }
    }
}
