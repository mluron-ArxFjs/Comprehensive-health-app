import { DrawingElement, PointModel } from "@syncfusion/ej2-drawings";
import { PdfFormFieldBaseModel, PdfFontModel } from "../drawing";
import { DiagramHtmlElement } from "../drawing/html-element";
import { PdfAnnotationBaseModel, PdfViewer, PdfViewerBase } from "../index";
import { CheckBoxFieldSettings, DropdownFieldSettings, PasswordFieldSettings, Item, ListBoxFieldSettings, RadioButtonFieldSettings, SignatureFieldSettings, TextFieldSettings, InitialFieldSettings } from "../pdfviewer";
import { ItemModel } from "../pdfviewer-model";
import { FormFieldType } from '../base/types';
/**
 * The `FormDesigner` module is used to handle form designer actions of PDF viewer.
 */
export declare class FormDesigner {
    private data;
    private formFieldsData;
    private pdfViewer;
    private pdfViewerBase;
    private isFormFieldExistingInCollection;
    private propertiesDialog;
    private tabControl;
    private formFieldName;
    private formFieldTooltip;
    private formFieldValue;
    private formFieldVisibility;
    private formFieldReadOnly;
    private formFieldChecked;
    private formFieldRequired;
    private formFieldPrinting;
    private formFieldMultiline;
    private formFieldFontFamily;
    private formFieldFontSize;
    private maxLengthItem;
    private fontColorDropDown;
    private fontColorPalette;
    private fontColorElement;
    private colorDropDownElement;
    private colorPalette;
    private colorDropDown;
    private strokeDropDownElement;
    private strokeColorPicker;
    private strokeDropDown;
    private thicknessElement;
    private thicknessDropDown;
    private thicknessSlider;
    private thicknessIndicator;
    private formFieldListItem;
    private formFieldAddButton;
    private formFieldDeleteButton;
    private formFieldUpButton;
    private formFieldDownButton;
    private isBold;
    private isItalic;
    private isUnderline;
    private isStrikeThrough;
    private formFieldBold;
    private formFieldItalic;
    private formFieldUnderline;
    private formFieldStrikeOut;
    private formFieldAlign;
    private fontColorValue;
    private backgroundColorValue;
    private borderColorValue;
    private formFieldBorderWidth;
    private checkboxCheckedState;
    private multilineCheckboxCheckedState;
    private formFieldListItemCollection;
    private formFieldListItemDataSource;
    private isInitialField;
    private isSetFormFieldMode;
    private increasedSize;
    private defaultZoomValue;
    private signatureFieldPropertyChanged;
    private initialFieldPropertyChanged;
    private textFieldPropertyChanged;
    private passwordFieldPropertyChanged;
    private checkBoxFieldPropertyChanged;
    private radioButtonFieldPropertyChanged;
    private dropdownFieldPropertyChanged;
    private listBoxFieldPropertyChanged;
    /**
     * @private
     */
    disableSignatureClickEvent: boolean;
    /**
     * @private
     */
    formFieldIndex: number;
    /**
     * @private
     */
    formFieldIdIndex: number;
    /**
     * @private
     */
    isProgrammaticSelection: boolean;
    /**
     * @private
    */
    isShapeCopied: boolean;
    private isDrawHelper;
    private isFormFieldUpdated;
    /**
    * @param viewer
    * @param base
    * @private
    */
    constructor(viewer: PdfViewer, base: PdfViewerBase);
    /**
     * @private
     */
    isPropertyDialogOpen: boolean;
    /**
     * @private
     */
    drawHelper(formFieldAnnotationType: string, obj: PdfFormFieldBaseModel, event: Event): void;
    /**
     * @private
     */
    drawHTMLContent(formFieldAnnotationType: string, element: DiagramHtmlElement, drawingObject: PdfFormFieldBaseModel, pageIndex?: number, commandHandler?: PdfViewer, fieldId?: string): HTMLElement;
    /**
     * @private
    */
    updateFormDesignerFieldInSessionStorage(point: PointModel, element: DiagramHtmlElement, formFieldType: string, drawingObject?: PdfFormFieldBaseModel): void;
    private getRadioButtonItem;
    private getRgbCode;
    /**
     * @param colour
     * @private
     */
    nameToHash(colour: string): string;
    /**
     * @param value
     * @param type
     * @param value
     * @param type
     * @private
     */
    getValue(value?: string, type?: string): string;
    private convertRgbToNumberArray;
    private convertToRgbString;
    private convertToHsvString;
    private roundValue;
    private hexToRgb;
    private rgbToHsv;
    private hsvToRgb;
    private rgbToHex;
    /**
     * @private
     */
    updateCanvas(pageNumber: number, canvas?: HTMLElement): void;
    /**
     * @private
    */
    rerenderFormFields(pageIndex: number): void;
    private renderFormFieldsInZooming;
    /**
     * @private
     */
    updateFormFieldInitialSize(obj: DrawingElement, formFieldAnnotationType: string): any;
    /**
     * @private
    */
    updateHTMLElement(actualObject: PdfAnnotationBaseModel): void;
    private getCheckboxRadioButtonBounds;
    private updateSessionFormFieldProperties;
    /**
     * @private
     */
    createSignatureDialog(commandHandler: any, signatureField: any, bounds?: any, isPrint?: boolean): HTMLElement;
    private setIndicatorText;
    private getBounds;
    private updateSignatureandInitialIndicator;
    private setHeightWidth;
    /**
     * @private
     */
    createDropDownList(dropdownElement: DiagramHtmlElement, drawingObject: PdfFormFieldBaseModel, isPrint?: boolean): HTMLElement;
    /**
     * @private
     */
    createListBox(listBoxElement: DiagramHtmlElement, drawingObject: PdfFormFieldBaseModel, isPrint?: boolean): HTMLElement;
    /**
     * @private
     */
    createInputElement(formFieldAnnotationType: string, drawingObject: PdfFormFieldBaseModel, formFieldBounds?: any, isPrint?: boolean): HTMLElement;
    private listBoxChange;
    private dropdownChange;
    setCheckBoxState(event: Event): void;
    private setCheckedValue;
    private setRadioButtonState;
    private getTextboxValue;
    private inputElementClick;
    private updateFormFieldSessions;
    focusFormFields(event: any): void;
    blurFormFields(event: any): void;
    private setTextBoxFontStyle;
    /**
     * Adds form field to the PDF page.
     *
     * @param formFieldType
     * @param options
     * @returns HTMLElement
     */
    addFormField(formFieldType: FormFieldType, options?: TextFieldSettings | PasswordFieldSettings | CheckBoxFieldSettings | DropdownFieldSettings | RadioButtonFieldSettings | ListBoxFieldSettings | SignatureFieldSettings | InitialFieldSettings, isCollection?: boolean, id?: string): HTMLElement;
    addFieldCollection(node: any): void;
    /**
     * @private
     */
    drawFormField(obj: PdfFormFieldBaseModel): HTMLElement;
    /**
    * Update the node value based on the collections
    *
    * @param node
    * @param data
    * @returns void
    */
    private updateNodeBasedOnCollections;
    /**
     * Set the form field mode to add the form field on user interaction.
     *
     * @param formFieldId
     * @param options
     * @returns void
     */
    setFormFieldMode(formFieldType: FormFieldType, options?: Item[]): void;
    /**
     * Reset the form fields into its original state.
     *
     * @param formFieldId
     * @returns void
     */
    resetFormField(formFieldId: string | object): void;
    /**
     * Select the form field in the PDF Viewer.
     *
     * @param formFieldId
     * @returns void
     */
    selectFormField(formFieldId: string | object): void;
    /**
     * Update the form field with the given properties and value.
     *
     * @param formFieldId
     * @param options
     * @returns void
     */
    updateFormField(formFieldId: string | object, options: TextFieldSettings | PasswordFieldSettings | CheckBoxFieldSettings | DropdownFieldSettings | RadioButtonFieldSettings | SignatureFieldSettings | InitialFieldSettings): void;
    /**
    * Update the form field in the form field collections.
    * @param formFieldId
    * @param options
    * @returns void
    */
    private updateFormFieldsInCollections;
    /**
    * Update the form field data based on the value
    * @param currentData
    * @param options
    * @returns void
    */
    private updateFormFieldData;
    /**
     * @private
     */
    getSignatureBackground(color: string): string;
    private formFieldPropertyChange;
    private colorNametoHashValue;
    /**
     * @private
     */
    getFormField(formFieldId: string | object): PdfFormFieldBaseModel;
    private resetTextboxProperties;
    private resetPasswordProperties;
    private resetCheckboxProperties;
    private resetRadioButtonProperties;
    private resetDropdownListProperties;
    private resetListBoxProperties;
    private resetSignatureTextboxProperties;
    /**
     * Deletes the form field from the PDF page.
     *
     * @param formFieldId
     * @param addAction
     * @returns void
     */
    deleteFormField(formFieldId: string | object, addAction?: boolean): void;
    /**
     * Clears the selection of the form field in the PDF page.
     *
     * @param formFieldId
     * @returns void
     */
    clearSelection(formFieldId: string | object): void;
    /**
     * @private
     */
    setMode(mode: string): void;
    private enableDisableFormFieldsInteraction;
    private getAnnotationsFromAnnotationCollections;
    /**
     * @private
     */
    updateSignatureValue(formFieldId: string): void;
    /**
     * @private
     */
    removeFieldsFromAnnotationCollections(annotationId: string): any;
    /**
     * @private
    */
    setFormFieldIndex(): number;
    private setFormFieldIdIndex;
    private activateTextboxElement;
    private activatePasswordField;
    private activateCheckboxElement;
    private activateRadioButtonElement;
    private activateDropDownListElement;
    private activateListboxElement;
    private activateSignatureBoxElement;
    /**
     * @private
    */
    updateTextboxProperties(obj: PdfFormFieldBaseModel, inputElement: HTMLElement, isPrint?: boolean): void;
    /**
     * @private
    */
    updatePasswordFieldProperties(obj: PdfFormFieldBaseModel, inputElement: HTMLElement, isPrint?: boolean): void;
    /**
     * @private
    */
    updateCheckboxProperties(obj: PdfFormFieldBaseModel, inputElement: HTMLElement): void;
    /**
     * @private
    */
    updateRadioButtonProperties(obj: PdfFormFieldBaseModel, inputElement: HTMLElement): void;
    /**
     * @private
    */
    updateDropdownListProperties(obj: PdfFormFieldBaseModel, inputElement: HTMLElement, isPrint?: boolean): void;
    /**
     * @private
    */
    updateListBoxProperties(obj: PdfFormFieldBaseModel, inputElement: HTMLElement, isPrint?: boolean): void;
    /**
     * @private
    */
    updateSignatureFieldProperties(obj: PdfFormFieldBaseModel, inputElement: HTMLElement, isPrint?: boolean): void;
    /**
     * @private
     */
    createHtmlElement(elementType: string, attribute: Object): HTMLElement;
    private setAttributeHtml;
    private applyStyleAgainstCsp;
    private getFieldBounds;
    /**
     * @private
     */
    downloadFormDesigner(): string;
    /**
     * @private
    */
    private loadedFormFieldValue;
    /**
     * @private
     */
    createAnnotationLayer(pageDiv: HTMLElement, pageWidth: number, pageHeight: number, pageNumber: number, displayMode: string): HTMLElement;
    /**
     * @private
    */
    resizeAnnotations(width: number, height: number, pageNumber: number): void;
    /**
     * @private
    */
    getEventPageNumber(event: Event): number;
    private getPropertyPanelHeaderContent;
    /**
     * @private
    */
    createPropertiesWindow(): void;
    private onOkClicked;
    /**
     * Update the form fields properties to the collection while rendering the page
    */
    private updateFormFieldPropertiesInCollections;
    private checkTextboxName;
    renderMultilineText(selectedItem: PdfFormFieldBaseModel, isUndoRedo?: boolean): void;
    renderTextbox(selectedItem: PdfFormFieldBaseModel, isUndoRedo?: boolean): void;
    private addMultilineTextbox;
    private reRenderMultilineTextbox;
    private createTextAreaElement;
    private createTextboxElement;
    /**
     * @private
     */
    updateFormFieldCollections(formFieldObject: PdfFormFieldBaseModel): void;
    /**
    * Get the Hex value from the RGB value.
    */
    private getRgbToHex;
    /**
     * @private
     */
    updateDropdownFormDesignerProperties(selectedItem: PdfFormFieldBaseModel, isUndoRedo?: boolean): void;
    /**
     * @private
     */
    updateListBoxFormDesignerProperties(selectedItem: PdfFormFieldBaseModel, isUndoRedo?: boolean): void;
    private updateDropDownListDataSource;
    private createDropdownDataSource;
    /**
     * @private
     */
    updateSignatureTextboxProperties(selectedItem: PdfFormFieldBaseModel, isUndoRedo?: boolean): void;
    /**
     * @private
     */
    updateCheckboxFormDesignerProperties(selectedItem: PdfFormFieldBaseModel, updateValue?: boolean, isUndoRedo?: boolean): void;
    /**
     * @private
     */
    updateRadioButtonDesignerProperties(selectedItem: PdfFormFieldBaseModel, updateValue?: boolean, isUndoRedo?: boolean): void;
    /**
     * @private
     */
    updateTextboxFormDesignerProperties(selectedItem: PdfFormFieldBaseModel, isUndoRedo?: boolean): void;
    /**
     * @private
     */
    updateIsCheckedPropertyChange(selectedItem: any, element: any, isUndoRedo: boolean, index: number, formFieldsData: any): void;
    /**
    * @private
    */
    updateIsSelectedPropertyChange(selectedItem: any, element: any, isUndoRedo: boolean, index: number, formFieldsData: any): void;
    /**
     * @private
     */
    updateValuePropertyChange(selectedItem: any, element: any, isUndoRedo: boolean, index: number, formFieldsData: any, updateValue?: boolean): void;
    private updateFontStylePropertyChange;
    private updateBorderThicknessPropertyChange;
    private updateBorderColorPropertyChange;
    private updateBackgroundColorPropertyChange;
    private updateColorPropertyChange;
    private updateAlignmentPropertyChange;
    private updateFontSizePropertyChange;
    private updateFontFamilyPropertyChange;
    private updateVisibilityPropertyChange;
    private hideSignatureValue;
    private showSignatureValue;
    private updateTooltipPropertyChange;
    private updateNamePropertyChange;
    private updateIsReadOnlyPropertyChange;
    private updateIsRequiredPropertyChange;
    private updateIsPrintPropertyChange;
    /**
     * @private
     */
    getFormFiledIndex(id: any): number;
    private updateFontStyle;
    private setFontStyleValues;
    private setDropdownFontStyleValue;
    /**
     * @private
     */
    updateFormFieldPropertiesChanges(name: string, selectedItem: PdfFormFieldBaseModel, isValueChanged: boolean, isFontFamilyChanged: boolean, isFontSizeChanged: boolean, isFontStyleChanged: boolean, isColorChanged: boolean, isBackgroundColorChanged: boolean, isBorderColorChanged: boolean, isBorderWidthChanged: boolean, isAlignmentChanged: boolean, isReadOnlyChanged: boolean, isVisibilityChanged: boolean, isMaxLengthChanged: boolean, isRequiredChanged: boolean, isPrintChanged: boolean, isToolTipChanged: boolean, oldValue: any, newValue: any, isNamechanged?: boolean, previousName?: string): void;
    private onCancelClicked;
    private createAppearanceTab;
    private createGeneralProperties;
    private checkBoxChange;
    private multilineCheckboxChange;
    private setToolTip;
    private tooltipBeforeOpen;
    private createAppearanceProperties;
    private thicknessChange;
    private thicknessDropDownBeforeOpen;
    private updateThicknessIndicator;
    private createOptionProperties;
    private addListItemOnClick;
    private listItemOnClick;
    private deleteListItem;
    private moveUpListItem;
    private moveDownListItem;
    private createListElement;
    private createThicknessSlider;
    private createColorPicker;
    private fontStyleClicked;
    private clearFontAlignIconSelection;
    private fontAlignClicked;
    private onFontColorChange;
    private onColorPickerChange;
    /**
     * @private
     */
    updateColorInIcon(element: HTMLElement, color: string): void;
    private onStrokePickerChange;
    private createDropDownButton;
    /**
     * @private
    */
    addClassFontItem(idString: string, className: string, isSelectedStyle?: boolean): HTMLElement;
    private createLabelElement;
    private setReadOnlyToFormField;
    /**
     * @private
    */
    getFormDesignerSignField(signatureFieldCollection: any): any[];
    private setRequiredToFormField;
    private setReadOnlyToElement;
    private setRequiredToElement;
    /**
     * @private
    */
    destroyPropertiesWindow(): void;
    /**
     * @private
    */
    destroy(): void;
    private hex;
    /**
     * @private
    */
    getModuleName(): string;
    private updateAnnotationCanvas;
    private getFontFamily;
    private updateTextFieldSettingProperties;
    private updatePasswordFieldSettingProperties;
    private updateCheckBoxFieldSettingsProperties;
    private updateRadioButtonFieldSettingProperties;
    private updateDropdownFieldSettingsProperties;
    private updatelistBoxFieldSettingsProperties;
    private updateSignInitialFieldProperties;
    /**
     * @private
     */
    updateSignatureSettings(newSignatureFieldSettings: any, isInitialField: boolean): void;
    /**
     * @private
     */
    updateTextFieldSettings(textFieldSettings: any): void;
    /**
     * @private
     */
    updatePasswordFieldSettings(passwordFieldSettings: any): void;
    /**
     * @private
     */
    updateCheckBoxFieldSettings(checkBoxFieldSettings: any): void;
    /**
     * @private
     */
    updateRadioButtonFieldSettings(radioButtonFieldSettings: any): void;
    /**
     * @private
     */
    updateDropDownFieldSettings(dropdownFieldSettings: any): void;
    /**
     * @private
     */
    updateListBoxFieldSettings(listBoxFieldSettings: any): void;
    private getFontStyleName;
    private getAlignment;
    private getFontStyle;
}
/**
 * Defines the common properties of Radiobutton Item
 *
 * @hidden
 */
export interface IRadiobuttonItem {
    id: string;
    lineBound: IFormFieldBound;
    pageNumber: number;
    formFieldAnnotationType: string;
    name: string;
    value: string;
    fontFamily: string;
    fontSize: number;
    fontStyle: string;
    fontColor: any;
    backgroundColor: any;
    textAlign: string;
    isReadonly: boolean;
    visibility: string;
    maxLength: number;
    isRequired: boolean;
    isPrint: boolean;
    rotation: number;
    tooltip: string;
    isChecked: boolean;
    isSelected: boolean;
    zoomValue: number;
    borderColor?: any;
    thickness?: number;
}
/**
 * Defines the common properties of Form Fields Item
 *
 * @hidden
 */
export interface IFormField {
    id?: string;
    lineBound?: IFormFieldBound;
    pageNumber?: number;
    zoomValue?: number;
    formFieldAnnotationType?: string;
    name?: string;
    value?: string;
    option?: ItemModel[];
    fontFamily?: string;
    fontSize?: number;
    fontStyle?: string;
    fontColor?: any;
    color?: any;
    backgroundColor: any;
    textAlign?: string;
    alignment?: string;
    isReadonly?: boolean;
    visibility?: string;
    maxLength?: number;
    isRequired?: boolean;
    isMultiline?: boolean;
    isPrint?: boolean;
    rotation?: number;
    tooltip?: string;
    isChecked?: boolean;
    isSelected?: boolean;
    radiobuttonItem?: IRadiobuttonItem[];
    selectedIndex?: number[];
    options?: ItemModel[];
    borderColor?: any;
    thickness?: number;
    font?: PdfFontModel;
    signatureBound?: any;
    signatureType?: string;
    type?: string;
    currentName?: string;
    previousName?: string;
    insertSpaces?: boolean;
}
/**
 * Defines the FormFields Bound properties
 *
 * @hidden
 */
export interface IFormFieldBound {
    X: number;
    Y: number;
    Width: number;
    Height: number;
}
/**
 * Defines the FormFields element attributes
 *
 * @hidden
 */
export interface IElement extends HTMLElement {
    options: any;
    name: string;
    value: string;
    checked: boolean;
    selectedIndex: number;
    selectedOptions: any;
    autocomplete: string;
    type: string;
}
