import { FreeTextSettings } from './../pdfviewer';
import { PdfViewer, PdfViewerBase, IPoint, AnnotationType as AnnotType, ICommentsCollection, IReviewCollection, AllowedInteraction } from '../..';
import { PointModel } from '@syncfusion/ej2-drawings';
import { PdfAnnotationBaseModel } from '../drawing/pdf-annotation-model';
import { AnnotationSelectorSettingsModel } from '../pdfviewer-model';
/**
 * @hidden
 */
export interface IFreeTextAnnotation {
    shapeAnnotationType: string;
    author: string;
    modifiedDate: string;
    subject: string;
    note: string;
    opacity: number;
    bounds: any;
    thickness: number;
    borderStyle: string;
    borderDashArray: number;
    rotateAngle: string;
    isLocked: boolean;
    id: string;
    annotName: string;
    position?: string;
    fillColor: string;
    strokeColor: string;
    dynamicText: string;
    fontColor: string;
    fontSize: number;
    fontFamily: string;
    textAlign: string;
    font: any;
    comments: ICommentsCollection[];
    review: IReviewCollection;
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    annotationSettings?: any;
    allowedInteractions?: AllowedInteraction;
    isCommentLock: boolean;
    isReadonly: boolean;
}
/**
 * @hidden
 */
export declare class FreeTextAnnotation {
    private pdfViewer;
    private pdfViewerBase;
    /**
     * @private
     */
    currentAnnotationMode: string;
    /**
     * @private
     */
    opacity: number;
    /**
     * @private
     */
    borderColor: string;
    /**
     * @private
     */
    borderWidth: number;
    /**
     * @private
     */
    defautWidth: number;
    /**
     * @private
     */
    defaultHeight: number;
    /**
     * @private
     */
    inputBoxElement: any;
    /**
     * @private
     */
    borderStyle: string;
    /**
     * @private
     */
    author: string;
    /**
     * @private
     */
    isNewFreeTextAnnot: boolean;
    /**
     * @private
     */
    isNewAddedAnnot: boolean;
    /**
     * @private
     */
    inputBoxCount: number;
    /**
     * @private
     */
    selectedAnnotation: PdfAnnotationBaseModel;
    /**
     * @private
     */
    isFreeTextValueChange: boolean;
    /**
     * @private
     */
    isAddAnnotationProgramatically: boolean;
    /**
     * @private
     */
    isInuptBoxInFocus: boolean;
    /**
     * @private
     */
    fontSize: number;
    /**
     * @private
     */
    annodationIntent: string;
    /**
     * @private
     */
    annotationFlags: string;
    /**
     * @private
     */
    fillColor: string;
    /**
     * @private
     */
    fontColor: string;
    /**
     * @private
     */
    fontFamily: string;
    /**
     * @private
     */
    freeTextPageNumbers: any;
    /**
     * @private
     */
    selectedText: string;
    /**
     * @private
     */
    isTextSelected: boolean;
    private selectionStart;
    private selectionEnd;
    /**
     * @private
     */
    isBold: boolean;
    /**
     * @private
     */
    isItalic: boolean;
    /**
     * @private
     */
    isUnderline: boolean;
    /**
     * @private
     */
    isStrikethrough: boolean;
    /**
     * @private
     */
    textAlign: string;
    private defaultText;
    private isReadonly;
    private isMaximumWidthReached;
    private padding;
    private wordBreak;
    private freeTextPaddingLeft;
    private freeTextPaddingTop;
    private defaultFontSize;
    /**
     * @private
     */
    previousText: string;
    /**
     * @private
     */
    currentPosition: any;
    constructor(pdfviewer: PdfViewer, pdfViewerBase: PdfViewerBase);
    /**
     * @private
     */
    updateTextProperties(): void;
    /**
     * @param shapeAnnotations
     * @param pageNumber
     * @param isImportAction
     * @private
     */
    renderFreeTextAnnotations(shapeAnnotations: any, pageNumber: number, isImportAction?: boolean, isAnnotOrderAction?: boolean): void;
    /**
     * @param annotation
     * @private
     */
    getSettings(annotation: any): any;
    /**
     * @param type
     * @private
     */
    setAnnotationType(type: AnnotType): void;
    /**
     * @param property
     * @param pageNumber
     * @param annotationBase
     * @param isNewAdded
     * @param property
     * @param pageNumber
     * @param annotationBase
     * @param isNewAdded
     * @param property
     * @param pageNumber
     * @param annotationBase
     * @param isNewAdded
     * @param property
     * @param pageNumber
     * @param annotationBase
     * @param isNewAdded
     * @private
     */
    modifyInCollection(property: string, pageNumber: number, annotationBase: any, isNewAdded?: boolean): IFreeTextAnnotation;
    /**
     * @param pageNumber
     * @param annotationBase
     * @private
     */
    addInCollection(pageNumber: number, annotationBase: IFreeTextAnnotation): void;
    /**
     * @private
     */
    saveFreeTextAnnotations(): string;
    private getRotationValue;
    private getBoundsBasedOnRotation;
    private manageAnnotations;
    private getAnnotations;
    private getRgbCode;
    /**
     * @private
     */
    onFocusOutInputBox(): void;
    /**
     * @param event
     * @private
     */
    onKeyDownInputBox(event: KeyboardEvent): void;
    private updateFreeTextAnnotationSize;
    /**
     * @param event
     * @private
     */
    autoFitFreeText(xPosition?: number, yPosition?: number): void;
    /**
     * @param event
     * @private
     */
    onMouseUpInputBox(event: MouseEvent): void;
    /**
     * @param currentPosition
     * @param annotation
     * @param pageIndex
     * @private
     */
    addInuptElemet(currentPosition: PointModel, annotation?: PdfAnnotationBaseModel, pageIndex?: number): void;
    private applyFreetextStyles;
    /**
     * @private
     */
    copySelectedText(): void;
    /**
     * @param target
     * @private
     */
    pasteSelectedText(target: any): void;
    /**
     * @param target
     * @private
     */
    cutSelectedText(target: any): void;
    /**
     * @param shapeAnnotations
     * @param pageNumber
     * @private
     */
    saveImportedFreeTextAnnotations(shapeAnnotations: any, pageNumber: number): void;
    /**
     * @param shapeAnnotations
     * @param pageNumber
     * @private
     */
    updateFreeTextAnnotationCollections(shapeAnnotations: any, pageNumber: number): void;
    /**
     * This method used to add annotations with using program.
     *
     * @param annotationType - It describes type of annotation
     * @param offset - It describes about the annotation bounds
     * @returns Object
     * @private
     */
    updateAddAnnotationDetails(annotationObject: FreeTextSettings, offset: IPoint): Object;
    /**
     * This method used to get the padding.
    */
    private getPaddingValues;
    /**
     * @private
     * This method used tp get the current position of x and y.
    */
    addInputInZoom(currentPosition: any): void;
}
