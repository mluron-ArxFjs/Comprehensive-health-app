var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { createElement, isNullOrUndefined, extend, compile, getValue, setValue, SanitizeHtmlHelper, append } from '@syncfusion/ej2-base';
import { formatUnit, addClass } from '@syncfusion/ej2-base';
import { isScheduledTask } from '../base/utils';
import { DataManager, Query } from '@syncfusion/ej2-data';
import * as cls from '../base/css-constants';
import { DateProcessor } from '../base/date-processor';
/**
 * To render the chart rows in Gantt
 */
var ChartRows = /** @class */ (function (_super) {
    __extends(ChartRows, _super);
    function ChartRows(ganttObj) {
        var _this = _super.call(this, ganttObj) || this;
        _this.taskBarHeight = 0;
        _this.milestoneHeight = 0;
        _this.milesStoneRadius = 0;
        _this.baselineTop = 0;
        _this.baselineHeight = 8;
        _this.touchLeftConnectorpoint = '';
        _this.touchRightConnectorpoint = '';
        _this.dropSplit = false;
        _this.refreshedTr = [];
        _this.refreshedData = [];
        _this.isUpdated = true;
        _this.parent = ganttObj;
        _this.initPublicProp();
        _this.addEventListener();
        return _this;
    }
    /**
     * To initialize the public property.
     *
     * @returns {void}
     * @private
     */
    ChartRows.prototype.initPublicProp = function () {
        this.ganttChartTableBody = null;
    };
    ChartRows.prototype.addEventListener = function () {
        this.parent.on('renderPanels', this.createChartTable, this);
        this.parent.on('dataReady', this.initiateTemplates, this);
        this.parent.on('destroy', this.destroy, this);
    };
    ChartRows.prototype.refreshChartByTimeline = function () {
        this.taskTable.style.width = formatUnit(this.parent.timelineModule.totalTimelineWidth);
        var prevDate = getValue('prevProjectStartDate', this.parent.dataOperation);
        var isUpdated = false;
        if (prevDate) {
            isUpdated = prevDate.getTime() === this.parent.cloneProjectStartDate.getTime();
        }
        this.isUpdated = this.parent.isFromOnPropertyChange && isUpdated &&
            getValue('mutableData', this.parent.treeGrid.grid.contentModule) ? true : false;
        this.refreshGanttRows();
        this.isUpdated = true;
    };
    /**
     * To render chart rows.
     *
     * @returns {void}
     * @private
     */
    ChartRows.prototype.createChartTable = function () {
        this.taskTable = createElement('table', {
            className: cls.taskTable + ' ' + cls.zeroSpacing, id: 'GanttTaskTable' + this.parent.element.id,
            styles: 'position: absolute;width:' + this.parent.timelineModule.totalTimelineWidth + 'px;',
            attrs: { cellspacing: '0.25px' }
        });
        var colgroup = createElement('colgroup');
        var column = createElement('col', { styles: 'width:' + this.parent.timelineModule.totalTimelineWidth + 'px;' });
        colgroup.appendChild(column);
        this.taskTable.appendChild(colgroup);
        this.ganttChartTableBody = createElement('tbody', {
            id: this.parent.element.id + 'GanttTaskTableBody'
        });
        this.taskTable.appendChild(this.ganttChartTableBody);
        this.parent.ganttChartModule.chartBodyContent.appendChild(this.taskTable);
    };
    ChartRows.prototype.initiateTemplates = function () {
        this.taskTable.style.width = formatUnit(this.parent.timelineModule.totalTimelineWidth);
        this.initChartHelperPrivateVariable();
        this.initializeChartTemplate();
    };
    /**
     * To render chart rows.
     *
     * @returns {void}
     * @private
     */
    ChartRows.prototype.renderChartRows = function () {
        this.createTaskbarTemplate();
        this.parent.isGanttChartRendered = true;
    };
    /**
     * To get gantt Indicator.
     *
     * @param {IIndicator} indicator .
     * @returns {NodeList} .
     * @private
     */
    ChartRows.prototype.getIndicatorNode = function (indicator) {
        var templateString = '<label class="' + cls.label + ' ' + cls.taskIndicatorDiv + '"style="line-height:'
            + (this.parent.rowHeight) + 'px;' +
            (this.parent.enableRtl ? 'right:' : 'left:') + this.getIndicatorleft(indicator.date) + 'px;"><i class="' + indicator.iconClass + '"></i> </label>';
        return this.createDivElement(templateString);
    };
    /**
     * To get gantt Indicator.
     *
     * @param {Date | string} date .
     * @returns {number} .
     * @private
     */
    ChartRows.prototype.getIndicatorleft = function (date) {
        date = this.parent.dateValidationModule.getDateFromFormat(date);
        var left = this.parent.dataOperation.getTaskLeft(date, false);
        return left;
    };
    /**
     * To get child taskbar Node.
     *
     *  @param {number} i .
     * @param {NodeList} rootElement .
     * @returns {NodeList} .
     * @private
     */
    ChartRows.prototype.getChildTaskbarNode = function (i, rootElement) {
        var childTaskbarNode = null;
        var data = this.templateData;
        var direction;
        if (this.parent.enableRtl) {
            direction = 'right:';
        }
        else {
            direction = 'left:';
        }
        if (this.childTaskbarTemplateFunction) {
            childTaskbarNode = this.childTaskbarTemplateFunction(extend({ index: i }, data), this.parent, 'TaskbarTemplate', this.getTemplateID('TaskbarTemplate'), false, undefined, rootElement[0], this.parent.treeGrid['root']);
        }
        else {
            var labelString = '';
            var taskLabel = '';
            var taskbarInnerDiv = void 0;
            var progressDiv = void 0;
            if (data.ganttProperties.startDate && data.ganttProperties.endDate
                && data.ganttProperties.duration) {
                taskbarInnerDiv = this.createDivElement('<div class="' + cls.childTaskBarInnerDiv + ' ' + cls.traceChildTaskBar +
                    ' ' + (data.ganttProperties.isAutoSchedule ? '' : cls.manualChildTaskBar) + '"' +
                    'style="width:' + data.ganttProperties.width + 'px;height:' +
                    (this.taskBarHeight) + 'px; margin-top :-1px"></div>');
                progressDiv = this.createDivElement('<div class="' + cls.childProgressBarInnerDiv + ' ' +
                    cls.traceChildProgressBar + ' ' + (data.ganttProperties.isAutoSchedule ?
                    '' : cls.manualChildProgressBar) + '"' +
                    ' style="border-style:' + (data.ganttProperties.progressWidth ? 'solid;' : 'none;') +
                    'width:' + data.ganttProperties.progressWidth + 'px;height:100%;' +
                    'border-top-right-radius:' + this.getBorderRadius(data.ganttProperties) + 'px;' +
                    'border-bottom-right-radius:' + this.getBorderRadius(data.ganttProperties) + 'px;">' +
                    '</div>');
            }
            var tempDiv = createElement('div');
            if (this.taskLabelTemplateFunction && !isNullOrUndefined(progressDiv) && progressDiv.length > 0) {
                var taskLabelTemplateNode = this.taskLabelTemplateFunction(extend({ index: i }, data), this.parent, 'TaskLabelTemplate', this.getTemplateID('TaskLabelTemplate'), false, undefined, progressDiv[0]);
                if (taskLabelTemplateNode && taskLabelTemplateNode.length > 0) {
                    append(taskLabelTemplateNode, tempDiv);
                    labelString = tempDiv.innerHTML;
                }
            }
            else {
                var field = this.parent.labelSettings.taskLabel;
                labelString = this.getTaskLabel(field);
                labelString = labelString === 'isCustomTemplate' ? this.parent.labelSettings.taskLabel : labelString;
                if (this.parent.enableHtmlSanitizer && typeof (labelString) === 'string') {
                    labelString = SanitizeHtmlHelper.sanitize(labelString);
                }
            }
            if (labelString.indexOf('null') === -1) {
                if (this.getTaskLabel(this.parent.labelSettings.taskLabel) === 'isCustomTemplate' &&
                    !this.isTemplate(this.parent.labelSettings.taskLabel)) {
                    labelString = '';
                }
                if (isNaN(parseInt(labelString))) {
                    taskLabel = '<span class="' + cls.taskLabel + '" style="line-height:' +
                        (this.taskBarHeight - 1) + 'px; text-align:' + (this.parent.enableRtl ? 'right;' : 'left;') +
                        'display:' + 'inline-block;' +
                        'width:' + (data.ganttProperties.width - 10) + 'px; height:' +
                        this.taskBarHeight + 'px;"></span>';
                }
                else {
                    taskLabel = '<span class="' + cls.taskLabel + '" style="line-height:' +
                        (this.taskBarHeight - 1) + 'px;' + (this.parent.viewType === 'ResourceView' ? ('text-align:' +
                        (this.parent.enableRtl ? 'right;' : 'left;')) : '') +
                        +(this.parent.viewType === 'ResourceView' ? 'display:inline-flex;' : '') +
                        +(this.parent.viewType === 'ResourceView' ? (data.ganttProperties.width - 10) : '') + 'px; height:' +
                        this.taskBarHeight + 'px;"></span>';
                }
            }
            var template = !isNullOrUndefined(data.ganttProperties.segments) && data.ganttProperties.segments.length > 0 ?
                this.splitTaskbar(data, labelString) : (data.ganttProperties.startDate && data.ganttProperties.endDate
                && data.ganttProperties.duration) ? (taskLabel) :
                (data.ganttProperties.startDate && !data.ganttProperties.endDate && !data.ganttProperties.duration) ? ('<div class="' + cls.childProgressBarInnerDiv + ' ' + cls.traceChildTaskBar + ' ' +
                    cls.unscheduledTaskbarLeft + ' ' + (data.ganttProperties.isAutoSchedule ?
                    '' : cls.manualChildTaskBar) + '"' +
                    'style="' + direction + data.ganttProperties.left + 'px; height:' + this.taskBarHeight + 'px;"></div>') :
                    (data.ganttProperties.endDate && !data.ganttProperties.startDate && !data.ganttProperties.duration) ?
                        ('<div class="' + cls.childProgressBarInnerDiv + ' ' + cls.traceChildTaskBar + ' ' +
                            cls.unscheduledTaskbarRight + ' ' + (data.ganttProperties.isAutoSchedule ?
                            '' : cls.manualChildTaskBar) + '"' +
                            'style="' + direction + data.ganttProperties.left + 'px; height:' + this.taskBarHeight + 'px;"></div>') :
                        (data.ganttProperties.duration && !data.ganttProperties.startDate && !data.ganttProperties.endDate) ?
                            ('<div class="' + cls.childProgressBarInnerDiv + ' ' + cls.traceChildTaskBar + ' ' +
                                cls.unscheduledTaskbar + ' ' + (data.ganttProperties.isAutoSchedule ?
                                '' : cls.manualChildTaskBar) + '"' +
                                'style="' + direction + data.ganttProperties.left + 'px; width:' + data.ganttProperties.width + 'px;' +
                                ' height:' + this.taskBarHeight + 'px;"></div>') : '';
            if (data.ganttProperties.startDate && data.ganttProperties.endDate && data.ganttProperties.duration &&
                (isNullOrUndefined(data.ganttProperties.segments) || (!isNullOrUndefined(data.ganttProperties.segments) &&
                    data.ganttProperties.segments.length === 0))) {
                if (template !== '' && !isNullOrUndefined(progressDiv) && progressDiv.length > 0) {
                    var templateElement = this.createDivElement(template)[0];
                    if (this.parent.disableHtmlEncode) {
                        templateElement.innerText = labelString;
                    }
                    else {
                        templateElement.innerHTML = labelString;
                    }
                    var childLabel = this.parent.labelSettings.taskLabel;
                    if (childLabel && childLabel['elementRef'])
                        templateElement.appendChild(tempDiv);
                    progressDiv[0].appendChild(templateElement);
                    if (progressDiv[0].querySelectorAll('.e-task-label')[0].textContent !== '' &&
                        !this.isTemplate(childLabel) &&
                        progressDiv[0].querySelectorAll('.e-task-label')[0].children[0])
                        progressDiv[0].querySelectorAll('.e-task-label')[0].children[0].remove();
                    if (progressDiv[0].querySelectorAll('.e-task-label')[0].textContent === '' &&
                        childLabel && !childLabel['elementRef'] && tempDiv.innerHTML !== '')
                        progressDiv[0].querySelectorAll('.e-task-label')[0].textContent = childLabel;
                }
                if (!isNullOrUndefined(taskbarInnerDiv) && taskbarInnerDiv.length > 0) {
                    taskbarInnerDiv[0].appendChild([].slice.call(progressDiv)[0]);
                }
                childTaskbarNode = taskbarInnerDiv;
            }
            else {
                childTaskbarNode = this.createDivElement(template);
            }
        }
        if (this.parent.enableRtl && !isNullOrUndefined(childTaskbarNode) && childTaskbarNode[0] && childTaskbarNode[0].querySelector('.e-task-label')) {
            childTaskbarNode[0].querySelector('.e-task-label').style.marginLeft = '15px';
            childTaskbarNode[0].querySelector('.e-task-label').style.marginRight = '8px';
            if (childTaskbarNode[0].querySelector('.e-gantt-child-progressbar')) {
                childTaskbarNode[0].querySelector('.e-gantt-child-progressbar').style.textAlign = 'left';
            }
        }
        return childTaskbarNode;
    };
    ChartRows.prototype.splitTaskbar = function (data, labelString) {
        var splitTasks = '';
        for (var i = 0; i < data.ganttProperties.segments.length; i++) {
            var segment = data.ganttProperties.segments[i];
            var progressBarVisible = void 0;
            if (!segment.showProgress) {
                progressBarVisible = 'hidden';
            }
            else {
                progressBarVisible = 'initial';
            }
            var segmentPosition = (i === 0) ? 'e-segment-first' : (i === data.ganttProperties.segments.length - 1)
                ? 'e-segment-last' : 'e-segment-inprogress';
            splitTasks += (
            //split taskbar
            '<div class="' + cls.childTaskBarInnerDiv + ' ' + segmentPosition + ' ' + cls.traceChildTaskBar + ' ' +
                ' e-segmented-taskbar' +
                '"style="width:' + segment.width + 'px;position: absolute;' + (this.parent.enableRtl ? 'right:' : 'left:') + segment.left + 'px;height:' +
                (this.taskBarHeight) + 'px; overflow:' + progressBarVisible + ';" data-segment-index = "' + i + '" aria-label = "' +
                this.generateSpiltTaskAriaLabel(segment, data.ganttProperties) + '"> ' +
                this.getSplitTaskbarLeftResizerNode() +
                //split progress bar
                '<div class="' + cls.childProgressBarInnerDiv + ' ' + cls.traceChildProgressBar + ' ' +
                '" style="border-style:' + (segment.progressWidth ? 'solid;' : 'none;') +
                'display:' + (segment.progressWidth >= 0 ? 'block;' : 'none;') +
                'width:' + segment.progressWidth + 'px;height:100%;' + 'text-align:' + (this.parent.enableRtl ? 'left;' : 'right;') +
                'border-top-right-radius:' + this.getSplitTaskBorderRadius(segment) + 'px;' +
                'border-bottom-right-radius:' + this.getSplitTaskBorderRadius(segment) + 'px;">' +
                // progress label
                '<span class="' + cls.taskLabel + '" style="line-height:' +
                (this.taskBarHeight - 1) + 'px;display:' + (segment.showProgress ? 'inline;' : 'none;') +
                'height:' + this.taskBarHeight + 'px;">' + labelString + '</span>' +
                '</div>' +
                this.getSplitTaskbarRightResizerNode(segment) +
                (segment.showProgress ? this.getSplitProgressResizerNode(segment) : '') +
                '</div></div>');
        }
        return splitTasks;
    };
    ChartRows.prototype.getSplitTaskbarLeftResizerNode = function () {
        var lResizerLeft = -(this.parent.isAdaptive ? 12 : 2);
        var template = '<div class="' + cls.taskBarLeftResizer + ' ' + cls.icon + '"' +
            ' style="' + (this.parent.enableRtl ? 'right:' : 'left:') + lResizerLeft + 'px;height:' + (this.taskBarHeight) + 'px;"></div>';
        return template;
    };
    ChartRows.prototype.getSplitTaskbarRightResizerNode = function (segment) {
        var rResizerLeft = this.parent.isAdaptive ? -2 : -10;
        var template = '<div class="' + cls.taskBarRightResizer + ' ' + cls.icon + '"' +
            ' style="' + (this.parent.enableRtl ? 'right:' : 'left:') + (segment.width + rResizerLeft) + 'px;' +
            'height:' + (this.taskBarHeight) + 'px;"></div>';
        return template;
    };
    ChartRows.prototype.getSplitProgressResizerNode = function (segment) {
        var width = this.parent.enableRtl ? (segment.progressWidth + 8) : (segment.progressWidth - 6);
        var template = '<div class="' + cls.childProgressResizer + '"' +
            ' style="' + (this.parent.enableRtl ? 'right:' : 'left:') + width + 'px;margin-top:' +
            (this.taskBarHeight - 4) + 'px;"><div class="' + cls.progressBarHandler + '"' +
            '><div class="' + cls.progressHandlerElement + '"></div>' +
            '<div class="' + cls.progressBarHandlerAfter + '"></div></div>';
        return template;
    };
    ChartRows.prototype.getSegmentIndex = function (splitStartDate, record) {
        var segmentIndex = -1;
        var ganttProp = record.ganttProperties;
        var segments = ganttProp.segments;
        if (!isNullOrUndefined(segments)) {
            segments.sort(function (a, b) {
                return a.startDate.getTime() - b.startDate.getTime();
            });
            var length_1 = segments.length;
            for (var i = 0; i < length_1; i++) {
                var segment = segments[i];
                // To find if user tend to split the start date of a main taskbar
                // purpose of this to restrict the split action
                if (splitStartDate.getTime() === ganttProp.startDate.getTime()) {
                    this.dropSplit = true;
                    segmentIndex = 0;
                    // To find the if user tend to split the first date of already segmented task.
                    // purpose of this to move on day of a segment
                }
                else if (splitStartDate.getTime() === segment.startDate.getTime()) {
                    this.dropSplit = true;
                    var sDate = segment.startDate;
                    sDate.setDate(sDate.getDate() + 1);
                    sDate = segment.startDate = this.parent.dataOperation.checkStartDate(sDate, ganttProp, false);
                    segment.startDate = sDate;
                    var eDate = segment.endDate;
                    eDate = this.parent.dataOperation.getEndDate(sDate, segment.duration, ganttProp.durationUnit, ganttProp, false);
                    segment.endDate = eDate;
                    if (i === segments.length - 1) {
                        this.parent.setRecordValue('endDate', eDate, ganttProp, true);
                    }
                    this.incrementSegments(segments, i, record);
                    segmentIndex = segment.segmentIndex;
                    // To find if the user tend to split the segment and find the segment index
                }
                else {
                    segment.endDate = this.parent.dataOperation.getEndDate(segment.startDate, segment.duration, ganttProp.durationUnit, ganttProp, false);
                    if (splitStartDate.getTime() >= segment.startDate.getTime() && splitStartDate.getTime() <= segment.endDate.getTime()) {
                        segmentIndex = segment.segmentIndex;
                    }
                }
                this.parent.setRecordValue('segments', ganttProp.segments, ganttProp, true);
            }
        }
        if (segmentIndex === -1) {
            this.dropSplit = true;
        }
        return segmentIndex;
    };
    ChartRows.prototype.mergeTask = function (taskId, segmentIndexes) {
        var mergeArrayLength = segmentIndexes.length;
        var taskFields = this.parent.taskFields;
        var mergeData = this.parent.flatData.filter(function (x) {
            if (x[taskFields.id] === taskId) {
                return x;
            }
            else {
                return null;
            }
        })[0];
        var segments = mergeData.ganttProperties.segments;
        segmentIndexes = segmentIndexes.sort(function (a, b) {
            return b.firstSegmentIndex - a.firstSegmentIndex;
        });
        for (var arrayLength = 0; arrayLength < mergeArrayLength; arrayLength++) {
            var firstSegment = segments[segmentIndexes[arrayLength].firstSegmentIndex];
            var secondSegment = segments[segmentIndexes[arrayLength].secondSegmentIndex];
            var duration = firstSegment.duration + secondSegment.duration;
            var endDate = this.parent.dataOperation.getEndDate(firstSegment.startDate, duration, mergeData.ganttProperties.durationUnit, mergeData.ganttProperties, false);
            var segment = {
                startDate: firstSegment.startDate,
                endDate: endDate,
                duration: duration
            };
            var insertIndex = segmentIndexes[arrayLength].firstSegmentIndex;
            segments.splice(insertIndex, 2, segment);
            this.parent.setRecordValue('segments', segments, mergeData.ganttProperties, true);
            this.parent.dataOperation.updateMappingData(mergeData, 'segments');
            if (segments.length === 1) {
                this.parent.setRecordValue('endDate', endDate, mergeData.ganttProperties, true);
                this.parent.setRecordValue('EndDate', endDate, mergeData, true);
                this.parent.setRecordValue('segments', null, mergeData.ganttProperties, true);
                this.parent.dataOperation.updateMappingData(mergeData, 'segments');
            }
            else if (mergeData.ganttProperties.endDate !== segments[segments.length - 1].endDate) {
                this.parent.setRecordValue('endDate', segments[segments.length - 1].endDate, mergeData.ganttProperties, true);
            }
        }
        this.refreshChartAfterSegment(mergeData, 'mergeSegment');
    };
    ChartRows.prototype.refreshChartAfterSegment = function (data, requestType) {
        this.parent.setRecordValue('segments', this.parent.dataOperation.setSegmentsInfo(data, false), data.ganttProperties, true);
        this.parent.dataOperation.updateMappingData(data, 'segments');
        this.parent.dataOperation.updateWidthLeft(data);
        if (this.parent.predecessorModule && this.parent.taskFields.dependency) {
            this.parent.predecessorModule.updatedRecordsDateByPredecessor();
            this.parent.connectorLineModule.removePreviousConnectorLines(this.parent.flatData);
            this.parent.connectorLineEditModule.refreshEditedRecordConnectorLine(this.parent.flatData);
            if (data.parentItem && this.parent.getParentTask(data.parentItem).ganttProperties.isAutoSchedule
                && this.parent.isInPredecessorValidation) {
                this.parent.dataOperation.updateParentItems(data.parentItem);
            }
            this.refreshRecords(this.parent.currentViewData);
        }
        else {
            this.refreshRow(this.parent.currentViewData.indexOf(data));
        }
        var tr = this.ganttChartTableBody.querySelectorAll('tr')[this.parent.currentViewData.indexOf(data)];
        var args = {
            requestType: requestType,
            rowData: data
        };
        this.triggerQueryTaskbarInfoByIndex(tr, data);
        this.parent.selectionModule.clearSelection();
        var segments = args.rowData.taskData[this.parent.taskFields.segments];
        if (this.parent.timezone && segments != null) {
            for (var i = 0; i < segments.length; i++) {
                segments[i][this.parent.taskFields.startDate] = this.parent.dateValidationModule.remove(args.rowData.ganttProperties.segments[i].startDate, this.parent.timezone);
                if (this.parent.taskFields.endDate) {
                    segments[i][this.parent.taskFields.endDate] = this.parent.dateValidationModule.remove(args.rowData.ganttProperties.segments[i].endDate, this.parent.timezone);
                }
            }
        }
        this.parent.trigger('actionComplete', args);
        if (!isNullOrUndefined(this.parent.loadingIndicator) && this.parent.loadingIndicator.indicatorType === "Shimmer") {
            this.parent.hideMaskRow();
        }
        else {
            this.parent.hideSpinner();
        }
        setValue('isEdit', false, this.parent.contextMenuModule);
        setValue('isEdit', false, this.parent);
    };
    /**
     * public method to split task bar.
     *
     * @public
     */
    ChartRows.prototype.splitTask = function (taskId, splitDates) {
        var taskFields = this.parent.taskFields;
        var splitDate = splitDates;
        var splitRecord = this.parent.flatData.filter(function (x) {
            if (x[taskFields.id] === taskId) {
                return x;
            }
            else {
                return null;
            }
        })[0];
        var ganttProp = splitRecord.ganttProperties;
        this.dropSplit = false;
        var segmentIndex = -1;
        var segments = ganttProp.segments;
        if (isNullOrUndefined(splitDates.length) || splitDates.length < 0) {
            var splitStartDate = this.parent.dataOperation.checkStartDate(splitDate, ganttProp, false);
            if (splitStartDate.getTime() !== ganttProp.startDate.getTime()) {
                if (ganttProp.isAutoSchedule) {
                    if (!isNullOrUndefined(segments) && segments.length > 0) {
                        segmentIndex = this.getSegmentIndex(splitStartDate, splitRecord);
                    }
                    //check atleast one day difference is there to split
                    if (this.dropSplit === false && splitDate.getTime() > ganttProp.startDate.getTime() &&
                        splitDate.getTime() < ganttProp.endDate.getTime()) {
                        segments = segmentIndex !== -1 ? segments : [];
                        var startDate = segmentIndex !== -1 ?
                            segments[segmentIndex].startDate : new Date(ganttProp.startDate.getTime());
                        var endDate = segmentIndex !== -1 ? segments[segmentIndex].endDate : new Date(ganttProp.endDate.getTime());
                        var segmentDuration = this.parent.dataOperation.getDuration(startDate, endDate, ganttProp.durationUnit, ganttProp.isAutoSchedule, ganttProp.isMilestone);
                        this.parent.setRecordValue('segments', this.splitSegmentedTaskbar(startDate, endDate, splitDate, segmentIndex, segments, splitRecord, segmentDuration), ganttProp, true);
                        if (segmentIndex !== -1) {
                            this.incrementSegments(segments, segmentIndex + 1, splitRecord);
                        }
                        this.parent.setRecordValue('endDate', segments[segments.length - 1].endDate, ganttProp, true);
                        if (this.parent.taskFields.endDate) {
                            this.parent.dataOperation.updateMappingData(splitRecord, 'endDate');
                        }
                    }
                    this.refreshChartAfterSegment(splitRecord, 'splitTaskbar');
                }
            }
        }
        else {
            splitDates.sort(function (a, b) {
                return a.getTime() - b.getTime();
            });
            this.parent.setRecordValue('segments', this.constructSegments(splitDates, splitRecord.ganttProperties), splitRecord.ganttProperties, true);
            this.refreshChartAfterSegment(splitRecord, 'splitTask');
        }
    };
    ChartRows.prototype.constructSegments = function (dates, taskData) {
        var segmentsArray = [];
        var segment;
        var startDate = new Date();
        var endDate;
        var duration;
        for (var i = 0; i < dates.length + 1; i++) {
            startDate = i === 0 ? taskData.startDate : startDate;
            startDate = this.parent.dataOperation.checkStartDate(startDate, taskData, false);
            endDate = i !== dates.length ? new Date(dates[i].getTime()) > taskData.endDate ? taskData.endDate
                : new Date(dates[i].getTime()) : taskData.endDate;
            endDate = this.parent.dataOperation.checkEndDate(endDate, taskData, false);
            duration = this.parent.dataOperation.getDuration(startDate, endDate, taskData.durationUnit, taskData.isAutoSchedule, taskData.isMilestone);
            if (endDate.getTime() >= startDate.getTime()) {
                segment = {
                    startDate: startDate,
                    endDate: endDate,
                    duration: duration
                };
                segmentsArray.push(segment);
            }
            if (i === dates.length) {
                break;
            }
            startDate = new Date(dates[i].getTime());
            startDate.setDate(dates[i].getDate() + 1);
        }
        return segmentsArray;
    };
    ChartRows.prototype.splitSegmentedTaskbar = function (startDate, endDate, splitDate, segmentIndex, segments, ganttData, segmentDuration) {
        var ganttProp = ganttData.ganttProperties;
        var checkClickState = this.parent.nonWorkingDayIndex.indexOf(splitDate.getDay());
        var increment = checkClickState === -1 ? 0 : checkClickState === 0 ? 1 : 2;
        startDate = this.parent.dataOperation.checkStartDate(startDate, ganttProp, false);
        var segmentEndDate = new Date(splitDate.getTime());
        segmentEndDate = this.parent.dataOperation.checkEndDate(segmentEndDate, ganttProp, false);
        for (var i = 0; i < 2; i++) {
            var segment = {
                startDate: startDate,
                endDate: segmentEndDate,
                duration: this.parent.dataOperation.getDuration(startDate, segmentEndDate, ganttProp.durationUnit, ganttProp.isAutoSchedule, ganttProp.isMilestone),
                offsetDuration: 1
            };
            var endDateState = this.parent.nonWorkingDayIndex.indexOf(segmentEndDate.getDay());
            if (segmentIndex !== -1) {
                segments.splice(segmentIndex, 1);
                segmentIndex = -1;
            }
            segments.push(segment);
            var mode = this.parent.timelineModule.customTimelineSettings.bottomTier.unit;
            if (mode === 'Hour' || mode === 'Minutes') {
                startDate = new Date(splitDate.getTime());
                startDate = this.parent.dataOperation.checkStartDate(startDate, ganttProp, false);
                var count = this.parent.timelineModule.customTimelineSettings.bottomTier.count;
                var mode_1 = this.parent.timelineModule.customTimelineSettings.bottomTier.unit;
                var timeIncrement = this.parent.timelineModule.getIncrement(startDate, count, mode_1);
                var newTime = startDate.getTime() + timeIncrement;
                startDate.setTime(newTime + increment);
                segmentEndDate = new Date(endDate.getTime());
                timeIncrement = this.parent.timelineModule.getIncrement(segmentEndDate, count, mode_1);
                newTime = segmentEndDate.getTime() + timeIncrement;
                segmentEndDate.setTime(newTime + increment);
            }
            else {
                startDate = new Date(splitDate.getTime());
                startDate.setDate(startDate.getDate() + 1 + increment);
                this.setTime(this.parent.defaultStartTime, startDate);
                startDate = this.parent.dataOperation.checkStartDate(startDate, ganttProp, false);
                segmentEndDate = new Date(endDate.getTime());
                segmentEndDate.setDate(segmentEndDate.getDate() + 1);
            }
            if (endDateState !== -1) {
                var diff = segmentDuration - segment.duration;
                segmentEndDate =
                    this.parent.dataOperation.getEndDate(startDate, diff, ganttProp.durationUnit, ganttProp, false);
            }
            else {
                segmentEndDate = this.parent.dataOperation.checkEndDate(segmentEndDate, ganttProp, false);
            }
        }
        segments.sort(function (a, b) {
            return a.startDate.getTime() - b.startDate.getTime();
        });
        return segments;
    };
    ChartRows.prototype.incrementSegments = function (segments, segmentIndex, ganttData) {
        var ganttProp = ganttData.ganttProperties;
        for (var i = segmentIndex + 1; i < segments.length; i++) {
            var segment = segments[i];
            var startDate = i !== 0 ? new Date(segments[i - 1].endDate.getTime()) : new Date(segment.startDate.getTime());
            startDate = this.parent.dataOperation.getEndDate(startDate, segment.offsetDuration, ganttProp.durationUnit, ganttProp, false);
            startDate = this.parent.dataOperation.checkStartDate(startDate, ganttProp, false);
            segment.startDate = startDate;
            var endDate = segment.endDate = this.parent.dataOperation.getEndDate(startDate, segment.duration, ganttProp.durationUnit, ganttProp, false);
            segment.endDate = endDate;
            if (i === segments.length - 1) {
                this.parent.setRecordValue('endDate', endDate, ganttProp, true);
                if (this.parent.taskFields.endDate) {
                    this.parent.dataOperation.updateMappingData(ganttData, 'endDate');
                }
            }
        }
        segments.sort(function (a, b) {
            return a.startDate.getTime() - b.startDate.getTime();
        });
        this.parent.setRecordValue('segments', segments, ganttProp, true);
        this.parent.dataOperation.updateMappingData(ganttData, 'segments');
    };
    /**
     * To get milestone node.
     *
     * @param {number} i .
     * @param {NodeList} rootElement .
     * @returns {NodeList} .
     * @private
     */
    ChartRows.prototype.getMilestoneNode = function (i, rootElement) {
        var milestoneNode = null;
        var data = this.templateData;
        if (this.milestoneTemplateFunction) {
            milestoneNode = this.milestoneTemplateFunction(extend({ index: i }, data), this.parent, 'MilestoneTemplate', this.getTemplateID('MilestoneTemplate'), false, undefined, rootElement[0], this.parent.treeGrid['root']);
        }
        else {
            var template = '<div class="' + cls.traceMilestone + '" style="width:' + ((this.parent.renderBaseline ? this.taskBarHeight : this.taskBarHeight - 6)) + 'px;height:' +
                ((this.parent.renderBaseline ? this.taskBarHeight : this.taskBarHeight - 6)) + 'px;position:absolute;transform: rotate(45deg);top:' + (this.parent.rowHeight > 40 ? 0 : 1) + 'px;left:' + 1 + 'px;"> </div>';
            milestoneNode = this.createDivElement(template);
        }
        return milestoneNode;
    };
    /**
     * To get task baseline Node.
     *
     * @returns {NodeList} .
     * @private
     */
    ChartRows.prototype.getTaskBaselineNode = function () {
        var data = this.templateData;
        var template = '<div class="' + cls.baselineBar + ' ' + '" role="term" style="margin-top:' + this.baselineTop +
            'px;' + (this.parent.enableRtl ? 'right:' : 'left:') + data.ganttProperties.baselineLeft + 'px;' +
            'width:' + data.ganttProperties.baselineWidth + 'px;height:' +
            this.baselineHeight + 'px;' + (this.baselineColor ? 'background-color: ' + this.baselineColor + ';' : '') + '"></div>';
        return this.createDivElement(template);
    };
    /**
     * To get milestone baseline node.
     *
     * @returns {NodeList} .
     * @private
     */
    ChartRows.prototype.getMilestoneBaselineNode = function () {
        var data = this.templateData;
        var baselineMilestoneHeight = this.parent.renderBaseline ? 5 : 2;
        var template = '<div class="' + cls.baselineMilestoneContainer + '" style="width:' + ((this.parent.renderBaseline ? this.taskBarHeight : this.taskBarHeight - 10)) + 'px;height:' +
            ((this.parent.renderBaseline ? this.taskBarHeight : this.taskBarHeight - 10)) + 'px;position:absolute;transform:rotate(45deg);' + (this.parent.enableRtl ? 'right:' : 'left:') + (this.parent.enableRtl ? (data.ganttProperties.left -
            (this.milestoneHeight / 2) + 3) : (data.ganttProperties.left - (this.milestoneHeight / 2) + 1)) + 'px;' + (this.baselineColor ? 'background-color: ' + this.baselineColor + ';' : '') + 'margin-top:' + ((-Math.floor(this.parent.rowHeight - this.milestoneMarginTop) + baselineMilestoneHeight) + 2) + 'px"> </div>';
        return this.createDivElement(template);
    };
    /**
     * To get left label node.
     *
     * @param {number} i .
     * @returns {NodeList} .
     * @private
     */
    ChartRows.prototype.getLeftLabelNode = function (i) {
        var leftLabelNode = this.leftLabelContainer();
        if (this.generateTaskLabelAriaLabel('left') !== "") {
            leftLabelNode[0].setAttribute('aria-label', this.generateTaskLabelAriaLabel('left'));
        }
        var leftLabelTemplateNode = null;
        if (this.leftTaskLabelTemplateFunction) {
            leftLabelTemplateNode = this.leftTaskLabelTemplateFunction(extend({ index: i }, this.templateData), this.parent, 'LeftLabelTemplate', this.getTemplateID('LeftLabelTemplate'), false, undefined, leftLabelNode[0], this.parent.treeGrid['root']);
        }
        else {
            var field = this.parent.labelSettings.leftLabel;
            var labelString = this.getTaskLabel(field);
            if (labelString) {
                labelString = labelString === 'isCustomTemplate' ? field : labelString;
                leftLabelTemplateNode = this.getLableText(labelString, cls.leftLabelInnerDiv);
                if (this.parent.enableHtmlSanitizer && typeof (labelString) === 'string') {
                    labelString = SanitizeHtmlHelper.sanitize(labelString);
                    labelString = labelString === 'isCustomTemplate' ? field : labelString;
                    leftLabelTemplateNode = this.getLableText(labelString, cls.leftLabelInnerDiv);
                }
            }
        }
        if (leftLabelTemplateNode && leftLabelTemplateNode.length > 0) {
            if (leftLabelTemplateNode[0]['data'] === 'null') {
                leftLabelTemplateNode[0]['data'] = '';
            }
            append(leftLabelTemplateNode, leftLabelNode[0]);
        }
        if (this.parent.enableRtl) {
            leftLabelNode[0].style.paddingLeft = '25px';
            leftLabelNode[0].style.paddingRight = '0px';
        }
        return leftLabelNode;
    };
    ChartRows.prototype.getLableText = function (labelString, labelDiv) {
        var leftLabelHeight = this.parent.renderBaseline ? ((this.parent.rowHeight - this.taskBarHeight) / 2) : this.taskBarMarginTop;
        var templateString = createElement('div', {
            className: labelDiv, styles: 'height:' + (this.taskBarHeight) + 'px;' +
                'margin-top:' + leftLabelHeight + 'px;'
        });
        var spanElem = createElement('span', { className: cls.label });
        var property = this.parent.disableHtmlEncode ? 'textContent' : 'innerHTML';
        spanElem[property] = labelString;
        templateString.appendChild(spanElem);
        var div = createElement('div');
        div.appendChild(templateString);
        return div.childNodes;
    };
    /**
     * To get right label node.
     *
     * @param {number} i .
     * @returns {NodeList} .
     * @private
     */
    ChartRows.prototype.getRightLabelNode = function (i) {
        var rightLabelNode = this.rightLabelContainer();
        if (this.generateTaskLabelAriaLabel('right') !== "") {
            rightLabelNode[0].setAttribute('aria-label', this.generateTaskLabelAriaLabel('right'));
        }
        var rightLabelTemplateNode = null;
        if (this.rightTaskLabelTemplateFunction) {
            rightLabelTemplateNode = this.rightTaskLabelTemplateFunction(extend({ index: i }, this.templateData), this.parent, 'RightLabelTemplate', this.getTemplateID('RightLabelTemplate'), false, undefined, rightLabelNode[0], this.parent.treeGrid['root']);
        }
        else {
            var field = this.parent.labelSettings.rightLabel;
            var labelString = this.getTaskLabel(field);
            if (labelString) {
                labelString = labelString === 'isCustomTemplate' ? field : labelString;
                rightLabelTemplateNode = this.getLableText(labelString, cls.rightLabelInnerDiv);
                if (this.parent.enableHtmlSanitizer && typeof (labelString) === 'string') {
                    labelString = SanitizeHtmlHelper.sanitize(labelString);
                    labelString = labelString === 'isCustomTemplate' ? field : labelString;
                    rightLabelTemplateNode = this.getLableText(labelString, cls.rightLabelInnerDiv);
                }
            }
        }
        if (rightLabelTemplateNode && rightLabelTemplateNode.length > 0) {
            if (rightLabelTemplateNode[0]['data'] === 'null') {
                rightLabelTemplateNode[0]['data'] = '';
            }
            append(rightLabelTemplateNode, rightLabelNode[0]);
        }
        if (this.parent.enableRtl) {
            rightLabelNode[0].style.marginLeft = '0px';
            rightLabelNode[0].style.paddingRight = '25px';
        }
        return rightLabelNode;
    };
    ChartRows.prototype.getManualTaskbar = function () {
        var data = this.templateData;
        var taskbarHeight = (this.taskBarHeight / 2 - 1);
        var innerDiv = (data.ganttProperties.startDate && data.ganttProperties.endDate && data.ganttProperties.duration) ?
            ('<div class="' + cls.manualParentTaskBar + '" style="width:' + data.ganttProperties.width + 'px;' + 'height:' +
                taskbarHeight / 5 + 'px;border-left-width:' + taskbarHeight / 5 +
                'px; border-bottom:' + taskbarHeight / 5 + 'px solid transparent;"></div>') :
            (!data.ganttProperties.startDate && !data.ganttProperties.endDate && data.ganttProperties.duration) ?
                ('<div class="' + cls.manualParentTaskBar + ' ' + cls.traceManualUnscheduledTask +
                    '" style="width:' + data.ganttProperties.width + 'px;' + 'height:' +
                    (taskbarHeight / 5 + 1) + 'px;border-left-width:' + taskbarHeight / 5 +
                    'px; border-bottom:' + taskbarHeight / 5 + 'px solid transparent;"></div>') : ('<div class="' +
                cls.manualParentTaskBar + ' ' + (data.ganttProperties.startDate ? cls.unscheduledTaskbarLeft : cls.unscheduledTaskbarRight) +
                '" style="width:' + data.ganttProperties.width + 'px;' + 'height:' +
                taskbarHeight * 2 + 'px;border-left-width:' + taskbarHeight / 5 +
                'px; border-bottom:' + taskbarHeight / 5 + 'px solid transparent;"></div>');
        var template = '<div class="' + cls.manualParentMainContainer + '"' +
            'style=' + (this.parent.enableRtl ? 'right:' : 'left:') + (data.ganttProperties.left - data.ganttProperties.autoLeft) + 'px;' +
            'width:' + data.ganttProperties.width + 'px;' +
            'height:' + taskbarHeight + 'px;>' + innerDiv + ((data.ganttProperties.startDate && data.ganttProperties.endDate &&
            data.ganttProperties.duration) || data.ganttProperties.duration ? '<div class="e-gantt-manualparenttaskbar-left" style=' +
            (this.parent.enableRtl ? 'margin-right:0px;' : '') + '"height:' + ((taskbarHeight / 5) + 8) + 'px;border-left-width:' + taskbarHeight / 5 +
            'px; border-bottom:' + taskbarHeight / 5 + 'px solid transparent;"></div>' +
            '<div class="e-gantt-manualparenttaskbar-right" style=' + (this.parent.enableRtl ? 'margin-right:-8px;' : '') +
            (this.parent.enableRtl ? 'right:' : 'left:') + (data.ganttProperties.width - Math.floor(((taskbarHeight / 5) + 8) / 5)) + 'px;height:' +
            ((taskbarHeight / 5) + 8) + 'px;border-right-width:' + taskbarHeight / 5 + 'px;border-bottom:' +
            taskbarHeight / 5 + 'px solid transparent;>' + '</div></div>' : '');
        var milestoneTemplate = '<div class="' + cls.manualParentMilestone + '" style="width:' + ((this.parent.renderBaseline ? this.taskBarHeight - 3 : this.taskBarHeight - 7)) + 'px;height:' +
            ((this.parent.renderBaseline ? this.taskBarHeight - 3 : this.taskBarHeight - 7)) + 'px;position:absolute;transform: rotate(45deg);top:' + (this.parent.rowHeight > 40 ? 0 : 2) + 'px;left:' + (this.parent.renderBaseline ? 2 : 1) + 'px;"> </div>';
        return this.createDivElement(data.ganttProperties.duration !== 0 ? template : milestoneTemplate);
    };
    /**
     * To get parent taskbar node.
     *
     * @param {number} i .
     * @param {NodeList} rootElement .
     * @returns {NodeList} .
     * @private
     */
    ChartRows.prototype.getParentTaskbarNode = function (i, rootElement) {
        var parentTaskbarNode = null;
        var data = this.templateData;
        if (this.parentTaskbarTemplateFunction) {
            parentTaskbarNode = this.parentTaskbarTemplateFunction(extend({ index: i }, data), this.parent, 'ParentTaskbarTemplate', this.getTemplateID('ParentTaskbarTemplate'), false, undefined, rootElement[0], this.parent.treeGrid['root']);
        }
        else {
            var labelString = '';
            var labelDiv = void 0;
            var tHeight = this.taskBarHeight / 5;
            var template = this.createDivElement('<div class="' + cls.parentTaskBarInnerDiv + ' ' +
                this.getExpandClass(data) + ' ' + cls.traceParentTaskBar + '"' +
                ' style="width:' + (data.ganttProperties.isAutoSchedule ? data.ganttProperties.width :
                data.ganttProperties.autoWidth) + 'px;height:' + (data.ganttProperties.isAutoSchedule ? this.taskBarHeight :
                (tHeight * 3)) + 'px;margin-top:' + (data.ganttProperties.isAutoSchedule ? -1 :
                (tHeight * 2)) + 'px; ">' +
                '</div>');
            var progressBarInnerDiv = this.createDivElement('<div class="' + cls.parentProgressBarInnerDiv + ' ' +
                this.getExpandClass(data) + ' ' + cls.traceParentProgressBar + '"' +
                ' style="border-style:' + (data.ganttProperties.progressWidth ? 'solid;' : 'none;') +
                'width:' + data.ganttProperties.progressWidth + 'px;' +
                'border-top-right-radius:' + this.getBorderRadius(data) + 'px;' +
                'border-bottom-right-radius:' + this.getBorderRadius(data) + 'px;height:100%;"></div>');
            var div = createElement('div');
            if (this.taskLabelTemplateFunction) {
                var parentTaskLabelNode = this.taskLabelTemplateFunction(extend({ index: i }, data), this.parent, 'TaskLabelTemplate', this.getTemplateID('TaskLabelTemplate'), false, undefined, progressBarInnerDiv[0]);
                if (parentTaskLabelNode && parentTaskLabelNode.length > 0) {
                    append(parentTaskLabelNode, div);
                    labelString = div.innerHTML;
                }
            }
            else {
                labelString = this.getTaskLabel(this.parent.labelSettings.taskLabel);
                labelString = labelString === 'isCustomTemplate' ? this.parent.labelSettings.taskLabel : labelString;
                if (this.parent.enableHtmlSanitizer && typeof (labelString) === 'string') {
                    labelString = SanitizeHtmlHelper.sanitize(labelString);
                }
            }
            if (labelString.indexOf('null') === -1) {
                if (this.getTaskLabel(this.parent.labelSettings.taskLabel) === 'isCustomTemplate' &&
                    !this.isTemplate(this.parent.labelSettings.taskLabel)) {
                    labelString = '';
                }
                if (isNaN(parseInt(labelString))) {
                    labelDiv = '<span class="' + cls.taskLabel + '" style="line-height:' +
                        (data['isManual'] && data.hasChildRecords ? (Math.floor((60 / 100) * this.taskBarHeight)) : (this.taskBarHeight - 1)) +
                        'px; text-align:' + (this.parent.enableRtl ? 'right;' : 'left;') +
                        'display:' + 'inline-block;' +
                        'width:' + (data.ganttProperties.width - 10) + 'px; height:' +
                        this.taskBarHeight + 'px;"></span>';
                }
                else {
                    labelDiv = '<span class="' +
                        cls.taskLabel + '" style="line-height:' +
                        (data['isManual'] && data.hasChildRecords ? (Math.floor((60 / 100) * this.taskBarHeight)) : (this.taskBarHeight - 1)) + 'px;' +
                        (this.parent.viewType === 'ResourceView' ? 'display:inline-flex;' : '') +
                        (this.parent.viewType === 'ResourceView' ? 'width:' + (data.ganttProperties.width - 10) : '') + 'px; height:' +
                        (this.taskBarHeight - 1) + 'px;' + (this.parent.viewType === 'ResourceView' ? 'display: inline-flex;' : '') +
                        (this.parent.viewType === 'ResourceView' ? 'width:' + (data.ganttProperties.width - 10) : '') + 'px; height:' +
                        this.taskBarHeight + 'px;"></span>';
                }
                var labelElement = this.createDivElement(labelDiv)[0];
                if (this.parent.disableHtmlEncode) {
                    labelElement.innerText = labelString;
                }
                else {
                    labelElement.innerHTML = labelString;
                }
                var parentLabel = this.parent.labelSettings.taskLabel;
                if (parentLabel && parentLabel['elementRef'])
                    labelElement.appendChild(div);
                progressBarInnerDiv[0].appendChild(labelElement);
                if (progressBarInnerDiv[0].querySelectorAll('.e-task-label')[0].textContent !== '' &&
                    !this.isTemplate(parentLabel) &&
                    progressBarInnerDiv[0].querySelectorAll('.e-task-label')[0].children[0])
                    progressBarInnerDiv[0].querySelectorAll('.e-task-label')[0].children[0].remove();
                if (progressBarInnerDiv[0].querySelectorAll('.e-task-label')[0].textContent === '' &&
                    parentLabel && !parentLabel['elementRef'] && div.innerHTML !== '')
                    progressBarInnerDiv[0].querySelectorAll('.e-task-label')[0].textContent = parentLabel;
            }
            var milestoneTemplate = '<div class="' + cls.parentMilestone + '" style="width:' + ((this.parent.renderBaseline ? this.taskBarHeight - 3 : this.taskBarHeight - 7)) + 'px;height:' +
                ((this.parent.renderBaseline ? this.taskBarHeight - 3 : this.taskBarHeight - 7)) + 'px;position:absolute;transform: rotate(45deg);top:' + (this.parent.rowHeight > 40 ? 0 : 2) + 'px;left:' + (this.parent.renderBaseline ? 2 : 1) + 'px;"> </div>';
            template[0].appendChild([].slice.call(progressBarInnerDiv)[0]);
            parentTaskbarNode = data.ganttProperties.isMilestone ?
                this.createDivElement(data.ganttProperties.isAutoSchedule ? milestoneTemplate : '') : template;
        }
        if (this.parent.enableRtl && parentTaskbarNode[0] && parentTaskbarNode[0].querySelector('.e-task-label')) {
            parentTaskbarNode[0].querySelector('.e-task-label').style.marginLeft = '15px';
            parentTaskbarNode[0].querySelector('.e-task-label').style.marginRight = '8px';
            if (parentTaskbarNode[0].querySelector('.e-gantt-parent-progressbar')) {
                parentTaskbarNode[0].querySelector('.e-gantt-parent-progressbar').style.textAlign = 'left';
            }
        }
        return parentTaskbarNode;
    };
    /**
     * To get taskbar row('TR') node
     *
     * @returns {NodeList} .
     * @private
     */
    ChartRows.prototype.getTableTrNode = function (i) {
        var table = createElement('table');
        var className = (this.parent.gridLines === 'Horizontal' || this.parent.gridLines === 'Both') ?
            'e-chart-row-border' : '';
        var rows = this.parent.treeGrid.grid.contentModule.getRows()[i];
        var activecls;
        if (rows && rows.isSelected) {
            activecls = 'e-active';
        }
        else {
            activecls = '';
        }
        table.innerHTML = '<tr class="' + this.getRowClassName(this.templateData) + ' ' + cls.chartRow + ' ' + (activecls) + '"' +
            'style="display:' + this.getExpandDisplayProp(this.templateData) + ';height:' +
            this.parent.rowHeight + 'px;">' +
            '<td class="' + cls.chartRowCell + ' ' + className
            + '"style="width:' + this.parent.timelineModule.totalTimelineWidth + 'px;"></td></tr>';
        return table.childNodes;
    };
    /**
     * To initialize chart templates.
     *
     * @returns {void}
     * @private
     */
    ChartRows.prototype.initializeChartTemplate = function () {
        if (!isNullOrUndefined(this.parent.parentTaskbarTemplate)) {
            this.parentTaskbarTemplateFunction = this.templateCompiler(this.parent.parentTaskbarTemplate);
        }
        if (!isNullOrUndefined(this.parent.labelSettings.leftLabel) &&
            this.isTemplate(this.parent.labelSettings.leftLabel)) {
            this.leftTaskLabelTemplateFunction = this.templateCompiler(this.parent.labelSettings.leftLabel);
        }
        if (!isNullOrUndefined(this.parent.labelSettings.rightLabel) &&
            this.isTemplate(this.parent.labelSettings.rightLabel)) {
            this.rightTaskLabelTemplateFunction = this.templateCompiler(this.parent.labelSettings.rightLabel);
        }
        if (!isNullOrUndefined(this.parent.labelSettings.taskLabel) &&
            this.isTemplate(this.parent.labelSettings.taskLabel)) {
            this.taskLabelTemplateFunction = this.templateCompiler(this.parent.labelSettings.taskLabel);
        }
        if (!isNullOrUndefined(this.parent.taskbarTemplate)) {
            this.childTaskbarTemplateFunction = this.templateCompiler(this.parent.taskbarTemplate);
        }
        if (!isNullOrUndefined(this.parent.milestoneTemplate)) {
            this.milestoneTemplateFunction = this.templateCompiler(this.parent.milestoneTemplate);
        }
    };
    ChartRows.prototype.createDivElement = function (template) {
        var div = createElement('div');
        div.innerHTML = template;
        return div.childNodes;
    };
    ChartRows.prototype.isTemplate = function (template) {
        var result = false;
        for (var i = 0; i < this.parent.ganttColumns.length; i++) {
            if (template === this.parent.ganttColumns[i].field) {
                result = true;
                break;
            }
        }
        if (typeof template !== 'string' || template.indexOf('#') === 0 || template.indexOf('<') > -1
            || template.indexOf('$') > -1 || !result) {
            result = true;
        }
        else {
            result = false;
        }
        return result;
    };
    /**
     * @param {string} templateName .
     * @returns {string} .
     * @private
     */
    ChartRows.prototype.getTemplateID = function (templateName) {
        var ganttID = this.parent.element.id;
        return ganttID + templateName;
    };
    ChartRows.prototype.leftLabelContainer = function () {
        var template = '<div class="' + ((this.leftTaskLabelTemplateFunction) ? cls.leftLabelTempContainer :
            cls.leftLabelContainer) + ' ' + '" tabindex="-1" role="term" style="height:' +
            (this.parent.rowHeight - 2) + 'px;width:' + this.taskNameWidth(this.templateData) + '"></div>';
        return this.createDivElement(template);
    };
    ChartRows.prototype.taskbarContainer = function () {
        var data = this.templateData;
        var manualParent = this.parent.editModule && this.parent.editSettings.allowTaskbarEditing &&
            this.parent.editModule.taskbarEditModule.taskBarEditAction === 'ParentResizing' ?
            true : false;
        var template = '<div class="' + cls.taskBarMainContainer + ' ' +
            this.parent.getUnscheduledTaskClass(data.ganttProperties) + ' ' +
            ((data.ganttProperties.cssClass) ? data.ganttProperties.cssClass : '') + '" ' +
            ' tabindex="-1" role="term" style="' + ((data.ganttProperties.isMilestone && !manualParent && !(data.hasChildRecords && !data.ganttProperties.isAutoSchedule)) ?
            ('width:' + this.milestoneHeight + 'px;height:' +
                this.milestoneHeight + 'px;margin-top:' + this.milestoneMarginTop + 'px;' + (this.parent.enableRtl ? 'right:' : 'left:') + (data.ganttProperties.left -
                (this.milestoneHeight / 2)) + 'px;') : ('width:' + data.ganttProperties.width +
            'px;margin-top:' + this.taskBarMarginTop + 'px;' + (this.parent.enableRtl ? 'right:' : 'left:') + (!data.hasChildRecords || data.ganttProperties.isAutoSchedule ?
            data.ganttProperties.left : data.ganttProperties.autoLeft) + 'px;height:' +
            this.taskBarHeight + 'px;cursor:' + (data.ganttProperties.isAutoSchedule ? 'move;' : 'auto;'))) + '"></div>';
        return this.createDivElement(template);
    };
    ChartRows.prototype.rightLabelContainer = function () {
        var template = '<div class="' + ((this.rightTaskLabelTemplateFunction) ? cls.rightLabelTempContainer :
            cls.rightLabelContainer) + '" ' + ' tabindex="-1" role="term" style="' + (this.parent.enableRtl ? 'right:' : 'left:') + this.getRightLabelLeft(this.templateData) + 'px; height:'
            + (this.parent.rowHeight - 2) + 'px;"></div>';
        return this.createDivElement(template);
    };
    ChartRows.prototype.childTaskbarLeftResizer = function () {
        var lResizerLeft = -(this.parent.isAdaptive ? 12 : 2);
        var template = '<div class="' + cls.taskBarLeftResizer + ' ' + cls.icon + '"' +
            'style="' + (this.parent.enableRtl ? 'right:' : 'left:') + lResizerLeft + 'px;height:' + (this.taskBarHeight) + 'px;"></div>';
        return this.createDivElement(template);
    };
    ChartRows.prototype.childTaskbarRightResizer = function () {
        var rResizerLeft = this.parent.isAdaptive ? -2 : -10;
        var template = '<div class="' + cls.taskBarRightResizer + ' ' + cls.icon + '"' +
            'style="' + (this.parent.enableRtl ? 'right:' : 'left:') + (this.templateData.ganttProperties.width + rResizerLeft) + 'px;' +
            'height:' + (this.taskBarHeight) + 'px;"></div>';
        return this.createDivElement(template);
    };
    ChartRows.prototype.childTaskbarProgressResizer = function () {
        var width = this.parent.enableRtl ? (this.templateData.ganttProperties.progressWidth + 8) : (this.templateData.ganttProperties.progressWidth - 6);
        var template = '<div class="' + cls.childProgressResizer + '"' +
            'style="' + (this.parent.enableRtl ? 'right:' : 'left:') + width + 'px;margin-top:' +
            (this.taskBarHeight - 4) + 'px;"><div class="' + cls.progressBarHandler + '"' +
            '><div class="' + cls.progressHandlerElement + '"></div>' +
            '<div class="' + cls.progressBarHandlerAfter + '"></div></div>';
        return this.createDivElement(template);
    };
    ChartRows.prototype.getLeftPointNode = function () {
        var data = this.templateData;
        var pointerLeft = -((this.parent.isAdaptive ? 14 : 2) + this.connectorPointWidth);
        var mileStoneLeft = -(this.connectorPointWidth + 2);
        var pointerTop = Math.floor(this.milesStoneRadius - (this.connectorPointWidth / 2));
        var marginTop;
        if ((!this.templateData.ganttProperties.isAutoSchedule && this.templateData.hasChildRecords) && this.parent.allowParentDependency) {
            marginTop = '';
        }
        else {
            marginTop = 'margin-top:' + this.connectorPointMargin + 'px';
        }
        var template = '<div class="' + cls.leftConnectorPointOuterDiv + '" style="' +
            ((data.ganttProperties.isMilestone) ? ('margin-top:' + pointerTop + 'px;left:' + mileStoneLeft +
                'px;') : (marginTop + ';left:' + pointerLeft + 'px;')) + '">' +
            '<div class="' + cls.connectorPointLeft + ' ' + this.parent.getUnscheduledTaskClass(data.ganttProperties) +
            '" style="width: ' + this.connectorPointWidth + 'px;' + (this.parent.enableRtl ? 'margin-right:2px;' : '') +
            'height: ' + this.connectorPointWidth + 'px;">' + this.touchLeftConnectorpoint + '</div></div>';
        return this.createDivElement(template);
    };
    ChartRows.prototype.getRightPointNode = function () {
        var data = this.templateData;
        var pointerRight = this.parent.isAdaptive ? 10 : -2;
        var pointerTop = Math.floor(this.milesStoneRadius - (this.connectorPointWidth / 2));
        var marginTop;
        if ((!this.templateData.ganttProperties.isAutoSchedule && this.templateData.hasChildRecords) && this.parent.allowParentDependency) {
            marginTop = '';
        }
        else {
            marginTop = 'margin-top:' + this.connectorPointMargin + 'px';
        }
        var template = '<div class="' + cls.rightConnectorPointOuterDiv + '" style="' +
            ((data.ganttProperties.isMilestone) ? ('left:' + (this.milestoneHeight - 2) + 'px;margin-top:' +
                pointerTop + 'px;') : ('left:' + (data.ganttProperties.width + pointerRight) + 'px;' + marginTop + ';')) + '">' +
            '<div class="' + cls.connectorPointRight + ' ' + this.parent.getUnscheduledTaskClass(data.ganttProperties) +
            '" style="width:' + this.connectorPointWidth + 'px;height:' + this.connectorPointWidth + 'px;">' +
            this.touchRightConnectorpoint + '</div></div>';
        return this.createDivElement(template);
    };
    /**
     * To get task label.
     *
     * @param {string} field .
     * @returns {string} .
     * @private
     */
    ChartRows.prototype.getTaskLabel = function (field) {
        var length = this.parent.ganttColumns.length;
        var resultString = null;
        if (!isNullOrUndefined(field) && field !== '') {
            if (field === this.parent.taskFields.resourceInfo) {
                resultString = this.getResourceName(this.templateData);
            }
            else {
                for (var i = 0; i < length; i++) {
                    if (field === this.parent.ganttColumns[i].field) {
                        resultString = this.getFieldValue(this.templateData[field]).toString();
                        break;
                    }
                }
                if (isNullOrUndefined(resultString)) {
                    return 'isCustomTemplate';
                }
            }
        }
        else {
            resultString = '';
        }
        return resultString;
    };
    ChartRows.prototype.getExpandDisplayProp = function (data) {
        data = this.templateData;
        if (this.parent.getExpandStatus(data)) {
            return 'table-row';
        }
        return 'none';
    };
    ChartRows.prototype.getRowClassName = function (data) {
        data = this.templateData;
        var rowClass = 'gridrowtaskId';
        var parentItem = data.parentItem;
        if (parentItem) {
            rowClass += parentItem.taskId.toString();
        }
        rowClass += 'level';
        rowClass += data.level.toString();
        return rowClass;
    };
    ChartRows.prototype.getBorderRadius = function (data) {
        data = this.templateData;
        var diff = data.ganttProperties.width - data.ganttProperties.progressWidth;
        if (diff <= 4) {
            return 4 - diff;
        }
        else {
            return 0;
        }
    };
    ChartRows.prototype.getSplitTaskBorderRadius = function (data) {
        var diff = data.width - data.progressWidth;
        if (diff <= 4) {
            return 4 - diff;
        }
        else {
            return 0;
        }
    };
    ChartRows.prototype.taskNameWidth = function (ganttData) {
        ganttData = this.templateData;
        var ganttProp = ganttData.ganttProperties;
        var width;
        if (ganttData.ganttProperties.isMilestone) {
            width = (ganttData.ganttProperties.left - (this.parent.getTaskbarHeight() / 2));
        }
        else if (ganttData.hasChildRecords && !ganttProp.isAutoSchedule) {
            if (!this.parent.allowUnscheduledTasks) {
                width = (ganttProp.autoStartDate.getTime() < ganttProp.startDate.getTime()) ?
                    ganttProp.autoLeft : ganttProp.left;
            }
            else {
                width = ganttProp.left < ganttProp.autoLeft ? ganttProp.left : ganttProp.autoLeft;
            }
        }
        else {
            width = ganttData.ganttProperties.left;
        }
        if (width < 0) {
            width = 0;
        }
        return width + 'px';
    };
    ChartRows.prototype.getRightLabelLeft = function (ganttData) {
        ganttData = this.templateData;
        var ganttProp = ganttData.ganttProperties;
        var left;
        var endLeft;
        var width;
        if (ganttData.ganttProperties.isMilestone) {
            return ganttData.ganttProperties.left + (this.parent.getTaskbarHeight() / 2);
        }
        else if (ganttData.hasChildRecords && !ganttProp.isAutoSchedule) {
            if (!this.parent.allowUnscheduledTasks) {
                left = ganttProp.autoStartDate.getTime() < ganttProp.startDate.getTime() ? ganttProp.autoLeft : ganttProp.left;
                endLeft = ganttProp.autoEndDate.getTime() < ganttProp.endDate.getTime() ?
                    this.parent.dataOperation.getTaskLeft(ganttProp.endDate, ganttProp.isMilestone) :
                    this.parent.dataOperation.getTaskLeft(ganttProp.autoEndDate, ganttProp.isMilestone);
                width = endLeft - left;
            }
            else {
                left = ganttProp.left < ganttProp.autoLeft ? ganttProp.autoLeft : ganttProp.left;
                width = ganttProp.autoWidth;
            }
            return left + width;
        }
        else {
            return ganttData.ganttProperties.left + ganttData.ganttProperties.width;
        }
    };
    ChartRows.prototype.getExpandClass = function (data) {
        data = this.templateData;
        if (data.expanded) {
            return cls.rowExpand;
        }
        else if (!data.expanded && data.hasChildRecords) {
            return cls.rowCollapse;
        }
        return '';
    };
    ChartRows.prototype.getFieldValue = function (field) {
        return isNullOrUndefined(field) ? '' : field;
    };
    ChartRows.prototype.getResourceName = function (ganttData) {
        ganttData = this.templateData;
        var resource = null;
        if (!isNullOrUndefined(ganttData.ganttProperties.resourceInfo)) {
            var length_2 = ganttData.ganttProperties.resourceInfo.length;
            if (length_2 > 0) {
                for (var i = 0; i < length_2; i++) {
                    var resourceName = ganttData.ganttProperties.resourceInfo[i][this.parent.resourceFields.name];
                    var resourceUnit = ganttData.ganttProperties.resourceInfo[i][this.parent.resourceFields.unit];
                    if (resourceUnit !== 100) {
                        resourceName += '[' + resourceUnit + '%' + ']';
                    }
                    if (isNullOrUndefined(resource)) {
                        resource = resourceName;
                    }
                    else {
                        resource += ' , ' + resourceName;
                    }
                }
                return resource;
            }
            else {
                return '';
            }
        }
        return '';
    };
    /**
     * To initialize private variable help to render task bars.
     *
     * @returns {void}
     * @private
     */
    ChartRows.prototype.initChartHelperPrivateVariable = function () {
        var taskbarHeightValue = this.parent.renderBaseline ? 0.45 : 0.62;
        var taskBarMarginTopValue = this.parent.renderBaseline ? 4 : 2;
        var milestoneHeightValue = this.parent.renderBaseline ? 1.13 : 0.82;
        this.baselineColor = !isNullOrUndefined(this.parent.baselineColor) &&
            this.parent.baselineColor !== '' ? this.parent.baselineColor : null;
        this.taskBarHeight = isNullOrUndefined(this.parent.taskbarHeight) || this.parent.taskbarHeight >= this.parent.rowHeight ?
            Math.floor(this.parent.rowHeight * taskbarHeightValue) : this.parent.taskbarHeight; // 0.62 -- Standard Ratio.
        if (this.parent.renderBaseline) {
            var height = void 0;
            if ((this.taskBarHeight + this.baselineHeight) <= this.parent.rowHeight) {
                height = this.taskBarHeight;
            }
            else {
                height = this.taskBarHeight - (this.baselineHeight + 1);
            }
            this.taskBarHeight = height;
        }
        this.milestoneHeight = Math.floor(this.taskBarHeight * milestoneHeightValue); // 0.82 -- Standard Ratio.
        this.taskBarMarginTop = Math.floor((this.parent.rowHeight - this.taskBarHeight) / taskBarMarginTopValue);
        this.milestoneMarginTop = Math.floor((this.parent.rowHeight - this.milestoneHeight) / 2);
        this.milesStoneRadius = Math.floor((this.milestoneHeight) / 2);
        this.baselineTop = -(Math.floor((this.parent.rowHeight - (this.taskBarHeight + this.taskBarMarginTop))) - 4);
        this.connectorPointWidth = this.parent.isAdaptive ? Math.round(this.taskBarHeight / 2) : 10;
        this.connectorPointMargin = Math.floor((this.taskBarHeight / 2) - (this.connectorPointWidth / 2)) - 1;
    };
    /**
     * Function used to refresh Gantt rows.
     *
     * @returns {void}
     * @private
     */
    ChartRows.prototype.refreshGanttRows = function () {
        this.parent.currentViewData = this.parent.treeGrid.getCurrentViewRecords().slice();
        this.createTaskbarTemplate();
        if (this.parent.viewType === 'ResourceView' && this.parent.showOverAllocation) {
            for (var i = 0; i < this.parent.currentViewData.length; i++) {
                var data = this.parent.currentViewData[i];
                if (data.childRecords.length > 0) {
                    this.parent.setRecordValue('workTimelineRanges', this.parent.dataOperation.mergeRangeCollections(data.ganttProperties.workTimelineRanges, true), data.ganttProperties, true);
                    this.parent.dataOperation.calculateRangeLeftWidth(data.ganttProperties.workTimelineRanges);
                }
            }
            this.parent.ganttChartModule.renderRangeContainer(this.parent.currentViewData);
        }
        this.parent.ganttChartModule.updateLastRowBottomWidth();
    };
    /**
     * To render taskbars.
     *
     * @returns {void}
     * @private
     */
    ChartRows.prototype.createTaskbarTemplate = function () {
        var _a;
        var trs = [].slice.call(this.ganttChartTableBody.querySelectorAll('tr'));
        this.ganttChartTableBody.innerHTML = '';
        var collapsedResourceRecord = [];
        var prevCurrentView = this.parent.treeGridModule.prevCurrentView;
        this.refreshedTr = [];
        this.refreshedData = [];
        if (this.parent.enableImmutableMode && prevCurrentView && prevCurrentView.length > 0 && this.isUpdated) {
            var oldKeys = {};
            var oldRowElements = [];
            var key = this.parent.treeGrid.getPrimaryKeyFieldNames()[0];
            for (var i = 0; i < prevCurrentView.length; i++) {
                oldRowElements[i] = trs[i];
                oldKeys[prevCurrentView[i][key]] = i;
            }
            for (var index = 0; index < this.parent.currentViewData.length; index++) {
                var oldIndex = oldKeys[this.parent.currentViewData[index][key]];
                var modifiedRecIndex = this.parent.modifiedRecords.indexOf(this.parent.currentViewData[index]);
                if (isNullOrUndefined(oldIndex) || modifiedRecIndex !== -1 || this.parent.isFromRenderBaseline) {
                    var tRow = this.getGanttChartRow(index, this.parent.currentViewData[index]);
                    this.ganttChartTableBody.appendChild(tRow);
                    this.refreshedTr.push(this.ganttChartTableBody.querySelectorAll('tr')[index]);
                    this.refreshedData.push(this.parent.currentViewData[index]);
                }
                else {
                    this.ganttChartTableBody.appendChild(oldRowElements[oldIndex]);
                }
                this.ganttChartTableBody.querySelectorAll('tr')[index].setAttribute('aria-rowindex', index.toString());
            }
        }
        else {
            var dupChartBody = void 0;
            dupChartBody = createElement('tbody', {
                id: this.parent.element.id + 'GanttTaskTableBody'
            });
            for (var i = 0; i < this.parent.currentViewData.length; i++) {
                var tempTemplateData = this.parent.currentViewData[i];
                if (this.parent.viewType === 'ResourceView') {
                    if (this.parent.editModule && this.parent.editModule.isResourceTaskDeleted || this.parent.isFromOnPropertyChange) {
                        this.parent.editModule.isResourceTaskDeleted = false;
                    }
                    if (!tempTemplateData.expanded && this.parent.enableMultiTaskbar) {
                        collapsedResourceRecord.push(tempTemplateData);
                    }
                }
                var tRow = this.getGanttChartRow(i, tempTemplateData);
                dupChartBody.appendChild(tRow);
                if (this.parent.enableImmutableMode) {
                    this.refreshedTr.push(dupChartBody.querySelectorAll('tr')[i]);
                    this.refreshedData.push(this.parent.currentViewData[i]);
                }
                // To maintain selection when virtualization is enabled
                if (this.parent.selectionModule && this.parent.allowSelection) {
                    this.parent.selectionModule.maintainSelectedRecords(parseInt(tRow.getAttribute('aria-rowindex'), 10));
                }
            }
            (_a = this.ganttChartTableBody).replaceChildren.apply(_a, dupChartBody.childNodes);
            this.parent.initialChartRowElements = this.parent.ganttChartModule.getChartRows();
        }
        if (this.parent.enableCriticalPath && this.parent.criticalPathModule) {
            var criticalModule = this.parent.criticalPathModule;
            if (criticalModule.criticalPathCollection) {
                this.parent.criticalPathModule.criticalConnectorLine(criticalModule.criticalPathCollection, criticalModule.detailPredecessorCollection, true, criticalModule.predecessorCollectionTaskIds);
            }
        }
        this.parent.renderTemplates();
        this.triggerQueryTaskbarInfo();
        this.parent.modifiedRecords = [];
        if (this.parent.viewType == 'ResourceView' && this.parent.showOverAllocation) {
            this.updateOverlapped();
        }
        if (collapsedResourceRecord.length) {
            for (var j = 0; j < collapsedResourceRecord.length; j++) {
                if (collapsedResourceRecord[j].hasChildRecords) {
                    this.parent.isGanttChartRendered = true;
                    this.parent.chartRowsModule.refreshRecords([collapsedResourceRecord[j]]);
                }
            }
        }
        this.parent.isGanttChartRendered = true;
        this.parent.renderTemplates();
    };
    /**
     * To render taskbars.
     *
     * @param {number} i .
     * @param {IGanttData} tempTemplateData .
     * @returns {Node} .
     * @private
     */
    ChartRows.prototype.getGanttChartRow = function (i, tempTemplateData) {
        this.templateData = tempTemplateData;
        var taskBaselineTemplateNode = null;
        var parentTrNode = this.getTableTrNode(i);
        var leftLabelNode = this.getLeftLabelNode(i);
        var taskbarContainerNode = this.taskbarContainer();
        taskbarContainerNode[0].setAttribute('aria-label', this.generateAriaLabel(this.templateData));
        taskbarContainerNode[0].setAttribute('rowUniqueId', this.templateData.ganttProperties.rowUniqueID);
        var connectorLineLeftNode;
        if (!this.templateData.hasChildRecords && !this.parent.allowParentDependency) {
            var connectorLineLeftNode_1 = this.getLeftPointNode();
            taskbarContainerNode[0].appendChild([].slice.call(connectorLineLeftNode_1)[0]);
        }
        else if (this.parent.allowParentDependency) {
            connectorLineLeftNode = this.getLeftPointNode();
            if ((this.templateData.ganttProperties.isAutoSchedule && this.parent.viewType === 'ProjectView') || !this.templateData.hasChildRecords) {
                taskbarContainerNode[0].appendChild([].slice.call(connectorLineLeftNode)[0]);
            }
        }
        if (this.templateData.hasChildRecords) {
            var parentTaskbarTemplateNode = this.getParentTaskbarNode(i, taskbarContainerNode);
            if (!this.templateData.ganttProperties.isAutoSchedule) {
                var manualTaskbar = this.getManualTaskbar();
                if (!isNullOrUndefined(manualTaskbar[0])) {
                    if (this.parent.allowParentDependency) {
                        manualTaskbar[0].appendChild([].slice.call(connectorLineLeftNode)[0]);
                        var connectorLineRightNode_1 = this.getRightPointNode();
                        manualTaskbar[0].appendChild([].slice.call(connectorLineRightNode_1)[0]);
                    }
                    taskbarContainerNode[0].appendChild([].slice.call(manualTaskbar)[0]);
                }
            }
            if ((this.templateData.ganttProperties.autoDuration !== 0) && !this.templateData.ganttProperties.isMilestone && parentTaskbarTemplateNode && parentTaskbarTemplateNode.length > 0) {
                append(parentTaskbarTemplateNode, taskbarContainerNode[0]);
            }
            else if ((this.templateData.ganttProperties.duration === 0 && this.templateData.ganttProperties.isMilestone && this.templateData.ganttProperties.isAutoSchedule)) {
                var milestoneTemplateNode = this.getMilestoneNode(i, taskbarContainerNode);
                if (milestoneTemplateNode && milestoneTemplateNode.length > 0) {
                    append(milestoneTemplateNode, taskbarContainerNode[0]);
                }
            }
            if (this.parent.renderBaseline && this.templateData.ganttProperties.baselineStartDate &&
                this.templateData.ganttProperties.baselineEndDate) {
                taskBaselineTemplateNode = ((this.templateData.ganttProperties.baselineStartDate.getTime() === this.templateData.ganttProperties.baselineEndDate.getTime()) || ((!isNullOrUndefined(this.templateData.ganttProperties.baselineStartDate) && !isNullOrUndefined(this.templateData.ganttProperties.startDate) && (this.templateData.ganttProperties.baselineStartDate.getTime() === this.templateData.ganttProperties.startDate.getTime()))
                    && (!isNullOrUndefined(this.templateData.ganttProperties.baselineEndDate) && !isNullOrUndefined(this.templateData.ganttProperties.endDate) && (this.templateData.ganttProperties.baselineEndDate.getTime() === this.templateData.ganttProperties.endDate.getTime())) &&
                    this.templateData.ganttProperties.isMilestone))
                    ? this.getMilestoneBaselineNode() : this.getTaskBaselineNode();
            }
        }
        else if (this.templateData.ganttProperties.isMilestone) {
            var milestoneTemplateNode = this.getMilestoneNode(i, taskbarContainerNode);
            if (milestoneTemplateNode && milestoneTemplateNode.length > 0) {
                append(milestoneTemplateNode, taskbarContainerNode[0]);
            }
            if (this.parent.renderBaseline && this.templateData.ganttProperties.baselineStartDate &&
                this.templateData.ganttProperties.baselineEndDate) {
                taskBaselineTemplateNode = ((this.templateData.ganttProperties.baselineStartDate.getTime() === this.templateData.ganttProperties.baselineEndDate.getTime()) || ((!isNullOrUndefined(this.templateData.ganttProperties.baselineStartDate) && !isNullOrUndefined(this.templateData.ganttProperties.startDate) && (this.templateData.ganttProperties.baselineStartDate.getTime() === this.templateData.ganttProperties.startDate.getTime()))
                    && (!isNullOrUndefined(this.templateData.ganttProperties.baselineEndDate) && !isNullOrUndefined(this.templateData.ganttProperties.endDate) && (this.templateData.ganttProperties.baselineEndDate.getTime() === this.templateData.ganttProperties.endDate.getTime())) &&
                    this.templateData.ganttProperties.isMilestone))
                    ? this.getMilestoneBaselineNode() : this.getTaskBaselineNode();
            }
        }
        else {
            var scheduledTask = isScheduledTask(this.templateData.ganttProperties); // eslint-disable-line
            var childTaskbarProgressResizeNode = null;
            var childTaskbarRightResizeNode = null;
            var childTaskbarLeftResizeNode = null;
            if (!isNullOrUndefined(scheduledTask)) {
                if (scheduledTask || this.templateData.ganttProperties.duration) {
                    if (scheduledTask && (isNullOrUndefined(this.templateData.ganttProperties.segments)
                        || this.templateData.ganttProperties.segments.length <= 0)) {
                        childTaskbarProgressResizeNode = this.childTaskbarProgressResizer();
                        childTaskbarLeftResizeNode = this.childTaskbarLeftResizer();
                        childTaskbarRightResizeNode = this.childTaskbarRightResizer();
                    }
                }
                var childTaskbarTemplateNode = this.getChildTaskbarNode(i, taskbarContainerNode);
                if (childTaskbarLeftResizeNode) {
                    taskbarContainerNode[0].appendChild([].slice.call(childTaskbarLeftResizeNode)[0]);
                }
                if (childTaskbarTemplateNode && childTaskbarTemplateNode.length > 0) {
                    if (this.templateData.ganttProperties.segments && this.templateData.ganttProperties.segments.length > 0) {
                        var length_3 = this.templateData.ganttProperties.segments.length;
                        var connector = ('<div class="e-gantt-split-container-line"></div>');
                        var segmentConnector = null;
                        segmentConnector = this.createDivElement(connector);
                        taskbarContainerNode[0].appendChild([].slice.call(segmentConnector)[0]);
                        for (var i_1 = 0; i_1 < length_3; i_1++) {
                            taskbarContainerNode[0].appendChild([].slice.call(childTaskbarTemplateNode)[0]);
                        }
                    }
                    else {
                        append(childTaskbarTemplateNode, taskbarContainerNode[0]);
                    }
                }
                if (childTaskbarProgressResizeNode) {
                    taskbarContainerNode[0].appendChild([].slice.call(childTaskbarProgressResizeNode)[0]);
                }
                if (childTaskbarRightResizeNode) {
                    taskbarContainerNode[0].appendChild([].slice.call(childTaskbarRightResizeNode)[0]);
                }
            }
            if (this.parent.renderBaseline && this.templateData.ganttProperties.baselineStartDate &&
                this.templateData.ganttProperties.baselineEndDate) {
                taskBaselineTemplateNode = ((this.templateData.ganttProperties.baselineStartDate.getTime() === this.templateData.ganttProperties.baselineEndDate.getTime()) || ((!isNullOrUndefined(this.templateData.ganttProperties.baselineStartDate) && !isNullOrUndefined(this.templateData.ganttProperties.startDate) && (this.templateData.ganttProperties.baselineStartDate.getTime() === this.templateData.ganttProperties.startDate.getTime()))
                    && (!isNullOrUndefined(this.templateData.ganttProperties.baselineEndDate) && !isNullOrUndefined(this.templateData.ganttProperties.endDate) && (this.templateData.ganttProperties.baselineEndDate.getTime() === this.templateData.ganttProperties.endDate.getTime())) &&
                    this.templateData.ganttProperties.isMilestone))
                    ? this.getMilestoneBaselineNode() : this.getTaskBaselineNode();
            }
        }
        var connectorLineRightNode;
        if (this.parent.allowParentDependency && ((this.templateData.ganttProperties.isAutoSchedule && this.parent.viewType === 'ProjectView') || !this.templateData.hasChildRecords)) {
            connectorLineRightNode = this.getRightPointNode();
            taskbarContainerNode[0].appendChild([].slice.call(connectorLineRightNode)[0]);
        }
        else if (!this.parent.allowParentDependency) {
            connectorLineRightNode = this.getRightPointNode();
            taskbarContainerNode[0].appendChild([].slice.call(connectorLineRightNode)[0]);
        }
        var rightLabelNode = this.getRightLabelNode(i);
        parentTrNode[0].childNodes[0].childNodes[0].appendChild([].slice.call(leftLabelNode)[0]);
        parentTrNode[0].childNodes[0].childNodes[0].appendChild([].slice.call(taskbarContainerNode)[0]);
        if (this.templateData.ganttProperties.indicators && this.templateData.ganttProperties.indicators.length > 0) {
            var taskIndicatorNode = void 0;
            var taskIndicatorTextFunction = void 0;
            var taskIndicatorTextNode = void 0;
            var indicators = this.templateData.ganttProperties.indicators;
            for (var indicatorIndex = 0; indicatorIndex < indicators.length; indicatorIndex++) {
                taskIndicatorNode = this.getIndicatorNode(indicators[indicatorIndex]);
                taskIndicatorNode[0].setAttribute('aria-label', indicators[indicatorIndex].name);
                if (indicators[indicatorIndex].name.indexOf('$') > -1 || indicators[indicatorIndex].name.indexOf('#') > -1) {
                    taskIndicatorTextFunction = this.templateCompiler(indicators[indicatorIndex].name);
                    taskIndicatorTextNode = taskIndicatorTextFunction(extend({ index: i }, this.templateData), this.parent, 'indicatorLabelText');
                }
                else {
                    var text = createElement('Text');
                    text.innerHTML = indicators[indicatorIndex].name;
                    if (this.parent.enableHtmlSanitizer && typeof (indicators[indicatorIndex].name) === 'string') {
                        indicators[indicatorIndex].name = SanitizeHtmlHelper.sanitize(indicators[indicatorIndex].name);
                        text.innerText = indicators[indicatorIndex].name;
                    }
                    taskIndicatorTextNode = text.childNodes;
                }
                taskIndicatorNode[0].appendChild([].slice.call(taskIndicatorTextNode)[0]);
                taskIndicatorNode[0].title =
                    !isNullOrUndefined(indicators[indicatorIndex].tooltip) ? indicators[indicatorIndex].tooltip : '';
                parentTrNode[0].childNodes[0].childNodes[0].appendChild([].slice.call(taskIndicatorNode)[0]);
            }
        }
        if (rightLabelNode && rightLabelNode.length > 0) {
            parentTrNode[0].childNodes[0].childNodes[0].appendChild([].slice.call(rightLabelNode)[0]);
        }
        if (!isNullOrUndefined(taskBaselineTemplateNode)) {
            parentTrNode[0].childNodes[0].childNodes[0].appendChild([].slice.call(taskBaselineTemplateNode)[0]);
        }
        var tRow = parentTrNode[0].childNodes[0];
        this.setAriaRowIndex(tempTemplateData, tRow);
        return tRow;
    };
    /**
     * To set aria-rowindex for chart rows
     *
     * @returns {void} .
     * @private
     */
    ChartRows.prototype.setAriaRowIndex = function (tempTemplateData, tRow) {
        var dataSource = this.parent.treeGrid.getCurrentViewRecords();
        var visualData = this.parent.virtualScrollModule && this.parent.enableVirtualization ?
            getValue('virtualScrollModule.visualData', this.parent.treeGrid) : dataSource;
        var index = visualData.indexOf(tempTemplateData);
        tRow.setAttribute('aria-rowindex', index.toString());
    };
    /**
     * To trigger query taskbar info event.
     *
     * @returns {void}
     * @private
     */
    ChartRows.prototype.triggerQueryTaskbarInfo = function () {
        if (!this.parent.queryTaskbarInfo) {
            return;
        }
        var length = this.parent.enableImmutableMode ?
            this.refreshedTr.length : this.ganttChartTableBody.querySelectorAll('tr').length;
        var trElement;
        var data;
        for (var index = 0; index < length; index++) {
            trElement = this.parent.enableImmutableMode ? this.refreshedTr[index] : this.ganttChartTableBody.querySelectorAll('tr')[index];
            data = this.refreshedData.length > 0 ? this.refreshedData[index] : this.parent.currentViewData[index];
            var segmentLength = !isNullOrUndefined(data.ganttProperties.segments) && data.ganttProperties.segments.length;
            if (segmentLength > 0) {
                for (var i = 0; i < segmentLength; i++) {
                    var segmentedTasks = trElement.getElementsByClassName('e-segmented-taskbar');
                    var segmentElement = segmentedTasks[i];
                    this.triggerQueryTaskbarInfoByIndex(segmentElement, data);
                }
            }
            else if (trElement) {
                this.triggerQueryTaskbarInfoByIndex(trElement, data);
            }
        }
    };
    /**
     *
     * @param {Element} trElement .
     * @param {IGanttData} data .
     * @returns {void} .
     * @private
     */
    ChartRows.prototype.triggerQueryTaskbarInfoByIndex = function (trElement, data) {
        var _this = this;
        // eslint-disable-next-line
        var taskbarElement = !isNullOrUndefined(data.ganttProperties.segments) && data.ganttProperties.segments.length > 0 ? trElement :
            trElement.querySelector('.' + cls.taskBarMainContainer);
        var rowElement;
        var segmentRowElement;
        if (data.ganttProperties.segments && data.ganttProperties.segments.length > 0) {
            segmentRowElement = trElement.parentElement.parentElement.parentElement;
        }
        var triggerTaskbarElement;
        var args = {
            data: data,
            rowElement: trElement,
            taskbarElement: taskbarElement,
            taskbarType: data.hasChildRecords ? 'ParentTask' : data.ganttProperties.isMilestone ? 'Milestone' : 'ChildTask'
        };
        var classCollections = this.getClassName(args);
        if (args.taskbarType === 'Milestone') {
            args.milestoneColor = taskbarElement.querySelector(classCollections[0]) ?
                getComputedStyle(taskbarElement.querySelector(classCollections[0])).backgroundColor : null;
            args.baselineColor = trElement.querySelector(classCollections[1]) ?
                getComputedStyle(trElement.querySelector(classCollections[1])).backgroundColor :
                (trElement.querySelector('.' + cls.baselineBar) ? getComputedStyle(trElement.querySelector('.' + cls.baselineBar)).backgroundColor : null);
        }
        else if (taskbarElement) {
            var childTask = taskbarElement.querySelector(classCollections[0]);
            var progressTask = taskbarElement.querySelector(classCollections[1]);
            args.taskbarBgColor = isNullOrUndefined(childTask) ? null : taskbarElement.classList.contains(cls.traceChildTaskBar) ?
                getComputedStyle(taskbarElement).backgroundColor :
                getComputedStyle(taskbarElement.querySelector(classCollections[0])).backgroundColor;
            args.taskbarBorderColor = isNullOrUndefined(childTask) ? null : taskbarElement.classList.contains(cls.traceChildTaskBar) ?
                getComputedStyle(taskbarElement).backgroundColor :
                getComputedStyle(taskbarElement.querySelector(classCollections[0])).borderColor;
            args.progressBarBgColor = isNullOrUndefined(progressTask) ? null :
                taskbarElement.classList.contains(cls.traceChildProgressBar) ?
                    getComputedStyle(taskbarElement).backgroundColor :
                    getComputedStyle(taskbarElement.querySelector(classCollections[1])).backgroundColor;
            // args.progressBarBorderColor = taskbarElement.querySelector(progressBarClass) ?
            //     getComputedStyle(taskbarElement.querySelector(progressBarClass)).borderColor : null;
            if (segmentRowElement) {
                args.baselineColor = segmentRowElement.querySelector('.' + cls.baselineBar) ?
                    getComputedStyle(segmentRowElement.querySelector('.' + cls.baselineBar)).backgroundColor : null;
            }
            else {
                args.baselineColor = trElement.querySelector('.' + cls.baselineBar) ?
                    getComputedStyle(trElement.querySelector('.' + cls.baselineBar)).backgroundColor : null;
            }
            args.taskLabelColor = taskbarElement.querySelector('.' + cls.taskLabel) ?
                getComputedStyle(taskbarElement.querySelector('.' + cls.taskLabel)).color : null;
        }
        if (segmentRowElement) {
            args.rightLabelColor = segmentRowElement.querySelector('.' + cls.rightLabelContainer) &&
                (segmentRowElement.querySelector('.' + cls.rightLabelContainer)).querySelector('.' + cls.label) ?
                getComputedStyle((segmentRowElement.querySelector('.' + cls.rightLabelContainer)).querySelector('.' + cls.label)).color : null;
            args.leftLabelColor = segmentRowElement.querySelector('.' + cls.leftLabelContainer) &&
                (segmentRowElement.querySelector('.' + cls.leftLabelContainer)).querySelector('.' + cls.label) ?
                getComputedStyle((segmentRowElement.querySelector('.' + cls.leftLabelContainer)).querySelector('.' + cls.label)).color : null;
        }
        else {
            args.rightLabelColor = trElement.querySelector('.' + cls.rightLabelContainer) &&
                (trElement.querySelector('.' + cls.rightLabelContainer)).querySelector('.' + cls.label) ?
                getComputedStyle((trElement.querySelector('.' + cls.rightLabelContainer)).querySelector('.' + cls.label)).color : null;
            args.leftLabelColor = trElement.querySelector('.' + cls.leftLabelContainer) &&
                (trElement.querySelector('.' + cls.leftLabelContainer)).querySelector('.' + cls.label) ?
                getComputedStyle((trElement.querySelector('.' + cls.leftLabelContainer)).querySelector('.' + cls.label)).color : null;
        }
        this.parent.trigger('queryTaskbarInfo', args, function (taskbarArgs) {
            _this.updateQueryTaskbarInfoArgs(taskbarArgs, rowElement, triggerTaskbarElement);
        });
    };
    /**
     * To update query taskbar info args.
     *
     * @param {IQueryTaskbarInfoEventArgs} args .
     * @param {Element} rowElement .
     * @param {Element} taskBarElement .
     * @returns {void}
     * @private
     */
    ChartRows.prototype.updateQueryTaskbarInfoArgs = function (args, rowElement, taskBarElement) {
        var trElement = args.rowElement;
        var taskbarElement = args.taskbarElement;
        var classCollections = this.getClassName(args);
        var segmentRowElement;
        if (args.data.ganttProperties.segments && args.data.ganttProperties.segments.length > 0) {
            segmentRowElement = trElement.parentElement.parentElement.parentElement;
        }
        if (args.taskbarType === 'Milestone') {
            if (taskbarElement.querySelector(classCollections[0]) &&
                getComputedStyle(taskbarElement.querySelector(classCollections[0])).backgroundColor !== args.milestoneColor) {
                taskbarElement.querySelector(classCollections[0]).style.backgroundColor = args.milestoneColor;
            }
            if (trElement.querySelector(classCollections[1]) &&
                getComputedStyle(trElement.querySelector(classCollections[1])).backgroundColor !== args.baselineColor) {
                trElement.querySelector(classCollections[1]).style.backgroundColor = args.baselineColor;
            }
            if (trElement.querySelector('.' + cls.baselineBar) &&
                getComputedStyle(trElement.querySelector('.' + cls.baselineBar)).borderTopColor !== args.baselineColor) {
                trElement.querySelector('.' + cls.baselineBar).style.backgroundColor = args.baselineColor;
            }
        }
        else if (taskbarElement) {
            if (taskbarElement && this.parent.enableVirtualization && !args.data.expanded) {
                var childElement = trElement.querySelector('.' + cls.collapseParent);
                if (childElement) {
                    for (var i = 0; i < childElement.childNodes.length; i++) {
                        var taskbar = childElement.childNodes[i];
                        var mainTaskbar = taskbar.querySelector('.' + cls.traceChildTaskBar);
                        if (mainTaskbar) {
                            mainTaskbar.style.backgroundColor = args.taskbarBgColor;
                        }
                    }
                }
            }
            if (taskbarElement.querySelector(classCollections[0]) &&
                getComputedStyle(taskbarElement.querySelector(classCollections[0])).backgroundColor !== args.taskbarBgColor) {
                taskbarElement.querySelector(classCollections[0]).style.backgroundColor = args.taskbarBgColor;
            }
            if (taskbarElement.querySelector(classCollections[0]) &&
                getComputedStyle(taskbarElement.querySelector(classCollections[0])).outlineColor !== args.taskbarBorderColor) {
                taskbarElement.querySelector(classCollections[0]).style.outlineColor = args.taskbarBorderColor;
            }
            if (taskbarElement.querySelector(classCollections[1]) &&
                getComputedStyle(taskbarElement.querySelector(classCollections[1])).backgroundColor !== args.progressBarBgColor) {
                taskbarElement.querySelector(classCollections[1]).style.backgroundColor = args.progressBarBgColor;
            }
            if (taskbarElement.classList.contains(cls.traceChildTaskBar) &&
                getComputedStyle(taskbarElement).backgroundColor !== args.taskbarBgColor) {
                taskbarElement.style.backgroundColor = args.taskbarBgColor;
            }
            if (taskbarElement.classList.contains(cls.traceChildTaskBar) &&
                getComputedStyle(taskbarElement).outlineColor !== args.taskbarBorderColor) {
                taskbarElement.style.outlineColor = args.taskbarBorderColor;
            }
            if (taskbarElement.classList.contains(cls.traceChildProgressBar) &&
                getComputedStyle(taskbarElement).backgroundColor !== args.progressBarBgColor) {
                taskbarElement.style.backgroundColor = args.progressBarBgColor;
            }
            // if (taskbarElement.querySelector(progressBarClass) &&
            //     getComputedStyle(taskbarElement.querySelector(progressBarClass)).borderColor !== args.progressBarBorderColor) {
            //     (taskbarElement.querySelector(progressBarClass) as HTMLElement).style.borderColor = args.progressBarBorderColor;
            // }
            if (taskbarElement.querySelector('.' + cls.taskLabel) &&
                getComputedStyle(taskbarElement.querySelector('.' + cls.taskLabel)).color !== args.taskLabelColor) {
                taskbarElement.querySelector('.' + cls.taskLabel).style.color = args.taskLabelColor;
            }
            if (segmentRowElement) {
                if (segmentRowElement.querySelector('.' + cls.baselineBar) &&
                    getComputedStyle(segmentRowElement.querySelector('.' + cls.baselineBar)).backgroundColor !== args.baselineColor) {
                    segmentRowElement.querySelector('.' + cls.baselineBar).style.backgroundColor = args.baselineColor;
                }
            }
            else {
                if (trElement.querySelector('.' + cls.baselineBar) &&
                    getComputedStyle(trElement.querySelector('.' + cls.baselineBar)).backgroundColor !== args.baselineColor) {
                    trElement.querySelector('.' + cls.baselineBar).style.backgroundColor = args.baselineColor;
                }
            }
        }
        if (segmentRowElement) {
            if (segmentRowElement.querySelector('.' + cls.leftLabelContainer) &&
                (segmentRowElement.querySelector('.' + cls.leftLabelContainer)).querySelector('.' + cls.label) &&
                getComputedStyle((segmentRowElement.querySelector('.' + cls.leftLabelContainer)).querySelector('.' + cls.label)).color !== args.leftLabelColor) {
                (segmentRowElement.querySelector('.' + cls.leftLabelContainer)).querySelector('.' + cls.label).style.color = args.leftLabelColor;
            }
            if (segmentRowElement.querySelector('.' + cls.rightLabelContainer) &&
                (segmentRowElement.querySelector('.' + cls.rightLabelContainer)).querySelector('.' + cls.label) &&
                getComputedStyle((segmentRowElement.querySelector('.' + cls.rightLabelContainer)).querySelector('.' + cls.label)).color !== args.rightLabelColor) {
                (segmentRowElement.querySelector('.' + cls.rightLabelContainer)).querySelector('.' + cls.label).style.color = args.rightLabelColor;
            }
        }
        else {
            if (trElement.querySelector('.' + cls.leftLabelContainer) &&
                (trElement.querySelector('.' + cls.leftLabelContainer)).querySelector('.' + cls.label) &&
                getComputedStyle((trElement.querySelector('.' + cls.leftLabelContainer)).querySelector('.' + cls.label)).color !== args.leftLabelColor) {
                (trElement.querySelector('.' + cls.leftLabelContainer)).querySelector('.' + cls.label).style.color = args.leftLabelColor;
            }
            if (trElement.querySelector('.' + cls.rightLabelContainer) &&
                (trElement.querySelector('.' + cls.rightLabelContainer)).querySelector('.' + cls.label) &&
                getComputedStyle((trElement.querySelector('.' + cls.rightLabelContainer)).querySelector('.' + cls.label)).color !== args.rightLabelColor) {
                (trElement.querySelector('.' + cls.rightLabelContainer)).querySelector('.' + cls.label).style.color = args.rightLabelColor;
            }
        }
    };
    ChartRows.prototype.getClassName = function (args) {
        var classCollection = [];
        classCollection.push('.' + (args.taskbarType === 'ParentTask' ?
            cls.traceParentTaskBar : args.taskbarType === 'ChildTask' ? cls.traceChildTaskBar : cls.traceMilestone));
        classCollection.push('.' + (args.taskbarType === 'ParentTask' ?
            cls.traceParentProgressBar : args.taskbarType === 'ChildTask' ? cls.traceChildProgressBar : cls.baselineMilestoneContainer));
        return classCollection;
    };
    /**
     * To compile template string.
     *
     * @param {string} template .
     * @returns {Function} .
     * @private
     */
    ChartRows.prototype.templateCompiler = function (template) {
        if (!isNullOrUndefined(template) && template !== '') {
            try {
                if (typeof template !== 'function' && document.querySelectorAll(template).length) {
                    return compile(document.querySelector(template).innerHTML.trim(), this.parent);
                }
                else {
                    return compile(template, this.parent);
                }
            }
            catch (e) {
                return compile(template, this.parent);
            }
        }
        return null;
    };
    // to update the eOverlapped property
    ChartRows.prototype.updateOverlapped = function () {
        for (var k = 0; k < this.parent.treeGrid.parentData.length; k++) {
            var childRecords = this.parent.treeGrid.parentData[k].childRecords;
            for (var i = 0; i < childRecords.length; i++) {
                if (childRecords[i + 1]) {
                    childRecords[i].ganttProperties.eOverlapped = undefined;
                }
                for (var j = i + 1; j < childRecords.length; j++) {
                    childRecords[j].ganttProperties.eOverlapped = undefined;
                    if (childRecords[i].ganttProperties.startDate.getTime() < childRecords[j].ganttProperties.endDate.getTime() &&
                        childRecords[i].ganttProperties.endDate.getTime() > childRecords[j].ganttProperties.startDate.getTime()) {
                        childRecords[j].ganttProperties.eOverlapped = true;
                        childRecords[i].ganttProperties.eOverlapped = true;
                    }
                    else {
                        if (isNullOrUndefined(childRecords[j].ganttProperties.eOverlapped)) {
                            childRecords[j].ganttProperties.eOverlapped = false;
                        }
                        if (isNullOrUndefined(childRecords[i].ganttProperties.eOverlapped)) {
                            childRecords[i].ganttProperties.eOverlapped = false;
                        }
                    }
                }
            }
        }
    };
    // To update the row height when allow overallocation set to false
    ChartRows.prototype.updateDragDropRecords = function (data, tr) {
        var childRecords = data.childRecords;
        var rowIndex = this.parent.currentViewData.indexOf(data);
        var treeGridContentHeight = this.parent.enableRtl ? this.parent['element'].getElementsByClassName('e-content')[2].children[0]['offsetHeight'] :
            this.parent['element'].getElementsByClassName('e-content')[0].children[0]['offsetHeight'];
        if (!tr) {
            tr = this.ganttChartTableBody.childNodes[rowIndex];
        }
        tr['style'].height = this.parent.treeGrid.getRowByIndex(rowIndex)['style'].height = this.parent.rowHeight + 'px';
        this.parent.contentHeight = treeGridContentHeight;
        var rowIDs = [];
        var rowCounts = 0;
        if (data) {
            for (var i = 0; i < childRecords.length; i++) {
                for (var j = i + 1; j < childRecords.length; j++) {
                    var taskbarContainer = tr.getElementsByClassName('e-taskbar-main-container');
                    for (var k = 0; k < taskbarContainer.length; k++) {
                        if (childRecords[i].ganttProperties.startDate.getTime() < childRecords[j].ganttProperties.endDate.getTime() &&
                            childRecords[i].ganttProperties.endDate.getTime() > childRecords[j].ganttProperties.startDate.getTime()) {
                            if (taskbarContainer[k].getAttribute('rowuniqueid') === childRecords[j]['rowUniqueID'] &&
                                rowIDs.indexOf(childRecords[j]['rowUniqueID']) == -1) {
                                rowIDs.push(childRecords[j]['rowUniqueID']);
                                rowCounts++;
                                tr.children[0]['style'].verticalAlign = 'baseline';
                                tr.getElementsByClassName('e-taskbar-main-container')[k]['style'].marginTop = (rowCounts * this.parent.rowHeight) + this.taskBarMarginTop + 'px';
                                tr['style'].height = this.parent.treeGrid.getRowByIndex(rowIndex)['style'].height = parseInt(tr['style'].height) + this.parent.rowHeight + 'px';
                            }
                        }
                        else {
                            if (taskbarContainer[k].getAttribute('rowuniqueid') === childRecords[j]['rowUniqueID'] &&
                                rowIDs.indexOf(childRecords[j]['rowUniqueID']) == -1 && this.parent.rowDragAndDropModule &&
                                this.parent.rowDragAndDropModule['draggedRecord'] && taskbarContainer[k].getAttribute('rowuniqueid') ===
                                this.parent.rowDragAndDropModule['draggedRecord']['rowUniqueID'] && this.parent.rowDragAndDropModule['draggedRecord']['rowUniqueID'] === childRecords[j]['rowUniqueID']) {
                                tr.getElementsByClassName('e-taskbar-main-container')[k]['style'].marginTop =
                                    this.parent.editModule.taskbarEditModule.draggedRecordMarginTop;
                            }
                        }
                    }
                }
            }
            this.parent.contentHeight = treeGridContentHeight;
            document.getElementsByClassName('e-chart-rows-container')[0]['style'].height = this.parent.contentHeight + 'px';
        }
    };
    /**
     * To refresh edited TR
     *
     * @param {number} index .
     * @param {boolean} isValidateRange .
     * @returns {void} .
     * @private
     */
    ChartRows.prototype.refreshRow = function (index, isValidateRange) {
        var tr = this.ganttChartTableBody.childNodes[index];
        var selectedItem = this.parent.currentViewData[index];
        if (index !== -1 && selectedItem) {
            var data = selectedItem;
            if (!this.parent.allowTaskbarOverlap && this.parent.viewType === 'ResourceView' && data.expanded) {
                tr['style'].height = this.parent.treeGrid.getRowByIndex(index)['style'].height = this.parent.rowHeight + 'px';
            }
            if (this.parent.viewType === 'ResourceView' && data.hasChildRecords && !data.expanded && this.parent.enableMultiTaskbar) {
                tr.replaceChild(this.getResourceParent(data).childNodes[0], tr.childNodes[0]);
            }
            else {
                if (this.parent.viewType === 'ResourceView' && this.parent.allowTaskbarDragAndDrop && !data.expanded) {
                    tr.replaceWith(this.getGanttChartRow(index, data));
                }
                else {
                    tr.replaceChild(this.getGanttChartRow(index, data).childNodes[0], tr.childNodes[0]);
                }
            }
            this.parent.renderTemplates();
            if (this.parent.viewType === 'ResourceView' && data.hasChildRecords && this.parent.showOverAllocation && this.parent.allowTaskbarOverlap) {
                if (isValidateRange) {
                    this.parent.ganttChartModule.renderRangeContainer(this.parent.currentViewData);
                }
                else {
                    this.parent.dataOperation.updateOverlappingValues(data);
                    this.parent.ganttChartModule.renderRangeContainer([data]);
                }
            }
            var segmentLength = !isNullOrUndefined(data.ganttProperties.segments) && data.ganttProperties.segments.length;
            if (segmentLength > 0) {
                for (var i = 0; i < segmentLength; i++) {
                    var segmentedTasks = tr.getElementsByClassName('e-segmented-taskbar');
                    var segmentElement = segmentedTasks[i];
                    this.triggerQueryTaskbarInfoByIndex(segmentElement, data);
                }
            }
            else {
                this.triggerQueryTaskbarInfoByIndex(tr, data);
            }
            var dataId = this.parent.viewType === 'ProjectView' ? data.ganttProperties.taskId : data.ganttProperties.rowUniqueID;
            this.parent.treeGrid.grid.setRowData(dataId, data);
            if (this.parent.viewType === 'ResourceView' && data.hasChildRecords && !data.expanded && this.parent.enableMultiTaskbar && !this.parent.allowTaskbarOverlap) {
                this.updateDragDropRecords(selectedItem, tr);
            }
            if (this.parent.viewType === 'ResourceView' && data.hasChildRecords && this.parent.showOverAllocation && !this.parent.allowTaskbarOverlap) {
                this.parent.ganttChartModule.renderRangeContainer(this.parent.currentViewData);
            }
            var nextEditableElement = this.parent.ganttChartModule.tempNextElement;
            if (this.parent.ganttChartModule.isEditableElement && nextEditableElement) {
                this.parent.treeGrid.grid.focusModule.focus();
                addClass([this.parent.treeGrid.getRows()[tr['ariaRowIndex']].children[this.parent.ganttChartModule.childrenIndex]], 'e-focused');
                this.parent.ganttChartModule.tempNextElement = null;
            }
            var row = this.parent.treeGrid.grid.getRowObjectFromUID(this.parent.treeGrid.grid.getDataRows()[index].getAttribute('data-uid'));
            if (!isNullOrUndefined(row)) {
                row.data = data;
            }
        }
    };
    ChartRows.prototype.updateResourceTaskbarElement = function (tRow, parentTr) {
        var cloneElement = tRow.querySelector('.e-taskbar-main-container');
        addClass([cloneElement], 'collpse-parent-border');
        var id = tRow.querySelector('.' + cls.taskBarMainContainer).getAttribute('rowUniqueId');
        var ganttData = this.parent.getRecordByID(id);
        var zIndex = "";
        if (ganttData && !isNullOrUndefined(ganttData.ganttProperties.eOverlapIndex)) {
            zIndex = (ganttData.ganttProperties.eOverlapIndex).toString();
        }
        var cloneChildElement = cloneElement.cloneNode(true);
        cloneChildElement.style.zIndex = zIndex;
        parentTr[0].childNodes[0].childNodes[0].childNodes[0].appendChild(cloneChildElement);
    };
    ChartRows.prototype.getResourceParent = function (record) {
        var chartRows = this.parent.ganttChartModule.getChartRows();
        //Below code is for rendering taskbartemplate in resource view with multi taskbar
        if (this.parent.initialChartRowElements && (!this.parent.allowTaskbarDragAndDrop && this.parent.allowTaskbarOverlap)) {
            for (var j = 0; j < this.parent.initialChartRowElements.length; j++) {
                if (!isNullOrUndefined(chartRows[j])) {
                    if (!isNullOrUndefined(chartRows[j].childNodes[0].childNodes[1].childNodes[2]) &&
                        !isNullOrUndefined(this.parent.initialChartRowElements[j].childNodes[0].childNodes[1].childNodes[2])) {
                        // eslint-disable-next-line
                        chartRows[j].childNodes[0].childNodes[1].childNodes[2]['innerHTML'] = this.parent.initialChartRowElements[j].childNodes[0].childNodes[1].childNodes[2]['innerHTML'];
                    }
                }
            }
        }
        this.templateData = record;
        var parentTrNode = this.getTableTrNode();
        var leftLabelNode = this.leftLabelContainer();
        var collapseParent = createElement('div', {
            className: 'e-collapse-parent'
        });
        parentTrNode[0].childNodes[0].childNodes[0].appendChild(collapseParent);
        var tasks = this.parent.dataOperation.setSortedChildTasks(record);
        this.parent.dataOperation.updateOverlappingIndex(tasks);
        var tRow;
        if (this.parent.enableVirtualization) {
            for (var i = 0; i < record.childRecords.length; i++) {
                tRow = this.getGanttChartRow(record.childRecords[i].index, this.parent.flatData[record.childRecords[i].index]);
                this.updateResourceTaskbarElement(tRow, parentTrNode);
            }
        }
        else {
            for (var i = 0; i < chartRows.length; i++) {
                if (chartRows[i].classList.contains('gridrowtaskId'
                    + record.ganttProperties.rowUniqueID + 'level' + (record.level + 1))) {
                    this.updateResourceTaskbarElement(chartRows[i], parentTrNode);
                }
            }
        }
        parentTrNode[0].childNodes[0].childNodes[0].appendChild([].slice.call(leftLabelNode)[0]);
        return parentTrNode[0].childNodes[0];
    };
    /**
     * To refresh all edited records
     *
     * @param {IGanttData} items .
     * @param {boolean} isValidateRange .
     * @returns {void} .
     * @private
     */
    ChartRows.prototype.refreshRecords = function (items, isValidateRange) {
        if (this.parent.isGanttChartRendered) {
            this.parent.renderTemplates();
            if (this.parent.viewType === 'ResourceView' && this.parent.enableMultiTaskbar) {
                var sortedRecords = [];
                sortedRecords = new DataManager(items).executeLocal(new Query()
                    .sortBy('expanded', 'Descending'));
                items = sortedRecords;
            }
            for (var i = 0; i < items.length; i++) {
                var index = this.parent.currentViewData.indexOf(items[i]);
                this.refreshRow(index, isValidateRange);
            }
            this.parent.ganttChartModule.updateLastRowBottomWidth();
        }
    };
    ChartRows.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off('renderPanels', this.createChartTable);
        this.parent.off('dataReady', this.initiateTemplates);
        this.parent.off('destroy', this.destroy);
    };
    ChartRows.prototype.destroy = function () {
        this.removeEventListener();
    };
    ChartRows.prototype.generateAriaLabel = function (data) {
        data = this.templateData;
        var defaultValue = '';
        var nameConstant = this.parent.localeObj.getConstant('name');
        var startDateConstant = this.parent.localeObj.getConstant('startDate');
        var endDateConstant = this.parent.localeObj.getConstant('endDate');
        var durationConstant = this.parent.localeObj.getConstant('duration');
        var taskNameVal = data.ganttProperties.taskName;
        var startDateVal = data.ganttProperties.startDate;
        var endDateVal = data.ganttProperties.endDate;
        var durationVal = data.ganttProperties.duration;
        if (data.ganttProperties.isMilestone) {
            defaultValue = nameConstant + ' ' + taskNameVal + ' ' + startDateConstant + ' '
                + this.parent.getFormatedDate(startDateVal);
        }
        else {
            if (taskNameVal) {
                defaultValue += nameConstant + ' ' + taskNameVal + ' ';
            }
            if (startDateVal) {
                defaultValue += startDateConstant + ' ' + this.parent.getFormatedDate(startDateVal) + ' ';
            }
            if (endDateVal) {
                defaultValue += endDateConstant + ' ' + this.parent.getFormatedDate(endDateVal) + ' ';
            }
            if (durationVal) {
                defaultValue += durationConstant + ' '
                    + this.parent.getDurationString(durationVal, data.ganttProperties.durationUnit);
            }
        }
        return defaultValue;
    };
    ChartRows.prototype.generateBaselineAriaLabel = function (data) {
        data = this.templateData;
        var defaultValue = '';
        var nameConstant = this.parent.localeObj.getConstant('name');
        var startDateConstant = this.parent.localeObj.getConstant('startDate');
        var endDateConstant = this.parent.localeObj.getConstant('endDate');
        var taskNameVal = data.ganttProperties.taskName;
        var startDateVal = data.ganttProperties.baselineStartDate;
        var endDateVal = data.ganttProperties.baselineEndDate;
        defaultValue += 'Baseline' + ' ';
        defaultValue += nameConstant + ' ' + taskNameVal + ' ';
        defaultValue += startDateConstant + ' ' + this.parent.getFormatedDate(startDateVal) + ' ';
        defaultValue += endDateConstant + ' ' + this.parent.getFormatedDate(endDateVal) + ' ';
        return defaultValue;
    };
    ChartRows.prototype.generateSpiltTaskAriaLabel = function (data, ganttProp) {
        var defaultValue = '';
        var startDateConstant = this.parent.localeObj.getConstant('startDate');
        var endDateConstant = this.parent.localeObj.getConstant('endDate');
        var durationConstant = this.parent.localeObj.getConstant('duration');
        var startDateVal = data.startDate;
        var endDateVal = data.endDate;
        var durationVal = data.duration;
        if (startDateVal) {
            defaultValue += startDateConstant + ' ' + this.parent.getFormatedDate(startDateVal) + ' ';
        }
        if (endDateVal) {
            defaultValue += endDateConstant + ' ' + this.parent.getFormatedDate(endDateVal) + ' ';
        }
        if (durationVal) {
            defaultValue += durationConstant + ' '
                + this.parent.getDurationString(durationVal, ganttProp.durationUnit);
        }
        return defaultValue;
    };
    ChartRows.prototype.generateTaskLabelAriaLabel = function (type) {
        var label = '';
        if (type === 'left' && this.parent.labelSettings.leftLabel && !this.leftTaskLabelTemplateFunction) {
            label += this.parent.localeObj.getConstant('leftTaskLabel') +
                ' ' + this.getTaskLabel(this.parent.labelSettings.leftLabel);
        }
        else if (type === 'right' && this.parent.labelSettings.rightLabel && !this.rightTaskLabelTemplateFunction) {
            label += this.parent.localeObj.getConstant('rightTaskLabel') +
                ' ' + this.getTaskLabel(this.parent.labelSettings.rightLabel);
        }
        return label;
    };
    return ChartRows;
}(DateProcessor));
export { ChartRows };
