import { PdfViewer } from '../index';
import { PdfViewerBase } from '../index';
/**
 * The `FormFields` module is to render formfields in the PDF document.
 *
 * @hidden
 */
export declare class FormFields {
    private pdfViewer;
    private pdfViewerBase;
    private maxTabIndex;
    private minTabIndex;
    private maintainTabIndex;
    private maintanMinTabindex;
    private isSignatureField;
    private paddingDifferenceValue;
    private indicatorPaddingValue;
    private isKeyDownCheck;
    private signatureFontSizeConstent;
    /**
     * @private
     */
    readOnlyCollection: any;
    /**
     * @private
     */
    currentTarget: any;
    private isSignatureRendered;
    /**
     * @private
     */
    signatureFieldCollection: any;
    private data;
    private formFieldsData;
    private rotateAngle;
    private selectedIndex;
    /**
     * @private
     */
    renderedPageList: number[];
    /**
     * @param viewer
     * @param base
     * @param viewer
     * @param base
     * @private
     */
    constructor(viewer: PdfViewer, base: PdfViewerBase);
    /**
     * @param pageIndex
     * @private
     */
    renderFormFields(pageIndex: number, isImportFormField: boolean): void;
    private setToolTip;
    private trim;
    private rgbaToHex;
    private getListValues;
    private createParentElement;
    /**
     * @private
     */
    getAngle(pageIndex: number): number;
    nextField(): void;
    previousField(): void;
    private signatureFieldNavigate;
    private getSignatureIndex;
    private renderSignatureField;
    /**
     * @private
     */
    setFocus(id?: string): void;
    /**
     * @private
     */
    removeFocus(): void;
    private getSignField;
    private getFormFieldSignField;
    /**
     * @private
     */
    formFieldCollections(): void;
    private retreiveFormFieldsData;
    /**
     * @param formField
     * @private
     */
    updateFormFieldsCollection(formField: any): void;
    updateFormFieldValues(formFields: any): void;
    /**
     * @param currentData
     * @private
     */
    retriveFieldName(currentData: any): string;
    private retriveCurrentValue;
    private getSignatureBounds;
    /**
     * @private
     */
    downloadFormFieldsData(): any;
    private focusFormFields;
    private blurFormFields;
    updateFormFields(event: MouseEvent): void;
    /**
     * @param signatureType
     * @param value
     * @param target
     * @param fontname
     * @param signatureType
     * @param value
     * @param target
     * @param fontname
     * @private
     */
    drawSignature(signatureType?: string, value?: string, target?: any, fontname?: string): void;
    private imageOnLoad;
    private updateSignatureDataInSession;
    /**
     * @private
     */
    getDefaultBoundsforSign(bounds: any): any;
    /**
     * @private
      */
    getSignBounds(currentIndex: number, rotateAngle: number, currentPage: number, zoomvalue: number, currentLeft: number, currentTop: number, currentWidth: number, currentHeight: number, isDraw?: boolean): any;
    private updateSameFieldsValue;
    private updateFormFieldsValue;
    private changeFormFields;
    private calculateSignatureBounds;
    /**
     * @param data
     * @param isSignature
     * @param currentField
     * @param data
     * @param isSignature
     * @param currentField
     * @param data
     * @param isSignature
     * @param currentField
     * @private
     */
    updateSignatureAspectRatio(data: any, isSignature?: boolean, currentField?: any, currentData?: any): any;
    /**
     * @param target
     * @param signaturePath
     * @param signatureBounds
     * @param signatureFontFamily
     * @param signatureFontSize
     * @param target
     * @param signaturePath
     * @param signatureBounds
     * @param signatureFontFamily
     * @param signatureFontSize
     * @param target
     * @param signaturePath
     * @param signatureBounds
     * @param signatureFontFamily
     * @param signatureFontSize
     * @param target
     * @param signaturePath
     * @param signatureBounds
     * @param signatureFontFamily
     * @param signatureFontSize
     * @param target
     * @param signaturePath
     * @param signatureBounds
     * @param signatureFontFamily
     * @param signatureFontSize
     * @private
     */
    updateDataInSession(target: any, signaturePath?: any, signatureBounds?: any, signatureFontFamily?: string, signatureFontSize?: Number): void;
    /**
     * @private
     */
    removeExistingFormFields(): void;
    private applyCommonProperties;
    /**
     * @param currentData
     * @param pageIndex
     * @param index
     * @param printContainer
     * @param currentData
     * @param pageIndex
     * @param index
     * @param printContainer
     * @private
     */
    createFormFields(currentData: any, pageIndex: number, index?: number, printContainer?: any, count?: number): any;
    private getFormFieldType;
    private createButtonField;
    /**
     * Returns the boolean value based on the imgae source base64
     *
     * @param {string} imageSrc - Passing the image source.
     *
     * @returns {boolean}
     */
    private isBase64;
    /**
     * Returns the boolean value based on the imgae source URL
     *
     * @param {string} imageSrc - Passing the image source.
     *
     * @returns {boolean}
     */
    private isURL;
    private createTextBoxField;
    private checkIsReadonly;
    /**
     * @param isReadonly
     * @private
     */
    formFieldsReadOnly(isReadonly: boolean): void;
    private makeformFieldsReadonly;
    private applyTabIndex;
    private checkIsRequiredField;
    private applyDefaultColor;
    private addAlignmentPropety;
    private addBorderStylePropety;
    private createRadioBoxField;
    private createDropDownField;
    private createListBoxField;
    private createSignatureField;
    private addSignaturePath;
    private getBounds;
    private getBoundsPosition;
    private applyPosition;
    private renderExistingAnnnot;
    /**
     * @private
     */
    updateSignatureBounds(bound: any, pageIndex: number, isFieldRotated: boolean): any;
    resetFormFields(): void;
    /**
     * @private
     */
    clearFormFieldStorage(): void;
    clearFormFields(formField?: any): void;
    /**
     * @param number
     * @private
     */
    ConvertPointToPixel(number: any): any;
    /**
     * @private
     */
    destroy(): void;
    /**
     * @private
     */
    getModuleName(): string;
    /**
     * @private
     * Get the text wdith
     * @param text
     * @param font
     * @param fontFamily
    */
    getTextWidth(text: any, font: any, fontFamily: any): number;
    /**
     * @private
     * @param {number} fontSize - Font size.
     * @returns {number} - Returns the font size.
    */
    getFontSize(fontSize: number): number;
}
