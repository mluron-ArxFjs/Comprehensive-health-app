import { PdfViewer, PdfViewerBase, IRectangle, AnnotationType, ICommentsCollection, IReviewCollection, AllowedInteraction } from '../index';
import { ChangeEventArgs } from '@syncfusion/ej2-inputs';
import { AnnotationSelectorSettingsModel } from '../pdfviewer-model';
/**
 * @hidden
 */
export interface ITextMarkupAnnotation {
    textMarkupAnnotationType: string;
    author: string;
    subject: string;
    modifiedDate: string;
    note: string;
    bounds: any;
    color: any;
    opacity: number;
    rect: any;
    comments: ICommentsCollection[];
    review: IReviewCollection;
    annotName: string;
    shapeAnnotationType: string;
    position?: string;
    pageNumber: number;
    textMarkupContent: string;
    textMarkupStartIndex: number;
    textMarkupEndIndex: number;
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    customData: object;
    isMultiSelect?: boolean;
    annotNameCollection?: any[];
    annotpageNumbers?: any[];
    annotationAddMode: string;
    annotationSettings?: any;
    allowedInteractions?: AllowedInteraction;
    isPrint: boolean;
    isCommentLock: boolean;
    isAnnotationRotated: boolean;
    annotationRotation?: number;
}
/**
 * @hidden
 */
export interface IPageAnnotationBounds {
    pageIndex: number;
    bounds: IRectangle[];
    rect: any;
    startIndex?: number;
    endIndex?: number;
    textContent?: string;
}
/**
 * The `TextMarkupAnnotation` module is used to handle text markup annotation actions of PDF viewer.
 *
 * @hidden
 */
export declare class TextMarkupAnnotation {
    private pdfViewer;
    private pdfViewerBase;
    /**
     * @private
     */
    isTextMarkupAnnotationMode: boolean;
    /**
     * @private
     */
    currentTextMarkupAddMode: string;
    /**
     * @private
     */
    highlightColor: string;
    /**
     * @private
     */
    underlineColor: string;
    /**
     * @private
     */
    strikethroughColor: string;
    /**
     * @private
     */
    highlightOpacity: number;
    /**
     * @private
     */
    underlineOpacity: number;
    /**
     * @private
     */
    annotationAddMode: string;
    /**
     * @private
     */
    strikethroughOpacity: number;
    /**
     * @private
     */
    selectTextMarkupCurrentPage: number;
    /**
     * @private
     */
    currentTextMarkupAnnotation: ITextMarkupAnnotation;
    /**
     * @private
     */
    isAddAnnotationProgramatically: boolean;
    private currentAnnotationIndex;
    private isAnnotationSelect;
    private dropDivAnnotationLeft;
    private dropDivAnnotationRight;
    private dropElementLeft;
    private dropElementRight;
    /**
     * @private
     */
    isDropletClicked: boolean;
    /**
     * @private
     */
    isRightDropletClicked: boolean;
    /**
     * @private
     */
    isLeftDropletClicked: boolean;
    /**
     * @private
     */
    isSelectionMaintained: boolean;
    private isExtended;
    private isNewAnnotation;
    private selectedTextMarkup;
    private multiPageCollection;
    private triggerAddEvent;
    /**
     * @private
     */
    isSelectedAnnotation: boolean;
    private dropletHeight;
    /**
     * @private
     */
    annotationClickPosition: object;
    /**
     * @param pdfViewer
     * @param viewerBase
     * @private
     */
    constructor(pdfViewer: PdfViewer, viewerBase: PdfViewerBase);
    /**
     * @private
     */
    createAnnotationSelectElement(): void;
    private maintainSelection;
    private selectionEnd;
    private annotationLeftMove;
    private annotationRightMove;
    /**
     * @param target
     * @param x
     * @param y
     * @param target
     * @param x
     * @param y
     * @param target
     * @param x
     * @param y
     * @private
     */
    textSelect(target: any, x: any, y: any): void;
    /**
     * @param hide
     * @private
     */
    showHideDropletDiv(hide: boolean): void;
    /**
     * @param type
     * @private
     */
    isEnableTextMarkupResizer(type: string): boolean;
    private updateDropletStyles;
    private updateAnnotationBounds;
    private updateMultiAnnotBounds;
    private retreieveSelection;
    /**
     * @param x
     * @param y
     * @param isSelected
     * @private
     */
    updatePosition(x: number, y: number, isSelected?: boolean): void;
    /**
     * @param x
     * @param y
     * @param isSelected
     * @param x
     * @param y
     * @param isSelected
     * @private
     */
    updateLeftposition(x: number, y: number, isSelected?: boolean): void;
    private getClientValueTop;
    /**
     * @param textMarkupAnnotations
     * @param pageNumber
     * @param isImportTextMarkup
     * @param textMarkupAnnotations
     * @param pageNumber
     * @param isImportTextMarkup
     * @param textMarkupAnnotations
     * @param pageNumber
     * @param isImportTextMarkup
     * @private
     */
    renderTextMarkupAnnotationsInPage(textMarkupAnnotations: any, pageNumber: number, isImportTextMarkup?: boolean, isAnnotOrderAction?: boolean): void;
    private renderTextMarkupAnnotations;
    /**
     * @param annotation
     * @private
     */
    getSettings(annotation: any): any;
    /**
     * @param type
     * @private
     */
    drawTextMarkupAnnotations(type: string): void;
    private isMultiPageAnnotations;
    private isMultiAnnotation;
    private modifyCurrentAnnotation;
    private drawAnnotationSelector;
    private selectMultiPageAnnotations;
    private deletMultiPageAnnotation;
    private modifyMultiPageAnnotations;
    private convertSelectionToTextMarkup;
    private updateTextMarkupAnnotationBounds;
    /**
     * @param annotation
     * @private
     */
    multiPageCollectionList(annotation: any): any;
    private updateAnnotationNames;
    private updateAnnotationContent;
    private drawTextMarkups;
    private getAngle;
    private retreiveTextIndex;
    private renderHighlightAnnotation;
    private renderStrikeoutAnnotation;
    private renderUnderlineAnnotation;
    private getProperBounds;
    private drawLine;
    /**
     * @param textMarkupAnnotations
     * @param pageIndex
     * @param stampData
     * @param shapeData
     * @param measureShapeData
     * @param stickyData
     * @param textMarkupAnnotations
     * @param pageIndex
     * @param stampData
     * @param shapeData
     * @param measureShapeData
     * @param stickyData
     * @private
     */
    printTextMarkupAnnotations(textMarkupAnnotations: any, pageIndex: number, stampData: any, shapeData: any, measureShapeData: any, stickyData: any, freeTextData: any): string;
    /**
     * @private
     */
    saveTextMarkupAnnotations(): string;
    /**
     * @private
     */
    deleteTextMarkupAnnotation(): void;
    /**
     * @param color
     * @private
     */
    modifyColorProperty(color: string): void;
    /**
     * @param args
     * @param isOpacity
     * @private
     */
    modifyOpacityProperty(args: ChangeEventArgs, isOpacity?: number): void;
    /**
     * @param property
     * @param value
     * @param status
     * @param annotName
     * @private
     */
    modifyAnnotationProperty(property: string, value: any, status: string, annotName?: string): ITextMarkupAnnotation[];
    /**
     * @param annotation
     * @param pageNumber
     * @param index
     * @param action
     * @private
     */
    undoTextMarkupAction(annotation: ITextMarkupAnnotation, pageNumber: number, index: number, action: string): void;
    /**
     * @param annotation
     * @param pageNumber
     * @param index
     * @param property
     * @param isUndoAction
     * @param annotation
     * @param pageNumber
     * @param index
     * @param property
     * @param isUndoAction
     * @param annotation
     * @param pageNumber
     * @param index
     * @param property
     * @param isUndoAction
     * @param annotation
     * @param pageNumber
     * @param index
     * @param property
     * @param isUndoAction
     * @private
     */
    undoRedoPropertyChange(annotation: ITextMarkupAnnotation, pageNumber: number, index: number, property: string, isUndoAction?: boolean): ITextMarkupAnnotation;
    /**
     * @param annotation
     * @param pageNumber
     * @param index
     * @param action
     * @private
     */
    redoTextMarkupAction(annotation: ITextMarkupAnnotation, pageNumber: number, index: number, action: string): void;
    /**
     * @param pageNumber
     * @param note
     * @param pageNumber
     * @param note
     * @private
     */
    saveNoteContent(pageNumber: number, note: string): void;
    private clearCurrentAnnotation;
    /**
     * @param pageNumber
     * @param isSelect
     * @param pageNumber
     * @param isSelect
     * @private
     */
    clearCurrentAnnotationSelection(pageNumber: number, isSelect?: boolean): void;
    private getBoundsForSave;
    private getAnnotationBounds;
    private getRgbCode;
    private getDrawnBounds;
    private getIndexNumbers;
    /**
     * @param pageNumber
     * @private
     */
    rerenderAnnotationsPinch(pageNumber: number): void;
    /**
     * @param pageNumber
     * @private
     */
    rerenderAnnotations(pageNumber: number): void;
    /**
     * @param event
     * @private
     */
    onTextMarkupAnnotationMouseUp(event: MouseEvent): void;
    /**
     * @param event
     * @private
     */
    onTextMarkupAnnotationTouchEnd(event: TouchEvent): void;
    /**
     * @private
     */
    clearCurrentSelectedAnnotation(): void;
    /**
     * @param event
     * @private
     */
    onTextMarkupAnnotationMouseMove(event: MouseEvent): void;
    private showPopupNote;
    private getCurrentMarkupAnnotation;
    private compareCurrentAnnotations;
    /**
     * @param pageNumber
     * @private
     */
    clearAnnotationSelection(pageNumber: number): void;
    /**
     * @param annotation
     * @param canvas
     * @param pageNumber
     * @param event
     * @param isProgrammaticSelection
     * @param annotation
     * @param canvas
     * @param pageNumber
     * @param event
     * @param isProgrammaticSelection
     * @private
     */
    selectAnnotation(annotation: ITextMarkupAnnotation, canvas: HTMLElement, pageNumber?: number, event?: MouseEvent | TouchEvent, isProgrammaticSelection?: boolean): void;
    /**
     * @param annotation
     * @private
     */
    updateCurrentResizerPosition(annotation?: any): void;
    private drawAnnotationSelectRect;
    /**
     * @param isEnable
     * @private
     */
    enableAnnotationPropertiesTool(isEnable: boolean): void;
    /**
     * @private
     */
    maintainAnnotationSelection(): void;
    /**
     * @param pageAnnotations
     * @param pageNumber
     * @private
     */
    manageAnnotations(pageAnnotations: ITextMarkupAnnotation[], pageNumber: number): void;
    /**
     * @param pageIndex
     * @param textMarkupAnnotations
     * @param id
     * @param pageIndex
     * @param textMarkupAnnotations
     * @param id
     * @private
     */
    getAnnotations(pageIndex: number, textMarkupAnnotations: any[], id?: string): any[];
    private getAddedAnnotation;
    private getSelector;
    private getIsPrintValue;
    private annotationDivSelect;
    private getPageContext;
    private getDefaultValue;
    private getMagnifiedValue;
    /**
     * @param annotation
     * @param pageNumber
     * @private
     */
    saveImportedTextMarkupAnnotations(annotation: any, pageNumber: number): any;
    /**
     * @param annotation
     * @param pageNumber
     * @param annotation
     * @param pageNumber
     * @private
     */
    updateTextMarkupAnnotationCollections(annotation: any, pageNumber: number): any;
    /**
     * @param textMarkUpSettings
     * @private
     */
    updateTextMarkupSettings(textMarkUpSettings: string): any;
    /**
     * @private
     */
    clear(): void;
    /**
     * Get vertex points properties
     * @private
     */
    private getOffsetPoints;
    /**
     * This method used to add annotations with using program.
     *
     * @param annotationType - It describes the annotation type
     * @param annotationObject - It describes type of annotation object
     * @returns Object
     * @private
     */
    updateAddAnnotationDetails(annotationType: AnnotationType, annotationObject: any): Object;
}
