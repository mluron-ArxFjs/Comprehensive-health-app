import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
import { IRenderer, IRichTextEditor, IToolbarOptions, IDropDownModel, IColorPickerModel } from '../base/interface';
import { ColorPicker } from '@syncfusion/ej2-inputs';
/**
 * `Toolbar renderer` module is used to render toolbar in RichTextEditor.
 *
 * @hidden

 */
export declare class ToolbarRenderer implements IRenderer {
    private mode;
    private toolbarPanel;
    /**
     *
     * @hidden
     * @private
     */
    parent: IRichTextEditor;
    private popupContainer;
    private currentElement;
    private currentDropdown;
    private popupOverlay;
    private tooltip;
    /**
     * Constructor for toolbar renderer module
     *
     * @param {IRichTextEditor} parent - specifies the parent element.
     */
    constructor(parent?: IRichTextEditor);
    private wireEvent;
    private destroyTooltip;
    private unWireEvent;
    private toolbarBeforeCreate;
    private toolbarCreated;
    private toolbarClicked;
    private dropDownSelected;
    private beforeDropDownItemRender;
    private dropDownOpen;
    private dropDownClose;
    private removePopupContainer;
    /**
     * renderToolbar method
     *
     * @param {IToolbarOptions} args - specifies the arguments.
     * @returns {void}
     * @hidden

     */
    renderToolbar(args: IToolbarOptions): void;
    /**
     * renderDropDownButton method
     *
     * @param {IDropDownModel} args - specifies the the arguments.
     * @returns {void}
     * @hidden

     */
    renderDropDownButton(args: IDropDownModel): DropDownButton;
    /**
     * renderListDropDown method
     *
     * @param {IDropDownModel} args - specifies the the arguments.
     * @returns {void}
     * @hidden

     */
    renderListDropDown(args: IDropDownModel): DropDownButton;
    private onPopupOverlay;
    private setIsModel;
    private paletteSelection;
    /**
     * renderColorPickerDropDown method
     *
     * @param {IColorPickerModel} args - specifies the arguments.
     * @param {string} item - specifies the item.
     * @param {ColorPicker} colorPicker - specifies the colorpicker.
     * @param {string} defaultColor -specifies the defaultColor.
     * @returns {void}
     * @hidden

     */
    renderColorPickerDropDown(args: IColorPickerModel, item: string, colorPicker: ColorPicker, defaultColor: string): DropDownButton;
    private pickerRefresh;
    private popupModal;
    private setColorPickerContentWidth;
    /**
     * renderColorPicker method
     *
     * @param {IColorPickerModel} args - specifies the arguments
     * @param {string} item - specifies the string values
     * @returns {void}
     * @hidden

     */
    renderColorPicker(args: IColorPickerModel, item: string): ColorPicker;
    /**
     * The function is used to render Rich Text Editor toolbar
     *
     * @returns {void}
     * @hidden

     */
    renderPanel(): void;
    /**
     * Get the toolbar element of RichTextEditor
     *
     * @returns {Element} - specifies the element.
     * @hidden

     */
    getPanel(): Element;
    /**
     * Set the toolbar element of RichTextEditor
     *
     * @returns {void}
     * @param  {Element} panel - specifies the element.
     * @hidden

     */
    setPanel(panel: Element): void;
}
