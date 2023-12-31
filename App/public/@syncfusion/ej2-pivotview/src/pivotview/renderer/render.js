import { Reorder, headerRefreshed } from '@syncfusion/ej2-grids';
import { Grid, Resize, ExcelExport, PdfExport, ContextMenu, Freeze } from '@syncfusion/ej2-grids';
import { Selection } from '@syncfusion/ej2-grids';
import { createElement, setStyleAttribute, remove, isNullOrUndefined, EventHandler, getElement, closest, append } from '@syncfusion/ej2-base';
import { addClass, removeClass, SanitizeHtmlHelper, select, selectAll } from '@syncfusion/ej2-base';
import * as cls from '../../common/base/css-constant';
import * as events from '../../common/base/constant';
import { AggregateMenu } from '../../common/popups/aggregate-menu';
import { PivotUtil } from '../../base/util';
/**
 * Module to render PivotGrid control
 */
/** @hidden */
var Render = /** @class */ (function () {
    /** Constructor for render module
     *
     * @param {PivotView} parent - Instance of pivot table.
     */
    function Render(parent) {
        /** @hidden */
        this.isAutoFitEnabled = false;
        /** @hidden */
        this.pivotColumns = [];
        /** @hidden */
        this.indentCollection = {};
        this.colPos = 0;
        this.lastSpan = 0;
        this.lvlCollection = {};
        this.hierarchyCollection = {};
        this.lvlPosCollection = {};
        this.hierarchyPosCollection = {};
        this.position = 0;
        this.measurePos = 0;
        this.maxMeasurePos = 0;
        this.hierarchyCount = 0;
        this.actualText = '';
        this.parent = parent;
        this.resColWidth = (this.parent.showGroupingBar && this.parent.groupingBarModule) ? (this.parent.isAdaptive ? 180 : 250) :
            (this.parent.isAdaptive ? 140 : 200);
        this.engine = this.parent.dataType === 'olap' ? this.parent.olapEngineModule : this.parent.engineModule;
        this.gridSettings = this.parent.gridSettings;
        this.formatList = this.getFormatList();
        this.aggMenu = new AggregateMenu(this.parent);
    }
    /** @hidden */
    Render.prototype.render = function (refreshRequired) {
        if (refreshRequired) {
            this.initProperties();
        }
        this.resColWidth = (this.parent.showGroupingBar && this.parent.groupingBarModule) ? (this.parent.isAdaptive ? 180 : 250) :
            (this.parent.isAdaptive ? 140 : 200);
        this.engine = this.parent.dataType === 'olap' ? this.parent.olapEngineModule : this.parent.engineModule;
        this.gridSettings = this.parent.gridSettings;
        this.formatList = this.getFormatList();
        this.parent.gridHeaderCellInfo = [];
        this.parent.gridCellCollection = {};
        this.injectGridModules(this.parent);
        this.rowStartPos = this.getRowStartPos();
        if (this.parent.grid && this.parent.grid.element && this.parent.element.querySelector('.e-grid')) {
            this.parent.notEmpty = true;
            if (!this.engine.isEngineUpdated) {
                this.engine.headerContent = this.frameDataSource('header');
                this.engine.valueContent = this.frameDataSource('value');
            }
            else {
                if (this.parent.enableValueSorting) {
                    this.engine.valueContent = this.frameDataSource('value');
                }
                this.engine.isEngineUpdated = false;
            }
            this.parent.grid.setProperties({
                columns: this.frameStackedHeaders(), dataSource: ((this.parent.dataType === 'olap' && this.parent.dataSourceSettings.url !== '') ? true :
                    (this.parent.dataSourceSettings.dataSource && this.parent.engineModule.data.length > 0 &&
                        this.parent.dataSourceSettings.values.length > 0)) && !this.engine.isEmptyData ? this.engine.valueContent :
                    this.frameDataSource('value')
            }, true);
            if (this.parent.grid.height === 'auto') {
                var mCntHeight = this.parent.element.querySelector('.' + cls.MOVABLECONTENT_DIV).offsetHeight;
                var dataHeight = this.parent.grid.dataSource.length * this.parent.gridSettings.rowHeight;
                if (mCntHeight > 50 && mCntHeight < dataHeight) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    this.parent.grid.contentModule.setHeightToContent(dataHeight);
                }
            }
            this.parent.grid.notify('datasource-modified', {});
            if (this.parent.isScrolling) {
                this.parent.resizeInfo = {};
            }
            this.parent.grid.refreshColumns();
            if (this.parent.showGroupingBar && this.parent.groupingBarModule &&
                this.parent.element.querySelector('.' + cls.GROUPING_BAR_CLASS)) {
                this.parent.groupingBarModule.setGridRowWidth();
            }
            var e = this.parent.element.querySelector('.e-movablecontent');
            e.querySelector('colGroup').innerHTML =
                this.parent.grid.getHeaderContent().querySelector('.e-movableheader').querySelector('colgroup').innerHTML;
            this.parent.grid.width = this.calculateGridWidth();
            if (!this.gridSettings.allowAutoResizing && this.parent.showGroupingBar && this.parent.groupingBarModule && this.parent.element.querySelector('.' + cls.GROUPING_BAR_CLASS)) {
                this.parent.groupingBarModule.refreshUI();
            }
            if (!this.parent.isScrolling) {
                this.calculateGridHeight(true);
            }
            //this.parent.isScrolling = false;
        }
        else {
            this.parent.element.innerHTML = '';
            this.bindGrid(this.parent, (this.engine.isEmptyData ? true : false));
            this.parent.element.appendChild(createElement('div', { id: this.parent.element.id + '_grid' }));
            this.parent.grid.isStringTemplate = true;
            this.parent.grid.appendTo('#' + this.parent.element.id + '_grid');
        }
        this.parent.grid.on(headerRefreshed, this.refreshHeader, this);
    };
    Render.prototype.initProperties = function () {
        this.rowStartPos = undefined;
        this.maxIndent = undefined;
        this.resColWidth = undefined;
        this.isOverflows = undefined;
        this.indentCollection = {};
        this.formatList = undefined;
        this.colPos = 0;
        this.colGrandPos = undefined;
        this.rowGrandPos = undefined;
        this.lastSpan = 0;
        this.field = undefined;
        this.fieldCaption = undefined;
        this.lvlCollection = {};
        this.hierarchyCollection = {};
        this.lvlPosCollection = {};
        this.hierarchyPosCollection = {};
        this.position = 0;
        this.measurePos = 0;
        this.maxMeasurePos = 0;
        this.hierarchyCount = 0;
        this.actualText = '';
        this.timeOutObj = undefined;
    };
    Render.prototype.refreshHeader = function () {
        if (this.parent.enableVirtualization) {
            var mHdr = this.parent.element.querySelector('.' + cls.MOVABLEHEADER_DIV);
            var mCont = this.parent.element.querySelector('.' + cls.MOVABLECONTENT_DIV);
            var vtr = mCont.querySelector('.' + cls.VIRTUALTRACK_DIV);
            this.parent.virtualHeaderDiv = mHdr.querySelector('.' + cls.VIRTUALTRACK_DIV);
            if (mHdr.querySelector('.' + cls.VIRTUALTRACK_DIV)) {
                remove(mHdr.querySelector('.' + cls.VIRTUALTRACK_DIV));
            }
            else {
                this.parent.virtualHeaderDiv = createElement('div', { className: cls.VIRTUALTRACK_DIV });
            }
            mHdr.appendChild(this.parent.virtualHeaderDiv);
            if (vtr) {
                setStyleAttribute(this.parent.virtualHeaderDiv, { height: 0, width: vtr.style.width });
            }
            if (mHdr.querySelector('.e-table')) {
                setStyleAttribute(mHdr.querySelector('.e-table'), {
                    transform: (mCont.querySelector('.e-table').style.transform).split(',')[0] + ',' + 0 + 'px)'
                });
            }
            var ele = this.parent.isAdaptive ? mCont : mCont.parentElement.parentElement.querySelector('.' + cls.MOVABLESCROLL_DIV);
            mHdr.scrollLeft = ele.scrollLeft;
        }
    };
    /** @hidden */
    Render.prototype.bindGrid = function (parent, isEmpty) {
        this.injectGridModules(parent);
        this.parent.grid = new Grid({
            cssClass: this.parent.cssClass,
            frozenColumns: 1,
            frozenRows: 0,
            enableHover: false,
            dataSource: isEmpty ? this.frameEmptyData() : this.frameDataSource('value'),
            columns: isEmpty ? this.frameEmptyColumns() : this.frameStackedHeaders(),
            height: isEmpty ? 'auto' : this.calculateGridHeight(),
            width: isEmpty ? (this.gridSettings.allowAutoResizing ? this.parent.width : 400) : this.calculateGridWidth(),
            locale: parent.locale,
            enableRtl: parent.enableRtl,
            allowExcelExport: parent.allowExcelExport,
            allowPdfExport: parent.allowPdfExport,
            allowResizing: this.gridSettings.allowResizing,
            allowTextWrap: this.gridSettings.allowTextWrap,
            clipMode: this.gridSettings.clipMode,
            allowReordering: (this.parent.showGroupingBar ? false : this.gridSettings.allowReordering),
            allowSelection: this.gridSettings.allowSelection,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            contextMenuItems: this.gridSettings.contextMenuItems,
            selectedRowIndex: this.gridSettings.selectedRowIndex,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            selectionSettings: this.gridSettings.selectionSettings,
            textWrapSettings: this.gridSettings.textWrapSettings,
            printMode: this.gridSettings.printMode,
            rowHeight: this.gridSettings.rowHeight,
            gridLines: this.gridSettings.gridLines,
            contextMenuClick: this.contextMenuClick.bind(this),
            contextMenuOpen: this.contextMenuOpen.bind(this),
            beforeCopy: this.gridSettings.beforeCopy ? this.gridSettings.beforeCopy.bind(this.parent) : undefined,
            beforePrint: this.gridSettings.beforePrint ? this.gridSettings.beforePrint.bind(this.parent) : undefined,
            printComplete: this.gridSettings.printComplete ? this.gridSettings.printComplete.bind(this.parent) : undefined,
            rowSelecting: this.gridSettings.rowSelecting ? this.gridSettings.rowSelecting.bind(this.parent) : undefined,
            rowSelected: this.rowSelected.bind(this),
            rowDeselecting: this.gridSettings.rowDeselecting ? this.gridSettings.rowDeselecting.bind(this.parent) : undefined,
            rowDeselected: this.rowDeselected.bind(this),
            cellSelecting: this.gridSettings.cellSelecting ? this.gridSettings.cellSelecting.bind(this.parent) : undefined,
            cellSelected: this.cellSelected.bind(this),
            cellDeselecting: this.gridSettings.cellDeselecting ? this.gridSettings.cellDeselecting.bind(this.parent) : undefined,
            cellDeselected: this.cellDeselected.bind(this),
            resizeStart: this.gridSettings.resizeStart ? this.gridSettings.resizeStart.bind(this.parent) : undefined,
            columnDragStart: this.gridSettings.columnDragStart ? this.gridSettings.columnDragStart.bind(this) : undefined,
            columnDrag: this.gridSettings.columnDrag ? this.gridSettings.columnDrag.bind(this) : undefined,
            columnDrop: this.gridSettings.columnDrop ? this.gridSettings.columnDrop.bind(this) : undefined,
            beforeExcelExport: this.beforeExcelExport.bind(this),
            resizing: this.setGroupWidth.bind(this),
            resizeStop: this.onResizeStop.bind(this),
            queryCellInfo: this.queryCellInfo.bind(this),
            dataBound: this.dataBound.bind(this),
            headerCellInfo: this.headerCellInfo.bind(this),
            excelHeaderQueryCellInfo: this.excelHeaderQueryCellInfo.bind(this),
            pdfHeaderQueryCellInfo: this.pdfHeaderQueryCellInfo.bind(this),
            excelQueryCellInfo: this.excelQueryCellInfo.bind(this),
            pdfQueryCellInfo: this.pdfQueryCellInfo.bind(this),
            beforePdfExport: this.gridSettings.beforePdfExport ? this.gridSettings.beforePdfExport.bind(this) : undefined,
            pdfExportComplete: this.pdfExportComplete.bind(this),
            excelExportComplete: this.excelExportComplete.bind(this)
        });
        this.parent.grid.on('header-refreshed', this.headerRefreshed.bind(this));
        this.parent.grid.on('export-DataBound', this.excelDataBound.bind(this));
    };
    Render.prototype.headerRefreshed = function () {
        var mHdr = this.parent.element.querySelector('.' + cls.MOVABLEHEADER_DIV);
        if (this.parent.lastGridSettings && Object.keys(this.parent.lastGridSettings).indexOf('allowResizing') > -1 && !isNullOrUndefined(mHdr) && mHdr.querySelector('.e-table') &&
            this.parent.showGroupingBar && this.parent.groupingBarModule && this.parent.element.querySelector('.' + cls.GROUPING_BAR_CLASS)) {
            this.parent.lastGridSettings = undefined;
            this.parent.groupingBarModule.setGridRowWidth();
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Render.prototype.beforeExcelExport = function (args) {
        if (!isNullOrUndefined(args.gridObject.columns) && !isNullOrUndefined(this.parent.pivotColumns)) {
            args.gridObject.columns[args.gridObject.columns.length - 1].width =
                this.parent.pivotColumns[this.parent.pivotColumns.length - 1].width;
        }
        this.parent.trigger(events.beforeExcelExport, args);
    };
    Render.prototype.rowSelected = function (args) {
        this.parent.renderModule.selected();
        this.parent.trigger(events.rowSelected, args);
    };
    Render.prototype.rowDeselected = function (args) {
        this.parent.renderModule.selected();
        this.parent.trigger(events.rowDeselected, args);
    };
    Render.prototype.cellSelected = function (args) {
        if (this.parent.rowRangeSelection.enable) {
            this.parent.grid.selectionModule.selectRowsByRange(this.parent.rowRangeSelection.startIndex, this.parent.rowRangeSelection.endIndex);
            this.parent.rowRangeSelection.enable = false;
        }
        else {
            this.parent.renderModule.selected();
            this.parent.trigger(events.selected, args);
        }
    };
    Render.prototype.cellSelecting = function (args) {
        this.parent.trigger(events.cellSelecting, args);
    };
    Render.prototype.cellDeselected = function (args) {
        this.parent.renderModule.selected();
        this.parent.trigger(events.cellDeselected, args);
    };
    Render.prototype.queryCellInfo = function (args) {
        this.parent.renderModule.rowCellBoundEvent(args);
    };
    Render.prototype.headerCellInfo = function (args) {
        this.parent.renderModule.columnCellBoundEvent(args);
    };
    Render.prototype.excelHeaderQueryCellInfo = function (args) {
        this.parent.renderModule.excelColumnEvent(args);
    };
    Render.prototype.pdfQueryCellInfo = function (args) {
        this.parent.renderModule.pdfRowEvent(args);
    };
    Render.prototype.excelQueryCellInfo = function (args) {
        this.parent.renderModule.excelRowEvent(args);
    };
    Render.prototype.pdfHeaderQueryCellInfo = function (args) {
        this.parent.renderModule.pdfColumnEvent(args);
    };
    Render.prototype.pdfExportComplete = function (args) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (this.parent.lastColumn !== undefined && this.parent.lastColumn.width !== 'auto') {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.parent.lastColumn.width = 'auto';
            this.parent.lastColumn = undefined;
        }
        var exportCompleteEventArgs = {
            type: 'PDF',
            promise: args.promise
        };
        this.parent.trigger(events.exportComplete, exportCompleteEventArgs);
    };
    Render.prototype.excelExportComplete = function (args) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (this.parent.lastColumn !== undefined && this.parent.lastColumn.width !== 'auto') {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.parent.lastColumn.width = 'auto';
            this.parent.lastColumn = undefined;
        }
        var exportCompleteEventArgs = {
            type: 'Excel/CSV',
            promise: args.promise
        };
        this.parent.trigger(events.exportComplete, exportCompleteEventArgs);
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Render.prototype.dataBound = function (args) {
        if (this.parent.cellTemplate) {
            for (var _i = 0, _a = this.parent.gridHeaderCellInfo; _i < _a.length; _i++) {
                var cell = _a[_i];
                if (this.parent.cellTemplate) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    var element = this.parent.getCellTemplate()(cell, this.parent, 'cellTemplate', this.parent.element.id + '_cellTemplate', null, null, cell.targetCell);
                    if (element && element !== '' && element.length > 0) {
                        if (this.parent.enableHtmlSanitizer) {
                            if (this.parent.isVue || this.parent.isVue3) {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                append(SanitizeHtmlHelper.sanitize(element), cell.targetCell);
                            }
                            else {
                                this.parent.appendHtml(cell.targetCell, SanitizeHtmlHelper.sanitize(element[0].outerHTML));
                            }
                        }
                        else {
                            if (this.parent.isVue || this.parent.isVue3) {
                                append(element, cell.targetCell);
                            }
                            else {
                                this.parent.appendHtml(cell.targetCell, element[0].outerHTML);
                            }
                        }
                    }
                }
            }
            this.parent.gridHeaderCellInfo = [];
        }
        // if ((this.parent.dataSourceSettings.valueAxis === 'row' ||
        //     !(this.parent.dataType === 'pivot' && this.parent.dataSourceSettings.valueAxis === 'column' && this.parent.engineModule && !this.parent.engineModule.isLastHeaderHasMeasures)) &&
        //     this.parent.element.querySelector('.e-firstcell') && !(this.parent.dataSourceSettings.values.length === 1 && this.parent.dataSourceSettings.columns.length > 0)) {
        //     if (this.parent.enableRtl) {
        //         (this.parent.element.querySelector('.e-firstcell') as HTMLElement).style.borderRight = 'none';
        //     } else {
        //         (this.parent.element.querySelector('.e-firstcell') as HTMLElement).style.borderLeft = 'none';
        //     }
        // }
        if (!this.isAutoFitEnabled && this.parent.grid && this.parent.grid.widthService) {
            this.parent.grid.widthService.setWidthToTable();
        }
        if (this.parent.notEmpty) {
            this.calculateGridHeight(true);
        }
        this.parent.isScrolling = false;
        this.setFocusOnLastCell();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (!isNullOrUndefined(this.parent.renderReactTemplates)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.parent.renderReactTemplates();
        }
        if (this.parent.isInitial) {
            this.parent.isInitial = false;
            this.parent.refreshData();
        }
        this.parent.notify(events.contentReady, {});
    };
    Render.prototype.setFocusOnLastCell = function () {
        if (this.parent.keyboardModule && this.parent.keyboardModule.event &&
            this.parent.keyboardModule.event.target.nodeName === 'TD') {
            var gridFocus = this.parent.grid.serviceLocator.getService('focus');
            gridFocus.setFocusedElement(this.parent.keyboardModule.event.target);
            gridFocus.focus(this.parent.keyboardModule.event);
            addClass([this.parent.keyboardModule.event.target], ['e-focused', 'e-focus']);
            this.parent.keyboardModule.event.target.setAttribute('tabindex', '0');
            this.parent.keyboardModule.event = undefined;
        }
    };
    Render.prototype.getCellElement = function (target) {
        var currentElement = closest(target, 'td');
        if (isNullOrUndefined(currentElement)) {
            currentElement = closest(target, 'th');
        }
        return currentElement;
    };
    Render.prototype.contextMenuOpen = function (args) {
        var _this = this;
        if (args.element && this.parent.cssClass) {
            addClass([args.element.parentElement], this.parent.cssClass);
        }
        var _loop_1 = function (item) {
            var cellTarget = this_1.parent.lastCellClicked ? this_1.parent.lastCellClicked :
                (this_1.parent.isAdaptive ? args.event.target : this_1.parent.lastCellClicked);
            var elem = this_1.getCellElement(cellTarget);
            var bool = void 0;
            var isGroupElement = void 0;
            if (!elem || (elem && Number(elem.getAttribute('index')) === 0 && Number(elem.getAttribute('data-colindex')) === 0)) {
                args.cancel = true;
                return { value: void 0 };
            }
            if (elem.classList.contains('e-valuesheader') || elem.classList.contains('e-stot')) {
                bool = true;
            }
            if (this_1.parent.allowGrouping && this_1.parent.groupingModule && !this_1.validateField(elem)) {
                isGroupElement = true;
            }
            var rowIndex = Number(elem.getAttribute('index'));
            var colIndex = Number(elem.getAttribute('data-colindex'));
            var pivotValue1 = this_1.parent.pivotValues[rowIndex][colIndex];
            var selectedID = item.id;
            switch (selectedID) {
                case this_1.parent.element.id + '_expand':
                    if (elem.querySelectorAll('.' + cls.EXPAND).length > 0) {
                        if (selectAll('#' + this_1.parent.element.id + '_expand', args.element)) {
                            select('#' + this_1.parent.element.id + '_expand', args.element).classList.add(cls.MENU_DISABLE);
                        }
                        if (select('#' + this_1.parent.element.id + '_expand', args.element).classList.contains(cls.MENU_DISABLE)) {
                            select('#' + this_1.parent.element.id + '_expand', args.element).classList.remove(cls.MENU_DISABLE);
                        }
                        if (select('#' + this_1.parent.element.id + '_expand', args.element).classList.contains(cls.MENU_HIDE)) {
                            select('#' + this_1.parent.element.id + '_expand', args.element).classList.remove(cls.MENU_HIDE);
                            select('#' + this_1.parent.element.id + '_collapse', args.element).classList.remove(cls.MENU_HIDE);
                        }
                    }
                    else {
                        if (bool) {
                            select('#' + this_1.parent.element.id + '_expand', args.element).classList.add(cls.MENU_HIDE);
                        }
                        else {
                            select('#' + this_1.parent.element.id + '_expand', args.element).classList.add(cls.MENU_DISABLE);
                        }
                    }
                    break;
                case this_1.parent.element.id + '_collapse':
                    if (elem.querySelectorAll('.' + cls.COLLAPSE).length > 0) {
                        if (select('#' + this_1.parent.element.id + '_expand', args.element)) {
                            select('#' + this_1.parent.element.id + '_expand', args.element).classList.add(cls.MENU_DISABLE);
                        }
                        if (select('#' + this_1.parent.element.id + '_collapse', args.element).classList.contains(cls.MENU_DISABLE)) {
                            select('#' + this_1.parent.element.id + '_collapse', args.element).classList.remove(cls.MENU_DISABLE);
                        }
                        if (select('#' + this_1.parent.element.id + '_collapse', args.element).classList.contains(cls.MENU_HIDE)) {
                            select('#' + this_1.parent.element.id + '_collapse', args.element).classList.remove(cls.MENU_HIDE);
                            select('#' + this_1.parent.element.id + '_expand', args.element).classList.remove(cls.MENU_HIDE);
                        }
                    }
                    else {
                        if (bool) {
                            select('#' + this_1.parent.element.id + '_collapse', args.element).classList.add(cls.MENU_HIDE);
                        }
                        else {
                            select('#' + this_1.parent.element.id + '_collapse', args.element).classList.add(cls.MENU_DISABLE);
                        }
                    }
                    break;
                case this_1.parent.element.id + '_custom_group':
                    if (!isGroupElement && args.items.length === 2) {
                        args.cancel = true;
                    }
                    if (selectAll('#' + this_1.parent.element.id + '_custom_group', args.element)) {
                        addClass([select('#' + this_1.parent.element.id + '_custom_group', args.element)], cls.MENU_HIDE);
                    }
                    if (isGroupElement) {
                        if (selectAll('#' + this_1.parent.element.id + '_custom_group', args.element)) {
                            removeClass([select('#' + this_1.parent.element.id + '_custom_group', args.element)], cls.MENU_HIDE);
                        }
                    }
                    break;
                case this_1.parent.element.id + '_custom_ungroup':
                    if (selectAll('#' + this_1.parent.element.id + '_custom_ungroup', args.element)) {
                        addClass([select('#' + this_1.parent.element.id + '_custom_ungroup', args.element)], cls.MENU_HIDE);
                    }
                    if (isGroupElement) {
                        var isUngroupOption = false;
                        var fieldName = elem.getAttribute('fieldname');
                        var groupField = PivotUtil.getFieldByName(fieldName, this_1.parent.dataSourceSettings.groupSettings);
                        if (groupField && groupField.type === 'Custom' || (this_1.parent.engineModule.fieldList[fieldName].isCustomField && fieldName.indexOf('_custom_group') > -1)) {
                            groupField = PivotUtil.getFieldByName(fieldName.replace('_custom_group', ''), this_1.parent.dataSourceSettings.groupSettings);
                            if (groupField) {
                                var cell = this_1.parent.engineModule.pivotValues[Number(elem.getAttribute('index'))][Number(elem.getAttribute('data-colindex'))];
                                var selectedCellsInfo = this_1.parent.groupingModule.getSelectedCells(cell.axis, fieldName, cell.actualText.toString());
                                selectedCellsInfo.push({ axis: cell.axis, fieldName: fieldName, name: cell.actualText.toString(),
                                    cellInfo: cell });
                                var selectedOptions = this_1.parent.groupingModule.getSelectedOptions(selectedCellsInfo);
                                for (var _i = 0, _a = groupField.customGroups; _i < _a.length; _i++) {
                                    var customGroup = _a[_i];
                                    if (selectedOptions.indexOf(customGroup.groupName) > -1) {
                                        isUngroupOption = true;
                                        break;
                                    }
                                }
                            }
                        }
                        else if (groupField && (groupField.type === 'Date' || groupField.type === 'Number') ||
                            (this_1.parent.engineModule.fieldList[fieldName].isCustomField && fieldName.indexOf('_date_group') > -1)) {
                            isUngroupOption = true;
                        }
                        if (selectAll('#' + this_1.parent.element.id + '_custom_ungroup', args.element) && isUngroupOption) {
                            removeClass([select('#' + this_1.parent.element.id + '_custom_ungroup', args.element)], cls.MENU_HIDE);
                        }
                    }
                    break;
                case this_1.parent.element.id + '_drillthrough':
                    if (!this_1.parent.allowDrillThrough) {
                        if (select('#' + this_1.parent.element.id + '_drillthrough', args.element)) {
                            select('#' + this_1.parent.element.id + '_drillthrough', args.element).classList.add(cls.MENU_DISABLE);
                        }
                    }
                    else if (!(elem.classList.contains('e-summary'))) {
                        if (elem.innerText === '') {
                            if (select('#' + this_1.parent.element.id + '_drillthrough', args.element)) {
                                select('#' + this_1.parent.element.id + '_drillthrough', args.element).classList.add(cls.MENU_DISABLE);
                            }
                        }
                    }
                    else {
                        if (select('#' + this_1.parent.element.id + '_drillthrough', args.element).classList.contains(cls.MENU_DISABLE)) {
                            select('#' + this_1.parent.element.id + '_drillthrough', args.element).classList.remove(cls.MENU_DISABLE);
                        }
                    }
                    break;
                case this_1.parent.element.id + '_sortasc':
                    if (!this_1.parent.enableValueSorting) {
                        if (select('#' + this_1.parent.element.id + '_sortasc', args.element)) {
                            select('#' + this_1.parent.element.id + '_sortasc', args.element).classList.add(cls.MENU_DISABLE);
                        }
                    }
                    else if (elem.querySelectorAll('.e-icon-descending').length > 0) {
                        if (select('#' + this_1.parent.element.id + '_sortdesc', args.element)) {
                            select('#' + this_1.parent.element.id + '_sortdesc', args.element).classList.add(cls.MENU_DISABLE);
                        }
                        else {
                            select('#' + this_1.parent.element.id + '_sortdesc', args.element).classList.remove(cls.MENU_DISABLE);
                        }
                        if (select('#' + this_1.parent.element.id + '_sortasc', args.element).classList.contains(cls.MENU_DISABLE)) {
                            select('#' + this_1.parent.element.id + '_sortasc', args.element).classList.remove(cls.MENU_DISABLE);
                        }
                    }
                    else if (select('#' + this_1.parent.element.id + '_sortdesc', args.element).classList.contains(cls.MENU_DISABLE)) {
                        select('#' + this_1.parent.element.id + '_sortdesc', args.element).classList.remove(cls.MENU_DISABLE);
                    }
                    break;
                case this_1.parent.element.id + '_sortdesc':
                    if (!this_1.parent.enableValueSorting) {
                        if (select('#' + this_1.parent.element.id + '_sortdesc', args.element)) {
                            select('#' + this_1.parent.element.id + '_sortdesc', args.element).classList.add(cls.MENU_DISABLE);
                        }
                    }
                    else if (elem.querySelectorAll('.e-icon-ascending').length > 0) {
                        if (select('#' + this_1.parent.element.id + '_sortasc', args.element)) {
                            select('#' + this_1.parent.element.id + '_sortasc', args.element).classList.add(cls.MENU_DISABLE);
                        }
                        else {
                            select('#' + this_1.parent.element.id + '_sortasc', args.element).classList.remove(cls.MENU_DISABLE);
                        }
                        if (select('#' + this_1.parent.element.id + '_sortdesc', args.element).classList.contains(cls.MENU_DISABLE)) {
                            select('#' + this_1.parent.element.id + '_sortdesc', args.element).classList.remove(cls.MENU_DISABLE);
                        }
                    }
                    else if (select('#' + this_1.parent.element.id + '_sortasc', args.element).classList.contains(cls.MENU_DISABLE)) {
                        select('#' + this_1.parent.element.id + '_sortasc', args.element).classList.remove(cls.MENU_DISABLE);
                    }
                    break;
                case this_1.parent.element.id + '_CalculatedField':
                    if (!this_1.parent.allowCalculatedField) {
                        select('#' + this_1.parent.element.id + '_CalculatedField', args.element).classList.add(cls.MENU_DISABLE);
                    }
                    break;
                case this_1.parent.element.id + '_pdf':
                    if (!this_1.parent.allowPdfExport) {
                        select('#' + this_1.parent.element.id + '_pdf', args.element).classList.add(cls.MENU_DISABLE);
                    }
                    break;
                case this_1.parent.element.id + '_excel':
                    if (!this_1.parent.allowExcelExport) {
                        select('#' + this_1.parent.element.id + '_excel', args.element).classList.add(cls.MENU_DISABLE);
                    }
                    break;
                case this_1.parent.element.id + '_csv':
                    if (!this_1.parent.allowExcelExport) {
                        select('#' + this_1.parent.element.id + '_csv', args.element).classList.add(cls.MENU_DISABLE);
                    }
                    break;
                case this_1.parent.element.id + '_exporting':
                    if ((!this_1.parent.allowExcelExport) && (!this_1.parent.allowPdfExport)) {
                        select('#' + this_1.parent.element.id + '_exporting', args.element).classList.add(cls.MENU_DISABLE);
                    }
                    break;
                case this_1.parent.element.id + '_aggregate':
                    if ((select('#' + this_1.parent.element.id + '_aggregate', args.element)) &&
                        (!select('#' + this_1.parent.element.id + '_aggregate', args.element).classList.contains(cls.MENU_DISABLE))) {
                        select('#' + this_1.parent.element.id + '_aggregate', args.element).classList.add(cls.MENU_DISABLE);
                    }
                    if ((elem.classList.contains('e-valuesheader') || elem.classList.contains('e-valuescontent') ||
                        (elem.classList.contains('e-stot') && elem.classList.contains('e-rowsheader'))) && this_1.parent.dataType !== 'olap') {
                        var fieldType_1;
                        if (!(elem.innerText === '')) {
                            fieldType_1 = this_1.parent.engineModule.fieldList[pivotValue1.actualText.toString()].type;
                        }
                        var eventArgs = {
                            cancel: false, fieldName: pivotValue1.actualText.toString(),
                            aggregateTypes: this_1.getMenuItem(fieldType_1).slice(),
                            displayMenuCount: 7
                        };
                        this_1.parent.trigger(events.aggregateMenuOpen, eventArgs, function (observedArgs) {
                            if (!observedArgs.cancel && !(elem.innerText === '')) {
                                var menuItem = [];
                                var checkDuplicates = [];
                                for (var i = 0; i < observedArgs.aggregateTypes.length; i++) {
                                    var key = observedArgs.aggregateTypes[i];
                                    if (fieldType_1 !== 'number') {
                                        if ((['Count', 'DistinctCount'].indexOf(key) > -1) && (checkDuplicates.indexOf(key) < 0)) {
                                            menuItem.push({ text: _this.parent.localeObj.getConstant(key), id: _this.parent.element.id + '_Agg' + key });
                                            checkDuplicates.push(key);
                                        }
                                    }
                                    else {
                                        if ((_this.parent.getAllSummaryType().indexOf(key) > -1) && (checkDuplicates.indexOf(key) < 0)) {
                                            menuItem.push({ text: _this.parent.localeObj.getConstant(key), id: _this.parent.element.id + '_Agg' + key });
                                            checkDuplicates.push(key);
                                        }
                                    }
                                }
                                if (menuItem.length > observedArgs.displayMenuCount) {
                                    menuItem.splice(observedArgs.displayMenuCount);
                                    menuItem.push({
                                        text: _this.parent.localeObj.getConstant('MoreOption'),
                                        id: _this.parent.element.id + '_Agg' + 'MoreOption'
                                    });
                                }
                                if (menuItem && menuItem.length >= 1) {
                                    item.items = menuItem;
                                    select('#' + _this.parent.element.id + '_aggregate', args.element).classList.remove(cls.MENU_DISABLE);
                                }
                            }
                        });
                    }
                    break;
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = args.items; _i < _a.length; _i++) {
            var item = _a[_i];
            var state_1 = _loop_1(item);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        this.parent.trigger(events.contextMenuOpen, args);
    };
    Render.prototype.getMenuItem = function (isStringField) {
        var menuItems = [];
        for (var i = 0; i < this.parent.aggregateTypes.length; i++) {
            var key = this.parent.aggregateTypes[i];
            if (isStringField !== 'string') {
                if ((this.parent.getAllSummaryType().indexOf(key) > -1) && (menuItems.indexOf(key) === -1)) {
                    menuItems.push(key);
                }
            }
            else {
                if ((['Count', 'DistinctCount'].indexOf(key) > -1) && (menuItems.indexOf(key) === -1)) {
                    menuItems.push(key);
                }
            }
        }
        return menuItems;
    };
    Render.prototype.contextMenuClick = function (args) {
        var _this = this;
        // this.parent.gridSettings.contextMenuClick();
        var target = this.parent.lastCellClicked;
        var selected = args.item.id;
        var event = new MouseEvent('dblclick', {
            'view': window,
            'bubbles': true,
            'cancelable': true
        });
        var exportArgs = {};
        var ele = this.getCellElement(target);
        var rowIndx = Number(ele.getAttribute('index'));
        var colIndx = Number(ele.getAttribute('data-colindex'));
        var pivotValue = this.parent.pivotValues[rowIndx][colIndx];
        var aggregateType;
        if (args.item.id.indexOf(this.parent.element.id + '_Agg') > -1) {
            this.field = this.parent.engineModule.fieldList[pivotValue.actualText.toString()].id;
            this.fieldCaption = this.parent.engineModule.fieldList[pivotValue.actualText.toString()].caption;
            aggregateType = args.item.id.split('_Agg')[1];
        }
        switch (selected) {
            case this.parent.element.id + '_pdf':
                exportArgs = {
                    pdfDoc: undefined,
                    isBlob: false,
                    isMultipleExport: false,
                    pdfExportProperties: { fileName: 'Export.pdf' }
                };
                this.parent.trigger(events.beforeExport, exportArgs, function (observedArgs) {
                    _this.parent.pdfExport(observedArgs.pdfExportProperties, observedArgs.isMultipleExport, observedArgs.pdfDoc, observedArgs.isBlob);
                });
                break;
            case this.parent.element.id + '_excel':
                exportArgs = {
                    isBlob: false,
                    isMultipleExport: false,
                    workbook: undefined,
                    excelExportProperties: { fileName: 'Export.xlsx' }
                };
                this.parent.trigger(events.beforeExport, exportArgs, function (observedArgs) {
                    _this.parent.excelExport(observedArgs.excelExportProperties, observedArgs.isMultipleExport, observedArgs.workbook, observedArgs.isBlob);
                });
                break;
            case this.parent.element.id + '_csv':
                exportArgs = {
                    isBlob: false,
                    workbook: undefined,
                    isMultipleExport: false,
                    excelExportProperties: { fileName: 'Export.csv' }
                };
                this.parent.trigger(events.beforeExport, exportArgs, function (observedArgs) {
                    _this.parent.csvExport(observedArgs.excelExportProperties, observedArgs.isMultipleExport, observedArgs.workbook, observedArgs.isBlob);
                });
                break;
            case this.parent.element.id + '_drillthrough_menu':
                ele.dispatchEvent(event);
                break;
            case this.parent.element.id + '_sortasc':
                this.parent.setProperties({
                    dataSourceSettings: {
                        valueSortSettings: {
                            headerText: pivotValue.valueSort.levelName,
                            headerDelimiter: this.parent.dataSourceSettings.valueSortSettings.headerDelimiter
                        }
                    }
                });
                this.parent.dataSourceSettings.valueSortSettings.sortOrder = 'Ascending';
                break;
            case this.parent.element.id + '_sortdesc':
                this.parent.setProperties({
                    dataSourceSettings: {
                        valueSortSettings: {
                            headerText: pivotValue.valueSort.levelName,
                            headerDelimiter: this.parent.dataSourceSettings.valueSortSettings.headerDelimiter
                        }
                    }
                });
                this.parent.dataSourceSettings.valueSortSettings.sortOrder = 'Descending';
                break;
            case this.parent.element.id + '_expand':
                if (ele.querySelectorAll('.' + cls.EXPAND)) {
                    var exp = ele.querySelectorAll('.' + cls.EXPAND)[0];
                    this.parent.onDrill(exp);
                }
                break;
            case this.parent.element.id + '_collapse':
                if (ele.querySelectorAll('.' + cls.COLLAPSE)) {
                    var colp = ele.querySelectorAll('.' + cls.COLLAPSE)[0];
                    this.parent.onDrill(colp);
                }
                break;
            case this.parent.element.id + '_CalculatedField':
                this.parent.calculatedFieldModule.createCalculatedFieldDialog();
                break;
            case this.parent.element.id + '_AggMoreOption':
            case this.parent.element.id + '_AggDifferenceFrom':
            case this.parent.element.id + '_AggPercentageOfDifferenceFrom':
            case this.parent.element.id + '_AggPercentageOfParentTotal':
                ele.setAttribute('id', this.field);
                ele.setAttribute('data-caption', this.fieldCaption);
                ele.setAttribute('data-field', this.field);
                ele.setAttribute('data-type', this.engine.fieldList[pivotValue.actualText.toString()].aggregateType);
                ele.setAttribute('data-basefield', this.engine.fieldList[pivotValue.actualText.toString()].baseField);
                ele.setAttribute('data-baseItem', this.engine.fieldList[pivotValue.actualText.toString()].baseItem);
                this.aggMenu.createValueSettingsDialog(ele, this.parent.element, aggregateType);
                break;
            case this.parent.element.id + '_Agg' + aggregateType:
                this.updateAggregate(aggregateType);
                break;
            case this.parent.element.id + '_custom_group':
            case this.parent.element.id + '_custom_ungroup':
                if (this.parent.groupingModule) {
                    var args_1 = {
                        target: ele,
                        option: selected,
                        parentElement: this.parent.element
                    };
                    this.parent.notify(events.initGrouping, args_1);
                    this.parent.grid.contextMenuModule.contextMenu.close();
                }
                break;
        }
        this.parent.trigger(events.contextMenuClick, args);
    };
    Render.prototype.validateColumnTotalcell = function (columnIndex) {
        var headerPosKeys = Object.keys(this.engine.headerContent);
        var keysLength = headerPosKeys.length;
        var sumLock = false;
        var fieldName = '';
        for (var pos = keysLength - 1; pos >= 0; pos--) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var cell = this.engine.headerContent[headerPosKeys[pos]][columnIndex];
            if (cell) {
                sumLock = sumLock && fieldName !== '' ? fieldName === cell.valueSort.axis : false;
                fieldName = cell.valueSort.axis ? cell.valueSort.axis.toString() : '';
                if (cell.type === 'sum') {
                    sumLock = true;
                }
                if (sumLock && cell.members && cell.members.length > 0) {
                    return true;
                }
            }
            else {
                return false;
            }
        }
        return false;
    };
    Render.prototype.validateField = function (target) {
        var isValueField = false;
        if (target.classList.contains('e-stot') || target.classList.contains('e-gtot') || target.classList.contains('e-valuescontent') || target.classList.contains('e-valuesheader')) {
            isValueField = true;
        }
        else {
            var fieldName = target.getAttribute('fieldName');
            if (!fieldName || fieldName === '') {
                var rowIndx = Number(target.getAttribute('index'));
                var colIndx = Number(target.getAttribute('data-colindex'));
                fieldName = this.engine.pivotValues[rowIndx][colIndx].actualText;
            }
            var valuefields = this.parent.dataSourceSettings.values;
            for (var valueCnt = 0; valueCnt < valuefields.length; valueCnt++) {
                if (this.parent.dataSourceSettings.values[valueCnt].name === fieldName) {
                    isValueField = true;
                    break;
                }
            }
        }
        return isValueField;
    };
    Render.prototype.updateAggregate = function (aggregate) {
        if (this.parent.getAllSummaryType().indexOf(aggregate) > -1) {
            var valuefields = this.parent.dataSourceSettings.values;
            for (var valueCnt = 0; valueCnt < this.parent.dataSourceSettings.values.length; valueCnt++) {
                if (this.parent.dataSourceSettings.values[valueCnt].name === this.field) {
                    var dataSourceItem = valuefields[valueCnt];
                    dataSourceItem.type = aggregate;
                }
            }
        }
    };
    Render.prototype.injectGridModules = function (parent) {
        Grid.Inject(Freeze);
        if (parent.allowExcelExport) {
            Grid.Inject(ExcelExport);
        }
        if (parent.allowPdfExport) {
            Grid.Inject(PdfExport);
        }
        Grid.Inject(Selection, Reorder, Resize);
        if (this.gridSettings.contextMenuItems) {
            Grid.Inject(ContextMenu);
        }
    };
    /** @hidden */
    Render.prototype.updateGridSettings = function () {
        this.injectGridModules(this.parent);
        this.parent.grid.allowResizing = this.gridSettings.allowResizing;
        this.parent.grid.clipMode = this.gridSettings.clipMode;
        this.parent.grid.allowTextWrap = this.gridSettings.allowTextWrap;
        this.parent.grid.allowReordering = (this.parent.showGroupingBar ? false : this.gridSettings.allowReordering);
        this.parent.grid.allowSelection = this.gridSettings.allowSelection;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.parent.grid.contextMenuItems = this.gridSettings.contextMenuItems;
        this.parent.grid.selectedRowIndex = this.gridSettings.selectedRowIndex;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.parent.grid.selectionSettings = this.gridSettings.selectionSettings;
        this.parent.grid.textWrapSettings = this.gridSettings.textWrapSettings;
        this.parent.grid.printMode = this.gridSettings.printMode;
        this.parent.grid.rowHeight = this.gridSettings.rowHeight;
        this.parent.grid.gridLines = this.gridSettings.gridLines;
        if (this.parent.lastGridSettings) {
            var keys = Object.keys(this.parent.lastGridSettings);
            if (keys.indexOf('height') > -1) {
                this.parent.grid.height = this.gridSettings.height;
            }
            if (keys.indexOf('width') > -1) {
                this.parent.grid.width = this.gridSettings.width;
            }
            this.updatePivotColumns();
            if (keys.indexOf('allowTextWrap') > -1 || keys.indexOf('clipMode') > -1) {
                this.parent.layoutRefresh();
            }
        }
        this.clearColumnSelection();
    };
    Render.prototype.updatePivotColumns = function () {
        var keys = Object.keys(this.parent.lastGridSettings);
        for (var colPos = 0; colPos < this.parent.pivotColumns.length; colPos++) {
            var pivotColumn = this.parent.pivotColumns[colPos];
            for (var keyPos = 0; keyPos < keys.length; keyPos++) {
                var key = keys[keyPos];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                if (!isNullOrUndefined(this.parent.pivotColumns[colPos][key])) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    pivotColumn[key] = this.parent.lastGridSettings[key];
                }
            }
        }
        this.parent.fillGridColumns(this.parent.grid.columns);
    };
    Render.prototype.clearColumnSelection = function () {
        removeClass(this.parent.element.querySelectorAll('.' + cls.CELL_ACTIVE_BGCOLOR), [cls.CELL_ACTIVE_BGCOLOR, cls.SELECTED_BGCOLOR]);
    };
    Render.prototype.appendValueSortIcon = function (cell, tCell, rCnt, cCnt, column) {
        if (this.parent.enableValueSorting && this.parent.dataType === 'pivot') {
            var vSort = this.parent.dataSourceSettings.valueSortSettings;
            var len = (cell.type === 'grand sum' &&
                this.parent.dataSourceSettings.values.length === 1 && !this.parent.dataSourceSettings.alwaysShowValueHeader) ? 0 :
                (this.parent.dataSourceSettings.values.length > 1 || this.parent.dataSourceSettings.alwaysShowValueHeader) ?
                    (this.parent.engineModule.headerContent.length - 1) :
                    this.parent.dataSourceSettings.columns.length === 0 ? 0 : (this.parent.engineModule.headerContent.length - 1);
            var lock = (vSort && vSort.headerText) ? cell.valueSort.levelName === vSort.headerText : cCnt === vSort.columnIndex;
            if (vSort !== undefined && lock && (rCnt === len || (rCnt + 1) === len && cell.level > -1 &&
                this.parent.engineModule.headerContent[(rCnt + 1)][cCnt]
                && this.parent.engineModule.headerContent[(rCnt + 1)][cCnt].level === -1)
                && this.parent.dataSourceSettings.valueAxis === 'column') {
                tCell.querySelector('div div').appendChild(createElement('span', {
                    className: (vSort.sortOrder === 'Descending' ?
                        'e-icon-descending e-icons e-descending e-sortfilterdiv e-value-sort-icon' :
                        'e-icon-ascending e-icons e-ascending e-sortfilterdiv e-value-sort-icon') + (cell.hasChild ? ' e-value-sort-align' : ''),
                    styles: column.headerTextAlign === 'Right' ? 'float : left' : ''
                }));
            }
            // return tCell;
        }
        return tCell;
    };
    Render.prototype.onResizeStop = function (args) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var column = args.column.field === '0.formattedText' ? '0.formattedText' : args.column.customAttributes.cell.valueSort.levelName;
        this.parent.resizeInfo[column] = Number(args.column.width.toString().split('px')[0]);
        if (this.parent.enableVirtualization && args.column.field === '0.formattedText') {
            if (this.parent.dataSourceSettings.values.length > 1
                && !isNullOrUndefined(this.parent.grid.columns[this.parent.grid.columns.length - 1].columns)) {
                var gridColumns = this.parent.grid.columns[this.parent.grid.columns.length - 1].columns;
                gridColumns[gridColumns.length - 1].minWidth = this.parent.gridSettings.columnWidth;
            }
            else {
                this.parent.grid.columns[this.parent.grid.columns.length - 1].minWidth =
                    this.parent.gridSettings.columnWidth;
            }
            this.parent.layoutRefresh();
        }
        this.setGroupWidth(args);
        this.calculateGridHeight(true);
        this.parent.grid.hideScroll();
    };
    Render.prototype.setGroupWidth = function (args) {
        if (this.parent.enableVirtualization && args.column.field === '0.formattedText') {
            if (this.parent.showGroupingBar && this.parent.groupingBarModule && this.parent.element.querySelector('.' + cls.GROUPING_BAR_CLASS) && Number(args.column.width.toString().split('px')[0]) < 250) {
                args.cancel = true;
            }
            else {
                this.parent.element.querySelector('.e-frozenscrollbar').style.width = args.column.width.toString().split('px')[0] + 'px';
            }
        }
        if (this.parent.showGroupingBar && this.parent.groupingBarModule &&
            this.parent.element.querySelector('.' + cls.GROUPING_BAR_CLASS)) {
            this.parent.groupingBarModule.refreshUI();
            if (this.parent.element.querySelector('.e-group-row').offsetWidth < 245 && !this.parent.firstColWidth) {
                args.cancel = true;
                var gridColumn = this.parent.grid.columns;
                if (gridColumn && gridColumn.length > 0) {
                    gridColumn[0].width = this.resColWidth;
                }
                this.parent.element.querySelector('.e-frozenheader').querySelector('col').style.width = (this.resColWidth + 'px');
                this.parent.element.querySelector('.e-frozencontent').querySelector('col').style.width = (this.resColWidth + 'px');
            }
            this.parent.element.querySelector('.e-group-rows').style.height = 'auto';
            this.parent.element.querySelector('.e-group-values').style.width =
                this.parent.element.querySelector('.e-group-row').offsetWidth + 'px';
            var firstRowHeight = this.parent.element.querySelector('.e-headercontent').offsetHeight;
            this.parent.element.querySelector('.e-group-rows').style.height = firstRowHeight + 'px';
        }
        if (args.cancel) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var column = args.column.field === '0.formattedText' ? '0.formattedText' : args.column.customAttributes.cell.valueSort.levelName;
            this.parent.resizeInfo[column] = Number(args.column.width.toString().split('px')[0]);
            if (this.parent.enableVirtualization) {
                this.parent.layoutRefresh();
            }
        }
        if (this.parent.enableVirtualization) {
            this.parent.resizedValue = (args.cancel || args.column.field !== '0.formattedText') ? this.parent.resizedValue : Number(args.column.width.toString().split('px')[0]);
        }
        this.parent.trigger(args.e.type === 'touchend' || args.e.type === 'mouseup' ? events.resizeStop : events.resizing, args);
    };
    /** @hidden */
    Render.prototype.selected = function () {
        clearTimeout(this.timeOutObj);
        this.timeOutObj = setTimeout(this.onSelect.bind(this), 300);
    };
    Render.prototype.onSelect = function () {
        var pivotArgs = { selectedCellsInfo: [], pivotValues: this.parent.pivotValues, currentCell: null };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var selectedElements = this.parent.element.querySelectorAll('.' + cls.CELL_SELECTED_BGCOLOR + ',.' + cls.SELECTED_BGCOLOR);
        for (var _i = 0, selectedElements_1 = selectedElements; _i < selectedElements_1.length; _i++) {
            var element = selectedElements_1[_i];
            var colIndex = Number(element.getAttribute('data-colindex'));
            var rowIndex = Number(element.getAttribute('index'));
            var cell = this.engine.pivotValues[rowIndex][colIndex];
            if (cell) {
                if (cell.axis === 'value') {
                    pivotArgs.selectedCellsInfo.push({
                        currentCell: cell,
                        value: cell.value,
                        columnHeaders: cell.columnHeaders,
                        rowHeaders: cell.rowHeaders,
                        measure: cell.actualText.toString()
                    });
                }
                else if (cell.axis === 'column') {
                    pivotArgs.selectedCellsInfo.push({
                        currentCell: cell,
                        value: cell.formattedText,
                        columnHeaders: cell.valueSort.levelName,
                        rowHeaders: '',
                        measure: ''
                    });
                }
                else {
                    pivotArgs.selectedCellsInfo.push({
                        currentCell: cell,
                        value: cell.formattedText,
                        columnHeaders: '',
                        rowHeaders: cell.valueSort.levelName,
                        measure: ''
                    });
                }
            }
        }
        this.parent.trigger(events.cellSelected, pivotArgs);
    };
    Render.prototype.rowCellBoundEvent = function (args) {
        var tCell = args.cell;
        if (tCell && (this.parent.notEmpty) && this.engine.headerContent) {
            var customClass = this.parent.hyperlinkSettings.cssClass;
            var cell = args.data[0];
            var isRowFieldsAvail = cell.valueSort && cell.valueSort.levelName === (this.parent.dataSourceSettings.rows.length === 0 && this.parent.dataSourceSettings.valueAxis === 'row' &&
                this.parent.localeObj.getConstant('grandTotal') + (this.parent.dataSourceSettings.valueSortSettings.headerDelimiter) + (cell.formattedText));
            tCell.setAttribute('index', cell.rowIndex ? cell.rowIndex.toString() : '0');
            if (tCell.getAttribute('data-colindex') === '0') {
                if (this.parent.dataType === 'pivot') {
                    var isValueCell = cell.type && cell.type === 'value';
                    tCell.innerText = '';
                    var levelName = cell.valueSort ? cell.valueSort.levelName.toString() : '';
                    var memberPos = cell.actualText ?
                        cell.actualText.toString().split(this.parent.dataSourceSettings.valueSortSettings.headerDelimiter).length : 0;
                    var levelPosition = levelName.split(this.parent.dataSourceSettings.valueSortSettings.headerDelimiter).length -
                        (memberPos ? memberPos - 1 : memberPos);
                    var level = levelPosition ? (levelPosition - 1) : 0;
                    level = cell.isSum ? level - 1 : level;
                    do {
                        if (level > 0) {
                            tCell.appendChild(createElement('span', {
                                className: level === 0 ? '' : cls.NEXTSPAN
                            }));
                        }
                        level--;
                    } while (level > -1);
                    level = levelPosition ? (levelPosition - 1) : 0;
                    this.lastSpan = levelPosition ? this.lastSpan : 0;
                    if (!cell.hasChild && (!isValueCell ? level : 0) > 0) {
                        tCell.appendChild(createElement('span', {
                            className: cls.LASTSPAN
                        }));
                    }
                    var fieldName = void 0;
                    if ((this.parent.dataSourceSettings.rows.length > 0 &&
                        (cell.valueSort ? Object.keys(cell.valueSort).length > 0 : true))) {
                        if (isValueCell) {
                            for (var _i = 0, _a = this.parent.dataSourceSettings.values; _i < _a.length; _i++) {
                                var field = _a[_i];
                                var name_1 = field.caption ? field.caption : field.name;
                                if (levelName.indexOf(name_1) > -1) {
                                    fieldName = field.name;
                                    break;
                                }
                            }
                        }
                        else {
                            fieldName = cell.level > -1 && this.parent.dataSourceSettings.rows[cell.level] ?
                                this.parent.dataSourceSettings.rows[cell.level].name : '';
                        }
                        tCell.setAttribute('fieldname', fieldName);
                    }
                }
                else {
                    tCell = this.onOlapRowCellBoundEvent(tCell, cell);
                }
                var localizedText = cell.formattedText;
                if (cell.type) {
                    if (cell.type === 'grand sum') {
                        this.rowGrandPos = cell.rowIndex;
                        tCell.classList.add('e-gtot');
                        var values = this.parent.dataSourceSettings.values;
                        localizedText = isNullOrUndefined(cell.valueSort.axis) ? (this.parent.dataSourceSettings.rows.length === 0 && values.length === 1 && this.parent.dataSourceSettings.valueAxis === 'row') ?
                            this.parent.localeObj.getConstant('total') + ' ' + this.parent.localeObj.getConstant(values[values.length - 1].type) + ' ' +
                                this.parent.localeObj.getConstant('of') + ' ' + (!isNullOrUndefined(values[values.length - 1].caption) ? values[values.length - 1].caption : values[values.length - 1].name) :
                            this.parent.localeObj.getConstant('grandTotal') : cell.formattedText;
                    }
                    else if (cell.valueSort.levelName === (this.parent.localeObj.getConstant('grandTotal') +
                        (this.parent.dataSourceSettings.valueSortSettings.headerDelimiter) + (cell.formattedText))) {
                        tCell.classList.add('e-gtot');
                        localizedText = isRowFieldsAvail ? this.parent.localeObj.getConstant('total') + ' ' + this.parent.localeObj.getConstant(this.parent.engineModule.fieldList[cell.actualText].aggregateType) + ' '
                            + this.parent.localeObj.getConstant('of') + ' ' + cell.formattedText : localizedText;
                    }
                    else if (cell.type === 'sum' && cell.memberType !== 3) {
                        localizedText = cell.formattedText.split('Total')[0] + this.parent.localeObj.getConstant('total');
                    }
                    else {
                        tCell.classList.add('e-stot');
                    }
                }
                tCell.classList.add(cls.ROWSHEADER);
                if (cell.hasChild === true && !cell.isNamedSet) {
                    tCell.appendChild(createElement('div', {
                        className: (cell.isDrilled === true ? cls.COLLAPSE : cls.EXPAND) + ' ' + cls.ICON,
                        attrs: {
                            'title': cell.isDrilled === true ? this.parent.localeObj.getConstant('collapse') :
                                this.parent.localeObj.getConstant('expand')
                        }
                    }));
                }
                tCell.appendChild(createElement('span', {
                    className: cls.CELLVALUE,
                    innerHTML: (this.parent.isRowCellHyperlink || cell.enableHyperlink ? '<a  data-url="' + localizedText + '" class="e-hyperlinkcell ' + customClass + '">' + localizedText + '</a>' : localizedText)
                }));
                var vSort = this.parent.pivotView.dataSourceSettings.valueSortSettings;
                if (this.parent.enableValueSorting) {
                    if (vSort && vSort.headerText && this.parent.dataSourceSettings.valueAxis === 'row' &&
                        this.parent.pivotValues[Number(tCell.getAttribute('index'))][0] &&
                        this.parent.pivotValues[Number(tCell.getAttribute('index'))][0].valueSort.levelName) {
                        if (this.parent.pivotValues[Number(tCell.getAttribute('index'))][0].valueSort.levelName
                            === vSort.headerText) {
                            tCell.appendChild(createElement('span', {
                                className: (vSort.sortOrder === 'Descending' ?
                                    'e-icon-descending e-icons e-descending e-sortfilterdiv e-value-sort-icon' :
                                    'e-icon-ascending e-icons e-ascending e-sortfilterdiv e-value-sort-icon') + (cell.hasChild ? ' e-value-sort-align' : ''),
                                styles: tCell.style.textAlign === 'right' ? 'float: left' : ''
                            }));
                        }
                    }
                }
            }
            else {
                var innerText = tCell.innerText;
                tCell.innerText = '';
                tCell.classList.add(cls.VALUESCONTENT);
                cell = args.data[Number(tCell.getAttribute('data-colindex'))];
                cell = isNullOrUndefined(cell) ? args.column.customAttributes.cell : cell;
                cell.isGrandSum = isRowFieldsAvail ? true : cell.isGrandSum;
                if (cell.isSum) {
                    tCell.classList.add(cls.SUMMARY);
                }
                var isGrandSum = (isNullOrUndefined(cell.isGrandSum) && (!isNullOrUndefined(this.parent.olapEngineModule) && this.parent.olapEngineModule.olapValueAxis === 'column') && this.parent.dataType === 'olap' &&
                    ((this.colGrandPos - this.parent.dataSourceSettings.values.length) < Number(tCell.getAttribute('data-colindex'))));
                if (cell.isGrandSum || (isGrandSum || this.colGrandPos === Number(tCell.getAttribute('data-colindex'))) || this.rowGrandPos === Number(tCell.getAttribute('index'))) {
                    tCell.classList.add('e-gtot');
                }
                else if (this.parent.dataType === 'olap' ? cell.isSum : this.validateColumnTotalcell(cell.colIndex)) {
                    tCell.classList.add('e-colstot');
                }
                if (cell.cssClass) {
                    tCell.classList.add(cell.cssClass);
                }
                tCell.appendChild(createElement('span', {
                    className: cls.CELLVALUE,
                    innerHTML: ((tCell.className.indexOf('e-summary') !== -1 && this.parent.isSummaryCellHyperlink) ||
                        (tCell.className.indexOf('e-summary') === -1 && this.parent.isValueCellHyperlink) || cell.enableHyperlink ?
                        '<a data-url="' + innerText + '" class="e-hyperlinkcell ' + customClass + '">' + innerText + '</a>' : innerText)
                }));
                if (this.parent.gridSettings.allowReordering && !this.parent.showGroupingBar) {
                    tCell.setAttribute('data-colindex', args.column.customAttributes ? args.column.customAttributes.cell.colIndex.toString() : args.column.index.toString());
                }
            }
            if (this.parent.cellTemplate) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var element = this.parent.getCellTemplate()({ targetCell: tCell, cellInfo: cell }, this.parent, 'cellTemplate', this.parent.element.id + '_cellTemplate', null, null, tCell);
                if (element && element !== '' && element.length > 0) {
                    if (this.parent.enableHtmlSanitizer) {
                        if (this.parent.isVue || this.parent.isVue3) {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            append(SanitizeHtmlHelper.sanitize(element), tCell);
                        }
                        else {
                            this.parent.appendHtml(tCell, SanitizeHtmlHelper.sanitize(element[0].outerHTML));
                        }
                    }
                    else {
                        if (this.parent.isVue || this.parent.isVue3) {
                            append(element, tCell);
                        }
                        else {
                            this.parent.appendHtml(tCell, element[0].outerHTML);
                        }
                    }
                }
            }
            this.unWireEvents(tCell);
            this.wireEvents(tCell);
        }
        args.pivotview = this.parent;
        this.parent.trigger(events.queryCellInfo, args);
    };
    Render.prototype.onOlapRowCellBoundEvent = function (tCell, cell) {
        tCell.innerText = '';
        var rowMeasurePos = this.engine.rowMeasurePos;
        if (this.parent.enableVirtualization) {
            if (cell.ordinal > -1 && this.parent.olapEngineModule.tupRowInfo.length > 0) {
                var tupInfo = this.parent.olapEngineModule.tupRowInfo[cell.ordinal];
                var memberPosition = tupInfo.uNameCollection.indexOf(cell.actualText.toString());
                var cropUName = tupInfo.uNameCollection.substring(0, memberPosition) +
                    (cell.memberType === 3 ? '' : cell.actualText.toString());
                var fieldSep = cropUName.split('::[').map(function (item) {
                    return item[0] === '[' ? item : ('[' + item);
                });
                if (cell.memberType === 3 && rowMeasurePos) {
                    fieldSep.push(cell.actualText.toString());
                }
                var nxtIndextCount = -1;
                var lastIndextCount = 0;
                var prevHasChild = false;
                for (var fPos = 0; fPos < fieldSep.length; fPos++) {
                    var fieldMembers = fieldSep[fPos];
                    var membersCount = fieldMembers.split('~~').length;
                    nxtIndextCount += membersCount;
                    var hasChild = tupInfo.typeCollection[fPos] !== '2' ? (this.engine.fieldList[tupInfo.members[fPos].getAttribute('Hierarchy')] && this.engine.fieldList[tupInfo.members[fPos].getAttribute('Hierarchy')].isHierarchy && fPos < this.parent.dataSourceSettings.rows.length - 1 && !this.parent.dataSourceSettings.rows[fPos + 1].isNamedSet && this.parent.dataSourceSettings.rows[fPos + 1].name.indexOf('[Measures]') < 0 && this.engine.fieldList[this.parent.dataSourceSettings.rows[fPos + 1].name] && this.engine.fieldList[this.parent.dataSourceSettings.rows[fPos + 1].name].hasAllMember) ? true : Number(tupInfo.members[fPos].querySelector('CHILDREN_CARDINALITY').textContent) > 0 : false;
                    lastIndextCount += (fPos > 0 && prevHasChild && !hasChild) ? 1 : 0;
                    prevHasChild = hasChild;
                }
                var indent = 0;
                for (var iPos = 0; iPos < nxtIndextCount; iPos++) {
                    tCell.appendChild(createElement('span', {
                        className: cls.NEXTSPAN
                    }));
                    indent++;
                }
                for (var iPos = 0; iPos < lastIndextCount && nxtIndextCount > 0; iPos++) {
                    tCell.appendChild(createElement('span', {
                        className: cls.LASTSPAN
                    }));
                }
                this.indentCollection[cell.rowIndex] = indent;
                this.maxIndent = this.maxIndent > indent ? this.maxIndent : indent;
            }
        }
        else {
            var hierarchyName = cell.hierarchy;
            var levelName = cell.memberType === 3 ? (this.measurePos + '.' + cell.levelUniqueName) : cell.levelUniqueName;
            var hasChild = cell.hasChild;
            var isSubTotalCell = false;
            if (cell.isSum && cell.memberType === 3) {
                var currPos_1 = this.lvlCollection[cell.parentUniqueName].position;
                for (var i = currPos_1 + 1; i < this.position; i++) {
                    delete this.lvlCollection[this.lvlPosCollection[i]];
                    delete this.lvlPosCollection[i];
                }
                this.position = this.position > (currPos_1 + 1) ? (currPos_1 + 1) : this.position;
                isSubTotalCell = true;
                this.measurePos = this.lvlCollection[cell.parentUniqueName].position;
            }
            if (!this.lvlCollection[levelName] && levelName) {
                this.lvlPosCollection[this.position] = levelName;
                this.lvlCollection[levelName] = { position: this.position, hasChild: hasChild };
                this.position++;
            }
            else if (levelName) {
                var currPos_2 = this.lvlCollection[levelName].position;
                for (var pos = currPos_2 + 1; pos < this.position; pos++) {
                    delete this.lvlCollection[this.lvlPosCollection[pos]];
                    delete this.lvlPosCollection[pos];
                }
                this.position = this.position > (currPos_2 + 1) ? (currPos_2 + 1) : this.position;
            }
            if (!this.hierarchyCollection[hierarchyName] && hierarchyName) {
                this.hierarchyPosCollection[this.hierarchyCount] = hierarchyName;
                this.hierarchyCollection[hierarchyName] = {
                    lvlPosition: this.position - 1,
                    hierarchyPOs: this.hierarchyCount
                };
                this.hierarchyCount++;
            }
            else if (hierarchyName) {
                var currPos_3 = this.hierarchyCollection[hierarchyName].hierarchyPOs;
                for (var pos = currPos_3 + 1; pos < this.hierarchyCount; pos++) {
                    delete this.hierarchyCollection[this.hierarchyPosCollection[pos]];
                    delete this.hierarchyPosCollection[pos];
                }
                this.hierarchyCount = this.hierarchyCount > (currPos_3 + 1) ? (currPos_3 + 1) : this.hierarchyCount;
            }
            if (cell.memberType !== 3 && levelName && this.lvlCollection[levelName]) {
                var currHierarchyPos = this.hierarchyCollection[hierarchyName] ?
                    this.hierarchyCollection[hierarchyName].hierarchyPOs : -1;
                this.measurePos = rowMeasurePos <= currHierarchyPos && this.hierarchyPosCollection[rowMeasurePos + 1] ?
                    this.measurePos : this.lvlCollection[levelName].position;
            }
            var currPos = this.lvlCollection[levelName] ? this.lvlCollection[levelName].position : -1;
            currPos = isSubTotalCell ? currPos - 1 : currPos;
            var lvlPos = 0;
            var indent = 0;
            while (lvlPos <= currPos && currPos > 0 && cell.level > -1) {
                var hasChild_1 = this.lvlCollection[this.lvlPosCollection[lvlPos]].hasChild;
                var prevHasChild = lvlPos > 0 ? this.lvlCollection[this.lvlPosCollection[lvlPos - 1]].hasChild : false;
                if (prevHasChild && !hasChild_1) {
                    tCell.appendChild(createElement('span', {
                        className: cls.LASTSPAN
                    }));
                }
                if (lvlPos !== currPos) {
                    tCell.appendChild(createElement('span', {
                        className: cls.NEXTSPAN
                    }));
                    indent++;
                }
                lvlPos++;
            }
            if (this.parent.dataSourceSettings.grandTotalsPosition === 'Top' && (!isNullOrUndefined(this.parent.olapEngineModule) && this.parent.olapEngineModule.olapValueAxis === 'row') && this.parent.dataType === 'olap' &&
                (cell.valueSort.levelName.toString()).indexOf(this.parent.localeObj.getConstant('grandTotal') + this.parent.dataSourceSettings.valueSortSettings.headerDelimiter) === 0) {
                tCell.appendChild(createElement('span', {
                    className: cls.NEXTSPAN
                }));
            }
            if (cell.memberType === 3 && cell.level === -1 && Object.keys(this.lvlCollection).length > 1) {
                tCell.appendChild(createElement('span', {
                    className: cls.NEXTSPAN
                }));
                indent++;
            }
            this.indentCollection[cell.rowIndex] = indent;
            this.maxIndent = this.maxIndent > indent ? this.maxIndent : indent;
        }
        tCell.setAttribute('fieldname', cell.hierarchy);
        var grandTotal = (this.parent.olapEngineModule.tupRowInfo[cell.ordinal] ?
            (this.parent.olapEngineModule.tupRowInfo[cell.ordinal].measurePosition === 0 ?
                this.parent.olapEngineModule.tupRowInfo[cell.ordinal].allStartPos === 1 :
                this.parent.olapEngineModule.tupRowInfo[cell.ordinal].allStartPos === 0) : false);
        if (grandTotal) {
            tCell.classList.add('e-gtot');
        }
        return tCell;
    };
    Render.prototype.columnCellBoundEvent = function (args) {
        if (args.cell.column && args.cell.column.customAttributes) {
            var cell = args.cell.column.customAttributes.cell;
            var tCell = args.node;
            if (cell) {
                var customClass = this.parent.hyperlinkSettings.cssClass;
                var isValueCell = false;
                for (var _i = 0, _a = this.parent.dataSourceSettings.values; _i < _a.length; _i++) {
                    var field = _a[_i];
                    if (field.name === cell.actualText) {
                        isValueCell = true;
                        tCell.setAttribute('fieldname', field.name);
                    }
                }
                if ((cell.level === -1 && !cell.rowSpan) || cell.rowSpan === -1) {
                    args.node.style.display = 'none';
                }
                else if (cell.rowSpan > 1) {
                    args.node.setAttribute('rowspan', cell.rowSpan.toString());
                    args.node.setAttribute('aria-rowspan', cell.rowSpan.toString());
                    if ((cell.rowIndex + cell.rowSpan) === this.engine.headerContent.length) {
                        args.node.style.borderBottomWidth = '0px';
                    }
                }
                args.node.setAttribute('data-colindex', cell.colIndex.toString());
                args.node.setAttribute('index', cell.rowIndex.toString());
                var fieldName = void 0;
                if (this.parent.dataType === 'pivot') {
                    if (!isValueCell && !(this.parent.dataSourceSettings.values && this.parent.dataSourceSettings.valueAxis === 'column' &&
                        this.parent.dataSourceSettings.values.length > 1 &&
                        (isValueCell && cell.rowIndex === this.engine.headerContent.length - 1)) && this.parent.dataSourceSettings.columns
                        && this.parent.dataSourceSettings.columns.length > 0) {
                        fieldName = cell.level > -1 && this.parent.dataSourceSettings.columns[cell.level] ?
                            this.parent.dataSourceSettings.columns[cell.level].name : '';
                        tCell.setAttribute('fieldname', fieldName);
                    }
                    if (this.validateColumnTotalcell(cell.colIndex)) {
                        tCell.classList.add('e-colstot');
                    }
                }
                else {
                    tCell = this.onOlapColumnCellBoundEvent(tCell, cell);
                }
                var isColumnFieldsAvail = (this.parent.dataSourceSettings.columns.length === 0 && this.parent.dataSourceSettings.valueAxis === 'column' && cell.valueSort &&
                    cell.valueSort.levelName === (this.parent.localeObj.getConstant('grandTotal') + (this.parent.dataSourceSettings.valueSortSettings.headerDelimiter) + (cell.formattedText)));
                if (cell.type || isColumnFieldsAvail) {
                    tCell.classList.add(cell.type === 'grand sum' ? 'e-gtot' : 'e-stot');
                    if (cell.type === 'grand sum') {
                        this.colGrandPos = cell.colIndex;
                    }
                    else if (cell.type) {
                        tCell.classList.add('e-colstot');
                    }
                    var localizedText = cell.type === 'grand sum' ? (isNullOrUndefined(cell.valueSort.axis) || this.parent.dataType === 'olap' ? this.parent.localeObj.getConstant('grandTotal') :
                        cell.formattedText) : cell.formattedText.split('Total')[0] + this.parent.localeObj.getConstant('total');
                    localizedText = isColumnFieldsAvail && this.parent.engineModule.fieldList ? this.parent.localeObj.getConstant('total') + ' ' + this.parent.localeObj.getConstant(this.parent.engineModule.fieldList[cell.actualText].aggregateType)
                        + ' ' + this.parent.localeObj.getConstant('of') + ' ' + cell.formattedText : localizedText;
                    if (tCell.querySelector('.e-headertext') !== null) {
                        tCell.querySelector('.e-headertext').innerText = localizedText;
                    }
                    else {
                        tCell.querySelector('.e-stackedheadercelldiv').innerText = localizedText;
                    }
                }
                tCell.classList.add(cls.COLUMNSHEADER);
                if (this.parent.isColumnCellHyperlink || cell.enableHyperlink) {
                    if (tCell.querySelector('.e-stackedheadercelldiv')) {
                        var innerText = tCell.querySelector('.e-stackedheadercelldiv').innerText;
                        tCell.querySelector('.e-stackedheadercelldiv').innerHTML =
                            '<a data-url="' + innerText + '" class="e-hyperlinkcell ' + customClass + '">' + innerText + '</a>';
                    }
                    else if (tCell.querySelector('.e-headertext')) {
                        var innerText = tCell.querySelector('.e-headertext').innerText;
                        tCell.querySelector('.e-headertext').innerHTML =
                            '<a data-url="' + innerText + '" class="e-hyperlinkcell ' + customClass + '">' + innerText + '</a>';
                    }
                }
                if (cell.hasChild === true && !cell.isNamedSet) {
                    var hdrdiv = tCell.querySelector('.e-headercelldiv');
                    if (hdrdiv) {
                        hdrdiv.style.height = 'auto';
                        hdrdiv.style.lineHeight = 'normal';
                    }
                    var div = createElement('div', {
                        className: (cell.isDrilled === true ? cls.COLLAPSE : cls.EXPAND) + ' ' + cls.ICON,
                        attrs: {
                            'title': cell.isDrilled === true ? this.parent.localeObj.getConstant('collapse') :
                                this.parent.localeObj.getConstant('expand')
                        }
                    });
                    if (window.navigator.userAgent.indexOf('Edge') > -1 || window.navigator.userAgent.indexOf('Trident') > -1) {
                        tCell.children[0].style.display = 'table';
                    }
                    else {
                        tCell.children[0].style.display = 'block';
                    }
                    this.updateWrapper(tCell, div);
                }
                else {
                    this.updateWrapper(tCell);
                }
                tCell = this.appendValueSortIcon(cell, tCell, cell.rowIndex, cell.colIndex, args.cell.column);
                if (this.parent.cellTemplate) {
                    this.parent.gridHeaderCellInfo.push({ targetCell: tCell });
                }
                var len = this.parent.dataSourceSettings.values.length;
                for (var vCnt = 0; vCnt < len; vCnt++) {
                    if (this.parent.dataSourceSettings.values[vCnt].name === cell.actualText) {
                        if (this.parent.dataType === 'olap') {
                            var grandTotal = (this.parent.olapEngineModule.tupColumnInfo[cell.ordinal] ?
                                (this.parent.olapEngineModule.tupColumnInfo[cell.ordinal].measurePosition === 0 ?
                                    this.parent.olapEngineModule.tupColumnInfo[cell.ordinal].allStartPos === 1 :
                                    this.parent.olapEngineModule.tupColumnInfo[cell.ordinal].allStartPos === 0) : false);
                            if (grandTotal) {
                                tCell.classList.add('e-gtot');
                            }
                        }
                        if (cell.valueSort.levelName === (this.parent.localeObj.getConstant('grandTotal') + (this.parent.dataSourceSettings.valueSortSettings.headerDelimiter) + (cell.formattedText))
                            || cell.valueSort.levelName === ('Grand Total' + (this.parent.dataSourceSettings.valueSortSettings.headerDelimiter) + (cell.formattedText))) {
                            tCell.classList.add('e-gtot');
                        }
                        else {
                            tCell.classList.add(cls.VALUESHEADER);
                        }
                    }
                }
                this.unWireEvents(tCell);
                this.wireEvents(tCell);
            }
        }
        this.parent.trigger(events.headerCellInfo, args);
    };
    Render.prototype.updateWrapper = function (tCell, div) {
        if (tCell.querySelectorAll('.e-headercelldiv').length > 0 || tCell.querySelectorAll('.e-stackedheadercelldiv').length > 0) {
            var outerDiv = createElement('div', {
                className: cls.PIVOT_CELL_CONTAINER
            });
            var innerDiv = createElement('div', {
                className: (div ? 'e-stackedheadertext' : 'e-headertext') + ' ' + cls.CELLVALUE,
                innerHTML: tCell.querySelectorAll('.e-headercelldiv').length > 0 ? tCell.querySelector('.e-headercelldiv').innerHTML : tCell.querySelector('.e-stackedheadercelldiv').innerHTML
            });
            if (div) {
                outerDiv.append(div);
            }
            outerDiv.append(innerDiv);
            tCell.children[0].innerHTML = '';
            tCell.children[0].append(outerDiv);
        }
        return tCell;
    };
    Render.prototype.onOlapColumnCellBoundEvent = function (tCell, cell) {
        tCell.setAttribute('fieldname', cell.memberType === 3 ? cell.actualText.toString() : cell.hierarchy);
        var prevCell = this.engine.headerContent[cell.rowIndex] ?
            this.engine.headerContent[cell.rowIndex][cell.colIndex - 1] : undefined;
        if (prevCell && prevCell.actualText === cell.actualText && prevCell.type === cell.type &&
            (prevCell.colSpan > 1)) {
            tCell.style.display = 'none';
        }
        else {
            // tCell.setAttribute('colspan', cell.colSpan.toString());
            // tCell.setAttribute('aria-colspan', cell.colSpan.toString());
        }
        if (cell.rowIndex === (this.engine.headerContent.length - 1) && cell.memberType === 2) {
            tCell.style.display = this.isSpannedCell(this.engine.headerContent.length, cell) ? 'none' : tCell.style.display;
        }
        return tCell;
    };
    Render.prototype.isSpannedCell = function (colLength, currCell) {
        var prevCell = this.engine.headerContent[currCell.rowIndex - 1] ?
            this.engine.headerContent[currCell.rowIndex - 1][currCell.colIndex] : undefined;
        var parentCellSpan;
        var parentCellPos;
        while (prevCell && ((prevCell.memberType === currCell.memberType) || (prevCell.type && currCell.type))) {
            if (prevCell.rowSpan > 0) {
                parentCellSpan = prevCell.rowSpan;
                parentCellPos = prevCell.rowIndex;
            }
            prevCell = this.engine.headerContent[prevCell.rowIndex - 1] ?
                this.engine.headerContent[prevCell.rowIndex - 1][currCell.colIndex] : undefined;
        }
        return (parentCellPos + parentCellSpan) >= colLength;
    };
    Render.prototype.onHyperCellClick = function (e) {
        var cell = e.target.parentElement.parentElement;
        cell = (cell.className.indexOf('e-headercelldiv') > -1 ? cell.parentElement : cell);
        var args = {
            currentCell: cell,
            data: this.engine.pivotValues[Number(cell.getAttribute('index'))][Number(cell.getAttribute('data-colindex'))],
            cancel: true,
            nativeEvent: e
        };
        this.parent.trigger(events.hyperlinkCellClick, args, function (observedArgs) {
            if (!observedArgs.cancel) {
                args.currentCell = getElement(args.currentCell);
                var url = args.currentCell.getAttribute('data-url') ? (args.currentCell).getAttribute('data-url') :
                    args.currentCell.querySelector('a').getAttribute('data-url');
                window.open(url);
            }
        });
    };
    Render.prototype.getRowStartPos = function () {
        var pivotValues = this.parent.pivotValues;
        var rowPos;
        for (var rCnt = 0; rCnt < (pivotValues ? pivotValues.length : 0); rCnt++) {
            if (pivotValues[rCnt] && pivotValues[rCnt][0] && pivotValues[rCnt][0].axis === 'row') {
                rowPos = rCnt;
                break;
            }
        }
        return rowPos;
    };
    Render.prototype.frameDataSource = function (type) {
        var dataContent = [];
        if (((this.parent.dataType === 'pivot' && this.parent.dataSourceSettings.dataSource && this.parent.engineModule.data.length > 0) || (this.parent.dataType === 'olap' && this.parent.dataSourceSettings.url !== '') ||
            (this.parent.dataSourceSettings.mode === 'Server' && this.parent.dataSourceSettings.url !== '' && this.engine.pivotValues.length > 0)) && this.parent.dataSourceSettings.values.length > 0 && !this.engine.isEmptyData) {
            if ((this.parent.enableValueSorting) || !this.engine.isEngineUpdated) {
                var rowCnt = 0;
                var pivotValues = this.parent.pivotValues;
                var start = type === 'value' ? this.rowStartPos : 0;
                var end = type === 'value' ? (pivotValues ? pivotValues.length : 0) : this.rowStartPos;
                for (var rCnt = start; rCnt < end; rCnt++) {
                    if (pivotValues[rCnt]) {
                        rowCnt = type === 'header' ? rCnt : rowCnt;
                        dataContent[rowCnt] = {};
                        for (var cCnt = 0; cCnt < pivotValues[rCnt].length; cCnt++) {
                            if (pivotValues[rCnt][cCnt]) {
                                dataContent[rowCnt][cCnt] = pivotValues[rCnt][cCnt];
                            }
                        }
                        rowCnt++;
                    }
                }
            }
            else {
                dataContent = type === 'value' ? this.engine.valueContent : this.engine.headerContent;
            }
        }
        else {
            dataContent = this.frameEmptyData();
        }
        return dataContent;
    };
    /** @hidden */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Render.prototype.frameEmptyData = function () {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var dataContent = [{
                0: { formattedText: this.parent.localeObj.getConstant('grandTotal') },
                1: { formattedText: this.parent.localeObj.getConstant('emptyData') }
            }];
        return dataContent;
    };
    /** @hidden */
    Render.prototype.calculateColWidth = function (colCount) {
        if (!isNullOrUndefined(this.parent.resizedValue)) {
            this.parent.resizedValue = (this.parent.showGroupingBar && this.parent.resizedValue < 250) ? 250 : this.parent.resizedValue;
        }
        this.resColWidth = !isNullOrUndefined(this.parent.resizedValue) ? this.parent.resizedValue : this.resColWidth;
        var offsetWidth = this.parent.element.offsetWidth ? this.parent.element.offsetWidth :
            this.parent.element.getBoundingClientRect().width;
        var parWidth = isNaN(this.parent.width) ? (this.parent.width.toString().indexOf('%') > -1 ?
            ((parseFloat(this.parent.width.toString()) / 100) * offsetWidth) : offsetWidth) :
            Number(this.parent.width);
        parWidth = parWidth - (this.gridSettings.columnWidth > this.resColWidth ? this.gridSettings.columnWidth : this.resColWidth) - 2;
        colCount = colCount - 1;
        this.isOverflows = !((colCount * this.gridSettings.columnWidth) < parWidth);
        var colWidth = (colCount * this.gridSettings.columnWidth) < parWidth ? (parWidth / colCount) : this.gridSettings.columnWidth;
        return (!this.isOverflows && !this.gridSettings.allowAutoResizing) ? this.gridSettings.columnWidth : Math.floor(colWidth);
    };
    /** @hidden */
    Render.prototype.resizeColWidth = function (colCount) {
        if (!isNullOrUndefined(this.parent.resizedValue)) {
            this.parent.resizedValue = (this.parent.showGroupingBar && this.parent.resizedValue < 250) ? 250 : this.parent.resizedValue;
        }
        this.resColWidth = !isNullOrUndefined(this.parent.resizedValue) ? this.parent.resizedValue : this.resColWidth;
        var parWidth = isNaN(this.parent.width) ? (this.parent.width.toString().indexOf('%') > -1 ?
            ((parseFloat(this.parent.width.toString()) / 100) * this.parent.element.offsetWidth) : this.parent.element.offsetWidth) :
            Number(this.parent.width);
        colCount = colCount - 1;
        parWidth = parWidth - (this.gridSettings.columnWidth > this.resColWidth ? this.gridSettings.columnWidth : this.resColWidth) - 2;
        this.isOverflows = !((colCount * this.gridSettings.columnWidth) < parWidth);
        var colWidth = (colCount * this.gridSettings.columnWidth) < parWidth ? (parWidth / colCount) : this.gridSettings.columnWidth;
        return (!this.isOverflows && !this.gridSettings.allowAutoResizing) ? this.gridSettings.columnWidth : Math.floor(colWidth);
    };
    /** @hidden */
    Render.prototype.calculateGridWidth = function () {
        var parWidth = this.parent.width;
        var eleWidth = this.parent.element.getBoundingClientRect().width ?
            this.parent.element.getBoundingClientRect().width : this.parent.element.offsetWidth;
        if (eleWidth === 0) {
            eleWidth = this.parent.element.parentElement.getBoundingClientRect().width ?
                this.parent.element.parentElement.getBoundingClientRect().width : this.parent.element.parentElement.offsetWidth;
        }
        if (this.gridSettings.width === 'auto') {
            if (this.parent.width === 'auto') {
                parWidth = eleWidth;
            }
            else if (this.parent.width.toString().indexOf('%') > -1) {
                parWidth = ((parseFloat(this.parent.width.toString()) / 100) * eleWidth);
            }
        }
        else {
            parWidth = this.gridSettings.width;
        }
        return (!this.gridSettings.allowAutoResizing && parWidth > this.parent.totColWidth) ? this.parent.totColWidth : parWidth;
    };
    /** @hidden */
    Render.prototype.calculateGridHeight = function (elementCreated) {
        var gridHeight = this.parent.height;
        var parHeight = this.parent.getHeightAsNumber();
        if (isNaN(parHeight)) {
            parHeight = parHeight > this.parent.minHeight ? parHeight : this.parent.minHeight;
        }
        if ((this.parent.showToolbar && this.parent.currentView !== 'Chart') || (!this.parent.showToolbar && this.parent.displayOption.view !== 'Chart')) {
            if (this.gridSettings.height === 'auto' && parHeight && this.parent.element.querySelector('.' + cls.GRID_HEADER)) {
                var rowColHeight = this.parent.element.querySelector('.' + cls.GRID_HEADER).offsetHeight;
                var gBarHeight = rowColHeight + (this.parent.element.querySelector('.' + cls.GRID_GROUPING_BAR_CLASS) ?
                    this.parent.element.querySelector('.' + cls.GRID_GROUPING_BAR_CLASS).offsetHeight : 0);
                var toolBarHeight = this.parent.element.querySelector('.' + cls.GRID_TOOLBAR) ? 42 : 0;
                var pagerHeight = this.parent.element.querySelector('.' + cls.GRID_PAGER) ? this.parent.element.querySelector('.' + cls.GRID_PAGER).offsetHeight : 0;
                gridHeight = parHeight - (gBarHeight + toolBarHeight + pagerHeight) - 1;
                gridHeight = gridHeight < 40 ? 40 : gridHeight;
                if (elementCreated) {
                    var tableHeight = this.parent.element.querySelector('.' + cls.FROZENCONTENT_DIV + ' .' + cls.TABLE).offsetHeight;
                    var contentHeight = this.parent.element.querySelector('.' + cls.MOVABLECONTENT_DIV).offsetHeight;
                    var tableWidth = this.parent.element.querySelector('.' + cls.MOVABLECONTENT_DIV + ' .' + cls.TABLE).offsetWidth;
                    var contentWidth = this.parent.element.querySelector('.' + cls.MOVABLECONTENT_DIV).offsetWidth;
                    var horizontalOverflow = contentWidth < tableWidth;
                    //let verticalOverflow: boolean = contentHeight < tableHeight;
                    var commonOverflow = horizontalOverflow && ((gridHeight - tableHeight) < 18) ? true : false;
                    if (gridHeight >= tableHeight && (horizontalOverflow ? gridHeight >= contentHeight : true) &&
                        !commonOverflow) {
                        this.parent.grid.height = 'auto';
                    }
                    else {
                        this.parent.grid.height = gridHeight;
                        this.parent.grid.dataBind();
                    }
                    this.parent.grid.widthService.refreshFrozenScrollbar();
                }
                else {
                    if (gridHeight > (this.engine.valueContent.length * this.gridSettings.rowHeight)) {
                        gridHeight = 'auto';
                    }
                }
            }
            else {
                gridHeight = this.gridSettings.height;
            }
        }
        return gridHeight < this.parent.gridSettings.rowHeight ? this.parent.gridSettings.rowHeight : gridHeight;
    };
    /**
     * It used to frame stacked headers.
     *
     * @returns {ColumnModel[]} - Returns grid columns.
     * @hidden
     */
    Render.prototype.frameStackedHeaders = function () {
        var pivotColumns = this.parent.pivotColumns;
        var gridColumns = this.parent.grid['columnModel'];
        var autoFitApplied = false;
        var refreshColumn = this.parent.toolbarModule && this.parent.toolbarModule.isReportChange ? true : this.parent.actionObj ? ((this.parent.actionObj.actionName === 'Sort value' && this.parent.engineModule.valueAxis === 1) ||
            (this.parent.actionObj.actionName === 'Sort field' && this.parent.actionObj.fieldInfo.axis === 'columns') ||
            (this.parent.pivotFieldListModule && this.parent.pivotFieldListModule.actionObj.actionName === 'Sort field' && this.parent.pivotFieldListModule.actionObj.fieldInfo.axis === 'columns')) : false;
        var singleValueFormat = this.parent.dataSourceSettings.values.length === 1 &&
            !this.parent.dataSourceSettings.alwaysShowValueHeader ?
            this.formatList[this.parent.dataSourceSettings.values[0].name] : undefined;
        this.pivotColumns = [];
        if ((((this.parent.dataType === 'olap' && this.parent.dataSourceSettings.url !== '') ? true : (this.parent.dataSourceSettings.values.length > 0 && this.parent.dataSourceSettings.dataSource && this.parent.engineModule.data.length > 0)) ||
            (this.parent.dataSourceSettings.mode === 'Server' && this.parent.dataSourceSettings.url !== '' && this.engine.pivotValues.length > 0)) && !this.engine.isEmptyData) {
            var headerCnt = this.engine.headerContent.length;
            var headerSplit = [];
            var splitPos = [];
            var colWidth = this.calculateColWidth(this.engine.pivotValues ? this.engine.pivotValues[0].length : 0);
            do {
                var columnModel = [];
                var actualCnt = 0;
                headerCnt--;
                var colField = this.engine.headerContent[headerCnt];
                var colCount = colField ? Object.keys(colField).length : 0;
                if (colField) {
                    for (var cCnt = 0; cCnt < Object.keys(colField).length + (colField[0] ? 0 : 1); cCnt++) {
                        var colSpan = (colField[cCnt] && colField[cCnt].colSpan) ?
                            ((colField[cCnt].memberType !== 3 || headerCnt === 0) ?
                                colField[cCnt].colSpan : headerSplit[cCnt]) : 1;
                        colSpan = this.parent.dataType === 'olap' && isNullOrUndefined(colSpan) ? 1 : colSpan;
                        var formattedText = colField[cCnt] ? (colField[cCnt].type === 'grand sum' ?
                            (isNullOrUndefined(colField[cCnt].valueSort.axis) ? this.parent.localeObj.getConstant('grandTotal') :
                                colField[cCnt].formattedText) : (colField[cCnt].type === 'sum' ?
                            colField[cCnt].formattedText.split('Total')[0] + this.parent.localeObj.getConstant('total') :
                            colField[cCnt].formattedText)) : '';
                        formattedText = this.parent.enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(formattedText) : formattedText;
                        if (headerCnt === this.engine.headerContent.length - 1) {
                            colSpan = 1;
                            autoFitApplied = pivotColumns.length - 1 !== colCount ? false : (!refreshColumn && !this.parent.isEmptyGrid
                                && pivotColumns[actualCnt] && pivotColumns[actualCnt].autoFit);
                            columnModel[actualCnt] = {
                                field: (cCnt + '.formattedText'),
                                headerText: formattedText,
                                customAttributes: { 'cell': colField[cCnt] },
                                width: autoFitApplied ? gridColumns[actualCnt].width : colField[cCnt]
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any, max-len
                                    ? colField[cCnt].valueSort ? this.setSavedWidth(colField[cCnt].valueSort.levelName, colWidth) : this.resColWidth
                                    : this.resColWidth,
                                minWidth: autoFitApplied && actualCnt === colCount
                                    ? gridColumns[gridColumns.length - 1].minWidth : 30,
                                format: cCnt === 0 ? '' : (isNullOrUndefined(singleValueFormat) ? this.formatList[colField[cCnt].actualText] : singleValueFormat),
                                allowReordering: (this.parent.showGroupingBar ? false : this.parent.gridSettings.allowReordering),
                                allowResizing: this.parent.gridSettings.allowResizing,
                                visible: true,
                                textAlign: this.parent.enableRtl ? 'Left' : 'Right',
                                headerTextAlign: this.parent.enableRtl ? 'Right' : 'Left'
                            };
                        }
                        else if (headerSplit[cCnt]) {
                            // colSpan = (colField[cCnt as number] && colField[cCnt as number].type === 'grand sum' &&
                            //     colField[cCnt as number].memberType === 2) ? 1 : colSpan;
                            var tmpSpan = colSpan;
                            var innerModel = [];
                            var innerPos = cCnt;
                            while (tmpSpan > 0) {
                                if (columnModel[actualCnt]) {
                                    if (!this.pivotColumns[splitPos[innerPos]]) {
                                        break;
                                    }
                                    innerModel.push(this.pivotColumns[splitPos[innerPos]]);
                                }
                                else {
                                    columnModel[actualCnt] = {
                                        headerText: formattedText,
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        field: colField[cCnt] ? colField[cCnt].valueSort.levelName : '',
                                        customAttributes: { 'cell': colField[cCnt] },
                                        width: (autoFitApplied && actualCnt === 0 && !refreshColumn && !this.parent.isEmptyGrid
                                            && pivotColumns[0].autoFit) ? gridColumns[0].width : colField[cCnt] ?
                                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                            this.setSavedWidth(colField[cCnt].valueSort.levelName, colWidth)
                                            : this.resColWidth,
                                        minWidth: 30,
                                        allowReordering: (this.parent.showGroupingBar ? false : this.parent.gridSettings.allowReordering),
                                        allowResizing: this.parent.gridSettings.allowResizing,
                                        visible: true
                                    };
                                    innerModel = [this.pivotColumns[splitPos[innerPos]]];
                                }
                                this.isAutoFitEnabled = this.isAutoFitEnabled ? true : autoFitApplied;
                                tmpSpan = tmpSpan - headerSplit[innerPos];
                                innerPos = innerPos + headerSplit[innerPos];
                            }
                            columnModel[actualCnt].columns = innerModel;
                        }
                        if (columnModel[actualCnt]) {
                            columnModel[actualCnt].clipMode = this.gridSettings.clipMode;
                        }
                        headerSplit[cCnt] = colSpan;
                        splitPos[cCnt] = actualCnt;
                        actualCnt++;
                        cCnt = cCnt + colSpan - 1;
                    }
                }
                this.pivotColumns = columnModel.length > 0 ? columnModel : this.pivotColumns;
            } while (headerCnt > 0);
            this.pivotColumns[0] = {
                field: (0 + '.formattedText'),
                width: (autoFitApplied && !refreshColumn && !this.parent.isEmptyGrid && pivotColumns[0].autoFit)
                    ? gridColumns[0].width : this.resColWidth,
                minWidth: 30,
                headerText: '',
                allowReordering: false,
                allowResizing: this.parent.gridSettings.allowResizing,
                visible: true,
                clipMode: this.parent.gridSettings.clipMode
            };
        }
        else {
            this.pivotColumns = this.frameEmptyColumns();
        }
        if (this.parent.toolbarModule && this.parent.showToolbar) {
            this.parent.toolbarModule.isReportChange = false;
        }
        this.parent.triggerColumnRenderEvent(this.pivotColumns);
        autoFitApplied = this.parent.pivotColumns.length > 0 && this.parent.pivotColumns[this.parent.pivotColumns.length - 1].autoFit;
        if (this.pivotColumns.length > 1 && !autoFitApplied) {
            var lastColumn = this.pivotColumns[this.pivotColumns.length - 1];
            lastColumn.minWidth = lastColumn.width;
            lastColumn.width = 'auto';
            if (lastColumn.columns && lastColumn.columns.length > 0) {
                this.configLastColumnWidth(lastColumn.columns[lastColumn.columns.length - 1]);
            }
        }
        return this.pivotColumns;
    };
    Render.prototype.configLastColumnWidth = function (column) {
        column.minWidth = column.width;
        column.width = 'auto';
        if (column.columns && column.columns.length > 0) {
            this.configLastColumnWidth(column.columns[column.columns.length - 1]);
        }
    };
    /** @hidden */
    Render.prototype.setSavedWidth = function (column, width) {
        if (column === '0.formattedText' && !isNullOrUndefined(this.parent.resizedValue)) {
            width = this.parent.resizedValue;
        }
        else {
            width = this.parent.resizeInfo[column] ? this.parent.resizeInfo[column] : width;
        }
        return width;
    };
    /** @hidden */
    Render.prototype.frameEmptyColumns = function () {
        var columns = [];
        var colWidth = this.calculateColWidth(2);
        columns.push({ field: '0.formattedText', headerText: '', minWidth: 30, width: this.resColWidth });
        columns.push({ field: '1.formattedText', headerText: this.parent.localeObj.getConstant('grandTotal'), minWidth: 30, width: colWidth });
        return columns;
    };
    /** @hidden */
    Render.prototype.getFormatList = function () {
        var formatArray = {};
        for (var vCnt = 0; vCnt < this.parent.dataSourceSettings.values.length; vCnt++) {
            var field = this.parent.dataSourceSettings.values[vCnt];
            var format = 'N';
            if (this.parent.dataType === 'olap') {
                if (this.parent.olapEngineModule.fieldList[field.name] &&
                    !isNullOrUndefined(this.parent.olapEngineModule.fieldList[field.name].formatString)) {
                    var fString = this.parent.olapEngineModule.fieldList[field.name].formatString;
                    format = fString.indexOf('#') > -1 ? fString : (fString[0] + '2');
                }
            }
            else {
                if ((['PercentageOfDifferenceFrom', 'PercentageOfRowTotal', 'PercentageOfColumnTotal', 'PercentageOfGrandTotal', 'PercentageOfParentRowTotal', 'PercentageOfParentColumnTotal', 'PercentageOfParentTotal']).indexOf(field.type) > -1) {
                    format = 'P2';
                }
                else if (['PopulationStDev', 'SampleStDev', 'PopulationVar', 'SampleVar', 'Index'].indexOf(field.type) > -1) {
                    format = undefined;
                }
                if (this.parent.dataSourceSettings.formatSettings.length > 0) {
                    for (var fCnt = 0; fCnt < this.parent.dataSourceSettings.formatSettings.length; fCnt++) {
                        var formatSettings = this.parent.dataSourceSettings.formatSettings[fCnt];
                        if (field.name === formatSettings.name) {
                            format = formatSettings.format;
                            break;
                        }
                        else {
                            continue;
                        }
                    }
                }
            }
            formatArray[field.name] = format;
        }
        return formatArray;
    };
    Render.prototype.getValidHeader = function (args, axis) {
        var values = this.parent.dataSourceSettings.values;
        if (axis === 'row') {
            var cellInfo = args;
            if (this.parent.dataSourceSettings.rows.length === 0 || this.parent.dataSourceSettings.columns.length === 0) {
                if (this.parent.dataSourceSettings.rows.length === 0 && this.parent.dataSourceSettings.valueAxis === 'row' && (this.parent.localeObj.getConstant('grandTotal') +
                    this.parent.dataSourceSettings.valueSortSettings.headerDelimiter + cellInfo.value)
                    === cellInfo.data[0].valueSort.levelName) {
                    return this.parent.localeObj.getConstant('total') + ' ' + this.parent.localeObj.getConstant(this.parent.engineModule.fieldList[cellInfo.value.toString()].aggregateType)
                        + ' ' + this.parent.localeObj.getConstant('of') + ' ' + cellInfo.value.toString();
                }
                else if (values.length === 1 && this.parent.dataSourceSettings.rows.length === 0) {
                    return this.parent.localeObj.getConstant('total') + ' ' + this.parent.localeObj.getConstant(values[values.length - 1].type)
                        + ' ' + this.parent.localeObj.getConstant('of') + ' ' + (!isNullOrUndefined(values[values.length - 1].caption) ? values[values.length - 1].caption : values[values.length - 1].name);
                }
            }
            return cellInfo.value;
        }
        else if (axis === 'column') {
            var cellInfo = args;
            if (this.parent.dataSourceSettings.rows.length === 0 || this.parent.dataSourceSettings.columns.length === 0) {
                if (!isNullOrUndefined(args.gridCell.column.customAttributes) && this.parent.dataSourceSettings.columns.length === 0 && this.parent.dataSourceSettings.valueAxis === 'column' && // eslint-disable-line @typescript-eslint/no-explicit-any
                    (this.parent.localeObj.getConstant('grandTotal') + this.parent.dataSourceSettings.valueSortSettings.headerDelimiter + cellInfo.gridCell.column.customAttributes.cell.formattedText) // eslint-disable-line @typescript-eslint/no-explicit-any
                        === cellInfo.gridCell.column.customAttributes.cell.valueSort.levelName) { // eslint-disable-line @typescript-eslint/no-explicit-any
                    return this.parent.localeObj.getConstant('total') + ' ' + this.parent.localeObj.getConstant(this.parent.engineModule.fieldList[cellInfo
                        .gridCell.column.customAttributes.cell.actualText].aggregateType) + ' ' + this.parent.localeObj.getConstant('of') + ' ' + cellInfo.gridCell.column.customAttributes.cell.formattedText; // eslint-disable-line @typescript-eslint/no-explicit-any
                }
            }
            return (cellInfo.cell).value; // eslint-disable-line @typescript-eslint/no-explicit-any
        }
    };
    Render.prototype.excelColumnEvent = function (args) {
        if (this.parent.dataSourceSettings.columns.length === 0 && this.parent.dataSourceSettings.valueAxis === 'column') {
            (args.cell).value = this.getValidHeader(args, 'column'); // eslint-disable-line @typescript-eslint/no-explicit-any
        }
        if (args.gridCell !== undefined && args.gridCell.column.width === 'auto') { // eslint-disable-line @typescript-eslint/no-explicit-any
            this.parent.lastColumn = args.gridCell.column; // eslint-disable-line @typescript-eslint/no-explicit-any
            args.gridCell.column.width = args.gridCell.column.minWidth; // eslint-disable-line @typescript-eslint/no-explicit-any
        }
        args = this.exportHeaderEvent(args);
        this.parent.trigger(events.excelHeaderQueryCellInfo, args);
    };
    Render.prototype.pdfColumnEvent = function (args) {
        if (this.parent.dataSourceSettings.columns.length === 0 && this.parent.dataSourceSettings.valueAxis === 'column') {
            (args.cell).value = this.getValidHeader(args, 'column'); // eslint-disable-line @typescript-eslint/no-explicit-any
        }
        if (args.gridCell !== undefined && args.gridCell.column.width === 'auto') { // eslint-disable-line @typescript-eslint/no-explicit-any
            this.parent.lastColumn = args.gridCell.column; // eslint-disable-line @typescript-eslint/no-explicit-any
            args.gridCell.column.width = args.gridCell.column.minWidth; // eslint-disable-line @typescript-eslint/no-explicit-any
        }
        this.parent.trigger(events.pdfHeaderQueryCellInfo, args);
    };
    Render.prototype.excelRowEvent = function (args) {
        if (args.column.field === '0.formattedText') {
            var cell = args.data[0];
            var isValueCell = cell.type && cell.type === 'value';
            var level = 0;
            if (this.parent.dataType === 'olap') {
                level = this.indentCollection[cell.rowIndex];
            }
            else {
                var levelName = cell.valueSort ? cell.valueSort.levelName.toString() : '';
                var memberPos = cell.actualText ?
                    cell.actualText.toString().split(this.parent.dataSourceSettings.valueSortSettings.headerDelimiter).length : 0;
                var levelPosition = levelName.split(this.parent.dataSourceSettings.valueSortSettings.headerDelimiter).length -
                    (memberPos ? memberPos - 1 : memberPos);
                level = levelPosition ? (levelPosition - 1) : 0;
            }
            this.colPos = 0;
            args.style = { hAlign: 'Left', indent: level * 2 };
            this.lastSpan = isValueCell ? this.lastSpan : level;
        }
        else {
            this.colPos++;
            var pivotValue = args.data[args.column.customAttributes.cell ? args.column.customAttributes.cell.colIndex : this.colPos]; // eslint-disable-line @typescript-eslint/no-explicit-any
            if (isNullOrUndefined(pivotValue.value) || isNullOrUndefined(pivotValue.formattedText) || pivotValue.formattedText === '') {
                args.value = this.parent.exportType === 'Excel' ? null : '';
            }
            else {
                var aggMatrix = this.parent.dataType === 'pivot' && this.parent.engineModule ? this.parent.engineModule.aggregatedValueMatrix : undefined;
                if (aggMatrix && aggMatrix[pivotValue.rowIndex] && aggMatrix[pivotValue.rowIndex][pivotValue.colIndex]) {
                    args.value = aggMatrix[pivotValue.rowIndex][pivotValue.colIndex];
                }
                else {
                    args.value = !isNullOrUndefined(pivotValue.value) ? (pivotValue.formattedText === '#DIV/0!' ? pivotValue.formattedText : pivotValue.value) : pivotValue.formattedText;
                }
            }
        }
        args = this.exportContentEvent(args);
        if (this.parent.dataSourceSettings.rows.length === 0 && this.parent.dataSourceSettings.valueAxis === 'row') {
            args.value = args.column.field === '0.formattedText' ? this.getValidHeader(args, 'row') : args.value;
        }
        this.parent.trigger(events.excelQueryCellInfo, args);
    };
    Render.prototype.pdfRowEvent = function (args) {
        args = this.exportContentEvent(args);
        if (args.column.field === '0.formattedText') {
            var level = 0;
            var cell = args.data[0];
            var isValueCell = cell.type && cell.type === 'value';
            if (this.parent.dataType === 'olap') {
                level = this.indentCollection[cell.rowIndex];
            }
            else {
                var levelName = cell.valueSort ? cell.valueSort.levelName.toString() : '';
                var memberPos = cell.actualText ?
                    cell.actualText.toString().split(this.parent.dataSourceSettings.valueSortSettings.headerDelimiter).length : 0;
                var levelPosition = levelName.split(this.parent.dataSourceSettings.valueSortSettings.headerDelimiter).length -
                    (memberPos ? memberPos - 1 : memberPos);
                level = levelPosition ? (levelPosition - 1) : 0;
            }
            args.style = { paragraphIndent: level * 10 };
            this.lastSpan = isValueCell ? this.lastSpan : level;
            if (this.parent.dataSourceSettings.rows.length === 0 && this.parent.dataSourceSettings.valueAxis === 'row') {
                args.value = this.getValidHeader(args, 'row');
            }
        }
        this.parent.trigger(events.pdfQueryCellInfo, args);
    };
    /* eslint-disable @typescript-eslint/no-explicit-any */
    Render.prototype.excelDataBound = function (args) {
        var excelRows = args.excelRows;
        var rowStartPos = Object.keys(this.engine.headerContent).length;
        for (var i = 0; i < rowStartPos; i++) {
            var cells = excelRows[i].cells;
            var tmpCell = [];
            for (var j = 0; j < cells.length; j++) {
                if (cells[j].rowSpan !== -1) {
                    tmpCell.push(cells[j]);
                }
            }
            excelRows[i].cells = tmpCell;
        }
    };
    Render.prototype.exportHeaderEvent = function (args) {
        var rowSpan = 1;
        if (args.gridCell.column.customAttributes) {
            var cell = args.gridCell.column.customAttributes.cell;
            // if (this.actualText !== cell.actualText && cell.colSpan > 1 && cell.level > -1) {
            //     ((args as any).gridCell as any).colSpan = (args.cell as any).colSpan = cell.colSpan > -1 ? cell.colSpan : 1;
            // }
            rowSpan = cell.rowSpan > -1 ? cell.rowSpan : 1;
            if (args.name === 'excelHeaderQueryCellInfo') {
                if (cell.rowSpan > -1) {
                    rowSpan = cell.rowSpan;
                }
                else if (!isNullOrUndefined(cell.type) && cell.level !== 0) {
                    rowSpan = -1;
                    args.cell.rowSpan = -1;
                }
            }
            this.actualText = cell.actualText;
        }
        else {
            rowSpan = Object.keys(this.engine.headerContent).length;
        }
        if (args.cell.rowSpan !== rowSpan && rowSpan > -1) {
            args.cell.rowSpan = rowSpan;
        }
        return args;
    };
    /* eslint-enable @typescript-eslint/no-explicit-any */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Render.prototype.exportContentEvent = function (args) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var cell = args.data[Number(args.column.field.split('.formattedText')[0])];
        args.value = cell.type === 'grand sum' ? (isNullOrUndefined(cell.valueSort.axis) ?
            this.parent.localeObj.getConstant('grandTotal') : cell.formattedText) : args.value;
        return args;
    };
    Render.prototype.unWireEvents = function (cell) {
        if (cell.querySelector('.e-hyperlinkcell')) {
            EventHandler.remove(cell.querySelector('.e-hyperlinkcell'), this.parent.isAdaptive ? 'touchend' : 'click', this.onHyperCellClick);
        }
        else {
            return;
        }
    };
    Render.prototype.wireEvents = function (cell) {
        if (cell.querySelector('.e-hyperlinkcell')) {
            EventHandler.add(cell.querySelector('.e-hyperlinkcell'), this.parent.isAdaptive ? 'touchend' : 'click', this.onHyperCellClick, this);
        }
        else {
            return;
        }
    };
    return Render;
}());
export { Render };
