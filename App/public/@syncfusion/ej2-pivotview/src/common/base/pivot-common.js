import { CommonKeyboardInteraction } from '../actions/keyboard';
import { EventBase } from '../actions/event-base';
import { NodeStateModified } from '../actions/node-state-modified';
import { DataSourceUpdate } from '../actions/dataSource-update';
import { ErrorDialog } from '../popups/error-dialog';
import { FilterDialog } from '../popups/filter-dialog';
/**
 * PivotCommon is used to manipulate the relational or Multi-Dimensional public methods by using their dataSource
 *
 * @hidden
 */
/** @hidden */
var PivotCommon = /** @class */ (function () {
    /**
     * Constructor for Pivot Common class.
     *
     * @param  {CommonArgs} control - It contains the value of control.
     * @hidden
     */
    function PivotCommon(control) {
        /** @hidden */
        this.currentTreeItems = [];
        /** @hidden */
        this.savedTreeFilterPos = {};
        /** @hidden */
        this.currentTreeItemsPos = {};
        /** @hidden */
        this.searchTreeItems = [];
        /** @hidden */
        this.isDataOverflow = false;
        /** @hidden */
        this.isDateField = false;
        this.element = control.element;
        this.moduleName = control.moduleName;
        this.dataSourceSettings = control.dataSourceSettings;
        this.engineModule = control.pivotEngine;
        this.enableRtl = control.enableRtl;
        this.enableHtmlSanitizer = control.enableHtmlSanitizer;
        this.isAdaptive = control.isAdaptive;
        this.renderMode = control.renderMode;
        this.parentID = control.id;
        this.localeObj = control.localeObj;
        this.dataType = control.dataType;
        this.cssClass = control.cssClass;
        this.nodeStateModified = new NodeStateModified(this);
        this.dataSourceUpdate = new DataSourceUpdate(this);
        this.eventBase = new EventBase(this);
        this.filterDialog = new FilterDialog(this);
        this.errorDialog = new ErrorDialog(this);
        this.keyboardModule = new CommonKeyboardInteraction(this);
        return this;
    }
    /**
     * To destroy the groupingbar.
     *
     * @returns {void}
     * @hidden
     */
    PivotCommon.prototype.destroy = function () {
        if (this.keyboardModule) {
            this.keyboardModule.destroy();
            this.keyboardModule = null;
        }
    };
    return PivotCommon;
}());
export { PivotCommon };
