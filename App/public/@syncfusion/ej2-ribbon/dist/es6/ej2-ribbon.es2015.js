import { ChildProperty, Collection, Complex, Component, Event, EventHandler, KeyboardEvents, NotifyPropertyChanges, Property, addClass, append, closest, compile, formatUnit, getComponent, getInstance, getUniqueID, isNullOrUndefined, isUndefined, merge, remove, removeClass, select } from '@syncfusion/ej2-base';
import { HScroll, Menu, MenuAnimationSettings, MenuItem, Tab, TabAnimationSettings, Toolbar } from '@syncfusion/ej2-navigations';
import { ComboBox, FieldSettings } from '@syncfusion/ej2-dropdowns';
import { DropDownButton, Item, SplitButton } from '@syncfusion/ej2-splitbuttons';
import { Button, CheckBox } from '@syncfusion/ej2-buttons';
import { ColorPicker } from '@syncfusion/ej2-inputs';
import { Tooltip } from '@syncfusion/ej2-popups';

/**
 * Defines the layout types of ribbon.
 */
var RibbonLayout;
(function (RibbonLayout) {
    /**
     * Displays the ribbon tab content in classic layout.
     */
    RibbonLayout["Classic"] = "Classic";
    /**
     * Displays the ribbon tab content in simplified layout.
     */
    RibbonLayout["Simplified"] = "Simplified";
})(RibbonLayout || (RibbonLayout = {}));
/**
 * Defines the alignment of the items in the ribbon group.
 */
var ItemOrientation;
(function (ItemOrientation) {
    /**
     * Displays the collection of items in rows.
     */
    ItemOrientation["Row"] = "Row";
    /**
     * Displays the collection of items in column.
     */
    ItemOrientation["Column"] = "Column";
})(ItemOrientation || (ItemOrientation = {}));
/**
 * Defines the current size of the ribbon item in normal mode.
 *
 * @aspNumberEnum
 */
var RibbonItemSize;
(function (RibbonItemSize) {
    /**
     * The item appears with large icon and text at the bottom.
     */
    RibbonItemSize[RibbonItemSize["Large"] = 4] = "Large";
    /**
     * The item appears with small icon and text at the right.
     */
    RibbonItemSize[RibbonItemSize["Medium"] = 2] = "Medium";
    /**
     * The item appears with small icon only.
     */
    RibbonItemSize[RibbonItemSize["Small"] = 1] = "Small";
})(RibbonItemSize || (RibbonItemSize = {}));
/**
 * Defines how to show an item in ribbon simplified layout.
 *
 * @aspNumberEnum
 */
var DisplayMode;
(function (DisplayMode) {
    /**
     * The item appears in the classic layout group.
     */
    DisplayMode[DisplayMode["Classic"] = 4] = "Classic";
    /**
     * The item appears in the simplified layout group.
     */
    DisplayMode[DisplayMode["Simplified"] = 2] = "Simplified";
    /**
     * The item appears in overflow popup.
     */
    DisplayMode[DisplayMode["Overflow"] = 1] = "Overflow";
    /**
      * The item appears in classic layout group, simplified layout group, and overflow popup based on ribbon overflow state.
     */
    DisplayMode[DisplayMode["Auto"] = 7] = "Auto";
})(DisplayMode || (DisplayMode = {}));
/**
 * Defines the type of the ribbon item.
 */
var RibbonItemType;
(function (RibbonItemType) {
    /**
     * Renders button as ribbon item.
     */
    RibbonItemType["Button"] = "Button";
    /**
     * Renders checkbox as ribbon item.
     */
    RibbonItemType["CheckBox"] = "CheckBox";
    /**
     * Renders color picker as ribbon item.
     */
    RibbonItemType["ColorPicker"] = "ColorPicker";
    /**
     * Renders combobox as ribbon item.
     */
    RibbonItemType["ComboBox"] = "ComboBox";
    /**
     * Renders dropdownbutton as ribbon item.
     */
    RibbonItemType["DropDown"] = "DropDown";
    /**
     * Renders splitbutton as ribbon item.
     */
    RibbonItemType["SplitButton"] = "SplitButton";
    /**
     * Renders the template content as ribbon item.
     */
    RibbonItemType["Template"] = "Template";
})(RibbonItemType || (RibbonItemType = {}));

var __decorate$5 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the ribbon button item.
 */
class RibbonButtonSettings extends ChildProperty {
    /**
     * @param {Object} prop - Gets the property of button.
     * @param {boolean} muteOnChange - Gets the boolean value of muteOnChange.
     * @returns {void}
     * @private
     */
    setProperties(prop, muteOnChange) {
        super.setProperties(prop, muteOnChange);
    }
}
__decorate$5([
    Property('')
], RibbonButtonSettings.prototype, "content", void 0);
__decorate$5([
    Property('')
], RibbonButtonSettings.prototype, "cssClass", void 0);
__decorate$5([
    Property('')
], RibbonButtonSettings.prototype, "iconCss", void 0);
__decorate$5([
    Property(false)
], RibbonButtonSettings.prototype, "isToggle", void 0);
__decorate$5([
    Property(false)
], RibbonButtonSettings.prototype, "isPrimary", void 0);
__decorate$5([
    Event()
], RibbonButtonSettings.prototype, "created", void 0);
__decorate$5([
    Event()
], RibbonButtonSettings.prototype, "clicked", void 0);

var __decorate$6 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the ribbon checkbox item.
 */
class RibbonCheckBoxSettings extends ChildProperty {
    /**
     * @param {Object} prop - Gets the property of checkbox.
     * @param {boolean} muteOnChange - Gets the boolean value of muteOnChange.
     * @returns {void}
     * @private
     */
    setProperties(prop, muteOnChange) {
        super.setProperties(prop, muteOnChange);
    }
}
__decorate$6([
    Property(false)
], RibbonCheckBoxSettings.prototype, "checked", void 0);
__decorate$6([
    Property('')
], RibbonCheckBoxSettings.prototype, "cssClass", void 0);
__decorate$6([
    Property('')
], RibbonCheckBoxSettings.prototype, "label", void 0);
__decorate$6([
    Property('After')
], RibbonCheckBoxSettings.prototype, "labelPosition", void 0);
__decorate$6([
    Event()
], RibbonCheckBoxSettings.prototype, "created", void 0);
__decorate$6([
    Event()
], RibbonCheckBoxSettings.prototype, "change", void 0);

var __decorate$7 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the ribbon color picker.
 */
class RibbonColorPickerSettings extends ChildProperty {
    /**
     * @param {Object} prop - Gets the property of colorpicker.
     * @param {boolean} muteOnChange - Gets the boolean value of muteOnChange.
     * @returns {void}
     * @private
     */
    setProperties(prop, muteOnChange) {
        super.setProperties(prop, muteOnChange);
    }
}
__decorate$7([
    Property(10)
], RibbonColorPickerSettings.prototype, "columns", void 0);
__decorate$7([
    Property('')
], RibbonColorPickerSettings.prototype, "cssClass", void 0);
__decorate$7([
    Property(true)
], RibbonColorPickerSettings.prototype, "enableOpacity", void 0);
__decorate$7([
    Property('Picker')
], RibbonColorPickerSettings.prototype, "mode", void 0);
__decorate$7([
    Property(true)
], RibbonColorPickerSettings.prototype, "modeSwitcher", void 0);
__decorate$7([
    Property(false)
], RibbonColorPickerSettings.prototype, "noColor", void 0);
__decorate$7([
    Property(null)
], RibbonColorPickerSettings.prototype, "presetColors", void 0);
__decorate$7([
    Property(true)
], RibbonColorPickerSettings.prototype, "showButtons", void 0);
__decorate$7([
    Property('#008000ff')
], RibbonColorPickerSettings.prototype, "value", void 0);
__decorate$7([
    Event()
], RibbonColorPickerSettings.prototype, "beforeClose", void 0);
__decorate$7([
    Event()
], RibbonColorPickerSettings.prototype, "beforeOpen", void 0);
__decorate$7([
    Event()
], RibbonColorPickerSettings.prototype, "beforeTileRender", void 0);
__decorate$7([
    Event()
], RibbonColorPickerSettings.prototype, "created", void 0);
__decorate$7([
    Event()
], RibbonColorPickerSettings.prototype, "change", void 0);
__decorate$7([
    Event()
], RibbonColorPickerSettings.prototype, "open", void 0);
__decorate$7([
    Event()
], RibbonColorPickerSettings.prototype, "select", void 0);

var __decorate$8 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the ribbon combobox item.
 */
class RibbonComboBoxSettings extends ChildProperty {
    /**
     * @param {Object} prop - Gets the property of combobox.
     * @param {boolean} muteOnChange - Gets the boolean value of muteOnChange.
     * @returns {void}
     * @private
     */
    setProperties(prop, muteOnChange) {
        super.setProperties(prop, muteOnChange);
    }
}
__decorate$8([
    Property(false)
], RibbonComboBoxSettings.prototype, "allowFiltering", void 0);
__decorate$8([
    Property(true)
], RibbonComboBoxSettings.prototype, "autofill", void 0);
__decorate$8([
    Property('')
], RibbonComboBoxSettings.prototype, "cssClass", void 0);
__decorate$8([
    Property([])
], RibbonComboBoxSettings.prototype, "dataSource", void 0);
__decorate$8([
    Complex({ text: null, value: null, iconCss: null, groupBy: null }, FieldSettings)
], RibbonComboBoxSettings.prototype, "fields", void 0);
__decorate$8([
    Property('Contains')
], RibbonComboBoxSettings.prototype, "filterType", void 0);
__decorate$8([
    Property(null)
], RibbonComboBoxSettings.prototype, "footerTemplate", void 0);
__decorate$8([
    Property(null)
], RibbonComboBoxSettings.prototype, "groupTemplate", void 0);
__decorate$8([
    Property(null)
], RibbonComboBoxSettings.prototype, "headerTemplate", void 0);
__decorate$8([
    Property(null)
], RibbonComboBoxSettings.prototype, "index", void 0);
__decorate$8([
    Property(null)
], RibbonComboBoxSettings.prototype, "itemTemplate", void 0);
__decorate$8([
    Property('No records found')
], RibbonComboBoxSettings.prototype, "noRecordsTemplate", void 0);
__decorate$8([
    Property(null)
], RibbonComboBoxSettings.prototype, "placeholder", void 0);
__decorate$8([
    Property('300px')
], RibbonComboBoxSettings.prototype, "popupHeight", void 0);
__decorate$8([
    Property('100%')
], RibbonComboBoxSettings.prototype, "popupWidth", void 0);
__decorate$8([
    Property(true)
], RibbonComboBoxSettings.prototype, "showClearButton", void 0);
__decorate$8([
    Property('None')
], RibbonComboBoxSettings.prototype, "sortOrder", void 0);
__decorate$8([
    Property(null)
], RibbonComboBoxSettings.prototype, "text", void 0);
__decorate$8([
    Property(null)
], RibbonComboBoxSettings.prototype, "value", void 0);
__decorate$8([
    Property('150px')
], RibbonComboBoxSettings.prototype, "width", void 0);
__decorate$8([
    Event()
], RibbonComboBoxSettings.prototype, "beforeOpen", void 0);
__decorate$8([
    Event()
], RibbonComboBoxSettings.prototype, "change", void 0);
__decorate$8([
    Event()
], RibbonComboBoxSettings.prototype, "close", void 0);
__decorate$8([
    Event()
], RibbonComboBoxSettings.prototype, "created", void 0);
__decorate$8([
    Event()
], RibbonComboBoxSettings.prototype, "filtering", void 0);
__decorate$8([
    Event()
], RibbonComboBoxSettings.prototype, "open", void 0);
__decorate$8([
    Event()
], RibbonComboBoxSettings.prototype, "select", void 0);

var __decorate$9 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the ribbon DropDownButton item.
 */
class RibbonDropDownSettings extends ChildProperty {
    /**
     * @param {Object} prop - Gets the property of DropDown.
     * @param {boolean} muteOnChange - Gets the boolean value of muteOnChange.
     * @returns {void}
     * @private
     */
    setProperties(prop, muteOnChange) {
        super.setProperties(prop, muteOnChange);
    }
}
__decorate$9([
    Property('')
], RibbonDropDownSettings.prototype, "closeActionEvents", void 0);
__decorate$9([
    Property('')
], RibbonDropDownSettings.prototype, "content", void 0);
__decorate$9([
    Property('')
], RibbonDropDownSettings.prototype, "cssClass", void 0);
__decorate$9([
    Property('')
], RibbonDropDownSettings.prototype, "iconCss", void 0);
__decorate$9([
    Collection([], Item)
], RibbonDropDownSettings.prototype, "items", void 0);
__decorate$9([
    Property('')
], RibbonDropDownSettings.prototype, "target", void 0);
__decorate$9([
    Event()
], RibbonDropDownSettings.prototype, "beforeClose", void 0);
__decorate$9([
    Event()
], RibbonDropDownSettings.prototype, "beforeItemRender", void 0);
__decorate$9([
    Event()
], RibbonDropDownSettings.prototype, "beforeOpen", void 0);
__decorate$9([
    Event()
], RibbonDropDownSettings.prototype, "close", void 0);
__decorate$9([
    Event()
], RibbonDropDownSettings.prototype, "created", void 0);
__decorate$9([
    Event()
], RibbonDropDownSettings.prototype, "open", void 0);
__decorate$9([
    Event()
], RibbonDropDownSettings.prototype, "select", void 0);

var __decorate$10 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the ribbon SplitButton item.
 */
class RibbonSplitButtonSettings extends ChildProperty {
    /**
     * @param {Object} prop - Gets the property of DropDown.
     * @param {boolean} muteOnChange - Gets the boolean value of muteOnChange.
     * @returns {void}
     * @private
     */
    setProperties(prop, muteOnChange) {
        super.setProperties(prop, muteOnChange);
    }
}
__decorate$10([
    Property('')
], RibbonSplitButtonSettings.prototype, "closeActionEvents", void 0);
__decorate$10([
    Property('')
], RibbonSplitButtonSettings.prototype, "content", void 0);
__decorate$10([
    Property('')
], RibbonSplitButtonSettings.prototype, "cssClass", void 0);
__decorate$10([
    Property('')
], RibbonSplitButtonSettings.prototype, "iconCss", void 0);
__decorate$10([
    Collection([], Item)
], RibbonSplitButtonSettings.prototype, "items", void 0);
__decorate$10([
    Property('')
], RibbonSplitButtonSettings.prototype, "target", void 0);
__decorate$10([
    Event()
], RibbonSplitButtonSettings.prototype, "beforeClose", void 0);
__decorate$10([
    Event()
], RibbonSplitButtonSettings.prototype, "beforeItemRender", void 0);
__decorate$10([
    Event()
], RibbonSplitButtonSettings.prototype, "beforeOpen", void 0);
__decorate$10([
    Event()
], RibbonSplitButtonSettings.prototype, "close", void 0);
__decorate$10([
    Event()
], RibbonSplitButtonSettings.prototype, "click", void 0);
__decorate$10([
    Event()
], RibbonSplitButtonSettings.prototype, "created", void 0);
__decorate$10([
    Event()
], RibbonSplitButtonSettings.prototype, "open", void 0);
__decorate$10([
    Event()
], RibbonSplitButtonSettings.prototype, "select", void 0);

var __decorate$11 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the ribbon tooltip.
 */
class RibbonTooltip extends ChildProperty {
}
__decorate$11([
    Property('')
], RibbonTooltip.prototype, "cssClass", void 0);
__decorate$11([
    Property('')
], RibbonTooltip.prototype, "id", void 0);
__decorate$11([
    Property('')
], RibbonTooltip.prototype, "title", void 0);
__decorate$11([
    Property('')
], RibbonTooltip.prototype, "content", void 0);
__decorate$11([
    Property('')
], RibbonTooltip.prototype, "iconCss", void 0);

var __decorate$4 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the ribbon item.
 */
class RibbonItem extends ChildProperty {
    /**
     * @param {Object} prop - Gets the property of item.
     * @param {boolean} muteOnChange - Gets the boolean value of muteOnChange.
     * @returns {void}
     * @private
     */
    setProperties(prop, muteOnChange) {
        super.setProperties(prop, muteOnChange);
    }
}
__decorate$4([
    Property(RibbonItemSize.Medium)
], RibbonItem.prototype, "activeSize", void 0);
__decorate$4([
    Property(RibbonItemSize.Small | RibbonItemSize.Medium | RibbonItemSize.Large)
], RibbonItem.prototype, "allowedSizes", void 0);
__decorate$4([
    Property('')
], RibbonItem.prototype, "id", void 0);
__decorate$4([
    Property('')
], RibbonItem.prototype, "cssClass", void 0);
__decorate$4([
    Property(false)
], RibbonItem.prototype, "disabled", void 0);
__decorate$4([
    Property('')
], RibbonItem.prototype, "itemTemplate", void 0);
__decorate$4([
    Property('Button')
], RibbonItem.prototype, "type", void 0);
__decorate$4([
    Property(DisplayMode.Auto)
], RibbonItem.prototype, "displayOptions", void 0);
__decorate$4([
    Complex({}, RibbonTooltip)
], RibbonItem.prototype, "ribbonTooltipSettings", void 0);
__decorate$4([
    Complex({}, RibbonButtonSettings)
], RibbonItem.prototype, "buttonSettings", void 0);
__decorate$4([
    Complex({}, RibbonDropDownSettings)
], RibbonItem.prototype, "dropDownSettings", void 0);
__decorate$4([
    Complex({}, RibbonCheckBoxSettings)
], RibbonItem.prototype, "checkBoxSettings", void 0);
__decorate$4([
    Complex({}, RibbonColorPickerSettings)
], RibbonItem.prototype, "colorPickerSettings", void 0);
__decorate$4([
    Complex({}, RibbonComboBoxSettings)
], RibbonItem.prototype, "comboBoxSettings", void 0);
__decorate$4([
    Complex({}, RibbonSplitButtonSettings)
], RibbonItem.prototype, "splitButtonSettings", void 0);

var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the items of Ribbon.
 */
class RibbonCollection extends ChildProperty {
    /**
     * @param {Object} prop - Gets the property of collection.
     * @param {boolean} muteOnChange - Gets the boolean value of muteOnChange.
     * @returns {void}
     * @private
     */
    setProperties(prop, muteOnChange) {
        super.setProperties(prop, muteOnChange);
    }
}
__decorate$3([
    Property('')
], RibbonCollection.prototype, "id", void 0);
__decorate$3([
    Property('')
], RibbonCollection.prototype, "cssClass", void 0);
__decorate$3([
    Collection([], RibbonItem)
], RibbonCollection.prototype, "items", void 0);

var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the ribbon group.
 */
class RibbonGroup extends ChildProperty {
    /**
     * @param {Object} prop - Gets the property of Group.
     * @param {boolean} muteOnChange - Gets the boolean value of muteOnChange.
     * @returns {void}
     * @private
     */
    setProperties(prop, muteOnChange) {
        super.setProperties(prop, muteOnChange);
    }
}
__decorate$2([
    Collection([], RibbonCollection)
], RibbonGroup.prototype, "collections", void 0);
__decorate$2([
    Property('')
], RibbonGroup.prototype, "cssClass", void 0);
__decorate$2([
    Property('')
], RibbonGroup.prototype, "id", void 0);
__decorate$2([
    Property(false)
], RibbonGroup.prototype, "isCollapsed", void 0);
__decorate$2([
    Property(true)
], RibbonGroup.prototype, "isCollapsible", void 0);
__decorate$2([
    Property(false)
], RibbonGroup.prototype, "enableGroupOverflow", void 0);
__decorate$2([
    Property('')
], RibbonGroup.prototype, "groupIconCss", void 0);
__decorate$2([
    Property('')
], RibbonGroup.prototype, "header", void 0);
__decorate$2([
    Property('Column')
], RibbonGroup.prototype, "orientation", void 0);
__decorate$2([
    Property(0)
], RibbonGroup.prototype, "priority", void 0);
__decorate$2([
    Property(false)
], RibbonGroup.prototype, "showLauncherIcon", void 0);

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the ribbon tab.
 */
class RibbonTab extends ChildProperty {
    /**
     * @param {Object} prop - Gets the property of tab.
     * @param {boolean} muteOnChange - Gets the boolean value of muteOnChange.
     * @returns {void}
     * @private
     */
    setProperties(prop, muteOnChange) {
        super.setProperties(prop, muteOnChange);
    }
}
__decorate$1([
    Property('')
], RibbonTab.prototype, "id", void 0);
__decorate$1([
    Property('')
], RibbonTab.prototype, "cssClass", void 0);
__decorate$1([
    Collection([], RibbonGroup)
], RibbonTab.prototype, "groups", void 0);
__decorate$1([
    Property('')
], RibbonTab.prototype, "header", void 0);

var __decorate$12 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the ribbon file menu settings.
 */
class FileMenuSettings extends ChildProperty {
    /**
     * @param {Object} prop - Gets the property of FileMenu.
     * @param {boolean} muteOnChange - Gets the boolean value of muteOnChange.
     * @returns {void}
     * @private
     */
    setProperties(prop, muteOnChange) {
        super.setProperties(prop, muteOnChange);
    }
}
__decorate$12([
    Property('File')
], FileMenuSettings.prototype, "text", void 0);
__decorate$12([
    Property(false)
], FileMenuSettings.prototype, "visible", void 0);
__decorate$12([
    Collection([], MenuItem)
], FileMenuSettings.prototype, "menuItems", void 0);
__decorate$12([
    Property(false)
], FileMenuSettings.prototype, "showItemOnClick", void 0);
__decorate$12([
    Complex({}, MenuAnimationSettings)
], FileMenuSettings.prototype, "animationSettings", void 0);
__decorate$12([
    Property('')
], FileMenuSettings.prototype, "itemTemplate", void 0);
__decorate$12([
    Property('')
], FileMenuSettings.prototype, "popupTemplate", void 0);
__decorate$12([
    Complex({}, RibbonTooltip)
], FileMenuSettings.prototype, "ribbonTooltipSettings", void 0);
__decorate$12([
    Event()
], FileMenuSettings.prototype, "beforeClose", void 0);
__decorate$12([
    Event()
], FileMenuSettings.prototype, "beforeOpen", void 0);
__decorate$12([
    Event()
], FileMenuSettings.prototype, "beforeItemRender", void 0);
__decorate$12([
    Event()
], FileMenuSettings.prototype, "close", void 0);
__decorate$12([
    Event()
], FileMenuSettings.prototype, "open", void 0);
__decorate$12([
    Event()
], FileMenuSettings.prototype, "select", void 0);

// export * from './file-menu';

/**
 * Specifies the File Manager internal ID's
 */
/** @hidden */
const ITEM_VERTICAL_CENTER = 'e-ribbon-vertical-center';
/** @hidden */
const EXPAND_COLLAPSE_ICON = 'e-icons e-drop-icon';
/** @hidden */
const OVERFLOW_ICON = 'e-icons e-more-horizontal-1';
/** @hidden */
const VERTICAL_DDB = 'e-vertical';
/** @hidden */
const DISABLED_CSS = 'e-disabled';
/** @hidden */
const RTL_CSS = 'e-rtl';
/** @hidden */
const RIBBON_HOVER = 'e-ribbon-hover';
/** @hidden */
const RIBBON_CONTROL = 'e-ribbon-control';
/** @hidden */
const RIBBON_POPUP_CONTROL = 'e-ribbon-popup-control';
/** @hidden */
const RIBBON_POPUP_OPEN = 'e-ribbon-open';
/** @hidden */
const SPACE = ' ';
/** @hidden */
const HORIZONTAL_SCROLLBAR = 'e-hscroll-bar';
/** @hidden */
const HIDE_CSS = 'e-ribbon-hide';
/** @hidden */
const RIBBON_TAB = 'e-ribbon-tab';
/** @hidden */
const RIBBON_TAB_ACTIVE = 'e-ribbon-active';
/** @hidden */
const RIBBON_TAB_ITEM = 'e-ribbon-tab-item';
/** @hidden */
const RIBBON_COLLAPSE_BUTTON = 'e-ribbon-collapse-btn';
/** @hidden */
const RIBBON_EXPAND_BUTTON = 'e-ribbon-expand-btn';
/** @hidden */
const RIBBON_COLLAPSIBLE = 'e-ribbon-collapsible';
/** @hidden */
const RIBBON_OVERALL_OF_BUTTON = 'e-ribbon-overall-of-btn';
/** @hidden */
const RIBBON_GROUP_OF_BUTTON = 'e-ribbon-group-of-btn';
/** @hidden */
const RIBBON_OVERFLOW_TARGET = 'e-ribbon-overflow-target';
/** @hidden */
const RIBBON_OVERFLOW = 'e-ribbon-overflow';
/** @hidden */
const TAB_CONTENT = 'e-content';
/** @hidden */
const RIBBON_MINIMIZE = 'e-ribbon-minimize';
/** @hidden */
const RIBBON_GROUP = 'e-ribbon-group';
/** @hidden */
const RIBBON_GROUP_CONTAINER = 'e-ribbon-group-container';
/** @hidden */
const RIBBON_OF_TAB_CONTAINER = 'e-ribbon-of-tab';
/** @hidden */
const RIBBON_OF_GROUP_CONTAINER = 'e-ribbon-of-group-container';
/** @hidden */
const RIBBON_GROUP_CONTENT = 'e-ribbon-group-content';
/** @hidden */
const RIBBON_GROUP_HEADER = 'e-ribbon-group-header';
/** @hidden */
const RIBBON_OVERFLOW_HEADER = 'e-ribbon-overflow-header';
/** @hidden */
const RIBBON_GROUP_OVERFLOW = 'e-ribbon-group-overflow';
/** @hidden */
const RIBBON_GROUP_OVERFLOW_DDB = 'e-ribbon-group-overflow-ddb';
/** @hidden */
const RIBBON_LAUNCHER = 'e-ribbon-launcher';
/** @hidden */
const RIBBON_LAUNCHER_ICON_ELE = 'e-ribbon-launcher-icon';
/** @hidden */
const RIBBON_LAUNCHER_ICON = 'e-icons e-launcher';
/** @hidden */
const RIBBON_COLLECTION = 'e-ribbon-collection';
/** @hidden */
const RIBBON_ITEM = 'e-ribbon-item';
/** @hidden */
const RIBBON_ROW = 'e-ribbon-row';
/** @hidden */
const RIBBON_COLUMN = 'e-ribbon-column';
/** @hidden */
const RIBBON_LARGE_ITEM = 'e-ribbon-large-item';
/** @hidden */
const RIBBON_MEDIUM_ITEM = 'e-ribbon-medium-item';
/** @hidden */
const RIBBON_SMALL_ITEM = 'e-ribbon-small-item';
/** @hidden */
const RIBBON_CONTENT_HEIGHT = 'e-ribbon-content-height';
/** @hidden */
const DROPDOWNBUTTON = 'e-dropdown-btn';
/** @hidden */
const DROPDOWNBUTTON_HIDE = 'e-caret-hide';
/** @hidden */
const RIBBON_TEMPLATE = 'e-ribbon-template';
/** @hidden */
const RIBBON_HELP_TEMPLATE = 'e-ribbon-help-template';
/** @hidden */
const RIBBON_TOOLTIP = 'e-ribbon-tooltip';
/** @hidden */
const RIBBON_TOOLTIP_TARGET = 'e-ribbon-tooltip-target';
/** @hidden */
const RIBBON_TOOLTIP_TITLE = 'e-ribbon-tooltip-title';
/** @hidden */
const RIBBON_TOOLTIP_CONTENT = 'e-ribbon-tooltip-content';
/** @hidden */
const RIBBON_TOOLTIP_ICON = 'e-ribbon-tooltip-icon';
/** @hidden */
const RIBBON_TOOLTIP_CONTAINER = 'e-ribbon-tooltip-container';
/** @hidden */
const RIBBON_TEXT_CONTAINER = 'e-ribbon-text-container';
/** @hidden */
const RIBBON_SIMPLIFIED_MODE = 'e-ribbon-simplified-mode';
/** @hidden */
const TAB_ID = '_tab';
/** @hidden */
const GROUP_ID = '_group';
/** @hidden */
const COLLECTION_ID = '_collection';
/** @hidden */
const ITEM_ID = '_item';
/** @hidden */
const COLLAPSE_BUTTON_ID = '_collapsebutton';
/** @hidden */
const OVRLOF_BUTTON_ID = '_sim_ovrl_overflow';
/** @hidden */
const GROUPOF_BUTTON_ID = '_sim_grp_overflow';
/** @hidden */
const HEADER_ID = '_header';
/** @hidden */
const LAUNCHER_ID = '_launcher';
/** @hidden */
const CONTENT_ID = '_content';
/** @hidden */
const CONTAINER_ID = '_container';
/** @hidden */
const OVERFLOW_ID = '_overflow';
/** @hidden */
const DROPDOWN_ID = '_dropdown';
/** @hidden */
const RIBBON_FILE_MENU_ID = '_filemenu';
/** @hidden */
const RIBBON_FILE_MENU_LIST = '_filemenulist';
/** @hidden */
const RIBBON_HELP_PANE_TEMPLATE_ID = '_helppanetemplate';
/** @hidden */
const RIBBON_FILE_MENU_WIDTH = '--fileMenuWidth';
/** @hidden */
const RIBBON_HELP_PANE_TEMPLATE_WIDTH = '--helpTemplateWidth';

/**
 * Defines the items of Ribbon.
 */
class RibbonButton {
    constructor(parent) {
        this.parent = parent;
    }
    getModuleName() {
        return 'ribbonButton';
    }
    destroy() {
        this.parent = null;
    }
    /**
     * Creates button.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @returns {void}
     * @hidden
     */
    createButton(item, itemEle) {
        const buttonEle = this.parent.createElement('button', {
            id: item.id
        });
        itemEle.appendChild(buttonEle);
        const btnSettings = item.buttonSettings;
        new Button({
            locale: this.parent.locale,
            enableRtl: this.parent.enableRtl,
            enablePersistence: this.parent.enablePersistence,
            iconPosition: item.activeSize === RibbonItemSize.Large ? 'Top' : 'Left',
            iconCss: btnSettings.iconCss,
            disabled: item.disabled,
            cssClass: (ITEM_VERTICAL_CENTER + SPACE + RIBBON_CONTROL + SPACE + (btnSettings.cssClass ? btnSettings.cssClass : '')).trim(),
            content: item.activeSize === RibbonItemSize.Small ? '' : btnSettings.content,
            isPrimary: btnSettings.isPrimary,
            isToggle: btnSettings.isToggle,
            created: btnSettings.created
        }, buttonEle);
        buttonEle.onclick = (e) => {
            if (btnSettings.clicked) {
                btnSettings.clicked.call(this, e);
            }
        };
        buttonEle.setAttribute('aria-label', btnSettings.content);
    }
    /**
     * Adds the additional event handlers as the item moved into overflow popup.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @param {DropDownButton} overflowButton - Gets the overflow button.
     * @returns {void}
     * @hidden
     */
    addOverFlowEvents(item, itemEle, overflowButton) {
        const buttonEle = itemEle.querySelector('#' + item.id);
        buttonEle.setAttribute('data-control', item.type.toString());
        const buttonObj = getComponent(buttonEle, Button);
        buttonObj.setProperties({ cssClass: buttonObj.cssClass + SPACE + RIBBON_POPUP_CONTROL });
        buttonEle.onclick = (e) => {
            if (item.buttonSettings.clicked) {
                item.buttonSettings.clicked.call(this, e);
            }
            overflowButton.toggle();
        };
    }
    /**
     * Removes the additional event handlers as the item moved from overflow popup.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @returns {void}
     * @hidden
     */
    removeOverFlowEvents(item, itemEle) {
        const buttonEle = itemEle.querySelector('#' + item.id);
        const buttonObj = getComponent(buttonEle, Button);
        let cssClass = buttonObj.cssClass.split(SPACE);
        cssClass = cssClass.filter((value) => value !== RIBBON_POPUP_CONTROL);
        buttonObj.setProperties({ cssClass: cssClass.join(SPACE) });
        buttonEle.onclick = (e) => {
            if (item.buttonSettings.clicked) {
                item.buttonSettings.clicked.call(this, e);
            }
        };
    }
    /**
     * Triggers the click action on the button.
     *
     * @param {string} controlId - Gets the control ID.
     * @returns {void}
     */
    click(controlId) {
        const buttonEle = getItemElement(this.parent, controlId);
        if (!buttonEle) {
            return;
        }
        const buttonObj = getComponent(buttonEle, Button);
        buttonObj.click();
    }
    /**
     * Updates the button properties.
     *
     * @param {RibbonButtonSettingsModel} prop - Gets the button property.
     * @param {string} id - Gets the ID of button item.
     * @returns {void}
     */
    updateButton(prop, id) {
        const itemProp = getItem(this.parent.tabs, id);
        if (!itemProp) {
            return;
        }
        merge(itemProp.item.buttonSettings, prop);
        const buttonEle = getItemElement(this.parent, id, itemProp);
        if (!buttonEle) {
            return;
        }
        const buttonObj = getComponent(buttonEle, Button);
        if (prop.cssClass) {
            prop.cssClass = (ITEM_VERTICAL_CENTER + SPACE + RIBBON_CONTROL + SPACE + prop.cssClass).trim();
        }
        if (prop.content) {
            prop.content = itemProp.item.activeSize === RibbonItemSize.Small ? '' : prop.content;
            buttonEle.setAttribute('aria-label', prop.content);
        }
        delete prop.clicked;
        buttonObj.setProperties(prop);
    }
    /**
     * Updates the button size.
     *
     * @param {HTMLElement} element - Gets the button element.
     * @param {RibbonItemModel} item - Gets the ribbon item.
     * @returns {void}
     * @hidden
     */
    updateButtonSize(element, item) {
        const buttonObj = getComponent(element, Button);
        buttonObj.setProperties({
            iconPosition: item.activeSize === RibbonItemSize.Large ? 'Top' : 'Left',
            content: item.activeSize === RibbonItemSize.Small ? '' : item.buttonSettings.content
        });
    }
}

/**
 * Defines the items of Ribbon.
 */
class RibbonCheckBox {
    constructor(parent) {
        this.parent = parent;
    }
    getModuleName() {
        return 'ribbonCheckBox';
    }
    destroy() {
        this.parent = null;
    }
    /**
     * Creates the check box.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @returns {void}
     * @hidden
     */
    createCheckBox(item, itemEle) {
        const inputEle = this.parent.createElement('input', {
            id: item.id
        });
        itemEle.appendChild(inputEle);
        const checkBoxSettings = item.checkBoxSettings;
        new CheckBox({
            locale: this.parent.locale,
            enableRtl: this.parent.enableRtl,
            enablePersistence: this.parent.enablePersistence,
            checked: checkBoxSettings.checked,
            cssClass: (RIBBON_CONTROL + SPACE + (checkBoxSettings.cssClass ? checkBoxSettings.cssClass : '')).trim(),
            label: checkBoxSettings.label,
            labelPosition: checkBoxSettings.labelPosition,
            disabled: item.disabled,
            created: checkBoxSettings.created,
            change: (e) => {
                if (checkBoxSettings.change) {
                    checkBoxSettings.change.call(this, e);
                }
            }
        }, inputEle);
    }
    /**
     * Adds the additional event handlers as the item moved into overflow popup.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @param {DropDownButton} overflowButton - Gets the overflow button.
     * @returns {void}
     * @hidden
     */
    addOverFlowEvents(item, itemEle, overflowButton) {
        const inputEle = itemEle.querySelector('#' + item.id);
        inputEle.setAttribute('data-control', item.type.toString());
        const checkBoxObj = getComponent(inputEle, CheckBox);
        checkBoxObj.cssClass = checkBoxObj.cssClass + SPACE + RIBBON_POPUP_CONTROL;
        checkBoxObj.dataBind();
        checkBoxObj.change = (e) => {
            if (item.checkBoxSettings.change) {
                item.checkBoxSettings.change.call(this, e);
            }
            overflowButton.toggle();
        };
    }
    /**
     * Removes the additional event handlers as the item moved from overflow popup.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @returns {void}
     * @hidden
     */
    removeOverFlowEvents(item, itemEle) {
        const inputEle = itemEle.querySelector('#' + item.id);
        const checkBoxObj = getComponent(inputEle, CheckBox);
        let cssClass = checkBoxObj.cssClass.split(SPACE);
        cssClass = cssClass.filter((value) => value !== RIBBON_POPUP_CONTROL);
        checkBoxObj.cssClass = cssClass.join(SPACE);
        checkBoxObj.dataBind();
        checkBoxObj.change = (e) => {
            if (item.checkBoxSettings.change) {
                item.checkBoxSettings.change.call(this, e);
            }
        };
    }
    /**
     * Triggers the click action on the Checkbox.
     *
     * @param {string} controlId - Gets the control ID.
     * @returns {void}
     */
    click(controlId) {
        const inputEle = getItemElement(this.parent, controlId);
        if (!inputEle) {
            return;
        }
        const checkBoxObj = getComponent(inputEle, CheckBox);
        checkBoxObj.click();
    }
    /**
     * Updates the checkbox.
     *
     * @param {RibbonCheckBoxSettingsModel} prop - Gets the checkbox property.
     * @param {string} id - Gets the ID of checkbox.
     * @returns {void}
     */
    updateCheckBox(prop, id) {
        const itemProp = getItem(this.parent.tabs, id);
        if (!itemProp) {
            return;
        }
        merge(itemProp.item.checkBoxSettings, prop);
        const inputEle = getItemElement(this.parent, id, itemProp);
        if (!inputEle) {
            return;
        }
        if (prop.cssClass) {
            prop.cssClass = (RIBBON_CONTROL + SPACE + prop.cssClass).trim();
        }
        delete prop.change;
        const checkBoxObj = getComponent(inputEle, CheckBox);
        checkBoxObj.setProperties(prop);
    }
}

/**
 * Defines the items of Ribbon.
 */
class RibbonColorPicker {
    constructor(parent) {
        this.parent = parent;
    }
    getModuleName() {
        return 'ribbonColorPicker';
    }
    destroy() {
        this.parent = null;
    }
    /**
     * Creates the colorpicker.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @returns {void}
     * @hidden
     */
    createColorPicker(item, itemEle) {
        const inputEle = this.parent.createElement('input', {
            id: item.id
        });
        itemEle.appendChild(inputEle);
        const colorPickerSettings = item.colorPickerSettings;
        const colorPicker = new ColorPicker({
            locale: this.parent.locale,
            enableRtl: this.parent.enableRtl,
            enablePersistence: this.parent.enablePersistence,
            columns: colorPickerSettings.columns,
            cssClass: (RIBBON_CONTROL + SPACE + (colorPickerSettings.cssClass ? colorPickerSettings.cssClass : '')).trim(),
            disabled: item.disabled,
            enableOpacity: colorPickerSettings.enableOpacity,
            mode: colorPickerSettings.mode,
            modeSwitcher: colorPickerSettings.modeSwitcher,
            noColor: colorPickerSettings.noColor,
            presetColors: colorPickerSettings.presetColors,
            showButtons: colorPickerSettings.showButtons,
            value: colorPickerSettings.value,
            beforeClose: () => {
                colorPicker.element.parentElement.classList.remove(RIBBON_POPUP_OPEN);
                if (colorPickerSettings.beforeClose) {
                    colorPickerSettings.beforeClose.call(this);
                }
            },
            beforeOpen: colorPickerSettings.beforeOpen,
            beforeTileRender: colorPickerSettings.beforeTileRender,
            created: colorPickerSettings.created,
            change: colorPickerSettings.change,
            open: () => {
                colorPicker.element.parentElement.classList.add(RIBBON_POPUP_OPEN);
                if (colorPickerSettings.open) {
                    colorPickerSettings.open.call(this);
                }
            },
            select: colorPickerSettings.select
        }, inputEle);
        const wrapper = colorPicker.element.parentElement;
        EventHandler.add(wrapper, 'mouseenter', this.toggleWrapperHover.bind(this, wrapper, true), this);
        EventHandler.add(wrapper, 'mouseleave', this.toggleWrapperHover.bind(this, wrapper, false), this);
    }
    toggleWrapperHover(wrapper, isAdd) {
        if (isAdd) {
            wrapper.classList.add(RIBBON_HOVER);
        }
        else {
            wrapper.classList.remove(RIBBON_HOVER);
        }
    }
    /**
     * Adds the additional event handlers as the item moved into overflow popup.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @param {DropDownButton} overflowButton - Gets the overflow button.
     * @returns {void}
     * @hidden
     */
    addOverFlowEvents(item, itemEle, overflowButton) {
        const colorPickerEle = itemEle.querySelector('#' + item.id);
        colorPickerEle.setAttribute('data-control', item.type.toString());
        const colorPickerObj = getComponent(colorPickerEle, ColorPicker);
        colorPickerObj.setProperties({ cssClass: colorPickerObj.cssClass + SPACE + RIBBON_POPUP_CONTROL });
        //Accessing the private property 'splitBtn' of ColorPicker component to get the colorpicker instance as there is no close event in colorpicker.
        const splitBtn = colorPickerObj['splitBtn'];
        let target;
        colorPickerObj.beforeClose = (e) => {
            target = e.event ? e.event.target : null;
            colorPickerObj.element.parentElement.classList.remove(RIBBON_POPUP_OPEN);
            if (item.colorPickerSettings.beforeClose) {
                item.colorPickerSettings.beforeClose.call(this);
            }
        };
        splitBtn.close = () => {
            if (target && !target.closest('.e-ribbon-group-overflow-ddb')) {
                overflowButton.toggle();
            }
        };
    }
    /**
     * Removes the additional event handlers as the item moved from overflow popup.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @returns {void}
     * @hidden
     */
    removeOverFlowEvents(item, itemEle) {
        const colorPickerEle = itemEle.querySelector('#' + item.id);
        const colorPickerObj = getComponent(colorPickerEle, ColorPicker);
        let cssClass = colorPickerObj.cssClass.split(SPACE);
        cssClass = cssClass.filter((value) => value !== RIBBON_POPUP_CONTROL);
        colorPickerObj.setProperties({ cssClass: cssClass.join(SPACE) });
        const splitBtn = colorPickerObj['splitBtn'];
        //Accessing the private property 'splitBtn' of ColorPicker component to get the colorpicker instance as there is no close event in colorpicker.
        splitBtn.close = null;
        colorPickerObj.beforeClose = (e) => {
            colorPickerObj.element.parentElement.classList.remove(RIBBON_POPUP_OPEN);
            if (item.colorPickerSettings.beforeClose) {
                item.colorPickerSettings.beforeClose.call(this);
            }
        };
    }
    getColorPickerObj(controlId) {
        const inputEle = getItemElement(this.parent, controlId);
        return inputEle ? getComponent(inputEle, ColorPicker) : null;
    }
    /**
     * Gets color value in specified type.
     *
     * @param {string} controlId -Gets the control ID.
     * @param {string} value - Specify the color value.
     * @param {string} type - Specify the type to which the specified color needs to be converted.
     * @returns {string} - Returns string.
     */
    getValue(controlId, value, type) {
        const colorPickerObj = this.getColorPickerObj(controlId);
        return colorPickerObj ? colorPickerObj.getValue(value, type) : '';
    }
    /**
     * To show/hide ColorPicker popup based on current state of the SplitButton.
     *
     * @param {string} controlId - set the id of the control.
     * @returns {void} - Returns void.
     */
    toggle(controlId) {
        const colorPickerObj = this.getColorPickerObj(controlId);
        if (!colorPickerObj) {
            return;
        }
        colorPickerObj.toggle();
    }
    /**
     * Updates the colorpicker properties.
     *
     * @param {RibbonColorPickerSettingsModel} prop - Gets the colorpicker property.
     * @param {string} id - Gets the ID of colorpicker.
     * @returns {void}
     */
    updateColorPicker(prop, id) {
        const itemProp = getItem(this.parent.tabs, id);
        if (!itemProp) {
            return;
        }
        merge(itemProp.item.checkBoxSettings, prop);
        const inputEle = getItemElement(this.parent, id, itemProp);
        if (!inputEle) {
            return;
        }
        if (prop.cssClass) {
            prop.cssClass = (RIBBON_CONTROL + SPACE + prop.cssClass).trim();
        }
        delete prop.beforeClose;
        delete prop.open;
        const colorPickerObj = getComponent(inputEle, ColorPicker);
        colorPickerObj.setProperties(prop);
    }
    /**
     * @param {HTMLElement} element - Gets the colorpicker element to be destroyed.
     * @returns {void}
     * @hidden
     */
    unwireColorPickerEvents(element) {
        const colorPickerObj = getComponent(element, ColorPicker);
        const wrapper = colorPickerObj.element.parentElement;
        EventHandler.remove(wrapper, 'mouseenter', this.toggleWrapperHover);
        EventHandler.remove(wrapper, 'mouseleave', this.toggleWrapperHover);
    }
}

/**
 * Defines the items of Ribbon.
 */
class RibbonComboBox {
    constructor(parent) {
        this.parent = parent;
    }
    getModuleName() {
        return 'ribbonComboBox';
    }
    destroy() {
        this.parent = null;
    }
    /**
     * Creates the combobox.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @returns {void}
     * @hidden
     */
    createComboBox(item, itemEle) {
        const inputEle = this.parent.createElement('input', {
            id: item.id
        });
        itemEle.appendChild(inputEle);
        const comboBoxSettings = item.comboBoxSettings;
        new ComboBox({
            locale: this.parent.locale,
            enableRtl: this.parent.enableRtl,
            enablePersistence: this.parent.enablePersistence,
            allowCustom: false,
            floatLabelType: 'Never',
            ignoreAccent: true,
            ignoreCase: true,
            allowFiltering: comboBoxSettings.allowFiltering,
            autofill: comboBoxSettings.autofill,
            cssClass: (RIBBON_CONTROL + SPACE + (comboBoxSettings.cssClass ? comboBoxSettings.cssClass : '')).trim(),
            dataSource: comboBoxSettings.dataSource,
            enabled: !item.disabled,
            fields: comboBoxSettings.fields,
            filterType: comboBoxSettings.filterType,
            footerTemplate: comboBoxSettings.footerTemplate,
            groupTemplate: comboBoxSettings.groupTemplate,
            headerTemplate: comboBoxSettings.headerTemplate,
            index: comboBoxSettings.index,
            itemTemplate: comboBoxSettings.itemTemplate,
            noRecordsTemplate: comboBoxSettings.noRecordsTemplate,
            placeholder: comboBoxSettings.placeholder,
            popupHeight: comboBoxSettings.popupHeight,
            popupWidth: comboBoxSettings.popupWidth,
            showClearButton: comboBoxSettings.showClearButton,
            sortOrder: comboBoxSettings.sortOrder,
            text: comboBoxSettings.text,
            value: comboBoxSettings.value,
            width: comboBoxSettings.width,
            beforeOpen: comboBoxSettings.beforeOpen,
            open: comboBoxSettings.open,
            close: (e) => {
                if (comboBoxSettings.close) {
                    comboBoxSettings.close.call(this, e);
                }
            },
            filtering: comboBoxSettings.filtering,
            change: comboBoxSettings.change,
            select: comboBoxSettings.select,
            created: comboBoxSettings.created
        }, inputEle);
    }
    /**
     * Adds the additional event handlers as the item moved into overflow popup.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @param {DropDownButton} overflowButton - Gets the overflow button.
     * @returns {void}
     * @hidden
     */
    addOverFlowEvents(item, itemEle, overflowButton) {
        const inputEle = itemEle.querySelector('#' + item.id);
        inputEle.setAttribute('data-control', item.type.toString());
        const comboBoxObj = getComponent(inputEle, ComboBox);
        comboBoxObj.setProperties({ cssClass: comboBoxObj.cssClass + SPACE + RIBBON_POPUP_CONTROL });
        comboBoxObj.close = (e) => {
            const target = e.event ? e.event.target : null;
            if (item.comboBoxSettings.close) {
                item.comboBoxSettings.close.call(this, e);
            }
            if (target && !target.closest('.e-ribbon-group-overflow-ddb')) {
                overflowButton.toggle();
            }
        };
    }
    /**
     * Removes the additional event handlers as the item moved from overflow popup.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @returns {void}
     * @hidden
     */
    removeOverFlowEvents(item, itemEle) {
        const inputEle = itemEle.querySelector('#' + item.id);
        const comboBoxObj = getComponent(inputEle, ComboBox);
        let cssClass = comboBoxObj.cssClass.split(SPACE);
        cssClass = cssClass.filter((value) => value !== RIBBON_POPUP_CONTROL);
        comboBoxObj.setProperties({ cssClass: cssClass.join(SPACE) });
        comboBoxObj.close = (e) => {
            if (item.comboBoxSettings.close) {
                item.comboBoxSettings.close.call(this, e);
            }
        };
    }
    getComboBoxObj(controlId) {
        const inputEle = getItemElement(this.parent, controlId);
        return inputEle ? getComponent(inputEle, ComboBox) : null;
    }
    /**
     * To filter the data from given data source by using query
     *
     * @param  {string } controlId - set the id of the control in which methods needs to be called.
     * @param  {Object[] } dataSource - Set the data source to filter.
     * @param  {Query} query - Specify the query to filter the data.
     * @param  {FieldSettingsModel} fields - Specify the fields to map the column in the data table.
     * @returns {void}
     */
    filter(controlId, dataSource, query, fields) {
        this.getComboBoxObj(controlId).filter(dataSource, query, fields);
    }
    /**
     * To open/close DropDownButton popup based on current state of the combobox.
     *
     * @param {string} controlId - Gets the id of the control.
     * @returns {void}
     */
    hidePopup(controlId) {
        const comboBoxObj = this.getComboBoxObj(controlId);
        if (!comboBoxObj) {
            return;
        }
        comboBoxObj.hidePopup();
    }
    /**
     * To open/close DropDownButton popup based on current state of the combobox.
     *
     * @param {string} controlId - Gets the id of the control.
     * @returns {void}
     */
    showPopup(controlId) {
        const comboBoxObj = this.getComboBoxObj(controlId);
        if (!comboBoxObj) {
            return;
        }
        comboBoxObj.showPopup();
    }
    /**
     * Updates the combobox properties.
     *
     * @param {RibbonComboBoxSettingsModel} prop - Gets the combobox property.
     * @param {string} id - Gets the ID of combobox.
     * @returns {void}
     */
    updateComboBox(prop, id) {
        const itemProp = getItem(this.parent.tabs, id);
        if (!itemProp) {
            return;
        }
        merge(itemProp.item.comboBoxSettings, prop);
        const inputEle = getItemElement(this.parent, id, itemProp);
        if (!inputEle) {
            return;
        }
        if (prop.cssClass) {
            prop.cssClass = (RIBBON_CONTROL + SPACE + prop.cssClass).trim();
        }
        delete prop.close;
        const comboBoxObj = getComponent(inputEle, ComboBox);
        comboBoxObj.setProperties(prop);
    }
}

/**
 * Defines the items of Ribbon.
 */
class RibbonDropDown {
    constructor(parent) {
        this.parent = parent;
    }
    getModuleName() {
        return 'ribbonDropDown';
    }
    destroy() {
        this.parent = null;
    }
    /**
     * Creates DropDown.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @returns {void}
     * @hidden
     */
    createDropDown(item, itemEle) {
        const buttonEle = this.parent.createElement('button', {
            id: item.id
        });
        itemEle.appendChild(buttonEle);
        const dropDownSettings = item.dropDownSettings;
        const cssClass = (ITEM_VERTICAL_CENTER + SPACE + RIBBON_CONTROL + SPACE + (dropDownSettings.cssClass ?
            dropDownSettings.cssClass : '')).trim();
        new DropDownButton({
            locale: this.parent.locale,
            enableRtl: this.parent.enableRtl,
            enablePersistence: this.parent.enablePersistence,
            iconPosition: item.activeSize === RibbonItemSize.Large ? 'Top' : 'Left',
            closeActionEvents: dropDownSettings.closeActionEvents,
            content: item.activeSize === RibbonItemSize.Small ? '' : dropDownSettings.content,
            cssClass: cssClass + ((item.activeSize === RibbonItemSize.Large) ? (SPACE + VERTICAL_DDB) : ''),
            disabled: item.disabled,
            iconCss: dropDownSettings.iconCss,
            items: dropDownSettings.items,
            target: dropDownSettings.target,
            beforeClose: (e) => {
                if (dropDownSettings.beforeClose) {
                    dropDownSettings.beforeClose.call(this, e);
                }
            },
            beforeItemRender: dropDownSettings.beforeItemRender,
            beforeOpen: dropDownSettings.beforeOpen,
            close: (e) => {
                if (dropDownSettings.close) {
                    dropDownSettings.close.call(this, e);
                }
            },
            created: dropDownSettings.created,
            open: dropDownSettings.open,
            select: dropDownSettings.select
        }, buttonEle);
    }
    /**
     * Adds the additional event handlers as the item moved into overflow popup.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @param {DropDownButton} overflowButton - Gets the overflow button.
     * @returns {void}
     * @hidden
     */
    addOverFlowEvents(item, itemEle, overflowButton) {
        const dropdownElement = itemEle.querySelector('#' + item.id);
        dropdownElement.setAttribute('data-control', item.type.toString());
        const dropdown = getComponent(dropdownElement, DropDownButton);
        dropdown.cssClass = dropdown.cssClass + SPACE + RIBBON_POPUP_CONTROL;
        dropdown.dataBind();
        let target;
        dropdown.beforeClose = (e) => {
            if (item.dropDownSettings.beforeClose) {
                item.dropDownSettings.beforeClose.call(this, e);
            }
            target = e.event ? e.event.target : null;
        };
        dropdown.close = (e) => {
            if (item.dropDownSettings.close) {
                item.dropDownSettings.close.call(this, e);
            }
            if (target && !target.closest('.e-ribbon-group-overflow-ddb')) {
                overflowButton.toggle();
            }
        };
    }
    /**
     * Removes the additional event handlers as the item moved from overflow popup.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @returns {void}
     * @hidden
     */
    removeOverFlowEvents(item, itemEle) {
        const dropdownElement = itemEle.querySelector('#' + item.id);
        const dropdown = getComponent(dropdownElement, DropDownButton);
        let cssClass = dropdown.cssClass.split(SPACE);
        cssClass = cssClass.filter((value) => value !== RIBBON_POPUP_CONTROL);
        dropdown.cssClass = cssClass.join(SPACE);
        dropdown.dataBind();
        dropdown.close = (e) => {
            if (item.dropDownSettings.close) {
                item.dropDownSettings.close.call(this, e);
            }
        };
        dropdown.beforeClose = (e) => {
            if (item.dropDownSettings.beforeClose) {
                item.dropDownSettings.beforeClose.call(this, e);
            }
        };
    }
    /**
     * Creates Overflow DropDown.
     *
     * @param {string} id - Gets the ID of the dropdown item.
     * @param {string} name - Gets the name of the dropdown item.
     * @param {string} iconCss - Gets the icon of the dropdown item.
     * @param {HTMLElement} groupEle - Gets the overflow group element.
     * @param {HTMLElement} overflowEle - Gets the overflow element.
     * @returns {void}
     * @hidden
     */
    createOverFlowDropDown(id, name, iconCss, groupEle, overflowEle, enableRtl) {
        this.enableRtl = enableRtl;
        const buttonEle = this.parent.createElement('button', {
            id: id + OVERFLOW_ID + DROPDOWN_ID
        });
        groupEle.setAttribute('tabindex', '0');
        overflowEle.appendChild(buttonEle);
        const dropdown = new DropDownButton({
            iconCss: iconCss,
            target: groupEle,
            locale: this.parent.locale,
            enableRtl: this.parent.enableRtl,
            enablePersistence: this.parent.enablePersistence,
            cssClass: VERTICAL_DDB + SPACE + RIBBON_GROUP_OVERFLOW_DDB,
            iconPosition: 'Top',
            content: name,
            beforeClose: (args) => {
                args.cancel = !isNullOrUndefined(args.event && closest(args.event.target, '.' + RIBBON_POPUP_CONTROL));
            }
        }, buttonEle);
        createTooltip(groupEle, this.parent);
        buttonEle.onclick = buttonEle.onkeydown = () => { this.itemIndex = 0; };
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        groupEle.onkeydown = (e) => { this.keyActionHandler(e, groupEle), this; };
        return dropdown;
    }
    keyActionHandler(e, target) {
        const items = target.querySelectorAll('.e-control');
        const comboBoxElements = target.querySelectorAll('.e-combobox');
        let comboBoxEle;
        if (comboBoxElements) {
            for (let i = 0; i < comboBoxElements.length; i++) {
                if (comboBoxElements[parseInt(i.toString(), 10)].closest('.e-input-focus')) {
                    comboBoxEle = comboBoxElements[parseInt(i.toString(), 10)];
                }
            }
        }
        if (comboBoxEle) {
            for (let i = 0; i < items.length; i++) {
                if (items[parseInt(i.toString(), 10)].classList.contains('e-combobox')) {
                    if (items[parseInt(i.toString(), 10)].closest('.e-input-focus')) {
                        this.itemIndex = i;
                    }
                }
            }
        }
        if (e.target.classList.contains('e-control') || e.target.classList.contains('e-ribbon-launcher-icon') ||
            e.target.classList.contains('e-ribbon-last-item') || e.target.classList.contains('e-ribbon-first-item')) {
            if (e.key === 'ArrowRight' || (!e.shiftKey && e.key === 'Tab')) {
                this.handleNavigation(e, !this.enableRtl, items);
            }
            if (e.key === 'ArrowLeft' || (e.shiftKey && e.key === 'Tab')) {
                this.handleNavigation(e, this.enableRtl, items);
            }
        }
    }
    handleNavigation(e, enableRtl, items) {
        if (!(items[0].classList.contains('e-ribbon-first-item'))) {
            items[0].classList.add('e-ribbon-first-item');
        }
        if (!(items[items.length - 1].classList.contains('e-ribbon-last-item'))) {
            items[items.length - 1].classList.add('e-ribbon-last-item');
        }
        if (enableRtl) {
            if (this.itemIndex === 0 && items[parseInt(this.itemIndex.toString(), 10)].classList.contains('e-ribbon-first-item')) {
                this.updateItemIndex(e, items, true);
            }
            if (!e.target.classList.contains('e-combobox') && !e.target.classList.contains('e-ribbon-last-item') &&
                !e.target.classList.contains('e-ribbon-group-container') && (e.target.classList.contains('e-ribbon-first-item')
                || this.itemIndex !== 0) && e.target.classList.contains('e-control')) {
                this.itemIndex++;
                this.updateItemIndex(e, items, true);
            }
            if (e.target.classList.contains('e-ribbon-last-item')) {
                let launcherIcon = false;
                launcherIcon = this.focusLauncherIcon(e, items);
                if (!launcherIcon) {
                    this.itemIndex = 0;
                    this.updateItemIndex(e, items, true);
                }
            }
            if (e.target.classList.contains('e-ribbon-launcher-icon')) {
                this.itemIndex = 0;
                this.updateItemIndex(e, items, true);
            }
        }
        else {
            if (!e.target.classList.contains('e-combobox') && this.itemIndex !== 0) {
                this.itemIndex--;
                this.updateItemIndex(e, items, false);
            }
            if (e.target.classList.contains('e-ribbon-first-item')) {
                let launcherIcon = false;
                launcherIcon = this.focusLauncherIcon(e, items);
                if (!launcherIcon) {
                    this.itemIndex = items.length - 1;
                    this.updateItemIndex(e, items, false);
                }
            }
            if (e.target.classList.contains('e-ribbon-launcher-icon')) {
                this.itemIndex = items.length - 1;
                this.updateItemIndex(e, items, false);
            }
        }
        if (e.target.classList.contains('e-combobox') && (e.key === 'Tab')) {
            if (enableRtl) {
                if (this.itemIndex < items.length - 1) {
                    this.itemIndex++;
                }
            }
            else {
                if (this.itemIndex > 0) {
                    this.itemIndex--;
                }
            }
        }
    }
    focusLauncherIcon(e, items) {
        const groupContainer = items[parseInt(this.itemIndex.toString(), 10)].closest('.e-ribbon-group-container');
        let launcherIconEle;
        if (groupContainer) {
            launcherIconEle = groupContainer.querySelector('.e-ribbon-launcher-icon');
        }
        if (launcherIconEle) {
            if (e.key === 'Tab') {
                e.preventDefault();
            }
            groupContainer.querySelector('.e-ribbon-launcher-icon').focus();
            return true;
        }
        else {
            return false;
        }
    }
    updateItemIndex(e, items, enableRtl) {
        let ribbonItem = items[this.itemIndex].closest('.e-ribbon-item');
        while (ribbonItem && ribbonItem.classList.contains('e-disabled')) {
            if (enableRtl) {
                if (this.itemIndex < items.length - 1) {
                    this.itemIndex++;
                }
                else {
                    let launcherIcon = false;
                    launcherIcon = this.focusLauncherIcon(e, items);
                    if (launcherIcon) {
                        break;
                    }
                    this.itemIndex = 0;
                }
            }
            else {
                if (this.itemIndex > 0) {
                    this.itemIndex--;
                }
                else {
                    let launcherIcon = false;
                    launcherIcon = this.focusLauncherIcon(e, items);
                    if (launcherIcon) {
                        break;
                    }
                    this.itemIndex = items.length - 1;
                }
            }
            ribbonItem = items[this.itemIndex].closest('.e-ribbon-item');
        }
        if (e.key === 'Tab') {
            e.preventDefault();
        }
        items[parseInt(this.itemIndex.toString(), 10)].focus();
    }
    /**
     * Removes Overflow DropDown.
     *
     * @param {HTMLElement} dropdownElement - Gets the ribbon DropDown element.
     * @returns {void}
     * @hidden
     */
    removeOverFlowDropDown(dropdownElement) {
        const dropdown = getComponent(dropdownElement, DropDownButton);
        const tooltip = getComponent(dropdown.target, Tooltip);
        tooltip.destroy();
        dropdownElement.parentElement.parentElement.insertBefore(dropdown.target, dropdownElement.parentElement);
        dropdown.destroy();
        remove(dropdownElement);
    }
    /**
     * Gets DropDown item element.
     *
     * @param {HTMLElement} dropdownElement - Gets the ribbon DropDown element.
     * @param {string} id - Gets the ID of ribbon DropDown element.
     * @returns {HTMLElement} - Returns the DropDown item element.
     * @hidden
     */
    getDDBItemElement(dropdownElement, id) {
        const dropdown = getComponent(dropdownElement, DropDownButton);
        const dropDownPopup = dropdown.dropDown.element;
        return dropDownPopup.querySelector('#' + id);
    }
    /**
     * Gets Overflow DropDown Popup.
     *
     * @param {itemProps} itemProp - Gets the property of ribbon item.
     * @param {HTMLElement} contentEle - Gets the content element.
     * @returns {HTMLElement} - Returns the Overflow DropDown Popup.
     * @hidden
     */
    getOverflowDropDownPopup(itemProp, contentEle) {
        const dropdownElement = contentEle.querySelector('#' + this.parent.tabs[itemProp.tabIndex].groups[itemProp.groupIndex].id + OVERFLOW_ID + DROPDOWN_ID);
        const dropdown = getComponent(dropdownElement, DropDownButton);
        return dropdown.dropDown.element;
    }
    getDropDownObj(controlId) {
        const dropDownEle = getItemElement(this.parent, controlId);
        return dropDownEle ? getComponent(dropDownEle, DropDownButton) : null;
    }
    /**
     * Adds a new item to the menu. By default, new item appends to
     * the list as the last item, but you can insert based on the text parameter.
     *
     * @param {string} controlId - Gets the control ID.
     * @param {ItemModel[]} Items - Gets the DropDown items.
     * @param {string} text - Gets the text of the dropdown item where the new item needs to be inserted.
     * @returns {void}
     */
    addItems(controlId, Items, text) {
        this.getDropDownObj(controlId).addItems(Items, text);
    }
    /**
     * Removes the items from the menu.
     *
     * @param {string} controlId - Gets the control ID.
     * @param {string[]} Items -
     * @param {string} isUniqueId -
     * @returns {void}
     */
    removeItems(controlId, Items, isUniqueId) {
        this.getDropDownObj(controlId).removeItems(Items, isUniqueId);
    }
    /**
     * To open/close DropDownButton popup based on current state of the DropDownButton.
     *
     * @param {string} controlId - Gets the control ID.
     * @returns {void}
     */
    toggle(controlId) {
        this.getDropDownObj(controlId).toggle();
    }
    /**
     * Updates the dropdown.
     *
     * @param {RibbonDropDownSettingsModel} prop - Gets the dropdown property.
     * @param {string} id - Gets the ID of dropdown.
     * @returns {void}
     */
    updateDropDown(prop, id) {
        const itemProp = getItem(this.parent.tabs, id);
        if (!itemProp) {
            return;
        }
        merge(itemProp.item.dropDownSettings, prop);
        const btnEle = getItemElement(this.parent, id, itemProp);
        if (!btnEle) {
            return;
        }
        const control = getComponent(btnEle, DropDownButton);
        if (prop.cssClass) {
            prop.cssClass = (RIBBON_CONTROL + SPACE + ITEM_VERTICAL_CENTER + SPACE + prop.cssClass).trim();
            prop.cssClass = itemProp.item.activeSize === RibbonItemSize.Large ?
                (VERTICAL_DDB + SPACE + prop.cssClass).trim() : prop.cssClass;
            control.cssClass = prop.cssClass;
        }
        delete prop.close;
        delete prop.beforeClose;
        if (prop.content) {
            prop.content = itemProp.item.activeSize === RibbonItemSize.Small ? '' : prop.content;
        }
        control.setProperties(prop);
    }
    /**
     * Updated DropDown size
     *
     * @param {HTMLElement} element - Gets the dropdown element.
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @returns {void}
     * @hidden
     */
    updateDropDownSize(element, item) {
        const control = getComponent(element, DropDownButton);
        let cssClass = control.cssClass.split(SPACE);
        if (item.activeSize === RibbonItemSize.Large) {
            cssClass.push(VERTICAL_DDB);
        }
        else {
            cssClass = cssClass.filter((value) => value !== VERTICAL_DDB);
        }
        control.cssClass = cssClass.join(SPACE);
        control.setProperties({ iconPosition: item.activeSize === RibbonItemSize.Large ? 'Top' : 'Left' });
        control.setProperties({ content: item.activeSize === RibbonItemSize.Small ? '' : item.dropDownSettings.content });
    }
}

/**
 * Defines the items of Ribbon.
 */
class RibbonSplitButton {
    constructor(parent) {
        this.parent = parent;
    }
    getModuleName() {
        return 'ribbonSplitButton';
    }
    destroy() {
        this.parent = null;
    }
    /**
     * Creates SplitButton.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @returns {void}
     * @hidden
     */
    createSplitButton(item, itemEle) {
        const buttonEle = this.parent.createElement('button', {
            id: item.id
        });
        itemEle.appendChild(buttonEle);
        const splitButtonSettings = item.splitButtonSettings;
        const cssClass = (ITEM_VERTICAL_CENTER + SPACE + RIBBON_CONTROL + SPACE + (splitButtonSettings.cssClass ?
            splitButtonSettings.cssClass : '')).trim();
        const splitbutton = new SplitButton({
            locale: this.parent.locale,
            enableRtl: this.parent.enableRtl,
            enablePersistence: this.parent.enablePersistence,
            iconPosition: item.activeSize === RibbonItemSize.Large ? 'Top' : 'Left',
            closeActionEvents: splitButtonSettings.closeActionEvents,
            cssClass: cssClass + ((item.activeSize === RibbonItemSize.Large) ? (SPACE + VERTICAL_DDB) : ''),
            disabled: item.disabled,
            iconCss: splitButtonSettings.iconCss,
            items: splitButtonSettings.items,
            target: splitButtonSettings.target,
            beforeClose: (e) => {
                if (splitButtonSettings.beforeClose) {
                    splitButtonSettings.beforeClose.call(this, e);
                }
            },
            beforeItemRender: splitButtonSettings.beforeItemRender,
            beforeOpen: splitButtonSettings.beforeOpen,
            close: () => {
                splitbutton['wrapper'].classList.remove(RIBBON_POPUP_OPEN);
                if (splitButtonSettings.close) {
                    splitButtonSettings.close.call(this);
                }
            },
            created: splitButtonSettings.created,
            open: () => {
                splitbutton['wrapper'].classList.add(RIBBON_POPUP_OPEN);
                if (splitButtonSettings.open) {
                    splitButtonSettings.open.call(this);
                }
            },
            select: splitButtonSettings.select,
            click: (e) => {
                if (splitButtonSettings.click) {
                    splitButtonSettings.click.call(this, e);
                }
            }
        }, buttonEle);
        const dropdownEle = buttonEle.parentElement.querySelector('.e-dropdown-btn');
        dropdownEle.onkeydown = (e) => {
            if (e.key === 'Enter') {
                e.stopImmediatePropagation();
                dropdownEle.click();
            }
        };
        this.setContent(item, splitbutton);
        const wrapper = splitbutton['wrapper'];
        EventHandler.add(wrapper, 'mouseenter', () => { wrapper.classList.add(RIBBON_HOVER); }, this);
        EventHandler.add(wrapper, 'mouseleave', () => { wrapper.classList.remove(RIBBON_HOVER); }, this);
    }
    /**
     * Adds the additional event handlers as the item moved into overflow popup.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @param {DropDownButton} overflowButton - Gets the overflow button.
     * @returns {void}
     * @hidden
     */
    addOverFlowEvents(item, itemEle, overflowButton) {
        const splitButtonEle = itemEle.querySelector('#' + item.id);
        splitButtonEle.setAttribute('data-control', item.type.toString());
        const splitbutton = getComponent(splitButtonEle, SplitButton);
        splitbutton.cssClass = splitbutton.cssClass + SPACE + RIBBON_POPUP_CONTROL;
        splitbutton.dataBind();
        const dropdownEle = splitButtonEle.parentElement.querySelector('.e-dropdown-btn');
        const ddbId = dropdownEle.getAttribute('id');
        const popupEle = document.querySelector('#' + ddbId + '-popup');
        dropdownEle.onkeydown = (e) => {
            if (e.key === 'Enter') {
                e.stopImmediatePropagation();
                dropdownEle.click();
            }
        };
        popupEle.onkeydown = (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                splitbutton['wrapper'].classList.remove('e-ribbon-open');
                popupEle.querySelector('.e-focused').click();
            }
        };
        let target;
        splitbutton.beforeClose = (e) => {
            if (item.splitButtonSettings.beforeClose) {
                item.splitButtonSettings.beforeClose.call(this, e);
            }
            target = e.event ? e.event.target : null;
        };
        splitbutton.click = (e) => {
            if (item.splitButtonSettings.click) {
                item.splitButtonSettings.click.call(this, e);
            }
            overflowButton.toggle();
        };
        splitbutton.close = (e) => {
            if (item.splitButtonSettings.close) {
                item.splitButtonSettings.close.call(this, e);
            }
            splitbutton['wrapper'].classList.remove(RIBBON_POPUP_OPEN);
            if (target && !target.closest('.e-ribbon-group-overflow-ddb')) {
                overflowButton.toggle();
            }
        };
    }
    /**
     * Removes the additional event handlers as the item moved from overflow popup.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @returns {void}
     * @hidden
     */
    removeOverFlowEvents(item, itemEle) {
        const splitButtonEle = itemEle.querySelector('#' + item.id);
        const splitbutton = getComponent(splitButtonEle, SplitButton);
        let cssClass = splitbutton.cssClass.split(SPACE);
        cssClass = cssClass.filter((value) => value !== RIBBON_POPUP_CONTROL);
        splitbutton.cssClass = cssClass.join(SPACE);
        splitbutton.dataBind();
        splitbutton.beforeClose = (e) => {
            if (item.splitButtonSettings.beforeClose) {
                item.splitButtonSettings.beforeClose.call(this, e);
            }
        };
        splitbutton.click = (e) => {
            if (item.splitButtonSettings.click) {
                item.splitButtonSettings.click.call(this, e);
            }
        };
        splitbutton.close = (e) => {
            if (item.splitButtonSettings.close) {
                item.splitButtonSettings.close.call(this, e);
            }
            splitbutton['wrapper'].classList.remove(RIBBON_POPUP_OPEN);
        };
    }
    setContent(item, control) {
        control['primaryBtnObj'].setProperties({ content: (item.activeSize === RibbonItemSize.Medium) ? item.splitButtonSettings.content : '' });
        control['secondaryBtnObj'].setProperties({ content: (item.activeSize === RibbonItemSize.Large) ? item.splitButtonSettings.content : '' });
    }
    getSplitButtonObj(controlId) {
        const splitButtonEle = getItemElement(this.parent, controlId);
        return getComponent(splitButtonEle, SplitButton);
    }
    /**
     * Adds a new item to the menu. By default, new item appends to
     * the list as the last item, but you can insert based on the text parameter.
     *
     * @param {string} controlId - Gets the control ID.
     * @param {ItemModel[]} Items - Gets the SplitButton items.
     * @param {string} text - Gets the text of the splitbutton item where the new item needs to be inserted.
     * @returns {void}
     */
    addItems(controlId, Items, text) {
        this.getSplitButtonObj(controlId).addItems(Items, text);
    }
    /**
     * Removes the items from the menu.
     *
     * @param {string} controlId - Gets the control ID.
     * @param {string[]} Items -
     * @param {string} isUniqueId -
     * @returns {void}
     */
    removeItems(controlId, Items, isUniqueId) {
        this.getSplitButtonObj(controlId).removeItems(Items, isUniqueId);
    }
    /**
     * To open/close SplitButton popup based on current state of the SplitButton.
     *
     * @param {string} controlId - Gets the control ID.
     * @returns {void}
     */
    toggle(controlId) {
        this.getSplitButtonObj(controlId).toggle();
    }
    /**
     * Updates the splitbutton.
     *
     * @param {RibbonSplitButtonSettingsModel} prop - Gets the splitbutton property.
     * @param {string} id - Gets the ID of dropdown.
     * @returns {void}
     */
    updateSplitButton(prop, id) {
        const itemProp = getItem(this.parent.tabs, id);
        if (!itemProp) {
            return;
        }
        merge(itemProp.item.splitButtonSettings, prop);
        const btnEle = getItemElement(this.parent, id, itemProp);
        if (!btnEle) {
            return;
        }
        const control = getComponent(btnEle, SplitButton);
        if (prop.cssClass) {
            prop.cssClass = (RIBBON_CONTROL + SPACE + ITEM_VERTICAL_CENTER + SPACE + prop.cssClass).trim();
            prop.cssClass = itemProp.item.activeSize === RibbonItemSize.Large ?
                (VERTICAL_DDB + SPACE + prop.cssClass).trim() : prop.cssClass;
            control.cssClass = prop.cssClass;
        }
        delete prop.open;
        delete prop.click;
        delete prop.close;
        delete prop.beforeClose;
        control.setProperties(prop);
        if (prop.content) {
            this.setContent(itemProp.item, control);
        }
    }
    /**
     * Updated SplitButton size
     *
     * @param {HTMLElement} element - Gets the splibutton element.
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @returns {void}
     * @hidden
     */
    updateSplitButtonSize(element, item) {
        const control = getComponent(element, SplitButton);
        let cssClass = control.cssClass.split(SPACE);
        if (item.activeSize === RibbonItemSize.Large) {
            cssClass.push(VERTICAL_DDB);
        }
        else {
            cssClass = cssClass.filter((value) => value !== VERTICAL_DDB);
        }
        control.cssClass = cssClass.join(SPACE);
        control.setProperties({ iconPosition: item.activeSize === RibbonItemSize.Large ? 'Top' : 'Left' });
        this.setContent(item, control);
    }
}

/**
 * Gets index value.
 *
 * @param {Array} arr - Gets the array to find index.
 * @param {boolean} condition - Defines whether index matches with the value.
 * @returns {number} - Gets the index value.
 * @hidden
 */
function getIndex(arr, condition) {
    for (let i = 0; i < arr.length; i++) {
        if (condition(arr[parseInt(i.toString(), 10)], i)) {
            return i;
        }
    }
    return -1;
}
/**
 * Gets template content based on the template property value.
 *
 * @param {string | HTMLElement| Function} template - Template property value.
 * @returns {Function} - Return template function.
 * @hidden
 */
function getTemplateFunction(template) {
    if (typeof template === 'string') {
        let content = '';
        try {
            const tempEle = select(template);
            if (tempEle) {
                //Return innerHTML incase of jsrenderer script else outerHTML
                content = tempEle.tagName === 'SCRIPT' ? tempEle.innerHTML : tempEle.outerHTML;
            }
            else {
                content = template;
            }
        }
        catch (e) {
            content = template;
        }
        return compile(content);
    }
    else {
        /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
        return compile(template);
    }
}
/**
 * Gets the ribbon item
 *
 * @param {RibbonTabModel} tabs - Gets the ribbon tab model.
 * @param {string} id - Gets the ID of the tab.
 * @returns {itemProps} - Gets the ribbon item.
 * @hidden
 */
function getItem(tabs, id) {
    for (let i = 0; i < tabs.length; i++) {
        const tab = tabs[parseInt(i.toString(), 10)];
        for (let j = 0; j < tab.groups.length; j++) {
            const group = tab.groups[parseInt(j.toString(), 10)];
            for (let k = 0; k < group.collections.length; k++) {
                const collection = group.collections[parseInt(k.toString(), 10)];
                for (let l = 0; l < collection.items.length; l++) {
                    const item = collection.items[parseInt(l.toString(), 10)];
                    if (item.id === id) {
                        return {
                            item: item, collection: collection, group: group,
                            tabIndex: i, groupIndex: j, collectionIndex: k, itemIndex: l
                        };
                    }
                }
            }
        }
    }
    return null;
}
/**
 * Gets the ribbon collection.
 *
 * @param {RibbonTabModel} tabs - Gets the ribbon tab model.
 * @param {string} id - Gets the ID of the tab.
 * @returns {itemProps} - Gets the ribbon collection.
 * @hidden
 */
function getCollection(tabs, id) {
    for (let i = 0; i < tabs.length; i++) {
        const tab = tabs[parseInt(i.toString(), 10)];
        for (let j = 0; j < tab.groups.length; j++) {
            const group = tab.groups[parseInt(j.toString(), 10)];
            for (let k = 0; k < group.collections.length; k++) {
                const collection = group.collections[parseInt(k.toString(), 10)];
                if (collection.id === id) {
                    return {
                        collection: collection, group: group,
                        tabIndex: i, groupIndex: j, collectionIndex: k
                    };
                }
            }
        }
    }
    return null;
}
/**
 * Gets the ribbon group.
 *
 * @param {RibbonTabModel} tabs - Gets the ribbon tab model.
 * @param {string} id - Gets the ID of the tab.
 * @returns {itemProps} - Gets the ribbon group.
 * @hidden
 */
function getGroup(tabs, id) {
    for (let i = 0; i < tabs.length; i++) {
        const tab = tabs[parseInt(i.toString(), 10)];
        for (let j = 0; j < tab.groups.length; j++) {
            const group = tab.groups[parseInt(j.toString(), 10)];
            if (group.id === id) {
                return {
                    group: group, tabIndex: i, groupIndex: j
                };
            }
        }
    }
    return null;
}
/**
 * @param {HTMLElement} element - Gets the element to be destroyed.
 * @param {string} moduleName - Gets the module name.
 * @returns {void}
 * @hidden
 */
function destroyControl(element, moduleName) {
    const control = getComponent(element, moduleName);
    control.destroy();
}
/**
 * Updates common properties.
 *
 * @param {HTMLElement} element - Gets the element to be updated.
 * @param {string} moduleName - Gets the module name.
 * @param {commonProperties} commonProp - Gets the common properties to be updated.
 * @returns {void}
 * @hidden
 */
function updateCommonProperty(element, moduleName, commonProp) {
    const control = getComponent(element, moduleName);
    control.setProperties(commonProp);
}
/**
 * Updates disabled control.
 *
 * @param {HTMLElement} element - Gets the element to be disabled.
 * @param {string} moduleName - Gets the module name.
 * @param {boolean} disable - Defines whether the control to be disabled or not.
 * @returns {void}
 * @hidden
 */
function updateControlDisabled(element, moduleName, disable) {
    const control = getComponent(element, moduleName);
    control.setProperties(moduleName === 'combobox' ? { enabled: !disable } : { disabled: disable });
}
/**
 * Gets the ribbon item element.
 *
 * @param {Ribbon} parent - Gets the parent element.
 * @param {string} id - Gets the ID of the item.
 * @param {itemProps} itemProp - Gets the ribbon item.
 * @returns {HTMLElement} - Gets the ribbon item element.
 * @hidden
 */
function getItemElement(parent, id, itemProp) {
    if (!itemProp) {
        itemProp = getItem(parent.tabs, id);
        if (!itemProp) {
            return null;
        }
    }
    let contentEle = parent.tabObj.items[itemProp.tabIndex].content;
    if (contentEle.innerHTML === '') {
        return null;
    }
    if (parent.activeLayout === RibbonLayout.Classic) {
        if (itemProp.item.displayOptions & DisplayMode.Classic) {
            contentEle = (itemProp.group.isCollapsed) ? parent.ribbonDropDownModule.getOverflowDropDownPopup(itemProp, contentEle)
                : contentEle;
            return contentEle.querySelector('#' + id);
        }
        else {
            return null;
        }
    }
    else {
        //Checks for Simplified and Auto options (Auto = classic + simplified + popup)
        let ele = (itemProp.item.displayOptions & DisplayMode.Simplified) ?
            contentEle.querySelector('#' + itemProp.item.id) : null;
        // element will be null for "Popup" and if the item is moved to overflow in "Auto" mode
        if (!ele) {
            const dropdown = itemProp.group.enableGroupOverflow ?
                getComponent(contentEle.querySelector('#' + itemProp.group.id + GROUPOF_BUTTON_ID), DropDownButton)
                : parent.overflowDDB;
            ele = dropdown.target.querySelector('#' + itemProp.item.id);
        }
        return ele;
    }
}
/**
 * @param {RibbonTooltipModel} tooltip - Gets the property of tooltip.
 * @returns {boolean} - Gets whether the tooltip is present or not.
 * @hidden
 */
function isTooltipPresent(tooltip) {
    return (tooltip.content || tooltip.iconCss || tooltip.title || tooltip.id || tooltip.cssClass) ? true : false;
}
/**
 * Sets content for tooltip.
 *
 * @param {TooltipEventArgs} args - Gets the argument of tooltip.
 * @param {Tooltip} tooltip - Gets the tooltip to set the content.
 * @param {ribbonTooltipData} tooltipData - Gets the tooltip data.
 * @returns {void}
 * @hidden
 */
function setToolTipContent(args, tooltip, tooltipData) {
    const targetId = args.target.getAttribute('id');
    const dataObj = tooltipData.filter((e) => e.id === targetId)[0];
    const data = dataObj.data;
    const content = tooltip.createElement('div', {
        id: data.id ? RIBBON_TOOLTIP_CONTAINER + '_' + data.id : RIBBON_TOOLTIP_CONTAINER
    });
    tooltip.element.append(content);
    if (data.title) {
        const header = tooltip.createElement('div', {
            innerHTML: data.title,
            className: RIBBON_TOOLTIP_TITLE
        });
        content.appendChild(header);
    }
    const textContainer = tooltip.createElement('div', {
        className: RIBBON_TEXT_CONTAINER
    });
    content.appendChild(textContainer);
    if (data.iconCss) {
        const customCss = tooltip.createElement('div', {
            className: data.iconCss + ' ' + RIBBON_TOOLTIP_ICON
        });
        textContainer.appendChild(customCss);
    }
    if (data.content) {
        const tooltipContent = tooltip.createElement('div', {
            innerHTML: data.content,
            className: RIBBON_TOOLTIP_CONTENT
        });
        textContainer.appendChild(tooltipContent);
    }
    tooltip.setProperties({
        content: content,
        cssClass: data.cssClass ? data.cssClass + ' ' + RIBBON_TOOLTIP : RIBBON_TOOLTIP
    });
}
/**
 * Creates tooltip.
 *
 * @param {HTMLElement} element - Gets the element to add tooltip.
 * @param {Ribbon} ribbon - Gets the ribbon.
 * @returns {void}
 * @hidden
 */
function createTooltip(element, ribbon) {
    const ribbonTooltip = new Tooltip({
        target: '.' + RIBBON_TOOLTIP_TARGET,
        beforeRender: beforeTooltipRender.bind(this),
        windowCollision: true
    });
    ribbonTooltip.appendTo(element);
    /**
     * @param {TooltipEventArgs} args - Gets the tooltip argument.
     * @returns {void}
     * @hidden
     */
    function beforeTooltipRender(args) {
        setToolTipContent(args, ribbonTooltip, ribbon.tooltipData);
    }
}
/**
 * Destroys tooltip
 *
 * @param {HTMLElement} element - Gets the element in which the tooltip needs to be destroyed.
 * @returns {void}
 * @hidden
 */
function destroyTooltip(element) {
    const control = getComponent(element, Tooltip);
    control.destroy();
}
/**
 * Updates tooltip
 *
 * @param {HTMLElement} element - Gets the element in which the tooltip needs to be Updated.
 * @param {commonProperties} prop - Gets the property to be updated.
 * @returns {void}
 * @hidden
 */
function updateTooltipProp(element, prop) {
    const control = getComponent(element, Tooltip);
    control.setProperties(prop);
}

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Ribbon_1;
/**
 * The Ribbon Component is a structured layout to manage tools with tabs and groups.
 */
let Ribbon = Ribbon_1 = class Ribbon extends Component {
    /**
     * Constructor for creating the widget.
     *
     * @param  {RibbonModel} options - Specifies the ribbon model
     * @param  {string|HTMLDivElement} element - Specifies the target element
     */
    constructor(options, element) {
        Ribbon_1.Inject(RibbonButton, RibbonCheckBox, RibbonDropDown, RibbonSplitButton, RibbonComboBox);
        super(options, element);
    }
    /**
     * Initialize the control rendering.
     *
     * @returns {void}
     * @private
     */
    render() {
        this.initialize();
    }
    preRender() {
        this.idIndex = 0;
        this.tooltipData = [];
        this.isAddRemove = false;
        this.keyConfigs = {
            leftarrow: 'leftarrow',
            rightarrow: 'rightarrow',
            tab: 'tab',
            shiftTab: 'shift+tab'
        };
    }
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @returns {string} - Persist data
     */
    getPersistData() {
        return this.addOnPersist(['activeLayout']);
    }
    /**
     * Get component name.
     *
     * @returns {string} - Module name
     * @private
     */
    getModuleName() {
        return 'ribbon';
    }
    /**
     * To provide the array of modules needed for component rendering
     *
     * @returns {ModuleDeclaration[]} - returns module declaration.
     * @hidden
     */
    requiredModules() {
        const modules = [];
        modules.push({ member: 'ribbonButton', args: [this] }, { member: 'ribbonDropDown', args: [this] }, { member: 'ribbonSplitButton', args: [this] }, { member: 'ribbonCheckBox', args: [this] }, { member: 'ribbonColorPicker', args: [this] }, { member: 'ribbonComboBox', args: [this] }, { member: 'ribbonFileMenu', args: [this] });
        return modules;
    }
    initialize() {
        this.element.id = this.element.id || getUniqueID('e-' + this.getModuleName());
        addClass([this.element], ['e-rbn', ...(this.cssClass ? this.cssClass.split(SPACE) : [])]);
        if (this.enableRtl) {
            this.element.classList.add(RTL_CSS);
        }
        this.element.style.width = formatUnit(this.width);
        this.renderTabs();
        if (this.ribbonFileMenuModule) {
            this.ribbonFileMenuModule.createFileMenu(this.fileMenu);
        }
        this.createHelpPaneTemplate();
        const toolbar = this.tabObj['tbObj'];
        toolbar.refreshOverflow();
        createTooltip(this.element, this);
        this.wireEvents();
        this.wireKeyboardEvent();
        this.currentControlIndex = 0;
    }
    wireEvents() {
        EventHandler.add(window, 'resize', this.resizeHandler, this);
    }
    wireKeyboardEvent() {
        this.keyboardModuleRibbon = new KeyboardEvents(this.element, {
            keyAction: this.keyActionHandler.bind(this),
            keyConfigs: this.keyConfigs,
            eventName: 'keydown'
        });
    }
    keyActionHandler(e) {
        if (((e.key === 'Tab') && (!(e.target.classList.contains('e-tab-wrap')) && !(e.target.classList.contains('e-combobox'))))) {
            e.preventDefault();
        }
        const activeContent = this.tabObj.element.querySelector('#' + this.tabs[this.selectedTab].id + CONTENT_ID);
        const ribbonControls = activeContent.querySelectorAll('.e-control');
        const comboBoxElements = activeContent.querySelectorAll('.e-combobox');
        let comboBoxEle;
        if (comboBoxElements) {
            for (let i = 0; i < comboBoxElements.length; i++) {
                if (comboBoxElements[parseInt(i.toString(), 10)].closest('.e-input-focus')) {
                    comboBoxEle = comboBoxElements[parseInt(i.toString(), 10)];
                }
            }
        }
        if (comboBoxEle) {
            for (let i = 0; i < ribbonControls.length; i++) {
                if (ribbonControls[parseInt(i.toString(), 10)].classList.contains('e-combobox')) {
                    if (ribbonControls[parseInt(i.toString(), 10)].closest('.e-input-focus')) {
                        this.currentControlIndex = i;
                    }
                }
            }
        }
        if (this.currentControlIndex === 0) {
            let item = ribbonControls[this.currentControlIndex].closest('.e-ribbon-item');
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
    }
    handleNavigation(e, enableRtl, ribbonControls) {
        let groupContainer;
        let prevGroupId;
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
                    const prevGroupContainer = ribbonControls[parseInt(this.currentControlIndex.toString(), 10)].closest('.' + RIBBON_GROUP_CONTAINER);
                    if (prevGroupContainer) {
                        prevGroupId = prevGroupContainer.getAttribute('id');
                    }
                    this.currentControlIndex--;
                }
                let item = ribbonControls[this.currentControlIndex].closest('.e-ribbon-item');
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
                    groupContainer = ribbonControls[parseInt(this.currentControlIndex.toString(), 10)].closest('.' + RIBBON_GROUP_CONTAINER);
                    if (enableRtl) {
                        let launcherIconEle;
                        if (groupContainer) {
                            launcherIconEle = groupContainer.querySelector('.e-ribbon-launcher-icon');
                        }
                        if (launcherIconEle) {
                            const items = groupContainer.querySelectorAll('.e-ribbon-item');
                            items[items.length - 1].querySelector('.e-control').classList.add('e-ribbon-last-item');
                        }
                    }
                    else {
                        if (groupContainer) {
                            const groupContainerId = groupContainer.getAttribute('id');
                            if (prevGroupId !== groupContainerId) {
                                const launcherIconEle = groupContainer.querySelector('.e-ribbon-launcher-icon');
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
                const overflowButton = this.tabObj.element.querySelector('.e-ribbon-overall-of-btn');
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
                groupContainer = ribbonControls[parseInt(this.currentControlIndex.toString(), 10)].closest('.' + RIBBON_GROUP_CONTAINER);
                groupContainer.querySelector('.e-ribbon-launcher-icon').focus();
            }
            else {
                this.currentControlIndex--;
                ribbonControls[parseInt(this.currentControlIndex.toString(), 10)].focus();
            }
        }
        if (!enableRtl && e.target.classList.contains('e-ribbon-first-item')) {
            groupContainer = ribbonControls[parseInt((this.currentControlIndex - 1).toString(), 10)].closest('.' + RIBBON_GROUP_CONTAINER);
            const launcherIconEle = groupContainer.querySelector('.e-ribbon-launcher-icon');
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
                let ribbonItem = ribbonControls[this.currentControlIndex].closest('.e-ribbon-item');
                while (ribbonItem && ribbonItem.classList.contains('e-disabled')) {
                    this.currentControlIndex++;
                    ribbonItem = ribbonControls[this.currentControlIndex].closest('.e-ribbon-item');
                }
                ribbonControls[parseInt(this.currentControlIndex.toString(), 10)].focus();
            }
            else {
                const overflowButton = this.tabObj.element.querySelector('.e-ribbon-overall-of-btn');
                if ((overflowButton && !overflowButton.classList.contains('e-ribbon-hide'))) {
                    overflowButton.focus();
                }
                else {
                    this.currentControlIndex = ribbonControls.length - 1;
                    let ribbonItem = ribbonControls[this.currentControlIndex].closest('.e-ribbon-item');
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
    }
    resizeHandler() {
        const activeContent = this.tabObj.element.querySelector('#' + this.tabs[this.selectedTab].id + CONTENT_ID);
        this.checkOverflow(this.selectedTab, activeContent);
        if (this.scrollModule) {
            const scrollEle = this.tabObj.element.querySelector('.' + HORIZONTAL_SCROLLBAR);
            this.scrollModule.scrollStep = scrollEle.offsetWidth;
        }
    }
    renderTabs() {
        this.tabsInternal = this.tabs.slice();
        this.tabsInternal = this.checkID(this.tabsInternal, 'tab', this.element.id);
        this.setProperties({ tabs: this.tabsInternal }, true);
        const tabEle = this.createElement('div', {
            id: this.element.id + TAB_ID
        });
        this.element.appendChild(tabEle);
        this.validateItemSize();
        const tabItems = this.createTabItems(this.tabs);
        this.tabObj = new Tab({
            cssClass: RIBBON_TAB,
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
        this.element.style.setProperty(RIBBON_FILE_MENU_WIDTH, '0px');
        this.element.style.setProperty(RIBBON_HELP_PANE_TEMPLATE_WIDTH, '0px');
        const toolbarEle = tabEle.querySelector('.e-toolbar');
        const toolbar = getComponent(toolbarEle, Toolbar);
        toolbar.setProperties({ width: 'calc(100% - var(--fileMenuWidth) - var(--helpTemplateWidth))' });
        this.element.classList[this.isMinimized ? 'add' : 'remove'](RIBBON_MINIMIZE);
    }
    minimize(val) {
        if (val === this.isMinimized) {
            return;
        }
        const eventArgs = { cancel: false };
        this.trigger(val ? 'ribbonCollapsing' : 'ribbonExpanding', eventArgs, (args) => {
            if (args.cancel) {
                return;
            }
            this.setProperties({ isMinimized: val }, true);
            this.element.classList.toggle(RIBBON_MINIMIZE, this.isMinimized);
            //to overwrite inline styles from hscroll
            this.tabObj.element.querySelector('.e-content').style.display = val ? 'none' : 'block';
            if (!val) {
                this.refreshLayout();
            }
        });
    }
    toggleLayout() {
        this.setProperties({ activeLayout: this.activeLayout === 'Simplified' ? 'Classic' : 'Simplified' }, true);
        this.switchLayout();
    }
    tabCreated() {
        this.addExpandCollapse();
        this.renderInitialTab(this.selectedTab);
    }
    ribbonTabSelected(e) {
        this.isAddRemove = false;
        const selectedTabId = e.selectedItem.getAttribute('data-id');
        let selectedIndex = getIndex(this.tabs, ((tab) => (tab.id === selectedTabId)));
        selectedIndex = selectedIndex === -1 ? this.selectedTab : selectedIndex;
        const eventArgs = { previousIndex: this.selectedTab, selectedIndex: selectedIndex };
        this.setProperties({ selectedTab: selectedIndex }, true);
        this.checkOverflow(selectedIndex, e.selectedContent.firstChild);
        if (this.activeLayout === 'Simplified' && this.overflowDDB) {
            const overflowTarget = this.overflowDDB.target;
            const ofTabContainer = overflowTarget.querySelector('.' + RIBBON_TAB_ACTIVE);
            if (ofTabContainer) {
                ofTabContainer.classList.remove(RIBBON_TAB_ACTIVE);
            }
            const activeTab = overflowTarget.querySelector('#' + selectedTabId + OVERFLOW_ID);
            if (activeTab) {
                activeTab.classList.add(RIBBON_TAB_ACTIVE);
                this.overflowDDB.element.classList.remove(HIDE_CSS);
            }
            else {
                this.overflowDDB.element.classList.add(HIDE_CSS);
            }
        }
        this.trigger('tabSelected', eventArgs);
    }
    checkOverflow(tabIndex, activeContent) {
        const tabContent = activeContent.closest('.' + TAB_CONTENT);
        const isOverFlow = tabContent.offsetWidth < activeContent.offsetWidth;
        if (isOverFlow && !this.scrollModule) {
            if (this.activeLayout === 'Classic') {
                // Defines whether the shrinking is breaked due to insufficient space.
                let isBreak = false;
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
                }, this.tabObj.element.querySelector('.' + TAB_CONTENT));
            }
        }
        else if (!isOverFlow) {
            this.destroyScroll();
            if (this.activeLayout === 'Classic') {
                let isBreak = false;
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
    }
    checkSimplifiedItemShrinking(tabIndex, tabContent, activeContent) {
        const tab = this.tabs[parseInt(tabIndex.toString(), 10)];
        for (let i = (tab.groups.length - 1); (i >= 0); i--) {
            const group = tab.groups[parseInt(i.toString(), 10)];
            const groupContainer = tabContent.querySelector('#' + group.id + CONTAINER_ID);
            for (let j = 0; ((j < group.collections.length) && (tabContent.offsetWidth < activeContent.offsetWidth)); j++) {
                const collection = group.collections[parseInt(j.toString(), 10)];
                for (let k = collection.items.length; ((k >= 1) && (tabContent.offsetWidth < activeContent.offsetWidth)); k--) {
                    const item = collection.items[k - 1];
                    if (((item.allowedSizes & RibbonItemSize.Small) && (item.allowedSizes & RibbonItemSize.Medium))
                        && (item.activeSize === RibbonItemSize.Medium) && (item.displayOptions & DisplayMode.Simplified)) {
                        const itemContainer = groupContainer.querySelector('#' + item.id + CONTAINER_ID);
                        if (itemContainer) {
                            const itemEle = itemContainer.querySelector('#' + item.id);
                            itemContainer.setAttribute('data-medium-width', activeContent.offsetWidth.toString());
                            item.setProperties({ activeSize: RibbonItemSize.Small }, true);
                            this.setItemSize(itemEle, item);
                        }
                    }
                }
            }
        }
    }
    checkSimplifiedItemExpanding(tabIndex, tabContent, activeContent) {
        const tab = this.tabs[parseInt(tabIndex.toString(), 10)];
        for (let i = (tab.groups.length - 1); (i >= 0); i--) {
            const group = tab.groups[parseInt(i.toString(), 10)];
            const groupContainer = tabContent.querySelector('#' + group.id + CONTAINER_ID);
            for (let j = 0; ((j < group.collections.length) && (tabContent.offsetWidth > activeContent.offsetWidth)); j++) {
                const collection = group.collections[parseInt(j.toString(), 10)];
                for (let k = collection.items.length; ((k >= 1) && (tabContent.offsetWidth > activeContent.offsetWidth)); k--) {
                    const item = collection.items[k - 1];
                    if (((item.allowedSizes & RibbonItemSize.Small) && (item.allowedSizes & RibbonItemSize.Medium))
                        && (item.activeSize === RibbonItemSize.Small) && (item.displayOptions & DisplayMode.Simplified)) {
                        const itemContainer = groupContainer.querySelector('#' + item.id + CONTAINER_ID);
                        if (itemContainer) {
                            const valString = itemContainer.getAttribute('data-medium-width');
                            const value = valString ? parseInt(valString, 10) : null;
                            if (value && (tabContent.offsetWidth > value)) {
                                itemContainer.removeAttribute('data-medium-width');
                                const itemEle = itemContainer.querySelector('#' + item.id);
                                item.setProperties({ activeSize: RibbonItemSize.Medium }, true);
                                this.setItemSize(itemEle, item);
                            }
                        }
                    }
                }
            }
        }
    }
    createSimplfiedOverflow(tabContent, activeContent, tabIndex) {
        const orderedGroups = this.getGroupResizeOrder(true, tabIndex);
        for (let i = 0; ((i < orderedGroups.length) && (tabContent.offsetWidth < activeContent.offsetWidth)); i++) {
            const group = orderedGroups[parseInt(i.toString(), 10)];
            const groupEle = tabContent.querySelector('#' + group.id);
            const groupContainer = groupEle.querySelector('#' + group.id + CONTAINER_ID);
            for (let j = group.collections.length; ((j >= 1) && (tabContent.offsetWidth < activeContent.offsetWidth)); j--) {
                const collection = group.collections[parseInt((j - 1).toString(), 10)];
                const collectionEle = groupEle.querySelector('#' + collection.id);
                for (let k = collection.items.length; ((k >= 1) && (tabContent.offsetWidth < activeContent.offsetWidth)); k--) {
                    const item = collection.items[k - 1];
                    const itemContainer = collectionEle.querySelector('#' + item.id + CONTAINER_ID);
                    if (((item.displayOptions === DisplayMode.Auto) ||
                        (item.displayOptions === (DisplayMode.Simplified | DisplayMode.Overflow))) && !isNullOrUndefined(itemContainer)) {
                        itemContainer.setAttribute('data-simplified-width', activeContent.offsetWidth.toString());
                        this.createOverflowPopup(item, tabIndex, group.enableGroupOverflow, group.id, group.header, itemContainer, groupContainer);
                        if (item.activeSize === RibbonItemSize.Small) {
                            const itemEle = itemContainer.querySelector('#' + item.id);
                            item.setProperties({ activeSize: RibbonItemSize.Medium }, true);
                            this.setItemSize(itemEle, item);
                        }
                        if ((item.type === RibbonItemType.DropDown) || (item.type === RibbonItemType.SplitButton)) {
                            this.updatePopupItems(item, itemContainer, group.enableGroupOverflow, true);
                        }
                    }
                }
            }
            if (!(group.enableGroupOverflow || groupEle.querySelector('.' + RIBBON_ITEM))) {
                groupEle.classList.add('e-ribbon-emptyCollection');
            }
        }
    }
    updatePopupItems(item, itemEle, isGroupOF, isMenu) {
        const dropdown = getComponent(itemEle.querySelector('#' + item.id), (item.type === RibbonItemType.DropDown) ? DropDownButton : SplitButton);
        const dropDownPopup = dropdown.dropDown;
        // popup is on right if (isGroupOF && isMenu)
        // The position is reversed if RTL is enabled.
        // isRight = ((isGroupOF && isMenu) && !this.enableRtl ) || (!(isGroupOF && isMenu) && this.enableRtl)  ==> (isGroupOF && isMenu) !== this.enableRtl
        const isLeft = (isGroupOF && isMenu) === this.enableRtl;
        dropDownPopup.setProperties({ position: { X: isLeft ? 'left' : 'right', Y: isMenu ? 'top' : 'bottom' } }, true);
        if (isMenu) {
            dropdown.beforeOpen = () => {
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
    }
    removeSimplfiedOverflow(tabContent, activeContent, tabIndex, isClear = false) {
        const orderedGroups = this.getGroupResizeOrder(false, tabIndex);
        let flag = true;
        for (let i = 0; ((i < orderedGroups.length) && flag); i++) {
            const group = orderedGroups[parseInt(i.toString(), 10)];
            let overflowDDB;
            let overflowtarget;
            if (group.enableGroupOverflow) {
                const overflowDDBEle = tabContent.querySelector('#' + group.id + GROUPOF_BUTTON_ID);
                if (overflowDDBEle) {
                    overflowDDB = getInstance(overflowDDBEle, DropDownButton);
                    overflowtarget = overflowDDB.target;
                }
            }
            else {
                overflowDDB = this.overflowDDB;
                overflowtarget = this.overflowDDB ? this.overflowDDB.target : null;
            }
            for (let j = 0; ((j < group.collections.length) && flag); j++) {
                const collection = group.collections[parseInt(j.toString(), 10)];
                // eslint-disable-next-line max-len
                for (let k = 0; ((k < collection.items.length) && flag && !isClear && (tabContent.offsetWidth > activeContent.offsetWidth)); k++) {
                    const item = collection.items[parseInt(k.toString(), 10)];
                    let itemContainer;
                    if (overflowtarget) {
                        itemContainer = overflowtarget.querySelector('#' + item.id + CONTAINER_ID);
                    }
                    if (((item.displayOptions === DisplayMode.Auto) ||
                        (item.displayOptions === (DisplayMode.Simplified | DisplayMode.Overflow))) && !isNullOrUndefined(itemContainer)) {
                        const width = parseInt(itemContainer.getAttribute('data-simplified-width'), 10);
                        if (!isClear && (tabContent.offsetWidth < width)) {
                            flag = false;
                            break;
                        }
                        const groupEle = tabContent.querySelector('#' + collection.id);
                        if ((item.type === RibbonItemType.DropDown) || (item.type === RibbonItemType.SplitButton)) {
                            this.updatePopupItems(item, itemContainer, group.enableGroupOverflow, false);
                        }
                        groupEle.append(itemContainer);
                        this.removeOverflowEvent(item, itemContainer);
                        if (item.allowedSizes & RibbonItemSize.Small) {
                            item.setProperties({ activeSize: RibbonItemSize.Small }, true);
                            this.setItemSize(itemContainer.querySelector('#' + item.id), item);
                        }
                    }
                }
            }
            const groupEle = tabContent.querySelector('#' + group.id);
            const itemEle = groupEle.querySelector('.' + RIBBON_ITEM);
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
                    const ofGroupContainer = overflowtarget.querySelector('#' + group.id + CONTAINER_ID);
                    if (ofGroupContainer && ofGroupContainer.childElementCount === 1) {
                        ofGroupContainer.remove();
                    }
                    const ofTabContainer = overflowtarget.querySelector('#' + this.tabs[parseInt(tabIndex.toString(), 10)].id + OVERFLOW_ID);
                    if (ofTabContainer && ofTabContainer.childElementCount === 0) {
                        ofTabContainer.remove();
                        this.overflowDDB.element.classList.add(HIDE_CSS);
                    }
                }
            }
        }
        if (this.overflowDDB) {
            const overflowEle = this.overflowDDB.target;
            if (overflowEle.childElementCount === 0) {
                this.removeOverflowButton(this.overflowDDB);
                this.overflowDDB = null;
            }
        }
    }
    createOverflowPopup(item, tabIndex, isGroupOF, groupId, groupHeader, itemEle, groupContainer) {
        let overflowButton;
        if (isGroupOF) {
            const overflowDDB = groupContainer.querySelector('#' + groupId + GROUPOF_BUTTON_ID);
            if (!overflowDDB) {
                overflowButton = this.addOverflowButton(groupId + GROUPOF_BUTTON_ID);
                overflowButton.element.classList.add(RIBBON_GROUP_OF_BUTTON);
                groupContainer.appendChild(overflowButton.element);
            }
            else {
                overflowButton = getInstance(overflowDDB, DropDownButton);
            }
            overflowButton.target.append(itemEle);
        }
        else {
            if (!this.overflowDDB) {
                this.overflowDDB = this.addOverflowButton(this.tabObj.element.id + OVRLOF_BUTTON_ID);
                this.tabObj.element.insertBefore(this.overflowDDB.element, this.collapseButton);
                this.overflowDDB.element.classList.add(RIBBON_OVERALL_OF_BUTTON);
                this.createOfTabContainer(groupId, groupHeader, itemEle, tabIndex);
            }
            else {
                this.overflowDDB.element.classList.remove(HIDE_CSS);
                const overflowEle = this.overflowDDB.target;
                const ofTabContainer = overflowEle.querySelector('#' + this.tabs[parseInt(tabIndex.toString(), 10)].id + OVERFLOW_ID);
                if (ofTabContainer) {
                    let ofGroupContainer = overflowEle.querySelector('#' + groupId + CONTAINER_ID);
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
    }
    addOverflowEvents(item, itemEle, overflowButton) {
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
    }
    createOfTabContainer(groupId, groupHeader, itemEle, tabIndex) {
        const ofTabContainer = this.createElement('div', {
            id: this.tabs[parseInt(tabIndex.toString(), 10)].id + OVERFLOW_ID,
            className: RIBBON_OF_TAB_CONTAINER
        });
        const overflowtarget = this.overflowDDB.target;
        overflowtarget.append(ofTabContainer);
        const ofGroupContainer = this.createGroupContainer(groupId, groupHeader);
        ofGroupContainer.append(itemEle);
        ofTabContainer.append(ofGroupContainer);
        if (tabIndex === this.selectedTab) {
            ofTabContainer.classList.add(RIBBON_TAB_ACTIVE);
        }
    }
    checkGroupShrinking(tabIndex, tabContent, activeContent, isLarge) {
        let isOverFlow = true;
        let isBreak = false;
        const tab = this.tabs[parseInt(tabIndex.toString(), 10)];
        for (let j = (tab.groups.length - 1); (isOverFlow && (j >= 0)); j--) {
            // eslint-disable-next-line max-len
            isBreak = isLarge ? this.checkLargeToMedium(tabIndex, tab, j, tabContent, activeContent) : this.checkMediumToSmall(tabIndex, tab, j, tabContent, activeContent);
            isOverFlow = !isBreak && (tabContent.offsetWidth < activeContent.offsetWidth);
        }
        return isBreak;
    }
    checkValidCollectionLength(collections) {
        let count = 0;
        for (let i = 0; i < collections.length; i++) {
            const items = collections[parseInt(i.toString(), 10)].items;
            for (let ind = 0; ind < items.length; ind++) {
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
    }
    checkClassicCollection(collections, n, isIncrement) {
        const items = collections[parseInt(n.toString(), 10)].items;
        for (let ind = 0; ind < items.length; ind++) {
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
    }
    checkClassicItem(items, n, isIncrement) {
        const item = items[parseInt(n.toString(), 10)];
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
    }
    checkLargeToMedium(tabIndex, tab, groupIndex, tabContent, activeContent, shouldSkip = false) {
        const group = tab.groups[parseInt(groupIndex.toString(), 10)];
        if (group.isCollapsed && !shouldSkip) {
            return false;
        }
        const canReduceCollection = (collection) => {
            return (collection.items.length === 1) && canReduceItem(collection.items[0]);
        };
        const canReduceItem = (item) => {
            return (item.allowedSizes & RibbonItemSize.Medium) && (item.activeSize === RibbonItemSize.Large);
        };
        const createShrinkEle = (id, firstItem, start, end) => {
            const shrinkEle = this.createElement('div', {
                className: 'e-ribbon-shrink' + SPACE + RIBBON_ROW,
                id: id + '_shrink_container' + start,
                attrs: { 'data-start': start.toString(), 'data-end': end.toString() }
            });
            firstItem.parentElement.insertBefore(shrinkEle, firstItem);
            if (!shouldSkip) {
                shrinkEle.setAttribute('data-large-width', activeContent.offsetWidth.toString());
            }
            return shrinkEle;
        };
        const moveItemToColumn = (start, end) => {
            const collection = this.tabs[parseInt(tabIndex.toString(), 10)]
                .groups[parseInt(groupIndex.toString(), 10)].collections[0];
            const firstItem = activeContent.querySelector('#' + collection.items[parseInt(start.toString(), 10)].id + CONTAINER_ID);
            const shrinkEle = shouldSkip ? activeContent.querySelector('#' + collection.id + '_shrink_container' + start) :
                createShrinkEle(collection.id, firstItem, start, end);
            for (let i = start; i <= end; i++) {
                const item = collection.items[parseInt(i.toString(), 10)];
                if (!(item.displayOptions & DisplayMode.Classic)) {
                    continue;
                }
                const ele = activeContent.querySelector('#' + item.id + CONTAINER_ID);
                shrinkEle.appendChild(ele);
                item.setProperties({ activeSize: RibbonItemSize.Medium }, true);
                this.setItemSize(ele.querySelector('#' + item.id), item);
            }
        };
        const moveCollectionToColumn = (start, end) => {
            const group = this.tabs[parseInt(tabIndex.toString(), 10)]
                .groups[parseInt(groupIndex.toString(), 10)];
            const firstItem = activeContent.querySelector('#' + group.collections[parseInt(start.toString(), 10)].id);
            const shrinkEle = shouldSkip ? activeContent.querySelector('#' + group.id + '_shrink_container' + start) :
                createShrinkEle(group.id, firstItem, start, end);
            for (let i = start; i <= end; i++) {
                const collection = group.collections[parseInt(i.toString(), 10)];
                const ele = activeContent.querySelector('#' + collection.id);
                shrinkEle.appendChild(ele);
                collection.items[0].setProperties({ activeSize: RibbonItemSize.Medium }, true);
                this.setItemSize(ele.querySelector('#' + collection.items[0].id), collection.items[0]);
            }
        };
        const orientation = group.orientation;
        if (orientation === ItemOrientation.Column) {
            for (let k = (group.collections.length - 1); k > 0; k--) {
                //to avoid negative index while checking for the second collection
                k = this.checkClassicCollection(group.collections, k, false);
                let l = k - 1;
                //Checks the element rendered at position n
                if ((l >= 0) && canReduceCollection(group.collections[parseInt(k.toString(), 10)])) {
                    l = this.checkClassicCollection(group.collections, l, false);
                    //Checks the element rendered at position n-1
                    if ((l >= 0) && canReduceCollection(group.collections[parseInt(l.toString(), 10)])) {
                        let m = l - 1;
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
                const collection = group.collections[0];
                for (let k = (collection.items.length - 1); k > 0; k--) {
                    //to avoid negative index while checking for the second item
                    k = this.checkClassicItem(collection.items, k, false);
                    let l = k - 1;
                    //Checks the element rendered at position n
                    if ((l >= 0) && canReduceItem(collection.items[parseInt(k.toString(), 10)])) {
                        l = this.checkClassicItem(collection.items, l, false);
                        //Checks the element rendered at position n-1
                        if ((l >= 0) && canReduceItem(collection.items[parseInt(l.toString(), 10)])) {
                            let m = l - 1;
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
    }
    checkMediumToSmall(tabIndex, tab, groupIndex, tabContent, activeContent, shouldSkip = false) {
        const group = tab.groups[parseInt(groupIndex.toString(), 10)];
        if (group.isCollapsed && !shouldSkip) {
            return false;
        }
        const orientation = group.orientation;
        const ele = activeContent.querySelector('#' + group.id);
        const shrinkColumns = ele.querySelectorAll('.' + 'e-ribbon-shrink');
        const canReduceItem = (item) => {
            return (item.allowedSizes & RibbonItemSize.Small) && (item.activeSize === RibbonItemSize.Medium);
        };
        const reduceItemsToSmall = (collectionIndex, start, end, middle = null) => {
            const collection = this.tabs[parseInt(tabIndex.toString(), 10)]
                .groups[parseInt(groupIndex.toString(), 10)].collections[parseInt(collectionIndex.toString(), 10)];
            const reduce = (i) => {
                const item = collection.items[parseInt(i.toString(), 10)];
                if (item.displayOptions & DisplayMode.Classic) {
                    const ele = activeContent.querySelector('#' + item.id);
                    item.setProperties({ activeSize: RibbonItemSize.Small }, true);
                    this.setItemSize(ele, item);
                }
            };
            reduce(start);
            if (middle) {
                reduce(middle);
            }
            reduce(end);
        };
        const reduceCollectionsToSmall = (index, start, end, middle = null) => {
            const group = this.tabs[parseInt(tabIndex.toString(), 10)]
                .groups[parseInt(groupIndex.toString(), 10)];
            if (!shouldSkip) {
                shrinkColumns[parseInt(index.toString(), 10)].setAttribute('data-medium-width', activeContent.offsetWidth.toString());
            }
            const reduce = (i) => {
                const collection = group.collections[parseInt(i.toString(), 10)];
                if (collection.items[0].displayOptions & DisplayMode.Classic) {
                    const ele = activeContent.querySelector('#' + collection.items[0].id);
                    collection.items[0].setProperties({ activeSize: RibbonItemSize.Small }, true);
                    this.setItemSize(ele, collection.items[0]);
                }
            };
            reduce(start);
            if (middle) {
                reduce(middle);
            }
            reduce(end);
        };
        const setWidth = (id) => {
            if (!shouldSkip) {
                const ele = activeContent.querySelector('#' + id);
                ele.setAttribute('data-medium-width', activeContent.offsetWidth.toString());
            }
        };
        if (orientation === ItemOrientation.Column) {
            if (shrinkColumns.length > 0) {
                for (let k = (shrinkColumns.length - 1); k >= 0; k--) {
                    const start = parseInt(shrinkColumns[parseInt(k.toString(), 10)].getAttribute('data-start'), 10);
                    const end = parseInt(shrinkColumns[parseInt(k.toString(), 10)].getAttribute('data-end'), 10);
                    //only 2 or 3 itmes alone can be present in shrinked column
                    const l = this.checkClassicCollection(group.collections, start + 1, false); //next valid item
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
            for (let k = (group.collections.length - 1); k >= 0; k--) {
                const collection = group.collections[parseInt(k.toString(), 10)];
                const classicItems = [];
                for (let i = 0; i < collection.items.length; i++) {
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
                    for (let k = (shrinkColumns.length - 1); k >= 0; k--) {
                        const shrinkColumn = shrinkColumns[parseInt(k.toString(), 10)];
                        const start = parseInt(shrinkColumn.getAttribute('data-start'), 10);
                        const end = parseInt(shrinkColumn.getAttribute('data-end'), 10);
                        //only 2 or 3 itmes alone can be present in shrinked column
                        const collection = group.collections[0];
                        const l = this.checkClassicItem(collection.items, start + 1, false); //next valid item
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
                for (let k = (group.collections.length - 1); k >= 0; k--) {
                    const collection = group.collections[parseInt(k.toString(), 10)];
                    for (let l = (collection.items.length - 1); l >= 0; l--) {
                        l = this.checkClassicItem(collection.items, l, false);
                        if (l < 0) {
                            continue;
                        }
                        const item = collection.items[parseInt(l.toString(), 10)];
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
    }
    checkGroupExpanding(tabIndex, tabContent, activeContent, isSmall) {
        let isBreak = false;
        const tab = this.tabs[parseInt(tabIndex.toString(), 10)];
        for (let j = 0; (!isBreak && (j < tab.groups.length)); j++) {
            isBreak = isSmall ? this.checkSmallToMedium(tabIndex, tab, j, tabContent, activeContent, false, true) :
                this.checkMediumToLarge(tabIndex, tab, j, tabContent, activeContent, false, true);
        }
        return isBreak;
    }
    // eslint-disable-next-line max-len
    checkSmallToMedium(tabIndex, tab, groupIndex, tabContent, activeContent, shouldSkip, shouldClear) {
        const group = tab.groups[parseInt(groupIndex.toString(), 10)];
        const orientation = group.orientation;
        const ele = activeContent.querySelector('#' + group.id);
        const shrinkColumns = ele.querySelectorAll('.' + 'e-ribbon-shrink');
        const canExpandItem = (item) => {
            return (item.allowedSizes & RibbonItemSize.Medium) && (item.activeSize === RibbonItemSize.Small);
        };
        const expandItemToMedium = (collectionIndex, index, parentEle) => {
            const collection = this.tabs[parseInt(tabIndex.toString(), 10)]
                .groups[parseInt(groupIndex.toString(), 10)].collections[parseInt(collectionIndex.toString(), 10)];
            const item = collection.items[parseInt(index.toString(), 10)];
            if (item.displayOptions & DisplayMode.Classic) {
                const ele = parentEle.id === item.id ? parentEle : parentEle.querySelector('#' + item.id);
                item.setProperties({ activeSize: RibbonItemSize.Medium }, true);
                this.setItemSize(ele, item);
            }
        };
        const expandCollectionsToMedium = (i) => {
            const collections = this.tabs[parseInt(tabIndex.toString(), 10)]
                .groups[parseInt(groupIndex.toString(), 10)].collections;
            const item = collections[parseInt(i.toString(), 10)].items[0];
            if (item.displayOptions & DisplayMode.Classic) {
                const ele = activeContent.querySelector('#' + collections[parseInt(i.toString(), 10)].items[0].id);
                collections[parseInt(i.toString(), 10)].items[0].setProperties({ activeSize: RibbonItemSize.Medium }, true);
                this.setItemSize(ele, collections[parseInt(i.toString(), 10)].items[0]);
            }
        };
        if (orientation === ItemOrientation.Row) {
            // collection length is 1, then the it wll be covered in shrinked columns
            if (!this.checkValidCollectionLength(group.collections)) {
                for (let k = 0; k < group.collections.length; k++) {
                    const collection = group.collections[parseInt(k.toString(), 10)];
                    for (let l = 0; l < collection.items.length; l++) {
                        l = this.checkClassicItem(collection.items, l, true);
                        if (l === collection.items.length) {
                            continue;
                        }
                        const item = collection.items[parseInt(l.toString(), 10)];
                        if (canExpandItem(item)) {
                            const itemEle = activeContent.querySelector('#' + item.id);
                            const valString = itemEle.getAttribute('data-medium-width');
                            const value = valString ? parseInt(valString, 10) : null;
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
            for (let k = 0; k < group.collections.length; k++) {
                //If items length is 1 then, it will be handled in shrinked column
                if ((group.collections[parseInt(k.toString(), 10)].items.length > 1)) {
                    const collection = group.collections[parseInt(k.toString(), 10)];
                    const itemEle = activeContent.querySelector('#' + collection.id);
                    const valString = itemEle.getAttribute('data-medium-width');
                    const value = valString ? parseInt(valString, 10) : null;
                    const classicItems = [];
                    for (let i = 0; i < collection.items.length; i++) {
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
            for (let k = 0; k < shrinkColumns.length; k++) {
                const shrinkColumn = shrinkColumns[parseInt(k.toString(), 10)];
                const valString = shrinkColumn.getAttribute('data-medium-width');
                const value = valString ? parseInt(valString, 10) : null;
                if (value && (shouldSkip || (tabContent.offsetWidth > value))) {
                    const start = parseInt(shrinkColumn.getAttribute('data-start'), 10);
                    const end = parseInt(shrinkColumn.getAttribute('data-end'), 10);
                    if (orientation === ItemOrientation.Row) {
                        const collection = group.collections[0];
                        const l = this.checkClassicItem(collection.items, start + 1, true); //next valid item
                        expandItemToMedium(0, start, shrinkColumn);
                        expandItemToMedium(0, l, shrinkColumn);
                        // if l == end, then l is the last item, else L is the middle item. If l is middle then call the method for end.
                        if (l !== end) {
                            expandItemToMedium(0, end, shrinkColumn);
                        }
                    }
                    else {
                        const m = this.checkClassicCollection(group.collections, start + 1, true); //next valid item
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
    }
    checkMediumToLarge(tabIndex, tab, groupIndex, tabContent, activeContent, shouldSkip, shouldClear) {
        const group = tab.groups[parseInt(groupIndex.toString(), 10)];
        const orientation = group.orientation;
        const ele = activeContent.querySelector('#' + group.id);
        const shrinkColumns = ele.querySelectorAll('.' + 'e-ribbon-shrink');
        if (shrinkColumns.length === 0) {
            return false;
        }
        const expandItemsToLarge = (start, end, parentEle, middle) => {
            const items = this.tabs[parseInt(tabIndex.toString(), 10)].
                groups[parseInt(groupIndex.toString(), 10)].collections[0].items;
            const reduce = (i) => {
                const item = items[parseInt(i.toString(), 10)];
                if (item.displayOptions & DisplayMode.Classic) {
                    const container = parentEle.querySelector('#' + item.id + CONTAINER_ID);
                    const ele = container.querySelector('#' + item.id);
                    item.setProperties({ activeSize: RibbonItemSize.Large }, true);
                    this.setItemSize(ele, item);
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
        const expandCollectionsToLarge = (start, end, parentEle, middle) => {
            const collections = this.tabs[parseInt(tabIndex.toString(), 10)].
                groups[parseInt(groupIndex.toString(), 10)].collections;
            const reduce = (i) => {
                const collection = collections[parseInt(i.toString(), 10)];
                if (collection.items[0].displayOptions & DisplayMode.Classic) {
                    const collectionEle = parentEle.querySelector('#' + collection.id);
                    const ele = collectionEle.querySelector('#' + collection.items[0].id);
                    collection.items[0].setProperties({ activeSize: RibbonItemSize.Large }, true);
                    this.setItemSize(ele, collection.items[0]);
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
        for (let k = 0; k < shrinkColumns.length; k++) {
            const shrinkColumn = shrinkColumns[parseInt(k.toString(), 10)];
            const valString = shrinkColumn.getAttribute('data-large-width');
            const value = valString ? parseInt(valString, 10) : null;
            if (value && (shouldSkip || (tabContent.offsetWidth > value))) {
                const start = parseInt(shrinkColumn.getAttribute('data-start'), 10);
                const end = parseInt(shrinkColumn.getAttribute('data-end'), 10);
                if (orientation === ItemOrientation.Row) {
                    const collection = group.collections[0];
                    const l = this.checkClassicItem(collection.items, start + 1, true); //next valid item
                    if (l === end) {
                        expandItemsToLarge(start, end, shrinkColumn);
                    }
                    else {
                        expandItemsToLarge(start, end, shrinkColumn, l);
                    }
                }
                else {
                    const m = this.checkClassicCollection(group.collections, start + 1, true); //next valid item
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
    }
    setItemSize(itemEle, item) {
        const itemContainer = itemEle.closest('.' + RIBBON_ITEM);
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
        itemContainer.classList.remove(RIBBON_CONTENT_HEIGHT, RIBBON_LARGE_ITEM, RIBBON_MEDIUM_ITEM, RIBBON_SMALL_ITEM);
        if (item.activeSize === RibbonItemSize.Large) {
            itemContainer.classList.add(RIBBON_LARGE_ITEM, RIBBON_CONTENT_HEIGHT);
        }
        else {
            itemContainer.classList.add((item.activeSize === RibbonItemSize.Medium) ?
                RIBBON_MEDIUM_ITEM : RIBBON_SMALL_ITEM);
        }
    }
    createOverflowDropdown(tabIndex, tabContent, activeContent) {
        const collapseOrder = this.getGroupResizeOrder(true, tabIndex);
        if (collapseOrder.length === 0) {
            return;
        }
        for (let i = 0; ((i < collapseOrder.length) && (tabContent.offsetWidth < activeContent.offsetWidth)); i++) {
            const group = collapseOrder[parseInt(i.toString(), 10)];
            const groupEle = this.tabObj.element.querySelector('#' + group.id);
            groupEle.setAttribute('data-expanded-width', activeContent.offsetWidth.toString());
            const groupContainer = groupEle.querySelector('#' + group.id + CONTAINER_ID);
            const groupOverFlow = this.createElement('div', {
                className: RIBBON_GROUP_OVERFLOW + SPACE + RIBBON_LARGE_ITEM,
                id: group.id + OVERFLOW_ID + CONTAINER_ID
            });
            groupEle.insertBefore(groupOverFlow, groupContainer);
            const groupIndex = getIndex(this.tabs[parseInt(tabIndex.toString(), 10)].groups, (e) => { return e.id === group.id; });
            const tab = this.tabs[parseInt(tabIndex.toString(), 10)];
            //Expanding the items in the group to their original expanded state
            this.checkSmallToMedium(tabIndex, tab, groupIndex, tabContent, activeContent, true, false);
            this.checkMediumToLarge(tabIndex, tab, groupIndex, tabContent, activeContent, true, false);
            const dropdown = this.ribbonDropDownModule.createOverFlowDropDown(group.id, group.header, group.groupIconCss, groupContainer, groupOverFlow, this.enableRtl);
            this.tabs[parseInt(tabIndex.toString(), 10)].
                groups[parseInt(groupIndex.toString(), 10)].setProperties({ isCollapsed: true }, true);
            for (let j = 0; j < group.collections.length; j++) {
                const collection = group.collections[parseInt(j.toString(), 10)];
                const collectionEle = groupContainer.querySelector('#' + collection.id);
                for (let k = 0; k < collection.items.length; k++) {
                    const item = collection.items[parseInt(k.toString(), 10)];
                    const itemEle = collectionEle.querySelector('#' + item.id + CONTAINER_ID);
                    if (itemEle !== null) {
                        this.addOverflowEvents(item, itemEle, dropdown);
                    }
                }
            }
        }
    }
    // eslint-disable-next-line max-len
    removeOverflowDropdown(tabContent, activeContent, isClear = false, tabIndex) {
        const expandOrder = this.getGroupResizeOrder(false, tabIndex);
        if (expandOrder.length === 0) {
            return false;
        }
        for (let i = 0; i < expandOrder.length; i++) {
            const group = expandOrder[parseInt(i.toString(), 10)];
            const groupEle = this.tabObj.element.querySelector('#' + group.id);
            if (!groupEle) {
                break;
            } //to handle the rerendering of tabcontrol when a ribbon tab is added/removed
            const width = parseInt(groupEle.getAttribute('data-expanded-width'), 10);
            if (!isClear && (tabContent.offsetWidth < width)) {
                return true;
            }
            this.removeDropdown(group.id);
            const groupIndex = getIndex(this.tabs[parseInt(tabIndex.toString(), 10)].groups, (e) => { return e.id === group.id; });
            this.tabs[parseInt(tabIndex.toString(), 10)].
                groups[parseInt(groupIndex.toString(), 10)].setProperties({ isCollapsed: false }, true);
            const tab = this.tabs[parseInt(tabIndex.toString(), 10)];
            //Shrinking the items in the group to their previous shrinked state (before moving to dropdown)
            this.checkLargeToMedium(tabIndex, tab, groupIndex, tabContent, activeContent, true);
            this.checkMediumToSmall(tabIndex, tab, groupIndex, tabContent, activeContent, true);
            for (let j = 0; j < group.collections.length; j++) {
                const collection = group.collections[parseInt(j.toString(), 10)];
                const collectionEle = groupEle.querySelector('#' + collection.id);
                for (let k = 0; k < collection.items.length; k++) {
                    const item = collection.items[parseInt(k.toString(), 10)];
                    const itemEle = collectionEle.querySelector('#' + item.id + CONTAINER_ID);
                    if (itemEle !== null) {
                        this.removeOverflowEvent(item, itemEle);
                    }
                }
            }
        }
        return false;
    }
    removeDropdown(groupId) {
        const dropdownElement = this.tabObj.element.querySelector('#' + groupId + OVERFLOW_ID + DROPDOWN_ID);
        if (dropdownElement) {
            const groupOverFlow = dropdownElement.parentElement;
            this.ribbonDropDownModule.removeOverFlowDropDown(dropdownElement);
            remove(groupOverFlow);
        }
    }
    getGroupResizeOrder(isCollapse, tabIndex) {
        let groups = this.tabs[parseInt(tabIndex.toString(), 10)].groups;
        groups = groups.filter((e) => {
            // (isUndefined(e.isCollapsible) || e.isCollapsible) => check whethe rhte item is collapsible
            // if a isCollapsed property is undefined, then it is considered collapsible and included in collapsible list
            // ((isCollapse && !e.isCollapsed)||(!isCollapse && e.isCollapsed)) => isCollapse !== e.isCollapsed
            return (this.activeLayout === 'Classic') ? (isUndefined(e.isCollapsible) || e.isCollapsible) && ((isCollapse &&
                isUndefined(e.isCollapsed)) || (!isUndefined(e.isCollapsed) && (isCollapse !== e.isCollapsed))) : true;
        });
        //sort the collapsible groups based on the priority
        groups.sort((a, b) => a.priority - b.priority);
        //reverse the sorted array to return the array in descending order while collapsing.
        return isCollapse ? groups.reverse() : groups;
    }
    destroyScroll() {
        if (this.scrollModule) {
            this.scrollModule.destroy();
            this.scrollModule = null;
        }
    }
    clearOverflowDropDown(index) {
        const activeContent = this.tabObj.element.querySelector('#' + this.tabs[parseInt(index.toString(), 10)].id + CONTENT_ID);
        if (!activeContent) {
            return;
        }
        const tabContent = activeContent.closest('.' + TAB_CONTENT);
        if (this.activeLayout === 'Simplified') {
            this.removeSimplfiedOverflow(activeContent, tabContent, index, true);
        }
        else {
            this.removeOverflowDropdown(activeContent, tabContent, true, index);
        }
    }
    ribbonTabSelecting(e) {
        this.currentControlIndex = 0;
        const nextTabId = e.selectingItem.getAttribute('data-id');
        const previousTabId = e.previousItem.getAttribute('data-id');
        let nextIndex = getIndex(this.tabs, ((tab) => (tab.id === nextTabId)));
        const previousIndex = getIndex(this.tabs, ((tab) => (tab.id === previousTabId)));
        nextIndex = nextIndex === -1 ? this.selectedTab : nextIndex;
        const eventArgs = {
            cancel: e.cancel, isInteracted: e.isInteracted, previousIndex: previousIndex, selectedIndex: nextIndex
        };
        this.trigger('tabSelecting', eventArgs, (args) => {
            if (args.cancel) {
                return;
            }
            this.destroyScroll();
            if (!this.isAddRemove && (previousIndex !== -1)) {
                this.clearOverflowDropDown(previousIndex);
            }
            const selectedTabContent = this.tabObj.items[parseInt(nextIndex.toString(), 10)].content;
            if ((!selectedTabContent.querySelector('.' + RIBBON_GROUP)) && (this.tabs[parseInt(nextIndex.toString(), 10)].groups.length !== 0)) {
                const elements = this.createGroups(this.tabs[parseInt(nextIndex.toString(), 10)].groups, nextIndex);
                append(elements, selectedTabContent);
            }
        });
    }
    createTabItems(tabs) {
        const tabItems = [];
        for (let i = 0; i < tabs.length; i++) {
            const ribbonTab = tabs[parseInt(i.toString(), 10)];
            const header = this.createElement('span', {
                innerHTML: ribbonTab.header,
                id: ribbonTab.id + HEADER_ID
            });
            header.onclick = () => { this.minimize(false); };
            header.ondblclick = () => { this.minimize(true); };
            const tab = { header: { text: header }, id: ribbonTab.id, cssClass: ribbonTab.cssClass };
            const content = this.createElement('div', {
                className: tab.cssClass,
                id: ribbonTab.id + CONTENT_ID
            });
            content.classList.add(RIBBON_TAB_ITEM);
            tab.content = content;
            tabItems.push(tab);
        }
        return tabItems;
    }
    renderInitialTab(index) {
        const elements = this.createGroups(this.tabs[parseInt(index.toString(), 10)].groups, index);
        const content = this.tabObj.items[parseInt(index.toString(), 10)].content;
        append(elements, content);
        if (this.activeLayout === 'Simplified') {
            this.element.classList.add(RIBBON_SIMPLIFIED_MODE);
        }
        const activeContent = this.tabObj.element.querySelector('#' + this.tabs[this.selectedTab].id + CONTENT_ID);
        this.checkOverflow(this.selectedTab, activeContent);
    }
    addOverflowButton(btnId) {
        const overflowButton = this.createElement('button', {
            id: btnId
        });
        const overflowTarget = this.createElement('div', {
            className: RIBBON_OVERFLOW_TARGET,
            attrs: { 'tabindex': '0' }
        });
        const overflowDDB = new DropDownButton({
            iconCss: OVERFLOW_ICON,
            cssClass: DROPDOWNBUTTON_HIDE + SPACE + RIBBON_GROUP_OVERFLOW_DDB,
            target: overflowTarget,
            locale: this.locale,
            enableRtl: this.enableRtl,
            enablePersistence: this.enablePersistence,
            beforeClose: (args) => {
                const ele = args.event ? closest(args.event.target, '.' + RIBBON_POPUP_CONTROL) : null;
                if (ele) {
                    args.cancel = true;
                }
            }
        }, overflowButton);
        this.element.classList.add(RIBBON_OVERFLOW);
        createTooltip(overflowTarget, this);
        let isGroupOf;
        overflowButton.onkeydown = overflowButton.onclick = () => { this.itemIndex = -1; isGroupOf = overflowButton.classList.contains('e-ribbon-overall-of-btn') ? false : true; };
        overflowTarget.onkeydown = (e) => (this.upDownKeyHandler(e, overflowTarget, isGroupOf), this);
        return overflowDDB;
    }
    upDownKeyHandler(e, target, isGroupOf) {
        let items;
        if (isGroupOf) {
            items = target.getElementsByClassName('e-ribbon-item');
        }
        else {
            const currentList = target.querySelector('.e-ribbon-of-tab.e-ribbon-active');
            items = currentList.getElementsByClassName('e-ribbon-item');
        }
        const comboBoxEle = items[(!this.itemIndex || this.itemIndex < 0) ? 0 : this.itemIndex].querySelector('.e-control').classList.contains('e-combobox') ? items[(!this.itemIndex || this.itemIndex < 0) ? 0 : this.itemIndex].querySelector('.e-combobox') : null;
        let ribbonItem;
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
        const currentItemIndex = parseInt(target.getAttribute('index'), 10);
        const itemType = items[parseInt(currentItemIndex.toString(), 10)] ? items[parseInt(currentItemIndex.toString(), 10)].querySelector('.e-control').getAttribute('data-control') : null;
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
                const checkBoxEle = items[parseInt(currentItemIndex.toString(), 10)].querySelector('.e-control');
                const checkBox = getComponent(checkBoxEle, CheckBox);
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
    }
    findDisabledItem(ribbonItem, items, isIncrease) {
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
    }
    removeOverflowButton(overflowDDB) {
        if (overflowDDB) {
            const btnEle = overflowDDB.element;
            destroyTooltip(overflowDDB.target);
            overflowDDB.destroy();
            btnEle.remove();
        }
    }
    removeOverflowEvent(item, itemEle) {
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
    }
    createGroupContainer(groupId, groupHeader) {
        const ofGroupContainer = this.createElement('div', {
            className: RIBBON_OF_GROUP_CONTAINER,
            id: groupId + CONTAINER_ID
        });
        const ofGroupHeader = this.createElement('div', {
            className: RIBBON_OVERFLOW_HEADER,
            id: groupId + HEADER_ID,
            innerHTML: groupHeader
        });
        ofGroupContainer.append(ofGroupHeader);
        return ofGroupContainer;
    }
    addExpandCollapse() {
        this.collapseButton = this.createElement('span', {
            className: RIBBON_COLLAPSE_BUTTON + SPACE + EXPAND_COLLAPSE_ICON,
            id: this.tabObj.element.id + COLLAPSE_BUTTON_ID,
            attrs: { 'tabindex': '0', 'type': 'button', 'aria-label': 'Layout Switcher', 'role': 'button' }
        });
        this.collapseButton.onclick = () => { this.toggleLayout(); };
        this.collapseButton.onkeydown = (e) => {
            if (e.key === 'Enter') {
                this.toggleLayout();
            }
        };
        this.element.classList.add(RIBBON_COLLAPSIBLE);
        if (this.activeLayout === 'Simplified') {
            this.collapseButton.classList.add(RIBBON_EXPAND_BUTTON);
        }
        this.tabObj.element.appendChild(this.collapseButton);
    }
    removeExpandCollapse() {
        const index = getIndex(this.tooltipData, (e) => { return e.id === this.collapseButton.id; });
        if (index !== -1) {
            this.tooltipData.splice(index, 1);
        }
        this.element.classList.remove(RIBBON_COLLAPSIBLE);
        remove(this.tabObj.element.querySelector('.' + RIBBON_COLLAPSE_BUTTON));
        this.collapseButton = null;
    }
    reRenderTabs() {
        this.destroyScroll();
        this.destroyTabItems(this.tabsInternal);
        this.checkID(this.tabs, 'tab', this.element.id);
        this.tabsInternal = this.tabs.slice();
        this.validateItemSize();
        const tabItems = this.createTabItems(this.tabs);
        if (this.selectedTab >= this.tabs.length) {
            this.selectedTab = this.tabs.length - 1;
        }
        this.tabObj.setProperties({ items: tabItems, selectedItem: this.selectedTab });
        const contentEle = this.tabObj.items[this.selectedTab].content;
        if (contentEle.innerHTML === '') {
            this.renderInitialTab(this.selectedTab);
        }
    }
    switchLayout() {
        this.currentControlIndex = 0;
        this.destroyScroll();
        this.collapseButton.classList.toggle(RIBBON_EXPAND_BUTTON, this.activeLayout === 'Simplified');
        this.element.classList.toggle(RIBBON_SIMPLIFIED_MODE, this.activeLayout === 'Simplified');
        for (let i = 0; i <= (this.tabs.length - 1); i++) {
            const tabIndex = i;
            const contentEle = this.tabObj.items[parseInt(tabIndex.toString(), 10)].content;
            if (contentEle.innerHTML !== '') {
                const tab = this.tabs[parseInt(tabIndex.toString(), 10)];
                const groupList = this.tabs[parseInt(tabIndex.toString(), 10)].groups;
                const activeContent = this.tabObj.element.querySelector('#' + this.tabs[parseInt(tabIndex.toString(), 10)].id + CONTENT_ID);
                const tabContent = activeContent.closest('.' + TAB_CONTENT);
                if (this.activeLayout === 'Simplified') {
                    for (let i = 0; i < groupList.length; i++) {
                        const group = groupList[parseInt(i.toString(), 10)];
                        const alignType = groupList[parseInt(i.toString(), 10)].orientation;
                        if (group.isCollapsed) {
                            group.setProperties({ isCollapsed: false }, true);
                            this.removeDropdown(group.id);
                        }
                        else {
                            this.checkSmallToMedium(tabIndex, tab, i, tabContent, activeContent, true, false);
                            this.checkMediumToLarge(tabIndex, tab, i, tabContent, activeContent, true, false);
                        }
                        const groupEle = tabContent.querySelector('#' + group.id);
                        const groupContainer = groupEle.querySelector('#' + group.id + CONTAINER_ID);
                        const shrinkColumns = groupContainer.querySelectorAll('.' + 'e-ribbon-shrink');
                        for (let i = 0; i < shrinkColumns.length; i++) {
                            shrinkColumns[parseInt(i.toString(), 10)].remove();
                        }
                        const groupHeader = groupContainer.querySelector('#' + group.id + HEADER_ID);
                        groupHeader.remove();
                        const groupContent = groupContainer.querySelector('#' + group.id + CONTENT_ID);
                        groupContent.classList.replace(RIBBON_ROW, RIBBON_COLUMN);
                        groupContent.classList.remove(RIBBON_CONTENT_HEIGHT);
                        for (let j = 0; j < group.collections.length; j++) {
                            const collection = group.collections[parseInt(j.toString(), 10)];
                            const groupCollection = groupContainer.querySelector('#' + collection.id);
                            groupCollection.classList.replace(RIBBON_ROW, RIBBON_COLUMN);
                            for (let k = 0; k < collection.items.length; k++) {
                                const itemList = collection.items;
                                let item = collection.items[parseInt(k.toString(), 10)];
                                let flag = true;
                                while ((flag) && (item.displayOptions === DisplayMode.Classic)) {
                                    k++;
                                    const itemEle = groupContainer.querySelector('#' + item.id + CONTAINER_ID);
                                    const ele = itemEle.querySelector('#' + item.id);
                                    this.destroyFunction(item, ele);
                                    itemEle.remove();
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
                                let size = ((item.allowedSizes === RibbonItemSize.Large) ||
                                    (item.allowedSizes & RibbonItemSize.Medium)) ? RibbonItemSize.Medium : RibbonItemSize.Small;
                                size = (!(item.displayOptions & DisplayMode.Simplified) && (item.displayOptions & DisplayMode.Overflow))
                                    ? RibbonItemSize.Medium : size;
                                let itemEle;
                                if (!(item.displayOptions & DisplayMode.Classic)) {
                                    itemEle = this.createItems([item], alignType, group.id, group.header, group.enableGroupOverflow, tabIndex, groupContainer)[0];
                                    if (item.displayOptions & DisplayMode.Simplified) {
                                        groupCollection.append(itemEle);
                                    }
                                }
                                else {
                                    itemEle = groupContainer.querySelector('#' + item.id + CONTAINER_ID);
                                    if (item.displayOptions === (DisplayMode.Classic | DisplayMode.Overflow)) {
                                        this.createOverflowPopup(item, tabIndex, group.enableGroupOverflow, group.id, group.header, itemEle, groupContainer);
                                        if ((item.type === RibbonItemType.DropDown) || (item.type === RibbonItemType.SplitButton)) {
                                            this.updatePopupItems(item, itemEle, group.enableGroupOverflow, true);
                                        }
                                    }
                                    item.setProperties({ activeSize: size }, true);
                                    const ele = itemEle.querySelector('#' + item.id);
                                    this.setItemSize(ele, item);
                                }
                            }
                        }
                        if (!(group.enableGroupOverflow || groupEle.querySelector('.' + RIBBON_ITEM))) {
                            groupEle.classList.add('e-ribbon-emptyCollection');
                        }
                    }
                }
                else {
                    this.element.classList.remove(RIBBON_OVERFLOW);
                    for (let i = 0; i < groupList.length; i++) {
                        const group = groupList[parseInt(i.toString(), 10)];
                        const alignType = groupList[parseInt(i.toString(), 10)].orientation;
                        const groupContainer = tabContent.querySelector('#' + group.id + CONTAINER_ID);
                        const groupContent = groupContainer.querySelector('#' + group.id + CONTENT_ID);
                        const groupHeader = this.createElement('div', {
                            className: RIBBON_GROUP_HEADER,
                            id: group.id + HEADER_ID,
                            innerHTML: group.header
                        });
                        groupContainer.appendChild(groupHeader);
                        if (alignType === 'Row') {
                            groupContent.classList.replace(RIBBON_COLUMN, RIBBON_ROW);
                        }
                        groupContent.classList.add(RIBBON_CONTENT_HEIGHT);
                        for (let j = 0; j < group.collections.length; j++) {
                            let overflowDDB;
                            let overflowtarget;
                            if (!group.enableGroupOverflow) {
                                overflowDDB = this.overflowDDB;
                                if (overflowDDB) {
                                    overflowtarget = this.overflowDDB.target;
                                }
                            }
                            else {
                                const overflowDDBEle = groupContainer.querySelector('#' + group.id + GROUPOF_BUTTON_ID);
                                if (overflowDDBEle) {
                                    overflowDDB = getInstance(overflowDDBEle, DropDownButton);
                                    overflowtarget = overflowDDB.target;
                                }
                            }
                            const collection = group.collections[parseInt(j.toString(), 10)];
                            const groupCollection = groupContainer.querySelector('#' + collection.id);
                            if (alignType === 'Column') {
                                groupCollection.classList.replace(RIBBON_COLUMN, RIBBON_ROW);
                            }
                            for (let k = 0; k < collection.items.length; k++) {
                                const itemList = collection.items;
                                let item = collection.items[parseInt(k.toString(), 10)];
                                let flag = true;
                                while ((flag) && !(item.displayOptions & DisplayMode.Classic)) {
                                    k++;
                                    let itemEle;
                                    if ((item.displayOptions & DisplayMode.Simplified) || (item.displayOptions & DisplayMode.Overflow)) {
                                        if (item.displayOptions & DisplayMode.Simplified) {
                                            itemEle = groupContainer.querySelector('#' + item.id + CONTAINER_ID);
                                        }
                                        else {
                                            itemEle = overflowtarget.querySelector('#' + item.id + CONTAINER_ID);
                                        }
                                        if (itemEle !== null) {
                                            const ele = itemEle.querySelector('#' + item.id);
                                            this.destroyFunction(item, ele);
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
                                    const itemEle = this.createItems([item], alignType, group.id, group.header, group.enableGroupOverflow, tabIndex)[0];
                                    groupCollection.append(itemEle);
                                }
                                else {
                                    let itemEle = groupContainer.querySelector('#' + item.id + CONTAINER_ID);
                                    if (!itemEle) {
                                        itemEle = overflowtarget.querySelector('#' + item.id + CONTAINER_ID);
                                        if ((item.type === RibbonItemType.DropDown) || (item.type === RibbonItemType.SplitButton)) {
                                            this.updatePopupItems(item, itemEle, group.enableGroupOverflow, false);
                                        }
                                        this.removeOverflowEvent(item, itemEle);
                                    }
                                    groupCollection.append(itemEle);
                                }
                                const ele = groupContainer.querySelector('#' + item.id);
                                const itemsize = (item.allowedSizes & RibbonItemSize.Large) ? RibbonItemSize.Large :
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
    }
    createLauncherIcon(groupId, groupContainer) {
        const launcherIcon = this.createElement('div', {
            className: RIBBON_LAUNCHER_ICON_ELE + ' ' + (this.launcherIconCss ? this.launcherIconCss : RIBBON_LAUNCHER_ICON),
            id: groupId + LAUNCHER_ID,
            attrs: { 'tabindex': '0', 'type': 'button', 'aria-label': 'Launcher Icon', 'role': 'button' }
        });
        groupContainer.appendChild(launcherIcon);
        groupContainer.classList.add(RIBBON_LAUNCHER);
        EventHandler.add(launcherIcon, 'click', this.launcherIconClicked.bind(this, groupId), this);
        EventHandler.add(launcherIcon, 'keydown', (e) => {
            if (e.key === 'Enter') {
                this.launcherIconClicked(groupId);
            }
        }, this);
    }
    launcherIconClicked(id) {
        const eventArgs = { groupId: id };
        this.trigger('launcherIconClick', eventArgs);
    }
    createGroups(groupList, tabIndex) {
        const groupElements = [];
        for (let i = 0; i < groupList.length; i++) {
            const group = groupList[parseInt(i.toString(), 10)];
            const alignType = group.orientation;
            const groupEle = this.createElement('div', {
                className: group.cssClass,
                id: group.id
            });
            groupEle.classList.add(RIBBON_GROUP);
            groupElements.push(groupEle);
            const groupContainer = this.createElement('div', {
                className: group.cssClass,
                id: group.id + CONTAINER_ID
            });
            groupContainer.classList.add(RIBBON_GROUP_CONTAINER);
            groupEle.appendChild(groupContainer);
            const groupContent = this.createElement('div', {
                className: this.activeLayout === 'Simplified' ? RIBBON_GROUP_CONTENT : (RIBBON_GROUP_CONTENT + SPACE + RIBBON_CONTENT_HEIGHT),
                id: group.id + CONTENT_ID
            });
            groupContent.classList.add(((alignType === 'Column') || (this.activeLayout === 'Simplified')) ? RIBBON_COLUMN : RIBBON_ROW);
            groupContainer.appendChild(groupContent);
            if (this.activeLayout === 'Classic') {
                const groupHeader = this.createElement('div', {
                    className: RIBBON_GROUP_HEADER,
                    id: group.id + HEADER_ID,
                    innerHTML: group.header
                });
                groupContainer.appendChild(groupHeader);
            }
            if (group.showLauncherIcon) {
                this.createLauncherIcon(group.id, groupContainer);
            }
            const elements = this.createCollection(group.collections, group.orientation, group.id, group.header, group.enableGroupOverflow, tabIndex, groupContainer);
            append(elements, groupContent);
            if ((this.activeLayout === 'Simplified') && !(group.enableGroupOverflow || groupEle.querySelector('.' + RIBBON_ITEM))) {
                groupEle.classList.add('e-ribbon-emptyCollection');
            }
        }
        return groupElements;
    }
    validateItemSize() {
        for (let k = 0; k < this.tabs.length; k++) {
            const groupList = this.tabs[parseInt(k.toString(), 10)].groups;
            for (let l = 0; l < groupList.length; l++) {
                const collectionList = groupList[parseInt(l.toString(), 10)].collections;
                const alignType = groupList[parseInt(l.toString(), 10)].orientation;
                for (let i = 0; i < collectionList.length; i++) {
                    const items = collectionList[parseInt(i.toString(), 10)].items;
                    for (let j = 0; j < items.length; j++) {
                        const ribbonitem = items[parseInt(j.toString(), 10)];
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
                                let sizeVal = ribbonitem.allowedSizes & (RibbonItemSize.Small | RibbonItemSize.Medium);
                                sizeVal = sizeVal ? sizeVal : RibbonItemSize.Medium;
                                ribbonitem.setProperties({ allowedSizes: sizeVal }, true);
                            }
                        }
                        const itemsize = (ribbonitem.allowedSizes & RibbonItemSize.Large) ? RibbonItemSize.Large :
                            (ribbonitem.allowedSizes & RibbonItemSize.Medium) ? RibbonItemSize.Medium : RibbonItemSize.Small;
                        ribbonitem.setProperties({ activeSize: itemsize }, true);
                    }
                }
            }
        }
    }
    createCollection(collectionList, alignType, groupId, groupHeader, isGroupOF, tabIndex, groupContainer) {
        const collectionElements = [];
        for (let i = 0; i < collectionList.length; i++) {
            const collection = collectionList[parseInt(i.toString(), 10)];
            const collectionEle = this.createElement('div', {
                className: collection.cssClass,
                id: collection.id
            });
            collectionEle.classList.add(RIBBON_COLLECTION);
            collectionEle.classList.add(((alignType !== 'Column') || (this.activeLayout === 'Simplified')) ?
                RIBBON_COLUMN : RIBBON_ROW);
            collectionElements.push(collectionEle);
            const elements = this.createItems(collection.items, alignType, groupId, groupHeader, isGroupOF, tabIndex, groupContainer);
            append(elements, collectionEle);
            if ((alignType === 'Row') && (i === 2)) {
                break;
            }
        }
        return collectionElements;
    }
    createRibbonItem(item, itemEle) {
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
    }
    createItems(itemList, alignType, groupId, groupHeader, isGroupOF, tabIndex, groupContainer) {
        const itemElements = [];
        for (let i = 0; i < itemList.length; i++) {
            let item = itemList[parseInt(i.toString(), 10)];
            //To stop rendering of items with simplified mode position type as none
            let flag = true;
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
            const itemEle = this.createElement('div', {
                className: item.cssClass,
                id: item.id + CONTAINER_ID
            });
            itemEle.classList.add(RIBBON_ITEM, ...(item.disabled ? [DISABLED_CSS] : []));
            // To avoid undefined items condition is added
            if (item.ribbonTooltipSettings && isTooltipPresent(item.ribbonTooltipSettings)) {
                itemEle.classList.add(RIBBON_TOOLTIP_TARGET);
                this.tooltipData.push({ id: itemEle.id, data: item.ribbonTooltipSettings });
            }
            let size = item.activeSize;
            if (this.activeLayout === 'Simplified') {
                size = ((item.allowedSizes === RibbonItemSize.Large) || (item.allowedSizes & RibbonItemSize.Medium) ||
                    (item.displayOptions === DisplayMode.Overflow)) ? RibbonItemSize.Medium : RibbonItemSize.Small;
                item.setProperties({ activeSize: size }, true);
            }
            if (size & RibbonItemSize.Large) {
                itemEle.classList.add(RIBBON_LARGE_ITEM, RIBBON_CONTENT_HEIGHT);
            }
            else {
                itemEle.classList.add((size & RibbonItemSize.Medium) ? RIBBON_MEDIUM_ITEM : RIBBON_SMALL_ITEM);
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
    }
    createHelpPaneTemplate() {
        if (this.helpPaneTemplate) {
            const templateName = 'helpPaneTemplate';
            this.clearTemplate([templateName]);
            this.ribbonTempEle = this.createElement('div', {
                className: RIBBON_HELP_TEMPLATE,
                id: this.element.id + RIBBON_HELP_PANE_TEMPLATE_ID
            });
            const templateFunction = getTemplateFunction(this.helpPaneTemplate);
            append(templateFunction({}, this, templateName, 'helpPaneTemplate', this.isStringTemplate), this.ribbonTempEle);
            const tabEle = this.tabObj.element;
            const toolbarEle = tabEle.querySelector('.e-toolbar');
            toolbarEle.after(this.ribbonTempEle);
            tabEle.style.setProperty(RIBBON_HELP_PANE_TEMPLATE_WIDTH, this.ribbonTempEle.offsetWidth + 'px');
            this.renderReactTemplates();
        }
    }
    createTemplateContent(item, itemElement) {
        const itemEle = this.createElement('div', {
            className: item.cssClass ? (RIBBON_TEMPLATE + SPACE + item.cssClass) : RIBBON_TEMPLATE,
            id: item.id
        });
        if (item.disabled) {
            itemEle.classList.add(DISABLED_CSS);
            itemEle.setAttribute('disabled', '');
        }
        itemElement.appendChild(itemEle);
        this.renderItemTemplate(item, itemEle);
    }
    renderItemTemplate(item, itemElement) {
        const templateName = 'ribbon' + item.id + 'itemTemplate';
        this.clearTemplate([templateName]);
        const templateFunction = getTemplateFunction(item.itemTemplate);
        append(templateFunction({ activeSize: RibbonItemSize[item.activeSize] }, this, templateName, (item.id + 'itemTemplate'), this.isStringTemplate), itemElement);
        this.renderReactTemplates();
    }
    checkID(list, type, initId) {
        const key = type === 'tab' ? TAB_ID : type === 'group' ? GROUP_ID :
            type === 'collection' ? COLLECTION_ID : ITEM_ID;
        for (let i = 0; i < list.length; i++) {
            const listitem = list[parseInt(i.toString(), 10)];
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
    }
    updateCommonProperty(commonProp) {
        this.tabObj.setProperties(commonProp);
        if (this.ribbonFileMenuModule) {
            this.ribbonFileMenuModule.setCommonProperties(commonProp);
        }
        for (let i = 0; i < this.tabs.length; i++) {
            const tab = this.tabs[parseInt(i.toString(), 10)];
            const contentEle = this.tabObj.items[parseInt(i.toString(), 10)].content;
            for (const group of tab.groups) {
                let dropdownElement;
                let dropdown;
                if (this.activeLayout === RibbonLayout.Classic) {
                    dropdownElement = group.isCollapsed ?
                        contentEle.querySelector('#' + group.id + OVERFLOW_ID + DROPDOWN_ID) : null;
                }
                else {
                    dropdownElement = group.enableGroupOverflow ?
                        contentEle.querySelector('#' + group.id + GROUPOF_BUTTON_ID) : null;
                    dropdown = dropdownElement ? getComponent(dropdownElement, DropDownButton) : this.overflowDDB;
                    if (dropdown) {
                        updateTooltipProp(dropdown.target, commonProp);
                        dropdown.setProperties(commonProp);
                    }
                }
                for (const collection of group.collections) {
                    for (const item of collection.items) {
                        let ele = null;
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
                            const moduleName = this.getItemModuleName(item);
                            if (moduleName !== 'template') {
                                updateCommonProperty(ele, moduleName, commonProp);
                            }
                            else if (!isNullOrUndefined(commonProp.enableRtl)) {
                                ele.classList.toggle(RTL_CSS, commonProp.enableRtl);
                            }
                        }
                    }
                }
            }
        }
    }
    removeLauncherIcon(groupId, dropdownElement, contentEle) {
        const containerId = groupId + CONTAINER_ID;
        const containerEle = dropdownElement ? this.ribbonDropDownModule.getDDBItemElement(dropdownElement, containerId) : contentEle.querySelector('#' + containerId);
        if (containerEle) {
            containerEle.classList.remove(RIBBON_LAUNCHER);
            const launcherIcon = containerEle.querySelector('#' + groupId + LAUNCHER_ID);
            remove(launcherIcon);
        }
    }
    destroyTabItems(tabs) {
        for (let i = 0; i < tabs.length; i++) {
            const tab = tabs[parseInt(i.toString(), 10)];
            const contentEle = this.tabObj.items[parseInt(i.toString(), 10)].content;
            for (const group of tab.groups) {
                let dropdownElement;
                let dropdown;
                if (this.activeLayout === RibbonLayout.Classic) {
                    dropdownElement = group.isCollapsed ?
                        contentEle.querySelector('#' + group.id + OVERFLOW_ID + DROPDOWN_ID) : null;
                    if (group.showLauncherIcon) {
                        this.removeLauncherIcon(group.id, dropdownElement, contentEle);
                    }
                }
                else {
                    dropdownElement = group.enableGroupOverflow ?
                        contentEle.querySelector('#' + group.id + GROUPOF_BUTTON_ID) : null;
                    dropdown = dropdownElement ? getComponent(dropdownElement, DropDownButton) : this.overflowDDB;
                }
                for (const collection of group.collections) {
                    for (const item of collection.items) {
                        let ele;
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
    }
    destroyFunction(item, ele) {
        const moduleName = this.getItemModuleName(item);
        if (moduleName === 'colorpicker') {
            this.ribbonColorPickerModule.unwireColorPickerEvents(ele);
        }
        else if (moduleName !== 'template') {
            destroyControl(ele, moduleName);
        }
        if (item.ribbonTooltipSettings) {
            const index = getIndex(this.tooltipData, (e) => { return e.id === item.id + CONTAINER_ID; });
            if (index !== -1) {
                this.tooltipData.splice(index, 1);
            }
        }
    }
    getItemModuleName(item) {
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
    }
    clearOverflowResize() {
        this.destroyScroll();
        this.clearOverflowDropDown(this.selectedTab);
        const tab = this.tabs[this.selectedTab];
        const activeContent = this.tabObj.element.querySelector('#' + this.tabs[this.selectedTab].id + CONTENT_ID);
        const tabContent = activeContent.closest('.' + TAB_CONTENT);
        for (let j = 0; (j < tab.groups.length); j++) {
            this.checkSmallToMedium(this.selectedTab, tab, j, tabContent, activeContent, true, true);
            this.checkMediumToLarge(this.selectedTab, tab, j, tabContent, activeContent, true, true);
        }
    }
    /**
     * Refreshes the layout.
     *
     * @returns {void}
     */
    refreshLayout() {
        this.resizeHandler();
    }
    /**
     * Selects the tab
     *
     * @param  {string} tabId - Gets the tab ID
     * @returns {void}
     */
    selectTab(tabId) {
        const index = getIndex(this.tabs, (e) => { return e.id === tabId; });
        this.setProperties({ selectedTab: index });
    }
    /**
     * Adds the ribbon tab.
     *
     * @param {RibbonTabModel} tab - Gets the ribbon tab model
     * @param {string} targetId  - Gets the ID of the target tab to add the new tab.
     * @param {boolean} isAfter - Defines whether the tab is added before or after the target.
     * @returns {void}
     */
    addTab(tab, targetId, isAfter) {
        let index = targetId ? getIndex(this.tabs, (e) => e.id === targetId) : -1;
        index = (index === -1) ? this.tabs.length : (index + (isAfter ? 1 : 0));
        this.tabsInternal = this.tabs.slice();
        this.tabsInternal.splice(index, 0, tab);
        this.setProperties({ tabs: this.tabsInternal }, true);
        this.checkID([this.tabs[parseInt(index.toString(), 10)]], 'tab', this.element.id);
        this.tabsInternal = this.tabs.slice();
        this.validateItemSize();
        const tabItem = this.createTabItems([tab]);
        this.tabObj.addTab(tabItem, index);
    }
    /**
     * Removes the ribbon tab.
     *
     * @param {string} tabId - Gets the tab ID
     * @returns {void}
     */
    removeTab(tabId) {
        const index = getIndex(this.tabs, (e) => { return e.id === tabId; });
        if (index === -1) {
            return;
        }
        const contentEle = this.tabObj.items[parseInt(index.toString(), 10)].content;
        const groups = this.tabs[parseInt(index.toString(), 10)].groups;
        if (groups && (contentEle.innerHTML !== '')) {
            for (const group of groups) {
                const dropdownElement = group.isCollapsed ? contentEle.querySelector('#' + group.id + OVERFLOW_ID + DROPDOWN_ID) : null;
                for (const collection of group.collections) {
                    for (const item of collection.items) {
                        const ele = dropdownElement ? this.ribbonDropDownModule.getDDBItemElement(dropdownElement, item.id) : contentEle.querySelector('#' + item.id);
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
    }
    /**
     * Adds the ribbon group.
     *
     * @param {string} tabId - Gets the tab ID.
     * @param {RibbonGroupModel} group - Gets the ribbon group model.
     * @param {string} targetId - Gets the ID of the target group to add the new group.
     * @param {boolean} isAfter - Defines whether the group is added before or after the target.
     * @returns {void}
     */
    addGroup(tabId, group, targetId, isAfter) {
        const tabIndex = getIndex(this.tabs, (e) => { return e.id === tabId; });
        if (tabIndex === -1) {
            return;
        }
        if (this.selectedTab === tabIndex) {
            this.clearOverflowResize();
        }
        const tab = this.tabs[parseInt(tabIndex.toString(), 10)];
        const ribbonGroups = tab.groups.slice();
        let index = targetId ? getIndex(ribbonGroups, (e) => { return e.id === targetId; }) : -1;
        index = (index === -1) ? ribbonGroups.length : (index + (isAfter ? 1 : 0));
        ribbonGroups.splice(index, 0, group);
        tab.setProperties({ groups: ribbonGroups }, true);
        this.checkID([tab.groups[parseInt(index.toString(), 10)]], 'group', tabId);
        this.validateItemSize();
        //Check whether the tab items are rendered
        const contentEle = this.tabObj.items[parseInt(tabIndex.toString(), 10)].content;
        if (contentEle.innerHTML !== '') {
            const element = this.createGroups([tab.groups[parseInt(index.toString(), 10)]], tabIndex)[0];
            //insert the element in tab items property.
            const targetEle = targetId ? contentEle.querySelector('#' + targetId) : null;
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
    }
    /**
     * Removes the ribbon group.
     *
     * @param {string} groupId -Gets the group ID.
     * @returns {void}
     */
    removeGroup(groupId) {
        const itemProp = getGroup(this.tabs, groupId);
        if (!itemProp) {
            return;
        }
        if (this.selectedTab === itemProp.tabIndex) {
            this.clearOverflowResize();
        }
        //Check whether the tab items are rendered
        const contentEle = this.tabObj.items[itemProp.tabIndex].content;
        if (contentEle.innerHTML !== '') {
            let dropdownElement;
            let dropdown;
            if (itemProp.group.showLauncherIcon) {
                this.removeLauncherIcon(itemProp.group.id, null, contentEle);
            }
            if (this.activeLayout === RibbonLayout.Simplified) {
                dropdownElement = itemProp.group.enableGroupOverflow ?
                    contentEle.querySelector('#' + itemProp.group.id + GROUPOF_BUTTON_ID) : null;
                dropdown = dropdownElement ? getComponent(dropdownElement, DropDownButton) : this.overflowDDB;
            }
            for (const collection of itemProp.group.collections) {
                for (const item of collection.items) {
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
                    const ofGroupContainer = dropdown.target.querySelector('#' + itemProp.group.id + CONTAINER_ID);
                    if (ofGroupContainer && ofGroupContainer.childElementCount === 1) {
                        ofGroupContainer.remove();
                    }
                    const ofTabContainer = dropdown.target.querySelector('#' + this.tabs[parseInt(itemProp.tabIndex.toString(), 10)].id + OVERFLOW_ID);
                    if (ofTabContainer && ofTabContainer.childElementCount === 0) {
                        ofTabContainer.remove();
                    }
                }
            }
            const groupEle = contentEle.querySelector('#' + groupId);
            if (groupEle) {
                groupEle.remove();
            }
        }
        const ribbonGroups = this.tabs[itemProp.tabIndex].groups.slice();
        ribbonGroups.splice(itemProp.groupIndex, 1);
        this.tabs[itemProp.tabIndex].setProperties({ groups: ribbonGroups }, true);
        if (this.selectedTab === itemProp.tabIndex) {
            this.refreshLayout();
        }
    }
    /**
     * adds the ribbon collection.
     *
     * @param {string} groupId - Gets the ribbon group ID.
     * @param {RibbonCollectionModel} collection - Gets the ribbon collection model.
     * @param {string} targetId - Gets the ID of the target collection to add the new collection.
     * @param {boolean} isAfter - Defines whether the collection is added before or after the target.
     * @returns {void}
     */
    addCollection(groupId, collection, targetId, isAfter) {
        const itemProp = getGroup(this.tabs, groupId);
        if (!itemProp) {
            return;
        }
        if ((itemProp.group.orientation === 'Row') && (itemProp.group.collections.length === 3)) {
            return;
        }
        if (this.selectedTab === itemProp.tabIndex) {
            this.clearOverflowResize();
        }
        const ribbonCollections = itemProp.group.collections.slice();
        let index = targetId ? getIndex(ribbonCollections, (e) => { return e.id === targetId; }) : -1;
        index = (index === -1) ? ribbonCollections.length : (index + (isAfter ? 1 : 0));
        ribbonCollections.splice(index, 0, collection);
        itemProp.group.setProperties({ collections: ribbonCollections }, true);
        this.checkID([itemProp.group.collections[parseInt(index.toString(), 10)]], 'collection', groupId);
        this.validateItemSize();
        let contentEle = this.tabObj.items[itemProp.tabIndex].content;
        if (contentEle.innerHTML !== '') {
            const collection = itemProp.group.collections[parseInt(index.toString(), 10)];
            const element = this.createCollection([collection], itemProp.group.orientation, itemProp.group.id, itemProp.group.header, itemProp.group.enableGroupOverflow, itemProp.tabIndex)[0];
            if (itemProp.group.isCollapsed) {
                contentEle = this.ribbonDropDownModule.getOverflowDropDownPopup(itemProp, contentEle);
            }
            //insert the element in tab items property.
            const targetEle = targetId ? contentEle.querySelector('#' + targetId) : null;
            if (targetEle) {
                targetEle.insertAdjacentElement(isAfter ? 'afterend' : 'beforebegin', element);
            }
            else {
                contentEle.querySelector('#' + groupId + CONTENT_ID).append(element);
            }
        }
        if (this.selectedTab === itemProp.tabIndex) {
            this.refreshLayout();
        }
    }
    /**
     * Removes the ribbon collection.
     *
     * @param {string} collectionId - Gets the collection ID.
     * @returns {void}
     */
    removeCollection(collectionId) {
        const itemProp = getCollection(this.tabs, collectionId);
        if (!itemProp) {
            return;
        }
        if (this.selectedTab === itemProp.tabIndex) {
            this.clearOverflowResize();
        }
        //Check whether the tab items are rendered
        const contentEle = this.tabObj.items[itemProp.tabIndex].content;
        if (contentEle.innerHTML !== '') {
            let dropdownElement;
            let dropdown;
            if (this.activeLayout === RibbonLayout.Simplified) {
                dropdownElement = itemProp.group.enableGroupOverflow ?
                    contentEle.querySelector('#' + itemProp.group.id + GROUPOF_BUTTON_ID) : null;
                dropdown = dropdownElement ? getComponent(dropdownElement, DropDownButton) : this.overflowDDB;
            }
            for (const item of itemProp.collection.items) {
                this.removeItemElement(contentEle, item, dropdown);
            }
            const groupEle = contentEle.querySelector('#' + collectionId);
            if (groupEle) {
                groupEle.remove();
            }
        }
        const ribbonGroup = itemProp.group;
        const ribbonCollections = ribbonGroup.collections.slice();
        ribbonCollections.splice(itemProp.collectionIndex, 1);
        ribbonGroup.setProperties({ collections: ribbonCollections }, true);
        if (this.selectedTab === itemProp.tabIndex) {
            this.refreshLayout();
        }
    }
    /**
     * Adds ribbon item.
     *
     * @param {string} collectionId - Gets the collection ID.
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {string} targetId - Gets the ID of the target item to add the new item.
     * @param {boolean} isAfter - Defines whether the item is added before or after the target.
     * @returns {void}
     */
    addItem(collectionId, item, targetId, isAfter) {
        const itemProp = getCollection(this.tabs, collectionId);
        if (!itemProp) {
            return;
        }
        if ((itemProp.group.orientation === 'Column') && (itemProp.collection.items.length === 3)) {
            return;
        }
        if (this.selectedTab === itemProp.tabIndex) {
            this.clearOverflowResize();
        }
        const ribbonItems = itemProp.collection.items.slice();
        let index = targetId ? getIndex(ribbonItems, (e) => { return e.id === targetId; }) : -1;
        index = (index === -1) ? ribbonItems.length : (index + (isAfter ? 1 : 0));
        ribbonItems.splice(index, 0, item);
        itemProp.collection.setProperties({ items: ribbonItems }, true);
        this.checkID([itemProp.collection.items[parseInt(index.toString(), 10)]], 'item', collectionId);
        this.validateItemSize();
        let contentEle = this.tabObj.items[itemProp.tabIndex].content;
        const groupContainer = contentEle.querySelector('#' + itemProp.group.id + CONTAINER_ID);
        if (contentEle.innerHTML !== '') {
            const item = itemProp.collection.items[parseInt(index.toString(), 10)];
            const element = this.createItems([item], itemProp.group.orientation, itemProp.group.id, itemProp.group.header, itemProp.group.enableGroupOverflow, itemProp.tabIndex, groupContainer)[0];
            if (itemProp.group.isCollapsed) {
                contentEle = this.ribbonDropDownModule.getOverflowDropDownPopup(itemProp, contentEle);
            }
            //insert the element in tab items property.
            const targetEle = targetId ? contentEle.querySelector('#' + targetId) : null;
            if (targetEle) {
                targetEle.closest('.' + RIBBON_ITEM).insertAdjacentElement(isAfter ? 'afterend' : 'beforebegin', element);
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
    }
    /**
     * Removes ribbon item.
     *
     * @param {string} itemId - Gets the item ID.
     * @returns {void}
     */
    removeItem(itemId) {
        const itemProp = getItem(this.tabs, itemId);
        if (!itemProp) {
            return;
        }
        if (this.selectedTab === itemProp.tabIndex) {
            this.clearOverflowResize();
        }
        //Check whether the tab items are rendered
        const contentEle = this.tabObj.items[itemProp.tabIndex].content;
        if (contentEle.innerHTML !== '') {
            let dropdownElement;
            let dropdown;
            if (this.activeLayout === RibbonLayout.Simplified) {
                dropdownElement = itemProp.group.enableGroupOverflow ?
                    contentEle.querySelector('#' + itemProp.group.id + GROUPOF_BUTTON_ID) : null;
                dropdown = dropdownElement ? getComponent(dropdownElement, DropDownButton) : this.overflowDDB;
            }
            const item = itemProp.item;
            this.removeItemElement(contentEle, item, dropdown);
        }
        const ribbonCollection = itemProp.collection;
        const ribbonItems = ribbonCollection.items;
        ribbonItems.splice(itemProp.itemIndex, 1);
        ribbonCollection.setProperties({ items: ribbonItems }, true);
        if (this.selectedTab === itemProp.tabIndex) {
            this.refreshLayout();
        }
    }
    /**
     * tab - Gets the ribbon tab to be updated. The id of the tab is a required property. Other properties are optional.
     *
     * @param {RibbonTabModel} tab - Gets the ribbon tab model.
     * @returns {void}
     */
    updateTab(tab) {
        const tabId = tab.id;
        const index = getIndex(this.tabs, (e) => { return e.id === tabId; });
        if (index === -1) {
            return;
        }
        const contentEle = this.tabObj.items[parseInt(index.toString(), 10)].content;
        const groups = this.tabs[parseInt(index.toString(), 10)].groups;
        const tabEle = this.tabObj.element;
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
                for (const group of groups) {
                    const dropdownElement = group.isCollapsed ? contentEle.querySelector('#' + group.id + OVERFLOW_ID + DROPDOWN_ID) : null;
                    for (const collection of group.collections) {
                        for (const item of collection.items) {
                            const ele = dropdownElement ? this.ribbonDropDownModule.getDDBItemElement(dropdownElement, item.id) : contentEle.querySelector('#' + item.id);
                            if (ele) {
                                this.destroyFunction(item, ele);
                            }
                        }
                    }
                    if (dropdownElement) {
                        this.ribbonDropDownModule.removeOverFlowDropDown(dropdownElement);
                    }
                }
                const groupElements = contentEle.querySelectorAll('.e-ribbon-group');
                // eslint-disable-next-line @typescript-eslint/tslint/config
                groupElements.forEach(groupEle => { groupEle.remove(); });
            }
        }
        if (index === this.selectedTab) {
            this.isAddRemove = true;
        }
        const ribbonTab = this.tabs[parseInt(index.toString(), 10)];
        ribbonTab.setProperties(tab, true);
        this.setProperties({ groups: this.checkID(ribbonTab.groups, 'group', ribbonTab.id) }, true);
        this.validateItemSize();
        if (contentEle.innerHTML === '') {
            // Check whether group is passed by the user and sets the updated values.
            if (tab.groups) {
                const elements = this.createGroups(ribbonTab.groups, index);
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
                tabEle.querySelector('#' + tabId + HEADER_ID).innerText = ribbonTab.header;
            }
        }
    }
    /**
     * group - Gets the ribbon group to be updated. The id of the group is a required property. Other properties are optional.
     *
     * @param {RibbonGroupModel} group - Gets the ribbon group model.
     * @returns {void}
     */
    updateGroup(group) {
        const groupId = group.id;
        const itemProp = getGroup(this.tabs, groupId);
        if (!itemProp) {
            return;
        }
        if (this.selectedTab === itemProp.tabIndex) {
            this.clearOverflowResize();
        }
        //Check whether the tab items are rendered
        const contentEle = this.tabObj.items[itemProp.tabIndex].content;
        const groupEle = contentEle.querySelector('#' + groupId);
        const groupContainer = groupEle.querySelector('#' + group.id + CONTAINER_ID);
        let dropdownElement;
        let dropdown;
        if (contentEle.innerHTML !== '') {
            if (itemProp.group.showLauncherIcon) {
                this.removeLauncherIcon(itemProp.group.id, null, contentEle);
            }
            if (this.activeLayout === RibbonLayout.Simplified) {
                dropdownElement = itemProp.group.enableGroupOverflow ?
                    contentEle.querySelector('#' + itemProp.group.id + GROUPOF_BUTTON_ID) : null;
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
                    for (const collection of itemProp.group.collections) {
                        for (const item of collection.items) {
                            this.removeItemElement(contentEle, item, dropdown);
                        }
                    }
                    const collectionElements = groupEle.querySelectorAll('.e-ribbon-collection');
                    // eslint-disable-next-line @typescript-eslint/tslint/config
                    collectionElements.forEach(collectionEle => { collectionEle.remove(); });
                    if (group.orientation) {
                        const groupContent = groupContainer.querySelector('.e-ribbon-group-content');
                        const removeCss = groupContent.classList.value.match(/(e-ribbon-[column|row]+)/g);
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
                    const ofGroupContainer = dropdown.target.querySelector('#' + itemProp.group.id + CONTAINER_ID);
                    if (ofGroupContainer && ofGroupContainer.childElementCount === 1) {
                        ofGroupContainer.remove();
                    }
                    const ofTabContainer = dropdown.target.querySelector('#' + this.tabs[parseInt(itemProp.tabIndex.toString(), 10)].id + OVERFLOW_ID);
                    if (ofTabContainer && ofTabContainer.childElementCount === 0) {
                        ofTabContainer.remove();
                    }
                }
            }
        }
        const ribbongroup = itemProp.group;
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
                const groupContent = groupContainer.querySelector('.e-ribbon-group-content');
                groupContent.classList.add(((ribbongroup.orientation === 'Column') || (this.activeLayout === 'Simplified')) ? RIBBON_COLUMN : RIBBON_ROW);
                const elements = this.createCollection(ribbongroup.collections, ribbongroup.orientation, ribbongroup.id, ribbongroup.header, ribbongroup.enableGroupOverflow, itemProp.tabIndex, groupContainer);
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
                    const overflowHeader = dropdown.target.querySelector('#' + group.id + HEADER_ID);
                    if (overflowHeader) {
                        overflowHeader.innerText = ribbongroup.header;
                    }
                }
                else if (this.activeLayout === RibbonLayout.Classic && !ribbongroup.isCollapsed) {
                    groupEle.querySelector('.e-ribbon-group-header').innerText = ribbongroup.header;
                }
                else if (this.activeLayout === RibbonLayout.Classic && ribbongroup.isCollapsed) {
                    const overflowEle = groupEle.querySelector('#' + ribbongroup.id + OVERFLOW_ID + DROPDOWN_ID);
                    // need to set instance for dropdown
                    const dropDownBtn = getInstance(overflowEle, DropDownButton);
                    const overflowHeader = dropDownBtn.target.querySelector('#' + group.id + HEADER_ID);
                    if (overflowHeader) {
                        overflowHeader.innerText = ribbongroup.header;
                    }
                }
            }
        }
    }
    /**
     * collection - Gets the ribbon collection to be updated. The id of the collection is a required property. Other properties are optional.
     *
     * @param {RibbonCollectionModel} collection - Gets the ribbon collection model.
     * @returns {void}
     */
    updateCollection(collection) {
        const collectionId = collection.id;
        const itemProp = getCollection(this.tabs, collectionId);
        if (!itemProp) {
            return;
        }
        if (this.selectedTab === itemProp.tabIndex) {
            this.clearOverflowResize();
        }
        //Check whether the tab items are rendered
        const contentEle = this.tabObj.items[itemProp.tabIndex].content;
        const collectionEle = contentEle.querySelector('#' + collectionId);
        if (contentEle.innerHTML !== '') {
            let dropdownElement;
            let dropdown;
            if (this.activeLayout === RibbonLayout.Simplified) {
                dropdownElement = itemProp.group.enableGroupOverflow ?
                    contentEle.querySelector('#' + itemProp.group.id + GROUPOF_BUTTON_ID) : null;
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
                    for (const item of itemProp.collection.items) {
                        this.removeItemElement(contentEle, item, dropdown);
                    }
                }
            }
        }
        const ribboncollection = itemProp.collection;
        ribboncollection.setProperties(collection, true);
        ribboncollection.setProperties({ items: this.checkID(ribboncollection.items, 'item', ribboncollection.id) }, true);
        this.validateItemSize();
        if (contentEle.innerHTML !== '') {
            if (collection.items) {
                const groupContainer = contentEle.querySelector('#' + itemProp.group.id + CONTAINER_ID);
                const elements = this.createItems(ribboncollection.items, itemProp.group.orientation, itemProp.group.id, itemProp.group.header, itemProp.group.enableGroupOverflow, itemProp.tabIndex, groupContainer);
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
    }
    /**
     * item - Gets the ribbon item to be updated. The id of the item is a required property. Other properties are optional.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @returns {void}
     */
    updateItem(item) {
        const itemId = item.id;
        const itemProp = getItem(this.tabs, itemId);
        if (!itemProp) {
            return;
        }
        if (this.selectedTab === itemProp.tabIndex) {
            this.clearOverflowResize();
        }
        //Check whether the tab items are rendered
        const contentEle = this.tabObj.items[itemProp.tabIndex].content;
        const groupEle = contentEle.querySelector('#' + itemProp.group.id);
        const groupContainer = groupEle.querySelector('#' + itemProp.group.id + CONTAINER_ID);
        let itemContainer = null;
        let itemEle = null;
        let dropdownElement;
        let dropdown;
        if (contentEle.innerHTML !== '') {
            if (this.activeLayout === RibbonLayout.Simplified) {
                dropdownElement = itemProp.group.enableGroupOverflow ?
                    contentEle.querySelector('#' + itemProp.group.id + GROUPOF_BUTTON_ID) : null;
                dropdown = dropdownElement ? getComponent(dropdownElement, DropDownButton) : this.overflowDDB;
            }
            if (this.activeLayout === RibbonLayout.Simplified && itemProp.item.displayOptions === DisplayMode.Overflow) {
                itemContainer = dropdown.target.querySelector('#' + itemId + CONTAINER_ID);
                itemEle = dropdown.target.querySelector('#' + itemId);
                if (item.displayOptions && item.displayOptions !== DisplayMode.Overflow) {
                    const collectionEle = groupContainer.querySelector('#' + itemProp.collection.id);
                    if (collectionEle) {
                        collectionEle.appendChild(itemContainer);
                    }
                }
            }
            else {
                itemContainer = groupContainer.querySelector('#' + itemId + CONTAINER_ID);
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
            const removeCss = itemContainer.classList.value.match(/(e-ribbon-[large|medium|small]+-item)/g);
            if (removeCss) {
                removeClass([itemContainer], removeCss);
            }
        }
        const ribbonItem = itemProp.item;
        ribbonItem.setProperties(item, true);
        this.validateItemSize();
        if (contentEle.innerHTML !== '') {
            if (!(this.activeLayout === RibbonLayout.Simplified && ribbonItem.displayOptions === DisplayMode.Overflow)) {
                itemContainer = groupContainer.querySelector('#' + itemId + CONTAINER_ID);
            }
            else {
                itemContainer = dropdown.target.querySelector('#' + itemId + CONTAINER_ID);
            }
            // To avoid undefined items condition is added
            if (ribbonItem.ribbonTooltipSettings && isTooltipPresent(ribbonItem.ribbonTooltipSettings)) {
                itemContainer.classList.add(RIBBON_TOOLTIP_TARGET);
                this.tooltipData.push({ id: itemContainer.id, data: ribbonItem.ribbonTooltipSettings });
            }
            let size = ribbonItem.activeSize;
            if (this.activeLayout === 'Simplified') {
                size = ((ribbonItem.allowedSizes === RibbonItemSize.Large) || (ribbonItem.allowedSizes & RibbonItemSize.Medium) ||
                    (ribbonItem.displayOptions === DisplayMode.Overflow)) ? RibbonItemSize.Medium : RibbonItemSize.Small;
                ribbonItem.setProperties({ activeSize: size }, true);
            }
            if (size & RibbonItemSize.Large) {
                itemContainer.classList.add(RIBBON_LARGE_ITEM, RIBBON_CONTENT_HEIGHT);
            }
            else {
                itemContainer.classList.add((size & RibbonItemSize.Medium) ? RIBBON_MEDIUM_ITEM : RIBBON_SMALL_ITEM);
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
    }
    removeItemElement(contentEle, item, dropdown) {
        let ele = null;
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
            ele.closest('#' + item.id + CONTAINER_ID).remove();
        }
    }
    /**
     * Enables ribbon item.
     *
     * @param {string} itemId - Gets the item ID.
     * @returns {void}
     */
    enableItem(itemId) {
        this.enableDisableItem(itemId, false);
    }
    /**
     * Disables ribbon item.
     *
     * @param {string} itemId - Gets the item ID.
     * @returns {void}
     */
    disableItem(itemId) {
        this.enableDisableItem(itemId, true);
    }
    enableDisableItem(itemId, isDisabled) {
        const itemProp = getItem(this.tabs, itemId);
        if (!itemProp) {
            return;
        }
        itemProp.item.setProperties({ disabled: isDisabled }, true);
        const ele = getItemElement(this, itemId, itemProp);
        if (ele) {
            const itemEle = closest(ele, '.e-ribbon-item');
            itemEle.classList.toggle(DISABLED_CSS, itemProp.item.disabled);
            const moduleName = this.getItemModuleName(itemProp.item);
            if (moduleName !== 'template') {
                updateControlDisabled(ele, moduleName, isDisabled);
            }
            else {
                ele.classList.toggle(DISABLED_CSS, isDisabled);
                ele.toggleAttribute('disabled', isDisabled);
            }
        }
    }
    unwireEvents() {
        EventHandler.remove(window, 'resize', this.resizeHandler);
    }
    destroy() {
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
        super.destroy();
        this.tabObj.destroy();
        this.tabObj = undefined;
        remove(this.element.querySelector('#' + this.element.id + TAB_ID));
        this.element.style.removeProperty(RIBBON_FILE_MENU_WIDTH);
        this.element.style.removeProperty(RIBBON_HELP_PANE_TEMPLATE_WIDTH);
        this.element.style.removeProperty('width');
        if (this.cssClass) {
            removeClass([this.element], this.cssClass.split(SPACE));
        }
        this.element.classList.remove(RTL_CSS, RIBBON_SIMPLIFIED_MODE, RIBBON_OVERFLOW, RIBBON_COLLAPSIBLE, RIBBON_MINIMIZE, 'e-rbn');
        this.unwireEvents();
    }
    /**
     * Called internally if any of the property value changed.
     *
     * @param  {RibbonModel} newProp - Specifies new properties
     * @param  {RibbonModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    onPropertyChanged(newProp, oldProp) {
        for (const prop of Object.keys(newProp)) {
            switch (prop) {
                case 'activeLayout':
                    this.switchLayout();
                    break;
                case 'cssClass':
                    if (oldProp.cssClass) {
                        this.element.classList.remove(...oldProp.cssClass.split(SPACE));
                    }
                    if (newProp.cssClass) {
                        this.element.classList.add(...newProp.cssClass.split(SPACE));
                    }
                    break;
                case 'isMinimized':
                    this.element.classList.toggle(RIBBON_MINIMIZE, this.isMinimized);
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
                    this.element.classList.toggle(RTL_CSS, this.enableRtl);
                    this.updateCommonProperty({ enableRtl: newProp.enableRtl });
                    if (this.scrollModule) {
                        this.scrollModule.setProperties({ enableRtl: newProp.enableRtl });
                    }
                    break;
                case 'launcherIconCss':
                    for (let i = 0; i < this.tabs.length; i++) {
                        const tabContent = this.tabObj.items[parseInt(i.toString(), 10)].content;
                        const tab = this.tabs[parseInt(i.toString(), 10)];
                        if (tabContent.querySelector('.' + RIBBON_GROUP)) {
                            for (const group of tab.groups) {
                                if (group.showLauncherIcon) {
                                    const className = RIBBON_LAUNCHER_ICON_ELE + ' ' + (this.launcherIconCss || RIBBON_LAUNCHER_ICON);
                                    if (group.isCollapsed) {
                                        const element = tabContent.querySelector('#' + group.id + OVERFLOW_ID + DROPDOWN_ID);
                                        const dropdown = getComponent(element, DropDownButton);
                                        const launcherIconEle = dropdown.target.querySelector('#' + group.id + LAUNCHER_ID);
                                        launcherIconEle.className = className;
                                    }
                                    else {
                                        const element = tabContent.querySelector('#' + group.id + LAUNCHER_ID);
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
                    const toolbarEle = this.tabObj['tbObj'];
                    toolbarEle.refreshOverflow();
                    break;
                case 'helpPaneTemplate':
                    if (this.ribbonTempEle) {
                        remove(this.ribbonTempEle);
                        this.ribbonTempEle = null;
                        this.tabObj.element.style.setProperty(RIBBON_HELP_PANE_TEMPLATE_WIDTH, '0px');
                    }
                    if (this.helpPaneTemplate) {
                        this.createHelpPaneTemplate();
                    }
                    const toolbar = this.tabObj['tbObj'];
                    toolbar.refreshOverflow();
                    break;
            }
        }
    }
};
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

/**
 * Ribbon modules
 */

/**
 * Defines the items of Ribbon.
 */
class RibbonFileMenu {
    constructor(parent) {
        this.parent = parent;
    }
    getModuleName() {
        return 'ribbonFileMenu';
    }
    destroy() {
        if (this.fileMenuDDB) {
            this.destroyDDB();
        }
        this.parent = null;
    }
    /**
     * Creates File Menu
     *
     * @param {FileMenuSettingsModel} fileMenuOptions - Gets the property of filemenu.
     * @returns {void}
     * @hidden
     */
    createFileMenu(fileMenuOptions) {
        if (!fileMenuOptions.visible) {
            return;
        }
        this.ddbElement = this.parent.createElement('button', {
            id: this.parent.element.id + RIBBON_FILE_MENU_ID
        });
        const tabEle = this.parent.tabObj.element;
        const toolbarEle = tabEle.querySelector('.e-toolbar');
        tabEle.insertBefore(this.ddbElement, toolbarEle);
        this.fileMenuDDB = new DropDownButton({
            content: fileMenuOptions.text,
            enableRtl: this.parent.enableRtl,
            cssClass: 'e-ribbon-file-menu e-caret-hide',
            created: () => {
                tabEle.style.setProperty(RIBBON_FILE_MENU_WIDTH, this.ddbElement.offsetWidth + 'px');
            },
            beforeClose: this.ddbBeforeEvent.bind(this, false),
            beforeOpen: this.ddbBeforeEvent.bind(this, true),
            close: this.ddbAfterEvent.bind(this, false),
            open: this.ddbAfterEvent.bind(this, true)
        }, this.ddbElement);
        if (this.parent.fileMenu.popupTemplate) {
            this.fileMenuDDB.setProperties({ target: this.parent.fileMenu.popupTemplate });
        }
        else {
            this.createRibbonMenu(fileMenuOptions);
        }
        this.parent.tabObj.refreshActiveTabBorder();
        this.addFileMenuTooltip(fileMenuOptions);
    }
    addFileMenuTooltip(fileMenuOptions) {
        if (isTooltipPresent(fileMenuOptions.ribbonTooltipSettings)) {
            this.ddbElement.classList.add(RIBBON_TOOLTIP_TARGET);
            this.parent.tooltipData.push({ id: this.ddbElement.id, data: fileMenuOptions.ribbonTooltipSettings });
        }
    }
    ddbBeforeEvent(isOpen, args) {
        //args.event is null when dropdown button is closed using a method call
        if (!isOpen && args.event && args.event.target.closest('.e-ribbon-menu')) {
            args.cancel = true;
        }
        const event = isOpen ? this.parent.fileMenu.beforeOpen :
            this.parent.fileMenu.beforeClose;
        if (event) {
            const eventArgs = { cancel: args.cancel, element: args.element, event: args.event };
            event.call(this, eventArgs);
            args.cancel = eventArgs.cancel;
        }
    }
    ddbAfterEvent(isOpen, args) {
        const element = isOpen ? this.fileMenuDDB.target : this.fileMenuDDB.element;
        element.focus();
        const event = isOpen ? this.parent.fileMenu.open : this.parent.fileMenu.close;
        if (event) {
            const eventArgs = { element: args.element };
            event.call(this, eventArgs);
        }
    }
    //Clone RibbonMenuItems before assigning to avoid reference issues.
    cloneMenuItem(items) {
        const itemsList = [];
        for (let i = 0; i < items.length; i++) {
            const item = items[parseInt(i.toString(), 10)];
            itemsList.push({
                iconCss: item.iconCss,
                id: item.id,
                separator: item.separator,
                text: item.text,
                url: item.url,
                items: this.cloneMenuItem(item.items)
            });
        }
        return itemsList;
    }
    createRibbonMenu(menuOptions) {
        const ulElem = this.parent.createElement('ul', {
            id: this.parent.element.id + RIBBON_FILE_MENU_LIST
        });
        this.fileMenuDDB.setProperties({ target: ulElem });
        this.menuctrl = new Menu({
            orientation: 'Vertical',
            enableRtl: this.parent.enableRtl,
            cssClass: 'e-ribbon-menu',
            animationSettings: menuOptions.animationSettings,
            items: this.cloneMenuItem(menuOptions.menuItems),
            showItemOnClick: menuOptions.showItemOnClick,
            template: menuOptions.itemTemplate,
            beforeClose: this.menuBeforeEvent.bind(this, false),
            beforeOpen: this.menuBeforeEvent.bind(this, true),
            beforeItemRender: this.beforeItemRender.bind(this),
            onClose: this.menuAfterEvent.bind(this, false),
            onOpen: this.menuAfterEvent.bind(this, true),
            select: this.menuSelect.bind(this)
        }, ulElem);
        EventHandler.add(ulElem, 'keydown', (e) => {
            if (e.key === 'Tab') {
                this.fileMenuDDB.toggle();
            }
        }, this);
    }
    menuBeforeEvent(isOpen, args) {
        const event = isOpen ? this.parent.fileMenu.beforeOpen :
            this.parent.fileMenu.beforeClose;
        if (event) {
            const eventArgs = {
                cancel: args.cancel, element: args.element, event: args.event,
                items: args.items, parentItem: args.parentItem
            };
            event.call(this, eventArgs);
            args.cancel = eventArgs.cancel;
        }
    }
    menuAfterEvent(isOpen, args) {
        const event = isOpen ? this.parent.fileMenu.open : this.parent.fileMenu.close;
        if (event) {
            const eventArgs = { element: args.element, items: args.items, parentItem: args.parentItem };
            event.call(this, eventArgs);
        }
    }
    beforeItemRender(args) {
        const event = this.parent.fileMenu.beforeItemRender;
        if (event) {
            const eventArgs = { element: args.element, item: args.item };
            event.call(this, eventArgs);
        }
    }
    menuSelect(args) {
        const event = this.parent.fileMenu.select;
        if (event) {
            const eventArgs = { element: args.element, item: args.item, event: args.event };
            event.call(this, eventArgs);
            if (!args.element.classList.contains('e-menu-caret-icon')) {
                this.fileMenuDDB.toggle();
            }
        }
    }
    /**
     * setRtl
     *
     * @param {commonProperties} commonProp - Get the common property of ribbon.
     * @returns {void}
     * @hidden
     */
    setCommonProperties(commonProp) {
        if (this.fileMenuDDB) {
            this.fileMenuDDB.setProperties(commonProp);
            if (this.menuctrl) {
                this.menuctrl.setProperties(commonProp);
            }
        }
    }
    /**
     * Update FileMenu
     *
     * @param {FileMenuSettingsModel} fileMenuOptions - Gets the property of filemenu.
     * @returns {void}
     * @hidden
     */
    updateFileMenu(fileMenuOptions) {
        if (fileMenuOptions.visible) {
            if (this.fileMenuDDB) {
                if (fileMenuOptions.text) {
                    this.fileMenuDDB.setProperties({
                        content: fileMenuOptions.text
                    });
                    this.parent.tabObj.element.style.setProperty(RIBBON_FILE_MENU_WIDTH, this.ddbElement.offsetWidth + 'px');
                }
                if (fileMenuOptions.popupTemplate) {
                    if (this.menuctrl) {
                        this.destroyMenu();
                    }
                    this.fileMenuDDB.setProperties({ target: fileMenuOptions.popupTemplate });
                }
                else {
                    if (this.menuctrl) {
                        this.menuctrl.setProperties({
                            animationSettings: fileMenuOptions.animationSettings,
                            items: this.cloneMenuItem(fileMenuOptions.menuItems),
                            showItemOnClick: fileMenuOptions.showItemOnClick,
                            template: fileMenuOptions.itemTemplate
                        });
                    }
                    else {
                        this.createRibbonMenu(fileMenuOptions);
                    }
                }
                this.removeFileMenuTooltip();
                this.addFileMenuTooltip(fileMenuOptions);
            }
            else {
                this.createFileMenu(fileMenuOptions);
            }
        }
        else if (this.fileMenuDDB) {
            this.destroyDDB();
        }
        this.parent.tabObj.refreshActiveTabBorder();
    }
    destroyMenu() {
        if (this.menuctrl) {
            this.menuctrl.destroy();
            this.menuctrl = null;
        }
    }
    destroyDDB() {
        this.removeFileMenuTooltip();
        const tabEle = this.parent.tabObj.element;
        tabEle.style.removeProperty(RIBBON_FILE_MENU_WIDTH);
        this.destroyMenu();
        this.fileMenuDDB.destroy();
        this.fileMenuDDB = null;
        remove(this.ddbElement);
        this.ddbElement = null;
    }
    removeFileMenuTooltip() {
        const index = getIndex(this.parent.tooltipData, (e) => { return e.id === this.ddbElement.id; });
        if (index !== -1) {
            this.ddbElement.classList.remove(RIBBON_TOOLTIP_TARGET);
            this.parent.tooltipData.splice(index, 1);
        }
    }
    /**
     * Add items to FileMenu.
     *
     * @param {MenuItemModel[]} items - Gets the items to be added.
     * @param {string} target - Gets the target item to add the items.
     * @param {boolean} isAfter - Gets the boolean value to add the items after or before the target item.
     * @param {boolean} isUniqueId - Gets whether the target provided is uniqueId or not.
     * @returns {void}
     */
    addItems(items, target, isAfter, isUniqueId) {
        if (isAfter) {
            this.menuctrl.insertAfter(items, target, isUniqueId);
        }
        else {
            this.menuctrl.insertBefore(items, target, isUniqueId);
        }
        this.parent.fileMenu.setProperties({ menuItems: this.menuctrl.items }, true);
    }
    /**
     * Remove items from FileMenu.
     *
     * @param {string[]} items - Gets the items to be removed.
     * @param {boolean} isUniqueId - Gets whether the target provided is uniqueId or not.
     * @returns {void}
     */
    removeItems(items, isUniqueId) {
        this.menuctrl.removeItems(items, isUniqueId);
        this.parent.fileMenu.setProperties({ menuItems: this.menuctrl.items }, true);
    }
    /**
     * Enable items in FileMenu.
     *
     * @param {string[]} items - Gets the items to be enabled.
     * @param {boolean} isUniqueId - Gets whether the target provided is uniqueId or not.
     * @returns {void}
     */
    enableItems(items, isUniqueId) {
        this.menuctrl.enableItems(items, true, isUniqueId);
        this.parent.fileMenu.setProperties({ menuItems: this.menuctrl.items }, true);
    }
    /**
     * Disable items in FileMenu.
     *
     * @param {string[]} items - Gets the items to be disabled.
     * @param {boolean} isUniqueId - Gets whether the target provided is uniqueId or not.
     * @returns {void}
     */
    disableItems(items, isUniqueId) {
        this.menuctrl.enableItems(items, false, isUniqueId);
        this.parent.fileMenu.setProperties({ menuItems: this.menuctrl.items }, true);
    }
    /**
     * Update items in FileMenu.
     *
     * @param {MenuItem} item - Gets the item to be updated.
     * @param {boolean} id - Gets the id of the item to be updated.
     * @param {boolean} isUniqueId - Gets whether the id provided is uniqueId or not.
     * @returns {void}
     */
    setItem(item, id, isUniqueId) {
        this.menuctrl.setItem(item, id, isUniqueId);
        this.menuctrl.refresh();
        this.parent.fileMenu.setProperties({ menuItems: this.menuctrl.items }, true);
    }
}

/**
 * Ribbon modules
 */

// export all modules from current location
// example: export * from './module'

export { Ribbon, RibbonLayout, ItemOrientation, RibbonItemSize, DisplayMode, RibbonItemType, ITEM_VERTICAL_CENTER, EXPAND_COLLAPSE_ICON, OVERFLOW_ICON, VERTICAL_DDB, DISABLED_CSS, RTL_CSS, RIBBON_HOVER, RIBBON_CONTROL, RIBBON_POPUP_CONTROL, RIBBON_POPUP_OPEN, SPACE, HORIZONTAL_SCROLLBAR, HIDE_CSS, RIBBON_TAB, RIBBON_TAB_ACTIVE, RIBBON_TAB_ITEM, RIBBON_COLLAPSE_BUTTON, RIBBON_EXPAND_BUTTON, RIBBON_COLLAPSIBLE, RIBBON_OVERALL_OF_BUTTON, RIBBON_GROUP_OF_BUTTON, RIBBON_OVERFLOW_TARGET, RIBBON_OVERFLOW, TAB_CONTENT, RIBBON_MINIMIZE, RIBBON_GROUP, RIBBON_GROUP_CONTAINER, RIBBON_OF_TAB_CONTAINER, RIBBON_OF_GROUP_CONTAINER, RIBBON_GROUP_CONTENT, RIBBON_GROUP_HEADER, RIBBON_OVERFLOW_HEADER, RIBBON_GROUP_OVERFLOW, RIBBON_GROUP_OVERFLOW_DDB, RIBBON_LAUNCHER, RIBBON_LAUNCHER_ICON_ELE, RIBBON_LAUNCHER_ICON, RIBBON_COLLECTION, RIBBON_ITEM, RIBBON_ROW, RIBBON_COLUMN, RIBBON_LARGE_ITEM, RIBBON_MEDIUM_ITEM, RIBBON_SMALL_ITEM, RIBBON_CONTENT_HEIGHT, DROPDOWNBUTTON, DROPDOWNBUTTON_HIDE, RIBBON_TEMPLATE, RIBBON_HELP_TEMPLATE, RIBBON_TOOLTIP, RIBBON_TOOLTIP_TARGET, RIBBON_TOOLTIP_TITLE, RIBBON_TOOLTIP_CONTENT, RIBBON_TOOLTIP_ICON, RIBBON_TOOLTIP_CONTAINER, RIBBON_TEXT_CONTAINER, RIBBON_SIMPLIFIED_MODE, TAB_ID, GROUP_ID, COLLECTION_ID, ITEM_ID, COLLAPSE_BUTTON_ID, OVRLOF_BUTTON_ID, GROUPOF_BUTTON_ID, HEADER_ID, LAUNCHER_ID, CONTENT_ID, CONTAINER_ID, OVERFLOW_ID, DROPDOWN_ID, RIBBON_FILE_MENU_ID, RIBBON_FILE_MENU_LIST, RIBBON_HELP_PANE_TEMPLATE_ID, RIBBON_FILE_MENU_WIDTH, RIBBON_HELP_PANE_TEMPLATE_WIDTH, getIndex, getTemplateFunction, getItem, getCollection, getGroup, destroyControl, updateCommonProperty, updateControlDisabled, getItemElement, isTooltipPresent, setToolTipContent, createTooltip, destroyTooltip, updateTooltipProp, RibbonTab, RibbonGroup, RibbonCollection, RibbonItem, RibbonButtonSettings, RibbonCheckBoxSettings, RibbonColorPickerSettings, RibbonComboBoxSettings, RibbonDropDownSettings, RibbonSplitButtonSettings, FileMenuSettings, RibbonTooltip, RibbonButton, RibbonCheckBox, RibbonColorPicker, RibbonComboBox, RibbonDropDown, RibbonSplitButton, RibbonFileMenu };
//# sourceMappingURL=ej2-ribbon.es2015.js.map
