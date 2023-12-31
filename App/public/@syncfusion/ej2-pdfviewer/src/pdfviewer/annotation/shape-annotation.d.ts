import { PdfViewer, PdfViewerBase, IRectangle, IPoint, ICommentsCollection, IReviewCollection, AnnotationType as AnnotType, LineHeadStyle, ShapeLabelSettingsModel, AllowedInteraction, AnnotationType } from '../../index';
import { PointModel } from '@syncfusion/ej2-drawings';
import { AnnotationSelectorSettingsModel } from '../pdfviewer-model';
/**
 * @hidden
 */
export interface IShapeAnnotation {
    shapeAnnotationType: string;
    author: string;
    modifiedDate: string;
    subject: string;
    note: string;
    strokeColor: string;
    fillColor: string;
    opacity: number;
    bounds: IRectangle;
    thickness: number;
    borderStyle: string;
    borderDashArray: number;
    rotateAngle: string;
    isCloudShape: boolean;
    cloudIntensity: number;
    vertexPoints: PointModel[];
    lineHeadStart: string;
    lineHeadEnd: string;
    rectangleDifference: string[];
    isLocked: boolean;
    id: string;
    comments: ICommentsCollection[];
    review: IReviewCollection;
    annotName: string;
    position?: string;
    pageNumber: number;
    enableShapeLabel: boolean;
    labelContent: string;
    labelFillColor: string;
    labelBorderColor: string;
    fontColor: string;
    fontSize: number;
    labelBounds: IRectangle;
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    labelSettings?: ShapeLabelSettingsModel;
    annotationSettings?: any;
    customData: object;
    allowedInteractions?: AllowedInteraction;
    isPrint: boolean;
    isCommentLock: boolean;
    isAnnotationRotated: boolean;
}
/**
 * @hidden
 */
export declare class ShapeAnnotation {
    private pdfViewer;
    private pdfViewerBase;
    /**
     * @private
     */
    currentAnnotationMode: string;
    /**
     * @private
     */
    lineOpacity: number;
    /**
     * @private
     */
    arrowOpacity: number;
    /**
     * @private
     */
    rectangleOpacity: number;
    /**
     * @private
     */
    circleOpacity: number;
    /**
     * @private
     */
    polygonOpacity: number;
    /**
     * @private
     */
    lineFillColor: string;
    /**
     * @private
     */
    arrowFillColor: string;
    /**
     * @private
     */
    rectangleFillColor: string;
    /**
     * @private
     */
    circleFillColor: string;
    /**
     * @private
     */
    polygonFillColor: string;
    /**
     * @private
     */
    lineStrokeColor: string;
    /**
     * @private
     */
    arrowStrokeColor: string;
    /**
     * @private
     */
    rectangleStrokeColor: string;
    /**
     * @private
     */
    circleStrokeColor: string;
    /**
     * @private
     */
    polygonStrokeColor: string;
    /**
     * @private
     */
    lineThickness: number;
    /**
     * @private
     */
    arrowThickness: number;
    /**
     * @private
     */
    rectangleThickness: number;
    /**
     * @private
     */
    circleThickness: number;
    /**
     * @private
     */
    polygonThickness: number;
    /**
     * @private
     */
    lineDashArray: number;
    /**
     * @private
     */
    lineStartHead: LineHeadStyle;
    /**
     * @private
     */
    lineEndHead: LineHeadStyle;
    /**
     * @private
     */
    arrowDashArray: number;
    /**
     * @private
     */
    arrowStartHead: LineHeadStyle;
    /**
     * @private
     */
    arrowEndHead: LineHeadStyle;
    /**
     * @private
     */
    shapeCount: number;
    /**
     * @private
     */
    isAddAnnotationProgramatically: boolean;
    constructor(pdfviewer: PdfViewer, pdfViewerBase: PdfViewerBase);
    /**
     * @param shapeAnnotations
     * @param pageNumber
     * @param isImportAcion
     * @private
     */
    renderShapeAnnotations(shapeAnnotations: any, pageNumber: number, isImportAcion?: boolean, isAnnotOrderAction?: boolean): void;
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
    private updateShapeProperties;
    private setShapeType;
    private getShapeType;
    private getShapeAnnotType;
    /**
     * @param property
     * @param pageNumber
     * @param annotationBase
     * @param property
     * @param pageNumber
     * @param annotationBase
     * @param property
     * @param pageNumber
     * @param annotationBase
     * @private
     */
    modifyInCollection(property: string, pageNumber: number, annotationBase: any): IShapeAnnotation;
    /**
     * @param pageNumber
     * @param annotationBase
     * @param pageNumber
     * @param annotationBase
     * @private
     */
    addInCollection(pageNumber: number, annotationBase: IShapeAnnotation): void;
    /**
     * @private
     */
    saveShapeAnnotations(): string;
    private manageAnnotations;
    private createAnnotationObject;
    private getSelector;
    private getAnnotations;
    private getRgbCode;
    /**
     * @param annotation
     * @param pageNumber
     * @param annotation
     * @param pageNumber
     * @private
     */
    saveImportedShapeAnnotations(annotation: any, pageNumber: number): any;
    /**
     * @param annotation
     * @param pageNumber
     * @param annotation
     * @param pageNumber
     * @private
     */
    updateShapeAnnotationCollections(annotation: any, pageNumber: number): any;
    /**
     * This method used to add annotations with using program.
     *
     * @param annotationType - It describes the annotation type
     * @param annotationObject - It describes type of annotation object
     * @param offset - It describes about the annotation bounds or location
     * @returns Object
     * @private
     */
    updateAddAnnotationDetails(annotationType: AnnotationType, annotationObject: any, offset: IPoint): Object;
}
