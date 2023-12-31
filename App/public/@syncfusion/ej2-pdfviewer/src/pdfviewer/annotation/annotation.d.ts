import { FreeTextSettings, HighlightSettings, LineSettings, StickyNotesSettings, StrikethroughSettings, UnderlineSettings, RectangleSettings, CircleSettings, ArrowSettings, PerimeterSettings, DistanceSettings, AreaSettings, RadiusSettings, VolumeSettings, PolygonSettings, InkAnnotationSettings, StampSettings, CustomStampSettings } from './../pdfviewer';
import { PdfViewer, PdfViewerBase, AnnotationType, TextMarkupAnnotation, ShapeAnnotation, StampAnnotation, StickyNotesAnnotation, IPopupAnnotation, MeasureAnnotation, InkAnnotation, DynamicStampItem, SignStampItem, StandardBusinessStampItem } from '../index';
import { DecoratorShapes } from '@syncfusion/ej2-drawings';
import { PdfAnnotationBaseModel, PdfFontModel } from '../drawing/pdf-annotation-model';
import { AnnotationDataFormat } from '../base';
import { FreeTextAnnotation } from './free-text-annotation';
import { InputElement } from './input-element';
/**
 * @hidden
 */
export interface IActionElements {
    pageIndex: number;
    index: number;
    annotation: any;
    action: string;
    undoElement: any;
    redoElement: any;
    duplicate?: any;
    modifiedProperty: string;
}
/**
 * @hidden
 */
export interface IPoint {
    x: number;
    y: number;
}
/**
 * Interface for a class Point
 *  @hidden
 */
export interface IAnnotationPoint {
    /**
     * Sets the x-coordinate of a position
     * @default 0
     */
    x: number;
    /**
     * Sets the y-coordinate of a position
     * @default 0
     */
    y: number;
    /**
     * Sets the x-coordinate of a position
     * @default 0
     */
    width: number;
    /**
     * Sets the y-coordinate of a position
     * @default 0
     */
    height: number;
}
/**
 * @hidden
 */
export interface IPageAnnotations {
    pageIndex: number;
    annotations: any[];
}
/**
 * The `Annotation` module is used to handle annotation actions of PDF viewer.
 */
export declare class Annotation {
    private pdfViewer;
    private pdfViewerBase;
    /**
     * @private
     */
    textMarkupAnnotationModule: TextMarkupAnnotation;
    /**
     * @private
     */
    shapeAnnotationModule: ShapeAnnotation;
    /**
     * @private
     */
    measureAnnotationModule: MeasureAnnotation;
    /**
     * @private
     */
    stampAnnotationModule: StampAnnotation;
    /**
     * @private
     */
    freeTextAnnotationModule: FreeTextAnnotation;
    /**
     * @private
     */
    inputElementModule: InputElement;
    /**
     * @private
     */
    inkAnnotationModule: InkAnnotation;
    /**
     * @private
     */
    stickyNotesAnnotationModule: StickyNotesAnnotation;
    private popupNote;
    private popupNoteAuthor;
    private popupNoteContent;
    private popupElement;
    private authorPopupElement;
    private noteContentElement;
    private modifiedDateElement;
    private opacityIndicator;
    private startArrowDropDown;
    private endArrowDropDown;
    private lineStyleDropDown;
    private thicknessBox;
    private leaderLengthBox;
    private fillColorPicker;
    private strokeColorPicker;
    private fillDropDown;
    private strokeDropDown;
    private opacitySlider;
    private propertiesDialog;
    private currentAnnotPageNumber;
    private clientX;
    private clientY;
    private isPopupMenuMoved;
    private selectedLineStyle;
    private selectedLineDashArray;
    private isUndoRedoAction;
    private isUndoAction;
    private annotationSelected;
    private isAnnotDeletionApiCall;
    private removedDocumentAnnotationCollection;
    /**
     * @private
     */
    isShapeCopied: boolean;
    /**
     * @private
     */
    actionCollection: IActionElements[];
    /**
     * @private
     */
    redoCollection: IActionElements[];
    /**
     * @private
     */
    isPopupNoteVisible: boolean;
    /**
     * @private
     */
    undoCommentsElement: IPopupAnnotation[];
    /**
     * @private
     */
    redoCommentsElement: IPopupAnnotation[];
    /**
     * @private
     */
    selectAnnotationId: string;
    /**
     * @private
     */
    isAnnotationSelected: boolean;
    /**
     * @private
     */
    annotationPageIndex: number;
    private previousIndex;
    private overlappedAnnotations;
    /**
     * @private
     */
    overlappedCollections: any;
    /**
     * @private
     */
    isFormFieldShape: boolean;
    /**
     * @private
     */
    removedAnnotationCollection: any;
    /**
     * @param pdfViewer
     * @param viewerBase
     * @param pdfViewer
     * @param viewerBase
     * @private
     */
    constructor(pdfViewer: PdfViewer, viewerBase: PdfViewerBase);
    /**
     * Set annotation type to be added in next user interaction in PDF Document.
     *
     * @param type
     * @param dynamicStampItem
     * @param signStampItem
     * @param standardBusinessStampItem
     * @returns void
     */
    setAnnotationMode(type: AnnotationType, dynamicStampItem?: DynamicStampItem, signStampItem?: SignStampItem, standardBusinessStampItem?: StandardBusinessStampItem): void;
    deleteAnnotationById(annotationId: string | object): void;
    private clearAnnotationMode;
    deleteAnnotation(): void;
    /**
     * @param annotationId
    */
    private getAnnotationsFromCollections;
    /**
     * @param annotation
    */
    private updateInputFieldDivElement;
    /**
     * @param annotation
     * @param pageNumber
     * @param annotation
     * @param pageNumber
     * @private
     */
    storeAnnotationCollections(annotation: any, pageNumber: number): void;
    checkFormDesignCollection(annotation: any): any;
    updateFormFieldCollection(annotation: any): void;
    /**
     * @param annotation
     * @private
     */
    getCustomData(annotation: any): object;
    /**
     * @param type
     * @param subject
     * @private
     */
    getShapeData(type: string, subject: string): object;
    /**
     * @param type
     * @private
     */
    getMeasureData(type: string): object;
    /**
     * @param type
     * @private
     */
    getTextMarkupData(type: string): object;
    /**
     * @param type
     * @private
     */
    getData(type: string): object;
    /**
     * @private
     */
    clearAnnotationStorage(): void;
    /**
     * @param annotation
     * @private
     */
    checkAnnotationCollection(annotation: any): any;
    /**
     * @param annotation
     * @private
     */
    updateAnnotationCollection(annotation: any): void;
    /**
     * @param annotation
     * @param pageNumber
     * @param annotationType
     * @private
     */
    updateImportAnnotationCollection(annotation: any, pageNumber: number, annotationType: string): void;
    /**
     * Select the annotations using annotation object or annotation Id.
     *
     * @param annotationId
     * @returns void
     */
    selectAnnotation(annotationId: string | object): void;
    private updateCollectionForNonRenderedPages;
    private getTypeOfAnnotation;
    private removeCommentPanelDiv;
    /**
     * Clear the annotation selection.
     *
     * @returns void
     */
    clearSelection(): void;
    /**
     * @param annotation
     * @private
     */
    getAnnotationTop(annotation: any): number;
    /**
      * @param annotation
      */
    private getAnnotationLeft;
    /**
     * @private
     */
    selectAnnotationFromCodeBehind(): void;
    /**
     * @param pageIndex
     * @private
     */
    findRenderPageList(pageIndex: number): boolean;
    private getPageNumberFromAnnotationCollections;
    private getAnnotationsFromAnnotationCollections;
    private getTextMarkupAnnotations;
    /**
     * @param type
     * @param measureType
     * @param type
     * @param measureType
     * @private
     */
    getAnnotationType(type: string, measureType: string): AnnotationType;
    /**
     * @param pageNumber
     * @param annotationId
     * @private
     */
    getAnnotationIndex(pageNumber: number, annotationId: string): number;
    /**
     * @private
     */
    initializeCollection(): void;
    /**
     * @private
     */
    showCommentsPanel(): void;
    /**
     * @param pageNumber
     * @param index
     * @param annotation
     * @param actionString
     * @param property
     * @param node
     * @param redo
     * @param pageNumber
     * @param index
     * @param annotation
     * @param actionString
     * @param property
     * @param node
     * @param redo
     * @private
     */
    addAction(pageNumber: number, index: number, annotation: any, actionString: string, property: string, node?: any, redo?: any): void;
    /**
     * @private
     */
    undo(): void;
    /**
     * @private
     */
    redo(): void;
    private undoRedoMultiline;
    private updateFormFieldValueChange;
    private updateFormFieldPropertiesChanges;
    private updateCollectionForLineProperty;
    private updateToolbar;
    private createNote;
    /**
     * @param event
     * @param color
     * @param author
     * @param note
     * @param type
     * @param event
     * @param color
     * @param author
     * @param note
     * @param type
     * @private
     */
    showPopupNote(event: any, color: string, author: string, note: string, type: string): void;
    /**
     * @private
     */
    hidePopupNote(): void;
    private createTextMarkupPopup;
    private onPopupElementMoveStart;
    private onPopupElementMove;
    private onPopupElementMoveEnd;
    private saveClosePopupMenu;
    /**
     * @private
     */
    closePopupMenu(): void;
    /**
     * @param event
     * @private
     */
    showAnnotationPopup(event: any): void;
    /**
     * @param args
     * @param isOpacity
     * @param args
     * @param isOpacity
     * @private
     */
    modifyOpacity(args: any, isOpacity?: boolean): void;
    /**
     * @param currentColor
     * @private
     */
    modifyFontColor(currentColor: string): void;
    /**
     * @param currentValue
     * @private
     */
    modifyFontFamily(currentValue: string): void;
    /**
     * @param currentValue
     * @private
     */
    modifyFontSize(currentValue: number, isInteracted: boolean): void;
    /**
     * @param currentValue
     * @private
     */
    modifyTextAlignment(currentValue: string): void;
    /**
     * @param fontInfo
     * @param action
     * @private
     */
    modifyTextProperties(fontInfo: PdfFontModel, action: string): void;
    /**
     * @param thicknessValue
     * @private
     */
    modifyThickness(thicknessValue: number): void;
    /**
     * @param color
     * @private
     */
    modifyStrokeColor(color: string): void;
    /**
     * @param color
     * @private
     */
    modifyFillColor(color: string): void;
    /**
     * @param dynamicText
     * @param annotName
     * @private
     */
    modifyDynamicTextValue(dynamicText: string, annotName: string): void;
    private modifyInCollections;
    /**
     * @private
     */
    createPropertiesWindow(): void;
    private updatePropertiesWindowInBlazor;
    private destroyPropertiesWindow;
    private refreshColorPicker;
    private createAppearanceTab;
    private createContent;
    private onStrokeDropDownBeforeOpen;
    private onFillDropDownBeforeOpen;
    private createStyleList;
    private createColorPicker;
    private createDropDownButton;
    private updateColorInIcon;
    /**
     * @param color
     * @private
     */
    onFillColorChange(color: string): void;
    /**
     * @param color
     * @private
     */
    onStrokeColorChange(color: string): void;
    private setThickness;
    private createDropDownContent;
    private createListForStyle;
    private onStartArrowHeadStyleSelect;
    private onEndArrowHeadStyleSelect;
    private createInputElement;
    private updateOpacityIndicator;
    /**
     * @private
     */
    onOkClicked(opacityValue?: number): void;
    private onCancelClicked;
    private getArrowTypeFromDropDown;
    /**
     * @param arrow
     * @private
     */
    getArrowString(arrow: DecoratorShapes): string;
    /**
     * @private
     */
    onAnnotationMouseUp(): void;
    /**
     * @param pdfAnnotationBase
     * @param event
     * @param pdfAnnotationBase
     * @param event
     * @private
     */
    onShapesMouseup(pdfAnnotationBase: PdfAnnotationBaseModel, event: any): void;
    /**
     * @param pdfAnnotationBase
     * @param isNewlyAdded
     * @param pdfAnnotationBase
     * @param isNewlyAdded
     * @private
     */
    updateCalibrateValues(pdfAnnotationBase: PdfAnnotationBaseModel, isNewlyAdded?: boolean): void;
    /**
     * @private
     */
    onAnnotationMouseDown(): void;
    private enableBasedOnType;
    private getProperDate;
    /**
     * @param pageAnnotations
     * @param pageNumber
     * @private
     */
    getPageCollection(pageAnnotations: IPageAnnotations[], pageNumber: number): number;
    /**
     * @param annotations
     * @param id
     * @param annotations
     * @param id
     * @private
     */
    getAnnotationWithId(annotations: any[], id: string): any;
    /**
     * @param event
     * @private
     */
    getEventPageNumber(event: any): number;
    /**
     * @param commentsAnnotations
     * @param parentAnnotation
     * @param author
     * @param commentsAnnotations
     * @param parentAnnotation
     * @param author
     * @param commentsAnnotations
     * @param parentAnnotation
     * @param author
     * @private
     */
    getAnnotationComments(commentsAnnotations: any, parentAnnotation: any, author: string): any;
    private getRandomNumber;
    /**
     * @private
     */
    createGUID(): string;
    /**
     * @param pageDiv
     * @param pageWidth
     * @param pageHeight
     * @param pageNumber
     * @param displayMode
     * @param pageDiv
     * @param pageWidth
     * @param pageHeight
     * @param pageNumber
     * @param displayMode
     * @private
     */
    createAnnotationLayer(pageDiv: HTMLElement, pageWidth: number, pageHeight: number, pageNumber: number, displayMode: string): HTMLElement;
    /**
     * @param width
     * @param height
     * @param pageNumber
     * @private
     */
    resizeAnnotations(width: number, height: number, pageNumber: number): void;
    /**
     * @param pageNumber
     * @private
     */
    clearAnnotationCanvas(pageNumber: number): void;
    /**
     * @param pageNumber
     * @param shapeAnnotation
     * @param measureShapeAnnotation
     * @param textMarkupAnnotation
     * @param canvas
     * @param isImportAnnotations
     * @param pageNumber
     * @param shapeAnnotation
     * @param measureShapeAnnotation
     * @param textMarkupAnnotation
     * @param canvas
     * @param isImportAnnotations
     * @param pageNumber
     * @param shapeAnnotation
     * @param measureShapeAnnotation
     * @param textMarkupAnnotation
     * @param canvas
     * @param isImportAnnotations
     * @private
     */
    renderAnnotations(pageNumber: number, shapeAnnotation: any, measureShapeAnnotation: any, textMarkupAnnotation: any, canvas?: any, isImportAnnotations?: boolean, isAnnotOrderAction?: boolean, freeTextAnnotation?: any): void;
    /**
     * @param pageNumber
     * @param annotation
     * @param annotationId
     * @param pageNumber
     * @param annotation
     * @param annotationId
     * @param pageNumber
     * @param annotation
     * @param annotationId
     * @private
     */
    storeAnnotations(pageNumber: number, annotation: any, annotationId: string): number;
    /**
     * @param type
     * @private
     */
    getArrowType(type: string): DecoratorShapes;
    /**
     * @param arrow
     * @private
     */
    getArrowTypeForCollection(arrow: DecoratorShapes): string;
    /**
     * @param bound
     * @param pageIndex
     * @private
     */
    getBounds(bound: any, pageIndex: number): any;
    /**
     * @param bound
     * @param pageIndex
     * @private
     */
    getInkBounds(bound: any, pageIndex: number): any;
    /**
     * @param points
     * @param pageIndex
     * @param points
     * @param pageIndex
     * @private
     */
    getVertexPoints(points: any[], pageIndex: number): any;
    /**
     * @param pageIndex
     * @param shapeAnnotations
     * @param idString
     * @param pageIndex
     * @param shapeAnnotations
     * @param idString
     * @private
     */
    getStoredAnnotations(pageIndex: number, shapeAnnotations: any[], idString: string): any[];
    /**
     * @param pdfAnnotationBase
     * @param isColor
     * @param isStroke
     * @param isThickness
     * @param isOpacity
     * @param isLineStart
     * @param isLineEnd
     * @param isDashArray
     * @param isFreeText
     * @param previousText
     * @param currentText
     * @param pdfAnnotationBase
     * @param isColor
     * @param isStroke
     * @param isThickness
     * @param isOpacity
     * @param isLineStart
     * @param isLineEnd
     * @param isDashArray
     * @param isFreeText
     * @param previousText
     * @param currentText
     * @param pdfAnnotationBase
     * @param isColor
     * @param isStroke
     * @param isThickness
     * @param isOpacity
     * @param isLineStart
     * @param isLineEnd
     * @param isDashArray
     * @param isFreeText
     * @param previousText
     * @param currentText
     * @param pdfAnnotationBase
     * @param isColor
     * @param isStroke
     * @param isThickness
     * @param isOpacity
     * @param isLineStart
     * @param isLineEnd
     * @param isDashArray
     * @param isFreeText
     * @param previousText
     * @param currentText
     * @param pdfAnnotationBase
     * @param isColor
     * @param isStroke
     * @param isThickness
     * @param isOpacity
     * @param isLineStart
     * @param isLineEnd
     * @param isDashArray
     * @param isFreeText
     * @param previousText
     * @param currentText
     * @param pdfAnnotationBase
     * @param isColor
     * @param isStroke
     * @param isThickness
     * @param isOpacity
     * @param isLineStart
     * @param isLineEnd
     * @param isDashArray
     * @param isFreeText
     * @param previousText
     * @param currentText
     * @param pdfAnnotationBase
     * @param isColor
     * @param isStroke
     * @param isThickness
     * @param isOpacity
     * @param isLineStart
     * @param isLineEnd
     * @param isDashArray
     * @param isFreeText
     * @param previousText
     * @param currentText
     * @param pdfAnnotationBase
     * @param isColor
     * @param isStroke
     * @param isThickness
     * @param isOpacity
     * @param isLineStart
     * @param isLineEnd
     * @param isDashArray
     * @param isFreeText
     * @param previousText
     * @param currentText
     * @param pdfAnnotationBase
     * @param isColor
     * @param isStroke
     * @param isThickness
     * @param isOpacity
     * @param isLineStart
     * @param isLineEnd
     * @param isDashArray
     * @param isFreeText
     * @param previousText
     * @param currentText
     * @param pdfAnnotationBase
     * @param isColor
     * @param isStroke
     * @param isThickness
     * @param isOpacity
     * @param isLineStart
     * @param isLineEnd
     * @param isDashArray
     * @param isFreeText
     * @param previousText
     * @param currentText
     * @private
     */
    triggerAnnotationPropChange(pdfAnnotationBase: PdfAnnotationBaseModel, isColor: boolean, isStroke: boolean, isThickness: boolean, isOpacity: boolean, isLineStart?: boolean, isLineEnd?: boolean, isDashArray?: boolean, isFreeText?: boolean, previousText?: string, currentText?: string): void;
    /**
     * @param pdfAnnotationBase
     * @private
     */
    triggerAnnotationAdd(pdfAnnotationBase: PdfAnnotationBaseModel): void;
    /**
     * @param pdfAnnotationBase
     * @private
     */
    triggerAnnotationResize(pdfAnnotationBase: PdfAnnotationBaseModel): void;
    /**
     * @param pdfAnnotationBase
     * @private
     */
    triggerAnnotationMove(pdfAnnotationBase: PdfAnnotationBaseModel, isMoving?: boolean): void;
    /**
     * @param annotationId
     * @param pageNumber
     * @param annotation
     * @param annotationCollection
     * @param isDblClick
     * @param isSelected
     * @private
     */
    annotationSelect(annotationId: any, pageNumber: number, annotation: any, annotationCollection?: any, isDblClick?: boolean, isSelected?: boolean): void;
    selectSignature(signatureId: string, pageNumber: number, signatureModule: any): void;
    editSignature(signature: any): void;
    private deletComment;
    private addReplyComments;
    private editComments;
    editAnnotation(annotation: any): void;
    private annotationPropertyChange;
    private calculateAnnotationBounds;
    /**
     * @param annotation
     * @private
     */
    updateFreeTextProperties(annotation: any): void;
    private updateAnnotationComments;
    /**
     * @param annotation
     * @param currentAnnotation
     * @private
     */
    addFreeTextProperties(annotation: any, currentAnnotation: any): void;
    updateMeasurementSettings(): void;
    private updateCollection;
    private modifyAnnotationProperties;
    /**
     * @param annotationType
     * @param annotationSubType
     * @param annotationType
     * @param annotationSubType
     * @private
     */
    updateAnnotationAuthor(annotationType: string, annotationSubType?: string): string;
    /**
     * @param colour
     * @private
     */
    nameToHash(colour: string): string;
    private updateFreeTextFontStyle;
    private setFreeTextFontStyle;
    /**
     * @param annotation
     * @param isSettings
     * @private
     */
    findAnnotationSettings(annotation: any, isSettings?: boolean): any;
    /**
     * @param annotation
     * @private
     */
    updateAnnotationSettings(annotation: any): any;
    /**
     * @param annotationSettings
     * @private
     */
    updateSettings(annotationSettings: any): any;
    private getOverlappedAnnotations;
    private getPageShapeAnnotations;
    private findOverlappedAnnotations;
    private calculateOverlappedAnnotationBounds;
    /**
     * @param annotation
     * @param pageNumber
     * @param type
     * @param annotation
     * @param pageNumber
     * @param type
     * @private
     */
    findAnnotationMode(annotation: any, pageNumber: number, type: string): string;
    private checkOverlappedCollections;
    private orderTextMarkupBounds;
    /**
     * @param annotation
     * @private
     */
    updateModifiedDate(annotation: any): any;
    private setAnnotationModifiedDate;
    /**
     * @private
     */
    clear(): void;
    retrieveAnnotationCollection(): any[];
    /**
     * @param interaction
     * @param annotation
     * @param interaction
     * @param annotation
     * @private
     */
    checkAllowedInteractions(interaction: string, annotation: any): boolean;
    /**
     * @param menuObj
     * @private
     */
    checkContextMenuDeleteItem(menuObj: any): void;
    /**
     * @private
     */
    isEnableDelete(): boolean;
    /**
     * @private
     */
    findCurrentAnnotation(): any;
    /**
     * @param annotation
     * @private
     */
    updateAnnotationAllowedInteractions(annotation: any): any;
    /**
     * @param annotation
     * @private
     */
    checkIsLockSettings(annotation: any): boolean;
    private checkLockSettings;
    /**
     * @private
     */
    restrictContextMenu(): boolean;
    private checkAllowedInteractionSettings;
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
     * @param dataFormat
     * @private
     */
    exportAnnotationsAsStream(dataFormat: AnnotationDataFormat): Promise<object>;
    private hex;
    /**
     * @param obj
     * @private
     */
    cloneObject(obj: any): any;
    /**
     * @private
     */
    destroy(): void;
    /**
     * @private
     */
    getModuleName(): string;
    /**
     * Get vertex points properties
     * @private
     */
    getVertexPointsXY(points: any): any;
    /**
     * Method used to add annotations using program.
     *
     * @param annotationType - It describes type of annotation object.
     * @param options -  It describes about the annotation objects and it's property.
     * @param dynamicStampItem - It describe which type of dynamic stamp.
     * @param signStampItem - It describe which type of sign stamp.
     * @param standardBusinessStampItem - It describe which type of standard business stamp.
     * @returns void
     */
    addAnnotation(annotationType: AnnotationType, options?: FreeTextSettings | StickyNotesSettings | HighlightSettings | UnderlineSettings | LineSettings | StrikethroughSettings | RectangleSettings | CircleSettings | ArrowSettings | PolygonSettings | DistanceSettings | PerimeterSettings | AreaSettings | RadiusSettings | VolumeSettings | InkAnnotationSettings | StampSettings | CustomStampSettings, dynamicStampItem?: DynamicStampItem, signStampItem?: SignStampItem, standardBusinessStampItem?: StandardBusinessStampItem): void;
    /**
     * @param annotation
     * @private
     */
    triggerAnnotationAddEvent(annotation: PdfAnnotationBaseModel): void;
    /**
     * @private
     */
    triggerAnnotationUnselectEvent(): void;
    /**
     * @private
    */
    updateFontFamilyRenderSize(currentAnnotation: PdfAnnotationBaseModel, currentValue: any): void;
    private updateCanvas;
}
