import { IRichTextEditor } from '../base/interface';
import { ServiceLocator } from '../services/service-locator';
/**
 * PasteCleanup module called when pasting content in RichTextEditor
 */
export declare class PasteCleanup {
    private parent;
    private renderFactory;
    private locator;
    private contentRenderer;
    private i10n;
    private saveSelection;
    private nodeSelectionObj;
    private dialogRenderObj;
    private popupObj;
    private uploadObj;
    private dialogObj;
    private keepRadioButton;
    private cleanRadioButton;
    private plainTextRadioButton;
    private inlineNode;
    private blockNode;
    private isNotFromHtml;
    private containsHtml;
    constructor(parent?: IRichTextEditor, serviceLocator?: ServiceLocator);
    private addEventListener;
    private destroy;
    private removeEventListener;
    private pasteClean;
    private fireFoxImageUpload;
    private splitBreakLine;
    private makeSpace;
    private imgUploading;
    private getBlob;
    private toolbarEnableDisable;
    private uploadMethod;
    private uploadFailure;
    private popupClose;
    private refreshPopup;
    private base64ToFile;
    /**
     * Method for image formatting when pasting
     *
     * @param {Object} pasteArgs - specifies the paste arguments.
     * @param {Element []} imgElement - specifies the array elements.
     * @returns {void}
     * @hidden

     */
    private imageFormatting;
    private radioRender;
    private selectFormatting;
    private pasteDialog;
    private updateCss;
    private setCssClass;
    private destroyDialog;
    private cleanAppleClass;
    private formatting;
    private addTableClass;
    private setImageProperties;
    private addTempClass;
    private removeTempClass;
    private sanitizeHelper;
    private plainFormatting;
    private getTextContent;
    private detachInlineElements;
    private findDetachEmptyElem;
    private removeEmptyElements;
    private tagGrouping;
    private attributesfilter;
    private deniedTags;
    private deniedAttributes;
    private allowedStyle;
    /**
     * For internal use only - Get the module name.
     *
     * @returns {void}
     * @hidden
     */
    private getModuleName;
}
