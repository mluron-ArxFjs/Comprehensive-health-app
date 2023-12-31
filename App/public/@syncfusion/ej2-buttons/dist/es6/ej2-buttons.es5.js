import { Animation, ChildProperty, Collection, Complex, Component, Event, EventHandler, KeyboardEvents, NotifyPropertyChanges, Observer, Property, SanitizeHtmlHelper, addClass, append, attributes, closest, compile, deleteObject, detach, extend, formatUnit, getInstance, getUniqueID, getValue, isBlazor, isNullOrUndefined, isRippleEnabled, remove, removeClass, rippleEffect, select, selectAll, setValue } from '@syncfusion/ej2-base';

/**
 * Initialize wrapper element for angular.
 *
 * @private
 *
 * @param {CreateElementArgs} createElement - Specifies created element args
 * @param {string} tag - Specifies tag name
 * @param {string} type - Specifies type name
 * @param {HTMLInputElement} element - Specifies input element
 * @param {string} WRAPPER - Specifies wrapper element
 * @param {string} role - Specifies role
 * @returns {HTMLInputElement} - Input Element
 */
function wrapperInitialize(createElement, tag, type, element, WRAPPER, role) {
    var input = element;
    if (element.tagName === tag) {
        var ejInstance = getValue('ej2_instances', element);
        input = createElement('input', { attrs: { 'type': type } });
        var props = ['change', 'cssClass', 'label', 'labelPosition', 'id'];
        for (var index = 0, len = element.attributes.length; index < len; index++) {
            if (props.indexOf(element.attributes[index].nodeName) === -1) {
                input.setAttribute(element.attributes[index].nodeName, element.attributes[index].nodeValue);
            }
        }
        attributes(element, { 'class': WRAPPER });
        element.appendChild(input);
        setValue('ej2_instances', ejInstance, input);
        deleteObject(element, 'ej2_instances');
    }
    return input;
}
/**
 * Get the text node.
 *
 * @param {HTMLElement} element - Specifies html element
 * @private
 * @returns {Node} - Text node.
 */
function getTextNode(element) {
    var node;
    var childnode = element.childNodes;
    for (var i = 0; i < childnode.length; i++) {
        node = childnode[i];
        if (node.nodeType === 3) {
            return node;
        }
    }
    return null;
}
/**
 * Destroy the button components.
 *
 * @private
 * @param {Switch | CheckBox} ejInst - Specifies eJ2 Instance
 * @param {Element} wrapper - Specifies wrapper element
 * @param {string} tagName - Specifies tag name
 * @returns {void}
 */
function destroy(ejInst, wrapper, tagName) {
    if (tagName === 'INPUT') {
        wrapper.parentNode.insertBefore(ejInst.element, wrapper);
        detach(wrapper);
        ejInst.element.checked = false;
        ['name', 'value', 'disabled'].forEach(function (key) {
            ejInst.element.removeAttribute(key);
        });
    }
    else {
        ['role', 'aria-checked', 'class'].forEach(function (key) {
            wrapper.removeAttribute(key);
        });
        wrapper.innerHTML = '';
    }
}
/**
 * Initialize control pre rendering.
 *
 * @private
 * @param {Switch | CheckBox} proxy - Specifies proxy
 * @param {string} control - Specifies control
 * @param {string} wrapper - Specifies wrapper element
 * @param {HTMLInputElement} element - Specifies input element
 * @param {string} moduleName - Specifies module name
 * @returns {void}
 */
function preRender(proxy, control, wrapper, element, moduleName) {
    element = wrapperInitialize(proxy.createElement, control, 'checkbox', element, wrapper, moduleName);
    proxy.element = element;
    if (proxy.element.getAttribute('type') !== 'checkbox') {
        proxy.element.setAttribute('type', 'checkbox');
    }
    if (!proxy.element.id) {
        proxy.element.id = getUniqueID('e-' + moduleName);
    }
}
/**
 * Creates CheckBox component UI with theming and ripple support.
 *
 * @private
 * @param {CreateElementArgs} createElement - Specifies Created Element args
 * @param {boolean} enableRipple - Specifies ripple effect
 * @param {CheckBoxUtilModel} options - Specifies Checkbox util Model
 * @returns {Element} - Checkbox Element
 */
function createCheckBox(createElement, enableRipple, options) {
    if (enableRipple === void 0) { enableRipple = false; }
    if (options === void 0) { options = {}; }
    var wrapper = createElement('div', { className: 'e-checkbox-wrapper e-css' });
    if (options.cssClass) {
        addClass([wrapper], options.cssClass.split(' '));
    }
    if (options.enableRtl) {
        wrapper.classList.add('e-rtl');
    }
    if (enableRipple) {
        var rippleSpan = createElement('span', { className: 'e-ripple-container' });
        rippleEffect(rippleSpan, { isCenterRipple: true, duration: 400 });
        wrapper.appendChild(rippleSpan);
    }
    var frameSpan = createElement('span', { className: 'e-frame e-icons' });
    if (options.checked) {
        frameSpan.classList.add('e-check');
    }
    wrapper.appendChild(frameSpan);
    if (options.label) {
        var labelSpan = createElement('span', { className: 'e-label' });
        if (options.disableHtmlEncode) {
            labelSpan.textContent = options.label;
        }
        else {
            labelSpan.innerHTML = options.label;
        }
        wrapper.appendChild(labelSpan);
    }
    return wrapper;
}
/**
 * Handles ripple mouse.
 *
 * @private
 * @param {MouseEvent} e - Specifies mouse event
 * @param {Element} rippleSpan - Specifies Ripple span element
 * @returns {void}
 */
function rippleMouseHandler(e, rippleSpan) {
    if (rippleSpan) {
        var event_1 = document.createEvent('MouseEvents');
        event_1.initEvent(e.type, false, true);
        rippleSpan.dispatchEvent(event_1);
    }
}
/**
 * Append hidden input to given element
 *
 * @private
 * @param {Switch | CheckBox} proxy - Specifies Proxy
 * @param {Element} wrap - Specifies Wrapper ELement
 * @returns {void}
 */
function setHiddenInput(proxy, wrap) {
    if (proxy.element.getAttribute('ejs-for')) {
        wrap.appendChild(proxy.createElement('input', {
            attrs: { 'name': proxy.name || proxy.element.name, 'value': 'false', 'type': 'hidden' }
        }));
    }
}

/**
 * Common modules
 */

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
 * Defines the icon position of button.
 */
var IconPosition;
(function (IconPosition) {
    /**
     * Positions the Icon at the left of the text content in the Button.
     */
    IconPosition["Left"] = "Left";
    /**
     * Positions the Icon at the right of the text content in the Button.
     */
    IconPosition["Right"] = "Right";
    /**
     * Positions the Icon at the top of the text content in the Button.
     */
    IconPosition["Top"] = "Top";
    /**
     * Positions the Icon at the bottom of the text content in the Button.
     */
    IconPosition["Bottom"] = "Bottom";
})(IconPosition || (IconPosition = {}));
var buttonObserver = new Observer();
var cssClassName = {
    RTL: 'e-rtl',
    BUTTON: 'e-btn',
    PRIMARY: 'e-primary',
    ICONBTN: 'e-icon-btn'
};
/**
 * The Button is a graphical user interface element that triggers an event on its click action. It can contain a text, an image, or both.
 * ```html
 * <button id="button">Button</button>
 * ```
 * ```typescript
 * <script>
 * var btnObj = new Button();
 * btnObj.appendTo("#button");
 * </script>
 * ```
 */
var Button = /** @__PURE__ @class */ (function (_super) {
    __extends(Button, _super);
    /**
     * Constructor for creating the widget
     *
     * @param  {ButtonModel} options - Specifies the button model
     * @param  {string|HTMLButtonElement} element - Specifies the target element
     */
    function Button(options, element) {
        return _super.call(this, options, element) || this;
    }
    Button.prototype.preRender = function () {
        // pre render code snippets
    };
    /**
     * Initialize the control rendering
     *
     * @returns {void}
     * @private
     */
    Button.prototype.render = function () {
        this.initialize();
        this.removeRippleEffect = rippleEffect(this.element, { selector: '.' + cssClassName.BUTTON });
        this.renderComplete();
    };
    Button.prototype.initialize = function () {
        if (this.cssClass) {
            addClass([this.element], this.cssClass.replace(/\s+/g, ' ').trim().split(' '));
        }
        if (this.isPrimary) {
            this.element.classList.add(cssClassName.PRIMARY);
        }
        if (!isBlazor() || (isBlazor() && this.getModuleName() !== 'progress-btn')) {
            if (this.content) {
                var tempContent = (this.enableHtmlSanitizer) ? SanitizeHtmlHelper.sanitize(this.content) : this.content;
                this.element.innerHTML = tempContent;
            }
            this.setIconCss();
        }
        if (this.enableRtl) {
            this.element.classList.add(cssClassName.RTL);
        }
        if (this.disabled) {
            this.controlStatus(this.disabled);
        }
        else {
            this.wireEvents();
        }
    };
    Button.prototype.controlStatus = function (disabled) {
        this.element.disabled = disabled;
    };
    Button.prototype.setIconCss = function () {
        if (this.iconCss) {
            var span = this.createElement('span', { className: 'e-btn-icon ' + this.iconCss });
            if (!this.element.textContent.trim()) {
                this.element.classList.add(cssClassName.ICONBTN);
            }
            else {
                span.classList.add('e-icon-' + this.iconPosition.toLowerCase());
                if (this.iconPosition === 'Top' || this.iconPosition === 'Bottom') {
                    this.element.classList.add('e-' + this.iconPosition.toLowerCase() + '-icon-btn');
                }
            }
            var node = this.element.childNodes[0];
            if (node && (this.iconPosition === 'Left' || this.iconPosition === 'Top')) {
                this.element.insertBefore(span, node);
            }
            else {
                this.element.appendChild(span);
            }
        }
    };
    Button.prototype.wireEvents = function () {
        if (this.isToggle) {
            EventHandler.add(this.element, 'click', this.btnClickHandler, this);
        }
    };
    Button.prototype.unWireEvents = function () {
        if (this.isToggle) {
            EventHandler.remove(this.element, 'click', this.btnClickHandler);
        }
    };
    Button.prototype.btnClickHandler = function () {
        if (this.element.classList.contains('e-active')) {
            this.element.classList.remove('e-active');
        }
        else {
            this.element.classList.add('e-active');
        }
    };
    /**
     * Destroys the widget.
     *
     * @returns {void}
     */
    Button.prototype.destroy = function () {
        var classList = [cssClassName.PRIMARY, cssClassName.RTL, cssClassName.ICONBTN, 'e-success', 'e-info', 'e-danger',
            'e-warning', 'e-flat', 'e-outline', 'e-small', 'e-bigger', 'e-active', 'e-round',
            'e-top-icon-btn', 'e-bottom-icon-btn'];
        if (this.cssClass) {
            classList = classList.concat(this.cssClass.split(' '));
        }
        _super.prototype.destroy.call(this);
        removeClass([this.element], classList);
        if (!this.element.getAttribute('class')) {
            this.element.removeAttribute('class');
        }
        if (this.disabled) {
            this.element.removeAttribute('disabled');
        }
        if (this.content) {
            this.element.innerHTML = this.element.innerHTML.replace(this.content, '');
        }
        var span = this.element.querySelector('span.e-btn-icon');
        if (span) {
            detach(span);
        }
        this.unWireEvents();
        if (isRippleEnabled) {
            this.removeRippleEffect();
        }
    };
    /**
     * Get component name.
     *
     * @returns {string} - Module name
     * @private
     */
    Button.prototype.getModuleName = function () {
        return 'btn';
    };
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @returns {string} - Persist Data
     * @private
     */
    Button.prototype.getPersistData = function () {
        return this.addOnPersist([]);
    };
    /**
     * Dynamically injects the required modules to the component.
     *
     * @private
     * @returns {void}
     */
    Button.Inject = function () {
        // Inject code snippets
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param  {ButtonModel} newProp - Specifies new properties
     * @param  {ButtonModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    Button.prototype.onPropertyChanged = function (newProp, oldProp) {
        var span = this.element.querySelector('span.e-btn-icon');
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'isPrimary':
                    if (newProp.isPrimary) {
                        this.element.classList.add(cssClassName.PRIMARY);
                    }
                    else {
                        this.element.classList.remove(cssClassName.PRIMARY);
                    }
                    break;
                case 'disabled':
                    this.controlStatus(newProp.disabled);
                    break;
                case 'iconCss': {
                    if (span) {
                        if (newProp.iconCss) {
                            span.className = 'e-btn-icon ' + newProp.iconCss;
                            if (this.element.textContent.trim()) {
                                if (this.iconPosition === 'Left') {
                                    span.classList.add('e-icon-left');
                                }
                                else {
                                    span.classList.add('e-icon-right');
                                }
                            }
                        }
                        else {
                            detach(span);
                        }
                    }
                    else {
                        this.setIconCss();
                    }
                    break;
                }
                case 'iconPosition':
                    removeClass([this.element], ['e-top-icon-btn', 'e-bottom-icon-btn']);
                    span = this.element.querySelector('span.e-btn-icon');
                    if (span) {
                        detach(span);
                    }
                    this.setIconCss();
                    break;
                case 'cssClass':
                    if (oldProp.cssClass) {
                        removeClass([this.element], oldProp.cssClass.split(' '));
                    }
                    if (newProp.cssClass) {
                        addClass([this.element], newProp.cssClass.replace(/\s+/g, ' ').trim().split(' '));
                    }
                    break;
                case 'enableRtl':
                    if (newProp.enableRtl) {
                        this.element.classList.add(cssClassName.RTL);
                    }
                    else {
                        this.element.classList.remove(cssClassName.RTL);
                    }
                    break;
                case 'content': {
                    var node = getTextNode(this.element);
                    if (!node) {
                        this.element.classList.remove(cssClassName.ICONBTN);
                    }
                    if (!isBlazor() || (isBlazor() && !this.isServerRendered && this.getModuleName() !== 'progress-btn')) {
                        if (this.enableHtmlSanitizer) {
                            newProp.content = SanitizeHtmlHelper.sanitize(newProp.content);
                        }
                        this.element.innerHTML = newProp.content;
                        this.setIconCss();
                    }
                    break;
                }
                case 'isToggle':
                    if (newProp.isToggle) {
                        EventHandler.add(this.element, 'click', this.btnClickHandler, this);
                    }
                    else {
                        EventHandler.remove(this.element, 'click', this.btnClickHandler);
                        removeClass([this.element], ['e-active']);
                    }
                    break;
            }
        }
    };
    /**
     * Click the button element
     * its native method
     *
     * @public
     * @returns {void}
     */
    Button.prototype.click = function () {
        this.element.click();
    };
    /**
     * Sets the focus to Button
     * its native method
     *
     * @public
     * @returns {void}
     */
    Button.prototype.focusIn = function () {
        this.element.focus();
    };
    __decorate([
        Property('Left')
    ], Button.prototype, "iconPosition", void 0);
    __decorate([
        Property('')
    ], Button.prototype, "iconCss", void 0);
    __decorate([
        Property(false)
    ], Button.prototype, "disabled", void 0);
    __decorate([
        Property(false)
    ], Button.prototype, "isPrimary", void 0);
    __decorate([
        Property('')
    ], Button.prototype, "cssClass", void 0);
    __decorate([
        Property('')
    ], Button.prototype, "content", void 0);
    __decorate([
        Property(false)
    ], Button.prototype, "isToggle", void 0);
    __decorate([
        Property()
    ], Button.prototype, "locale", void 0);
    __decorate([
        Property(false)
    ], Button.prototype, "enableHtmlSanitizer", void 0);
    __decorate([
        Event()
    ], Button.prototype, "created", void 0);
    Button = __decorate([
        NotifyPropertyChanges
    ], Button);
    return Button;
}(Component));

/**
 * Button modules
 */

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
var CHECK = 'e-check';
var DISABLED = 'e-checkbox-disabled';
var FRAME = 'e-frame';
var INDETERMINATE = 'e-stop';
var LABEL = 'e-label';
var RIPPLE = 'e-ripple-container';
var RIPPLECHECK = 'e-ripple-check';
var RIPPLEINDETERMINATE = 'e-ripple-stop';
var RTL = 'e-rtl';
var WRAPPER = 'e-checkbox-wrapper';
var containerAttr = ['title', 'class', 'style', 'disabled', 'readonly', 'name', 'value'];
/**
 * The CheckBox is a graphical user interface element that allows you to select one or more options from the choices.
 * It contains checked, unchecked, and indeterminate states.
 * ```html
 * <input type="checkbox" id="checkbox"/>
 * <script>
 * var checkboxObj = new CheckBox({ label: "Default" });
 * checkboxObj.appendTo("#checkbox");
 * </script>
 * ```
 */
var CheckBox = /** @__PURE__ @class */ (function (_super) {
    __extends$1(CheckBox, _super);
    /**
     * Constructor for creating the widget
     *
     * @private
     * @param {CheckBoxModel} options - Specifies checkbox model
     * @param {string | HTMLInputElement} element - Specifies target element
     */
    function CheckBox(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.isFocused = false;
        _this.isMouseClick = false;
        _this.clickTriggered = false;
        _this.validCheck = true;
        return _this;
    }
    CheckBox.prototype.changeState = function (state, isInitialize) {
        var rippleSpan;
        var frameSpan = this.getWrapper().getElementsByClassName(FRAME)[0];
        if (isRippleEnabled) {
            rippleSpan = this.getWrapper().getElementsByClassName(RIPPLE)[0];
        }
        if (state === 'check') {
            frameSpan.classList.remove(INDETERMINATE);
            frameSpan.classList.add(CHECK);
            if (rippleSpan) {
                rippleSpan.classList.remove(RIPPLEINDETERMINATE);
                rippleSpan.classList.add(RIPPLECHECK);
            }
            this.element.checked = true;
            if ((this.element.required || closest(this.element, 'form') && closest(this.element, 'form').classList.contains('e-formvalidator')) && this.validCheck && !isInitialize) {
                this.element.checked = false;
                this.validCheck = false;
            }
            else if (this.element.required || closest(this.element, 'form') && closest(this.element, 'form').classList.contains('e-formvalidator')) {
                this.validCheck = true;
            }
        }
        else if (state === 'uncheck') {
            removeClass([frameSpan], [CHECK, INDETERMINATE]);
            if (rippleSpan) {
                removeClass([rippleSpan], [RIPPLECHECK, RIPPLEINDETERMINATE]);
            }
            this.element.checked = false;
            if ((this.element.required || closest(this.element, 'form') && closest(this.element, 'form').classList.contains('e-formvalidator')) && this.validCheck && !isInitialize) {
                this.element.checked = true;
                this.validCheck = false;
            }
            else if (this.element.required || closest(this.element, 'form') && closest(this.element, 'form').classList.contains('e-formvalidator')) {
                this.validCheck = true;
            }
        }
        else {
            frameSpan.classList.remove(CHECK);
            frameSpan.classList.add(INDETERMINATE);
            if (rippleSpan) {
                rippleSpan.classList.remove(RIPPLECHECK);
                rippleSpan.classList.add(RIPPLEINDETERMINATE);
            }
            this.element.indeterminate = true;
            this.indeterminate = true;
        }
    };
    CheckBox.prototype.clickHandler = function (event) {
        if (event.target.tagName === 'INPUT' && this.clickTriggered) {
            if (this.isVue) {
                this.changeState(this.checked ? 'check' : 'uncheck');
            }
            this.clickTriggered = false;
            return;
        }
        if (event.target.tagName === 'SPAN' || event.target.tagName === 'LABEL') {
            this.clickTriggered = true;
        }
        if (this.isMouseClick) {
            this.focusOutHandler();
            this.isMouseClick = false;
        }
        if (this.indeterminate) {
            this.changeState(this.checked ? 'check' : 'uncheck');
            this.indeterminate = false;
            this.element.indeterminate = false;
        }
        else if (this.checked) {
            this.changeState('uncheck');
            this.checked = false;
        }
        else {
            this.changeState('check');
            this.checked = true;
        }
        var changeEventArgs = { checked: this.updateVueArrayModel(false), event: event };
        this.trigger('change', changeEventArgs);
        event.stopPropagation();
    };
    /**
     * Destroys the widget.
     *
     * @returns {void}
     */
    CheckBox.prototype.destroy = function () {
        var _this = this;
        var wrapper = this.getWrapper();
        _super.prototype.destroy.call(this);
        if (this.wrapper) {
            wrapper = this.wrapper;
            if (!this.disabled) {
                this.unWireEvents();
            }
            if (this.tagName === 'INPUT') {
                if (this.getWrapper() && wrapper.parentNode) {
                    wrapper.parentNode.insertBefore(this.element, wrapper);
                }
                detach(wrapper);
                this.element.checked = false;
                if (this.indeterminate) {
                    this.element.indeterminate = false;
                }
                ['name', 'value', 'disabled'].forEach(function (key) {
                    _this.element.removeAttribute(key);
                });
            }
            else {
                ['class'].forEach(function (key) {
                    wrapper.removeAttribute(key);
                });
                wrapper.innerHTML = '';
            }
        }
    };
    CheckBox.prototype.focusHandler = function () {
        this.isFocused = true;
    };
    CheckBox.prototype.focusOutHandler = function () {
        var wrapper = this.getWrapper();
        if (wrapper) {
            wrapper.classList.remove('e-focus');
        }
        this.isFocused = false;
    };
    /**
     * Gets the module name.
     *
     * @private
     * @returns {string} - Module Name
     */
    CheckBox.prototype.getModuleName = function () {
        return 'checkbox';
    };
    /**
     * Gets the properties to be maintained in the persistence state.
     *
     * @private
     * @returns {string} - Persist Data
     */
    CheckBox.prototype.getPersistData = function () {
        return this.addOnPersist(['checked', 'indeterminate']);
    };
    CheckBox.prototype.getWrapper = function () {
        if (this.element && this.element.parentElement) {
            return this.element.parentElement.parentElement;
        }
        else {
            return null;
        }
    };
    CheckBox.prototype.initialize = function () {
        if (isNullOrUndefined(this.initialCheckedValue)) {
            this.initialCheckedValue = this.checked;
        }
        if (this.name) {
            this.element.setAttribute('name', this.name);
        }
        if (this.value) {
            this.element.setAttribute('value', this.value);
            if (this.isVue && typeof this.value === 'boolean' && this.value === true) {
                this.setProperties({ 'checked': true }, true);
            }
        }
        if (this.checked) {
            this.changeState('check', true);
        }
        if (this.indeterminate) {
            this.changeState();
        }
        if (this.disabled) {
            this.setDisabled();
        }
    };
    CheckBox.prototype.initWrapper = function () {
        var wrapper = this.element.parentElement;
        if (!wrapper.classList.contains(WRAPPER)) {
            wrapper = this.createElement('div', {
                className: WRAPPER
            });
            this.element.parentNode.insertBefore(wrapper, this.element);
        }
        var label = this.createElement('label', { attrs: { for: this.element.id } });
        var frameSpan = this.createElement('span', { className: 'e-icons ' + FRAME });
        wrapper.classList.add('e-wrapper');
        if (this.enableRtl) {
            wrapper.classList.add(RTL);
        }
        if (this.cssClass) {
            addClass([wrapper], this.cssClass.replace(/\s+/g, ' ').trim().split(' '));
        }
        wrapper.appendChild(label);
        label.appendChild(this.element);
        setHiddenInput(this, label);
        label.appendChild(frameSpan);
        if (isRippleEnabled) {
            var rippleSpan = this.createElement('span', { className: RIPPLE });
            if (this.labelPosition === 'Before') {
                label.appendChild(rippleSpan);
            }
            else {
                label.insertBefore(rippleSpan, frameSpan);
            }
            rippleEffect(rippleSpan, { duration: 400, isCenterRipple: true });
        }
        if (this.label) {
            this.setText(this.label);
        }
    };
    CheckBox.prototype.keyUpHandler = function () {
        if (this.isFocused) {
            this.getWrapper().classList.add('e-focus');
        }
    };
    CheckBox.prototype.labelMouseDownHandler = function (e) {
        this.isMouseClick = true;
        var rippleSpan = this.getWrapper().getElementsByClassName(RIPPLE)[0];
        rippleMouseHandler(e, rippleSpan);
    };
    CheckBox.prototype.labelMouseUpHandler = function (e) {
        this.isMouseClick = true;
        var rippleSpan = this.getWrapper().getElementsByClassName(RIPPLE)[0];
        if (rippleSpan) {
            var rippleElem = rippleSpan.querySelectorAll('.e-ripple-element');
            for (var i = 0; i < rippleElem.length - 1; i++) {
                rippleSpan.removeChild(rippleSpan.childNodes[i]);
            }
            rippleMouseHandler(e, rippleSpan);
        }
    };
    /**
     * Called internally if any of the property value changes.
     *
     * @private
     * @param {CheckBoxModel} newProp - Specifies new Properties
     * @param {CheckBoxModel} oldProp - Specifies old Properties
     *
     * @returns {void}
     */
    CheckBox.prototype.onPropertyChanged = function (newProp, oldProp) {
        var wrapper = this.getWrapper();
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'checked':
                    this.indeterminate = false;
                    this.element.indeterminate = false;
                    this.changeState(newProp.checked ? 'check' : 'uncheck');
                    break;
                case 'indeterminate':
                    if (newProp.indeterminate) {
                        this.changeState();
                    }
                    else {
                        this.element.indeterminate = false;
                        this.changeState(this.checked ? 'check' : 'uncheck');
                    }
                    break;
                case 'disabled':
                    if (newProp.disabled) {
                        this.setDisabled();
                        this.wrapper = this.getWrapper();
                        this.unWireEvents();
                    }
                    else {
                        this.element.disabled = false;
                        wrapper.classList.remove(DISABLED);
                        wrapper.setAttribute('aria-disabled', 'false');
                        this.wireEvents();
                    }
                    break;
                case 'cssClass':
                    if (oldProp.cssClass) {
                        removeClass([wrapper], oldProp.cssClass.split(' '));
                    }
                    if (newProp.cssClass) {
                        addClass([wrapper], newProp.cssClass.replace(/\s+/g, ' ').trim().split(' '));
                    }
                    break;
                case 'enableRtl':
                    if (newProp.enableRtl) {
                        wrapper.classList.add(RTL);
                    }
                    else {
                        wrapper.classList.remove(RTL);
                    }
                    break;
                case 'label':
                    this.setText(newProp.label);
                    break;
                case 'labelPosition': {
                    var label = wrapper.getElementsByClassName(LABEL)[0];
                    var labelWrap = wrapper.getElementsByTagName('label')[0];
                    detach(label);
                    if (newProp.labelPosition === 'After') {
                        labelWrap.appendChild(label);
                    }
                    else {
                        labelWrap.insertBefore(label, wrapper.getElementsByClassName(FRAME)[0]);
                    }
                    break;
                }
                case 'name':
                    this.element.setAttribute('name', newProp.name);
                    break;
                case 'value':
                    if (this.isVue && typeof newProp.value === 'object') {
                        break;
                    }
                    this.element.setAttribute('value', newProp.value);
                    break;
                case 'htmlAttributes':
                    this.updateHtmlAttributeToWrapper();
                    break;
            }
        }
    };
    /**
     * Initialize Angular, React and Unique ID support.
     *
     * @private
     * @returns {void}
     */
    CheckBox.prototype.preRender = function () {
        var element = this.element;
        this.tagName = this.element.tagName;
        element = wrapperInitialize(this.createElement, 'EJS-CHECKBOX', 'checkbox', element, WRAPPER, 'checkbox');
        this.element = element;
        if (this.element.getAttribute('type') !== 'checkbox') {
            this.element.setAttribute('type', 'checkbox');
        }
        if (!this.element.id) {
            this.element.id = getUniqueID('e-' + this.getModuleName());
        }
    };
    /**
     * Initialize the control rendering.
     *
     * @private
     * @returns {void}
     */
    CheckBox.prototype.render = function () {
        this.initWrapper();
        this.initialize();
        if (!this.disabled) {
            this.wireEvents();
        }
        this.updateHtmlAttributeToWrapper();
        this.updateVueArrayModel(true);
        this.renderComplete();
        this.wrapper = this.getWrapper();
    };
    CheckBox.prototype.setDisabled = function () {
        var wrapper = this.getWrapper();
        this.element.disabled = true;
        wrapper.classList.add(DISABLED);
        wrapper.setAttribute('aria-disabled', 'true');
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CheckBox.prototype.setText = function (text) {
        var wrapper = this.getWrapper();
        if (!wrapper) {
            return;
        }
        var label = wrapper.getElementsByClassName(LABEL)[0];
        if (label) {
            label.textContent = text;
        }
        else {
            text = (this.enableHtmlSanitizer) ? SanitizeHtmlHelper.sanitize(text) : text;
            label = this.createElement('span', { className: LABEL, innerHTML: text });
            var labelWrap = wrapper.getElementsByTagName('label')[0];
            if (this.labelPosition === 'Before') {
                labelWrap.insertBefore(label, wrapper.getElementsByClassName(FRAME)[0]);
            }
            else {
                labelWrap.appendChild(label);
            }
        }
    };
    CheckBox.prototype.changeHandler = function (e) {
        e.stopPropagation();
    };
    CheckBox.prototype.formResetHandler = function () {
        this.checked = this.initialCheckedValue;
        this.element.checked = this.initialCheckedValue;
    };
    CheckBox.prototype.unWireEvents = function () {
        var wrapper = this.wrapper;
        EventHandler.remove(wrapper, 'click', this.clickHandler);
        EventHandler.remove(this.element, 'keyup', this.keyUpHandler);
        EventHandler.remove(this.element, 'focus', this.focusHandler);
        EventHandler.remove(this.element, 'focusout', this.focusOutHandler);
        var label = wrapper.getElementsByTagName('label')[0];
        EventHandler.remove(label, 'mousedown', this.labelMouseDownHandler);
        EventHandler.remove(label, 'mouseup', this.labelMouseUpHandler);
        var formElem = closest(this.element, 'form');
        if (formElem) {
            EventHandler.remove(formElem, 'reset', this.formResetHandler);
        }
        if (this.tagName === 'EJS-CHECKBOX') {
            EventHandler.remove(this.element, 'change', this.changeHandler);
        }
    };
    CheckBox.prototype.wireEvents = function () {
        var wrapper = this.getWrapper();
        EventHandler.add(wrapper, 'click', this.clickHandler, this);
        EventHandler.add(this.element, 'keyup', this.keyUpHandler, this);
        EventHandler.add(this.element, 'focus', this.focusHandler, this);
        EventHandler.add(this.element, 'focusout', this.focusOutHandler, this);
        var label = wrapper.getElementsByTagName('label')[0];
        EventHandler.add(label, 'mousedown', this.labelMouseDownHandler, this);
        EventHandler.add(label, 'mouseup', this.labelMouseUpHandler, this);
        var formElem = closest(this.element, 'form');
        if (formElem) {
            EventHandler.add(formElem, 'reset', this.formResetHandler, this);
        }
        if (this.tagName === 'EJS-CHECKBOX') {
            EventHandler.add(this.element, 'change', this.changeHandler, this);
        }
    };
    CheckBox.prototype.updateVueArrayModel = function (init) {
        if (this.isVue && typeof this.value === 'object') {
            var value = this.element.value;
            if (value && this.value) {
                if (init) {
                    for (var i = 0; i < this.value.length; i++) {
                        if (value === this.value[i]) {
                            this.changeState('check');
                            this.setProperties({ 'checked': true }, true);
                        }
                    }
                }
                else {
                    var index = this.value.indexOf(value);
                    if (this.checked) {
                        if (index < 0) {
                            this.value.push(value);
                        }
                    }
                    else {
                        if (index > -1) {
                            this.value.splice(index, 1);
                        }
                    }
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    return this.value;
                }
            }
        }
        return this.validCheck ? this.element.checked : !this.element.checked;
    };
    CheckBox.prototype.updateHtmlAttributeToWrapper = function () {
        if (!isNullOrUndefined(this.htmlAttributes)) {
            for (var _i = 0, _a = Object.keys(this.htmlAttributes); _i < _a.length; _i++) {
                var key = _a[_i];
                if (containerAttr.indexOf(key) > -1) {
                    var wrapper = this.getWrapper();
                    if (key === 'class') {
                        addClass([wrapper], this.htmlAttributes["" + key].split(' '));
                    }
                    else if (key === 'title') {
                        wrapper.setAttribute(key, this.htmlAttributes["" + key]);
                    }
                    else if (key === 'style') {
                        var frameSpan = this.getWrapper().getElementsByClassName(FRAME)[0];
                        frameSpan.setAttribute(key, this.htmlAttributes["" + key]);
                    }
                    else if (key === 'disabled') {
                        if (this.htmlAttributes["" + key] === 'true') {
                            this.setDisabled();
                        }
                        this.element.setAttribute(key, this.htmlAttributes["" + key]);
                    }
                    else {
                        this.element.setAttribute(key, this.htmlAttributes["" + key]);
                    }
                }
            }
        }
    };
    /**
     * Click the CheckBox element
     * its native method
     *
     * @public
     * @returns {void}
     */
    CheckBox.prototype.click = function () {
        this.element.click();
    };
    /**
     * Sets the focus to CheckBox
     * its native method
     *
     * @public
     * @returns {void}
     */
    CheckBox.prototype.focusIn = function () {
        this.element.focus();
    };
    __decorate$1([
        Event()
    ], CheckBox.prototype, "change", void 0);
    __decorate$1([
        Event()
    ], CheckBox.prototype, "created", void 0);
    __decorate$1([
        Property(false)
    ], CheckBox.prototype, "checked", void 0);
    __decorate$1([
        Property('')
    ], CheckBox.prototype, "cssClass", void 0);
    __decorate$1([
        Property(false)
    ], CheckBox.prototype, "disabled", void 0);
    __decorate$1([
        Property(false)
    ], CheckBox.prototype, "indeterminate", void 0);
    __decorate$1([
        Property('')
    ], CheckBox.prototype, "label", void 0);
    __decorate$1([
        Property('After')
    ], CheckBox.prototype, "labelPosition", void 0);
    __decorate$1([
        Property('')
    ], CheckBox.prototype, "name", void 0);
    __decorate$1([
        Property('')
    ], CheckBox.prototype, "value", void 0);
    __decorate$1([
        Property(false)
    ], CheckBox.prototype, "enableHtmlSanitizer", void 0);
    __decorate$1([
        Property({})
    ], CheckBox.prototype, "htmlAttributes", void 0);
    CheckBox = __decorate$1([
        NotifyPropertyChanges
    ], CheckBox);
    return CheckBox;
}(Component));

/**
 * CheckBox modules
 */

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
var LABEL$1 = 'e-label';
var RIPPLE$1 = 'e-ripple-container';
var RTL$1 = 'e-rtl';
var WRAPPER$1 = 'e-radio-wrapper';
var ATTRIBUTES = ['title', 'class', 'style', 'disabled', 'readonly', 'name', 'value'];
/**
 * The RadioButton is a graphical user interface element that allows you to select one option from the choices.
 * It contains checked and unchecked states.
 * ```html
 * <input type="radio" id="radio"/>
 * <script>
 * var radioObj = new RadioButton({ label: "Default" });
 * radioObj.appendTo("#radio");
 * </script>
 * ```
 */
var RadioButton = /** @__PURE__ @class */ (function (_super) {
    __extends$2(RadioButton, _super);
    /**
     * Constructor for creating the widget
     *
     * @private
     * @param {RadioButtonModel} options - Specifies Radio button model
     * @param {string | HTMLInputElement} element - Specifies target element
     */
    function RadioButton(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.isFocused = false;
        return _this;
    }
    RadioButton_1 = RadioButton;
    RadioButton.prototype.changeHandler = function (event) {
        this.checked = true;
        this.dataBind();
        var value = this.element.getAttribute('value');
        value = this.isVue && value ? this.element.value : this.value;
        var type = typeof this.value;
        if (this.isVue && type === 'boolean') {
            value = value === 'true' ? true : false;
        }
        this.trigger('change', { value: value, event: event });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (this.isAngular) {
            event.stopPropagation();
        }
    };
    RadioButton.prototype.updateChange = function () {
        var input;
        var instance;
        var radioGrp = this.getRadioGroup();
        for (var i = 0; i < radioGrp.length; i++) {
            input = radioGrp[i];
            if (input !== this.element) {
                instance = getInstance(input, RadioButton_1);
                instance.checked = false;
                if (this.tagName === 'EJS-RADIOBUTTON') {
                    instance.angularValue = this.value;
                }
            }
        }
    };
    /**
     * Destroys the widget.
     *
     * @returns {void}
     */
    RadioButton.prototype.destroy = function () {
        var _this = this;
        var radioWrap = this.wrapper;
        _super.prototype.destroy.call(this);
        if (radioWrap) {
            if (!this.disabled) {
                this.unWireEvents();
            }
            if (this.tagName === 'INPUT') {
                if (radioWrap.parentNode) {
                    radioWrap.parentNode.insertBefore(this.element, radioWrap);
                }
                detach(radioWrap);
                this.element.checked = false;
                ['name', 'value', 'disabled'].forEach(function (key) {
                    _this.element.removeAttribute(key);
                });
            }
            else {
                ['role', 'aria-checked', 'class'].forEach(function (key) {
                    radioWrap.removeAttribute(key);
                });
                radioWrap.innerHTML = '';
            }
        }
    };
    RadioButton.prototype.focusHandler = function () {
        this.isFocused = true;
    };
    RadioButton.prototype.focusOutHandler = function () {
        var label = this.getLabel();
        if (label) {
            label.classList.remove('e-focus');
        }
    };
    RadioButton.prototype.getModuleName = function () {
        return 'radio';
    };
    /**
     * To get the value of selected radio button in a group.
     *
     * @method getSelectedValue
     * @returns {string} - Selected Value
     */
    RadioButton.prototype.getSelectedValue = function () {
        var input;
        var radioGrp = this.getRadioGroup();
        for (var i = 0, len = radioGrp.length; i < len; i++) {
            input = radioGrp[i];
            if (input.checked) {
                return input.value;
            }
        }
        return '';
    };
    RadioButton.prototype.getRadioGroup = function () {
        return document.querySelectorAll('input.e-radio[name="' + this.element.getAttribute('name') + '"]');
    };
    /**
     * Gets the properties to be maintained in the persistence state.
     *
     * @private
     * @returns {string} - Persist Data
     */
    RadioButton.prototype.getPersistData = function () {
        return this.addOnPersist(['checked']);
    };
    RadioButton.prototype.getWrapper = function () {
        if (this.element) {
            return this.element.parentElement;
        }
        else {
            return null;
        }
    };
    RadioButton.prototype.getLabel = function () {
        if (this.element) {
            return this.element.nextElementSibling;
        }
        else {
            return null;
        }
    };
    RadioButton.prototype.initialize = function () {
        if (isNullOrUndefined(this.initialCheckedValue)) {
            this.initialCheckedValue = this.checked;
        }
        this.initWrapper();
        this.updateHtmlAttribute();
        if (this.name) {
            this.element.setAttribute('name', this.name);
        }
        var value = this.element.getAttribute('value');
        var type = typeof this.value;
        if (this.isVue && type === 'boolean') {
            value = value === 'true' ? true : false;
        }
        if (this.isVue ? this.value && type !== 'boolean' && !value : this.value) {
            this.element.setAttribute('value', this.value);
        }
        if (this.checked) {
            this.element.checked = true;
        }
        if (this.disabled) {
            this.setDisabled();
        }
    };
    RadioButton.prototype.initWrapper = function () {
        var rippleSpan;
        var wrapper = this.element.parentElement;
        if (!wrapper.classList.contains(WRAPPER$1)) {
            wrapper = this.createElement('div', { className: WRAPPER$1 });
            this.element.parentNode.insertBefore(wrapper, this.element);
        }
        var label = this.createElement('label', { attrs: { for: this.element.id } });
        wrapper.appendChild(this.element);
        wrapper.appendChild(label);
        if (isRippleEnabled) {
            rippleSpan = this.createElement('span', { className: (RIPPLE$1) });
            label.appendChild(rippleSpan);
            rippleEffect(rippleSpan, {
                duration: 400,
                isCenterRipple: true
            });
        }
        wrapper.classList.add('e-wrapper');
        if (this.enableRtl) {
            label.classList.add(RTL$1);
        }
        if (this.cssClass) {
            addClass([wrapper], this.cssClass.replace(/\s+/g, ' ').trim().split(' '));
        }
        if (this.label) {
            this.setText(this.label);
        }
    };
    RadioButton.prototype.keyUpHandler = function () {
        if (this.isFocused) {
            this.getLabel().classList.add('e-focus');
        }
    };
    RadioButton.prototype.labelMouseDownHandler = function (e) {
        var rippleSpan = this.getLabel().getElementsByClassName(RIPPLE$1)[0];
        rippleMouseHandler(e, rippleSpan);
    };
    RadioButton.prototype.labelMouseLeaveHandler = function (e) {
        var rippleSpan = this.getLabel().getElementsByClassName(RIPPLE$1)[0];
        if (rippleSpan) {
            var rippleElem = rippleSpan.querySelectorAll('.e-ripple-element');
            for (var i = rippleElem.length - 1; i > 0; i--) {
                rippleSpan.removeChild(rippleSpan.childNodes[i]);
            }
            rippleMouseHandler(e, rippleSpan);
        }
    };
    RadioButton.prototype.labelMouseUpHandler = function (e) {
        var rippleSpan = this.getLabel().getElementsByClassName(RIPPLE$1)[0];
        if (rippleSpan) {
            var rippleElem = rippleSpan.querySelectorAll('.e-ripple-element');
            for (var i = rippleElem.length - 1; i > 0; i--) {
                rippleSpan.removeChild(rippleSpan.childNodes[i]);
            }
            rippleMouseHandler(e, rippleSpan);
        }
    };
    RadioButton.prototype.formResetHandler = function () {
        this.checked = this.initialCheckedValue;
        if (this.initialCheckedValue) {
            attributes(this.element, { 'checked': 'true' });
        }
    };
    /**
     * Called internally if any of the property value changes.
     *
     * @private
     * @param {RadioButtonModel} newProp - Specifies New Properties
     * @param {RadioButtonModel} oldProp - Specifies Old Properties
     * @returns {void}
     */
    RadioButton.prototype.onPropertyChanged = function (newProp, oldProp) {
        var wrap = this.getWrapper();
        var label = this.getLabel();
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'checked':
                    if (newProp.checked) {
                        this.updateChange();
                    }
                    this.element.checked = newProp.checked;
                    break;
                case 'disabled':
                    if (newProp.disabled) {
                        this.setDisabled();
                        this.unWireEvents();
                    }
                    else {
                        this.element.disabled = false;
                        this.wireEvents();
                    }
                    break;
                case 'cssClass':
                    if (oldProp.cssClass) {
                        removeClass([wrap], oldProp.cssClass.split(' '));
                    }
                    if (newProp.cssClass) {
                        addClass([wrap], newProp.cssClass.replace(/\s+/g, ' ').trim().split(' '));
                    }
                    break;
                case 'enableRtl':
                    if (newProp.enableRtl) {
                        label.classList.add(RTL$1);
                    }
                    else {
                        label.classList.remove(RTL$1);
                    }
                    break;
                case 'label':
                    this.setText(newProp.label);
                    break;
                case 'labelPosition':
                    if (newProp.labelPosition === 'Before') {
                        label.classList.add('e-right');
                    }
                    else {
                        label.classList.remove('e-right');
                    }
                    break;
                case 'name':
                    this.element.setAttribute('name', newProp.name);
                    break;
                case 'value':
                    var type = typeof this.htmlAttributes.value;
                    if (!isNullOrUndefined(this.htmlAttributes) && (this.htmlAttributes.value || type === 'boolean' && !this.htmlAttributes.value)) {
                        break;
                    }
                    this.element.setAttribute('value', newProp.value);
                    break;
                case 'htmlAttributes':
                    this.updateHtmlAttribute();
                    break;
            }
        }
    };
    /**
     * Initialize checked Property, Angular and React and Unique ID support.
     *
     * @private
     * @returns {void}
     */
    RadioButton.prototype.preRender = function () {
        var element = this.element;
        this.formElement = closest(this.element, 'form');
        this.tagName = this.element.tagName;
        element = wrapperInitialize(this.createElement, 'EJS-RADIOBUTTON', 'radio', element, WRAPPER$1, 'radio');
        this.element = element;
        if (this.element.getAttribute('type') !== 'radio') {
            this.element.setAttribute('type', 'radio');
        }
        if (!this.element.id) {
            this.element.id = getUniqueID('e-' + this.getModuleName());
        }
        if (this.tagName === 'EJS-RADIOBUTTON') {
            var formControlName = this.element.getAttribute('formcontrolname');
            if (formControlName) {
                this.setProperties({ 'name': formControlName }, true);
                this.element.setAttribute('name', formControlName);
            }
        }
    };
    /**
     * Initialize the control rendering
     *
     * @private
     * @returns {void}
     */
    RadioButton.prototype.render = function () {
        this.initialize();
        if (!this.disabled) {
            this.wireEvents();
        }
        this.renderComplete();
        this.wrapper = this.getWrapper();
    };
    RadioButton.prototype.setDisabled = function () {
        this.element.disabled = true;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    RadioButton.prototype.setText = function (text) {
        var label = this.getLabel();
        var textLabel = label.getElementsByClassName(LABEL$1)[0];
        if (textLabel) {
            textLabel.textContent = text;
        }
        else {
            text = (this.enableHtmlSanitizer) ? SanitizeHtmlHelper.sanitize(text) : text;
            textLabel = this.createElement('span', { className: LABEL$1, innerHTML: text });
            label.appendChild(textLabel);
        }
        if (this.labelPosition === 'Before') {
            this.getLabel().classList.add('e-right');
        }
        else {
            this.getLabel().classList.remove('e-right');
        }
    };
    RadioButton.prototype.updateHtmlAttribute = function () {
        if (!isNullOrUndefined(this.htmlAttributes)) {
            for (var _i = 0, _a = Object.keys(this.htmlAttributes); _i < _a.length; _i++) {
                var key = _a[_i];
                if (ATTRIBUTES.indexOf(key) > -1) {
                    var wrapper = this.element.parentElement;
                    if (key === 'class') {
                        addClass([wrapper], this.htmlAttributes["" + key].replace(/\s+/g, ' ').trim().split(' '));
                    }
                    else if (key === 'title' || key === 'style') {
                        wrapper.setAttribute(key, this.htmlAttributes["" + key]);
                    }
                    else {
                        this.element.setAttribute(key, this.htmlAttributes["" + key]);
                    }
                }
            }
        }
    };
    RadioButton.prototype.unWireEvents = function () {
        var label = this.wrapper;
        EventHandler.remove(this.element, 'change', this.changeHandler);
        EventHandler.remove(this.element, 'focus', this.focusHandler);
        EventHandler.remove(this.element, 'focusout', this.focusOutHandler);
        EventHandler.remove(this.element, 'keyup', this.keyUpHandler);
        var rippleLabel = label.getElementsByTagName('label')[0];
        if (rippleLabel) {
            EventHandler.remove(rippleLabel, 'mousedown', this.labelMouseDownHandler);
            EventHandler.remove(rippleLabel, 'mouseup', this.labelMouseUpHandler);
            EventHandler.remove(rippleLabel, 'mouseleave', this.labelMouseLeaveHandler);
        }
        if (this.formElement) {
            EventHandler.remove(this.formElement, 'reset', this.formResetHandler);
        }
    };
    RadioButton.prototype.wireEvents = function () {
        var label = this.getLabel();
        EventHandler.add(this.element, 'change', this.changeHandler, this);
        EventHandler.add(this.element, 'keyup', this.keyUpHandler, this);
        EventHandler.add(this.element, 'focus', this.focusHandler, this);
        EventHandler.add(this.element, 'focusout', this.focusOutHandler, this);
        var rippleLabel = label.getElementsByClassName(LABEL$1)[0];
        if (rippleLabel) {
            EventHandler.add(rippleLabel, 'mousedown', this.labelMouseDownHandler, this);
            EventHandler.add(rippleLabel, 'mouseup', this.labelMouseUpHandler, this);
            EventHandler.add(rippleLabel, 'mouseleave', this.labelMouseLeaveHandler, this);
        }
        if (this.formElement) {
            EventHandler.add(this.formElement, 'reset', this.formResetHandler, this);
        }
    };
    /**
     * Click the RadioButton element
     * its native method
     *
     * @public
     * @returns {void}
     */
    RadioButton.prototype.click = function () {
        this.element.click();
    };
    /**
     * Sets the focus to RadioButton
     * its native method
     *
     * @public
     * @returns {void}
     */
    RadioButton.prototype.focusIn = function () {
        this.element.focus();
    };
    var RadioButton_1;
    __decorate$2([
        Event()
    ], RadioButton.prototype, "change", void 0);
    __decorate$2([
        Event()
    ], RadioButton.prototype, "created", void 0);
    __decorate$2([
        Property(false)
    ], RadioButton.prototype, "checked", void 0);
    __decorate$2([
        Property('')
    ], RadioButton.prototype, "cssClass", void 0);
    __decorate$2([
        Property(false)
    ], RadioButton.prototype, "disabled", void 0);
    __decorate$2([
        Property('')
    ], RadioButton.prototype, "label", void 0);
    __decorate$2([
        Property('After')
    ], RadioButton.prototype, "labelPosition", void 0);
    __decorate$2([
        Property('')
    ], RadioButton.prototype, "name", void 0);
    __decorate$2([
        Property('')
    ], RadioButton.prototype, "value", void 0);
    __decorate$2([
        Property(false)
    ], RadioButton.prototype, "enableHtmlSanitizer", void 0);
    __decorate$2([
        Property({})
    ], RadioButton.prototype, "htmlAttributes", void 0);
    RadioButton = RadioButton_1 = __decorate$2([
        NotifyPropertyChanges
    ], RadioButton);
    return RadioButton;
}(Component));

/**
 * RadioButton modules
 */

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
var DISABLED$1 = 'e-switch-disabled';
var RIPPLE$2 = 'e-ripple-container';
var RIPPLE_CHECK = 'e-ripple-check';
var RTL$2 = 'e-rtl';
var WRAPPER$2 = 'e-switch-wrapper';
var ACTIVE = 'e-switch-active';
var ATTRIBUTES$1 = ['title', 'class', 'style', 'disabled', 'readonly', 'name', 'value', 'aria-label', 'id', 'role'];
/**
 * The Switch is a graphical user interface element that allows you to toggle between checked and unchecked states.
 * ```html
 * <input type="checkbox" id="switch"/>
 * <script>
 * var switchObj = new Switch({});
 * switchObj.appendTo("#switch");
 * </script>
 * ```
 */
var Switch = /** @__PURE__ @class */ (function (_super) {
    __extends$3(Switch, _super);
    /**
     * Constructor for creating the widget.
     *
     * @private
     *
     * @param {SwitchModel} options switch model
     * @param {string | HTMLInputElement} element target element
     *
     */
    function Switch(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.isFocused = false;
        _this.isDrag = false;
        _this.isWireEvents = false;
        return _this;
    }
    Switch.prototype.changeState = function (state) {
        var rippleSpan;
        var wrapper = this.getWrapper();
        var bar = wrapper.querySelector('.e-switch-inner');
        var handle = wrapper.querySelector('.e-switch-handle');
        if (isRippleEnabled) {
            rippleSpan = wrapper.getElementsByClassName(RIPPLE$2)[0];
        }
        if (state) {
            addClass([bar, handle], ACTIVE);
            this.element.checked = true;
            this.checked = true;
            if (rippleSpan) {
                addClass([rippleSpan], [RIPPLE_CHECK]);
            }
        }
        else {
            removeClass([bar, handle], ACTIVE);
            this.element.checked = false;
            this.checked = false;
            if (rippleSpan) {
                removeClass([rippleSpan], [RIPPLE_CHECK]);
            }
        }
    };
    Switch.prototype.clickHandler = function (evt) {
        this.isDrag = false;
        this.focusOutHandler();
        this.changeState(!this.checked);
        this.element.focus();
        var changeEventArgs = { checked: this.element.checked, event: evt };
        this.trigger('change', changeEventArgs);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (this.isAngular) {
            evt.stopPropagation();
            evt.preventDefault();
        }
    };
    /**
     * Destroys the Switch widget.
     *
     * @returns {void}
     */
    Switch.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        if (!this.disabled) {
            this.unWireEvents();
        }
        destroy(this, this.getWrapper(), this.tagName);
    };
    Switch.prototype.focusHandler = function () {
        this.isFocused = true;
    };
    Switch.prototype.focusOutHandler = function () {
        this.getWrapper().classList.remove('e-focus');
    };
    /**
     * Gets the module name.
     *
     * @private
     * @returns {string} - Module Name
     */
    Switch.prototype.getModuleName = function () {
        return 'switch';
    };
    /**
     * Gets the properties to be maintained in the persistence state.
     *
     * @private
     * @returns {string} - Persist data
     */
    Switch.prototype.getPersistData = function () {
        return this.addOnPersist(['checked']);
    };
    Switch.prototype.getWrapper = function () {
        return this.element.parentElement;
    };
    Switch.prototype.initialize = function () {
        if (isNullOrUndefined(this.initialSwitchCheckedValue)) {
            this.initialSwitchCheckedValue = this.checked;
        }
        if (this.name) {
            this.element.setAttribute('name', this.name);
        }
        if (this.value) {
            this.element.setAttribute('value', this.value);
        }
        if (this.checked) {
            this.changeState(true);
        }
        if (this.disabled) {
            this.setDisabled();
        }
        if (this.onLabel || this.offLabel) {
            this.setLabel(this.onLabel, this.offLabel);
        }
    };
    Switch.prototype.initWrapper = function () {
        var wrapper = this.element.parentElement;
        if (!wrapper.classList.contains(WRAPPER$2)) {
            wrapper = this.createElement('div', {
                className: WRAPPER$2
            });
            this.element.parentNode.insertBefore(wrapper, this.element);
        }
        var switchInner = this.createElement('span', { className: 'e-switch-inner' });
        var onLabel = this.createElement('span', { className: 'e-switch-on' });
        var offLabel = this.createElement('span', { className: 'e-switch-off' });
        var handle = this.createElement('span', { className: 'e-switch-handle' });
        wrapper.appendChild(this.element);
        setHiddenInput(this, wrapper);
        switchInner.appendChild(onLabel);
        switchInner.appendChild(offLabel);
        wrapper.appendChild(switchInner);
        wrapper.appendChild(handle);
        if (isRippleEnabled) {
            var rippleSpan = this.createElement('span', { className: RIPPLE$2 });
            handle.appendChild(rippleSpan);
            rippleEffect(rippleSpan, { duration: 400, isCenterRipple: true });
        }
        wrapper.classList.add('e-wrapper');
        if (this.enableRtl) {
            wrapper.classList.add(RTL$2);
        }
        if (this.cssClass) {
            addClass([wrapper], this.cssClass.replace(/\s+/g, ' ').trim().split(' '));
        }
    };
    /**
     * Called internally if any of the property value changes.
     *
     * @private
     * @param {SwitchModel} newProp - Specifies New Properties
     * @param {SwitchModel} oldProp - Specifies Old Properties
     * @returns {void}
     */
    Switch.prototype.onPropertyChanged = function (newProp, oldProp) {
        var wrapper = this.getWrapper();
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'checked':
                    this.changeState(newProp.checked);
                    break;
                case 'disabled':
                    if (newProp.disabled) {
                        this.setDisabled();
                        this.unWireEvents();
                        this.isWireEvents = false;
                    }
                    else {
                        this.element.disabled = false;
                        wrapper.classList.remove(DISABLED$1);
                        wrapper.setAttribute('aria-disabled', 'false');
                        if (!this.isWireEvents) {
                            this.wireEvents();
                            this.isWireEvents = true;
                        }
                    }
                    break;
                case 'value':
                    this.element.setAttribute('value', newProp.value);
                    break;
                case 'name':
                    this.element.setAttribute('name', newProp.name);
                    break;
                case 'onLabel':
                case 'offLabel':
                    this.setLabel(newProp.onLabel, newProp.offLabel);
                    break;
                case 'enableRtl':
                    if (newProp.enableRtl) {
                        wrapper.classList.add(RTL$2);
                    }
                    else {
                        wrapper.classList.remove(RTL$2);
                    }
                    break;
                case 'cssClass':
                    if (oldProp.cssClass) {
                        removeClass([wrapper], oldProp.cssClass.split(' '));
                    }
                    if (newProp.cssClass) {
                        addClass([wrapper], newProp.cssClass.replace(/\s+/g, ' ').trim().split(' '));
                    }
                    break;
                case 'htmlAttributes':
                    this.updateHtmlAttribute();
                    break;
            }
        }
    };
    /**
     * Initialize Angular, React and Unique ID support.
     *
     * @private
     * @returns {void}
     */
    Switch.prototype.preRender = function () {
        var element = this.element;
        this.formElement = closest(this.element, 'form');
        this.tagName = this.element.tagName;
        preRender(this, 'EJS-SWITCH', WRAPPER$2, element, this.getModuleName());
    };
    /**
     * Initialize control rendering.
     *
     * @private
     * @returns {void}
     */
    Switch.prototype.render = function () {
        this.initWrapper();
        this.initialize();
        if (!this.disabled) {
            this.wireEvents();
        }
        this.renderComplete();
        this.updateHtmlAttribute();
    };
    Switch.prototype.rippleHandler = function (e) {
        var rippleSpan = this.getWrapper().getElementsByClassName(RIPPLE$2)[0];
        rippleMouseHandler(e, rippleSpan);
        if (e.type === 'mousedown' && e.currentTarget.classList.contains('e-switch-wrapper') && e.which === 1) {
            this.isDrag = true;
            this.isFocused = false;
        }
    };
    Switch.prototype.rippleTouchHandler = function (eventType) {
        var rippleSpan = this.getWrapper().getElementsByClassName(RIPPLE$2)[0];
        if (rippleSpan) {
            var event_1 = document.createEvent('MouseEvents');
            event_1.initEvent(eventType, false, true);
            rippleSpan.dispatchEvent(event_1);
        }
    };
    Switch.prototype.setDisabled = function () {
        var wrapper = this.getWrapper();
        this.element.disabled = true;
        wrapper.classList.add(DISABLED$1);
        wrapper.setAttribute('aria-disabled', 'true');
    };
    Switch.prototype.setLabel = function (onText, offText) {
        var wrapper = this.getWrapper();
        if (onText) {
            wrapper.querySelector('.e-switch-on').textContent = onText;
        }
        if (offText) {
            wrapper.querySelector('.e-switch-off').textContent = offText;
        }
    };
    Switch.prototype.updateHtmlAttribute = function () {
        if (!isNullOrUndefined(this.htmlAttributes)) {
            for (var _i = 0, _a = Object.keys(this.htmlAttributes); _i < _a.length; _i++) {
                var key = _a[_i];
                if (ATTRIBUTES$1.indexOf(key) > -1) {
                    var wrapper = this.getWrapper();
                    if (key === 'class') {
                        addClass([wrapper], this.htmlAttributes["" + key].split(' '));
                    }
                    else if (key === 'title') {
                        wrapper.setAttribute(key, this.htmlAttributes["" + key]);
                    }
                    else if (key === 'style') {
                        wrapper.setAttribute(key, this.htmlAttributes["" + key]);
                    }
                    else if (key === 'disabled') {
                        if (this.htmlAttributes["" + key] === 'true') {
                            this.setDisabled();
                        }
                        this.element.setAttribute(key, this.htmlAttributes["" + key]);
                    }
                    else {
                        this.element.setAttribute(key, this.htmlAttributes["" + key]);
                    }
                }
            }
        }
    };
    Switch.prototype.switchFocusHandler = function () {
        if (this.isFocused) {
            this.getWrapper().classList.add('e-focus');
        }
    };
    Switch.prototype.switchMouseUp = function (e) {
        var target = e.target;
        if (e.type === 'touchmove') {
            e.preventDefault();
        }
        if (e.type === 'touchstart') {
            this.isDrag = true;
            this.rippleTouchHandler('mousedown');
        }
        if (this.isDrag) {
            if ((e.type === 'mouseup' && target.className.indexOf('e-switch') < 0) || e.type === 'touchend') {
                this.clickHandler(e);
                this.rippleTouchHandler('mouseup');
                e.preventDefault();
            }
        }
    };
    Switch.prototype.formResetHandler = function () {
        this.checked = this.initialSwitchCheckedValue;
        this.element.checked = this.initialSwitchCheckedValue;
    };
    /**
     * Toggle the Switch component state into checked/unchecked.
     *
     * @returns {void}
     */
    Switch.prototype.toggle = function () {
        this.clickHandler();
    };
    Switch.prototype.wireEvents = function () {
        var wrapper = this.getWrapper();
        this.delegateMouseUpHandler = this.switchMouseUp.bind(this);
        this.delegateKeyUpHandler = this.switchFocusHandler.bind(this);
        EventHandler.add(wrapper, 'click', this.clickHandler, this);
        EventHandler.add(this.element, 'focus', this.focusHandler, this);
        EventHandler.add(this.element, 'focusout', this.focusOutHandler, this);
        EventHandler.add(this.element, 'mouseup', this.delegateMouseUpHandler, this);
        EventHandler.add(this.element, 'keyup', this.delegateKeyUpHandler, this);
        EventHandler.add(wrapper, 'mousedown mouseup', this.rippleHandler, this);
        EventHandler.add(wrapper, 'touchstart touchmove touchend', this.switchMouseUp, this);
        if (this.formElement) {
            EventHandler.add(this.formElement, 'reset', this.formResetHandler, this);
        }
    };
    Switch.prototype.unWireEvents = function () {
        var wrapper = this.getWrapper();
        EventHandler.remove(wrapper, 'click', this.clickHandler);
        EventHandler.remove(this.element, 'focus', this.focusHandler);
        EventHandler.remove(this.element, 'focusout', this.focusOutHandler);
        EventHandler.remove(this.element, 'mouseup', this.delegateMouseUpHandler);
        EventHandler.remove(this.element, 'keyup', this.delegateKeyUpHandler);
        EventHandler.remove(wrapper, 'mousedown mouseup', this.rippleHandler);
        EventHandler.remove(wrapper, 'touchstart touchmove touchend', this.switchMouseUp);
        if (this.formElement) {
            EventHandler.remove(this.formElement, 'reset', this.formResetHandler);
        }
    };
    /**
     * Click the switch element
     * its native method
     *
     * @public
     * @returns {void}
     */
    Switch.prototype.click = function () {
        this.element.click();
    };
    /**
     * Sets the focus to Switch
     * its native method
     *
     * @public
     */
    Switch.prototype.focusIn = function () {
        this.element.focus();
    };
    __decorate$3([
        Event()
    ], Switch.prototype, "change", void 0);
    __decorate$3([
        Event()
    ], Switch.prototype, "created", void 0);
    __decorate$3([
        Property(false)
    ], Switch.prototype, "checked", void 0);
    __decorate$3([
        Property('')
    ], Switch.prototype, "cssClass", void 0);
    __decorate$3([
        Property(false)
    ], Switch.prototype, "disabled", void 0);
    __decorate$3([
        Property('')
    ], Switch.prototype, "name", void 0);
    __decorate$3([
        Property('')
    ], Switch.prototype, "onLabel", void 0);
    __decorate$3([
        Property('')
    ], Switch.prototype, "offLabel", void 0);
    __decorate$3([
        Property('')
    ], Switch.prototype, "value", void 0);
    __decorate$3([
        Property({})
    ], Switch.prototype, "htmlAttributes", void 0);
    Switch = __decorate$3([
        NotifyPropertyChanges
    ], Switch);
    return Switch;
}(Component));

/**
 * Switch modules
 */

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
var classNames = {
    chipSet: 'e-chip-set',
    chip: 'e-chip',
    avatar: 'e-chip-avatar',
    text: 'e-chip-text',
    icon: 'e-chip-icon',
    delete: 'e-chip-delete',
    deleteIcon: 'e-dlt-btn',
    multiSelection: 'e-multi-selection',
    singleSelection: 'e-selection',
    active: 'e-active',
    chipWrapper: 'e-chip-avatar-wrap',
    iconWrapper: 'e-chip-icon-wrap',
    focused: 'e-focused',
    disabled: 'e-disabled',
    rtl: 'e-rtl'
};
/**
 * A chip component is a small block of essential information, mostly used on contacts or filter tags.
 * ```html
 * <div id="chip"></div>
 * ```
 * ```typescript
 * <script>
 * var chipObj = new ChipList();
 * chipObj.appendTo("#chip");
 * </script>
 * ```
 */
var ChipList = /** @__PURE__ @class */ (function (_super) {
    __extends$4(ChipList, _super);
    function ChipList(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.multiSelectedChip = [];
        return _this;
    }
    /**
     * Initialize the event handler
     *
     * @private
     */
    ChipList.prototype.preRender = function () {
        //prerender
    };
    /**
     * To find the chips length.
     *
     * @returns boolean
     * @private
     */
    ChipList.prototype.chipType = function () {
        return (this.chips && this.chips.length && this.chips.length > 0);
    };
    /**
     * To Initialize the control rendering.
     *
     * @returns void
     * @private
     */
    ChipList.prototype.render = function () {
        var property;
        this.type = this.chips.length ? 'chipset' : (this.text || this.element.innerText ? 'chip' : 'chipset');
        this.setAttributes();
        this.createChip();
        this.setRtl();
        this.select(this.selectedChips, property);
        this.wireEvent(false);
        this.rippleFunction = rippleEffect(this.element, {
            selector: '.e-chip'
        });
        this.renderComplete();
    };
    ChipList.prototype.createChip = function () {
        this.innerText = (this.element.innerText && this.element.innerText.length !== 0)
            ? this.element.innerText.trim() : this.element.innerText;
        this.element.innerHTML = '';
        this.chipCreation(this.type === 'chip' ? [this.innerText ? this.innerText : this.text] : this.chips);
    };
    ChipList.prototype.setAttributes = function () {
        if (this.type === 'chip') {
            if (this.enabled)
                this.element.tabIndex = 0;
            this.element.setAttribute('role', 'option');
        }
        else {
            this.element.classList.add(classNames.chipSet);
            this.element.setAttribute('role', 'listbox');
            if (this.selection === 'Multiple') {
                this.element.classList.add(classNames.multiSelection);
                this.element.setAttribute('aria-multiselectable', 'true');
            }
            else if (this.selection === 'Single') {
                this.element.classList.add(classNames.singleSelection);
                this.element.setAttribute('aria-multiselectable', 'false');
            }
            else {
                this.element.setAttribute('aria-multiselectable', 'false');
            }
        }
    };
    ChipList.prototype.setRtl = function () {
        this.element.classList[this.enableRtl ? 'add' : 'remove'](classNames.rtl);
    };
    ChipList.prototype.chipCreation = function (data) {
        var chipListArray = [];
        var attributeArray = [];
        for (var i = 0; i < data.length; i++) {
            var fieldsData = this.getFieldValues(data[i]);
            var attributesValue = fieldsData.htmlAttributes;
            attributeArray.push(attributesValue);
            var chipArray = this.elementCreation(fieldsData);
            var className = (classNames.chip + ' ' + (fieldsData.enabled ? ' ' : classNames.disabled) + ' ' +
                (fieldsData.avatarIconCss || fieldsData.avatarText ? classNames.chipWrapper : (fieldsData.leadingIconCss ?
                    classNames.iconWrapper : ' ')) + ' ' + fieldsData.cssClass).split(' ').filter(function (css) { return css; });
            if (!this.chipType()) {
                chipListArray = chipArray;
                addClass([this.element], className);
                this.element.setAttribute('aria-label', fieldsData.text);
                if (fieldsData.value) {
                    this.element.setAttribute('data-value', fieldsData.value.toString());
                }
            }
            else {
                var wrapper = this.createElement('DIV', {
                    className: className.join(' '), attrs: {
                        tabIndex: '0', role: 'option',
                        'aria-label': fieldsData.text, 'aria-selected': 'false'
                    }
                });
                if (fieldsData.value) {
                    wrapper.setAttribute('data-value', fieldsData.value.toString());
                }
                if (fieldsData.enabled) {
                    wrapper.setAttribute('aria-disabled', 'false');
                }
                else {
                    wrapper.removeAttribute('tabindex');
                    wrapper.setAttribute('aria-disabled', 'true');
                }
                if (!isNullOrUndefined(attributeArray[i])) {
                    if (attributeArray.length > i && Object.keys(attributeArray[i]).length) {
                        var htmlAttr = [];
                        htmlAttr = (Object.keys(attributeArray[i]));
                        for (var j = 0; j < htmlAttr.length; j++) {
                            wrapper.setAttribute(htmlAttr[j], attributeArray[i][htmlAttr[j]]);
                        }
                    }
                }
                append(chipArray, wrapper);
                chipListArray.push(wrapper);
            }
        }
        append(chipListArray, this.element);
    };
    ChipList.prototype.getFieldValues = function (data) {
        var chipEnabled = !(this.enabled.toString() === 'false');
        var fields = {
            text: typeof data === 'object' ? (data.text ? data.text.toString() : this.text.toString()) :
                (!this.chipType() ? (this.innerText ? this.innerText : this.text.toString()) : data.toString()),
            cssClass: typeof data === 'object' ? (data.cssClass ? data.cssClass.toString() : this.cssClass.toString()) :
                (this.cssClass.toString()),
            leadingIconCss: typeof data === 'object' ? (data.leadingIconCss ? data.leadingIconCss.toString() :
                this.leadingIconCss.toString()) : (this.leadingIconCss.toString()),
            avatarIconCss: typeof data === 'object' ? (data.avatarIconCss ? data.avatarIconCss.toString() :
                this.avatarIconCss.toString()) : (this.avatarIconCss.toString()),
            avatarText: typeof data === 'object' ? (data.avatarText ? data.avatarText.toString() : this.avatarText.toString()) :
                (this.avatarText.toString()),
            trailingIconCss: typeof data === 'object' ? (data.trailingIconCss ? data.trailingIconCss.toString() :
                this.trailingIconCss.toString()) : (this.trailingIconCss.toString()),
            enabled: typeof data === 'object' ? (!isNullOrUndefined(data.enabled) ? (data.enabled.toString() === 'false' ? false : true) :
                chipEnabled) : (chipEnabled),
            value: typeof data === 'object' ? ((data.value ? data.value.toString() : null)) : null,
            leadingIconUrl: typeof data === 'object' ? (data.leadingIconUrl ? data.leadingIconUrl.toString() : this.leadingIconUrl) :
                this.leadingIconUrl,
            trailingIconUrl: typeof data === 'object' ? (data.trailingIconUrl ? data.trailingIconUrl.toString() : this.trailingIconUrl) :
                this.trailingIconUrl,
            htmlAttributes: typeof data === 'object' ? (data.htmlAttributes ? data.htmlAttributes : this.htmlAttributes) : this.htmlAttributes
        };
        return fields;
    };
    ChipList.prototype.elementCreation = function (fields) {
        var chipArray = [];
        if (fields.avatarText || fields.avatarIconCss) {
            var className = (classNames.avatar + ' ' + fields.avatarIconCss).trim();
            var chipAvatarElement = this.createElement('span', { className: className });
            chipAvatarElement.innerText = fields.avatarText;
            chipArray.push(chipAvatarElement);
        }
        else if (fields.leadingIconCss) {
            var className = (classNames.icon + ' ' + fields.leadingIconCss).trim();
            var chipIconElement = this.createElement('span', { className: className });
            chipArray.push(chipIconElement);
        }
        else if (fields.leadingIconUrl) {
            var className = (classNames.avatar + ' ' + 'image-url').trim();
            var chipIconElement = this.createElement('span', { className: className });
            chipIconElement.style.backgroundImage = 'url(' + fields.leadingIconUrl + ')';
            chipArray.push(chipIconElement);
        }
        var chipTextElement = this.createElement('span', { className: classNames.text });
        chipTextElement.innerText = fields.text;
        chipArray.push(chipTextElement);
        if (fields.trailingIconCss || (this.chipType() && this.enableDelete)) {
            var className = (classNames.delete + ' ' +
                (fields.trailingIconCss ? fields.trailingIconCss : classNames.deleteIcon)).trim();
            var chipdeleteElement = this.createElement('span', { className: className });
            chipArray.push(chipdeleteElement);
        }
        else if (fields.trailingIconUrl) {
            var className = ('trailing-icon-url').trim();
            var chipIconsElement = this.createElement('span', { className: className });
            chipIconsElement.style.backgroundImage = 'url(' + fields.trailingIconUrl + ')';
            chipArray.push(chipIconsElement);
        }
        return chipArray;
    };
    /**
     * A function that finds chip based on given input.
     *
     * @param  {number | HTMLElement } fields - We can pass index number or element of chip.
     * {% codeBlock src='chips/find/index.md' %}{% endcodeBlock %}
     *
     *  @returns {void}
     */
    ChipList.prototype.find = function (fields) {
        var chipData;
        var chipElement = fields instanceof HTMLElement ?
            fields : this.element.querySelectorAll('.' + classNames.chip)[fields];
        if (chipElement && this.chipType()) {
            chipData = { text: undefined, index: undefined, element: undefined, data: undefined };
            chipData.index = Array.prototype.slice.call(this.element.querySelectorAll('.' + classNames.chip)).indexOf(chipElement);
            chipData.text = typeof this.chips[chipData.index] === 'object' ?
                (this.chips[chipData.index].text ?
                    this.chips[chipData.index].text.toString() : '') :
                this.chips[chipData.index].toString();
            chipData.data = this.chips[chipData.index];
            chipData.element = chipElement;
        }
        return chipData;
    };
    /**
     * Allows adding the chip item(s) by passing a single or array of string, number, or ChipModel values.
     *
     * @param  {string[] | number[] | ChipModel[] | string | number | ChipModel} chipsData - We can pass array of string or
     *  array of number or array of chip model or string data or number data or chip model.
     * {% codeBlock src='chips/add/index.md' %}{% endcodeBlock %}
     *
     * @returns {void}
     * @deprecated
     */
    ChipList.prototype.add = function (chipsData) {
        var _a;
        if (this.type !== 'chip') {
            var fieldData = chipsData instanceof Array ?
                chipsData : [chipsData];
            (_a = this.chips).push.apply(_a, fieldData);
            this.chipCreation(fieldData);
        }
    };
    /**
     * Allows selecting the chip item(s) by passing a single or array of string, number, or ChipModel values.
     *
     * @param  {number | number[] | HTMLElement | HTMLElement[]} fields - We can pass number or array of number
     *  or chip element or array of chip element.
     * {% codeBlock src='chips/select/index.md' %}{% endcodeBlock %}
     *
     *  @returns {void}
     */
    ChipList.prototype.select = function (fields, selectionType) {
        this.onSelect(fields, false, selectionType);
    };
    ChipList.prototype.multiSelection = function (newProp) {
        var items = this.element.querySelectorAll('.' + 'e-chip');
        for (var j = 0; j < newProp.length; j++) {
            if (typeof newProp[j] === 'string') {
                for (var k = 0; k < items.length; k++) {
                    if (newProp[j] !== k) {
                        if (newProp[j] === items[k].attributes[5].value) {
                            this.multiSelectedChip.push(k);
                            break;
                        }
                    }
                }
            }
            else {
                this.multiSelectedChip.push(newProp[j]);
            }
        }
    };
    ChipList.prototype.onSelect = function (fields, callFromProperty, selectionType) {
        var index;
        var chipNodes;
        var chipValue;
        if (this.chipType() && this.selection !== 'None') {
            if (callFromProperty) {
                var chipElements = this.element.querySelectorAll('.' + classNames.chip);
                for (var i = 0; i < chipElements.length; i++) {
                    chipElements[i].setAttribute('aria-selected', 'false');
                    chipElements[i].classList.remove(classNames.active);
                }
            }
            var fieldData = fields instanceof Array ? fields : [fields];
            for (var i = 0; i < fieldData.length; i++) {
                var chipElement = fieldData[i] instanceof HTMLElement ? fieldData[i]
                    : this.element.querySelectorAll('.' + classNames.chip)[fieldData[i]];
                if (selectionType !== 'index') {
                    for (var j = 0; j < this.chips.length; j++) {
                        chipNodes = this.element.querySelectorAll('.' + classNames.chip)[j];
                        var fieldsData = this.getFieldValues(this.chips[j]);
                        if (selectionType === 'value') {
                            if (fieldsData.value !== null) {
                                chipValue = chipNodes.dataset.value;
                            }
                        }
                        else if (selectionType === 'text') {
                            chipValue = chipNodes.innerText;
                        }
                        if (chipValue === fieldData[i].toString()) {
                            index = j;
                            chipElement = this.element.querySelectorAll('.' + classNames.chip)[index];
                        }
                    }
                }
                if (chipElement instanceof HTMLElement) {
                    this.selectionHandler(chipElement);
                }
            }
        }
    };
    /**
     * Allows removing the chip item(s) by passing a single or array of string, number, or ChipModel values.
     *
     * @param  {number | number[] | HTMLElement | HTMLElement[]} fields - We can pass number or array of number
     *  or chip element or array of chip element.
     * {% codeBlock src='chips/remove/index.md' %}{% endcodeBlock %}
     *
     *  @returns {void}
     */
    ChipList.prototype.remove = function (fields) {
        var _this = this;
        if (this.chipType()) {
            var fieldData = fields instanceof Array ? fields : [fields];
            var chipElements_1 = [];
            var chipCollection_1 = this.element.querySelectorAll('.' + classNames.chip);
            fieldData.forEach(function (data) {
                var chipElement = data instanceof HTMLElement ? data
                    : chipCollection_1[data];
                if (chipElement instanceof HTMLElement) {
                    chipElements_1.push(chipElement);
                }
            });
            chipElements_1.forEach(function (element) {
                var chips = _this.element.querySelectorAll('.' + classNames.chip);
                var index = Array.prototype.slice.call(chips).indexOf(element);
                _this.deleteHandler(element, index);
            });
        }
    };
    /**
     * Returns the selected chip(s) data.
     * {% codeBlock src='chips/getSelectedChips/index.md' %}{% endcodeBlock %}
     *
     *  @returns {void}
     */
    ChipList.prototype.getSelectedChips = function () {
        var selectedChips;
        if (this.chipType() && this.selection !== 'None') {
            var selectedItems = { texts: [], Indexes: [], data: [], elements: [] };
            var items = this.element.querySelectorAll('.' + classNames.active);
            for (var i = 0; i < items.length; i++) {
                var chip = items[i];
                selectedItems.elements.push(chip);
                var index = Array.prototype.slice.call(this.element.querySelectorAll('.' + classNames.chip)).indexOf(chip);
                selectedItems.Indexes.push(index);
                selectedItems.data.push(this.chips[index]);
                var text = typeof this.chips[index] === 'object' ?
                    this.chips[index].text ? this.chips[index].text.toString()
                        : null : this.chips[index].toString();
                selectedItems.texts.push(text);
            }
            var selectedItem = {
                text: selectedItems.texts[0], index: selectedItems.Indexes[0],
                data: selectedItems.data[0], element: selectedItems.elements[0]
            };
            selectedChips = !isNullOrUndefined(selectedItem.index) ?
                (this.selection === 'Multiple' ? selectedItems : selectedItem) : undefined;
        }
        return selectedChips;
    };
    ChipList.prototype.wireEvent = function (unWireEvent) {
        if (!unWireEvent) {
            EventHandler.add(this.element, 'click', this.clickHandler, this);
            EventHandler.add(this.element, 'focusout', this.focusOutHandler, this);
            EventHandler.add(this.element, 'keydown', this.keyHandler, this);
            EventHandler.add(this.element, 'keyup', this.keyHandler, this);
        }
        else {
            EventHandler.remove(this.element, 'click', this.clickHandler);
            EventHandler.remove(this.element, 'focusout', this.focusOutHandler);
            EventHandler.remove(this.element, 'keydown', this.keyHandler);
            EventHandler.remove(this.element, 'keyup', this.keyHandler);
        }
    };
    ChipList.prototype.keyHandler = function (e) {
        if (e.target.classList.contains(classNames.chip)) {
            if (e.type === 'keydown') {
                if (e.keyCode === 13 || e.keyCode === 32) {
                    this.clickHandler(e);
                }
                else if (e.keyCode === 46 && this.enableDelete) {
                    this.clickHandler(e, true);
                }
            }
            else if (e.keyCode === 9) {
                this.focusInHandler(e.target);
            }
        }
    };
    ChipList.prototype.focusInHandler = function (chipWrapper) {
        if (!chipWrapper.classList.contains(classNames.focused)) {
            chipWrapper.classList.add(classNames.focused);
        }
    };
    ChipList.prototype.focusOutHandler = function (e) {
        var chipWrapper = closest(e.target, '.' + classNames.chip);
        var focusedElement = !this.chipType() ? (this.element.classList.contains(classNames.focused) ?
            this.element : null) : this.element.querySelector('.' + classNames.focused);
        if (chipWrapper && focusedElement) {
            focusedElement.classList.remove(classNames.focused);
        }
    };
    ChipList.prototype.clickHandler = function (e, del) {
        var _this = this;
        if (del === void 0) { del = false; }
        var chipWrapper = closest(e.target, '.' + classNames.chip);
        if (chipWrapper) {
            // eslint-disable-next-line
            var chipDataArgs = void 0;
            if (this.chipType()) {
                chipDataArgs = this.find(chipWrapper);
            }
            else {
                var index = Array.prototype.slice.call(this.element.querySelectorAll('.' + classNames.chip)).indexOf(chipWrapper);
                chipDataArgs = {
                    text: this.innerText ? this.innerText : this.text,
                    element: chipWrapper, data: this.text, index: index
                };
            }
            chipDataArgs.event = e;
            chipDataArgs.cancel = false;
            this.trigger('beforeClick', chipDataArgs, function (observedArgs) {
                if (!observedArgs.cancel) {
                    _this.clickEventHandler(observedArgs.element, e, del);
                }
            });
        }
    };
    ChipList.prototype.clickEventHandler = function (chipWrapper, e, del) {
        var _this = this;
        if (this.chipType()) {
            var chipData_1 = this.find(chipWrapper);
            chipData_1.event = e;
            var deleteElement = e.target.classList.contains(classNames.deleteIcon) ?
                e.target : (del ? chipWrapper.querySelector('.' + classNames.deleteIcon) : undefined);
            if (deleteElement && this.enableDelete) {
                chipData_1.cancel = false;
                var deletedItemArgs = chipData_1;
                this.trigger('delete', deletedItemArgs, function (observedArgs) {
                    if (!observedArgs.cancel) {
                        _this.deleteHandler(observedArgs.element, observedArgs.index);
                        _this.selectionHandler(chipWrapper);
                        chipData_1.selected = observedArgs.element.classList.contains(classNames.active);
                        var selectedItemArgs = chipData_1;
                        _this.trigger('click', selectedItemArgs);
                        var chipElement = _this.element.querySelectorAll('.' + classNames.chip)[observedArgs.index];
                        if (chipElement) {
                            chipElement.focus();
                            _this.focusInHandler(chipElement);
                        }
                    }
                });
            }
            else if (this.selection !== 'None') {
                this.selectionHandler(chipWrapper);
                chipData_1.selected = chipWrapper.classList.contains(classNames.active);
                var selectedItemArgs = chipData_1;
                this.trigger('click', selectedItemArgs);
            }
            else {
                this.focusInHandler(chipWrapper);
                var clickedItemArgs = chipData_1;
                this.trigger('click', clickedItemArgs);
            }
        }
        else {
            this.focusInHandler(chipWrapper);
            var clickedItemArgs = {
                text: this.innerText ? this.innerText : this.text,
                element: chipWrapper, data: this.text, event: e
            };
            this.trigger('click', clickedItemArgs);
        }
    };
    ChipList.prototype.selectionHandler = function (chipWrapper) {
        if (this.selection === 'Single') {
            var activeElement = this.element.querySelector('.' + classNames.active);
            if (activeElement && activeElement !== chipWrapper) {
                activeElement.classList.remove(classNames.active);
                activeElement.setAttribute('aria-selected', 'false');
            }
            this.setProperties({ selectedChips: null }, true);
        }
        else {
            this.setProperties({ selectedChips: [] }, true);
        }
        if (chipWrapper.classList.contains(classNames.active)) {
            chipWrapper.classList.remove(classNames.active);
            chipWrapper.setAttribute('aria-selected', 'false');
        }
        else {
            chipWrapper.classList.add(classNames.active);
            chipWrapper.setAttribute('aria-selected', 'true');
        }
        this.updateSelectedChips();
    };
    ChipList.prototype.updateSelectedChips = function () {
        var chipListEle = this.element.querySelectorAll('.e-chip');
        var chipCollIndex = [];
        var chipCollValue = [];
        var chip = null;
        var value;
        for (var i = 0; i < chipListEle.length; i++) {
            var selectedEle = this.element.querySelectorAll('.e-chip')[i];
            if (selectedEle.getAttribute('aria-selected') === 'true') {
                value = selectedEle.getAttribute('data-value');
                if (this.selection === 'Single' && selectedEle.classList.contains('e-active')) {
                    chip = value ? value : i;
                    break;
                }
                else {
                    chip = value ? chipCollValue.push(value) : chipCollIndex.push(i);
                }
            }
        }
        this.setProperties({ selectedChips: this.selection === 'Single' ? chip : value ? chipCollValue : chipCollIndex }, true);
    };
    ChipList.prototype.deleteHandler = function (chipWrapper, index) {
        // Used to store the deleted chip item details.
        var deletedChipData = this.find(chipWrapper);
        this.chips.splice(index, 1);
        this.setProperties({ chips: this.chips }, true);
        detach(chipWrapper);
        this.trigger('deleted', deletedChipData);
    };
    /**
     * Removes the component from the DOM and detaches all its related event handlers. Also, it removes the attributes and classes.
     * {% codeBlock src='chips/destroy/index.md' %}{% endcodeBlock %}
     *
     *  @returns {void}
     */
    ChipList.prototype.destroy = function () {
        removeClass([this.element], [classNames.chipSet, classNames.chip, classNames.rtl,
            classNames.multiSelection, classNames.singleSelection, classNames.disabled, classNames.chipWrapper, classNames.iconWrapper,
            classNames.active, classNames.focused].concat(this.cssClass.toString().split(' ').filter(function (css) { return css; })));
        this.removeMultipleAttributes(['tabindex', 'role', 'aria-label', 'aria-multiselectable'], this.element);
        this.wireEvent(true);
        this.rippleFunction();
        _super.prototype.destroy.call(this);
        this.element.innerHTML = '';
        this.element.innerText = this.innerText;
    };
    ChipList.prototype.removeMultipleAttributes = function (attributes$$1, element) {
        attributes$$1.forEach(function (attr) {
            element.removeAttribute(attr);
        });
    };
    ChipList.prototype.getPersistData = function () {
        return this.addOnPersist([]);
    };
    ChipList.prototype.getModuleName = function () {
        return 'chip-list';
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @returns void
     * @private
     */
    ChipList.prototype.onPropertyChanged = function (newProp, oldProp) {
        var property;
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'chips':
                case 'text':
                case 'avatarText':
                case 'avatarIconCss':
                case 'leadingIconCss':
                case 'trailingIconCss':
                case 'selection':
                case 'enableDelete':
                case 'enabled':
                    this.refresh();
                    break;
                case 'cssClass':
                    if (!this.chipType()) {
                        removeClass([this.element], oldProp.cssClass.toString().split(' ').filter(function (css) { return css; }));
                        addClass([this.element], newProp.cssClass.toString().split(' ').filter(function (css) { return css; }));
                    }
                    else {
                        this.refresh();
                    }
                    break;
                case 'selectedChips':
                    removeClass(this.element.querySelectorAll('.e-active'), 'e-active');
                    if (this.selection === 'Multiple') {
                        this.multiSelectedChip = [];
                        this.multiSelection(newProp.selectedChips);
                        this.onSelect(this.multiSelectedChip, true, property);
                        this.updateSelectedChips();
                    }
                    else {
                        this.onSelect(newProp.selectedChips, true, property);
                    }
                    break;
                case 'enableRtl':
                    this.setRtl();
                    break;
            }
        }
    };
    __decorate$4([
        Property([])
    ], ChipList.prototype, "chips", void 0);
    __decorate$4([
        Property('')
    ], ChipList.prototype, "text", void 0);
    __decorate$4([
        Property('')
    ], ChipList.prototype, "avatarText", void 0);
    __decorate$4([
        Property('')
    ], ChipList.prototype, "avatarIconCss", void 0);
    __decorate$4([
        Property('')
    ], ChipList.prototype, "htmlAttributes", void 0);
    __decorate$4([
        Property('')
    ], ChipList.prototype, "leadingIconCss", void 0);
    __decorate$4([
        Property('')
    ], ChipList.prototype, "trailingIconCss", void 0);
    __decorate$4([
        Property('')
    ], ChipList.prototype, "leadingIconUrl", void 0);
    __decorate$4([
        Property('')
    ], ChipList.prototype, "trailingIconUrl", void 0);
    __decorate$4([
        Property('')
    ], ChipList.prototype, "cssClass", void 0);
    __decorate$4([
        Property(true)
    ], ChipList.prototype, "enabled", void 0);
    __decorate$4([
        Property([])
    ], ChipList.prototype, "selectedChips", void 0);
    __decorate$4([
        Property('None')
    ], ChipList.prototype, "selection", void 0);
    __decorate$4([
        Property(false)
    ], ChipList.prototype, "enableDelete", void 0);
    __decorate$4([
        Event()
    ], ChipList.prototype, "created", void 0);
    __decorate$4([
        Event()
    ], ChipList.prototype, "click", void 0);
    __decorate$4([
        Event()
    ], ChipList.prototype, "beforeClick", void 0);
    __decorate$4([
        Event()
    ], ChipList.prototype, "delete", void 0);
    __decorate$4([
        Event()
    ], ChipList.prototype, "deleted", void 0);
    ChipList = __decorate$4([
        NotifyPropertyChanges
    ], ChipList);
    return ChipList;
}(Component));

/**
 * Represents ChipList `Chip` model class.
 */
var Chip = /** @__PURE__ @class */ (function () {
    function Chip() {
    }
    return Chip;
}());

/**
 * Chip modules
 */

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
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
///<reference path='../button/button-model.d.ts'/>
var FABHIDDEN = 'e-fab-hidden';
var FIXEDFAB = 'e-fab-fixed';
var FABVERTDIST = '--fabVertDist';
var FABHORZDIST = '--fabHorzDist';
var FABTOP = 'e-fab-top';
var FABBOTTOM = 'e-fab-bottom';
var FABRIGHT = 'e-fab-right';
var FABLEFT = 'e-fab-left';
var FABMIDDLE = 'e-fab-middle';
var FABCENTER = 'e-fab-center';
/**
 * Defines the position of FAB (Floating Action Button) in target.
 */
var FabPosition;
(function (FabPosition) {
    /**
     * Positions the FAB at the target's top left corner.
     */
    FabPosition["TopLeft"] = "TopLeft";
    /**
     * Places the FAB on the top-center position of the target.
     */
    FabPosition["TopCenter"] = "TopCenter";
    /**
     * Positions the FAB at the target's top right corner.
     */
    FabPosition["TopRight"] = "TopRight";
    /**
     * Positions the FAB in the middle of target's left side.
     */
    FabPosition["MiddleLeft"] = "MiddleLeft";
    /**
     * Positions the FAB in the center of target.
     */
    FabPosition["MiddleCenter"] = "MiddleCenter";
    /**
     * Positions the FAB in the middle of target's right side.
     */
    FabPosition["MiddleRight"] = "MiddleRight";
    /**
     * Positions the FAB at the target's bottom left corner.
     */
    FabPosition["BottomLeft"] = "BottomLeft";
    /**
     * Places the FAB on the bottom-center position of the target.
     */
    FabPosition["BottomCenter"] = "BottomCenter";
    /**
     * Positions the FAB at the target's bottom right corner.
     */
    FabPosition["BottomRight"] = "BottomRight";
})(FabPosition || (FabPosition = {}));
/**
 * The FAB Component (Floating Action Button) is an extension of Button Component that appears in front of all the contents of the page and performs the primary action.
 */
var Fab = /** @__PURE__ @class */ (function (_super) {
    __extends$5(Fab, _super);
    /**
     * Constructor for creating the widget
     *
     * @param  {FabModel} options - Specifies the floating action button model
     * @param  {string|HTMLButtonElement} element - Specifies the target element
     */
    function Fab(options, element) {
        return _super.call(this, options, element) || this;
    }
    /**
     * Initialize the control rendering
     *
     * @returns {void}
     * @private
     */
    Fab.prototype.render = function () {
        _super.prototype.render.call(this);
        this.initializeFab();
    };
    Fab.prototype.preRender = function () {
        _super.prototype.preRender.call(this);
        if (!this.element.id) {
            this.element.id = getUniqueID('e-' + this.getModuleName());
        }
    };
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @returns {string} - Persist data
     */
    Fab.prototype.getPersistData = function () {
        _super.prototype.getPersistData.call(this);
        return this.addOnPersist([]);
    };
    /**
     * Get component name.
     *
     * @returns {string} - Module name
     * @private
     */
    Fab.prototype.getModuleName = function () {
        return 'fab';
    };
    Fab.prototype.initializeFab = function () {
        // To add 'e-btn' class
        this.element.classList.add('e-' + _super.prototype.getModuleName.call(this));
        this.checkTarget();
        this.setPosition();
        this.setVisibility();
        EventHandler.add(window, 'resize', this.resizeHandler, this);
    };
    Fab.prototype.checkTarget = function () {
        this.isFixed = true;
        if (this.target) {
            this.targetEle = (typeof this.target === 'string') ? select(this.target) : this.target;
            if (this.targetEle) {
                this.isFixed = false;
                this.targetEle.appendChild(this.element);
            }
        }
        this.element.classList[this.isFixed ? 'add' : 'remove'](FIXEDFAB);
    };
    Fab.prototype.setVisibility = function () {
        this.element.classList[this.visible ? 'remove' : 'add'](FABHIDDEN);
    };
    Fab.prototype.setPosition = function () {
        this.setVerticalPosition();
        this.setHorizontalPosition();
    };
    Fab.prototype.setVerticalPosition = function () {
        //Check for middle position and middle class and vertical distance atttribute.
        if (['MiddleLeft', 'MiddleRight', 'MiddleCenter'].indexOf(this.position) !== -1) {
            var yoffset = ((this.isFixed ? window.innerHeight : this.targetEle.clientHeight) - this.element.offsetHeight) / 2;
            this.element.style.setProperty(FABVERTDIST, yoffset + 'px');
            this.element.classList.add(FABMIDDLE);
        }
        //Check for bottom position and bottom class else add top class.
        this.element.classList.add((['BottomLeft', 'BottomCenter', 'BottomRight'].indexOf(this.position) !== -1) ? FABBOTTOM : FABTOP);
    };
    Fab.prototype.setHorizontalPosition = function () {
        //Check for center position and center class and horizontal distance atttribute.
        if (['TopCenter', 'BottomCenter', 'MiddleCenter'].indexOf(this.position) !== -1) {
            var xoffset = ((this.isFixed ? window.innerWidth : this.targetEle.clientWidth) - this.element.offsetWidth) / 2;
            this.element.style.setProperty(FABHORZDIST, xoffset + 'px');
            this.element.classList.add(FABCENTER);
        }
        var isRight = ['TopRight', 'MiddleRight', 'BottomRight'].indexOf(this.position) !== -1;
        this.element.classList.add((!(this.enableRtl || isRight) || (this.enableRtl && isRight)) ? FABLEFT : FABRIGHT);
    };
    Fab.prototype.clearPosition = function () {
        this.element.style.removeProperty(FABVERTDIST);
        this.element.classList.remove(FABTOP, FABBOTTOM, FABMIDDLE);
        this.clearHorizontalPosition();
    };
    Fab.prototype.clearHorizontalPosition = function () {
        this.element.style.removeProperty(FABHORZDIST);
        this.element.classList.remove(FABRIGHT, FABLEFT, FABCENTER);
    };
    /**
     * Refreshes the FAB position. You can call this method to re-position FAB when target is resized.
     *
     * @returns {void}
     */
    Fab.prototype.refreshPosition = function () {
        this.resizeHandler();
    };
    Fab.prototype.resizeHandler = function () {
        this.setPosition();
    };
    /**
     * Destroys the FAB instance.
     *
     * @returns {void}
     *
     */
    Fab.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        // To remove 'e-btn' class
        this.element.classList.remove('e-' + _super.prototype.getModuleName.call(this), FIXEDFAB);
        this.clearPosition();
        EventHandler.remove(window, 'resize', this.resizeHandler);
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param  {FabModel} newProp - Specifies new properties
     * @param  {FabModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    Fab.prototype.onPropertyChanged = function (newProp, oldProp) {
        _super.prototype.onPropertyChanged.call(this, newProp, oldProp);
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'enableRtl':
                    this.clearHorizontalPosition();
                    this.setHorizontalPosition();
                    break;
                case 'visible':
                    this.setVisibility();
                    break;
                case 'position':
                    this.clearPosition();
                    this.setPosition();
                    break;
                case 'target':
                    this.checkTarget();
                    this.setPosition();
                    break;
            }
        }
    };
    __decorate$5([
        Property('BottomRight')
    ], Fab.prototype, "position", void 0);
    __decorate$5([
        Property('')
    ], Fab.prototype, "target", void 0);
    __decorate$5([
        Property(true)
    ], Fab.prototype, "visible", void 0);
    __decorate$5([
        Property(true)
    ], Fab.prototype, "isPrimary", void 0);
    Fab = __decorate$5([
        NotifyPropertyChanges
    ], Fab);
    return Fab;
}(Button));

/**
 * Floating Action Button modules
 */

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
var topPosition = ['TopLeft', 'TopCenter', 'TopRight'];
var bottomPosition = ['BottomLeft', 'BottomCenter', 'BottomRight'];
var leftPosition = ['TopLeft', 'MiddleLeft', 'BottomLeft'];
var rightPosition = ['TopRight', 'MiddleRight', 'BottomRight'];
var SDHIDDEN = 'e-speeddial-hidden';
var FIXEDSD = 'e-speeddial-fixed';
var SPEEDDIAL = 'e-speeddial';
var RTLCLASS = 'e-rtl';
var HOVERSD = 'e-speeddial-hover-open';
var RADIALSD = 'e-speeddial-radial';
var LINEARSD = 'e-speeddial-linear';
var TEMPLATESD = 'e-speeddial-template';
var SDTEMPLATECONTAINER = 'e-speeddial-template-container';
var SDOVERLAY = 'e-speeddial-overlay';
var SDPOPUP = 'e-speeddial-popup';
var SDUL = 'e-speeddial-ul';
var SDLI = 'e-speeddial-li';
var SDACTIVELI = 'e-speeddial-li-active';
var SDLIICON = 'e-speeddial-li-icon';
var SDLITEXT = 'e-speeddial-li-text';
var SDLITEXTONLY = 'e-speeddial-text-li';
var DISABLED$2 = 'e-disabled';
var SDVERTICALBOTTOM = 'e-speeddial-vert-bottom';
var SDVERTICALRIGHT = 'e-speeddial-vert-right';
var SDHORIZONTALTOP = 'e-speeddial-horz-top';
var SDHORIZONTALLEFT = 'e-speeddial-horz-left';
var SDHORIZONTALRIGHT = 'e-speeddial-horz-right';
var SDOVERFLOW = 'e-speeddial-overflow';
var SDVERTOVERFLOW = 'e-speeddial-vert-overflow';
var SDHORZOVERFLOW = 'e-speeddial-horz-overflow';
var SDTOP = 'e-speeddial-top';
var SDBOTTOM = 'e-speeddial-bottom';
var SDRIGHT = 'e-speeddial-right';
var SDLEFT = 'e-speeddial-left';
var SDMIDDLE = 'e-speeddial-middle';
var SDCENTER = 'e-speeddial-center';
var SDTOPLEFT = 'e-speeddial-top-left';
var SDBOTTOMRIGHT = 'e-speeddial-bottom-right';
var SDTOPRIGHT = 'e-speeddial-top-right';
var SDBOTTOMLEFT = 'e-speeddial-bottom-left';
var SDVERTDIST = '--speeddialVertDist';
var SDHORZDIST = '--speeddialHorzDist';
var SDRADICALANGLE = '--speeddialRadialAngle';
var SDRADICALOFFSET = '--speeddialRadialOffset';
var SDRADICALMINHEIGHT = '--speeddialRadialMinHeight';
var SDRADICALMINWIDTH = '--speeddialRadialMinWidth';
var SDOVERFLOWLIMIT = '--speeddialOverflowLimit';
/**
 * Defines the display mode of speed dial action items in SpeedDial
 */
var SpeedDialMode;
(function (SpeedDialMode) {
    /**
     * SpeedDial items are displayed in linear order like list.
     */
    SpeedDialMode["Linear"] = "Linear";
    /**
     * SpeedDial items are displayed like radial menu in radial direction (circular direction).
     */
    SpeedDialMode["Radial"] = "Radial";
})(SpeedDialMode || (SpeedDialMode = {}));
/**
 * Defines the speed dial action items display direction when mode is Linear.
 */
var LinearDirection;
(function (LinearDirection) {
    /**
     * Speed dial action items are displayed vertically above the button of Speed Dial.
     */
    LinearDirection["Up"] = "Up";
    /**
     * Speed dial action items are displayed vertically below the button of Speed Dial.
     */
    LinearDirection["Down"] = "Down";
    /**
     * Speed dial action items are displayed horizontally on the button's right side.
     */
    LinearDirection["Right"] = "Right";
    /**
     * Speed dial action items are displayed horizontally on the button's left side.
     */
    LinearDirection["Left"] = "Left";
    /**
     * Speed dial action items are displayed vertically above or below the button of Speed Dial based on the position.
     * If Position is TopRight, TopLeft, TopCenter, the items are displayed vertically below the button else above the button.
     */
    LinearDirection["Auto"] = "Auto";
})(LinearDirection || (LinearDirection = {}));
/**
 * Defines the speed dial action items  order, when mode is Radial.
 */
var RadialDirection;
(function (RadialDirection) {
    /**
     * SpeedDial items are arranged in clockwise direction.
     */
    RadialDirection["Clockwise"] = "Clockwise";
    /**
     * SpeedDial items are shown in anti-clockwise direction.
     */
    RadialDirection["AntiClockwise"] = "AntiClockwise";
    /**
     * SpeedDial items are shown clockwise or anti-clockwise based on the position.
     */
    RadialDirection["Auto"] = "Auto";
})(RadialDirection || (RadialDirection = {}));
/**
 * Defines the animation effect applied when open and close the speed dial items.
 */
var SpeedDialAnimationEffect;
(function (SpeedDialAnimationEffect) {
    /**
     * SpeedDial open/close actions occur with the Fade animation effect.
     */
    SpeedDialAnimationEffect["Fade"] = "Fade";
    /**
     * SpeedDial open/close actions occur with the FadeZoom animation effect.
     */
    SpeedDialAnimationEffect["FadeZoom"] = "FadeZoom";
    /**
     * SpeedDial open/close actions occur with the FlipLeftDown animation effect.
     */
    SpeedDialAnimationEffect["FlipLeftDown"] = "FlipLeftDown";
    /**
     * SpeedDial open/close actions occur with the FlipLeftUp animation effect.
     */
    SpeedDialAnimationEffect["FlipLeftUp"] = "FlipLeftUp";
    /**
     * SpeedDial open/close actions occur with the FlipRightDown animation effect.
     */
    SpeedDialAnimationEffect["FlipRightDown"] = "FlipRightDown";
    /**
     * SpeedDial open/close actions occur with the FlipRightUp animation effect.
     */
    SpeedDialAnimationEffect["FlipRightUp"] = "FlipRightUp";
    /**
     * SpeedDial open/close actions occur with the FlipXDown animation effect.
     */
    SpeedDialAnimationEffect["FlipXDown"] = "FlipXDown";
    /**
     * SpeedDial open/close actions occur with the FlipXUp animation effect.
     */
    SpeedDialAnimationEffect["FlipXUp"] = "FlipXUp";
    /**
     * SpeedDial open/close actions occur with the FlipYLeft animation effect.
     */
    SpeedDialAnimationEffect["FlipYLeft"] = "FlipYLeft";
    /**
     * SpeedDial open/close actions occur with the FlipYRight animation effect.
     */
    SpeedDialAnimationEffect["FlipYRight"] = "FlipYRight";
    /**
     * SpeedDial open/close actions occur with the SlideBottom animation effect.
     */
    SpeedDialAnimationEffect["SlideBottom"] = "SlideBottom";
    /**
     * SpeedDial open/close actions occur with the SlideLeft animation effect.
     */
    SpeedDialAnimationEffect["SlideLeft"] = "SlideLeft";
    /**
     * SpeedDial open/close actions occur with the SlideRight animation effect.
     */
    SpeedDialAnimationEffect["SlideRight"] = "SlideRight";
    /**
     * SpeedDial open/close actions occur with the SlideTop animation effect.
     */
    SpeedDialAnimationEffect["SlideTop"] = "SlideTop";
    /**
     * SpeedDial open/close actions occur with the Zoom animation effect.
     */
    SpeedDialAnimationEffect["Zoom"] = "Zoom";
    /**
     * SpeedDial open/close actions occur without any animation effect.
     */
    SpeedDialAnimationEffect["None"] = "None";
})(SpeedDialAnimationEffect || (SpeedDialAnimationEffect = {}));
/**
 * AProvides options to customize the animation applied while opening and closing the popup of SpeedDial.
 */
var SpeedDialAnimationSettings = /** @__PURE__ @class */ (function (_super) {
    __extends$6(SpeedDialAnimationSettings, _super);
    function SpeedDialAnimationSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$6([
        Property('Fade')
    ], SpeedDialAnimationSettings.prototype, "effect", void 0);
    __decorate$6([
        Property(400)
    ], SpeedDialAnimationSettings.prototype, "duration", void 0);
    __decorate$6([
        Property(0)
    ], SpeedDialAnimationSettings.prototype, "delay", void 0);
    return SpeedDialAnimationSettings;
}(ChildProperty));
/**
 * Provides the options to customize the speed dial action buttons when mode of SpeedDial is Radial.
 */
var RadialSettings = /** @__PURE__ @class */ (function (_super) {
    __extends$6(RadialSettings, _super);
    function RadialSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$6([
        Property('Auto')
    ], RadialSettings.prototype, "direction", void 0);
    __decorate$6([
        Property(-1)
    ], RadialSettings.prototype, "endAngle", void 0);
    __decorate$6([
        Property('100px')
    ], RadialSettings.prototype, "offset", void 0);
    __decorate$6([
        Property(-1)
    ], RadialSettings.prototype, "startAngle", void 0);
    return RadialSettings;
}(ChildProperty));
/**
 * Defines the items of Floating Action Button.
 */
var SpeedDialItem = /** @__PURE__ @class */ (function (_super) {
    __extends$6(SpeedDialItem, _super);
    function SpeedDialItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$6([
        Property('')
    ], SpeedDialItem.prototype, "iconCss", void 0);
    __decorate$6([
        Property('')
    ], SpeedDialItem.prototype, "id", void 0);
    __decorate$6([
        Property('')
    ], SpeedDialItem.prototype, "text", void 0);
    __decorate$6([
        Property('')
    ], SpeedDialItem.prototype, "title", void 0);
    __decorate$6([
        Property(false)
    ], SpeedDialItem.prototype, "disabled", void 0);
    return SpeedDialItem;
}(ChildProperty));
/**
 * The SpeedDial component that appears in front of all the contents of the page and displays list of action buttons on click which is an extended version of FAB.
 * The button of speed dial is positioned in relative to a view port of browser or the .
 * It can display a menu of related actions or a custom content popupTemplate>.
 *
 */
var SpeedDial = /** @__PURE__ @class */ (function (_super) {
    __extends$6(SpeedDial, _super);
    /**
     * Constructor for creating the widget
     *
     * @param  {SpeedDialModel} options - Specifies the floating action button model
     * @param  {string|HTMLButtonElement} element - Specifies the target element
     */
    function SpeedDial(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.isMenuOpen = false;
        _this.isClock = true;
        _this.isVertical = true;
        _this.isControl = false;
        _this.focusedIndex = -1;
        return _this;
    }
    /**
     * Initialize the control rendering
     *
     * @returns {void}
     * @private
     */
    SpeedDial.prototype.render = function () {
        this.initialize();
    };
    SpeedDial.prototype.preRender = function () {
        this.keyConfigs = {
            space: 'space',
            enter: 'enter',
            end: 'end',
            home: 'home',
            moveDown: 'downarrow',
            moveLeft: 'leftarrow',
            moveRight: 'rightarrow',
            moveUp: 'uparrow',
            esc: 'escape'
        };
        this.validateDirection();
    };
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @returns {string} - Persist data
     */
    SpeedDial.prototype.getPersistData = function () {
        return this.addOnPersist([]);
    };
    /**
     * Get component name.
     *
     * @returns {string} - Module name
     * @private
     */
    SpeedDial.prototype.getModuleName = function () {
        return 'speed-dial';
    };
    SpeedDial.prototype.initialize = function () {
        if (!this.element.id) {
            this.element.id = getUniqueID('e-' + this.getModuleName());
        }
        this.fab = new Fab({
            content: this.content,
            cssClass: this.cssClass ? (SPEEDDIAL + ' ' + this.cssClass) : SPEEDDIAL,
            disabled: this.disabled,
            enablePersistence: this.enablePersistence,
            enableRtl: this.enableRtl,
            iconCss: this.openIconCss,
            iconPosition: this.iconPosition,
            position: this.position,
            target: this.target,
            visible: this.visible,
            isPrimary: this.isPrimary
        });
        this.fab.appendTo(this.element);
        if ((this.items.length > 0) || this.popupTemplate) {
            this.createPopup();
        }
        this.wireEvents();
    };
    SpeedDial.prototype.wireEvents = function () {
        EventHandler.add(window, 'resize', this.resizeHandler, this);
        EventHandler.add(document.body, 'click', this.bodyClickHandler, this);
        if (this.opensOnHover) {
            this.wireFabHover();
        }
        else {
            this.wireFabClick();
        }
    };
    SpeedDial.prototype.wirePopupEvents = function () {
        this.removeRippleEffect = rippleEffect(this.popupEle, { selector: '.' + SDLIICON });
        this.keyboardModule = new KeyboardEvents(this.element, {
            keyAction: this.keyActionHandler.bind(this),
            keyConfigs: this.keyConfigs,
            eventName: 'keydown'
        });
        this.popupKeyboardModule = new KeyboardEvents(this.popupEle, {
            keyAction: this.popupKeyActionHandler.bind(this),
            keyConfigs: { esc: 'escape' },
            eventName: 'keydown'
        });
        EventHandler.add(this.popupEle, 'click', this.popupClick, this);
        EventHandler.add(this.popupEle, 'mouseleave', this.popupMouseLeaveHandle, this);
    };
    SpeedDial.prototype.wireFabClick = function () {
        EventHandler.add(this.fab.element, 'click', this.fabClick, this);
    };
    SpeedDial.prototype.wireFabHover = function () {
        this.popupEle.classList.add(HOVERSD);
        EventHandler.add(this.fab.element, 'mouseover', this.mouseOverHandle, this);
        EventHandler.add(this.element, 'mouseleave', this.mouseLeaveHandle, this);
    };
    SpeedDial.prototype.createPopup = function () {
        var className = SDPOPUP + ' ' + SDHIDDEN;
        className = this.enableRtl ? className + ' ' + RTLCLASS : className;
        className = this.cssClass ? className + ' ' + this.cssClass : className;
        this.popupEle = this.createElement('div', {
            className: className,
            id: this.element.id + '_popup'
        });
        this.element.insertAdjacentElement('afterend', this.popupEle);
        attributes(this.element, { 'aria-expanded': 'false', 'aria-haspopup': 'true', 'aria-controls': this.popupEle.id });
        this.setPopupContent();
        if (this.modal) {
            this.createOverlay();
        }
        this.checkTarget();
        this.setPositionProps();
        this.wirePopupEvents();
    };
    SpeedDial.prototype.createOverlay = function () {
        this.overlayEle = this.createElement('div', {
            id: this.element.id + '_overlay',
            className: (SDOVERLAY + (this.isMenuOpen ? '' : ' ' + SDHIDDEN) + ' ' + this.cssClass).trim()
        });
        this.element.insertAdjacentElement('beforebegin', this.overlayEle);
    };
    SpeedDial.prototype.popupClick = function () {
        this.isControl = true;
    };
    //Checks and closes the speed dial if the click happened outside this speed dial.
    SpeedDial.prototype.bodyClickHandler = function (e) {
        if (this.isControl) {
            this.isControl = false;
            return;
        }
        if (this.isMenuOpen) {
            this.hidePopupEle(e);
        }
    };
    SpeedDial.prototype.fabClick = function (e) {
        this.isControl = true;
        if (this.isMenuOpen) {
            this.hidePopupEle(e);
        }
        else {
            this.showPopupEle(e);
        }
    };
    SpeedDial.prototype.setPopupContent = function () {
        this.popupEle.classList.remove(RADIALSD, LINEARSD, TEMPLATESD);
        if (!this.popupTemplate) {
            this.popupEle.classList.add((this.mode === 'Radial') ? RADIALSD : LINEARSD);
            this.createUl();
            this.createItems();
        }
        else {
            this.popupEle.classList.add(TEMPLATESD);
            this.appendTemplate();
        }
        this.renderReactTemplates();
    };
    SpeedDial.prototype.appendTemplate = function () {
        var templateContainer = this.createElement('div', { className: SDTEMPLATECONTAINER });
        append([templateContainer], this.popupEle);
        var templateFunction = this.getTemplateString(this.popupTemplate);
        append(templateFunction({}, this, 'fabPopupTemplate', (this.element.id + 'popupTemplate'), this.isStringTemplate), templateContainer);
    };
    SpeedDial.prototype.getTemplateString = function (template) {
        var stringContent = '';
        try {
            var tempEle = select(template);
            if (typeof template !== 'function' && tempEle) {
                //Return innerHTML incase of jsrenderer script else outerHTML
                stringContent = tempEle.tagName === 'SCRIPT' ? tempEle.innerHTML : tempEle.outerHTML;
            }
            else {
                stringContent = template;
            }
        }
        catch (e) {
            stringContent = template;
        }
        return compile(stringContent);
    };
    SpeedDial.prototype.updatePopupTemplate = function () {
        if (this.popupEle) {
            if (this.popupEle.querySelector('.' + SDLI)) {
                this.clearItems();
                this.popupEle.classList.remove(RADIALSD, LINEARSD);
                this.popupEle.classList.add(TEMPLATESD);
            }
            while (this.popupEle.firstElementChild) {
                remove(this.popupEle.firstElementChild);
            }
            this.setPopupContent();
            this.updatePositionProperties();
        }
        else {
            this.createPopup();
        }
    };
    SpeedDial.prototype.createUl = function () {
        var popupUlEle = this.createElement('ul', {
            className: SDUL,
            id: this.element.id + '_ul',
            attrs: { 'role': 'menu' }
        });
        this.popupEle.appendChild(popupUlEle);
    };
    SpeedDial.prototype.createItems = function () {
        var _this = this;
        this.focusedIndex = -1;
        var ul = this.popupEle.querySelector('.' + SDUL);
        var _loop_1 = function (index) {
            var item = this_1.items[parseInt(index.toString(), 10)];
            var li = this_1.createElement('li', {
                className: SDLI + ' ' + SDHIDDEN,
                id: item.id ? item.id : (this_1.element.id + '_li_' + index),
                attrs: { 'role': 'menuitem' }
            });
            if (item.text) {
                li.setAttribute('aria-label', item.text);
            }
            if (this_1.itemTemplate) {
                var templateFunction = this_1.getTemplateString(this_1.itemTemplate);
                append(templateFunction(item, this_1, 'fabItemTemplate', (this_1.element.id + 'itemTemplate'), this_1.isStringTemplate), li);
            }
            else {
                if (item.iconCss) {
                    var iconSpan = this_1.createElement('span', {
                        className: SDLIICON + ' ' + item.iconCss
                    });
                    li.appendChild(iconSpan);
                }
                if (item.text) {
                    var textSpan = this_1.createElement('span', {
                        className: SDLITEXT
                    });
                    textSpan.innerText = item.text;
                    li.appendChild(textSpan);
                    if (!item.iconCss) {
                        li.classList.add(SDLITEXTONLY);
                    }
                }
            }
            if (item.disabled) {
                li.classList.add(DISABLED$2);
                li.setAttribute('aria-disabled', 'true');
            }
            else {
                EventHandler.add(li, 'click', function (e) { return _this.triggerItemClick(e, item); }, this_1);
            }
            if (item.title) {
                li.setAttribute('title', item.title);
            }
            var eventArgs = { element: li, item: item };
            this_1.trigger('beforeItemRender', eventArgs, function (args) {
                ul.appendChild(args.element);
            });
        };
        var this_1 = this;
        for (var index = 0; index < this.items.length; index++) {
            _loop_1(index);
        }
    };
    SpeedDial.prototype.setRTL = function () {
        this.popupEle.classList[this.enableRtl ? 'add' : 'remove'](RTLCLASS);
        this.clearHorizontalPosition();
        if (!(this.popupTemplate || (this.mode === 'Radial'))) {
            this.setLinearHorizontalPosition();
        }
        else {
            this.setHorizontalPosition();
        }
    };
    SpeedDial.prototype.checkTarget = function () {
        this.isFixed = true;
        if (this.target) {
            this.targetEle = (typeof this.target === 'string') ? select(this.target) : this.target;
            if (this.targetEle) {
                this.targetEle.appendChild(this.element);
                this.isFixed = false;
            }
        }
        if (this.isFixed) {
            if (this.popupEle) {
                this.popupEle.classList.add(FIXEDSD);
            }
            if (this.overlayEle) {
                this.overlayEle.classList.add(FIXEDSD);
            }
        }
        else {
            if (this.popupEle) {
                this.popupEle.classList.remove(FIXEDSD);
            }
            if (this.overlayEle) {
                this.overlayEle.classList.remove(FIXEDSD);
            }
        }
    };
    SpeedDial.prototype.setVisibility = function (val) {
        this.setProperties({ visible: val }, true);
        this.fab.setProperties({ visible: val });
    };
    SpeedDial.prototype.popupMouseLeaveHandle = function (e) {
        var target = e.relatedTarget;
        if (this.opensOnHover && !(target.classList.contains(SPEEDDIAL) || closest(target, '.' + SPEEDDIAL))) {
            this.hidePopupEle(e);
        }
    };
    SpeedDial.prototype.mouseOverHandle = function (e) {
        this.showPopupEle(e);
    };
    SpeedDial.prototype.mouseLeaveHandle = function (e) {
        var target = e.relatedTarget;
        if (!(target.classList.contains(SDPOPUP) || closest(target, '.' + SDPOPUP))) {
            this.hidePopupEle(e);
        }
    };
    SpeedDial.prototype.popupKeyActionHandler = function (e) {
        switch (e.action) {
            case 'esc':
                this.hidePopupEle(e);
                break;
        }
    };
    SpeedDial.prototype.keyActionHandler = function (e) {
        e.preventDefault();
        switch (e.action) {
            case 'enter':
            case 'space':
                if (this.isMenuOpen) {
                    if (this.focusedIndex !== -1) {
                        this.triggerItemClick(e, this.items[this.focusedIndex]);
                    }
                    else {
                        this.hidePopupEle(e);
                    }
                }
                else {
                    this.showPopupEle(e);
                }
                break;
            case 'esc':
                this.hidePopupEle(e);
                break;
            default:
                if (this.popupTemplate || !this.isMenuOpen) {
                    break;
                }
                switch (e.action) {
                    case 'end':
                        this.focusLastElement();
                        break;
                    case 'home':
                        this.focusFirstElement();
                        break;
                    case 'moveRight':
                        if (this.mode === 'Radial') {
                            this.focusLeftRightElement(false);
                        }
                        else {
                            this.focusLinearElement(false);
                        }
                        break;
                    case 'moveDown':
                        if (this.mode === 'Radial') {
                            this.focusUpDownElement(false);
                        }
                        else {
                            this.focusLinearElement(false);
                        }
                        break;
                    case 'moveLeft':
                        if (this.mode === 'Radial') {
                            this.focusLeftRightElement(true);
                        }
                        else {
                            this.focusLinearElement(true);
                        }
                        break;
                    case 'moveUp':
                        if (this.mode === 'Radial') {
                            this.focusUpDownElement(true);
                        }
                        else {
                            this.focusLinearElement(true);
                        }
                        break;
                }
                break;
        }
    };
    SpeedDial.prototype.focusFirstElement = function () {
        var ele = selectAll('.' + SDLI, this.popupEle);
        var index = 0;
        while (ele[parseInt(index.toString(), 10)].classList.contains(DISABLED$2)) {
            index++;
            if (index > (ele.length - 1)) {
                return;
            }
        }
        this.setFocus(index, ele[parseInt(index.toString(), 10)]);
    };
    SpeedDial.prototype.focusLastElement = function () {
        var ele = selectAll('.' + SDLI, this.popupEle);
        var index = ele.length - 1;
        while (ele[parseInt(index.toString(), 10)].classList.contains(DISABLED$2)) {
            index--;
            if (index < 0) {
                return;
            }
        }
        this.setFocus(index, ele[parseInt(index.toString(), 10)]);
    };
    /*Linear*/
    SpeedDial.prototype.focusLinearElement = function (isLeftUp) {
        var isReversed = this.popupEle.classList.contains(SDVERTICALBOTTOM) ||
            this.popupEle.classList.contains(SDHORIZONTALRIGHT);
        /* Elements will be in reverse (RTL) order for these classes are present.
        Reversed  and Down or right is previous.
        Not reversed and Up or left is previous.
        ((isReversed && !isLeftUp)||(!isReversed && isLeftUp)) ==> isReversed!==isLeftUp */
        if (isReversed !== isLeftUp) {
            this.focusPrevElement();
        }
        else {
            this.focusNextElement();
        }
    };
    /*Radial*/
    SpeedDial.prototype.focusLeftRightElement = function (isLeft) {
        /*radialTop position  and left + anticlock or right + clock is previous
        other positions and right + anticlock or left + clock is previous
        ((isLeft && !this.isClock)||(!isLeft && this.isClock)) ==> isLeft!==this.isClock */
        var isradialTop = ['TopLeft', 'TopCenter', 'TopRight', 'MiddleLeft'].indexOf(this.position) !== -1;
        if ((isradialTop && (isLeft !== this.isClock)) || (!isradialTop && (isLeft === this.isClock))) {
            this.focusPrevElement();
        }
        else {
            this.focusNextElement();
        }
    };
    /*Radial*/
    SpeedDial.prototype.focusUpDownElement = function (isUp) {
        /*radialRight position  and up + anticlock or down + clock is previous
        other positions and down + anticlock or up + clock is previous
        ((isUp && !this.isClock)||(!isUp && this.isClock)) ==> isUp!==this.isClock */
        var isradialRight = ['TopRight', 'MiddleRight', 'BottomRight', 'BottomCenter'].indexOf(this.position) !== -1;
        if ((isradialRight && (isUp !== this.isClock)) || (!isradialRight && (isUp === this.isClock))) {
            this.focusPrevElement();
        }
        else {
            this.focusNextElement();
        }
    };
    SpeedDial.prototype.focusPrevElement = function () {
        var ele = selectAll('.' + SDLI, this.popupEle);
        var index = this.focusedIndex;
        do {
            index--;
            if (index < 0) {
                this.setFocus(-1);
                return;
            }
        } while (ele[parseInt(index.toString(), 10)].classList.contains(DISABLED$2));
        this.setFocus(index, ele[parseInt(index.toString(), 10)]);
    };
    SpeedDial.prototype.focusNextElement = function () {
        var ele = selectAll('.' + SDLI, this.popupEle);
        var index = this.focusedIndex;
        do {
            index++;
            if (index > (ele.length - 1)) {
                return;
            }
        } while (ele[parseInt(index.toString(), 10)].classList.contains(DISABLED$2));
        this.setFocus(index, ele[parseInt(index.toString(), 10)]);
    };
    SpeedDial.prototype.setFocus = function (index, ele) {
        this.removeFocus();
        if (ele) {
            ele.classList.add(SDACTIVELI);
        }
        this.focusedIndex = index;
    };
    SpeedDial.prototype.removeFocus = function () {
        var preEle = select('.' + SDACTIVELI, this.popupEle);
        if (preEle) {
            preEle.classList.remove(SDACTIVELI);
        }
    };
    SpeedDial.prototype.updatePositionProperties = function () {
        this.hidePopupEle();
        this.clearPosition();
        this.validateDirection();
        this.setPositionProps();
    };
    SpeedDial.prototype.setPositionProps = function () {
        if (this.popupTemplate) {
            this.setPosition();
        }
        else if ((this.mode === 'Radial')) {
            this.setRadialPosition();
            this.setPosition();
        }
        else {
            this.setLinearPosition();
            this.setMaxSize();
        }
    };
    SpeedDial.prototype.validateDirection = function () {
        switch (this.direction) {
            case 'Up':
                this.actualLinDirection = (topPosition.indexOf(this.position) !== -1) ? 'Auto' : 'Up';
                break;
            case 'Down':
                this.actualLinDirection = (bottomPosition.indexOf(this.position) !== -1) ? 'Auto' : 'Down';
                break;
            case 'Right':
                this.actualLinDirection = (rightPosition.indexOf(this.position) !== -1) ? 'Auto' : 'Right';
                break;
            case 'Left':
                this.actualLinDirection = (leftPosition.indexOf(this.position) !== -1) ? 'Auto' : 'Left';
                break;
            case 'Auto':
            default:
                this.actualLinDirection = 'Auto';
                break;
        }
        this.isVertical = !((this.actualLinDirection === 'Left') || (this.actualLinDirection === 'Right'));
    };
    SpeedDial.prototype.setMaxSize = function () {
        var top = this.element.offsetTop;
        var left = this.element.offsetLeft;
        var bottom = (this.isFixed ? window.innerHeight : this.targetEle.clientHeight) -
            this.element.offsetTop - this.element.offsetHeight;
        var right = (this.isFixed ? window.innerWidth : this.targetEle.clientWidth) -
            this.element.offsetLeft - this.element.offsetWidth;
        var limit = 0;
        var popupUlEle = this.popupEle.querySelector('.' + SDUL);
        if (this.isVertical) {
            limit = ((this.actualLinDirection === 'Up') || ((this.actualLinDirection === 'Auto') && (topPosition.indexOf(this.position) === -1))) ? top : bottom;
            if (limit < popupUlEle.offsetHeight) {
                this.popupEle.classList.add(SDOVERFLOW, SDVERTOVERFLOW);
                popupUlEle.style.setProperty(SDOVERFLOWLIMIT, limit + 'px');
            }
        }
        else {
            limit = (this.direction === 'Right') ? right : left;
            if (limit < popupUlEle.offsetWidth) {
                this.popupEle.classList.add(SDOVERFLOW, SDHORZOVERFLOW);
                popupUlEle.style.setProperty(SDOVERFLOWLIMIT, limit + 'px');
            }
        }
    };
    SpeedDial.prototype.setLinearPosition = function () {
        var vertDist = 0;
        //Check whether the position value should be in top
        var isTop = (this.actualLinDirection === 'Down') || ((this.actualLinDirection === 'Auto') && (topPosition.indexOf(this.position) !== -1)) ||
            (!this.isVertical && (bottomPosition.indexOf(this.position) === -1));
        if (isTop) {
            vertDist = this.element.offsetTop + (this.isVertical ? this.element.offsetHeight : 0);
            if (!this.isVertical) {
                this.popupEle.classList.add(SDHORIZONTALTOP);
            }
        }
        else {
            vertDist = this.isFixed ? window.innerHeight : this.targetEle.clientHeight;
            vertDist = (vertDist - this.element.offsetTop - (this.isVertical ? 0 : this.element.offsetHeight));
            if (this.isVertical) {
                this.popupEle.classList.add(SDVERTICALBOTTOM);
            }
        }
        this.popupEle.classList.add(isTop ? SDTOP : SDBOTTOM);
        this.popupEle.style.setProperty(SDVERTDIST, vertDist + 'px');
        this.setLinearHorizontalPosition();
    };
    SpeedDial.prototype.setLinearHorizontalPosition = function () {
        //Check whether the position value should be in left
        if ((this.actualLinDirection === 'Right') || (this.isVertical && (rightPosition.indexOf(this.position) === -1))) {
            if (this.enableRtl) {
                this.setRight();
            }
            else {
                this.setLeft();
            } //reverse the direction when RTL enabled
            if (!this.isVertical) {
                this.popupEle.classList.add(SDHORIZONTALLEFT);
            }
        }
        else {
            if (this.enableRtl) {
                this.setLeft();
            }
            else {
                this.setRight();
            } //reverse the direction when RTL enabled
            this.popupEle.classList.add(this.isVertical ? SDVERTICALRIGHT : SDHORIZONTALRIGHT);
        }
    };
    SpeedDial.prototype.setLeft = function () {
        var horzDist = this.element.offsetLeft + (this.isVertical ? 0 : this.element.offsetWidth);
        this.popupEle.style.setProperty(SDHORZDIST, horzDist + 'px');
        this.popupEle.classList.add(SDLEFT);
    };
    SpeedDial.prototype.setRight = function () {
        var horzDist = this.isFixed ? window.innerWidth : this.targetEle.clientWidth;
        horzDist = (horzDist - this.element.offsetLeft - (this.isVertical ? this.element.offsetWidth : 0));
        this.popupEle.style.setProperty(SDHORZDIST, horzDist + 'px');
        this.popupEle.classList.add(SDRIGHT);
    };
    SpeedDial.prototype.setPosition = function () {
        //Check for middle Position
        if (['MiddleLeft', 'MiddleRight', 'MiddleCenter'].indexOf(this.position) !== -1) {
            this.popupEle.classList.add(SDMIDDLE);
            var yoffset = ((this.isFixed ? window.innerHeight : this.targetEle.clientHeight) - this.popupEle.offsetHeight) / 2;
            this.popupEle.style.setProperty(SDVERTDIST, yoffset + 'px');
        }
        this.popupEle.classList.add((bottomPosition.indexOf(this.position) === -1) ? SDTOP : SDBOTTOM);
        this.setHorizontalPosition();
    };
    SpeedDial.prototype.setHorizontalPosition = function () {
        //Check for Center Position
        if (['TopCenter', 'BottomCenter', 'MiddleCenter'].indexOf(this.position) !== -1) {
            this.popupEle.classList.add(SDCENTER);
            var xoffset = ((this.isFixed ? window.innerWidth : this.targetEle.clientWidth) - this.popupEle.offsetWidth) / 2;
            this.popupEle.style.setProperty(SDHORZDIST, xoffset + 'px');
        }
        var isRight = rightPosition.indexOf(this.position) !== -1;
        this.popupEle.classList.add((!(this.enableRtl || isRight) || (this.enableRtl && isRight)) ? SDLEFT : SDRIGHT);
    };
    SpeedDial.prototype.setRadialPosition = function () {
        this.setRadialCorner();
        var range = this.getActualRange();
        this.isClock = range.direction === 'Clockwise';
        var offset = formatUnit(range.offset);
        var li = selectAll('.' + SDLI, this.popupEle);
        this.popupEle.style.setProperty(SDRADICALOFFSET, offset);
        this.popupEle.style.setProperty(SDRADICALMINHEIGHT, li[0].offsetHeight + 'px');
        this.popupEle.style.setProperty(SDRADICALMINWIDTH, li[0].offsetWidth + 'px');
        var availableAngle = Math.abs(range.endAngle - range.startAngle);
        //Start and end will be same for Middle Center position, hence available angle will 0 or 360.
        var gaps = ((availableAngle === 360) || (availableAngle === 0)) ? li.length : li.length - 1;
        var perAngle = availableAngle / gaps;
        for (var i = 0; i < li.length; i++) {
            var ele = li[parseInt(i.toString(), 10)];
            var angle = this.isClock ? (range.startAngle + (perAngle * i)) : (range.startAngle - (perAngle * i));
            angle = angle % 360; // removing the Zerp crossing changes.
            ele.style.setProperty(SDRADICALANGLE, angle + 'deg');
        }
    };
    SpeedDial.prototype.setRadialCorner = function () {
        //topLeftPosition
        if (['TopLeft', 'TopCenter', 'MiddleLeft', 'MiddleCenter'].indexOf(this.position) !== -1) {
            this.popupEle.classList.add(this.enableRtl ? SDTOPRIGHT : SDTOPLEFT);
        }
        //topRightPosition
        if (['TopRight', 'TopCenter', 'MiddleRight', 'MiddleCenter'].indexOf(this.position) !== -1) {
            this.popupEle.classList.add(this.enableRtl ? SDTOPLEFT : SDTOPRIGHT);
        }
        //bottpmLeftPosition
        if (['BottomLeft', 'BottomCenter', 'MiddleLeft', 'MiddleCenter'].indexOf(this.position) !== -1) {
            this.popupEle.classList.add(this.enableRtl ? SDBOTTOMRIGHT : SDBOTTOMLEFT);
        }
        //bottomRightPosition
        if (['BottomRight', 'BottomCenter', 'MiddleRight', 'MiddleCenter'].indexOf(this.position) !== -1) {
            this.popupEle.classList.add(this.enableRtl ? SDBOTTOMLEFT : SDBOTTOMRIGHT);
        }
    };
    // 0,360 is at right, 90 is at Bottom, 180 is at left, 270 is at top
    SpeedDial.prototype.getActualRange = function () {
        var range = { offset: this.radialSettings.offset };
        var start = this.radialSettings.startAngle;
        var end = this.radialSettings.endAngle;
        var isClockwise;
        switch (this.position) {
            case 'TopLeft':
            case 'TopRight':
                // Switch Left and Right for RTL mode.
                if (('TopLeft' === this.position) !== this.enableRtl) {
                    //TopLeft
                    isClockwise = this.radialSettings.direction === 'Clockwise';
                    this.checkAngleRange(start, end, range, isClockwise, 0, 90, false);
                }
                else {
                    //TopRight
                    isClockwise = this.radialSettings.direction !== 'AntiClockwise';
                    this.checkAngleRange(start, end, range, isClockwise, 90, 180, false);
                }
                break;
            case 'TopCenter':
                isClockwise = this.radialSettings.direction === 'Clockwise';
                this.checkAngleRange(start, end, range, isClockwise, 0, 180, false);
                break;
            case 'MiddleLeft':
            case 'MiddleRight':
                // Switch Left and Right for RTL mode.
                if (('MiddleLeft' === this.position) !== this.enableRtl) {
                    //MiddleLeft
                    isClockwise = this.radialSettings.direction === 'Clockwise';
                    /**Replace the value if not defined or greater than 360 or less than 0 or between 91 and  269*/
                    start = (isNullOrUndefined(start) || (start < 0) || (start > 360) || ((start > 90) && (start < 270))) ?
                        (isClockwise ? 270 : 90) : start;
                    end = (isNullOrUndefined(end) || (end < 0) || (end > 360) || ((end > 90) && (end < 270))) ?
                        (isClockwise ? 90 : 270) : end;
                    /**update for Zero Crossing */
                    start = start < 91 ? start + 360 : start;
                    end = end < 91 ? end + 360 : end;
                    var switchVal = (isClockwise && (end < start)) || (!isClockwise && (end > start));
                    range.startAngle = switchVal ? end : start;
                    range.endAngle = switchVal ? start : end;
                }
                else {
                    //MiddleRight
                    isClockwise = this.radialSettings.direction !== 'AntiClockwise';
                    this.checkAngleRange(start, end, range, isClockwise, 90, 270, false);
                }
                break;
            case 'MiddleCenter':
                isClockwise = this.radialSettings.direction !== 'AntiClockwise';
                /**Replace the value if not defined or greater than 360 or less than 0 */
                start = (isNullOrUndefined(start) || (start < 0) || (start > 360)) ? (isClockwise ? 0 : 360) : start;
                end = (isNullOrUndefined(end) || (end < 0) || (end > 360)) ? (isClockwise ? 360 : 0) : end;
                /**update for Zero Crossing */
                range.startAngle = (!isClockwise && (start <= end)) ? (start + 360) : start;
                range.endAngle = (isClockwise && (end <= start)) ? (end + 360) : end;
                break;
            case 'BottomLeft':
            case 'BottomRight':
                // Switch Left and Right for RTL mode.
                if (('BottomLeft' === this.position) !== this.enableRtl) {
                    //BottomLeft
                    isClockwise = this.radialSettings.direction === 'Clockwise';
                    this.checkAngleRange(start, end, range, isClockwise, 270, 360, true);
                }
                else {
                    //BottomRight
                    isClockwise = this.radialSettings.direction !== 'AntiClockwise';
                    this.checkAngleRange(start, end, range, isClockwise, 180, 270, true);
                }
                break;
            case 'BottomCenter':
                isClockwise = this.radialSettings.direction !== 'AntiClockwise';
                this.checkAngleRange(start, end, range, isClockwise, 180, 360, true);
                break;
        }
        range.direction = isClockwise ? 'Clockwise' : 'AntiClockwise';
        return range;
    };
    SpeedDial.prototype.checkAngleRange = function (start, end, range, isClockwise, min, max, check0) {
        start = this.checkAngle(start, isClockwise, min, max, check0);
        end = this.checkAngle(end, !isClockwise, min, max, check0);
        /**Switch the values if both are values are in the range but not as per direction*/
        var switchVal = (isClockwise && (end < start)) || (!isClockwise && (end > start));
        range.startAngle = switchVal ? end : start;
        range.endAngle = switchVal ? start : end;
    };
    SpeedDial.prototype.checkAngle = function (val, isStart, min, max, check0) {
        if (isNullOrUndefined(val) || (val < 0) || (val > 360)) {
            return isStart ? min : max;
        }
        else {
            val = check0 ? ((val === 0) ? 360 : val) : ((val === 360) ? 0 : val);
            /**check whether the value is in the range if not replace them */
            return ((val >= min) && (val <= max)) ? val : isStart ? min : max;
        }
    };
    SpeedDial.prototype.clearPosition = function () {
        this.popupEle.style.removeProperty(SDRADICALOFFSET);
        this.popupEle.style.removeProperty(SDRADICALMINHEIGHT);
        this.popupEle.style.removeProperty(SDRADICALMINWIDTH);
        this.popupEle.classList.remove(SDTOPLEFT, SDTOPRIGHT, SDBOTTOMLEFT, SDBOTTOMRIGHT);
        this.popupEle.classList.remove(SDTOP, SDBOTTOM, SDMIDDLE);
        this.popupEle.classList.remove(SDHORIZONTALTOP, SDVERTICALBOTTOM);
        this.popupEle.style.removeProperty(SDVERTDIST);
        this.clearHorizontalPosition();
        this.clearOverflow();
    };
    SpeedDial.prototype.clearHorizontalPosition = function () {
        this.popupEle.style.removeProperty(SDHORZDIST);
        this.popupEle.classList.remove(SDRIGHT, SDLEFT, SDCENTER);
        this.popupEle.classList.remove(SDVERTICALRIGHT, SDHORIZONTALLEFT, SDHORIZONTALRIGHT);
    };
    SpeedDial.prototype.clearOverflow = function () {
        this.popupEle.classList.remove(SDOVERFLOW, SDVERTOVERFLOW, SDHORZOVERFLOW);
        this.popupEle.style.removeProperty(SDOVERFLOWLIMIT);
    };
    SpeedDial.prototype.hidePopupEle = function (e) {
        var _this = this;
        if (!this.popupEle || !this.isMenuOpen) {
            return;
        }
        var eventArgs = { element: this.popupEle, event: e, cancel: false };
        this.trigger('beforeClose', eventArgs, function (args) {
            if (args.cancel) {
                return;
            }
            if (_this.animation.effect !== 'None') {
                var closeAnimation_1 = {
                    name: (_this.animation.effect + 'Out'),
                    timingFunction: 'easeOut'
                };
                var eleArray_1 = _this.popupTemplate ? [_this.popupEle.firstElementChild] : selectAll('.' + SDLI, _this.popupEle);
                var timeOutInterval_1 = _this.animation.duration / (eleArray_1.length + 1);
                closeAnimation_1.duration = 2 * timeOutInterval_1;
                /* To keep the animation smooth, start the animation of the second element when animation first element is half completed */
                var animateElement_1 = function (curIndex) {
                    var ele = eleArray_1[parseInt(curIndex.toString(), 10)];
                    closeAnimation_1.delay = (curIndex === eleArray_1.length - 1) ? _this.animation.delay : 0;
                    closeAnimation_1.begin = function () { if (curIndex === eleArray_1.length - 1) {
                        _this.startHide();
                    } };
                    closeAnimation_1.end = function () {
                        ele.classList.add(SDHIDDEN);
                        if (curIndex === 0) {
                            _this.endHide();
                        }
                    };
                    new Animation(closeAnimation_1).animate(ele);
                    if (curIndex !== 0) {
                        var index_1 = curIndex - 1;
                        setTimeout(function () {
                            animateElement_1(index_1);
                        }, timeOutInterval_1);
                    }
                };
                animateElement_1(eleArray_1.length - 1);
            }
            else {
                _this.startHide();
                if (!_this.popupTemplate) {
                    var ele = selectAll('.' + SDLI, _this.popupEle);
                    ele.forEach(function (element) { element.classList.add(SDHIDDEN); });
                }
                _this.endHide();
            }
        });
    };
    SpeedDial.prototype.startHide = function () {
        this.element.setAttribute('aria-expanded', 'false');
        this.removeFocus();
        this.isMenuOpen = false;
    };
    SpeedDial.prototype.endHide = function () {
        this.fab.setProperties({ iconCss: this.openIconCss });
        this.popupEle.classList.add(SDHIDDEN);
        if (this.popupTemplate) {
            this.setVisibility(true);
        }
        this.toggleOverlay();
        if (this.popupTemplate) {
            this.popupEle.removeAttribute('tabindex');
        }
        this.trigger('onClose', { element: this.popupEle });
    };
    SpeedDial.prototype.showPopupEle = function (e) {
        var _this = this;
        if (!this.popupEle || this.isMenuOpen) {
            return;
        }
        var eventArgs = { element: this.popupEle, event: e, cancel: false };
        this.trigger('beforeOpen', eventArgs, function (args) {
            if (args.cancel) {
                return;
            }
            if (_this.animation.effect !== 'None') {
                var openAnimation_1 = {
                    name: (_this.animation.effect + 'In'),
                    timingFunction: 'easeIn'
                };
                var eleArray_2 = _this.popupTemplate ? [_this.popupEle.firstElementChild] : selectAll('.' + SDLI, _this.popupEle);
                var timeOutInterval_2 = _this.animation.duration / (eleArray_2.length + 1);
                openAnimation_1.duration = 2 * timeOutInterval_2;
                /* To keep the animation smooth, start the animation of the second element when animation first element is half completed */
                var animateElement_2 = function (curIndex) {
                    var ele = eleArray_2[parseInt(curIndex.toString(), 10)];
                    openAnimation_1.delay = (curIndex === 0) ? _this.animation.delay : 0;
                    openAnimation_1.begin = function () {
                        if (curIndex === 0) {
                            _this.startShow();
                        }
                        ele.classList.remove(SDHIDDEN);
                    };
                    openAnimation_1.end = function () { if (curIndex === eleArray_2.length - 1) {
                        _this.endShow();
                    } };
                    new Animation(openAnimation_1).animate(ele);
                    if (curIndex !== eleArray_2.length - 1) {
                        var index_2 = curIndex + 1;
                        setTimeout(function () {
                            animateElement_2(index_2);
                        }, timeOutInterval_2);
                    }
                };
                animateElement_2(0);
            }
            else {
                _this.startShow();
                if (!_this.popupTemplate) {
                    var ele = selectAll('.' + SDLI, _this.popupEle);
                    ele.forEach(function (element) { element.classList.remove(SDHIDDEN); });
                }
                _this.endShow();
            }
        });
    };
    SpeedDial.prototype.startShow = function () {
        this.element.setAttribute('aria-expanded', 'true');
        this.isMenuOpen = true;
        this.toggleOverlay();
        this.popupEle.classList.remove(SDHIDDEN);
        if (this.popupTemplate) {
            this.setVisibility(false);
        }
    };
    SpeedDial.prototype.endShow = function () {
        if (this.closeIconCss) {
            this.fab.setProperties({ iconCss: this.closeIconCss });
        }
        if (this.popupTemplate) {
            this.popupEle.setAttribute('tabindex', '1');
            this.popupEle.focus();
        }
        this.trigger('onOpen', { element: this.popupEle });
    };
    SpeedDial.prototype.toggleOverlay = function () {
        if (!this.overlayEle) {
            return;
        }
        this.overlayEle.classList[this.isMenuOpen ? 'remove' : 'add'](SDHIDDEN);
    };
    SpeedDial.prototype.removeOverlayEle = function () {
        if (!this.overlayEle) {
            return;
        }
        remove(this.overlayEle);
        this.overlayEle = undefined;
    };
    SpeedDial.prototype.updatePopupItems = function () {
        if (this.popupEle) {
            this.hidePopupEle();
            this.clearItems();
            this.createItems();
            this.updatePositionProperties();
        }
        else {
            this.createPopup();
        }
    };
    SpeedDial.prototype.handleResize = function (e) {
        if (!this.popupEle) {
            return;
        }
        this.hidePopupEle(e);
        this.clearOverflow();
        this.setPositionProps();
    };
    SpeedDial.prototype.triggerItemClick = function (e, item) {
        var target = e.target;
        target = target.classList.contains(SDLI) ? target : closest(target, '.' + SDLI);
        var eventArgs = { element: target, item: item, event: e };
        this.trigger('clicked', eventArgs);
        this.hidePopupEle(e);
    };
    /**
     * Opens the SpeedDial popup to display to display the speed dial items or the popupTemplate.
     *
     * @returns {void}
     */
    SpeedDial.prototype.show = function () {
        this.showPopupEle();
    };
    /**
     * Closes the SpeedDial popup.
     *
     *@returns {void}
     */
    SpeedDial.prototype.hide = function () {
        this.hidePopupEle();
    };
    /**
     * Refreshes the button position of speed dial. You can call this method to re-position button when the target is resized.
     *
     *@returns {void}
     */
    SpeedDial.prototype.refreshPosition = function () {
        this.fab.refreshPosition();
        this.resizeHandler();
    };
    SpeedDial.prototype.resizeHandler = function (e) {
        this.handleResize(e);
    };
    SpeedDial.prototype.clearItems = function () {
        var liList = selectAll('.' + SDLI, this.popupEle);
        liList.forEach(function (element) {
            remove(element);
        });
    };
    SpeedDial.prototype.unwireEvents = function () {
        EventHandler.remove(window, 'resize', this.resizeHandler);
        EventHandler.remove(document.body, 'click', this.bodyClickHandler);
        if (this.opensOnHover) {
            this.unwireFabHover();
        }
        else {
            this.unwireFabClick();
        }
    };
    SpeedDial.prototype.unwireFabClick = function () {
        EventHandler.remove(this.fab.element, 'click', this.fabClick);
    };
    SpeedDial.prototype.unwireFabHover = function () {
        this.popupEle.classList.remove(HOVERSD);
        EventHandler.remove(this.fab.element, 'mouseover', this.mouseOverHandle);
        EventHandler.remove(this.element, 'mouseleave', this.mouseLeaveHandle);
    };
    SpeedDial.prototype.unwirePopupEvents = function () {
        if (isRippleEnabled) {
            this.removeRippleEffect();
        }
        this.removeRippleEffect = null;
        this.keyboardModule.destroy();
        this.popupKeyboardModule.destroy();
        this.keyboardModule = null;
        this.popupKeyboardModule = null;
        EventHandler.remove(this.popupEle, 'click', this.popupClick);
        EventHandler.remove(this.popupEle, 'mouseleave', this.popupMouseLeaveHandle);
    };
    SpeedDial.prototype.destroy = function () {
        var _this = this;
        _super.prototype.destroy.call(this);
        this.unwireEvents();
        ['aria-expanded', 'aria-haspopup', 'aria-controls'].forEach(function (attr) {
            _this.element.removeAttribute(attr);
        });
        if (this.popupEle) {
            this.unwirePopupEvents();
            remove(this.popupEle);
            this.popupEle = undefined;
        }
        this.removeOverlayEle();
        this.fab.destroy();
        this.fab = undefined;
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param  {SpeedDialModel} newProp - Specifies new properties
     * @param  {SpeedDialModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    SpeedDial.prototype.onPropertyChanged = function (newProp, oldProp) {
        var fabProplist = ['content', 'cssClass', 'disabled', 'enablePersistence', 'enableRtl', 'iconPosition', 'position', 'target', 'template', 'title', 'visible', 'isPrimary'];
        var fabModel = extend({}, newProp);
        for (var _i = 0, _a = Object.keys(fabModel); _i < _a.length; _i++) {
            var prop = _a[_i];
            if ((fabProplist).indexOf(prop) < 0) {
                deleteObject(fabModel, prop);
            }
        }
        this.fab.setProperties(fabModel);
        for (var _b = 0, _c = Object.keys(newProp); _b < _c.length; _b++) {
            var prop = _c[_b];
            switch (prop) {
                case 'cssClass':
                    if (!this.popupEle) {
                        break;
                    }
                    if (oldProp.cssClass) {
                        removeClass(this.overlayEle ? [this.popupEle, this.overlayEle] : [this.popupEle], oldProp.cssClass.split(' '));
                    }
                    if (newProp.cssClass) {
                        addClass(this.overlayEle ? [this.popupEle, this.overlayEle] : [this.popupEle], newProp.cssClass.split(' '));
                    }
                    break;
                case 'visible':
                case 'disabled':
                    this.hide();
                    break;
                case 'enableRtl':
                    if (!this.popupEle) {
                        break;
                    }
                    this.setRTL();
                    break;
                case 'openIconCss':
                    if (!this.isMenuOpen) {
                        this.fab.setProperties({ iconCss: this.openIconCss });
                    }
                    break;
                case 'closeIconCss':
                    if (this.isMenuOpen) {
                        this.fab.setProperties({ iconCss: this.closeIconCss });
                    }
                    break;
                case 'position':
                    if (!this.popupEle) {
                        break;
                    }
                    this.updatePositionProperties();
                    break;
                case 'direction':
                    if (!this.popupEle || this.popupTemplate) {
                        break;
                    }
                    this.updatePositionProperties();
                    break;
                case 'popupTemplate':
                    this.updatePopupTemplate();
                    break;
                case 'target':
                    this.hidePopupEle();
                    this.checkTarget();
                    if (this.overlayEle) {
                        this.element.insertAdjacentElement('beforebegin', this.overlayEle);
                    }
                    if (!this.popupEle) {
                        break;
                    }
                    this.element.insertAdjacentElement('afterend', this.popupEle);
                    this.updatePositionProperties();
                    break;
                case 'items':
                case 'itemTemplate':
                    if (this.popupTemplate) {
                        break;
                    }
                    this.updatePopupItems();
                    break;
                case 'modal':
                    if (newProp.modal) {
                        this.createOverlay();
                    }
                    else {
                        this.removeOverlayEle();
                    }
                    break;
                case 'mode':
                    if (!this.popupEle || this.popupTemplate) {
                        break;
                    }
                    this.popupEle.classList.remove(RADIALSD, LINEARSD);
                    this.popupEle.classList.add((this.mode === 'Radial') ? RADIALSD : LINEARSD);
                    this.updatePositionProperties();
                    break;
                case 'radialSettings':
                    if (this.popupEle && (this.mode === 'Radial') && !this.popupTemplate) {
                        this.setRadialPosition();
                    }
                    break;
                case 'opensOnHover':
                    if (this.opensOnHover) {
                        this.unwireFabClick();
                        this.wireFabHover();
                    }
                    else {
                        this.unwireFabHover();
                        this.wireFabClick();
                    }
                    break;
            }
        }
    };
    __decorate$6([
        Complex({}, SpeedDialAnimationSettings)
    ], SpeedDial.prototype, "animation", void 0);
    __decorate$6([
        Property('')
    ], SpeedDial.prototype, "content", void 0);
    __decorate$6([
        Property('')
    ], SpeedDial.prototype, "closeIconCss", void 0);
    __decorate$6([
        Property('')
    ], SpeedDial.prototype, "cssClass", void 0);
    __decorate$6([
        Property('Auto')
    ], SpeedDial.prototype, "direction", void 0);
    __decorate$6([
        Property(false)
    ], SpeedDial.prototype, "disabled", void 0);
    __decorate$6([
        Property('Left')
    ], SpeedDial.prototype, "iconPosition", void 0);
    __decorate$6([
        Collection([], SpeedDialItem)
    ], SpeedDial.prototype, "items", void 0);
    __decorate$6([
        Property('')
    ], SpeedDial.prototype, "itemTemplate", void 0);
    __decorate$6([
        Property('Linear')
    ], SpeedDial.prototype, "mode", void 0);
    __decorate$6([
        Property('')
    ], SpeedDial.prototype, "openIconCss", void 0);
    __decorate$6([
        Property(false)
    ], SpeedDial.prototype, "opensOnHover", void 0);
    __decorate$6([
        Property('BottomRight')
    ], SpeedDial.prototype, "position", void 0);
    __decorate$6([
        Property(false)
    ], SpeedDial.prototype, "modal", void 0);
    __decorate$6([
        Property('')
    ], SpeedDial.prototype, "popupTemplate", void 0);
    __decorate$6([
        Complex({}, RadialSettings)
    ], SpeedDial.prototype, "radialSettings", void 0);
    __decorate$6([
        Property('')
    ], SpeedDial.prototype, "target", void 0);
    __decorate$6([
        Property(true)
    ], SpeedDial.prototype, "visible", void 0);
    __decorate$6([
        Property(true)
    ], SpeedDial.prototype, "isPrimary", void 0);
    __decorate$6([
        Event()
    ], SpeedDial.prototype, "beforeClose", void 0);
    __decorate$6([
        Event()
    ], SpeedDial.prototype, "beforeItemRender", void 0);
    __decorate$6([
        Event()
    ], SpeedDial.prototype, "beforeOpen", void 0);
    __decorate$6([
        Event()
    ], SpeedDial.prototype, "created", void 0);
    __decorate$6([
        Event()
    ], SpeedDial.prototype, "clicked", void 0);
    __decorate$6([
        Event()
    ], SpeedDial.prototype, "onClose", void 0);
    __decorate$6([
        Event()
    ], SpeedDial.prototype, "onOpen", void 0);
    SpeedDial = __decorate$6([
        NotifyPropertyChanges
    ], SpeedDial);
    return SpeedDial;
}(Component));

/**
 * SpeedDial modules
 */

/**
 * Button all modules
 */

export { wrapperInitialize, getTextNode, destroy, preRender, createCheckBox, rippleMouseHandler, setHiddenInput, IconPosition, buttonObserver, Button, CheckBox, RadioButton, Switch, classNames, ChipList, Chip, FabPosition, Fab, SpeedDialMode, LinearDirection, RadialDirection, SpeedDialAnimationEffect, SpeedDialAnimationSettings, RadialSettings, SpeedDialItem, SpeedDial };
//# sourceMappingURL=ej2-buttons.es5.js.map
