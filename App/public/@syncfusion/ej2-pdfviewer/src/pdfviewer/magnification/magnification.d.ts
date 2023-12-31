import { PdfViewer, PdfViewerBase } from '../index';
import { Rect } from '@syncfusion/ej2-drawings';
/**
 * Magnification module
 */
export declare class Magnification {
    /**
     * @private
     */
    zoomFactor: number;
    /**
     * @private
     */
    previousZoomFactor: number;
    private scrollWidth;
    private pdfViewer;
    private pdfViewerBase;
    private zoomLevel;
    private higherZoomLevel;
    private lowerZoomLevel;
    private zoomPercentages;
    private isNotPredefinedZoom;
    private pinchStep;
    private reRenderPageNumber;
    private magnifyPageRerenderTimer;
    private rerenderOnScrollTimer;
    private rerenderInterval;
    private previousTouchDifference;
    private touchCenterX;
    private touchCenterY;
    private mouseCenterX;
    private mouseCenterY;
    private pageRerenderCount;
    private imageObjects;
    private topValue;
    private isTapToFitZoom;
    /**
     * @private
     */
    fitType: string;
    /**
     * @private
     */
    isInitialLoading: boolean;
    /**
     * @private
     */
    isPinchZoomed: boolean;
    /**
     * @private
     */
    isPagePinchZoomed: boolean;
    /**
     * @private
     */
    isRerenderCanvasCreated: boolean;
    /**
     * @private
     */
    isMagnified: boolean;
    /**
     * @private
     */
    isPagesZoomed: boolean;
    /**
     * @private
     */
    isPinchScrolled: boolean;
    /**
     * @private
     */
    isAutoZoom: boolean;
    /**
     * @private
     */
    isDoubleTapZoom: boolean;
    /**
     * @private
     */
    isFormFieldPageZoomed: boolean;
    private isWebkitMobile;
    private isFitToPageMode;
    /**
     * @param pdfViewer
     * @param viewerBase
     * @private
     */
    constructor(pdfViewer: PdfViewer, viewerBase: PdfViewerBase);
    /**
     * Zoom the PDF document to the given zoom value
     *
     * @param  {number} zoomValue - Specifies the Zoom Value for magnify the PDF document
     * @returns void
     */
    zoomTo(zoomValue: number): void;
    /**
     * Magnifies the page to the next value in the zoom drop down list.
     *
     * @returns void
     */
    zoomIn(): void;
    /**
     * Magnifies the page to the previous value in the zoom drop down list.
     *
     * @returns void
     */
    zoomOut(): void;
    /**
     * Scales the page to fit the page width to the width of the container in the control.
     *
     * @returns void
     */
    fitToWidth(): void;
    /**
     * @private
     */
    fitToAuto(): void;
    /**
     * Scales the page to fit the page in the container in the control.
     *
     * @param  {number} zoomValue - Defines the Zoom Value for fit the page in the Container
     * @returns void
     */
    fitToPage(): void;
    /**
     * Returns zoom factor for the fit zooms.
     *
     * @param type
     */
    private calculateFitZoomFactor;
    /**
     * Initiating cursor based zoom.
     * @private
     */
    initiateMouseZoom(pointX: number, pointY: number, zoomValue: number): void;
    /**
     * Performs pinch in operation
     */
    private pinchIn;
    /**
     * Performs pinch out operation
     */
    private pinchOut;
    /**
     * returns zoom level for the zoom factor.
     *
     * @param zoomFactor
     */
    private getZoomLevel;
    /**
     * @private
     */
    checkZoomFactor(): boolean;
    /**
     * Executes when the zoom or pinch operation is performed
     *
     * @param zoomValue
     */
    private onZoomChanged;
    /**
     * @param clientX
     * @param clientY
     * @private
     */
    setTouchPoints(clientX: number, clientY: number): void;
    /**
     * @param pointX1
     * @param pointY1
     * @param pointX2
     * @param pointY2
     * @param pointX1
     * @param pointY1
     * @param pointX2
     * @param pointY2
     * @param pointX1
     * @param pointY1
     * @param pointX2
     * @param pointY2
     * @param pointX1
     * @param pointY1
     * @param pointX2
     * @param pointY2
     * @private
     */
    initiatePinchMove(pointX1: number, pointY1: number, pointX2: number, pointY2: number): void;
    private magnifyPages;
    private updatePageLocation;
    private updatePageContainer;
    private clearRerenderTimer;
    /**
     * @private
     */
    clearIntervalTimer(): void;
    /**
     * @param image
     * @private
     */
    pushImageObjects(image: HTMLImageElement): void;
    private clearRendering;
    private rerenderMagnifiedPages;
    private renderInSeparateThread;
    private responsivePages;
    private calculateScrollValues;
    private calculateScrollValuesOnMouse;
    private rerenderOnScroll;
    /**
     * @private
     */
    pinchMoveScroll(): void;
    private initiateRerender;
    private reRenderAfterPinch;
    /**
     * @param pageNumber
     * @private
     */
    rerenderAnnotations(pageNumber: number): void;
    private designNewCanvas;
    /**
     * @private
     */
    pageRerenderOnMouseWheel(): void;
    /**
     * @private
     */
    renderCountIncrement(): void;
    /**
     * @private
     */
    rerenderCountIncrement(): void;
    /**
     * @param pageNumber
     * @private
     */
    resizeCanvas(pageNumber: number): void;
    private zoomOverPages;
    /**
     * @private
     */
    pinchMoveEnd(): void;
    /**
     * @param event
     * @private
     */
    fitPageScrollMouseWheel(event: WheelEvent): void;
    /**
     * @param event
     * @private
     */
    magnifyBehaviorKeyDown(event: KeyboardEvent): void;
    private upwardScrollFitPage;
    /**
     * @param currentPageIndex
     * @private
     */
    updatePagesForFitPage(currentPageIndex: number): void;
    /**
     * @private
     */
    onDoubleTapMagnification(): void;
    private downwardScrollFitPage;
    private getMagnifiedValue;
    /**
     * @private
     */
    destroy(): void;
    /**
     * returns zoom factor when the zoom percent is passed.
     *
     * @param zoomValue
     */
    private getZoomFactor;
    /**
     * @private
     */
    getModuleName(): string;
    /**
    * Returns the pinch step value.
    * @param higherValue
    * @param lowerValue
    */
    private getPinchStep;
    /**
    * @private
    * Brings the given rectangular region to view and zooms in the document to fit the region in client area (view port).
    *
    * @param {Rect} zoomRect - Specifies the region in client coordinates that is to be brought to view.
    */
    zoomToRect(zoomRect: Rect): void;
    /**
    * Returns Point value respect to Main container.
    * @param PointX
    * @param PointY
    */
    private positionInViewer;
}
