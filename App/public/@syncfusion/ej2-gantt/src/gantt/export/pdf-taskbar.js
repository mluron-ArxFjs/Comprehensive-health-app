var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { PointF, PdfStringLayouter, PdfPen, PdfSolidBrush, RectangleF, SizeF, PdfStandardFont, PdfFontStyle, PdfStringFormat, PdfVerticalAlignment, PdfTextAlignment, PdfWordWrapType } from '@syncfusion/ej2-pdf-export';
import { pixelToPoint } from '../base/utils';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * @hidden
 */
var PdfGanttTaskbarCollection = /** @class */ (function () {
    function PdfGanttTaskbarCollection(parent) {
        /**
         * @private
         */
        this.leftTaskLabel = {};
        /**
         * @private
         */
        this.rightTaskLabel = {};
        this.startPage = -1;
        this.endPage = -1;
        this.parent = parent;
    }
    PdfGanttTaskbarCollection.prototype.add = function () {
        return new PdfGanttTaskbarCollection(this.parent);
    };
    /**
     * @param {PdfPage} page .
     * @returns {PdfPage} .
     * Get the next PDF page
     */
    PdfGanttTaskbarCollection.prototype.GetNextPage = function (page) {
        var section = page.section;
        var index = section.indexOf(page);
        var nextPage = null;
        if (index === section.count - 1) {
            nextPage = section.add();
        }
        else {
            nextPage = section.getPages()[index + 1];
        }
        return nextPage;
    };
    /**
     * Draw the taskbar, chart back ground
     *
     * @private
     */
    /* eslint-disable */
    PdfGanttTaskbarCollection.prototype.drawTaskbar = function (page, startPoint, detail, cumulativeWidth, rowHeight, taskbar) {
        var taskGraphics = page.graphics;
        var isNextPage = false;
        var pageSize = page.getClientSize();
        var yPoint = startPoint.y + rowHeight;
        //code for while current pdf page is exceed
        if (yPoint > pageSize.height) {
            page = this.GetNextPage(page);
            taskGraphics = page.graphics;
            startPoint.y = 0;
            if (this.parent.pdfExportModule.gantt.enableHeader) {
                this.parent.pdfExportModule.gantt.chartHeader.drawPageTimeline(page, startPoint, detail);
                startPoint.y = pixelToPoint(this.parent.timelineModule.isSingleTier ? 45 : 60);
            }
            isNextPage = true;
        }
        this.drawLeftLabel(page, startPoint, detail, cumulativeWidth);
        //Draw Taskbar
        var font = new PdfStandardFont(this.fontFamily, 9, PdfFontStyle.Regular);
        if (!isNullOrUndefined(this.parent.pdfExportModule['helper']['exportProps'].ganttStyle) &&
            this.parent.pdfExportModule['helper']['exportProps'].ganttStyle.font) {
            font = this.parent.pdfExportModule['helper']['exportProps'].ganttStyle.font;
        }
        var fontColor = null;
        var fontBrush = new PdfSolidBrush(this.progressFontColor);
        var progressFormat = new PdfStringFormat();
        progressFormat.lineAlignment = PdfVerticalAlignment.Middle;
        progressFormat.alignment = PdfTextAlignment.Right;
        var isLabelString = false;
        var updatedWidth;
        if (/^[a-zA-Z]/.test(this.taskLabel)) {
            isLabelString = true;
            progressFormat.alignment = PdfTextAlignment.Left;
        }
        var pageIndex = -1;
        if (!taskbar.isMilestone) {
            var taskbarPen = new PdfPen(taskbar.taskBorderColor);
            var taskBrush = new PdfSolidBrush(taskbar.taskColor);
            var progressPen = new PdfPen(taskbar.progressColor);
            var progressBrush = new PdfSolidBrush(taskbar.progressColor);
            var adjustHeight = pixelToPoint((this.parent.rowHeight - this.height) / 2.0);
            pageIndex = page.section.indexOf(page);
            var startDate = isNullOrUndefined(this.unscheduleStarteDate) ? this.startDate : this.unscheduleStarteDate;
            var endDate = isNullOrUndefined(this.unscheduleEndDate) ? this.endDate : this.unscheduleEndDate;
            //Task start and end date both are in the range of header split up start and end date
            if (detail.startDate <= startDate && endDate <= detail.endDate) {
                if (!this.isStartPoint) {
                    this.taskStartPoint = __assign({}, startPoint);
                    this.isStartPoint = true;
                }
                if (!this.isScheduledTask && this.unscheduledTaskBy !== 'duration') {
                    this.drawUnscheduledTask(taskGraphics, startPoint, cumulativeWidth, adjustHeight);
                }
                else {
                    taskGraphics.drawRectangle(taskbarPen, taskBrush, startPoint.x + pixelToPoint(this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight, pixelToPoint(taskbar.width), pixelToPoint(taskbar.height));
                    if (this.isScheduledTask) {
                        taskGraphics.drawRectangle(progressPen, progressBrush, startPoint.x + pixelToPoint(this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight, pixelToPoint(taskbar.progressWidth), pixelToPoint(taskbar.height));
                        if (!isNullOrUndefined(this.parent.labelSettings.taskLabel) && !isNullOrUndefined(this.taskLabel)) {
                            updatedWidth = this.progressWidth;
                            if (isLabelString) {
                                updatedWidth = this.width;
                            }
                            taskGraphics.drawString(this.taskLabel.toString(), font, fontColor, fontBrush, startPoint.x + pixelToPoint(this.left - cumulativeWidth), startPoint.y + adjustHeight, pixelToPoint(updatedWidth), pixelToPoint(this.height), progressFormat);
                        }
                    }
                }
                this.isCompleted = true;
                this.startPage = pageIndex;
                this.endPage = pageIndex;
            }
            //Task start date is in the range of header split up start and end date
            else if (detail.startDate <= startDate && detail.endDate >= startDate && (endDate >= detail.endDate)) {
                if (!this.isStartPoint) {
                    this.taskStartPoint = __assign({}, startPoint);
                    this.isStartPoint = true;
                }
                var renderWidth = 0;
                if (!isLabelString) {
                    this.width = this.width - (detail.totalWidth - (this.left - cumulativeWidth));
                }
                renderWidth = (detail.totalWidth - (this.left - cumulativeWidth));
                if (!this.isScheduledTask && this.unscheduledTaskBy !== 'duration') {
                    this.drawUnscheduledTask(taskGraphics, startPoint, cumulativeWidth, adjustHeight);
                }
                else {
                    taskGraphics.drawRectangle(taskbarPen, taskBrush, startPoint.x + pixelToPoint(this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight, pixelToPoint(renderWidth), pixelToPoint(taskbar.height));
                    taskbar.width = taskbar.width - renderWidth;
                    if (this.isScheduledTask) {
                        var progressBoundsWidth = 0;
                        if (this.progressWidth <= renderWidth) {
                            progressBoundsWidth = this.progressWidth;
                        }
                        else {
                            progressBoundsWidth = renderWidth;
                        }
                        taskGraphics.drawRectangle(progressPen, progressBrush, startPoint.x + pixelToPoint(this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight, pixelToPoint(progressBoundsWidth), pixelToPoint(taskbar.height));
                        this.progressWidth -= progressBoundsWidth;
                        if (this.parent.labelSettings.taskLabel && !isNullOrUndefined(this.taskLabel)) {
                            updatedWidth = progressBoundsWidth;
                            if (isLabelString) {
                                updatedWidth = this.width;
                            }
                            taskGraphics.drawString(this.taskLabel.toString(), font, fontColor, fontBrush, startPoint.x + pixelToPoint(this.left - cumulativeWidth), (startPoint.y + adjustHeight), pixelToPoint(updatedWidth), pixelToPoint(this.height), progressFormat);
                        }
                    }
                }
                this.left = 0;
                this.isCompleted = false;
                this.startPage = pageIndex;
            }
            //Task end date is in the range of header split up start and end date
            else if (endDate <= detail.endDate && detail.startDate <= endDate && !this.isCompleted) {
                if (!this.isStartPoint) {
                    this.taskStartPoint = __assign({}, startPoint);
                    this.isStartPoint = true;
                }
                taskGraphics.drawRectangle(taskbarPen, taskBrush, startPoint.x + pixelToPoint(taskbar.left + 0.5), startPoint.y + adjustHeight, pixelToPoint(taskbar.width), pixelToPoint(taskbar.height));
                if (this.isScheduledTask) {
                    taskGraphics.drawRectangle(progressPen, progressBrush, startPoint.x + pixelToPoint(taskbar.left + 0.5), startPoint.y + adjustHeight, pixelToPoint(taskbar.progressWidth), pixelToPoint(taskbar.height));
                    if (!isNullOrUndefined(this.taskLabel)) {
                        updatedWidth = this.progressWidth;
                        if (isLabelString) {
                            updatedWidth = this.width;
                        }
                        taskGraphics.drawString(this.taskLabel.toString(), font, fontColor, fontBrush, startPoint.x + pixelToPoint(this.left), (startPoint.y + adjustHeight), pixelToPoint(updatedWidth), pixelToPoint(this.height), progressFormat);
                    }
                }
                this.isCompleted = true;
                this.endPage = pageIndex;
            }
            //Header splitup start and end date with in the task start and end date.
            //So the task is takes entire width of page.
            else if (startDate < detail.startDate && endDate > detail.endDate) {
                if (!this.isStartPoint) {
                    this.taskStartPoint = __assign({}, startPoint);
                    this.isStartPoint = true;
                }
                taskGraphics.drawRectangle(taskbarPen, taskBrush, startPoint.x + pixelToPoint(taskbar.left) + 0.5, startPoint.y + adjustHeight, pixelToPoint(detail.totalWidth), pixelToPoint(taskbar.height));
                if (this.isScheduledTask) {
                    var progressBoundsWidth = 0;
                    if (this.progressWidth <= detail.totalWidth) {
                        progressBoundsWidth = this.progressWidth;
                    }
                    else {
                        progressBoundsWidth = detail.totalWidth;
                    }
                    taskGraphics.drawRectangle(progressPen, progressBrush, startPoint.x + pixelToPoint(taskbar.left) + 0.5, startPoint.y + adjustHeight, pixelToPoint(progressBoundsWidth), pixelToPoint(taskbar.height));
                    this.progressWidth -= progressBoundsWidth;
                    if (!isNullOrUndefined(this.taskLabel)) {
                        updatedWidth = progressBoundsWidth;
                        if (isLabelString) {
                            updatedWidth = this.width;
                        }
                        taskGraphics.drawString(this.taskLabel.toString(), font, fontColor, fontBrush, startPoint.x + pixelToPoint(this.left), (startPoint.y + adjustHeight), pixelToPoint(updatedWidth), pixelToPoint(this.height), progressFormat);
                    }
                }
                this.isCompleted = false;
                this.width -= detail.totalWidth;
            }
        }
        else {
            this.drawMilestone(page, startPoint, detail, cumulativeWidth);
        }
        this.drawRightLabel(page, startPoint, detail, cumulativeWidth);
        return isNextPage;
    };
    /* eslint-enable */
    /**
     * @param {PdfPage} page .
     * @param {PointF} startPoint .
     * @param {TimelineDetails} detail .
     * @param {number} cumulativeWidth .
     * @returns {void}
     * Draw task right side label
     */
    PdfGanttTaskbarCollection.prototype.drawRightLabel = function (page, startPoint, detail, cumulativeWidth) {
        var left;
        var graphics = page.graphics;
        if (this.rightTaskLabel.isLeftCalculated) {
            left = this.rightTaskLabel.left;
        }
        else {
            left = pixelToPoint(this.rightTaskLabel.left);
        }
        var actualLeft = left - pixelToPoint(cumulativeWidth) + startPoint.x;
        if (detail.startPoint <= left && left < detail.endPoint &&
            !isNullOrUndefined(this.rightTaskLabel.value) && !this.rightTaskLabel.isCompleted) {
            var result = this.getWidth(this.rightTaskLabel.value, detail.endPoint - left, 15);
            var font = new PdfStandardFont(this.fontFamily, 9);
            if (!isNullOrUndefined(this.parent.pdfExportModule['helper']['exportProps'].ganttStyle) &&
                this.parent.pdfExportModule['helper']['exportProps'].ganttStyle.font) {
                font = this.parent.pdfExportModule['helper']['exportProps'].ganttStyle.font;
            }
            var adjustHeight = (pixelToPoint(this.parent.rowHeight) - result.actualSize.height) / 2;
            var point = new PointF(actualLeft, startPoint.y + adjustHeight);
            var size = new SizeF(result.actualSize.width, result.actualSize.height);
            var labelBounds = new RectangleF(point, size);
            var labelFormat = new PdfStringFormat();
            labelFormat.alignment = PdfTextAlignment.Right;
            labelFormat.lineAlignment = PdfVerticalAlignment.Middle;
            if (result.actualSize.width > 0) {
                var fontColor = null;
                var fontBrush = new PdfSolidBrush(this.labelColor);
                /* eslint-disable-next-line */
                graphics.drawString(result.lines[0].text, font, fontColor, fontBrush, labelBounds.x, labelBounds.y, result.actualSize.width, result.actualSize.height, labelFormat);
                if (result.remainder !== null) {
                    this.rightTaskLabel.value = result.remainder;
                    this.rightTaskLabel.left = detail.endPoint;
                    this.rightTaskLabel.isLeftCalculated = true;
                }
                else {
                    this.rightTaskLabel.isCompleted = true;
                }
            }
            else {
                this.rightTaskLabel.left = detail.endPoint;
            }
        }
    };
    /**
     * @param {PdfPage} page .
     * @param {PointF} startPoint .
     * @param {TimelineDetails} detail .
     * @param {number} cumulativeWidth .
     * @returns {void}
     * Draw task left task label
     */
    PdfGanttTaskbarCollection.prototype.drawLeftLabel = function (page, startPoint, detail, cumulativeWidth) {
        var graphics = page.graphics;
        var left;
        if (!isNullOrUndefined(this.leftTaskLabel.value)) {
            var labelLeft = 0;
            labelLeft = this.left;
            if (!this.leftTaskLabel.isLeftCalculated) {
                var result = this.getWidth(this.leftTaskLabel.value, Number.MAX_VALUE, 15);
                var reduceLeft = this.isMilestone ? Math.floor(this.parent.chartRowsModule.taskBarHeight / 2) + 33 : 33; // 33 indicates default timeline cell width
                left = pixelToPoint(labelLeft - reduceLeft) - result.actualSize.width;
                this.leftTaskLabel.left = left;
                this.leftTaskLabel.isLeftCalculated = true;
            }
            else {
                left = this.leftTaskLabel.left;
            }
            var actualLeft = left - pixelToPoint(cumulativeWidth) + startPoint.x;
            if (detail.startPoint <= left && left < detail.endPoint && !isNullOrUndefined(this.leftTaskLabel.value)
                && !this.leftTaskLabel.isCompleted) {
                var result = this.getWidth(this.leftTaskLabel.value, detail.endPoint - left, 15);
                var font = new PdfStandardFont(this.fontFamily, 9);
                if (!isNullOrUndefined(this.parent.pdfExportModule['helper']['exportProps'].ganttStyle) &&
                    this.parent.pdfExportModule['helper']['exportProps'].ganttStyle.font) {
                    font = this.parent.pdfExportModule['helper']['exportProps'].ganttStyle.font;
                }
                var adjustHeight = (pixelToPoint(this.parent.rowHeight) - result.actualSize.height) / 2;
                var rightLabelpoint = new PointF(actualLeft, startPoint.y + adjustHeight);
                var rightLabelSize = new SizeF(result.actualSize.width, result.actualSize.height);
                var rightLabelBounds = new RectangleF(rightLabelpoint, rightLabelSize);
                var rightLabelFormat = new PdfStringFormat();
                rightLabelFormat.alignment = PdfTextAlignment.Right;
                rightLabelFormat.lineAlignment = PdfVerticalAlignment.Middle;
                if (result.actualSize.width > 0) {
                    var fontColor = null;
                    var fontBrush = new PdfSolidBrush(this.labelColor);
                    /* eslint-disable-next-line */
                    graphics.drawString(result.lines[0].text, font, fontColor, fontBrush, rightLabelBounds.x, rightLabelBounds.y, result.actualSize.width, result.actualSize.height, rightLabelFormat);
                    if (result.remainder !== null) {
                        this.leftTaskLabel.value = result.remainder;
                        this.leftTaskLabel.left = detail.endPoint;
                    }
                    else {
                        this.leftTaskLabel.isCompleted = true;
                    }
                }
                else {
                    this.leftTaskLabel.left = detail.endPoint;
                }
            }
        }
    };
    PdfGanttTaskbarCollection.prototype.getWidth = function (value, width, height) {
        var font = new PdfStandardFont(this.fontFamily, 9);
        if (!isNullOrUndefined(this.parent.pdfExportModule['helper']['exportProps'].ganttStyle) &&
            this.parent.pdfExportModule['helper']['exportProps'].ganttStyle.font) {
            font = this.parent.pdfExportModule['helper']['exportProps'].ganttStyle.font;
        }
        var layouter = new PdfStringLayouter();
        var progressFormat = new PdfStringFormat();
        progressFormat.alignment = PdfTextAlignment.Left;
        progressFormat.wordWrap = PdfWordWrapType.Character;
        progressFormat.lineAlignment = PdfVerticalAlignment.Middle;
        /* eslint-disable-next-line */
        var result = layouter.layout(value, font, progressFormat, new SizeF(width, height), false, new SizeF(width, height));
        return result;
    };
    /**
     * @param {PdfGraphics} taskGraphics .
     * @param {PointF} startPoint .
     * @param {number} cumulativeWidth .
     * @param {number} adjustHeight .
     * @returns {void}
     * Draw Unscheduled Task
     */
    PdfGanttTaskbarCollection.prototype.drawUnscheduledTask = function (taskGraphics, startPoint, cumulativeWidth, adjustHeight) {
        var taskBrush = new PdfSolidBrush(this.taskColor);
        /* eslint-disable-next-line */
        taskGraphics.drawRectangle(taskBrush, startPoint.x + pixelToPoint(this.left - cumulativeWidth), startPoint.y + adjustHeight, pixelToPoint(3), pixelToPoint(this.height));
    };
    /**
     * @param {PdfPage} page .
     * @param {PointF} startPoint .
     * @param {TimelineDetails} detail .
     * @param {number} cumulativeWidth .
     * @returns {void}
     * Draw milestone task
     */
    PdfGanttTaskbarCollection.prototype.drawMilestone = function (page, startPoint, detail, cumulativeWidth) {
        if (detail.startDate <= this.startDate && this.startDate <= detail.endDate) {
            var taskGraphics = page.graphics;
            var pageIndex = page.section.indexOf(page);
            this.taskStartPoint = __assign({}, startPoint);
            var milestonePen = new PdfPen(this.milestoneColor);
            var adjustHeight = pixelToPoint(((this.parent.rowHeight - this.height) / 2.0));
            var milestoneBrush = new PdfSolidBrush(this.milestoneColor);
            taskGraphics.save(); //saving graphics state
            var height = Math.floor(this.parent.chartRowsModule.taskBarHeight * 0.6);
            /* eslint-disable-next-line */
            taskGraphics.translateTransform(startPoint.x + pixelToPoint(this.left - cumulativeWidth), startPoint.y + adjustHeight - (this.parent.chartRowsModule.taskBarHeight * 0.7) / 2);
            taskGraphics.rotateTransform(45); //apply rotation
            taskGraphics.drawRectangle(milestonePen, milestoneBrush, 0, 0, pixelToPoint(height), pixelToPoint(height));
            taskGraphics.restore(); //restoring graphics state
            this.endPage = this.startPage = pageIndex;
        }
    };
    return PdfGanttTaskbarCollection;
}());
export { PdfGanttTaskbarCollection };
