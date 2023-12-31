import { remove, extend, isNullOrUndefined, createElement, getValue, setValue, closest, SanitizeHtmlHelper } from '@syncfusion/ej2-base';
import { DataManager, DataUtil } from '@syncfusion/ej2-data';
import { Dialog } from '@syncfusion/ej2-popups';
import { Tab } from '@syncfusion/ej2-navigations';
import { Grid, Edit, Toolbar as GridToolbar, Page, getObject } from '@syncfusion/ej2-grids';
import { ForeignKey, getActualProperties } from '@syncfusion/ej2-grids';
import { RichTextEditor, Toolbar as RTEToolbar, Link, HtmlEditor, QuickToolbar, Count } from '@syncfusion/ej2-richtexteditor';
import { TextBox, NumericTextBox, MaskedTextBox, FormValidator } from '@syncfusion/ej2-inputs';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { DatePicker, DateTimePicker } from '@syncfusion/ej2-calendars';
import { DropDownList, ComboBox } from '@syncfusion/ej2-dropdowns';
import { isScheduledTask } from '../base/utils';
import { TreeGrid, Selection, Filter, Edit as TreeGridEdit, VirtualScroll } from '@syncfusion/ej2-treegrid';
import { getUid } from '../base/utils';
/**
 *
 * @hidden
 */
var DialogEdit = /** @class */ (function () {
    /**
     * Constructor for render module
     *
     * @param {Gantt} parent .
     * @returns {void} .
     */
    function DialogEdit(parent) {
        /**
         * @private
         */
        this.updatedEditFields = null;
        this.updatedAddFields = null;
        this.addedRecord = null;
        this.dialogEditValidationFlag = false;
        this.ganttResources = [];
        this.isValidData = true;
        /**
         * @private
         */
        this.previousResource = [];
        /**
         * @private
         */
        this.isResourceUpdate = false;
        this.parent = parent;
        this.localeObj = this.parent.localeObj;
        this.beforeOpenArgs = { cancel: false };
        this.types = this.getPredecessorType();
        this.rowData = {};
        this.editedRecord = {};
        this.inputs = {
            booleanedit: CheckBox,
            dropdownedit: DropDownList,
            datepickeredit: DatePicker,
            datetimepickeredit: DateTimePicker,
            maskededit: MaskedTextBox,
            numericedit: NumericTextBox,
            stringedit: TextBox,
            defaultedit: TextBox
        };
        this.processDialogFields();
        this.wireEvents();
    }
    DialogEdit.prototype.wireEvents = function () {
        this.parent.on('chartDblClick', this.dblClickHandler, this);
    };
    DialogEdit.prototype.dblClickHandler = function (e) {
        var ganttData = this.parent.ganttChartModule.getRecordByTarget(e);
        if (!isNullOrUndefined(ganttData) && this.parent.editModule && this.parent.editSettings.allowEditing) {
            this.openEditDialog(ganttData);
        }
    };
    /**
     * Method to validate add and edit dialog fields property.
     *
     * @returns {void} .
     * @private
     */
    DialogEdit.prototype.processDialogFields = function () {
        if (isNullOrUndefined(this.parent.editDialogFields) ||
            this.parent.editDialogFields && this.parent.editDialogFields.length === 0) {
            this.updatedEditFields = this.getDefaultDialogFields();
            this.updatedEditFields = this.validateDialogFields(this.updatedEditFields);
        }
        else {
            this.updatedEditFields = this.validateDialogFields(this.parent.editDialogFields);
        }
        if (isNullOrUndefined(this.parent.addDialogFields) ||
            this.parent.addDialogFields && this.parent.addDialogFields.length === 0) {
            this.updatedAddFields = this.getDefaultDialogFields();
            this.updatedAddFields = this.validateDialogFields(this.updatedAddFields);
        }
        else {
            this.updatedAddFields = this.validateDialogFields(this.parent.addDialogFields);
        }
    };
    DialogEdit.prototype.validateDialogFields = function (dialogFields) {
        var newDialogFields = [];
        var emptyCustomColumn = 0;
        for (var i = 0; i < dialogFields.length; i++) {
            var fieldItem = getActualProperties(dialogFields[i]);
            if (fieldItem.type === 'General' && (isNullOrUndefined(fieldItem.fields) || fieldItem.fields.length === 0)) {
                fieldItem.fields = this.getGeneralColumnFields();
            }
            if (fieldItem.type === 'Dependency' && isNullOrUndefined(this.parent.taskFields.dependency)
                || fieldItem.type === 'Resources' && isNullOrUndefined(this.parent.taskFields.resourceInfo)
                || fieldItem.type === 'Notes' && isNullOrUndefined(this.parent.taskFields.notes)) {
                continue;
            }
            if (fieldItem.type === 'Custom' && (isNullOrUndefined(fieldItem.fields) || fieldItem.fields.length === 0)) {
                emptyCustomColumn += 1;
                fieldItem.fields = this.getCustomColumnFields();
            }
            if (emptyCustomColumn > 1) {
                continue;
            }
            newDialogFields.push(fieldItem);
        }
        return newDialogFields;
    };
    /**
     * Method to get general column fields
     *
     * @returns {string[]} .
     */
    DialogEdit.prototype.getGeneralColumnFields = function () {
        var fields = [];
        for (var _i = 0, _a = Object.keys(this.parent.columnMapping); _i < _a.length; _i++) {
            var key = _a[_i];
            if (key === 'dependency' || key === 'resourceInfo' || key === 'notes') {
                continue;
            }
            fields.push(this.parent.columnMapping[key]);
        }
        return fields;
    };
    /**
     * Method to get custom column fields
     *
     * @returns {void} .
     */
    DialogEdit.prototype.getCustomColumnFields = function () {
        var fields = [];
        for (var i = 0; i < this.parent.customColumns.length; i++) {
            fields.push(this.parent.customColumns[i]);
        }
        return fields;
    };
    /**
     * Get default dialog fields when fields are not defined for add and edit dialogs
     *
     * @returns {AddDialogFieldSettings} .
     */
    DialogEdit.prototype.getDefaultDialogFields = function () {
        var dialogFields = [];
        var fieldItem = {};
        var taskFields = this.parent.taskFields;
        var columnMapping = this.parent.columnMapping;
        if (Object.keys(columnMapping).length !== 0) {
            fieldItem.type = 'General';
            dialogFields.push(fieldItem);
        }
        if (!isNullOrUndefined(getValue('dependency', columnMapping))) {
            fieldItem = {};
            if (this.parent.columnByField[columnMapping.dependency.valueOf()].visible !== false) {
                fieldItem.type = 'Dependency';
            }
            dialogFields.push(fieldItem);
        }
        if (!isNullOrUndefined(getValue('resourceInfo', columnMapping))) {
            fieldItem = {};
            if (this.parent.columnByField[columnMapping.resourceInfo.valueOf()].visible !== false) {
                fieldItem.type = 'Resources';
            }
            dialogFields.push(fieldItem);
        }
        if (!isNullOrUndefined(getValue('notes', columnMapping))) {
            fieldItem = {};
            if (this.parent.columnByField[columnMapping.notes.valueOf()].visible !== false) {
                fieldItem.type = 'Notes';
            }
            dialogFields.push(fieldItem);
        }
        if (!isNullOrUndefined(getValue('segments', taskFields))) {
            fieldItem = {};
            fieldItem.type = 'Segments';
            dialogFields.push(fieldItem);
        }
        if (this.parent.customColumns.length > 0) {
            fieldItem = {};
            fieldItem.type = 'Custom';
            dialogFields.push(fieldItem);
        }
        return dialogFields;
    };
    /**
     * @returns {void} .
     * @private
     */
    DialogEdit.prototype.openAddDialog = function () {
        this.isEdit = false;
        this.editedRecord = this.composeAddRecord();
        this.createDialog();
    };
    /**
     *
     * @returns {Date} .
     * @private
     */
    DialogEdit.prototype.getMinimumStartDate = function () {
        var minDate = DataUtil.aggregates.min(this.parent.flatData, 'ganttProperties.startDate');
        if (!isNullOrUndefined(minDate)) {
            minDate = new Date(minDate.getTime());
        }
        else {
            minDate = new Date(this.parent.timelineModule.timelineStartDate.getTime());
        }
        minDate = this.parent.dateValidationModule.checkStartDate(minDate);
        return new Date(minDate.getTime());
    };
    /**
     * @returns {IGanttData} .
     * @private
     */
    DialogEdit.prototype.composeAddRecord = function () {
        var tempData = {};
        tempData.ganttProperties = {};
        var columns = this.parent.ganttColumns;
        var taskSettings = this.parent.taskFields;
        var id = this.parent.editModule.getNewTaskId();
        for (var i = 0; i < columns.length; i++) {
            var field = columns[i].field;
            if (field === taskSettings.id) {
                tempData[field] = id;
                tempData.ganttProperties.rowUniqueID = tempData[field];
            }
            else if (columns[i].field === taskSettings.startDate) {
                if (isNullOrUndefined(tempData[taskSettings.endDate])) {
                    tempData[field] = this.getMinimumStartDate();
                }
                else {
                    tempData[field] = new Date(tempData[taskSettings.endDate]);
                }
                if (this.parent.timezone) {
                    tempData[field] = this.parent.dateValidationModule.remove(tempData[field], this.parent.timezone);
                }
                tempData.ganttProperties.startDate = new Date(tempData[field]);
            }
            else if (columns[i].field === taskSettings.endDate) {
                if (isNullOrUndefined(tempData[taskSettings.startDate])) {
                    tempData[field] = this.getMinimumStartDate();
                }
                else {
                    tempData[field] = new Date(tempData[taskSettings.startDate]);
                }
                if (this.parent.timezone) {
                    tempData[field] = this.parent.dateValidationModule.remove(tempData[field], this.parent.timezone);
                }
                tempData.ganttProperties.endDate = new Date(tempData[field]);
            }
            else if (columns[i].field === taskSettings.duration) {
                tempData[field] = 1;
                tempData.ganttProperties.duration = tempData[field];
                tempData.ganttProperties.durationUnit = this.parent.durationUnit.toLocaleLowerCase();
            }
            else if (columns[i].field === taskSettings.name) {
                tempData[field] = this.localeObj.getConstant('addDialogTitle') + ' ' + id;
                tempData.ganttProperties.taskName = tempData[field];
            }
            else if (columns[i].field === taskSettings.progress) {
                tempData[field] = 0;
                tempData.ganttProperties.progress = tempData[field];
            }
            else if (columns[i].field === taskSettings.work) {
                tempData[field] = 0;
                tempData.ganttProperties.work = tempData[field];
            }
            else if (columns[i].field === taskSettings.type) {
                tempData[field] = this.parent.taskType;
                tempData.ganttProperties.taskType = tempData[field];
            }
            else {
                tempData[this.parent.ganttColumns[i].field] = '';
            }
        }
        tempData.ganttProperties.isAutoSchedule = (this.parent.taskMode === 'Auto') ? true :
            (this.parent.taskMode === 'Manual') ? false :
                tempData[taskSettings.manual] === true ? false : true;
        return tempData;
    };
    /**
     * @returns {void} .
     * @private
     */
    DialogEdit.prototype.openToolbarEditDialog = function () {
        var gObj = this.parent;
        if (gObj.editModule && gObj.editSettings.allowEditing) {
            if (this.parent.ganttChartModule.focusedRowIndex > -1 && gObj.selectionModule) {
                gObj.selectionModule.selectRow(this.parent.ganttChartModule.focusedRowIndex, false, false);
            }
            var selectedRowId = gObj.selectionModule ?
                (gObj.selectionSettings.mode === 'Row' || gObj.selectionSettings.mode === 'Both') &&
                    gObj.selectionModule.selectedRowIndexes.length === 1 ?
                    gObj.updatedRecords[gObj.selectionModule.selectedRowIndexes[0]].ganttProperties.rowUniqueID :
                    gObj.selectionSettings.mode === 'Cell' &&
                        gObj.selectionModule.getSelectedRowCellIndexes().length === 1 ?
                        gObj.updatedRecords[gObj.selectionModule.getSelectedRowCellIndexes()[0].rowIndex].ganttProperties.rowUniqueID :
                        null : null;
            if (!isNullOrUndefined(selectedRowId)) {
                this.openEditDialog(selectedRowId);
            }
        }
    };
    /**
     * @param { number | string | object} taskId .
     * @returns {void} .
     * @private
     */
    DialogEdit.prototype.openEditDialog = function (taskId) {
        var ganttObj = this.parent;
        if (!isNullOrUndefined(taskId)) {
            if (!isNullOrUndefined(taskId['ganttProperties'])) {
                if (typeof taskId['ganttProperties']['taskId'] === 'string') {
                    this.numericOrString = 'stringedit';
                }
                else {
                    this.numericOrString = 'numericedit';
                }
            }
            if (isNullOrUndefined(taskId['ganttProperties']) && !isNullOrUndefined(taskId)) {
                if (isNaN(Number(taskId)) || this.parent.columnByField[this.parent.taskFields.id].editType === "stringedit") {
                    this.numericOrString = 'stringedit';
                }
                else {
                    this.numericOrString = 'numericedit';
                }
            }
        }
        if (typeof taskId === 'object' && !isNullOrUndefined(taskId)) {
            this.rowIndex = this.parent.currentViewData.indexOf(taskId);
            if (this.rowIndex > -1) {
                this.rowData = taskId;
            }
        }
        else if (!isNullOrUndefined(taskId)) {
            this.rowIndex = ganttObj.ids.indexOf(taskId.toString());
            if (this.rowIndex > -1) {
                this.rowData = ganttObj.flatData[this.rowIndex];
            }
        }
        else if (ganttObj.selectedRowIndex > -1) {
            this.rowData = ganttObj.currentViewData[ganttObj.selectedRowIndex];
            this.rowIndex = ganttObj.selectedRowIndex;
        }
        this.isEdit = true;
        if (this.parent.viewType === 'ResourceView' && this.rowData.level === 0) {
            return;
        }
        if (Object.keys(this.rowData).length !== 0) {
            this.editedRecord = extend({}, {}, this.rowData, true);
            this.createDialog();
        }
    };
    DialogEdit.prototype.createDialog = function () {
        var _this = this;
        var ganttObj = this.parent;
        var dialogModel = {};
        this.beforeOpenArgs.dialogModel = dialogModel;
        this.beforeOpenArgs.rowData = this.editedRecord;
        this.beforeOpenArgs.rowIndex = this.rowIndex;
        var dialogMaxWidth = this.parent.isAdaptive ? '' : '600px';
        var dialog = this.parent.createElement('div', { id: ganttObj.element.id + '_dialog', styles: 'max-width:' + dialogMaxWidth });
        dialog.classList.add('e-gantt-dialog');
        ganttObj.element.appendChild(dialog);
        dialogModel.animationSettings = { effect: 'None' };
        dialogModel.header = this.localeObj.getConstant(this.isEdit ? 'editDialogTitle' : 'addDialogTitle');
        dialogModel.isModal = true;
        dialogModel.enableRtl = this.parent.enableRtl;
        dialogModel.allowDragging = this.parent.isAdaptive ? false : true;
        dialogModel.showCloseIcon = true;
        var position = this.parent.isAdaptive ? { X: 'top', Y: 'left' } : { X: 'center', Y: 'center' };
        dialogModel.position = position;
        //dialogModel.width = '750px';
        dialogModel.height = this.parent.isAdaptive ? '100%' : 'auto';
        dialogModel.target = document.body;
        dialogModel.close = this.dialogClose.bind(this);
        dialogModel.closeOnEscape = true;
        dialogModel.beforeClose = function (args) {
            if (args.closedBy === "escape") {
                if (args.event.name === "key-pressed" && args.event.target.nodeName === 'INPUT') {
                    args.cancel = true;
                }
            }
        };
        dialogModel.open = function (args) {
            var dialogElement = getValue('element', args);
            var generalTabElement = dialogElement.querySelector('#' + _this.parent.element.id + 'GeneralTabContainer');
            if (generalTabElement && generalTabElement.scrollHeight > generalTabElement.offsetHeight) {
                generalTabElement.classList.add('e-scroll');
            }
            if (_this.tabObj.selectedItem === 0) {
                _this.tabObj.select(0);
            }
            if (_this.parent.isAdaptive) {
                dialogElement.style.maxHeight = 'none';
            }
            if (_this.parent.focusModule) {
                _this.parent.focusModule.setActiveElement(dialogElement);
            }
        };
        dialogModel.locale = this.parent.locale;
        dialogModel.buttons = [{
                buttonModel: {
                    content: this.localeObj.getConstant('saveButton'), cssClass: 'e-primary'
                },
                click: this.buttonClick.bind(this)
            }, {
                buttonModel: { cssClass: 'e-flat', content: this.localeObj.getConstant('cancel') },
                click: this.buttonClick.bind(this)
            }];
        this.createTab(dialogModel, dialog);
    };
    DialogEdit.prototype.buttonClick = function (e) {
        var target = e.target;
        target.style.pointerEvents = 'none';
        if ((this.localeObj.getConstant('cancel')).toLowerCase() === e.target.innerText.trim().toLowerCase()) {
            if (this.dialog && !this.dialogObj.isDestroyed) {
                this.dialogObj.hide();
                this.dialogClose();
            }
        }
        else {
            this.initiateDialogSave();
            target.style.pointerEvents = 'auto';
        }
    };
    /**
     * @returns {void} .
     * @private
     */
    DialogEdit.prototype.dialogClose = function () {
        if (this.dialog) {
            this.resetValues();
        }
        if (!isNullOrUndefined(this.parent.focusModule) &&
            !isNullOrUndefined(this.parent.focusModule.getActiveElement(true))) {
            this.parent.focusModule.getActiveElement(true).focus();
        }
    };
    DialogEdit.prototype.resetValues = function () {
        this.isEdit = false;
        this.isAddNewResource = false;
        this.editedRecord = {};
        this.rowData = {};
        this.rowIndex = -1;
        this.addedRecord = null;
        this.ganttResources = [];
        this.dialogEditValidationFlag = false;
        if (this.dialog && !this.dialogObj.isDestroyed) {
            this.destroyDialogInnerElements();
            this.dialogObj.destroy();
            remove(this.dialog);
        }
    };
    DialogEdit.prototype.destroyDialogInnerElements = function () {
        var ganttObj = this.parent;
        var tabModel = this.beforeOpenArgs.tabModel;
        var items = tabModel.items;
        for (var i = 0; i < items.length; i++) {
            var element = items[i].content;
            var id = element.id;
            if (!isNullOrUndefined(id) || id !== '') {
                id = id.replace(ganttObj.element.id, '');
                id = id.replace('TabContainer', '');
                if (id === 'General') {
                    this.destroyCustomField(element);
                }
                else if (id === 'Dependency') {
                    var gridObj = element.ej2_instances[0];
                    gridObj.destroy();
                }
                else if (id === 'Notes') {
                    var rte = element.ej2_instances[0];
                    rte.destroy();
                }
                else if (id === 'Resources') {
                    var treeGridObj = element.ej2_instances[0];
                    treeGridObj.destroy();
                }
                else if (id.indexOf('Custom') !== -1) {
                    this.destroyCustomField(element);
                }
            }
        }
    };
    DialogEdit.prototype.destroyCustomField = function (element) {
        var childNodes = element.childNodes;
        var ganttObj = this.parent;
        for (var i = 0; i < childNodes.length; i++) {
            var div = childNodes[i];
            var inputElement = div.querySelector('input[id^="' + ganttObj.element.id + '"]');
            if (inputElement) {
                var fieldName = inputElement.id.replace(ganttObj.element.id, '');
                /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                var controlObj = div.querySelector('#' + ganttObj.element.id + fieldName).ej2_instances[0];
                if (!isNullOrUndefined(controlObj)) {
                    var column = ganttObj.columnByField[fieldName];
                    if (!isNullOrUndefined(column.edit) && isNullOrUndefined(column.edit.params)) {
                        var destroy = column.edit.destroy;
                        if (typeof destroy === 'string') {
                            destroy = getObject(destroy, window);
                            destroy();
                        }
                        else {
                            column.edit.destroy();
                        }
                    }
                    else {
                        controlObj.destroy();
                    }
                }
            }
        }
    };
    /**
     * @returns {void} .
     * @private
     */
    DialogEdit.prototype.destroy = function () {
        this.resetValues();
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off('chartDblClick', this.dblClickHandler);
        this.parent.editModule.dialogModule = undefined;
    };
    /**
     * Method to get current edit dialog fields value
     *
     * @returns {AddDialogFieldSettings} .
     */
    DialogEdit.prototype.getEditFields = function () {
        if (this.isEdit) {
            return this.updatedEditFields;
        }
        else {
            return this.updatedAddFields;
        }
    };
    DialogEdit.prototype.createTab = function (dialogModel, dialog) {
        var _this = this;
        var ganttObj = this.parent;
        var tabModel = {};
        var tabItems = [];
        var dialogSettings = this.getEditFields();
        var tabElement;
        var tasks = ganttObj.taskFields;
        var length = dialogSettings.length;
        tabModel.items = tabItems;
        tabModel.locale = this.parent.locale;
        tabModel.enableRtl = this.parent.enableRtl;
        this.beforeOpenArgs.tabModel = tabModel;
        var count = 0;
        var index = 0;
        if (length > 0) {
            for (var i = 0; i < length; i++) {
                var dialogField = dialogSettings[i];
                var tabItem = {};
                if (dialogField.type === 'General') {
                    if (Object.keys(ganttObj.columnMapping).length === 0) {
                        continue;
                    }
                    if (isNullOrUndefined(dialogField.headerText)) {
                        dialogField.headerText = this.localeObj.getConstant('generalTab');
                    }
                    tabItem.content = 'General';
                    this.beforeOpenArgs[tabItem.content] = this.getFieldsModel(dialogField.fields);
                }
                else if (dialogField.type === 'Segments') {
                    if (isNullOrUndefined(tasks.segments)) {
                        continue;
                    }
                    if (isNullOrUndefined(dialogField.headerText)) {
                        dialogField.headerText = this.localeObj.getConstant('segments');
                    }
                    tabItem.content = 'Segments';
                    this.beforeOpenArgs[tabItem.content] = this.getSegmentsModel(dialogField.fields);
                }
                else if (dialogField.type === 'Dependency') {
                    if (isNullOrUndefined(tasks.dependency)) {
                        continue;
                    }
                    if (isNullOrUndefined(dialogField.headerText)) {
                        dialogField.headerText = this.localeObj.getConstant('dependency');
                    }
                    tabItem.content = 'Dependency';
                    this.beforeOpenArgs[tabItem.content] = this.getPredecessorModel(dialogField.fields);
                }
                else if (dialogField.type === 'Resources') {
                    if (isNullOrUndefined(tasks.resourceInfo)) {
                        continue;
                    }
                    if (isNullOrUndefined(dialogField.headerText)) {
                        dialogField.headerText = this.localeObj.getConstant('resourceName');
                    }
                    tabItem.content = 'Resources';
                    this.beforeOpenArgs[tabItem.content] = this.getResourcesModel(dialogField.fields);
                }
                else if (dialogField.type === 'Notes') {
                    if (isNullOrUndefined(tasks.notes)) {
                        continue;
                    }
                    if (isNullOrUndefined(dialogField.headerText)) {
                        dialogField.headerText = this.localeObj.getConstant('notes');
                    }
                    tabItem.content = 'Notes';
                    this.beforeOpenArgs[tabItem.content] = this.getNotesModel(dialogField.fields);
                }
                else {
                    if (isNullOrUndefined(dialogField.fields) || dialogField.fields.length === 0) {
                        continue;
                    }
                    if (isNullOrUndefined(dialogField.headerText)) {
                        dialogField.headerText = this.localeObj.getConstant('customTab'); // eslint-disable-next-line
                        count++;
                    }
                    tabItem.content = 'Custom' + '' + index++;
                    this.beforeOpenArgs[tabItem.content] = this.getFieldsModel(dialogField.fields);
                }
                tabItem.header = { text: dialogField.headerText };
                tabItems.push(tabItem);
            }
        }
        this.beforeOpenArgs.requestType = this.isEdit ? 'beforeOpenEditDialog' : 'beforeOpenAddDialog';
        var args = {
            rowData: this.beforeOpenArgs.rowData,
            name: this.beforeOpenArgs.name,
            requestType: this.beforeOpenArgs.requestType,
            cancel: this.beforeOpenArgs.cancel
        };
        this.parent.trigger('actionBegin', this.beforeOpenArgs, function (arg) {
            if (!isNullOrUndefined(_this.parent.loadingIndicator) && _this.parent.loadingIndicator.indicatorType === "Shimmer") {
                _this.parent.showMaskRow();
            }
            else {
                _this.parent.showSpinner();
            }
            _this.renderTabItems();
            if (!arg.cancel) {
                tabModel.selected = _this.tabSelectedEvent.bind(_this);
                tabModel.height = _this.parent.isAdaptive ? '100%' : 'auto';
                tabModel.overflowMode = 'Scrollable';
                _this.tabObj = new Tab(tabModel);
                _this.tabObj.isStringTemplate = true;
                tabElement = _this.parent.createElement('div', { id: ganttObj.element.id + '_Tab' });
                _this.tabObj.appendTo(tabElement);
                dialogModel.content = tabElement;
                _this.dialog = dialog;
                _this.dialogObj = new Dialog(dialogModel);
                _this.dialogObj.isStringTemplate = true;
                _this.dialogObj.appendTo(_this.dialog);
                var actionCompleteArgs = {
                    action: 'OpenDialog',
                    requestType: _this.isEdit ? 'openEditDialog' : 'openAddDialog',
                    data: _this.beforeOpenArgs.rowData,
                    element: _this.dialog,
                    cancel: false
                };
                _this.parent.trigger('actionComplete', actionCompleteArgs, function (actionCompleteArg) {
                    if (!isNullOrUndefined(_this.parent.loadingIndicator) && _this.parent.loadingIndicator.indicatorType === "Shimmer") {
                        _this.parent.hideMaskRow();
                    }
                    else {
                        _this.parent.hideSpinner();
                    }
                    if (actionCompleteArg.cancel) {
                        _this.resetValues();
                    }
                });
            }
        });
    };
    DialogEdit.prototype.tabSelectedEvent = function (args) {
        var ganttObj = this.parent;
        var id = args.selectedContent.childNodes[0].id;
        if (this.parent.isAdaptive) {
            this.responsiveTabContent(id, ganttObj);
        }
        if (id === ganttObj.element.id + 'ResourcesTabContainer') {
            this.resourceSelection(id);
        }
        else if (id === ganttObj.element.id + 'NotesTabContainer') {
            document.getElementById(id).ej2_instances[0].refresh();
            var notesTabElement = document.querySelector('#' + this.parent.element.id + 'NotesTabContainer');
            notesTabElement.style.overflow = 'scroll';
        }
        else if (id === ganttObj.element.id + 'SegmentsTabContainer') {
            if (isNullOrUndefined(this.beforeOpenArgs.rowData.ganttProperties.startDate)) {
                document.getElementById(id).ej2_instances[0]
                    .enableToolbarItems([this.parent.element.id + 'SegmentsTabContainer' + '_add'], false);
            }
            else {
                document.getElementById(id).ej2_instances[0]
                    .enableToolbarItems([this.parent.element.id + 'SegmentsTabContainer' + '_add'], true);
            }
        }
    };
    DialogEdit.prototype.responsiveTabContent = function (id, ganttObj) {
        var dialogContent = document.getElementById(ganttObj.element.id + '_dialog_dialog-content');
        var dialogContentHeight = dialogContent.clientHeight;
        dialogContentHeight -= dialogContent.querySelector('.e-tab-header').offsetHeight;
        var grid = document.querySelector('#' + id);
        if (grid.classList.contains('e-grid')) {
            dialogContentHeight -= grid.ej2_instances[0].getHeaderContent().offsetHeight;
            var toolbar_1 = grid.querySelector('.e-toolbar');
            if (toolbar_1) {
                dialogContentHeight -= toolbar_1.offsetHeight;
            }
        }
        grid.parentElement.style.height = dialogContentHeight + 'px';
    };
    DialogEdit.prototype.getFieldsModel = function (fields) {
        var fieldsModel = {};
        var columnByField = this.parent.columnByField;
        for (var i = 0; i < fields.length; i++) {
            if (fields[i] === this.parent.taskFields.dependency ||
                fields[i] === this.parent.taskFields.resourceInfo ||
                fields[i] === this.parent.taskFields.notes) {
                continue;
            }
            if (!isNullOrUndefined(columnByField[fields[i]])) {
                var fieldName = fields[i];
                this.createInputModel(columnByField[fieldName], fieldsModel);
            }
        }
        return fieldsModel;
    };
    DialogEdit.prototype.createInputModel = function (column, fieldsModel) {
        var _this = this;
        var ganttObj = this.parent;
        var locale = this.parent.locale;
        var taskSettings = this.parent.taskFields;
        var common = {
            placeholder: column.headerText,
            floatLabelType: 'Auto'
        };
        if (!isNullOrUndefined(this.parent.taskFields.id) && !isNullOrUndefined(this.parent.columnMapping.id)
            && !isNullOrUndefined(this.numericOrString)) {
            if (taskSettings.id === column.field) {
                column.editType = this.numericOrString;
            }
        }
        ;
        switch (column.editType) {
            case 'booleanedit':
                {
                    var checkboxModel = {
                        label: column.headerText,
                        locale: locale,
                        enableRtl: this.parent.enableRtl
                    };
                    fieldsModel[column.field] = checkboxModel;
                    break;
                }
            case 'defaultedit':
            case 'stringedit':
                {
                    var textBox = common;
                    textBox.enableRtl = this.parent.enableRtl;
                    if (column.field === ganttObj.columnMapping.duration || column.field === ganttObj.columnMapping.id || column.field === ganttObj.columnMapping.startDate ||
                        column.field === ganttObj.columnMapping.endDate) {
                        textBox.change = function (args) {
                            _this.validateScheduleFields(args, column, ganttObj);
                        };
                    }
                    fieldsModel[column.field] = common;
                    break;
                }
            case 'numericedit':
                {
                    var numeric = common;
                    numeric.enableRtl = this.parent.enableRtl;
                    if (taskSettings.progress === column.field) {
                        numeric.min = 0;
                        numeric.max = 100;
                    }
                    if (taskSettings.work === column.field) {
                        numeric.change = function (args) {
                            _this.validateScheduleFields(args, column, ganttObj);
                        };
                    }
                    fieldsModel[column.field] = numeric;
                    break;
                }
            case 'datepickeredit':
                {
                    var datePickerObj = common;
                    datePickerObj.format = this.parent.getDateFormat();
                    datePickerObj.enableRtl = this.parent.enableRtl;
                    datePickerObj.strictMode = true;
                    datePickerObj.firstDayOfWeek = ganttObj.timelineModule.customTimelineSettings.weekStartDay;
                    if (column.field === ganttObj.columnMapping.startDate ||
                        column.field === ganttObj.columnMapping.endDate) {
                        datePickerObj.renderDayCell = this.parent.renderWorkingDayCell.bind(this.parent);
                        datePickerObj.change = function (args) {
                            _this.validateScheduleFields(args, column, ganttObj);
                        };
                    }
                    fieldsModel[column.field] = datePickerObj;
                    break;
                }
            case 'datetimepickeredit':
                {
                    var dateTimePickerObj = common;
                    dateTimePickerObj.format = this.parent.getDateFormat();
                    dateTimePickerObj.enableRtl = this.parent.enableRtl;
                    dateTimePickerObj.strictMode = true;
                    dateTimePickerObj.firstDayOfWeek = ganttObj.timelineModule.customTimelineSettings.weekStartDay;
                    if (column.field === ganttObj.columnMapping.startDate ||
                        column.field === ganttObj.columnMapping.endDate) {
                        dateTimePickerObj.renderDayCell = this.parent.renderWorkingDayCell.bind(this.parent);
                        dateTimePickerObj.change = function (args) {
                            _this.validateScheduleFields(args, column, ganttObj);
                        };
                    }
                    fieldsModel[column.field] = dateTimePickerObj;
                    break;
                }
            case 'dropdownedit':
                if (column.field === ganttObj.columnMapping.type || column.field === ganttObj.columnMapping.manual) {
                    var dataKey = 'dataSource';
                    var fieldsKey = 'fields';
                    var types = [
                        { 'ID': 1, 'Value': 'FixedUnit' }, { 'ID': 2, 'Value': 'FixedWork' }, { 'ID': 3, 'Value': 'FixedDuration' }
                    ];
                    common[dataKey] = types;
                    common[fieldsKey] = { value: 'Value' };
                    var dropDownListObj = common;
                    dropDownListObj.enableRtl = this.parent.enableRtl;
                    dropDownListObj.change = function (args) {
                        if (column.field === taskSettings.manual) {
                            _this.editedRecord.ganttProperties.isAutoSchedule = !args.value;
                        }
                        _this.validateScheduleFields(args, column, ganttObj);
                    };
                }
                fieldsModel[column.field] = common;
                break;
            case 'maskededit':
                fieldsModel[column.field] = common;
                break;
        }
        if (!isNullOrUndefined(column.edit) && !isNullOrUndefined(column.edit.params)) {
            extend(fieldsModel[column.field], column.edit.params);
        }
        return fieldsModel;
    };
    DialogEdit.prototype.validateScheduleFields = function (args, column, ganttObj) {
        var _a;
        var dialog;
        if (!isNullOrUndefined(ganttObj.editModule.dialogModule.dialog)) {
            dialog = ganttObj.editModule.dialogModule.dialog;
        }
        var targetId = null;
        var inputElement;
        var currentData = ganttObj.editModule.dialogModule.editedRecord;
        var cellValue = null;
        var colName = null;
        var formObject;
        var ids = this.parent.viewType === 'ResourceView' ? this.parent.getTaskIds() : this.parent.ids;
        var strViewType = this.parent.viewType;
        if (!isNullOrUndefined(args.element)) {
            inputElement = args.element;
            targetId = inputElement.getAttribute('id');
        }
        else if (!isNullOrUndefined(args.container)) {
            inputElement = args.container;
            targetId = inputElement.querySelector('input').getAttribute('id');
            inputElement = inputElement.querySelector('#' + targetId);
        }
        else if (!isNullOrUndefined(args.event) && !isNullOrUndefined(args.event.path) && !isNullOrUndefined(args.event.path)[1]) {
            inputElement = args.event.path[1];
            targetId = inputElement.querySelector('input').getAttribute('id');
            inputElement = inputElement.querySelector('#' + targetId);
        }
        if (isNullOrUndefined(inputElement)) {
            cellValue = args.value;
            colName = column.field;
        }
        else {
            cellValue = inputElement.value;
            colName = targetId.replace(ganttObj.element.id, '');
            if (this.parent.columnByField[this.parent.taskFields.id].editType === "stringedit") {
                var customFn = function (args) {
                    if (strViewType === 'ResourceView') {
                        return ids.indexOf('T' + args['value']) === -1 && ids.indexOf('R' + args['value']) === -1;
                    }
                    else {
                        return ids.indexOf(args['value']) === -1;
                    }
                };
                var options = {
                    rules: (_a = {},
                        _a[this.parent.taskFields.id] = { required: true, minLength: [customFn, 'ID is already present, please enter new value'] },
                        _a)
                };
                formObject = new FormValidator('#' + this.parent.element.id + 'GeneralTabContainer', options);
            }
        }
        if (colName.search('Segments') === 0) {
            colName = colName.replace('SegmentsTabContainer', '');
            this.validateSegmentFields(ganttObj, colName, cellValue, args);
            return true;
        }
        else {
            this.validateScheduleValuesByCurrentField(colName, cellValue, this.editedRecord);
            var ganttProp = currentData.ganttProperties;
            var tasks = ganttObj.taskFields;
            if (!isNullOrUndefined(tasks.startDate) && tasks.startDate !== colName) {
                this.updateScheduleFields(dialog, ganttProp, 'startDate');
            }
            if (tasks.endDate === colName && !isNullOrUndefined(ganttProp.startDate) && !isNullOrUndefined(args.value) && ganttProp.startDate.getTime() > args.value) {
                this.updateScheduleFields(dialog, ganttProp, 'endDate');
            }
            if (!isNullOrUndefined(tasks.endDate) && tasks.endDate !== colName) {
                this.updateScheduleFields(dialog, ganttProp, 'endDate');
            }
            if (!isNullOrUndefined(tasks.duration) && tasks.duration !== colName) {
                this.updateScheduleFields(dialog, ganttProp, 'duration');
            }
            if (!isNullOrUndefined(tasks.work) && tasks.work !== colName) {
                this.updateScheduleFields(dialog, ganttProp, 'work');
            }
            this.dialogEditValidationFlag = false;
            return true;
        }
    };
    DialogEdit.prototype.updateScheduleFields = function (dialog, ganttProp, ganttField) {
        var ganttObj = this.parent;
        var ganttId = ganttObj.element.id;
        var columnName = getValue(ganttField, ganttObj.columnMapping);
        var col = ganttObj.columnByField[columnName];
        var tempValue;
        var taskField = this.parent.taskFields;
        if (col.editType === 'stringedit') {
            var textBox = dialog.querySelector('#' + ganttId + columnName).ej2_instances[0];
            tempValue = !isNullOrUndefined(col.edit) && !isNullOrUndefined(col.edit.read) ? col.edit.read() :
                !isNullOrUndefined(col.valueAccessor) ? col.valueAccessor(columnName, ganttObj.editModule.dialogModule.editedRecord, col) : // eslint-disable-line
                    this.parent.dataOperation.getDurationString(ganttProp.duration, ganttProp.durationUnit);
            if (textBox.value !== tempValue.toString() && taskField.duration === columnName) {
                textBox.value = tempValue;
                textBox.dataBind();
            }
            else if (taskField.startDate === columnName || taskField.endDate === columnName) {
                textBox.value = taskField.startDate === columnName ? ganttProp.startDate.toString() : ganttProp.endDate.toString();
                textBox.dataBind();
            }
        }
        else if (col.editType === 'datepickeredit' || col.editType === 'datetimepickeredit') {
            var picker = col.editType === 'datepickeredit' ?
                dialog.querySelector('#' + ganttId + columnName).ej2_instances[0] :
                dialog.querySelector('#' + ganttId + columnName).ej2_instances[0];
            tempValue = ganttProp[ganttField];
            if (((isNullOrUndefined(picker.value)) && !isNullOrUndefined(tempValue)) ||
                (isNullOrUndefined(tempValue) && !isNullOrUndefined(picker.value)) ||
                (picker.value !== tempValue && !isNullOrUndefined(picker.value) && !isNullOrUndefined(tempValue)
                    && picker.value.toString() !== tempValue.toString())) {
                picker.value = tempValue;
                picker.dataBind();
            }
        }
        else if (col.editType === 'numericedit') {
            var numericTextBox = dialog.querySelector('#' + ganttId + columnName).ej2_instances[0];
            tempValue = ganttProp[ganttField];
            if (!isNullOrUndefined(tempValue) && numericTextBox.value !== tempValue) {
                numericTextBox.value = tempValue;
                numericTextBox.dataBind();
            }
        }
    };
    /**
     * @param {IGanttData} ganttData .
     * @returns {void} .
     * @private
     */
    DialogEdit.prototype.validateDuration = function (ganttData) {
        var ganttProp = ganttData.ganttProperties;
        if (!this.dialogEditValidationFlag) {
            if (isNullOrUndefined(ganttProp.duration)) {
                this.parent.setRecordValue('endDate', null, ganttProp, true);
                this.parent.setRecordValue('isMilestone', false, ganttProp, true);
            }
            else if (isScheduledTask(ganttProp) || !isNullOrUndefined(ganttProp.startDate)) {
                if (ganttData.ganttProperties.isMilestone && ganttData.ganttProperties.duration !== 0) {
                    this.parent.dateValidationModule.checkStartDate(ganttProp.startDate);
                }
                this.parent.dateValidationModule.calculateEndDate(ganttData);
            }
            else if (!isScheduledTask(ganttProp) && !isNullOrUndefined(ganttProp.endDate)) {
                this.parent.dateValidationModule.calculateStartDate(ganttData);
            }
            var milestone = ganttProp.duration === 0 ? true : false;
            this.parent.setRecordValue('isMilestone', milestone, ganttProp, true);
            this.dialogEditValidationFlag = true;
        }
    };
    DialogEdit.prototype.validateStartDate = function (ganttData) {
        var ganttProp = ganttData.ganttProperties;
        var tasks = this.parent.taskFields;
        if (!this.dialogEditValidationFlag) {
            if (isNullOrUndefined(ganttProp.startDate)) {
                this.parent.setRecordValue('duration', null, ganttProp, true);
                this.parent.setRecordValue('isMilestone', false, ganttProp, true);
                if (this.parent.allowUnscheduledTasks && isNullOrUndefined(tasks.endDate)) {
                    this.parent.setRecordValue('endDate', null, ganttProp, true);
                }
            }
            else if (isScheduledTask(ganttProp)) {
                if (isNullOrUndefined(tasks.duration)) {
                    this.parent.dateValidationModule.calculateDuration(ganttData);
                }
                else if (isNullOrUndefined(tasks.endDate)) {
                    this.parent.dateValidationModule.calculateEndDate(ganttData);
                }
                else {
                    this.parent.dateValidationModule.calculateEndDate(ganttData);
                }
            }
            else {
                if (!isNullOrUndefined(ganttProp.endDate)) {
                    this.parent.dateValidationModule.calculateDuration(ganttData);
                }
                else if (!isNullOrUndefined(ganttProp.duration)) {
                    this.parent.dateValidationModule.calculateEndDate(ganttData);
                }
            }
            this.dialogEditValidationFlag = true;
        }
    };
    DialogEdit.prototype.validateEndDate = function (ganttData) {
        var ganttProp = ganttData.ganttProperties;
        var tasks = this.parent.taskFields;
        if (!this.dialogEditValidationFlag) {
            if (isNullOrUndefined(ganttProp.endDate)) {
                this.parent.setRecordValue('duration', null, ganttProp, true);
                this.parent.setRecordValue('isMilestone', false, ganttProp, true);
            }
            else if (isScheduledTask(ganttProp)) {
                if (isNullOrUndefined(tasks.duration)) {
                    this.parent.dateValidationModule.calculateDuration(ganttData);
                }
                else if (isNullOrUndefined(ganttProp.startDate)) {
                    this.parent.dateValidationModule.calculateStartDate(ganttData);
                }
                else {
                    if (!isNullOrUndefined(ganttProp.segments) && ganttProp.segments.length > 0) {
                        ganttProp.segments = this.parent.editModule.cellEditModule.validateEndDateWithSegments(ganttProp);
                    }
                    this.parent.dateValidationModule.calculateDuration(ganttData);
                }
            }
            else {
                if (!isNullOrUndefined(ganttProp.duration)) {
                    this.parent.dateValidationModule.calculateStartDate(ganttData);
                }
                else if (!isNullOrUndefined(ganttProp.startDate)) {
                    this.parent.dateValidationModule.calculateDuration(ganttData);
                }
            }
            this.dialogEditValidationFlag = true;
        }
    };
    /**
     *
     * @param {string} columnName .
     * @param {string} value .
     * @param {IGanttData} currentData .
     * @returns {boolean} .
     * @private
     */
    DialogEdit.prototype.validateScheduleValuesByCurrentField = function (columnName, value, currentData) {
        var ganttObj = this.parent;
        var ganttProp = currentData.ganttProperties;
        var taskSettings = ganttObj.taskFields;
        if (taskSettings.duration === columnName) {
            if (!isNullOrUndefined(value) && value !== '') {
                ganttObj.dataOperation.updateDurationValue(value, ganttProp);
                this.parent.setRecordValue(taskSettings.duration, value, currentData);
                this.parent.setRecordValue('taskData.' + taskSettings.duration, ganttProp.duration, currentData);
            }
            else {
                if (ganttObj.allowUnscheduledTasks) {
                    this.parent.setRecordValue('duration', null, ganttProp, true);
                }
            }
            this.validateDuration(currentData);
            this.parent.editModule.updateResourceRelatedFields(currentData, 'duration');
        }
        if (taskSettings.startDate === columnName) {
            if (value !== '') {
                var startDate = this.parent.dateValidationModule.getDateFromFormat(value);
                startDate = this.parent.dateValidationModule.checkStartDate(startDate, ganttProp);
                this.parent.setRecordValue('startDate', startDate, ganttProp, true);
            }
            else {
                if (ganttObj.allowUnscheduledTasks && !(currentData.hasChildRecords)) {
                    this.parent.setRecordValue('startDate', null, ganttProp, true);
                }
            }
            this.validateStartDate(currentData);
        }
        if (taskSettings.endDate === columnName) {
            if (value !== '') {
                var endDate = this.parent.dateValidationModule.getDateFromFormat(value);
                if (isNullOrUndefined(ganttProp.startDate) && isNullOrUndefined(endDate) && ganttProp.startDate.getTime() > endDate.getTime()) {
                    endDate = ganttProp.endDate;
                }
                if (endDate.getHours() === 0 && ganttObj.defaultEndTime !== 86400) {
                    this.parent.dateValidationModule.setTime(ganttObj.defaultEndTime, endDate);
                }
                endDate = this.parent.dateValidationModule.checkEndDate(endDate, ganttProp);
                if (isNullOrUndefined(ganttProp.startDate) || endDate.getTime() > (ganttProp.startDate).getTime()) {
                    this.parent.setRecordValue('endDate', endDate, ganttProp, true);
                }
            }
            else {
                if (ganttObj.allowUnscheduledTasks) {
                    this.parent.setRecordValue('endDate', null, ganttProp, true);
                }
            }
            this.validateEndDate(currentData);
        }
        if (taskSettings.work === columnName) {
            if (!isNullOrUndefined(value) && value !== '') {
                this.parent.setRecordValue('work', value, ganttProp, true);
                this.parent.editModule.updateResourceRelatedFields(currentData, 'work');
                this.validateDuration(currentData);
            }
        }
        if (columnName === taskSettings.type) {
            this.parent.setRecordValue('taskType', value, ganttProp, true);
        }
        if (taskSettings.manual === columnName) {
            this.parent.editModule.updateTaskScheduleModes(currentData);
        }
        return true;
    };
    DialogEdit.prototype.getSegmentsModel = function (fields) {
        var _this = this;
        var taskSettings = this.parent.taskFields;
        if (isNullOrUndefined(fields) || fields.length === 0) {
            fields = [];
            if (!isNullOrUndefined(taskSettings.startDate)) {
                fields.push('startDate');
            }
            if (!isNullOrUndefined(taskSettings.endDate)) {
                fields.push('endDate');
            }
            if (!isNullOrUndefined(taskSettings.duration)) {
                fields.push('duration');
            }
        }
        var segmentInputModel = {};
        segmentInputModel.editSettings = {
            allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal', newRowPosition: 'Bottom'
        };
        segmentInputModel.locale = this.parent.locale;
        segmentInputModel.dataSource = [];
        segmentInputModel.rowHeight = this.parent.isAdaptive ? 48 : null;
        segmentInputModel.toolbar = [
            {
                id: this.parent.element.id + 'SegmentsTabContainer' + '_add', prefixIcon: 'e-add',
                tooltipText: this.localeObj.getConstant('add'), align: 'Right',
                text: this.parent.isAdaptive ? '' : this.localeObj.getConstant('add')
            },
            {
                id: this.parent.element.id + 'SegmentsTabContainer' + '_delete', prefixIcon: 'e-delete',
                tooltipText: this.localeObj.getConstant('delete'), align: 'Right',
                text: this.parent.isAdaptive ? '' : this.localeObj.getConstant('delete')
            }
        ];
        var gridColumns = [];
        var _loop_1 = function (i) {
            var gridColumn = {};
            var generalTabString = 'General';
            switch (fields[i]) {
                case 'startDate':
                case 'endDate':
                    gridColumn = {
                        field: fields[i], headerText: this_1.localeObj.getConstant(fields[i]), editType: 'stringedit', width: '200px',
                        edit: {
                            write: function (args) {
                                var datePickerModel;
                                if (!isNullOrUndefined(_this.beforeOpenArgs[generalTabString])) {
                                    datePickerModel = _this.beforeOpenArgs[generalTabString][_this.parent.taskFields[fields[i]]];
                                }
                                else {
                                    var columnFields = _this.getGeneralColumnFields();
                                    var columnModel = _this.getFieldsModel(columnFields);
                                    datePickerModel = columnModel[_this.parent.taskFields[fields[i]]];
                                }
                                var value = args.rowData[args.column.field];
                                setValue('value', value, datePickerModel);
                                var datePicker = new _this.inputs[_this.parent.columnByField[_this.parent.taskFields[fields[i]]].editType](datePickerModel);
                                datePicker.appendTo(args.element);
                            },
                            read: function (args) {
                                var ej2Instance = args.ej2_instances[0];
                                return ej2Instance.value;
                            }
                        },
                        format: this_1.parent.getDateFormat()
                    };
                    if (fields[i] === 'startDate') {
                        gridColumn.validationRules = { required: true };
                    }
                    gridColumns.push(gridColumn);
                    break;
                case 'duration':
                    gridColumn = {
                        field: fields[i], headerText: this_1.localeObj.getConstant(fields[i]), editType: 'stringedit',
                        width: '100px', edit: {
                            write: function (args) {
                                var inputTextModel;
                                if (!isNullOrUndefined(_this.beforeOpenArgs[generalTabString])) {
                                    inputTextModel = _this.beforeOpenArgs[generalTabString][_this.parent.taskFields[fields[i]]];
                                }
                                else {
                                    var columnFields = _this.getGeneralColumnFields();
                                    var columnModel = _this.getFieldsModel(columnFields);
                                    inputTextModel = columnModel[_this.parent.taskFields[fields[i]]];
                                }
                                inputTextModel.floatLabelType = 'Never';
                                var value = args.rowData[args.column.field];
                                if (!isNullOrUndefined(value)) {
                                    setValue('value', value, inputTextModel);
                                }
                                else {
                                    setValue('value', null, inputTextModel);
                                }
                                setValue('value', value, inputTextModel);
                                var inputModel = new TextBox(inputTextModel);
                                inputModel.appendTo(args.element);
                            },
                            read: function (args) {
                                var ej2Instance = args.ej2_instances[0];
                                return ej2Instance.value.toString();
                            }
                        }
                    };
                    gridColumns.push(gridColumn);
                    break;
            }
        };
        var this_1 = this;
        for (var i = 0; i < fields.length; i++) {
            _loop_1(i);
        }
        segmentInputModel.columns = gridColumns;
        segmentInputModel.height = this.parent.isAdaptive ? '100%' : '153px';
        return segmentInputModel;
    };
    DialogEdit.prototype.getGridColumnByField = function (fieldName, columns) {
        var column;
        for (var i = 0; i < columns.length; i++) {
            if (columns[i].field === fieldName) {
                column = columns[i];
            }
        }
        return column;
    };
    DialogEdit.prototype.updateSegmentField = function (columnName, args, segment) {
        var dialog = this.parent.editModule.dialogModule.dialog;
        var gridModel = getValue('Segments', this.beforeOpenArgs);
        var col = this.getGridColumnByField(columnName, gridModel.columns);
        var ganttId = this.parent.element.id;
        var tempValue = segment[columnName];
        var inputValue;
        if (col.editType === 'stringedit') {
            inputValue = dialog.querySelector('#' + ganttId + 'SegmentsTabContainer' + columnName)
                .ej2_instances[0];
        }
        else if (col.editType === 'datepickeredit') {
            inputValue = dialog.querySelector('#' + ganttId + 'SegmentsTabContainer' + columnName)
                .ej2_instances[0];
        }
        if ((!isNullOrUndefined(inputValue.value)) && (inputValue.value.toString() !== tempValue.toString())) {
            inputValue.value = tempValue;
            inputValue.dataBind();
        }
    };
    DialogEdit.prototype.validateSegmentFields = function (ganttObj, columnName, cellValue, args) {
        var taskSettings = this.parent.taskFields;
        if (!isNullOrUndefined(taskSettings.duration) && taskSettings.duration.toLowerCase() === columnName.toLowerCase()) {
            if (!isNullOrUndefined(cellValue) && cellValue !== '') {
                this.selectedSegment.duration = Number(cellValue);
                var endDate = ganttObj.dataOperation.getEndDate(this.selectedSegment.startDate, Number(cellValue), this.editedRecord.ganttProperties.durationUnit, this.editedRecord.ganttProperties, false);
                endDate = ganttObj.dataOperation.checkEndDate(endDate, this.editedRecord.ganttProperties, false);
                this.selectedSegment.endDate = endDate;
            }
        }
        if (!isNullOrUndefined(taskSettings.startDate) && taskSettings.startDate.toLowerCase() === columnName.toLowerCase()) {
            if (cellValue !== '') {
                var startDate = this.parent.dateValidationModule.getDateFromFormat(cellValue);
                startDate = this.parent.dateValidationModule.checkStartDate(startDate);
                this.selectedSegment.startDate = startDate;
                if (!isNullOrUndefined(taskSettings.endDate)) {
                    this.selectedSegment.endDate = this.parent.dataOperation.getEndDate(startDate, this.selectedSegment.duration, this.editedRecord.ganttProperties.durationUnit, this.editedRecord.ganttProperties, false);
                }
            }
        }
        if (!isNullOrUndefined(taskSettings.endDate) && taskSettings.endDate.toLowerCase() === columnName.toLowerCase()) {
            if (cellValue !== '') {
                var endDate = this.parent.dateValidationModule.getDateFromFormat(cellValue);
                if (endDate.getHours() === 0 && ganttObj.defaultEndTime !== 86400) {
                    this.parent.dateValidationModule.setTime(ganttObj.defaultEndTime, endDate);
                }
                endDate = this.parent.dateValidationModule.checkEndDate(endDate, this.editedRecord.ganttProperties);
                this.selectedSegment.endDate = endDate;
                this.selectedSegment.duration = this.parent.dataOperation.getDuration(this.selectedSegment.startDate, this.selectedSegment.endDate, this.editedRecord.ganttProperties.durationUnit, true, false, true);
            }
        }
        if (!isNullOrUndefined(taskSettings.startDate)) {
            this.updateSegmentField('startDate', args, this.selectedSegment);
        }
        if (!isNullOrUndefined(taskSettings.endDate)) {
            this.updateSegmentField('endDate', args, this.selectedSegment);
        }
        if (!isNullOrUndefined(taskSettings.duration)) {
            this.updateSegmentField('duration', args, this.selectedSegment);
        }
    };
    DialogEdit.prototype.getPredecessorModel = function (fields) {
        if (isNullOrUndefined(fields) || fields.length === 0) {
            fields = ['ID', 'Name', 'Type', 'Offset', 'UniqueId'];
        }
        var inputModel = {};
        inputModel.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };
        inputModel.locale = this.parent.locale;
        inputModel.dataSource = [];
        inputModel.rowHeight = this.parent.isAdaptive ? 48 : null;
        inputModel.toolbar = [
            {
                id: this.parent.element.id + 'DependencyTabContainer' + '_add', prefixIcon: 'e-add',
                tooltipText: this.localeObj.getConstant('add'), align: 'Right',
                text: this.parent.isAdaptive ? '' : this.localeObj.getConstant('add')
            },
            {
                id: this.parent.element.id + 'DependencyTabContainer' + '_delete', prefixIcon: 'e-delete',
                tooltipText: this.localeObj.getConstant('delete'), align: 'Right',
                text: this.parent.isAdaptive ? '' : this.localeObj.getConstant('delete')
            }
        ];
        var columns = [];
        for (var i = 0; i < fields.length; i++) {
            var column = {};
            if (fields[i].toLowerCase() === 'id') {
                column = {
                    field: 'id', headerText: this.localeObj.getConstant('id'), allowEditing: false, width: '70px'
                };
                columns.push(column);
            }
            else if (fields[i].toLowerCase() === 'name') {
                column = {
                    field: 'name', headerText: this.localeObj.getConstant('name'), editType: 'stringedit', width: '250px',
                    validationRules: { required: true }
                };
                columns.push(column);
            }
            else if (fields[i].toLowerCase() === 'type') {
                column = {
                    field: 'type', headerText: this.localeObj.getConstant('type'), editType: 'dropdownedit',
                    dataSource: this.types, foreignKeyField: 'id', foreignKeyValue: 'text',
                    defaultValue: 'FS', validationRules: { required: true }, width: '150px'
                };
                columns.push(column);
            }
            else if (fields[i].toLowerCase() === 'offset') {
                column = {
                    field: 'offset', headerText: this.localeObj.getConstant('offset'), editType: 'stringedit',
                    defaultValue: this.parent.dataOperation.getDurationString(0, this.beforeOpenArgs.rowData.ganttProperties.durationUnit),
                    validationRules: { required: true }, width: '100px'
                };
                columns.push(column);
            }
            else if (fields[i].toLowerCase() === 'uniqueid') {
                column = {
                    field: 'uniqueId', isPrimaryKey: true, visible: false, defaultValue: getUid().toString()
                };
                columns.push(column);
            }
        }
        inputModel.columns = columns;
        inputModel.height = this.parent.isAdaptive ? '100%' : '153px';
        return inputModel;
    };
    DialogEdit.prototype.getResourcesModel = function (fields) {
        var ganttObj = this.parent;
        var resourceSettings = ganttObj.resourceFields;
        if (isNullOrUndefined(fields) || fields.length === 0) {
            fields = [resourceSettings.id, resourceSettings.name, resourceSettings.unit, resourceSettings.group];
        }
        var inputModel = {
            allowFiltering: true,
            treeColumnIndex: -1,
            childMapping: '',
            editSettings: { allowEditing: true, mode: 'Cell' },
            locale: this.parent.locale,
            allowSelection: true,
            rowHeight: this.parent.isAdaptive ? 48 : null,
            filterSettings: { type: 'Menu' },
            selectionSettings: { checkboxOnly: true, checkboxMode: 'Default', persistSelection: true, type: 'Multiple' }
        };
        var columns = [
            { type: 'checkbox', allowEditing: false, allowSorting: false, allowFiltering: false, width: 60 }
        ];
        for (var i = 0; i < fields.length; i++) {
            var column = {};
            if (fields[i] === resourceSettings.id) {
                column = {
                    field: resourceSettings.id,
                    headerText: this.localeObj.getConstant('id'), isPrimaryKey: true, width: '100px',
                    allowEditing: false
                };
                columns.push(column);
            }
            else if (fields[i] === resourceSettings.name) {
                column = {
                    field: resourceSettings.name, headerText: this.localeObj.getConstant('name'),
                    allowEditing: false
                };
                columns.push(column);
            }
            else if (fields[i] === resourceSettings.unit) {
                column = {
                    field: resourceSettings.unit,
                    headerText: this.localeObj.getConstant('unit'),
                    editType: 'numericedit',
                    edit: { params: { min: 0 } }
                };
                columns.push(column);
            }
            else if (fields[i] === resourceSettings.group && !isNullOrUndefined(resourceSettings.group)) {
                column = {
                    field: resourceSettings.group,
                    headerText: this.localeObj.getConstant('group'),
                    allowEditing: false
                };
                columns.push(column);
            }
        }
        inputModel.columns = columns;
        inputModel.height = this.parent.isAdaptive ? '100%' : '196px';
        return inputModel;
    };
    DialogEdit.prototype.getNotesModel = function (fields) {
        if (isNullOrUndefined(fields) || fields.length === 0) {
            fields = ['Bold', 'Italic', 'Underline', 'StrikeThrough',
                'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
                'LowerCase', 'UpperCase', '|',
                'Alignments', 'OrderedList', 'UnorderedList',
                'Outdent', 'Indent', '|', 'CreateTable',
                'CreateLink', '|', 'ClearFormat', 'Print',
                '|', 'Undo', 'Redo'];
        }
        var inputModel = {
            placeholder: this.localeObj.getConstant('writeNotes'),
            toolbarSettings: {
                items: fields
            },
            height: this.parent.isAdaptive ? '100%' : 'auto',
            locale: this.parent.locale
        };
        return inputModel;
    };
    DialogEdit.prototype.createDivElement = function (className, id) {
        return createElement('div', { className: className, id: id });
    };
    DialogEdit.prototype.createInputElement = function (className, id, fieldName, type) {
        return createElement(type || 'input', {
            className: className, attrs: {
                type: 'text', id: id, name: fieldName,
                title: fieldName
            }
        });
    };
    DialogEdit.prototype.renderTabItems = function () {
        var tabModel = this.beforeOpenArgs.tabModel;
        var items = tabModel.items;
        var index = 0;
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item.content instanceof HTMLElement) {
                continue;
            }
            else if (item.content === 'General') {
                item.content = this.renderGeneralTab(item.content);
            }
            else if (item.content === 'Dependency') {
                if (this.editedRecord.hasChildRecords && !this.parent.allowParentDependency) {
                    item.disabled = true;
                }
                item.content = this.renderPredecessorTab(item.content);
            }
            else if (item.content === 'Resources') {
                item.content = this.renderResourceTab(item.content);
            }
            else if (item.content === ('Custom' + '' + index)) {
                item.content = this.renderCustomTab(item.content);
                index++;
            }
            else if (item.content === 'Notes') {
                item.content = this.renderNotesTab(item.content);
            }
            else if (item.content === 'Segments') {
                if (this.editedRecord.hasChildRecords) {
                    item.disabled = true;
                }
                item.content = this.renderSegmentsTab(item.content);
            }
        }
    };
    DialogEdit.prototype.segmentGridActionBegin = function (args) {
        var taskFields = this.parent.taskFields;
        var itemName = 'Segments';
        var gridModel = this.beforeOpenArgs[itemName];
        if (args.requestType === 'add' || args.requestType === 'beginEdit' || args.requestType === 'save') {
            var gridData = gridModel.dataSource;
            var selectedItem = getValue('rowData', args);
            var startDate = this.beforeOpenArgs.rowData.ganttProperties.startDate;
            if (!isNullOrUndefined(startDate)) {
                if (args.requestType === 'add') {
                    var arg = {};
                    var sDate = getValue('startDate', selectedItem);
                    var eDate = getValue('endDate', selectedItem);
                    var duration = getValue('duration', selectedItem);
                    var startDate_1 = !isNullOrUndefined(gridData) && gridData.length > 0 ?
                        !isNullOrUndefined(taskFields.endDate) ? new Date(getValue('endDate', gridData[0]).getTime()) :
                            new Date(getValue('startDate', gridData[0]).getTime()) :
                        !isNullOrUndefined(this.beforeOpenArgs.rowData.ganttProperties.startDate) &&
                            new Date(this.beforeOpenArgs.rowData.ganttProperties.startDate.getTime());
                    startDate_1.setHours(0, 0, 0, 0);
                    if (!isNullOrUndefined(gridData) && gridData.length > 0) {
                        startDate_1.setDate(startDate_1.getDate() + 2);
                    }
                    sDate = this.parent.dataOperation.checkStartDate(startDate_1);
                    eDate = this.parent.dateValidationModule.getDateFromFormat(sDate);
                    if (eDate.getHours() === 0 && this.parent.defaultEndTime !== 86400) {
                        this.parent.dateValidationModule.setTime(this.parent.defaultEndTime, eDate);
                    }
                    eDate = !isNullOrUndefined(taskFields.endDate) && !isNullOrUndefined(gridData) && gridData.length <= 0 ?
                        this.beforeOpenArgs.rowData.ganttProperties.endDate : eDate;
                    duration = !isNullOrUndefined(taskFields.duration) && !isNullOrUndefined(gridData) && gridData.length <= 0 ?
                        this.beforeOpenArgs.rowData.ganttProperties.duration : 1;
                    arg = {
                        startDate: sDate,
                        endDate: eDate,
                        duration: duration
                    };
                    args.rowData = arg;
                }
            }
            this.selectedSegment = args.rowData;
            // if (args.requestType === 'save') {
            //     // let duration: string = 'duration';
            //     // let tempDuration: Object = this.parent.dataOperation.getDurationValue(args.data[duration]);
            //     // args.data[duration] = getValue('duration', tempDuration);
            //     this.selectedSegment = !isNullOrUndefined(this.editedRecord.ganttProperties.segments[args.rowIndex]) ?
            //         this.editedRecord.ganttProperties.segments[args.rowIndex] : !isNullOrUndefined(gridData[args.rowIndex]) ?
            //             gridData[args.rowIndex] : gridData;
            // }
        }
    };
    DialogEdit.prototype.renderSegmentsTab = function (itemName) {
        var ganttObj = this.parent;
        var gridModel = this.beforeOpenArgs[itemName];
        var ganttData = this.beforeOpenArgs.rowData;
        var preData = [];
        if (this.isEdit) {
            preData = isNullOrUndefined(ganttData.ganttProperties.segments) ? [] : ganttData.ganttProperties.segments;
        }
        gridModel.dataSource = preData;
        gridModel.actionBegin = this.segmentGridActionBegin.bind(this);
        Grid.Inject(Edit, Page, GridToolbar, ForeignKey);
        var gridObj = new Grid(gridModel);
        var divElement = this.createDivElement('', ganttObj.element.id + '' + itemName + 'TabContainer');
        gridObj.appendTo(divElement);
        return divElement;
    };
    DialogEdit.prototype.renderGeneralTab = function (itemName) {
        var ganttObj = this.parent;
        var itemModel = this.beforeOpenArgs[itemName];
        var divElement = this.createDivElement('e-edit-form-row', ganttObj.element.id
            + '' + itemName + 'TabContainer');
        for (var _i = 0, _a = Object.keys(itemModel); _i < _a.length; _i++) {
            var key = _a[_i];
            if (this.parent.columnByField[key].visible === false) {
                continue;
            }
            var column = this.parent.columnByField[key];
            var inputModel = itemModel[key];
            divElement.appendChild(this.renderInputElements(inputModel, column));
        }
        return divElement;
    };
    DialogEdit.prototype.isCheckIsDisabled = function (column) {
        var disabled = false;
        var stringOrNumber;
        if (column.allowEditing === false || column.isPrimaryKey || this.parent.readOnly) {
            if (this.parent.customColumns.indexOf(column.field) !== -1) {
                disabled = true;
            }
            else {
                if (column.field === this.parent.taskFields.id || column.field === this.parent.taskFields.name ||
                    column.field === this.parent.taskFields.duration || column.field === this.parent.taskFields.progress ||
                    column.field === this.parent.taskFields.startDate || column.field === this.parent.taskFields.endDate ||
                    column.field === this.parent.taskFields.baselineStartDate || column.field === this.parent.taskFields.baselineEndDate ||
                    column.field === this.parent.taskFields.work || column.field === this.parent.taskFields.type) {
                    for (var i = 0; i < this.parent.currentViewData['length']; i++) {
                        if (!isNullOrUndefined(this.parent.currentViewData[i].ganttProperties.taskId)) {
                            stringOrNumber = this.parent.currentViewData[i].ganttProperties.taskId;
                            break;
                        }
                    }
                    if (typeof (stringOrNumber) === 'string') {
                        disabled = false;
                    }
                    else {
                        disabled = true;
                    }
                }
            }
        }
        if (this.isEdit) {
            if (column.field === this.parent.taskFields.id) {
                disabled = true;
            }
            if (this.editedRecord.hasChildRecords) {
                if ((column.field === this.parent.taskFields.endDate && ((!isNullOrUndefined(this.editedRecord['isManual']) &&
                    this.editedRecord['isManual'] === false) || this.parent.taskMode === 'Auto')) || column.field === this.parent.taskFields.duration ||
                    column.field === this.parent.taskFields.progress || column.field === this.parent.taskFields.work ||
                    column.field === this.parent.taskFields.type) {
                    disabled = true;
                }
            }
        }
        return disabled;
    };
    DialogEdit.prototype.isParentValid = function (data) {
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].uniqueID == this.beforeOpenArgs.rowData['uniqueID']) {
                    this.isValidData = false;
                    break;
                }
                if (data[i].hasChildRecords) {
                    this.isParentValid(data[i].childRecords);
                }
                if (!this.isValidData) {
                    break;
                }
            }
        }
        return this.isValidData;
    };
    DialogEdit.prototype.renderPredecessorTab = function (itemName) {
        var _this = this;
        var ganttObj = this.parent;
        var gridModel = this.beforeOpenArgs[itemName];
        var dependencyColumn = this.parent.columnByField[this.parent.taskFields.dependency];
        if (dependencyColumn.allowEditing === false || dependencyColumn.isPrimaryKey || this.parent.readOnly) {
            gridModel.editSettings.allowEditing = false;
            gridModel.editSettings.allowAdding = false;
            gridModel.editSettings.allowDeleting = false;
        }
        var ganttData = this.beforeOpenArgs.rowData;
        var preData = [];
        this.taskNameCollection();
        if (this.isEdit) {
            preData = this.predecessorEditCollection(ganttData);
            this.updatePredecessorDropDownData(ganttData);
        }
        gridModel.dataSource = preData;
        gridModel.actionBegin = this.gridActionBegin.bind(this);
        var columns = gridModel.columns;
        columns[1].edit = {
            write: function (args) {
                if (getValue('requestType', args) === 'add') {
                    setValue('rowData.uniqueId', getUid(), args);
                }
                var field = 'name';
                var autoObj = new ComboBox({
                    dataSource: new DataManager(_this.idCollection),
                    popupHeight: '180px',
                    allowCustom: false,
                    enableRtl: _this.parent.enableRtl,
                    fields: { value: 'text' },
                    value: args.rowData[field],
                    change: function (arg) {
                        var tr = closest(arg.element, 'tr');
                        var idInput = tr.querySelector('#' + _this.parent.element.id + 'DependencyTabContainerid');
                        if (idInput) {
                            if (!isNullOrUndefined(arg.itemData) && !isNullOrUndefined(arg.item)) {
                                idInput.value = arg.itemData.id;
                            }
                            else {
                                idInput.value = '';
                            }
                        }
                    },
                    autofill: true
                });
                autoObj.appendTo(args.element);
            },
            read: function (args) {
                var ej2Instance = args.ej2_instances[0];
                return ej2Instance.value;
            }
        };
        Grid.Inject(Edit, Page, GridToolbar, ForeignKey);
        var gridObj = new Grid(gridModel);
        var divElement = this.createDivElement('e-dependent-div', ganttObj.element.id + '' + itemName + 'TabContainer');
        gridObj.appendTo(divElement);
        return divElement;
    };
    DialogEdit.prototype.gridActionBegin = function (args) {
        var _this = this;
        var itemName = 'Dependency';
        var gridModel = this.beforeOpenArgs[itemName];
        if (args.requestType === 'add' || args.requestType === 'beginEdit') {
            var isEdit_1 = args.requestType === 'add' ? false : true;
            this.idCollection = extend([], [], this.preTableCollection, true);
            var gridData_1 = gridModel.dataSource;
            var _loop_2 = function (i) {
                // eslint-disable-next-line
                this_2.idCollection.forEach(function (data, index) {
                    if (data.id === getValue('id', gridData_1[i])) {
                        var selectedItem = getValue('rowData', args);
                        if (isEdit_1 && getValue('id', selectedItem) === data.id) {
                            return;
                        }
                        _this.idCollection.splice(_this.idCollection.indexOf(data), 1);
                    }
                });
            };
            var this_2 = this;
            for (var i = 0; i <= gridData_1.length; i++) {
                _loop_2(i);
            }
        }
    };
    DialogEdit.prototype.updateResourceCollection = function (args, resourceTreeGridId) {
        if (!isNullOrUndefined(args.data) && Object.keys(args.data).length) {
            var ganttObj = this.parent;
            var treeGridId = document.querySelector('#' + resourceTreeGridId);
            var resourceTreeGrid = treeGridId.ej2_instances[0];
            if (!isNullOrUndefined(resourceTreeGrid) && resourceTreeGrid.getSelectedRecords().length > 0) {
                var tempRecords = resourceTreeGrid.getSelectedRecords();
                var index = void 0;
                var selectedItems = [];
                for (index = 0; index < tempRecords.length; index++) {
                    selectedItems.push(tempRecords[index].taskData);
                }
                this.ganttResources = extend([], selectedItems);
            }
            else {
                this.ganttResources = [];
            }
        }
        else {
            this.ganttResources = [];
        }
    };
    DialogEdit.prototype.renderResourceTab = function (itemName) {
        var _this = this;
        var ganttObj = this.parent;
        var resourceSettings = ganttObj.resourceFields;
        var ganttData = this.beforeOpenArgs.rowData;
        var rowResource = ganttData.ganttProperties.resourceInfo;
        var inputModel = this.beforeOpenArgs[itemName];
        var resourceTreeGridId = ganttObj.element.id + '' + itemName + 'TabContainer';
        var resourceData = [];
        if (this.parent.viewType === 'ResourceView') {
            for (var i = 0; i < ganttObj.currentViewData.length; i++) {
                for (var j = 0; j < ganttObj.resources.length; j++) {
                    if (ganttObj.currentViewData[i][ganttObj.taskFields.id] === ganttObj.resources[j][resourceSettings.id] &&
                        (ganttObj.currentViewData[i].hasChildRecords || isNullOrUndefined(ganttObj.currentViewData[i].parentItem))) {
                        resourceData.push(ganttObj.resources[j]);
                    }
                }
            }
        }
        else {
            resourceData = extend([], [], ganttObj.resources, true);
        }
        this.parent.dataOperation.updateResourceUnit(resourceData);
        if (!isNullOrUndefined(rowResource)) {
            var count = void 0;
            var rowResourceLength = rowResource.length;
            var index = void 0;
            var resourceDataLength = resourceData.length;
            for (count = 0; count < rowResourceLength; count++) {
                for (index = 0; index < resourceDataLength; index++) {
                    if (rowResource[count][resourceSettings.id] === resourceData[index][resourceSettings.id]) {
                        resourceData[index][resourceSettings.unit] = rowResource[count][resourceSettings.unit];
                    }
                }
            }
        }
        inputModel.dataSource = resourceData;
        var resourceInfo = ganttData.ganttProperties.resourceInfo;
        if (this.isEdit && !isNullOrUndefined(resourceInfo)) {
            for (var i = 0; i < resourceInfo.length; i++) {
                this.ganttResources.push(resourceInfo[i]);
            }
        }
        inputModel.rowSelected = function (args) {
            _this.updateResourceCollection(args, resourceTreeGridId);
        };
        inputModel.rowDeselected = function (args) {
            _this.updateResourceCollection(args, resourceTreeGridId);
        };
        var divElement = this.createDivElement('e-resource-div', resourceTreeGridId);
        TreeGrid.Inject(Selection, Filter, TreeGridEdit, VirtualScroll);
        var treeGridObj = new TreeGrid(inputModel);
        var resourceColumn = this.parent.columnByField[this.parent.taskFields.resourceInfo];
        if (resourceColumn.allowEditing === false || resourceColumn.isPrimaryKey || this.parent.readOnly) {
            treeGridObj.allowSelection = false;
            treeGridObj.allowFiltering = false;
            treeGridObj.editSettings.allowEditing = false;
        }
        treeGridObj.dataBound = function () {
            if (_this.parent.editDialogFields.length >= 1 && _this.parent.editDialogFields[0].type === 'Resources') {
                var id = _this.parent.element.id + 'ResourcesTabContainer';
                _this.resourceSelection(id);
            }
        };
        treeGridObj.appendTo(divElement);
        return divElement;
    };
    DialogEdit.prototype.resourceSelection = function (id) {
        var _this = this;
        var resourceTreeGrid = document.querySelector('#' + id).ej2_instances[0];
        var currentViewData = resourceTreeGrid.getCurrentViewRecords();
        var resources = this.ganttResources;
        if (resources && resources.length > 0) {
            currentViewData.forEach(function (data, index) {
                for (var i = 0; i < resources.length; i++) {
                    if (data.taskData[_this.parent.resourceFields.id] === resources[i][_this.parent.resourceFields.id] &&
                        !isNullOrUndefined(resourceTreeGrid.selectionModule) &&
                        resourceTreeGrid.getSelectedRowIndexes().indexOf(index) === -1) {
                        resourceTreeGrid.selectRow(index);
                    }
                }
            });
        }
    };
    DialogEdit.prototype.renderCustomTab = function (itemName) {
        return this.renderGeneralTab(itemName);
    };
    DialogEdit.prototype.renderNotesTab = function (itemName) {
        var ganttObj = this.parent;
        var inputModel = this.beforeOpenArgs[itemName];
        inputModel.enableHtmlSanitizer = this.parent.enableHtmlSanitizer;
        var ganttProp = this.editedRecord.ganttProperties;
        var divElement = this.createDivElement('', ganttObj.element.id + '' + itemName + 'TabContainer');
        RichTextEditor.Inject(RTEToolbar, Link, HtmlEditor, QuickToolbar, Count);
        inputModel.value = ganttProp.notes;
        var notesColumn = this.parent.columnByField[this.parent.taskFields.notes];
        if (notesColumn.allowEditing === false || notesColumn.isPrimaryKey || this.parent.readOnly) {
            inputModel.enabled = false;
        }
        var rteObj = new RichTextEditor(inputModel);
        rteObj.appendTo(divElement);
        return divElement;
    };
    DialogEdit.prototype.renderInputElements = function (inputModel, column) {
        var _this = this;
        var ganttId = this.parent.element.id;
        var ganttData = this.editedRecord;
        var divElement = this.createDivElement('e-edit-form-column');
        var inputElement;
        var editArgs = { column: column, data: ganttData };
        if (!isNullOrUndefined(column.edit) && isNullOrUndefined(column.edit.params)) {
            var create = column.edit.create;
            if (typeof create === 'string') {
                create = getObject(create, window);
                inputElement = create(editArgs);
            }
            else {
                inputElement = column.edit.create(editArgs);
            }
            inputElement.className = '';
            inputElement.setAttribute('type', 'text');
            inputElement.setAttribute('id', ganttId + '' + column.field);
            inputElement.setAttribute('name', column.field);
            inputElement.setAttribute('title', column.field);
            divElement.appendChild(inputElement);
        }
        else {
            inputElement = this.createInputElement('', ganttId + '' + column.field, column.field);
            divElement.appendChild(inputElement);
        }
        inputModel.enabled = !isNullOrUndefined(inputModel.enabled) ? inputModel.enabled : !this.isCheckIsDisabled(column);
        if (column.field === this.parent.taskFields.duration) {
            if (!isNullOrUndefined(column.valueAccessor)) {
                if (typeof column.valueAccessor === 'string') {
                    var valueAccessor = getObject(column.valueAccessor, window);
                    inputModel.value = valueAccessor(column.field, ganttData, column);
                }
                else {
                    inputModel.value = column.valueAccessor(column.field, ganttData, column);
                }
            }
            else if (isNullOrUndefined(column.edit)) {
                var ganttProp = ganttData.ganttProperties;
                inputModel.value = this.parent.dataOperation.getDurationString(ganttProp.duration, ganttProp.durationUnit);
            }
        }
        else {
            if (column.editType === 'booleanedit') {
                if (ganttData[column.field] === true) {
                    inputModel.checked = true;
                }
                else {
                    inputModel.checked = false;
                }
            }
            else {
                inputModel.value = ganttData[column.field];
            }
        }
        if (!isNullOrUndefined(column.edit) && isNullOrUndefined(column.edit.params)) {
            var write = column.edit.write;
            var inputObj = void 0;
            if (typeof write === 'string') {
                write = getObject(write, window);
                inputObj = write({
                    column: column, rowData: ganttData, element: inputElement
                });
            }
            else {
                inputObj = column.edit.write({
                    column: column, rowData: ganttData, element: inputElement
                });
            }
            if (column.field === this.parent.taskFields.duration) {
                inputObj.change = function (args) {
                    _this.validateScheduleFields(args, column, _this.parent);
                };
            }
        }
        else {
            var inputObj = new this.inputs[column.editType](inputModel);
            inputObj.appendTo(inputElement);
        }
        return divElement;
    };
    DialogEdit.prototype.taskNameCollection = function () {
        var flatData = this.parent.flatData;
        this.preTaskIds = [];
        this.preTableCollection = [];
        for (var i = 0; i < flatData.length; i++) {
            var data = flatData[i];
            if (this.parent.allowParentDependency) {
                var currentFlatData = data;
                if (data.parentUniqueID === this.beforeOpenArgs.rowData['uniqueID']) {
                    this.isValidData = false;
                }
                else {
                    do {
                        if (currentFlatData.parentItem) {
                            currentFlatData = this.parent.flatData[this.parent.ids.indexOf(currentFlatData.parentItem.taskId)];
                            if (currentFlatData.uniqueID === this.beforeOpenArgs.rowData['uniqueID']) {
                                this.isValidData = false;
                                break;
                            }
                        }
                    } while (currentFlatData.parentItem);
                }
                if (data.hasChildRecords && this.isValidData) {
                    this.isValidData = this.isParentValid(data.childRecords);
                }
                if (!this.isValidData) {
                    this.isValidData = true;
                    continue;
                }
            }
            else {
                if (data.hasChildRecords) {
                    continue;
                }
            }
            var taskId = this.parent.viewType === 'ResourceView' ? data.ganttProperties.taskId.toString()
                : data.ganttProperties.rowUniqueID.toString();
            var tempObject = {
                id: taskId,
                text: (taskId + '-' + data.ganttProperties.taskName),
                value: taskId
            };
            this.preTaskIds.push(tempObject.id);
            this.preTableCollection.push(tempObject);
        }
    };
    DialogEdit.prototype.predecessorEditCollection = function (ganttData) {
        var preDataCollection = [];
        var ganttProp = ganttData.ganttProperties;
        if (this.isEdit && !isNullOrUndefined(this.parent.taskFields.dependency) && !isNullOrUndefined(ganttData) &&
            !isNullOrUndefined(ganttProp.predecessor)) {
            var predecessor = ganttProp.predecessor;
            var idCollection = this.preTableCollection;
            for (var i = 0; i < predecessor.length; i++) {
                var from = predecessor[i].from.toString();
                var preData = {};
                var taskID = this.parent.viewType === 'ResourceView' ? ganttProp.taskId : ganttProp.rowUniqueID;
                if (taskID.toString() !== from) {
                    preData.id = from;
                    for (var index = 0; index < idCollection.length; index++) {
                        if (idCollection[index].value === from) {
                            preData.name = idCollection[index].text;
                            break;
                        }
                    }
                    preData.type = predecessor[i].type;
                    var offset = predecessor[i].offset;
                    var offsetUnit = predecessor[i].offsetUnit;
                    preData.offset = this.parent.dataOperation.getDurationString(offset, offsetUnit);
                    preData.uniqueId = getUid();
                    preDataCollection.push(preData);
                }
            }
        }
        return preDataCollection;
    };
    DialogEdit.prototype.updatePredecessorDropDownData = function (ganttData) {
        var index = -1;
        var id = this.parent.viewType === 'ResourceView' ? ganttData.ganttProperties.taskId.toString()
            : ganttData.ganttProperties.rowUniqueID.toString();
        index = this.preTaskIds.indexOf(id);
        this.preTableCollection.splice(index, 1);
        this.preTaskIds.splice(index, 1);
        this.validSuccessorTasks(ganttData, this.preTaskIds, this.preTableCollection);
    };
    DialogEdit.prototype.validSuccessorTasks = function (data, ids, idCollection) {
        var _this = this;
        var ganttProp = data.ganttProperties;
        if (ganttProp.predecessor && ganttProp.predecessor.length > 0) {
            var predecessor = ganttProp.predecessor;
            var fromId_1 = this.parent.viewType === 'ResourceView' ? ganttProp.taskId.toString() : ganttProp.rowUniqueID.toString();
            predecessor.forEach(function (item) {
                if (item.from.toString() === fromId_1) {
                    var toId = item.to;
                    var idIndex = -1;
                    idIndex = ids.indexOf(toId);
                    if (idIndex > -1) {
                        ids.splice(idIndex, 1);
                        idCollection.splice(idIndex, 1);
                    }
                    var ganttData = _this.parent.connectorLineModule.getRecordByID(toId);
                    _this.validSuccessorTasks(ganttData, ids, idCollection);
                }
            });
        }
    };
    DialogEdit.prototype.getPredecessorType = function () {
        var typeText = [this.parent.getPredecessorTextValue('SS'), this.parent.getPredecessorTextValue('SF'),
            this.parent.getPredecessorTextValue('FS'), this.parent.getPredecessorTextValue('FF')];
        var types = [
            { id: 'FS', text: typeText[2], value: typeText[2] },
            { id: 'FF', text: typeText[3], value: typeText[3] },
            { id: 'SS', text: typeText[0], value: typeText[0] },
            { id: 'SF', text: typeText[1], value: typeText[1] }
        ];
        return types;
    };
    DialogEdit.prototype.initiateDialogSave = function () {
        if (this.isEdit) {
            this.parent.initiateEditAction(true);
        }
        else {
            this.addedRecord = {};
        }
        var ganttObj = this.parent;
        var tabModel = this.beforeOpenArgs.tabModel;
        var items = tabModel.items;
        for (var i = 0; i < items.length; i++) {
            var element = items[i].content;
            var id = element.id;
            if (!isNullOrUndefined(id) || id !== '') {
                id = id.replace(ganttObj.element.id, '');
                id = id.replace('TabContainer', '');
                if (id === 'General') {
                    this.updateGeneralTab(element, false);
                }
                else if (id === 'Dependency') {
                    this.updatePredecessorTab(element);
                }
                else if (id === 'Notes') {
                    this.updateNotesTab(element);
                }
                else if (id === 'Resources') {
                    this.updateResourceTab(element);
                }
                else if (id.indexOf('Custom') !== -1) {
                    this.updateCustomTab(element);
                }
                else if (id === 'Segments') {
                    this.updateSegmentsData(element, this.beforeOpenArgs.rowData);
                }
            }
        }
        if (this.isEdit) {
            /**
             * If any update on edited task do it here
             */
            this.parent.dataOperation.updateWidthLeft(this.rowData);
            var editArgs = {
                data: this.rowData,
                action: 'DialogEditing'
            };
            this.parent.editModule.initiateUpdateAction(editArgs);
        }
        else {
            if (this.parent.viewType === 'ResourceView') {
                var newRecords = extend({}, this.addedRecord, true);
                if (newRecords[this.parent.taskFields.resourceInfo].length) {
                    for (var i = 0; i < newRecords[this.parent.taskFields.resourceInfo].length; i++) {
                        var id = newRecords[this.parent.taskFields.resourceInfo][i].toString();
                        var parentRecordIndex = this.parent.getTaskIds().indexOf('R' + id.toString());
                        if (parentRecordIndex !== -1) {
                            this.parent.editModule.addRecord(this.addedRecord, 'Child', parentRecordIndex);
                            break;
                        }
                    }
                }
                else {
                    this.parent.editModule.addRecord(this.addedRecord, 'Bottom');
                }
            }
            else {
                this.parent.editModule.addRecord(this.addedRecord, this.parent.editSettings.newRowPosition);
            }
        }
        return true;
    };
    DialogEdit.prototype.updateSegmentTaskData = function (dataSource) {
        var userData = [];
        var taskSettings = this.parent.taskFields;
        for (var i = 0; i < dataSource.length; i++) {
            var taskData = {};
            if (!isNullOrUndefined(taskSettings.startDate)) {
                taskData[this.parent.taskFields.startDate] = dataSource[i].startDate;
            }
            if (!isNullOrUndefined(taskSettings.endDate)) {
                taskData[this.parent.taskFields.endDate] = dataSource[i].endDate;
            }
            if (!isNullOrUndefined(taskSettings.duration)) {
                taskData[this.parent.taskFields.duration] = Number(dataSource[i].duration);
                dataSource[i].duration = taskData[this.parent.taskFields.duration];
            }
            userData.push(taskData);
        }
        if (!this.isEdit) {
            this.addedRecord[taskSettings.segments] = userData;
        }
        else {
            this.rowData.ganttProperties.segments = dataSource;
            this.parent.setRecordValue('segments', this.parent.dataOperation.setSegmentsInfo(this.rowData, false), this.rowData.ganttProperties, true);
            this.parent.setRecordValue('taskData.' + this.parent.taskFields.segments, userData, this.rowData);
            if (dataSource.length <= 0) {
                this.validateDuration(this.rowData);
            }
        }
    };
    // eslint-disable-next-line
    DialogEdit.prototype.updateSegmentsData = function (segmentForm, data) {
        var gridObj = segmentForm.ej2_instances[0];
        var isEdit = gridObj.isEdit;
        var dataSource;
        if (gridObj.isEdit) {
            gridObj.endEdit();
        }
        if (isEdit && gridObj.currentViewData.length != gridObj.dataSource['length']) {
            dataSource = gridObj.dataSource;
        }
        else {
            dataSource = gridObj.currentViewData;
        }
        this.updateSegmentTaskData(dataSource);
    };
    DialogEdit.prototype.updateGeneralTab = function (generalForm, isCustom) {
        var ganttObj = this.parent;
        var childNodes = generalForm.childNodes;
        var tasksData = {};
        if (!this.isEdit) {
            tasksData = this.addedRecord;
        }
        for (var i = 0; i < childNodes.length; i++) {
            var div = childNodes[i];
            var inputElement = div.querySelector('input[id^="' + ganttObj.element.id + '"]') || div.querySelector('textarea[id^="' + ganttObj.element.id + '"]');
            if (inputElement) {
                var fieldName = inputElement.id.replace(ganttObj.element.id, '');
                var controlObj = div.querySelector('#' + ganttObj.element.id + fieldName).ej2_instances[0];
                if (this.parent.columnByField[this.parent.taskFields.id].editType === "stringedit" && fieldName === this.parent.taskFields.id) {
                    var valueString = controlObj.value.toString();
                    controlObj.value = valueString;
                }
                var column = ganttObj.columnByField[fieldName];
                if (!isNullOrUndefined(column.edit) && isNullOrUndefined(column.edit.params)) {
                    var read = column.edit.read;
                    if (typeof read === 'string') {
                        read = getObject(read, window);
                        tasksData[fieldName] = read(inputElement, controlObj.value);
                    }
                    else {
                        tasksData[fieldName] = column.edit.read(inputElement, controlObj.value);
                    }
                }
                else if (isCustom && column.editType === 'booleanedit') {
                    if (inputElement instanceof HTMLInputElement && inputElement.checked === true) {
                        tasksData[fieldName] = true;
                    }
                    else {
                        tasksData[fieldName] = false;
                    }
                }
                else {
                    tasksData[fieldName] = controlObj.value;
                    if (this.parent.enableHtmlSanitizer && typeof (controlObj.value) === 'string') {
                        controlObj.value = SanitizeHtmlHelper.sanitize(controlObj.value);
                        tasksData[fieldName] = controlObj.value;
                    }
                }
            }
        }
        if (this.isEdit) {
            if (!isCustom) {
                this.updateScheduleProperties(this.editedRecord, this.rowData);
            }
            ganttObj.editModule.validateUpdateValues(tasksData, this.rowData, true);
        }
    };
    DialogEdit.prototype.updateScheduleProperties = function (fromRecord, toRecord) {
        this.parent.setRecordValue('startDate', fromRecord.ganttProperties.startDate, toRecord.ganttProperties, true);
        this.parent.setRecordValue('endDate', fromRecord.ganttProperties.endDate, toRecord.ganttProperties, true);
        this.parent.setRecordValue('duration', fromRecord.ganttProperties.duration, toRecord.ganttProperties, true);
        this.parent.setRecordValue('durationUnit', fromRecord.ganttProperties.durationUnit, toRecord.ganttProperties, true);
        this.parent.setRecordValue('work', fromRecord.ganttProperties.work, toRecord.ganttProperties, true);
        this.parent.setRecordValue('type', fromRecord.ganttProperties.taskType, toRecord.ganttProperties, true);
        this.parent.setRecordValue('resourceNames', fromRecord.ganttProperties.resourceNames, toRecord.ganttProperties, true);
        this.parent.setRecordValue('resourceInfo', fromRecord.ganttProperties.resourceInfo, toRecord.ganttProperties, true);
        if (!isNullOrUndefined(this.parent.taskFields.startDate)) {
            this.parent.dataOperation.updateMappingData(toRecord, this.parent.taskFields.startDate);
        }
        if (!isNullOrUndefined(this.parent.taskFields.endDate)) {
            this.parent.dataOperation.updateMappingData(toRecord, this.parent.taskFields.endDate);
        }
        if (!isNullOrUndefined(this.parent.taskFields.duration)) {
            this.parent.dataOperation.updateMappingData(toRecord, this.parent.taskFields.duration);
            this.parent.setRecordValue('durationUnit', fromRecord.ganttProperties.durationUnit, this.rowData, true);
            if (this.rowData.ganttProperties.duration === 0) {
                this.parent.setRecordValue('isMilestone', true, toRecord.ganttProperties, true);
            }
            else {
                this.parent.setRecordValue('isMilestone', false, this.rowData.ganttProperties, true);
            }
        }
        if (!isNullOrUndefined(this.parent.taskFields.work)) {
            this.parent.dataOperation.updateMappingData(this.rowData, this.parent.taskFields.work);
        }
        if (!isNullOrUndefined(this.parent.taskFields.manual)) {
            this.parent.dataOperation.updateMappingData(this.rowData, this.parent.taskFields.manual);
        }
        if (!isNullOrUndefined(this.parent.taskFields.type)) {
            this.parent.dataOperation.updateMappingData(this.rowData, "type");
        }
        if (!isNullOrUndefined(this.parent.taskFields.resourceInfo)) {
            this.parent.dataOperation.updateMappingData(this.rowData, "resourceInfo");
        }
    };
    DialogEdit.prototype.updatePredecessorTab = function (preElement) {
        var gridObj = preElement.ej2_instances[0];
        if (gridObj.isEdit) {
            gridObj.endEdit();
        }
        var dataSource = gridObj.dataSource;
        var predecessorName = [];
        var newValues = [];
        var predecessorString = '';
        var ids = [];
        for (var i = 0; i < dataSource.length; i++) {
            var preData = dataSource[i];
            if (ids.indexOf(preData.id) === -1) {
                var name_1 = preData.id + preData.type;
                if (preData.offset && preData.offset.indexOf('-') !== -1) {
                    name_1 += preData.offset;
                }
                else {
                    name_1 += ('+' + preData.offset);
                }
                predecessorName.push(name_1);
                ids.push(preData.id);
            }
        }
        if (this.isEdit) {
            if (predecessorName.length > 0) {
                newValues = this.parent.predecessorModule.calculatePredecessor(predecessorName.join(','), this.rowData);
                this.parent.setRecordValue('predecessor', newValues, this.rowData.ganttProperties, true);
                predecessorString = this.parent.predecessorModule.getPredecessorStringValue(this.rowData);
            }
            else {
                newValues = [];
                this.parent.setRecordValue('predecessor', newValues, this.rowData.ganttProperties, true);
                predecessorString = '';
            }
            this.parent.setRecordValue('predecessorsName', predecessorString, this.rowData.ganttProperties, true);
            this.parent.setRecordValue('taskData.' + this.parent.taskFields.dependency, predecessorString, this.rowData);
            this.parent.setRecordValue(this.parent.taskFields.dependency, predecessorString, this.rowData);
            this.parent.predecessorModule.updateUnscheduledDependency(this.rowData);
        }
        else {
            this.addedRecord[this.parent.taskFields.dependency] = predecessorName.length > 0 ? predecessorName.join(',') : '';
        }
    };
    DialogEdit.prototype.updateResourceTab = function (resourceElement) {
        var treeGridObj = resourceElement.ej2_instances[0];
        if (treeGridObj) {
            treeGridObj.grid.endEdit();
        }
        var selectedItems = this.ganttResources;
        if (this.parent.viewType === 'ResourceView' && !isNullOrUndefined(this.rowData.ganttProperties)) {
            if (JSON.stringify(this.ganttResources) !== JSON.stringify(this.rowData.ganttProperties.resourceInfo)) {
                this.isResourceUpdate = true;
                this.previousResource = !isNullOrUndefined(this.rowData.ganttProperties.resourceInfo) ? this.rowData.ganttProperties.resourceInfo.slice() : [];
            }
            else {
                this.isResourceUpdate = false;
            }
        }
        var idArray = [];
        if (this.isEdit) {
            this.parent.setRecordValue('resourceInfo', selectedItems, this.editedRecord.ganttProperties, true);
            this.parent.dataOperation.updateMappingData(this.editedRecord, 'resourceInfo');
            this.parent.editModule.updateResourceRelatedFields(this.editedRecord, 'resource');
            this.validateDuration(this.editedRecord);
            this.updateScheduleProperties(this.editedRecord, this.rowData);
        }
        else {
            for (var i = 0; i < selectedItems.length; i++) {
                idArray.push(selectedItems[i][this.parent.resourceFields.id]);
                this.isAddNewResource = true;
            }
            this.addedRecord[this.parent.taskFields.resourceInfo] = idArray;
        }
    };
    DialogEdit.prototype.updateNotesTab = function (notesElement) {
        var ganttObj = this.parent;
        var rte = notesElement.ej2_instances[0];
        if (this.isEdit) {
            if (ganttObj.columnByField[ganttObj.taskFields.notes].disableHtmlEncode === false) {
                this.parent.setRecordValue('notes', rte.getHtml(), this.rowData.ganttProperties, true);
            }
            else {
                this.parent.setRecordValue('notes', rte.getText(), this.rowData.ganttProperties, true);
            }
            ganttObj.dataOperation.updateMappingData(this.rowData, 'notes');
        }
        else {
            this.addedRecord[this.parent.taskFields.notes] = rte.getHtml();
        }
    };
    DialogEdit.prototype.updateCustomTab = function (customElement) {
        this.updateGeneralTab(customElement, true);
    };
    return DialogEdit;
}());
export { DialogEdit };
