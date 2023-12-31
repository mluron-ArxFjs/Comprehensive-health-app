/* eslint-disable no-useless-escape */
import { locale, dialog, mouseDown, renderFilterCell, initiateFilterUI, getStartEvent, focus } from '../index';
import { reapplyFilter, filterCellKeyDown } from '../index';
import { getFilteredColumn, cMenuBeforeOpen, filterByCellValue, clearFilter, getFilterRange, applySort } from '../index';
import { filterRangeAlert, getFilteredCollection, beforeDelete, sheetsDestroyed, initiateFilter, duplicateSheetFilterHandler } from '../../workbook/common/event';
import { getRangeIndexes, getCellAddress, updateFilter, beforeInsert } from '../../workbook/index';
import { getIndexesFromAddress, getSwapRange, getColumnHeaderText, getDataRange, isCustomDateTime } from '../../workbook/index';
import { getData, getTypeFromFormat, getCell, getCellIndexes, getRangeAddress, getSheet, inRange } from '../../workbook/index';
import { sortImport, clear, getColIndex, setRow, hideShow } from '../../workbook/index';
import { beginAction, getValueFromFormat } from '../../workbook/index';
import { isFilterHidden, isNumber } from '../../workbook/index';
import { getComponent, EventHandler, isUndefined, isNullOrUndefined, Browser, removeClass, detach } from '@syncfusion/ej2-base';
import { ExcelFilterBase, beforeFltrcMenuOpen, CheckBoxFilterBase, getUid } from '@syncfusion/ej2-grids';
import { filterCmenuSelect, filterCboxValue, filterDialogCreated, filterDialogClose, createCboxWithWrap } from '@syncfusion/ej2-grids';
import { parentsUntil } from '@syncfusion/ej2-grids';
import { Query, DataManager, Predicate, Deferred } from '@syncfusion/ej2-data';
import { TreeView } from '@syncfusion/ej2-navigations';
import { completeAction, contentLoaded, beforeCheckboxRender, refreshCheckbox } from '../../spreadsheet/index';
/**
 * `Filter` module is used to handle the filter action in Spreadsheet.
 */
var Filter = /** @class */ (function () {
    /**
     * Constructor for filter module.
     *
     * @param {Spreadsheet} parent - Specifies the Spreadsheet.
     */
    function Filter(parent) {
        this.parent = parent;
        this.filterCollection = new Map();
        this.filterRange = new Map();
        this.filterBtn = parent.createElement('div', { className: 'e-filter-btn e-control e-btn e-lib e-filter-iconbtn e-icon-btn' });
        this.filterBtn.appendChild(parent.createElement('span', { className: 'e-btn-icon e-icons e-filter-icon' }));
        this.addEventListener();
    }
    /**
     * To destroy the filter module.
     *
     * @returns {void} - To destroy the filter module.
     */
    Filter.prototype.destroy = function () {
        this.removeEventListener();
        this.filterRange = null;
        this.filterCollection = null;
        this.filterBtn = null;
        this.parent = null;
    };
    Filter.prototype.addEventListener = function () {
        this.parent.on(filterRangeAlert, this.filterRangeAlertHandler, this);
        this.parent.on(initiateFilterUI, this.initiateFilterUIHandler, this);
        this.parent.on(mouseDown, this.filterMouseDownHandler, this);
        this.parent.on(renderFilterCell, this.renderFilterCellHandler, this);
        this.parent.on(beforeFltrcMenuOpen, this.beforeFilterMenuOpenHandler, this);
        this.parent.on(filterCmenuSelect, this.closeDialog, this);
        this.parent.on(reapplyFilter, this.reapplyFilterHandler, this);
        this.parent.on(filterByCellValue, this.filterByCellValueHandler, this);
        this.parent.on(clearFilter, this.clearFilterHandler, this);
        this.parent.on(getFilteredColumn, this.getFilteredColumnHandler, this);
        this.parent.on(cMenuBeforeOpen, this.cMenuBeforeOpenHandler, this);
        this.parent.on(filterCboxValue, this.filterCboxValueHandler, this);
        this.parent.on(getFilterRange, this.getFilterRangeHandler, this);
        this.parent.on(filterCellKeyDown, this.filterCellKeyDownHandler, this);
        this.parent.on(getFilteredCollection, this.getFilteredCollection, this);
        this.parent.on(contentLoaded, this.updateFilter, this);
        this.parent.on(updateFilter, this.updateFilter, this);
        this.parent.on(beforeInsert, this.beforeInsertHandler, this);
        this.parent.on(beforeDelete, this.beforeDeleteHandler, this);
        this.parent.on(sheetsDestroyed, this.deleteSheetHandler, this);
        this.parent.on(clear, this.clearHandler, this);
        this.parent.on(filterDialogCreated, this.filterDialogCreatedHandler, this);
        this.parent.on(filterDialogClose, this.removeFilterClass, this);
        this.parent.on(duplicateSheetFilterHandler, this.duplicateSheetFilterHandler, this);
    };
    Filter.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(filterRangeAlert, this.filterRangeAlertHandler);
            this.parent.off(initiateFilterUI, this.initiateFilterUIHandler);
            this.parent.off(mouseDown, this.filterMouseDownHandler);
            this.parent.off(renderFilterCell, this.renderFilterCellHandler);
            this.parent.off(beforeFltrcMenuOpen, this.beforeFilterMenuOpenHandler);
            this.parent.off(filterCmenuSelect, this.closeDialog);
            this.parent.off(reapplyFilter, this.reapplyFilterHandler);
            this.parent.off(filterByCellValue, this.filterByCellValueHandler);
            this.parent.off(clearFilter, this.clearFilterHandler);
            this.parent.off(getFilteredColumn, this.getFilteredColumnHandler);
            this.parent.off(cMenuBeforeOpen, this.cMenuBeforeOpenHandler);
            this.parent.on(filterCboxValue, this.filterCboxValueHandler);
            this.parent.off(getFilterRange, this.getFilterRangeHandler);
            this.parent.off(filterCellKeyDown, this.filterCellKeyDownHandler);
            this.parent.off(getFilteredCollection, this.getFilteredCollection);
            this.parent.off(contentLoaded, this.updateFilter);
            this.parent.off(updateFilter, this.updateFilter);
            this.parent.off(beforeInsert, this.beforeInsertHandler);
            this.parent.off(beforeDelete, this.beforeDeleteHandler);
            this.parent.off(sheetsDestroyed, this.deleteSheetHandler);
            this.parent.off(clear, this.clearHandler);
            this.parent.off(filterDialogCreated, this.filterDialogCreatedHandler);
            this.parent.off(filterDialogClose, this.removeFilterClass);
            this.parent.off(duplicateSheetFilterHandler, this.duplicateSheetFilterHandler);
        }
    };
    /**
     * Gets the module name.
     *
     * @returns {string} - Gets the module name.
     */
    Filter.prototype.getModuleName = function () {
        return 'filter';
    };
    /**
     * Validates the range and returns false when invalid.
     *
     * @param {SheetModel} sheet - Specify the sheet.
     * @param {string} range - Specify the range.
     * @returns {void} - Validates the range and returns false when invalid.
     */
    Filter.prototype.isInValidFilterRange = function (sheet, range) {
        var selectedRange = range ? getSwapRange(getIndexesFromAddress(range)) :
            getSwapRange(getIndexesFromAddress(sheet.selectedRange));
        return selectedRange[0] > sheet.usedRange.rowIndex || selectedRange[1] > sheet.usedRange.colIndex;
    };
    /**
     * Shows the range error alert dialog.
     *
     * @param {any} args - Specifies the args
     * @param {string} args.error - range error string.
     * @returns {void} - Shows the range error alert dialog.
     */
    Filter.prototype.filterRangeAlertHandler = function (args) {
        var _this = this;
        var dialogInst = this.parent.serviceLocator.getService(dialog);
        dialogInst.show({
            content: args.error, isModal: true,
            height: 180, width: 400, showCloseIcon: true,
            beforeOpen: function (args) {
                var dlgArgs = {
                    dialogName: 'FilterRangeDialog',
                    element: args.element, target: args.target, cancel: args.cancel
                };
                _this.parent.trigger('dialogBeforeOpen', dlgArgs);
                if (dlgArgs.cancel) {
                    args.cancel = true;
                }
                else {
                    focus(_this.parent.element);
                }
            }
        });
        this.parent.hideSpinner();
    };
    /**
     * Triggers before filter context menu opened and used to add sorting items.
     *
     * @param {any} args - Specifies the args
     * @param {HTMLElement} args.element - Specify the element
     * @returns {void} - Triggers before filter context menu opened and used to add sorting items.
     */
    Filter.prototype.beforeFilterMenuOpenHandler = function (args) {
        var l10n = this.parent.serviceLocator.getService(locale);
        args.element.classList.add('e-spreadsheet-contextmenu'); // to show sort icons
        var ul = args.element.querySelector('ul');
        this.addMenuItem(ul, l10n.getConstant('SortDescending'), 'e-filter-sortdesc', 'e-sort-desc');
        this.addMenuItem(ul, l10n.getConstant('SortAscending'), 'e-filter-sortasc', 'e-sort-asc');
        args.element.appendChild(ul);
    };
    /**
     * Creates new menu item element
     *
     * @param {Element} ul - Specify the element.
     * @param {string} text - Specify the text.
     * @param {string} className - Specify the className
     * @param {string} iconCss - Specify the iconCss
     * @returns {void} - Creates new menu item element
     */
    Filter.prototype.addMenuItem = function (ul, text, className, iconCss) {
        var li = this.parent.createElement('li', { className: className + ' e-menu-item' });
        li.innerText = text;
        li.insertBefore(this.parent.createElement('span', { className: 'e-menu-icon e-icons ' + iconCss }), li.firstChild);
        ul.insertBefore(li, ul.firstChild);
    };
    /**
     * Initiates the filter UI for the selected range.
     *
     * @param {any} args - Specifies the args
     * @param {PredicateModel[]} args.predicates - Specify the predicates.
     * @param {number} args.range - Specify the range.
     * @param {Promise<FilterEventArgs>} args.promise - Spefify the promise.
     * @param {number} args.sIdx - Specify the sIdx
     * @param {boolean} args.isCut - Specify the bool value
     * @param {boolean} args.isUndoRedo - Specify the bool value
     * @param {boolean} args.isInternal - Spefify the isInternal.
     * @returns {void} - Initiates the filter UI for the selected range.
     */
    Filter.prototype.initiateFilterUIHandler = function (args) {
        var _this = this;
        var predicates = args ? args.predicates : null;
        var sheetIdx = args.sIdx;
        if (!sheetIdx && sheetIdx !== 0) {
            sheetIdx = this.parent.activeSheetIndex;
        }
        var deferred;
        if (args.promise) {
            deferred = new Deferred();
            args.promise = deferred.promise;
        }
        var resolveFn = function () {
            if (deferred) {
                deferred.resolve();
            }
        };
        var isInternal = args.isInternal || args.isCut;
        if (this.filterRange.size > 0 && this.filterRange.has(sheetIdx) && !this.parent.isOpen && !predicates) { //disable filter
            this.removeFilter(sheetIdx, isInternal, false);
            resolveFn();
            return;
        }
        var sheet = getSheet(this.parent, sheetIdx);
        if (this.isInValidFilterRange(sheet, args.range)) {
            var l10n = this.parent.serviceLocator.getService(locale);
            this.filterRangeAlertHandler({ error: l10n.getConstant('FilterOutOfRangeError') });
            resolveFn();
            return;
        }
        var selectedRange = args.range || sheet.selectedRange;
        var eventArgs;
        var actionArgs;
        if (!isInternal) {
            eventArgs = { range: selectedRange, sheetIndex: sheetIdx, cancel: false };
            if (args.predicates) {
                eventArgs.predicates = args.predicates;
                eventArgs.previousPredicates = this.filterCollection.get(sheetIdx) && [].slice.call(this.filterCollection.get(sheetIdx));
            }
            else {
                eventArgs.filterOptions = { predicates: args.predicates };
            }
            eventArgs.useFilterRange = false;
            actionArgs = { action: 'filter', eventArgs: eventArgs };
            this.parent.notify(beginAction, actionArgs);
            if (eventArgs.cancel) {
                resolveFn();
                return;
            }
            delete eventArgs.cancel;
            args.useFilterRange = eventArgs.useFilterRange;
        }
        if (!args.range && (isInternal || selectedRange === eventArgs.range)) {
            var rangeIdx = getRangeIndexes(selectedRange);
            if (rangeIdx[0] === rangeIdx[2] && rangeIdx[1] === rangeIdx[3]) {
                rangeIdx = getDataRange(rangeIdx[0], rangeIdx[1], sheet);
                selectedRange = getRangeAddress(rangeIdx);
                if (!isInternal) {
                    eventArgs.range = selectedRange;
                }
            }
        }
        else if (!isInternal) {
            selectedRange = eventArgs.range;
        }
        if (predicates) {
            if (predicates.length) {
                var filterRange = this.filterRange.get(sheetIdx);
                if (filterRange) {
                    args.useFilterRange = filterRange.useFilterRange;
                }
                this.processRange(sheet, sheetIdx, selectedRange, true, args.useFilterRange);
                var range = this.filterRange.get(sheetIdx).range.slice();
                range[0] = range[0] + 1; // to skip first row.
                if (!args.useFilterRange) {
                    range[2] = sheet.usedRange.rowIndex; //filter range should be till used range.
                }
                range[1] = range[3] = getColIndex(predicates[0].field);
                var addr = sheet.name + "!" + this.getPredicateRange(range, predicates.slice(1, predicates.length));
                var fullAddr = getRangeAddress(range);
                getData(this.parent, addr, true, true, null, true, null, null, false, fullAddr).then(function (jsonData) {
                    _this.filterSuccessHandler(new DataManager(jsonData), { action: 'filtering', filterCollection: predicates, field: predicates[0].field, sIdx: args.sIdx,
                        isInternal: isInternal, prevPredicates: eventArgs && eventArgs.previousPredicates });
                    resolveFn();
                });
                return;
            }
            else {
                this.clearFilterHandler({ sheetIndex: sheetIdx });
                resolveFn();
            }
        }
        else {
            this.processRange(sheet, sheetIdx, selectedRange, false, args.useFilterRange);
            resolveFn();
        }
        if (!isInternal) {
            this.parent.notify(completeAction, actionArgs);
            focus(this.parent.element);
        }
    };
    /**
     * Processes the range if no filter applied.
     *
     * @param {SheetModel} sheet - Specify the sheet.
     * @param {number} sheetIdx - Specify the sheet index.
     * @param {string} filterRange - Specify the filterRange.
     * @param {boolean} preventRefresh - To prevent refreshing the filter buttons.
     * @param {boolean} useFilterRange - Specifies whether to consider filtering range or used range during filering.
     * @returns {void} - Processes the range if no filter applied.
     */
    Filter.prototype.processRange = function (sheet, sheetIdx, filterRange, preventRefresh, useFilterRange) {
        var range = getSwapRange(getIndexesFromAddress(filterRange || sheet.selectedRange));
        if (range[0] === range[2] && range[1] === range[3]) { //if selected range is a single cell
            range[0] = 0;
            range[1] = 0;
            range[2] = sheet.usedRange.rowIndex;
            range[3] = sheet.usedRange.colIndex;
        }
        else if (range[3] > sheet.usedRange.colIndex) {
            range[3] = sheet.usedRange.colIndex;
        }
        this.filterRange.set(sheetIdx, { useFilterRange: useFilterRange, range: range });
        this.filterCollection.set(sheetIdx, []);
        if (!preventRefresh) {
            this.refreshFilterRange(range, false, sheetIdx);
        }
    };
    /**
     * Removes all the filter related collections for the active sheet.
     *
     * @param {number} sheetIdx - Specify the sheet index.
     * @param {boolean} isCut - Specify the bool value.
     * @param {boolean} preventRefresh - Specify the preventRefresh.
     * @param {boolean} isUndoRedo - Specify the isUndoRedo.
     * @returns {void} - Removes all the filter related collections for the active sheet.
     */
    Filter.prototype.removeFilter = function (sheetIdx, isCut, preventRefresh) {
        var range = this.filterRange.get(sheetIdx).range.slice();
        var rangeAddr = getRangeAddress(range);
        var args;
        if (!isCut) {
            args = { action: 'filter', eventArgs: { range: rangeAddr, sheetIndex: sheetIdx, cancel: false } };
            this.parent.notify(beginAction, args);
            if (args.eventArgs.cancel) {
                return;
            }
            delete args.eventArgs.cancel;
        }
        if (this.filterCollection.get(sheetIdx).length || preventRefresh) {
            this.clearFilterHandler({ preventRefresh: preventRefresh, sheetIndex: sheetIdx });
        }
        this.filterRange.delete(sheetIdx);
        this.filterCollection.delete(sheetIdx);
        this.refreshFilterRange(range, true, sheetIdx);
        if (this.parent.filterCollection) {
            var count = 0;
            var filterColl = void 0;
            for (var i = 0, len = this.parent.filterCollection.length; i < len; i++) {
                filterColl = this.parent.filterCollection[count];
                if (filterColl.sheetIndex === sheetIdx && filterColl.filterRange === rangeAddr) {
                    this.parent.filterCollection.splice(count, 1);
                }
                else {
                    count++;
                }
            }
        }
        if (!isCut) {
            this.parent.notify(completeAction, args);
        }
    };
    /**
     * Handles filtering cell value based on context menu.
     *
     * @returns {void} - Handles filtering cell value based on context menu.
     */
    Filter.prototype.filterByCellValueHandler = function () {
        var _this = this;
        var sheetIdx = this.parent.activeSheetIndex;
        var sheet = this.parent.getActiveSheet();
        if (this.isInValidFilterRange(sheet)) {
            var l10n = this.parent.serviceLocator.getService(locale);
            this.filterRangeAlertHandler({ error: l10n.getConstant('FilterOutOfRangeError') });
            return;
        }
        var cell = getRangeIndexes(sheet.activeCell);
        if (!this.isFilterRange(sheetIdx, cell[0], cell[1])) {
            this.processRange(sheet, sheetIdx);
        }
        var range = this.filterRange.get(sheetIdx).range.slice();
        range[0] = range[0] + 1; // to skip first row.
        range[2] = sheet.usedRange.rowIndex; //filter range should be till used range.
        range[1] = range[3] = cell[1];
        var field = getColumnHeaderText(cell[1] + 1);
        var selectedCell = getCell(cell[0], cell[1], sheet);
        var cellVal = getValueFromFormat(this.parent, selectedCell, cell[0], cell[1]);
        if (isNumber(cellVal) && !(selectedCell.format && selectedCell.format === '@')) {
            cellVal = parseFloat(cellVal);
        }
        var predicates = [{ field: field, operator: 'equal', type: this.getColumnType(sheet, cell[1], cell).type,
                matchCase: false, value: cellVal }];
        var addr = sheet.name + "!" + this.getPredicateRange(range, this.filterCollection.get(sheetIdx));
        var fullAddr = getRangeAddress(range);
        getData(this.parent, addr, true, true, null, true, null, null, false, fullAddr).then(function (jsonData) {
            _this.filterSuccessHandler(new DataManager(jsonData), { action: 'filtering', filterCollection: predicates, field: field, isFilterByValue: true });
        });
    };
    /**
     * Creates filter buttons and renders the filter applied cells.
     *
     * @param { any} args - Specifies the args
     * @param { HTMLElement} args.td - specify the element
     * @param { number} args.rowIndex - specify the rowIndex
     * @param { number} args.colIndex - specify the colIndex
     * @param { number} args.sIdx - specify the sIdx
     * @returns {void} - Creates filter buttons and renders the filter applied cells.
     */
    Filter.prototype.renderFilterCellHandler = function (args) {
        var sheetIdx = !isNullOrUndefined(args.sIdx) ? args.sIdx : this.parent.activeSheetIndex;
        if (sheetIdx === this.parent.activeSheetIndex && this.isFilterCell(sheetIdx, args.rowIndex, args.colIndex)) {
            if (!args.td) {
                return;
            }
            var filterButton = args.td.querySelector('.e-filter-icon');
            if (filterButton) {
                filterButton.className = 'e-btn-icon e-icons e-filter-icon' + this.getFilterSortClassName(args.colIndex, sheetIdx);
            }
            else {
                filterButton = this.filterBtn.cloneNode(true);
                filterButton.firstElementChild.className += this.getFilterSortClassName(args.colIndex, sheetIdx);
                args.td.insertBefore(filterButton, args.td.firstChild);
            }
        }
    };
    Filter.prototype.getFilterSortClassName = function (colIdx, sheetIdx) {
        var field = getColumnHeaderText(colIdx + 1);
        var className = '';
        var predicates = this.filterCollection.get(sheetIdx);
        var sortCollection = this.parent.sortCollection;
        for (var i = 0; i < predicates.length; i++) {
            if (predicates[i].field === field) {
                className = ' e-filtered';
                break;
            }
        }
        if (sortCollection) {
            for (var i = 0; i < sortCollection.length; i++) {
                if (sortCollection[i].sheetIndex === sheetIdx && sortCollection[i].columnIndex === colIdx) {
                    className += sortCollection[i].order === 'Ascending' ? ' e-sortasc-filter' : ' e-sortdesc-filter';
                    break;
                }
            }
        }
        return className;
    };
    /**
     * Refreshes the filter header range.
     *
     * @param {number[]} filterRange - Specify the filterRange.
     * @param {boolean} remove - Specify the bool value
     * @param {number} sIdx - Specify the index.
     * @returns {void} - Refreshes the filter header range.
     */
    Filter.prototype.refreshFilterRange = function (filterRange, remove, sIdx) {
        var sheetIdx = sIdx;
        if (!sheetIdx && sheetIdx !== 0) {
            sheetIdx = this.parent.activeSheetIndex;
        }
        if (!filterRange && !this.filterRange.get(sheetIdx)) {
            filterRange = [0, 0, 0, 0];
        }
        var range = filterRange || this.filterRange.get(sheetIdx).range.slice();
        for (var index = range[1]; index <= range[3]; index++) {
            var cell = this.parent.getCell(range[0], index);
            if (remove) {
                if (cell && cell.hasChildNodes()) {
                    var element = cell.querySelector('.e-filter-btn');
                    if (element) {
                        element.parentElement.removeChild(element);
                    }
                }
            }
            else {
                this.renderFilterCellHandler({ td: cell, rowIndex: range[0], colIndex: index, sIdx: sheetIdx });
            }
        }
        if (this.parent.sortCollection) {
            this.parent.notify(sortImport, null);
        }
    };
    /**
     * Checks whether the provided cell is a filter cell.
     *
     * @param {number} sheetIdx - Specify the sheet index.
     * @param {number} rowIndex - Specify the row index
     * @param {number} colIndex - Specify the col index.
     * @returns {boolean} - Checks whether the provided cell is a filter cell.
     */
    Filter.prototype.isFilterCell = function (sheetIdx, rowIndex, colIndex) {
        var range = this.filterRange.get(sheetIdx) && this.filterRange.get(sheetIdx).range;
        return (range && range[0] === rowIndex && range[1] <= colIndex && range[3] >= colIndex);
    };
    /**
     * Checks whether the provided cell is in a filter range
     *
     * @param {number} sheetIdx - Specify the sheet index.
     * @param {number} rowIndex - Specify the row index
     * @param {number} colIndex - Specify the col index.
     * @returns {boolean} - Checks whether the provided cell is in a filter range
     */
    Filter.prototype.isFilterRange = function (sheetIdx, rowIndex, colIndex) {
        var range = this.filterRange.get(sheetIdx) && this.filterRange.get(sheetIdx).range;
        return (range && range[0] <= rowIndex && range[2] >= rowIndex && range[1] <= colIndex && range[3] >= colIndex);
    };
    /**
     * Gets the filter information from active cell
     *
     * @param {any} args - Specifies the args
     * @param {string} args.field - Specify the field
     * @param {string} args.clearFilterText - Specify the clearFilterText
     * @param {boolean} args.isFiltered - Specify the isFiltered
     * @param {boolean} args.isClearAll - Specify the isClearAll
     * @returns {void} - Triggers before context menu created to enable or disable items.
     */
    Filter.prototype.getFilteredColumnHandler = function (args) {
        var sheetIdx = isUndefined(args.sheetIndex) ? this.parent.activeSheetIndex : args.sheetIndex;
        var l10n = this.parent.serviceLocator.getService(locale);
        args.clearFilterText = l10n.getConstant('ClearFilter');
        if (this.filterRange.has(sheetIdx)) {
            var filterCollection = this.filterCollection.get(sheetIdx);
            if (args.isClearAll) {
                args.isFiltered = filterCollection && filterCollection.length > 0;
                return;
            }
            var range = this.filterRange.get(sheetIdx).range.slice();
            var sheet = getSheet(this.parent, sheetIdx);
            var cell = getCellIndexes(sheet.activeCell);
            if (this.isFilterRange(sheetIdx, cell[0], cell[1])) {
                args.field = getColumnHeaderText(cell[1] + 1);
                var headerCell = getCell(range[0], cell[1], sheet);
                var cellValue = this.parent.getDisplayText(headerCell);
                args.clearFilterText = l10n.getConstant('ClearFilterFrom') + '\"'
                    + (cellValue ? cellValue.toString() : 'Column ' + args.field) + '\"';
                filterCollection.some(function (value) {
                    args.isFiltered = value.field === args.field;
                    return args.isFiltered;
                });
            }
        }
    };
    /**
     * Triggers before context menu created to enable or disable items.
     *
     * @param {any} e - Specifies the args
     * @param {HTMLElement} e.element - Specify the element
     * @param {MenuItemModel[]} e.items - Specify the items
     * @param {MenuItemModel} e.parentItem - Specify the parentItem
     * @param {string} e.target - Specify the target
     * @returns {void} - Triggers before context menu created to enable or disable items.
     */
    Filter.prototype.cMenuBeforeOpenHandler = function (e) {
        var id = this.parent.element.id + '_cmenu';
        if (e.parentItem && e.parentItem.id === id + '_filter' && e.target === '') {
            var args = { isFiltered: false };
            this.getFilteredColumnHandler(args);
            this.parent.enableContextMenuItems([id + '_clearfilter', id + '_reapplyfilter'], !!args.isFiltered, true);
        }
    };
    /**
     * Closes the filter popup.
     *
     * @returns {void} - Closes the filter popup.
     */
    Filter.prototype.closeDialog = function () {
        var filterPopup = document.querySelector('.e-filter-popup');
        if (filterPopup && filterPopup.id.includes(this.parent.element.id)) {
            var excelFilter = getComponent(filterPopup, 'dialog');
            EventHandler.remove(filterPopup, getStartEvent(), this.filterMouseDownHandler);
            if (excelFilter) {
                excelFilter.hide();
            }
            this.parent.notify(filterDialogClose, null);
        }
    };
    Filter.prototype.removeFilterClass = function () {
        if (this.parent.element.style.position === 'relative') {
            this.parent.element.style.position = '';
        }
        if (this.parent.element.classList.contains('e-filter-open')) {
            this.parent.element.classList.remove('e-filter-open');
        }
    };
    /**
     * Returns true if the filter popup is opened.
     *
     * @returns {boolean} - Returns true if the filter popup is opened.
     */
    Filter.prototype.isPopupOpened = function () {
        var filterPopup = document.getElementsByClassName('e-filter-popup')[0];
        return filterPopup && filterPopup.id.includes(this.parent.element.id) && filterPopup.style.display !== 'none';
    };
    Filter.prototype.filterCellKeyDownHandler = function (args) {
        var sheet = this.parent.getActiveSheet();
        var indexes = getCellIndexes(sheet.activeCell);
        if (this.isFilterCell(this.parent.activeSheetIndex, indexes[0], indexes[1])) {
            if (args.closePopup) {
                this.closeDialog();
            }
            else {
                args.isFilterCell = true;
                if (!this.isPopupOpened()) {
                    var target = this.parent.getCell(indexes[0], indexes[1]);
                    if (target) {
                        this.openDialog(target);
                    }
                }
            }
        }
    };
    Filter.prototype.filterMouseDownHandler = function (e) {
        if ((Browser.isDevice && e.type === 'mousedown') || this.parent.getActiveSheet().isProtected) {
            return;
        }
        var target = e.target;
        if (target.classList.contains('e-filter-icon') || target.classList.contains('e-filter-btn')) {
            if (this.isPopupOpened()) {
                this.closeDialog();
            }
            this.openDialog(parentsUntil(target, 'e-cell'));
        }
        else if (this.isPopupOpened()) {
            var offsetEle = target.offsetParent;
            if (!target.classList.contains('e-searchinput') && !target.classList.contains('e-searchclear') && (offsetEle &&
                !offsetEle.classList.contains('e-filter-popup') && !offsetEle.classList.contains('e-text-content') &&
                !offsetEle.classList.contains('e-checkboxtree') && !offsetEle.classList.contains('e-checkbox-wrapper'))) {
                this.closeDialog();
            }
            else {
                this.selectSortItemHandler(target);
            }
        }
    };
    Filter.prototype.initTreeView = function (args, excelFilter) {
        var _this = this;
        var checkedNodes = [];
        var allNodes = [];
        var idColl = {};
        var groupedYears = [];
        var groupedMonths = [];
        var groupedData = [];
        var otherData = [];
        var value;
        var month;
        var day;
        var date;
        var mId;
        var dId;
        var monthNum;
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
            'November', 'December'];
        var grpObj;
        var indeterminate = false;
        var sheet = this.parent.getActiveSheet();
        var addNodes = function (data) {
            idColl["" + dId] = true;
            if (isFilterHidden(sheet, Number(data['__rowIndex']) - 1)) {
                indeterminate = true;
            }
            else {
                checkedNodes.push(dId);
            }
            allNodes.push(dId);
        };
        args.dataSource.forEach(function (data) {
            date = data[args.column.field];
            if (typeof date === 'object' && !!Date.parse(date.toString())) {
                value = date.getFullYear().toString();
                if (!idColl["" + value]) {
                    grpObj = { __rowIndex: value, hasChild: true };
                    grpObj[args.column.field] = value;
                    groupedYears.push(grpObj);
                    idColl["" + value] = true;
                }
                monthNum = date.getMonth();
                month = months[monthNum];
                mId = value + ' ' + month;
                if (!idColl["" + mId]) {
                    grpObj = { __rowIndex: mId, pId: value, hasChild: true, month: monthNum };
                    grpObj[args.column.field] = month;
                    groupedMonths.push(grpObj);
                    idColl["" + mId] = true;
                }
                day = date.getDate();
                dId = mId + ' ' + day.toString();
                if (!idColl["" + dId]) {
                    grpObj = { __rowIndex: dId, pId: mId };
                    grpObj[args.column.field] = day;
                    groupedData.push(grpObj);
                    addNodes(data);
                }
            }
            else {
                if (!data[args.column.field] && data[args.column.field] !== 0) {
                    dId = 'blanks';
                    value = _this.parent.serviceLocator.getService(locale).getConstant('Blanks');
                }
                else {
                    dId = 'text ' + data[args.column.field].toString().toLowerCase();
                    value = data[args.column.field];
                }
                if (!idColl["" + dId]) {
                    grpObj = { __rowIndex: dId };
                    grpObj[args.column.field] = value;
                    otherData.push(grpObj);
                    addNodes(data);
                }
            }
        });
        groupedYears = new DataManager(groupedYears).executeLocal(new Query().sortBy(args.column.field, 'decending'));
        groupedMonths = new DataManager(groupedMonths).executeLocal(new Query().sortBy('month', 'ascending'));
        groupedData = new DataManager(groupedData).executeLocal(new Query().sortBy(args.column.field, 'ascending'));
        groupedData = groupedYears.concat(groupedMonths.concat(groupedData));
        if (otherData.length) {
            otherData = new DataManager(otherData).executeLocal(new Query().sortBy(args.column.field, 'ascending'));
            groupedData = groupedData.concat(otherData);
        }
        var nodeClick = function (args) {
            var checkedNode = [args.node];
            if (args.event.target.classList.contains('e-fullrow') || args.event.key == 'Enter') {
                var getNodeDetails = treeViewObj.getNode(args.node);
                if (getNodeDetails.isChecked === 'true') {
                    treeViewObj.uncheckAll(checkedNode);
                }
                else {
                    treeViewObj.checkAll(checkedNode);
                }
            }
        };
        var selectAllClick = function () {
            cBox.indeterminate = false;
            if (cBoxFrame.classList.contains('e-check')) {
                treeViewObj.uncheckAll();
                cBoxFrame.classList.add('e-uncheck');
                cBox.checked = false;
            }
            else {
                treeViewObj.checkAll();
                cBoxFrame.classList.add('e-check');
                cBox.checked = true;
            }
        };
        var updateState = function () {
            removeClass([cBoxFrame], ['e-check', 'e-stop', 'e-uncheck']);
            if (args.btnObj.element.disabled) {
                args.btnObj.element.disabled = false;
            }
            if (indeterminate) {
                if (treeViewObj.checkedNodes.length) {
                    cBoxFrame.classList.add('e-stop');
                }
                else {
                    cBoxFrame.classList.add('e-uncheck');
                    args.btnObj.element.disabled = true;
                }
            }
            else {
                cBoxFrame.classList.add('e-check');
            }
            cBox.indeterminate = indeterminate;
            cBox.checked = !indeterminate;
        };
        var selectAllObj = {};
        selectAllObj[args.column.field] = this.parent.serviceLocator.getService(locale).getConstant('SelectAll');
        var selectAll = createCboxWithWrap(getUid('cbox'), excelFilter.createCheckbox(selectAllObj[args.column.field], false, selectAllObj), 'e-ftrchk');
        selectAll.classList.add('e-spreadsheet-ftrchk');
        var cBoxFrame = selectAll.querySelector('.e-frame');
        cBoxFrame.classList.add('e-selectall');
        selectAll.addEventListener('click', selectAllClick.bind(this));
        args.element.appendChild(selectAll);
        var cBox = selectAll.querySelector('.e-chk-hidden');
        var treeViewEle = this.parent.createElement('div');
        var treeViewObj = new TreeView({
            fields: { dataSource: groupedData, id: '__rowIndex', parentID: 'pId', text: args.column.field, hasChildren: 'hasChild' },
            enableRtl: this.parent.enableRtl, showCheckBox: true, cssClass: 'e-checkboxtree', checkedNodes: checkedNodes,
            nodeClicked: nodeClick.bind(this),
            keyPress: nodeClick.bind(this),
            nodeChecked: function (args) {
                if (args.action !== 'indeterminate') {
                    indeterminate = treeViewObj.checkedNodes.length !== treeViewObj.fields.dataSource.length;
                    updateState();
                }
            }
        });
        treeViewObj.createElement = this.parent.createElement;
        treeViewObj.appendTo(treeViewEle);
        args.element.appendChild(treeViewEle);
        checkedNodes = treeViewObj.checkedNodes;
        updateState();
        var applyBtnClickHandler = function () {
            if (treeViewObj.checkedNodes.length === groupedData.length) {
                _this.filterSuccessHandler(new DataManager(args.dataSource), { action: 'clear-filter', field: args.column.field });
            }
            else {
                _this.generatePredicate(treeViewObj.checkedNodes, otherData.length ? 'string' : args.type, args.column.field, excelFilter, allNodes, treeViewObj.checkedNodes.length > groupedData.length / 2);
            }
        };
        args.btnObj.element.addEventListener('click', applyBtnClickHandler.bind(this));
        var refreshCheckboxes = this.refreshCheckbox.bind(this, groupedData, treeViewObj, checkedNodes);
        var filterDlgCloseHandler = function () {
            _this.parent.off(refreshCheckbox, refreshCheckboxes);
            _this.parent.off(filterDialogClose, filterDlgCloseHandler);
        };
        this.parent.on(filterDialogClose, filterDlgCloseHandler, this);
        this.parent.on(refreshCheckbox, refreshCheckboxes, this);
    };
    Filter.prototype.generatePredicate = function (checkedNodes, type, field, excelFilter, allNodes, isNotEqual) {
        var predicates = [];
        var predicate;
        var months = { 'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5, 'July': 6,
            'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11 };
        var valArr;
        var date;
        var val;
        var otherType;
        var updateOtherPredicate = function () {
            if (valArr[0] === 'blanks') {
                predicates.push(Object.assign({ value: '', type: type }, predicate));
            }
            else if (valArr[0] === 'text') {
                valArr.splice(0, 1);
                val = valArr.join(' ');
                if (isNaN(Number(val))) {
                    otherType = 'string';
                }
                else {
                    val = Number(val);
                    otherType = 'number';
                }
                predicates.push(Object.assign({ value: val, type: otherType }, predicate));
            }
        };
        var setDate = function () {
            date = new Date(Number(valArr[0]), months[valArr[1]], Number(valArr[2]));
            if (date.getDate()) {
                predicates.push(Object.assign({ value: date, type: type }, predicate));
            }
            else {
                updateOtherPredicate();
            }
        };
        if (isNotEqual) {
            predicate = { field: field, ignoreAccent: false, matchCase: false, predicate: 'and', operator: 'notequal' };
            for (var i = 0, len = allNodes.length; i < len; i++) {
                if (checkedNodes.indexOf(allNodes[i]) === -1) {
                    valArr = allNodes[i].split(' ');
                    setDate();
                }
            }
        }
        else {
            predicate = { field: field, ignoreAccent: false, matchCase: false, predicate: 'or', operator: 'equal' };
            for (var i = 0, len = checkedNodes.length; i < len; i++) {
                valArr = checkedNodes[i].split(' ');
                if (valArr.length === 3) {
                    setDate();
                }
                else {
                    updateOtherPredicate();
                }
            }
        }
        excelFilter.initiateFilter(predicates);
    };
    Filter.prototype.refreshCheckbox = function (groupedData, treeViewObj, checkedNodes, args) {
        var searchValue;
        if (args.event.type === 'keyup') {
            searchValue = args.event.target.value;
        }
        else if (args.event.target.classList.contains('e-search-icon')) {
            return;
        }
        var filteredList;
        var changeData = function () {
            if (filteredList.length && !treeViewObj.fields.dataSource.length) {
                var wrapper = treeViewObj.element.parentElement;
                wrapper.getElementsByClassName('e-spreadsheet-ftrchk')[0].classList.remove('e-hide');
                detach(wrapper.getElementsByClassName('e-checkfltrnmdiv')[0]);
            }
            treeViewObj.fields.dataSource = filteredList;
            treeViewObj.dataBind();
        };
        if (searchValue) {
            filteredList = new DataManager(groupedData).executeLocal(new Query().where(new Predicate(treeViewObj.fields.text, 'contains', searchValue, true)));
            var filterId = {};
            var predicates = [];
            var key = void 0;
            var initList = void 0;
            var strFilter = isNaN(Number(searchValue));
            var expandId = void 0;
            var level = void 0;
            if (strFilter) {
                for (var i = 0; i < filteredList.length; i++) {
                    if (!filteredList[i]['hasChild']) {
                        continue;
                    }
                    predicates.push(new Predicate('pId', 'equal', filteredList[i]['__rowIndex'], false));
                    key = filteredList[i]['pId'];
                    if (!filterId["" + key]) {
                        predicates.push(new Predicate('__rowIndex', 'equal', key, false));
                        filterId["" + key] = true;
                    }
                }
                initList = filteredList;
                level = 1;
            }
            else {
                var year = void 0;
                var filterParentId = {};
                expandId = [];
                for (var i = 0; i < filteredList.length; i++) {
                    key = filteredList[i]['pId'];
                    if (key) {
                        year = key.split(' ')[0];
                        if (!filterId["" + key]) {
                            predicates.push(new Predicate('__rowIndex', 'equal', key, false));
                            filterId["" + key] = true;
                            expandId.push(year);
                            expandId.push(key);
                        }
                        if (!filterParentId["" + year]) {
                            if (!filterId["" + year]) {
                                predicates.push(new Predicate('__rowIndex', 'equal', year, false));
                                filterId["" + year] = true;
                            }
                            predicates.push(new Predicate('__rowIndex', 'equal', filteredList[i]['__rowIndex'], false));
                        }
                    }
                    else {
                        key = filteredList[i]['__rowIndex'];
                        if (!filterParentId["" + key]) {
                            predicates.push(new Predicate('__rowIndex', 'contains', key, false));
                            filterParentId["" + key] = true;
                        }
                    }
                }
                initList = [];
            }
            if (filteredList.length) {
                if (predicates.length) {
                    filteredList = initList.concat(new DataManager(groupedData).executeLocal(new Query().where(Predicate.or(predicates))));
                }
                changeData();
                treeViewObj.checkAll();
                var duration = treeViewObj.animation.expand.duration;
                treeViewObj.animation.expand.duration = 0;
                treeViewObj.expandAll(expandId, level);
                treeViewObj.animation.expand.duration = duration;
            }
            else if (treeViewObj.fields.dataSource.length) {
                changeData();
                var wrapper = treeViewObj.element.parentElement;
                wrapper.getElementsByClassName('e-spreadsheet-ftrchk')[0].classList.add('e-hide');
                var noRecordEle = this.parent.createElement('div', { className: 'e-checkfltrnmdiv' });
                var noRecordText = this.parent.createElement('span');
                noRecordText.innerText = this.parent.serviceLocator.getService(locale).getConstant('NoResult');
                noRecordEle.appendChild(noRecordText);
                wrapper.appendChild(noRecordEle);
            }
        }
        else {
            filteredList = groupedData;
            changeData();
            treeViewObj.checkedNodes = checkedNodes;
            treeViewObj.dataBind();
        }
    };
    Filter.prototype.openDialog = function (cell) {
        var _this = this;
        var colIndex = parseInt(cell.getAttribute('aria-colindex'), 10);
        var field = getColumnHeaderText(colIndex);
        this.parent.showSpinner();
        var sheetIdx = this.parent.activeSheetIndex;
        var filterRange = this.filterRange.get(sheetIdx);
        var range = filterRange.range.slice();
        var sheet = this.parent.getActiveSheet();
        var filterCell = getCell(range[0], colIndex - 1, sheet);
        var displayName = this.parent.getDisplayText(filterCell);
        range[0] = range[0] + 1; // to skip first row.
        if (!filterRange.useFilterRange) {
            range[2] = sheet.usedRange.rowIndex; //filter range should be till used range.
        }
        var fullRange = [range[0], colIndex - 1, range[2], colIndex - 1];
        var totalRange = this.getPredicateRange(fullRange, this.filterCollection.get(sheetIdx), colIndex - 1);
        var otherColPredicate = totalRange.otherColPredicate;
        var addr = sheet.name + "!" + totalRange.address;
        var fullAddr = getRangeAddress(fullRange);
        var col = this.getColumnType(sheet, colIndex - 1, range);
        var type = col.type;
        var dateColData;
        var isDateCol = type === 'date' || col.isDateAvail;
        if (isDateCol && !totalRange.filteredCol) {
            dateColData = [];
        }
        getData(this.parent, addr, true, true, null, true, null, null, false, fullAddr, null, dateColData).then(function (jsonData) {
            var checkBoxData;
            _this.parent.element.style.position = 'relative';
            _this.parent.element.classList.add('e-filter-open');
            if (isDateCol) {
                if (dateColData || !otherColPredicate.length) {
                    checkBoxData = new DataManager(dateColData || jsonData);
                }
                else {
                    var data = new DataManager(jsonData).executeLocal(new Query().where(Predicate.and(_this.getPredicates(otherColPredicate))));
                    checkBoxData = new DataManager(data);
                }
                var beforeCboxRender_1 = function (args) {
                    _this.parent.off(beforeCheckboxRender, beforeCboxRender_1);
                    args.isCheckboxFilterTemplate = true;
                    _this.initTreeView(args, excelFilter);
                };
                _this.parent.on(beforeCheckboxRender, beforeCboxRender_1, _this);
            }
            else {
                //to avoid undefined array data
                jsonData.some(function (value, index) {
                    if (value) {
                        checkBoxData = new DataManager(jsonData.slice(index));
                    }
                    return !!value;
                });
            }
            var target = cell.querySelector('.e-filter-btn');
            var options = {
                type: type, field: field, format: (type === 'date' ? _this.getDateFormatFromColumn(sheet, colIndex, range) : null),
                displayName: displayName || 'Column ' + field,
                dataSource: checkBoxData, height: _this.parent.element.classList.contains('e-bigger') ? 800 : 500, columns: [],
                hideSearchbox: false, filteredColumns: _this.filterCollection.get(sheetIdx), column: { 'field': field, 'filter': {} },
                handler: _this.filterSuccessHandler.bind(_this, new DataManager(jsonData)), target: target,
                position: { X: 0, Y: 0 }, localeObj: _this.parent.serviceLocator.getService(locale)
            };
            var excelFilter = new ExcelFilterBase(_this.parent, _this.getLocalizedCustomOperators());
            excelFilter.openDialog(options);
            var filterPopup = document.querySelector('.e-filter-popup');
            if (filterPopup && filterPopup.id.includes(_this.parent.element.id)) {
                EventHandler.add(filterPopup, getStartEvent(), _this.filterMouseDownHandler, _this);
                var parentOff = _this.parent.element.getBoundingClientRect();
                var cellOff = target.getBoundingClientRect();
                var popupOff = filterPopup.getBoundingClientRect();
                var left = (cellOff.right - parentOff.left) - popupOff.width;
                if (left < 0) { // Left collision wrt spreadsheet left
                    left = cellOff.left - parentOff.left;
                }
                filterPopup.style.left = left + "px";
                filterPopup.style.top = '0px';
                filterPopup.style.visibility = 'hidden';
                if (filterPopup.classList.contains('e-hide')) {
                    filterPopup.classList.remove('e-hide');
                }
                var top_1 = cellOff.bottom - parentOff.top;
                if (popupOff.height - (parentOff.bottom - cellOff.bottom) > 0) { // Bottom collision wrt spreadsheet bottom
                    top_1 -= popupOff.height - (parentOff.bottom - cellOff.bottom);
                    if (top_1 < 0) {
                        top_1 = 0;
                    }
                }
                filterPopup.style.top = top_1 + "px";
                filterPopup.style.visibility = '';
            }
            _this.parent.hideSpinner();
        });
    };
    Filter.prototype.getPredicateRange = function (range, predicates, col) {
        var addr = getRangeAddress(range);
        var filteredCol;
        var otherColPredicate = [];
        if (predicates && predicates.length) {
            var predicateRange_1;
            var colIdx_1;
            predicates.forEach(function (predicate) {
                if (predicate.field) {
                    predicateRange_1 = "" + predicate.field + (range[0] + 1) + ":" + predicate.field + (range[2] + 1);
                    colIdx_1 = getColIndex(predicate.field);
                    if (!addr.includes(predicateRange_1)) {
                        addr += "," + predicateRange_1;
                        if (colIdx_1 < range[1]) {
                            range[1] = colIdx_1;
                        }
                        if (colIdx_1 > range[3]) {
                            range[3] = colIdx_1;
                        }
                    }
                    if (col !== undefined) {
                        if (colIdx_1 === col) {
                            filteredCol = true;
                        }
                        else {
                            otherColPredicate.push(predicate);
                        }
                    }
                }
            });
        }
        else {
            filteredCol = true;
        }
        return col === undefined ? addr : { address: addr, filteredCol: filteredCol, otherColPredicate: otherColPredicate };
    };
    Filter.prototype.filterDialogCreatedHandler = function () {
        var filterPopup = document.querySelector('.e-filter-popup');
        if (filterPopup && filterPopup.id.includes(this.parent.element.id) && filterPopup.classList.contains('e-popup-close')) {
            filterPopup.classList.add('e-hide');
        }
    };
    /**
     * Formats cell value for listing it in filter popup.
     *
     * @param {any} args - Specifies the args
     * @param {string | number} args.value - Specify the value
     * @param {object} args.column - Specify the column
     * @param {object} args.data - Specify the data
     * @returns {void} - Formats cell value for listing it in filter popup.
     */
    Filter.prototype.filterCboxValueHandler = function (args) {
        if (args.column && args.data) {
            var field = args.column['field'];
            if (args.value) {
                var indexes = getCellIndexes(field + args.data['dataObj']['__rowIndex']);
                var cell = getCell(indexes[0], indexes[1], this.parent.getActiveSheet());
                if (cell && cell.format) {
                    args.value = this.parent.getDisplayText(cell);
                }
            }
        }
    };
    /**
     * Triggers when sorting items are chosen on context menu of filter popup.
     *
     * @param {HTMLElement} target - Specify the element.
     * @returns {void} - Triggers when sorting items are chosen on context menu of filter popup.
     */
    Filter.prototype.selectSortItemHandler = function (target) {
        var l10n = this.parent.serviceLocator.getService(locale);
        var sortOrder = target.classList.contains('e-filter-sortasc') ? 'Ascending'
            : target.classList.contains('e-filter-sortdesc') ? 'Descending' : null;
        if (sortOrder === 'Ascending') {
            target.setAttribute('aria-label', l10n.getConstant('SortAscending'));
        }
        else {
            target.setAttribute('aria-label', l10n.getConstant('SortDescending'));
        }
        if (!sortOrder) {
            return;
        }
        var sheet = this.parent.getActiveSheet();
        var sheetIdx = this.parent.activeSheetIndex;
        var filterRange = this.filterRange.get(sheetIdx);
        var range = filterRange.range.slice();
        range[0] = range[0] + 1; // to skip first row.
        if (!filterRange.useFilterRange) {
            range[2] = sheet.usedRange.rowIndex; //filter range should be till used range.
        }
        this.parent.sortCollection = this.parent.sortCollection ? this.parent.sortCollection : [];
        var prevSort;
        for (var i = 0; i < this.parent.sortCollection.length; i++) {
            if (this.parent.sortCollection[i] && this.parent.sortCollection[i].sheetIndex === sheetIdx) {
                prevSort = this.parent.sortCollection[i];
                this.parent.sortCollection.splice(i, 1);
            }
        }
        this.parent.sortCollection.push({ sortRange: getRangeAddress(range), columnIndex: getIndexesFromAddress(sheet.activeCell)[1], order: sortOrder,
            sheetIndex: sheetIdx });
        if (!prevSort) {
            prevSort = { order: '' };
        }
        this.parent.notify(applySort, { sortOptions: { sortDescriptors: { order: sortOrder }, containsHeader: false }, previousSort: prevSort, range: getRangeAddress(range) });
        this.refreshFilterRange();
        this.closeDialog();
    };
    /**
     * Triggers when OK button or clear filter item is selected
     *
     * @param {DataManager} dataSource - Specify the data source
     * @param {Object} args - Specify the data source
     * @param {string} args.action - Specify the action
     * @param {PredicateModel[]} args.filterCollection - Specify the filter collection.
     * @param {string} args.field - Specify the field.
     * @param {number} args.sIdx - Specify the index.
     * @param {boolean} args.isUndoRedo - Specify the bool.
     * @param {boolean} args.isInternal - Specify the isInternal.
     * @param {boolean} args.isFilterByValue - Specify the isFilterByValue.
     * @param {PredicateModel[]} args.prevPredicates - Specify the prevPredicates.
     * @returns {void} - Triggers when OK button or clear filter item is selected
     */
    Filter.prototype.filterSuccessHandler = function (dataSource, args) {
        var sheetIdx = args.sIdx;
        if (!sheetIdx && sheetIdx !== 0) {
            sheetIdx = this.parent.activeSheetIndex;
        }
        var prevPredicates = args.prevPredicates || [].slice.call(this.filterCollection.get(sheetIdx));
        if (args.isFilterByValue && !prevPredicates.length) {
            prevPredicates = undefined;
        }
        var predicates = this.filterCollection.get(sheetIdx);
        this.updatePredicate(predicates, args.field);
        if (args.action === 'clear-filter' && predicates.length === prevPredicates.length) {
            return;
        }
        if (args.action === 'filtering') {
            predicates = predicates.concat(args.filterCollection);
            if (predicates.length) {
                for (var i = 0; i < predicates.length; i++) {
                    args.field = predicates[i].field;
                }
            }
        }
        this.filterCollection.set(sheetIdx, predicates);
        var filterOptions = {
            datasource: dataSource,
            predicates: this.getPredicates(this.filterCollection.get(sheetIdx))
        };
        var filterRange = this.filterRange.get(sheetIdx);
        if (!filterRange.useFilterRange) {
            filterRange.range[2] = getSheet(this.parent, sheetIdx).usedRange.rowIndex; //extend the range if filtered
        }
        this.applyFilter(filterOptions, getRangeAddress(filterRange.range), sheetIdx, prevPredicates, false, args.isInternal);
    };
    Filter.prototype.updatePredicate = function (predicates, field) {
        var dataManager = new DataManager(predicates);
        var query = new Query();
        var fields = dataManager.executeLocal(query.where('field', 'equal', field));
        for (var index = 0; index < fields.length; index++) {
            var sameIndex = -1;
            for (var filterIndex = 0; filterIndex < predicates.length; filterIndex++) {
                if (predicates[filterIndex].field === fields[index].field) {
                    sameIndex = filterIndex;
                    break;
                }
            }
            if (sameIndex !== -1) {
                predicates.splice(sameIndex, 1);
            }
        }
    };
    /**
     * Triggers events for filtering and applies filter.
     *
     * @param {FilterOptions} filterOptions - Specify the filteroptions.
     * @param {string} range - Specify the range.
     * @param {number} sheetIdx - Specify the sheet index.
     * @param {PredicateModel[]} prevPredicates - Specify the predicates.
     * @param {boolean} isUndoRedo - Specify the undo redo.
     * @param {boolean} refresh - Spefify the refresh.
     * @param {boolean} isInternal - Specify the isInternal.
     * @returns {void} - Triggers events for filtering and applies filter.
     */
    Filter.prototype.applyFilter = function (filterOptions, range, sheetIdx, prevPredicates, refresh, isInternal) {
        var _this = this;
        var eventArgs = { range: range, predicates: [].slice.call(this.filterCollection.get(sheetIdx)), previousPredicates: prevPredicates, sheetIndex: sheetIdx, cancel: false };
        if (!isInternal) {
            this.parent.notify(beginAction, { action: 'filter', eventArgs: eventArgs });
            if (eventArgs.cancel) {
                return;
            }
        }
        if (range.indexOf('!') < 0) {
            range = this.parent.sheets[sheetIdx].name + '!' + range;
        }
        this.parent.showSpinner();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        var promise = new Promise(function (resolve, reject) { resolve((function () { })()); });
        var filterArgs = { args: { range: range,
                filterOptions: filterOptions }, promise: promise, refresh: refresh };
        this.parent.notify(initiateFilter, filterArgs);
        filterArgs.promise.then(function (args) {
            _this.refreshFilterRange();
            _this.parent.notify(getFilteredCollection, null);
            _this.parent.hideSpinner();
            if (!isInternal) {
                delete eventArgs.cancel;
                _this.parent.notify(completeAction, { action: 'filter', eventArgs: eventArgs });
                focus(_this.parent.element);
            }
            return Promise.resolve(args);
        }).catch(function (error) {
            _this.filterRangeAlertHandler({ error: error });
            return Promise.reject(error);
        });
    };
    /**
     * Gets the predicates for the sheet
     *
     * @param {number} sheetIdx - Specify the sheetindex
     * @returns {Predicate[]} - Gets the predicates for the sheet
     */
    Filter.prototype.getPredicates = function (predicateModel) {
        var predicateList = [];
        var excelPredicate = CheckBoxFilterBase.getPredicate(predicateModel);
        for (var _i = 0, _a = Object.keys(excelPredicate); _i < _a.length; _i++) {
            var prop = _a[_i];
            predicateList.push(excelPredicate["" + prop]);
        }
        return predicateList;
    };
    /**
     * Gets the column type to pass it into the excel filter options.
     *
     * @param {SheetModel} sheet - Specify the sheet.
     * @param {number} colIndex - Specify the colindex
     * @param {number[]} range - Specify the range.
     * @returns {string} - Gets the column type to pass it into the excel filter options.
     */
    Filter.prototype.getColumnType = function (sheet, colIndex, range) {
        var num = 0;
        var str = 0;
        var date = 0;
        var time = 0;
        for (var i = range[0]; i <= range[2]; i++) {
            var cell = getCell(i, colIndex, sheet);
            if (cell) {
                if (cell.format) {
                    var type = getTypeFromFormat(cell.format).toLowerCase();
                    switch (type) {
                        case 'number':
                        case 'currency':
                        case 'accounting':
                        case 'percentage':
                            num++;
                            break;
                        case 'shortdate':
                        case 'longdate':
                            date++;
                            break;
                        case 'time':
                            num++;
                            break;
                        default:
                            if (isCustomDateTime(cell.format)) {
                                date++;
                            }
                            else if (isNumber(cell.value)) {
                                num++;
                            }
                            else if (isNullOrUndefined(cell.value) || cell.value === "") {
                                continue;
                            }
                            else {
                                str++;
                            }
                            break;
                    }
                }
                else {
                    if (typeof cell.value === 'string' || cell.value === undefined || cell.value === null) {
                        str++;
                    }
                    else {
                        num++;
                    }
                }
            }
            else {
                continue;
            }
        }
        return { type: (num > str && num > date && num > time) ? 'number' : (str >= num && str >= date && str >= time) ? 'string'
                : (date > num && date > str && date > time) ? 'date' : 'datetime', isDateAvail: !!date };
    };
    Filter.prototype.getDateFormatFromColumn = function (sheet, colIndex, range) {
        var format;
        for (var i = range[0]; i <= range[2]; i++) {
            var cell = getCell(i, colIndex - 1, sheet);
            if (cell && cell.format) {
                var type = getTypeFromFormat(cell.format);
                if (type === 'ShortDate') {
                    format = cell.format.split('m').join('M');
                }
                else if (type === 'LongDate') {
                    format = 'EEEE, MMMM d, y';
                }
                else {
                    format = cell.format;
                }
                break;
            }
        }
        return format;
    };
    /**
     * Clear filter from the field.
     *
     * @param {any} args - Specifies the args
     * @param {{ field: string }} args.field - Specify the args
     * @param {boolean} args.isAction - Specify the isAction.
     * @param {boolean} args.preventRefresh - Specify the preventRefresh.
     * @returns {void} - Clear filter from the field.
     */
    Filter.prototype.clearFilterHandler = function (args) {
        var sheetIndex = args && args.sheetIndex !== undefined ? args.sheetIndex : this.parent.activeSheetIndex;
        if (args && args.field) {
            var predicates = [].slice.call(this.filterCollection.get(sheetIndex));
            if (predicates && predicates.length) {
                this.updatePredicate(predicates, args.field);
                this.initiateFilterUIHandler({ predicates: predicates, range: getRangeAddress(this.filterRange.get(sheetIndex).range), sIdx: sheetIndex });
            }
        }
        else {
            var isAction = args && args.isAction;
            var filterArgs = { isFiltered: false, isClearAll: true, sheetIndex: sheetIndex };
            this.getFilteredColumnHandler(filterArgs);
            if (filterArgs.isFiltered || (args && args.preventRefresh)) {
                var eventArgs = void 0;
                var sheet = getSheet(this.parent, sheetIndex);
                var filterRange = this.filterRange.get(sheetIndex);
                var range = filterRange.range;
                if (isAction) {
                    eventArgs = { range: getRangeAddress(range), predicates: [], previousPredicates: this.filterCollection.get(sheetIndex), sheetIndex: sheetIndex, cancel: false };
                    this.parent.notify(beginAction, { action: 'filter', eventArgs: eventArgs });
                    if (eventArgs.cancel) {
                        return;
                    }
                }
                this.filterCollection.set(sheetIndex, []);
                var filterColl = this.parent.filterCollection;
                for (var i = 0, len_1 = filterColl && filterColl.length; i < len_1; i++) {
                    if (filterColl[i].sheetIndex === sheetIndex) {
                        filterColl.splice(i, 1);
                        break;
                    }
                }
                var len = filterRange.useFilterRange ? range[2] : sheet.usedRange.rowIndex;
                if (this.parent.scrollSettings.enableVirtualization && ((len - range[0]) + 1 > (this.parent.viewport.rowCount +
                    (this.parent.getThreshold('row') * 2)))) {
                    for (var i = 0; i <= len; i++) {
                        setRow(sheet, i, { hidden: false, isFiltered: false });
                    }
                    if (!args || !args.preventRefresh) {
                        this.parent.renderModule.refreshSheet(false, false, true);
                    }
                }
                else {
                    this.refreshFilterRange(null, null, sheetIndex);
                    var evtArgs = { startIndex: range[0], hide: false, isFiltering: true, refreshUI: false, endIndex: filterRange.useFilterRange ? range[2] : sheet.usedRange.rowIndex, sheetIndex: sheetIndex };
                    this.parent.notify(hideShow, evtArgs);
                    if (evtArgs.refreshUI && (!args || !args.preventRefresh)) {
                        this.parent.renderModule.refreshSheet(false, false, true);
                    }
                }
                if (isAction) {
                    delete eventArgs.cancel;
                    this.parent.notify(completeAction, { action: 'filter', eventArgs: eventArgs });
                    focus(this.parent.element);
                }
            }
        }
    };
    /**
     * Reapplies the filter.
     *
     * @param {boolean} isInternal - Specifies the isInternal.
     * @param {boolean} refresh - Specifies the refresh.
     * @returns {void} - Reapplies the filter.
     */
    Filter.prototype.reapplyFilterHandler = function (isInternal, refresh) {
        var _this = this;
        var sheetIdx = this.parent.activeSheetIndex;
        if (this.filterRange.has(sheetIdx)) {
            var predicates_1 = this.filterCollection.get(sheetIdx);
            if (predicates_1 && predicates_1.length) {
                var sheet = getSheet(this.parent, sheetIdx);
                var filterRange_1 = this.filterRange.get(this.parent.activeSheetIndex);
                var range = filterRange_1.range.slice();
                range[0] = range[0] + 1;
                if (!filterRange_1.useFilterRange) {
                    range[2] = sheet.usedRange.rowIndex;
                }
                range[1] = range[3] = getColIndex(predicates_1[0].field);
                var addr = sheet.name + "!" + this.getPredicateRange(range, predicates_1.slice(1, predicates_1.length));
                getData(this.parent, addr, true, true, null, true, null, null, false, getRangeAddress(range)).then(function (jsonData) {
                    var predicate = _this.getPredicates(_this.filterCollection.get(sheetIdx));
                    _this.applyFilter({ predicates: predicate, datasource: new DataManager(jsonData) }, getRangeAddress(filterRange_1.range), sheetIdx, [].slice.call(predicates_1), refresh, isInternal);
                });
            }
        }
    };
    /**
     * Gets the filter information of the sheet.
     *
     * @param {FilterInfoArgs} args - Specify the args
     * @returns {void} - Gets the filter information of the sheet.
     */
    Filter.prototype.getFilterRangeHandler = function (args) {
        var sheetIdx = args.sheetIdx;
        if (this.filterRange && this.filterRange.has(sheetIdx)) {
            args.hasFilter = true;
            args.filterRange = this.filterRange.get(sheetIdx).range;
        }
        else {
            args.hasFilter = false;
            args.filterRange = null;
        }
    };
    /**
     * Returns the custom operators for filter items.
     *
     * @returns {Object} - Returns the custom operators for filter items.
     */
    Filter.prototype.getLocalizedCustomOperators = function () {
        var l10n = this.parent.serviceLocator.getService(locale);
        var numOptr = [
            { value: 'equal', text: l10n.getConstant('Equal') },
            { value: 'greaterthan', text: l10n.getConstant('GreaterThan') },
            { value: 'greaterthanorequal', text: l10n.getConstant('GreaterThanOrEqual') },
            { value: 'lessthan', text: l10n.getConstant('LessThan') },
            { value: 'lessthanorequal', text: l10n.getConstant('LessThanOrEqual') },
            { value: 'notequal', text: l10n.getConstant('NotEqual') }
        ];
        var customOperators = {
            stringOperator: [
                { value: 'startswith', text: l10n.getConstant('StartsWith') },
                { value: 'endswith', text: l10n.getConstant('EndsWith') },
                { value: 'contains', text: l10n.getConstant('Contains') },
                { value: 'equal', text: l10n.getConstant('Equal') },
                { value: 'isempty', text: l10n.getConstant('IsEmpty') },
                { value: 'doesnotstartwith', text: l10n.getConstant('NotStartsWith') },
                { value: 'doesnotendwith', text: l10n.getConstant('NotEndsWith') },
                { value: 'doesnotcontain', text: l10n.getConstant('NotContains') },
                { value: 'notequal', text: l10n.getConstant('NotEqual') },
                { value: 'isnotempty', text: l10n.getConstant('IsNotEmpty') }
            ],
            numberOperator: numOptr,
            dateOperator: numOptr,
            datetimeOperator: numOptr,
            booleanOperator: [
                { value: 'equal', text: l10n.getConstant('Equal') },
                { value: 'notequal', text: l10n.getConstant('NotEqual') }
            ]
        };
        return customOperators;
    };
    /**
     * To get filtered range and predicates collections
     *
     * @returns {void} - To get filtered range and predicates collections
     */
    Filter.prototype.getFilteredCollection = function () {
        var sheetLen = this.parent.sheets.length;
        var col = [];
        var fil;
        for (var i = 0; i < sheetLen; i++) {
            var range = void 0;
            var hasFilter = void 0;
            var args = { sheetIdx: i, filterRange: range, hasFilter: hasFilter };
            this.getFilterRangeHandler(args);
            if (args.hasFilter) {
                var colCollection = [];
                var condition = [];
                var value = [];
                var type = [];
                var predi = [];
                var predicate = this.filterCollection.get(args.sheetIdx);
                for (var i_1 = 0; i_1 < predicate.length; i_1++) {
                    if (predicate[i_1].field && predicate[i_1].operator) {
                        var colIdx = getCellIndexes(predicate[i_1].field + '1')[1];
                        colCollection.push(colIdx);
                        condition.push(predicate[i_1].operator);
                        value.push(isNullOrUndefined(predicate[i_1].value) ? '' : predicate[i_1].value);
                        type.push(predicate[i_1].type);
                        predi.push(predicate[i_1].predicate);
                    }
                }
                var address = getRangeAddress(args.filterRange);
                fil = {
                    sheetIndex: args.sheetIdx, filterRange: address, hasFilter: args.hasFilter, column: colCollection,
                    criteria: condition, value: value, dataType: type, predicates: predi
                };
                col.push(fil);
            }
        }
        if (fil) {
            this.parent.filterCollection = col;
        }
    };
    Filter.prototype.updateFilter = function (args) {
        if (this.parent.filterCollection && (args.initLoad || args.isOpen)) {
            for (var i = 0; i < this.parent.filterCollection.length; i++) {
                var filterCol = this.parent.filterCollection[i];
                var sIdx = filterCol.sheetIndex;
                if (i === 0 && !this.parent.isOpen && !args.isOpen) {
                    sIdx = 0;
                }
                var predicates = [];
                if (filterCol.column) {
                    for (var j = 0; j < filterCol.column.length; j++) {
                        var predicateCol = {
                            field: getCellAddress(0, filterCol.column[j]).charAt(0),
                            operator: this.getFilterOperator(filterCol.criteria[j]), value: typeof filterCol.value[j]
                                === 'string' ? filterCol.value[j].split('*').join('') : filterCol.value[j],
                            predicate: filterCol.predicates && filterCol.predicates[j],
                            type: filterCol.dataType && filterCol.dataType[j]
                        };
                        predicates.push(predicateCol);
                    }
                }
                for (var i_2 = 0; i_2 < predicates.length - 1; i_2++) {
                    if (predicates[i_2].field === predicates[i_2 + 1].field) {
                        if (!predicates[i_2].predicate) {
                            predicates[i_2].predicate = 'or';
                        }
                        if (!predicates[i_2 + 1].predicate) {
                            predicates[i_2 + 1].predicate = 'or';
                        }
                    }
                }
                this.parent.notify(initiateFilterUI, { predicates: predicates.length ? predicates : undefined, range: filterCol.filterRange, sIdx: sIdx, isInternal: true });
            }
            if (this.parent.sortCollection) {
                this.parent.notify(sortImport, null);
            }
        }
    };
    Filter.prototype.getFilterOperator = function (value) {
        switch (value) {
            case 'BeginsWith':
                value = 'startswith';
                break;
            case 'Less':
                value = 'lessthan';
                break;
            case 'EndsWith':
                value = 'endswith';
                break;
            case 'Equal':
                value = 'equal';
                break;
            case 'Notequal':
                value = 'notEqual';
                break;
            case 'Greater':
                value = 'greaterthan';
                break;
            case 'Contains':
                value = 'contains';
                break;
            case 'LessOrEqual':
                value = 'lessthanorequal';
                break;
            case 'GreaterOrEqual':
                value = 'greaterthanorequal';
                break;
            case 'NotContains':
                value = 'doesnotcontain';
                break;
            case 'NotBeginsWith':
                value = 'doesnotstartwith';
                break;
            case 'NotEndsWith':
                value = 'doesnotendwith';
                break;
            case 'Empty':
                value = 'isempty';
                break;
            case 'NotEmpty':
                value = 'isnotempty';
                break;
        }
        return value;
    };
    Filter.prototype.beforeInsertHandler = function (args) {
        if (args.modelType === 'Column') {
            var sheetIdx_1 = isUndefined(args.activeSheetIndex) ? this.parent.activeSheetIndex : args.activeSheetIndex;
            if (this.filterRange.size && this.filterRange.has(sheetIdx_1)) {
                var range = this.filterRange.get(sheetIdx_1).range;
                if (this.isFilterCell(sheetIdx_1, range[0], args.index) || args.index < range[1]) {
                    range[3] += args.model.length;
                    if (args.index <= range[1]) {
                        range[1] += args.model.length;
                    }
                    this.filterCollection.get(sheetIdx_1).forEach(function (predicate) {
                        var colIdx = getColIndex(predicate.field);
                        if (args.index <= colIdx) {
                            predicate.field = getColumnHeaderText(colIdx + args.model.length + 1);
                        }
                    });
                    if (this.parent.sortCollection) {
                        this.parent.sortCollection.forEach(function (sortCollection) {
                            if (sortCollection.sheetIndex === sheetIdx_1 && args.index <= sortCollection.columnIndex) {
                                sortCollection.columnIndex += args.model.length;
                            }
                        });
                    }
                    this.getFilteredCollection();
                }
            }
        }
        else if (args.modelType === 'Sheet') {
            var isChanged = false;
            for (var _i = 0, _a = Array.from(this.filterRange.keys()).sort().reverse(); _i < _a.length; _i++) {
                var key = _a[_i];
                if (args.index <= key) {
                    isChanged = true;
                    this.filterRange.set(key + args.model.length, this.filterRange.get(key));
                    this.filterRange.delete(key);
                    this.filterCollection.set(key + args.model.length, this.filterCollection.get(key));
                    this.filterCollection.delete(key);
                }
            }
            if (this.parent.sortCollection) {
                this.parent.sortCollection.forEach(function (sortCollection) {
                    if (args.index <= sortCollection.sheetIndex) {
                        sortCollection.sheetIndex += args.model.length;
                    }
                });
            }
            if (isChanged) {
                this.getFilteredCollection();
            }
        }
    };
    Filter.prototype.beforeDeleteHandler = function (args) {
        if (args.modelType === 'Column') {
            var sheetIdx = this.parent.activeSheetIndex;
            if (this.filterRange.size && this.filterRange.has(sheetIdx)) {
                var isChanged = true;
                var range = this.filterRange.get(sheetIdx).range;
                if (args.start >= range[1] && args.end <= range[3]) { // in between
                    range[3] -= args.end - args.start + 1;
                }
                else if (args.start < range[1] && args.end < range[1]) { // before
                    range[1] -= args.end - args.start + 1;
                    range[3] -= args.end - args.start + 1;
                }
                else if (args.start < range[1] && args.end > range[1] && args.end < range[3]) { // from before to inbetween
                    range[1] = args.start;
                    range[3] -= args.end - args.start + 1;
                }
                else {
                    isChanged = false;
                }
                if (isChanged) {
                    var filterCollection = this.filterCollection.get(sheetIdx);
                    var isPredicateRemoved = void 0;
                    for (var i = filterCollection.length - 1; i >= 0; i--) {
                        var colIdx = getColIndex(filterCollection[i].field);
                        if (args.end < colIdx) {
                            filterCollection[i].field = getColumnHeaderText(colIdx - (args.end - args.start + 1) + 1);
                        }
                        else if (args.start <= colIdx && args.end >= colIdx) {
                            isPredicateRemoved = true;
                            filterCollection.splice(i, 1);
                        }
                    }
                    var sortColl = this.parent.sortCollection;
                    if (sortColl) {
                        for (var i = 0; i < sortColl.length; i++) {
                            if (sortColl[i].sheetIndex === sheetIdx) {
                                if (args.end < sortColl[i].columnIndex) {
                                    sortColl[i].columnIndex = sortColl[i].columnIndex - (args.end - args.start + 1);
                                    break;
                                }
                                else if (args.start <= sortColl[i].columnIndex && args.end >= sortColl[i].columnIndex) {
                                    sortColl.splice(i, 1);
                                    break;
                                }
                            }
                        }
                    }
                    if (range.some(function (value) { return value < 0; })) {
                        this.removeFilter(sheetIdx, true, true);
                        args.refreshSheet = true;
                    }
                    else if (isPredicateRemoved) {
                        if (filterCollection && filterCollection.length) {
                            this.reapplyFilterHandler(true, true);
                            args.refreshSheet = false;
                        }
                        else {
                            this.clearFilterHandler({ preventRefresh: true });
                            args.refreshSheet = true;
                        }
                    }
                    this.getFilteredCollection();
                }
            }
        }
    };
    Filter.prototype.deleteSheetHandler = function (args) {
        if (!isUndefined(args.sheetIndex)) {
            var isChanged = void 0;
            for (var _i = 0, _a = Array.from(this.filterRange.keys()).sort().reverse(); _i < _a.length; _i++) {
                var key = _a[_i];
                isChanged = true;
                if (args.sheetIndex === key) {
                    this.filterRange.delete(key);
                    this.filterCollection.delete(key);
                }
                else if (args.sheetIndex < key) {
                    this.filterRange.set(key - 1, this.filterRange.get(key));
                    this.filterRange.delete(key);
                    this.filterCollection.set(key - 1, this.filterCollection.get(key));
                    this.filterCollection.delete(key);
                }
                else {
                    isChanged = false;
                }
            }
            var sortColl = this.parent.sortCollection;
            if (sortColl) {
                for (var i = sortColl.length - 1; i >= 0; i--) {
                    if (args.sheetIndex === sortColl[i].sheetIndex) {
                        sortColl.splice(i, 1);
                    }
                    else if (args.sheetIndex < sortColl[i].sheetIndex) {
                        sortColl[i].sheetIndex -= 1;
                    }
                }
            }
            if (isChanged) {
                this.getFilteredCollection();
            }
        }
        else if (this.filterRange.get(this.parent.activeSheetIndex)) {
            this.filterRange.delete(this.parent.activeSheetIndex);
            this.filterCollection.delete(this.parent.activeSheetIndex);
        }
    };
    Filter.prototype.clearHandler = function (args) {
        var info = this.parent.getAddressInfo(args.range);
        if (this.filterRange.has(info.sheetIndex)) {
            var indexes = this.filterRange.get(info.sheetIndex).range.slice();
            if (inRange(info.indices, indexes[0], indexes[1]) && inRange(info.indices, indexes[0], indexes[3])) {
                this.removeFilter(info.sheetIndex);
            }
        }
    };
    Filter.prototype.duplicateSheetFilterHandler = function (args) {
        if (this.filterCollection.has(args.sheetIndex)) {
            this.filterCollection.set(args.newSheetIndex, this.filterCollection.get(args.sheetIndex));
        }
        if (this.filterRange.has(args.sheetIndex)) {
            this.filterRange.set(args.newSheetIndex, this.filterRange.get(args.sheetIndex));
        }
    };
    return Filter;
}());
export { Filter };
