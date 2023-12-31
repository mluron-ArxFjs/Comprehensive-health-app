import { isNullOrUndefined, extend, addClass, removeClass } from '@syncfusion/ej2-base';
import { attributes as addAttributes } from '@syncfusion/ej2-base';
import { rowDataBound, queryCellInfo } from '../base/constant';
import { setStyleAndAttributes, getObject, extendObjWithFn } from '../base/util';
import { CellType } from '../base/enum';
import { CellMergeRender } from './cell-merge-renderer';
import * as literals from '../base/string-literals';
/**
 * RowRenderer class which responsible for building row content.
 *
 * @hidden
 */
var RowRenderer = /** @class */ (function () {
    function RowRenderer(serviceLocator, cellType, parent) {
        this.isSpan = false;
        this.cellType = cellType;
        this.serviceLocator = serviceLocator;
        this.parent = parent;
        this.element = this.parent.createElement('tr');
    }
    /* eslint-disable */
    /**
     * Function to render the row content based on Column[] and data.
     *
     * @param {Row<T>} row - specifies the row
     * @param {Column[]} columns - specifies the columns
     * @param {Object} attributes - specifies the attributes
     * @param {string} rowTemplate - specifies the rowTemplate
     * @param {Element} cloneNode - specifies the cloneNode
     * @returns {Element} returns the element
     */
    /* eslint-enable */
    RowRenderer.prototype.render = function (row, columns, attributes, rowTemplate, cloneNode) {
        return this.refreshRow(row, columns, attributes, rowTemplate, cloneNode);
    };
    /* eslint-disable */
    /**
     * Function to refresh the row content based on Column[] and data.
     *
     * @param {Row<T>} row - specifies the row
     * @param {Column[]} columns - specifies the column
     * @param {boolean} isChanged - specifies isChanged
     * @param {Object} attributes - specifies the attributes
     * @param {string} rowTemplate - specifies the rowTemplate
     * @returns {void}
     */
    /* eslint-enable */
    RowRenderer.prototype.refresh = function (row, columns, isChanged, attributes, rowTemplate) {
        var _this = this;
        if (isChanged) {
            row.data = extendObjWithFn({}, row.changes);
            this.refreshMergeCells(row);
        }
        var node = this.parent.element.querySelector('[data-uid=' + row.uid + ']');
        var tr = this.refreshRow(row, columns, attributes, rowTemplate, null, isChanged);
        var cells = [].slice.call(tr.cells);
        var tempCells = [].slice.call(node.querySelectorAll('.e-templatecell'));
        if (this.parent.isReact && tempCells.length) {
            var _loop_1 = function (col) {
                if (col.template) {
                    setTimeout(function () {
                        _this.parent.refreshReactColumnTemplateByUid(col.uid, true);
                    }, 0);
                    return "break";
                }
            };
            for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
                var col = columns_1[_i];
                var state_1 = _loop_1(col);
                if (state_1 === "break")
                    break;
            }
        }
        var attr = [].slice.call(tr.attributes);
        attr.map(function (item) {
            node.setAttribute(item['name'], item['value']);
        });
        node.innerHTML = '';
        for (var _a = 0, cells_1 = cells; _a < cells_1.length; _a++) {
            var cell = cells_1[_a];
            node.appendChild(cell);
        }
    };
    // tslint:disable-next-line:max-func-body-length
    RowRenderer.prototype.refreshRow = function (row, columns, attributes, rowTemplate, cloneNode, isEdit) {
        var tr = !isNullOrUndefined(cloneNode) ? cloneNode : this.element.cloneNode();
        var rowArgs = { data: row.data };
        var cellArgs = { data: row.data };
        var chekBoxEnable = this.parent.getColumns().filter(function (col) { return col.type === 'checkbox' && col.field; })[0];
        var value = false;
        if (chekBoxEnable) {
            value = getObject(chekBoxEnable.field, rowArgs.data);
        }
        var selIndex = this.parent.getSelectedRowIndexes();
        if (row.isDataRow) {
            row.isSelected = selIndex.indexOf(row.index) > -1 || value;
        }
        if (row.isDataRow && this.parent.isCheckBoxSelection
            && this.parent.checkAllRows === 'Check' && this.parent.enableVirtualization) {
            row.isSelected = true;
            if (selIndex.indexOf(row.index) === -1) {
                selIndex.push(row.index);
            }
        }
        this.buildAttributeFromRow(tr, row);
        addAttributes(tr, extend({}, attributes, {}));
        setStyleAndAttributes(tr, row.attributes);
        var cellRendererFact = this.serviceLocator.getService('cellRendererFactory');
        var _loop_2 = function (i, len) {
            var cell = row.cells[parseInt(i.toString(), 10)];
            cell.isSelected = row.isSelected;
            cell.isColumnSelected = cell.column.isSelected;
            var cellRenderer = cellRendererFact.getCellRenderer(row.cells[parseInt(i.toString(), 10)].cellType
                || CellType.Data);
            var attrs = { 'index': !isNullOrUndefined(row.index) ? row.index.toString() : '' };
            if (row.isExpand && row.cells[parseInt(i.toString(), 10)].cellType === CellType.DetailExpand) {
                attrs['class'] = this_1.parent.isPrinting ? 'e-detailrowcollapse' : 'e-detailrowexpand';
            }
            var td = cellRenderer.render(row.cells[parseInt(i.toString(), 10)], row.data, attrs, row.isExpand, isEdit);
            if (row.cells[parseInt(i.toString(), 10)].cellType !== CellType.Filter) {
                if (row.cells[parseInt(i.toString(), 10)].cellType === CellType.Data
                    || row.cells[parseInt(i.toString(), 10)].cellType === CellType.CommandColumn) {
                    var isReactChild = this_1.parent.parentDetails && this_1.parent.parentDetails.parentInstObj &&
                        this_1.parent.parentDetails.parentInstObj.isReact;
                    if (((this_1.parent.isReact && this_1.parent.requireTemplateRef) || (isReactChild &&
                        this_1.parent.parentDetails.parentInstObj.requireTemplateRef)) && cell.isTemplate) {
                        // eslint-disable-next-line @typescript-eslint/no-this-alias
                        var thisRef_1 = this_1;
                        thisRef_1.parent.renderTemplates(function () {
                            var ariaAttr = td.getAttribute('aria-label');
                            td.setAttribute('aria-label', td.innerText + ariaAttr);
                            thisRef_1.parent.trigger(queryCellInfo, extend(cellArgs, {
                                cell: td, column: cell.column, colSpan: 1,
                                rowSpan: 1, foreignKeyData: row.cells[parseInt(i.toString(), 10)].foreignKeyData,
                                requestType: thisRef_1.parent.requestTypeAction
                            }));
                        });
                    }
                    else {
                        this_1.parent.trigger(queryCellInfo, extend(cellArgs, {
                            cell: td, column: cell.column, colSpan: 1,
                            rowSpan: 1, foreignKeyData: row.cells[parseInt(i.toString(), 10)].foreignKeyData,
                            requestType: this_1.parent.requestTypeAction
                        }));
                    }
                    var isRowSpanned = false;
                    if (row.index > 0 && this_1.isSpan) {
                        var rowsObject = this_1.parent.isFrozenGrid() ?
                            this_1.parent.contentModule.tempFreezeRows : this_1.parent.getRowsObject();
                        var prevRowCells = this_1.parent.groupSettings.columns.length > 0 &&
                            !rowsObject[row.index - 1].isDataRow ? rowsObject[row.index].cells : rowsObject[row.index - 1].cells;
                        var uid_1 = 'uid';
                        var prevRowCell = prevRowCells.filter(function (cell) {
                            return cell.column.uid === row.cells[parseInt(i.toString(), 10)].column["" + uid_1];
                        })[0];
                        isRowSpanned = prevRowCell.isRowSpanned ? prevRowCell.isRowSpanned : prevRowCell.rowSpanRange > 1;
                    }
                    if (cellArgs.colSpan > 1 || row.cells[parseInt(i.toString(), 10)].cellSpan > 1 || cellArgs.rowSpan > 1
                        || isRowSpanned) {
                        this_1.isSpan = true;
                        var cellMerge = new CellMergeRender(this_1.serviceLocator, this_1.parent);
                        td = cellMerge.render(cellArgs, row, i, td);
                    }
                }
                if (!row.cells[parseInt(i.toString(), 10)].isSpanned) {
                    tr.appendChild(td);
                }
            }
        };
        var this_1 = this;
        for (var i = 0, len = row.cells.length; i < len; i++) {
            _loop_2(i, len);
        }
        var args = { row: tr, rowHeight: this.parent.rowHeight };
        if (row.isDataRow) {
            var eventArg_1 = extend(rowArgs, args);
            eventArg_1.isSelectable = true;
            var isReactChild = this.parent.parentDetails && this.parent.parentDetails.parentInstObj &&
                this.parent.parentDetails.parentInstObj.isReact;
            var cellTemplate = eventArg_1.row.querySelectorAll('.e-templatecell');
            if (((this.parent.isReact && this.parent.requireTemplateRef) || (isReactChild &&
                this.parent.parentDetails.parentInstObj.requireTemplateRef)) && cellTemplate.length) {
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                var thisRef_2 = this;
                thisRef_2.parent.renderTemplates(function () {
                    thisRef_2.parent.trigger(rowDataBound, eventArg_1);
                });
            }
            else {
                this.parent.trigger(rowDataBound, eventArg_1);
            }
            row.isSelectable = eventArg_1.isSelectable;
            var isDraggable = this.parent.isRowDragable();
            if (this.parent.allowPaging && this.parent.selectionSettings.persistSelection) {
                var primaryKey_1 = this.parent.getPrimaryKeyFieldNames()[0];
                var pKey_1 = row.data ? row.data["" + primaryKey_1] : null;
                var SelectedRecords = eventArg_1.isSelectable ? this.parent.partialSelectedRecords :
                    this.parent.disableSelectedRecords;
                if (!SelectedRecords.some(function (data) { return data["" + primaryKey_1] === pKey_1; })) {
                    SelectedRecords.push(row.data);
                }
            }
            if (!eventArg_1.isSelectable) {
                this.parent.selectionModule.isPartialSelection = true;
                row.isSelected = false;
                var chkBox = args.row.querySelectorAll('.e-rowcell.e-gridchkbox');
                var isDrag = eventArg_1.row.querySelector('.e-rowdragdrop');
                var cellIdx = this.parent.groupSettings.columns.length + (isDrag || this.parent.isDetail() ? 1 : 0);
                for (var i = 0; i < chkBox.length; i++) {
                    chkBox[parseInt(i.toString(), 10)].firstElementChild.classList.add('e-checkbox-disabled');
                    chkBox[parseInt(i.toString(), 10)].querySelector('.e-frame').classList.remove('e-check');
                }
                if (row.cells.length) {
                    for (var i = cellIdx; i < row.cells.length; i++) {
                        var cell = eventArg_1.row.querySelector('.e-rowcell[data-colindex="' + row.cells[parseInt(i.toString(), 10)].index + '"]');
                        if (cell) {
                            removeClass([cell], ['e-selectionbackground', 'e-active']);
                        }
                    }
                }
                if (isDrag) {
                    removeClass([isDrag], ['e-selectionbackground', 'e-active']);
                }
            }
            if (this.parent.childGrid || isDraggable || this.parent.detailTemplate) {
                var td = tr.querySelectorAll('.e-rowcell:not(.e-hide)')[0];
                if (td) {
                    td.classList.add('e-detailrowvisible');
                }
            }
        }
        if (this.parent.enableVirtualization) {
            rowArgs.rowHeight = this.parent.rowHeight;
        }
        if (rowArgs.rowHeight) {
            tr.style.height = rowArgs.rowHeight + 'px';
        }
        else if (this.parent.rowHeight && (tr.querySelector('.e-headercell') || tr.querySelector('.e-groupcaption'))) {
            tr.style.height = this.parent.rowHeight + 'px';
        }
        if (row.cssClass) {
            tr.classList.add(row.cssClass);
        }
        if (row.lazyLoadCssClass) {
            tr.classList.add(row.lazyLoadCssClass);
        }
        if (this.parent.rowRenderingMode === 'Vertical' && this.parent.allowTextWrap && (this.parent.textWrapSettings.wrapMode === 'Header'
            || this.parent.textWrapSettings.wrapMode === 'Both')) {
            tr.classList.add('e-verticalwrap');
        }
        var vFTable = this.parent.enableColumnVirtualization && this.parent.frozenColumns !== 0;
        if (!vFTable && this.parent.aggregates.length && this.parent.element.scrollHeight > this.parent.height) {
            for (var i = 0; i < this.parent.aggregates.length; i++) {
                var property = 'properties';
                var column = 'columns';
                if (this.parent.aggregates[parseInt(i.toString(), 10)]["" + property]["" + column][0].footerTemplate) {
                    var summarycell = [].slice.call(tr.getElementsByClassName('e-summarycell'));
                    if (summarycell.length) {
                        var lastSummaryCell = (summarycell[summarycell.length - 1]);
                        addClass([lastSummaryCell], ['e-lastsummarycell']);
                        var firstSummaryCell = (summarycell[0]);
                        addClass([firstSummaryCell], ['e-firstsummarycell']);
                    }
                }
            }
        }
        return tr;
    };
    RowRenderer.prototype.refreshMergeCells = function (row) {
        for (var _i = 0, _a = row.cells; _i < _a.length; _i++) {
            var cell = _a[_i];
            cell.isSpanned = false;
        }
        return row;
    };
    /* eslint-disable */
    /**
     * Function to check and add alternative row css class.
     *
     * @param {Element} tr - specifies the tr element
     * @param {Row<T>} row - specifies the row
     * @returns {void}
     */
    /* eslint-enable */
    RowRenderer.prototype.buildAttributeFromRow = function (tr, row) {
        var attr = {};
        var prop = { 'rowindex': literals.dataRowIndex, 'dataUID': 'data-uid', 'ariaSelected': 'aria-selected' };
        var classes = [];
        if (row.isDataRow) {
            classes.push(literals.row);
        }
        if (row.isAltRow) {
            classes.push('e-altrow');
        }
        if (row.isCaptionRow) {
            classes.push('e-groupcaptionrow');
        }
        if (row.isAggregateRow && row.parentUid) {
            classes.push('e-groupfooterrow');
        }
        if (!isNullOrUndefined(row.index)) {
            attr[literals.ariaRowIndex] = row.index + 1;
            attr[prop.rowindex] = row.index;
        }
        if (row.rowSpan) {
            attr.rowSpan = row.rowSpan;
        }
        if (row.uid) {
            attr[prop.dataUID] = row.uid;
        }
        if (row.isSelected) {
            attr[prop.ariaSelected] = true;
        }
        if (row.visible === false) {
            classes.push('e-hide');
        }
        attr.class = classes;
        setStyleAndAttributes(tr, attr);
    };
    return RowRenderer;
}());
export { RowRenderer };
