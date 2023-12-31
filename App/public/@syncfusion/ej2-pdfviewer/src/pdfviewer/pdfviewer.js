var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/* eslint-disable */
// eslint-disable-next-line max-len
import { Component, NotifyPropertyChanges, ChildProperty, L10n, Collection, Complex, isBlazor, Browser } from '@syncfusion/ej2-base';
import { isNullOrUndefined, Property, Event } from '@syncfusion/ej2-base';
import { PdfViewerBase } from './index';
// eslint-disable-next-line max-len
import { FontStyle, AnnotationResizerLocation, CursorType, ContextMenuItem, DynamicStampItem, SignStampItem, StandardBusinessStampItem, AnnotationDataFormat, DisplayMode, FormFieldDataFormat } from './base/types';
import { FormFields } from './index';
import { PdfAnnotationBase, PdfFormFieldBase } from './drawing/pdf-annotation';
import { Drawing } from './drawing/drawing';
import { Selector } from './drawing/selector';
import { renderAdornerLayer } from './drawing/dom-util';
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
var ToolbarSettings = /** @class */ (function (_super) {
    __extends(ToolbarSettings, _super);
    function ToolbarSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(true)
    ], ToolbarSettings.prototype, "showTooltip", void 0);
    __decorate([
        Property()
    ], ToolbarSettings.prototype, "toolbarItems", void 0);
    __decorate([
        Property()
    ], ToolbarSettings.prototype, "annotationToolbarItems", void 0);
    __decorate([
        Property()
    ], ToolbarSettings.prototype, "formDesignerToolbarItems", void 0);
    return ToolbarSettings;
}(ChildProperty));
export { ToolbarSettings };
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
var AjaxRequestSettings = /** @class */ (function (_super) {
    __extends(AjaxRequestSettings, _super);
    function AjaxRequestSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property()
    ], AjaxRequestSettings.prototype, "ajaxHeaders", void 0);
    __decorate([
        Property(false)
    ], AjaxRequestSettings.prototype, "withCredentials", void 0);
    return AjaxRequestSettings;
}(ChildProperty));
export { AjaxRequestSettings };
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
var CustomStamp = /** @class */ (function (_super) {
    __extends(CustomStamp, _super);
    function CustomStamp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], CustomStamp.prototype, "customStampName", void 0);
    __decorate([
        Property('')
    ], CustomStamp.prototype, "customStampImageSource", void 0);
    return CustomStamp;
}(ChildProperty));
export { CustomStamp };
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
var AnnotationToolbarSettings = /** @class */ (function (_super) {
    __extends(AnnotationToolbarSettings, _super);
    function AnnotationToolbarSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(true)
    ], AnnotationToolbarSettings.prototype, "showTooltip", void 0);
    __decorate([
        Property()
    ], AnnotationToolbarSettings.prototype, "annotationToolbarItem", void 0);
    return AnnotationToolbarSettings;
}(ChildProperty));
export { AnnotationToolbarSettings };
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
var FormDesignerToolbarSettings = /** @class */ (function (_super) {
    __extends(FormDesignerToolbarSettings, _super);
    function FormDesignerToolbarSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(true)
    ], FormDesignerToolbarSettings.prototype, "showTooltip", void 0);
    __decorate([
        Property()
    ], FormDesignerToolbarSettings.prototype, "formDesignerToolbarItem", void 0);
    return FormDesignerToolbarSettings;
}(ChildProperty));
export { FormDesignerToolbarSettings };
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
var SignatureFieldSettings = /** @class */ (function (_super) {
    __extends(SignatureFieldSettings, _super);
    function SignatureFieldSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property({ x: 0, y: 0, width: 0, height: 0 })
    ], SignatureFieldSettings.prototype, "bounds", void 0);
    __decorate([
        Property('')
    ], SignatureFieldSettings.prototype, "name", void 0);
    __decorate([
        Property(false)
    ], SignatureFieldSettings.prototype, "isReadOnly", void 0);
    __decorate([
        Property('visible')
    ], SignatureFieldSettings.prototype, "visibility", void 0);
    __decorate([
        Property(false)
    ], SignatureFieldSettings.prototype, "isRequired", void 0);
    __decorate([
        Property(false)
    ], SignatureFieldSettings.prototype, "isPrint", void 0);
    __decorate([
        Property('')
    ], SignatureFieldSettings.prototype, "tooltip", void 0);
    __decorate([
        Property(1)
    ], SignatureFieldSettings.prototype, "thickness", void 0);
    __decorate([
        Property(0)
    ], SignatureFieldSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property()
    ], SignatureFieldSettings.prototype, "signatureDialogSettings", void 0);
    __decorate([
        Property()
    ], SignatureFieldSettings.prototype, "signatureIndicatorSettings", void 0);
    return SignatureFieldSettings;
}(ChildProperty));
export { SignatureFieldSettings };
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
var InitialFieldSettings = /** @class */ (function (_super) {
    __extends(InitialFieldSettings, _super);
    function InitialFieldSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property({ x: 0, y: 0, width: 0, height: 0 })
    ], InitialFieldSettings.prototype, "bounds", void 0);
    __decorate([
        Property('')
    ], InitialFieldSettings.prototype, "name", void 0);
    __decorate([
        Property(false)
    ], InitialFieldSettings.prototype, "isReadOnly", void 0);
    __decorate([
        Property('visible')
    ], InitialFieldSettings.prototype, "visibility", void 0);
    __decorate([
        Property(false)
    ], InitialFieldSettings.prototype, "isRequired", void 0);
    __decorate([
        Property(false)
    ], InitialFieldSettings.prototype, "isPrint", void 0);
    __decorate([
        Property('')
    ], InitialFieldSettings.prototype, "tooltip", void 0);
    __decorate([
        Property(1)
    ], InitialFieldSettings.prototype, "thickness", void 0);
    __decorate([
        Property(0)
    ], InitialFieldSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property(false)
    ], InitialFieldSettings.prototype, "isInitialField", void 0);
    __decorate([
        Property()
    ], InitialFieldSettings.prototype, "initialDialogSettings", void 0);
    __decorate([
        Property()
    ], InitialFieldSettings.prototype, "initialIndicatorSettings", void 0);
    return InitialFieldSettings;
}(ChildProperty));
export { InitialFieldSettings };
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
var SignatureIndicatorSettings = /** @class */ (function (_super) {
    __extends(SignatureIndicatorSettings, _super);
    function SignatureIndicatorSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(1)
    ], SignatureIndicatorSettings.prototype, "opacity", void 0);
    __decorate([
        Property('orange')
    ], SignatureIndicatorSettings.prototype, "backgroundColor", void 0);
    __decorate([
        Property(19)
    ], SignatureIndicatorSettings.prototype, "width", void 0);
    __decorate([
        Property(10)
    ], SignatureIndicatorSettings.prototype, "height", void 0);
    __decorate([
        Property(10)
    ], SignatureIndicatorSettings.prototype, "fontSize", void 0);
    __decorate([
        Property(null)
    ], SignatureIndicatorSettings.prototype, "text", void 0);
    __decorate([
        Property('black')
    ], SignatureIndicatorSettings.prototype, "color", void 0);
    return SignatureIndicatorSettings;
}(ChildProperty));
export { SignatureIndicatorSettings };
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
var SignatureDialogSettings = /** @class */ (function (_super) {
    __extends(SignatureDialogSettings, _super);
    function SignatureDialogSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(DisplayMode.Draw | DisplayMode.Text | DisplayMode.Upload)
    ], SignatureDialogSettings.prototype, "displayMode", void 0);
    __decorate([
        Property(false)
    ], SignatureDialogSettings.prototype, "hideSaveSignature", void 0);
    return SignatureDialogSettings;
}(ChildProperty));
export { SignatureDialogSettings };
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
var ServerActionSettings = /** @class */ (function (_super) {
    __extends(ServerActionSettings, _super);
    function ServerActionSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Load')
    ], ServerActionSettings.prototype, "load", void 0);
    __decorate([
        Property('Unload')
    ], ServerActionSettings.prototype, "unload", void 0);
    __decorate([
        Property('RenderPdfPages')
    ], ServerActionSettings.prototype, "renderPages", void 0);
    __decorate([
        Property('RenderPdfPages')
    ], ServerActionSettings.prototype, "print", void 0);
    __decorate([
        Property('Download')
    ], ServerActionSettings.prototype, "download", void 0);
    __decorate([
        Property('RenderThumbnailImages')
    ], ServerActionSettings.prototype, "renderThumbnail", void 0);
    __decorate([
        Property('RenderAnnotationComments')
    ], ServerActionSettings.prototype, "renderComments", void 0);
    __decorate([
        Property('ImportAnnotations')
    ], ServerActionSettings.prototype, "importAnnotations", void 0);
    __decorate([
        Property('ExportAnnotations')
    ], ServerActionSettings.prototype, "exportAnnotations", void 0);
    __decorate([
        Property('ImportFormFields')
    ], ServerActionSettings.prototype, "importFormFields", void 0);
    __decorate([
        Property('ExportFormFields')
    ], ServerActionSettings.prototype, "exportFormFields", void 0);
    __decorate([
        Property('RenderPdfTexts')
    ], ServerActionSettings.prototype, "renderTexts", void 0);
    return ServerActionSettings;
}(ChildProperty));
export { ServerActionSettings };
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
var StrikethroughSettings = /** @class */ (function (_super) {
    __extends(StrikethroughSettings, _super);
    function StrikethroughSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(1)
    ], StrikethroughSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property(1)
    ], StrikethroughSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#ff0000')
    ], StrikethroughSettings.prototype, "color", void 0);
    __decorate([
        Property('Guest')
    ], StrikethroughSettings.prototype, "author", void 0);
    __decorate([
        Property('')
    ], StrikethroughSettings.prototype, "annotationSelectorSettings", void 0);
    __decorate([
        Property(null)
    ], StrikethroughSettings.prototype, "customData", void 0);
    __decorate([
        Property(false)
    ], StrikethroughSettings.prototype, "isLock", void 0);
    __decorate([
        Property(false)
    ], StrikethroughSettings.prototype, "enableMultiPageAnnotation", void 0);
    __decorate([
        Property(false)
    ], StrikethroughSettings.prototype, "enableTextMarkupResizer", void 0);
    __decorate([
        Property(['None'])
    ], StrikethroughSettings.prototype, "allowedInteractions", void 0);
    __decorate([
        Property(true)
    ], StrikethroughSettings.prototype, "isPrint", void 0);
    return StrikethroughSettings;
}(ChildProperty));
export { StrikethroughSettings };
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
var UnderlineSettings = /** @class */ (function (_super) {
    __extends(UnderlineSettings, _super);
    function UnderlineSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(1)
    ], UnderlineSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property(1)
    ], UnderlineSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#00ff00')
    ], UnderlineSettings.prototype, "color", void 0);
    __decorate([
        Property('Guest')
    ], UnderlineSettings.prototype, "author", void 0);
    __decorate([
        Property('')
    ], UnderlineSettings.prototype, "annotationSelectorSettings", void 0);
    __decorate([
        Property(null)
    ], UnderlineSettings.prototype, "customData", void 0);
    __decorate([
        Property(false)
    ], UnderlineSettings.prototype, "isLock", void 0);
    __decorate([
        Property(false)
    ], UnderlineSettings.prototype, "enableMultiPageAnnotation", void 0);
    __decorate([
        Property(false)
    ], UnderlineSettings.prototype, "enableTextMarkupResizer", void 0);
    __decorate([
        Property(['None'])
    ], UnderlineSettings.prototype, "allowedInteractions", void 0);
    __decorate([
        Property(true)
    ], UnderlineSettings.prototype, "isPrint", void 0);
    return UnderlineSettings;
}(ChildProperty));
export { UnderlineSettings };
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
var HighlightSettings = /** @class */ (function (_super) {
    __extends(HighlightSettings, _super);
    function HighlightSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(1)
    ], HighlightSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property(1)
    ], HighlightSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#ffff00')
    ], HighlightSettings.prototype, "color", void 0);
    __decorate([
        Property('Guest')
    ], HighlightSettings.prototype, "author", void 0);
    __decorate([
        Property('')
    ], HighlightSettings.prototype, "annotationSelectorSettings", void 0);
    __decorate([
        Property(null)
    ], HighlightSettings.prototype, "customData", void 0);
    __decorate([
        Property(false)
    ], HighlightSettings.prototype, "isLock", void 0);
    __decorate([
        Property(false)
    ], HighlightSettings.prototype, "enableMultiPageAnnotation", void 0);
    __decorate([
        Property(false)
    ], HighlightSettings.prototype, "enableTextMarkupResizer", void 0);
    __decorate([
        Property(['None'])
    ], HighlightSettings.prototype, "allowedInteractions", void 0);
    __decorate([
        Property(true)
    ], HighlightSettings.prototype, "isPrint", void 0);
    return HighlightSettings;
}(ChildProperty));
export { HighlightSettings };
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
var LineSettings = /** @class */ (function (_super) {
    __extends(LineSettings, _super);
    function LineSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property({ x: 0, y: 0 })
    ], LineSettings.prototype, "offset", void 0);
    __decorate([
        Property(1)
    ], LineSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property(1)
    ], LineSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#ffffff00')
    ], LineSettings.prototype, "fillColor", void 0);
    __decorate([
        Property('#ff0000')
    ], LineSettings.prototype, "strokeColor", void 0);
    __decorate([
        Property('Guest')
    ], LineSettings.prototype, "author", void 0);
    __decorate([
        Property('1')
    ], LineSettings.prototype, "thickness", void 0);
    __decorate([
        Property('None')
    ], LineSettings.prototype, "lineHeadStartStyle", void 0);
    __decorate([
        Property('None')
    ], LineSettings.prototype, "lineHeadEndStyle", void 0);
    __decorate([
        Property(0)
    ], LineSettings.prototype, "borderDashArray", void 0);
    __decorate([
        Property('')
    ], LineSettings.prototype, "annotationSelectorSettings", void 0);
    __decorate([
        Property(0)
    ], LineSettings.prototype, "minHeight", void 0);
    __decorate([
        Property(0)
    ], LineSettings.prototype, "minWidth", void 0);
    __decorate([
        Property(0)
    ], LineSettings.prototype, "maxHeight", void 0);
    __decorate([
        Property(0)
    ], LineSettings.prototype, "maxWidth", void 0);
    __decorate([
        Property(false)
    ], LineSettings.prototype, "isLock", void 0);
    __decorate([
        Property(null)
    ], LineSettings.prototype, "customData", void 0);
    __decorate([
        Property(['None'])
    ], LineSettings.prototype, "allowedInteractions", void 0);
    __decorate([
        Property(true)
    ], LineSettings.prototype, "isPrint", void 0);
    return LineSettings;
}(ChildProperty));
export { LineSettings };
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
var ArrowSettings = /** @class */ (function (_super) {
    __extends(ArrowSettings, _super);
    function ArrowSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property({ x: 0, y: 0 })
    ], ArrowSettings.prototype, "offset", void 0);
    __decorate([
        Property(1)
    ], ArrowSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property(1)
    ], ArrowSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#ffffff00')
    ], ArrowSettings.prototype, "fillColor", void 0);
    __decorate([
        Property('#ff0000')
    ], ArrowSettings.prototype, "strokeColor", void 0);
    __decorate([
        Property('Guest')
    ], ArrowSettings.prototype, "author", void 0);
    __decorate([
        Property('1')
    ], ArrowSettings.prototype, "thickness", void 0);
    __decorate([
        Property('None')
    ], ArrowSettings.prototype, "lineHeadStartStyle", void 0);
    __decorate([
        Property('None')
    ], ArrowSettings.prototype, "lineHeadEndStyle", void 0);
    __decorate([
        Property(0)
    ], ArrowSettings.prototype, "borderDashArray", void 0);
    __decorate([
        Property('')
    ], ArrowSettings.prototype, "annotationSelectorSettings", void 0);
    __decorate([
        Property(0)
    ], ArrowSettings.prototype, "minHeight", void 0);
    __decorate([
        Property(0)
    ], ArrowSettings.prototype, "minWidth", void 0);
    __decorate([
        Property(0)
    ], ArrowSettings.prototype, "maxHeight", void 0);
    __decorate([
        Property(0)
    ], ArrowSettings.prototype, "maxWidth", void 0);
    __decorate([
        Property(false)
    ], ArrowSettings.prototype, "isLock", void 0);
    __decorate([
        Property(null)
    ], ArrowSettings.prototype, "customData", void 0);
    __decorate([
        Property(['None'])
    ], ArrowSettings.prototype, "allowedInteractions", void 0);
    __decorate([
        Property(true)
    ], ArrowSettings.prototype, "isPrint", void 0);
    return ArrowSettings;
}(ChildProperty));
export { ArrowSettings };
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
var RectangleSettings = /** @class */ (function (_super) {
    __extends(RectangleSettings, _super);
    function RectangleSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property({ x: 0, y: 0 })
    ], RectangleSettings.prototype, "offset", void 0);
    __decorate([
        Property(1)
    ], RectangleSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property(100)
    ], RectangleSettings.prototype, "width", void 0);
    __decorate([
        Property(50)
    ], RectangleSettings.prototype, "height", void 0);
    __decorate([
        Property(1)
    ], RectangleSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#ffffff00')
    ], RectangleSettings.prototype, "fillColor", void 0);
    __decorate([
        Property('#ff0000')
    ], RectangleSettings.prototype, "strokeColor", void 0);
    __decorate([
        Property('Guest')
    ], RectangleSettings.prototype, "author", void 0);
    __decorate([
        Property('1')
    ], RectangleSettings.prototype, "thickness", void 0);
    __decorate([
        Property('')
    ], RectangleSettings.prototype, "annotationSelectorSettings", void 0);
    __decorate([
        Property(0)
    ], RectangleSettings.prototype, "minHeight", void 0);
    __decorate([
        Property(0)
    ], RectangleSettings.prototype, "minWidth", void 0);
    __decorate([
        Property(0)
    ], RectangleSettings.prototype, "maxHeight", void 0);
    __decorate([
        Property(0)
    ], RectangleSettings.prototype, "maxWidth", void 0);
    __decorate([
        Property(false)
    ], RectangleSettings.prototype, "isLock", void 0);
    __decorate([
        Property(null)
    ], RectangleSettings.prototype, "customData", void 0);
    __decorate([
        Property(['None'])
    ], RectangleSettings.prototype, "allowedInteractions", void 0);
    __decorate([
        Property(true)
    ], RectangleSettings.prototype, "isPrint", void 0);
    return RectangleSettings;
}(ChildProperty));
export { RectangleSettings };
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
var CircleSettings = /** @class */ (function (_super) {
    __extends(CircleSettings, _super);
    function CircleSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property({ x: 0, y: 0 })
    ], CircleSettings.prototype, "offset", void 0);
    __decorate([
        Property(1)
    ], CircleSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property(100)
    ], CircleSettings.prototype, "width", void 0);
    __decorate([
        Property(100)
    ], CircleSettings.prototype, "height", void 0);
    __decorate([
        Property(1)
    ], CircleSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#ffffff00')
    ], CircleSettings.prototype, "fillColor", void 0);
    __decorate([
        Property('#ff0000')
    ], CircleSettings.prototype, "strokeColor", void 0);
    __decorate([
        Property('Guest')
    ], CircleSettings.prototype, "author", void 0);
    __decorate([
        Property('1')
    ], CircleSettings.prototype, "thickness", void 0);
    __decorate([
        Property('')
    ], CircleSettings.prototype, "annotationSelectorSettings", void 0);
    __decorate([
        Property(0)
    ], CircleSettings.prototype, "minHeight", void 0);
    __decorate([
        Property(0)
    ], CircleSettings.prototype, "minWidth", void 0);
    __decorate([
        Property(0)
    ], CircleSettings.prototype, "maxHeight", void 0);
    __decorate([
        Property(0)
    ], CircleSettings.prototype, "maxWidth", void 0);
    __decorate([
        Property(false)
    ], CircleSettings.prototype, "isLock", void 0);
    __decorate([
        Property(null)
    ], CircleSettings.prototype, "customData", void 0);
    __decorate([
        Property(['None'])
    ], CircleSettings.prototype, "allowedInteractions", void 0);
    __decorate([
        Property(true)
    ], CircleSettings.prototype, "isPrint", void 0);
    return CircleSettings;
}(ChildProperty));
export { CircleSettings };
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
var ShapeLabelSettings = /** @class */ (function (_super) {
    __extends(ShapeLabelSettings, _super);
    function ShapeLabelSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(1)
    ], ShapeLabelSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#ffffff00')
    ], ShapeLabelSettings.prototype, "fillColor", void 0);
    __decorate([
        Property('#000')
    ], ShapeLabelSettings.prototype, "fontColor", void 0);
    __decorate([
        Property(16)
    ], ShapeLabelSettings.prototype, "fontSize", void 0);
    __decorate([
        Property('Helvetica')
    ], ShapeLabelSettings.prototype, "fontFamily", void 0);
    __decorate([
        Property('Label')
    ], ShapeLabelSettings.prototype, "labelContent", void 0);
    __decorate([
        Property('')
    ], ShapeLabelSettings.prototype, "notes", void 0);
    return ShapeLabelSettings;
}(ChildProperty));
export { ShapeLabelSettings };
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
var PolygonSettings = /** @class */ (function (_super) {
    __extends(PolygonSettings, _super);
    function PolygonSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property({ x: 0, y: 0 })
    ], PolygonSettings.prototype, "offset", void 0);
    __decorate([
        Property(1)
    ], PolygonSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property(1)
    ], PolygonSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#ffffff00')
    ], PolygonSettings.prototype, "fillColor", void 0);
    __decorate([
        Property('#ff0000')
    ], PolygonSettings.prototype, "strokeColor", void 0);
    __decorate([
        Property('Guest')
    ], PolygonSettings.prototype, "author", void 0);
    __decorate([
        Property('1')
    ], PolygonSettings.prototype, "thickness", void 0);
    __decorate([
        Property('')
    ], PolygonSettings.prototype, "annotationSelectorSettings", void 0);
    __decorate([
        Property(0)
    ], PolygonSettings.prototype, "minHeight", void 0);
    __decorate([
        Property(0)
    ], PolygonSettings.prototype, "minWidth", void 0);
    __decorate([
        Property(0)
    ], PolygonSettings.prototype, "maxHeight", void 0);
    __decorate([
        Property(0)
    ], PolygonSettings.prototype, "maxWidth", void 0);
    __decorate([
        Property(false)
    ], PolygonSettings.prototype, "isLock", void 0);
    __decorate([
        Property(null)
    ], PolygonSettings.prototype, "customData", void 0);
    __decorate([
        Property(['None'])
    ], PolygonSettings.prototype, "allowedInteractions", void 0);
    __decorate([
        Property(true)
    ], PolygonSettings.prototype, "isPrint", void 0);
    return PolygonSettings;
}(ChildProperty));
export { PolygonSettings };
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
var StampSettings = /** @class */ (function (_super) {
    __extends(StampSettings, _super);
    function StampSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property({ x: 0, y: 0 })
    ], StampSettings.prototype, "offset", void 0);
    __decorate([
        Property(1)
    ], StampSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property(150)
    ], StampSettings.prototype, "width", void 0);
    __decorate([
        Property(50)
    ], StampSettings.prototype, "height", void 0);
    __decorate([
        Property(1)
    ], StampSettings.prototype, "opacity", void 0);
    __decorate([
        Property('Guest')
    ], StampSettings.prototype, "author", void 0);
    __decorate([
        Property('')
    ], StampSettings.prototype, "annotationSelectorSettings", void 0);
    __decorate([
        Property(0)
    ], StampSettings.prototype, "minHeight", void 0);
    __decorate([
        Property(0)
    ], StampSettings.prototype, "minWidth", void 0);
    __decorate([
        Property(0)
    ], StampSettings.prototype, "maxHeight", void 0);
    __decorate([
        Property(0)
    ], StampSettings.prototype, "maxWidth", void 0);
    __decorate([
        Property(false)
    ], StampSettings.prototype, "isLock", void 0);
    __decorate([
        Property(null)
    ], StampSettings.prototype, "customData", void 0);
    __decorate([
        Property([])
    ], StampSettings.prototype, "dynamicStamps", void 0);
    __decorate([
        Property([])
    ], StampSettings.prototype, "signStamps", void 0);
    __decorate([
        Property([])
    ], StampSettings.prototype, "standardBusinessStamps", void 0);
    __decorate([
        Property(['None'])
    ], StampSettings.prototype, "allowedInteractions", void 0);
    __decorate([
        Property(true)
    ], StampSettings.prototype, "isPrint", void 0);
    return StampSettings;
}(ChildProperty));
export { StampSettings };
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
var CustomStampSettings = /** @class */ (function (_super) {
    __extends(CustomStampSettings, _super);
    function CustomStampSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property({ x: 0, y: 0 })
    ], CustomStampSettings.prototype, "offset", void 0);
    __decorate([
        Property(1)
    ], CustomStampSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property(1)
    ], CustomStampSettings.prototype, "opacity", void 0);
    __decorate([
        Property('Guest')
    ], CustomStampSettings.prototype, "author", void 0);
    __decorate([
        Property(0)
    ], CustomStampSettings.prototype, "width", void 0);
    __decorate([
        Property(0)
    ], CustomStampSettings.prototype, "height", void 0);
    __decorate([
        Property(0)
    ], CustomStampSettings.prototype, "left", void 0);
    __decorate([
        Property(0)
    ], CustomStampSettings.prototype, "top", void 0);
    __decorate([
        Property(false)
    ], CustomStampSettings.prototype, "isAddToMenu", void 0);
    __decorate([
        Property(0)
    ], CustomStampSettings.prototype, "minHeight", void 0);
    __decorate([
        Property(0)
    ], CustomStampSettings.prototype, "minWidth", void 0);
    __decorate([
        Property(0)
    ], CustomStampSettings.prototype, "maxHeight", void 0);
    __decorate([
        Property(0)
    ], CustomStampSettings.prototype, "maxWidth", void 0);
    __decorate([
        Property(false)
    ], CustomStampSettings.prototype, "isLock", void 0);
    __decorate([
        Property('')
    ], CustomStampSettings.prototype, "customStamps", void 0);
    __decorate([
        Property(true)
    ], CustomStampSettings.prototype, "enableCustomStamp", void 0);
    __decorate([
        Property(['None'])
    ], CustomStampSettings.prototype, "allowedInteractions", void 0);
    __decorate([
        Property(true)
    ], CustomStampSettings.prototype, "isPrint", void 0);
    return CustomStampSettings;
}(ChildProperty));
export { CustomStampSettings };
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
var DistanceSettings = /** @class */ (function (_super) {
    __extends(DistanceSettings, _super);
    function DistanceSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property({ x: 0, y: 0 })
    ], DistanceSettings.prototype, "offset", void 0);
    __decorate([
        Property(1)
    ], DistanceSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property(1)
    ], DistanceSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#ff0000')
    ], DistanceSettings.prototype, "fillColor", void 0);
    __decorate([
        Property('#ff0000')
    ], DistanceSettings.prototype, "strokeColor", void 0);
    __decorate([
        Property('Guest')
    ], DistanceSettings.prototype, "author", void 0);
    __decorate([
        Property('1')
    ], DistanceSettings.prototype, "thickness", void 0);
    __decorate([
        Property('None')
    ], DistanceSettings.prototype, "lineHeadStartStyle", void 0);
    __decorate([
        Property('None')
    ], DistanceSettings.prototype, "lineHeadEndStyle", void 0);
    __decorate([
        Property(0)
    ], DistanceSettings.prototype, "borderDashArray", void 0);
    __decorate([
        Property('')
    ], DistanceSettings.prototype, "annotationSelectorSettings", void 0);
    __decorate([
        Property(0)
    ], DistanceSettings.prototype, "minHeight", void 0);
    __decorate([
        Property(0)
    ], DistanceSettings.prototype, "minWidth", void 0);
    __decorate([
        Property(0)
    ], DistanceSettings.prototype, "maxHeight", void 0);
    __decorate([
        Property(0)
    ], DistanceSettings.prototype, "maxWidth", void 0);
    __decorate([
        Property(false)
    ], DistanceSettings.prototype, "isLock", void 0);
    __decorate([
        Property(null)
    ], DistanceSettings.prototype, "customData", void 0);
    __decorate([
        Property(40)
    ], DistanceSettings.prototype, "leaderLength", void 0);
    __decorate([
        Property(CursorType.move)
    ], DistanceSettings.prototype, "resizeCursorType", void 0);
    __decorate([
        Property(['None'])
    ], DistanceSettings.prototype, "allowedInteractions", void 0);
    __decorate([
        Property(true)
    ], DistanceSettings.prototype, "isPrint", void 0);
    return DistanceSettings;
}(ChildProperty));
export { DistanceSettings };
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
var PerimeterSettings = /** @class */ (function (_super) {
    __extends(PerimeterSettings, _super);
    function PerimeterSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property({ x: 0, y: 0 })
    ], PerimeterSettings.prototype, "offset", void 0);
    __decorate([
        Property(1)
    ], PerimeterSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property(1)
    ], PerimeterSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#ffffff00')
    ], PerimeterSettings.prototype, "fillColor", void 0);
    __decorate([
        Property('#ff0000')
    ], PerimeterSettings.prototype, "strokeColor", void 0);
    __decorate([
        Property('Guest')
    ], PerimeterSettings.prototype, "author", void 0);
    __decorate([
        Property('1')
    ], PerimeterSettings.prototype, "thickness", void 0);
    __decorate([
        Property('None')
    ], PerimeterSettings.prototype, "lineHeadStartStyle", void 0);
    __decorate([
        Property('None')
    ], PerimeterSettings.prototype, "lineHeadEndStyle", void 0);
    __decorate([
        Property(0)
    ], PerimeterSettings.prototype, "borderDashArray", void 0);
    __decorate([
        Property(0)
    ], PerimeterSettings.prototype, "minHeight", void 0);
    __decorate([
        Property(0)
    ], PerimeterSettings.prototype, "minWidth", void 0);
    __decorate([
        Property(0)
    ], PerimeterSettings.prototype, "maxHeight", void 0);
    __decorate([
        Property(0)
    ], PerimeterSettings.prototype, "maxWidth", void 0);
    __decorate([
        Property(false)
    ], PerimeterSettings.prototype, "isLock", void 0);
    __decorate([
        Property('')
    ], PerimeterSettings.prototype, "annotationSelectorSettings", void 0);
    __decorate([
        Property(['None'])
    ], PerimeterSettings.prototype, "allowedInteractions", void 0);
    __decorate([
        Property(true)
    ], PerimeterSettings.prototype, "isPrint", void 0);
    return PerimeterSettings;
}(ChildProperty));
export { PerimeterSettings };
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
var AreaSettings = /** @class */ (function (_super) {
    __extends(AreaSettings, _super);
    function AreaSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property({ x: 0, y: 0 })
    ], AreaSettings.prototype, "offset", void 0);
    __decorate([
        Property(1)
    ], AreaSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property(1)
    ], AreaSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#ffffff00')
    ], AreaSettings.prototype, "fillColor", void 0);
    __decorate([
        Property('#ff0000')
    ], AreaSettings.prototype, "strokeColor", void 0);
    __decorate([
        Property('Guest')
    ], AreaSettings.prototype, "author", void 0);
    __decorate([
        Property('1')
    ], AreaSettings.prototype, "thickness", void 0);
    __decorate([
        Property(0)
    ], AreaSettings.prototype, "minHeight", void 0);
    __decorate([
        Property(0)
    ], AreaSettings.prototype, "minWidth", void 0);
    __decorate([
        Property(0)
    ], AreaSettings.prototype, "maxHeight", void 0);
    __decorate([
        Property(0)
    ], AreaSettings.prototype, "maxWidth", void 0);
    __decorate([
        Property(false)
    ], AreaSettings.prototype, "isLock", void 0);
    __decorate([
        Property('')
    ], AreaSettings.prototype, "annotationSelectorSettings", void 0);
    __decorate([
        Property(['None'])
    ], AreaSettings.prototype, "allowedInteractions", void 0);
    __decorate([
        Property(true)
    ], AreaSettings.prototype, "isPrint", void 0);
    return AreaSettings;
}(ChildProperty));
export { AreaSettings };
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
var RadiusSettings = /** @class */ (function (_super) {
    __extends(RadiusSettings, _super);
    function RadiusSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property({ x: 0, y: 0 })
    ], RadiusSettings.prototype, "offset", void 0);
    __decorate([
        Property(1)
    ], RadiusSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property(100)
    ], RadiusSettings.prototype, "width", void 0);
    __decorate([
        Property(90)
    ], RadiusSettings.prototype, "height", void 0);
    __decorate([
        Property(1)
    ], RadiusSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#ffffff00')
    ], RadiusSettings.prototype, "fillColor", void 0);
    __decorate([
        Property('#ff0000')
    ], RadiusSettings.prototype, "strokeColor", void 0);
    __decorate([
        Property('Guest')
    ], RadiusSettings.prototype, "author", void 0);
    __decorate([
        Property('1')
    ], RadiusSettings.prototype, "thickness", void 0);
    __decorate([
        Property('')
    ], RadiusSettings.prototype, "annotationSelectorSettings", void 0);
    __decorate([
        Property(0)
    ], RadiusSettings.prototype, "minHeight", void 0);
    __decorate([
        Property(0)
    ], RadiusSettings.prototype, "minWidth", void 0);
    __decorate([
        Property(0)
    ], RadiusSettings.prototype, "maxHeight", void 0);
    __decorate([
        Property(0)
    ], RadiusSettings.prototype, "maxWidth", void 0);
    __decorate([
        Property(false)
    ], RadiusSettings.prototype, "isLock", void 0);
    __decorate([
        Property(null)
    ], RadiusSettings.prototype, "customData", void 0);
    __decorate([
        Property(['None'])
    ], RadiusSettings.prototype, "allowedInteractions", void 0);
    __decorate([
        Property(true)
    ], RadiusSettings.prototype, "isPrint", void 0);
    return RadiusSettings;
}(ChildProperty));
export { RadiusSettings };
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
var VolumeSettings = /** @class */ (function (_super) {
    __extends(VolumeSettings, _super);
    function VolumeSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property({ x: 0, y: 0 })
    ], VolumeSettings.prototype, "offset", void 0);
    __decorate([
        Property(1)
    ], VolumeSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property(1)
    ], VolumeSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#ffffff00')
    ], VolumeSettings.prototype, "fillColor", void 0);
    __decorate([
        Property('#ff0000')
    ], VolumeSettings.prototype, "strokeColor", void 0);
    __decorate([
        Property('Guest')
    ], VolumeSettings.prototype, "author", void 0);
    __decorate([
        Property('1')
    ], VolumeSettings.prototype, "thickness", void 0);
    __decorate([
        Property(0)
    ], VolumeSettings.prototype, "minHeight", void 0);
    __decorate([
        Property(0)
    ], VolumeSettings.prototype, "minWidth", void 0);
    __decorate([
        Property(0)
    ], VolumeSettings.prototype, "maxHeight", void 0);
    __decorate([
        Property(0)
    ], VolumeSettings.prototype, "maxWidth", void 0);
    __decorate([
        Property(false)
    ], VolumeSettings.prototype, "isLock", void 0);
    __decorate([
        Property('')
    ], VolumeSettings.prototype, "annotationSelectorSettings", void 0);
    __decorate([
        Property(['None'])
    ], VolumeSettings.prototype, "allowedInteractions", void 0);
    __decorate([
        Property(true)
    ], VolumeSettings.prototype, "isPrint", void 0);
    return VolumeSettings;
}(ChildProperty));
export { VolumeSettings };
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
var InkAnnotationSettings = /** @class */ (function (_super) {
    __extends(InkAnnotationSettings, _super);
    function InkAnnotationSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property({ x: 0, y: 0 })
    ], InkAnnotationSettings.prototype, "offset", void 0);
    __decorate([
        Property(1)
    ], InkAnnotationSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property(0)
    ], InkAnnotationSettings.prototype, "width", void 0);
    __decorate([
        Property(0)
    ], InkAnnotationSettings.prototype, "height", void 0);
    __decorate([
        Property(0)
    ], InkAnnotationSettings.prototype, "path", void 0);
    __decorate([
        Property(1)
    ], InkAnnotationSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#ff0000')
    ], InkAnnotationSettings.prototype, "strokeColor", void 0);
    __decorate([
        Property(1)
    ], InkAnnotationSettings.prototype, "thickness", void 0);
    __decorate([
        Property('')
    ], InkAnnotationSettings.prototype, "annotationSelectorSettings", void 0);
    __decorate([
        Property(false)
    ], InkAnnotationSettings.prototype, "isLock", void 0);
    __decorate([
        Property('Guest')
    ], InkAnnotationSettings.prototype, "author", void 0);
    __decorate([
        Property(['None'])
    ], InkAnnotationSettings.prototype, "allowedInteractions", void 0);
    __decorate([
        Property(null)
    ], InkAnnotationSettings.prototype, "customData", void 0);
    __decorate([
        Property(true)
    ], InkAnnotationSettings.prototype, "isPrint", void 0);
    return InkAnnotationSettings;
}(ChildProperty));
export { InkAnnotationSettings };
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
var StickyNotesSettings = /** @class */ (function (_super) {
    __extends(StickyNotesSettings, _super);
    function StickyNotesSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property({ x: 0, y: 0 })
    ], StickyNotesSettings.prototype, "offset", void 0);
    __decorate([
        Property(1)
    ], StickyNotesSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property('Guest')
    ], StickyNotesSettings.prototype, "author", void 0);
    __decorate([
        Property(1)
    ], StickyNotesSettings.prototype, "opacity", void 0);
    __decorate([
        Property('')
    ], StickyNotesSettings.prototype, "annotationSelectorSettings", void 0);
    __decorate([
        Property(null)
    ], StickyNotesSettings.prototype, "customData", void 0);
    __decorate([
        Property(false)
    ], StickyNotesSettings.prototype, "isLock", void 0);
    __decorate([
        Property(['None'])
    ], StickyNotesSettings.prototype, "allowedInteractions", void 0);
    __decorate([
        Property(true)
    ], StickyNotesSettings.prototype, "isPrint", void 0);
    return StickyNotesSettings;
}(ChildProperty));
export { StickyNotesSettings };
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
var MeasurementSettings = /** @class */ (function (_super) {
    __extends(MeasurementSettings, _super);
    function MeasurementSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(1)
    ], MeasurementSettings.prototype, "scaleRatio", void 0);
    __decorate([
        Property('in')
    ], MeasurementSettings.prototype, "conversionUnit", void 0);
    __decorate([
        Property('in')
    ], MeasurementSettings.prototype, "displayUnit", void 0);
    __decorate([
        Property(96)
    ], MeasurementSettings.prototype, "depth", void 0);
    return MeasurementSettings;
}(ChildProperty));
export { MeasurementSettings };
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
var FreeTextSettings = /** @class */ (function (_super) {
    __extends(FreeTextSettings, _super);
    function FreeTextSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property({ x: 0, y: 0 })
    ], FreeTextSettings.prototype, "offset", void 0);
    __decorate([
        Property(1)
    ], FreeTextSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property(1)
    ], FreeTextSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#ffffff00')
    ], FreeTextSettings.prototype, "borderColor", void 0);
    __decorate([
        Property(1)
    ], FreeTextSettings.prototype, "borderWidth", void 0);
    __decorate([
        Property('solid')
    ], FreeTextSettings.prototype, "borderStyle", void 0);
    __decorate([
        Property('Guest')
    ], FreeTextSettings.prototype, "author", void 0);
    __decorate([
        Property('#ffffff00')
    ], FreeTextSettings.prototype, "fillColor", void 0);
    __decorate([
        Property(16)
    ], FreeTextSettings.prototype, "fontSize", void 0);
    __decorate([
        Property(151)
    ], FreeTextSettings.prototype, "width", void 0);
    __decorate([
        Property(24.6)
    ], FreeTextSettings.prototype, "height", void 0);
    __decorate([
        Property('#000')
    ], FreeTextSettings.prototype, "fontColor", void 0);
    __decorate([
        Property('Helvetica')
    ], FreeTextSettings.prototype, "fontFamily", void 0);
    __decorate([
        Property('TypeHere')
    ], FreeTextSettings.prototype, "defaultText", void 0);
    __decorate([
        Property('None')
    ], FreeTextSettings.prototype, "fontStyle", void 0);
    __decorate([
        Property('Left')
    ], FreeTextSettings.prototype, "textAlignment", void 0);
    __decorate([
        Property(false)
    ], FreeTextSettings.prototype, "allowEditTextOnly", void 0);
    __decorate([
        Property('')
    ], FreeTextSettings.prototype, "annotationSelectorSettings", void 0);
    __decorate([
        Property(0)
    ], FreeTextSettings.prototype, "minHeight", void 0);
    __decorate([
        Property(0)
    ], FreeTextSettings.prototype, "minWidth", void 0);
    __decorate([
        Property(0)
    ], FreeTextSettings.prototype, "maxHeight", void 0);
    __decorate([
        Property(0)
    ], FreeTextSettings.prototype, "maxWidth", void 0);
    __decorate([
        Property(false)
    ], FreeTextSettings.prototype, "isLock", void 0);
    __decorate([
        Property(null)
    ], FreeTextSettings.prototype, "customData", void 0);
    __decorate([
        Property(['None'])
    ], FreeTextSettings.prototype, "allowedInteractions", void 0);
    __decorate([
        Property(true)
    ], FreeTextSettings.prototype, "isPrint", void 0);
    __decorate([
        Property(false)
    ], FreeTextSettings.prototype, "isReadonly", void 0);
    __decorate([
        Property(false)
    ], FreeTextSettings.prototype, "enableAutoFit", void 0);
    return FreeTextSettings;
}(ChildProperty));
export { FreeTextSettings };
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
var AnnotationSelectorSettings = /** @class */ (function (_super) {
    __extends(AnnotationSelectorSettings, _super);
    function AnnotationSelectorSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], AnnotationSelectorSettings.prototype, "selectionBorderColor", void 0);
    __decorate([
        Property('black')
    ], AnnotationSelectorSettings.prototype, "resizerBorderColor", void 0);
    __decorate([
        Property('#FF4081')
    ], AnnotationSelectorSettings.prototype, "resizerFillColor", void 0);
    __decorate([
        Property(8)
    ], AnnotationSelectorSettings.prototype, "resizerSize", void 0);
    __decorate([
        Property(1)
    ], AnnotationSelectorSettings.prototype, "selectionBorderThickness", void 0);
    __decorate([
        Property('Square')
    ], AnnotationSelectorSettings.prototype, "resizerShape", void 0);
    __decorate([
        Property('')
    ], AnnotationSelectorSettings.prototype, "selectorLineDashArray", void 0);
    __decorate([
        Property(AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges)
    ], AnnotationSelectorSettings.prototype, "resizerLocation", void 0);
    __decorate([
        Property(null)
    ], AnnotationSelectorSettings.prototype, "resizerCursorType", void 0);
    return AnnotationSelectorSettings;
}(ChildProperty));
export { AnnotationSelectorSettings };
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
var TextSearchColorSettings = /** @class */ (function (_super) {
    __extends(TextSearchColorSettings, _super);
    function TextSearchColorSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('#fdd835')
    ], TextSearchColorSettings.prototype, "searchHighlightColor", void 0);
    __decorate([
        Property('#8b4c12')
    ], TextSearchColorSettings.prototype, "searchColor", void 0);
    return TextSearchColorSettings;
}(ChildProperty));
export { TextSearchColorSettings };
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
var HandWrittenSignatureSettings = /** @class */ (function (_super) {
    __extends(HandWrittenSignatureSettings, _super);
    function HandWrittenSignatureSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(1)
    ], HandWrittenSignatureSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#000000')
    ], HandWrittenSignatureSettings.prototype, "strokeColor", void 0);
    __decorate([
        Property(1)
    ], HandWrittenSignatureSettings.prototype, "thickness", void 0);
    __decorate([
        Property(150)
    ], HandWrittenSignatureSettings.prototype, "width", void 0);
    __decorate([
        Property(100)
    ], HandWrittenSignatureSettings.prototype, "height", void 0);
    __decorate([
        Property(1)
    ], HandWrittenSignatureSettings.prototype, "saveSignatureLimit", void 0);
    __decorate([
        Property(1)
    ], HandWrittenSignatureSettings.prototype, "saveInitialLimit", void 0);
    __decorate([
        Property([])
    ], HandWrittenSignatureSettings.prototype, "signatureItem", void 0);
    __decorate([
        Property()
    ], HandWrittenSignatureSettings.prototype, "typeSignatureFonts", void 0);
    __decorate([
        Property('')
    ], HandWrittenSignatureSettings.prototype, "annotationSelectorSettings", void 0);
    __decorate([
        Property()
    ], HandWrittenSignatureSettings.prototype, "signatureDialogSettings", void 0);
    __decorate([
        Property()
    ], HandWrittenSignatureSettings.prototype, "initialDialogSettings", void 0);
    return HandWrittenSignatureSettings;
}(ChildProperty));
export { HandWrittenSignatureSettings };
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
var AnnotationSettings = /** @class */ (function (_super) {
    __extends(AnnotationSettings, _super);
    function AnnotationSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Guest')
    ], AnnotationSettings.prototype, "author", void 0);
    __decorate([
        Property(0)
    ], AnnotationSettings.prototype, "minHeight", void 0);
    __decorate([
        Property(0)
    ], AnnotationSettings.prototype, "minWidth", void 0);
    __decorate([
        Property(0)
    ], AnnotationSettings.prototype, "maxHeight", void 0);
    __decorate([
        Property(0)
    ], AnnotationSettings.prototype, "maxWidth", void 0);
    __decorate([
        Property(false)
    ], AnnotationSettings.prototype, "isLock", void 0);
    __decorate([
        Property(false)
    ], AnnotationSettings.prototype, "skipPrint", void 0);
    __decorate([
        Property(false)
    ], AnnotationSettings.prototype, "skipDownload", void 0);
    __decorate([
        Property(null)
    ], AnnotationSettings.prototype, "customData", void 0);
    __decorate([
        Property(['None'])
    ], AnnotationSettings.prototype, "allowedInteractions", void 0);
    return AnnotationSettings;
}(ChildProperty));
export { AnnotationSettings };
/**
 * The `DocumentTextCollectionSettings` module is used to provide the properties to DocumentTextCollection.
 */
var DocumentTextCollectionSettings = /** @class */ (function (_super) {
    __extends(DocumentTextCollectionSettings, _super);
    function DocumentTextCollectionSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property()
    ], DocumentTextCollectionSettings.prototype, "textData", void 0);
    __decorate([
        Property()
    ], DocumentTextCollectionSettings.prototype, "pageText", void 0);
    __decorate([
        Property()
    ], DocumentTextCollectionSettings.prototype, "pageSize", void 0);
    return DocumentTextCollectionSettings;
}(ChildProperty));
export { DocumentTextCollectionSettings };
/**
 * The `TextDataSettings` module is used to provide the properties of text data.
 */
var TextDataSettings = /** @class */ (function (_super) {
    __extends(TextDataSettings, _super);
    function TextDataSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property()
    ], TextDataSettings.prototype, "bounds", void 0);
    __decorate([
        Property()
    ], TextDataSettings.prototype, "text", void 0);
    return TextDataSettings;
}(ChildProperty));
export { TextDataSettings };
/**
 * The `RectangleBounds` module is used to provide the properties of rectangle bounds.
 */
var RectangleBounds = /** @class */ (function (_super) {
    __extends(RectangleBounds, _super);
    function RectangleBounds() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property()
    ], RectangleBounds.prototype, "size", void 0);
    __decorate([
        Property()
    ], RectangleBounds.prototype, "x", void 0);
    __decorate([
        Property()
    ], RectangleBounds.prototype, "y", void 0);
    __decorate([
        Property()
    ], RectangleBounds.prototype, "width", void 0);
    __decorate([
        Property()
    ], RectangleBounds.prototype, "height", void 0);
    __decorate([
        Property()
    ], RectangleBounds.prototype, "left", void 0);
    __decorate([
        Property()
    ], RectangleBounds.prototype, "top", void 0);
    __decorate([
        Property()
    ], RectangleBounds.prototype, "right", void 0);
    __decorate([
        Property()
    ], RectangleBounds.prototype, "bottom", void 0);
    __decorate([
        Property()
    ], RectangleBounds.prototype, "isEmpty", void 0);
    return RectangleBounds;
}(ChildProperty));
export { RectangleBounds };
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
var TileRenderingSettings = /** @class */ (function (_super) {
    __extends(TileRenderingSettings, _super);
    function TileRenderingSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(true)
    ], TileRenderingSettings.prototype, "enableTileRendering", void 0);
    __decorate([
        Property(0)
    ], TileRenderingSettings.prototype, "x", void 0);
    __decorate([
        Property(0)
    ], TileRenderingSettings.prototype, "y", void 0);
    return TileRenderingSettings;
}(ChildProperty));
export { TileRenderingSettings };
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
var ScrollSettings = /** @class */ (function (_super) {
    __extends(ScrollSettings, _super);
    function ScrollSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(100)
    ], ScrollSettings.prototype, "delayPageRequestTimeOnScroll", void 0);
    return ScrollSettings;
}(ChildProperty));
export { ScrollSettings };
/**
 * The `FormField` is used to store the form fields of PDF document.
 */
var FormField = /** @class */ (function (_super) {
    __extends(FormField, _super);
    function FormField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], FormField.prototype, "name", void 0);
    __decorate([
        Property(false)
    ], FormField.prototype, "isChecked", void 0);
    __decorate([
        Property(false)
    ], FormField.prototype, "isSelected", void 0);
    __decorate([
        Property('')
    ], FormField.prototype, "id", void 0);
    __decorate([
        Property('')
    ], FormField.prototype, "value", void 0);
    __decorate([
        Property('')
    ], FormField.prototype, "type", void 0);
    __decorate([
        Property(false)
    ], FormField.prototype, "isReadOnly", void 0);
    __decorate([
        Property([''])
    ], FormField.prototype, "signatureType", void 0);
    __decorate([
        Property('')
    ], FormField.prototype, "fontName", void 0);
    __decorate([
        Property({ x: 0, y: 0, width: 0, height: 0 })
    ], FormField.prototype, "bounds", void 0);
    __decorate([
        Property('Helvetica')
    ], FormField.prototype, "fontFamily", void 0);
    __decorate([
        Property(10)
    ], FormField.prototype, "fontSize", void 0);
    __decorate([
        Property('None')
    ], FormField.prototype, "fontStyle", void 0);
    __decorate([
        Property('black')
    ], FormField.prototype, "color", void 0);
    __decorate([
        Property('white')
    ], FormField.prototype, "backgroundColor", void 0);
    __decorate([
        Property('Left')
    ], FormField.prototype, "alignment", void 0);
    __decorate([
        Property('visible')
    ], FormField.prototype, "visibility", void 0);
    __decorate([
        Property(0)
    ], FormField.prototype, "maxLength", void 0);
    __decorate([
        Property(false)
    ], FormField.prototype, "isRequired", void 0);
    __decorate([
        Property(false)
    ], FormField.prototype, "isPrint", void 0);
    __decorate([
        Property('')
    ], FormField.prototype, "tooltip", void 0);
    __decorate([
        Property('')
    ], FormField.prototype, "options", void 0);
    __decorate([
        Property()
    ], FormField.prototype, "signatureIndicatorSettings", void 0);
    __decorate([
        Property(1)
    ], FormField.prototype, "thickness", void 0);
    __decorate([
        Property('#303030')
    ], FormField.prototype, "borderColor", void 0);
    __decorate([
        Property(false)
    ], FormField.prototype, "isMultiline", void 0);
    __decorate([
        Property(false)
    ], FormField.prototype, "insertSpaces", void 0);
    __decorate([
        Property(-1)
    ], FormField.prototype, "pageIndex", void 0);
    return FormField;
}(ChildProperty));
export { FormField };
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
var ContextMenuSettings = /** @class */ (function (_super) {
    __extends(ContextMenuSettings, _super);
    function ContextMenuSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('RightClick')
    ], ContextMenuSettings.prototype, "contextMenuAction", void 0);
    __decorate([
        Property([])
    ], ContextMenuSettings.prototype, "contextMenuItems", void 0);
    return ContextMenuSettings;
}(ChildProperty));
export { ContextMenuSettings };
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
var TextFieldSettings = /** @class */ (function (_super) {
    __extends(TextFieldSettings, _super);
    function TextFieldSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property({ x: 0, y: 0, width: 0, height: 0 })
    ], TextFieldSettings.prototype, "bounds", void 0);
    __decorate([
        Property('')
    ], TextFieldSettings.prototype, "name", void 0);
    __decorate([
        Property('')
    ], TextFieldSettings.prototype, "value", void 0);
    __decorate([
        Property('Helvetica')
    ], TextFieldSettings.prototype, "fontFamily", void 0);
    __decorate([
        Property(10)
    ], TextFieldSettings.prototype, "fontSize", void 0);
    __decorate([
        Property(0)
    ], TextFieldSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property('None')
    ], TextFieldSettings.prototype, "fontStyle", void 0);
    __decorate([
        Property('black')
    ], TextFieldSettings.prototype, "color", void 0);
    __decorate([
        Property('white')
    ], TextFieldSettings.prototype, "backgroundColor", void 0);
    __decorate([
        Property('Left')
    ], TextFieldSettings.prototype, "alignment", void 0);
    __decorate([
        Property(false)
    ], TextFieldSettings.prototype, "isReadOnly", void 0);
    __decorate([
        Property('visible')
    ], TextFieldSettings.prototype, "visibility", void 0);
    __decorate([
        Property(0)
    ], TextFieldSettings.prototype, "maxLength", void 0);
    __decorate([
        Property(false)
    ], TextFieldSettings.prototype, "isRequired", void 0);
    __decorate([
        Property(false)
    ], TextFieldSettings.prototype, "isPrint", void 0);
    __decorate([
        Property('')
    ], TextFieldSettings.prototype, "tooltip", void 0);
    __decorate([
        Property(1)
    ], TextFieldSettings.prototype, "thickness", void 0);
    __decorate([
        Property('#303030')
    ], TextFieldSettings.prototype, "borderColor", void 0);
    __decorate([
        Property(false)
    ], TextFieldSettings.prototype, "isMultiline", void 0);
    return TextFieldSettings;
}(ChildProperty));
export { TextFieldSettings };
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
var PasswordFieldSettings = /** @class */ (function (_super) {
    __extends(PasswordFieldSettings, _super);
    function PasswordFieldSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property({ x: 0, y: 0, width: 0, height: 0 })
    ], PasswordFieldSettings.prototype, "bounds", void 0);
    __decorate([
        Property('')
    ], PasswordFieldSettings.prototype, "name", void 0);
    __decorate([
        Property('')
    ], PasswordFieldSettings.prototype, "value", void 0);
    __decorate([
        Property(0)
    ], PasswordFieldSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property('Helvetica')
    ], PasswordFieldSettings.prototype, "fontFamily", void 0);
    __decorate([
        Property(10)
    ], PasswordFieldSettings.prototype, "fontSize", void 0);
    __decorate([
        Property('None')
    ], PasswordFieldSettings.prototype, "fontStyle", void 0);
    __decorate([
        Property('black')
    ], PasswordFieldSettings.prototype, "color", void 0);
    __decorate([
        Property('white')
    ], PasswordFieldSettings.prototype, "backgroundColor", void 0);
    __decorate([
        Property('Left')
    ], PasswordFieldSettings.prototype, "alignment", void 0);
    __decorate([
        Property(false)
    ], PasswordFieldSettings.prototype, "isReadOnly", void 0);
    __decorate([
        Property('visible')
    ], PasswordFieldSettings.prototype, "visibility", void 0);
    __decorate([
        Property(0)
    ], PasswordFieldSettings.prototype, "maxLength", void 0);
    __decorate([
        Property(false)
    ], PasswordFieldSettings.prototype, "isRequired", void 0);
    __decorate([
        Property(false)
    ], PasswordFieldSettings.prototype, "isPrint", void 0);
    __decorate([
        Property('')
    ], PasswordFieldSettings.prototype, "tooltip", void 0);
    __decorate([
        Property(1)
    ], PasswordFieldSettings.prototype, "thickness", void 0);
    __decorate([
        Property('#303030')
    ], PasswordFieldSettings.prototype, "borderColor", void 0);
    return PasswordFieldSettings;
}(ChildProperty));
export { PasswordFieldSettings };
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
var CheckBoxFieldSettings = /** @class */ (function (_super) {
    __extends(CheckBoxFieldSettings, _super);
    function CheckBoxFieldSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property({ x: 0, y: 0, width: 0, height: 0 })
    ], CheckBoxFieldSettings.prototype, "bounds", void 0);
    __decorate([
        Property('')
    ], CheckBoxFieldSettings.prototype, "name", void 0);
    __decorate([
        Property(false)
    ], CheckBoxFieldSettings.prototype, "isChecked", void 0);
    __decorate([
        Property('white')
    ], CheckBoxFieldSettings.prototype, "backgroundColor", void 0);
    __decorate([
        Property(false)
    ], CheckBoxFieldSettings.prototype, "isReadOnly", void 0);
    __decorate([
        Property('visible')
    ], CheckBoxFieldSettings.prototype, "visibility", void 0);
    __decorate([
        Property(false)
    ], CheckBoxFieldSettings.prototype, "isPrint", void 0);
    __decorate([
        Property(0)
    ], CheckBoxFieldSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property('')
    ], CheckBoxFieldSettings.prototype, "tooltip", void 0);
    __decorate([
        Property(false)
    ], CheckBoxFieldSettings.prototype, "isRequired", void 0);
    __decorate([
        Property(1)
    ], CheckBoxFieldSettings.prototype, "thickness", void 0);
    __decorate([
        Property('#303030')
    ], CheckBoxFieldSettings.prototype, "borderColor", void 0);
    return CheckBoxFieldSettings;
}(ChildProperty));
export { CheckBoxFieldSettings };
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
var RadioButtonFieldSettings = /** @class */ (function (_super) {
    __extends(RadioButtonFieldSettings, _super);
    function RadioButtonFieldSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property({ x: 0, y: 0, width: 0, height: 0 })
    ], RadioButtonFieldSettings.prototype, "bounds", void 0);
    __decorate([
        Property('')
    ], RadioButtonFieldSettings.prototype, "name", void 0);
    __decorate([
        Property(false)
    ], RadioButtonFieldSettings.prototype, "isSelected", void 0);
    __decorate([
        Property('white')
    ], RadioButtonFieldSettings.prototype, "backgroundColor", void 0);
    __decorate([
        Property(false)
    ], RadioButtonFieldSettings.prototype, "isReadOnly", void 0);
    __decorate([
        Property(false)
    ], RadioButtonFieldSettings.prototype, "isRequired", void 0);
    __decorate([
        Property(0)
    ], RadioButtonFieldSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property('visible')
    ], RadioButtonFieldSettings.prototype, "visibility", void 0);
    __decorate([
        Property(false)
    ], RadioButtonFieldSettings.prototype, "isPrint", void 0);
    __decorate([
        Property('')
    ], RadioButtonFieldSettings.prototype, "tooltip", void 0);
    __decorate([
        Property(1)
    ], RadioButtonFieldSettings.prototype, "thickness", void 0);
    __decorate([
        Property('#303030')
    ], RadioButtonFieldSettings.prototype, "borderColor", void 0);
    return RadioButtonFieldSettings;
}(ChildProperty));
export { RadioButtonFieldSettings };
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
var DropdownFieldSettings = /** @class */ (function (_super) {
    __extends(DropdownFieldSettings, _super);
    function DropdownFieldSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property({ x: 0, y: 0, width: 0, height: 0 })
    ], DropdownFieldSettings.prototype, "bounds", void 0);
    __decorate([
        Property('')
    ], DropdownFieldSettings.prototype, "name", void 0);
    __decorate([
        Property('')
    ], DropdownFieldSettings.prototype, "value", void 0);
    __decorate([
        Property('Helvetica')
    ], DropdownFieldSettings.prototype, "fontFamily", void 0);
    __decorate([
        Property(10)
    ], DropdownFieldSettings.prototype, "fontSize", void 0);
    __decorate([
        Property(0)
    ], DropdownFieldSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property('None')
    ], DropdownFieldSettings.prototype, "fontStyle", void 0);
    __decorate([
        Property('black')
    ], DropdownFieldSettings.prototype, "color", void 0);
    __decorate([
        Property('white')
    ], DropdownFieldSettings.prototype, "backgroundColor", void 0);
    __decorate([
        Property('Left')
    ], DropdownFieldSettings.prototype, "alignment", void 0);
    __decorate([
        Property(false)
    ], DropdownFieldSettings.prototype, "isReadOnly", void 0);
    __decorate([
        Property('visible')
    ], DropdownFieldSettings.prototype, "visibility", void 0);
    __decorate([
        Property(false)
    ], DropdownFieldSettings.prototype, "isRequired", void 0);
    __decorate([
        Property(false)
    ], DropdownFieldSettings.prototype, "isPrint", void 0);
    __decorate([
        Property('')
    ], DropdownFieldSettings.prototype, "tooltip", void 0);
    __decorate([
        Property('')
    ], DropdownFieldSettings.prototype, "options", void 0);
    __decorate([
        Property(1)
    ], DropdownFieldSettings.prototype, "thickness", void 0);
    __decorate([
        Property('#303030')
    ], DropdownFieldSettings.prototype, "borderColor", void 0);
    return DropdownFieldSettings;
}(ChildProperty));
export { DropdownFieldSettings };
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
var ListBoxFieldSettings = /** @class */ (function (_super) {
    __extends(ListBoxFieldSettings, _super);
    function ListBoxFieldSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property({ x: 0, y: 0, width: 0, height: 0 })
    ], ListBoxFieldSettings.prototype, "bounds", void 0);
    __decorate([
        Property('')
    ], ListBoxFieldSettings.prototype, "name", void 0);
    __decorate([
        Property('')
    ], ListBoxFieldSettings.prototype, "value", void 0);
    __decorate([
        Property('Helvetica')
    ], ListBoxFieldSettings.prototype, "fontFamily", void 0);
    __decorate([
        Property(10)
    ], ListBoxFieldSettings.prototype, "fontSize", void 0);
    __decorate([
        Property(0)
    ], ListBoxFieldSettings.prototype, "pageNumber", void 0);
    __decorate([
        Property('None')
    ], ListBoxFieldSettings.prototype, "fontStyle", void 0);
    __decorate([
        Property('black')
    ], ListBoxFieldSettings.prototype, "color", void 0);
    __decorate([
        Property('white')
    ], ListBoxFieldSettings.prototype, "backgroundColor", void 0);
    __decorate([
        Property('Left')
    ], ListBoxFieldSettings.prototype, "alignment", void 0);
    __decorate([
        Property(false)
    ], ListBoxFieldSettings.prototype, "isReadOnly", void 0);
    __decorate([
        Property('visible')
    ], ListBoxFieldSettings.prototype, "visibility", void 0);
    __decorate([
        Property(false)
    ], ListBoxFieldSettings.prototype, "isRequired", void 0);
    __decorate([
        Property(false)
    ], ListBoxFieldSettings.prototype, "isPrint", void 0);
    __decorate([
        Property('')
    ], ListBoxFieldSettings.prototype, "tooltip", void 0);
    __decorate([
        Property([])
    ], ListBoxFieldSettings.prototype, "options", void 0);
    __decorate([
        Property(1)
    ], ListBoxFieldSettings.prototype, "thickness", void 0);
    __decorate([
        Property('#303030')
    ], ListBoxFieldSettings.prototype, "borderColor", void 0);
    return ListBoxFieldSettings;
}(ChildProperty));
export { ListBoxFieldSettings };
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], Item.prototype, "itemName", void 0);
    __decorate([
        Property('')
    ], Item.prototype, "itemValue", void 0);
    return Item;
}(ChildProperty));
export { Item };
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
var PdfViewer = /** @class */ (function (_super) {
    __extends(PdfViewer, _super);
    function PdfViewer(options, element) {
        var _this = _super.call(this, options, element) || this;
        /**
         * Get the Loaded document signature Collections in the PdfViewer control.
         *
         * {% codeBlock src='pdfviewer/signatureCollection/index.md' %}{% endcodeBlock %}
         *
         */
        // eslint-disable-next-line
        _this.signatureCollection = [];
        /**
         * Gets or sets the document name loaded in the PdfViewer control.
         *
         * {% codeBlock src='pdfviewer/fileName/index.md' %}{% endcodeBlock %}
         *
         */
        _this.fileName = null;
        /**
         * @private
         */
        _this.zIndex = -1;
        /**
         * @private
         */
        _this.nameTable = {};
        /**   @private  */
        _this.clipboardData = {};
        /**
         * @private
         */
        _this.zIndexTable = [];
        _this.isTextSelectionStarted = false;
        /**
         * @private
         */
        _this.touchPadding = 10;
        /**
         * @private
         */
        _this.paddingDifferenceValue = 10;
        /** @hidden */
        _this.defaultLocale = {
            'PdfViewer': 'PDF Viewer',
            'Cancel': 'Cancel',
            'Download file': 'Download file',
            'Download': 'Download',
            'Enter Password': 'This document is password protected. Please enter a password.',
            'File Corrupted': 'File Corrupted',
            'File Corrupted Content': 'The file is corrupted and cannot be opened.',
            'Fit Page': 'Fit Page',
            'Fit Width': 'Fit Width',
            'Automatic': 'Automatic',
            'Go To First Page': 'Show first page',
            'Invalid Password': 'Incorrect Password. Please try again.',
            'Next Page': 'Show next page',
            'OK': 'OK',
            'Open': 'Open file',
            'Page Number': 'Current page number',
            'Previous Page': 'Show previous page',
            'Go To Last Page': 'Show last page',
            'Zoom': 'Zoom',
            'Zoom In': 'Zoom in',
            'Zoom Out': 'Zoom out',
            'Page Thumbnails': 'Page thumbnails',
            'Bookmarks': 'Bookmarks',
            'Print': 'Print file',
            'Password Protected': 'Password Required',
            'Copy': 'Copy',
            'Text Selection': 'Text selection tool',
            'Panning': 'Pan mode',
            'Text Search': 'Find text',
            'Find in document': 'Find in document',
            'Match case': 'Match case',
            'Apply': 'Apply',
            'GoToPage': 'Go to Page',
            // eslint-disable-next-line max-len
            'No matches': 'Viewer has finished searching the document. No more matches were found',
            'No Text Found': 'No Text Found',
            'Undo': 'Undo',
            'Redo': 'Redo',
            'Annotation': 'Add or Edit annotations',
            'FormDesigner': 'Add and Edit Form Fields',
            'Highlight': 'Highlight Text',
            'Underline': 'Underline Text',
            'Strikethrough': 'Strikethrough Text',
            'Delete': 'Delete annotation',
            'Opacity': 'Opacity',
            'Color edit': 'Change Color',
            'Opacity edit': 'Change Opacity',
            'Highlight context': 'Highlight',
            'Underline context': 'Underline',
            'Strikethrough context': 'Strikethrough',
            // eslint-disable-next-line max-len
            'Server error': 'Web-service is not listening. PDF Viewer depends on web-service for all it\'s features. Please start the web service to continue.',
            // eslint-disable-next-line max-len
            'Client error': 'Client-side error is found. Please check the custom headers provided in the AjaxRequestSettings property and web action methods in the ServerActionSettings property.',
            'Open text': 'Open',
            'First text': 'First Page',
            'Previous text': 'Previous Page',
            'Next text': 'Next Page',
            'Last text': 'Last Page',
            'Zoom in text': 'Zoom In',
            'Zoom out text': 'Zoom Out',
            'Selection text': 'Selection',
            'Pan text': 'Pan',
            'Print text': 'Print',
            'Search text': 'Search',
            'Annotation Edit text': 'Edit Annotation',
            'FormDesigner Edit text': 'Add and Edit Form Fields',
            'Line Thickness': 'Line Thickness',
            'Line Properties': 'Line Properties',
            'Start Arrow': 'Start Arrow',
            'End Arrow': 'End Arrow',
            'Line Style': 'Line Style',
            'Fill Color': 'Fill Color',
            'Line Color': 'Line Color',
            'None': 'None',
            'Open Arrow': 'Open',
            'Closed Arrow': 'Closed',
            'Round Arrow': 'Round',
            'Square Arrow': 'Square',
            'Diamond Arrow': 'Diamond',
            'Butt': 'Butt',
            'Cut': 'Cut',
            'Paste': 'Paste',
            'Delete Context': 'Delete',
            'Properties': 'Properties',
            'Add Stamp': 'Add Stamp',
            'Add Shapes': 'Add Shapes',
            'Stroke edit': 'Change Stroke Color',
            'Change thickness': 'Change Border Thickness',
            'Add line': 'Add Line',
            'Add arrow': 'Add Arrow',
            'Add rectangle': 'Add Rectangle',
            'Add circle': 'Add Circle',
            'Add polygon': 'Add Polygon',
            'Add Comments': 'Add Comments',
            'Comments': 'Comments',
            'SubmitForm': 'Submit Form',
            'No Comments Yet': 'No Comments Yet',
            'Accepted': 'Accepted',
            'Completed': 'Completed',
            'Cancelled': 'Cancelled',
            'Rejected': 'Rejected',
            'Leader Length': 'Leader Length',
            'Scale Ratio': 'Scale Ratio',
            'Calibrate': 'Calibrate',
            'Calibrate Distance': 'Calibrate Distance',
            'Calibrate Perimeter': 'Calibrate Perimeter',
            'Calibrate Area': 'Calibrate Area',
            'Calibrate Radius': 'Calibrate Radius',
            'Calibrate Volume': 'Calibrate Volume',
            'Depth': 'Depth',
            'Closed': 'Closed',
            'Round': 'Round',
            'Square': 'Square',
            'Diamond': 'Diamond',
            'Edit': 'Edit',
            'Comment': 'Comment',
            'Comment Panel': 'Comment Panel',
            'Set Status': 'Set Status',
            'Post': 'Post',
            'Page': 'Page',
            'Add a comment': 'Add a comment',
            'Add a reply': 'Add a reply',
            'Import Annotations': 'Import annotations from JSON file',
            'Export Annotations': 'Export annotation to JSON file',
            'Export XFDF': 'Export annotation to XFDF file',
            'Import XFDF': 'Import annotations from XFDF file',
            'Add': 'Add',
            'Clear': 'Clear',
            'Bold': 'Bold',
            'Italic': 'Italic',
            'Strikethroughs': 'Strikethrough',
            'Underlines': 'Underline',
            'Superscript': 'Superscript',
            'Subscript': 'Subscript',
            'Align left': 'Align Left',
            'Align right': 'Align Right',
            'Center': 'Center',
            'Justify': 'Justify',
            'Font color': 'Font Color',
            'Text Align': 'Text Align',
            'Text Properties': 'Font Style',
            'SignatureFieldDialogHeaderText': 'Add Signature',
            'HandwrittenSignatureDialogHeaderText': 'Add Signature',
            'InitialFieldDialogHeaderText': 'Add Initial',
            'HandwrittenInitialDialogHeaderText': 'Add Initial',
            'Draw Ink': 'Draw Ink',
            'Create': 'Create',
            'Font family': 'Font Family',
            'Font size': 'Font Size',
            'Free Text': 'Free Text',
            'Import Failed': 'Invalid JSON file type or file name; please select a valid JSON file',
            'Import PDF Failed': 'Invalid PDF file type or PDF file not found. Please select a valid PDF file',
            'File not found': 'Imported JSON file is not found in the desired location',
            'Export Failed': 'Export annotations action has failed; please ensure annotations are added properly',
            'of': 'of ',
            'Dynamic': 'Dynamic',
            'Standard Business': 'Standard Business',
            'Sign Here': 'Sign Here',
            'Custom Stamp': 'Custom Stamp',
            'Enter Signature as Name': 'Enter your name',
            'Draw-hand Signature': 'DRAW',
            'Type Signature': 'TYPE',
            'Upload Signature': 'UPLOAD',
            'Browse Signature Image': 'BROWSE',
            'Save Signature': 'Save Signature',
            'Save Initial': 'Save Initial',
            'Textbox': 'Textbox',
            'Password': 'Password',
            'Check Box': 'Checkbox',
            'Radio Button': 'Radio Button',
            'Dropdown': 'Drop Down',
            'List Box': 'List Box',
            'Signature': 'Signature',
            'Delete FormField': 'Delete Form Field',
            'Textbox Properties': 'Textbox Properties',
            'Name': 'Name',
            'Tooltip': 'Tooltip',
            'Value': 'Value',
            'Form Field Visibility': 'Form Field Visibility',
            'Read Only': 'Read Only',
            'Required': 'Required',
            'Checked': 'Checked',
            'Show Printing': 'Show Printing',
            'Formatting': 'Format',
            'Fill': 'Fill',
            'Border': 'Border',
            'Border Color': 'Border Color',
            'Thickness': 'Thickness',
            'Max Length': 'Max Length',
            'List Item': 'Item Name',
            'Export Value': 'Item Value',
            'Dropdown Item List': 'Dropdown Item List',
            'List Box Item List': 'List Box Item List',
            'General': 'GENERAL',
            'Appearance': 'APPEARANCE',
            'Options': 'OPTIONS',
            'Delete Item': 'Delete',
            'Up': 'Up',
            'Down': 'Down',
            'Multiline': 'Multiline',
            'Revised': 'Revised',
            'Reviewed': 'Reviewed',
            'Received': 'Received',
            'Confidential': 'Confidential',
            'Approved': 'Approved',
            'Not Approved': 'Not Approved',
            'Witness': 'Witness',
            'Initial Here': 'Initial Here',
            'Draft': 'Draft',
            'Final': 'Final',
            'For Public Release': 'For Public Release',
            'Not For Public Release': 'Not For Public Release',
            'For Comment': 'For Comment',
            'Void': 'Void',
            'Preliminary Results': 'Preliminary Results',
            'Information Only': 'Information Only',
            'in': 'in',
            'm': 'm',
            'ft_in': 'ft_in',
            'ft': 'ft',
            'p': 'p',
            'cm': 'cm',
            'mm': 'mm',
            'pt': 'pt',
            'cu': 'cu',
            'sq': 'sq',
            'Initial': 'Initial'
        };
        _this.viewerBase = new PdfViewerBase(_this);
        _this.drawing = new Drawing(_this);
        return _this;
    }
    Object.defineProperty(PdfViewer.prototype, "zoomPercentage", {
        /**
         * Returns the current zoom percentage of the PdfViewer control.
         *
         * @asptype int
         * @blazorType int
         */
        get: function () {
            return this.magnificationModule.zoomFactor * 100;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewer.prototype, "bookmark", {
        /**
         * Gets the bookmark view object of the pdf viewer.
         *
         * @asptype BookmarkView
         * @blazorType BookmarkView
         * @returns { BookmarkView }
         */
        get: function () {
            return this.bookmarkViewModule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewer.prototype, "print", {
        /**
         * Gets the print object of the pdf viewer.
         *
         * @asptype Print
         * @blazorType Print
         * @returns { Print }
         */
        get: function () {
            return this.printModule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewer.prototype, "magnification", {
        /**
         * Gets the magnification object of the pdf viewer.
         *
         * @asptype Magnification
         * @blazorType Magnification
         * @returns { Magnification }
         */
        get: function () {
            return this.magnificationModule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewer.prototype, "navigation", {
        /**
         * Gets the navigation object of the pdf viewer.
         *
         * @asptype Navigation
         * @blazorType Navigation
         * @returns { Navigation }
         */
        get: function () {
            return this.navigationModule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewer.prototype, "textSearch", {
        /**
         * Gets the text search object of the pdf viewer.
         *
         * @asptype TextSearch
         * @blazorType TextSearch
         * @returns { TextSearch }
         */
        get: function () {
            return this.textSearchModule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewer.prototype, "toolbar", {
        /**
         * Gets the toolbar object of the pdf viewer.
         *
         * @asptype Toolbar
         * @blazorType Toolbar
         * @returns { Toolbar }
         */
        get: function () {
            return this.toolbarModule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewer.prototype, "thumbnailView", {
        /**
         * Gets the thumbnail-view object of the pdf viewer.
         *
         * @asptype ThumbnailView
         * @blazorType ThumbnailView
         * @returns { ThumbnailView }
         */
        get: function () {
            return this.thumbnailViewModule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewer.prototype, "annotation", {
        /**
         * Gets the annotation object of the pdf viewer.
         *
         * @asptype Annotation
         * @blazorType Annotation
         * @returns { Annotation }
         */
        get: function () {
            return this.annotationModule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewer.prototype, "formDesigner", {
        /**
         * Gets the FormDesigner object of the pdf viewer.
         *
         * @asptype FormDesigner
         * @blazorType FormDesigner
         * @returns { FormDesigner }
         */
        get: function () {
            return this.formDesignerModule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewer.prototype, "textSelection", {
        /**
         * Gets the TextSelection object of the pdf viewer.
         *
         * @asptype TextSelection
         * @blazorType TextSelection
         * @returns { TextSelection }
         */
        get: function () {
            return this.textSelectionModule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewer.prototype, "accessibilityTags", {
        /**
         * Gets the Accessibility Tags object of the pdf viewer.
         *
         * @asptype AccessibilityTags
         * @blazorType AccessibilityTags
         * @returns { AccessibilityTags }
         */
        get: function () {
            return this.accessibilityTagsModule;
        },
        enumerable: true,
        configurable: true
    });
    PdfViewer.prototype.preRender = function () {
        this.localeObj = new L10n(this.getModuleName(), this.defaultLocale, this.locale);
        if (!isNullOrUndefined(this.element) && this.element.id == "") {
            //Set unique id, if id is empty
            this.element.id = this.getUniqueElementId();
        }
        if (Browser.isDevice) {
            //EJ2-63562 - Reduced the touchPadding of mobile devices to 16 to improve selection of fields without affecting resizing ability.
            this.touchPadding = 16;
        }
    };
    PdfViewer.prototype.getUniqueElementId = function () {
        return 'pdfViewer_' + Date.now().toString(36) + Math.random().toString(36).substring(2);
    };
    PdfViewer.prototype.render = function () {
        this.viewerBase.initializeComponent();
        if (!this.enableFormFields) {
            this.formFieldsModule = new FormFields(this, this.viewerBase);
            this.formFieldsModule.formFieldsReadOnly(this.enableFormFields);
        }
        if (this.enableTextSelection && this.textSelectionModule) {
            this.textSelectionModule.enableTextSelectionMode();
        }
        else {
            this.viewerBase.disableTextSelectionMode();
        }
        this.drawing.renderLabels(this);
        this.renderComplete();
    };
    PdfViewer.prototype.getModuleName = function () {
        return 'PdfViewer';
    };
    /**
     * @private
     */
    PdfViewer.prototype.getLocaleConstants = function () {
        return this.defaultLocale;
    };
    /**
     * To modify the Json Data in ajax request.
     *
     * @param jsonData
     * @returns void
     */
    // eslint-disable-next-line
    PdfViewer.prototype.setJsonData = function (jsonData) {
        this.viewerBase.ajaxData = jsonData;
    };
    PdfViewer.prototype.onPropertyChanged = function (newProp, oldProp) {
        var requireRefresh = false;
        if (this.isDestroyed) {
            return;
        }
        var properties = Object.keys(newProp);
        for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
            var prop = properties_1[_i];
            switch (prop) {
                case 'locale':
                    if (this.viewerBase.loadedData) {
                        // eslint-disable-next-line
                        var data = null;
                        if (this.formFieldsModule) {
                            data = this.viewerBase.getItemFromSessionStorage('_formfields');
                        }
                        if (data) {
                            this.viewerBase.formfieldvalue = JSON.parse(data);
                            // eslint-disable-next-line
                            var annotCollection = this.annotationCollection;
                            var filename = this.viewerBase.jsonDocumentId;
                            _super.prototype.refresh.call(this);
                            this.load(this.viewerBase.loadedData, null);
                            this.addAnnotation(annotCollection);
                            this.viewerBase.loadedData = null;
                            this.downloadFileName = filename;
                            this.fileName = filename;
                        }
                    }
                    break;
                case 'toolbarSettings':
                    if (!Browser.isDevice || this.enableDesktopMode) {
                        this.toolbar.applyToolbarSettings();
                        this.toolbar.annotationToolbarModule.applyAnnotationToolbarSettings();
                        this.toolbar.formDesignerToolbarModule.applyFormDesignerToolbarSettings();
                    }
                    else {
                        this.toolbar.applyToolbarSettingsForMobile();
                        this.toolbar.annotationToolbarModule.applyMobileAnnotationToolbarSettings();
                    }
                    break;
                case 'enableToolbar':
                    this.notify('', { module: 'toolbar', enable: this.enableToolbar });
                    requireRefresh = true;
                    break;
                case 'enableCommentPanel':
                    this.notify('', { module: 'annotation', enable: this.enableCommentPanel });
                    requireRefresh = true;
                    if (this.toolbarModule && this.toolbarModule.annotationToolbarModule) {
                        this.toolbarModule.annotationToolbarModule.enableCommentPanelTool(this.enableCommentPanel);
                    }
                    if (!this.enableCommentPanel) {
                        if (this.viewerBase.navigationPane) {
                            this.viewerBase.navigationPane.closeCommentPanelContainer();
                        }
                    }
                    break;
                case 'documentPath':
                    if (!isBlazor()) {
                        this.load(newProp.documentPath, null);
                    }
                    else {
                        this._dotnetInstance.invokeMethodAsync('LoadDocumentFromClient', newProp.documentPath);
                    }
                    break;
                case 'interactionMode':
                    this.interactionMode = newProp.interactionMode;
                    if (newProp.interactionMode === 'Pan') {
                        this.viewerBase.initiatePanning();
                        if (this.toolbar) {
                            this.toolbar.updateInteractionTools(false);
                        }
                    }
                    else if (newProp.interactionMode === 'TextSelection') {
                        this.viewerBase.initiateTextSelectMode();
                        if (this.toolbar) {
                            this.toolbar.updateInteractionTools(true);
                        }
                    }
                    break;
                case 'height':
                    this.height = newProp.height;
                    this.viewerBase.updateHeight();
                    this.viewerBase.onWindowResize();
                    if (this.toolbar && this.toolbar.annotationToolbarModule) {
                        if (this.toolbar.annotationToolbarModule.isToolbarHidden) {
                            this.toolbar.annotationToolbarModule.adjustViewer(false);
                        }
                        else {
                            this.toolbar.annotationToolbarModule.adjustViewer(true);
                        }
                    }
                    break;
                case 'width':
                    this.width = newProp.width;
                    this.viewerBase.updateWidth();
                    this.viewerBase.onWindowResize();
                    break;
                case 'customStamp':
                    this.renderCustomerStamp(this.customStamp[0]);
                    break;
                case 'customStampSettings':
                    if (newProp.customStampSettings.customStamps) {
                        this.renderCustomerStamp(this.customStampSettings.customStamps[0]);
                    }
                    break;
                case 'enableFormFields':
                    if (this.enableFormFields && this.formFieldsModule) {
                        for (var m = 0; m < this.pageCount; m++) {
                            this.formFieldsModule.renderFormFields(m, false);
                        }
                    }
                    else {
                        this.formFieldsModule = new FormFields(this, this.viewerBase);
                        this.formFieldsModule.formFieldsReadOnly(this.enableFormFields);
                    }
                    break;
                case 'designerMode':
                    if (this.designerMode) {
                        this.formDesignerModule.setMode('designer');
                    }
                    else {
                        this.formDesignerModule.setMode('edit');
                    }
                    break;
                case 'highlightSettings':
                case 'underlineSettings':
                case 'strikethroughSettings':
                    if (this.annotationModule && this.annotationModule.textMarkupAnnotationModule) {
                        this.annotationModule.textMarkupAnnotationModule.updateTextMarkupSettings(prop);
                    }
                    break;
                case 'signatureFieldSettings':
                case 'initialFieldSettings':
                    if (this.formDesignerModule) {
                        var isInitialField = (prop === "initialFieldSettings");
                        this.formDesignerModule.updateSignatureSettings(newProp[prop], isInitialField);
                    }
                    break;
                case 'textFieldSettings':
                    if (this.formDesignerModule) {
                        this.formDesignerModule.updateTextFieldSettings(newProp[prop]);
                    }
                    break;
                case 'passwordFieldSettings':
                    if (this.formDesignerModule) {
                        this.formDesignerModule.updatePasswordFieldSettings(newProp[prop]);
                    }
                    break;
                case 'checkBoxFieldSettings':
                    if (this.formDesignerModule) {
                        this.formDesignerModule.updateCheckBoxFieldSettings(newProp[prop]);
                    }
                    break;
                case 'radioButtonFieldSettings':
                    if (this.formDesignerModule) {
                        this.formDesignerModule.updateRadioButtonFieldSettings(newProp[prop]);
                    }
                    break;
                case 'DropdownFieldSettings':
                    if (this.formDesignerModule) {
                        this.formDesignerModule.updateDropDownFieldSettings(newProp[prop]);
                    }
                    break;
                case 'listBoxFieldSettings':
                    if (this.formDesignerModule) {
                        this.formDesignerModule.updateListBoxFieldSettings(newProp[prop]);
                    }
                    break;
                case 'isFormDesignerToolbarVisible':
                    if (!Browser.isDevice || this.enableDesktopMode) {
                        if (this.toolbarModule && this.formDesignerModule && !oldProp.isFormDesignerToolbarVisible && newProp.isFormDesignerToolbarVisible) {
                            if (this.toolbarModule.annotationToolbarModule && this.isAnnotationToolbarVisible) {
                                this.isAnnotationToolbarVisible = false;
                                this.toolbarModule.annotationToolbarModule.showAnnotationToolbar();
                            }
                            this.toolbarModule.formDesignerToolbarModule.resetFormDesignerToolbar();
                        }
                        else {
                            if (!isNullOrUndefined(this.toolbarModule) && !isNullOrUndefined(this.formDesignerModule) && this.toolbarModule.formDesignerToolbarModule && !this.isFormDesignerToolbarVisible) {
                                this.isFormDesignerToolbarVisible = false;
                                this.formDesignerModule.setMode('edit');
                                this.toolbarModule.formDesignerToolbarModule.resetFormDesignerToolbar();
                            }
                        }
                    }
                    break;
                case 'isAnnotationToolbarVisible':
                    if (!Browser.isDevice || this.enableDesktopMode) {
                        if (this.toolbarModule && this.annotationModule && !oldProp.isAnnotationToolbarVisible && newProp.isAnnotationToolbarVisible) {
                            if (this.toolbarModule.formDesignerToolbarModule && this.isFormDesignerToolbarVisible) {
                                this.isFormDesignerToolbarVisible = false;
                                this.toolbarModule.formDesignerToolbarModule.showFormDesignerToolbar();
                            }
                            this.toolbarModule.annotationToolbarModule.resetToolbar();
                        }
                    }
                    break;
            }
        }
    };
    // eslint-disable-next-line
    PdfViewer.prototype.renderCustomerStamp = function (customStamp) {
        this.annotation.stampAnnotationModule.isStampAddMode = true;
        this.annotationModule.stampAnnotationModule.isStampAnnotSelected = true;
        this.viewerBase.stampAdded = true;
        this.viewerBase.isAlreadyAdded = false;
        // eslint-disable-next-line max-len
        this.annotation.stampAnnotationModule.createCustomStampAnnotation(customStamp.customStampImageSource, customStamp.customStampName);
    };
    PdfViewer.prototype.getPersistData = function () {
        return 'PdfViewer';
    };
    PdfViewer.prototype.requiredModules = function () {
        var modules = [];
        if (this.enableMagnification) {
            modules.push({
                member: 'Magnification', args: [this, this.viewerBase]
            });
        }
        if (this.enableNavigation) {
            modules.push({
                member: 'Navigation', args: [this, this.viewerBase]
            });
        }
        if (this.enableToolbar || this.enableNavigationToolbar || this.enableAnnotationToolbar || this.enableFormDesignerToolbar) {
            modules.push({
                member: 'Toolbar', args: [this, this.viewerBase]
            });
        }
        if (this.enableHyperlink) {
            modules.push({
                member: 'LinkAnnotation', args: [this, this.viewerBase]
            });
        }
        if (this.enableThumbnail) {
            modules.push({
                member: 'ThumbnailView', args: [this, this.viewerBase]
            });
        }
        if (this.enableBookmark) {
            modules.push({
                member: 'BookmarkView', args: [this, this.viewerBase]
            });
        }
        if (this.enableTextSelection) {
            modules.push({
                member: 'TextSelection', args: [this, this.viewerBase]
            });
        }
        if (this.enableTextSearch) {
            modules.push({
                member: 'TextSearch', args: [this, this.viewerBase]
            });
        }
        if (this.enablePrint) {
            modules.push({
                member: 'Print', args: [this, this.viewerBase]
            });
        }
        if (this.enableAnnotation) {
            modules.push({
                member: 'Annotation', args: [this, this.viewerBase]
            });
        }
        if (this.enableFormFields) {
            modules.push({
                member: 'FormFields', args: [this, this.viewerBase]
            });
        }
        if (this.enableFormDesigner && !isBlazor()) {
            modules.push({
                member: 'FormDesigner', args: [this, this.viewerBase]
            });
        }
        modules.push({
            member: 'AccessibilityTags', args: [this, this.viewerBase]
        });
        return modules;
    };
    /**
     * Loads the given PDF document in the PDF viewer control
     *
     * @param  {string} document - Specifies the document name for load
     * @param  {string} password - Specifies the Given document password
     * @returns void
     */
    PdfViewer.prototype.load = function (document, password) {
        if (this.pageCount !== 0) {
            this.viewerBase.clear(true);
        }
        else {
            this.viewerBase.clear(false);
        }
        this.pageCount = 0;
        this.currentPageNumber = 0;
        if (!isBlazor()) {
            if (this.toolbarModule) {
                this.toolbarModule.resetToolbar();
            }
        }
        else {
            this.viewerBase.blazorUIAdaptor.resetToolbar();
        }
        this.viewerBase.initiatePageRender(document, password);
    };
    /**
     * Loads the given PDF document in the PDF viewer control
     * @private
     */
    PdfViewer.prototype.loadDocument = function (documentId, isFileName, fileName) {
        if (this.pageCount !== 0) {
            this.viewerBase.clear(true);
        }
        else {
            this.viewerBase.clear(false);
        }
        this.pageCount = 0;
        this.currentPageNumber = 0;
        this.viewerBase.blazorUIAdaptor.resetToolbar();
        this.fileName = fileName;
        this.viewerBase.initiateLoadDocument(documentId, isFileName, fileName);
    };
    /**
     * Loads the PDF document with the document details in the PDF viewer control
    * @private
    */
    PdfViewer.prototype.loadSuccess = function (documentDetails, password) {
        this.viewerBase.loadSuccess(documentDetails, password);
    };
    /**
     * Set the focus of the given element
    * @private
    */
    PdfViewer.prototype.focusElement = function (elementId) {
        var element = document.getElementById(elementId);
        if (element != null) {
            element.focus();
        }
    };
    /**
     * Downloads the PDF document being loaded in the ejPdfViewer control.
     *
     * @returns void
     */
    PdfViewer.prototype.download = function () {
        if (this.enableDownload) {
            this.viewerBase.download();
        }
    };
    /**
     * Saves the PDF document being loaded in the PDF Viewer control as blob.
     *
     * @returns Promise<Blob>
     */
    PdfViewer.prototype.saveAsBlob = function () {
        var _this = this;
        if (this.enableDownload) {
            return new Promise(function (resolve, reject) {
                resolve(_this.viewerBase.saveAsBlob());
            });
        }
        else {
            return null;
        }
    };
    /**
     * updates the PDF Viewer container width and height from externally.
     *
     * @returns void
     */
    PdfViewer.prototype.updateViewerContainer = function () {
        this.viewerBase.updateViewerContainer();
    };
    /**
     * Specifies the message to be displayed  in the popup.
     *
     * @param errorString
     * @returns void
     */
    PdfViewer.prototype.showNotificationPopup = function (errorString) {
        this.viewerBase.showNotificationPopup(errorString);
    };
    /**
     * Focus a form field in a document by its field name or the field object.
     *
     * @param field
     * @returns void
     */
    PdfViewer.prototype.focusFormField = function (field) {
        var _this = this;
        if (typeof (field) === "string") {
            var fieldCollections = this.retrieveFormFields();
            for (var i = 0; i < fieldCollections.length; i++) {
                if (fieldCollections[i].name === field) {
                    field = fieldCollections[i];
                }
            }
        }
        if (field) {
            this.viewerBase.isFocusField = true;
            this.viewerBase.focusField = field;
            if (this.formDesignerModule) {
                this.navigationModule.goToPage(field.pageIndex + 1);
            }
            else {
                var pageIndex = parseFloat(field.id.split('_')[1]);
                this.navigationModule.goToPage(pageIndex + 1);
            }
            setTimeout(function () {
                var currentField = document.getElementById(field.id);
                if (_this.formDesignerModule && field.type === "Checkbox") {
                    currentField = document.getElementById(field.id + "_input");
                }
                if (currentField) {
                    if (_this.formDesignerModule && (field.type === "SignatureField" || field.type === "InitialField")) {
                        currentField.parentElement.focus();
                    }
                    else {
                        currentField.focus();
                        _this.viewerBase.isFocusField = false;
                        _this.viewerBase.focusField = [];
                    }
                }
            }, 100);
        }
    };
    /**
     * Update the form field values from externally.
     *
     * @param fieldValue
     * @returns void
     */
    // eslint-disable-next-line
    PdfViewer.prototype.updateFormFieldsValue = function (fieldValue) {
        // eslint-disable-next-line
        var target = document.getElementById(fieldValue.id);
        var isformDesignerModuleListBox = false;
        if (target) {
            target = target ? target : document.getElementById(fieldValue.id + '_content_html_element').children[0].children[0];
            if (target && fieldValue.type === 'Textbox' || fieldValue.type === 'Password' || fieldValue.type === 'PasswordField') {
                target.value = fieldValue.value;
            }
            else if (fieldValue.type === 'Checkbox' || fieldValue.type === 'RadioButton' || fieldValue.type === 'CheckBox') {
                if (fieldValue.type === 'CheckBox') {
                    target.style.appearance = 'auto';
                }
                if (this.formDesignerModule) {
                    if (fieldValue.type === 'RadioButton') {
                        var radioButtonOption = { isSelected: fieldValue.isSelected };
                        this.formDesignerModule.updateFormField(fieldValue, radioButtonOption);
                    }
                    else {
                        var checkBoxOption = { isChecked: fieldValue.isChecked };
                        this.formDesignerModule.updateFormField(fieldValue, checkBoxOption);
                    }
                }
                else {
                    if (fieldValue.type === 'RadioButton') {
                        target.selected = fieldValue.isSelected;
                    }
                    else {
                        target.checked = fieldValue.isChecked;
                    }
                }
            }
            else if (fieldValue.type === 'DropDown' || fieldValue.type === 'ListBox' || fieldValue.type === 'DropdownList') {
                if (this.formDesignerModule) {
                    isformDesignerModuleListBox = true;
                    var dropDownListOption = { options: fieldValue.value };
                    this.formDesignerModule.updateFormField(fieldValue, dropDownListOption);
                }
                else {
                    target.value = fieldValue.value;
                }
            }
            if (fieldValue.type === 'SignatureField' || fieldValue.type === 'InitialField') {
                if (fieldValue.signatureType || fieldValue.initialType) {
                    if (typeof fieldValue.signatureType === 'string') {
                        fieldValue.signatureType = fieldValue.signatureType;
                    }
                    else {
                        fieldValue.signatureType = fieldValue.initialType;
                    }
                }
                fieldValue.fontName = fieldValue.fontName ? fieldValue.fontName : fieldValue.fontFamily;
                var currentValue = fieldValue.value;
                var signatureField = this.getFormFieldByID(fieldValue.id);
                var isSameValue = this.formDesignerModule ? signatureField.value === fieldValue.value : signatureField.Value === fieldValue.value;
                if (target.classList.contains('e-pdfviewer-signatureformfields-signature') && !isSameValue) {
                    if (this.formDesignerModule)
                        this.annotation.deleteAnnotationById(fieldValue.id.split('_')[0] + '_content');
                    else
                        this.annotation.deleteAnnotationById(fieldValue.id);
                }
                if (!fieldValue.signatureType || !fieldValue.value) {
                    fieldValue.value = currentValue;
                    if (this.viewerBase.isSignaturePathData(fieldValue.value)) {
                        fieldValue.signatureType = 'Path';
                    }
                    else if (this.viewerBase.isSignatureImageData(fieldValue.value)) {
                        fieldValue.signatureType = 'Image';
                    }
                    else {
                        fieldValue.signatureType = 'Type';
                    }
                }
                if (!isSameValue)
                    this.formFieldsModule.drawSignature(fieldValue.signatureType, fieldValue.value, target, fieldValue.fontName);
            }
            else {
                if (!isformDesignerModuleListBox) {
                    this.formFieldsModule.updateDataInSession(target);
                }
            }
        }
        else {
            var data = this.viewerBase.getItemFromSessionStorage('_formfields');
            if (data) {
                var FormFieldsData = JSON.parse(data);
                var _loop_1 = function () {
                    var currentData = FormFieldsData[m];
                    var fieldName;
                    if (fieldValue.type === 'Checkbox' || fieldValue.type === 'RadioButton' || fieldValue.type === 'CheckBox') {
                        fieldName = currentData.GroupName;
                    }
                    else if (fieldValue.type === 'DropDown' || fieldValue.type === 'ListBox' || fieldValue.type === 'DropdownList') {
                        fieldName = currentData.Text;
                    }
                    else {
                        fieldName = currentData.FieldName;
                    }
                    //map the signature field and its data object to find the signature field name.
                    var fieldData = FormFieldsData.filter(function (item) { return item.FieldName === currentData.FieldName.split('_')[0]; });
                    if (!isNullOrUndefined(fieldData) && !isNullOrUndefined(fieldData[0])) {
                        if (fieldData[0].Name === "SignatureField" || fieldData[0].Name === "InitialField") {
                            fieldName = currentData.FieldName.split('_')[0];
                            currentData.LineBounds = FormFieldsData.filter(function (item) { return item.FieldName === fieldName; })[0].LineBounds;
                        }
                    }
                    if (fieldName === fieldValue.name) {
                        if (fieldValue.type === 'Textbox' || fieldValue.type === 'Password' || fieldValue.type === 'PasswordField') {
                            if (fieldValue.value) {
                                currentData.Text = fieldValue.value;
                                currentData.Value = fieldValue.value;
                            }
                        }
                        else if (fieldValue.type === 'Checkbox' || fieldValue.type === 'RadioButton' || fieldValue.type === 'CheckBox') {
                            fieldValue.isSelected || fieldValue.isChecked ? currentData.Selected = true : currentData.Selected = false;
                        }
                        else if (fieldValue.type === 'DropDown' || fieldValue.type === 'ListBox' || fieldValue.type === 'DropdownList') {
                            currentData.SelectedValue = fieldValue.value;
                            var index = currentData.TextList ? currentData.TextList.indexOf(fieldValue.value) : 0;
                            currentData.selectedIndex = index > -1 ? index : 0;
                            fieldValue.type === 'ListBox' ? currentData.SelectedListed = [currentData.selectedIndex] : [];
                        }
                        else if (fieldValue.type === 'SignatureField' || fieldValue.type === 'InitialField') {
                            if (fieldValue.value) {
                                currentData.Value = fieldValue.value;
                                currentData = this_1.updateSignatureValue(currentData, fieldValue);
                            }
                        }
                        this_1.formFieldsModule.updateFormFieldsCollection(currentData);
                    }
                };
                var this_1 = this;
                for (var m = 0; m < FormFieldsData.length; m++) {
                    _loop_1();
                }
            }
            window.sessionStorage.removeItem(this.viewerBase.documentId + '_formfields');
            this.viewerBase.setItemInSessionStorage(FormFieldsData, '_formfields');
        }
    };
    // eslint-disable-next-line
    PdfViewer.prototype.getFormFieldByID = function (id) {
        if (this.formDesignerModule) {
            return this.nameTable[id.split('_')[0]];
        }
        var data = window.sessionStorage.getItem(this.viewerBase.documentId + '_formfields');
        var formFieldsData = JSON.parse(data);
        return formFieldsData[formFieldsData.findIndex(function (el) { return el.uniqueID === id; })];
    };
    /**
     * @param number
     */
    // eslint-disable-next-line
    PdfViewer.prototype.ConvertPointToPixel = function (number) {
        return (number * (96 / 72));
    };
    /**
     * @param currentData - Current form field data.
     * @param fieldValue - Form Field.
     * @returns - Returns the updated the current Data.
     */
    // eslint-disable-next-line
    PdfViewer.prototype.updateSignatureValue = function (currentData, fieldValue) {
        if (!fieldValue.signatureType) {
            fieldValue.signatureType = this.viewerBase.isSignatureImageData(fieldValue.value) ? 'Image' : (this.viewerBase.isSignaturePathData(fieldValue.value) ? 'Path' : 'Type');
        }
        var bound = currentData.LineBounds;
        var left = this.ConvertPointToPixel(bound.X);
        var top = this.ConvertPointToPixel(bound.Y);
        var width = this.ConvertPointToPixel(bound.Width);
        var height = this.ConvertPointToPixel(bound.Height);
        var bounds;
        if (fieldValue.signatureType === 'Type') {
            if (!currentData.FontFamily) {
                currentData.FontFamily = 'Helvetica';
            }
            // eslint-disable-next-line
            bounds = this.formFieldsModule.getSignBounds(currentData.pageIndex, currentData.RotationAngle, currentData.pageIndex, this.viewerBase.getZoomFactor(), left, top, width, height);
            if (this.signatureFitMode === 'Default') {
                bounds = this.formFieldsModule.getDefaultBoundsforSign(bounds);
            }
            currentData.Bounds = bounds;
            var fontSize = bounds.height / 1.35;
            var textWidth = this.formFieldsModule.getTextWidth(currentData.value, fontSize, currentData.FontFamily);
            var widthRatio = 1;
            if (textWidth > bounds.width)
                widthRatio = bounds.width / textWidth;
            currentData.FontSize = this.formFieldsModule.getFontSize(Math.floor((fontSize * widthRatio)));
        }
        else if (fieldValue.signatureType === 'Image') {
            // eslint-disable-next-line
            bounds = this.formFieldsModule.getSignBounds(currentData.pageIndex, currentData.RotationAngle, currentData.pageIndex, this.viewerBase.getZoomFactor(), left, top, width, height);
            var image_1 = new Image();
            image_1.src = currentData.Value;
            var proxy_1 = this;
            image_1.onload = function () {
                proxy_1.imageOnLoad(bounds, image_1, currentData);
            };
        }
        else {
            if ((currentData.Value.indexOf('base64')) !== -1) {
                // eslint-disable-next-line
                bounds = this.formFieldsModule.getSignBounds(currentData.pageIndex, currentData.RotationAngle, currentData.pageIndex, this.viewerBase.getZoomFactor(), left, top, width, height);
                if (this.signatureFitMode === 'Default') {
                    bounds = this.formFieldsModule.getDefaultBoundsforSign(bounds);
                }
            }
            else {
                if (this.signatureFitMode === 'Default') {
                    // eslint-disable-next-line
                    var signBounds = this.formFieldsModule.updateSignatureAspectRatio(currentData.Value, false, null, currentData);
                    // eslint-disable-next-line
                    bounds = this.formFieldsModule.getSignBounds(currentData.pageIndex, currentData.RotationAngle, currentData.pageIndex, this.viewerBase.getZoomFactor(), left, top, signBounds.width, signBounds.height, true);
                    bounds.x = bounds.x + signBounds.left;
                    bounds.y = bounds.y + signBounds.top;
                }
                else {
                    bounds = this.formFieldsModule.getSignBounds(currentData.pageIndex, currentData.RotationAngle, currentData.pageIndex, this.viewerBase.getZoomFactor(), left, top, width, height);
                }
            }
            currentData.Bounds = bounds;
        }
        return currentData;
    };
    PdfViewer.prototype.imageOnLoad = function (bounds, image, currentData) {
        if (this.signatureFitMode === 'Default') {
            var padding = Math.min(bounds.height / this.paddingDifferenceValue, bounds.width / this.paddingDifferenceValue);
            var maxHeight = bounds.height - padding;
            var maxWidth = bounds.width - padding;
            var imageWidth = image.width;
            var imageHeight = image.height;
            var beforeWidth = bounds.width;
            var beforeHeight = bounds.height;
            var ratio = Math.min(maxWidth / imageWidth, maxHeight / imageHeight);
            bounds.width = imageWidth * ratio;
            bounds.height = imageHeight * ratio;
            bounds.x = bounds.x + (beforeWidth - bounds.width) / 2;
            bounds.y = bounds.y + (beforeHeight - bounds.height) / 2;
            var data = this.viewerBase.getItemFromSessionStorage('_formfields');
            if (data) {
                var FormFieldsData = JSON.parse(data);
                for (var i = 0; i < FormFieldsData.length; i++) {
                    if (FormFieldsData[i].FieldName == currentData.FieldName) {
                        FormFieldsData[i].Bounds = bounds;
                        this.formFieldsModule.updateFormFieldsCollection(FormFieldsData[i]);
                    }
                }
                window.sessionStorage.removeItem(this.viewerBase.documentId + '_formfields');
                this.viewerBase.setItemInSessionStorage(FormFieldsData, '_formfields');
            }
        }
    };
    /**
     * Perform undo action for the edited annotations
     *
     * @returns void
     */
    PdfViewer.prototype.undo = function () {
        if (this.annotationModule) {
            this.annotationModule.undo();
        }
    };
    /**
     * Perform redo action for the edited annotations
     *
     * @returns void
     */
    PdfViewer.prototype.redo = function () {
        if (this.annotationModule) {
            this.annotationModule.redo();
        }
    };
    /**
     * Unloads the PDF document being displayed in the PDF viewer.
     *
     * @returns void
     */
    PdfViewer.prototype.unload = function () {
        this.viewerBase.clear(true);
        this.pageCount = 0;
        if (!isBlazor()) {
            if (this.toolbarModule) {
                this.viewerBase.pageCount = 0;
                this.toolbarModule.resetToolbar();
            }
        }
        else {
            this.viewerBase.blazorUIAdaptor.resetToolbar();
        }
        this.magnificationModule.zoomTo(100);
    };
    /**
     * Destroys all managed resources used by this object.
     *
     * @returns void
     */
    PdfViewer.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        if (!isNullOrUndefined(this.element)) {
            if (!this.refreshing) {
                this.element.classList.remove('e-pdfviewer');
            }
            this.element.innerHTML = '';
        }
        if (this.viewerBase.navigationPane) {
            this.viewerBase.navigationPane.restrictUpdateZoomValue = false;
        }
        this.viewerBase.destroy();
        if (this.viewerBase.navigationPane) {
            this.viewerBase.navigationPane.restrictUpdateZoomValue = true;
        }
    };
    // eslint-disable-next-line
    /**
     * Perform imports annotations action in the PDF Viewer
     * @param  {any} importData - Specifies the data for annotation imports
     * @returns void
     */
    // eslint-disable-next-line
    PdfViewer.prototype.importAnnotation = function (importData, annotationDataFormat) {
        if (this.annotationModule) {
            if (typeof (importData) === 'string') {
                var isXfdfFile = ((importData.indexOf('.xfdf') > -1) || (annotationDataFormat.indexOf('Xfdf') > -1)) ? true : false;
                if (annotationDataFormat) {
                    if (importData.indexOf('</xfdf>') > -1) {
                        this.viewerBase.importAnnotations(importData, annotationDataFormat, false);
                    }
                    else {
                        if (annotationDataFormat == 'Json') {
                            if (importData.includes('pdfAnnotation')) {
                                this.importAnnotationsAsJson(importData);
                            }
                            else if (importData.split('.')[1] === 'json') {
                                this.viewerBase.isPDFViewerJson = true;
                                this.viewerBase.importAnnotations(importData, annotationDataFormat, isXfdfFile);
                            }
                            else {
                                var newImportData = importData.split(',')[1] ? importData.split(',')[1] : importData.split(',')[0];
                                importData = decodeURIComponent(escape(atob(newImportData)));
                                this.importAnnotationsAsJson(importData);
                            }
                        }
                        else {
                            this.viewerBase.importAnnotations(importData, annotationDataFormat, isXfdfFile);
                        }
                    }
                }
                else {
                    if (importData.split('.')[1] === 'json') {
                        if (importData.includes('pdfAnnotation')) {
                            this.importAnnotationsAsJson(importData);
                        }
                        else {
                            var newImportData = importData.split(',')[1] ? importData.split(',')[1] : importData.split(',')[0];
                            importData = decodeURIComponent(escape(atob(newImportData)));
                            this.importAnnotationsAsJson(importData);
                        }
                    }
                    else {
                        this.viewerBase.importAnnotations(importData, AnnotationDataFormat.Xfdf, isXfdfFile);
                    }
                }
            }
            else {
                var imporedAnnotation = importData.pdfAnnotation;
                if (typeof (importData) === 'object' && !isNullOrUndefined(imporedAnnotation) && !isNullOrUndefined(Object.keys(imporedAnnotation)) && !isNullOrUndefined(Object.keys(imporedAnnotation)[0]) && Object.keys(imporedAnnotation[Object.keys(imporedAnnotation)[0]]).length > 1) {
                    this.viewerBase.importAnnotations(importData);
                }
                else {
                    importData = JSON.stringify(importData);
                    this.viewerBase.isPDFViewerJson = false;
                    this.viewerBase.importAnnotations(btoa(importData), AnnotationDataFormat.Json);
                }
            }
        }
    };
    // eslint-disable-next-line
    PdfViewer.prototype.importAnnotationsAsJson = function (importData) {
        var jsonData = JSON.parse(importData);
        var firstAnnotation = jsonData.pdfAnnotation[Object.keys(jsonData.pdfAnnotation)[0]];
        if ((Object.keys(jsonData.pdfAnnotation).length >= 1) && (firstAnnotation.textMarkupAnnotation || firstAnnotation.measureShapeAnnotation || firstAnnotation.freeTextAnnotation || firstAnnotation.stampAnnotations || firstAnnotation.signatureInkAnnotation || (firstAnnotation.shapeAnnotation && firstAnnotation.shapeAnnotation[0].Bounds))) {
            this.viewerBase.isPDFViewerJson = true;
            this.viewerBase.importAnnotations(jsonData, AnnotationDataFormat.Json);
        }
        else {
            this.viewerBase.isPDFViewerJson = false;
            this.viewerBase.importAnnotations(btoa(importData), AnnotationDataFormat.Json);
        }
    };
    /**
     * Perform export annotations action in the PDF Viewer
     *
     * @param annotationDataFormat
     * @returns void
     */
    PdfViewer.prototype.exportAnnotation = function (annotationDataFormat) {
        if (this.annotationModule) {
            if (annotationDataFormat && annotationDataFormat === 'Xfdf') {
                this.viewerBase.exportAnnotations(AnnotationDataFormat.Xfdf);
            }
            else {
                this.viewerBase.exportAnnotations(AnnotationDataFormat.Json);
            }
        }
    };
    /**
     * Perform export annotations action in the PDF Viewer
     *
     *@param {AnnotationDataFormat} annotationDataFormat - Export the annotation based on the format.
     
     * @returns Promise<object>
     */
    PdfViewer.prototype.exportAnnotationsAsObject = function (annotationDataFormat) {
        var _this = this;
        if (annotationDataFormat === void 0) { annotationDataFormat = AnnotationDataFormat.Json; }
        if (this.annotationModule) {
            return new Promise(function (resolve, reject) {
                _this.viewerBase.exportAnnotationsAsObject(annotationDataFormat).then(function (value) {
                    resolve(value);
                });
            });
        }
        else {
            return null;
        }
    };
    /**
     * Export annotations and returns a base64 string for both Json and XFDF formats
     *
     * @param {AnnotationDataFormat} annotationDataFormat
     * @returns Promise<string>
     */
    PdfViewer.prototype.exportAnnotationsAsBase64String = function (annotationDataFormat) {
        var _this = this;
        if (this.annotationModule) {
            return new Promise(function (resolve, reject) {
                _this.viewerBase.createRequestForExportAnnotations(false, annotationDataFormat, true).then(function (value) {
                    resolve(value);
                });
            });
        }
        else {
            return null;
        }
    };
    /**
     * Perform to add annotations in the PDF Viewer
     *
     * @param annotation
     * @returns void
     */
    // eslint-disable-next-line
    PdfViewer.prototype.addAnnotation = function (annotation) {
        if (this.viewerBase) {
            this.viewerBase.addAnnotation(annotation);
        }
    };
    // eslint-disable-next-line
    /**
     * Imports the form fields data into the current PDF document.
     *
     * @param {string} data - The path for importing the fields.
     * @param {FormFieldDataFormat} formFieldDataFormat
     * @returns void
     */
    // eslint-disable-next-line
    PdfViewer.prototype.importFormFields = function (data, formFieldDataFormat) {
        if (this.formFieldsModule) {
            if (isNullOrUndefined(formFieldDataFormat)) {
                formFieldDataFormat = FormFieldDataFormat.Json;
            }
            this.viewerBase.importFormFields(data, formFieldDataFormat);
        }
    };
    /**
     * Exports the form field data in the specified data format.
     *
     * @param {string} data - The path for exporting the fields.
     * @param {FormFieldDataFormat} formFieldDataFormat
     * @returns void
     */
    PdfViewer.prototype.exportFormFields = function (data, formFieldDataFormat) {
        if (this.formFieldsModule) {
            this.viewerBase.exportFormFields(data, formFieldDataFormat);
        }
    };
    /**
     * Returns an object which represents the form field data in the specified data format.
     *
     * @param {FormFieldDataFormat} formFieldDataFormat
     * @returns Promise<object>
     */
    PdfViewer.prototype.exportFormFieldsAsObject = function (formFieldDataFormat) {
        var _this = this;
        if (formFieldDataFormat === void 0) { formFieldDataFormat = FormFieldDataFormat.Json; }
        if (this.formFieldsModule) {
            return new Promise(function (resolve, reject) {
                _this.viewerBase.exportFormFieldsAsObject(formFieldDataFormat).then(function (value) {
                    resolve(value);
                });
            });
        }
        else {
            return null;
        }
    };
    /**
     * reset all form fields data
     *
     * @returns void
     */
    PdfViewer.prototype.resetFormFields = function () {
        this.formFieldsModule.resetFormFields();
    };
    /**
     * Clears data from the form fields.
     * Parameter - Specifies the form field object.
     *
     * @param formField
     * @returns void
     */
    // eslint-disable-next-line
    PdfViewer.prototype.clearFormFields = function (formField) {
        this.formFieldsModule.clearFormFields(formField);
    };
    /**
     * To delete the annotation Collections in the PDF Document.
     *
     * @returns void
     */
    PdfViewer.prototype.deleteAnnotations = function () {
        if (this.annotationModule) {
            this.viewerBase.deleteAnnotations();
        }
    };
    /**
     * To retrieve the form fields in the PDF Document.
     *
     * @returns void
     */
    PdfViewer.prototype.retrieveFormFields = function () {
        return this.formFieldCollections;
    };
    /**
     * To update the form fields in the PDF Document.
     *
     * @param formFields
     * @returns void
     */
    // eslint-disable-next-line
    PdfViewer.prototype.updateFormFields = function (formFields) {
        this.updateFormFieldsValue(formFields);
        this.formFieldsModule.updateFormFieldValues(formFields);
    };
    /**
     * @param JsonData
     * @private
     */
    // eslint-disable-next-line
    PdfViewer.prototype.fireAjaxRequestInitiate = function (JsonData) {
        var eventArgs = { name: 'ajaxRequestInitiate', JsonData: JsonData };
        this.trigger('ajaxRequestInitiate', eventArgs);
    };
    /**
     * @param value
     * @param fieldName
     * @param id
     * @private
     */
    // eslint-disable-next-line
    PdfViewer.prototype.fireButtonFieldClickEvent = function (value, fieldName, id) {
        var eventArgs = { name: 'buttonFieldClicked', buttonFieldValue: value, buttonFieldName: fieldName, id: id };
        this.trigger('buttonFieldClick', eventArgs);
    };
    /**
     * @param name
     * @param field
     * @param cancel
     * @param isLeftClick - becomes true on signature panel left click.
     * @private
     */
    PdfViewer.prototype.fireFormFieldClickEvent = function (name, field, cancel, isLeftClick) {
        return __awaiter(this, void 0, void 0, function () {
            var eventArgs, target, formFieldCollectionsValue, readOnly;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        eventArgs = { name: name, field: field, cancel: cancel };
                        if (!isBlazor()) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.triggerEvent('formFieldClick', eventArgs)];
                    case 1:
                        eventArgs = (_a.sent()) || eventArgs;
                        eventArgs.field.type = field.type;
                        return [3 /*break*/, 3];
                    case 2:
                        this.triggerEvent('formFieldClick', eventArgs);
                        _a.label = 3;
                    case 3:
                        if (field.type === 'SignatureField' || field.type === 'InitialField') {
                            if (field.type === 'InitialField')
                                this.viewerBase.isInitialField = true;
                            else
                                this.viewerBase.isInitialField = false;
                            target = document.getElementById(field.id);
                            if (target.style.visibility === "hidden") {
                                target.disabled = true;
                            }
                            target = target ? target : (document.getElementById(field.id + '_content_html_element') ? document.getElementById(field.id + '_content_html_element').children[0].children[0] : null);
                            formFieldCollectionsValue = this.formFieldCollections.filter(function (item) { return item.id === field.id; });
                            if (formFieldCollectionsValue) {
                                readOnly = formFieldCollectionsValue[0].isReadOnly;
                                if ((!readOnly) && !eventArgs.cancel && target && !target.disabled && target.classList.contains('e-pdfviewer-signatureformfields') && (isLeftClick || isNullOrUndefined(isLeftClick))) {
                                    this.viewerBase.signatureModule.showSignatureDialog(true);
                                }
                                else if (readOnly) {
                                    target.disabled = true;
                                }
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param name - Get the name of the event.
     * @param field - Event arguments for the form field add event.
     * @param pageIndex - Get the page number.
     * @private
     */
    // eslint-disable-next-line
    PdfViewer.prototype.fireFormFieldAddEvent = function (name, field, pageIndex) {
        var eventArgs = { name: name, field: field, pageIndex: pageIndex };
        this.viewerBase.isFormFieldSelect = false;
        this.trigger('formFieldAdd', eventArgs);
    };
    /**
     * @param name - Get the name of the event.
     * @param field - Event arguments for the form field remove event.
     * @param pageIndex - Get the page number.
     * @private
     */
    // eslint-disable-next-line
    PdfViewer.prototype.fireFormFieldRemoveEvent = function (name, field, pageIndex) {
        var eventArgs = { name: name, field: field, pageIndex: pageIndex };
        this.trigger('formFieldRemove', eventArgs);
    };
    /**
     * @param name - Returns the event name.
     * @param field - Returns the double-clicked form field object.
     * @param cancel - If TRUE, property panel of the form field does not open. FALSE by default.
     * @private
     */
    // eslint-disable-next-line
    PdfViewer.prototype.fireFormFieldDoubleClickEvent = function (eventArgs) {
        this.trigger('formFieldDoubleClick', eventArgs);
        return eventArgs;
    };
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
    // eslint-disable-next-line
    PdfViewer.prototype.fireFormFieldPropertiesChangeEvent = function (name, field, pageIndex, isValueChanged, isFontFamilyChanged, isFontSizeChanged, isFontStyleChanged, isColorChanged, isBackgroundColorChanged, isBorderColorChanged, isBorderWidthChanged, isAlignmentChanged, isReadOnlyChanged, isVisibilityChanged, isMaxLengthChanged, isRequiredChanged, isPrintChanged, isToolTipChanged, oldValue, newValue, isNamechanged) {
        var eventArgs = {
            name: name, field: field, pageIndex: pageIndex, isValueChanged: isValueChanged, isFontFamilyChanged: isFontFamilyChanged, isFontSizeChanged: isFontSizeChanged,
            isFontStyleChanged: isFontStyleChanged, isColorChanged: isColorChanged, isBackgroundColorChanged: isBackgroundColorChanged, isBorderColorChanged: isBorderColorChanged,
            isBorderWidthChanged: isBorderWidthChanged, isAlignmentChanged: isAlignmentChanged, isReadOnlyChanged: isReadOnlyChanged, isVisibilityChanged: isVisibilityChanged,
            isMaxLengthChanged: isMaxLengthChanged, isRequiredChanged: isRequiredChanged, isPrintChanged: isPrintChanged,
            isToolTipChanged: isToolTipChanged, oldValue: oldValue, newValue: newValue, isNameChanged: !isNullOrUndefined(isNamechanged) ? isNamechanged : false
        };
        this.trigger('formFieldPropertiesChange', eventArgs);
    };
    /**
     * @param name - Get the name of the event.
     * @param field - Event arguments for the form field mouse leave event.
     * @param pageIndex - Get the page number.
     * @private
     */
    // eslint-disable-next-line
    PdfViewer.prototype.fireFormFieldMouseLeaveEvent = function (name, field, pageIndex) {
        var eventArgs = { name: name, field: field, pageIndex: pageIndex };
        this.trigger('formFieldMouseLeave', eventArgs);
    };
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
    // eslint-disable-next-line
    PdfViewer.prototype.fireFormFieldMouseoverEvent = function (name, field, pageIndex, pageX, pageY, X, Y) {
        var eventArgs = { name: name, field: field, pageIndex: pageIndex, pageX: pageX, pageY: pageY, X: X, Y: Y };
        this.trigger('formFieldMouseover', eventArgs);
    };
    /**
     * @param name - Get the name of the event.
     * @param field - Event arguments for the form field move event.
     * @param pageIndex - Get the page number.
     * @param previousPosition - Get the previous position of the form field in the page.
     * @param currentPosition - Current position of form field in the page.
     * @private
     */
    // eslint-disable-next-line
    PdfViewer.prototype.fireFormFieldMoveEvent = function (name, field, pageIndex, previousPosition, currentPosition) {
        var eventArgs = { name: name, field: field, pageIndex: pageIndex, previousPosition: previousPosition, currentPosition: currentPosition };
        this.trigger('formFieldMove', eventArgs);
    };
    /**
     * @param name - Get the name of the event.
     * @param field - Event arguments for the form field resize event.
     * @param pageIndex - Get the page number.
     * @param previousPosition - Get the previous position of the form field in the page.
     * @param currentPosition - Current position of form field in the page.
     * @private
     */
    // eslint-disable-next-line
    PdfViewer.prototype.fireFormFieldResizeEvent = function (name, field, pageIndex, previousPosition, currentPosition) {
        var eventArgs = { name: name, field: field, pageIndex: pageIndex, previousPosition: previousPosition, currentPosition: currentPosition };
        this.trigger('formFieldResize', eventArgs);
    };
    /**
     * @param name - Get the name of the event.
     * @param field - Event arguments for the form field select event.
     * @param pageIndex - Get the page number.
     * @param isProgrammaticSelection - Specifies whether the the form field is selected programmatically or by UI.
     * @private
     */
    // eslint-disable-next-line
    PdfViewer.prototype.fireFormFieldSelectEvent = function (name, field, pageIndex, isProgrammaticSelection) {
        var eventArgs = { name: name, field: field, pageIndex: pageIndex, isProgrammaticSelection: isProgrammaticSelection };
        this.trigger('formFieldSelect', eventArgs);
    };
    /**
     * @param name - Get the name of the event.
     * @param field - Event arguments for the form field unselect event.
     * @param pageIndex - Get the page number.
     * @private
     */
    // eslint-disable-next-line
    PdfViewer.prototype.fireFormFieldUnselectEvent = function (name, field, pageIndex) {
        var eventArgs = { name: name, field: field, pageIndex: pageIndex };
        this.trigger('formFieldUnselect', eventArgs);
    };
    /**
     * @param pageData
     * @private
     */
    // eslint-disable-next-line
    PdfViewer.prototype.fireDocumentLoad = function (pageData) {
        var eventArgs = { name: 'documentLoad', documentName: this.fileName, pageData: pageData };
        this.trigger('documentLoad', eventArgs);
        if (isBlazor()) {
            this._dotnetInstance.invokeMethodAsync('LoadDocument', null);
            this.viewerBase.blazorUIAdaptor.loadDocument();
        }
    };
    /**
     * @param fileName
     * @private
     */
    PdfViewer.prototype.fireDocumentUnload = function (fileName) {
        var eventArgs = { name: 'documentUnload', documentName: fileName };
        this.trigger('documentUnload', eventArgs);
    };
    /**
     * @param isPasswordRequired
     * @param password
     * @private
     */
    PdfViewer.prototype.fireDocumentLoadFailed = function (isPasswordRequired, password) {
        // eslint-disable-next-line max-len
        var eventArgs = { name: 'documentLoadFailed', documentName: this.fileName, isPasswordRequired: isPasswordRequired, password: password };
        this.trigger('documentLoadFailed', eventArgs);
    };
    /**
     * @param errorStatusCode
     * @param errorMessage
     * @param action
     * @param retryCount
     * @private
     */
    PdfViewer.prototype.fireAjaxRequestFailed = function (errorStatusCode, errorMessage, action, retryCount) {
        // eslint-disable-next-line max-len
        var eventArgs = { name: 'ajaxRequestFailed', documentName: this.fileName, errorStatusCode: errorStatusCode, errorMessage: errorMessage, action: action };
        if (retryCount) {
            eventArgs.retryCount = true;
        }
        this.trigger('ajaxRequestFailed', eventArgs);
    };
    /**
     * @param action
     * @param data
     * @private
     */
    PdfViewer.prototype.fireAjaxRequestSuccess = function (action, data) {
        var eventArgs = { name: 'ajaxRequestSuccess', documentName: this.fileName, action: action, data: data, cancel: false };
        this.trigger('ajaxRequestSuccess', eventArgs);
        if (eventArgs.cancel) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * @param action
     * @private
     */
    PdfViewer.prototype.fireValidatedFailed = function (action) {
        if (!isBlazor()) {
            // eslint-disable-next-line max-len
            var eventArgs = { formField: this.formFieldCollections, documentName: this.fileName, nonFillableFields: this.viewerBase.nonFillableFields };
            this.trigger('validateFormFields', eventArgs);
        }
        else {
            // eslint-disable-next-line
            var eventArgs = {};
            eventArgs.documentName = this.fileName;
            eventArgs.formFields = this.formFieldCollections;
            eventArgs.nonFillableFields = this.viewerBase.nonFillableFields;
            this.trigger('validateFormFields', eventArgs);
        }
    };
    /**
     * @param x
     * @param y
     * @param pageNumber
     * @private
     */
    PdfViewer.prototype.firePageClick = function (x, y, pageNumber) {
        var eventArgs = { name: 'pageClick', documentName: this.fileName, x: x, y: y, pageNumber: pageNumber };
        this.trigger('pageClick', eventArgs);
    };
    /**
     * @param previousPageNumber
     * @private
     */
    PdfViewer.prototype.firePageChange = function (previousPageNumber) {
        // eslint-disable-next-line max-len
        var eventArgs = { name: 'pageChange', documentName: this.fileName, currentPageNumber: this.currentPageNumber, previousPageNumber: previousPageNumber };
        this.trigger('pageChange', eventArgs);
        if (isBlazor()) {
            //this._dotnetInstance.invokeMethodAsync('OnPageChanged', this.currentPageNumber);
            this.viewerBase.blazorUIAdaptor.pageChanged(this.currentPageNumber);
        }
    };
    /**
     * @private
     */
    PdfViewer.prototype.fireZoomChange = function () {
        // eslint-disable-next-line max-len
        var eventArgs = { name: 'zoomChange', zoomValue: this.magnificationModule.zoomFactor * 100, previousZoomValue: this.magnificationModule.previousZoomFactor * 100 };
        this.trigger('zoomChange', eventArgs);
    };
    /**
     * @param hyperlink
     * @param hyperlinkElement
     * @private
     */
    PdfViewer.prototype.fireHyperlinkClick = function (hyperlink, hyperlinkElement) {
        return __awaiter(this, void 0, void 0, function () {
            var eventArgs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        eventArgs = { name: 'hyperlinkClick', hyperlink: hyperlink, hyperlinkElement: hyperlinkElement, cancel: false };
                        if (!isBlazor()) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.triggerEvent('hyperlinkClick', eventArgs)];
                    case 1:
                        eventArgs = (_a.sent()) || eventArgs;
                        return [3 /*break*/, 3];
                    case 2:
                        this.triggerEvent('hyperlinkClick', eventArgs);
                        _a.label = 3;
                    case 3:
                        if (eventArgs.hyperlinkElement.href != eventArgs.hyperlink) {
                            hyperlinkElement.href = eventArgs.hyperlink;
                        }
                        if (eventArgs.cancel) {
                            return [2 /*return*/, false];
                        }
                        else {
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param hyperlinkElement
     * @private
     */
    PdfViewer.prototype.fireHyperlinkHover = function (hyperlinkElement) {
        // eslint-disable-next-line max-len
        var eventArgs = { name: 'hyperlinkMouseOver', hyperlinkElement: hyperlinkElement };
        this.trigger('hyperlinkMouseOver', eventArgs);
    };
    /**
     * @param fieldName
     * @param value
     * @private
     */
    PdfViewer.prototype.fireFocusOutFormField = function (fieldName, value) {
        // eslint-disable-next-line max-len
        var eventArgs = { name: 'formFieldFocusOut', fieldName: fieldName, value: value };
        // eslint-disable-next-line
        this.trigger('formFieldFocusOut', eventArgs);
    };
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
    // eslint-disable-next-line
    PdfViewer.prototype.fireAnnotationAdd = function (pageNumber, index, type, bounds, settings, textMarkupContent, tmStartIndex, tmEndIndex, labelSettings, multiPageCollection, customStampName) {
        var eventArgs = { name: 'annotationAdd', pageIndex: pageNumber, annotationId: index, annotationType: type, annotationBound: bounds, annotationSettings: settings };
        if (textMarkupContent) {
            if (isBlazor()) {
                eventArgs.annotationSettings.textMarkupContent = textMarkupContent;
                eventArgs.annotationSettings.textMarkupStartIndex = tmStartIndex;
                eventArgs.annotationSettings.textMarkupEndIndex = tmEndIndex;
            }
            else {
                eventArgs.textMarkupContent = textMarkupContent;
                eventArgs.textMarkupStartIndex = tmStartIndex;
                eventArgs.textMarkupEndIndex = tmEndIndex;
            }
        }
        if (labelSettings) {
            eventArgs.labelSettings = labelSettings;
        }
        if (multiPageCollection) {
            eventArgs.multiplePageCollection = multiPageCollection;
        }
        if (type === 'Image') {
            eventArgs.customStampName = customStampName;
        }
        this.viewerBase.isAnnotationSelect = false;
        this.trigger('annotationAdd', eventArgs);
        if (isBlazor()) {
            // this._dotnetInstance.invokeMethodAsync('AnnotationAdd', null);
            this.viewerBase.blazorUIAdaptor.annotationAdd();
        }
    };
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
    // eslint-disable-next-line
    PdfViewer.prototype.fireAnnotationRemove = function (pageNumber, index, type, bounds, textMarkupContent, tmStartIndex, tmEndIndex, multiPageCollection) {
        // eslint-disable-next-line max-len
        var eventArgs = { name: 'annotationRemove', pageIndex: pageNumber, annotationId: index, annotationType: type, annotationBounds: bounds };
        if (textMarkupContent) {
            eventArgs.textMarkupContent = textMarkupContent;
            eventArgs.textMarkupStartIndex = tmStartIndex;
            eventArgs.textMarkupEndIndex = tmEndIndex;
        }
        if (multiPageCollection) {
            eventArgs.multiplePageCollection = multiPageCollection;
        }
        this.trigger('annotationRemove', eventArgs);
    };
    /**
     * @param value
     * @private
     */
    // eslint-disable-next-line
    PdfViewer.prototype.fireBeforeAddFreeTextAnnotation = function (value) {
        // eslint-disable-next-line max-len
        var eventArgs = { name: 'beforeAddFreeText', value: value };
        // eslint-disable-next-line
        this.trigger('beforeAddFreeText', eventArgs);
    };
    /**
     * @param id
     * @param text
     * @param annotation
     * @private
     */
    // eslint-disable-next-line
    PdfViewer.prototype.fireCommentAdd = function (id, text, annotation) {
        // eslint-disable-next-line max-len
        var eventArgs = { name: 'CommentAdd', id: id, text: text, annotation: annotation };
        // eslint-disable-next-line
        this.trigger('commentAdd', eventArgs);
    };
    /**
     * @param id
     * @param text
     * @param annotation
     * @private
     */
    // eslint-disable-next-line
    PdfViewer.prototype.fireCommentEdit = function (id, text, annotation) {
        // eslint-disable-next-line max-len
        var eventArgs = { name: 'CommentEdit', id: id, text: text, annotation: annotation };
        // eslint-disable-next-line
        this.trigger('commentEdit', eventArgs);
    };
    /**
     * @param id
     * @param text
     * @param annotation
     * @private
     */
    // eslint-disable-next-line
    PdfViewer.prototype.fireCommentDelete = function (id, text, annotation) {
        // eslint-disable-next-line max-len
        var eventArgs = { name: 'CommentDelete', id: id, text: text, annotation: annotation };
        // eslint-disable-next-line
        this.trigger('commentDelete', eventArgs);
    };
    /**
     * @param id
     * @param text
     * @param annotation
     * @private
     */
    // eslint-disable-next-line
    PdfViewer.prototype.fireCommentSelect = function (id, text, annotation) {
        // eslint-disable-next-line max-len
        var eventArgs = { name: 'CommentSelect', id: id, text: text, annotation: annotation };
        // eslint-disable-next-line
        this.trigger('commentSelect', eventArgs);
    };
    /**
     * @param id
     * @param text
     * @param annotation
     * @param statusChange
     * @private
     */
    // eslint-disable-next-line
    PdfViewer.prototype.fireCommentStatusChanged = function (id, text, annotation, statusChange) {
        // eslint-disable-next-line max-len
        var eventArgs = { name: 'CommentStatusChanged', id: id, text: text, annotation: annotation, status: statusChange };
        // eslint-disable-next-line
        this.trigger('commentStatusChanged', eventArgs);
    };
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
    // eslint-disable-next-line max-len
    // eslint-disable-next-line
    PdfViewer.prototype.fireAnnotationPropertiesChange = function (pageNumber, index, type, isColorChanged, isOpacityChanged, isTextChanged, isCommentsChanged, textMarkupContent, tmStartIndex, tmEndIndex, multiPageCollection) {
        // eslint-disable-next-line max-len
        var eventArgs = { name: 'annotationPropertiesChange', pageIndex: pageNumber, annotationId: index, annotationType: type, isColorChanged: isColorChanged, isOpacityChanged: isOpacityChanged, isTextChanged: isTextChanged, isCommentsChanged: isCommentsChanged };
        if (textMarkupContent) {
            eventArgs.textMarkupContent = textMarkupContent;
            eventArgs.textMarkupStartIndex = tmStartIndex;
            eventArgs.textMarkupEndIndex = tmEndIndex;
        }
        if (multiPageCollection) {
            eventArgs.multiplePageCollection = multiPageCollection;
        }
        this.trigger('annotationPropertiesChange', eventArgs);
    };
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
    // eslint-disable-next-line
    PdfViewer.prototype.fireSignatureAdd = function (pageNumber, index, type, bounds, opacity, strokeColor, thickness, data) {
        var eventArgs = { pageIndex: pageNumber, id: index, type: type, bounds: bounds, opacity: opacity };
        if (thickness) {
            eventArgs.thickness = thickness;
        }
        if (strokeColor) {
            eventArgs.strokeColor = strokeColor;
        }
        if (data) {
            eventArgs.data = data;
        }
        this.trigger('addSignature', eventArgs);
    };
    /**
     * @param pageNumber
     * @param index
     * @param type
     * @param bounds
     * @private
     */
    // eslint-disable-next-line
    PdfViewer.prototype.fireSignatureRemove = function (pageNumber, index, type, bounds) {
        var eventArgs = { pageIndex: pageNumber, id: index, type: type, bounds: bounds };
        this.trigger('removeSignature', eventArgs);
    };
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
    // eslint-disable-next-line
    PdfViewer.prototype.fireSignatureMove = function (pageNumber, id, type, opacity, strokeColor, thickness, previousPosition, currentPosition) {
        var eventArgs = { pageIndex: pageNumber, id: id, type: type, opacity: opacity, strokeColor: strokeColor, thickness: thickness, previousPosition: previousPosition, currentPosition: currentPosition };
        this.trigger('moveSignature', eventArgs);
    };
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
    // eslint-disable-next-line
    PdfViewer.prototype.fireSignaturePropertiesChange = function (pageNumber, index, type, isStrokeColorChanged, isOpacityChanged, isThicknessChanged, oldProp, newProp) {
        var eventArgs = { pageIndex: pageNumber, id: index, type: type, isStrokeColorChanged: isStrokeColorChanged, isOpacityChanged: isOpacityChanged, isThicknessChanged: isThicknessChanged, oldValue: oldProp, newValue: newProp };
        this.trigger('signaturePropertiesChange', eventArgs);
    };
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
    // eslint-disable-next-line
    PdfViewer.prototype.fireSignatureResize = function (pageNumber, index, type, opacity, strokeColor, thickness, currentPosition, previousPosition) {
        var eventArgs = { pageIndex: pageNumber, id: index, type: type, opacity: opacity, strokeColor: strokeColor, thickness: thickness, currentPosition: currentPosition, previousPosition: previousPosition };
        this.trigger('resizeSignature', eventArgs);
    };
    /**
     * @param id
     * @param pageNumber
     * @param signature
     * @private
     */
    // eslint-disable-next-line
    PdfViewer.prototype.fireSignatureSelect = function (id, pageNumber, signature) {
        var eventArgs = { id: id, pageIndex: pageNumber, signature: signature };
        this.trigger('signatureSelect', eventArgs);
    };
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
    // eslint-disable-next-line
    PdfViewer.prototype.fireAnnotationSelect = function (id, pageNumber, annotation, annotationCollection, multiPageCollection, isSelected, annotationAddMode) {
        // eslint-disable-next-line max-len
        var eventArgs = { name: 'annotationSelect', annotationId: id, pageIndex: pageNumber, annotation: annotation };
        if (annotationCollection) {
            // eslint-disable-next-line max-len
            eventArgs = { name: 'annotationSelect', annotationId: id, pageIndex: pageNumber, annotation: annotation, annotationCollection: annotationCollection };
        }
        if (multiPageCollection) {
            eventArgs.multiplePageCollection = multiPageCollection;
        }
        if (isSelected) {
            eventArgs.isProgrammaticSelection = isSelected;
        }
        if (annotationAddMode) {
            eventArgs.annotationAddMode = annotationAddMode;
        }
        if (isBlazor()) {
            if (annotation.type === 'FreeText') {
                // eslint-disable-next-line
                var fontStyle = { isBold: false, isItalic: false, isStrikeout: false, isUnderline: false };
                if (annotation.fontStyle === 1) {
                    fontStyle.isBold = true;
                }
                else if (annotation.fontStyle === 2) {
                    fontStyle.isItalic = true;
                }
                else if (annotation.fontStyle === 3) {
                    fontStyle.isStrikeout = true;
                }
                else if (annotation.fontStyle === 4) {
                    fontStyle.isUnderline = true;
                }
                annotation.fontStyle = fontStyle;
            }
            //this._dotnetInstance.invokeMethodAsync('AnnotationSelect', annotation.type);
            this.viewerBase.blazorUIAdaptor.annotationSelect(annotation.type);
        }
        this.trigger('annotationSelect', eventArgs);
    };
    /**
     * @param id
     * @param pageNumber
     * @param annotation
     * @private
     */
    // eslint-disable-next-line
    PdfViewer.prototype.fireAnnotationUnSelect = function (id, pageNumber, annotation) {
        if (isBlazor()) {
            this.viewerBase.blazorUIAdaptor.annotationUnSelect();
        }
        // eslint-disable-next-line max-len
        var eventArgs = { name: 'annotationUnSelect', annotationId: id, pageIndex: pageNumber, annotation: annotation };
        this.trigger('annotationUnSelect', eventArgs);
    };
    /**
     * @param id
     * @param pageNumber
     * @param annotation
     * @private
     */
    // eslint-disable-next-line
    PdfViewer.prototype.fireAnnotationDoubleClick = function (id, pageNumber, annotation) {
        // eslint-disable-next-line max-len
        var eventArgs = { name: 'annotationDblClick', annotationId: id, pageIndex: pageNumber, annotation: annotation };
        this.trigger('annotationDoubleClick', eventArgs);
    };
    /**
     * @param pageNumber
     * @private
     */
    PdfViewer.prototype.fireTextSelectionStart = function (pageNumber) {
        this.isTextSelectionStarted = true;
        var eventArgs = { pageIndex: pageNumber };
        this.trigger('textSelectionStart', eventArgs);
    };
    /**
     * @param pageNumber
     * @param text
     * @param bound
     * @private
     */
    // eslint-disable-next-line
    PdfViewer.prototype.fireTextSelectionEnd = function (pageNumber, text, bound) {
        if (this.isTextSelectionStarted) {
            var eventArgs = { pageIndex: pageNumber, textContent: text, textBounds: bound };
            this.trigger('textSelectionEnd', eventArgs);
            this.isTextSelectionStarted = false;
        }
    };
    /**
     * @param canvas
     * @param index
     * @private
     */
    PdfViewer.prototype.renderDrawing = function (canvas, index) {
        if (isNullOrUndefined(index) && this.viewerBase.activeElements.activePageID && !this.viewerBase.isPrint) {
            index = this.viewerBase.activeElements.activePageID;
        }
        if (this.annotation) {
            this.annotation.renderAnnotations(index, null, null, null, canvas);
        }
        else if (this.formDesignerModule) {
            this.formDesignerModule.updateCanvas(index, canvas);
        }
    };
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
    // eslint-disable-next-line
    PdfViewer.prototype.fireAnnotationResize = function (pageNumber, index, type, bounds, settings, textMarkupContent, tmStartIndex, tmEndIndex, labelSettings, multiPageCollection) {
        var eventArgs = { name: 'annotationResize', pageIndex: pageNumber, annotationId: index, annotationType: type, annotationBound: bounds, annotationSettings: settings };
        if (textMarkupContent) {
            eventArgs.textMarkupContent = textMarkupContent;
            eventArgs.textMarkupStartIndex = tmStartIndex;
            eventArgs.textMarkupEndIndex = tmEndIndex;
        }
        if (labelSettings) {
            eventArgs.labelSettings = labelSettings;
        }
        if (multiPageCollection) {
            eventArgs.multiplePageCollection = multiPageCollection;
        }
        this.trigger('annotationResize', eventArgs);
    };
    /**
     * @param pageNumber
     * @param id
     * @param type
     * @param annotationSettings
     * @param previousPosition
     * @param currentPosition
     * @private
     */
    // eslint-disable-next-line
    PdfViewer.prototype.fireAnnotationMoving = function (pageNumber, id, type, annotationSettings, previousPosition, currentPosition) {
        var eventArgs = { name: 'annotationMoving', pageIndex: pageNumber, annotationId: id, annotationType: type, annotationSettings: annotationSettings, previousPosition: previousPosition, currentPosition: currentPosition };
        this.trigger('annotationMoving', eventArgs);
    };
    /**
    * @param pageNumber
    * @param id
    * @param type
    * @param annotationSettings
    * @param previousPosition
    * @param currentPosition
    * @private
    */
    // eslint-disable-next-line
    PdfViewer.prototype.fireAnnotationMove = function (pageNumber, id, type, annotationSettings, previousPosition, currentPosition) {
        var eventArgs = { name: 'annotationMove', pageIndex: pageNumber, annotationId: id, annotationType: type, annotationSettings: annotationSettings, previousPosition: previousPosition, currentPosition: currentPosition };
        this.trigger('annotationMove', eventArgs);
    };
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
    // eslint-disable-next-line
    PdfViewer.prototype.fireAnnotationMouseover = function (id, pageNumber, annotationType, bounds, annotation, currentPosition, mousePosition) {
        var eventArgs = { name: 'annotationMouseover', annotationId: id, pageIndex: pageNumber, annotationType: annotationType, annotationBounds: bounds, annotation: annotation, pageX: currentPosition.left, pageY: currentPosition.top, X: mousePosition.left, Y: mousePosition.top };
        if (isBlazor()) {
            if (annotation.subject === 'Perimeter calculation') {
                eventArgs.annotationType = 'Perimeter';
            }
            else if (annotation.subject === 'Area calculation') {
                eventArgs.annotationType = 'Area';
            }
            else if (annotation.subject === 'Volume calculation') {
                eventArgs.annotationType = 'Volume';
            }
            else if (annotation.subject === 'Arrow') {
                eventArgs.annotationType = 'Arrow';
            }
            else if (annotation.subject === 'Circle') {
                eventArgs.annotationType = 'Circle';
            }
        }
        this.trigger('annotationMouseover', eventArgs);
    };
    /**
     * @param pageNumber
     * @private
     */
    // eslint-disable-next-line
    PdfViewer.prototype.fireAnnotationMouseLeave = function (pageNumber) {
        var eventArgs = { name: 'annotationMouseLeave', pageIndex: pageNumber };
        this.trigger('annotationMouseLeave', eventArgs);
    };
    /**
     * @param pageX
     * @param pageY
     * @private
     */
    PdfViewer.prototype.firePageMouseover = function (pageX, pageY) {
        var eventArgs = { pageX: pageX, pageY: pageY };
        this.trigger('pageMouseover', eventArgs);
    };
    /**
     * @param fileName
     * @private
     */
    PdfViewer.prototype.fireDownloadStart = function (fileName) {
        var eventArgs = { fileName: fileName };
        this.trigger('downloadStart', eventArgs);
    };
    /**
     * @param fileName
     * @param downloadData
     * @private
     */
    PdfViewer.prototype.fireDownloadEnd = function (fileName, downloadData) {
        var eventArgs = { fileName: fileName, downloadDocument: downloadData };
        this.trigger('downloadEnd', eventArgs);
    };
    /**
     * @private
     */
    // eslint-disable-next-line
    PdfViewer.prototype.firePrintStart = function () {
        return __awaiter(this, void 0, void 0, function () {
            var eventArgs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        eventArgs = { fileName: this.downloadFileName, cancel: false };
                        if (!isBlazor) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.triggerEvent('printStart', eventArgs)];
                    case 1:
                        eventArgs = (_a.sent()) || eventArgs;
                        return [3 /*break*/, 3];
                    case 2:
                        this.triggerEvent('printStart', eventArgs);
                        _a.label = 3;
                    case 3:
                        if (!eventArgs.cancel) {
                            this.printModule.print();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param eventName
     * @param args
     * @param eventName
     * @param args
     * @private
     */
    PdfViewer.prototype.triggerEvent = function (eventName, args) {
        return __awaiter(this, void 0, void 0, function () {
            var eventArgs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.trigger(eventName, args)];
                    case 1:
                        eventArgs = _a.sent();
                        if (isBlazor && typeof eventArgs === 'string') {
                            eventArgs = JSON.parse(eventArgs);
                        }
                        return [2 /*return*/, eventArgs];
                }
            });
        });
    };
    /**
     * @param fileName
     * @private
     */
    PdfViewer.prototype.firePrintEnd = function (fileName) {
        var eventArgs = { fileName: fileName };
        this.trigger('printEnd', eventArgs);
    };
    /**
     * @param pageNumber
     * @private
     */
    PdfViewer.prototype.fireThumbnailClick = function (pageNumber) {
        var eventArgs = { name: 'thumbnailClick', pageNumber: pageNumber };
        this.trigger('thumbnailClick', eventArgs);
    };
    /**
     * @param pageNumber
     * @param position
     * @param text
     * @param fileName
     * @private
     */
    PdfViewer.prototype.fireBookmarkClick = function (pageNumber, position, text, fileName) {
        // eslint-disable-next-line
        var eventArgs = { name: 'bookmarkClick', pageNumber: pageNumber, position: position, text: text, fileName: fileName };
        this.trigger('bookmarkClick', eventArgs);
    };
    /**
     * @param importData
     * @private
     */
    // eslint-disable-next-line
    PdfViewer.prototype.fireImportStart = function (importData) {
        var eventArgs = { name: 'importAnnotationsStart', importData: importData, formFieldData: null };
        this.trigger('importStart', eventArgs);
    };
    /**
     * @param exportData
     * @private
     */
    // eslint-disable-next-line
    PdfViewer.prototype.fireExportStart = function (exportData) {
        var eventArgs = { name: 'exportAnnotationsStart', exportData: exportData, formFieldData: null, cancel: false };
        this.trigger('exportStart', eventArgs);
        if (eventArgs.cancel) {
            return false;
        }
        else {
            return true;
        }
    };
    /**
     * @param importData
     * @private
     */
    // eslint-disable-next-line
    PdfViewer.prototype.fireImportSuccess = function (importData) {
        var eventArgs = { name: 'importAnnotationsSuccess', importData: importData, formFieldData: null };
        this.trigger('importSuccess', eventArgs);
    };
    /**
     * @param exportData
     * @param fileName
     * @private
     */
    // eslint-disable-next-line
    PdfViewer.prototype.fireExportSuccess = function (exportData, fileName) {
        var eventArgs = { name: 'exportAnnotationsSuccess', exportData: exportData, fileName: fileName, formFieldData: null };
        this.trigger('exportSuccess', eventArgs);
    };
    /**
     * @param data
     * @param errorDetails
     * @private
     */
    // eslint-disable-next-line
    PdfViewer.prototype.fireImportFailed = function (data, errorDetails) {
        // eslint-disable-next-line max-len
        var eventArgs = { name: 'importAnnotationsFailed', importData: data, errorDetails: errorDetails, formFieldData: null };
        this.trigger('importFailed', eventArgs);
    };
    /**
     * @param data
     * @param errorDetails
     * @private
     */
    // eslint-disable-next-line
    PdfViewer.prototype.fireExportFailed = function (data, errorDetails) {
        // eslint-disable-next-line max-len
        var eventArgs = { name: 'exportAnnotationsFailed', exportData: data, errorDetails: errorDetails, formFieldData: null };
        this.trigger('exportFailed', eventArgs);
    };
    /**
     * @param data
     * @private
     */
    // eslint-disable-next-line
    PdfViewer.prototype.fireFormImportStarted = function (data) {
        var eventArgs = { name: 'importFormFieldsStart', importData: null, formFieldData: data };
        this.trigger('importStart', eventArgs);
    };
    /**
     * @param data
     * @private
     */
    // eslint-disable-next-line
    PdfViewer.prototype.fireFormExportStarted = function (data) {
        var eventArgs = { name: 'exportFormFieldsStart', exportData: null, formFieldData: data, cancel: false };
        this.trigger('exportStart', eventArgs);
        if (eventArgs.cancel) {
            return false;
        }
        else {
            return true;
        }
    };
    /**
     * @param data
     * @private
     */
    // eslint-disable-next-line
    PdfViewer.prototype.fireFormImportSuccess = function (data) {
        var eventArgs = { name: 'importFormFieldsSuccess', importData: data, formFieldData: data };
        this.trigger('importSuccess', eventArgs);
    };
    /**
     * @param data
     * @param fileName
     * @private
     */
    // eslint-disable-next-line
    PdfViewer.prototype.fireFormExportSuccess = function (data, fileName) {
        var eventArgs = { name: 'exportFormFieldsSuccess', exportData: data, fileName: fileName, formFieldData: data };
        this.trigger('exportSuccess', eventArgs);
    };
    /**
     * @param data
     * @param errorDetails
     * @private
     */
    // eslint-disable-next-line
    PdfViewer.prototype.fireFormImportFailed = function (data, errorDetails) {
        // eslint-disable-next-line max-len
        var eventArgs = { name: 'importFormFieldsfailed', importData: data, errorDetails: errorDetails, formFieldData: data };
        this.trigger('importFailed', eventArgs);
    };
    /**
     * @param data
     * @param errorDetails
     * @private
     */
    // eslint-disable-next-line
    PdfViewer.prototype.fireFormExportFailed = function (data, errorDetails) {
        // eslint-disable-next-line max-len
        var eventArgs = { name: 'exportFormFieldsFailed', exportData: data, errorDetails: errorDetails, formFieldData: data };
        this.trigger('exportFailed', eventArgs);
    };
    /**
     * @param documentCollection
     * @private
     */
    // eslint-disable-next-line
    PdfViewer.prototype.fireTextExtractionCompleted = function (documentCollection) {
        var eventArgs = { documentTextCollection: documentCollection };
        this.trigger('extractTextCompleted', eventArgs);
    };
    /**
     * @param searchText
     * @param isMatchcase
     * @private
     */
    // eslint-disable-next-line
    PdfViewer.prototype.fireTextSearchStart = function (searchText, isMatchcase) {
        // eslint-disable-next-line max-len
        var eventArgs = { name: 'textSearchStart', searchText: searchText, matchCase: isMatchcase };
        this.trigger('textSearchStart', eventArgs);
    };
    /**
     * @param searchText
     * @param isMatchcase
     * @private
     */
    // eslint-disable-next-line
    PdfViewer.prototype.fireTextSearchComplete = function (searchText, isMatchcase) {
        // eslint-disable-next-line max-len
        var eventArgs = { name: 'textSearchComplete', searchText: searchText, matchCase: isMatchcase };
        this.trigger('textSearchComplete', eventArgs);
    };
    /**
     * @param searchText
     * @param isMatchcase
     * @param bounds
     * @param pageNumber
     * @private
     */
    // eslint-disable-next-line
    PdfViewer.prototype.fireTextSearchHighlight = function (searchText, isMatchcase, bounds, pageNumber) {
        // eslint-disable-next-line max-len
        var eventArgs = { name: 'textSearchHighlight', searchText: searchText, matchCase: isMatchcase, bounds: bounds, pageNumber: pageNumber };
        this.trigger('textSearchHighlight', eventArgs);
    };
    /**
     * @param bounds
     * @param commonStyle
     * @param cavas
     * @param index
     * @private
     */
    PdfViewer.prototype.renderAdornerLayer = function (bounds, commonStyle, cavas, index) {
        renderAdornerLayer(bounds, commonStyle, cavas, index, this);
    };
    /**
     * @param index
     * @param currentSelector
     * @private
     */
    PdfViewer.prototype.renderSelector = function (index, currentSelector) {
        this.drawing.renderSelector(index, currentSelector);
    };
    /**
     * @param objArray
     * @param currentSelector
     * @param multipleSelection
     * @param preventUpdate
     * @private
     */
    // eslint-disable-next-line max-len
    PdfViewer.prototype.select = function (objArray, currentSelector, multipleSelection, preventUpdate) {
        var allowServerDataBind = this.allowServerDataBinding;
        this.enableServerDataBinding(false);
        if (this.annotationModule) {
            var module = this.annotationModule.textMarkupAnnotationModule;
            var annotationSelect = module && module.selectTextMarkupCurrentPage;
            // eslint-disable-next-line
            var annotation = this.selectedItems.annotations[0];
            if (annotationSelect) {
                // eslint-disable-next-line
                var currentAnnot = this.annotationModule.textMarkupAnnotationModule.currentTextMarkupAnnotation;
                this.annotationModule.textMarkupAnnotationModule.clearCurrentAnnotationSelection(annotationSelect, true);
                this.fireAnnotationUnSelect(currentAnnot.annotName, currentAnnot.pageNumber, currentAnnot);
            }
            if (!multipleSelection) {
                if (this.viewerBase.activeElements && this.viewerBase.activeElements.activePageID >= 0) {
                    if (!this.viewerBase.isNewStamp && annotation && annotation.shapeAnnotationType !== 'HandWrittenSignature' && annotation.shapeAnnotationType !== 'SignatureText' && annotation.shapeAnnotationType !== 'SignatureImage') {
                        this.fireAnnotationUnSelect(annotation.annotName, annotation.pageIndex, annotation);
                    }
                }
            }
        }
        if (this.formDesignerModule) {
            var formField = this.selectedItems.formFields[0];
            if (formField) {
                if (this.formDesignerModule && formField && formField.formFieldAnnotationType) {
                    var field = {
                        name: formField.name, id: formField.id, value: formField.value, fontFamily: formField.fontFamily, fontSize: formField.fontSize, fontStyle: formField.fontStyle,
                        color: formField.color, backgroundColor: formField.backgroundColor, borderColor: formField.borderColor,
                        thickness: formField.thickness, alignment: formField.alignment, isReadonly: formField.isReadonly, visibility: formField.visibility,
                        maxLength: formField.maxLength, isRequired: formField.isRequired, isPrint: formField.isPrint, rotation: formField.rotateAngle, tooltip: formField.tooltip, options: formField.options,
                        isChecked: formField.isChecked, isSelected: formField.isSelected
                    };
                    this.fireFormFieldUnselectEvent("formFieldUnselect", field, formField.pageIndex);
                }
            }
        }
        var proxy = this;
        this.viewerBase.renderedPagesList.forEach(function (item) {
            proxy.clearSelection(item);
        });
        this.drawing.select(objArray, currentSelector, multipleSelection, preventUpdate);
        this.enableServerDataBinding(allowServerDataBind, true);
    };
    /**
     * @param pageId
     * @private
     */
    PdfViewer.prototype.getPageTable = function (pageId) {
        return this.drawing.getPageTable(pageId);
    };
    /**
     * @param diffX
     * @param diffY
     * @param pageIndex
     * @param currentSelector
     * @param helper
     * @private
     */
    // eslint-disable-next-line max-len
    PdfViewer.prototype.dragSelectedObjects = function (diffX, diffY, pageIndex, currentSelector, helper) {
        return this.drawing.dragSelectedObjects(diffX, diffY, pageIndex, currentSelector, helper);
    };
    /**
     * @param sx
     * @param sy
     * @param pivot
     * @private
     */
    PdfViewer.prototype.scaleSelectedItems = function (sx, sy, pivot) {
        return this.drawing.scaleSelectedItems(sx, sy, pivot);
    };
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
    // eslint-disable-next-line max-len
    PdfViewer.prototype.dragConnectorEnds = function (endPoint, obj, point, segment, target, targetPortId, currentSelector) {
        return this.drawing.dragConnectorEnds(endPoint, obj, point, segment, target, null, currentSelector);
    };
    /**
     * @param pageId
     * @private
     */
    PdfViewer.prototype.clearSelection = function (pageId) {
        var allowServerDataBind = this.allowServerDataBinding;
        this.enableServerDataBinding(false);
        var selectormodel = this.selectedItems;
        var node = selectormodel.annotations.length > 0 ? this.selectedItems.annotations[0] : this.selectedItems.formFields[0];
        if (selectormodel.annotations.length > 0) {
            selectormodel.offsetX = 0;
            selectormodel.offsetY = 0;
            selectormodel.width = 0;
            selectormodel.height = 0;
            selectormodel.rotateAngle = 0;
            selectormodel.annotations = [];
            selectormodel.wrapper = null;
        }
        else if (selectormodel.formFields.length > 0) {
            selectormodel.offsetX = 0;
            selectormodel.offsetY = 0;
            selectormodel.width = 0;
            selectormodel.height = 0;
            selectormodel.rotateAngle = 0;
            selectormodel.formFields = [];
            selectormodel.wrapper = null;
        }
        this.drawing.clearSelectorLayer(pageId);
        this.viewerBase.isAnnotationSelect = false;
        this.viewerBase.isFormFieldSelect = false;
        if (this.annotationModule) {
            var module = this.annotationModule.textMarkupAnnotationModule;
            if (module) {
                var annotationSelect = module.selectTextMarkupCurrentPage;
                this.annotationModule.textMarkupAnnotationModule.clearCurrentSelectedAnnotation();
                this.annotationModule.textMarkupAnnotationModule.clearCurrentAnnotationSelection(annotationSelect);
            }
        }
        this.enableServerDataBinding(allowServerDataBind, true);
    };
    /**
     * Get page number from the user coordinates x and y.
     *
     * @param {Point} clientPoint - The user will provide a x, y coordinates.
     * @returns number
     */
    PdfViewer.prototype.getPageNumberFromClientPoint = function (clientPoint) {
        var pageNumber = this.viewerBase.getPageNumberFromClientPoint(clientPoint);
        return pageNumber;
    };
    /**
     * Convert user coordinates to the PDF page coordinates.
     *
     * @param {Point} clientPoint - The user should provide a x, y coordinates.
     * @param {number} pageNumber - We need to pass pageNumber.
     * @returns Point
     */
    PdfViewer.prototype.convertClientPointToPagePoint = function (clientPoint, pageNumber) {
        var pagePoint = this.viewerBase.convertClientPointToPagePoint(clientPoint, pageNumber);
        return pagePoint;
    };
    /**
     * Convert page coordinates to the user coordinates.
     *
     * @param {Point} pagePoint - The user should provide a page x, y coordinates.
     * @param {number} pageNumber - We need to pass pageNumber.
     * @returns Point
     */
    PdfViewer.prototype.convertPagePointToClientPoint = function (pagePoint, pageNumber) {
        var clientPoint = this.viewerBase.convertPagePointToClientPoint(pagePoint, pageNumber);
        return clientPoint;
    };
    /**
     * Convert page coordinates to the scrolling coordinates.
     *
     * @param {Point} pagePoint - The user should provide a page x, y coordinates.
     * @param {number} pageNumber - We need to pass pageNumber.
     * @returns Point
     */
    PdfViewer.prototype.convertPagePointToScrollingPoint = function (pagePoint, pageNumber) {
        var scrollingPoint = this.viewerBase.convertPagePointToScrollingPoint(pagePoint, pageNumber);
        return scrollingPoint;
    };
    /**
     * Brings the given rectangular region to view and zooms in the document to fit the region in client area (view port).
     *
     * @param {Rect} rectangle - Specifies the region in client coordinates that is to be brought to view.
     */
    PdfViewer.prototype.zoomToRect = function (rectangle) {
        this.magnificationModule.zoomToRect(rectangle);
    };
    /**
     * @param obj
     * @private
     */
    PdfViewer.prototype.add = function (obj) {
        return this.drawing.add(obj);
    };
    /**
     * @param obj
     * @private
     */
    PdfViewer.prototype.remove = function (obj) {
        return this.drawing.remove(obj);
    };
    /**
     * @private
     */
    PdfViewer.prototype.copy = function () {
        if (this.annotation)
            this.annotation.isShapeCopied = true;
        else if (this.formDesigner && this.designerMode)
            this.formDesigner.isShapeCopied = true;
        return this.drawing.copy();
    };
    /**
     * @param angle
     * @param currentSelector
     * @private
     */
    PdfViewer.prototype.rotate = function (angle, currentSelector) {
        return this.drawing.rotate(this.selectedItems, angle, null, currentSelector);
    };
    /**
     * @param obj
     * @private
     */
    PdfViewer.prototype.paste = function (obj) {
        var index;
        if (this.viewerBase.activeElements.activePageID) {
            index = this.viewerBase.activeElements.activePageID;
        }
        return this.drawing.paste(obj, index || 0);
    };
    /**
     * @private
     */
    PdfViewer.prototype.refresh = function () {
        for (var i = 0; i < this.annotations.length; i++) {
            if (this.zIndexTable.length !== undefined) {
                var notFound = true;
                for (var i_1 = 0; i_1 < this.zIndexTable.length; i_1++) {
                    var objects = this.zIndexTable[i_1].objects;
                    for (var j = 0; j < objects.length; j++) {
                        objects.splice(j, 1);
                    }
                    delete this.zIndexTable[i_1];
                }
                if (this.annotations[i]) {
                    delete this.annotations[i];
                }
                if (this.selectedItems.annotations && this.selectedItems.annotations[i]) {
                    delete this.selectedItems.annotations[i];
                }
                this.zIndexTable = [];
                this.renderDrawing();
            }
            if (this.annotations && this.annotations.length !== 0) {
                this.annotations.length = 0;
                this.selectedItems.annotations.length = 0;
            }
        }
    };
    /**
     * @private
     */
    PdfViewer.prototype.cut = function () {
        var index;
        if (this.viewerBase.activeElements.activePageID) {
            index = this.viewerBase.activeElements.activePageID;
        }
        if (this.annotation)
            this.annotation.isShapeCopied = true;
        else if (this.formDesigner && this.designerMode)
            this.formDesigner.isShapeCopied = true;
        return this.drawing.cut(index || 0);
    };
    /**
     * @param actualObject
     * @param node
     * @private
     */
    PdfViewer.prototype.nodePropertyChange = function (actualObject, node) {
        this.drawing.nodePropertyChange(actualObject, node);
    };
    /**
     * enableServerDataBinding method
     *
     * @returns { void }  enableServerDataBinding method.
     * @param {boolean} enable - provide the node value.
     *
     * @private
     */
    PdfViewer.prototype.enableServerDataBinding = function (enable, clearBulkChanges) {
        if (clearBulkChanges === void 0) { clearBulkChanges = false; }
        if (isBlazor()) {
            this.allowServerDataBinding = enable;
            if (clearBulkChanges) {
                this.bulkChanges = {};
            }
        }
    };
    /**
     * @param tx
     * @param ty
     * @param pageIndex
     * @param nodeBounds
     * @param isStamp
     * @param isSkip
     * @private
     */
    // eslint-disable-next-line max-len
    PdfViewer.prototype.checkBoundaryConstraints = function (tx, ty, pageIndex, nodeBounds, isStamp, isSkip) {
        return this.drawing.checkBoundaryConstraints(tx, ty, pageIndex, nodeBounds, isStamp, isSkip);
    };
    __decorate([
        Property()
    ], PdfViewer.prototype, "serviceUrl", void 0);
    __decorate([
        Property(0)
    ], PdfViewer.prototype, "pageCount", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "isDocumentEdited", void 0);
    __decorate([
        Property(0)
    ], PdfViewer.prototype, "currentPageNumber", void 0);
    __decorate([
        Property()
    ], PdfViewer.prototype, "documentPath", void 0);
    __decorate([
        Property(null)
    ], PdfViewer.prototype, "exportAnnotationFileName", void 0);
    __decorate([
        Property()
    ], PdfViewer.prototype, "downloadFileName", void 0);
    __decorate([
        Property('auto')
    ], PdfViewer.prototype, "height", void 0);
    __decorate([
        Property('auto')
    ], PdfViewer.prototype, "width", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableToolbar", void 0);
    __decorate([
        Property(1)
    ], PdfViewer.prototype, "retryCount", void 0);
    __decorate([
        Property([500])
    ], PdfViewer.prototype, "retryStatusCodes", void 0);
    __decorate([
        Property(0)
    ], PdfViewer.prototype, "retryTimeout", void 0);
    __decorate([
        Property(2)
    ], PdfViewer.prototype, "initialRenderPages", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "showNotificationDialog", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableNavigationToolbar", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableCommentPanel", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "isCommandPanelOpen", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "enableTextMarkupResizer", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "enableMultiLineOverlap", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "isValidFreeText", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "isAnnotationToolbarOpen", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "isAnnotationToolbarVisible", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "isFormDesignerToolbarVisible", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "enableMultiPageAnnotation", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableDownload", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enablePrint", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enablePrintRotation", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableThumbnail", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "isThumbnailViewOpen", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "isSignatureEditable", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableBookmark", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "enableBookmarkStyles", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableHyperlink", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableHandwrittenSignature", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableInkAnnotation", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "restrictZoomRequest", void 0);
    __decorate([
        Property('CurrentTab')
    ], PdfViewer.prototype, "hyperlinkOpenState", void 0);
    __decorate([
        Property('RightClick')
    ], PdfViewer.prototype, "contextMenuOption", void 0);
    __decorate([
        Property([])
    ], PdfViewer.prototype, "disableContextMenuItems", void 0);
    __decorate([
        Property({ name: '', id: '', type: '', isReadOnly: false, isSelected: false, isChecked: false, value: '', signatureType: [''], fontName: '', fontFamily: 'Helvetica', fontSize: 10, fontStyle: 'None', color: 'black', backgroundColor: 'white', alignment: 'Left', visibility: 'visible', maxLength: 0, isRequired: false, isPrint: false, tooltip: '', pageIndex: -1, options: [], signatureIndicatorSettings: { opacity: 1, backgroundColor: 'orange', width: 19, height: 10, fontSize: 10, text: null, color: 'black' } })
    ], PdfViewer.prototype, "formFieldCollections", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableNavigation", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableAutoComplete", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableMagnification", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "enableShapeLabel", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableImportAnnotationMeasurement", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enablePinchZoom", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableTextSelection", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableTextSearch", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableAnnotation", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableFormFields", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableFormDesigner", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "designerMode", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "enableFormFieldsValidation", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "isFormFieldDocument", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "enableDesktopMode", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "hideSaveSignature", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableFreeText", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableTextMarkupAnnotation", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableShapeAnnotation", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableMeasureAnnotation", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableStampAnnotations", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableStickyNotesAnnotation", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableAnnotationToolbar", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableFormDesignerToolbar", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "isBookmarkPanelOpen", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "isInitialFieldToolbarSelection", void 0);
    __decorate([
        Property('TextSelection')
    ], PdfViewer.prototype, "interactionMode", void 0);
    __decorate([
        Property('Default')
    ], PdfViewer.prototype, "zoomMode", void 0);
    __decorate([
        Property('Default')
    ], PdfViewer.prototype, "signatureFitMode", void 0);
    __decorate([
        Property('Default')
    ], PdfViewer.prototype, "printMode", void 0);
    __decorate([
        Property(0)
    ], PdfViewer.prototype, "zoomValue", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableZoomOptimization", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "isExtractText", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "isMaintainSelection", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "hideEmptyDigitalSignatureFields", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "showDigitalSignatureAppearance", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableAccessibilityTags", void 0);
    __decorate([
        Property('M/d/yyyy h:mm:ss a')
    ], PdfViewer.prototype, "dateTimeFormat", void 0);
    __decorate([
        Property({ showTooltip: true, toolbarItems: ['OpenOption', 'UndoRedoTool', 'PageNavigationTool', 'MagnificationTool', 'PanTool', 'SelectionTool', 'CommentTool', 'SubmitForm', 'AnnotationEditTool', 'FormDesignerEditTool', 'FreeTextAnnotationOption', 'InkAnnotationOption', 'ShapeAnnotationOption', 'StampAnnotation', 'SignatureOption', 'SearchOption', 'PrintOption', 'DownloadOption'], annotationToolbarItems: ['HighlightTool', 'UnderlineTool', 'StrikethroughTool', 'ColorEditTool', 'OpacityEditTool', 'AnnotationDeleteTool', 'StampAnnotationTool', 'HandWrittenSignatureTool', 'InkAnnotationTool', 'ShapeTool', 'CalibrateTool', 'StrokeColorEditTool', 'ThicknessEditTool', 'FreeTextAnnotationTool', 'FontFamilyAnnotationTool', 'FontSizeAnnotationTool', 'FontStylesAnnotationTool', 'FontAlignAnnotationTool', 'FontColorAnnotationTool', 'CommentPanelTool'], formDesignerToolbarItems: ['TextboxTool', 'PasswordTool', 'CheckBoxTool', 'RadioButtonTool', 'DropdownTool', 'ListboxTool', 'DrawSignatureTool', 'DeleteTool'] })
    ], PdfViewer.prototype, "toolbarSettings", void 0);
    __decorate([
        Property({ ajaxHeaders: [], withCredentials: false })
    ], PdfViewer.prototype, "ajaxRequestSettings", void 0);
    __decorate([
        Property({ customStampName: '', customStampImageSource: '' })
    ], PdfViewer.prototype, "customStamp", void 0);
    __decorate([
        Property({ load: 'Load', renderPages: 'RenderPdfPages', unload: 'Unload', download: 'Download', renderThumbnail: 'RenderThumbnailImages', print: 'PrintImages', renderComments: 'RenderAnnotationComments', importAnnotations: 'ImportAnnotations', exportAnnotations: 'ExportAnnotations', importFormFields: 'ImportFormFields', exportFormFields: 'ExportFormFields', renderTexts: 'RenderPdfTexts' })
    ], PdfViewer.prototype, "serverActionSettings", void 0);
    __decorate([
        Property({ name: '', isReadOnly: false, visibility: 'visible', isRequired: false, isPrint: true, tooltip: '', thickness: 1, signatureIndicatorSettings: { opacity: 1, backgroundColor: 'orange', width: 19, height: 10, fontSize: 10, text: null, color: 'black' }, signatureDialogSettings: { displayMode: DisplayMode.Draw | DisplayMode.Text | DisplayMode.Upload, hideSaveSignature: false } })
    ], PdfViewer.prototype, "signatureFieldSettings", void 0);
    __decorate([
        Property({ name: '', isReadOnly: false, visibility: 'visible', isRequired: false, isPrint: true, tooltip: '', thickness: 1, initialIndicatorSettings: { opacity: 1, backgroundColor: 'orange', width: 19, height: 10, fontSize: 10, text: null, color: 'black' }, initialDialogSettings: { displayMode: DisplayMode.Draw | DisplayMode.Text | DisplayMode.Upload, hideSaveSignature: false } })
    ], PdfViewer.prototype, "initialFieldSettings", void 0);
    __decorate([
        Property({ opacity: 1, color: '#FFDF56', author: 'Guest', annotationSelectorSettings: { selectionBorderColor: '', resizerBorderColor: 'black', resizerFillColor: '#FF4081', resizerSize: 8, selectionBorderThickness: 1, resizerShape: 'Square', selectorLineDashArray: [], resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges }, isLock: false, enableMultiPageAnnotation: false, enableTextMarkupResizer: false, allowedInteractions: ['None'], isPrint: true })
    ], PdfViewer.prototype, "highlightSettings", void 0);
    __decorate([
        Property({ opacity: 1, color: '#ff0000', author: 'Guest', annotationSelectorSettings: { selectionBorderColor: '', resizerBorderColor: 'black', resizerFillColor: '#FF4081', resizerSize: 8, selectionBorderThickness: 1, resizerShape: 'Square', selectorLineDashArray: [], resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges }, isLock: false, enableMultiPageAnnotation: false, enableTextMarkupResizer: false, allowedInteractions: ['None'], isPrint: true })
    ], PdfViewer.prototype, "strikethroughSettings", void 0);
    __decorate([
        Property({ opacity: 1, color: '#00ff00', author: 'Guest', annotationSelectorSettings: { selectionBorderColor: '', resizerBorderColor: 'black', resizerFillColor: '#FF4081', resizerSize: 8, selectionBorderThickness: 1, resizerShape: 'Square', selectorLineDashArray: [], resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges }, isLock: false, enableMultiPageAnnotation: false, enableTextMarkupResizer: false, allowedInteractions: ['None'], isPrint: true })
    ], PdfViewer.prototype, "underlineSettings", void 0);
    __decorate([
        Property({ opacity: 1, fillColor: '#ffffff00', strokeColor: '#ff0000', author: 'Guest', thickness: 1, borderDashArray: 0, lineHeadStartStyle: 'None', lineHeadEndStyle: 'None', annotationSelectorSettings: { selectionBorderColor: '', resizerBorderColor: 'black', resizerFillColor: '#FF4081', resizerSize: 8, selectionBorderThickness: 1, resizerShape: 'Square', selectorLineDashArray: [], resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges, resizerCursorType: null }, minHeight: 0, minWidth: 0, maxWidth: 0, maxHeight: 0, isLock: false, allowedInteractions: ['None'], isPrint: true })
    ], PdfViewer.prototype, "lineSettings", void 0);
    __decorate([
        Property({ opacity: 1, fillColor: '#ffffff00', strokeColor: '#ff0000', author: 'Guest', thickness: 1, borderDashArray: 0, lineHeadStartStyle: 'Closed', lineHeadEndStyle: 'Closed', annotationSelectorSettings: { selectionBorderColor: '', resizerBorderColor: 'black', resizerFillColor: '#FF4081', resizerSize: 8, selectionBorderThickness: 1, resizerShape: 'Square', selectorLineDashArray: [], resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges, resizerCursorType: null }, minHeight: 0, minWidth: 0, maxWidth: 0, maxHeight: 0, isLock: false, allowedInteractions: ['None'], isPrint: true })
    ], PdfViewer.prototype, "arrowSettings", void 0);
    __decorate([
        Property({ opacity: 1, fillColor: '#ffffff00', strokeColor: '#ff0000', author: 'Guest', thickness: 1, annotationSelectorSettings: { selectionBorderColor: '', resizerBorderColor: 'black', resizerFillColor: '#FF4081', resizerSize: 8, selectionBorderThickness: 1, resizerShape: 'Square', selectorLineDashArray: [], resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges, resizerCursorType: null }, minHeight: 0, minWidth: 0, maxWidth: 0, maxHeight: 0, isLock: false, allowedInteractions: ['None'], isPrint: true })
    ], PdfViewer.prototype, "rectangleSettings", void 0);
    __decorate([
        Property({ opacity: 1, fillColor: '#ffffff00', borderColor: '#ff0000', fontColor: '#000', fontSize: 16, labelHeight: 24.6, labelMaxWidth: 151, labelContent: 'Label' })
    ], PdfViewer.prototype, "shapeLabelSettings", void 0);
    __decorate([
        Property({ opacity: 1, fillColor: '#ffffff00', strokeColor: '#ff0000', author: 'Guest', thickness: 1, annotationSelectorSettings: { selectionBorderColor: '', resizerBorderColor: 'black', resizerFillColor: '#FF4081', resizerSize: 8, selectionBorderThickness: 1, resizerShape: 'Square', selectorLineDashArray: [], resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges, resizerCursorType: null }, minHeight: 0, minWidth: 0, maxWidth: 0, maxHeight: 0, isLock: false, allowedInteractions: ['None'], isPrint: true })
    ], PdfViewer.prototype, "circleSettings", void 0);
    __decorate([
        Property({ opacity: 1, fillColor: '#ffffff00', strokeColor: '#ff0000', author: 'Guest', thickness: 1, annotationSelectorSettings: { selectionBorderColor: '', resizerBorderColor: 'black', resizerFillColor: '#FF4081', resizerSize: 8, selectionBorderThickness: 1, resizerShape: 'Square', selectorLineDashArray: [], resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges, resizerCursorType: null }, minHeight: 0, minWidth: 0, maxWidth: 0, maxHeight: 0, isLock: false, allowedInteractions: ['None'], isPrint: true })
    ], PdfViewer.prototype, "polygonSettings", void 0);
    __decorate([
        Property({ opacity: 1, author: 'Guest', annotationSelectorSettings: { selectionBorderColor: '', resizerBorderColor: 'black', resizerFillColor: '#FF4081', resizerSize: 8, selectionBorderThickness: 1, resizerShape: 'Square', selectorLineDashArray: [], resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges, resizerCursorType: null }, minHeight: 0, minWidth: 0, maxWidth: 0, maxHeight: 0, isLock: false, dynamicStamps: [DynamicStampItem.Revised, DynamicStampItem.Reviewed, DynamicStampItem.Received, DynamicStampItem.Confidential, DynamicStampItem.Approved, DynamicStampItem.NotApproved], signStamps: [SignStampItem.Witness, SignStampItem.InitialHere, SignStampItem.SignHere, SignStampItem.Accepted, SignStampItem.Rejected], standardBusinessStamps: [StandardBusinessStampItem.Approved, StandardBusinessStampItem.NotApproved, StandardBusinessStampItem.Draft, StandardBusinessStampItem.Final, StandardBusinessStampItem.Completed, StandardBusinessStampItem.Confidential, StandardBusinessStampItem.ForPublicRelease, StandardBusinessStampItem.NotForPublicRelease, StandardBusinessStampItem.ForComment, StandardBusinessStampItem.Void, StandardBusinessStampItem.PreliminaryResults, StandardBusinessStampItem.InformationOnly], allowedInteractions: ['None'], isPrint: true })
    ], PdfViewer.prototype, "stampSettings", void 0);
    __decorate([
        Property({ opacity: 1, author: 'Guest', width: 0, height: 0, left: 0, top: 0, minHeight: 0, minWidth: 0, maxWidth: 0, maxHeight: 0, isLock: false, enableCustomStamp: true, allowedInteractions: ['None'], isPrint: true })
    ], PdfViewer.prototype, "customStampSettings", void 0);
    __decorate([
        Property({ opacity: 1, fillColor: '#ffffff00', strokeColor: '#ff0000', author: 'Guest', thickness: 1, borderDashArray: 0, lineHeadStartStyle: 'Closed', lineHeadEndStyle: 'Closed', annotationSelectorSettings: { selectionBorderColor: '', resizerBorderColor: 'black', resizerFillColor: '#FF4081', resizerSize: 8, selectionBorderThickness: 1, resizerShape: 'Square', selectorLineDashArray: [], resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges, resizerCursorType: null }, minHeight: 0, minWidth: 0, maxWidth: 0, maxHeight: 0, isLock: false, leaderLength: 40, resizeCursorType: CursorType.move, allowedInteractions: ['None'], isPrint: true })
    ], PdfViewer.prototype, "distanceSettings", void 0);
    __decorate([
        Property({ opacity: 1, fillColor: '#ffffff00', strokeColor: '#ff0000', author: 'Guest', thickness: 1, borderDashArray: 0, lineHeadStartStyle: 'Open', lineHeadEndStyle: 'Open', minHeight: 0, minWidth: 0, maxWidth: 0, maxHeight: 0, isLock: false, annotationSelectorSettings: { selectionBorderColor: '', resizerBorderColor: 'black', resizerFillColor: '#FF4081', resizerSize: 8, selectionBorderThickness: 1, resizerShape: 'Square', selectorLineDashArray: [], resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges, resizerCursorType: null }, allowedInteractions: ['None'], isPrint: true })
    ], PdfViewer.prototype, "perimeterSettings", void 0);
    __decorate([
        Property({ opacity: 1, fillColor: '#ffffff00', strokeColor: '#ff0000', author: 'Guest', thickness: 1, minHeight: 0, minWidth: 0, maxWidth: 0, maxHeight: 0, isLock: false, annotationSelectorSettings: { selectionBorderColor: '', resizerBorderColor: 'black', resizerFillColor: '#FF4081', resizerSize: 8, selectionBorderThickness: 1, resizerShape: 'Square', selectorLineDashArray: [], resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges, resizerCursorType: null }, allowedInteractions: ['None'], isPrint: true })
    ], PdfViewer.prototype, "areaSettings", void 0);
    __decorate([
        Property({ opacity: 1, fillColor: '#ffffff00', strokeColor: '#ff0000', author: 'Guest', thickness: 1, annotationSelectorSettings: { selectionBorderColor: '', resizerBorderColor: 'black', resizerFillColor: '#FF4081', resizerSize: 8, selectionBorderThickness: 1, resizerShape: 'Square', selectorLineDashArray: [], resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges, resizerCursorType: null }, minHeight: 0, minWidth: 0, maxWidth: 0, maxHeight: 0, isLock: false, allowedInteractions: ['None'], isPrint: true })
    ], PdfViewer.prototype, "radiusSettings", void 0);
    __decorate([
        Property({ opacity: 1, fillColor: '#ffffff00', strokeColor: '#ff0000', author: 'Guest', thickness: 1, minHeight: 0, minWidth: 0, maxWidth: 0, maxHeight: 0, isLock: false, annotationSelectorSettings: { selectionBorderColor: '', resizerBorderColor: 'black', resizerFillColor: '#FF4081', resizerSize: 8, selectionBorderThickness: 1, resizerShape: 'Square', selectorLineDashArray: [], resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges, resizerCursorType: null }, allowedInteractions: ['None'], isPrint: true })
    ], PdfViewer.prototype, "volumeSettings", void 0);
    __decorate([
        Property({ author: 'Guest', opacity: 1, annotationSelectorSettings: { selectionBorderColor: '', resizerBorderColor: 'black', resizerFillColor: '#FF4081', resizerSize: 8, selectionBorderThickness: 1, resizerShape: 'Square', selectorLineDashArray: [], resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges, resizerCursorType: null }, isLock: false, allowedInteractions: ['None'], isPrint: true })
    ], PdfViewer.prototype, "stickyNotesSettings", void 0);
    __decorate([
        Property({ opacity: 1, fillColor: '#ffffff00', borderColor: '#ffffff00', author: 'Guest', borderWidth: 1, width: 151, fontSize: 16, height: 24.6, fontColor: '#000', fontFamily: 'Helvetica', defaultText: 'Type Here', textAlignment: 'Left', fontStyle: FontStyle.None, allowTextOnly: false, annotationSelectorSettings: { selectionBorderColor: '', resizerBorderColor: 'black', resizerFillColor: '#FF4081', resizerSize: 8, selectionBorderThickness: 1, resizerShape: 'Square', selectorLineDashArray: [], resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges, resizerCursorType: null }, minHeight: 0, minWidth: 0, maxWidth: 0, maxHeight: 0, isLock: false, allowedInteractions: ['None'], isPrint: true, isReadonly: false, enableAutoFit: false })
    ], PdfViewer.prototype, "freeTextSettings", void 0);
    __decorate([
        Property({ conversionUnit: 'in', displayUnit: 'in', scaleRatio: 1, depth: 96 })
    ], PdfViewer.prototype, "measurementSettings", void 0);
    __decorate([
        Property({ selectionBorderColor: '', resizerBorderColor: 'black', resizerFillColor: '#FF4081', resizerSize: 8, selectionBorderThickness: 1, resizerShape: 'Square', selectorLineDashArray: [], resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges, resizerCursorType: null })
    ], PdfViewer.prototype, "annotationSelectorSettings", void 0);
    __decorate([
        Property({ searchHighlightColor: '#fdd835', searchColor: '#8b4c12' })
    ], PdfViewer.prototype, "textSearchColorSettings", void 0);
    __decorate([
        Property({ displayMode: DisplayMode.Draw | DisplayMode.Text | DisplayMode.Upload, hideSaveSignature: false })
    ], PdfViewer.prototype, "signatureDialogSettings", void 0);
    __decorate([
        Property({ displayMode: DisplayMode.Draw | DisplayMode.Text | DisplayMode.Upload, hideSaveSignature: false })
    ], PdfViewer.prototype, "initialDialogSettings", void 0);
    __decorate([
        Property({ signatureItem: ['Signature', 'Initial'], saveSignatureLimit: 1, saveInitialLimit: 1, opacity: 1, strokeColor: '#000000', width: 150, height: 100, thickness: 1, annotationSelectorSettings: { selectionBorderColor: '', resizerBorderColor: 'black', resizerFillColor: '#FF4081', resizerSize: 8, selectionBorderThickness: 1, resizerShape: 'Square', selectorLineDashArray: [], resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges, resizerCursorType: null }, allowedInteractions: ['None'], signatureDialogSettings: { displayMode: DisplayMode.Draw | DisplayMode.Text | DisplayMode.Upload, hideSaveSignature: false }, initialDialogSettings: { displayMode: DisplayMode.Draw | DisplayMode.Text | DisplayMode.Upload, hideSaveSignature: false } })
    ], PdfViewer.prototype, "handWrittenSignatureSettings", void 0);
    __decorate([
        Property({ author: 'Guest', opacity: 1, strokeColor: '#ff0000', thickness: 1, annotationSelectorSettings: { selectionBorderColor: '', resizerBorderColor: 'black', resizerFillColor: '#FF4081', resizerSize: 8, selectionBorderThickness: 1, resizerShape: 'Square', selectorLineDashArray: [], resizerLocation: AnnotationResizerLocation.Corners | AnnotationResizerLocation.Edges, resizerCursorType: null }, isLock: false, allowedInteractions: ['None'], isPrint: true })
    ], PdfViewer.prototype, "inkAnnotationSettings", void 0);
    __decorate([
        Property({ author: 'Guest', minHeight: 0, minWidth: 0, maxWidth: 0, maxHeight: 0, isLock: false, skipPrint: false, skipDownload: false, allowedInteractions: ['None'] })
    ], PdfViewer.prototype, "annotationSettings", void 0);
    __decorate([
        Property({ enableTileRendering: true, x: 0, y: 0 })
    ], PdfViewer.prototype, "tileRenderingSettings", void 0);
    __decorate([
        Property({ delayPageRequestTimeOnScroll: 100 })
    ], PdfViewer.prototype, "scrollSettings", void 0);
    __decorate([
        Property({ name: '', value: '', fontFamily: 'Helvetica', fontSize: 10, fontStyle: 'None', color: 'black', borderColor: 'black', backgroundColor: 'white', alignment: 'Left', isReadOnly: false, visibility: 'visible', maxLength: 0, isRequired: false, isPrint: true, tooltip: '', thickness: 1, isMultiline: false })
    ], PdfViewer.prototype, "textFieldSettings", void 0);
    __decorate([
        Property({ name: '', value: '', fontFamily: 'Helvetica', fontSize: 10, fontStyle: 'None', color: 'black', borderColor: 'black', backgroundColor: 'white', alignment: 'Left', isReadOnly: false, visibility: 'visible', maxLength: 0, isRequired: false, isPrint: true, tooltip: '', thickness: 1 })
    ], PdfViewer.prototype, "passwordFieldSettings", void 0);
    __decorate([
        Property({ name: '', isChecked: false, backgroundColor: 'white', isReadOnly: false, visibility: 'visible', isPrint: true, tooltip: '', isRequired: false, thickness: 1, borderColor: 'black' })
    ], PdfViewer.prototype, "checkBoxFieldSettings", void 0);
    __decorate([
        Property({ name: '', isSelected: false, backgroundColor: 'white', isReadOnly: false, visibility: 'visible', isPrint: true, tooltip: '', isRequired: false, thickness: 1, borderColor: 'black' })
    ], PdfViewer.prototype, "radioButtonFieldSettings", void 0);
    __decorate([
        Property({ name: '', fontFamily: 'Helvetica', fontSize: 10, fontStyle: 'None', color: 'black', backgroundColor: 'white', alignment: 'Left', isReadOnly: false, visibility: 'visible', isRequired: false, isPrint: true, tooltip: '', options: [], thickness: 1, borderColor: 'black' })
    ], PdfViewer.prototype, "DropdownFieldSettings", void 0);
    __decorate([
        Property({ name: '', fontFamily: 'Helvetica', fontSize: 10, fontStyle: 'None', color: 'black', backgroundColor: 'white', alignment: 'Left', isReadOnly: false, visibility: 'visible', isRequired: false, isPrint: false, tooltip: '', options: [], thickness: 1, borderColor: 'black' })
    ], PdfViewer.prototype, "listBoxFieldSettings", void 0);
    __decorate([
        Property({ contextMenuAction: 'RightClick', contextMenuItems: [ContextMenuItem.Comment, ContextMenuItem.Copy, ContextMenuItem.Cut, ContextMenuItem.Delete, ContextMenuItem.Highlight, ContextMenuItem.Paste, ContextMenuItem.Properties, ContextMenuItem.ScaleRatio, ContextMenuItem.Strikethrough, ContextMenuItem.Underline] })
    ], PdfViewer.prototype, "contextMenuSettings", void 0);
    __decorate([
        Complex({}, Selector)
    ], PdfViewer.prototype, "selectedItems", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "created", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "documentLoad", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "documentUnload", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "documentLoadFailed", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "ajaxRequestFailed", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "ajaxRequestSuccess", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "validateFormFields", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "pageClick", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "pageChange", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "hyperlinkClick", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "hyperlinkMouseOver", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "zoomChange", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "annotationAdd", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "annotationRemove", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "annotationPropertiesChange", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "annotationResize", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "addSignature", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "removeSignature", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "moveSignature", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "signaturePropertiesChange", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "resizeSignature", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "signatureSelect", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "annotationSelect", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "annotationUnSelect", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "annotationDoubleClick", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "annotationMove", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "annotationMoving", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "annotationMouseover", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "annotationMouseLeave", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "pageMouseover", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "importStart", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "exportStart", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "importSuccess", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "exportSuccess", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "importFailed", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "exportFailed", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "extractTextCompleted", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "thumbnailClick", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "bookmarkClick", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "textSelectionStart", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "textSelectionEnd", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "downloadStart", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "buttonFieldClick", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "formFieldClick", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "downloadEnd", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "printStart", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "printEnd", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "textSearchStart", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "textSearchComplete", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "textSearchHighlight", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "ajaxRequestInitiate", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "commentAdd", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "commentEdit", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "commentDelete", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "commentSelect", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "commentStatusChanged", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "beforeAddFreeText", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "formFieldFocusOut", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "formFieldAdd", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "formFieldRemove", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "formFieldPropertiesChange", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "formFieldMouseLeave", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "formFieldMouseover", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "formFieldMove", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "formFieldResize", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "formFieldSelect", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "formFieldUnselect", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "formFieldDoubleClick", void 0);
    __decorate([
        Collection([], PdfAnnotationBase)
    ], PdfViewer.prototype, "annotations", void 0);
    __decorate([
        Collection([], PdfFormFieldBase)
    ], PdfViewer.prototype, "formFields", void 0);
    __decorate([
        Property()
    ], PdfViewer.prototype, "drawingObject", void 0);
    PdfViewer = __decorate([
        NotifyPropertyChanges
    ], PdfViewer);
    return PdfViewer;
}(Component));
export { PdfViewer };
