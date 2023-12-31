import { MarkdownParser } from './../base/markdown-parser';
/**
 * Link internal component
 *
 * @hidden

 */
export declare class MDInsertText {
    private parent;
    private selection;
    /**
     * Constructor for creating the insert text plugin
     *
     * @param {MarkdownParser} parent - specifies the parent element
     * @hidden

     */
    constructor(parent: MarkdownParser);
    private addEventListener;
    private InsertTextExec;
    private restore;
}
