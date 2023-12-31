import { isNullOrUndefined, addClass, extend, closest } from '@syncfusion/ej2-base';
import * as events from '../base/constant';
import { appendChildren, alignFrozenEditForm, getMovableTbody, getFrozenRightTbody, setStyleAndAttributes } from '../base/util';
import * as literals from '../base/string-literals';
/**
 * Edit render module is used to render grid edit row.
 *
 * @hidden
 */
var InlineEditRender = /** @class */ (function () {
    /**
     * Constructor for render module
     *
     * @param {IGrid} parent - returns the IGrid
     */
    function InlineEditRender(parent) {
        this.parent = parent;
    }
    InlineEditRender.prototype.addNew = function (elements, args) {
        this.isEdit = false;
        var tbody;
        var mTbody = getMovableTbody(this.parent);
        var frTbody = getFrozenRightTbody(this.parent);
        var isFrozenGrid = this.parent.isFrozenGrid();
        var isVirtualFrozen = isFrozenGrid && this.parent.enableColumnVirtualization && args.isScroll;
        if (this.parent.frozenRows && this.parent.editSettings.newRowPosition === 'Top') {
            tbody = isVirtualFrozen ? this.parent.getMovableHeaderTbody() : this.parent.getHeaderTable().querySelector(literals.tbody);
        }
        else {
            tbody = isVirtualFrozen ? this.parent.getMovableContentTbody() : this.parent.getContentTable().querySelector(literals.tbody);
        }
        args.row = this.parent.createElement('tr', { className: 'e-row e-addedrow' });
        if (tbody.querySelector('.e-emptyrow')) {
            var emptyRow = tbody.querySelector('.e-emptyrow');
            emptyRow.parentNode.removeChild(emptyRow);
            if (isFrozenGrid && !isVirtualFrozen) {
                var moveTbody = this.parent.getContent().querySelector('.' + literals.movableContent).querySelector(literals.tbody);
                (moveTbody.firstElementChild).parentNode.removeChild(moveTbody.firstElementChild);
                if (this.parent.getFrozenMode() === literals.leftRight) {
                    var frTbody_1 = this.parent.getContent().querySelector('.e-frozen-right-content').querySelector(literals.tbody);
                    (frTbody_1.firstElementChild).parentNode.removeChild(frTbody_1.firstElementChild);
                }
            }
        }
        if (this.parent.editSettings.newRowPosition === 'Top') {
            tbody.insertBefore(args.row, tbody.firstChild);
        }
        else {
            tbody.appendChild(args.row);
        }
        args.row.appendChild(this.getEditElement(elements, false, undefined, args, true));
        this.parent.editModule.checkLastRow(args.row, args);
        if (isFrozenGrid && !isVirtualFrozen) {
            var mEle = this.renderMovableform(args.row, args);
            if (this.parent.editSettings.newRowPosition === 'Top') {
                mTbody.insertBefore(mEle, mTbody.firstChild);
            }
            else {
                mTbody.appendChild(mEle);
            }
            args.row.querySelector('.e-normaledit').setAttribute('colspan', this.parent.getVisibleFrozenColumns() + '');
            mEle.querySelector('.e-normaledit').setAttribute('colspan', '' + (this.parent.getVisibleColumns().length - this.parent.getVisibleFrozenColumns()));
            if (frTbody) {
                var frEle = this.renderFrozenRightForm(args.row, args);
                if (this.parent.editSettings.newRowPosition === 'Top') {
                    frTbody.insertBefore(frEle, frTbody.firstChild);
                }
                else {
                    frTbody.appendChild(frEle);
                }
                var colSpan = this.parent.getVisibleFrozenColumns() - this.parent.getFrozenRightColumnsCount();
                args.row.querySelector('.e-normaledit').setAttribute('colspan', colSpan + '');
                frEle.querySelector('.e-normaledit').setAttribute('colspan', '' + this.parent.getFrozenRightColumnsCount());
            }
            if (this.parent.height === 'auto') {
                this.parent.notify(events.frozenHeight, {});
            }
        }
    };
    InlineEditRender.prototype.renderFrozenRightForm = function (ele, args) {
        var frEle = ele.cloneNode(true);
        var form = args.frozenRightForm = frEle.querySelector('form');
        if (this.parent.editSettings.template) {
            form.innerHTML = '';
            this.appendChildren(form, args.rowData, false);
            return frEle;
        }
        this.renderRightFrozen(ele, frEle);
        frEle.querySelector(literals.colGroup).innerHTML = this.parent.getHeaderContent()
            .querySelector('.e-frozen-right-header').querySelector(literals.colGroup).innerHTML;
        return frEle;
    };
    InlineEditRender.prototype.renderMovableform = function (ele, args) {
        var mEle = ele.cloneNode(true);
        var form = args.movableForm = mEle.querySelector('form');
        if (this.parent.editSettings.template) {
            form.innerHTML = '';
            this.appendChildren(form, args.rowData, false);
            return mEle;
        }
        this.renderMovable(ele, mEle);
        mEle.querySelector(literals.colGroup).innerHTML = this.parent.getHeaderContent()
            .querySelector('.' + literals.movableHeader).querySelector(literals.colGroup).innerHTML;
        return mEle;
    };
    InlineEditRender.prototype.updateFreezeEdit = function (row, td) {
        td = td.concat([].slice.call(this.getFreezeRow(row).querySelectorAll('td.e-rowcell')));
        if (this.parent.getFrozenMode() === literals.leftRight) {
            td = td.concat([].slice.call(this.getFreezeRightRow(row).querySelectorAll('td.e-rowcell')));
        }
        return td;
    };
    InlineEditRender.prototype.getFreezeRightRow = function (row) {
        var idx = parseInt(row.getAttribute(literals.dataRowIndex), 10);
        var fCont = this.parent.getFrozenLeftContentTbody();
        var fHdr = this.parent.getFrozenHeaderTbody();
        var frHdr = this.parent.getFrozenRightHeaderTbody();
        var frCont = this.parent.getFrozenRightContentTbody();
        if (fCont.contains(row) || fHdr.contains(row)) {
            return this.parent.getFrozenRightRowByIndex(idx);
        }
        else if (frCont.contains(row) || frHdr.contains(row)) {
            return this.parent.getRowByIndex(idx);
        }
        return row;
    };
    InlineEditRender.prototype.getFreezeRow = function (row) {
        if (this.parent.isFrozenGrid()) {
            var idx = parseInt(row.getAttribute(literals.dataRowIndex), 10);
            var fCont = this.parent.getFrozenLeftContentTbody();
            var mCont = this.parent.getMovableContentTbody();
            var fHdr = this.parent.getFrozenHeaderTbody();
            var mHdr = this.parent.getMovableHeaderTbody();
            if (fCont.contains(row) || fHdr.contains(row)) {
                return this.parent.getMovableRowByIndex(idx);
            }
            else if (mCont.contains(row) || mHdr.contains(row)) {
                return this.parent.getRowByIndex(idx);
            }
        }
        return row;
    };
    InlineEditRender.prototype.update = function (elements, args) {
        this.isEdit = true;
        var isCustomFormValidation = args.isCustomFormValidation;
        var isScroll = args.isScroll;
        if (!isScroll && (closest(args.row, '.' + literals.movableContent) || closest(args.row, '.' + literals.movableHeader))) {
            args.row = this.getFreezeRow(args.row);
        }
        if (closest(args.row, '.e-frozen-right-content') || closest(args.row, '.e-frozen-right-header')) {
            args.row = this.getFreezeRightRow(args.row);
        }
        var isVirtualFrozen = this.parent.isFrozenGrid() && this.parent.enableColumnVirtualization && isScroll;
        var tdElement = [].slice.call(args.row.querySelectorAll('td.e-rowcell'));
        args.row.innerHTML = '';
        if (!isVirtualFrozen && !isCustomFormValidation) {
            tdElement = this.updateFreezeEdit(args.row, tdElement);
        }
        args.row.appendChild(this.getEditElement(elements, true, tdElement, args, true));
        args.row.classList.add(literals.editedRow);
        this.parent.editModule.checkLastRow(args.row, args);
        if (!isVirtualFrozen && !isCustomFormValidation) {
            this.refreshFreezeEdit(args.row, args);
        }
    };
    InlineEditRender.prototype.refreshFreezeEdit = function (row, args) {
        var td = row.firstChild;
        if (this.parent.getVisibleFrozenColumns() && this.parent.editSettings.template) {
            td.querySelector(literals.colGroup).innerHTML = this.parent.getHeaderContent().querySelector('.' + literals.frozenHeader).
                querySelector(literals.colGroup).innerHTML;
        }
        var fCls;
        var cont;
        var idx = parseInt(row.getAttribute(literals.dataRowIndex), 10);
        if (this.parent.isFrozenGrid()) {
            if (idx < this.parent.frozenRows) {
                cont = this.parent.getHeaderContent();
                fCls = '.' + literals.frozenHeader;
            }
            else {
                cont = this.parent.getContent();
                fCls = '.' + literals.frozenContent;
            }
            var mTd = td.cloneNode(true);
            var frTd = td.cloneNode(true);
            var form = args.movableForm = mTd.querySelector('form');
            if (this.parent.editSettings.template) {
                this.refreshEditForm(form, args.rowData);
            }
            var fRows = void 0;
            var frRows = void 0;
            if (cont.querySelector(fCls).contains(row)) {
                fRows = this.parent.getMovableRowByIndex(idx);
                this.updateFrozenCont(fRows, td, mTd);
                if (this.parent.getFrozenMode() === literals.leftRight) {
                    args.frozenRightForm = frTd.querySelector('form');
                    this.refreshEditForm(args.frozenRightForm, args.rowData);
                    frRows = this.parent.getFrozenRightRowByIndex(idx);
                    this.updateFrozenRightCont(frRows, td, frTd);
                }
            }
            else {
                fRows = this.parent.getRowByIndex(idx);
                this.updateFrozenCont(fRows, mTd, td);
                if (this.parent.getFrozenMode() === literals.leftRight) {
                    args.frozenRightForm = frTd.querySelector('form');
                    this.refreshEditForm(args.frozenRightForm, args.rowData);
                    frRows = this.parent.getFrozenRightRowByIndex(idx);
                    this.updateFrozenRightCont(frRows, frTd, td);
                }
            }
            fRows.appendChild(mTd);
            fRows.classList.add(literals.editedRow);
            if (this.parent.getFrozenMode() === literals.leftRight) {
                frRows.appendChild(frTd);
                frRows.classList.add(literals.editedRow);
                alignFrozenEditForm(args.frozenRightForm.querySelector('td:not(.e-hide)'), args.form.querySelector('td:not(.e-hide)'));
            }
            alignFrozenEditForm(args.movableForm.querySelector('td:not(.e-hide)'), args.form.querySelector('td:not(.e-hide)'));
        }
    };
    InlineEditRender.prototype.refreshEditForm = function (form, data) {
        if (this.parent.editSettings.template) {
            form.innerHTML = '';
            this.appendChildren(form, data, false);
        }
    };
    InlineEditRender.prototype.updateFrozenRightCont = function (row, ele, frEle) {
        row.innerHTML = '';
        this.renderRightFrozen(ele, frEle);
        frEle.querySelector(literals.colGroup).innerHTML = this.parent.getHeaderContent()
            .querySelector('.e-frozen-right-header').querySelector(literals.colGroup).innerHTML;
        ele.setAttribute('colspan', this.parent.getVisibleFrozenColumns() - this.parent.getFrozenRightColumnsCount() + '');
        frEle.setAttribute('colspan', this.parent.getFrozenRightColumnsCount() + '');
    };
    InlineEditRender.prototype.updateFrozenCont = function (row, ele, mEle) {
        row.innerHTML = '';
        this.renderMovable(ele, mEle);
        mEle.querySelector(literals.colGroup).innerHTML = this.parent.getHeaderContent()
            .querySelector('.' + literals.movableHeader).querySelector(literals.colGroup).innerHTML;
        ele.setAttribute('colspan', this.parent.getVisibleFrozenColumns() + '');
        mEle.setAttribute('colspan', this.parent.getCurrentVisibleColumns(this.parent.enableColumnVirtualization).length - this.parent.getVisibleFrozenColumns() + '');
    };
    InlineEditRender.prototype.renderRightFrozen = function (ele, frEle) {
        frEle.querySelector('tr').innerHTML = '';
        var cols = this.parent.getColumns();
        var k = 0;
        for (var i = 0; i < cols.length; i++, k++) {
            if (cols[parseInt(i.toString(), 10)].getFreezeTableName() === literals.frozenRight) {
                var index = k - this.parent.getMovableColumnsCount();
                frEle.querySelector('tr').appendChild(ele.querySelector('tr').removeChild(ele.querySelector('tr').children[parseInt(index.toString(), 10)]));
                k--;
            }
        }
    };
    InlineEditRender.prototype.renderMovable = function (ele, mEle) {
        mEle.querySelector('tr').innerHTML = '';
        var cols = this.parent.getColumns();
        var k = this.parent.isRowDragable() ? 1 : 0;
        for (var i = 0; i < cols.length; i++, k++) {
            if (cols[parseInt(i.toString(), 10)].getFreezeTableName() === 'movable') {
                mEle.querySelector('tr').appendChild(ele.querySelector('tr')
                    .removeChild(ele.querySelector('tr').children[parseInt(k.toString(), 10)]));
                k--;
            }
        }
    };
    // eslint-disable-next-line max-len
    InlineEditRender.prototype.getEditElement = function (elements, isEdit, tdElement, args, isFrozen) {
        var gObj = this.parent;
        var gLen = 0;
        var isDetail = !isNullOrUndefined(gObj.detailTemplate) || !isNullOrUndefined(gObj.childGrid) ? 1 : 0;
        if (gObj.allowGrouping) {
            gLen = gObj.groupSettings.columns.length;
        }
        var td = this.parent.createElement('td', {
            className: 'e-editcell e-normaledit',
            attrs: {
                colspan: (gObj.getCurrentVisibleColumns(this.parent.enableColumnVirtualization).length - gObj.getVisibleFrozenColumns()
                    + this.parent.getIndentCount()).toString()
            }
        });
        var form = args.form =
            this.parent.createElement('form', { id: gObj.element.id + 'EditForm', className: 'e-gridform' });
        if (this.parent.editSettings.template) {
            this.appendChildren(form, args.rowData, isFrozen);
            td.appendChild(form);
            return td;
        }
        var table = this.parent.createElement('table', { className: 'e-table e-inline-edit', attrs: { cellspacing: '0.25', role: 'grid' } });
        table.appendChild(gObj.getContentTable().querySelector(literals.colGroup).cloneNode(true));
        var tbody = this.parent.createElement(literals.tbody, { attrs: { role: 'rowgroup' } });
        var tr = this.parent.createElement('tr');
        var i = 0;
        if (isDetail) {
            tr.insertBefore(this.parent.createElement('td', { className: 'e-detailrowcollapse' }), tr.firstChild);
        }
        if (gObj.isRowDragable()) {
            tr.appendChild(this.parent.createElement('td', { className: 'e-dragindentcell' }));
        }
        while (i < gLen) {
            tr.appendChild(this.parent.createElement('td', { className: 'e-indentcell' }));
            i++;
        }
        var m = 0;
        i = 0;
        var isVirtualFrozen = gObj.isFrozenGrid() && gObj.enableColumnVirtualization && args.isScroll;
        var cols = args.isCustomFormValidation ? this.parent.columnModel : gObj.getColumns();
        while ((isEdit && m < tdElement.length && i < cols.length) || i < cols.length) {
            var span = isEdit ? tdElement[parseInt(m.toString(), 10)].getAttribute('colspan') : null;
            var col = cols[parseInt(i.toString(), 10)];
            if ((isVirtualFrozen && col.getFreezeTableName() !== 'movable')
                || (args.isCustomFormValidation && (col.commands || col.commandsTemplate || !col.field))) {
                i++;
                continue;
            }
            var td_1 = this.parent.createElement('td', {
                className: literals.rowCell, attrs: { style: 'text-align:' + (col.textAlign ? col.textAlign : ''), 'colspan': span ? span : '' }
            });
            if (col.visible) {
                td_1.appendChild(elements[col.uid]);
                if (this.parent.rowRenderingMode === 'Vertical') {
                    setStyleAndAttributes(td_1, { 'data-cell': col.headerText });
                    if (i === 0) {
                        td_1.classList.add('e-responsive-editcell');
                    }
                }
                if (col.editType === 'booleanedit') {
                    td_1.classList.add('e-boolcell');
                }
                else if (col.commands || col.commandsTemplate) {
                    addClass([td_1], 'e-unboundcell');
                }
            }
            else {
                td_1.classList.add('e-hide');
            }
            tr.appendChild(td_1);
            i = span ? i + parseInt(span, 10) : i + 1;
            m++;
        }
        tbody.appendChild(tr);
        table.appendChild(tbody);
        form.appendChild(table);
        td.appendChild(form);
        return td;
    };
    InlineEditRender.prototype.removeEventListener = function () {
        //To destroy the renderer
    };
    InlineEditRender.prototype.appendChildren = function (form, data, isFrozen) {
        var _this = this;
        var dummyData = extend({}, data, { isAdd: !this.isEdit, isFrozen: isFrozen }, true);
        var editTemplateID = this.parent.element.id + 'editSettingsTemplate';
        if (this.parent.isReact && typeof (this.parent.editSettings.template) !== 'string') {
            this.parent.getEditTemplate()(dummyData, this.parent, 'editSettingsTemplate', editTemplateID, null, null, form);
            this.parent.renderTemplates();
        }
        else {
            appendChildren(form, this.parent.getEditTemplate()(dummyData, this.parent, 'editSettingsTemplate', editTemplateID));
        }
        // eslint-disable-next-line
        var setRules = function () {
            var cols = _this.parent.getColumns();
            for (var i = 0; i < cols.length; i++) {
                if (cols[parseInt(i.toString(), 10)].validationRules) {
                    _this.parent.editModule.formObj.rules[cols[parseInt(i.toString(), 10)].field] =
                        cols[parseInt(i.toString(), 10)].validationRules;
                }
            }
        };
    };
    return InlineEditRender;
}());
export { InlineEditRender };
