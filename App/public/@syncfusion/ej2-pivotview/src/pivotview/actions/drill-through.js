import { contentReady } from '../../common/base/constant';
import * as events from '../../common/base/constant';
import { DrillThroughDialog } from '../../common/popups/drillthrough-dialog';
import { EventHandler, isNullOrUndefined, SanitizeHtmlHelper } from '@syncfusion/ej2-base';
/**
 * `DrillThrough` module.
 */
var DrillThrough = /** @class */ (function () {
    /**
     * Constructor.
     *
     * @param {PivotView} parent - Instance of pivot table.
     * @hidden
     */
    function DrillThrough(parent) {
        this.parent = parent;
        this.drillThroughDialog = new DrillThroughDialog(this.parent);
        this.addInternalEvents();
    }
    /**
     * It returns the Module name.
     *
     * @returns {string} - string.
     * @hidden
     */
    DrillThrough.prototype.getModuleName = function () {
        return 'drillThrough';
    };
    DrillThrough.prototype.addInternalEvents = function () {
        this.parent.on(contentReady, this.wireEvents, this);
    };
    DrillThrough.prototype.wireEvents = function () {
        this.unWireEvents();
        EventHandler.add(this.parent.element, 'dblclick', this.mouseClickHandler, this);
    };
    DrillThrough.prototype.unWireEvents = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        EventHandler.remove(this.parent.element, 'dblclick', this.mouseClickHandler);
    };
    DrillThrough.prototype.mouseClickHandler = function (e) {
        var target = e.target;
        var ele = null;
        if (target.classList.contains('e-stackedheadercelldiv') || target.classList.contains('e-cellvalue') ||
            target.classList.contains('e-headercelldiv')) {
            ele = target.parentElement;
        }
        else if (target.classList.contains('e-headercell') || target.classList.contains('e-rowcell')) {
            ele = target;
        }
        else if (target.classList.contains('e-headertext')) {
            ele = target.parentElement.parentElement;
        }
        if (ele) {
            if (this.parent.allowDrillThrough && ele.classList.contains('e-valuescontent') || this.parent.editSettings.allowEditing) {
                var colIndex = Number(ele.getAttribute('data-colindex'));
                var rowIndex = Number(ele.getAttribute('index'));
                this.executeDrillThrough(this.parent.pivotValues[rowIndex][colIndex], rowIndex, colIndex, ele);
            }
        }
    };
    /** @hidden */
    DrillThrough.prototype.executeDrillThrough = function (pivotValue, rowIndex, colIndex, element) {
        this.parent.drillThroughElement = element;
        this.parent.drillThroughValue = pivotValue;
        var engine = this.parent.dataType === 'olap' ? this.parent.olapEngineModule : this.parent.engineModule;
        var valueCaption = '';
        var aggType = '';
        var rawData = [];
        if (pivotValue.rowHeaders !== undefined && pivotValue.columnHeaders !== undefined) {
            if (this.parent.dataType === 'olap') {
                var tupleInfo = void 0;
                if (this.parent.dataSourceSettings.valueAxis === 'row') {
                    tupleInfo = engine.tupRowInfo[pivotValue.rowOrdinal];
                }
                else {
                    tupleInfo = engine.tupColumnInfo[pivotValue.colOrdinal];
                }
                var measureName = tupleInfo ?
                    engine.getUniqueName(tupleInfo.measureName) : pivotValue.actualText;
                if (engine.fieldList[measureName] && engine.fieldList[measureName].isCalculatedField) {
                    this.parent.pivotCommon.errorDialog.createErrorDialog(this.parent.localeObj.getConstant('error'), this.parent.localeObj.getConstant('drillError'));
                    return;
                }
                valueCaption = engine.fieldList[measureName || pivotValue.actualText].caption;
                aggType = engine.fieldList[measureName || pivotValue.actualText].aggregateType;
                this.parent.olapEngineModule.getDrillThroughData(pivotValue, this.parent.maxRowsInDrillThrough);
                try {
                    rawData = JSON.parse(engine.gridJSON);
                }
                catch (exception) {
                    this.parent.pivotCommon.errorDialog.createErrorDialog(this.parent.localeObj.getConstant('error'), engine.gridJSON);
                    return;
                }
            }
            else {
                valueCaption = engine.fieldList[pivotValue.actualText.toString()] ?
                    engine.fieldList[pivotValue.actualText.toString()].caption : pivotValue.actualText.toString();
                aggType = engine.fieldList[pivotValue.actualText] ? engine.fieldList[pivotValue.actualText].aggregateType : '';
                if (this.parent.dataSourceSettings.mode === 'Server') {
                    this.parent.getEngine('fetchRawData', null, null, null, null, null, null, { rowIndex: rowIndex, columnIndex: colIndex });
                }
                else {
                    if (this.parent.allowDataCompression) {
                        var indexArray = Object.keys(pivotValue.indexObject);
                        this.drillThroughDialog.indexString = [];
                        for (var _i = 0, indexArray_1 = indexArray; _i < indexArray_1.length; _i++) {
                            var cIndex = indexArray_1[_i];
                            for (var _a = 0, _b = this.parent.engineModule.groupRawIndex[Number(cIndex)]; _a < _b.length; _a++) {
                                var aIndex = _b[_a];
                                rawData.push(this.parent.engineModule.actualData[aIndex]);
                                this.drillThroughDialog.indexString.push(aIndex.toString());
                            }
                        }
                    }
                    else {
                        var indexArray = Object.keys(pivotValue.indexObject);
                        for (var _c = 0, indexArray_2 = indexArray; _c < indexArray_2.length; _c++) {
                            var index = indexArray_2[_c];
                            rawData.push(this.parent.engineModule.data[Number(index)]);
                        }
                    }
                }
            }
            if (this.parent.dataSourceSettings.mode !== 'Server') {
                this.triggerDialog(valueCaption, aggType, rawData, pivotValue, element);
            }
        }
    };
    DrillThrough.prototype.getCalcualtedFieldValue = function (indexArray, rawData) {
        for (var k = 0; k < indexArray.length; k++) {
            var colIndex = {};
            colIndex[indexArray[k]] = indexArray[k];
            for (var i = 0; i < this.parent.dataSourceSettings.calculatedFieldSettings.length; i++) {
                var indexValue = void 0;
                for (var j = this.parent.engineModule.fields.length - 1; j >= 0; j--) {
                    if (this.parent.engineModule.fields[j] ===
                        this.parent.dataSourceSettings.calculatedFieldSettings[i].name) {
                        indexValue = j;
                        break;
                    }
                }
                if (!isNullOrUndefined(rawData[k])) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    var calculatedFeildValue = this.parent.engineModule.getAggregateValue([Number(indexArray[k])], colIndex, indexValue, 'calculatedfield', false);
                    rawData[k][this.parent.dataSourceSettings.calculatedFieldSettings[i].name] = (isNaN(calculatedFeildValue) && isNullOrUndefined(calculatedFeildValue)) ? '#DIV/0!' : calculatedFeildValue;
                }
            }
        }
        return rawData;
    };
    /* eslint-disable @typescript-eslint/no-explicit-any */
    DrillThrough.prototype.frameData = function (eventArgs) {
        var keyPos = 0;
        var dataPos = 0;
        var data = [];
        while (dataPos < eventArgs.rawData.length) {
            var framedHeader = {};
            while (keyPos < eventArgs.gridColumns.length) {
                framedHeader[eventArgs.gridColumns[keyPos].field] = this.parent.dataSourceSettings.mode === 'Server' ?
                    eventArgs.rawData[dataPos][this.parent.engineModule.fields.indexOf(eventArgs.gridColumns[keyPos]
                        .field) !== -1 ? this.parent.engineModule.fields.indexOf(eventArgs.gridColumns[keyPos].field) : 0] :
                    eventArgs.rawData[dataPos][this.parent.engineModule.fieldKeys[eventArgs.gridColumns[keyPos]
                        .field]];
                keyPos++;
            }
            data.push(framedHeader);
            dataPos++;
            keyPos = 0;
        }
        eventArgs.rawData = data;
        return eventArgs;
    };
    /** @hidden */
    DrillThrough.prototype.triggerDialog = function (valueCaption, aggType, rawData, pivotValue, element) {
        var valuetText = aggType === 'CalculatedField' ? valueCaption.toString() : aggType !== '' ?
            (this.parent.localeObj.getConstant(aggType) + ' ' + this.parent.localeObj.getConstant('of') + ' ' + valueCaption) :
            valueCaption;
        valuetText = this.parent.enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(valuetText) : valuetText;
        var rowHeaders = this.parent.dataSourceSettings.valueAxis === 'row' ? this.parent.getRowText(Number(element.getAttribute('index')), 0) :
            pivotValue.rowHeaders === '' ? '' : pivotValue.rowHeaders.toString().split(this.parent.dataSourceSettings.valueSortSettings.headerDelimiter).join(' - ');
        var eventArgs = {
            currentTarget: element,
            currentCell: pivotValue,
            rawData: rawData,
            rowHeaders: rowHeaders,
            columnHeaders: pivotValue.columnHeaders === '' ? '' : pivotValue.columnHeaders.toString().split(this.parent.dataSourceSettings.valueSortSettings.headerDelimiter).join(' - '),
            value: valuetText + '(' + pivotValue.formattedText + ')',
            gridColumns: this.drillThroughDialog.frameGridColumns(rawData),
            cancel: false
        };
        if (this.parent.dataSourceSettings.type === 'CSV') {
            eventArgs = this.frameData(eventArgs);
        }
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var drillThrough = this;
        this.parent.trigger(events.drillThrough, eventArgs, function (observedArgs) {
            if (!eventArgs.cancel) {
                drillThrough.drillThroughDialog.showDrillThroughDialog(observedArgs);
            }
        });
    };
    /**
     * To destroy the drillthrough module.
     *
     * @returns  {void}
     * @hidden
     */
    DrillThrough.prototype.destroy = function () {
        this.unWireEvents();
        if (this.drillThroughDialog) {
            this.drillThroughDialog.destroy();
            this.drillThroughDialog = null;
        }
        else {
            return;
        }
    };
    return DrillThrough;
}());
export { DrillThrough };
