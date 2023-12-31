import { detach, closest, Browser, isNullOrUndefined as isNOU } from '@syncfusion/ej2-base';
import { isNullOrUndefined, EventHandler, addClass, removeClass } from '@syncfusion/ej2-base';
import { Popup } from '@syncfusion/ej2-popups';
import { Button } from '@syncfusion/ej2-buttons';
import * as events from '../base/constant';
import { RenderType } from '../base/enum';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import * as classes from '../base/classes';
import { dispatchEvent, parseHtml, hasClass } from '../base/util';
/**
 * `Table` module is used to handle table actions.
 */
var Table = /** @class */ (function () {
    function Table(parent, serviceLocator) {
        this.ensureInsideTableList = true;
        this.pageX = null;
        this.pageY = null;
        this.moveEle = null;
        this.currentColumnResize = '';
        this.currentMarginLeft = 0;
        this.parent = parent;
        this.rteID = parent.element.id;
        this.l10n = serviceLocator.getService('rteLocale');
        this.rendererFactory = serviceLocator.getService('rendererFactory');
        this.dialogRenderObj = serviceLocator.getService('dialogRenderObject');
        this.addEventListener();
    }
    Table.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(events.createTable, this.renderDlgContent, this);
        this.parent.on(events.initialEnd, this.afterRender, this);
        this.parent.on(events.dynamicModule, this.afterRender, this);
        this.parent.on(events.showTableDialog, this.showDialog, this);
        this.parent.on(events.closeTableDialog, this.closeDialog, this);
        this.parent.on(events.docClick, this.docClick, this);
        this.parent.on(events.editAreaClick, this.editAreaClickHandler, this);
        this.parent.on(events.clearDialogObj, this.clearDialogObj, this);
        this.parent.on(events.tableToolbarAction, this.onToolbarAction, this);
        this.parent.on(events.dropDownSelect, this.dropdownSelect, this);
        this.parent.on(events.keyDown, this.keyDown, this);
        this.parent.on(events.mouseUp, this.selectionTable, this);
        this.parent.on(events.tableModulekeyUp, this.tableModulekeyUp, this);
        this.parent.on(events.bindCssClass, this.setCssClass, this);
        this.parent.on(events.destroy, this.destroy, this);
        this.parent.on(events.moduleDestroy, this.moduleDestroy, this);
    };
    Table.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(events.createTable, this.renderDlgContent);
        this.parent.off(events.initialEnd, this.afterRender);
        this.parent.off(events.dynamicModule, this.afterRender);
        this.parent.off(events.docClick, this.docClick);
        this.parent.off(events.showTableDialog, this.showDialog);
        this.parent.off(events.closeTableDialog, this.closeDialog);
        this.parent.off(events.editAreaClick, this.editAreaClickHandler);
        this.parent.off(events.clearDialogObj, this.clearDialogObj);
        this.parent.off(events.tableToolbarAction, this.onToolbarAction);
        this.parent.off(events.dropDownSelect, this.dropdownSelect);
        this.parent.off(events.mouseDown, this.cellSelect);
        this.parent.off(events.tableColorPickerChanged, this.setBGColor);
        this.parent.off(events.keyDown, this.keyDown);
        this.parent.off(events.mouseUp, this.selectionTable);
        this.parent.off(events.tableModulekeyUp, this.tableModulekeyUp);
        this.parent.off(events.bindCssClass, this.setCssClass);
        this.parent.off(events.destroy, this.destroy);
        this.parent.off(events.moduleDestroy, this.moduleDestroy);
    };
    Table.prototype.updateCss = function (currentObj, e) {
        if (currentObj && e.cssClass) {
            if (isNullOrUndefined(e.oldCssClass)) {
                currentObj.setProperties({ cssClass: (currentObj.cssClass + ' ' + e.cssClass).trim() });
            }
            else {
                currentObj.setProperties({ cssClass: (currentObj.cssClass.replace(e.oldCssClass, '').trim() + ' ' + e.cssClass).trim() });
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/tslint/config
    Table.prototype.setCssClass = function (e) {
        if (this.popupObj && e.cssClass) {
            if (isNullOrUndefined(e.oldCssClass)) {
                addClass([this.popupObj.element], e.cssClass);
            }
            else {
                removeClass([this.popupObj.element], e.oldCssClass);
                addClass([this.popupObj.element], e.cssClass);
            }
        }
        this.updateCss(this.createTableButton, e);
        this.updateCss(this.editdlgObj, e);
        var numericTextBoxObj = [
            this.columnTextBox, this.rowTextBox, this.tableWidthNum, this.tableCellPadding, this.tableCellSpacing
        ];
        for (var i = 0; i < numericTextBoxObj.length; i++) {
            this.updateCss(numericTextBoxObj[i], e);
        }
    };
    Table.prototype.selectionTable = function (e) {
        var target = e.args.target;
        if (Browser.info.name === 'mozilla' && !isNOU(closest(target, 'table')) && closest(target, 'table').tagName === 'TABLE') {
            this.parent.contentModule.getEditPanel().setAttribute('contenteditable', 'true');
        }
    };
    Table.prototype.afterRender = function () {
        if (isNullOrUndefined(this.contentModule)) {
            this.contentModule = this.rendererFactory.getRenderer(RenderType.Content);
            this.parent.on(events.tableColorPickerChanged, this.setBGColor, this);
            this.parent.on(events.mouseDown, this.cellSelect, this);
            if (this.parent.tableSettings.resize) {
                EventHandler.add(this.parent.contentModule.getEditPanel(), Browser.touchStartEvent, this.resizeStart, this);
            }
            if (!Browser.isDevice && this.parent.tableSettings.resize) {
                EventHandler.add(this.contentModule.getEditPanel(), 'mouseover', this.resizeHelper, this);
            }
        }
    };
    Table.prototype.dropdownSelect = function (e) {
        var item = e.item;
        if (!document.body.contains(document.body.querySelector('.e-rte-quick-toolbar')) || item.command !== 'Table') {
            return;
        }
        var range = this.parent.formatter.editorManager.nodeSelection.getRange(this.parent.contentModule.getDocument());
        var args = {
            args: e,
            selection: this.parent.formatter.editorManager.nodeSelection.save(range, this.contentModule.getDocument()),
            selectParent: this.parent.formatter.editorManager.nodeSelection.getParentNodeCollection(range)
        };
        switch (item.subCommand) {
            case 'InsertRowBefore':
            case 'InsertRowAfter':
                this.addRow(args.selection, e);
                break;
            case 'InsertColumnLeft':
            case 'InsertColumnRight':
                this.addColumn(args.selection, e);
                break;
            case 'DeleteColumn':
            case 'DeleteRow':
                this.removeRowColumn(args.selection, e);
                break;
            case 'AlignTop':
            case 'AlignMiddle':
            case 'AlignBottom':
                this.verticalAlign(args, e);
                break;
            case 'Dashed':
            case 'Alternate':
            case 'Custom':
                this.tableStyles(args, item.subCommand);
                break;
            case 'Merge':
            case 'VerticalSplit':
            case 'HorizontalSplit':
                this.UpdateCells(args.selection, e);
                break;
        }
    };
    Table.prototype.UpdateCells = function (selectCell, e) {
        this.parent.formatter.process(this.parent, e, e, { selection: selectCell, subCommand: e.item.subCommand });
        this.hideTableQuickToolbar();
    };
    Table.prototype.keyDown = function (e) {
        var event = e.args;
        // eslint-disable-next-line
        var proxy = this;
        switch (event.action) {
            case 'escape':
                break;
            case 'insert-table':
                this.openDialog(true, e);
                event.preventDefault();
                break;
        }
        if (!isNullOrUndefined(this.parent.formatter.editorManager.nodeSelection) && this.contentModule
            && event.code !== 'KeyK') {
            var selection = void 0;
            var range = this.parent.formatter.editorManager.nodeSelection.getRange(this.parent.contentModule.getDocument());
            var ele = this.parent.formatter.editorManager.nodeSelection.getParentNodeCollection(range)[0];
            ele = (ele && ele.tagName !== 'TD' && ele.tagName !== 'TH') ? ele.parentElement : ele;
            if ((event.keyCode === 8 || event.keyCode === 46) ||
                (event.ctrlKey && event.keyCode === 88)) {
                if (ele && ele.tagName === 'TBODY') {
                    if (!isNullOrUndefined(this.parent.formatter.editorManager.nodeSelection) && this.contentModule) {
                        selection = this.parent.formatter.editorManager.nodeSelection.save(range, this.contentModule.getDocument());
                    }
                    event.preventDefault();
                    proxy.removeTable(selection, event, true);
                }
                else if (ele && ele.querySelectorAll('table').length > 0) {
                    this.removeResizeElement();
                    this.hideTableQuickToolbar();
                }
            }
            if (ele && ele.tagName !== 'TD' && ele.tagName !== 'TH') {
                var closestTd = closest(ele, 'td');
                ele = !isNullOrUndefined(closestTd) && this.parent.inputElement.contains(closestTd) ? closestTd : ele;
            }
            if (ele && (ele.tagName === 'TD' || ele.tagName === 'TH')) {
                if (!isNullOrUndefined(this.parent.formatter.editorManager.nodeSelection) && this.contentModule) {
                    selection = this.parent.formatter.editorManager.nodeSelection.save(range, this.contentModule.getDocument());
                }
                switch (event.keyCode) {
                    case 9:
                    case 37:
                    case 39:
                        proxy.tabSelection(event, selection, ele);
                        break;
                    case 40:
                    case 38:
                        proxy.tableArrowNavigation(event, selection, ele);
                        break;
                }
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Table.prototype.tableModulekeyUp = function (e) {
        if (!isNullOrUndefined(this.parent.formatter.editorManager.nodeSelection) && this.contentModule) {
            var range = this.parent.formatter.editorManager.nodeSelection.getRange(this.parent.contentModule.getDocument());
            var ele = this.parent.formatter.editorManager.nodeSelection.getParentNodeCollection(range)[0];
            ele = (ele && ele.tagName !== 'TD' && ele.tagName !== 'TH') ? ele.parentElement : ele;
            if (ele && ele.tagName !== 'TD' && ele.tagName !== 'TH') {
                var closestTd = closest(ele, 'td');
                ele = !isNullOrUndefined(closestTd) && this.parent.inputElement.contains(closestTd) ? closestTd : ele;
            }
            if (this.previousTableElement !== ele && !isNullOrUndefined(this.previousTableElement)) {
                this.previousTableElement.classList.remove(classes.CLS_TABLE_SEL);
            }
        }
    };
    Table.prototype.openDialog = function (isInternal, e) {
        if (!isInternal) {
            this.parent.contentModule.getEditPanel().focus();
        }
        if (this.parent.editorMode === 'HTML') {
            var docElement = this.parent.contentModule.getDocument();
            var range = this.parent.formatter.editorManager.nodeSelection.getRange(docElement);
            var selection = this.parent.formatter.editorManager.nodeSelection.save(range, docElement);
            var args = {
                originalEvent: e ? e.args : { action: 'insert-table' },
                item: {
                    command: 'Table',
                    subCommand: 'CreateTable'
                },
                name: !isInternal ? 'showDialog' : null
            };
            this.insertTableDialog({ self: this, args: args, selection: selection });
        }
    };
    Table.prototype.showDialog = function () {
        this.openDialog(false);
        this.setCssClass({ cssClass: this.parent.cssClass });
    };
    Table.prototype.closeDialog = function () {
        if (this.editdlgObj) {
            this.editdlgObj.hide({ returnValue: true });
        }
    };
    Table.prototype.onToolbarAction = function (args) {
        var item = args.args.item;
        switch (item.subCommand) {
            case 'TableHeader':
                this.tableHeader(args.selection, args.args);
                break;
            case 'TableRemove':
                this.removeTable(args.selection, args.args);
                break;
            case 'TableEditProperties':
                this.editTable(args);
                break;
        }
    };
    Table.prototype.verticalAlign = function (args, e) {
        var tdEle = closest(args.selectParent[0], 'td') || closest(args.selectParent[0], 'th');
        if (tdEle) {
            this.parent.formatter.process(this.parent, e, e, { tableCell: tdEle, subCommand: e.item.subCommand });
        }
    };
    Table.prototype.tableStyles = function (args, command) {
        var table = closest(args.selectParent[0], 'table');
        if (command === 'Dashed') {
            /* eslint-disable */
            (this.parent.element.classList.contains(classes.CLS_TB_DASH_BOR)) ?
                this.parent.element.classList.remove(classes.CLS_TB_DASH_BOR) : this.parent.element.classList.add(classes.CLS_TB_DASH_BOR);
            (table.classList.contains(classes.CLS_TB_DASH_BOR)) ? table.classList.remove(classes.CLS_TB_DASH_BOR) :
                table.classList.add(classes.CLS_TB_DASH_BOR);
        }
        if (command === 'Alternate') {
            (this.parent.element.classList.contains(classes.CLS_TB_ALT_BOR)) ?
                this.parent.element.classList.remove(classes.CLS_TB_ALT_BOR) : this.parent.element.classList.add(classes.CLS_TB_ALT_BOR);
            (table.classList.contains(classes.CLS_TB_ALT_BOR)) ? table.classList.remove(classes.CLS_TB_ALT_BOR) :
                table.classList.add(classes.CLS_TB_ALT_BOR);
            /* eslint-enable */
        }
        if (args.args && args.args.item.cssClass) {
            var classList = args.args.item.cssClass.split(' ');
            for (var i = 0; i < classList.length; i++) {
                if (table.classList.contains(classList[i])) {
                    table.classList.remove(classList[i]);
                }
                else {
                    table.classList.add(classList[i]);
                }
            }
        }
        this.parent.formatter.saveData();
        this.parent.formatter.editorManager.nodeSelection.restore();
    };
    Table.prototype.insideList = function (range) {
        var blockNodes = this.parent.formatter.editorManager.domNode.blockNodes();
        var nodes = [];
        for (var i = 0; i < blockNodes.length; i++) {
            if (blockNodes[i].parentNode.tagName === 'LI') {
                nodes.push(blockNodes[i].parentNode);
            }
            else if (blockNodes[i].tagName === 'LI' && blockNodes[i].childNodes[0].tagName !== 'P' &&
                (blockNodes[i].childNodes[0].tagName !== 'OL' &&
                    blockNodes[i].childNodes[0].tagName !== 'UL')) {
                nodes.push(blockNodes[i]);
            }
        }
        if (nodes.length > 1 || nodes.length && ((range.startOffset === 0 && range.endOffset === 0))) {
            this.ensureInsideTableList = true;
            return true;
        }
        else {
            this.ensureInsideTableList = false;
            return false;
        }
    };
    Table.prototype.tabSelection = function (event, selection, ele) {
        this.previousTableElement = ele;
        var insideList = this.insideList(selection.range);
        if ((event.keyCode === 37 || event.keyCode === 39) && selection.range.startContainer.nodeType === 3 ||
            insideList) {
            return;
        }
        event.preventDefault();
        ele.classList.remove(classes.CLS_TABLE_SEL);
        if (!event.shiftKey && event.keyCode !== 37) {
            var nextElement = (!isNullOrUndefined(ele.nextSibling)) ? ele.nextSibling :
                (!isNullOrUndefined(closest(ele, 'tr').nextSibling) ? closest(ele, 'tr').nextSibling.childNodes[0] :
                    (!isNullOrUndefined(closest(ele, 'table').nextSibling)) ?
                        (closest(ele, 'table').nextSibling.nodeName.toLowerCase() === 'td') ?
                            closest(ele, 'table').nextSibling : ele : ele);
            if (ele === nextElement && ele.nodeName === 'TH') {
                nextElement = closest(ele, 'table').rows[1].cells[0];
            }
            if (event.keyCode === 39 && ele === nextElement) {
                nextElement = closest(ele, 'table').nextSibling;
            }
            if (nextElement) {
                // eslint-disable-next-line
                (nextElement.textContent.trim() !== '' && closest(nextElement, 'td')) ?
                    selection.setSelectionNode(this.contentModule.getDocument(), nextElement) :
                    selection.setSelectionText(this.contentModule.getDocument(), nextElement, nextElement, 0, 0);
            }
            if (ele === nextElement && event.keyCode !== 39 && nextElement) {
                ele.classList.add(classes.CLS_TABLE_SEL);
                this.addRow(selection, event, true);
                ele.classList.remove(classes.CLS_TABLE_SEL);
                nextElement = nextElement.parentElement.nextSibling ? nextElement.parentElement.nextSibling.firstChild :
                    nextElement.parentElement.firstChild;
                // eslint-disable-next-line
                (nextElement.textContent.trim() !== '' && closest(nextElement, 'td')) ?
                    selection.setSelectionNode(this.contentModule.getDocument(), nextElement) :
                    selection.setSelectionText(this.contentModule.getDocument(), nextElement, nextElement, 0, 0);
            }
        }
        else {
            var prevElement = (!isNullOrUndefined(ele.previousSibling)) ? ele.previousSibling :
                (!isNullOrUndefined(closest(ele, 'tr').previousSibling) ?
                    closest(ele, 'tr').previousSibling.childNodes[closest(ele, 'tr').previousSibling.childNodes.length - 1] :
                    (!isNullOrUndefined(closest(ele, 'table').previousSibling)) ?
                        (closest(ele, 'table').previousSibling.nodeName.toLowerCase() === 'td') ? closest(ele, 'table').previousSibling :
                            ele : ele);
            if (ele === prevElement && ele.cellIndex === 0 &&
                closest(ele, 'table').tHead) {
                var clsTble = closest(ele, 'table');
                prevElement = clsTble.rows[0].cells[clsTble.rows[0].cells.length - 1];
            }
            if (event.keyCode === 37 && ele === prevElement) {
                prevElement = closest(ele, 'table').previousSibling;
            }
            if (prevElement) {
                // eslint-disable-next-line
                (prevElement.textContent.trim() !== '' && closest(prevElement, 'td')) ?
                    selection.setSelectionNode(this.contentModule.getDocument(), prevElement) :
                    selection.setSelectionText(this.contentModule.getDocument(), prevElement, prevElement, 0, 0);
            }
        }
    };
    Table.prototype.tableArrowNavigation = function (event, selection, ele) {
        var selText = selection.range.startContainer;
        if ((event.keyCode === 40 && selText.nodeType === 3 && (selText.nextSibling && selText.nextSibling.nodeName === 'BR' ||
            selText.parentNode && selText.parentNode.nodeName !== 'TD')) ||
            (event.keyCode === 38 && selText.nodeType === 3 && (selText.previousSibling && selText.previousSibling.nodeName === 'BR' ||
                selText.parentNode && selText.parentNode.nodeName !== 'TD'))) {
            return;
        }
        event.preventDefault();
        ele.classList.remove(classes.CLS_TABLE_SEL);
        if (event.keyCode === 40) {
            ele = (!isNullOrUndefined(closest(ele, 'tr').nextElementSibling)) ?
                closest(ele, 'tr').nextElementSibling.children[ele.cellIndex] :
                (closest(ele, 'table').tHead && ele.nodeName === 'TH') ?
                    closest(ele, 'table').rows[1].cells[ele.cellIndex] :
                    (!isNullOrUndefined(closest(ele, 'table').nextSibling)) ? closest(ele, 'table').nextSibling :
                        ele;
        }
        else {
            ele = (!isNullOrUndefined(closest(ele, 'tr').previousElementSibling)) ?
                closest(ele, 'tr').previousElementSibling.children[ele.cellIndex] :
                (closest(ele, 'table').tHead && ele.nodeName !== 'TH') ?
                    closest(ele, 'table').tHead.rows[0].cells[ele.cellIndex] :
                    (!isNullOrUndefined(closest(ele, 'table').previousSibling)) ? closest(ele, 'table').previousSibling :
                        ele;
        }
        if (ele) {
            selection.setSelectionText(this.contentModule.getDocument(), ele, ele, 0, 0);
        }
    };
    Table.prototype.setBGColor = function (args) {
        var range = this.parent.formatter.editorManager.nodeSelection.getRange(this.contentModule.getDocument());
        // eslint-disable-next-line
        var selection = this.parent.formatter.editorManager.nodeSelection.save(range, this.contentModule.getDocument());
        // eslint-disable-next-line
        var selectedCells = this.curTable.querySelectorAll('.e-cell-select');
        for (var i = 0; i < selectedCells.length; i++) {
            selectedCells[i].style.backgroundColor = args.item.value;
        }
        this.parent.formatter.saveData();
    };
    Table.prototype.hideTableQuickToolbar = function () {
        if (this.quickToolObj && this.quickToolObj.tableQTBar && document.body.contains(this.quickToolObj.tableQTBar.element)) {
            this.quickToolObj.tableQTBar.hidePopup();
        }
    };
    Table.prototype.tableHeader = function (selection, e) {
        this.parent.formatter.process(this.parent, e, e.originalEvent, { selection: selection, subCommand: e.item.subCommand });
    };
    Table.prototype.editAreaClickHandler = function (e) {
        if (this.parent.readonly || !isNOU(closest(e.args.target, '.e-img-caption'))) {
            return;
        }
        var args = e.args;
        var showOnRightClick = this.parent.quickToolbarSettings.showOnRightClick;
        if (args.which === 2 || (showOnRightClick && args.which === 1) || (!showOnRightClick && args.which === 3)) {
            return;
        }
        if (this.parent.editorMode === 'HTML' && this.parent.quickToolbarModule && this.parent.quickToolbarModule.tableQTBar) {
            this.quickToolObj = this.parent.quickToolbarModule;
            var target = args.target;
            this.contentModule = this.rendererFactory.getRenderer(RenderType.Content);
            var isPopupOpen = this.quickToolObj.tableQTBar.element.classList.contains('e-rte-pop');
            if (isPopupOpen) {
                return;
            }
            var range = this.parent.formatter.editorManager.nodeSelection.getRange(this.contentModule.getDocument());
            var closestTable = closest(target, 'table');
            var startNode = this.parent.getRange().startContainer.parentElement;
            var endNode = this.parent.getRange().endContainer.parentElement;
            if (target && target.nodeName !== 'A' && target.nodeName !== 'IMG' && target.nodeName !== 'VIDEO' && !target.classList.contains(classes.CLS_CLICKELEM) &&
                target.nodeName !== 'AUDIO' && startNode === endNode && (target.nodeName === 'TD' || target.nodeName === 'TH' ||
                target.nodeName === 'TABLE' || (closestTable && this.parent.contentModule.getEditPanel().contains(closestTable)))
                && !(range.startContainer.nodeType === 3 && !range.collapsed)) {
                var range_1 = this.parent.formatter.editorManager.nodeSelection.getRange(this.contentModule.getDocument());
                this.parent.formatter.editorManager.nodeSelection.save(range_1, this.contentModule.getDocument());
                this.parent.formatter.editorManager.nodeSelection.Clear(this.contentModule.getDocument());
                var pageX = void 0;
                var pageY = void 0;
                if (Browser.isDevice && e.args.touches) {
                    pageX = e.args.changedTouches[0].pageX;
                    pageY = e.args.changedTouches[0].pageY;
                }
                else {
                    pageX = (this.parent.iframeSettings.enable) ? window.pageXOffset
                        + this.parent.element.getBoundingClientRect().left + args.clientX : args.pageX;
                    pageY = (this.parent.iframeSettings.enable) ? window.pageYOffset +
                        this.parent.element.getBoundingClientRect().top + args.clientY : args.pageY;
                }
                this.quickToolObj.tableQTBar.showPopup(pageX, pageY, target);
                this.parent.formatter.editorManager.nodeSelection.restore();
            }
            else {
                this.hideTableQuickToolbar();
            }
        }
    };
    Table.prototype.tableCellSelect = function (e) {
        var target = e.target;
        var row = Array.prototype.slice.call(target.parentElement.parentElement.children).indexOf(target.parentElement);
        var col = Array.prototype.slice.call(target.parentElement.children).indexOf(target);
        var list = this.dlgDiv.querySelectorAll('.e-rte-tablecell');
        Array.prototype.forEach.call(list, function (item) {
            var parentIndex = Array.prototype.slice.call(item.parentElement.parentElement.children).indexOf(item.parentElement);
            var cellIndex = Array.prototype.slice.call(item.parentElement.children).indexOf(item);
            removeClass([item], 'e-active');
            if (parentIndex <= row && cellIndex <= col) {
                addClass([item], 'e-active');
            }
        });
        this.tblHeader.innerHTML = (col + 1) + 'x' + (row + 1);
    };
    // eslint-disable-next-line
    Table.prototype.tableMouseUp = function (e) {
        EventHandler.remove(this.curTable, 'mousemove', this.tableMove);
    };
    // eslint-disable-next-line
    Table.prototype.tableCellLeave = function (e) {
        removeClass(this.dlgDiv.querySelectorAll('.e-rte-tablecell'), 'e-active');
        addClass([this.dlgDiv.querySelector('.e-rte-tablecell')], 'e-active');
        this.tblHeader.innerHTML = 1 + 'x' + 1;
    };
    Table.prototype.tableCellClick = function (e) {
        var target = e.target;
        var row = Array.prototype.slice.call(target.parentElement.parentElement.children).indexOf(target.parentElement) + 1;
        var col = Array.prototype.slice.call(target.parentElement.children).indexOf(target) + 1;
        this.self.tableInsert(row, col, e, this);
    };
    Table.prototype.tableInsert = function (row, col, e, selectionObj) {
        var proxy = (selectionObj.self) ? selectionObj.self : this;
        var startContainer = selectionObj.selection.range.startContainer;
        if (startContainer.nodeName === 'P' && startContainer.textContent.trim() === '' && !(startContainer.childNodes.length > 0)) {
            startContainer.innerHTML = '<br />';
        }
        var parentNode = startContainer.parentNode;
        if (proxy.parent.editorMode === 'HTML' &&
            ((proxy.parent.iframeSettings.enable && !hasClass(parentNode.ownerDocument.querySelector('body'), 'e-lib')) ||
                // eslint-disable-next-line
                (!proxy.parent.iframeSettings.enable && isNOU(closest(parentNode, '[id=' + "'" + proxy.contentModule.getPanel().id + "'" + ']'))))) {
            proxy.contentModule.getEditPanel().focus();
            var range = proxy.parent.formatter.editorManager.nodeSelection.getRange(proxy.contentModule.getDocument());
            selectionObj.selection = proxy.parent.formatter.editorManager.nodeSelection.save(range, proxy.contentModule.getDocument());
        }
        var value = {
            rows: row, columns: col, width: {
                minWidth: proxy.parent.tableSettings.minWidth,
                maxWidth: proxy.parent.tableSettings.maxWidth,
                width: proxy.parent.tableSettings.width
            },
            selection: selectionObj.selection
        };
        if (proxy.popupObj) {
            proxy.popupObj.hide();
        }
        if (proxy.editdlgObj) {
            proxy.editdlgObj.hide();
        }
        proxy.parent.formatter.process(proxy.parent, selectionObj.args, selectionObj.args.originalEvent, value);
        proxy.contentModule.getEditPanel().focus();
        proxy.parent.on(events.mouseDown, proxy.cellSelect, proxy);
    };
    Table.prototype.cellSelect = function (e) {
        var target = e.args.target;
        var tdNode = closest(target, 'td,th');
        target = (target.nodeName !== 'TD' && tdNode && this.parent.contentModule.getEditPanel().contains(tdNode)) ?
            tdNode : target;
        removeClass(this.contentModule.getEditPanel().querySelectorAll('table td, table th'), classes.CLS_TABLE_SEL);
        if (target && (target.tagName === 'TD' || target.tagName === 'TH')) {
            addClass([target], classes.CLS_TABLE_SEL);
            this.activeCell = target;
            this.curTable = (this.curTable) ? this.curTable : closest(target, 'table');
            EventHandler.add(this.curTable, 'mousemove', this.tableMove, this);
            EventHandler.add(this.curTable, 'mouseup', this.tableMouseUp, this);
            this.removeResizeElement();
            if (this.helper && this.contentModule.getEditPanel().contains(this.helper)) {
                detach(this.helper);
            }
        }
        if (Browser.info.name === 'mozilla' && !isNOU(closest(target, 'table')) &&
            closest(target, 'table').tagName === 'TABLE') {
            this.parent.contentModule.getEditPanel().setAttribute('contenteditable', 'false');
        }
    };
    Table.prototype.tableMove = function (event) {
        this.parent.formatter.editorManager.observer.notify('TABLE_MOVE', { event: event, selectNode: [this.activeCell] });
    };
    Table.prototype.resizeHelper = function (e) {
        if (this.parent.readonly) {
            return;
        }
        var target = e.target || e.targetTouches[0].target;
        var closestTable = closest(target, 'table.e-rte-table');
        if (!isNOU(this.curTable) && !isNOU(closestTable) && closestTable !== this.curTable &&
            this.parent.contentModule.getEditPanel().contains(closestTable)) {
            this.removeResizeElement();
            this.removeHelper(e);
            this.cancelResizeAction();
        }
        if (target.nodeName === 'TABLE' || target.nodeName === 'TD' || target.nodeName === 'TH') {
            this.curTable = (closestTable && this.parent.contentModule.getEditPanel().contains(closestTable))
                && (target.nodeName === 'TD' || target.nodeName === 'TH') ?
                closestTable : target;
            this.removeResizeElement();
            this.tableResizeEleCreation(this.curTable, e);
        }
    };
    Table.prototype.tableResizeEleCreation = function (table, e) {
        this.parent.preventDefaultResize(e);
        var columns = table.rows[this.calMaxCol(table)].cells;
        var rows = [];
        for (var i = 0; i < table.rows.length; i++) {
            rows.push(Array.prototype.slice.call(table.rows[i].cells, 0, 1)[0]);
        }
        var height = parseInt(getComputedStyle(table).height, 10);
        var width = parseInt(getComputedStyle(table).width, 10);
        var pos = this.calcPos(table);
        for (var i = 0; columns.length >= i; i++) {
            var colReEle = this.parent.createElement('span', {
                attrs: {
                    'data-col': (i).toString(), 'unselectable': 'on', 'contenteditable': 'false'
                }
            });
            colReEle.classList.add(classes.CLS_RTE_TABLE_RESIZE, classes.CLS_TB_COL_RES);
            if (columns.length === i) {
                colReEle.style.cssText = 'height: ' + height + 'px; width: 4px; top: ' + pos.top +
                    'px; left:' + (pos.left + this.calcPos(columns[i - 1]).left + columns[i - 1].offsetWidth) + 'px;';
            }
            else {
                colReEle.style.cssText = 'height: ' + height + 'px; width: 4px; top: ' + pos.top +
                    'px; left:' + (pos.left + this.calcPos(columns[i]).left) + 'px;';
            }
            this.contentModule.getEditPanel().appendChild(colReEle);
        }
        for (var i = 0; rows.length > i; i++) {
            var rowReEle = this.parent.createElement('span', {
                attrs: {
                    'data-row': (i).toString(), 'unselectable': 'on', 'contenteditable': 'false'
                }
            });
            rowReEle.classList.add(classes.CLS_RTE_TABLE_RESIZE, classes.CLS_TB_ROW_RES);
            var rowPosLeft = !isNOU(table.getAttribute('cellspacing')) || table.getAttribute('cellspacing') !== '' ?
                0 : this.calcPos(rows[i]).left;
            rowReEle.style.cssText = 'width: ' + width + 'px; height: 4px; top: ' +
                (this.calcPos(rows[i]).top + pos.top + rows[i].offsetHeight - 2) +
                'px; left:' + (rowPosLeft + pos.left) + 'px;';
            this.contentModule.getEditPanel().appendChild(rowReEle);
        }
        var tableReBox = this.parent.createElement('span', {
            className: classes.CLS_TB_BOX_RES + ' ' + this.parent.cssClass, attrs: {
                'data-col': columns.length.toString(), 'unselectable': 'on', 'contenteditable': 'false'
            }
        });
        tableReBox.style.cssText = 'top: ' + (pos.top + height - 4) +
            'px; left:' + (pos.left + width - 4) + 'px;';
        if (Browser.isDevice) {
            tableReBox.classList.add('e-rmob');
        }
        this.contentModule.getEditPanel().appendChild(tableReBox);
    };
    Table.prototype.removeResizeElement = function () {
        var item = this.parent.contentModule.getEditPanel().
            querySelectorAll('.e-column-resize, .e-row-resize, .e-table-box');
        if (item.length > 0) {
            for (var i = 0; i < item.length; i++) {
                detach(item[i]);
            }
        }
    };
    Table.prototype.calcPos = function (elem) {
        var parentOffset = {
            top: 0,
            left: 0
        };
        var offset = elem.getBoundingClientRect();
        var doc = elem.ownerDocument;
        var offsetParent = elem.offsetParent || doc.documentElement;
        var isNestedTable = false;
        while (offsetParent &&
            (offsetParent === doc.body || offsetParent === doc.documentElement) &&
            offsetParent.style.position === 'static') {
            offsetParent = offsetParent.parentNode;
        }
        if (offsetParent.nodeName === 'TD' && elem.nodeName === 'TABLE') {
            offsetParent = closest(offsetParent, '.e-rte-content');
            isNestedTable = true;
        }
        if (offsetParent && offsetParent !== elem && offsetParent.nodeType === 1) {
            parentOffset = offsetParent.getBoundingClientRect();
        }
        if (isNestedTable) {
            isNestedTable = false;
            var topValue = this.parent.inputElement && this.parent.inputElement.scrollTop > 0 ?
                (this.parent.inputElement.scrollTop + offset.top) - parentOffset.top : offset.top - parentOffset.top;
            var leftValue = this.parent.inputElement && this.parent.inputElement.scrollLeft > 0 ?
                (this.parent.inputElement.scrollLeft + offset.left) - parentOffset.left : offset.left - parentOffset.left;
            return {
                top: topValue,
                left: leftValue
            };
        }
        else {
            return {
                top: elem.offsetTop,
                left: elem.offsetLeft
            };
        }
    };
    Table.prototype.getPointX = function (e) {
        if (e.touches && e.touches.length) {
            return e.touches[0].pageX;
        }
        else {
            return e.pageX;
        }
    };
    Table.prototype.getPointY = function (e) {
        if (e.touches && e.touches.length) {
            return e.touches[0].pageY;
        }
        else {
            return e.pageY;
        }
    };
    Table.prototype.resizeStart = function (e) {
        var _this = this;
        if (this.parent.readonly) {
            return;
        }
        if (Browser.isDevice) {
            this.resizeHelper(e);
        }
        var target = e.target;
        if (target.classList.contains(classes.CLS_TB_COL_RES) ||
            target.classList.contains(classes.CLS_TB_ROW_RES) ||
            target.classList.contains(classes.CLS_TB_BOX_RES)) {
            e.preventDefault();
            this.parent.preventDefaultResize(e);
            removeClass(this.curTable.querySelectorAll('td,th'), classes.CLS_TABLE_SEL);
            this.parent.formatter.editorManager.nodeSelection.Clear(this.contentModule.getDocument());
            this.pageX = this.getPointX(e);
            this.pageY = this.getPointY(e);
            this.resizeBtnInit();
            this.hideTableQuickToolbar();
            if (target.classList.contains(classes.CLS_TB_COL_RES)) {
                this.resizeBtnStat.column = true;
                if (parseInt(target.getAttribute('data-col'), 10) === this.curTable.rows[this.calMaxCol(this.curTable)].cells.length) {
                    this.currentColumnResize = 'last';
                    this.columnEle = this.curTable.rows[this.calMaxCol(this.curTable)].cells[parseInt(target.getAttribute('data-col'), 10) - 1];
                }
                else {
                    if (parseInt(target.getAttribute('data-col'), 10) === 0) {
                        this.currentColumnResize = 'first';
                    }
                    else {
                        this.currentColumnResize = 'middle';
                    }
                    this.columnEle = this.curTable.rows[this.calMaxCol(this.curTable)].cells[parseInt(target.getAttribute('data-col'), 10)];
                }
                this.colIndex = this.columnEle.cellIndex;
                this.moveEle = e.target;
                this.appendHelper();
            }
            if (target.classList.contains(classes.CLS_TB_ROW_RES)) {
                this.rowEle = this.curTable.rows[parseInt(target.getAttribute('data-row'), 10)];
                this.resizeBtnStat.row = true;
                this.appendHelper();
            }
            if (target.classList.contains(classes.CLS_TB_BOX_RES)) {
                this.resizeBtnStat.tableBox = true;
            }
            if (Browser.isDevice && this.helper && !this.helper.classList.contains('e-reicon')) {
                this.helper.classList.add('e-reicon');
                EventHandler.add(document, Browser.touchStartEvent, this.removeHelper, this);
                EventHandler.add(this.helper, Browser.touchStartEvent, this.resizeStart, this);
            }
            else {
                var args = { event: e, requestType: 'Table' };
                this.parent.trigger(events.resizeStart, args, function (resizeStartArgs) {
                    if (resizeStartArgs.cancel) {
                        _this.cancelResizeAction();
                    }
                });
            }
            EventHandler.add(this.contentModule.getDocument(), Browser.touchMoveEvent, this.resizing, this);
            EventHandler.add(this.contentModule.getDocument(), Browser.touchEndEvent, this.resizeEnd, this);
        }
    };
    Table.prototype.removeHelper = function (e) {
        var cls = e.target.classList;
        if (!(cls.contains('e-reicon')) && this.helper) {
            EventHandler.remove(document, Browser.touchStartEvent, this.removeHelper);
            EventHandler.remove(this.helper, Browser.touchStartEvent, this.resizeStart);
            if (this.helper && this.contentModule.getEditPanel().contains(this.helper)) {
                detach(this.helper);
            }
            this.pageX = null;
            this.helper = null;
        }
    };
    Table.prototype.appendHelper = function () {
        this.helper = this.parent.createElement('div', {
            className: 'e-table-rhelper' + ' ' + this.parent.cssClass
        });
        if (Browser.isDevice) {
            this.helper.classList.add('e-reicon');
        }
        this.contentModule.getEditPanel().appendChild(this.helper);
        this.setHelperHeight();
    };
    Table.prototype.setHelperHeight = function () {
        var pos = this.calcPos(this.curTable);
        if (this.resizeBtnStat.column) {
            this.helper.classList.add('e-column-helper');
            this.helper.style.cssText = 'height: ' + getComputedStyle(this.curTable).height + '; top: ' +
                pos.top + 'px; left:' + ((pos.left + this.calcPos(this.columnEle).left) +
                (this.currentColumnResize === 'last' ? this.columnEle.offsetWidth + 2 : 0) - 1) + 'px;';
        }
        else {
            this.helper.classList.add('e-row-helper');
            this.helper.style.cssText = 'width: ' + getComputedStyle(this.curTable).width + '; top: ' +
                (this.calcPos(this.rowEle).top + pos.top + this.rowEle.offsetHeight) +
                'px; left:' + (this.calcPos(this.rowEle).left + pos.left) + 'px;';
        }
    };
    Table.prototype.updateHelper = function () {
        var pos = this.calcPos(this.curTable);
        if (this.resizeBtnStat.column) {
            var left = (pos.left + this.calcPos(this.columnEle).left) +
                (this.currentColumnResize === 'last' ? this.columnEle.offsetWidth + 2 : 0) - 1;
            this.helper.style.left = left + 'px';
        }
        else {
            var top_1 = this.calcPos(this.rowEle).top + pos.top + this.rowEle.offsetHeight;
            this.helper.style.top = top_1 + 'px';
        }
    };
    Table.prototype.calMaxCol = function (element) {
        var max = 0;
        var maxRowIndex;
        for (var i = 0; i < element.rows.length; i++) {
            if (max < element.rows[i].cells.length) {
                maxRowIndex = i;
                max = element.rows[i].cells.length;
            }
        }
        return maxRowIndex;
    };
    Table.prototype.resizing = function (e) {
        var _this = this;
        var pageX = this.getPointX(e);
        var pageY = this.getPointY(e);
        var mouseX = (this.parent.enableRtl) ? -(pageX - this.pageX) : (pageX - this.pageX);
        var mouseY = (this.parent.enableRtl) ? -(pageY - this.pageY) : (pageY - this.pageY);
        this.pageX = pageX;
        this.pageY = pageY;
        var maxiumWidth;
        var currentTdElement = this.curTable.closest('td');
        var args = { event: e, requestType: 'table' };
        var isRowCellsMerged = false;
        var mergedCellIndex;
        var mergedElement;
        this.parent.trigger(events.onResize, args, function (resizingArgs) {
            if (resizingArgs.cancel) {
                _this.cancelResizeAction();
            }
            else {
                var tableReBox = _this.contentModule.getEditPanel().querySelector('.e-table-box');
                var tableWidth = parseInt(getComputedStyle(_this.curTable).width, 10);
                var tableHeight = parseInt(getComputedStyle(_this.curTable).height, 10);
                var paddingSize = +getComputedStyle(_this.contentModule.getEditPanel()).paddingRight.match(/\d/g).join('');
                var rteWidth = _this.contentModule.getEditPanel().offsetWidth -
                    (_this.contentModule.getEditPanel().offsetWidth -
                        _this.contentModule.getEditPanel().clientWidth) - paddingSize * 2;
                var widthCompare = void 0;
                if (!isNOU(_this.curTable.parentElement.closest('table')) && !isNOU(_this.curTable.closest('td')) &&
                    _this.contentModule.getEditPanel().contains(_this.curTable.closest('td'))) {
                    var currentTd = _this.curTable.closest('td');
                    var currentTDPad = +getComputedStyle(currentTd).paddingRight.match(/\d/g).join('');
                    // Padding of the current table with the parent element multiply with 2.
                    widthCompare = currentTd.offsetWidth - (currentTd.offsetWidth - currentTd.clientWidth) - currentTDPad * 2;
                }
                else {
                    widthCompare = rteWidth;
                }
                if (_this.resizeBtnStat.column) {
                    var width = parseFloat(_this.columnEle.offsetWidth.toString());
                    var cellRow = _this.curTable.rows[0].cells[0].nodeName === 'TH' ? 1 : 0;
                    var currentTableWidth = void 0;
                    if (_this.curTable.style.width != '') {
                        currentTableWidth = parseFloat(_this.curTable.style.width.split('%')[0]);
                    }
                    else {
                        currentTableWidth = _this.getCurrentTableWidth(_this.curTable.offsetWidth, _this.parent.inputElement.offsetWidth);
                    }
                    var currentColumnCellWidth = parseFloat(_this.curTable.rows[cellRow].cells[_this.colIndex >= _this.curTable.rows[cellRow].cells.length ? _this.curTable.rows[cellRow].cells.length - 1 : _this.colIndex].style.width.split('%')[0]);
                    if (_this.currentColumnResize === 'first') {
                        mouseX = mouseX - 0.75; //This was done for to make the gripper and the table first/last column will be close.
                        _this.removeResizeElement();
                        if (currentTdElement) {
                            maxiumWidth = _this.curTable.getBoundingClientRect().right - _this.calcPos(currentTdElement).left;
                            _this.curTable.style.maxWidth = maxiumWidth + 'px';
                        }
                        // Below the value '100' is the 100% width of the parent element.
                        if (((mouseX !== 0 && 5 < currentColumnCellWidth) || mouseX < 0) && currentTableWidth <= 100 &&
                            _this.convertPixelToPercentage(tableWidth - mouseX, widthCompare) <= 100) {
                            var firstColumnsCell = _this.findFirstLastColCells(_this.curTable, true);
                            _this.curTable.style.width = _this.convertPixelToPercentage(tableWidth - mouseX, widthCompare) > 100 ? (100 + '%') :
                                (_this.convertPixelToPercentage(tableWidth - mouseX, widthCompare) + '%');
                            var differenceWidth = currentTableWidth - _this.convertPixelToPercentage(tableWidth - mouseX, widthCompare);
                            _this.currentMarginLeft = _this.currentMarginLeft + differenceWidth;
                            _this.curTable.style.marginLeft = 'calc(' + (_this.curTable.style.width === '100%' ? 0 : _this.currentMarginLeft) + '%)';
                            for (var i = 0; i < firstColumnsCell.length; i++) {
                                _this.curTable.rows[i].cells[_this.colIndex].style.width = (currentColumnCellWidth - differenceWidth) + '%';
                            }
                        }
                    }
                    else if (_this.currentColumnResize === 'last') {
                        mouseX = mouseX + 0.75; //This was done for to make the gripper and the table first/last column will be close.
                        _this.removeResizeElement();
                        if (currentTdElement) {
                            maxiumWidth = currentTdElement.getBoundingClientRect().right - _this.curTable.getBoundingClientRect().left;
                            _this.curTable.style.maxWidth = maxiumWidth + 'px';
                        }
                        // Below the value '100' is the 100% width of the parent element.
                        if (((mouseX !== 0 && 5 < currentColumnCellWidth) || mouseX > 0) &&
                            currentTableWidth <= 100 && _this.convertPixelToPercentage(tableWidth + mouseX, widthCompare) <= 100) {
                            var lastColumnsCell = _this.findFirstLastColCells(_this.curTable, false);
                            _this.curTable.style.width = _this.convertPixelToPercentage(tableWidth + mouseX, widthCompare) > 100 ? (100 + '%') : (_this.convertPixelToPercentage(tableWidth + mouseX, widthCompare) + '%');
                            var differenceWidth = currentTableWidth - _this.convertPixelToPercentage(tableWidth + mouseX, widthCompare);
                            for (var i = 0; i < lastColumnsCell.length; i++) {
                                if (_this.curTable.rows[i].cells[_this.colIndex]) {
                                    _this.curTable.rows[i].cells[_this.curTable.rows[i].cells.length === _this.colIndex ?
                                        _this.colIndex - 1 : _this.colIndex].style.width = (currentColumnCellWidth - differenceWidth) + '%';
                                }
                            }
                        }
                    }
                    else {
                        var cellColl = _this.curTable.rows[_this.calMaxCol(_this.curTable)].cells;
                        var actualwid = width - mouseX;
                        var totalwid = parseFloat(_this.columnEle.offsetWidth.toString()) +
                            parseFloat(cellColl[_this.colIndex - 1].offsetWidth.toString());
                        for (var i = 0; i < _this.curTable.rows.length; i++) {
                            var currentRow = _this.curTable.rows[i];
                            if ((totalwid - actualwid) > 20 && actualwid > 20) {
                                var leftColumnWidth = totalwid - actualwid;
                                var rightColWidth = actualwid;
                                var index = void 0;
                                var isMergedEleResize = false;
                                var leftTableCell = void 0;
                                var rightTableCell = void 0;
                                for (var j = 0; j < currentRow.cells.length; j++) {
                                    if (currentRow.cells[j].hasAttribute('rowspan') && j <= _this.colIndex) {
                                        isRowCellsMerged = true;
                                        mergedCellIndex = i;
                                        mergedElement = currentRow.cells[j];
                                    }
                                }
                                if (!isNOU(currentRow.cells[i]) && currentRow.cells[i].hasAttribute('colspan')) {
                                    index = parseInt(currentRow.cells[i].getAttribute('colspan'), 10) - 1;
                                }
                                else {
                                    index = _this.colIndex;
                                }
                                if (isRowCellsMerged) {
                                    var currentResizeRow = void 0;
                                    if (currentRow.cells.length < cellColl.length) {
                                        index = currentRow.cells.length === _this.colIndex ?
                                            _this.colIndex - 1 : _this.colIndex - (_this.colIndex - 1);
                                        currentResizeRow = _this.curTable.rows[!isNullOrUndefined(mergedCellIndex) ?
                                            mergedCellIndex : _this.colIndex - 1];
                                        if (currentResizeRow && (currentResizeRow.cells[_this.colIndex - 1] === mergedElement ||
                                            currentResizeRow.cells[currentResizeRow.cells.length - 1] === mergedElement)) {
                                            isMergedEleResize = true;
                                        }
                                        else {
                                            isMergedEleResize = false;
                                        }
                                    }
                                    else {
                                        index = _this.colIndex;
                                    }
                                    leftTableCell = !isMergedEleResize ? currentRow.cells[index - 1] : (currentResizeRow &&
                                        currentResizeRow.cells[currentResizeRow.cells.length - 1] !== mergedElement) ?
                                        currentResizeRow.cells[_this.colIndex - 1] : currentRow.cells[currentRow.cells.length - 1];
                                    rightTableCell = !isMergedEleResize ? currentRow.cells[index] : rightTableCell && rightTableCell.hasAttribute('rowspan') ?
                                        rightTableCell : currentResizeRow && currentResizeRow.cells[currentResizeRow.cells.length - 1] !== mergedElement ?
                                        currentRow.cells[index - 1] : currentResizeRow.cells[currentResizeRow.cells.length - 1];
                                }
                                if (!isNOU(currentRow.cells[index - 1]) && !isRowCellsMerged) {
                                    currentRow.cells[index - 1].style.width =
                                        _this.convertPixelToPercentage(leftColumnWidth, tableWidth) + '%';
                                }
                                else {
                                    if (leftTableCell) {
                                        leftTableCell.style.width =
                                            _this.convertPixelToPercentage(leftColumnWidth, tableWidth) + '%';
                                    }
                                }
                                if (!isNOU(currentRow.cells[index]) && !isRowCellsMerged) {
                                    currentRow.cells[index].style.width =
                                        _this.convertPixelToPercentage(rightColWidth, tableWidth) + '%';
                                }
                                else {
                                    if (rightTableCell) {
                                        rightTableCell.style.width =
                                            _this.convertPixelToPercentage(rightColWidth, tableWidth) + '%';
                                    }
                                }
                            }
                        }
                    }
                    _this.updateHelper();
                }
                else if (_this.resizeBtnStat.row) {
                    _this.parent.preventDefaultResize(e);
                    var height = parseFloat(_this.rowEle.clientHeight.toString()) + mouseY;
                    if (height > 20) {
                        _this.rowEle.style.height = height + 'px';
                    }
                    _this.curTable.style.height = '';
                    if (!isNOU(tableReBox)) {
                        tableReBox.style.cssText = 'top: ' + (_this.calcPos(_this.curTable).top + tableHeight - 4) +
                            'px; left:' + (_this.calcPos(_this.curTable).left + tableWidth - 4) + 'px;';
                    }
                    _this.updateHelper();
                }
                else if (_this.resizeBtnStat.tableBox) {
                    if (!Browser.isDevice) {
                        EventHandler.remove(_this.contentModule.getEditPanel(), 'mouseover', _this.resizeHelper);
                    }
                    if (currentTdElement) {
                        var tableBoxPosition = _this.curTable.getBoundingClientRect().left
                            - currentTdElement.getBoundingClientRect().left;
                        maxiumWidth = Math.abs(tableBoxPosition - currentTdElement.getBoundingClientRect().width) - 5;
                        _this.curTable.style.maxWidth = maxiumWidth + 'px';
                    }
                    var widthType = _this.curTable.style.width.indexOf('%') > -1;
                    _this.curTable.style.width = widthType ? _this.convertPixelToPercentage(tableWidth + mouseX, widthCompare) + '%'
                        : tableWidth + mouseX + 'px';
                    _this.curTable.style.height = tableHeight + mouseY + 'px';
                    tableReBox.classList.add('e-rbox-select');
                    tableReBox.style.cssText = 'top: ' + (_this.calcPos(_this.curTable).top + tableHeight - 4) +
                        'px; left:' + (_this.calcPos(_this.curTable).left + tableWidth - 4) + 'px;';
                }
            }
        });
    };
    Table.prototype.getCurrentTableWidth = function (tableWidth, parentWidth) {
        var currentTableWidth = 0;
        currentTableWidth = tableWidth / parentWidth * 100;
        return currentTableWidth;
    };
    Table.prototype.findFirstLastColCells = function (table, isFirst) {
        var resultColumns = [];
        var rows = table.querySelectorAll('tr');
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].closest('table') === table) {
                var columns = rows[i].querySelectorAll('th, td');
                resultColumns.push(isFirst ? columns[0] : columns[columns.length - 1]);
            }
        }
        return resultColumns;
    };
    Table.prototype.convertPixelToPercentage = function (value, offsetValue) {
        return (value / offsetValue) * 100;
    };
    Table.prototype.cancelResizeAction = function () {
        EventHandler.remove(this.contentModule.getDocument(), Browser.touchMoveEvent, this.resizing);
        EventHandler.remove(this.contentModule.getDocument(), Browser.touchEndEvent, this.resizeEnd);
        this.removeResizeElement();
    };
    Table.prototype.resizeEnd = function (e) {
        this.resizeBtnInit();
        EventHandler.remove(this.contentModule.getDocument(), Browser.touchMoveEvent, this.resizing);
        EventHandler.remove(this.contentModule.getDocument(), Browser.touchEndEvent, this.resizeEnd);
        if (this.contentModule.getEditPanel().querySelector('.e-table-box') &&
            this.contentModule.getEditPanel().contains(this.contentModule.getEditPanel().querySelector('.e-table-box'))) {
            if (!Browser.isDevice) {
                EventHandler.add(this.contentModule.getEditPanel(), 'mouseover', this.resizeHelper, this);
            }
            this.removeResizeElement();
        }
        if (this.helper && this.contentModule.getEditPanel().contains(this.helper)) {
            detach(this.helper);
            this.helper = null;
        }
        this.pageX = null;
        this.pageY = null;
        this.moveEle = null;
        var args = { event: e, requestType: 'table' };
        this.parent.trigger(events.resizeStop, args);
        this.parent.formatter.saveData();
    };
    Table.prototype.resizeBtnInit = function () {
        return this.resizeBtnStat = { column: false, row: false, tableBox: false };
    };
    Table.prototype.addRow = function (selectCell, e, tabkey) {
        var cmd;
        if (tabkey) {
            cmd = {
                item: { command: 'Table', subCommand: 'InsertRowAfter' }
            };
        }
        var value = {
            selection: selectCell,
            subCommand: (tabkey) ? cmd.item.subCommand : e.item.subCommand
        };
        this.parent.formatter.process(this.parent, (tabkey) ? cmd : e, e, value);
    };
    Table.prototype.addColumn = function (selectCell, e) {
        this.parent.formatter.process(this.parent, e, e, { selection: selectCell, width: this.parent.tableSettings.width, subCommand: e.item.subCommand });
    };
    Table.prototype.removeRowColumn = function (selectCell, e) {
        this.parent.formatter.process(this.parent, e, e, { selection: selectCell, subCommand: e.item.subCommand });
        this.hideTableQuickToolbar();
    };
    Table.prototype.removeTable = function (selection, args, delKey) {
        var cmd;
        if (delKey) {
            cmd = { item: { command: 'Table', subCommand: 'TableRemove' } };
        }
        var value = {
            selection: selection,
            subCommand: (delKey) ? cmd.item.subCommand : args.item.subCommand
        };
        this.parent.formatter.process(this.parent, (delKey) ? cmd : args, args.originalEvent, value);
        this.contentModule.getEditPanel().focus();
        if (this.parent.inputElement.innerHTML === null || this.parent.inputElement.innerHTML === '') {
            if (this.parent.enterKey === 'DIV') {
                this.contentModule.getEditPanel().innerHTML = '<div><br/></div>';
            }
            else if (this.parent.enterKey === 'BR') {
                this.contentModule.getEditPanel().innerHTML = '<br/>';
            }
            else {
                this.contentModule.getEditPanel().innerHTML = '<p><br/></p>';
            }
        }
        this.removeResizeElement();
        this.hideTableQuickToolbar();
    };
    Table.prototype.renderDlgContent = function (args) {
        var _this = this;
        if (Browser.isDevice || this.parent.inlineMode.enable) {
            this.insertTableDialog(args);
            return;
        }
        if (this.popupObj) {
            this.popupObj.hide();
            return;
        }
        this.hideTableQuickToolbar();
        var header = '1X1';
        var insertbtn = this.l10n.getConstant('inserttablebtn');
        this.dlgDiv = this.parent.createElement('div', { className: 'e-rte-table-popup' + ' ' + this.parent.cssClass, id: this.rteID + '_table' });
        this.tblHeader = this.parent.createElement('div', { className: 'e-rte-popup-header' + ' ' + this.parent.cssClass });
        this.tblHeader.innerHTML = header;
        this.dlgDiv.appendChild(this.tblHeader);
        var tableDiv = this.parent.createElement('div', { className: 'e-rte-table-span' + ' ' + this.parent.cssClass });
        this.drawTable(tableDiv, args);
        this.dlgDiv.appendChild(tableDiv);
        this.dlgDiv.appendChild(this.parent.createElement('span', { className: 'e-span-border' + ' ' + this.parent.cssClass }));
        var btnEle = this.parent.createElement('button', {
            className: 'e-insert-table-btn' + ' ' + this.parent.cssClass, id: this.rteID + '_insertTable',
            attrs: { type: 'button', tabindex: '0' }
        });
        if (!isNOU(this.parent.getToolbarElement().querySelector('.e-expended-nav'))) {
            this.parent.getToolbarElement().querySelector('.e-expended-nav').setAttribute('tabindex', '1');
        }
        this.dlgDiv.appendChild(btnEle);
        this.createTableButton = new Button({
            iconCss: 'e-icons e-create-table', content: insertbtn, cssClass: 'e-flat' + ' ' + this.parent.cssClass,
            enableRtl: this.parent.enableRtl, locale: this.parent.locale
        });
        this.createTableButton.isStringTemplate = true;
        this.createTableButton.appendTo(btnEle);
        EventHandler.add(btnEle, 'click', this.insertTableDialog, { self: this, args: args.args, selection: args.selection });
        this.parent.getToolbar().appendChild(this.dlgDiv);
        var target = args.args.originalEvent.target;
        target = target.classList.contains('e-toolbar-item') ? target.firstChild : target.parentElement;
        this.popupObj = new Popup(this.dlgDiv, {
            targetType: 'relative',
            relateTo: target,
            collision: { X: 'fit', Y: 'none' },
            offsetY: 8,
            viewPortElement: this.parent.element,
            position: { X: 'left', Y: 'bottom' },
            enableRtl: this.parent.enableRtl,
            zIndex: 10001,
            // eslint-disable-next-line
            close: function (event) {
                _this.parent.isBlur = false;
                _this.popupObj.destroy();
                detach(_this.popupObj.element);
                _this.popupObj = null;
            }
        });
        addClass([this.popupObj.element], 'e-popup-open');
        if (!isNOU(this.parent.cssClass)) {
            addClass([this.popupObj.element], this.parent.cssClass);
        }
        this.popupObj.refreshPosition(target);
    };
    Table.prototype.docClick = function (e) {
        var target = e.args.target;
        // eslint-disable-next-line
        if (target && target.classList && ((this.popupObj && !closest(target, '[id=' + "'" + this.popupObj.element.id + "'" + ']') ||
            (this.editdlgObj && !closest(target, '#' + this.editdlgObj.element.id)))) && !target.classList.contains('e-create-table') &&
            target.offsetParent && !target.offsetParent.classList.contains('e-rte-backgroundcolor-dropdown')) {
            if (this.popupObj) {
                this.popupObj.hide();
            }
            if (this.editdlgObj) {
                this.editdlgObj.hide();
            }
            this.parent.isBlur = true;
            dispatchEvent(this.parent.element, 'focusout');
        }
        var closestEle = closest(target, 'td');
        var isExist = closestEle && this.parent.contentModule.getEditPanel().contains(closestEle) ? true : false;
        if (target && target.tagName !== 'TD' && target.tagName !== 'TH' && !isExist &&
            closest(target, '.e-rte-quick-popup') === null && target.offsetParent &&
            !target.offsetParent.classList.contains('e-quick-dropdown') &&
            !target.offsetParent.classList.contains('e-rte-backgroundcolor-dropdown') && !closest(target, '.e-rte-dropdown-popup')
            && !closest(target, '.e-rte-elements')) {
            removeClass(this.parent.inputElement.querySelectorAll('table td'), classes.CLS_TABLE_SEL);
            if (!Browser.isIE) {
                this.hideTableQuickToolbar();
            }
        }
        if (target && target.classList && !target.classList.contains(classes.CLS_TB_COL_RES) &&
            !target.classList.contains(classes.CLS_TB_ROW_RES) && !target.classList.contains(classes.CLS_TB_BOX_RES)) {
            this.removeResizeElement();
        }
    };
    Table.prototype.drawTable = function (tableDiv, args) {
        var rowDiv;
        var tableCell;
        for (var row = 0; row < 3; row++) {
            rowDiv = this.parent.createElement('div', { className: 'e-rte-table-row' + ' ' + this.parent.cssClass, attrs: { 'data-column': '' + row } });
            for (var col = 0; col < 10; col++) {
                var display = (row > 2) ? 'none' : 'inline-block';
                tableCell = this.parent.createElement('div', { className: 'e-rte-tablecell e-default' + ' ' + this.parent.cssClass, attrs: { 'data-cell': '' + col } });
                rowDiv.appendChild(tableCell);
                tableCell.style.display = display;
                if (col === 0 && row === 0) {
                    addClass([tableCell], 'e-active');
                }
                EventHandler.add(tableCell, 'mousemove', this.tableCellSelect, this);
                EventHandler.add(rowDiv, 'mouseleave', this.tableCellLeave, this);
                EventHandler.add(tableCell, 'mouseup', this.tableCellClick, { self: this, args: args.args, selection: args.selection });
            }
            tableDiv.appendChild(rowDiv);
        }
    };
    Table.prototype.editTable = function (args) {
        var _this = this;
        this.createDialog(args);
        var editContent = this.tableDlgContent(args);
        var update = this.l10n.getConstant('dialogUpdate');
        var cancel = this.l10n.getConstant('dialogCancel');
        var editHeader = this.l10n.getConstant('tableEditHeader');
        this.editdlgObj.setProperties({
            height: 'initial', width: '290px', content: editContent, header: editHeader,
            buttons: [{
                    click: this.applyProperties.bind(this, args),
                    buttonModel: { content: update, cssClass: 'e-flat e-size-update' + ' ' + this.parent.cssClass, isPrimary: true }
                },
                {
                    click: function (e) {
                        _this.cancelDialog(e);
                    },
                    buttonModel: { cssClass: 'e-flat e-cancel' + ' ' + this.parent.cssClass, content: cancel }
                }],
            cssClass: this.editdlgObj.cssClass + ' e-rte-edit-table-prop-dialog'
        });
        this.editdlgObj.element.style.maxHeight = 'none';
        this.editdlgObj.content.querySelector('input').focus();
        this.hideTableQuickToolbar();
    };
    Table.prototype.insertTableDialog = function (args) {
        var proxy = (this.self) ? this.self : this;
        if (proxy.popupObj) {
            proxy.popupObj.hide();
        }
        proxy.createDialog(args);
        var dlgContent = proxy.tableCellDlgContent();
        var insert = proxy.l10n.getConstant('dialogInsert');
        var cancel = proxy.l10n.getConstant('dialogCancel');
        if (isNullOrUndefined(proxy.editdlgObj)) {
            return;
        }
        proxy.editdlgObj.setProperties({
            height: 'initial', width: '290px', content: dlgContent,
            buttons: [{
                    click: proxy.customTable.bind(this, args),
                    buttonModel: { content: insert, cssClass: 'e-flat e-insert-table' + ' ' + proxy.parent.cssClass, isPrimary: true }
                },
                {
                    click: function (e) {
                        proxy.cancelDialog(e);
                    },
                    buttonModel: { cssClass: 'e-flat e-cancel' + ' ' + proxy.parent.cssClass, content: cancel }
                }]
        });
        if (!isNOU(proxy.parent.cssClass)) {
            proxy.editdlgObj.setProperties({ cssClass: proxy.parent.cssClass });
        }
        proxy.editdlgObj.element.style.maxHeight = 'none';
        proxy.editdlgObj.content.querySelector('input').focus();
    };
    Table.prototype.tableCellDlgContent = function () {
        var tableColumn = this.l10n.getConstant('columns');
        var tableRow = this.l10n.getConstant('rows');
        var tableWrap = this.parent.createElement('div', { className: 'e-cell-wrap' + ' ' + this.parent.cssClass });
        var content = '<div class="e-rte-field' + ' ' + this.parent.cssClass + '"><input type="text" '
            + ' data-role ="none" id="tableColumn" class="e-table-column' + ' ' + this.parent.cssClass + '"/></div>'
            + '<div class="e-rte-field' + ' ' + this.parent.cssClass + '"><input type="text" data-role ="none" id="tableRow" class="e-table-row' + ' ' + this.parent.cssClass + '" /></div>';
        var contentElem = parseHtml(content);
        tableWrap.appendChild(contentElem);
        this.columnTextBox = new NumericTextBox({
            format: 'n0',
            min: 1,
            value: 3,
            placeholder: tableColumn,
            floatLabelType: 'Auto',
            max: 50,
            enableRtl: this.parent.enableRtl, locale: this.parent.locale,
            cssClass: this.parent.cssClass
        });
        this.columnTextBox.isStringTemplate = true;
        this.columnTextBox.appendTo(tableWrap.querySelector('#tableColumn'));
        this.rowTextBox = new NumericTextBox({
            format: 'n0',
            min: 1,
            value: 3,
            placeholder: tableRow,
            floatLabelType: 'Auto',
            max: 50,
            enableRtl: this.parent.enableRtl, locale: this.parent.locale,
            cssClass: this.parent.cssClass
        });
        this.rowTextBox.isStringTemplate = true;
        this.rowTextBox.appendTo(tableWrap.querySelector('#tableRow'));
        return tableWrap;
    };
    Table.prototype.clearDialogObj = function () {
        if (this.editdlgObj) {
            this.editdlgObj.destroy();
            detach(this.editdlgObj.element);
            this.editdlgObj = null;
        }
    };
    // eslint-disable-next-line
    Table.prototype.createDialog = function (args) {
        var _this = this;
        if (this.editdlgObj) {
            this.editdlgObj.hide({ returnValue: true });
            return;
        }
        var tableDialog = this.parent.createElement('div', {
            className: 'e-rte-edit-table' + ' ' + this.parent.cssClass, id: this.rteID + '_tabledialog'
        });
        this.parent.element.appendChild(tableDialog);
        var insert = this.l10n.getConstant('dialogInsert');
        var cancel = this.l10n.getConstant('dialogCancel');
        var header = this.l10n.getConstant('tabledialogHeader');
        var dialogModel = {
            header: header,
            cssClass: classes.CLS_RTE_ELEMENTS + ' ' + this.parent.cssClass,
            enableRtl: this.parent.enableRtl,
            locale: this.parent.locale,
            showCloseIcon: true, closeOnEscape: true, width: (Browser.isDevice) ? '290px' : '340px', height: 'initial',
            position: { X: 'center', Y: (Browser.isDevice) ? 'center' : 'top' },
            isModal: Browser.isDevice,
            buttons: [{
                    buttonModel: { content: insert, cssClass: 'e-flat e-insert-table' + ' ' + this.parent.cssClass, isPrimary: true }
                },
                {
                    click: function (e) {
                        _this.cancelDialog(e);
                    },
                    buttonModel: { cssClass: 'e-flat e-cancel' + ' ' + this.parent.cssClass, content: cancel }
                }],
            target: (Browser.isDevice) ? document.body : this.parent.element,
            animationSettings: { effect: 'None' },
            close: function (event) {
                _this.parent.isBlur = false;
                _this.editdlgObj.destroy();
                detach(_this.editdlgObj.element);
                _this.dialogRenderObj.close(event);
                _this.editdlgObj = null;
            }
        };
        this.editdlgObj = this.dialogRenderObj.render(dialogModel);
        this.editdlgObj.appendTo(tableDialog);
        if (this.quickToolObj && this.quickToolObj.inlineQTBar && document.body.contains(this.quickToolObj.inlineQTBar.element)) {
            this.quickToolObj.inlineQTBar.hidePopup();
        }
    };
    Table.prototype.customTable = function (args, e) {
        var proxy = (this.self) ? this.self : this;
        if (proxy.rowTextBox.value && proxy.columnTextBox.value) {
            var argument = ((Browser.isDevice || (!isNullOrUndefined(args.args)
                && !isNullOrUndefined(args.args.originalEvent) &&
                args.args.originalEvent.action === 'insert-table')
                || proxy.parent.inlineMode.enable) ? args : this);
            proxy.tableInsert(proxy.rowTextBox.value, proxy.columnTextBox.value, e, argument);
        }
    };
    // eslint-disable-next-line
    Table.prototype.cancelDialog = function (e) {
        this.parent.isBlur = false;
        this.editdlgObj.hide({ returnValue: true });
    };
    // eslint-disable-next-line
    Table.prototype.applyProperties = function (args, e) {
        var dialogEle = this.editdlgObj.element;
        var table = closest(args.selectNode[0], 'table');
        table.style.width = dialogEle.querySelector('.e-table-width').value + 'px';
        if (dialogEle.querySelector('.e-cell-padding').value !== '') {
            var tdElm = table.querySelectorAll('td');
            for (var i = 0; i < tdElm.length; i++) {
                var padVal = '';
                if (tdElm[i].style.padding === '') {
                    padVal = tdElm[i].getAttribute('style') + ' padding:' +
                        dialogEle.querySelector('.e-cell-padding').value + 'px;';
                }
                else {
                    tdElm[i].style.padding = dialogEle.querySelector('.e-cell-padding').value + 'px';
                    padVal = tdElm[i].getAttribute('style');
                }
                tdElm[i].setAttribute('style', padVal);
            }
        }
        table.cellSpacing = dialogEle.querySelector('.e-cell-spacing').value;
        if (!isNOU(table.cellSpacing) || table.cellSpacing !== '0') {
            addClass([table], classes.CLS_TABLE_BORDER);
        }
        else {
            removeClass([table], classes.CLS_TABLE_BORDER);
        }
        this.parent.formatter.saveData();
        this.editdlgObj.hide({ returnValue: true });
    };
    Table.prototype.tableDlgContent = function (e) {
        var selectNode = e.selectParent[0];
        var tableWidth = this.l10n.getConstant('tableWidth');
        var cellPadding = this.l10n.getConstant('cellpadding');
        var cellSpacing = this.l10n.getConstant('cellspacing');
        var tableWrap = this.parent.createElement('div', { className: 'e-table-sizewrap' + ' ' + this.parent.cssClass });
        var widthVal = closest(selectNode, 'table').getClientRects()[0].width;
        var padVal = closest(selectNode, 'td').style.padding;
        var brdSpcVal = closest(selectNode, 'table').getAttribute('cellspacing');
        var content = '<div class="e-rte-field' + ' ' + this.parent.cssClass + '"><input type="text" data-role ="none" id="tableWidth" class="e-table-width' + ' ' + this.parent.cssClass + '" '
            + ' /></div>' + '<div class="e-rte-field' + ' ' + this.parent.cssClass + '"><input type="text" data-role ="none" id="cellPadding" class="e-cell-padding' + ' ' + this.parent.cssClass + '" />'
            + ' </div><div class="e-rte-field' + ' ' + this.parent.cssClass + '"><input type="text" data-role ="none" id="cellSpacing" class="e-cell-spacing' + ' ' + this.parent.cssClass + '" /></div>';
        var contentElem = parseHtml(content);
        tableWrap.appendChild(contentElem);
        this.tableWidthNum = new NumericTextBox({
            format: 'n0',
            min: 0,
            value: widthVal,
            placeholder: tableWidth,
            floatLabelType: 'Auto',
            enableRtl: this.parent.enableRtl, locale: this.parent.locale
        });
        this.tableWidthNum.isStringTemplate = true;
        this.tableWidthNum.appendTo(tableWrap.querySelector('#tableWidth'));
        this.tableCellPadding = new NumericTextBox({
            format: 'n0',
            min: 0,
            // eslint-disable-next-line
            value: padVal !== '' ? parseInt(padVal, null) : 0,
            placeholder: cellPadding,
            floatLabelType: 'Auto',
            enableRtl: this.parent.enableRtl, locale: this.parent.locale
        });
        this.tableCellPadding.isStringTemplate = true;
        this.tableCellPadding.appendTo(tableWrap.querySelector('#cellPadding'));
        this.tableCellSpacing = new NumericTextBox({
            format: 'n0',
            min: 0,
            // eslint-disable-next-line
            value: brdSpcVal !== '' && !isNOU(brdSpcVal) ? parseInt(brdSpcVal, null) : 0,
            placeholder: cellSpacing,
            floatLabelType: 'Auto',
            enableRtl: this.parent.enableRtl, locale: this.parent.locale
        });
        this.tableCellSpacing.isStringTemplate = true;
        this.tableCellSpacing.appendTo(tableWrap.querySelector('#cellSpacing'));
        return tableWrap;
    };
    /**
     * Destroys the ToolBar.
     *
     * @function destroy
     * @returns {void}
     * @hidden

     */
    Table.prototype.destroy = function () {
        this.removeEventListener();
    };
    Table.prototype.moduleDestroy = function () {
        this.parent = null;
    };
    /**
     * For internal use only - Get the module name.
     *
     * @returns {void}
     */
    Table.prototype.getModuleName = function () {
        return 'table';
    };
    return Table;
}());
export { Table };
