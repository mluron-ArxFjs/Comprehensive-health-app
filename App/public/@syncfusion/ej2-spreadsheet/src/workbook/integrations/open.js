/**
 * Open properties.
 */
import { isNullOrUndefined, isUndefined } from '@syncfusion/ej2-base';
import { workbookOpen, openSuccess, openFailure, sheetsDestroyed, workbookFormulaOperation, getRangeIndexes } from '../common/index';
import { sheetCreated, protectSheetWorkBook, getRangeAddress, beginAction } from '../common/index';
import { initSheet, getSheet } from '../base/index';
var WorkbookOpen = /** @class */ (function () {
    function WorkbookOpen(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    /**
     * To open the excel file stream or excel url into the spreadsheet.
     *
     * @param {OpenOptions} options - Options to open a excel file.
     * @returns {void} - To open the excel file stream or excel url into the spreadsheet.
     */
    WorkbookOpen.prototype.open = function (options) {
        var _this = this;
        if (!this.parent.allowOpen) {
            return;
        }
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        if (options.jsonObject) {
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            this.fetchSuccess(options.jsonObject, null, null, true);
            return;
        }
        var formData = new FormData();
        if (options.file) {
            formData.append('file', options.file);
        }
        else if (options.sheetIndex >= 0) {
            formData.append('sheetPassword', options.sheetPassword);
            formData.append('sheetIndex', options.sheetIndex.toString());
        }
        else {
            this.parent.isOpen = false;
            return;
        }
        var args = { passWord: '' };
        if (options.password && options.password.length) {
            args.passWord = options.password;
        }
        if (args.passWord && args.passWord.length) {
            options.password = args.passWord;
        }
        if (options.password) {
            formData.append('password', options.password);
        }
        var eventArgs = {
            file: options.file || null,
            cancel: false,
            requestData: {
                method: 'POST',
                body: formData
            },
            password: args.passWord
        };
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        var guid = options.guid;
        if (isNullOrUndefined(options.sheetPassword) && !guid) {
            this.parent.trigger('beforeOpen', eventArgs);
            this.parent.notify(beginAction, { eventArgs: eventArgs, action: 'beforeOpen' });
        }
        else if (guid) {
            formData.append('guid', guid);
        }
        if (eventArgs.cancel) {
            this.parent.isOpen = false;
            return;
        }
        fetch(this.parent.openUrl, eventArgs.requestData)
            .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                return Promise.reject({
                    status: response.status,
                    statusText: response.statusText,
                    url: response.url
                });
            }
        })
            .then(function (data) { return _this.fetchSuccess(data, eventArgs, options.orginalFile); })
            .catch(function (error) { return _this.fetchFailure(error); });
    };
    WorkbookOpen.prototype.fetchFailure = function (error) {
        if (isUndefined(error.status) && isUndefined(error.statusText)) {
            error.statusText = 'Improper response';
        }
        this.parent.notify(openFailure, error);
        this.parent.isOpen = false;
    };
    WorkbookOpen.prototype.fetchSuccess = function (data, eventArgs, file, isOpenFromJson) {
        var openError = ['UnsupportedFile', 'InvalidUrl', 'NeedPassword', 'InCorrectPassword', 'InCorrectSheetPassword',
            'CorrectSheetPassword', 'DataLimitExceeded', 'FileSizeLimitExceeded'];
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        var workbookData = data;
        workbookData = (typeof data === 'string') ? JSON.parse(data) : data;
        var impData = workbookData.Workbook;
        if (openError.indexOf(impData) > -1) {
            if (file) {
                eventArgs.file = file;
            }
            this.parent.notify(openSuccess, { context: this, data: impData, guid: workbookData.Guid, eventArgs: eventArgs,
                isOpenFromJson: isOpenFromJson });
            return;
        }
        this.updateModel(impData, isOpenFromJson);
        this.parent.notify(openSuccess, { context: this, data: impData, isOpenFromJson: isOpenFromJson, eventArgs: eventArgs });
        this.parent.isOpen = false;
        if (eventArgs && eventArgs.password && eventArgs.password.length > 0) {
            if (this.parent.showSheetTabs) {
                this.parent.element.querySelector('.e-add-sheet-tab').removeAttribute('disabled');
                this.parent.element.querySelector('.e-add-sheet-tab').classList.remove('e-disabled');
            }
            this.parent.password = '';
        }
    };
    WorkbookOpen.prototype.updateModel = function (workbookModel, isOpenFromJson) {
        this.parent.notify(workbookFormulaOperation, { action: 'unRegisterSheet' });
        this.setSelectAllRange(workbookModel.sheets, isOpenFromJson);
        this.parent.sheetNameCount = 1;
        this.parent.sheets = [];
        this.parent.notify(sheetsDestroyed, {});
        workbookModel.activeSheetIndex = workbookModel.activeSheetIndex || 0;
        this.parent.setProperties({
            'isProtected': workbookModel.isProtected || false,
            'password': workbookModel.password || '',
            'showSheetTabs': workbookModel.showSheetTabs || true,
            'sheets': workbookModel.sheets,
            'activeSheetIndex': workbookModel.activeSheetIndex,
            'definedNames': workbookModel.definedNames || [],
            'filterCollection': workbookModel.filterCollection || [],
            'sortCollection': workbookModel.sortCollection || []
        }, true);
        initSheet(this.parent);
        this.parent.notify(sheetCreated, null);
        this.parent.notify(workbookFormulaOperation, { action: 'registerSheet', isImport: true });
        this.parent.notify(workbookFormulaOperation, { action: 'initiateDefinedNames' });
        this.parent.notify(protectSheetWorkBook, null);
    };
    WorkbookOpen.prototype.setSelectAllRange = function (sheets, isOpenFromJson) {
        var _this = this;
        var curSheet;
        var curRange;
        sheets.forEach(function (sheet) {
            if (sheet.selectedRange) {
                var selectedIndex = getRangeIndexes(sheet.selectedRange);
                var rowCount = (isUndefined(sheet.rowCount) ? 100 : sheet.rowCount) - 1;
                var colCount = (isUndefined(sheet.colCount) ? 100 : sheet.colCount) - 1;
                if (selectedIndex[2] === 65535) {
                    selectedIndex[2] = rowCount;
                }
                if (selectedIndex[3] === 255) {
                    selectedIndex[3] = colCount;
                }
                if (selectedIndex[0] === 65535) {
                    selectedIndex[0] = rowCount;
                }
                if (selectedIndex[1] === 255) {
                    selectedIndex[1] = colCount;
                }
                sheet.selectedRange = getRangeAddress(selectedIndex);
            }
            // eslint-disable-next-line
            if (isOpenFromJson && _this.parent.isAngular) {
                for (var i = 0; i < _this.parent.sheets.length; i++) {
                    curSheet = getSheet(_this.parent, i);
                    if (sheet.name === curSheet.name) {
                        if (sheet.ranges) {
                            sheet.ranges.forEach(function (range, index) {
                                curRange = curSheet.ranges[index];
                                if (curRange && curRange.template) {
                                    range.template = curRange.template;
                                }
                            });
                        }
                        break;
                    }
                }
            }
        });
    };
    /**
     * Adding event listener for workbook open.
     *
     * @returns {void} - Adding event listener for workbook open.
     */
    WorkbookOpen.prototype.addEventListener = function () {
        this.parent.on(workbookOpen, this.open.bind(this));
    };
    /**
     * Removing event listener workbook open.
     *
     * @returns {void} - removing event listener workbook open.
     */
    WorkbookOpen.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(workbookOpen, this.open.bind(this));
        }
    };
    /**
     * To Remove the event listeners
     *
     * @returns {void} - To Remove the event listeners
     */
    WorkbookOpen.prototype.destroy = function () {
        this.removeEventListener();
        this.parent = null;
    };
    /**
     * Get the workbook open module name.
     *
     * @returns {string} - Get the module name.
     */
    WorkbookOpen.prototype.getModuleName = function () {
        return 'workbookOpen';
    };
    return WorkbookOpen;
}());
export { WorkbookOpen };
