import { isScheduledTask } from '../base/utils';
import { getValue, isNullOrUndefined, extend } from '@syncfusion/ej2-base';
var Dependency = /** @class */ (function () {
    function Dependency(gantt) {
        this.parentRecord = [];
        this.parentIds = [];
        this.parentPredecessors = [];
        this.parent = gantt;
        this.dateValidateModule = this.parent.dateValidationModule;
    }
    /**
     * Method to populate predecessor collections in records
     *
     * @returns {void} .
     * @private
     */
    Dependency.prototype.ensurePredecessorCollection = function () {
        var predecessorTasks = this.parent.predecessorsCollection;
        var length = predecessorTasks.length - 1;
        for (var count = length; count >= 0; count--) {
            var ganttData = predecessorTasks[count];
            var ganttProp = ganttData.ganttProperties;
            if ((!ganttData.hasChildRecords && !this.parent.allowParentDependency) || this.parent.allowParentDependency) {
                this.ensurePredecessorCollectionHelper(ganttData, ganttProp);
            }
        }
    };
    /**
     *
     * @param {IGanttData} ganttData .
     * @param {ITaskData} ganttProp .
     * @returns {void} .
     * @private
     */
    Dependency.prototype.ensurePredecessorCollectionHelper = function (ganttData, ganttProp) {
        var predecessorVal = ganttProp.predecessorsName;
        if (predecessorVal && (typeof predecessorVal === 'string' || typeof predecessorVal === 'number')) {
            this.parent.setRecordValue('predecessor', this.calculatePredecessor(predecessorVal, ganttData), ganttProp, true);
        }
        else if (predecessorVal && typeof predecessorVal === 'object' && predecessorVal.length) {
            var preValues = [];
            for (var c = 0; c < predecessorVal.length; c++) {
                var predecessorItem = predecessorVal[c];
                var preValue = {};
                preValue.from = getValue('from', predecessorItem);
                preValue.to = getValue('to', predecessorItem) ? getValue('to', predecessorItem) : ganttProp.rowUniqueID;
                preValue.type = getValue('type', predecessorItem) ? getValue('type', predecessorItem) : 'FS';
                var offsetUnits = getValue('offset', predecessorItem);
                if (isNullOrUndefined(offsetUnits)) {
                    preValue.offset = 0;
                    preValue.offsetUnit = this.parent.durationUnit.toLocaleLowerCase();
                }
                else if (typeof offsetUnits === 'string') {
                    var tempOffsetUnits = this.getOffsetDurationUnit(getValue('offset', predecessorItem));
                    preValue.offset = tempOffsetUnits.duration;
                    preValue.offsetUnit = tempOffsetUnits.durationUnit;
                }
                else {
                    preValue.offset = parseFloat(offsetUnits.toString());
                    preValue.offsetUnit = this.parent.durationUnit.toLocaleLowerCase();
                }
                var isOwnParent = this.checkIsParent(preValue.from.toString());
                if (!isOwnParent) {
                    preValues.push(preValue);
                }
            }
            this.parent.setRecordValue('predecessor', preValues, ganttProp, true);
        }
        this.parent.setRecordValue('predecessorsName', this.getPredecessorStringValue(ganttData), ganttProp, true);
        this.parent.setRecordValue('taskData.' + this.parent.taskFields.dependency, ganttProp.predecessorsName, ganttData);
        this.parent.setRecordValue(this.parent.taskFields.dependency, ganttProp.predecessorsName, ganttData);
    };
    /**
     * To render unscheduled empty task with 1 day duration during predecessor map
     *
     * @param {IGanttData} data .
     * @returns {void} .
     * @private
     */
    Dependency.prototype.updateUnscheduledDependency = function (data) {
        var task = this.parent.taskFields;
        var prdList = !isNullOrUndefined(data[task.dependency]) ?
            data[task.dependency].toString().split(',') : [];
        for (var i = 0; i < prdList.length; i++) {
            var predId = parseInt(prdList[i], 10);
            if (!isNaN(predId)) {
                var predData = this.parent.getRecordByID(predId.toString());
                var record = !isNullOrUndefined(predData) ?
                    extend({}, {}, predData.taskData, true) : null;
                if (!isNullOrUndefined(record) && isNullOrUndefined(record[task.startDate])
                    && isNullOrUndefined(record[task.duration]) && isNullOrUndefined(record[task.endDate])) {
                    record[task.duration] = 1;
                    record[task.startDate] = this.parent.projectStartDate;
                    this.parent.updateRecordByID(record);
                }
            }
        }
    };
    /**
     *
     * @param {string} fromId .
     * @returns {boolean} .
     */
    Dependency.prototype.checkIsParent = function (fromId) {
        var boolValue = false;
        var task = this.parent.connectorLineModule.getRecordByID(fromId);
        if (task.hasChildRecords) {
            boolValue = true;
        }
        return boolValue;
    };
    /**
     * Get predecessor collection object from predecessor string value
     *
     * @param {string | number} predecessorValue .
     * @param {IGanttData} ganttRecord .
     * @returns {IPredecessor[]} .
     * @private
     */
    Dependency.prototype.calculatePredecessor = function (predecessorValue, ganttRecord) {
        var _this = this;
        var predecessor = predecessorValue.toString();
        var collection = [];
        var match;
        var isrelationship;
        var values;
        var offsetValue;
        var predecessorText;
        predecessor.split(',').forEach(function (el) {
            values = el.split('+');
            offsetValue = '+';
            if (el.indexOf('-') >= 0) {
                values = el.split('-');
                offsetValue = '-';
            }
            match = [];
            var ids = _this.parent.viewType === 'ResourceView' ? _this.parent.getTaskIds() : _this.parent.ids;
            var isExist1 = _this.parent.viewType === 'ResourceView' ? ids.indexOf('T' + values[0]) : ids.indexOf(values[0]);
            if (isExist1 !== -1) {
                match[0] = values[0];
            }
            else {
                if (ids.indexOf(values[0]) === -1) {
                    match = values[0].split(" ");
                    if (match.length === 1) {
                        if (match[0].indexOf(" ") != -1) {
                            match = values[0].match(/(\d+|[A-z]+)/g);
                        }
                        else {
                            match[0] = values[0].slice(0, -2);
                            match[1] = values[0].slice(-2);
                        }
                    }
                }
                else {
                    match[0] = values[0];
                }
            }
            var isExist = _this.parent.viewType === 'ResourceView' ? ids.indexOf('T' + match[0]) : ids.indexOf(match[0]);
            /*Validate for appropriate predecessor*/
            if (match[0] && isExist !== -1) {
                if (match.length > 1) {
                    var type = match[1].toUpperCase();
                    if (type === 'FS' || type === 'FF' || type === 'SF' || type === 'SS') {
                        predecessorText = type;
                    }
                    else {
                        predecessorText = 'FS';
                    }
                }
                else {
                    predecessorText = 'FS';
                }
            }
            else {
                return; // exit current loop for invalid id (match[0])
            }
            var tempOffset = values.length > 1 ? offsetValue + '' + values[1] : '0';
            var offsetUnits = _this.getOffsetDurationUnit(tempOffset);
            var obj = {
                from: match[0],
                type: predecessorText,
                isDrawn: false,
                to: _this.parent.viewType === 'ResourceView' ? ganttRecord.ganttProperties.taskId.toString()
                    : ganttRecord.ganttProperties.rowUniqueID.toString(),
                offsetUnit: offsetUnits.durationUnit,
                offset: offsetUnits.duration
            };
            var isOwnParent = _this.checkIsParent(match[0]);
            if (!_this.parent.allowParentDependency) {
                if (!isOwnParent) {
                    collection.push(obj);
                }
            }
            else {
                var fromData = _this.parent.connectorLineModule.getRecordByID(obj.to);
                var toData = _this.parent.connectorLineModule.getRecordByID(obj.from);
                var isValid = void 0;
                if (_this.parent.connectorLineEditModule && toData && fromData) {
                    isValid = _this.parent.connectorLineEditModule.validateParentPredecessor(toData, fromData);
                    if (isValid)
                        collection.push(obj);
                }
                else {
                    collection.push(obj);
                }
                match.splice(0);
            }
        });
        return collection;
    };
    /**
     * Get predecessor value as string with offset values
     *
     * @param {IGanttData} data .
     * @returns {string} .
     * @private
     */
    Dependency.prototype.getPredecessorStringValue = function (data) {
        var predecessors = data.ganttProperties.predecessor;
        var durationUnitTexts = this.parent.durationUnitTexts;
        var resultString = '';
        var temp1;
        var match;
        match = [];
        if (predecessors) {
            var length_1 = predecessors.length;
            for (var i = 0; i < length_1; i++) {
                var currentValue = predecessors[i];
                var temp = '';
                var id = this.parent.viewType === 'ResourceView' ? data.ganttProperties.taskId
                    : data.ganttProperties.rowUniqueID;
                if (currentValue.from !== id.toString()) {
                    temp = currentValue.from + currentValue.type;
                    if (typeof (data.ganttProperties.taskId) === "string") {
                        match[0] = temp.slice(0, -2);
                        match[1] = temp.slice(-2);
                        temp1 = match[0] + " " + match[1];
                    }
                    else {
                        temp1 = temp;
                    }
                    temp = temp1;
                    if (currentValue.offset !== 0) {
                        temp += currentValue.offset > 0 ? ('+' + currentValue.offset + ' ') : (currentValue.offset + ' ');
                        var multiple = currentValue.offset !== 1;
                        if (currentValue.offsetUnit === 'day') {
                            temp += multiple ? getValue('days', durationUnitTexts) : getValue('day', durationUnitTexts);
                        }
                        else if (currentValue.offsetUnit === 'hour') {
                            temp += multiple ? getValue('hours', durationUnitTexts) : getValue('hour', durationUnitTexts);
                        }
                        else {
                            temp += multiple ? getValue('minutes', durationUnitTexts) : getValue('minute', durationUnitTexts);
                        }
                    }
                    if (resultString.length > 0) {
                        resultString = resultString + ',' + temp;
                    }
                    else {
                        resultString = temp;
                    }
                }
            }
        }
        return resultString;
    };
    /*Get duration and duration unit value from tasks*/
    Dependency.prototype.getOffsetDurationUnit = function (val) {
        var duration = 0;
        var durationUnit = this.parent.durationUnit.toLocaleLowerCase();
        var durationUnitLabels = this.parent.durationUnitEditText;
        if (typeof val === 'string') {
            var values = val.match(/[^0-9]+|[0-9]+/g);
            for (var x = 0; x < values.length; x++) {
                values[x] = (values[x]).trim();
            }
            if (values[0] === '-' && values[1]) {
                values[1] = values[0] + values[1];
                values.shift();
            }
            else if (values[0] === '+') {
                values.shift();
            }
            if (values[1] === '.' && !isNaN(parseInt(values[2], 10))) {
                values[0] += values[1] + values[2];
                values.splice(1, 2);
            }
            if (values && values.length <= 2) {
                duration = parseFloat(values[0]);
                durationUnit = values[1] ? (values[1].toLowerCase()).trim() : '';
                if (getValue('minute', durationUnitLabels).indexOf(durationUnit) !== -1) {
                    durationUnit = 'minute';
                }
                else if (getValue('hour', durationUnitLabels).indexOf(durationUnit) !== -1) {
                    durationUnit = 'hour';
                }
                else if (getValue('day', durationUnitLabels).indexOf(durationUnit) !== -1) {
                    durationUnit = 'day';
                }
                else {
                    durationUnit = this.parent.durationUnit.toLocaleLowerCase();
                }
            }
        }
        else {
            duration = val;
            durationUnit = this.parent.durationUnit.toLocaleLowerCase();
        }
        if (isNaN(duration)) {
            duration = 0;
            durationUnit = this.parent.durationUnit.toLocaleLowerCase();
        }
        return {
            duration: duration,
            durationUnit: durationUnit
        };
    };
    /**
     * Update predecessor object in both from and to tasks collection
     *
     * @returns {void} .
     * @private
     */
    Dependency.prototype.updatePredecessors = function () {
        var predecessorsCollection = this.parent.predecessorsCollection;
        var ganttRecord;
        var length = predecessorsCollection.length;
        for (var count = 0; count < length; count++) {
            ganttRecord = predecessorsCollection[count];
            if ((!ganttRecord.hasChildRecords && !this.parent.allowParentDependency) || this.parent.allowParentDependency) {
                this.updatePredecessorHelper(ganttRecord, predecessorsCollection);
                if (!ganttRecord.ganttProperties.isAutoSchedule && this.parent.editSettings.allowEditing) {
                    this.parent.connectorLineEditModule['calculateOffset'](ganttRecord);
                }
            }
        }
    };
    /**
     * To update predecessor collection to successor tasks
     *
     * @param {IGanttData} ganttRecord .
     * @param {IGanttData[]} predecessorsCollection .
     * @returns {void} .
     * @private
     */
    Dependency.prototype.updatePredecessorHelper = function (ganttRecord, predecessorsCollection) {
        var connectorsCollection = ganttRecord.ganttProperties.predecessor;
        var successorGanttRecord;
        var connectorCount = connectorsCollection.length;
        predecessorsCollection = isNullOrUndefined(predecessorsCollection) ? [] : predecessorsCollection;
        for (var i = 0; i < connectorCount; i++) {
            var connector = connectorsCollection[i];
            successorGanttRecord = this.parent.connectorLineModule.getRecordByID(connector.from);
            var id = this.parent.viewType === 'ResourceView' ? ganttRecord.ganttProperties.taskId
                : ganttRecord.ganttProperties.rowUniqueID;
            if (connector.from !== id.toString()) {
                if (successorGanttRecord) {
                    var predecessorCollection = void 0;
                    if (successorGanttRecord.ganttProperties.predecessor) {
                        predecessorCollection = (extend([], successorGanttRecord.ganttProperties.predecessor, [], true));
                        predecessorCollection.push(connector);
                        this.parent.setRecordValue('predecessor', predecessorCollection, successorGanttRecord.ganttProperties, true);
                        //  successorGanttRecord.ganttProperties.predecessor.push(connector);
                    }
                    else {
                        predecessorCollection = [];
                        predecessorCollection.push(connector);
                        this.parent.setRecordValue('predecessor', predecessorCollection, successorGanttRecord.ganttProperties, true);
                        // this.parent.setRecordValue('predecessor', [], successorGanttRecord.ganttProperties, true);
                        // successorGanttRecord.ganttProperties.predecessor.push(connector);
                        predecessorsCollection.push(successorGanttRecord);
                    }
                }
            }
        }
    };
    /**
     * Method to validate date of tasks with predecessor values for all records
     *
     * @returns {void} .
     * @private
     */
    Dependency.prototype.updatedRecordsDateByPredecessor = function () {
        if (!this.parent.autoCalculateDateScheduling) {
            return;
        }
        var flatData = this.parent.flatData;
        var totLength = this.parent.flatData.length;
        for (var count = 0; count < totLength; count++) {
            if (flatData[count].ganttProperties.predecessorsName) {
                this.validatePredecessorDates(flatData[count]);
                var predecessorCollection = flatData[count].ganttProperties.predecessor;
                if (predecessorCollection && predecessorCollection.length > 1) {
                    for (var i = 0; i < predecessorCollection.length; i++) {
                        var validateRecord = this.parent.getRecordByID(predecessorCollection[i].to);
                        if (validateRecord) {
                            this.validatePredecessorDates(validateRecord);
                        }
                    }
                }
                if (flatData[count].hasChildRecords && this.parent.editModule && !this.parent.allowUnscheduledTasks
                    && this.parent.allowParentDependency) {
                    this.parent.editModule['updateChildItems'](flatData[count]);
                }
            }
        }
    };
    Dependency.prototype.updateParentPredecessor = function () {
        if (this.parent.enablePredecessorValidation) {
            var parentPredecessorLength = this.parentPredecessors.length;
            for (var i = parentPredecessorLength - 1; i >= 0; i--) {
                var item = this.parentPredecessors[i];
                this.validatePredecessorDates(item);
                if (item.ganttProperties.startDate) {
                    this.parent.editModule['updateChildItems'](item);
                }
            }
        }
    };
    /**
     * To validate task date values with dependency
     *
     * @param {IGanttData} ganttRecord .
     * @returns {void} .
     * @private
     */
    Dependency.prototype.validatePredecessorDates = function (ganttRecord) {
        if (ganttRecord.ganttProperties.predecessor) {
            var predecessorsCollection = ganttRecord.ganttProperties.predecessor;
            var count = void 0;
            var parentGanttRecord = void 0;
            var record = null;
            var currentTaskId_1 = this.parent.viewType === 'ResourceView' ? ganttRecord.ganttProperties.taskId.toString()
                : ganttRecord.ganttProperties.rowUniqueID.toString();
            var predecessors = predecessorsCollection.filter(function (data) {
                if (data.to === currentTaskId_1) {
                    return data;
                }
                else {
                    return null;
                }
            });
            for (count = 0; count < predecessors.length; count++) {
                var predecessor = predecessors[count];
                parentGanttRecord = this.parent.connectorLineModule.getRecordByID(predecessor.from);
                record = this.parent.connectorLineModule.getRecordByID(predecessor.to);
                if (this.parent.allowParentDependency && this.parent.isLoad && this.parentPredecessors.indexOf(ganttRecord) == -1
                    && (ganttRecord.hasChildRecords || record.hasChildRecords)) {
                    this.parentPredecessors.push(ganttRecord);
                }
                if (record.ganttProperties.isAutoSchedule || this.parent.validateManualTasksOnLinking) {
                    this.validateChildGanttRecord(parentGanttRecord, record);
                }
            }
        }
    };
    /**
     * Method to validate task with predecessor
     *
     * @param {IGanttData} parentGanttRecord .
     * @param {IGanttData} childGanttRecord .
     * @returns {void} .
     */
    Dependency.prototype.validateChildGanttRecord = function (parentGanttRecord, childGanttRecord) {
        if (this.parent.editedTaskBarItem === childGanttRecord || isNullOrUndefined(isScheduledTask(parentGanttRecord.ganttProperties))
            || isNullOrUndefined(isScheduledTask(childGanttRecord.ganttProperties))) {
            return;
        }
        if (this.parent.isInPredecessorValidation && (childGanttRecord.ganttProperties.isAutoSchedule ||
            this.parent.validateManualTasksOnLinking)) {
            var childRecordProperty = childGanttRecord.ganttProperties;
            var currentTaskId_2 = this.parent.viewType === 'ResourceView' ? childRecordProperty.taskId.toString()
                : childRecordProperty.rowUniqueID.toString();
            var predecessorsCollection = childRecordProperty.predecessor;
            var childPredecessor = predecessorsCollection.filter(function (data) {
                if (data.to === currentTaskId_2) {
                    return data;
                }
                else {
                    return null;
                }
            });
            var startDate = this.getPredecessorDate(childGanttRecord, childPredecessor);
            this.parent.setRecordValue('startDate', startDate, childRecordProperty, true);
            this.parent.dataOperation.updateMappingData(childGanttRecord, 'startDate');
            var segments = childGanttRecord.ganttProperties.segments;
            if (isNullOrUndefined(segments)) {
                this.dateValidateModule.calculateEndDate(childGanttRecord);
            }
            this.parent.dataOperation.updateWidthLeft(childGanttRecord);
            if (!this.parent.isLoad && !this.parent.isFromOnPropertyChange && childGanttRecord.parentItem && this.parent.isInPredecessorValidation &&
                this.parent.getParentTask(childGanttRecord.parentItem).ganttProperties.isAutoSchedule) {
                if (this.parentIds.indexOf(childGanttRecord.parentItem.uniqueID) === -1) {
                    this.parentIds.push(childGanttRecord.parentItem.uniqueID);
                    this.parentRecord.push(childGanttRecord.parentItem);
                }
            }
        }
    };
    /**
     *
     * @param {IGanttData} ganttRecord .
     * @param {IPredecessor[]} predecessorsCollection .
     * @returns {Date} .
     * @private
     */
    Dependency.prototype.getPredecessorDate = function (ganttRecord, predecessorsCollection) {
        var _this = this;
        var maxStartDate;
        var tempStartDate;
        var parentGanttRecord;
        var childGanttRecord;
        var validatedPredecessor = predecessorsCollection.filter(function (data) {
            var id = _this.parent.viewType === 'ResourceView' ? ganttRecord.ganttProperties.taskId
                : ganttRecord.ganttProperties.rowUniqueID;
            if (data.to === id.toString()) {
                return data;
            }
            else {
                return null;
            }
        });
        if (validatedPredecessor) {
            var length_2 = validatedPredecessor.length;
            for (var i = 0; i < length_2; i++) {
                var predecessor = validatedPredecessor[i];
                parentGanttRecord = this.parent.connectorLineModule.getRecordByID(predecessor.from);
                childGanttRecord = this.parent.connectorLineModule.getRecordByID(predecessor.to);
                tempStartDate =
                    this.getValidatedStartDate(childGanttRecord.ganttProperties, parentGanttRecord.ganttProperties, predecessor);
                if (maxStartDate == null || this.dateValidateModule.compareDates(tempStartDate, maxStartDate) === 1) {
                    maxStartDate = tempStartDate;
                }
            }
        }
        return maxStartDate;
    };
    /**
     * Get validated start date as per predecessor type
     *
     * @param {ITaskData} ganttProperty .
     * @param {ITaskData} parentRecordProperty .
     * @param {IPredecessor} predecessor .
     * @returns {Date} .
     */
    Dependency.prototype.getValidatedStartDate = function (ganttProperty, parentRecordProperty, predecessor) {
        var type = predecessor.type;
        var offset = predecessor.offset;
        var tempDate;
        var returnStartDate;
        switch (type) {
            case 'FS':
                tempDate = this.dateValidateModule.getValidEndDate(parentRecordProperty);
                if (!ganttProperty.isMilestone || offset !== 0) {
                    tempDate = this.dateValidateModule.checkStartDate(tempDate, ganttProperty);
                }
                if (offset !== 0) {
                    tempDate = this.updateDateByOffset(tempDate, predecessor, ganttProperty);
                }
                if (!ganttProperty.isMilestone) {
                    returnStartDate = this.dateValidateModule.checkStartDate(tempDate, ganttProperty);
                }
                else {
                    returnStartDate = tempDate;
                }
                break;
            case 'FF':
            case 'SF':
                tempDate = type === 'FF' ? this.dateValidateModule.getValidEndDate(parentRecordProperty) :
                    this.dateValidateModule.getValidStartDate(parentRecordProperty);
                if (offset !== 0) {
                    tempDate = this.updateDateByOffset(tempDate, predecessor, ganttProperty);
                }
                if (!ganttProperty.isMilestone) {
                    tempDate = this.dateValidateModule.checkEndDate(tempDate, ganttProperty);
                }
                returnStartDate = this.dateValidateModule.getStartDate(tempDate, ganttProperty.duration, ganttProperty.durationUnit, ganttProperty);
                break;
            case 'SS':
                tempDate = this.dateValidateModule.getValidStartDate(parentRecordProperty);
                if (offset !== 0) {
                    tempDate = this.updateDateByOffset(tempDate, predecessor, ganttProperty);
                }
                if (!ganttProperty.isMilestone) {
                    returnStartDate = this.dateValidateModule.checkStartDate(tempDate, ganttProperty);
                }
                else {
                    returnStartDate = tempDate;
                }
                break;
        }
        return returnStartDate;
    };
    /**
     *
     * @param {Date} date .
     * @param {IPredecessor} predecessor .
     * @param {ITaskData} record .
     * @returns {void} .
     */
    Dependency.prototype.updateDateByOffset = function (date, predecessor, record) {
        var resultDate;
        var offsetValue = predecessor.offset;
        var durationUnit = predecessor.offsetUnit;
        if (offsetValue < 0) {
            resultDate = this.dateValidateModule.getStartDate(this.dateValidateModule.checkEndDate(date, record), (offsetValue * -1), durationUnit, record, true);
        }
        else {
            resultDate = this.dateValidateModule.getEndDate(date, offsetValue, durationUnit, record, false);
            if (!record.isMilestone) {
                resultDate = this.dateValidateModule.checkStartDate(resultDate, record);
            }
        }
        return resultDate;
    };
    /**
     *
     * @param {IGanttData} records .
     * @returns {void} .
     * @private
     */
    Dependency.prototype.createConnectorLinesCollection = function (records) {
        var ganttRecords = records ? records : this.parent.currentViewData;
        var recordLength = ganttRecords.length;
        var count;
        var ganttRecord;
        var predecessorsCollection;
        this.parent.connectorLineModule.expandedRecords = this.parent.virtualScrollModule && this.parent.enableVirtualization ?
            this.parent.updatedRecords : this.parent.getExpandedRecords(this.parent.updatedRecords);
        for (count = 0; count < recordLength; count++) {
            ganttRecord = ganttRecords[count];
            predecessorsCollection = ganttRecord.ganttProperties.predecessor;
            if (predecessorsCollection) {
                this.addPredecessorsCollection(predecessorsCollection);
            }
        }
    };
    /**
     *
     * @param {object[]} predecessorsCollection .
     * @returns {void} .
     */
    Dependency.prototype.addPredecessorsCollection = function (predecessorsCollection) {
        var predecessorsLength;
        var predecessorCount;
        var predecessor;
        var parentGanttRecord;
        var childGanttRecord;
        if (predecessorsCollection) {
            predecessorsLength = predecessorsCollection.length;
            for (predecessorCount = 0; predecessorCount < predecessorsLength; predecessorCount++) {
                predecessor = predecessorsCollection[predecessorCount];
                var from = 'from';
                var to = 'to';
                parentGanttRecord = this.parent.connectorLineModule.getRecordByID(predecessor[from]);
                childGanttRecord = this.parent.connectorLineModule.getRecordByID(predecessor[to]);
                if (this.parent.connectorLineModule.expandedRecords &&
                    this.parent.connectorLineModule.expandedRecords.indexOf(parentGanttRecord) !== -1 &&
                    this.parent.connectorLineModule.expandedRecords.indexOf(childGanttRecord) !== -1) {
                    this.updateConnectorLineObject(parentGanttRecord, childGanttRecord, predecessor);
                }
            }
        }
    };
    /**
     * To refresh connector line object collections
     *
     * @param {IGanttData} parentGanttRecord .
     * @param {IGanttData} childGanttRecord .
     * @param {IPredecessor} predecessor .
     * @returns {void} .
     * @private
     */
    Dependency.prototype.updateConnectorLineObject = function (parentGanttRecord, childGanttRecord, predecessor) {
        var connectorObj = this.parent.connectorLineModule.createConnectorLineObject(parentGanttRecord, childGanttRecord, predecessor);
        if (connectorObj) {
            if (childGanttRecord.isCritical && parentGanttRecord.isCritical) {
                connectorObj.isCritical = true;
            }
            if ((this.parent.connectorLineIds.length > 0 && this.parent.connectorLineIds.indexOf(connectorObj.connectorLineId) === -1) ||
                this.parent.connectorLineIds.length === 0) {
                this.parent.updatedConnectorLineCollection.push(connectorObj);
                this.parent.connectorLineIds.push(connectorObj.connectorLineId);
            }
            else if (this.parent.connectorLineIds.indexOf(connectorObj.connectorLineId) !== -1) {
                var index = this.parent.connectorLineIds.indexOf(connectorObj.connectorLineId);
                this.parent.updatedConnectorLineCollection[index] = connectorObj;
            }
            predecessor.isDrawn = true;
        }
        return connectorObj;
    };
    /**
     *
     * @param {IGanttData} childGanttRecord .
     * @param {IPredecessor[]} previousValue .
     * @param {string} validationOn .
     * @returns {void} .
     * @private
     */
    Dependency.prototype.validatePredecessor = function (childGanttRecord, previousValue, validationOn) {
        if (!this.parent.isInPredecessorValidation) {
            return;
        }
        if (childGanttRecord.ganttProperties.predecessor) {
            var taskBarModule = this.parent.editModule.taskbarEditModule;
            var ganttProp = void 0;
            if (taskBarModule) {
                ganttProp = taskBarModule.taskBarEditRecord;
            }
            var predecessorsCollection = childGanttRecord.ganttProperties.predecessor;
            var parentGanttRecord = void 0;
            var record = null;
            var predecessor = void 0;
            var successor = void 0;
            var currentTaskId_3 = this.parent.viewType === 'ResourceView' ? childGanttRecord.ganttProperties.taskId.toString()
                : childGanttRecord.ganttProperties.rowUniqueID.toString();
            var predecessors = predecessorsCollection.filter(function (data) {
                if (data.to === currentTaskId_3) {
                    return data;
                }
                else {
                    return null;
                }
            });
            var successors = predecessorsCollection.filter(function (data) {
                if (data.from === currentTaskId_3) {
                    return data;
                }
                else {
                    return null;
                }
            });
            for (var count = 0; count < predecessors.length; count++) {
                predecessor = predecessors[count];
                parentGanttRecord = this.parent.connectorLineModule.getRecordByID(predecessor.from);
                record = this.parent.connectorLineModule.getRecordByID(predecessor.to);
                if (this.parent.isInPredecessorValidation && record.ganttProperties.isAutoSchedule) {
                    this.parent.isValidationEnabled = true;
                }
                else {
                    this.parent.isValidationEnabled = false;
                }
                var id = this.parent.viewType === 'ResourceView' ? childGanttRecord.ganttProperties.taskId
                    : childGanttRecord.ganttProperties.rowUniqueID;
                if ((id.toString() === predecessor.to
                    || id.toString() === predecessor.from)
                    && (!validationOn || validationOn === 'predecessor')) {
                    this.validateChildGanttRecord(parentGanttRecord, record);
                }
            }
            for (var count = 0; count < successors.length; count++) {
                successor = successors[count];
                parentGanttRecord = this.parent.connectorLineModule.getRecordByID(successor.from);
                record = this.parent.connectorLineModule.getRecordByID(successor.to);
                if (this.parent.isInPredecessorValidation && record.ganttProperties.isAutoSchedule) {
                    this.parent.isValidationEnabled = true;
                }
                else {
                    this.parent.isValidationEnabled = false;
                }
                if (validationOn !== 'predecessor' && this.parent.isValidationEnabled) {
                    this.validateChildGanttRecord(parentGanttRecord, record);
                }
                else if (!record.ganttProperties.isAutoSchedule && this.parent.UpdateOffsetOnTaskbarEdit) {
                    this.parent.connectorLineEditModule['calculateOffset'](record);
                }
                if (parentGanttRecord.expanded === false || record.expanded === false) {
                    if (record) {
                        this.validatePredecessor(record, undefined, 'successor');
                    }
                    continue;
                }
                if (record) {
                    this.validatePredecessor(record, undefined, 'successor');
                }
            }
            if (record && record.ganttProperties.taskId !== this.isValidatedParentTaskID && ganttProp) {
                var validUpdate = false;
                var predecessorNames = ganttProp.ganttProperties.predecessorsName ?
                    ganttProp.ganttProperties.predecessorsName.split(',').length : ganttProp.ganttProperties.predecessorsName;
                var predecessorLength = ganttProp.ganttProperties.predecessor ?
                    ganttProp.ganttProperties.predecessor.length : ganttProp.ganttProperties.predecessor;
                if ((predecessorLength && predecessorNames !== predecessorLength)) {
                    validUpdate = true;
                }
                else if (record.hasChildRecords && record.ganttProperties.predecessor.length > 0 && ganttProp.hasChildRecords && !ganttProp.ganttProperties.predecessor) {
                    validUpdate = true;
                }
                if ((taskBarModule.taskBarEditAction !== 'ParentDrag' && taskBarModule.taskBarEditAction !== 'ChildDrag')) {
                    if (!ganttProp.hasChildRecords && record.hasChildRecords) {
                        this.parent.editModule['updateChildItems'](record);
                        this.isValidatedParentTaskID = record.ganttProperties.taskId;
                    }
                }
                else if ((record.hasChildRecords && taskBarModule.taskBarEditAction == 'ChildDrag') ||
                    (validUpdate && taskBarModule.taskBarEditAction == 'ParentDrag')) {
                    this.parent.editModule['updateChildItems'](record);
                    this.isValidatedParentTaskID = record.ganttProperties.taskId;
                }
                if (!ganttProp.hasChildRecords) {
                    this.parent.dataOperation.updateParentItems(record, true);
                }
            }
            else if (record && record.hasChildRecords && !ganttProp) {
                this.parent.editModule['updateChildItems'](record);
            }
        }
    };
    /**
     * Method to get validate able predecessor alone from record
     *
     * @param {IGanttData} record .
     * @returns {IPredecessor[]} .
     * @private
     */
    Dependency.prototype.getValidPredecessor = function (record) {
        var _this = this;
        var validPredecessor = [];
        if (!isNullOrUndefined(record)) {
            var recPredecessor = record.ganttProperties.predecessor;
            if (recPredecessor && recPredecessor.length > 0) {
                validPredecessor = recPredecessor.filter(function (value) {
                    var id = _this.parent.viewType === 'ResourceView' ? record.ganttProperties.taskId
                        : record.ganttProperties.rowUniqueID;
                    return value.from !== id.toString();
                });
            }
        }
        return validPredecessor;
    };
    return Dependency;
}());
export { Dependency };
