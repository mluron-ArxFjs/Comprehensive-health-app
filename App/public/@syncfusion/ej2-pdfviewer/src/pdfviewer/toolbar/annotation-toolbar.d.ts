import { Toolbar as Tool } from '@syncfusion/ej2-navigations';
import { PdfViewer, PdfViewerBase, Toolbar } from '../index';
import { ColorPicker } from '@syncfusion/ej2-inputs';
/**
 * @hidden
 */
export declare class AnnotationToolbar {
    private pdfViewer;
    private pdfViewerBase;
    /**
     * @private
     */
    primaryToolbar: Toolbar;
    /**
     * @private
     */
    toolbarElement: HTMLElement;
    private highlightItem;
    private underlineItem;
    private strikethroughItem;
    private fontStyleStrikethroughItem;
    private fontStyleUnderlineItem;
    private deleteItem;
    private isSignatureIteam;
    /**
     * @private
     */
    freeTextEditItem: HTMLElement;
    /**
     * @private
     */
    colorDropDownElement: HTMLElement;
    /**
     * @private
     */
    colorDropDownElementInBlazor: HTMLElement;
    /**
     * @private
     */
    strokeDropDownElementInBlazor: HTMLElement;
    /**
     * @private
     */
    fontColorElementInBlazor: HTMLElement;
    private strokeDropDownElement;
    private thicknessElement;
    private shapeElement;
    private calibrateElement;
    private stampElement;
    private opacityDropDownElement;
    private colorDropDown;
    private opacityDropDown;
    private strokeDropDown;
    private thicknessDropDown;
    private shapeDropDown;
    private calibrateDropDown;
    private commentItem;
    private closeItem;
    private opacityIndicator;
    private thicknessIndicator;
    private HighlightElement;
    private UnderlineElement;
    private StrikethroughElement;
    private InkAnnotationElement;
    private FreeTextElement;
    /**
     * @private
     */
    toolbar: Tool;
    /**
     * @private
     */
    /**
    * @private
    */
    propertyToolbar: Tool;
    /**
     * @private
     */
    freeTextPropertyToolbar: Tool;
    /**
     * @private
     */
    stampPropertyToolbar: Tool;
    colorPalette: ColorPicker;
    private strokeColorPicker;
    private opacitySlider;
    private thicknessSlider;
    private toolbarBorderHeight;
    /**
     * @private
     */
    isToolbarHidden: boolean;
    /**
     * @private
     */
    isMobileAnnotEnabled: boolean;
    private isHighlightEnabled;
    private isUnderlineEnabled;
    private isStrikethroughEnabled;
    private isHighlightBtnVisible;
    private isCommentBtnVisible;
    private isUnderlineBtnVisible;
    private isStrikethroughBtnVisible;
    private isColorToolVisible;
    private isOpacityToolVisible;
    private isDeleteAnnotationToolVisible;
    private isCurrentAnnotationOpacitySet;
    private isStampBtnVisible;
    private isShapeBtnVisible;
    private isSignatureBtnVisible;
    private isInkBtnVisible;
    private isFontFamilyToolVisible;
    private isFontSizeToolVisible;
    private isFontAlignToolVisible;
    private isFontColorToolVisible;
    private isFontStylesToolVisible;
    private isCommentPanelBtnVisible;
    private isFreeTextBtnVisible;
    private isCalibrateBtnVisible;
    private isStrokeColorToolVisible;
    private isThicknessToolVisible;
    private menuItems;
    private fontSize;
    private fontFamily;
    private stampMenu;
    private stampParentID;
    private fontColorPalette;
    private fontFamilyElement;
    private fontSizeElement;
    private fontColorElement;
    private textAlignElement;
    private textPropElement;
    private lineElement;
    private arrowElement;
    private rectangleElement;
    private circleElement;
    private polygonElement;
    private calibrateDistance;
    private calibratePerimeter;
    private calibrateArea;
    private calibrateRadius;
    private calibrateVolume;
    private alignLeftElement;
    private alignRightElement;
    private alignCenterElement;
    private alignJustifyElement;
    private boldElement;
    private italicElement;
    private alignmentToolbar;
    private propertiesToolbar;
    private fontColorDropDown;
    private textAlignDropDown;
    private textPropertiesDropDown;
    /**
     * @private
     */
    handWrittenSignatureItem: HTMLElement;
    /**
     * @private
     */
    inkAnnotationItem: HTMLElement;
    /**
     * @private
     */
    inkAnnotationSelected: boolean;
    /**
     * @private
     */
    openSignaturePopup: boolean;
    private isSavedSignatureClicked;
    private saveSignatureCount;
    private saveInitialCount;
    private shapesItem;
    private calibrateItem;
    /**
     * @private
     */
    toolbarCreated: Boolean;
    /**
     * @private
     */
    isToolbarCreated: Boolean;
    /**
     * @private
     */
    textMarkupToolbarElement: HTMLElement;
    /**
     * @private
    */
    shapeToolbarElement: HTMLElement;
    private stampToolbarElement;
    private calibrateToolbarElement;
    private freetextToolbarElement;
    private signatureInkToolbarElement;
    constructor(viewer: PdfViewer, viewerBase: PdfViewerBase, toolbar: Toolbar);
    /**
     * @private
     */
    initializeAnnotationToolbar(): void;
    createMobileAnnotationToolbar(isEnable: boolean, isPath?: boolean): void;
    hideMobileAnnotationToolbar(): void;
    private FreeTextForMobile;
    /**
     * @private
     */
    createPropertyTools(shapeType: string): void;
    private showPropertyTool;
    private stampToolMobileForMobile;
    private shapeToolMobile;
    private calibrateToolMobile;
    private textMarkupForMobile;
    private showShapeTool;
    private signatureInkForMobile;
    private hideExistingTool;
    private applyProperiesToolSettings;
    private showImagePropertyTool;
    private showFreeTextPropertiesTool;
    private shapePropertiesTool;
    private showStampPropertiesTool;
    private showTextMarkupPropertiesTool;
    private showInkPropertiesTool;
    /**
     * @private
     */
    createAnnotationToolbarForMobile(id?: string): any[];
    /**
     * @private
     */
    adjustMobileViewer(): void;
    /**
     * Shows /hides the toolbar in the PdfViewer
     * @param  {boolean} enableToolbar - If set true , its show the Toolbar
     * @returns void
     */
    showToolbar(enable: Boolean): void;
    private createMobileToolbarItems;
    private goBackToToolbar;
    private createToolbarItems;
    private createSignContainer;
    private updateSignatureCount;
    private openSignature;
    private hoverSignatureDelete;
    private hoverInitialBtn;
    private hoverSignatureImage;
    private leaveSignatureDelete;
    private clickSignature;
    private clickInitial;
    private leaveSignatureImage;
    private addSignature;
    renderAddedSignature(): void;
    deleteSavedSign(event: any): void;
    private getTemplate;
    private createStampContainer;
    /**
     * @private
     */
    createCustomStampElement(): void;
    addStampImage: (args: any) => void;
    checkStampAnnotations(): void;
    private createDropDowns;
    private mobileColorpicker;
    private opacityDropDownOpen;
    private onColorPickerCancelClick;
    private onStrokePickerCancelClick;
    private colorDropDownBeforeOpen;
    /**
     * @private
     */
    setCurrentColorInPicker(): void;
    private colorDropDownOpen;
    private strokeDropDownBeforeOpen;
    private setCurrentStrokeColorInPicker;
    private strokeDropDownOpen;
    private popupPosition;
    private onFontColorChange;
    private onFontFamilyChange;
    private onFontSizeChange;
    private textAlignDropDownBeforeOpen;
    private textPropertiesDropDownBeforeOpen;
    private onClickTextAlignment;
    private onClickTextProperties;
    private opacityChange;
    private opacityDropDownBeforeOpen;
    private thicknessDropDownBeforeOpen;
    private thicknessDropDownOpen;
    private calculateToolbarPosition;
    private thicknessChangeInBlazor;
    private thicknessChange;
    private ShapeThickness;
    private createDropDownButton;
    private createShapeOptions;
    private createPropertyToolbarForMobile;
    private createStampToolbarItemsForMobile;
    private createShapeToolbarItemsForMobile;
    private createCalibrateToolbarItemsForMobile;
    private handleShapeTool;
    private createPropDropDownButton;
    private textAlignmentToolbarItems;
    private afterAlignmentToolbarCreation;
    private afterPropertiesToolbarCreation;
    private createDropDownListForSize;
    private createDropDownListForFamily;
    private textPropertiesToolbarItems;
    private createShapeToolbarItems;
    private createCalibrateToolbarItems;
    private onShapeToolbarClicked;
    private onCalibrateToolbarClicked;
    private onShapeDrawSelection;
    private afterCalibrateToolbarCreationForMobile;
    private afterShapeToolbarCreationForMobile;
    private afterShapeToolbarCreation;
    private afterCalibrateToolbarCreation;
    private afterMobileToolbarCreation;
    private createColorPicker;
    private onColorPickerChange;
    private onStrokePickerChange;
    /**
     * @param element
     * @param color
     * @param element
     * @param color
     * @private
     */
    updateColorInIcon(element: HTMLElement, color: string): void;
    /**
     * @param currentOption
     * @private
     */
    updateTextPropertySelection(currentOption: string): void;
    /**
     * @param family
     * @private
     */
    updateFontFamilyInIcon(family: string): void;
    /**
     * @param align
     * @private
     */
    updateTextAlignInIcon(align: string): void;
    /**
     * @param size
     * @private
     */
    updateFontSizeInIcon(size: number): void;
    private updateOpacityIndicator;
    private updateThicknessIndicator;
    private createSlider;
    private createThicknessSlider;
    private afterToolbarCreation;
    private onToolbarClicked;
    private addInkAnnotation;
    /**
     * @private
     */
    deselectInkAnnotation(): void;
    private drawInkAnnotation;
    resetFreeTextAnnot(): void;
    private updateInkannotationItems;
    private showSignaturepanel;
    private handleFreeTextEditor;
    private updateFontFamily;
    private updateFontFamilyIcon;
    /**
     * @param element
     * @param isInitialLoading
     * @param element
     * @param isInitialLoading
     * @private
     */
    showAnnotationToolbar(element?: HTMLElement, isInitialLoading?: boolean): void;
    private enablePropertiesTool;
    /**
     * @private
     */
    applyAnnotationToolbarSettings(): void;
    /**
     * @private
     */
    applyMobileAnnotationToolbarSettings(): void;
    private showStickyNoteToolInMobile;
    private showSeparatorInMobile;
    private showInkAnnotationTool;
    private showSeparator;
    private showHighlightTool;
    private showUnderlineTool;
    private showStrikethroughTool;
    private showShapeAnnotationTool;
    private showCalibrateAnnotationTool;
    private showFreeTextAnnotationTool;
    private showStampAnnotationTool;
    private showSignatureTool;
    private showInkTool;
    private showFontFamilyAnnotationTool;
    private showFontSizeAnnotationTool;
    private showFontAlignAnnotationTool;
    private showFontColorAnnotationTool;
    private showFontStylesAnnotationTool;
    private showColorEditTool;
    private showStrokeColorEditTool;
    private showThicknessEditTool;
    private showOpacityEditTool;
    private showAnnotationDeleteTool;
    private showCommentPanelTool;
    private applyHideToToolbar;
    /**
     * @param isAdjust
     * @private
     */
    adjustViewer(isAdjust: boolean): void;
    private updateContentContainerHeight;
    private getToolbarHeight;
    private getNavigationToolbarHeight;
    private handleHighlight;
    private handleUnderline;
    private handleStrikethrough;
    /**
     * @private
     */
    deselectAllItemsInBlazor(): void;
    /**
     * @private
     */
    deselectAllItems(): void;
    private updateInteractionTools;
    /**
     * @param isEnable
     * @private
     */
    selectAnnotationDeleteItem(isEnable: boolean, deleteIconCicked?: boolean): void;
    /**
     * @param isEnable
     * @private
     */
    enableTextMarkupAnnotationPropertiesTools(isEnable: boolean): void;
    private checkAnnotationPropertiesChange;
    /**
     * @param isEnable
     * @private
     */
    enableAnnotationPropertiesTools(isEnable: boolean): void;
    /**
     * @param isEnable
     * @private
     */
    enableSignaturePropertiesTools(isEnable: boolean): void;
    /**
     * @param isEnable
     * @private
     */
    enableStampAnnotationPropertiesTools(isEnable: boolean): void;
    /**
     * @param isEnable
     * @private
     */
    enableFreeTextAnnotationPropertiesTools(isEnable: boolean): void;
    /**
     * @param isEnable
     * @private
     */
    enableAnnotationAddTools(isEnable: boolean): void;
    /**
     * @private
     */
    isAnnotationButtonsEnabled(): boolean;
    /**
     * @param isEnable
     * @private
     */
    enableCommentPanelTool(isEnable: boolean): void;
    private updateToolbarItems;
    private enableTextMarkupAddTools;
    /**
     * @private
     */
    updateAnnnotationPropertyItems(): void;
    private getColorHexValue;
    private setColorInPicker;
    /**
     * @private
     */
    resetToolbar(): void;
    /**
     * @private
     */
    clearTextMarkupMode(): void;
    /**
     * @private
     */
    clearShapeMode(): void;
    /**
     * @private
     */
    clearMeasureMode(): void;
    /**
     * @private
     */
    clear(): void;
    /**
     * @private
     */
    destroy(): void;
    private destroyComponent;
    private destroyDependentComponent;
    private getElementHeight;
    private updateViewerHeight;
    private resetViewerHeight;
    /**
     * @private
     */
    afterAnnotationToolbarCreationInBlazor(): void;
    private addClassToToolbarInBlazor;
    private handleHighlightInBlazor;
    private handleUnderlineInBlazor;
    private handleStrikethroughInBlazor;
    private AnnotationSliderOpened;
    private DropDownOpened;
}
