import { PdfViewer, TextLayer, Signature, AccessibilityTags } from '../index';
import { NavigationPane } from './navigation-pane';
import { TextMarkupAnnotation } from '../annotation';
import { Point, DrawingElement, PointModel, Matrix } from '@syncfusion/ej2-drawings';
import { ToolBase, Actions, MouseEventArgs } from '../drawing/tools';
import { ActiveElements } from '../drawing/action';
import { PdfAnnotationBaseModel } from '../drawing/pdf-annotation-model';
import { AnnotationDataFormat, FormFieldDataFormat } from './types';
import { IContextMenu } from './interfaces';
import { BlazorUiAdaptor } from './blazor-ui-adaptor';
/**
 * The `ISize` module is used to handle page size property of PDF viewer.
 *
 * @hidden
 */
export interface ISize {
    width: number;
    height: number;
    top: number;
    rotation?: number;
}
/**
 * The `IPinchZoomStorage` module is used to handle pinch zoom storage of PDF viewer.
 *
 * @hidden
 */
export interface IPinchZoomStorage {
    index: number;
    pinchZoomStorage: object;
}
/**
 * The `IAnnotationCollection` module is used to handle page size property of PDF viewer.
 *
 * @hidden
 */
export interface IAnnotationCollection {
    textMarkupAnnotation: object;
    shapeAnnotation: object;
    measureShapeAnnotation: object;
    stampAnnotations: object;
    stickyNotesAnnotation: object;
    freeTextAnnotation: object;
    signatureAnnotation?: object;
    signatureInkAnnotation?: object;
}
/**
 * @hidden
 */
interface ICustomStampItems {
    customStampName: string;
    customStampImageSource: string;
}
/**
 * The `PdfViewerBase` module is used to handle base methods of PDF viewer.
 *
 * @hidden
 */
export declare class PdfViewerBase {
    /**
     * @private
     */
    viewerContainer: HTMLElement;
    /**
     * @private
     */
    contextMenuModule: IContextMenu;
    /**
     * @private
     */
    pageSize: ISize[];
    /**
     * @private
     */
    pageCount: number;
    /**
     * @private
     */
    isReRenderRequired: boolean;
    /**
     * @private
     */
    currentPageNumber: number;
    private previousZoomValue;
    /**
     * @private
     */
    activeElements: ActiveElements;
    /**
     * @private
     */
    mouseDownEvent: Event;
    /**
     * @private
     */
    accessibilityTags: AccessibilityTags;
    /**
     * @private
     */
    textLayer: TextLayer;
    /**
     * @private
     */
    pdfViewer: PdfViewer;
    /**
     * @private
     */
    blazorUIAdaptor: BlazorUiAdaptor;
    private unload;
    /**
     * @private
     */
    isDocumentLoaded: boolean;
    /**
     * @private
     */
    documentId: string;
    /**
     * @private
     */
    jsonDocumentId: string;
    /**
     * @private
     */
    renderedPagesList: number[];
    /**
     * @private
     */
    pageGap: number;
    /**
     * @private
     */
    signatureAdded: boolean;
    /**
     * @private
     */
    loadedData: string;
    /**
     * @private
     */
    isFreeTextSelected: boolean;
    /**
     * @private
     */
    formfieldvalue: any;
    private pageLeft;
    private sessionLimit;
    private pageStopValue;
    /**
     * @private
     */
    toolbarHeight: number;
    private pageLimit;
    private previousPage;
    private isViewerMouseDown;
    private isViewerMouseWheel;
    private scrollPosition;
    private sessionStorage;
    /**
     * @private
     */
    pageContainer: HTMLElement;
    /**
     * @private
     */
    isLoadedFormFieldAdded: boolean;
    private scrollHoldTimer;
    private isFileName;
    private pointerCount;
    private pointersForTouch;
    private corruptPopup;
    private passwordPopup;
    private goToPagePopup;
    /**
     * @private
     */
    isPasswordAvailable: boolean;
    private document;
    /**
     * @private
     */
    passwordData: string;
    /**
     * @private
     */
    reRenderedCount: number;
    private passwordInput;
    private promptElement;
    /**
     * @private
     */
    navigationPane: NavigationPane;
    private mouseX;
    private mouseY;
    /**
     * @private
     */
    mouseLeft: number;
    /**
     * @private
     */
    mouseTop: number;
    /**
     * @private
     */
    hashId: string;
    private documentLiveCount;
    /**
     * @private
     */
    mainContainer: HTMLElement;
    /**
     * @private
     */
    viewerMainContainer: HTMLElement;
    private printMainContainer;
    /**
     * @private
     */
    mobileScrollerContainer: HTMLElement;
    /**
     * @private
     */
    mobilePageNoContainer: HTMLElement;
    /**
     * @private
     */
    mobileSpanContainer: HTMLElement;
    /**
     * @private
     */
    mobilecurrentPageContainer: HTMLElement;
    private mobilenumberContainer;
    private mobiletotalPageContainer;
    private touchClientX;
    private touchClientY;
    private previousTime;
    private currentTime;
    private isTouchScrolled;
    private goToPageInput;
    /**
     * @private
     */
    pageNoContainer: HTMLElement;
    private goToPageElement;
    private isLongTouchPropagated;
    private longTouchTimer;
    private isViewerContainerDoubleClick;
    private dblClickTimer;
    /**
     * @private
     */
    pinchZoomStorage: IPinchZoomStorage[];
    private isPinchZoomStorage;
    /**
     * @private
     */
    isTextSelectionDisabled: boolean;
    /**
     * @private
     */
    isPanMode: boolean;
    private dragX;
    private dragY;
    private isScrollbarMouseDown;
    private scrollX;
    private scrollY;
    private ispageMoved;
    private isThumb;
    private isTapHidden;
    private singleTapTimer;
    private tapCount;
    private inputTapCount;
    /**
     * @private
     */
    isInitialLoaded: boolean;
    private loadRequestHandler;
    private unloadRequestHandler;
    private dowonloadRequestHandler;
    private pageRequestHandler;
    private textRequestHandler;
    private virtualLoadRequestHandler;
    private exportAnnotationRequestHandler;
    private importAnnotationRequestHandler;
    private exportFormFieldsRequestHandler;
    private importFormFieldsRequestHandler;
    private annotationPageList;
    private importPageList;
    /**
     * @private
     */
    importedAnnotation: any;
    /**
     * @private
     */
    isImportAction: boolean;
    private isImportedAnnotation;
    /**
     * @private
     */
    isAnnotationCollectionRemoved: boolean;
    /**
     * @private
     */
    tool: ToolBase;
    action: any;
    /**
     * @private
     */
    eventArgs: MouseEventArgs;
    /**
     * @private
     */
    inAction: boolean;
    /**
     * @private
     */
    isMouseDown: boolean;
    /**
     * @private
     */
    isStampMouseDown: boolean;
    /**
     * @private
     */
    currentPosition: PointModel;
    /**
     * @private
     */
    prevPosition: PointModel;
    private initialEventArgs;
    /**
     * @private
     */
    stampAdded: boolean;
    /**
     * @private
     */
    customStampCount: number;
    /**
     * @private
     */
    isDynamicStamp: boolean;
    /**
     * @private
     */
    isMixedSizeDocument: boolean;
    /**
     * @private
     */
    highestWidth: number;
    /**
     * @private
     */
    highestHeight: number;
    /**
     * @private
     */
    customStampCollection: ICustomStampItems[];
    /**
     * @private
     */
    isAlreadyAdded: boolean;
    /**
     * @private
     */
    isWebkitMobile: boolean;
    /**
     * @private
     */
    isFreeTextContextMenu: boolean;
    /**
     * @private
     */
    signatureModule: Signature;
    /**
     * @private
     */
    isSelection: boolean;
    /**
     * @private
     */
    isAddAnnotation: boolean;
    /**
     * @private
     */
    annotationComments: any;
    /**
     * @private
     */
    isToolbarSignClicked: boolean;
    /**
     * @private
     */
    signatureCount: number;
    /**
     * @private
     */
    isSignatureAdded: boolean;
    /**
     * @private
     */
    isNewSignatureAdded: boolean;
    /**
     * @private
     */
    currentSignatureAnnot: any;
    /**
     * @private
     */
    isInitialPageMode: boolean;
    /**
     * @private
     */
    ajaxData: any;
    /**
     * @private
     */
    documentAnnotationCollections: any;
    /**
     * @private
     */
    annotationRenderredList: number[];
    /**
     * @private
     */
    annotationStorage: any;
    /**
     * @private
     */
    formFieldStorage: any;
    /**
     * @private
     */
    isStorageExceed: boolean;
    /**
     * @private
     */
    isFormStorageExceed: boolean;
    /**
     * @private
     */
    isNewStamp: boolean;
    /**
     * @private
     */
    downloadCollections: any;
    /**
     * @private
     */
    isAnnotationAdded: boolean;
    /**
     * @private
     */
    annotationEvent: any;
    /**
     * @private
    */
    isAnnotationDrawn: boolean;
    /**
     * @private
     */
    isAnnotationSelect: boolean;
    /**
     * @private
     */
    isAnnotationMouseDown: boolean;
    /**
     * @private
     */
    isAnnotationMouseMove: boolean;
    /**
     * @private
     */
    validateForm: boolean;
    /**
     * @private
     */
    isMinimumZoom: boolean;
    /**
     * @private
     */
    documentLoaded: boolean;
    private tileRenderCount;
    private tileRequestCount;
    /**
     * @private
     */
    isTileImageRendered: boolean;
    private isDataExits;
    private requestLists;
    private tilerequestLists;
    private textrequestLists;
    private renderThumbnailImages;
    /**
     * @private
     */
    pageRenderCount: number;
    /**
     * @private
     */
    isToolbarInkClicked: boolean;
    /**
     * @private
     */
    isInkAdded: boolean;
    /**
     * @private
     */
    inkCount: number;
    /**
     * @private
     */
    isAddedSignClicked: boolean;
    /**
     * @private
     */
    imageCount: number;
    /**
     * @private
     */
    isMousedOver: boolean;
    /**
     * @private
     */
    isFormFieldSelect: boolean;
    /**
     * @private
     */
    isFormFieldMouseDown: boolean;
    /**
     * @private
     */
    isFormFieldMouseMove: boolean;
    /**
     * @private
     */
    isFormFieldMousedOver: boolean;
    /**
     * @private
     */
    isPassword: boolean;
    /**
     * @private
     */
    digitalSignaturePages: number[];
    /**
     * @private
     */
    restrictionList: any;
    private isDrawnCompletely;
    /**
     * @private
     */
    isAddComment: boolean;
    /**
     * @private
     */
    isCommentIconAdded: boolean;
    /**
     * @private
     */
    currentTarget: any;
    /**
     * @private
     */
    private fromTarget;
    /**
     * @private
     */
    drawSignatureWithTool: boolean;
    /**
     * @private
     */
    formFieldCollection: any[];
    /**
     * @private
     */
    nonFillableFields: any;
    /**
     * @private
     */
    isInitialField: boolean;
    /**
     * @private
     */
    isTouchDesignerMode: boolean;
    /**
     * @private
     */
    designerModetarget: any;
    /**
     * @private
     */
    isPrint: boolean;
    /**
     * @private
     */
    isPDFViewerJson: boolean;
    /**
     * @private
     */
    isJsonImported: boolean;
    /**
     * @private
     */
    isJsonExported: boolean;
    /**
     * @private
     */
    isPageRotated: boolean;
    preventContextmenu: boolean;
    private downloadFileName;
    /**
     * @private
     */
    isFocusField: boolean;
    /**
     * @private
     */
    isTouchPad: boolean;
    /**
     * @private
     */
    isMacGestureActive: boolean;
    /**
     * @private
     */
    macGestureStartScale: number;
    /**
     * @private
     */
    zoomInterval: number;
    /**
     * @private
     */
    isTaggedPdf: boolean;
    private accessibilityTagsHandler;
    private accessibilityTagsCollection;
    private pageRequestListForAccessibilityTags;
    private enableAccessibilityMultiPageRequest;
    /**
     * @private
     */
    focusField: any;
    private isMoving;
    /**
     * EJ2CORE-813 - This flag is represent current device is 'iPad' or 'iPhone' or'iPod' device.
     * @private
     */
    isDeviceiOS: Boolean;
    /**
     * @private
     */
    isMacSafari: boolean;
    private globalize;
    /**
     * Initialize the constructor of PDFViewerBase
     *
     * @param { PdfViewer } viewer - Specified PdfViewer class.
     */
    constructor(viewer: PdfViewer);
    /**
     * @private
     * @returns {void}
     */
    initializeComponent(): void;
    private createMobilePageNumberContainer;
    /**
     * @private
     * @param  {string} documentData - file name or base64 string.
     * @param {string} password - password of the PDF document.
     * @returns {void}
     */
    initiatePageRender(documentData: string, password: string): void;
    /**
    * @private
    */
    initiateLoadDocument(documentId: string, isFileName: boolean, fileName: string): void;
    /**
     * @private
     */
    loadSuccess(documentDetails: any, password?: string): void;
    private mobileScrollContainerDown;
    /**
     * @private
     * @param {MouseEvent} e - default mouse event.
     * @returns {PointModel} - retuns the bounds.
     */
    relativePosition(e: MouseEvent): PointModel;
    private setMaximumHeight;
    private applyViewerHeight;
    /**
     * @private
     * @returns {void}
     */
    updateWidth(): void;
    /**
     * @private
     * @returns {void}
     */
    updateHeight(): void;
    /**
     * @private
     * @returns {void}
     */
    updateViewerContainer(): void;
    private updateViewerContainerSize;
    private mobileScrollContainerEnd;
    /**
     * @private
     * @param {any} data - data.
     * @returns {boolean}
     */
    checkRedirection(data: any): boolean;
    private createAjaxRequest;
    private updateFormFieldName;
    /**
     * @private
     * @param {string} errorString - The message to be displayed.
     * @returns {void}
     */
    openNotificationPopup(errorString?: string): void;
    /**
     * @private
     * @param {string} errorString - The message to be shown.
     * @returns {void}
     */
    showNotificationPopup(errorString: string): void;
    private requestSuccess;
    private RestrictionEnabled;
    private EnableRestriction;
    private pageRender;
    private renderPasswordPopup;
    private renderCorruptPopup;
    private constructJsonObject;
    private checkDocumentData;
    private setFileName;
    private saveDocumentInfo;
    private saveDocumentHashData;
    private saveFormfieldsData;
    /**
     * @param {boolean} isEnable - Enable or disable the toolbar itema.
     * @returns {void}
     * @private
     */
    enableFormFieldButton(isEnable: boolean): void;
    private updateWaitingPopup;
    /**
     * @private
     * @returns {number} - returned the page value.
     */
    getActivePage(isPageNumber?: boolean): number;
    private createWaitingPopup;
    private showLoadingIndicator;
    private showPageLoadingIndicator;
    /**
     * @param {boolean} isShow - Show or hide print loading indicator.
     * @returns {void}
     * @private
     */
    showPrintLoadingIndicator(isShow: boolean): void;
    private setLoaderProperties;
    /**
     * @param {number} pageNumber - Specify the pageNumber.
     * @returns {void}
     * @private
     */
    updateScrollTop(pageNumber: number): void;
    /**
     * @private
     * @returns {number} - Returns the zoom factor value.
     */
    getZoomFactor(): number;
    /**
     * @private
     * @returns {boolean} - Returns whether the pinch zoom is performed or not.
     */
    getPinchZoomed(): boolean;
    /**
     * @private
     * @returns {boolean} -Returns whether the zoom is performed or not.
     */
    getMagnified(): boolean;
    private getPinchScrolled;
    private getPagesPinchZoomed;
    private getPagesZoomed;
    private getRerenderCanvasCreated;
    /**
     * @private
     * @returns {string} - retrun the docuumentid.
     */
    getDocumentId(): string;
    /**
     * @private
     * @returns {void}
     */
    download(): void;
    /**
     * @private
     * @returns {promise<Blob>} - Returns the blob object.
     */
    saveAsBlob(): Promise<Blob>;
    private saveAsBlobRequest;
    /**
     * @param {boolean} isTriggerEvent - check to trigger the event.
     * @returns {void}
     * @private
     */
    clear(isTriggerEvent: boolean): void;
    /**
     * @private
     * @returns {void}
     */
    destroy(): void;
    /**
     * @param {PdfViewerBase} proxy - PdfviewerBase class.
     * @returns {void}
     * @private
     */
    unloadDocument(proxy: PdfViewerBase): void;
    private clearCache;
    private setUnloadRequestHeaders;
    private windowSessionStorageClear;
    private updateCommentPanel;
    /**
     * @param {boolean} isMouseDown - check whether the mouse down is triggered.
     * @returns {void}
     * @private
     */
    focusViewerContainer(isMouseDown?: boolean): void;
    private getScrollParent;
    private createCorruptedPopup;
    /**
     * @private
     * @returns {void}
     */
    hideLoadingIndicator(): void;
    private closeCorruptPopup;
    private createPrintPopup;
    private createGoToPagePopup;
    private closeGoToPagePopUp;
    private EnableApplyButton;
    private DisableApplyButton;
    private GoToPageCancelClick;
    private GoToPageApplyClick;
    /**
     * @private
     * @returns {void}
     */
    updateMobileScrollerPosition(): void;
    private createPasswordPopup;
    private passwordCancel;
    private passwordCancelClick;
    private passwordDialogReset;
    /**
     * @private
     * @returns {void}
     */
    applyPassword(): void;
    private createFileInputElement;
    private wireEvents;
    private unWireEvents;
    /**
     * @returns {void}
     */
    private clearSessionStorage;
    /**
     * @private
     * @param {MouseEvent} event - Mouse event.
     * @returns {void}
     */
    onWindowResize: (event?: MouseEvent) => void;
    /**
     * @private
     * @returns {void}
     */
    updateZoomValue(): void;
    /**
     * @private
     * @param {any} annotation - The annotation type of any.
     * @returns {void}
     */
    updateFreeTextProperties(annotation: any): void;
    /**
     * @param {MouseEvent} event - The MouseEvent.
     * @returns {void}
     */
    private viewerContainerOnMousedown;
    /**
     * @private
     * @param {MouseEvent} event - The mouse event.
     * @returns {void}
     */
    mouseDownHandler(event: MouseEvent): void;
    /**
     * @private
     * @param {string} selectedMenu - The selected menu.
     * @returns {void}
     */
    OnItemSelected(selectedMenu: string): void;
    private CommentItemSelected;
    private ScaleRatioSelected;
    private DeleteItemSelected;
    private pasteItemSelected;
    private CutItemSelected;
    private CopyItemSelected;
    private PropertiesItemSelected;
    private TextMarkUpSelected;
    private shapeMenuItems;
    private checkIsRtlText;
    /**
     * @private
     * @param {any} event - Specifies the event.
     * @returns {boolean} - retruned the beolean value.
     */
    isClickWithinSelectionBounds(event: any): boolean;
    private getHorizontalClientValue;
    private getVerticalClientValue;
    private getHorizontalValue;
    private getVerticalValue;
    /**
     * @private
     * @returns {boolean} - retruned the beolean value.
     */
    checkIsNormalText(): boolean;
    /**
     * @param {MouseEvent} event - The MouseEvent.
     * @returns {void}
     */
    private viewerContainerOnMouseup;
    /**
     * @param {any} event - The Wheel event.
     * @returns {void}
     */
    private detectTouchPad;
    /**
     * @param {any} event - The Wheel event.
     * @returns {void}
     */
    private handleMacGestureStart;
    /**
     * @param {any} event - The Wheel event.
     * @returns {void}
     */
    private handleMacGestureChange;
    /**
     * @param {any} event - The Wheel event.
     * @returns {void}
     */
    private handleMacGestureEnd;
    /**
     * @param {WheelEvent} event - The MouseEvent.
     * @returns {void}
     */
    private viewerContainerOnMouseWheel;
    /**
     * @param {KeyboardEvent} event - The KeyboardEvent.
     * @returns {void}
     */
    private onWindowKeyDown;
    /**
     * @param {KeyboardEvent} event - The KeyboardEvent.
     * @returns {void}
     */
    private viewerContainerOnKeyDown;
    private DeleteKeyPressed;
    /**
     * @param {MouseEvent} event - The MouseEvent.
     * @returns {void}
     */
    private viewerContainerOnMousemove;
    /**
     * @param {MouseEvent} event - The MouseEvent.
     * @returns {void}
     */
    private panOnMouseMove;
    /**
     * @private
     * @returns {void}
     */
    initiatePanning(): void;
    /**
     * @private
     * @returns {void}
     */
    initiateTextSelectMode(): void;
    /**
     * @private
     * @returns {void}
    */
    initiateTextSelection(): void;
    private enableAnnotationAddTools;
    /**
     * @param {MouseEvent} event - The MouseEvent.
     * @returns {void}
     */
    private viewerContainerOnMouseLeave;
    /**
     * @param {MouseEvent} event - The MouseEvent.
     * @returns {void}
     */
    private viewerContainerOnMouseEnter;
    /**
     * @param {MouseEvent} event - The MouseEvent.
     * @returns {void}
     */
    private viewerContainerOnMouseOver;
    /**
     * @param {MouseEvent} event - The MouseEvent.
     * @returns {void}
     */
    private viewerContainerOnClick;
    private applySelection;
    /**
     * @param {DragEvent} event - The DragEvent.
     * @returns {void}
     */
    private viewerContainerOnDragStart;
    private viewerContainerOnContextMenuClick;
    private onWindowMouseUp;
    /**
     * @param {TouchEvent} event - The DragEvent.
     * @returns {void}
     */
    private onWindowTouchEnd;
    /**
     * @param {TouchEvent} event - The TouchEvent.
     * @returns {void}
     */
    private viewerContainerOnTouchStart;
    private isDesignerMode;
    private handleTaps;
    private handleTextBoxTaps;
    private onTextBoxDoubleTap;
    private onSingleTap;
    private onDoubleTap;
    /**
     * @param {TouchEvent} event - The TouchEvent.
     * @returns {void}
     */
    private viewerContainerOnLongTouch;
    /**
     * @param {PointerEvent} event - The PointerEvent.
     * @returns {void}
     */
    private viewerContainerOnPointerDown;
    private preventTouchEvent;
    /**
     * @param {TouchEvent} event - The TouchEvent.
     * @returns {void}
     */
    private viewerContainerOnTouchMove;
    /**
     * @param {PointerEvent} event - The TouchEvent.
     * @returns {void}
     */
    private viewerContainerOnPointerMove;
    /**
     * @param {TouchEvent} event - The TouchEvent.
     * @returns {void}
     */
    private viewerContainerOnTouchEnd;
    private renderStampAnnotation;
    /**
     * @param {PointerEvent} event - The PointerEvent.
     * @returns {void}
     */
    private viewerContainerOnPointerEnd;
    private initPageDiv;
    private renderElementsVirtualScroll;
    private renderPageElement;
    private renderPagesVirtually;
    private initiateRenderPagesVirtually;
    private tileRenderPage;
    private renderTileCanvas;
    private calculateImageWidth;
    private renderPage;
    private onPageRender;
    /**
     * @private
     * @param {number} pageIndex - page index for rendering the annotation.
     * @returns {void}
     */
    renderAnnotations(pageIndex: number, annotationsCollection: any, isAddedProgrammatically?: boolean): void;
    private renderTextContent;
    private renderAccessibilityTags;
    private returnPageListForAccessibilityTags;
    private createRequestForAccessibilityTags;
    private renderPageContainer;
    private renderPDFInformations;
    private orderPageDivElements;
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
     * @param pageDiv
     * @param pageWidth
     * @param pageHeight
     * @param pageNumber
     * @param displayMode
     * @private
     */
    renderPageCanvas(pageDiv: HTMLElement, pageWidth: number, pageHeight: number, pageNumber: number, displayMode: string): any;
    /**
     * @private
     * @param {any} pageCanvas - The canvas for rendering the page.
     * @param {any} pageNumber - The page number for adding styles.
     * @returns {void}
     */
    applyElementStyles(pageCanvas: any, pageNumber: number): void;
    /**
     * @private
     * @param  {number} pageIndex - page index for updating positon.
     * @returns {void}
     */
    updateLeftPosition(pageIndex: number): number;
    /**
     * @private
     * @param {number} pageIndex - The page index for positon.
     * @returns {void}
     */
    applyLeftPosition(pageIndex: number): void;
    private updatePageHeight;
    private viewerContainerOnScroll;
    /**
     * @private
     * @param {Point} clientPoint - The user should provide a x, y coordinates.
     * @returns {number}
     */
    getPageNumberFromClientPoint(clientPoint: Point): number;
    /**
     * @private
     * @param {Point} clientPoint - The user should provide a x, y coordinates.
     * @param {number} pageNumber - We need to pass pageNumber.
     * @returns {Point}
     */
    convertClientPointToPagePoint(clientPoint: Point, pageNumber: number): Point;
    /**
     * @private
     * @param {Point} pagePoint - The user needs to provide a page x, y position.
     * @param {number} pageNumber - We need to pass pageNumber.
     * @returns {Point}
     */
    convertPagePointToClientPoint(pagePoint: any, pageNumber: number): Point;
    /**
     * @private
     * @param {Point} pagePoint - The user needs to provide a page x, y position.
     * @param {number} pageNumber - We need to pass pageNumber.
     * @returns {Point}
     */
    convertPagePointToScrollingPoint(pagePoint: any, pageNumber: number): Point;
    private initiatePageViewScrollChanged;
    private renderCountIncrement;
    /**
     * @private
     * @param {number} currentPageNumber - The current pagenumber.
     * @returns {void}
     */
    pageViewScrollChanged(currentPageNumber: number): void;
    private renderPreviousPagesInScroll;
    private downloadDocument;
    private downloadExportFormat;
    /**
     * @private
     * @param {string} data - The data for exporting the fields.
     * @returns {void}
     */
    exportFormFields(data?: string, formFieldDataFormat?: FormFieldDataFormat): void;
    /**
     * @param data
     * @param formFieldDataFormat
     * @private
     */
    importFormFields(data: string, formFieldDataFormat?: FormFieldDataFormat): void;
    /**
     * @param {boolean} isObject
     * @param {FormFieldDataFormat} formFieldDataFormat
     * @param {string} data - The data for exporting the fields.
     * @private
     */
    createRequestForExportFormfields(isObject?: boolean, formFieldDataFormat?: FormFieldDataFormat, data?: string): any;
    /**
     * @param {string} fileName - Gets the name of the file name for slicing the last index
     * @param {string} sliceBy - A type to slice the file name; example (".", "_")
     * @returns {string}
     * @private
     */
    getLastIndexValue(fileName: string, sliceBy: string): string;
    /**
     * @param source
     * @private
     */
    createRequestForImportingFormfields(source: any, formFieldDataFormat: FormFieldDataFormat): void;
    /**
     * @public
     * @returns {any} - Returns the Json data.
     */
    createFormfieldsJsonData(): any;
    private constructJsonDownload;
    /**
     * @private
     * @returns {boolean} - Returns whether annotation is present.
     */
    private isAnnotationsExist;
    /**
     * @private
     * @returns {boolean} - Returns whether fields data is present.
     */
    private isFieldsDataExist;
    /**
     * @private
     * @returns {boolean} - Returns annotations page number list.
     */
    private getAnnotationsPageList;
    /**
     * @private
     * @returns {boolean} - Returns form fields page number list.
     */
    private getFormFieldsPageList;
    /**
     * @private
     * @param {string} annotationID - The annotationID.
     * @returns {any} - Returns collection of type.
     */
    checkFormFieldCollection(annotationID: string): any;
    /**
     * @private
     * @returns {boolean} - Returns whether freetext module is enabled.
     */
    isFreeTextAnnotationModule(): boolean;
    private createRequestForDownload;
    /**
     * @param pageWidth
     * @private
     */
    getTileCount(pageWidth: any): number;
    private createRequestForRender;
    /**
    * @private
    */
    requestForTextExtraction(pageIndex: number, annotationObject?: any): void;
    /**
    * @private
    */
    textMarkUpContent(markedBounds: any, pageCharText: any, characterBounds: any): string;
    /**
    * @private
    * @returns {boolean}
    */
    digitalSignaturePresent(pageIndex: number): boolean;
    private pageRequestSent;
    /**
     * @private
     * @param {string} status - The status message.
     * @param {string} errorMessage - The error message.
     * @param {string} action - The action.
     * @returns {void}
     */
    onControlError(status: number, errorMessage: string, action: string): void;
    /**
     * @param pageIndex
     * @private
     */
    getStoredData(pageIndex: number, isTextSearch?: boolean): any;
    /**
     * @private
     * @param  {any} data - The data.
     * @param {number} pageIndex - The pageIndex.
     * @param {number} tileX - The tileX.
     * @param {number} tileY - The tileY.
     * @returns {void}
     */
    storeWinData(data: any, pageIndex: number, tileX?: number, tileY?: number): void;
    /**
     * @private
     * @param {XMLHttpRequest} request - The Xml request.
     * @returns {void}
     */
    setCustomAjaxHeaders(request: XMLHttpRequest): void;
    /**
     * @private
     * @param {number} pageIndex - Page index.
     * @returns {object}
     */
    getPinchZoomPage(pageIndex: number): object;
    /**
     * @private
     * @param {number} pageIndex - current page index.
     * @param {number} zoomFactor - cuurent zoom factor
     * @returns {string}
     */
    getWindowSessionStorage(pageIndex: number, zoomFactor: number): string;
    /**
     * @private
     * @param {number} pageIndex - current page index.
     * @param {number} tileX - cuurent tile x
     * @param {number} tileY - cuurent tile y
     * @param {number} zoomFactor - cuurent zoom factor
     * @returns {string}
     */
    getWindowSessionStorageTile(pageIndex: number, tileX: number, tileY: number, zoomFactor: number): string;
    /**
     * @private
     * @returns {number}
     */
    retrieveCurrentZoomFactor(): number;
    private manageSessionStorage;
    private createBlobUrl;
    private getRandomNumber;
    private createGUID;
    /**
     * @private
     * @param {MouseEvent} event - The mouse event.
     * @param {boolean} isNeedToSet - Is need to test.
     * @returns {boolean} - Returns true or false.
     */
    isClickedOnScrollBar(event: MouseEvent, isNeedToSet?: boolean): boolean;
    private setScrollDownValue;
    /**
     * @private
     * @returns {void}
     */
    disableTextSelectionMode(): void;
    /**
     * @private
     * @param {string} idString - The Id string.
     * @returns {HTMLElement} - The html element.
     */
    getElement(idString: string): HTMLElement;
    /**
     * @private
     * @param {number} pageIndex - The pageIndex
     * @returns {number} - Returns number
     */
    getPageWidth(pageIndex: number): number;
    /**
     * @private
     * @param {number} pageIndex - The pageIndex
     * @returns {number} - Returns number
     */
    getPageHeight(pageIndex: number): number;
    /**
     * @private
     * @param {number} pageIndex - The pageIndex.
     * @returns {number} - Returns number
     */
    getPageTop(pageIndex: number): number;
    private isAnnotationToolbarHidden;
    private isFormDesignerToolbarHidded;
    /**
     * @private
     * @returns {boolean} - Returns true or false.
     */
    getTextMarkupAnnotationMode(): boolean;
    private isNewFreeTextAnnotation;
    private getCurrentTextMarkupAnnotation;
    /**
     * @private
     * @returns {number} - Returns page number.
     */
    getSelectTextMarkupCurrentPage(): number;
    /**
     * @private
     * @returns {boolean} - Retunrs true or false.
     */
    getAnnotationToolStatus(): boolean;
    /**
     * @private
     * @returns {boolean} - Retunrs true or false.
     */
    getPopupNoteVisibleStatus(): boolean;
    /**
     * @private
     * @returns {TextMarkupAnnotation} - TextMarkupAnnotation.
     */
    isTextMarkupAnnotationModule(): TextMarkupAnnotation;
    /**
     * @private
     * @returns {boolean} - Returns true or false.
     */
    isShapeAnnotationModule(): boolean;
    /**
     * @private
     * @returns {boolean} - Retunrs true or false.
     */
    isFormDesignerModule(): boolean;
    /**
     * @private
     * @returns {boolean} - Retunrs true or false.
     */
    isCalibrateAnnotationModule(): boolean;
    /**
     * @private
     * @returns {boolean} - Retunrs true or false.
     */
    isStampAnnotationModule(): boolean;
    /**
     * @private
     * @returns {boolean} - Retunrs true or false.
     */
    isInkAnnotationModule(): boolean;
    /**
     * @private
     * @returns {boolean} - Retunrs true or false.
     */
    isCommentAnnotationModule(): boolean;
    /**
     * @private
     * @returns {boolean} - Retunrs true or false.
     */
    isShapeBasedAnnotationsEnabled(): boolean;
    /**
     * @private
     * @param {MouseEvent | PointerEvent | TouchEvent} e - Returns event.
     * @returns {PointModel} - Returns points.
     */
    getMousePosition(e: MouseEvent | PointerEvent | TouchEvent): PointModel;
    private getMouseEventArgs;
    /**
     * @private
     * @param {PdfAnnotationBaseModel} obj - The object.
     * @param {PointModel} position - The position.
     * @returns {Actions | string} - Returns the string.
     */
    findToolToActivate(obj: PdfAnnotationBaseModel, position: PointModel): Actions | string;
    private inflate;
    checkResizeHandles(diagram: PdfViewer, element: DrawingElement, position: PointModel, matrix: Matrix, x: number, y: number): Actions;
    checkForResizeHandles(diagram: PdfViewer, element: DrawingElement, position: PointModel, matrix: Matrix, x: number, y: number): Actions;
    /**
     * @private
     * @param {string} fieldID - The fieldID
     * @returns {boolean} - Returns true or false.
     */
    checkSignatureFormField(fieldID: string): boolean;
    /**
     * @private
     * @param {MouseEvent | TouchEvent} evt - The event.
     * @returns {void}
     */
    diagramMouseMove(evt: MouseEvent | TouchEvent): void;
    private updateDefaultCursor;
    /**
     * @private
     * @param {MouseEvent | TouchEvent} evt - The event.
     * @returns {void}
     */
    diagramMouseLeave(evt: MouseEvent | TouchEvent): void;
    private diagramMouseActionHelper;
    private setCursor;
    private setResizerCursorType;
    /**
     * @private
     * @param {Actions | string} action - The actions.
     * @returns {ToolBase} - Returns tools.
     */
    getTool(action: Actions | string): ToolBase;
    /**
     * @private
     * @param {MouseEvent | TouchEvent} evt - The events.
     * @returns {void}
     */
    diagramMouseUp(evt: MouseEvent | TouchEvent): void;
    /**
     * @private
     * @param {HTMLElement} target - The target.
     * @returns {boolean} - Returns true or false.
     */
    skipPreventDefault(target: HTMLElement): boolean;
    private isMetaKey;
    /**
     * @private
     * @param {MouseEvent | TouchEvent} evt - The events.
     * @returns {void}
     */
    diagramMouseDown(evt: MouseEvent | TouchEvent): void;
    /**
     * @private
     */
    exportAnnotationsAsObject(annotationDataFormat?: AnnotationDataFormat): any;
    /**
     * @private
     * @param {string} type - The type.
     */
    getItemFromSessionStorage(type: string): any;
    /**
     * @param textDiv
     * @param left
     * @param top
     * @param fontHeight
     * @param width
     * @param height
     * @param isPrint
     * @param textDiv
     * @param left
     * @param top
     * @param fontHeight
     * @param width
     * @param height
     * @param isPrint
     * @param textDiv
     * @param left
     * @param top
     * @param fontHeight
     * @param width
     * @param height
     * @param isPrint
     * @param textDiv
     * @param left
     * @param top
     * @param fontHeight
     * @param width
     * @param height
     * @param isPrint
     * @param textDiv
     * @param left
     * @param top
     * @param fontHeight
     * @param width
     * @param height
     * @param isPrint
     * @private
     */
    setStyleToTextDiv(textDiv: HTMLElement, left: number, top: number, fontHeight: number, width: number, height: number, isPrint: boolean): void;
    /**
     * @param number
     * @private
     */
    ConvertPointToPixel(number: any): any;
    /**
     * @private
     */
    setItemInSessionStorage(formFieldsData: any, type: string): void;
    /**
     * @private
     */
    exportFormFieldsAsObject(formFieldDataFormat?: FormFieldDataFormat): any;
    /**
     * @param importData
     * @param annotationDataFormat
     * @param isXfdf
     * @param importData
     * @param annotationDataFormat
     * @param isXfdf
     * @param importData
     * @param annotationDataFormat
     * @param isXfdf
     * @private
     */
    importAnnotations(importData: any, annotationDataFormat?: AnnotationDataFormat, isXfdf?: boolean): void;
    /**
     * @private
     * @param {AnnotationDataFormat} annotationDataFormat - The annotationDataFormat.
     * @returns {void}
     */
    exportAnnotations(annotationDataFormat?: AnnotationDataFormat): void;
    /**
     * @param isObject
     * @param annotationDataFormat
     * @param isBase64String
     * @private
     */
    createRequestForExportAnnotations(isObject?: boolean, annotationDataFormat?: AnnotationDataFormat, isBase64String?: boolean): any;
    /**
    * @private
    */
    updateModifiedDateToLocalDate(newData: any, annotationType: any): void;
    /**
     * @private
     */
    convertUTCDateTimeToLocalDateTime(date: any): string;
    private createRequestForImportAnnotations;
    /**
     * @private
     * @param {string} errorDetails - The error details.
     * @returns {void}
     */
    openImportExportNotificationPopup(errorDetails: string): void;
    private reRenderAnnotations;
    /**
     * @param importedAnnotations
     * @param pageNumber
     * @private
     */
    private updateImportedAnnotationsInDocumentCollections;
    /**
     * @param pageIndex
     * @param pageCollections
     * @param pageIndex
     * @param pageCollections
     * @private
     */
    checkDocumentCollectionData(pageIndex: number, pageCollections?: any): any;
    private findImportedAnnotations;
    private drawPageAnnotations;
    private checkSignatureCollections;
    private checkAnnotationCollections;
    private checkAnnotationCommentsCollections;
    private selectAnnotationCollections;
    private saveImportedAnnotations;
    private savePageAnnotations;
    private updateDocumentAnnotationCollections;
    /**
     * @private
     */
    createAnnotationJsonData(): any;
    private combineImportedData;
    /**
     * @private
     * @returns {boolean} - Returns true or false.
     */
    updateExportItem(): boolean;
    private isFreeTextAnnotation;
    private checkImportedData;
    private updateAnnotationsInSessionStorage;
    /**
     * @param points
     * @private
     */
    checkAnnotationWidth(points: any): object;
    deleteAnnotations(): void;
    /**
     * @param pageNumber
     * @param isObject
     * @param pageNumber
     * @param isObject
     * @private
     */
    createAnnotationsCollection(pageNumber?: number, isObject?: boolean): any;
    /**
     * @param importAnnotation
     * @private
     */
    addAnnotation(importAnnotation: any): void;
    /**
     * @param bounds
     * @private
     */
    convertBounds(bounds: any, isRect?: boolean, isStamp?: boolean): any;
    private ConvertPixelToPoint;
    private convertVertexPoints;
    private updateComments;
    /**
     * @private
     */
    removeFocus(): any;
    /**
     * @private
     */
    updateDocumentEditedProperty(isEdited: boolean): any;
    /**
    * @private
    */
    getWindowDevicePixelRatio(): any;
    /**
    * @private
    */
    getZoomRatio(zoom?: any): any;
    /**
    * @private
    */
    importJsonForRotatedDocuments(Rotate: number, pageNumber: number, bounds: any, originalRotation?: number): any;
    getRotationAngle(originalRotation: number, pageNumber: number): any;
    /**
   * @private
   */
    calculateVertexPoints(Rotate: number, pageNumber: number, vertexPoints: any, originalRotation?: number): any;
    /**
    * @private
    */
    isSignaturePathData(data: any): boolean;
    /**
    * @private
    */
    isSignatureImageData(data: any): boolean;
    /**
    * @private
    */
    getSanitizedString(annotationData: any): any;
}
export {};
