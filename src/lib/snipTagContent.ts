import { init, parse } from 'es-module-lexer'
import { ParserOptions } from 'prettier';
import { importSort } from '../print/rules'
import { concatStr } from './utils'
import MagicString from 'magic-string';

export const snippedTagContentAttribute = '✂prettier:content✂';

let inited = false
init.then(() => {
    inited = true
})

export function snipScriptAndStyleTagContent(source: string, options: ParserOptions): string {
    let scriptMatchSpans = getMatchIndexes('script');
    let styleMatchSpans = getMatchIndexes('style');

    return snipTagContent(
        snipTagContent(source, 'script', '{}', styleMatchSpans),
        'style',
        '',
        scriptMatchSpans,
    );

    function getMatchIndexes(tagName: string) {
        const regex = getRegexp(tagName);
        const indexes: [number, number][] = [];
        let match = null;
        while ((match = regex.exec(source)) != null) {
            if (source.slice(match.index, match.index + 4) !== '<!--') {
                indexes.push([match.index, regex.lastIndex]);
            }
        }
        return indexes;
    }

    function snipTagContent(
        _source: string,
        tagName: string,
        placeholder: string,
        otherSpans: [number, number][],
    ) {
        const regex = getRegexp(tagName);
        let newScriptMatchSpans = scriptMatchSpans;
        let newStyleMatchSpans = styleMatchSpans;
        // Replace valid matches
        const newSource = _source.replace(regex, (match, attributes, content, index) => {
            let newContentStr = content
            if (match.startsWith('<!--') || withinOtherSpan(index)) {
                return match;
            }
            if (tagName === 'script' && inited) {
                debugger
                const imports = parse(content)[0]
                const newImports = importSort(imports, content, options)
                const importStr = concatStr(newImports)
                const magicString = new MagicString(content)
                newContentStr = magicString.overwrite(imports[0].ss, imports[imports.length - 1].se, importStr).toString()
            }
            const encodedContent = Buffer.from(newContentStr).toString('base64');
            const newContent = `<${tagName}${attributes} ${snippedTagContentAttribute}="${encodedContent}">${placeholder}</${tagName}>`;

            // Adjust the spans because the source now has a different content length
            const lengthDiff = match.length - newContent.length;
            newScriptMatchSpans = adjustSpans(scriptMatchSpans, newScriptMatchSpans);
            newStyleMatchSpans = adjustSpans(styleMatchSpans, newStyleMatchSpans);
            function adjustSpans(
                oldSpans: [number, number][],
                newSpans: [number, number][],
            ): [number, number][] {
                return oldSpans.map((oldSpan, idx) => {
                    const newSpan = newSpans[idx];
                    // Do the check using the old spans because the replace function works
                    // on the old spans. Replace oldSpans with newSpans afterwards.
                    if (oldSpan[0] > index) {
                        // span is after the match -> adjust start and end
                        return [newSpan[0] - lengthDiff, newSpan[1] - lengthDiff];
                    } else if (oldSpan[0] === index) {
                        // span is the match -> adjust end only
                        return [newSpan[0], newSpan[1] - lengthDiff];
                    } else {
                        // span is before the match -> nothing to adjust
                        return newSpan;
                    }
                });
            }

            return newContent;
        });

        // Now that the replacement function ran, we can adjust the spans for the next run
        scriptMatchSpans = newScriptMatchSpans;
        styleMatchSpans = newStyleMatchSpans;

        return newSource;

        function withinOtherSpan(idx: number) {
            return otherSpans.some((otherSpan) => idx > otherSpan[0] && idx < otherSpan[1]);
        }
    }

    function getRegexp(tagName: string) {
        return new RegExp(`<!--[^]*?-->|<${tagName}([^]*?)>([^]*?)<\/${tagName}>`, 'g');
    }
}

export function hasSnippedContent(text: string) {
    return text.includes(snippedTagContentAttribute);
}

export function unsnipContent(text: string): string {
    const regex = /(<\w+.*?)\s*✂prettier:content✂="(.*?)">.*?(?=<\/)/gi;

    return text.replace(regex, (_, start, encodedContent) => {
        const content = Buffer.from(encodedContent, 'base64').toString('utf8');
        return `${start}>${content}`;
    });
}
