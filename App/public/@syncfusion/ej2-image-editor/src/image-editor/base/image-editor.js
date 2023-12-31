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
import { Component, NotifyPropertyChanges, Property, addClass, removeClass, extend, isBlazor } from '@syncfusion/ej2-base';
import { Event, EventHandler, getComponent, isNullOrUndefined, getUniqueID } from '@syncfusion/ej2-base';
import { createSpinner } from '@syncfusion/ej2-popups';
import { Complex, Browser, ChildProperty, compile as templateCompiler, compile } from '@syncfusion/ej2-base';
import { ToolbarModule, Crop, Draw, Filter, FreehandDrawing, Selection, Shape, Transform, UndoRedo, Export } from './../index';
import { ZoomTrigger, ImageFinetuneOption } from './../index';
/**
 * This interface is used to specify settings for finetuning operations on images, including brightness, contrast, hue, saturation, exposure, opacity, and blur. It includes properties for setting minimum and maximum values for each of these options, as well as a default value.
 */
var FinetuneSettings = /** @class */ (function (_super) {
    __extends(FinetuneSettings, _super);
    function FinetuneSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], FinetuneSettings.prototype, "brightness", void 0);
    __decorate([
        Property(null)
    ], FinetuneSettings.prototype, "contrast", void 0);
    __decorate([
        Property(null)
    ], FinetuneSettings.prototype, "hue", void 0);
    __decorate([
        Property(null)
    ], FinetuneSettings.prototype, "saturation", void 0);
    __decorate([
        Property(null)
    ], FinetuneSettings.prototype, "exposure", void 0);
    __decorate([
        Property(null)
    ], FinetuneSettings.prototype, "opacity", void 0);
    __decorate([
        Property(null)
    ], FinetuneSettings.prototype, "blur", void 0);
    return FinetuneSettings;
}(ChildProperty));
export { FinetuneSettings };
/**
 * An interface used to define the settings such as minimum, maximum, and default zoom factors, and the type of zooming which are available in the image editor control.
 */
var ZoomSettings = /** @class */ (function (_super) {
    __extends(ZoomSettings, _super);
    function ZoomSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], ZoomSettings.prototype, "zoomTrigger", void 0);
    __decorate([
        Property(1)
    ], ZoomSettings.prototype, "minZoomFactor", void 0);
    __decorate([
        Property(10)
    ], ZoomSettings.prototype, "maxZoomFactor", void 0);
    __decorate([
        Property(1)
    ], ZoomSettings.prototype, "zoomFactor", void 0);
    __decorate([
        Property(null)
    ], ZoomSettings.prototype, "zoomPoint", void 0);
    return ZoomSettings;
}(ChildProperty));
export { ZoomSettings };
/**
 * This interface is used to specify settings for selection operations on images, including visibility, stroke color and fill color.
 */
var SelectionSettings = /** @class */ (function (_super) {
    __extends(SelectionSettings, _super);
    function SelectionSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(true)
    ], SelectionSettings.prototype, "showCircle", void 0);
    __decorate([
        Property(null)
    ], SelectionSettings.prototype, "strokeColor", void 0);
    __decorate([
        Property(null)
    ], SelectionSettings.prototype, "fillColor", void 0);
    return SelectionSettings;
}(ChildProperty));
export { SelectionSettings };
/**
 * The Image Editor is a graphical user interface for editing images.
 *
 * {% codeBlock src='image-editor/default/index.md' %}{% endcodeBlock %}
 *
 * @remarks
 * The Image Editor component provides various image editing features such as zooming, cropping, rotating, inserting text and shapes (rectangles, ellipses, and lines), drawing freehand on top of an image, undo/redo, and more.
 *
 */
var ImageEditor = /** @class */ (function (_super) {
    __extends(ImageEditor, _super);
    /**
     *
     * Constructor for creating the widget
     *
     * @param  {ImageEditorModel} options - Specifies the image editor model
     * @param  {string|HTMLDivElement} element - Specifies the target element
     */
    function ImageEditor(options, element) {
        var _this = _super.call(this, options) || this;
        /**
         *
         * Image Editor Private Properties
         */
        /** @hidden */
        _this.isImageLoaded = false;
        /** @hidden */
        _this.activeObj = { activePoint: { startX: 0, startY: 0, endX: 0, endY: 0, width: 0, height: 0 },
            flipObjColl: [], triangle: [], triangleRatio: [], rotatedAngle: 0 };
        // current object's ui interaction properties
        /** @hidden */
        _this.currObjType = { shape: '', isDragging: false, isActiveObj: false, isText: false, isInitialText: false, isLine: false, isInitialLine: false,
            isCustomCrop: false, isZoomed: false, isUndoZoom: false, isUndoAction: false, isFiltered: false, isSave: false, isResize: false };
        /** @hidden */
        _this.objColl = [];
        /** @hidden */
        // eslint-disable-next-line
        _this.pointColl = {};
        /** @hidden */
        _this.freehandCounter = 0;
        /** @hidden */
        _this.points = [];
        /** @hidden */
        _this.togglePen = false;
        /** @hidden */
        _this.togglePan = false;
        /** @hidden */
        _this.img = { destLeft: 0, destTop: 0, destWidth: 0, destHeight: 0, srcLeft: 0, srcTop: 0, srcWidth: 0, srcHeight: 0 };
        /** @hidden */
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        _this.rotateFlipColl = [];
        // All prop values saved while cropping (to restore the image to its original state)
        /** @hidden */
        _this.cropObj = { cropZoom: 0, defaultZoom: 0, totalPannedPoint: { x: 0, y: 0 }, totalPannedClientPoint: { x: 0, y: 0 },
            totalPannedInternalPoint: { x: 0, y: 0 }, tempFlipPanPoint: { x: 0, y: 0 }, activeObj: {}, rotateFlipColl: [],
            degree: 0, currFlipState: '', destPoints: { startX: 0, startY: 0, width: 0, height: 0 },
            srcPoints: { startX: 0, startY: 0, width: 0, height: 0 }, filter: '', isBrightAdjust: false,
            zoomFactor: 0, previousZoomValue: 0 };
        // Stored transformations performed after cropping
        /** @hidden */
        _this.afterCropActions = [];
        /** @hidden */
        _this.transform = { degree: 0, currFlipState: '', zoomFactor: 0, cropZoomFactor: null, defaultZoomFactor: 0 };
        /** @hidden */
        _this.panPoint = { currentPannedPoint: { x: 0, y: 0 }, totalPannedPoint: { x: 0, y: 0 }, totalPannedInternalPoint: { x: 0, y: 0 },
            totalPannedClientPoint: { x: 0, y: 0 } };
        /** @hidden */
        _this.isUndoRedo = false;
        /** @hidden */
        _this.isCropTab = false;
        /** @hidden */
        _this.isCircleCrop = false;
        /** @hidden */
        _this.fontSizeColl = [];
        /** @hidden */
        _this.initialAdjustmentValue = '';
        /** @hidden */
        _this.currentFilter = '';
        /** @hidden */
        _this.canvasFilter = 'brightness(' + 1 + ') ' + 'contrast(' + 100 + '%) ' + 'hue-rotate(' + 0 + 'deg) ' +
            'saturate(' + 100 + '%) ' + 'opacity(' + 1 + ') ' + 'blur(' + 0 + 'px) ' + 'sepia(0%) ' + 'grayscale(0%) ' + 'invert(0%)';
        /** @hidden */
        _this.toolbarHeight = 0;
        /** @hidden */
        _this.isPublicMethod = false;
        /** @hidden */
        _this.isCropToolbar = false;
        /** @hidden */
        _this.cursor = 'default';
        if (!isBlazor()) {
            ImageEditor_1.Inject(Crop, Draw, Selection, Transform, Export, ToolbarModule);
            ImageEditor_1.Inject(UndoRedo);
            ImageEditor_1.Inject(Filter);
            ImageEditor_1.Inject(Shape);
            ImageEditor_1.Inject(FreehandDrawing);
            if (element) {
                _this.appendTo(element);
            }
        }
        else {
            new Crop(_this);
            new Draw(_this);
            new Filter(_this);
            new FreehandDrawing(_this);
            new Selection(_this);
            new Shape(_this);
            new Transform(_this);
            new UndoRedo(_this);
            new Export(_this);
        }
        return _this;
    }
    ImageEditor_1 = ImageEditor;
    /**
     * To provide the array of modules needed for component rendering.
     *
     * @returns {ModuleDeclaration[]} - To provide the array of modules needed for component rendering.
     * @hidden
     */
    ImageEditor.prototype.requiredModules = function () {
        var modules = [];
        modules.push({ member: 'crop', args: [this] });
        modules.push({ member: 'draw', args: [this] });
        modules.push({ member: 'selection', args: [this] });
        modules.push({ member: 'transform', args: [this] });
        modules.push({ member: 'export', args: [this] });
        modules.push({ member: 'toolbar-module', args: [this] });
        modules.push({ member: 'undo-redo', args: [this] });
        modules.push({ member: 'filter', args: [this] });
        modules.push({ member: 'shape', args: [this] });
        modules.push({ member: 'freehand-draw', args: [this] });
        return modules;
    };
    ImageEditor.prototype.preRender = function () {
        // pre render code snippets
        this.element.id = this.element.id || getUniqueID('ej2-image-editor');
        if (Browser.isDevice) {
            this.element.classList.add('e-device');
        }
        this.initializeThemeColl();
    };
    /**
     *
     * To Initialize the component rendering
     *
     * @private
     * @returns {void}
     */
    ImageEditor.prototype.render = function () {
        this.initialize();
    };
    /**
     * To get component name.
     *
     * @returns {string} - Module Name
     * @private
     */
    ImageEditor.prototype.getModuleName = function () {
        return 'image-editor';
    };
    /**
     *
     * To get the properties to be maintained in the persisted state.
     *
     * @returns {string} - Persist data
     * @private
     */
    ImageEditor.prototype.getPersistData = function () {
        return this.addOnPersist([]);
    };
    /**
     *
     * Called internally if any of the property value changed.
     *
     * @param {ImageEditorModel} newProperties - Specifies new properties
     * @param {ImageEditorModel} oldProperties - Specifies old properties
     * @returns {void}
     * @private
     */
    ImageEditor.prototype.onPropertyChanged = function (newProperties, oldProperties) {
        for (var _i = 0, _a = Object.keys(newProperties); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'cssClass':
                    if (oldProperties.cssClass) {
                        removeClass([this.element], oldProperties.cssClass.replace(/\s+/g, ' ').trim().split(' '));
                    }
                    if (newProperties.cssClass) {
                        addClass([this.element], newProperties.cssClass.replace(/\s+/g, ' ').trim().split(' '));
                    }
                    break;
                case 'disabled':
                    if (newProperties.disabled) {
                        this.element.classList.add('e-disabled');
                        this.unwireEvent();
                    }
                    else {
                        this.element.classList.remove('e-disabled');
                        this.wireEvent();
                    }
                    break;
                case 'height':
                    this.element.style.height = newProperties.height;
                    break;
                case 'width':
                    this.element.style.width = newProperties.width;
                    break;
                case 'theme':
                    if (newProperties.theme) {
                        if (this.theme && this.theme !== '') {
                            this.theme = this.toPascalCase(this.theme);
                        }
                        else {
                            this.theme = 'Bootstrap5';
                        }
                        this.upperContext.strokeStyle = this.themeColl[this.theme]['primaryColor'];
                        this.upperContext.fillStyle = this.themeColl[this.theme]['secondaryColor'];
                    }
                    break;
                case 'finetuneSettings':
                    if (newProperties.finetuneSettings) {
                        this.finetuneSettings = newProperties.finetuneSettings;
                        this.notify('filter', { prop: 'update-finetunes' });
                    }
                    break;
                case 'locale':
                    if (newProperties.locale) {
                        this.notify('toolbar', { prop: 'setLocale', onPropertyChange: false, value: { locale: newProperties.locale } });
                        this.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'main',
                                isApplyBtn: null, isCropping: null, isZooming: null, cType: null } });
                    }
                    break;
                case 'allowUndoRedo':
                    if (newProperties.allowUndoRedo) {
                        this.allowUndoRedo = true;
                    }
                    else {
                        this.allowUndoRedo = false;
                    }
                    this.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'main',
                            isApplyBtn: null, isCropping: null, isZooming: null, cType: null } });
                    break;
                case 'showQuickAccessToolbar':
                    if (newProperties.showQuickAccessToolbar) {
                        this.showQuickAccessToolbar = true;
                        this.notify('toolbar', { prop: 'create-qa-toolbar', onPropertyChange: false });
                        this.notify('toolbar', { prop: 'renderQAT', onPropertyChange: false, value: { isPenEdit: null } });
                    }
                    else {
                        this.showQuickAccessToolbar = false;
                        this.notify('toolbar', { prop: 'destroy-qa-toolbar', onPropertyChange: false });
                    }
                    break;
                case 'zoomSettings':
                    if (newProperties.zoomSettings) {
                        this.zoomSettings.zoomTrigger = newProperties.zoomSettings.zoomTrigger;
                    }
                    if (isNullOrUndefined(this.zoomSettings.zoomTrigger)) {
                        this.zoomSettings.zoomTrigger = (ZoomTrigger.MouseWheel | ZoomTrigger.Pinch | ZoomTrigger.Toolbar |
                            ZoomTrigger.Commands);
                        this.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'main',
                                isApplyBtn: null, isCropping: null, isZooming: null, cType: null } });
                    }
                    else if ((newProperties.zoomSettings.zoomTrigger & ZoomTrigger.Toolbar) === ZoomTrigger.Toolbar) {
                        this.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'main',
                                isApplyBtn: null, isCropping: null, isZooming: null, cType: null } });
                    }
                    break;
                case 'selectionSettings':
                    if (newProperties.selectionSettings) {
                        this.selectionSettings = newProperties.selectionSettings;
                        if (this.activeObj.shape) {
                            this.upperContext.clearRect(0, 0, this.upperCanvas.width, this.upperCanvas.height);
                            this.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate', obj: this.activeObj } });
                        }
                    }
                    break;
            }
        }
    };
    ImageEditor.prototype.destroy = function () {
        var classList = [];
        this.element.removeAttribute('tabindex');
        if (this.cssClass) {
            classList = classList.concat(this.cssClass.replace(/\s+/g, ' ').trim().split(' '));
        }
        removeClass([this.element], classList);
        if (!this.element.getAttribute('class')) {
            this.element.removeAttribute('class');
        }
        if (!isBlazor()) {
            this.notify('toolbar', { prop: 'destroySubComponents', onPropertyChange: false });
            this.notify('destroyed', null);
            _super.prototype.destroy.call(this);
        }
        else {
            this.element.classList.remove('e-image-editor');
        }
        this.unwireEvent();
        this.element.innerHTML = '';
    };
    ImageEditor.prototype.initialize = function () {
        if (this.toolbarTemplate) {
            this.element.appendChild(this.createElement('div', {
                id: this.element.id + '_toolbarArea', className: 'e-toolbar-area'
            }));
            this.toolbarTemplateFn();
        }
        else {
            this.notify('toolbar', { prop: 'create-toolbar', onPropertyChange: false });
            this.notify('toolbar', { prop: 'create-contextual-toolbar', onPropertyChange: false });
        }
        this.createCanvas();
        if (this.showQuickAccessToolbar) {
            var canvasWrapper = document.querySelector('#' + this.element.id + '_canvasWrapper');
            canvasWrapper.appendChild(this.createElement('div', {
                id: this.element.id + '_quickAccessToolbarArea', className: 'e-quick-access-toolbar-area'
            }));
            var quickAccessToolbar = document.getElementById(this.element.id + '_quickAccessToolbarArea');
            quickAccessToolbar.style.position = 'absolute';
            quickAccessToolbar.style.display = 'none';
            if (this.activeObj) {
                quickAccessToolbar.style.left = this.activeObj.activePoint.startX + 'px';
                quickAccessToolbar.style.top = this.activeObj.activePoint.startY + 'px';
            }
            quickAccessToolbar.style.width = '100%';
        }
        if (this.quickAccessToolbarTemplate) {
            this.quickAccessToolbarTemplateFn();
        }
        else {
            this.notify('toolbar', { prop: 'create-qa-toolbar', onPropertyChange: false });
        }
        this.wireEvent();
        this.lowerContext = this.lowerCanvas.getContext('2d');
        this.upperContext = this.upperCanvas.getContext('2d');
        this.inMemoryContext = this.inMemoryCanvas.getContext('2d');
        this.lowerContext.filter = this.getDefaultFilter();
        this.notify('filter', { prop: 'setAdjustmentValue', onPropertyChange: false, value: { adjustmentValue: this.lowerContext.filter } });
        this.canvasFilter = this.lowerContext.filter;
        this.notify('toolbar', { prop: 'setInitialAdjustmentValue', onPropertyChange: false, value: { value: this.lowerContext.filter } });
        if (this.cssClass) {
            addClass([this.element], this.cssClass.replace(/\s+/g, ' ').trim().split(' '));
        }
        if (this.element) {
            createSpinner({
                target: this.element
            });
        }
        this.initializeZoomSettings();
    };
    /**
     *
     * This Method will add events to component (element, event, method, current reference)
     *
     * @returns {void}.
     */
    ImageEditor.prototype.wireEvent = function () {
        EventHandler.add(document, 'keydown', this.keyDownEventHandler, this);
        EventHandler.add(document, 'keypress', this.keyUpEventHandler, this);
        EventHandler.add(this.upperCanvas, 'mousedown', this.mouseDownEventHandler, this);
        EventHandler.add(this.upperCanvas, 'mousemove', this.mouseMoveEventHandler, this);
        EventHandler.add(this.upperCanvas, 'mouseup', this.mouseUpEventHandler, this);
        EventHandler.add(document, 'mouseup', this.mouseUpEventHandler, this);
        EventHandler.add(this.lowerCanvas, 'mousedown', this.canvasMouseDownHandler, this);
        EventHandler.add(this.lowerCanvas, 'mousemove', this.canvasMouseMoveHandler, this);
        EventHandler.add(this.lowerCanvas, 'mouseup', this.canvasMouseUpHandler, this);
        EventHandler.add(document, 'mouseup', this.canvasMouseUpHandler, this);
        EventHandler.add(this.upperCanvas, 'touchstart', this.touchStartHandler, this);
        EventHandler.add(this.lowerCanvas, 'touchstart', this.touchStartHandler, this);
        EventHandler.add(this.lowerCanvas, 'mousewheel DOMMouseScroll', this.handleScroll, this);
        EventHandler.add(this.upperCanvas, 'mousewheel DOMMouseScroll', this.handleScroll, this);
        window.addEventListener('resize', this.windowResizeHandler.bind(this));
        if ((!Browser.isIos && Browser.info.name !== 'safari')) {
            screen.orientation.addEventListener('change', this.screenOrientation.bind(this));
        }
        this.notify('shape', { prop: 'wireEvent', onPropertyChange: false });
    };
    /**
     *
     * This Method will remove events from component
     *
     * @returns {void}.
     */
    ImageEditor.prototype.unwireEvent = function () {
        EventHandler.remove(document, 'keydown', this.keyDownEventHandler);
        EventHandler.remove(document, 'keypress', this.keyUpEventHandler);
        EventHandler.remove(this.upperCanvas, 'mousedown', this.mouseDownEventHandler);
        EventHandler.remove(this.upperCanvas, 'mousemove', this.mouseMoveEventHandler);
        EventHandler.remove(this.upperCanvas, 'mouseup', this.mouseUpEventHandler);
        EventHandler.remove(document, 'mouseup', this.mouseUpEventHandler);
        EventHandler.remove(this.lowerCanvas, 'mousedown', this.canvasMouseDownHandler);
        EventHandler.remove(this.lowerCanvas, 'mousemove', this.canvasMouseMoveHandler);
        EventHandler.remove(this.lowerCanvas, 'mouseup', this.canvasMouseUpHandler);
        EventHandler.remove(document, 'mouseup', this.canvasMouseUpHandler);
        EventHandler.remove(this.upperCanvas, 'touchstart', this.touchStartHandler);
        EventHandler.remove(this.lowerCanvas, 'touchstart', this.touchStartHandler);
        EventHandler.remove(this.lowerCanvas, 'mousewheel DOMMouseScroll', this.handleScroll);
        EventHandler.remove(this.upperCanvas, 'mousewheel DOMMouseScroll', this.handleScroll);
        window.removeEventListener('resize', this.windowResizeHandler.bind(this));
        if ((!Browser.isIos && Browser.info.name !== 'safari')) {
            screen.orientation.removeEventListener('change', this.screenOrientation.bind(this));
        }
        this.notify('shape', { prop: 'unWireEvent', onPropertyChange: false });
        this.notify('selection', { prop: 'unWireEvent', onPropertyChange: false });
    };
    ImageEditor.prototype.createCanvas = function () {
        this.element.style.boxSizing = 'border-box';
        var obj = { toolbarHeight: 0 };
        this.notify('toolbar', { prop: 'getToolbarHeight', value: { obj: obj } });
        var height = obj['toolbarHeight'];
        this.element.style.width = this.width;
        this.element.style.height = this.height;
        var canvasWrapper = this.element.appendChild(this.createElement('div', { id: this.element.id + '_canvasWrapper',
            className: 'e-canvas-wrapper', attrs: { style: 'height:' + (this.element.offsetHeight - height - 2) + 'px; width:' +
                    (this.element.offsetWidth - 2)
                    + 'px; position: relative; overflow: hidden; margin: 0 auto;' }
        }));
        this.lowerCanvas = canvasWrapper.appendChild(this.createElement('canvas', {
            id: this.element.id + '_lowerCanvas', attrs: { name: 'canvasImage' }
        }));
        this.upperCanvas = canvasWrapper.appendChild(this.createElement('canvas', {
            id: this.element.id + '_upperCanvas', attrs: { name: 'canvasImage' }
        }));
        this.inMemoryCanvas = this.createElement('canvas', {
            id: this.element.id + '_inMemoryCanvas', attrs: { name: 'canvasImage' }
        });
        this.textArea = canvasWrapper.appendChild(this.createElement('textarea', {
            id: this.element.id + '_textArea', className: 'e-textarea', attrs: { name: 'textArea' }
        }));
        var dialog = this.element.appendChild(this.createElement('div', {
            id: this.element.id + '_dialog', className: 'e-dialog'
        }));
        dialog.style.display = 'none';
        this.textArea.setAttribute('spellcheck', 'false');
        this.textArea.style.lineHeight = 'normal';
        this.lowerCanvas.style.width = this.upperCanvas.style.width = this.inMemoryCanvas.style.width = '100%';
        this.lowerCanvas.style.height = this.upperCanvas.style.height = this.inMemoryCanvas.style.height = '100%';
        this.upperCanvas.style.position = this.lowerCanvas.style.position = this.textArea.style.position = 'absolute';
        this.textArea.style.backgroundColor = 'transparent';
        this.textArea.style.display = 'none';
        this.textArea.style.resize = 'none';
        this.lowerContext = this.lowerCanvas.getContext('2d');
        this.baseImg = this.createElement('img', {
            id: this.element.id + '_orgImg', attrs: { name: 'Image', crossorigin: 'anonymous' }
        });
        this.upperCanvas.style.cursor = this.cursor = 'default';
        this.upperCanvas.style.display = 'block';
        this.upperContext = this.upperCanvas.getContext('2d');
    };
    ImageEditor.prototype.touchStartHandler = function (e) {
        this.notify('selection', { prop: 'touchStartHandler', onPropertyChange: false, value: { e: e } });
    };
    ImageEditor.prototype.mouseDownEventHandler = function (e) {
        this.notify('selection', { prop: 'mouseDownEventHandler', onPropertyChange: false, value: { e: e } });
    };
    ImageEditor.prototype.mouseMoveEventHandler = function (e) {
        this.notify('selection', { prop: 'mouseMoveEventHandler', onPropertyChange: false, value: { e: e } });
    };
    ImageEditor.prototype.mouseUpEventHandler = function (e) {
        this.notify('selection', { prop: 'mouseUpEventHandler', onPropertyChange: false, value: { e: e } });
    };
    ImageEditor.prototype.keyDownEventHandler = function (e) {
        this.notify('selection', { prop: 'keyDownEventHandler', onPropertyChange: false, value: { e: e } });
    };
    ImageEditor.prototype.keyUpEventHandler = function (e) {
        // eslint-disable-next-line
        if (this.textArea.style.display === 'block' && e.target.id === this.element.id + '_textArea') {
            this.notify('selection', { prop: 'textKeyDown', value: { e: e } });
        }
    };
    ImageEditor.prototype.canvasMouseDownHandler = function (e) {
        this.notify('selection', { prop: 'canvasMouseDownHandler', onPropertyChange: false, value: { e: e } });
    };
    ImageEditor.prototype.canvasMouseMoveHandler = function (e) {
        this.notify('selection', { prop: 'canvasMouseMoveHandler', onPropertyChange: false, value: { e: e } });
    };
    ImageEditor.prototype.canvasMouseUpHandler = function (e) {
        this.notify('selection', { prop: 'canvasMouseUpHandler', onPropertyChange: false, value: { e: e } });
    };
    ImageEditor.prototype.handleScroll = function (e) {
        this.notify('selection', { prop: 'handleScroll', onPropertyChange: false, value: { e: e } });
    };
    ImageEditor.prototype.adjustToScreen = function () {
        this.update();
    };
    ImageEditor.prototype.screenOrientation = function () {
        if (Browser.isDevice) {
            setTimeout(this.adjustToScreen.bind(this), 100);
        }
    };
    ImageEditor.prototype.windowResizeHandler = function () {
        if (!Browser.isDevice && this.element.classList.contains('e-image-editor')) {
            this.adjustToScreen();
        }
    };
    ImageEditor.prototype.notifyResetForAllModules = function () {
        var modules = this.requiredModules();
        for (var i = 0; i < modules.length; i++) {
            this.notify(modules[i].member, { prop: 'reset', onPropertyChange: false });
        }
    };
    ImageEditor.prototype.allowShape = function (x, y) {
        this.isPublicMethod = true;
        var obj = { inRange: false };
        this.notify('shape', { prop: 'isPointsInRange', onPropertyChange: false,
            value: { x: x, y: y, obj: obj } });
        return obj['inRange'];
    };
    /**
     * Clears the current selection performed in the image editor.
     *
     * @returns {void}.
     */
    ImageEditor.prototype.clearSelection = function () {
        this.notify('selection', { prop: 'clearSelection', onPropertyChange: false });
    };
    /**
     * Crops an image based on the selection done in the image editor.
     *
     * {% codeBlock src='image-editor/crop/index.md' %}{% endcodeBlock %}
     *
     * @remarks
     * The selection can be done through programmatically using the 'select' method or through UI interactions.
     *
     * @returns {boolean}.
     *
     */
    ImageEditor.prototype.crop = function () {
        var obj = { isCrop: false };
        this.notify('crop', { prop: 'crop', onPropertyChange: false, value: { obj: obj } });
        return obj['isCrop'];
    };
    /**
     * Flips an image by horizontally or vertically in the image editor.
     *
     * {% codeBlock src='image-editor/zoom/index.md' %}{% endcodeBlock %}
     *
     * @param { Direction } direction - Specifies the direction to flip the image.
     * A horizontal direction for horizontal flipping and vertical direction for vertical flipping.
     *
     * @remarks
     * It flips the shapes including rectangle, circle, line, text, and freehand drawings.
     *
     * @returns {void}.
     *
     */
    ImageEditor.prototype.flip = function (direction) {
        this.notify('transform', { prop: 'flip', value: { direction: direction } });
        this.notify('undo-redo', { prop: 'updateCurrUrc', value: { type: 'ok' } });
    };
    /**
     * Returns an image as ImageData to load it in to a canvas.
     *
     * @remarks
     * The data returned from this method is directly drawn in a canvas using 'putImageData' method.
     * And then the user can get the base64 string from the canvas using toDataURL method.
     *
     * @returns {ImageData}.
     */
    ImageEditor.prototype.getImageData = function () {
        var obj = { canvas: null };
        this.notify('export', { prop: 'exportToCanvas', value: { object: obj } });
        return obj['canvas'].getContext('2d').getImageData(0, 0, obj['canvas'].width, obj['canvas'].height);
    };
    /**
     *  Opens an image as URL or ImageData for editing in an image editor.
     *
     * @param {string | ImageData } data - Specifies url of the image or image data.
     *
     * @remarks
     * The supported file types are JPG, JPEG, PNG, and SVG.
     *
     * @returns {void}.
     */
    ImageEditor.prototype.open = function (data) {
        this.notify('draw', { prop: 'open', value: { data: data } });
    };
    /**
     * Reset all the changes done in an image editor and revert to original image.
     *
     * @remarks
     * The undo redo collection also cleared while resetting the image editor.
     *
     * @returns {void}.
     */
    ImageEditor.prototype.reset = function () {
        var obj = { isErrorImage: false };
        this.notify('draw', { prop: 'getErrorImage', value: { obj: obj } });
        if (!this.disabled && !obj['isErrorImage']) {
            this.clearContext(this.inMemoryContext);
            this.clearContext(this.lowerContext);
            this.clearContext(this.upperContext);
            this.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
            if (!isBlazor()) {
                this.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'main',
                        isApplyBtn: false, isCropping: false, isZooming: null, cType: null } });
                if (Browser.isDevice && document.getElementById(this.element.id + '_bottomToolbar')) {
                    getComponent(document.getElementById(this.element.id + '_bottomToolbar'), 'toolbar').destroy();
                    this.notify('toolbar', { prop: 'create-bottom-toolbar', onPropertyChange: false });
                }
            }
            this.currObjType.isUndoAction = this.isUndoRedo = this.togglePan = this.togglePen = this.isImageLoaded = false;
            this.isCircleCrop = this.isCropTab = false;
            this.objColl = [];
            this.transform.degree = 0;
            this.upperCanvas.style.display = 'block';
            this.transform.currFlipState = '';
            this.upperCanvas.style.cursor = this.cursor = this.lowerCanvas.style.cursor = 'default';
            this.lowerContext.lineWidth = this.upperContext.lineWidth = undefined;
            this.textArea.value = this.textArea.textContent = '';
            this.textArea.style.display = 'none';
            this.lowerContext.filter = this.canvasFilter = this.getDefaultFilter();
            this.img.destLeft = this.img.destTop = this.img.srcLeft = this.img.srcTop = 0;
            this.img.destWidth = this.img.destHeight = this.img.srcWidth = this.img.srcHeight = null;
            this.currSelectionPoint = null;
            this.panPoint.currentPannedPoint = { x: 0, y: 0 };
            this.rotateFlipColl = [];
            this.points = [];
            this.pointColl = {};
            this.freehandCounter = 0;
            this.notify('draw', { prop: 'resetPanPoints' });
            this.lowerCanvas.style.left = this.upperCanvas.style.left = '';
            this.fontSizeColl = [];
            this.lowerCanvas.style.top = this.upperCanvas.style.top = '';
            this.lowerCanvas.style.maxWidth = this.upperCanvas.style.maxWidth = '';
            this.lowerCanvas.style.maxHeight = this.upperCanvas.style.maxHeight = '';
            this.transform.defaultZoomFactor = this.transform.zoomFactor = 0;
            this.transform.cropZoomFactor = null;
            this.currObjType = { shape: '', isDragging: false, isActiveObj: false, isText: false, isInitialText: false, isLine: false,
                isInitialLine: false, isCustomCrop: false, isZoomed: false, isUndoZoom: false,
                isUndoAction: false, isFiltered: false, isSave: false, isResize: false };
            this.cropObj = { cropZoom: 0, defaultZoom: 0, totalPannedPoint: { x: 0, y: 0 }, totalPannedClientPoint: { x: 0, y: 0 },
                totalPannedInternalPoint: { x: 0, y: 0 }, tempFlipPanPoint: { x: 0, y: 0 }, activeObj: {},
                rotateFlipColl: [], degree: 0, currFlipState: '', zoomFactor: 0, previousZoomValue: 0,
                destPoints: { startX: 0, startY: 0, width: 0, height: 0 },
                srcPoints: { startX: 0, startY: 0, width: 0, height: 0 }, filter: '', isBrightAdjust: false };
            this.afterCropActions = [];
            this.currentFilter = '';
            var obj_1 = { initialZoomValue: false };
            this.notify('draw', { prop: 'getInitialZoomValue', onPropertyChange: false, value: { obj: obj_1 } });
            if (obj_1['initialZoomValue']) {
                this.setProperties({ zoomSettings: { zoomFactor: obj_1['initialZoomValue'] } }, true);
            }
            if (document.getElementById(this.element.id + '_quickAccessToolbarArea')) {
                document.getElementById(this.element.id + '_quickAccessToolbarArea').style.display = 'none';
            }
            this.notifyResetForAllModules();
            this.notify('filter', { prop: 'update-finetunes' });
            this.isImageLoaded = false;
            this.notify('draw', { prop: 'update-canvas', onPropertyChange: false });
            this.isImageLoaded = true;
            if (!isBlazor()) {
                if (this.element.querySelector('.e-contextual-toolbar-wrapper')) {
                    this.element.querySelector('.e-contextual-toolbar-wrapper').classList.add('e-hide');
                }
                this.notify('toolbar', { prop: 'refresh-dropdown-btn', value: { isDisabled: false } });
                this.notify('toolbar', { prop: 'enable-disable-btns' });
            }
        }
    };
    /**
     * Rotate an image to clockwise and anti-clockwise.
     *
     * {% codeBlock src='image-editor/rotate/index.md' %}{% endcodeBlock %}
     *
     * @param {number} degree - Specifies a degree to rotate an image.
     * A positive integer value for clockwise and negative integer value for anti-clockwise rotation.
     *
     * @remarks
     * It rotated the shapes including rectangle, circle, line, text, and freehand drawings.
     *
     * @returns {boolean}.
     *
     */
    ImageEditor.prototype.rotate = function (degree) {
        var obj = { isRotate: false };
        this.notify('transform', { prop: 'rotate', value: { degree: degree, obj: obj } });
        this.notify('undo-redo', { prop: 'updateCurrUrc', value: { type: 'ok' } });
        return obj['isRotate'];
    };
    /**
     * Export an image using the specified file name and the extension.
     *
     * @param {string} type - Specifies a format of image to be saved.
     * @param {string} fileName – Specifies a file name to be saved
     *
     * @remarks
     * The supported file types are JPG, JPEG, PNG, and SVG.
     *
     * @returns {void}.
     */
    ImageEditor.prototype.export = function (type, fileName) {
        this.notify('export', { prop: 'export', onPropertyChange: false, value: { type: type, fileName: fileName } });
    };
    /**
     * Perform selection in an image editor. The selection helps to crop an image.
     *
     * {% codeBlock src='image-editor/select/index.md' %}{% endcodeBlock %}
     *
     * @param {string} type - Specifies the shape - circle / square / custom selection / pre-defined ratios.
     * @param {number} startX – Specifies the start x-coordinate point of the selection.
     * @param {number} startY – Specifies the start y-coordinate point of the selection.
     * @param {number} width - Specifies the width of the selection area.
     * @param {number} height - Specifies the height of the selection area.
     *
     * @remarks
     * The selection UI is based on the 'theme' property.
     *
     * @returns {void}.
     *
     */
    ImageEditor.prototype.select = function (type, startX, startY, width, height) {
        this.notify('draw', { prop: 'select', onPropertyChange: false,
            value: { type: type, startX: startX, startY: startY, width: width, height: height } });
    };
    /**
     * Enable or disable a freehand drawing option in an Image Editor.
     *
     * @param {boolean} value - Specifies a value whether to enable or disable freehand drawing.
     *
     * @returns {void}.
     * @private
     */
    ImageEditor.prototype.freeHandDraw = function (value) {
        this.notify('freehand-draw', { prop: 'freeHandDraw', onPropertyChange: false, value: { value: value } });
    };
    /**
     * Enable or disable a freehand drawing in an Image Editor.
     *
     * @param {boolean} value - Specifies a value whether to enable or disable freehand drawing.
     *
     * @remarks
     * User can directly drawing on a canvas after enabling this option.
     *
     * @returns {void}.
     */
    ImageEditor.prototype.freehandDraw = function (value) {
        if (!this.disabled && this.isImageLoaded) {
            this.freeHandDraw(value);
        }
    };
    /**
     * Enable or disable a panning on the Image Editor.
     *
     * @param {boolean} value - Specifies a value whether enable or disable panning.
     *
     * @remarks
     * This option will take into effect once the image's visibility is hidden when zooming an image or selection has been performed.
     *
     * @returns {void}.
     */
    ImageEditor.prototype.pan = function (value) {
        this.notify('transform', { prop: 'pan', onPropertyChange: false, value: { value: value } });
    };
    /**
     * Zoom in or out on a point in the image editor.
     *
     * @param {number} zoomFactor - The percentage-based zoom factor to use (e.g. 20 for 2x zoom).
     * @param {Point} zoomPoint - The point in the image editor to zoom in/out on.
     *
     * @remarks
     * Zooming directly enables the panning option when the image's visibility is hidden.
     * User can disable it by using 'Pan' method.
     * @returns {void}
     *
     */
    ImageEditor.prototype.zoom = function (zoomFactor, zoomPoint) {
        this.notify('transform', { prop: 'zoom', onPropertyChange: false,
            value: { zoomFactor: zoomFactor, zoomPoint: zoomPoint } });
    };
    /**
     * Draw ellipse on an image.
     *
     * {% codeBlock src='image-editor/ellipse/index.md' %}{% endcodeBlock %}
     *
     * @param {number} x - Specifies x-coordinate of ellipse.
     * @param {number} y - Specifies y-coordinate of ellipse.
     * @param {number} radiusX - Specifies the radius x point for the ellipse.
     * @param {number} radiusY - Specifies the radius y point for the ellipse.
     * @param {number} strokeWidth - Specifies the stroke width of ellipse.
     * @param {string} strokeColor - Specifies the stroke color of ellipse.
     * @param {string} fillColor - Specifies the fill color of the ellipse.
     * @returns {boolean}.
     *
     */
    ImageEditor.prototype.drawEllipse = function (x, y, radiusX, radiusY, strokeWidth, strokeColor, fillColor) {
        var isEllipse = false;
        var isPointsInRange = this.allowShape(x, y);
        if (!this.disabled && this.isImageLoaded && (isPointsInRange || (isNullOrUndefined(x) && isNullOrUndefined(y)))) {
            isEllipse = true;
            this.notify('shape', { prop: 'drawEllipse', onPropertyChange: false, value: { x: x, y: y, radiusX: radiusX, radiusY: radiusY,
                    strokeWidth: strokeWidth, strokeColor: strokeColor, fillColor: fillColor } });
        }
        return isEllipse;
    };
    /**
     * Draw line on an image.
     *
     * @param {number} startX – Specifies start point x-coordinate of line.
     * @param {number} startY – Specifies start point y-coordinate of line.
     * @param {number} endX - Specifies end point x-coordinates of line.
     * @param {number} endY - Specifies end point y-coordinates of the line.
     * @param {number} strokeWidth - Specifies the stroke width of line.
     * @param {string} strokeColor - Specifies the stroke color of line.
     * @returns {boolean}.
     */
    ImageEditor.prototype.drawLine = function (startX, startY, endX, endY, strokeWidth, strokeColor) {
        var isLine = false;
        var isPointsInRange = this.allowShape(startX, startY);
        if (!this.disabled && this.isImageLoaded && (isPointsInRange || (isNullOrUndefined(startX) && isNullOrUndefined(startY)))) {
            isLine = true;
            this.notify('shape', { prop: 'drawLine', onPropertyChange: false, value: { startX: startX, startY: startY, endX: endX,
                    endY: endY, strokeWidth: strokeWidth, strokeColor: strokeColor } });
        }
        return isLine;
    };
    /**
     * Draw arrow on an image.
     *
     * @param {number} startX – Specifies start point x-coordinate of arrow.
     * @param {number} startY – Specifies start point y-coordinate of arrow.
     * @param {number} endX - Specifies end point x-coordinates of arrow.
     * @param {number} endY - Specifies end point y-coordinates of the arrow.
     * @param {number} strokeWidth - Specifies the stroke width of arrow.
     * @param {string} strokeColor - Specifies the stroke color of arrow.
     * @param {ArrowheadType} arrowStart – Specifies the type of arrowhead for start position. The default value is ‘None’.
     * @param {ArrowheadType} arrowEnd – Specifies the type of arrowhead for end position. The default value is ‘SolidArrow’.
     * @returns {boolean}.
     */
    ImageEditor.prototype.drawArrow = function (startX, startY, endX, endY, strokeWidth, strokeColor, arrowStart, arrowEnd) {
        var isArrow = false;
        var isPointsInRange = this.allowShape(startX, startY);
        if (!this.disabled && this.isImageLoaded && (isPointsInRange || (isNullOrUndefined(startX) && isNullOrUndefined(startY)))) {
            isArrow = true;
            this.notify('shape', { prop: 'drawArrow', onPropertyChange: false, value: { startX: startX, startY: startY, endX: endX,
                    endY: endY, strokeWidth: strokeWidth, strokeColor: strokeColor, arrowStart: arrowStart, arrowEnd: arrowEnd } });
        }
        return isArrow;
    };
    /**
     * Draw path on an image.
     *
     * @param {Point[]} pointColl – Specifies collection of start and end x, y-coordinates of path.
     * @param {number} strokeWidth - Specifies the stroke width of path.
     * @param {string} strokeColor - Specifies the stroke color of path.
     * @returns {boolean}.
     */
    ImageEditor.prototype.drawPath = function (pointColl, strokeWidth, strokeColor) {
        this.isPublicMethod = true;
        var obj = { inRange: false };
        var isPath = false;
        if (pointColl && pointColl.length > 0) {
            for (var i = 0; i < pointColl.length; i++) {
                if (obj['inRange']) {
                    break;
                }
                this.notify('shape', { prop: 'isPointsInRange', onPropertyChange: false,
                    value: { x: pointColl[i].x, y: pointColl[i].y, obj: obj } });
            }
        }
        if (!this.disabled && this.isImageLoaded && (obj['inRange'] || isNullOrUndefined(pointColl))) {
            isPath = true;
            this.notify('shape', { prop: 'drawPath', onPropertyChange: false, value: { pointColl: pointColl,
                    strokeWidth: strokeWidth, strokeColor: strokeColor } });
        }
        return isPath;
    };
    /**
     * Draw a rectangle on an image.
     *
     * @param {number} x - Specifies x-coordinate of rectangle.
     * @param {number} y - Specifies y-coordinate of rectangle.
     * @param {number} width - Specifies the width of the rectangle.
     * @param {number} height - Specifies the height of the rectangle.
     * @param {number} strokeWidth - Specifies the stroke width of rectangle.
     * @param {string} strokeColor - Specifies the stroke color of rectangle.
     * @param {string} fillColor - Specifies the fill color of the rectangle.
     * @returns {boolean}.
     */
    ImageEditor.prototype.drawRectangle = function (x, y, width, height, strokeWidth, strokeColor, fillColor) {
        var isRectangle = false;
        var isPointsInRange = this.allowShape(x, y);
        if (!this.disabled && this.isImageLoaded && (isPointsInRange || (isNullOrUndefined(x) && isNullOrUndefined(y)))) {
            isRectangle = true;
            this.notify('shape', { prop: 'drawRectangle', onPropertyChange: false, value: { x: x, y: y, width: width, height: height,
                    strokeWidth: strokeWidth, strokeColor: strokeColor, fillColor: fillColor } });
        }
        return isRectangle;
    };
    /**
     * Draw a text on an image.
     *
     * {% codeBlock src='image-editor/text/index.md' %}{% endcodeBlock %}
     *
     * @param {number} x - Specifies x-coordinate of text.
     * @param {number} y - Specifies y-coordinate of text.
     * @param {string} text - Specifies the text to add on an image.
     * @param {string} fontFamily - Specifies the font family of the text.
     * @param {number} fontSize - Specifies the font size of the text.
     * @param {boolean} bold - Specifies whether the text is bold or not.
     * @param {boolean} italic - Specifies whether the text is italic or not.
     * @param {string} color - Specifies font color of the text.
     * @returns {boolean}.
     *
     */
    ImageEditor.prototype.drawText = function (x, y, text, fontFamily, fontSize, bold, italic, color) {
        var isText = false;
        var isPointsInRange = this.allowShape(x, y);
        if (!this.disabled && this.isImageLoaded && (isPointsInRange || (isNullOrUndefined(x) && isNullOrUndefined(y)))) {
            isText = true;
            this.notify('shape', { prop: 'drawText', onPropertyChange: false, value: { x: x, y: y, text: text, fontFamily: fontFamily,
                    fontSize: fontSize, bold: bold, italic: italic, color: color } });
        }
        return isText;
    };
    /**
     * Select a shape based on the given shape id.
     * Use 'getShapeSettings' method to get the shape id which is then passed to perform selection.
     *
     * {% codeBlock src='image-editor/selectShape/index.md' %}{% endcodeBlock %}
     *
     * @param {string} id - Specifies the shape id to select a shape on an image.
     * @returns {boolean}.
     *
     */
    ImageEditor.prototype.selectShape = function (id) {
        var obj = { isSelected: false };
        this.notify('shape', { prop: 'selectShape', onPropertyChange: false, value: { id: id, obj: obj } });
        return obj['isSelected'];
    };
    /**
     * Deletes a shape based on the given shape id.
     * Use 'getShapeSettings' method to get the shape id which is then passed to perform selection.
     *
     * {% codeBlock src='image-editor/deleteShape/index.md' %}{% endcodeBlock %}
     *
     * @param {string} id - Specifies the shape id to delete the shape on an image.
     * @returns {void}.
     *
     */
    ImageEditor.prototype.deleteShape = function (id) {
        this.notify('shape', { prop: 'deleteShape', onPropertyChange: false, value: { id: id } });
    };
    /**
     * Get particular shapes details based on id of the shape which is drawn on an image editor.
     *
     * {% codeBlock src='image-editor/getShapeSetting/index.md' %}{% endcodeBlock %}
     *
     * @param {string} id - Specifies the shape id on an image.
     * @returns {ShapeSettings}.
     *
     */
    ImageEditor.prototype.getShapeSetting = function (id) {
        var shapeDetails = {};
        this.notify('shape', { prop: 'getShapeSetting', onPropertyChange: false,
            value: { id: id, obj: shapeDetails } });
        return shapeDetails;
    };
    /**
     * Get all the shapes details which is drawn on an image editor.
     *
     * @returns {ShapeSettings[]}.
     */
    ImageEditor.prototype.getShapeSettings = function () {
        var obj = { shapeDetailsColl: [] };
        this.notify('shape', { prop: 'getShapeSettings', onPropertyChange: false, value: { obj: obj } });
        return obj['shapeDetailsColl'];
    };
    /**
     * To refresh the Canvas Wrapper.
     *
     * @returns {void}.
     */
    ImageEditor.prototype.update = function () {
        this.notify('transform', { prop: 'update' });
    };
    /**
     * Finetuning an image with the given type of finetune and its value in the image editor.
     *
     * @param {ImageFinetuneOption } finetuneOption - Specifies the finetune options to be performed in the image.
     * @param {number } value - Specifies the value for finetuning the image.
     *
     * @remarks
     * The finetuning will not affect the shapes background and border color.
     *
     * @returns {void}.
     *
     */
    ImageEditor.prototype.finetuneImage = function (finetuneOption, value) {
        if (!this.disabled && this.isImageLoaded) {
            this.notify('filter', { prop: 'finetuneImage', value: { value: value, option: finetuneOption } });
        }
    };
    /**
     * Filtering an image with the given type of filters.
     *
     * @param {ImageFilterOption } filterOption - Specifies the filter options to the image.
     *
     * @remarks
     * The filtering will not affect the shape's background and border color.
     * @returns {void}.
     */
    ImageEditor.prototype.applyImageFilter = function (filterOption) {
        if (!this.disabled && this.isImageLoaded) {
            this.notify('filter', { prop: 'applyImageFilter', value: { option: filterOption.toString() } });
            this.canvasFilter = this.lowerContext.filter;
            this.notify('undo-redo', { prop: 'updateCurrUrc', value: { type: 'ok' } });
        }
    };
    /**
     * Reverse the last action which performed by the user in the Image Editor.
     *
     * @remarks
     * This method will take into effect once the 'allowUndoRedo' property is enabled.
     *
     * @returns {void}.
     */
    ImageEditor.prototype.undo = function () {
        this.notify('undo-redo', { prop: 'undo', onPropertyChange: false });
    };
    /**
     * Redo the last user action that was undone by the user or `undo` method.
     *
     * @remarks
     * This method will take into effect once the 'allowUndoRedo' property is enabled.
     * @returns {void}.
     */
    ImageEditor.prototype.redo = function () {
        this.notify('undo-redo', { prop: 'redo', onPropertyChange: false });
    };
    /**
     * Get the dimension of an image in the image editor such as x, y, width, and height.
     * The method helps to get dimension after cropped an image.
     *
     * @returns {Dimension}.
     * A Dimension object containing the x, y, width, and height of an image.
     */
    ImageEditor.prototype.getImageDimension = function () {
        return { x: this.img.destLeft, y: this.img.destTop, width: this.img.destWidth, height: this.img.destHeight };
    };
    // Toolbar related codes
    ImageEditor.prototype.toolbarTemplateFn = function () {
        var template;
        var templateID = this.element.id + '_toolbar';
        var toolbarArea = this.element.querySelector('#' + this.element.id + '_toolbarArea');
        if (this.toolbarTemplate) {
            this.toolbarFn = this.templateParser(this.toolbarTemplate);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (this.isReact) {
                template = this.toolbarFn({ type: 'toolbar' }, this, 'Template', templateID)[0];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }
            else if (this.isAngular) {
                var templateColl = this.toolbarFn({ type: 'toolbar' }, this, 'Template', templateID);
                template = (templateColl[0].nodeType === 3) ? templateColl[1] : templateColl[0];
            }
            else {
                template = this.toolbarFn({ type: 'toolbar' }, this, 'Template', templateID)[0];
            }
            toolbarArea.appendChild(template);
            this.toolbarHeight = toolbarArea.clientHeight;
            this.notify('toolbar', { prop: 'setToolbarHeight', value: { height: this.toolbarHeight } });
            this['renderReactTemplates']();
        }
    };
    ImageEditor.prototype.quickAccessToolbarTemplateFn = function () {
        var template;
        var templateID = this.element.id + '_quickAccessToolbar';
        var toolbarArea = this.element.querySelector('#' + this.element.id + '_quickAccessToolbarArea');
        if (this.quickAccessToolbarTemplate) {
            this.qatFn = this.templateParser(this.quickAccessToolbarTemplate);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (this.isReact) {
                template = this.qatFn({ type: 'toolbar' }, this, 'Template', templateID)[0];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }
            else if (this.isAngular) {
                var templateColl = this.qatFn({ type: 'toolbar' }, this, 'Template', templateID);
                template = (templateColl[0].nodeType === 3) ? templateColl[1] : templateColl[0];
            }
            else {
                template = this.qatFn({ type: 'toolbar' }, this, 'Template', templateID)[0];
            }
            toolbarArea.appendChild(template);
            this['renderReactTemplates']();
        }
    };
    ImageEditor.prototype.templateParser = function (template) {
        if (template) {
            try {
                if (typeof template !== 'function' && document.querySelectorAll(template).length) {
                    return templateCompiler(document.querySelector(template).innerHTML.trim());
                }
                else {
                    return compile(template);
                }
            }
            catch (error) {
                return templateCompiler(template);
            }
        }
        return undefined;
    };
    // Common codes for EJ2 and Blazor
    ImageEditor.prototype.getTextFromId = function (id) {
        var idToValue = { '1': 'none', '2': 'bar', '3': 'arrow', '4': 'arrowSolid',
            '5': 'circle', '6': 'circleSolid', '7': 'square', '8': 'squareSolid' };
        return idToValue["" + id];
    };
    ImageEditor.prototype.getFinetuneOption = function (type) {
        var typeToOption = { 'brightness': ImageFinetuneOption.Brightness, 'contrast': ImageFinetuneOption.Contrast,
            'hue': ImageFinetuneOption.Hue, 'saturation': ImageFinetuneOption.Saturation, 'opacity': ImageFinetuneOption.Opacity,
            'blur': ImageFinetuneOption.Blur, 'exposure': ImageFinetuneOption.Exposure };
        return typeToOption["" + type];
    };
    ImageEditor.prototype.setPenStroke = function (args) {
        this.notify('freehand-draw', { prop: 'setPenStrokeWidth', onPropertyChange: false, value: { value: parseInt(args, 10) } });
    };
    ImageEditor.prototype.updateFreehandDrawColorChange = function () {
        var obj = { tempFreeHandDrawEditingStyles: null };
        this.notify('freehand-draw', { prop: 'getTempFreeHandDrawEditingStyles', value: { obj: obj } });
        this.notify('freehand-draw', { prop: 'color-change', value: { color: obj['tempFreeHandDrawEditingStyles'].strokeColor } });
    };
    ImageEditor.prototype.setInitialZoomState = function () {
        this.objColl.push(this.activeObj);
        this.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
        var isUndoRedo = this.isUndoRedo;
        this.isCropTab = false;
        this.isUndoRedo = true;
        if (this.transform.cropZoomFactor && this.transform.cropZoomFactor > 0) {
            this.notify('transform', { prop: 'zoomAction', onPropertyChange: false,
                value: { zoomFactor: -this.transform.cropZoomFactor, zoomPoint: null } });
        }
        else {
            this.notify('transform', { prop: 'zoomAction', onPropertyChange: false,
                value: { zoomFactor: Math.abs(this.transform.cropZoomFactor), zoomPoint: null } });
        }
        this.isUndoRedo = isUndoRedo;
        this.panPoint.totalPannedPoint = { x: 0, y: 0 };
        this.transform.cropZoomFactor = 0;
        this.notify('freehand-draw', { prop: 'updateFHDColl', onPropertyChange: false });
        this.activeObj = extend({}, this.objColl[this.objColl.length - 1], {}, true);
        this.objColl.pop();
        this.isCropTab = true;
        this.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate', obj: this.activeObj } });
    };
    /**
     * Set the old item Transform item state.
     *
     * @hidden
     * @returns {void}.
     */
    ImageEditor.prototype.updateCropTransformItems = function () {
        this.prevCurrSelectionPoint = extend({}, this.currSelectionPoint, {}, true);
        var object = { currObj: {} };
        this.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
        var currentObj = object['currObj'];
        currentObj.objColl = extend([], this.objColl, [], true);
        currentObj.pointColl = extend([], this.pointColl, [], true);
        currentObj.afterCropActions = extend([], this.afterCropActions, [], true);
        var selPointCollObj = { selPointColl: null };
        this.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
            value: { obj: selPointCollObj } });
        currentObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
        this.cancelCropSelection = { operation: 'cropTransform', previousObj: currentObj, currentObj: currentObj,
            previousObjColl: currentObj.objColl, currentObjColl: currentObj.objColl,
            previousPointColl: currentObj.pointColl, currentPointColl: currentObj.pointColl,
            previousSelPointColl: currentObj.selPointColl, currentSelPointColl: currentObj.selPointColl,
            previousCropObj: extend({}, this.cropObj, {}, true),
            currentCropObj: extend({}, this.cropObj, {}, true),
            previousText: null, currentText: null, filter: null, isCircleCrop: this.isCircleCrop };
    };
    /**
     * Get the pascal case.
     *
     * @param { string } str - Specifies the string to convert to pascal case.
     * @param { Object } obj - Specifies the string to convert to pascal case.
     * @hidden
     * @returns {string}.
     * A pascal case string.
     */
    ImageEditor.prototype.toPascalCase = function (str, obj) {
        var strArr = [];
        if (!isNullOrUndefined(str)) {
            strArr = str.toLowerCase().split('-');
        }
        for (var i = 0; i < strArr.length; i++) {
            strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].slice(1);
        }
        if (obj) {
            obj['maxText'] = strArr.join('');
        }
        return strArr.join('');
    };
    /**
     * Get the font sizes.
     *
     * @hidden
     * @returns {DropDownButtonItemModel[]}.
     * A font size collections.
     */
    ImageEditor.prototype.getFontSizes = function () {
        var items = [];
        this.fontSizeColl = [];
        var fontSize;
        if (this.transform.degree === 0 || this.transform.degree % 180 === 0) {
            fontSize = this.img.destWidth / 25;
        }
        else {
            fontSize = this.img.destHeight / 25;
        }
        for (var i = 1; i <= 10; i++) {
            this.fontSizeColl.push({ text: (i * (Math.round(fontSize / 2))).toString() });
            items.push({ text: (i.toString()) });
        }
        return items;
    };
    /**
     * Handles the OK button operation
     *
     * @param { boolean } isMouseDown - Specifies whether it is a mouse down.
     * @hidden
     * @returns {void}.
     */
    ImageEditor.prototype.okBtn = function (isMouseDown) {
        var isCropSelection = false;
        var splitWords;
        if (this.activeObj.shape !== undefined) {
            splitWords = this.activeObj.shape.split('-');
        }
        if (splitWords === undefined && this.currObjType.isCustomCrop) {
            isCropSelection = true;
        }
        else if (splitWords !== undefined && splitWords[0] === 'crop') {
            isCropSelection = true;
        }
        var selElem = this.element.querySelector('.e-contextual-toolbar-wrapper .e-toolbar-item.e-selected');
        var obj = { bool: false };
        this.notify('selection', { prop: 'getFreehandDrawEditing', onPropertyChange: false, value: { obj: obj } });
        if (selElem) {
            this.currentFilter = selElem.children[0].children[0].id.replace('Canvas', '');
        }
        if (isCropSelection) {
            this.crop();
        }
        else if (this.togglePen) {
            this.freeHandDraw(false);
            this.notify('undo-redo', { prop: 'updateCurrUrc', value: { type: 'ok' } });
        }
        else if (this.textArea.style.display === 'block') {
            this.notify('shape', { prop: 'redrawActObj', onPropertyChange: false,
                value: { x: null, y: null, isMouseDown: null } });
            if (isNullOrUndefined(isMouseDown)) {
                this.notify('undo-redo', { prop: 'updateCurrUrc', value: { type: 'ok' } });
            }
        }
        else if ((!isBlazor() && document.querySelector('#' + this.element.id + '_sliderWrapper')) || (isBlazor() && !this.element.querySelector('.e-ie-contextual-slider').classList.contains('e-hidden')) ||
            this.currObjType.isFiltered) {
            this.initialAdjustmentValue = this.canvasFilter = this.lowerContext.filter;
            this.currObjType.isFiltered = false;
            var obj_2 = { value: null };
            this.notify('draw', { prop: 'getTempAdjustmentValue', value: { obj: obj_2 } });
            if (obj_2['value'] !== this.lowerContext.filter) {
                this.notify('undo-redo', { prop: 'updateCurrUrc', value: { type: 'ok' } });
            }
        }
        else if (obj['bool']) {
            this.notify('freehand-draw', { prop: 'applyFhd', onPropertyChange: false });
            this.notify('selection', { prop: 'setFreehandDrawCustomized', value: { isFreehandDrawCustomized: false } });
            if (!isBlazor()) {
                this.notify('toolbar', { prop: 'destroy-qa-toolbar' });
            }
            else {
                this.updateToolbar(this.element, 'destroyQuickAccessToolbar');
            }
            this.notify('undo-redo', { prop: 'updateCurrUrc', value: { type: 'ok' } });
        }
        else if ((this.activeObj.activePoint.width !== 0 && this.activeObj.activePoint.height !== 0) ||
            (this.activeObj.shape === 'path' && this.activeObj.pointColl.length > 0)) {
            this.notify('shape', { prop: 'applyActObj', onPropertyChange: false, value: { isMouseDown: isMouseDown } });
        }
        if (!isBlazor() && !obj['isCropToolbar']) {
            this.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'main',
                    isApplyBtn: false, isCropping: null, isZooming: null, cType: null } });
        }
        this.notify('draw', { prop: 'setNewPath', value: { bool: false } });
        this.isCropTab = false;
        this.transform.zoomFactor = this.transform.defaultZoomFactor;
        this.notify('selection', { prop: 'setCurrentDrawingShape', onPropertyChange: false, value: { value: '' } });
    };
    /**
     * Set the temporary filter properties.
     *
     * @hidden
     * @returns {void}.
     */
    ImageEditor.prototype.setTempFilterProperties = function () {
        this.upperCanvas.style.display = 'block';
        this.cropSelectedState();
        var obj = { adjustmentLevel: null };
        this.notify('filter', { prop: 'getAdjustmentLevel', onPropertyChange: false,
            value: { obj: obj } });
        this.lowerContext.filter = this.initialAdjustmentValue;
        this.notify('draw', { prop: 'setTempAdjustmentValue', value: { tempAdjustmentValue: this.lowerContext.filter } });
        this.notify('filter', { prop: 'setTempAdjustmentLevel', onPropertyChange: false,
            value: { tempAdjustmentLevel: extend({}, obj['adjustmentLevel'], {}, true) } });
        this.notify('draw', { prop: 'setTempFilter', value: { tempFilter: this.currentFilter } });
        var undoRedoObj = { undoRedoStep: null };
        this.notify('undo-redo', { prop: 'getUndoRedoStep', value: { obj: undoRedoObj } });
        this.notify('draw', { prop: 'setTempUndoRedoStep', value: { tempUndoRedoStep: undoRedoObj['undoRedoStep'] } });
    };
    /**
     * To crop the selection.
     *
     * @hidden
     * @returns {void}.
     */
    ImageEditor.prototype.cropSelectedState = function () {
        if (this.activeObj.shape && this.activeObj.shape.split('-')[0] === 'crop') {
            this.okBtn();
        }
    };
    /**
     * Get the current canvas data.
     *
     * @hidden
     * @returns {ImageData}.
     * An ImageData returns the current canvas image data object.
     */
    ImageEditor.prototype.getCurrentCanvasData = function () {
        var tempFilter = this.lowerContext.filter;
        this.lowerContext.filter = this.canvasFilter = 'none';
        var objColl = extend([], this.objColl, null, true);
        var pointColl = extend([], this.pointColl, null, true);
        this.objColl = [];
        this.pointColl = [];
        this.freehandCounter = 0;
        this.notify('draw', { prop: 'render-image', value: { isMouseWheel: false } });
        var data = this.getImageData();
        if (!isBlazor()) {
            if (!Browser.isDevice) {
                this.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'main',
                        isApplyBtn: true, isCropping: false } });
            }
            this.element.querySelector('#' + this.element.id + '_contextualToolbarArea').classList.remove('e-hide');
        }
        this.objColl = objColl;
        this.pointColl = pointColl;
        this.freehandCounter = pointColl.length;
        this.notify('shape', { prop: 'iterateObjColl', onPropertyChange: false });
        this.lowerContext.filter = this.canvasFilter = tempFilter;
        return data;
    };
    /**
     * To set current adjustment value
     *
     * @param { string } type - Specifies the type of adjustment.
     * @param { number } value - Specifies the value to adjust.
     * @hidden
     * @returns {void}.
     */
    ImageEditor.prototype.setCurrAdjustmentValue = function (type, value) {
        var _this = this;
        var finetuneValueChanging = { finetune: this.getFinetuneOption(type),
            value: value, cancel: false };
        if (isBlazor() && this.events && this.events.finetuneValueChanging.hasDelegate === true) {
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            this.dotNetRef.invokeMethodAsync('OnFinetuneValueChangeAsync', finetuneValueChanging).then(function (finetuneValueChanging) {
                if (finetuneValueChanging.cancel) {
                    return;
                }
                _this.notify('filter', { prop: 'setCurrAdjValue', value: { type: type.toLowerCase(), value: value } });
            });
        }
        else {
            this.trigger('finetuneValueChanging', finetuneValueChanging);
            if (finetuneValueChanging.cancel) {
                return;
            }
            this.notify('filter', { prop: 'setCurrAdjValue', value: { type: type.toLowerCase(), value: value } });
        }
    };
    /**
     * Get the square point for path.
     *
     * @param { SelectionPoint } obj - Specifies the points of path.
     * @hidden
     * @returns {ActivePoint}.
     * An ActivePoint object which returns the square point.
     */
    ImageEditor.prototype.getSquarePointForPath = function (obj) {
        var point = { startX: 0, startY: 0, endX: 0, endY: 0, width: 0, height: 0 };
        if (obj.pointColl.length > 0) {
            point = { startX: obj.pointColl[0].x, startY: obj.pointColl[0].y, endX: obj.pointColl[0].x, endY: obj.pointColl[0].y };
            for (var i = 1; i < obj.pointColl.length; i++) {
                if (obj.pointColl[i].x < point.startX) {
                    point.startX = obj.pointColl[i].x;
                }
                if (obj.pointColl[i].y < point.startY) {
                    point.startY = obj.pointColl[i].y;
                }
                if (obj.pointColl[i].x > point.endX) {
                    point.endX = obj.pointColl[i].x;
                }
                if (obj.pointColl[i].y > point.endY) {
                    point.endY = obj.pointColl[i].y;
                }
            }
            point.width = point.endX - point.startX;
            point.height = point.endY - point.startY;
        }
        return point;
    };
    /**
     * Get the SelectionType.
     *
     * @param { string } type - Specifies the SelectionType.
     * @hidden
     * @returns {string}.
     * An string which returns the SelectionType.
     */
    ImageEditor.prototype.getSelectionType = function (type) {
        var typeToSelectionType = { 'CropCustom': 'Custom', 'CropSquare': 'Square', 'CropCircle': 'Circle',
            'Crop3:2': '3:2', 'Crop4:3': '4:3', 'Crop5:4': '5:4', 'Crop7:5': '7:5', 'Crop16:9': '16:9' };
        return typeToSelectionType["" + type];
    };
    /** Clears the context.
     *
     * @param { CanvasRenderingContext2D } ctx - Specifies the canvas context.
     * @hidden
     * @returns {void}.
     */
    ImageEditor.prototype.clearContext = function (ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.clearRect(0, 0, ctx.canvas.height, ctx.canvas.width);
    };
    /**
     * Apply Arrow for start and end.
     *
     * @param { string } type - Specifies the start arrow or end arrow.
     * @param { string } id - Specifies the start arrow or end arrow item id.
     * @hidden
     * @returns {void}.
     */
    ImageEditor.prototype.updateArrow = function (type, id) {
        this.notify('shape', { prop: 'pushActItemIntoObj' });
        var prevCropObj = extend({}, this.cropObj, {}, true);
        var object = { currObj: {} };
        this.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
        var prevObj = object['currObj'];
        prevObj.objColl = extend([], this.objColl, [], true);
        prevObj.pointColl = extend([], this.pointColl, [], true);
        prevObj.afterCropActions = extend([], this.afterCropActions, [], true);
        this.objColl.pop();
        if (type === 'startArrow') {
            this.activeObj.start = this.getTextFromId(id);
        }
        else if (type === 'endArrow') {
            this.activeObj.end = this.getTextFromId(id);
        }
        this.notify('shape', { prop: 'setStrokeSettings', value: { strokeSettings: null, strokeColor: null, fillColor: null,
                strokeWidth: this.activeObj.strokeSettings.strokeWidth } });
        this.objColl.push(this.activeObj);
        this.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
            value: { operation: 'shapeTransform', previousObj: prevObj, previousObjColl: prevObj.objColl,
                previousPointColl: prevObj.pointColl, previousCropObj: prevCropObj, previousText: null,
                currentText: null, previousFilter: null, isCircleCrop: null } });
        this.notify('selection', { prop: 'redrawShape', value: { obj: this.objColl[this.objColl.length - 1] } });
        if (!isBlazor()) {
            if (Browser.isDevice) {
                if (document.getElementById(this.element.id + '_bottomToolbar')) {
                    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                    var toolbar_1 = getComponent(this.element.id + '_bottomToolbar', 'toolbar');
                    toolbar_1.refreshOverflow();
                }
            }
            else {
                if (document.getElementById(this.element.id + '_toolbar')) {
                    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                    var toolbar_2 = getComponent(this.element.id + '_toolbar', 'toolbar');
                    toolbar_2.refreshOverflow();
                }
            }
        }
    };
    /**
     * Apply Font style for text.
     *
     * @param { string } id - Specifies the selected item id.
     * @hidden
     * @returns {void}.
     */
    ImageEditor.prototype.updateFontFamily = function (id) {
        this.notify('selection', { prop: 'setInitialTextEdit', value: { bool: false } });
        this.notify('shape', { prop: 'pushActItemIntoObj' });
        var objColl = extend([], this.objColl, [], true);
        var prevCropObj = extend({}, this.cropObj, {}, true);
        var object = { currObj: {} };
        this.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
        var prevObj = object['currObj'];
        prevObj.objColl = extend([], this.objColl, [], true);
        prevObj.pointColl = extend([], this.pointColl, [], true);
        prevObj.afterCropActions = extend([], this.afterCropActions, [], true);
        var selPointCollObj = { selPointColl: null };
        this.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
            value: { obj: selPointCollObj } });
        prevObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
        this.objColl.pop();
        if (this.textArea.style.display === 'block') {
            this.notify('shape', { prop: 'updateFontRatio', onPropertyChange: false,
                value: { obj: this.activeObj, isTextArea: true } });
            var temp = this.activeObj.textSettings.fontFamily;
            this.activeObj.textSettings.fontFamily = this.toPascalCase(id);
            this.notify('shape', { prop: 'redraw-text' });
            this.objColl.push(this.activeObj);
            this.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
                value: { operation: 'textAreaCustomization', previousObj: prevObj, previousObjColl: prevObj.objColl,
                    previousPointColl: prevObj.pointColl, previousSelPointColl: prevObj.selPointColl,
                    previousCropObj: prevCropObj, previousText: null,
                    currentText: null, previousFilter: null, isCircleCrop: null } });
            this.objColl.pop();
            this.upperContext.clearRect(0, 0, this.upperCanvas.width, this.upperCanvas.height);
            var width = this.activeObj.activePoint.width +
                this.activeObj.textSettings.fontSize * 0.25;
            this.textArea.style.width = width + 'px';
            this.textArea.style.fontFamily = this.toPascalCase(id);
            this.activeObj.textSettings.fontFamily = temp;
            this.notify('shape', { prop: 'updateFontStyles', onPropertyChange: false,
                value: { isTextBox: null } });
        }
        else {
            this.notify('shape', { prop: 'updateFontRatio', onPropertyChange: false,
                value: { obj: this.activeObj, isTextArea: null } });
            var fontFamily = this.activeObj.textSettings.fontFamily = this.toPascalCase(id);
            this.notify('shape', { prop: 'setTextSettings', onPropertyChange: false,
                value: { textSettings: null, fontFamily: fontFamily, fontSize: null } });
            this.notify('shape', { prop: 'redraw-text' });
            this.objColl.push(this.activeObj);
            this.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
                value: { operation: 'shapeTransform', previousObj: prevObj, previousObjColl: objColl,
                    previousPointColl: extend([], this.pointColl, [], true),
                    previousSelPointColl: prevObj.selPointColl, previousCropObj: prevCropObj, previousText: null,
                    currentText: null, previousFilter: null, isCircleCrop: null } });
            this.notify('selection', { prop: 'redrawShape', value: { obj: this.objColl[this.objColl.length - 1] } });
        }
    };
    /**
     * Apply Font size for text.
     *
     * @param { string } text - Specifies the selected item text.
     * @hidden
     * @returns {void}.
     */
    ImageEditor.prototype.updateFontSize = function (text) {
        var itemText = text;
        this.notify('selection', { prop: 'setInitialTextEdit', value: { bool: false } });
        this.notify('shape', { prop: 'pushActItemIntoObj' });
        var prevCropObj = extend({}, this.cropObj, {}, true);
        var object = { currObj: {} };
        this.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
        var prevObj = object['currObj'];
        prevObj.objColl = extend([], this.objColl, [], true);
        prevObj.pointColl = extend([], this.pointColl, [], true);
        prevObj.afterCropActions = extend([], this.afterCropActions, [], true);
        var selPointCollObj = { selPointColl: null };
        this.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
            value: { obj: selPointCollObj } });
        prevObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
        this.objColl.pop();
        if (this.textArea.style.display === 'block') {
            this.notify('shape', { prop: 'updateFontRatio', onPropertyChange: false,
                value: { obj: this.activeObj, isTextArea: true } });
            var temp = this.activeObj.textSettings.fontSize;
            this.activeObj.textSettings.fontSize = parseInt(this.fontSizeColl[(parseInt(itemText, 10) - 1)].text, 10);
            this.objColl.push(this.activeObj);
            this.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
                value: { operation: 'textAreaCustomization', previousObj: prevObj, previousObjColl: prevObj.objColl,
                    previousPointColl: prevObj.pointColl, previousSelPointColl: prevObj.selPointColl,
                    previousCropObj: prevCropObj, previousText: null,
                    currentText: null, previousFilter: null, isCircleCrop: null } });
            this.objColl.pop();
            var textStyle = '';
            if (this.textArea.style.fontWeight === 'bold') {
                textStyle = 'bold ';
            }
            if (this.textArea.style.fontStyle === 'italic') {
                textStyle = 'italic ';
            }
            if (this.textArea.style.fontWeight === 'bold' && this.textArea.style.fontStyle === 'italic') {
                textStyle = 'italic bold ';
            }
            this.upperContext.font = textStyle + this.activeObj.textSettings.fontSize + 'px' + ' ' + this.textArea.style.fontFamily;
            var rows = this.textArea.value.split('\n');
            var obj = { maxText: '' };
            this.notify('shape', { prop: 'getMaxText', onPropertyChange: false,
                value: { isTextBox: true, text: null, obj: obj } });
            var text_1 = obj['maxText'];
            var width = this.upperContext.measureText(text_1).width +
                this.activeObj.textSettings.fontSize * 0.5;
            this.textArea.style.width = width + 'px';
            this.textArea.style.height = rows.length * (this.activeObj.textSettings.fontSize + this.activeObj.textSettings.fontSize * 0.25) + 'px';
            this.activeObj.textSettings.fontSize = temp;
            this.upperContext.font = this.activeObj.textSettings.fontSize + 'px' + ' ' + this.activeObj.textSettings.fontFamily;
            this.textArea.style.fontSize = parseInt(this.fontSizeColl[(parseInt(itemText, 10) - 1)].text, 10) + 'px';
            if (this.textArea.style.fontFamily === 'georgia') {
                this.textArea.style.width = parseFloat(this.textArea.style.width) + parseFloat(this.textArea.style.fontSize) + 'px';
            }
        }
        else {
            this.notify('shape', { prop: 'updateFontRatio', onPropertyChange: false,
                value: { obj: this.activeObj, isTextArea: null } });
            var fontSize = this.activeObj.textSettings.fontSize = parseInt(this.fontSizeColl[(parseInt(itemText, 10) - 1)].text, 10);
            this.notify('shape', { prop: 'setTextSettings', onPropertyChange: false,
                value: { textSettings: null, fontFamily: null, fontSize: fontSize } });
            this.upperContext.font = this.activeObj.textSettings.fontSize + 'px' + ' ' + this.activeObj.textSettings.fontFamily;
            var rows = this.activeObj.keyHistory.split('\n');
            var obj = { maxText: '' };
            this.notify('shape', { prop: 'getMaxText', onPropertyChange: false,
                value: { isTextBox: null, text: null, obj: obj } });
            var text_2 = obj['maxText'];
            var width = this.upperContext.measureText(text_2).width +
                this.activeObj.textSettings.fontSize * 0.5;
            var height = rows.length * (this.activeObj.textSettings.fontSize +
                this.activeObj.textSettings.fontSize * 0.25);
            this.notify('selection', { prop: 'setTextSelection', onPropertyChange: false,
                value: { width: width, height: height } });
            this.notify('draw', { prop: 'updateActiveObject', onPropertyChange: false, value: { actPoint: this.activeObj.activePoint, obj: this.activeObj,
                    isMouseMove: null, x: null, y: null } });
            this.notify('shape', { prop: 'redraw-text' });
            this.objColl.push(this.activeObj);
            this.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
                value: { operation: 'shapeTransform', previousObj: prevObj, previousObjColl: prevObj.objColl,
                    previousPointColl: prevObj.pointColl, previousSelPointColl: prevObj.selPointColl,
                    previousCropObj: prevCropObj, previousText: null,
                    currentText: null, previousFilter: null, isCircleCrop: null } });
            this.notify('selection', { prop: 'redrawShape', value: { obj: this.objColl[this.objColl.length - 1] } });
        }
    };
    /**
     * Apply Font color for text.
     *
     * @param { string } value - Specifies the selected color item value.
     * @hidden
     * @returns {void}.
     */
    ImageEditor.prototype.updateFontColor = function (value) {
        this.notify('selection', { prop: 'setInitialTextEdit', value: { bool: false } });
        this.notify('shape', { prop: 'pushActItemIntoObj' });
        var prevCropObj = extend({}, this.cropObj, {}, true);
        var object = { currObj: {} };
        this.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
        var prevObj = object['currObj'];
        prevObj.objColl = extend([], this.objColl, [], true);
        prevObj.pointColl = extend([], this.pointColl, [], true);
        prevObj.afterCropActions = extend([], this.afterCropActions, [], true);
        var selPointCollObj = { selPointColl: null };
        this.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
            value: { obj: selPointCollObj } });
        prevObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
        this.objColl.pop();
        if (this.textArea.style.display === 'none') {
            this.activeObj.strokeSettings.strokeColor = value;
            this.notify('shape', { prop: 'setStrokeSettings', value: { strokeSettings: null,
                    strokeColor: this.activeObj.strokeSettings.strokeColor, fillColor: null, strokeWidth: null } });
            if (!this.togglePen) {
                this.objColl.push(this.activeObj);
                this.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
                    value: { operation: 'shapeTransform', previousObj: prevObj, previousObjColl: prevObj.objColl,
                        previousPointColl: prevObj.pointColl, previousSelPointColl: prevObj.selPointColl,
                        previousCropObj: prevCropObj, previousText: null,
                        currentText: null, previousFilter: null, isCircleCrop: null } });
                this.notify('selection', { prop: 'redrawShape', value: { obj: this.objColl[this.objColl.length - 1] } });
            }
        }
        else if (this.textArea.style.display === 'block') {
            this.textArea.style.color = value;
            var temp = this.activeObj.strokeSettings.strokeColor;
            this.activeObj.strokeSettings.strokeColor = value;
            this.objColl.push(this.activeObj);
            this.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
                value: { operation: 'textAreaCustomization', previousObj: prevObj, previousObjColl: prevObj.objColl,
                    previousPointColl: prevObj.pointColl, previousSelPointColl: prevObj.selPointColl,
                    previousCropObj: prevCropObj, previousText: null,
                    currentText: null, previousFilter: null, isCircleCrop: null } });
            this.objColl.pop();
            this.activeObj.strokeSettings.strokeColor = temp;
        }
        else if (!this.togglePen) {
            this.objColl.push(this.activeObj);
            this.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
                value: { operation: 'shapeTransform', previousObj: prevObj, previousObjColl: prevObj.objColl,
                    previousPointColl: prevObj.pointColl, previousSelPointColl: prevObj.selPointColl,
                    previousCropObj: prevCropObj, previousText: null,
                    currentText: null, previousFilter: null, isCircleCrop: null } });
            this.notify('selection', { prop: 'redrawShape', value: { obj: this.objColl[this.objColl.length - 1] } });
        }
    };
    /**
     * Apply Pen stroke width.
     *
     * @param { string } id - Specifies the selected item id.
     * @hidden
     * @returns {void}.
     */
    ImageEditor.prototype.updatePenStrokeWidth = function (id) {
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        var temp = extend([], this.pointColl, [], true);
        this.updateFreehandDrawColorChange();
        var prevCropObj = extend({}, this.cropObj, {}, true);
        var object = { currObj: {} };
        this.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
        var prevObj = object['currObj'];
        prevObj.objColl = extend([], this.objColl, [], true);
        prevObj.pointColl = extend([], this.pointColl, [], true);
        prevObj.afterCropActions = extend([], this.afterCropActions, [], true);
        var selPointCollObj = { selPointColl: null };
        this.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
            value: { obj: selPointCollObj } });
        prevObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
        this.pointColl = temp;
        this.notify('selection', { prop: 'setFreehandDrawCustomized', value: { isFreehandDrawCustomized: true } });
        this.setPenStroke(id);
        var obj = { bool: false };
        this.notify('selection', { prop: 'getFreehandDrawEditing', onPropertyChange: false, value: { obj: obj } });
        if (obj['bool']) {
            var obj_3 = { penStrokeWidth: null };
            this.notify('freehand-draw', { prop: 'getPenStrokeWidth', onPropertyChange: false, value: { obj: obj_3 } });
            this.upperContext.clearRect(0, 0, this.upperCanvas.width, this.upperCanvas.height);
            this.notify('freehand-draw', { prop: 'hoverFhd', onPropertyChange: false,
                value: { strokeColor: null, strokeWidth: obj_3['penStrokeWidth'] } });
            var indexObj = { freehandSelectedIndex: null };
            this.notify('freehand-draw', { prop: 'getFreehandSelectedIndex', onPropertyChange: false, value: { obj: indexObj } });
            this.pointColl[indexObj['freehandSelectedIndex']].strokeWidth = obj_3['penStrokeWidth'];
            this.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
                value: { operation: 'freehanddrawCustomized', previousObj: prevObj, previousObjColl: prevObj.objColl,
                    previousPointColl: prevObj.pointColl, previousSelPointColl: prevObj.selPointColl,
                    previousCropObj: prevCropObj, previousText: null,
                    currentText: null, previousFilter: null, isCircleCrop: null } });
        }
    };
    /**
     * Apply Pen stroke color.
     *
     * @param { string } value - Specifies the selected color item value.
     * @hidden
     * @returns {void}.
     */
    ImageEditor.prototype.updatePenStrokeColor = function (value) {
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        var temp = extend([], this.pointColl, [], true);
        this.updateFreehandDrawColorChange();
        var prevCropObj = extend({}, this.cropObj, {}, true);
        var object = { currObj: {} };
        this.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
        var prevObj = object['currObj'];
        prevObj.objColl = extend([], this.objColl, [], true);
        prevObj.pointColl = extend([], this.pointColl, [], true);
        prevObj.afterCropActions = extend([], this.afterCropActions, [], true);
        var selPointCollObj = { selPointColl: null };
        this.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
            value: { obj: selPointCollObj } });
        prevObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
        this.pointColl = temp;
        this.notify('selection', { prop: 'setFreehandDrawCustomized', value: { isFreehandDrawCustomized: true } });
        this.activeObj.strokeSettings.strokeColor = value;
        var obj = { bool: false };
        this.notify('selection', { prop: 'getFreehandDrawEditing', onPropertyChange: false, value: { obj: obj } });
        if (obj['bool']) {
            var indexObj = { freehandSelectedIndex: null };
            this.notify('freehand-draw', { prop: 'getFreehandSelectedIndex', onPropertyChange: false, value: { obj: indexObj } });
            this.upperContext.clearRect(0, 0, this.upperCanvas.width, this.upperCanvas.height);
            this.pointColl[indexObj['freehandSelectedIndex']].strokeColor = value;
            this.notify('freehand-draw', { prop: 'hoverFhd', onPropertyChange: false,
                value: { strokeColor: value } });
            this.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
                value: { operation: 'freehanddrawCustomized', previousObj: prevObj, previousObjColl: prevObj.objColl,
                    previousPointColl: prevObj.pointColl, previousSelPointColl: prevObj.selPointColl,
                    previousCropObj: prevCropObj, previousText: null,
                    currentText: null, previousFilter: null, isCircleCrop: null } });
        }
        else if (!this.togglePen) {
            this.notify('selection', { prop: 'redrawShape', value: { obj: this.activeObj } });
        }
    };
    /**
     * Apply Shape stroke width.
     *
     * @param { string } id - Specifies the selected item id.
     * @hidden
     * @returns {void}.
     */
    ImageEditor.prototype.updateStrokeWidth = function (id) {
        this.notify('shape', { prop: 'pushActItemIntoObj' });
        var prevCropObj = extend({}, this.cropObj, {}, true);
        var object = { currObj: {} };
        this.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
        var prevObj = object['currObj'];
        prevObj.objColl = extend([], this.objColl, [], true);
        prevObj.pointColl = extend([], this.pointColl, [], true);
        prevObj.afterCropActions = extend([], this.afterCropActions, [], true);
        var selPointCollObj = { selPointColl: null };
        this.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
            value: { obj: selPointCollObj } });
        prevObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
        this.objColl.pop();
        this.activeObj.strokeSettings.strokeWidth = parseInt(id, 10);
        this.activeObj.strokeSettings.strokeWidth *= 2;
        this.notify('shape', { prop: 'setStrokeSettings', value: { strokeSettings: null, strokeColor: null, fillColor: null,
                strokeWidth: this.activeObj.strokeSettings.strokeWidth } });
        this.objColl.push(this.activeObj);
        this.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
            value: { operation: 'shapeTransform', previousObj: prevObj, previousObjColl: prevObj.objColl,
                previousPointColl: prevObj.pointColl, previousSelPointColl: prevObj.selPointColl,
                previousCropObj: prevCropObj, previousText: null,
                currentText: null, previousFilter: null, isCircleCrop: null } });
        this.notify('selection', { prop: 'redrawShape', value: { obj: this.objColl[this.objColl.length - 1] } });
    };
    /**
     * Apply Shape stroke color.
     *
     * @param { string } value - Specifies the selected color item value.
     * @hidden
     * @returns {void}.
     */
    ImageEditor.prototype.updateStrokeColor = function (value) {
        this.notify('shape', { prop: 'pushActItemIntoObj' });
        var prevCropObj = extend({}, this.cropObj, {}, true);
        var object = { currObj: {} };
        this.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
        var prevObj = object['currObj'];
        prevObj.objColl = extend([], this.objColl, [], true);
        prevObj.pointColl = extend([], this.pointColl, [], true);
        prevObj.afterCropActions = extend([], this.afterCropActions, [], true);
        var selPointCollObj = { selPointColl: null };
        this.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
            value: { obj: selPointCollObj } });
        prevObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
        this.objColl.pop();
        this.activeObj.strokeSettings.strokeColor = value;
        this.notify('shape', { prop: 'setStrokeSettings', value: { strokeSettings: null, strokeColor: this.activeObj.strokeSettings.strokeColor, fillColor: null, strokeWidth: null } });
        if (!this.togglePen) {
            this.objColl.push(this.activeObj);
            this.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
                value: { operation: 'shapeTransform', previousObj: prevObj, previousObjColl: prevObj.objColl,
                    previousPointColl: prevObj.pointColl, previousSelPointColl: prevObj.selPointColl,
                    previousCropObj: prevCropObj, previousText: null,
                    currentText: null, previousFilter: null, isCircleCrop: null } });
            this.notify('selection', { prop: 'redrawShape', value: { obj: this.objColl[this.objColl.length - 1] } });
        }
    };
    /**
     * Apply Shape fill color.
     *
     * @param { string } value - Specifies the selected color item value.
     * @hidden
     * @returns {void}.
     */
    ImageEditor.prototype.updateFillColor = function (value) {
        this.notify('shape', { prop: 'pushActItemIntoObj' });
        var prevCropObj = extend({}, this.cropObj, {}, true);
        var object = { currObj: {} };
        this.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
        var prevObj = object['currObj'];
        prevObj.objColl = extend([], this.objColl, [], true);
        prevObj.pointColl = extend([], this.pointColl, [], true);
        prevObj.afterCropActions = extend([], this.afterCropActions, [], true);
        var selPointCollObj = { selPointColl: null };
        this.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
            value: { obj: selPointCollObj } });
        prevObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
        this.objColl.pop();
        this.activeObj.strokeSettings.fillColor = value;
        this.notify('shape', { prop: 'setStrokeSettings',
            value: { strokeSettings: null, strokeColor: null, fillColor: this.activeObj.strokeSettings.fillColor,
                strokeWidth: null } });
        this.objColl.push(this.activeObj);
        this.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
            value: { operation: 'shapeTransform', previousObj: prevObj, previousObjColl: prevObj.objColl,
                previousPointColl: prevObj.pointColl, previousSelPointColl: prevObj.selPointColl,
                previousCropObj: prevCropObj, previousText: null,
                currentText: null, previousFilter: null, isCircleCrop: null } });
        this.notify('selection', { prop: 'redrawShape', value: { obj: this.objColl[this.objColl.length - 1] } });
    };
    /**
     * Get pascalToSplitWords from string.
     *
     * @param { string } str - Specifies the word.
     * @hidden
     * @returns {string}.
     */
    ImageEditor.prototype.pascalToSplitWords = function (str) {
        str = str.charAt(0).toUpperCase() + str.slice(1);
        var splitStr = str.match(/[A-Z][a-z]+/g);
        if (isNullOrUndefined(splitStr)) {
            return str;
        }
        else {
            return splitStr.map(function (word) { return word.charAt(0).toUpperCase() + word.slice(1); }).join(' ');
        }
    };
    /**
     * Get Slider Value.
     *
     * @param { string } type - Finetune type.
     * @hidden
     * @returns {number}.
     */
    ImageEditor.prototype.getCurrAdjustmentValue = function (type) {
        var obj = { adjustmentLevel: null };
        this.notify('filter', { prop: 'getAdjustmentLevel', onPropertyChange: false,
            value: { obj: obj } });
        var typeToAdjustmentLevel = { 'brightness': obj['adjustmentLevel'].brightness,
            'contrast': obj['adjustmentLevel'].contrast, 'hue': obj['adjustmentLevel'].hue,
            'saturation': obj['adjustmentLevel'].saturation, 'opacity': obj['adjustmentLevel'].opacity,
            'blur': obj['adjustmentLevel'].blur, 'exposure': obj['adjustmentLevel'].exposure };
        return typeToAdjustmentLevel["" + type];
    };
    /**
     * Apply transformSelect.
     *
     * @param { string } type - Specifies the selected item text.
     * @hidden
     * @returns {void}.
     */
    ImageEditor.prototype.transformSelect = function (type) {
        this.isCropToolbar = true;
        this.setInitialZoomState();
        var activeObj = extend({}, this.activeObj, {}, true);
        this.cropSelectedState();
        this.notify('draw', { prop: 'resetCurrentSelectionPoint' });
        this.notify('transform', { prop: 'performTransformation', value: { text: type } });
        this.notify('draw', { prop: 'moveToSelectionRange', value: { type: type, activeObj: activeObj } });
        this.isCropToolbar = false;
    };
    /**
     * Returns default filter.
     *
     * @hidden
     * @returns {string}.
     */
    ImageEditor.prototype.getDefaultFilter = function () {
        return 'brightness(' + 1 + ') ' + 'contrast(' + 100 + '%) ' + 'hue-rotate(' + 0 + 'deg) ' +
            'saturate(' + 100 + '%) ' + 'opacity(' + 1 + ') ' + 'blur(' + 0 + 'px) ' + 'sepia(0%) ' +
            'grayscale(0%) ' + 'invert(0%)';
    };
    // Blazor codes
    /**
     * To Initialize the component rendering
     *
     * @private
     * @param {HTMLCanvasElement} element - Specifies the canvas element.
     * @param {BlazorDotnetObject} dotnetRef - Specifies for blazor client to server communication.
     * @returns {void}
     */
    ImageEditor.prototype.initializeImageEditor = function (element, dotnetRef) {
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        this.element = element;
        var canvasWrapper = this.element.querySelector('.e-canvas-wrapper');
        if (this.element.querySelector('#' + this.element.id + '_toolbarArea')) {
            this.toolbarHeight = this.element.querySelector('#' + this.element.id + '_toolbarArea').clientHeight;
        }
        else {
            this.toolbarHeight = 0;
        }
        canvasWrapper.style.height = (this.element.offsetHeight - this.toolbarHeight - 2) + 'px';
        canvasWrapper.style.width = (this.element.offsetWidth - 2) + 'px';
        this.lowerCanvas = this.element.querySelector('.e-lower-canvas');
        this.upperCanvas = this.element.querySelector('.e-upper-canvas');
        this.lowerCanvas.id = this.element.id + '_lowerCanvas';
        this.upperCanvas.id = this.element.id + '_upperCanvas';
        this.textArea = this.element.querySelector('.e-textbox');
        this.inMemoryCanvas = this.createElement('canvas', {
            id: this.element.id + '_inMemoryCanvas', attrs: { name: 'canvasImage' }
        });
        this.upperCanvas.width = this.lowerCanvas.width = this.inMemoryCanvas.width = this.element.offsetWidth;
        this.upperCanvas.height = this.lowerCanvas.height = this.inMemoryCanvas.height = (this.element.offsetHeight - this.toolbarHeight);
        this.lowerContext = this.lowerCanvas.getContext('2d');
        this.baseImg = this.createElement('img', {
            id: this.element.id + '_orgImg', attrs: { name: 'Image', crossorigin: 'anonymous' }
        });
        this.upperContext = this.upperCanvas.getContext('2d');
        this.inMemoryContext = this.inMemoryCanvas.getContext('2d');
        if (dotnetRef) {
            this.dotNetRef = dotnetRef;
        }
        this.prerender();
        this.wireEvent();
        this.lowerContext.filter = this.getDefaultFilter();
        this.notify('filter', { prop: 'setAdjustmentValue', onPropertyChange: false, value: { adjustmentValue: this.lowerContext.filter } });
        this.canvasFilter = this.initialAdjustmentValue = this.lowerContext.filter;
        if (this.cssClass) {
            addClass([this.element], this.cssClass.replace(/\s+/g, ' ').trim().split(' '));
        }
        if (this.element) {
            createSpinner({
                target: this.element
            });
        }
        this.initializeZoomSettings();
    };
    ImageEditor.prototype.prerender = function () {
        // pre render code snippets
        this.element.id = this.element.id || getUniqueID('ej2-image-editor');
        if (Browser.isDevice) {
            this.element.classList.add('e-device');
        }
        this.initializeThemeColl();
    };
    ImageEditor.prototype.initializeZoomSettings = function () {
        if (isNullOrUndefined(this.zoomSettings.zoomTrigger)) {
            this.zoomSettings.zoomTrigger = (ZoomTrigger.MouseWheel | ZoomTrigger.Pinch | ZoomTrigger.Toolbar | ZoomTrigger.Commands);
        }
        if (isNullOrUndefined(this.selectionSettings.strokeColor)) {
            this.selectionSettings.strokeColor = this.themeColl[this.theme]['primaryColor'];
        }
        if (isNullOrUndefined(this.selectionSettings.fillColor)) {
            this.selectionSettings.fillColor = this.themeColl[this.theme]['secondaryColor'];
        }
    };
    ImageEditor.prototype.initializeThemeColl = function () {
        this.themeColl = {
            Bootstrap5: { primaryColor: '#0d6efd', secondaryColor: '#fff' },
            Bootstrap5Dark: { primaryColor: '#0d6efd', secondaryColor: '#fff' },
            Tailwind: { primaryColor: '#4f46e5', secondaryColor: '#fff' },
            TailwindDark: { primaryColor: '#22d3ee', secondaryColor: '#fff' },
            Fluent: { primaryColor: '#0078d4', secondaryColor: '#fff' },
            FluentDark: { primaryColor: '#0078d4', secondaryColor: '#fff' },
            Bootstrap4: { primaryColor: '#007bff', secondaryColor: '#fff' },
            Bootstrap: { primaryColor: '#317ab9', secondaryColor: '#fff' },
            BootstrapDark: { primaryColor: '#317ab9', secondaryColor: '#fff' },
            Material: { primaryColor: '#e3165b', secondaryColor: '#fff' },
            MaterialDark: { primaryColor: '#00b0ff', secondaryColor: '#fff' },
            Fabric: { primaryColor: '#0078d6', secondaryColor: '#fff' },
            FabricDark: { primaryColor: '#0074cc', secondaryColor: '#fff' },
            Highcontrast: { primaryColor: '#000000', secondaryColor: '#fff' },
            Material3: { primaryColor: '#6750a4', secondaryColor: '#fff' },
            Material3Dark: { primaryColor: '#d0bcff', secondaryColor: '#fff' }
        };
    };
    /**
     * Get the square point for path.
     *
     * @param { HTMLDivElement } element - Specifies element.
     * @param { string } type - Specifies the type.
     * @param { string } value - Specifies the value.
     * @hidden
     * @private
     * @returns {void}.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    ImageEditor.prototype.updateToolbar = function (element, type, value) {
    };
    var ImageEditor_1;
    __decorate([
        Property('')
    ], ImageEditor.prototype, "cssClass", void 0);
    __decorate([
        Property(false)
    ], ImageEditor.prototype, "disabled", void 0);
    __decorate([
        Property('100%')
    ], ImageEditor.prototype, "height", void 0);
    __decorate([
        Property('Bootstrap5')
    ], ImageEditor.prototype, "theme", void 0);
    __decorate([
        Property()
    ], ImageEditor.prototype, "toolbar", void 0);
    __decorate([
        Property()
    ], ImageEditor.prototype, "toolbarTemplate", void 0);
    __decorate([
        Property('100%')
    ], ImageEditor.prototype, "width", void 0);
    __decorate([
        Property(true)
    ], ImageEditor.prototype, "allowUndoRedo", void 0);
    __decorate([
        Property(true)
    ], ImageEditor.prototype, "showQuickAccessToolbar", void 0);
    __decorate([
        Property()
    ], ImageEditor.prototype, "quickAccessToolbarTemplate", void 0);
    __decorate([
        Property(false)
    ], ImageEditor.prototype, "isReadOnly", void 0);
    __decorate([
        Property(false)
    ], ImageEditor.prototype, "enableRtl", void 0);
    __decorate([
        Property(false)
    ], ImageEditor.prototype, "enablePersistence", void 0);
    __decorate([
        Complex({}, FinetuneSettings)
    ], ImageEditor.prototype, "finetuneSettings", void 0);
    __decorate([
        Complex({}, ZoomSettings)
    ], ImageEditor.prototype, "zoomSettings", void 0);
    __decorate([
        Complex({}, SelectionSettings)
    ], ImageEditor.prototype, "selectionSettings", void 0);
    __decorate([
        Event()
    ], ImageEditor.prototype, "beforeSave", void 0);
    __decorate([
        Event()
    ], ImageEditor.prototype, "created", void 0);
    __decorate([
        Event()
    ], ImageEditor.prototype, "destroyed", void 0);
    __decorate([
        Event()
    ], ImageEditor.prototype, "zooming", void 0);
    __decorate([
        Event()
    ], ImageEditor.prototype, "panning", void 0);
    __decorate([
        Event()
    ], ImageEditor.prototype, "cropping", void 0);
    __decorate([
        Event()
    ], ImageEditor.prototype, "rotating", void 0);
    __decorate([
        Event()
    ], ImageEditor.prototype, "flipping", void 0);
    __decorate([
        Event()
    ], ImageEditor.prototype, "shapeChanging", void 0);
    __decorate([
        Event()
    ], ImageEditor.prototype, "selectionChanging", void 0);
    __decorate([
        Event()
    ], ImageEditor.prototype, "fileOpened", void 0);
    __decorate([
        Event()
    ], ImageEditor.prototype, "saved", void 0);
    __decorate([
        Event()
    ], ImageEditor.prototype, "toolbarCreated", void 0);
    __decorate([
        Event()
    ], ImageEditor.prototype, "toolbarUpdating", void 0);
    __decorate([
        Event()
    ], ImageEditor.prototype, "toolbarItemClicked", void 0);
    __decorate([
        Event()
    ], ImageEditor.prototype, "imageFiltering", void 0);
    __decorate([
        Event()
    ], ImageEditor.prototype, "finetuneValueChanging", void 0);
    __decorate([
        Event()
    ], ImageEditor.prototype, "click", void 0);
    __decorate([
        Event()
    ], ImageEditor.prototype, "quickAccessToolbarOpen", void 0);
    __decorate([
        Event()
    ], ImageEditor.prototype, "quickAccessToolbarItemClick", void 0);
    ImageEditor = ImageEditor_1 = __decorate([
        NotifyPropertyChanges
    ], ImageEditor);
    return ImageEditor;
}(Component));
export { ImageEditor };
