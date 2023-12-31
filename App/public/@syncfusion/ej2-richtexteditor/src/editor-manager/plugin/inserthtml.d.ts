/**
 * Insert a HTML Node or Text
 *
 * @hidden

 */
export declare class InsertHtml {
    /**
     * Insert method
     *
     * @hidden

     */
    static inlineNode: string[];
    static contentsDeleted: boolean;
    static Insert(docElement: Document, insertNode: Node | string, editNode?: Element, isExternal?: boolean, enterAction?: string): void;
    private static findFirstTextNode;
    private static pasteInsertHTML;
    private static placeCursorEnd;
    private static getNodeCollection;
    private static insertTempNode;
    private static cursorPos;
    private static imageFocus;
    private static getImmediateBlockNode;
    private static removingComments;
    private static findDetachEmptyElem;
    private static removeEmptyElements;
    private static closestEle;
}
