import { PdfViewer, PdfViewerBase, IRectangle, IPoint, AnnotationType as AnnotType, ShapeLabelSettingsModel, AnnotationType } from '../../index';
import { PdfAnnotationBaseModel } from '../drawing/pdf-annotation-model';
import { PointModel } from '@syncfusion/ej2-drawings';
import { ICommentsCollection, IReviewCollection } from './sticky-notes-annotation';
import { LineHeadStyle, CalibrationUnit, AllowedInteraction } from '../base';
import { AnnotationSelectorSettingsModel } from '../pdfviewer-model';
/**
 * @hidden
 */
export interface IMeasureShapeAnnotation {
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
    caption: boolean;
    captionPosition: string;
    leaderLineExtension: number;
    leaderLength: number;
    leaderLineOffset: number;
    indent: string;
    calibrate: any;
    id: string;
    annotName: string;
    comments: ICommentsCollection[];
    review: IReviewCollection;
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
export interface IMeasure {
    ratio: string;
    x?: INumberFormat[];
    distance?: INumberFormat[];
    area?: INumberFormat[];
    angle?: INumberFormat[];
    volume?: INumberFormat[];
    targetUnitConversion?: number;
    depth?: number;
}
/**
 * @hidden
 */
export interface INumberFormat {
    unit: string;
    conversionFactor: number;
    fractionalType: string;
    denominator: number;
    formatDenominator: boolean;
}
/**
 * @hidden
 */
export declare class MeasureAnnotation {
    private pdfViewer;
    private pdfViewerBase;
    /**
     * @private
     */
    currentAnnotationMode: string;
    /**
     * @private
     */
    distanceOpacity: number;
    /**
     * @private
     */
    perimeterOpacity: number;
    /**
     * @private
     */
    areaOpacity: number;
    /**
     * @private
     */
    radiusOpacity: number;
    /**
     * @private
     */
    volumeOpacity: number;
    /**
     * @private
     */
    distanceFillColor: string;
    /**
     * @private
     */
    perimeterFillColor: string;
    /**
     * @private
     */
    areaFillColor: string;
    /**
     * @private
     */
    radiusFillColor: string;
    /**
     * @private
     */
    volumeFillColor: string;
    /**
     * @private
     */
    distanceStrokeColor: string;
    /**
     * @private
     */
    perimeterStrokeColor: string;
    /**
     * @private
     */
    areaStrokeColor: string;
    /**
     * @private
     */
    radiusStrokeColor: string;
    /**
     * @private
     */
    volumeStrokeColor: string;
    /**
     * @private
     */
    distanceThickness: number;
    /**
     * @private
     */
    leaderLength: number;
    /**
     * @private
     */
    perimeterThickness: number;
    /**
     * @private
     */
    areaThickness: number;
    /**
     * @private
     */
    radiusThickness: number;
    /**
     * @private
     */
    volumeThickness: number;
    /**
     * @private
     */
    distanceDashArray: number;
    /**
     * @private
     */
    distanceStartHead: LineHeadStyle;
    /**
     * @private
     */
    distanceEndHead: LineHeadStyle;
    /**
     * @private
     */
    perimeterDashArray: number;
    /**
     * @private
     */
    perimeterStartHead: LineHeadStyle;
    /**
     * @private
     */
    perimeterEndHead: LineHeadStyle;
    private unit;
    /**
     * @private
     */
    displayUnit: CalibrationUnit;
    /**
     * @private
     */
    measureShapeCount: number;
    /**
     * @private
     */
    volumeDepth: number;
    /**
     * @private
     */
    isAddAnnotationProgramatically: boolean;
    private ratio;
    private scaleRatioString;
    private scaleRatioDialog;
    private sourceTextBox;
    private convertUnit;
    private destTextBox;
    private dispUnit;
    private depthTextBox;
    private depthUnit;
    constructor(pdfviewer: PdfViewer, pdfViewerBase: PdfViewerBase);
    /**
     * @private
     */
    readonly pixelToPointFactor: number;
    /**
     * @param shapeAnnotations
     * @param pageNumber
     * @param isImportAction
     * @param shapeAnnotations
     * @param pageNumber
     * @param isImportAction
     * @private
     */
    renderMeasureShapeAnnotations(shapeAnnotations: any, pageNumber: number, isImportAction?: boolean, isAnnotOrderAction?: boolean): void;
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
    private updateMeasureproperties;
    private createAnnotationObject;
    private getSelector;
    private getShapeAnnotType;
    private getShapeType;
    private getMeasureType;
    private getIndent;
    private getNumberFormatArray;
    private createNumberFormat;
    /**
     * @private
     */
    saveMeasureShapeAnnotations(): string;
    /**
     * @private
     */
    createScaleRatioWindow(): void;
    private createRatioUI;
    private convertUnitSelect;
    private dispUnitSelect;
    private depthUnitSelect;
    private createContent;
    private createInputElement;
    /**
     * @private
     */
    onOkClicked(): void;
    private restoreUnit;
    /**
     * @param ratio
     * @param displayUnit
     * @param conversionUnit
     * @param depth
     * @private
     */
    updateMeasureValues(ratio: string, displayUnit: CalibrationUnit, conversionUnit: CalibrationUnit, depth: number): void;
    private getAnnotationBaseModel;
    private getContent;
    /**
     * @param value
     * @param currentAnnot
     * @private
     */
    setConversion(value: number, currentAnnot: any): string;
    private onCancelClicked;
    /**
     * @param property
     * @param pageNumber
     * @param annotationBase
     * @param isNewlyAdded
     * @param property
     * @param pageNumber
     * @param annotationBase
     * @param isNewlyAdded
     * @param property
     * @param pageNumber
     * @param annotationBase
     * @param isNewlyAdded
     * @param property
     * @param pageNumber
     * @param annotationBase
     * @param isNewlyAdded
     * @private
     */
    modifyInCollection(property: string, pageNumber: number, annotationBase: any, isNewlyAdded?: boolean): IMeasureShapeAnnotation;
    /**
     * @param pageNumber
     * @param annotationBase
     * @param pageNumber
     * @param annotationBase
     * @private
     */
    addInCollection(pageNumber: number, annotationBase: IMeasureShapeAnnotation): void;
    private manageAnnotations;
    private getAnnotations;
    private getCurrentObject;
    private getCurrentValues;
    private getCurrentRatio;
    /**
     * @param points
     * @param id
     * @param pageNumber
     * @param points
     * @param id
     * @param pageNumber
     * @param points
     * @param id
     * @param pageNumber
     * @private
     */
    calculateArea(points: PointModel[], id?: string, pageNumber?: number): string;
    private getArea;
    /**
     * @param points
     * @param id
     * @param pageNumber
     * @param points
     * @param id
     * @param pageNumber
     * @param points
     * @param id
     * @param pageNumber
     * @private
     */
    calculateVolume(points: PointModel[], id?: string, pageNumber?: number): string;
    /**
     * @param pdfAnnotationBase
     * @private
     */
    calculatePerimeter(pdfAnnotationBase: PdfAnnotationBaseModel): string;
    private getFactor;
    private convertPointToUnits;
    private convertUnitToPoint;
    private getStringifiedMeasure;
    private getRgbCode;
    /**
     * @param annotation
     * @param pageNumber
     * @param annotation
     * @param pageNumber
     * @private
     */
    saveImportedMeasureAnnotations(annotation: any, pageNumber: number): any;
    /**
     * @param annotation
     * @param pageNumber
     * @private
     */
    updateMeasureAnnotationCollections(annotation: any, pageNumber: number): any;
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
