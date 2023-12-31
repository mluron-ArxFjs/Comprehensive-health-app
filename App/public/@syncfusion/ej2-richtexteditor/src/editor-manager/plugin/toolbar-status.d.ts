import { IToolbarStatus } from './../../common/interface';
/**
 * Update Toolbar Status
 *
 * @hidden

 */
export declare const statusCollection: IToolbarStatus;
export declare class ToolbarStatus {
    /**
     * get method
     *
     * @param {Document} docElement - specifies the document element
     * @param {Node} targetNode - specifies the target node
     * @param {string[]} formatNode - specifies the format node
     * @param {string[]} fontSize - specifies the font size
     * @param {string[]} fontName - specifies the font name.
     * @param {Node} documentNode - specifies the document node.
     * @returns {IToolbarStatus} - returns the toolbar status
     * @hidden

     */
    static get(docElement: Document, targetNode: Node, formatNode?: string[], fontSize?: string[], fontName?: string[], documentNode?: Node): IToolbarStatus;
    private static getImmediateBlockNode;
    private static getFormatParent;
    private static isFormattedNode;
    private static isFontColor;
    private static isLink;
    private static isBackgroundColor;
    private static isFontSize;
    private static isFontName;
    private static isOrderedList;
    private static isUnorderedList;
    private static isAlignment;
    private static isFormats;
    private static getComputedStyle;
    private static isNumberFormatList;
    private static isBulletFormatList;
}
