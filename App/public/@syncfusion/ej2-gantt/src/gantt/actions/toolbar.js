import { Toolbar as NavToolbar } from '@syncfusion/ej2-navigations';
import { createElement, extend, isNullOrUndefined, remove, getValue, EventHandler, addClass } from '@syncfusion/ej2-base';
import * as cls from '../base/css-constants';
import * as events from '../base/constant';
import { TextBox } from '@syncfusion/ej2-inputs';
var Toolbar = /** @class */ (function () {
    function Toolbar(parent) {
        this.predefinedItems = {};
        this.items = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll', 'Search',
            'PrevTimeSpan', 'NextTimeSpan', 'ZoomIn', 'ZoomOut', 'ZoomToFit', 'ExcelExport',
            'CsvExport', 'PdfExport', 'Indent', 'Outdent', 'CriticalPath'];
        this.parent = parent;
        this.id = this.parent.element.id;
        this.parent.on('ui-toolbarupdate', this.propertyChanged, this);
    }
    Toolbar.prototype.getModuleName = function () {
        return 'toolbar';
    };
    /**
     * @returns {void} .
     * @private
     */
    Toolbar.prototype.renderToolbar = function () {
        var toolbarItems = this.parent.toolbar || [];
        if (toolbarItems.length > 0) {
            this.element = createElement('div', { id: this.parent.controlId + '_Gantt_Toolbar', className: cls.toolbar });
            if (this.parent.treeGrid.grid.headerModule) {
                this.parent.element.insertBefore(this.element, this.parent.treeGridPane.offsetParent);
            }
            else {
                this.parent.element.appendChild(this.element);
            }
            var preItems = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll',
                'PrevTimeSpan', 'NextTimeSpan', 'ZoomIn', 'ZoomOut', 'ZoomToFit', 'ExcelExport', 'CsvExport',
                'PdfExport', 'Indent', 'Outdent', 'CriticalPath'];
            for (var _i = 0, preItems_1 = preItems; _i < preItems_1.length; _i++) {
                var item = preItems_1[_i];
                var itemStr = void 0;
                var localeName = void 0;
                if (item === 'CriticalPath') {
                    itemStr = "critical-path";
                    localeName = "criticalPath";
                }
                else {
                    itemStr = item.toLowerCase();
                    localeName = item[0].toLowerCase() + item.slice(1);
                }
                this.predefinedItems[item] = {
                    id: this.parent.element.id + '_' + itemStr, prefixIcon: 'e-' + itemStr,
                    text: this.parent.isAdaptive ? '' : this.parent.localeObj.getConstant(localeName),
                    tooltipText: this.parent.localeObj.getConstant(localeName) + ((localeName === 'add' ||
                        localeName === 'edit' || localeName === 'delete') ? this.parent.localeObj.getConstant('task') :
                        (localeName === 'expandAll' || localeName === 'collapseAll') ?
                            this.parent.localeObj.getConstant('tasks') : ''),
                    align: this.parent.isAdaptive ? 'Right' : 'Left'
                };
                if (this.parent.enableRtl) {
                    if (item === 'PrevTimeSpan') {
                        this.predefinedItems[item].prefixIcon = 'e-nexttimespan';
                    }
                    if (item === 'NextTimeSpan') {
                        this.predefinedItems[item].prefixIcon = 'e-prevtimespan';
                    }
                }
            }
            var searchLocalText = this.parent.localeObj.getConstant('search');
            if (this.parent.isAdaptive) {
                this.predefinedItems.Search = {
                    id: this.id + '_searchbutton',
                    prefixIcon: 'e-search-icon',
                    tooltipText: searchLocalText,
                    align: 'Right'
                };
            }
            else {
                this.predefinedItems.Search = {
                    id: this.id + '_search',
                    template: '<div class="e-input-group e-search" role="search">' +
                        '<input id="' + this.id + '_searchbar" class="e-input" name="input" type="search"' +
                        // eslint-disable-next-line
                        'placeholder= \"' + searchLocalText + '\"/>' +
                        '<span id="' + this.id + '_searchbutton" class="e-input-group-icon e-search-icon e-icons"' +
                        'tabindex="-1" title="' + searchLocalText + '" aria-label= "search"></span>' +
                        '</div>',
                    tooltipText: searchLocalText,
                    align: 'Right', cssClass: 'e-search-wrapper'
                };
            }
            this.createToolbar();
        }
    };
    Toolbar.prototype.addReactToolbarPortals = function (args) {
        if (this.parent.isReact && args) {
            this.parent.portals = this.parent.portals.concat(args);
            this.parent.renderTemplates();
        }
    };
    Toolbar.prototype.createToolbar = function () {
        var items = this.getItems();
        this.toolbar = new NavToolbar({
            items: items,
            enableRtl: this.parent.enableRtl,
            clicked: this.toolbarClickHandler.bind(this),
            height: this.parent.isAdaptive ? 48 : 'auto'
        });
        this.toolbar.isStringTemplate = true;
        this.toolbar.isReact = this.parent.isReact;
        this.toolbar.on('render-react-toolbar-template', this.addReactToolbarPortals, this);
        this.toolbar.appendTo(this.element);
        var cancelItem = this.element.querySelector('#' + this.parent.element.id + '_cancel');
        var updateItem = this.element.querySelector('#' + this.parent.element.id + '_update');
        if (cancelItem) {
            addClass([cancelItem], cls.focusCell);
        }
        if (updateItem) {
            addClass([updateItem], cls.focusCell);
        }
        if (this.parent.isAdaptive) {
            this.element.insertBefore(this.getSearchBarElement(), this.element.childNodes[0]);
            this.searchElement = this.element.querySelector('#' + this.parent.element.id + '_searchbar');
            var textObj = new TextBox({
                placeholder: this.parent.localeObj.getConstant('search'),
                enableRtl: this.parent.enableRtl,
                floatLabelType: 'Never',
                showClearButton: true
            });
            textObj.appendTo(this.searchElement);
        }
        else {
            this.searchElement = this.element.querySelector('#' + this.parent.element.id + '_searchbar');
        }
        if (this.parent.filterModule) {
            this.wireEvent();
            if (this.parent.searchSettings) {
                this.updateSearchTextBox();
            }
        }
        if (this.parent.readOnly) {
            this.enableItems([this.parent.element.id + '_add', this.parent.element.id + '_update', this.parent.element.id + '_delete',
                this.parent.element.id + '_cancel', this.parent.element.id + '_indent', this.parent.element.id + '_outdent'], false);
        }
    };
    Toolbar.prototype.getSearchBarElement = function () {
        var _this = this;
        var div = createElement('div', { className: 'e-adaptive-searchbar', styles: 'display: none' });
        var textbox = createElement('input', { attrs: { type: 'text' }, id: this.parent.element.id + '_searchbar' });
        var span = createElement('span', { className: 'e-backarrowspan e-icons' });
        span.onclick = function () {
            div.style.display = 'none';
            _this.element.childNodes[1].style.display = 'block';
        };
        div.appendChild(span);
        div.appendChild(textbox);
        return div;
    };
    Toolbar.prototype.wireEvent = function () {
        if (this.searchElement) {
            EventHandler.add(this.searchElement, 'keyup', this.keyUpHandler, this);
            EventHandler.add(this.searchElement, 'focus', this.focusHandler, this);
            EventHandler.add(this.searchElement, 'blur', this.blurHandler, this);
        }
    };
    Toolbar.prototype.propertyChanged = function (property) {
        var module = getValue('module', property);
        if (module !== this.getModuleName() || !this.parent.toolbar) {
            return;
        }
        if (this.element && this.element.parentNode) {
            remove(this.element);
        }
        this.renderToolbar();
        this.refreshToolbarItems();
    };
    Toolbar.prototype.unWireEvent = function () {
        if (this.searchElement) {
            EventHandler.remove(this.searchElement, 'keyup', this.keyUpHandler);
            EventHandler.remove(this.searchElement, 'focus', this.focusHandler);
            EventHandler.remove(this.searchElement, 'blur', this.blurHandler);
            this.searchElement = null;
        }
        this.parent.off('ui-toolbarupdate', this.propertyChanged);
    };
    Toolbar.prototype.keyUpHandler = function (e) {
        if (e.keyCode === 13 && this.parent.searchSettings.key !== this.searchElement.value) {
            this.parent.searchSettings.key = this.searchElement.value;
            this.parent.dataBind();
        }
    };
    Toolbar.prototype.focusHandler = function (e) {
        e.target.parentElement.classList.add('e-input-focus');
    };
    Toolbar.prototype.blurHandler = function (e) {
        e.target.parentElement.classList.remove('e-input-focus');
    };
    /**
     * Method to set value for search input box
     *
     * @returns {void} .
     * @hidden
     */
    Toolbar.prototype.updateSearchTextBox = function () {
        if (this.searchElement && this.searchElement.value !== this.parent.searchSettings.key) {
            this.searchElement.value = this.parent.searchSettings.key;
        }
    };
    Toolbar.prototype.getItems = function () {
        var items = [];
        var toolbarItems = this.parent.toolbar;
        var searchIndex = -1;
        toolbarItems.forEach(function (item, index) {
            if ((typeof (item) === 'string' && item === 'Search') ||
                ((typeof (item) === 'object') && item.text === 'Search')) {
                searchIndex = index;
            }
        });
        if (searchIndex > -1) {
            var searchItem = toolbarItems.splice(searchIndex, 1);
            toolbarItems.push(searchItem[0]);
        }
        for (var _i = 0, toolbarItems_1 = toolbarItems; _i < toolbarItems_1.length; _i++) {
            var item = toolbarItems_1[_i];
            if (typeof item === 'string') {
                items.push(this.getItemObject(item));
            }
            else {
                items.push(this.getItem(item));
            }
        }
        return items;
    };
    Toolbar.prototype.getItem = function (itemObject) {
        var item = this.predefinedItems[itemObject.text];
        return item ? extend(item, item, itemObject) : itemObject;
    };
    Toolbar.prototype.getItemObject = function (itemName) {
        return this.predefinedItems[itemName] || { text: itemName, id: this.id + '_' + itemName };
    };
    Toolbar.prototype.toolbarClickHandler = function (arg) {
        var _this = this;
        var gObj = this.parent;
        var gID = this.id;
        this.parent.isToolBarClick = false;
        extend(arg, { cancel: false });
        if (arg.item['properties'].id === this.parent.element.id + "_pdfexport" || arg.item['properties'].id === this.parent.element.id + "_critical-path") {
            if (!isNullOrUndefined(this.parent.loadingIndicator) && this.parent.loadingIndicator.indicatorType === "Shimmer") {
                this.parent.showMaskRow();
            }
            else {
                this.parent.showSpinner();
            }
        }
        gObj.trigger(events.toolbarClick, arg, function (args) {
            if (args.cancel) {
                return;
            }
            else {
                if (_this.parent.isAdaptive === true) {
                    if (args.item.id === gID + '_edit' || args.item.id === gID + '_add' || args.item.id === gID + '_delete'
                        || args.item.id === gID + '_searchbutton' || args.item.id === gID + '_expandall'
                        || args.item.id === gID + '_collapseall') {
                        if (_this.parent.selectionModule && _this.parent.selectionSettings.type === 'Multiple') {
                            _this.parent.selectionModule.hidePopUp();
                            document.getElementsByClassName('e-gridpopup')[0].style.display = 'none';
                        }
                    }
                }
                switch (!isNullOrUndefined(args.item) && args.item.id) {
                    case gID + '_edit':
                        if (gObj.editModule && gObj.editSettings.allowEditing) {
                            gObj.editModule.dialogModule.openToolbarEditDialog();
                        }
                        break;
                    case gID + '_indent':
                        if (gObj.editModule && gObj.selectionModule.getSelectedRecords().length) {
                            gObj.indent();
                        }
                        break;
                    case gID + '_critical-path':
                        if (gObj.enableCriticalPath) {
                            gObj.enableCriticalPath = false;
                        }
                        else {
                            gObj.enableCriticalPath = true;
                        }
                        break;
                    case gID + '_outdent':
                        if (gObj.editModule && gObj.selectionModule.getSelectedRecords().length) {
                            gObj.outdent();
                        }
                        break;
                    case gID + '_update':
                        gObj.editModule.cellEditModule.isCellEdit = false;
                        gObj.treeGrid.grid.saveCell();
                        break;
                    case gID + '_cancel':
                        gObj.cancelEdit();
                        break;
                    case gID + '_add':
                        if (gObj.editModule && gObj.editSettings.allowAdding) {
                            gObj.editModule.dialogModule.openAddDialog();
                        }
                        break;
                    case gID + '_delete':
                        if (_this.parent.selectionModule && _this.parent.editModule) {
                            if ((_this.parent.selectionSettings.mode !== 'Cell' && _this.parent.selectionModule.selectedRowIndexes.length)
                                || (_this.parent.selectionSettings.mode === 'Cell' &&
                                    _this.parent.selectionModule.getSelectedRowCellIndexes().length)) {
                                _this.parent.editModule.startDeleteAction();
                            }
                        }
                        break;
                    case gID + '_search':
                        {
                            var searchButtonId = getValue('originalEvent.target.id', args);
                            if (searchButtonId === _this.parent.element.id + '_searchbutton' && _this.parent.filterModule) {
                                var keyVal = _this.element.querySelector('#' + _this.parent.element.id + '_searchbar').value;
                                if (_this.parent.searchSettings.key !== keyVal) {
                                    _this.parent.searchSettings.key = keyVal;
                                    _this.parent.dataBind();
                                }
                            }
                            break;
                        }
                    case gID + '_searchbutton':
                        {
                            var adaptiveSearchbar = _this.element.querySelector('.e-adaptive-searchbar');
                            adaptiveSearchbar.parentElement.childNodes[1].style.display = 'none';
                            adaptiveSearchbar.style.display = 'block';
                            break;
                        }
                    case gID + '_expandall':
                        _this.parent.ganttChartModule.expandCollapseAll('expand');
                        break;
                    case gID + '_collapseall':
                        _this.parent.ganttChartModule.expandCollapseAll('collapse');
                        break;
                    case gID + '_prevtimespan':
                        _this.parent.previousTimeSpan();
                        break;
                    case gID + '_nexttimespan':
                        _this.parent.nextTimeSpan();
                        break;
                    case gID + '_zoomin':
                        _this.zoomIn();
                        break;
                    case gID + '_zoomout':
                        _this.zoomOut();
                        break;
                    case gID + '_zoomtofit':
                        _this.zoomToFit();
                        break;
                }
            }
        });
    };
    /**
     *
     * @returns {void} .
     * @private
     */
    Toolbar.prototype.zoomIn = function () {
        this.parent.timelineModule.processZooming(true);
    };
    /**
     *
     * @returns {void} .
     * @private
     */
    Toolbar.prototype.zoomToFit = function () {
        if (this.parent.timelineModule.isZoomIn) {
            this.parent.timelineModule.isZoomIn = false;
        }
        this.parent.timelineModule.processZoomToFit();
        this.parent.ganttChartModule.updateScrollLeft(0);
    };
    /**
     *
     * @returns {void} .
     * @private
     */
    Toolbar.prototype.zoomOut = function () {
        this.parent.timelineModule.processZooming(false);
    };
    /**
     * To refresh toolbar items bases current state of tasks
     *
     * @param {RowSelectEventArgs} args .
     * @returns {void} .
     */
    Toolbar.prototype.refreshToolbarItems = function (args) {
        var gObj = this.parent;
        var enableItems = [];
        var disableItems = [];
        var edit = gObj.editSettings;
        var gID = this.id;
        var ind = gObj.selectedRowIndex;
        var previousGanttRecord;
        var isSelected = gObj.selectionModule ? gObj.selectionModule.selectedRowIndexes.length === 1 ||
            gObj.selectionModule.getSelectedRowCellIndexes().length === 1 ? true : false : false;
        var toolbarItems = this.toolbar ? this.toolbar.items : [];
        var toolbarDefaultItems = [gID + '_add', gID + '_edit', gID + '_delete',
            gID + '_update', gID + '_cancel', gID + '_indent', gID + '_outdent'];
        var isResouceParent = (this.parent.viewType === 'ResourceView' && getValue('data.level', args) !== 0
            || this.parent.viewType === 'ProjectView');
        if (!isNullOrUndefined(this.parent.editModule)) {
            var touchEdit = gObj.editModule.taskbarEditModule ?
                gObj.editModule.taskbarEditModule.touchEdit : false;
            var hasData = gObj.flatData && gObj.flatData.length;
            // eslint-disable-next-line
            edit.allowAdding && !touchEdit ? enableItems.push(gID + '_add') : disableItems.push(gID + '_add');
            // eslint-disable-next-line
            edit.allowEditing && isResouceParent && hasData && isSelected && !touchEdit ?
                enableItems.push(gID + '_edit') : disableItems.push(gID + '_edit');
            if (!edit.allowEditing || ind === 0 || ind === -1 || !hasData || !isSelected || this.parent.viewType === 'ResourceView') {
                disableItems.push(gID + '_indent');
                disableItems.push(gID + '_outdent');
            }
            else {
                if (gObj.updatedRecords[ind].level === 0 && hasData && !touchEdit) {
                    enableItems.push(gID + '_indent');
                    disableItems.push(gID + '_outdent');
                }
                else {
                    previousGanttRecord = gObj.updatedRecords[ind - 1];
                    if ((gObj.updatedRecords[ind].level - previousGanttRecord.level === 1) && ind !== -1) {
                        disableItems.push(gID + '_indent');
                        enableItems.push(gID + '_outdent');
                    }
                    else if (ind !== -1) {
                        enableItems.push(gID + '_indent');
                        enableItems.push(gID + '_outdent');
                    }
                }
            }
            var isDeleteSelected = gObj.selectionModule ? gObj.selectionModule.selectedRowIndexes.length > 0 ||
                gObj.selectionModule.getSelectedRowCellIndexes().length > 0 ? true : false : false;
            // eslint-disable-next-line
            edit.allowDeleting && hasData && isDeleteSelected && !touchEdit ?
                enableItems.push(gID + '_delete') : disableItems.push(gID + '_delete');
            if (gObj.editSettings.mode === 'Auto' && !isNullOrUndefined(gObj.editModule.cellEditModule)
                && gObj.editModule.cellEditModule.isCellEdit) {
                // New initialization for enableItems and disableItems during isCellEdit
                enableItems = [];
                enableItems.push(gID + '_update', gID + '_cancel');
                disableItems = [];
                for (var t = 0; t < toolbarItems.length; t++) {
                    if (toolbarItems[t].id !== gID + '_update' && toolbarItems[t].id !== gID + '_cancel' &&
                        toolbarDefaultItems.indexOf(toolbarItems[t].id) !== -1) {
                        disableItems.push(toolbarItems[t].id);
                    }
                }
            }
            else {
                disableItems.push(gID + '_update', gID + '_cancel');
                for (var t = 0; t < toolbarItems.length; t++) {
                    if (enableItems.indexOf(toolbarItems[t].id) === -1 &&
                        disableItems.indexOf(toolbarItems[t].id) === -1) {
                        enableItems.push(toolbarItems[t].id);
                    }
                }
            }
        }
        else {
            disableItems.push(gID + '_delete');
            disableItems.push(gID + '_add');
            disableItems.push(gID + '_edit');
            disableItems.push(gID + '_update');
            disableItems.push(gID + '_cancel');
            disableItems.push(gID + '_indent');
            disableItems.push(gID + '_outdent');
        }
        for (var e = 0; e < enableItems.length; e++) {
            var index = void 0;
            for (var t = 0; t < toolbarItems.length; t++) {
                if (toolbarItems[t].id === enableItems[e]) {
                    index = t;
                    break;
                }
            }
            if (toolbarItems.length > 0) {
                this.toolbar.hideItem(index, false);
            }
        }
        for (var d = 0; d < disableItems.length; d++) {
            var index = void 0;
            for (var t = 0; t < toolbarItems.length; t++) {
                if (toolbarItems[t].id === disableItems[d]) {
                    index = t;
                    break;
                }
            }
            if (toolbarItems.length > 0) {
                this.toolbar.hideItem(index, true);
            }
        }
    };
    /**
     * Enables or disables ToolBar items.
     *
     * @param {string[]} items - Defines the collection of itemID of ToolBar items.
     * @param {boolean} isEnable - Defines the items to be enabled or disabled.
     * @returns {void} .
     * @hidden
     */
    Toolbar.prototype.enableItems = function (items, isEnable) {
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            var element = this.element.querySelector('#' + item);
            if (element) {
                this.toolbar.enableItems(element.parentElement, isEnable);
            }
        }
    };
    /**
     * Destroys the Sorting of TreeGrid.
     *
     * @function destroy
     * @returns {void} .
     * @private
     */
    Toolbar.prototype.destroy = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.toolbar.off('render-react-toolbar-template', this.addReactToolbarPortals);
        this.toolbar.destroy();
        if (this.parent.filterModule) {
            this.unWireEvent();
        }
        remove(this.element);
    };
    return Toolbar;
}());
export { Toolbar };
