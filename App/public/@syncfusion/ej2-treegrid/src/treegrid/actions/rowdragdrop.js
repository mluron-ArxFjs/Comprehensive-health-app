import { Grid, RowDD as GridDragDrop, parentsUntil } from '@syncfusion/ej2-grids';
import { getObject, Scroll } from '@syncfusion/ej2-grids';
import { closest, isNullOrUndefined, classList, setValue, extend, getValue, removeClass, addClass, setStyleAttribute } from '@syncfusion/ej2-base';
import { DataManager } from '@syncfusion/ej2-data';
import * as events from '../base/constant';
import { editAction } from './crud-actions';
import { getParentData, findChildrenRecords, isRemoteData, isOffline, isCountRequired } from '../utils';
/**
 * TreeGrid RowDragAndDrop module
 *
 * @hidden
 */
var RowDD = /** @class */ (function () {
    /**
     * Constructor for render module
     *
     * @param {TreeGrid} parent - Tree Grid instance
     */
    function RowDD(parent) {
        /** @hidden */
        this.canDrop = true;
        /** @hidden */
        this.isDraggedWithChild = false;
        /** @hidden */
        this.modifiedRecords = 'modifiedRecords';
        /** @hidden */
        this.selectedRecords = 'selectedRecords';
        /** @hidden */
        this.selectedRows = 'selectedRows';
        /** @hidden */
        this.hasDropItem = true;
        /** @hidden */
        this.isaddtoBottom = false;
        Grid.Inject(GridDragDrop);
        this.parent = parent;
        this.addEventListener();
    }
    RowDD.prototype.getChildrecordsByParentID = function (id) {
        var treeGridDataSource;
        if (this.parent.dataSource instanceof DataManager && isOffline(this.parent)) {
            treeGridDataSource = this.parent.grid.dataSource.dataSource.json;
        }
        else {
            treeGridDataSource = this.parent.grid.dataSource;
        }
        var record = treeGridDataSource.filter(function (e) {
            return e.uniqueID === id;
        });
        return record;
    };
    /**
     * @hidden
     * @returns {void}
     */
    RowDD.prototype.addEventListener = function () {
        this.parent.on(events.rowdraging, this.Rowdraging, this);
        this.parent.on(events.rowDropped, this.rowDropped, this);
        this.parent.on(events.rowsAdd, this.rowsAdded, this);
        this.parent.on(events.rowsRemove, this.rowsRemoved, this);
    };
    /**
     * Reorder the rows based on given indexes and position
     *
     * @returns {void}
     * @param {number[]} fromIndexes - source indexes of rows to be re-ordered
     * @param {number} toIndex - Destination row index
     * @param {string} position - Drop position as above or below or child
     */
    RowDD.prototype.reorderRows = function (fromIndexes, toIndex, position) {
        var tObj = this.parent;
        var action = 'action';
        var dropPosition = 'dropPosition';
        var updateRowAndCellElements = 'updateRowAndCellElements';
        if (fromIndexes[0] !== toIndex && ['above', 'below', 'child'].indexOf(position) !== -1) {
            if (position === 'above') {
                this.dropPosition = 'topSegment';
            }
            if (position === 'below') {
                this.dropPosition = 'bottomSegment';
            }
            if (position === 'child') {
                this.dropPosition = 'middleSegment';
            }
            this.parent["" + dropPosition] = this.dropPosition;
            var data = [];
            for (var i = 0; i < fromIndexes.length; i++) {
                var index = this.parent.getRowByIndex(fromIndexes[parseInt(i.toString(), 10)]).rowIndex;
                data[parseInt(i.toString(), 10)] = this.parent.getCurrentViewRecords()[parseInt(index.toString(), 10)];
            }
            var isByMethod = true;
            var args = {
                data: data,
                dropIndex: toIndex
            };
            if (!isCountRequired(this.parent)) {
                this.dropRows(args, isByMethod);
            }
            //this.refreshGridDataSource();
            if (tObj.isLocalData) {
                tObj.flatData = this.orderToIndex(tObj.flatData);
            }
            if (this.parent["" + action] === 'outdenting') {
                if (!isNullOrUndefined(data[0].parentItem)) {
                    data[0].level = data[0].parentItem.level + 1;
                }
            }
            this.parent.grid.refresh();
            if (this.parent.enableImmutableMode && this.dropPosition === 'middleSegment') {
                var index = void 0;
                if (this.parent.allowRowDragAndDrop) {
                    index = this.parent.treeColumnIndex + 1;
                }
                else if (this.parent["" + action] === 'indenting') {
                    index = this.parent.treeColumnIndex;
                }
                var row = this.parent.getRows()[fromIndexes[0]];
                var dropData = args.data[0];
                var totalRecord = [];
                var rows = [];
                totalRecord.push(dropData);
                rows.push(row);
                var parentUniqueID = 'parentUniqueID';
                var parentData = getParentData(this.parent, args.data[0]["" + parentUniqueID]);
                var parentrow = this.parent.getRows()[parseInt(toIndex.toString(), 10)];
                totalRecord.push(parentData);
                rows.push(parentrow);
                this.parent["" + updateRowAndCellElements](totalRecord, rows, index);
            }
            if (this.parent.enableImmutableMode && this.parent["" + action] === 'outdenting') {
                var index = void 0;
                if (this.parent.allowRowDragAndDrop) {
                    index = this.parent.treeColumnIndex + 1;
                }
                else if (this.parent["" + action] === 'outdenting') {
                    index = this.parent.treeColumnIndex;
                }
                var record = args.data[0];
                var row = this.parent.getRows()[fromIndexes[0]];
                var totalRecord = [];
                var rows = [];
                totalRecord.push(record);
                rows.push(row);
                this.parent["" + updateRowAndCellElements](totalRecord, rows, index);
            }
        }
        else {
            return;
        }
    };
    RowDD.prototype.indentOutdentAction = function (record, request) {
        var tObj = this.parent;
        var action = 'action';
        var droppedIndex = 'dropIndex';
        var selectedItemIndex = -1;
        if (isNullOrUndefined(record) && this.parent.selectedRowIndex === -1) {
            return;
        }
        else {
            if (this.parent.enableVirtualization && this.parent.selectedRowIndex !== -1) {
                selectedItemIndex = this.parent.getSelectedRows()[0].rowIndex;
            }
            else if (this.parent.selectedRowIndex !== -1) {
                selectedItemIndex = this.parent.selectedRowIndex;
            }
            this.selectedItem = isNullOrUndefined(record) ?
                tObj.getCurrentViewRecords()[parseInt(selectedItemIndex.toString(), 10)] : record;
            var primaryKeyField = this.parent.getPrimaryKeyFieldNames()[0];
            var rowIndex = this.parent.grid.getRowIndexByPrimaryKey(this.selectedItem["" + primaryKeyField]);
            this.selectedRow = this.parent[this.selectedRows] = selectedItemIndex !== -1 ?
                this.parent.getSelectedRows()[0]
                : this.parent.grid.getRowByIndex(rowIndex);
            this.selectedRecord = this.parent[this.selectedRecords] = selectedItemIndex !== -1 ?
                tObj.getCurrentViewRecords()[parseInt(selectedItemIndex.toString(), 10)]
                : this.selectedItem;
            if (request === 'indent') {
                var record_1 = tObj.getCurrentViewRecords()[this.selectedRow.rowIndex - 1];
                var dropIndex = void 0;
                if (this.selectedRow.rowIndex === 0 || this.selectedRow.rowIndex === -1 ||
                    tObj.getCurrentViewRecords()[this.selectedRow.rowIndex].level - record_1.level === 1) {
                    return;
                }
                if (record_1.level > this.selectedRecord.level) {
                    for (var i = 0; i < tObj.getCurrentViewRecords().length; i++) {
                        if (tObj.getCurrentViewRecords()[parseInt(i.toString(), 10)].taskData ===
                            record_1.parentItem.taskData) {
                            dropIndex = i;
                            if (tObj.enableVirtualization) {
                                dropIndex = parseInt(tObj.getRows()[parseInt(i.toString(), 10)].getAttribute('data-rowindex'), 10);
                            }
                        }
                    }
                }
                else {
                    dropIndex = this.selectedRow.rowIndex - 1;
                }
                if (this.parent.enableVirtualization && this.selectedRecord && !(record_1.level > this.selectedRecord.level)) {
                    dropIndex = parseInt(this.selectedRow.getAttribute('data-rowindex'), 10) - 1;
                }
                tObj["" + action] = 'indenting';
                tObj["" + droppedIndex] = dropIndex;
                this.eventTrigger('indenting', dropIndex);
            }
            else if (request === 'outdent') {
                if (this.selectedRow.rowIndex === -1 || this.selectedRow.rowIndex === 0 ||
                    tObj.getCurrentViewRecords()[this.selectedRow.rowIndex].level === 0) {
                    return;
                }
                var dropIndex = void 0;
                var parentItem = this.selectedRecord.parentItem;
                for (var i = 0; i < tObj.getCurrentViewRecords().length; i++) {
                    if (tObj.getCurrentViewRecords()[parseInt(i.toString(), 10)].uniqueID === parentItem.uniqueID) {
                        dropIndex = i;
                    }
                }
                if (this.parent.enableVirtualization && this.selectedRecord) {
                    dropIndex = parseInt(this.parent.getRows()[parseInt(dropIndex.toString(), 10)].getAttribute('data-rowindex'), 10);
                }
                tObj["" + action] = 'outdenting';
                tObj["" + droppedIndex] = dropIndex;
                this.eventTrigger('outdenting', dropIndex);
            }
        }
    };
    RowDD.prototype.eventTrigger = function (action, dropIndex) {
        var _this = this;
        var actionArgs = {
            action: action,
            cancel: false,
            data: [this.parent[this.selectedRecords]],
            row: this.parent[this.selectedRows]
        };
        this.parent.trigger(events.actionBegin, actionArgs, function (actionArgs) {
            if (!actionArgs.cancel) {
                if (actionArgs.action === 'indenting') {
                    if (_this.parent.enableVirtualization) {
                        _this.reorderRows([parseInt(_this.selectedRow.getAttribute('data-rowindex'), 10)], dropIndex, 'child');
                    }
                    else {
                        _this.reorderRows([_this.selectedRow.rowIndex], dropIndex, 'child');
                    }
                }
                else if (actionArgs.action === 'outdenting') {
                    if (_this.parent.enableVirtualization) {
                        _this.reorderRows([parseInt(_this.selectedRow.getAttribute('data-rowindex'), 10)], dropIndex, 'below');
                    }
                    else {
                        _this.reorderRows([_this.selectedRow.rowIndex], dropIndex, 'below');
                    }
                }
            }
        });
    };
    RowDD.prototype.orderToIndex = function (currentData) {
        for (var i = 0; i < currentData.length; i++) {
            currentData[parseInt(i.toString(), 10)].index = i;
            if (!isNullOrUndefined(currentData[parseInt(i.toString(), 10)].parentItem)) {
                var updatedParent = getValue('uniqueIDCollection.' + currentData[parseInt(i.toString(), 10)].parentUniqueID, this.parent);
                currentData[parseInt(i.toString(), 10)].parentItem.index = updatedParent.index;
            }
        }
        return currentData;
    };
    RowDD.prototype.rowsAdded = function (e) {
        var draggedRecord;
        var dragRecords = e.records;
        for (var i = e.records.length - 1; i > -1; i--) {
            draggedRecord = dragRecords[parseInt(i.toString(), 10)];
            if (draggedRecord.parentUniqueID) {
                var record = dragRecords.filter(function (data) {
                    return data.uniqueID === draggedRecord.parentUniqueID;
                });
                if (record.length) {
                    var index = record[0].childRecords.indexOf(draggedRecord);
                    var parentRecord = record[0];
                    if (index !== -1) {
                        if (isNullOrUndefined(this.parent.idMapping)) {
                            parentRecord.childRecords.splice(index, 1);
                            if (!parentRecord.childRecords.length) {
                                parentRecord.hasChildRecords = false;
                                parentRecord.hasFilteredChildRecords = false;
                            }
                        }
                        this.isDraggedWithChild = true;
                    }
                }
            }
        }
        if (isNullOrUndefined(this.parent.dataSource) || !this.parent.dataSource.length) {
            var tObj = this.parent;
            var draggedRecord_1;
            var dragRecords_1 = e.records;
            var dragLength = e.records.length;
            for (var i = dragLength - 1; i > -1; i--) {
                draggedRecord_1 = dragRecords_1[parseInt(i.toString(), 10)];
                if (!i && draggedRecord_1.hasChildRecords) {
                    draggedRecord_1.taskData[this.parent.parentIdMapping] = null;
                }
                var recordIndex1 = 0;
                if (!isNullOrUndefined(tObj.parentIdMapping)) {
                    tObj.childMapping = null;
                }
                if (!isNullOrUndefined(draggedRecord_1.taskData) && !isNullOrUndefined(tObj.childMapping) &&
                    !Object.prototype.hasOwnProperty.call(draggedRecord_1.taskData, tObj.childMapping)) {
                    draggedRecord_1.taskData[tObj.childMapping] = [];
                }
                if (Object.prototype.hasOwnProperty.call(draggedRecord_1, tObj.childMapping) &&
                    (draggedRecord_1[tObj.childMapping]).length && !this.isDraggedWithChild &&
                    !isNullOrUndefined(tObj.parentIdMapping)) {
                    var childData = (draggedRecord_1[tObj.childMapping]);
                    for (var j = 0; j < childData.length; j++) {
                        if (dragRecords_1.indexOf(childData[parseInt(j.toString(), 10)]) === -1) {
                            dragRecords_1.splice(j, 0, childData[parseInt(j.toString(), 10)]);
                            childData[parseInt(j.toString(), 10)].taskData = extend({}, childData[parseInt(j.toString(), 10)]);
                            i += 1;
                        }
                    }
                }
                if (Object.prototype.hasOwnProperty.call(draggedRecord_1, tObj.parentIdMapping)
                    && draggedRecord_1[tObj.parentIdMapping] !== null
                    && !this.isDraggedWithChild) {
                    draggedRecord_1.taskData[tObj.parentIdMapping] = null;
                    delete draggedRecord_1.parentItem;
                    delete draggedRecord_1.parentUniqueID;
                }
                if (isNullOrUndefined(tObj.dataSource)) {
                    tObj.dataSource = [];
                }
                tObj.dataSource.splice(recordIndex1, 0, draggedRecord_1.taskData);
            }
            tObj.setProperties({ dataSource: tObj.dataSource }, false);
        }
        else {
            for (var i = 0; i < dragRecords.length; i++) {
                setValue('uniqueIDCollection.' + dragRecords[parseInt(i.toString(), 10)].uniqueID, dragRecords[parseInt(i.toString(), 10)], this.parent);
            }
            var args = { data: e.records, dropIndex: e.toIndex };
            if (this.parent.dataSource instanceof DataManager) {
                this.treeGridData = this.parent.dataSource.dataSource.json;
                this.treeData = this.parent.dataSource.dataSource.json;
            }
            else {
                this.treeGridData = this.parent.grid.dataSource;
                this.treeData = this.parent.dataSource;
            }
            if (isNullOrUndefined(this.dropPosition)) {
                this.dropPosition = 'bottomSegment';
                args.dropIndex = this.parent.getCurrentViewRecords().length > 1 ? this.parent.getCurrentViewRecords().length - 1 :
                    args.dropIndex;
                args.data = args.data.map(function (i) {
                    if (i.hasChildRecords && isNullOrUndefined(i.parentItem)) {
                        i.level = 0;
                        return i;
                    }
                    else {
                        delete i.parentItem;
                        delete i.parentUniqueID;
                        i.level = 0;
                        return i;
                    }
                });
            }
            this.dropRows(args);
        }
    };
    RowDD.prototype.rowsRemoved = function (e) {
        for (var i = 0; i < e.records.length; i++) {
            this.draggedRecord = e.records[parseInt(i.toString(), 10)];
            if (this.draggedRecord.hasChildRecords || this.draggedRecord.parentItem &&
                this.parent.grid.dataSource.
                    indexOf(this.getChildrecordsByParentID(this.draggedRecord.parentUniqueID)[0]) !== -1 ||
                this.draggedRecord.level === 0) {
                this.deleteDragRow();
            }
        }
    };
    RowDD.prototype.refreshGridDataSource = function () {
        var draggedRecord = this.draggedRecord;
        var droppedRecord = this.droppedRecord;
        var proxy = this.parent;
        var tempDataSource;
        var idx;
        if (this.parent.dataSource instanceof DataManager && isOffline(this.parent)) {
            tempDataSource = proxy.dataSource.dataSource.json;
        }
        else {
            tempDataSource = proxy.dataSource;
        }
        // eslint-disable-next-line max-len
        if (tempDataSource && (!isNullOrUndefined(droppedRecord) && !droppedRecord.parentItem) && !isNullOrUndefined(droppedRecord.taskData)) {
            var keys = Object.keys(tempDataSource);
            for (var i = 0; i < keys.length; i++) {
                if (tempDataSource[parseInt(i.toString(), 10)][this.parent.childMapping] ===
                    droppedRecord.taskData[this.parent.childMapping]) {
                    idx = i;
                }
            }
            if (this.dropPosition === 'topSegment') {
                if (!this.parent.idMapping) {
                    tempDataSource.splice(idx, 0, draggedRecord.taskData);
                }
            }
            else if (this.dropPosition === 'bottomSegment') {
                if (!this.parent.idMapping) {
                    tempDataSource.splice(idx + 1, 0, draggedRecord.taskData);
                }
            }
        }
        else if (!this.parent.parentIdMapping && (!isNullOrUndefined(droppedRecord) && droppedRecord.parentItem)) {
            if (this.dropPosition === 'topSegment' || this.dropPosition === 'bottomSegment') {
                var record = this.getChildrecordsByParentID(droppedRecord.parentUniqueID)[0];
                var childRecords = record.childRecords;
                for (var i = 0; i < childRecords.length; i++) {
                    droppedRecord.parentItem.taskData[this.parent.childMapping][parseInt(i.toString(), 10)]
                        = childRecords[parseInt(i.toString(), 10)].taskData;
                }
            }
        }
        if (this.parent.parentIdMapping) {
            if (draggedRecord.parentItem) {
                if (this.dropPosition === 'topSegment' || this.dropPosition === 'bottomSegment') {
                    draggedRecord[this.parent.parentIdMapping] = droppedRecord[this.parent.parentIdMapping];
                    draggedRecord.taskData[this.parent.parentIdMapping] = droppedRecord[this.parent.parentIdMapping];
                }
                else {
                    draggedRecord[this.parent.parentIdMapping] = droppedRecord[this.parent.idMapping];
                    draggedRecord.taskData[this.parent.parentIdMapping] = droppedRecord[this.parent.idMapping];
                }
            }
            else {
                draggedRecord.taskData[this.parent.parentIdMapping] = null;
                draggedRecord[this.parent.parentIdMapping] = null;
            }
        }
    };
    RowDD.prototype.removeFirstrowBorder = function (element) {
        var canremove = this.dropPosition === 'bottomSegment';
        if (this.parent.element.getElementsByClassName('e-firstrow-border').length > 0 && element &&
            (element.rowIndex !== 0 || canremove)) {
            this.parent.element.getElementsByClassName('e-firstrow-border')[0].remove();
        }
    };
    RowDD.prototype.removeLastrowBorder = function (element) {
        var isEmptyRow = element && (element.classList.contains('e-emptyrow') || element.classList.contains('e-columnheader')
            || element.classList.contains('e-detailrow'));
        var islastRowIndex;
        if (this.parent.enableVirtualization) {
            islastRowIndex = element && !isEmptyRow &&
                this.parent.getRows()[this.parent.getCurrentViewRecords().length - 1].getAttribute('data-uid') !==
                    element.getAttribute('data-uid');
        }
        else {
            islastRowIndex = element && !isEmptyRow &&
                this.parent.getRowByIndex(this.parent.getCurrentViewRecords().length - 1).getAttribute('data-uid') !==
                    element.getAttribute('data-uid');
        }
        var canremove = islastRowIndex || this.dropPosition === 'topSegment';
        if (this.parent.element.getElementsByClassName('e-lastrow-border').length > 0 && element && (islastRowIndex || canremove)) {
            this.parent.element.getElementsByClassName('e-lastrow-border')[0].remove();
        }
    };
    RowDD.prototype.updateIcon = function (row, index, args) {
        var rowEle = args.target ? closest(args.target, 'tr') : null;
        this.dropPosition = undefined;
        var rowPositionHeight = 0;
        this.removeFirstrowBorder(rowEle);
        this.removeLastrowBorder(rowEle);
        for (var i = 0; i < args.rows.length; i++) {
            if (!isNullOrUndefined(rowEle) && rowEle.getAttribute('data-uid') === args.rows[parseInt(i.toString(), 10)].getAttribute('data-uid')
                || !parentsUntil(args.target, 'e-gridcontent')) {
                this.dropPosition = 'Invalid';
                this.addErrorElem();
            }
        }
        // To get the corresponding drop position related to mouse position
        var tObj = this.parent;
        var rowTop = 0;
        var roundOff = 0;
        var toolHeight = tObj.toolbar && tObj.toolbar.length ?
            document.getElementById(tObj.element.id + '_gridcontrol_toolbarItems').offsetHeight : 0;
        // tObj.lastRow = tObj.getRowByIndex(tObj.getCurrentViewRecords().length - 1);
        var positionOffSet = this.getOffset(tObj.element);
        // let contentHeight1: number = (tObj.element.offsetHeight  - (tObj.getContent() as HTMLElement).offsetHeight) + positionOffSet.top;
        var contentHeight = tObj.getHeaderContent().offsetHeight + positionOffSet.top + toolHeight;
        var scrollTop = tObj.getContent().firstElementChild.scrollTop;
        if (!isNullOrUndefined(rowEle)) {
            rowPositionHeight = rowEle.offsetTop - scrollTop;
        }
        // let scrollTop = (tObj.grid.scrollModule as any).content.scrollTop;
        if (this.parent.enableVirtualization) {
            rowTop = rowEle.getBoundingClientRect().top;
        }
        else {
            rowTop = rowPositionHeight + contentHeight + roundOff;
        }
        var rowBottom = rowTop + row[0].offsetHeight;
        var difference = rowBottom - rowTop;
        var divide = difference / 3;
        var topRowSegment = rowTop + divide;
        var middleRowSegment = topRowSegment + divide;
        var bottomRowSegment = middleRowSegment + divide;
        var mouseEvent = getObject('originalEvent.event', args);
        var touchEvent = getObject('originalEvent.event', args);
        var posy = (mouseEvent.type === 'mousemove') ? mouseEvent.pageY : ((!isNullOrUndefined(touchEvent) &&
            !isNullOrUndefined(touchEvent.changedTouches)) ? touchEvent.changedTouches[0].pageY : null);
        var isTopSegment = posy <= topRowSegment;
        var isMiddleRowSegment = (posy > topRowSegment && posy <= middleRowSegment);
        var isBottomRowSegment = (posy > middleRowSegment && posy <= bottomRowSegment);
        if (isTopSegment || isMiddleRowSegment || isBottomRowSegment) {
            if (isTopSegment && this.dropPosition !== 'Invalid') {
                this.removeChildBorder();
                this.dropPosition = 'topSegment';
                this.removetopOrBottomBorder();
                this.addFirstrowBorder(rowEle);
                this.removeErrorElem();
                this.removeLastrowBorder(rowEle);
                this.topOrBottomBorder(args.target);
            }
            if (isMiddleRowSegment && this.dropPosition !== 'Invalid') {
                this.removetopOrBottomBorder();
                var rowElement = [];
                var element = closest(args.target, 'tr');
                rowElement = [].slice.call(element.querySelectorAll('.e-rowcell,.e-rowdragdrop,.e-detailrowcollapse'));
                if (rowElement.length > 0) {
                    this.addRemoveClasses(rowElement, true, 'e-childborder');
                }
                this.addLastRowborder(rowEle);
                this.addFirstrowBorder(rowEle);
                this.dropPosition = 'middleSegment';
            }
            if (isBottomRowSegment && this.dropPosition !== 'Invalid') {
                this.removeErrorElem();
                this.removetopOrBottomBorder();
                this.removeChildBorder();
                this.dropPosition = 'bottomSegment';
                this.addLastRowborder(rowEle);
                this.removeFirstrowBorder(rowEle);
                this.topOrBottomBorder(args.target);
            }
        }
        return this.dropPosition;
    };
    RowDD.prototype.removeChildBorder = function () {
        var borderElem = [];
        borderElem = [].slice.call(this.parent.element.querySelectorAll('.e-childborder'));
        if (borderElem.length > 0) {
            this.addRemoveClasses(borderElem, false, 'e-childborder');
        }
    };
    RowDD.prototype.addFirstrowBorder = function (targetRow) {
        var node = this.parent.element;
        var tObj = this.parent;
        if (targetRow && targetRow.rowIndex === 0 && !targetRow.classList.contains('e-emptyrow')) {
            var div = this.parent.createElement('div', { className: 'e-firstrow-border' });
            var gridheaderEle = this.parent.getHeaderContent();
            var toolbarHeight = 0;
            if (tObj.toolbar) {
                toolbarHeight = tObj.toolbarModule.getToolbar().offsetHeight;
            }
            var multiplegrid = !isNullOrUndefined(this.parent.rowDropSettings.targetID);
            if (multiplegrid) {
                div.style.top = this.parent.grid.element.getElementsByClassName('e-gridheader')[0].offsetHeight
                    + toolbarHeight + 'px';
            }
            div.style.width = multiplegrid ? node.offsetWidth + 'px' :
                node.offsetWidth - this.getScrollWidth() + 'px';
            if (!gridheaderEle.querySelectorAll('.e-firstrow-border').length) {
                gridheaderEle.appendChild(div);
            }
        }
    };
    RowDD.prototype.addLastRowborder = function (trElement) {
        var isEmptyRow = trElement && (trElement.classList.contains('e-emptyrow') ||
            trElement.classList.contains('e-columnheader') || trElement.classList.contains('e-detailrow'));
        if (trElement && !isEmptyRow && this.parent.getRows()[this.parent.getCurrentViewRecords().length - 1].getAttribute('data-uid') ===
            trElement.getAttribute('data-uid')) {
            var bottomborder = this.parent.createElement('div', { className: 'e-lastrow-border' });
            var gridcontentEle = this.parent.getContent();
            bottomborder.style.width = this.parent.element.offsetWidth - this.getScrollWidth() + 'px';
            if (!gridcontentEle.querySelectorAll('.e-lastrow-border').length) {
                gridcontentEle.classList.add('e-treegrid-relative');
                gridcontentEle.appendChild(bottomborder);
                bottomborder.style.bottom = this.getScrollWidth() + 'px';
            }
        }
    };
    RowDD.prototype.getScrollWidth = function () {
        var scrollElem = this.parent.getContent().firstElementChild;
        return scrollElem.scrollWidth > scrollElem.offsetWidth ? Scroll.getScrollBarWidth() : 0;
    };
    RowDD.prototype.addErrorElem = function () {
        var dragelem = document.getElementsByClassName('e-cloneproperties')[0];
        var errorelem = dragelem.querySelectorAll('.e-errorelem').length;
        var sanitize = 'sanitize';
        if (!errorelem && !this.parent.rowDropSettings.targetID) {
            var ele = document.createElement('div');
            classList(ele, ['e-errorcontainer'], []);
            classList(ele, ['e-icons', 'e-errorelem'], []);
            var errorVal = dragelem.querySelector('.errorValue');
            var content = dragelem.querySelector('.e-rowcell').innerHTML;
            if (errorVal) {
                content = this.parent["" + sanitize](errorVal.innerHTML);
                errorVal.parentNode.removeChild(errorVal);
            }
            dragelem.querySelector('.e-rowcell').innerHTML = '';
            var spanContent = document.createElement('span');
            spanContent.className = 'errorValue';
            spanContent.style.paddingLeft = '16px';
            spanContent.innerHTML = this.parent["" + sanitize](content);
            dragelem.querySelector('.e-rowcell').appendChild(ele);
            dragelem.querySelector('.e-rowcell').appendChild(spanContent);
            var dropItemSpan = document.querySelector('.e-dropitemscount');
            if (this.hasDropItem && dropItemSpan) {
                var dropItemLeft = parseInt(dropItemSpan.style.left, 10) + ele.offsetWidth + 16;
                var spanLeft = !this.parent.enableRtl ? dropItemLeft : 0;
                dropItemSpan.style.left = spanLeft + "px";
                this.hasDropItem = false;
            }
        }
    };
    RowDD.prototype.removeErrorElem = function () {
        var errorelem = document.querySelector('.e-errorelem');
        var errorValue = document.querySelector('.errorValue');
        var dropItemSpan = document.querySelector('.e-dropitemscount');
        if (errorelem) {
            if (dropItemSpan) {
                var dropItemLeft = parseInt(dropItemSpan.style.left, 10) - errorelem.offsetWidth - 16;
                setStyleAttribute(errorValue, {
                    paddingLeft: '0px'
                });
                if (!this.parent.enableRtl) {
                    setStyleAttribute(dropItemSpan, {
                        left: dropItemLeft + "px"
                    });
                }
            }
            errorelem.remove();
        }
        this.hasDropItem = true;
    };
    RowDD.prototype.topOrBottomBorder = function (target) {
        var rowElement = [];
        var element = closest(target, 'tr');
        rowElement = element ? [].slice.call(element.querySelectorAll('.e-rowcell,.e-rowdragdrop,.e-detailrowcollapse')) : [];
        if (rowElement.length) {
            if (this.dropPosition === 'topSegment') {
                this.addRemoveClasses(rowElement, true, 'e-droptop');
                if (this.parent.element.getElementsByClassName('e-lastrow-dragborder').length > 0) {
                    this.parent.element.getElementsByClassName('e-lastrow-dragborder')[0].remove();
                }
            }
            if (this.dropPosition === 'bottomSegment') {
                this.addRemoveClasses(rowElement, true, 'e-dropbottom');
            }
        }
    };
    RowDD.prototype.removetopOrBottomBorder = function () {
        var border = [];
        border = [].slice.call(this.parent.element.querySelectorAll('.e-dropbottom, .e-droptop'));
        if (border.length) {
            this.addRemoveClasses(border, false, 'e-dropbottom');
            this.addRemoveClasses(border, false, 'e-droptop');
        }
    };
    RowDD.prototype.addRemoveClasses = function (cells, add, className) {
        for (var i = 0, len = cells.length; i < len; i++) {
            if (add) {
                cells[parseInt(i.toString(), 10)].classList.add(className);
            }
            else {
                cells[parseInt(i.toString(), 10)].classList.remove(className);
            }
        }
    };
    RowDD.prototype.getOffset = function (element) {
        var box = element.getBoundingClientRect();
        var body = document.body;
        var docElem = document.documentElement;
        var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
        var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
        var clientTop = docElem.clientTop || body.clientTop || 0;
        var clientLeft = docElem.clientLeft || body.clientLeft || 0;
        var top = box.top + scrollTop - clientTop;
        var left = box.left + scrollLeft - clientLeft;
        return { top: Math.round(top), left: Math.round(left) };
    };
    RowDD.prototype.Rowdraging = function (args) {
        var tObj = this.parent;
        var cloneElement = this.parent.element.querySelector('.e-cloneproperties');
        cloneElement.style.cursor = '';
        var rowEle = args.target ? closest(args.target, 'tr') : null;
        var rowIdx = rowEle ? rowEle.rowIndex : -1;
        var dragRecords = [];
        var droppedRecord = tObj.getCurrentViewRecords()[parseInt(rowIdx.toString(), 10)];
        this.removeErrorElem();
        this.canDrop = true;
        if (!args.data[0]) {
            dragRecords.push(args.data);
        }
        else {
            dragRecords = args.data;
        }
        if (rowIdx !== -1) {
            this.ensuredropPosition(dragRecords, droppedRecord);
        }
        else {
            this.canDrop = false;
            this.addErrorElem();
        }
        if (!tObj.rowDropSettings.targetID && this.canDrop) {
            tObj.rowDragAndDropModule.updateIcon(args.rows, rowIdx, args);
        }
        if (tObj.rowDropSettings.targetID) {
            var dropElement = parentsUntil(args.target, 'e-treegrid');
            if (dropElement && dropElement.id === this.parent.rowDropSettings.targetID) {
                var srcControl = dropElement.ej2_instances[0];
                srcControl.rowDragAndDropModule.updateIcon(args.rows, rowIdx, args);
            }
        }
        if (args.target && closest(args.target, '#' + tObj.rowDropSettings.targetID)) {
            var dropElement = parentsUntil(args.target, 'e-treegrid');
            if (!dropElement) {
                cloneElement.style.cursor = 'default';
            }
        }
    };
    RowDD.prototype.rowDropped = function (args) {
        var tObj = this.parent;
        var parentItem = 'parentItem';
        if (!tObj.rowDropSettings.targetID) {
            if (parentsUntil(args.target, 'e-content')) {
                if (this.parent.element.querySelector('.e-errorelem')) {
                    this.dropPosition = 'Invalid';
                }
                setValue('dropPosition', this.dropPosition, args);
                args.dropIndex = args.dropIndex === args.fromIndex ? this.getTargetIdx(args.target.parentElement) : args.dropIndex;
                tObj.trigger(events.rowDrop, args);
                if (!args.cancel) {
                    if (!isCountRequired(this.parent)) {
                        this.dropRows(args);
                    }
                    if (tObj.isLocalData) {
                        tObj.flatData = this.orderToIndex(tObj.flatData);
                    }
                    tObj.grid.refresh();
                    if (!isNullOrUndefined(tObj.getHeaderContent().querySelector('.e-firstrow-border'))) {
                        tObj.getHeaderContent().querySelector('.e-firstrow-border').remove();
                    }
                }
            }
        }
        else {
            if (args.target && closest(args.target, '#' + tObj.rowDropSettings.targetID) || parentsUntil(args.target, 'e-treegrid') &&
                parentsUntil(args.target, 'e-treegrid').id === tObj.rowDropSettings.targetID || args.target && document.getElementById(tObj.rowDropSettings.targetID)) {
                setValue('dropPosition', this.dropPosition, args);
                tObj.trigger(events.rowDrop, args);
                if (!args.cancel && tObj.rowDropSettings.targetID) {
                    this.dragDropGrid(args);
                    if (tObj.isLocalData) {
                        tObj.flatData = this.orderToIndex(tObj.flatData);
                    }
                }
            }
        }
        this.removetopOrBottomBorder();
        this.removeChildBorder();
        if (!isNullOrUndefined(this.parent.element.getElementsByClassName('e-firstrow-border')[0])) {
            this.parent.element.getElementsByClassName('e-firstrow-border')[0].remove();
        }
        else if (!isNullOrUndefined(this.parent.element.getElementsByClassName('e-lastrow-border')[0])) {
            this.parent.element.getElementsByClassName('e-lastrow-border')[0].remove();
        }
        if (this.parent.enableImmutableMode && !this.parent.allowPaging && !isNullOrUndefined(args.data[0]["" + parentItem])) {
            var index = this.parent.treeColumnIndex;
            index = index + 1;
            var primaryKeyField = this.parent.getPrimaryKeyFieldNames()[0];
            var rowIndex = this.parent.grid.getRowIndexByPrimaryKey(args.data[0]["" + primaryKeyField]);
            var row = this.parent.getRows()[parseInt(rowIndex.toString(), 10)];
            var data = args.data[0];
            if (this.dropPosition === 'middleSegment') {
                var record = [];
                var rows = [];
                record.push(data);
                rows.push(row);
                var parentUniqueID = 'parentUniqueID';
                data = getParentData(this.parent, args.data[0]["" + parentUniqueID]);
                rowIndex = this.parent.grid.getRowIndexByPrimaryKey(data["" + primaryKeyField]);
                var parentrow = this.parent.getRows()[parseInt(rowIndex.toString(), 10)];
                record.push(data);
                rows.push(parentrow);
                for (var i = 0; i < record.length; i++) {
                    this.parent.renderModule.cellRender({
                        data: record[parseInt(i.toString(), 10)],
                        cell: rows[parseInt(i.toString(), 10)].cells[parseInt(index.toString(), 10)],
                        column: this.parent.grid.getColumns()[this.parent.treeColumnIndex],
                        requestType: 'rowDragAndDrop'
                    });
                }
                var targetEle = parentrow.getElementsByClassName('e-treegridcollapse')[0];
                if (!isNullOrUndefined(targetEle)) {
                    removeClass([targetEle], 'e-treegridcollapse');
                    addClass([targetEle], 'e-treegridexpand');
                }
            }
            else {
                this.parent.renderModule.cellRender({
                    data: data, cell: row.cells[parseInt(index.toString(), 10)],
                    column: this.parent.grid.getColumns()[this.parent.treeColumnIndex],
                    requestType: 'rowDragAndDrop'
                });
            }
        }
    };
    RowDD.prototype.dragDropGrid = function (args) {
        var tObj = this.parent;
        var targetRow = closest(args.target, 'tr');
        var targetIndex = isNaN(this.getTargetIdx(targetRow)) ? 0 : this.getTargetIdx(targetRow);
        var dropElement = parentsUntil(args.target, 'e-treegrid');
        var srcControl;
        if (dropElement && dropElement.id === this.parent.rowDropSettings.targetID && !isRemoteData(this.parent)
            && !isCountRequired(this.parent)) {
            srcControl = dropElement.ej2_instances[0];
            var records = tObj.getSelectedRecords();
            var indexes = [];
            for (var i = 0; i < records.length; i++) {
                indexes[parseInt(i.toString(), 10)] = records[parseInt(i.toString(), 10)].index;
            }
            var data = srcControl.dataSource;
            if (this.parent.idMapping !== null && (isNullOrUndefined(this.dropPosition) || this.dropPosition === 'bottomSegment' || this.dropPosition === 'Invalid') && !(data.length)) {
                var actualData = [];
                for (var i = 0; i < records.length; i++) {
                    if (records[parseInt(i.toString(), 10)].hasChildRecords) {
                        actualData.push(records[parseInt(i.toString(), 10)]);
                        var child = findChildrenRecords(records[parseInt(i.toString(), 10)]);
                        for (var i_1 = 0; i_1 < child.length; i_1++) {
                            actualData.push(child[parseInt(i_1.toString(), 10)]); // push child records to drop the parent record along with its child records
                        }
                    }
                }
                if (actualData.length) {
                    records = actualData;
                }
            }
            tObj.notify(events.rowsRemove, { indexes: indexes, records: records });
            srcControl.notify(events.rowsAdd, { toIndex: targetIndex, records: records });
            var srcControlFlatData = srcControl.rowDragAndDropModule.treeGridData;
            if (!isNullOrUndefined(srcControlFlatData)) {
                for (var i = 0; i < srcControlFlatData.length; i++) {
                    srcControlFlatData[parseInt(i.toString(), 10)].index = i;
                    if (!isNullOrUndefined(srcControlFlatData[parseInt(i.toString(), 10)].parentItem)) {
                        var actualIndex = getValue('uniqueIDCollection.' + srcControlFlatData[parseInt(i.toString(), 10)].parentUniqueID + '.index', srcControl);
                        srcControlFlatData[parseInt(i.toString(), 10)].parentItem.index = actualIndex;
                    }
                }
            }
            tObj.grid.refresh();
            srcControl.grid.refresh();
            if (srcControl.grid.dataSource.length > 1) {
                srcControl.grid.refresh();
                if (!isNullOrUndefined(srcControl.getHeaderContent().querySelector('.e-firstrow-border'))) {
                    srcControl.getHeaderContent().querySelector('.e-firstrow-border').remove();
                }
                if (!isNullOrUndefined(srcControl.getContent().querySelector('.e-lastrow-border'))) {
                    srcControl.getContent().querySelector('.e-lastrow-border').remove();
                }
            }
        }
        if (isCountRequired(this.parent)) {
            srcControl = dropElement.ej2_instances[0];
            tObj.grid.refresh();
            srcControl.grid.refresh();
        }
    };
    RowDD.prototype.getTargetIdx = function (targetRow) {
        return targetRow ? parseInt(targetRow.getAttribute('data-rowindex'), 10) : 0;
    };
    RowDD.prototype.getParentData = function (record, data) {
        var parentItem = record.parentItem;
        var selectedItemIndex = -1;
        if (this.parent.enableVirtualization && this.parent.selectedRowIndex !== -1) {
            selectedItemIndex = this.parent.getSelectedRows()[0].rowIndex;
        }
        else if (this.parent.selectedRowIndex !== -1) {
            selectedItemIndex = this.parent.selectedRowIndex;
        }
        if (this.dropPosition === 'bottomSegment') {
            var primaryKeyField = this.parent.getPrimaryKeyFieldNames()[0];
            var rowIndex = selectedItemIndex === -1 ?
                (this.parent.grid.getRowIndexByPrimaryKey(data[0]["" + primaryKeyField]))
                : this.parent.getSelectedRowIndexes()[0];
            var selectedRecord = this.parent.getCurrentViewRecords()[parseInt(rowIndex.toString(), 10)];
            this.droppedRecord = getParentData(this.parent, selectedRecord.parentItem.uniqueID);
        }
        if (this.dropPosition === 'middleSegment') {
            var level = this.parent.getCurrentViewRecords()[parseInt(selectedItemIndex.toString(), 10)].level;
            if (level === parentItem.level) {
                this.droppedRecord = getParentData(this.parent, parentItem.uniqueID);
            }
            else {
                this.getParentData(parentItem);
            }
        }
    };
    RowDD.prototype.dropRows = function (args, isByMethod) {
        if (this.dropPosition !== 'Invalid' && !isRemoteData(this.parent)) {
            var tObj = this.parent;
            var draggedRecord_2;
            var droppedRecord = void 0;
            if (isNullOrUndefined(args.dropIndex)) {
                var primaryKeyField = this.parent.getPrimaryKeyFieldNames()[0];
                var rowIndex = tObj.selectedRowIndex === -1 ?
                    (this.parent.grid.getRowIndexByPrimaryKey(args.data[0]["" + primaryKeyField])) - 1
                    : tObj.getSelectedRowIndexes()[0] - 1;
                var record = tObj.getCurrentViewRecords()[parseInt(rowIndex.toString(), 10)];
                this.getParentData(record, args.data);
            }
            else {
                args.dropIndex = args.dropIndex === args.fromIndex ? this.getTargetIdx(args.target.parentElement) : args.dropIndex;
                if (this.parent.enableVirtualization) {
                    var index = this.parent.getRowByIndex(args.dropIndex).rowIndex;
                    this.droppedRecord = tObj.getCurrentViewRecords()[parseInt(index.toString(), 10)];
                }
                else {
                    this.droppedRecord = tObj.getCurrentViewRecords()[args.dropIndex];
                }
            }
            var dragRecords = [];
            droppedRecord = this.droppedRecord;
            if (!args.data[0]) {
                dragRecords.push(args.data);
            }
            else {
                dragRecords = args.data;
            }
            this.parent[this.modifiedRecords].push(args.data[0], droppedRecord);
            var count = 0;
            var multiplegrid = this.parent.rowDropSettings.targetID;
            this.isMultipleGrid = multiplegrid;
            if (!multiplegrid) {
                this.ensuredropPosition(dragRecords, droppedRecord);
            }
            else {
                this.isaddtoBottom = multiplegrid && this.isDraggedWithChild;
            }
            var dragLength = dragRecords.length;
            if (!isNullOrUndefined(this.parent.idMapping)) {
                dragRecords.reverse();
            }
            var _loop_1 = function (i) {
                draggedRecord_2 = dragRecords[parseInt(i.toString(), 10)];
                this_1.draggedRecord = draggedRecord_2;
                if (this_1.dropPosition !== 'Invalid') {
                    if (!tObj.rowDropSettings.targetID || isByMethod) {
                        this_1.deleteDragRow();
                    }
                    if (this_1.draggedRecord === this_1.droppedRecord) {
                        var correctIndex = this_1.getTargetIdx(args.target.offsetParent.parentElement);
                        if (isNaN(correctIndex)) {
                            correctIndex = this_1.getTargetIdx(args.target.parentElement);
                        }
                        args.dropIndex = correctIndex;
                        droppedRecord = this_1.droppedRecord = this_1.parent.getCurrentViewRecords()[args.dropIndex];
                    }
                    if (droppedRecord.parentItem || this_1.dropPosition === 'middleSegment') {
                        var parentRecords = tObj.parentData;
                        var newParentIndex = parentRecords.indexOf(this_1.draggedRecord);
                        if (newParentIndex !== -1) {
                            parentRecords.splice(newParentIndex, 1);
                        }
                    }
                    var recordIndex1 = this_1.treeGridData.indexOf(droppedRecord);
                    this_1.dropAtTop(recordIndex1);
                    if (this_1.dropPosition === 'bottomSegment') {
                        if (!droppedRecord.hasChildRecords) {
                            if (this_1.parent.parentIdMapping) {
                                this_1.treeData.splice(recordIndex1 + 1, 0, this_1.draggedRecord.taskData);
                            }
                            this_1.treeGridData.splice(recordIndex1 + 1, 0, this_1.draggedRecord);
                        }
                        else {
                            count = this_1.getChildCount(droppedRecord, 0);
                            if (this_1.parent.parentIdMapping) {
                                this_1.treeData.splice(recordIndex1 + count + 1, 0, this_1.draggedRecord.taskData);
                            }
                            this_1.treeGridData.splice(recordIndex1 + count + 1, 0, this_1.draggedRecord);
                        }
                        if (isNullOrUndefined(droppedRecord.parentItem)) {
                            delete draggedRecord_2.parentItem;
                            delete draggedRecord_2.parentUniqueID;
                            draggedRecord_2.level = 0;
                            if (this_1.parent.parentIdMapping) {
                                draggedRecord_2[this_1.parent.parentIdMapping] = null;
                            }
                        }
                        if (droppedRecord.parentItem) {
                            var rec = this_1.getChildrecordsByParentID(droppedRecord.parentUniqueID);
                            var childRecords = rec[0].childRecords;
                            var droppedRecordIndex = childRecords.indexOf(droppedRecord) + 1;
                            childRecords.splice(droppedRecordIndex, 0, draggedRecord_2);
                            draggedRecord_2.parentItem = droppedRecord.parentItem;
                            draggedRecord_2.parentUniqueID = droppedRecord.parentUniqueID;
                            draggedRecord_2.level = droppedRecord.level;
                            if (this_1.parent.parentIdMapping) {
                                draggedRecord_2[this_1.parent.parentIdMapping] = droppedRecord[this_1.parent.parentIdMapping];
                                draggedRecord_2.parentItem = droppedRecord.parentItem;
                                draggedRecord_2.level = droppedRecord.level;
                            }
                        }
                        if (draggedRecord_2.hasChildRecords) {
                            var level = 1;
                            this_1.updateChildRecordLevel(draggedRecord_2, level);
                            this_1.updateChildRecord(draggedRecord_2, recordIndex1 + count + 1);
                        }
                    }
                    this_1.dropMiddle(recordIndex1);
                }
                if (isNullOrUndefined(draggedRecord_2.parentItem)) {
                    var parentRecords = tObj.parentData;
                    var newParentIndex = parentRecords.indexOf(this_1.droppedRecord);
                    var nonRepeat_1 = 0;
                    parentRecords.filter(function (e) {
                        if (draggedRecord_2.uniqueID === e.uniqueID) {
                            nonRepeat_1++;
                        }
                    });
                    if (this_1.dropPosition === 'bottomSegment' && nonRepeat_1 === 0) {
                        parentRecords.splice(newParentIndex + 1, 0, draggedRecord_2);
                    }
                    else if (this_1.dropPosition === 'topSegment' && nonRepeat_1 === 0) {
                        parentRecords.splice(newParentIndex, 0, draggedRecord_2);
                    }
                }
                tObj.rowDragAndDropModule.refreshGridDataSource();
            };
            var this_1 = this;
            for (var i = 0; i < dragLength; i++) {
                _loop_1(i);
            }
        }
    };
    RowDD.prototype.dropMiddle = function (recordIndex) {
        var tObj = this.parent;
        var childRecords = findChildrenRecords(this.droppedRecord);
        var childRecordsLength = (isNullOrUndefined(childRecords) ||
            childRecords.length === 0) ? recordIndex + 1 :
            childRecords.length + recordIndex + 1;
        if (this.dropPosition === 'middleSegment') {
            if (tObj.parentIdMapping) {
                this.treeData.splice(childRecordsLength, 0, this.draggedRecord.taskData);
                this.treeGridData.splice(childRecordsLength, 0, this.draggedRecord);
            }
            else {
                this.treeGridData.splice(childRecordsLength, 0, this.draggedRecord);
            }
            this.recordLevel();
            if (this.draggedRecord.hasChildRecords) {
                this.updateChildRecord(this.draggedRecord, childRecordsLength);
            }
        }
    };
    RowDD.prototype.dropAtTop = function (recordIndex1) {
        var tObj = this.parent;
        if (this.dropPosition === 'topSegment') {
            if (tObj.parentIdMapping) {
                this.treeData.splice(recordIndex1, 0, this.draggedRecord.taskData);
            }
            this.draggedRecord.parentItem = this.treeGridData[parseInt(recordIndex1.toString(), 10)].parentItem;
            this.draggedRecord.parentUniqueID = this.treeGridData[parseInt(recordIndex1.toString(), 10)].parentUniqueID;
            this.draggedRecord.level = this.treeGridData[parseInt(recordIndex1.toString(), 10)].level;
            this.treeGridData.splice(parseInt(recordIndex1.toString(), 10), 0, this.draggedRecord);
            if (this.draggedRecord.hasChildRecords) {
                var level = 1;
                this.updateChildRecord(this.draggedRecord, recordIndex1);
                this.updateChildRecordLevel(this.draggedRecord, level);
            }
            if (this.droppedRecord.parentItem) {
                var rec = this.getChildrecordsByParentID(this.droppedRecord.parentUniqueID);
                var childRecords = rec[0].childRecords;
                var droppedRecordIndex = childRecords.indexOf(this.droppedRecord);
                childRecords.splice(droppedRecordIndex, 0, this.draggedRecord);
            }
        }
    };
    RowDD.prototype.recordLevel = function () {
        var tObj = this.parent;
        var draggedRecord = this.draggedRecord;
        var droppedRecord = this.droppedRecord;
        var childItem = tObj.childMapping;
        if (!droppedRecord.hasChildRecords) {
            droppedRecord.hasChildRecords = true;
            droppedRecord.hasFilteredChildRecords = true;
            if (isNullOrUndefined(droppedRecord.childRecords) || droppedRecord.childRecords.length === 0) {
                droppedRecord.childRecords = [];
                if (!tObj.parentIdMapping && isNullOrUndefined(droppedRecord.taskData["" + childItem])) {
                    droppedRecord.taskData["" + childItem] = [];
                }
            }
        }
        if (this.dropPosition === 'middleSegment') {
            var parentItem = extend({}, droppedRecord);
            delete parentItem.childRecords;
            draggedRecord.parentItem = parentItem;
            draggedRecord.parentUniqueID = droppedRecord.uniqueID;
            droppedRecord.childRecords.splice(droppedRecord.childRecords.length, 0, draggedRecord);
            var isSelfReference = 'isSelfReference';
            if (tObj["" + isSelfReference]) {
                droppedRecord[tObj.childMapping] = [];
                droppedRecord[tObj.childMapping].splice(droppedRecord[tObj.childMapping].length, 0, draggedRecord);
            }
            if (!isNullOrUndefined(draggedRecord) && !tObj.parentIdMapping && !isNullOrUndefined(droppedRecord.taskData["" + childItem])) {
                droppedRecord.taskData[tObj.childMapping].splice(droppedRecord.childRecords.length, 0, draggedRecord.taskData);
            }
            if (!draggedRecord.hasChildRecords) {
                draggedRecord.level = droppedRecord.level + 1;
            }
            else {
                var level = 1;
                draggedRecord.level = droppedRecord.level + 1;
                this.updateChildRecordLevel(draggedRecord, level);
            }
            droppedRecord.expanded = true;
        }
    };
    RowDD.prototype.deleteDragRow = function () {
        if (this.parent.dataSource instanceof DataManager && isOffline(this.parent)) {
            this.treeGridData = this.parent.grid.dataSource.dataSource.json;
            this.treeData = this.parent.dataSource.dataSource.json;
        }
        else {
            this.treeGridData = this.parent.grid.dataSource;
            this.treeData = this.parent.dataSource;
        }
        var deletedRow = getParentData(this.parent, this.draggedRecord.uniqueID);
        if (!isNullOrUndefined(deletedRow.childRecords) && deletedRow.childRecords.length) {
            deletedRow.hasChildRecords = true;
        }
        this.removeRecords(deletedRow);
    };
    RowDD.prototype.updateChildRecord = function (record, count) {
        var currentRecord;
        var tObj = this.parent;
        var length = 0;
        if (!record.hasChildRecords) {
            return 0;
        }
        length = record.childRecords.length;
        for (var i = 0; i < length; i++) {
            if (!this.isMultipleGrid) {
                currentRecord = getValue('uniqueIDCollection.' + record.childRecords[parseInt(i.toString(), 10)].uniqueID, tObj);
            }
            else {
                currentRecord = record.childRecords[parseInt(i.toString(), 10)];
            }
            count++;
            tObj.flatData.splice(count, 0, currentRecord);
            setValue('uniqueIDCollection.' + currentRecord.uniqueID, currentRecord, this.parent);
            if (tObj.parentIdMapping) {
                this.treeData.splice(count, 0, currentRecord.taskData);
            }
            if (currentRecord.hasChildRecords) {
                count = this.updateChildRecord(currentRecord, count);
            }
        }
        return count;
    };
    RowDD.prototype.updateChildRecordLevel = function (record, level) {
        var length = 0;
        var currentRecord;
        level++;
        if (!record.hasChildRecords) {
            return 0;
        }
        length = record.childRecords.length;
        for (var i = 0; i < length; i++) {
            if (!this.isMultipleGrid) {
                currentRecord = getValue('uniqueIDCollection.' + record.childRecords[parseInt(i.toString(), 10)].uniqueID, this.parent);
            }
            else {
                currentRecord = record.childRecords[parseInt(i.toString(), 10)];
            }
            var parentData = void 0;
            if (record.parentItem) {
                parentData = getParentData(this.parent, record.parentItem.uniqueID);
            }
            if (isNullOrUndefined(parentData) && !isNullOrUndefined(record.parentItem)) {
                parentData = record.parentItem;
            }
            currentRecord.level = record.parentItem ? parentData.level + level : record.level + 1;
            if (currentRecord.hasChildRecords) {
                level--;
                level = this.updateChildRecordLevel(currentRecord, level);
            }
        }
        return level;
    };
    RowDD.prototype.removeRecords = function (record) {
        var tObj = this.parent;
        var dataSource;
        if (this.parent.dataSource instanceof DataManager && isOffline(this.parent)) {
            dataSource = this.parent.dataSource.dataSource.json;
        }
        else {
            dataSource = this.parent.dataSource;
        }
        var deletedRow = record;
        var isSelfReference = !isNullOrUndefined(tObj.parentIdMapping);
        var flatParentData = this.getChildrecordsByParentID(deletedRow.parentUniqueID)[0];
        if (deletedRow) {
            if (deletedRow.parentItem) {
                var childRecords = flatParentData ? flatParentData.childRecords : [];
                var childIndex = 0;
                if (childRecords && childRecords.length > 0) {
                    childIndex = childRecords.indexOf(deletedRow);
                    flatParentData.childRecords.splice(childIndex, 1);
                    if (!this.parent.parentIdMapping || tObj.enableImmutableMode) {
                        editAction({ value: deletedRow, action: 'delete' }, this.parent, isSelfReference, deletedRow.index, deletedRow.index);
                    }
                }
            }
            if (tObj.parentIdMapping) {
                if (deletedRow.hasChildRecords && deletedRow.childRecords.length > 0) {
                    this.removeChildItem(deletedRow);
                }
                var idx = void 0;
                var idz = void 0;
                var treeGridData = dataSource;
                for (var i = 0; i < treeGridData.length; i++) {
                    if (treeGridData[parseInt(i.toString(), 10)][this.parent.idMapping] === deletedRow.taskData[this.parent.idMapping]) {
                        idx = i;
                    }
                }
                for (var i = 0; i < this.treeGridData.length; i++) {
                    if (this.treeGridData[parseInt(i.toString(), 10)][this.parent.idMapping]
                        === deletedRow.taskData[this.parent.idMapping]) {
                        idz = i;
                    }
                }
                if (idx !== -1 && !isNullOrUndefined(idx)) {
                    dataSource.splice(idx, 1);
                }
                if (idz !== -1 && !isNullOrUndefined(idz)) {
                    this.treeGridData.splice(idz, 1);
                }
            }
            var recordIndex = this.treeGridData.indexOf(deletedRow);
            if (!tObj.parentIdMapping) {
                var parentIndex = this.parent.parentData.indexOf(deletedRow);
                if (parentIndex !== -1) {
                    tObj.parentData.splice(parentIndex, 1);
                    dataSource.splice(parentIndex, 1);
                }
            }
            if (recordIndex === -1 && !tObj.parentIdMapping) {
                var primaryKeyField = tObj.getPrimaryKeyFieldNames()[0];
                for (var j = 0; j < this.treeGridData.length; j++) {
                    if (this.treeGridData[parseInt(j.toString(), 10)]["" + primaryKeyField] === deletedRow["" + primaryKeyField]) {
                        recordIndex = j;
                    }
                }
            }
            if (!tObj.parentIdMapping) {
                var deletedRecordCount = this.getChildCount(deletedRow, 0);
                this.treeGridData.splice(recordIndex, deletedRecordCount + 1);
            }
            if (deletedRow.parentItem && flatParentData && flatParentData.childRecords && !flatParentData.childRecords.length) {
                flatParentData.expanded = false;
                flatParentData.hasChildRecords = false;
                flatParentData.hasFilteredChildRecords = false;
            }
            if (this.parent[this.modifiedRecords].indexOf(flatParentData) === -1 && !isNullOrUndefined(flatParentData)) {
                this.parent[this.modifiedRecords].push(flatParentData);
            }
            if (!isNullOrUndefined(flatParentData)) {
                this.updateModifiedRecords(flatParentData);
            }
        }
    };
    RowDD.prototype.updateModifiedRecords = function (record) {
        var parentData = getParentData(this.parent, record.parentUniqueID);
        if (!isNullOrUndefined(parentData)) {
            this.parent[this.modifiedRecords].push(parentData);
            this.updateModifiedRecords(parentData);
        }
    };
    RowDD.prototype.removeChildItem = function (record) {
        var currentRecord;
        var idx;
        var idz;
        var dataSource;
        if (this.parent.dataSource instanceof DataManager && isOffline(this.parent)) {
            dataSource = this.parent.dataSource.dataSource.json;
        }
        else {
            dataSource = this.parent.dataSource;
        }
        for (var i = 0; i < record.childRecords.length; i++) {
            currentRecord = record.childRecords[parseInt(i.toString(), 10)];
            if (!isNullOrUndefined(currentRecord.childRecords) && currentRecord.childRecords.length) {
                currentRecord.hasChildRecords = true;
            }
            var treeGridData = void 0;
            if (this.parent.dataSource instanceof DataManager && isOffline(this.parent)) {
                treeGridData = this.parent.dataSource.dataSource.json;
            }
            else {
                treeGridData = this.parent.dataSource;
            }
            for (var i_2 = 0; i_2 < treeGridData.length; i_2++) {
                if (treeGridData[parseInt(i_2.toString(), 10)][this.parent.idMapping] === currentRecord.taskData[this.parent.idMapping]) {
                    idx = i_2;
                }
            }
            for (var i_3 = 0; i_3 < this.treeGridData.length; i_3++) {
                if (this.treeGridData[parseInt(i_3.toString(), 10)][this.parent.idMapping]
                    === currentRecord.taskData[this.parent.idMapping]) {
                    idz = i_3;
                    break;
                }
            }
            if (idx !== -1 && !isNullOrUndefined(idx)) {
                dataSource.splice(idx, 1);
            }
            if (idz !== -1 && !isNullOrUndefined(idz)) {
                this.treeGridData.splice(idz, 1);
            }
            if (currentRecord.hasChildRecords) {
                this.removeChildItem(currentRecord);
            }
        }
    };
    RowDD.prototype.getChildCount = function (record, count) {
        var currentRecord;
        if (!record.hasChildRecords) {
            return 0;
        }
        for (var i = 0; i < record.childRecords.length; i++) {
            currentRecord = record.childRecords[parseInt(i.toString(), 10)];
            count++;
            if (currentRecord.hasChildRecords) {
                count = this.getChildCount(currentRecord, count);
            }
        }
        return count;
    };
    RowDD.prototype.ensuredropPosition = function (draggedRecords, currentRecord) {
        var _this = this;
        draggedRecords.filter(function (e) {
            if (e.hasChildRecords && !isNullOrUndefined(e.childRecords)) {
                var valid = e.childRecords.indexOf(currentRecord);
                if (valid === -1) {
                    _this.ensuredropPosition(e.childRecords, currentRecord);
                }
                else {
                    _this.dropPosition = 'Invalid';
                    _this.addErrorElem();
                    _this.canDrop = false;
                    return;
                }
            }
        });
    };
    RowDD.prototype.destroy = function () {
        this.removeEventListener();
    };
    /**
     * @hidden
     * @returns {void}
     */
    RowDD.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(events.rowdraging, this.Rowdraging);
        this.parent.off(events.rowDropped, this.rowDropped);
        this.parent.off(events.rowsAdd, this.rowsAdded);
        this.parent.off(events.rowsRemove, this.rowsRemoved);
    };
    /**
     * hidden
     */
    /**
     * For internal use only - Get the module name.
     *
     * @private
     * @returns {string} Returns RowDragAndDrop module name
     */
    RowDD.prototype.getModuleName = function () {
        return 'rowDragAndDrop';
    };
    return RowDD;
}());
export { RowDD };
