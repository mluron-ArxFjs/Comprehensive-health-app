import { EventHandler, setStyleAttribute, Browser } from '@syncfusion/ej2-base';
import { contentReady } from '../../common/base/constant';
import * as cls from '../../common/base/css-constant';
import { PivotUtil } from '../../base/util';
import * as events from '../../common/base/constant';
/**
 * `VirtualScroll` module is used to handle scrolling behavior.
 */
var VirtualScroll = /** @class */ (function () {
    /**
     * Constructor for PivotView scrolling.
     *
     * @param {PivotView} parent - Instance of pivot table.
     * @hidden
     */
    function VirtualScroll(parent) {
        this.previousValues = { top: 0, left: 0 };
        this.frozenPreviousValues = { top: 0, left: 0 };
        this.eventType = '';
        this.isFireFox = Browser.userAgent.toLowerCase().indexOf('firefox') > -1;
        this.parent = parent;
        this.addInternalEvents();
    }
    /**
     * It returns the Module name.
     *
     * @returns {string} - string.
     * @hidden
     */
    VirtualScroll.prototype.getModuleName = function () {
        return 'virtualscroll';
    };
    VirtualScroll.prototype.addInternalEvents = function () {
        this.parent.on(contentReady, this.wireEvents, this);
    };
    VirtualScroll.prototype.wireEvents = function () {
        this.engineModule = this.parent.dataType === 'pivot' ? this.parent.engineModule : this.parent.olapEngineModule;
        if (this.parent.displayOption.view !== 'Chart' && !this.parent.isVirtualScrollEventsAdded) {
            var mCont = this.parent.element.querySelector('.' + cls.MOVABLECONTENT_DIV);
            var fCont = this.parent.element.querySelector('.' + cls.FROZENCONTENT_DIV);
            var mHdr = this.parent.element.querySelector('.' + cls.MOVABLEHEADER_DIV);
            var mScrollBar = mCont.parentElement.parentElement.querySelector('.' + cls.MOVABLESCROLL_DIV);
            if (this.parent.mScrollBarEvents.length === 0) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                this.parent.mScrollBarEvents = mScrollBar['__eventList']['events'].slice();
            }
            EventHandler.clearEvents(mCont);
            EventHandler.clearEvents(fCont);
            if (this.isFireFox) {
                EventHandler.clearEvents(mHdr);
            }
            if (this.engineModule) {
                var ele = this.parent.isAdaptive ? mCont : mCont.parentElement.parentElement.querySelector('.' + cls.MOVABLESCROLL_DIV);
                EventHandler.add(ele, 'scroll touchmove pointermove', this.onHorizondalScroll(mHdr, mCont, fCont), this);
                EventHandler.add(mCont.parentElement, 'scroll wheel touchmove pointermove keyup keydown', this.onVerticalScroll(fCont, mCont), this);
                if (this.isFireFox) {
                    EventHandler.add(mCont, 'mouseup touchend scroll', this.common(mHdr, mCont, fCont), this);
                }
                else {
                    EventHandler.add(mCont.parentElement.parentElement, 'mouseup touchend', this.common(mHdr, mCont, fCont), this);
                }
                EventHandler.add(mScrollBar, 'scroll', this.onCustomScrollbarScroll(mCont, mHdr), this);
                EventHandler.add(mCont, 'scroll', this.onCustomScrollbarScroll(mScrollBar, mHdr), this);
                EventHandler.add(mHdr, 'scroll', this.onCustomScrollbarScroll(mScrollBar, mCont), this);
                // EventHandler.add(fCont.parentElement, 'wheel', this.onWheelScroll(mCont, fCont), this);
                // EventHandler.add(fCont.parentElement, 'touchstart pointerdown', this.setPageXY(), this);
                // EventHandler.add(fCont.parentElement, 'touchmove pointermove', this.onTouchScroll(mHdr, mCont, fCont), this);
                EventHandler.add(mHdr, 'touchstart pointerdown', this.setPageXY(), this);
                EventHandler.add(mHdr, 'touchmove pointermove', this.onTouchScroll(mHdr, mCont, fCont), this);
                EventHandler.add(mCont, 'touchstart pointerdown', this.setPageXY(), this);
                EventHandler.add(mCont, 'touchmove pointermove', this.onTouchScroll(mHdr, mCont, fCont), this);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.parent.grid.on('check-scroll-reset', function (args) {
                args.cancel = true;
            });
            this.parent.grid.on('prevent-frozen-scroll-refresh', function (args) {
                args.cancel = true;
            });
            this.parent.grid.isPreventScrollEvent = true;
            this.parent.isVirtualScrollEventsAdded = true;
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    VirtualScroll.prototype.onWheelScroll = function (mCont, fCont) {
        var _this = this;
        var element = mCont;
        return function (e) {
            var top = element.parentElement.scrollTop + (e.deltaMode === 1 ? e.deltaY * 30 : e.deltaY);
            if (_this.frozenPreviousValues.top === top) {
                return;
            }
            e.preventDefault();
            _this.frozenPreviousValues.top = top;
            _this.eventType = e.type;
        };
    };
    VirtualScroll.prototype.getPointXY = function (e) {
        var pageXY = { x: 0, y: 0 };
        if (!(e.touches && e.touches.length)) {
            pageXY.x = e.pageX;
            pageXY.y = e.pageY;
        }
        else {
            pageXY.x = e.touches[0].pageX;
            pageXY.y = e.touches[0].pageY;
        }
        return pageXY;
    };
    VirtualScroll.prototype.onCustomScrollbarScroll = function (mCont, mHdr) {
        var _this = this;
        var content = mCont;
        var header = mHdr;
        return function (e) {
            var eContent = _this.parent.element.querySelector('.' + cls.MOVABLECONTENT_DIV).parentElement;
            if (eContent.querySelector('tbody') === null) {
                return;
            }
            var target = e.target;
            var left = target.scrollLeft;
            if (_this.previousValues.left === left || (_this.isFireFox && target.classList.contains(cls.MOVABLEHEADER_DIV))) {
                return;
            }
            content.scrollLeft = left;
            header.scrollLeft = left;
            _this.previousValues.left = left;
            if (_this.parent.isDestroyed) {
                return;
            }
        };
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    VirtualScroll.prototype.onTouchScroll = function (mHdr, mCont, fCont) {
        var _this = this;
        var element = mCont;
        return function (e) {
            if (e.pointerType === 'mouse') {
                return;
            }
            var pageXY = _this.getPointXY(e);
            var top = element.parentElement.scrollTop + (_this.pageXY.y - pageXY.y);
            var ele = _this.parent.isAdaptive ? mCont : element.parentElement.parentElement.querySelector('.' + cls.MOVABLESCROLL_DIV);
            var left = ele.scrollLeft + (_this.pageXY.x - pageXY.x);
            if (_this.frozenPreviousValues.left === left || left < 0) {
                return;
            }
            mHdr.scrollLeft = left;
            ele.scrollLeft = left;
            _this.pageXY.x = pageXY.x;
            _this.frozenPreviousValues.left = left;
            if (_this.frozenPreviousValues.top === top || top < 0) {
                return;
            }
            _this.pageXY.y = pageXY.y;
            _this.frozenPreviousValues.top = top;
            _this.eventType = e.type;
        };
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    VirtualScroll.prototype.update = function (mHdr, mCont, top, left, e) {
        var _this = this;
        this.parent.isScrolling = true;
        var engine = this.parent.dataType === 'pivot' ? this.parent.engineModule : this.parent.olapEngineModule;
        var args = {
            dataSourceSettings: PivotUtil.getClonedDataSourceSettings(this.parent.dataSourceSettings)
        };
        if (this.parent.pageSettings && engine.pageSettings) {
            if (this.direction === 'vertical') {
                var rowValues = this.parent.dataType === 'pivot' ?
                    (this.parent.dataSourceSettings.valueAxis === 'row' ? this.parent.dataSourceSettings.values.length : 1) : 1;
                var exactSize = (this.parent.pageSettings.rowPageSize * rowValues * this.parent.gridSettings.rowHeight);
                var section = Math.ceil(top / exactSize);
                if ((this.parent.scrollPosObject.vertical === section ||
                    engine.pageSettings.rowPageSize >= engine.rowCount)) {
                    // this.parent.hideWaitingPopup();
                    return;
                }
                this.parent.actionObj.actionName = events.verticalScroll;
                this.parent.actionBeginMethod();
                this.parent.showWaitingPopup();
                this.parent.scrollPosObject.vertical = section;
                this.parent.pageSettings.currentRowPage = engine.pageSettings.currentRowPage = section > 1 ? section : 1;
                var rowStartPos_1 = 0;
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                this.parent.trigger(events.enginePopulating, args, function (observedArgs) {
                    if (_this.parent.dataType === 'pivot') {
                        if (_this.parent.dataSourceSettings.mode === 'Server') {
                            _this.parent.getEngine('onScroll', null, null, null, null, null, null);
                        }
                        else {
                            _this.parent.engineModule.generateGridData(_this.parent.dataSourceSettings, true, _this.parent.engineModule.headerCollection);
                            rowStartPos_1 = _this.parent.engineModule.rowStartPos;
                        }
                    }
                    else {
                        _this.parent.olapEngineModule.scrollPage();
                        rowStartPos_1 = _this.parent.olapEngineModule.pageRowStartPos;
                    }
                    _this.enginePopulatedEventMethod(engine);
                });
                var exactPage = Math.ceil(rowStartPos_1 / (this.parent.pageSettings.rowPageSize * rowValues));
                var pos = exactSize * exactPage -
                    (engine.rowFirstLvl * rowValues * this.parent.gridSettings.rowHeight);
                this.parent.scrollPosObject.verticalSection = pos;
            }
            else {
                var colValues = this.parent.dataType === 'pivot' ?
                    (this.parent.dataSourceSettings.valueAxis === 'column' ? this.parent.dataSourceSettings.values.length : 1) : 1;
                var exactSize = (this.parent.pageSettings.columnPageSize *
                    colValues * this.parent.gridSettings.columnWidth);
                var section = Math.ceil(left / exactSize);
                if (this.parent.scrollPosObject.horizontal === section) {
                    // this.parent.hideWaitingPopup();
                    return;
                }
                this.parent.actionObj.actionName = events.horizontalScroll;
                this.parent.actionBeginMethod();
                this.parent.showWaitingPopup();
                var pivot_1 = this.parent;
                pivot_1.scrollPosObject.horizontal = section;
                this.parent.pageSettings.currentColumnPage = engine.pageSettings.currentColumnPage = section > 1 ? section : 1;
                var colStartPos_1 = 0;
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                this.parent.trigger(events.enginePopulating, args, function (observedArgs) {
                    if (pivot_1.dataType === 'pivot') {
                        if (_this.parent.dataSourceSettings.mode === 'Server') {
                            _this.parent.getEngine('onScroll', null, null, null, null, null, null);
                        }
                        else {
                            pivot_1.engineModule.generateGridData(pivot_1.dataSourceSettings, true, pivot_1.engineModule.headerCollection);
                            colStartPos_1 = pivot_1.engineModule.colStartPos;
                        }
                    }
                    else {
                        pivot_1.olapEngineModule.scrollPage();
                        colStartPos_1 = pivot_1.olapEngineModule.pageColStartPos;
                    }
                    _this.enginePopulatedEventMethod(engine);
                });
                var exactPage = Math.ceil(colStartPos_1 / (pivot_1.pageSettings.columnPageSize * colValues));
                var pos = exactSize * exactPage - (engine.colFirstLvl *
                    colValues * pivot_1.gridSettings.columnWidth);
                pivot_1.scrollPosObject.horizontalSection = pos;
            }
            this.parent.actionObj.actionName = this.parent.getActionCompleteName();
            if (this.parent.actionObj.actionName) {
                this.parent.actionCompleteMethod();
            }
        }
    };
    VirtualScroll.prototype.enginePopulatedEventMethod = function (engine, control) {
        var _this = this;
        var pivot = control ? control : this.parent;
        var eventArgs = {
            dataSourceSettings: pivot.dataSourceSettings,
            pivotValues: engine.pivotValues
        };
        pivot.trigger(events.enginePopulated, eventArgs, function (observedArgs) {
            _this.parent.pivotValues = observedArgs.pivotValues;
        });
    };
    VirtualScroll.prototype.setPageXY = function () {
        var _this = this;
        return function (e) {
            if (e.pointerType === 'mouse') {
                return;
            }
            _this.pageXY = _this.getPointXY(e);
        };
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    VirtualScroll.prototype.common = function (mHdr, mCont, fCont) {
        var _this = this;
        return function (e) {
            var ele = _this.parent.isAdaptive ? mCont : mCont.parentElement.parentElement.querySelector('.' + cls.MOVABLESCROLL_DIV);
            _this.update(mHdr, mCont, mCont.parentElement.scrollTop * _this.parent.verticalScrollScale, ele.scrollLeft * _this.parent.horizontalScrollScale, e);
        };
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    VirtualScroll.prototype.onHorizondalScroll = function (mHdr, mCont, fCont) {
        var _this = this;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var timeOutObj;
        return function (e) {
            var ele = _this.parent.isAdaptive ? mCont : mCont.parentElement.parentElement.querySelector('.' + cls.MOVABLESCROLL_DIV);
            var left = ele.scrollLeft * _this.parent.horizontalScrollScale;
            if (e.type === 'wheel' || e.type === 'touchmove' || _this.eventType === 'wheel' || _this.eventType === 'touchmove') {
                clearTimeout(timeOutObj);
                timeOutObj = setTimeout(function () {
                    left = e.type === 'touchmove' ? ele.scrollLeft : left;
                    _this.update(mHdr, mCont, mCont.parentElement.scrollTop * _this.parent.verticalScrollScale, left, e);
                }, 300);
            }
            if (_this.previousValues.left === left) {
                return;
            }
            _this.parent.scrollDirection = _this.direction = 'horizondal';
            var horiOffset = -((left - _this.parent.scrollPosObject.horizontalSection - ele.scrollLeft));
            var vertiOffset = mCont.querySelector('.' + cls.TABLE).style.transform.split(',').length > 1 ?
                mCont.querySelector('.' + cls.TABLE).style.transform.split(',')[1].trim() : '0px)';
            if (ele.scrollLeft < _this.parent.scrollerBrowserLimit) {
                setStyleAttribute(mCont.querySelector('.e-table'), {
                    transform: 'translate(' + horiOffset + 'px,' + vertiOffset
                });
                setStyleAttribute(mHdr.querySelector('.e-table'), {
                    transform: 'translate(' + horiOffset + 'px,' + 0 + 'px)'
                });
            }
            var excessMove = _this.parent.scrollPosObject.horizontalSection > left ?
                -(_this.parent.scrollPosObject.horizontalSection - left) : ((left + mHdr.offsetWidth) -
                (_this.parent.scrollPosObject.horizontalSection + mCont.querySelector('.e-table').offsetWidth));
            var notLastPage = Math.ceil(_this.parent.scrollPosObject.horizontalSection / _this.parent.horizontalScrollScale) <
                _this.parent.scrollerBrowserLimit;
            if (_this.parent.scrollPosObject.horizontalSection > left ? true : (excessMove > 1 && notLastPage)) {
                //  showSpinner(this.parent.element);
                if (left > mHdr.clientWidth) {
                    if (_this.parent.scrollPosObject.left < 1) {
                        _this.parent.scrollPosObject.left = mHdr.clientWidth;
                    }
                    _this.parent.scrollPosObject.left = _this.parent.scrollPosObject.left - 50;
                    excessMove = _this.parent.scrollPosObject.horizontalSection > left ?
                        (excessMove - _this.parent.scrollPosObject.left) : (excessMove + _this.parent.scrollPosObject.left);
                }
                else {
                    excessMove = -_this.parent.scrollPosObject.horizontalSection;
                }
                horiOffset = -((left - (_this.parent.scrollPosObject.horizontalSection + excessMove) - mCont.parentElement.parentElement.querySelector('.' + cls.MOVABLESCROLL_DIV).scrollLeft));
                var vWidth = (_this.parent.gridSettings.columnWidth * _this.engineModule.columnCount);
                if (vWidth > _this.parent.scrollerBrowserLimit) {
                    _this.parent.horizontalScrollScale = vWidth / _this.parent.scrollerBrowserLimit;
                    vWidth = _this.parent.scrollerBrowserLimit;
                }
                if (horiOffset > vWidth && horiOffset > left) {
                    horiOffset = left;
                    excessMove = 0;
                }
                setStyleAttribute(mCont.querySelector('.e-table'), {
                    transform: 'translate(' + horiOffset + 'px,' + vertiOffset
                });
                setStyleAttribute(mHdr.querySelector('.e-table'), {
                    transform: 'translate(' + horiOffset + 'px,' + 0 + 'px)'
                });
                _this.parent.scrollPosObject.horizontalSection = _this.parent.scrollPosObject.horizontalSection + excessMove;
            }
            var hScrollPos = (ele.scrollWidth - (ele.scrollLeft + ele.offsetWidth));
            if (hScrollPos <= 0) {
                var virtualDiv = mCont.querySelector('.' + cls.VIRTUALTRACK_DIV);
                virtualDiv.style.display = 'none';
                var mCntScrollPos = (mCont.scrollWidth - (mCont.scrollLeft + mCont.offsetWidth));
                virtualDiv.style.display = '';
                var mCntVScrollPos = (mCont.scrollWidth - (mCont.scrollLeft + mCont.offsetWidth));
                _this.parent.scrollPosObject.horizontalSection -= mCntScrollPos > hScrollPos ? mCntScrollPos : -mCntVScrollPos;
                horiOffset = (ele.scrollLeft > _this.parent.scrollerBrowserLimit) ?
                    Number(mCont.querySelector('.' + cls.TABLE).style.transform.split(',')[0].split('px')[0].trim()) :
                    -(((ele.scrollLeft * _this.parent.horizontalScrollScale) -
                        _this.parent.scrollPosObject.horizontalSection - ele.scrollLeft));
                setStyleAttribute(mCont.querySelector('.e-table'), {
                    transform: 'translate(' + horiOffset + 'px,' + vertiOffset
                });
                setStyleAttribute(mHdr.querySelector('.e-table'), {
                    transform: 'translate(' + horiOffset + 'px,' + 0 + 'px)'
                });
            }
            _this.previousValues.left = left;
            _this.frozenPreviousValues.left = left;
            _this.eventType = '';
            mHdr.scrollLeft = ele.scrollLeft;
        };
    };
    VirtualScroll.prototype.onVerticalScroll = function (fCont, mCont) {
        var _this = this;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var timeOutObj;
        return function (e) {
            var top = mCont.parentElement.scrollTop * _this.parent.verticalScrollScale;
            if (e.type === 'wheel' || e.type === 'touchmove' || _this.eventType === 'wheel' || _this.eventType === 'touchmove' || e.type === 'keyup' || e.type === 'keydown') {
                var ele_1 = _this.parent.isAdaptive ? mCont : mCont.parentElement.parentElement.querySelector('.' + cls.MOVABLESCROLL_DIV);
                clearTimeout(timeOutObj);
                timeOutObj = setTimeout(function () {
                    _this.update(null, mCont, mCont.parentElement.scrollTop * _this.parent.verticalScrollScale, ele_1.scrollLeft * _this.parent.horizontalScrollScale, e);
                }, 300);
            }
            if (_this.previousValues.top === top) {
                return;
            }
            _this.parent.scrollDirection = _this.direction = 'vertical';
            var vertiOffset = -((top - _this.parent.scrollPosObject.verticalSection - mCont.parentElement.scrollTop));
            var horiOffset = mCont.querySelector('.' + cls.TABLE).style.transform.split(',')[0].trim();
            if (vertiOffset > _this.parent.virtualDiv.clientHeight) {
                vertiOffset = _this.parent.virtualDiv.clientHeight;
            }
            if (mCont.parentElement.scrollTop < _this.parent.scrollerBrowserLimit) {
                setStyleAttribute(fCont.querySelector('.e-table'), {
                    transform: 'translate(' + 0 + 'px,' + vertiOffset + 'px)'
                });
                setStyleAttribute(mCont.querySelector('.e-table'), {
                    transform: horiOffset + ',' + vertiOffset + 'px)'
                });
            }
            var excessMove = _this.parent.scrollPosObject.verticalSection > top ?
                -(_this.parent.scrollPosObject.verticalSection - top) : ((top + fCont.parentElement.clientHeight) -
                (_this.parent.scrollPosObject.verticalSection + fCont.querySelector('.e-table').offsetHeight));
            var notLastPage = Math.ceil(_this.parent.scrollPosObject.verticalSection / _this.parent.verticalScrollScale) <
                _this.parent.scrollerBrowserLimit;
            if (_this.parent.scrollPosObject.verticalSection > top ? true : (excessMove > 1 && notLastPage)) {
                //  showSpinner(this.parent.element);
                if (top > fCont.parentElement.clientHeight) {
                    if (_this.parent.scrollPosObject.top < 1) {
                        _this.parent.scrollPosObject.top = fCont.parentElement.clientHeight;
                    }
                    _this.parent.scrollPosObject.top = _this.parent.scrollPosObject.top - 50;
                    excessMove = _this.parent.scrollPosObject.verticalSection > top ?
                        (excessMove - _this.parent.scrollPosObject.top) : (excessMove + _this.parent.scrollPosObject.top);
                }
                else {
                    excessMove = -_this.parent.scrollPosObject.verticalSection;
                }
                var movableTable = _this.parent.element.querySelector('.' + cls.MOVABLECONTENT_DIV).querySelector('.e-table');
                vertiOffset = -((top - (_this.parent.scrollPosObject.verticalSection + excessMove) - mCont.parentElement.scrollTop));
                var vHeight = (_this.parent.gridSettings.rowHeight * _this.engineModule.rowCount + 0.1
                    - movableTable.clientHeight);
                if (vHeight > _this.parent.scrollerBrowserLimit) {
                    _this.parent.verticalScrollScale = vHeight / _this.parent.scrollerBrowserLimit;
                    vHeight = _this.parent.scrollerBrowserLimit;
                }
                if (vertiOffset > vHeight && vertiOffset > top) {
                    vertiOffset = top;
                    excessMove = 0;
                }
                if (vertiOffset > _this.parent.virtualDiv.clientHeight) {
                    vertiOffset = _this.parent.virtualDiv.clientHeight;
                }
                setStyleAttribute(fCont.querySelector('.e-table'), {
                    transform: 'translate(' + 0 + 'px,' + vertiOffset + 'px)'
                });
                setStyleAttribute(mCont.querySelector('.e-table'), {
                    transform: horiOffset + ',' + vertiOffset + 'px)'
                });
                _this.parent.scrollPosObject.verticalSection = _this.parent.scrollPosObject.verticalSection + excessMove;
            }
            _this.previousValues.top = top;
            _this.frozenPreviousValues.top = top;
            _this.eventType = '';
        };
    };
    /**
     * @hidden
     */
    VirtualScroll.prototype.removeInternalEvents = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(contentReady, this.wireEvents);
    };
    /**
     * To destroy the virtualscrolling event listener
     *
     * @returns {void}
     * @hidden
     */
    VirtualScroll.prototype.destroy = function () {
        this.removeInternalEvents();
    };
    return VirtualScroll;
}());
export { VirtualScroll };
