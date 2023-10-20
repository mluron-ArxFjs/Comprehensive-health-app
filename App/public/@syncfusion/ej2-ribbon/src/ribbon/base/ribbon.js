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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { addClass, append, Event, Collection, Complex, Component, EventHandler, formatUnit, getInstance, getComponent, getUniqueID, closest, KeyboardEvents } from '@syncfusion/ej2-base';
import { isNullOrUndefined, isUndefined, NotifyPropertyChanges, Property, remove, removeClass } from '@syncfusion/ej2-base';
import { Tab, TabAnimationSettings, HScroll, Toolbar } from '@syncfusion/ej2-navigations';
import { RibbonTab, FileMenuSettings } from '../models/index';
import { DisplayMode, RibbonLayout } from './interface';
import { ItemOrientation, RibbonItemSize, RibbonItemType } from './interface';
import { RibbonButton, RibbonComboBox, RibbonCheckBox, RibbonDropDown, RibbonSplitButton } from '../items/index';
import { destroyControl, getCollection, getGroup, getIndex, getItem, getItemElement, updateCommonProperty, updateControlDisabled, isTooltipPresent, getTemplateFunction, createTooltip, destroyTooltip, updateTooltipProp } from './utils';
import * as constants from './constant';
import { DropDownButton, SplitButton } from '@syncfusion/ej2-splitbuttons';
import { CheckBox } from '@syncfusion/ej2-buttons';
/**
 * The Ribbon Component is a structured layout to manage tools with tabs and groups.
 */
var Ribbon = /** @class */ (function (_super) {
    __extends(Ribbon, _super);
    /**
     * Constructor for creating the widget.
     *
     * @param  {RibbonModel} options - Specifies the ribbon model
     * @param  {string|HTMLDivElement} element - Specifies the target element
     */
    function Ribbon(options, element) {
        var _this = this;
        Ribbon_1.Inject(RibbonButton, RibbonCheckBox, RibbonDropDown, RibbonSplitButton, RibbonComboBox);
        _this = _super.call(this, options, element) || this;
        return _this;
    }
    Ribbon_1 = Ribbon;
    /**
     * Initialize the control rendering.
     *
     * @returns {void}
     * @private
     */
    Ribbon.prototype.render = function () {
        this.initialize();
    };
    Ribbon.prototype.preRender = function () {
        this.idIndex = 0;
        this.tooltipData = [];
        this.isAddRemove = false;
        this.keyConfigs = {
            leftarrow: 'leftarrow',
            rightarrow: 'rightarrow',
            tab: 'tab',
            shiftTab: 'shift+tab'
        };
    };
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @returns {string} - Persist data
     */
    Ribbon.prototype.getPersistData = function () {
        return this.addOnPersist(['activeLayout']);
    };
    /**
     * Get component name.
     *
     * @returns {string} - Module name
     * @private
     */
    Ribbon.prototype.getModuleName = function () {
        return 'ribbon';
    };
    /**
     * To provide the array of modules needed for component rendering
     *
     * @returns {ModuleDeclaration[]} - returns module declaration.
     * @hidden
     */
    Ribbon.prototype.requiredModules = function () {
        var modules = [];
        modules.push({ member: 'ribbonButton', args: [this] }, { member: 'ribbonDropDown', args: [this] }, { member: 'ribbonSplitButton', args: [this] }, { member: 'ribbonCheckBox', args: [this] }, { member: 'ribbonColorPicker', args: [this] }, { member: 'ribbonComboBox', args: [this] }, { member: 'ribbonFileMenu', args: [this] });
        return modules;
    };
    Ribbon.prototype.initialize = function () {
        this.element.id = this.element.id || getUniqueID('e-' + this.getModuleName());
        addClass([this.element], ['e-rbn'].concat((this.cssClass ? this.cssClass.split(constants.SPACE) : [])));
        if (this.enableRtl) {
            this.element.classList.add(constants.RTL_CSS);
        }
        this.element.style.width = formatUnit(this.width);
        this.renderTabs();
        if (this.ribbonFileMenuModule) {
            this.ribbonFileMenuModule.createFileMenu(this.fileMenu);
        }
        this.createHelpPaneTemplate();
        var toolbar = this.tabObj['tbObj'];
        toolbar.refreshOverflow();
        createTooltip(this.element, this);
        this.wireEvents();
        this.wireKeyboardEvent();
        this.currentControlIndex = 0;
    };
    Ribbon.prototype.wireEvents = function () {
        EventHandler.add(window, 'resize', this.resizeHandler, this);
    };
    Ribbon.prototype.wireKeyboardEvent = function () {
        this.keyboardModuleRibbon = new KeyboardEvents(this.element, {
            keyAction: this.keyActionHandler.bind(this),
            keyConfigs: this.keyConfigs,
            eventName: 'keydown'
        });
    };
    Ribbon.prototype.keyActionHandler = function (e) {
        if (((e.key === 'Tab') && (!(e.target.classList.contains('e-tab-wrap')) && !(e.target.classList.contains('e-combobox'))))) {
            e.preventDefault();
        }
        var activeContent = this.tabObj.element.querySelector('#' + this.tabs[this.selectedTab].id + constants.CONTENT_ID);
        var ribbonControls = activeContent.querySelectorAll('.e-control');
        var comboBoxElements = activeContent.querySelectorAll('.e-combobox');
        var comboBoxEle;
        if (comboBoxElements) {
            for (var i = 0; i < comboBoxElements.length; i++) {
                if (comboBoxElements[parseInt(i.toString(), 10)].closest('.e-input-focus')) {
                    comboBoxEle = comboBoxElements[parseInt(i.toString(), 10)];
                }
            }
        }
        if (comboBoxEle) {
            for (var i = 0; i < ribbonControls.length; i++) {
                if (ribbonControls[parseInt(i.toString(), 10)].classList.contains('e-combobox')) {
                    if (ribbonControls[parseInt(i.toString(), 10)].closest('.e-input-focus')) {
                        this.currentControlIndex = i;
                    }
                }
            }
        }
        if (this.currentControlIndex === 0) {
            var item = ribbonControls[this.currentControlIndex].closest('.e-ribbon-item');
            while (item && item.classList.contains('e-disabled')) {
                this.currentControlIndex++;
                item = ribbonControls[this.currentControlIndex].closest('.e-ribbon-item');
            }
        }
        if (e.target.classList.contains('e-control') || e.target.classList.contains('e-ribbon-launcher-icon') ||
            e.target.classList.contains('e-ribbon-collapse-btn') || e.target.classList.contains('e-ribbon-last-item') ||
            e.target.classList.contains('e-ribbon-first-item') || e.target.classList.contains('e-ribbon-group-of-btn') ||
            e.target.classList.contains('e-ribbon-overall-of-btn')) {
            switch (e.action) {
                case 'rightarrow':
                    this.handleNavigation(e, !this.enableRtl, ribbonControls);
                    break;
                case 'leftarrow':
                    this.handleNavigation(e, this.enableRtl, ribbonControls);
                    break;
                case 'tab':
                    if (e.target.classList.contains('e-combobox')) {
                        if (this.currentControlIndex < ribbonControls.length - 1) {
                            this.currentControlIndex++;
                        }
                    }
                    break;
                case 'shiftTab':
                    if (e.target.classList.contains('e-combobox')) {
                        if (this.currentControlIndex > 0) {
                            this.currentControlIndex--;
                        }
                    }
                    else {
                        this.tabObj.element.querySelector('.e-toolbar-item.e-active').querySelector('.e-tab-wrap').focus();
                        this.currentControlIndex = 0;
                    }
            }
        }
    };
    Ribbon.prototype.handleNavigation = function (e, enableRtl, ribbonControls) {
        var groupContainer;
        var prevGroupId;
        if (enableRtl) {
            if (this.currentControlIndex < ribbonControls.length - 1 && ribbonControls[this.currentControlIndex + 1].classList.contains('e-colorpicker')) {
                this.currentControlIndex++;
            }
        }
        else {
            if (this.currentControlIndex > 0 && ribbonControls[this.currentControlIndex - 1].classList.contains('e-colorpicker')) {
                this.currentControlIndex--;
            }
        }
        if ((!enableRtl && (this.currentControlIndex > 0)) || (enableRtl && (this.currentControlIndex < ribbonControls.length - 1))) {
            if (!e.target.classList.contains('e-combobox') && e.target.classList.contains('e-control') && !e.target.classList.contains('e-ribbon-last-item')) {
                if (enableRtl) {
                    this.currentControlIndex++;
                }
                else {
                    var prevGroupContainer = ribbonControls[parseInt(this.currentControlIndex.toString(), 10)].closest('.' + constants.RIBBON_GROUP_CONTAINER);
                    if (prevGroupContainer) {
                        prevGroupId = prevGroupContainer.getAttribute('id');
                    }
                    this.currentControlIndex--;
                }
                var item = ribbonControls[this.currentControlIndex].closest('.e-ribbon-item');
                while (item && item.classList.contains('e-disabled')) {
                    if (((enableRtl && this.currentControlIndex === ribbonControls.length - 1) ||
                        (!enableRtl && this.currentControlIndex === 0))) {
                        if (ribbonControls[this.currentControlIndex].closest('.e-ribbon-item').classList.contains('e-disabled')) {
                            this.tabObj.element.querySelector('.e-ribbon-collapse-btn').focus();
                            break;
                        }
                    }
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    enableRtl ? this.currentControlIndex++ : this.currentControlIndex--;
                    item = ribbonControls[this.currentControlIndex].closest('.e-ribbon-item');
                }
                ribbonControls[parseInt(this.currentControlIndex.toString(), 10)].focus();
                if (this.activeLayout === 'Classic') {
                    groupContainer = ribbonControls[parseInt(this.currentControlIndex.toString(), 10)].closest('.' + constants.RIBBON_GROUP_CONTAINER);
                    if (enableRtl) {
                        var launcherIconEle = void 0;
                        if (groupContainer) {
                            launcherIconEle = groupContainer.querySelector('.e-ribbon-launcher-icon');
                        }
                        if (launcherIconEle) {
                            var items = groupContainer.querySelectorAll('.e-ribbon-item');
                            items[items.length - 1].querySelector('.e-control').classList.add('e-ribbon-last-item');
                        }
                    }
                    else {
                        if (groupContainer) {
                            var groupContainerId = groupContainer.getAttribute('id');
                            if (prevGroupId !== groupContainerId) {
                                var launcherIconEle = groupContainer.querySelector('.e-ribbon-launcher-icon');
                                if (launcherIconEle) {
                                    ribbonControls[parseInt((this.currentControlIndex + 1).toString(), 10)].classList.add('e-ribbon-first-item');
                                }
                            }
                        }
                    }
                }
                else {
                    if (ribbonControls[parseInt((this.currentControlIndex).toString(), 10)].classList.contains('e-ribbon-first-item')) {
                        ribbonControls[parseInt((this.currentControlIndex).toString(), 10)].classList.remove('e-ribbon-first-item');
                    }
                    else if (ribbonControls[parseInt((this.currentControlIndex).toString(), 10)].classList.contains('e-ribbon-last-item')) {
                        ribbonControls[parseInt((this.currentControlIndex).toString(), 10)].classList.remove('e-ribbon-last-item');
                    }
                }
            }
        }
        else {
            if (this.activeLayout === 'Classic') {
                this.tabObj.element.querySelector('.e-ribbon-collapse-btn').focus();
            }
            if (this.activeLayout === 'Simplified') {
                var overflowButton = this.tabObj.element.querySelector('.e-ribbon-overall-of-btn');
                if (enableRtl && (overflowButton && !overflowButton.classList.contains('e-ribbon-hide'))) {
                    overflowButton.focus();
                }
                else {
                    this.tabObj.element.querySelector('.e-ribbon-collapse-btn').focus();
                }
            }
        }
        if (e.target.classList.contains('e-ribbon-last-item')) {
            if (enableRtl) {
                groupContainer = ribbonControls[parseInt(this.currentControlIndex.toString(), 10)].closest('.' + constants.RIBBON_GROUP_CONTAINER);
                groupContainer.querySelector('.e-ribbon-launcher-icon').focus();
            }
            else {
                this.currentControlIndex--;
                ribbonControls[parseInt(this.currentControlIndex.toString(), 10)].focus();
            }
        }
        if (!enableRtl && e.target.classList.contains('e-ribbon-first-item')) {
            groupContainer = ribbonControls[parseInt((this.currentControlIndex - 1).toString(), 10)].closest('.' + constants.RIBBON_GROUP_CONTAINER);
            var launcherIconEle = groupContainer.querySelector('.e-ribbon-launcher-icon');
            if (launcherIconEle) {
                groupContainer.querySelector('.e-ribbon-launcher-icon').focus();
            }
        }
        if (e.target.classList.contains('e-ribbon-launcher-icon')) {
            if (enableRtl) {
                this.currentControlIndex++;
                ribbonControls[parseInt(this.currentControlIndex.toString(), 10)].focus();
                if (ribbonControls[parseInt((this.currentControlIndex - 1).toString(), 10)].classList.contains('e-ribbon-last-item')) {
                    ribbonControls[parseInt((this.currentControlIndex - 1).toString(), 10)].classList.remove('e-ribbon-last-item');
                }
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                this.currentControlIndex;
                ribbonControls[parseInt(this.currentControlIndex.toString(), 10)].focus();
            }
        }
        if (e.target.classList.contains('e-ribbon-collapse-btn')) {
            if (enableRtl) {
                this.currentControlIndex = 0;
                var ribbonItem = ribbonControls[this.currentControlIndex].closest('.e-ribbon-item');
                while (ribbonItem && ribbonItem.classList.contains('e-disabled')) {
                    this.currentControlIndex++;
                    ribbonItem = ribbonControls[this.currentControlIndex].closest('.e-ribbon-item');
                }
                ribbonControls[parseInt(this.currentControlIndex.toString(), 10)].focus();
            }
            else {
                var overflowButton = this.tabObj.element.querySelector('.e-ribbon-overall-of-btn');
                if ((overflowButton && !overflowButton.classList.contains('e-ribbon-hide'))) {
                    overflowButton.focus();
                }
                else {
                    this.currentControlIndex = ribbonControls.length - 1;
                    var ribbonItem = ribbonControls[this.currentControlIndex].closest('.e-ribbon-item');
                    while (ribbonItem && ribbonItem.classList.contains('e-disabled')) {
                        this.currentControlIndex--;
                        ribbonItem = ribbonControls[this.currentControlIndex].closest('.e-ribbon-item');
                    }
                    ribbonControls[parseInt(this.currentControlIndex.toString(), 10)].focus();
                }
            }
        }
        if (this.activeLayout === 'Simplified' && e.target.classList.contains('e-ribbon-overall-of-btn')) {
            if (enableRtl) {
                this.tabObj.element.querySelector('.e-ribbon-collapse-btn').focus();
            }
            else {
                this.currentControlIndex = ribbonControls.length - 1;
                ribbonControls[parseInt(this.currentControlIndex.toString(), 10)].focus();
            }
        }
    };
    Ribbon.prototype.resizeHandler = function () {
        var activeContent = this.tabObj.element.querySelector('#' + this.tabs[this.selectedTab].id + constants.CONTENT_ID);
        this.checkOverflow(this.selectedTab, activeContent);
        if (this.scrollModule) {
            var scrollEle = this.tabObj.element.querySelector('.' + constants.HORIZONTAL_SCROLLBAR);
            this.scrollModule.scrollStep = scrollEle.offsetWidth;
        }
    };
    Ribbon.prototype.renderTabs = function () {
        this.tabsInternal = this.tabs.slice();
        this.tabsInternal = this.checkID(this.tabsInternal, 'tab', this.element.id);
        this.setProperties({ tabs: this.tabsInternal }, true);
        var tabEle = this.createElement('div', {
            id: this.element.id + constants.TAB_ID
        });
        this.element.appendChild(tabEle);
        this.validateItemSize();
        var tabItems = this.createTabItems(this.tabs);
        this.tabObj = new Tab({
            cssClass: constants.RIBBON_TAB,
            selectedItem: this.selectedTab,
            overflowMode: 'Popup',
            width: this.width,
            items: tabItems,
            enableRtl: this.enableRtl,
            created: this.tabCreated.bind(this),
            selected: this.ribbonTabSelected.bind(this),
            selecting: this.ribbonTabSelecting.bind(this)
        });
        this.tabObj.appendTo(tabEle);
        //Set the width value as "0px" with unit for proper calculation.
        this.element.style.setProperty(constants.RIBBON_FILE_MENU_WIDTH, '0px');
        this.element.style.setProperty(constants.RIBBON_HELP_PANE_TEMPLATE_WIDTH, '0px');
        var toolbarEle = tabEle.querySelector('.e-toolbar');
        var toolbar = getComponent(toolbarEle, Toolbar);
        toolbar.setProperties({ width: 'calc(100% - var(--fileMenuWidth) - var(--helpTemplateWidth))' });
        this.element.classList[this.isMinimized ? 'add' : 'remove'](constants.RIBBON_MINIMIZE);
    };
    Ribbon.prototype.minimize = function (val) {
        var _this = this;
        if (val === this.isMinimized) {
            return;
        }
        var eventArgs = { cancel: false };
        this.trigger(val ? 'ribbonCollapsing' : 'ribbonExpanding', eventArgs, function (args) {
            if (args.cancel) {
                return;
            }
            _this.setProperties({ isMinimized: val }, true);
            _this.element.classList.toggle(constants.RIBBON_MINIMIZE, _this.isMinimized);
            //to overwrite inline styles from hscroll
            _this.tabObj.element.querySelector('.e-content').style.display = val ? 'none' : 'block';
            if (!val) {
                _this.refreshLayout();
            }
        });
    };
    Ribbon.prototype.toggleLayout = function () {
        this.setProperties({ activeLayout: this.activeLayout === 'Simplified' ? 'Classic' : 'Simplified' }, true);
        this.switchLayout();
    };
    Ribbon.prototype.tabCreated = function () {
        this.addExpandCollapse();
        this.renderInitialTab(this.selectedTab);
    };
    Ribbon.prototype.ribbonTabSelected = function (e) {
        this.isAddRemove = false;
        var selectedTabId = e.selectedItem.getAttribute('data-id');
        var selectedIndex = getIndex(this.tabs, (function (tab) { return (tab.id === selectedTabId); }));
        selectedIndex = selectedIndex === -1 ? this.selectedTab : selectedIndex;
        var eventArgs = { previousIndex: this.selectedTab, selectedIndex: selectedIndex };
        this.setProperties({ selectedTab: selectedIndex }, true);
        this.checkOverflow(selectedIndex, e.selectedContent.firstChild);
        if (this.activeLayout === 'Simplified' && this.overflowDDB) {
            var overflowTarget = this.overflowDDB.target;
            var ofTabContainer = overflowTarget.querySelector('.' + constants.RIBBON_TAB_ACTIVE);
            if (ofTabContainer) {
                ofTabContainer.classList.remove(constants.RIBBON_TAB_ACTIVE);
            }
            var activeTab = overflowTarget.querySelector('#' + selectedTabId + constants.OVERFLOW_ID);
            if (activeTab) {
                activeTab.classList.add(constants.RIBBON_TAB_ACTIVE);
                this.overflowDDB.element.classList.remove(constants.HIDE_CSS);
            }
            else {
                this.overflowDDB.element.classList.add(constants.HIDE_CSS);
            }
        }
        this.trigger('tabSelected', eventArgs);
    };
    Ribbon.prototype.checkOverflow = function (tabIndex, activeContent) {
        var tabContent = activeContent.closest('.' + constants.TAB_CONTENT);
        var isOverFlow = tabContent.offsetWidth < activeContent.offsetWidth;
        if (isOverFlow && !this.scrollModule) {
            if (this.activeLayout === 'Classic') {
                // Defines whether the shrinking is breaked due to insufficient space.
                var isBreak = false;
                isBreak = this.checkGroupShrinking(tabIndex, tabContent, activeContent, true);
                if (!isBreak && (tabContent.offsetWidth < activeContent.offsetWidth)) {
                    isBreak = this.checkGroupShrinking(tabIndex, tabContent, activeContent, false);
                }
                if (tabContent.offsetWidth < activeContent.offsetWidth) {
                    this.createOverflowDropdown(tabIndex, tabContent, activeContent);
                }
            }
            else {
                this.checkSimplifiedItemShrinking(tabIndex, tabContent, activeContent);
                if (tabContent.offsetWidth < activeContent.offsetWidth) {
                    this.createSimplfiedOverflow(tabContent, activeContent, tabIndex);
                }
            }
            //Adds Scroll if the tabwidth is less the content width even after adding overflow dropdown.
            if ((tabContent.offsetWidth < activeContent.offsetWidth) && (!this.scrollModule)) {
                this.scrollModule = new HScroll({
                    enableRtl: this.enableRtl
                }, this.tabObj.element.querySelector('.' + constants.TAB_CONTENT));
            }
        }
        else if (!isOverFlow) {
            this.destroyScroll();
            if (this.activeLayout === 'Classic') {
                var isBreak = false;
                isBreak = this.removeOverflowDropdown(tabContent, activeContent, false, tabIndex);
                //Check for expanding small items to medium items.
                if (!isBreak && (tabContent.offsetWidth > activeContent.offsetWidth)) {
                    isBreak = this.checkGroupExpanding(tabIndex, tabContent, activeContent, true);
                }
                //Check for expanding medium items to large items.
                if (!isBreak && (tabContent.offsetWidth > activeContent.offsetWidth)) {
                    isBreak = this.checkGroupExpanding(tabIndex, tabContent, activeContent, false);
                }
            }
            else {
                this.removeSimplfiedOverflow(tabContent, activeContent, tabIndex);
                if (tabContent.offsetWidth > activeContent.offsetWidth) {
                    this.checkSimplifiedItemExpanding(tabIndex, tabContent, activeContent);
                }
            }
        }
    };
    Ribbon.prototype.checkSimplifiedItemShrinking = function (tabIndex, tabContent, activeContent) {
        var tab = this.tabs[parseInt(tabIndex.toString(), 10)];
        for (var i = (tab.groups.length - 1); (i >= 0); i--) {
            var group = tab.groups[parseInt(i.toString(), 10)];
            var groupContainer = tabContent.querySelector('#' + group.id + constants.CONTAINER_ID);
            for (var j = 0; ((j < group.collections.length) && (tabContent.offsetWidth < activeContent.offsetWidth)); j++) {
                var collection = group.collections[parseInt(j.toString(), 10)];
                for (var k = collection.items.length; ((k >= 1) && (tabContent.offsetWidth < activeContent.offsetWidth)); k--) {
                    var item = collection.items[k - 1];
                    if (((item.allowedSizes & RibbonItemSize.Small) && (item.allowedSizes & RibbonItemSize.Medium))
                        && (item.activeSize === RibbonItemSize.Medium) && (item.displayOptions & DisplayMode.Simplified)) {
                        var itemContainer = groupContainer.querySelector('#' + item.id + constants.CONTAINER_ID);
                        if (itemContainer) {
                            var itemEle = itemContainer.querySelector('#' + item.id);
                            itemContainer.setAttribute('data-medium-width', activeContent.offsetWidth.toString());
                            item.setProperties({ activeSize: RibbonItemSize.Small }, true);
                            this.setItemSize(itemEle, item);
                        }
                    }
                }
            }
        }
    };
    Ribbon.prototype.checkSimplifiedItemExpanding = function (tabIndex, tabContent, activeContent) {
        var tab = this.tabs[parseInt(tabIndex.toString(), 10)];
        for (var i = (tab.groups.length - 1); (i >= 0); i--) {
            var group = tab.groups[parseInt(i.toString(), 10)];
            var groupContainer = tabContent.querySelector('#' + group.id + constants.CONTAINER_ID);
            for (var j = 0; ((j < group.collections.length) && (tabContent.offsetWidth > activeContent.offsetWidth)); j++) {
                var collection = group.collections[parseInt(j.toString(), 10)];
                for (var k = collection.items.length; ((k >= 1) && (tabContent.offsetWidth > activeContent.offsetWidth)); k--) {
                    var item = collection.items[k - 1];
                    if (((item.allowedSizes & RibbonItemSize.Small) && (item.allowedSizes & RibbonItemSize.Medium))
                        && (item.activeSize === RibbonItemSize.Small) && (item.displayOptions & DisplayMode.Simplified)) {
                        var itemContainer = groupContainer.querySelector('#' + item.id + constants.CONTAINER_ID);
                        if (itemContainer) {
                            var valString = itemContainer.getAttribute('data-medium-width');
                            var value = valString ? parseInt(valString, 10) : null;
                            if (value && (tabContent.offsetWidth > value)) {
                                itemContainer.removeAttribute('data-medium-width');
                                var itemEle = itemContainer.querySelector('#' + item.id);
                                item.setProperties({ activeSize: RibbonItemSize.Medium }, true);
                                this.setItemSize(itemEle, item);
                            }
                        }
                    }
                }
            }
        }
    };
    Ribbon.prototype.createSimplfiedOverflow = function (tabContent, activeContent, tabIndex) {
        var orderedGroups = this.getGroupResizeOrder(true, tabIndex);
        for (var i = 0; ((i < orderedGroups.length) && (tabContent.offsetWidth < activeContent.offsetWidth)); i++) {
            var group = orderedGroups[parseInt(i.toString(), 10)];
            var groupEle = tabContent.querySelector('#' + group.id);
            var groupContainer = groupEle.querySelector('#' + group.id + constants.CONTAINER_ID);
            for (var j = group.collections.length; ((j >= 1) && (tabContent.offsetWidth < activeContent.offsetWidth)); j--) {
                var collection = group.collections[parseInt((j - 1).toString(), 10)];
                var collectionEle = groupEle.querySelector('#' + collection.id);
                for (var k = collection.items.length; ((k >= 1) && (tabContent.offsetWidth < activeContent.offsetWidth)); k--) {
                    var item = collection.items[k - 1];
                    var itemContainer = collectionEle.querySelector('#' + item.id + constants.CONTAINER_ID);
                    if (((item.displayOptions === DisplayMode.Auto) ||
                        (item.displayOptions === (DisplayMode.Simplified | DisplayMode.Overflow))) && !isNullOrUndefined(itemContainer)) {
                        itemContainer.setAttribute('data-simplified-width', activeContent.offsetWidth.toString());
                        this.createOverflowPopup(item, tabIndex, group.enableGroupOverflow, group.id, group.header, itemContainer, groupContainer);
                        if (item.activeSize === RibbonItemSize.Small) {
                            var itemEle = itemContainer.querySelector('#' + item.id);
                            item.setProperties({ activeSize: RibbonItemSize.Medium }, true);
                            this.setItemSize(itemEle, item);
                        }
                        if ((item.type === RibbonItemType.DropDown) || (item.type === RibbonItemType.SplitButton)) {
                            this.updatePopupItems(item, itemContainer, group.enableGroupOverflow, true);
                        }
                    }
                }
            }
            if (!(group.enableGroupOverflow || groupEle.querySelector('.' + constants.RIBBON_ITEM))) {
                groupEle.classList.add('e-ribbon-emptyCollection');
            }
        }
    };
    Ribbon.prototype.updatePopupItems = function (item, itemEle, isGroupOF, isMenu) {
        var dropdown = getComponent(itemEle.querySelector('#' + item.id), (item.type === RibbonItemType.DropDown) ? DropDownButton : SplitButton);
        var dropDownPopup = dropdown.dropDown;
        // popup is on right if (isGroupOF && isMenu)
        // The position is reversed if RTL is enabled.
        // isRight = ((isGroupOF && isMenu) && !this.enableRtl ) || (!(isGroupOF && isMenu) && this.enableRtl)  ==> (isGroupOF && isMenu) !== this.enableRtl
        var isLeft = (isGroupOF && isMenu) === this.enableRtl;
        dropDownPopup.setProperties({ position: { X: isLeft ? 'left' : 'right', Y: isMenu ? 'top' : 'bottom' } }, true);
        if (isMenu) {
            dropdown.beforeOpen = function () {
                if (isLeft) {
                    dropDownPopup.element.style.setProperty('visibility', 'hidden');
                    dropDownPopup.element.style.setProperty('display', 'block');
                    dropDownPopup.setProperties({ offsetX: -1 * dropDownPopup.element.offsetWidth });
                    dropDownPopup.element.style.removeProperty('display');
                    dropDownPopup.element.style.removeProperty('visibility');
                }
            };
        }
        else {
            dropDownPopup.setProperties({ offsetX: 0 }, true);
            dropdown.beforeOpen = null;
        }
    };
    Ribbon.prototype.removeSimplfiedOverflow = function (tabContent, activeContent, tabIndex, isClear) {
        if (isClear === void 0) { isClear = false; }
        var orderedGroups = this.getGroupResizeOrder(false, tabIndex);
        var flag = true;
        for (var i = 0; ((i < orderedGroups.length) && flag); i++) {
            var group = orderedGroups[parseInt(i.toString(), 10)];
            var overflowDDB = void 0;
            var overflowtarget = void 0;
            if (group.enableGroupOverflow) {
                var overflowDDBEle = tabContent.querySelector('#' + group.id + constants.GROUPOF_BUTTON_ID);
                if (overflowDDBEle) {
                    overflowDDB = getInstance(overflowDDBEle, DropDownButton);
                    overflowtarget = overflowDDB.target;
                }
            }
            else {
                overflowDDB = this.overflowDDB;
                overflowtarget = this.overflowDDB ? this.overflowDDB.target : null;
            }
            for (var j = 0; ((j < group.collections.length) && flag); j++) {
                var collection = group.collections[parseInt(j.toString(), 10)];
                // eslint-disable-next-line max-len
                for (var k = 0; ((k < collection.items.length) && flag && !isClear && (tabContent.offsetWidth > activeContent.offsetWidth)); k++) {
                    var item = collection.items[parseInt(k.toString(), 10)];
                    var itemContainer = void 0;
                    if (overflowtarget) {
                        itemContainer = overflowtarget.querySelector('#' + item.id + constants.CONTAINER_ID);
                    }
                    if (((item.displayOptions === DisplayMode.Auto) ||
                        (item.displayOptions === (DisplayMode.Simplified | DisplayMode.Overflow))) && !isNullOrUndefined(itemContainer)) {
                        var width = parseInt(itemContainer.getAttribute('data-simplified-width'), 10);
                        if (!isClear && (tabContent.offsetWidth < width)) {
                            flag = false;
                            break;
                        }
                        var groupEle_1 = tabContent.querySelector('#' + collection.id);
                        if ((item.type === RibbonItemType.DropDown) || (item.type === RibbonItemType.SplitButton)) {
                            this.updatePopupItems(item, itemContainer, group.enableGroupOverflow, false);
                        }
                        groupEle_1.append(itemContainer);
                        this.removeOverflowEvent(item, itemContainer);
                        if (item.allowedSizes & RibbonItemSize.Small) {
                            item.setProperties({ activeSize: RibbonItemSize.Small }, true);
                            this.setItemSize(itemContainer.querySelector('#' + item.id), item);
                        }
                    }
                }
            }
            var groupEle = tabContent.querySelector('#' + group.id);
            var itemEle = groupEle.querySelector('.' + constants.RIBBON_ITEM);
            if (groupEle.classList.contains('e-ribbon-emptyCollection') && itemEle !== null) {
                groupEle.classList.remove('e-ribbon-emptyCollection');
            }
            if (overflowDDB) {
                if (group.enableGroupOverflow) {
                    if (overflowtarget.childElementCount === 0) {
                        this.removeOverflowButton(overflowDDB);
                    }
                }
                else {
                    var ofGroupContainer = overflowtarget.querySelector('#' + group.id + constants.CONTAINER_ID);
                    if (ofGroupContainer && ofGroupContainer.childElementCount === 1) {
                        ofGroupContainer.remove();
                    }
                    var ofTabContainer = overflowtarget.querySelector('#' + this.tabs[parseInt(tabIndex.toString(), 10)].id + constants.OVERFLOW_ID);
                    if (ofTabContainer && ofTabContainer.childElementCount === 0) {
                        ofTabContainer.remove();
                        this.overflowDDB.element.classList.add(constants.HIDE_CSS);
                    }
                }
            }
        }
        if (this.overflowDDB) {
            var overflowEle = this.overflowDDB.target;
            if (overflowEle.childElementCount === 0) {
                this.removeOverflowButton(this.overflowDDB);
                this.overflowDDB = null;
            }
        }
    };
    Ribbon.prototype.createOverflowPopup = function (item, tabIndex, isGroupOF, groupId, groupHeader, itemEle, groupContainer) {
        var overflowButton;
        if (isGroupOF) {
            var overflowDDB = groupContainer.querySelector('#' + groupId + constants.GROUPOF_BUTTON_ID);
            if (!overflowDDB) {
                overflowButton = this.addOverflowButton(groupId + constants.GROUPOF_BUTTON_ID);
                overflowButton.element.classList.add(constants.RIBBON_GROUP_OF_BUTTON);
                groupContainer.appendChild(overflowButton.element);
            }
            else {
                overflowButton = getInstance(overflowDDB, DropDownButton);
            }
            overflowButton.target.append(itemEle);
        }
        else {
            if (!this.overflowDDB) {
                this.overflowDDB = this.addOverflowButton(this.tabObj.element.id + constants.OVRLOF_BUTTON_ID);
                this.tabObj.element.insertBefore(this.overflowDDB.element, this.collapseButton);
                this.overflowDDB.element.classList.add(constants.RIBBON_OVERALL_OF_BUTTON);
                this.createOfTabContainer(groupId, groupHeader, itemEle, tabIndex);
            }
            else {
                this.overflowDDB.element.classList.remove(constants.HIDE_CSS);
                var overflowEle = this.overflowDDB.target;
                var ofTabContainer = overflowEle.querySelector('#' + this.tabs[parseInt(tabIndex.toString(), 10)].id + constants.OVERFLOW_ID);
                if (ofTabContainer) {
                    var ofGroupContainer = overflowEle.querySelector('#' + groupId + constants.CONTAINER_ID);
                    if (!ofGroupContainer) {
                        ofGroupContainer = this.createGroupContainer(groupId, groupHeader);
                        ofTabContainer.append(ofGroupContainer);
                    }
                    ofGroupContainer.append(itemEle);
                }
                else {
                    this.createOfTabContainer(groupId, groupHeader, itemEle, tabIndex);
                }
            }
            overflowButton = this.overflowDDB;
        }
        if (itemEle !== null) {
            this.addOverflowEvents(item, itemEle, overflowButton);
        }
    };
    Ribbon.prototype.addOverflowEvents = function (item, itemEle, overflowButton) {
        switch (item.type) {
            case 'Button':
                this.ribbonButtonModule.addOverFlowEvents(item, itemEle, overflowButton);
                break;
            case 'DropDown':
                this.ribbonDropDownModule.addOverFlowEvents(item, itemEle, overflowButton);
                break;
            case 'SplitButton':
                this.ribbonSplitButtonModule.addOverFlowEvents(item, itemEle, overflowButton);
                break;
            case 'CheckBox':
                this.ribbonCheckBoxModule.addOverFlowEvents(item, itemEle, overflowButton);
                break;
            case 'ColorPicker':
                this.ribbonColorPickerModule.addOverFlowEvents(item, itemEle, overflowButton);
                break;
            case 'ComboBox':
                this.ribbonComboBoxModule.addOverFlowEvents(item, itemEle, overflowButton);
                break;
        }
    };
    Ribbon.prototype.createOfTabContainer = function (groupId, groupHeader, itemEle, tabIndex) {
        var ofTabContainer = this.createElement('div', {
            id: this.tabs[parseInt(tabIndex.toString(), 10)].id + constants.OVERFLOW_ID,
            className: constants.RIBBON_OF_TAB_CONTAINER
        });
        var overflowtarget = this.overflowDDB.target;
        overflowtarget.append(ofTabContainer);
        var ofGroupContainer = this.createGroupContainer(groupId, groupHeader);
        ofGroupContainer.append(itemEle);
        ofTabContainer.append(ofGroupContainer);
        if (tabIndex === this.selectedTab) {
            ofTabContainer.classList.add(constants.RIBBON_TAB_ACTIVE);
        }
    };
    Ribbon.prototype.checkGroupShrinking = function (tabIndex, tabContent, activeContent, isLarge) {
        var isOverFlow = true;
        var isBreak = false;
        var tab = this.tabs[parseInt(tabIndex.toString(), 10)];
        for (var j = (tab.groups.length - 1); (isOverFlow && (j >= 0)); j--) {
            // eslint-disable-next-line max-len
            isBreak = isLarge ? this.checkLargeToMedium(tabIndex, tab, j, tabContent, activeContent) : this.checkMediumToSmall(tabIndex, tab, j, tabContent, activeContent);
            isOverFlow = !isBreak && (tabContent.offsetWidth < activeContent.offsetWidth);
        }
        return isBreak;
    };
    Ribbon.prototype.checkValidCollectionLength = function (collections) {
        var count = 0;
        for (var i = 0; i < collections.length; i++) {
            var items = collections[parseInt(i.toString(), 10)].items;
            for (var ind = 0; ind < items.length; ind++) {
                if (items[parseInt(ind.toString(), 10)].displayOptions & DisplayMode.Classic) {
                    count++;
                    break;
                }
            }
            if (count > 1) {
                return false;
            }
        }
        return count === 1;
    };
    Ribbon.prototype.checkClassicCollection = function (collections, n, isIncrement) {
        var items = collections[parseInt(n.toString(), 10)].items;
        for (var ind = 0; ind < items.length; ind++) {
            if (items[parseInt(ind.toString(), 10)].displayOptions & DisplayMode.Classic) {
                return n;
            }
        }
        n = isIncrement ? n + 1 : n - 1;
        if (isIncrement) {
            return (n === collections.length) ? n : this.checkClassicCollection(collections, n, isIncrement);
        }
        else {
            return (n < 0) ? n : this.checkClassicCollection(collections, n, isIncrement);
        }
    };
    Ribbon.prototype.checkClassicItem = function (items, n, isIncrement) {
        var item = items[parseInt(n.toString(), 10)];
        if (item.displayOptions & DisplayMode.Classic) {
            return n;
        }
        n = isIncrement ? n + 1 : n - 1;
        if (isIncrement) {
            return (n === items.length) ? n : this.checkClassicItem(items, n, isIncrement);
        }
        else {
            return (n < 0) ? n : this.checkClassicItem(items, n, isIncrement);
        }
    };
    Ribbon.prototype.checkLargeToMedium = function (tabIndex, tab, groupIndex, tabContent, activeContent, shouldSkip) {
        var _this = this;
        if (shouldSkip === void 0) { shouldSkip = false; }
        var group = tab.groups[parseInt(groupIndex.toString(), 10)];
        if (group.isCollapsed && !shouldSkip) {
            return false;
        }
        var canReduceCollection = function (collection) {
            return (collection.items.length === 1) && canReduceItem(collection.items[0]);
        };
        var canReduceItem = function (item) {
            return (item.allowedSizes & RibbonItemSize.Medium) && (item.activeSize === RibbonItemSize.Large);
        };
        var createShrinkEle = function (id, firstItem, start, end) {
            var shrinkEle = _this.createElement('div', {
                className: 'e-ribbon-shrink' + constants.SPACE + constants.RIBBON_ROW,
                id: id + '_shrink_container' + start,
                attrs: { 'data-start': start.toString(), 'data-end': end.toString() }
            });
            firstItem.parentElement.insertBefore(shrinkEle, firstItem);
            if (!shouldSkip) {
                shrinkEle.setAttribute('data-large-width', activeContent.offsetWidth.toString());
            }
            return shrinkEle;
        };
        var moveItemToColumn = function (start, end) {
            var collection = _this.tabs[parseInt(tabIndex.toString(), 10)]
                .groups[parseInt(groupIndex.toString(), 10)].collections[0];
            var firstItem = activeContent.querySelector('#' + collection.items[parseInt(start.toString(), 10)].id + constants.CONTAINER_ID);
            var shrinkEle = shouldSkip ? activeContent.querySelector('#' + collection.id + '_shrink_container' + start) :
                createShrinkEle(collection.id, firstItem, start, end);
            for (var i = start; i <= end; i++) {
                var item = collection.items[parseInt(i.toString(), 10)];
                if (!(item.displayOptions & DisplayMode.Classic)) {
                    continue;
                }
                var ele = activeContent.querySelector('#' + item.id + constants.CONTAINER_ID);
                shrinkEle.appendChild(ele);
                item.setProperties({ activeSize: RibbonItemSize.Medium }, true);
                _this.setItemSize(ele.querySelector('#' + item.id), item);
            }
        };
        var moveCollectionToColumn = function (start, end) {
            var group = _this.tabs[parseInt(tabIndex.toString(), 10)]
                .groups[parseInt(groupIndex.toString(), 10)];
            var firstItem = activeContent.querySelector('#' + group.collections[parseInt(start.toString(), 10)].id);
            var shrinkEle = shouldSkip ? activeContent.querySelector('#' + group.id + '_shrink_container' + start) :
                createShrinkEle(group.id, firstItem, start, end);
            for (var i = start; i <= end; i++) {
                var collection = group.collections[parseInt(i.toString(), 10)];
                var ele = activeContent.querySelector('#' + collection.id);
                shrinkEle.appendChild(ele);
                collection.items[0].setProperties({ activeSize: RibbonItemSize.Medium }, true);
                _this.setItemSize(ele.querySelector('#' + collection.items[0].id), collection.items[0]);
            }
        };
        var orientation = group.orientation;
        if (orientation === ItemOrientation.Column) {
            for (var k = (group.collections.length - 1); k > 0; k--) {
                //to avoid negative index while checking for the second collection
                k = this.checkClassicCollection(group.collections, k, false);
                var l = k - 1;
                //Checks the element rendered at position n
                if ((l >= 0) && canReduceCollection(group.collections[parseInt(k.toString(), 10)])) {
                    l = this.checkClassicCollection(group.collections, l, false);
                    //Checks the element rendered at position n-1
                    if ((l >= 0) && canReduceCollection(group.collections[parseInt(l.toString(), 10)])) {
                        var m = l - 1;
                        if (m >= 0) {
                            m = this.checkClassicCollection(group.collections, m, false);
                        }
                        //Checks the element rendered at position n-2
                        if ((m >= 0) && canReduceCollection(group.collections[parseInt(m.toString(), 10)])) {
                            moveCollectionToColumn(m, k);
                        }
                        else {
                            moveCollectionToColumn(l, k);
                        }
                        k = m;
                        if (!shouldSkip && (tabContent.offsetWidth > activeContent.offsetWidth)) {
                            return true;
                        }
                    }
                    else {
                        k = l;
                    }
                }
            }
        }
        else {
            if (this.checkValidCollectionLength(group.collections)) {
                var collection = group.collections[0];
                for (var k = (collection.items.length - 1); k > 0; k--) {
                    //to avoid negative index while checking for the second item
                    k = this.checkClassicItem(collection.items, k, false);
                    var l = k - 1;
                    //Checks the element rendered at position n
                    if ((l >= 0) && canReduceItem(collection.items[parseInt(k.toString(), 10)])) {
                        l = this.checkClassicItem(collection.items, l, false);
                        //Checks the element rendered at position n-1
                        if ((l >= 0) && canReduceItem(collection.items[parseInt(l.toString(), 10)])) {
                            var m = l - 1;
                            //Checks the element rendered at position n-2
                            if (m >= 0) {
                                m = this.checkClassicItem(collection.items, m, false);
                            }
                            if ((m >= 0) && canReduceItem(collection.items[parseInt(m.toString(), 10)])) {
                                moveItemToColumn(m, k);
                            }
                            else {
                                moveItemToColumn(l, k);
                            }
                            k = m;
                            if (!shouldSkip && (tabContent.offsetWidth > activeContent.offsetWidth)) {
                                return true;
                            }
                        }
                        else {
                            k = l;
                        }
                    }
                }
            }
        }
        return false;
    };
    Ribbon.prototype.checkMediumToSmall = function (tabIndex, tab, groupIndex, tabContent, activeContent, shouldSkip) {
        var _this = this;
        if (shouldSkip === void 0) { shouldSkip = false; }
        var group = tab.groups[parseInt(groupIndex.toString(), 10)];
        if (group.isCollapsed && !shouldSkip) {
            return false;
        }
        var orientation = group.orientation;
        var ele = activeContent.querySelector('#' + group.id);
        var shrinkColumns = ele.querySelectorAll('.' + 'e-ribbon-shrink');
        var canReduceItem = function (item) {
            return (item.allowedSizes & RibbonItemSize.Small) && (item.activeSize === RibbonItemSize.Medium);
        };
        var reduceItemsToSmall = function (collectionIndex, start, end, middle) {
            if (middle === void 0) { middle = null; }
            var collection = _this.tabs[parseInt(tabIndex.toString(), 10)]
                .groups[parseInt(groupIndex.toString(), 10)].collections[parseInt(collectionIndex.toString(), 10)];
            var reduce = function (i) {
                var item = collection.items[parseInt(i.toString(), 10)];
                if (item.displayOptions & DisplayMode.Classic) {
                    var ele_1 = activeContent.querySelector('#' + item.id);
                    item.setProperties({ activeSize: RibbonItemSize.Small }, true);
                    _this.setItemSize(ele_1, item);
                }
            };
            reduce(start);
            if (middle) {
                reduce(middle);
            }
            reduce(end);
        };
        var reduceCollectionsToSmall = function (index, start, end, middle) {
            if (middle === void 0) { middle = null; }
            var group = _this.tabs[parseInt(tabIndex.toString(), 10)]
                .groups[parseInt(groupIndex.toString(), 10)];
            if (!shouldSkip) {
                shrinkColumns[parseInt(index.toString(), 10)].setAttribute('data-medium-width', activeContent.offsetWidth.toString());
            }
            var reduce = function (i) {
                var collection = group.collections[parseInt(i.toString(), 10)];
                if (collection.items[0].displayOptions & DisplayMode.Classic) {
                    var ele_2 = activeContent.querySelector('#' + collection.items[0].id);
                    collection.items[0].setProperties({ activeSize: RibbonItemSize.Small }, true);
                    _this.setItemSize(ele_2, collection.items[0]);
                }
            };
            reduce(start);
            if (middle) {
                reduce(middle);
            }
            reduce(end);
        };
        var setWidth = function (id) {
            if (!shouldSkip) {
                var ele_3 = activeContent.querySelector('#' + id);
                ele_3.setAttribute('data-medium-width', activeContent.offsetWidth.toString());
            }
        };
        if (orientation === ItemOrientation.Column) {
            if (shrinkColumns.length > 0) {
                for (var k = (shrinkColumns.length - 1); k >= 0; k--) {
                    var start = parseInt(shrinkColumns[parseInt(k.toString(), 10)].getAttribute('data-start'), 10);
                    var end = parseInt(shrinkColumns[parseInt(k.toString(), 10)].getAttribute('data-end'), 10);
                    //only 2 or 3 itmes alone can be present in shrinked column
                    var l = this.checkClassicCollection(group.collections, start + 1, false); //next valid item
                    if (canReduceItem(group.collections[parseInt(start.toString(), 10)].items[0])
                        && canReduceItem(group.collections[parseInt(l.toString(), 10)].items[0])) {
                        if (end === l) { //if only 2 item, then next valid item will be the end item, else check for 3 rd item satus.
                            reduceCollectionsToSmall(k, start, end);
                        }
                        else if (canReduceItem(group.collections[parseInt(end.toString(), 10)].items[0])) {
                            reduceCollectionsToSmall(k, start, end, l);
                        }
                        if (!shouldSkip && (tabContent.offsetWidth > activeContent.offsetWidth)) {
                            return true;
                        }
                    }
                }
            }
            for (var k = (group.collections.length - 1); k >= 0; k--) {
                var collection = group.collections[parseInt(k.toString(), 10)];
                var classicItems = [];
                for (var i = 0; i < collection.items.length; i++) {
                    if (collection.items[parseInt(i.toString(), 10)].displayOptions & DisplayMode.Classic) {
                        classicItems.push(i);
                    }
                }
                //If items length is 1 then, it would have been already check for shrinked column
                if ((classicItems.length > 1)) {
                    if (canReduceItem(collection.items[classicItems[0]]) && canReduceItem(collection.items[classicItems[1]])) {
                        if (classicItems.length === 2) {
                            setWidth(collection.id);
                            reduceItemsToSmall(k, classicItems[0], classicItems[1]);
                        }
                        else if (canReduceItem(collection.items[classicItems[2]])) {
                            setWidth(collection.id);
                            reduceItemsToSmall(k, classicItems[0], classicItems[2], classicItems[1]);
                        }
                        if (!shouldSkip && (tabContent.offsetWidth > activeContent.offsetWidth)) {
                            return true;
                        }
                    }
                }
            }
        }
        else {
            if (this.checkValidCollectionLength(group.collections)) {
                if (shrinkColumns.length > 0) {
                    for (var k = (shrinkColumns.length - 1); k >= 0; k--) {
                        var shrinkColumn = shrinkColumns[parseInt(k.toString(), 10)];
                        var start = parseInt(shrinkColumn.getAttribute('data-start'), 10);
                        var end = parseInt(shrinkColumn.getAttribute('data-end'), 10);
                        //only 2 or 3 itmes alone can be present in shrinked column
                        var collection = group.collections[0];
                        var l = this.checkClassicItem(collection.items, start + 1, false); //next valid item
                        if (canReduceItem(group.collections[0].items[parseInt(start.toString(), 10)])
                            && canReduceItem(group.collections[0].items[parseInt(l.toString(), 10)])) {
                            if (end === l) { //if only 2 item, then next valid item will be the end item, else check for 3 rd item satus.
                                setWidth(shrinkColumn.id);
                                reduceItemsToSmall(0, start, end);
                            }
                            else if (canReduceItem(group.collections[0].items[parseInt(end.toString(), 10)])) {
                                setWidth(shrinkColumn.id);
                                reduceItemsToSmall(0, start, end, l);
                            }
                            if (!shouldSkip && (tabContent.offsetWidth > activeContent.offsetWidth)) {
                                return true;
                            }
                        }
                    }
                }
            }
            else {
                for (var k = (group.collections.length - 1); k >= 0; k--) {
                    var collection = group.collections[parseInt(k.toString(), 10)];
                    for (var l = (collection.items.length - 1); l >= 0; l--) {
                        l = this.checkClassicItem(collection.items, l, false);
                        if (l < 0) {
                            continue;
                        }
                        var item = collection.items[parseInt(l.toString(), 10)];
                        if (canReduceItem(item)) {
                            setWidth(item.id);
                            reduceItemsToSmall(k, l, l);
                            if (!shouldSkip && (tabContent.offsetWidth > activeContent.offsetWidth)) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    };
    Ribbon.prototype.checkGroupExpanding = function (tabIndex, tabContent, activeContent, isSmall) {
        var isBreak = false;
        var tab = this.tabs[parseInt(tabIndex.toString(), 10)];
        for (var j = 0; (!isBreak && (j < tab.groups.length)); j++) {
            isBreak = isSmall ? this.checkSmallToMedium(tabIndex, tab, j, tabContent, activeContent, false, true) :
                this.checkMediumToLarge(tabIndex, tab, j, tabContent, activeContent, false, true);
        }
        return isBreak;
    };
    // eslint-disable-next-line max-len
    Ribbon.prototype.checkSmallToMedium = function (tabIndex, tab, groupIndex, tabContent, activeContent, shouldSkip, shouldClear) {
        var _this = this;
        var group = tab.groups[parseInt(groupIndex.toString(), 10)];
        var orientation = group.orientation;
        var ele = activeContent.querySelector('#' + group.id);
        var shrinkColumns = ele.querySelectorAll('.' + 'e-ribbon-shrink');
        var canExpandItem = function (item) {
            return (item.allowedSizes & RibbonItemSize.Medium) && (item.activeSize === RibbonItemSize.Small);
        };
        var expandItemToMedium = function (collectionIndex, index, parentEle) {
            var collection = _this.tabs[parseInt(tabIndex.toString(), 10)]
                .groups[parseInt(groupIndex.toString(), 10)].collections[parseInt(collectionIndex.toString(), 10)];
            var item = collection.items[parseInt(index.toString(), 10)];
            if (item.displayOptions & DisplayMode.Classic) {
                var ele_4 = parentEle.id === item.id ? parentEle : parentEle.querySelector('#' + item.id);
                item.setProperties({ activeSize: RibbonItemSize.Medium }, true);
                _this.setItemSize(ele_4, item);
            }
        };
        var expandCollectionsToMedium = function (i) {
            var collections = _this.tabs[parseInt(tabIndex.toString(), 10)]
                .groups[parseInt(groupIndex.toString(), 10)].collections;
            var item = collections[parseInt(i.toString(), 10)].items[0];
            if (item.displayOptions & DisplayMode.Classic) {
                var ele_5 = activeContent.querySelector('#' + collections[parseInt(i.toString(), 10)].items[0].id);
                collections[parseInt(i.toString(), 10)].items[0].setProperties({ activeSize: RibbonItemSize.Medium }, true);
                _this.setItemSize(ele_5, collections[parseInt(i.toString(), 10)].items[0]);
            }
        };
        if (orientation === ItemOrientation.Row) {
            // collection length is 1, then the it wll be covered in shrinked columns
            if (!this.checkValidCollectionLength(group.collections)) {
                for (var k = 0; k < group.collections.length; k++) {
                    var collection = group.collections[parseInt(k.toString(), 10)];
                    for (var l = 0; l < collection.items.length; l++) {
                        l = this.checkClassicItem(collection.items, l, true);
                        if (l === collection.items.length) {
                            continue;
                        }
                        var item = collection.items[parseInt(l.toString(), 10)];
                        if (canExpandItem(item)) {
                            var itemEle = activeContent.querySelector('#' + item.id);
                            var valString = itemEle.getAttribute('data-medium-width');
                            var value = valString ? parseInt(valString, 10) : null;
                            if (value && (shouldSkip || (tabContent.offsetWidth > value))) {
                                expandItemToMedium(k, l, itemEle);
                                if (!shouldSkip || shouldClear) {
                                    itemEle.removeAttribute('data-medium-width');
                                }
                            }
                            else if (value) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
        else {
            for (var k = 0; k < group.collections.length; k++) {
                //If items length is 1 then, it will be handled in shrinked column
                if ((group.collections[parseInt(k.toString(), 10)].items.length > 1)) {
                    var collection = group.collections[parseInt(k.toString(), 10)];
                    var itemEle = activeContent.querySelector('#' + collection.id);
                    var valString = itemEle.getAttribute('data-medium-width');
                    var value = valString ? parseInt(valString, 10) : null;
                    var classicItems = [];
                    for (var i = 0; i < collection.items.length; i++) {
                        if (collection.items[parseInt(i.toString(), 10)].displayOptions & DisplayMode.Classic) {
                            classicItems.push(i);
                        }
                    }
                    if ((classicItems.length > 1) && value && (shouldSkip || (tabContent.offsetWidth > value))) {
                        expandItemToMedium(k, classicItems[0], itemEle);
                        expandItemToMedium(k, classicItems[1], itemEle);
                        if (classicItems.length === 3) {
                            expandItemToMedium(k, classicItems[2], itemEle);
                        }
                        if (!shouldSkip || shouldClear) {
                            itemEle.removeAttribute('data-medium-width');
                        }
                    }
                    else if (value) {
                        return true;
                    }
                }
            }
        }
        if (shrinkColumns.length > 0) {
            for (var k = 0; k < shrinkColumns.length; k++) {
                var shrinkColumn = shrinkColumns[parseInt(k.toString(), 10)];
                var valString = shrinkColumn.getAttribute('data-medium-width');
                var value = valString ? parseInt(valString, 10) : null;
                if (value && (shouldSkip || (tabContent.offsetWidth > value))) {
                    var start = parseInt(shrinkColumn.getAttribute('data-start'), 10);
                    var end = parseInt(shrinkColumn.getAttribute('data-end'), 10);
                    if (orientation === ItemOrientation.Row) {
                        var collection = group.collections[0];
                        var l = this.checkClassicItem(collection.items, start + 1, true); //next valid item
                        expandItemToMedium(0, start, shrinkColumn);
                        expandItemToMedium(0, l, shrinkColumn);
                        // if l == end, then l is the last item, else L is the middle item. If l is middle then call the method for end.
                        if (l !== end) {
                            expandItemToMedium(0, end, shrinkColumn);
                        }
                    }
                    else {
                        var m = this.checkClassicCollection(group.collections, start + 1, true); //next valid item
                        expandCollectionsToMedium(start);
                        expandCollectionsToMedium(m);
                        if (m !== end) {
                            expandCollectionsToMedium(end);
                        }
                    }
                    if (!shouldSkip || shouldClear) {
                        shrinkColumn.removeAttribute('data-medium-width');
                    }
                }
                else if (value) {
                    return true;
                }
            }
        }
        return false;
    };
    Ribbon.prototype.checkMediumToLarge = function (tabIndex, tab, groupIndex, tabContent, activeContent, shouldSkip, shouldClear) {
        var _this = this;
        var group = tab.groups[parseInt(groupIndex.toString(), 10)];
        var orientation = group.orientation;
        var ele = activeContent.querySelector('#' + group.id);
        var shrinkColumns = ele.querySelectorAll('.' + 'e-ribbon-shrink');
        if (shrinkColumns.length === 0) {
            return false;
        }
        var expandItemsToLarge = function (start, end, parentEle, middle) {
            var items = _this.tabs[parseInt(tabIndex.toString(), 10)].
                groups[parseInt(groupIndex.toString(), 10)].collections[0].items;
            var reduce = function (i) {
                var item = items[parseInt(i.toString(), 10)];
                if (item.displayOptions & DisplayMode.Classic) {
                    var container = parentEle.querySelector('#' + item.id + constants.CONTAINER_ID);
                    var ele_6 = container.querySelector('#' + item.id);
                    item.setProperties({ activeSize: RibbonItemSize.Large }, true);
                    _this.setItemSize(ele_6, item);
                    parentEle.insertAdjacentElement('afterend', container);
                }
            };
            reduce(start);
            if (middle) {
                reduce(middle);
            }
            reduce(end);
            if (!shouldSkip || shouldClear) {
                remove(parentEle);
            }
        };
        var expandCollectionsToLarge = function (start, end, parentEle, middle) {
            var collections = _this.tabs[parseInt(tabIndex.toString(), 10)].
                groups[parseInt(groupIndex.toString(), 10)].collections;
            var reduce = function (i) {
                var collection = collections[parseInt(i.toString(), 10)];
                if (collection.items[0].displayOptions & DisplayMode.Classic) {
                    var collectionEle = parentEle.querySelector('#' + collection.id);
                    var ele_7 = collectionEle.querySelector('#' + collection.items[0].id);
                    collection.items[0].setProperties({ activeSize: RibbonItemSize.Large }, true);
                    _this.setItemSize(ele_7, collection.items[0]);
                    parentEle.insertAdjacentElement('afterend', collectionEle);
                }
            };
            reduce(start);
            if (middle) {
                reduce(middle);
            }
            reduce(end);
            if (!shouldSkip || shouldClear) {
                remove(parentEle);
            }
        };
        for (var k = 0; k < shrinkColumns.length; k++) {
            var shrinkColumn = shrinkColumns[parseInt(k.toString(), 10)];
            var valString = shrinkColumn.getAttribute('data-large-width');
            var value = valString ? parseInt(valString, 10) : null;
            if (value && (shouldSkip || (tabContent.offsetWidth > value))) {
                var start = parseInt(shrinkColumn.getAttribute('data-start'), 10);
                var end = parseInt(shrinkColumn.getAttribute('data-end'), 10);
                if (orientation === ItemOrientation.Row) {
                    var collection = group.collections[0];
                    var l = this.checkClassicItem(collection.items, start + 1, true); //next valid item
                    if (l === end) {
                        expandItemsToLarge(start, end, shrinkColumn);
                    }
                    else {
                        expandItemsToLarge(start, end, shrinkColumn, l);
                    }
                }
                else {
                    var m = this.checkClassicCollection(group.collections, start + 1, true); //next valid item
                    if (m === end) {
                        expandCollectionsToLarge(start, end, shrinkColumn);
                    }
                    else {
                        expandCollectionsToLarge(start, end, shrinkColumn, m);
                    }
                }
                if (!shouldSkip || shouldClear) {
                    shrinkColumn.removeAttribute('data-large-width');
                }
            }
            else if (value) {
                return true;
            }
        }
        return false;
    };
    Ribbon.prototype.setItemSize = function (itemEle, item) {
        var itemContainer = itemEle.closest('.' + constants.RIBBON_ITEM);
        if (item.type === RibbonItemType.Button) {
            this.ribbonButtonModule.updateButtonSize(itemEle, item);
        }
        else if (item.type === RibbonItemType.DropDown) {
            this.ribbonDropDownModule.updateDropDownSize(itemEle, item);
        }
        else if (item.type === RibbonItemType.SplitButton) {
            this.ribbonSplitButtonModule.updateSplitButtonSize(itemEle, item);
        }
        else if (item.type === RibbonItemType.Template) {
            remove(itemEle);
            this.createTemplateContent(item, itemContainer);
        }
        itemContainer.classList.remove(constants.RIBBON_CONTENT_HEIGHT, constants.RIBBON_LARGE_ITEM, constants.RIBBON_MEDIUM_ITEM, constants.RIBBON_SMALL_ITEM);
        if (item.activeSize === RibbonItemSize.Large) {
            itemContainer.classList.add(constants.RIBBON_LARGE_ITEM, constants.RIBBON_CONTENT_HEIGHT);
        }
        else {
            itemContainer.classList.add((item.activeSize === RibbonItemSize.Medium) ?
                constants.RIBBON_MEDIUM_ITEM : constants.RIBBON_SMALL_ITEM);
        }
    };
    Ribbon.prototype.createOverflowDropdown = function (tabIndex, tabContent, activeContent) {
        var collapseOrder = this.getGroupResizeOrder(true, tabIndex);
        if (collapseOrder.length === 0) {
            return;
        }
        var _loop_1 = function (i) {
            var group = collapseOrder[parseInt(i.toString(), 10)];
            var groupEle = this_1.tabObj.element.querySelector('#' + group.id);
            groupEle.setAttribute('data-expanded-width', activeContent.offsetWidth.toString());
            var groupContainer = groupEle.querySelector('#' + group.id + constants.CONTAINER_ID);
            var groupOverFlow = this_1.createElement('div', {
                className: constants.RIBBON_GROUP_OVERFLOW + constants.SPACE + constants.RIBBON_LARGE_ITEM,
                id: group.id + constants.OVERFLOW_ID + constants.CONTAINER_ID
            });
            groupEle.insertBefore(groupOverFlow, groupContainer);
            var groupIndex = getIndex(this_1.tabs[parseInt(tabIndex.toString(), 10)].groups, function (e) { return e.id === group.id; });
            var tab = this_1.tabs[parseInt(tabIndex.toString(), 10)];
            //Expanding the items in the group to their original expanded state
            this_1.checkSmallToMedium(tabIndex, tab, groupIndex, tabContent, activeContent, true, false);
            this_1.checkMediumToLarge(tabIndex, tab, groupIndex, tabContent, activeContent, true, false);
            var dropdown = this_1.ribbonDropDownModule.createOverFlowDropDown(group.id, group.header, group.groupIconCss, groupContainer, groupOverFlow, this_1.enableRtl);
            this_1.tabs[parseInt(tabIndex.toString(), 10)].
                groups[parseInt(groupIndex.toString(), 10)].setProperties({ isCollapsed: true }, true);
            for (var j = 0; j < group.collections.length; j++) {
                var collection = group.collections[parseInt(j.toString(), 10)];
                var collectionEle = groupContainer.querySelector('#' + collection.id);
                for (var k = 0; k < collection.items.length; k++) {
                    var item = collection.items[parseInt(k.toString(), 10)];
                    var itemEle = collectionEle.querySelector('#' + item.id + constants.CONTAINER_ID);
                    if (itemEle !== null) {
                        this_1.addOverflowEvents(item, itemEle, dropdown);
                    }
                }
            }
        };
        var this_1 = this;
        for (var i = 0; ((i < collapseOrder.length) && (tabContent.offsetWidth < activeContent.offsetWidth)); i++) {
            _loop_1(i);
        }
    };
    // eslint-disable-next-line max-len
    Ribbon.prototype.removeOverflowDropdown = function (tabContent, activeContent, isClear, tabIndex) {
        if (isClear === void 0) { isClear = false; }
        var expandOrder = this.getGroupResizeOrder(false, tabIndex);
        if (expandOrder.length === 0) {
            return false;
        }
        var _loop_2 = function (i) {
            var group = expandOrder[parseInt(i.toString(), 10)];
            var groupEle = this_2.tabObj.element.querySelector('#' + group.id);
            if (!groupEle) {
                return "break";
            } //to handle the rerendering of tabcontrol when a ribbon tab is added/removed
            var width = parseInt(groupEle.getAttribute('data-expanded-width'), 10);
            if (!isClear && (tabContent.offsetWidth < width)) {
                return { value: true };
            }
            this_2.removeDropdown(group.id);
            var groupIndex = getIndex(this_2.tabs[parseInt(tabIndex.toString(), 10)].groups, function (e) { return e.id === group.id; });
            this_2.tabs[parseInt(tabIndex.toString(), 10)].
                groups[parseInt(groupIndex.toString(), 10)].setProperties({ isCollapsed: false }, true);
            var tab = this_2.tabs[parseInt(tabIndex.toString(), 10)];
            //Shrinking the items in the group to their previous shrinked state (before moving to dropdown)
            this_2.checkLargeToMedium(tabIndex, tab, groupIndex, tabContent, activeContent, true);
            this_2.checkMediumToSmall(tabIndex, tab, groupIndex, tabContent, activeContent, true);
            for (var j = 0; j < group.collections.length; j++) {
                var collection = group.collections[parseInt(j.toString(), 10)];
                var collectionEle = groupEle.querySelector('#' + collection.id);
                for (var k = 0; k < collection.items.length; k++) {
                    var item = collection.items[parseInt(k.toString(), 10)];
                    var itemEle = collectionEle.querySelector('#' + item.id + constants.CONTAINER_ID);
                    if (itemEle !== null) {
                        this_2.removeOverflowEvent(item, itemEle);
                    }
                }
            }
        };
        var this_2 = this;
        for (var i = 0; i < expandOrder.length; i++) {
            var state_1 = _loop_2(i);
            if (typeof state_1 === "object")
                return state_1.value;
            if (state_1 === "break")
                break;
        }
        return false;
    };
    Ribbon.prototype.removeDropdown = function (groupId) {
        var dropdownElement = this.tabObj.element.querySelector('#' + groupId + constants.OVERFLOW_ID + constants.DROPDOWN_ID);
        if (dropdownElement) {
            var groupOverFlow = dropdownElement.parentElement;
            this.ribbonDropDownModule.removeOverFlowDropDown(dropdownElement);
            remove(groupOverFlow);
        }
    };
    Ribbon.prototype.getGroupResizeOrder = function (isCollapse, tabIndex) {
        var _this = this;
        var groups = this.tabs[parseInt(tabIndex.toString(), 10)].groups;
        groups = groups.filter(function (e) {
            // (isUndefined(e.isCollapsible) || e.isCollapsible) => check whethe rhte item is collapsible
            // if a isCollapsed property is undefined, then it is considered collapsible and included in collapsible list
            // ((isCollapse && !e.isCollapsed)||(!isCollapse && e.isCollapsed)) => isCollapse !== e.isCollapsed
            return (_this.activeLayout === 'Classic') ? (isUndefined(e.isCollapsible) || e.isCollapsible) && ((isCollapse &&
                isUndefined(e.isCollapsed)) || (!isUndefined(e.isCollapsed) && (isCollapse !== e.isCollapsed))) : true;
        });
        //sort the collapsible groups based on the priority
        groups.sort(function (a, b) { return a.priority - b.priority; });
        //reverse the sorted array to return the array in descending order while collapsing.
        return isCollapse ? groups.reverse() : groups;
    };
    Ribbon.prototype.destroyScroll = function () {
        if (this.scrollModule) {
            this.scrollModule.destroy();
            this.scrollModule = null;
        }
    };
    Ribbon.prototype.clearOverflowDropDown = function (index) {
        var activeContent = this.tabObj.element.querySelector('#' + this.tabs[parseInt(index.toString(), 10)].id + constants.CONTENT_ID);
        if (!activeContent) {
            return;
        }
        var tabContent = activeContent.closest('.' + constants.TAB_CONTENT);
        if (this.activeLayout === 'Simplified') {
            this.removeSimplfiedOverflow(activeContent, tabContent, index, true);
        }
        else {
            this.removeOverflowDropdown(activeContent, tabContent, true, index);
        }
    };
    Ribbon.prototype.ribbonTabSelecting = function (e) {
        var _this = this;
        this.currentControlIndex = 0;
        var nextTabId = e.selectingItem.getAttribute('data-id');
        var previousTabId = e.previousItem.getAttribute('data-id');
        var nextIndex = getIndex(this.tabs, (function (tab) { return (tab.id === nextTabId); }));
        var previousIndex = getIndex(this.tabs, (function (tab) { return (tab.id === previousTabId); }));
        nextIndex = nextIndex === -1 ? this.selectedTab : nextIndex;
        var eventArgs = {
            cancel: e.cancel, isInteracted: e.isInteracted, previousIndex: previousIndex, selectedIndex: nextIndex
        };
        this.trigger('tabSelecting', eventArgs, function (args) {
            if (args.cancel) {
                return;
            }
            _this.destroyScroll();
            if (!_this.isAddRemove && (previousIndex !== -1)) {
                _this.clearOverflowDropDown(previousIndex);
            }
            var selectedTabContent = _this.tabObj.items[parseInt(nextIndex.toString(), 10)].content;
            if ((!selectedTabContent.querySelector('.' + constants.RIBBON_GROUP)) && (_this.tabs[parseInt(nextIndex.toString(), 10)].groups.length !== 0)) {
                var elements = _this.createGroups(_this.tabs[parseInt(nextIndex.toString(), 10)].groups, nextIndex);
                append(elements, selectedTabContent);
            }
        });
    };
    Ribbon.prototype.createTabItems = function (tabs) {
        var _this = this;
        var tabItems = [];
        for (var i = 0; i < tabs.length; i++) {
            var ribbonTab = tabs[parseInt(i.toString(), 10)];
            var header = this.createElement('span', {
                innerHTML: ribbonTab.header,
                id: ribbonTab.id + constants.HEADER_ID
            });
            header.onclick = function () { _this.minimize(false); };
            header.ondblclick = function () { _this.minimize(true); };
            var tab = { header: { text: header }, id: ribbonTab.id, cssClass: ribbonTab.cssClass };
            var content = this.createElement('div', {
                className: tab.cssClass,
                id: ribbonTab.id + constants.CONTENT_ID
            });
            content.classList.add(constants.RIBBON_TAB_ITEM);
            tab.content = content;
            tabItems.push(tab);
        }
        return tabItems;
    };
    Ribbon.prototype.renderInitialTab = function (index) {
        var elements = this.createGroups(this.tabs[parseInt(index.toString(), 10)].groups, index);
        var content = this.tabObj.items[parseInt(index.toString(), 10)].content;
        append(elements, content);
        if (this.activeLayout === 'Simplified') {
            this.element.classList.add(constants.RIBBON_SIMPLIFIED_MODE);
        }
        var activeContent = this.tabObj.element.querySelector('#' + this.tabs[this.selectedTab].id + constants.CONTENT_ID);
        this.checkOverflow(this.selectedTab, activeContent);
    };
    Ribbon.prototype.addOverflowButton = function (btnId) {
        var _this = this;
        var overflowButton = this.createElement('button', {
            id: btnId
        });
        var overflowTarget = this.createElement('div', {
            className: constants.RIBBON_OVERFLOW_TARGET,
            attrs: { 'tabindex': '0' }
        });
        var overflowDDB = new DropDownButton({
            iconCss: constants.OVERFLOW_ICON,
            cssClass: constants.DROPDOWNBUTTON_HIDE + constants.SPACE + constants.RIBBON_GROUP_OVERFLOW_DDB,
            target: overflowTarget,
            locale: this.locale,
            enableRtl: this.enableRtl,
            enablePersistence: this.enablePersistence,
            beforeClose: function (args) {
                var ele = args.event ? closest(args.event.target, '.' + constants.RIBBON_POPUP_CONTROL) : null;
                if (ele) {
                    args.cancel = true;
                }
            }
        }, overflowButton);
        this.element.classList.add(constants.RIBBON_OVERFLOW);
        createTooltip(overflowTarget, this);
        var isGroupOf;
        overflowButton.onkeydown = overflowButton.onclick = function () { _this.itemIndex = -1; isGroupOf = overflowButton.classList.contains('e-ribbon-overall-of-btn') ? false : true; };
        overflowTarget.onkeydown = function (e) { return (_this.upDownKeyHandler(e, overflowTarget, isGroupOf), _this); };
        return overflowDDB;
    };
    Ribbon.prototype.upDownKeyHandler = function (e, target, isGroupOf) {
        var items;
        if (isGroupOf) {
            items = target.getElementsByClassName('e-ribbon-item');
        }
        else {
            var currentList = target.querySelector('.e-ribbon-of-tab.e-ribbon-active');
            items = currentList.getElementsByClassName('e-ribbon-item');
        }
        var comboBoxEle = items[(!this.itemIndex || this.itemIndex < 0) ? 0 : this.itemIndex].querySelector('.e-control').classList.contains('e-combobox') ? items[(!this.itemIndex || this.itemIndex < 0) ? 0 : this.itemIndex].querySelector('.e-combobox') : null;
        var ribbonItem;
        if (comboBoxEle === null || (e.key === 'Tab') || this.itemIndex < 0) {
            if (e.key === 'ArrowDown' || (!e.shiftKey && e.key === 'Tab')) {
                if ((!this.itemIndex && this.itemIndex !== 0) || this.itemIndex < 0 || this.itemIndex === items.length - 1) {
                    this.itemIndex = 0;
                    ribbonItem = items[this.itemIndex].closest('.e-ribbon-item');
                    this.findDisabledItem(ribbonItem, items, true);
                    if (comboBoxEle && e.key === 'Tab') {
                        e.preventDefault();
                        items[this.itemIndex].querySelector('.e-control').focus();
                    }
                }
                else if (this.itemIndex < items.length - 1 && this.itemIndex >= 0) {
                    this.itemIndex++;
                    ribbonItem = items[this.itemIndex].closest('.e-ribbon-item');
                    this.findDisabledItem(ribbonItem, items, true);
                }
            }
            else if (e.key === 'ArrowUp' || (e.shiftKey && e.key === 'Tab')) {
                if (comboBoxEle === null || (e.key === 'Tab')) {
                    if (!this.itemIndex || this.itemIndex === -1) {
                        this.itemIndex = items.length - 1;
                        ribbonItem = items[this.itemIndex].closest('.e-ribbon-item');
                        this.findDisabledItem(ribbonItem, items, false);
                        if (comboBoxEle && (e.shiftKey && e.key === 'Tab')) {
                            e.preventDefault();
                            items[this.itemIndex].querySelector('.e-control').focus();
                        }
                    }
                    else if (this.itemIndex <= items.length - 1 && this.itemIndex > 0) {
                        this.itemIndex--;
                        ribbonItem = items[this.itemIndex].closest('.e-ribbon-item');
                        this.findDisabledItem(ribbonItem, items, false);
                    }
                }
            }
            target.setAttribute('index', this.itemIndex.toString());
        }
        var currentItemIndex = parseInt(target.getAttribute('index'), 10);
        var itemType = items[parseInt(currentItemIndex.toString(), 10)] ? items[parseInt(currentItemIndex.toString(), 10)].querySelector('.e-control').getAttribute('data-control') : null;
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === ' ' || e.key === 'Tab') {
            if (itemType === 'ColorPicker') {
                if (e.key === 'Tab') {
                    e.preventDefault();
                }
                items[parseInt(currentItemIndex.toString(), 10)].querySelector('.e-split-colorpicker').focus();
            }
            else {
                if (e.key === 'Tab') {
                    e.preventDefault();
                }
                items[parseInt(currentItemIndex.toString(), 10)].querySelector('.e-control').focus();
            }
            if (e.key === ' ' && (itemType === 'CheckBox')) {
                var checkBoxEle = items[parseInt(currentItemIndex.toString(), 10)].querySelector('.e-control');
                var checkBox = getComponent(checkBoxEle, CheckBox);
                this.itemIndex = -1;
                checkBox.click();
            }
        }
        if (((itemType === 'SplitButton') && (e.key === 'ArrowRight' || e.key === 'ArrowLeft'))) {
            if (e.key === 'ArrowRight') {
                this.enableRtl ? items[parseInt(currentItemIndex.toString(), 10)].querySelector('.e-control').focus() :
                    items[parseInt(currentItemIndex.toString(), 10)].querySelector('.e-dropdown-btn').focus();
            }
            if (e.key === 'ArrowLeft') {
                this.enableRtl ? items[parseInt(currentItemIndex.toString(), 10)].querySelector('.e-dropdown-btn').focus() :
                    items[parseInt(currentItemIndex.toString(), 10)].querySelector('.e-control').focus();
            }
        }
        if (e.key === 'Enter') {
            this.itemIndex = -1;
        }
    };
    Ribbon.prototype.findDisabledItem = function (ribbonItem, items, isIncrease) {
        while (ribbonItem && ribbonItem.classList.contains('e-disabled')) {
            if (isIncrease) {
                if (this.itemIndex === items.length - 1 && items[this.itemIndex].closest('.e-ribbon-item').classList.contains('e-disabled')) {
                    this.itemIndex = -1;
                }
            }
            else {
                if (this.itemIndex === 0 && items[this.itemIndex].closest('.e-ribbon-item').classList.contains('e-disabled')) {
                    this.itemIndex = items.length;
                }
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            isIncrease ? this.itemIndex++ : this.itemIndex--;
            ribbonItem = items[this.itemIndex].closest('.e-ribbon-item');
        }
    };
    Ribbon.prototype.removeOverflowButton = function (overflowDDB) {
        if (overflowDDB) {
            var btnEle = overflowDDB.element;
            destroyTooltip(overflowDDB.target);
            overflowDDB.destroy();
            btnEle.remove();
        }
    };
    Ribbon.prototype.removeOverflowEvent = function (item, itemEle) {
        switch (item.type) {
            case 'Button':
                this.ribbonButtonModule.removeOverFlowEvents(item, itemEle);
                break;
            case 'DropDown':
                this.ribbonDropDownModule.removeOverFlowEvents(item, itemEle);
                break;
            case 'SplitButton':
                this.ribbonSplitButtonModule.removeOverFlowEvents(item, itemEle);
                break;
            case 'CheckBox':
                this.ribbonCheckBoxModule.removeOverFlowEvents(item, itemEle);
                break;
            case 'ColorPicker':
                this.ribbonColorPickerModule.removeOverFlowEvents(item, itemEle);
                break;
            case 'ComboBox':
                this.ribbonComboBoxModule.removeOverFlowEvents(item, itemEle);
                break;
        }
    };
    Ribbon.prototype.createGroupContainer = function (groupId, groupHeader) {
        var ofGroupContainer = this.createElement('div', {
            className: constants.RIBBON_OF_GROUP_CONTAINER,
            id: groupId + constants.CONTAINER_ID
        });
        var ofGroupHeader = this.createElement('div', {
            className: constants.RIBBON_OVERFLOW_HEADER,
            id: groupId + constants.HEADER_ID,
            innerHTML: groupHeader
        });
        ofGroupContainer.append(ofGroupHeader);
        return ofGroupContainer;
    };
    Ribbon.prototype.addExpandCollapse = function () {
        var _this = this;
        this.collapseButton = this.createElement('span', {
            className: constants.RIBBON_COLLAPSE_BUTTON + constants.SPACE + constants.EXPAND_COLLAPSE_ICON,
            id: this.tabObj.element.id + constants.COLLAPSE_BUTTON_ID,
            attrs: { 'tabindex': '0', 'type': 'button', 'aria-label': 'Layout Switcher', 'role': 'button' }
        });
        this.collapseButton.onclick = function () { _this.toggleLayout(); };
        this.collapseButton.onkeydown = function (e) {
            if (e.key === 'Enter') {
                _this.toggleLayout();
            }
        };
        this.element.classList.add(constants.RIBBON_COLLAPSIBLE);
        if (this.activeLayout === 'Simplified') {
            this.collapseButton.classList.add(constants.RIBBON_EXPAND_BUTTON);
        }
        this.tabObj.element.appendChild(this.collapseButton);
    };
    Ribbon.prototype.removeExpandCollapse = function () {
        var _this = this;
        var index = getIndex(this.tooltipData, function (e) { return e.id === _this.collapseButton.id; });
        if (index !== -1) {
            this.tooltipData.splice(index, 1);
        }
        this.element.classList.remove(constants.RIBBON_COLLAPSIBLE);
        remove(this.tabObj.element.querySelector('.' + constants.RIBBON_COLLAPSE_BUTTON));
        this.collapseButton = null;
    };
    Ribbon.prototype.reRenderTabs = function () {
        this.destroyScroll();
        this.destroyTabItems(this.tabsInternal);
        this.checkID(this.tabs, 'tab', this.element.id);
        this.tabsInternal = this.tabs.slice();
        this.validateItemSize();
        var tabItems = this.createTabItems(this.tabs);
        if (this.selectedTab >= this.tabs.length) {
            this.selectedTab = this.tabs.length - 1;
        }
        this.tabObj.setProperties({ items: tabItems, selectedItem: this.selectedTab });
        var contentEle = this.tabObj.items[this.selectedTab].content;
        if (contentEle.innerHTML === '') {
            this.renderInitialTab(this.selectedTab);
        }
    };
    Ribbon.prototype.switchLayout = function () {
        this.currentControlIndex = 0;
        this.destroyScroll();
        this.collapseButton.classList.toggle(constants.RIBBON_EXPAND_BUTTON, this.activeLayout === 'Simplified');
        this.element.classList.toggle(constants.RIBBON_SIMPLIFIED_MODE, this.activeLayout === 'Simplified');
        for (var i = 0; i <= (this.tabs.length - 1); i++) {
            var tabIndex = i;
            var contentEle = this.tabObj.items[parseInt(tabIndex.toString(), 10)].content;
            if (contentEle.innerHTML !== '') {
                var tab = this.tabs[parseInt(tabIndex.toString(), 10)];
                var groupList = this.tabs[parseInt(tabIndex.toString(), 10)].groups;
                var activeContent = this.tabObj.element.querySelector('#' + this.tabs[parseInt(tabIndex.toString(), 10)].id + constants.CONTENT_ID);
                var tabContent = activeContent.closest('.' + constants.TAB_CONTENT);
                if (this.activeLayout === 'Simplified') {
                    for (var i_1 = 0; i_1 < groupList.length; i_1++) {
                        var group = groupList[parseInt(i_1.toString(), 10)];
                        var alignType = groupList[parseInt(i_1.toString(), 10)].orientation;
                        if (group.isCollapsed) {
                            group.setProperties({ isCollapsed: false }, true);
                            this.removeDropdown(group.id);
                        }
                        else {
                            this.checkSmallToMedium(tabIndex, tab, i_1, tabContent, activeContent, true, false);
                            this.checkMediumToLarge(tabIndex, tab, i_1, tabContent, activeContent, true, false);
                        }
                        var groupEle = tabContent.querySelector('#' + group.id);
                        var groupContainer = groupEle.querySelector('#' + group.id + constants.CONTAINER_ID);
                        var shrinkColumns = groupContainer.querySelectorAll('.' + 'e-ribbon-shrink');
                        for (var i_2 = 0; i_2 < shrinkColumns.length; i_2++) {
                            shrinkColumns[parseInt(i_2.toString(), 10)].remove();
                        }
                        var groupHeader = groupContainer.querySelector('#' + group.id + constants.HEADER_ID);
                        groupHeader.remove();
                        var groupContent = groupContainer.querySelector('#' + group.id + constants.CONTENT_ID);
                        groupContent.classList.replace(constants.RIBBON_ROW, constants.RIBBON_COLUMN);
                        groupContent.classList.remove(constants.RIBBON_CONTENT_HEIGHT);
                        for (var j = 0; j < group.collections.length; j++) {
                            var collection = group.collections[parseInt(j.toString(), 10)];
                            var groupCollection = groupContainer.querySelector('#' + collection.id);
                            groupCollection.classList.replace(constants.RIBBON_ROW, constants.RIBBON_COLUMN);
                            for (var k = 0; k < collection.items.length; k++) {
                                var itemList = collection.items;
                                var item = collection.items[parseInt(k.toString(), 10)];
                                var flag = true;
                                while ((flag) && (item.displayOptions === DisplayMode.Classic)) {
                                    k++;
                                    var itemEle_1 = groupContainer.querySelector('#' + item.id + constants.CONTAINER_ID);
                                    var ele = itemEle_1.querySelector('#' + item.id);
                                    this.destroyFunction(item, ele);
                                    itemEle_1.remove();
                                    if (k < itemList.length) {
                                        item = itemList[parseInt(k.toString(), 10)];
                                    }
                                    else {
                                        flag = false;
                                    }
                                }
                                if (!flag) {
                                    break;
                                }
                                var size = ((item.allowedSizes === RibbonItemSize.Large) ||
                                    (item.allowedSizes & RibbonItemSize.Medium)) ? RibbonItemSize.Medium : RibbonItemSize.Small;
                                size = (!(item.displayOptions & DisplayMode.Simplified) && (item.displayOptions & DisplayMode.Overflow))
                                    ? RibbonItemSize.Medium : size;
                                var itemEle = void 0;
                                if (!(item.displayOptions & DisplayMode.Classic)) {
                                    itemEle = this.createItems([item], alignType, group.id, group.header, group.enableGroupOverflow, tabIndex, groupContainer)[0];
                                    if (item.displayOptions & DisplayMode.Simplified) {
                                        groupCollection.append(itemEle);
                                    }
                                }
                                else {
                                    itemEle = groupContainer.querySelector('#' + item.id + constants.CONTAINER_ID);
                                    if (item.displayOptions === (DisplayMode.Classic | DisplayMode.Overflow)) {
                                        this.createOverflowPopup(item, tabIndex, group.enableGroupOverflow, group.id, group.header, itemEle, groupContainer);
                                        if ((item.type === RibbonItemType.DropDown) || (item.type === RibbonItemType.SplitButton)) {
                                            this.updatePopupItems(item, itemEle, group.enableGroupOverflow, true);
                                        }
                                    }
                                    item.setProperties({ activeSize: size }, true);
                                    var ele = itemEle.querySelector('#' + item.id);
                                    this.setItemSize(ele, item);
                                }
                            }
                        }
                        if (!(group.enableGroupOverflow || groupEle.querySelector('.' + constants.RIBBON_ITEM))) {
                            groupEle.classList.add('e-ribbon-emptyCollection');
                        }
                    }
                }
                else {
                    this.element.classList.remove(constants.RIBBON_OVERFLOW);
                    for (var i_3 = 0; i_3 < groupList.length; i_3++) {
                        var group = groupList[parseInt(i_3.toString(), 10)];
                        var alignType = groupList[parseInt(i_3.toString(), 10)].orientation;
                        var groupContainer = tabContent.querySelector('#' + group.id + constants.CONTAINER_ID);
                        var groupContent = groupContainer.querySelector('#' + group.id + constants.CONTENT_ID);
                        var groupHeader = this.createElement('div', {
                            className: constants.RIBBON_GROUP_HEADER,
                            id: group.id + constants.HEADER_ID,
                            innerHTML: group.header
                        });
                        groupContainer.appendChild(groupHeader);
                        if (alignType === 'Row') {
                            groupContent.classList.replace(constants.RIBBON_COLUMN, constants.RIBBON_ROW);
                        }
                        groupContent.classList.add(constants.RIBBON_CONTENT_HEIGHT);
                        for (var j = 0; j < group.collections.length; j++) {
                            var overflowDDB = void 0;
                            var overflowtarget = void 0;
                            if (!group.enableGroupOverflow) {
                                overflowDDB = this.overflowDDB;
                                if (overflowDDB) {
                                    overflowtarget = this.overflowDDB.target;
                                }
                            }
                            else {
                                var overflowDDBEle = groupContainer.querySelector('#' + group.id + constants.GROUPOF_BUTTON_ID);
                                if (overflowDDBEle) {
                                    overflowDDB = getInstance(overflowDDBEle, DropDownButton);
                                    overflowtarget = overflowDDB.target;
                                }
                            }
                            var collection = group.collections[parseInt(j.toString(), 10)];
                            var groupCollection = groupContainer.querySelector('#' + collection.id);
                            if (alignType === 'Column') {
                                groupCollection.classList.replace(constants.RIBBON_COLUMN, constants.RIBBON_ROW);
                            }
                            for (var k = 0; k < collection.items.length; k++) {
                                var itemList = collection.items;
                                var item = collection.items[parseInt(k.toString(), 10)];
                                var flag = true;
                                while ((flag) && !(item.displayOptions & DisplayMode.Classic)) {
                                    k++;
                                    var itemEle = void 0;
                                    if ((item.displayOptions & DisplayMode.Simplified) || (item.displayOptions & DisplayMode.Overflow)) {
                                        if (item.displayOptions & DisplayMode.Simplified) {
                                            itemEle = groupContainer.querySelector('#' + item.id + constants.CONTAINER_ID);
                                        }
                                        else {
                                            itemEle = overflowtarget.querySelector('#' + item.id + constants.CONTAINER_ID);
                                        }
                                        if (itemEle !== null) {
                                            var ele_8 = itemEle.querySelector('#' + item.id);
                                            this.destroyFunction(item, ele_8);
                                            itemEle.remove();
                                        }
                                    }
                                    if (k < itemList.length) {
                                        item = itemList[parseInt(k.toString(), 10)];
                                    }
                                    else {
                                        flag = false;
                                    }
                                }
                                if (!flag) {
                                    break;
                                }
                                if (!(item.displayOptions & (DisplayMode.Simplified | DisplayMode.Overflow))) {
                                    var itemEle = this.createItems([item], alignType, group.id, group.header, group.enableGroupOverflow, tabIndex)[0];
                                    groupCollection.append(itemEle);
                                }
                                else {
                                    var itemEle = groupContainer.querySelector('#' + item.id + constants.CONTAINER_ID);
                                    if (!itemEle) {
                                        itemEle = overflowtarget.querySelector('#' + item.id + constants.CONTAINER_ID);
                                        if ((item.type === RibbonItemType.DropDown) || (item.type === RibbonItemType.SplitButton)) {
                                            this.updatePopupItems(item, itemEle, group.enableGroupOverflow, false);
                                        }
                                        this.removeOverflowEvent(item, itemEle);
                                    }
                                    groupCollection.append(itemEle);
                                }
                                var ele = groupContainer.querySelector('#' + item.id);
                                var itemsize = (item.allowedSizes & RibbonItemSize.Large) ? RibbonItemSize.Large :
                                    (item.allowedSizes & RibbonItemSize.Medium) ? RibbonItemSize.Medium : RibbonItemSize.Small;
                                item.setProperties({ activeSize: itemsize }, true);
                                this.setItemSize(ele, item);
                            }
                            if (group.enableGroupOverflow && overflowDDB) {
                                if (overflowtarget.childElementCount === 0) {
                                    this.removeOverflowButton(overflowDDB);
                                }
                            }
                        }
                    }
                }
                if (this.selectedTab === tabIndex) {
                    this.checkOverflow(tabIndex, activeContent);
                }
            }
        }
        if (this.activeLayout === 'Classic') {
            this.removeOverflowButton(this.overflowDDB);
            this.overflowDDB = null;
        }
    };
    Ribbon.prototype.createLauncherIcon = function (groupId, groupContainer) {
        var _this = this;
        var launcherIcon = this.createElement('div', {
            className: constants.RIBBON_LAUNCHER_ICON_ELE + ' ' + (this.launcherIconCss ? this.launcherIconCss : constants.RIBBON_LAUNCHER_ICON),
            id: groupId + constants.LAUNCHER_ID,
            attrs: { 'tabindex': '0', 'type': 'button', 'aria-label': 'Launcher Icon', 'role': 'button' }
        });
        groupContainer.appendChild(launcherIcon);
        groupContainer.classList.add(constants.RIBBON_LAUNCHER);
        EventHandler.add(launcherIcon, 'click', this.launcherIconClicked.bind(this, groupId), this);
        EventHandler.add(launcherIcon, 'keydown', function (e) {
            if (e.key === 'Enter') {
                _this.launcherIconClicked(groupId);
            }
        }, this);
    };
    Ribbon.prototype.launcherIconClicked = function (id) {
        var eventArgs = { groupId: id };
        this.trigger('launcherIconClick', eventArgs);
    };
    Ribbon.prototype.createGroups = function (groupList, tabIndex) {
        var groupElements = [];
        for (var i = 0; i < groupList.length; i++) {
            var group = groupList[parseInt(i.toString(), 10)];
            var alignType = group.orientation;
            var groupEle = this.createElement('div', {
                className: group.cssClass,
                id: group.id
            });
            groupEle.classList.add(constants.RIBBON_GROUP);
            groupElements.push(groupEle);
            var groupContainer = this.createElement('div', {
                className: group.cssClass,
                id: group.id + constants.CONTAINER_ID
            });
            groupContainer.classList.add(constants.RIBBON_GROUP_CONTAINER);
            groupEle.appendChild(groupContainer);
            var groupContent = this.createElement('div', {
                className: this.activeLayout === 'Simplified' ? constants.RIBBON_GROUP_CONTENT : (constants.RIBBON_GROUP_CONTENT + constants.SPACE + constants.RIBBON_CONTENT_HEIGHT),
                id: group.id + constants.CONTENT_ID
            });
            groupContent.classList.add(((alignType === 'Column') || (this.activeLayout === 'Simplified')) ? constants.RIBBON_COLUMN : constants.RIBBON_ROW);
            groupContainer.appendChild(groupContent);
            if (this.activeLayout === 'Classic') {
                var groupHeader = this.createElement('div', {
                    className: constants.RIBBON_GROUP_HEADER,
                    id: group.id + constants.HEADER_ID,
                    innerHTML: group.header
                });
                groupContainer.appendChild(groupHeader);
            }
            if (group.showLauncherIcon) {
                this.createLauncherIcon(group.id, groupContainer);
            }
            var elements = this.createCollection(group.collections, group.orientation, group.id, group.header, group.enableGroupOverflow, tabIndex, groupContainer);
            append(elements, groupContent);
            if ((this.activeLayout === 'Simplified') && !(group.enableGroupOverflow || groupEle.querySelector('.' + constants.RIBBON_ITEM))) {
                groupEle.classList.add('e-ribbon-emptyCollection');
            }
        }
        return groupElements;
    };
    Ribbon.prototype.validateItemSize = function () {
        for (var k = 0; k < this.tabs.length; k++) {
            var groupList = this.tabs[parseInt(k.toString(), 10)].groups;
            for (var l = 0; l < groupList.length; l++) {
                var collectionList = groupList[parseInt(l.toString(), 10)].collections;
                var alignType = groupList[parseInt(l.toString(), 10)].orientation;
                for (var i = 0; i < collectionList.length; i++) {
                    var items = collectionList[parseInt(i.toString(), 10)].items;
                    for (var j = 0; j < items.length; j++) {
                        var ribbonitem = items[parseInt(j.toString(), 10)];
                        if (!ribbonitem.allowedSizes || (ribbonitem.allowedSizes === 0)) {
                            ribbonitem.setProperties({
                                allowedSizes: (RibbonItemSize.Small | RibbonItemSize.Medium | RibbonItemSize.Large)
                            }, true);
                        }
                        if ((ribbonitem.type === 'ColorPicker') && (ribbonitem.allowedSizes !== RibbonItemSize.Small)) {
                            ribbonitem.setProperties({ allowedSizes: RibbonItemSize.Small }, true);
                        }
                        else if ((ribbonitem.type === 'ComboBox' || ribbonitem.type === 'CheckBox') &&
                            (ribbonitem.allowedSizes !== RibbonItemSize.Medium)) {
                            ribbonitem.setProperties({ allowedSizes: RibbonItemSize.Medium }, true);
                        }
                        else if (((alignType === 'Column') && (items.length > 1)) || ((alignType === 'Row') && (collectionList.length > 1))) {
                            if (ribbonitem.allowedSizes & RibbonItemSize.Large) {
                                // To remove large size, perform 'and' with 011(3).
                                var sizeVal = ribbonitem.allowedSizes & (RibbonItemSize.Small | RibbonItemSize.Medium);
                                sizeVal = sizeVal ? sizeVal : RibbonItemSize.Medium;
                                ribbonitem.setProperties({ allowedSizes: sizeVal }, true);
                            }
                        }
                        var itemsize = (ribbonitem.allowedSizes & RibbonItemSize.Large) ? RibbonItemSize.Large :
                            (ribbonitem.allowedSizes & RibbonItemSize.Medium) ? RibbonItemSize.Medium : RibbonItemSize.Small;
                        ribbonitem.setProperties({ activeSize: itemsize }, true);
                    }
                }
            }
        }
    };
    Ribbon.prototype.createCollection = function (collectionList, alignType, groupId, groupHeader, isGroupOF, tabIndex, groupContainer) {
        var collectionElements = [];
        for (var i = 0; i < collectionList.length; i++) {
            var collection = collectionList[parseInt(i.toString(), 10)];
            var collectionEle = this.createElement('div', {
                className: collection.cssClass,
                id: collection.id
            });
            collectionEle.classList.add(constants.RIBBON_COLLECTION);
            collectionEle.classList.add(((alignType !== 'Column') || (this.activeLayout === 'Simplified')) ?
                constants.RIBBON_COLUMN : constants.RIBBON_ROW);
            collectionElements.push(collectionEle);
            var elements = this.createItems(collection.items, alignType, groupId, groupHeader, isGroupOF, tabIndex, groupContainer);
            append(elements, collectionEle);
            if ((alignType === 'Row') && (i === 2)) {
                break;
            }
        }
        return collectionElements;
    };
    Ribbon.prototype.createRibbonItem = function (item, itemEle) {
        switch (item.type) {
            case 'Button':
                this.ribbonButtonModule.createButton(item, itemEle);
                break;
            case 'DropDown':
                this.ribbonDropDownModule.createDropDown(item, itemEle);
                break;
            case 'SplitButton':
                this.ribbonSplitButtonModule.createSplitButton(item, itemEle);
                break;
            case 'CheckBox':
                this.ribbonCheckBoxModule.createCheckBox(item, itemEle);
                break;
            case 'ColorPicker':
                this.ribbonColorPickerModule.createColorPicker(item, itemEle);
                break;
            case 'ComboBox':
                this.ribbonComboBoxModule.createComboBox(item, itemEle);
                break;
            case 'Template':
                this.createTemplateContent(item, itemEle);
                break;
        }
    };
    Ribbon.prototype.createItems = function (itemList, alignType, groupId, groupHeader, isGroupOF, tabIndex, groupContainer) {
        var _a;
        var itemElements = [];
        for (var i = 0; i < itemList.length; i++) {
            var item = itemList[parseInt(i.toString(), 10)];
            //To stop rendering of items with simplified mode position type as none
            var flag = true;
            while (flag &&
                (((this.activeLayout === 'Simplified') && !(item.displayOptions & (DisplayMode.Simplified | DisplayMode.Overflow))) ||
                    ((this.activeLayout === 'Classic') && !(item.displayOptions & DisplayMode.Classic)))) {
                i++;
                if (i < itemList.length) {
                    item = itemList[parseInt(i.toString(), 10)];
                }
                else {
                    flag = false;
                }
            }
            if (!flag) {
                break;
            }
            var itemEle = this.createElement('div', {
                className: item.cssClass,
                id: item.id + constants.CONTAINER_ID
            });
            (_a = itemEle.classList).add.apply(_a, [constants.RIBBON_ITEM].concat((item.disabled ? [constants.DISABLED_CSS] : [])));
            // To avoid undefined items condition is added
            if (item.ribbonTooltipSettings && isTooltipPresent(item.ribbonTooltipSettings)) {
                itemEle.classList.add(constants.RIBBON_TOOLTIP_TARGET);
                this.tooltipData.push({ id: itemEle.id, data: item.ribbonTooltipSettings });
            }
            var size = item.activeSize;
            if (this.activeLayout === 'Simplified') {
                size = ((item.allowedSizes === RibbonItemSize.Large) || (item.allowedSizes & RibbonItemSize.Medium) ||
                    (item.displayOptions === DisplayMode.Overflow)) ? RibbonItemSize.Medium : RibbonItemSize.Small;
                item.setProperties({ activeSize: size }, true);
            }
            if (size & RibbonItemSize.Large) {
                itemEle.classList.add(constants.RIBBON_LARGE_ITEM, constants.RIBBON_CONTENT_HEIGHT);
            }
            else {
                itemEle.classList.add((size & RibbonItemSize.Medium) ? constants.RIBBON_MEDIUM_ITEM : constants.RIBBON_SMALL_ITEM);
            }
            this.createRibbonItem(item, itemEle);
            if ((this.activeLayout === 'Simplified') && ((item.displayOptions === DisplayMode.Overflow) || (item.displayOptions === (DisplayMode.Classic | DisplayMode.Overflow)))) {
                this.createOverflowPopup(item, tabIndex, isGroupOF, groupId, groupHeader, itemEle, groupContainer);
                if ((item.type === RibbonItemType.DropDown) || (item.type === RibbonItemType.SplitButton)) {
                    this.updatePopupItems(item, itemEle, isGroupOF, true);
                }
            }
            else {
                // For normal mode and Simplified mode position type as Group and Auto
                itemElements.push(itemEle);
            }
            if ((alignType === 'Column') && (i === 2)) {
                break;
            }
        }
        return itemElements;
    };
    Ribbon.prototype.createHelpPaneTemplate = function () {
        if (this.helpPaneTemplate) {
            var templateName = 'helpPaneTemplate';
            this.clearTemplate([templateName]);
            this.ribbonTempEle = this.createElement('div', {
                className: constants.RIBBON_HELP_TEMPLATE,
                id: this.element.id + constants.RIBBON_HELP_PANE_TEMPLATE_ID
            });
            var templateFunction = getTemplateFunction(this.helpPaneTemplate);
            append(templateFunction({}, this, templateName, 'helpPaneTemplate', this.isStringTemplate), this.ribbonTempEle);
            var tabEle = this.tabObj.element;
            var toolbarEle = tabEle.querySelector('.e-toolbar');
            toolbarEle.after(this.ribbonTempEle);
            tabEle.style.setProperty(constants.RIBBON_HELP_PANE_TEMPLATE_WIDTH, this.ribbonTempEle.offsetWidth + 'px');
            this.renderReactTemplates();
        }
    };
    Ribbon.prototype.createTemplateContent = function (item, itemElement) {
        var itemEle = this.createElement('div', {
            className: item.cssClass ? (constants.RIBBON_TEMPLATE + constants.SPACE + item.cssClass) : constants.RIBBON_TEMPLATE,
            id: item.id
        });
        if (item.disabled) {
            itemEle.classList.add(constants.DISABLED_CSS);
            itemEle.setAttribute('disabled', '');
        }
        itemElement.appendChild(itemEle);
        this.renderItemTemplate(item, itemEle);
    };
    Ribbon.prototype.renderItemTemplate = function (item, itemElement) {
        var templateName = 'ribbon' + item.id + 'itemTemplate';
        this.clearTemplate([templateName]);
        var templateFunction = getTemplateFunction(item.itemTemplate);
        append(templateFunction({ activeSize: RibbonItemSize[item.activeSize] }, this, templateName, (item.id + 'itemTemplate'), this.isStringTemplate), itemElement);
        this.renderReactTemplates();
    };
    Ribbon.prototype.checkID = function (list, type, initId) {
        var key = type === 'tab' ? constants.TAB_ID : type === 'group' ? constants.GROUP_ID :
            type === 'collection' ? constants.COLLECTION_ID : constants.ITEM_ID;
        for (var i = 0; i < list.length; i++) {
            var listitem = list[parseInt(i.toString(), 10)];
            if (!listitem.id) {
                listitem.setProperties({ id: initId + key + (this.idIndex++) }, true);
            }
            switch (type) {
                case 'tab':
                    listitem.setProperties({ groups: this.checkID(listitem.groups, 'group', listitem.id) }, true);
                    break;
                case 'group':
                    listitem.setProperties({ collections: this.checkID(listitem.collections, 'collection', listitem.id) }, true);
                    break;
                case 'collection':
                    listitem.setProperties({ items: this.checkID(listitem.items, 'item', listitem.id) }, true);
                    break;
                default:
                    break;
            }
        }
        return list;
    };
    Ribbon.prototype.updateCommonProperty = function (commonProp) {
        this.tabObj.setProperties(commonProp);
        if (this.ribbonFileMenuModule) {
            this.ribbonFileMenuModule.setCommonProperties(commonProp);
        }
        for (var i = 0; i < this.tabs.length; i++) {
            var tab = this.tabs[parseInt(i.toString(), 10)];
            var contentEle = this.tabObj.items[parseInt(i.toString(), 10)].content;
            for (var _i = 0, _a = tab.groups; _i < _a.length; _i++) {
                var group = _a[_i];
                var dropdownElement = void 0;
                var dropdown = void 0;
                if (this.activeLayout === RibbonLayout.Classic) {
                    dropdownElement = group.isCollapsed ?
                        contentEle.querySelector('#' + group.id + constants.OVERFLOW_ID + constants.DROPDOWN_ID) : null;
                }
                else {
                    dropdownElement = group.enableGroupOverflow ?
                        contentEle.querySelector('#' + group.id + constants.GROUPOF_BUTTON_ID) : null;
                    dropdown = dropdownElement ? getComponent(dropdownElement, DropDownButton) : this.overflowDDB;
                    if (dropdown) {
                        updateTooltipProp(dropdown.target, commonProp);
                        dropdown.setProperties(commonProp);
                    }
                }
                for (var _b = 0, _c = group.collections; _b < _c.length; _b++) {
                    var collection = _c[_b];
                    for (var _d = 0, _e = collection.items; _d < _e.length; _d++) {
                        var item = _e[_d];
                        var ele = null;
                        if (this.activeLayout === RibbonLayout.Classic) {
                            if (item.displayOptions & DisplayMode.Classic) {
                                ele = dropdownElement ? this.ribbonDropDownModule.getDDBItemElement(dropdownElement, item.id) : contentEle.querySelector('#' + item.id);
                            }
                        }
                        else {
                            //Checks for Simplified and Auto options (Auto = classic + simplified + popup)
                            ele = (item.displayOptions & DisplayMode.Simplified) ? contentEle.querySelector('#' + item.id) : null;
                            // element will be null for "Popup" and if the item is moved to overflow in "Auto" mode
                            if (!ele) {
                                ele = dropdown.target.querySelector('#' + item.id);
                                if (item.type === 'DropDown') {
                                    this.updatePopupItems(item, dropdown.target, group.enableGroupOverflow, true);
                                }
                            }
                        }
                        if (ele) {
                            var moduleName = this.getItemModuleName(item);
                            if (moduleName !== 'template') {
                                updateCommonProperty(ele, moduleName, commonProp);
                            }
                            else if (!isNullOrUndefined(commonProp.enableRtl)) {
                                ele.classList.toggle(constants.RTL_CSS, commonProp.enableRtl);
                            }
                        }
                    }
                }
            }
        }
    };
    Ribbon.prototype.removeLauncherIcon = function (groupId, dropdownElement, contentEle) {
        var containerId = groupId + constants.CONTAINER_ID;
        var containerEle = dropdownElement ? this.ribbonDropDownModule.getDDBItemElement(dropdownElement, containerId) : contentEle.querySelector('#' + containerId);
        if (containerEle) {
            containerEle.classList.remove(constants.RIBBON_LAUNCHER);
            var launcherIcon = containerEle.querySelector('#' + groupId + constants.LAUNCHER_ID);
            remove(launcherIcon);
        }
    };
    Ribbon.prototype.destroyTabItems = function (tabs) {
        for (var i = 0; i < tabs.length; i++) {
            var tab = tabs[parseInt(i.toString(), 10)];
            var contentEle = this.tabObj.items[parseInt(i.toString(), 10)].content;
            for (var _i = 0, _a = tab.groups; _i < _a.length; _i++) {
                var group = _a[_i];
                var dropdownElement = void 0;
                var dropdown = void 0;
                if (this.activeLayout === RibbonLayout.Classic) {
                    dropdownElement = group.isCollapsed ?
                        contentEle.querySelector('#' + group.id + constants.OVERFLOW_ID + constants.DROPDOWN_ID) : null;
                    if (group.showLauncherIcon) {
                        this.removeLauncherIcon(group.id, dropdownElement, contentEle);
                    }
                }
                else {
                    dropdownElement = group.enableGroupOverflow ?
                        contentEle.querySelector('#' + group.id + constants.GROUPOF_BUTTON_ID) : null;
                    dropdown = dropdownElement ? getComponent(dropdownElement, DropDownButton) : this.overflowDDB;
                }
                for (var _b = 0, _c = group.collections; _b < _c.length; _b++) {
                    var collection = _c[_b];
                    for (var _d = 0, _e = collection.items; _d < _e.length; _d++) {
                        var item = _e[_d];
                        var ele = void 0;
                        if (this.activeLayout === RibbonLayout.Classic) {
                            if (item.displayOptions & DisplayMode.Classic) {
                                ele = dropdownElement ? this.ribbonDropDownModule.getDDBItemElement(dropdownElement, item.id) :
                                    contentEle.querySelector('#' + item.id);
                            }
                        }
                        else {
                            //Checks for Simplified and Auto options (Auto = classic + simplified + popup)
                            ele = (item.displayOptions & DisplayMode.Simplified) ?
                                contentEle.querySelector('#' + item.id) : null;
                            // element will be null for "Popup" and if the item is moved to overflow in "Auto" mode
                            if (!ele) {
                                ele = dropdown ? dropdown.target.querySelector('#' + item.id) : null;
                            }
                        }
                        if (ele) {
                            this.destroyFunction(item, ele);
                        }
                    }
                }
                if ((this.activeLayout === RibbonLayout.Classic) && dropdownElement) {
                    this.ribbonDropDownModule.removeOverFlowDropDown(dropdownElement);
                }
                else if ((this.activeLayout === RibbonLayout.Simplified) && group.enableGroupOverflow && dropdownElement) {
                    this.removeOverflowButton(dropdown);
                }
            }
        }
        if (this.overflowDDB) {
            this.removeOverflowButton(this.overflowDDB);
            this.overflowDDB = null;
        }
    };
    Ribbon.prototype.destroyFunction = function (item, ele) {
        var moduleName = this.getItemModuleName(item);
        if (moduleName === 'colorpicker') {
            this.ribbonColorPickerModule.unwireColorPickerEvents(ele);
        }
        else if (moduleName !== 'template') {
            destroyControl(ele, moduleName);
        }
        if (item.ribbonTooltipSettings) {
            var index = getIndex(this.tooltipData, function (e) { return e.id === item.id + constants.CONTAINER_ID; });
            if (index !== -1) {
                this.tooltipData.splice(index, 1);
            }
        }
    };
    Ribbon.prototype.getItemModuleName = function (item) {
        switch (item.type) {
            case 'Button':
                return 'btn';
            case 'DropDown':
                return 'dropdown-btn';
            case 'SplitButton':
                return 'split-btn';
            case 'CheckBox':
                return 'checkbox';
            case 'ColorPicker':
                return 'colorpicker';
            case 'ComboBox':
                return 'combobox';
            default:
                return 'template';
        }
    };
    Ribbon.prototype.clearOverflowResize = function () {
        this.destroyScroll();
        this.clearOverflowDropDown(this.selectedTab);
        var tab = this.tabs[this.selectedTab];
        var activeContent = this.tabObj.element.querySelector('#' + this.tabs[this.selectedTab].id + constants.CONTENT_ID);
        var tabContent = activeContent.closest('.' + constants.TAB_CONTENT);
        for (var j = 0; (j < tab.groups.length); j++) {
            this.checkSmallToMedium(this.selectedTab, tab, j, tabContent, activeContent, true, true);
            this.checkMediumToLarge(this.selectedTab, tab, j, tabContent, activeContent, true, true);
        }
    };
    /**
     * Refreshes the layout.
     *
     * @returns {void}
     */
    Ribbon.prototype.refreshLayout = function () {
        this.resizeHandler();
    };
    /**
     * Selects the tab
     *
     * @param  {string} tabId - Gets the tab ID
     * @returns {void}
     */
    Ribbon.prototype.selectTab = function (tabId) {
        var index = getIndex(this.tabs, function (e) { return e.id === tabId; });
        this.setProperties({ selectedTab: index });
    };
    /**
     * Adds the ribbon tab.
     *
     * @param {RibbonTabModel} tab - Gets the ribbon tab model
     * @param {string} targetId  - Gets the ID of the target tab to add the new tab.
     * @param {boolean} isAfter - Defines whether the tab is added before or after the target.
     * @returns {void}
     */
    Ribbon.prototype.addTab = function (tab, targetId, isAfter) {
        var index = targetId ? getIndex(this.tabs, function (e) { return e.id === targetId; }) : -1;
        index = (index === -1) ? this.tabs.length : (index + (isAfter ? 1 : 0));
        this.tabsInternal = this.tabs.slice();
        this.tabsInternal.splice(index, 0, tab);
        this.setProperties({ tabs: this.tabsInternal }, true);
        this.checkID([this.tabs[parseInt(index.toString(), 10)]], 'tab', this.element.id);
        this.tabsInternal = this.tabs.slice();
        this.validateItemSize();
        var tabItem = this.createTabItems([tab]);
        this.tabObj.addTab(tabItem, index);
    };
    /**
     * Removes the ribbon tab.
     *
     * @param {string} tabId - Gets the tab ID
     * @returns {void}
     */
    Ribbon.prototype.removeTab = function (tabId) {
        var index = getIndex(this.tabs, function (e) { return e.id === tabId; });
        if (index === -1) {
            return;
        }
        var contentEle = this.tabObj.items[parseInt(index.toString(), 10)].content;
        var groups = this.tabs[parseInt(index.toString(), 10)].groups;
        if (groups && (contentEle.innerHTML !== '')) {
            for (var _i = 0, groups_1 = groups; _i < groups_1.length; _i++) {
                var group = groups_1[_i];
                var dropdownElement = group.isCollapsed ? contentEle.querySelector('#' + group.id + constants.OVERFLOW_ID + constants.DROPDOWN_ID) : null;
                for (var _a = 0, _b = group.collections; _a < _b.length; _a++) {
                    var collection = _b[_a];
                    for (var _c = 0, _d = collection.items; _c < _d.length; _c++) {
                        var item = _d[_c];
                        var ele = dropdownElement ? this.ribbonDropDownModule.getDDBItemElement(dropdownElement, item.id) : contentEle.querySelector('#' + item.id);
                        if (ele) {
                            this.destroyFunction(item, ele);
                        }
                    }
                }
                if (dropdownElement) {
                    this.ribbonDropDownModule.removeOverFlowDropDown(dropdownElement);
                }
            }
        }
        if (index === this.selectedTab) {
            this.isAddRemove = true;
        }
        this.tabsInternal = this.tabs.slice();
        this.tabsInternal.splice(index, 1);
        this.setProperties({ tabs: this.tabsInternal }, true);
        this.tabObj.removeTab(index);
    };
    /**
     * Adds the ribbon group.
     *
     * @param {string} tabId - Gets the tab ID.
     * @param {RibbonGroupModel} group - Gets the ribbon group model.
     * @param {string} targetId - Gets the ID of the target group to add the new group.
     * @param {boolean} isAfter - Defines whether the group is added before or after the target.
     * @returns {void}
     */
    Ribbon.prototype.addGroup = function (tabId, group, targetId, isAfter) {
        var tabIndex = getIndex(this.tabs, function (e) { return e.id === tabId; });
        if (tabIndex === -1) {
            return;
        }
        if (this.selectedTab === tabIndex) {
            this.clearOverflowResize();
        }
        var tab = this.tabs[parseInt(tabIndex.toString(), 10)];
        var ribbonGroups = tab.groups.slice();
        var index = targetId ? getIndex(ribbonGroups, function (e) { return e.id === targetId; }) : -1;
        index = (index === -1) ? ribbonGroups.length : (index + (isAfter ? 1 : 0));
        ribbonGroups.splice(index, 0, group);
        tab.setProperties({ groups: ribbonGroups }, true);
        this.checkID([tab.groups[parseInt(index.toString(), 10)]], 'group', tabId);
        this.validateItemSize();
        //Check whether the tab items are rendered
        var contentEle = this.tabObj.items[parseInt(tabIndex.toString(), 10)].content;
        if (contentEle.innerHTML !== '') {
            var element = this.createGroups([tab.groups[parseInt(index.toString(), 10)]], tabIndex)[0];
            //insert the element in tab items property.
            var targetEle = targetId ? contentEle.querySelector('#' + targetId) : null;
            if (targetEle) {
                targetEle.insertAdjacentElement(isAfter ? 'afterend' : 'beforebegin', element);
            }
            else {
                contentEle.append(element);
            }
        }
        if (this.selectedTab === tabIndex) {
            this.refreshLayout();
        }
    };
    /**
     * Removes the ribbon group.
     *
     * @param {string} groupId -Gets the group ID.
     * @returns {void}
     */
    Ribbon.prototype.removeGroup = function (groupId) {
        var itemProp = getGroup(this.tabs, groupId);
        if (!itemProp) {
            return;
        }
        if (this.selectedTab === itemProp.tabIndex) {
            this.clearOverflowResize();
        }
        //Check whether the tab items are rendered
        var contentEle = this.tabObj.items[itemProp.tabIndex].content;
        if (contentEle.innerHTML !== '') {
            var dropdownElement = void 0;
            var dropdown = void 0;
            if (itemProp.group.showLauncherIcon) {
                this.removeLauncherIcon(itemProp.group.id, null, contentEle);
            }
            if (this.activeLayout === RibbonLayout.Simplified) {
                dropdownElement = itemProp.group.enableGroupOverflow ?
                    contentEle.querySelector('#' + itemProp.group.id + constants.GROUPOF_BUTTON_ID) : null;
                dropdown = dropdownElement ? getComponent(dropdownElement, DropDownButton) : this.overflowDDB;
            }
            for (var _i = 0, _a = itemProp.group.collections; _i < _a.length; _i++) {
                var collection = _a[_i];
                for (var _b = 0, _c = collection.items; _b < _c.length; _b++) {
                    var item = _c[_b];
                    this.removeItemElement(contentEle, item, dropdown);
                }
            }
            if (this.activeLayout === RibbonLayout.Simplified) {
                if (itemProp.group.enableGroupOverflow) {
                    if (dropdown.target.childElementCount === 0) {
                        this.removeOverflowButton(dropdown);
                    }
                }
                else {
                    var ofGroupContainer = dropdown.target.querySelector('#' + itemProp.group.id + constants.CONTAINER_ID);
                    if (ofGroupContainer && ofGroupContainer.childElementCount === 1) {
                        ofGroupContainer.remove();
                    }
                    var ofTabContainer = dropdown.target.querySelector('#' + this.tabs[parseInt(itemProp.tabIndex.toString(), 10)].id + constants.OVERFLOW_ID);
                    if (ofTabContainer && ofTabContainer.childElementCount === 0) {
                        ofTabContainer.remove();
                    }
                }
            }
            var groupEle = contentEle.querySelector('#' + groupId);
            if (groupEle) {
                groupEle.remove();
            }
        }
        var ribbonGroups = this.tabs[itemProp.tabIndex].groups.slice();
        ribbonGroups.splice(itemProp.groupIndex, 1);
        this.tabs[itemProp.tabIndex].setProperties({ groups: ribbonGroups }, true);
        if (this.selectedTab === itemProp.tabIndex) {
            this.refreshLayout();
        }
    };
    /**
     * adds the ribbon collection.
     *
     * @param {string} groupId - Gets the ribbon group ID.
     * @param {RibbonCollectionModel} collection - Gets the ribbon collection model.
     * @param {string} targetId - Gets the ID of the target collection to add the new collection.
     * @param {boolean} isAfter - Defines whether the collection is added before or after the target.
     * @returns {void}
     */
    Ribbon.prototype.addCollection = function (groupId, collection, targetId, isAfter) {
        var itemProp = getGroup(this.tabs, groupId);
        if (!itemProp) {
            return;
        }
        if ((itemProp.group.orientation === 'Row') && (itemProp.group.collections.length === 3)) {
            return;
        }
        if (this.selectedTab === itemProp.tabIndex) {
            this.clearOverflowResize();
        }
        var ribbonCollections = itemProp.group.collections.slice();
        var index = targetId ? getIndex(ribbonCollections, function (e) { return e.id === targetId; }) : -1;
        index = (index === -1) ? ribbonCollections.length : (index + (isAfter ? 1 : 0));
        ribbonCollections.splice(index, 0, collection);
        itemProp.group.setProperties({ collections: ribbonCollections }, true);
        this.checkID([itemProp.group.collections[parseInt(index.toString(), 10)]], 'collection', groupId);
        this.validateItemSize();
        var contentEle = this.tabObj.items[itemProp.tabIndex].content;
        if (contentEle.innerHTML !== '') {
            var collection_1 = itemProp.group.collections[parseInt(index.toString(), 10)];
            var element = this.createCollection([collection_1], itemProp.group.orientation, itemProp.group.id, itemProp.group.header, itemProp.group.enableGroupOverflow, itemProp.tabIndex)[0];
            if (itemProp.group.isCollapsed) {
                contentEle = this.ribbonDropDownModule.getOverflowDropDownPopup(itemProp, contentEle);
            }
            //insert the element in tab items property.
            var targetEle = targetId ? contentEle.querySelector('#' + targetId) : null;
            if (targetEle) {
                targetEle.insertAdjacentElement(isAfter ? 'afterend' : 'beforebegin', element);
            }
            else {
                contentEle.querySelector('#' + groupId + constants.CONTENT_ID).append(element);
            }
        }
        if (this.selectedTab === itemProp.tabIndex) {
            this.refreshLayout();
        }
    };
    /**
     * Removes the ribbon collection.
     *
     * @param {string} collectionId - Gets the collection ID.
     * @returns {void}
     */
    Ribbon.prototype.removeCollection = function (collectionId) {
        var itemProp = getCollection(this.tabs, collectionId);
        if (!itemProp) {
            return;
        }
        if (this.selectedTab === itemProp.tabIndex) {
            this.clearOverflowResize();
        }
        //Check whether the tab items are rendered
        var contentEle = this.tabObj.items[itemProp.tabIndex].content;
        if (contentEle.innerHTML !== '') {
            var dropdownElement = void 0;
            var dropdown = void 0;
            if (this.activeLayout === RibbonLayout.Simplified) {
                dropdownElement = itemProp.group.enableGroupOverflow ?
                    contentEle.querySelector('#' + itemProp.group.id + constants.GROUPOF_BUTTON_ID) : null;
                dropdown = dropdownElement ? getComponent(dropdownElement, DropDownButton) : this.overflowDDB;
            }
            for (var _i = 0, _a = itemProp.collection.items; _i < _a.length; _i++) {
                var item = _a[_i];
                this.removeItemElement(contentEle, item, dropdown);
            }
            var groupEle = contentEle.querySelector('#' + collectionId);
            if (groupEle) {
                groupEle.remove();
            }
        }
        var ribbonGroup = itemProp.group;
        var ribbonCollections = ribbonGroup.collections.slice();
        ribbonCollections.splice(itemProp.collectionIndex, 1);
        ribbonGroup.setProperties({ collections: ribbonCollections }, true);
        if (this.selectedTab === itemProp.tabIndex) {
            this.refreshLayout();
        }
    };
    /**
     * Adds ribbon item.
     *
     * @param {string} collectionId - Gets the collection ID.
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {string} targetId - Gets the ID of the target item to add the new item.
     * @param {boolean} isAfter - Defines whether the item is added before or after the target.
     * @returns {void}
     */
    Ribbon.prototype.addItem = function (collectionId, item, targetId, isAfter) {
        var itemProp = getCollection(this.tabs, collectionId);
        if (!itemProp) {
            return;
        }
        if ((itemProp.group.orientation === 'Column') && (itemProp.collection.items.length === 3)) {
            return;
        }
        if (this.selectedTab === itemProp.tabIndex) {
            this.clearOverflowResize();
        }
        var ribbonItems = itemProp.collection.items.slice();
        var index = targetId ? getIndex(ribbonItems, function (e) { return e.id === targetId; }) : -1;
        index = (index === -1) ? ribbonItems.length : (index + (isAfter ? 1 : 0));
        ribbonItems.splice(index, 0, item);
        itemProp.collection.setProperties({ items: ribbonItems }, true);
        this.checkID([itemProp.collection.items[parseInt(index.toString(), 10)]], 'item', collectionId);
        this.validateItemSize();
        var contentEle = this.tabObj.items[itemProp.tabIndex].content;
        var groupContainer = contentEle.querySelector('#' + itemProp.group.id + constants.CONTAINER_ID);
        if (contentEle.innerHTML !== '') {
            var item_1 = itemProp.collection.items[parseInt(index.toString(), 10)];
            var element = this.createItems([item_1], itemProp.group.orientation, itemProp.group.id, itemProp.group.header, itemProp.group.enableGroupOverflow, itemProp.tabIndex, groupContainer)[0];
            if (itemProp.group.isCollapsed) {
                contentEle = this.ribbonDropDownModule.getOverflowDropDownPopup(itemProp, contentEle);
            }
            //insert the element in tab items property.
            var targetEle = targetId ? contentEle.querySelector('#' + targetId) : null;
            if (targetEle) {
                targetEle.closest('.' + constants.RIBBON_ITEM).insertAdjacentElement(isAfter ? 'afterend' : 'beforebegin', element);
            }
            else {
                if (element) {
                    contentEle.querySelector('#' + collectionId).append(element);
                }
            }
        }
        if (this.selectedTab === itemProp.tabIndex) {
            this.refreshLayout();
        }
    };
    /**
     * Removes ribbon item.
     *
     * @param {string} itemId - Gets the item ID.
     * @returns {void}
     */
    Ribbon.prototype.removeItem = function (itemId) {
        var itemProp = getItem(this.tabs, itemId);
        if (!itemProp) {
            return;
        }
        if (this.selectedTab === itemProp.tabIndex) {
            this.clearOverflowResize();
        }
        //Check whether the tab items are rendered
        var contentEle = this.tabObj.items[itemProp.tabIndex].content;
        if (contentEle.innerHTML !== '') {
            var dropdownElement = void 0;
            var dropdown = void 0;
            if (this.activeLayout === RibbonLayout.Simplified) {
                dropdownElement = itemProp.group.enableGroupOverflow ?
                    contentEle.querySelector('#' + itemProp.group.id + constants.GROUPOF_BUTTON_ID) : null;
                dropdown = dropdownElement ? getComponent(dropdownElement, DropDownButton) : this.overflowDDB;
            }
            var item = itemProp.item;
            this.removeItemElement(contentEle, item, dropdown);
        }
        var ribbonCollection = itemProp.collection;
        var ribbonItems = ribbonCollection.items;
        ribbonItems.splice(itemProp.itemIndex, 1);
        ribbonCollection.setProperties({ items: ribbonItems }, true);
        if (this.selectedTab === itemProp.tabIndex) {
            this.refreshLayout();
        }
    };
    /**
     * tab - Gets the ribbon tab to be updated. The id of the tab is a required property. Other properties are optional.
     *
     * @param {RibbonTabModel} tab - Gets the ribbon tab model.
     * @returns {void}
     */
    Ribbon.prototype.updateTab = function (tab) {
        var tabId = tab.id;
        var index = getIndex(this.tabs, function (e) { return e.id === tabId; });
        if (index === -1) {
            return;
        }
        var contentEle = this.tabObj.items[parseInt(index.toString(), 10)].content;
        var groups = this.tabs[parseInt(index.toString(), 10)].groups;
        var tabEle = this.tabObj.element;
        if (groups && (contentEle.innerHTML !== '')) {
            // Check whether cssClass is passed by the user, and if it is, then remove the old values.
            if (tab.cssClass) {
                if (this.tabs[parseInt(index.toString(), 10)].cssClass) {
                    contentEle.classList.remove(this.tabs[parseInt(index.toString(), 10)].cssClass);
                    tabEle.querySelector('.e-active').classList.remove(this.tabs[parseInt(index.toString(), 10)].cssClass);
                }
            }
            // Check whether group is passed by the user, and if it is, then remove the old values.
            if (tab.groups) {
                for (var _i = 0, groups_2 = groups; _i < groups_2.length; _i++) {
                    var group = groups_2[_i];
                    var dropdownElement = group.isCollapsed ? contentEle.querySelector('#' + group.id + constants.OVERFLOW_ID + constants.DROPDOWN_ID) : null;
                    for (var _a = 0, _b = group.collections; _a < _b.length; _a++) {
                        var collection = _b[_a];
                        for (var _c = 0, _d = collection.items; _c < _d.length; _c++) {
                            var item = _d[_c];
                            var ele = dropdownElement ? this.ribbonDropDownModule.getDDBItemElement(dropdownElement, item.id) : contentEle.querySelector('#' + item.id);
                            if (ele) {
                                this.destroyFunction(item, ele);
                            }
                        }
                    }
                    if (dropdownElement) {
                        this.ribbonDropDownModule.removeOverFlowDropDown(dropdownElement);
                    }
                }
                var groupElements = contentEle.querySelectorAll('.e-ribbon-group');
                // eslint-disable-next-line @typescript-eslint/tslint/config
                groupElements.forEach(function (groupEle) { groupEle.remove(); });
            }
        }
        if (index === this.selectedTab) {
            this.isAddRemove = true;
        }
        var ribbonTab = this.tabs[parseInt(index.toString(), 10)];
        ribbonTab.setProperties(tab, true);
        this.setProperties({ groups: this.checkID(ribbonTab.groups, 'group', ribbonTab.id) }, true);
        this.validateItemSize();
        if (contentEle.innerHTML === '') {
            // Check whether group is passed by the user and sets the updated values.
            if (tab.groups) {
                var elements = this.createGroups(ribbonTab.groups, index);
                append(elements, contentEle);
            }
            if (this.selectedTab === index) {
                this.refreshLayout();
            }
            // Check whether cssClass is passed by the user and sets the updated values.
            if (tab.cssClass) {
                contentEle.classList.add(ribbonTab.cssClass);
                tabEle.querySelector('.e-active').classList.add(ribbonTab.cssClass);
            }
            // Check whether header is passed by the user and sets the updated values.
            if (tab.header) {
                tabEle.querySelector('#' + tabId + constants.HEADER_ID).innerText = ribbonTab.header;
            }
        }
    };
    /**
     * group - Gets the ribbon group to be updated. The id of the group is a required property. Other properties are optional.
     *
     * @param {RibbonGroupModel} group - Gets the ribbon group model.
     * @returns {void}
     */
    Ribbon.prototype.updateGroup = function (group) {
        var groupId = group.id;
        var itemProp = getGroup(this.tabs, groupId);
        if (!itemProp) {
            return;
        }
        if (this.selectedTab === itemProp.tabIndex) {
            this.clearOverflowResize();
        }
        //Check whether the tab items are rendered
        var contentEle = this.tabObj.items[itemProp.tabIndex].content;
        var groupEle = contentEle.querySelector('#' + groupId);
        var groupContainer = groupEle.querySelector('#' + group.id + constants.CONTAINER_ID);
        var dropdownElement;
        var dropdown;
        if (contentEle.innerHTML !== '') {
            if (itemProp.group.showLauncherIcon) {
                this.removeLauncherIcon(itemProp.group.id, null, contentEle);
            }
            if (this.activeLayout === RibbonLayout.Simplified) {
                dropdownElement = itemProp.group.enableGroupOverflow ?
                    contentEle.querySelector('#' + itemProp.group.id + constants.GROUPOF_BUTTON_ID) : null;
                dropdown = dropdownElement ? getComponent(dropdownElement, DropDownButton) : this.overflowDDB;
            }
            // Check whether cssClass is passed by the user, and if it is, then remove the old values.
            if (group.cssClass) {
                if (itemProp.group.cssClass) {
                    groupEle.classList.remove(itemProp.group.cssClass);
                    if (groupContainer) {
                        groupContainer.classList.remove(itemProp.group.cssClass);
                    }
                }
            }
            // Check whether collections or orientation is passed by the user, and if it is, then remove the old values.
            if (group.collections || group.orientation) {
                if (itemProp.group.collections || itemProp.group.orientation) {
                    for (var _i = 0, _a = itemProp.group.collections; _i < _a.length; _i++) {
                        var collection = _a[_i];
                        for (var _b = 0, _c = collection.items; _b < _c.length; _b++) {
                            var item = _c[_b];
                            this.removeItemElement(contentEle, item, dropdown);
                        }
                    }
                    var collectionElements = groupEle.querySelectorAll('.e-ribbon-collection');
                    // eslint-disable-next-line @typescript-eslint/tslint/config
                    collectionElements.forEach(function (collectionEle) { collectionEle.remove(); });
                    if (group.orientation) {
                        var groupContent = groupContainer.querySelector('.e-ribbon-group-content');
                        var removeCss = groupContent.classList.value.match(/(e-ribbon-[column|row]+)/g);
                        if (removeCss) {
                            removeClass([groupContent], removeCss);
                        }
                    }
                }
            }
            if (this.activeLayout === RibbonLayout.Simplified) {
                if (itemProp.group.enableGroupOverflow) {
                    if (dropdown.target.childElementCount === 0) {
                        this.removeOverflowButton(dropdown);
                    }
                }
                else {
                    var ofGroupContainer = dropdown.target.querySelector('#' + itemProp.group.id + constants.CONTAINER_ID);
                    if (ofGroupContainer && ofGroupContainer.childElementCount === 1) {
                        ofGroupContainer.remove();
                    }
                    var ofTabContainer = dropdown.target.querySelector('#' + this.tabs[parseInt(itemProp.tabIndex.toString(), 10)].id + constants.OVERFLOW_ID);
                    if (ofTabContainer && ofTabContainer.childElementCount === 0) {
                        ofTabContainer.remove();
                    }
                }
            }
        }
        var ribbongroup = itemProp.group;
        ribbongroup.setProperties(group, true);
        ribbongroup.setProperties({ collections: this.checkID(ribbongroup.collections, 'collection', ribbongroup.id) }, true);
        this.validateItemSize();
        if (contentEle.innerHTML !== '') {
            // Check whether showLauncherIcon or orientation is passed by the user and sets the updated values.
            if (group.showLauncherIcon) {
                this.createLauncherIcon(ribbongroup.id, groupContainer);
            }
            // Check whether collections or orientation is passed by the user and sets the updated values.
            if (group.collections || group.orientation) {
                var groupContent = groupContainer.querySelector('.e-ribbon-group-content');
                groupContent.classList.add(((ribbongroup.orientation === 'Column') || (this.activeLayout === 'Simplified')) ? constants.RIBBON_COLUMN : constants.RIBBON_ROW);
                var elements = this.createCollection(ribbongroup.collections, ribbongroup.orientation, ribbongroup.id, ribbongroup.header, ribbongroup.enableGroupOverflow, itemProp.tabIndex, groupContainer);
                append(elements, groupContent);
            }
            if (this.selectedTab === itemProp.tabIndex) {
                this.refreshLayout();
            }
            // Check whether cssClass is passed by the user and sets the updated values.
            if (group.cssClass) {
                groupEle.classList.add(ribbongroup.cssClass);
                if (groupContainer) {
                    groupContainer.classList.add(ribbongroup.cssClass);
                }
            }
            // Check whether header is passed by the user and sets the updated values.
            if (group.header) {
                if (this.activeLayout === RibbonLayout.Simplified && !group.enableGroupOverflow) {
                    var overflowHeader = dropdown.target.querySelector('#' + group.id + constants.HEADER_ID);
                    if (overflowHeader) {
                        overflowHeader.innerText = ribbongroup.header;
                    }
                }
                else if (this.activeLayout === RibbonLayout.Classic && !ribbongroup.isCollapsed) {
                    groupEle.querySelector('.e-ribbon-group-header').innerText = ribbongroup.header;
                }
                else if (this.activeLayout === RibbonLayout.Classic && ribbongroup.isCollapsed) {
                    var overflowEle = groupEle.querySelector('#' + ribbongroup.id + constants.OVERFLOW_ID + constants.DROPDOWN_ID);
                    // need to set instance for dropdown
                    var dropDownBtn = getInstance(overflowEle, DropDownButton);
                    var overflowHeader = dropDownBtn.target.querySelector('#' + group.id + constants.HEADER_ID);
                    if (overflowHeader) {
                        overflowHeader.innerText = ribbongroup.header;
                    }
                }
            }
        }
    };
    /**
     * collection - Gets the ribbon collection to be updated. The id of the collection is a required property. Other properties are optional.
     *
     * @param {RibbonCollectionModel} collection - Gets the ribbon collection model.
     * @returns {void}
     */
    Ribbon.prototype.updateCollection = function (collection) {
        var collectionId = collection.id;
        var itemProp = getCollection(this.tabs, collectionId);
        if (!itemProp) {
            return;
        }
        if (this.selectedTab === itemProp.tabIndex) {
            this.clearOverflowResize();
        }
        //Check whether the tab items are rendered
        var contentEle = this.tabObj.items[itemProp.tabIndex].content;
        var collectionEle = contentEle.querySelector('#' + collectionId);
        if (contentEle.innerHTML !== '') {
            var dropdownElement = void 0;
            var dropdown = void 0;
            if (this.activeLayout === RibbonLayout.Simplified) {
                dropdownElement = itemProp.group.enableGroupOverflow ?
                    contentEle.querySelector('#' + itemProp.group.id + constants.GROUPOF_BUTTON_ID) : null;
                dropdown = dropdownElement ? getComponent(dropdownElement, DropDownButton) : this.overflowDDB;
            }
            // Check whether cssClass is passed by the user, and if it is, then remove the old values.
            if (collection.cssClass) {
                if (itemProp.collection.cssClass) {
                    collectionEle.classList.remove(itemProp.collection.cssClass);
                }
            }
            if (collection.items) {
                if (itemProp.collection.items) {
                    for (var _i = 0, _a = itemProp.collection.items; _i < _a.length; _i++) {
                        var item = _a[_i];
                        this.removeItemElement(contentEle, item, dropdown);
                    }
                }
            }
        }
        var ribboncollection = itemProp.collection;
        ribboncollection.setProperties(collection, true);
        ribboncollection.setProperties({ items: this.checkID(ribboncollection.items, 'item', ribboncollection.id) }, true);
        this.validateItemSize();
        if (contentEle.innerHTML !== '') {
            if (collection.items) {
                var groupContainer = contentEle.querySelector('#' + itemProp.group.id + constants.CONTAINER_ID);
                var elements = this.createItems(ribboncollection.items, itemProp.group.orientation, itemProp.group.id, itemProp.group.header, itemProp.group.enableGroupOverflow, itemProp.tabIndex, groupContainer);
                append(elements, collectionEle);
            }
        }
        if (this.selectedTab === itemProp.tabIndex) {
            this.refreshLayout();
        }
        // Check whether cssClass is passed by the user and sets the updated values.
        if (collection.cssClass) {
            collectionEle.classList.add(ribboncollection.cssClass);
        }
    };
    /**
     * item - Gets the ribbon item to be updated. The id of the item is a required property. Other properties are optional.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @returns {void}
     */
    Ribbon.prototype.updateItem = function (item) {
        var itemId = item.id;
        var itemProp = getItem(this.tabs, itemId);
        if (!itemProp) {
            return;
        }
        if (this.selectedTab === itemProp.tabIndex) {
            this.clearOverflowResize();
        }
        //Check whether the tab items are rendered
        var contentEle = this.tabObj.items[itemProp.tabIndex].content;
        var groupEle = contentEle.querySelector('#' + itemProp.group.id);
        var groupContainer = groupEle.querySelector('#' + itemProp.group.id + constants.CONTAINER_ID);
        var itemContainer = null;
        var itemEle = null;
        var dropdownElement;
        var dropdown;
        if (contentEle.innerHTML !== '') {
            if (this.activeLayout === RibbonLayout.Simplified) {
                dropdownElement = itemProp.group.enableGroupOverflow ?
                    contentEle.querySelector('#' + itemProp.group.id + constants.GROUPOF_BUTTON_ID) : null;
                dropdown = dropdownElement ? getComponent(dropdownElement, DropDownButton) : this.overflowDDB;
            }
            if (this.activeLayout === RibbonLayout.Simplified && itemProp.item.displayOptions === DisplayMode.Overflow) {
                itemContainer = dropdown.target.querySelector('#' + itemId + constants.CONTAINER_ID);
                itemEle = dropdown.target.querySelector('#' + itemId);
                if (item.displayOptions && item.displayOptions !== DisplayMode.Overflow) {
                    var collectionEle = groupContainer.querySelector('#' + itemProp.collection.id);
                    if (collectionEle) {
                        collectionEle.appendChild(itemContainer);
                    }
                }
            }
            else {
                itemContainer = groupContainer.querySelector('#' + itemId + constants.CONTAINER_ID);
                itemEle = contentEle.querySelector('#' + itemId);
                if (this.activeLayout === RibbonLayout.Simplified && item.displayOptions === DisplayMode.Overflow) {
                    this.createOverflowPopup(itemProp.item, itemProp.tabIndex, itemProp.group.enableGroupOverflow, itemProp.group.id, itemProp.group.header, itemContainer, groupContainer);
                    if ((itemProp.item.type === RibbonItemType.DropDown) || (itemProp.item.type === RibbonItemType.SplitButton)) {
                        this.updatePopupItems(itemProp.item, itemContainer, itemProp.group.enableGroupOverflow, true);
                    }
                }
            }
            // Check whether cssClass is passed by the user, and if it is, then remove the old values.
            if (item.cssClass) {
                if (itemProp.item.cssClass) {
                    itemContainer.classList.remove(itemProp.item.cssClass);
                }
            }
            this.destroyFunction(itemProp.item, itemEle);
            itemEle.remove();
            var removeCss = itemContainer.classList.value.match(/(e-ribbon-[large|medium|small]+-item)/g);
            if (removeCss) {
                removeClass([itemContainer], removeCss);
            }
        }
        var ribbonItem = itemProp.item;
        ribbonItem.setProperties(item, true);
        this.validateItemSize();
        if (contentEle.innerHTML !== '') {
            if (!(this.activeLayout === RibbonLayout.Simplified && ribbonItem.displayOptions === DisplayMode.Overflow)) {
                itemContainer = groupContainer.querySelector('#' + itemId + constants.CONTAINER_ID);
            }
            else {
                itemContainer = dropdown.target.querySelector('#' + itemId + constants.CONTAINER_ID);
            }
            // To avoid undefined items condition is added
            if (ribbonItem.ribbonTooltipSettings && isTooltipPresent(ribbonItem.ribbonTooltipSettings)) {
                itemContainer.classList.add(constants.RIBBON_TOOLTIP_TARGET);
                this.tooltipData.push({ id: itemContainer.id, data: ribbonItem.ribbonTooltipSettings });
            }
            var size = ribbonItem.activeSize;
            if (this.activeLayout === 'Simplified') {
                size = ((ribbonItem.allowedSizes === RibbonItemSize.Large) || (ribbonItem.allowedSizes & RibbonItemSize.Medium) ||
                    (ribbonItem.displayOptions === DisplayMode.Overflow)) ? RibbonItemSize.Medium : RibbonItemSize.Small;
                ribbonItem.setProperties({ activeSize: size }, true);
            }
            if (size & RibbonItemSize.Large) {
                itemContainer.classList.add(constants.RIBBON_LARGE_ITEM, constants.RIBBON_CONTENT_HEIGHT);
            }
            else {
                itemContainer.classList.add((size & RibbonItemSize.Medium) ? constants.RIBBON_MEDIUM_ITEM : constants.RIBBON_SMALL_ITEM);
            }
            this.createRibbonItem(ribbonItem, itemContainer);
            if (this.activeLayout === 'Simplified' && itemProp.group.enableGroupOverflow) {
                if (dropdown.target.childElementCount === 0) {
                    this.removeOverflowButton(dropdown);
                }
            }
            if (this.selectedTab === itemProp.tabIndex) {
                this.refreshLayout();
            }
            if (item.cssClass) {
                itemContainer.classList.add(ribbonItem.cssClass);
            }
            this.enableDisableItem(ribbonItem.id, ribbonItem.disabled);
        }
    };
    Ribbon.prototype.removeItemElement = function (contentEle, item, dropdown) {
        var ele = null;
        if (this.activeLayout === RibbonLayout.Classic) {
            ele = (item.displayOptions & DisplayMode.Classic) ? contentEle.querySelector('#' + item.id) : null;
        }
        else {
            //Checks for Simplified and Auto options (Auto = classic + simplified + popup)
            ele = (item.displayOptions & DisplayMode.Simplified) ? contentEle.querySelector('#' + item.id) : null;
            // element will be null for "Popup" and if the item is moved to overflow in "Auto" mode
            if (!ele) {
                ele = dropdown.target.querySelector('#' + item.id);
            }
        }
        if (ele) {
            this.destroyFunction(item, ele);
            ele.closest('#' + item.id + constants.CONTAINER_ID).remove();
        }
    };
    /**
     * Enables ribbon item.
     *
     * @param {string} itemId - Gets the item ID.
     * @returns {void}
     */
    Ribbon.prototype.enableItem = function (itemId) {
        this.enableDisableItem(itemId, false);
    };
    /**
     * Disables ribbon item.
     *
     * @param {string} itemId - Gets the item ID.
     * @returns {void}
     */
    Ribbon.prototype.disableItem = function (itemId) {
        this.enableDisableItem(itemId, true);
    };
    Ribbon.prototype.enableDisableItem = function (itemId, isDisabled) {
        var itemProp = getItem(this.tabs, itemId);
        if (!itemProp) {
            return;
        }
        itemProp.item.setProperties({ disabled: isDisabled }, true);
        var ele = getItemElement(this, itemId, itemProp);
        if (ele) {
            var itemEle = closest(ele, '.e-ribbon-item');
            itemEle.classList.toggle(constants.DISABLED_CSS, itemProp.item.disabled);
            var moduleName = this.getItemModuleName(itemProp.item);
            if (moduleName !== 'template') {
                updateControlDisabled(ele, moduleName, isDisabled);
            }
            else {
                ele.classList.toggle(constants.DISABLED_CSS, isDisabled);
                ele.toggleAttribute('disabled', isDisabled);
            }
        }
    };
    Ribbon.prototype.unwireEvents = function () {
        EventHandler.remove(window, 'resize', this.resizeHandler);
    };
    Ribbon.prototype.destroy = function () {
        this.keyboardModuleRibbon.destroy();
        this.keyboardModuleRibbon = null;
        destroyTooltip(this.element);
        this.destroyTabItems(this.tabs);
        this.removeExpandCollapse();
        this.collapseButton = undefined;
        if (this.scrollModule) {
            this.scrollModule.destroy();
        }
        if (this.ribbonTempEle) {
            remove(this.ribbonTempEle);
            this.ribbonTempEle = null;
        }
        _super.prototype.destroy.call(this);
        this.tabObj.destroy();
        this.tabObj = undefined;
        remove(this.element.querySelector('#' + this.element.id + constants.TAB_ID));
        this.element.style.removeProperty(constants.RIBBON_FILE_MENU_WIDTH);
        this.element.style.removeProperty(constants.RIBBON_HELP_PANE_TEMPLATE_WIDTH);
        this.element.style.removeProperty('width');
        if (this.cssClass) {
            removeClass([this.element], this.cssClass.split(constants.SPACE));
        }
        this.element.classList.remove(constants.RTL_CSS, constants.RIBBON_SIMPLIFIED_MODE, constants.RIBBON_OVERFLOW, constants.RIBBON_COLLAPSIBLE, constants.RIBBON_MINIMIZE, 'e-rbn');
        this.unwireEvents();
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param  {RibbonModel} newProp - Specifies new properties
     * @param  {RibbonModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    Ribbon.prototype.onPropertyChanged = function (newProp, oldProp) {
        var _a, _b;
        for (var _i = 0, _c = Object.keys(newProp); _i < _c.length; _i++) {
            var prop = _c[_i];
            switch (prop) {
                case 'activeLayout':
                    this.switchLayout();
                    break;
                case 'cssClass':
                    if (oldProp.cssClass) {
                        (_a = this.element.classList).remove.apply(_a, oldProp.cssClass.split(constants.SPACE));
                    }
                    if (newProp.cssClass) {
                        (_b = this.element.classList).add.apply(_b, newProp.cssClass.split(constants.SPACE));
                    }
                    break;
                case 'isMinimized':
                    this.element.classList.toggle(constants.RIBBON_MINIMIZE, this.isMinimized);
                    this.tabObj.element.querySelector('.e-content').style.display = this.isMinimized ? 'none' : 'block';
                    if (!this.isMinimized) {
                        this.refreshLayout();
                    }
                    break;
                case 'locale':
                    this.updateCommonProperty({ locale: this.locale });
                    break;
                case 'enablePersistence':
                    this.updateCommonProperty({ enablePersistence: this.enablePersistence });
                    break;
                case 'enableRtl':
                    this.element.classList.toggle(constants.RTL_CSS, this.enableRtl);
                    this.updateCommonProperty({ enableRtl: newProp.enableRtl });
                    if (this.scrollModule) {
                        this.scrollModule.setProperties({ enableRtl: newProp.enableRtl });
                    }
                    break;
                case 'launcherIconCss':
                    for (var i = 0; i < this.tabs.length; i++) {
                        var tabContent = this.tabObj.items[parseInt(i.toString(), 10)].content;
                        var tab = this.tabs[parseInt(i.toString(), 10)];
                        if (tabContent.querySelector('.' + constants.RIBBON_GROUP)) {
                            for (var _d = 0, _e = tab.groups; _d < _e.length; _d++) {
                                var group = _e[_d];
                                if (group.showLauncherIcon) {
                                    var className = constants.RIBBON_LAUNCHER_ICON_ELE + ' ' + (this.launcherIconCss || constants.RIBBON_LAUNCHER_ICON);
                                    if (group.isCollapsed) {
                                        var element = tabContent.querySelector('#' + group.id + constants.OVERFLOW_ID + constants.DROPDOWN_ID);
                                        var dropdown = getComponent(element, DropDownButton);
                                        var launcherIconEle = dropdown.target.querySelector('#' + group.id + constants.LAUNCHER_ID);
                                        launcherIconEle.className = className;
                                    }
                                    else {
                                        var element = tabContent.querySelector('#' + group.id + constants.LAUNCHER_ID);
                                        element.className = className;
                                    }
                                }
                            }
                        }
                    }
                    break;
                case 'selectedTab':
                    this.tabObj.setProperties({ selectedItem: newProp.selectedTab });
                    break;
                case 'tabAnimation':
                    this.tabObj.setProperties({ animation: newProp.tabAnimation });
                    break;
                case 'tabs':
                    this.reRenderTabs();
                    break;
                case 'width':
                    this.element.style.width = formatUnit(newProp.width);
                    this.refreshLayout();
                    break;
                case 'fileMenu':
                    if (this.ribbonFileMenuModule) {
                        this.ribbonFileMenuModule.updateFileMenu(this.fileMenu);
                    }
                    var toolbarEle = this.tabObj['tbObj'];
                    toolbarEle.refreshOverflow();
                    break;
                case 'helpPaneTemplate':
                    if (this.ribbonTempEle) {
                        remove(this.ribbonTempEle);
                        this.ribbonTempEle = null;
                        this.tabObj.element.style.setProperty(constants.RIBBON_HELP_PANE_TEMPLATE_WIDTH, '0px');
                    }
                    if (this.helpPaneTemplate) {
                        this.createHelpPaneTemplate();
                    }
                    var toolbar_1 = this.tabObj['tbObj'];
                    toolbar_1.refreshOverflow();
                    break;
            }
        }
    };
    var Ribbon_1;
    __decorate([
        Property('Classic')
    ], Ribbon.prototype, "activeLayout", void 0);
    __decorate([
        Property('')
    ], Ribbon.prototype, "cssClass", void 0);
    __decorate([
        Complex({}, FileMenuSettings)
    ], Ribbon.prototype, "fileMenu", void 0);
    __decorate([
        Property('')
    ], Ribbon.prototype, "launcherIconCss", void 0);
    __decorate([
        Property(false)
    ], Ribbon.prototype, "isMinimized", void 0);
    __decorate([
        Property('en-us')
    ], Ribbon.prototype, "locale", void 0);
    __decorate([
        Property(0)
    ], Ribbon.prototype, "selectedTab", void 0);
    __decorate([
        Complex({}, TabAnimationSettings)
    ], Ribbon.prototype, "tabAnimation", void 0);
    __decorate([
        Collection([], RibbonTab)
    ], Ribbon.prototype, "tabs", void 0);
    __decorate([
        Property('100%')
    ], Ribbon.prototype, "width", void 0);
    __decorate([
        Property('')
    ], Ribbon.prototype, "helpPaneTemplate", void 0);
    __decorate([
        Event()
    ], Ribbon.prototype, "tabSelecting", void 0);
    __decorate([
        Event()
    ], Ribbon.prototype, "tabSelected", void 0);
    __decorate([
        Event()
    ], Ribbon.prototype, "ribbonExpanding", void 0);
    __decorate([
        Event()
    ], Ribbon.prototype, "ribbonCollapsing", void 0);
    __decorate([
        Event()
    ], Ribbon.prototype, "launcherIconClick", void 0);
    Ribbon = Ribbon_1 = __decorate([
        NotifyPropertyChanges
    ], Ribbon);
    return Ribbon;
}(Component));
export { Ribbon };
