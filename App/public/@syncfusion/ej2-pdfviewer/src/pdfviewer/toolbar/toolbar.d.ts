import { Toolbar as tool } from '@syncfusion/ej2-navigations';
import { PdfViewer, PdfViewerBase, AnnotationToolbar } from '../index';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
import { ToolbarItem } from '../base/types';
import { FormDesignerToolbar } from './formdesigner-toolbar';
/**
 * Toolbar module
 */
export declare class Toolbar {
    /**
     * @private
     */
    toolbar: tool;
    private pdfViewer;
    private pdfViewerBase;
    private currentPageBox;
    private zoomDropDown;
    private currentPageBoxElement;
    /**
     * @private
     */
    uploadedDocumentName: string;
    /**
    * @private
    */
    toolbarElement: HTMLElement;
    private itemsContainer;
    private openDocumentItem;
    private firstPageItem;
    private previousPageItem;
    private nextPageItem;
    private lastPageItem;
    private zoomInItem;
    private zoomOutItem;
    private totalPageItem;
    private downloadItem;
    private zoomDropdownItem;
    /**
     * @private
     */
    submitItem: HTMLElement;
    private fileInputElement;
    private textSelectItem;
    private panItem;
    private printItem;
    private textSearchItem;
    private undoItem;
    private redoItem;
    private commentItem;
    /**
     * @private
     */
    annotationItem: HTMLElement;
    /**
     * @private
     */
    formDesignerItem: HTMLElement;
    private moreOptionItem;
    /**
     * @private
     */
    annotationToolbarModule: AnnotationToolbar;
    /**
     * @private
    */
    formDesignerToolbarModule: FormDesignerToolbar;
    /**
     * @private
     */
    moreDropDown: DropDownButton;
    private isPageNavigationToolDisabled;
    private isMagnificationToolDisabled;
    /**
     * @private
    */
    isSelectionToolDisabled: boolean;
    private isScrollingToolDisabled;
    private isOpenBtnVisible;
    private isNavigationToolVisible;
    private isMagnificationToolVisible;
    private isSelectionBtnVisible;
    private isScrollingBtnVisible;
    private isDownloadBtnVisible;
    private isPrintBtnVisible;
    private isSearchBtnVisible;
    private isTextSearchBoxDisplayed;
    private isUndoRedoBtnsVisible;
    private isAnnotationEditBtnVisible;
    private isFormDesignerEditBtnVisible;
    private isCommentBtnVisible;
    private isSubmitbtnvisible;
    /**
     * @private
     */
    PanElement: any;
    /**
     * @private
    */
    SelectToolElement: HTMLElement;
    /**
     * @private
    */
    CommentElement: HTMLElement;
    /**
     * @param viewer
     * @param viewerBase
     * @param viewer
     * @param viewerBase
     * @private
     */
    constructor(viewer: PdfViewer, viewerBase: PdfViewerBase);
    /**
     * @param width
     * @private
     */
    intializeToolbar(width: string): HTMLElement;
    private bindOpenIconEvent;
    private InitializeMobileToolbarInBlazor;
    /**
     * Shows /hides the toolbar in the PdfViewer
     *
     * @param  {boolean} enableToolbar - If set true , its show the Toolbar
     * @returns void
     */
    showToolbar(enableToolbar: boolean): void;
    /**
     * Shows/hides the Navigation toolbar in the PdfViewer
     *
     * @param  {boolean} enableNavigationToolbar - If set true , its show the Navigation Toolbar
     * @returns void
     */
    showNavigationToolbar(enableNavigationToolbar: boolean): void;
    /**
     * Shows /hides the annotation toolbar in the PdfViewer
     *
     * @param  {boolean} enableAnnotationToolbar - If set true , its show the annotation Toolbar
     * @returns void
     */
    showAnnotationToolbar(enableAnnotationToolbar: boolean): void;
    /**
     * Shows /hides the the toolbar items in the PdfViewer
     *
     * @param  {string[]} items - Defines the toolbar items in the toolbar
     * @param  {boolean} isVisible - If set true, then its show the toolbar Items
     * @returns void
     */
    showToolbarItem(items: ToolbarItem[], isVisible: boolean): void;
    /**
     * Enables /disables the the toolbar items in the PdfViewer
     *
     * @param  {string[]} items - Defines the toolbar items in the toolbar
     * @param  {boolean} isEnable - If set true, then its Enable the toolbar Items
     * @returns void
     */
    enableToolbarItem(items: ToolbarItem[], isEnable: boolean): void;
    /**
     * @param restrictionSummary
     * @param isEnable
     * @param restrictionSummary
     * @param isEnable
     * @private
     */
    DisableToolbarItems(restrictionSummary: any, isEnable: boolean): void;
    private showOpenOption;
    private showPageNavigationTool;
    private showMagnificationTool;
    private showSelectionTool;
    private showScrollingTool;
    private showDownloadOption;
    private showPrintOption;
    private showSearchOption;
    private showUndoRedoTool;
    private showCommentOption;
    private showAnnotationEditTool;
    private showFormDesignerEditTool;
    private showSubmitForm;
    private enableOpenOption;
    private enablePageNavigationTool;
    private enableMagnificationTool;
    private enableSelectionTool;
    private enableScrollingTool;
    private enableDownloadOption;
    private enablePrintOption;
    private enableSearchOption;
    private enableUndoRedoTool;
    private enableAnnotationEditTool;
    private enableFormDesignerEditTool;
    private enableCommentsTool;
    /**
     * @private
     */
    resetToolbar(): void;
    /**
     * @private
     */
    updateToolbarItems(): void;
    /**
     * @private
     */
    updateNavigationButtons(): void;
    /**
     * @private
     */
    updateZoomButtons(): void;
    /**
     * @private
     */
    updateUndoRedoButtons(): void;
    private enableCollectionAvailable;
    private enableCollectionAvailableInBlazor;
    private disableUndoRedoButtons;
    /**
     * @private
     */
    destroy(): void;
    private destroyComponent;
    private destroyDependentComponent;
    /**
     * @param pageIndex
     * @private
     */
    updateCurrentPage(pageIndex: number): void;
    /**
     * @private
     */
    updateTotalPage(): void;
    /**
     * @param event
     * @private
     */
    openFileDialogBox(event: Event): void;
    private createToolbar;
    private createToolbarItems;
    private afterToolbarCreationInMobile;
    private afterToolbarCreation;
    /**
     * @param idString
     * @param className
     * @param tooltipText
     * @param idString
     * @param className
     * @param tooltipText
     * @private
     */
    addClassToolbarItem(idString: string, className: string, tooltipText: string): HTMLElement;
    private addPropertiesToolItemContainer;
    private createZoomDropdownElement;
    private createZoomDropdown;
    private createCurrentPageInputTemplate;
    private createTotalPageTemplate;
    private createNumericTextBox;
    private onToolbarKeydown;
    private createToolbarItemsForMobile;
    private createMoreOption;
    private createToolbarItem;
    /**
     * @param toolbarItem
     * @param tooltipText
     * @param toolbarItem
     * @param tooltipText
     * @private
     */
    createTooltip(toolbarItem: HTMLElement, tooltipText: string): void;
    private onTooltipBeforeOpen;
    private createFileElement;
    private wireEvent;
    private unWireEvent;
    /**
     * @param viewerWidth
     * @private
     */
    onToolbarResize(viewerWidth: number): void;
    private toolbarOnMouseup;
    private applyHideToToolbar;
    private toolbarClickHandler;
    private handleOpenIconClick;
    private handleToolbarBtnClick;
    addInkAnnotation(): void;
    deSelectCommentAnnotation(): void;
    /**
    * @private
    */
    addComments(targetElement: any): void;
    openZoomDropdown(): void;
    private loadDocument;
    private navigateToPage;
    private textBoxFocusOut;
    private onZoomDropDownInput;
    private onZoomDropDownInputClick;
    private zoomPercentSelect;
    private zoomDropDownChange;
    /**
     * @param zoomFactor
     * @private
     */
    updateZoomPercentage(zoomFactor: number): void;
    private updateInteractionItems;
    /**
     * @private
     */
    textSearchButtonHandler(): void;
    private initiateAnnotationMode;
    private initiateFormDesignerMode;
    /**
     * @private
     */
    DisableInteractionTools(): void;
    /**
     * @param element
     * @private
     */
    selectItem(element: HTMLElement): void;
    /**
     * @param element
     * @private
     */
    deSelectItem(element: HTMLElement): void;
    /**
     * @param isTextSelect
     * @private
     */
    updateInteractionTools(isTextSelect: boolean): void;
    private initialEnableItems;
    private showSeparator;
    /**
     * @private
     */
    applyToolbarSettings(): void;
    /**
     * @private
     */
    applyToolbarSettingsForMobile(): void;
    private getStampMode;
    private stampBeforeOpen;
    private stampBeforeClose;
    /**
     * @private
     */
    updateStampItems(): void;
    private stampSelect;
    /**
     * @private
     */
    getModuleName(): string;
}
