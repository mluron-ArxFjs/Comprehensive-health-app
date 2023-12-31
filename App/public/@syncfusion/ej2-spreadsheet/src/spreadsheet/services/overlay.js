import { getCellPosition, refreshImgCellObj, refreshChartCellObj, insertDesignChart, addDPRValue } from '../common/index';
import { getRowIdxFromClientY, getColIdxFromClientX, overlayEleSize } from '../common/index';
import { getRangeIndexes, refreshChartSize, focusChartBorder, getRowsHeight, getCellIndexes } from '../../workbook/index';
import { getColumnsWidth } from '../../workbook/index';
import { EventHandler, removeClass, closest, isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * Specifes to create or modify overlay.
 *
 * @hidden
 */
var Overlay = /** @class */ (function () {
    /**
     * Constructor for initializing Overlay service.
     *
     *  @param {Spreadsheet} parent - Specifies the Spreadsheet instance.
     */
    function Overlay(parent) {
        this.minHeight = '300px';
        this.minWidth = '400px';
        this.isOverlayClicked = false;
        this.isResizerClicked = false;
        this.currentWidth = 400;
        this.currenHeight = 300;
        this.parent = parent;
    }
    /**
     * To insert a shape.
     *
     * @param {string} id - Specifies the id.
     * @param {string} range - Specifies the range.
     * @param {number} sheetIndex - Specifies the sheet index.
     * @returns {HTMLElement} - Returns div element
     * @hidden
     */
    Overlay.prototype.insertOverlayElement = function (id, range, sheetIndex) {
        var div = this.parent.createElement('div', {
            id: id,
            attrs: { 'class': 'e-ss-overlay e-ss-overlay-active' },
            styles: 'width: ' + this.minWidth + ';  height: ' + this.minHeight
        });
        var indexes = getRangeIndexes(range);
        var sheet = this.parent.sheets[sheetIndex];
        var frozenRow = this.parent.frozenRowCount(sheet);
        var frozenCol = this.parent.frozenColCount(sheet);
        var pos = getCellPosition(sheet, indexes, frozenRow, frozenCol, this.parent.viewport.beforeFreezeHeight, this.parent.viewport.beforeFreezeWidth, this.parent.sheetModule.colGroupWidth, true);
        if (indexes[0] >= frozenRow && indexes[1] < frozenCol) {
            var mainPanel = this.parent.sheetModule.contentPanel;
            if (mainPanel.scrollTop) {
                pos.top -= mainPanel.scrollTop;
                pos.top +=
                    this.parent.getColumnHeaderContent().parentElement.getBoundingClientRect().height;
            }
        }
        if (indexes[1] >= frozenCol && indexes[0] < frozenRow) {
            var scrollPanel = this.parent.getScrollElement();
            if (scrollPanel.scrollLeft) {
                pos.left -= scrollPanel.scrollLeft;
                pos.left += this.parent.sheetModule.getRowHeaderWidth(sheet);
            }
        }
        var parent;
        if (indexes[0] < frozenRow || indexes[1] < frozenCol) {
            parent = this.parent.element.querySelector('#' + this.parent.element.id + '_sheet');
            if (frozenRow) {
                if (indexes[0] >= frozenRow) {
                    pos.top += (sheet.showHeaders ? 31 : 0) + getRowsHeight(sheet, getCellIndexes(sheet.topLeftCell)[0], frozenRow - 1);
                }
                else if (!frozenCol) {
                    pos.left += this.parent.sheetModule.getRowHeaderWidth(sheet, true);
                }
            }
            if (frozenCol) {
                if (indexes[1] >= frozenCol) {
                    pos.left += this.parent.sheetModule.getRowHeaderWidth(sheet);
                }
                else if (!frozenRow) {
                    pos.left += (sheet.showHeaders ? 31 : 0);
                }
            }
        }
        else {
            parent = this.parent.getMainContent();
        }
        div.style.top = Number(addDPRValue(pos.top).toFixed(2)) + 'px';
        div.style.left = Number(addDPRValue(pos.left).toFixed(2)) + 'px';
        if (sheetIndex === this.parent.activeSheetIndex) {
            parent.appendChild(div);
            this.renderResizeHandles(div);
            this.addEventListener(div);
        }
        this.originalWidth = parseFloat(getComputedStyle(div, null).getPropertyValue('width').replace('px', ''));
        this.originalHeight = parseFloat(getComputedStyle(div, null).getPropertyValue('height').replace('px', ''));
        return { element: div, top: pos.top, left: pos.left };
    };
    /**
     * To adjust the layout inside freeze pane.
     *
     * @hidden
     * @param {ChartModel} model - Specifies the id.
     * @param {HTMLElement} element - Specifies the range.
     * @param {string} range - Specifies the sheet index.
     * @returns {void}
     */
    Overlay.prototype.adjustFreezePaneSize = function (model, element, range) {
        var indexes = getRangeIndexes(range);
        var sheet = this.parent.getActiveSheet();
        var frozenRow = this.parent.frozenRowCount(sheet);
        var frozenCol = this.parent.frozenColCount(sheet);
        if (indexes[0] < frozenRow || indexes[1] < frozenCol) {
            if (!isNullOrUndefined(model.top)) {
                element.style.top = model.top + (sheet.showHeaders ? 31 : 0) - this.parent.viewport.beforeFreezeHeight + 'px';
            }
            if (!isNullOrUndefined(model.left)) {
                element.style.left = model.left + this.parent.sheetModule.getRowHeaderWidth(sheet, true) -
                    this.parent.viewport.beforeFreezeWidth + 'px';
            }
        }
        else {
            if (!isNullOrUndefined(model.top)) {
                element.style.top = model.top - this.parent.viewport.beforeFreezeHeight - (frozenRow ? getRowsHeight(sheet, getCellIndexes(sheet.topLeftCell)[0], frozenRow - 1) : 0) + 'px';
            }
            if (!isNullOrUndefined(model.left)) {
                element.style.left = model.left - this.parent.viewport.beforeFreezeWidth - (frozenCol ? getColumnsWidth(sheet, getCellIndexes(sheet.topLeftCell)[1], frozenCol - 1) : 0) + 'px';
            }
        }
        if (isNullOrUndefined(model.top)) {
            var startTop = getCellIndexes(sheet.topLeftCell)[0];
            model.top = this.parent.viewport.beforeFreezeHeight + (frozenRow && startTop === indexes[0] ? 0 : getRowsHeight(sheet, frozenRow ? startTop : 0, indexes[0] - 1));
        }
        if (isNullOrUndefined(model.left)) {
            var startLeft = getCellIndexes(sheet.topLeftCell)[1];
            model.left = this.parent.viewport.beforeFreezeWidth + (frozenCol && startLeft === indexes[1] ? 0 : getColumnsWidth(sheet, frozenCol ? startLeft : 0, indexes[1] - 1));
        }
    };
    Overlay.prototype.addEventListener = function (div) {
        var overlayElem = div;
        EventHandler.add(overlayElem, 'mousedown', this.overlayClickHandler, this);
        EventHandler.add(overlayElem, 'mousemove', this.overlayMouseMoveHandler, this);
        EventHandler.add(this.parent.element.querySelector('#' + this.parent.element.id + '_sheet'), 'mousemove', this.overlayMouseMoveHandler, this);
        EventHandler.add(document, 'mouseup', this.overlayMouseUpHandler, this);
        this.parent.on(overlayEleSize, this.setOriginalSize, this);
    };
    Overlay.prototype.setOriginalSize = function (args) {
        this.originalHeight = args.height;
        this.originalWidth = args.width;
    };
    Overlay.prototype.overlayMouseMoveHandler = function (e) {
        var target = e.target;
        var overlayElem = document.getElementsByClassName('e-ss-overlay-active')[0];
        var sheet = this.parent.getActiveSheet();
        var checkOffset = sheet.frozenRows || sheet.frozenColumns ? [29, this.parent.sheetModule.getRowHeaderWidth(sheet, true)] : [-1, -1];
        var height1;
        var top;
        var width1;
        var height2;
        var width2;
        var left;
        if (this.isOverlayClicked && this.isResizerClicked) {
            switch (this.resizer) {
                case 'e-ss-overlay-t':
                    height1 = Math.max(this.originalMouseY - e.clientY + this.originalHeight, 20);
                    top = e.clientY - (this.originalMouseY - this.originalResizeTop);
                    if (height1 > 20 && top > checkOffset[0]) {
                        overlayElem.style.height = height1 + 'px';
                        overlayElem.style.top = top + 'px';
                        this.resizedReorderTop = top; // resized divTop
                        this.currenHeight = height1;
                        this.parent.notify(refreshChartSize, {
                            height: overlayElem.style.height, width: overlayElem.style.width, overlayEle: overlayElem
                        });
                    }
                    break;
                case 'e-ss-overlay-r':
                    width1 = this.originalWidth + (e.pageX - this.originalMouseX);
                    if (width1 > 20) {
                        overlayElem.style.width = width1 + 'px';
                        this.currentWidth = width1;
                        this.parent.notify(refreshChartSize, {
                            height: overlayElem.style.height, width: overlayElem.style.width, overlayEle: overlayElem
                        });
                    }
                    break;
                case 'e-ss-overlay-b':
                    height2 = this.originalHeight + (e.pageY - this.originalMouseY);
                    if (height2 > 20) {
                        overlayElem.style.height = height2 + 'px';
                        this.currenHeight = height2;
                        this.parent.notify(refreshChartSize, {
                            height: overlayElem.style.height, width: overlayElem.style.width, overlayEle: overlayElem
                        });
                    }
                    break;
                case 'e-ss-overlay-l':
                    width2 = Math.max(this.originalMouseX - e.clientX + this.originalWidth, 20);
                    left = e.clientX - (this.originalMouseX - this.originalResizeLeft);
                    if (width2 > 20 && left > checkOffset[1]) {
                        overlayElem.style.width = width2 + 'px';
                        overlayElem.style.left = left + 'px';
                        this.resizedReorderLeft = left; //resized divLeft
                        this.currentWidth = width2;
                        this.parent.notify(refreshChartSize, {
                            height: overlayElem.style.height, width: overlayElem.style.width, overlayEle: overlayElem
                        });
                    }
                    break;
            }
        }
        else if (this.isOverlayClicked) {
            if ((closest(target, '.e-sheet') && !target.classList.contains('e-sheet-content')) ||
                target.classList.contains('e-cell')) {
                if (!overlayElem) {
                    return;
                }
                var aX = e.clientX - this.diffX;
                var aY = e.clientY - this.diffY;
                if (aX > checkOffset[1]) {
                    overlayElem.style.left = aX + 'px';
                }
                if (aY > checkOffset[0]) {
                    overlayElem.style.top = aY + 'px';
                }
                this.resizedReorderLeft = aX < 0 ? 0 : aX; //resized divLeft
                this.resizedReorderTop = aY < 0 ? 0 : aY; // resized divTop
            }
            else {
                this.overlayMouseUpHandler(e, true);
            }
        }
    };
    Overlay.prototype.overlayMouseUpHandler = function (e, isMouseUp) {
        if (!this.parent || this.parent.getActiveSheet().isProtected) {
            return;
        }
        this.isResizerClicked = false;
        var elem = e.target;
        var overlayElems = document.getElementsByClassName('e-datavisualization-chart e-ss-overlay-active');
        if (!elem.classList.contains('e-ss-overlay')) {
            elem = closest(e.target, '.e-datavisualization-chart') ?
                closest(e.target, '.e-datavisualization-chart') : elem;
        }
        var sheet = this.parent.getActiveSheet();
        var eventArgs = {
            prevTop: sheet.frozenRows || sheet.frozenColumns ? this.prevY : this.originalReorderTop,
            prevLeft: sheet.frozenRows || sheet.frozenColumns ? this.prevX : this.originalReorderLeft,
            currentTop: this.resizedReorderTop >= 0 ? parseInt(this.resizedReorderTop.toString(), 10) : this.originalReorderTop,
            currentLeft: this.resizedReorderLeft >= 0 ? parseInt(this.resizedReorderLeft.toString(), 10) : this.originalReorderLeft,
            id: elem.id, currentHeight: this.currenHeight, currentWidth: this.currentWidth,
            requestType: 'imageRefresh', prevHeight: this.originalHeight, prevWidth: this.originalWidth
        };
        if (this.isOverlayClicked || isMouseUp) {
            var currRowIdx = void 0;
            var currColIdx = void 0;
            var prevRowIdx = { clientY: eventArgs.prevTop, isImage: true };
            var prevColIdx = { clientX: eventArgs.prevLeft, isImage: true };
            var overlayEle = this.parent.element.getElementsByClassName('e-ss-overlay-active')[0];
            if (sheet.frozenRows || sheet.frozenColumns) {
                if (!overlayEle) {
                    return;
                }
                prevRowIdx.isImage = false;
                prevColIdx.isImage = false;
                prevRowIdx.target = overlayEle;
                prevColIdx.target = overlayEle;
                if (eventArgs.prevTop < this.parent.getColumnHeaderContent().getBoundingClientRect().bottom) {
                    prevRowIdx.target = this.parent.getColumnHeaderContent();
                }
                if (eventArgs.prevLeft < this.parent.getRowHeaderContent().getBoundingClientRect().right) {
                    prevColIdx.target = this.parent.getRowHeaderTable();
                }
                var clientRect = overlayEle.getBoundingClientRect();
                currRowIdx = { clientY: clientRect.top };
                currColIdx = { clientX: clientRect.left };
                if (clientRect.top < this.parent.getColumnHeaderContent().getBoundingClientRect().bottom) {
                    currRowIdx.target = this.parent.getColumnHeaderContent();
                }
                if (clientRect.left < this.parent.getRowHeaderContent().getBoundingClientRect().right) {
                    currColIdx.target = this.parent.getRowHeaderTable();
                }
            }
            else {
                currRowIdx = { clientY: eventArgs.currentTop, isImage: true };
                currColIdx = { clientX: eventArgs.currentLeft, isImage: true };
            }
            this.parent.notify(getRowIdxFromClientY, prevRowIdx);
            this.parent.notify(getRowIdxFromClientY, currRowIdx);
            this.parent.notify(getColIdxFromClientX, prevColIdx);
            this.parent.notify(getColIdxFromClientX, currColIdx);
            if (currRowIdx.size) {
                eventArgs.currentTop = currRowIdx.size;
            }
            if (currColIdx.size) {
                eventArgs.currentLeft = currColIdx.size;
            }
            eventArgs.prevRowIdx = prevRowIdx.clientY;
            eventArgs.prevColIdx = prevColIdx.clientX;
            eventArgs.currentRowIdx = currRowIdx.clientY;
            eventArgs.currentColIdx = currColIdx.clientX;
            if ((sheet.frozenColumns || sheet.frozenRows) && !closest(overlayEle, '.e-sheet-content')) {
                var frozenCol = this.parent.frozenColCount(sheet);
                var frozenRow = this.parent.frozenRowCount(sheet);
                if (eventArgs.currentRowIdx >= frozenRow && eventArgs.currentColIdx >= frozenCol) {
                    var top_1 = parseInt(overlayEle.style.top, 10);
                    var left = parseInt(overlayEle.style.left, 10);
                    var mainPanel = this.parent.sheetModule.contentPanel;
                    top_1 += mainPanel.scrollTop;
                    top_1 -= this.parent.getColumnHeaderContent().parentElement.getBoundingClientRect().height;
                    var scrollPanel = this.parent.getScrollElement();
                    left += scrollPanel.scrollLeft;
                    left -= this.parent.sheetModule.getRowHeaderWidth(sheet);
                    overlayEle.style.top = top_1 + 'px';
                    overlayEle.style.left = left + 'px';
                    this.parent.getMainContent().appendChild(overlayEle);
                }
            }
            if (overlayElems && overlayElems[0]) {
                if (overlayElems[0].querySelector('.e-control')) {
                    eventArgs.id = overlayElems[0].id;
                }
            }
            if (this.originalReorderTop !== this.resizedReorderTop || this.originalReorderLeft !== this.resizedReorderLeft) {
                eventArgs.id = overlayEle.id;
                if (overlayElems && overlayElems[0]) {
                    eventArgs.requestType = 'chartRefresh';
                    this.parent.notify(refreshChartCellObj, eventArgs);
                }
                else {
                    this.parent.notify(refreshImgCellObj, eventArgs);
                }
                this.resizedReorderTop = this.originalReorderTop;
                this.resizedReorderLeft = this.originalReorderLeft;
            }
            else if (this.currenHeight !== this.originalHeight || this.originalWidth !== this.currentWidth) {
                eventArgs.id = elem.id.indexOf('overlay') > 0 ? elem.id : elem.parentElement &&
                    elem.parentElement.classList.contains('e-ss-overlay') ? elem.parentElement.id : overlayEle.id;
                if (overlayElems && overlayElems[0]) {
                    eventArgs.requestType = 'chartRefresh';
                    this.parent.notify(refreshChartCellObj, eventArgs);
                }
                else {
                    this.parent.notify(refreshImgCellObj, eventArgs);
                }
                this.originalHeight = this.currenHeight;
                this.originalWidth = this.currentWidth;
            }
        }
        this.isOverlayClicked = false;
    };
    Overlay.prototype.overlayClickHandler = function (e) {
        if (this.parent.getActiveSheet().isProtected) {
            return;
        }
        this.isOverlayClicked = true;
        var target = e.target;
        var overlayElem = e.target;
        if (!target.classList.contains('e-ss-overlay')) {
            overlayElem = target.parentElement;
            if (closest(e.target, '.e-datavisualization-chart')) {
                overlayElem = closest(e.target, '.e-datavisualization-chart');
            }
        }
        var sheet = this.parent.getActiveSheet();
        if ((sheet.frozenColumns || sheet.frozenRows) && closest(overlayElem, '.e-sheet-content')) {
            var top_2 = parseInt(overlayElem.style.top, 10);
            var left = parseInt(overlayElem.style.left, 10);
            var mainPanel = this.parent.sheetModule.contentPanel;
            top_2 -= mainPanel.scrollTop;
            top_2 += this.parent.getColumnHeaderContent().parentElement.getBoundingClientRect().height;
            var scrollPanel = this.parent.getScrollElement();
            left -= scrollPanel.scrollLeft;
            left += this.parent.sheetModule.getRowHeaderWidth(sheet);
            overlayElem.style.top = top_2 + 'px';
            overlayElem.style.left = left + 'px';
            this.parent.element.querySelector('#' + this.parent.element.id + '_sheet').appendChild(overlayElem);
        }
        this.originalWidth = this.currentWidth = parseFloat(overlayElem.style.width);
        this.originalHeight = this.currenHeight = parseFloat(overlayElem.style.height);
        this.originalReorderLeft = parseFloat(overlayElem.style.left); //divLeft
        this.originalReorderTop = parseFloat(overlayElem.style.top); // divTop
        this.resizedReorderLeft = parseFloat(overlayElem.style.left); //resized divLeft
        this.resizedReorderTop = parseFloat(overlayElem.style.top); // resized divTop
        this.originalResizeTop = this.originalReorderTop;
        this.originalResizeLeft = this.originalReorderLeft;
        this.originalMouseX = e.clientX; // posX
        this.originalMouseY = e.clientY; // posY
        this.diffX = this.originalMouseX - this.originalReorderLeft;
        this.diffY = this.originalMouseY - this.originalReorderTop;
        var actOverlayElem = document.getElementsByClassName('e-ss-overlay-active')[0];
        if (actOverlayElem) {
            removeClass([actOverlayElem], 'e-ss-overlay-active');
        }
        this.parent.element.querySelector('#' + overlayElem.id).classList.add('e-ss-overlay-active');
        if (target.classList.contains('e-ss-resizer')) {
            this.resizer = target.classList[0];
            this.isResizerClicked = true;
        }
        if (overlayElem.classList.contains('e-datavisualization-chart')) {
            this.parent.notify(focusChartBorder, { id: overlayElem.id });
            if (!actOverlayElem) {
                this.parent.notify(insertDesignChart, { id: overlayElem.id });
            }
        }
        var clientRect = overlayElem.getBoundingClientRect();
        this.prevX = clientRect.left;
        this.prevY = clientRect.top;
    };
    Overlay.prototype.renderResizeHandles = function (div) {
        var handles = ['e-ss-overlay-t', 'e-ss-overlay-r', 'e-ss-overlay-b', 'e-ss-overlay-l'];
        var i = 0;
        var handleElem;
        var overlay = div;
        while (handles.length > i) {
            handleElem = this.parent.createElement('div', {
                attrs: { 'class': handles[i] + ' ' + 'e-ss-resizer' },
                styles: 'width: 8px; height: 8px; border-radius: 4px;'
            });
            overlay.appendChild(handleElem);
            i++;
        }
    };
    Overlay.prototype.removeEventListener = function () {
        var overlayElem = this.parent.element.querySelector('#' + this.parent.element.id + '_overlay');
        if (overlayElem) { // Added this condition temporarly to handle chart destroy from spec file.
            EventHandler.remove(overlayElem, 'mousedown', this.overlayClickHandler);
            EventHandler.remove(overlayElem, 'mousemove', this.overlayMouseMoveHandler);
        }
        EventHandler.remove(this.parent.element.querySelector('#' + this.parent.element.id + '_sheet'), 'mousemove', this.overlayMouseMoveHandler);
        EventHandler.remove(document, 'mouseup', this.overlayMouseUpHandler);
        this.parent.off(overlayEleSize, this.setOriginalSize);
    };
    /**
     * To clear private variables.
     *
     * @returns {void}
     */
    Overlay.prototype.destroy = function () {
        this.removeEventListener();
        this.parent = null;
    };
    return Overlay;
}());
export { Overlay };
