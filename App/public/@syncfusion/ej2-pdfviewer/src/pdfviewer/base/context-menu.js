import { createElement, Browser, isNullOrUndefined } from '@syncfusion/ej2-base';
import { ContextMenu as Context } from '@syncfusion/ej2-navigations';
import { ContextMenuItem } from './types';
/**
 * ContextMenu module is used to handle the context menus used in the control.
 *
 * @hidden
 */
var ContextMenu = /** @class */ (function () {
    /**
     * Initialize the constructor of ontextmenu
     *
     * @param { PdfViewer } pdfViewer - Specified PdfViewer class.
     * @param { PdfViewerBase } pdfViewerBase - The pdfViewerBase.
     */
    function ContextMenu(pdfViewer, pdfViewerBase) {
        this.copyContextMenu = [];
        this.contextMenuList = [];
        this.pdfViewer = pdfViewer;
        this.pdfViewerBase = pdfViewerBase;
        this.copyContextMenu = [{ text: this.pdfViewer.localeObj.getConstant('Cut'), iconCss: 'e-pv-cut-icon' },
            { text: this.pdfViewer.localeObj.getConstant('Copy'), iconCss: 'e-pv-copy-icon' },
            { text: this.pdfViewer.localeObj.getConstant('Highlight context'), iconCss: 'e-pv-highlight-icon' },
            { text: this.pdfViewer.localeObj.getConstant('Underline context'), iconCss: 'e-pv-underline-icon' },
            { text: this.pdfViewer.localeObj.getConstant('Strikethrough context'), iconCss: 'e-pv-strikethrough-icon' },
            { text: this.pdfViewer.localeObj.getConstant('Paste'), iconCss: 'e-pv-paste-icon' },
            { text: this.pdfViewer.localeObj.getConstant('Delete Context'), iconCss: 'e-pv-delete-icon' },
            { text: this.pdfViewer.localeObj.getConstant('Scale Ratio'), iconCss: 'e-pv-scale-ratio-icon' },
            { separator: true, id: pdfViewer.element.id + '_context_menu_comment_separator' },
            { text: this.pdfViewer.localeObj.getConstant('Comment'), iconCss: 'e-pv-comment-icon' },
            { separator: true, id: pdfViewer.element.id + '_context_menu_separator' },
            { text: this.pdfViewer.localeObj.getConstant('Properties'), iconCss: 'e-pv-property-icon' }
        ];
    }
    /**
     * @private
     * @returns {void}
     */
    ContextMenu.prototype.createContextMenu = function () {
        this.contextMenuElement = createElement('ul', { id: this.pdfViewer.element.id + '_context_menu', className: 'e-pv-context-menu' });
        this.pdfViewer.element.appendChild(this.contextMenuElement);
        this.contextMenuObj = new Context({
            target: '#' + this.pdfViewerBase.viewerContainer.id, items: this.copyContextMenu,
            beforeOpen: this.contextMenuOnBeforeOpen.bind(this), select: this.onMenuItemSelect.bind(this),
            created: this.contextMenuOnCreated.bind(this)
        });
        if (this.pdfViewer.enableRtl) {
            this.contextMenuObj.enableRtl = true;
        }
        this.contextMenuObj.appendTo(this.contextMenuElement);
        if (Browser.isDevice && !this.pdfViewer.enableDesktopMode) {
            this.contextMenuObj.animationSettings.effect = 'ZoomIn';
        }
        else {
            this.contextMenuObj.animationSettings.effect = 'SlideDown';
        }
    };
    ContextMenu.prototype.contextMenuOnCreated = function (args) {
        // eslint-disable-next-line max-len
        var items = [this.pdfViewer.localeObj.getConstant('Highlight context'), this.pdfViewer.localeObj.getConstant('Underline context'),
            this.pdfViewer.localeObj.getConstant('Strikethrough context')];
        if (this.pdfViewer.annotationModule) {
            if (!this.pdfViewer.annotationModule.textMarkupAnnotationModule) {
                this.contextMenuObj.enableItems(items, false);
            }
        }
        else {
            this.contextMenuObj.enableItems(items, false);
        }
    };
    ContextMenu.prototype.setTarget = function (args) {
        var target = null;
        if (args.event && args.event.target) {
            target = args.event.target;
            this.currentTarget = target;
        }
        return target;
    };
    ContextMenu.prototype.contextMenuOnBeforeOpen = function (args) {
        if (this.pdfViewerBase.preventContextmenu) {
            args.cancel = true;
        }
        var target = this.setTarget(args);
        var currentAnnotSettings = this.pdfViewer.selectedItems.annotations.length !== 0 ? this.pdfViewer.selectedItems.annotations[0].annotationSettings : null;
        // eslint-disable-next-line max-len
        if (this.pdfViewer.annotationModule && this.pdfViewer.annotationModule.freeTextAnnotationModule && this.pdfViewer.annotationModule.freeTextAnnotationModule.isInuptBoxInFocus && target && target.className === 'free-text-input' && target.tagName === 'TEXTAREA') {
            this.pdfViewerBase.isFreeTextContextMenu = true;
        }
        // eslint-disable-next-line max-len
        this.contextMenuObj.showItems([this.pdfViewer.localeObj.getConstant('Cut'), this.pdfViewer.localeObj.getConstant('Copy'), this.pdfViewer.localeObj.getConstant('Paste'),
            // eslint-disable-next-line max-len
            this.pdfViewer.localeObj.getConstant('Highlight context'), this.pdfViewer.localeObj.getConstant('Underline context'), this.pdfViewer.localeObj.getConstant('Strikethrough context'),
            // eslint-disable-next-line max-len
            this.pdfViewer.localeObj.getConstant('Delete Context'), this.pdfViewer.localeObj.getConstant('Scale Ratio'), this.pdfViewer.localeObj.getConstant('Comment'), this.pdfViewer.localeObj.getConstant('Properties')]);
        this.pdfViewerBase.getElement('_context_menu_separator').classList.remove('e-menu-hide');
        this.pdfViewerBase.getElement('_context_menu_comment_separator').classList.remove('e-menu-hide');
        // eslint-disable-next-line max-len
        this.contextMenuObj.enableItems([this.pdfViewer.localeObj.getConstant('Cut'), this.pdfViewer.localeObj.getConstant('Copy'), this.pdfViewer.localeObj.getConstant('Paste'), this.pdfViewer.localeObj.getConstant('Delete Context')], true);
        if (this.pdfViewer.annotationModule) {
            this.pdfViewer.annotationModule.checkContextMenuDeleteItem(this.contextMenuObj);
        }
        if (this.pdfViewer.textSelectionModule || this.pdfViewerBase.isShapeBasedAnnotationsEnabled()) {
            if (args.event || this.pdfViewerBase.isTouchDesignerMode) {
                var isClickWithinSelectionBounds = this.pdfViewerBase.isClickWithinSelectionBounds(args.event);
                // eslint-disable-next-line max-len
                if (this.pdfViewerBase.isFreeTextContextMenu) {
                    this.contextMenuObj.hideItems([this.pdfViewer.localeObj.getConstant('Highlight context'), this.pdfViewer.localeObj.getConstant('Underline context'), this.pdfViewer.localeObj.getConstant('Strikethrough context'), this.pdfViewer.localeObj.getConstant('Properties'), this.pdfViewer.localeObj.getConstant('Comment'),
                        this.pdfViewer.localeObj.getConstant('Scale Ratio'), this.pdfViewer.localeObj.getConstant('Delete Context')]);
                    this.pdfViewerBase.getElement('_context_menu_separator').classList.add('e-menu-hide');
                    this.pdfViewerBase.getElement('_context_menu_comment_separator').classList.add('e-menu-hide');
                    // eslint-disable-next-line max-len
                    if (this.pdfViewer.annotation.freeTextAnnotationModule && this.pdfViewer.annotation.freeTextAnnotationModule.isTextSelected) {
                        this.contextMenuObj.enableItems([this.pdfViewer.localeObj.getConstant('Copy')], true);
                        this.contextMenuObj.enableItems([this.pdfViewer.localeObj.getConstant('Cut')], true);
                    }
                    else {
                        this.contextMenuObj.enableItems([this.pdfViewer.localeObj.getConstant('Copy')], false);
                        this.contextMenuObj.enableItems([this.pdfViewer.localeObj.getConstant('Cut')], false);
                        window.getSelection().removeAllRanges();
                    }
                    // eslint-disable-next-line max-len
                    if (this.pdfViewer.annotation.freeTextAnnotationModule && this.pdfViewer.annotation.freeTextAnnotationModule.selectedText !== '') {
                        this.contextMenuObj.enableItems([this.pdfViewer.localeObj.getConstant('Paste')], true);
                    }
                    else {
                        this.contextMenuObj.enableItems([this.pdfViewer.localeObj.getConstant('Paste')], false);
                    }
                }
                else if (isClickWithinSelectionBounds && this.pdfViewer.textSelectionModule) {
                    // eslint-disable-next-line max-len
                    if ((!args.event.target.classList.contains('e-pv-maintaincontent') && args.event.target.classList.contains('e-pv-text') || args.event.target.classList.contains('e-pv-text-layer'))) {
                        if (this.pdfViewerBase.checkIsNormalText()) {
                            args.cancel = true;
                        }
                        // eslint-disable-next-line max-len
                    }
                    else if ((Browser.isIE || Browser.info.name === 'edge') && args.event.target.classList.contains('e-pv-page-container')) {
                        args.cancel = true;
                    }
                    // eslint-disable-next-line max-len
                    this.contextMenuObj.hideItems([this.pdfViewer.localeObj.getConstant('Cut'), this.pdfViewer.localeObj.getConstant('Paste'), this.pdfViewer.localeObj.getConstant('Delete Context'), this.pdfViewer.localeObj.getConstant('Scale Ratio'), this.pdfViewer.localeObj.getConstant('Comment'), this.pdfViewer.localeObj.getConstant('Properties')]);
                    this.pdfViewerBase.getElement('_context_menu_separator').classList.add('e-menu-hide');
                    this.pdfViewerBase.getElement('_context_menu_comment_separator').classList.add('e-menu-hide');
                    // eslint-disable-next-line max-len
                }
                else if (this.pdfViewer.selectedItems.annotations.length !== 0 && (this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'HandWrittenSignature' || this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'SignatureText' || this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'SignatureImage' || this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'Path')) {
                    this.onOpeningForShape(false, true);
                    // eslint-disable-next-line max-len
                }
                else if (this.pdfViewer.selectedItems.annotations.length !== 0 && this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType !== 'Path' && !currentAnnotSettings.isLock) {
                    this.onOpeningForShape(true);
                    // eslint-disable-next-line max-len
                }
                else if (this.pdfViewer.selectedItems.formFields.length !== 0 && this.pdfViewer.selectedItems.formFields[0].formFieldAnnotationType && this.pdfViewer.designerMode) {
                    this.onOpeningForShape(true);
                    // eslint-disable-next-line max-len
                    if (!isNullOrUndefined(this.pdfViewer.toolbar) && !isNullOrUndefined(this.pdfViewer.toolbar.formDesignerToolbarModule)) {
                        this.pdfViewer.toolbar.formDesignerToolbarModule.showHideDeleteIcon(true);
                    }
                }
                else {
                    // eslint-disable-next-line
                    var target_1 = this.pdfViewerBase.designerModetarget;
                    var annotationModule = this.pdfViewer.annotationModule;
                    if (args.event && args.event.target) {
                        target_1 = args.event.target;
                    }
                    // eslint-disable-next-line max-len
                    if (this.pdfViewer.annotation && this.pdfViewer.annotation.isShapeCopied && ((target_1).classList.contains('e-pv-text-layer') ||
                        (target_1).classList.contains('e-pv-text')) && !this.pdfViewer.annotationModule.textMarkupAnnotationModule.currentTextMarkupAnnotation) {
                        this.onOpeningForShape(false);
                        // eslint-disable-next-line max-len
                    }
                    else if (this.pdfViewer.formDesigner && this.pdfViewer.formDesigner.isShapeCopied && ((target_1).classList.contains('e-pv-text-layer') ||
                        (target_1).classList.contains('e-pv-text'))) {
                        this.onOpeningForShape(false);
                        // eslint-disable-next-line max-len
                    }
                    else if (this.pdfViewerBase.isCalibrateAnnotationModule() && this.pdfViewer.annotationModule.measureAnnotationModule.currentAnnotationMode && !currentAnnotSettings) {
                        // eslint-disable-next-line max-len
                        this.contextMenuObj.hideItems([this.pdfViewer.localeObj.getConstant('Highlight context'), this.pdfViewer.localeObj.getConstant('Underline context'), this.pdfViewer.localeObj.getConstant('Strikethrough context'), this.pdfViewer.localeObj.getConstant('Properties')]);
                        this.pdfViewerBase.getElement('_context_menu_separator').classList.add('e-menu-hide');
                        this.pdfViewerBase.getElement('_context_menu_comment_separator').classList.remove('e-menu-hide');
                        // eslint-disable-next-line max-len
                        this.contextMenuObj.enableItems([this.pdfViewer.localeObj.getConstant('Cut'), this.pdfViewer.localeObj.getConstant('Copy'), this.pdfViewer.localeObj.getConstant('Paste'), this.pdfViewer.localeObj.getConstant('Delete Context'), this.pdfViewer.localeObj.getConstant('Comment')], false);
                        // eslint-disable-next-line max-len
                    }
                    else if (annotationModule && annotationModule.textMarkupAnnotationModule && annotationModule.textMarkupAnnotationModule.currentTextMarkupAnnotation && !annotationModule.textMarkupAnnotationModule.currentTextMarkupAnnotation.annotationSettings.isLock) {
                        // eslint-disable-next-line max-len
                        this.contextMenuObj.hideItems([this.pdfViewer.localeObj.getConstant('Highlight context'), this.pdfViewer.localeObj.getConstant('Underline context'), this.pdfViewer.localeObj.getConstant('Strikethrough context'), this.pdfViewer.localeObj.getConstant('Properties'), this.pdfViewer.localeObj.getConstant('Cut'),
                            this.pdfViewer.localeObj.getConstant('Copy'), this.pdfViewer.localeObj.getConstant('Paste'), this.pdfViewer.localeObj.getConstant('Scale Ratio')]);
                        this.pdfViewerBase.getElement('_context_menu_separator').classList.add('e-menu-hide');
                        this.pdfViewerBase.getElement('_context_menu_comment_separator').classList.remove('e-menu-hide');
                        // eslint-disable-next-line max-len
                        this.contextMenuObj.showItems([this.pdfViewer.localeObj.getConstant('Delete Context'), this.pdfViewer.localeObj.getConstant('Comment')], false);
                    }
                    else {
                        args.cancel = true;
                    }
                }
            }
            else if (this.pdfViewer.textSelectionModule && (this.pdfViewer.contextMenuOption === 'MouseUp')) {
                // eslint-disable-next-line max-len
                this.contextMenuObj.hideItems([this.pdfViewer.localeObj.getConstant('Cut'), this.pdfViewer.localeObj.getConstant('Paste'), this.pdfViewer.localeObj.getConstant('Delete Context'), this.pdfViewer.localeObj.getConstant('Scale Ratio'), this.pdfViewer.localeObj.getConstant('Comment'), this.pdfViewer.localeObj.getConstant('Properties')]);
                this.pdfViewerBase.getElement('_context_menu_separator').classList.add('e-menu-hide');
                this.pdfViewerBase.getElement('_context_menu_comment_separator').classList.add('e-menu-hide');
            }
            else {
                this.hideContextItems();
            }
            this.enableCommentPanelItem();
        }
        else {
            args.cancel = true;
        }
        if (this.pdfViewer.contextMenuOption === 'None') {
            args.cancel = true;
        }
        else {
            this.contextMenuItems(args);
        }
        if (this.pdfViewer.annotationModule && this.pdfViewer.annotationModule.restrictContextMenu()) {
            args.cancel = true;
        }
        this.pdfViewerBase.isTouchDesignerMode = false;
    };
    ContextMenu.prototype.contextMenuItems = function (args) {
        if (this.pdfViewer.contextMenuSettings.contextMenuItems.length) {
            var hideMenuItems = [];
            var contextMenuList = this.contextMenuCollection();
            var ul = this.contextMenuObj.getRootElement();
            for (var j = 0; j < this.pdfViewer.contextMenuSettings.contextMenuItems.length; j++) {
                for (var i = 0; i < this.contextMenuList.length; i++) {
                    var menuItem = this.contextMenuList[parseInt(i.toString(), 10)].text;
                    switch (menuItem) {
                        case 'Highlight':
                            menuItem = 'Highlight context';
                            break;
                        case 'Underline':
                            menuItem = 'Underline context';
                            break;
                        case 'Strikethrough':
                            menuItem = 'Strikethrough context';
                            break;
                        case 'Delete':
                            menuItem = 'Delete Context';
                            break;
                        case 'Scale Ratio':
                            menuItem = 'Scale Ratio';
                            break;
                        case 'Comment':
                            this.pdfViewerBase.getElement('_context_menu_comment_separator').classList.add('e-menu-hide');
                            break;
                        case 'Properties':
                            this.pdfViewerBase.getElement('_context_menu_separator').classList.add('e-menu-hide');
                            break;
                    }
                    var menuName = this.contextMenuList[parseInt(i.toString(), 10)].text;
                    if (j === 0 && menuName !== ContextMenuItem[this.pdfViewer.contextMenuSettings.contextMenuItems[parseInt(j.toString(), 10)]]) {
                        hideMenuItems.push(menuName);
                    }
                    if (j > 0 && menuName === ContextMenuItem[this.pdfViewer.contextMenuSettings.contextMenuItems[parseInt(j.toString(), 10)]]) {
                        for (var k = 0; k < hideMenuItems.length; k++) {
                            if (hideMenuItems[parseInt(k.toString(), 10)] === menuName) {
                                if (this.pdfViewer.disableContextMenuItems && this.pdfViewer.disableContextMenuItems.length > 0) {
                                    var isDisabled = false;
                                    for (var l = 0; l < this.pdfViewer.disableContextMenuItems.length; l++) {
                                        if (hideMenuItems[parseInt(k.toString(), 10)] === ContextMenuItem[this.pdfViewer.disableContextMenuItems[parseInt(l.toString(), 10)]]) {
                                            isDisabled = true;
                                        }
                                    }
                                    if (!isDisabled) {
                                        hideMenuItems.splice(k, 1);
                                    }
                                }
                                else {
                                    hideMenuItems.splice(k, 1);
                                }
                            }
                        }
                    }
                }
            }
            var hideLocaleItem = this.processLocaleContent(hideMenuItems);
            this.contextMenuObj.hideItems(hideLocaleItem);
            if (this.getEnabledItemCount(ul) === 0) {
                args.cancel = true;
            }
        }
    };
    ContextMenu.prototype.processLocaleContent = function (hideMenuItems) {
        var contextMenuLocaleContent = [];
        if (hideMenuItems.length > 0) {
            for (var i = 0; i < hideMenuItems.length; i++) {
                var menuItem = hideMenuItems[parseInt(i.toString(), 10)];
                switch (menuItem) {
                    case 'Highlight':
                        menuItem = 'Highlight context';
                        break;
                    case 'Underline':
                        menuItem = 'Underline context';
                        break;
                    case 'Strikethrough':
                        menuItem = 'Strikethrough context';
                        break;
                    case 'Delete':
                        menuItem = 'Delete Context';
                        break;
                    case 'ScaleRatio':
                        menuItem = 'Scale Ratio';
                        break;
                }
                contextMenuLocaleContent.push(this.pdfViewer.localeObj.getConstant(menuItem));
            }
        }
        return contextMenuLocaleContent;
    };
    ContextMenu.prototype.contextMenuCollection = function () {
        return this.contextMenuList = [{ text: 'Cut' }, { text: 'Copy' }, { text: 'Highlight' }, { text: 'Underline' }, { text: 'Strikethrough' },
            { text: 'Paste' }, { text: 'Delete' }, { text: 'ScaleRatio' }, { text: 'Comment' }, { text: 'Properties' }];
    };
    ContextMenu.prototype.getEnabledItemCount = function (ul) {
        var enabledItemCount = this.copyContextMenu.length;
        var liCollection = ul.children;
        for (var i = 0; i < liCollection.length; i++) {
            // eslint-disable-next-line
            var li = liCollection[i];
            if (li.classList.contains('e-menu-hide') || li.classList.contains('e-disabled')) {
                enabledItemCount = enabledItemCount - 1;
            }
        }
        return enabledItemCount;
    };
    ContextMenu.prototype.hideContextItems = function () {
        if (this.pdfViewer.selectedItems.annotations.length === 0) {
            // eslint-disable-next-line max-len
            this.contextMenuObj.hideItems([this.pdfViewer.localeObj.getConstant('Cut'), this.pdfViewer.localeObj.getConstant('Paste'), this.pdfViewer.localeObj.getConstant('Delete Context'), this.pdfViewer.localeObj.getConstant('Scale Ratio'), this.pdfViewer.localeObj.getConstant('Properties')]);
            this.pdfViewerBase.getElement('_context_menu_separator').classList.add('e-menu-hide');
        }
    };
    ContextMenu.prototype.enableCommentPanelItem = function () {
        if (this.pdfViewer.enableCommentPanel) {
            this.contextMenuObj.enableItems([this.pdfViewer.localeObj.getConstant('Comment')], true);
        }
        else {
            this.contextMenuObj.enableItems([this.pdfViewer.localeObj.getConstant('Comment')], false);
        }
        if (this.pdfViewer.selectedItems.formFields.length !== 0) {
            this.contextMenuObj.enableItems([this.pdfViewer.localeObj.getConstant('Comment')], false);
        }
    };
    ContextMenu.prototype.onOpeningForShape = function (isProp, isSignature) {
        if (this.pdfViewer.annotation && this.pdfViewer.annotation.isShapeCopied) {
            this.contextMenuObj.enableItems([this.pdfViewer.localeObj.getConstant('Paste')], true);
        }
        else if (this.pdfViewer.formDesigner && this.pdfViewer.formDesigner.isShapeCopied) {
            this.contextMenuObj.enableItems([this.pdfViewer.localeObj.getConstant('Paste')], true);
        }
        else {
            this.contextMenuObj.enableItems([this.pdfViewer.localeObj.getConstant('Paste')], false);
        }
        // eslint-disable-next-line max-len
        this.contextMenuObj.hideItems([this.pdfViewer.localeObj.getConstant('Highlight context'), this.pdfViewer.localeObj.getConstant('Underline context'), this.pdfViewer.localeObj.getConstant('Strikethrough context'), this.pdfViewer.localeObj.getConstant('Scale Ratio')]);
        if (isProp) {
            // eslint-disable-next-line max-len
            if (this.pdfViewer.selectedItems.annotations.length !== 0 && (this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'Line' || this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'LineWidthArrowHead' ||
                this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'Distance')) {
                this.contextMenuObj.showItems([this.pdfViewer.localeObj.getConstant('Properties')]);
                // eslint-disable-next-line max-len
            }
            else if (this.pdfViewer.selectedItems.formFields.length !== 0 && this.pdfViewer.selectedItems.formFields[0].formFieldAnnotationType) {
                this.contextMenuObj.hideItems([this.pdfViewer.localeObj.getConstant('Comment')]);
                this.pdfViewerBase.getElement('_context_menu_separator').classList.add('e-menu-hide');
                this.contextMenuObj.showItems([this.pdfViewer.localeObj.getConstant('Properties')]);
            }
            else if (isNullOrUndefined(isSignature) && this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === "Image" && !this.pdfViewer.selectedItems.annotations[0].id.startsWith("stamp")) {
                this.contextMenuObj.hideItems([this.pdfViewer.localeObj.getConstant('Properties'), this.pdfViewer.localeObj.getConstant('Comment'), this.pdfViewer.localeObj.getConstant('Cut'), this.pdfViewer.localeObj.getConstant('Copy'), this.pdfViewer.localeObj.getConstant('Paste')]);
                this.pdfViewerBase.getElement('_context_menu_separator').classList.add('e-menu-hide');
                this.pdfViewerBase.getElement('_context_menu_comment_separator').classList.add('e-menu-hide');
            }
            else {
                this.contextMenuObj.hideItems([this.pdfViewer.localeObj.getConstant('Properties')]);
                this.pdfViewerBase.getElement('_context_menu_separator').classList.add('e-menu-hide');
            }
        }
        else if (isSignature) {
            if ((this.pdfViewer.selectedItems.annotations[0].annotName === "SignatureField" || this.pdfViewer.selectedItems.annotations[0].annotName === "InitialField" || this.pdfViewer.selectedItems.annotations[0].annotName === "SignatureText")) {
                this.contextMenuObj.hideItems([this.pdfViewer.localeObj.getConstant('Properties'), this.pdfViewer.localeObj.getConstant('Comment'), this.pdfViewer.localeObj.getConstant('Cut'), this.pdfViewer.localeObj.getConstant('Copy'), this.pdfViewer.localeObj.getConstant('Paste')]);
                this.pdfViewerBase.getElement('_context_menu_separator').classList.add('e-menu-hide');
                this.pdfViewerBase.getElement('_context_menu_comment_separator').classList.add('e-menu-hide');
            }
            else {
                this.contextMenuObj.hideItems([this.pdfViewer.localeObj.getConstant('Properties'), this.pdfViewer.localeObj.getConstant('Comment')]);
                this.pdfViewerBase.getElement('_context_menu_separator').classList.add('e-menu-hide');
                this.pdfViewerBase.getElement('_context_menu_comment_separator').classList.add('e-menu-hide');
            }
        }
        else {
            this.contextMenuObj.hideItems([this.pdfViewer.localeObj.getConstant('Cut'), this.pdfViewer.localeObj.getConstant('Copy'),
                // eslint-disable-next-line max-len
                this.pdfViewer.localeObj.getConstant('Delete Context'), this.pdfViewer.localeObj.getConstant('Properties'), this.pdfViewer.localeObj.getConstant('Comment')]);
            this.pdfViewerBase.getElement('_context_menu_separator').classList.add('e-menu-hide');
            this.pdfViewerBase.getElement('_context_menu_comment_separator').classList.add('e-menu-hide');
        }
    };
    ContextMenu.prototype.OnItemSelected = function (selectedMenu) {
        this.pdfViewerBase.OnItemSelected(selectedMenu);
    };
    ContextMenu.prototype.onMenuItemSelect = function (args) {
        this.pdfViewerBase.OnItemSelected(args.item.text);
    };
    /**
     * @private
     * @returns {void}
     */
    ContextMenu.prototype.destroy = function () {
        if (this.contextMenuObj) {
            this.previousAction = '';
            this.contextMenuObj.destroy();
        }
    };
    /**
     * @private
     * @returns {void}
     */
    ContextMenu.prototype.close = function () {
        this.contextMenuObj.close();
    };
    /**
     * open the context menu.
     * @param {number} top - The top.
     * @param {number} left - The left.
     * @param {HTMLElement} target - The target.
     * @returns {void}
     */
    ContextMenu.prototype.open = function (top, left, target) {
        /* eslint-disable */
        this.contextMenuObj.open(top, left, target);
        /* eslint-enable */
    };
    return ContextMenu;
}());
export { ContextMenu };
