import { Popup } from '@syncfusion/ej2-popups';
import { IRichTextEditor } from '../base/interface';
import { IToolbarItems, IQuickToolbarOptions } from '../base/interface';
import { ServiceLocator } from '../services/service-locator';
import { BaseToolbar } from './base-toolbar';
import { RichTextEditorModel } from '../base/rich-text-editor-model';
/**
 * `Quick toolbar` module is used to handle Quick toolbar actions.
 */
export declare class BaseQuickToolbar {
    popupObj: Popup;
    element: HTMLElement;
    private isDOMElement;
    quickTBarObj: BaseToolbar;
    private stringItems;
    private dropDownButtons;
    private colorPickerObj;
    private locator;
    private parent;
    private contentRenderer;
    private popupRenderer;
    toolbarElement: HTMLElement;
    private renderFactory;
    private tooltip;
    constructor(parent?: IRichTextEditor, locator?: ServiceLocator);
    private appendPopupContent;
    /**
     * render method
     *
     * @param {IQuickToolbarOptions} args - specifies the arguments
     * @returns {void}
     * @hidden

     */
    render(args: IQuickToolbarOptions): void;
    private createToolbar;
    private setPosition;
    private checkCollision;
    /**
     * showPopup method
     *
     * @param {number} x - specifies the x value
     * @param {number} y - specifies the y value
     * @param {Element} target - specifies the element
     * @returns {void}
     * @hidden

     */
    showPopup(x: number, y: number, target: Element): void;
    /**
     * hidePopup method
     *
     * @returns {void}
     * @hidden

     */
    hidePopup(): void;
    /**
     * @param {string} item - specifies the string value
     * @param {number} index - specifies the index value
     * @returns {void}
     * @hidden

     */
    addQTBarItem(item: (string | IToolbarItems)[], index: number): void;
    /**
     * @param {number} index - specifies the index value
     * @returns {void}
     * @hidden

     */
    removeQTBarItem(index: number | HTMLElement[] | Element[]): void;
    private removeEleFromDOM;
    private updateStatus;
    /**
     * Destroys the Quick toolbar.
     *
     * @function destroy
     * @returns {void}
     * @hidden

     */
    destroy(): void;
    /**
     * addEventListener method
     *
     * @returns {void}
     * @hidden

     */
    addEventListener(): void;
    /**
     * Called internally if any of the property value changed.
     *
     * @param {RichTextEditorModel} e - specifies the model element
     * @returns {void}
     * @hidden

     */
    protected onPropertyChanged(e: {
        [key: string]: RichTextEditorModel;
    }): void;
    /**
     * removeEventListener method
     *
     * @returns {void}
     * @hidden

     */
    removeEventListener(): void;
}
