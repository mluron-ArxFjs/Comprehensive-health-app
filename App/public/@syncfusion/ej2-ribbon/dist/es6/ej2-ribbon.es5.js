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

var __extends$5 = (undefined && undefined.__extends) || (function () {
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
var __decorate$5 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the ribbon button item.
 */
var RibbonButtonSettings = /** @__PURE__ @class */ (function (_super) {
    __extends$5(RibbonButtonSettings, _super);
    function RibbonButtonSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {Object} prop - Gets the property of button.
     * @param {boolean} muteOnChange - Gets the boolean value of muteOnChange.
     * @returns {void}
     * @private
     */
    RibbonButtonSettings.prototype.setProperties = function (prop, muteOnChange) {
        _super.prototype.setProperties.call(this, prop, muteOnChange);
    };
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
    return RibbonButtonSettings;
}(ChildProperty));

var __extends$6 = (undefined && undefined.__extends) || (function () {
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
var __decorate$6 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the ribbon checkbox item.
 */
var RibbonCheckBoxSettings = /** @__PURE__ @class */ (function (_super) {
    __extends$6(RibbonCheckBoxSettings, _super);
    function RibbonCheckBoxSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {Object} prop - Gets the property of checkbox.
     * @param {boolean} muteOnChange - Gets the boolean value of muteOnChange.
     * @returns {void}
     * @private
     */
    RibbonCheckBoxSettings.prototype.setProperties = function (prop, muteOnChange) {
        _super.prototype.setProperties.call(this, prop, muteOnChange);
    };
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
    return RibbonCheckBoxSettings;
}(ChildProperty));

var __extends$7 = (undefined && undefined.__extends) || (function () {
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
var __decorate$7 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the ribbon color picker.
 */
var RibbonColorPickerSettings = /** @__PURE__ @class */ (function (_super) {
    __extends$7(RibbonColorPickerSettings, _super);
    function RibbonColorPickerSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {Object} prop - Gets the property of colorpicker.
     * @param {boolean} muteOnChange - Gets the boolean value of muteOnChange.
     * @returns {void}
     * @private
     */
    RibbonColorPickerSettings.prototype.setProperties = function (prop, muteOnChange) {
        _super.prototype.setProperties.call(this, prop, muteOnChange);
    };
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
    return RibbonColorPickerSettings;
}(ChildProperty));

var __extends$8 = (undefined && undefined.__extends) || (function () {
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
var __decorate$8 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the ribbon combobox item.
 */
var RibbonComboBoxSettings = /** @__PURE__ @class */ (function (_super) {
    __extends$8(RibbonComboBoxSettings, _super);
    function RibbonComboBoxSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {Object} prop - Gets the property of combobox.
     * @param {boolean} muteOnChange - Gets the boolean value of muteOnChange.
     * @returns {void}
     * @private
     */
    RibbonComboBoxSettings.prototype.setProperties = function (prop, muteOnChange) {
        _super.prototype.setProperties.call(this, prop, muteOnChange);
    };
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
    return RibbonComboBoxSettings;
}(ChildProperty));

var __extends$9 = (undefined && undefined.__extends) || (function () {
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
var __decorate$9 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the ribbon DropDownButton item.
 */
var RibbonDropDownSettings = /** @__PURE__ @class */ (function (_super) {
    __extends$9(RibbonDropDownSettings, _super);
    function RibbonDropDownSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {Object} prop - Gets the property of DropDown.
     * @param {boolean} muteOnChange - Gets the boolean value of muteOnChange.
     * @returns {void}
     * @private
     */
    RibbonDropDownSettings.prototype.setProperties = function (prop, muteOnChange) {
        _super.prototype.setProperties.call(this, prop, muteOnChange);
    };
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
    return RibbonDropDownSettings;
}(ChildProperty));

var __extends$10 = (undefined && undefined.__extends) || (function () {
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
var __decorate$10 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the ribbon SplitButton item.
 */
var RibbonSplitButtonSettings = /** @__PURE__ @class */ (function (_super) {
    __extends$10(RibbonSplitButtonSettings, _super);
    function RibbonSplitButtonSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {Object} prop - Gets the property of DropDown.
     * @param {boolean} muteOnChange - Gets the boolean value of muteOnChange.
     * @returns {void}
     * @private
     */
    RibbonSplitButtonSettings.prototype.setProperties = function (prop, muteOnChange) {
        _super.prototype.setProperties.call(this, prop, muteOnChange);
    };
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
    return RibbonSplitButtonSettings;
}(ChildProperty));

var __extends$11 = (undefined && undefined.__extends) || (function () {
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
var __decorate$11 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the ribbon tooltip.
 */
var RibbonTooltip = /** @__PURE__ @class */ (function (_super) {
    __extends$11(RibbonTooltip, _super);
    function RibbonTooltip() {
        return _super !== null && _super.apply(this, arguments) || this;
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
    return RibbonTooltip;
}(ChildProperty));

var __extends$4 = (undefined && undefined.__extends) || (function () {
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
var __decorate$4 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the ribbon item.
 */
var RibbonItem = /** @__PURE__ @class */ (function (_super) {
    __extends$4(RibbonItem, _super);
    function RibbonItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {Object} prop - Gets the property of item.
     * @param {boolean} muteOnChange - Gets the boolean value of muteOnChange.
     * @returns {void}
     * @private
     */
    RibbonItem.prototype.setProperties = function (prop, muteOnChange) {
        _super.prototype.setProperties.call(this, prop, muteOnChange);
    };
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
    return RibbonItem;
}(ChildProperty));

var __extends$3 = (undefined && undefined.__extends) || (function () {
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
var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the items of Ribbon.
 */
var RibbonCollection = /** @__PURE__ @class */ (function (_super) {
    __extends$3(RibbonCollection, _super);
    function RibbonCollection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {Object} prop - Gets the property of collection.
     * @param {boolean} muteOnChange - Gets the boolean value of muteOnChange.
     * @returns {void}
     * @private
     */
    RibbonCollection.prototype.setProperties = function (prop, muteOnChange) {
        _super.prototype.setProperties.call(this, prop, muteOnChange);
    };
    __decorate$3([
        Property('')
    ], RibbonCollection.prototype, "id", void 0);
    __decorate$3([
        Property('')
    ], RibbonCollection.prototype, "cssClass", void 0);
    __decorate$3([
        Collection([], RibbonItem)
    ], RibbonCollection.prototype, "items", void 0);
    return RibbonCollection;
}(ChildProperty));

var __extends$2 = (undefined && undefined.__extends) || (function () {
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
var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the ribbon group.
 */
var RibbonGroup = /** @__PURE__ @class */ (function (_super) {
    __extends$2(RibbonGroup, _super);
    function RibbonGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {Object} prop - Gets the property of Group.
     * @param {boolean} muteOnChange - Gets the boolean value of muteOnChange.
     * @returns {void}
     * @private
     */
    RibbonGroup.prototype.setProperties = function (prop, muteOnChange) {
        _super.prototype.setProperties.call(this, prop, muteOnChange);
    };
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
    return RibbonGroup;
}(ChildProperty));

var __extends$1 = (undefined && undefined.__extends) || (function () {
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
var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the ribbon tab.
 */
var RibbonTab = /** @__PURE__ @class */ (function (_super) {
    __extends$1(RibbonTab, _super);
    function RibbonTab() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {Object} prop - Gets the property of tab.
     * @param {boolean} muteOnChange - Gets the boolean value of muteOnChange.
     * @returns {void}
     * @private
     */
    RibbonTab.prototype.setProperties = function (prop, muteOnChange) {
        _super.prototype.setProperties.call(this, prop, muteOnChange);
    };
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
    return RibbonTab;
}(ChildProperty));

var __extends$12 = (undefined && undefined.__extends) || (function () {
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
var __decorate$12 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the ribbon file menu settings.
 */
var FileMenuSettings = /** @__PURE__ @class */ (function (_super) {
    __extends$12(FileMenuSettings, _super);
    function FileMenuSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {Object} prop - Gets the property of FileMenu.
     * @param {boolean} muteOnChange - Gets the boolean value of muteOnChange.
     * @returns {void}
     * @private
     */
    FileMenuSettings.prototype.setProperties = function (prop, muteOnChange) {
        _super.prototype.setProperties.call(this, prop, muteOnChange);
    };
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
    return FileMenuSettings;
}(ChildProperty));

// export * from './file-menu';

/**
 * Specifies the File Manager internal ID's
 */
/** @hidden */
var ITEM_VERTICAL_CENTER = 'e-ribbon-vertical-center';
/** @hidden */
var EXPAND_COLLAPSE_ICON = 'e-icons e-drop-icon';
/** @hidden */
var OVERFLOW_ICON = 'e-icons e-more-horizontal-1';
/** @hidden */
var VERTICAL_DDB = 'e-vertical';
/** @hidden */
var DISABLED_CSS = 'e-disabled';
/** @hidden */
var RTL_CSS = 'e-rtl';
/** @hidden */
var RIBBON_HOVER = 'e-ribbon-hover';
/** @hidden */
var RIBBON_CONTROL = 'e-ribbon-control';
/** @hidden */
var RIBBON_POPUP_CONTROL = 'e-ribbon-popup-control';
/** @hidden */
var RIBBON_POPUP_OPEN = 'e-ribbon-open';
/** @hidden */
var SPACE = ' ';
/** @hidden */
var HORIZONTAL_SCROLLBAR = 'e-hscroll-bar';
/** @hidden */
var HIDE_CSS = 'e-ribbon-hide';
/** @hidden */
var RIBBON_TAB = 'e-ribbon-tab';
/** @hidden */
var RIBBON_TAB_ACTIVE = 'e-ribbon-active';
/** @hidden */
var RIBBON_TAB_ITEM = 'e-ribbon-tab-item';
/** @hidden */
var RIBBON_COLLAPSE_BUTTON = 'e-ribbon-collapse-btn';
/** @hidden */
var RIBBON_EXPAND_BUTTON = 'e-ribbon-expand-btn';
/** @hidden */
var RIBBON_COLLAPSIBLE = 'e-ribbon-collapsible';
/** @hidden */
var RIBBON_OVERALL_OF_BUTTON = 'e-ribbon-overall-of-btn';
/** @hidden */
var RIBBON_GROUP_OF_BUTTON = 'e-ribbon-group-of-btn';
/** @hidden */
var RIBBON_OVERFLOW_TARGET = 'e-ribbon-overflow-target';
/** @hidden */
var RIBBON_OVERFLOW = 'e-ribbon-overflow';
/** @hidden */
var TAB_CONTENT = 'e-content';
/** @hidden */
var RIBBON_MINIMIZE = 'e-ribbon-minimize';
/** @hidden */
var RIBBON_GROUP = 'e-ribbon-group';
/** @hidden */
var RIBBON_GROUP_CONTAINER = 'e-ribbon-group-container';
/** @hidden */
var RIBBON_OF_TAB_CONTAINER = 'e-ribbon-of-tab';
/** @hidden */
var RIBBON_OF_GROUP_CONTAINER = 'e-ribbon-of-group-container';
/** @hidden */
var RIBBON_GROUP_CONTENT = 'e-ribbon-group-content';
/** @hidden */
var RIBBON_GROUP_HEADER = 'e-ribbon-group-header';
/** @hidden */
var RIBBON_OVERFLOW_HEADER = 'e-ribbon-overflow-header';
/** @hidden */
var RIBBON_GROUP_OVERFLOW = 'e-ribbon-group-overflow';
/** @hidden */
var RIBBON_GROUP_OVERFLOW_DDB = 'e-ribbon-group-overflow-ddb';
/** @hidden */
var RIBBON_LAUNCHER = 'e-ribbon-launcher';
/** @hidden */
var RIBBON_LAUNCHER_ICON_ELE = 'e-ribbon-launcher-icon';
/** @hidden */
var RIBBON_LAUNCHER_ICON = 'e-icons e-launcher';
/** @hidden */
var RIBBON_COLLECTION = 'e-ribbon-collection';
/** @hidden */
var RIBBON_ITEM = 'e-ribbon-item';
/** @hidden */
var RIBBON_ROW = 'e-ribbon-row';
/** @hidden */
var RIBBON_COLUMN = 'e-ribbon-column';
/** @hidden */
var RIBBON_LARGE_ITEM = 'e-ribbon-large-item';
/** @hidden */
var RIBBON_MEDIUM_ITEM = 'e-ribbon-medium-item';
/** @hidden */
var RIBBON_SMALL_ITEM = 'e-ribbon-small-item';
/** @hidden */
var RIBBON_CONTENT_HEIGHT = 'e-ribbon-content-height';
/** @hidden */
var DROPDOWNBUTTON = 'e-dropdown-btn';
/** @hidden */
var DROPDOWNBUTTON_HIDE = 'e-caret-hide';
/** @hidden */
var RIBBON_TEMPLATE = 'e-ribbon-template';
/** @hidden */
var RIBBON_HELP_TEMPLATE = 'e-ribbon-help-template';
/** @hidden */
var RIBBON_TOOLTIP = 'e-ribbon-tooltip';
/** @hidden */
var RIBBON_TOOLTIP_TARGET = 'e-ribbon-tooltip-target';
/** @hidden */
var RIBBON_TOOLTIP_TITLE = 'e-ribbon-tooltip-title';
/** @hidden */
var RIBBON_TOOLTIP_CONTENT = 'e-ribbon-tooltip-content';
/** @hidden */
var RIBBON_TOOLTIP_ICON = 'e-ribbon-tooltip-icon';
/** @hidden */
var RIBBON_TOOLTIP_CONTAINER = 'e-ribbon-tooltip-container';
/** @hidden */
var RIBBON_TEXT_CONTAINER = 'e-ribbon-text-container';
/** @hidden */
var RIBBON_SIMPLIFIED_MODE = 'e-ribbon-simplified-mode';
/** @hidden */
var TAB_ID = '_tab';
/** @hidden */
var GROUP_ID = '_group';
/** @hidden */
var COLLECTION_ID = '_collection';
/** @hidden */
var ITEM_ID = '_item';
/** @hidden */
var COLLAPSE_BUTTON_ID = '_collapsebutton';
/** @hidden */
var OVRLOF_BUTTON_ID = '_sim_ovrl_overflow';
/** @hidden */
var GROUPOF_BUTTON_ID = '_sim_grp_overflow';
/** @hidden */
var HEADER_ID = '_header';
/** @hidden */
var LAUNCHER_ID = '_launcher';
/** @hidden */
var CONTENT_ID = '_content';
/** @hidden */
var CONTAINER_ID = '_container';
/** @hidden */
var OVERFLOW_ID = '_overflow';
/** @hidden */
var DROPDOWN_ID = '_dropdown';
/** @hidden */
var RIBBON_FILE_MENU_ID = '_filemenu';
/** @hidden */
var RIBBON_FILE_MENU_LIST = '_filemenulist';
/** @hidden */
var RIBBON_HELP_PANE_TEMPLATE_ID = '_helppanetemplate';
/** @hidden */
var RIBBON_FILE_MENU_WIDTH = '--fileMenuWidth';
/** @hidden */
var RIBBON_HELP_PANE_TEMPLATE_WIDTH = '--helpTemplateWidth';

/**
 * Defines the items of Ribbon.
 */
var RibbonButton = /** @__PURE__ @class */ (function () {
    function RibbonButton(parent) {
        this.parent = parent;
    }
    RibbonButton.prototype.getModuleName = function () {
        return 'ribbonButton';
    };
    RibbonButton.prototype.destroy = function () {
        this.parent = null;
    };
    /**
     * Creates button.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @returns {void}
     * @hidden
     */
    RibbonButton.prototype.createButton = function (item, itemEle) {
        var _this = this;
        var buttonEle = this.parent.createElement('button', {
            id: item.id
        });
        itemEle.appendChild(buttonEle);
        var btnSettings = item.buttonSettings;
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
        buttonEle.onclick = function (e) {
            if (btnSettings.clicked) {
                btnSettings.clicked.call(_this, e);
            }
        };
        buttonEle.setAttribute('aria-label', btnSettings.content);
    };
    /**
     * Adds the additional event handlers as the item moved into overflow popup.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @param {DropDownButton} overflowButton - Gets the overflow button.
     * @returns {void}
     * @hidden
     */
    RibbonButton.prototype.addOverFlowEvents = function (item, itemEle, overflowButton) {
        var _this = this;
        var buttonEle = itemEle.querySelector('#' + item.id);
        buttonEle.setAttribute('data-control', item.type.toString());
        var buttonObj = getComponent(buttonEle, Button);
        buttonObj.setProperties({ cssClass: buttonObj.cssClass + SPACE + RIBBON_POPUP_CONTROL });
        buttonEle.onclick = function (e) {
            if (item.buttonSettings.clicked) {
                item.buttonSettings.clicked.call(_this, e);
            }
            overflowButton.toggle();
        };
    };
    /**
     * Removes the additional event handlers as the item moved from overflow popup.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @returns {void}
     * @hidden
     */
    RibbonButton.prototype.removeOverFlowEvents = function (item, itemEle) {
        var _this = this;
        var buttonEle = itemEle.querySelector('#' + item.id);
        var buttonObj = getComponent(buttonEle, Button);
        var cssClass = buttonObj.cssClass.split(SPACE);
        cssClass = cssClass.filter(function (value) { return value !== RIBBON_POPUP_CONTROL; });
        buttonObj.setProperties({ cssClass: cssClass.join(SPACE) });
        buttonEle.onclick = function (e) {
            if (item.buttonSettings.clicked) {
                item.buttonSettings.clicked.call(_this, e);
            }
        };
    };
    /**
     * Triggers the click action on the button.
     *
     * @param {string} controlId - Gets the control ID.
     * @returns {void}
     */
    RibbonButton.prototype.click = function (controlId) {
        var buttonEle = getItemElement(this.parent, controlId);
        if (!buttonEle) {
            return;
        }
        var buttonObj = getComponent(buttonEle, Button);
        buttonObj.click();
    };
    /**
     * Updates the button properties.
     *
     * @param {RibbonButtonSettingsModel} prop - Gets the button property.
     * @param {string} id - Gets the ID of button item.
     * @returns {void}
     */
    RibbonButton.prototype.updateButton = function (prop, id) {
        var itemProp = getItem(this.parent.tabs, id);
        if (!itemProp) {
            return;
        }
        merge(itemProp.item.buttonSettings, prop);
        var buttonEle = getItemElement(this.parent, id, itemProp);
        if (!buttonEle) {
            return;
        }
        var buttonObj = getComponent(buttonEle, Button);
        if (prop.cssClass) {
            prop.cssClass = (ITEM_VERTICAL_CENTER + SPACE + RIBBON_CONTROL + SPACE + prop.cssClass).trim();
        }
        if (prop.content) {
            prop.content = itemProp.item.activeSize === RibbonItemSize.Small ? '' : prop.content;
            buttonEle.setAttribute('aria-label', prop.content);
        }
        delete prop.clicked;
        buttonObj.setProperties(prop);
    };
    /**
     * Updates the button size.
     *
     * @param {HTMLElement} element - Gets the button element.
     * @param {RibbonItemModel} item - Gets the ribbon item.
     * @returns {void}
     * @hidden
     */
    RibbonButton.prototype.updateButtonSize = function (element, item) {
        var buttonObj = getComponent(element, Button);
        buttonObj.setProperties({
            iconPosition: item.activeSize === RibbonItemSize.Large ? 'Top' : 'Left',
            content: item.activeSize === RibbonItemSize.Small ? '' : item.buttonSettings.content
        });
    };
    return RibbonButton;
}());

/**
 * Defines the items of Ribbon.
 */
var RibbonCheckBox = /** @__PURE__ @class */ (function () {
    function RibbonCheckBox(parent) {
        this.parent = parent;
    }
    RibbonCheckBox.prototype.getModuleName = function () {
        return 'ribbonCheckBox';
    };
    RibbonCheckBox.prototype.destroy = function () {
        this.parent = null;
    };
    /**
     * Creates the check box.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @returns {void}
     * @hidden
     */
    RibbonCheckBox.prototype.createCheckBox = function (item, itemEle) {
        var _this = this;
        var inputEle = this.parent.createElement('input', {
            id: item.id
        });
        itemEle.appendChild(inputEle);
        var checkBoxSettings = item.checkBoxSettings;
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
            change: function (e) {
                if (checkBoxSettings.change) {
                    checkBoxSettings.change.call(_this, e);
                }
            }
        }, inputEle);
    };
    /**
     * Adds the additional event handlers as the item moved into overflow popup.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @param {DropDownButton} overflowButton - Gets the overflow button.
     * @returns {void}
     * @hidden
     */
    RibbonCheckBox.prototype.addOverFlowEvents = function (item, itemEle, overflowButton) {
        var _this = this;
        var inputEle = itemEle.querySelector('#' + item.id);
        inputEle.setAttribute('data-control', item.type.toString());
        var checkBoxObj = getComponent(inputEle, CheckBox);
        checkBoxObj.cssClass = checkBoxObj.cssClass + SPACE + RIBBON_POPUP_CONTROL;
        checkBoxObj.dataBind();
        checkBoxObj.change = function (e) {
            if (item.checkBoxSettings.change) {
                item.checkBoxSettings.change.call(_this, e);
            }
            overflowButton.toggle();
        };
    };
    /**
     * Removes the additional event handlers as the item moved from overflow popup.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @returns {void}
     * @hidden
     */
    RibbonCheckBox.prototype.removeOverFlowEvents = function (item, itemEle) {
        var _this = this;
        var inputEle = itemEle.querySelector('#' + item.id);
        var checkBoxObj = getComponent(inputEle, CheckBox);
        var cssClass = checkBoxObj.cssClass.split(SPACE);
        cssClass = cssClass.filter(function (value) { return value !== RIBBON_POPUP_CONTROL; });
        checkBoxObj.cssClass = cssClass.join(SPACE);
        checkBoxObj.dataBind();
        checkBoxObj.change = function (e) {
            if (item.checkBoxSettings.change) {
                item.checkBoxSettings.change.call(_this, e);
            }
        };
    };
    /**
     * Triggers the click action on the Checkbox.
     *
     * @param {string} controlId - Gets the control ID.
     * @returns {void}
     */
    RibbonCheckBox.prototype.click = function (controlId) {
        var inputEle = getItemElement(this.parent, controlId);
        if (!inputEle) {
            return;
        }
        var checkBoxObj = getComponent(inputEle, CheckBox);
        checkBoxObj.click();
    };
    /**
     * Updates the checkbox.
     *
     * @param {RibbonCheckBoxSettingsModel} prop - Gets the checkbox property.
     * @param {string} id - Gets the ID of checkbox.
     * @returns {void}
     */
    RibbonCheckBox.prototype.updateCheckBox = function (prop, id) {
        var itemProp = getItem(this.parent.tabs, id);
        if (!itemProp) {
            return;
        }
        merge(itemProp.item.checkBoxSettings, prop);
        var inputEle = getItemElement(this.parent, id, itemProp);
        if (!inputEle) {
            return;
        }
        if (prop.cssClass) {
            prop.cssClass = (RIBBON_CONTROL + SPACE + prop.cssClass).trim();
        }
        delete prop.change;
        var checkBoxObj = getComponent(inputEle, CheckBox);
        checkBoxObj.setProperties(prop);
    };
    return RibbonCheckBox;
}());

/**
 * Defines the items of Ribbon.
 */
var RibbonColorPicker = /** @__PURE__ @class */ (function () {
    function RibbonColorPicker(parent) {
        this.parent = parent;
    }
    RibbonColorPicker.prototype.getModuleName = function () {
        return 'ribbonColorPicker';
    };
    RibbonColorPicker.prototype.destroy = function () {
        this.parent = null;
    };
    /**
     * Creates the colorpicker.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @returns {void}
     * @hidden
     */
    RibbonColorPicker.prototype.createColorPicker = function (item, itemEle) {
        var _this = this;
        var inputEle = this.parent.createElement('input', {
            id: item.id
        });
        itemEle.appendChild(inputEle);
        var colorPickerSettings = item.colorPickerSettings;
        var colorPicker = new ColorPicker({
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
            beforeClose: function () {
                colorPicker.element.parentElement.classList.remove(RIBBON_POPUP_OPEN);
                if (colorPickerSettings.beforeClose) {
                    colorPickerSettings.beforeClose.call(_this);
                }
            },
            beforeOpen: colorPickerSettings.beforeOpen,
            beforeTileRender: colorPickerSettings.beforeTileRender,
            created: colorPickerSettings.created,
            change: colorPickerSettings.change,
            open: function () {
                colorPicker.element.parentElement.classList.add(RIBBON_POPUP_OPEN);
                if (colorPickerSettings.open) {
                    colorPickerSettings.open.call(_this);
                }
            },
            select: colorPickerSettings.select
        }, inputEle);
        var wrapper = colorPicker.element.parentElement;
        EventHandler.add(wrapper, 'mouseenter', this.toggleWrapperHover.bind(this, wrapper, true), this);
        EventHandler.add(wrapper, 'mouseleave', this.toggleWrapperHover.bind(this, wrapper, false), this);
    };
    RibbonColorPicker.prototype.toggleWrapperHover = function (wrapper, isAdd) {
        if (isAdd) {
            wrapper.classList.add(RIBBON_HOVER);
        }
        else {
            wrapper.classList.remove(RIBBON_HOVER);
        }
    };
    /**
     * Adds the additional event handlers as the item moved into overflow popup.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @param {DropDownButton} overflowButton - Gets the overflow button.
     * @returns {void}
     * @hidden
     */
    RibbonColorPicker.prototype.addOverFlowEvents = function (item, itemEle, overflowButton) {
        var _this = this;
        var colorPickerEle = itemEle.querySelector('#' + item.id);
        colorPickerEle.setAttribute('data-control', item.type.toString());
        var colorPickerObj = getComponent(colorPickerEle, ColorPicker);
        colorPickerObj.setProperties({ cssClass: colorPickerObj.cssClass + SPACE + RIBBON_POPUP_CONTROL });
        //Accessing the private property 'splitBtn' of ColorPicker component to get the colorpicker instance as there is no close event in colorpicker.
        var splitBtn = colorPickerObj['splitBtn'];
        var target;
        colorPickerObj.beforeClose = function (e) {
            target = e.event ? e.event.target : null;
            colorPickerObj.element.parentElement.classList.remove(RIBBON_POPUP_OPEN);
            if (item.colorPickerSettings.beforeClose) {
                item.colorPickerSettings.beforeClose.call(_this);
            }
        };
        splitBtn.close = function () {
            if (target && !target.closest('.e-ribbon-group-overflow-ddb')) {
                overflowButton.toggle();
            }
        };
    };
    /**
     * Removes the additional event handlers as the item moved from overflow popup.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @returns {void}
     * @hidden
     */
    RibbonColorPicker.prototype.removeOverFlowEvents = function (item, itemEle) {
        var _this = this;
        var colorPickerEle = itemEle.querySelector('#' + item.id);
        var colorPickerObj = getComponent(colorPickerEle, ColorPicker);
        var cssClass = colorPickerObj.cssClass.split(SPACE);
        cssClass = cssClass.filter(function (value) { return value !== RIBBON_POPUP_CONTROL; });
        colorPickerObj.setProperties({ cssClass: cssClass.join(SPACE) });
        var splitBtn = colorPickerObj['splitBtn'];
        //Accessing the private property 'splitBtn' of ColorPicker component to get the colorpicker instance as there is no close event in colorpicker.
        splitBtn.close = null;
        colorPickerObj.beforeClose = function (e) {
            colorPickerObj.element.parentElement.classList.remove(RIBBON_POPUP_OPEN);
            if (item.colorPickerSettings.beforeClose) {
                item.colorPickerSettings.beforeClose.call(_this);
            }
        };
    };
    RibbonColorPicker.prototype.getColorPickerObj = function (controlId) {
        var inputEle = getItemElement(this.parent, controlId);
        return inputEle ? getComponent(inputEle, ColorPicker) : null;
    };
    /**
     * Gets color value in specified type.
     *
     * @param {string} controlId -Gets the control ID.
     * @param {string} value - Specify the color value.
     * @param {string} type - Specify the type to which the specified color needs to be converted.
     * @returns {string} - Returns string.
     */
    RibbonColorPicker.prototype.getValue = function (controlId, value, type) {
        var colorPickerObj = this.getColorPickerObj(controlId);
        return colorPickerObj ? colorPickerObj.getValue(value, type) : '';
    };
    /**
     * To show/hide ColorPicker popup based on current state of the SplitButton.
     *
     * @param {string} controlId - set the id of the control.
     * @returns {void} - Returns void.
     */
    RibbonColorPicker.prototype.toggle = function (controlId) {
        var colorPickerObj = this.getColorPickerObj(controlId);
        if (!colorPickerObj) {
            return;
        }
        colorPickerObj.toggle();
    };
    /**
     * Updates the colorpicker properties.
     *
     * @param {RibbonColorPickerSettingsModel} prop - Gets the colorpicker property.
     * @param {string} id - Gets the ID of colorpicker.
     * @returns {void}
     */
    RibbonColorPicker.prototype.updateColorPicker = function (prop, id) {
        var itemProp = getItem(this.parent.tabs, id);
        if (!itemProp) {
            return;
        }
        merge(itemProp.item.checkBoxSettings, prop);
        var inputEle = getItemElement(this.parent, id, itemProp);
        if (!inputEle) {
            return;
        }
        if (prop.cssClass) {
            prop.cssClass = (RIBBON_CONTROL + SPACE + prop.cssClass).trim();
        }
        delete prop.beforeClose;
        delete prop.open;
        var colorPickerObj = getComponent(inputEle, ColorPicker);
        colorPickerObj.setProperties(prop);
    };
    /**
     * @param {HTMLElement} element - Gets the colorpicker element to be destroyed.
     * @returns {void}
     * @hidden
     */
    RibbonColorPicker.prototype.unwireColorPickerEvents = function (element) {
        var colorPickerObj = getComponent(element, ColorPicker);
        var wrapper = colorPickerObj.element.parentElement;
        EventHandler.remove(wrapper, 'mouseenter', this.toggleWrapperHover);
        EventHandler.remove(wrapper, 'mouseleave', this.toggleWrapperHover);
    };
    return RibbonColorPicker;
}());

/**
 * Defines the items of Ribbon.
 */
var RibbonComboBox = /** @__PURE__ @class */ (function () {
    function RibbonComboBox(parent) {
        this.parent = parent;
    }
    RibbonComboBox.prototype.getModuleName = function () {
        return 'ribbonComboBox';
    };
    RibbonComboBox.prototype.destroy = function () {
        this.parent = null;
    };
    /**
     * Creates the combobox.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @returns {void}
     * @hidden
     */
    RibbonComboBox.prototype.createComboBox = function (item, itemEle) {
        var _this = this;
        var inputEle = this.parent.createElement('input', {
            id: item.id
        });
        itemEle.appendChild(inputEle);
        var comboBoxSettings = item.comboBoxSettings;
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
            close: function (e) {
                if (comboBoxSettings.close) {
                    comboBoxSettings.close.call(_this, e);
                }
            },
            filtering: comboBoxSettings.filtering,
            change: comboBoxSettings.change,
            select: comboBoxSettings.select,
            created: comboBoxSettings.created
        }, inputEle);
    };
    /**
     * Adds the additional event handlers as the item moved into overflow popup.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @param {DropDownButton} overflowButton - Gets the overflow button.
     * @returns {void}
     * @hidden
     */
    RibbonComboBox.prototype.addOverFlowEvents = function (item, itemEle, overflowButton) {
        var _this = this;
        var inputEle = itemEle.querySelector('#' + item.id);
        inputEle.setAttribute('data-control', item.type.toString());
        var comboBoxObj = getComponent(inputEle, ComboBox);
        comboBoxObj.setProperties({ cssClass: comboBoxObj.cssClass + SPACE + RIBBON_POPUP_CONTROL });
        comboBoxObj.close = function (e) {
            var target = e.event ? e.event.target : null;
            if (item.comboBoxSettings.close) {
                item.comboBoxSettings.close.call(_this, e);
            }
            if (target && !target.closest('.e-ribbon-group-overflow-ddb')) {
                overflowButton.toggle();
            }
        };
    };
    /**
     * Removes the additional event handlers as the item moved from overflow popup.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @returns {void}
     * @hidden
     */
    RibbonComboBox.prototype.removeOverFlowEvents = function (item, itemEle) {
        var _this = this;
        var inputEle = itemEle.querySelector('#' + item.id);
        var comboBoxObj = getComponent(inputEle, ComboBox);
        var cssClass = comboBoxObj.cssClass.split(SPACE);
        cssClass = cssClass.filter(function (value) { return value !== RIBBON_POPUP_CONTROL; });
        comboBoxObj.setProperties({ cssClass: cssClass.join(SPACE) });
        comboBoxObj.close = function (e) {
            if (item.comboBoxSettings.close) {
                item.comboBoxSettings.close.call(_this, e);
            }
        };
    };
    RibbonComboBox.prototype.getComboBoxObj = function (controlId) {
        var inputEle = getItemElement(this.parent, controlId);
        return inputEle ? getComponent(inputEle, ComboBox) : null;
    };
    /**
     * To filter the data from given data source by using query
     *
     * @param  {string } controlId - set the id of the control in which methods needs to be called.
     * @param  {Object[] } dataSource - Set the data source to filter.
     * @param  {Query} query - Specify the query to filter the data.
     * @param  {FieldSettingsModel} fields - Specify the fields to map the column in the data table.
     * @returns {void}
     */
    RibbonComboBox.prototype.filter = function (controlId, dataSource, query, fields) {
        this.getComboBoxObj(controlId).filter(dataSource, query, fields);
    };
    /**
     * To open/close DropDownButton popup based on current state of the combobox.
     *
     * @param {string} controlId - Gets the id of the control.
     * @returns {void}
     */
    RibbonComboBox.prototype.hidePopup = function (controlId) {
        var comboBoxObj = this.getComboBoxObj(controlId);
        if (!comboBoxObj) {
            return;
        }
        comboBoxObj.hidePopup();
    };
    /**
     * To open/close DropDownButton popup based on current state of the combobox.
     *
     * @param {string} controlId - Gets the id of the control.
     * @returns {void}
     */
    RibbonComboBox.prototype.showPopup = function (controlId) {
        var comboBoxObj = this.getComboBoxObj(controlId);
        if (!comboBoxObj) {
            return;
        }
        comboBoxObj.showPopup();
    };
    /**
     * Updates the combobox properties.
     *
     * @param {RibbonComboBoxSettingsModel} prop - Gets the combobox property.
     * @param {string} id - Gets the ID of combobox.
     * @returns {void}
     */
    RibbonComboBox.prototype.updateComboBox = function (prop, id) {
        var itemProp = getItem(this.parent.tabs, id);
        if (!itemProp) {
            return;
        }
        merge(itemProp.item.comboBoxSettings, prop);
        var inputEle = getItemElement(this.parent, id, itemProp);
        if (!inputEle) {
            return;
        }
        if (prop.cssClass) {
            prop.cssClass = (RIBBON_CONTROL + SPACE + prop.cssClass).trim();
        }
        delete prop.close;
        var comboBoxObj = getComponent(inputEle, ComboBox);
        comboBoxObj.setProperties(prop);
    };
    return RibbonComboBox;
}());

/**
 * Defines the items of Ribbon.
 */
var RibbonDropDown = /** @__PURE__ @class */ (function () {
    function RibbonDropDown(parent) {
        this.parent = parent;
    }
    RibbonDropDown.prototype.getModuleName = function () {
        return 'ribbonDropDown';
    };
    RibbonDropDown.prototype.destroy = function () {
        this.parent = null;
    };
    /**
     * Creates DropDown.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @returns {void}
     * @hidden
     */
    RibbonDropDown.prototype.createDropDown = function (item, itemEle) {
        var _this = this;
        var buttonEle = this.parent.createElement('button', {
            id: item.id
        });
        itemEle.appendChild(buttonEle);
        var dropDownSettings = item.dropDownSettings;
        var cssClass = (ITEM_VERTICAL_CENTER + SPACE + RIBBON_CONTROL + SPACE + (dropDownSettings.cssClass ?
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
            beforeClose: function (e) {
                if (dropDownSettings.beforeClose) {
                    dropDownSettings.beforeClose.call(_this, e);
                }
            },
            beforeItemRender: dropDownSettings.beforeItemRender,
            beforeOpen: dropDownSettings.beforeOpen,
            close: function (e) {
                if (dropDownSettings.close) {
                    dropDownSettings.close.call(_this, e);
                }
            },
            created: dropDownSettings.created,
            open: dropDownSettings.open,
            select: dropDownSettings.select
        }, buttonEle);
    };
    /**
     * Adds the additional event handlers as the item moved into overflow popup.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @param {DropDownButton} overflowButton - Gets the overflow button.
     * @returns {void}
     * @hidden
     */
    RibbonDropDown.prototype.addOverFlowEvents = function (item, itemEle, overflowButton) {
        var _this = this;
        var dropdownElement = itemEle.querySelector('#' + item.id);
        dropdownElement.setAttribute('data-control', item.type.toString());
        var dropdown = getComponent(dropdownElement, DropDownButton);
        dropdown.cssClass = dropdown.cssClass + SPACE + RIBBON_POPUP_CONTROL;
        dropdown.dataBind();
        var target;
        dropdown.beforeClose = function (e) {
            if (item.dropDownSettings.beforeClose) {
                item.dropDownSettings.beforeClose.call(_this, e);
            }
            target = e.event ? e.event.target : null;
        };
        dropdown.close = function (e) {
            if (item.dropDownSettings.close) {
                item.dropDownSettings.close.call(_this, e);
            }
            if (target && !target.closest('.e-ribbon-group-overflow-ddb')) {
                overflowButton.toggle();
            }
        };
    };
    /**
     * Removes the additional event handlers as the item moved from overflow popup.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @returns {void}
     * @hidden
     */
    RibbonDropDown.prototype.removeOverFlowEvents = function (item, itemEle) {
        var _this = this;
        var dropdownElement = itemEle.querySelector('#' + item.id);
        var dropdown = getComponent(dropdownElement, DropDownButton);
        var cssClass = dropdown.cssClass.split(SPACE);
        cssClass = cssClass.filter(function (value) { return value !== RIBBON_POPUP_CONTROL; });
        dropdown.cssClass = cssClass.join(SPACE);
        dropdown.dataBind();
        dropdown.close = function (e) {
            if (item.dropDownSettings.close) {
                item.dropDownSettings.close.call(_this, e);
            }
        };
        dropdown.beforeClose = function (e) {
            if (item.dropDownSettings.beforeClose) {
                item.dropDownSettings.beforeClose.call(_this, e);
            }
        };
    };
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
    RibbonDropDown.prototype.createOverFlowDropDown = function (id, name, iconCss, groupEle, overflowEle, enableRtl) {
        var _this = this;
        this.enableRtl = enableRtl;
        var buttonEle = this.parent.createElement('button', {
            id: id + OVERFLOW_ID + DROPDOWN_ID
        });
        groupEle.setAttribute('tabindex', '0');
        overflowEle.appendChild(buttonEle);
        var dropdown = new DropDownButton({
            iconCss: iconCss,
            target: groupEle,
            locale: this.parent.locale,
            enableRtl: this.parent.enableRtl,
            enablePersistence: this.parent.enablePersistence,
            cssClass: VERTICAL_DDB + SPACE + RIBBON_GROUP_OVERFLOW_DDB,
            iconPosition: 'Top',
            content: name,
            beforeClose: function (args) {
                args.cancel = !isNullOrUndefined(args.event && closest(args.event.target, '.' + RIBBON_POPUP_CONTROL));
            }
        }, buttonEle);
        createTooltip(groupEle, this.parent);
        buttonEle.onclick = buttonEle.onkeydown = function () { _this.itemIndex = 0; };
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        groupEle.onkeydown = function (e) { _this.keyActionHandler(e, groupEle), _this; };
        return dropdown;
    };
    RibbonDropDown.prototype.keyActionHandler = function (e, target) {
        var items = target.querySelectorAll('.e-control');
        var comboBoxElements = target.querySelectorAll('.e-combobox');
        var comboBoxEle;
        if (comboBoxElements) {
            for (var i = 0; i < comboBoxElements.length; i++) {
                if (comboBoxElements[parseInt(i.toString(), 10)].closest('.e-input-focus')) {
                    comboBoxEle = comboBoxElements[parseInt(i.toString(), 10)];
                }
            }
        }
        if (comboBoxEle) {
            for (var i = 0; i < items.length; i++) {
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
    };
    RibbonDropDown.prototype.handleNavigation = function (e, enableRtl, items) {
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
                var launcherIcon = false;
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
                var launcherIcon = false;
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
    };
    RibbonDropDown.prototype.focusLauncherIcon = function (e, items) {
        var groupContainer = items[parseInt(this.itemIndex.toString(), 10)].closest('.e-ribbon-group-container');
        var launcherIconEle;
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
    };
    RibbonDropDown.prototype.updateItemIndex = function (e, items, enableRtl) {
        var ribbonItem = items[this.itemIndex].closest('.e-ribbon-item');
        while (ribbonItem && ribbonItem.classList.contains('e-disabled')) {
            if (enableRtl) {
                if (this.itemIndex < items.length - 1) {
                    this.itemIndex++;
                }
                else {
                    var launcherIcon = false;
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
                    var launcherIcon = false;
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
    };
    /**
     * Removes Overflow DropDown.
     *
     * @param {HTMLElement} dropdownElement - Gets the ribbon DropDown element.
     * @returns {void}
     * @hidden
     */
    RibbonDropDown.prototype.removeOverFlowDropDown = function (dropdownElement) {
        var dropdown = getComponent(dropdownElement, DropDownButton);
        var tooltip = getComponent(dropdown.target, Tooltip);
        tooltip.destroy();
        dropdownElement.parentElement.parentElement.insertBefore(dropdown.target, dropdownElement.parentElement);
        dropdown.destroy();
        remove(dropdownElement);
    };
    /**
     * Gets DropDown item element.
     *
     * @param {HTMLElement} dropdownElement - Gets the ribbon DropDown element.
     * @param {string} id - Gets the ID of ribbon DropDown element.
     * @returns {HTMLElement} - Returns the DropDown item element.
     * @hidden
     */
    RibbonDropDown.prototype.getDDBItemElement = function (dropdownElement, id) {
        var dropdown = getComponent(dropdownElement, DropDownButton);
        var dropDownPopup = dropdown.dropDown.element;
        return dropDownPopup.querySelector('#' + id);
    };
    /**
     * Gets Overflow DropDown Popup.
     *
     * @param {itemProps} itemProp - Gets the property of ribbon item.
     * @param {HTMLElement} contentEle - Gets the content element.
     * @returns {HTMLElement} - Returns the Overflow DropDown Popup.
     * @hidden
     */
    RibbonDropDown.prototype.getOverflowDropDownPopup = function (itemProp, contentEle) {
        var dropdownElement = contentEle.querySelector('#' + this.parent.tabs[itemProp.tabIndex].groups[itemProp.groupIndex].id + OVERFLOW_ID + DROPDOWN_ID);
        var dropdown = getComponent(dropdownElement, DropDownButton);
        return dropdown.dropDown.element;
    };
    RibbonDropDown.prototype.getDropDownObj = function (controlId) {
        var dropDownEle = getItemElement(this.parent, controlId);
        return dropDownEle ? getComponent(dropDownEle, DropDownButton) : null;
    };
    /**
     * Adds a new item to the menu. By default, new item appends to
     * the list as the last item, but you can insert based on the text parameter.
     *
     * @param {string} controlId - Gets the control ID.
     * @param {ItemModel[]} Items - Gets the DropDown items.
     * @param {string} text - Gets the text of the dropdown item where the new item needs to be inserted.
     * @returns {void}
     */
    RibbonDropDown.prototype.addItems = function (controlId, Items, text) {
        this.getDropDownObj(controlId).addItems(Items, text);
    };
    /**
     * Removes the items from the menu.
     *
     * @param {string} controlId - Gets the control ID.
     * @param {string[]} Items -
     * @param {string} isUniqueId -
     * @returns {void}
     */
    RibbonDropDown.prototype.removeItems = function (controlId, Items, isUniqueId) {
        this.getDropDownObj(controlId).removeItems(Items, isUniqueId);
    };
    /**
     * To open/close DropDownButton popup based on current state of the DropDownButton.
     *
     * @param {string} controlId - Gets the control ID.
     * @returns {void}
     */
    RibbonDropDown.prototype.toggle = function (controlId) {
        this.getDropDownObj(controlId).toggle();
    };
    /**
     * Updates the dropdown.
     *
     * @param {RibbonDropDownSettingsModel} prop - Gets the dropdown property.
     * @param {string} id - Gets the ID of dropdown.
     * @returns {void}
     */
    RibbonDropDown.prototype.updateDropDown = function (prop, id) {
        var itemProp = getItem(this.parent.tabs, id);
        if (!itemProp) {
            return;
        }
        merge(itemProp.item.dropDownSettings, prop);
        var btnEle = getItemElement(this.parent, id, itemProp);
        if (!btnEle) {
            return;
        }
        var control = getComponent(btnEle, DropDownButton);
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
    };
    /**
     * Updated DropDown size
     *
     * @param {HTMLElement} element - Gets the dropdown element.
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @returns {void}
     * @hidden
     */
    RibbonDropDown.prototype.updateDropDownSize = function (element, item) {
        var control = getComponent(element, DropDownButton);
        var cssClass = control.cssClass.split(SPACE);
        if (item.activeSize === RibbonItemSize.Large) {
            cssClass.push(VERTICAL_DDB);
        }
        else {
            cssClass = cssClass.filter(function (value) { return value !== VERTICAL_DDB; });
        }
        control.cssClass = cssClass.join(SPACE);
        control.setProperties({ iconPosition: item.activeSize === RibbonItemSize.Large ? 'Top' : 'Left' });
        control.setProperties({ content: item.activeSize === RibbonItemSize.Small ? '' : item.dropDownSettings.content });
    };
    return RibbonDropDown;
}());

/**
 * Defines the items of Ribbon.
 */
var RibbonSplitButton = /** @__PURE__ @class */ (function () {
    function RibbonSplitButton(parent) {
        this.parent = parent;
    }
    RibbonSplitButton.prototype.getModuleName = function () {
        return 'ribbonSplitButton';
    };
    RibbonSplitButton.prototype.destroy = function () {
        this.parent = null;
    };
    /**
     * Creates SplitButton.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @returns {void}
     * @hidden
     */
    RibbonSplitButton.prototype.createSplitButton = function (item, itemEle) {
        var _this = this;
        var buttonEle = this.parent.createElement('button', {
            id: item.id
        });
        itemEle.appendChild(buttonEle);
        var splitButtonSettings = item.splitButtonSettings;
        var cssClass = (ITEM_VERTICAL_CENTER + SPACE + RIBBON_CONTROL + SPACE + (splitButtonSettings.cssClass ?
            splitButtonSettings.cssClass : '')).trim();
        var splitbutton = new SplitButton({
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
            beforeClose: function (e) {
                if (splitButtonSettings.beforeClose) {
                    splitButtonSettings.beforeClose.call(_this, e);
                }
            },
            beforeItemRender: splitButtonSettings.beforeItemRender,
            beforeOpen: splitButtonSettings.beforeOpen,
            close: function () {
                splitbutton['wrapper'].classList.remove(RIBBON_POPUP_OPEN);
                if (splitButtonSettings.close) {
                    splitButtonSettings.close.call(_this);
                }
            },
            created: splitButtonSettings.created,
            open: function () {
                splitbutton['wrapper'].classList.add(RIBBON_POPUP_OPEN);
                if (splitButtonSettings.open) {
                    splitButtonSettings.open.call(_this);
                }
            },
            select: splitButtonSettings.select,
            click: function (e) {
                if (splitButtonSettings.click) {
                    splitButtonSettings.click.call(_this, e);
                }
            }
        }, buttonEle);
        var dropdownEle = buttonEle.parentElement.querySelector('.e-dropdown-btn');
        dropdownEle.onkeydown = function (e) {
            if (e.key === 'Enter') {
                e.stopImmediatePropagation();
                dropdownEle.click();
            }
        };
        this.setContent(item, splitbutton);
        var wrapper = splitbutton['wrapper'];
        EventHandler.add(wrapper, 'mouseenter', function () { wrapper.classList.add(RIBBON_HOVER); }, this);
        EventHandler.add(wrapper, 'mouseleave', function () { wrapper.classList.remove(RIBBON_HOVER); }, this);
    };
    /**
     * Adds the additional event handlers as the item moved into overflow popup.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @param {DropDownButton} overflowButton - Gets the overflow button.
     * @returns {void}
     * @hidden
     */
    RibbonSplitButton.prototype.addOverFlowEvents = function (item, itemEle, overflowButton) {
        var _this = this;
        var splitButtonEle = itemEle.querySelector('#' + item.id);
        splitButtonEle.setAttribute('data-control', item.type.toString());
        var splitbutton = getComponent(splitButtonEle, SplitButton);
        splitbutton.cssClass = splitbutton.cssClass + SPACE + RIBBON_POPUP_CONTROL;
        splitbutton.dataBind();
        var dropdownEle = splitButtonEle.parentElement.querySelector('.e-dropdown-btn');
        var ddbId = dropdownEle.getAttribute('id');
        var popupEle = document.querySelector('#' + ddbId + '-popup');
        dropdownEle.onkeydown = function (e) {
            if (e.key === 'Enter') {
                e.stopImmediatePropagation();
                dropdownEle.click();
            }
        };
        popupEle.onkeydown = function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                splitbutton['wrapper'].classList.remove('e-ribbon-open');
                popupEle.querySelector('.e-focused').click();
            }
        };
        var target;
        splitbutton.beforeClose = function (e) {
            if (item.splitButtonSettings.beforeClose) {
                item.splitButtonSettings.beforeClose.call(_this, e);
            }
            target = e.event ? e.event.target : null;
        };
        splitbutton.click = function (e) {
            if (item.splitButtonSettings.click) {
                item.splitButtonSettings.click.call(_this, e);
            }
            overflowButton.toggle();
        };
        splitbutton.close = function (e) {
            if (item.splitButtonSettings.close) {
                item.splitButtonSettings.close.call(_this, e);
            }
            splitbutton['wrapper'].classList.remove(RIBBON_POPUP_OPEN);
            if (target && !target.closest('.e-ribbon-group-overflow-ddb')) {
                overflowButton.toggle();
            }
        };
    };
    /**
     * Removes the additional event handlers as the item moved from overflow popup.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @returns {void}
     * @hidden
     */
    RibbonSplitButton.prototype.removeOverFlowEvents = function (item, itemEle) {
        var _this = this;
        var splitButtonEle = itemEle.querySelector('#' + item.id);
        var splitbutton = getComponent(splitButtonEle, SplitButton);
        var cssClass = splitbutton.cssClass.split(SPACE);
        cssClass = cssClass.filter(function (value) { return value !== RIBBON_POPUP_CONTROL; });
        splitbutton.cssClass = cssClass.join(SPACE);
        splitbutton.dataBind();
        splitbutton.beforeClose = function (e) {
            if (item.splitButtonSettings.beforeClose) {
                item.splitButtonSettings.beforeClose.call(_this, e);
            }
        };
        splitbutton.click = function (e) {
            if (item.splitButtonSettings.click) {
                item.splitButtonSettings.click.call(_this, e);
            }
        };
        splitbutton.close = function (e) {
            if (item.splitButtonSettings.close) {
                item.splitButtonSettings.close.call(_this, e);
            }
            splitbutton['wrapper'].classList.remove(RIBBON_POPUP_OPEN);
        };
    };
    RibbonSplitButton.prototype.setContent = function (item, control) {
        control['primaryBtnObj'].setProperties({ content: (item.activeSize === RibbonItemSize.Medium) ? item.splitButtonSettings.content : '' });
        control['secondaryBtnObj'].setProperties({ content: (item.activeSize === RibbonItemSize.Large) ? item.splitButtonSettings.content : '' });
    };
    RibbonSplitButton.prototype.getSplitButtonObj = function (controlId) {
        var splitButtonEle = getItemElement(this.parent, controlId);
        return getComponent(splitButtonEle, SplitButton);
    };
    /**
     * Adds a new item to the menu. By default, new item appends to
     * the list as the last item, but you can insert based on the text parameter.
     *
     * @param {string} controlId - Gets the control ID.
     * @param {ItemModel[]} Items - Gets the SplitButton items.
     * @param {string} text - Gets the text of the splitbutton item where the new item needs to be inserted.
     * @returns {void}
     */
    RibbonSplitButton.prototype.addItems = function (controlId, Items, text) {
        this.getSplitButtonObj(controlId).addItems(Items, text);
    };
    /**
     * Removes the items from the menu.
     *
     * @param {string} controlId - Gets the control ID.
     * @param {string[]} Items -
     * @param {string} isUniqueId -
     * @returns {void}
     */
    RibbonSplitButton.prototype.removeItems = function (controlId, Items, isUniqueId) {
        this.getSplitButtonObj(controlId).removeItems(Items, isUniqueId);
    };
    /**
     * To open/close SplitButton popup based on current state of the SplitButton.
     *
     * @param {string} controlId - Gets the control ID.
     * @returns {void}
     */
    RibbonSplitButton.prototype.toggle = function (controlId) {
        this.getSplitButtonObj(controlId).toggle();
    };
    /**
     * Updates the splitbutton.
     *
     * @param {RibbonSplitButtonSettingsModel} prop - Gets the splitbutton property.
     * @param {string} id - Gets the ID of dropdown.
     * @returns {void}
     */
    RibbonSplitButton.prototype.updateSplitButton = function (prop, id) {
        var itemProp = getItem(this.parent.tabs, id);
        if (!itemProp) {
            return;
        }
        merge(itemProp.item.splitButtonSettings, prop);
        var btnEle = getItemElement(this.parent, id, itemProp);
        if (!btnEle) {
            return;
        }
        var control = getComponent(btnEle, SplitButton);
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
    };
    /**
     * Updated SplitButton size
     *
     * @param {HTMLElement} element - Gets the splibutton element.
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @returns {void}
     * @hidden
     */
    RibbonSplitButton.prototype.updateSplitButtonSize = function (element, item) {
        var control = getComponent(element, SplitButton);
        var cssClass = control.cssClass.split(SPACE);
        if (item.activeSize === RibbonItemSize.Large) {
            cssClass.push(VERTICAL_DDB);
        }
        else {
            cssClass = cssClass.filter(function (value) { return value !== VERTICAL_DDB; });
        }
        control.cssClass = cssClass.join(SPACE);
        control.setProperties({ iconPosition: item.activeSize === RibbonItemSize.Large ? 'Top' : 'Left' });
        this.setContent(item, control);
    };
    return RibbonSplitButton;
}());

/**
 * Gets index value.
 *
 * @param {Array} arr - Gets the array to find index.
 * @param {boolean} condition - Defines whether index matches with the value.
 * @returns {number} - Gets the index value.
 * @hidden
 */
function getIndex(arr, condition) {
    for (var i = 0; i < arr.length; i++) {
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
        var content = '';
        try {
            var tempEle = select(template);
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
    for (var i = 0; i < tabs.length; i++) {
        var tab = tabs[parseInt(i.toString(), 10)];
        for (var j = 0; j < tab.groups.length; j++) {
            var group = tab.groups[parseInt(j.toString(), 10)];
            for (var k = 0; k < group.collections.length; k++) {
                var collection = group.collections[parseInt(k.toString(), 10)];
                for (var l = 0; l < collection.items.length; l++) {
                    var item = collection.items[parseInt(l.toString(), 10)];
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
    for (var i = 0; i < tabs.length; i++) {
        var tab = tabs[parseInt(i.toString(), 10)];
        for (var j = 0; j < tab.groups.length; j++) {
            var group = tab.groups[parseInt(j.toString(), 10)];
            for (var k = 0; k < group.collections.length; k++) {
                var collection = group.collections[parseInt(k.toString(), 10)];
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
    for (var i = 0; i < tabs.length; i++) {
        var tab = tabs[parseInt(i.toString(), 10)];
        for (var j = 0; j < tab.groups.length; j++) {
            var group = tab.groups[parseInt(j.toString(), 10)];
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
    var control = getComponent(element, moduleName);
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
    var control = getComponent(element, moduleName);
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
    var control = getComponent(element, moduleName);
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
    var contentEle = parent.tabObj.items[itemProp.tabIndex].content;
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
        var ele = (itemProp.item.displayOptions & DisplayMode.Simplified) ?
            contentEle.querySelector('#' + itemProp.item.id) : null;
        // element will be null for "Popup" and if the item is moved to overflow in "Auto" mode
        if (!ele) {
            var dropdown = itemProp.group.enableGroupOverflow ?
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
    var targetId = args.target.getAttribute('id');
    var dataObj = tooltipData.filter(function (e) { return e.id === targetId; })[0];
    var data = dataObj.data;
    var content = tooltip.createElement('div', {
        id: data.id ? RIBBON_TOOLTIP_CONTAINER + '_' + data.id : RIBBON_TOOLTIP_CONTAINER
    });
    tooltip.element.append(content);
    if (data.title) {
        var header = tooltip.createElement('div', {
            innerHTML: data.title,
            className: RIBBON_TOOLTIP_TITLE
        });
        content.appendChild(header);
    }
    var textContainer = tooltip.createElement('div', {
        className: RIBBON_TEXT_CONTAINER
    });
    content.appendChild(textContainer);
    if (data.iconCss) {
        var customCss = tooltip.createElement('div', {
            className: data.iconCss + ' ' + RIBBON_TOOLTIP_ICON
        });
        textContainer.appendChild(customCss);
    }
    if (data.content) {
        var tooltipContent = tooltip.createElement('div', {
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
    var ribbonTooltip = new Tooltip({
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
    var control = getComponent(element, Tooltip);
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
    var control = getComponent(element, Tooltip);
    control.setProperties(prop);
}

var __extends = (undefined && undefined.__extends) || (function () {
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
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * The Ribbon Component is a structured layout to manage tools with tabs and groups.
 */
var Ribbon = /** @__PURE__ @class */ (function (_super) {
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
        addClass([this.element], ['e-rbn'].concat((this.cssClass ? this.cssClass.split(SPACE) : [])));
        if (this.enableRtl) {
            this.element.classList.add(RTL_CSS);
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
        var activeContent = this.tabObj.element.querySelector('#' + this.tabs[this.selectedTab].id + CONTENT_ID);
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
                    var prevGroupContainer = ribbonControls[parseInt(this.currentControlIndex.toString(), 10)].closest('.' + RIBBON_GROUP_CONTAINER);
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
                    groupContainer = ribbonControls[parseInt(this.currentControlIndex.toString(), 10)].closest('.' + RIBBON_GROUP_CONTAINER);
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
        var activeContent = this.tabObj.element.querySelector('#' + this.tabs[this.selectedTab].id + CONTENT_ID);
        this.checkOverflow(this.selectedTab, activeContent);
        if (this.scrollModule) {
            var scrollEle = this.tabObj.element.querySelector('.' + HORIZONTAL_SCROLLBAR);
            this.scrollModule.scrollStep = scrollEle.offsetWidth;
        }
    };
    Ribbon.prototype.renderTabs = function () {
        this.tabsInternal = this.tabs.slice();
        this.tabsInternal = this.checkID(this.tabsInternal, 'tab', this.element.id);
        this.setProperties({ tabs: this.tabsInternal }, true);
        var tabEle = this.createElement('div', {
            id: this.element.id + TAB_ID
        });
        this.element.appendChild(tabEle);
        this.validateItemSize();
        var tabItems = this.createTabItems(this.tabs);
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
        var toolbarEle = tabEle.querySelector('.e-toolbar');
        var toolbar = getComponent(toolbarEle, Toolbar);
        toolbar.setProperties({ width: 'calc(100% - var(--fileMenuWidth) - var(--helpTemplateWidth))' });
        this.element.classList[this.isMinimized ? 'add' : 'remove'](RIBBON_MINIMIZE);
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
            _this.element.classList.toggle(RIBBON_MINIMIZE, _this.isMinimized);
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
            var ofTabContainer = overflowTarget.querySelector('.' + RIBBON_TAB_ACTIVE);
            if (ofTabContainer) {
                ofTabContainer.classList.remove(RIBBON_TAB_ACTIVE);
            }
            var activeTab = overflowTarget.querySelector('#' + selectedTabId + OVERFLOW_ID);
            if (activeTab) {
                activeTab.classList.add(RIBBON_TAB_ACTIVE);
                this.overflowDDB.element.classList.remove(HIDE_CSS);
            }
            else {
                this.overflowDDB.element.classList.add(HIDE_CSS);
            }
        }
        this.trigger('tabSelected', eventArgs);
    };
    Ribbon.prototype.checkOverflow = function (tabIndex, activeContent) {
        var tabContent = activeContent.closest('.' + TAB_CONTENT);
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
                }, this.tabObj.element.querySelector('.' + TAB_CONTENT));
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
            var groupContainer = tabContent.querySelector('#' + group.id + CONTAINER_ID);
            for (var j = 0; ((j < group.collections.length) && (tabContent.offsetWidth < activeContent.offsetWidth)); j++) {
                var collection = group.collections[parseInt(j.toString(), 10)];
                for (var k = collection.items.length; ((k >= 1) && (tabContent.offsetWidth < activeContent.offsetWidth)); k--) {
                    var item = collection.items[k - 1];
                    if (((item.allowedSizes & RibbonItemSize.Small) && (item.allowedSizes & RibbonItemSize.Medium))
                        && (item.activeSize === RibbonItemSize.Medium) && (item.displayOptions & DisplayMode.Simplified)) {
                        var itemContainer = groupContainer.querySelector('#' + item.id + CONTAINER_ID);
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
            var groupContainer = tabContent.querySelector('#' + group.id + CONTAINER_ID);
            for (var j = 0; ((j < group.collections.length) && (tabContent.offsetWidth > activeContent.offsetWidth)); j++) {
                var collection = group.collections[parseInt(j.toString(), 10)];
                for (var k = collection.items.length; ((k >= 1) && (tabContent.offsetWidth > activeContent.offsetWidth)); k--) {
                    var item = collection.items[k - 1];
                    if (((item.allowedSizes & RibbonItemSize.Small) && (item.allowedSizes & RibbonItemSize.Medium))
                        && (item.activeSize === RibbonItemSize.Small) && (item.displayOptions & DisplayMode.Simplified)) {
                        var itemContainer = groupContainer.querySelector('#' + item.id + CONTAINER_ID);
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
            var groupContainer = groupEle.querySelector('#' + group.id + CONTAINER_ID);
            for (var j = group.collections.length; ((j >= 1) && (tabContent.offsetWidth < activeContent.offsetWidth)); j--) {
                var collection = group.collections[parseInt((j - 1).toString(), 10)];
                var collectionEle = groupEle.querySelector('#' + collection.id);
                for (var k = collection.items.length; ((k >= 1) && (tabContent.offsetWidth < activeContent.offsetWidth)); k--) {
                    var item = collection.items[k - 1];
                    var itemContainer = collectionEle.querySelector('#' + item.id + CONTAINER_ID);
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
            if (!(group.enableGroupOverflow || groupEle.querySelector('.' + RIBBON_ITEM))) {
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
                var overflowDDBEle = tabContent.querySelector('#' + group.id + GROUPOF_BUTTON_ID);
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
                        itemContainer = overflowtarget.querySelector('#' + item.id + CONTAINER_ID);
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
            var itemEle = groupEle.querySelector('.' + RIBBON_ITEM);
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
                    var ofGroupContainer = overflowtarget.querySelector('#' + group.id + CONTAINER_ID);
                    if (ofGroupContainer && ofGroupContainer.childElementCount === 1) {
                        ofGroupContainer.remove();
                    }
                    var ofTabContainer = overflowtarget.querySelector('#' + this.tabs[parseInt(tabIndex.toString(), 10)].id + OVERFLOW_ID);
                    if (ofTabContainer && ofTabContainer.childElementCount === 0) {
                        ofTabContainer.remove();
                        this.overflowDDB.element.classList.add(HIDE_CSS);
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
            var overflowDDB = groupContainer.querySelector('#' + groupId + GROUPOF_BUTTON_ID);
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
                var overflowEle = this.overflowDDB.target;
                var ofTabContainer = overflowEle.querySelector('#' + this.tabs[parseInt(tabIndex.toString(), 10)].id + OVERFLOW_ID);
                if (ofTabContainer) {
                    var ofGroupContainer = overflowEle.querySelector('#' + groupId + CONTAINER_ID);
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
            id: this.tabs[parseInt(tabIndex.toString(), 10)].id + OVERFLOW_ID,
            className: RIBBON_OF_TAB_CONTAINER
        });
        var overflowtarget = this.overflowDDB.target;
        overflowtarget.append(ofTabContainer);
        var ofGroupContainer = this.createGroupContainer(groupId, groupHeader);
        ofGroupContainer.append(itemEle);
        ofTabContainer.append(ofGroupContainer);
        if (tabIndex === this.selectedTab) {
            ofTabContainer.classList.add(RIBBON_TAB_ACTIVE);
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
        var moveItemToColumn = function (start, end) {
            var collection = _this.tabs[parseInt(tabIndex.toString(), 10)]
                .groups[parseInt(groupIndex.toString(), 10)].collections[0];
            var firstItem = activeContent.querySelector('#' + collection.items[parseInt(start.toString(), 10)].id + CONTAINER_ID);
            var shrinkEle = shouldSkip ? activeContent.querySelector('#' + collection.id + '_shrink_container' + start) :
                createShrinkEle(collection.id, firstItem, start, end);
            for (var i = start; i <= end; i++) {
                var item = collection.items[parseInt(i.toString(), 10)];
                if (!(item.displayOptions & DisplayMode.Classic)) {
                    continue;
                }
                var ele = activeContent.querySelector('#' + item.id + CONTAINER_ID);
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
                    var container = parentEle.querySelector('#' + item.id + CONTAINER_ID);
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
        var itemContainer = itemEle.closest('.' + RIBBON_ITEM);
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
            var groupContainer = groupEle.querySelector('#' + group.id + CONTAINER_ID);
            var groupOverFlow = this_1.createElement('div', {
                className: RIBBON_GROUP_OVERFLOW + SPACE + RIBBON_LARGE_ITEM,
                id: group.id + OVERFLOW_ID + CONTAINER_ID
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
                    var itemEle = collectionEle.querySelector('#' + item.id + CONTAINER_ID);
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
                    var itemEle = collectionEle.querySelector('#' + item.id + CONTAINER_ID);
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
        var dropdownElement = this.tabObj.element.querySelector('#' + groupId + OVERFLOW_ID + DROPDOWN_ID);
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
        var activeContent = this.tabObj.element.querySelector('#' + this.tabs[parseInt(index.toString(), 10)].id + CONTENT_ID);
        if (!activeContent) {
            return;
        }
        var tabContent = activeContent.closest('.' + TAB_CONTENT);
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
            if ((!selectedTabContent.querySelector('.' + RIBBON_GROUP)) && (_this.tabs[parseInt(nextIndex.toString(), 10)].groups.length !== 0)) {
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
                id: ribbonTab.id + HEADER_ID
            });
            header.onclick = function () { _this.minimize(false); };
            header.ondblclick = function () { _this.minimize(true); };
            var tab = { header: { text: header }, id: ribbonTab.id, cssClass: ribbonTab.cssClass };
            var content = this.createElement('div', {
                className: tab.cssClass,
                id: ribbonTab.id + CONTENT_ID
            });
            content.classList.add(RIBBON_TAB_ITEM);
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
            this.element.classList.add(RIBBON_SIMPLIFIED_MODE);
        }
        var activeContent = this.tabObj.element.querySelector('#' + this.tabs[this.selectedTab].id + CONTENT_ID);
        this.checkOverflow(this.selectedTab, activeContent);
    };
    Ribbon.prototype.addOverflowButton = function (btnId) {
        var _this = this;
        var overflowButton = this.createElement('button', {
            id: btnId
        });
        var overflowTarget = this.createElement('div', {
            className: RIBBON_OVERFLOW_TARGET,
            attrs: { 'tabindex': '0' }
        });
        var overflowDDB = new DropDownButton({
            iconCss: OVERFLOW_ICON,
            cssClass: DROPDOWNBUTTON_HIDE + SPACE + RIBBON_GROUP_OVERFLOW_DDB,
            target: overflowTarget,
            locale: this.locale,
            enableRtl: this.enableRtl,
            enablePersistence: this.enablePersistence,
            beforeClose: function (args) {
                var ele = args.event ? closest(args.event.target, '.' + RIBBON_POPUP_CONTROL) : null;
                if (ele) {
                    args.cancel = true;
                }
            }
        }, overflowButton);
        this.element.classList.add(RIBBON_OVERFLOW);
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
            className: RIBBON_OF_GROUP_CONTAINER,
            id: groupId + CONTAINER_ID
        });
        var ofGroupHeader = this.createElement('div', {
            className: RIBBON_OVERFLOW_HEADER,
            id: groupId + HEADER_ID,
            innerHTML: groupHeader
        });
        ofGroupContainer.append(ofGroupHeader);
        return ofGroupContainer;
    };
    Ribbon.prototype.addExpandCollapse = function () {
        var _this = this;
        this.collapseButton = this.createElement('span', {
            className: RIBBON_COLLAPSE_BUTTON + SPACE + EXPAND_COLLAPSE_ICON,
            id: this.tabObj.element.id + COLLAPSE_BUTTON_ID,
            attrs: { 'tabindex': '0', 'type': 'button', 'aria-label': 'Layout Switcher', 'role': 'button' }
        });
        this.collapseButton.onclick = function () { _this.toggleLayout(); };
        this.collapseButton.onkeydown = function (e) {
            if (e.key === 'Enter') {
                _this.toggleLayout();
            }
        };
        this.element.classList.add(RIBBON_COLLAPSIBLE);
        if (this.activeLayout === 'Simplified') {
            this.collapseButton.classList.add(RIBBON_EXPAND_BUTTON);
        }
        this.tabObj.element.appendChild(this.collapseButton);
    };
    Ribbon.prototype.removeExpandCollapse = function () {
        var _this = this;
        var index = getIndex(this.tooltipData, function (e) { return e.id === _this.collapseButton.id; });
        if (index !== -1) {
            this.tooltipData.splice(index, 1);
        }
        this.element.classList.remove(RIBBON_COLLAPSIBLE);
        remove(this.tabObj.element.querySelector('.' + RIBBON_COLLAPSE_BUTTON));
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
        this.collapseButton.classList.toggle(RIBBON_EXPAND_BUTTON, this.activeLayout === 'Simplified');
        this.element.classList.toggle(RIBBON_SIMPLIFIED_MODE, this.activeLayout === 'Simplified');
        for (var i = 0; i <= (this.tabs.length - 1); i++) {
            var tabIndex = i;
            var contentEle = this.tabObj.items[parseInt(tabIndex.toString(), 10)].content;
            if (contentEle.innerHTML !== '') {
                var tab = this.tabs[parseInt(tabIndex.toString(), 10)];
                var groupList = this.tabs[parseInt(tabIndex.toString(), 10)].groups;
                var activeContent = this.tabObj.element.querySelector('#' + this.tabs[parseInt(tabIndex.toString(), 10)].id + CONTENT_ID);
                var tabContent = activeContent.closest('.' + TAB_CONTENT);
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
                        var groupContainer = groupEle.querySelector('#' + group.id + CONTAINER_ID);
                        var shrinkColumns = groupContainer.querySelectorAll('.' + 'e-ribbon-shrink');
                        for (var i_2 = 0; i_2 < shrinkColumns.length; i_2++) {
                            shrinkColumns[parseInt(i_2.toString(), 10)].remove();
                        }
                        var groupHeader = groupContainer.querySelector('#' + group.id + HEADER_ID);
                        groupHeader.remove();
                        var groupContent = groupContainer.querySelector('#' + group.id + CONTENT_ID);
                        groupContent.classList.replace(RIBBON_ROW, RIBBON_COLUMN);
                        groupContent.classList.remove(RIBBON_CONTENT_HEIGHT);
                        for (var j = 0; j < group.collections.length; j++) {
                            var collection = group.collections[parseInt(j.toString(), 10)];
                            var groupCollection = groupContainer.querySelector('#' + collection.id);
                            groupCollection.classList.replace(RIBBON_ROW, RIBBON_COLUMN);
                            for (var k = 0; k < collection.items.length; k++) {
                                var itemList = collection.items;
                                var item = collection.items[parseInt(k.toString(), 10)];
                                var flag = true;
                                while ((flag) && (item.displayOptions === DisplayMode.Classic)) {
                                    k++;
                                    var itemEle_1 = groupContainer.querySelector('#' + item.id + CONTAINER_ID);
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
                                    itemEle = groupContainer.querySelector('#' + item.id + CONTAINER_ID);
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
                        if (!(group.enableGroupOverflow || groupEle.querySelector('.' + RIBBON_ITEM))) {
                            groupEle.classList.add('e-ribbon-emptyCollection');
                        }
                    }
                }
                else {
                    this.element.classList.remove(RIBBON_OVERFLOW);
                    for (var i_3 = 0; i_3 < groupList.length; i_3++) {
                        var group = groupList[parseInt(i_3.toString(), 10)];
                        var alignType = groupList[parseInt(i_3.toString(), 10)].orientation;
                        var groupContainer = tabContent.querySelector('#' + group.id + CONTAINER_ID);
                        var groupContent = groupContainer.querySelector('#' + group.id + CONTENT_ID);
                        var groupHeader = this.createElement('div', {
                            className: RIBBON_GROUP_HEADER,
                            id: group.id + HEADER_ID,
                            innerHTML: group.header
                        });
                        groupContainer.appendChild(groupHeader);
                        if (alignType === 'Row') {
                            groupContent.classList.replace(RIBBON_COLUMN, RIBBON_ROW);
                        }
                        groupContent.classList.add(RIBBON_CONTENT_HEIGHT);
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
                                var overflowDDBEle = groupContainer.querySelector('#' + group.id + GROUPOF_BUTTON_ID);
                                if (overflowDDBEle) {
                                    overflowDDB = getInstance(overflowDDBEle, DropDownButton);
                                    overflowtarget = overflowDDB.target;
                                }
                            }
                            var collection = group.collections[parseInt(j.toString(), 10)];
                            var groupCollection = groupContainer.querySelector('#' + collection.id);
                            if (alignType === 'Column') {
                                groupCollection.classList.replace(RIBBON_COLUMN, RIBBON_ROW);
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
                                            itemEle = groupContainer.querySelector('#' + item.id + CONTAINER_ID);
                                        }
                                        else {
                                            itemEle = overflowtarget.querySelector('#' + item.id + CONTAINER_ID);
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
                                    var itemEle = groupContainer.querySelector('#' + item.id + CONTAINER_ID);
                                    if (!itemEle) {
                                        itemEle = overflowtarget.querySelector('#' + item.id + CONTAINER_ID);
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
            className: RIBBON_LAUNCHER_ICON_ELE + ' ' + (this.launcherIconCss ? this.launcherIconCss : RIBBON_LAUNCHER_ICON),
            id: groupId + LAUNCHER_ID,
            attrs: { 'tabindex': '0', 'type': 'button', 'aria-label': 'Launcher Icon', 'role': 'button' }
        });
        groupContainer.appendChild(launcherIcon);
        groupContainer.classList.add(RIBBON_LAUNCHER);
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
            groupEle.classList.add(RIBBON_GROUP);
            groupElements.push(groupEle);
            var groupContainer = this.createElement('div', {
                className: group.cssClass,
                id: group.id + CONTAINER_ID
            });
            groupContainer.classList.add(RIBBON_GROUP_CONTAINER);
            groupEle.appendChild(groupContainer);
            var groupContent = this.createElement('div', {
                className: this.activeLayout === 'Simplified' ? RIBBON_GROUP_CONTENT : (RIBBON_GROUP_CONTENT + SPACE + RIBBON_CONTENT_HEIGHT),
                id: group.id + CONTENT_ID
            });
            groupContent.classList.add(((alignType === 'Column') || (this.activeLayout === 'Simplified')) ? RIBBON_COLUMN : RIBBON_ROW);
            groupContainer.appendChild(groupContent);
            if (this.activeLayout === 'Classic') {
                var groupHeader = this.createElement('div', {
                    className: RIBBON_GROUP_HEADER,
                    id: group.id + HEADER_ID,
                    innerHTML: group.header
                });
                groupContainer.appendChild(groupHeader);
            }
            if (group.showLauncherIcon) {
                this.createLauncherIcon(group.id, groupContainer);
            }
            var elements = this.createCollection(group.collections, group.orientation, group.id, group.header, group.enableGroupOverflow, tabIndex, groupContainer);
            append(elements, groupContent);
            if ((this.activeLayout === 'Simplified') && !(group.enableGroupOverflow || groupEle.querySelector('.' + RIBBON_ITEM))) {
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
            collectionEle.classList.add(RIBBON_COLLECTION);
            collectionEle.classList.add(((alignType !== 'Column') || (this.activeLayout === 'Simplified')) ?
                RIBBON_COLUMN : RIBBON_ROW);
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
                id: item.id + CONTAINER_ID
            });
            (_a = itemEle.classList).add.apply(_a, [RIBBON_ITEM].concat((item.disabled ? [DISABLED_CSS] : [])));
            // To avoid undefined items condition is added
            if (item.ribbonTooltipSettings && isTooltipPresent(item.ribbonTooltipSettings)) {
                itemEle.classList.add(RIBBON_TOOLTIP_TARGET);
                this.tooltipData.push({ id: itemEle.id, data: item.ribbonTooltipSettings });
            }
            var size = item.activeSize;
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
    };
    Ribbon.prototype.createHelpPaneTemplate = function () {
        if (this.helpPaneTemplate) {
            var templateName = 'helpPaneTemplate';
            this.clearTemplate([templateName]);
            this.ribbonTempEle = this.createElement('div', {
                className: RIBBON_HELP_TEMPLATE,
                id: this.element.id + RIBBON_HELP_PANE_TEMPLATE_ID
            });
            var templateFunction = getTemplateFunction(this.helpPaneTemplate);
            append(templateFunction({}, this, templateName, 'helpPaneTemplate', this.isStringTemplate), this.ribbonTempEle);
            var tabEle = this.tabObj.element;
            var toolbarEle = tabEle.querySelector('.e-toolbar');
            toolbarEle.after(this.ribbonTempEle);
            tabEle.style.setProperty(RIBBON_HELP_PANE_TEMPLATE_WIDTH, this.ribbonTempEle.offsetWidth + 'px');
            this.renderReactTemplates();
        }
    };
    Ribbon.prototype.createTemplateContent = function (item, itemElement) {
        var itemEle = this.createElement('div', {
            className: item.cssClass ? (RIBBON_TEMPLATE + SPACE + item.cssClass) : RIBBON_TEMPLATE,
            id: item.id
        });
        if (item.disabled) {
            itemEle.classList.add(DISABLED_CSS);
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
        var key = type === 'tab' ? TAB_ID : type === 'group' ? GROUP_ID :
            type === 'collection' ? COLLECTION_ID : ITEM_ID;
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
                                ele.classList.toggle(RTL_CSS, commonProp.enableRtl);
                            }
                        }
                    }
                }
            }
        }
    };
    Ribbon.prototype.removeLauncherIcon = function (groupId, dropdownElement, contentEle) {
        var containerId = groupId + CONTAINER_ID;
        var containerEle = dropdownElement ? this.ribbonDropDownModule.getDDBItemElement(dropdownElement, containerId) : contentEle.querySelector('#' + containerId);
        if (containerEle) {
            containerEle.classList.remove(RIBBON_LAUNCHER);
            var launcherIcon = containerEle.querySelector('#' + groupId + LAUNCHER_ID);
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
            var index = getIndex(this.tooltipData, function (e) { return e.id === item.id + CONTAINER_ID; });
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
        var activeContent = this.tabObj.element.querySelector('#' + this.tabs[this.selectedTab].id + CONTENT_ID);
        var tabContent = activeContent.closest('.' + TAB_CONTENT);
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
                var dropdownElement = group.isCollapsed ? contentEle.querySelector('#' + group.id + OVERFLOW_ID + DROPDOWN_ID) : null;
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
                    contentEle.querySelector('#' + itemProp.group.id + GROUPOF_BUTTON_ID) : null;
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
                    var ofGroupContainer = dropdown.target.querySelector('#' + itemProp.group.id + CONTAINER_ID);
                    if (ofGroupContainer && ofGroupContainer.childElementCount === 1) {
                        ofGroupContainer.remove();
                    }
                    var ofTabContainer = dropdown.target.querySelector('#' + this.tabs[parseInt(itemProp.tabIndex.toString(), 10)].id + OVERFLOW_ID);
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
                contentEle.querySelector('#' + groupId + CONTENT_ID).append(element);
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
                    contentEle.querySelector('#' + itemProp.group.id + GROUPOF_BUTTON_ID) : null;
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
        var groupContainer = contentEle.querySelector('#' + itemProp.group.id + CONTAINER_ID);
        if (contentEle.innerHTML !== '') {
            var item_1 = itemProp.collection.items[parseInt(index.toString(), 10)];
            var element = this.createItems([item_1], itemProp.group.orientation, itemProp.group.id, itemProp.group.header, itemProp.group.enableGroupOverflow, itemProp.tabIndex, groupContainer)[0];
            if (itemProp.group.isCollapsed) {
                contentEle = this.ribbonDropDownModule.getOverflowDropDownPopup(itemProp, contentEle);
            }
            //insert the element in tab items property.
            var targetEle = targetId ? contentEle.querySelector('#' + targetId) : null;
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
                    contentEle.querySelector('#' + itemProp.group.id + GROUPOF_BUTTON_ID) : null;
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
                    var dropdownElement = group.isCollapsed ? contentEle.querySelector('#' + group.id + OVERFLOW_ID + DROPDOWN_ID) : null;
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
                tabEle.querySelector('#' + tabId + HEADER_ID).innerText = ribbonTab.header;
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
        var groupContainer = groupEle.querySelector('#' + group.id + CONTAINER_ID);
        var dropdownElement;
        var dropdown;
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
                    var ofGroupContainer = dropdown.target.querySelector('#' + itemProp.group.id + CONTAINER_ID);
                    if (ofGroupContainer && ofGroupContainer.childElementCount === 1) {
                        ofGroupContainer.remove();
                    }
                    var ofTabContainer = dropdown.target.querySelector('#' + this.tabs[parseInt(itemProp.tabIndex.toString(), 10)].id + OVERFLOW_ID);
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
                groupContent.classList.add(((ribbongroup.orientation === 'Column') || (this.activeLayout === 'Simplified')) ? RIBBON_COLUMN : RIBBON_ROW);
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
                    var overflowHeader = dropdown.target.querySelector('#' + group.id + HEADER_ID);
                    if (overflowHeader) {
                        overflowHeader.innerText = ribbongroup.header;
                    }
                }
                else if (this.activeLayout === RibbonLayout.Classic && !ribbongroup.isCollapsed) {
                    groupEle.querySelector('.e-ribbon-group-header').innerText = ribbongroup.header;
                }
                else if (this.activeLayout === RibbonLayout.Classic && ribbongroup.isCollapsed) {
                    var overflowEle = groupEle.querySelector('#' + ribbongroup.id + OVERFLOW_ID + DROPDOWN_ID);
                    // need to set instance for dropdown
                    var dropDownBtn = getInstance(overflowEle, DropDownButton);
                    var overflowHeader = dropDownBtn.target.querySelector('#' + group.id + HEADER_ID);
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
                var groupContainer = contentEle.querySelector('#' + itemProp.group.id + CONTAINER_ID);
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
        var groupContainer = groupEle.querySelector('#' + itemProp.group.id + CONTAINER_ID);
        var itemContainer = null;
        var itemEle = null;
        var dropdownElement;
        var dropdown;
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
                    var collectionEle = groupContainer.querySelector('#' + itemProp.collection.id);
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
            var size = ribbonItem.activeSize;
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
            ele.closest('#' + item.id + CONTAINER_ID).remove();
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
            itemEle.classList.toggle(DISABLED_CSS, itemProp.item.disabled);
            var moduleName = this.getItemModuleName(itemProp.item);
            if (moduleName !== 'template') {
                updateControlDisabled(ele, moduleName, isDisabled);
            }
            else {
                ele.classList.toggle(DISABLED_CSS, isDisabled);
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
        remove(this.element.querySelector('#' + this.element.id + TAB_ID));
        this.element.style.removeProperty(RIBBON_FILE_MENU_WIDTH);
        this.element.style.removeProperty(RIBBON_HELP_PANE_TEMPLATE_WIDTH);
        this.element.style.removeProperty('width');
        if (this.cssClass) {
            removeClass([this.element], this.cssClass.split(SPACE));
        }
        this.element.classList.remove(RTL_CSS, RIBBON_SIMPLIFIED_MODE, RIBBON_OVERFLOW, RIBBON_COLLAPSIBLE, RIBBON_MINIMIZE, 'e-rbn');
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
                        (_a = this.element.classList).remove.apply(_a, oldProp.cssClass.split(SPACE));
                    }
                    if (newProp.cssClass) {
                        (_b = this.element.classList).add.apply(_b, newProp.cssClass.split(SPACE));
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
                    for (var i = 0; i < this.tabs.length; i++) {
                        var tabContent = this.tabObj.items[parseInt(i.toString(), 10)].content;
                        var tab = this.tabs[parseInt(i.toString(), 10)];
                        if (tabContent.querySelector('.' + RIBBON_GROUP)) {
                            for (var _d = 0, _e = tab.groups; _d < _e.length; _d++) {
                                var group = _e[_d];
                                if (group.showLauncherIcon) {
                                    var className = RIBBON_LAUNCHER_ICON_ELE + ' ' + (this.launcherIconCss || RIBBON_LAUNCHER_ICON);
                                    if (group.isCollapsed) {
                                        var element = tabContent.querySelector('#' + group.id + OVERFLOW_ID + DROPDOWN_ID);
                                        var dropdown = getComponent(element, DropDownButton);
                                        var launcherIconEle = dropdown.target.querySelector('#' + group.id + LAUNCHER_ID);
                                        launcherIconEle.className = className;
                                    }
                                    else {
                                        var element = tabContent.querySelector('#' + group.id + LAUNCHER_ID);
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
                        this.tabObj.element.style.setProperty(RIBBON_HELP_PANE_TEMPLATE_WIDTH, '0px');
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

/**
 * Ribbon modules
 */

/**
 * Defines the items of Ribbon.
 */
var RibbonFileMenu = /** @__PURE__ @class */ (function () {
    function RibbonFileMenu(parent) {
        this.parent = parent;
    }
    RibbonFileMenu.prototype.getModuleName = function () {
        return 'ribbonFileMenu';
    };
    RibbonFileMenu.prototype.destroy = function () {
        if (this.fileMenuDDB) {
            this.destroyDDB();
        }
        this.parent = null;
    };
    /**
     * Creates File Menu
     *
     * @param {FileMenuSettingsModel} fileMenuOptions - Gets the property of filemenu.
     * @returns {void}
     * @hidden
     */
    RibbonFileMenu.prototype.createFileMenu = function (fileMenuOptions) {
        var _this = this;
        if (!fileMenuOptions.visible) {
            return;
        }
        this.ddbElement = this.parent.createElement('button', {
            id: this.parent.element.id + RIBBON_FILE_MENU_ID
        });
        var tabEle = this.parent.tabObj.element;
        var toolbarEle = tabEle.querySelector('.e-toolbar');
        tabEle.insertBefore(this.ddbElement, toolbarEle);
        this.fileMenuDDB = new DropDownButton({
            content: fileMenuOptions.text,
            enableRtl: this.parent.enableRtl,
            cssClass: 'e-ribbon-file-menu e-caret-hide',
            created: function () {
                tabEle.style.setProperty(RIBBON_FILE_MENU_WIDTH, _this.ddbElement.offsetWidth + 'px');
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
    };
    RibbonFileMenu.prototype.addFileMenuTooltip = function (fileMenuOptions) {
        if (isTooltipPresent(fileMenuOptions.ribbonTooltipSettings)) {
            this.ddbElement.classList.add(RIBBON_TOOLTIP_TARGET);
            this.parent.tooltipData.push({ id: this.ddbElement.id, data: fileMenuOptions.ribbonTooltipSettings });
        }
    };
    RibbonFileMenu.prototype.ddbBeforeEvent = function (isOpen, args) {
        //args.event is null when dropdown button is closed using a method call
        if (!isOpen && args.event && args.event.target.closest('.e-ribbon-menu')) {
            args.cancel = true;
        }
        var event = isOpen ? this.parent.fileMenu.beforeOpen :
            this.parent.fileMenu.beforeClose;
        if (event) {
            var eventArgs = { cancel: args.cancel, element: args.element, event: args.event };
            event.call(this, eventArgs);
            args.cancel = eventArgs.cancel;
        }
    };
    RibbonFileMenu.prototype.ddbAfterEvent = function (isOpen, args) {
        var element = isOpen ? this.fileMenuDDB.target : this.fileMenuDDB.element;
        element.focus();
        var event = isOpen ? this.parent.fileMenu.open : this.parent.fileMenu.close;
        if (event) {
            var eventArgs = { element: args.element };
            event.call(this, eventArgs);
        }
    };
    //Clone RibbonMenuItems before assigning to avoid reference issues.
    RibbonFileMenu.prototype.cloneMenuItem = function (items) {
        var itemsList = [];
        for (var i = 0; i < items.length; i++) {
            var item = items[parseInt(i.toString(), 10)];
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
    };
    RibbonFileMenu.prototype.createRibbonMenu = function (menuOptions) {
        var _this = this;
        var ulElem = this.parent.createElement('ul', {
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
        EventHandler.add(ulElem, 'keydown', function (e) {
            if (e.key === 'Tab') {
                _this.fileMenuDDB.toggle();
            }
        }, this);
    };
    RibbonFileMenu.prototype.menuBeforeEvent = function (isOpen, args) {
        var event = isOpen ? this.parent.fileMenu.beforeOpen :
            this.parent.fileMenu.beforeClose;
        if (event) {
            var eventArgs = {
                cancel: args.cancel, element: args.element, event: args.event,
                items: args.items, parentItem: args.parentItem
            };
            event.call(this, eventArgs);
            args.cancel = eventArgs.cancel;
        }
    };
    RibbonFileMenu.prototype.menuAfterEvent = function (isOpen, args) {
        var event = isOpen ? this.parent.fileMenu.open : this.parent.fileMenu.close;
        if (event) {
            var eventArgs = { element: args.element, items: args.items, parentItem: args.parentItem };
            event.call(this, eventArgs);
        }
    };
    RibbonFileMenu.prototype.beforeItemRender = function (args) {
        var event = this.parent.fileMenu.beforeItemRender;
        if (event) {
            var eventArgs = { element: args.element, item: args.item };
            event.call(this, eventArgs);
        }
    };
    RibbonFileMenu.prototype.menuSelect = function (args) {
        var event = this.parent.fileMenu.select;
        if (event) {
            var eventArgs = { element: args.element, item: args.item, event: args.event };
            event.call(this, eventArgs);
            if (!args.element.classList.contains('e-menu-caret-icon')) {
                this.fileMenuDDB.toggle();
            }
        }
    };
    /**
     * setRtl
     *
     * @param {commonProperties} commonProp - Get the common property of ribbon.
     * @returns {void}
     * @hidden
     */
    RibbonFileMenu.prototype.setCommonProperties = function (commonProp) {
        if (this.fileMenuDDB) {
            this.fileMenuDDB.setProperties(commonProp);
            if (this.menuctrl) {
                this.menuctrl.setProperties(commonProp);
            }
        }
    };
    /**
     * Update FileMenu
     *
     * @param {FileMenuSettingsModel} fileMenuOptions - Gets the property of filemenu.
     * @returns {void}
     * @hidden
     */
    RibbonFileMenu.prototype.updateFileMenu = function (fileMenuOptions) {
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
    };
    RibbonFileMenu.prototype.destroyMenu = function () {
        if (this.menuctrl) {
            this.menuctrl.destroy();
            this.menuctrl = null;
        }
    };
    RibbonFileMenu.prototype.destroyDDB = function () {
        this.removeFileMenuTooltip();
        var tabEle = this.parent.tabObj.element;
        tabEle.style.removeProperty(RIBBON_FILE_MENU_WIDTH);
        this.destroyMenu();
        this.fileMenuDDB.destroy();
        this.fileMenuDDB = null;
        remove(this.ddbElement);
        this.ddbElement = null;
    };
    RibbonFileMenu.prototype.removeFileMenuTooltip = function () {
        var _this = this;
        var index = getIndex(this.parent.tooltipData, function (e) { return e.id === _this.ddbElement.id; });
        if (index !== -1) {
            this.ddbElement.classList.remove(RIBBON_TOOLTIP_TARGET);
            this.parent.tooltipData.splice(index, 1);
        }
    };
    /**
     * Add items to FileMenu.
     *
     * @param {MenuItemModel[]} items - Gets the items to be added.
     * @param {string} target - Gets the target item to add the items.
     * @param {boolean} isAfter - Gets the boolean value to add the items after or before the target item.
     * @param {boolean} isUniqueId - Gets whether the target provided is uniqueId or not.
     * @returns {void}
     */
    RibbonFileMenu.prototype.addItems = function (items, target, isAfter, isUniqueId) {
        if (isAfter) {
            this.menuctrl.insertAfter(items, target, isUniqueId);
        }
        else {
            this.menuctrl.insertBefore(items, target, isUniqueId);
        }
        this.parent.fileMenu.setProperties({ menuItems: this.menuctrl.items }, true);
    };
    /**
     * Remove items from FileMenu.
     *
     * @param {string[]} items - Gets the items to be removed.
     * @param {boolean} isUniqueId - Gets whether the target provided is uniqueId or not.
     * @returns {void}
     */
    RibbonFileMenu.prototype.removeItems = function (items, isUniqueId) {
        this.menuctrl.removeItems(items, isUniqueId);
        this.parent.fileMenu.setProperties({ menuItems: this.menuctrl.items }, true);
    };
    /**
     * Enable items in FileMenu.
     *
     * @param {string[]} items - Gets the items to be enabled.
     * @param {boolean} isUniqueId - Gets whether the target provided is uniqueId or not.
     * @returns {void}
     */
    RibbonFileMenu.prototype.enableItems = function (items, isUniqueId) {
        this.menuctrl.enableItems(items, true, isUniqueId);
        this.parent.fileMenu.setProperties({ menuItems: this.menuctrl.items }, true);
    };
    /**
     * Disable items in FileMenu.
     *
     * @param {string[]} items - Gets the items to be disabled.
     * @param {boolean} isUniqueId - Gets whether the target provided is uniqueId or not.
     * @returns {void}
     */
    RibbonFileMenu.prototype.disableItems = function (items, isUniqueId) {
        this.menuctrl.enableItems(items, false, isUniqueId);
        this.parent.fileMenu.setProperties({ menuItems: this.menuctrl.items }, true);
    };
    /**
     * Update items in FileMenu.
     *
     * @param {MenuItem} item - Gets the item to be updated.
     * @param {boolean} id - Gets the id of the item to be updated.
     * @param {boolean} isUniqueId - Gets whether the id provided is uniqueId or not.
     * @returns {void}
     */
    RibbonFileMenu.prototype.setItem = function (item, id, isUniqueId) {
        this.menuctrl.setItem(item, id, isUniqueId);
        this.menuctrl.refresh();
        this.parent.fileMenu.setProperties({ menuItems: this.menuctrl.items }, true);
    };
    return RibbonFileMenu;
}());

/**
 * Ribbon modules
 */

// export all modules from current location
// example: export * from './module'

export { Ribbon, RibbonLayout, ItemOrientation, RibbonItemSize, DisplayMode, RibbonItemType, ITEM_VERTICAL_CENTER, EXPAND_COLLAPSE_ICON, OVERFLOW_ICON, VERTICAL_DDB, DISABLED_CSS, RTL_CSS, RIBBON_HOVER, RIBBON_CONTROL, RIBBON_POPUP_CONTROL, RIBBON_POPUP_OPEN, SPACE, HORIZONTAL_SCROLLBAR, HIDE_CSS, RIBBON_TAB, RIBBON_TAB_ACTIVE, RIBBON_TAB_ITEM, RIBBON_COLLAPSE_BUTTON, RIBBON_EXPAND_BUTTON, RIBBON_COLLAPSIBLE, RIBBON_OVERALL_OF_BUTTON, RIBBON_GROUP_OF_BUTTON, RIBBON_OVERFLOW_TARGET, RIBBON_OVERFLOW, TAB_CONTENT, RIBBON_MINIMIZE, RIBBON_GROUP, RIBBON_GROUP_CONTAINER, RIBBON_OF_TAB_CONTAINER, RIBBON_OF_GROUP_CONTAINER, RIBBON_GROUP_CONTENT, RIBBON_GROUP_HEADER, RIBBON_OVERFLOW_HEADER, RIBBON_GROUP_OVERFLOW, RIBBON_GROUP_OVERFLOW_DDB, RIBBON_LAUNCHER, RIBBON_LAUNCHER_ICON_ELE, RIBBON_LAUNCHER_ICON, RIBBON_COLLECTION, RIBBON_ITEM, RIBBON_ROW, RIBBON_COLUMN, RIBBON_LARGE_ITEM, RIBBON_MEDIUM_ITEM, RIBBON_SMALL_ITEM, RIBBON_CONTENT_HEIGHT, DROPDOWNBUTTON, DROPDOWNBUTTON_HIDE, RIBBON_TEMPLATE, RIBBON_HELP_TEMPLATE, RIBBON_TOOLTIP, RIBBON_TOOLTIP_TARGET, RIBBON_TOOLTIP_TITLE, RIBBON_TOOLTIP_CONTENT, RIBBON_TOOLTIP_ICON, RIBBON_TOOLTIP_CONTAINER, RIBBON_TEXT_CONTAINER, RIBBON_SIMPLIFIED_MODE, TAB_ID, GROUP_ID, COLLECTION_ID, ITEM_ID, COLLAPSE_BUTTON_ID, OVRLOF_BUTTON_ID, GROUPOF_BUTTON_ID, HEADER_ID, LAUNCHER_ID, CONTENT_ID, CONTAINER_ID, OVERFLOW_ID, DROPDOWN_ID, RIBBON_FILE_MENU_ID, RIBBON_FILE_MENU_LIST, RIBBON_HELP_PANE_TEMPLATE_ID, RIBBON_FILE_MENU_WIDTH, RIBBON_HELP_PANE_TEMPLATE_WIDTH, getIndex, getTemplateFunction, getItem, getCollection, getGroup, destroyControl, updateCommonProperty, updateControlDisabled, getItemElement, isTooltipPresent, setToolTipContent, createTooltip, destroyTooltip, updateTooltipProp, RibbonTab, RibbonGroup, RibbonCollection, RibbonItem, RibbonButtonSettings, RibbonCheckBoxSettings, RibbonColorPickerSettings, RibbonComboBoxSettings, RibbonDropDownSettings, RibbonSplitButtonSettings, FileMenuSettings, RibbonTooltip, RibbonButton, RibbonCheckBox, RibbonColorPicker, RibbonComboBox, RibbonDropDown, RibbonSplitButton, RibbonFileMenu };
//# sourceMappingURL=ej2-ribbon.es5.js.map
