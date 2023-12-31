import { isNullOrUndefined, isUndefined, extend, setValue, getValue, deleteObject, createElement } from '@syncfusion/ej2-base';
import { DataManager, Query, ODataAdaptor, WebApiAdaptor, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { getUid } from '@syncfusion/ej2-grids';
import { getSwapKey, isScheduledTask, getTaskData, isRemoteData, getIndex, isCountRequired, updateDates } from '../base/utils';
import { CellEdit } from './cell-edit';
import { TaskbarEdit } from './taskbar-edit';
import { DialogEdit } from './dialog-edit';
import { Dialog } from '@syncfusion/ej2-popups';
import { MultiSelect, CheckBoxSelection, DropDownList } from '@syncfusion/ej2-dropdowns';
import { ConnectorLineEdit } from './connector-line-edit';
/**
 * The Edit Module is used to handle editing actions.
 *
 */
var Edit = /** @class */ (function () {
    function Edit(parent) {
        this.isFromDeleteMethod = false;
        this.targetedRecords = [];
        this.isNewRecordAdded = false;
        this.isValidatedEditedRecord = false;
        /** @hidden */
        this.updateParentRecords = [];
        /** @hidden */
        this.isaddtoBottom = false;
        this.confirmDialog = null;
        this.taskbarMoved = false;
        this.predecessorUpdated = false;
        this.isBreakLoop = false;
        this.isResourceTaskDeleted = false;
        /**
         * @private
         */
        this.deletedTaskDetails = [];
        this.parent = parent;
        this.validatedChildItems = [];
        if (this.parent.editSettings.allowEditing && this.parent.editSettings.mode === 'Auto') {
            this.cellEditModule = new CellEdit(this.parent);
        }
        if (this.parent.taskFields.dependency) {
            this.parent.connectorLineEditModule = new ConnectorLineEdit(this.parent);
        }
        if (this.parent.editSettings.allowAdding || (this.parent.editSettings.allowEditing &&
            (this.parent.editSettings.mode === 'Dialog' || this.parent.editSettings.mode === 'Auto'))) {
            this.dialogModule = new DialogEdit(this.parent);
        }
        if (this.parent.editSettings.allowTaskbarEditing) {
            this.taskbarEditModule = new TaskbarEdit(this.parent);
        }
        if (this.parent.editSettings.allowDeleting) {
            var confirmDialog = createElement('div', {
                id: this.parent.element.id + '_deleteConfirmDialog'
            });
            this.parent.element.appendChild(confirmDialog);
            this.renderDeleteConfirmDialog();
        }
        this.parent.treeGrid.recordDoubleClick = this.recordDoubleClick.bind(this);
        this.parent.treeGrid.editSettings.allowAdding = this.parent.editSettings.allowAdding;
        this.parent.treeGrid.editSettings.allowDeleting = this.parent.editSettings.allowDeleting;
        this.parent.treeGrid.editSettings.showDeleteConfirmDialog = this.parent.editSettings.showDeleteConfirmDialog;
        this.parent.treeGrid.editSettings.allowNextRowEdit = this.parent.editSettings.allowNextRowEdit;
        this.updateDefaultColumnEditors();
    }
    Edit.prototype.getModuleName = function () {
        return 'edit';
    };
    /**
     * Method to update default edit params and editors for Gantt
     *
     * @returns {void} .
     */
    Edit.prototype.updateDefaultColumnEditors = function () {
        var customEditorColumns = [this.parent.taskFields.id, this.parent.taskFields.progress, this.parent.taskFields.resourceInfo, 'taskType'];
        for (var i = 0; i < customEditorColumns.length; i++) {
            if (!isNullOrUndefined(customEditorColumns[i]) && customEditorColumns[i].length > 0) {
                // eslint-disable-next-line
                var column = this.parent.getColumnByField(customEditorColumns[i], this.parent.treeGridModule.treeGridColumns);
                if (column) {
                    if (column.field === this.parent.taskFields.id) {
                        this.updateIDColumnEditParams(column);
                    }
                    else if (column.field === this.parent.taskFields.progress && isNullOrUndefined(column.edit)) {
                        this.updateProgessColumnEditParams(column);
                    }
                    else if (column.field === this.parent.taskFields.resourceInfo) {
                        this.updateResourceColumnEditor(column);
                    }
                    else if (column.field === 'taskType') {
                        this.updateTaskTypeColumnEditor(column);
                    }
                }
            }
        }
    };
    /**
     * Method to update editors for id column in Gantt
     *
     * @param {ColumnModel} column .
     * @returns {void} .
     */
    Edit.prototype.updateIDColumnEditParams = function (column) {
        var editParam = {
            min: 0,
            decimals: 0,
            enableRtl: this.parent.enableRtl,
            validateDecimalOnType: true,
            format: 'n0',
            showSpinButton: false
        };
        this.updateEditParams(column, editParam);
    };
    /**
     * Method to update edit params of default progress column
     *
     * @param {ColumnModel} column .
     * @returns {void} .
     */
    Edit.prototype.updateProgessColumnEditParams = function (column) {
        var editParam = {
            min: 0,
            enableRtl: this.parent.enableRtl,
            decimals: 0,
            validateDecimalOnType: true,
            max: 100,
            format: 'n0'
        };
        this.updateEditParams(column, editParam);
    };
    /**
     * Assign edit params for id and progress columns
     *
     * @param {ColumnModel} column .
     * @param {object} editParam .
     * @returns {void} .
     */
    Edit.prototype.updateEditParams = function (column, editParam) {
        if (isNullOrUndefined(column.edit)) {
            column.edit = {};
            column.edit.params = {};
        }
        else if (isNullOrUndefined(column.edit.params)) {
            column.edit.params = {};
        }
        extend(editParam, column.edit.params);
        column.edit.params = editParam;
        var ganttColumn = this.parent.getColumnByField(column.field, this.parent.ganttColumns);
        ganttColumn.edit = column.edit;
    };
    /**
     * Method to update resource column editor for default resource column
     *
     * @param {ColumnModel} column .
     * @returns {void} .
     */
    Edit.prototype.updateResourceColumnEditor = function (column) {
        if (this.parent.editSettings.allowEditing && isNullOrUndefined(column.edit) && this.parent.editSettings.mode === 'Auto') {
            column.editType = 'dropdownedit';
            column.edit = this.getResourceEditor();
            var ganttColumn = this.parent.getColumnByField(column.field, this.parent.ganttColumns);
            ganttColumn.editType = 'dropdownedit';
            ganttColumn.edit = column.edit;
        }
    };
    /**
     * Method to create resource custom editor
     *
     * @returns {IEditCell} .
     */
    Edit.prototype.getResourceEditor = function () {
        var _this = this;
        var resourceSettings = this.parent.resourceFields;
        var editObject = {};
        var editor;
        MultiSelect.Inject(CheckBoxSelection);
        editObject.write = function (args) {
            _this.parent.treeGridModule.currentEditRow = {};
            editor = new MultiSelect({
                dataSource: new DataManager(_this.parent.resources),
                fields: { text: resourceSettings.name, value: resourceSettings.id },
                enableRtl: _this.parent.enableRtl,
                mode: 'CheckBox',
                showDropDownIcon: true,
                popupHeight: '350px',
                delimiterChar: ',',
                value: _this.parent.treeGridModule.getResourceIds(args.rowData)
            });
            editor.appendTo(args.element);
        };
        editObject.read = function (element) {
            var value = element.ej2_instances[0].value;
            var resourcesName = [];
            if (isNullOrUndefined(value)) {
                value = [];
            }
            for (var i = 0; i < value.length; i++) {
                for (var j = 0; j < _this.parent.resources.length; j++) {
                    if (_this.parent.resources[j][resourceSettings.id] === value[i]) {
                        resourcesName.push(_this.parent.resources[j][resourceSettings.name]);
                        break;
                    }
                }
            }
            _this.parent.treeGridModule.currentEditRow[_this.parent.taskFields.resourceInfo] = value;
            return resourcesName.join(',');
        };
        editObject.destroy = function () {
            if (editor) {
                editor.destroy();
            }
        };
        return editObject;
    };
    /**
     * Method to update task type column editor for task type
     *
     * @param {ColumnModel} column .
     * @returns {void} .
     */
    Edit.prototype.updateTaskTypeColumnEditor = function (column) {
        if (this.parent.editSettings.allowEditing && isNullOrUndefined(column.edit) && this.parent.editSettings.mode === 'Auto') {
            column.editType = 'dropdownedit';
            column.edit = this.getTaskTypeEditor();
            var ganttColumn = this.parent.getColumnByField(column.field, this.parent.ganttColumns);
            ganttColumn.editType = 'dropdownedit';
            ganttColumn.edit = column.edit;
        }
    };
    /**
     * Method to create task type custom editor
     *
     * @returns {IEditCell} .
     */
    Edit.prototype.getTaskTypeEditor = function () {
        var _this = this;
        var editObject = {};
        var editor;
        var types = [{ 'ID': 1, 'Value': 'FixedUnit' }, { 'ID': 2, 'Value': 'FixedWork' }, { 'ID': 3, 'Value': 'FixedDuration' }];
        editObject.write = function (args) {
            _this.parent.treeGridModule.currentEditRow = {};
            editor = new DropDownList({
                dataSource: new DataManager(types),
                enableRtl: _this.parent.enableRtl,
                fields: { value: 'Value' },
                popupHeight: '350px',
                value: getValue('taskType', args.rowData.ganttProperties)
            });
            editor.appendTo(args.element);
        };
        editObject.read = function (element) {
            var value = element.ej2_instances[0].value;
            var key = 'taskType';
            _this.parent.treeGridModule.currentEditRow[key] = value;
            return value;
        };
        editObject.destroy = function () {
            if (editor) {
                editor.destroy();
            }
        };
        return editObject;
    };
    /**
     * @returns {void} .
     * @private
     */
    Edit.prototype.reUpdateEditModules = function () {
        var editSettings = this.parent.editSettings;
        if (editSettings.allowEditing) {
            if (this.parent.editModule.cellEditModule && editSettings.mode === 'Dialog') {
                this.cellEditModule.destroy();
                this.parent.treeGrid.recordDoubleClick = this.recordDoubleClick.bind(this);
            }
            else if (isNullOrUndefined(this.parent.editModule.cellEditModule) && editSettings.mode === 'Auto') {
                this.cellEditModule = new CellEdit(this.parent);
            }
            if (this.parent.editModule.dialogModule && editSettings.mode === 'Auto') {
                this.parent.treeGrid.recordDoubleClick = undefined;
            }
            else if (isNullOrUndefined(this.parent.editModule.dialogModule)) {
                this.dialogModule = new DialogEdit(this.parent);
            }
        }
        else {
            if (this.cellEditModule) {
                this.cellEditModule.destroy();
            }
            if (this.dialogModule) {
                this.dialogModule.destroy();
            }
        }
        if (editSettings.allowDeleting && editSettings.showDeleteConfirmDialog) {
            if (isNullOrUndefined(this.confirmDialog)) {
                var confirmDialog = createElement('div', {
                    id: this.parent.element.id + '_deleteConfirmDialog'
                });
                this.parent.element.appendChild(confirmDialog);
                this.renderDeleteConfirmDialog();
            }
        }
        else if (!editSettings.allowDeleting || !editSettings.showDeleteConfirmDialog) {
            if (this.confirmDialog && !this.confirmDialog.isDestroyed) {
                this.confirmDialog.destroy();
            }
        }
        if (editSettings.allowTaskbarEditing) {
            if (isNullOrUndefined(this.parent.editModule.taskbarEditModule)) {
                this.taskbarEditModule = new TaskbarEdit(this.parent);
            }
        }
        else {
            if (this.taskbarEditModule) {
                this.taskbarEditModule.destroy();
            }
        }
    };
    Edit.prototype.recordDoubleClick = function (args) {
        if (this.parent.editSettings.allowEditing && this.parent.editSettings.mode === 'Dialog') {
            var ganttData = void 0;
            if (args.row) {
                var rowIndex = getValue('rowIndex', args.row);
                ganttData = this.parent.currentViewData[rowIndex];
            }
            if (!isNullOrUndefined(ganttData)) {
                this.dialogModule.openEditDialog(ganttData);
            }
        }
        this.parent.ganttChartModule.recordDoubleClick(args);
    };
    /**
     * @returns {void} .
     * @private
     */
    Edit.prototype.destroy = function () {
        if (this.cellEditModule) {
            this.cellEditModule.destroy();
        }
        if (this.taskbarEditModule) {
            this.taskbarEditModule.destroy();
        }
        if (this.dialogModule) {
            this.dialogModule.destroy();
        }
        if (this.confirmDialog && !this.confirmDialog.isDestroyed) {
            this.confirmDialog.destroy();
        }
    };
    /**
     * Method to update record with new values.
     *
     * @param {Object} data - Defines new data to update.
     * @returns {void} .
     */
    Edit.prototype.updateRecordByID = function (data) {
        if (!this.parent.readOnly) {
            var tasks = this.parent.taskFields;
            if (isNullOrUndefined(data) || isNullOrUndefined(data[tasks.id])) {
                return;
            }
            var ganttData = this.parent.viewType === 'ResourceView' ?
                this.parent.flatData[this.parent.getTaskIds().indexOf('T' + data[tasks.id])] : this.parent.getRecordByID(data[tasks.id]);
            if (!isNullOrUndefined(this.parent.editModule) && ganttData) {
                this.parent.isOnEdit = true;
                this.validateUpdateValues(data, ganttData, true);
                if (data[this.parent.taskFields.resourceInfo]) {
                    if (ganttData.ganttProperties.duration === 0) {
                        this.parent.dataOperation.updateWorkWithDuration(ganttData);
                    }
                    this.updateResourceRelatedFields(ganttData, 'resource');
                    this.parent.dateValidationModule.calculateEndDate(ganttData);
                }
                var keys = Object.keys(data);
                if (keys.indexOf(tasks.startDate) !== -1 || keys.indexOf(tasks.endDate) !== -1 ||
                    keys.indexOf(tasks.duration) !== -1) {
                    this.parent.dataOperation.calculateScheduledValues(ganttData, ganttData.taskData, false);
                }
                this.parent.dataOperation.updateWidthLeft(ganttData);
                if (!isUndefined(data[this.parent.taskFields.dependency]) &&
                    data[this.parent.taskFields.dependency] !== ganttData.ganttProperties.predecessorsName) {
                    this.parent.connectorLineEditModule.updatePredecessor(ganttData, data[this.parent.taskFields.dependency]);
                }
                else {
                    var args = {};
                    args.data = ganttData;
                    if (this.parent.viewType === 'ResourceView') {
                        args.action = 'methodUpdate';
                    }
                    this.parent.editModule.initiateUpdateAction(args);
                }
            }
        }
    };
    /**
     *
     * @param {object} data .
     * @param {IGanttData} ganttData .
     * @param {boolean} isFromDialog .
     * @returns {void} .
     * @private
     */
    Edit.prototype.validateUpdateValues = function (data, ganttData, isFromDialog) {
        var ganttObj = this.parent;
        var tasks = ganttObj.taskFields;
        var ganttPropByMapping = getSwapKey(ganttObj.columnMapping);
        var scheduleFieldNames = [];
        var isScheduleValueUpdated = false;
        for (var _i = 0, _b = Object.keys(data); _i < _b.length; _i++) {
            var key = _b[_i];
            if ([tasks.startDate, tasks.endDate, tasks.duration].indexOf(key) !== -1) {
                if (isNullOrUndefined(data["" + key]) && !ganttObj.allowUnscheduledTasks) {
                    continue;
                }
                if (isFromDialog) {
                    if (tasks.duration === key) {
                        ganttObj.dataOperation.updateDurationValue(data[key], ganttData.ganttProperties);
                        if (ganttData.ganttProperties.duration > 0 && ganttData.ganttProperties.isMilestone) {
                            this.parent.setRecordValue('isMilestone', false, ganttData.ganttProperties, true);
                        }
                        ganttObj.dataOperation.updateMappingData(ganttData, ganttPropByMapping[key]);
                    }
                    else {
                        var tempDate = typeof data[key] === 'string' ? new Date(data[key]) : data[key];
                        ganttObj.setRecordValue(ganttPropByMapping[key], tempDate, ganttData.ganttProperties, true);
                        ganttObj.dataOperation.updateMappingData(ganttData, ganttPropByMapping[key]);
                    }
                }
                else {
                    scheduleFieldNames.push(key);
                    isScheduleValueUpdated = true;
                }
            }
            else if (tasks.resourceInfo === key) {
                var resourceData = ganttObj.dataOperation.setResourceInfo(data);
                if (this.parent.viewType === 'ResourceView') {
                    if (JSON.stringify(resourceData) !== JSON.stringify(ganttData.ganttProperties.resourceInfo)) {
                        this.parent.editModule.dialogModule.isResourceUpdate = true;
                        this.parent.editModule.dialogModule.previousResource = !isNullOrUndefined(ganttData.ganttProperties.resourceInfo) ? ganttData.ganttProperties.resourceInfo.slice() : [];
                    }
                    else {
                        this.parent.editModule.dialogModule.isResourceUpdate = false;
                    }
                }
                ganttData.ganttProperties.resourceInfo = resourceData;
                ganttObj.dataOperation.updateMappingData(ganttData, 'resourceInfo');
            }
            else if (tasks.dependency === key) {
                //..
            }
            else if ([tasks.progress, tasks.notes, tasks.durationUnit, tasks.expandState,
                tasks.milestone, tasks.name, tasks.baselineStartDate,
                tasks.baselineEndDate, tasks.id, tasks.segments, tasks.cssClass].indexOf(key) !== -1) {
                var column = ganttObj.columnByField[key];
                /* eslint-disable-next-line */
                var value = data[key];
                if (!isNullOrUndefined(column) && (column.editType === 'datepickeredit' || column.editType === 'datetimepickeredit')) {
                    value = ganttObj.dataOperation.getDateFromFormat(value);
                }
                var ganttPropKey = ganttPropByMapping[key];
                if (key === tasks.id) {
                    ganttPropKey = 'taskId';
                }
                else if (key === tasks.name) {
                    ganttPropKey = 'taskName';
                }
                else if (key === tasks.cssClass) {
                    ganttPropKey = 'cssClass';
                }
                else if ((key === tasks.segments) && (!isNullOrUndefined(ganttData.ganttProperties.segments))) {
                    ganttPropKey = 'segments';
                    /* eslint-disable-next-line */
                    if (data && !isNullOrUndefined(data[this.parent.taskFields.segments]) && data[this.parent.taskFields.segments].length > 0) {
                        var totDuration = 0;
                        for (var i = 0; i < ganttData.ganttProperties.segments.length; i++) {
                            totDuration = totDuration + ganttData.ganttProperties.segments[i].duration;
                        }
                        var sdate = ganttData.ganttProperties.startDate;
                        /* eslint-disable-next-line */
                        var edate = this.parent.dataOperation.getEndDate(sdate, totDuration, ganttData.ganttProperties.durationUnit, ganttData.ganttProperties, false);
                        ganttObj.setRecordValue('endDate', ganttObj.dataOperation.getDateFromFormat(edate), ganttData.ganttProperties, true);
                    }
                }
                if (!isNullOrUndefined(ganttPropKey)) {
                    ganttObj.setRecordValue(ganttPropKey, value, ganttData.ganttProperties, true);
                }
                if ((key === tasks.baselineStartDate || key === tasks.baselineEndDate) &&
                    (ganttData.ganttProperties.baselineStartDate && ganttData.ganttProperties.baselineEndDate)) {
                    ganttObj.setRecordValue('baselineStartDate', ganttObj.dataOperation.checkBaselineStartDate(ganttData.ganttProperties.baselineStartDate), ganttData.ganttProperties, true);
                    if (ganttData.ganttProperties.baselineEndDate && ganttData.ganttProperties.baselineEndDate.getHours() === 0 && this.parent.defaultEndTime !== 86400) {
                        ganttObj.dataOperation.setTime(this.parent.defaultEndTime, ganttData.ganttProperties.baselineEndDate);
                    }
                    ganttObj.setRecordValue('baselineEndDate', ganttObj.dataOperation.checkBaselineEndDate(ganttData.ganttProperties.baselineEndDate), ganttData.ganttProperties, true);
                    ganttObj.setRecordValue('baselineLeft', ganttObj.dataOperation.calculateBaselineLeft(ganttData.ganttProperties), ganttData.ganttProperties, true);
                    ganttObj.setRecordValue('baselineWidth', ganttObj.dataOperation.calculateBaselineWidth(ganttData.ganttProperties), ganttData.ganttProperties, true);
                }
                ganttObj.setRecordValue('taskData.' + key, value, ganttData);
                /* eslint-disable-next-line */
                if (key === tasks.segments && data && !isNullOrUndefined(data[this.parent.taskFields.segments]) && data[this.parent.taskFields.segments].length > 0) {
                    ganttObj.dataOperation.setSegmentsInfo(ganttData, true);
                }
                ganttObj.setRecordValue(key, value, ganttData);
            }
            else if (tasks.indicators === key) {
                var value = data[key];
                ganttObj.setRecordValue('indicators', value, ganttData.ganttProperties, true);
                ganttObj.setRecordValue('taskData.' + key, value, ganttData);
                ganttObj.setRecordValue(key, value, ganttData);
            }
            else if (tasks.work === key) {
                ganttObj.setRecordValue('work', data[key], ganttData.ganttProperties, true);
                this.parent.dataOperation.updateMappingData(ganttData, 'work');
                this.parent.dataOperation.updateMappingData(ganttData, 'duration');
                this.parent.dataOperation.updateMappingData(ganttData, 'endDate');
            }
            else if (key === tasks.type) {
                ganttObj.setRecordValue('taskType', data[key], ganttData.ganttProperties, true);
                //this.parent.dataOperation.updateMappingData(ganttData, 'taskType');
            }
            else if (ganttObj.customColumns.indexOf(key) !== -1) {
                var column = ganttObj.columnByField[key];
                /* eslint-disable-next-line */
                var value = data[key];
                if (isNullOrUndefined(column.edit)) {
                    if (column.editType === 'datepickeredit' || column.editType === 'datetimepickeredit') {
                        value = ganttObj.dataOperation.getDateFromFormat(value);
                    }
                }
                ganttObj.setRecordValue('taskData.' + key, value, ganttData);
                ganttObj.setRecordValue(key, value, ganttData);
            }
            else if (tasks.manual === key) {
                ganttObj.setRecordValue('isAutoSchedule', !data[key], ganttData.ganttProperties, true);
                this.parent.setRecordValue(key, data[key], ganttData);
                this.updateTaskScheduleModes(ganttData);
            }
        }
        if (isScheduleValueUpdated) {
            this.validateScheduleValues(scheduleFieldNames, ganttData, data);
        }
    };
    /**
     * To update duration, work, resource unit
     *
     * @param {IGanttData} currentData .
     * @param {string} column .
     * @returns {void} .
     */
    Edit.prototype.updateResourceRelatedFields = function (currentData, column) {
        var ganttProp = currentData.ganttProperties;
        var taskType = ganttProp.taskType;
        var isEffectDriven;
        var isAutoSchedule = ganttProp.isAutoSchedule;
        if (!isNullOrUndefined(ganttProp.resourceInfo)) {
            if (ganttProp.work > 0 || column === 'work') {
                switch (taskType) {
                    case 'FixedUnit':
                        if (ganttProp.resourceInfo.length === 0) {
                            return;
                        }
                        else if (isAutoSchedule && ganttProp.resourceInfo.length &&
                            (column === 'work' || (column === 'resource'))) {
                            this.parent.dataOperation.updateDurationWithWork(currentData);
                        }
                        else if (!isAutoSchedule && column === 'work') {
                            this.parent.dataOperation.updateUnitWithWork(currentData);
                        }
                        else {
                            this.parent.dataOperation.updateWorkWithDuration(currentData);
                        }
                        break;
                    case 'FixedWork':
                        if (ganttProp.resourceInfo.length === 0) {
                            return;
                        }
                        else if (isAutoSchedule) {
                            if (column === 'duration' || column === 'endDate') {
                                this.parent.dataOperation.updateUnitWithWork(currentData);
                                if (ganttProp.duration === 0) {
                                    this.parent.setRecordValue('work', 0, ganttProp, true);
                                    if (!isNullOrUndefined(this.parent.taskFields.work)) {
                                        this.parent.dataOperation.updateMappingData(currentData, 'work');
                                    }
                                }
                            }
                            else {
                                this.parent.dataOperation.updateDurationWithWork(currentData);
                            }
                        }
                        else {
                            if (column === 'work') {
                                this.parent.dataOperation.updateUnitWithWork(currentData);
                            }
                            else {
                                this.parent.dataOperation.updateWorkWithDuration(currentData);
                            }
                        }
                        break;
                    case 'FixedDuration':
                        if (ganttProp.resourceInfo.length && (column === 'work' || (isAutoSchedule &&
                            isEffectDriven && (column === 'resource')))) {
                            this.parent.dataOperation.updateUnitWithWork(currentData);
                        }
                        else {
                            this.parent.dataOperation.updateWorkWithDuration(currentData);
                        }
                        break;
                }
            }
            else {
                this.parent.dataOperation.updateWorkWithDuration(currentData);
            }
        }
    };
    Edit.prototype.validateScheduleValues = function (fieldNames, ganttData, data) {
        var ganttObj = this.parent;
        if (fieldNames.length > 2) {
            ganttObj.dataOperation.calculateScheduledValues(ganttData, data, false);
        }
        else if (fieldNames.length > 1) {
            this.validateScheduleByTwoValues(data, fieldNames, ganttData);
        }
        else {
            this.dialogModule.validateScheduleValuesByCurrentField(fieldNames[0], data[fieldNames[0]], ganttData);
        }
    };
    Edit.prototype.validateScheduleByTwoValues = function (data, fieldNames, ganttData) {
        var ganttObj = this.parent;
        var startDate;
        var endDate;
        var duration;
        var tasks = ganttObj.taskFields;
        var ganttProp = ganttData.ganttProperties;
        var isUnscheduledTask = ganttObj.allowUnscheduledTasks;
        if (fieldNames.indexOf(tasks.startDate) !== -1) {
            startDate = data[tasks.startDate];
        }
        if (fieldNames.indexOf(tasks.endDate) !== -1) {
            endDate = data[tasks.endDate];
        }
        if (fieldNames.indexOf(tasks.duration) !== -1) {
            duration = data[tasks.duration];
        }
        if (startDate && endDate || (isUnscheduledTask && (fieldNames.indexOf(tasks.startDate) !== -1) &&
            (fieldNames.indexOf(tasks.endDate) !== -1))) {
            ganttObj.setRecordValue('startDate', ganttObj.dataOperation.getDateFromFormat(startDate), ganttProp, true);
            ganttObj.setRecordValue('endDate', ganttObj.dataOperation.getDateFromFormat(endDate), ganttProp, true);
            ganttObj.dataOperation.calculateDuration(ganttData);
        }
        else if (endDate && duration || (isUnscheduledTask &&
            (fieldNames.indexOf(tasks.endDate) !== -1) && (fieldNames.indexOf(tasks.duration) !== -1))) {
            ganttObj.setRecordValue('endDate', ganttObj.dataOperation.getDateFromFormat(endDate), ganttProp, true);
            ganttObj.dataOperation.updateDurationValue(duration, ganttProp);
        }
        else if (startDate && duration || (isUnscheduledTask && (fieldNames.indexOf(tasks.startDate) !== -1)
            && (fieldNames.indexOf(tasks.duration) !== -1))) {
            ganttObj.setRecordValue('startDate', ganttObj.dataOperation.getDateFromFormat(startDate), ganttProp, true);
            ganttObj.dataOperation.updateDurationValue(duration, ganttProp);
        }
    };
    Edit.prototype.isTaskbarMoved = function (data) {
        var isMoved = false;
        var taskData = data.ganttProperties;
        var prevData = this.parent.previousRecords &&
            this.parent.previousRecords[data.uniqueID];
        if (prevData && prevData.ganttProperties) {
            var prevStart = getValue('ganttProperties.startDate', prevData);
            var prevEnd = getValue('ganttProperties.endDate', prevData);
            var prevDuration = getValue('ganttProperties.duration', prevData);
            var prevDurationUnit = getValue('ganttProperties.durationUnit', prevData);
            var keys = Object.keys(prevData.ganttProperties);
            if (keys.indexOf('startDate') !== -1 || keys.indexOf('endDate') !== -1 ||
                keys.indexOf('duration') !== -1 || keys.indexOf('durationUnit') !== -1) {
                if ((isNullOrUndefined(prevStart) && !isNullOrUndefined(taskData.startDate)) ||
                    (isNullOrUndefined(prevEnd) && !isNullOrUndefined(taskData.endDate)) ||
                    (isNullOrUndefined(taskData.startDate) && !isNullOrUndefined(prevStart)) ||
                    (isNullOrUndefined(taskData.endDate) && !isNullOrUndefined(prevEnd)) ||
                    (prevStart && prevStart.getTime() !== taskData.startDate.getTime())
                    || (prevEnd && prevEnd.getTime() !== taskData.endDate.getTime())
                    || (!isNullOrUndefined(prevDuration) && prevDuration !== taskData.duration)
                    || (!isNullOrUndefined(prevDuration) && prevDuration === taskData.duration &&
                        prevDurationUnit !== taskData.durationUnit)) {
                    isMoved = true;
                }
            }
        }
        return isMoved;
    };
    Edit.prototype.isPredecessorUpdated = function (data) {
        var isPredecessorUpdated = false;
        var prevData = this.parent.previousRecords[data.uniqueID];
        // eslint-disable-next-line
        if (prevData && prevData.ganttProperties && prevData.ganttProperties.hasOwnProperty('predecessor')) {
            if (data.ganttProperties.predecessorsName !== prevData.ganttProperties.predecessorsName) {
                isPredecessorUpdated = true;
            }
            else {
                this.parent.setRecordValue('predecessor', prevData.ganttProperties.predecessor, data.ganttProperties, true);
            }
        }
        return isPredecessorUpdated;
    };
    /**
     * Method to check need to open predecessor validate dialog
     *
     * @param {IGanttData} data .
     * @returns {boolean} .
     */
    Edit.prototype.isCheckPredecessor = function (data) {
        var isValidatePredecessor = false;
        var prevData = this.parent.previousRecords[data.uniqueID];
        if (prevData && this.parent.taskFields.dependency && this.parent.isInPredecessorValidation &&
            this.parent.predecessorModule.getValidPredecessor(data).length > 0) {
            if (this.isTaskbarMoved(data)) {
                isValidatePredecessor = true;
            }
        }
        return isValidatePredecessor;
    };
    /**
     * Method to copy the ganttProperties values
     *
     * @param {IGanttData} data .
     * @param {IGanttData} updateData .
     * @returns {void} .
     * @private
     */
    Edit.prototype.updateGanttProperties = function (data, updateData) {
        var skipProperty = ['taskId', 'uniqueID', 'rowUniqueID', 'parentId'];
        Object.keys(data.ganttProperties).forEach(function (property) {
            if (skipProperty.indexOf(property) === -1) {
                updateData.ganttProperties[property] = data.ganttProperties[property];
            }
        });
    };
    /**
     * Method to update all dependent record on edit action
     *
     * @param {ITaskAddedEventArgs} args .
     * @returns {void} .
     * @private
     */
    Edit.prototype.initiateUpdateAction = function (args) {
        var isValidatePredecessor = this.isCheckPredecessor(args.data);
        var parentData;
        var childRecordIndex;
        if (!isNullOrUndefined(args.data.parentItem) && !isValidatePredecessor) {
            parentData = this.parent.getRecordByID(args.data.parentItem.taskId);
            if (this.isTaskbarMoved(args.data) && this.parent.predecessorModule.getValidPredecessor(parentData).length > 0
                && this.parent.isInPredecessorValidation) {
                isValidatePredecessor = true;
            }
            else {
                isValidatePredecessor = false;
            }
        }
        else if (args.data.childRecords.length > 0 && !isValidatePredecessor) {
            isValidatePredecessor = this.isCheckPredecessor(args.data);
            if (!isValidatePredecessor && this.isTaskbarMoved(args.data)) {
                for (var i = 0; i < args.data.childRecords.length; i++) {
                    if (this.parent.predecessorModule.getValidPredecessor(args.data.childRecords[i]).length > 0) {
                        childRecordIndex = i;
                        isValidatePredecessor = true;
                    }
                }
            }
        }
        this.taskbarMoved = this.isTaskbarMoved(args.data);
        this.predecessorUpdated = this.isPredecessorUpdated(args.data);
        if (this.predecessorUpdated) {
            this.parent.isConnectorLineUpdate = true;
            this.parent.connectorLineEditModule.addRemovePredecessor(args.data);
        }
        var validateObject = {};
        if (isValidatePredecessor) {
            if (!isNullOrUndefined(parentData)) {
                validateObject = this.parent.connectorLineEditModule.validateTypes(parentData, args.data);
            }
            else if (!isNullOrUndefined(childRecordIndex)) {
                validateObject = this.parent.connectorLineEditModule.validateTypes(args.data.childRecords[childRecordIndex], args.data);
            }
            else {
                validateObject = this.parent.connectorLineEditModule.validateTypes(args.data);
            }
            this.parent.isConnectorLineUpdate = true;
            if (!isNullOrUndefined(getValue('violationType', validateObject))) {
                var newArgs = this.validateTaskEvent(args);
                if (newArgs.validateMode.preserveLinkWithEditing === false &&
                    newArgs.validateMode.removeLink === false &&
                    newArgs.validateMode.respectLink === false) {
                    this.parent.connectorLineEditModule.openValidationDialog(validateObject);
                }
                else {
                    if (this.parent.editModule && this.parent.editModule.dialogModule &&
                        this.parent.editModule.dialogModule['isEdit'] && this.predecessorUpdated) {
                        this.isValidatedEditedRecord = true;
                        this.parent.predecessorModule.validatePredecessor(args.data, [], '');
                    }
                    this.parent.connectorLineEditModule.applyPredecessorOption();
                }
            }
            else {
                this.updateEditedTask(args);
            }
        }
        else {
            if (this.taskbarMoved) {
                this.parent.isConnectorLineUpdate = true;
            }
            this.updateEditedTask(args);
        }
    };
    /**
     *
     * @param {ITaskbarEditedEventArgs} editedEventArgs method to trigger validate predecessor link by dialog
     * @returns {IValidateArgs} .
     */
    Edit.prototype.validateTaskEvent = function (editedEventArgs) {
        var newArgs = {};
        this.resetValidateArgs();
        this.parent.currentEditedArgs = newArgs;
        newArgs.cancel = false;
        newArgs.data = editedEventArgs.data;
        newArgs.requestType = 'validateLinkedTask';
        newArgs.validateMode = this.parent.dialogValidateMode;
        newArgs.editEventArgs = editedEventArgs;
        this.parent.actionBeginTask(newArgs);
        return newArgs;
    };
    Edit.prototype.resetValidateArgs = function () {
        this.parent.dialogValidateMode.preserveLinkWithEditing = true;
        this.parent.dialogValidateMode.removeLink = false;
        this.parent.dialogValidateMode.respectLink = false;
    };
    /**
     *
     * @param {ITaskAddedEventArgs} args - Edited event args like taskbar editing, dialog editing, cell editing
     * @returns {void} .
     * @private
     */
    Edit.prototype.updateEditedTask = function (args) {
        var ganttRecord = args.data;
        if (this.parent.autoCalculateDateScheduling) {
            this.updateParentChildRecord(ganttRecord);
        }
        if (this.parent.isConnectorLineUpdate && this.parent.autoCalculateDateScheduling) {
            /* validating predecessor for updated child items */
            for (var i = 0; i < this.validatedChildItems.length; i++) {
                var child = this.validatedChildItems[i];
                if (child.ganttProperties.predecessor && child.ganttProperties.predecessor.length > 0) {
                    this.parent.editedTaskBarItem = child;
                    this.parent.predecessorModule.validatePredecessor(child, [], '');
                }
            }
            this.parent.predecessorModule.isValidatedParentTaskID = '';
            /** validating predecessor for current edited records */
            if (ganttRecord.ganttProperties.predecessor) {
                this.parent.isMileStoneEdited = ganttRecord.ganttProperties.isMilestone;
                if (this.taskbarMoved) {
                    this.parent.editedTaskBarItem = ganttRecord;
                }
                if (!this.isValidatedEditedRecord) {
                    this.parent.predecessorModule.validatePredecessor(ganttRecord, [], '');
                }
                this.isValidatedEditedRecord = false;
                this.parent.predecessorModule.isValidatedParentTaskID = '';
            }
            if (this.parent.allowParentDependency && ganttRecord.hasChildRecords && this.parent.previousRecords[ganttRecord.uniqueID].ganttProperties.startDate &&
                (args.action === "DrawConnectorLine") || (args.action === "DialogEditing")) {
                this.updateChildItems(ganttRecord);
            }
            this.updateParentItemOnEditing();
        }
        /** Update parent up-to zeroth level */
        if (ganttRecord.parentItem) {
            if (this.parent.autoCalculateDateScheduling) {
                this.parent.dataOperation.updateParentItems(ganttRecord, true);
            }
            var parentData = this.parent.getRecordByID(ganttRecord.parentItem.taskId);
            if (!parentData.ganttProperties.predecessorsName) {
                this.parent.predecessorModule.validatePredecessor(parentData, [], '');
                this.updateParentItemOnEditing();
            }
        }
        this.initiateSaveAction(args);
    };
    Edit.prototype.updateParentItemOnEditing = function () {
        var childRecord = getValue('parentRecord', this.parent.predecessorModule);
        for (var i = 0; i < childRecord.length; i++) {
            this.parent.dataOperation.updateParentItems(childRecord[i]);
        }
        setValue('parentRecord', [], this.parent.predecessorModule);
        setValue('parentIds', [], this.parent.predecessorModule);
    };
    /**
     * To update parent records while perform drag action.
     *
     * @param {IGanttData} data .
     * @returns {void} .
     * @private
     */
    Edit.prototype.updateParentChildRecord = function (data) {
        var ganttRecord = data;
        if (ganttRecord.hasChildRecords && this.taskbarMoved && this.parent.taskMode === 'Auto' && (!isNullOrUndefined(this.parent.editModule.cellEditModule) && !this.parent.editModule.cellEditModule.isResourceCellEdited)) {
            this.updateChildItems(ganttRecord);
        }
        if (!isNullOrUndefined(this.parent.editModule.cellEditModule)) {
            this.parent.editModule.cellEditModule.isResourceCellEdited = false;
        }
    };
    /**
     * To update records while changing schedule mode.
     *
     * @param {IGanttData} data .
     * @returns {void} .
     * @private
     */
    Edit.prototype.updateTaskScheduleModes = function (data) {
        var currentValue = data[this.parent.taskFields.startDate];
        var ganttProp = data.ganttProperties;
        if (data.hasChildRecords && ganttProp.isAutoSchedule) {
            this.parent.setRecordValue('startDate', ganttProp.autoStartDate, ganttProp, true);
            this.parent.setRecordValue('endDate', ganttProp.autoEndDate, ganttProp, true);
            this.parent.setRecordValue('StartDate', ganttProp.autoStartDate, data, true);
            this.parent.setRecordValue('EndDate', ganttProp.autoEndDate, data, true);
            this.parent.setRecordValue('taskData.StartDate', ganttProp.autoStartDate, data, true);
            this.parent.setRecordValue('taskData.EndDate', ganttProp.autoEndDate, data, true);
            this.parent.setRecordValue('width', this.parent.dataOperation.calculateWidth(data, true), ganttProp, true);
            this.parent.setRecordValue('left', this.parent.dataOperation.calculateLeft(ganttProp, true), ganttProp, true);
            this.parent.setRecordValue('progressWidth', this.parent.dataOperation.getProgressWidth(ganttProp.width, ganttProp.progress), ganttProp, true);
            this.parent.dataOperation.calculateDuration(data);
        }
        else if (data.hasChildRecords && !ganttProp.isAutoSchedule) {
            this.parent.dataOperation.updateWidthLeft(data);
            this.parent.dataOperation.calculateDuration(data);
            this.parent.setRecordValue('autoStartDate', ganttProp.autoStartDate, ganttProp, true);
            this.parent.setRecordValue('autoEndDate', ganttProp.autoEndDate, ganttProp, true);
            this.parent.setRecordValue('autoDuration', this.parent.dataOperation.calculateAutoDuration(data), ganttProp, true);
            this.parent.dataOperation.updateAutoWidthLeft(data);
        }
        else {
            var startDate = this.parent.dateValidationModule.checkStartDate(currentValue, data.ganttProperties);
            this.parent.setRecordValue('startDate', startDate, data.ganttProperties, true);
            this.parent.dataOperation.updateMappingData(data, 'startDate');
            this.parent.dateValidationModule.calculateEndDate(data);
            this.parent.setRecordValue('taskData.' + this.parent.taskFields.manual, data[this.parent.taskFields.manual], data);
            this.parent.dataOperation.updateWidthLeft(data);
        }
    };
    /**
     *
     * @param {IGanttData} data .
     * @param {Date} newStartDate .
     * @returns {void} .
     */
    Edit.prototype.calculateDateByRoundOffDuration = function (data, newStartDate) {
        var ganttRecord = data;
        var taskData = ganttRecord.ganttProperties;
        var projectStartDate = new Date(newStartDate.getTime());
        if (!isNullOrUndefined(taskData.endDate) && isNullOrUndefined(taskData.startDate)) {
            var endDate = this.parent.dateValidationModule.checkStartDate(projectStartDate, taskData, null);
            this.parent.setRecordValue('endDate', this.parent.dateValidationModule.checkEndDate(endDate, ganttRecord.ganttProperties), taskData, true);
        }
        else {
            this.parent.setRecordValue('startDate', this.parent.dateValidationModule.checkStartDate(projectStartDate, taskData, false), taskData, true);
            if (!isNullOrUndefined(taskData.duration)) {
                this.parent.dateValidationModule.calculateEndDate(ganttRecord);
            }
        }
        this.parent.dataOperation.updateWidthLeft(data);
        this.parent.dataOperation.updateTaskData(ganttRecord);
    };
    /**
     * To update progress value of parent tasks
     *
     * @param {IParent} cloneParent .
     * @returns {void} .
     * @private
     */
    Edit.prototype.updateParentProgress = function (cloneParent) {
        var parentProgress = 0;
        var parent = this.parent.getParentTask(cloneParent);
        var childRecords = parent.childRecords;
        var childCount = childRecords ? childRecords.length : 0;
        var totalProgress = 0;
        var milesStoneCount = 0;
        var taskCount = 0;
        var totalDuration = 0;
        var progressValues = {};
        if (childRecords) {
            for (var i = 0; i < childCount; i++) {
                if ((!childRecords[i].ganttProperties.isMilestone || childRecords[i].hasChildRecords) &&
                    isScheduledTask(childRecords[i].ganttProperties)) {
                    progressValues = this.parent.dataOperation.getParentProgress(childRecords[i]);
                    totalProgress += getValue('totalProgress', progressValues);
                    totalDuration += getValue('totalDuration', progressValues);
                }
                else {
                    milesStoneCount += 1;
                }
            }
            taskCount = childCount - milesStoneCount;
            parentProgress = taskCount > 0 ? Math.round(totalProgress / totalDuration) : 0;
            if (isNaN(parentProgress)) {
                parentProgress = 0;
            }
            this.parent.setRecordValue('progressWidth', this.parent.dataOperation.getProgressWidth(parent.ganttProperties.isAutoSchedule ? parent.ganttProperties.width : parent.ganttProperties.autoWidth, parentProgress), parent.ganttProperties, true);
            this.parent.setRecordValue('progress', Math.floor(parentProgress), parent.ganttProperties, true);
            this.parent.setRecordValue('totalProgress', totalProgress, parent.ganttProperties, true);
            this.parent.setRecordValue('totalDuration', totalDuration, parent.ganttProperties, true);
        }
        this.parent.dataOperation.updateTaskData(parent);
        if (parent.parentItem) {
            this.updateParentProgress(parent.parentItem);
        }
    };
    /**
     * Method to revert cell edit action
     *
     * @param {object} args .
     * @returns {void} .
     * @private
     */
    // eslint-disable-next-line
    Edit.prototype.revertCellEdit = function (args) {
        this.parent.editModule.reUpdatePreviousRecords(false, true);
        this.resetEditProperties();
    };
    /**
     * @param {boolean} isRefreshChart .
     * @param {boolean} isRefreshGrid .
     * @returns {void} .
     * @private
     */
    Edit.prototype.reUpdatePreviousRecords = function (isRefreshChart, isRefreshGrid) {
        var collection = this.parent.previousRecords;
        var keys = Object.keys(collection);
        for (var i = 0; i < keys.length; i++) {
            var uniqueId = keys[i];
            var prevTask = collection[uniqueId];
            var originalData = this.parent.getTaskByUniqueID(uniqueId);
            this.copyTaskData(originalData.taskData, prevTask.taskData);
            delete prevTask.taskData;
            this.copyTaskData(originalData.ganttProperties, prevTask.ganttProperties);
            delete prevTask.ganttProperties;
            this.copyTaskData(originalData, prevTask);
            var rowIndex = this.parent.currentViewData.indexOf(originalData);
            if (isRefreshChart) {
                this.parent.chartRowsModule.refreshRow(rowIndex);
            }
            if (isRefreshGrid) {
                var dataId = this.parent.viewType === 'ProjectView' ? originalData.ganttProperties.taskId : originalData.ganttProperties.rowUniqueID;
                this.parent.treeGrid.grid.setRowData(dataId, originalData);
                var row = this.parent.treeGrid.grid.getRowObjectFromUID(this.parent.treeGrid.grid.getDataRows()[rowIndex].getAttribute('data-uid'));
                row.data = originalData;
            }
        }
    };
    /**
     * Copy previous task data value to edited task data
     *
     * @param {object} existing .
     * @param {object} newValue .
     * @returns {void} .
     */
    Edit.prototype.copyTaskData = function (existing, newValue) {
        if (!isNullOrUndefined(newValue)) {
            extend(existing, newValue);
        }
    };
    /**
     * To update schedule date on editing.
     *
     * @param {ITaskbarEditedEventArgs} args .
     * @returns {void} .
     * @private
     */
    // eslint-disable-next-line
    Edit.prototype.updateScheduleDatesOnEditing = function (args) {
        //..
    };
    /**
     *
     * @param {IGanttData} ganttRecord .
     * @returns {void} .
     */
    Edit.prototype.updateChildItems = function (ganttRecord) {
        var previousData = this.parent.previousRecords[ganttRecord.uniqueID];
        var previousStartDate;
        if (isNullOrUndefined(previousData) ||
            (isNullOrUndefined(previousData) && !isNullOrUndefined(previousData.ganttProperties))) {
            previousStartDate = new Date(ganttRecord.ganttProperties.startDate.getTime());
        }
        else {
            if (!isNullOrUndefined(previousData.ganttProperties.startDate)) {
                previousStartDate = new Date(previousData.ganttProperties.startDate.getTime());
            }
        }
        var currentStartDate = ganttRecord.ganttProperties.startDate;
        var childRecords = [];
        var validStartDate;
        var validEndDate;
        var calcEndDate;
        var isRightMove;
        var durationDiff;
        this.getUpdatableChildRecords(ganttRecord, childRecords);
        if (childRecords.length === 0) {
            return;
        }
        if (!isNullOrUndefined(previousStartDate) && !isNullOrUndefined(currentStartDate) && previousStartDate.getTime() > currentStartDate.getTime()) {
            validStartDate = this.parent.dateValidationModule.checkStartDate(currentStartDate);
            validEndDate = this.parent.dateValidationModule.checkEndDate(previousStartDate, ganttRecord.ganttProperties);
            isRightMove = false;
        }
        else {
            validStartDate = this.parent.dateValidationModule.checkStartDate(previousStartDate);
            validEndDate = this.parent.dateValidationModule.checkEndDate(currentStartDate, ganttRecord.ganttProperties);
            isRightMove = true;
        }
        //Get Duration
        if (!isNullOrUndefined(validStartDate) && !isNullOrUndefined(validEndDate) && validStartDate.getTime() >= validEndDate.getTime()) {
            durationDiff = 0;
        }
        else {
            durationDiff = this.parent.dateValidationModule.getDuration(validStartDate, validEndDate, 'minute', true, false);
        }
        for (var i = 0; i < childRecords.length; i++) {
            if (childRecords[i].ganttProperties.isAutoSchedule) {
                if (durationDiff > 0) {
                    var startDate = isScheduledTask(childRecords[i].ganttProperties) ?
                        childRecords[i].ganttProperties.startDate : childRecords[i].ganttProperties.startDate ?
                        childRecords[i].ganttProperties.startDate : childRecords[i].ganttProperties.endDate ?
                        childRecords[i].ganttProperties.endDate : new Date(previousStartDate.toString());
                    if (isRightMove) {
                        calcEndDate = this.parent.dateValidationModule.getEndDate(this.parent.dateValidationModule.checkStartDate(startDate, childRecords[i].ganttProperties, childRecords[i].ganttProperties.isMilestone), durationDiff, 'minute', childRecords[i].ganttProperties, false);
                    }
                    else {
                        calcEndDate = this.parent.dateValidationModule.getStartDate(this.parent.dateValidationModule.checkEndDate(startDate, childRecords[i].ganttProperties), durationDiff, 'minute', childRecords[i].ganttProperties);
                    }
                    this.calculateDateByRoundOffDuration(childRecords[i], calcEndDate);
                    if (this.parent.isOnEdit && this.validatedChildItems.indexOf(childRecords[i]) === -1) {
                        this.validatedChildItems.push(childRecords[i]);
                    }
                }
                else if (isNullOrUndefined(previousData)) {
                    calcEndDate = previousStartDate;
                    var initialData = this.parent.initialLoadData[childRecords[i].index];
                    if (this.parent.isLoad) {
                        this.calculateDateByRoundOffDuration(initialData, calcEndDate);
                    }
                    else {
                        this.calculateDateByRoundOffDuration(childRecords[i], calcEndDate);
                    }
                    if (this.parent.isOnEdit && this.validatedChildItems.indexOf(childRecords[i]) === -1) {
                        this.validatedChildItems.push(childRecords[i]);
                    }
                }
            }
        }
        if (childRecords.length) {
            this.parent.dataOperation.updateParentItems(ganttRecord, true);
        }
    };
    /**
     * To get updated child records.
     *
     * @param {IGanttData} parentRecord .
     * @param {IGanttData} childLists .
     * @returns {void} .
     */
    Edit.prototype.getUpdatableChildRecords = function (parentRecord, childLists) {
        var childRecords = parentRecord.childRecords;
        for (var i = 0; i < childRecords.length; i++) {
            if (childRecords[i].ganttProperties.isAutoSchedule) {
                childLists.push(childRecords[i]);
                if (childRecords[i].hasChildRecords) {
                    this.getUpdatableChildRecords(childRecords[i], childLists);
                }
            }
        }
    };
    /**
     * @param {ITaskbarEditedEventArgs} args .
     * @returns {void} .
     * @private
     */
    Edit.prototype.initiateSaveAction = function (args) {
        var _this = this;
        var eventArgs = {};
        eventArgs.requestType = 'beforeSave';
        eventArgs.data = args.data;
        eventArgs.cancel = false;
        eventArgs.modifiedRecords = this.parent.editedRecords;
        if (!isNullOrUndefined(args.target)) {
            eventArgs.target = args.target;
        }
        eventArgs.modifiedTaskData = getTaskData(this.parent.editedRecords, true);
        if (args.action && args.action === 'DrawConnectorLine') {
            eventArgs.action = 'DrawConnectorLine';
        }
        this.parent.trigger('actionBegin', eventArgs, function (eventArg) {
            if (!isNullOrUndefined(_this.parent.loadingIndicator) && _this.parent.loadingIndicator.indicatorType === "Shimmer") {
                _this.parent.showMaskRow();
            }
            else {
                _this.parent.showSpinner();
            }
            if (eventArg.cancel) {
                _this.reUpdatePreviousRecords();
                _this.parent.chartRowsModule.refreshRecords([args.data]);
                _this.resetEditProperties(eventArgs);
                // Trigger action complete event with save canceled request type
            }
            else {
                eventArg.modifiedTaskData = getTaskData(eventArg.modifiedRecords, null, null, _this.parent);
                if (isRemoteData(_this.parent.dataSource)) {
                    var data = _this.parent.dataSource;
                    var updatedData = {
                        changedRecords: eventArg.modifiedTaskData
                    };
                    var query = _this.parent.query instanceof Query ? _this.parent.query : new Query();
                    var crud = null;
                    var dataAdaptor = data.adaptor;
                    if (!(dataAdaptor instanceof WebApiAdaptor && dataAdaptor instanceof ODataAdaptor) || data.dataSource.batchUrl) {
                        crud = data.saveChanges(updatedData, _this.parent.taskFields.id, null, query);
                    }
                    else {
                        var changedRecords = 'changedRecords';
                        crud = data.update(_this.parent.taskFields.id, updatedData[changedRecords], null, query);
                    }
                    crud.then(function (e) { return _this.dmSuccess(e, args); })
                        .catch(function (e) { return _this.dmFailure(e, args); });
                }
                else {
                    _this.saveSuccess(args);
                }
            }
        });
    };
    Edit.prototype.dmSuccess = function (e, args) {
        var eLength;
        var rec;
        if (e.changedRecords) {
            eLength = e.changedRecords['length'];
        }
        else {
            eLength = e['length'];
        }
        for (var i = 0; i < eLength; i++) {
            if (e.changedRecords) {
                rec = e.changedRecords[parseInt(i.toString(), 10)];
            }
            else {
                rec = e[parseInt(i.toString(), 10)];
            }
            var _aLength = Object.keys(rec).length;
            for (var j = 0, _a = Object.keys(rec); j < _aLength; j++) {
                var key = _a[parseInt(j.toString(), 10)];
                this.parent.editedRecords[parseInt(i.toString(), 10)]["" + key] = rec["" + key];
                this.parent.editedRecords[parseInt(i.toString(), 10)].taskData["" + key] = rec["" + key];
            }
            if (this.parent.taskFields.id !== null) {
                this.parent.editedRecords[parseInt(i.toString(), 10)].ganttProperties['taskId'] = rec[this.parent.taskFields.id];
            }
            if (this.parent.taskFields.name !== null) {
                this.parent.editedRecords[parseInt(i.toString(), 10)].ganttProperties['taskName'] = rec[this.parent.taskFields.name];
            }
            if (this.parent.taskFields.startDate !== null) {
                this.parent.editedRecords[parseInt(i.toString(), 10)].ganttProperties['startDate'] = rec[this.parent.taskFields.startDate];
            }
            if (this.parent.taskFields.endDate !== null) {
                this.parent.editedRecords[parseInt(i.toString(), 10)].ganttProperties['endDate'] = rec[this.parent.taskFields.endDate];
            }
            if (this.parent.taskFields.duration !== null) {
                this.parent.editedRecords[parseInt(i.toString(), 10)].ganttProperties['duration'] = parseInt(rec[this.parent.taskFields.duration]);
            }
            if (this.parent.taskFields.durationUnit !== null) {
                this.parent.editedRecords[parseInt(i.toString(), 10)].ganttProperties['durationUnit'] = rec[this.parent.taskFields.durationUnit];
            }
            if (this.parent.taskFields.progress !== null) {
                this.parent.editedRecords[parseInt(i.toString(), 10)].ganttProperties['progress'] = rec[this.parent.taskFields.progress];
            }
            if (this.parent.taskFields.dependency !== null) {
                this.parent.editedRecords[parseInt(i.toString(), 10)].ganttProperties['dependency'] = rec[this.parent.taskFields.dependency];
            }
            if (this.parent.taskFields.parentID !== null) {
                this.parent.editedRecords[parseInt(i.toString(), 10)].ganttProperties['parentID'] = rec[this.parent.taskFields.parentID];
            }
            if (this.parent.taskFields.baselineEndDate !== null) {
                this.parent.editedRecords[parseInt(i.toString(), 10)].ganttProperties['baselineEndDate'] = rec[this.parent.taskFields.baselineEndDate];
            }
            if (this.parent.taskFields.baselineStartDate !== null) {
                this.parent.editedRecords[parseInt(i.toString(), 10)].ganttProperties['baselineStartDate'] = rec[this.parent.taskFields.baselineStartDate];
            }
            if (this.parent.taskFields.resourceInfo !== null) {
                this.parent.editedRecords[parseInt(i.toString(), 10)].ganttProperties['resources'] = rec[this.parent.taskFields.resourceInfo];
            }
        }
        this.saveSuccess(args);
    };
    Edit.prototype.dmFailure = function (e, args) {
        if (this.deletedTaskDetails.length) {
            var deleteRecords = this.deletedTaskDetails;
            for (var d = 0; d < deleteRecords.length; d++) {
                deleteRecords[d].isDelete = false;
            }
            this.deletedTaskDetails = [];
        }
        this.reUpdatePreviousRecords(true, true);
        this.resetEditProperties();
        this.parent.trigger('actionFailure', { error: e });
    };
    Edit.prototype.updateSharedTask = function (data) {
        var ids = data.ganttProperties.sharedTaskUniqueIds;
        for (var i = 0; i < ids.length; i++) {
            var editRecord = this.parent.flatData[this.parent.ids.indexOf(ids[i].toString())];
            if (editRecord && editRecord.uniqueID !== data.uniqueID) {
                this.updateGanttProperties(data, editRecord);
                this.parent.setRecordValue('taskData', data.taskData, editRecord, true);
                this.parent.dataOperation.updateTaskData(editRecord);
                this.parent.dataOperation.updateResourceName(editRecord);
                if (!isNullOrUndefined(editRecord.parentItem)) {
                    this.parent.dataOperation.updateParentItems(editRecord.parentItem);
                }
            }
        }
    };
    /**
     * Method for save action success for local and remote data
     *
     * @param {ITaskAddedEventArgs} args .
     * @returns {void} .
     */
    Edit.prototype.saveSuccess = function (args) {
        var eventArgs = {};
        if (this.parent.timelineSettings.updateTimescaleView) {
            var tempArray = this.parent.editedRecords;
            this.parent.timelineModule.updateTimeLineOnEditing([tempArray], args.action);
        }
        if (this.parent.viewType === 'ResourceView') {
            if (args.action === 'TaskbarEditing') {
                this.updateSharedTask(args.data);
            }
            else if (args.action === 'DialogEditing' || args.action === 'CellEditing' || args.action === 'methodUpdate') {
                if (this.parent.editModule.dialogModule.isResourceUpdate) {
                    /* eslint-disable-next-line */
                    this.updateResoures(this.parent.editModule.dialogModule.previousResource, args.data.ganttProperties.resourceInfo, args.data);
                    this.updateSharedTask(args.data);
                    this.isTreeGridRefresh = true;
                }
                else {
                    this.updateSharedTask(args.data);
                }
            }
            // method to update the edited parent records
            for (var k = 0; k < this.updateParentRecords.length; k++) {
                this.parent.dataOperation.updateParentItems(this.updateParentRecords[k]);
            }
            this.updateParentRecords = [];
            this.parent.editModule.dialogModule.isResourceUpdate = false;
            this.parent.editModule.dialogModule.previousResource = [];
        }
        if (!this.isTreeGridRefresh) {
            this.parent.chartRowsModule.refreshRecords(this.parent.editedRecords);
            if (this.parent.viewType === 'ResourceView' && !this.parent.allowTaskbarOverlap && this.parent.showOverAllocation) {
                this.parent.contentHeight = this.parent['element'].getElementsByClassName('e-content')[0].children[0]['offsetHeight'];
                this.parent.ganttChartModule.chartBodyContent.style.height = this.parent.contentHeight + 'px';
                this.parent.ganttChartModule.renderRangeContainer(this.parent.currentViewData);
                if (this.parent.taskFields.dependency) {
                    this.parent.ganttChartModule.reRenderConnectorLines();
                }
            }
            if (this.parent.isConnectorLineUpdate && !isNullOrUndefined(this.parent.connectorLineEditModule)) {
                // this.parent.updatedConnectorLineCollection = [];
                // this.parent.connectorLineIds = [];
                this.parent.connectorLineEditModule.refreshEditedRecordConnectorLine(this.parent.editedRecords);
                this.updateScheduleDatesOnEditing(args);
            }
        }
        if (!this.parent.editSettings.allowTaskbarEditing || (this.parent.editSettings.allowTaskbarEditing &&
            !this.taskbarEditModule.dependencyCancel)) {
            eventArgs.requestType = 'save';
            eventArgs.data = args.data;
            eventArgs.modifiedRecords = this.parent.editedRecords;
            eventArgs.modifiedTaskData = getTaskData(this.parent.editedRecords, null, null, this.parent);
            if (!isNullOrUndefined(args.action)) {
                setValue('action', args.action, eventArgs);
            }
            if (args.action === 'TaskbarEditing') {
                eventArgs.taskBarEditAction = args.taskBarEditAction;
            }
            this.endEditAction(args);
            if (this.parent.enableCriticalPath) {
                var criticalModule = this.parent.criticalPathModule;
                criticalModule.showCriticalPath(true);
                criticalModule.criticalConnectorLine(criticalModule.criticalPathCollection, criticalModule.detailPredecessorCollection, true, criticalModule.predecessorCollectionTaskIds);
            }
            this.parent.trigger('actionComplete', eventArgs);
            if (!isNullOrUndefined(this.parent.loadingIndicator) && this.parent.loadingIndicator.indicatorType === "Shimmer") {
                this.parent.hideMaskRow();
            }
            else {
                this.parent.hideSpinner();
            }
        }
        else {
            this.taskbarEditModule.dependencyCancel = false;
            this.resetEditProperties();
        }
        if (this.parent.viewType === 'ResourceView' && this.isTreeGridRefresh) {
            this.parent.treeGrid.parentData = [];
            this.parent.treeGrid.refresh();
            this.isTreeGridRefresh = false;
        }
    };
    Edit.prototype.updateResoures = function (prevResource, currentResource, updateRecord) {
        var flatRecords = this.parent.flatData;
        var currentLength = currentResource ? currentResource.length : 0;
        var previousLength = prevResource ? prevResource.length : 0;
        if (currentLength === 0 && previousLength === 0) {
            return;
        }
        for (var index = 0; index < currentLength; index++) {
            var recordIndex = [];
            var resourceID = parseInt(currentResource[index][this.parent.resourceFields.id], 10).toString();
            if (resourceID === 'NaN') {
                resourceID = currentResource[index][this.parent.resourceFields.id];
            }
            for (var i = 0; i < prevResource.length; i++) {
                var prevResourceID = parseInt(prevResource[i][this.parent.resourceFields.id], 10).toString();
                if (prevResourceID === 'NaN') {
                    prevResourceID = prevResource[i][this.parent.resourceFields.id];
                }
                if (prevResourceID === resourceID) {
                    recordIndex.push(i);
                    break;
                }
            }
            if (recordIndex.length === 0) {
                var parentRecord = flatRecords[this.parent.getTaskIds().indexOf('R' + resourceID)];
                if (parentRecord) {
                    this.addNewRecord(updateRecord, parentRecord);
                }
            }
            else {
                var record1 = parseInt(recordIndex[0].toString(), 10);
                if (record1.toString() === "NaN") {
                    record1 = recordIndex[0].toString();
                }
                prevResource.splice(record1, 1);
            }
        }
        var prevLength = prevResource ? prevResource.length : 0;
        for (var index = 0; index < prevLength; index++) {
            var taskID = updateRecord.ganttProperties.taskId;
            var resourceID = prevResource[index][this.parent.resourceFields.id];
            var record = flatRecords[this.parent.getTaskIds().indexOf('R' + resourceID)];
            for (var j = 0; j < record.childRecords.length; j++) {
                if (record.childRecords[j].ganttProperties.taskId === taskID) {
                    this.removeChildRecord(record.childRecords[j]);
                }
            }
        }
        if (currentLength > 0) {
            var parentTask = this.parent.getParentTask(updateRecord.parentItem);
            if (parentTask) {
                if (parentTask.ganttProperties.taskName === this.parent.localeObj.getConstant('unassignedTask')) {
                    this.removeChildRecord(updateRecord);
                }
            }
        }
        //Assign resource to unassigned task
        if (currentLength === 0) {
            this.checkWithUnassignedTask(updateRecord);
        }
    };
    /**
     * @param {IGanttData} updateRecord .
     * @returns {void} .
     * @private
     */
    Edit.prototype.checkWithUnassignedTask = function (updateRecord) {
        var unassignedTasks = null;
        // Block for check the unassigned task.
        for (var i = 0; i < this.parent.flatData.length; i++) {
            if (this.parent.flatData[i].ganttProperties.taskName === this.parent.localeObj.getConstant('unassignedTask')) {
                unassignedTasks = this.parent.flatData[i];
            }
        }
        if (!isNullOrUndefined(unassignedTasks)) {
            this.addNewRecord(updateRecord, unassignedTasks);
        }
        else {
            // Block for create the unassigned task.
            var unassignTaskObj = {};
            unassignTaskObj[this.parent.taskFields.id] = 0;
            unassignTaskObj[this.parent.taskFields.name] = this.parent.localeObj.getConstant('unassignedTask');
            var beforeEditStatus = this.parent.isOnEdit;
            this.parent.isOnEdit = false;
            var cAddedRecord = this.parent.dataOperation.createRecord(unassignTaskObj, 0);
            this.parent.isOnEdit = beforeEditStatus;
            this.addRecordAsBottom(cAddedRecord);
            var parentRecord = this.parent.flatData[this.parent.flatData.length - 1];
            this.addNewRecord(updateRecord, parentRecord);
            var source = this.parent.dataSource;
            source.push(updateRecord.taskData);
        }
        var updatedData = this.parent.currentViewData.filter(function (data) {
            return (data.ganttProperties.taskId === updateRecord.ganttProperties.taskId &&
                (data.hasChildRecords === updateRecord.hasChildRecords));
        })[0];
        updateRecord.parentItem = updatedData.parentItem;
        updateRecord.parentUniqueID = updatedData.parentUniqueID;
    };
    Edit.prototype.addRecordAsBottom = function (cAddedRecord) {
        var recordIndex1 = this.parent.flatData.length;
        this.parent.currentViewData.splice(recordIndex1 + 1, 0, cAddedRecord);
        this.parent.flatData.splice(recordIndex1 + 1, 0, cAddedRecord);
        this.parent.ids.splice(recordIndex1 + 1, 0, cAddedRecord.ganttProperties.rowUniqueID.toString());
        var taskId = cAddedRecord.level === 0 ? 'R' + cAddedRecord.ganttProperties.taskId : 'T' + cAddedRecord.ganttProperties.taskId;
        this.parent.getTaskIds().splice(recordIndex1 + 1, 0, taskId);
        this.updateTreeGridUniqueID(cAddedRecord, 'add');
    };
    Edit.prototype.addNewRecord = function (updateRecord, parentRecord) {
        var cAddedRecord = null;
        cAddedRecord = extend({}, {}, updateRecord, true);
        this.parent.setRecordValue('uniqueID', getUid(this.parent.element.id + '_data_'), cAddedRecord);
        this.parent.setRecordValue('uniqueID', cAddedRecord.uniqueID, cAddedRecord.ganttProperties, true);
        var uniqueId = cAddedRecord.uniqueID.replace(this.parent.element.id + '_data_', '');
        this.parent.setRecordValue('rowUniqueID', uniqueId, cAddedRecord);
        this.parent.setRecordValue('rowUniqueID', uniqueId, cAddedRecord.ganttProperties, true);
        this.parent.setRecordValue('level', 1, cAddedRecord);
        if (this.parent.taskFields.parentID) {
            this.parent.setRecordValue('parentId', parentRecord.ganttProperties.taskId, cAddedRecord.ganttProperties, true);
        }
        this.parent.setRecordValue('parentItem', this.parent.dataOperation.getCloneParent(parentRecord), cAddedRecord);
        var parentUniqId = cAddedRecord.parentItem ? cAddedRecord.parentItem.uniqueID : null;
        this.parent.setRecordValue('parentUniqueID', parentUniqId, cAddedRecord);
        updateRecord.ganttProperties.sharedTaskUniqueIds.push(uniqueId);
        cAddedRecord.ganttProperties.sharedTaskUniqueIds = updateRecord.ganttProperties.sharedTaskUniqueIds;
        this.addRecordAsChild(parentRecord, cAddedRecord);
    };
    Edit.prototype.removeChildRecord = function (record) {
        var gObj = this.parent;
        var data = [];
        if (this.parent.dataSource instanceof DataManager && this.parent.dataSource.dataSource.json.length > 0) {
            data = this.parent.dataSource.dataSource.json;
        }
        else {
            data = this.parent.currentViewData;
        }
        var dataSource = this.parent.dataSource;
        var deletedRow = record;
        var flatParentData = this.parent.getParentTask(deletedRow.parentItem);
        if (deletedRow) {
            if (deletedRow.parentItem) {
                var deleteChildRecords = flatParentData ? flatParentData.childRecords : [];
                var childIndex = 0;
                if (deleteChildRecords && deleteChildRecords.length > 0) {
                    if (deleteChildRecords.length === 1) {
                        //For updating the parent record which has no child reords.
                        this.parent.isOnDelete = true;
                        deleteChildRecords[0].isDelete = true;
                        this.parent.dataOperation.updateParentItems(flatParentData);
                        this.parent.isOnDelete = false;
                        deleteChildRecords[0].isDelete = false;
                    }
                    childIndex = deleteChildRecords.indexOf(deletedRow);
                    flatParentData.childRecords.splice(childIndex, 1);
                    // collection for updating parent record
                    this.updateParentRecords.push(flatParentData);
                }
            }
            if (deletedRow.ganttProperties.sharedTaskUniqueIds.length) {
                var uniqueIDIndex = deletedRow.ganttProperties.sharedTaskUniqueIds.indexOf(deletedRow.ganttProperties.rowUniqueID);
                deletedRow.ganttProperties.sharedTaskUniqueIds.splice(uniqueIDIndex, 1);
            }
            this.updateTreeGridUniqueID(deletedRow, 'delete');
            //method to delete the record from datasource collection
            if (!this.parent.taskFields.parentID) {
                var deleteRecordIDs = [];
                deleteRecordIDs.push(deletedRow.ganttProperties.rowUniqueID.toString());
                this.parent.editModule.removeFromDataSource(deleteRecordIDs);
            }
            var flatRecordIndex = this.parent.flatData.indexOf(deletedRow);
            if (gObj.taskFields.parentID) {
                var idx = void 0;
                var ganttData = this.parent.currentViewData;
                for (var i = 0; i < ganttData.length; i++) {
                    if (ganttData[i].ganttProperties.rowUniqueID === deletedRow.ganttProperties.rowUniqueID) {
                        idx = i;
                    }
                }
                if (idx !== -1) {
                    if (dataSource.length > 0) {
                        dataSource.splice(idx, 1);
                    }
                    data.splice(idx, 1);
                    this.parent.flatData.splice(flatRecordIndex, 1);
                    this.parent.ids.splice(flatRecordIndex, 1);
                    this.parent.getTaskIds().splice(flatRecordIndex, 1);
                }
            }
            var recordIndex = data.indexOf(deletedRow);
            if (!gObj.taskFields.parentID) {
                var deletedRecordCount = this.parent.editModule.getChildCount(deletedRow, 0);
                data.splice(recordIndex, deletedRecordCount + 1);
                this.parent.flatData.splice(flatRecordIndex, deletedRecordCount + 1);
                this.parent.ids.splice(flatRecordIndex, deletedRecordCount + 1);
                this.parent.getTaskIds().splice(flatRecordIndex, deletedRecordCount + 1);
            }
            if (deletedRow.parentItem && flatParentData && flatParentData.childRecords && !flatParentData.childRecords.length) {
                this.parent.setRecordValue('expanded', false, flatParentData);
                this.parent.setRecordValue('hasChildRecords', false, flatParentData);
            }
        }
    };
    // Method to add new record after resource edit
    Edit.prototype.addRecordAsChild = function (droppedRecord, draggedRecord) {
        var gObj = this.parent;
        var recordIndex1 = this.parent.flatData.indexOf(droppedRecord);
        var childRecords = this.parent.editModule.getChildCount(droppedRecord, 0);
        var childRecordsLength;
        if (!isNullOrUndefined(this.addRowIndex) && this.addRowPosition && droppedRecord.childRecords && this.addRowPosition !== 'Child') {
            var dropChildRecord = droppedRecord.childRecords[this.addRowIndex];
            var position = this.addRowPosition === 'Above' || this.addRowPosition === 'Below' ? this.addRowPosition :
                'Child';
            childRecordsLength = dropChildRecord ? this.addRowIndex + recordIndex1 + 1 :
                childRecords + recordIndex1 + 1;
            childRecordsLength = position === 'Above' ? childRecordsLength : childRecordsLength + 1;
        }
        else {
            childRecordsLength = (isNullOrUndefined(childRecords) ||
                childRecords === 0) ? recordIndex1 + 1 :
                childRecords + recordIndex1 + 1;
        }
        //this.ganttData.splice(childRecordsLength, 0, this.draggedRecord);
        this.parent.currentViewData.splice(childRecordsLength, 0, draggedRecord);
        this.parent.flatData.splice(childRecordsLength, 0, draggedRecord);
        this.parent.ids.splice(childRecordsLength, 0, draggedRecord.ganttProperties.rowUniqueID.toString());
        this.updateTreeGridUniqueID(draggedRecord, 'add');
        var recordId = draggedRecord.level === 0 ? 'R' + draggedRecord.ganttProperties.taskId : 'T' + draggedRecord.ganttProperties.taskId;
        this.parent.getTaskIds().splice(childRecordsLength, 0, recordId);
        if (!droppedRecord.hasChildRecords) {
            this.parent.setRecordValue('hasChildRecords', true, droppedRecord);
            this.parent.setRecordValue('expanded', true, droppedRecord);
            if (!droppedRecord.childRecords.length) {
                droppedRecord.childRecords = [];
                if (!gObj.taskFields.parentID && isNullOrUndefined(droppedRecord.taskData[this.parent.taskFields.child])) {
                    droppedRecord.taskData[this.parent.taskFields.child] = [];
                }
            }
        }
        droppedRecord.childRecords.splice(droppedRecord.childRecords.length, 0, draggedRecord);
        if (!isNullOrUndefined(draggedRecord) && !this.parent.taskFields.parentID
            && !isNullOrUndefined(droppedRecord.taskData[this.parent.taskFields.child])) {
            droppedRecord.taskData[this.parent.taskFields.child].splice(droppedRecord.childRecords.length, 0, draggedRecord.taskData);
        }
        if (!isNullOrUndefined(draggedRecord.parentItem)) {
            //collection to update the parent records
            this.updateParentRecords.push(droppedRecord);
        }
    };
    Edit.prototype.resetEditProperties = function (args) {
        this.parent.currentEditedArgs = {};
        this.resetValidateArgs();
        this.parent.editedTaskBarItem = null;
        this.parent.isOnEdit = false;
        this.validatedChildItems = [];
        this.parent.isConnectorLineUpdate = false;
        this.parent.editedTaskBarItem = null;
        this.taskbarMoved = false;
        this.predecessorUpdated = false;
        if (!isNullOrUndefined(this.dialogModule) && (isNullOrUndefined(args) ||
            (!isNullOrUndefined(args) && args['requestType'] === 'beforeSave' && !args['cancel']))) {
            if (this.dialogModule.dialog && !this.dialogModule.dialogObj.isDestroyed) {
                this.dialogModule.dialogObj.hide();
            }
            this.dialogModule.dialogClose();
        }
        this.parent.hideSpinner();
        this.parent.initiateEditAction(false);
    };
    /**
     * @param {ITaskAddedEventArgs} args .
     * @returns {void} .
     * @private
     */
    Edit.prototype.endEditAction = function (args) {
        this.resetEditProperties();
        if (args.action === 'TaskbarEditing') {
            this.parent.trigger('taskbarEdited', args);
        }
        else if (args.action === 'CellEditing') {
            this.parent.trigger('endEdit', args);
        }
        else if (args.action === 'DialogEditing') {
            if (this.dialogModule.dialog && !this.dialogModule.dialogObj.isDestroyed) {
                this.dialogModule.dialogObj.hide();
            }
            this.dialogModule.dialogClose();
        }
    };
    // eslint-disable-next-line
    Edit.prototype.saveFailed = function (args) {
        this.reUpdatePreviousRecords();
        this.parent.hideSpinner();
        //action failure event trigger
    };
    /**
     * To render delete confirmation dialog
     *
     * @returns {void} .
     */
    Edit.prototype.renderDeleteConfirmDialog = function () {
        var dialogObj = new Dialog({
            width: '320px',
            isModal: true,
            visible: false,
            enableRtl: this.parent.enableRtl,
            content: this.parent.localeObj.getConstant('confirmDelete'),
            buttons: [
                {
                    click: this.confirmDeleteOkButton.bind(this),
                    buttonModel: { content: this.parent.localeObj.getConstant('okText'), isPrimary: true }
                },
                {
                    click: this.closeConfirmDialog.bind(this),
                    buttonModel: { content: this.parent.localeObj.getConstant('cancel') }
                }
            ],
            target: this.parent.element,
            animationSettings: { effect: 'None' }
        });
        dialogObj.appendTo('#' + this.parent.element.id + '_deleteConfirmDialog');
        this.confirmDialog = dialogObj;
    };
    Edit.prototype.closeConfirmDialog = function () {
        this.confirmDialog.hide();
    };
    Edit.prototype.confirmDeleteOkButton = function () {
        this.deleteSelectedItems();
        this.confirmDialog.hide();
        var focussedElement = this.parent.element.querySelector('.e-treegrid');
        focussedElement.focus();
    };
    /**
     * @returns {void} .
     * @private
     */
    Edit.prototype.startDeleteAction = function () {
        if (this.parent.editSettings.allowDeleting && !this.parent.readOnly) {
            if (this.parent.editSettings.showDeleteConfirmDialog) {
                this.confirmDialog.show();
            }
            else {
                this.deleteSelectedItems();
                var focusingElement = this.parent.element.querySelector('.e-treegrid');
                focusingElement.focus();
            }
        }
    };
    /**
     *
     * @param {IGanttData[]} selectedRecords - Defines the deleted records
     * @returns {void} .
     * Method to delete the records from resource view Gantt.
     */
    Edit.prototype.deleteResourceRecords = function (selectedRecords) {
        var deleteRecords = [];
        var _loop_1 = function (i) {
            if (selectedRecords[i].parentItem) {
                if (selectedRecords[i].ganttProperties.sharedTaskUniqueIds.length === 1) {
                    var data = selectedRecords[i];
                    var ids = data.ganttProperties.sharedTaskUniqueIds;
                    for (var j = 0; j < ids.length; j++) {
                        if (this_1.parent.ids.indexOf(ids[j].toString()) !== -1) {
                            deleteRecords.push(this_1.parent.flatData[this_1.parent.ids.indexOf(ids[j].toString())]);
                        }
                    }
                    if (this_1.parent.ids.indexOf(data.ganttProperties.rowUniqueID) !== -1) {
                        deleteRecords.push(this_1.parent.flatData[this_1.parent.ids.indexOf(data.ganttProperties.rowUniqueID)]);
                    }
                }
            }
            else {
                var resourceParent = this_1.parent.flatData.filter(function (data) {
                    return (data.ganttProperties.taskId === selectedRecords[i].ganttProperties.taskId &&
                        data.hasChildRecords);
                })[0];
                deleteRecords.push(resourceParent);
            }
        };
        var this_1 = this;
        for (var i = 0; i < selectedRecords.length; i++) {
            _loop_1(i);
        }
        this.deleteRow(deleteRecords);
    };
    Edit.prototype.deleteSelectedItems = function () {
        if (!this.isFromDeleteMethod) {
            var selectedRecords = [];
            if (this.parent.selectionSettings.mode !== 'Cell') {
                selectedRecords = this.parent.selectionModule.getSelectedRecords();
            }
            else if (this.parent.selectionSettings.mode === 'Cell') {
                selectedRecords = this.parent.selectionModule.getCellSelectedRecords();
            }
            if (this.parent.viewType === 'ResourceView') {
                this.deleteResourceRecords(selectedRecords);
            }
            else {
                this.deleteRow(selectedRecords);
            }
        }
        else {
            if (this.targetedRecords.length) {
                if (this.parent.viewType === 'ResourceView') {
                    this.deleteResourceRecords(this.targetedRecords);
                }
                else {
                    this.deleteRow(this.targetedRecords);
                }
            }
            this.isFromDeleteMethod = false;
        }
    };
    /**
     * Method to delete record.
     *
     * @param {number | string | number[] | string[] | IGanttData | IGanttData[]} taskDetail - Defines the details of data to delete.
     * @returns {void} .
     * @public
     */
    Edit.prototype.deleteRecord = function (taskDetail) {
        this.isFromDeleteMethod = true;
        var variableType = typeof (taskDetail);
        this.targetedRecords = [];
        switch (variableType) {
            case 'number':
            case 'string':
                {
                    var taskId = taskDetail.toString();
                    if (this.parent.viewType === 'ResourceView') {
                        if (!isNullOrUndefined(taskId) && this.parent.getTaskIds().indexOf('T' + taskId) !== -1) {
                            this.targetedRecords.push(this.parent.flatData[this.parent.getTaskIds().indexOf('T' + taskId)]);
                        }
                    }
                    else {
                        if (!isNullOrUndefined(taskId) && this.parent.ids.indexOf(taskId) !== -1) {
                            this.targetedRecords.push(this.parent.getRecordByID(taskId));
                        }
                    }
                    break;
                }
            case 'object':
                if (!Array.isArray(taskDetail)) {
                    this.targetedRecords.push(taskDetail.valueOf());
                }
                else {
                    this.updateTargetedRecords(taskDetail);
                }
                break;
            default:
        }
        this.startDeleteAction();
    };
    /**
     * To update 'targetedRecords collection' from given array collection
     *
     * @param {object[]} taskDetailArray .
     * @returns {void} .
     */
    Edit.prototype.updateTargetedRecords = function (taskDetailArray) {
        if (taskDetailArray.length) {
            var variableType = typeof (taskDetailArray[0]);
            if (variableType === 'object') {
                this.targetedRecords = taskDetailArray;
            }
            else {
                // Get record from array of task ids
                for (var i = 0; i < taskDetailArray.length; i++) {
                    var id = taskDetailArray[i].toString();
                    if (this.parent.viewType === 'ResourceView') {
                        if (!isNullOrUndefined(id) && this.parent.getTaskIds().indexOf('T' + id) !== -1) {
                            this.targetedRecords.push(this.parent.flatData[this.parent.getTaskIds().indexOf('T' + id)]);
                        }
                    }
                    else if (!isNullOrUndefined(id) && this.parent.ids.indexOf(id) !== -1) {
                        this.targetedRecords.push(this.parent.getRecordByID(id));
                    }
                }
            }
        }
    };
    Edit.prototype.deleteRow = function (tasks) {
        var rowItems = tasks && tasks.length ? tasks :
            this.parent.selectionModule.getSelectedRecords();
        this.parent.addDeleteRecord = true;
        if (rowItems.length) {
            this.parent.isOnDelete = true;
            rowItems.forEach(function (item) {
                item.isDelete = true;
            });
            if (this.parent.viewType === 'ResourceView' && !tasks.length) {
                rowItems = [];
            }
            for (var i = 0; i < rowItems.length; i++) {
                var deleteRecord = rowItems[i];
                if (this.deletedTaskDetails.indexOf(deleteRecord) !== -1) {
                    continue;
                }
                var parentTask = this.parent.getParentTask(deleteRecord.parentItem);
                if (deleteRecord.parentItem) {
                    var childRecord = parentTask.childRecords;
                    var filteredRecord = childRecord.length === 1 ?
                        childRecord : childRecord.filter(function (data) {
                        return !data.isDelete;
                    });
                    if (filteredRecord.length > 0) {
                        this.parent.dataOperation.updateParentItems(deleteRecord.parentItem);
                    }
                }
                var predecessor = deleteRecord.ganttProperties.predecessor;
                var canDeletePredecessor = true;
                if (this.parent.viewType === 'ResourceView' && parentTask && parentTask.ganttProperties.taskName !==
                    this.parent.localeObj.getConstant('unassignedTask')) {
                    canDeletePredecessor = false;
                }
                if (predecessor && predecessor.length && canDeletePredecessor) {
                    this.removePredecessorOnDelete(deleteRecord);
                }
                this.deletedTaskDetails.push(deleteRecord);
                if (deleteRecord.hasChildRecords) {
                    this.deleteChildRecords(deleteRecord);
                }
            }
            if (this.parent.selectionModule && this.parent.allowSelection) {
                // clear selection
                this.parent.selectionModule.clearSelection();
            }
            var delereArgs = {};
            delereArgs.deletedRecordCollection = this.deletedTaskDetails;
            delereArgs.updatedRecordCollection = this.parent.editedRecords;
            delereArgs.cancel = false;
            delereArgs.action = 'delete';
            this.initiateDeleteAction(delereArgs);
            this.parent.isOnDelete = false;
        }
        if (!isNullOrUndefined(this.parent.toolbarModule)) {
            this.parent.toolbarModule.refreshToolbarItems();
        }
    };
    Edit.prototype.removePredecessorOnDelete = function (record) {
        var predecessors = record.ganttProperties.predecessor;
        for (var i = 0; i < predecessors.length; i++) {
            var predecessor = predecessors[i];
            var recordId = this.parent.viewType === 'ResourceView' ? record.ganttProperties.taskId :
                record.ganttProperties.rowUniqueID;
            if (predecessor.from.toString() === recordId.toString()) {
                var toRecord = this.parent.connectorLineModule.getRecordByID(predecessor.to.toString());
                if (!isNullOrUndefined(toRecord)) {
                    var toRecordPredcessor = extend([], [], toRecord.ganttProperties.predecessor, true);
                    var index = void 0;
                    for (var t = 0; t < toRecordPredcessor.length; t++) {
                        var toId = this.parent.viewType === 'ResourceView' ? toRecord.ganttProperties.taskId :
                            toRecord.ganttProperties.rowUniqueID;
                        if (toRecordPredcessor[t].to.toString() === toId.toString()
                            && toRecordPredcessor[t].from.toString() === recordId.toString()) {
                            index = t;
                            break;
                        }
                    }
                    toRecordPredcessor.splice(index, 1);
                    this.updatePredecessorValues(toRecord, toRecordPredcessor);
                }
            }
            else if (predecessor.to.toString() === recordId.toString()) {
                var fromRecord = this.parent.connectorLineModule.getRecordByID(predecessor.from.toString());
                if (!isNullOrUndefined(fromRecord)) {
                    var fromRecordPredcessor = extend([], [], fromRecord.ganttProperties.predecessor, true);
                    var index = void 0;
                    for (var t = 0; t < fromRecordPredcessor.length; t++) {
                        var fromId = this.parent.viewType === 'ResourceView' ? fromRecord.ganttProperties.taskId :
                            fromRecord.ganttProperties.rowUniqueID;
                        if (fromRecordPredcessor[t].from.toString() === fromId.toString()
                            && fromRecordPredcessor[t].to.toString() === recordId.toString()) {
                            index = t;
                            break;
                        }
                    }
                    fromRecordPredcessor.splice(index, 1);
                    this.updatePredecessorValues(fromRecord, fromRecordPredcessor);
                }
            }
        }
    };
    Edit.prototype.updatePredecessorValues = function (record, predcessorArray) {
        this.parent.setRecordValue('predecessor', predcessorArray, record.ganttProperties, true);
        var predecessorString = this.parent.predecessorModule.getPredecessorStringValue(record);
        this.parent.setRecordValue('predecessorsName', predecessorString, record.ganttProperties, true);
        this.parent.setRecordValue('taskData.' + this.parent.taskFields.dependency, predecessorString, record);
        this.parent.setRecordValue(this.parent.taskFields.dependency, predecessorString, record);
    };
    /**
     * Method to update TaskID of a gantt record
     *
     * @param {string | number} currentId .
     * @param {number | string} newId .
     * @returns {void} .
     */
    Edit.prototype.updateTaskId = function (currentId, newId) {
        if (!this.parent.readOnly) {
            var cId = typeof currentId === 'number' ? currentId.toString() : currentId;
            var nId = typeof newId === 'number' ? newId.toString() : newId;
            var ids = this.parent.ids;
            if (!isNullOrUndefined(cId) && !isNullOrUndefined(nId)) {
                var cIndex = ids.indexOf(cId);
                var nIndex = ids.indexOf(nId);
                // return false for invalid taskID
                if (cIndex === -1 || nIndex > -1) {
                    return;
                }
                var thisRecord = this.parent.flatData[cIndex];
                thisRecord.ganttProperties.taskId = thisRecord.ganttProperties.rowUniqueID = nId;
                thisRecord.taskData[this.parent.taskFields.id] = nId;
                thisRecord[this.parent.taskFields.id] = nId;
                ids[cIndex] = nId;
                if (thisRecord.hasChildRecords && this.parent.taskFields.parentID) {
                    var childRecords = thisRecord.childRecords;
                    for (var count = 0; count < childRecords.length; count++) {
                        var childRecord = childRecords[count];
                        childRecord[this.parent.taskFields.parentID] = newId;
                        this.parent.chartRowsModule.refreshRecords([childRecord]);
                    }
                }
                if (this.parent.taskFields.dependency && !isNullOrUndefined(thisRecord.ganttProperties.predecessor)) {
                    var predecessors = thisRecord.ganttProperties.predecessor;
                    var currentGanttRecord = void 0;
                    for (var i = 0; i < predecessors.length; i++) {
                        var predecessor = predecessors[i];
                        if (predecessor.to === cId) {
                            currentGanttRecord = this.parent.flatData[ids.indexOf(predecessor.from)];
                        }
                        else if (predecessor.from === cId) {
                            currentGanttRecord = this.parent.flatData[ids.indexOf(predecessor.to)];
                        }
                        this.updatePredecessorOnUpdateId(currentGanttRecord, cId, nId);
                    }
                }
                this.parent.treeGrid.parentData = [];
                this.parent.treeGrid.refresh();
            }
        }
    };
    Edit.prototype.updatePredecessorOnUpdateId = function (currentGanttRecord, cId, nId) {
        if (this.parent.flatData.indexOf(currentGanttRecord) > -1) {
            var pred = currentGanttRecord.ganttProperties.predecessor;
            for (var j = 0; j < pred.length; j++) {
                var pre = pred[j];
                if (pre.to === cId) {
                    pre.to = nId;
                }
                else if (pre.from === cId) {
                    pre.from = nId;
                }
            }
        }
        this.updatePredecessorValues(currentGanttRecord, currentGanttRecord.ganttProperties.predecessor);
    };
    Edit.prototype.deleteChildRecords = function (record) {
        var childRecords = record.childRecords;
        for (var c = 0; c < childRecords.length; c++) {
            var childRecord = childRecords[c];
            if (this.deletedTaskDetails.indexOf(childRecord) !== -1) {
                continue;
            }
            var predecessor = childRecord.ganttProperties.predecessor;
            var canDeletePredecessor = true;
            var parentTask = this.parent.getParentTask(childRecord.parentItem);
            if (this.parent.viewType === 'ResourceView' && parentTask && parentTask.ganttProperties.taskName !==
                this.parent.localeObj.getConstant('unassignedTask')) {
                canDeletePredecessor = false;
            }
            if (predecessor && predecessor.length && canDeletePredecessor) {
                this.removePredecessorOnDelete(childRecord);
            }
            this.deletedTaskDetails.push(childRecord);
            if (childRecord.hasChildRecords) {
                this.deleteChildRecords(childRecord);
            }
        }
    };
    Edit.prototype.removeFromDataSource = function (deleteRecordIDs) {
        var dataSource;
        if (this.parent.dataSource instanceof DataManager) {
            dataSource = this.parent.dataSource.dataSource.json;
        }
        else {
            dataSource = this.parent.dataSource;
        }
        this.removeData(dataSource, deleteRecordIDs);
        this.isBreakLoop = false;
    };
    Edit.prototype.removeData = function (dataCollection, record) {
        for (var i = 0; i < dataCollection.length; i++) {
            if (this.isBreakLoop) {
                break;
            }
            if (record.indexOf(getValue(this.parent.taskFields.id, dataCollection[i]).toString()) !== -1) {
                if (dataCollection[i][this.parent.taskFields.child]) {
                    var childRecords = dataCollection[i][this.parent.taskFields.child];
                    this.removeData(childRecords, record);
                }
                record.splice(record.indexOf(getValue(this.parent.taskFields.id, dataCollection[i]).toString()), 1);
                dataCollection.splice(i, 1);
                if (record.length === 0) {
                    this.isBreakLoop = true;
                    break;
                }
            }
            else if (dataCollection[i][this.parent.taskFields.child]) {
                var childRecords = dataCollection[i][this.parent.taskFields.child];
                this.removeData(childRecords, record);
            }
        }
    };
    Edit.prototype.initiateDeleteAction = function (args) {
        var _this = this;
        this.parent.showSpinner();
        var eventArgs = {};
        eventArgs.requestType = 'beforeDelete';
        eventArgs.data = args.deletedRecordCollection;
        eventArgs.modifiedRecords = args.updatedRecordCollection;
        eventArgs.modifiedTaskData = getTaskData(args.updatedRecordCollection, null, null, this.parent);
        this.parent.trigger('actionBegin', eventArgs, function (eventArg) {
            if (!isNullOrUndefined(_this.parent.loadingIndicator) && _this.parent.loadingIndicator.indicatorType === "Shimmer") {
                _this.parent.showMaskRow();
            }
            else {
                _this.parent.showSpinner();
            }
            if (eventArg.cancel) {
                var deleteRecords = _this.deletedTaskDetails;
                for (var d = 0; d < deleteRecords.length; d++) {
                    deleteRecords[d].isDelete = false;
                }
                _this.deletedTaskDetails = [];
                _this.reUpdatePreviousRecords();
                _this.parent.initiateEditAction(false);
                _this.parent.hideSpinner();
            }
            else {
                if (isRemoteData(_this.parent.dataSource)) {
                    var data_1 = _this.parent.dataSource;
                    if (_this.parent.timezone) {
                        updateDates(eventArg.modifiedTaskData, _this.parent);
                    }
                    var updatedData_1 = {
                        deletedRecords: getTaskData(eventArg.data, null, null, _this.parent),
                        changedRecords: eventArg.modifiedTaskData
                    };
                    var adaptor = data_1.adaptor;
                    var query_1 = _this.parent.query instanceof Query ? _this.parent.query : new Query();
                    if (!(adaptor instanceof WebApiAdaptor && adaptor instanceof ODataAdaptor) || data_1.dataSource.batchUrl) {
                        var crud = data_1.saveChanges(updatedData_1, _this.parent.taskFields.id, null, query_1);
                        crud.then(function () { return _this.deleteSuccess(args); })
                            .catch(function (e) { return _this.dmFailure(e, args); });
                    }
                    else {
                        var deletedRecords = 'deletedRecords';
                        var deleteCrud = null;
                        for (var i = 0; i < updatedData_1[deletedRecords].length; i++) {
                            deleteCrud = data_1.remove(_this.parent.taskFields.id, updatedData_1[deletedRecords][i], null, query_1);
                        }
                        deleteCrud.then(function () {
                            var changedRecords = 'changedRecords';
                            var updateCrud = data_1.update(_this.parent.taskFields.id, updatedData_1[changedRecords], null, query_1);
                            updateCrud.then(function () { return _this.deleteSuccess(args); })
                                .catch(function (e) { return _this.dmFailure(e, args); });
                        }).catch(function (e) { return _this.dmFailure(e, args); });
                    }
                }
                else {
                    _this.deleteSuccess(args);
                }
            }
        });
    };
    Edit.prototype.deleteSuccess = function (args) {
        var _this = this;
        var flatData = this.parent.flatData;
        var currentData = this.parent.currentViewData;
        var deletedRecords = this.parent.getRecordFromFlatdata(args.deletedRecordCollection);
        var deleteRecordIDs = [];
        if (deletedRecords.length > 0) {
            this.parent.selectedRowIndex = deletedRecords[deletedRecords.length - 1].index;
        }
        for (var i = 0; i < deletedRecords.length; i++) {
            var deleteRecord = deletedRecords[i];
            var currentIndex = currentData.indexOf(deleteRecord);
            var flatIndex = flatData.indexOf(deleteRecord);
            var treeGridParentIndex = this.parent.treeGrid.parentData.indexOf(deleteRecord);
            var tempData = getValue('dataOperation.dataArray', this.parent);
            var dataIndex = tempData.indexOf(deleteRecord.taskData);
            var childIndex = void 0;
            if (currentIndex !== -1) {
                currentData.splice(currentIndex, 1);
            }
            if (flatIndex !== -1) {
                flatData.splice(flatIndex, 1);
            }
            if (dataIndex !== -1) {
                tempData.splice(dataIndex, 1);
            }
            if (!isNullOrUndefined(deleteRecord)) {
                deleteRecordIDs.push(deleteRecord.ganttProperties.taskId.toString());
                if (flatIndex !== -1) {
                    this.parent.ids.splice(flatIndex, 1);
                    if (this.parent.viewType === 'ResourceView') {
                        this.parent.getTaskIds().splice(flatIndex, 1);
                        this.isResourceTaskDeleted = true;
                        if (!deleteRecord.hasChildRecords) {
                            deleteRecord.ganttProperties.resourceInfo = null;
                            delete deleteRecord.ganttProperties.resourceNames;
                            deleteRecord[this.parent.taskFields.resourceInfo] = null;
                            deleteRecord.ganttProperties.sharedTaskUniqueIds = [];
                            delete deleteRecord.taskData[this.parent.taskFields.resourceInfo];
                        }
                    }
                }
                if (deleteRecord.level === 0 && treeGridParentIndex !== -1) {
                    this.parent.treeGrid.parentData.splice(treeGridParentIndex, 1);
                }
                if (deleteRecord.parentItem) {
                    var parentItem = this.parent.getParentTask(deleteRecord.parentItem);
                    if (parentItem) {
                        var childRecords = parentItem.childRecords;
                        childIndex = childRecords.indexOf(deleteRecord);
                        if (childIndex !== -1) {
                            childRecords.splice(childIndex, 1);
                        }
                        if (!childRecords.length) {
                            this.parent.setRecordValue('hasChildRecords', false, parentItem);
                        }
                    }
                }
                this.updateTreeGridUniqueID(deleteRecord, 'delete');
            }
        }
        if (deleteRecordIDs.length > 0) {
            this.removeFromDataSource(deleteRecordIDs);
        }
        var eventArgs = {};
        this.parent.updatedConnectorLineCollection = [];
        this.parent.connectorLineIds = [];
        this.parent.predecessorModule.createConnectorLinesCollection(this.parent.flatData);
        this.parent.treeGrid.parentData = [];
        this.parent.treeGrid.refresh();
        if (this.parent.enableImmutableMode) {
            this.refreshRecordInImmutableMode();
        }
        // Trigger actioncomplete event for delete action
        eventArgs.requestType = 'delete';
        eventArgs.data = args.deletedRecordCollection;
        eventArgs.modifiedRecords = args.updatedRecordCollection;
        eventArgs.modifiedTaskData = getTaskData(args.updatedRecordCollection, null, null, this.parent);
        setValue('action', args.action, eventArgs);
        this.parent.isOnDelete = false;
        if (this.parent.viewType === 'ResourceView') {
            var updateUnAssignedResources_1 = eventArgs.data.filter(function (data) {
                return !data.hasChildRecords;
            });
            var _loop_2 = function (i) {
                var unassignedTask = this_2.parent.flatData.filter(function (data) {
                    return data.ganttProperties.taskName === _this.parent.localeObj.getConstant('unassignedTask');
                })[0];
                var isDuplicate = [];
                if (unassignedTask) {
                    isDuplicate = unassignedTask.childRecords.filter(function (data) {
                        return data.ganttProperties.taskId === updateUnAssignedResources_1[i].ganttProperties.taskId;
                    });
                }
                var parentTask = this_2.parent.getParentTask(updateUnAssignedResources_1[i].parentItem);
                if (parentTask && parentTask.ganttProperties.taskName !==
                    this_2.parent.localeObj.getConstant('unassignedTask') && isDuplicate.length === 0) {
                    this_2.checkWithUnassignedTask(updateUnAssignedResources_1[i]);
                }
                else if (!parentTask && (!isDuplicate || isDuplicate.length === 0)) {
                    this_2.checkWithUnassignedTask(updateUnAssignedResources_1[i]);
                }
                unassignedTask = this_2.parent.flatData.filter(function (data) {
                    return data.ganttProperties.taskName === _this.parent.localeObj.getConstant('unassignedTask');
                })[0];
                var parentItem = this_2.parent.currentViewData.filter(function (data) {
                    if (data.ganttProperties.taskId == updateUnAssignedResources_1[i].ganttProperties.taskId && (!data.hasChildRecords && data.parentItem)
                        && unassignedTask.uniqueID === data.parentItem.uniqueID) {
                        return data;
                    }
                    else {
                        return null;
                    }
                });
                if (parentItem[0]) {
                    this_2.parent.dataOperation.updateParentItems(parentItem[0]);
                }
            };
            var this_2 = this;
            for (var i = 0; i < updateUnAssignedResources_1.length; i++) {
                _loop_2(i);
            }
        }
        this.parent.trigger('actionComplete', eventArgs);
        this.deletedTaskDetails = [];
        this.parent.initiateEditAction(false);
        if (!isNullOrUndefined(this.parent.loadingIndicator) && this.parent.loadingIndicator.indicatorType === "Shimmer") {
            this.parent.hideMaskRow();
        }
        else {
            this.parent.hideSpinner();
        }
    };
    /**
     *
     * @returns {number | string} .
     * @private
     */
    Edit.prototype.getNewTaskId = function () {
        var ids = this.parent.viewType === 'ResourceView' ? this.parent.getTaskIds() : this.parent.ids;
        var maxId = ids.length;
        var newTaskId = maxId + 1;
        if (this.parent.viewType === 'ResourceView') {
            if (ids.indexOf('T' + newTaskId) !== -1 || ids.indexOf('R' + newTaskId) !== -1) {
                newTaskId = newTaskId + 1;
                if (ids.indexOf('T' + newTaskId) !== -1 || ids.indexOf('R' + newTaskId) !== -1) {
                    do {
                        newTaskId = newTaskId + 1;
                    } while (ids.indexOf('T' + newTaskId) !== -1 || ids.indexOf('R' + newTaskId) !== -1);
                }
            }
        }
        else {
            if (ids.indexOf(newTaskId.toString()) != -1) {
                newTaskId = newTaskId + 1;
                if (ids.indexOf(newTaskId.toString()) != -1) {
                    do {
                        newTaskId = newTaskId + 1;
                    } while (ids.indexOf(newTaskId.toString()) != -1);
                }
            }
        }
        if (this.parent.columnByField[this.parent.taskFields.id].editType === "stringedit") {
            return newTaskId = newTaskId.toString();
        }
        else {
            return newTaskId;
        }
    };
    /**
     * @param {object} obj .
     * @param {RowPosition} rowPosition .
     * @returns {void} .
     * @private
     */
    // eslint-disable-next-line
    Edit.prototype.prepareNewlyAddedData = function (obj, rowPosition) {
        var taskModel = this.parent.taskFields;
        var id;
        var newTaskIDmd;
        var ids = this.parent.ids;
        /*Validate Task Id of data*/
        if (obj[taskModel.id]) {
            if (ids.indexOf(obj[taskModel.id].toString()) !== -1) {
                obj[taskModel.id] = null;
            }
            else {
                if (typeof (obj[taskModel.id]) === "string") {
                    newTaskIDmd = obj[taskModel.id];
                }
                else {
                    newTaskIDmd = parseInt(obj[taskModel.id], 10);
                }
                obj[taskModel.id] = isNullOrUndefined(newTaskIDmd) ? null : newTaskIDmd;
            }
        }
        if (!obj[taskModel.id]) {
            id = this.getNewTaskId();
            obj[taskModel.id] = id;
        }
        if (!this.parent.allowUnscheduledTasks && !obj[taskModel.startDate]) {
            obj[taskModel.startDate] = this.parent.projectStartDate;
        }
        if (!this.parent.allowUnscheduledTasks && taskModel.duration && isNullOrUndefined(obj[taskModel.duration])) {
            if (!obj[taskModel.endDate]) {
                obj[taskModel.duration] = '5';
            }
        }
        if (taskModel.progress) {
            obj[taskModel.progress] = obj[taskModel.progress] ? (obj[taskModel.progress] > 100 ? 100 : obj[taskModel.progress]) : 0;
        }
        if (!this.parent.allowUnscheduledTasks && !obj[taskModel.endDate] && taskModel.endDate) {
            if (!obj[taskModel.duration]) {
                var startDate = this.parent.dataOperation.getDateFromFormat(this.parent.projectStartDate);
                startDate.setDate(startDate.getDate() + 4);
                obj[taskModel.endDate] = this.parent.getFormatedDate(startDate, this.parent.getDateFormat());
            }
        }
    };
    /**
     * @param {object} obj .
     * @param {number} level .
     * @param {RowPosition} rowPosition .
     * @param {IGanttData} parentItem .
     * @returns {IGanttData} .
     * @private
     */
    Edit.prototype.updateNewlyAddedDataBeforeAjax = function (obj, level, rowPosition, parentItem) {
        var cAddedRecord = this.parent.dataOperation.createRecord(obj, level);
        cAddedRecord.index = parseInt(cAddedRecord.ganttProperties.rowUniqueID.toString(), 10) - 1;
        if (!isNullOrUndefined(parentItem)) {
            this.parent.setRecordValue('parentItem', this.parent.dataOperation.getCloneParent(parentItem), cAddedRecord);
            var pIndex = cAddedRecord.parentItem ? cAddedRecord.parentItem.index : null;
            this.parent.setRecordValue('parentIndex', pIndex, cAddedRecord);
            var parentUniqId = cAddedRecord.parentItem ? cAddedRecord.parentItem.uniqueID : null;
            this.parent.setRecordValue('parentUniqueID', parentUniqId, cAddedRecord);
            if (!isNullOrUndefined(this.parent.taskFields.id) &&
                !isNullOrUndefined(this.parent.taskFields.parentID) && cAddedRecord.parentItem) {
                if (this.parent.viewType === 'ProjectView') {
                    this.parent.setRecordValue(this.parent.taskFields.parentID, cAddedRecord.parentItem.taskId, cAddedRecord.taskData, true);
                }
                this.parent.setRecordValue('parentId', cAddedRecord.parentItem.taskId, cAddedRecord.ganttProperties, true);
                this.parent.setRecordValue(this.parent.taskFields.parentID, cAddedRecord.parentItem.taskId, cAddedRecord, true);
            }
        }
        this.parent.isOnEdit = true;
        this.backUpAndPushNewlyAddedRecord(cAddedRecord, rowPosition, parentItem);
        // need to push in dataSource also.
        if (this.parent.taskFields.dependency && cAddedRecord.ganttProperties.predecessorsName) {
            this.parent.predecessorModule.ensurePredecessorCollectionHelper(cAddedRecord, cAddedRecord.ganttProperties);
            this.parent.predecessorModule.updatePredecessorHelper(cAddedRecord);
            this.parent.predecessorModule.validatePredecessorDates(cAddedRecord);
        }
        if (cAddedRecord.parentItem && this.parent.getParentTask(cAddedRecord.parentItem).ganttProperties.isAutoSchedule) {
            this.parent.dataOperation.updateParentItems(cAddedRecord.parentItem);
        }
        this.parent.isOnEdit = false;
        return cAddedRecord;
    };
    /**
     * @param {IGanttData} record .
     * @param {number} count .
     * @returns {number} .
     * @private
     */
    Edit.prototype.getChildCount = function (record, count) {
        var currentRecord;
        if (!record.hasChildRecords) {
            return 0;
        }
        for (var i = 0; i < record.childRecords.length; i++) {
            currentRecord = record.childRecords[i];
            count++;
            if (currentRecord.hasChildRecords) {
                count = this.getChildCount(currentRecord, count);
            }
        }
        return count;
    };
    /**
     * @param {IGanttData} data .
     * @param {number} count .
     * @param {IGanttData[]} collection .
     * @returns {number} .
     * @private
     */
    Edit.prototype.getVisibleChildRecordCount = function (data, count, collection) {
        var childRecords;
        var length;
        if (data.hasChildRecords) {
            childRecords = data.childRecords;
            length = childRecords.length;
            for (var i = 0; i < length; i++) {
                if (collection.indexOf(childRecords[i]) !== -1) {
                    count++;
                }
                if (childRecords[i].hasChildRecords) {
                    count = this.getVisibleChildRecordCount(childRecords[i], count, collection);
                }
            }
        }
        else {
            if (collection.indexOf(data) !== -1) {
                count++;
            }
        }
        return count;
    };
    /**
     * @param {IGanttData} parentRecord .
     * @returns {void} .
     * @private
     */
    Edit.prototype.updatePredecessorOnIndentOutdent = function (parentRecord) {
        var len = parentRecord.ganttProperties.predecessor.length;
        var parentRecordTaskData = parentRecord.ganttProperties;
        var predecessorCollection = parentRecordTaskData.predecessor;
        var childRecord;
        var predecessorIndex;
        var updatedPredecessor = [];
        for (var count = 0; count < len; count++) {
            if (predecessorCollection[count].to === parentRecordTaskData.rowUniqueID.toString()) {
                childRecord = this.parent.getRecordByID(predecessorCollection[count].from);
                predecessorIndex = getIndex(predecessorCollection[count], 'from', childRecord.ganttProperties.predecessor, 'to');
                // eslint-disable-next-line
                var predecessorCollections = (extend([], childRecord.ganttProperties.predecessor, [], true));
                predecessorCollections.splice(predecessorIndex, 1);
                this.parent.setRecordValue('predecessor', predecessorCollections, childRecord.ganttProperties, true);
            }
            else if (predecessorCollection[count].from === parentRecordTaskData.rowUniqueID.toString()) {
                childRecord = this.parent.getRecordByID(predecessorCollection[count].to);
                var prdcList = (childRecord.ganttProperties.predecessorsName.toString()).split(',');
                var str = predecessorCollection[count].from + predecessorCollection[count].type;
                var ind = prdcList.indexOf(str);
                prdcList.splice(ind, 1);
                this.parent.setRecordValue('predecessorsName', prdcList.join(','), childRecord.ganttProperties, true);
                this.parent.setRecordValue(this.parent.taskFields.dependency, prdcList.join(','), childRecord);
                predecessorIndex = getIndex(predecessorCollection[count], 'from', childRecord.ganttProperties.predecessor, 'to');
                // eslint-disable-next-line
                var temppredecessorCollection = (extend([], childRecord.ganttProperties.predecessor, [], true));
                temppredecessorCollection.splice(predecessorIndex, 1);
                this.parent.setRecordValue('predecessor', temppredecessorCollection, childRecord.ganttProperties, true);
                this.parent.predecessorModule.validatePredecessorDates(childRecord);
            }
        }
        this.parent.setRecordValue('predecessor', updatedPredecessor, parentRecord.ganttProperties, true);
        this.parent.setRecordValue('predecessorsName', '', parentRecord.ganttProperties, true);
    };
    /**
     * @param {IPredecessor[]} predecessorCollection .
     * @param {IGanttData} record .
     * @returns {string} .
     * @private
     */
    Edit.prototype.predecessorToString = function (predecessorCollection, record) {
        var predecessorString = [];
        var count = 0;
        var length = predecessorCollection.length;
        for (count; count < length; count++) {
            if (record.ganttProperties.rowUniqueID.toString() !== predecessorCollection[count].from) {
                var tem = predecessorCollection[count].from + predecessorCollection[count].type;
                predecessorCollection[count].offset =
                    isNaN(predecessorCollection[count].offset) ? 0 : predecessorCollection[count].offset;
                if (predecessorCollection[count].offset !== 0) {
                    if (predecessorCollection[count].offset < 0) {
                        tem += predecessorCollection[count].offset.toString() + 'd';
                    }
                    else if (predecessorCollection[count].offset > 0) {
                        tem += '+' + predecessorCollection[count].offset.toString() + 'd';
                    }
                }
                predecessorString.push(tem);
            }
        }
        return predecessorString.join(',');
    };
    /**
     * @param {IGanttData} record .
     * @param {RowPosition} rowPosition .
     * @param {IGanttData} parentItem .
     * @returns {void} .
     * @private
     */
    Edit.prototype.backUpAndPushNewlyAddedRecord = function (record, rowPosition, parentItem) {
        var flatRecords = this.parent.flatData;
        var currentViewData = this.parent.currentViewData;
        var ids = this.parent.ids;
        var currentItemIndex;
        var recordIndex;
        var updatedCollectionIndex;
        var childIndex;
        switch (rowPosition) {
            case 'Top':
                flatRecords.splice(0, 0, record);
                currentViewData.splice(0, 0, record);
                ids.splice(0, 0, record.ganttProperties.rowUniqueID.toString()); // need to check NAN
                break;
            case 'Bottom':
                flatRecords.push(record);
                currentViewData.push(record);
                ids.push(record.ganttProperties.rowUniqueID.toString()); // need to check NAN
                if (this.parent.viewType === 'ResourceView') {
                    var taskId = record.level === 0 ? 'R' + record.ganttProperties.taskId : 'T' + record.ganttProperties.taskId;
                    this.parent.getTaskIds().push(taskId);
                }
                break;
            case 'Above':
                /*Record Updates*/
                recordIndex = flatRecords.indexOf(this.addRowSelectedItem);
                updatedCollectionIndex = currentViewData.indexOf(this.addRowSelectedItem);
                this.recordCollectionUpdate(childIndex, recordIndex, updatedCollectionIndex, record, parentItem, rowPosition);
                break;
            case 'Below':
                currentItemIndex = flatRecords.indexOf(this.addRowSelectedItem);
                if (this.addRowSelectedItem.hasChildRecords) {
                    var dataChildCount = this.getChildCount(this.addRowSelectedItem, 0);
                    recordIndex = currentItemIndex + dataChildCount + 1;
                    updatedCollectionIndex = currentViewData.indexOf(this.addRowSelectedItem) +
                        this.getVisibleChildRecordCount(this.addRowSelectedItem, 0, currentViewData) + 1;
                }
                else {
                    recordIndex = currentItemIndex + 1;
                    updatedCollectionIndex = currentViewData.indexOf(this.addRowSelectedItem) + 1;
                }
                this.recordCollectionUpdate(childIndex + 1, recordIndex, updatedCollectionIndex, record, parentItem, rowPosition);
                break;
            case 'Child':
                currentItemIndex = flatRecords.indexOf(this.addRowSelectedItem);
                if (this.addRowSelectedItem.hasChildRecords) {
                    var dataChildCount = this.getChildCount(this.addRowSelectedItem, 0);
                    recordIndex = currentItemIndex + dataChildCount + 1;
                    //Expand Add record's parent item for project view
                    if (!this.addRowSelectedItem.expanded && !this.parent.enableMultiTaskbar) {
                        this.parent.expandByID(this.addRowSelectedItem.ganttProperties.rowUniqueID);
                    }
                    updatedCollectionIndex = currentViewData.indexOf(this.addRowSelectedItem) +
                        this.getVisibleChildRecordCount(this.addRowSelectedItem, 0, currentViewData) + 1;
                }
                else {
                    this.parent.setRecordValue('hasChildRecords', true, this.addRowSelectedItem);
                    this.parent.setRecordValue('isMilestone', false, this.addRowSelectedItem.ganttProperties, true);
                    this.parent.setRecordValue('expanded', true, this.addRowSelectedItem);
                    this.parent.setRecordValue('childRecords', [], this.addRowSelectedItem);
                    recordIndex = currentItemIndex + 1;
                    updatedCollectionIndex = currentViewData.indexOf(this.addRowSelectedItem) + 1;
                    if (this.addRowSelectedItem.ganttProperties.predecessor) {
                        this.updatePredecessorOnIndentOutdent(this.addRowSelectedItem);
                    }
                    if (!isNullOrUndefined(this.addRowSelectedItem.ganttProperties.segments)) {
                        this.addRowSelectedItem.ganttProperties.segments = null;
                    }
                }
                this.recordCollectionUpdate(childIndex + 1, recordIndex, updatedCollectionIndex, record, parentItem, rowPosition);
                break;
        }
        this.newlyAddedRecordBackup = record;
    };
    /**
     * @param {number} childIndex .
     * @param {number} recordIndex .
     * @param {number} updatedCollectionIndex .
     * @param {IGanttData} record .
     * @param {IGanttData} parentItem .
     * @returns {void} .
     * @private
     */
    Edit.prototype.recordCollectionUpdate = function (childIndex, recordIndex, updatedCollectionIndex, record, parentItem, rowPosition) {
        var flatRecords = this.parent.flatData;
        var currentViewData = this.parent.currentViewData;
        var ids = this.parent.ids;
        /* Record collection update */
        flatRecords.splice(recordIndex, 0, record);
        currentViewData.splice(updatedCollectionIndex, 0, record);
        if (this.parent.viewType === 'ResourceView' && typeof (record.ganttProperties.taskId) === "number") {
            var taskString = record.ganttProperties.taskId;
            ids.push(taskString.toString());
        }
        ids.splice(recordIndex, 0, record.ganttProperties.rowUniqueID.toString());
        if (this.parent.viewType === 'ResourceView') {
            var taskId = record.level === 0 ? 'R' + record.ganttProperties.taskId : 'T' + record.ganttProperties.taskId;
            this.parent.getTaskIds().splice(recordIndex, 0, taskId);
        }
        /* data Source update */
        if (!isNullOrUndefined(parentItem)) {
            if (rowPosition == 'Above') {
                childIndex = parentItem.childRecords.indexOf(this.addRowSelectedItem);
            }
            else if (rowPosition == 'Below') {
                childIndex = parentItem.childRecords.indexOf(this.addRowSelectedItem) + 1;
            }
            else {
                childIndex = parentItem.childRecords.length;
            }
            /*Child collection update*/
            parentItem.childRecords.splice(childIndex, 0, record);
            if (!this.parent.taskFields.child) {
                this.parent.taskFields.child = 'Children';
            }
            if ((this.parent.dataSource instanceof DataManager &&
                isNullOrUndefined(parentItem.taskData[this.parent.taskFields.parentID])) ||
                !isNullOrUndefined(this.parent.dataSource)) {
                var child = this.parent.taskFields.child;
                if (parentItem.taskData[child] && parentItem.taskData[child].length > 0) {
                    if (rowPosition === 'Above' || rowPosition === 'Below') {
                        parentItem.taskData[child].splice(childIndex, 0, record.taskData);
                    }
                    else {
                        parentItem.taskData[child].push(record.taskData);
                    }
                }
                else {
                    parentItem.taskData[child] = [];
                    parentItem.taskData[child].push(record.taskData);
                }
                this.isNewRecordAdded = true;
            }
        }
    };
    /**
     * @param {IGanttData} cAddedRecord .
     * @param {IGanttData} modifiedRecords .
     * @param {string} event .
     * @returns {ITaskAddedEventArgs} .
     * @private
     */
    Edit.prototype.constructTaskAddedEventArgs = function (cAddedRecord, modifiedRecords, event) {
        var eventArgs = {};
        eventArgs.action = eventArgs.requestType = event;
        if (cAddedRecord.length > 1) {
            eventArgs.data = [];
            eventArgs.newTaskData = [];
            eventArgs.recordIndex = [];
            for (var i = 0; i < cAddedRecord.length; i++) {
                eventArgs.data[i] = cAddedRecord[i];
                (eventArgs.newTaskData[i]) = (getTaskData([cAddedRecord[i]], eventArgs.data[i], eventArgs, this.parent));
                eventArgs.recordIndex[i] = cAddedRecord[i].index;
            }
        }
        else if (cAddedRecord.length === 1) {
            for (var i = 0; i < cAddedRecord.length; i++) {
                (eventArgs.data) = (cAddedRecord[i]);
                (eventArgs.newTaskData) = (getTaskData([cAddedRecord[i]], eventArgs.data, eventArgs, this.parent));
                eventArgs.recordIndex = cAddedRecord[i].index;
            }
        }
        eventArgs.modifiedRecords = modifiedRecords;
        eventArgs.modifiedTaskData = getTaskData(modifiedRecords, null, null, this.parent);
        return eventArgs;
    };
    /**
     * @param {ITaskAddedEventArgs} args .
     * @returns {void} .
     * @private
     */
    // eslint-disable-next-line
    Edit.prototype.addSuccess = function (args) {
        // let addedRecords: IGanttData = args.addedRecord;
        // let eventArgs: IActionBeginEventArgs = {};
        // this.parent.updatedConnectorLineCollection = [];
        // this.parent.connectorLineIds = [];
        // this.parent.predecessorModule.createConnectorLinesCollection(this.parent.flatData);
        this.parent.treeGrid.parentData = [];
        this.parent.addDeleteRecord = true;
        this.parent.selectedRowIndex = 0;
        this.parent.treeGrid['isAddedFromGantt'] = true;
        this.parent.treeGrid.refresh();
        if (this.parent.enableImmutableMode) {
            this.parent.modifiedRecords = args.modifiedRecords;
            this.parent.modifiedRecords.push(args.data);
            this.refreshRecordInImmutableMode();
        }
    };
    Edit.prototype.refreshRecordInImmutableMode = function (data, dragged) {
        if (!dragged && !isNullOrUndefined(data)) {
            for (var i = data[0].index + 1; i < this.parent.currentViewData.length; i++) {
                if (data[0].level < this.parent.currentViewData[i].level) {
                    this.parent.modifiedRecords.push(this.parent.currentViewData[i]);
                }
                else {
                    break;
                }
            }
        }
        var _loop_3 = function (i) {
            var originalData = this_3.parent.modifiedRecords[i];
            var treeIndex = this_3.parent.allowRowDragAndDrop ? 1 : 0;
            var uniqueTaskID = this_3.parent.taskFields.id;
            var originalIndex = this_3.parent.currentViewData.findIndex(function (data) {
                return (data[uniqueTaskID] === originalData[uniqueTaskID]);
            });
            if (this_3.parent.treeGrid.getRows()[originalIndex]) {
                this_3.parent.treeGrid.renderModule.cellRender({
                    data: originalData, cell: this_3.parent.treeGrid.getRows()[originalIndex].cells[this_3.parent.treeColumnIndex + treeIndex],
                    column: this_3.parent.treeGrid.grid.getColumns()[this_3.parent.treeColumnIndex],
                    requestType: 'rowDragAndDrop'
                });
                this_3.parent.treeGrid.renderModule.RowModifier({
                    data: originalData, row: this_3.parent.treeGrid.getRows()[originalIndex], rowHeight: this_3.parent.rowHeight
                });
            }
        };
        var this_3 = this;
        for (var i = 0; i < this.parent.modifiedRecords.length; i++) {
            _loop_3(i);
        }
    };
    /**
     * @param {IGanttData} addedRecord .
     * @param {RowPosition} rowPosition .
     * @returns {void} .
     * @private
     */
    Edit.prototype.updateRealDataSource = function (addedRecord, rowPosition) {
        var taskFields = this.parent.taskFields;
        var dataSource = isCountRequired(this.parent) ? getValue('result', this.parent.dataSource) :
            this.parent.dataSource;
        if (this.parent.dataSource instanceof DataManager) {
            dataSource = this.parent.dataSource.dataSource.json;
        }
        for (var i = 0; i < addedRecord.length; i++) {
            if (isNullOrUndefined(rowPosition) || isNullOrUndefined(this.addRowSelectedItem)) {
                rowPosition = rowPosition === 'Bottom' ? 'Bottom' : 'Top';
            }
            if (rowPosition === 'Top') {
                dataSource.splice(0, 0, addedRecord[i].taskData);
            }
            else if (rowPosition === 'Bottom') {
                dataSource.push(addedRecord[i].taskData);
            }
            else {
                if (!isNullOrUndefined(taskFields.id) && !isNullOrUndefined(taskFields.parentID)) {
                    dataSource.push(addedRecord[i].taskData);
                }
                else {
                    if (!this.isNewRecordAdded) {
                        this.addDataInRealDataSource(dataSource, addedRecord[i].taskData, rowPosition);
                    }
                    this.isNewRecordAdded = false;
                }
            }
            this.isBreakLoop = false;
        }
    };
    /**
     * @param {object[]} dataCollection .
     * @param {IGanttData} record .
     * @param {RowPosition} rowPosition .
     * @returns {void} .
     * @private
     */
    Edit.prototype.addDataInRealDataSource = function (dataCollection, record, rowPosition) {
        for (var i = 0; i < dataCollection.length; i++) {
            var child = this.parent.taskFields.child;
            if (this.isBreakLoop) {
                break;
            }
            if (getValue(this.parent.taskFields.id, dataCollection[i]).toString() ===
                this.addRowSelectedItem.ganttProperties.rowUniqueID.toString()) {
                if (rowPosition === 'Above') {
                    dataCollection.splice(i, 0, record);
                }
                else if (rowPosition === 'Below') {
                    dataCollection.splice(i + 1, 0, record);
                }
                else if (rowPosition === 'Child') {
                    if (dataCollection[i][child] && dataCollection[i][child].length > 0) {
                        dataCollection[i][child].push(record);
                    }
                    else {
                        dataCollection[i][child] = [];
                        dataCollection[i][child].push(record);
                    }
                }
                this.isBreakLoop = true;
                break;
            }
            else if (dataCollection[i][child]) {
                var childRecords = dataCollection[i][child];
                this.addDataInRealDataSource(childRecords, record, rowPosition);
            }
        }
    };
    /**
     * Method to add new record.
     *
     * @param {Object[] | Object} data - Defines the new data to add.
     * @param {RowPosition} rowPosition - Defines the position of row.
     * @param {number} rowIndex - Defines the row index.
     * @returns {void} .
     * @private
     */
    Edit.prototype.addRecord = function (data, rowPosition, rowIndex) {
        var _this = this;
        var tempTaskID = this.parent.taskFields.id;
        if (this.parent.editModule && this.parent.editSettings.allowAdding) {
            this.parent.isDynamicData = true;
            var cAddedRecord_1 = [];
            if (isNullOrUndefined(data)) {
                this.validateTaskPosition(data, rowPosition, rowIndex, cAddedRecord_1);
            }
            else if (data instanceof Array) {
                for (var i = 0; i < data.length; i++) {
                    this.validateTaskPosition(data[i], rowPosition, rowIndex, cAddedRecord_1);
                }
            }
            else if (typeof (data) == 'object') {
                this.validateTaskPosition(data, rowPosition, rowIndex, cAddedRecord_1);
            }
            else {
                return;
            }
            var args = {};
            args = this.constructTaskAddedEventArgs(cAddedRecord_1, this.parent.editedRecords, 'beforeAdd');
            this.parent.trigger('actionBegin', args, function (args) {
                if (!isNullOrUndefined(_this.parent.loadingIndicator) && _this.parent.loadingIndicator.indicatorType === "Shimmer") {
                    _this.parent.showMaskRow();
                }
                else {
                    _this.parent.showSpinner();
                }
                var tasks = _this.parent.taskFields;
                var ganttData = _this.parent.viewType === 'ResourceView' ?
                    _this.parent.flatData[_this.parent.getTaskIds().indexOf('T' + args.data[tasks.id])] : _this.parent.getRecordByID(args.data[tasks.id]);
                if (!isNullOrUndefined(ganttData)) {
                    _this.validateUpdateValues(args.newTaskData, ganttData, true);
                }
                if (!isNullOrUndefined(args.data["" + tempTaskID])) {
                    if (args.data[tempTaskID] != args.data['ganttProperties']['taskId']) {
                        args.data['ganttProperties']['taskId'] = args.data[tempTaskID];
                        args.newTaskData[tempTaskID] = args.data[tempTaskID];
                    }
                }
                if (!args.cancel) {
                    if (isRemoteData(_this.parent.dataSource)) {
                        var data_2 = _this.parent.dataSource;
                        var updatedData_2 = {
                            addedRecords: [args.newTaskData],
                            changedRecords: args.modifiedTaskData
                        };
                        var prevID_1 = args.data.ganttProperties.taskId.toString();
                        /* tslint:disable-next-line */
                        var query = _this.parent.query instanceof Query ? _this.parent.query : new Query();
                        var adaptor = data_2.adaptor;
                        if (!(adaptor instanceof WebApiAdaptor && adaptor instanceof ODataAdaptor && adaptor instanceof ODataV4Adaptor) || data_2.dataSource.batchUrl) {
                            /* tslint:disable-next-line */
                            var crud = data_2.saveChanges(updatedData_2, _this.parent.taskFields.id, null, query);
                            crud.then(function (e) {
                                if (_this.parent.taskFields.id && !isNullOrUndefined(e.addedRecords[0][_this.parent.taskFields.id]) &&
                                    e.addedRecords[0][_this.parent.taskFields.id].toString() == prevID_1) {
                                    _this.parent.setRecordValue('taskId', e.addedRecords[0][_this.parent.taskFields.id], args.data.ganttProperties, true);
                                    _this.parent.setRecordValue('taskData', e.addedRecords[0], args.data);
                                    _this.parent.setRecordValue(_this.parent.taskFields.id, e.addedRecords[0][_this.parent.taskFields.id], args.data);
                                    _this.parent.setRecordValue('rowUniqueID', e.addedRecords[0][_this.parent.taskFields.id].toString(), args.data.ganttProperties, true);
                                    var idsIndex = _this.parent.ids.indexOf(prevID_1);
                                    if (idsIndex !== -1) {
                                        _this.parent.ids[idsIndex] = e.addedRecords[0][_this.parent.taskFields.id].toString();
                                    }
                                }
                                _this.updateNewRecord(cAddedRecord_1, args);
                            }).catch(function (e) {
                                _this.removeAddedRecord();
                                _this.dmFailure(e, args);
                                _this._resetProperties();
                            });
                        }
                        else {
                            var addedRecords = 'addedRecords';
                            var insertCrud = data_2.insert(updatedData_2[addedRecords], null, query);
                            insertCrud.then(function (e) {
                                var addedRecords;
                                if (!isNullOrUndefined(e[0])) {
                                    addedRecords = e[0];
                                }
                                else {
                                    addedRecords = updatedData_2['addedRecords'][0];
                                }
                                _this.updateNewRecord(cAddedRecord_1, args);
                            }).catch(function (e) {
                                _this.removeAddedRecord();
                                _this.dmFailure(e, args);
                                _this._resetProperties();
                            });
                        }
                    }
                    else {
                        if (_this.parent.viewType === 'ProjectView') {
                            if ((rowPosition === 'Top' || rowPosition === 'Bottom') ||
                                ((rowPosition === 'Above' || rowPosition === 'Below' || rowPosition === 'Child') || isNullOrUndefined(rowPosition) && !args.data.parentItem)) {
                                if (args.data instanceof Array) {
                                    _this.updateRealDataSource(args.data, rowPosition);
                                }
                                else {
                                    var data_3 = [];
                                    data_3.push(args.data);
                                    _this.updateRealDataSource(data_3, rowPosition);
                                    _this.parent.currentSelection = cAddedRecord_1[0].ganttProperties;
                                }
                            }
                        }
                        else {
                            var dataSource = isCountRequired(_this.parent) ? getValue('result', _this.parent.dataSource) :
                                _this.parent.dataSource; // eslint-disable-line
                            dataSource.push(args.data.taskData);
                        }
                        if (cAddedRecord_1.level === 0) {
                            _this.parent.treeGrid.parentData.splice(0, 0, cAddedRecord_1);
                        }
                        _this.updateTreeGridUniqueID(cAddedRecord_1, 'add');
                        _this.refreshNewlyAddedRecord(args, cAddedRecord_1);
                        _this._resetProperties();
                    }
                }
                else {
                    args = args;
                    _this.removeAddedRecord();
                    _this.reUpdatePreviousRecords();
                    _this._resetProperties();
                }
            });
        }
    };
    /**
     * Method to validateTaskPosition.
     *
     * @param {Object | object[] } data - Defines the new data to add.
     * @param {RowPosition} rowPosition - Defines the position of row.
     * @param {number} rowIndex - Defines the row index.
     * @param {IGanttData} cAddedRecord - Defines the single data to validate.
     * @returns {void} .
     * @private
     */
    Edit.prototype.createNewRecord = function () {
        var tempRecord = {};
        var ganttColumns = this.parent.ganttColumns;
        var taskSettingsFields = this.parent.taskFields;
        var taskId = this.parent.editModule.getNewTaskId();
        for (var i = 0; i < ganttColumns.length; i++) {
            var fieldName = ganttColumns[i].field;
            if (fieldName === taskSettingsFields.id) {
                tempRecord[fieldName] = taskId;
            }
            else if (ganttColumns[i].field === taskSettingsFields.startDate) {
                if (isNullOrUndefined(tempRecord[taskSettingsFields.endDate])) {
                    tempRecord[fieldName] = this.parent.editModule.dialogModule.getMinimumStartDate();
                }
                else {
                    tempRecord[fieldName] = new Date(tempRecord[taskSettingsFields.endDate]);
                }
                if (this.parent.timezone) {
                    tempRecord[fieldName] = this.parent.dateValidationModule.remove(tempRecord[fieldName], this.parent.timezone);
                }
            }
            else if (ganttColumns[i].field === taskSettingsFields.endDate) {
                if (isNullOrUndefined(tempRecord[taskSettingsFields.startDate])) {
                    tempRecord[fieldName] = this.parent.editModule.dialogModule.getMinimumStartDate();
                }
                else {
                    tempRecord[fieldName] = new Date(tempRecord[taskSettingsFields.startDate]);
                }
                if (this.parent.timezone) {
                    tempRecord[fieldName] = this.parent.dateValidationModule.remove(tempRecord[fieldName], this.parent.timezone);
                }
            }
            else if (ganttColumns[i].field === taskSettingsFields.duration) {
                tempRecord[fieldName] = 1;
            }
            else if (ganttColumns[i].field === taskSettingsFields.name) {
                tempRecord[fieldName] = this.parent.editModule.dialogModule['localeObj'].getConstant('addDialogTitle') + ' ' + taskId;
            }
            else if (ganttColumns[i].field === taskSettingsFields.progress) {
                tempRecord[fieldName] = 0;
            }
            else if (ganttColumns[i].field === taskSettingsFields.work) {
                tempRecord[fieldName] = 0;
            }
            else if (ganttColumns[i].field === 'taskType') {
                tempRecord[fieldName] = this.parent.taskType;
            }
            else if (ganttColumns[i].field === taskSettingsFields.milestone) {
                tempRecord[fieldName] = null;
            }
            else {
                tempRecord[this.parent.ganttColumns[i].field] = '';
            }
        }
        return tempRecord;
    };
    Edit.prototype.validateTaskPosition = function (data, rowPosition, rowIndex, cAddedRecord) {
        var selectedRowIndex = isNullOrUndefined(rowIndex) || isNaN(parseInt(rowIndex.toString(), 10)) ?
            this.parent.selectionModule ?
                (this.parent.selectionSettings.mode === 'Row' || this.parent.selectionSettings.mode === 'Both') &&
                    this.parent.selectionModule.selectedRowIndexes.length === 1 ?
                    this.parent.selectionModule.selectedRowIndexes[0] :
                    this.parent.selectionSettings.mode === 'Cell' &&
                        this.parent.selectionModule.getSelectedRowCellIndexes().length === 1 ?
                        this.parent.selectionModule.getSelectedRowCellIndexes()[0].rowIndex : null : null : rowIndex;
        this.addRowSelectedItem = isNullOrUndefined(selectedRowIndex) ? null : this.parent.updatedRecords[selectedRowIndex];
        rowPosition = isNullOrUndefined(rowPosition) ? this.parent.editSettings.newRowPosition : rowPosition;
        data = isNullOrUndefined(data) ? this.createNewRecord() : data;
        if (((isNullOrUndefined(selectedRowIndex) || selectedRowIndex < 0 ||
            isNullOrUndefined(this.addRowSelectedItem)) && (rowPosition === 'Above'
            || rowPosition === 'Below'
            || rowPosition === 'Child')) || !rowPosition || (rowPosition !== 'Above'
            && rowPosition !== 'Below'
            && rowPosition !== 'Child' && rowPosition !== 'Top' &&
            rowPosition !== 'Bottom')) {
            rowPosition = 'Top';
        }
        var level = 0;
        var parentItem;
        switch (rowPosition) {
            case 'Top':
            case 'Bottom':
                if (this.parent.viewType === 'ResourceView') {
                    level = 1;
                }
                else {
                    level = 0;
                }
                break;
            case 'Above':
            case 'Below':
                level = this.addRowSelectedItem.level;
                parentItem = this.parent.getParentTask(this.addRowSelectedItem.parentItem);
                break;
            case 'Child':
                level = this.addRowSelectedItem.level + 1;
                parentItem = this.addRowSelectedItem;
                break;
        }
        this.prepareNewlyAddedData(data, rowPosition);
        var AddRecord = (this.updateNewlyAddedDataBeforeAjax(data, level, rowPosition, parentItem));
        cAddedRecord.push(AddRecord);
    };
    Edit.prototype.updateNewRecord = function (cAddedRecord, args) {
        if (cAddedRecord.level === 0) {
            this.parent.treeGrid.parentData.splice(0, 0, cAddedRecord);
            var tempData = getValue('dataOperation.dataArray', this.parent);
            tempData.splice(0, 0, cAddedRecord.taskData);
        }
        this.updateTreeGridUniqueID(cAddedRecord, 'add');
        this.refreshNewlyAddedRecord(args, cAddedRecord);
        this._resetProperties();
    };
    /**
     * Method to reset the flag after adding new record
     *
     * @returns {void} .
     */
    Edit.prototype._resetProperties = function () {
        this.parent.isOnEdit = false;
        this.parent.hideSpinner();
        this.addRowSelectedItem = null;
        this.newlyAddedRecordBackup = null;
        this.isBreakLoop = false;
        this.parent.element.tabIndex = 0;
        this.parent.initiateEditAction(false);
    };
    /**
     * Method to update unique id collection in TreeGrid
     *
     * @param {IGanttData} data .
     * @param {string} action .
     * @returns {void} .
     */
    Edit.prototype.updateTreeGridUniqueID = function (data, action) {
        if (action === 'add') {
            setValue('uniqueIDCollection.' + data.uniqueID, data, this.parent.treeGrid);
        }
        else if (action === 'delete') {
            deleteObject(getValue('uniqueIDCollection', this.parent.treeGrid), data.uniqueID);
        }
    };
    Edit.prototype.refreshNewlyAddedRecord = function (args, cAddedRecord) {
        if (this.parent.selectionModule && this.parent.allowSelection &&
            (this.parent.selectionSettings.mode === 'Row' || this.parent.selectionSettings.mode === 'Both')) {
            this.parent.staticSelectedRowIndex = this.parent.currentViewData.indexOf(args.data);
        }
        if (this.parent.timelineSettings.updateTimescaleView) {
            var tempArray = [];
            if (args.modifiedRecords.length > 0) {
                tempArray = args.data.length > 0 ? args.data : [args.data];
                // eslint-disable-next-line
                tempArray.push.apply(tempArray, args.modifiedRecords);
            }
            else {
                tempArray = args.data.length > 0 ? args.data : [args.data];
            }
            this.parent.timelineModule.updateTimeLineOnEditing([tempArray], args.action);
        }
        this.addSuccess(args);
        args = this.constructTaskAddedEventArgs(cAddedRecord, args.modifiedRecords, 'add');
        if (this.dialogModule.isAddNewResource && !this.parent.isEdit && this.parent.taskFields.work) {
            this.parent.dataOperation.updateWorkWithDuration(cAddedRecord[0]);
        }
        this.parent.trigger('actionComplete', args);
        if (!isNullOrUndefined(this.parent.loadingIndicator) && this.parent.loadingIndicator.indicatorType === "Shimmer") {
            this.parent.hideMaskRow();
        }
        else {
            this.parent.hideSpinner();
        }
        if (this.dialogModule.dialog && !this.dialogModule.dialogObj.isDestroyed) {
            this.dialogModule.dialogObj.hide();
        }
        this.dialogModule.dialogClose();
        if (this.parent.viewType === 'ResourceView') {
            if (cAddedRecord.length > 1) {
                for (var i = 0; i < cAddedRecord.length; i++) {
                    args.data[i].ganttProperties.sharedTaskUniqueIds.push(args.data[i]
                        .ganttProperties.rowUniqueID);
                    if (args.data[i].ganttProperties.resourceInfo) {
                        // if ((args.data[i] as IGanttData).ganttProperties.resourceInfo.length > 1) {
                        var resources = extend([], [], args.data[i].ganttProperties.resourceInfo, true);
                        resources.splice(0, 1);
                        this.updateResoures([], resources, args.data[i]);
                        // }
                    }
                    else {
                        this.removeChildRecord(args.data[i]);
                        this.parent.editModule.checkWithUnassignedTask(args.data[i]);
                    }
                    for (var k = 0; k < this.updateParentRecords.length; k++) {
                        this.parent.dataOperation.updateParentItems(this.updateParentRecords[k]);
                    }
                    this.updateParentRecords = [];
                }
            }
            else {
                args.data.ganttProperties.sharedTaskUniqueIds.push(args.data.ganttProperties.rowUniqueID);
                // eslint-disable-next-line
                if (args.data.ganttProperties.resourceInfo && args.data.ganttProperties.resourceInfo.length) {
                    if (args.data.ganttProperties.resourceInfo.length > 1) {
                        // eslint-disable-next-line
                        var resources = extend([], [], args.data.ganttProperties.resourceInfo, true);
                        resources.splice(0, 1);
                        this.updateResoures([], resources, args.data);
                    }
                }
                else {
                    this.removeChildRecord(args.data);
                    this.parent.editModule.checkWithUnassignedTask(args.data);
                }
                for (var k = 0; k < this.updateParentRecords.length; k++) {
                    this.parent.dataOperation.updateParentItems(this.updateParentRecords[k]);
                }
                this.updateParentRecords = [];
            }
        }
    };
    /**
     *
     * @returns {void} .
     * @private
     */
    Edit.prototype.removeAddedRecord = function () {
        var flatRecords = this.parent.flatData;
        var currentViewData = this.parent.currentViewData;
        var ids = this.parent.ids;
        var flatRecordsIndex = flatRecords.indexOf(this.newlyAddedRecordBackup);
        var currentViewDataIndex = currentViewData.indexOf(this.newlyAddedRecordBackup);
        var idsIndex = ids.indexOf(this.newlyAddedRecordBackup.ganttProperties.rowUniqueID.toString());
        deleteObject(this.parent.previousRecords, flatRecords[flatRecordsIndex].uniqueID);
        if (this.newlyAddedRecordBackup.parentItem) {
            var parentItem = this.parent.getParentTask(this.newlyAddedRecordBackup.parentItem);
            var parentIndex = parentItem.childRecords.indexOf(this.newlyAddedRecordBackup);
            parentItem.childRecords.splice(parentIndex, 1);
        }
        flatRecords.splice(flatRecordsIndex, 1);
        currentViewData.splice(currentViewDataIndex, 1);
        ids.splice(idsIndex, 1);
    };
    Edit.prototype.getPrevRecordIndex = function () {
        var prevRecord = this.parent.updatedRecords[this.parent.selectionModule.getSelectedRowIndexes()[0] - 1];
        var selectedRecord = this.parent.selectionModule.getSelectedRecords()[0];
        var parent = this.parent.getRootParent(prevRecord, selectedRecord.level);
        var prevIndex = this.parent.updatedRecords.indexOf(parent);
        return prevIndex;
    };
    /**
     * indent a selected record
     *
     * @returns {void} .
     */
    Edit.prototype.indent = function () {
        var index = this.parent.selectedRowIndex;
        var isSelected = this.parent.selectionModule ? this.parent.selectionModule.selectedRowIndexes.length === 1 ||
            this.parent.selectionModule.getSelectedRowCellIndexes().length === 1 ? true : false : false;
        var dropIndex;
        var prevRecord = this.parent.updatedRecords[this.parent.selectionModule.getSelectedRowIndexes()[0] - 1];
        var selectedRecord = this.parent.selectionModule.getSelectedRecords()[0];
        if (!this.parent.editSettings.allowEditing || index === 0 || index === -1 || !isSelected ||
            this.parent.viewType === 'ResourceView' || this.parent.updatedRecords[index].level - prevRecord.level === 1) {
            return;
        }
        else {
            if (prevRecord.level - selectedRecord.level === 0) {
                dropIndex = this.parent.selectionModule.getSelectedRowIndexes()[0] - 1;
            }
            else {
                dropIndex = this.getPrevRecordIndex();
            }
            this.indentOutdentRow([this.parent.selectionModule.getSelectedRowIndexes()[0]], dropIndex, 'child');
        }
    };
    /**
     * To perform outdent operation for selected row
     *
     * @returns {void} .
     */
    Edit.prototype.outdent = function () {
        var index = this.parent.selectionModule.getSelectedRowIndexes()[0];
        var dropIndex;
        var isSelected = this.parent.selectionModule ? this.parent.selectionModule.selectedRowIndexes.length === 1 ||
            this.parent.selectionModule.getSelectedRowCellIndexes().length === 1 ? true : false : false;
        if (!this.parent.editSettings.allowEditing || index === -1 || index === 0 || !isSelected ||
            this.parent.viewType === 'ResourceView' || this.parent.updatedRecords[index].level === 0) {
            return;
        }
        else {
            var thisParent = this.parent.getTaskByUniqueID(this.parent.selectionModule.getSelectedRecords()[0].parentItem.uniqueID);
            dropIndex = this.parent.updatedRecords.indexOf(thisParent);
            this.indentOutdentRow([index], dropIndex, 'below');
        }
    };
    Edit.prototype.indentOutdentRow = function (fromIndexes, toIndex, pos) {
        var _this = this;
        // eslint-disable-next-line
        if (fromIndexes[0] !== toIndex && pos === 'above' || 'below' || 'child') {
            if (pos === 'above') {
                this.dropPosition = 'topSegment';
            }
            if (pos === 'below') {
                this.dropPosition = 'bottomSegment';
            }
            if (pos === 'child') {
                this.dropPosition = 'middleSegment';
            }
            var action = void 0;
            var record = [];
            for (var i = 0; i < fromIndexes.length; i++) {
                record[i] = this.parent.updatedRecords[fromIndexes[i]];
            }
            var isByMethod_1 = true;
            var args_1 = {
                data: record,
                dropIndex: toIndex,
                dropPosition: this.dropPosition
            };
            if (this.dropPosition === 'middleSegment') {
                action = 'indenting';
            }
            else if (this.dropPosition === 'bottomSegment') {
                action = 'outdenting';
            }
            var actionArgs = {
                action: action,
                data: record[0],
                cancel: false
            };
            this.parent.trigger('actionBegin', actionArgs, function (actionArg) {
                if (!isNullOrUndefined(_this.parent.loadingIndicator) && _this.parent.loadingIndicator.indicatorType === "Shimmer") {
                    _this.parent.showMaskRow();
                }
                else {
                    _this.parent.showSpinner();
                }
                if (!actionArg.cancel) {
                    _this.reArrangeRows(args_1, isByMethod_1);
                }
                else {
                    return;
                }
            });
        }
        else {
            return;
        }
    };
    Edit.prototype.reArrangeRows = function (args, isByMethod) {
        this.dropPosition = args.dropPosition;
        if (args.dropPosition !== 'Invalid' && this.parent.editModule) {
            var obj = this.parent;
            var draggedRec = void 0;
            this.droppedRecord = obj.updatedRecords[args.dropIndex];
            var dragRecords = [];
            var droppedRec = this.droppedRecord;
            if (!args.data[0]) {
                dragRecords.push(args.data);
            }
            else {
                dragRecords = args.data;
            }
            var c = 0;
            var dLength = dragRecords.length;
            for (var i = 0; i < dLength; i++) {
                this.parent.isOnEdit = true;
                draggedRec = dragRecords[i];
                this.draggedRecord = draggedRec;
                if (this.dropPosition !== 'Invalid') {
                    if (isByMethod) {
                        this.deleteDragRow();
                    }
                    var recordIndex1 = this.treeGridData.indexOf(droppedRec);
                    if (this.dropPosition === 'bottomSegment') {
                        if (!droppedRec.hasChildRecords) {
                            if (this.parent.taskFields.parentID && this.ganttData.length > 0) {
                                this.ganttData.splice(recordIndex1 + 1, 0, this.draggedRecord.taskData);
                            }
                            this.treeGridData.splice(recordIndex1 + 1, 0, this.draggedRecord);
                            this.parent.ids.splice(recordIndex1 + 1, 0, this.draggedRecord.ganttProperties.rowUniqueID.toString());
                        }
                        else {
                            c = this.parent.editModule.getChildCount(droppedRec, 0);
                            if (this.parent.taskFields.parentID && this.ganttData.length > 0) {
                                this.ganttData.splice(recordIndex1 + c + 1, 0, this.draggedRecord.taskData);
                            }
                            this.treeGridData.splice(recordIndex1 + c + 1, 0, this.draggedRecord);
                            this.parent.ids.splice(recordIndex1 + c + 1, 0, this.draggedRecord.ganttProperties.rowUniqueID.toString());
                            var idIndex = this.parent.ids.indexOf(this.draggedRecord[this.parent.taskFields.id].toString());
                            if (idIndex !== recordIndex1 + c + 1) {
                                this.parent.ids.splice(idIndex, 1);
                                this.parent.ids.splice(recordIndex1 + c + 1, 0, this.draggedRecord[this.parent.taskFields.id].toString());
                            }
                        }
                        this.parent.setRecordValue('parentItem', this.treeGridData[recordIndex1].parentItem, draggedRec);
                        this.parent.setRecordValue('parentUniqueID', this.treeGridData[recordIndex1].parentUniqueID, draggedRec);
                        this.parent.setRecordValue('level', this.treeGridData[recordIndex1].level, draggedRec);
                        if (draggedRec.hasChildRecords) {
                            var level = 1;
                            this.updateChildRecordLevel(draggedRec, level);
                            this.updateChildRecord(draggedRec, recordIndex1 + c + 1);
                        }
                        if (droppedRec.parentItem) {
                            var record = this.parent.getParentTask(droppedRec.parentItem).childRecords;
                            var childRecords = record;
                            var droppedRecordIndex = childRecords.indexOf(droppedRec) + 1;
                            childRecords.splice(droppedRecordIndex, 0, draggedRec);
                        }
                    }
                    if (this.dropPosition === 'middleSegment') {
                        this.dropMiddle(recordIndex1);
                    }
                    if (!isNullOrUndefined(draggedRec.parentItem && this.updateParentRecords.indexOf(draggedRec.parentItem) !== -1)) {
                        this.updateParentRecords.push(draggedRec.parentItem);
                    }
                }
                if (isNullOrUndefined(draggedRec.parentItem)) {
                    var parentRecords = this.parent.treeGrid.parentData;
                    var newParentIndex = parentRecords.indexOf(this.droppedRecord);
                    if (this.dropPosition === 'bottomSegment') {
                        parentRecords.splice(newParentIndex + 1, 0, draggedRec);
                    }
                }
                this.refreshDataSource();
            }
            if (this.dropPosition === 'middleSegment') {
                if (droppedRec.ganttProperties.predecessor) {
                    this.parent.editModule.removePredecessorOnDelete(droppedRec);
                    droppedRec.ganttProperties.predecessor = null;
                    droppedRec.ganttProperties.predecessorsName = null;
                    droppedRec[this.parent.taskFields.dependency] = null;
                    droppedRec.taskData[this.parent.taskFields.dependency] = null;
                }
                if (droppedRec.ganttProperties.isMilestone) {
                    this.parent.setRecordValue('isMilestone', false, droppedRec.ganttProperties, true);
                    if (!isNullOrUndefined(droppedRec.taskData[this.parent.taskFields.milestone])) {
                        if (droppedRec.taskData[this.parent.taskFields.milestone] === true) {
                            droppedRec.taskData[this.parent.taskFields.milestone] = false;
                        }
                    }
                }
            }
            for (var k = 0; k < this.updateParentRecords.length; k++) {
                this.parent.dataOperation.updateParentItems(this.updateParentRecords[k]);
            }
            this.updateParentRecords = [];
            this.parent.isOnEdit = false;
        }
        this.refreshRecord(args);
    };
    /**
     * @returns {void} .
     * @private
     */
    Edit.prototype.refreshRecord = function (args, isDrag) {
        var _this = this;
        if (isRemoteData(this.parent.dataSource)) {
            var data = this.parent.dataSource;
            var updatedData = {
                changedRecords: getTaskData(this.parent.editedRecords, null, null, this.parent)
            };
            var queryValue = this.parent.query instanceof Query ? this.parent.query : new Query();
            var crud = null;
            var adaptor = data.adaptor;
            if (!(adaptor instanceof WebApiAdaptor && adaptor instanceof ODataAdaptor) || data.dataSource.batchUrl) {
                crud = data.saveChanges(updatedData, this.parent.taskFields.id, null, queryValue);
            }
            else {
                var changedRecords = 'changedRecords';
                crud = data.update(this.parent.taskFields.id, updatedData[changedRecords], null, queryValue);
            }
            crud.then(function (e) { return _this.indentSuccess(e, args, isDrag); })
                .catch(function (e) { return _this.indentFailure(e); });
        }
        else {
            this.indentOutdentSuccess(args, isDrag);
        }
    };
    Edit.prototype.indentSuccess = function (e, args, isDrag) {
        this.indentOutdentSuccess(args, isDrag);
    };
    Edit.prototype.indentFailure = function (e) {
        this.parent.trigger('actionFailure', { error: e });
    };
    Edit.prototype.indentOutdentSuccess = function (args, isDrag) {
        this.parent.treeGrid.parentData = [];
        this.parent.treeGrid.refresh();
        if (this.parent.enableImmutableMode) {
            this.refreshRecordInImmutableMode(args.data, isDrag);
        }
        if (isDrag) {
            args.requestType = 'rowDropped';
        }
        else {
            if (this.dropPosition === 'middleSegment') {
                args.requestType = 'indented';
            }
            else if (this.dropPosition === 'bottomSegment') {
                args.requestType = 'outdented';
            }
        }
        args.modifiedRecords = this.parent.editedRecords;
        if (this.parent.timezone) {
            for (var i = 0; i < args.modifiedRecords.length; i++) {
                updateDates(args.modifiedRecords[i], this.parent);
            }
        }
        this.parent.trigger('actionComplete', args);
        if (!isNullOrUndefined(this.parent.loadingIndicator) && this.parent.loadingIndicator.indicatorType === "Shimmer") {
            this.parent.hideMaskRow();
        }
        else {
            this.parent.hideSpinner();
        }
        this.parent.editedRecords = [];
    };
    Edit.prototype.refreshDataSource = function () {
        var draggedRec = this.draggedRecord;
        var droppedRec = this.droppedRecord;
        var proxy = this.parent;
        var tempData;
        var indx;
        if (this.parent.dataSource instanceof DataManager) {
            tempData = getValue('dataOperation.dataArray', this.parent);
        }
        else {
            tempData = proxy.dataSource;
        }
        if (tempData.length > 0 && (!isNullOrUndefined(droppedRec) && !droppedRec.parentItem)) {
            for (var i = 0; i < Object.keys(tempData).length; i++) {
                if (tempData[i][this.parent.taskFields.child] === droppedRec.taskData[this.parent.taskFields.child]) {
                    indx = i;
                }
            }
            if (this.dropPosition === 'topSegment') {
                if (!this.parent.taskFields.parentID) {
                    tempData.splice(indx, 0, draggedRec.taskData);
                }
            }
            else if (this.dropPosition === 'bottomSegment') {
                if (!this.parent.taskFields.parentID) {
                    tempData.splice(indx + 1, 0, draggedRec.taskData);
                }
            }
        }
        else if (!this.parent.taskFields.parentID && (!isNullOrUndefined(droppedRec) && droppedRec.parentItem)) {
            if (this.dropPosition === 'topSegment' || this.dropPosition === 'bottomSegment') {
                var rowPos = this.dropPosition === 'topSegment' ? 'Above' : 'Below';
                this.parent.editModule.addRowSelectedItem = droppedRec;
                var dragRecord = [];
                if (!Array.isArray(draggedRec)) {
                    dragRecord[0] = draggedRec;
                }
                else {
                    dragRecord = draggedRec;
                }
                this.parent.editModule.updateRealDataSource(dragRecord, rowPos);
                delete this.parent.editModule.addRowSelectedItem;
            }
        }
        if (this.parent.taskFields.parentID) {
            if (draggedRec.parentItem) {
                if (this.dropPosition === 'topSegment' || this.dropPosition === 'bottomSegment') {
                    draggedRec[this.parent.taskFields.parentID] = droppedRec[this.parent.taskFields.parentID];
                    draggedRec.taskData[this.parent.taskFields.parentID] = droppedRec[this.parent.taskFields.parentID];
                    draggedRec.ganttProperties['parentId'] = droppedRec[this.parent.taskFields.parentID];
                }
                else {
                    draggedRec[this.parent.taskFields.parentID] = droppedRec[this.parent.taskFields.id];
                    draggedRec.taskData[this.parent.taskFields.parentID] = droppedRec[this.parent.taskFields.id];
                    draggedRec.ganttProperties['parentId'] = droppedRec[this.parent.taskFields.id];
                }
            }
            else {
                draggedRec[this.parent.taskFields.parentID] = null;
                draggedRec.taskData[this.parent.taskFields.parentID] = null;
                draggedRec.ganttProperties['parentId'] = null;
            }
        }
    };
    Edit.prototype.deleteDragRow = function () {
        if (this.parent.dataSource instanceof DataManager) {
            this.ganttData = getValue('dataOperation.dataArray', this.parent);
        }
        else {
            this.ganttData = isCountRequired(this.parent) ? getValue('result', this.parent.dataSource) :
                this.parent.dataSource;
        }
        this.treeGridData = isCountRequired(this.parent) ?
            getValue('result', this.parent.treeGrid.dataSource) : this.parent.treeGrid.dataSource;
        var delRow = this.parent.getTaskByUniqueID(this.draggedRecord.uniqueID);
        this.removeRecords(delRow);
    };
    Edit.prototype.updateIndentedChildRecords = function (indentedRecord) {
        var createParentItem = {
            uniqueID: indentedRecord.uniqueID,
            expanded: indentedRecord.expanded,
            level: indentedRecord.level,
            index: indentedRecord.index,
            taskId: indentedRecord.ganttProperties.rowUniqueID
        };
        for (var i = 0; i < indentedRecord.childRecords.length; i++) {
            this.parent.setRecordValue('parentItem', createParentItem, indentedRecord.childRecords[i]);
            this.parent.setRecordValue('parentUniqueID', indentedRecord.uniqueID, indentedRecord.childRecords[i]);
        }
        if (indentedRecord.hasChildRecords) {
            indentedRecord = indentedRecord.childRecords;
            for (var j = 0; j < indentedRecord['length']; j++) {
                this.updateIndentedChildRecords(indentedRecord[j]);
            }
        }
    };
    Edit.prototype.dropMiddle = function (recordIndex1) {
        var obj = this.parent;
        var childRec = this.parent.editModule.getChildCount(this.droppedRecord, 0);
        var childRecordsLength = (isNullOrUndefined(childRec) ||
            childRec === 0) ? recordIndex1 + 1 :
            childRec + recordIndex1 + 1;
        if (this.dropPosition === 'middleSegment') {
            if (obj.taskFields.parentID && this.ganttData.length > 0) {
                this.ganttData.splice(childRecordsLength, 0, this.draggedRecord.taskData);
            }
            this.treeGridData.splice(childRecordsLength, 0, this.draggedRecord);
            this.parent.ids.splice(childRecordsLength, 0, this.draggedRecord[this.parent.taskFields.id].toString());
            this.recordLevel();
            if (this.draggedRecord.hasChildRecords) {
                this.updateChildRecord(this.draggedRecord, childRecordsLength, this.droppedRecord.expanded);
                if (this.parent.enableImmutableMode) {
                    var indentedRecord = this.draggedRecord;
                    this.updateIndentedChildRecords(indentedRecord);
                }
            }
            if (isNullOrUndefined(this.draggedRecord.parentItem &&
                this.updateParentRecords.indexOf(this.draggedRecord.parentItem) !== -1)) {
                this.updateParentRecords.push(this.draggedRecord.parentItem);
            }
        }
    };
    Edit.prototype.updateChildRecordLevel = function (record, levl) {
        var length = 0;
        var currentRec;
        levl++;
        if (!record.hasChildRecords) {
            return 0;
        }
        length = record.childRecords.length;
        for (var j = 0; j < length; j++) {
            currentRec = record.childRecords[j];
            var parentData = void 0;
            if (record.parentItem) {
                var id = 'uniqueIDCollection';
                parentData = this.parent.treeGrid[id][record.parentItem.uniqueID];
            }
            currentRec.level = record.parentItem ? parentData.level + levl : record.level + 1;
            if (currentRec.hasChildRecords) {
                levl--;
                levl = this.updateChildRecordLevel(currentRec, levl);
            }
        }
        return levl;
    };
    /* eslint-disable-next-line */
    Edit.prototype.updateChildRecord = function (record, count, expanded) {
        var currentRec;
        var obj = this.parent;
        var length = 0;
        if (!record.hasChildRecords) {
            return 0;
        }
        length = record.childRecords.length;
        for (var i = 0; i < length; i++) {
            currentRec = record.childRecords[i];
            count++;
            obj.flatData.splice(count, 0, currentRec);
            this.parent.ids.splice(count, 0, currentRec.ganttProperties.rowUniqueID.toString());
            if (obj.taskFields.parentID && this.ganttData.length > 0) {
                this.ganttData.splice(count, 0, currentRec.taskData);
            }
            if (currentRec.hasChildRecords) {
                count = this.updateChildRecord(currentRec, count);
            }
        }
        return count;
    };
    Edit.prototype.removeRecords = function (record) {
        var obj = this.parent;
        var dataSource;
        if (this.parent.dataSource instanceof DataManager) {
            dataSource = getValue('dataOperation.dataArray', this.parent);
        }
        else {
            dataSource = this.parent.dataSource;
        }
        var delRow = record;
        var flatParent = this.parent.getParentTask(delRow.parentItem);
        if (delRow) {
            if (delRow.parentItem) {
                var childRecords = flatParent ? flatParent.childRecords : [];
                var childIndex = 0;
                if (childRecords && childRecords.length > 0) {
                    childIndex = childRecords.indexOf(delRow);
                    flatParent.childRecords.splice(childIndex, 1);
                    if (!this.parent.taskFields.parentID) {
                        flatParent.taskData[this.parent.taskFields.child].splice(childIndex, 1);
                    }
                    // collection for updating parent record
                    this.updateParentRecords.push(flatParent);
                }
            }
            if (obj.taskFields.parentID) {
                if (delRow.hasChildRecords && delRow.childRecords.length > 0) {
                    this.removeChildItem(delRow);
                }
                var indx = void 0;
                var ganttData = dataSource.length > 0 ?
                    dataSource : this.parent.currentViewData;
                for (var i = 0; i < ganttData.length; i++) {
                    if (ganttData[i][this.parent.taskFields.id] === delRow.taskData[this.parent.taskFields.id]) {
                        indx = i;
                    }
                }
                if (indx !== -1) {
                    if (dataSource.length > 0) {
                        dataSource.splice(indx, 1);
                    }
                    var gridIndx = void 0;
                    for (var i = 0; i < this.treeGridData.length; i++) {
                        if (this.treeGridData[i][this.parent.taskFields.id] === delRow.taskData[this.parent.taskFields.id]) {
                            gridIndx = i;
                        }
                    }
                    this.treeGridData.splice(gridIndx, 1);
                    this.parent.ids.splice(gridIndx, 1);
                    if (this.parent.treeGrid.parentData.indexOf(delRow) !== -1) {
                        this.parent.treeGrid.parentData.splice(this.parent.treeGrid.parentData.indexOf(delRow), 1);
                    }
                }
            }
            var recordIdx = this.treeGridData.indexOf(delRow);
            if (!obj.taskFields.parentID) {
                var deletedRecordCount = this.getChildCount(delRow, 0);
                this.treeGridData.splice(recordIdx, deletedRecordCount + 1);
                this.parent.ids.splice(recordIdx, deletedRecordCount + 1);
                var parentIndex = this.ganttData.indexOf(delRow.taskData);
                if (parentIndex !== -1) {
                    this.ganttData.splice(parentIndex, 1);
                    this.parent.treeGrid.parentData.splice(parentIndex, 1);
                }
            }
            if (delRow.parentItem && flatParent && flatParent.childRecords && !flatParent.childRecords.length) {
                this.parent.setRecordValue('expanded', false, flatParent);
                this.parent.setRecordValue('hasChildRecords', false, flatParent);
            }
        }
    };
    Edit.prototype.removeChildItem = function (record) {
        var currentRec;
        var indx;
        for (var i = 0; i < record.childRecords.length; i++) {
            currentRec = record.childRecords[i];
            var data = void 0;
            if (this.parent.dataSource instanceof DataManager) {
                data = getValue('dataOperation.dataArray', this.parent);
            }
            else {
                data = this.parent.dataSource;
            }
            for (var j = 0; j < data.length; j++) {
                if (data[j][this.parent.taskFields.id] === currentRec.taskData[this.parent.taskFields.id]) {
                    indx = j;
                }
            }
            if (indx !== -1) {
                if (data.length > 0) {
                    data.splice(indx, 1);
                }
                var gridIndx = void 0;
                for (var i_1 = 0; i_1 < this.treeGridData.length; i_1++) {
                    if (this.treeGridData[i_1][this.parent.taskFields.id] === currentRec.taskData[this.parent.taskFields.id]) {
                        gridIndx = i_1;
                    }
                }
                this.treeGridData.splice(gridIndx, 1);
                this.parent.ids.splice(gridIndx, 1);
            }
            if (currentRec.hasChildRecords) {
                this.removeChildItem(currentRec);
            }
        }
    };
    Edit.prototype.recordLevel = function () {
        var obj = this.parent;
        var draggedRec = this.draggedRecord;
        var droppedRec = this.droppedRecord;
        var childItem = obj.taskFields.child;
        if (!droppedRec.hasChildRecords) {
            droppedRec.hasChildRecords = true;
            if (!droppedRec.childRecords.length) {
                droppedRec.childRecords = [];
                if (!obj.taskFields.parentID && isNullOrUndefined(droppedRec.taskData[childItem])) {
                    droppedRec.taskData[childItem] = [];
                }
            }
        }
        if (this.dropPosition === 'middleSegment') {
            var parentItem = extend({}, droppedRec);
            delete parentItem.childRecords;
            var createParentItem = {
                uniqueID: parentItem.uniqueID,
                expanded: parentItem.expanded,
                level: parentItem.level,
                index: parentItem.index,
                taskId: parentItem.ganttProperties.rowUniqueID
            };
            this.parent.setRecordValue('parentItem', createParentItem, draggedRec);
            this.parent.setRecordValue('parentUniqueID', droppedRec.uniqueID, draggedRec);
            droppedRec.childRecords.splice(droppedRec.childRecords.length, 0, draggedRec);
            if (!isNullOrUndefined(draggedRec) && !obj.taskFields.parentID && !isNullOrUndefined(droppedRec.taskData[childItem])) {
                droppedRec.taskData[obj.taskFields.child].splice(droppedRec.childRecords.length, 0, draggedRec.taskData);
            }
            if (!isNullOrUndefined(droppedRec.ganttProperties.segments) && droppedRec.ganttProperties.segments.length > 0) {
                droppedRec.ganttProperties.segments = null;
                droppedRec.taskData[obj.taskFields.segments] = null;
            }
            if (!draggedRec.hasChildRecords) {
                draggedRec.level = droppedRec.level + 1;
            }
            else {
                var level = 1;
                draggedRec.level = droppedRec.level + 1;
                this.updateChildRecordLevel(draggedRec, level);
            }
            droppedRec.expanded = true;
        }
    };
    return Edit;
}());
export { Edit };
