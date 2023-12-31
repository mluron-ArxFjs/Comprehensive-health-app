import { PdfAnnotationBase } from '../drawing/pdf-annotation';
import { PdfViewer, PdfViewerBase, ICommentsCollection, IReviewCollection, AllowedInteraction, IPoint, DynamicStampItem, SignStampItem, StandardBusinessStampItem } from '../../index';
import { AnnotationSelectorSettingsModel } from '../pdfviewer-model';
/**
 * @hidden
 */
export interface IStampAnnotation {
    stampAnnotationPath: string;
    author: string;
    creationDate: string;
    modifiedDate: string;
    subject: string;
    note: string;
    strokeColor: string;
    fillColor: string;
    opacity: number;
    bounds: IRectangles;
    icon: string;
    pageNumber: number;
    rotateAngle: string;
    randomId: string;
    stampAnnotationType: string;
    stampFillcolor: string;
    isDynamicStamp: boolean;
    dynamicText?: string;
    shapeAnnotationType: string;
    comments: ICommentsCollection[];
    review: IReviewCollection;
    annotName: string;
    position?: string;
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    annotationSettings?: any;
    customData: object;
    allowedInteractions?: AllowedInteraction;
    isPrint: boolean;
    isCommentLock: boolean;
    isMaskedImage: boolean;
    customStampName: string;
}
interface IRectangles {
    height: number;
    left: number;
    top: number;
    width: number;
}
/**
 * The `StampAnnotation` module is used to handle annotation actions of PDF viewer.
 *
 * @hidden
 */
export declare class StampAnnotation {
    private pdfViewer;
    private pdfViewerBase;
    private author;
    /**
     * @private
     */
    currentStampAnnotation: any;
    /**
     * @private
     */
    isStampAnnotSelected: boolean;
    /**
     * @private
     */
    isStampAddMode: boolean;
    /**
     * @private
     */
    isNewStampAnnot: boolean;
    private isExistingStamp;
    /**
     * @private
     */
    stampPageNumber: any;
    /**
     * @private
     */
    isAddAnnotationProgramatically: boolean;
    /**
     * @private
     */
    customStampName: string;
    private dynamicText;
    constructor(pdfviewer: PdfViewer, pdfViewerBase: PdfViewerBase);
    /**
     * @param stampAnnotations
     * @param pageNumber
     * @param canvass
     * @param isImport
     * @private
     */
    renderStampAnnotations(stampAnnotations: any, pageNumber: number, canvass?: any, isImport?: boolean, isAnnotOrderAction?: boolean): void;
    /**
     * @private
     */
    moveStampElement(X: number, Y: number, pageIndex: number): PdfAnnotationBase;
    private ConvertPointToPixel;
    private calculateImagePosition;
    /**
     * @private
     */
    createCustomStampAnnotation(imageSource: any, annotName?: string): void;
    /**
     * @private
     */
    renderStamp(X: number, Y: number, width: number, height: number, pageIndex: number, opacity: number, rotation: any, canvass: any, existingAnnotation: any, isDynamic?: any): any;
    /**
     * @private
     */
    getSettings(annotation: any): any;
    /**
     * @private
     */
    resetAnnotation(): void;
    /**
     * @private
     */
    updateDeleteItems(pageNumber: number, annotation: any, opacity?: number): any;
    /**
     * @private
     */
    renderCustomImage(position: any, pageIndex: any, image: any, currentDate: any, modifiedDate: any, RotationAngle: any, opacity: any, canvas?: any, isExistingStamp?: boolean, annotation?: any, annotName?: string): void;
    /**
     * @private
     */
    retrieveDynamicStampAnnotation(icontype: any): any;
    /**
     * @private
     */
    retrievestampAnnotation(icontype: any): any;
    /**
     * @private
     */
    saveStampAnnotations(): any;
    /**
     * @private
     */
    storeStampInSession(pageNumber: number, annotation: IStampAnnotation): any;
    /**
     * @private
     */
    updateSessionStorage(annotation: any, id: any, type: String): any;
    /**
     * @private
     */
    saveImportedStampAnnotations(annotation: any, pageNumber: number): any;
    /**
     * @private
     */
    updateStampAnnotationCollections(annotation: any, pageNumber: number): any;
    stampImageData(annot: any): boolean;
    private findImageData;
    private findDynamicText;
    private getAnnotations;
    /**
     * @private
     */
    modifyInCollection(property: string, pageNumber: number, annotationBase: any): IStampAnnotation;
    private manageAnnotations;
    /**
     * This method used to add annotations with using programmatically.
     *
     * @param annotationObject - It describes type of annotation object
     * @param offset - It describes about the annotation bounds or location
     * @param pageNumber - It describes about the annotation page number
     * @param dynamicStampItem - It describe which type of dynamic stamp
     * @param signStampItem - It describe which type of sign stamp
     * @param standardBusinessStampItem - It describe which type of standard business stamp
     * @returns Object
     * @private
     */
    updateAddAnnotationDetails(annotationObject: any, offset: IPoint, pageNumber: number, dynamicStampItem?: DynamicStampItem, signStampItem?: SignStampItem, standardBusinessStampItem?: StandardBusinessStampItem): Object;
    /**
     * @private
    */
    triggerAnnotationAdd(annot: any, annotation: any): void;
}
export {};
