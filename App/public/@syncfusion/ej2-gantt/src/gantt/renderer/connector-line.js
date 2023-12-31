import { createElement, isNullOrUndefined, isObject, remove } from '@syncfusion/ej2-base';
import * as cls from '../base/css-constants';
import { isScheduledTask } from '../base/utils';
import { SvgRenderer } from '@syncfusion/ej2-svg-base';
/**
 * To render the connector line in Gantt
 */
var ConnectorLine = /** @class */ (function () {
    function ConnectorLine(ganttObj) {
        this.transform = '';
        this.connectorLinePath = '';
        this.arrowPath = '';
        this.expandedRecords = [];
        this.parent = ganttObj;
        this.dependencyViewContainer =
            createElement('div', { className: cls.dependencyViewContainer,
            });
        Object.assign(this.dependencyViewContainer.style, {
            width: "100%",
            height: "100%",
            zIndex: 2,
            position: "absolute",
            pointerEvents: "none"
        });
        this.renderer = new SvgRenderer(this.parent.element.id);
        this.initPublicProp();
        this.svgObject = this.renderer.createSvg({
            id: this.parent.element.id + '_svg'
        });
        this.svgObject.setAttribute('height', '100%');
        this.svgObject.setAttribute('width', '100%');
    }
    /**
     * To get connector line gap.
     *
     * @param {IConnectorLineObject} data .
     * @returns {number} .
     * @private
     */
    ConnectorLine.prototype.getconnectorLineGap = function (data) {
        var width = 0;
        width = (data.milestoneChild ?
            ((this.parent.chartRowsModule.milestoneMarginTop / 2) + (this.parent.chartRowsModule.milestoneHeight / 2)) :
            ((this.parent.chartRowsModule.taskBarMarginTop / 2) + (this.parent.chartRowsModule.taskBarHeight / 2)));
        return width;
    };
    /**
     * To initialize the public property.
     *
     * @returns {void}
     * @private
     */
    ConnectorLine.prototype.initPublicProp = function () {
        this.lineColor = this.parent.connectorLineBackground;
        this.lineStroke = (this.parent.connectorLineWidth) > 4 ? 4 : this.parent.connectorLineWidth;
        this.createConnectorLineTooltipTable();
    };
    ConnectorLine.prototype.getTaskbarMidpoint = function (isMilestone) {
        return Math.floor(isMilestone ?
            (this.parent.chartRowsModule.milestoneMarginTop + (this.parent.chartRowsModule.milestoneHeight / 2)) + 1 :
            (this.parent.chartRowsModule.taskBarMarginTop + (this.parent.chartRowsModule.taskBarHeight / 2))) + 1;
    };
    /**
     * To connector line object collection.
     *
     * @param {IGanttData} parentGanttData .
     * @param {IGanttData} childGanttData .
     * @param {IPredecessor}  predecessor .
     * @returns {void}
     * @private
     */
    ConnectorLine.prototype.createConnectorLineObject = function (parentGanttData, childGanttData, predecessor) {
        var connectorObj = {};
        var updatedRecords = this.parent.pdfExportModule && this.parent.pdfExportModule.isPdfExport ?
            this.parent.flatData : this.expandedRecords;
        var parentIndex = updatedRecords.indexOf(parentGanttData);
        var childIndex = updatedRecords.indexOf(childGanttData);
        var parentGanttRecord = parentGanttData.ganttProperties;
        var childGanttRecord = childGanttData.ganttProperties;
        var currentData = this.parent.virtualScrollModule && this.parent.enableVirtualization ?
            this.parent.currentViewData : this.parent.getExpandedRecords(this.parent.currentViewData);
        connectorObj.parentIndexInCurrentView = currentData.indexOf(parentGanttData);
        connectorObj.childIndexInCurrentView = currentData.indexOf(childGanttData);
        var isVirtualScroll = this.parent.virtualScrollModule && this.parent.enableVirtualization;
        if ((!isVirtualScroll && (connectorObj.parentIndexInCurrentView === -1 || connectorObj.childIndexInCurrentView === -1)) ||
            connectorObj.parentIndexInCurrentView === -1 && connectorObj.childIndexInCurrentView === -1) {
            return null;
        }
        else {
            connectorObj.parentLeft = parentGanttRecord.isMilestone ?
                parentGanttRecord.left - (this.parent.chartRowsModule.milestoneHeight / 2) : parentGanttRecord.left;
            connectorObj.childLeft = childGanttRecord.isMilestone ?
                childGanttRecord.left - (this.parent.chartRowsModule.milestoneHeight / 2) : childGanttRecord.left;
            connectorObj.parentWidth = parentGanttRecord.width === 0 || parentGanttRecord.isMilestone ?
                (Math.floor(this.parent.chartRowsModule.milestoneHeight)) : parentGanttRecord.width;
            connectorObj.childWidth = childGanttRecord.width === 0 || childGanttRecord.isMilestone ?
                (Math.floor(this.parent.chartRowsModule.milestoneHeight)) : childGanttRecord.width;
            connectorObj.parentIndex = parentIndex;
            connectorObj.childIndex = childIndex;
            var rowHeight = !isNullOrUndefined(this.parent.ganttChartModule.getChartRows()) && this.parent.ganttChartModule.getChartRows()[0] &&
                this.parent.ganttChartModule.getChartRows()[0].getBoundingClientRect().height;
            connectorObj.rowHeight = rowHeight && !isNaN(rowHeight) ? rowHeight : this.parent.rowHeight;
            connectorObj.type = predecessor.type;
            var parentId = this.parent.viewType === 'ResourceView' ? parentGanttRecord.taskId : parentGanttRecord.rowUniqueID;
            var childId = this.parent.viewType === 'ResourceView' ? childGanttRecord.taskId : childGanttRecord.rowUniqueID;
            connectorObj.connectorLineId = 'parent' + parentId + 'child' + childId;
            connectorObj.milestoneParent = parentGanttRecord.isMilestone ? true : false;
            connectorObj.milestoneChild = childGanttRecord.isMilestone ? true : false;
            connectorObj.parentEndPoint = connectorObj.parentLeft + connectorObj.parentWidth;
            connectorObj.childEndPoint = connectorObj.childLeft + connectorObj.childWidth;
            if (isNullOrUndefined(isScheduledTask(parentGanttRecord)) || isNullOrUndefined(isScheduledTask(childGanttRecord))) {
                return null;
            }
            else {
                return connectorObj;
            }
        }
    };
    /**
     * To render connector line.
     *
     * @param {IConnectorLineObject} connectorLinesCollection .
     * @returns {void}
     * @private
     */
    ConnectorLine.prototype.renderConnectorLines = function (connectorLinesCollection) {
        var connectorLine = '';
        var ariaConnector = [];
        for (var index = 0; index < connectorLinesCollection.length; index++) {
            connectorLine = connectorLine + this.getConnectorLineTemplate(connectorLinesCollection[index]);
            ariaConnector.push(connectorLinesCollection[index]);
        }
        this.svgObject.innerHTML = connectorLine;
        var childNodes = this.parent.connectorLineModule.svgObject.childNodes;
        for (var i = 0; i < childNodes.length; i++) {
            var innerChild = childNodes[i].childNodes;
            for (var j = 0; j < innerChild.length; j++) {
                var ariaString = 'Connector Line ' + this.parent.connectorLineModule.generateAriaLabel(ariaConnector[i]);
                innerChild[j].setAttribute('aria-label', ariaString);
            }
        }
        this.parent.ganttChartModule.chartBodyContent.insertBefore(this.dependencyViewContainer, this.parent.ganttChartModule.chartBodyContent.lastChild);
        this.dependencyViewContainer.appendChild(this.svgObject);
        for (var i = 0; i < this.svgObject.children.length; i++) {
            this.svgObject.children[i].children[0].setAttribute('tabindex', '-1');
        }
    };
    /**
     * To get parent position.
     *
     * @param {IConnectorLineObject} data .
     * @returns {void}
     * @private
     */
    ConnectorLine.prototype.getParentPosition = function (data) {
        if (data.parentIndex < data.childIndex) {
            if (data.type === 'FF') {
                if ((data.childLeft + data.childWidth) >= (data.parentLeft + data.parentWidth)) {
                    return 'FFType2';
                }
                else {
                    return 'FFType1';
                }
            }
            else if ((data.parentLeft < data.childLeft) && (data.childLeft > (data.parentLeft + data.parentWidth + 25))) {
                if (data.type === 'FS') {
                    return 'FSType1';
                }
                if (data.type === 'SF') {
                    return 'SFType1';
                }
                else if (data.type === 'SS') {
                    return 'SSType2';
                }
                else if (data.type === 'FF') {
                    return 'FFType2';
                }
            }
            else if ((data.parentLeft < data.childLeft && (data.childLeft < (data.parentLeft + data.parentWidth)))
                || (data.parentLeft === data.childLeft || data.parentLeft > data.childLeft)) {
                if (data.parentLeft > (data.childLeft + data.childWidth + 25)) {
                    if (data.type === 'SF') {
                        return 'SFType2';
                    }
                }
                if (data.parentLeft > data.childLeft) {
                    if (data.type === 'SS') {
                        return 'SSType1';
                    }
                    if (data.type === 'SF') {
                        return 'SFType1';
                    }
                    if (data.type === 'FF') {
                        return 'FFType1';
                    }
                }
                else if ((data.childLeft + data.childWidth) > (data.parentLeft + data.parentWidth)) {
                    if (data.type === 'FF') {
                        return 'FFType2';
                    }
                }
                if (data.type === 'FS') {
                    return 'FSType2';
                }
                else if (data.type === 'SS') {
                    return 'SSType2';
                }
                else if (data.type === 'FF') {
                    return 'FFType1';
                }
                else if (data.type === 'SF') {
                    return 'SFType1';
                }
            }
            else if ((data.parentLeft) < data.childLeft) {
                if (data.type === 'FS') {
                    return 'FSType2';
                }
                else if (data.type === 'FF') {
                    return 'FFType2';
                }
                else if (data.type === 'SS') {
                    return 'SSType2';
                }
                else if (data.type === 'SF') {
                    return 'SFType1';
                }
            }
        }
        else if (data.parentIndex > data.childIndex) {
            if ((data.parentLeft < data.childLeft) && (data.childLeft > (data.parentLeft + data.parentWidth))) {
                if (data.type === 'FS') {
                    if (30 >= (data.childLeft - (data.milestoneParent ?
                        (data.parentLeft + data.parentWidth + 4) : (data.parentLeft + data.parentWidth)))) {
                        return 'FSType3';
                    }
                    else {
                        return 'FSType4';
                    }
                }
                if (data.parentLeft < data.childLeft || ((data.childLeft + data.childWidth) > (data.parentLeft + data.parentWidth))) {
                    if (data.type === 'SS') {
                        return 'SSType4';
                    }
                    if (data.type === 'FF') {
                        return 'FFType4';
                    }
                    if (data.type === 'SF') {
                        return 'SFType4';
                    }
                    // eslint-disable-next-line
                }
                else if ((data.childLeft + data.childWidth) > (data.parentLeft + data.parentWidth)) {
                    if (data.type === 'FF') {
                        return 'FFType4';
                    }
                }
            }
            else if ((data.parentLeft < data.childLeft && (data.childLeft < (data.parentLeft + data.parentWidth)))
                || (data.parentLeft === data.childLeft || data.parentLeft > data.childLeft)) {
                if ((data.childLeft + data.childWidth) <= (data.parentLeft + data.parentWidth)) {
                    if (data.type === 'FF') {
                        return 'FFType3';
                    }
                    if (data.type === 'SF') {
                        if ((data.childLeft + data.childWidth + 25) < (data.parentLeft)) {
                            return 'SFType3';
                        }
                        else {
                            return 'SFType4';
                        }
                    }
                    if (data.type === 'SS') {
                        if (data.childLeft <= data.parentLeft) {
                            return 'SSType3';
                        }
                        else {
                            return 'SSType4';
                        }
                    }
                }
                else if ((data.childLeft + data.childWidth) > (data.parentLeft + data.parentWidth)) {
                    if (data.type === 'FF') {
                        return 'FFType4';
                    }
                    if (data.type === 'SF') {
                        return 'SFType4';
                    }
                    if (data.type === 'SS') {
                        if (data.childLeft <= data.parentLeft) {
                            return 'SSType3';
                        }
                        else {
                            return 'SSType4';
                        }
                    }
                }
                if (data.type === 'FS') {
                    return 'FSType3';
                }
            }
            else if (data.parentLeft < data.childLeft) {
                if (data.type === 'FS') {
                    return 'FSType3';
                }
                if (data.type === 'SS') {
                    return 'SSType4';
                }
                if (data.type === 'FF') {
                    return 'FFType4';
                }
                if (data.type === 'SF') {
                    return 'SFType4';
                }
            }
        }
        return null;
    };
    /**
     * To get line height.
     *
     * @param {IConnectorLineObject} data .
     * @returns {void}
     * @private
     */
    ConnectorLine.prototype.getHeightValue = function (data) {
        if (this.parent.viewType === 'ResourceView' && this.parent.showOverAllocation && !this.parent.allowTaskbarOverlap) {
            return (data.parentIndex * this.parent.rowHeight) > (data.childIndex * this.parent.rowHeight) ?
                ((data.parentIndex * this.parent.rowHeight) - (data.childIndex * this.parent.rowHeight)) :
                ((data.childIndex * this.parent.rowHeight) - (data.parentIndex * this.parent.rowHeight));
        }
        else {
            return (data.parentIndex * data.rowHeight) > (data.childIndex * data.rowHeight) ?
                ((data.parentIndex * data.rowHeight) - (data.childIndex * data.rowHeight)) :
                ((data.childIndex * data.rowHeight) - (data.parentIndex * data.rowHeight));
        }
    };
    /**
     * To get sstype2 inner element width.
     *
     * @param {IConnectorLineObject} data .
     * @returns {void}
     * @private
     */
    ConnectorLine.prototype.getInnerElementWidthSSType2 = function (data) {
        if (data.parentLeft === data.childLeft) {
            return 10;
        }
        return (data.childLeft - data.parentLeft);
    };
    /**
     * To get sstype2 inner element left.
     *
     * @param {IConnectorLineObject} data .
     * @returns {void}
     * @private
     */
    ConnectorLine.prototype.getInnerElementLeftSSType2 = function (data) {
        if (data.parentLeft === data.childLeft) {
            return (data.parentLeft - 20);
        }
        return (data.parentLeft - 10);
    };
    /**
     * To get sstype2 inner child element width.
     *
     * @param {IConnectorLineObject} data .
     * @returns {void}
     * @private
     */
    ConnectorLine.prototype.getInnerChildWidthSSType2 = function (data) {
        if ((data.parentLeft + data.parentWidth) < data.childLeft) {
            return 10;
        }
        if (data.parentLeft === data.childLeft) {
            return 20;
        }
        if ((data.parentLeft + data.parentWidth) >= data.childLeft) {
            return 10;
        }
        return (data.childLeft - data.parentLeft);
    };
    ConnectorLine.prototype.getBorderStyles = function (cssType, unit) {
        var borderWidth = 'border-' + cssType + '-width:' + unit + 'px;';
        var borderStyle = 'border-' + cssType + '-style:solid;';
        var borderColor = !isNullOrUndefined(this.lineColor) ? 'border-' + cssType + '-color:' + this.lineColor + ';' : '';
        return (borderWidth + borderStyle + borderColor);
    };
    /**
     * To get connector line template.
     *
     * @param {IConnectorLineObject} data .
     * @returns {void}
     * @private
     */
    ConnectorLine.prototype.getConnectorLineTemplate = function (data) {
        var setInnerChildWidthSSType2 = this.getInnerChildWidthSSType2(data);
        var setInnerElementWidthSSType2 = this.getInnerElementWidthSSType2(data);
        var setInnerElementLeftSSType2 = this.getInnerElementLeftSSType2(data);
        var height = this.getHeightValue(data);
        var isMilestoneParent = data.milestoneParent ? true : false;
        var isMilestone = data.milestoneChild ? true : false;
        var connectorContainer = '';
        var isVirtual = this.parent.virtualScrollModule && this.parent.enableVirtualization;
        var connectorLine = this.getPosition(data, this.getParentPosition(data), height);
        var rowPosition = this.getPosition(data, this.getParentPosition(data), height);
        var rowPositionHeight = rowPosition.top;
        var isMilestoneValue = 0;
        if (this.parent.renderBaseline) {
            isMilestoneValue = (data.milestoneParent && data.milestoneChild) ? 0 : data.milestoneParent ? -5 : data.milestoneChild ? 5 : 0;
        }
        var heightValue = isVirtual ? connectorLine.height : (height + isMilestoneValue);
        var borderTopWidth = 0;
        var addTop = 0;
        var parentOverlapTopValue = 0;
        var childOverlapTopValue = 0;
        var count = 0;
        if (this.parent.viewType === 'ResourceView' && this.parent.showOverAllocation && !this.parent.allowTaskbarOverlap) {
            for (var i = 0; i < this.parent.currentViewData.length; i++) {
                if (this.parent.getRowByIndex(i).style.display != 'none') {
                    if (count < data.parentIndex) {
                        count++;
                        parentOverlapTopValue = parentOverlapTopValue + this.parent.getRowByIndex(i).offsetHeight;
                    }
                }
            }
            count = 0;
            for (var j = 0; j < this.parent.currentViewData.length; j++) {
                if (this.parent.getRowByIndex(j).style.display != 'none') {
                    if (count < data.childIndex) {
                        count++;
                        childOverlapTopValue = childOverlapTopValue + this.parent.getRowByIndex(j).offsetHeight;
                    }
                }
            }
            heightValue = Math.abs(parentOverlapTopValue - childOverlapTopValue);
        }
        if (this.parent.currentViewData[data.parentIndex] && this.parent.currentViewData[data.childIndex] && this.parent.allowParentDependency) {
            var fromRecordIsParent = this.parent.currentViewData[data.parentIndex].hasChildRecords;
            var toRecordIsParent = this.parent.currentViewData[data.childIndex].hasChildRecords;
            var fromRecordIsManual = this.parent.currentViewData[data.parentIndex].ganttProperties.isAutoSchedule;
            var toRecordIsManual = this.parent.currentViewData[data.childIndex].ganttProperties.isAutoSchedule;
            var isValid = true;
            if (((fromRecordIsParent && fromRecordIsManual) && !toRecordIsParent) || ((toRecordIsParent && toRecordIsManual) &&
                !fromRecordIsParent) || (fromRecordIsParent && fromRecordIsManual && toRecordIsManual && toRecordIsParent)
                || (!fromRecordIsParent && !toRecordIsParent)) {
                isValid = false;
            }
            if (isValid) {
                if (((fromRecordIsParent && !fromRecordIsManual) && (toRecordIsParent && !toRecordIsManual))) {
                    addTop = -11;
                }
                else if (!((fromRecordIsParent && !fromRecordIsManual) && (toRecordIsParent && !toRecordIsManual))) {
                    if (data.childIndex > data.parentIndex) {
                        if (!fromRecordIsParent && toRecordIsParent) {
                            borderTopWidth = -11;
                        }
                        else {
                            borderTopWidth = 11;
                            addTop = -11;
                        }
                    }
                    else {
                        if ((fromRecordIsParent && !toRecordIsParent)) {
                            borderTopWidth = -11;
                        }
                        else {
                            borderTopWidth = 11;
                            addTop = -11;
                        }
                    }
                }
                if (this.parent.currentViewData[data.parentIndex].ganttProperties.isMilestone) {
                    if (data.parentIndex > data.childIndex) {
                        addTop = -11;
                        borderTopWidth = 12;
                    }
                    else if (data.type === 'SS' || data.type === 'FF') {
                        addTop = -5;
                    }
                }
                else if (this.parent.currentViewData[data.childIndex].ganttProperties.isMilestone) {
                    if (data.parentIndex > data.childIndex) {
                        addTop = 5;
                        borderTopWidth = -10;
                    }
                    else if (data.parentIndex < data.childIndex) {
                        if (data.type === 'SS' || data.type === 'FF') {
                            addTop = -10;
                        }
                    }
                }
                else {
                    if (data.parentIndex < data.childIndex && fromRecordIsManual && !toRecordIsManual) {
                        addTop = 0;
                        borderTopWidth = -11;
                    }
                    else if (data.childIndex < data.parentIndex && !fromRecordIsManual && toRecordIsManual) {
                        addTop = 0;
                        borderTopWidth = -11;
                    }
                }
            }
        }
        if (this.getParentPosition(data)) {
            // Create the group element
            this.transform = this.parent.enableRtl ? "translate(" + this.parent.timelineModule.totalTimelineWidth + ", 0) scale(-1, 1)" : '';
            this.connectorId = "ConnectorLine" + data.connectorLineId;
            this.groupObject = this.renderer.createGroup({
                id: this.connectorId,
                transform: this.transform,
                style: 'pointer-events: stroke',
                class: cls.connectorLineContainer,
            });
            //  Create the path element for the connector line
            this.connectorPath = this.renderer.drawPath({
                class: cls.connectorLineSVG,
                d: this.connectorLinePath,
                fill: 'transparent',
                "stroke-width": 1,
            });
            // Create the path element for the arrow
            this.arrowlinePath = this.renderer.drawPath({
                d: this.arrowPath,
                class: cls.connectorLineArrow
            });
            // Append the path element to the group element
            this.groupObject.appendChild(this.connectorPath);
            this.groupObject.appendChild(this.arrowlinePath);
            if (this.getParentPosition(data) === 'FSType1') {
                this.taskLineValue = data.milestoneChild ? 1 : 0;
                this.x1 = data.parentEndPoint + (data.milestoneParent ? -1 : (data.milestoneChild ? -1 : 0));
                this.x2 = data.milestoneParent ? ((((data.childLeft - (data.parentLeft + data.parentWidth + 10)) + this.lineStroke) - 10) + 1) : (((data.childLeft - (data.parentLeft + data.parentWidth + 10)) + this.lineStroke) - 10);
                this.y1 = (this.parent.enableVirtualization ? rowPositionHeight : ((!this.parent.allowTaskbarOverlap ? parentOverlapTopValue : (data.parentIndex * data.rowHeight)) + addTop + this.getTaskbarMidpoint(isMilestone) - (this.lineStroke - 1) - isMilestoneValue));
                this.y2 = heightValue + this.taskLineValue + borderTopWidth - this.lineStroke;
                this.connectorLinePath = "M " + this.x1 + " " + (this.y1) + " L " + (this.x1 + this.x2) + " " + (this.y1) + " L " + (this.x1 + this.x2) + " " + (this.y1 + this.y2) +
                    " L " + (this.x1 + this.x2 + 12) + " " + (this.y1 + this.y2);
                this.arrowPath = "M " + (this.x1 + this.x2 + 20) + " " + (this.y1 + this.y2) +
                    " L " + (this.x1 + this.x2 + 12) + " " + (this.y1 + this.y2 - (4 + this.lineStroke)) +
                    " L " + (this.x1 + this.x2 + 12) + " " + (this.y1 + this.y2 + 4) + " Z";
            }
            if (this.getParentPosition(data) === 'FSType2') {
                this.x1 = data.parentLeft;
                this.x2 = data.parentWidth + (data.milestoneParent ? -1 : 0);
                this.x3 = this.x2 + (data.milestoneParent ? 11 : 10);
                this.x4 = data.parentWidth - ((data.parentEndPoint - data.childLeft) + 20);
                this.y1 = (this.parent.enableVirtualization ? rowPositionHeight : ((!this.parent.allowTaskbarOverlap ? parentOverlapTopValue : (data.parentIndex * data.rowHeight)) + addTop + this.getTaskbarMidpoint(isMilestone) - (this.lineStroke - 1) - isMilestoneValue));
                this.y2 = heightValue + borderTopWidth - this.getconnectorLineGap(data) - this.lineStroke;
                this.y3 = this.getconnectorLineGap(data);
                this.y4 = (!this.parent.allowTaskbarOverlap ? childOverlapTopValue : (this.y1 + this.y2 - ((this.y1 + this.y2) % data.rowHeight)));
                this.connectorLinePath = "M " + (this.x1 + this.x2) + " " + (this.y1) + " " + " L " + (this.x1 + this.x3) + " " + (this.y1) + " L " + (this.x1 + this.x3) + " " + this.y4 +
                    " L " + (this.x1 + this.x4) + " " + this.y4 + " L " + (this.x1 + this.x4) + " " + (this.y1 + this.y2 + this.y3) + " L " + (this.x1 + this.x4 + 12) + " " + (this.y1 + this.y2 + this.y3);
                this.arrowPath = "M " + (this.x1 + this.x4 + 20) + " " + (this.y1 + this.y2 + this.y3) +
                    " L " + (this.x1 + this.x4 + 12) + " " + (this.y1 + this.y2 + this.y3 - (4 + this.lineStroke)) +
                    " L " + (this.x1 + this.x4 + 12) + " " + (this.y1 + this.y2 + this.y3 + 4 + this.lineStroke) + " Z";
            }
            if (this.getParentPosition(data) === 'FSType3') {
                this.taskLineValue = data.milestoneChild ? 1 : 0;
                this.point1 = (this.parent.enableVirtualization ? rowPositionHeight : ((!this.parent.allowTaskbarOverlap ? childOverlapTopValue : (data.childIndex * data.rowHeight)) + addTop + this.getTaskbarMidpoint(isMilestoneParent) - (this.lineStroke - 1) - isMilestoneValue));
                this.x1 = (data.childLeft + (data.milestoneChild ? -1 : 0) + (data.milestoneParent ? 1 : 0)) - 20;
                this.x2 = (data.parentEndPoint - data.childLeft) + 30;
                this.y1 = this.point1 + (this.parent.renderBaseline ? (data.milestoneChild && !(data.milestoneParent) ? 11 : data.milestoneParent && !(data.milestoneChild) ? -12 : 0) : 0);
                this.y2 = this.point1 + heightValue + borderTopWidth - this.getconnectorLineGap(data) - this.lineStroke + this.taskLineValue;
                this.y3 = this.getconnectorLineGap(data);
                this.y4 = this.y2 - (this.y2 % data.rowHeight);
                this.connectorLinePath = "M " + (this.x1 + 12) + " " + (this.y1) + " L " + this.x1 + " " + (this.y1) + " L " + this.x1 + " " + this.y4 +
                    " L " + (this.x1 + this.x2) + " " + this.y4 + " L " + (this.x1 + this.x2) + " " + (this.y2 + this.y3) + " L " + (this.x1 + this.x2 - 12) + " " + (this.y2 + this.y3);
                this.arrowPath = "M " + (this.x1 + 20) + " " + (this.y1) +
                    " L " + (this.x1 + 12) + " " + (this.y1 - (4 + this.lineStroke)) +
                    " L " + (this.x1 + 12) + " " + (this.y1 + 4 + this.lineStroke) + " Z";
            }
            if (this.getParentPosition(data) === 'FSType4') {
                this.point1 = (this.parent.enableVirtualization ? rowPositionHeight : ((!this.parent.allowTaskbarOverlap ? childOverlapTopValue : (data.childIndex * data.rowHeight)) + addTop + this.getTaskbarMidpoint(isMilestone) - (this.lineStroke - 1)));
                this.taskLineValue = this.parent.renderBaseline ? this.taskLineValue : 0;
                this.x1 = data.parentEndPoint + (data.milestoneChild ? -1 : 0) + (data.milestoneParent ? 1 : 0);
                this.x2 = data.childLeft - data.parentEndPoint - 20;
                this.y1 = this.point1 + (data.milestoneChild ? -1 : 0);
                this.y2 = this.point1 + heightValue + borderTopWidth - this.lineStroke + 1 + this.taskLineValue + (this.parent.renderBaseline ? (data.milestoneChild && !(data.milestoneParent) ? -12 : data.milestoneParent && !(data.milestoneChild) ? 11 : 0) : 0);
                this.connectorLinePath = "M " + (this.x1 + this.x2 + 12) + " " + (this.y1) + " L " + (this.x1 + this.x2) + " " + (this.y1) + " L " + (this.x1 + this.x2) + " " + this.y2 +
                    " L " + this.x1 + " " + this.y2;
                this.arrowPath = "M " + (this.x1 + this.x2 + 20) + " " + (this.y1) +
                    " L " + (this.x1 + this.x2 + 12) + " " + (this.y1 - (4 + this.lineStroke)) +
                    " L " + (this.x1 + this.x2 + 12) + " " + (this.y1 + 4 + this.lineStroke) + " Z";
            }
            if (this.getParentPosition(data) === 'SSType4') {
                this.taskLineValue = this.parent.renderBaseline ? this.taskLineValue : 0;
                this.point1 = heightValue + this.taskLineValue + borderTopWidth;
                this.point2 = (this.parent.enableVirtualization ? rowPositionHeight : ((!this.parent.allowTaskbarOverlap ? childOverlapTopValue : (data.childIndex * data.rowHeight)) + addTop + this.getTaskbarMidpoint(isMilestone) - (this.lineStroke - 1)));
                this.x1 = data.parentLeft - 10;
                this.x2 = data.childLeft - data.parentLeft;
                this.y1 = this.point2 + (data.milestoneChild ? 1 : 0);
                this.y2 = this.y1 + this.point1 + (this.parent.renderBaseline ? (data.milestoneParent && !(data.milestoneChild) ? 10 : data.milestoneChild && !(data.milestoneParent) ? -13 : 0) : 0);
                this.connectorLinePath = "M " + (this.x1 + this.x2) + " " + (this.y1) + " L " + this.x1 + " " + (this.y1) +
                    " L " + this.x1 + " " + this.y2 + " L " + (this.x1 + 10) + " " + this.y2;
                this.arrowPath = "M " + (this.x1 + this.x2 + 8) + " " + (this.y1) +
                    " L " + (this.x1 + this.x2) + " " + (this.y1 - (4 + this.lineStroke)) +
                    " L " + (this.x1 + this.x2) + " " + (this.y1 + 4 + this.lineStroke) + " Z";
            }
            if (this.getParentPosition(data) === 'SSType3') {
                this.taskLineValue = this.parent.renderBaseline ? this.taskLineValue : data.milestoneChild ? 1 : 0;
                this.point1 = heightValue + this.taskLineValue + borderTopWidth - (this.lineStroke - 1);
                this.x1 = data.childLeft - 20;
                this.y1 = (data.milestoneChild ? 1 : 0) + (this.parent.enableVirtualization ? rowPositionHeight : ((!this.parent.allowTaskbarOverlap ? childOverlapTopValue : (data.childIndex * data.rowHeight)) + addTop + this.getTaskbarMidpoint(isMilestone) - (this.lineStroke - 1)));
                this.x2 = data.parentLeft - data.childLeft + 21;
                this.y2 = this.y1 + this.point1 + (this.parent.renderBaseline ? (data.milestoneChild && !(data.milestoneParent) ? -11 : data.milestoneParent && !(data.milestoneChild) ? 10 : 0) : 0);
                this.connectorLinePath = "M " + (this.x1 + 12) + " " + (this.y1) + " L " + this.x1 + " " + (this.y1) +
                    " L " + this.x1 + " " + this.y2 + " L " + (this.x1 + this.x2) + " " + this.y2;
                this.arrowPath = "M " + (this.x1 + 20) + " " + (this.y1) +
                    " L " + (this.x1 + 12) + " " + (this.y1 - (4 + this.lineStroke)) +
                    " L " + (this.x1 + 12) + " " + (this.y1 + 4 + this.lineStroke) + " Z";
            }
            if (this.getParentPosition(data) === 'SSType2') {
                this.taskLineValue = this.parent.renderBaseline ? this.taskLineValue : data.milestoneChild ? 1 : 0;
                this.point1 = heightValue + this.taskLineValue + borderTopWidth - this.lineStroke;
                this.x1 = setInnerElementLeftSSType2;
                this.x2 = setInnerChildWidthSSType2 + 1;
                this.y1 = (this.parent.enableVirtualization ? rowPositionHeight : ((!this.parent.allowTaskbarOverlap ? parentOverlapTopValue : (data.parentIndex * data.rowHeight)) + addTop + this.getTaskbarMidpoint(isMilestoneParent) - (this.lineStroke - 1)));
                this.y2 = this.y1 + this.point1;
                this.connectorLinePath = "M " + (this.x1 + this.x2) + " " + (this.y1) + " L " + this.x1 + " " + (this.y1) + " L " + this.x1 + " " + this.y2 +
                    " L " + (this.x1 + setInnerElementWidthSSType2) + " " + this.y2;
                this.arrowPath = "M " + (this.x1 + setInnerElementWidthSSType2 + 8) + " " + (this.y2) +
                    " L " + (this.x1 + setInnerElementWidthSSType2) + " " + (this.y2 - (4 + this.lineStroke)) +
                    " L " + (this.x1 + setInnerElementWidthSSType2) + " " + (this.y2 + 4 + this.lineStroke) + " Z";
            }
            if (this.getParentPosition(data) === 'SSType1') {
                this.taskLineValue = this.parent.renderBaseline ? this.taskLineValue : data.milestoneChild ? 1 : 0;
                this.point1 = heightValue + this.taskLineValue + borderTopWidth - this.lineStroke;
                this.x1 = data.childLeft - 20;
                this.x2 = data.parentLeft - data.childLeft + 21;
                this.y1 = (this.parent.enableVirtualization ? rowPositionHeight : ((!this.parent.allowTaskbarOverlap ? parentOverlapTopValue : (data.parentIndex * data.rowHeight)) + addTop + this.getTaskbarMidpoint(isMilestoneParent) - (this.lineStroke - 1)));
                this.y2 = this.y1 + this.point1;
                this.connectorLinePath = "M " + (this.x1 + this.x2) + " " + (this.y1) + " L " + this.x1 + " " + (this.y1) + " L " + this.x1 + " " + this.y2 +
                    " L " + (this.x1 + 12) + " " + this.y2;
                this.arrowPath = "M " + (this.x1 + 20) + " " + (this.y2) +
                    " L " + (this.x1 + 12) + " " + (this.y2 - (4 + this.lineStroke)) +
                    " L " + (this.x1 + 12) + " " + (this.y2 + 4 + this.lineStroke) + " Z";
            }
            if (this.getParentPosition(data) === 'FFType1') {
                this.taskLineValue = this.parent.renderBaseline ? this.taskLineValue : (data.milestoneChild ? 1 : 0);
                this.x1 = data.childEndPoint;
                this.x2 = data.parentEndPoint + (data.milestoneParent ? -1 : 0);
                this.x3 = data.milestoneParent ? 22 : 21;
                this.x4 = data.milestoneChild ? 4 : 8;
                this.y1 = (this.parent.enableVirtualization ? rowPositionHeight : ((!this.parent.allowTaskbarOverlap ? parentOverlapTopValue : (data.parentIndex * data.rowHeight)) + addTop + this.getTaskbarMidpoint(isMilestoneParent) - (this.lineStroke - 1)));
                this.y2 = heightValue + this.taskLineValue + borderTopWidth - this.lineStroke;
                this.connectorLinePath = "M " + this.x2 + " " + (this.y1) + " L " + (this.x2 + this.x3) + " " + (this.y1) + " L " + (this.x2 + this.x3) + " " + (this.y1 + this.y2) +
                    " L " + (this.x1 + this.x4) + " " + (this.y1 + this.y2);
                this.arrowPath = "M " + this.x1 + " " + (this.y1 + this.y2) +
                    " L " + (this.x1 + 8) + " " + (this.y1 + this.y2 - (4 + this.lineStroke)) +
                    " L " + (this.x1 + 8) + " " + (this.y1 + this.y2 + 4 + this.lineStroke) + " Z";
            }
            if (this.getParentPosition(data) === 'FFType2') {
                this.taskLineValue = this.parent.renderBaseline ? this.taskLineValue : (data.milestoneChild ? 1 : 0);
                this.x1 = data.parentEndPoint;
                this.x2 = data.childEndPoint + (data.milestoneParent ? 22 : 21);
                this.x3 = data.childEndPoint + (data.milestoneChild ? 9 : 8);
                this.y1 = (this.parent.enableVirtualization ? rowPositionHeight : ((!this.parent.allowTaskbarOverlap ? parentOverlapTopValue : (data.parentIndex * data.rowHeight)) + addTop + this.getTaskbarMidpoint(data.milestoneParent) - (this.lineStroke - 1)));
                this.y2 = heightValue + this.taskLineValue + borderTopWidth - this.lineStroke;
                this.connectorLinePath = "M " + this.x1 + " " + (this.y1) + " L " + this.x2 + " " + (this.y1) + " L " + this.x2 + " " + (this.y1 + this.y2) +
                    " L " + this.x3 + " " + (this.y1 + this.y2);
                this.arrowPath = "M " + (this.x3 - 8) + " " + (this.y1 + this.y2) +
                    " L " + this.x3 + " " + (this.y1 + this.y2 - (4 + this.lineStroke)) +
                    " L " + this.x3 + " " + (this.y1 + this.y2 + 4 + this.lineStroke) + " Z";
            }
            if (this.getParentPosition(data) === 'FFType3') {
                this.taskLineValue = this.parent.renderBaseline ? this.taskLineValue : 0;
                this.x1 = data.childEndPoint;
                this.x2 = this.x1 + (data.milestoneChild ? 4 : 8);
                this.x3 = data.parentEndPoint - data.childEndPoint + (data.milestoneChild ? 16 : 10);
                this.x4 = data.parentEndPoint + (data.milestoneParent ? -1 : 0);
                this.y1 = (this.parent.enableVirtualization ? rowPositionHeight : ((!this.parent.allowTaskbarOverlap ? childOverlapTopValue : (data.childIndex * data.rowHeight)) + addTop + this.getTaskbarMidpoint(isMilestone) - (this.lineStroke - 1)));
                this.y2 = heightValue + this.taskLineValue + borderTopWidth - this.lineStroke + (this.parent.renderBaseline ? (data.milestoneParent && !(data.milestoneChild) ? 10 : data.milestoneChild && !(data.milestoneParent) ? -11 : 0) : 0);
                this.connectorLinePath = "M " + this.x2 + " " + (this.y1) + " L " + (this.x2 + this.x3) + " " + (this.y1) + " L " + (this.x2 + this.x3) + " " + (this.y1 + this.y2) +
                    " L " + this.x4 + " " + (this.y1 + this.y2);
                this.arrowPath = "M " + this.x1 + " " + (this.y1) +
                    " L " + (this.x1 + 8) + " " + (this.y1 - (4 + this.lineStroke)) +
                    " L " + (this.x1 + 8) + " " + (this.y1 + 4 + this.lineStroke) + " Z";
            }
            if (this.getParentPosition(data) === 'FFType4') {
                this.taskLineValue = this.parent.renderBaseline ? this.taskLineValue : 0;
                this.x1 = data.parentEndPoint;
                this.x2 = data.childEndPoint + (data.milestoneChild ? 7 : 8);
                this.x3 = this.x2 + (data.milestoneChild ? 12 : 11);
                this.y1 = (this.parent.enableVirtualization ? rowPositionHeight : ((!this.parent.allowTaskbarOverlap ? childOverlapTopValue : (data.childIndex * data.rowHeight)) + addTop + this.getTaskbarMidpoint(isMilestone) - (this.lineStroke - 1)));
                this.y2 = heightValue + this.taskLineValue + borderTopWidth + (this.parent.renderBaseline ? (data.milestoneParent && !(data.milestoneChild) ? 10 : data.milestoneChild && !(data.milestoneParent) ? -12 : 0) : 0) - this.lineStroke + 1;
                this.connectorLinePath = "M " + this.x2 + " " + (this.y1) + " L " + this.x3 + " " + (this.y1) + " L " + this.x3 + " " + (this.y1 + this.y2) +
                    " L " + this.x1 + " " + (this.y1 + this.y2);
                this.arrowPath = "M " + (this.x2 - 8) + " " + (this.y1) +
                    " L " + this.x2 + " " + (this.y1 - (4 + this.lineStroke)) +
                    " L " + this.x2 + " " + (this.y1 + 4 + this.lineStroke) + " Z";
            }
            if (this.getParentPosition(data) === 'SFType4') {
                this.taskLineValue = this.parent.renderBaseline ? this.taskLineValue : (data.milestoneChild ? -1 : 0);
                this.point1 = (this.taskLineValue + heightValue + borderTopWidth - this.getconnectorLineGap(data) - (this.lineStroke - 1));
                this.point2 = (this.parent.enableVirtualization ? rowPositionHeight : ((!this.parent.allowTaskbarOverlap ? childOverlapTopValue : (data.childIndex * data.rowHeight)) + addTop + this.getTaskbarMidpoint(isMilestone) - (this.lineStroke - 1) - isMilestoneValue));
                this.x1 = data.parentLeft - 10;
                this.x2 = this.x1 + ((data.childEndPoint - data.parentLeft) + 18);
                this.x3 = this.x2 + (data.milestoneChild ? 16 : 11);
                this.y1 = this.point2 + (data.milestoneChild ? 2 : 0) + (this.parent.renderBaseline ? (data.milestoneParent ? -5 : 0) : 0);
                this.y2 = this.y1 + this.point1 + (this.parent.renderBaseline ? (data.milestoneChild && !(data.milestoneParent) ? -9 : data.milestoneParent && !(data.milestoneChild) ? 9 : 0) : 0);
                this.y3 = this.getconnectorLineGap(data);
                this.y4 = this.y2 - (this.y2 % data.rowHeight);
                this.connectorLinePath = "M " + this.x2 + " " + (this.y1) + " L " + this.x3 + " " + (this.y1) + " L " + this.x3 + " " + this.y4 + " L " + this.x1 + " " + this.y4 +
                    " L " + this.x1 + " " + (this.y2 + this.y3) + " L " + (this.x1 + 11) + " " + (this.y2 + this.y3);
                this.arrowPath = "M " + (this.x2 - 8) + " " + (this.y1) +
                    " L " + this.x2 + " " + (this.y1 - (4 + this.lineStroke)) +
                    " L " + this.x2 + " " + (this.y1 + 4 + this.lineStroke) + " Z";
            }
            if (this.getParentPosition(data) === 'SFType3') {
                this.taskLineValue = this.parent.renderBaseline ? this.taskLineValue : 0;
                this.point1 = (data.parentLeft - (data.childEndPoint + (data.milestoneParent ? 23 : 20))) + 1;
                this.point2 = (this.parent.enableVirtualization ? rowPositionHeight : ((!this.parent.allowTaskbarOverlap ? childOverlapTopValue : (data.childIndex * data.rowHeight)) + addTop + this.getTaskbarMidpoint(isMilestone) - (this.lineStroke - 1)));
                this.x1 = data.childEndPoint;
                this.x2 = this.x1 + (data.milestoneChild ? 9 : 8);
                this.x3 = this.x2 + (data.milestoneChild ? 17 : 11);
                this.y1 = this.point2;
                this.y2 = this.y1 + heightValue + borderTopWidth - (this.lineStroke - 1) + this.taskLineValue + (this.parent.renderBaseline ? (data.milestoneChild && !(data.milestoneParent) ? -12 : data.milestoneParent && !(data.milestoneChild) ? 10 : 0) : 0);
                this.connectorLinePath = "M " + this.x2 + " " + (this.y1) + " L " + this.x3 + " " + (this.y1) +
                    " L " + this.x3 + " " + this.y2 + " L " + (this.x3 + this.point1) + " " + this.y2;
                this.arrowPath = "M " + (this.x2 - 8) + " " + (this.y1) +
                    " L " + this.x2 + " " + (this.y1 - (4 + this.lineStroke)) +
                    " L " + this.x2 + " " + (this.y1 + 4 + this.lineStroke) + " Z";
            }
            if (this.getParentPosition(data) === 'SFType1') {
                this.taskLineValue = this.parent.renderBaseline ? this.taskLineValue : data.milestoneChild ? 1 : 0;
                this.point1 = heightValue + borderTopWidth - this.getconnectorLineGap(data) + this.taskLineValue - this.lineStroke;
                this.point2 = this.getconnectorLineGap(data);
                this.x1 = data.parentLeft - 10;
                this.y1 = (this.parent.enableVirtualization ? rowPositionHeight : ((!this.parent.allowTaskbarOverlap ? parentOverlapTopValue : (data.parentIndex * data.rowHeight)) + addTop + this.getTaskbarMidpoint(isMilestone) - (this.lineStroke - 1) - isMilestoneValue));
                this.x2 = (data.childEndPoint - data.parentLeft) + 31;
                this.y2 = this.y1 + this.point1;
                this.x3 = (data.childEndPoint - data.parentLeft) + 18;
                this.y3 = this.y2 - (this.y2 % data.rowHeight);
                this.connectorLinePath = "M " + (this.x1 + 11) + " " + (this.y1) + " L " + this.x1 + " " + (this.y1) + " L " + this.x1 + " " + this.y3 +
                    " L " + (this.x1 + this.x2) + " " + this.y3 + " L " + (this.x1 + this.x2) + " " + (this.y2 + this.point2) + " L " + (this.x1 + this.x3) + " " + (this.y2 + this.point2);
                this.arrowPath = "M " + (this.x1 + this.x3 - 8) + " " + (this.y2 + this.point2) +
                    " L " + (this.x1 + this.x3) + " " + (this.y2 + this.point2 - (4 + this.lineStroke)) +
                    " L " + (this.x1 + this.x3) + " " + (this.y2 + this.point2 + 4 + this.lineStroke) + " Z";
            }
            if (this.getParentPosition(data) === 'SFType2') {
                this.taskLineValue = this.parent.renderBaseline ? this.taskLineValue : 0;
                this.x1 = data.childEndPoint;
                this.y1 = (this.parent.enableVirtualization ? rowPositionHeight : ((!this.parent.allowTaskbarOverlap ? parentOverlapTopValue : (data.parentIndex * data.rowHeight)) + addTop + this.getTaskbarMidpoint(isMilestoneParent) - (this.lineStroke - 1)));
                this.x2 = (data.parentLeft - data.childEndPoint);
                this.y2 = this.y1 + heightValue + this.taskLineValue + borderTopWidth - this.lineStroke;
                this.connectorLinePath = "M " + (this.x1 + this.x2 + 1) + " " + (this.y1) + " L " + (this.x1 + this.x2 - 10) + " " + (this.y1) +
                    " L " + (this.x1 + this.x2 - 10) + " " + this.y2 + " L " + (this.x1 + 8) + " " + this.y2;
                this.arrowPath = "M " + this.x1 + " " + (this.y2) +
                    " L " + (this.x1 + 8) + " " + (this.y2 - (4 + this.lineStroke)) +
                    " L " + (this.x1 + 8) + " " + (this.y2 + 4 + this.lineStroke) + " Z";
            }
            this.connectorPath.setAttribute("d", this.connectorLinePath);
            this.arrowlinePath.setAttribute("d", this.arrowPath);
        }
        return this.groupObject.outerHTML;
    };
    /**
     * @param {IConnectorLineObject} data .
     * @param {string} type .
     * @param {number} heightValue .
     * @returns {number} .
     * @private
     */
    ConnectorLine.prototype.getPosition = function (data, type, heightValue) {
        var topPosition = 0;
        var lineHeight = 0;
        if (this.parent.virtualScrollModule && this.parent.enableVirtualization) {
            var isMilestoneParent = data.milestoneParent ? true : false;
            var isMilestone = data.milestoneChild ? true : false;
            var midPointParent = this.getTaskbarMidpoint(isMilestoneParent) - (this.lineStroke - 1);
            var midPoint = this.getTaskbarMidpoint(isMilestone) - (this.lineStroke - 1);
            var isParentIndex = data.parentIndexInCurrentView !== -1;
            var isChildIndex = data.childIndexInCurrentView !== -1;
            var lastRowIndex = this.parent.currentViewData.length - 1;
            if (type === 'SSType1' || type === 'SSType2' || type === 'FFType1' || type === 'FFType2' || type === 'SFType2') {
                topPosition = isParentIndex ? (data.parentIndexInCurrentView * data.rowHeight) + midPointParent : 0;
                lineHeight = (isParentIndex && isChildIndex) ? heightValue : isChildIndex ?
                    (data.childIndexInCurrentView * data.rowHeight) + midPointParent : (lastRowIndex * data.rowHeight) + midPointParent;
            }
            else if (type === 'SSType3' || type === 'SSType4' || type === 'FSType4' || type === 'FFType3' ||
                type === 'FFType4' || type === 'SFType4' || type === 'SFType3') {
                topPosition = isChildIndex ? (data.childIndexInCurrentView * data.rowHeight) + midPoint : 0;
                lineHeight = (isParentIndex && isChildIndex) ? heightValue : isParentIndex ?
                    (data.parentIndexInCurrentView * data.rowHeight) + midPoint :
                    (lastRowIndex * data.rowHeight) + midPoint;
            }
            else if (type === 'FSType3') {
                topPosition = isChildIndex ? (data.childIndexInCurrentView * data.rowHeight) + midPointParent : 0;
                lineHeight = (isParentIndex && isChildIndex) ? heightValue : isParentIndex ?
                    (data.parentIndexInCurrentView * data.rowHeight) + midPoint :
                    (lastRowIndex * data.rowHeight) + midPointParent;
            }
            else if (type === 'SFType1' || type === 'FSType1' || type === 'FSType2') {
                topPosition = isParentIndex ? (data.parentIndexInCurrentView * data.rowHeight) + midPoint : 0;
                lineHeight = (isParentIndex && isChildIndex) ? heightValue : isChildIndex ?
                    (data.childIndexInCurrentView * data.rowHeight) + midPoint :
                    (lastRowIndex * data.rowHeight) + midPoint;
            }
        }
        return { top: topPosition, height: lineHeight };
    };
    /**
     * @returns {void} .
     * @private
     */
    ConnectorLine.prototype.createConnectorLineTooltipTable = function () {
        this.tooltipTable = createElement('table', { className: '.e-tooltiptable', styles: 'margin-top:0px', attrs: { 'cellspacing': '2px', 'cellpadding': '2px' } });
        var tooltipBody = createElement('tbody');
        tooltipBody.innerHTML = '';
        this.tooltipTable.appendChild(tooltipBody);
    };
    /**
     * @param {string} fromTaskName .
     * @param {string} fromPredecessorText .
     * @param {string} toTaskName .
     * @param {string} toPredecessorText .
     * @returns {string} .
     * @private
     */
    ConnectorLine.prototype.getConnectorLineTooltipInnerTd = function (fromTaskName, fromPredecessorText, toTaskName, toPredecessorText) {
        var innerTd = '<tr  id="fromPredecessor"><td style="padding: 4px;">' + this.parent.localeObj.getConstant('from') + '</td><td> ';
        innerTd = innerTd + fromTaskName + ' </td><td style="padding: 2px;"> ' + this.parent.localeObj.getConstant(fromPredecessorText) + ' </td> </tr>';
        innerTd = innerTd + '<tr id="toPredecessor"><td style="padding: 4px;">' + this.parent.localeObj.getConstant('to') + '</td><td> ' + toTaskName;
        innerTd = innerTd + ' </td><td style="padding: 2px;"> ' + this.parent.localeObj.getConstant(toPredecessorText) + ' </td></tr></tbody><table>';
        return innerTd;
    };
    /**
     * Generate aria-label for connectorline
     *
     * @param {IConnectorLineObject} data .
     * @returns {string} .
     * @private
     */
    ConnectorLine.prototype.generateAriaLabel = function (data) {
        var type = data.type;
        var updatedRecords = this.expandedRecords;
        var fromName = updatedRecords[data.parentIndex].ganttProperties.taskName;
        var toName = updatedRecords[data.childIndex].ganttProperties.taskName;
        var start = this.parent.localeObj.getConstant('start');
        var finish = this.parent.localeObj.getConstant('finish');
        var value = '';
        if (type === 'FS') {
            value = fromName + ' ' + finish + ' to ' + toName + ' ' + start;
        }
        else if (type === 'FF') {
            value = fromName + ' ' + finish + ' to ' + toName + ' ' + finish;
        }
        else if (type === 'SS') {
            value = fromName + ' ' + start + ' to ' + toName + ' ' + start;
        }
        else {
            value = fromName + ' ' + start + ' to ' + toName + ' ' + finish;
        }
        return value;
    };
    /**
     * To get the record based on the predecessor value
     *
     * @param {string} id .
     * @returns {IGanttData} .
     * @private
     */
    ConnectorLine.prototype.getRecordByID = function (id) {
        if (isNullOrUndefined(id)) {
            return null;
        }
        return this.parent.viewType === 'ResourceView' ? this.parent.flatData[this.parent.getTaskIds().indexOf('T' + id.toString())] :
            this.parent.flatData[this.parent.ids.indexOf(id.toString())];
    };
    /**
     * Method to remove connector line from DOM
     *
     * @param {IGanttData[] | object} records .
     * @returns {void} .
     * @private
     */
    ConnectorLine.prototype.removePreviousConnectorLines = function (records) {
        var isObjectType;
        if (isObject(records) === true) {
            isObjectType = true;
        }
        else {
            isObjectType = false;
        }
        var length = isObjectType ? Object.keys(records).length : records.length;
        var keys = Object.keys(records);
        for (var i = 0; i < length; i++) {
            var data = void 0;
            if (isObjectType) {
                var uniqueId = keys[i];
                data = records[uniqueId];
            }
            else {
                data = records[i];
            }
            var predecessors = data.ganttProperties && data.ganttProperties.predecessor;
            if (predecessors && predecessors.length > 0) {
                for (var pre = 0; pre < predecessors.length; pre++) {
                    var lineId = 'parent' + predecessors[pre].from + 'child' + predecessors[pre].to;
                    this.removeConnectorLineById(lineId);
                }
            }
        }
    };
    /**
     * @param {string} id .
     * @returns {void} .
     * @private
     */
    ConnectorLine.prototype.removeConnectorLineById = function (id) {
        var element = this.parent.connectorLineModule.dependencyViewContainer.querySelector('#ConnectorLine' + id);
        if (!isNullOrUndefined(element)) {
            remove(element);
        }
    };
    return ConnectorLine;
}());
export { ConnectorLine };
