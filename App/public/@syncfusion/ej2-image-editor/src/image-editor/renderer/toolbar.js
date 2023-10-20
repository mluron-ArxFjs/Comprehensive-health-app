import { extend, Browser, detach, select } from '@syncfusion/ej2-base';
import { EventHandler, getComponent, isNullOrUndefined, L10n } from '@syncfusion/ej2-base';
import { Toolbar } from '@syncfusion/ej2-navigations';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
import { ColorPicker, Uploader, Slider } from '@syncfusion/ej2-inputs';
import { ZoomTrigger } from '../index';
import { hideSpinner, showSpinner } from '@syncfusion/ej2-popups';
var ToolbarModule = /** @class */ (function () {
    function ToolbarModule(parent) {
        this.defToolbarItems = [];
        this.toolbarHeight = 46;
        this.currToolbar = '';
        this.preventZoomBtn = false;
        this.currentToolbar = 'main';
        this.selFhdColor = '#42a5f5';
        this.preventEnableDisableUr = false;
        this.parent = parent;
        this.addEventListener();
        this.initLocale();
    }
    ToolbarModule.prototype.destroy = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.removeEventListener();
    };
    ToolbarModule.prototype.addEventListener = function () {
        this.parent.on('toolbar', this.toolbar, this);
        this.parent.on('destroyed', this.destroy, this);
    };
    ToolbarModule.prototype.removeEventListener = function () {
        this.parent.off('toolbar', this.toolbar);
        this.parent.off('destroyed', this.destroy);
    };
    ToolbarModule.prototype.initLocale = function () {
        this.defaultLocale = {
            Crop: 'Crop',
            ZoomIn: 'Zoom In',
            ZoomOut: 'Zoom Out',
            Undo: 'Undo',
            Redo: 'Redo',
            Transform: 'Transform',
            Annotation: 'Annotation',
            Finetune: 'Finetune',
            Brightness: 'Brightness',
            Contrast: 'Contrast',
            Hue: 'Hue',
            Saturation: 'Saturation',
            Opacity: 'Opacity',
            Blur: 'Blur',
            Sharpen: 'Sharpen',
            Exposure: 'Exposure',
            Filter: 'Filter',
            Default: 'Default',
            Chrome: 'Chrome',
            Cold: 'Cold',
            Warm: 'Warm',
            Grayscale: 'Grayscale',
            BlackAndWhite: 'Black and White',
            Sepia: 'Sepia',
            Invert: 'Invert',
            Text: 'Add Text',
            Pen: 'Pen',
            Reset: 'Reset',
            Save: 'Save',
            Select: 'Select',
            RotateLeft: 'Rotate Left',
            RotateRight: 'Rotate Right',
            HorizontalFlip: 'Horizontal Flip',
            VerticalFlip: 'Vertical Flip',
            OK: 'OK',
            Cancel: 'Cancel',
            FillColor: 'Fill Color',
            StrokeColor: 'Stroke Color',
            StrokeWidth: 'Stroke Width',
            FontFamily: 'Font Family',
            FontStyle: 'Font Style',
            FontSize: 'Font Size',
            FontColor: 'Font Color',
            Pan: 'Pan',
            Move: 'Move',
            Load: 'Load',
            Custom: 'Custom',
            Square: 'Square',
            Circle: 'Circle',
            Ellipse: 'Ellipse',
            Rectangle: 'Rectangle',
            Line: 'Line',
            Arrow: 'Arrow',
            Path: 'Path',
            Bold: 'Bold',
            Italic: 'Italic',
            BoldItalic: 'Bold Italic',
            XSmall: 'X-Small',
            Small: 'Small',
            Medium: 'Medium',
            Large: 'Large',
            XLarge: 'X-Large',
            ABC: 'ABC',
            Browse: 'Browse',
            Duplicate: 'Duplicate',
            Remove: 'Remove',
            EditText: 'Edit Text',
            Start: 'Start',
            End: 'End',
            Bar: 'Bar',
            ArrowSolid: 'Arrow Solid',
            CircleSolid: 'Circle Solid',
            SquareSolid: 'Square Solid',
            None: 'None',
            CropAndTransform: 'Crop and Transform',
            CropSelection: 'Crop Selection'
        };
        this.l10n = new L10n('image-editor', this.defaultLocale, this.parent.locale);
    };
    ToolbarModule.prototype.toolbar = function (args) {
        var parent = this.parent;
        this.updatePrivateVariables();
        switch (args.prop) {
            case 'create-toolbar':
                this.createToolbar();
                break;
            case 'create-contextual-toolbar':
                this.createContextualToolbar();
                break;
            case 'update-toolbar-items':
                this.updateToolbarItems();
                break;
            case 'refresh-toolbar':
                this.refreshToolbar(args.value['type'], args.value['isApplyBtn'], args.value['isCropping'], args.value['isZooming'], args.value['cType']);
                break;
            case 'renderQAT':
                this.renderQAT(args.value['isPenEdit']);
                break;
            case 'enable-disable-btns':
                this.enableDisableTbrBtn();
                break;
            case 'init-main-toolbar':
                this.initMainToolbar(args.value['isApplyBtn'], args.value['isDevice'], args.value['isOkBtn']);
                break;
            case 'create-bottom-toolbar':
                this.createBottomToolbar();
                break;
            case 'refresh-main-toolbar':
                this.refreshMainToolbar();
                break;
            case 'create-qa-toolbar':
                this.createQuickAccessToolbar();
                break;
            case 'destroy-qa-toolbar':
                this.destroyQuickAccessToolbar();
                break;
            case 'zoom-up-handler':
                this.zoomBtnMouseUpHandler();
                break;
            case 'refresh-dropdown-btn':
                this.refreshDropDownBtn(args.value['isDisabled']);
                break;
            case 'close-contextual-toolbar':
                this.closeContextualToolbar();
                break;
            case 'destroy-bottom-toolbar':
                this.destroyBottomToolbar();
                break;
            case 'destroy-top-toolbar':
                this.destroyTopToolbar();
                break;
            case 'destroySubComponents':
                this.destroySubComponents();
                break;
            case 'setLocale':
                this.l10n.setLocale(args.value['locale']);
                break;
            case 'setPreventZoomBtn':
                this.preventZoomBtn = args.value['isPrevent'];
                break;
            case 'getToolbarHeight':
                args.value['obj']['toolbarHeight'] = this.toolbarHeight;
                break;
            case 'setToolbarHeight':
                this.toolbarHeight = args.value['height'];
                break;
            case 'setCurrentToolbar':
                this.currentToolbar = args.value['type'];
                break;
            case 'setSelectedFreehandColor':
                this.selFhdColor = args.value['color'];
                break;
            case 'getCurrentFilter':
                args.value['obj']['currentFilter'] = parent.currentFilter;
                break;
            case 'setCurrentFilter':
                parent.currentFilter = args.value['filter'];
                break;
            case 'setInitialAdjustmentValue':
                parent.initialAdjustmentValue = args.value['value'];
                break;
            case 'getCanvasFilter':
                args.value['obj']['canvasFilter'] = parent.canvasFilter;
                break;
            case 'getDefToolbarItems':
                args.value['obj']['defToolbarItems'] = this.defToolbarItems;
                break;
            case 'getPenStroke':
                this.getPenStroke(args.value['value']);
                break;
            case 'performDefToolbarClickAction':
                this.performDefTbrClick(args.value['type'], args.value['isContextualToolbar'], args.value['isDisabledAdjustment'], args.value['isDisabledFilter'], args.value['isFilterFinetune']);
                break;
            case 'setTempFilterProperties':
                parent.setTempFilterProperties();
                break;
            case 'refreshSlider':
                this.refreshSlider();
                break;
            case 'renderSlider':
                this.renderSlider(args.value['type']);
                break;
            case 'getCurrAdjustmentValue':
                parent.getCurrAdjustmentValue(args.value['type']);
                break;
            case 'setCurrAdjustmentValue':
                parent.setCurrAdjustmentValue(args.value['type'], args.value['value']);
                break;
            case 'refreshShapeDrawing':
                this.refreshShapeDrawing();
                break;
            case 'getCropToolbar':
                args.value['obj']['isCropToolbar'] = parent.isCropToolbar;
                break;
            case 'getPrevCurrSelectionPoint':
                args.value['obj']['prevCurrSelectionPoint'] = parent.prevCurrSelectionPoint;
                break;
            case 'setPrevCurrSelectionPoint':
                parent.prevCurrSelectionPoint = args.value['point'];
                break;
            case 'updateCropTransformItems':
                parent.updateCropTransformItems();
                break;
            case 'setEnableDisableUndoRedo':
                this.preventEnableDisableUr = args.value['isPrevent'];
                break;
            case 'reset':
                this.reset();
                break;
        }
    };
    ToolbarModule.prototype.updatePrivateVariables = function () {
        var parent = this.parent;
        this.inMemoryCanvas = parent.inMemoryCanvas;
        if (parent.lowerCanvas) {
            this.lowerContext = parent.lowerCanvas.getContext('2d');
        }
        if (parent.upperCanvas) {
            this.upperContext = parent.upperCanvas.getContext('2d');
        }
        if (this.inMemoryCanvas) {
            this.inMemoryContext = this.inMemoryCanvas.getContext('2d');
        }
    };
    ToolbarModule.prototype.reset = function () {
        var parent = this.parent;
        this.defToolbarItems = [];
        this.toolbarHeight = 46;
        parent.prevCurrSelectionPoint = null;
        this.zoomBtnHold = null;
        this.currToolbar = '';
        this.currentToolbar = 'main';
        this.selFhdColor = '#42a5f5';
        parent.currentFilter = '';
        this.preventZoomBtn = parent.isCropToolbar = this.preventEnableDisableUr = false;
        parent.initialAdjustmentValue = parent.canvasFilter =
            'brightness(' + 1 + ') ' + 'contrast(' + 100 + '%) ' + 'hue-rotate(' + 0 + 'deg) ' +
                'saturate(' + 100 + '%) ' + 'opacity(' + 1 + ') ' + 'blur(' + 0 + 'px) ' + 'sepia(0%) ' + 'grayscale(0%) ' + 'invert(0%)';
    };
    ToolbarModule.prototype.destroyTopToolbar = function () {
        var parent = this.parent;
        var toolbar = document.getElementById(parent.element.id + '_toolbar');
        if (this.isToolbar() && toolbar && toolbar.classList.contains('e-control')) {
            getComponent(document.getElementById(parent.element.id + '_toolbar'), 'toolbar').destroy();
        }
    };
    ToolbarModule.prototype.destroyBottomToolbar = function () {
        var parent = this.parent;
        var toolbar = document.getElementById(parent.element.id + '_bottomToolbar');
        if (toolbar && toolbar.classList.contains('e-control')) {
            getComponent(document.getElementById(parent.element.id + '_bottomToolbar'), 'toolbar').destroy();
        }
    };
    ToolbarModule.prototype.isToolbar = function () {
        var parent = this.parent;
        return (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.length > 0)
            || !isNullOrUndefined(parent.toolbarTemplate));
    };
    ToolbarModule.prototype.createToolbar = function () {
        var _this = this;
        var parent = this.parent;
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.length > 0)) {
            parent.element.appendChild(parent.createElement('div', {
                id: parent.element.id + '_toolbarArea', className: 'e-toolbar-area'
            }));
            var toolbarItems = { cssClass: 'e-image-upload', align: 'Left', type: 'Input',
                tooltipText: this.l10n.getConstant('Browse'), template: new Uploader({ allowedExtensions: '.jpg, .jpeg, .png,.svg' }) };
            if (isNullOrUndefined(this.defToolbarItems)) {
                this.defToolbarItems = [];
            }
            this.defToolbarItems.push(toolbarItems);
            var toolbarArea = document.getElementById(parent.element.id + '_toolbarArea');
            var toolbar_1 = parent.createElement('div', {
                id: parent.element.id + '_toolbar'
            });
            toolbarArea.appendChild(toolbar_1);
            var uploadItems = [
                {
                    cssClass: 'e-image-upload',
                    align: 'Left', type: 'Input',
                    tooltipText: this.l10n.getConstant('Browse'),
                    template: new Uploader({
                        allowedExtensions: '.jpg, .jpeg, .png,.svg',
                        selected: function () {
                            if (!parent.disabled) {
                                if (Browser.isDevice) {
                                    if (_this.defToolbarItems.length > 0 &&
                                        document.getElementById(parent.element.id + '_toolbar')) {
                                        getComponent(document.getElementById(parent.element.id + '_toolbar'), 'toolbar').destroy();
                                    }
                                    if (document.getElementById(parent.element.id + '_bottomToolbar')) {
                                        getComponent(document.getElementById(parent.element.id + '_bottomToolbar'), 'toolbar').destroy();
                                    }
                                    _this.initMainToolbar(false, Browser.isDevice, null);
                                    _this.createBottomToolbar();
                                }
                                else {
                                    if (_this.defToolbarItems.length > 0 &&
                                        document.getElementById(parent.element.id + '_toolbar')) {
                                        getComponent(document.getElementById(parent.element.id + '_toolbar'), 'toolbar').destroy();
                                    }
                                    _this.initMainToolbar(false, false, null);
                                }
                            }
                        }
                    })
                }
            ];
            var toolbarObj = new Toolbar({ items: uploadItems, width: '100%',
                created: function () {
                    parent.trigger('toolbarCreated', { toolbarType: 'main' });
                },
                clicked: this.defToolbarClicked.bind(this) });
            toolbarObj.appendTo('#' + parent.element.id + '_toolbar');
            this.createLeftToolbarControls();
            if (document.getElementById(parent.element.id + '_toolbar')) {
                this.toolbarHeight = document.getElementById(parent.element.id + '_toolbar').clientHeight;
            }
        }
        else {
            this.toolbarHeight = 0;
        }
    };
    ToolbarModule.prototype.createContextualToolbar = function () {
        var parent = this.parent;
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.length > 0)) {
            parent.element.appendChild(parent.createElement('div', { id: parent.element.id + '_contextualToolbarArea',
                className: 'e-contextual-toolbar-wrapper e-hide', attrs: { style: 'position: absolute;' }
            }));
            var toolbarArea = document.getElementById(parent.element.id + '_contextualToolbarArea');
            var toolbar_2 = parent.createElement('div', { id: parent.element.id + '_contextualToolbar' });
            toolbarArea.appendChild(toolbar_2);
        }
    };
    ToolbarModule.prototype.createBottomToolbar = function () {
        var parent = this.parent;
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.length > 0)) {
            parent.element.appendChild(parent.createElement('div', {
                id: parent.element.id + '_bottomToolbarArea', className: 'e-bottom-toolbar'
            }));
            if (!parent.toolbarTemplate) {
                document.getElementById(parent.element.id + '_canvasWrapper').style.height = (parent.element.offsetHeight
                    - this.toolbarHeight * 2) - 3 + 'px';
                var toolbarArea = document.getElementById(parent.element.id + '_bottomToolbarArea');
                var toolbarElem = parent.createElement('div', {
                    id: parent.element.id + '_bottomToolbar'
                });
                toolbarArea.appendChild(toolbarElem);
            }
            this.initBottomToolbar();
        }
    };
    ToolbarModule.prototype.createQuickAccessToolbar = function () {
        var parent = this.parent;
        if (parent.showQuickAccessToolbar) {
            var toolbarItems = { cssClass: 'e-image-upload', align: 'Left', type: 'Input',
                tooltipText: this.l10n.getConstant('Browse'), template: new Uploader({ allowedExtensions: '.jpg, .jpeg, .png,.svg' }) };
            if (isNullOrUndefined(this.defToolbarItems)) {
                this.defToolbarItems = [];
            }
            this.defToolbarItems.push(toolbarItems);
            var toolbarArea = document.getElementById(parent.element.id + '_quickAccessToolbarArea');
            var toolbar_3 = parent.createElement('div', {
                id: parent.element.id + '_quickAccessToolbar'
            });
            toolbarArea.appendChild(toolbar_3);
            var toolbarObj = new Toolbar({ clicked: this.defToolbarClicked.bind(this) });
            toolbarObj.appendTo('#' + parent.element.id + '_quickAccessToolbar');
        }
    };
    ToolbarModule.prototype.initMainToolbar = function (isApplyOption, isDevice, isOkBtn) {
        var _this = this;
        var parent = this.parent;
        if (this.isToolbar()) {
            var leftItem = this.getLeftToolbarItem(isOkBtn);
            var rightItem = this.getRightToolbarItem(isOkBtn);
            var mainItem = this.getMainToolbarItem(isApplyOption);
            var zoomItem = this.getZoomToolbarItem();
            if (isDevice) {
                this.defToolbarItems = leftItem.concat(rightItem);
            }
            else {
                this.defToolbarItems = leftItem.concat(mainItem, rightItem, zoomItem);
            }
            var toolbarObj = new Toolbar({
                width: '100%',
                items: this.defToolbarItems,
                clicked: this.defToolbarClicked.bind(this),
                created: function () {
                    if (!isDevice) {
                        _this.renderAnnotationBtn();
                    }
                    _this.wireZoomBtnEvents();
                    _this.renderSaveBtn();
                    parent.trigger('toolbarCreated', { toolbarType: 'main' });
                }
            });
            toolbarObj.appendTo('#' + parent.element.id + '_toolbar');
            this.createLeftToolbarControls();
            this.enableDisableTbrBtn();
            if (this.isToolbar() && document.getElementById(parent.element.id + '_toolbar')) {
                /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                var toolbar_4 = getComponent(parent.element.id + '_toolbar', 'toolbar');
                toolbar_4.refreshOverflow();
            }
        }
    };
    ToolbarModule.prototype.initBottomToolbar = function () {
        var _this = this;
        var parent = this.parent;
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.length > 0)) {
            var items = this.getMainToolbarItem();
            var toolbarObj = new Toolbar({ items: items, width: '100%',
                created: function () {
                    _this.renderAnnotationBtn();
                    _this.renderCropBtn();
                    _this.renderTransformBtn();
                    parent.trigger('toolbarCreated', { toolbarType: 'main' });
                },
                clicked: this.defToolbarClicked.bind(this)
            });
            toolbarObj.appendTo('#' + parent.element.id + '_bottomToolbar');
            if (this.defToolbarItems.length > 0 && document.getElementById(parent.element.id + '_bottomToolbar')) {
                /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                var toolbar_5 = getComponent(parent.element.id + '_bottomToolbar', 'toolbar');
                toolbar_5.refreshOverflow();
            }
        }
    };
    ToolbarModule.prototype.getLeftToolbarItem = function (isOkBtn) {
        var parent = this.parent;
        var toolbarItems = [];
        if (!isOkBtn) {
            toolbarItems.push({ id: parent.element.id + '_upload', cssClass: 'e-image-upload', align: 'Left', type: 'Input', template: new Uploader({ allowedExtensions: '.jpg, .jpeg, .png,.svg' }) });
            toolbarItems.push({ visible: false, cssClass: 'e-image-position e-btn e-flat', tooltipText: this.l10n.getConstant('Browse'), align: 'Left' });
        }
        if (parent.allowUndoRedo) {
            if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('Undo') > -1)) {
                toolbarItems.push({ id: parent.element.id + '_undo', prefixIcon: 'e-icons e-undo', cssClass: 'top-icon e-undo',
                    tooltipText: this.l10n.getConstant('Undo'), align: 'Left' });
            }
            if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('Redo') > -1)) {
                toolbarItems.push({ id: parent.element.id + '_redo', prefixIcon: 'e-icons e-redo', cssClass: 'top-icon e-redo',
                    tooltipText: this.l10n.getConstant('Redo'), align: 'Left' });
            }
        }
        if (!this.preventZoomBtn && (parent.zoomSettings.zoomTrigger & ZoomTrigger.Toolbar) === ZoomTrigger.Toolbar) {
            if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('ZoomOut') > -1)) {
                toolbarItems.push({ id: parent.element.id + '_zoomOut', prefixIcon: 'e-icons e-zoom-out', cssClass: 'top-icon e-dec-zoom',
                    tooltipText: this.l10n.getConstant('ZoomOut'), align: 'Left' });
            }
            if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('ZoomIn') > -1)) {
                toolbarItems.push({ id: parent.element.id + '_zoomIn', prefixIcon: 'e-icons e-zoom-in', cssClass: 'top-icon e-inc-zoom',
                    tooltipText: this.l10n.getConstant('ZoomIn'), align: 'Left' });
            }
        }
        var tempToolbarItems = this.processToolbar('left');
        for (var i = 0, len = tempToolbarItems.length; i < len; i++) {
            toolbarItems.push(tempToolbarItems[i]);
        }
        return toolbarItems;
    };
    ToolbarModule.prototype.getRightToolbarItem = function (isOkBtn) {
        var parent = this.parent;
        var toolbarItems = [];
        if (isOkBtn) {
            toolbarItems.push({ id: parent.element.id + '_ok', prefixIcon: 'e-icons e-check', cssClass: 'top-icon e-tick',
                tooltipText: this.l10n.getConstant('OK'), align: 'Right' });
            toolbarItems.push({ id: parent.element.id + '_cancel', prefixIcon: 'e-icons e-close', cssClass: 'top-icon e-save',
                tooltipText: this.l10n.getConstant('Cancel'), align: 'Right' });
        }
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('Reset') > -1)) {
            toolbarItems.push({ id: parent.element.id + '_reset', prefixIcon: 'e-icons e-btn-reset', cssClass: 'top-icon e-img-reset',
                tooltipText: this.l10n.getConstant('Reset'), align: 'Right' });
        }
        if (!isOkBtn) {
            if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('Save') > -1)) {
                toolbarItems.push({ id: parent.element.id + '_save', prefixIcon: 'e-icons e-btn-save', cssClass: 'top-icon e-save',
                    tooltipText: this.l10n.getConstant('Save'), align: 'Right', template: '<button id="' + parent.element.id + '_saveBtn"></button>' });
            }
        }
        var tempToolbarItems = this.processToolbar('right');
        for (var i = 0, len = tempToolbarItems.length; i < len; i++) {
            toolbarItems.push(tempToolbarItems[i]);
        }
        return toolbarItems;
    };
    ToolbarModule.prototype.getMainToolbarItem = function (isApplyOption) {
        var parent = this.parent;
        var toolbarItems = [];
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('Crop') > -1)) {
            toolbarItems.push({ id: parent.element.id + '_cropTransform', prefixIcon: 'e-icons e-crop', cssClass: 'top-icon e-crop',
                tooltipText: this.l10n.getConstant('CropAndTransform'), align: 'Center' });
        }
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('Annotate') > -1)) {
            toolbarItems.push({ id: parent.element.id + '_annotation', tooltipText: this.l10n.getConstant('Annotation'), align: 'Center',
                template: '<button id="' + parent.element.id + '_annotationBtn"></button>' });
        }
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('Finetune') > -1)) {
            toolbarItems.push({ id: parent.element.id + '_adjustment', prefixIcon: 'e-icons e-adjustment', cssClass: 'top-icon e-adjustment',
                tooltipText: this.l10n.getConstant('Finetune'), align: 'Center' });
        }
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('Filter') > -1)) {
            toolbarItems.push({ id: parent.element.id + '_filter', prefixIcon: 'e-icons e-filters', cssClass: 'top-icon e-filters',
                tooltipText: this.l10n.getConstant('Filter'), align: 'Center' });
        }
        var tempToolbarItems = this.processToolbar('center');
        for (var i = 0, len = tempToolbarItems.length; i < len; i++) {
            toolbarItems.push(tempToolbarItems[i]);
        }
        if (isApplyOption) {
            toolbarItems.push({ id: parent.element.id + '_ok', prefixIcon: 'e-icons e-check', cssClass: 'top-icon e-tick',
                tooltipText: this.l10n.getConstant('OK'), align: 'Right' });
            toolbarItems.push({ id: parent.element.id + '_cancel', prefixIcon: 'e-icons e-close', cssClass: 'top-icon e-save',
                tooltipText: this.l10n.getConstant('Cancel'), align: 'Right' });
        }
        return toolbarItems;
    };
    ToolbarModule.prototype.getZoomToolbarItem = function () {
        var toolbarItems = [];
        return toolbarItems;
    };
    ToolbarModule.prototype.updateContextualToolbar = function (type, cType) {
        var parent = this.parent;
        var toolbarArea = parent.element.querySelector('#' + parent.element.id + '_toolbarArea');
        var contextualToolbarArea = parent.element.querySelector('#' + parent.element.id + '_contextualToolbarArea');
        contextualToolbarArea.classList.remove('e-hide');
        contextualToolbarArea.style.left = toolbarArea.offsetLeft + 'px';
        if (type === 'filter') {
            if (document.getElementById(parent.element.id + '_toolbar') && this.defToolbarItems.length > 0) {
                getComponent(document.getElementById(parent.element.id + '_toolbar'), 'toolbar').destroy();
            }
            if (Browser.isDevice) {
                this.initMainToolbar(false, true, true);
            }
            else {
                this.initMainToolbar(true, null, null);
            }
            this.refreshSlider();
            this.initFilterToolbarItem();
        }
        else {
            if (document.querySelector('#' + parent.element.id + '_contextualToolbar').classList.contains('e-control')) {
                getComponent(document.getElementById(parent.element.id + '_contextualToolbar'), 'toolbar').destroy();
            }
            this.refreshSlider();
            this.renderSlider(cType);
        }
        if (Browser.isDevice) {
            var cHt = contextualToolbarArea.offsetHeight;
            var ht = parent.element.querySelector('#' + parent.element.id + '_canvasWrapper').offsetHeight;
            contextualToolbarArea.style.top = this.toolbarHeight + ht - cHt + 'px';
        }
        else {
            contextualToolbarArea.style.top = this.toolbarHeight + 'px';
        }
    };
    ToolbarModule.prototype.processToolbar = function (position) {
        var parent = this.parent;
        var toolbarItems = [];
        if (parent.toolbar) {
            for (var i = 0, len = parent.toolbar.length; i < len; i++) {
                if (typeof (parent.toolbar[i]) === 'object') {
                    if (isNullOrUndefined(parent.toolbar[i].align)) {
                        if (position === 'left') {
                            toolbarItems.push(parent.toolbar[i]);
                        }
                    }
                    else if (parent.toolbar[i].align.toLowerCase() === position) {
                        toolbarItems.push(parent.toolbar[i]);
                    }
                }
            }
        }
        return toolbarItems;
    };
    ToolbarModule.prototype.processSubToolbar = function (items) {
        var toolbarItems = [];
        if (items) {
            for (var i = 0, len = items.length; i < len; i++) {
                if (typeof (items[i]) === 'object') {
                    items[i].align = 'Center';
                    toolbarItems.push(items[i]);
                }
            }
        }
        return toolbarItems;
    };
    ToolbarModule.prototype.wireZoomBtnEvents = function () {
        var zoomIn = document.querySelector('#' + this.parent.element.id + '_zoomIn');
        var zoomOut = document.querySelector('#' + this.parent.element.id + '_zoomOut');
        if (zoomIn) {
            zoomIn.addEventListener('mousedown', this.zoomInBtnMouseDownHandler.bind(this));
            zoomIn.addEventListener('mouseup', this.zoomBtnMouseUpHandler.bind(this));
            zoomIn.addEventListener('click', this.zoomInBtnClickHandler.bind(this));
            zoomIn.addEventListener('touchstart', this.zoomInBtnClickHandler.bind(this));
        }
        if (zoomOut) {
            zoomOut.addEventListener('mousedown', this.zoomOutBtnMouseDownHandler.bind(this));
            zoomOut.addEventListener('mouseup', this.zoomBtnMouseUpHandler.bind(this));
            zoomOut.addEventListener('click', this.zoomOutBtnClickHandler.bind(this));
            zoomIn.addEventListener('touchstart', this.zoomInBtnClickHandler.bind(this));
        }
    };
    ToolbarModule.prototype.enableDisableTbrBtn = function () {
        var parent = this.parent;
        if (!this.preventEnableDisableUr) {
            var object = { appliedUndoRedoColl: [] };
            parent.notify('undo-redo', { prop: 'getAppliedUndoRedoColl', value: { obj: object } });
            var undoRedoObj = { undoRedoStep: null };
            parent.notify('undo-redo', { prop: 'getUndoRedoStep', value: { obj: undoRedoObj } });
            var undo = document.querySelector('#' + parent.element.id + '_undo');
            if (undo && undoRedoObj['undoRedoStep'] === 0) {
                undo.classList.add('e-disabled');
                undo.parentElement.classList.add('e-overlay');
            }
            else if (undo && undoRedoObj['undoRedoStep'] > 0) {
                undo.classList.remove('e-disabled');
                undo.parentElement.classList.remove('e-overlay');
            }
            var redo = document.querySelector('#' + parent.element.id + '_redo');
            if (redo && (undoRedoObj['undoRedoStep'] === object['appliedUndoRedoColl'].length)) {
                redo.classList.add('e-disabled');
                redo.parentElement.classList.add('e-overlay');
            }
            else if (redo && (undoRedoObj['undoRedoStep'] === 0 && object['appliedUndoRedoColl'].length > 0)) {
                redo.classList.remove('e-disabled');
                redo.parentElement.classList.remove('e-overlay');
            }
            else if (redo && undoRedoObj['undoRedoStep'] > 0) {
                redo.classList.remove('e-disabled');
                redo.parentElement.classList.remove('e-overlay');
            }
        }
        var zoomIn = document.querySelector('#' + parent.element.id + '_zoomIn');
        if (zoomIn && parent.zoomSettings.zoomFactor >= parent.zoomSettings.maxZoomFactor) {
            zoomIn.classList.add('e-disabled');
            zoomIn.parentElement.classList.add('e-overlay');
        }
        else if (zoomIn) {
            zoomIn.classList.remove('e-disabled');
            zoomIn.parentElement.classList.remove('e-overlay');
        }
        var zoomOut = document.querySelector('#' + parent.element.id + '_zoomOut');
        if (zoomOut && parent.zoomSettings.zoomFactor <= parent.zoomSettings.minZoomFactor) {
            zoomOut.classList.add('e-disabled');
            zoomOut.parentElement.classList.add('e-overlay');
        }
        else if (zoomOut) {
            zoomOut.classList.remove('e-disabled');
            zoomOut.parentElement.classList.remove('e-overlay');
        }
        var pan = document.querySelector('#' + parent.element.id + '_pan');
        if (pan && parent.zoomSettings.zoomFactor <= parent.zoomSettings.minZoomFactor) {
            pan.style.display = 'none';
        }
        else if (pan) {
            pan.style.display = 'block';
        }
    };
    ToolbarModule.prototype.createLeftToolbarControls = function () {
        var parent = this.parent;
        if (this.defToolbarItems !== undefined && this.defToolbarItems.length > 0 &&
            (document.getElementById(parent.element.id + '_toolbar'))) {
            var uploadDiv = document.getElementById(parent.element.id + '_toolbar')
                .querySelector('.e-image-upload');
            if (uploadDiv) {
                var uploadElem = uploadDiv.getElementsByTagName('input')[0];
                var uploadBtnElem = uploadDiv.getElementsByTagName('button')[0];
                uploadBtnElem.className = 'e-tbar-btn e-tbtn-txt top-icon';
                uploadBtnElem.innerHTML = '';
                uploadBtnElem.appendChild(parent.createElement('span', {
                    className: 'e-btn-icon e-icons e-upload-icon e-icon-left'
                }));
                uploadElem.onchange = this.fileSelect.bind(this, uploadElem);
            }
        }
    };
    ToolbarModule.prototype.fileSelect = function (inputElement, args) {
        this.parent.notify('draw', { prop: 'fileSelect', value: { inputElement: inputElement, args: args } });
    };
    ToolbarModule.prototype.renderAnnotationBtn = function (isContextualToolbar) {
        var _this = this;
        var parent = this.parent;
        var items = [];
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('Pen') > -1)) {
            items.push({ text: this.l10n.getConstant('Pen'), id: 'pen', iconCss: 'e-icons e-free-pen' });
        }
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('Line') > -1)) {
            items.push({ text: this.l10n.getConstant('Line'), id: 'line', iconCss: 'e-icons e-line' });
        }
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('Rectangle') > -1)) {
            items.push({ text: this.l10n.getConstant('Rectangle'), id: 'rectangle', iconCss: 'e-icons e-rectangle' });
        }
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('Ellipse') > -1)) {
            items.push({ text: this.l10n.getConstant('Ellipse'), id: 'ellipse', iconCss: 'e-icons e-circle' });
        }
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('Arrow') > -1)) {
            items.push({ text: this.l10n.getConstant('Arrow'), id: 'arrow', iconCss: 'e-icons e-arrow-right-up' });
        }
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('Path') > -1)) {
            items.push({ text: this.l10n.getConstant('Path'), id: 'path', iconCss: 'e-icons e-critical-path' });
        }
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('Text') > -1)) {
            items.push({ text: this.l10n.getConstant('Text'), id: 'text', iconCss: 'e-icons e-add-text' });
        }
        var obj = { freehandDrawSelectedId: null };
        parent.notify('freehand-draw', { prop: 'getFreehandDrawSelectedId', onPropertyChange: false, value: { obj: obj } });
        var duplicateElement = document.querySelector('#' + parent.element.id + '_duplicate');
        var removeElement = document.querySelector('#' + parent.element.id + '_remove');
        var editTextElement = document.querySelector('#' + parent.element.id + '_editText');
        if ((parent.activeObj.activePoint.width === 0 && parent.activeObj.activePoint.height === 0) &&
            (isNullOrUndefined(parent.activeObj.pointColl) || (parent.activeObj.pointColl
                && parent.activeObj.pointColl.length === 0)) &&
            isNullOrUndefined(obj['freehandDrawSelectedId'])) {
            if (duplicateElement) {
                duplicateElement.classList.add('e-disabled');
            }
            if (removeElement) {
                removeElement.classList.add('e-disabled');
            }
            if (editTextElement) {
                editTextElement.classList.add('e-disabled');
            }
        }
        else {
            if (duplicateElement) {
                duplicateElement.classList.remove('e-disabled');
            }
            if (removeElement) {
                removeElement.classList.remove('e-disabled');
            }
            if (editTextElement) {
                editTextElement.classList.remove('e-disabled');
            }
        }
        var iconCss = isContextualToolbar ? this.getCurrentShapeIcon(parent.activeObj.shape) : 'e-annotation';
        var drpDownBtn = new DropDownButton({ items: items, iconCss: 'e-icons ' + iconCss,
            cssClass: 'e-image-popup',
            open: function (args) {
                if (Browser.isDevice) {
                    args.element.parentElement.style.top = drpDownBtn.element.getBoundingClientRect().top -
                        args.element.parentElement.offsetHeight + 'px';
                }
                if (parent.activeObj.shape) {
                    document.getElementById(parent.activeObj.shape).classList.add('e-selected');
                }
                else if (parent.togglePen) {
                    document.getElementById('pen').classList.add('e-selected');
                }
            },
            select: function (args) {
                parent.okBtn();
                var isCropSelection = false;
                var splitWords;
                if (parent.activeObj.shape !== undefined) {
                    splitWords = parent.activeObj.shape.split('-');
                }
                if (splitWords === undefined && parent.currObjType.isCustomCrop) {
                    isCropSelection = true;
                }
                else if (splitWords !== undefined && splitWords[0] === 'crop') {
                    isCropSelection = true;
                }
                parent.currObjType.isCustomCrop = false;
                if (isCropSelection || parent.togglePan) {
                    parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
                    _this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
                    _this.refreshToolbar('main');
                }
                var obj = { currentFreehandDrawIndex: null };
                parent.notify('freehand-draw', { prop: 'getCurrentFreehandDrawIndex', value: { obj: obj } });
                drpDownBtn.iconCss = 'e-icons ' + _this.getCurrentShapeIcon(args.item.id);
                switch (args.item.id) {
                    case 'pen':
                        parent.notify('draw', { prop: 'setTempFreehandCounter', value: { tempFreehandCounter: parent.freehandCounter } });
                        parent.notify('draw', { prop: 'setTempCurrentFreehandDrawIndex', value: { tempCurrentFreehandDrawIndex: obj['currentFreehandDrawIndex'] } });
                        _this.currentToolbar = 'pen';
                        parent.freeHandDraw(true);
                        break;
                    case 'text':
                        _this.currentToolbar = 'text';
                        parent.notify('shape', { prop: 'draw-shape-text' });
                        // this.setInitialShapeSettings(args);
                        // parent.activeObj.textFlip = parent.transform.currFlipState;
                        // parent.notify('selection', {prop: 'annotate', value: {shape: args.item.id }});
                        // parent.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: {type: 'text',
                        //     isApplyBtn: null, isCropping: null, isZooming: null, cType: null}});
                        break;
                    default:
                        _this.currentToolbar = 'shapes';
                        /// parent.notify('shape', { prop: 'draw-shape', value: {obj: (args.item.id).toLowerCase()}});
                        _this.setInitialShapeSettings(args);
                        parent.notify('selection', { prop: 'annotate', value: { shape: args.item.id } });
                        parent.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'shapes',
                                isApplyBtn: null, isCropping: null, isZooming: null, cType: null } });
                        break;
                }
                _this.updateToolbarItems();
            }
        });
        // Render initialized DropDownButton.
        drpDownBtn.appendTo('#' + parent.element.id + '_annotationBtn');
    };
    ToolbarModule.prototype.renderCropBtn = function () {
        var _this = this;
        var parent = this.parent;
        var items = [];
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('CustomSelection') > -1)) {
            items.push({ text: this.l10n.getConstant('Custom'), id: 'custom', iconCss: 'e-icons e-custom' });
        }
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('CircleSelection') > -1)) {
            items.push({ text: this.l10n.getConstant('Circle'), id: 'circle', iconCss: 'e-icons e-circle' });
        }
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('SquareSelection') > -1)) {
            items.push({ text: this.l10n.getConstant('Square'), id: 'square', iconCss: 'e-icons e-square' });
        }
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('RatioSelection') > -1)) {
            items.push({ text: '3:2', id: '3:2', iconCss: 'e-icons e-custom-a' });
            items.push({ text: '4:3', id: '4:3', iconCss: 'e-icons e-custom-b' });
            items.push({ text: '5:4', id: '5:4', iconCss: 'e-icons e-custom-c' });
            items.push({ text: '7:5', id: '7:5', iconCss: 'e-icons e-custom-d' });
            items.push({ text: '16:9', id: '16:9', iconCss: 'e-icons e-custom-e' });
        }
        var iconCss;
        var shape;
        if (parent.activeObj.shape) {
            iconCss = this.getCurrentShapeIcon(parent.activeObj.shape);
            shape = parent.activeObj.shape;
        }
        else if (parent.currSelectionPoint) {
            iconCss = this.getCurrentShapeIcon(parent.currSelectionPoint.shape);
            shape = parent.currSelectionPoint.shape;
        }
        else {
            iconCss = 'e-custom';
            shape = 'custom';
        }
        var drpDownBtn = new DropDownButton({
            open: function (args) {
                if (parent.togglePan) {
                    _this.cancelPan();
                }
                if (Browser.isDevice) {
                    args.element.parentElement.style.top = drpDownBtn.element.getBoundingClientRect().top -
                        args.element.parentElement.offsetHeight + 'px';
                }
                if (parent.activeObj.shape && parent.activeObj.shape.split('-').length > 1) {
                    document.getElementById(parent.activeObj.shape.split('-')[1]).classList.add('e-selected');
                }
                parent.notify('transform', { prop: 'disableZoomOutBtn', value: { isZoomOut: true } });
            },
            items: items,
            select: function (args) {
                _this.cropSelect(args);
                drpDownBtn.iconCss = 'e-icons ' + _this.getCurrentShapeIcon('crop-' + args.item.id);
                drpDownBtn.content = parent.toPascalCase(args.item.id);
            },
            iconCss: 'e-icons ' + iconCss, cssClass: 'e-image-popup',
            content: parent.toPascalCase(shape.replace('crop-', ''))
        });
        drpDownBtn.appendTo('#' + parent.element.id + '_cropBtn');
    };
    ToolbarModule.prototype.renderTransformBtn = function () {
        var parent = this.parent;
        var items = [];
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('RotateLeft') > -1)) {
            items.push({ text: this.l10n.getConstant('RotateLeft'), id: 'rotateleft', iconCss: 'e-icons e-anti-clock-wise' });
        }
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('RotateRight') > -1)) {
            items.push({ text: this.l10n.getConstant('RotateRight'), id: 'rotateright', iconCss: 'e-icons e-clock-wise' });
        }
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('FlipHorizontal') > -1)) {
            items.push({ text: this.l10n.getConstant('HorizontalFlip'), id: 'horizontalflip', iconCss: 'e-icons e-horizontal-flip' });
        }
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('FlipVertical') > -1)) {
            items.push({ text: this.l10n.getConstant('VerticalFlip'), id: 'verticalflip', iconCss: 'e-icons e-vertical-flip' });
        }
        var drpDownBtn = new DropDownButton({
            open: function (args) {
                if (Browser.isDevice) {
                    var ht = args.element.parentElement.offsetHeight;
                    args.element.parentElement.style.display = 'none';
                    args.element.parentElement.style.top = drpDownBtn.element.getBoundingClientRect().top -
                        ht + 'px';
                    args.element.parentElement.style.display = 'block';
                }
            },
            items: items, select: parent.transformSelect.bind(this),
            iconCss: 'e-icons e-transform', cssClass: 'e-image-popup'
        });
        drpDownBtn.appendTo('#' + parent.element.id + '_transformBtn');
    };
    ToolbarModule.prototype.renderSaveBtn = function () {
        var parent = this.parent;
        var saveItems = [
            { text: 'JPEG', id: 'jpeg' },
            { text: 'PNG', id: 'png' },
            { text: 'SVG', id: 'svg' }
        ];
        var ddbElem = document.getElementById(parent.element.id + '_saveBtn');
        if (ddbElem) {
            // Initialize the DropDownButton component.
            var saveDrpDownBtn = new DropDownButton({ items: saveItems, cssClass: 'e-caret-hide e-image-popup', iconCss: 'e-icons e-save',
                select: function (args) {
                    parent.export(args.item.text);
                }
            });
            saveDrpDownBtn.appendTo('#' + parent.element.id + '_saveBtn');
        }
    };
    ToolbarModule.prototype.getCropTransformToolbarItem = function () {
        var parent = this.parent;
        var toolbarItems = [];
        toolbarItems.push({ id: parent.element.id + '_crop', tooltipText: this.l10n.getConstant('CropSelection'), align: 'Center',
            template: '<button id="' + parent.element.id + '_cropBtn"></button>'
        });
        toolbarItems.push({ align: 'Center', type: 'Separator' });
        toolbarItems.push({ id: parent.element.id + '_rotateLeft', prefixIcon: 'e-icons e-anti-clock-wise',
            tooltipText: this.l10n.getConstant('RotateLeft'), align: 'Center' });
        toolbarItems.push({ id: parent.element.id + '_rotateRight', prefixIcon: 'e-icons e-clock-wise',
            tooltipText: this.l10n.getConstant('RotateRight'), align: 'Center' });
        toolbarItems.push({ align: 'Center', type: 'Separator' });
        toolbarItems.push({ id: parent.element.id + '_horizontalFlip', prefixIcon: 'e-icons e-horizontal-flip',
            tooltipText: this.l10n.getConstant('HorizontalFlip'), align: 'Center' });
        toolbarItems.push({ id: parent.element.id + '_verticalFlip', prefixIcon: 'e-icons e-vertical-flip',
            tooltipText: this.l10n.getConstant('VerticalFlip'), align: 'Center' });
        if (!Browser.isDevice) {
            toolbarItems.push({ id: parent.element.id + '_ok', prefixIcon: 'e-icons e-check', cssClass: 'top-icon e-tick',
                tooltipText: this.l10n.getConstant('OK'), align: 'Right' });
            toolbarItems.push({ id: parent.element.id + '_cancel', prefixIcon: 'e-icons e-close', cssClass: 'top-icon e-save',
                tooltipText: this.l10n.getConstant('Cancel'), align: 'Right' });
        }
        return toolbarItems;
    };
    ToolbarModule.prototype.getShapesToolbarItem = function (items) {
        var parent = this.parent;
        var toolbarItems = [];
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar)) {
            toolbarItems.push({ id: parent.element.id + '_annotation', tooltipText: this.l10n.getConstant('Annotation'), align: 'Center',
                template: '<button id="' + parent.element.id + '_annotationBtn"></button>' });
        }
        if (items.indexOf('fillColor') > -1) {
            toolbarItems.push({ prefixIcon: 'e-icons e-copy', id: parent.element.id + '_fillcolor',
                cssClass: 'top-icon e-fill', tooltipText: this.l10n.getConstant('FillColor'), align: 'Center', type: 'Input',
                template: '<button id="' + parent.element.id + '_fillColorBtn"></button>' });
        }
        if (items.indexOf('strokeColor') > -1) {
            toolbarItems.push({ prefixIcon: 'e-icons e-copy', id: parent.element.id + '_strokecolor',
                cssClass: 'top-icon e-stroke', tooltipText: this.l10n.getConstant('StrokeColor'), align: 'Center', type: 'Input',
                template: '<button id="' + parent.element.id + '_borderColorBtn"></button>' });
        }
        if (items.indexOf('strokeWidth') > -1) {
            toolbarItems.push({ id: parent.element.id + '_strokeWidth', cssClass: 'top-icon e-size', tooltipText: 'Stroke Width', align: 'Center',
                type: 'Input', template: '<button id="' + parent.element.id + '_borderWidthBtn"></button>' });
        }
        if (items.indexOf('start') > -1) {
            toolbarItems.push({ id: parent.element.id + '_start', cssClass: 'top-icon e-size', tooltipText: 'Start', align: 'Center',
                type: 'Input', template: '<button id="' + parent.element.id + '_startBtn"></button>' });
        }
        if (items.indexOf('end') > -1) {
            toolbarItems.push({ id: parent.element.id + '_end', cssClass: 'top-icon e-size', tooltipText: 'End', align: 'Center',
                type: 'Input', template: '<button id="' + parent.element.id + '_endBtn"></button>' });
        }
        toolbarItems.push({ align: 'Center', type: 'Separator' });
        if (items.indexOf('duplicate') > -1) {
            toolbarItems.push({ id: parent.element.id + '_duplicate', prefixIcon: 'e-icons e-order', cssClass: 'top-icon e-order',
                tooltipText: this.l10n.getConstant('Duplicate'), align: 'Center' });
        }
        if (items.indexOf('remove') > -1) {
            toolbarItems.push({ id: parent.element.id + '_remove', prefixIcon: 'e-icons e-trash', cssClass: 'top-icon e-trash',
                tooltipText: this.l10n.getConstant('Remove'), align: 'Center' });
        }
        if (items.indexOf('text') > -1) {
            toolbarItems.push({ id: parent.element.id + '_editText', prefixIcon: 'e-icons e-annotation-edit', cssClass: 'top-icon e-annotation-edit',
                tooltipText: this.l10n.getConstant('EditText'), align: 'Center' });
        }
        var tempToolbarItems = this.processSubToolbar(items);
        for (var i = 0, len = tempToolbarItems.length; i < len; i++) {
            toolbarItems.push(tempToolbarItems[i]);
        }
        if (!Browser.isDevice) {
            var obj = { shape: null };
            parent.notify('selection', { prop: 'getCurrentDrawingShape', value: { obj: obj } });
            if (obj['shape'] !== 'path') {
                toolbarItems.push({ id: parent.element.id + '_ok', prefixIcon: 'e-icons e-check', cssClass: 'top-icon e-tick',
                    tooltipText: this.l10n.getConstant('OK'), align: 'Right' });
                toolbarItems.push({ id: parent.element.id + '_cancel', prefixIcon: 'e-icons e-close', cssClass: 'top-icon e-save',
                    tooltipText: this.l10n.getConstant('Cancel'), align: 'Right' });
            }
        }
        return toolbarItems;
    };
    ToolbarModule.prototype.initCropTransformToolbar = function () {
        var _this = this;
        var parent = this.parent;
        var leftItem = this.getLeftToolbarItem();
        var rightItem = this.getRightToolbarItem();
        var mainItem = this.getCropTransformToolbarItem();
        var zoomItem = this.getZoomToolbarItem();
        if (Browser.isDevice) {
            this.defToolbarItems = mainItem;
        }
        else {
            this.defToolbarItems = leftItem.concat(zoomItem, mainItem, rightItem);
        }
        var toolbar = new Toolbar({
            width: '100%',
            items: this.defToolbarItems,
            clicked: this.defToolbarClicked.bind(this),
            created: function () {
                _this.renderCropBtn();
                _this.wireZoomBtnEvents();
                if (!Browser.isDevice) {
                    _this.renderSaveBtn();
                }
                parent.trigger('toolbarCreated', { toolbarType: 'shapes' });
                if (Browser.isDevice) {
                    if (_this.defToolbarItems.length > 0 && document.getElementById(parent.element.id + '_bottomToolbar')) {
                        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                        toolbar.refreshOverflow();
                        toolbar.refreshOverflow();
                        toolbar.refreshOverflow();
                    }
                }
                else {
                    _this.createLeftToolbarControls();
                    if (_this.defToolbarItems.length > 0 && document.getElementById(parent.element.id + '_toolbar')) {
                        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                        toolbar.refreshOverflow();
                    }
                }
                parent.select('custom');
            }
        });
        if (Browser.isDevice) {
            toolbar.appendTo('#' + parent.element.id + '_bottomToolbar');
        }
        else {
            toolbar.appendTo('#' + parent.element.id + '_toolbar');
        }
        this.enableDisableTbrBtn();
        parent.notify('transform', { prop: 'disableZoomOutBtn', value: { isZoomOut: true } });
    };
    ToolbarModule.prototype.getCurrentShapeIcon = function (shape) {
        var icon = '';
        switch (shape) {
            case 'rectangle':
                icon = 'e-rectangle';
                break;
            case 'ellipse':
                icon = 'e-circle';
                break;
            case 'line':
                icon = 'e-line';
                break;
            case 'arrow':
                icon = 'e-arrow-right-up';
                break;
            case 'path':
                icon = 'e-critical-path';
                break;
            case 'text':
                icon = 'e-add-text';
                break;
            case 'pen':
                icon = 'e-free-pen';
                break;
            case 'crop-custom':
                icon = 'e-custom';
                break;
            case 'crop-circle':
                icon = 'e-circle';
                break;
            case 'crop-square':
                icon = 'e-square';
                break;
            case 'crop-3:2':
                icon = 'e-custom-a';
                break;
            case 'crop-4:3':
                icon = 'e-custom-b';
                break;
            case 'crop-5:4':
                icon = 'e-custom-c';
                break;
            case 'crop-7:5':
                icon = 'e-custom-d';
                break;
            case 'crop-16:9':
                icon = 'e-custom-e';
                break;
            default:
                icon = 'e-free-pen';
                break;
        }
        return icon;
    };
    ToolbarModule.prototype.initShapesToolbarItem = function (items) {
        var _this = this;
        var parent = this.parent;
        var leftItem = this.getLeftToolbarItem();
        var rightItem = this.getRightToolbarItem();
        var mainItem = this.getShapesToolbarItem(items);
        var zoomItem = this.getZoomToolbarItem();
        if (Browser.isDevice) {
            this.defToolbarItems = mainItem;
        }
        else {
            this.defToolbarItems = leftItem.concat(zoomItem, mainItem, rightItem);
        }
        var toolbar = new Toolbar({
            width: '100%',
            items: this.defToolbarItems,
            clicked: this.defToolbarClicked.bind(this),
            created: function () {
                _this.renderAnnotationBtn(true);
                _this.createShapeColor(items);
                _this.createShapeBtn(items);
                if (parent.activeObj.shape === 'arrow') {
                    _this.createStartBtn();
                    _this.createEndBtn();
                }
                _this.wireZoomBtnEvents();
                if (!Browser.isDevice) {
                    _this.renderSaveBtn();
                }
                parent.trigger('toolbarCreated', { toolbarType: 'shapes' });
                if (Browser.isDevice) {
                    if (_this.defToolbarItems.length > 0 && document.getElementById(parent.element.id + '_bottomToolbar')) {
                        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                        toolbar.refreshOverflow();
                        toolbar.refreshOverflow();
                        toolbar.refreshOverflow();
                    }
                }
                else {
                    _this.createLeftToolbarControls();
                    if (_this.defToolbarItems.length > 0 && document.getElementById(parent.element.id + '_toolbar')) {
                        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                        toolbar.refreshOverflow();
                    }
                }
            }
        });
        if (Browser.isDevice) {
            toolbar.appendTo('#' + parent.element.id + '_bottomToolbar');
        }
        else {
            toolbar.appendTo('#' + parent.element.id + '_toolbar');
        }
        this.enableDisableTbrBtn();
    };
    ToolbarModule.prototype.createShapeColor = function (items) {
        var parent = this.parent;
        if (items.indexOf('fillColor') > -1) {
            parent.element.querySelector('.e-template.e-fill').appendChild(parent.createElement('input', {
                id: parent.element.id + '_shape_fill'
            }));
            var fillColor = new ColorPicker({
                modeSwitcher: false, noColor: true, value: '',
                showButtons: false, mode: 'Palette', cssClass: 'e-shape-fill-color',
                change: function (args) {
                    parent.updateFillColor(args.currentValue.hex);
                    if (args.currentValue.rgba === '') {
                        fillDDB_1.element.children[0].classList.add('e-nocolor-item');
                    }
                    else {
                        fillDDB_1.element.children[0].classList.remove('e-nocolor-item');
                        fillDDB_1.element.children[0].style.backgroundColor = args.currentValue.rgba;
                    }
                    fillDDB_1.toggle();
                }
            }, '#' + parent.element.id + '_shape_fill');
            var fillDDB_1 = new DropDownButton({
                open: function (args) {
                    if (Browser.isDevice) {
                        args.element.parentElement.style.top = fillDDB_1.element.getBoundingClientRect().top -
                            args.element.parentElement.offsetHeight + 'px';
                        args.element.parentElement.style.left = parent.element.offsetLeft + 'px';
                    }
                },
                target: '.e-shape-fill-color',
                iconCss: 'e-dropdownbtn-preview'
            }, '#' + parent.element.id + '_fillColorBtn');
            fillColor.inline = true;
            parent.element.querySelector('.e-fill.e-template .e-dropdownbtn-preview').classList.add('e-nocolor-item');
        }
        if (items.indexOf('strokeColor') > -1) {
            parent.element.querySelector('.e-template.e-stroke').appendChild(parent.createElement('input', {
                id: parent.element.id + '_shape_stroke'
            }));
            var strokeColor = new ColorPicker({
                modeSwitcher: false, noColor: false, value: '#fff',
                showButtons: false, mode: 'Palette', cssClass: 'e-shape-stroke-color',
                change: function (args) {
                    parent.updateStrokeColor(args.currentValue.hex);
                    strokeDDB_1.element.children[0].style.backgroundColor = args.currentValue.rgba;
                    strokeDDB_1.toggle();
                }
            }, '#' + parent.element.id + '_shape_stroke');
            var strokeDDB_1 = new DropDownButton({
                open: function (args) {
                    if (Browser.isDevice) {
                        args.element.parentElement.style.top = strokeDDB_1.element.getBoundingClientRect().top -
                            args.element.parentElement.offsetHeight + 'px';
                        args.element.parentElement.style.left = parent.element.offsetLeft + 'px';
                    }
                },
                target: '.e-shape-stroke-color',
                iconCss: 'e-dropdownbtn-preview'
            }, '#' + parent.element.id + '_borderColorBtn');
            strokeColor.inline = true;
            parent.element.querySelector('.e-stroke.e-template .e-dropdownbtn-preview').style.background = '#fff';
        }
    };
    ToolbarModule.prototype.createShapeBtn = function (items) {
        var parent = this.parent;
        var strokeWidthItems = [
            { id: '1', text: this.l10n.getConstant('XSmall') },
            { id: '2', text: this.l10n.getConstant('Small') },
            { id: '3', text: this.l10n.getConstant('Medium') },
            { id: '4', text: this.l10n.getConstant('Large') },
            { id: '5', text: this.l10n.getConstant('XLarge') }
        ];
        if (items.indexOf('strokeWidth') > -1) {
            var strokeWidthBtn = document.getElementById(parent.element.id + '_borderWidthBtn');
            var spanElem_1 = document.createElement('span');
            spanElem_1.innerHTML = this.l10n.getConstant('XSmall');
            spanElem_1.className = 'e-shape-stroke-width';
            strokeWidthBtn.appendChild(spanElem_1);
            // Initialize the DropDownButton component.
            var drpDownBtn_1 = new DropDownButton({ items: strokeWidthItems,
                open: function (args) {
                    if (Browser.isDevice) {
                        args.element.parentElement.style.top = drpDownBtn_1.element.getBoundingClientRect().top -
                            args.element.parentElement.offsetHeight + 'px';
                    }
                    var activeBtn = spanElem_1.innerHTML;
                    if (activeBtn !== '') {
                        args.element.querySelector('[aria-label = ' + '"' + activeBtn + '"' + ']').classList.add('e-selected-btn');
                    }
                },
                select: function (args) {
                    spanElem_1.textContent = args.item.text;
                    parent.updateStrokeWidth(args.item.id);
                    if (Browser.isDevice) {
                        if (document.getElementById(parent.element.id + '_bottomToolbar')) {
                            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                            var toolbar_6 = getComponent(parent.element.id + '_bottomToolbar', 'toolbar');
                            toolbar_6.refreshOverflow();
                        }
                    }
                    else {
                        if (document.getElementById(parent.element.id + '_toolbar')) {
                            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                            var toolbar_7 = getComponent(parent.element.id + '_toolbar', 'toolbar');
                            toolbar_7.refreshOverflow();
                        }
                    }
                }
            });
            // Render initialized DropDownButton.
            drpDownBtn_1.appendTo('#' + parent.element.id + '_borderWidthBtn');
        }
    };
    ToolbarModule.prototype.createStartBtn = function () {
        var parent = this.parent;
        var strokeWidthItems = [
            { id: '1', text: this.l10n.getConstant('None') },
            { id: '2', text: this.l10n.getConstant('Bar') },
            { id: '3', text: this.l10n.getConstant('Arrow') },
            { id: '4', text: this.l10n.getConstant('ArrowSolid') },
            { id: '5', text: this.l10n.getConstant('Circle') },
            { id: '6', text: this.l10n.getConstant('CircleSolid') },
            { id: '7', text: this.l10n.getConstant('Square') },
            { id: '8', text: this.l10n.getConstant('SquareSolid') }
        ];
        var strokeWidthBtn = document.getElementById(parent.element.id + '_startBtn');
        var spanElem = document.createElement('span');
        if (isNullOrUndefined(parent.activeObj.start)) {
            parent.activeObj.start = 'none';
        }
        spanElem.innerHTML = parent.pascalToSplitWords(parent.activeObj.start);
        spanElem.className = 'e-shape-start';
        strokeWidthBtn.appendChild(spanElem);
        // Initialize the DropDownButton component.
        var drpDownBtn = new DropDownButton({ items: strokeWidthItems,
            open: function (args) {
                if (Browser.isDevice) {
                    args.element.parentElement.style.top = drpDownBtn.element.getBoundingClientRect().top -
                        args.element.parentElement.offsetHeight + 'px';
                }
                var activeBtn = spanElem.innerHTML;
                if (activeBtn !== '') {
                    args.element.querySelector('[aria-label = ' + '"' + activeBtn + '"' + ']').classList.add('e-selected-btn');
                }
            },
            select: function (args) {
                spanElem.textContent = args.item.text;
                parent.updateArrow('startArrow', args.item.id);
            }
        });
        // Render initialized DropDownButton.
        drpDownBtn.appendTo('#' + parent.element.id + '_startBtn');
    };
    ToolbarModule.prototype.createEndBtn = function () {
        var parent = this.parent;
        var strokeWidthItems = [
            { id: '1', text: this.l10n.getConstant('None') },
            { id: '2', text: this.l10n.getConstant('Bar') },
            { id: '3', text: this.l10n.getConstant('Arrow') },
            { id: '4', text: this.l10n.getConstant('ArrowSolid') },
            { id: '5', text: this.l10n.getConstant('Circle') },
            { id: '6', text: this.l10n.getConstant('CircleSolid') },
            { id: '7', text: this.l10n.getConstant('Square') },
            { id: '8', text: this.l10n.getConstant('SquareSolid') }
        ];
        var strokeEndBtn = document.getElementById(parent.element.id + '_endBtn');
        var spanElem = document.createElement('span');
        if (isNullOrUndefined(parent.activeObj.end)) {
            parent.activeObj.end = 'arrowSolid';
        }
        spanElem.innerHTML = parent.pascalToSplitWords(parent.activeObj.end);
        spanElem.className = 'e-shape-end';
        strokeEndBtn.appendChild(spanElem);
        // Initialize the DropDownButton component.
        var drpDownBtn = new DropDownButton({ items: strokeWidthItems,
            open: function (args) {
                if (Browser.isDevice) {
                    args.element.parentElement.style.top = drpDownBtn.element.getBoundingClientRect().top -
                        args.element.parentElement.offsetHeight + 'px';
                }
                var activeBtn = spanElem.innerHTML;
                if (activeBtn !== '') {
                    args.element.querySelector('[aria-label = ' + '"' + activeBtn + '"' + ']').classList.add('e-selected-btn');
                }
            },
            select: function (args) {
                spanElem.textContent = args.item.text;
                parent.updateArrow('endArrow', args.item.id);
            }
        });
        // Render initialized DropDownButton.
        drpDownBtn.appendTo('#' + parent.element.id + '_endBtn');
    };
    ToolbarModule.prototype.getTextToolbarItem = function (items) {
        var parent = this.parent;
        var toolbarItems = [];
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar)) {
            toolbarItems.push({ id: parent.element.id + '_annotation', tooltipText: this.l10n.getConstant('Annotation'), align: 'Center',
                template: '<button id="' + parent.element.id + '_annotationBtn"></button>' });
        }
        if (items.indexOf('fontFamily') > -1) {
            toolbarItems.push({ id: parent.element.id + '_fontFamily', cssClass: 'top-icon e-img-font-family',
                tooltipText: this.l10n.getConstant('FontFamily'), align: 'Center',
                template: '<button id="' + parent.element.id + '_fontFamilyBtn"></button>' });
        }
        if (items.indexOf('fontSize') > -1) {
            toolbarItems.push({ id: parent.element.id + '_fontSize', cssClass: 'top-icon e-img-font-size',
                tooltipText: this.l10n.getConstant('FontSize'), align: 'Center',
                template: '<button id="' + parent.element.id + '_fontSizeBtn"></button>' });
        }
        if (items.indexOf('fontColor') > -1) {
            toolbarItems.push({ cssClass: 'top-icon e-text-font-color', id: parent.element.id + '_text_strokecolor',
                tooltipText: this.l10n.getConstant('FontColor'), align: 'Center',
                type: 'Input', template: '<button id="' + parent.element.id + '_fontColorBtn"></button>' });
        }
        if (items.indexOf('bold') > -1) {
            toolbarItems.push({ id: parent.element.id + '_bold', prefixIcon: 'e-icons e-bold', cssClass: 'top-icon e-bold',
                tooltipText: this.l10n.getConstant('Bold'), align: 'Center' });
        }
        if (items.indexOf('italic') > -1) {
            toolbarItems.push({ id: parent.element.id + '_italic', prefixIcon: 'e-icons e-italic', cssClass: 'top-icon e-italic',
                tooltipText: this.l10n.getConstant('Italic'), align: 'Center' });
        }
        toolbarItems.push({ align: 'Center', type: 'Separator' });
        if (items.indexOf('duplicate') > -1) {
            toolbarItems.push({ id: parent.element.id + '_duplicate', prefixIcon: 'e-icons e-order', cssClass: 'top-icon e-order',
                tooltipText: this.l10n.getConstant('Duplicate'), align: 'Center' });
        }
        if (items.indexOf('remove') > -1) {
            toolbarItems.push({ id: parent.element.id + '_remove', prefixIcon: 'e-icons e-trash', cssClass: 'top-icon e-trash',
                tooltipText: this.l10n.getConstant('Remove'), align: 'Center' });
        }
        if (items.indexOf('text') > -1) {
            toolbarItems.push({ id: parent.element.id + '_editText', prefixIcon: 'e-icons e-annotation-edit', cssClass: 'top-icon e-annotation-edit',
                tooltipText: this.l10n.getConstant('EditText'), align: 'Center' });
        }
        var tempToolbarItems = this.processSubToolbar(items);
        for (var i = 0, len = tempToolbarItems.length; i < len; i++) {
            toolbarItems.push(tempToolbarItems[i]);
        }
        if (!Browser.isDevice) {
            toolbarItems.push({ id: parent.element.id + '_ok', prefixIcon: 'e-icons e-check', cssClass: 'top-icon e-tick',
                tooltipText: this.l10n.getConstant('OK'), align: 'Right' });
            toolbarItems.push({ id: parent.element.id + '_cancel', prefixIcon: 'e-icons e-close', cssClass: 'top-icon e-save',
                tooltipText: this.l10n.getConstant('Cancel'), align: 'Right' });
        }
        return toolbarItems;
    };
    ToolbarModule.prototype.getFontFamilyItems = function () {
        if (Browser.isDevice) {
            return [{ id: 'arial', text: 'ABC' }, { id: 'calibri', text: 'ABC' }, { id: 'georgia', text: 'ABC' },
                { id: 'roboto', text: 'ABC' }, { id: 'tahoma', text: 'ABC' }];
        }
        return [{ id: 'arial', text: 'Arial' }, { id: 'calibri', text: 'Calibri' }, { id: 'georgia', text: 'Georgia' },
            { id: 'roboto', text: 'Roboto' }, { id: 'tahoma', text: 'Tahoma' }];
    };
    ToolbarModule.prototype.initTextToolbarItem = function (items) {
        var _this = this;
        var parent = this.parent;
        var leftItem = this.getLeftToolbarItem();
        var rightItem = this.getRightToolbarItem();
        var mainItem = this.getTextToolbarItem(items);
        var zoomItem = this.getZoomToolbarItem();
        if (Browser.isDevice) {
            this.defToolbarItems = mainItem;
        }
        else {
            this.defToolbarItems = leftItem.concat(zoomItem, mainItem, rightItem);
        }
        var toolbar = new Toolbar({
            width: '100%',
            items: this.defToolbarItems,
            clicked: this.defToolbarClicked.bind(this),
            created: function () {
                _this.renderAnnotationBtn(true);
                _this.createTextColor(items);
                _this.createTextBtn(items);
                _this.wireZoomBtnEvents();
                if (!Browser.isDevice) {
                    _this.renderSaveBtn();
                }
                parent.trigger('toolbarCreated', { toolbarType: 'text' });
                if (Browser.isDevice) {
                    if (_this.defToolbarItems.length > 0 && document.getElementById(parent.element.id + '_bottomToolbar')) {
                        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                        toolbar.refreshOverflow();
                        toolbar.refreshOverflow();
                        toolbar.refreshOverflow();
                    }
                }
                else {
                    _this.createLeftToolbarControls();
                    if (_this.defToolbarItems.length > 0 && document.getElementById(parent.element.id + '_toolbar')) {
                        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                        toolbar.refreshOverflow();
                    }
                }
            }
        });
        if (Browser.isDevice) {
            toolbar.appendTo('#' + parent.element.id + '_bottomToolbar');
        }
        else {
            toolbar.appendTo('#' + parent.element.id + '_toolbar');
        }
        this.enableDisableTbrBtn();
    };
    ToolbarModule.prototype.createTextColor = function (items) {
        var parent = this.parent;
        if (items.indexOf('fontColor') > -1 && parent.element.querySelector('.e-template.e-text-font-color')) {
            parent.element.querySelector('.e-template.e-text-font-color').appendChild(parent.createElement('input', {
                id: parent.element.id + '_text_font'
            }));
            var fontColor = new ColorPicker({
                modeSwitcher: false, value: '#fff',
                showButtons: false, mode: 'Palette', cssClass: 'e-text-fontt-color',
                change: function (args) {
                    parent.updateFontColor(args.currentValue.hex);
                    strokeDDB_2.element.children[0].style.backgroundColor = args.currentValue.rgba;
                    strokeDDB_2.toggle();
                }
            }, '#' + parent.element.id + '_text_font');
            var strokeDDB_2 = new DropDownButton({
                open: function (args) {
                    if (Browser.isDevice) {
                        args.element.parentElement.style.top = strokeDDB_2.element.getBoundingClientRect().top -
                            args.element.parentElement.offsetHeight + 'px';
                        args.element.parentElement.style.left = parent.element.offsetLeft + 'px';
                    }
                },
                target: '.e-text-fontt-color',
                iconCss: 'e-dropdownbtn-preview'
            }, '#' + parent.element.id + '_fontColorBtn');
            fontColor.inline = true;
            parent.element.querySelector('.e-text-font-color.e-template .e-dropdownbtn-preview').style.background
                = '#fff';
        }
    };
    ToolbarModule.prototype.createTextBtn = function (items) {
        var parent = this.parent;
        if (items.indexOf('fontFamily') > -1) {
            var fontNameBtn = document.getElementById(parent.element.id + '_fontFamilyBtn');
            var spanElem_2 = document.createElement('span');
            if (Browser.isDevice) {
                spanElem_2.innerHTML = 'ABC';
                spanElem_2.setAttribute('style', 'font-family: arial');
            }
            else {
                spanElem_2.innerHTML = 'Arial';
            }
            spanElem_2.className = 'e-text-font-family';
            if (fontNameBtn) {
                fontNameBtn.appendChild(spanElem_2);
            }
            var fontFamilyBtn_1 = new DropDownButton({ items: this.getFontFamilyItems(),
                cssClass: 'e-font-family',
                createPopupOnClick: true,
                beforeItemRender: function (args) {
                    args.element.setAttribute('style', 'font-family:' + args.element.id);
                },
                open: function (args) {
                    if (Browser.isDevice) {
                        args.element.parentElement.style.top = fontFamilyBtn_1.element.getBoundingClientRect().top -
                            args.element.parentElement.offsetHeight + 'px';
                    }
                    var fontFamily;
                    if (parent.textArea.style.display === 'block') {
                        fontFamily = parent.textArea.style.fontFamily;
                    }
                    else {
                        fontFamily = parent.activeObj.textSettings.fontFamily;
                    }
                    args.element.querySelector('[id *= ' + '"' + fontFamily.toLowerCase()
                        + '"' + ']').classList.add('e-selected-btn');
                },
                select: function (args) {
                    spanElem_2.textContent = args.item.text;
                    if (Browser.isDevice) {
                        spanElem_2.setAttribute('style', 'font-family:' + args.item.id);
                    }
                    parent.updateFontFamily(args.item.id);
                }
            });
            fontFamilyBtn_1.appendTo('#' + parent.element.id + '_fontFamilyBtn');
        }
        if (items.indexOf('fontSize') > -1) {
            var fontSizeBtnElem = document.getElementById(parent.element.id + '_fontSizeBtn');
            var fontSizeSpanElem_1 = document.createElement('span');
            var fontSizes = parent.getFontSizes();
            fontSizeSpanElem_1.innerHTML = fontSizes[0].text;
            fontSizeSpanElem_1.className = 'e-text-font-size';
            fontSizeBtnElem.appendChild(fontSizeSpanElem_1);
            var fontSizeBtn_1 = new DropDownButton({
                cssClass: 'e-font-size',
                items: fontSizes,
                open: function (args) {
                    if (Browser.isDevice) {
                        args.element.parentElement.style.top = fontSizeBtn_1.element.getBoundingClientRect().top -
                            args.element.parentElement.offsetHeight + 'px';
                    }
                    var activeBtn = fontSizeSpanElem_1.innerHTML;
                    args.element.querySelector('[aria-label *= ' + '"' + activeBtn + '"' + ']').classList.add('e-selected-btn');
                },
                select: function (args) {
                    fontSizeSpanElem_1.textContent = args.item.text;
                    parent.updateFontSize(args.item.text);
                }
            });
            fontSizeBtn_1.appendTo('#' + parent.element.id + '_fontSizeBtn');
        }
    };
    ToolbarModule.prototype.refreshToolbar = function (type, isApplyBtn, isCropping, isZooming, cType) {
        var parent = this.parent;
        if (!parent.isImageLoaded || parent.isCropToolbar) {
            return;
        }
        var item = type === 'shapes' && parent.activeObj.shape ? parent.activeObj.shape : type;
        var args = { toolbarType: item };
        if (type !== 'filter' && type !== 'color') {
            if (document.getElementById(parent.element.id + '_toolbar') && this.defToolbarItems.length > 0) {
                getComponent(document.getElementById(parent.element.id + '_toolbar'), 'toolbar').destroy();
                document.getElementById(parent.element.id + '_toolbar').innerHTML = '';
            }
            if (document.getElementById(parent.element.id + '_bottomToolbar') && this.defToolbarItems.length > 0) {
                if (document.getElementById(parent.element.id + '_bottomToolbar').className.indexOf('e-control') > -1) {
                    getComponent(document.getElementById(parent.element.id + '_bottomToolbar'), 'toolbar').destroy();
                    document.getElementById(parent.element.id + '_bottomToolbar').innerHTML = '';
                }
            }
        }
        this.refreshSlider();
        parent.isCropTab = false;
        switch (type) {
            case 'main':
                if (Browser.isDevice) {
                    if (isCropping) {
                        this.initMainToolbar(false, true, true);
                    }
                    else {
                        this.initMainToolbar(false, true, null);
                    }
                }
                else if (!Browser.isDevice || isZooming) {
                    if (isZooming) {
                        this.initMainToolbar(isApplyBtn, Browser.isDevice, null);
                    }
                    else {
                        this.initMainToolbar(isApplyBtn, Browser.isDevice, null);
                    }
                }
                if (Browser.isDevice) {
                    this.initBottomToolbar();
                }
                break;
            case 'shapes':
                if (Browser.isDevice) {
                    this.initMainToolbar(false, true, true);
                }
                if (parent.activeObj.shape === 'line' || parent.activeObj.shape === 'path') {
                    args.toolbarItems = ['strokeColor', 'strokeWidth', 'duplicate', 'remove'];
                }
                else if (parent.activeObj.shape === 'arrow') {
                    args.toolbarItems = ['strokeColor', 'strokeWidth', 'start', 'end', 'duplicate', 'remove'];
                }
                else {
                    args.toolbarItems = ['fillColor', 'strokeColor', 'strokeWidth', 'duplicate', 'remove'];
                }
                parent.trigger('toolbarUpdating', args);
                this.initShapesToolbarItem(args.toolbarItems);
                break;
            case 'text':
                if (Browser.isDevice) {
                    this.initMainToolbar(false, true, true);
                }
                args.toolbarItems = ['fontFamily', 'fontSize', 'fontColor', 'bold', 'italic', 'duplicate', 'remove', 'text'];
                parent.trigger('toolbarUpdating', args);
                this.initTextToolbarItem(args.toolbarItems);
                break;
            case 'pen':
                if (Browser.isDevice) {
                    this.initMainToolbar(false, true, true);
                }
                args.toolbarItems = ['strokeColor', 'strokeWidth', 'remove'];
                parent.trigger('toolbarUpdating', args);
                this.initPenToolbarItem(args.toolbarItems);
                break;
            case 'adjustment':
                if (Browser.isDevice) {
                    this.initMainToolbar(false, true, true);
                }
                this.initAdjustmentToolbarItem();
                break;
            case 'filter':
                this.updateContextualToolbar(type);
                break;
            case 'color':
                this.updateContextualToolbar(type, cType);
                break;
            case 'croptransform':
                parent.isCropTab = true;
                if (Browser.isDevice) {
                    this.initMainToolbar(false, true, true);
                }
                parent.updateCropTransformItems();
                this.initCropTransformToolbar();
                break;
        }
        this.currToolbar = type;
        this.refreshDropDownBtn(isCropping);
    };
    ToolbarModule.prototype.getAdjustmentToolbarItem = function () {
        var toolbarItems = [];
        var parent = this.parent;
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('Brightness') > -1)) {
            toolbarItems.push({ id: parent.element.id + '_brightness', prefixIcon: 'e-icons e-brightness', cssClass: 'top-icon e-brightness',
                tooltipText: this.l10n.getConstant('Brightness'), align: 'Center' });
        }
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('Contrast') > -1)) {
            toolbarItems.push({ id: parent.element.id + '_contrast', prefixIcon: 'e-icons e-contrast', cssClass: 'top-icon e-contrast',
                tooltipText: this.l10n.getConstant('Contrast'), align: 'Center' });
        }
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('Hue') > -1)) {
            toolbarItems.push({ id: parent.element.id + '_hue', prefixIcon: 'e-icons e-fade', cssClass: 'top-icon e-fade',
                tooltipText: this.l10n.getConstant('Hue'), align: 'Center' });
        }
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('Saturation') > -1)) {
            toolbarItems.push({ id: parent.element.id + '_saturation', prefixIcon: 'e-icons e-saturation', cssClass: 'top-icon e-saturation',
                tooltipText: this.l10n.getConstant('Saturation'), align: 'Center' });
        }
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('Exposure') > -1)) {
            toolbarItems.push({ id: parent.element.id + '_exposure', prefixIcon: 'e-icons e-grain', cssClass: 'top-icon e-grain',
                tooltipText: this.l10n.getConstant('Exposure'), align: 'Center' });
        }
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('Opacity') > -1)) {
            toolbarItems.push({ id: parent.element.id + '_opacity', prefixIcon: 'e-icons e-opacity', cssClass: 'top-icon e-opacity',
                tooltipText: this.l10n.getConstant('Opacity'), align: 'Center' });
        }
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('Blur') > -1)) {
            toolbarItems.push({ id: parent.element.id + '_blur', prefixIcon: 'e-icons e-tint', cssClass: 'top-icon e-tint',
                tooltipText: this.l10n.getConstant('Blur'), align: 'Center' });
        }
        var tempToolbarItems = this.processToolbar('center');
        for (var i = 0, len = tempToolbarItems.length; i < len; i++) {
            toolbarItems.push(tempToolbarItems[i]);
        }
        if (!Browser.isDevice) {
            toolbarItems.push({ id: parent.element.id + '_ok', prefixIcon: 'e-icons e-check', cssClass: 'top-icon e-tick',
                tooltipText: this.l10n.getConstant('OK'), align: 'Right' });
            toolbarItems.push({ id: parent.element.id + '_cancel', prefixIcon: 'e-icons e-close', cssClass: 'top-icon e-save',
                tooltipText: this.l10n.getConstant('Cancel'), align: 'Right' });
        }
        return toolbarItems;
    };
    ToolbarModule.prototype.getFilterToolbarItem = function () {
        var toolbarItems = [];
        var parent = this.parent;
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('Default') > -1)) {
            toolbarItems.push({ id: parent.element.id + '_default', prefixIcon: 'e-icons e-none', cssClass: 'top-icon e-none',
                tooltipText: this.l10n.getConstant('Default'), align: 'Center',
                template: '<div class="filter-wrapper" style="box-sizing: content-box;"><canvas id=' + parent.element.id + '_defaultCanvas' + '></canvas><div style="text-align:center;"><span>' + this.l10n.getConstant('Default') + '</span></div></div>' });
        }
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('Chrome') > -1)) {
            toolbarItems.push({ id: parent.element.id + '_chrome', prefixIcon: 'e-icons e-none', cssClass: 'top-icon e-none',
                tooltipText: this.l10n.getConstant('Chrome'), align: 'Center',
                template: '<div class="filter-wrapper" style="box-sizing: content-box;"><canvas id=' + parent.element.id + '_chromeCanvas' + '></canvas><div style="text-align:center;"><span>' + this.l10n.getConstant('Chrome') + '</span></div></div>' });
        }
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('Cold') > -1)) {
            toolbarItems.push({ id: parent.element.id + '_cold', prefixIcon: 'e-icons e-none', cssClass: 'top-icon e-none',
                tooltipText: this.l10n.getConstant('Cold'), align: 'Center',
                template: '<div class="filter-wrapper" style="box-sizing: content-box;"><canvas id=' + parent.element.id + '_coldCanvas' + '></canvas><div style="text-align:center;"><span>' + this.l10n.getConstant('Cold') + '</span></div></div>' });
        }
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('Warm') > -1)) {
            toolbarItems.push({ id: parent.element.id + '_warm', prefixIcon: 'e-icons e-none', cssClass: 'top-icon e-none',
                tooltipText: this.l10n.getConstant('Warm'), align: 'Center',
                template: '<div class="filter-wrapper" style="box-sizing: content-box;"><canvas id=' + parent.element.id + '_warmCanvas' + '></canvas><div style="text-align:center;"><span>' + this.l10n.getConstant('Warm') + '</span></div></div>' });
        }
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('Grayscale') > -1)) {
            toolbarItems.push({ id: parent.element.id + '_grayscale', prefixIcon: 'e-icons e-none', cssClass: 'top-icon e-none',
                tooltipText: this.l10n.getConstant('Grayscale'), align: 'Center',
                template: '<div class="filter-wrapper" style="box-sizing: content-box;"><canvas id=' + parent.element.id + '_grayscaleCanvas' + '></canvas><div style="text-align:center;"><span>' + this.l10n.getConstant('Grayscale') + '</span></div></div>' });
        }
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('Sepia') > -1)) {
            toolbarItems.push({ id: parent.element.id + '_sepia', prefixIcon: 'e-icons e-none', cssClass: 'top-icon e-none',
                tooltipText: this.l10n.getConstant('Sepia'), align: 'Center',
                template: '<div class="filter-wrapper" style="box-sizing: content-box;"><canvas id=' + parent.element.id + '_sepiaCanvas' + '></canvas><div style="text-align:center;"><span>' + this.l10n.getConstant('Sepia') + '</span></div></div>' });
        }
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('Invert') > -1)) {
            toolbarItems.push({ id: parent.element.id + '_invert', prefixIcon: 'e-icons e-none', cssClass: 'top-icon e-none',
                tooltipText: this.l10n.getConstant('Invert'), align: 'Center',
                template: '<div class="filter-wrapper" style="box-sizing: content-box;"><canvas id=' + parent.element.id + '_invertCanvas' + '></canvas><div style="text-align:center;"><span>' + this.l10n.getConstant('Invert') + '</span></div></div>' });
        }
        var tempToolbarItems = this.processToolbar('center');
        for (var i = 0, len = tempToolbarItems.length; i < len; i++) {
            toolbarItems.push(tempToolbarItems[i]);
        }
        return toolbarItems;
    };
    ToolbarModule.prototype.getPenToolbarItem = function (items) {
        var parent = this.parent;
        var toolbarItems = [];
        if (isNullOrUndefined(parent.toolbar) || parent.toolbar) {
            toolbarItems.push({ id: parent.element.id + '_annotation', tooltipText: this.l10n.getConstant('Annotation'), align: 'Center',
                template: '<button id="' + parent.element.id + '_annotationBtn"></button>' });
        }
        if (items.indexOf('strokeColor') > -1) {
            toolbarItems.push({ prefixIcon: 'e-icons e-copy', id: parent.element.id + '_pen_strokecolor',
                cssClass: 'top-icon e-pen-stroke-color',
                tooltipText: this.l10n.getConstant('StrokeColor'), align: 'Center', type: 'Input',
                template: '<button id="' + parent.element.id + '_penColorBtn"></button>' });
        }
        if (items.indexOf('strokeWidth') > -1) {
            toolbarItems.push({ prefixIcon: 'e-icons e-copy', cssClass: 'top-icon e-size',
                tooltipText: this.l10n.getConstant('StrokeWidth'),
                align: 'Center', type: 'Input', template: '<button id="' + parent.element.id + '_penStrokeWidth"></button>' });
        }
        toolbarItems.push({ align: 'Center', type: 'Separator' });
        if (items.indexOf('remove') > -1) {
            toolbarItems.push({ id: parent.element.id + '_remove', prefixIcon: 'e-icons e-trash', cssClass: 'top-icon e-trash',
                tooltipText: this.l10n.getConstant('Remove'), align: 'Center' });
        }
        var tempToolbarItems = this.processSubToolbar(items);
        for (var i = 0, len = tempToolbarItems.length; i < len; i++) {
            toolbarItems.push(tempToolbarItems[i]);
        }
        if (!Browser.isDevice) {
            toolbarItems.push({ id: parent.element.id + '_ok', prefixIcon: 'e-icons e-check', cssClass: 'top-icon e-tick',
                tooltipText: this.l10n.getConstant('OK'), align: 'Right' });
            toolbarItems.push({ id: parent.element.id + '_cancel', prefixIcon: 'e-icons e-close', cssClass: 'top-icon e-save',
                tooltipText: this.l10n.getConstant('Cancel'), align: 'Right' });
        }
        return toolbarItems;
    };
    ToolbarModule.prototype.initPenToolbarItem = function (items) {
        var _this = this;
        var parent = this.parent;
        var leftItem = this.getLeftToolbarItem();
        var rightItem = this.getRightToolbarItem();
        var mainItem = this.getPenToolbarItem(items);
        var zoomItem = this.getZoomToolbarItem();
        if (Browser.isDevice) {
            this.defToolbarItems = mainItem;
        }
        else {
            this.defToolbarItems = leftItem.concat(zoomItem, mainItem, rightItem);
        }
        var toolbar = new Toolbar({
            width: '100%',
            items: this.defToolbarItems,
            clicked: this.defToolbarClicked.bind(this),
            created: function () {
                _this.renderAnnotationBtn(true);
                _this.createPenColor(items);
                _this.createPenBtn(items);
                _this.wireZoomBtnEvents();
                if (!Browser.isDevice) {
                    _this.renderSaveBtn();
                }
                parent.trigger('toolbarCreated', { toolbarType: 'pen' });
                if (Browser.isDevice) {
                    if (_this.defToolbarItems.length > 0 && document.getElementById(parent.element.id + '_toolbar')) {
                        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                        toolbar.refreshOverflow();
                        toolbar.refreshOverflow();
                    }
                }
                else {
                    _this.createLeftToolbarControls();
                    if (_this.defToolbarItems.length > 0 && document.getElementById(parent.element.id + '_toolbar')) {
                        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                        toolbar.refreshOverflow();
                    }
                }
            }
        });
        if (Browser.isDevice) {
            toolbar.appendTo('#' + parent.element.id + '_bottomToolbar');
        }
        else {
            toolbar.appendTo('#' + parent.element.id + '_toolbar');
        }
        this.enableDisableTbrBtn();
    };
    ToolbarModule.prototype.createPenColor = function (items) {
        var _this = this;
        var parent = this.parent;
        if (items.indexOf('strokeColor') > -1) {
            parent.element.querySelector('.e-template.e-pen-stroke-color').appendChild(parent.createElement('input', {
                id: parent.element.id + '_pen_stroke'
            }));
            var penColor = new ColorPicker({
                modeSwitcher: false, value: '#fff',
                showButtons: false, mode: 'Palette', cssClass: 'e-pen-color',
                change: function (args) {
                    parent.updatePenStrokeColor(args.currentValue.hex);
                    _this.selFhdColor = args.currentValue.hex;
                    strokeDDB_3.element.children[0].style.backgroundColor = args.currentValue.rgba;
                    strokeDDB_3.toggle();
                }
            }, '#' + parent.element.id + '_pen_stroke');
            var strokeDDB_3 = new DropDownButton({
                open: function (args) {
                    if (Browser.isDevice) {
                        args.element.parentElement.style.top = strokeDDB_3.element.getBoundingClientRect().top -
                            args.element.parentElement.offsetHeight + 'px';
                        args.element.parentElement.style.left = parent.element.offsetLeft + 'px';
                    }
                },
                target: '.e-pen-color',
                iconCss: 'e-dropdownbtn-preview'
            }, '#' + parent.element.id + '_penColorBtn');
            penColor.inline = true;
            var obj = { tempFreeHandDrawEditingStyles: null };
            parent.notify('freehand-draw', { prop: 'getTempFreeHandDrawEditingStyles', value: { obj: obj } });
            var indexObj = { freehandSelectedIndex: null };
            parent.notify('freehand-draw', { prop: 'getFreehandSelectedIndex', onPropertyChange: false, value: { obj: indexObj } });
            if (!isNullOrUndefined(indexObj['freehandSelectedIndex']) && indexObj['freehandSelectedIndex'] > -1) {
                parent.element.querySelector('.e-pen-stroke-color.e-template .e-dropdownbtn-preview').style.background
                    = this.selFhdColor === '#42a5f5' ? obj['tempFreeHandDrawEditingStyles'].strokeColor :
                        parent.pointColl[indexObj['freehandSelectedIndex']].strokeColor;
            }
            else {
                parent.element.querySelector('.e-pen-stroke-color.e-template .e-dropdownbtn-preview').style.background
                    = '#fff';
            }
        }
    };
    ToolbarModule.prototype.createPenBtn = function (items) {
        var parent = this.parent;
        var strokeWidthItems = [
            { id: '1', text: this.l10n.getConstant('XSmall') },
            { id: '2', text: this.l10n.getConstant('Small') },
            { id: '3', text: this.l10n.getConstant('Medium') },
            { id: '4', text: this.l10n.getConstant('Large') },
            { id: '5', text: this.l10n.getConstant('XLarge') }
        ];
        if (items.indexOf('strokeWidth') > -1) {
            var strokeWidthBtn = document.getElementById(parent.element.id + '_penStrokeWidth');
            var spanElem_3 = document.createElement('span');
            var indexObj = { freehandSelectedIndex: null };
            parent.notify('freehand-draw', { prop: 'getFreehandSelectedIndex', onPropertyChange: false, value: { obj: indexObj } });
            if (!isNullOrUndefined(indexObj['freehandSelectedIndex']) && indexObj['freehandSelectedIndex'] > -1) {
                spanElem_3.innerHTML = this.getPenStroke(parent.pointColl[indexObj['freehandSelectedIndex']].strokeWidth);
            }
            else {
                spanElem_3.innerHTML = this.l10n.getConstant('Small');
            }
            spanElem_3.className = 'e-pen-stroke-width';
            strokeWidthBtn.appendChild(spanElem_3);
            var drpDownBtn_2 = new DropDownButton({ items: strokeWidthItems,
                open: function (args) {
                    if (Browser.isDevice) {
                        args.element.parentElement.style.top = drpDownBtn_2.element.getBoundingClientRect().top -
                            args.element.parentElement.offsetHeight + 'px';
                    }
                    var activeBtn = spanElem_3.innerHTML;
                    args.element.querySelector('[aria-label = ' + '"' + activeBtn + '"' + ']').classList.add('e-selected-btn');
                },
                select: function (args) {
                    spanElem_3.textContent = args.item.text;
                    parent.updatePenStrokeWidth(args.item.id);
                    if (Browser.isDevice) {
                        if (document.getElementById(parent.element.id + '_bottomToolbar')) {
                            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                            var toolbar_8 = getComponent(parent.element.id + '_bottomToolbar', 'toolbar');
                            toolbar_8.refreshOverflow();
                        }
                    }
                    else {
                        if (document.getElementById(parent.element.id + '_toolbar')) {
                            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                            var toolbar_9 = getComponent(parent.element.id + '_toolbar', 'toolbar');
                            toolbar_9.refreshOverflow();
                        }
                    }
                }
            });
            // Render initialized DropDownButton.
            drpDownBtn_2.appendTo('#' + parent.element.id + '_penStrokeWidth');
        }
    };
    ToolbarModule.prototype.getPenStroke = function (value) {
        var textContent = '';
        var valueToTextContent = {
            1: this.l10n.getConstant('XSmall'),
            2: this.l10n.getConstant('Small'),
            3: this.l10n.getConstant('Medium'),
            4: this.l10n.getConstant('Large'),
            5: this.l10n.getConstant('XLarge')
        };
        if (value >= 1 && value <= 5) {
            textContent = valueToTextContent[value];
        }
        return textContent;
    };
    ToolbarModule.prototype.initAdjustmentToolbarItem = function () {
        var _this = this;
        var parent = this.parent;
        var leftItem = this.getLeftToolbarItem(null);
        var rightItem = this.getRightToolbarItem();
        var mainItem = this.getAdjustmentToolbarItem();
        var zoomItem = this.getZoomToolbarItem();
        if (Browser.isDevice) {
            this.defToolbarItems = mainItem;
        }
        else {
            this.defToolbarItems = leftItem.concat(zoomItem, mainItem, rightItem);
        }
        var toolbar = new Toolbar({
            width: '100%',
            items: this.defToolbarItems,
            clicked: this.defToolbarClicked.bind(this),
            created: function () {
                _this.wireZoomBtnEvents();
                if (!Browser.isDevice) {
                    _this.renderSaveBtn();
                }
                if (Browser.isDevice) {
                    if (_this.defToolbarItems.length > 0 && document.getElementById(parent.element.id + '_toolbar')) {
                        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                        toolbar.refreshOverflow();
                    }
                }
                else {
                    _this.createLeftToolbarControls();
                    if (_this.defToolbarItems.length > 0 && document.getElementById(parent.element.id + '_toolbar')) {
                        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                        toolbar.refreshOverflow();
                    }
                }
            }
        });
        if (Browser.isDevice) {
            toolbar.appendTo('#' + parent.element.id + '_bottomToolbar');
        }
        else {
            toolbar.appendTo('#' + parent.element.id + '_toolbar');
        }
        this.enableDisableTbrBtn();
    };
    ToolbarModule.prototype.initFilterToolbarItem = function () {
        var _this = this;
        var parent = this.parent;
        var mainItem = this.getFilterToolbarItem();
        if (document.querySelector('#' + parent.element.id + '_contextualToolbar').classList.contains('e-control')) {
            getComponent(document.getElementById(parent.element.id + '_contextualToolbar'), 'toolbar').destroy();
        }
        var toolbar = new Toolbar({
            width: '100%',
            items: mainItem,
            clicked: this.contextualToolbarClicked.bind(this),
            created: function () {
                _this.updatePrivateVariables();
                _this.createCanvasFilter();
                if (parent.currentFilter === '') {
                    parent.currentFilter = parent.element.id + '_default';
                }
                var hdrWrapper = document.querySelector('#' + parent.element.id + '_headWrapper');
                if (hdrWrapper) {
                    hdrWrapper.style.display = 'none';
                }
                document.getElementById(parent.currentFilter + 'Canvas').parentElement.parentElement.classList.add('e-selected');
                _this.enableDisableTbrBtn();
                toolbar.refreshOverflow();
            }
        });
        toolbar.appendTo('#' + parent.element.id + '_contextualToolbar');
    };
    ToolbarModule.prototype.createCanvasFilter = function () {
        var parent = this.parent;
        showSpinner(parent.element);
        parent.element.style.opacity = '0.5';
        var imageData = parent.getCurrentCanvasData();
        this.inMemoryCanvas.width = imageData.width;
        this.inMemoryCanvas.height = imageData.height;
        this.inMemoryContext.putImageData(imageData, 0, 0);
        this.updateFilterCanvas('_defaultCanvas', 'default');
        this.updateFilterCanvas('_chromeCanvas', 'chrome');
        this.updateFilterCanvas('_coldCanvas', 'cold');
        this.updateFilterCanvas('_warmCanvas', 'warm');
        this.updateFilterCanvas('_grayscaleCanvas', 'grayscale');
        this.updateFilterCanvas('_sepiaCanvas', 'sepia');
        this.updateFilterCanvas('_invertCanvas', 'invert');
        hideSpinner(parent.element);
        parent.element.style.opacity = '1';
        parent.initialAdjustmentValue = this.lowerContext.filter;
    };
    ToolbarModule.prototype.updateFilterCanvas = function (selector, type) {
        var parent = this.parent;
        var filter = parent.element.querySelector('#' + parent.element.id + selector);
        if (filter) {
            var ctx = filter.getContext('2d');
            ctx = filter.getContext('2d');
            filter.style.width = '100px';
            filter.style.height = '100px';
            parent.notify('filter', { prop: 'updateAdj', value: { type: type, value: null, isPreview: true, ctx: ctx } });
            ctx.drawImage(this.inMemoryCanvas, 0, 0, 300, 150);
        }
    };
    ToolbarModule.prototype.getQuickAccessToolbarItem = function (isPenEdit) {
        var parent = this.parent;
        var args = { cancel: false, toolbarItems: [] };
        var toolbarItems = [];
        if (isNullOrUndefined(isPenEdit)) {
            toolbarItems.push('Clone');
            toolbarItems.push('Delete');
            if (parent.activeObj.shape === 'text') {
                toolbarItems.push('EditText');
            }
            args.shape = parent.toPascalCase(parent.activeObj.shape);
        }
        else if (isPenEdit) {
            toolbarItems.push('Delete');
            args.shape = 'Freehand draw';
        }
        args.toolbarItems = extend([], toolbarItems, null, true);
        parent.trigger('quickAccessToolbarOpen', args);
        var orgToolbarItems = [];
        if (args.cancel) {
            orgToolbarItems = [];
        }
        else {
            for (var i = 0; i < args.toolbarItems.length; i++) {
                switch (args.toolbarItems[i]) {
                    case 'Clone':
                        orgToolbarItems.push({ id: parent.element.id + '_duplicate', prefixIcon: 'e-icons e-order', cssClass: 'top-icon e-order',
                            tooltipText: this.l10n.getConstant('Duplicate'), align: 'Left' });
                        break;
                    case 'Delete':
                        orgToolbarItems.push({ id: parent.element.id + '_remove', prefixIcon: 'e-icons e-trash', cssClass: 'top-icon e-trash',
                            tooltipText: this.l10n.getConstant('Remove'), align: 'Left' });
                        break;
                    case 'EditText':
                        orgToolbarItems.push({ id: parent.element.id + '_editText', prefixIcon: 'e-icons e-annotation-edit', cssClass: 'top-icon e-annotation-edit',
                            tooltipText: this.l10n.getConstant('EditText'), align: 'Left' });
                        break;
                    default:
                        orgToolbarItems.push(args.toolbarItems[i]);
                        break;
                }
            }
        }
        return orgToolbarItems;
    };
    ToolbarModule.prototype.renderQAT = function (isPenEdit) {
        var parent = this.parent;
        if (parent.activeObj && parent.showQuickAccessToolbar) {
            var qtArea = document.getElementById(parent.element.id + '_quickAccessToolbarArea');
            if (qtArea) {
                this.destroyQuickAccessToolbar();
                qtArea.style.display = 'block';
            }
            var items = this.getQuickAccessToolbarItem(isPenEdit);
            if (items.length === 0) {
                return;
            }
            if (isNullOrUndefined(parent.quickAccessToolbarTemplate)) {
                var toolbarObj = new Toolbar({
                    items: items,
                    clicked: this.quickAccessToolbarClicked.bind(this)
                });
                toolbarObj.appendTo('#' + parent.element.id + '_quickAccessToolbar');
            }
            if (isNullOrUndefined(isPenEdit)) {
                qtArea.style.width = 'auto';
                parent.activeObj.activePoint.width = Math.abs(parent.activeObj.activePoint.width);
                parent.activeObj.activePoint.height = Math.abs(parent.activeObj.activePoint.height);
                var x = parent.activeObj.activePoint.startX < parent.activeObj.activePoint.endX ?
                    parent.activeObj.activePoint.startX : parent.activeObj.activePoint.endX;
                var y = parent.activeObj.activePoint.startY < parent.activeObj.activePoint.endY ?
                    parent.activeObj.activePoint.startY : parent.activeObj.activePoint.endY;
                var width = parent.activeObj.activePoint.width;
                if (parent.activeObj.rotatedAngle !== 0 && parent.activeObj.shape !== 'arrow') {
                    var object = { activePoint: null };
                    parent.notify('shape', { prop: 'getSquarePointForRotatedShape', onPropertyChange: false,
                        value: { obj: parent.activeObj, object: object } });
                    var point = object['activePoint'];
                    x = point.startX;
                    y = point.startY;
                    width = point.width;
                }
                else if (parent.activeObj.shape === 'path') {
                    var path = parent.getSquarePointForPath(parent.activeObj);
                    x = path.startX;
                    y = path.startY;
                    width = path.width;
                }
                qtArea.style.left = (x + (width / 2)) - (items.length * 25) + 'px';
                if (y - 60 < parent.img.destTop) {
                    qtArea.style.top = parent.img.destTop + 'px';
                }
                else {
                    qtArea.style.top = y - 60 + 'px';
                }
            }
            else if (isPenEdit) {
                var obj = { activePoint: null };
                var indexObj = { freehandSelectedIndex: null };
                parent.notify('freehand-draw', { prop: 'getFreehandSelectedIndex', onPropertyChange: false, value: { obj: indexObj } });
                parent.notify('freehand-draw', { prop: 'getSqPtFD',
                    value: { idx: indexObj['freehandSelectedIndex'], obj: obj } });
                var point = obj['activePoint'];
                qtArea.style.width = 'auto';
                qtArea.style.left = (point.startX + (point.width / 2)) - (items.length * 27) + 'px';
                if (point.startY - 60 < parent.img.destTop) {
                    qtArea.style.top = parent.img.destTop + 'px';
                }
                else {
                    qtArea.style.top = point.startY - 60 + 'px';
                }
            }
        }
    };
    ToolbarModule.prototype.refreshDropDownBtn = function (isDisabled) {
        if (isNullOrUndefined(isDisabled)) {
            return;
        }
        var parent = this.parent;
        var annotation = document.querySelector('#' + parent.element.id + '_annotationBtn');
        if (annotation) {
            if (isDisabled) {
                annotation.classList.add('e-disabled');
                annotation.parentElement.classList.add('e-overlay');
            }
            else {
                annotation.classList.remove('e-disabled');
                annotation.parentElement.classList.remove('e-overlay');
            }
            getComponent(annotation, 'dropdown-btn').disabled = isDisabled;
        }
        var transform = document.querySelector('#' + parent.element.id + '_transformBtn');
        if (transform) {
            if (isDisabled) {
                transform.classList.add('e-disabled');
                transform.parentElement.classList.add('e-overlay');
            }
            else {
                transform.classList.remove('e-disabled');
                transform.parentElement.classList.remove('e-overlay');
            }
            getComponent(transform, 'dropdown-btn').disabled = isDisabled;
        }
        var adjustment = document.querySelector('#' + parent.element.id + '_adjustment');
        if (adjustment) {
            if (isDisabled) {
                adjustment.classList.add('e-disabled');
                adjustment.parentElement.classList.add('e-overlay');
            }
            else {
                adjustment.classList.remove('e-disabled');
                adjustment.parentElement.classList.remove('e-overlay');
            }
            getComponent(adjustment, 'btn').disabled = isDisabled;
        }
        var filter = document.querySelector('#' + parent.element.id + '_filter');
        if (filter) {
            if (isDisabled) {
                filter.classList.add('e-disabled');
                filter.parentElement.classList.add('e-overlay');
            }
            else {
                filter.classList.remove('e-disabled');
                filter.parentElement.classList.remove('e-overlay');
            }
            getComponent(filter, 'btn').disabled = isDisabled;
        }
    };
    ToolbarModule.prototype.cropSelect = function (args) {
        var parent = this.parent;
        parent.isCropTab = true;
        if (isNullOrUndefined(parent.transform.cropZoomFactor)) {
            parent.transform.cropZoomFactor = parent.transform.zoomFactor;
            parent.notify('draw', { prop: 'setTempZoomFactor', onPropertyChange: false, value: { tempZoomFactor: parent.transform.zoomFactor } });
        }
        parent.transform.zoomFactor = parent.transform.cropZoomFactor;
        var text = args.item.id;
        this.currentToolbar = 'crop';
        parent.currSelectionPoint = null;
        parent.select(text);
        this.enableDisableTbrBtn();
        parent.notify('transform', { prop: 'disableZoomOutBtn', value: { isZoomOut: true } });
    };
    ToolbarModule.prototype.quickAccessToolbarClicked = function (args, isContextualToolbar) {
        var parent = this.parent;
        var points = { x: parent.activeObj.activePoint.startX, y: parent.activeObj.activePoint.startY };
        if (args.item) {
            var duplicateObj = void 0;
            var objColl = void 0;
            var isPreventUndoRedo = null;
            var obj = { prevActObj: null };
            var object = { tempObj: null };
            parent.notify('draw', { prop: 'getPrevActObj', onPropertyChange: false, value: { obj: obj } });
            parent.notify('selection', { prop: 'getTempActObj', onPropertyChange: false, value: { obj: object } });
            object['tempObj']['activePoint']['height'] = Math.abs(object['tempObj']['activePoint']['height']);
            var pathObject = { isNewPath: null };
            parent.notify('draw', { prop: 'getNewPath', value: { obj: pathObject } });
            switch (args.item.id.replace(parent.element.id + '_', '').toLowerCase()) {
                case 'duplicate':
                    if (!parent.element.querySelector('#' + parent.element.id + '_duplicate').classList.contains('e-disabled')) {
                        if (!pathObject['isNewPath'] && JSON.stringify(object['tempObj']) === JSON.stringify(parent.activeObj)) {
                            isPreventUndoRedo = true;
                        }
                        duplicateObj = extend({}, parent.activeObj, {}, true);
                        if (isNullOrUndefined(parent.activeObj.currIndex)) {
                            parent.notify('shape', { prop: 'applyActObj', onPropertyChange: false, value: { isMouseDown: isPreventUndoRedo } });
                        }
                        else if (obj['prevActObj']) {
                            parent.activeObj.currIndex = null;
                            duplicateObj.currIndex = null;
                            parent.notify('shape', { prop: 'applyActObj', onPropertyChange: false, value: { isMouseDown: isPreventUndoRedo } });
                        }
                        else {
                            parent.notify('shape', { prop: 'applyActObj', onPropertyChange: false, value: { isMouseDown: true } });
                        }
                        if (pathObject['isNewPath']) {
                            parent.notify('undo-redo', { prop: 'updateCurrUrc', value: { type: 'ok' } });
                        }
                        objColl = extend([], parent.objColl, [], true);
                        duplicateObj.activePoint.startX += 10;
                        duplicateObj.activePoint.startY -= 10;
                        duplicateObj.activePoint.endX += 10;
                        duplicateObj.activePoint.endY -= 10;
                        if (duplicateObj.shape === 'path') {
                            for (var i = 0; i < duplicateObj.pointColl.length; i++) {
                                duplicateObj.pointColl[i].x += 10;
                                duplicateObj.pointColl[i].y -= 10;
                            }
                        }
                        parent.activeObj = duplicateObj;
                        if (parent.activeObj.shape === 'line' || parent.activeObj.shape === 'arrow') {
                            parent.notify('shape', { prop: 'setPointCollForLineArrow', onPropertyChange: false,
                                value: { obj: parent.activeObj } });
                        }
                        // parent.updateTrianglePoints(parent.activeObj); Invoke
                        parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate', obj: parent.activeObj } });
                        parent.notify('undo-redo', { prop: 'updateUrObj', onPropertyChange: false, value: { objColl: objColl } });
                        this.renderQAT();
                    }
                    break;
                case 'remove':
                    if (!parent.element.querySelector('#' + parent.element.id + '_remove').classList.contains('e-disabled')) {
                        parent.notify('selection', { prop: 'deleteItem', onPropertyChange: false });
                    }
                    break;
                case 'edittext':
                    if (!parent.element.querySelector('#' + parent.element.id + '_editText').classList.contains('e-disabled')) {
                        this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
                        parent.notify('selection', { prop: 'setTempActObj', onPropertyChange: false,
                            value: { obj: extend({}, parent.activeObj, {}, true) } });
                        parent.notify('selection', { prop: 'setInitialTextEdit', onPropertyChange: false,
                            value: { bool: true } });
                        parent.notify('draw', { prop: 'setPrevActObj', onPropertyChange: false,
                            value: { prevActObj: extend({}, parent.activeObj, {}, true) } });
                        if (parent.activeObj.rotatedAngle !== 0) {
                            points.x = parent.activeObj.horTopLinePointColl[0].x;
                            points.y = parent.activeObj.horTopLinePointColl[0].y;
                        }
                        parent.notify('shape', { prop: 'renderTextArea', onPropertyChange: false,
                            value: { x: points.x, y: points.y, actObj: parent.activeObj } });
                        if (isNullOrUndefined(parent.activeObj.currIndex)) {
                            parent.notify('draw', { prop: 'setShapeTextInsert', onPropertyChange: false, value: { bool: true } });
                        }
                        else if (obj['prevActObj']) {
                            parent.notify('draw', { prop: 'setShapeTextInsert', onPropertyChange: false, value: { bool: true } });
                        }
                        if (document.getElementById(parent.element.id + '_quickAccessToolbarArea')) {
                            document.getElementById(parent.element.id + '_quickAccessToolbarArea').style.display = 'none';
                        }
                    }
                    break;
            }
        }
        if (isNullOrUndefined(isContextualToolbar)) {
            parent.trigger('quickAccessToolbarItemClick', args);
        }
    };
    ToolbarModule.prototype.defToolbarClicked = function (args) {
        var parent = this.parent;
        var isContextualToolbar = false;
        var isFilterFinetune = false;
        if (parent.element.querySelector('.e-contextual-toolbar-wrapper')) {
            if (!parent.element.querySelector('.e-contextual-toolbar-wrapper').classList.contains('e-hide')) {
                isContextualToolbar = isFilterFinetune = true;
            }
            parent.element.querySelector('.e-contextual-toolbar-wrapper').classList.add('e-hide');
        }
        if (args.item) {
            var type = args.item.id.replace(parent.element.id + '_', '').toLowerCase();
            if (type === 'duplicate' || type === 'remove' || type === 'edittext') {
                this.quickAccessToolbarClicked(args, true);
                parent.trigger('toolbarItemClicked', args);
            }
            else {
                var isDisabledFilter = false;
                var isDisabledAdjustment = false;
                var adjustment = document.querySelector('#' + parent.element.id + '_adjustment');
                if (adjustment && adjustment.classList.contains('e-disabled')) {
                    isDisabledAdjustment = true;
                }
                var filter = document.querySelector('#' + parent.element.id + '_filter');
                if (filter && filter.classList.contains('e-disabled')) {
                    isDisabledFilter = true;
                }
                this.enableDisableTbrBtn();
                this.performDefTbrClick(type, isContextualToolbar, isDisabledAdjustment, isDisabledFilter, isFilterFinetune);
                parent.trigger('toolbarItemClicked', args);
            }
        }
    };
    ToolbarModule.prototype.performDefTbrClick = function (type, isContextualToolbar, isDisabledAdjustment, isDisabledFilter, isFilterFinetune) {
        var parent = this.parent;
        var zoomIn = parent.element.querySelector('#' + parent.element.id + '_zoomIn');
        var isCropSelection = false;
        var panBtn;
        var splitWords;
        if (parent.activeObj.shape !== undefined) {
            splitWords = parent.activeObj.shape.split('-');
        }
        if (splitWords === undefined && parent.currObjType.isCustomCrop) {
            isCropSelection = true;
        }
        else if (splitWords !== undefined && splitWords[0] === 'crop') {
            isCropSelection = true;
        }
        if (!parent.disabled) {
            switch (type) {
                case 'pan':
                    parent.currObjType.isCustomCrop = parent.currObjType.isFiltered = false;
                    if (parent.currObjType.isUndoAction) {
                        parent.notify('undo-redo', { prop: 'refreshUrc', value: { bool: null } });
                    }
                    if (isCropSelection) {
                        parent.currObjType.isCustomCrop = false;
                        parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
                        this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
                        this.refreshToolbar('main');
                    }
                    if (parent.togglePan) {
                        this.cancelPan();
                        parent.notify('transform', { prop: 'setDisablePan', onPropertyChange: false, value: { bool: true } });
                        if (this.currentToolbar === 'pen') {
                            parent.freehandDraw(true);
                        }
                    }
                    else {
                        panBtn = parent.element.querySelector('.e-img-pan .e-btn');
                        if (panBtn) {
                            panBtn.classList.add('e-selected-btn');
                        }
                        parent.pan(true);
                        parent.notify('transform', { prop: 'setDisablePan', onPropertyChange: false, value: { bool: false } });
                    }
                    if (zoomIn && parent.zoomSettings.zoomFactor >= parent.zoomSettings.maxZoomFactor) {
                        zoomIn.classList.add('e-disabled');
                        zoomIn.parentElement.classList.add('e-overlay');
                    }
                    else if (zoomIn) {
                        zoomIn.classList.remove('e-disabled');
                        zoomIn.parentElement.classList.remove('e-overlay');
                    }
                    this.refreshToolbar('main');
                    break;
                case 'cancel':
                    parent.notify('draw', { prop: 'performCancel', value: { isContextualToolbar: isContextualToolbar } });
                    break;
                case 'ok':
                    parent.okBtn();
                    this.refreshDropDownBtn(false);
                    this.currentToolbar = 'main';
                    break;
                case 'crop':
                    parent.notify('transform', { prop: 'disableZoomOutBtn', value: { isZoomOut: true } });
                    break;
                case 'reset':
                    parent.reset();
                    this.currentToolbar = 'main';
                    break;
                case 'undo':
                    parent.notify('undo-redo', { prop: 'call-undo' });
                    break;
                case 'redo':
                    parent.notify('undo-redo', { prop: 'call-redo' });
                    break;
                case 'adjustment':
                    if (!isDisabledAdjustment) {
                        if (parent.currObjType.isFiltered) {
                            parent.okBtn();
                        }
                        this.refreshToolbar('adjustment');
                        parent.setTempFilterProperties();
                        this.openSlider('brightness');
                    }
                    break;
                case 'brightness':
                case 'contrast':
                case 'hue':
                case 'saturation':
                case 'opacity':
                case 'blur':
                case 'exposure':
                    this.openSlider(type);
                    break;
                case 'filter':
                    if (!isDisabledFilter) {
                        showSpinner(parent.element);
                        this.refreshToolbar('filter');
                        parent.setTempFilterProperties();
                        hideSpinner(parent.element);
                    }
                    break;
                case 'default':
                case 'chrome':
                case 'cold':
                case 'warm':
                case 'grayscale':
                case 'blackandwhite':
                case 'sepia':
                case 'invert':
                case 'sharpen':
                    parent.currObjType.isFiltered = true;
                    parent.notify('filter', { prop: 'applyImageFilter', value: { option: type } });
                    break;
                case 'upload':
                    if (isFilterFinetune) {
                        parent.element.querySelector('.e-contextual-toolbar-wrapper').classList.remove('e-hide');
                    }
                    break;
                case 'bold':
                    parent.notify('selection', { prop: 'setInitialTextEdit', value: { bool: false } });
                    if (parent.activeObj.textSettings.bold && parent.activeObj.textSettings.italic) {
                        parent.notify('shape', { prop: 'applyFontStyle', onPropertyChange: false,
                            value: { item: 'italic' } });
                    }
                    else if (parent.activeObj.textSettings.bold && !parent.activeObj.textSettings.italic) {
                        parent.notify('shape', { prop: 'applyFontStyle', onPropertyChange: false,
                            value: { item: 'default' } });
                    }
                    else if (!parent.activeObj.textSettings.bold && parent.activeObj.textSettings.italic) {
                        parent.notify('shape', { prop: 'applyFontStyle', onPropertyChange: false,
                            value: { item: 'bolditalic' } });
                    }
                    else if (!parent.activeObj.textSettings.bold && !parent.activeObj.textSettings.italic) {
                        parent.notify('shape', { prop: 'applyFontStyle', onPropertyChange: false,
                            value: { item: 'bold' } });
                    }
                    if (parent.element.querySelector('#' + parent.element.id + '_bold').classList.contains('e-selected-btn')) {
                        parent.element.querySelector('#' + parent.element.id + '_bold').classList.remove('e-selected-btn');
                    }
                    else {
                        parent.element.querySelector('#' + parent.element.id + '_bold').classList.add('e-selected-btn');
                    }
                    break;
                case 'italic':
                    parent.notify('selection', { prop: 'setInitialTextEdit', value: { bool: false } });
                    if (parent.activeObj.textSettings.bold && parent.activeObj.textSettings.italic) {
                        parent.notify('shape', { prop: 'applyFontStyle', onPropertyChange: false,
                            value: { item: 'bold' } });
                    }
                    else if (parent.activeObj.textSettings.bold && !parent.activeObj.textSettings.italic) {
                        parent.notify('shape', { prop: 'applyFontStyle', onPropertyChange: false,
                            value: { item: 'bolditalic' } });
                    }
                    else if (!parent.activeObj.textSettings.bold && parent.activeObj.textSettings.italic) {
                        parent.notify('shape', { prop: 'applyFontStyle', onPropertyChange: false,
                            value: { item: 'default' } });
                    }
                    else if (!parent.activeObj.textSettings.bold && !parent.activeObj.textSettings.italic) {
                        parent.notify('shape', { prop: 'applyFontStyle', onPropertyChange: false,
                            value: { item: 'italic' } });
                    }
                    if (parent.element.querySelector('#' + parent.element.id + '_italic').classList.contains('e-selected-btn')) {
                        parent.element.querySelector('#' + parent.element.id + '_italic').classList.remove('e-selected-btn');
                    }
                    else {
                        parent.element.querySelector('#' + parent.element.id + '_italic').classList.add('e-selected-btn');
                    }
                    break;
                case 'croptransform':
                    this.refreshToolbar('croptransform');
                    break;
                case 'rotateleft':
                case 'rotateright':
                case 'horizontalflip':
                case 'verticalflip':
                    parent.transformSelect(type);
                    parent.notify('transform', { prop: 'disableZoomOutBtn', value: { isZoomOut: true } });
                    break;
                case 'save':
                    if (parent.element.querySelector('#' + parent.element.id + '_saveBtn').classList.contains('e-hide')) {
                        parent.element.querySelector('#' + parent.element.id + '_saveBtn').classList.remove('e-hide');
                        break;
                    }
                    else {
                        parent.okBtn();
                    }
                    parent.element.querySelector('#' + parent.element.id + '_saveBtn').classList.add('e-hide');
                    parent.element.querySelector('#' + parent.element.id + '_saveBtn').click();
                    break;
            }
        }
    };
    ToolbarModule.prototype.contextualToolbarClicked = function (args) {
        var parent = this.parent;
        var selEle = parent.element.querySelector('.e-contextual-toolbar-wrapper .e-toolbar-item.e-selected');
        if (selEle) {
            selEle.classList.remove('e-selected');
        }
        var type = args.item.id.replace(parent.element.id, '').split('_')[1];
        var imageFiltering = { filter: parent.toPascalCase(type), cancel: false };
        parent.trigger('imageFiltering', imageFiltering);
        if (imageFiltering.cancel) {
            return;
        }
        document.getElementById(args.item.id + 'Canvas').parentElement.parentElement.classList.add('e-selected');
        parent.currObjType.isFiltered = true;
        parent.notify('filter', { prop: 'applyImageFilter', value: { option: type.toLowerCase() } });
        parent.currentFilter = args.item.id;
        this.enableDisableTbrBtn();
    };
    ToolbarModule.prototype.refreshShapeDrawing = function () {
        var parent = this.parent;
        var object = { shape: '' };
        parent.notify('selection', { prop: 'getCurrentDrawingShape', onPropertyChange: false, value: { obj: object } });
        if (object['shape'] !== '') {
            parent.notify('selection', { prop: 'setCurrentDrawingShape', onPropertyChange: false, value: { value: '' } });
            parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
            this.refreshToolbar('main', false);
        }
    };
    ToolbarModule.prototype.zoomInBtnClickHandler = function (e) {
        var parent = this.parent;
        if ((parent.zoomSettings.zoomTrigger & ZoomTrigger.Toolbar) === ZoomTrigger.Toolbar) {
            this.refreshShapeDrawing();
            if (Browser.isDevice && e.type === 'touchstart') {
                if (!e.returnValue) {
                    return;
                }
                e.preventDefault();
            }
            var zoomIn = document.querySelector('#' + parent.element.id + '_zoomIn');
            EventHandler.trigger(zoomIn, 'click');
            var obj = { bool: false };
            parent.notify('selection', { prop: 'getFreehandDrawEditing', onPropertyChange: false, value: { obj: obj } });
            if (obj['bool']) {
                parent.notify('freehand-draw', { prop: 'applyFhd', onPropertyChange: false });
                this.destroyQuickAccessToolbar();
            }
            this.applyPreviewFilter();
            parent.currObjType.isFiltered = false;
            if (parent.togglePen) {
                parent.currObjType.isZoomed = true;
                parent.freeHandDraw(false);
                parent.notify('undo-redo', { prop: 'updateCurrUrc', value: { type: 'ok' } });
            }
            parent.notify('draw', { prop: 'resetCurrentSelectionPoint' });
            parent.notify('transform', { prop: 'zoomAction', onPropertyChange: false,
                value: { zoomFactor: .1, zoomPoint: null } });
        }
    };
    ToolbarModule.prototype.zoomOutBtnClickHandler = function (e) {
        var parent = this.parent;
        if ((parent.zoomSettings.zoomTrigger & ZoomTrigger.Toolbar) === ZoomTrigger.Toolbar) {
            this.refreshShapeDrawing();
            if (Browser.isDevice && e.type === 'touchstart') {
                if (!e.returnValue) {
                    return;
                }
                e.preventDefault();
            }
            var zoomOut = document.querySelector('#' + parent.element.id + '_zoomOut');
            EventHandler.trigger(zoomOut, 'click');
            var obj = { bool: false };
            parent.notify('selection', { prop: 'getFreehandDrawEditing', onPropertyChange: false, value: { obj: obj } });
            if (obj['bool']) {
                parent.notify('freehand-draw', { prop: 'applyFhd', onPropertyChange: false });
                this.destroyQuickAccessToolbar();
            }
            this.applyPreviewFilter();
            parent.currObjType.isFiltered = false;
            if (parent.togglePen) {
                parent.currObjType.isZoomed = true;
                parent.freeHandDraw(false);
                parent.notify('undo-redo', { prop: 'updateCurrUrc', value: { type: 'ok' } });
            }
            parent.notify('draw', { prop: 'resetCurrentSelectionPoint' });
            parent.notify('transform', { prop: 'zoomAction', onPropertyChange: false,
                value: { zoomFactor: -.1, zoomPoint: null } });
        }
    };
    ToolbarModule.prototype.zoomInBtnMouseDownHandler = function (e) {
        e.preventDefault();
        this.zoomBtnHold = setInterval(this.zoomInBtnClickHandler.bind(this), 250);
    };
    ToolbarModule.prototype.zoomOutBtnMouseDownHandler = function (e) {
        e.preventDefault();
        this.zoomBtnHold = setInterval(this.zoomOutBtnClickHandler.bind(this), 250);
    };
    ToolbarModule.prototype.zoomBtnMouseUpHandler = function () {
        clearInterval(this.zoomBtnHold);
        this.zoomBtnHold = 0;
    };
    ToolbarModule.prototype.closeContextualToolbar = function () {
        var parent = this.parent;
        var isContextualToolbar = false;
        if ((parent.element.querySelector('#' + parent.element.id + '_contextualToolbar') &&
            !parent.element.querySelector('#' + parent.element.id + '_contextualToolbar').parentElement.classList.contains('e-hide')) ||
            (parent.element.querySelector('#' + parent.element.id + '_headWrapper')
                && !parent.element.querySelector('#' + parent.element.id + '_headWrapper').parentElement.classList.contains('e-hide'))) {
            parent.element.querySelector('.e-contextual-toolbar-wrapper').classList.add('e-hide');
            parent.okBtn();
            this.refreshMainToolbar();
            isContextualToolbar = true;
        }
        return isContextualToolbar;
    };
    ToolbarModule.prototype.destroyQuickAccessToolbar = function () {
        var parent = this.parent;
        var quickToolbar = document.getElementById(parent.element.id + '_quickAccessToolbar');
        if (quickToolbar && quickToolbar.classList.contains('e-control')) {
            getComponent(quickToolbar, 'toolbar').destroy();
        }
        var qatArea = document.getElementById(parent.element.id + '_quickAccessToolbarArea');
        if (qatArea) {
            qatArea.style.display = 'none';
        }
    };
    ToolbarModule.prototype.renderSlider = function (type) {
        var parent = this.parent;
        var canvasWrapper = document.querySelector('#' + parent.element.id + '_contextualToolbarArea');
        var hdrWrapper = document.querySelector('#' + parent.element.id + '_headWrapper');
        var labelWrapper = document.querySelector('#' + parent.element.id + '_labelWrapper');
        if (!hdrWrapper) {
            hdrWrapper = canvasWrapper.appendChild(parent.createElement('div', {
                id: parent.element.id + '_headWrapper',
                styles: 'position: relative'
            }));
            labelWrapper = hdrWrapper.appendChild(parent.createElement('label', {
                id: parent.element.id + '_labelWrapper',
                styles: Browser.isDevice ? 'position: absolute; top: 25%; left: calc(50% - 150px); font-size: 15px; text-transform: capitalize; font-weight: 400;'
                    : 'position: absolute; top: 25%; left: calc(50% - 226px); font-size: 15px; text-transform: capitalize; font-weight: 400;'
            }));
        }
        else {
            hdrWrapper.style.display = 'block';
        }
        labelWrapper.textContent = this.l10n.getConstant(parent.toPascalCase(type));
        var sliderWrapper = hdrWrapper.appendChild(parent.createElement('div', {
            id: parent.element.id + '_sliderWrapper',
            styles: 'position: absolute'
        }));
        var value = parent.getCurrAdjustmentValue(type);
        var min;
        var max;
        var slider;
        if (type === 'brightness' || type === 'contrast' || type === 'saturation' || type === 'exposure') {
            if (parent.finetuneSettings) {
                if (type === 'brightness' && parent.finetuneSettings.brightness) {
                    min = parent.finetuneSettings.brightness.min;
                    max = parent.finetuneSettings.brightness.max;
                }
                else if (type === 'contrast' && parent.finetuneSettings.contrast) {
                    min = parent.finetuneSettings.contrast.min;
                    max = parent.finetuneSettings.contrast.max;
                }
                else if (type === 'saturation' && parent.finetuneSettings.saturation) {
                    min = parent.finetuneSettings.saturation.min;
                    max = parent.finetuneSettings.saturation.max;
                }
                else if (type === 'exposure' && parent.finetuneSettings.exposure) {
                    min = parent.finetuneSettings.exposure.min;
                    max = parent.finetuneSettings.exposure.max;
                }
                else {
                    min = -100;
                    max = 100;
                }
            }
            else {
                min = -100;
                max = 100;
            }
            slider = this.createSlider(min, max, value, type);
        }
        else if (type === 'hue' || type === 'blur' || type === 'opacity') {
            if (parent.finetuneSettings) {
                if (type === 'hue' && parent.finetuneSettings.hue) {
                    min = parent.finetuneSettings.hue.min;
                    max = parent.finetuneSettings.hue.max;
                }
                else if (type === 'blur' && parent.finetuneSettings.blur) {
                    min = parent.finetuneSettings.blur.min;
                    max = parent.finetuneSettings.blur.max;
                }
                else if (type === 'opacity' && parent.finetuneSettings.opacity) {
                    min = parent.finetuneSettings.opacity.min;
                    max = parent.finetuneSettings.opacity.max;
                }
                else {
                    min = 0;
                    max = 100;
                }
            }
            else {
                min = 0;
                max = 100;
            }
            slider = this.createSlider(min, max, value, type);
        }
        slider.appendTo('#' + parent.element.id + '_sliderWrapper');
        sliderWrapper.style.left = (parseFloat(canvasWrapper.style.width) - parseFloat(slider.width)) / 2 + 'px';
    };
    ToolbarModule.prototype.createSlider = function (min, max, value, type) {
        var _this = this;
        var parent = this.parent;
        return new Slider({
            value: value,
            tooltip: { isVisible: true, placement: 'Before', showOn: 'Always' },
            type: 'MinRange',
            min: min,
            max: max,
            step: 10,
            width: Browser.isDevice ? '200px' : '300px',
            cssClass: 'e-slider',
            change: function (args) {
                parent.setCurrAdjustmentValue(type, args.value);
                _this.enableDisableTbrBtn();
            }
        });
    };
    ToolbarModule.prototype.applyPreviewFilter = function () {
        var parent = this.parent;
        if (document.querySelector('#' + parent.element.id + '_sliderWrapper') ||
            parent.currObjType.isFiltered) {
            parent.initialAdjustmentValue = this.lowerContext.filter;
            parent.canvasFilter = this.lowerContext.filter;
            parent.currObjType.isFiltered = false;
        }
    };
    ToolbarModule.prototype.unselectBtn = function () {
        var parent = this.parent;
        var selectors = [
            '#' + parent.element.id + '_brightness',
            '#' + parent.element.id + '_contrast',
            '#' + parent.element.id + '_hue',
            '#' + parent.element.id + '_saturation',
            '#' + parent.element.id + '_opacity',
            '#' + parent.element.id + '_blur',
            '#' + parent.element.id + '_exposure'
        ];
        for (var _i = 0, selectors_1 = selectors; _i < selectors_1.length; _i++) {
            var selector = selectors_1[_i];
            var element = document.querySelector(selector);
            if (element.classList.contains('e-selected-btn')) {
                element.classList.remove('e-selected-btn');
                break;
            }
        }
    };
    ToolbarModule.prototype.openSlider = function (type) {
        this.unselectBtn();
        this.parent.currObjType.isFiltered = true;
        this.refreshToolbar('color', null, null, null, type);
        document.getElementById(this.parent.element.id + '_' + type).classList.add('e-selected-btn');
    };
    ToolbarModule.prototype.refreshSlider = function () {
        var sliderWrapper = document.querySelector('#' + this.parent.element.id + '_sliderWrapper');
        // eslint-disable-next-line
        var slider = document.querySelector('.e-slider');
        var hdrWrapper = document.querySelector('#' + this.parent.element.id + '_headWrapper');
        if (hdrWrapper) {
            hdrWrapper.style.display = 'none';
        }
        if (sliderWrapper && slider) {
            slider.ej2_instances[0].destroy();
            sliderWrapper.remove();
        }
    };
    ToolbarModule.prototype.updateToolbarItems = function () {
        var parent = this.parent;
        if (!parent.isImageLoaded) {
            return;
        }
        var selFillElem = parent.element.querySelector('.e-fill.e-template .e-dropdownbtn-preview');
        var selStrokeElem = parent.element.querySelector('.e-stroke.e-template .e-dropdownbtn-preview');
        var selTextStrokeElem = parent.element.querySelector('.e-text-font-color.e-template .e-dropdownbtn-preview');
        var selPenStrokeElem = parent.element.querySelector('.e-pen-stroke-color.e-template .e-dropdownbtn-preview');
        var strokeWidthElem = parent.element.querySelector('.e-shape-stroke-width');
        var fontFamilyElem = parent.element.querySelector('.e-text-font-family');
        var fontSizeElem = parent.element.querySelector('.e-text-font-size');
        var boldBtn = parent.element.querySelector('#' + parent.element.id + '_bold');
        var italicBtn = parent.element.querySelector('#' + parent.element.id + '_italic');
        if (isNullOrUndefined(parent.activeObj.strokeSettings.strokeWidth)) {
            parent.activeObj.strokeSettings.strokeWidth = 2;
        }
        if (selFillElem) {
            if (parent.activeObj.strokeSettings.fillColor === '') {
                selFillElem.classList.add('e-nocolor-item');
            }
            else {
                selFillElem.classList.remove('e-nocolor-item');
                selFillElem.style.background = parent.activeObj.strokeSettings.fillColor;
            }
            getComponent(parent.element.id + '_shape_fill', 'colorpicker').value
                = parent.activeObj.strokeSettings.fillColor + 'ff';
        }
        if (selStrokeElem) {
            selStrokeElem.style.background = parent.activeObj.strokeSettings.strokeColor;
            getComponent(parent.element.id + '_shape_stroke', 'colorpicker').value
                = parent.activeObj.strokeSettings.strokeColor + 'ff';
        }
        if (selTextStrokeElem) {
            selTextStrokeElem.style.background = parent.activeObj.strokeSettings.strokeColor;
            getComponent(parent.element.id + '_text_font', 'colorpicker').value
                = parent.activeObj.strokeSettings.strokeColor + 'ff';
        }
        if (selPenStrokeElem) {
            selPenStrokeElem.style.background = parent.activeObj.strokeSettings.strokeColor;
            getComponent(parent.element.id + '_pen_stroke', 'colorpicker').value
                = parent.activeObj.strokeSettings.strokeColor + 'ff';
        }
        if (fontFamilyElem) {
            if (Browser.isDevice) {
                fontFamilyElem.setAttribute('style', 'font-family:' + parent.activeObj.textSettings.fontFamily.toLowerCase());
            }
            else {
                fontFamilyElem.textContent = parent.activeObj.textSettings.fontFamily;
            }
        }
        if (fontSizeElem) {
            for (var i = 0; i < parent.fontSizeColl.length; i++) {
                if (parseInt(parent.fontSizeColl[i].text, 10) >= Math.round(parent.activeObj.textSettings.fontSize)) {
                    fontSizeElem.textContent = (i + 1).toString();
                    break;
                }
            }
        }
        if (boldBtn) {
            if (parent.activeObj.textSettings.bold) {
                boldBtn.classList.add('e-selected-btn');
            }
            else {
                boldBtn.classList.remove('e-selected-btn');
            }
        }
        if (italicBtn) {
            if (parent.activeObj.textSettings.italic) {
                italicBtn.classList.add('e-selected-btn');
            }
            else {
                italicBtn.classList.remove('e-selected-btn');
            }
        }
        if (strokeWidthElem) {
            var strokeWidth = Math.round((parent.activeObj.strokeSettings.strokeWidth)).toString();
            strokeWidthElem.textContent = this.getStrokeWidth(strokeWidth);
        }
    };
    ToolbarModule.prototype.getStrokeWidth = function (text) {
        var strokeWidth;
        var currentWidth = parseInt(text, 10) / 2;
        switch (currentWidth) {
            case 1:
                strokeWidth = this.l10n.getConstant('XSmall');
                break;
            case 2:
                strokeWidth = this.l10n.getConstant('Small');
                break;
            case 3:
                strokeWidth = this.l10n.getConstant('Medium');
                break;
            case 4:
                strokeWidth = this.l10n.getConstant('Large');
                break;
            case 5:
                strokeWidth = this.l10n.getConstant('XLarge');
                break;
        }
        return strokeWidth;
    };
    ToolbarModule.prototype.cancelPan = function () {
        var parent = this.parent;
        parent.notify('shape', { prop: 'applyActObj', onPropertyChange: false, value: { isMouseDown: true } });
        var panBtn = parent.element.querySelector('.e-img-pan .e-btn');
        if (panBtn) {
            panBtn.classList.remove('e-selected-btn');
        }
        parent.pan(false);
    };
    ToolbarModule.prototype.refreshMainToolbar = function () {
        if (this.currToolbar !== 'main') {
            this.refreshToolbar('main');
        }
    };
    ToolbarModule.prototype.destroySubComponents = function () {
        var parent = this.parent;
        var inputElement = parent.element.querySelectorAll('input.e-control');
        var btnElement = parent.element.querySelectorAll('button.e-control');
        for (var i = 0, len = inputElement.length; i < len; i++) {
            if (inputElement[i].classList.contains('e-color-picker')) {
                getComponent(inputElement[i], 'color-picker').destroy();
                detach(select('input#' + inputElement[i].id, parent.element));
            }
        }
        for (var i = 0, len = btnElement.length; i < len; i++) {
            if (btnElement[i].classList.contains('e-dropdown-btn')) {
                getComponent(btnElement[i], 'dropdown-btn').destroy();
                detach(select('button#' + btnElement[i].id, parent.element));
            }
            else if (btnElement[i].classList.contains('e-btn')) {
                getComponent(btnElement[i], 'btn').destroy();
                detach(select('button#' + btnElement[i].id, parent.element));
            }
        }
    };
    ToolbarModule.prototype.setInitialShapeSettings = function (args) {
        var parent = this.parent;
        parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
        parent.currObjType.shape = args.item.id;
        parent.activeObj.shape = parent.currObjType.shape.toLowerCase();
        parent.currObjType.isDragging = parent.currObjType.isCustomCrop = false;
        parent.activeObj.shapeDegree = parent.transform.degree;
        parent.activeObj.shapeFlip = parent.transform.currFlipState;
        parent.activeObj.textFlip = parent.transform.currFlipState;
        parent.activeObj.flipObjColl = [];
    };
    ToolbarModule.prototype.getModuleName = function () {
        return 'toolbar-module';
    };
    return ToolbarModule;
}());
export { ToolbarModule };
