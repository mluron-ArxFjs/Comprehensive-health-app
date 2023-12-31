import { isNullOrUndefined, L10n } from '@syncfusion/ej2-base';
import { Rect, ImageElementBox, LineWidget, ParagraphWidget, BodyWidget, TextElementBox, HeaderFooterWidget, ListTextElementBox, TableRowWidget, TableWidget, TableCellWidget, FieldElementBox, TabElementBox, BlockWidget, CommentCharacterElementBox, ShapeElementBox, EditRangeStartElementBox, ShapeBase, TextFrame, BookmarkElementBox, EditRangeEndElementBox } from './page';
import { Layout } from './layout';
import { PageLayoutViewer, WebLayoutViewer } from './viewer';
import { HelperMethods, Point } from '../editor/editor-helper';
import { CharacterRangeType } from '../../index';
import { FontScriptType } from '../../index';
import { DocumentCanvasElement } from './document-canvas';
import { Dictionary } from '../../base/dictionary';
/**
 * @private
 */
var Renderer = /** @class */ (function () {
    function Renderer(documentHelper) {
        /**
         * @private
         */
        this.commentMarkDictionary = new Dictionary();
        this.isPrinting = false;
        this.isExporting = false;
        this.pageLeft = 0;
        this.pageTop = 0;
        this.pageIndex = -1;
        this.isFieldCode = false;
        this.leftPosition = 0;
        this.topPosition = 0;
        this.height = 0;
        this.documentHelper = documentHelper;
    }
    Object.defineProperty(Renderer.prototype, "pageCanvas", {
        get: function () {
            if (this.isPrinting) {
                if (isNullOrUndefined(this.pageCanvasIn)) {
                    this.pageCanvasIn = document.createElement('canvas');
                    this.pageCanvasIn.getContext('2d').save();
                }
                return this.pageCanvasIn;
            }
            if (this.isExporting) {
                if (isNullOrUndefined(this.exportPageCanvas)) {
                    this.exportPageCanvas = new DocumentCanvasElement();
                }
                return this.exportPageCanvas;
            }
            else {
                return isNullOrUndefined(this.viewer) ? undefined : this.documentHelper.containerCanvas;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Renderer.prototype, "spellChecker", {
        get: function () {
            return this.documentHelper.owner.spellChecker;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Renderer.prototype, "selectionCanvas", {
        get: function () {
            return isNullOrUndefined(this.viewer) ? undefined : this.documentHelper.selectionCanvas;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Renderer.prototype, "pageContext", {
        get: function () {
            return this.pageCanvas.getContext('2d');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Renderer.prototype, "selectionContext", {
        get: function () {
            return this.selectionCanvas.getContext('2d');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Renderer.prototype, "viewer", {
        get: function () {
            return this.documentHelper.owner.viewer;
        },
        enumerable: true,
        configurable: true
    });
    Renderer.prototype.renderWidgets = function (page, left, top, width, height) {
        if (isNullOrUndefined(this.pageCanvas) || isNullOrUndefined(page)) {
            return;
        }
        this.pageContext.fillStyle = HelperMethods.getColor(this.documentHelper.backgroundColor);
        this.pageContext.beginPath();
        if (this.viewer instanceof WebLayoutViewer) {
            height = height > this.documentHelper.visibleBounds.height ? height : this.documentHelper.visibleBounds.height;
            var marginTop = top;
            if (page.index === 0) {
                marginTop = top - this.viewer.padding.top;
            }
            /* eslint-disable-next-line max-len */
            this.pageContext.fillRect(left - this.viewer.padding.left, marginTop, width + this.viewer.padding.left, height + this.viewer.padding.top);
        }
        else {
            this.pageContext.fillRect(left, top, width, height);
        }
        this.pageContext.closePath();
        if (this.viewer instanceof PageLayoutViewer) {
            this.pageContext.strokeStyle = this.documentHelper.owner.pageOutline;
            this.pageContext.strokeRect(left, top, width, height);
        }
        this.pageLeft = left;
        this.pageTop = top;
        this.pageIndex = page.index;
        if (this.isPrinting) {
            this.setPageSize(page);
        }
        else {
            this.pageContext.beginPath();
            this.pageContext.save();
            this.pageContext.rect(left, top, width, height);
            this.pageContext.clip();
        }
        this.height = height;
        if (page.headerWidget) {
            this.renderHFWidgets(page, page.headerWidgetIn, width, true);
        }
        if (page.footerWidget) {
            this.renderHFWidgets(page, page.footerWidgetIn, width, false);
        }
        for (var i = 0; i < page.bodyWidgets.length; i++) {
            this.render(page, page.bodyWidgets[parseInt(i.toString(), 10)]);
            if (page.footnoteWidget && this.documentHelper.owner.layoutType === 'Pages') {
                this.renderfootNoteWidget(page, page.footnoteWidget, width);
            }
        }
        if (page.endnoteWidget && this.documentHelper.owner.layoutType === 'Pages') {
            this.renderfootNoteWidget(page, page.endnoteWidget, width);
        }
        if (this.documentHelper.owner.enableHeaderAndFooter && !this.isPrinting) {
            this.renderHeaderSeparator(page, this.pageLeft, this.pageTop, page.headerWidgetIn);
        }
        this.pageLeft = 0;
        this.pageTop = 0;
        this.pageContext.restore();
    };
    Renderer.prototype.setPageSize = function (page) {
        this.pageContext.clearRect(0, 0, this.pageCanvas.width, this.pageCanvas.height);
        this.selectionContext.clearRect(0, 0, this.selectionCanvas.width, this.selectionCanvas.height);
        this.pageContext.restore();
        this.selectionContext.restore();
        var width = page.boundingRectangle.width;
        var height = page.boundingRectangle.height;
        var dpr = Math.max(window.devicePixelRatio, this.documentHelper.owner.documentEditorSettings.printDevicePixelRatio);
        if (this.pageCanvas.width !== width * dpr || this.pageCanvas.height !== height * dpr) {
            this.pageCanvas.height = height * dpr;
            this.pageCanvas.width = width * dpr;
            this.pageCanvas.style.height = height + 'px';
            this.pageCanvas.style.width = width + 'px';
            this.pageContext.globalAlpha = 1;
            this.pageContext.scale(dpr, dpr);
        }
        this.pageContext.fillStyle = '#FFFFFF';
        this.pageContext.fillRect(0, 0, this.pageCanvas.width, this.pageCanvas.height);
        this.pageContext.fillStyle = '#000000';
    };
    Renderer.prototype.renderHFWidgets = function (page, widget, width, isHeader) {
        if (this.isFieldCode) {
            this.isFieldCode = false;
        }
        if (!this.isPrinting) {
            this.pageContext.globalAlpha = this.documentHelper.owner.enableHeaderAndFooter ? 1 : 0.65;
        }
        var cliped = false;
        var height = 0;
        var pageHt = 0;
        var headerFooterHeight = page.boundingRectangle.height / 100 * 40;
        if (isHeader) {
            var topMargin = HelperMethods.convertPointToPixel(page.bodyWidgets[0].sectionFormat.topMargin);
            var widgetHeight = Math.max((widget.y + widget.height), topMargin);
            if (widgetHeight > headerFooterHeight) {
                cliped = true;
                this.pageContext.beginPath();
                this.pageContext.save();
                this.pageContext.rect(this.pageLeft, this.pageTop, width, this.getScaledValue(headerFooterHeight));
                this.pageContext.clip();
            }
        }
        else {
            var footerDistance = HelperMethods.convertPointToPixel(page.bodyWidgets[0].sectionFormat.footerDistance);
            var footerHeight = void 0;
            if (isNullOrUndefined(page.footerWidgetIn.sectionFormat)) {
                footerHeight = page.boundingRectangle.height -
                    /* eslint-disable-next-line max-len */
                    Math.max(page.footerWidgetIn.height + footerDistance, HelperMethods.convertPointToPixel(page.footerWidgetIn.sectionFormat.bottomMargin));
            }
            else {
                footerHeight = page.boundingRectangle.height -
                    /* eslint-disable-next-line max-len */
                    Math.max(page.footerWidgetIn.height + footerDistance, HelperMethods.convertPointToPixel(page.footerWidgetIn.sectionFormat.bottomMargin));
            }
            height = Math.max(page.boundingRectangle.height - headerFooterHeight, footerHeight);
            pageHt = page.boundingRectangle.height - footerDistance;
        }
        this.renderFloatingItems(page, widget.floatingElements, 'Behind');
        for (var i = 0; i < widget.childWidgets.length; i++) {
            var block = widget.childWidgets[parseInt(i.toString(), 10)];
            if (!isHeader) {
                height += block.height;
            }
            // if (isHeader || !isHeader && this.getScaledValue(Math.round(height)) <= this.getScaledValue(Math.round(pageHt))) {
            this.renderWidget(page, block);
            // }
        }
        this.renderFloatingItems(page, widget.floatingElements, 'InFrontOfText');
        if (cliped) {
            this.pageContext.restore();
        }
        if (!this.isPrinting) {
            this.pageContext.globalAlpha = this.documentHelper.owner.enableHeaderAndFooter ? 0.50 : 1;
        }
    };
    Renderer.prototype.renderHeaderSeparator = function (page, left, top, widget) {
        //Header Widget
        var topMargin = HelperMethods.convertPointToPixel(page.bodyWidgets[0].sectionFormat.topMargin);
        var y = this.getScaledValue(Math.max((widget.y + widget.height), topMargin));
        var pageWidth = this.getScaledValue(page.boundingRectangle.width);
        var ctx = this.pageContext;
        ctx.save();
        ctx.globalAlpha = 0.85;
        var headerFooterHeight = (this.getScaledValue(page.boundingRectangle.height) / 100) * 40;
        //Maximum header height limit
        y = Math.min(y, headerFooterHeight);
        //Dash line Separator
        this.renderDashLine(ctx, left, top + y, pageWidth, '#000000', false);
        var type = this.getHeaderFooterType(page, true);
        var index = this.viewer.getHeaderFooter(widget.headerFooterType);
        var sectionIndex = page.sectionIndex;
        var l10n = new L10n('documenteditor', this.documentHelper.owner.defaultLocale);
        l10n.setLocale(this.documentHelper.owner.locale);
        if (this.documentHelper.headersFooters.length > 1) {
            var sectionMarkIndex = sectionIndex + 1;
            type = type + " -" + l10n.getConstant('Section') + " " + sectionMarkIndex + "-";
        }
        ctx.font = '9pt Arial';
        var width = ctx.measureText(type).width;
        this.renderHeaderFooterMark(ctx, left + 5, top + y, width + 10, 20);
        this.renderHeaderFooterMarkText(ctx, type, left + 10, y + top + 15);
        var headerFooterWidget;
        if (this.documentHelper.headersFooters[parseInt(sectionIndex.toString(), 10)]) {
            headerFooterWidget = this.documentHelper.headersFooters[parseInt(sectionIndex.toString(), 10)][parseInt(index.toString(), 10)];
        }
        if (sectionIndex != 0 && !headerFooterWidget) {
            var content = l10n.getConstant('Same as Previous');
            var width_1 = ctx.measureText(content).width;
            var right = this.viewer.containerWidth - width_1 - 75 + left;
            this.renderHeaderFooterMark(ctx, right, top + y, width_1 + 10, 20);
            this.renderHeaderFooterMarkText(ctx, content, right + 5, y + top + 15);
        }
        if (page.footerWidget) {
            //Footer Widget
            var footerDistance = HelperMethods.convertPointToPixel(page.bodyWidgets[0].sectionFormat.footerDistance);
            var footerHeight = this.getScaledValue(page.boundingRectangle.height) -
                /* eslint-disable-next-line max-len */
                this.getScaledValue(Math.max(page.footerWidgetIn.height + footerDistance, HelperMethods.convertPointToPixel(page.footerWidgetIn.sectionFormat.bottomMargin)));
            //Maximum footer height limit
            footerHeight = Math.max((this.getScaledValue(page.boundingRectangle.height) - headerFooterHeight), footerHeight);
            this.renderDashLine(ctx, left, top + footerHeight, pageWidth, '#000000', false);
            var type_1 = this.getHeaderFooterType(page, false);
            var sectionIndex_1 = page.sectionIndex;
            if (this.documentHelper.headersFooters.length > 1) {
                var sectionMarkIndex = sectionIndex_1 + 1;
                type_1 = type_1 + " -" + l10n.getConstant('Section') + " " + sectionMarkIndex + "-";
            }
            width = ctx.measureText(type_1).width;
            this.renderHeaderFooterMark(ctx, left + 5, top + footerHeight - 20, width + 10, 20);
            this.renderHeaderFooterMarkText(ctx, type_1, left + 10, top + footerHeight - 5);
            var index_1 = this.viewer.getHeaderFooter(page.footerWidget.headerFooterType);
            var headerFooterWidget_1;
            if (this.documentHelper.headersFooters[parseInt(sectionIndex_1.toString(), 10)]) {
                headerFooterWidget_1 = this.documentHelper.headersFooters[parseInt(sectionIndex_1.toString(), 10)][parseInt(index_1.toString(), 10)];
            }
            if (sectionIndex_1 != 0 && !headerFooterWidget_1) {
                var content = l10n.getConstant('Same as Previous');
                var width_2 = ctx.measureText(content).width;
                var right = this.viewer.containerWidth - width_2 - 75 + left;
                this.renderHeaderFooterMark(ctx, right, top + footerHeight - 20, width_2 + 10, 20);
                this.renderHeaderFooterMarkText(ctx, content, right + 5, top + footerHeight - 5);
            }
            ctx.restore();
        }
    };
    Renderer.prototype.getFooterHeight = function (page) {
        var footerWidgetHeight = ((page.boundingRectangle.height) / 100) * 40;
        var footerDistance = HelperMethods.convertPointToPixel(page.bodyWidgets[0].sectionFormat.footerDistance);
        var actualHeight = page.boundingRectangle.height -
            Math.max(page.footerWidgetIn.height + footerDistance, HelperMethods.convertPointToPixel(page.footerWidgetIn.sectionFormat.bottomMargin));
        return Math.max((page.boundingRectangle.height) - footerWidgetHeight, actualHeight);
    };
    Renderer.prototype.getHeaderFooterType = function (page, isHeader) {
        var type;
        var l10n = new L10n('documenteditor', this.documentHelper.owner.defaultLocale);
        l10n.setLocale(this.documentHelper.owner.locale);
        type = isHeader ? l10n.getConstant('Header') : l10n.getConstant('Footer');
        if (page.bodyWidgets[0].sectionFormat.differentFirstPage &&
            (isNullOrUndefined(page.previousPage) || page.sectionIndex !== page.previousPage.sectionIndex)) {
            type = isHeader ? l10n.getConstant('First Page Header') : l10n.getConstant('First Page Footer');
        }
        else if (page.bodyWidgets[0].sectionFormat.differentOddAndEvenPages) {
            if ((this.documentHelper.pages.indexOf(page) + 1) % 2 === 0) {
                type = isHeader ? l10n.getConstant('Even Page Header') : l10n.getConstant('Even Page Footer');
            }
            else {
                type = isHeader ? l10n.getConstant('Odd Page Header') : l10n.getConstant('Odd Page Footer');
            }
        }
        return type;
    };
    /* eslint-disable-next-line max-len */
    Renderer.prototype.renderDashLine = function (context, x, y, width, fillStyle, isSmallDash) {
        context.beginPath();
        context.strokeStyle = fillStyle;
        context.lineWidth = 1;
        if (isSmallDash) {
            context.setLineDash([3, 2]);
        }
        else {
            context.setLineDash([6, 4]);
        }
        context.moveTo(x, y);
        context.lineTo(x + width, y);
        context.stroke();
        context.setLineDash([]);
        context.closePath();
    };
    Renderer.prototype.renderSolidLine = function (context, x, y, width, fillStyle) {
        context.beginPath();
        context.strokeStyle = fillStyle;
        context.lineWidth = 0.5;
        context.moveTo(x, y);
        context.lineTo(x + width, y);
        context.stroke();
        context.closePath();
    };
    Renderer.prototype.renderHeaderFooterMark = function (ctx, x, y, w, h) {
        ctx.beginPath();
        ctx.fillStyle = 'lightgray';
        ctx.fillRect(x, y, w, h);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(x, y, w, h);
        ctx.closePath();
    };
    Renderer.prototype.renderHeaderFooterMarkText = function (ctx, content, x, y) {
        ctx.beginPath();
        ctx.fillStyle = '#000000';
        ctx.textBaseline = 'alphabetic';
        ctx.fillText(content, x, y);
        ctx.closePath();
    };
    Renderer.prototype.render = function (page, bodyWidget) {
        if (this.isFieldCode) {
            this.isFieldCode = false;
        }
        /* eslint-disable */
        for (var i = 0; i < page.bodyWidgets.length; i++) {
            if (!isNullOrUndefined(page.bodyWidgets[i].floatingElements)) {
                this.renderFloatingItems(page, page.bodyWidgets[i].floatingElements, 'Behind');
            }
        }
        /* eslint-enable */
        var isClipped = false;
        if (!(this.viewer instanceof WebLayoutViewer) && bodyWidget.sectionFormat.columns.length > 1) {
            var colIndex = page.bodyWidgets.indexOf(bodyWidget);
            var xPos = void 0;
            var width = void 0;
            if (bodyWidget.columnIndex === 0) {
                /* eslint-disable */
                xPos = page.bodyWidgets[colIndex].x - HelperMethods.convertPointToPixel(page.bodyWidgets[colIndex].sectionFormat.leftMargin);
                width = HelperMethods.convertPointToPixel(page.bodyWidgets[colIndex].sectionFormat.leftMargin) + bodyWidget.sectionFormat.columns[bodyWidget.columnIndex].width + (bodyWidget.sectionFormat.columns[bodyWidget.columnIndex].space / 2);
                /* eslint-enable */
            }
            else if (colIndex === bodyWidget.sectionFormat.columns.length - 1) {
                /* eslint-disable */
                xPos = page.bodyWidgets[colIndex].x - (bodyWidget.sectionFormat.columns[bodyWidget.columnIndex - 1].space / 2);
                width = HelperMethods.convertPointToPixel(page.bodyWidgets[colIndex].sectionFormat.rightMargin) + bodyWidget.sectionFormat.columns[bodyWidget.columnIndex].width + (bodyWidget.sectionFormat.columns[bodyWidget.columnIndex - 1].space / 2);
                /* eslint-enable */
            }
            else {
                /* eslint-disable */
                xPos = page.bodyWidgets[colIndex].x - (bodyWidget.sectionFormat.columns[bodyWidget.columnIndex].space / 2);
                width = bodyWidget.sectionFormat.columns[bodyWidget.columnIndex].width + bodyWidget.sectionFormat.columns[bodyWidget.columnIndex].space;
                /* eslint-enable */
            }
            /* eslint-disable */
            this.clipRect(xPos, page.bodyWidgets[colIndex].y, this.getScaledValue(width), this.getScaledValue(page.boundingRectangle.height));
            /* eslint-enable */
            isClipped = true;
        }
        for (var i = 0; i < bodyWidget.childWidgets.length; i++) {
            var widget = bodyWidget.childWidgets[parseInt(i.toString(), 10)];
            if (i === 0 && bodyWidget.childWidgets[0] instanceof TableWidget &&
                (bodyWidget.childWidgets[0].childWidgets.length > 0) &&
                page.repeatHeaderRowTableWidget) {
                /* eslint-disable-next-line max-len */
                this.renderHeader(page, widget, this.documentHelper.layout.getHeader(bodyWidget.childWidgets[0]));
            }
            this.renderWidget(page, widget);
        }
        if (isClipped) {
            this.pageContext.restore();
        }
        /* eslint-disable */
        for (var i = 0; i < page.bodyWidgets.length; i++) {
            if (!isNullOrUndefined(page.bodyWidgets[i].floatingElements)) {
                this.renderFloatingItems(page, page.bodyWidgets[i].floatingElements, 'InFrontOfText');
            }
        }
        /* eslint-enable */
        for (var i = 0; i < page.bodyWidgets.length; i++) {
            if (page.bodyWidgets[parseInt(i.toString(), 10)].sectionFormat.lineBetweenColumns === true) {
                if (page.bodyWidgets[parseInt(i.toString(), 10)].columnIndex !== 0 && page.bodyWidgets.length > 1) {
                    var topMargin = HelperMethods.convertPointToPixel(page.bodyWidgets[0].sectionFormat.topMargin);
                    var linestartY = this.getScaledValue(Math.max((page.headerWidgetIn.y + page.headerWidgetIn.height), topMargin));
                    var headerFooterHeight = (this.getScaledValue(page.boundingRectangle.height) / 100) * 40;
                    var footerDistance = HelperMethods.convertPointToPixel(page.bodyWidgets[0].sectionFormat.footerDistance);
                    var footerHeight = this.getScaledValue(page.boundingRectangle.height) -
                        /* eslint-disable-next-line max-len */
                        this.getScaledValue(Math.max(page.footerWidgetIn.height + footerDistance, HelperMethods.convertPointToPixel(page.footerWidgetIn.sectionFormat.bottomMargin)));
                    footerHeight = Math.max((this.getScaledValue(page.boundingRectangle.height) - headerFooterHeight), footerHeight);
                    var inBetweenSpace = (page.bodyWidgets[parseInt(i.toString(), 10)].x - (page.bodyWidgets[parseInt(i.toString(), 10)].previousRenderedWidget.x + page.bodyWidgets[parseInt(i.toString(), 10)].previousRenderedWidget.width)) / 2;
                    var startX = inBetweenSpace + (page.bodyWidgets[parseInt(i.toString(), 10)].previousRenderedWidget.x + page.bodyWidgets[parseInt(i.toString(), 10)].previousRenderedWidget.width);
                    var startY = linestartY / this.documentHelper.zoomFactor;
                    var endX = startX;
                    var endY = void 0;
                    if (page.footnoteWidget) {
                        endY = ((footerHeight - (page.footerWidgetIn.height / 2)) - page.footnoteWidget.height * this.documentHelper.zoomFactor) / this.documentHelper.zoomFactor;
                    }
                    else {
                        endY = (footerHeight - (page.footerWidgetIn.height / 2)) / this.documentHelper.zoomFactor;
                    }
                    var firstBody = this.documentHelper.layout.getBodyWidget(page.bodyWidgets[parseInt(i.toString(), 10)], true);
                    var height = this.documentHelper.layout.getNextWidgetHeight(firstBody);
                    startY = page.bodyWidgets[parseInt(i.toString(), 10)].y;
                    endY = height;
                    var color = '#000000';
                    this.renderSingleBorder(color, startX, startY, endX, endY, 0.5, "Single");
                }
            }
        }
    };
    Renderer.prototype.renderFloatingItems = function (page, floatingElements, wrappingType) {
        if (!isNullOrUndefined(floatingElements) && floatingElements.length > 0) {
            var overLappedShapeWidgets = new Dictionary();
            /* eslint-disable */
            floatingElements.sort(function (a, b) {
                if (a instanceof TableWidget || b instanceof TableWidget) {
                    return 0;
                }
                else {
                    return a.zOrderPosition - b.zOrderPosition;
                }
            });
            for (var i = 0; i < floatingElements.length; i++) {
                if (floatingElements[i] instanceof TableWidget) {
                    continue;
                }
                var shape = floatingElements[i];
                if ((wrappingType === "Behind" && shape.textWrappingStyle !== "Behind") ||
                    (wrappingType !== "Behind" && shape.textWrappingStyle === "Behind")) {
                    continue;
                }
                if (!this.isOverLappedShapeWidget(shape) || (!isNullOrUndefined(floatingElements[i + 1]) && shape.paragraph !== floatingElements[i + 1].paragraph)) {
                    if (shape instanceof ImageElementBox) {
                        this.renderImageElementBox(shape, shape.x, shape.y, 0);
                    }
                    else if (shape instanceof ShapeElementBox) {
                        var shapeLeft = this.getScaledValue(shape.x, 1);
                        var shapeTop = this.getScaledValue(shape.y, 2);
                        this.renderShapeElementBox(shape, shapeLeft, shapeTop, page);
                    }
                }
                else if (!overLappedShapeWidgets.containsKey(shape.zOrderPosition)) {
                    overLappedShapeWidgets.add(shape.zOrderPosition, shape);
                }
            }
            if (overLappedShapeWidgets.length > 0) {
                var sortedOverLappedShapeWidgets = overLappedShapeWidgets.keys.sort();
                for (var j = 0; j < sortedOverLappedShapeWidgets.length; j++) {
                    var shape = overLappedShapeWidgets.get(sortedOverLappedShapeWidgets[j]);
                    if (shape instanceof ImageElementBox) {
                        this.renderImageElementBox(shape, shape.x, shape.y, 0);
                    }
                    else if (shape instanceof ShapeElementBox) {
                        var shapeLeft = this.getScaledValue(shape.x, 1);
                        var shapeTop = this.getScaledValue(shape.y, 2);
                        this.renderShapeElementBox(shape, shapeLeft, shapeTop, page);
                    }
                }
            }
        }
    };
    Renderer.prototype.isOverLappedShapeWidget = function (floatingElement) {
        return ((floatingElement instanceof ImageElementBox
            && floatingElement.textWrappingStyle !== 'Inline'
            && floatingElement.textWrappingStyle !== 'Behind'
            && !(this.documentHelper.compatibilityMode !== 'Word2013'
                && (floatingElement.isBelowText
                    && floatingElement.textWrappingStyle !== 'InFrontOfText')))
            || (floatingElement instanceof ShapeElementBox
                && floatingElement.textWrappingStyle !== 'Inline'
                && floatingElement.textWrappingStyle !== 'Behind'
                && !(this.documentHelper.compatibilityMode !== 'Word2013'
                    && (floatingElement.isBelowText
                        && floatingElement.textWrappingStyle !== 'InFrontOfText'))));
    };
    Renderer.prototype.renderShapeElementBox = function (shape, shapeLeft, shapeTop, page) {
        var isZeroShapeHeight = (shape.height === 0) ? true : false;
        var shapeType = shape.autoShapeType;
        var blocks = shape.textFrame.childWidgets;
        this.pageContext.beginPath();
        if (shape.fillFormat && shape.fillFormat.color && shape.fillFormat.fill && shapeType !== 'StraightConnector') {
            this.pageContext.fillStyle = shape.fillFormat.color;
            this.pageContext.fillRect(shapeLeft, shapeTop, this.getScaledValue(shape.width), this.getScaledValue(shape.height));
        }
        if (!isNullOrUndefined(shapeType)) {
            if (shape.lineFormat.line && shape.lineFormat.lineFormatType !== 'None') {
                this.pageContext.lineWidth = shape.lineFormat.weight;
                this.pageContext.strokeStyle = HelperMethods.getColor(shape.lineFormat.color);
                if (shapeType !== 'StraightConnector') {
                    this.pageContext.strokeRect(shapeLeft, shapeTop, this.getScaledValue(shape.width), this.getScaledValue(shape.height));
                }
                else {
                    this.pageContext.moveTo(shapeLeft, shapeTop);
                    this.pageContext.lineTo(shapeLeft + this.getScaledValue(shape.width), shapeTop + this.getScaledValue(shape.height));
                    this.pageContext.stroke();
                }
            }
        }
        this.pageContext.closePath();
        var isClipped = false;
        if (shape.width != 0 && shape.height != 0) {
            isClipped = true;
            this.clipRect(shape.x, shape.y, this.getScaledValue(shape.width), this.getScaledValue(shape.height));
        }
        for (var i = 0; i < blocks.length; i++) {
            this.renderWidget(page, blocks[i]);
            if (isZeroShapeHeight && shapeType !== 'StraightConnector') {
                shape.height = HelperMethods.round((shape.height + blocks[i].height), 5);
            }
        }
        if (isZeroShapeHeight) {
            isZeroShapeHeight = false;
        }
        if (isClipped) {
            this.pageContext.restore();
        }
    };
    Renderer.prototype.renderWidget = function (page, widget) {
        if (this.documentHelper.owner.enableLockAndEdit) {
            this.renderLockRegionBorder(page, widget);
        }
        if (widget instanceof ParagraphWidget) {
            this.renderParagraphWidget(page, widget);
        }
        else {
            this.renderTableWidget(page, widget);
        }
    };
    Renderer.prototype.renderLockRegionBorder = function (page, widget) {
        if (!widget.isInsideTable && widget instanceof BlockWidget && widget.locked) {
            var settinsModel = this.documentHelper.owner.documentEditorSettings.collaborativeEditingSettings;
            var sectionFormat = page.bodyWidgets[0].sectionFormat;
            var leftPosition = HelperMethods.convertPointToPixel(sectionFormat.leftMargin) - 5;
            var pageWidth = sectionFormat.pageWidth - sectionFormat.leftMargin - sectionFormat.rightMargin;
            pageWidth = HelperMethods.convertPointToPixel(pageWidth) + 10;
            if (this.viewer instanceof WebLayoutViewer) {
                leftPosition = widget.x - 5;
                pageWidth = (this.documentHelper.visibleBounds.width - (this.viewer.padding.right * 5)) / this.documentHelper.zoomFactor;
            }
            var previousWidget = widget.previousRenderedWidget;
            var nextWidget = widget.nextRenderedWidget;
            var color = widget.lockedBy === this.documentHelper.owner.currentUser ? settinsModel.editableRegionColor : settinsModel.lockedRegionColor;
            var topPosition = widget.y;
            var height = widget.y + widget.height;
            //Left border
            this.renderSingleBorder(color, leftPosition, topPosition, leftPosition, height, 1, "Single");
            //Top border
            if (isNullOrUndefined(previousWidget) || !previousWidget.locked || widget.lockedBy !== previousWidget.lockedBy) {
                this.renderSingleBorder(color, leftPosition, topPosition, leftPosition + pageWidth, topPosition, 1, "Single");
            }
            //Right border
            this.renderSingleBorder(color, leftPosition + pageWidth, topPosition, leftPosition + pageWidth, height, 1, "Single");
            if (isNullOrUndefined(nextWidget) || !nextWidget.locked || widget.lockedBy !== nextWidget.lockedBy) {
                // Bottom border
                this.renderSingleBorder(color, leftPosition, height, leftPosition + pageWidth, height, 1, "Single");
            }
        }
    };
    Renderer.prototype.renderHeader = function (page, widget, header) {
        if (isNullOrUndefined(header)) {
            return;
        }
        //Updated client area for current page
        page.viewer.updateClientArea(page.bodyWidgets[0], page);
        var top = page.viewer.clientArea.y;
        var parentTable = header.ownerTable.getSplitWidgets()[0];
        for (var i = 0; i <= header.rowIndex; i++) {
            if (parentTable.childWidgets.length === 0) {
                return;
            }
            var row = parentTable.childWidgets[i];
            if (widget.childWidgets.indexOf(row) !== -1) {
                continue;
            }
            var headerWidget = row.clone();
            headerWidget.containerWidget = row.containerWidget;
            page.viewer.updateClientAreaLocation(headerWidget, new Rect(page.viewer.clientArea.x, top, headerWidget.width, headerWidget.height));
            page.documentHelper.layout.updateChildLocationForRow(top, headerWidget);
            var cell = undefined;
            //Renders table cell outline rectangle - Border and background color.
            for (var j = 0; j < headerWidget.childWidgets.length; j++) {
                cell = headerWidget.childWidgets[j];
                this.renderTableCellWidget(page, cell);
            }
            top += headerWidget.height;
        }
        if (widget.y !== top) {
            //this.Location.Y = top;
            page.documentHelper.layout.updateChildLocationForTable(top, widget);
        }
    };
    Renderer.prototype.renderParagraphWidget = function (page, paraWidget) {
        var top = paraWidget.y;
        var left = paraWidget.x;
        var isClipped = false;
        var firstLine = paraWidget.firstChild;
        var paddingLeft = 0;
        if (!isNullOrUndefined(firstLine)) {
            for (var i = 0; i < firstLine.children.length; i++) {
                var element = firstLine.children[i];
                if (element instanceof TextElementBox) {
                    paddingLeft = element.padding.left;
                    break;
                }
            }
        }
        if (paddingLeft > 0) {
            this.clipRect(paraWidget.x + paddingLeft, this.getScaledValue(page.boundingRectangle.y), this.getScaledValue(page.boundingRectangle.width), this.getScaledValue(page.boundingRectangle.height));
            isClipped = true;
        }
        if (!(paraWidget.containerWidget instanceof HeaderFooterWidget && paraWidget.containerWidget.isEmpty && !isNullOrUndefined(this.documentHelper.selection) && !isNullOrUndefined(this.documentHelper.selection.start.paragraph) && !this.documentHelper.selection.start.paragraph.isInHeaderFooter)) {
            this.renderParagraphBorder(page, paraWidget);
        }
        if (isClipped) {
            this.pageContext.restore();
        }
        for (var i = 0; i < paraWidget.childWidgets.length; i++) {
            var widget = paraWidget.childWidgets[i];
            top += widget.marginTop;
            this.renderLine(widget, page, left, top);
            top += widget.height;
        }
    };
    Renderer.prototype.renderParagraphBorder = function (page, paragraphWidet) {
        var leftBorder = paragraphWidet.paragraphFormat.borders.left;
        var topBorder = paragraphWidet.paragraphFormat.borders.top;
        var rightBorder = paragraphWidet.paragraphFormat.borders.right;
        var bottomBorder = paragraphWidet.paragraphFormat.borders.bottom;
        var startX = 0;
        var startY = 0;
        var endX = 0;
        var endY = 0;
        var lineWidth = 0;
        var firstLine = paragraphWidet.firstChild;
        var lastLine = paragraphWidet.lastChild;
        var canRenderParagraphBorders = this.documentHelper.canRenderBorder(paragraphWidet);
        if (!isNullOrUndefined(leftBorder) && leftBorder.lineStyle !== 'None') {
            startX = this.documentHelper.getParagraphLeftPosition(paragraphWidet) - HelperMethods.convertPointToPixel(leftBorder.space);
            endX = startX;
            endY = startY + paragraphWidet.height;
            if (topBorder.lineStyle !== 'None' && firstLine.isFirstLine() && !canRenderParagraphBorders.skipTopBorder) {
                startY = paragraphWidet.y + this.getTopMargin(paragraphWidet) - (HelperMethods.convertPointToPixel(topBorder.lineWidth + topBorder.space));
                endY = startY + paragraphWidet.height - (this.getTopMargin(paragraphWidet) - (HelperMethods.convertPointToPixel(topBorder.lineWidth + topBorder.space)));
            }
            else {
                startY = paragraphWidet.y;
                endY = startY + paragraphWidet.height;
            }
            if (bottomBorder.lineStyle !== 'None' && lastLine.isLastLine() && !canRenderParagraphBorders.skipBottomBorder) {
                endY = (endY + HelperMethods.convertPointToPixel(bottomBorder.lineWidth + bottomBorder.space)) - this.getBottomMargin(paragraphWidet);
            }
            lineWidth = HelperMethods.convertPointToPixel(leftBorder.lineWidth);
            this.renderSingleBorder(leftBorder.color, startX, startY, endX, endY, lineWidth, leftBorder.lineStyle);
        }
        if (!isNullOrUndefined(topBorder) && topBorder.lineStyle !== 'None' && firstLine.isFirstLine() && !canRenderParagraphBorders.skipTopBorder) {
            startX = this.documentHelper.getParagraphLeftPosition(paragraphWidet);
            endX = startX + this.getContainerWidth(paragraphWidet, page);
            startY = paragraphWidet.y + this.getTopMargin(paragraphWidet) - (HelperMethods.convertPointToPixel(topBorder.lineWidth + topBorder.space));
            endY = startY;
            if (leftBorder.lineStyle !== 'None') {
                startX -= HelperMethods.convertPointToPixel(leftBorder.space);
            }
            if (rightBorder.lineStyle !== 'None') {
                endX += HelperMethods.convertPointToPixel(rightBorder.space);
            }
            lineWidth = HelperMethods.convertPointToPixel(topBorder.lineWidth);
            this.renderSingleBorder(topBorder.color, startX, startY, endX, endY, lineWidth, topBorder.lineStyle);
        }
        if (!isNullOrUndefined(rightBorder) && rightBorder.lineStyle !== 'None') {
            startX = this.documentHelper.getParagraphLeftPosition(paragraphWidet) + this.getContainerWidth(paragraphWidet, page) + HelperMethods.convertPointToPixel(rightBorder.space);
            startY = endY;
            endX = startX;
            endY = startY + paragraphWidet.height;
            if (topBorder.lineStyle !== 'None' && firstLine.isFirstLine() && !canRenderParagraphBorders.skipTopBorder) {
                startY = paragraphWidet.y + this.getTopMargin(paragraphWidet) - (HelperMethods.convertPointToPixel(topBorder.lineWidth + topBorder.space));
                endY = startY + paragraphWidet.height - (this.getTopMargin(paragraphWidet) - (HelperMethods.convertPointToPixel(topBorder.lineWidth + topBorder.space)));
            }
            else {
                startY = paragraphWidet.y;
                endY = startY + paragraphWidet.height;
            }
            if (bottomBorder.lineStyle !== 'None' && lastLine.isLastLine() && !canRenderParagraphBorders.skipBottomBorder) {
                endY = (endY + HelperMethods.convertPointToPixel(bottomBorder.lineWidth + bottomBorder.space)) - this.getBottomMargin(paragraphWidet);
            }
            lineWidth = HelperMethods.convertPointToPixel(rightBorder.lineWidth);
            this.renderSingleBorder(rightBorder.color, startX, startY, endX, endY, lineWidth, rightBorder.lineStyle);
        }
        if (!isNullOrUndefined(bottomBorder) && bottomBorder.lineStyle !== 'None' && lastLine.isLastLine() && !canRenderParagraphBorders.skipBottomBorder) {
            startX = this.documentHelper.getParagraphLeftPosition(paragraphWidet);
            endX = startX + this.getContainerWidth(paragraphWidet, page);
            startY = (paragraphWidet.y + paragraphWidet.height + HelperMethods.convertPointToPixel(bottomBorder.lineWidth + bottomBorder.space)) - (this.getBottomMargin(paragraphWidet));
            endY = startY;
            if (leftBorder.lineStyle !== 'None') {
                startX -= HelperMethods.convertPointToPixel(leftBorder.space);
            }
            if (rightBorder.lineStyle !== 'None') {
                endX += HelperMethods.convertPointToPixel(rightBorder.space);
            }
            lineWidth = HelperMethods.convertPointToPixel(bottomBorder.lineWidth);
            this.renderSingleBorder(bottomBorder.color, startX, startY, endX, endY, lineWidth, bottomBorder.lineStyle);
        }
    };
    Renderer.prototype.getContainerWidth = function (paraWidget, page) {
        var hangingIndent = 0;
        if (paraWidget.paragraphFormat.firstLineIndent < 0) {
            hangingIndent = Math.abs(paraWidget.paragraphFormat.firstLineIndent);
        }
        if (paraWidget.isInsideTable) {
            var cell = paraWidget.associatedCell;
            return (cell.width + cell.margin.left + cell.margin.right) - cell.leftBorderWidth;
        }
        else {
            if (this.viewer instanceof WebLayoutViewer) {
                var indent = HelperMethods.convertPointToPixel(paraWidget.leftIndent + paraWidget.rightIndent);
                return (this.documentHelper.visibleBounds.width - (indent) - (this.viewer.padding.right * 4) - (this.viewer.padding.left * 2)) / this.documentHelper.zoomFactor;
            }
            else {
                var section = paraWidget.bodyWidget;
                if (section instanceof BodyWidget && section.sectionFormat.columns.length > 1) {
                    var colIndex = section.columnIndex;
                    return section.sectionFormat.columns[colIndex].width + HelperMethods.convertPointToPixel(hangingIndent - (paraWidget.rightIndent + paraWidget.leftIndent));
                }
                else {
                    var width = section.sectionFormat.pageWidth - section.sectionFormat.leftMargin - section.sectionFormat.rightMargin;
                    return HelperMethods.convertPointToPixel(width + hangingIndent - (paraWidget.rightIndent + paraWidget.leftIndent));
                }
            }
        }
    };
    Renderer.prototype.getTopMargin = function (paragraph) {
        if (paragraph.isEmpty()) {
            return paragraph.childWidgets[0].margin.top;
        }
        else {
            var widget = paragraph.childWidgets[0];
            var topMargin = 0;
            if (!isNullOrUndefined(widget.margin)) {
                topMargin = widget.margin.top;
            }
            return topMargin;
        }
    };
    Renderer.prototype.getBottomMargin = function (paragarph) {
        if (paragarph.isEmpty()) {
            return paragarph.childWidgets[paragarph.childWidgets.length - 1].margin.bottom;
        }
        else {
            var widget = paragarph.childWidgets[paragarph.childWidgets.length - 1];
            var bottomMargin = 0;
            if (!isNullOrUndefined(widget.margin)) {
                bottomMargin = widget.margin.bottom;
            }
            return bottomMargin;
        }
    };
    Renderer.prototype.renderfootNoteWidget = function (page, footnote, width) {
        var isEmptyPage = footnote.page.bodyWidgets.length === 1 && ((footnote.page.bodyWidgets[0].childWidgets.length === 1
            && footnote.page.bodyWidgets[0].childWidgets[0].isEmpty != undefined && footnote.page.bodyWidgets[0].childWidgets[0].isEmpty()) || footnote.page.bodyWidgets[0].childWidgets.length === 0);
        var footerY = this.getFooterHeight(page);
        var height = footnote.y + footnote.height;
        if (height > footerY) {
            height = (footerY - footnote.y);
        }
        this.pageContext.beginPath();
        this.pageContext.save();
        this.pageContext.rect(this.pageLeft, this.getScaledValue(footnote.y, 2), this.getScaledValue(width), this.getScaledValue(height));
        this.pageContext.clip();
        for (var i = 0; i < footnote.bodyWidgets.length; i++) {
            var bodyWidget = footnote.bodyWidgets[i];
            var footNoteReference = bodyWidget.footNoteReference;
            for (var j = 0; j < bodyWidget.childWidgets.length; j++) {
                var widget = bodyWidget.childWidgets[j];
                if (i === 0 && j === 0) {
                    var ctx = this.pageContext;
                    var xPos = page.bodyWidgets[0].x;
                    if (page.bodyWidgets.length > 1 && !isNullOrUndefined(bodyWidget.nextWidget) && !(bodyWidget.nextWidget.sectionFormat.breakCode === 'NoBreak')) {
                        var footWidth = page.bodyWidgets[0].width;
                        this.renderSolidLine(ctx, this.getScaledValue(xPos, 1), this.getScaledValue(footnote.y + (footnote.margin.top / 2) + 1, 2), footWidth * this.documentHelper.zoomFactor, '#000000');
                    }
                    else {
                        this.renderSolidLine(ctx, this.getScaledValue(xPos, 1), this.getScaledValue(footnote.y + (footnote.margin.top / 2) + 1, 2), 210 * this.documentHelper.zoomFactor, '#000000');
                    }
                }
                if (j === 0 && !isNullOrUndefined(footNoteReference) && widget.childWidgets[0].children[0] instanceof TextElementBox && !this.documentHelper.owner.editor.isFootNoteInsert) {
                    //if (j < 1 || (j > 0 && widget.footNoteReference !== (bodyWidget.childWidgets[j - 1] as BlockWidget).footNoteReference)) {
                    var footNoteElement = widget.childWidgets[0].children[0];
                    footNoteElement.text = footNoteElement.text.replace(footNoteElement.text, footNoteReference.text);
                    footNoteElement.width = footNoteReference.width;
                    //}
                }
                this.renderWidget(page, widget);
            }
        }
        this.pageContext.restore();
    };
    Renderer.prototype.renderTableWidget = function (page, tableWidget) {
        if (this.isFieldCode) {
            return;
        }
        for (var i = 0; i < tableWidget.childWidgets.length; i++) {
            var widget = tableWidget.childWidgets[i];
            this.renderTableRowWidget(page, widget);
            if (tableWidget.tableFormat.cellSpacing > 0) {
                this.renderTableOutline(tableWidget);
            }
            if (widget.isRenderBookmarkEnd && this.documentHelper.owner.documentEditorSettings.showBookmarks) {
                var cellWidget = widget.lastChild;
                var border = cellWidget.ownerTable.isBidiTable ? TableCellWidget.getCellLeftBorder(cellWidget) : TableCellWidget.getCellRightBorder(cellWidget);
                var lineWidth = HelperMethods.convertPointToPixel(border.getLineWidth());
                var lastPara = this.documentHelper.selection.getLastParagraph(widget.lastChild);
                var height = lastPara.lastChild.height - lastPara.lastChild.margin.bottom;
                this.renderBookmark(this.getScaledValue((cellWidget.x + cellWidget.width + cellWidget.margin.right - lineWidth / 2) + this.documentHelper.textHelper.getParagraphMarkWidth(lastPara.characterFormat), 1), this.getScaledValue(cellWidget.y - cellWidget.margin.top, 2), this.getScaledValue(height), 1);
            }
        }
    };
    Renderer.prototype.renderTableRowWidget = function (page, rowWidget) {
        for (var i = 0; i < rowWidget.childWidgets.length; i++) {
            var widget = rowWidget.childWidgets[i];
            this.renderTableCellWidget(page, widget);
            if (widget.isRenderBookmarkEnd && this.documentHelper.owner.documentEditorSettings.showBookmarks) {
                var lastPara = this.documentHelper.selection.getLastParagraph(widget);
                var lastLine = lastPara.lastChild;
                var position = this.documentHelper.selection.getEndPosition(lastPara);
                if (this.documentHelper.owner.documentEditorSettings.showHiddenMarks && !this.isPrinting) {
                    var xLeft = this.documentHelper.textHelper.getWidth(String.fromCharCode(164), lastLine.paragraph.characterFormat) + position.x;
                    this.renderBookmark(this.getScaledValue(xLeft, 1), this.getScaledValue(position.y, 2), this.getScaledValue(lastLine.height - lastLine.margin.bottom), 1);
                }
                else {
                    this.renderBookmark(this.getScaledValue(position.x, 1), this.getScaledValue(position.y, 2), this.getScaledValue(lastLine.height - lastLine.margin.bottom), 1);
                }
            }
        }
    };
    Renderer.prototype.renderTableCellWidget = function (page, cellWidget) {
        if (!this.isPrinting) {
            var cellTopMargin = 0;
            var cellBottomMargin = 0;
            cellTopMargin = cellWidget.margin.top - cellWidget.containerWidget.topBorderWidth;
            cellBottomMargin = cellWidget.margin.bottom - cellWidget.containerWidget.bottomBorderWidth;
            if (this.getScaledValue(cellWidget.y, 2) + cellWidget.height + cellBottomMargin * this.documentHelper.zoomFactor < 0 ||
                (this.getScaledValue(cellWidget.y, 2) - cellTopMargin > this.documentHelper.visibleBounds.height)) {
                return;
            }
        }
        var widgetHeight = 0;
        this.renderSelectionHighlightOnTable(page, cellWidget);
        this.renderTableCellOutline(page.documentHelper, cellWidget);
        for (var i = 0; i < cellWidget.childWidgets.length; i++) {
            var widget = cellWidget.childWidgets[i];
            // MS word render the content in right margin also.
            // So, we need to add right margin value while cliping the content
            var width = (cellWidget.width + cellWidget.margin.left + cellWidget.margin.right) - cellWidget.leftBorderWidth;
            if (!this.isPrinting) {
                this.clipRect(cellWidget.x - cellWidget.margin.left, cellWidget.y, this.getScaledValue(width), this.getScaledValue(this.height));
            }
            this.renderWidget(page, widget);
            this.pageContext.restore();
        }
        if (cellWidget.isRenderEditRangeStart) {
            var firstPara = this.documentHelper.selection.getFirstParagraph(cellWidget);
            var firstLine = firstPara.firstChild;
            var xLeft = firstLine.paragraph.x;
            var ytop = firstLine.paragraph.y;
            if (this.documentHelper.owner.documentEditorSettings.highlightEditableRanges) {
                var highlighters = page.documentHelper.selection.editRegionHighlighters;
                var widgetInfo = !isNullOrUndefined(highlighters) ? highlighters.get(firstLine) : [];
                var color = !isNullOrUndefined(widgetInfo) && !isNullOrUndefined(widgetInfo[0]) ? widgetInfo[0].color : "ffff00";
                this.renderBookmark(this.getScaledValue(xLeft, 1), this.getScaledValue(ytop, 2), this.getScaledValue(firstLine.height - firstLine.margin.bottom), 0, color);
            }
        }
        if (cellWidget.isRenderEditRangeEnd) {
            var lastPara = this.documentHelper.selection.getLastParagraph(cellWidget);
            var lastLine = lastPara.lastChild;
            var position = this.documentHelper.selection.getEndPosition(lastPara);
            var xLeft = this.documentHelper.textHelper.getWidth(String.fromCharCode(164), lastLine.paragraph.characterFormat) + position.x;
            if (this.documentHelper.owner.documentEditorSettings.highlightEditableRanges) {
                var highlighters = page.documentHelper.selection.editRegionHighlighters;
                var widgetInfo = !isNullOrUndefined(highlighters) ? highlighters.get(lastLine) : [];
                var color = !isNullOrUndefined(widgetInfo) && !isNullOrUndefined(widgetInfo[0]) ? widgetInfo[0].color : "ffff00";
                this.renderBookmark(this.getScaledValue(xLeft, 1), this.getScaledValue(position.y, 2), this.getScaledValue(lastLine.height - lastLine.margin.bottom), 0, color);
            }
        }
    };
    Renderer.prototype.checkHeaderFooterLineWidget = function (widget, keys) {
        var headerFooter;
        if (widget instanceof LineWidget) {
            headerFooter = widget.paragraph.bodyWidget;
        }
        else if (widget instanceof TableCellWidget) {
            headerFooter = widget.bodyWidget;
        }
        if (!isNullOrUndefined(headerFooter.parentHeaderFooter)) {
            headerFooter = headerFooter.parentHeaderFooter;
            for (var j = 0; j < keys.length; j++) {
                var selectedWidget = keys[j];
                if (selectedWidget instanceof LineWidget && widget instanceof LineWidget) {
                    var parentIndex = selectedWidget.getHierarchicalIndex('');
                    var currentLineIndex = widget.getHierarchicalIndex('');
                    if (selectedWidget.paragraph.isInHeaderFooter && headerFooter === selectedWidget.paragraph.bodyWidget
                        && parentIndex.substring(parentIndex.indexOf(';')) === currentLineIndex.substring(currentLineIndex.indexOf(';'))) {
                        return selectedWidget;
                    }
                }
                else if (selectedWidget instanceof TableCellWidget && widget instanceof TableCellWidget) {
                    var parentIndex = selectedWidget.getHierarchicalIndex('');
                    var currentLineIndex = widget.getHierarchicalIndex('');
                    if (selectedWidget.ownerTable.isInHeaderFooter && headerFooter === selectedWidget.ownerTable.bodyWidget
                        && parentIndex.substring(parentIndex.indexOf(';')) === currentLineIndex.substring(currentLineIndex.indexOf(';'))) {
                        return selectedWidget;
                    }
                }
            }
        }
        return undefined;
    };
    Renderer.prototype.renderEditRegionHighlight = function (page, lineWidget, top) {
        if (page.documentHelper.selection && !isNullOrUndefined(page.documentHelper.selection.editRegionHighlighters)) {
            var renderHighlight = page.documentHelper.selection.editRegionHighlighters.containsKey(lineWidget);
            if (!renderHighlight && lineWidget.paragraph.isInHeaderFooter) {
                var keys = page.documentHelper.selection.editRegionHighlighters.keys;
                lineWidget = this.checkHeaderFooterLineWidget(lineWidget, keys);
                if (!isNullOrUndefined(lineWidget)) {
                    renderHighlight = true;
                }
            }
            if (renderHighlight) {
                var widgetInfo = page.documentHelper.selection.editRegionHighlighters.get(lineWidget);
                for (var i = 0; i < widgetInfo.length; i++) {
                    this.pageContext.fillStyle = widgetInfo[i].color !== '' ? widgetInfo[i].color : '#add8e6';
                    this.pageContext.fillRect(this.getScaledValue(widgetInfo[i].left, 1), this.getScaledValue(top, 2), this.getScaledValue(widgetInfo[i].width), this.getScaledValue(lineWidget.height));
                }
            }
        }
    };
    Renderer.prototype.renderSearchHighlight = function (page, lineWidget, top) {
        if (this.documentHelper.owner.searchModule && !isNullOrUndefined(page.documentHelper.owner.searchModule.searchHighlighters)) {
            var renderHighlight = page.documentHelper.owner.searchModule.searchHighlighters.containsKey(lineWidget);
            if (!renderHighlight && lineWidget.paragraph.isInHeaderFooter) {
                var keys = page.documentHelper.owner.searchModule.searchHighlighters.keys;
                lineWidget = this.checkHeaderFooterLineWidget(lineWidget, keys);
                if (!isNullOrUndefined(lineWidget)) {
                    renderHighlight = true;
                }
            }
            if (renderHighlight) {
                var widgetInfo = page.documentHelper.owner.searchModule.searchHighlighters.get(lineWidget);
                for (var i = 0; i < widgetInfo.length; i++) {
                    this.pageContext.fillStyle = this.viewer.owner.documentEditorSettings.searchHighlightColor;
                    this.pageContext.fillRect(this.getScaledValue(widgetInfo[i].left, 1), this.getScaledValue(top, 2), this.getScaledValue(widgetInfo[i].width), this.getScaledValue(lineWidget.height));
                }
            }
        }
    };
    Renderer.prototype.renderSelectionHighlight = function (page, lineWidget, top) {
        if (!this.isPrinting && page.documentHelper.owner.selection && !this.documentHelper.isScrollToSpellCheck && page.documentHelper.owner.selection.selectedWidgets.length > 0) {
            var renderHighlight = page.documentHelper.owner.selection.selectedWidgets.containsKey(lineWidget);
            if (!renderHighlight && lineWidget.paragraph.isInHeaderFooter) {
                var keys = page.documentHelper.owner.selection.selectedWidgets.keys;
                lineWidget = this.checkHeaderFooterLineWidget(lineWidget, keys);
                if (!isNullOrUndefined(lineWidget)) {
                    renderHighlight = true;
                }
            }
            if (renderHighlight) {
                page.documentHelper.owner.selection.addSelectionHighlight(this.selectionContext, lineWidget, top, page);
            }
        }
    };
    Renderer.prototype.renderSelectionHighlightOnTable = function (page, cellWidget) {
        if (!this.isPrinting && page.documentHelper.owner.selection && page.documentHelper.owner.selection.selectedWidgets.length > 0) {
            var renderHighlight = page.documentHelper.owner.selection.selectedWidgets.containsKey(cellWidget);
            if (!renderHighlight && cellWidget.ownerTable.isInHeaderFooter) {
                var keys = page.documentHelper.owner.selection.selectedWidgets.keys;
                cellWidget = this.checkHeaderFooterLineWidget(cellWidget, keys);
                if (!isNullOrUndefined(cellWidget)) {
                    renderHighlight = true;
                }
            }
            if (renderHighlight) {
                page.documentHelper.owner.selection.addSelectionHighlightTable(this.selectionContext, cellWidget, page);
            }
        }
    };
    Renderer.prototype.renderLine = function (lineWidget, page, left, top) {
        this.renderSelectionHighlight(page, lineWidget, top);
        var paraFormat = lineWidget.paragraph.paragraphFormat;
        var x = left;
        if (lineWidget.isFirstLine() && !paraFormat.bidi) {
            left += HelperMethods.convertPointToPixel(paraFormat.firstLineIndent);
        }
        if (this.documentHelper && this.documentHelper.selection && !isNullOrUndefined(this.documentHelper.selection.formFieldHighlighters)
            && this.documentHelper.selection.formFieldHighlighters.containsKey(lineWidget)) {
            if (this.documentHelper.owner.documentEditorSettings
                && this.documentHelper.owner.documentEditorSettings.formFieldSettings.applyShading) {
                var widgetInfo = page.documentHelper.selection.formFieldHighlighters.get(lineWidget);
                for (var i = 0; i < widgetInfo.length; i++) {
                    this.pageContext.fillStyle = this.documentHelper.owner.documentEditorSettings.formFieldSettings.shadingColor;
                    var height_1 = lineWidget.height;
                    var isAltered = false;
                    var isLastLine = lineWidget.isLastLine();
                    if (isLastLine) {
                        height_1 = height_1 - HelperMethods.convertPointToPixel(this.documentHelper.layout.getAfterSpacing(lineWidget.paragraph));
                        if (lineWidget.paragraph.paragraphFormat.lineSpacing > 1) {
                            var formField = this.getFormfieldInLine(lineWidget);
                            if (!isNullOrUndefined(formField)) {
                                var sizeInfo = this.documentHelper.textHelper.getHeight(formField.characterFormat);
                                var maxHeight = sizeInfo.Height;
                                if (lineWidget.paragraph.paragraphFormat.lineSpacingType === 'Multiple') {
                                    height_1 = height_1 - HelperMethods.convertPointToPixel(this.documentHelper.layout.getLineSpacing(lineWidget.paragraph, maxHeight, true));
                                }
                                else {
                                    top = top + HelperMethods.convertPointToPixel(lineWidget.paragraph.paragraphFormat.beforeSpacing);
                                    height_1 = sizeInfo.Height;
                                    isAltered = true;
                                }
                            }
                        }
                    }
                    this.pageContext.fillRect(this.getScaledValue(widgetInfo[i].left, 1), this.getScaledValue(top, 2), this.getScaledValue(widgetInfo[i].width), this.getScaledValue(height_1));
                    if (isAltered) {
                        isAltered = false;
                        top = top - HelperMethods.convertPointToPixel(lineWidget.paragraph.paragraphFormat.beforeSpacing);
                    }
                }
            }
        }
        // Render search highlight
        this.renderSearchHighlight(page, lineWidget, top);
        // EditRegion highlight 
        this.renderEditRegionHighlight(page, lineWidget, top);
        var commentIDList = [];
        var children = lineWidget.renderedElements;
        var underlineY = this.getUnderlineYPosition(lineWidget);
        var bookmarks = [];
        if (!isNullOrUndefined(lineWidget.paragraph.associatedCell) && lineWidget.paragraph.associatedCell.isRenderBookmarkStart) {
            var firstLineInFirstPara = lineWidget.paragraph.associatedCell.firstChild.firstChild;
            if (firstLineInFirstPara == lineWidget) {
                bookmarks.push({ x: left, y: top, height: lineWidget.height - lineWidget.margin.bottom, type: 0 });
            }
        }
        for (var i = 0; i < children.length; i++) {
            var elementBox = children[i];
            if (elementBox instanceof ShapeBase && elementBox.textWrappingStyle !== 'Inline') {
                continue;
            }
            if (elementBox instanceof CommentCharacterElementBox || elementBox instanceof EditRangeStartElementBox) {
                var pageGap = 0;
                if (this.viewer instanceof PageLayoutViewer) {
                    pageGap = this.viewer.pageGap;
                }
                var style = 'display:block;position:absolute;';
                var topPosition = this.getScaledValue((top) + (page.boundingRectangle.y -
                    (pageGap * (page.index + 1)))) + (pageGap * (page.index + 1)) + 'px;';
                if (elementBox instanceof EditRangeStartElementBox && (this.documentHelper.owner.currentUser === elementBox.user || (elementBox.group === "Everyone" && elementBox.user === ""))) {
                    if (this.documentHelper.owner.documentEditorSettings.highlightEditableRanges && elementBox.columnFirst == -1) {
                        var height = elementBox.line.height - elementBox.line.margin.bottom;
                        var xLeft = left;
                        var yTop = top;
                        var highlighters = page.documentHelper.selection.editRegionHighlighters;
                        var widgetInfo = !isNullOrUndefined(highlighters) ? highlighters.get(lineWidget) : [];
                        var color = !isNullOrUndefined(widgetInfo) && !isNullOrUndefined(widgetInfo[0]) ? widgetInfo[0].color : "ffff00";
                        this.renderBookmark(this.getScaledValue(xLeft, 1), this.getScaledValue(yTop, 2), this.getScaledValue(lineWidget.height - lineWidget.margin.bottom), 0, color);
                    }
                    if (this.documentHelper.owner.enableLockAndEdit) {
                        var l10n = new L10n('documenteditor', this.documentHelper.owner.defaultLocale);
                        l10n.setLocale(this.documentHelper.owner.locale);
                        elementBox.renderLockMark(this.documentHelper.owner.currentUser, l10n);
                        var settings = this.documentHelper.owner.documentEditorSettings.collaborativeEditingSettings;
                        var color = elementBox.user === this.documentHelper.owner.currentUser ? settings.editableRegionColor : settings.lockedRegionColor;
                        style += "color:" + color + ";";
                        var leftMargin = HelperMethods.convertPointToPixel(page.bodyWidgets[0].sectionFormat.leftMargin);
                        var leftPosition = page.boundingRectangle.x + this.getScaledValue(leftMargin - 20) + 'px;';
                        if (this.viewer instanceof WebLayoutViewer) {
                            leftPosition = lineWidget.paragraph.x - 5 + 'px;';
                        }
                        style = style + 'left:' + leftPosition + 'top:' + topPosition;
                        elementBox.editRangeMark.setAttribute('style', style);
                    }
                    else {
                        if (elementBox.editRangeMark) {
                            elementBox.editRangeMark.setAttribute('style', 'display:none');
                        }
                    }
                }
                else if (elementBox instanceof CommentCharacterElementBox &&
                    elementBox.commentType === 0 && this.documentHelper.owner.selectionModule) {
                    if (this.documentHelper.owner.enableComment) {
                        var rightMargin = HelperMethods.convertPointToPixel(page.bodyWidgets[0].sectionFormat.rightMargin);
                        var pageWidth = HelperMethods.convertPointToPixel(page.bodyWidgets[0].sectionFormat.pageWidth);
                        var leftPosition = page.boundingRectangle.x + this.getScaledValue((pageWidth - rightMargin) + (rightMargin / 4)) + 'px;';
                        if (this.viewer instanceof WebLayoutViewer) {
                            leftPosition = (page.boundingRectangle.width - (this.viewer.padding.right * 2) - (this.viewer.padding.left * 2)) + 'px;';
                        }
                        style = style + 'left:' + leftPosition + 'top:' + topPosition;
                        if (commentIDList.indexOf(elementBox.commentId) === -1 && !isNullOrUndefined(elementBox.comment) && !elementBox.comment.isReply) {
                            commentIDList.push(elementBox.commentId);
                            elementBox.renderCommentMark(topPosition, leftPosition);
                            elementBox.commentMark.setAttribute('style', style);
                        }
                    }
                    else {
                        if (elementBox.commentMark) {
                            elementBox.commentMark.setAttribute('style', 'display:none');
                        }
                    }
                }
            }
            if (elementBox instanceof EditRangeEndElementBox && (this.documentHelper.owner.currentUser === elementBox.editRangeStart.user || (elementBox.editRangeStart.group === "Everyone" && elementBox.editRangeStart.user === ""))) {
                if (elementBox.editRangeStart.columnFirst == -1 && this.documentHelper.owner.documentEditorSettings.highlightEditableRanges) {
                    var height = elementBox.line.height - elementBox.line.margin.bottom;
                    var xLeft = left;
                    var yTop = top;
                    var highlighters = page.documentHelper.selection.editRegionHighlighters;
                    var widgetInfo = !isNullOrUndefined(highlighters) ? highlighters.get(lineWidget) : [];
                    var color = !isNullOrUndefined(widgetInfo) && !isNullOrUndefined(widgetInfo[0]) ? widgetInfo[0].color : "ffff00";
                    this.renderBookmark(this.getScaledValue(xLeft, 1), this.getScaledValue(yTop, 2), this.getScaledValue(lineWidget.height - lineWidget.margin.bottom), 1, color);
                }
            }
            if (elementBox instanceof BookmarkElementBox && this.documentHelper.owner.documentEditorSettings.showBookmarks && this.documentHelper.getBookmarks().indexOf(elementBox.name) !== -1) {
                var height = elementBox.line.height - elementBox.line.margin.bottom;
                var xLeft = left;
                var yTop = top;
                if (elementBox.bookmarkType == 1) {
                    if (this.isBookmarkEndAtStart(elementBox) && isNullOrUndefined(elementBox.properties)) {
                        var previousParaElement = elementBox.paragraph;
                        var prevRenderableElement = void 0;
                        var isRenderablePresent = false;
                        while (!isRenderablePresent && !isNullOrUndefined(previousParaElement)) {
                            var lineIndex = previousParaElement.childWidgets.indexOf(elementBox.line) >= 0 ? previousParaElement.childWidgets.indexOf(elementBox.line) : previousParaElement.childWidgets.length - 1;
                            for (var i_1 = lineIndex; i_1 >= 0; i_1--) {
                                var line = previousParaElement.childWidgets[i_1];
                                var elementIndex = line.children.indexOf(elementBox) >= 0 ? line.children.indexOf(elementBox) : line.children.length - 1;
                                for (var j = elementIndex; j >= 0; j--) {
                                    if (this.isRenderable(line.children[j])) {
                                        prevRenderableElement = line.children[j];
                                        isRenderablePresent = true;
                                        break;
                                    }
                                }
                                if (isRenderablePresent) {
                                    break;
                                }
                            }
                            if (!isRenderablePresent) {
                                previousParaElement = this.documentHelper.selection.getPreviousParagraphBlock(previousParaElement);
                            }
                        }
                        if (!isNullOrUndefined(prevRenderableElement)) {
                            xLeft += this.documentHelper.selection.getWidth(prevRenderableElement.line, false) + this.documentHelper.textHelper.getParagraphMarkWidth(elementBox.line.paragraph.characterFormat);
                            yTop = this.documentHelper.selection.getTop(prevRenderableElement.line);
                        }
                    }
                    if (!isNullOrUndefined(elementBox.properties)) {
                        if (elementBox.properties['isAfterParagraphMark']) {
                            xLeft += this.documentHelper.textHelper.getParagraphMarkWidth(elementBox.line.paragraph.characterFormat);
                        }
                        if (elementBox.properties['isAfterCellMark']) {
                            xLeft += this.documentHelper.textHelper.getWidth(String.fromCharCode(164), lineWidget.paragraph.characterFormat);
                        }
                    }
                }
                if (elementBox.bookmarkType == 1) {
                    if (!isNullOrUndefined(elementBox.reference)) {
                        if (isNullOrUndefined(elementBox.reference.properties)) {
                            if (!this.documentHelper.selection.isRenderBookmarkAtEnd(elementBox)) {
                                bookmarks.push({ x: xLeft, y: yTop, height: height, type: elementBox.bookmarkType });
                            }
                        }
                        else {
                            var bookmarkEndCell = elementBox.paragraph.associatedCell;
                            if (isNullOrUndefined(bookmarkEndCell)) {
                                bookmarks.push({ x: xLeft, y: yTop, height: height, type: elementBox.bookmarkType });
                            }
                        }
                    }
                }
                else {
                    if (isNullOrUndefined(elementBox.properties)) {
                        bookmarks.push({ x: xLeft, y: yTop, height: height, type: elementBox.bookmarkType });
                    }
                }
            }
            if (elementBox instanceof FieldElementBox || this.isFieldCode ||
                (elementBox.width === 0 && elementBox.height === 0)) {
                if (this.isFieldCode) {
                    elementBox.width = 0;
                }
                left += elementBox.width + elementBox.margin.left;
                this.toSkipFieldCode(elementBox);
                continue;
            }
            if (!this.isPrinting) {
                if (this.getScaledValue(top + elementBox.margin.top, 2) + elementBox.height * this.documentHelper.zoomFactor < 0 ||
                    this.getScaledValue(top + elementBox.margin.top, 2) > this.documentHelper.visibleBounds.height) {
                    left += elementBox.width + elementBox.margin.left;
                    if (elementBox instanceof TextElementBox) {
                        if (this.documentHelper.owner.isSpellCheck) {
                            elementBox.canTrigger = true;
                        }
                        elementBox.isVisible = false;
                        if (!elementBox.isSpellChecked || elementBox.line.paragraph.isChangeDetected) {
                            elementBox.ischangeDetected = true;
                        }
                    }
                    continue;
                }
            }
            if (elementBox instanceof ListTextElementBox) {
                this.renderListTextElementBox(elementBox, left, top, underlineY);
            }
            else if (elementBox instanceof ImageElementBox) {
                left += elementBox.padding.left;
                this.renderImageElementBox(elementBox, left, top, underlineY);
            }
            else if (elementBox instanceof ShapeElementBox) {
                var shapeLeft = this.getScaledValue(left, 1);
                var shapeTop = this.getScaledValue(top, 2);
                this.renderShapeElementBox(elementBox, shapeLeft, shapeTop, page);
            }
            else {
                elementBox.isVisible = true;
                left += elementBox.padding.left;
                this.renderTextElementBox(elementBox, left, top, underlineY);
            }
            left += elementBox.width + elementBox.margin.left;
            if (lineWidget.paragraph.bidi) {
                x += (elementBox.margin.left);
            }
            else {
                x = left;
            }
        }
        if (this.documentHelper.owner.documentEditorSettings.showBookmarks && bookmarks.length > 0) {
            for (var i = 0; i < bookmarks.length; i++) {
                var bookmark = bookmarks[i];
                this.renderBookmark(this.getScaledValue(bookmark.x, 1), this.getScaledValue(bookmark.y, 2), this.getScaledValue(bookmark.height), bookmark.type);
            }
        }
        if (this.documentHelper.owner.documentEditorSettings.showHiddenMarks && !this.isPrinting) {
            var text = '';
            var currentCharFormat = lineWidget.paragraph.characterFormat;
            var y = 0;
            var characterFont = this.retriveCharacterformat(currentCharFormat);
            var l10n = new L10n('documenteditor', this.documentHelper.owner.defaultLocale);
            l10n.setLocale(this.documentHelper.owner.locale);
            this.pageContext.fillStyle = HelperMethods.getColor(currentCharFormat.fontColor);
            if ((children.length == 0 && !lineWidget.isEndsWithLineBreak && !isNullOrUndefined(lineWidget.paragraph)) || (lineWidget.paragraph.childWidgets.length === 1)) {
                y = lineWidget.paragraph.y + (this.documentHelper.textHelper.getHeight(currentCharFormat)).BaselineOffset + this.documentHelper.layout.getBeforeSpacing(lineWidget.paragraph);
                //Paragraph with empty linewidgets with mutiple line breaks
                if (!lineWidget.isEndsWithLineBreak && lineWidget.indexInOwner > 0 && children.length == 0) {
                    y = top + lineWidget.previousLine.maxBaseLine;
                }
            }
            else {
                y = top + lineWidget.maxBaseLine;
            }
            if (currentCharFormat.revisions.length > 0) {
                //CharacterFormat Track changes is not supported., Hence only the Para mark changes are parsed and preserved in the charcterForamt. 
                var color = this.documentHelper.authors.get(currentCharFormat.revisions[0].author);
                this.pageContext.fillStyle = HelperMethods.getColor(color);
            }
            if (lineWidget.isEndsWithColumnBreak) {
                characterFont = this.retriveCharacterformat(currentCharFormat, 0.7);
                text = "....." + l10n.getConstant('Column Break') + ".....";
            }
            else if (lineWidget.isEndsWithPageBreak) {
                characterFont = this.retriveCharacterformat(currentCharFormat, 0.7);
                if (lineWidget.paragraph.bidi) {
                    text = String.fromCharCode(182) + '.....' + l10n.getConstant('Page Break') + '.....';
                }
                else {
                    text = '.....' + l10n.getConstant('Page Break') + '.....' + String.fromCharCode(182);
                }
                var textinfo = this.documentHelper.textHelper.getWidth(text, currentCharFormat, FontScriptType.English);
                if (this.viewer instanceof PageLayoutViewer) {
                    if (lineWidget.paragraph.bidi) {
                        if (x < (textinfo + this.viewer.clientActiveArea.x)) {
                            text = '.....';
                        }
                    }
                    else {
                        if (x > this.viewer.clientActiveArea.width) {
                            text = '.....';
                        }
                    }
                }
                else {
                    if (lineWidget.paragraph.bidi) {
                        if ((x - textinfo) < this.viewer.clientActiveArea.x) {
                            text = '.....';
                        }
                    }
                    else {
                        if ((x + textinfo) > (this.viewer.clientActiveArea.width + this.viewer.clientActiveArea.x)) {
                            text = '.....';
                        }
                    }
                }
            }
            else if (lineWidget.isEndsWithLineBreak) {
                text = lineWidget.paragraph.bidi ? String.fromCharCode(8627) : String.fromCharCode(8629);
            }
            else if (lineWidget.paragraph.isInsideTable && isNullOrUndefined(lineWidget.nextLine) && isNullOrUndefined(lineWidget.paragraph.nextWidget)) {
                if (lineWidget.height != 0) { //The nested table parent cell mark is render the out bound ,So skip cell mark is linewidget height equal to zero 
                    text = String.fromCharCode(164);
                }
            }
            else if (isNullOrUndefined(lineWidget.nextLine)) {
                text = String.fromCharCode(182);
            }
            if (lineWidget.paragraph.containerWidget instanceof BodyWidget && !isNullOrUndefined(lineWidget.paragraph.nextRenderedWidget)) {
                if (lineWidget.paragraph.containerWidget.sectionIndex !== lineWidget.paragraph.nextRenderedWidget.containerWidget.sectionIndex && lineWidget.isLastLine()) {
                    if (lineWidget.paragraph.nextRenderedWidget.containerWidget.sectionFormat.breakCode === 'NoBreak' && lineWidget.paragraph.containerWidget.index !== lineWidget.paragraph.nextRenderedWidget.containerWidget.index) {
                        text = ':::::' + l10n.getConstant('Section Break Continuous') + ':::::';
                    }
                    else {
                        text = ':::::' + l10n.getConstant('Section Break Next Page') + ':::::';
                    }
                    characterFont = this.retriveCharacterformat(currentCharFormat, 0.7);
                    if (lineWidget.isEndsWithPageBreak) {
                        if (lineWidget.paragraph.bidi) {
                            text = text + String.fromCharCode(182) + '.....' + l10n.getConstant('Page Break') + '.....';
                        }
                        else {
                            text = '.....' + l10n.getConstant('Page Break') + '.....' + String.fromCharCode(182) + text;
                        }
                    }
                    var textinfo = this.documentHelper.textHelper.getWidth(text, currentCharFormat, FontScriptType.English);
                    if (this.viewer instanceof PageLayoutViewer) {
                        if (lineWidget.paragraph.bidi) {
                            if (x < (textinfo + this.viewer.clientActiveArea.x)) {
                                text = ':::::';
                                if (lineWidget.isEndsWithPageBreak) {
                                    text = ':::::.....';
                                }
                            }
                        }
                        else {
                            if ((x + textinfo - this.viewer.clientActiveArea.x) > (this.viewer.clientActiveArea.width)) {
                                text = ':::::';
                                if (lineWidget.isEndsWithPageBreak) {
                                    text = '.....:::::';
                                }
                            }
                        }
                    }
                    else {
                        if (lineWidget.paragraph.bidi) {
                            if ((x - textinfo) < this.viewer.clientActiveArea.x) {
                                text = ':::::';
                                if (lineWidget.isEndsWithPageBreak) {
                                    text = ':::::.....';
                                }
                            }
                        }
                        else {
                            if ((x + textinfo - this.documentHelper.pages[0].boundingRectangle.x) > (this.viewer.clientActiveArea.width)) {
                                text = ':::::';
                                if (lineWidget.isEndsWithPageBreak) {
                                    text = '.....:::::';
                                }
                            }
                        }
                    }
                }
            }
            if (text.length > 0) {
                if (lineWidget.paragraph.bidi) {
                    x -= this.documentHelper.textHelper.getWidth(text, currentCharFormat, FontScriptType.English);
                }
                this.pageContext.font = characterFont;
                var scaleFactor = currentCharFormat.scaling < 100 ? 1 : currentCharFormat.scaling / 100;
                this.pageContext.letterSpacing = currentCharFormat.characterSpacing * this.documentHelper.zoomFactor + 'pt';
                this.pageContext.save();
                this.pageContext.scale(scaleFactor, 1);
                this.pageContext.fillText(text, this.getScaledValue(x, 1) / (scaleFactor), this.getScaledValue(y, 2));
                this.pageContext.restore();
            }
        }
    };
    Renderer.prototype.isBookmarkEndAtStart = function (bookmark) {
        var para = bookmark.paragraph;
        var index = 0;
        var firstLine = para.childWidgets[index];
        var isBookmarkAtStart = true;
        while (firstLine.children.indexOf(bookmark) == -1) {
            firstLine = para.childWidgets[++index];
            if (index == para.childWidgets.length) {
                break;
            }
        }
        if (bookmark.line != firstLine) {
            return false;
        }
        var bookmarkIndex = firstLine.children.indexOf(bookmark) >= 0 ? firstLine.children.indexOf(bookmark) : -1;
        for (var i = bookmarkIndex; i >= 0; i--) {
            var element = firstLine.children[i];
            if (this.isRenderable(element)) {
                isBookmarkAtStart = false;
            }
        }
        if (isBookmarkAtStart) {
            return true;
        }
        else {
            return false;
        }
    };
    Renderer.prototype.isRenderable = function (element) {
        if (!(element instanceof BookmarkElementBox || element instanceof EditRangeStartElementBox || element instanceof EditRangeEndElementBox)) {
            return true;
        }
        return false;
    };
    Renderer.prototype.combineHexColors = function (color1, color2) {
        var hex1 = color1.replace("#", "");
        var hex2 = color2.replace("#", "");
        var r1 = parseInt(hex1.substring(0, 2), 16);
        var g1 = parseInt(hex1.substring(2, 4), 16);
        var b1 = parseInt(hex1.substring(4, 6), 16);
        var r2 = parseInt(hex2.substring(0, 2), 16);
        var g2 = parseInt(hex2.substring(2, 4), 16);
        var b2 = parseInt(hex2.substring(4, 6), 16);
        var r = Math.round((r1 * 0.35) + (r2 * 0.65));
        var g = Math.round((g1 * 0.35) + (g2 * 0.65));
        var b = Math.round((b1 * 0.35) + (b2 * 0.65));
        var mixedColor = "#" + r.toString(16) + g.toString(16) + b.toString(16);
        return mixedColor;
    };
    Renderer.prototype.renderBookmark = function (x, y, height, type, restrictColor) {
        if (this.isPrinting) {
            return;
        }
        this.pageContext.beginPath();
        this.pageContext.lineWidth = 1.5;
        var extensionLength = 3;
        if (type == 0) {
            this.pageContext.moveTo(x + extensionLength, y);
            this.pageContext.lineTo(x, y);
            this.pageContext.lineTo(x, y + height);
            this.pageContext.lineTo(x + extensionLength, y + height);
        }
        if (type == 1) {
            this.pageContext.moveTo(x - extensionLength, y);
            this.pageContext.lineTo(x, y);
            this.pageContext.lineTo(x, y + height);
            this.pageContext.lineTo(x - extensionLength, y + height);
        }
        this.pageContext.strokeStyle = "#7F7F7F";
        this.pageContext.stroke();
        this.pageContext.closePath();
        if (!isNullOrUndefined(restrictColor)) {
            var combinedColor = this.combineHexColors(restrictColor, "#7F7F7F");
            this.pageContext.fillStyle = combinedColor;
            this.pageContext.fillRect(x, y, 1.5, height);
        }
    };
    Renderer.prototype.retriveCharacterformat = function (character, fontSizeFactor) {
        if (isNullOrUndefined(fontSizeFactor)) {
            fontSizeFactor = 1;
        }
        var font = '';
        this.pageContext.textBaseline = 'alphabetic';
        var bold = '';
        var italic = '';
        var fontSize = 11;
        var fontFamily = '';
        bold = character.bold ? 'bold' : '';
        italic = character.italic ? 'italic' : '';
        fontSize = character.fontSize === 0 ? 0.5 : character.fontSize / (character.baselineAlignment === 'Normal' ? 1 : 1.5);
        fontSize = fontSize * this.documentHelper.zoomFactor * fontSizeFactor;
        fontFamily = character.fontFamily;
        font = bold + ' ' + italic + ' ' + fontSize + 'pt' + ' ' + '"' + fontFamily + '"';
        return font;
    };
    Renderer.prototype.toSkipFieldCode = function (element) {
        if (element instanceof FieldElementBox) {
            if (element.fieldType === 0) {
                if ((!isNullOrUndefined(element.fieldEnd) || element.hasFieldEnd)) {
                    this.isFieldCode = true;
                }
            }
            else if (element.fieldType === 2 || element.fieldType === 1) {
                this.isFieldCode = false;
            }
        }
    };
    Renderer.prototype.getUnderlineYPosition = function (lineWidget) {
        var height = 0;
        var lineHeight = 0;
        for (var i = 0; i < lineWidget.children.length; i++) {
            if (lineWidget.children[i] instanceof FieldElementBox ||
                (lineWidget.children[i].width === 0 && lineWidget.children[i].height === 0)) {
                continue;
            }
            if (lineWidget.children[i] instanceof ShapeElementBox) {
                continue;
            }
            else {
                if (height < lineWidget.children[i].height + lineWidget.children[i].margin.top) {
                    height = lineWidget.children[i].margin.top + lineWidget.children[i].height;
                    lineHeight = (lineWidget.children[i] instanceof ImageElementBox) ? 0.9 : lineWidget.children[i].height / 20;
                }
            }
        }
        return height - 2 * lineHeight;
    };
    Renderer.prototype.renderListTextElementBox = function (elementBox, left, top, underlineY) {
        var topMargin = elementBox.margin.top;
        var leftMargin = elementBox.margin.left;
        var format = elementBox.listLevel.characterFormat;
        var breakCharacterFormat = elementBox.line.paragraph.characterFormat;
        var color = format.hasValue('fontColor') ? format.fontColor : breakCharacterFormat.fontColor;
        this.pageContext.textBaseline = 'alphabetic';
        var bold = '';
        var italic = '';
        var fontFamily = format.hasValue('fontFamily') ? format.fontFamily : breakCharacterFormat.fontFamily;
        if (this.documentHelper.isIosDevice && (elementBox.text === String.fromCharCode(9679) || elementBox.text === String.fromCharCode(9675))) {
            fontFamily = '';
        }
        var fontSize = format.hasValue('fontSize') ? format.fontSize : breakCharacterFormat.fontSize;
        var baselineAlignment = format.hasValue('baselineAlignment') ? format.baselineAlignment : breakCharacterFormat.baselineAlignment;
        bold = format.hasValue('bold') ? format.bold ? 'bold' : '' : breakCharacterFormat.bold ? 'bold' : '';
        italic = format.hasValue('italic') ? format.italic ? 'italic' : '' : breakCharacterFormat.italic ? 'italic' : '';
        fontSize = fontSize === 0 ? 0.5 : fontSize / (baselineAlignment === 'Normal' ? 1 : 1.5);
        fontSize = this.isPrinting ? fontSize : fontSize * this.documentHelper.zoomFactor;
        var strikethrough = format.hasValue('strikethrough') ? format.strikethrough : breakCharacterFormat.strikethrough;
        var highlightColor = format.hasValue('highlightColor') ? format.highlightColor : breakCharacterFormat.highlightColor;
        if (highlightColor !== 'NoColor') {
            if (highlightColor.substring(0, 1) !== '#') {
                this.pageContext.fillStyle = HelperMethods.getHighlightColorCode(highlightColor);
            }
            else {
                this.pageContext.fillStyle = HelperMethods.getColor(highlightColor);
            }
            this.pageContext.fillRect(Math.floor(this.getScaledValue(left + leftMargin, 1)), Math.floor(this.getScaledValue(top + topMargin, 2) - 1), Math.ceil(this.getScaledValue(elementBox.width) + 1), Math.ceil(this.getScaledValue(elementBox.height) + 1));
        }
        this.pageContext.font = bold + ' ' + italic + ' ' + fontSize + 'pt' + ' ' + '"' + fontFamily + '"';
        if (baselineAlignment === 'Subscript') {
            topMargin += elementBox.height - elementBox.height / 1.5;
        }
        var baselineOffset = elementBox.baselineOffset;
        topMargin = (format.baselineAlignment === 'Normal') ? topMargin + baselineOffset : (topMargin + (baselineOffset / 1.5));
        var text = elementBox.text;
        var isParaBidi = elementBox.paragraph.paragraphFormat.bidi;
        if (isParaBidi) {
            this.pageContext.direction = 'rtl';
            left += elementBox.width;
        }
        // "empty" is old value used for auto color till v19.2.49. It is maintained for backward compatibility.
        if (color === "empty" || color === '#00000000') {
            var bgColor = this.getBackgroundColorHeirachy(elementBox);
            this.pageContext.fillStyle = this.getDefaultFontColor(bgColor);
        }
        else {
            this.pageContext.fillStyle = HelperMethods.getColor(color);
        }
        var scaleFactor = format.scaling < 100 ? 1 : format.scaling / 100;
        if (this.documentHelper.owner.documentEditorSettings.showHiddenMarks && !this.isPrinting) {
            if (elementBox instanceof ListTextElementBox && elementBox.text === "\t") {
                this.tabMark(elementBox, format, left, top, leftMargin, topMargin);
            }
            this.pageContext.letterSpacing = format.characterSpacing * this.documentHelper.zoomFactor + 'pt';
            this.pageContext.save();
            this.pageContext.scale(scaleFactor, 1);
            this.pageContext.fillText(this.replaceSpace(text), this.getScaledValue(left + leftMargin, 1) / scaleFactor, this.getScaledValue(top + topMargin, 2), this.getScaledValue(elementBox.width));
            this.pageContext.restore();
        }
        else {
            this.pageContext.letterSpacing = format.characterSpacing * this.documentHelper.zoomFactor + 'pt';
            this.pageContext.save();
            this.pageContext.scale(scaleFactor, 1);
            this.pageContext.fillText(text, this.getScaledValue(left + leftMargin, 1) / scaleFactor, this.getScaledValue(top + topMargin, 2), this.getScaledValue(elementBox.width));
            this.pageContext.restore();
        }
        if (isParaBidi) {
            this.pageContext.direction = 'ltr';
            left -= elementBox.width;
        }
        if (format.underline !== 'None' && !isNullOrUndefined(format.underline)) {
            this.renderUnderline(elementBox, left, top, underlineY, color, format.underline, baselineAlignment);
        }
        if (strikethrough !== 'None') {
            this.renderStrikeThrough(elementBox, left, top, format.strikethrough, color, baselineAlignment);
        }
    };
    Renderer.prototype.getDefaultFontColor = function (backColor) {
        if (HelperMethods.isVeryDark(backColor)) {
            return "#FFFFFF";
        }
        else {
            return "#000000";
        }
    };
    Renderer.prototype.renderTextElementBox = function (elementBox, left, top, underlineY) {
        var isHeightType = false;
        var containerWidget = elementBox.line.paragraph.containerWidget;
        if (containerWidget instanceof TableCellWidget) {
            isHeightType = (containerWidget.ownerRow.rowFormat.heightType === 'Exactly');
        }
        var topMargin = elementBox.margin.top;
        var leftMargin = elementBox.margin.left;
        if (isHeightType && containerWidget instanceof TableCellWidget) {
            var width = (containerWidget.width + containerWidget.margin.left + containerWidget.margin.right) - containerWidget.leftBorderWidth;
            this.clipRect(containerWidget.x - containerWidget.margin.left, containerWidget.y, this.getScaledValue(width), this.getScaledValue(containerWidget.height));
        }
        var format = elementBox.characterFormat;
        if (format.highlightColor !== 'NoColor') {
            if (format.highlightColor.substring(0, 1) !== '#') {
                this.pageContext.fillStyle = HelperMethods.getHighlightColorCode(format.highlightColor);
            }
            else {
                this.pageContext.fillStyle = HelperMethods.getColor(format.highlightColor);
            }
            this.pageContext.fillRect(Math.floor(this.getScaledValue(left + leftMargin, 1)), Math.floor(this.getScaledValue(top + topMargin, 2) - 1), Math.ceil(this.getScaledValue(elementBox.width) + 1), Math.ceil(this.getScaledValue(elementBox.height) + 1));
        }
        var revisionInfo = this.checkRevisionType(elementBox);
        var color = revisionInfo.length > 0 ? this.getRevisionColor(revisionInfo) : format.fontColor;
        this.pageContext.textBaseline = 'alphabetic';
        var bold = '';
        var italic = '';
        var fontSize = 11;
        bold = format.bold ? 'bold' : '';
        italic = format.italic ? 'italic' : '';
        fontSize = format.fontSize === 0 ? 0.5 : format.fontSize / (format.baselineAlignment === 'Normal' ? 1 : 1.5);
        fontSize = this.isPrinting ? fontSize : fontSize * this.documentHelper.zoomFactor;
        var renderFontFamily = this.documentHelper.textHelper.getFontNameToRender(elementBox.scriptType, format);
        this.pageContext.font = bold + ' ' + italic + ' ' + fontSize + 'pt' + ' ' + '"' + renderFontFamily + '"';
        if (format.baselineAlignment === 'Subscript') {
            topMargin += elementBox.height - elementBox.height / 1.5;
        }
        var baselineOffset = elementBox.baselineOffset;
        topMargin = (format.baselineAlignment === 'Normal') ? topMargin + baselineOffset : (topMargin + (baselineOffset / 1.5));
        // "empty" is old value used for auto color till v19.2.49. It is maintained for backward compatibility.
        if (color === "empty" || color === '#00000000') {
            var bgColor = this.getBackgroundColorHeirachy(elementBox);
            this.pageContext.fillStyle = this.getDefaultFontColor(bgColor);
        }
        else {
            this.pageContext.fillStyle = HelperMethods.getColor(color);
        }
        var scaledWidth = this.getScaledValue(elementBox.width);
        var text = elementBox.text;
        if (elementBox instanceof TabElementBox) {
            var tabElement = elementBox;
            if (tabElement.tabText === '' && !isNullOrUndefined(tabElement.tabLeader) && tabElement.tabLeader !== 'None') {
                text = this.getTabLeader(elementBox);
                tabElement.tabText = text;
            }
            else if (tabElement.tabText !== '') {
                text = tabElement.tabText;
            }
        }
        //this.pageContext.direction = 'ltr';
        var isRTL = format.bidi || this.documentHelper.textHelper.isRTLText(elementBox.text);
        text = this.documentHelper.textHelper.setText(text, isRTL, format.bdo, true);
        if (format.allCaps) {
            text = text.toUpperCase();
        }
        var characterRange = elementBox.characterRange;
        if (((characterRange == CharacterRangeType.WordSplit) ||
            (((characterRange & CharacterRangeType.WordSplit) == CharacterRangeType.WordSplit) &&
                ((characterRange & CharacterRangeType.RightToLeft) == CharacterRangeType.RightToLeft))) && format.bidi) {
            text = this.inverseCharacter(text);
        }
        var scaleFactor = format.scaling < 100 ? 1 : format.scaling / 100;
        if (this.documentHelper.owner.documentEditorSettings.showHiddenMarks && !this.isPrinting) {
            if ((elementBox instanceof TabElementBox || elementBox instanceof TextElementBox) && elementBox.text === "\t") {
                this.tabMark(elementBox, format, left, top, leftMargin, topMargin);
            }
            this.pageContext.letterSpacing = format.characterSpacing * this.documentHelper.zoomFactor + 'pt';
            this.pageContext.save();
            this.pageContext.scale(scaleFactor, 1);
            this.pageContext.fillText(this.replaceSpace(text), this.getScaledValue(left + leftMargin, 1) / (scaleFactor), this.getScaledValue(top + topMargin, 2), scaledWidth);
            this.pageContext.restore();
        }
        else {
            this.pageContext.letterSpacing = format.characterSpacing * this.documentHelper.zoomFactor + 'pt';
            this.pageContext.save();
            this.pageContext.scale(scaleFactor, 1);
            this.pageContext.fillText(text, this.getScaledValue(left + leftMargin, 1) / (scaleFactor), this.getScaledValue(top + topMargin, 2), scaledWidth);
            this.pageContext.restore();
        }
        if (this.documentHelper.owner.isSpellCheck) {
            if (((this.documentHelper.owner.isSpellCheck && !this.spellChecker.removeUnderline) && (this.documentHelper.triggerSpellCheck || elementBox.canTrigger) && elementBox.text !== ' ' && !this.documentHelper.isScrollHandler && (isNullOrUndefined(elementBox.previousNode) || !(elementBox.previousNode instanceof FieldElementBox))
                && (!this.documentHelper.selection.isSelectionInsideElement(elementBox) || this.documentHelper.triggerElementsOnLoading))) {
                elementBox.canTrigger = true;
                this.leftPosition = this.pageLeft;
                this.topPosition = this.pageTop;
                var errorDetails = this.spellChecker.checktextElementHasErrors(elementBox.text, elementBox, left);
                if (errorDetails.errorFound && !this.isPrinting) {
                    color = '#FF0000';
                    var backgroundColor = (containerWidget instanceof TableCellWidget) ? containerWidget.cellFormat.shading.backgroundColor : this.documentHelper.backgroundColor;
                    for (var i = 0; i < errorDetails.elements.length; i++) {
                        var currentElement = errorDetails.elements[i];
                        if (elementBox.ignoreOnceItems.indexOf(this.spellChecker.manageSpecialCharacters(currentElement.text, undefined, true)) === -1) {
                            this.renderWavyLine(currentElement, (isNullOrUndefined(currentElement.start)) ? left : currentElement.start.location.x, (isNullOrUndefined(currentElement.start)) ? top : currentElement.start.location.y - elementBox.margin.top, underlineY, color, 'Single', format.baselineAlignment, backgroundColor);
                        }
                    }
                }
                else if (elementBox.ischangeDetected || this.documentHelper.triggerElementsOnLoading) {
                    elementBox.ischangeDetected = false;
                    this.handleChangeDetectedElements(elementBox, underlineY, left, top, format.baselineAlignment);
                }
            }
        }
        var currentInfo = this.getRevisionType(revisionInfo, true);
        if (format.underline !== 'None' && !isNullOrUndefined(format.underline) || (!isNullOrUndefined(currentInfo) && (currentInfo.type === 'Insertion' || currentInfo.type === 'MoveTo'))) {
            this.renderUnderline(elementBox, left, top, underlineY, color, format.underline, format.baselineAlignment, currentInfo);
        }
        currentInfo = this.getRevisionType(revisionInfo, false);
        if (format.strikethrough !== 'None' && !isNullOrUndefined(format.strikethrough) || (!isNullOrUndefined(currentInfo) && (currentInfo.type === 'Deletion' || currentInfo.type === 'MoveFrom'))) {
            this.renderStrikeThrough(elementBox, left, top, format.strikethrough, color, format.baselineAlignment, currentInfo);
        }
        if (isHeightType) {
            this.pageContext.restore();
        }
    };
    Renderer.prototype.tabMark = function (elementBox, format, left, top, leftMargin, topMargin) {
        var tabMarkString = elementBox.paragraph.bidi ? String.fromCharCode(8592) : String.fromCharCode(8594);
        var tabMarkWidth = this.documentHelper.textHelper.getWidth(tabMarkString, format, elementBox.scriptType);
        var availableSpaceWidth = elementBox.width / 2;
        var tabWidth = tabMarkWidth / 2;
        this.pageContext.font = this.retriveCharacterformat(elementBox.characterFormat);
        this.pageContext.letterSpacing = format.characterSpacing * this.documentHelper.zoomFactor + 'pt';
        this.pageContext.save();
        var scaleFactor = format.scaling < 100 ? 1 : format.scaling / 100;
        this.pageContext.scale(scaleFactor, 1);
        if (availableSpaceWidth > tabMarkWidth) {
            this.pageContext.fillText(tabMarkString, this.getScaledValue(((left + leftMargin + availableSpaceWidth) - (tabWidth)), 1) / scaleFactor, this.getScaledValue(top + topMargin, 2));
        }
        else {
            this.pageContext.fillText(tabMarkString, this.getScaledValue(left + leftMargin, 1) / scaleFactor, this.getScaledValue(top + topMargin, 2), this.getScaledValue(elementBox.width));
        }
        this.pageContext.restore();
    };
    Renderer.prototype.replaceSpace = function (text) {
        text = text.replace(new RegExp(String.fromCharCode(32), 'g'), String.fromCharCode(183));
        text = text.replace(new RegExp(String.fromCharCode(160), 'g'), String.fromCharCode(176));
        return text;
    };
    Renderer.prototype.inverseCharacter = function (ch) {
        switch (ch) {
            //Specify the '('
            case String.fromCharCode(40):
                //Specify the ')'
                return String.fromCharCode(41);
            //Specify the ')'
            case String.fromCharCode(41):
                //Specify the '('
                return String.fromCharCode(40);
            //Specify the '<'
            case String.fromCharCode(60):
                //Specify the '>'
                return String.fromCharCode(62);
            //Specify the '>'
            case String.fromCharCode(62):
                //Specify the '<'
                return String.fromCharCode(60);
            //Specify the '{'
            case String.fromCharCode(123):
                //Specify the '}'
                return String.fromCharCode(125);
            //Specify the '}'
            case String.fromCharCode(125):
                //Specify the '{'
                return String.fromCharCode(123);
            //Specify the '['
            case String.fromCharCode(91):
                //Specify the ']'
                return String.fromCharCode(93);
            //Specify the ']'
            case String.fromCharCode(93):
                //Specify the '['
                return String.fromCharCode(91);
            default:
                return ch;
        }
    };
    Renderer.prototype.getBackgroundColorHeirachy = function (element) {
        var bgColor;
        // "empty" is old value used for auto color till v19.2.49. It is maintained for backward compatibility.
        if (element.paragraph.isInsideTable) {
            var cell = element.paragraph.containerWidget;
            bgColor = cell.cellFormat.shading.backgroundColor;
            if (bgColor !== "empty" && bgColor !== '#00000000') {
                return bgColor;
            }
            else {
                bgColor = cell.ownerTable.tableFormat.shading.backgroundColor;
                if (bgColor !== "empty" && bgColor !== '#00000000') {
                    return bgColor;
                }
            }
        }
        else if (element.paragraph.containerWidget instanceof TextFrame
            && element.paragraph.containerWidget.containerShape.fillFormat.color === '#000000FF') {
            return element.paragraph.containerWidget.containerShape.fillFormat.color;
        }
        return this.documentHelper.backgroundColor;
    };
    Renderer.prototype.handleChangeDetectedElements = function (elementBox, underlineY, left, top, baselineAlignment) {
        var _this = this;
        var checkText = elementBox.text.trim();
        var beforeIndex = this.pageIndex;
        if (elementBox.text === '\v') {
            return;
        }
        if (!this.spellChecker.checkElementCanBeCombined(elementBox, underlineY, beforeIndex, true)) {
            /* eslint-disable @typescript-eslint/no-explicit-any */
            var splittedText = checkText.split(/[\s]+/);
            var markindex = elementBox.line.getOffset(elementBox, 0);
            var spaceValue = 1;
            if (splittedText.length > 1) {
                for (var i = 0; i < splittedText.length; i++) {
                    var currentText = splittedText[i];
                    var retrievedText = this.spellChecker.manageSpecialCharacters(currentText, undefined, true);
                    if (this.spellChecker.ignoreAllItems.indexOf(retrievedText) === -1 && elementBox.ignoreOnceItems.indexOf(retrievedText) === -1) {
                        this.handleUnorderedElements(retrievedText, elementBox, underlineY, i, markindex, i === splittedText.length - 1, beforeIndex);
                        markindex += currentText.length + spaceValue;
                    }
                }
            }
            else {
                var retrievedText = this.spellChecker.manageSpecialCharacters(checkText, undefined, true);
                if (checkText.length > 0) {
                    if (this.spellChecker.ignoreAllItems.indexOf(retrievedText) === -1 && elementBox.ignoreOnceItems.indexOf(retrievedText) === -1) {
                        var indexInLine_1 = elementBox.indexInOwner;
                        var indexinParagraph_1 = elementBox.line.paragraph.indexInOwner;
                        var spellInfo = this.spellChecker.checkSpellingInPageInfo(retrievedText);
                        if (spellInfo.isElementPresent && this.spellChecker.enableOptimizedSpellCheck) {
                            var jsonObject = JSON.parse('{\"HasSpellingError\":' + spellInfo.hasSpellError + '}');
                            this.spellChecker.handleWordByWordSpellCheck(jsonObject, elementBox, left, top, underlineY, baselineAlignment, true);
                        }
                        else {
                            if (this.spellChecker.isInUniqueWords(retrievedText)) {
                                var hasSpellingError = this.spellChecker.isErrorWord(retrievedText) ? true : false;
                                var jsonObject = JSON.parse('{\"HasSpellingError\":' + hasSpellingError + '}');
                                this.spellChecker.handleWordByWordSpellCheck(jsonObject, elementBox, left, top, underlineY, baselineAlignment, true);
                            }
                            else if (!this.documentHelper.owner.editor.triggerPageSpellCheck || this.documentHelper.triggerElementsOnLoading) {
                                /* eslint-disable @typescript-eslint/no-explicit-any */
                                this.spellChecker.callSpellChecker(this.spellChecker.languageID, checkText, true, this.spellChecker.allowSpellCheckAndSuggestion).then(function (data) {
                                    /* eslint-disable @typescript-eslint/no-explicit-any */
                                    var jsonObject = JSON.parse(data);
                                    var canUpdate = (beforeIndex === _this.pageIndex || elementBox.isVisible) && (indexInLine_1 === elementBox.indexInOwner) && (indexinParagraph_1 === elementBox.line.paragraph.indexInOwner);
                                    _this.spellChecker.handleWordByWordSpellCheck(jsonObject, elementBox, left, top, underlineY, baselineAlignment, canUpdate);
                                });
                            }
                        }
                    }
                }
            }
        }
    };
    Renderer.prototype.handleUnorderedElements = function (currentText, elementBox, underlineY, iteration, markIndex, isLastItem, beforeIndex) {
        var _this = this;
        var indexInLine = elementBox.indexInOwner;
        var indexinParagraph = elementBox.line.paragraph.indexInOwner;
        if (currentText.length > 0) {
            var spellInfo = this.spellChecker.checkSpellingInPageInfo(currentText);
            if (spellInfo.isElementPresent && this.spellChecker.enableOptimizedSpellCheck) {
                var jsonObject = JSON.parse('{\"HasSpellingError\":' + spellInfo.hasSpellError + '}');
                this.spellChecker.handleSplitWordSpellCheck(jsonObject, currentText, elementBox, true, underlineY, iteration, markIndex, isLastItem);
            }
            else {
                var canUpdate_1 = (elementBox.isVisible) && (indexInLine === elementBox.indexInOwner) && (indexinParagraph === elementBox.line.paragraph.indexInOwner);
                if (this.spellChecker.isInUniqueWords(currentText)) {
                    var hasSpellingError = this.spellChecker.isErrorWord(currentText) ? true : false;
                    var jsonObject = JSON.parse('{\"HasSpellingError\":' + hasSpellingError + '}');
                    this.spellChecker.handleSplitWordSpellCheck(jsonObject, currentText, elementBox, canUpdate_1, underlineY, iteration, markIndex, isLastItem);
                }
                else if (!this.documentHelper.owner.editor.triggerPageSpellCheck || this.documentHelper.triggerElementsOnLoading) {
                    /* eslint-disable @typescript-eslint/no-explicit-any */
                    this.spellChecker.callSpellChecker(this.spellChecker.languageID, currentText, true, this.spellChecker.allowSpellCheckAndSuggestion).then(function (data) {
                        /* eslint-disable @typescript-eslint/no-explicit-any */
                        var jsonObject = JSON.parse(data);
                        _this.spellChecker.handleSplitWordSpellCheck(jsonObject, currentText, elementBox, canUpdate_1, underlineY, iteration, markIndex, isLastItem);
                    });
                }
            }
        }
    };
    Renderer.prototype.renderWavyLine = function (elementBox, left, top, underlineY, color, underline, baselineAlignment, backgroundColor) {
        if (elementBox.text.length > 1) {
            var renderedHeight = elementBox.height / (baselineAlignment === 'Normal' ? 1 : 1.5);
            var topMargin = elementBox.margin.top;
            var underlineHeight = renderedHeight / 20;
            var frequencyRange = 0.5;
            var amplitudeRange = 1.0;
            var stepToCover = .7;
            var y = 0;
            if (baselineAlignment === 'Subscript' || elementBox instanceof ListTextElementBox) {
                y = (renderedHeight - 2 * underlineHeight) + top;
                topMargin += elementBox.height - renderedHeight;
                y += topMargin > 0 ? topMargin : 0;
            }
            else {
                y = underlineY + top;
            }
            var specialCharacter = this.spellChecker.getSpecialCharactersInfo(elementBox);
            var whiteSpaceData = this.spellChecker.getWhiteSpaceCharacterInfo(elementBox);
            var x = left + specialCharacter.beginningWidth + ((whiteSpaceData.isBeginning) ? whiteSpaceData.width : 0) + elementBox.margin.left;
            var x1 = x * this.documentHelper.zoomFactor + this.leftPosition;
            var y1 = y * this.documentHelper.zoomFactor + this.topPosition;
            var x2 = x1 + this.getScaledValue(elementBox.width - (specialCharacter.beginningWidth + specialCharacter.endWidth) - whiteSpaceData.width);
            var startingPoint = new Point(x1, y1);
            var endingPoint = new Point(x2, y1);
            this.drawWavy(startingPoint, endingPoint, (x2 - x1) * frequencyRange, amplitudeRange, stepToCover, color, elementBox.height, backgroundColor);
        }
    };
    Renderer.prototype.drawWavy = function (from, to, frequency, amplitude, step, color, height, backColor, negative) {
        this.pageContext.save();
        this.pageContext.fillStyle = (!isNullOrUndefined(backColor) ? backColor : this.documentHelper.backgroundColor);
        this.pageContext.fillRect(from.x, from.y - amplitude, (to.x - from.x), amplitude * 3);
        this.pageContext.restore();
        this.pageContext.lineWidth = 1;
        this.pageContext.lineCap = 'round';
        this.pageContext.strokeStyle = color;
        this.pageContext.beginPath();
        //this.pageContext.save();
        var cx = 0;
        var cy = 0;
        var fx = from.x;
        var fy = from.y;
        var tx = to.x;
        var ty = to.y;
        var i = 0;
        var waveOffsetLength = 0;
        var ang = Math.atan2(ty - fy, tx - fx);
        var distance = Math.sqrt((fx - tx) * (fx - tx) + (fy - ty) * (fy - ty));
        var a = amplitude * 1;
        var f = Math.PI * frequency;
        for (i; i <= distance; i += step) {
            waveOffsetLength = Math.sin((i / distance) * f) * a;
            cx = from.x + Math.cos(ang) * i + Math.cos(ang - Math.PI / 2) * waveOffsetLength;
            cy = from.y + Math.sin(ang) * i + Math.sin(ang - Math.PI / 2) * waveOffsetLength;
            i > 0 ? this.pageContext.lineTo(cx, cy) : this.pageContext.moveTo(cx, cy);
        }
        this.pageContext.stroke();
        this.pageContext.restore();
    };
    /**
     * @private
     */
    Renderer.prototype.getTabLeader = function (elementBox) {
        var textWidth = 0;
        var tabString = this.getTabLeaderString(elementBox.tabLeader);
        var tabText = tabString;
        textWidth = this.documentHelper.textHelper.getWidth(tabText, elementBox.characterFormat, elementBox.scriptType);
        var count = Math.floor(elementBox.width / textWidth);
        if (textWidth == 0) {
            count = 0;
        }
        for (var i = 0; i <= count; i++) {
            tabText += tabString;
        }
        return tabText.slice(0, -1);
    };
    Renderer.prototype.getTabLeaderString = function (tabLeader) {
        var tabString = '';
        switch (tabLeader) {
            case 'Dot':
                tabString = '.';
                break;
            case 'Hyphen':
                tabString = '-';
                break;
            case 'Underscore':
                tabString = '_';
                break;
        }
        return tabString;
    };
    Renderer.prototype.clipRect = function (xPos, yPos, width, height) {
        this.pageContext.beginPath();
        this.pageContext.save();
        this.pageContext.rect(this.getScaledValue(xPos, 1), this.getScaledValue(yPos, 2), width, height);
        this.pageContext.clip();
    };
    Renderer.prototype.getTrimmedWidth = function (elementBox) {
        var width = elementBox.width;
        if (elementBox instanceof TextElementBox && !(elementBox instanceof TabElementBox) && isNullOrUndefined(elementBox.nextNode)) {
            width = this.documentHelper.textHelper.getWidth(HelperMethods.trimEnd(elementBox.text), elementBox.characterFormat, elementBox.scriptType);
        }
        return width;
    };
    Renderer.prototype.renderUnderline = function (elementBox, left, top, underlineY, color, underline, baselineAlignment, revisionInfo) {
        var renderedHeight = elementBox.height / (baselineAlignment === 'Normal' ? 1 : 1.5);
        var topMargin = elementBox.margin.top;
        var underlineHeight = renderedHeight / 20;
        var y = 0;
        var lineHeight = renderedHeight / 20;
        if (baselineAlignment === 'Subscript' || elementBox instanceof ListTextElementBox) {
            y = (renderedHeight - 2 * underlineHeight) + top;
            topMargin += elementBox.height - renderedHeight;
            y += topMargin > 0 ? topMargin : 0;
        }
        else {
            y = underlineY + top;
        }
        var lineCount = 0;
        if (!isNullOrUndefined(revisionInfo)) {
            underline = (revisionInfo.type === 'MoveTo') ? 'Double' : 'Single';
        }
        if (underline === 'Double') {
            y -= lineHeight;
        }
        if (elementBox instanceof ImageElementBox) {
            underlineHeight = 0.9;
        }
        while (lineCount < (underline === 'Double' ? 2 : 1)) {
            lineCount++;
            var width = this.getTrimmedWidth(elementBox);
            this.pageContext.fillRect(this.getScaledValue(left + elementBox.margin.left, 1), this.getScaledValue(y, 2), this.getScaledValue(width), this.getScaledValue(underlineHeight));
            y += 2 * lineHeight;
        }
    };
    Renderer.prototype.renderStrikeThrough = function (elementBox, left, top, strikethrough, color, baselineAlignment, revisionInfo) {
        var renderedHeight = elementBox.height / (baselineAlignment === 'Normal' ? 1 : 1.5);
        var topMargin = elementBox.margin.top;
        if (baselineAlignment === 'Subscript') {
            topMargin += elementBox.height - renderedHeight;
        }
        top += topMargin > 0 ? topMargin : 0;
        var lineHeight = renderedHeight / 20;
        var y = (renderedHeight / 2) + (0.5 * lineHeight);
        var lineCount = 0;
        if (!isNullOrUndefined(revisionInfo)) {
            strikethrough = (revisionInfo.type === 'Deletion') ? 'SingleStrike' : 'DoubleStrike';
        }
        if (elementBox instanceof ImageElementBox) {
            lineHeight = 0.9;
        }
        if (strikethrough === 'DoubleStrike') {
            y -= lineHeight;
        }
        while (lineCount < (strikethrough === 'DoubleStrike' ? 2 : 1)) {
            lineCount++;
            var width = this.getTrimmedWidth(elementBox);
            this.pageContext.fillRect(this.getScaledValue(left + elementBox.margin.left, 1), this.getScaledValue(y + top, 2), this.getScaledValue(width), this.getScaledValue(lineHeight));
            y += 2 * lineHeight;
        }
    };
    Renderer.prototype.renderImageElementBox = function (elementBox, left, top, underlineY) {
        var topMargin = elementBox.margin.top;
        var leftMargin = elementBox.margin.left;
        var revisionInfo = this.checkRevisionType(elementBox);
        var color = revisionInfo.length > 0 ? this.getRevisionColor(revisionInfo) : 'black';
        this.pageContext.textBaseline = 'top';
        var widgetWidth = 0;
        var isClipped = false;
        var containerWid = elementBox.line.paragraph.containerWidget;
        var isHeightType = false;
        if (containerWid instanceof TableCellWidget) {
            isHeightType = (containerWid.ownerRow.rowFormat.heightType === 'Exactly');
        }
        if (elementBox.textWrappingStyle === 'Inline') {
            if (topMargin < 0 || elementBox.line.paragraph.width < elementBox.width) {
                // if (containerWid instanceof BodyWidget) {
                //     widgetWidth = containerWid.width + containerWid.x;
                // } else 
                if (containerWid instanceof TableCellWidget) {
                    var leftIndent = 0;
                    if (containerWid.childWidgets[0] instanceof ParagraphWidget) {
                        var paraAdv = containerWid.childWidgets[0];
                        leftIndent = paraAdv.paragraphFormat.leftIndent;
                    }
                    widgetWidth = containerWid.width + containerWid.margin.left - containerWid.leftBorderWidth - leftIndent;
                    isClipped = true;
                    this.clipRect(left + leftMargin, top + topMargin, this.getScaledValue(widgetWidth), this.getScaledValue(containerWid.height));
                }
            }
            else if (isHeightType) {
                var width = containerWid.width + containerWid.margin.left - containerWid.leftBorderWidth;
                isClipped = true;
                this.clipRect(containerWid.x, containerWid.y, this.getScaledValue(width), this.getScaledValue(containerWid.height));
            }
        }
        if (elementBox.isMetaFile && !isNullOrUndefined(elementBox.metaFileImageString)) {
            this.pageContext.drawImage(elementBox.element, this.getScaledValue(left + leftMargin, 1), this.getScaledValue(top + topMargin, 2), this.getScaledValue(elementBox.width), this.getScaledValue(elementBox.height));
        }
        else {
            try {
                if (!elementBox.isCrop) {
                    this.pageContext.drawImage(elementBox.element, this.getScaledValue(left + leftMargin, 1), //dx
                    this.getScaledValue(top + topMargin, 2), //dy
                    this.getScaledValue(elementBox.width), //dw
                    this.getScaledValue(elementBox.height)); //dh
                }
                else {
                    this.pageContext.drawImage(elementBox.element, elementBox.cropX, //sx
                    elementBox.cropY, //sy
                    elementBox.cropWidth, //sw
                    elementBox.cropHeight, //sh
                    this.getScaledValue(left + leftMargin, 1), //dx
                    this.getScaledValue(top + topMargin, 2), //dy
                    this.getScaledValue(elementBox.width), //dw
                    this.getScaledValue(elementBox.height)); //dh
                }
            }
            catch (e) {
                elementBox.imageString = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAgVBMVEX///8AAADgAADY2Njl5eVcXFxjY2NZWVl/f3+wsLCmpqb4+PiioqKpqam7u7vV1dX2uLj2wsLhFRXzpKT3vb30sbHhCwv74+P40dH+9vbkIyO2trbBwcHLy8tsbGycnJz529v4zMzrbGzlLS3qZmblNzfrdXXoRkbvi4vvgYHlHh7CZsBOAAADpUlEQVR4nO3da1faQBSF4ekAUQlUEFs14AXxVv7/D6yaQiZx5mSEYXF2ut+PNKzyyK5diYDmR9czx34AB49C/CjE759w3jvvWr15Tdgz3atXE54f++EcIArxoxA/CvGjED8K8aMQPwrxoxA/CvGLEeZ9jPJdhfk4GyCUjb3ECGE/Q6m/q3DwfudjP0ERZYN9hKdn2hvd3+0jHJz5/kBVuTk96bbQUEjhYR9ckiikUH8UUqg/CinUH4UU6o9CCvVHIYX6o5BC/VFIof4opFB/FFKoPwop1B+FFOqPQgrjyxfjVC38Lxk9tnAxGqZqdKtSOE4GHA5/fuNJpDCtcNHbv4VqYYqPLjgfUViPQgrjozA2CptRSGF8/59w+Wrt+rr1btNna1cPzg0wwuXavncxabnX7PfHYYXzlYARvlobQZyUR9mXm+1NMEK7SSLONgcVV9vb8IQXv4J3KSeKKlxXxNCzONkeYp8AV3p9UT1+P3FWHVAsq5thhGZSEb1DrSZq7dS5HUdoLiuBZ6jORG3tCwAkNJfCUJ2Jrqe1P0ESCkMNTdSACYNDDU7UoAkDQw1P1MAJvUMVJmrwhJ6hShM1gMIvQxUnahCFjaHKEzWQQneoxR95ogZTWBuqPFEDKnSHKk/UoArdoYoTNbDC5lBDEzW4QjMpYiZqgIXG/S76JhwHK5zVVipcnkIVuv/RW/HyFKhwYhuFr6NiCmdNoDBUSGFjovJQEYXuRN9ahwoorJ8uSZenPsMTNk+X2q6jwgm/ntHL11HhhL4zenmoYEL/Gb04VCxh6KKTNFQoYfiikzBUJKF00Sk8VCChfF00OFQcYdt10dBQYYRT5xn0n9G7Q0X8GfCzNNEyZ6iPgD/HlydaVg11DfhajJaJlm2HugIUrlomWrYZKuJKHz6vHhbSM/hROdRnxNe1meuXYvW0DB6+aflYrB7dlzDiCM3N1dVN6GDhMCDhjlHYjEIK46MwNgqbUUhhfJ/vA07wO8N1vw94ONo/3e/lTpVOYfc/UyG//ZmqW52fi/FuTNW3/lZ+eguF+qOQQv1RSKH+KKRQfxRSqD8KKdQfhRTqj0IK9UchhfqjkEL9UUih/iikUH8UUqg/CmXh6Hsv3jlK+wnvD/vgkrSHMMuyu1P9ZdmuwnycDQYn+svG3n9KEUKT9zHyf6+IEWJHIX4U4kchfhTiRyF+FOJHIX4U4kchfnVhijeZa6sunCf4ZdPamteEHY5C/CjEr/vCv0ec0g+AtS1QAAAAAElFTkSuQmCC';
                this.documentHelper.addBase64StringInCollection(elementBox);
                elementBox.element.src = this.documentHelper.getImageString(elementBox);
                this.pageContext.drawImage(elementBox.element, this.getScaledValue(left + leftMargin, 1), this.getScaledValue(top + topMargin, 2), this.getScaledValue(elementBox.width), this.getScaledValue(elementBox.height));
            }
        }
        this.pageContext.fillStyle = HelperMethods.getColor(color);
        var currentRevision = this.getRevisionType(revisionInfo, false);
        if (!isNullOrUndefined(currentRevision) && (currentRevision.type === 'Deletion' || currentRevision.type === 'MoveFrom')) {
            this.renderStrikeThrough(elementBox, left, top, 'SingleStrike', color, 'Normal', currentRevision);
        }
        currentRevision = this.getRevisionType(revisionInfo, true);
        if (!isNullOrUndefined(currentRevision) && (currentRevision.type === 'Insertion' || currentRevision.type === 'MoveTo')) {
            var y = this.getUnderlineYPosition(elementBox.line);
            this.renderUnderline(elementBox, left, top, y, color, 'Single', 'Normal');
        }
        if (isClipped) {
            this.pageContext.restore();
        }
    };
    Renderer.prototype.renderTableOutline = function (tableWidget) {
        var layout = new Layout(this.documentHelper);
        var table = tableWidget;
        tableWidget.width = this.documentHelper.layout.getTableWidth(table);
        var border = !table.isBidiTable ? layout.getTableLeftBorder(table.tableFormat.borders)
            : layout.getTableRightBorder(table.tableFormat.borders);
        var lineWidth = 0;
        //ToDo: Need to draw the borders based on the line style.
        // if (!isNullOrUndefined(border )) {
        lineWidth = HelperMethods.convertPointToPixel(border.getLineWidth());
        this.renderSingleBorder(border.color, tableWidget.x - tableWidget.margin.left - lineWidth / 2, tableWidget.y, tableWidget.x - tableWidget.margin.left - lineWidth / 2, tableWidget.y + tableWidget.height, lineWidth, border.lineStyle);
        // }
        border = layout.getTableTopBorder(table.tableFormat.borders);
        lineWidth = 0;
        // if (!isNullOrUndefined(border )) {
        lineWidth = HelperMethods.convertPointToPixel(border.getLineWidth());
        this.renderSingleBorder(border.color, tableWidget.x - tableWidget.margin.left - lineWidth, tableWidget.y - lineWidth / 2, tableWidget.x + tableWidget.width + lineWidth + tableWidget.margin.right, tableWidget.y - lineWidth / 2, lineWidth, border.lineStyle);
        // }
        border = !table.isBidiTable ? layout.getTableRightBorder(table.tableFormat.borders)
            : layout.getTableLeftBorder(table.tableFormat.borders);
        lineWidth = 0;
        // if (!isNullOrUndefined(border )) {
        lineWidth = HelperMethods.convertPointToPixel(border.getLineWidth());
        this.renderSingleBorder(border.color, tableWidget.x + tableWidget.width + tableWidget.margin.right + lineWidth / 2, tableWidget.y, tableWidget.x + tableWidget.width + tableWidget.margin.right + lineWidth / 2, tableWidget.y + tableWidget.height, lineWidth, border.lineStyle);
        // }
        border = layout.getTableBottomBorder(table.tableFormat.borders);
        lineWidth = 0;
        // if (!isNullOrUndefined(border )) {
        lineWidth = HelperMethods.convertPointToPixel(border.getLineWidth());
        this.renderSingleBorder(border.color, tableWidget.x - tableWidget.margin.left - lineWidth, tableWidget.y + tableWidget.height - lineWidth / 2, tableWidget.x + tableWidget.width + lineWidth + tableWidget.margin.right, tableWidget.y + tableWidget.height - lineWidth / 2, lineWidth, border.lineStyle);
        // }
    };
    /* eslint-disable  */
    Renderer.prototype.renderTableCellOutline = function (documentHelper, cellWidget) {
        var layout = documentHelper.layout;
        var borders = undefined;
        var tableCell = cellWidget;
        var cellTopMargin = 0;
        var cellBottomMargin = 0;
        var cellLeftMargin = 0;
        var cellRightMargin = 0;
        var height = 0;
        var isBidiTable = cellWidget.ownerTable.isBidiTable;
        borders = tableCell.cellFormat.borders;
        if (cellWidget.containerWidget instanceof TableRowWidget) {
            cellBottomMargin = cellWidget.margin.bottom - cellWidget.containerWidget.bottomBorderWidth;
            cellTopMargin = cellWidget.margin.top - cellWidget.containerWidget.topBorderWidth;
        }
        cellLeftMargin = cellWidget.margin.left - cellWidget.leftBorderWidth;
        cellRightMargin = cellWidget.margin.right - cellWidget.rightBorderWidth;
        if (!isNullOrUndefined(tableCell.ownerRow) && tableCell.ownerRow.rowFormat.heightType === 'Exactly') {
            height = HelperMethods.convertPointToPixel(tableCell.ownerRow.rowFormat.height) + cellTopMargin + cellBottomMargin;
        }
        else {
            if (!isNullOrUndefined(tableCell.ownerRow) && [tableCell.ownerRow].length <= 1) {
                height = Math.max(HelperMethods.convertPointToPixel(tableCell.ownerRow.rowFormat.height), cellWidget.height) + cellTopMargin + cellBottomMargin;
            }
            else {
                height = cellWidget.height + cellTopMargin + cellBottomMargin;
            }
        }
        var border = !isBidiTable ? TableCellWidget.getCellLeftBorder(tableCell) : TableCellWidget.getCellRightBorder(tableCell);
        var lineWidth = 0;
        // if (!isNullOrUndefined(border )) {
        lineWidth = HelperMethods.convertPointToPixel(border.getLineWidth()); //Renders the cell left border.
        this.renderCellBackground(height, cellWidget, cellLeftMargin, lineWidth);
        var leftBorderWidth = lineWidth;
        if (tableCell.index === 0 || tableCell.cellFormat.rowSpan === 1 || (tableCell.cellFormat.rowSpan > 1 && tableCell.columnIndex === 0)) {
            this.renderSingleBorder(border.color, cellWidget.x - cellLeftMargin - lineWidth, cellWidget.y - cellWidget.margin.top, cellWidget.x - cellLeftMargin - lineWidth, cellWidget.y + cellWidget.height + cellBottomMargin, lineWidth, border.lineStyle);
        }
        else {
            for (var i = 0; i < tableCell.ownerTable.childWidgets.length; i++) {
                var row = tableCell.ownerTable.childWidgets[i];
                var cell = void 0;
                for (var j = 0; j < row.childWidgets.length; j++) {
                    var currentCell = row.childWidgets[j];
                    if ((currentCell.columnIndex + currentCell.cellFormat.columnSpan - 1) === tableCell.columnIndex - 1) {
                        cell = currentCell;
                        break;
                    }
                    else if (row.childWidgets[j].columnIndex >= tableCell.columnIndex && row.childWidgets[j].previousWidget) {
                        cell = row.childWidgets[j].previousWidget;
                        break;
                    }
                }
                if (cell && cell.columnIndex + cell.cellFormat.columnSpan - 1 === tableCell.columnIndex - 1) {
                    var border_1 = !isBidiTable ? TableCellWidget.getCellRightBorder(cell) : TableCellWidget.getCellLeftBorder(cell);
                    var lineWidthInt = HelperMethods.convertPointToPixel(border_1.getLineWidth());
                    cellLeftMargin = cell.margin.left - lineWidthInt;
                    if (cell.y + cell.height < tableCell.y) {
                        continue;
                    }
                    else if (cell.y < tableCell.y && cell.y + cell.height > tableCell.y) {
                        this.renderSingleBorder(border_1.color, tableCell.x - cellLeftMargin - lineWidthInt, tableCell.y - cellTopMargin, tableCell.x - cellLeftMargin - lineWidthInt, cell.y + cell.height + cell.margin.bottom, lineWidthInt, border_1.lineStyle);
                    }
                    else if ((cell.y === tableCell.y) || (cell.y > tableCell.y && cell.y + cell.height < tableCell.y + tableCell.height)) {
                        this.renderSingleBorder(border_1.color, tableCell.x - cellLeftMargin - lineWidthInt, cell.y - cell.margin.top, tableCell.x - cellLeftMargin - lineWidthInt, cell.y + cell.height + cell.margin.bottom, lineWidthInt, border_1.lineStyle);
                    }
                    else if (cell.y < tableCell.y + tableCell.height && cell.y + cell.height >= tableCell.y + tableCell.height) {
                        this.renderSingleBorder(border_1.color, tableCell.x - cellLeftMargin - lineWidthInt, cell.y - cell.margin.top, tableCell.x - cellLeftMargin - lineWidthInt, cell.y + cell.height + cellBottomMargin, lineWidthInt, border_1.lineStyle);
                    }
                    else if (cell.y > tableCell.y + tableCell.height) {
                        break;
                    }
                }
            }
        }
        // }
        if (tableCell.updatedTopBorders && tableCell.updatedTopBorders.length > 1) {
            var cellX = cellWidget.x - cellWidget.margin.left - leftBorderWidth / 2;
            var cellY = cellWidget.y - cellWidget.margin.top;
            for (var a = 0; a < tableCell.updatedTopBorders.length; a++) {
                var borderInfo = tableCell.updatedTopBorders[a];
                border = borderInfo.border;
                if (border.lineStyle !== 'None' && border.lineWidth < TableCellWidget.getCellTopBorder(tableCell).lineWidth) {
                    border.lineWidth = TableCellWidget.getCellTopBorder(tableCell).lineWidth;
                }
                if (!isNullOrUndefined(border)) {
                    lineWidth = HelperMethods.convertPointToPixel(border.getLineWidth());
                    this.renderSingleBorder(border.color, cellX, cellY + lineWidth / 2, cellX + borderInfo.width, cellY + lineWidth / 2, lineWidth, border.lineStyle);
                    cellX = cellX + borderInfo.width;
                }
            }
        }
        else {
            border = TableCellWidget.getCellTopBorder(tableCell);
            // if (!isNullOrUndefined(border )) { //Renders the cell top border.        
            lineWidth = HelperMethods.convertPointToPixel(border.getLineWidth());
            var width = 0;
            this.renderSingleBorder(border.color, cellWidget.x - cellWidget.margin.left - leftBorderWidth / 2, cellWidget.y - cellWidget.margin.top + lineWidth / 2, cellWidget.x + cellWidget.width + cellWidget.margin.right + width, cellWidget.y - cellWidget.margin.top + lineWidth / 2, lineWidth, border.lineStyle);
            // }
        }
        var isLastCell = false;
        if (!isBidiTable) {
            isLastCell = tableCell.cellIndex === tableCell.ownerRow.childWidgets.length - 1;
        }
        else {
            isLastCell = tableCell.columnIndex === 0;
        }
        var prevRowSpannedCells = tableCell.containerWidget.getPreviousRowSpannedCells();
        var isAffectedByRowSpan = false;
        for (var k = 0; k < prevRowSpannedCells.length; k++) {
            var spannedCell = prevRowSpannedCells[k];
            if (tableCell.rowIndex < spannedCell.rowIndex + spannedCell.cellFormat.rowSpan && tableCell.columnIndex < spannedCell.columnIndex) {
                isAffectedByRowSpan = true;
                break;
            }
        }
        if ((tableCell.ownerTable.tableFormat.cellSpacing > 0 || isLastCell) && (isBidiTable || tableCell.columnIndex + tableCell.cellFormat.columnSpan === tableCell.ownerTable.tableHolder.columns.length || !isAffectedByRowSpan)) {
            border = isBidiTable ? TableCellWidget.getCellLeftBorder(tableCell) : TableCellWidget.getCellRightBorder(tableCell);
            // if (!isNullOrUndefined(border )) { //Renders the cell right border.           
            lineWidth = HelperMethods.convertPointToPixel(border.getLineWidth());
            this.renderSingleBorder(border.color, cellWidget.x + cellWidget.width + cellWidget.margin.right - lineWidth / 2, cellWidget.y - cellWidget.margin.top, cellWidget.x + cellWidget.width + cellWidget.margin.right - lineWidth / 2, cellWidget.y + cellWidget.height + cellBottomMargin, lineWidth, border.lineStyle);
            // }
        }
        var nextRow = tableCell.ownerRow.nextWidget;
        //Specifies the next row is within the current table widget.
        //True means current row is not rendered at page end; Otherwise False.
        var nextRowIsInCurrentTableWidget = false;
        var previousCellIndex = undefined;
        if (!isNullOrUndefined(nextRow)) {
            if (nextRow.lastChild) {
                var lastCellWidget = nextRow.lastChild;
                previousCellIndex = lastCellWidget.columnIndex + lastCellWidget.cellFormat.columnSpan;
            }
            var nextRowWidget = undefined;
            // if (viewer.renderedElements.containsKey(nextRow) && viewer.renderedElements.get(nextRow).length > 0) {
            nextRowWidget = nextRow;
            // }
            if (nextRowWidget instanceof TableRowWidget) {
                if (cellWidget.containerWidget instanceof TableRowWidget && cellWidget.containerWidget.containerWidget instanceof TableWidget) {
                    nextRowIsInCurrentTableWidget = cellWidget.containerWidget.containerWidget.childWidgets.indexOf(nextRowWidget) !== -1;
                }
            }
        }
        if (tableCell.ownerTable.tableFormat.cellSpacing > 0 || tableCell.ownerRow.rowIndex === tableCell.ownerTable.childWidgets.length - 1
            || (tableCell.cellFormat.rowSpan > 1
                && tableCell.ownerRow.rowIndex + tableCell.cellFormat.rowSpan >= tableCell.ownerTable.childWidgets.length) ||
            !nextRowIsInCurrentTableWidget || previousCellIndex && nextRow.childWidgets.length < tableCell.ownerRow.childWidgets.length
            && previousCellIndex < tableCell.columnIndex + tableCell.cellFormat.columnSpan) {
            var bottomBorder = tableCell.cellFormat.borders.bottom;
            if (!isNullOrUndefined(bottomBorder) && bottomBorder.lineStyle === 'Cleared') {
                border = TableCellWidget.getCellBottomBorder(tableCell);
            }
            else {
                border = (tableCell.cellFormat.rowSpan > 1 && tableCell.ownerRow.rowIndex + tableCell.cellFormat.rowSpan === tableCell.ownerTable.childWidgets.length) ?
                    //true part for vertically merged cells specifically.
                    tableCell.getBorderBasedOnPriority(tableCell.getBorderBasedOnPriority(tableCell.cellFormat.borders.bottom, tableCell.ownerRow.rowFormat.borders.bottom), tableCell.ownerTable.tableFormat.borders.bottom)
                    //false part for remaining cases that has been handled inside method. 
                    : TableCellWidget.getCellBottomBorder(tableCell);
            }
            // if (!isNullOrUndefined(border )) {
            //Renders the cell bottom border.
            lineWidth = HelperMethods.convertPointToPixel(border.getLineWidth());
            this.renderSingleBorder(border.color, cellWidget.x - cellWidget.margin.left - leftBorderWidth / 2, cellWidget.y + cellWidget.height + cellBottomMargin + lineWidth / 2, cellWidget.x + cellWidget.width + cellWidget.margin.right, cellWidget.y + cellWidget.height + cellBottomMargin + lineWidth / 2, lineWidth, border.lineStyle);
            // }
        }
        border = layout.getCellDiagonalUpBorder(tableCell);
        // if (!isNullOrUndefined(border )) {
        //Renders the cell diagonal up border.
        lineWidth = HelperMethods.convertPointToPixel(border.getLineWidth());
        if (lineWidth > 0) {
            this.renderSingleBorder(border.color, cellWidget.x - cellLeftMargin, cellWidget.y + cellWidget.height + cellBottomMargin, cellWidget.x + cellWidget.width + cellRightMargin, cellWidget.y - cellTopMargin, lineWidth, border.lineStyle);
            // }
        }
        border = layout.getCellDiagonalDownBorder(tableCell);
        // if (!isNullOrUndefined(border )) {
        //Renders the cell diagonal down border.
        lineWidth = HelperMethods.convertPointToPixel(border.getLineWidth());
        if (lineWidth > 0) {
            this.renderSingleBorder(border.color, cellWidget.x - cellLeftMargin, cellWidget.y - cellTopMargin, cellWidget.x + cellWidget.width + cellRightMargin, cellWidget.y + cellWidget.height + cellBottomMargin, lineWidth, border.lineStyle);
        }
        // }
    };
    Renderer.prototype.renderCellBackground = function (height, cellWidget, leftMargin, lineWidth) {
        var cellFormat = cellWidget.cellFormat;
        var bgColor = cellFormat.shading.backgroundColor === '#ffffff' ?
            cellWidget.ownerTable.tableFormat.shading.backgroundColor : cellFormat.shading.backgroundColor;
        var left = cellWidget.x - leftMargin - lineWidth;
        var topMargin = (cellWidget.margin.top - cellWidget.containerWidget.topBorderWidth);
        var top = cellWidget.y - topMargin;
        var width = cellWidget.width + leftMargin + cellWidget.margin.right + lineWidth / 2;
        if (cellWidget.ownerRow.rowFormat.revisions.length > 0) {
            var revision = cellWidget.ownerRow.rowFormat.revisions[cellWidget.ownerRow.rowFormat.revisions.length - 1];
            bgColor = (revision.revisionType === 'Insertion') ? '#e1f2fa' : '#fce6f4';
        }
        this.pageContext.beginPath();
        if (bgColor !== 'empty') {
            this.pageContext.fillStyle = HelperMethods.getColor(bgColor);
            this.pageContext.fillRect(this.getScaledValue(left, 1), this.getScaledValue(top, 2), this.getScaledValue(width), this.getScaledValue(height));
            this.pageContext.closePath();
        }
        //Render foreground color
        if (cellFormat.shading.hasValue('foregroundColor') && cellFormat.shading.textureStyle !== 'TextureNone') {
            this.pageContext.beginPath();
            this.pageContext.fillStyle = this.drawTextureStyle(cellFormat.shading.textureStyle, HelperMethods.getColor(cellFormat.shading.foregroundColor), HelperMethods.getColor(cellFormat.shading.backgroundColor), cellFormat.shading.foregroundColor === 'empty', cellFormat.shading.backgroundColor === 'empty');
            this.pageContext.fillRect(this.getScaledValue(left, 1), this.getScaledValue(top, 2), this.getScaledValue(width), this.getScaledValue(height));
            this.pageContext.closePath();
        }
    };
    Renderer.prototype.drawTextureStyle = function (textureStyle, foreColor, backColor, isForeColorEmpty, isBackColorEmpty) {
        if (isBackColorEmpty) {
            backColor = '#ffffff';
        }
        if (isForeColorEmpty) {
            foreColor = '#000000';
        }
        if (textureStyle.indexOf('Percent') > -1) {
            var text = textureStyle.replace("Texture", "").replace("Percent", "").replace("Pt", ".");
            var percent = parseInt(text);
            return this.getForeColor(foreColor, backColor, percent, isForeColorEmpty, isBackColorEmpty);
        }
        if (textureStyle === 'TextureSolid') {
            return foreColor;
        }
        return '#FFFFFF';
    };
    Renderer.prototype.getForeColor = function (foreColor, backColor, percent, isForeColorEmpty, isBackColorEmpty) {
        var r = 0;
        var g = 0;
        var b = 0;
        var foreColorRgb = HelperMethods.convertHexToRgb(foreColor);
        var backColorRgb = HelperMethods.convertHexToRgb(backColor);
        r = this.getColorValue(foreColorRgb.r, backColorRgb.r, percent, isForeColorEmpty, isBackColorEmpty);
        g = this.getColorValue(foreColorRgb.g, backColorRgb.g, percent, isForeColorEmpty, isBackColorEmpty);
        b = this.getColorValue(foreColorRgb.b, backColorRgb.b, percent, isForeColorEmpty, isBackColorEmpty);
        return ('#' + HelperMethods.convertRgbToHex(r) + HelperMethods.convertRgbToHex(g) + HelperMethods.convertRgbToHex(b));
    };
    Renderer.prototype.getColorValue = function (foreColorValue, backColorValue, percent, isForeColorEmpty, isBackColorEmpty) {
        var colorValue = 0;
        if (percent == 100) {
            colorValue = foreColorValue;
        }
        else {
            if (isForeColorEmpty) {
                if (isBackColorEmpty) {
                    colorValue = Math.round(255 * (1 - percent / 100));
                }
                else {
                    colorValue = Math.round(backColorValue * (1 - percent / 100));
                }
            }
            else {
                if (isBackColorEmpty) {
                    colorValue = Math.round(foreColorValue * (percent / 100));
                }
                else {
                    colorValue = backColorValue + Math.round(foreColorValue * (percent / 100)) - Math.round(backColorValue * (percent / 100));
                }
            }
        }
        return colorValue;
    };
    Renderer.prototype.renderSingleBorder = function (color, startX, startY, endX, endY, lineWidth, lineStyle) {
        this.pageContext.beginPath();
        this.pageContext.moveTo(this.getScaledValue(startX, 1), this.getScaledValue(startY, 2));
        this.pageContext.lineTo(this.getScaledValue(endX, 1), this.getScaledValue(endY, 2));
        this.pageContext.lineWidth = this.getScaledValue(lineWidth);
        // set line color
        this.pageContext.strokeStyle = HelperMethods.getColor(color);
        if (lineStyle !== "None" && lineStyle !== "Cleared") {
            this.pageContext.stroke();
        }
        this.pageContext.closePath();
    };
    Renderer.prototype.getScaledValue = function (value, type) {
        if (this.isPrinting) {
            return value;
        }
        if (isNullOrUndefined(type)) {
            type = 0;
        }
        var x = value * this.documentHelper.zoomFactor;
        return x + (type === 1 ? this.pageLeft : (type === 2 ? this.pageTop : 0));
    };
    Renderer.prototype.checkRevisionType = function (elementBox) {
        var revisions = [];
        var count = elementBox.revisions.length;
        for (var i = 0; i < count; i++) {
            var currentRevision = elementBox.revisions[i];
            var color = this.documentHelper.authors.get(currentRevision.author);
            revisions.push({ 'type': currentRevision.revisionType, 'color': color });
        }
        return revisions;
    };
    Renderer.prototype.getRevisionColor = function (revisionInfo) {
        if (revisionInfo.length === 1) {
            return revisionInfo[0].color;
        }
        for (var i = 0; i < revisionInfo.length; i++) {
            if (revisionInfo[i].type === 'Deletion' || revisionInfo[i].type === 'MoveFrom') {
                return revisionInfo[i].color;
            }
        }
        if (revisionInfo.length > 0) {
            return revisionInfo[0].color;
        }
        return undefined;
    };
    Renderer.prototype.getRevisionType = function (revisionInfo, checkInsert) {
        if (revisionInfo.length === 0) {
            return undefined;
        }
        for (var i = 0; i < revisionInfo.length; i++) {
            var type = undefined;
            if (checkInsert && (revisionInfo[i].type === 'Insertion' || revisionInfo[i].type === 'MoveTo')) {
                type = revisionInfo[i];
                this.pageContext.fillStyle = HelperMethods.getColor(type.color);
                revisionInfo.splice(i, 1);
                return type;
            }
            if (!checkInsert && (revisionInfo[i].type === 'Deletion' || revisionInfo[i].type === 'MoveFrom')) {
                type = revisionInfo[i];
                this.pageContext.fillStyle = HelperMethods.getColor(type.color);
                revisionInfo.splice(i, 1);
                return type;
            }
        }
        return undefined;
    };
    Renderer.prototype.getFormfieldInLine = function (line) {
        for (var i = 0; i < line.children.length; i++) {
            if (line.children[i] instanceof FieldElementBox && !isNullOrUndefined(line.children[i].formFieldData)) {
                return line.children[i];
            }
        }
        return undefined;
    };
    /**
     * Destroys the internal objects which is maintained.
     *
     * @returns {void}
     */
    Renderer.prototype.destroy = function () {
        this.documentHelper = undefined;
        if (!isNullOrUndefined(this.pageCanvasIn)) {
            this.pageCanvasIn.innerHTML = '';
        }
        this.pageCanvasIn = undefined;
    };
    return Renderer;
}());
export { Renderer };
