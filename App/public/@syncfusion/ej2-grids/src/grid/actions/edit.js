import { closest, addClass, select } from '@syncfusion/ej2-base';
import { extend, getValue } from '@syncfusion/ej2-base';
import { remove } from '@syncfusion/ej2-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import * as events from '../base/constant';
import { EditRender } from '../renderer/edit-renderer';
import { BooleanEditCell } from '../renderer/boolean-edit-cell';
import { DropDownEditCell } from '../renderer/dropdown-edit-cell';
import { NumericEditCell } from '../renderer/numeric-edit-cell';
import { DefaultEditCell } from '../renderer/default-edit-cell';
import { InlineEdit } from './inline-edit';
import { BatchEdit } from './batch-edit';
import { DialogEdit } from './dialog-edit';
import { Dialog } from '@syncfusion/ej2-popups';
import { parentsUntil, getComplexFieldID, getParsedFieldID, setComplexFieldID, getScrollBarWidth, setValidationRuels } from '../base/util';
import { FormValidator } from '@syncfusion/ej2-inputs';
import { DatePickerEditCell } from '../renderer/datepicker-edit-cell';
import { calculateRelativeBasedPosition } from '@syncfusion/ej2-popups';
import { TemplateEditCell } from '../renderer/template-edit-cell';
import { DataUtil } from '@syncfusion/ej2-data';
import { addRemoveEventListener, getColumnModelByFieldName, padZero } from '../base/util';
import * as literals from '../base/string-literals';
/**
 * The `Edit` module is used to handle editing actions.
 */
var Edit = /** @class */ (function () {
    /**
     * Constructor for the Grid editing module
     *
     * @param {IGrid} parent - specifies the IGrid
     * @param {ServiceLocator} serviceLocator - specifies the servicelocator
     * @hidden
     */
    function Edit(parent, serviceLocator) {
        this.editType = { 'Inline': InlineEdit, 'Normal': InlineEdit, 'Batch': BatchEdit, 'Dialog': DialogEdit };
        this.isValidationApplied = false;
        /* @hidden */
        this.editCellDialogClose = false;
        this.parent = parent;
        this.serviceLocator = serviceLocator;
        this.l10n = this.serviceLocator.getService('localization');
        this.addEventListener();
        this.updateEditObj();
        this.createAlertDlg();
        this.createConfirmDlg();
    }
    Edit.prototype.updateColTypeObj = function () {
        var cols = this.parent.columnModel;
        for (var i = 0; i < cols.length; i++) {
            if (this.parent.editSettings.template || cols[parseInt(i.toString(), 10)].editTemplate) {
                var templteCell = 'templateedit';
                cols[parseInt(i.toString(), 10)].edit = extend(new Edit.editCellType["" + templteCell](this.parent), cols[parseInt(i.toString(), 10)].edit || {});
            }
            else {
                cols[parseInt(i.toString(), 10)].edit = extend(new Edit.editCellType[cols[parseInt(i.toString(), 10)].editType
                    && Edit.editCellType[cols[parseInt(i.toString(), 10)].editType] ?
                    cols[parseInt(i.toString(), 10)].editType : 'defaultedit'](this.parent, this.serviceLocator), cols[parseInt(i.toString(), 10)].edit || {});
            }
        }
        this.parent.log('primary_column_missing');
    };
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} returns the module name
     * @private
     */
    Edit.prototype.getModuleName = function () {
        return 'edit';
    };
    /**
     * @param {NotifyArgs} e - specifies the notifyargs
     * @returns {void}
     * @hidden
     */
    Edit.prototype.onPropertyChanged = function (e) {
        if (e.module !== this.getModuleName()) {
            return;
        }
        var gObj = this.parent;
        for (var _i = 0, _a = Object.keys(e.properties); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'allowAdding':
                case 'allowDeleting':
                case 'allowEditing':
                    if (gObj.editSettings.allowAdding || gObj.editSettings.allowEditing || gObj.editSettings.allowDeleting) {
                        this.initialEnd();
                    }
                    break;
                case 'mode':
                    this.updateEditObj();
                    gObj.isEdit = false;
                    gObj.refresh();
                    break;
            }
        }
    };
    Edit.prototype.updateEditObj = function () {
        if (this.editModule) {
            this.editModule.destroy();
        }
        this.renderer = new EditRender(this.parent, this.serviceLocator);
        this.editModule = new this.editType[this.parent.editSettings.mode](this.parent, this.serviceLocator, this.renderer);
    };
    Edit.prototype.initialEnd = function () {
        this.updateColTypeObj();
    };
    /**
     * Edits any bound record in the Grid by TR element.
     *
     * @param {HTMLTableRowElement} tr - Defines the table row to be edited.
     * @returns {void}
     */
    Edit.prototype.startEdit = function (tr) {
        var gObj = this.parent;
        if (!gObj.editSettings.allowEditing || gObj.isEdit || gObj.editSettings.mode === 'Batch') {
            return;
        }
        this.parent.element.classList.add('e-editing');
        if (!gObj.getSelectedRows().length) {
            if (!tr) {
                this.showDialog('EditOperationAlert', this.alertDObj);
                return;
            }
        }
        else if (!tr) {
            tr = gObj.getSelectedRows()[0];
        }
        if (this.parent.enableVirtualization && this.parent.editSettings.mode === 'Normal') {
            var idx = parseInt(tr.getAttribute('data-rowindex'), 10);
            tr = this.parent.getRowByIndex(idx);
        }
        this.isLastRow = tr.rowIndex === this.parent.getContent().querySelector('tr:last-child').rowIndex;
        if (tr.style.display === 'none') {
            return;
        }
        this.editModule.startEdit(tr);
        this.refreshToolbar();
        gObj.element.querySelector('.e-gridpopup').style.display = 'none';
        this.parent.notify('start-edit', {});
    };
    /**
     * @param {Element} tr - specifies the tr element
     * @param {object} args - specifies the object
     * @param {Element} args.row -specfifes the row
     * @param {string} args.requestType - specifies the request type
     * @returns {void}
     * @hidden
     */
    Edit.prototype.checkLastRow = function (tr, args) {
        var checkLastRow = this.isLastRow;
        if (this.parent.height !== 'auto' && this.parent.editSettings.newRowPosition === 'Bottom' && args && args.requestType === 'add' &&
            this.parent.getContent().firstElementChild.offsetHeight > this.parent.getContentTable().scrollHeight) {
            addClass([].slice.call(tr.getElementsByClassName(literals.rowCell)), 'e-lastrowadded');
        }
        else if (checkLastRow && tr && tr.classList) {
            addClass([].slice.call(tr.getElementsByClassName(literals.rowCell)), 'e-lastrowcell');
        }
    };
    /**
     * Cancels edited state.
     *
     * @returns {void}
     */
    Edit.prototype.closeEdit = function () {
        if (this.parent.editSettings.mode === 'Batch' && this.parent.editSettings.showConfirmDialog
            && this.parent.element.getElementsByClassName('e-updatedtd').length) {
            this.showDialog('CancelEdit', this.dialogObj);
            return;
        }
        this.parent.element.classList.remove('e-editing');
        this.editModule.closeEdit();
        this.refreshToolbar();
        this.parent.notify(events.closeEdit, {});
    };
    Edit.prototype.refreshToolbar = function () {
        this.parent.notify(events.toolbarRefresh, {});
    };
    /**
     * To adds a new row at the top with the given data. When data is not passed, it will add empty rows.
     * > `editSettings.allowEditing` should be true.
     *
     * @param {Object} data - Defines the new add record data.
     * @param {number} index - Defines the row index to be added
     * @returns {void}
     */
    Edit.prototype.addRecord = function (data, index) {
        if (!this.parent.editSettings.allowAdding) {
            return;
        }
        var args = { startEdit: true };
        if (!data) {
            this.parent.notify(events.virtualScrollAddActionBegin, args);
        }
        if (args.startEdit) {
            this.parent.element.classList.add('e-editing');
            this.editModule.addRecord(data, index);
            this.refreshToolbar();
            this.parent.notify('start-add', {});
        }
    };
    /**
     * Deletes a record with the given options. If fieldname and data are not given, the Grid will delete the selected record.
     * > `editSettings.allowDeleting` should be true.
     *
     * @param {string} fieldname - Defines the primary key field name of the column.
     * @param {Object} data - Defines the JSON data record to be deleted.
     * @returns {void}
     */
    Edit.prototype.deleteRecord = function (fieldname, data) {
        var gObj = this.parent;
        if (!gObj.editSettings.allowDeleting) {
            return;
        }
        if (!data) {
            if (!gObj.getSelectedRecords().length && isNullOrUndefined(gObj.commandDelIndex)) {
                this.showDialog('DeleteOperationAlert', this.alertDObj);
                return;
            }
        }
        if (gObj.editSettings.showDeleteConfirmDialog) {
            this.showDialog('ConfirmDelete', this.dialogObj);
            return;
        }
        this.editModule.deleteRecord(fieldname, data);
    };
    /**
     * Deletes a visible row by TR element.
     *
     * @param {HTMLTableRowElement} tr - Defines the table row element.
     * @returns {void}
     */
    Edit.prototype.deleteRow = function (tr) {
        this.deleteRowUid = tr.getAttribute('data-uid');
        var rowObj = this.parent.getRowObjectFromUID(this.deleteRowUid);
        if (!isNullOrUndefined(rowObj)) {
            this.deleteRecord(null, rowObj.data);
        }
    };
    /**
     * If Grid is in editable state, you can save a record by invoking endEdit.
     *
     * @returns {void}
     */
    Edit.prototype.endEdit = function () {
        if (this.parent.editSettings.mode === 'Batch' && this.parent.editSettings.showConfirmDialog &&
            (isNullOrUndefined(this.formObj) || this.formObj.validate())) {
            this.parent.editModule.saveCell();
            this.parent.notify(events.editNextValCell, {});
            if (isNullOrUndefined(this.formObj) || this.formObj.validate()) {
                this.showDialog('BatchSaveConfirm', this.dialogObj);
                return;
            }
        }
        this.endEditing();
    };
    /**
     * To update the specified cell by given value without changing into edited state.
     *
     * @param {number} rowIndex Defines the row index.
     * @param {string} field Defines the column field.
     * @param {string | number | boolean | Date} value - Defines the value to be changed.
     * @returns {void}
     */
    Edit.prototype.updateCell = function (rowIndex, field, value) {
        this.editModule.updateCell(rowIndex, field, value);
    };
    /**
     * To update the specified row by given values without changing into edited state.
     *
     * @param {number} index Defines the row index.
     * @param {Object} data Defines the data object to be updated.
     * @returns {void}
     */
    Edit.prototype.updateRow = function (index, data) {
        this.editModule.updateRow(index, data);
    };
    /**
     * Resets added, edited, and deleted records in the batch mode.
     *
     * @returns {void}
     */
    Edit.prototype.batchCancel = function () {
        this.closeEdit();
    };
    /**
     * Bulk saves added, edited, and deleted records in the batch mode.
     *
     * @returns {void}
     */
    Edit.prototype.batchSave = function () {
        this.endEdit();
    };
    /**
     * Changes a particular cell into edited state based on the row index and field name provided in the `batch` mode.
     *
     * @param {number} index - Defines row index to edit a particular cell.
     * @param {string} field - Defines the field name of the column to perform batch edit.
     * @returns {void}
     */
    Edit.prototype.editCell = function (index, field) {
        this.editModule.editCell(index, field);
    };
    /**
     * Checks the status of validation at the time of editing. If validation is passed, it returns true.
     *
     * @returns {boolean} returns whether the form is validated
     */
    Edit.prototype.editFormValidate = function () {
        var form1 = this.formObj ? this.formObj.validate() : true;
        var form2 = this.mFormObj ? this.mFormObj.validate() : true;
        var form3 = this.frFormObj ? this.frFormObj.validate() : true;
        return form1 && form2 && form3;
    };
    /**
     * Gets the added, edited,and deleted data before bulk save to the DataSource in batch mode.
     *
     * @returns {Object} returns the Object
     */
    Edit.prototype.getBatchChanges = function () {
        return this.editModule.getBatchChanges ? this.editModule.getBatchChanges() : {};
    };
    /**
     * Gets the current value of the edited component.
     *
     * @returns {Object} returns the Object
     */
    Edit.prototype.getCurrentEditCellData = function () {
        var obj = this.getCurrentEditedData(this.formObj.element, {});
        return obj[Object.keys(obj)[0]];
    };
    /**
     * Saves the cell that is currently edited. It does not save the value to the DataSource.
     *
     * @returns {void}
     */
    Edit.prototype.saveCell = function () {
        this.editModule.saveCell();
    };
    Edit.prototype.endEditing = function () {
        this.parent.element.classList.remove('e-editing');
        this.editModule.endEdit();
        this.refreshToolbar();
    };
    Edit.prototype.showDialog = function (content, obj) {
        obj.content = '<div>' + this.l10n.getConstant(content) + '</div>';
        obj.dataBind();
        obj.show();
    };
    Edit.prototype.getValueFromType = function (col, value) {
        var val = value;
        switch (col.type) {
            case 'number':
                val = !isNaN(parseFloat(value)) ? parseFloat(value) : null;
                break;
            case 'boolean':
                if (col.editType !== 'booleanedit') {
                    val = value === this.l10n.getConstant('True') || value === true ? true : false;
                }
                break;
            case 'date':
            case 'datetime':
                if (col.editType !== 'datepickeredit' && col.editType !== 'datetimepickeredit'
                    && value && value.length) {
                    val = new Date(value);
                }
                else if (value === '') {
                    val = null;
                }
                break;
            case 'dateonly':
                val = value && (value = new Date(value)) ?
                    value.getFullYear() + '-' + padZero(value.getMonth() + 1) + '-' + padZero(value.getDate()) : null;
                break;
        }
        return val;
    };
    Edit.prototype.destroyToolTip = function () {
        var elements = [].slice.call(this.parent.element.getElementsByClassName('e-griderror'));
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var elem = elements_1[_i];
            remove(elem);
        }
        this.parent.getContent().firstElementChild.style.position = 'relative';
    };
    Edit.prototype.createConfirmDlg = function () {
        this.dialogObj = this.dlgWidget([
            {
                click: this.dlgOk.bind(this),
                buttonModel: { content: this.l10n.getConstant('OKButton'),
                    cssClass: this.parent.cssClass ? 'e-primary' + ' ' + this.parent.cssClass : 'e-primary',
                    isPrimary: true }
            },
            {
                click: this.dlgCancel.bind(this),
                buttonModel: { cssClass: this.parent.cssClass ? 'e-flat' + ' ' + this.parent.cssClass : 'e-flat',
                    content: this.l10n.getConstant('CancelButton') }
            }
        ], 'EditConfirm');
    };
    Edit.prototype.createAlertDlg = function () {
        this.alertDObj = this.dlgWidget([
            {
                click: this.alertClick.bind(this),
                buttonModel: { content: this.l10n.getConstant('OKButton'),
                    cssClass: this.parent.cssClass ? 'e-flat' + ' ' + this.parent.cssClass : 'e-flat',
                    isPrimary: true }
            }
        ], 'EditAlert');
    };
    Edit.prototype.alertClick = function () {
        this.alertDObj.hide();
    };
    Edit.prototype.dlgWidget = function (btnOptions, name) {
        var div = this.parent.createElement('div', { id: this.parent.element.id + name });
        this.parent.element.appendChild(div);
        var options = {
            showCloseIcon: false,
            isModal: true,
            visible: false,
            closeOnEscape: true,
            target: this.parent.element,
            width: '320px',
            animationSettings: { effect: 'None' },
            cssClass: this.parent.cssClass ? this.parent.cssClass : ''
        };
        options.buttons = btnOptions;
        var obj = new Dialog(options);
        var isStringTemplate = 'isStringTemplate';
        obj["" + isStringTemplate] = true;
        obj.appendTo(div);
        return obj;
    };
    Edit.prototype.dlgCancel = function () {
        this.parent.focusModule.clearIndicator();
        this.parent.focusModule.restoreFocus();
        this.dialogObj.hide();
        this.parent.notify('cancelcnfrmDlg', {});
    };
    Edit.prototype.dlgOk = function () {
        switch (this.dialogObj.element.querySelector('.e-dlg-content').firstElementChild.innerText) {
            case this.l10n.getConstant('ConfirmDelete'):
                this.editModule.deleteRecord();
                break;
            case this.l10n.getConstant('CancelEdit'):
                this.editModule.closeEdit();
                break;
            case this.l10n.getConstant('BatchSaveConfirm'):
                this.endEditing();
                break;
            case this.l10n.getConstant('BatchSaveLostChanges'):
                if (this.parent.editSettings.mode === 'Batch') {
                    this.editModule.addCancelWhilePaging();
                }
                this.executeAction();
                break;
        }
        this.dlgCancel();
    };
    Edit.prototype.destroyEditComponents = function () {
        if (this.parent.isEdit) {
            this.destroyWidgets();
            this.destroyForm();
        }
        this.destroy();
    };
    /**
     * @returns {void}
     * @hidden
     */
    Edit.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.eventDetails = [{ event: events.inBoundModelChanged, handler: this.onPropertyChanged },
            { event: events.initialEnd, handler: this.initialEnd },
            { event: events.keyPressed, handler: this.keyPressHandler },
            { event: events.autoCol, handler: this.updateColTypeObj },
            { event: events.tooltipDestroy, handler: this.destroyToolTip },
            { event: events.preventBatch, handler: this.preventBatch },
            { event: events.destroyForm, handler: this.destroyForm },
            { event: events.destroy, handler: this.destroyEditComponents }];
        addRemoveEventListener(this.parent, this.eventDetails, true, this);
        this.actionBeginFunction = this.onActionBegin.bind(this);
        this.actionCompleteFunction = this.actionComplete.bind(this);
        this.onDataBoundFunction = this.onDataBound.bind(this);
        this.parent.addEventListener(events.actionBegin, this.actionBeginFunction);
        this.parent.addEventListener(events.actionComplete, this.actionCompleteFunction);
        this.parent.addEventListener(events.dataBound, this.onDataBoundFunction);
    };
    /**
     * @returns {void}
     * @hidden
     */
    Edit.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        addRemoveEventListener(this.parent, this.eventDetails, false);
        this.parent.removeEventListener(events.actionComplete, this.actionCompleteFunction);
        this.parent.removeEventListener(events.actionBegin, this.actionBeginFunction);
        this.parent.removeEventListener(events.dataBound, this.onDataBoundFunction);
    };
    Edit.prototype.onDataBound = function () {
        this.resetMovableContentValidation();
    };
    Edit.prototype.actionComplete = function (e) {
        var actions = ['add', 'beginEdit', 'save', 'delete', 'cancel', 'filterafteropen', 'filterchoicerequest'];
        if (actions.indexOf(e.requestType) < 0) {
            this.parent.isEdit = false;
        }
        if (e.requestType === 'batchsave') {
            this.parent.focusModule.restoreFocus();
        }
        this.refreshToolbar();
    };
    /**
     * @param {Element} form - specifies the element
     * @param {Object} editedData - specifies the edited data
     * @returns {Object} returns the object
     * @hidden
     */
    Edit.prototype.getCurrentEditedData = function (form, editedData) {
        var gObj = this.parent;
        if (gObj.editSettings.template) {
            var elements = [].slice.call(form.elements);
            for (var k = 0; k < elements.length; k++) {
                if (((elements[parseInt(k.toString(), 10)].hasAttribute('name') && (elements[parseInt(k.toString(), 10)].className !== 'e-multi-hidden')) ||
                    elements[parseInt(k.toString(), 10)].classList.contains('e-multiselect')) && !(elements[parseInt(k.toString(), 10)].type === 'hidden' &&
                    (parentsUntil(elements[parseInt(k.toString(), 10)], 'e-switch-wrapper') || parentsUntil(elements[parseInt(k.toString(), 10)], 'e-checkbox-wrapper')))) {
                    var field = (elements[parseInt(k.toString(), 10)].hasAttribute('name')) ? setComplexFieldID(elements[parseInt(k.toString(), 10)].getAttribute('name')) :
                        setComplexFieldID(elements[parseInt(k.toString(), 10)].getAttribute('id'));
                    var column = gObj.getColumnByField(field) || { field: field, type: elements[parseInt(k.toString(), 10)].getAttribute('type') };
                    var value = void 0;
                    if (column.type === 'checkbox' || column.type === 'boolean') {
                        value = elements[parseInt(k.toString(), 10)].checked;
                    }
                    else if (elements[parseInt(k.toString(), 10)].value) {
                        value = elements[parseInt(k.toString(), 10)].value;
                        if (elements[parseInt(k.toString(), 10)].ej2_instances &&
                            elements[parseInt(k.toString(), 10)].ej2_instances.length &&
                            !isNullOrUndefined(elements[parseInt(k.toString(), 10)].ej2_instances[0].value)) {
                            elements[parseInt(k.toString(), 10)].blur();
                            value = elements[parseInt(k.toString(), 10)]
                                .ej2_instances[0].value;
                        }
                    }
                    else if (elements[parseInt(k.toString(), 10)].ej2_instances) {
                        value = elements[parseInt(k.toString(), 10)]
                            .ej2_instances[0].value;
                    }
                    if (column.edit && typeof column.edit.read === 'string') {
                        value = getValue(column.edit.read, window)(elements[parseInt(k.toString(), 10)], value);
                    }
                    else if (column.edit && column.edit.read) {
                        value = column.edit.read(elements[parseInt(k.toString(), 10)], value);
                    }
                    value = gObj.editModule.getValueFromType(column, value);
                    if (elements[parseInt(k.toString(), 10)].type === 'radio') {
                        if (elements[parseInt(k.toString(), 10)].checked) {
                            DataUtil.setValue(column.field, value, editedData);
                        }
                    }
                    else {
                        if (typeof value === 'string') {
                            this.parent.sanitize(value);
                        }
                        DataUtil.setValue(column.field, value, editedData);
                    }
                }
            }
            return editedData;
        }
        var col = gObj.columnModel.filter(function (col) { return col.editTemplate; });
        for (var j = 0; j < col.length; j++) {
            if (form[getComplexFieldID(col[parseInt(j.toString(), 10)].field)]) {
                var inputElements = [].slice.call(form[getComplexFieldID(col[parseInt(j.toString(), 10)].field)]);
                inputElements = inputElements.length ? inputElements : [form[getComplexFieldID(col[parseInt(j.toString(), 10)].field)]];
                var temp = inputElements.filter(function (e) {
                    return !isNullOrUndefined((e.ej2_instances));
                });
                if (temp.length === 0) {
                    temp = inputElements.filter(function (e) { return e.hasAttribute('name'); });
                }
                for (var k = 0; k < temp.length; k++) {
                    var value = this.getValue(col[parseInt(j.toString(), 10)], temp[parseInt(k.toString(), 10)], editedData);
                    if (col[parseInt(j.toString(), 10)].type === 'string') {
                        value = this.parent.sanitize(value);
                    }
                    DataUtil.setValue(col[parseInt(j.toString(), 10)].field, value, editedData);
                }
            }
        }
        var inputs = [].slice.call(form.getElementsByClassName('e-field'));
        for (var i = 0, len = inputs.length; i < len; i++) {
            var col_1 = gObj.getColumnByUid(inputs[parseInt(i.toString(), 10)].getAttribute('e-mappinguid'));
            if (col_1 && col_1.field) {
                var value = this.getValue(col_1, inputs[parseInt(i.toString(), 10)], editedData);
                if (col_1.type === 'string') {
                    value = this.parent.sanitize(value);
                }
                DataUtil.setValue(col_1.field, value, editedData);
            }
        }
        return editedData;
    };
    Edit.prototype.getValue = function (col, input, editedData) {
        var value = input.ej2_instances ?
            input.ej2_instances[0].value : input.value;
        var gObj = this.parent;
        var temp = col.edit.read;
        if (col.type === 'checkbox' || col.type === 'boolean') {
            value = input.checked;
        }
        if (typeof temp === 'string') {
            temp = getValue(temp, window);
            value = gObj.editModule.getValueFromType(col, (temp)(input, value));
        }
        else {
            value = gObj.editModule.getValueFromType(col, col.edit.read(input, value));
        }
        if (isNullOrUndefined(editedData[col.field]) && value === '') {
            value = editedData[col.field];
        }
        return value;
    };
    /**
     * @param {NotifyArgs} e - specifies the NotifyArgs
     * @returns {void}
     * @hidden
     */
    Edit.prototype.onActionBegin = function (e) {
        if (e.requestType === 'columnstate' && this.parent.isEdit
            && this.parent.editSettings.mode !== 'Batch') {
            this.closeEdit();
        }
        else {
            var editRow = this.parent.element.querySelector('.' + literals.editedRow);
            var addRow = this.parent.element.querySelector('.' + literals.addedRow);
            if (editRow && this.parent.frozenRows && e.requestType === 'virtualscroll'
                && parseInt(parentsUntil(editRow, literals.row).getAttribute(literals.dataRowIndex), 10) < this.parent.frozenRows) {
                return;
            }
            var restrictedRequestTypes = ['filterafteropen', 'filterbeforeopen', 'filterchoicerequest', 'filtersearchbegin', 'save', 'infiniteScroll', 'virtualscroll'];
            var isRestrict = restrictedRequestTypes.indexOf(e.requestType) === -1;
            var isDestroyVirtualForm = this.parent.enableVirtualization && this.formObj
                && !this.formObj.isDestroyed && (editRow || addRow || e.requestType === 'cancel') && isRestrict;
            if ((!this.parent.enableVirtualization && this.parent.editSettings.mode !== 'Batch' && this.formObj && !this.formObj.isDestroyed
                && isRestrict && !e.cancel) || isDestroyVirtualForm) {
                this.destroyWidgets();
                this.destroyForm();
            }
        }
    };
    /**
     * @param {Column[]} cols - specfies the column
     * @returns {void}
     * @hidden
     */
    Edit.prototype.destroyWidgets = function (cols) {
        var gObj = this.parent;
        if (gObj.editSettings.template) {
            this.parent.destroyTemplate(['editSettingsTemplate']);
            if (this.parent.isReact) {
                this.parent.renderTemplates();
            }
        }
        cols = cols ? cols : this.parent.getCurrentVisibleColumns(this.parent.enableColumnVirtualization);
        if (cols.some(function (column) { return !isNullOrUndefined(column.editTemplate); })) {
            this.parent.destroyTemplate(['editTemplate']);
            if (this.parent.isReact) {
                this.parent.renderTemplates();
            }
        }
        for (var _i = 0, cols_1 = cols; _i < cols_1.length; _i++) {
            var col = cols_1[_i];
            var temp = col.edit.destroy;
            if (col.edit.destroy) {
                if (typeof temp === 'string') {
                    temp = getValue(temp, window);
                    temp();
                }
                else {
                    col.edit.destroy();
                }
            }
        }
        var elements = [].slice.call(this.formObj.element.elements);
        for (var i = 0; i < elements.length; i++) {
            if (elements[parseInt(i.toString(), 10)].hasAttribute('name')) {
                if (elements[parseInt(i.toString(), 10)].ej2_instances &&
                    elements[parseInt(i.toString(), 10)].ej2_instances.length &&
                    !elements[parseInt(i.toString(), 10)].ej2_instances[0].isDestroyed) {
                    elements[parseInt(i.toString(), 10)].ej2_instances[0].destroy();
                }
            }
        }
    };
    /**
     * @returns {void}
     * @hidden
     */
    Edit.prototype.destroyForm = function () {
        this.destroyToolTip();
        var formObjects = [this.formObj, this.mFormObj, this.frFormObj, this.virtualFormObj];
        for (var i = 0; i < formObjects.length; i++) {
            if (formObjects[parseInt(i.toString(), 10)] && formObjects[parseInt(i.toString(), 10)].element
                && !formObjects[parseInt(i.toString(), 10)].isDestroyed) {
                formObjects[parseInt(i.toString(), 10)].destroy();
            }
        }
        this.destroyToolTip();
    };
    /**
     * To destroy the editing.
     *
     * @returns {void}
     * @hidden
     */
    Edit.prototype.destroy = function () {
        var gridElement = this.parent.element;
        if (!gridElement) {
            return;
        }
        var hasGridChild = gridElement.querySelector('.' + literals.gridHeader) &&
            gridElement.querySelector('.' + literals.gridContent) ? true : false;
        if (hasGridChild) {
            this.destroyForm();
        }
        this.removeEventListener();
        var elem = this.dialogObj.element;
        if (elem.childElementCount > 0) {
            this.dialogObj.destroy();
            remove(elem);
        }
        elem = this.alertDObj.element;
        if (elem.childElementCount > 0) {
            this.alertDObj.destroy();
            remove(elem);
        }
        if (!hasGridChild) {
            return;
        }
        if (this.editModule) {
            this.editModule.destroy();
        }
    };
    Edit.prototype.keyPressHandler = function (e) {
        switch (e.action) {
            case 'insert':
                this.addRecord();
                break;
            case 'delete':
                if ((e.target.tagName !== 'INPUT' || e.target.classList.contains('e-checkselect'))
                    && !document.querySelector('.e-popup-open.e-edit-dialog')) {
                    this.deleteRecord();
                }
                break;
            case 'f2':
                this.startEdit();
                break;
            case 'enter':
                if (!parentsUntil(e.target, 'e-unboundcelldiv') && this.parent.editSettings.mode !== 'Batch' &&
                    (parentsUntil(e.target, literals.gridContent) || (this.parent.frozenRows
                        && parentsUntil(e.target, literals.headerContent)))
                    && !document.getElementsByClassName('e-popup-open').length) {
                    e.preventDefault();
                    this.endEdit();
                }
                break;
            case 'escape':
                if (this.parent.isEdit && !this.editCellDialogClose) {
                    if (this.parent.editSettings.mode === 'Batch') {
                        this.editModule.escapeCellEdit();
                    }
                    else {
                        this.curretRowFocus(e);
                    }
                }
                if (this.editCellDialogClose) {
                    this.editCellDialogClose = false;
                }
                break;
            case 'tab':
            case 'shiftTab':
                this.curretRowFocus(e);
                break;
        }
    };
    Edit.prototype.curretRowFocus = function (e) {
        if (this.parent.isEdit && this.parent.editSettings.mode !== 'Batch') {
            var editedRow = parentsUntil(e.target, 'e-editedrow') || parentsUntil(e.target, 'e-addedrow');
            if (editedRow) {
                var selector = editedRow.classList.contains('e-addedrow') ? 'e-addedrow' : 'e-editedrow';
                var focusableEditCells = [].slice.call(editedRow.querySelectorAll('.e-input:not(.e-disabled)'));
                var commandColCell = [].slice.call(editedRow.querySelectorAll('.e-unboundcell'));
                if (commandColCell) {
                    for (var i = 0; i < commandColCell.length; i++) {
                        focusableEditCells = focusableEditCells.concat([].slice
                            .call(commandColCell[parseInt(i.toString(), 10)].querySelectorAll('.e-btn:not(.e-hide)')));
                    }
                }
                if (this.parent.isFrozenGrid()) {
                    if (!isNullOrUndefined(this.parent.frozenRows) && (!isNullOrUndefined(parentsUntil(e.target, 'e-frozenheader')) ||
                        !isNullOrUndefined(parentsUntil(e.target, 'e-movableheader')))) {
                        var movableHeditedRow = this.parent.getHeaderContent().querySelector('.e-movableheader ' + '.' + selector);
                        focusableEditCells.push.apply(focusableEditCells, [].slice.call(movableHeditedRow.querySelectorAll('.e-input:not(.e-disabled)')));
                        if (this.parent.getFrozenMode() === 'Left-Right' || this.parent.getFrozenMode() === 'Right') {
                            var rightHEditRow = this.parent.getHeaderContent().querySelector('.e-frozen-right-header ' + '.' + selector);
                            focusableEditCells.push.apply(focusableEditCells, [].slice.call(rightHEditRow.querySelectorAll('.e-input:not(.e-disabled)')));
                        }
                    }
                    else {
                        var movableEditRow = this.parent.getContent().querySelector('.e-movablecontent ' + '.' + selector);
                        focusableEditCells.push.apply(focusableEditCells, [].slice.call(movableEditRow.querySelectorAll('.e-input:not(.e-disabled)')));
                        if (this.parent.getFrozenMode() === 'Left-Right' || this.parent.getFrozenMode() === 'Right') {
                            var rightFrEditRow = this.parent.getContent().querySelector('.e-frozen-right-content ' + '.' + selector);
                            focusableEditCells.push.apply(focusableEditCells, [].slice.call(rightFrEditRow.querySelectorAll('.e-input:not(.e-disabled)')));
                        }
                    }
                }
                var rowCell = parentsUntil(e.target, 'e-rowcell');
                if ((rowCell === parentsUntil(focusableEditCells[focusableEditCells.length - 1], 'e-rowcell')
                    && e.action === 'tab' && !rowCell.classList.contains('e-unboundcell'))
                    || (rowCell === parentsUntil(focusableEditCells[0], 'e-rowcell') && e.action === 'shiftTab')
                    || e.action === 'escape') {
                    var uid = editedRow.getAttribute('data-uid');
                    var rows = this.parent.getRows();
                    if (this.parent.getFrozenMode() === 'Left-Right' || this.parent.getFrozenMode() === 'Right') {
                        rows = this.parent.getFrozenRightRows();
                    }
                    if (this.parent.getFrozenColumns() || this.parent.getFrozenMode() === 'Left') {
                        rows = this.parent.getMovableRows();
                    }
                    var rowIndex = rows.map(function (m) { return m.getAttribute('data-uid'); }).indexOf(uid);
                    if (this.parent.frozenRows && parentsUntil(editedRow, 'e-content')) {
                        rowIndex = rowIndex - this.parent.frozenRows;
                    }
                    if (editedRow.classList.contains('e-addedrow')) {
                        rowIndex = 0;
                    }
                    if (e.action === 'escape') {
                        this.closeEdit();
                    }
                    else {
                        this.endEdit();
                    }
                    if (this.parent.focusModule.active) {
                        this.parent.focusModule.active.matrix.current = [rowIndex, 0];
                    }
                }
            }
        }
    };
    Edit.prototype.preventBatch = function (args) {
        this.preventObj = args;
        this.showDialog('BatchSaveLostChanges', this.dialogObj);
    };
    Edit.prototype.executeAction = function () {
        this.preventObj.handler.call(this.preventObj.instance, this.preventObj.arg1, this.preventObj.arg2, this.preventObj.arg3, this.preventObj.arg4, this.preventObj.arg5, this.preventObj.arg6, this.preventObj.arg7, this.preventObj.arg8);
    };
    /**
     * @param {Column[]} cols - specifies the column
     * @param {Object} newRule - specifies the new rule object
     * @returns {void}
     * @hidden
     */
    Edit.prototype.applyFormValidation = function (cols, newRule) {
        var gObj = this.parent;
        var frzCols = gObj.isFrozenGrid();
        var isInline = this.parent.editSettings.mode === 'Normal';
        var idx = this.parent.getFrozenMode() === 'Right' && isInline ? 1 : 0;
        var form = this.parent.editSettings.mode !== 'Dialog' ?
            gObj.element.getElementsByClassName('e-gridform')[parseInt(idx.toString(), 10)] :
            select('#' + gObj.element.id + '_dialogEdit_wrapper .e-gridform', document);
        var index = this.parent.getFrozenMode() === 'Right' && isInline ? 0 : 1;
        var mForm = gObj.element.getElementsByClassName('e-gridform')[parseInt(index.toString(), 10)];
        var rules = {};
        var mRules = {};
        var frRules = {};
        cols = cols ? cols : gObj.getColumns();
        for (var i = 0; i < cols.length; i++) {
            if (!cols[parseInt(i.toString(), 10)].visible && (gObj.editSettings.mode !== 'Dialog' || (gObj.groupSettings.columns.indexOf(cols[parseInt(i.toString(), 10)].field) === -1
                && gObj.editSettings.mode === 'Dialog'))) {
                continue;
            }
            if (cols[parseInt(i.toString(), 10)].validationRules && isNullOrUndefined(newRule)) {
                setValidationRuels(cols[parseInt(i.toString(), 10)], index, rules, mRules, frRules, cols.length);
            }
        }
        if (frzCols && this.parent.editSettings.mode !== 'Dialog') {
            this.parent.editModule.mFormObj = this.createFormObj(mForm, mRules);
            if (this.parent.getFrozenMode() === literals.leftRight) {
                var frForm = gObj.element.getElementsByClassName('e-gridform')[2];
                this.parent.editModule.frFormObj = this.createFormObj(frForm, frRules);
            }
        }
        else {
            rules = extend(rules, mRules, frRules);
        }
        this.parent.editModule.formObj = this.createFormObj(form, newRule ? newRule : rules);
    };
    /**
     * @param {HTMLFormElement} form - Defined Form element
     * @param {Object} rules - Defines form rules
     * @returns {FormValidator} Returns formvalidator instance
     * @hidden
     */
    Edit.prototype.createFormObj = function (form, rules) {
        var _this = this;
        return new FormValidator(form, {
            rules: rules,
            locale: this.parent.locale,
            validationComplete: function (args) {
                _this.validationComplete(args);
            },
            customPlacement: function (inputElement, error) {
                var uid = inputElement.getAttribute('e-mappinguid');
                var args = {
                    column: _this.parent.getColumnByUid(uid),
                    error: error,
                    inputElement: inputElement,
                    value: inputElement.value
                };
                _this.valErrorPlacement(inputElement, error);
                _this.parent.notify(events.valCustomPlacement, args);
            }
        });
    };
    Edit.prototype.valErrorPlacement = function (inputElement, error) {
        if (this.parent.isEdit) {
            var id = error.getAttribute('for');
            var elem = this.getElemTable(inputElement).querySelector('#' + getParsedFieldID(id) + '_Error');
            if (!elem) {
                this.createTooltip(inputElement, error, id, '');
            }
            else {
                elem.querySelector('.e-tip-content').innerHTML = error.outerHTML;
            }
        }
    };
    Edit.prototype.getElemTable = function (inputElement) {
        var isFHdr;
        var gObj = this.parent;
        var table;
        if (gObj.editSettings.mode !== 'Dialog') {
            isFHdr = (gObj.frozenRows && gObj.frozenRows
                > (parseInt(closest(inputElement, '.' + literals.row).getAttribute(literals.dataRowIndex), 10) || 0));
            var field = inputElement.name;
            var col = void 0;
            if (field) {
                col = getColumnModelByFieldName(this.parent, setComplexFieldID(field));
            }
            if (col && gObj.isFrozenGrid()) {
                if (col.getFreezeTableName() === 'frozen-left') {
                    table = isFHdr ? gObj.getFrozenVirtualHeader().querySelector('table')
                        : gObj.getFrozenVirtualContent().querySelector('table');
                }
                else if (col.getFreezeTableName() === 'frozen-right') {
                    table = isFHdr ? gObj.getFrozenRightHeader().querySelector('table')
                        : gObj.getFrozenRightContent().querySelector('table');
                }
                else if (col.getFreezeTableName() === 'movable') {
                    table = isFHdr ? gObj.getMovableVirtualHeader().querySelector('table')
                        : gObj.getMovableVirtualContent().querySelector('table');
                }
            }
            else {
                table = isFHdr ? gObj.getHeaderTable() : gObj.getContentTable();
            }
        }
        else {
            table = select('#' + gObj.element.id + '_dialogEdit_wrapper', document);
        }
        return table;
    };
    Edit.prototype.resetElemPosition = function (elem, args) {
        var td = parentsUntil(args.element, literals.rowCell);
        if (td) {
            var tdRight = td.getBoundingClientRect().right;
            var elemRight = elem.getBoundingClientRect().right;
            if (elemRight > tdRight) {
                var offSet = elemRight - tdRight;
                elem.style.left = (elem.offsetLeft - offSet) + 'px';
            }
        }
    };
    Edit.prototype.validationComplete = function (args) {
        if (this.parent.isEdit) {
            var elem = this.getElemTable(args.element).querySelector('#' + getParsedFieldID(args.inputName) + '_Error');
            if (elem) {
                if (args.status === 'failure') {
                    elem.style.display = '';
                    this.resetElemPosition(elem, args);
                }
                else {
                    elem.style.display = 'none';
                }
            }
        }
    };
    /**
     * @returns {void}
     * @hidden
     */
    Edit.prototype.resetMovableContentValidation = function () {
        if (this.isValidationApplied && this.parent.getMovableVirtualContent() &&
            !(this.parent.enableVirtualization || this.parent.enableInfiniteScrolling)) {
            var elem = this.parent.getContent().querySelector('.' + literals.movableContent);
            elem.style.overflowX = 'auto';
            elem.style.overflowY = 'hidden';
            this.isValidationApplied = false;
        }
    };
    Edit.prototype.createTooltip = function (element, error, name, display) {
        var column = this.parent.getColumnByField(name);
        var formObj = this.parent.getFrozenMode() === literals.leftRight && this.parent.editSettings.mode === 'Normal'
            && column.getFreezeTableName() === literals.frozenRight ? this.frFormObj.element : this.formObj.element;
        var customForm = parentsUntil(element, 'e-virtual-validation');
        if (customForm) {
            formObj = this.virtualFormObj.element;
        }
        var gcontent = this.parent.getContent().firstElementChild;
        var frzCols = this.parent.getFrozenColumns() || this.parent.getFrozenLeftColumnsCount()
            || this.parent.getFrozenRightColumnsCount();
        if (frzCols) {
            gcontent = this.parent.getMovableVirtualContent();
        }
        var isScroll = gcontent.scrollHeight > gcontent.clientHeight || gcontent.scrollWidth > gcontent.clientWidth;
        var isInline = this.parent.editSettings.mode !== 'Dialog';
        var td = closest(element, '.' + literals.rowCell);
        var row = closest(element, '.' + literals.row);
        var fCont = this.parent.getContent().querySelector('.' + literals.frozenContent);
        var isFHdr;
        var isFHdrLastRow = false;
        var validationForBottomRowPos;
        var isBatchModeLastRow = false;
        var isSpace = this.parent.editSettings.newRowPosition === 'Bottom' &&
            this.parent.getContent().firstElementChild.offsetHeight > this.parent.getContentTable().scrollHeight;
        var viewPortRowCount = Math.round(this.parent.getContent().clientHeight / this.parent.getRowHeight()) - 1;
        var rows = !fCont ? [].slice.call(this.parent.getContent().getElementsByClassName(literals.row))
            : [].slice.call(this.parent.getFrozenVirtualContent().getElementsByClassName(literals.row));
        if (this.parent.editSettings.mode === 'Batch') {
            if (viewPortRowCount > 1 && rows.length >= viewPortRowCount && !isSpace
                && rows[rows.length - 1].getAttribute(literals.dataRowIndex) === row.getAttribute(literals.dataRowIndex)) {
                isBatchModeLastRow = true;
            }
        }
        if (isInline) {
            if (this.parent.frozenRows) {
                var fHeraderRows = frzCols ? this.parent.getFrozenVirtualHeader().querySelector(literals.tbody).children
                    : this.parent.getHeaderTable().querySelector(literals.tbody).children;
                isFHdr = fHeraderRows.length > (parseInt(row.getAttribute(literals.dataRowIndex), 10) || 0);
                isFHdrLastRow = isFHdr && parseInt(row.getAttribute(literals.dataRowIndex), 10) === fHeraderRows.length - 1;
            }
            if (isFHdrLastRow || (viewPortRowCount > 1 && rows.length >= viewPortRowCount
                && ((this.parent.editSettings.newRowPosition === 'Bottom' && (this.editModule.args
                    && this.editModule.args.requestType === 'add')) || (td.classList.contains('e-lastrowcell')
                    && !row.classList.contains(literals.addedRow)))) || isBatchModeLastRow) {
                validationForBottomRowPos = true;
            }
        }
        var table = isInline ?
            (isFHdr ? this.parent.getHeaderTable() : this.parent.getContentTable()) :
            select('#' + this.parent.element.id + '_dialogEdit_wrapper .e-dlg-content', document);
        var client = table.getBoundingClientRect();
        var left = isInline ?
            this.parent.element.getBoundingClientRect().left : client.left;
        var input = closest(element, 'td');
        var inputClient = input ? input.getBoundingClientRect() : element.parentElement.getBoundingClientRect();
        var div = this.parent.createElement('div', {
            className: 'e-tooltip-wrap e-lib e-control e-popup e-griderror',
            id: name + '_Error',
            styles: 'display:' + display + ';top:' +
                ((isFHdr ? inputClient.top + inputClient.height : inputClient.bottom - client.top
                    - (frzCols ? fCont.scrollTop : 0)) + table.scrollTop + 9) + 'px;left:' +
                (inputClient.left - left + table.scrollLeft + inputClient.width / 2) + 'px;' +
                'max-width:' + inputClient.width + 'px;text-align:center;'
        });
        if (this.parent.cssClass) {
            div.classList.add(this.parent.cssClass);
        }
        if (isInline && client.left < left) {
            div.style.left = parseInt(div.style.left, 10) - client.left + left + 'px';
        }
        var content = this.parent.createElement('div', { className: 'e-tip-content' });
        content.appendChild(error);
        var arrow;
        if (validationForBottomRowPos) {
            arrow = this.parent.createElement('div', { className: 'e-arrow-tip e-tip-bottom' });
            arrow.appendChild(this.parent.createElement('div', { className: 'e-arrow-tip-outer e-tip-bottom' }));
            arrow.appendChild(this.parent.createElement('div', { className: 'e-arrow-tip-inner e-tip-bottom' }));
        }
        else {
            arrow = this.parent.createElement('div', { className: 'e-arrow-tip e-tip-top' });
            arrow.appendChild(this.parent.createElement('div', { className: 'e-arrow-tip-outer e-tip-top' }));
            arrow.appendChild(this.parent.createElement('div', { className: 'e-arrow-tip-inner e-tip-top' }));
        }
        div.appendChild(content);
        div.appendChild(arrow);
        if (!customForm && (frzCols || this.parent.frozenRows) && this.parent.editSettings.mode !== 'Dialog') {
            var getEditCell = this.parent.editSettings.mode === 'Normal' ?
                closest(element, '.e-editcell') : closest(element, '.' + literals.table);
            getEditCell.style.position = 'relative';
            div.style.position = 'absolute';
            if (this.parent.editSettings.mode === 'Batch' ||
                (closest(element, '.' + literals.frozenContent) || closest(element, '.' + literals.frozenHeader))
                || (this.parent.frozenRows && !frzCols)) {
                formObj.appendChild(div);
            }
            else {
                this.mFormObj.element.appendChild(div);
            }
        }
        else {
            if (customForm) {
                this.virtualFormObj.element.appendChild(div);
            }
            else {
                this.formObj.element.appendChild(div);
            }
        }
        if (!validationForBottomRowPos && isInline && gcontent.getBoundingClientRect().bottom < inputClient.bottom + inputClient.height) {
            var contentDiv = this.parent.getContent().querySelector('.e-content');
            if (frzCols && this.parent.currentViewData.length === 0 && contentDiv.scrollTop === 0) {
                contentDiv.scrollTop = div.offsetHeight + arrow.scrollHeight;
            }
            else {
                gcontent.scrollTop = gcontent.scrollTop + div.offsetHeight + arrow.scrollHeight;
            }
        }
        var lineHeight = parseInt(document.defaultView.getComputedStyle(div, null).getPropertyValue('font-size'), 10);
        if (div.getBoundingClientRect().width < inputClient.width &&
            div.querySelector('label').getBoundingClientRect().height / (lineHeight * 1.2) >= 2) {
            div.style.width = div.style.maxWidth;
        }
        if ((frzCols || this.parent.frozenRows) && this.parent.editSettings.mode !== 'Dialog') {
            div.style.left = input.offsetLeft + (input.offsetWidth / 2 - div.offsetWidth / 2) + 'px';
        }
        else {
            div.style.left = (parseInt(div.style.left, 10) - div.offsetWidth / 2) + 'px';
        }
        if (isInline && !isScroll && !this.parent.allowPaging || frzCols || this.parent.frozenRows) {
            gcontent.style.position = 'static';
            var pos = calculateRelativeBasedPosition(input, div);
            div.style.top = pos.top + inputClient.height + 9 + 'px';
        }
        if (closest(element, '.' + literals.movableContent) && !this.parent.enableVirtualization && !this.parent.enableInfiniteScrolling) {
            var elem = this.parent.getContent().querySelector('.' + literals.movableContent);
            elem.style.overflowX = 'visible';
            elem.style.overflowY = 'visible';
            this.isValidationApplied = true;
        }
        if (validationForBottomRowPos) {
            if (isScroll && !frzCols && this.parent.height !== 'auto' && !this.parent.frozenRows
                && !this.parent.enableVirtualization) {
                var scrollWidth = gcontent.scrollWidth > gcontent.offsetWidth ? getScrollBarWidth() : 0;
                var gHeight = this.parent.height.toString().indexOf('%') === -1 ?
                    parseInt(this.parent.height, 10) : gcontent.offsetHeight;
                div.style.bottom = (gHeight - gcontent.querySelector('table').offsetHeight
                    - scrollWidth) + inputClient.height + 9 + 'px';
            }
            else {
                div.style.bottom = inputClient.height + 9 + 'px';
            }
            if (rows.length < viewPortRowCount && this.parent.editSettings.newRowPosition === 'Bottom' && (this.editModule.args
                && this.editModule.args.requestType === 'add')) {
                var rowsCount = this.parent.frozenRows ? this.parent.frozenRows + (rows.length - 1) : rows.length - 1;
                var rowsHeight = rowsCount * this.parent.getRowHeight();
                var position = this.parent.getContent().clientHeight - rowsHeight;
                div.style.bottom = position + 9 + 'px';
            }
            div.style.top = null;
        }
    };
    /**
     * @param {Column} col - specfies the column
     * @returns {boolean} returns the whether column is grouped
     * @hidden
     */
    Edit.prototype.checkColumnIsGrouped = function (col) {
        return !col.visible && !(this.parent.groupSettings.columns.indexOf(col.field) > -1);
    };
    /**
     * @param {object} editors -specfies the editors
     * @returns {void}
     * @hidden
     */
    Edit.AddEditors = function (editors) {
        Edit.editCellType = extend(Edit.editCellType, editors);
    };
    Edit.editCellType = {
        'dropdownedit': DropDownEditCell, 'numericedit': NumericEditCell,
        'datepickeredit': DatePickerEditCell, 'datetimepickeredit': DatePickerEditCell,
        'booleanedit': BooleanEditCell, 'defaultedit': DefaultEditCell,
        'templateedit': TemplateEditCell
    };
    return Edit;
}());
export { Edit };
