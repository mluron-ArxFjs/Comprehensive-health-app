import { PdfViewer } from '../index';
import { PdfViewerBase } from '../index';
import { Dialog } from '@syncfusion/ej2-popups';
/**
 * @hidden
 */
export interface ISignAnnotation {
    strokeColor: string;
    opacity: number;
    bounds: IRectCollection;
    pageIndex: number;
    shapeAnnotationType: string;
    thickness: number;
    id: string;
    data: string;
    signatureName: string;
    fontFamily?: string;
    fontSize?: string;
}
/**
 * @hidden
 */
interface IRectCollection {
    left: number;
    top: number;
    width: number;
    height: number;
}
/**
 * @hidden
 */
export declare class Signature {
    private pdfViewer;
    private pdfViewerBase;
    private mouseDetection;
    private mouseMoving;
    private canvasTouched;
    private signatureImageWidth;
    private signatureImageHeight;
    private oldX;
    private mouseX;
    private oldY;
    private mouseY;
    private imageSignatureDataUrl;
    private drawSignatureDataUrl;
    private newObject;
    /**
     * @private
     */
    outputString: string;
    /**
     * @private
     */
    drawOutputString: string;
    /**
    * @private
    */
    imageOutputString: string;
    /**
     * @private
     */
    signatureDialog: Dialog;
    /**
     * @private
     */
    signaturecollection: any;
    /**
     * @private
     */
    outputcollection: any;
    /**
     * @private
     */
    signAnnotationIndex: any;
    /**
     * @private
    */
    fontName: string;
    private fontsign;
    private signfontStyle;
    private signtypevalue;
    private signfont;
    private signHeight;
    private signWidth;
    private signaturetype;
    private tabObj;
    private isSaveSignature;
    private isSaveInitial;
    private isInitialFiledSaveSignature;
    private isSignatureFieldsSaveSignature;
    private issaveTypeSignature;
    private issaveImageSignature;
    private issaveTypeInitial;
    private issaveImageInitial;
    private saveSignatureTypeString;
    private saveInitialTypeString;
    private saveTypeString;
    private signatureTypeString;
    private initialTypeString;
    private saveUploadString;
    private saveSignatureUploadString;
    private saveInitialUploadString;
    private signatureUploadString;
    private initialUploadString;
    private clearUploadString;
    private textValue;
    private signatureDrawString;
    private initialDrawString;
    private signatureTextContentTop;
    private signatureTextContentLeft;
    private saveSignatureString;
    private saveInitialString;
    /**
     * @private
     */
    saveImageString: string;
    private signatureImageString;
    private initialImageString;
    /**
     * @private
     */
    maxSaveLimit: number;
    /**
     * Initialize the constructor of blazorUIadapater.
     * @private
     * @param { PdfViewer } pdfViewer - Specified PdfViewer class.
     * @param { PdfViewerBase } pdfViewerBase - The pdfViewerBase.
     */
    constructor(pdfViewer: PdfViewer, pdfViewerBase: PdfViewerBase);
    /**
     * @private
     * @returns {void}
     */
    createSignaturePanel(): void;
    private drawSavedSignature;
    private drawSavedTypeSignature;
    private drawSavedImageSignature;
    private hideSignatureCheckbox;
    private saveSignatureCheckbox;
    private hideCheckboxParent;
    private saveSignatureImage;
    /**
     * @param type
     * @private
     */
    addSignature(type?: any): void;
    private checkSaveFiledSign;
    private addSignatureInPage;
    private typeAddSignature;
    private imageAddSignature;
    private saveDrawSignature;
    private saveTypeSignature;
    private saveUploadSignature;
    private updateSignatureTypeValue;
    /**
     * @private
     * @returns {void}
     */
    hideSignaturePanel(): void;
    private bindTypeSignatureClickEvent;
    private bindDrawSignatureClickEvent;
    private typeSignatureclicked;
    private createSignatureCanvas;
    private select;
    private handleSelectEvent;
    private enableCreateSignatureButton;
    private showHideSignatureTab;
    /**
     * @private
     * @returns {void}
     */
    createSignatureFileElement(): void;
    private uploadSignatureImage;
    private addStampImage;
    private renderSignatureText;
    private typeSignatureclick;
    /**
     * @param bounds
     * @param position
     * @private
     */
    addSignatureCollection(bounds?: any, position?: any): void;
    /**
     * @private]
     * @param {number} limit - The limit.
     * @returns {number} - Returns number.
     */
    getSaveLimit(limit: number): number;
    /**
     * @private
     * @returns {void}
     */
    RenderSavedSignature(): void;
    /**
     * @private
     * @returns {void}
     */
    updateCanvasSize(): void;
    private setTabItemWidth;
    private drawSignOnTabSwitch;
    private imageSignOnTabSwitch;
    private signaturePanelMouseDown;
    private enableCreateButton;
    private enableClearbutton;
    private signaturePanelMouseMove;
    private findMousePosition;
    private drawMousePosition;
    private drawSignatureInCanvas;
    private signaturePanelMouseUp;
    private signaturePanelMouseLeave;
    private convertToPath;
    private linePath;
    private movePath;
    /**
     * @private
     * @returns {void}
     */
    clearSignatureCanvas(type?: any): void;
    /**
     * @private
     * @returns {void}
     */
    closeSignaturePanel(): void;
    /**
     * @private
     * @returns {string} - Returns the string.
     */
    saveSignature(): string;
    private checkDefaultFont;
    /**
     * @param colorString
     * @private
     */
    getRgbCode(colorString: string): any;
    /**
     * @private
     * @param {number} left - The left.
     * @param {number} top - The top.
     * @returns {void}
     */
    renderSignature(left: number, top: number): void;
    /**
     * @param annotationCollection
     * @param pageIndex
     * @param isImport
     * @private
     */
    renderExistingSignature(annotationCollection: any, pageIndex: number, isImport: boolean): void;
    /**
     * @param pageNumber
     * @param annotations
     * @private
     */
    storeSignatureData(pageNumber: number, annotations: any): void;
    /**
     * @param property
     * @param pageNumber
     * @param annotationBase
     * @param isSignatureEdited
     * @private
     */
    modifySignatureCollection(property: string, pageNumber: number, annotationBase: any, isSignatureEdited?: boolean): ISignAnnotation;
    /**
     * @param annotation
     * @param pageNumber
     * @private
     */
    storeSignatureCollections(annotation: any, pageNumber: number): void;
    private checkSignatureCollection;
    /**
     * @param signature
     * @private
     */
    updateSignatureCollection(signature: any): void;
    /**
     * @param pageNumber
     * @param signature
     * @private
     */
    addInCollection(pageNumber: number, signature: any): void;
    private getAnnotations;
    private manageAnnotations;
    /**
     * @private
     * @param {boolean} isShow - Returns the true or false.
     * @returns {void}
     */
    showSignatureDialog(isShow: boolean): void;
    /**
     * @private
     * @returns {void}
     */
    setAnnotationMode(): void;
    /**
     * @private
     * @returns {void}
     */
    setInitialMode(): void;
    /**
     * @param number
     * @private
     */
    ConvertPointToPixel(number: any): any;
    /**
     * @param signature
     * @param pageIndex
     * @param isImport
     * @private
     */
    updateSignatureCollections(signature: any, pageIndex: number, isImport?: boolean): any;
    /**
     * @private
     * @returns {void}
     */
    destroy(): void;
}
export {};
