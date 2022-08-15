import { SupportLanguage, Parser, Printer } from 'prettier';
import fs from 'fs'
import { pathResolve, readFileToStr, concatFilesStr } from './lib/utils'
import { print } from './print';
import { print as jsPrint } from './print/js-print'
import { ASTNode } from './print/nodes';
import { embed } from './embed';
import { embed as jsEmbed } from './js-embed';
import { snipScriptAndStyleTagContent } from './lib/snipTagContent';
import { resolveJsImportsContent } from './lib/resolveJsImportsContent'

function locStart(node: any) {
    return node.start;
}

function locEnd(node: any) {
    return node.end;
}

export const languages: Partial<SupportLanguage>[] = [
    {
        name: 'svelte',
        parsers: ['svelte'],
        extensions: ['.svelte'],
        vscodeLanguageIds: ['svelte'],
    },
    {
        name: 'importJs',
        parsers: ['importJs'],
        extensions: ['.js'],
        vscodeLanguageIds: ['javascript'],
    },
];

export const parsers: Record<string, Parser> = {
    svelte: {
        parse: (text) => {
            try {
                return <ASTNode>{ ...require(`svelte/compiler`).parse(text), __isRoot: true };
            } catch (err: any) {
                if (err.start != null && err.end != null) {
                    // Prettier expects error objects to have loc.start and loc.end fields.
                    // Svelte uses start and end directly on the error.
                    err.loc = {
                        start: err.start,
                        end: err.end,
                    };
                }

                throw err;
            }
        },
        preprocess: (text, options) => {
            text = snipScriptAndStyleTagContent(text, options);
            text = text.trim();
            // Prettier sets the preprocessed text as the originalText in case
            // the Svelte formatter is called directly. In case it's called
            // as an embedded parser (for example when there's a Svelte code block
            // inside markdown), the originalText is not updated after preprocessing.
            // Therefore we do it ourselves here.
            options.originalText = text;
            options.projectCssContent = options.svelteCssFiles.length > 0 ? concatFilesStr(options.svelteCssFiles) : ''
            options.projectCssOrderContent = options.svelteCssOrderFile ? readFileToStr(options.svelteCssOrderFile) : ''
            return text;
        },
        locStart,
        locEnd,
        astFormat: 'svelte-ast',
    },
    importJs: {
        preprocess: (text, options) => {
            text = resolveJsImportsContent(text, options)
            text = text.trim();
            options.originalText = text;
            return text;
        },
        parse: (text) => text,
        locStart,
        locEnd,
        astFormat: 'javascript-ast',
    }
};

export const printers: Record<string, Printer> = {
    'svelte-ast': {
        print,
        embed,
    },
    'javascript-ast': {
        print: jsPrint,
        embed: jsEmbed
    }
};

export { options } from './options';
