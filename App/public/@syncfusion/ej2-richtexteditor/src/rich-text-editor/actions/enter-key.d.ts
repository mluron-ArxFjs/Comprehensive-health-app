import { IRichTextEditor } from '../base/interface';
/**
 * `EnterKey` module is used to handle enter key press actions.
 */
export declare class EnterKeyAction {
    private parent;
    private range;
    private startNode;
    private endNode;
    private formatTags;
    constructor(parent?: IRichTextEditor);
    protected addEventListener(): void;
    private destroy;
    private moduleDestroy;
    private removeEventListener;
    private getRangeNode;
    private enterHandler;
    private removeBRElement;
    private insertBRElement;
    private insertFocusContent;
    private createInsertElement;
}
