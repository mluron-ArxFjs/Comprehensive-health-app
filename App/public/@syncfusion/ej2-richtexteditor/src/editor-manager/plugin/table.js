import { createElement, closest, detach, Browser, isNullOrUndefined as isNOU } from '@syncfusion/ej2-base';
import * as CONSTANT from './../base/constant';
import { InsertHtml } from './inserthtml';
/**
 * Link internal component
 *
 * @hidden

 */
var TableCommand = /** @class */ (function () {
    /**
     * Constructor for creating the Formats plugin
     *
     * @param {EditorManager} parent - specifies the parent element
     * @hidden

     */
    function TableCommand(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    TableCommand.prototype.addEventListener = function () {
        this.parent.observer.on(CONSTANT.TABLE, this.createTable, this);
        this.parent.observer.on(CONSTANT.INSERT_ROW, this.insertRow, this);
        this.parent.observer.on(CONSTANT.INSERT_COLUMN, this.insertColumn, this);
        this.parent.observer.on(CONSTANT.DELETEROW, this.deleteRow, this);
        this.parent.observer.on(CONSTANT.DELETECOLUMN, this.deleteColumn, this);
        this.parent.observer.on(CONSTANT.REMOVETABLE, this.removeTable, this);
        this.parent.observer.on(CONSTANT.TABLEHEADER, this.tableHeader, this);
        this.parent.observer.on(CONSTANT.TABLE_VERTICAL_ALIGN, this.tableVerticalAlign, this);
        this.parent.observer.on(CONSTANT.TABLE_MERGE, this.cellMerge, this);
        this.parent.observer.on(CONSTANT.TABLE_HORIZONTAL_SPLIT, this.HorizontalSplit, this);
        this.parent.observer.on(CONSTANT.TABLE_VERTICAL_SPLIT, this.VerticalSplit, this);
        this.parent.observer.on(CONSTANT.TABLE_MOVE, this.tableMove, this);
    };
    TableCommand.prototype.createTable = function (e) {
        var table = createElement('table', { className: 'e-rte-table' });
        var tblBody = createElement('tbody');
        if (!isNOU(e.item.width.width)) {
            table.style.width = this.calculateStyleValue(e.item.width.width);
        }
        if (!isNOU(e.item.width.minWidth)) {
            table.style.minWidth = this.calculateStyleValue(e.item.width.minWidth);
        }
        if (!isNOU(e.item.width.maxWidth)) {
            table.style.maxWidth = this.calculateStyleValue(e.item.width.maxWidth);
        }
        var tdWid = parseInt(e.item.width.width, 10) > 100 ?
            100 / e.item.columns : parseInt(e.item.width.width, 10) / e.item.columns;
        for (var i = 0; i < e.item.rows; i++) {
            var row = createElement('tr');
            for (var j = 0; j < e.item.columns; j++) {
                var cell = createElement('td');
                cell.appendChild(createElement('br'));
                cell.style.width = tdWid + '%';
                row.appendChild(cell);
            }
            tblBody.appendChild(row);
        }
        table.appendChild(tblBody);
        e.item.selection.restore();
        InsertHtml.Insert(this.parent.currentDocument, table, this.parent.editableElement);
        this.removeEmptyNode();
        e.item.selection.setSelectionText(this.parent.currentDocument, table.querySelector('td'), table.querySelector('td'), 0, 0);
        if (table.nextElementSibling === null) {
            var insertElem = void 0;
            if (e.enterAction === 'DIV') {
                insertElem = createElement('div');
                insertElem.appendChild(createElement('br'));
            }
            else if (e.enterAction === 'BR') {
                insertElem = createElement('br');
            }
            else {
                insertElem = createElement('p');
                insertElem.appendChild(createElement('br'));
            }
            this.insertAfter(insertElem, table);
        }
        table.querySelector('td').classList.add('e-cell-select');
        if (e.callBack) {
            e.callBack({
                requestType: 'Table',
                editorMode: 'HTML',
                event: e.event,
                range: this.parent.nodeSelection.getRange(this.parent.currentDocument),
                elements: [table]
            });
        }
        return table;
    };
    TableCommand.prototype.calculateStyleValue = function (value) {
        var styleValue;
        if (typeof (value) === 'string') {
            if (value.indexOf('px') || value.indexOf('%') || value.indexOf('auto')) {
                styleValue = value;
            }
            else {
                styleValue = value + 'px';
            }
        }
        else {
            styleValue = value + 'px';
        }
        return styleValue;
    };
    TableCommand.prototype.removeEmptyNode = function () {
        var emptyUl = this.parent.editableElement.querySelectorAll('ul:empty, ol:empty');
        for (var i = 0; i < emptyUl.length; i++) {
            detach(emptyUl[i]);
        }
        var emptyLiChild = this.parent.editableElement.querySelectorAll('li *:empty:not(img)');
        for (var i = 0; i < emptyLiChild.length; i++) {
            detach(emptyLiChild[i]);
            if (emptyLiChild.length === i + 1) {
                emptyLiChild = this.parent.editableElement.querySelectorAll('li *:empty:not(img)');
                i = -1;
            }
        }
        var emptyLi = this.parent.editableElement.querySelectorAll('li:empty');
        for (var i = 0; i < emptyLi.length; i++) {
            detach(emptyLi[i]);
        }
    };
    TableCommand.prototype.insertAfter = function (newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    };
    TableCommand.prototype.getSelectedCellMinMaxIndex = function (e) {
        var selectedCells = this.curTable.querySelectorAll('.e-cell-select');
        var a = 0;
        var minI = e.length;
        var maxI = 0;
        var minJ = e[0].length;
        var maxJ = 0;
        //eslint-disable-next-line
        for (var i = 0; a < selectedCells.length; a++) {
            var selectedCellIndex = this.getCorrespondingIndex(selectedCells[a], e);
            var minMaxIndex = this.FindIndex(selectedCellIndex[0], selectedCellIndex[1], e);
            //eslint-disable-next-line
            minI = Math.min(selectedCellIndex[0], minI),
                maxI = Math.max(minMaxIndex[0], maxI),
                minJ = Math.min(selectedCellIndex[1], minJ),
                maxJ = Math.max(minMaxIndex[1], maxJ);
        }
        return {
            startRow: minI,
            endRow: maxI,
            startColumn: minJ,
            endColumn: maxJ
        };
    };
    TableCommand.prototype.insertRow = function (e) {
        var isBelow = e.item.subCommand === 'InsertRowBefore' ? false : true;
        var selectedCell = e.item.selection.range.startContainer;
        if (!(selectedCell.nodeName === 'TH' || selectedCell.nodeName === 'TD')) {
            selectedCell = closest(selectedCell.parentElement, 'td,th');
        }
        if (selectedCell.nodeName.toLowerCase() === 'th' && e.item.subCommand === 'InsertRowBefore') {
            return;
        }
        this.curTable = closest(this.parent.nodeSelection.range.startContainer.parentElement, 'table');
        if (this.curTable.querySelectorAll('.e-cell-select').length === 0) {
            var lastRow = this.curTable.rows[this.curTable.rows.length - 1];
            var cloneRow = lastRow.cloneNode(true);
            cloneRow.removeAttribute('rowspan');
            this.insertAfter(cloneRow, lastRow);
        }
        else {
            var allCells = this.getCorrespondingColumns();
            var minMaxIndex = this.getSelectedCellMinMaxIndex(allCells);
            var minVal = isBelow ? minMaxIndex.endRow : minMaxIndex.startRow;
            var newRow = createElement('tr');
            var isHeaderSelect = this.curTable.querySelectorAll('th.e-cell-select').length > 0;
            for (var i = 0; i < allCells[minVal].length; i++) {
                // eslint-disable-next-line max-len
                if (isBelow && minVal < allCells.length - 1 && allCells[minVal][i] === allCells[minVal + 1][i] ||
                    !isBelow && 0 < minVal && allCells[minVal][i] === allCells[minVal - 1][i]) {
                    if (0 === i || 0 < i && allCells[minVal][i] !== allCells[minVal][i - 1]) {
                        allCells[minVal][i].setAttribute('rowspan', (parseInt(allCells[minVal][i].getAttribute('rowspan'), 10) + 1).toString());
                    }
                }
                else {
                    var tdElement = createElement('td');
                    tdElement.appendChild(createElement('br'));
                    newRow.appendChild(tdElement);
                    tdElement.setAttribute('style', allCells[(isHeaderSelect && isBelow) ? allCells[(minVal + 1)] ? (minVal + 1) : minVal : minVal][i].getAttribute('style'));
                }
            }
            // eslint-disable-next-line
            var selectedRow = void 0;
            if (isHeaderSelect && isBelow) {
                selectedRow = this.curTable.querySelector('tbody').childNodes[0];
            }
            else {
                selectedRow = this.curTable.rows[minVal];
            }
            // eslint-disable-next-line
            (e.item.subCommand === 'InsertRowBefore') ? selectedRow.parentElement.insertBefore(newRow, selectedRow) :
                (isHeaderSelect ? selectedRow.parentElement.insertBefore(newRow, selectedRow) :
                    this.insertAfter(newRow, selectedRow));
        }
        e.item.selection.setSelectionText(this.parent.currentDocument, e.item.selection.range.startContainer, e.item.selection.range.startContainer, 0, 0);
        if (e.callBack) {
            e.callBack({
                requestType: e.item.subCommand,
                editorMode: 'HTML',
                event: e.event,
                range: this.parent.nodeSelection.getRange(this.parent.currentDocument),
                elements: this.parent.nodeSelection.getSelectedNodes(this.parent.currentDocument)
            });
        }
    };
    TableCommand.prototype.insertColumn = function (e) {
        var selectedCell = e.item.selection.range.startContainer;
        if (!(selectedCell.nodeName === 'TH' || selectedCell.nodeName === 'TD')) {
            selectedCell = closest(selectedCell.parentElement, 'td,th');
        }
        var curRow = closest(selectedCell, 'tr');
        var curCell;
        var allRows = closest((curRow), 'table').rows;
        var colIndex = Array.prototype.slice.call(curRow.querySelectorAll(':scope > td, :scope > th')).indexOf(selectedCell);
        var previousWidth = parseInt(e.item.width, 10) / (curRow.querySelectorAll(':scope > td, :scope > th').length);
        var currentWidth = parseInt(e.item.width, 10) / (curRow.querySelectorAll(':scope > td, :scope > th').length + 1);
        var currentTabElm = closest(curRow, 'table');
        var thTdElm = closest(curRow, 'table').querySelectorAll('th,td');
        for (var i = 0; i < thTdElm.length; i++) {
            thTdElm[i].dataset.oldWidth = (thTdElm[i].offsetWidth / currentTabElm.offsetWidth * 100) + '%';
        }
        for (var i = 0; i < allRows.length; i++) {
            curCell = allRows[i].querySelectorAll(':scope > td, :scope > th')[colIndex];
            var colTemplate = curCell.cloneNode(true);
            colTemplate.innerHTML = '';
            colTemplate.appendChild(createElement('br'));
            colTemplate.removeAttribute('class');
            colTemplate.removeAttribute('colspan');
            colTemplate.removeAttribute('rowspan');
            // eslint-disable-next-line
            (e.item.subCommand === 'InsertColumnLeft') ? curCell.parentElement.insertBefore(colTemplate, curCell) :
                this.insertAfter(colTemplate, curCell);
            colTemplate.style.width = currentWidth.toFixed(4) + '%';
            delete colTemplate.dataset.oldWidth;
        }
        for (var i = 0; i < thTdElm.length; i++) {
            thTdElm[i].style.width = (Number(thTdElm[i].dataset.oldWidth.split('%')[0]) * currentWidth / previousWidth).toFixed(4) + '%';
            delete thTdElm[i].dataset.oldWidth;
        }
        e.item.selection.setSelectionText(this.parent.currentDocument, selectedCell, selectedCell, 0, 0);
        if (e.callBack) {
            e.callBack({
                requestType: e.item.subCommand,
                editorMode: 'HTML',
                event: e.event,
                range: this.parent.nodeSelection.getRange(this.parent.currentDocument),
                elements: this.parent.nodeSelection.getSelectedNodes(this.parent.currentDocument)
            });
        }
    };
    TableCommand.prototype.deleteColumn = function (e) {
        var selectedCell = e.item.selection.range.startContainer;
        if (selectedCell.nodeType === 3) {
            selectedCell = closest(selectedCell.parentElement, 'td,th');
        }
        var tBodyHeadEle = closest(selectedCell, selectedCell.tagName === 'TH' ? 'thead' : 'tbody');
        var rowIndex = tBodyHeadEle && Array.prototype.indexOf.call(tBodyHeadEle.childNodes, selectedCell.parentNode);
        this.curTable = closest(selectedCell, 'table');
        var curRow = closest(selectedCell, 'tr');
        if (curRow.querySelectorAll('th,td').length === 1) {
            e.item.selection.restore();
            detach(closest(selectedCell.parentElement, 'table'));
        }
        else {
            var deleteIndex = void 0;
            var allCells = this.getCorrespondingColumns();
            //eslint-disable-next-line
            var selectedMinMaxIndex = this.getSelectedCellMinMaxIndex(allCells);
            var minCol = selectedMinMaxIndex.startColumn;
            var maxCol = selectedMinMaxIndex.endColumn;
            for (var i = 0; i < allCells.length; i++) {
                var currentRow = allCells[i];
                for (var j = 0; j < currentRow.length; j++) {
                    var currentCell = currentRow[j];
                    //eslint-disable-next-line
                    var currentCellIndex = this.getCorrespondingIndex(currentCell, allCells);
                    var colSpanVal = parseInt(currentCell.getAttribute('colspan'), 10) || 1;
                    if (currentCellIndex[1] + (colSpanVal - 1) >= minCol && currentCellIndex[1] <= maxCol) {
                        if (colSpanVal > 1) {
                            currentCell.setAttribute('colspan', (colSpanVal - 1).toString());
                        }
                        else {
                            detach(currentCell);
                            deleteIndex = j;
                            if (Browser.isIE) {
                                e.item.selection.setSelectionText(this.parent.currentDocument, this.curTable.querySelector('td'), this.curTable.querySelector('td'), 0, 0);
                                this.curTable.querySelector('td, th').classList.add('e-cell-select');
                            }
                        }
                    }
                }
            }
            if (deleteIndex > -1) {
                var rowHeadEle = tBodyHeadEle.children[rowIndex];
                var nextFocusCell = rowHeadEle &&
                    rowHeadEle.children[(deleteIndex <= rowHeadEle.children.length - 1 ? deleteIndex : deleteIndex - 1)];
                if (nextFocusCell) {
                    e.item.selection.setSelectionText(this.parent.currentDocument, nextFocusCell, nextFocusCell, 0, 0);
                    nextFocusCell.classList.add('e-cell-select');
                }
            }
        }
        if (e.callBack) {
            var sContainer = this.parent.nodeSelection.getRange(this.parent.currentDocument).startContainer;
            if (sContainer.nodeName !== 'TD') {
                var startChildLength = this.parent.nodeSelection.getRange(this.parent.currentDocument).startOffset;
                var focusNode = sContainer.children[startChildLength];
                if (focusNode) {
                    this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, focusNode, 0);
                }
            }
            e.callBack({
                requestType: e.item.subCommand,
                editorMode: 'HTML',
                event: e.event,
                range: this.parent.nodeSelection.getRange(this.parent.currentDocument),
                elements: this.parent.nodeSelection.getSelectedNodes(this.parent.currentDocument)
            });
        }
    };
    TableCommand.prototype.deleteRow = function (e) {
        var selectedCell = e.item.selection.range.startContainer;
        if (selectedCell.nodeType === 3) {
            selectedCell = closest(selectedCell.parentElement, 'td,th');
        }
        var colIndex = Array.prototype.indexOf.call(selectedCell.parentNode.childNodes, selectedCell);
        this.curTable = closest(selectedCell, 'table');
        var currentRow;
        var allCells = this.getCorrespondingColumns();
        var minMaxIndex = this.getSelectedCellMinMaxIndex(allCells);
        var maxI;
        var j;
        if (this.curTable.rows.length === 1) {
            e.item.selection.restore();
            detach(closest(selectedCell.parentElement, 'table'));
        }
        else {
            for (maxI = minMaxIndex.endRow; maxI >= minMaxIndex.startRow; maxI--) {
                currentRow = this.curTable.rows[maxI];
                for (j = 0; j < allCells[maxI].length; j++) {
                    if (j === 0 || allCells[maxI][j] !== allCells[maxI][j - 1]) {
                        if (1 < parseInt(allCells[maxI][j].getAttribute('rowspan'), 10)) {
                            var rowSpanVal = parseInt(allCells[maxI][j].getAttribute('rowspan'), 10) - 1;
                            /* eslint-disable */
                            if (1 === rowSpanVal) {
                                allCells[maxI][j].removeAttribute('rowspan');
                                var cell = this.getMergedRow(this.getCorrespondingColumns())[j];
                                if (cell) {
                                    var cloneNode = cell.cloneNode(true);
                                    cloneNode.innerHTML = '<br>';
                                    if (cell.parentElement) {
                                        cell.parentElement.insertBefore(cloneNode, cell);
                                    }
                                }
                            }
                            else {
                                allCells[maxI][j].setAttribute('rowspan', rowSpanVal.toString());
                            }
                            /* eslint-enable */
                        }
                    }
                    // eslint-disable-next-line max-len
                    if (maxI < allCells.length - 1 && allCells[maxI][j] === allCells[maxI + 1][j] && (0 === maxI ||
                        allCells[maxI][j] !== allCells[maxI - 1][j])) {
                        var element = allCells[maxI][j];
                        var index = void 0;
                        // eslint-disable-next-line max-len
                        for (index = j; 0 < index && allCells[maxI][index] === allCells[maxI][index - 1]; index--) {
                            if (index === 0) {
                                this.curTable.rows[maxI + 1].prepend(element);
                            }
                            else {
                                allCells[maxI + 1][index - 1].insertAdjacentElement('afterend', element);
                            }
                        }
                    }
                }
                var deleteIndex = currentRow.rowIndex;
                this.curTable.deleteRow(deleteIndex);
                var focusTrEle = !isNOU(this.curTable.rows[deleteIndex]) ? this.curTable.querySelectorAll('tbody tr')[deleteIndex]
                    : this.curTable.querySelectorAll('tbody tr')[deleteIndex - 1];
                var nextFocusCell = focusTrEle && focusTrEle.querySelectorAll('td')[colIndex];
                if (nextFocusCell) {
                    e.item.selection.setSelectionText(this.parent.currentDocument, nextFocusCell, nextFocusCell, 0, 0);
                    nextFocusCell.classList.add('e-cell-select');
                }
                else {
                    e.item.selection.setSelectionText(this.parent.currentDocument, this.curTable.querySelector('td'), this.curTable.querySelector('td'), 0, 0);
                    this.curTable.querySelector('td, th').classList.add('e-cell-select');
                }
            }
        }
        if (e.callBack) {
            e.callBack({
                requestType: e.item.subCommand,
                editorMode: 'HTML',
                event: e.event,
                range: this.parent.nodeSelection.getRange(this.parent.currentDocument),
                elements: this.parent.nodeSelection.getSelectedNodes(this.parent.currentDocument)
            });
        }
    };
    TableCommand.prototype.getMergedRow = function (cells) {
        var mergedRow;
        for (var i = 0; i < cells.length; i++) {
            if (cells[i].length !== this.curTable.rows[0].childNodes.length) {
                mergedRow = cells[i];
            }
        }
        return mergedRow;
    };
    TableCommand.prototype.removeTable = function (e) {
        var selectedCell = e.item.selection.range.startContainer;
        selectedCell = (selectedCell.nodeType === 3) ? selectedCell.parentNode : selectedCell;
        var selectedTable = closest(selectedCell.parentElement, 'table');
        if (selectedTable) {
            e.item.selection.restore();
            detach(selectedTable);
        }
        if (e.callBack) {
            e.callBack({
                requestType: e.item.subCommand,
                editorMode: 'HTML',
                event: e.event,
                range: this.parent.nodeSelection.getRange(this.parent.currentDocument),
                elements: this.parent.nodeSelection.getSelectedNodes(this.parent.currentDocument)
            });
        }
    };
    TableCommand.prototype.tableHeader = function (e) {
        var headerExit = false;
        var selectedCell = e.item.selection.range.startContainer;
        selectedCell = (selectedCell.nodeType === 3) ? selectedCell.parentNode : selectedCell;
        var table = closest(selectedCell.parentElement, 'table');
        [].slice.call(table.childNodes).forEach(function (el) {
            if (el.nodeName === 'THEAD') {
                headerExit = true;
            }
        });
        if (table && !headerExit) {
            var cellCount = table.querySelector('tr').childElementCount;
            var colSpanCount = 0;
            for (var i = 0; i < cellCount; i++) {
                colSpanCount = colSpanCount + (parseInt(table.querySelector('tr').children[i].getAttribute('colspan'), 10) || 1);
            }
            var header = table.createTHead();
            var row = header.insertRow(0);
            for (var j = 0; j < colSpanCount; j++) {
                var th = createElement('th');
                th.appendChild(createElement('br'));
                row.appendChild(th);
            }
        }
        else {
            table.deleteTHead();
        }
        if (e.callBack) {
            e.callBack({
                requestType: e.item.subCommand,
                editorMode: 'HTML',
                event: e.event,
                range: this.parent.nodeSelection.getRange(this.parent.currentDocument),
                elements: this.parent.nodeSelection.getSelectedNodes(this.parent.currentDocument)
            });
        }
    };
    TableCommand.prototype.tableVerticalAlign = function (e) {
        if (e.item.subCommand === 'AlignTop') {
            e.item.tableCell.style.verticalAlign = 'top';
        }
        else if (e.item.subCommand === 'AlignMiddle') {
            e.item.tableCell.style.verticalAlign = 'middle';
        }
        else {
            e.item.tableCell.style.verticalAlign = 'bottom';
        }
        if (e.callBack) {
            e.callBack({
                requestType: e.item.subCommand,
                editorMode: 'HTML',
                event: e.event,
                range: this.parent.nodeSelection.getRange(this.parent.currentDocument),
                elements: this.parent.nodeSelection.getSelectedNodes(this.parent.currentDocument)
            });
        }
    };
    TableCommand.prototype.cellMerge = function (e) {
        if (isNOU(this.curTable)) {
            this.curTable = closest(this.parent.nodeSelection.range.startContainer.parentElement, 'table');
        }
        var selectedCells = this.curTable.querySelectorAll('.e-cell-select');
        if (selectedCells.length < 2) {
            return;
        }
        this.mergeCellContent();
        var minMaxIndexes = this.getSelectedMinMaxIndexes(this.getCorrespondingColumns());
        var firstCell = selectedCells[0];
        var rowSelectedCells = firstCell.parentElement.querySelectorAll('.e-cell-select');
        if (minMaxIndexes.startColumn < minMaxIndexes.endColumn) {
            firstCell.setAttribute('colspan', (minMaxIndexes.endColumn - minMaxIndexes.startColumn + 1).toString());
        }
        if (minMaxIndexes.startRow < minMaxIndexes.endRow) {
            firstCell.setAttribute('rowspan', (minMaxIndexes.endRow - minMaxIndexes.startRow + 1).toString());
        }
        var totalWidth = 0;
        for (var j = rowSelectedCells.length - 1; j >= 0; j--) {
            totalWidth = totalWidth + parseFloat(rowSelectedCells[j].style.width);
        }
        firstCell.style.width = totalWidth + '%';
        for (var i = 1; i <= selectedCells.length - 1; i++) {
            detach(selectedCells[i]);
        }
        for (var i = 0; i < this.curTable.rows.length; i++) {
            if (this.curTable.rows[i].innerHTML === '') {
                detach(this.curTable.rows[i]);
            }
        }
        this.updateRowSpanStyle(minMaxIndexes.startRow, minMaxIndexes.endRow, this.getCorrespondingColumns());
        this.updateColSpanStyle(minMaxIndexes.startColumn, minMaxIndexes.endColumn, this.getCorrespondingColumns());
        e.item.selection.setSelectionText(this.parent.currentDocument, e.item.selection.range.startContainer, e.item.selection.range.startContainer, 0, 0);
        if (this.parent.nodeSelection && firstCell) {
            this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, 
            // eslint-disable-next-line
            firstCell, 0);
        }
        if (e.callBack) {
            e.callBack({
                requestType: e.item.subCommand,
                editorMode: 'HTML',
                event: e.event,
                range: this.parent.nodeSelection.getRange(this.parent.currentDocument),
                elements: this.parent.nodeSelection.getSelectedNodes(this.parent.currentDocument)
            });
        }
    };
    TableCommand.prototype.updateColSpanStyle = function (min, max, elements) {
        var colValue;
        var colIndex;
        var colMin;
        var index = 0;
        var attrValue;
        var count = 0;
        var eleArray = elements;
        //eslint-disable-next-line
        if (min < (max = Math.min(max, eleArray[0].length - 1))) {
            for (colIndex === min; colIndex <= max; colIndex++) {
                // eslint-disable-next-line
                if (!(min < colIndex && eleArray[0][colIndex] === eleArray[0][colIndex - 1]) && 1 < (index =
                    Math.min(parseInt(eleArray[0][colIndex].getAttribute('colspan'), 10) || 1, max - min + 1)) &&
                    eleArray[0][colIndex] === eleArray[0][colIndex + 1]) {
                    for (count = index - 1, colValue = 1; colValue < eleArray.length; colValue++) {
                        if (eleArray[colValue][colIndex] !== eleArray[colValue - 1][colIndex]) {
                            /* eslint-disable */
                            for (colMin = colIndex; colMin < colIndex + index; colMin++) {
                                if (1 < (attrValue = parseInt(eleArray[colValue][colMin].getAttribute('colspan'), 10) || 1) &&
                                    eleArray[colValue][colMin] === eleArray[colValue][colMin + 1]) {
                                    colMin += count = Math.min(count, attrValue - 1);
                                }
                                else if (!(count = Math.max(0, count - 1))) {
                                    break;
                                }
                                /* eslint-enable */
                            }
                        }
                        if (!count) {
                            break;
                        }
                    }
                }
            }
            if (count) {
                this.updateCellAttribute(eleArray, count, 'colspan', 0, eleArray.length - 1, min, max);
            }
        }
    };
    TableCommand.prototype.updateRowSpanStyle = function (min, max, ele) {
        var rowValue;
        var colIndex;
        var rowMin;
        var index = 0;
        var attrValue;
        var count = 0;
        var eleArray = ele;
        // eslint-disable-next-line
        if (min < (max = Math.min(max, eleArray.length - 1))) {
            for (rowValue = min; rowValue <= max; rowValue++) {
                // eslint-disable-next-line
                if (!(min < rowValue && eleArray[rowValue][0] === eleArray[rowValue - 1][0])
                    // eslint-disable-next-line no-cond-assign
                    && eleArray[rowValue][0] && 1 < (index = Math.min(parseInt(eleArray[rowValue][0].getAttribute('rowspan'), 10) ||
                    1, max - min + 1)) && eleArray[rowValue][0] === eleArray[rowValue + 1][0]) {
                    for (count = index - 1, colIndex = 1; colIndex < eleArray[0].length; colIndex++) {
                        if (eleArray[rowValue][colIndex] !== eleArray[rowValue][colIndex - 1]) {
                            for (rowMin = rowValue; rowMin < rowValue + index; rowMin++) {
                                // eslint-disable-next-line
                                if (1 < (attrValue = parseInt(eleArray[rowMin][colIndex].getAttribute('rowspan'), 10) || 1) && eleArray[rowMin][colIndex] === eleArray[rowMin + 1][colIndex]) {
                                    rowMin += count = Math.min(count, attrValue - 1);
                                }
                                // eslint-disable-next-line
                                else if (!(count = Math.max(0, count - 1))) {
                                    break;
                                }
                            }
                            if (!count) {
                                break;
                            }
                        }
                    }
                }
            }
            if (count) {
                this.updateCellAttribute(eleArray, count, 'rowspan', min, max, 0, eleArray[0].length - 1);
            }
        }
    };
    TableCommand.prototype.updateCellAttribute = function (elements, index, attr, min, max, firstIndex, length) {
        var rowIndex;
        var colIndex;
        var spanCount;
        for (rowIndex = min; rowIndex <= max; rowIndex++) {
            for (colIndex = firstIndex; colIndex <= length; colIndex++) {
                // eslint-disable-next-line
                min < rowIndex && elements[rowIndex][colIndex] === elements[rowIndex - 1][colIndex] ||
                    firstIndex < colIndex && elements[rowIndex][colIndex] === elements[rowIndex][colIndex - 1] ||
                    1 < (spanCount = parseInt(elements[rowIndex][colIndex].getAttribute(attr), 10) || 1) &&
                        // eslint-disable-next-line max-len
                        (1 < spanCount - index ? elements[rowIndex][colIndex].setAttribute(attr, (spanCount - index).toString()) :
                            elements[rowIndex][colIndex].removeAttribute(attr));
            }
        }
    };
    TableCommand.prototype.mergeCellContent = function () {
        var selectedCells = this.curTable.querySelectorAll('.e-cell-select');
        var innerHtml = selectedCells[0].innerHTML === '<br>' ? '' : selectedCells[0].innerHTML;
        for (var i = 1; i < selectedCells.length; i++) {
            if ('<br>' !== selectedCells[i].innerHTML) {
                innerHtml = innerHtml ? innerHtml + '<br>' + selectedCells[i].innerHTML : innerHtml + selectedCells[i].innerHTML;
            }
        }
        selectedCells[0].innerHTML = innerHtml;
    };
    TableCommand.prototype.getSelectedMinMaxIndexes = function (correspondingCells) {
        var selectedCells = this.curTable.querySelectorAll('.e-cell-select');
        if (0 < selectedCells.length) {
            var minRow = correspondingCells.length;
            var maxRow = 0;
            var minCol = correspondingCells[0].length;
            var maxCol = 0;
            for (var i = 0; i < selectedCells.length; i++) {
                var currentRowCol = this.getCorrespondingIndex(selectedCells[i], correspondingCells);
                var targetRowCol = this.FindIndex(currentRowCol[0], currentRowCol[1], correspondingCells);
                minRow = Math.min(currentRowCol[0], minRow);
                maxRow = Math.max(targetRowCol[0], maxRow);
                minCol = Math.min(currentRowCol[1], minCol);
                maxCol = Math.max(targetRowCol[1], maxCol);
            }
            return {
                startRow: minRow,
                endRow: maxRow,
                startColumn: minCol,
                endColumn: maxCol
            };
        }
        return null;
    };
    TableCommand.prototype.HorizontalSplit = function (e) {
        var selectedCell = e.item.selection.range.startContainer;
        this.curTable = closest(selectedCell.parentElement, 'table');
        if (this.curTable.querySelectorAll('.e-cell-select').length > 1) {
            return;
        }
        this.activeCell = this.curTable.querySelector('.e-cell-select');
        var newCell = this.activeCell.cloneNode(true);
        newCell.removeAttribute('class');
        newCell.innerHTML = '</br>';
        var activeCellIndex = this.getCorrespondingIndex(this.activeCell, this.getCorrespondingColumns());
        var correspondingCells = this.getCorrespondingColumns();
        var activeCellRowSpan = this.activeCell.getAttribute('rowspan') ? parseInt(this.activeCell.getAttribute('rowspan'), 10) : 1;
        if (activeCellRowSpan > 1) {
            var avgCount = Math.ceil(activeCellRowSpan / 2);
            // eslint-disable-next-line
            1 < avgCount ? this.activeCell.setAttribute('rowspan', avgCount.toString()) :
                this.activeCell.removeAttribute('rowspan');
            // eslint-disable-next-line
            1 < (activeCellRowSpan - avgCount) ? newCell.setAttribute('rowspan', (activeCellRowSpan - avgCount).toString()) : newCell.removeAttribute('rowspan');
            var avgRowIndex = void 0;
            var colIndex = void 0;
            for (avgRowIndex = activeCellIndex[0] + Math.ceil(activeCellRowSpan / 2),
                colIndex = 0 === activeCellIndex[1] ? activeCellIndex[1]
                    : activeCellIndex[1] - 1; 0 <= colIndex && (correspondingCells[avgRowIndex][colIndex] ===
                // eslint-disable-next-line max-len
                correspondingCells[avgRowIndex][colIndex - 1] || 0 < avgRowIndex && correspondingCells[avgRowIndex][colIndex]
                === correspondingCells[avgRowIndex - 1][colIndex]);) {
                colIndex--;
            }
            if (colIndex === -1) {
                // eslint-disable-next-line
                this.curTable.rows[avgRowIndex].firstChild ? this.curTable.rows[avgRowIndex].prepend(newCell) : this.curTable.appendChild(newCell);
            }
            else {
                correspondingCells[avgRowIndex][colIndex].insertAdjacentElement('afterend', newCell);
            }
        }
        else {
            var newTrEle = createElement('tr');
            newTrEle.appendChild(newCell);
            var selectedRow = correspondingCells[activeCellIndex[0]];
            for (var j = 0; j <= selectedRow.length - 1; j++) {
                if (selectedRow[j] !== selectedRow[j - 1] && selectedRow[j] !== this.activeCell) {
                    selectedRow[j].setAttribute('rowspan', ((parseInt(selectedRow[j].getAttribute('rowspan'), 10) ?
                        parseInt(selectedRow[j].getAttribute('rowspan'), 10) : 1) + 1).toString());
                }
            }
            this.activeCell.parentNode.insertAdjacentElement('afterend', newTrEle);
        }
        if (e.callBack) {
            e.callBack({
                requestType: e.item.subCommand,
                editorMode: 'HTML',
                event: e.event,
                range: this.parent.nodeSelection.getRange(this.parent.currentDocument),
                elements: this.parent.nodeSelection.getSelectedNodes(this.parent.currentDocument)
            });
        }
    };
    TableCommand.prototype.VerticalSplit = function (e) {
        var selectedCell = e.item.selection.range.startContainer;
        this.curTable = closest(selectedCell.parentElement, 'table');
        if (this.curTable.querySelectorAll('.e-cell-select').length > 1) {
            return;
        }
        this.activeCell = this.curTable.querySelector('.e-cell-select');
        var allRows = this.curTable.rows;
        var newCell = this.activeCell.cloneNode(true);
        newCell.removeAttribute('class');
        newCell.innerHTML = '</br>';
        var avgWidth = parseFloat(this.activeCell.style.width) / 2;
        if (this.activeCell.tagName === 'TH' && isNaN(avgWidth)) {
            var cellCount = this.curTable.querySelector('tr').childElementCount;
            var colSpanCount = 0;
            for (var i = 0; i < cellCount; i++) {
                colSpanCount = colSpanCount + (parseInt(this.curTable.querySelector('tr').children[i].getAttribute('colspan'), 10) || 1);
            }
            avgWidth = parseFloat((((this.activeCell.offsetWidth / 2) / this.curTable.offsetWidth) * 100).toFixed(1));
        }
        var activeCellIndex = this.getCorrespondingIndex(this.activeCell, this.getCorrespondingColumns());
        var correspondingColumns = this.getCorrespondingColumns();
        var activeCellcolSpan = parseInt(this.activeCell.getAttribute('colspan'), 10);
        if (activeCellcolSpan > 1) {
            // eslint-disable-next-line
            1 < Math.ceil(activeCellcolSpan / 2) ? this.activeCell.setAttribute('colspan', (activeCellcolSpan / 2).toString())
                : this.activeCell.removeAttribute('colspan');
            // eslint-disable-next-line
            1 < (activeCellcolSpan - activeCellcolSpan / 2) ? newCell.setAttribute('colspan', 
            // eslint-disable-next-line
            (activeCellcolSpan - activeCellcolSpan / 2).toString()) : newCell.removeAttribute('colspan');
        }
        else {
            for (var i = 0; i <= allRows.length - 1; i++) {
                if (0 === i || correspondingColumns[i][activeCellIndex[1]] !== correspondingColumns[i - 1][activeCellIndex[1]]) {
                    var currentCell = correspondingColumns[i][activeCellIndex[1]];
                    if (currentCell !== this.activeCell) {
                        currentCell.setAttribute('colspan', ((parseInt(currentCell.getAttribute('colspan'), 10) ?
                            parseInt(currentCell.getAttribute('colspan'), 10) : 1) + 1).toString());
                    }
                }
            }
        }
        this.activeCell.style.width = avgWidth + '%';
        newCell.style.width = avgWidth + '%';
        this.activeCell.parentNode.insertBefore(newCell, this.activeCell.nextSibling);
        if (e.callBack) {
            e.callBack({
                requestType: e.item.subCommand,
                editorMode: 'HTML',
                event: e.event,
                range: this.parent.nodeSelection.getRange(this.parent.currentDocument),
                elements: this.parent.nodeSelection.getSelectedNodes(this.parent.currentDocument)
            });
        }
    };
    TableCommand.prototype.getCorrespondingColumns = function () {
        var elementArray = [];
        // eslint-disable-next-line
        var _this = this;
        var colspan = 0;
        var allRows = _this.curTable.rows;
        for (var i = 0; i <= allRows.length - 1; i++) {
            var ele = allRows[i];
            var index = 0;
            for (var j = 0; j <= ele.children.length - 1; j++) {
                /* eslint-disable */
                var colEle = ele.children[j];
                for (var ele_1 = colEle, colspan_1 = parseInt(ele_1.getAttribute('colspan'), 10) || 1, rowSpan = parseInt(ele_1.getAttribute('rowspan'), 10) || 1, rowIndex = i; rowIndex < i + rowSpan; rowIndex++) {
                    for (var colIndex = index; colIndex < index + colspan_1; colIndex++) {
                        elementArray[rowIndex] || (elementArray[rowIndex] = []);
                        elementArray[rowIndex][colIndex] ? index++ : elementArray[rowIndex][colIndex] = colEle;
                    }
                }
                index += colspan;
            }
            /* eslint-enable */
        }
        return elementArray;
    };
    // eslint-disable-next-line
    TableCommand.prototype.FindIndex = function (rowIndex, columnIndex, cells) {
        var nextIndex;
        var nextCol;
        for (nextIndex = rowIndex + 1, nextCol = columnIndex + 1; nextIndex < cells.length;) {
            if (cells[nextIndex][columnIndex] !== cells[rowIndex][columnIndex]) {
                nextIndex--;
                break;
            }
            nextIndex++;
        }
        for (nextIndex === cells.length && nextIndex--; nextCol < cells[rowIndex].length;) {
            if (cells[rowIndex][nextCol] !== cells[rowIndex][columnIndex]) {
                nextCol--;
                break;
            }
            nextCol++;
        }
        return nextCol === cells[rowIndex].length && nextCol--,
            [
                nextIndex,
                nextCol
            ];
    };
    TableCommand.prototype.getCorrespondingIndex = function (cell, allCells) {
        //let value: RowCol = new RowCol();
        for (var i = 0; i < allCells.length; i++) {
            for (var j = 0; j < allCells[i].length; j++) {
                if (allCells[i][j] === cell) {
                    return [i, j];
                }
            }
        }
        return [];
    };
    TableCommand.prototype.highlightCells = function (minRow, maxRow, minCol, maxCol, eleArray) {
        var j;
        var k;
        var startCell;
        var endCell;
        var minRowIndex = minRow;
        var maxRowIndex = maxRow;
        var minColIndex = minCol;
        var maxColIndex = maxCol;
        var minMaxValues = new MinMax();
        for (j = minRowIndex; j <= maxRowIndex; j++) {
            /* eslint-disable */
            if ((1 < (parseInt(eleArray[j][minColIndex].getAttribute('rowspan'), 10) || 1) ||
                1 < (parseInt(eleArray[j][minColIndex].getAttribute('colspan'), 10) || 1)) &&
                (endCell = this.FindIndex((startCell = this.getCorrespondingIndex(eleArray[j][minColIndex], eleArray))[0], startCell[1], eleArray))) {
                minRowIndex = Math.min(startCell[0], minRowIndex);
                maxRowIndex = Math.max(endCell[0], maxRowIndex);
                minColIndex = Math.min(startCell[1], minColIndex);
                maxColIndex = Math.max(endCell[1], maxColIndex);
            }
            else if ((1 < (parseInt(eleArray[j][maxColIndex].getAttribute('rowspan'), 10) || 1) ||
                1 < (parseInt(eleArray[j][maxColIndex].getAttribute('colspan'), 10) || 1)) &&
                (endCell = this.FindIndex((startCell = this.getCorrespondingIndex(eleArray[j][maxColIndex], eleArray))[0], startCell[1], eleArray))) {
                minRowIndex = Math.min(startCell[0], minRowIndex);
                maxRowIndex = Math.max(endCell[0], maxRowIndex);
                minColIndex = Math.min(startCell[1], minColIndex);
                maxColIndex = Math.max(endCell[1], maxColIndex);
            }
            for (k = minColIndex; k <= maxColIndex; k++) {
                if ((1 < (parseInt(eleArray[minRowIndex][k].getAttribute('rowspan'), 10) || 1) ||
                    1 < (parseInt(eleArray[minRowIndex][k].getAttribute('colspan'), 10) || 1)) &&
                    (endCell = this.FindIndex((startCell = this.getCorrespondingIndex(eleArray[minRowIndex][k], eleArray))[0], startCell[1], eleArray))) {
                    minRowIndex = Math.min(startCell[0], minRowIndex);
                    maxRowIndex = Math.max(endCell[0], maxRowIndex);
                    minColIndex = Math.min(startCell[1], minColIndex);
                    maxColIndex = Math.max(endCell[1], maxColIndex);
                }
                else if ((1 < (parseInt(eleArray[maxRowIndex][k].getAttribute('rowspan'), 10) || 1) ||
                    1 < (parseInt(eleArray[maxRowIndex][k].getAttribute('colspan'), 10) || 1)) &&
                    (endCell = this.FindIndex((startCell = this.getCorrespondingIndex(eleArray[maxRowIndex][k], eleArray))[0], startCell[1], eleArray))) {
                    minRowIndex = Math.min(startCell[0], minRowIndex);
                    maxRowIndex = Math.max(endCell[0], maxRowIndex);
                    minColIndex = Math.min(startCell[1], minColIndex);
                    maxColIndex = Math.max(endCell[1], maxColIndex);
                }
            }
            minMaxValues = minRowIndex === minRow && maxRowIndex === maxRow && minColIndex === minCol && maxColIndex === maxCol ? {
                startRow: minRow,
                endRow: maxRow,
                startColumn: minCol,
                endColumn: maxCol
            } : this.highlightCells(minRowIndex, maxRowIndex, minColIndex, maxColIndex, eleArray);
        }
        return minMaxValues;
        /* eslint-enable */
    };
    TableCommand.prototype.tableMove = function (e) {
        this.activeCell = e.selectNode[0];
        var target = e.event.target;
        var activeCellTag = this.activeCell.tagName;
        var targetCellTag = target.tagName;
        this.curTable = closest(target, 'table');
        if (this.curTable.querySelectorAll('.e-cell-select').length > 1) {
            this.parent.nodeSelection.Clear(this.parent.currentDocument);
        }
        if ((target.tagName !== 'TD' && target.tagName !== 'TH') && activeCellTag !== targetCellTag) {
            return;
        }
        var activeRowIndex = Array.prototype.slice.call((this.activeCell).parentElement.parentElement.children)
            .indexOf((this.activeCell).parentElement);
        var activeColumnIndex = Array.prototype.slice.call((this.activeCell).parentElement.children).indexOf(this.activeCell);
        var targetRowIndex = Array.prototype.slice.call(target.parentElement.parentElement.children)
            .indexOf(target.parentElement);
        var targetColumnIndex = Array.prototype.slice.call(target.parentElement.children).indexOf(target);
        var activeCellList = this.curTable.querySelectorAll('.e-cell-select');
        for (var i = activeCellList.length - 1; i >= 0; i--) {
            if (this.activeCell !== activeCellList[i]) {
                activeCellList[i].classList.remove('e-cell-select');
            }
        }
        if (activeRowIndex === targetRowIndex && activeColumnIndex === targetColumnIndex) {
            return;
        }
        var correspondingCells = this.getCorrespondingColumns();
        var activeIndexes = this.getCorrespondingIndex(this.activeCell, correspondingCells);
        var targetIndexes = this.getCorrespondingIndex(target, correspondingCells);
        var minMaxIndexes = this.highlightCells(Math.min(activeIndexes[0], targetIndexes[0]), Math.max(activeIndexes[0], 
        /* eslint-disable */
        targetIndexes[0]), Math.min(activeIndexes[1], targetIndexes[1]), Math.max(activeIndexes[1], targetIndexes[1]), correspondingCells);
        for (var rowIndex = minMaxIndexes.startRow; rowIndex <= minMaxIndexes.endRow; rowIndex++) {
            for (var colIndex = minMaxIndexes.startColumn; colIndex <= minMaxIndexes.endColumn; colIndex++) {
                correspondingCells[rowIndex][colIndex].classList.add('e-cell-select');
            }
        }
        if (this.parent.nodeSelection.range) {
            this.parent.nodeSelection.setSelectionText(this.parent.currentDocument, this.parent.nodeSelection.range.endContainer, this.parent.nodeSelection.range.endContainer, 0, 0);
            this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, this.parent.nodeSelection.range.endContainer, 0);
        }
    };
    ;
    return TableCommand;
}());
export { TableCommand };
var MinMax = /** @class */ (function () {
    function MinMax() {
    }
    return MinMax;
}());
