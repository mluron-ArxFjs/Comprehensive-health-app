import { createElement, formatUnit, remove, SanitizeHtmlHelper } from '@syncfusion/ej2-base';
import * as cls from '../base/css-constants';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
var NonWorkingDay = /** @class */ (function () {
    function NonWorkingDay(gantt) {
        this.weekendWidthUpdated = false;
        this.parent = gantt;
        this.nonworkingContainer = null;
        this.holidayContainer = null;
        this.weekendContainer = null;
    }
    /**
     * Method append nonworking container
     *
     * @returns {void} .
     */
    NonWorkingDay.prototype.createNonworkingContainer = function () {
        if (!this.parent.ganttChartModule.chartBodyContent.contains(this.nonworkingContainer)) {
            this.nonworkingContainer = createElement('div', {
                className: cls.nonworkingContainer
            });
            this.parent.ganttChartModule.chartBodyContent.insertBefore(this.nonworkingContainer, this.parent.ganttChartModule.chartBodyContent.lastChild);
        }
    };
    /**
     * calculation for holidays rendering.
     *
     * @returns {void} .
     * @private
     */
    NonWorkingDay.prototype.renderHolidays = function () {
        if (this.parent.holidays && this.parent.holidays.length > 0) {
            this.createNonworkingContainer();
            if (!this.nonworkingContainer.contains(this.holidayContainer)) {
                this.holidayContainer = createElement('div', {
                    className: cls.holidayContainer
                });
                this.nonworkingContainer.appendChild(this.holidayContainer);
            }
            this.holidayContainer.innerHTML = this.getHolidaysElement().innerHTML;
        }
        else if (this.holidayContainer && this.holidayContainer.parentNode) {
            remove(this.holidayContainer);
            if (this.nonworkingContainer && this.nonworkingContainer.childNodes.length === 0) {
                remove(this.nonworkingContainer);
            }
        }
    };
    /**
     * Method to return holidays as html string
     *
     * @returns {HTMLElement} .
     */
    NonWorkingDay.prototype.getHolidaysElement = function () {
        var fromDate;
        var toDate;
        var container = createElement('div');
        var height = this.parent.contentHeight;
        // eslint-disable-next-line
        var toolbarHeight = 0;
        if (!isNullOrUndefined(this.parent.toolbarModule) && !isNullOrUndefined(this.parent.toolbarModule.element)) {
            toolbarHeight = this.parent.toolbarModule.element.offsetHeight;
        }
        var viewportHeight = this.parent.ganttHeight - toolbarHeight - this.parent.ganttChartModule.chartTimelineContainer.offsetHeight;
        for (var i = 0; i < this.parent.holidays.length; i++) {
            if (this.parent.holidays[i].from && this.parent.holidays[i].to) {
                fromDate = this.parent.dateValidationModule.getDateFromFormat(this.parent.holidays[i].from);
                toDate = this.parent.dateValidationModule.getDateFromFormat(this.parent.holidays[i].to);
                toDate.setDate(toDate.getDate() + 1);
                fromDate.setHours(0, 0, 0, 0);
                toDate.setHours(0, 0, 0, 0);
            }
            else if (this.parent.holidays[i].from) {
                fromDate = this.parent.dateValidationModule.getDateFromFormat(this.parent.holidays[i].from);
                fromDate.setHours(0, 0, 0, 0);
            }
            else if (this.parent.holidays[i].to) {
                fromDate = this.parent.dateValidationModule.getDateFromFormat(this.parent.holidays[i].to);
                fromDate.setHours(0, 0, 0, 0);
            }
            var width = (this.parent.holidays[i].from && this.parent.holidays[i].to) ?
                this.parent.dataOperation.getTaskWidth(fromDate, toDate) : this.parent.perDayWidth;
            var left = this.parent.dataOperation.getTaskLeft(fromDate, false);
            var align = this.parent.enableRtl ? "right:" + left + "px;" : "left:" + left + "px;";
            var holidayDiv = createElement('div', {
                className: cls.holidayElement, styles: align + " width:" + width + "px; height:100%;"
            });
            var spanTop = (viewportHeight < height) ? viewportHeight / 2 : height / 2;
            var spanElement = createElement('span', {
                className: cls.holidayLabel, styles: "top:" + spanTop + "px;left:" + (width / 2) + "px;"
            });
            var property = this.parent.disableHtmlEncode ? 'textContent' : 'innerHTML';
            spanElement[property] = this.parent.holidays[i].label ? this.parent.holidays[i].label : '';
            if (this.parent.enableHtmlSanitizer && typeof (spanElement[property]) === 'string') {
                spanElement[property] = SanitizeHtmlHelper.sanitize(spanElement[property]);
            }
            holidayDiv.appendChild(spanElement);
            if (this.parent.holidays[i].cssClass) {
                holidayDiv.classList.add(this.parent.holidays[i].cssClass);
            }
            container.appendChild(holidayDiv);
        }
        return container;
    };
    /**
     * @returns {void} .
     * @private
     */
    NonWorkingDay.prototype.renderWeekends = function () {
        if (this.parent.highlightWeekends) {
            this.createNonworkingContainer();
            if (!this.nonworkingContainer.contains(this.weekendContainer)) {
                this.weekendContainer = createElement('div', {
                    className: cls.weekendContainer
                });
                this.nonworkingContainer.appendChild(this.weekendContainer);
            }
            this.weekendContainer.innerHTML = this.getWeekendElements().innerHTML;
        }
        else if (this.weekendContainer) {
            remove(this.weekendContainer);
            if (this.nonworkingContainer && this.nonworkingContainer.childNodes.length === 0) {
                remove(this.nonworkingContainer);
            }
        }
    };
    /**
     * Method to get weekend html string
     *
     * @returns {HTMLElement} .
     */
    NonWorkingDay.prototype.getWeekendElements = function () {
        var container = createElement('div');
        var startDate = new Date(this.parent.timelineModule.timelineStartDate.getTime());
        var endDate = new Date(this.parent.timelineModule.timelineEndDate.getTime());
        var nonWorkingIndex = this.parent.nonWorkingDayIndex;
        var isFirstCell = true;
        do {
            if (nonWorkingIndex.indexOf(startDate.getDay()) !== -1) {
                var left = this.parent.dataOperation.getTaskLeft(startDate, false);
                var width = this.parent.perDayWidth;
                if (isFirstCell) {
                    var start = new Date(startDate.getTime());
                    var tempEnd = new Date(start.getTime());
                    tempEnd.setDate(tempEnd.getDate() + 1);
                    tempEnd.setHours(0, 0, 0, 0);
                    width = this.parent.dataOperation.getTaskWidth(start, tempEnd);
                    isFirstCell = false;
                }
                var sDate = new Date(startDate);
                sDate.setDate(sDate.getDate() + 1);
                if (sDate.getTimezoneOffset() != this.parent.timelineModule.timelineStartDate.getTimezoneOffset() && !this.weekendWidthUpdated) {
                    if (this.parent.timelineModule.bottomTier == 'Hour' && this.parent.timelineSettings.bottomTier.count === 1) {
                        width = width - this.parent.timelineSettings.timelineUnitSize;
                        this.weekendWidthUpdated = true;
                    }
                }
                var align = this.parent.enableRtl ? "right:" + left + "px;" : "left:" + left + "px;";
                var weekendDiv = createElement('div', {
                    className: cls.weekend, styles: align + " width:" + width + "px;height:100%;"
                });
                container.appendChild(weekendDiv);
            }
            startDate.setDate(startDate.getDate() + 1);
            startDate.setHours(0, 0, 0, 0);
        } while (startDate < endDate);
        return container;
    };
    NonWorkingDay.prototype.updateHolidayLabelHeight = function () {
        var height = this.parent.getContentHeight();
        var gantttable = document.getElementById("ganttContainer");
        // eslint-disable-next-line
        var toolbarHeight = 0;
        if (!isNullOrUndefined(this.parent.toolbarModule) && !isNullOrUndefined(this.parent.toolbarModule.element)) {
            toolbarHeight = this.parent.toolbarModule.element.offsetHeight;
        }
        var viewportHeight = (this.parent.height === 'auto') ? gantttable.offsetHeight - toolbarHeight - this.parent.ganttChartModule.chartTimelineContainer.offsetHeight :
            this.parent.ganttHeight - toolbarHeight - this.parent.ganttChartModule.chartTimelineContainer.offsetHeight;
        var top = (viewportHeight < height) ? viewportHeight / 2 : height / 2;
        var labels = this.holidayContainer.querySelectorAll('.' + cls.holidayLabel);
        for (var i = 0; i < labels.length; i++) {
            labels[i].style.top = formatUnit(top);
        }
    };
    /**
     * Method to update height for all internal containers
     *
     * @returns {void} .
     * @private
     */
    NonWorkingDay.prototype.updateContainerHeight = function () {
        var height = this.parent.getContentHeight();
        if (this.holidayContainer) {
            this.holidayContainer.style.height = formatUnit(height);
            this.updateHolidayLabelHeight();
        }
        if (this.weekendContainer) {
            this.weekendContainer.style.height = formatUnit(height);
        }
    };
    /**
     * Method to remove containers of holiday and weekend
     *
     * @returns {void} .
     */
    NonWorkingDay.prototype.removeContainers = function () {
        if (this.holidayContainer) {
            remove(this.holidayContainer);
        }
        if (this.weekendContainer) {
            remove(this.weekendContainer);
        }
        if (this.nonworkingContainer) {
            remove(this.nonworkingContainer);
        }
    };
    return NonWorkingDay;
}());
export { NonWorkingDay };
