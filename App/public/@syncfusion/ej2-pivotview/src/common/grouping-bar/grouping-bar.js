import { createElement, remove, Droppable, setStyleAttribute, removeClass, select, selectAll } from '@syncfusion/ej2-base';
import { EventHandler, Touch, closest, isNullOrUndefined } from '@syncfusion/ej2-base';
import { addClass, formatUnit } from '@syncfusion/ej2-base';
import * as events from '../../common/base/constant';
import * as cls from '../../common/base/css-constant';
import { AxisFields } from './axis-field-renderer';
import { Toolbar } from '@syncfusion/ej2-navigations';
/**
 * Module for GroupingBar rendering
 */
/** @hidden */
var GroupingBar = /** @class */ (function () {
    /** Constructor for GroupingBar module */
    function GroupingBar(parent) {
        /* eslint-enable */
        this.parent = parent;
        this.parent.groupingBarModule = this;
        this.resColWidth = (this.parent.isAdaptive ? 180 : 249);
        this.addEventListener();
        this.parent.axisFieldModule = new AxisFields(this.parent);
        this.touchObj = new Touch(this.parent.element, {
            tapHold: this.tapHoldHandler.bind(this)
        });
    }
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} - Module name.
     * @private
     */
    GroupingBar.prototype.getModuleName = function () {
        return 'groupingBar';
    };
    /* eslint-disable-next-line */
    /** @hidden */
    GroupingBar.prototype.renderLayout = function () {
        this.groupingTable = createElement('div', { className: cls.GROUPING_BAR_CLASS });
        this.leftAxisPanel = createElement('div', { className: cls.LEFT_AXIS_PANEL_CLASS });
        this.rightAxisPanel = createElement('div', { className: cls.RIGHT_AXIS_PANEL_CLASS });
        var rowAxisPanel = createElement('div', { className: cls.AXIS_ROW_CLASS + ' ' + cls.AXIS_ICON_CLASS + 'container' });
        var columnAxisPanel = createElement('div', {
            className: cls.AXIS_COLUMN_CLASS + ' ' + cls.AXIS_ICON_CLASS + 'container'
        });
        var valueAxisPanel = createElement('div', {
            className: cls.AXIS_VALUE_CLASS + ' ' + cls.AXIS_ICON_CLASS + 'container'
        });
        var filterAxisPanel = createElement('div', {
            className: cls.AXIS_FILTER_CLASS + ' ' + cls.AXIS_ICON_CLASS + 'container'
        });
        this.rowPanel = createElement('div', { className: cls.GROUP_ROW_CLASS + ' ' + cls.ROW_AXIS_CLASS });
        this.columnPanel = createElement('div', { className: cls.GROUP_COLUMN_CLASS + ' ' + cls.COLUMN_AXIS_CLASS });
        this.valuePanel = createElement('div', { className: cls.GROUP_VALUE_CLASS + ' ' + cls.VALUE_AXIS_CLASS });
        this.filterPanel = createElement('div', { className: cls.GROUP_FILTER_CLASS + ' ' + cls.FILTER_AXIS_CLASS });
        rowAxisPanel.appendChild(this.rowPanel);
        columnAxisPanel.appendChild(this.columnPanel);
        valueAxisPanel.appendChild(this.valuePanel);
        filterAxisPanel.appendChild(this.filterPanel);
        this.rowAxisPanel = rowAxisPanel;
        this.columnAxisPanel = columnAxisPanel;
        this.valueAxisPanel = valueAxisPanel;
        this.filterAxisPanel = filterAxisPanel;
        this.leftAxisPanel.appendChild(valueAxisPanel);
        this.leftAxisPanel.appendChild(rowAxisPanel);
        this.rightAxisPanel.appendChild(filterAxisPanel);
        this.rightAxisPanel.appendChild(columnAxisPanel);
        this.groupingTable.appendChild(createElement('div', { styles: 'display:flex;' }));
        this.groupingTable.firstElementChild.appendChild(this.leftAxisPanel);
        this.groupingTable.firstElementChild.appendChild(this.rightAxisPanel);
        if (this.parent.dataType === 'pivot' && this.parent.groupingBarSettings != null && this.parent.groupingBarSettings.showFieldsPanel) {
            this.gridPanel = this.createToolbarUI(this.groupingTable);
        }
        this.groupingTable.classList.add(cls.GRID_GROUPING_BAR_CLASS);
        this.groupingTable.querySelector('.' + cls.GROUP_ROW_CLASS).classList.add(cls.GROUP_PIVOT_ROW);
        var axisPanels = [this.rowPanel, this.columnPanel, this.valuePanel, this.filterPanel];
        for (var _i = 0, axisPanels_1 = axisPanels; _i < axisPanels_1.length; _i++) {
            var element = axisPanels_1[_i];
            if (this.parent.groupingBarSettings.allowDragAndDrop) {
                new Droppable(element, {});
            }
            this.unWireEvent(element);
            this.wireEvent(element);
        }
        if (this.parent.displayOption.view !== 'Table' && this.parent.groupingBarSettings.displayMode !== 'Table') {
            this.groupingChartTable = this.groupingTable.cloneNode(true);
            if (select('#' + this.parent.element.id + '_AllFields', this.groupingChartTable)) {
                select('#' + this.parent.element.id + '_AllFields', this.groupingChartTable).remove();
                this.chartPanel = this.createToolbarUI(this.groupingChartTable);
            }
            this.groupingChartTable.classList.add(cls.CHART_GROUPING_BAR_CLASS);
            this.groupingChartTable.classList.remove(cls.GRID_GROUPING_BAR_CLASS);
            this.groupingChartTable.querySelector('.' + cls.GROUP_ROW_CLASS).classList.add(cls.GROUP_CHART_ROW);
            this.groupingChartTable.querySelector('.' + cls.GROUP_ROW_CLASS).classList.remove(cls.GROUP_PIVOT_ROW);
            if (this.parent.chartSettings.enableMultipleAxis && this.parent.chartSettings.chartSeries &&
                ['Pie', 'Pyramid', 'Doughnut', 'Funnel'].indexOf(this.parent.chartSettings.chartSeries.type) < 0) {
                this.groupingChartTable.querySelector('.' + cls.GROUP_VALUE_CLASS).classList.add(cls.GROUP_CHART_MULTI_VALUE);
            }
            else {
                this.groupingChartTable.querySelector('.' + cls.GROUP_VALUE_CLASS).classList.add(cls.GROUP_CHART_VALUE);
            }
            if (this.parent.chartSettings.chartSeries &&
                ['Pie', 'Pyramid', 'Doughnut', 'Funnel'].indexOf(this.parent.chartSettings.chartSeries.type) > -1) {
                this.groupingChartTable.querySelector('.' + cls.GROUP_COLUMN_CLASS).classList.add(cls.GROUP_CHART_COLUMN);
            }
            else {
                this.groupingChartTable.querySelector('.' + cls.GROUP_COLUMN_CLASS).classList.add(cls.GROUP_CHART_ACCUMULATION_COLUMN);
            }
            this.groupingChartTable.querySelector('.' + cls.GROUP_FILTER_CLASS).classList.add(cls.GROUP_CHART_FILTER);
        }
        else {
            this.groupingChartTable = undefined;
        }
        if (this.parent.displayOption.view === 'Chart' || this.parent.groupingBarSettings.displayMode === 'Chart') {
            this.groupingTable = undefined;
        }
    };
    /* eslint-disable  */
    GroupingBar.prototype.appendToElement = function () {
        if (this.parent.element.querySelector('.' + cls.GRID_CLASS) || this.parent.element.querySelector('.' + cls.PIVOTCHART)) {
            if (this.parent.showGroupingBar) {
                if (this.parent.element.querySelector('.' + cls.GROUPING_BAR_CLASS)) {
                    for (var _i = 0, _a = this.parent.element.querySelectorAll('.' + cls.GROUPING_BAR_CLASS); _i < _a.length; _i++) {
                        var element = _a[_i];
                        remove(element);
                    }
                }
                if (this.groupingChartTable) {
                    if (select('#' + this.parent.element.id + '_chart', this.parent.element)) {
                        setStyleAttribute(this.groupingChartTable, {
                            width: formatUnit(this.parent.grid ? this.parent.getGridWidthAsNumber() : this.parent.getWidthAsNumber())
                        });
                        this.parent.element.insertBefore(this.groupingChartTable, select('#' + this.parent.element.id + '_chart', this.parent.element));
                        if (this.groupingChartTable.querySelector('.' + cls.ALL_FIELDS_PANEL_CLASS) && this.chartPanel != null && !this.chartPanel.isDestroyed) {
                            var chartPanelWidth = this.parent.grid ? (this.parent.getGridWidthAsNumber() - 2) : (this.parent.getWidthAsNumber() - 2);
                            this.chartPanel.width = chartPanelWidth < 400 ? '398px' : chartPanelWidth;
                            this.chartPanel.refreshOverflow();
                            if (this.parent.showFieldList && this.parent.pivotFieldListModule && this.parent.pivotFieldListModule.element) {
                                clearTimeout(this.timeOutObj);
                                this.timeOutObj = setTimeout(this.alignIcon.bind(this));
                            }
                        }
                    }
                    else {
                        this.groupingChartTable = undefined;
                    }
                }
                if (this.parent.displayOption.view !== 'Chart' && this.groupingTable) {
                    if (this.parent.isAdaptive) {
                        this.leftAxisPanel.style.minWidth = '180px';
                        this.valuePanel.style.minWidth = '180px';
                    }
                    if (this.parent.firstColWidth) {
                        this.leftAxisPanel.style.minWidth = 'auto';
                        this.valuePanel.style.minWidth = 'auto';
                    }
                    this.filterPanel.removeAttribute('style');
                    this.columnPanel.removeAttribute('style');
                    this.rowPanel.removeAttribute('style');
                    this.filterPanel.removeAttribute('style');
                    var emptyRowCount = void 0;
                    if (this.parent.dataType === 'olap') {
                        emptyRowCount = this.parent.olapEngineModule.headerContent ?
                            Object.keys(this.parent.olapEngineModule.headerContent).length : 0;
                    }
                    else {
                        emptyRowCount = this.parent.engineModule.headerContent ?
                            Object.keys(this.parent.engineModule.headerContent).length : 0;
                    }
                    if (!isNullOrUndefined(emptyRowCount)) {
                        var emptyHeader = this.parent.element.querySelector('.e-frozenheader').querySelector('.e-columnheader');
                        emptyHeader.removeAttribute('style');
                        addClass([emptyHeader.querySelector('.e-headercell')], 'e-group-row');
                        emptyHeader.querySelector('.e-group-row').appendChild(this.rowAxisPanel);
                        emptyHeader.querySelector('.e-group-row').querySelector('.e-headercelldiv').style.display = 'none';
                        emptyHeader.querySelector('.e-group-row').querySelector('.e-sortfilterdiv').style.display = 'none';
                    }
                    this.parent.element.insertBefore(this.groupingTable, this.parent.element.querySelector('.' + cls.GRID_CLASS));
                    setStyleAttribute(this.groupingTable, {
                        width: formatUnit(this.parent.grid ? this.parent.getGridWidthAsNumber() : this.parent.getWidthAsNumber())
                    });
                    if (this.groupingTable && this.groupingTable.querySelector('.' + cls.ALL_FIELDS_PANEL_CLASS) && this.gridPanel != null && !this.gridPanel.isDestroyed) {
                        var gridPanelWidth = this.parent.grid ? (this.parent.getGridWidthAsNumber() - 2) : (this.parent.getWidthAsNumber() - 2);
                        this.gridPanel.width = gridPanelWidth < 400 ? '398px' : gridPanelWidth;
                        this.gridPanel.refreshOverflow();
                    }
                    this.groupingTable.style.minWidth = '400px';
                    this.parent.axisFieldModule.render();
                    this.setGridRowWidth();
                    var colGroupElement = this.parent.element.querySelector('.e-frozenheader').querySelector('colgroup').children[0];
                    var rightAxisPanelWidth = formatUnit(this.groupingTable.offsetWidth - parseInt(colGroupElement.style.width, 10));
                    setStyleAttribute(this.valuePanel, { width: colGroupElement.style.width });
                    setStyleAttribute(this.rightAxisPanel, { width: rightAxisPanelWidth });
                    var rightPanelHeight = (this.valuePanel.offsetHeight / 2);
                    if (rightPanelHeight > this.columnPanel.offsetHeight) {
                        setStyleAttribute(this.filterPanel, { height: formatUnit(rightPanelHeight) });
                        setStyleAttribute(this.columnPanel, { height: formatUnit(rightPanelHeight + 2) });
                    }
                    var topLeftHeight = this.parent.element.querySelector('.e-headercontent').offsetHeight;
                    setStyleAttribute(this.rowPanel, {
                        height: topLeftHeight + 'px'
                    });
                    if (this.parent.element.querySelector('.e-frozenheader').querySelector('.e-rhandler')) {
                        this.parent.element.querySelector('.e-frozenheader').querySelector('.e-rhandler').style.height =
                            topLeftHeight + 'px';
                    }
                    var colRows = [].slice.call(this.parent.element.querySelector('.e-movableheader').querySelector('thead').querySelectorAll('tr'));
                    var columnRows = colRows.filter(function (trCell) {
                        return (trCell.childNodes.length > 0);
                    });
                    var colHeight = topLeftHeight / columnRows.length;
                    for (var _b = 0, columnRows_1 = columnRows; _b < columnRows_1.length; _b++) {
                        var element = columnRows_1[_b];
                        setStyleAttribute(element, { 'height': colHeight + 'px' });
                        var rowHeader = [].slice.call(element.querySelectorAll('.e-rhandler'));
                        for (var _c = 0, rowHeader_1 = rowHeader; _c < rowHeader_1.length; _c++) {
                            var rhElement = rowHeader_1[_c];
                            setStyleAttribute(rhElement, { 'height': colHeight + 'px' });
                        }
                    }
                }
                else {
                    this.parent.axisFieldModule.render();
                    this.updateChartAxisHeight();
                }
                if (this.parent.showToolbar && this.parent.displayOption.view === 'Both') {
                    if (this.parent.currentView === 'Table') {
                        this.parent.element.querySelector('.e-chart-grouping-bar').style.display = 'none';
                    }
                    else {
                        this.parent.element.querySelector('.e-pivot-grouping-bar').style.display = 'none';
                    }
                }
            }
        }
    };
    GroupingBar.prototype.updateChartAxisHeight = function () {
        if (this.groupingChartTable && select('#' + this.parent.element.id + '_chart', this.parent.element)) {
            var rowPanel = this.groupingChartTable.querySelector('.' + cls.GROUP_ROW_CLASS);
            var valuePanel = this.groupingChartTable.querySelector('.' + cls.GROUP_VALUE_CLASS);
            var filterPanel = this.groupingChartTable.querySelector('.' + cls.GROUP_FILTER_CLASS);
            var columnPanel = this.groupingChartTable.querySelector('.' + cls.GROUP_COLUMN_CLASS);
            if (rowPanel && columnPanel) {
                rowPanel.style.height = 'auto';
                columnPanel.style.height = 'auto';
                if (rowPanel.offsetHeight > 0 && columnPanel.offsetHeight > 0) {
                    var maxHeight = rowPanel.offsetHeight > columnPanel.offsetHeight ? rowPanel.offsetHeight : columnPanel.offsetHeight;
                    setStyleAttribute(rowPanel, { height: formatUnit(maxHeight) });
                    setStyleAttribute(columnPanel, { height: formatUnit(maxHeight) });
                }
            }
            if (valuePanel && filterPanel) {
                valuePanel.style.height = 'auto';
                filterPanel.style.height = 'auto';
                if (valuePanel.offsetHeight > 0 && filterPanel.offsetHeight > 0) {
                    var maxHeight = valuePanel.offsetHeight > filterPanel.offsetHeight ? valuePanel.offsetHeight : filterPanel.offsetHeight;
                    setStyleAttribute(valuePanel, { height: formatUnit(maxHeight) });
                    setStyleAttribute(filterPanel, { height: formatUnit(maxHeight) });
                }
            }
        }
    };
    /**
     * @hidden
     */
    GroupingBar.prototype.refreshUI = function () {
        if (this.groupingChartTable) {
            setStyleAttribute(this.groupingChartTable, {
                width: formatUnit(this.parent.grid ? this.parent.getGridWidthAsNumber() : this.parent.getWidthAsNumber())
            });
            if (this.groupingChartTable.querySelector('.' + cls.ALL_FIELDS_PANEL_CLASS) && this.chartPanel != null && !this.chartPanel.isDestroyed) {
                var chartPanelWidth = this.parent.grid ? (this.parent.getGridWidthAsNumber() - 2) : (this.parent.getWidthAsNumber() - 2);
                this.chartPanel.width = chartPanelWidth < 400 ? '398px' : chartPanelWidth;
                this.chartPanel.refreshOverflow();
            }
            this.updateChartAxisHeight();
            if (this.parent.showFieldList && this.parent.pivotFieldListModule && this.parent.pivotFieldListModule.element) {
                clearTimeout(this.timeOutObj);
                this.timeOutObj = setTimeout(this.alignIcon.bind(this));
            }
        }
        if (this.groupingTable) {
            setStyleAttribute(this.groupingTable, {
                width: formatUnit(this.parent.grid ? this.parent.getGridWidthAsNumber() : this.parent.getWidthAsNumber())
            });
            if (this.groupingTable && this.groupingTable.querySelector('.' + cls.ALL_FIELDS_PANEL_CLASS) && this.gridPanel != null && !this.gridPanel.isDestroyed) {
                var gridPanelWidth = this.parent.grid ? (this.parent.getGridWidthAsNumber() - 2) : (this.parent.getWidthAsNumber() - 2);
                this.gridPanel.width = gridPanelWidth < 400 ? '398px' : gridPanelWidth;
                this.gridPanel.refreshOverflow();
            }
            this.groupingTable.style.minWidth = '400px';
            var colGroupElement = this.parent.element.querySelector('.e-frozenheader').querySelector('colgroup').children[0];
            var rightAxisWidth = formatUnit(this.groupingTable.offsetWidth - parseInt(colGroupElement.style.width, 10));
            setStyleAttribute(this.valuePanel, { width: colGroupElement.style.width });
            setStyleAttribute(this.rightAxisPanel, { width: rightAxisWidth });
            if (this.parent.showFieldList && this.parent.pivotFieldListModule && this.parent.pivotFieldListModule.element) {
                clearTimeout(this.timeOutObj);
                this.timeOutObj = setTimeout(this.alignIcon.bind(this));
            }
            if (!this.parent.grid.element.querySelector('.e-group-row')) {
                var emptyRowHeader = this.parent.element.querySelector('.e-frozenheader').querySelector('.e-columnheader');
                addClass([emptyRowHeader.querySelector('.e-headercell')], 'e-group-row');
                setStyleAttribute(this.rowPanel, {
                    height: this.parent.element.querySelector('.e-headercontent').offsetHeight + 'px'
                });
                emptyRowHeader.querySelector('.e-group-row').appendChild(this.rowAxisPanel);
                setStyleAttribute(emptyRowHeader.querySelector('.e-group-row').querySelector('.e-headercelldiv'), {
                    display: 'none'
                });
                setStyleAttribute(emptyRowHeader.querySelector('.e-group-row').querySelector('.e-sortfilterdiv'), {
                    display: 'none'
                });
                var groupHeight = this.parent.element.querySelector('.e-headercontent').offsetHeight;
                setStyleAttribute(this.rowPanel, {
                    height: groupHeight + 'px'
                });
                if (this.parent.element.querySelector('.e-frozenheader').querySelector('.e-rhandler')) {
                    this.parent.element.querySelector('.e-frozenheader').querySelector('.e-rhandler').style.height =
                        groupHeight + 'px';
                }
                var colRowElements = [].slice.call(this.parent.element.querySelector('.e-movableheader').querySelector('thead').querySelectorAll('tr'));
                var columnRows = colRowElements.filter(function (trCell) {
                    return (trCell.childNodes.length > 0);
                });
                var colHeight = groupHeight / columnRows.length;
                for (var _i = 0, columnRows_2 = columnRows; _i < columnRows_2.length; _i++) {
                    var element = columnRows_2[_i];
                    setStyleAttribute(element, { 'height': colHeight + 'px' });
                    var rowHeader = [].slice.call(element.querySelectorAll('.e-rhandler'));
                    for (var _a = 0, rowHeader_2 = rowHeader; _a < rowHeader_2.length; _a++) {
                        var handlerElement = rowHeader_2[_a];
                        setStyleAttribute(handlerElement, { 'height': colHeight + 'px' });
                    }
                }
            }
        }
    };
    /** @hidden */
    GroupingBar.prototype.alignIcon = function () {
        var element = this.parent.pivotFieldListModule.element;
        var currentWidth;
        if (this.parent.currentView === 'Table') {
            currentWidth = this.parent.grid ? this.parent.grid.element.offsetWidth : currentWidth;
        }
        else {
            currentWidth = this.parent.chart ? this.parent.pivotChartModule.getCalulatedWidth() : currentWidth;
        }
        if (currentWidth) {
            var actWidth = currentWidth < 400 ? 400 : currentWidth;
            setStyleAttribute(element.querySelector('.' + cls.TOGGLE_FIELD_LIST_CLASS), {
                left: formatUnit(this.parent.enableRtl ?
                    -Math.abs((actWidth) -
                        element.querySelector('.' + cls.TOGGLE_FIELD_LIST_CLASS).offsetWidth) :
                    (actWidth) -
                        element.querySelector('.' + cls.TOGGLE_FIELD_LIST_CLASS).offsetWidth),
                top: this.parent.element.querySelector('.' + cls.FIELD_PANEL_SCROLL_CLASS) ? this.parent.element.querySelector('.' + cls.TOGGLE_FIELD_LIST_CLASS).offsetHeight.toString() + 'px' : ""
            });
        }
    };
    /**
     * @hidden
     */
    GroupingBar.prototype.setGridRowWidth = function () {
        var colGroupElement = this.parent.element.querySelector('.e-frozenheader').querySelector('colgroup').children[0];
        if (this.rowPanel.querySelector('.' + cls.PIVOT_BUTTON_CLASS)) {
            if (!this.parent.isAdaptive) {
                var pivotButtons = [].slice.call(this.rowPanel.querySelectorAll('.' + cls.PIVOT_BUTTON_WRAPPER_CLASS));
                var lastButton = pivotButtons[pivotButtons.length - 1];
                var lastButtonWidth = (lastButton.querySelector('.' + cls.PIVOT_BUTTON_CLASS).offsetWidth +
                    lastButton.querySelector('.e-indent-div').offsetWidth + 20);
                var buttonWidth = formatUnit(lastButtonWidth < this.resColWidth ? this.resColWidth : lastButtonWidth);
                var rowHeaderTable = this.parent.element.querySelector('.e-frozenheader').querySelector('table');
                var rowContentTable = this.parent.element.querySelector('.e-frozencontent').querySelector('table');
                var rowContent = this.parent.element.querySelector('.e-frozencontent').querySelector('colgroup').children[0];
                var colwidth = parseInt(buttonWidth, 10);
                var hasPivotColumns = this.parent.pivotColumns.length > 0;
                var gridColumn = this.parent.grid.columns;
                if (gridColumn && gridColumn.length > 0) {
                    gridColumn[0].width = gridColumn[0].autoFit ? gridColumn[0].width : (gridColumn[0].width >= this.resColWidth ?
                        (colwidth > this.resColWidth ? colwidth : this.resColWidth) :
                        (colwidth > this.resColWidth ? colwidth : this.resColWidth));
                }
                var valueColWidth = void 0;
                if (this.parent.dataType === 'olap') {
                    valueColWidth = this.parent.renderModule.calculateColWidth(this.parent.olapEngineModule.pivotValues.length > 0 ?
                        this.parent.olapEngineModule.pivotValues[0].length : 2);
                }
                else {
                    valueColWidth = this.parent.renderModule.calculateColWidth((this.parent.dataSourceSettings.values.length > 0 &&
                        this.parent.engineModule.pivotValues.length > 0) ?
                        this.parent.engineModule.pivotValues[0].length : 2);
                }
                for (var cCnt = 0; cCnt < gridColumn.length; cCnt++) {
                    if (cCnt !== 0) {
                        if (gridColumn[cCnt].columns) {
                            this.setColWidth(this.parent.renderModule.pivotColumns[cCnt].columns, valueColWidth);
                        }
                        else {
                            if (gridColumn[cCnt].width !== 'auto') {
                                /* eslint-disable @typescript-eslint/no-explicit-any */
                                var levelName = gridColumn[cCnt].customAttributes ?
                                    gridColumn[cCnt].customAttributes.cell.valueSort.levelName : '';
                                gridColumn[cCnt].width = (gridColumn[cCnt].autoFit || (hasPivotColumns && this.parent.pivotColumns[cCnt].autoFit)) ? gridColumn[cCnt].width : this.parent.renderModule.setSavedWidth(levelName, valueColWidth);
                                /* eslint-enable @typescript-eslint/no-explicit-any */
                            }
                            else {
                                gridColumn[cCnt].minWidth = valueColWidth;
                            }
                        }
                    }
                }
                this.parent.posCount = 0;
                this.parent.setGridColumns(this.parent.grid.columns);
                this.parent.grid.headerModule.refreshUI();
                if (!this.parent.firstColWidth) {
                    buttonWidth = gridColumn[0].autoFit ? gridColumn[0].width.toString() : buttonWidth;
                    colGroupElement.style.width = buttonWidth;
                    rowContent.style.width = buttonWidth;
                    rowHeaderTable.style.width = buttonWidth;
                    rowContentTable.style.width = buttonWidth;
                    setStyleAttribute(rowHeaderTable, { 'width': buttonWidth });
                    setStyleAttribute(rowContentTable, { 'width': buttonWidth });
                }
            }
            else {
                if (!this.parent.firstColWidth) {
                    var gridColumn = this.parent.grid.columns;
                    if (gridColumn && gridColumn.length > 0) {
                        gridColumn[0].width = this.resColWidth;
                    }
                    this.parent.posCount = 0;
                    this.parent.grid.headerModule.refreshUI();
                }
            }
        }
        else {
            if (this.parent.grid.columns && this.parent.grid.columns.length > 0) {
                this.parent.grid.columns[0].width = this.parent.grid.columns[0].width > this.resColWidth ?
                    this.parent.grid.columns[0].width : this.resColWidth;
            }
            this.parent.grid.headerModule.refreshUI();
        }
        if (this.groupingTable) {
            this.refreshUI();
        }
    };
    GroupingBar.prototype.setColWidth = function (columns, width) {
        for (var cCnt = 0; cCnt < columns.length; cCnt++) {
            if (columns[cCnt].columns) {
                this.setColWidth(columns[cCnt].columns, width);
            }
            else {
                if (!columns[cCnt].autoFit) {
                    if (columns[cCnt].width !== "auto") {
                        columns[cCnt].width = width;
                    }
                    else {
                        columns[cCnt].minWidth = width;
                    }
                }
            }
        }
    };
    GroupingBar.prototype.wireEvent = function (element) {
        EventHandler.add(element, 'mouseover', this.dropIndicatorUpdate, this);
        EventHandler.add(element, 'mouseleave', this.dropIndicatorUpdate, this);
    };
    GroupingBar.prototype.unWireEvent = function (element) {
        EventHandler.remove(element, 'mouseover', this.dropIndicatorUpdate);
        EventHandler.remove(element, 'mouseleave', this.dropIndicatorUpdate);
    };
    GroupingBar.prototype.dropIndicatorUpdate = function (e) {
        if ((this.parent.isDragging && e.target.classList.contains(cls.DROPPABLE_CLASS) && e.type === 'mouseover') ||
            (!this.parent.isDragging || (!e.target.classList.contains(cls.DROPPABLE_CLASS) && e.type === 'mouseleave'))) {
            removeClass([].slice.call(this.parent.element.querySelectorAll('.' + cls.DROP_INDICATOR_CLASS)), cls.INDICATOR_HOVER_CLASS);
            removeClass([].slice.call(this.parent.element.querySelectorAll('.' + cls.DROP_INDICATOR_CLASS + '-last')), cls.INDICATOR_HOVER_CLASS);
        }
    };
    GroupingBar.prototype.tapHoldHandler = function (e) {
        var target = closest(e.originalEvent.target, '.' + cls.PIVOT_BUTTON_CLASS);
        if (!isNullOrUndefined(target) && this.parent.isAdaptive) {
            var pos = target.getBoundingClientRect();
            this.parent.contextMenuModule.fieldElement = target;
            this.parent.contextMenuModule.menuObj.open(pos.top, pos.left);
            return;
        }
    };
    /**
     * @hidden
     */
    GroupingBar.prototype.RefreshFieldsPanel = function () {
        if (this.parent.dataType === 'pivot' && this.parent.groupingBarSettings != null) {
            if (selectAll('#' + this.parent.element.id + '_AllFields', this.parent.element).length > 0) {
                for (var _i = 0, _a = selectAll('#' + this.parent.element.id + '_AllFields', this.parent.element); _i < _a.length; _i++) {
                    var element = _a[_i];
                    element.remove();
                }
            }
            if (this.parent.groupingBarSettings.showFieldsPanel) {
                if (this.groupingChartTable && this.parent.displayOption.view !== 'Table' && this.parent.groupingBarSettings.displayMode !== 'Table') {
                    this.chartPanel = this.createToolbarUI(this.groupingChartTable);
                }
                if (this.groupingTable) {
                    this.gridPanel = this.createToolbarUI(this.groupingTable);
                }
                this.parent.axisFieldModule.render();
                this.refreshUI();
            }
        }
    };
    GroupingBar.prototype.createToolbarUI = function (element) {
        if (select('#' + this.parent.element.id + '_AllFields', element)) {
            select('#' + this.parent.element.id + '_AllFields', element).remove();
        }
        element.prepend(createElement('div', { id: this.parent.element.id + '_AllFields' }));
        var toolbarObj = new Toolbar({
            cssClass: cls.ALL_FIELDS_PANEL_CLASS + (this.parent.cssClass ? (' ' + this.parent.cssClass) : ''),
            enableRtl: this.parent.enableRtl, enableHtmlSanitizer: this.parent.enableHtmlSanitizer,
            items: [{ template: '<div class=' + cls.GROUP_ALL_FIELDS_CLASS + '></div>' }],
            allowKeyboard: false,
            width: this.parent.grid ? (this.parent.getGridWidthAsNumber() - 2) : (this.parent.getWidthAsNumber() - 2)
        });
        toolbarObj.appendTo(select('#' + this.parent.element.id + '_AllFields', element));
        return toolbarObj;
    };
    /**
     * @hidden
     */
    GroupingBar.prototype.addEventListener = function () {
        this.handlers = {
            load: this.renderLayout,
            end: this.appendToElement,
        };
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(events.initSubComponent, this.handlers.load, this); //For initial rendering
        this.parent.on(events.uiUpdate, this.handlers.end, this);
    };
    /**
     * @hidden
     */
    GroupingBar.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(events.uiUpdate, this.handlers.end);
        this.parent.off(events.initSubComponent, this.handlers.load);
    };
    /**
     * To destroy the groupingbar
     * @returns {void}
     * @hidden
     */
    GroupingBar.prototype.destroy = function () {
        this.removeEventListener();
        if (this.parent.pivotButtonModule) {
            this.parent.pivotButtonModule.destroy();
        }
        if (this.groupingTable && this.groupingTable.querySelector('.' + cls.ALL_FIELDS_PANEL_CLASS) && this.gridPanel != null && !this.gridPanel.isDestroyed) {
            this.gridPanel.destroy();
            this.gridPanel = null;
        }
        if (this.groupingChartTable && this.groupingChartTable.querySelector('.' + cls.ALL_FIELDS_PANEL_CLASS) && this.chartPanel != null && !this.chartPanel.isDestroyed) {
            this.chartPanel.destroy();
            this.chartPanel = null;
        }
        if (this.touchObj && !this.touchObj.isDestroyed) {
            this.touchObj.destroy();
        }
        if (this.parent.element.querySelector('.' + cls.GROUPING_BAR_CLASS)) {
            remove(this.parent.element.querySelector('.' + cls.GROUPING_BAR_CLASS));
        }
    };
    return GroupingBar;
}());
export { GroupingBar };
