import { Component, INotifyPropertyChanged, ChildProperty, L10n } from '@syncfusion/ej2-base';
import { ModuleDeclaration, EmitType } from '@syncfusion/ej2-base';
import { PdfViewerModel, HighlightSettingsModel, UnderlineSettingsModel, StrikethroughSettingsModel, LineSettingsModel, ArrowSettingsModel, RectangleSettingsModel, CircleSettingsModel, PolygonSettingsModel, StampSettingsModel, StickyNotesSettingsModel, CustomStampSettingsModel, VolumeSettingsModel, RadiusSettingsModel, AreaSettingsModel, PerimeterSettingsModel, DistanceSettingsModel, MeasurementSettingsModel, FreeTextSettingsModel, AnnotationSelectorSettingsModel, TextSearchColorSettingsModel, DocumentTextCollectionSettingsModel, TextDataSettingsModel, RectangleBoundsModel, SignatureFieldSettingsModel, InitialFieldSettingsModel, SignatureIndicatorSettingsModel, TextFieldSettingsModel, PasswordFieldSettingsModel, CheckBoxFieldSettingsModel, RadioButtonFieldSettingsModel, DropdownFieldSettingsModel, ListBoxFieldSettingsModel, ItemModel, SignatureDialogSettingsModel } from './pdfviewer-model';
import { ToolbarSettingsModel, ShapeLabelSettingsModel } from './pdfviewer-model';
import { ServerActionSettingsModel, AjaxRequestSettingsModel, CustomStampModel, HandWrittenSignatureSettingsModel, AnnotationSettingsModel, TileRenderingSettingsModel, ScrollSettingsModel, FormFieldModel, InkAnnotationSettingsModel } from './pdfviewer-model';
import { IAnnotationPoint, IPoint, PdfViewerBase } from './index';
import { Navigation } from './index';
import { Magnification } from './index';
import { Toolbar } from './index';
import { ToolbarItem } from './index';
import { LinkTarget, InteractionMode, SignatureFitMode, AnnotationType, AnnotationToolbarItem, LineHeadStyle, ContextMenuAction, FontStyle, TextAlignment, AnnotationResizerShape, AnnotationResizerLocation, ZoomMode, PrintMode, CursorType, ContextMenuItem, DynamicStampItem, SignStampItem, StandardBusinessStampItem, FormFieldType, AllowedInteraction, AnnotationDataFormat, SignatureType, CommentStatus, SignatureItem, FormDesignerToolbarItem, DisplayMode, Visibility, FormFieldDataFormat } from './base/types';
import { Annotation } from './index';
import { LinkAnnotation } from './index';
import { ThumbnailView } from './index';
import { BookmarkView } from './index';
import { TextSelection } from './index';
import { TextSearch } from './index';
import { AccessibilityTags } from './index';
import { FormFields } from './index';
import { FormDesigner } from './index';
import { Print, CalibrationUnit } from './index';
import { UnloadEventArgs, LoadEventArgs, LoadFailedEventArgs, AjaxRequestFailureEventArgs, PageChangeEventArgs, PageClickEventArgs, ZoomChangeEventArgs, HyperlinkClickEventArgs, HyperlinkMouseOverArgs, ImportStartEventArgs, ImportSuccessEventArgs, ImportFailureEventArgs, ExportStartEventArgs, ExportSuccessEventArgs, ExportFailureEventArgs, AjaxRequestInitiateEventArgs, AjaxRequestSuccessEventArgs } from './index';
import { AnnotationAddEventArgs, AnnotationRemoveEventArgs, AnnotationPropertiesChangeEventArgs, AnnotationResizeEventArgs, AnnotationSelectEventArgs, AnnotationMoveEventArgs, AnnotationDoubleClickEventArgs, AnnotationMouseoverEventArgs, PageMouseoverEventArgs, AnnotationMouseLeaveEventArgs, ButtonFieldClickEventArgs } from './index';
import { TextSelectionStartEventArgs, TextSelectionEndEventArgs, DownloadStartEventArgs, DownloadEndEventArgs, ExtractTextCompletedEventArgs, PrintStartEventArgs, PrintEndEventArgs } from './index';
import { TextSearchStartEventArgs, TextSearchCompleteEventArgs, TextSearchHighlightEventArgs } from './index';
import { PdfAnnotationBase, ZOrderPageTable } from './drawing/pdf-annotation';
import { PdfAnnotationBaseModel, PdfFormFieldBaseModel } from './drawing/pdf-annotation-model';
import { Drawing, ClipBoardObject } from './drawing/drawing';
import { SelectorModel } from './drawing/selector-model';
import { PointModel, IElement, Rect, Point } from '@syncfusion/ej2-drawings';
import { ThumbnailClickEventArgs } from './index';
import { ValidateFormFieldsArgs, BookmarkClickEventArgs, AnnotationUnSelectEventArgs, BeforeAddFreeTextEventArgs, FormFieldFocusOutEventArgs, CommentEventArgs, FormFieldClickArgs, FormFieldAddArgs, FormFieldRemoveArgs, FormFieldPropertiesChangeArgs, FormFieldMouseLeaveArgs, FormFieldMouseoverArgs, FormFieldMoveArgs, FormFieldResizeArgs, FormFieldSelectArgs, FormFieldUnselectArgs, FormFieldDoubleClickArgs, AnnotationMovingEventArgs } from './base';
import { AddSignatureEventArgs, RemoveSignatureEventArgs, MoveSignatureEventArgs, SignaturePropertiesChangeEventArgs, ResizeSignatureEventArgs, SignatureSelectEventArgs } from './base';
import { ContextMenuSettingsModel } from './pdfviewer-model';
import { IFormField, IFormFieldBound } from './form-designer/form-designer';
/**
 * The `ToolbarSettings` module is used to provide the toolbar settings of PDF viewer.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the tool bar settings.
 *  viewer.toolbarSettings = {
 *      showTooltip: false,
 *      toolbarItems: [
 *          "OpenOption",
 *          "UndoRedoTool",
 *          "PageNavigationTool",
 *          "MagnificationTool",
 *          "PanTool",
 *          "SelectionTool",
 *          "CommentTool",
 *          "SubmitForm",
 *          "AnnotationEditTool",
 *          "FormDesignerEditTool",
 *          "FreeTextAnnotationOption",
 *          "InkAnnotationOption",
 *          "ShapeAnnotationOption",
 *          "StampAnnotation",
 *          "SignatureOption",
 *          "SearchOption",
 *          "PrintOption",
 *          "DownloadOption"
 *      ],
 *      annotationToolbarItems: [
 *          "HighlightTool",
 *          "UnderlineTool",
 *          "StrikethroughTool",
 *          "ColorEditTool",
 *          "OpacityEditTool",
 *          "AnnotationDeleteTool",
 *          "StampAnnotationTool",
 *          "HandWrittenSignatureTool",
 *          "InkAnnotationTool",
 *          "ShapeTool",
 *          "CalibrateTool",
 *          "StrokeColorEditTool",
 *          "ThicknessEditTool",
 *          "FreeTextAnnotationTool",
 *          "FontFamilyAnnotationTool",
 *          "FontSizeAnnotationTool",
 *          "FontStylesAnnotationTool",
 *          "FontAlignAnnotationTool",
 *          "FontColorAnnotationTool",
 *          "CommentPanelTool"
 *      ],
 *      formDesignerToolbarItems: [
 *          "TextboxTool",
 *          "PasswordTool",
 *          "CheckBoxTool",
 *          "RadioButtonTool",
 *          "DropdownTool",
 *          "ListboxTool",
 *          "DrawSignatureTool",
 *          "DeleteTool"
 *      ]
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class ToolbarSettings extends ChildProperty<ToolbarSettings> {
    /**
     * Enable or disables the toolbar of PdfViewer.
     */
    showTooltip: boolean;
    /**
     * shows only the defined options in the PdfViewer.
     */
    toolbarItems: ToolbarItem[];
    /**
     * Provide option to customize the annotation toolbar of the PDF Viewer.
     */
    annotationToolbarItems: AnnotationToolbarItem[];
    /**
     * Customize the tools to be exposed in the form designer toolbar.
     */
    formDesignerToolbarItems: FormDesignerToolbarItem[];
}
/**
 * The `AjaxRequestSettings` module is used to set the ajax Request Headers of PDF viewer.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // HTTP header "X-Custom-Header": "Custom header value" // Custom HTTP header
 *  viewer.ajaxRequestSettings = {
 *      ajaxHeaders: [
 *          {
 *              headerName : "Authorization",
 *              headerValue : "Bearer"
 *          }
 *      ],
 *      withCredentials: false
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class AjaxRequestSettings extends ChildProperty<AjaxRequestSettings> {
    /**
     * set the ajax Header values in the PdfViewer.
     */
    ajaxHeaders: IAjaxHeaders[];
    /**
     * set the ajax credentials for the pdfviewer.
     */
    withCredentials: boolean;
}
export interface IAjaxHeaders {
    /**
     * specifies the ajax Header Name of the PdfViewer.
     */
    headerName: string;
    /**
     * specifies the ajax Header Value of the PdfViewer.
     */
    headerValue: string;
}
/**
 * The `CustomStamp` module is used to provide the custom stamp added in stamp menu of the PDF Viewer toolbar.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Add your custom stamp image source as base64 image.
 *  viewer.customStamp = [
 *       {
 *          customStampName: 'Sample',
 *          customStampImageSource: "data:image/png;base64, Syncfusion pdf viewer"
 *      }
 *  ];
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class CustomStamp extends ChildProperty<CustomStamp> {
    /**
     * Defines the custom stamp name to be added in stamp menu of the PDF Viewer toolbar.
     */
    customStampName: string;
    /**
     * Defines the custom stamp images source to be added in stamp menu of the PDF Viewer toolbar.
     */
    customStampImageSource: string;
}
/**
 * The `AnnotationToolbarSettings` module is used to provide the annotation toolbar settings of the PDF viewer.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the annotation tool bar settings.
 *  viewer.toolbarSettings = {
 *      showTooltip: false,
 *      annotationToolbarItems: [
 *          "HighlightTool",
 *          "UnderlineTool",
 *          "StrikethroughTool",
 *          "ColorEditTool",
 *          "OpacityEditTool",
 *          "AnnotationDeleteTool",
 *          "StampAnnotationTool",
 *          "HandWrittenSignatureTool",
 *          "InkAnnotationTool",
 *          "ShapeTool",
 *          "CalibrateTool",
 *          "StrokeColorEditTool",
 *          "ThicknessEditTool",
 *          "FreeTextAnnotationTool",
 *          "FontFamilyAnnotationTool",
 *          "FontSizeAnnotationTool",
 *          "FontStylesAnnotationTool",
 *          "FontAlignAnnotationTool",
 *          "FontColorAnnotationTool",
 *          "CommentPanelTool"
 *      ],
 *  };
 * viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class AnnotationToolbarSettings extends ChildProperty<AnnotationToolbarSettings> {
    /**
     * Enable or disables the tooltip of the toolbar.
     */
    showTooltip: boolean;
    /**
     * shows only the defined options in the PdfViewer.
     */
    annotationToolbarItem: AnnotationToolbarItem[];
}
/**
 * The `FormDesignerToolbarSettings` module is used to provide the Form designer toolbar settings of the PDF viewer.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the form field tool bar settings.
 *  viewer.toolbarSettings = {
 *      showTooltip: false,
 *      formDesignerToolbarItems: [
 *          "TextboxTool",
 *          "PasswordTool",
 *          "CheckBoxTool",
 *          "RadioButtonTool",
 *          "DropdownTool",
 *          "ListboxTool",
 *          "DrawSignatureTool",
 *          "DeleteTool"
 *      ]
 *  };
 * viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class FormDesignerToolbarSettings extends ChildProperty<FormDesignerToolbarSettings> {
    /**
     * Enable or disables the tooltip of the toolbar.
     */
    showTooltip: boolean;
    /**
     * shows only the defined options in the PdfViewer.
     */
    formDesignerToolbarItem: FormDesignerToolbarItem[];
}
/**
 * The `SignatureFieldSettings` module is used to set the properties of signature field in PDF Viewer
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the signature field settings.
 *  viewer.signatureFieldSettings = {
 *      name: "",
 *      isReadOnly: true,
 *      visibility: "visible",
 *      isRequired: true,
 *      isPrint: false,
 *      tooltip: "",
 *      thickness: 1,
 *      signatureIndicatorSettings: {
 *          opacity: 1,
 *          backgroundColor: "orange",
 *          width: 19,
 *          height: 10,
 *          fontSize: 10,
 *          text: null,
 *          color: "black"
 *      },
 *      signatureDialogSettings: {
 *          displayMode: DisplayMode.Draw | DisplayMode.Text | DisplayMode.Upload,
 *          hideSaveSignature: false
 *      }
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class SignatureFieldSettings extends ChildProperty<SignatureFieldSettings> {
    /**
     * Get or set the form field bounds.
     */
    bounds: IFormFieldBound;
    /**
     * Get or set the name of the form field element.
     */
    name: string;
    /**
     * Specifies whether the signature field is in read-only or read-write mode. FALSE by default.
     */
    isReadOnly: boolean;
    /**
     * Gets or set the visibility of the form field.
     */
    visibility: Visibility;
    /**
     * If it is set as true, consider as mandatory field in the PDF document. By default it is false.
     */
    isRequired: boolean;
    /**
     * Get or set the boolean value to print the signature field. TRUE by default.
     */
    isPrint: boolean;
    /**
     * Get or set the text to be displayed as tooltip. By default it is empty.
     */
    tooltip: string;
    /**
      * Get or set the thickness of the Signature field. Default value is 1. To hide the borders, set the value to 0 (zero).
      */
    thickness: number;
    /**
     * specifies the page number of the form field.
     */
    pageNumber: number;
    /**
     * Specifies the properties of the signature Dialog Settings in the signature field.
     */
    signatureDialogSettings: SignatureDialogSettingsModel;
    /**
     * Specifies the properties of the signature indicator in the signature field.
     */
    signatureIndicatorSettings: SignatureIndicatorSettingsModel;
}
/**
 * The `InitialFieldSettings` module is used to set the properties of initial field in PDF Viewer
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Changes the initial field settings.
 *  viewer.initialFieldSettings = {
 *      name: "",
 *      isReadOnly: true,
 *      visibility: "visible",
 *      isRequired: true,
 *      isPrint: true,
 *      tooltip: "",
 *      thickness: 1,
 *      initialIndicatorSettings: {
 *          opacity: 1,
 *          backgroundColor: "orange",
 *          width: 19,
 *          height: 10,
 *          fontSize: 10,
 *          text: null,
 *          color: "black"
 *      },
 *      initialDialogSettings: {
 *         displayMode: DisplayMode.Draw | DisplayMode.Text | DisplayMode.Upload,
 *          hideSaveSignature: false
 *      }
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class InitialFieldSettings extends ChildProperty<InitialFieldSettings> {
    /**
     * Get or set the form field bounds.
     */
    bounds: IFormFieldBound;
    /**
     * Get or set the name of the form field element.
     */
    name: string;
    /**
     * Specifies whether the initial field is in read-only or read-write mode. FALSE by default.
     */
    isReadOnly: boolean;
    /**
     * Gets or set the visibility of the form field.
     */
    visibility: Visibility;
    /**
     * If it is set as true, consider as mandatory field in the PDF document. By default it is false.
     */
    isRequired: boolean;
    /**
     * Get or set the boolean value to print the initial field. TRUE by default.
     */
    isPrint: boolean;
    /**
     * Get or set the text to be displayed as tooltip. By default it is empty.
     */
    tooltip: string;
    /**
    * Get or set the thickness of the Initial field. Default value is 1. To hide the borders, set the value to 0 (zero).
    */
    thickness: number;
    /**
     * specifies the page number of the form field.
     */
    pageNumber: number;
    /**
     * Gets or sets the initial field type of the signature field.
     */
    isInitialField: boolean;
    /**
     * Get or set the signature dialog settings for initial field.
     */
    initialDialogSettings: SignatureDialogSettingsModel;
    /**
     * Specifies the properties of the signature indicator in the initial field.
     */
    initialIndicatorSettings: SignatureIndicatorSettingsModel;
}
/**
 * The `SignatureIndicatorSettings` module is used to provide the properties of signature Indicator in the signature field.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the signature indicator settings.
 *  viewer.signatureFieldSettings = {
 *      signatureIndicatorSettings: {
 *          opacity: 1,
 *          backgroundColor: 'orange',
 *          width: 19,
 *          height: 10,
 *          fontSize: 10,
 *          text: null,
 *          color: 'black'
 *      }
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class SignatureIndicatorSettings extends ChildProperty<SignatureIndicatorSettings> {
    /**
     * Specifies the opacity of the signature indicator.
     */
    opacity: number;
    /**
     * Specifies the color of the signature indicator.
     */
    backgroundColor: string;
    /**
     * Specifies the width of the signature indicator. Maximum width is half the width of the signature field.
     * Minimum width is the default value.
     */
    width: number;
    /**
     * Specifies the height of the signature indicator. Maximum height is half the height of the signature field.
     * Minimum height is the default value.
     */
    height: number;
    /**
     * Specifies the signature Indicator's font size. The maximum size of the font is half the height of the signature field.
     */
    fontSize: number;
    /**
     * Specifies the text of the signature Indicator.
     */
    text: string;
    /**
     * Specifies the color of the text of signature indicator.
     */
    color: string;
}
/**
 * The `SignatureDialogSettings` module is used to customize the signature dialog box.
 *
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the signature dialog settings.
 *  viewer.signatureDialogSettings = {
 *      displayMode: DisplayMode.Draw | DisplayMode.Text | DisplayMode.Upload,
 *      hideSaveSignature: true
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class SignatureDialogSettings extends ChildProperty<SignatureDialogSettings> {
    /**
     * Get or set the required signature options will be enabled in the signature dialog.
     */
    displayMode: DisplayMode;
    /**
     * Get or set a boolean value to show or hide the save signature check box option in the signature dialog. FALSE by default.
     */
    hideSaveSignature: boolean;
}
/**
 * The `ServerActionSettings` module is used to provide the server action methods of PDF viewer.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the server action settings.
 *  viewer.serverActionSettings = {
 *      load: "Load",
 *      renderPages: "RenderPdfPages",
 *      unload: "Unload",
 *      download: "Download",
 *      renderThumbnail: "RenderThumbnailImages",
 *      print: "PrintImages",
 *      renderComments: "RenderAnnotationComments",
 *      importAnnotations: "ImportAnnotations",
 *      exportAnnotations: "ExportAnnotations",
 *      importFormFields: "ImportFormFields",
 *      exportFormFields: "ExportFormFields",
 *      renderTexts: "RenderPdfTexts"
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class ServerActionSettings extends ChildProperty<ServerActionSettings> {
    /**
     * specifies the load action of PdfViewer.
     */
    load: string;
    /**
     * specifies the unload action of PdfViewer.
     */
    unload: string;
    /**
     * specifies the render action of PdfViewer.
     */
    renderPages: string;
    /**
     * specifies the print action of PdfViewer.
     */
    print: string;
    /**
     * specifies the download action of PdfViewer.
     */
    download: string;
    /**
     * specifies the download action of PdfViewer.
     */
    renderThumbnail: string;
    /**
     * specifies the annotation comments action of PdfViewer.
     */
    renderComments: string;
    /**
     * specifies the imports annotations action of PdfViewer.
     */
    importAnnotations: string;
    /**
     * specifies the export annotations action of PdfViewer.
     */
    exportAnnotations: string;
    /**
     * specifies the imports action of PdfViewer.
     */
    importFormFields: string;
    /**
     * specifies the export action of PdfViewer.
     */
    exportFormFields: string;
    /**
     * specifies the export action of PdfViewer.
     */
    renderTexts: string;
}
/**
 * The `StrikethroughSettings` module is used to provide the properties to Strikethrough annotation.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the strike through annotation settings.
 *  viewer.strikethroughSettings = {
 *      opacity: 1,
 *      color: '#ff0000',
 *      author: 'Guest',
 *      annotationSelectorSettings: {
 *          selectionBorderColor: '',
 *          resizerBorderColor: 'black',
 *          resizerFillColor: '#FF4081',
 *          resizerSize: 8,
 *          selectionBorderThickness: 1,
 *          resizerShape: 'Square',
 *          selectorLineDashArray: [],
 *          resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges
 *      },
 *      isLock: false,
 *      enableMultiPageAnnotation: false,
 *      enableTextMarkupResizer: false,
 *      allowedInteractions: ['None'],
 *      isPrint: true
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class StrikethroughSettings extends ChildProperty<StrikethroughSettings> {
    /**
    * Get or set page number of the annotation.
    */
    pageNumber: number;
    /**
     * Get or set bounds of the annotation.
     *
     * @default []
     */
    bounds: IAnnotationPoint[];
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the color of the annotation.
     */
    color: string;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specifies the annotation selector settings of the annotation.
     */
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    /**
     * specifies the custom data of the annotation.
     */
    customData: object;
    /**
     * specifies the locked action of the annotation.
     */
    isLock: boolean;
    /**
     * Enables or disables the multi-page text markup annotation selection in UI.
     *
     * @default false
     */
    enableMultiPageAnnotation: boolean;
    /**
     * Enable or disable the text markup resizer to modify the bounds in UI.
     *
     * @default false
     */
    enableTextMarkupResizer: boolean;
    /**
     * Gets or sets the allowed interactions for the locked strikethrough annotations.
     * IsLock can be configured using strikethrough settings.
     *
     * @default ['None']
     */
    allowedInteractions: AllowedInteraction[];
    /**
     * specifies whether the individual annotations are included or not in print actions.
     */
    isPrint: boolean;
}
/**
 * The `UnderlineSettings` module is used to provide the properties to Underline annotation.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the underline annotation settings.
 *  viewer.underlineSettings = {
 *      opacity: 1,
 *      color: '#9c2592',
 *      author: 'Guest',
 *      annotationSelectorSettings: {
 *          selectionBorderColor: '',
 *          resizerBorderColor: 'black',
 *          resizerFillColor: '#FF4081',
 *          resizerSize: 8,
 *          selectionBorderThickness: 1,
 *          resizerShape: 'Square',
 *          selectorLineDashArray: [],
 *          resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges
 *      },
 *      isLock: false,
 *      enableMultiPageAnnotation: false,
 *      enableTextMarkupResizer: false,
 *      allowedInteractions: ['None'],
 *      isPrint: true
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class UnderlineSettings extends ChildProperty<UnderlineSettings> {
    /**
    * Get or set page number of the annotation.
    */
    pageNumber: number;
    /**
     * Get or set bounds of the annotation.
     *
     * @default []
     */
    bounds: IAnnotationPoint[];
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the color of the annotation.
     */
    color: string;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specifies the annotation selector settings of the annotation.
     */
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    /**
     * specifies the custom data of the annotation.
     */
    customData: object;
    /**
     * specifies the locked action of the annotation.
     */
    isLock: boolean;
    /**
     * Enables or disables the multi-page text markup annotation selection in UI.
     *
     * @default false
     */
    enableMultiPageAnnotation: boolean;
    /**
     * Enable or disable the text markup resizer to modify the bounds in UI.
     *
     * @default false
     */
    enableTextMarkupResizer: boolean;
    /**
     * Gets or sets the allowed interactions for the locked underline annotations.
     * IsLock can be configured using underline settings.
     *
     * @default ['None']
     */
    allowedInteractions: AllowedInteraction[];
    /**
     * specifies whether the individual annotations are included or not in print actions.
     */
    isPrint: boolean;
}
/**
 * The `HighlightSettings` module is used to provide the properties to Highlight annotation.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the highlight annotation settings.
 *  viewer.highlightSettings = {
 *      opacity: 1,
 *      color: '#ff0000',
 *      author: 'Guest',
 *      annotationSelectorSettings: {
 *          selectionBorderColor: '',
 *          resizerBorderColor: 'black',
 *          resizerFillColor: '#FF4081',
 *          resizerSize: 8,
 *          selectionBorderThickness: 1,
 *          resizerShape: 'Square',
 *          selectorLineDashArray: [],
 *          resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges
 *      },
 *      isLock: false,
 *      enableMultiPageAnnotation: false,
 *      enableTextMarkupResizer: false,
 *      allowedInteractions: ['None'],
 *      isPrint: true
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class HighlightSettings extends ChildProperty<HighlightSettings> {
    /**
    * Get or set page number of the annotation.
    */
    pageNumber: number;
    /**
     * Get or set bounds of the annotation.
     *
     * @default []
     */
    bounds: IAnnotationPoint[];
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the color of the annotation.
     */
    color: string;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specifies the annotation selector settings of the annotation.
     */
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    /**
     * specifies the custom data of the annotation.
     */
    customData: object;
    /**
     * specifies the locked action of the annotation.
     */
    isLock: boolean;
    /**
     * Enables or disables the multi-page text markup annotation selection in UI.
     *
     * @default false
     */
    enableMultiPageAnnotation: boolean;
    /**
     * Enable or disable the text markup resizer to modify the bounds in UI.
     *
     * @default false
     */
    enableTextMarkupResizer: boolean;
    /**
     * Gets or sets the allowed interactions for the locked highlight annotations.
     * IsLock can be configured using highlight settings.
     *
     * @default ['None']
     */
    allowedInteractions: AllowedInteraction[];
    /**
     * specifies whether the individual annotations are included or not in print actions.
     */
    isPrint: boolean;
}
/**
 * The `LineSettings` module is used to provide the properties to line annotation.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the line annotation settings.
 *  viewer.lineSettings = {
 *      opacity: 1,
 *      color: '#9c2592',
 *      author: 'Guest',
 *      annotationSelectorSettings: {
 *          selectionBorderColor: '',
 *          resizerBorderColor: 'black',
 *          resizerFillColor: '#FF4081',
 *          resizerSize: 8,
 *          selectionBorderThickness: 1,
 *          resizerShape: 'Square',
 *          selectorLineDashArray: [],
 *          resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges
 *      },
 *      isLock: false,
 *      enableMultiPageAnnotation: false,
 *      enableTextMarkupResizer: false,
 *      allowedInteractions: ['None'],
 *      isPrint: true
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class LineSettings extends ChildProperty<LineSettings> {
    /**
     * Get or set offset of the annotation.
     */
    offset: IPoint;
    /**
     * Get or set page number of the annotation.
     */
    pageNumber: number;
    /**
     * Get or set vertex points of the annotation.
     *
     * @default []
     */
    vertexPoints?: PointModel[];
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the fill color of the annotation.
     */
    fillColor: string;
    /**
     * specifies the stroke color of the annotation.
     */
    strokeColor: string;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specified the thickness of the annotation.
     */
    thickness: number;
    /**
     * specifies the line head start style of the annotation.
     */
    lineHeadStartStyle: LineHeadStyle;
    /**
     * specifies the line head end style of the annotation.
     */
    lineHeadEndStyle: LineHeadStyle;
    /**
     * specifies the border dash array  of the annotation.
     */
    borderDashArray: number;
    /**
     * specifies the annotation selector settings of the annotation.
     */
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    /**
     * specifies the minHeight of the annotation.
     */
    minHeight: number;
    /**
     * specifies the minWidth of the annotation.
     */
    minWidth: number;
    /**
     * specifies the minHeight of the annotation.
     */
    maxHeight: number;
    /**
     * specifies the maxWidth of the annotation.
     */
    maxWidth: number;
    /**
     * specifies the locked action of the annotation.
     */
    isLock: boolean;
    /**
     * specifies the custom data of the annotation.
     */
    customData: object;
    /**
     * Gets or sets the allowed interactions for the locked highlight annotations.
     * IsLock can be configured using line settings.
     *
     * @default ['None']
     */
    allowedInteractions: AllowedInteraction[];
    /**
     * specifies whether the individual annotations are included or not in print actions.
     */
    isPrint: boolean;
}
/**
 * The `ArrowSettings` module is used to provide the properties to arrow annotation.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the arrow annotation settings.
 *  viewer.arrowSettings = {
 *      opacity: 1,
 *      fillColor: '#9c2592',
 *      strokeColor: '#ff0000',
 *      author: 'Guest',
 *      thickness: 1,
 *      borderDashArray: 0,
 *      lineHeadStartStyle: 'Closed',
 *      lineHeadEndStyle: 'Closed',
 *      annotationSelectorSettings: {
 *          selectionBorderColor: '',
 *          resizerBorderColor: 'black',
 *          resizerFillColor: '#FF4081',
 *          resizerSize: 8,
 *          selectionBorderThickness: 1,
 *          resizerShape: 'Square',
 *          selectorLineDashArray: [],
 *          resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges,
 *          resizerCursorType: null
 *      },
 *      minHeight: 0,
 *      minWidth: 0,
 *      maxWidth: 0,
 *      maxHeight: 0,
 *      isLock: false,
 *      allowedInteractions: ['None'],
 *      isPrint: true
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class ArrowSettings extends ChildProperty<ArrowSettings> {
    /**
     * Get or set offset of the annotation.
     */
    offset: IPoint;
    /**
      * Get or set page number of the annotation.
      */
    pageNumber: number;
    /**
     * Get or set vertex points of the annotation.
     *
     * @default []
     */
    vertexPoints?: PointModel[];
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the fill color of the annotation.
     */
    fillColor: string;
    /**
     * specifies the stroke color of the annotation.
     */
    strokeColor: string;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specified the thickness of the annotation.
     */
    thickness: number;
    /**
     * specifies the line head start style of the annotation.
     */
    lineHeadStartStyle: LineHeadStyle;
    /**
     * specifies the line head start style of the annotation.
     */
    lineHeadEndStyle: LineHeadStyle;
    /**
     * specifies the border dash array  of the annotation.
     */
    borderDashArray: number;
    /**
     * specifies the annotation selector settings of the annotation.
     */
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    /**
     * specifies the minHeight of the annotation.
     */
    minHeight: number;
    /**
     * specifies the minWidth of the annotation.
     */
    minWidth: number;
    /**
     * specifies the minHeight of the annotation.
     */
    maxHeight: number;
    /**
     * specifies the maxWidth of the annotation.
     */
    maxWidth: number;
    /**
     * specifies the locked action of the annotation.
     */
    isLock: boolean;
    /**
     * specifies the custom data of the annotation.
     */
    customData: object;
    /**
     * Gets or sets the allowed interactions for the locked arrow annotations.
     * IsLock can be configured using arrow settings.
     *
     * @default ['None']
     */
    allowedInteractions: AllowedInteraction[];
    /**
     * specifies whether the individual annotations are included or not in print actions.
     */
    isPrint: boolean;
}
/**
 * The `RectangleSettings` module is used to provide the properties to rectangle annotation.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the rectangle annotation settings.
 *  viewer.rectangleSettings = {
 *      opacity: 1,
 *      fillColor: '#9c2592',
 *      strokeColor: '#ff0000',
 *      author: 'Guest',
 *      thickness: 1,
 *      annotationSelectorSettings: {
 *          selectionBorderColor: '',
 *          resizerBorderColor: 'black',
 *          resizerFillColor: '#FF4081',
 *          resizerSize: 8,
 *          selectionBorderThickness: 1,
 *          resizerShape: 'Square',
 *          selectorLineDashArray: [],
 *          resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges,
 *          resizerCursorType: null
 *      },
 *      minHeight: 0,
 *      minWidth: 0,
 *      maxWidth: 0,
 *      maxHeight: 0,
 *      isLock: false,
 *      allowedInteractions: ['None'],
 *      isPrint: true
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class RectangleSettings extends ChildProperty<RectangleSettings> {
    /**
     * Get or set offset of the annotation.
     */
    offset: IPoint;
    /**
     * Get or set page number of the annotation.
     */
    pageNumber: number;
    /**
     * specifies the width of the annotation.
     */
    width: number;
    /**
     * specifies the height of the annotation.
     */
    height: number;
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the fill color of the annotation.
     */
    fillColor: string;
    /**
     * specifies the stroke color of the annotation.
     */
    strokeColor: string;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specified the thickness of the annotation.
     */
    thickness: number;
    /**
     * specifies the annotation selector settings of the annotation.
     */
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    /**
     * specifies the minHeight of the annotation.
     */
    minHeight: number;
    /**
     * specifies the minWidth of the annotation.
     */
    minWidth: number;
    /**
     * specifies the minHeight of the annotation.
     */
    maxHeight: number;
    /**
     * specifies the maxWidth of the annotation.
     */
    maxWidth: number;
    /**
     * specifies the locked action of the annotation.
     */
    isLock: boolean;
    /**
     * specifies the custom data of the annotation.
     */
    customData: object;
    /**
     * Gets or sets the allowed interactions for the locked rectangle annotations.
     * IsLock can be configured using rectangle settings.
     *
     * @default ['None']
     */
    allowedInteractions: AllowedInteraction[];
    /**
     * specifies whether the individual annotations are included or not in print actions.
     */
    isPrint: boolean;
}
/**
 * The `CircleSettings` module is used to provide the properties to circle annotation.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the circle annotation settings.
 *  viewer.circleSettings = {
 *      opacity: 1,
 *      fillColor: '#9c2592',
 *      strokeColor: '#ff0000',
 *      author: 'Guest',
 *      thickness: 1,
 *      annotationSelectorSettings: {
 *          selectionBorderColor: '',
 *          resizerBorderColor: 'black',
 *          resizerFillColor: '#FF4081',
 *          resizerSize: 8,
 *          selectionBorderThickness: 1,
 *          resizerShape: 'Square',
 *          selectorLineDashArray: [],
 *          resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges,
 *          resizerCursorType: null
 *      },
 *      minHeight: 0,
 *      minWidth: 0,
 *      maxWidth: 0,
 *      maxHeight: 0,
 *      isLock: false,
 *      allowedInteractions: ['None'],
 *      isPrint: true
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class CircleSettings extends ChildProperty<CircleSettings> {
    /**
     * Get or set offset of the annotation.
     */
    offset: IPoint;
    /**
     * Get or set page number of the annotation.
     */
    pageNumber: number;
    /**
     * specifies the width of the annotation.
     */
    width: number;
    /**
     * specifies the height of the annotation.
     */
    height: number;
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the fill color of the annotation.
     */
    fillColor: string;
    /**
     * specifies the stroke color of the annotation.
     */
    strokeColor: string;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specified the thickness of the annotation.
     */
    thickness: number;
    /**
     * specifies the annotation selector settings of the annotation.
     */
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    /**
     * specifies the minHeight of the annotation.
     */
    minHeight: number;
    /**
     * specifies the minWidth of the annotation.
     */
    minWidth: number;
    /**
     * specifies the minHeight of the annotation.
     */
    maxHeight: number;
    /**
     * specifies the maxWidth of the annotation.
     */
    maxWidth: number;
    /**
     * specifies the locked action of the annotation.
     */
    isLock: boolean;
    /**
     * specifies the custom data of the annotation.
     */
    customData: object;
    /**
     * Gets or sets the allowed interactions for the locked circle annotations.
     * IsLock can be configured using circle settings.
     *
     * @default ['None']
     */
    allowedInteractions: AllowedInteraction[];
    /**
     * specifies whether the individual annotations are included or not in print actions.
     */
    isPrint: boolean;
}
/**
 * The `ShapeLabelSettings` module is used to provide the properties to rectangle annotation.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the shape label settings.
 *  viewer.shapeLabelSettings = {
 *      opacity: 1,
 *      fillColor: '#9c2592',
 *      borderColor: '#ff0000',
 *      fontColor: '#000',
 *      fontSize: 16,
 *      labelHeight: 24.6,
 *      labelMaxWidth: 151,
 *      labelContent: 'Label'
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class ShapeLabelSettings extends ChildProperty<ShapeLabelSettings> {
    /**
     * specifies the opacity of the label.
     */
    opacity: number;
    /**
     * specifies the fill color of the label.
     */
    fillColor: string;
    /**
     * specifies the border color of the label.
     */
    fontColor: string;
    /**
     * specifies the font size of the label.
     */
    fontSize: number;
    /**
     * specifies the max-width of the label.
     */
    fontFamily: string;
    /**
     * specifies the default content of the label.
     */
    labelContent: string;
    /**
     * specifies the default content of the label.
     */
    notes: string;
}
/**
 * The `PolygonSettings` module is used to provide the properties to polygon annotation.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the polygon annotation settings.
 *  viewer.polygonSettings = {
 *      opacity: 1,
 *      fillColor: '#4070FF',
 *      strokeColor: '#ff0000',
 *      author: 'Guest',
 *      thickness: 1,
 *      annotationSelectorSettings: {
 *          selectionBorderColor: '',
 *          resizerBorderColor: 'black',
 *          resizerFillColor: '#FF4081',
 *          resizerSize: 8,
 *          selectionBorderThickness: 1,
 *          resizerShape: 'Square',
 *          selectorLineDashArray: [],
 *          resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges,
 *          resizerCursorType: null
 *      },
 *      minHeight: 0,
 *      minWidth: 0,
 *      maxWidth: 0,
 *      maxHeight: 0,
 *      isLock: false,
 *      allowedInteractions: ['None'],
 *      isPrint: true
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class PolygonSettings extends ChildProperty<PolygonSettings> {
    /**
     * Get or set offset of the annotation.
     */
    offset: IPoint;
    /**
     * Get or set page number of the annotation.
     */
    pageNumber: number;
    /**
     * Get or set vertex points of the annotation.
     *
     * @default []
     */
    vertexPoints?: PointModel[];
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the fill color of the annotation.
     */
    fillColor: string;
    /**
     * specifies the stroke color of the annotation.
     */
    strokeColor: string;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specified the thickness of the annotation.
     */
    thickness: number;
    /**
     * specifies the annotation selector settings of the annotation.
     */
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    /**
     * specifies the minHeight of the annotation.
     */
    minHeight: number;
    /**
     * specifies the minWidth of the annotation.
     */
    minWidth: number;
    /**
     * specifies the minHeight of the annotation.
     */
    maxHeight: number;
    /**
     * specifies the maxWidth of the annotation.
     */
    maxWidth: number;
    /**
     * specifies the locked action of the annotation.
     */
    isLock: boolean;
    /**
     * specifies the custom data of the annotation.
     */
    customData: object;
    /**
     * Gets or sets the allowed interactions for the locked polygon annotations.
     * IsLock can be configured using polygon settings.
     *
     * @default ['None']
     */
    allowedInteractions: AllowedInteraction[];
    /**
     * specifies whether the individual annotations are included or not in print actions.
     */
    isPrint: boolean;
}
/**
 * The `stampSettings` module is used to provide the properties to stamp annotation.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the stamp annotation settings.
 *  viewer.stampSettings = {
 *      opacity: 1,
 *      author: 'Guest',
 *      annotationSelectorSettings: {
 *          selectionBorderColor: '',
 *          resizerBorderColor: 'red',
 *          resizerFillColor: '#FF4081',
 *          resizerSize: 8,
 *          selectionBorderThickness: 5,
 *          resizerShape: 'Circle',
 *          selectorLineDashArray: [],
 *          resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges,
 *          resizerCursorType: null
 *      },
 *      minHeight: 0,
 *      minWidth: 0,
 *      maxWidth: 0,
 *      maxHeight: 0,
 *      isLock: false,
 *      dynamicStamps: [
 *          DynamicStampItem.Revised,
 *          DynamicStampItem.Reviewed,
 *          DynamicStampItem.Received,
 *          DynamicStampItem.Confidential,
 *          DynamicStampItem.Approved,
 *          DynamicStampItem.NotApproved
 *      ],
 *      signStamps: [
 *          SignStampItem.Witness,
 *          SignStampItem.InitialHere,
 *          SignStampItem.SignHere,
 *          SignStampItem.Accepted,
 *          SignStampItem.Rejected
 *      ],
 *      standardBusinessStamps: [
 *          StandardBusinessStampItem.Approved,
 *          StandardBusinessStampItem.NotApproved,
 *          StandardBusinessStampItem.Draft,
 *          StandardBusinessStampItem.Final,
 *          StandardBusinessStampItem.Completed,
 *          StandardBusinessStampItem.Confidential,
 *          StandardBusinessStampItem.ForPublicRelease,
 *          StandardBusinessStampItem.NotForPublicRelease,
 *          StandardBusinessStampItem.ForComment,
 *          StandardBusinessStampItem.Void,
 *          StandardBusinessStampItem.PreliminaryResults,
 *          StandardBusinessStampItem.InformationOnly
 *      ],
 *      allowedInteractions: ['None'],
 *      isPrint: true
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class StampSettings extends ChildProperty<StampSettings> {
    /**
    * Get or set offset of the annotation.
    */
    offset: IPoint;
    /**
     * Get or set page number of the annotation.
     */
    pageNumber: number;
    /**
     * specifies the width of the annotation.
     */
    width: number;
    /**
     * specifies the height of the annotation.
     */
    height: number;
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specifies the annotation selector settings of the annotation.
     */
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    /**
     * specifies the minHeight of the annotation.
     */
    minHeight: number;
    /**
     * specifies the minWidth of the annotation.
     */
    minWidth: number;
    /**
     * specifies the minHeight of the annotation.
     */
    maxHeight: number;
    /**
     * specifies the maxWidth of the annotation.
     */
    maxWidth: number;
    /**
     * specifies the locked action of the annotation.
     */
    isLock: boolean;
    /**
     * specifies the custom data of the annotation.
     */
    customData: object;
    /**
     * Provide option to define the required dynamic stamp items to be displayed in annotation toolbar menu.
     */
    dynamicStamps: DynamicStampItem[];
    /**
     * Provide option to define the required sign stamp items to be displayed in annotation toolbar menu.
     */
    signStamps: SignStampItem[];
    /**
     * Provide option to define the required standard business stamp items to be displayed in annotation toolbar menu.
     */
    standardBusinessStamps: StandardBusinessStampItem[];
    /**
     * Gets or sets the allowed interactions for the locked stamp annotations.
     * IsLock can be configured using stamp settings.
     *
     * @default ['None']
     */
    allowedInteractions: AllowedInteraction[];
    /**
     * specifies whether the individual annotations are included or not in print actions.
     */
    isPrint: boolean;
}
/**
 * The `CustomStampSettings` module is used to provide the properties to customstamp annotation.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the custom stamp annotation settings.
 *  viewer.customStampSettings = {
 *      opacity: 1,
 *      author: 'Guest',
 *      width: 0,
 *      height: 0,
 *      left: 0,
 *      top: 0,
 *      minHeight: 0,
 *      minWidth: 0,
 *      maxWidth: 0,
 *      maxHeight: 0,
 *      isLock: false,
 *      enableCustomStamp: true,
 *      allowedInteractions: ['None'],
 *      isPrint: true
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class CustomStampSettings extends ChildProperty<CustomStampSettings> {
    /**
    * Get or set offset of the annotation.
    */
    offset: IPoint;
    /**
     * Get or set page number of the annotation.
     */
    pageNumber: number;
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specifies the width of the annotation.
     */
    width: number;
    /**
     * specifies the height of the annotation.
     */
    height: number;
    /**
     * specifies the left position of the annotation.
     */
    left: number;
    /**
     * specifies the top position of the annotation.
     */
    top: number;
    /**
     * Specifies to maintain the newly added custom stamp element in the menu items.
     */
    isAddToMenu: boolean;
    /**
     * specifies the minHeight of the annotation.
     */
    minHeight: number;
    /**
     * specifies the minWidth of the annotation.
     */
    minWidth: number;
    /**
     * specifies the minHeight of the annotation.
     */
    maxHeight: number;
    /**
     * specifies the maxWidth of the annotation.
     */
    maxWidth: number;
    /**
     * specifies the locked action of the annotation.
     */
    isLock: boolean;
    /**
     * Define the custom image path and it's name to be displayed in the menu items.
     */
    customStamps: CustomStampModel[];
    /**
     * If it is set as false. then the custom stamp items won't be visible in the annotation toolbar stamp menu items.
     */
    enableCustomStamp: boolean;
    /**
     * Gets or sets the allowed interactions for the locked custom stamp annotations.
     * IsLock can be configured using custom stamp settings.
     *
     * @default ['None']
     */
    allowedInteractions: AllowedInteraction[];
    /**
     * specifies whether the individual annotations are included or not in print actions.
     */
    isPrint: boolean;
}
/**
 * The `DistanceSettings` module is used to provide the properties to distance calibrate annotation.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the distance annotation settings.
 *  viewer.distanceSettings = {
 *      opacity: 1,
 *      fillColor: '#4070FF',
 *      strokeColor: '#ff0000',
 *      author: 'Guest',
 *      thickness: 1,
 *      borderDashArray: 0,
 *      lineHeadStartStyle: 'Closed',
 *      lineHeadEndStyle: 'Closed',
 *      annotationSelectorSettings: {
 *          selectionBorderColor: '',
 *          resizerBorderColor: 'black',
 *          resizerFillColor: '#FF4081',
 *          resizerSize: 8,
 *          selectionBorderThickness: 1,
 *          resizerShape: 'Square',
 *          selectorLineDashArray: [],
 *          resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges,
 *          resizerCursorType: null
 *      },
 *      minHeight: 0,
 *      minWidth: 0,
 *      maxWidth: 0,
 *      maxHeight: 0,
 *      isLock: false,
 *      leaderLength: 40,
 *      resizeCursorType: CursorType.move,
 *      allowedInteractions: ['None'],
 *      isPrint: true
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class DistanceSettings extends ChildProperty<DistanceSettings> {
    /**
    * Get or set offset of the annotation.
    */
    offset: IPoint;
    /**
    * Get or set page number of the annotation.
    */
    pageNumber: number;
    /**
     * Get or set vertex points of the annotation.
     *
     * @default []
     */
    vertexPoints?: PointModel[];
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the fill color of the annotation.
     */
    fillColor: string;
    /**
     * specifies the stroke color of the annotation.
     */
    strokeColor: string;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specified the thickness of the annotation.
     */
    thickness: number;
    /**
     * specifies the line head start style of the annotation.
     */
    lineHeadStartStyle: LineHeadStyle;
    /**
     * specifies the line head start style of the annotation.
     */
    lineHeadEndStyle: LineHeadStyle;
    /**
     * specifies the border dash array  of the annotation.
     */
    borderDashArray: number;
    /**
     * specifies the annotation selector settings of the annotation.
     */
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    /**
     * specifies the minHeight of the annotation.
     */
    minHeight: number;
    /**
     * specifies the minWidth of the annotation.
     */
    minWidth: number;
    /**
     * specifies the minHeight of the annotation.
     */
    maxHeight: number;
    /**
     * specifies the maxWidth of the annotation.
     */
    maxWidth: number;
    /**
     * specifies the locked action of the annotation.
     */
    isLock: boolean;
    /**
     * specifies the custom data of the annotation.
     */
    customData: object;
    /**
     * specifies the leader length of the annotation.
     */
    leaderLength: number;
    /**
     * Defines the cursor type for distance annotation.
     */
    resizeCursorType: CursorType;
    /**
     * Gets or sets the allowed interactions for the locked distance annotations.
     * IsLock can be configured using distance settings.
     *
     * @default ['None']
     */
    allowedInteractions: AllowedInteraction[];
    /**
     * specifies whether the individual annotations are included or not in print actions.
     */
    isPrint: boolean;
}
/**
 * The `PerimeterSettings` module is used to provide the properties to perimeter calibrate annotation.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the perimeter annotation settings.
 *  viewer.perimeterSettings = {
 *      opacity: 1,
 *      fillColor: '#4070FF',
 *      strokeColor: '#ff0000',
 *      author: 'Guest',
 *      thickness: 1,
 *      borderDashArray: 0,
 *      lineHeadStartStyle: 'Open',
 *      lineHeadEndStyle: 'Open',
 *      minHeight: 0, minWidth: 0,
 *      maxWidth: 0,
 *      maxHeight: 0,
 *      isLock: false,
 *      annotationSelectorSettings: {
 *          selectionBorderColor: '',
 *          resizerBorderColor: 'black',
 *          resizerFillColor: '#4070FF',
 *          resizerSize: 8,
 *          selectionBorderThickness: 1,
 *          resizerShape: 'Circle',
 *          selectorLineDashArray: [],
 *          resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges,
 *          resizerCursorType: null
 *      },
 *      allowedInteractions: ['None'],
 *      isPrint: true
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class PerimeterSettings extends ChildProperty<PerimeterSettings> {
    /**
    * Get or set offset of the annotation.
    */
    offset: IPoint;
    /**
    * Get or set page number of the annotation.
    */
    pageNumber: number;
    /**
     * Get or set vertex points of the annotation.
     *
     * @default []
     */
    vertexPoints?: PointModel[];
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the fill color of the annotation.
     */
    fillColor: string;
    /**
     * specifies the stroke color of the annotation.
     */
    strokeColor: string;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specified the thickness of the annotation.
     */
    thickness: number;
    /**
     * specifies the line head start style of the annotation.
     */
    lineHeadStartStyle: LineHeadStyle;
    /**
     * specifies the line head start style of the annotation.
     */
    lineHeadEndStyle: LineHeadStyle;
    /**
     * specifies the border dash array  of the annotation.
     */
    borderDashArray: number;
    /**
     * specifies the minHeight of the annotation.
     */
    minHeight: number;
    /**
     * specifies the minWidth of the annotation.
     */
    minWidth: number;
    /**
     * specifies the minHeight of the annotation.
     */
    maxHeight: number;
    /**
     * specifies the maxWidth of the annotation.
     */
    maxWidth: number;
    /**
     * specifies the locked action of the annotation.
     */
    isLock: boolean;
    /**
     * specifies the annotation selector settings of the annotation.
     */
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    /**
     * Gets or sets the allowed interactions for the locked perimeter annotations.
     * IsLock can be configured using perimeter settings.
     *
     * @default ['None']
     */
    allowedInteractions: AllowedInteraction[];
    /**
     * specifies whether the individual annotations are included or not in print actions.
     */
    isPrint: boolean;
}
/**
 * The `AreaSettings` module is used to provide the properties to area calibrate annotation.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the area annotation settings.
 *  viewer.areaSettings = {
 *      opacity: 1,
 *      fillColor: '#4070FF',
 *      strokeColor: '#ff0000',
 *      author: 'Guest',
 *      thickness: 1,
 *      minHeight: 0,
 *      minWidth: 0,
 *      maxWidth: 0,
 *      maxHeight: 0,
 *      isLock: false,
 *      annotationSelectorSettings: {
 *          selectionBorderColor: '',
 *          resizerBorderColor: 'black',
 *          resizerFillColor: '#4070FF',
 *          resizerSize: 8,
 *          selectionBorderThickness: 1,
 *          resizerShape: 'Circle',
 *          selectorLineDashArray: [],
 *          resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges,
 *          resizerCursorType: null
 *      },
 *      allowedInteractions: ['None'],
 *      isPrint: true
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class AreaSettings extends ChildProperty<AreaSettings> {
    /**
    * Get or set offset of the annotation.
    */
    offset: IPoint;
    /**
    * Get or set page number of the annotation.
    */
    pageNumber: number;
    /**
     * Get or set vertex points of the annotation.
     *
     * @default []
     */
    vertexPoints?: PointModel[];
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the fill color of the annotation.
     */
    fillColor: string;
    /**
     * specifies the stroke color of the annotation.
     */
    strokeColor: string;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specified the thickness of the annotation.
     */
    thickness: number;
    /**
     * specifies the minHeight of the annotation.
     */
    minHeight: number;
    /**
     * specifies the minWidth of the annotation.
     */
    minWidth: number;
    /**
     * specifies the minHeight of the annotation.
     */
    maxHeight: number;
    /**
     * specifies the maxWidth of the annotation.
     */
    maxWidth: number;
    /**
     * specifies the locked action of the annotation.
     */
    isLock: boolean;
    /**
     * specifies the annotation selector settings of the annotation.
     */
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    /**
     * Gets or sets the allowed interactions for the locked area annotations.
     * IsLock can be configured using area settings.
     *
     * @default ['None']
     */
    allowedInteractions: AllowedInteraction[];
    /**
     * specifies whether the individual annotations are included or not in print actions.
     */
    isPrint: boolean;
}
/**
 * The `RadiusSettings` module is used to provide the properties to radius calibrate annotation.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the radius annotation settings.
 *  viewer.radiusSettings = {
 *      opacity: 1,
 *      fillColor: '#4070FF',
 *      strokeColor: '#ff0000',
 *      author: 'Guest',
 *      thickness: 1,
 *      annotationSelectorSettings: {
 *          selectionBorderColor: '',
 *          resizerBorderColor: 'red',
 *          resizerFillColor: '#4070FF',
 *          resizerSize: 8,
 *          selectionBorderThickness: 1,
 *          resizerShape: 'Circle',
 *          selectorLineDashArray: [],
 *          resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges,
 *          resizerCursorType: null
 *      },
 *      minHeight: 0,
 *      minWidth: 0,
 *      maxWidth: 0,
 *      maxHeight: 0,
 *      isLock: false,
 *      allowedInteractions: ['None'],
 *      isPrint: true
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class RadiusSettings extends ChildProperty<RadiusSettings> {
    /**
    * Get or set offset of the annotation.
    */
    offset: IPoint;
    /**
    * Get or set page number of the annotation.
    */
    pageNumber: number;
    /**
     * specifies the width of the annotation.
     */
    width: number;
    /**
     * specifies the height of the annotation.
     */
    height: number;
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the fill color of the annotation.
     */
    fillColor: string;
    /**
     * specifies the stroke color of the annotation.
     */
    strokeColor: string;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specified the thickness of the annotation.
     */
    thickness: number;
    /**
     * specifies the annotation selector settings of the annotation.
     */
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    /**
     * specifies the minHeight of the annotation.
     */
    minHeight: number;
    /**
     * specifies the minWidth of the annotation.
     */
    minWidth: number;
    /**
     * specifies the minHeight of the annotation.
     */
    maxHeight: number;
    /**
     * specifies the maxWidth of the annotation.
     */
    maxWidth: number;
    /**
     * specifies the locked action of the annotation.
     */
    isLock: boolean;
    /**
     * specifies the custom data of the annotation.
     */
    customData: object;
    /**
     * Gets or sets the allowed interactions for the locked radius annotations.
     * IsLock can be configured using area settings.
     *
     * @default ['None']
     */
    allowedInteractions: AllowedInteraction[];
    /**
     * specifies whether the individual annotations are included or not in print actions.
     */
    isPrint: boolean;
}
/**
 * The `VolumeSettings` module is used to provide the properties to volume calibrate annotation.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the volume annotation settings.
 *  viewer.volumeSettings = {
 *      opacity: 1,
 *      fillColor: '#4070FF',
 *      strokeColor: '#ff0000',
 *      author: 'Guest',
 *      thickness: 1,
 *      minHeight: 0,
 *      minWidth: 0,
 *      maxWidth: 0,
 *      maxHeight: 0,
 *      isLock: false,
 *      annotationSelectorSettings: {
 *          selectionBorderColor: '',
 *          resizerBorderColor: 'black',
 *          resizerFillColor: '#4070FF',
 *          resizerSize: 8,
 *          selectionBorderThickness: 1,
 *          resizerShape: 'Circle',
 *          selectorLineDashArray: [],
 *          resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges,
 *          resizerCursorType: null
 *      },
 *      allowedInteractions: ['None'],
 *      isPrint: true
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class VolumeSettings extends ChildProperty<VolumeSettings> {
    /**
    * Get or set offset of the annotation.
    */
    offset: IPoint;
    /**
    * Get or set page number of the annotation.
    */
    pageNumber: number;
    /**
     * Get or set vertex points of the annotation.
     *
     * @default []
     */
    vertexPoints?: PointModel[];
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the fill color of the annotation.
     */
    fillColor: string;
    /**
     * specifies the stroke color of the annotation.
     */
    strokeColor: string;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specified the thickness of the annotation.
     */
    thickness: number;
    /**
     * specifies the minHeight of the annotation.
     */
    minHeight: number;
    /**
     * specifies the minWidth of the annotation.
     */
    minWidth: number;
    /**
     * specifies the minHeight of the annotation.
     */
    maxHeight: number;
    /**
     * specifies the maxWidth of the annotation.
     */
    maxWidth: number;
    /**
     * specifies the locked action of the annotation.
     */
    isLock: boolean;
    /**
     * specifies the annotation selector settings of the annotation.
     */
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    /**
     * Gets or sets the allowed interactions for the locked volume annotations.
     * IsLock can be configured using volume settings.
     *
     * @default ['None']
     */
    allowedInteractions: AllowedInteraction[];
    /**
     * specifies whether the individual annotations are included or not in print actions.
     */
    isPrint: boolean;
}
/**
 * The `Ink` module is used to provide the properties to Ink annotation.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the ink annotation settings.
 *  viewer.inkAnnotationSettings = {
 *      author: 'Guest',
 *      opacity: 1,
 *      strokeColor: '#ff0000',
 *      thickness: 1,
 *      annotationSelectorSettings: {
 *          selectionBorderColor: '',
 *          resizerBorderColor: 'black',
 *          resizerFillColor: '#FF4081',
 *          resizerSize: 8,
 *          selectionBorderThickness: 1,
 *          resizerShape: 'Circle',
 *          selectorLineDashArray: [],
 *          resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges,
 *          resizerCursorType: null
 *      },
 *      isLock: false,
 *      allowedInteractions: ['None'],
 *      isPrint: true
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class InkAnnotationSettings extends ChildProperty<InkAnnotationSettings> {
    /**
    * Get or set offset of the annotation.
    */
    offset: IPoint;
    /**
    * Get or set page number of the annotation.
    */
    pageNumber: number;
    /**
     * specifies the width of the annotation.
     */
    width: number;
    /**
     * specifies the height of the annotation.
     */
    height: number;
    /**
      * Gets or sets the path of the ink annotation.
      */
    path: string;
    /**
     * Sets the opacity value for ink annotation.By default value is 1. It range varies from 0 to 1.
     */
    opacity: number;
    /**
     * Sets the stroke color for ink annotation.By default values is #FF0000.
     */
    strokeColor: string;
    /**
     * Sets the thickness for the ink annotation. By default value is 1. It range varies from 1 to 10.
     */
    thickness: number;
    /**
     * Define the default option to customize the selector for ink annotation.
     */
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    /**
     * If it is set as true, can't interact with annotation. Otherwise can interact the annotations. By default it is false.
     */
    isLock: boolean;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * Gets or sets the allowed interactions for the locked ink annotations.
     * IsLock can be configured using ink settings.
     *
     * @default ['None']
     */
    allowedInteractions: AllowedInteraction[];
    /**
     * specifies the custom data of the annotation
     */
    customData: object;
    /**
     * specifies whether the individual annotations are included or not in print actions.
     */
    isPrint: boolean;
}
/**
 * The `stickyNotesSettings` module is used to provide the properties to sticky notes annotation.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the sticky notes annotation settings.
 *  viewer.stickyNotesSettings = {
 *      author: 'Guest',
 *      opacity: 1,
 *      annotationSelectorSettings: {
 *          selectionBorderColor: '',
 *          resizerBorderColor: 'red',
 *          resizerFillColor: '#4070FF',
 *          resizerSize: 8,
 *          selectionBorderThickness: 1,
 *          resizerShape: 'Circle',
 *          selectorLineDashArray: [],
 *          resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges,
 *          resizerCursorType: null
 *      },
 *      isLock: false,
 *      allowedInteractions: ['None'],
 *      isPrint: true
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class StickyNotesSettings extends ChildProperty<StickyNotesSettings> {
    /**
    * Get or set offset of the annotation.
    */
    offset: IPoint;
    /**
    * Get or set page number of the annotation.
    */
    pageNumber: number;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the annotation selector settings of the annotation.
     */
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    /**
     * specifies the custom data of the annotation.
     */
    customData: object;
    /**
     * specifies the lock action of the annotation.
     */
    isLock: boolean;
    /**
     * Gets or sets the allowed interactions for the locked sticky notes annotations.
     * IsLock can be configured using sticky notes settings.
     *
     * @default ['None']
     */
    allowedInteractions: AllowedInteraction[];
    /**
     * specifies whether the individual annotations are included or not in print actions.
     */
    isPrint: boolean;
}
/**
 * The `MeasurementSettings` module is used to provide the settings to measurement annotations.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the measurement annotation settings.
 *  viewer.measurementSettings = {
 *      conversionUnit: 'cm',
 *      displayUnit: 'cm',
 *      scaleRatio: 1,
 *      depth: 96
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class MeasurementSettings extends ChildProperty<MeasurementSettings> {
    /**
     * specifies the scale ratio of the annotation.
     */
    scaleRatio: number;
    /**
     * specifies the unit of the annotation.
     */
    conversionUnit: CalibrationUnit;
    /**
     * specifies the unit of the annotation.
     */
    displayUnit: CalibrationUnit;
    /**
     * specifies the depth of the volume annotation.
     */
    depth: number;
}
/**
 * The `FreeTextSettings` module is used to provide the properties to free text annotation.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the free text annotation settings.
 *  viewer.freeTextSettings = {
 *      opacity: 1,
 *      fillColor: '#4070FF',
 *      borderColor: '#4070FF',
 *      author: 'Guest',
 *      borderWidth: 1,
 *      width: 151,
 *      fontSize: 16,
 *      height: 24.6,
 *      fontColor: '#000',
 *      fontFamily: 'Courier',
 *      defaultText: 'Type Here',
 *      textAlignment: 'Right',
 *      fontStyle: FontStyle.Italic,
 *      allowTextOnly: false,
 *      annotationSelectorSettings: {
 *          selectionBorderColor: '',
 *          resizerBorderColor: 'black',
 *          resizerFillColor: '#FF4081',
 *          resizerSize: 8,
 *          selectionBorderThickness: 1,
 *          resizerShape: 'Circle',
 *          selectorLineDashArray: [],
 *          resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges,
 *          resizerCursorType: null
 *      },
 *      minHeight: 0,
 *      minWidth: 0,
 *      maxWidth: 0,
 *      maxHeight: 0,
 *      isLock: false,
 *      allowedInteractions: ['None'],
 *      isPrint: true,
 *      isReadonly: false,
 *      enableAutoFit: false
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class FreeTextSettings extends ChildProperty<FreeTextSettings> {
    /**
    * Get or set offset of the annotation.
    */
    offset: IPoint;
    /**
    * Get or set page number of the annotation.
    */
    pageNumber: number;
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the border color of the annotation.
     */
    borderColor: string;
    /**
     * specifies the border with of the annotation.
     */
    borderWidth: number;
    /**
     * specifies the border style of the annotation.
     */
    borderStyle: string;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specifies the background fill color of the annotation.
     */
    fillColor: string;
    /**
     * specifies the text box font size of the annotation.
     */
    fontSize: number;
    /**
     * specifies the width of the annotation.
     */
    width: number;
    /**
     * specifies the height of the annotation.
     */
    height: number;
    /**
     * specifies the text box font color of the annotation.
     */
    fontColor: string;
    /**
     * specifies the text box font family of the annotation.
     */
    fontFamily: string;
    /**
     * setting the default text for annotation.
     */
    defaultText: string;
    /**
     * applying the font styles for the text.
     */
    fontStyle: FontStyle;
    /**
     * Aligning the text in the annotation.
     */
    textAlignment: TextAlignment;
    /**
     * specifies the allow text only action of the free text annotation.
     */
    allowEditTextOnly: boolean;
    /**
     * specifies the annotation selector settings of the annotation.
     */
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    /**
     * specifies the minHeight of the annotation.
     */
    minHeight: number;
    /**
     * specifies the minWidth of the annotation.
     */
    minWidth: number;
    /**
     * specifies the minHeight of the annotation.
     */
    maxHeight: number;
    /**
     * specifies the maxWidth of the annotation.
     */
    maxWidth: number;
    /**
     * specifies the locked action of the annotation.
     */
    isLock: boolean;
    /**
     * specifies the custom data of the annotation.
     */
    customData: object;
    /**
     * Gets or sets the allowed interactions for the locked free text annotations.
     * IsLock can be configured using free text settings.
     *
     * @default ['None']
     */
    allowedInteractions: AllowedInteraction[];
    /**
     * specifies whether the individual annotations are included or not in print actions.
     */
    isPrint: boolean;
    /**
     * Allow to edit the FreeText annotation. FALSE, by default.
     */
    isReadonly: boolean;
    /**
     * Enable or disable auto fit mode for FreeText annotation in the Pdfviewer. FALSE by default.
     */
    enableAutoFit: boolean;
}
/**
 * The `AnnotationSelectorSettings` module is used to provide the properties to annotation selectors.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the annotation selector settings.
 *  viewer.annotationSelectorSettings = {
 *      selectionBorderColor: '',
 *      resizerBorderColor: 'Circle',
 *      resizerFillColor: '#4070FF',
 *      resizerSize: 8,
 *      selectionBorderThickness: 1,
 *      resizerShape: 'Square',
 *      selectorLineDashArray: [],
 *      resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges,
 *      resizerCursorType: null
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class AnnotationSelectorSettings extends ChildProperty<AnnotationSelectorSettings> {
    /**
     * Specifies the selection border color.
     */
    selectionBorderColor: string;
    /**
     * Specifies the border color of the resizer.
     *
     * @ignore
     */
    resizerBorderColor: string;
    /**
     * Specifies the fill color of the resizer.
     *
     * @ignore
     */
    resizerFillColor: string;
    /**
     * Specifies the size of the resizer.
     *
     * @ignore
     */
    resizerSize: number;
    /**
     * Specifies the thickness of the border of selection.
     */
    selectionBorderThickness: number;
    /**
     * Specifies the shape of the resizer.
     */
    resizerShape: AnnotationResizerShape;
    /**
     * Specifies the border dash array of the selection.
     */
    selectorLineDashArray: number[];
    /**
     * Specifies the location of the resizer.
     */
    resizerLocation: AnnotationResizerLocation;
    /**
     * specifies the cursor type of resizer
     */
    resizerCursorType: CursorType;
}
/**
 * The `TextSearchColorSettings` module is used to set the settings for the color of the text search highlight.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the text search color settings.
 *  viewer.textSearchColorSettings = {
 *      searchHighlightColor: '#4070FF',
 *      searchColor: '#FF4081'
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class TextSearchColorSettings extends ChildProperty<TextSearchColorSettings> {
    /**
     * Gets or Sets the color of the current occurrence of the text searched string.
     */
    searchHighlightColor: string;
    /**
     * Gets or Sets the color of the other occurrence of the text searched string.
     */
    searchColor: string;
}
/**
 * The `HandWrittenSignatureSettings` module is used to provide the properties to handwritten signature.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the hand written signature settings.
 *  viewer.handWrittenSignatureSettings = {
 *      signatureItem: [
 *          'Signature',
 *          'Initial'
 *      ],
 *      saveSignatureLimit: 1,
 *      saveInitialLimit: 1,
 *      opacity: 1,
 *      strokeColor: '#000000',
 *      width: 150,
 *      height: 100,
 *      thickness: 1,
 *      annotationSelectorSettings: {
 *          selectionBorderColor: '',
 *          resizerBorderColor: 'black',
 *          resizerFillColor: '#FF4081',
 *          resizerSize: 8,
 *          selectionBorderThickness: 1,
 *          resizerShape: 'Circle',
 *          selectorLineDashArray: [],
 *          resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges,
 *          resizerCursorType: null
 *      },
 *      allowedInteractions: ['None'],
 *      signatureDialogSettings: {
 *          displayMode: DisplayMode.Draw | DisplayMode.Text | DisplayMode.Upload, hideSaveSignature: false
 *      },
 *      initialDialogSettings: {
 *          displayMode: DisplayMode.Draw | DisplayMode.Text | DisplayMode.Upload,
 *      hideSaveSignature: false
 *      }
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class HandWrittenSignatureSettings extends ChildProperty<HandWrittenSignatureSettings> {
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the stroke color of the annotation.
     */
    strokeColor: string;
    /**
     * specified the thickness of the annotation.
     */
    thickness: number;
    /**
     * specified the width of the annotation.
     */
    width: number;
    /**
     * specified the height of the annotation.
     */
    height: number;
    /**
     * Gets or sets the save signature limit of the signature. By default value is 1 and maximum limit is 5.
     */
    saveSignatureLimit: number;
    /**
     * Gets or sets the save initial limit of the initial. By default value is 1 and maximum limit is 5.
     */
    saveInitialLimit: number;
    /**
     * Provide option to define the required signature items to be displayed in signature menu.
     */
    signatureItem: SignatureItem[];
    /**
     * Options to set the type signature font name with respective index and maximum font name limit is 4 so key value should be 0 to 3.
     */
    typeSignatureFonts: {
        [key: number]: string;
    };
    /**
     * specifies the annotation selector settings of the annotation.
     */
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    /**
     * Get or set the Signature DialogSettings for Handwritten signature.
     */
    signatureDialogSettings: SignatureDialogSettingsModel;
    /**
     * Get or set the initialDialogSettings for Handwritten initial.
     */
    initialDialogSettings: SignatureDialogSettingsModel;
}
/**
 * The `AnnotationSettings` module is used to provide the properties to annotations.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the annotation settings.
 *  viewer.annotationSettings = {
 *      author: 'Guest',
 *      minHeight: 0,
 *      minWidth: 0,
 *      maxWidth: 0,
 *      maxHeight: 0,
 *      isLock: false,
 *      skipPrint: false,
 *      skipDownload: false,
 *      allowedInteractions: ['None']
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class AnnotationSettings extends ChildProperty<AnnotationSettings> {
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specifies the minHeight of the annotation.
     */
    minHeight: number;
    /**
     * specifies the minWidth of the annotation.
     */
    minWidth: number;
    /**
     * specifies the minHeight of the annotation.
     */
    maxHeight: number;
    /**
     * specifies the maxWidth of the annotation.
     */
    maxWidth: number;
    /**
     * specifies the locked action of the annotation.
     */
    isLock: boolean;
    /**
     * specifies whether the annotations are included or not in print actions.
     */
    skipPrint: boolean;
    /**
     * specifies whether the annotations are included or not in download actions.
     */
    skipDownload: boolean;
    /**
     * specifies the custom data of the annotation.
     */
    customData: object;
    /**
     * Gets or sets the allowed interactions for the locked annotations.
     * IsLock can be configured using annotation settings.
     *
     * @default ['None']
     */
    allowedInteractions: AllowedInteraction[];
}
/**
 * The `DocumentTextCollectionSettings` module is used to provide the properties to DocumentTextCollection.
 */
export declare class DocumentTextCollectionSettings extends ChildProperty<DocumentTextCollectionSettings> {
    /**
     * specifies the text data of the document.
     */
    textData: TextDataSettingsModel[];
    /**
     * specifies the page text of the document.
     */
    pageText: string;
    /**
     * specifies the page size of the document.
     */
    pageSize: number;
}
/**
 * The `TextDataSettings` module is used to provide the properties of text data.
 */
export declare class TextDataSettings extends ChildProperty<TextDataSettings> {
    /**
     * specifies the bounds of the rectangle.
     */
    bounds: RectangleBoundsModel;
    /**
     * specifies the text of the document.
     */
    text: string;
}
/**
 * The `RectangleBounds` module is used to provide the properties of rectangle bounds.
 */
export declare class RectangleBounds extends ChildProperty<RectangleBounds> {
    /**
     * specifies the size of the rectangle.
     */
    size: number;
    /**
     * specifies the x co-ordinate of the upper-left corner of the rectangle.
     */
    x: number;
    /**
     * specifies the y co-ordinate of the upper-left corner of the rectangle.
     */
    y: number;
    /**
     * specifies the width of the rectangle.
     */
    width: number;
    /**
     * specifies the height of the rectangle.
     */
    height: number;
    /**
     * specifies the left value of the rectangle.
     */
    left: number;
    /**
     * specifies the top value of the rectangle.
     */
    top: number;
    /**
     * specifies the right of the rectangle.
     */
    right: number;
    /**
     * specifies the bottom value of the rectangle.
     */
    bottom: number;
    /**
     * Returns true if height and width of the rectangle is zero.
     *
     * @default 'false'
     */
    isEmpty: boolean;
}
/**
 * The `TileRenderingSettings` module is used to provide the tile rendering settings of the PDF viewer.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the tile rendering settings.
 *  viewer.tileRenderingSettings = {
 *      enableTileRendering: false,
 *      x: 0,
 *      y: 0
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class TileRenderingSettings extends ChildProperty<TileRenderingSettings> {
    /**
     * Enable or disables tile rendering mode in the PDF Viewer.
     */
    enableTileRendering: boolean;
    /**
     * specifies the tileX count of the render Page.
     */
    x: number;
    /**
     * specifies the tileY count of the render Page.
     */
    y: number;
}
/**
 * The `ScrollSettings` module is used to provide the settings of the scroll of the PDF viewer.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the scroll settings.
 *  viewer.scrollSettings = {
 *      delayPageRequestTimeOnScroll: 150
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class ScrollSettings extends ChildProperty<ScrollSettings> {
    /**
     * Increase or decrease the delay time.
     */
    delayPageRequestTimeOnScroll: number;
}
/**
 * The `FormField` is used to store the form fields of PDF document.
 */
export declare class FormField extends ChildProperty<FormField> {
    /**
     * Gets the name of the form field.
     */
    name: string;
    /**
     * Specifies whether the check box is in checked state or not.
     */
    isChecked: boolean;
    /**
     * Specifies whether the radio button is in checked state or not.
     */
    isSelected: boolean;
    /**
     * Gets the id of the form field.
     */
    id: string;
    /**
     * Gets or sets the value of the form field.
     */
    value: string;
    /**
     * Gets the type of the form field.
     */
    type: FormFieldType;
    /**
     * If it is set as true, can't edit the form field in the PDF document. By default it is false.
     */
    isReadOnly: boolean;
    /**
     * specifies the type of the signature.
     */
    signatureType: SignatureType[];
    /**
     * specifies the fontName of the signature.
     */
    fontName: string;
    /**
     * Get or set the form field bounds.
     */
    bounds: IFormFieldBound;
    /**
     * Get or set the font family of the form field.
     */
    fontFamily: string;
    /**
     * Get or set the font size of the form field.
     */
    fontSize: number;
    /**
     * Get or set the font Style of form field.
     */
    fontStyle: FontStyle;
    /**
     * Get or set the font color of the form field in hexadecimal string format.
     */
    color: string;
    /**
     * Get or set the background color of the form field in hexadecimal string format.
     */
    backgroundColor: string;
    /**
     * Get or set the text alignment of the form field.
     */
    alignment: TextAlignment;
    /**
     * Gets or set the visibility of the form field.
     */
    visibility: Visibility;
    /**
     * Get or set the maximum character length.
     */
    maxLength: number;
    /**
     * Gets or set the is Required of form field.
     */
    isRequired: boolean;
    /**
     * Get or set the boolean value to print the form field. TRUE by default.
     */
    isPrint: boolean;
    /**
     * Get or set the text to be displayed as tooltip. By default it is empty.
     */
    tooltip: string;
    /**
     * Get or set the form field items. This can be Dropdown items or Listbox items.
     */
    options: ItemModel[];
    /**
     * Specifies the properties of the signature indicator in the signature field.
     */
    signatureIndicatorSettings: SignatureIndicatorSettingsModel;
    /**
     * Get or set the thickness of the form field.
     */
    thickness: number;
    /**
     * Get or set the border color of the form field.
     */
    borderColor: string;
    /**
     * Allows multiline input in the text field. FALSE, by default.
     */
    isMultiline: boolean;
    /**
     * Meaningful only if the MaxLength property is set and the Multiline, Password properties are false.
     * If set, the field is automatically divided into as many equally spaced position, or  combs, as the value of MaxLength, and the text is laid out into the combs.
     *
     * @default false
     */
    private insertSpaces;
    /**
     * Get the pageIndex of the form field. Default value is -1.
     */
    pageIndex: number;
}
/**
 * The `ContextMenuSettings` is used to show the context menu of PDF document.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the settings of the context menu option.
 *  viewer.contextMenuSettings = {
 *      contextMenuAction: 'RightClick',
 *      contextMenuItems: [
 *          ContextMenuItem.Comment,
 *          ContextMenuItem.Copy,
 *          ContextMenuItem.Cut,
 *          ContextMenuItem.Delete,
 *          ContextMenuItem.Highlight,
 *          ContextMenuItem.Paste,
 *          ContextMenuItem.Properties,
 *          ContextMenuItem.ScaleRatio,
 *          ContextMenuItem.Strikethrough,
 *          ContextMenuItem.Underline
 *         ]
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class ContextMenuSettings extends ChildProperty<ContextMenuSettings> {
    /**
     * Defines the context menu action.
     *
     * @default RightClick
     */
    contextMenuAction: ContextMenuAction;
    /**
     * Defines the context menu items should be visible in the PDF Viewer.
     *
     *  @default []
     */
    contextMenuItems: ContextMenuItem[];
}
/**
 * The `TextFieldSettings` is used to to show and customize the appearance of text box HTML element.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the text field settings.
 *  viewer.textFieldSettings = {
 *      name: '',
 *      value: '',
 *      fontFamily: 'Courier',
 *      fontSize: 10,
 *      fontStyle: 'None',
 *      color: 'black',
 *      borderColor: 'black',
 *      backgroundColor: 'white',
 *      alignment: 'Right',
 *      isReadOnly: false,
 *      visibility: 'visible',
 *      maxLength: 0,
 *      isRequired: false,
 *      isPrint: true,
 *      tooltip: '',
 *      thickness: 1,
 *      isMultiline: false
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class TextFieldSettings extends ChildProperty<TextFieldSettings> {
    /**
     * Get or set the form field bounds.
     */
    bounds: IFormFieldBound;
    /**
     * Get or set the name of the form field element.
     */
    name: string;
    /**
     * Get or set the value of the form field.
     */
    value: string;
    /**
     * Get or set the font family of the textbox field.
     */
    fontFamily: string;
    /**
     * Get or set the font size of the textbox field.
     */
    fontSize: number;
    /**
     * specifies the page number of the form field.
     */
    pageNumber: number;
    /**
     * Get or set the font Style of textbox field.
     */
    fontStyle: FontStyle;
    /**
     * Get or set the font color of the textbox in hexadecimal string format.
     */
    color: string;
    /**
     * Get or set the background color of the textbox in hexadecimal string format.
     */
    backgroundColor: string;
    /**
     * Get or set the alignment of the text.
     */
    alignment: TextAlignment;
    /**
     * Specifies whether the textbox field is in read-only or read-write mode. FALSE by default.
     */
    isReadOnly: boolean;
    /**
     * Gets or set the visibility of the form field.
     */
    visibility: Visibility;
    /**
     * Get or set the maximum character length.
     */
    maxLength: number;
    /**
     * If it is set as true, consider as mandatory field in the PDF document. By default it is false.
     */
    isRequired: boolean;
    /**
     * Get or set the boolean value to print the textbox field. TRUE by default.
     */
    isPrint: boolean;
    /**
     * Get or set the text to be displayed as tooltip. By default it is empty.
     */
    tooltip: string;
    /**
     * Get or set the thickness of the textbox field.
     */
    thickness: number;
    /**
     * Get or set the border color of the textbox field.
     */
    borderColor: string;
    /**
     * Allows multiline input in the text field. FALSE, by default.
     */
    isMultiline: boolean;
}
/**
 * The `PasswordFieldSettings` is used to to show and customize the appearance of password input HTML element.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the password field settings.
 *  viewer.passwordFieldSettings = {
 *      name: '',
 *      value: '',
 *      fontFamily: 'Courier',
 *      fontSize: 10,
 *      fontStyle: 'None',
 *      color: 'black',
 *      borderColor: 'black',
 *      backgroundColor: 'white',
 *      alignment: 'Right',
 *      isReadOnly: false,
 *      visibility: 'visible',
 *      maxLength: 0,
 *      isRequired: false,
 *      isPrint: true,
 *      tooltip: '',
 *      thickness: 1
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class PasswordFieldSettings extends ChildProperty<PasswordFieldSettings> {
    /**
     * Get or set the form field bounds.
     */
    bounds: IFormFieldBound;
    /**
     * Get or set the name of the form field element.
     */
    name: string;
    /**
     * Get or set the value of the form field.
     */
    value: string;
    /**
     * specifies the page number of the form field.
     */
    pageNumber: number;
    /**
     * Get or set the font family of the password field.
     */
    fontFamily: string;
    /**
     * Get or set the font size of the password field.
     */
    fontSize: number;
    /**
     * Get or set the font Style of password field.
     */
    fontStyle: FontStyle;
    /**
     * Get or set the font color of the password field in hexadecimal string format.
     */
    color: string;
    /**
     * Get or set the background color of the password field in hexadecimal string format.
     */
    backgroundColor: string;
    /**
     * Get or set the alignment of the text.
     */
    alignment: TextAlignment;
    /**
     * Specifies whether the password field is in read-only or read-write mode. FALSE by default.
     */
    isReadOnly: boolean;
    /**
     * Gets or set the visibility of the form field.
     */
    visibility: Visibility;
    /**
     * Get or set the maximum character length.
     */
    maxLength: number;
    /**
     * If it is set as true, consider as mandatory field in the PDF document. By default it is false.
     */
    isRequired: boolean;
    /**
     * Get or set the boolean value to print the password field. TRUE by default.
     */
    isPrint: boolean;
    /**
     * Get or set the text to be displayed as tooltip. By default it is empty.
     */
    tooltip: string;
    /**
     * Get or set the thickness of the password field.
     */
    thickness: number;
    /**
     * Get or set the border color of the password field.
     */
    borderColor: string;
}
/**
 * The `CheckBoxFieldSettings` is used to to show and customize the appearance of check box element.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the check box field settings.
 *  viewer.checkBoxFieldSettings = {
 *      name: '',
 *      isChecked: true,
 *      backgroundColor: 'white',
 *      isReadOnly: false,
 *      visibility: 'visible',
 *      isPrint: true,
 *      tooltip: '',
 *      isRequired: false,
 *      thickness: 5,
 *      borderColor: 'black'
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class CheckBoxFieldSettings extends ChildProperty<CheckBoxFieldSettings> {
    /**
     * Get or set the form field bounds.
     */
    bounds: IFormFieldBound;
    /**
     * Get or set the name of the check box.
     */
    name: string;
    /**
     * Specifies whether the check box is in checked state or not.
     */
    isChecked: boolean;
    /**
     * Get or set the background color of the check box in hexadecimal string format.
     */
    backgroundColor: string;
    /**
     * Specifies whether the check box field is in read-only or read-write mode. FALSE by default.
     */
    isReadOnly: boolean;
    /**
     * Gets or set the visibility of the form field.
     */
    visibility: Visibility;
    /**
     * Get or set the boolean value to print the check box field. TRUE by default.
     */
    isPrint: boolean;
    /**
     * specifies the page number of the form field.
     */
    pageNumber: number;
    /**
     * Get or set the text to be displayed as tooltip. By default it is empty.
     */
    tooltip: string;
    /**
     * If it is set as true, consider as mandatory field in the PDF document. By default it is false.
     */
    isRequired: boolean;
    /**
     * Get or set the thickness of the check box field.
     */
    thickness: number;
    /**
     * Get or set the border color of the check box field.
     */
    borderColor: string;
}
/**
 * The `RadioButtonFieldSettings` is used to to show and customize the appearance of radio button element.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the radio button field settings.
 *  viewer.radioButtonFieldSettings = {
 *      name: '',
 *      isSelected: false,
 *      backgroundColor: 'white',
 *      isReadOnly: false,
 *      visibility: 'visible',
 *      isPrint: true,
 *      tooltip: '',
 *      isRequired: false,
 *      thickness: 1,
 *      borderColor: 'black'
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class RadioButtonFieldSettings extends ChildProperty<RadioButtonFieldSettings> {
    /**
     * Get or set the form field bounds.
     */
    bounds: IFormFieldBound;
    /**
     * Get or set the name of the form field element.
     */
    name: string;
    /**
     * Specifies whether the radio button is in checked state or not.
     */
    isSelected: boolean;
    /**
     * Get or set the background color of the radio button in hexadecimal string format.
     */
    backgroundColor: string;
    /**
     * Specifies whether the radio button field is in read-only or read-write mode. FALSE by default.
     */
    isReadOnly: boolean;
    /**
     * If it is set as true, consider as mandatory field in the PDF document. By default it is false.
     */
    isRequired: boolean;
    /**
     * specifies the page number of the form field.
     */
    pageNumber: number;
    /**
     * Gets or set the visibility of the form field.
     */
    visibility: Visibility;
    /**
     * Get or set the boolean value to print the radio button field. TRUE by default.
     */
    isPrint: boolean;
    /**
     * Get or set the text to be displayed as tooltip. By default it is empty.
     */
    tooltip: string;
    /**
     * Get or set the thickness of the radio button field.
     */
    thickness: number;
    /**
     * Get or set the border color of the radio button field.
     */
    borderColor: string;
}
/**
 * The `DropdownFieldSettings` is used to to show and customize the appearance of drop down element.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the drop down field settings.
 *  viewer.DropdownFieldSettings = {
 *      name: '',
 *      isSelected: false,
 *      backgroundColor: 'white',
 *      isReadOnly: true,
 *      visibility: 'visible',
 *      isPrint: true,
 *      tooltip: '',
 *      isRequired: false,
 *      thickness: 5,
 *      borderColor: 'blue'
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class DropdownFieldSettings extends ChildProperty<DropdownFieldSettings> {
    /**
     * Get or set the form field bounds.
     */
    bounds: IFormFieldBound;
    /**
     * Get or set the name of the dropdown.
     */
    name: string;
    /**
     * Get or set the value of the form field.
     */
    value: string;
    /**
     * Get or set the font family of the dropdown field.
     */
    fontFamily: string;
    /**
     * Get or set the font size of the dropdown field.
     */
    fontSize: number;
    /**
     * specifies the page number of the form field.
     */
    pageNumber: number;
    /**
     * Get or set the font style of dropdown field.
     */
    fontStyle: FontStyle;
    /**
     * Get or set the font color of the dropdown in hexadecimal string format..
     */
    color: string;
    /**
     * Get or set the background color of the dropdown in hexadecimal string format.
     */
    backgroundColor: string;
    /**
     * Get or set the alignment of the text.
     */
    alignment: TextAlignment;
    /**
     * Specifies whether the dropdown field is in read-only or read-write mode. FALSE by default.
     */
    isReadOnly: boolean;
    /**
     * Gets or set the visibility of the form field.
     */
    visibility: Visibility;
    /**
     * If it is set as true, consider as mandatory field in the PDF document. By default it is false.
     */
    isRequired: boolean;
    /**
     * Get or set the boolean value to print the dropdown field. TRUE by default.
     */
    isPrint: boolean;
    /**
     * Get or set the text to be displayed as tooltip. By default it is empty.
     */
    tooltip: string;
    /**
     * Get or set the dropdown items.
     */
    options: ItemModel[];
    /**
     * Get or set the thickness of the drop down field.
     */
    thickness: number;
    /**
     * Get or set the border color of the drop down field.
     */
    borderColor: string;
}
/**
 * The `ListBoxFieldSettings` is used to to show and customize the appearance of list box element.
 *
 * ```html
 * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
 * ```
 * ```ts
 *  let viewer: PdfViewer = new PdfViewer();
 *  // Change the list box field settings.
 *  viewer.listBoxFieldSettings = {
 *      name: '',
 *      fontFamily: 'Courier',
 *      fontSize: 5,
 *      fontStyle: 'None',
 *      color: 'black',
 *      backgroundColor: 'white',
 *      alignment: 'Right',
 *      isReadOnly: false,
 *      visibility: 'visible',
 *      isRequired: false,
 *      isPrint: false,
 *      tooltip: '',
 *      options: [],
 *      thickness: 1,
 *      borderColor: 'black'
 *  };
 *  viewer.appendTo("#pdfViewer");
 * ```
 *
 */
export declare class ListBoxFieldSettings extends ChildProperty<ListBoxFieldSettings> {
    /**
     * Get or set the form field bounds.
     */
    bounds: IFormFieldBound;
    /**
     * Get or set the name of the form field element.
     */
    name: string;
    /**
     * Get or set the value of the form field.
     */
    value: string;
    /**
     * Get or set the font family of the listbox field.
     */
    fontFamily: string;
    /**
     * Get or set the font size of the listbox field.
     */
    fontSize: number;
    /**
     * specifies the page number of the form field.
     */
    pageNumber: number;
    /**
     * Get or set the font Style of listbox field.
     */
    fontStyle: FontStyle;
    /**
     * Get or set the font color of the listbox in hexadecimal string format.
     */
    color: string;
    /**
     * Get or set the background color of the listbox in hexadecimal string format.
     */
    backgroundColor: string;
    /**
     * Get or set the alignment of the text.
     */
    alignment: TextAlignment;
    /**
     * Specifies whether the listbox field is in read-only or read-write mode. FALSE by default.
     */
    isReadOnly: boolean;
    /**
     * Gets or set the visibility of the form field.
     */
    visibility: Visibility;
    /**
     * If it is set as true, consider as mandatory field in the PDF document. By default it is false.
     */
    isRequired: boolean;
    /**
     * Get or set the boolean value to print the listbox field. TRUE by default.
     */
    isPrint: boolean;
    /**
     * Get or set the text to be displayed as tool tip. By default it is empty.
     */
    tooltip: string;
    /**
     * Get or set the listbox items.
     */
    options: ItemModel[];
    /**
     * Get or set the thickness of the list box field.
     */
    thickness: number;
    /**
     * Get or set the border color of the list box field.
     */
    borderColor: string;
}
export declare class Item extends ChildProperty<Item> {
    /**
     * Get or set the name.
     */
    itemName: string;
    /**
     * Get or set the value.
     */
    itemValue: string;
}
/**
 * Represents the PDF viewer component.
 * ```html
 * <div id="pdfViewer"></div>
 * <script>
 *  var pdfViewerObj = new PdfViewer();
 *  pdfViewerObj.appendTo("#pdfViewer");
 * </script>
 * ```
 */
export declare class PdfViewer extends Component<HTMLElement> implements INotifyPropertyChanged {
    /**
     * Defines the service url of the PdfViewer control.
     *
     * {% codeBlock src='pdfviewer/serviceUrl/index.md' %}{% endcodeBlock %}
     *
     */
    serviceUrl: string;
    /**
     * gets the page count of the document loaded in the PdfViewer control.
     *
     * {% codeBlock src='pdfviewer/pageCount/index.md' %}{% endcodeBlock %}
     *
     * @default 0
     */
    pageCount: number;
    /**
     * Checks whether the PDF document is edited.
     *
     * {% codeBlock src='pdfviewer/isDocumentEdited/index.md' %}{% endcodeBlock %}
     *
     * @asptype bool
     * @blazorType bool
     */
    isDocumentEdited: boolean;
    /**
     * Returns the current page number of the document displayed in the PdfViewer control.
     *
     * {% codeBlock src='pdfviewer/currentPageNumber/index.md' %}{% endcodeBlock %}
     *
     * @default 0
     */
    currentPageNumber: number;
    /**
     * Sets the PDF document path for initial loading.
     *
     * {% codeBlock src='pdfviewer/documentPath/index.md' %}{% endcodeBlock %}
     *
     */
    documentPath: string;
    /**
     * Returns the current zoom percentage of the PdfViewer control.
     *
     * @asptype int
     * @blazorType int
     */
    readonly zoomPercentage: number;
    /**
     * Get the Loaded document annotation Collections in the PdfViewer control.
     *
     * {% codeBlock src='pdfviewer/annotationCollection/index.md' %}{% endcodeBlock %}
     *
     */
    annotationCollection: any[];
    /**
     * Get the Loaded document formField Collections in the PdfViewer control.
     *
     * @private
     */
    formFieldCollection: any[];
    /**
     * Get the Loaded document signature Collections in the PdfViewer control.
     *
     * {% codeBlock src='pdfviewer/signatureCollection/index.md' %}{% endcodeBlock %}
     *
     */
    signatureCollection: any[];
    /**
     * Gets or sets the document name loaded in the PdfViewer control.
     *
     * {% codeBlock src='pdfviewer/fileName/index.md' %}{% endcodeBlock %}
     *
     */
    fileName: string;
    /**
     * Gets or sets the export annotations JSON file name in the PdfViewer control.
     *
     * {% codeBlock src='pdfviewer/exportAnnotationFileName/index.md' %}{% endcodeBlock %}
     *
     */
    exportAnnotationFileName: string;
    /**
     * Gets or sets the download file name in the PdfViewer control.
     *
     * {% codeBlock src='pdfviewer/downloadFileName/index.md' %}{% endcodeBlock %}
     *
     */
    downloadFileName: string;
    /**
     * Defines the scrollable height of the PdfViewer control.
     *
     * {% codeBlock src='pdfviewer/height/index.md' %}{% endcodeBlock %}
     *
     * @default 'auto'
     */
    height: string | number;
    /**
     * Defines the scrollable width of the PdfViewer control.
     *
     * {% codeBlock src='pdfviewer/width/index.md' %}{% endcodeBlock %}
     *
     * @default 'auto'
     */
    width: string | number;
    /**
     * Enable or disables the toolbar of PdfViewer.
     *
     * {% codeBlock src='pdfviewer/enableToolbar/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableToolbar: boolean;
    /**
     * Specifies the retry count for the failed requests.
     *
     * {% codeBlock src='pdfviewer/retryCount/index.md' %}{% endcodeBlock %}
     *
     * @default 1
     */
    retryCount: number;
    /**
     * Specifies the response status codes for retrying a failed request with a "3xx", "4xx", or "5xx" response status code.
     * The value can have multiple values, such as [500, 401, 400], and the default value is 500.
     *
     * {% codeBlock src='pdfviewer/retryStatusCodes/index.md' %}{% endcodeBlock %}
     *
     * @default [500]
     */
    retryStatusCodes: number[];
    /**
     * Gets or sets the timeout for retries in seconds.
     *
     * {% codeBlock src='pdfviewer/retryTimeout/index.md' %}{% endcodeBlock %}
     *
     * @default 0
     */
    retryTimeout: number;
    /**
     * Initially renders the first N pages of the PDF document when the document is loaded.
     *
     * {% codeBlock src='pdfviewer/initialRenderPages/index.md' %}{% endcodeBlock %}
     *
     * @default 2
     */
    initialRenderPages: number;
    /**
     * If it is set as false then error message box is not displayed in PDF viewer control.
     *
     * {% codeBlock src='pdfviewer/showNotificationDialog/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    showNotificationDialog: boolean;
    /**
     * Enable or disables the Navigation toolbar of PdfViewer.
     *
     * {% codeBlock src='pdfviewer/enableNavigationToolbar/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableNavigationToolbar: boolean;
    /**
     * Enable or disables the Comment Panel of PdfViewer.
     *
     * {% codeBlock src='pdfviewer/enableCommentPanel/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableCommentPanel: boolean;
    /**
     * If it set as true, then the command panel show at initial document loading in the PDF viewer
     *
     * {% codeBlock src='pdfviewer/isCommandPanelOpen/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    isCommandPanelOpen: boolean;
    /**
     * Enable or disable the text markup resizer to modify the bounds in UI.
     *
     * {% codeBlock src='pdfviewer/enableTextMarkupResizer/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    enableTextMarkupResizer: boolean;
    /**
     * Enable or disable the multi line text markup annotations in overlapping collections.
     *
     * {% codeBlock src='pdfviewer/enableMultiLineOverlap/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    enableMultiLineOverlap: boolean;
    /**
     * Checks if the freeText value is valid or not.
     *
     * {% codeBlock src='pdfviewer/isValidFreeText/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    isValidFreeText: boolean;
    /**
     * Opens the annotation toolbar when the PDF document is loaded in the PDF Viewer control initially.
     *

     * @default false
     */
    isAnnotationToolbarOpen: boolean;
    /**
     * Opens the annotation toolbar when the PDF document is loaded in the PDF Viewer control initially
     * and get the annotation Toolbar Visible status.
     *
     * {% codeBlock src='pdfviewer/isAnnotationToolbarVisible/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    isAnnotationToolbarVisible: boolean;
    /**
     * Opens the annotation toolbar when the PDF document is loaded in the PDF Viewer control initially
     * and get the annotation Toolbar Visible status.
     *
     * {% codeBlock src='pdfviewer/isFormDesignerToolbarVisible/index.md' %}{% endcodeBlock %}
     *
     * @public
     * @default false
     */
    isFormDesignerToolbarVisible: boolean;
    /**
     * Enables or disables the multi-page text markup annotation selection in UI.
     *
     * {% codeBlock src='pdfviewer/enableMultiPageAnnotation/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    enableMultiPageAnnotation: boolean;
    /**
     * Enable or disables the download option of PdfViewer.
     *
     * {% codeBlock src='pdfviewer/enableDownload/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableDownload: boolean;
    /**
     * Enable or disables the print option of PdfViewer.
     *
     * {% codeBlock src='pdfviewer/enablePrint/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enablePrint: boolean;
    /**
     * If it is set as FALSE, will suppress the page rotation of Landscape document on print action. By default it is TRUE.
     *
     * {% codeBlock src='pdfviewer/enablePrintRotation/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enablePrintRotation: boolean;
    /**
     * Enables or disables the thumbnail view in the PDF viewer
     *
     * {% codeBlock src='pdfviewer/enableThumbnail/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableThumbnail: boolean;
    /**
     * If it set as true, then the thumbnail view show at initial document loading in the PDF viewer
     *
     * {% codeBlock src='pdfviewer/isThumbnailViewOpen/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    isThumbnailViewOpen: boolean;
    /**
     * Enables or disable saving Hand Written signature as editable in the PDF.
     *
     * {% codeBlock src='pdfviewer/isSignatureEditable/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    isSignatureEditable: boolean;
    /**
     * Enables or disables the bookmark view in the PDF viewer
     *
     * {% codeBlock src='pdfviewer/enableBookmark/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableBookmark: boolean;
    /**
     * Enables or disables the bookmark styles in the PDF viewer
     *
     * {% codeBlock src='pdfviewer/enableBookmarkStyles/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    enableBookmarkStyles: boolean;
    /**
     * Enables or disables the hyperlinks in PDF document.
     *
     * {% codeBlock src='pdfviewer/enableHyperlink/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableHyperlink: boolean;
    /**
     * Enables or disables the handwritten signature in PDF document.
     *
     * {% codeBlock src='pdfviewer/enableHandwrittenSignature/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableHandwrittenSignature: boolean;
    /**
     * If it is set as false, then the ink annotation support in the PDF Viewer will be disabled. By default it is true.
     *
     * {% codeBlock src='pdfviewer/enableInkAnnotation/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableInkAnnotation: boolean;
    /**
     * restrict zoom request.
     *
     * {% codeBlock src='pdfviewer/restrictZoomRequest/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    restrictZoomRequest: boolean;
    /**
     * Specifies the open state of the hyperlink in the PDF document.
     *
     * {% codeBlock src='pdfviewer/hyperlinkOpenState/index.md' %}{% endcodeBlock %}
     *
     * @default CurrentTab
     */
    hyperlinkOpenState: LinkTarget;
    /**
     * Specifies the state of the ContextMenu in the PDF document.
     *
     * {% codeBlock src='pdfviewer/contextMenuOption/index.md' %}{% endcodeBlock %}
     *
     * @default RightClick
     */
    contextMenuOption: ContextMenuAction;
    /**
     * Disables the menu items in the context menu.
     *
     * {% codeBlock src='pdfviewer/disableContextMenuItems/index.md' %}{% endcodeBlock %}
     *
     * @default []
     */
    disableContextMenuItems: ContextMenuItem[];
    /**
     * Gets the form fields present in the loaded PDF document. It used to get the form fields id, name, type and it's values.
     *
     * {% codeBlock src='pdfviewer/formFieldCollections/index.md' %}{% endcodeBlock %}
     *
     */
    formFieldCollections: FormFieldModel[];
    /**
     * Enable or disable the Navigation module of PDF Viewer.
     *
     * {% codeBlock src='pdfviewer/enableNavigation/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableNavigation: boolean;
    /**
     * Enable or disables the auto complete option in form documents.
     *
     * {% codeBlock src='pdfviewer/enableAutoComplete/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableAutoComplete: boolean;
    /**
     * Enable or disable the Magnification module of PDF Viewer.
     *
     * {% codeBlock src='pdfviewer/enableMagnification/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableMagnification: boolean;
    /**
     * Enable or disable the Label for shapeAnnotations of PDF Viewer.
     *
     * {% codeBlock src='pdfviewer/enableShapeLabel/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    enableShapeLabel: boolean;
    /**
     * Enable or disable the customization of measure values in PDF Viewer.
     *
     * {% codeBlock src='pdfviewer/enableImportAnnotationMeasurement/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableImportAnnotationMeasurement: boolean;
    /**
     * Enable or disable the pinch zoom option in the PDF Viewer.
     *
     * {% codeBlock src='pdfviewer/enablePinchZoom/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enablePinchZoom: boolean;
    /**
     * Enable or disable the text selection in the PDF Viewer.
     *
     * {% codeBlock src='pdfviewer/enableTextSelection/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableTextSelection: boolean;
    /**
     * Enable or disable the text search in the PDF Viewer.
     *
     * {% codeBlock src='pdfviewer/enableTextSearch/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableTextSearch: boolean;
    /**
     * Enable or disable the annotation in the PDF Viewer.
     *
     * {% codeBlock src='pdfviewer/enableAnnotation/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableAnnotation: boolean;
    /**
     * Enable or disable the form fields in the PDF Viewer.
     *
     * {% codeBlock src='pdfviewer/enableFormFields/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableFormFields: boolean;
    /**
     * Show or hide the form designer tool in the main toolbar of the PDF Viewer.
     *
     * {% codeBlock src='pdfviewer/enableFormDesigner/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableFormDesigner: boolean;
    /**
     * Enable or disable the interaction of form fields in the PDF Viewer.
     *
     * {% codeBlock src='pdfviewer/designerMode/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    designerMode: boolean;
    /**
     * Enable or disable the form fields validation.
     *
     * {% codeBlock src='pdfviewer/enableFormFieldsValidation/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    enableFormFieldsValidation: boolean;
    /**
     * Enable if the PDF document contains form fields.
     *
     * {% codeBlock src='pdfviewer/isFormFieldDocument/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    isFormFieldDocument: boolean;
    /**
     * Gets or sets a boolean value to show or hide desktop toolbar in mobile devices.
     *
     * {% codeBlock src='pdfviewer/enableDesktopMode/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    enableDesktopMode: boolean;
    /**
     * Gets or sets a boolean value to show or hide the save signature check box option in the signature dialog.
     * FALSE by default
     *
     * @default false

     */
    hideSaveSignature: boolean;
    /**
     * Enable or disable the free text annotation in the PDF Viewer.
     *
     * {% codeBlock src='pdfviewer/enableFreeText/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableFreeText: boolean;
    /**
     * Enable or disable the text markup annotation in the PDF Viewer.
     *
     * {% codeBlock src='pdfviewer/enableTextMarkupAnnotation/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableTextMarkupAnnotation: boolean;
    /**
     * Enable or disable the shape annotation in the PDF Viewer.
     *
     * {% codeBlock src='pdfviewer/enableShapeAnnotation/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableShapeAnnotation: boolean;
    /**
     * Enable or disable the calibrate annotation in the PDF Viewer.
     *
     * {% codeBlock src='pdfviewer/enableMeasureAnnotation/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableMeasureAnnotation: boolean;
    /**
     * Enables and disable the stamp annotations when the PDF viewer control is loaded initially.
     *
     * {% codeBlock src='pdfviewer/enableStampAnnotations/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableStampAnnotations: boolean;
    /**
     * Enables and disable the stickyNotes annotations when the PDF viewer control is loaded initially.
     *
     * {% codeBlock src='pdfviewer/enableStickyNotesAnnotation/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableStickyNotesAnnotation: boolean;
    /**
     * Opens the annotation toolbar when the PDF document is loaded in the PDF Viewer control initially.
     *
     * {% codeBlock src='pdfviewer/enableAnnotationToolbar/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableAnnotationToolbar: boolean;
    /**
     * Opens the form designer toolbar when the PDF document is loaded in the PDF Viewer control initially.
     *
     * {% codeBlock src='pdfviewer/enableFormDesignerToolbar/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableFormDesignerToolbar: boolean;
    /**
     * Gets or sets a boolean value to show or hide the bookmark panel while loading a document.
     *
     * {% codeBlock src='pdfviewer/isBookmarkPanelOpen/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    isBookmarkPanelOpen: boolean;
    /**
     * Gets or sets a boolean value if initial field selected in form designer toolbar.
     *
     * @private
     * @default false
     */
    isInitialFieldToolbarSelection: boolean;
    /**
     * Sets the interaction mode of the PDF Viewer.
     *
     * {% codeBlock src='pdfviewer/interactionMode/index.md' %}{% endcodeBlock %}
     *
     * @default TextSelection
     */
    interactionMode: InteractionMode;
    /**
     * Specifies the rendering mode in the PDF Viewer.
     *
     * {% codeBlock src='pdfviewer/zoomMode/index.md' %}{% endcodeBlock %}
     *
     * @default Default
     */
    zoomMode: ZoomMode;
    /**
     * Specifies the signature mode in the PDF Viewer.
     *
     * {% codeBlock src='pdfviewer/signatureFitMode/index.md' %}{% endcodeBlock %}
     *
     * @default Default
     */
    signatureFitMode: SignatureFitMode;
    /**
     * Specifies the print mode in the PDF Viewer.
     *
     * {% codeBlock src='pdfviewer/printMode/index.md' %}{% endcodeBlock %}
     *
     * @default Default
     */
    printMode: PrintMode;
    /**
     * Sets the initial loading zoom value from 10 to 400 in the PDF Viewer Control.
     *
     * {% codeBlock src='pdfviewer/zoomValue/index.md' %}{% endcodeBlock %}
     *
     * @default 0
     */
    zoomValue: number;
    /**
     *  Enable or disable the zoom optimization mode in PDF Viewer.
     *
     * {% codeBlock src='pdfviewer/enableZoomOptimization/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableZoomOptimization: boolean;
    /**
     * Enable or disable the text extract from the PDF viewer.
     *
     * {% codeBlock src='pdfviewer/isExtractText/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    isExtractText: boolean;
    /**
     * Maintain the selection of text markup annotation.
     *
     * {% codeBlock src='pdfviewer/isMaintainSelection/index.md' %}{% endcodeBlock %}
     *
     * @default false
     */
    isMaintainSelection: boolean;
    /**
    *  Get or set the flag to hide the digitally signed field on document loading.
    *
    * @private
    * @default false
    */
    hideEmptyDigitalSignatureFields: boolean;
    /**
    *  Show or hide the digital signature appearance in the document.
    *
    * {% codeBlock src='pdfviewer/showDigitalSignatureAppearance/index.md' %}{% endcodeBlock %}
    *
    * @default true
    */
    showDigitalSignatureAppearance: boolean;
    /**
     *  Determines whether accessibility tags are enabled or disabled.
     *  Accessibility tags can help make web content more accessible to users with disabilities.
     *
     * {% codeBlock src='pdfviewer/enableAccessibilityTags/index.md' %}{% endcodeBlock %}
     *
     * @default true
     */
    enableAccessibilityTags: boolean;
    /**
     * Customize desired date and time format
     *
     * {% codeBlock src='pdfviewer/dateTimeFormat/index.md' %}{% endcodeBlock %}
     *
     */
    dateTimeFormat: string;
    /**
     * Defines the settings of the PDF Viewer toolbar.
     *
     * {% codeBlock src='pdfviewer/toolbarSettings/index.md' %}{% endcodeBlock %}
     *
     */
    toolbarSettings: ToolbarSettingsModel;
    /**
     * Defines the ajax Request settings of the PDF Viewer.
     *
     * {% codeBlock src='pdfviewer/ajaxRequestSettings/index.md' %}{% endcodeBlock %}
     *
     */
    ajaxRequestSettings: AjaxRequestSettingsModel;
    /**
     * Defines the stamp items of the PDF Viewer.
     *
     * {% codeBlock src='pdfviewer/customStamp/index.md' %}{% endcodeBlock %}
     *
     */
    customStamp: CustomStampModel[];
    /**
     * Defines the settings of the PDF Viewer service.
     *
     * {% codeBlock src='pdfviewer/serverActionSettings/index.md' %}{% endcodeBlock %}
     *
     */
    serverActionSettings: ServerActionSettingsModel;
    /**
     * Get or set the signature field settings.
     *
     * {% codeBlock src='pdfviewer/signatureFieldSettings/index.md' %}{% endcodeBlock %}
     *
     */
    signatureFieldSettings: SignatureFieldSettingsModel;
    /**
     * Get or set the initial field settings.
     *
     * {% codeBlock src='pdfviewer/initialFieldSettings/index.md' %}{% endcodeBlock %}
     *
     */
    initialFieldSettings: InitialFieldSettingsModel;
    /**
     * Defines the settings of highlight annotation.
     *
     * {% codeBlock src='pdfviewer/highlightSettings/index.md' %}{% endcodeBlock %}
     *
     */
    highlightSettings: HighlightSettingsModel;
    /**
     * Defines the settings of strikethrough annotation.
     *
     * {% codeBlock src='pdfviewer/strikethroughSettings/index.md' %}{% endcodeBlock %}
     *
     */
    strikethroughSettings: StrikethroughSettingsModel;
    /**
     * Defines the settings of underline annotation.
     *
     * {% codeBlock src='pdfviewer/underlineSettings/index.md' %}{% endcodeBlock %}
     *
     */
    underlineSettings: UnderlineSettingsModel;
    /**
     * Defines the settings of line annotation.
     *
     * {% codeBlock src='pdfviewer/lineSettings/index.md' %}{% endcodeBlock %}
     *
     */
    lineSettings: LineSettingsModel;
    /**
     * Defines the settings of arrow annotation.
     *
     * {% codeBlock src='pdfviewer/arrowSettings/index.md' %}{% endcodeBlock %}
     *
     */
    arrowSettings: ArrowSettingsModel;
    /**
     * Defines the settings of rectangle annotation.
     *
     * {% codeBlock src='pdfviewer/rectangleSettings/index.md' %}{% endcodeBlock %}
     *
     */
    rectangleSettings: RectangleSettingsModel;
    /**
     * Defines the settings of shape label.
     *
     * {% codeBlock src='pdfviewer/shapeLabelSettings/index.md' %}{% endcodeBlock %}
     *
     */
    shapeLabelSettings: ShapeLabelSettingsModel;
    /**
     * Defines the settings of circle annotation.
     *
     * {% codeBlock src='pdfviewer/circleSettings/index.md' %}{% endcodeBlock %}
     *
     */
    circleSettings: CircleSettingsModel;
    /**
     * Defines the settings of polygon annotation.
     *
     * {% codeBlock src='pdfviewer/polygonSettings/index.md' %}{% endcodeBlock %}
     *
     */
    polygonSettings: PolygonSettingsModel;
    /**
     * Defines the settings of stamp annotation.
     *
     * {% codeBlock src='pdfviewer/stampSettings/index.md' %}{% endcodeBlock %}
     *
     */
    stampSettings: StampSettingsModel;
    /**
     * Defines the settings of customStamp annotation.
     *
     * {% codeBlock src='pdfviewer/customStampSettings/index.md' %}{% endcodeBlock %}
     *
     */
    customStampSettings: CustomStampSettingsModel;
    /**
     * Defines the settings of distance annotation.
     *
     * {% codeBlock src='pdfviewer/distanceSettings/index.md' %}{% endcodeBlock %}
     *
     */
    distanceSettings: DistanceSettingsModel;
    /**
     * Defines the settings of perimeter annotation.
     *
     * {% codeBlock src='pdfviewer/perimeterSettings/index.md' %}{% endcodeBlock %}
     *
     */
    perimeterSettings: PerimeterSettingsModel;
    /**
     * Defines the settings of area annotation.
     *
     * {% codeBlock src='pdfviewer/areaSettings/index.md' %}{% endcodeBlock %}
     *
     */
    areaSettings: AreaSettingsModel;
    /**
     * Defines the settings of radius annotation.
     *
     * {% codeBlock src='pdfviewer/radiusSettings/index.md' %}{% endcodeBlock %}
     *
     */
    radiusSettings: RadiusSettingsModel;
    /**
     * Defines the settings of volume annotation.
     *
     * {% codeBlock src='pdfviewer/volumeSettings/index.md' %}{% endcodeBlock %}
     *
     */
    volumeSettings: VolumeSettingsModel;
    /**
     * Defines the settings of stickyNotes annotation.
     *
     * {% codeBlock src='pdfviewer/stickyNotesSettings/index.md' %}{% endcodeBlock %}
     *
     */
    stickyNotesSettings: StickyNotesSettingsModel;
    /**
     * Defines the settings of free text annotation.
     *
     * {% codeBlock src='pdfviewer/freeTextSettings/index.md' %}{% endcodeBlock %}
     *
     */
    freeTextSettings: FreeTextSettingsModel;
    /**
     * Defines the settings of measurement annotation.
     *
     * {% codeBlock src='pdfviewer/measurementSettings/index.md' %}{% endcodeBlock %}
     *
     */
    measurementSettings: MeasurementSettingsModel;
    /**
     * Defines the settings of annotation selector.
     *
     * {% codeBlock src='pdfviewer/annotationSelectorSettings/index.md' %}{% endcodeBlock %}
     *
     */
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    /**
     * Sets the settings for the color of the text search highlight.
     *
     * {% codeBlock src='pdfviewer/textSearchColorSettings/index.md' %}{% endcodeBlock %}
     *
     */
    textSearchColorSettings: TextSearchColorSettingsModel;
    /**
     * Get or set the signature dialog settings for signature field.
     *
     * {% codeBlock src='pdfviewer/signatureDialogSettings/index.md' %}{% endcodeBlock %}
     *
     */
    signatureDialogSettings: SignatureDialogSettingsModel;
    /**
     * Get or set the signature dialog settings for initial field.
     *
     * {% codeBlock src='pdfviewer/initialDialogSettings/index.md' %}{% endcodeBlock %}
     *
     */
    initialDialogSettings: SignatureDialogSettingsModel;
    /**
     * Defines the settings of handWrittenSignature.
     *
     * {% codeBlock src='pdfviewer/handWrittenSignatureSettings/index.md' %}{% endcodeBlock %}
     *
     */
    handWrittenSignatureSettings: HandWrittenSignatureSettingsModel;
    /**
     * Defines the ink annotation settings for PDF Viewer.It used to customize the strokeColor, thickness, opacity of the ink annotation.
     *
     * {% codeBlock src='pdfviewer/inkAnnotationSettings/index.md' %}{% endcodeBlock %}
     *
     */
    inkAnnotationSettings: InkAnnotationSettingsModel;
    /**
     * Defines the settings of the annotations.
     *
     * {% codeBlock src='pdfviewer/annotationSettings/index.md' %}{% endcodeBlock %}
     *
     */
    annotationSettings: AnnotationSettingsModel;
    /**
     * Defines the tile rendering settings.
     *
     * {% codeBlock src='pdfviewer/tileRenderingSettings/index.md' %}{% endcodeBlock %}
     *
     */
    tileRenderingSettings: TileRenderingSettingsModel;
    /**
     * Defines the scroll settings.
     *
     * {% codeBlock src='pdfviewer/scrollSettings/index.md' %}{% endcodeBlock %}
     *
     */
    scrollSettings: ScrollSettingsModel;
    /**
     * Get or set the text field settings.
     *
     * {% codeBlock src='pdfviewer/textFieldSettings/index.md' %}{% endcodeBlock %}
     *
     */
    textFieldSettings: TextFieldSettingsModel;
    /**
     * Get or set the password field settings.
     *
     * {% codeBlock src='pdfviewer/passwordFieldSettings/index.md' %}{% endcodeBlock %}
     *
     */
    passwordFieldSettings: PasswordFieldSettingsModel;
    /**
     * Get or set the check box field settings.
     *
     * {% codeBlock src='pdfviewer/checkBoxFieldSettings/index.md' %}{% endcodeBlock %}
     *
     */
    checkBoxFieldSettings: CheckBoxFieldSettingsModel;
    /**
     * Get or set the radio button field settings.
     *
     * {% codeBlock src='pdfviewer/radioButtonFieldSettings/index.md' %}{% endcodeBlock %}
     *
     */
    radioButtonFieldSettings: RadioButtonFieldSettingsModel;
    /**
     * Get or set the dropdown field settings.
     *
     * {% codeBlock src='pdfviewer/DropdownFieldSettings/index.md' %}{% endcodeBlock %}
     *
     */
    DropdownFieldSettings: DropdownFieldSettingsModel;
    /**
     * Get or set the listbox field settings.
     *
     * {% codeBlock src='pdfviewer/listBoxFieldSettings/index.md' %}{% endcodeBlock %}
     *
     */
    listBoxFieldSettings: ListBoxFieldSettingsModel;
    /**
     * Defines the context menu settings.
     *
     * {% codeBlock src='pdfviewer/contextMenuSettings/index.md' %}{% endcodeBlock %}
     *
     */
    contextMenuSettings: ContextMenuSettingsModel;
    /**
     * @private
     */
    viewerBase: PdfViewerBase;
    /**
     * @private
     */
    drawing: Drawing;
    /**
     * @private
     */
    /**
     * Defines the collection of selected items, size and position of the selector
     *
     * @default {}
     */
    selectedItems: SelectorModel;
    /**
     * @private
     */
    adornerSvgLayer: SVGSVGElement;
    /**
     * @private
     */
    zIndex: number;
    /**
     * @private
     */
    nameTable: {};
    /**   @private  */
    clipboardData: ClipBoardObject;
    /**
     * @private
     */
    zIndexTable: ZOrderPageTable[];
    /**
     * @private
     */
    navigationModule: Navigation;
    /**
     * @private
     */
    toolbarModule: Toolbar;
    /**
     * @private
     */
    magnificationModule: Magnification;
    /**
     * @private
     */
    linkAnnotationModule: LinkAnnotation;
    /** @hidden */
    localeObj: L10n;
    /**
     * @private
     */
    thumbnailViewModule: ThumbnailView;
    /**
     * @private
     */
    bookmarkViewModule: BookmarkView;
    /**
     * @private
     */
    textSelectionModule: TextSelection;
    /**
     * @private
     */
    textSearchModule: TextSearch;
    /**
     * @private
     */
    printModule: Print;
    /**
     * @private
     */
    annotationModule: Annotation;
    /**
     * @private
     */
    formFieldsModule: FormFields;
    /**
     * @private
     */
    formDesignerModule: FormDesigner;
    /**
    * @private
    */
    accessibilityTagsModule: AccessibilityTags;
    private isTextSelectionStarted;
    /**
     * @private
     */
    _dotnetInstance: any;
    /**
     * Gets the bookmark view object of the pdf viewer.
     *
     * @asptype BookmarkView
     * @blazorType BookmarkView
     * @returns { BookmarkView }
     */
    readonly bookmark: BookmarkView;
    /**
     * Gets the print object of the pdf viewer.
     *
     * @asptype Print
     * @blazorType Print
     * @returns { Print }
     */
    readonly print: Print;
    /**
     * Gets the magnification object of the pdf viewer.
     *
     * @asptype Magnification
     * @blazorType Magnification
     * @returns { Magnification }
     */
    readonly magnification: Magnification;
    /**
     * Gets the navigation object of the pdf viewer.
     *
     * @asptype Navigation
     * @blazorType Navigation
     * @returns { Navigation }
     */
    readonly navigation: Navigation;
    /**
     * Gets the text search object of the pdf viewer.
     *
     * @asptype TextSearch
     * @blazorType TextSearch
     * @returns { TextSearch }
     */
    readonly textSearch: TextSearch;
    /**
     * Gets the toolbar object of the pdf viewer.
     *
     * @asptype Toolbar
     * @blazorType Toolbar
     * @returns { Toolbar }
     */
    readonly toolbar: Toolbar;
    /**
     * Gets the thumbnail-view object of the pdf viewer.
     *
     * @asptype ThumbnailView
     * @blazorType ThumbnailView
     * @returns { ThumbnailView }
     */
    readonly thumbnailView: ThumbnailView;
    /**
     * Gets the annotation object of the pdf viewer.
     *
     * @asptype Annotation
     * @blazorType Annotation
     * @returns { Annotation }
     */
    readonly annotation: Annotation;
    /**
     * Gets the FormDesigner object of the pdf viewer.
     *
     * @asptype FormDesigner
     * @blazorType FormDesigner
     * @returns { FormDesigner }
     */
    readonly formDesigner: FormDesigner;
    /**
     * Gets the TextSelection object of the pdf viewer.
     *
     * @asptype TextSelection
     * @blazorType TextSelection
     * @returns { TextSelection }
     */
    readonly textSelection: TextSelection;
    /**
     * Gets the Accessibility Tags object of the pdf viewer.
     *
     * @asptype AccessibilityTags
     * @blazorType AccessibilityTags
     * @returns { AccessibilityTags }
     */
    readonly accessibilityTags: AccessibilityTags;
    /**
     * Triggers during the creation of the PDF viewer component.
     *
     * @event created
     * @blazorProperty 'Created'
     */
    created: EmitType<void>;
    /**
     * Triggers while loading document into PDF viewer.
     *
     * @event documentLoad
     * @blazorProperty 'DocumentLoaded'
     */
    documentLoad: EmitType<LoadEventArgs>;
    /**
     * Triggers while closing the document.
     *
     * @event documentUnload
     * @blazorProperty 'DocumentUnloaded'
     */
    documentUnload: EmitType<UnloadEventArgs>;
    /**
     * Triggers while document loading failed in PdfViewer.
     *
     * @event documentLoadFailed
     * @blazorProperty 'DocumentLoadFailed'
     */
    documentLoadFailed: EmitType<LoadFailedEventArgs>;
    /**
     * Triggers when the AJAX request is failed.
     *
     * @event ajaxRequestFailed
     * @blazorProperty 'AjaxRequestFailed'
     */
    ajaxRequestFailed: EmitType<AjaxRequestFailureEventArgs>;
    /**
     * Triggers on successful AJAX request.
     *
     * @event ajaxRequestSuccess
     */
    ajaxRequestSuccess: EmitType<AjaxRequestSuccessEventArgs>;
    /**
     * Triggers when validation is failed.
     *
     * @event validateFormFields
     * @blazorProperty 'validateFormFields'
     */
    validateFormFields: EmitType<ValidateFormFieldsArgs>;
    /**
     * Triggers when the mouse click is performed over the page of the PDF document.
     *
     * @event pageClick
     * @blazorProperty 'OnPageClick'
     */
    pageClick: EmitType<PageClickEventArgs>;
    /**
     * Triggers when there is change in current page number.
     *
     * @event pageChange
     * @blazorProperty 'PageChanged'
     */
    pageChange: EmitType<PageChangeEventArgs>;
    /**
     * Triggers when a hyperlink in a PDF document is clicked.
     *
     * @event hyperlinkClick
     * @blazorProperty 'OnHyperlinkClick'
     */
    hyperlinkClick: EmitType<HyperlinkClickEventArgs>;
    /**
     * Triggers when hyperlink in a PDF document is hovered.
     *
     * @event hyperlinkMouseOver
     * @blazorProperty 'OnHyperlinkMouseOver'
     */
    hyperlinkMouseOver: EmitType<HyperlinkMouseOverArgs>;
    /**
     * Triggers When the magnification value changes.
     *
     * @event zoomChange
     * @blazorProperty 'ZoomChanged'
     */
    zoomChange: EmitType<ZoomChangeEventArgs>;
    /**
     * Triggers when an annotation is added to a PDF document's page.
     *
     * @event annotationAdd
     * @blazorProperty 'AnnotationAdded'
     */
    annotationAdd: EmitType<AnnotationAddEventArgs>;
    /**
     * Triggers when an annotation is removed from a PDF document's page.
     *
     * @event annotationRemove
     * @blazorProperty 'AnnotationRemoved'
     */
    annotationRemove: EmitType<AnnotationRemoveEventArgs>;
    /**
     * Triggers when the annotation's property is modified on a PDF document page.
     *
     * @event annotationPropertiesChange
     * @blazorProperty 'AnnotationPropertiesChanged'
     */
    annotationPropertiesChange: EmitType<AnnotationPropertiesChangeEventArgs>;
    /**
     * Triggers when an annotation is resized over the page of a PDF document.
     *
     * @event annotationResize
     * @blazorProperty 'AnnotationResized'
     */
    annotationResize: EmitType<AnnotationResizeEventArgs>;
    /**
     * Triggers when a signature is added to a page of a PDF document.
     *
     * @event addSignature
     */
    addSignature: EmitType<AddSignatureEventArgs>;
    /**
     * Triggers when the signature is removed from the page of a PDF document.
     *
     * @event removeSignature
     */
    removeSignature: EmitType<RemoveSignatureEventArgs>;
    /**
     * Triggers when a signature is moved across the page of a PDF document.
     *
     * @event moveSignature
     */
    moveSignature: EmitType<MoveSignatureEventArgs>;
    /**
     * Triggers when the property of the signature is changed in the page of the PDF document.
     *
     * @event signaturePropertiesChange
     */
    signaturePropertiesChange: EmitType<SignaturePropertiesChangeEventArgs>;
    /**
     * Triggers when the signature is resized and placed on a page of a PDF document.
     *
     * @event resizeSignature
     */
    resizeSignature: EmitType<ResizeSignatureEventArgs>;
    /**
     * Triggers when signature is selected over the page of the PDF document.
     *
     * @event signatureSelect
     */
    signatureSelect: EmitType<SignatureSelectEventArgs>;
    /**
     * Triggers when an annotation is selected over the page of the PDF document.
     *
     * @event annotationSelect
     * @blazorProperty 'AnnotationSelected'
     */
    annotationSelect: EmitType<AnnotationSelectEventArgs>;
    /**
     * Triggers when an annotation is unselected over the page of the PDF document.
     *
     * @event annotationUnSelect
     * @blazorProperty 'AnnotationUnSelect'
     */
    annotationUnSelect: EmitType<AnnotationUnSelectEventArgs>;
    /**
     * Triggers when the annotation is double clicked.
     *
     * @event annotationDoubleClick
     * @blazorProperty 'OnAnnotationDoubleClick'
     */
    annotationDoubleClick: EmitType<AnnotationDoubleClickEventArgs>;
    /**
     * Triggers when an annotation is moved over the page of the PDF document.
     *
     * @event annotationMove
     * @blazorProperty 'AnnotationMoved'
     */
    annotationMove: EmitType<AnnotationMoveEventArgs>;
    /**
     * Triggers while moving an annotation.
     *
     * @event annotationMoving
     * @blazorProperty 'AnnotationMoving'
     */
    annotationMoving: EmitType<AnnotationMovingEventArgs>;
    /**
     * Triggers when the mouse is moved over the annotation object.
     *
     * @event annotationMouseover
     */
    annotationMouseover: EmitType<AnnotationMouseoverEventArgs>;
    /**
     * Triggers when the user mouse moves away from the annotation object.
     *
     * @event annotationMouseLeave
     */
    annotationMouseLeave: EmitType<AnnotationMouseLeaveEventArgs>;
    /**
     * Triggers when moving the mouse over the page.
     *
     * @event pageMouseover
     */
    pageMouseover: EmitType<PageMouseoverEventArgs>;
    /**
     * Triggers when an imported annotation started to appear in the PDF document.
     *
     * @event importStart
     * @blazorProperty 'ImportStarted'
     */
    importStart: EmitType<ImportStartEventArgs>;
    /**
     * Triggers when an exported annotation started in the PDF Viewer.
     *
     * @event exportStart
     * @blazorProperty 'ExportStarted'
     */
    exportStart: EmitType<ExportStartEventArgs>;
    /**
     * Triggers when the annotations in a PDF document are successfully imported.
     *
     * @event importSuccess
     * @blazorProperty 'ImportSucceed'
     */
    importSuccess: EmitType<ImportSuccessEventArgs>;
    /**
     * Triggers when the annotations in a PDF document are successfully exported.
     *
     * @event exportSuccess
     * @blazorProperty 'ExportSucceed'
     */
    exportSuccess: EmitType<ExportSuccessEventArgs>;
    /**
     * Triggers when the annotations imports in a PDF document fails.
     *
     * @event importFailed
     * @blazorProperty 'ImportFailed'
     */
    importFailed: EmitType<ImportFailureEventArgs>;
    /**
     * Triggers when the annotations export in a PDF document fails.
     *
     * @event exportFailed
     * @blazorProperty 'ExportFailed'
     */
    exportFailed: EmitType<ExportFailureEventArgs>;
    /**
     * Triggers when an text extraction is completed in the PDF Viewer.
     *
     * @event extractTextCompleted
     * @blazorProperty 'ExtractTextCompleted'
     */
    extractTextCompleted: EmitType<ExtractTextCompletedEventArgs>;
    /**
     * Triggers when the thumbnail in the PDF Viewer's thumbnail panel is clicked.
     *
     * @event thumbnailClick
     * @blazorProperty 'OnThumbnailClick'
     */
    thumbnailClick: EmitType<ThumbnailClickEventArgs>;
    /**
     * Triggers when the bookmark is clicked in the PDF Viewer's bookmark panel.
     *
     * @event bookmarkClick
     * @blazorProperty 'BookmarkClick'
     */
    bookmarkClick: EmitType<BookmarkClickEventArgs>;
    /**
     * Triggers when the text selection is initiated.
     *
     * @event textSelectionStart
     * @blazorProperty 'OnTextSelectionStart'
     */
    textSelectionStart: EmitType<TextSelectionStartEventArgs>;
    /**
     * Triggers when the text selection is complete.
     *
     * @event textSelectionEnd
     * @blazorProperty 'OnTextSelectionEnd'
     */
    textSelectionEnd: EmitType<TextSelectionEndEventArgs>;
    /**
     * Triggers when the download action is initiated.
     *
     * @event downloadStart
     * @blazorProperty 'DownloadStart'
     */
    downloadStart: EmitType<DownloadStartEventArgs>;
    /**
     * Triggers when the button is clicked.
     *

     * @event buttonFieldClick
     * @blazorProperty 'ButtonFieldClick'
     */
    buttonFieldClick: EmitType<ButtonFieldClickEventArgs>;
    /**
     * Triggers when the form field is selected.
     *
     * @event formFieldClick
     * @blazorProperty 'FormFieldClick'
     */
    formFieldClick: EmitType<FormFieldClickArgs>;
    /**
     * Triggers when the download actions are completed.
     *
     * @event downloadEnd
     * @blazorProperty 'DownloadEnd'
     */
    downloadEnd: EmitType<DownloadEndEventArgs>;
    /**
     * Triggers when the print action is initiated.
     *
     * @event printStart
     * @blazorProperty 'PrintStart'
     */
    printStart: EmitType<PrintStartEventArgs>;
    /**
     * Triggers when the print actions are completed.
     *
     * @event printEnd
     * @blazorProperty 'PrintEnd'
     */
    printEnd: EmitType<PrintEndEventArgs>;
    /**
     * Triggers when the text search is initiated.
     *
     * @event textSearchStart
     * @blazorProperty 'OnTextSearchStart'
     */
    textSearchStart: EmitType<TextSearchStartEventArgs>;
    /**
     * Triggers when the text search is completed.
     *
     * @event textSearchComplete
     * @blazorProperty 'OnTextSearchComplete'
     */
    textSearchComplete: EmitType<TextSearchCompleteEventArgs>;
    /**
     * Triggers when the text search text is highlighted.
     *
     * @event textSearchHighlight
     * @blazorProperty 'OnTextSearchHighlight'
     */
    textSearchHighlight: EmitType<TextSearchHighlightEventArgs>;
    /**
     * Triggers before the data is sent to the server.
     *
     * @event ajaxRequestInitiate
     */
    ajaxRequestInitiate: EmitType<AjaxRequestInitiateEventArgs>;
    /**
     * Triggers when a comment for the annotation is added to the comment panel.
     *
     * @event commentAdd
     * @blazorProperty 'commentAdd'
     */
    commentAdd: EmitType<CommentEventArgs>;
    /**
     * Triggers when the comment for the annotation in the comment panel is edited.
     *
     * @event commentEdit
     * @blazorProperty 'commentEdit'
     */
    commentEdit: EmitType<CommentEventArgs>;
    /**
     * Triggers when the comment for the annotation in the comment panel is deleted.
     *
     * @event commentDelete
     * @blazorProperty 'commentDelete'
     */
    commentDelete: EmitType<CommentEventArgs>;
    /**
     * Triggers when the comment for the annotation in the comment panel is selected.
     *
     * @event commentSelect
     * @blazorProperty 'commentSelect
     */
    commentSelect: EmitType<CommentEventArgs>;
    /**
     * Triggers when the annotation's comment for status is changed in the comment panel.
     *
     * @event commentStatusChanged
     * @blazorProperty 'commentStatusChanged'
     */
    commentStatusChanged: EmitType<CommentEventArgs>;
    /**
     * Triggers before adding a text in the freeText annotation.
     *
     * @event beforeAddFreeText
     * @blazorProperty 'beforeAddFreeText'
     */
    beforeAddFreeText: EmitType<BeforeAddFreeTextEventArgs>;
    /**
     * Triggers when focus out from the form fields.
     *
     * @event formFieldFocusOut
     * @blazorProperty 'formFieldFocusOut'
     */
    formFieldFocusOut: EmitType<FormFieldFocusOutEventArgs>;
    /**
     * Triggers when a form field is added.
     *
     * @event formFieldAdd
     * @blazorProperty 'formFieldAdd'
     */
    formFieldAdd: EmitType<FormFieldAddArgs>;
    /**
     * Triggers when a form field is removed.
     *
     * @event formFieldRemove
     * @blazorProperty 'formFieldRemove'
     */
    formFieldRemove: EmitType<FormFieldRemoveArgs>;
    /**
     * Triggers when a property of form field is changed.
     *
     * @event formFieldPropertiesChange
     * @blazorProperty 'formFieldPropertiesChange'
     */
    formFieldPropertiesChange: EmitType<FormFieldPropertiesChangeArgs>;
    /**
     * Triggers when the mouse cursor leaves the form field.
     *
     * @event formFieldMouseLeave
     * @blazorProperty 'formFieldMouseLeave'
     */
    formFieldMouseLeave: EmitType<FormFieldMouseLeaveArgs>;
    /**
     * Triggers when the mouse cursor is over a form field.
     *
     * @event formFieldMouseover
     * @blazorProperty 'formFieldMouseover'
     */
    formFieldMouseover: EmitType<FormFieldMouseoverArgs>;
    /**
     * Triggers when a form field is moved.
     *
     * @event formFieldMove
     * @blazorProperty 'formFieldMove'
     */
    formFieldMove: EmitType<FormFieldMoveArgs>;
    /**
     * Triggers when a form field is resized.
     *
     * @event formFieldResize
     * @blazorProperty 'formFieldResize'
     */
    formFieldResize: EmitType<FormFieldResizeArgs>;
    /**
     * Triggers when a form field is selected.
     *
     * @event formFieldSelect
     * @blazorProperty 'formFieldSelect'
     */
    formFieldSelect: EmitType<FormFieldSelectArgs>;
    /**
     * Triggers when a form field is unselected.
     *
     * @event formFieldUnselect
     * @blazorProperty 'formFieldUnselect'
     */
    formFieldUnselect: EmitType<FormFieldUnselectArgs>;
    /**
     * Triggers when the form field is double-clicked.
     *
     * @event formFieldDoubleClick
     * @blazorProperty 'formFieldDoubleClick'
     */
    formFieldDoubleClick: EmitType<FormFieldDoubleClickArgs>;
    /**
     * PDF document annotation collection.
     *
     * @private

     */
    annotations: PdfAnnotationBaseModel[];
    /**
     * PDF document form fields collection.
     *
     * @private

     */
    formFields: PdfFormFieldBaseModel[];
    /**
     * @private

     */
    tool: string;
    /**
     * @private
     */
    touchPadding: number;
    /**
     * @private
     */
    paddingDifferenceValue: number;
    /**
     * store the drawing objects.
     *
     * @private

     */
    drawingObject: PdfAnnotationBaseModel;
    constructor(options?: PdfViewerModel, element?: string | HTMLElement);
    protected preRender(): void;
    private getUniqueElementId;
    protected render(): void;
    getModuleName(): string;
    /**
     * @private
     */
    getLocaleConstants(): Object;
    /**
     * To modify the Json Data in ajax request.
     *
     * @param jsonData
     * @returns void
     */
    setJsonData(jsonData: any): void;
    onPropertyChanged(newProp: PdfViewerModel, oldProp: PdfViewerModel): void;
    private renderCustomerStamp;
    getPersistData(): string;
    requiredModules(): ModuleDeclaration[];
    /** @hidden */
    defaultLocale: Object;
    /**
     * Loads the given PDF document in the PDF viewer control
     *
     * @param  {string} document - Specifies the document name for load
     * @param  {string} password - Specifies the Given document password
     * @returns void
     */
    load(document: string, password: string): void;
    /**
     * Loads the given PDF document in the PDF viewer control
     * @private
     */
    loadDocument(documentId: string, isFileName: boolean, fileName: string): void;
    /**
     * Loads the PDF document with the document details in the PDF viewer control
    * @private
    */
    loadSuccess(documentDetails: any, password?: string): void;
    /**
     * Set the focus of the given element
    * @private
    */
    focusElement(elementId: string): void;
    /**
     * Downloads the PDF document being loaded in the ejPdfViewer control.
     *
     * @returns void
     */
    download(): void;
    /**
     * Saves the PDF document being loaded in the PDF Viewer control as blob.
     *
     * @returns Promise<Blob>
     */
    saveAsBlob(): Promise<Blob>;
    /**
     * updates the PDF Viewer container width and height from externally.
     *
     * @returns void
     */
    updateViewerContainer(): void;
    /**
     * Specifies the message to be displayed  in the popup.
     *
     * @param errorString
     * @returns void
     */
    showNotificationPopup(errorString: string): void;
    /**
     * Focus a form field in a document by its field name or the field object.
     *
     * @param field
     * @returns void
     */
    focusFormField(field: any): void;
    /**
     * Update the form field values from externally.
     *
     * @param fieldValue
     * @returns void
     */
    updateFormFieldsValue(fieldValue: any): void;
    private getFormFieldByID;
    /**
     * @param number
     */
    private ConvertPointToPixel;
    /**
     * @param currentData - Current form field data.
     * @param fieldValue - Form Field.
     * @returns - Returns the updated the current Data.
     */
    private updateSignatureValue;
    private imageOnLoad;
    /**
     * Perform undo action for the edited annotations
     *
     * @returns void
     */
    undo(): void;
    /**
     * Perform redo action for the edited annotations
     *
     * @returns void
     */
    redo(): void;
    /**
     * Unloads the PDF document being displayed in the PDF viewer.
     *
     * @returns void
     */
    unload(): void;
    /**
     * Destroys all managed resources used by this object.
     *
     * @returns void
     */
    destroy(): void;
    /**
     * Perform imports annotations action in the PDF Viewer
     * @param  {any} importData - Specifies the data for annotation imports
     * @returns void
     */
    importAnnotation(importData: any, annotationDataFormat?: AnnotationDataFormat): void;
    private importAnnotationsAsJson;
    /**
     * Perform export annotations action in the PDF Viewer
     *
     * @param annotationDataFormat
     * @returns void
     */
    exportAnnotation(annotationDataFormat?: AnnotationDataFormat): void;
    /**
     * Perform export annotations action in the PDF Viewer
     *
     *@param {AnnotationDataFormat} annotationDataFormat - Export the annotation based on the format.
     
     * @returns Promise<object>
     */
    exportAnnotationsAsObject(annotationDataFormat?: AnnotationDataFormat): Promise<object>;
    /**
     * Export annotations and returns a base64 string for both Json and XFDF formats
     *
     * @param {AnnotationDataFormat} annotationDataFormat
     * @returns Promise<string>
     */
    exportAnnotationsAsBase64String(annotationDataFormat: AnnotationDataFormat): Promise<string>;
    /**
     * Perform to add annotations in the PDF Viewer
     *
     * @param annotation
     * @returns void
     */
    addAnnotation(annotation: any): void;
    /**
     * Imports the form fields data into the current PDF document.
     *
     * @param {string} data - The path for importing the fields.
     * @param {FormFieldDataFormat} formFieldDataFormat
     * @returns void
     */
    importFormFields(data?: string, formFieldDataFormat?: FormFieldDataFormat): void;
    /**
     * Exports the form field data in the specified data format.
     *
     * @param {string} data - The path for exporting the fields.
     * @param {FormFieldDataFormat} formFieldDataFormat
     * @returns void
     */
    exportFormFields(data?: string, formFieldDataFormat?: FormFieldDataFormat): void;
    /**
     * Returns an object which represents the form field data in the specified data format.
     *
     * @param {FormFieldDataFormat} formFieldDataFormat
     * @returns Promise<object>
     */
    exportFormFieldsAsObject(formFieldDataFormat?: FormFieldDataFormat): Promise<object>;
    /**
     * reset all form fields data
     *
     * @returns void
     */
    resetFormFields(): void;
    /**
     * Clears data from the form fields.
     * Parameter - Specifies the form field object.
     *
     * @param formField
     * @returns void
     */
    clearFormFields(formField?: any): void;
    /**
     * To delete the annotation Collections in the PDF Document.
     *
     * @returns void
     */
    deleteAnnotations(): void;
    /**
     * To retrieve the form fields in the PDF Document.
     *
     * @returns void
     */
    retrieveFormFields(): FormFieldModel[];
    /**
     * To update the form fields in the PDF Document.
     *
     * @param formFields
     * @returns void
     */
    updateFormFields(formFields: any): void;
    /**
     * @param JsonData
     * @private
     */
    fireAjaxRequestInitiate(JsonData: any): void;
    /**
     * @param value
     * @param fieldName
     * @param id
     * @private
     */
    fireButtonFieldClickEvent(value: string, fieldName: string, id: string): void;
    /**
     * @param name
     * @param field
     * @param cancel
     * @param isLeftClick - becomes true on signature panel left click.
     * @private
     */
    fireFormFieldClickEvent(name: string, field: FormFieldModel, cancel?: boolean, isLeftClick?: boolean): Promise<void>;
    /**
     * @param name - Get the name of the event.
     * @param field - Event arguments for the form field add event.
     * @param pageIndex - Get the page number.
     * @private
     */
    fireFormFieldAddEvent(name: string, field: IFormField, pageIndex: number): void;
    /**
     * @param name - Get the name of the event.
     * @param field - Event arguments for the form field remove event.
     * @param pageIndex - Get the page number.
     * @private
     */
    fireFormFieldRemoveEvent(name: string, field: IFormField, pageIndex: number): void;
    /**
     * @param name - Returns the event name.
     * @param field - Returns the double-clicked form field object.
     * @param cancel - If TRUE, property panel of the form field does not open. FALSE by default.
     * @private
     */
    fireFormFieldDoubleClickEvent(eventArgs: FormFieldDoubleClickArgs): FormFieldDoubleClickArgs;
    /**
     * @param name - Get the name of the event.
     * @param field - Event arguments for the form field properties change event.
     * @param pageIndex - Get the page number.
     * @param isAlignmentChanged - Specifies whether the text alignment of the form field is changed or not.
     * @param isBackgroundColorChanged - Specifies whether the background color of the form field is changed or not.
     * @param isBorderColorChanged - Specifies whether the border color of the form field is changed or not.
     * @param isBorderWidthChanged - Specifies whether the border width of the form field is changed or not.
     * @param isColorChanged - Specifies whether the font color of the form field is changed or not.
     * @param isFontFamilyChanged - Specifies whether the font family of the form field is changed or not.
     * @param isFontSizeChanged - Specifies whether the font size of the form field is changed or not.
     * @param isFontStyleChanged - Specifies whether the font style of the form field is changed or not.
     * @param isMaxLengthChanged - Specifies whether the max length of the form field is changed or not.
     * @param isPrintChanged - Specifies whether the print option of the form field is changed or not.
     * @param isReadOnlyChanged - Specifies the Read Only of Form field is changed or not.
     * @param isRequiredChanged - Specifies whether the is required option of the form field is changed or not.
     * @param isToolTipChanged - Specifies whether the tool tip property is changed or not.
     * @param isValueChanged - Specifies whether the form field value is changed or not.
     * @param isVisibilityChanged - Specifies whether the form field visibility is changed or not.
     * @param newValue - Specifies the new value of the form field.
     * @param oldValue - Specifies the old value of the form field.
     * @private
     */
    fireFormFieldPropertiesChangeEvent(name: string, field: IFormField, pageIndex: number, isValueChanged: boolean, isFontFamilyChanged: boolean, isFontSizeChanged: boolean, isFontStyleChanged: boolean, isColorChanged: boolean, isBackgroundColorChanged: boolean, isBorderColorChanged: boolean, isBorderWidthChanged: boolean, isAlignmentChanged: boolean, isReadOnlyChanged: boolean, isVisibilityChanged: boolean, isMaxLengthChanged: boolean, isRequiredChanged: boolean, isPrintChanged: boolean, isToolTipChanged: boolean, oldValue?: any, newValue?: any, isNamechanged?: any): void;
    /**
     * @param name - Get the name of the event.
     * @param field - Event arguments for the form field mouse leave event.
     * @param pageIndex - Get the page number.
     * @private
     */
    fireFormFieldMouseLeaveEvent(name: string, field: IFormField, pageIndex: number): void;
    /**
     * @param name - Get the name of the event.
     * @param field - Event arguments for the form field mouse over event.
     * @param pageIndex - Get the page number.
     * @param pageX - Get the mouse over x position with respect to the page container.
     * @param pageY - Get the mouse over y position with respect to the page container.
     * @param X - Specifies the mouse over x position with respect to the viewer container.
     * @param Y - Specifies the mouse over y position with respect to the viewer container.
     * @private
     */
    fireFormFieldMouseoverEvent(name: string, field: IFormField, pageIndex: number, pageX: number, pageY: number, X: number, Y: number): void;
    /**
     * @param name - Get the name of the event.
     * @param field - Event arguments for the form field move event.
     * @param pageIndex - Get the page number.
     * @param previousPosition - Get the previous position of the form field in the page.
     * @param currentPosition - Current position of form field in the page.
     * @private
     */
    fireFormFieldMoveEvent(name: string, field: IFormField, pageIndex: number, previousPosition: IFormFieldBound, currentPosition: IFormFieldBound): void;
    /**
     * @param name - Get the name of the event.
     * @param field - Event arguments for the form field resize event.
     * @param pageIndex - Get the page number.
     * @param previousPosition - Get the previous position of the form field in the page.
     * @param currentPosition - Current position of form field in the page.
     * @private
     */
    fireFormFieldResizeEvent(name: string, field: IFormField, pageIndex: number, previousPosition: IFormFieldBound, currentPosition: IFormFieldBound): void;
    /**
     * @param name - Get the name of the event.
     * @param field - Event arguments for the form field select event.
     * @param pageIndex - Get the page number.
     * @param isProgrammaticSelection - Specifies whether the the form field is selected programmatically or by UI.
     * @private
     */
    fireFormFieldSelectEvent(name: string, field: IFormField, pageIndex: number, isProgrammaticSelection: boolean): void;
    /**
     * @param name - Get the name of the event.
     * @param field - Event arguments for the form field unselect event.
     * @param pageIndex - Get the page number.
     * @private
     */
    fireFormFieldUnselectEvent(name: string, field: IFormField, pageIndex: number): void;
    /**
     * @param pageData
     * @private
     */
    fireDocumentLoad(pageData: any): void;
    /**
     * @param fileName
     * @private
     */
    fireDocumentUnload(fileName: string): void;
    /**
     * @param isPasswordRequired
     * @param password
     * @private
     */
    fireDocumentLoadFailed(isPasswordRequired: boolean, password: string): void;
    /**
     * @param errorStatusCode
     * @param errorMessage
     * @param action
     * @param retryCount
     * @private
     */
    fireAjaxRequestFailed(errorStatusCode: number, errorMessage: string, action: string, retryCount?: boolean): void;
    /**
     * @param action
     * @param data
     * @private
     */
    fireAjaxRequestSuccess(action: string, data: any): any;
    /**
     * @param action
     * @private
     */
    fireValidatedFailed(action: string): void;
    /**
     * @param x
     * @param y
     * @param pageNumber
     * @private
     */
    firePageClick(x: number, y: number, pageNumber: number): void;
    /**
     * @param previousPageNumber
     * @private
     */
    firePageChange(previousPageNumber: number): void;
    /**
     * @private
     */
    fireZoomChange(): void;
    /**
     * @param hyperlink
     * @param hyperlinkElement
     * @private
     */
    fireHyperlinkClick(hyperlink: string, hyperlinkElement: HTMLAnchorElement): Promise<boolean>;
    /**
     * @param hyperlinkElement
     * @private
     */
    fireHyperlinkHover(hyperlinkElement: HTMLAnchorElement): void;
    /**
     * @param fieldName
     * @param value
     * @private
     */
    fireFocusOutFormField(fieldName: string, value: string): void;
    /**
     * @param pageNumber
     * @param index
     * @param type
     * @param bounds
     * @param settings
     * @param textMarkupContent
     * @param tmStartIndex
     * @param tmEndIndex
     * @param labelSettings
     * @param multiPageCollection
     * @private
     */
    fireAnnotationAdd(pageNumber: number, index: string, type: AnnotationType, bounds: any, settings: any, textMarkupContent?: string, tmStartIndex?: number, tmEndIndex?: number, labelSettings?: ShapeLabelSettingsModel, multiPageCollection?: any, customStampName?: string): void;
    /**
     * @param pageNumber
     * @param index
     * @param type
     * @param bounds
     * @param textMarkupContent
     * @param tmStartIndex
     * @param tmEndIndex
     * @param multiPageCollection
     * @private
     */
    fireAnnotationRemove(pageNumber: number, index: string, type: AnnotationType, bounds: any, textMarkupContent?: string, tmStartIndex?: number, tmEndIndex?: number, multiPageCollection?: any): void;
    /**
     * @param value
     * @private
     */
    fireBeforeAddFreeTextAnnotation(value: string): void;
    /**
     * @param id
     * @param text
     * @param annotation
     * @private
     */
    fireCommentAdd(id: string, text: string, annotation: any): void;
    /**
     * @param id
     * @param text
     * @param annotation
     * @private
     */
    fireCommentEdit(id: string, text: string, annotation: any): void;
    /**
     * @param id
     * @param text
     * @param annotation
     * @private
     */
    fireCommentDelete(id: string, text: string, annotation: any): void;
    /**
     * @param id
     * @param text
     * @param annotation
     * @private
     */
    fireCommentSelect(id: string, text: string, annotation: any): void;
    /**
     * @param id
     * @param text
     * @param annotation
     * @param statusChange
     * @private
     */
    fireCommentStatusChanged(id: string, text: string, annotation: any, statusChange: CommentStatus): void;
    /**
     * @param pageNumber
     * @param index
     * @param type
     * @param isColorChanged
     * @param isOpacityChanged
     * @param isTextChanged
     * @param isCommentsChanged
     * @param textMarkupContent
     * @param tmStartIndex
     * @param tmEndIndex
     * @param multiPageCollection
     * @private
     */
    fireAnnotationPropertiesChange(pageNumber: number, index: string, type: AnnotationType, isColorChanged: boolean, isOpacityChanged: boolean, isTextChanged: boolean, isCommentsChanged: boolean, textMarkupContent?: string, tmStartIndex?: number, tmEndIndex?: number, multiPageCollection?: any): void;
    /**
     * @param pageNumber
     * @param index
     * @param type
     * @param bounds
     * @param opacity
     * @param strokeColor
     * @param thickness
     * @param data
     * @private
     */
    fireSignatureAdd(pageNumber: number, index: string, type: any, bounds: any, opacity: number, strokeColor?: string, thickness?: number, data?: string): void;
    /**
     * @param pageNumber
     * @param index
     * @param type
     * @param bounds
     * @private
     */
    fireSignatureRemove(pageNumber: number, index: string, type: AnnotationType, bounds: any): void;
    /**
     * @param pageNumber
     * @param id
     * @param type
     * @param opacity
     * @param strokeColor
     * @param thickness
     * @param previousPosition
     * @param currentPosition
     * @private
     */
    fireSignatureMove(pageNumber: number, id: string, type: AnnotationType, opacity: number, strokeColor: string, thickness: number, previousPosition: object, currentPosition: object): void;
    /**
     * @param pageNumber
     * @param index
     * @param type
     * @param isStrokeColorChanged
     * @param isOpacityChanged
     * @param isThicknessChanged
     * @param oldProp
     * @param newProp
     * @private
     */
    fireSignaturePropertiesChange(pageNumber: number, index: string, type: AnnotationType, isStrokeColorChanged: boolean, isOpacityChanged: boolean, isThicknessChanged: boolean, oldProp: any, newProp: any): void;
    /**
     * @param pageNumber
     * @param index
     * @param type
     * @param opacity
     * @param strokeColor
     * @param thickness
     * @param currentPosition
     * @param previousPosition
     * @private
     */
    fireSignatureResize(pageNumber: number, index: string, type: AnnotationType, opacity: number, strokeColor: string, thickness: number, currentPosition: any, previousPosition: any): void;
    /**
     * @param id
     * @param pageNumber
     * @param signature
     * @private
     */
    fireSignatureSelect(id: string, pageNumber: number, signature: object): void;
    /**
     * @param id
     * @param pageNumber
     * @param annotation
     * @param annotationCollection
     * @param multiPageCollection
     * @param isSelected
     * @param annotationAddMode
     * @private
     */
    fireAnnotationSelect(id: string, pageNumber: number, annotation: any, annotationCollection?: any, multiPageCollection?: any, isSelected?: boolean, annotationAddMode?: string): void;
    /**
     * @param id
     * @param pageNumber
     * @param annotation
     * @private
     */
    fireAnnotationUnSelect(id: string, pageNumber: number, annotation: any): void;
    /**
     * @param id
     * @param pageNumber
     * @param annotation
     * @private
     */
    fireAnnotationDoubleClick(id: string, pageNumber: number, annotation: any): void;
    /**
     * @param pageNumber
     * @private
     */
    fireTextSelectionStart(pageNumber: number): void;
    /**
     * @param pageNumber
     * @param text
     * @param bound
     * @private
     */
    fireTextSelectionEnd(pageNumber: number, text: string, bound: any[]): void;
    /**
     * @param canvas
     * @param index
     * @private
     */
    renderDrawing(canvas?: HTMLCanvasElement, index?: number): void;
    /**
     * @param pageNumber
     * @param index
     * @param type
     * @param bounds
     * @param settings
     * @param textMarkupContent
     * @param tmStartIndex
     * @param tmEndIndex
     * @param labelSettings
     * @param multiPageCollection
     * @private
     */
    fireAnnotationResize(pageNumber: number, index: string, type: AnnotationType, bounds: any, settings: any, textMarkupContent?: string, tmStartIndex?: number, tmEndIndex?: number, labelSettings?: ShapeLabelSettingsModel, multiPageCollection?: any): void;
    /**
     * @param pageNumber
     * @param id
     * @param type
     * @param annotationSettings
     * @param previousPosition
     * @param currentPosition
     * @private
     */
    fireAnnotationMoving(pageNumber: number, id: string, type: AnnotationType, annotationSettings: any, previousPosition: object, currentPosition: object): void;
    /**
    * @param pageNumber
    * @param id
    * @param type
    * @param annotationSettings
    * @param previousPosition
    * @param currentPosition
    * @private
    */
    fireAnnotationMove(pageNumber: number, id: string, type: AnnotationType, annotationSettings: any, previousPosition: object, currentPosition: object): void;
    /**
     * @param id
     * @param pageNumber
     * @param annotationType
     * @param bounds
     * @param annotation
     * @param currentPosition
     * @param mousePosition
     * @private
     */
    fireAnnotationMouseover(id: string, pageNumber: number, annotationType: AnnotationType, bounds: any, annotation: any, currentPosition: any, mousePosition: any): void;
    /**
     * @param pageNumber
     * @private
     */
    fireAnnotationMouseLeave(pageNumber: number): void;
    /**
     * @param pageX
     * @param pageY
     * @private
     */
    firePageMouseover(pageX: number, pageY: number): void;
    /**
     * @param fileName
     * @private
     */
    fireDownloadStart(fileName: string): void;
    /**
     * @param fileName
     * @param downloadData
     * @private
     */
    fireDownloadEnd(fileName: string, downloadData: string): void;
    /**
     * @private
     */
    firePrintStart(): Promise<void>;
    /**
     * @param eventName
     * @param args
     * @param eventName
     * @param args
     * @private
     */
    triggerEvent(eventName: string, args: object): Promise<void | object>;
    /**
     * @param fileName
     * @private
     */
    firePrintEnd(fileName: string): void;
    /**
     * @param pageNumber
     * @private
     */
    fireThumbnailClick(pageNumber: number): void;
    /**
     * @param pageNumber
     * @param position
     * @param text
     * @param fileName
     * @private
     */
    fireBookmarkClick(pageNumber: number, position: number, text: string, fileName: string): void;
    /**
     * @param importData
     * @private
     */
    fireImportStart(importData: any): void;
    /**
     * @param exportData
     * @private
     */
    fireExportStart(exportData: any): any;
    /**
     * @param importData
     * @private
     */
    fireImportSuccess(importData: any): void;
    /**
     * @param exportData
     * @param fileName
     * @private
     */
    fireExportSuccess(exportData: any, fileName: string): void;
    /**
     * @param data
     * @param errorDetails
     * @private
     */
    fireImportFailed(data: any, errorDetails: string): void;
    /**
     * @param data
     * @param errorDetails
     * @private
     */
    fireExportFailed(data: any, errorDetails: string): void;
    /**
     * @param data
     * @private
     */
    fireFormImportStarted(data: any): void;
    /**
     * @param data
     * @private
     */
    fireFormExportStarted(data: any): any;
    /**
     * @param data
     * @private
     */
    fireFormImportSuccess(data: any): void;
    /**
     * @param data
     * @param fileName
     * @private
     */
    fireFormExportSuccess(data: any, fileName: string): void;
    /**
     * @param data
     * @param errorDetails
     * @private
     */
    fireFormImportFailed(data: any, errorDetails: string): void;
    /**
     * @param data
     * @param errorDetails
     * @private
     */
    fireFormExportFailed(data: any, errorDetails: string): void;
    /**
     * @param documentCollection
     * @private
     */
    fireTextExtractionCompleted(documentCollection: DocumentTextCollectionSettingsModel[][]): void;
    /**
     * @param searchText
     * @param isMatchcase
     * @private
     */
    fireTextSearchStart(searchText: string, isMatchcase: boolean): void;
    /**
     * @param searchText
     * @param isMatchcase
     * @private
     */
    fireTextSearchComplete(searchText: string, isMatchcase: boolean): void;
    /**
     * @param searchText
     * @param isMatchcase
     * @param bounds
     * @param pageNumber
     * @private
     */
    fireTextSearchHighlight(searchText: string, isMatchcase: boolean, bounds: RectangleBoundsModel, pageNumber: number): void;
    /**
     * @param bounds
     * @param commonStyle
     * @param cavas
     * @param index
     * @private
     */
    renderAdornerLayer(bounds: ClientRect, commonStyle: string, cavas: HTMLElement, index: number): void;
    /**
     * @param index
     * @param currentSelector
     * @private
     */
    renderSelector(index: number, currentSelector?: AnnotationSelectorSettingsModel): void;
    /**
     * @param objArray
     * @param currentSelector
     * @param multipleSelection
     * @param preventUpdate
     * @private
     */
    select(objArray: string[], currentSelector?: AnnotationSelectorSettingsModel, multipleSelection?: boolean, preventUpdate?: boolean): void;
    /**
     * @param pageId
     * @private
     */
    getPageTable(pageId: number): ZOrderPageTable;
    /**
     * @param diffX
     * @param diffY
     * @param pageIndex
     * @param currentSelector
     * @param helper
     * @private
     */
    dragSelectedObjects(diffX: number, diffY: number, pageIndex: number, currentSelector?: AnnotationSelectorSettingsModel, helper?: PdfAnnotationBaseModel): boolean;
    /**
     * @param sx
     * @param sy
     * @param pivot
     * @private
     */
    scaleSelectedItems(sx: number, sy: number, pivot: PointModel): boolean;
    /**
     * @param endPoint
     * @param obj
     * @param point
     * @param segment
     * @param target
     * @param targetPortId
     * @param currentSelector
     * @private
     */
    dragConnectorEnds(endPoint: string, obj: IElement, point: PointModel, segment: PointModel, target?: IElement, targetPortId?: string, currentSelector?: AnnotationSelectorSettingsModel): boolean;
    /**
     * @param pageId
     * @private
     */
    clearSelection(pageId: number): void;
    /**
     * Get page number from the user coordinates x and y.
     *
     * @param {Point} clientPoint - The user will provide a x, y coordinates.
     * @returns number
     */
    getPageNumberFromClientPoint(clientPoint: Point): number;
    /**
     * Convert user coordinates to the PDF page coordinates.
     *
     * @param {Point} clientPoint - The user should provide a x, y coordinates.
     * @param {number} pageNumber - We need to pass pageNumber.
     * @returns Point
     */
    convertClientPointToPagePoint(clientPoint: Point, pageNumber: number): Point;
    /**
     * Convert page coordinates to the user coordinates.
     *
     * @param {Point} pagePoint - The user should provide a page x, y coordinates.
     * @param {number} pageNumber - We need to pass pageNumber.
     * @returns Point
     */
    convertPagePointToClientPoint(pagePoint: Point, pageNumber: number): Point;
    /**
     * Convert page coordinates to the scrolling coordinates.
     *
     * @param {Point} pagePoint - The user should provide a page x, y coordinates.
     * @param {number} pageNumber - We need to pass pageNumber.
     * @returns Point
     */
    convertPagePointToScrollingPoint(pagePoint: Point, pageNumber: number): Point;
    /**
     * Brings the given rectangular region to view and zooms in the document to fit the region in client area (view port).
     *
     * @param {Rect} rectangle - Specifies the region in client coordinates that is to be brought to view.
     */
    zoomToRect(rectangle: Rect): void;
    /**
     * @param obj
     * @private
     */
    add(obj: PdfAnnotationBase): PdfAnnotationBaseModel;
    /**
     * @param obj
     * @private
     */
    remove(obj: PdfAnnotationBaseModel): void;
    /**
     * @private
     */
    copy(): Object;
    /**
     * @param angle
     * @param currentSelector
     * @private
     */
    rotate(angle: number, currentSelector?: AnnotationSelectorSettingsModel): boolean;
    /**
     * @param obj
     * @private
     */
    paste(obj?: PdfAnnotationBaseModel[]): void;
    /**
     * @private
     */
    refresh(): void;
    /**
     * @private
     */
    cut(): void;
    /**
     * @param actualObject
     * @param node
     * @private
     */
    nodePropertyChange(actualObject: PdfAnnotationBaseModel, node: PdfAnnotationBaseModel): void;
    /**
     * enableServerDataBinding method
     *
     * @returns { void }  enableServerDataBinding method.
     * @param {boolean} enable - provide the node value.
     *
     * @private
     */
    enableServerDataBinding(enable: boolean, clearBulkChanges?: boolean): void;
    /**
     * @param tx
     * @param ty
     * @param pageIndex
     * @param nodeBounds
     * @param isStamp
     * @param isSkip
     * @private
     */
    checkBoundaryConstraints(tx: number, ty: number, pageIndex: number, nodeBounds?: Rect, isStamp?: boolean, isSkip?: boolean): boolean;
}
