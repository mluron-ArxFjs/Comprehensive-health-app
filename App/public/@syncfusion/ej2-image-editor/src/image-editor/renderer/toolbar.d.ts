import { ImageEditor } from '../index';
export declare class ToolbarModule {
    private parent;
    private defaultLocale;
    private defToolbarItems;
    private toolbarHeight;
    private zoomBtnHold;
    private l10n;
    private currToolbar;
    private preventZoomBtn;
    private currentToolbar;
    private selFhdColor;
    private preventEnableDisableUr;
    private lowerContext;
    private upperContext;
    private inMemoryCanvas;
    private inMemoryContext;
    constructor(parent: ImageEditor);
    destroy(): void;
    private addEventListener;
    private removeEventListener;
    private initLocale;
    private toolbar;
    private updatePrivateVariables;
    private reset;
    private destroyTopToolbar;
    private destroyBottomToolbar;
    private isToolbar;
    private createToolbar;
    private createContextualToolbar;
    private createBottomToolbar;
    private createQuickAccessToolbar;
    private initMainToolbar;
    private initBottomToolbar;
    private getLeftToolbarItem;
    private getRightToolbarItem;
    private getMainToolbarItem;
    private getZoomToolbarItem;
    private updateContextualToolbar;
    private processToolbar;
    private processSubToolbar;
    private wireZoomBtnEvents;
    private enableDisableTbrBtn;
    private createLeftToolbarControls;
    private fileSelect;
    private renderAnnotationBtn;
    private renderCropBtn;
    private renderTransformBtn;
    private renderSaveBtn;
    private getCropTransformToolbarItem;
    private getShapesToolbarItem;
    private initCropTransformToolbar;
    private getCurrentShapeIcon;
    private initShapesToolbarItem;
    private createShapeColor;
    private createShapeBtn;
    private createStartBtn;
    private createEndBtn;
    private getTextToolbarItem;
    private getFontFamilyItems;
    private initTextToolbarItem;
    private createTextColor;
    private createTextBtn;
    private refreshToolbar;
    private getAdjustmentToolbarItem;
    private getFilterToolbarItem;
    private getPenToolbarItem;
    private initPenToolbarItem;
    private createPenColor;
    private createPenBtn;
    private getPenStroke;
    private initAdjustmentToolbarItem;
    private initFilterToolbarItem;
    private createCanvasFilter;
    private updateFilterCanvas;
    private getQuickAccessToolbarItem;
    private renderQAT;
    private refreshDropDownBtn;
    private cropSelect;
    private quickAccessToolbarClicked;
    private defToolbarClicked;
    private performDefTbrClick;
    private contextualToolbarClicked;
    private refreshShapeDrawing;
    private zoomInBtnClickHandler;
    private zoomOutBtnClickHandler;
    private zoomInBtnMouseDownHandler;
    private zoomOutBtnMouseDownHandler;
    private zoomBtnMouseUpHandler;
    private closeContextualToolbar;
    private destroyQuickAccessToolbar;
    private renderSlider;
    private createSlider;
    private applyPreviewFilter;
    private unselectBtn;
    private openSlider;
    private refreshSlider;
    private updateToolbarItems;
    private getStrokeWidth;
    private cancelPan;
    private refreshMainToolbar;
    private destroySubComponents;
    private setInitialShapeSettings;
    getModuleName(): string;
}
