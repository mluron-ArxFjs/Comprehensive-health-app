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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Query Builder Source
 */
import { Component, NotifyPropertyChanges, getComponent, Browser, compile, append } from '@syncfusion/ej2-base';
import { Property, ChildProperty, Complex, L10n, closest, extend, isNullOrUndefined, Collection, cldrData } from '@syncfusion/ej2-base';
import { getInstance, addClass, removeClass, rippleEffect, detach, classList } from '@syncfusion/ej2-base';
import { Internationalization, getUniqueID, select } from '@syncfusion/ej2-base';
import { Button, RadioButton } from '@syncfusion/ej2-buttons';
import { DropDownList, CheckBoxSelection, DropDownTree } from '@syncfusion/ej2-dropdowns';
import { MultiSelect } from '@syncfusion/ej2-dropdowns';
import { Event, EventHandler, getValue, Animation } from '@syncfusion/ej2-base';
import { Query, Predicate, DataManager, Deferred } from '@syncfusion/ej2-data';
import { TextBox, NumericTextBox } from '@syncfusion/ej2-inputs';
import { DatePicker } from '@syncfusion/ej2-calendars';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
import { Tooltip, createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
import { compile as templateCompiler } from '@syncfusion/ej2-base';
/**
 * Defines the Columns of Query Builder
 */
var Columns = /** @class */ (function (_super) {
    __extends(Columns, _super);
    function Columns() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], Columns.prototype, "field", void 0);
    __decorate([
        Property(null)
    ], Columns.prototype, "label", void 0);
    __decorate([
        Property(null)
    ], Columns.prototype, "type", void 0);
    __decorate([
        Property(null)
    ], Columns.prototype, "values", void 0);
    __decorate([
        Property(null)
    ], Columns.prototype, "operators", void 0);
    __decorate([
        Property()
    ], Columns.prototype, "ruleTemplate", void 0);
    __decorate([
        Property(null)
    ], Columns.prototype, "template", void 0);
    __decorate([
        Property({ isRequired: true, min: 0, max: Number.MAX_VALUE })
    ], Columns.prototype, "validation", void 0);
    __decorate([
        Property(null)
    ], Columns.prototype, "format", void 0);
    __decorate([
        Property(null)
    ], Columns.prototype, "step", void 0);
    __decorate([
        Property(null)
    ], Columns.prototype, "value", void 0);
    __decorate([
        Property(null)
    ], Columns.prototype, "category", void 0);
    __decorate([
        Property(null)
    ], Columns.prototype, "columns", void 0);
    return Columns;
}(ChildProperty));
export { Columns };
/**
 * Defines the rule of Query Builder
 */
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], Rule.prototype, "condition", void 0);
    __decorate([
        Collection([], Rule)
    ], Rule.prototype, "rules", void 0);
    __decorate([
        Property(null)
    ], Rule.prototype, "field", void 0);
    __decorate([
        Property(null)
    ], Rule.prototype, "label", void 0);
    __decorate([
        Property(null)
    ], Rule.prototype, "type", void 0);
    __decorate([
        Property(null)
    ], Rule.prototype, "operator", void 0);
    __decorate([
        Property(null)
    ], Rule.prototype, "value", void 0);
    __decorate([
        Property(false)
    ], Rule.prototype, "not", void 0);
    return Rule;
}(ChildProperty));
export { Rule };
/**
 * Defines the property for value.
 */
var Value = /** @class */ (function (_super) {
    __extends(Value, _super);
    function Value() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], Value.prototype, "numericTextBoxModel", void 0);
    __decorate([
        Property(null)
    ], Value.prototype, "multiSelectModel", void 0);
    __decorate([
        Property(null)
    ], Value.prototype, "datePickerModel", void 0);
    __decorate([
        Property(null)
    ], Value.prototype, "textBoxModel", void 0);
    __decorate([
        Property(null)
    ], Value.prototype, "radioButtonModel", void 0);
    return Value;
}(ChildProperty));
export { Value };
/**
 * Defines the ruleDelete, groupInsert, and groupDelete options of Query Builder.
 */
var ShowButtons = /** @class */ (function (_super) {
    __extends(ShowButtons, _super);
    function ShowButtons() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(true)
    ], ShowButtons.prototype, "ruleDelete", void 0);
    __decorate([
        Property(true)
    ], ShowButtons.prototype, "groupInsert", void 0);
    __decorate([
        Property(true)
    ], ShowButtons.prototype, "groupDelete", void 0);
    return ShowButtons;
}(ChildProperty));
export { ShowButtons };
var QueryBuilder = /** @class */ (function (_super) {
    __extends(QueryBuilder, _super);
    function QueryBuilder(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.isReadonly = true;
        _this.fields = { text: 'label', value: 'field' };
        _this.updatedRule = { not: false, condition: 'and' };
        _this.isLocale = false;
        _this.isRefreshed = false;
        _this.isNotified = false;
        _this.isAddSuccess = false;
        _this.isNotValueChange = false;
        _this.isFieldChange = false;
        _this.isFieldClose = false;
        _this.isDestroy = false;
        _this.isGetNestedData = false;
        _this.isCustomOprCols = [];
        MultiSelect.Inject(CheckBoxSelection);
        return _this;
    }
    QueryBuilder.prototype.getPersistData = function () {
        return this.addOnPersist(['rule']);
    };
    /**
     * Clears the rules without root rule.
     *
     * @returns {void}.
     */
    QueryBuilder.prototype.reset = function () {
        this.isImportRules = false;
        var bodyElem = this.element.querySelector('.e-group-body');
        var inputElement = this.element.querySelectorAll('input.e-control');
        for (var i = 0, len = inputElement.length; i < len; i++) {
            if (inputElement[i].className.indexOf('e-tooltip') > -1) {
                getComponent(inputElement[i], 'tooltip').destroy();
            }
            else if (inputElement[i].parentElement.className.indexOf('e-tooltip') > -1) {
                getComponent(inputElement[i].parentElement, 'tooltip').destroy();
            }
        }
        if (bodyElem) {
            bodyElem.innerHTML = '';
        }
        else {
            var grpContainer = this.createElement('div', { attrs: { class: 'e-group-container' } });
            var grpHeader = this.createElement('div', { attrs: { class: 'e-group-header' } });
            var grpBody = this.createElement('div', { attrs: { class: 'e-group-body' } });
            grpContainer.appendChild(grpHeader).appendChild(grpBody);
            this.element.appendChild(grpContainer);
            bodyElem = this.element.querySelector('.e-group-body');
        }
        if (this.headerTemplate && this.isRoot) {
            this.element.innerHTML = '';
            this.isRoot = false;
        }
        if (this.enableNotCondition) {
            removeClass(this.element.querySelectorAll('.e-qb-toggle'), 'e-active-toggle');
        }
        bodyElem.appendChild(this.createElement('div', { attrs: { class: 'e-rule-list' } }));
        this.levelColl[this.element.id + '_group0'] = [0];
        this.rule = { condition: 'and', not: false, rules: [] };
        this.disableRuleCondition(bodyElem.parentElement);
    };
    QueryBuilder.prototype.getWrapper = function () {
        return this.element;
    };
    QueryBuilder.prototype.getModuleName = function () {
        return 'query-builder';
    };
    QueryBuilder.prototype.GetRootColumnName = function (field) {
        return this.separator ? field.split(this.separator)[0] : field;
    };
    QueryBuilder.prototype.initialize = function () {
        if (this.dataColl.length) {
            var columnKeys = Object.keys(this.dataColl[0]);
            var cols = [];
            var categories = [];
            var type = void 0;
            var groupBy = false;
            var isDate = false;
            var value = void 0;
            var validateObj = { isRequired: true, min: 0, max: Number.MAX_VALUE };
            if (this.columns.length) {
                this.columnSort();
                var columns = this.columns;
                for (var i = 0, len = columns.length; i < len; i++) {
                    this.updateCustomOperator(columns[i], "initial");
                    if (!columns[i].type) {
                        if (columnKeys.indexOf(columns[i].field) > -1) {
                            value = this.dataColl[0][columns[i].field];
                            type = typeof value;
                            if (type === 'string') {
                                isDate = !isNaN(Date.parse(value));
                            }
                            else if (type === 'object') {
                                isDate = value instanceof Date && !isNaN(value.getTime());
                                type = 'string';
                            }
                            columns[i].type = type;
                            isDate = false;
                        }
                        type = 'string';
                    }
                    if (!columns[i].validation) {
                        columns[i].validation = validateObj;
                    }
                    if (columns[i].category) {
                        groupBy = true;
                    }
                    else {
                        columns[i].category = this.l10n.getConstant('OtherFields');
                    }
                    if (categories.indexOf(columns[i].category) < 0) {
                        categories.push(columns[i].category);
                    }
                    if (!columns[i].operators || (this.isLocale && this.isCustomOprCols.indexOf(columns[i].field) !== 0)) {
                        columns[i].operators = this.customOperators[columns[i].type + 'Operator'];
                    }
                }
                if (groupBy && (categories.length > 1 || categories[0] !== this.l10n.getConstant('OtherFields'))) {
                    this.fields = { text: 'label', value: 'field', groupBy: 'category' };
                }
                this.updateSubFieldsFromColumns(this.columns);
            }
            else {
                for (var i = 0, len = columnKeys.length; i < len; i++) {
                    value = this.dataColl[0][columnKeys[i]];
                    type = typeof value;
                    if (type === 'string') {
                        isDate = !isNaN(Date.parse(value));
                    }
                    else if (type === 'object' && !Object.keys(value).length) {
                        isDate = value instanceof Date && !isNaN(value.getTime());
                        type = 'string';
                    }
                    cols[i] = { 'field': columnKeys[i], 'label': columnKeys[i], 'type': isDate ? 'date' : type,
                        'validation': validateObj };
                    isDate = false;
                    cols[i].operators = this.customOperators[cols[i].type + 'Operator'];
                    if (type === 'object') {
                        this.updateSubFields(value, cols[i]);
                    }
                }
                this.columns = cols;
            }
        }
        else if (this.columns.length) {
            var columns = this.columns;
            for (var i = 0, len = columns.length; i < len; i++) {
                if (columns[i].category) {
                    this.fields = { text: 'label', value: 'field', groupBy: 'category' };
                }
                else {
                    columns[i].category = this.l10n.getConstant('OtherFields');
                }
                this.updateCustomOperator(columns[i]);
                if (!columns[i].operators || this.isLocale) {
                    columns[i].operators = this.customOperators[columns[i].type + 'Operator'];
                }
            }
            this.updateSubFieldsFromColumns(this.columns);
        }
        this.trigger('dataBound', { type: 'dataBound' });
    };
    QueryBuilder.prototype.updateSubFieldsFromColumns = function (col, field) {
        for (var i = 0; i < col.length; i++) {
            if (this.separator !== '' && col[i].field.indexOf(this.separator) < 0) {
                col[i].field = field ? field + this.separator + col[i].field : col[i].field;
            }
            if (col[i].operators) {
                this.updateCustomOperator(col[i]);
            }
            else if (col[i].type && col[i].type !== 'object') {
                col[i].operators = this.customOperators[col[i].type + 'Operator'];
            }
            if (col[i].columns) {
                col[i].type = 'object';
                this.updateSubFieldsFromColumns(col[i].columns, col[i].field);
            }
        }
    };
    QueryBuilder.prototype.updateSubFields = function (value, col, data) {
        var sampCol;
        col.columns = [];
        var columnKeys = Object.keys(value);
        var field;
        var label;
        var type;
        var result;
        data = data ? data : this.dataColl[0];
        for (var i = 0, len = columnKeys.length; i < len; i++) {
            var compField = col.field.split('.');
            if (data) {
                result = data[compField[compField.length - 1]][columnKeys[i]];
            }
            else {
                result = this.dataColl[0][col.field][columnKeys[i]];
            }
            var resData = data[col.field.split(this.separator)[col.field.split(this.separator).length - 1]];
            type = typeof result;
            field = col.field + this.separator + columnKeys[i];
            label = columnKeys[i];
            type = (type === 'object' && !isNaN(Date.parse(result))) ? 'date' : type;
            sampCol = { field: field, label: label, type: type };
            if (type !== 'object') {
                sampCol.operators = this.customOperators[type + 'Operator'];
            }
            col.columns.push(sampCol);
            if (type === 'object') {
                this.updateSubFields(result, sampCol, resData);
            }
        }
    };
    QueryBuilder.prototype.updateCustomOperator = function (column, from) {
        if (column.operators) {
            if (!this.isLocale && from === "initial" && !isNullOrUndefined(this.isCustomOprCols)) {
                this.isCustomOprCols.push(column.field);
            }
            var _loop_1 = function (j) {
                var sqlIdx = Object.keys(column.operators[j]).indexOf('sqlOperator');
                if (sqlIdx > -1) {
                    var operator_1 = column.operators[j];
                    var operColl = Object.keys(operator_1);
                    var values = operColl.map(function (key) { return operator_1["" + key]; }).join(',').split(',');
                    var valueIdx = operColl.indexOf('value');
                    this_1.operators[values[valueIdx]] = values[sqlIdx];
                }
            };
            var this_1 = this;
            for (var j = 0; j < column.operators.length; j++) {
                _loop_1(j);
            }
        }
    };
    QueryBuilder.prototype.focusEventHandler = function (event) {
        this.target = event.target;
    };
    QueryBuilder.prototype.clickEventHandler = function (event) {
        var _this = this;
        var target = event.target;
        var args;
        this.isImportRules = false;
        var groupID;
        if (target.tagName === 'SPAN') {
            target = target.parentElement;
        }
        if (target.className.indexOf('e-collapse-rule') > -1) {
            var animation = new Animation({ duration: 1000, delay: 0 });
            if (this.element.querySelectorAll('.e-summary-content').length < 1) {
                this.renderSummary();
            }
            var summaryElem = document.getElementById(this.element.id + '_summary_content');
            var txtareaElem = summaryElem.querySelector('.e-summary-text');
            animation.animate('.e-query-builder', { name: 'SlideLeftIn' });
            var groupElem = this.element.querySelector('.e-group-container');
            groupElem.style.display = 'none';
            txtareaElem.textContent = this.getSqlFromRules(this.rule);
            summaryElem.style.display = 'block';
            txtareaElem.style.height = txtareaElem.scrollHeight + 'px';
        }
        if (target.tagName === 'BUTTON' && target.className.indexOf('e-qb-toggle') < 0) {
            if (target.className.indexOf('e-removerule') > -1) {
                this.actionButton = target;
                this.deleteRule(target);
            }
            else if (target.className.indexOf('e-deletegroup') > -1) {
                this.actionButton = target;
                this.deleteGroup(closest(target, '.e-group-container'));
            }
            else if (target.className.indexOf('e-edit-rule') > -1) {
                var animation = new Animation({ duration: 1000, delay: 0 });
                animation.animate('.e-query-builder', { name: 'SlideLeftIn' });
                document.getElementById(this.element.id + '_summary_content').style.display = 'none';
                if (this.element.querySelectorAll('.e-group-container').length < 1) {
                    this.addGroupElement(false, this.element, this.rule.condition, false, this.rule.not);
                    var mRules = extend({}, this.rule, {}, true);
                    this.setGroupRules(mRules);
                    this.renderSummaryCollapse();
                }
                else {
                    var groupElem = this.element.querySelector('.e-group-container');
                    if (groupElem.querySelectorAll('.e-collapse-rule').length < 1) {
                        this.renderSummaryCollapse();
                    }
                    groupElem.style.display = 'block';
                }
            }
        }
        else if ((target.tagName === 'LABEL' && target.parentElement.className.indexOf('e-btn-group') > -1) ||
            target.className.indexOf('e-qb-toggle') > -1) {
            var element = closest(target, '.e-group-container');
            if (!this.headerTemplate) {
                var forIdValue = target.getAttribute('for');
                var targetValue = void 0;
                if (forIdValue) {
                    targetValue = document.getElementById(forIdValue).getAttribute('value');
                }
                groupID = element.id.replace(this.element.id + '_', '');
                var group = this.getGroup(groupID);
                var ariaChecked = void 0;
                if (this.enableNotCondition) {
                    if (target.className.indexOf('e-qb-toggle') > -1) {
                        var toggleElem = element.getElementsByClassName('e-qb-toggle')[0];
                        if (toggleElem.className.indexOf('e-active-toggle') > -1) {
                            removeClass([toggleElem], 'e-active-toggle');
                            ariaChecked = false;
                        }
                        else {
                            addClass([toggleElem], 'e-active-toggle');
                            ariaChecked = true;
                        }
                        targetValue = group.condition;
                    }
                    else {
                        ariaChecked = group.not;
                    }
                }
                args = { groupID: groupID, cancel: false, type: 'condition', value: targetValue.toLowerCase() };
                if (this.enableNotCondition) {
                    args = { groupID: groupID, cancel: false, type: 'condition', value: targetValue.toLowerCase(),
                        'not': ariaChecked };
                }
            }
            if (!this.isImportRules) {
                this.trigger('beforeChange', args, function (observedChangeArgs) {
                    _this.beforeSuccessCallBack(observedChangeArgs, target);
                });
            }
            else {
                this.beforeSuccessCallBack(args, target);
            }
            this.target = target;
        }
    };
    QueryBuilder.prototype.beforeSuccessCallBack = function (args, target) {
        if (!args.cancel) {
            var element = closest(target, '.e-group-container');
            var groupID = element.id.replace(this.element.id + '_', '');
            var beforeRules = this.getValidRules(this.rule);
            var rule = this.getParentGroup(element);
            rule.condition = args.value;
            if (this.enableNotCondition) {
                rule.not = args.not;
            }
            if (!this.isImportRules) {
                this.trigger('change', { groupID: groupID, type: 'condition', value: rule.condition });
            }
            this.filterRules(beforeRules, this.getValidRules(this.rule), 'condition');
        }
    };
    QueryBuilder.prototype.selectBtn = function (target, event) {
        if (event.name === 'beforeOpen') {
            if (this.showButtons.groupInsert || isNullOrUndefined(this.showButtons.groupInsert)) {
                if (this.element.querySelectorAll('.e-group-container').length >= this.maxGroupCount + 1) {
                    addClass([event.element.querySelector('li span.e-addgroup').parentElement], 'e-button-hide');
                }
                else {
                    removeClass([event.element.querySelector('li span.e-addgroup').parentElement], 'e-button-hide');
                }
                if (this.enableRtl) {
                    addClass([event.element.querySelector('li').parentElement], 'e-rtl');
                }
            }
            else {
                addClass([event.element.querySelector('li span.e-addgroup').parentElement], 'e-button-hide');
            }
        }
        else if (event.element.children[0].className.indexOf('e-addrule') > -1) {
            this.addRuleElement(closest(target, '.e-group-container'), {});
        }
        else if (event.element.children[0].className.indexOf('e-addgroup') > -1) {
            this.addGroupElement(true, closest(target, '.e-group-container'), '', true);
        }
    };
    QueryBuilder.prototype.appendRuleElem = function (target, column, type, parentId, action, rule) {
        var ruleElem;
        var elem;
        var ruleListElem = target.querySelector('.e-rule-list');
        var args;
        if (type === 'change') {
            ruleElem = select('#' + parentId, target);
        }
        else {
            ruleElem = this.createElement('div', { attrs: { class: 'e-rule-container' } });
            ruleElem.setAttribute('id', target.id + '_rule' + this.ruleIdCounter);
            ruleListElem.appendChild(ruleElem);
            this.ruleIdCounter++;
        }
        if (column && column.ruleTemplate && rule) {
            args = { requestType: 'template-initialize', ruleID: ruleElem.id, action: action, fields: this.fields, rule: rule };
            this.trigger('actionBegin', args);
            this.ruleTemplateFn = this.templateParser(column.ruleTemplate);
            var templateID = this.element.id + column.field;
            var template = void 0;
            args.fields = this.fields;
            args.columns = this.columns;
            if (rule.field === '') {
                rule.field = column.field;
            }
            args.operators = this.getOperators(rule.field);
            args.operatorFields = { text: 'key', value: 'value' };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (this.isReact) {
                template = this.ruleTemplateFn(args, this, ruleElem.id, templateID)[0];
                elem = template;
                elem.className += ' e-rule-field';
                ruleElem.appendChild(elem);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }
            else if (this.isAngular) {
                var templateColl = this.ruleTemplateFn(args, this, ruleElem.id, templateID);
                template = (templateColl[0].nodeType === 3) ? templateColl[1] : templateColl[0];
                elem = template;
                elem.className += ' e-rule-field';
                ruleElem.appendChild(elem);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }
            else if (this.isVue3) {
                template = this.ruleTemplateFn(args, this, 'Template', templateID);
                elem = template;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                append(elem, ruleElem);
                ruleElem.children[ruleElem.children.length - 1].className += ' e-rule-field';
            }
            else {
                template = this.ruleTemplateFn(args, this, 'Template', templateID)[0];
                elem = template;
                elem.className += ' e-rule-field';
                ruleElem.appendChild(elem);
            }
        }
        else {
            elem = this.ruleElem.querySelector('.e-rule-field').cloneNode(true);
            ruleElem.appendChild(elem);
        }
        if (column && column.ruleTemplate && rule) {
            this.renderReactTemplates();
        }
        return ruleElem;
    };
    QueryBuilder.prototype.addRuleElement = function (target, rule, column, action, parentId, isRuleTemplate) {
        var _this = this;
        if (!target) {
            return;
        }
        var args = { groupID: target.id.replace(this.element.id + '_', ''), cancel: false, type: 'insertRule' };
        if (!this.isImportRules && !this.isInitialLoad) {
            this.trigger('beforeChange', args, function (observedChangeArgs) {
                _this.addRuleSuccessCallBack(observedChangeArgs, target, rule, column, action, parentId, isRuleTemplate);
            });
        }
        else {
            this.isInitialLoad = false;
            this.addRuleSuccessCallBack(args, target, rule, column, action, parentId, isRuleTemplate);
        }
    };
    QueryBuilder.prototype.addRuleSuccessCallBack = function (args, trgt, rule, col, act, pId, isRlTmp) {
        var height = (this.element.className.indexOf('e-device') > -1) ? '250px' : '200px';
        var ruleID;
        var column = (rule && rule.field) ? this.getColumn(rule.field) : col ? col : this.columns[0];
        var operators;
        var dropDownList;
        var ruleElem;
        var newRule = { 'label': '', 'field': '', 'type': '', 'operator': '' };
        if (!args.cancel) {
            if (column && column.ruleTemplate && rule.field) {
                this.selectedColumn = column;
                operators = this.selectedColumn.operators;
                newRule = { 'label': column.label, 'field': column.field, 'type': column.type, 'operator': operators[0].value };
                var passedRule = Object.keys(rule).length ? rule : newRule;
                ruleElem = this.appendRuleElem(trgt, column, act, pId, 'field', passedRule);
                var args_1 = { requestType: 'template-create', action: 'insert-rule', ruleID: ruleElem.id,
                    fields: this.fields, rule: passedRule };
                this.trigger('actionBegin', args_1);
            }
            else {
                ruleElem = this.appendRuleElem(trgt, column, act, pId, 'field');
                ruleElem.querySelector('.e-filter-input').setAttribute('id', ruleElem.id + '_filterkey');
                var element = ruleElem.querySelector('button');
                if (this.element.className.indexOf('e-device') > -1 || this.displayMode === 'Vertical') {
                    element.textContent = this.l10n.getConstant('Remove');
                    addClass([element], 'e-flat');
                    addClass([element], 'e-primary');
                }
                else {
                    addClass([element], 'e-round');
                    addClass([element], 'e-icon-btn');
                    element.setAttribute('title', this.l10n.getConstant('DeleteRule'));
                    element = this.createElement('span', { attrs: { class: 'e-btn-icon e-icons e-delete-icon' } });
                    ruleElem.querySelector('button').appendChild(element);
                }
            }
            if (this.displayMode === 'Vertical' || this.element.className.indexOf('e-device') > -1) {
                ruleElem.className = 'e-rule-container e-vertical-mode';
            }
            else {
                ruleElem.className = 'e-rule-container e-horizontal-mode';
            }
            if (ruleElem.previousElementSibling && ruleElem.previousElementSibling.className.indexOf('e-rule-container') > -1) {
                if (ruleElem.className.indexOf('e-joined-rule') < 0) {
                    ruleElem.className += ' e-joined-rule';
                }
                if (ruleElem.previousElementSibling.className.indexOf('e-prev-joined-rule') < 0) {
                    ruleElem.previousElementSibling.className += ' e-prev-joined-rule';
                }
            }
            if (ruleElem.previousElementSibling && ruleElem.previousElementSibling.className.indexOf('e-group-container') > -1 &&
                ruleElem.className.indexOf('e-separate-rule') < 0) {
                ruleElem.className += ' e-separate-rule';
            }
            if (!this.isImportRules) {
                this.updateAddedRule(trgt, rule, newRule, isRlTmp, pId);
            }
            if (!column || (column && !column.ruleTemplate) || !rule.field) {
                if (this.fieldMode === 'Default') {
                    var ddlField = void 0;
                    var ddlValue = void 0;
                    if (this.separator && rule.field) {
                        ddlValue = this.GetRootColumnName(rule.field);
                    }
                    else {
                        ddlValue = this.isImportRules ? this.GetRootColumnName(rule.field) : rule.field;
                    }
                    ddlField = {
                        dataSource: this.columns,
                        fields: this.fields, placeholder: this.l10n.getConstant('SelectField'),
                        popupHeight: ((this.columns.length > 5) ? height : 'auto'), close: this.fieldClose.bind(this, ruleElem.id + '_filterkey'),
                        change: this.changeField.bind(this), value: rule ? ddlValue : null, open: this.popupOpen.bind(this, true)
                    };
                    if (this.fieldModel) {
                        ddlField = __assign({}, ddlField, this.fieldModel);
                    }
                    dropDownList = new DropDownList(ddlField);
                    dropDownList.appendTo('#' + ruleElem.id + '_filterkey');
                    var ddlVal = void 0;
                    if (this.separator && rule.field) {
                        ddlVal = this.GetRootColumnName(rule.field);
                    }
                    else {
                        ddlVal = this.isImportRules ? this.GetRootColumnName(rule.field) : dropDownList.value;
                    }
                    this.selectedColumn = dropDownList.getDataByValue(ddlVal);
                    if (Object.keys(rule).length) {
                        this.changeRule(rule, {
                            element: dropDownList.element, itemData: this.selectedColumn
                        });
                    }
                }
                else {
                    var ddlField = void 0;
                    var ddlValue = this.isImportRules ? rule.field : rule.field;
                    ddlField = {
                        fields: { dataSource: this.columns,
                            value: 'field', text: 'label', child: 'columns', expanded: 'expanded' },
                        placeholder: this.l10n.getConstant('SelectField'), showClearButton: false,
                        popupHeight: ((this.columns.length > 5) ? height : 'auto'), changeOnBlur: false,
                        change: this.changeField.bind(this), value: !isNullOrUndefined(ddlValue) ? [ddlValue] : null,
                        open: this.popupOpen.bind(this, false), treeSettings: { expandOn: 'Click' }, select: this.onSelectField
                    };
                    if (this.fieldModel) {
                        ddlField = __assign({}, ddlField, this.fieldModel);
                    }
                    var dropdowntree = new DropDownTree(ddlField);
                    dropdowntree.appendTo('#' + ruleElem.id + '_filterkey');
                    if (!isNullOrUndefined(dropdowntree.value)) {
                        var value = this.getLabelFromColumn(dropdowntree.value[0]);
                        dropdowntree.element.value = value;
                    }
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    var ddlVal = !isNullOrUndefined(rule.field) ?
                        this.GetRootColumnName(rule.field) : dropdowntree.value;
                    this.selectedColumn = this.getColumn(ddlVal);
                    if (Object.keys(rule).length) {
                        this.changeRule(rule, {
                            element: dropdowntree.element, itemData: this.selectedColumn
                        });
                    }
                }
            }
            ruleID = ruleElem.id.replace(this.element.id + '_', '');
            if (!this.isImportRules) {
                this.trigger('change', { groupID: trgt.id.replace(this.element.id + '_', ''), ruleID: ruleID, type: 'insertRule' });
            }
        }
    };
    QueryBuilder.prototype.updateAddedRule = function (target, rule, newRule, isRuleTemplate, pId) {
        var ruleElem;
        var index = 0;
        var groupElem;
        var rules;
        if (isRuleTemplate) {
            ruleElem = select('#' + pId, target);
            groupElem = closest(target, '.e-group-container');
            rules = this.getParentGroup(groupElem);
            while (ruleElem && ruleElem.previousElementSibling !== null) {
                ruleElem = ruleElem.previousElementSibling;
                index++;
            }
            rules.rules[index] = rule;
        }
        else {
            groupElem = closest(target, '.e-group-container');
            rules = this.getParentGroup(groupElem);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var custom = rule.custom;
            if (Object.keys(rule).length) {
                rules.rules.push({
                    'field': rule.field, 'type': rule.type, 'label': rule.label, 'operator': rule.operator, value: rule.value
                });
                if (custom) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    rules.rules[rules.rules.length - 1].custom = custom;
                }
            }
            else {
                if (custom) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    newRule.custom = custom;
                }
                rules.rules.push(newRule);
            }
        }
        this.disableRuleCondition(target, rules);
    };
    QueryBuilder.prototype.changeRuleTemplate = function (column, element) {
        var operVal = this.selectedColumn.operators;
        if (column.ruleTemplate) {
            return;
        }
        else {
            var parentGroup = closest(element, '.e-group-container');
            var parentId = closest(element, '.e-rule-container').id;
            if (this.previousColumn && this.previousColumn.ruleTemplate) {
                detach(element.closest('[id="' + parentId + '"]').querySelector('.e-rule-field'));
                this.clearQBTemplate([parentId]);
            }
            if (column) {
                var rule = { field: column.field, label: column.label, operator: operVal[0].value, value: '' };
                this.addRuleElement(parentGroup, rule, column, 'change', parentId, true);
            }
        }
    };
    QueryBuilder.prototype.renderToolTip = function (element) {
        var tooltip = new Tooltip({ content: this.l10n.getConstant('ValidationMessage'),
            position: 'BottomCenter', cssClass: 'e-querybuilder-error' });
        tooltip.appendTo(element);
        tooltip.open(element);
    };
    /**
     * Validate the conditions and it display errors for invalid fields.
     *
     * @returns {boolean} - Validation
     */
    QueryBuilder.prototype.validateFields = function () {
        var isValid = true;
        var dropDownTreeObj;
        if (this.allowValidation) {
            var excludeOprs = ['isnull', 'isnotnull', 'isempty', 'isnotempty'];
            var i = void 0;
            var len = void 0;
            var fieldElem = void 0;
            var indexElem = void 0;
            var valArray = [];
            var groupElem = void 0;
            var index = void 0;
            var dropDownObj = void 0;
            var tempElem = void 0;
            var rule = void 0;
            var ruleElemCln = this.element.querySelectorAll('.e-rule-container');
            for (i = 0, len = ruleElemCln.length; i < len; i++) {
                var validateRule = void 0;
                groupElem = closest(ruleElemCln[i], '.e-group-container');
                rule = this.getParentGroup(groupElem);
                index = 0;
                indexElem = tempElem = ruleElemCln[i];
                if (this.fieldMode === 'DropdownTree') {
                    dropDownTreeObj = getComponent(ruleElemCln[i].querySelector('.e-rule-filter input.e-dropdowntree'), 'dropdowntree');
                    if (dropDownTreeObj && dropDownTreeObj.value && dropDownTreeObj.value.length) {
                        this.selectedColumn = this.getColumn(dropDownTreeObj.value[0]);
                        validateRule = this.selectedColumn.validation;
                    }
                }
                else {
                    dropDownObj = getComponent(ruleElemCln[i].querySelector('.e-rule-filter input.e-dropdownlist'), 'dropdownlist');
                    if (dropDownObj && dropDownObj.value) {
                        this.selectedColumn = dropDownObj.getDataByValue(dropDownObj.value);
                        validateRule = !isNullOrUndefined(dropDownObj.index) && this.selectedColumn.validation;
                    }
                }
                fieldElem = tempElem.querySelector('.e-rule-field input.e-control');
                if (validateRule && validateRule.isRequired) {
                    while (indexElem && indexElem.previousElementSibling !== null) {
                        indexElem = indexElem.previousElementSibling;
                        index++;
                    }
                    fieldElem = tempElem.querySelector('.e-rule-operator .e-control');
                    if (!rule.rules[index].operator) {
                        if (fieldElem.parentElement.className.indexOf('e-tooltip') < 0) {
                            this.renderToolTip(fieldElem.parentElement);
                        }
                        isValid = false;
                    }
                    if (rule.rules[index].value instanceof Array) {
                        valArray = rule.rules[index].value;
                    }
                    if (excludeOprs.indexOf(rule.rules[index].operator) < 0 &&
                        (isNullOrUndefined(rule.rules[index].value) &&
                            rule.rules[index].type !== 'date') || rule.rules[index].value === '' ||
                        (rule.rules[index].value instanceof Array && valArray.length < 1)) {
                        var valElem = tempElem.querySelectorAll('.e-rule-value .e-control');
                        isValid = false;
                        for (var j = 0, jLen = valElem.length; j < jLen; j++) {
                            var element = valElem[j];
                            var elem = void 0;
                            if (element.parentElement.className.indexOf('e-searcher') > -1) {
                                elem = closest(element, '.e-multi-select-wrapper');
                                if (elem.className.indexOf('e-tooltip') < 0) {
                                    this.renderToolTip(elem);
                                }
                            }
                            else if (valElem[j].parentElement.className.indexOf('e-tooltip') < 0 && valElem[j].className.indexOf('e-tooltip') < 0) {
                                this.renderToolTip(valElem[j].parentElement);
                            }
                            j++;
                        }
                    }
                }
                else if ((dropDownObj && dropDownObj.element && isNullOrUndefined(dropDownObj.index)) ||
                    (dropDownTreeObj && dropDownTreeObj.element && (isNullOrUndefined(dropDownTreeObj.value) ||
                        dropDownTreeObj.value.length < 1))) {
                    if (fieldElem.parentElement.className.indexOf('e-tooltip') < 0) {
                        this.renderToolTip(fieldElem.parentElement);
                    }
                    isValid = false;
                }
            }
        }
        return isValid;
    };
    QueryBuilder.prototype.refreshLevelColl = function () {
        this.levelColl = {};
        var groupElem = this.element.querySelector('.e-group-container');
        if (groupElem) {
            this.levelColl[groupElem.id] = [0];
            var obj = { groupElement: groupElem, level: [0] };
            this.refreshLevel(obj);
        }
    };
    QueryBuilder.prototype.refreshLevel = function (obj) {
        var ruleList = obj.groupElement.querySelector('.e-rule-list').children;
        var childElem;
        var groupElem = obj.groupElement;
        var i;
        var iLen = ruleList.length;
        var groupCount = 0;
        for (i = 0; i < iLen; i++) {
            childElem = ruleList[i];
            if (childElem.className.indexOf('e-group-container') > -1) {
                obj.level.push(groupCount);
                this.levelColl[childElem.id] = obj.level.slice();
                groupCount++;
                obj.groupElement = childElem;
                obj = this.refreshLevel(obj);
            }
        }
        var ruleListElem = closest(groupElem, '.e-rule-list');
        obj.groupElement = ruleListElem ? closest(ruleListElem, '.e-group-container') : groupElem;
        obj.level = this.levelColl[obj.groupElement.id].slice();
        return obj;
    };
    QueryBuilder.prototype.groupTemplate = function () {
        var glueElem;
        var inputElem;
        var labelElem;
        var grpActElem;
        var groupBtn;
        var groupElem = this.createElement('div', { attrs: { class: 'e-group-container' } });
        var groupHdrElem = this.createElement('div', { attrs: { class: 'e-group-header' } });
        var grpBodyElem = this.createElement('div', { attrs: { class: 'e-group-body' } });
        var rulesElem = this.createElement('div', { attrs: { class: 'e-rule-list' } });
        groupElem.appendChild(groupHdrElem);
        grpBodyElem.appendChild(rulesElem);
        groupElem.appendChild(grpBodyElem);
        // create button group in OR and AND process
        if (!this.headerTemplate) {
            glueElem = this.createElement('div', { attrs: { class: 'e-lib e-btn-group', role: 'group' } });
            if (this.enableNotCondition) {
                inputElem = this.createElement('button', { attrs: { type: 'button', class: 'e-qb-toggle' } });
                glueElem.appendChild(inputElem);
            }
            inputElem = this.createElement('input', { attrs: { type: 'radio', class: 'e-btngroup-and', value: 'AND' } });
            glueElem.appendChild(inputElem);
            labelElem = this.createElement('label', { attrs: { class: 'e-lib e-btn e-btngroup-and-lbl e-small' },
                innerHTML: this.l10n.getConstant('AND') });
            glueElem.appendChild(labelElem);
            inputElem = this.createElement('input', { attrs: { type: 'radio', class: 'e-btngroup-or', value: 'OR' } });
            glueElem.appendChild(inputElem);
            labelElem = this.createElement('label', { attrs: { class: 'e-lib e-btn e-btngroup-or-lbl e-small' },
                innerHTML: this.l10n.getConstant('OR') });
            glueElem.appendChild(labelElem);
            groupHdrElem.appendChild(glueElem);
            grpActElem = this.createElement('div', { attrs: { class: 'e-group-action' } });
            groupBtn = this.createElement('button', { attrs: { type: 'button', class: 'e-add-btn' } });
            grpActElem.appendChild(groupBtn);
            groupHdrElem.appendChild(grpActElem);
        }
        return groupElem;
    };
    QueryBuilder.prototype.ruleTemplate = function () {
        var tempElem;
        var clsName;
        var ruleElem = this.createElement('div');
        var fieldElem = this.createElement('div', { attrs: { class: 'e-rule-field' } });
        tempElem = this.createElement('div', { attrs: { class: 'e-rule-filter' } });
        var filterElem = this.createElement('input', { attrs: { type: 'text', class: 'e-filter-input' } });
        tempElem.appendChild(filterElem);
        fieldElem.appendChild(tempElem);
        tempElem = this.createElement('div', { attrs: { class: 'e-rule-operator' } });
        fieldElem.appendChild(tempElem);
        tempElem = this.createElement('div', { attrs: { class: 'e-rule-value' } });
        fieldElem.appendChild(tempElem);
        tempElem = this.createElement('div', { attrs: { class: 'e-rule-value-delete' } });
        if (this.showButtons.ruleDelete || isNullOrUndefined(this.showButtons.ruleDelete)) {
            clsName = 'e-removerule e-rule-delete e-css e-btn e-small';
        }
        else {
            clsName = 'e-removerule e-rule-delete e-css e-btn e-small e-button-hide';
        }
        var delBtnElem = this.createElement('button', { attrs: { type: 'button', class: clsName } });
        tempElem.appendChild(delBtnElem);
        fieldElem.appendChild(tempElem);
        ruleElem.appendChild(fieldElem);
        return ruleElem;
    };
    QueryBuilder.prototype.addGroupElement = function (isGroup, target, condition, isBtnClick, not, isRoot, rule) {
        var _this = this;
        var args = { groupID: target.id.replace(this.element.id + '_', ''), cancel: false, type: 'insertGroup' };
        if (!this.isImportRules && !this.isInitialLoad) {
            this.trigger('beforeChange', args, function (observedChangeArgs) {
                _this.addGroupSuccess(observedChangeArgs, isGroup, target, condition, isBtnClick, not, isRoot, rule);
            });
        }
        else {
            this.isInitialLoad = false;
            this.addGroupSuccess(args, isGroup, target, condition, isBtnClick, not, isRoot, rule);
        }
    };
    QueryBuilder.prototype.addGroupSuccess = function (args, isGroup, eventTarget, condition, isBtnClick, not, isRoot, rule) {
        if (!args.cancel && (this.element.querySelectorAll('.e-group-container').length <= this.maxGroupCount)) {
            var target = eventTarget;
            var dltGroupBtn = void 0;
            var groupID = '';
            if (target.className.indexOf('e-group-container') < 0) {
                groupID = target.querySelector('.e-group-container') && target.querySelector('.e-group-container').id;
            }
            else {
                groupID = target.id;
            }
            var groupElem = this.groupElem.cloneNode(true);
            groupElem.setAttribute('id', this.element.id + '_group' + this.groupIdCounter);
            if (this.headerTemplate) {
                if (isRoot) {
                    isGroup = false;
                    groupElem.setAttribute('id', this.element.id + '_group0');
                    this.headerTemplateFn(groupElem, not, condition, rule, groupID);
                    this.groupIdCounter = 0;
                }
                else {
                    this.headerTemplateFn(groupElem, not, condition, rule, groupID);
                }
            }
            this.groupIdCounter++;
            if (!this.headerTemplate) {
                var andInpElem = groupElem.querySelector('.e-btngroup-and');
                var orInpElem = groupElem.querySelector('.e-btngroup-or');
                var andLblElem = groupElem.querySelector('.e-btngroup-and-lbl');
                var orLblElem = groupElem.querySelector('.e-btngroup-or-lbl');
                andInpElem.setAttribute('id', this.element.id + '_and' + this.btnGroupId);
                orInpElem.setAttribute('id', this.element.id + '_or' + this.btnGroupId);
                andInpElem.setAttribute('name', this.element.id + '_and' + this.btnGroupId);
                orInpElem.setAttribute('name', this.element.id + '_and' + this.btnGroupId);
                andLblElem.setAttribute('for', this.element.id + '_and' + this.btnGroupId);
                orLblElem.setAttribute('for', this.element.id + '_or' + this.btnGroupId);
                this.btnGroupId++;
            }
            if (isGroup) {
                var clsName = void 0;
                if (this.showButtons.groupDelete || isNullOrUndefined(this.showButtons.groupDelete)) {
                    clsName = 'e-deletegroup';
                }
                else {
                    clsName = 'e-deletegroup e-button-hide';
                }
                dltGroupBtn = this.createElement('button', { attrs: { type: 'button', class: clsName } });
                var button = new Button({ iconCss: 'e-icons e-delete-icon', cssClass: 'e-small e-round' });
                button.appendTo(dltGroupBtn);
                dltGroupBtn.setAttribute('title', this.l10n.getConstant('DeleteGroup'));
                rippleEffect(dltGroupBtn, { selector: '.deletegroup' });
                if (!this.headerTemplate) {
                    groupElem.querySelector('.e-group-action').appendChild(dltGroupBtn);
                }
                var ruleList = target.querySelector('.e-rule-list');
                var childElems = ruleList.children;
                var grpLen = 0;
                for (var j = 0, jLen = childElems.length; j < jLen; j++) {
                    if (childElems[j].className.indexOf('e-group-container') > -1) {
                        grpLen += 1;
                    }
                }
                ruleList.appendChild(groupElem);
                var level = this.levelColl[target.id].slice(0);
                level.push(grpLen);
                this.levelColl[groupElem.id] = level;
                if (!this.isImportRules) {
                    this.isAddSuccess = true;
                    this.addGroups([], target.id.replace(this.element.id + '_', ''));
                    this.isAddSuccess = false;
                    if (isBtnClick) {
                        this.addRuleElement(groupElem, {});
                    }
                }
            }
            else {
                target.appendChild(groupElem);
                this.levelColl[groupElem.id] = [0];
            }
            if (this.enableNotCondition) {
                if (!this.headerTemplate) {
                    var notElem = groupElem.querySelector('.e-qb-toggle');
                    var tglBtn = new Button({ content: this.l10n.getConstant('NOT'), cssClass: 'e-btn e-small' });
                    tglBtn.appendTo(notElem);
                    groupElem.querySelector('.e-btngroup-and-lbl').classList.add('e-not');
                    if (this.updatedRule && this.updatedRule.not) {
                        addClass([notElem], 'e-active-toggle');
                    }
                }
            }
            this.updatedRule = null;
            if (this.headerTemplate) {
                var args_2 = { requestType: 'header-template-create', ruleID: groupElem.id, condition: condition,
                    notCondition: this.enableNotCondition ? not : undefined };
                this.trigger('actionBegin', args_2);
            }
            else {
                var groupBtn = groupElem.querySelector('.e-add-btn');
                var btnObj = new DropDownButton({
                    items: this.items,
                    cssClass: 'e-round e-small e-caret-hide e-addrulegroup',
                    iconCss: 'e-icons e-add-icon',
                    beforeOpen: this.selectBtn.bind(this, groupBtn),
                    select: this.selectBtn.bind(this, groupBtn)
                });
                btnObj.appendTo(groupBtn);
                groupBtn.setAttribute('title', this.l10n.getConstant('AddButton'));
            }
            if (!this.isImportRules) {
                var grpId = target.id.replace(this.element.id + '_', '');
                var chgrpId = groupElem.id.replace(this.element.id + '_', '');
                this.trigger('change', { groupID: grpId, type: 'insertGroup', childGroupID: chgrpId });
            }
        }
    };
    QueryBuilder.prototype.headerTemplateFn = function (groupElem, not, condition, rule, groupID) {
        var template;
        var templateID = this.element.id + '_header';
        var args;
        var groupHdr = groupElem.querySelector('.e-group-header');
        if (this.headerTemplate) {
            args = { requestType: 'header-template-initialize', ruleID: groupElem.id,
                notCondition: this.enableNotCondition ? not : undefined, condition: condition, rule: this.getRuleCollection(rule, true), groupID: groupID };
            this.trigger('actionBegin', args);
            this.headerFn = this.templateParser(this.headerTemplate);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (this.isReact) {
                template = this.headerFn(args, this, groupElem.id, templateID)[0];
                groupHdr.appendChild(template);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }
            else if (this.isAngular) {
                var templateColl = this.headerFn(args, this, groupElem.id, templateID);
                template = (templateColl[0].nodeType === 3) ? templateColl[1] : templateColl[0];
                groupHdr.appendChild(template);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }
            else if (this.isVue3) {
                template = this.headerFn(args, this, groupElem.id, templateID);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                append(template, groupHdr);
            }
            else {
                template = this.headerFn(args, this, 'Template', templateID)[0];
                groupHdr.appendChild(template);
            }
            this.renderReactTemplates();
        }
        return groupElem;
    };
    /**
     * Notify the changes to component.
     *
     * @param {string | number | boolean | Date | string[] | number[] | Date[]} value - 'value' to be passed to update the rule value.
     * @param {Element} element - 'element' to be passed to update the rule.
     * @param {string} type - 'type' to be passed to update the rule .
     * @returns {void}.
     */
    QueryBuilder.prototype.notifyChange = function (value, element, type) {
        var grpElement = closest(element, '.e-group-container');
        var rules = this.getParentGroup(grpElement);
        var ruleElement = closest(element, '.e-rule-container');
        var index = 0;
        if (type === 'not') {
            rules.not = value;
            return;
        }
        if (type === 'condition') {
            rules.condition = value;
            return;
        }
        while (ruleElement && ruleElement.previousElementSibling !== null) {
            ruleElement = ruleElement.previousElementSibling;
            index++;
        }
        var rule = rules.rules[index];
        var column = this.getColumn(rule.field);
        var format = this.getFormat(column.format);
        if (column.type === 'date') {
            if (value instanceof Date) {
                value = this.intl.formatDate(value, format);
            }
            else if (value instanceof Array) {
                for (var i = 0; i < value.length; i++) {
                    if (value[i] && value[i] instanceof Date) {
                        value[i] = this.intl.formatDate(value[i], format);
                    }
                }
            }
        }
        if (column.ruleTemplate) {
            this.templateChange(element, value, type);
        }
        else {
            this.isNotified = true;
            this.updateRules(element, value);
            this.isNotified = false;
        }
    };
    QueryBuilder.prototype.templateChange = function (element, value, type) {
        var grpElem = closest(element, '.e-group-container');
        var eventsArgs;
        var rules = this.getParentGroup(grpElem);
        var ruleElem = closest(element, '.e-rule-container');
        var index = 0;
        if (this.allowValidation) {
            this.validateValue(rules, ruleElem);
        }
        while (ruleElem && ruleElem.previousElementSibling !== null) {
            ruleElem = ruleElem.previousElementSibling;
            index++;
        }
        var rule = rules.rules[index];
        if (type === 'field') {
            this.selectedColumn = this.getColumn(value);
        }
        else if (rule) {
            this.selectedColumn = this.getColumn(rule.field);
        }
        var operVal;
        this.previousColumn = this.getColumn(rule.field);
        var beforeRules = this.getValidRules(this.rule);
        if (this.selectedColumn) {
            if (this.selectedColumn.operators) {
                operVal = this.selectedColumn.operators;
            }
            else {
                operVal = this.customOperators[this.selectedColumn.type + 'Operator'];
            }
        }
        var arrOper = ['in', 'notin', 'between', 'notbetween'];
        var prevOper;
        switch (type) {
            case 'field':
                rule.field = value;
                rule.label = this.selectedColumn.label;
                rule.type = this.selectedColumn.type;
                rule.value = '';
                rule.operator = operVal[0].value;
                break;
            case 'operator':
                prevOper = rule.operator;
                rule.operator = value;
                if (arrOper.indexOf(rule.operator) > -1) {
                    rule.value = [];
                }
                else if (arrOper.indexOf(prevOper) > -1) {
                    rule.value = '';
                }
                break;
            case 'value':
                rule.value = value;
        }
        this.changeRuleTemplate(this.selectedColumn, element);
        this.filterRules(beforeRules, this.getValidRules(this.rule), type);
        if (this.selectedColumn && this.selectedColumn.ruleTemplate) {
            if (type === 'field' || type === 'operator') {
                var grpEle = closest(element, '.e-rule-container');
                this.destroyControls(grpEle, true);
                detach(grpEle.querySelector('.e-rule-field'));
                var ruleElement = this.appendRuleElem(closest(grpEle, '.e-group-container'), this.selectedColumn, 'change', grpEle.id, type, rule);
                if (this.displayMode === 'Vertical' || this.element.className.indexOf('e-device') > -1) {
                    ruleElement.className = 'e-rule-container e-vertical-mode';
                }
                else {
                    ruleElement.className = 'e-rule-container e-horizontal-mode';
                }
                if (ruleElement.previousElementSibling && ruleElement.previousElementSibling.className.indexOf('e-rule-container') > -1) {
                    if (ruleElement.className.indexOf('e-joined-rule') < 0) {
                        ruleElement.className += ' e-joined-rule';
                    }
                    if (ruleElement.previousElementSibling.className.indexOf('e-prev-joined-rule') < 0) {
                        ruleElement.previousElementSibling.className += ' e-prev-joined-rule';
                    }
                }
                if (ruleElement.previousElementSibling && ruleElement.previousElementSibling.className.indexOf('e-group-container') > -1 &&
                    ruleElement.className.indexOf('e-separate-rule') < 0) {
                    ruleElement.className += ' e-separate-rule';
                }
                var args = { requestType: 'template-create', action: type, ruleID: grpEle.id,
                    fields: this.fields, rule: rule };
                eventsArgs = { groupID: grpElem.id.replace(this.element.id + '_', ''), ruleID: grpEle.id.replace(this.element.id + '_', ''),
                    value: rule.field, type: 'field' };
                this.trigger('actionBegin', args);
                this.trigger('change', eventsArgs);
            }
        }
    };
    QueryBuilder.prototype.changeValue = function (i, args) {
        var _this = this;
        var element;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (args.element && args.element.classList.contains('e-multiselect')) {
            var multiSelectArgs = args;
            element = multiSelectArgs.element;
        }
        else if (args.event) {
            element = args.event.target;
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            element = args.element;
        }
        if (element.className.indexOf('e-day') > -1 || element.className.indexOf('e-today') > -1 || element.className.indexOf('e-cell') > -1) {
            var calenderArgs = args;
            element = calenderArgs.element;
        }
        var groupElem = closest(element, '.e-group-container');
        var ruleElem = closest(element, '.e-rule-container');
        var groupID = groupElem && groupElem.id.replace(this.element.id + '_', '');
        var ruleID = ruleElem.id.replace(this.element.id + '_', '');
        var dateElement = args;
        if (dateElement.element && dateElement.element.className.indexOf('e-datepicker') > -1) {
            element = dateElement.element;
        }
        var value;
        var rbValue;
        var dropDownObj;
        if (element.className.indexOf('e-radio') > -1) {
            // eslint-disable-next-line
            rbValue = parseInt(element.id.split('valuekey')[1], 0);
            if (this.fieldMode === 'Default') {
                dropDownObj = getComponent(closest(element, '.e-rule-container').querySelector('.e-filter-input'), 'dropdownlist');
                this.selectedColumn = dropDownObj.getDataByValue(dropDownObj.value);
            }
            else {
                dropDownObj = getComponent(closest(element, '.e-rule-container').querySelector('.e-filter-input'), 'dropdowntree');
                this.selectedColumn = this.getColumn(dropDownObj.value[0]);
            }
            if (this.selectedColumn.values) {
                value = this.selectedColumn.values[rbValue];
            }
            else {
                var valColl = [true, false];
                value = valColl[rbValue];
            }
        }
        else if (element.className.indexOf('e-multiselect') > -1) {
            value = getComponent(element, 'multiselect').value;
        }
        else {
            value = args.value;
        }
        if (args.name === 'input' && this.immediateModeDelay) {
            window.clearInterval(this.timer);
            this.timer = window.setInterval(function () { _this.filterValue(groupID, ruleID, value, i, element); }, this.immediateModeDelay);
        }
        else {
            this.filterValue(groupID, ruleID, value, i, element);
        }
    };
    QueryBuilder.prototype.filterValue = function (grID, rlID, value, i, ele) {
        var _this = this;
        var eventsArgs = { groupID: grID, ruleID: rlID, value: value, cancel: false, type: 'value' };
        window.clearInterval(this.timer);
        if (!this.isImportRules) {
            this.trigger('beforeChange', eventsArgs, function (observedChangeArgs) {
                _this.changeValueSuccessCallBack(observedChangeArgs, ele, i, grID, rlID);
            });
        }
        else {
            this.changeValueSuccessCallBack(eventsArgs, ele, i, grID, rlID);
        }
    };
    QueryBuilder.prototype.changeValueSuccessCallBack = function (args, element, i, groupID, ruleID) {
        if (!args.cancel) {
            this.updateRules(element, args.value, i);
            if (!this.isImportRules) {
                this.trigger('change', { groupID: groupID, ruleID: ruleID, value: args.value, cancel: false, type: 'value' });
            }
        }
    };
    QueryBuilder.prototype.fieldClose = function (id) {
        if (this.isFieldChange || this.isDestroy) {
            return;
        }
        this.isFieldClose = true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var ddl = getComponent(id, 'dropdownlist');
        var item = ddl.popupObj.element.querySelector('.e-active');
        var itemData = ddl.getItemData();
        ddl.value = itemData.value;
        var customArgs = { element: ddl.element, value: itemData.value, isInteracted: true,
            previousItemData: this.prevItemData, previousItem: null, item: item, itemData: itemData, event: null, e: null };
        if (ddl.previousValue !== ddl.value) {
            this.changeField(customArgs);
        }
        this.isFieldChange = false;
    };
    QueryBuilder.prototype.onSelectField = function (args) {
        if (args.itemData.hasChildren) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.showPopup();
        }
    };
    QueryBuilder.prototype.changeField = function (args) {
        if (args.isInteracted) {
            if (isNullOrUndefined(args.value)) {
                return;
            }
            this.isFieldChange = true;
            this.prevItemData = args.itemData;
            var fieldElem = closest(args.element, '.e-rule-filter') || closest(args.element, '.e-rule-sub-filter');
            var column = this.fieldMode === 'DropdownTree' ? this.getColumn(args.value[0]) : this.getColumn(args.value);
            if (this.fieldMode === 'DropdownTree' && fieldElem != null) {
                var ddtElem = fieldElem.querySelector('.e-dropdowntree.e-control');
                var ddt = getComponent(ddtElem, 'dropdowntree');
                if (column) {
                    if (column.type === 'object') {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        ddt.value = args.oldValue;
                        ddt.dataBind();
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        if (isNullOrUndefined(args.oldValue)) {
                            ddtElem.value = '';
                        }
                        else {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            var result = this.getLabelFromColumn(args.oldValue[0]);
                            ddtElem.value = result;
                        }
                        return;
                    }
                    else {
                        if (!isNullOrUndefined(args.value[0])) {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            ddt.value = args.value[0];
                            ddt.dataBind();
                            var result = this.getLabelFromColumn(args.value[0]);
                            ddtElem.value = result;
                        }
                    }
                }
                else {
                    return;
                }
            }
            this.destroySubFields(fieldElem);
            this.subFieldElem = null;
            this.isNotValueChange = true;
            if (column && column.ruleTemplate) {
                this.templateChange(args.element, column.field, 'field');
            }
            else if (column && column.columns && column.columns[0].ruleTemplate) {
                this.templateChange(args.element, column.columns[0].field, 'field');
            }
            else {
                var groupElem = closest(args.element, '.e-group-container');
                var rules = this.getParentGroup(groupElem);
                var ruleElem = closest(args.element, '.e-rule-container');
                var index = 0;
                while (ruleElem && ruleElem.previousElementSibling !== null) {
                    ruleElem = ruleElem.previousElementSibling;
                    index++;
                }
                rules.rules[index].value = '';
                this.changeRule(rules.rules[index], args);
            }
        }
    };
    QueryBuilder.prototype.changeRule = function (rule, ddlArgs) {
        if (!ddlArgs.itemData) {
            if (this.fieldMode === 'DropdownTree') {
                var ddt = getComponent(ddlArgs.element, 'dropdowntree');
                if (ddt.value == null) {
                    return;
                }
            }
            else {
                return;
            }
        }
        var tempRule = {};
        var filterElem = closest(ddlArgs.element, '.e-rule-filter');
        filterElem = filterElem ? filterElem : closest(ddlArgs.element, '.e-rule-sub-filter');
        var ddlObj = getComponent(ddlArgs.element, 'dropdownlist');
        if (this.fieldMode === 'DropdownTree' && filterElem != null) {
            ddlObj = getComponent(ddlArgs.element, 'dropdowntree');
        }
        var element = closest(ddlArgs.element, '.e-group-container');
        var groupID = element.id.replace(this.element.id + '_', '');
        this.changeFilter(filterElem, ddlObj, groupID, rule, tempRule, ddlArgs);
    };
    QueryBuilder.prototype.changeFilter = function (flt, dl, grID, rl, tmpRl, dArg) {
        var _this = this;
        if (flt) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var ddlValue = void 0;
            if (this.fieldMode === 'DropdownTree') {
                ddlValue = (dl.value[0]);
            }
            else {
                ddlValue = this.isImportRules ? this.GetRootColumnName(dl.value) : dl.value;
            }
            this.selectedColumn = this.getColumn(ddlValue);
            var ruleElem = closest(flt, '.e-rule-container');
            var ruleID = ruleElem.id.replace(this.element.id + '_', '');
            var eventsArgs = { groupID: grID, ruleID: ruleID, selectedField: this.fieldMode === 'DropdownTree' ?
                    dl.value[0] : dl.value, cancel: false, type: 'field' };
            if (!this.isImportRules) {
                this.trigger('beforeChange', eventsArgs, function (observedChangeArgs) {
                    _this.fieldChangeSuccess(observedChangeArgs, tmpRl, flt, rl, dArg);
                });
            }
            else {
                this.fieldChangeSuccess(eventsArgs, tmpRl, flt, rl, dArg);
            }
        }
        else {
            var operatorElem = closest(dArg.element, '.e-rule-operator');
            this.changeOperator(flt, operatorElem, dl, grID, rl, tmpRl, dArg);
        }
    };
    QueryBuilder.prototype.changeOperator = function (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    flt, opr, dl, grID, rl, tmpRl, dArg) {
        var _this = this;
        var ruleElem;
        var ruleID;
        var eventsArgs;
        if (opr) {
            ruleElem = closest(opr, '.e-rule-container');
            ruleID = ruleElem.id.replace(this.element.id + '_', '');
            eventsArgs = { groupID: grID, ruleID: ruleID, selectedIndex: dl.index, cancel: false, type: 'operator' };
            if (!this.isImportRules) {
                this.trigger('beforeChange', eventsArgs, function (observedChangeArgs) {
                    _this.operatorChangeSuccess(observedChangeArgs, flt, tmpRl, rl, dArg);
                });
            }
            else {
                this.operatorChangeSuccess(eventsArgs, flt, tmpRl, rl, dArg);
            }
        }
        else {
            this.changeRuleValues(flt, rl, tmpRl, dArg);
        }
    };
    QueryBuilder.prototype.fieldChangeSuccess = function (args, tempRule, filterElem, rule, ddlArgs) {
        var ruleElem = closest(filterElem, '.e-rule-container');
        var operatorElem = closest(ddlArgs.element, '.e-rule-operator');
        var element = closest(ddlArgs.element, '.e-group-container');
        var groupID = element.id.replace(this.element.id + '_', '');
        var ddlObj = getComponent(ddlArgs.element, 'dropdownlist');
        var tooltipElem = ruleElem.querySelectorAll('.e-tooltip.e-input-group');
        for (var i = 0; i < tooltipElem.length; i++) {
            getComponent(tooltipElem[i], 'tooltip').destroy();
        }
        if (!args.cancel) {
            if (isNullOrUndefined(this.selectedColumn)) {
                return;
            }
            tempRule.type = this.selectedColumn.type;
            if (ruleElem.querySelector('.e-template')) {
                rule.value = '';
            }
            if (this.selectedColumn.type === 'object' && this.fieldMode === 'Default') {
                tempRule.type = this.selectedColumn.columns[0].type;
                while (this.selectedColumn.columns) {
                    this.createSubFields(filterElem, rule, tempRule, ddlArgs);
                }
            }
            else {
                this.destroySubFields(filterElem);
                this.changeOperator(filterElem, operatorElem, ddlObj, groupID, rule, tempRule, ddlArgs);
            }
        }
        else {
            this.changeOperator(filterElem, operatorElem, ddlObj, groupID, rule, tempRule, ddlArgs);
        }
    };
    QueryBuilder.prototype.destroySubFields = function (filterElem) {
        while (filterElem && filterElem.nextElementSibling.classList.contains('e-rule-sub-filter')) {
            this.destroyControls(filterElem);
            filterElem.nextElementSibling.remove();
        }
    };
    QueryBuilder.prototype.createSubFields = function (filterElem, rule, tempRule, ddlArgs) {
        var subFieldValue = false;
        var fieldElem = closest(filterElem, '.e-rule-field');
        var tempElem = this.createElement('div', { attrs: { class: 'e-rule-sub-filter', id: 'subfilter' + this.subFilterCounter } });
        fieldElem.insertBefore(tempElem, fieldElem.querySelector('.e-rule-operator'));
        var ruleId = closest(tempElem, '.e-rule-container').id;
        var subFieldElem = this.createElement('input', { attrs: { type: 'text', id: ruleId + '_subfilterkey' + this.subFilterCounter } });
        tempElem.appendChild(subFieldElem);
        var height = (this.element.className.indexOf('e-device') > -1) ? '250px' : '200px';
        var subFieldData = Object.keys(this.selectedColumn.columns[0]);
        var ddlField;
        ddlField = {
            dataSource: this.selectedColumn.columns,
            fields: this.fields,
            placeholder: this.l10n.getConstant('SelectField'),
            popupHeight: ((subFieldData.length > 5) ? height : 'auto'),
            change: this.changeField.bind(this),
            index: 0,
            open: this.popupOpen.bind(this, false)
        };
        if (this.fieldModel) {
            ddlField = __assign({}, ddlField, this.fieldModel);
        }
        var dropDownList = new DropDownList(ddlField);
        dropDownList.appendTo('#' + ruleId + '_subfilterkey' + this.subFilterCounter);
        if (this.isImportRules || (this.previousColumn && this.previousColumn.ruleTemplate &&
            this.GetRootColumnName(rule.field) === this.GetRootColumnName(this.previousColumn.field))) {
            var subField = this.selectedColumn.columns;
            for (var i = 0; i < subField.length; i++) {
                if (rule.field === subField[i].field || rule.field.indexOf(subField[i].field) > -1) {
                    dropDownList.value = subField[i].field;
                    this.selectedColumn = subField[i];
                    subFieldValue = true;
                    break;
                }
            }
        }
        this.subFilterCounter++;
        this.subFieldElem = subFieldElem;
        // eslint-disable-next-line
        ddlArgs.itemData = ddlArgs.itemData;
        if (!subFieldValue && this.selectedColumn.columns) {
            if (!subFieldValue && this.isImportRules) {
                dropDownList.value = null;
            }
            this.selectedColumn = this.selectedColumn.columns[0];
        }
        this.previousColumn = this.selectedColumn;
        if (!this.selectedColumn.columns) {
            this.changeRuleValues(tempElem, rule, tempRule, ddlArgs);
        }
    };
    QueryBuilder.prototype.operatorChangeSuccess = function (eventsArgs, filterElem, tempRule, rule, ddlArgs) {
        if (!eventsArgs.cancel) {
            var operatorElem = closest(ddlArgs.element, '.e-rule-operator');
            var valElem = operatorElem.nextElementSibling;
            var dropDownObj = getComponent(ddlArgs.element, 'dropdownlist');
            var prevOper = rule.operator ? rule.operator.toString().toLowerCase() : '';
            tempRule.operator = dropDownObj.value.toString();
            var currOper = tempRule.operator.toLowerCase();
            if (tempRule.operator.toLowerCase().indexOf('between') > -1 || (tempRule.operator.toLowerCase().indexOf('in') > -1
                && tempRule.operator.toLowerCase().indexOf('contains') < 0)) {
                filterElem = operatorElem.previousElementSibling;
                tempRule.type = rule.type;
                if (tempRule.operator.toLowerCase().indexOf('in') < 0 || prevOper.indexOf('in') < 0) {
                    rule.value = [];
                }
            }
            else if (typeof rule.value === 'object' && rule.value != null) {
                rule.value = rule.value.length > 0 ? rule.value[0] : rule.type === 'number' ? 0 : '';
            }
            if (ddlArgs.previousItemData) {
                var prevValue = ddlArgs.previousItemData.value.toString().toLowerCase();
                if ((prevValue.indexOf('between') > -1 || (prevValue.indexOf('in') > -1 || (prevValue.indexOf('null') > -1)
                    || (prevValue.indexOf('empty') > -1)) && prevValue.indexOf('contains') < 0)) {
                    filterElem = operatorElem.previousElementSibling;
                    tempRule.type = rule.type;
                }
            }
            if ((prevOper.indexOf('in') > -1 && prevOper.indexOf('in') < 5) && (currOper.indexOf('in') > -1
                && currOper.indexOf('in') < 5)) {
                filterElem = null;
            }
            if (tempRule.operator.indexOf('null') > -1 || (tempRule.operator.indexOf('empty') > -1)) {
                var parentElem = operatorElem.parentElement.querySelector('.e-rule-value');
                var tooltipElem = parentElem.querySelector('.e-tooltip.e-input-group');
                if (tooltipElem) {
                    getComponent(tooltipElem, 'tooltip').destroy();
                }
                removeClass([parentElem], 'e-show');
                addClass([parentElem], 'e-hide');
            }
            if (valElem && this.getColumn(rule.field).template) {
                filterElem = operatorElem.previousElementSibling;
            }
            this.changeRuleValues(filterElem, rule, tempRule, ddlArgs);
        }
    };
    QueryBuilder.prototype.changeRuleValues = function (filterElem, rule, tempRule, ddlArgs) {
        var operatorElem = closest(ddlArgs.element, '.e-rule-operator');
        var isSub;
        var ddlObj;
        var operatorList;
        var oprElem;
        if (filterElem) {
            operatorElem = filterElem.nextElementSibling;
            if (filterElem.classList.contains('e-rule-sub-filter')) {
                tempRule.type = this.selectedColumn.type;
                isSub = operatorElem.classList.contains('e-rule-sub-filter');
                operatorElem = isSub ? operatorElem.nextElementSibling : operatorElem;
            }
            addClass([operatorElem], 'e-operator');
            if (operatorElem.childElementCount) {
                ddlObj = getComponent(operatorElem.querySelector('.e-dropdownlist'), 'dropdownlist');
                tempRule.operator = ddlObj.value;
                var fieldObj = void 0;
                if (this.fieldMode === 'DropdownTree') {
                    fieldObj = getComponent(filterElem.querySelector('.e-dropdowntree'), 'dropdowntree');
                }
                else {
                    fieldObj = getComponent(filterElem.querySelector('.e-dropdownlist'), 'dropdownlist');
                }
                tempRule.type = this.fieldMode === 'DropdownTree' ? this.getColumn(fieldObj.value[0]).type :
                    this.getColumn(fieldObj.value).type;
                var itemData = ddlArgs.itemData;
                this.renderValues(operatorElem, itemData, ddlArgs.previousItemData, true, rule, tempRule, ddlArgs.element);
            }
            else {
                var ruleId = closest(operatorElem, '.e-rule-container').id;
                oprElem = this.createElement('input', { attrs: { type: 'text', id: ruleId + '_operatorkey' } });
                operatorElem.appendChild(oprElem);
                if (this.selectedColumn.operators) {
                    operatorList = this.selectedColumn.operators;
                }
                else if (ddlArgs.itemData) {
                    operatorList = this.customOperators[this.selectedColumn.type + 'Operator'];
                }
                var height = (this.element.className.indexOf('e-device') > -1) ? '250px' : '200px';
                var value = operatorList[0].value;
                value = rule ? (rule.operator !== '' ? rule.operator : value) : value;
                var ddlOperator = void 0;
                ddlOperator = {
                    dataSource: operatorList,
                    fields: { text: 'key', value: 'value' },
                    placeholder: this.l10n.getConstant('SelectOperator'),
                    popupHeight: ((operatorList.length > 5) ? height : 'auto'),
                    change: this.changeField.bind(this),
                    index: 0,
                    value: value,
                    open: this.popupOpen.bind(this, false)
                };
                if (this.operatorModel) {
                    ddlOperator = __assign({}, ddlOperator, this.operatorModel);
                }
                var dropDownList = new DropDownList(ddlOperator);
                dropDownList.appendTo('#' + ruleId + '_operatorkey');
                tempRule.operator = (rule && rule.operator !== '' && !isNullOrUndefined(rule.operator)) ? rule.operator : operatorList[0].value;
                if (this.isImportRules) {
                    tempRule.type = this.selectedColumn.type;
                    tempRule.operator = rule.operator;
                }
                this.renderValues(operatorElem, this.selectedColumn, ddlArgs.previousItemData, false, rule, tempRule, ddlArgs.element);
            }
        }
        if (!this.isImportRules) {
            this.updateRules(ddlArgs.element, ddlArgs.item);
        }
    };
    QueryBuilder.prototype.popupOpen = function (isField, args) {
        if (this.enableRtl) {
            addClass([args.popup.element], 'e-rtl');
        }
        if (isField) {
            this.isFieldClose = false;
        }
    };
    QueryBuilder.prototype.destroyControls = function (target, isRuleTemplate) {
        var element = isRuleTemplate ? target : target.nextElementSibling;
        var inputElement = element.querySelectorAll('input.e-control');
        var divElement = element.querySelectorAll('div.e-control:not(.e-handle)');
        var columns = this.columns;
        for (var i = 0, len = inputElement.length; i < len; i++) {
            if (inputElement[i].classList.contains('e-textbox')) {
                getComponent(inputElement[i], 'textbox').destroy();
                detach(select('input#' + inputElement[i].id, element));
            }
            else if (inputElement[i].classList.contains('e-dropdownlist')) {
                if (this.allowValidation && inputElement[i].parentElement.className.indexOf('e-tooltip') > -1) {
                    getComponent(inputElement[i].parentElement, 'tooltip').destroy();
                }
                getComponent(inputElement[i], 'dropdownlist').destroy();
            }
            else if (inputElement[i].classList.contains('e-radio')) {
                getComponent(inputElement[i], 'radio').destroy();
            }
            else if (inputElement[i].classList.contains('e-numerictextbox')) {
                getComponent(inputElement[i], 'numerictextbox').destroy();
                detach(select('input#' + inputElement[i].id, element));
            }
            else if (inputElement[i].classList.contains('e-datepicker')) {
                getComponent(inputElement[i], 'datepicker').destroy();
            }
            else if (inputElement[i].classList.contains('e-multiselect')) {
                getComponent(inputElement[i], 'multiselect').destroy();
            }
            else if (inputElement[i].className.indexOf('e-template') > -1) {
                var clsName = inputElement[i].className;
                for (var j = 0, jLen = columns.length; j < jLen; j++) {
                    if (columns[j].template && clsName.indexOf(columns[j].field) > -1) {
                        this.templateDestroy(columns[j], inputElement[i].id);
                        break;
                    }
                }
            }
            if (document.getElementById(inputElement[i].id)) {
                detach(inputElement[i]);
            }
        }
        for (var i = 0, len = divElement.length; i < len; i++) {
            if (divElement[i].className.indexOf('e-template') > -1) {
                var clsName = divElement[i].className;
                for (var j = 0, jLen = columns.length; j < jLen; j++) {
                    if (columns[j].template && clsName.indexOf(columns[j].field) > -1) {
                        this.templateDestroy(columns[j], divElement[i].id);
                        break;
                    }
                }
            }
            detach(divElement[i]);
        }
        var templateElement = element.querySelectorAll('.e-template:not(.e-control)');
        for (var i = 0, len = templateElement.length; i < len; i++) {
            detach(templateElement[i]);
        }
    };
    QueryBuilder.prototype.templateDestroy = function (column, elemId) {
        var template;
        if (typeof column.template !== 'string' || column.template.destroy === undefined) {
            template = column.template;
        }
        else {
            return;
        }
        var temp = template.destroy;
        if (template.destroy) {
            var templateElements = void 0;
            if (document.getElementById(elemId)) {
                templateElements = closest(document.getElementById(elemId), '.e-rule-field').querySelectorAll('.e-template');
            }
            if (typeof temp === 'string') {
                temp = getValue(temp, window);
                temp({ field: column.field, elementId: elemId, elements: templateElements });
            }
            else {
                template.destroy({ field: column.field, elementId: elemId, elements: templateElements });
            }
        }
    };
    /**
     * Return values bound to the column.
     *
     * @param {string} field - 'field' to be passed to get the field values.
     * @returns {object[]} - Values bound to the column
     */
    QueryBuilder.prototype.getValues = function (field) {
        var original = {};
        var result = [];
        var value;
        var fieldColl = [];
        if (this.separator.length > 0) {
            fieldColl = field.split(this.separator);
        }
        var dataSource = this.dataColl;
        if (this.dataColl[1]) {
            for (var i = 0, iLen = dataSource.length; i < iLen; i++) {
                var data = {};
                if (fieldColl.length > 1) {
                    var dataObj = dataSource[i];
                    var fieldStr = void 0;
                    for (var j = 0, jLen = fieldColl.length; j < jLen; j++) {
                        fieldStr = fieldColl[j];
                        if (fieldColl.length === (j + 1)) {
                            value = dataObj["" + fieldStr];
                            if (Number(dataObj["" + fieldStr]) === dataObj["" + fieldStr] && dataObj["" + fieldStr] % 1 !== 0) {
                                value = dataObj["" + fieldStr].toString();
                            }
                        }
                        else {
                            dataObj = dataObj["" + fieldStr];
                        }
                    }
                }
                else {
                    value = dataSource[i]["" + field];
                    if (Number(dataSource[i]["" + field]) === dataSource[i]["" + field] && dataSource[i]["" + field] % 1 !== 0) {
                        value = dataSource[i]["" + field].toString();
                    }
                }
                if (!(value in original)) {
                    original["" + value] = 1;
                    if (fieldColl.length > 1) {
                        this.createNestedObject(data, fieldColl, value);
                    }
                    else {
                        data["" + field] = value;
                    }
                    result.push(data);
                }
            }
        }
        return result;
    };
    QueryBuilder.prototype.createNestedObject = function (obj, fieldColl, value) {
        var key;
        var lastIndex = fieldColl.length - 1;
        for (var k = 0; k < lastIndex; ++k) {
            key = fieldColl[k];
            if (!(key in obj)) {
                obj["" + key] = {};
            }
            obj = obj["" + key];
        }
        obj[fieldColl[lastIndex]] = value;
    };
    QueryBuilder.prototype.getDistinctValues = function (dataSource, field) {
        var original = {};
        var result = [];
        var nest = [];
        var value = '';
        var isNested = field.indexOf(this.separator);
        var _loop_2 = function (i, iLen) {
            if (isNested === 0) {
                value = dataSource[i]["" + field];
            }
            else {
                nest = field.split(this_2.separator);
                // eslint-disable-next-line @typescript-eslint/tslint/config
                nest.forEach(function (element) {
                    if (value) {
                        value = value["" + element];
                    }
                    else {
                        value = dataSource[i]["" + element];
                    }
                });
            }
            if (Number(dataSource[i]["" + field]) === dataSource[i]["" + field] && dataSource[i]["" + field] % 1 !== 0) {
                value = dataSource[i]["" + field].toString();
            }
            var data = {};
            if (!(value in original)) {
                original["" + value] = 1;
                if (isNested === 0) {
                    data["" + field] = value;
                }
                else {
                    data[nest[nest.length - 1]] = value;
                }
                result.push(data);
            }
        };
        var this_2 = this;
        for (var i = 0, iLen = dataSource.length; i < iLen; i++) {
            _loop_2(i, iLen);
        }
        return result;
    };
    QueryBuilder.prototype.renderMultiSelect = function (rule, parentId, i, selectedValue, values) {
        var isFetched = false;
        var ds;
        var isValues = false;
        this.isGetNestedData = false;
        if (this.dataColl[1]) {
            if (Object.keys(this.dataColl[1]).indexOf(rule.field) > -1) {
                isFetched = true;
                ds = this.getDistinctValues(this.dataColl, rule.field);
            }
        }
        isFetched = rule.columns ? false : isFetched;
        if (!this.dataColl.length && values.length) {
            isValues = true;
        }
        var fieldValue = this.selectedRule.field;
        var isNested = this.selectedRule.field.indexOf(this.separator);
        if (isNested !== 0 && this.fieldMode !== 'DropdownTree') {
            var nest = this.selectedRule.field.split(this.separator);
            fieldValue = nest[nest.length - 1];
        }
        var multiSelectValue;
        multiSelectValue = {
            dataSource: isValues ? values : (isFetched ? ds : this.dataManager),
            query: new Query([rule.field]),
            fields: { text: fieldValue, value: fieldValue },
            placeholder: this.l10n.getConstant('SelectValue'),
            value: selectedValue,
            mode: 'CheckBox',
            width: '100%',
            change: this.changeValue.bind(this, i),
            close: this.closePopup.bind(this, i),
            actionBegin: this.multiSelectOpen.bind(this, parentId + '_valuekey' + i),
            open: this.popupOpen.bind(this, false)
        };
        if (this.valueModel && this.valueModel.multiSelectModel) {
            multiSelectValue = __assign({}, multiSelectValue, this.valueModel.multiSelectModel);
        }
        var multiSelectObj = new MultiSelect(multiSelectValue);
        multiSelectObj.appendTo('#' + parentId + '_valuekey' + i);
        this.updateRules(multiSelectObj.element, selectedValue, 0);
    };
    QueryBuilder.prototype.multiSelectOpen = function (parentId, args) {
        if (this.dataSource instanceof DataManager) {
            var element = document.getElementById(parentId);
            var dropDownObj = getComponent(closest(element, '.e-rule-container').querySelector('.e-filter-input'), 'dropdownlist');
            this.selectedColumn = dropDownObj.getDataByValue(dropDownObj.value);
            var value = this.selectedColumn.field;
            var isFetched = false;
            if (this.dataColl[1]) {
                if (Object.keys(this.dataColl[1]).indexOf(value) > -1) {
                    isFetched = true;
                }
                var isNest = value.indexOf(this.separator);
                if (isNest !== 0 && this.isGetNestedData) {
                    isFetched = true;
                }
            }
            if (!isFetched) {
                args.cancel = true;
                this.bindMultiSelectData(element, value);
            }
        }
    };
    QueryBuilder.prototype.bindMultiSelectData = function (element, value) {
        this.getMultiSelectData(element, value);
    };
    QueryBuilder.prototype.getMultiSelectData = function (element, value) {
        var _this = this;
        var dummyData;
        var deferred = new Deferred();
        var data = this.dataManager.executeQuery(new Query().select(value));
        var multiselectObj = getComponent(element, 'multiselect');
        multiselectObj.hideSpinner();
        this.createSpinner(closest(element, '.e-multi-select-wrapper').parentElement);
        showSpinner(closest(element, '.e-multi-select-wrapper').parentElement);
        data.then(function (e) {
            if (e.actual && e.actual.result) {
                dummyData = e.actual.result;
            }
            else {
                dummyData = e.result;
            }
            _this.dataColl = extend(_this.dataColl, dummyData, [], true);
            multiselectObj.dataSource = _this.getDistinctValues(_this.dataColl, value);
            _this.isGetNestedData = true;
            hideSpinner(closest(element, '.e-multi-select-wrapper').parentElement);
        }).catch(function (e) {
            deferred.reject(e);
        });
    };
    QueryBuilder.prototype.createSpinner = function (element) {
        var spinnerElem = this.createElement('span', { attrs: { class: 'e-qb-spinner' } });
        element.appendChild(spinnerElem);
        createSpinner({ target: spinnerElem, width: Browser.isDevice ? '16px' : '14px' });
    };
    QueryBuilder.prototype.closePopup = function (i, args) {
        var element = document.getElementById(args.popup.element.id.replace('_popup', ''));
        if (element) {
            var value = getComponent(element, 'multiselect').value;
            this.updateRules(element, value, i);
        }
    };
    QueryBuilder.prototype.processTemplate = function (target, itemData, rule, tempRule) {
        var container = closest(target, '.e-rule-container');
        var tempElements = container.querySelectorAll('.e-template');
        var filterElem = container.querySelector('.e-rule-filter .e-filter-input');
        var ddlObj = this.fieldMode === 'DropdownTree' ? getComponent(filterElem, 'dropdowntree')
            : getComponent(container.querySelector('.e-rule-filter .e-filter-input'), 'dropdownlist');
        var column = this.fieldMode === 'DropdownTree' ? this.getColumn(ddlObj.value[0]) : this.getColumn(ddlObj.value);
        if (typeof itemData.template === 'string' || itemData.template.write === undefined) {
            var args = { rule: rule, ruleID: container.id, operator: tempRule.operator, field: column.field,
                requestType: 'value-template-create' };
            this.trigger('actionBegin', args);
        }
        else {
            var template = itemData.template;
            if (typeof template.write === 'string') {
                getValue(template.write, window)({ elements: tempElements.length > 1 ? tempElements : tempElements[0], values: rule.value,
                    operator: tempRule.operator, field: column.field, dataSource: column.values });
            }
            else if (typeof itemData.template !== 'function') {
                itemData.template.write({ elements: tempElements.length > 1 ? tempElements : tempElements[0],
                    values: rule.value, operator: tempRule.operator, field: column.field, dataSource: column.values });
            }
        }
    };
    QueryBuilder.prototype.getItemData = function (parentId) {
        var fieldObj = getComponent(document.getElementById(parentId + '_filterkey'), 'dropdownlist');
        if (this.fieldMode === 'DropdownTree') {
            fieldObj = getComponent(document.getElementById(parentId + '_filterkey'), 'dropdowntree');
        }
        return this.fieldMode === 'DropdownTree' ? this.getColumn(fieldObj.value[0]) : this.getColumn(fieldObj.value);
    };
    QueryBuilder.prototype.setDefaultValue = function (parentId, isArryValue, isNumber) {
        var itemData = this.getItemData(parentId);
        if (isNullOrUndefined(itemData.value)) {
            return isNumber ? isArryValue ? [0, 0] : 0 : isArryValue ? [] : '';
        }
        if (isArryValue) {
            if (!(itemData.value instanceof Array)) {
                return [itemData.value];
            }
        }
        else {
            if (itemData.value instanceof Array) {
                return itemData.value[0];
            }
        }
        return itemData.value;
    };
    QueryBuilder.prototype.renderStringValue = function (parentId, rule, operator, idx, ruleValElem) {
        var selectedVal;
        var columnData = this.getItemData(parentId);
        var selectedValue;
        var isTemplate = (typeof columnData.template === 'string');
        if (this.isImportRules || this.isPublic || isTemplate) {
            selectedValue = rule.value;
        }
        else {
            selectedValue = this.setDefaultValue(parentId, false, false);
        }
        if ((operator === 'in' || operator === 'notin') && (this.dataColl.length || columnData.values)) {
            selectedVal = this.isImportRules ? rule.value : this.setDefaultValue(parentId, true, false);
            this.renderMultiSelect(columnData, parentId, idx, selectedVal, columnData.values);
            if (this.displayMode === 'Vertical' || this.element.className.indexOf('e-device') > -1) {
                ruleValElem.style.width = '100%';
            }
            else {
                ruleValElem.style.width = null;
                ruleValElem.style.minWidth = '200px';
            }
        }
        else {
            if (operator === 'in' || operator === 'notin') {
                selectedVal = this.isImportRules ? rule.value : this.setDefaultValue(parentId, true, false);
                selectedValue = selectedVal.join(',');
            }
            var txtBox = void 0;
            txtBox = {
                placeholder: this.l10n.getConstant('SelectValue'),
                input: this.changeValue.bind(this, idx)
            };
            if (this.valueModel && this.valueModel.textBoxModel) {
                txtBox = __assign({}, txtBox, this.valueModel.textBoxModel);
            }
            var inputobj = new TextBox(txtBox);
            inputobj.appendTo('#' + parentId + '_valuekey' + idx);
            inputobj.value = selectedValue;
            inputobj.dataBind();
        }
    };
    QueryBuilder.prototype.renderNumberValue = function (parentId, rule, operator, idx, ruleValElem, itemData, length) {
        var columnData = this.getItemData(parentId);
        var isTemplate = (typeof columnData.template === 'string');
        var selectedVal = (this.isImportRules || this.isPublic || isTemplate) ? rule.value : this.setDefaultValue(parentId, false, true);
        if ((operator === 'in' || operator === 'notin') && (this.dataColl.length || columnData.values)) {
            selectedVal = this.isImportRules ? rule.value : this.setDefaultValue(parentId, true, false);
            this.renderMultiSelect(columnData, parentId, idx, selectedVal, columnData.values);
            if (this.element.className.indexOf('e-device') > -1 || this.displayMode === 'Vertical') {
                ruleValElem.style.width = '100%';
            }
            else {
                ruleValElem.style.minWidth = '200px';
                ruleValElem.style.width = null;
            }
        }
        else if (operator === 'in' || operator === 'notin') {
            selectedVal = this.isImportRules ? rule.value : this.setDefaultValue(parentId, true, false);
            var selVal = selectedVal.join(',');
            var txtInp = void 0;
            txtInp = {
                placeholder: this.l10n.getConstant('SelectValue'),
                input: this.changeValue.bind(this, idx)
            };
            if (this.valueModel && this.valueModel.textBoxModel) {
                txtInp = __assign({}, txtInp, this.valueModel.textBoxModel);
            }
            var input = new TextBox(txtInp);
            input.appendTo('#' + parentId + '_valuekey' + idx);
            input.value = selVal;
            input.dataBind();
        }
        else {
            itemData = columnData;
            var min = (itemData.validation && itemData.validation.min) ? itemData.validation.min : 0;
            var max = (itemData.validation && itemData.validation.max) ? itemData.validation.max : Number.MAX_VALUE;
            var format = itemData.format ? itemData.format : 'n';
            if (length > 1 && rule) {
                selectedVal = rule.value[idx] ? rule.value[idx] : this.setDefaultValue(parentId, true, true);
            }
            var numericTxt = void 0;
            numericTxt = {
                value: (selectedVal instanceof Array) ? selectedVal[idx] : selectedVal,
                format: format, min: min, max: max, width: '100%',
                step: itemData.step ? itemData.step : 1,
                change: this.changeValue.bind(this, idx)
            };
            if (this.valueModel && this.valueModel.numericTextBoxModel) {
                numericTxt = __assign({}, numericTxt, this.valueModel.numericTextBoxModel);
            }
            var numeric = new NumericTextBox(numericTxt);
            numeric.appendTo('#' + parentId + '_valuekey' + idx);
            numeric.element.setAttribute('aria-label', itemData.label + ' ' + 'Value');
        }
    };
    QueryBuilder.prototype.processValueString = function (value, type) {
        var numArr = [];
        var strArr = value.split(',');
        if (type === 'string') {
            return strArr;
        }
        else {
            for (var k = 0, kLen = strArr.length; k < kLen; k++) {
                numArr.push(Number(strArr[k]));
            }
            return numArr;
        }
    };
    QueryBuilder.prototype.parseDate = function (value, format) {
        var formatOpt;
        var selectedValue;
        if (format) {
            var dParser = this.intl.getDateParser({ skeleton: 'full', type: 'dateTime' });
            formatOpt = this.getFormat(format);
            selectedValue = dParser(value);
            if (isNullOrUndefined(selectedValue)) {
                selectedValue = this.intl.parseDate(value, formatOpt);
            }
        }
        else {
            selectedValue = new Date(value);
        }
        return selectedValue;
    };
    QueryBuilder.prototype.renderControls = function (target, itemData, rule, tempRule, isRendered) {
        addClass([target.parentElement.querySelector('.e-rule-value')], 'e-value');
        removeClass([target.parentElement.querySelector('.e-rule-value')], 'e-hide');
        addClass([target.parentElement.querySelector('.e-rule-value')], 'e-show');
        if (itemData.template && (itemData.template.create || isRendered)) {
            this.processTemplate(target, itemData, rule, tempRule);
        }
        else {
            var length_1;
            if (tempRule.type === 'boolean') {
                length_1 = this.selectedColumn.values ? this.selectedColumn.values.length : 2;
            }
            else {
                length_1 = tempRule.operator && tempRule.operator.toString().toLowerCase().indexOf('between') > -1 ? 2 : 1;
            }
            var parentId = closest(target, '.e-rule-container').id;
            var ruleValElem = void 0;
            var operator = tempRule.operator.toString();
            if (target.className.indexOf('e-rule-operator') > -1 || target.className.indexOf('e-rule-filter') > -1) {
                ruleValElem = target.parentElement.querySelector('.e-rule-value');
                if (this.element.className.indexOf('e-device') > -1 || this.displayMode === 'Vertical') {
                    ruleValElem.style.width = '100%';
                }
                else {
                    if (operator !== 'in' && operator !== 'notin') {
                        addClass([ruleValElem], 'e-custom-value');
                    }
                    else {
                        removeClass([ruleValElem], 'e-custom-value');
                    }
                }
                for (var i = 0; i < length_1; i++) {
                    switch (tempRule.type) {
                        case 'string':
                            {
                                this.renderStringValue(parentId, rule, operator, i, ruleValElem);
                            }
                            break;
                        case 'number':
                            {
                                this.renderNumberValue(parentId, rule, operator, i, ruleValElem, itemData, length_1);
                            }
                            break;
                        case 'boolean':
                            this.processBoolValues(itemData, rule, parentId, i);
                            break;
                        case 'date':
                            {
                                var selectedValue = new Date();
                                var selVal = void 0;
                                var column = void 0;
                                var format = itemData.format;
                                var datepick = void 0;
                                var datePicker = void 0;
                                var place = this.l10n.getConstant('SelectValue');
                                var isTemplate = (typeof itemData.template === 'string');
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                if (!itemData.field && !itemData.key && itemData.value) {
                                    if (itemData.value instanceof Date) {
                                        selectedValue = itemData.value;
                                    }
                                    else {
                                        selectedValue = this.parseDate(itemData.value, itemData.format);
                                    }
                                }
                                if (!itemData.format && rule && rule.field !== '') {
                                    column = this.getColumn(rule.field);
                                    format = column.format;
                                }
                                if ((this.isImportRules || this.isPublic || isTemplate) && rule) {
                                    column = this.getColumn(rule.field);
                                    format = column.format;
                                    if (rule.value) {
                                        selVal = (length_1 > 1) ? rule.value[i] : rule.value;
                                        selectedValue = this.parseDate(selVal, column.format);
                                    }
                                    else {
                                        selectedValue = rule.value;
                                    }
                                }
                                if (format) {
                                    var formatObj = this.getFormat(format);
                                    if (formatObj.skeleton) {
                                        datePicker = {
                                            locale: this.getLocale(), value: selectedValue,
                                            placeholder: place, format: formatObj, change: this.changeValue.bind(this, i)
                                        };
                                        if (this.valueModel && this.valueModel.datePickerModel) {
                                            datePicker = __assign({}, datePicker, this.valueModel.datePickerModel);
                                        }
                                        datepick = new DatePicker(datePicker);
                                    }
                                    else {
                                        datePicker = {
                                            value: selectedValue, locale: this.getLocale(), placeholder: place,
                                            format: formatObj.format, change: this.changeValue.bind(this, i)
                                        };
                                        if (this.valueModel && this.valueModel.datePickerModel) {
                                            datePicker = __assign({}, datePicker, this.valueModel.datePickerModel);
                                        }
                                        datepick = new DatePicker(datePicker);
                                    }
                                }
                                else {
                                    datePicker = {
                                        locale: this.getLocale(), value: selectedValue,
                                        placeholder: place, change: this.changeValue.bind(this, i)
                                    };
                                    if (this.valueModel && this.valueModel.datePickerModel) {
                                        datePicker = __assign({}, datePicker, this.valueModel.datePickerModel);
                                    }
                                    datepick = new DatePicker(datePicker);
                                }
                                datepick.appendTo('#' + parentId + '_valuekey' + i);
                                if (!rule.value) {
                                    var elem = document.getElementById(parentId + '_valuekey' + i);
                                    this.updateRules(elem, selectedValue, null, this.isNotValueChange);
                                    this.isNotValueChange = false;
                                }
                            }
                            break;
                    }
                }
            }
        }
    };
    QueryBuilder.prototype.processBoolValues = function (itemData, rule, parentId, i) {
        var isCheck = false;
        var value;
        var orgValue;
        if (isNullOrUndefined(rule.type) && itemData) {
            rule.type = itemData.type;
        }
        var label;
        if (itemData.values) {
            var values = itemData.values;
            if (rule.type === 'boolean' && !isNullOrUndefined(rule.value)) {
                isCheck = values[i].toLowerCase() === rule.value.toString().toLowerCase();
            }
            else if (itemData.value) {
                isCheck = values[i].toLowerCase() === itemData.value.toString().toLowerCase();
            }
            else if (i === 0) {
                isCheck = true;
            }
            orgValue = value = label = values[i];
        }
        else {
            var values = [true, false];
            if (rule.type === 'boolean' && !isNullOrUndefined(rule.value)) {
                isCheck = values[i].toString().toLowerCase() === rule.value.toString().toLowerCase();
            }
            else if (itemData.value) {
                isCheck = values[i].toString().toLowerCase() === itemData.value.toString().toLowerCase();
            }
            else if (i === 0) {
                isCheck = true;
            }
            value = values[i].toString();
            orgValue = values[i];
            label = this.l10n.getConstant(['True', 'False'][i]);
        }
        var radioBtn;
        radioBtn = {
            label: label, name: parentId + 'default', checked: isCheck, value: value,
            change: this.changeValue.bind(this, i)
        };
        if (this.valueModel && this.valueModel.radioButtonModel) {
            radioBtn = __assign({}, radioBtn, this.valueModel.radioButtonModel);
        }
        var radiobutton = new RadioButton(radioBtn);
        radiobutton.appendTo('#' + parentId + '_valuekey' + i);
        if (isCheck) {
            this.updateRules(radiobutton.element, orgValue, 0);
        }
    };
    QueryBuilder.prototype.getOperatorIndex = function (ddlObj, rule) {
        var i;
        var dataSource = ddlObj.dataSource;
        var len = dataSource.length;
        for (i = 0; i < len; i++) {
            if (rule.operator === ddlObj.dataSource[i].value) {
                return i;
            }
        }
        return 0;
    };
    QueryBuilder.prototype.getPreviousItemData = function (prevItemData, column) {
        if (this.isFieldClose && prevItemData) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            prevItemData = this.getColumn(prevItemData.value);
        }
        if (column && column.template && prevItemData && Object.keys(prevItemData).length < 4) {
            prevItemData.template = column.template;
        }
        return prevItemData;
    };
    QueryBuilder.prototype.renderValues = function (target, itemData, prevItemData, isRender, rule, tempRule, element) {
        var subFldElem = target.previousElementSibling;
        var filtElem = subFldElem.getElementsByTagName('input')[0];
        var filtObj = this.fieldMode === 'DropdownTree' ? getComponent(filtElem, 'dropdowntree')
            : getComponent(filtElem, 'dropdownlist');
        var column = this.fieldMode === 'DropdownTree' ? this.getColumn(filtObj.value[0])
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            : this.getColumn(filtObj.value);
        this.selectedRule = column;
        if (isRender) {
            var ddlObj = getComponent(target.querySelector('input'), 'dropdownlist');
            itemData = element.id.indexOf('operator') > -1 ? itemData : this.selectedRule;
            if (itemData.operators) {
                ddlObj.value = null;
                ddlObj.dataBind();
                ddlObj.dataSource = itemData.operators;
                ddlObj.index = this.getOperatorIndex(ddlObj, rule);
                ddlObj.value = tempRule.operator = ddlObj.dataSource[ddlObj.index].value;
                ddlObj.dataBind();
            }
        }
        var operator = tempRule.operator.toString();
        var isTempRendered = false;
        if (!(operator.indexOf('null') > -1 || operator.indexOf('empty') > -1)) {
            var parentId = closest(target, '.e-rule-container').id;
            prevItemData = this.getPreviousItemData(prevItemData, column);
            if (prevItemData && prevItemData.template === undefined) {
                if (prevItemData.columns) {
                    prevItemData = this.getColumn(rule.field);
                }
            }
            else if (this.fieldMode === 'DropdownTree' && prevItemData === undefined) {
                prevItemData = this.getColumn(rule.field);
            }
            if (prevItemData && prevItemData.template) {
                this.templateDestroy(prevItemData, parentId + '_valuekey0');
                var elem = select('#' + parentId + '_valuekey0', target.nextElementSibling);
                if (elem && !elem.classList.contains('e-control')) {
                    detach(select('#' + parentId + '_valuekey0', target.nextElementSibling));
                }
                if (typeof prevItemData.template === 'string' || prevItemData.template.create === undefined) {
                    if (target.nextElementSibling.classList.contains('e-template-value')) {
                        this.clearQBTemplate([parentId]);
                    }
                    target.nextElementSibling.innerHTML = '';
                }
            }
            if (isRender) {
                this.validateValue(rule, closest(target, '.e-rule-container'));
                this.destroyControls(target);
            }
            if (column) {
                itemData.template = column.template;
            }
            if (itemData.template) {
                addClass([target.nextElementSibling], 'e-template-value');
                itemData.template = column.template;
                isTempRendered = this.setColumnTemplate(itemData, parentId, column.field, itemData.value ||
                    operator, target, rule);
            }
            if (isTempRendered) {
                var parentElem = target.parentElement.querySelector('.e-rule-value');
                if (this.element.className.indexOf('e-device') > -1 || this.displayMode === 'Vertical') {
                    parentElem.style.width = '100%';
                }
                else {
                    parentElem.style.width = '200px';
                }
            }
            else {
                removeClass([target.nextElementSibling], 'e-template-value');
                var inputLen = 1;
                if (tempRule.type === 'boolean') {
                    inputLen = this.selectedColumn.values ? this.selectedColumn.values.length : 2;
                }
                else {
                    inputLen = (operator && operator.toLowerCase().indexOf('between') > -1) ? 2 : 1;
                }
                for (var i = 0; i < inputLen; i++) {
                    var valElem = this.createElement('input', { attrs: { type: 'text', id: parentId + '_valuekey' + i } });
                    target.nextElementSibling.appendChild(valElem);
                }
            }
            this.renderControls(target, itemData, rule, tempRule, isTempRendered);
        }
        else {
            var parentElem = target.parentElement.querySelector('.e-rule-value');
            if (parentElem) {
                removeClass([parentElem], 'e-show');
                addClass([parentElem], 'e-hide');
            }
        }
    };
    QueryBuilder.prototype.setColumnTemplate = function (itemData, ruleID, field, operator, target, rule) {
        var _this = this;
        var args;
        var isRendered = true;
        if (!itemData.template) {
            return true;
        }
        else {
            if (typeof itemData.template === 'string' || itemData.template.create === undefined) {
                args = { requestType: 'value-template-initialize', ruleID: ruleID, field: field, operator: operator, rule: rule,
                    renderTemplate: true };
                this.trigger('actionBegin', args, function (observedActionArgs) {
                    isRendered = _this.actionBeginSuccessCallBack(observedActionArgs, itemData, ruleID, field, target);
                });
                return isRendered;
            }
            else {
                var valElem = void 0;
                var template = itemData.template;
                if (typeof template.create === 'string') {
                    valElem = getValue(template.create, window)({ field: field, operator: operator });
                }
                else {
                    valElem = template.create({ field: field, operator: operator });
                }
                if (valElem instanceof Element) {
                    valElem.id = ruleID + '_valuekey0';
                    addClass([valElem], 'e-template');
                    target.nextElementSibling.appendChild(valElem);
                    if (field.indexOf(' ') < 0) {
                        addClass([valElem], 'e-' + field);
                    }
                }
                else if (valElem instanceof Array) {
                    addClass(valElem, 'e-template');
                    for (var i = 0, iLen = valElem.length; i < iLen; i++) {
                        valElem[i].id = ruleID + '_valuekey' + i;
                        target.nextElementSibling.appendChild(valElem[i]);
                    }
                }
                addClass([target.nextElementSibling], 'e-template-value');
                return true;
            }
        }
    };
    QueryBuilder.prototype.actionBeginSuccessCallBack = function (args, itemData, ruleID, field, target) {
        if (args.renderTemplate) {
            var valElem = void 0;
            this.columnTemplateFn = this.templateParser(typeof itemData.template === 'function' ? itemData.template : itemData.template);
            var templateID = this.element.id + field;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (this.isReact) {
                valElem = this.columnTemplateFn(args, this, ruleID, templateID)[0];
            } // eslint-disable-next-line @typescript-eslint/no-explicit-any
            else if (this.isAngular) {
                var valElemColl = this.columnTemplateFn(args, this, ruleID, templateID);
                valElem = (valElemColl[0].nodeType === 3) ? valElemColl[1] : valElemColl[0];
            }
            else {
                valElem = this.columnTemplateFn(args, this, 'Template', templateID)[0];
            }
            target.nextElementSibling.appendChild(valElem);
            addClass([target.nextElementSibling], 'e-template-value');
            this.renderReactTemplates();
            return true;
        }
        else {
            return false;
        }
    };
    QueryBuilder.prototype.updateValues = function (element, rule) {
        var idx = 1;
        if (element.className.indexOf('e-template') > -1) {
            idx = 3;
        }
        var controlName = element.className.split(' e-')[idx];
        var i = parseInt(element.id.slice(-1), 2);
        switch (controlName) {
            case 'checkbox':
                // eslint-disable-next-line
                var value = getComponent(element, controlName).value;
                rule.value = (value !== '') ? value : undefined;
                break;
            case 'textbox':
                rule.value = getComponent(element, controlName).value;
                break;
            case 'dropdownlist':
                rule.value = getComponent(element, controlName).value;
                break;
            case 'radio':
                // eslint-disable-next-line
                var radioBtnObj = getComponent(element, controlName);
                if (radioBtnObj.checked) {
                    if (typeof rule.value === 'boolean') {
                        rule.value = radioBtnObj.value === 'true';
                    }
                    else {
                        if (this.getColumn(rule.field).values) {
                            rule.value = radioBtnObj.value;
                        }
                        else {
                            rule.value = radioBtnObj.value === 'true';
                        }
                    }
                }
                radioBtnObj.refresh();
                break;
            case 'numerictextbox':
                if (rule.operator.indexOf('between') > -1) {
                    if (typeof rule.value === 'string') {
                        rule.value = [];
                    }
                    rule.value[i] = getComponent(element, controlName).value;
                }
                else {
                    rule.value = getComponent(element, controlName).value;
                }
                break;
            case 'datepicker':
                // eslint-disable-next-line
                var column = this.getColumn(rule.field);
                // eslint-disable-next-line
                var format = this.getFormat(column.format);
                // eslint-disable-next-line
                var selectedDate = getComponent(element, controlName).value;
                if (rule.operator.indexOf('between') > -1) {
                    if (typeof rule.value === 'string') {
                        rule.value = [];
                    }
                    rule.value[i] = this.intl.formatDate(selectedDate, format);
                }
                else if (isNullOrUndefined(format.format) && selectedDate) {
                    rule.value = this.intl.formatDate(selectedDate);
                }
                else if (selectedDate) {
                    rule.value = this.intl.formatDate(selectedDate, format);
                }
                else {
                    rule.value = selectedDate;
                }
                break;
            case 'multiselect':
                rule.value = getComponent(element, controlName).value;
                break;
        }
    };
    QueryBuilder.prototype.updateRules = function (target, selectedValue, i, isNotTrigger) {
        var groupElem = closest(target, '.e-group-container');
        var rule = this.getParentGroup(groupElem);
        var ruleElem = closest(target, '.e-rule-container');
        var index = 0;
        var dropDownObj;
        var eventsArgs;
        var groupID = groupElem.id.replace(this.element.id + '_', '');
        var beforeRules = this.getValidRules(this.rule);
        while (ruleElem && ruleElem.previousElementSibling !== null) {
            ruleElem = ruleElem.previousElementSibling;
            index++;
        }
        var operator = rule.rules[index].operator ? rule.rules[index].operator.toString() : '';
        ruleElem = closest(target, '.e-rule-container');
        var ruleID = ruleElem.id.replace(this.element.id + '_', '');
        if (closest(target, '.e-rule-filter') || closest(target, '.e-rule-sub-filter')) {
            if (this.subFieldElem) {
                target = this.subFieldElem;
            }
            dropDownObj = this.fieldMode === 'DropdownTree' ? getComponent(target, 'dropdowntree') :
                getComponent(target, 'dropdownlist');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var column = this.fieldMode === 'DropdownTree' ? this.getColumn(dropDownObj.value[0])
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                : this.getColumn(dropDownObj.value);
            if (!this.isImportRules && rule.rules[index].field &&
                rule.rules[index].field.toLowerCase() !== column.field.toLowerCase()) {
                if (!(ruleElem.querySelectorAll('.e-template')) && !(operator.indexOf('null') > -1)
                    || (operator.indexOf('empty') > -1)) {
                    rule.rules[index].value = '';
                }
            }
            this.selectedColumn = this.getColumn(this.selectedColumn.field);
            rule.rules[index].field = this.selectedColumn.field;
            rule.rules[index].type = this.selectedColumn.type;
            rule.rules[index].label = this.selectedColumn.label;
            var ruleElement = closest(target, '.e-rule-filter');
            ruleElement = ruleElement ? ruleElement : closest(target, '.e-rule-sub-filter');
            var element = ruleElement.nextElementSibling.querySelector('input.e-control');
            element = element ? element : ruleElement.nextElementSibling.nextElementSibling.querySelector('input.e-control');
            operator = getComponent(element, 'dropdownlist').value.toString();
            rule.rules[index].operator = operator;
            // Value Fields
            var valueContainer = ruleElement.nextElementSibling.nextElementSibling;
            var elementCln = valueContainer.querySelectorAll('input.e-control');
            if (elementCln.length < 1) {
                elementCln = valueContainer.querySelectorAll('div.e-control');
            }
            if (elementCln.length < 1) {
                elementCln = valueContainer.querySelectorAll('.e-template');
            }
            eventsArgs = { groupID: groupID, ruleID: ruleID, value: rule.rules[index].field, type: 'field' };
            for (var i_1 = 0; i_1 < elementCln.length; i_1++) {
                if (operator.indexOf('null') > -1 || operator.indexOf('empty') > -1) {
                    rule.rules[index].value = null;
                    continue;
                }
                this.updateValues(elementCln[i_1], rule.rules[index]);
            }
            if (!this.isImportRules) {
                this.trigger('change', eventsArgs);
            }
            if (this.allowValidation && rule.rules[index].field && target.parentElement.className.indexOf('e-tooltip') > -1) {
                getComponent(target.parentElement, 'tooltip').destroy();
            }
            this.filterRules(beforeRules, this.getValidRules(this.rule), 'field');
        }
        else if (closest(target, '.e-rule-operator')) {
            dropDownObj = getComponent(target, 'dropdownlist');
            rule.rules[index].operator = dropDownObj.value.toString();
            var inputElem = ruleElem.querySelectorAll('.e-rule-value input.e-control');
            eventsArgs = { groupID: groupID, ruleID: ruleID, value: dropDownObj.value, type: 'operator' };
            if (this.allowValidation && rule.rules[index].operator && target.parentElement.className.indexOf('e-tooltip') > -1) {
                getComponent(target.parentElement, 'tooltip').destroy();
            }
            if (inputElem.length > 1 && !(inputElem[0].className.indexOf('e-template') > -1)) {
                rule.rules[index].value = [];
            }
            for (var i_2 = 0; i_2 < inputElem.length; i_2++) {
                if (rule.rules[index].operator.indexOf('null') > -1 || rule.rules[index].operator.indexOf('empty') > -1) {
                    rule.rules[index].value = null;
                    continue;
                }
                else if (inputElem[i_2].classList.contains('e-template')) {
                    continue;
                }
                this.updateValues(inputElem[i_2], rule.rules[index]);
            }
            if (!this.isImportRules) {
                this.trigger('change', eventsArgs);
            }
            this.filterRules(beforeRules, this.getValidRules(this.rule), 'operator');
        }
        else if (closest(target, '.e-rule-value')) {
            this.ruleValueUpdate(target, selectedValue, rule, index, groupElem, ruleElem, i);
            if (!isNotTrigger) {
                this.filterRules(beforeRules, this.getValidRules(this.rule), 'value');
            }
        }
    };
    QueryBuilder.prototype.filterRules = function (beforeRule, afterRule, type) {
        var beforeRuleStr = JSON.stringify({ condition: beforeRule.condition, not: beforeRule.not, rule: beforeRule.rules });
        var afetrRuleStr = JSON.stringify({ condition: afterRule.condition, not: afterRule.not, rule: afterRule.rules });
        if (beforeRuleStr !== afetrRuleStr) {
            if (!this.isImportRules) {
                this.trigger('ruleChange', { previousRule: beforeRule, rule: afterRule, type: type });
            }
        }
    };
    QueryBuilder.prototype.ruleValueUpdate = function (target, selectedValue, rule, index, groupElem, ruleElem, i) {
        var eventsArgs;
        var oper;
        var arrOperator = ['in', 'between', 'notin', 'notbetween'];
        if (rule.rules[index].operator) {
            oper = rule.rules[index].operator.toString().toLowerCase();
        }
        if (selectedValue !== null) {
            if (target.className.indexOf('e-multiselect') > -1 && rule.rules[index].type === 'number' &&
                !this.isNotified) {
                var selVal = [];
                var dupSelectedValue = selectedValue;
                for (var k = 0, kLen = dupSelectedValue.length; k < kLen; k++) {
                    if (typeof dupSelectedValue[k] === 'string') {
                        selVal.push(parseFloat(dupSelectedValue[k]));
                    }
                }
                if (selVal.length) {
                    selectedValue = selVal;
                }
            }
            if (this.isNotified) {
                rule.rules[index].value = selectedValue;
                eventsArgs = { groupID: groupElem.id, ruleID: ruleElem.id, value: rule.rules[index].value, type: 'value' };
                if (!this.isImportRules) {
                    this.trigger('change', eventsArgs);
                }
            }
            else if (target.className.indexOf('e-spin') > -1 || target.className.indexOf('e-numeric') > -1) {
                if (arrOperator.indexOf(oper) > -1) {
                    rule.rules[index].value[i] = selectedValue;
                }
                else {
                    rule.rules[index].value = selectedValue;
                }
            }
            else if (target.className.indexOf('e-radio') > -1) {
                rule.rules[index].value = selectedValue;
            }
            else if (target.className.indexOf('e-multiselect') > -1) {
                rule.rules[index].value = selectedValue;
            }
            else if (target.className.indexOf('e-textbox') > -1) {
                if (oper === 'in' || oper === 'notin') {
                    if (rule.rules[index].type === 'string') {
                        rule.rules[index].value = this.processValueString(selectedValue, rule.rules[index].type);
                    }
                    else {
                        rule.rules[index].value = this.processValueString(selectedValue, rule.rules[index].type);
                    }
                }
                else {
                    rule.rules[index].value = selectedValue;
                }
            }
            else if (target.className.indexOf('e-datepicker') > -1) {
                var format = this.getFormat(this.getColumn(this.selectedColumn.field).format);
                if (format.type) {
                    if (arrOperator.indexOf(oper) > -1) {
                        if (typeof rule.rules[index].value === 'string') {
                            rule.rules[index].value = [];
                        }
                        rule.rules[index].value[i] = this.intl.formatDate(selectedValue, format);
                    }
                    else {
                        rule.rules[index].value = this.intl.formatDate(selectedValue, format);
                    }
                }
            }
            this.validateValue(rule, ruleElem, index);
        }
        else {
            if (target.className.indexOf('e-datepicker') > -1) {
                if (arrOperator.indexOf(oper) > -1) {
                    if (typeof rule.rules[index].value === 'string') {
                        rule.rules[index].value = [];
                    }
                    rule.rules[index].value[i] = selectedValue;
                }
                else {
                    rule.rules[index].value = selectedValue;
                }
            }
            else {
                rule.rules[index].value = selectedValue;
            }
        }
    };
    QueryBuilder.prototype.validateValue = function (rule, ruleElem, index) {
        if (!isNullOrUndefined(index)) {
            rule = rule.rules[index];
        }
        var isObject = typeof (rule.value) === 'object';
        if (this.allowValidation && (isNullOrUndefined(index) || (isObject ? rule.value.length > 0 : rule.value))) {
            var valElem = ruleElem.querySelectorAll('.e-rule-value .e-control');
            if (valElem.length > 0) {
                if (valElem[0].className.indexOf('e-tooltip') > -1) {
                    getComponent(valElem[0], 'tooltip').destroy();
                }
                else if (valElem[0].parentElement.className.indexOf('e-tooltip') > -1) {
                    getComponent(valElem[0].parentElement, 'tooltip').destroy();
                }
                if (valElem[1] && valElem[1].parentElement.className.indexOf('e-tooltip') > -1) {
                    getComponent(valElem[1].parentElement, 'tooltip').destroy();
                }
            }
        }
    };
    QueryBuilder.prototype.getFormat = function (format) {
        var formatOptions;
        if (format) {
            if (typeof (format) === 'string') {
                formatOptions = { type: 'dateTime' };
                if (format === 'short' || format === 'yMd') {
                    formatOptions.type = 'date';
                    formatOptions.skeleton = format;
                }
                else {
                    formatOptions.format = format;
                }
            }
            else {
                formatOptions = { type: 'dateTime', skeleton: format.skeleton };
            }
        }
        else {
            formatOptions = { type: 'date', skeleton: 'yMd' };
        }
        return formatOptions;
    };
    QueryBuilder.prototype.findGroupByIdx = function (groupIdx, rule, isRoot) {
        var ruleColl = rule.rules;
        var dupRuleColl = [];
        if (!isRoot) {
            for (var j = 0, jLen = ruleColl.length; j < jLen; j++) {
                rule = ruleColl[j];
                if (rule.rules) {
                    dupRuleColl.push(rule);
                }
            }
            return dupRuleColl[groupIdx];
        }
        return rule;
    };
    /**
     * Removes the component from the DOM and detaches all its related event handlers.
     * Also it maintains the initial input element from the DOM.
     *
     * @method destroy
     * @returns {void}
     */
    QueryBuilder.prototype.destroy = function () {
        this.isDestroy = true;
        var queryElement = this.element;
        if (!queryElement) {
            return;
        }
        var element;
        var i;
        var len;
        var tooltip;
        _super.prototype.destroy.call(this);
        element = this.element.querySelectorAll('.e-addrulegroup');
        len = element.length;
        for (i = 0; i < len; i++) {
            getComponent(element[i], 'dropdown-btn').destroy();
            detach(element[i]);
        }
        tooltip = this.element.querySelectorAll('.e-rule-filter .e-control.e-tooltip');
        for (i = 0; i < tooltip.length; i++) {
            getComponent(tooltip[i], 'tooltip').destroy();
        }
        element = this.element.querySelectorAll('.e-rule-filter .e-control:not(.e-tooltip)');
        len = element.length;
        for (i = 0; i < len; i++) {
            if (getComponent(element[i], 'dropdownlist')) {
                getComponent(element[i], 'dropdownlist').destroy();
            }
            else {
                getComponent(element[i], 'dropdowntree').destroy();
            }
            detach(element[i]);
        }
        tooltip = this.element.querySelectorAll('.e-rule-operator .e-control.e-tooltip');
        for (i = 0; i < tooltip.length; i++) {
            getComponent(tooltip[i], 'tooltip').destroy();
        }
        element = this.element.querySelectorAll('.e-rule-operator .e-control:not(.e-tooltip)');
        len = element.length;
        for (i = 0; i < len; i++) {
            if (getComponent(element[i], 'dropdownlist')) {
                getComponent(element[i], 'dropdownlist').destroy();
                detach(element[i]);
            }
        }
        tooltip = this.element.querySelectorAll('.e-rule-value .e-control.e-tooltip');
        for (i = 0; i < tooltip.length; i++) {
            getComponent(tooltip[i], 'tooltip').destroy();
        }
        this.isImportRules = false;
        this.unWireEvents();
        this.levelColl[this.element.id + '_group0'] = [0];
        this.element.innerHTML = '';
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (this.portals && this.portals.length) {
            this.clearQBTemplate();
        }
        classList(this.element, [], ['e-rtl', 'e-responsive', 'e-device']);
        this.isDestroy = false;
    };
    /**
     * Adds single or multiple rules.
     *
     * @param {RuleModel[]} rule - 'rule collection' to be passed to add the rules.
     * @param {string} groupID - 'group id' to be passed to add the rule in groups.
     * @returns {void}.
     */
    QueryBuilder.prototype.addRules = function (rule, groupID) {
        groupID = this.element.id + '_' + groupID;
        this.isPublic = true;
        for (var i = 0, len = rule.length; i < len; i++) {
            this.addRuleElement(document.getElementById(groupID), rule[i]);
        }
        this.isPublic = false;
    };
    /**
     * Adds single or multiple groups, which contains the collection of rules.
     *
     * @param {RuleModel[]} groups - 'group collection' to be passed to add the groups.
     * @param {string} groupID - 'group id' to be passed to add the groups.
     * @returns {void}.
     */
    QueryBuilder.prototype.addGroups = function (groups, groupID) {
        if (this.isAddSuccess || this.element.querySelectorAll('.e-group-container').length <= this.maxGroupCount) {
            groupID = this.element.id + '_' + groupID;
            var groupElem = document.getElementById(groupID);
            var rule = this.getParentGroup(groupElem);
            var grouplen = groups.length;
            if (grouplen) {
                this.isPublic = true;
                for (var i = 0, len = groups.length; i < len; i++) {
                    this.updatedRule = { condition: groups[i].condition, not: groups[i].not };
                    this.importRules(groups[i], groupElem, false, groups[i].not);
                }
                this.isPublic = false;
            }
            else {
                var condition = 'and';
                var not = false;
                if (this.updatedRule) {
                    condition = this.updatedRule.condition;
                    not = this.updatedRule.not;
                }
                if (this.enableNotCondition) {
                    rule.rules.push({ 'condition': condition, 'not': not, rules: [] });
                }
                else {
                    rule.rules.push({ 'condition': condition, rules: [] });
                }
            }
            if (!this.headerTemplate) {
                this.disableRuleCondition(groupElem, rule);
            }
        }
    };
    QueryBuilder.prototype.initWrapper = function () {
        this.isInitialLoad = true;
        if (this.cssClass) {
            addClass([this.element], this.cssClass.replace(/\s+/g, ' ').trim().split(' '));
        }
        if (this.enableRtl) {
            addClass([this.element], 'e-rtl');
        }
        if (this.width) {
            this.element.style.width = this.width;
        }
        if (this.height) {
            this.element.style.height = this.height;
        }
        if (this.rule.rules.length) {
            this.isImportRules = true;
        }
        else {
            this.addGroupElement(false, this.element);
        }
        if (Browser.isDevice || this.displayMode === 'Vertical') {
            if (Browser.isDevice) {
                this.element.style.width = '100%';
                this.element.classList.add('e-device');
            }
            removeClass(this.element.querySelectorAll('.e-rule-container'), 'e-horizontal-mode');
            addClass(this.element.querySelectorAll('.e-rule-container'), 'e-vertical-mode');
            this.displayMode = 'Vertical';
        }
        else {
            this.displayMode = 'Horizontal';
        }
        if (this.summaryView) {
            if (this.isImportRules) {
                this.renderSummary();
            }
            else {
                this.renderSummaryCollapse();
            }
        }
        else {
            if (this.columns.length && this.isImportRules) {
                this.addGroupElement(false, this.element, this.rule.condition, false, this.rule.not, false, this.rule);
                var mRules = extend({}, this.rule, {}, true);
                this.isRefreshed = true;
                this.setGroupRules(mRules);
                this.isRefreshed = false;
            }
            else if (this.columns.length) {
                this.addRuleElement(this.element.querySelector('.e-group-container'), {});
            }
            this.notGroupRtl();
            if (this.readonly) {
                this.enableReadonly();
            }
            var buttons = this.element.querySelectorAll('label.e-btn');
            var button = void 0;
            for (var i = 0; i < buttons.length; i++) {
                button = buttons.item(i);
                rippleEffect(button, { selector: '.e-btn' });
            }
        }
    };
    QueryBuilder.prototype.renderSummary = function () {
        var contentElem = this.createElement('div', {
            attrs: {
                class: 'e-summary-content',
                id: this.element.id + '_summary_content'
            }
        });
        var textElem = this.createElement('textarea', { attrs: { class: 'e-summary-text', readonly: 'true' }, styles: 'max-height:500px' });
        var editElem = this.createElement('button', { attrs: { type: 'button', class: 'e-edit-rule e-css e-btn e-small e-flat e-primary' } });
        var divElem = this.createElement('div', { attrs: { class: 'e-summary-btndiv' } });
        contentElem.appendChild(textElem);
        textElem.textContent = this.getSqlFromRules(this.rule);
        editElem.textContent = this.l10n.getConstant('Edit');
        divElem.appendChild(editElem);
        contentElem.appendChild(divElem);
        this.element.appendChild(contentElem);
    };
    QueryBuilder.prototype.renderSummaryCollapse = function () {
        var collapseElem = this.createElement('div', {
            attrs: {
                class: 'e-collapse-rule e-icons',
                title: this.l10n.getConstant('SummaryViewTitle')
            }
        });
        this.element.querySelector('.e-group-header').appendChild(collapseElem);
    };
    QueryBuilder.prototype.columnSort = function () {
        if (this.sortDirection.toLowerCase() === 'descending') {
            this.columns = new DataManager(this.columns).executeLocal(new Query().sortByDesc('field'));
        }
        else if (this.sortDirection.toLowerCase() === 'ascending') {
            this.columns = new DataManager(this.columns).executeLocal(new Query().sortBy('field'));
        }
    };
    QueryBuilder.prototype.onChangeNotGroup = function () {
        this.element.innerHTML = '';
        this.groupIdCounter = 0;
        if (!this.headerTemplate) {
            if (this.enableNotCondition) {
                if (this.enableNotCondition) {
                    var inputElem = this.createElement('button', { attrs: { type: 'button', class: 'e-qb-toggle' } });
                    this.groupElem.querySelector('.e-btn-group').insertBefore(inputElem, this.groupElem.querySelector('.e-btngroup-and'));
                }
            }
            else {
                this.groupElem.querySelector('.e-qb-toggle').remove();
            }
        }
        this.rule = this.checkNotGroup(this.rule);
        this.initWrapper();
    };
    QueryBuilder.prototype.notGroupRtl = function () {
        if (this.enableRtl) {
            addClass(this.element.querySelectorAll('.e-btn-group'), 'e-rtl');
        }
        else {
            removeClass(this.element.querySelectorAll('.e-btn-group'), 'e-rtl');
        }
    };
    QueryBuilder.prototype.checkNotGroup = function (rule) {
        var orgRule;
        if (rule.rules) {
            for (var i = 0; i < rule.rules.length; i++) {
                orgRule = rule.rules[i];
                orgRule = this.checkNotGroup(orgRule);
                rule.rules[i] = orgRule;
            }
        }
        if (!isNullOrUndefined(rule.not)) {
            if (this.enableNotCondition) {
                rule.not = false;
            }
            delete rule.not;
        }
        else if (this.enableNotCondition && !isNullOrUndefined(rule.condition)) {
            rule.not = false;
        }
        return rule;
    };
    QueryBuilder.prototype.onPropertyChanged = function (newProp, oldProp) {
        var properties = Object.keys(newProp);
        for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
            var prop = properties_1[_i];
            switch (prop) {
                case 'summaryView':
                    // eslint-disable-next-line
                    var groupElem = this.element.querySelector('.e-group-container');
                    // eslint-disable-next-line
                    var summaryElem = this.element.querySelector('.e-summary-content');
                    if (newProp.summaryView) {
                        groupElem.style.display = 'none';
                        if (this.element.querySelectorAll('.e-summary-content').length < 1) {
                            this.renderSummary();
                            summaryElem = this.element.querySelector('.e-summary-content');
                        }
                        else {
                            this.element.querySelector('.e-summary-text').textContent = this.getSqlFromRules(this.rule);
                        }
                        summaryElem.style.display = 'block';
                    }
                    else {
                        if (groupElem.querySelectorAll('.e-collapse-rule').length > -1) {
                            this.renderSummaryCollapse();
                        }
                        groupElem.style.display = 'block';
                        summaryElem.style.display = 'none';
                    }
                    break;
                case 'displayMode':
                    this.refresh();
                    break;
                case 'showButtons':
                    if (newProp.showButtons.ruleDelete) {
                        removeClass(this.element.querySelectorAll('.e-rule-delete'), 'e-button-hide');
                    }
                    else {
                        addClass(this.element.querySelectorAll('.e-rule-delete'), 'e-button-hide');
                    }
                    if (newProp.showButtons.groupDelete) {
                        removeClass(this.element.querySelectorAll('.e-deletegroup'), 'e-button-hide');
                    }
                    else {
                        addClass(this.element.querySelectorAll('.e-deletegroup'), 'e-button-hide');
                    }
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
                        addClass([this.element], 'e-rtl');
                        this.notGroupRtl();
                    }
                    else {
                        removeClass([this.element], 'e-rtl');
                        this.notGroupRtl();
                    }
                    break;
                case 'enablePersistence':
                    this.enablePersistence = newProp.enablePersistence;
                    break;
                case 'dataSource':
                    this.dataSource = newProp.dataSource;
                    this.refresh();
                    break;
                case 'columns':
                    this.columns = newProp.columns;
                    this.columnSort();
                    this.updateSubFieldsFromColumns(this.columns);
                    break;
                case 'sortDirection':
                    this.sortDirection = newProp.sortDirection;
                    this.columnSort();
                    break;
                case 'maxGroupCount':
                    this.maxGroupCount = newProp.maxGroupCount;
                    break;
                case 'height':
                    this.height = newProp.height;
                    this.element.style.height = this.height;
                    break;
                case 'rule':
                    this.rule = newProp.rule;
                    newProp.rule = this.getRuleCollection(this.rule, false);
                    break;
                case 'width':
                    this.width = newProp.width;
                    this.element.style.width = this.width;
                    break;
                case 'locale':
                    this.locale = newProp.locale;
                    this.intl = new Internationalization(this.locale);
                    this.isLocale = true;
                    this.refresh();
                    this.isLocale = false;
                    break;
                case 'enableNotCondition':
                    this.onChangeNotGroup();
                    break;
                case 'readonly':
                    this.isReadonly = newProp.readonly;
                    this.enableReadonly();
                    break;
            }
        }
    };
    QueryBuilder.prototype.preRender = function () {
        this.element.id = this.element.id || getUniqueID('ej2-querybuilder');
        this.defaultLocale = {
            StartsWith: 'Starts With',
            EndsWith: 'Ends With',
            Contains: 'Contains',
            NotLike: 'Not Like',
            Like: 'Like',
            Equal: 'Equal',
            NotEqual: 'Not Equal',
            LessThan: 'Less Than',
            LessThanOrEqual: 'Less Than Or Equal',
            GreaterThan: 'Greater Than',
            GreaterThanOrEqual: 'Greater Than Or Equal',
            Between: 'Between',
            NotBetween: 'Not Between',
            In: 'In',
            NotIn: 'Not In',
            Remove: 'REMOVE',
            SelectField: 'Select a field',
            SelectOperator: 'Select operator',
            DeleteRule: 'Remove this condition',
            DeleteGroup: 'Delete group',
            AddGroup: 'Add Group',
            AddCondition: 'Add Condition',
            Edit: 'EDIT',
            ValidationMessage: 'This field is required',
            SummaryViewTitle: 'Summary View',
            OtherFields: 'Other Fields',
            AND: 'AND',
            OR: 'OR',
            NOT: 'NOT',
            SelectValue: 'Enter Value',
            IsEmpty: 'Is Empty',
            IsNotEmpty: 'Is Not Empty',
            IsNull: 'Is Null',
            IsNotNull: 'Is Not Null',
            True: 'true',
            False: 'false',
            AddButton: 'Add Group/Condition'
        };
        this.l10n = new L10n('querybuilder', this.defaultLocale, this.locale);
        this.intl = new Internationalization(this.locale);
        this.groupIdCounter = 0;
        this.subFilterCounter = 0;
        this.ruleIdCounter = 0;
        this.btnGroupId = 0;
        this.isImportRules = false;
        this.parser = [];
        this.customOperators = {
            stringOperator: [
                { value: 'startswith', key: this.l10n.getConstant('StartsWith') },
                { value: 'endswith', key: this.l10n.getConstant('EndsWith') },
                { value: 'contains', key: this.l10n.getConstant('Contains') },
                { value: 'equal', key: this.l10n.getConstant('Equal') },
                { value: 'notequal', key: this.l10n.getConstant('NotEqual') },
                { value: 'in', key: this.l10n.getConstant('In') },
                { value: 'notin', key: this.l10n.getConstant('NotIn') },
                { value: 'isempty', key: this.l10n.getConstant('IsEmpty') },
                { value: 'isnotempty', key: this.l10n.getConstant('IsNotEmpty') }
            ],
            dateOperator: [
                { value: 'equal', key: this.l10n.getConstant('Equal') },
                { value: 'greaterthan', key: this.l10n.getConstant('GreaterThan') },
                { value: 'greaterthanorequal', key: this.l10n.getConstant('GreaterThanOrEqual') },
                { value: 'lessthan', key: this.l10n.getConstant('LessThan') },
                { value: 'lessthanorequal', key: this.l10n.getConstant('LessThanOrEqual') },
                { value: 'notequal', key: this.l10n.getConstant('NotEqual') }
            ],
            booleanOperator: [
                { value: 'equal', key: this.l10n.getConstant('Equal') },
                { value: 'notequal', key: this.l10n.getConstant('NotEqual') }
            ],
            numberOperator: [
                { value: 'equal', key: this.l10n.getConstant('Equal') },
                { value: 'greaterthanorequal', key: this.l10n.getConstant('GreaterThanOrEqual') },
                { value: 'greaterthan', key: this.l10n.getConstant('GreaterThan') },
                { value: 'between', key: this.l10n.getConstant('Between') },
                { value: 'lessthan', key: this.l10n.getConstant('LessThan') },
                { value: 'notbetween', key: this.l10n.getConstant('NotBetween') },
                { value: 'lessthanorequal', key: this.l10n.getConstant('LessThanOrEqual') },
                { value: 'notequal', key: this.l10n.getConstant('NotEqual') },
                { value: 'in', key: this.l10n.getConstant('In') },
                { value: 'notin', key: this.l10n.getConstant('NotIn') }
            ]
        };
        this.operators = {
            equal: '=', notequal: '!=', greaterthan: '>', greaterthanorequal: '>=', lessthan: '<', in: 'IN', notin: 'NOT IN',
            lessthanorequal: '<=', startswith: 'LIKE', endswith: 'LIKE', between: 'BETWEEN', notbetween: 'NOT BETWEEN', contains: 'LIKE',
            isnull: 'IS NULL', isnotnull: 'IS NOT NULL', isempty: 'IS EMPTY', isnotempty: 'IS NOT EMPTY', notstartswith: 'NOT LIKE',
            notendswith: 'NOT LIKE', notcontains: 'NOT LIKE'
        };
        this.sqlOperators = {
            equal: '=', notequal: '!=', greaterthan: '>', greaterthanorequal: '>=', lessthan: '<', in: this.l10n.getConstant('In').toUpperCase(),
            notin: this.l10n.getConstant('NotIn').toUpperCase(), lessthanorequal: '<=', startswith: this.l10n.getConstant('Like').toUpperCase(),
            endswith: this.l10n.getConstant('Like').toUpperCase(), between: this.l10n.getConstant('Between').toUpperCase(),
            notbetween: this.l10n.getConstant('NotBetween').toUpperCase(), contains: this.l10n.getConstant('Like').toUpperCase(),
            isnull: this.l10n.getConstant('IsNull').toUpperCase(), isnotnull: this.l10n.getConstant('IsNotNull').toUpperCase(),
            isempty: this.l10n.getConstant('IsEmpty').toUpperCase(), isnotempty: this.l10n.getConstant('IsNotEmpty').toUpperCase(),
            notstartswith: this.l10n.getConstant('NotLike').toUpperCase(), notendswith: this.l10n.getConstant('NotLike').toUpperCase(),
            notcontains: this.l10n.getConstant('NotLike').toUpperCase()
        };
        if (!this.fields) {
            this.fields = { text: 'label', value: 'field' };
        }
    };
    QueryBuilder.prototype.render = function () {
        this.levelColl = {};
        this.items = [
            {
                text: this.l10n.getConstant('AddGroup'),
                iconCss: 'e-icons e-add-icon e-addgroup'
            },
            {
                text: this.l10n.getConstant('AddCondition'),
                iconCss: 'e-icons e-add-icon e-addrule'
            }
        ];
        this.ruleElem = this.ruleTemplate();
        this.groupElem = this.groupTemplate();
        var stringOper = [
            { value: 'isnull', key: this.l10n.getConstant('IsNull') },
            { value: 'isnotnull', key: this.l10n.getConstant('IsNotNull') }
        ];
        var numberOper = [
            { value: 'isnull', key: this.l10n.getConstant('IsNull') },
            { value: 'isnotnull', key: this.l10n.getConstant('IsNotNull') }
        ];
        this.customOperators['stringOperator'] = this.customOperators['stringOperator'].concat(stringOper); // tslint:disable-line
        this.customOperators['numberOperator'] = this.customOperators['numberOperator'].concat(numberOper); // tslint:disable-line
        if (this.dataSource instanceof DataManager) {
            this.dataManager = this.dataSource;
            this.executeDataManager(new Query().take(1));
        }
        else {
            this.dataManager = new DataManager(this.dataSource);
            this.dataColl = this.dataManager.executeLocal(new Query());
            this.initControl();
        }
        this.renderComplete();
    };
    QueryBuilder.prototype.templateParser = function (template) {
        if (template) {
            try {
                if (typeof template !== 'function' && document.querySelectorAll(template).length) {
                    return templateCompiler(document.querySelector(template).innerHTML.trim());
                }
                else {
                    return compile(template);
                }
            }
            catch (error) {
                return templateCompiler(template);
            }
        }
        return undefined;
    };
    QueryBuilder.prototype.executeDataManager = function (query) {
        var _this = this;
        var data = this.dataManager.executeQuery(query);
        var deferred = new Deferred();
        data.then(function (e) {
            if (e.actual && e.actual.result) {
                _this.dataColl = e.actual.result;
            }
            else {
                _this.dataColl = e.result;
            }
            _this.initControl();
        }).catch(function (e) {
            deferred.reject(e);
        });
    };
    QueryBuilder.prototype.initControl = function () {
        this.initialize();
        this.initWrapper();
        this.wireEvents();
    };
    QueryBuilder.prototype.wireEvents = function () {
        var wrapper = this.getWrapper();
        EventHandler.add(wrapper, 'click', this.clickEventHandler, this);
        EventHandler.add(wrapper, 'focusout', this.focusEventHandler, this);
        EventHandler.add(wrapper, 'focusin', this.focusEventHandler, this);
        EventHandler.add(this.element, 'keydown', this.keyBoardHandler, this);
    };
    QueryBuilder.prototype.unWireEvents = function () {
        var wrapper = this.getWrapper();
        EventHandler.remove(wrapper, 'click', this.clickEventHandler);
        EventHandler.remove(wrapper, 'focusout', this.focusEventHandler);
        EventHandler.remove(wrapper, 'focusin', this.focusEventHandler);
        EventHandler.remove(this.element, 'keydown', this.keyBoardHandler);
    };
    QueryBuilder.prototype.getParentGroup = function (target, isParent) {
        var groupLevel = (target instanceof Element) ? this.levelColl[target.id] : this.levelColl["" + target];
        var len = isParent ? groupLevel.length - 1 : groupLevel.length;
        var rule = this.rule;
        for (var i = 0; i < len; i++) {
            rule = this.findGroupByIdx(groupLevel[i], rule, i === 0);
        }
        return rule;
    };
    /**
     * Delete the Group
     *
     * @param {Element | string} target - 'target' to be passed to delete the group.
     * @returns {void}
     */
    QueryBuilder.prototype.deleteGroup = function (target) {
        var _this = this;
        var groupElem = target;
        var groupId;
        if (typeof target === 'string') {
            groupId = this.element.id + '_' + target;
            target = document.getElementById(groupId);
        }
        else {
            groupId = groupElem.id.replace(this.element.id + '_', '');
        }
        var args = { groupID: groupId, cancel: false, type: 'deleteGroup' };
        if (!this.isImportRules) {
            this.trigger('beforeChange', args, function (observedChangeArgs) {
                _this.deleteGroupSuccessCallBack(observedChangeArgs, target);
            });
        }
        else {
            this.deleteGroupSuccessCallBack(args, target);
        }
    };
    QueryBuilder.prototype.deleteGroupSuccessCallBack = function (args, target) {
        if (!args.cancel) {
            var groupElem = target;
            var rule = this.getParentGroup(groupElem, true);
            var index = 0;
            var i = void 0;
            var len = void 0;
            var beforeRules = this.getValidRules(this.rule);
            var nextElem = groupElem.nextElementSibling;
            var prevElem = groupElem.previousElementSibling;
            var element = groupElem.querySelectorAll('.e-group-container');
            var valElem = groupElem.querySelectorAll('.e-tooltip');
            len = valElem.length;
            for (i = 0; i < len; i++) {
                getComponent(valElem[i], 'tooltip').destroy();
            }
            for (i = 0, len = element.length; i < len; i++) {
                delete this.levelColl[element[i].id];
            }
            while (groupElem.previousElementSibling !== null) {
                groupElem = groupElem.previousElementSibling;
                index++;
            }
            if (nextElem && nextElem.className.indexOf('e-separate-rule') > -1) {
                removeClass([nextElem], 'e-separate-rule');
                addClass([nextElem], 'e-joined-rule');
                if (prevElem && prevElem.className.indexOf('e-rule-container') > -1) {
                    addClass([prevElem], 'e-prev-joined-rule');
                }
            }
            var elem = groupElem.parentElement.parentElement.parentElement;
            var removeString = [];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (this.isReact || this.isAngular) {
                var remRule = rule.rules[index];
                var ruleElemColl = target.querySelectorAll('.e-rule-container');
                if (remRule && remRule.rules) {
                    for (var r = 0; r < remRule.rules.length; r++) {
                        var column = this.getColumn(remRule.rules[r].field);
                        var isTemplateRendered = ruleElemColl[r].querySelector('.e-template-value');
                        if (column && (column.ruleTemplate || (this.isPlatformTemplate(column) && isTemplateRendered))) {
                            removeString.push(ruleElemColl[r].id);
                        }
                    }
                }
            }
            detach(target);
            if (this.headerTemplate) {
                this.clearQBTemplate([target.id]);
            }
            if (removeString.length) {
                this.clearQBTemplate(removeString);
            }
            rule.rules.splice(index, 1);
            delete this.levelColl[args.groupID];
            this.refreshLevelColl();
            this.disableRuleCondition(elem, rule);
            if (!this.isImportRules) {
                this.trigger('change', args);
            }
            this.filterRules(beforeRules, this.getValidRules(this.rule), 'deleteGroup');
        }
    };
    QueryBuilder.prototype.isPlatformTemplate = function (column) {
        var isTemp = false;
        isTemp = column.template && (typeof column.template === 'string' || column.template.create === undefined);
        return isTemp;
    };
    QueryBuilder.prototype.deleteRule = function (target) {
        var _this = this;
        var groupElem = closest(target, '.e-group-container');
        var groupID = groupElem.id.replace(this.element.id + '_', '');
        var ruleID = closest(target, '.e-rule-container').id.replace(this.element.id + '_', '');
        var args = { groupID: groupID, ruleID: ruleID, cancel: false, type: 'deleteRule' };
        if (!this.isImportRules) {
            this.trigger('beforeChange', args, function (observedChangeArgs) {
                _this.deleteRuleSuccessCallBack(observedChangeArgs, target);
            });
        }
        else {
            this.deleteRuleSuccessCallBack(args, target);
        }
    };
    QueryBuilder.prototype.deleteRuleSuccessCallBack = function (args, target) {
        if (!args.cancel) {
            var groupElem = closest(target, '.e-group-container');
            var rule = this.getParentGroup(groupElem);
            var ruleElem = closest(target, '.e-rule-container');
            var beforeRules = this.getValidRules(this.rule);
            var clnruleElem = ruleElem;
            var nextElem = ruleElem.nextElementSibling;
            var prevElem = ruleElem.previousElementSibling;
            var index = 0;
            var valElem = ruleElem.querySelectorAll('.e-tooltip');
            var i = void 0;
            var len = valElem.length;
            for (i = 0; i < len; i++) {
                getComponent(valElem[i], 'tooltip').destroy();
            }
            while (ruleElem.previousElementSibling !== null) {
                ruleElem = ruleElem.previousElementSibling;
                index++;
            }
            var column = this.getColumn(rule.rules[index].field);
            if (column && column.template && clnruleElem.querySelector('.e-template')) {
                this.templateDestroy(column, clnruleElem.querySelector('.e-template').id);
            }
            if (!prevElem || prevElem.className.indexOf('e-rule-container') < 0) {
                if (nextElem) {
                    removeClass([nextElem], 'e-joined-rule');
                }
            }
            if (!nextElem || nextElem.className.indexOf('e-rule-container') < 0) {
                if (prevElem) {
                    removeClass([prevElem], 'e-prev-joined-rule');
                }
            }
            var isTemplateRendered = clnruleElem.querySelector('.e-template-value');
            // eslint-disable
            try {
                detach(clnruleElem);
            }
            catch (err) {
                // eslint-disable-next-line no-ex-assign
                err = [];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var error = 'error';
                // eslint-disable-next-line
                err[error] = error;
            }
            // eslint-enable
            if (column && column.ruleTemplate) {
                this.clearQBTemplate([clnruleElem.id]);
            }
            if (column && this.isPlatformTemplate(column) && isTemplateRendered) {
                this.clearQBTemplate([clnruleElem.id]);
            }
            rule.rules.splice(index, 1);
            if (!(rule.rules[0] && rule.rules[0].rules)) {
                this.disableRuleCondition(groupElem, rule);
            }
            if (!this.isImportRules) {
                this.trigger('change', args);
            }
            this.filterRules(beforeRules, this.getValidRules(this.rule), 'deleteRule');
        }
    };
    QueryBuilder.prototype.setGroupRules = function (rule, isRoot) {
        if (this.headerTemplate && isRoot) {
            this.isRoot = true;
        }
        this.reset();
        this.groupIdCounter = 1;
        this.ruleIdCounter = 0;
        this.isImportRules = true;
        this.rule = rule;
        rule = this.getRuleCollection(this.rule, false);
        this.importRules(this.rule, this.element.querySelector('.e-group-container'), true, this.rule.not, isRoot);
        this.isImportRules = false;
    };
    QueryBuilder.prototype.keyBoardHandler = function (e) {
        if (this.readonly && (e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 13)) {
            e.preventDefault();
        }
    };
    QueryBuilder.prototype.clearQBTemplate = function (ruleElemColl) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (this.isReact || this.isAngular) {
            this.clearTemplate(ruleElemColl);
        }
    };
    QueryBuilder.prototype.disableRuleCondition = function (groupElem, rules) {
        if (!this.headerTemplate) {
            if (this.readonly) {
                return;
            }
            var count = groupElem.querySelector('.e-rule-list').childElementCount;
            var andElem = groupElem.querySelector('.e-btngroup-and');
            var orElem = groupElem.querySelector('.e-btngroup-or');
            if (count > 1) {
                andElem.disabled = false;
                orElem.disabled = false;
                if (orElem.nextElementSibling.classList.contains('e-btn-disable') ||
                    andElem.nextElementSibling.classList.contains('e-btn-disable')) {
                    orElem.nextElementSibling.classList.remove('e-btn-disable');
                    andElem.nextElementSibling.classList.remove('e-btn-disable');
                }
                if (rules && rules.condition === 'or') {
                    orElem.checked = true;
                }
                else {
                    andElem.checked = true;
                }
            }
            else {
                andElem.checked = false;
                andElem.disabled = true;
                orElem.checked = false;
                orElem.disabled = true;
                if (rules) {
                    orElem.nextElementSibling.classList.add('e-btn-disable');
                    andElem.nextElementSibling.classList.add('e-btn-disable');
                }
            }
        }
    };
    /**
     * Get the valid rule or rules collection.
     *
     * @param {RuleModel} currentRule - 'currentRule' to be passed to get the valid rules.
     * @returns {RuleModel} - Valid rule or rules collection
     */
    QueryBuilder.prototype.getValidRules = function (currentRule) {
        if (!currentRule) {
            currentRule = this.getRules();
        }
        var ruleCondtion = currentRule.condition;
        var notCondition = currentRule.not;
        var ruleColl = extend([], currentRule.rules, [], true);
        var rule = this.getRuleCollection({ condition: ruleCondtion, rules: ruleColl, not: notCondition }, true);
        return rule;
    };
    QueryBuilder.prototype.getRuleCollection = function (rule, isValidRule) {
        if (isNullOrUndefined(rule)) {
            return null;
        }
        var orgRule;
        if (rule.rules && rule.rules.length && (Object.keys(rule.rules[0]).length > 6 || isValidRule)) {
            var jLen = rule.rules.length;
            for (var j = 0; j < jLen; j++) {
                orgRule = rule.rules[j];
                orgRule = this.getRuleCollection(orgRule, isValidRule);
                rule.rules[j] = orgRule;
                if (Object.keys(orgRule).length < 1 && isValidRule) {
                    rule.rules.splice(j, 1);
                    j--;
                    jLen--;
                }
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var customObj = rule.custom;
        if ((rule.field && rule.field !== '') && (isNullOrUndefined(customObj) || (customObj && (customObj.type !== 'question' &&
            customObj.type !== 'answer')))) {
            if (rule.operator) {
                if (rule.operator.toString().indexOf('null') > -1 || rule.operator.toString().indexOf('empty') > -1) {
                    rule.value = null;
                }
            }
            if ((this.isRefreshed && this.enablePersistence) || (rule.field !== '' && rule.operator !== '' && (rule.value !== '' &&
                rule.value !== undefined)) || (customObj && customObj.isQuestion)) {
                var condition = rule.condition;
                rule = {
                    'label': rule.label, 'field': rule.field, 'operator': rule.operator, 'type': rule.type, 'value': rule.value
                };
                if (condition) {
                    rule.condition = condition;
                }
                if (customObj) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    rule.custom = customObj;
                }
            }
            else {
                rule = {};
            }
        }
        else {
            if (customObj && (customObj.type === 'question' || customObj.type === 'answer')) {
                var notValue = rule.not;
                rule = { 'label': rule.label, 'field': rule.field, 'operator': rule.operator, 'type': rule.type, 'value': rule.value,
                    'condition': rule.condition, 'rules': rule.rules
                };
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                rule.custom = customObj;
                if (this.enableNotCondition) {
                    rule.not = notValue;
                }
            }
            else if ((isNullOrUndefined(rule.condition)) && isNullOrUndefined(rule.rules)) {
                rule = {};
            }
            else {
                if (this.enableNotCondition) {
                    rule = { 'condition': rule.condition, 'rules': rule.rules, 'not': rule.not };
                }
                else {
                    rule = { 'condition': rule.condition, 'rules': rule.rules };
                }
                if (customObj) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    rule.custom = customObj;
                }
                if (rule.rules.length === 0) {
                    rule = {};
                }
            }
        }
        return rule;
    };
    /**
     * Set the rule or rules collection.
     *
     * @param {RuleModel} rule - 'rule' to be passed to set rules.
     * @returns {void}.
     */
    QueryBuilder.prototype.setRules = function (rule) {
        var mRules = extend({}, rule, {}, true);
        if (this.headerTemplate) {
            this.setGroupRules(mRules, true);
        }
        else {
            this.setGroupRules(mRules);
        }
    };
    /**
     * Gets the rule or rule collection.
     *
     * @returns {object} - Rule or rule collection
     */
    QueryBuilder.prototype.getRules = function () {
        var rule;
        if (this.enableNotCondition) {
            rule = { condition: this.rule.condition, rules: this.rule.rules, not: this.rule.not };
        }
        else {
            rule = { condition: this.rule.condition, rules: this.rule.rules };
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (this.rule.custom) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            rule.custom = this.rule.custom;
        }
        return rule;
    };
    /**
     * Gets the rule.
     *
     * @param {string | HTMLElement} elem - 'elem' to be passed to get rule.
     * @returns {object} - Rule
     */
    QueryBuilder.prototype.getRule = function (elem) {
        var ruleElem;
        var ruleId;
        var index = 0;
        if (elem instanceof HTMLElement) {
            ruleElem = closest(elem, '.e-rule-container');
        }
        else {
            ruleId = this.element.id + '_' + elem;
            ruleElem = document.getElementById(ruleId);
        }
        var groupElem = closest(ruleElem, '.e-group-container');
        var rule = this.getParentGroup(groupElem);
        while (ruleElem.previousElementSibling !== null) {
            ruleElem = ruleElem.previousElementSibling;
            index++;
        }
        return rule.rules[index];
    };
    /**
     * Gets the group.
     *
     * @param {string | Element} target - 'target' to be passed to get group.
     * @returns {object} -Group
     */
    QueryBuilder.prototype.getGroup = function (target) {
        if (target instanceof Element && target.className.indexOf('e-group-container') < 1) {
            target = closest(target, '.e-group-container');
        }
        var groupId = (target instanceof Element) ? target.id : this.element.id + '_' + target;
        var rule = this.getParentGroup(groupId);
        return rule;
    };
    /**
     * Deletes the group or groups based on the group ID.
     *
     * @param {string[]} groupIdColl - 'groupIdColl' to be passed to delete groups.
     * @returns {void}
     */
    QueryBuilder.prototype.deleteGroups = function (groupIdColl) {
        var i;
        var len = groupIdColl.length;
        var groupID;
        for (i = 0; i < len; i++) {
            groupID = this.element.id + '_' + groupIdColl[i];
            this.deleteGroup(document.getElementById(groupID));
        }
    };
    /**
     * Return the Query from current rules collection.
     *
     * @returns {Promise} - Query from current rules collection
     * @blazorType object
     */
    QueryBuilder.prototype.getFilteredRecords = function () {
        var predicate = this.getPredicate(this.getValidRules(this.rule));
        var dataManagerQuery = isNullOrUndefined(predicate) ? new Query() : new Query().where(predicate);
        return this.dataManager.executeQuery(dataManagerQuery);
    };
    /**
     * Deletes the rule or rules based on the rule ID.
     *
     * @param {string[]} ruleIdColl - 'ruleIdColl' to be passed to delete rules.
     * @returns {void}.
     */
    QueryBuilder.prototype.deleteRules = function (ruleIdColl) {
        var i;
        var len = ruleIdColl.length;
        var ruleID;
        for (i = 0; i < len; i++) {
            ruleID = this.element.id + '_' + ruleIdColl[i];
            this.deleteRule(document.getElementById(ruleID));
        }
    };
    /**
     * Gets the query for Data Manager.
     *
     * @param {RuleModel} rule - 'rule' to be passed to get query.
     * @returns {string} - Query for Data Manager
     */
    QueryBuilder.prototype.getDataManagerQuery = function (rule) {
        var predicate = this.getPredicate(rule);
        var query;
        var fields = [];
        for (var i = 0, len = Object.keys(this.columns); i < len.length; i++) {
            fields.push(this.columns[i].field);
        }
        if (rule.rules.length) {
            query = new Query().select(fields).where(predicate);
        }
        else {
            query = new Query().select(fields);
        }
        return query;
    };
    /**
     * Get the predicate from collection of rules.
     *
     * @param {RuleModel} rule - 'rule' to be passed to get predicate.
     * @returns {Predicate} - Predicate from collection of rules
     */
    QueryBuilder.prototype.getPredicate = function (rule) {
        var ruleColl = rule.rules;
        var pred;
        var pred2;
        var ruleValue;
        var ignoreCase = false;
        var column;
        var ignoreOper = ['notcontains', 'notstartswith', 'notendswith'];
        if (!ruleColl) {
            return pred;
        }
        for (var i = 0, len = ruleColl.length; i < len; i++) {
            var keys = Object.keys(ruleColl[i]);
            ignoreCase = false;
            if (keys.indexOf('rules') > -1 && ruleColl[i].rules) {
                pred2 = this.getPredicate(ruleColl[i]);
                if (pred2) {
                    if (pred) {
                        if (rule.condition === 'and') {
                            pred = pred.and(pred2);
                        }
                        else {
                            pred = pred.or(pred2);
                        }
                    }
                    else {
                        pred = pred2;
                    }
                }
            }
            else if (!isNullOrUndefined(ruleColl[i].operator) && !isNullOrUndefined(ruleColl[i].operator.length)) {
                var oper = ruleColl[i].operator.toLowerCase();
                var isDateFilter = false;
                var dateOperColl = ['equal', 'notequal', 'greaterthan', 'greaterthanorequal', 'lessthan', 'lessthanorequal'];
                if (ruleColl[i].type === 'string') {
                    ignoreCase = this.matchCase ? false : true;
                }
                if (ruleColl[i].type === 'date' && dateOperColl.indexOf(oper) > -1) {
                    ignoreCase = true;
                }
                column = this.getColumn(ruleColl[i].field);
                if (oper.indexOf('null') > -1 || oper.indexOf('empty') > -1) {
                    ruleColl[i].value = null;
                }
                else if (ruleColl[i].type === 'date' && !(ruleColl[i].value instanceof Array)) {
                    var format = this.getFormat(column.format);
                    if (!isNullOrUndefined(ruleColl[i].value)) {
                        ruleValue = this.getDate(ruleColl[i].value, format);
                        if (dateOperColl.indexOf(oper) > -1 && !this.isTime(ruleColl[i].value)) {
                            isDateFilter = true;
                        }
                    }
                    else {
                        ruleValue = null;
                    }
                }
                else {
                    ruleValue = ruleColl[i].value;
                }
                if (i === 0) {
                    if (isDateFilter || (oper.indexOf('in') > -1 || oper.indexOf('between') > -1 || oper.indexOf('null') > -1 ||
                        oper.indexOf('empty') > -1) && oper.indexOf('contains') < 0) {
                        pred = isDateFilter ? this.datePredicate(ruleColl[i], ruleValue) :
                            this.arrayPredicate(ruleColl[i]);
                    }
                    else {
                        var value = ruleValue;
                        if (value !== '' && ignoreOper.indexOf(oper) < 0) {
                            pred = new Predicate(ruleColl[i].field, ruleColl[i].operator, ruleValue, ignoreCase);
                        }
                    }
                }
                else {
                    if (ignoreOper.indexOf(oper) > -1) {
                        continue;
                    }
                    if (isDateFilter || (oper.indexOf('in') > -1 || oper.indexOf('between') > -1 ||
                        oper.indexOf('null') > -1 || oper.indexOf('empty') > -1) && oper.indexOf('contains') < 0) {
                        pred = isDateFilter ? this.datePredicate(ruleColl[i], ruleValue, pred, rule.condition) :
                            this.arrayPredicate(ruleColl[i], pred, rule.condition);
                    }
                    else {
                        if (rule.condition === 'and') {
                            var value = ruleValue;
                            if (pred && value !== '') {
                                pred
                                    = pred.and(ruleColl[i].field, ruleColl[i].operator, ruleValue, ignoreCase);
                            }
                            else if (value !== '') {
                                pred = new Predicate(ruleColl[i].field, ruleColl[i].operator, ruleValue, ignoreCase);
                            }
                        }
                        else {
                            var value = ruleValue;
                            if (pred && value !== '') {
                                pred = pred.or(ruleColl[i].field, ruleColl[i].operator, ruleValue, ignoreCase);
                            }
                            else if (value !== '') {
                                pred = new Predicate(ruleColl[i].field, ruleColl[i].operator, ruleValue, ignoreCase);
                            }
                        }
                    }
                }
            }
        }
        if (this.dataSource instanceof DataManager) {
            if (!isNullOrUndefined(pred) && (pred.operator === 'isnull' || pred.operator === 'isnotnull')) {
                pred.operator = pred.operator === 'isnull' ? 'equal' : 'notequal';
            }
        }
        return pred;
    };
    QueryBuilder.prototype.getLocale = function () {
        var gregorianFormat = '.dates.calendars.gregorian.days.format.short';
        var localeString = this.locale;
        var mainVal = 'main.';
        var cultureObj = getValue(mainVal + '' + this.locale + gregorianFormat, cldrData);
        if (!cultureObj) {
            localeString = 'en';
        }
        return localeString;
    };
    QueryBuilder.prototype.getColumn = function (field, col) {
        var columns = this.columns;
        var column;
        columns = col ? col : columns;
        for (var i = 0, iLen = columns.length; i < iLen; i++) {
            if (columns[i].field === field) {
                column = columns[i];
                break;
            }
            else if (columns[i].columns) {
                column = this.getColumn(field, columns[i].columns);
                if (column) {
                    break;
                }
            }
            else if (field && field.indexOf(this.separator) > -1) {
                if (this.separator !== '' && columns[i].field === field.split(this.separator)[0]) {
                    column = columns[i];
                    break;
                }
            }
        }
        return column;
    };
    /* eslint-disable */
    /**
     * Return the operator bound to the column.
     *
     * @returns {[key: string]: Object}[] - Operator bound to the column
     */
    /* eslint-enable */
    QueryBuilder.prototype.getOperators = function (field) {
        var column = this.getColumn(field);
        return column.operators;
    };
    QueryBuilder.prototype.setTime = function (date, isStart) {
        if (isStart) {
            date.setHours(0, 0, 0);
        }
        else {
            date.setHours(23, 59, 59);
        }
        return date;
    };
    QueryBuilder.prototype.datePredicate = function (ruleColl, value, predicate, condition) {
        var pred;
        var startDate = this.setTime(new Date(value.getTime()), true);
        var endDate = this.setTime(value);
        switch (ruleColl.operator) {
            case 'equal':
                pred = new Predicate(ruleColl.field, 'greaterthanorequal', startDate);
                pred = pred.and(ruleColl.field, 'lessthanorequal', endDate);
                break;
            case 'notequal':
                pred = new Predicate(ruleColl.field, 'lessthan', startDate);
                pred = pred.or(ruleColl.field, 'greaterthan', endDate);
                break;
            case 'greaterthan':
                pred = new Predicate(ruleColl.field, 'greaterthan', endDate);
                break;
            case 'greaterthanorequal':
                pred = new Predicate(ruleColl.field, 'greaterthanorequal', startDate);
                break;
            case 'lessthan':
                pred = new Predicate(ruleColl.field, 'lessthan', startDate);
                break;
            case 'lessthanorequal':
                pred = new Predicate(ruleColl.field, 'lessthanorequal', endDate);
                break;
        }
        if (pred) {
            if (predicate) {
                if (condition === 'and') {
                    predicate = predicate.and(pred);
                }
                else if (condition === 'or') {
                    predicate = predicate.or(pred);
                }
            }
            else {
                predicate = pred;
            }
        }
        return predicate;
    };
    QueryBuilder.prototype.arrayPredicate = function (ruleColl, predicate, condition) {
        var value = ruleColl.value;
        var operator = ruleColl.operator.toString();
        var nullValue = ruleColl.value;
        var pred;
        var column = this.getColumn(ruleColl.field);
        var format = this.getFormat(column.format);
        if (operator.indexOf('null') > -1 || operator.indexOf('empty') > -1) {
            switch (operator) {
                case 'isnull':
                    pred = new Predicate(ruleColl.field, 'isnull', nullValue);
                    break;
                case 'isnotnull':
                    pred = new Predicate(ruleColl.field, 'isnotnull', nullValue);
                    break;
                case 'isempty':
                    pred = new Predicate(ruleColl.field, 'equal', '');
                    break;
                case 'isnotempty':
                    pred = new Predicate(ruleColl.field, 'notequal', '');
                    break;
            }
        }
        if (!(operator.indexOf('null') > -1 || operator.indexOf('empty') > -1)) {
            for (var j = 0, jLen = value.length; j < jLen; j++) {
                if (value[j] !== '' || ((operator === 'in' || operator === 'notin') && column.type === 'string')) {
                    if (j === 0) {
                        var gte = 'greaterthanorequal';
                        switch (operator) {
                            case 'between':
                                if (column.type !== 'date') {
                                    pred = new Predicate(ruleColl.field, gte, value[j]);
                                }
                                else {
                                    pred = new Predicate(ruleColl.field, gte, value[j] ?
                                        (this.isTime(value[j]) ? this.getDate(value[j], format) :
                                            this.setTime(this.getDate(value[j], format), true)) : null);
                                }
                                break;
                            case 'notbetween':
                                if (column.type === 'date') {
                                    pred = new Predicate(ruleColl.field, 'lessthan', value[j] ?
                                        (this.isTime(value[j]) ? this.getDate(value[j], format) :
                                            this.setTime(this.getDate(value[j], format), true)) : null);
                                }
                                else {
                                    pred = new Predicate(ruleColl.field, 'lessthan', value[j]);
                                }
                                break;
                            case 'in':
                                pred = new Predicate(ruleColl.field, 'equal', value[j]);
                                break;
                            case 'notin':
                                pred = new Predicate(ruleColl.field, 'notequal', value[j]);
                                break;
                        }
                    }
                    else {
                        var gt = 'greaterthan';
                        switch (ruleColl.operator) {
                            case 'between':
                                if (column.type === 'date') {
                                    pred = pred.and(ruleColl.field, 'lessthanorequal', value[j] ?
                                        (this.isTime(value[j]) ? this.getDate(value[j], format) :
                                            this.setTime(this.getDate(value[j], format))) : value[j]);
                                }
                                else {
                                    pred = pred.and(ruleColl.field, 'lessthanorequal', value[j]);
                                }
                                break;
                            case 'notbetween':
                                if (column.type === 'date') {
                                    pred = pred.or(ruleColl.field, gt, value[j] ?
                                        (this.isTime(value[j]) ? this.getDate(value[j], format) :
                                            this.setTime(this.getDate(value[j], format))) : value[j]);
                                }
                                else {
                                    pred = pred.or(ruleColl.field, 'greaterthan', value[j]);
                                }
                                break;
                            case 'in':
                                pred = pred.or(ruleColl.field, 'equal', value[j]);
                                break;
                            case 'notin':
                                pred = pred.and(ruleColl.field, 'notequal', value[j]);
                                break;
                        }
                    }
                }
            }
        }
        if (pred) {
            if (predicate) {
                if (condition === 'and') {
                    predicate = predicate.and(pred);
                }
                else if (condition === 'or') {
                    predicate = predicate.or(pred);
                }
            }
            else {
                predicate = pred;
            }
        }
        return predicate;
    };
    QueryBuilder.prototype.getDate = function (value, format) {
        var currDate = this.intl.parseDate(value, format);
        if (value.indexOf(':') > -1 && (value.indexOf('/') < 0 && value.indexOf(',') < 0
            && value.indexOf('-') < 0)) {
            currDate = new Date();
            // eslint-disable-next-line
            currDate.setHours(parseInt(value.split(':')[0]));
            // eslint-disable-next-line
            currDate.setMinutes(parseInt(value.split(':')[1]));
            if (value.split(':')[2]) {
                // eslint-disable-next-line
                currDate.setSeconds(parseInt(value.split(':')[2]));
            }
        }
        return currDate;
    };
    QueryBuilder.prototype.isTime = function (value) {
        if (value && value.indexOf(':') > -1) {
            return true;
        }
        return false;
    };
    QueryBuilder.prototype.importRules = function (rule, parentElem, isReset, not, isRoot) {
        if (!isReset) {
            parentElem = this.renderGroup(rule, rule.condition, parentElem, not);
        }
        else {
            if (rule.rules.length > 1 && !this.headerTemplate) {
                // enable/disable conditions when rule group is added
                var orElem = parentElem.querySelector('.e-btngroup-or');
                var andElem = parentElem.querySelector('.e-btngroup-and');
                orElem.disabled = false;
                andElem.disabled = false;
                if (rule.condition === 'or') {
                    orElem.checked = true;
                }
                else {
                    andElem.checked = true;
                }
            }
            else {
                // enable/disable conditions when rule condition is added
                this.disableRuleCondition(parentElem);
            }
            if (this.headerTemplate && isRoot) {
                parentElem = this.renderGroup(rule, rule.condition, this.element, rule.not, isRoot);
            }
            if (this.enableNotCondition && !this.headerTemplate) {
                var tglBtnElem = parentElem.querySelector('.e-qb-toggle');
                if (rule.not) {
                    addClass([tglBtnElem], 'e-active-toggle');
                }
                else {
                    removeClass([tglBtnElem], 'e-active-toggle');
                }
            }
        }
        if (rule.rules.length === 0 && this.headerTemplate) {
            rule.rules[0] = { 'label': '', 'field': '', 'operator': '', 'type': '', 'value': '' };
        }
        var ruleColl = rule.rules;
        if (!isNullOrUndefined(ruleColl)) {
            for (var i = 0, len = ruleColl.length; i < len; i++) {
                var keys = Object.keys(ruleColl[i]);
                if (!isNullOrUndefined(ruleColl[i].rules) && keys.indexOf('rules') > -1 && (ruleColl[i].rules.length !== 0)) {
                    parentElem = this.renderGroup(ruleColl[i], ruleColl[i].condition, parentElem, ruleColl[i].not);
                    parentElem = this.importRules(ruleColl[i], parentElem, true);
                }
                else {
                    this.renderRule(ruleColl[i], parentElem);
                }
            }
        }
        parentElem = closest(parentElem, '.e-rule-list');
        if (parentElem) {
            parentElem = closest(parentElem, '.e-group-container');
        }
        return parentElem;
    };
    QueryBuilder.prototype.renderGroup = function (rule, condition, parentElem, not, isRoot) {
        this.addGroupElement(true, parentElem, condition, false, not, isRoot, rule); //Child group
        var element = parentElem.querySelectorAll('.e-group-container');
        return element[element.length - 1];
    };
    QueryBuilder.prototype.renderRule = function (rule, parentElem) {
        if (parentElem.className.indexOf('e-group-container') > -1) {
            this.addRuleElement(parentElem, rule); //Create rule
        }
        else {
            this.addRuleElement(parentElem.querySelector('.e-group-container'), rule); //Create group
        }
    };
    QueryBuilder.prototype.enableReadonly = function () {
        var target = this.element;
        var elem = target.querySelectorAll('.e-dropdownlist, .e-numerictextbox, .e-textbox, .e-datepicker, .e-multiselect .e-lib, .e-radio');
        for (var i = 0; i < elem.length; i++) {
            if (elem[i].classList.contains('e-dropdownlist')) {
                var dropDownObj = getInstance(elem[i], DropDownList);
                dropDownObj.readonly = this.isReadonly;
            }
            else if (elem[i].classList.contains('e-numerictextbox')) {
                var numericTextBoxObj = getInstance(elem[i], NumericTextBox);
                numericTextBoxObj.readonly = this.isReadonly;
            }
            else if (elem[i].classList.contains('e-textbox')) {
                var textBoxObj = getInstance(elem[i], TextBox);
                textBoxObj.readonly = this.isReadonly;
            }
            else if (elem[i].classList.contains('e-datepicker')) {
                var datePickerObj = getInstance(elem[i], DatePicker);
                datePickerObj.readonly = this.isReadonly;
            }
            else if (elem[i].classList.contains('e-multiselect')) {
                var multiSelectObj = getInstance(elem[i], MultiSelect);
                multiSelectObj.readonly = this.isReadonly;
            }
            else if (elem[i].classList.contains('e-radio')) {
                var radioButtonObj = getInstance(elem[i], RadioButton);
                if (!radioButtonObj.checked) {
                    if (this.isReadonly) {
                        elem[i].parentElement.style.display = 'none';
                    }
                    else {
                        elem[i].parentElement.style.display = 'inherit';
                    }
                }
            }
        }
        var deleteGroupElems = this.element.querySelectorAll('.e-deletegroup');
        var addRuleGroupElems = this.element.querySelectorAll('.e-addrulegroup');
        var removeRuleElems = this.element.querySelectorAll('.e-removerule');
        if (!this.isReadonly && this.ruleElem.classList.contains('e-readonly')) {
            this.ruleElem.classList.remove('e-readonly');
        }
        var elems = [deleteGroupElems, addRuleGroupElems, removeRuleElems];
        for (var i = 0; i < elems.length; i++) {
            elems[i].forEach(function (elem) {
                if (elem.classList.contains('e-readonly')) {
                    elem.classList.remove('e-readonly');
                }
                else {
                    elem.classList.add('e-readonly');
                }
            });
        }
        this.enableBtnGroup();
    };
    QueryBuilder.prototype.enableBtnGroup = function () {
        var _this = this;
        var elems = this.element.querySelectorAll('.e-btngroup-and-lbl, .e-btngroup-or-lbl, .e-qb-toggle');
        var not = false;
        elems.forEach(function (elem) {
            if (elem.classList.contains('e-qb-toggle') && !elem.classList.contains('e-active-toggle')
                && !elem.classList.contains('e-readonly')) {
                elem.classList.add('e-readonly');
                not = false;
            }
            else if (elem.classList.contains('e-qb-toggle') && elem.classList.contains('e-not-readonly')) {
                elem.classList.remove('e-not-readonly');
            }
            else if (elem.classList.contains('e-qb-toggle') && elem.classList.contains('e-readonly')) {
                elem.classList.remove('e-readonly');
            }
            else if (elem.classList.contains('e-active-toggle')) {
                elem.classList.add('e-not-readonly');
                not = true;
            }
            else if (elem.previousElementSibling.checked || elem.classList.contains('e-readonly')) {
                elem.classList.remove('e-readonly');
                if (not) {
                    if (elem.textContent === 'AND') {
                        elem.classList.add('e-readonly-and');
                    }
                    else {
                        elem.classList.add('e-readonly-or');
                    }
                }
                else {
                    if (elem.textContent === 'AND' && _this.isReadonly) {
                        elem.classList.remove('e-not');
                        elem.classList.add('e-readonly-and');
                    }
                    else {
                        if (_this.enableNotCondition) {
                            elem.classList.add('e-not');
                        }
                        elem.classList.remove('e-readonly-and');
                    }
                    if (elem.textContent === 'OR' && _this.isReadonly) {
                        elem.classList.add('e-readonly-or-not');
                    }
                    else {
                        elem.classList.remove('e-readonly-or-not');
                    }
                }
            }
            else if (elem.classList.contains('e-btn-disable')) {
                // do nothing
            }
            else {
                elem.classList.add('e-readonly');
            }
        });
    };
    QueryBuilder.prototype.isDateFunction = function (value) {
        var dateFunc = ['date', 'time', 'day', 'week', 'month', 'year', 'hour', 'minute', 'second', 'now', 'quarter', 'period', 'extract'];
        for (var i = 0, len = dateFunc.length; i < len; i++) {
            if (value.toLowerCase().indexOf(dateFunc[i]) > -1) {
                return true;
            }
        }
        return false;
    };
    QueryBuilder.prototype.getSqlString = function (rules, enableEscape, queryStr, sqlLocale) {
        var isRoot = false;
        if (!queryStr && queryStr !== '') {
            queryStr = '';
            isRoot = true;
        }
        else {
            queryStr += '(';
        }
        var condition = rules.condition;
        if (rules.not) {
            var rulesNotCondition = void 0;
            if (isRoot) {
                rulesNotCondition = sqlLocale ? this.l10n.getConstant('NOT').toUpperCase() + ' (' : 'NOT (';
                queryStr += rulesNotCondition;
            }
            else {
                rulesNotCondition = sqlLocale ? ' ' + this.l10n.getConstant('NOT').toUpperCase() + ' (' : ' NOT (';
                queryStr += rulesNotCondition;
            }
        }
        if (rules.rules) {
            for (var j = 0, jLen = rules.rules.length; j < jLen; j++) {
                if (rules.rules[j].rules) {
                    queryStr = this.getSqlString(rules.rules[j], enableEscape, queryStr, sqlLocale);
                }
                else {
                    var rule = rules.rules[j];
                    var valueStr = '';
                    var ruleOpertor = sqlLocale ? this.sqlOperators[rule.operator] : this.operators[rule.operator];
                    if (rule.value instanceof Array) {
                        if (rule.operator.toString().indexOf('between') > -1) {
                            var ruleCondition = sqlLocale ? ' ' + this.l10n.getConstant('AND').toUpperCase() + ' ' : ' ' + 'AND' + ' ';
                            if (rule.type === 'date' && !this.isDateFunction(rule.value[0])) {
                                valueStr += '"' + rule.value[0] + '"' + ruleCondition + '"' + rule.value[1] + '"';
                            }
                            else {
                                valueStr += rule.value[0] + ruleCondition + rule.value[1];
                            }
                        }
                        else {
                            if (typeof rule.value[0] === 'string' && rule.value !== null) {
                                valueStr += '("' + rule.value[0] + '"';
                                for (var k = 1, kLen = rule.value.length; k < kLen; k++) {
                                    valueStr += ',"' + rule.value[k] + '"';
                                }
                                valueStr += ')';
                            }
                            else {
                                valueStr += '(' + rule.value + ')';
                            }
                        }
                    }
                    else {
                        if (rule.operator.toString().indexOf('startswith') > -1) {
                            valueStr += rule.value ? '("' + rule.value + '%")' : '(' + rule.value + ')';
                        }
                        else if (rule.operator.toString().indexOf('endswith') > -1) {
                            valueStr += rule.value ? '("%' + rule.value + '")' : '(' + rule.value + ')';
                        }
                        else if (rule.operator.toString().indexOf('contains') > -1) {
                            valueStr += rule.value ? '("%' + rule.value + '%")' : '(' + rule.value + ')';
                        }
                        else {
                            if (rule.type === 'number' || typeof rule.value === 'boolean' || rule.value === null) {
                                valueStr += rule.value;
                            }
                            else {
                                valueStr += '"' + rule.value + '"';
                            }
                        }
                    }
                    if (rule.operator.toString().indexOf('null') > -1 || (rule.operator.toString().indexOf('empty') > -1)) {
                        if (enableEscape) {
                            rule.field = '`' + rule.field + '`';
                        }
                        else {
                            if (rule.field.indexOf(' ') > -1) {
                                rule.field = '"' + rule.field + '"';
                            }
                        }
                        queryStr += rule.field + ' ' + ruleOpertor;
                    }
                    else {
                        if (enableEscape) {
                            rule.field = '`' + rule.field + '`';
                        }
                        else {
                            if (rule.field.indexOf(' ') > -1) {
                                rule.field = '"' + rule.field + '"';
                            }
                        }
                        queryStr += rule.field + ' ' + ruleOpertor + ' ' + valueStr;
                    }
                    if (rule.condition && rule.condition !== '') {
                        condition = rule.condition;
                    }
                }
                if (j !== jLen - 1) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    var rule = rules.rules[j];
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    if (condition === '' || (rule && rule.condition !== '' && rule.custom && rule.custom.isCustom)) {
                        condition = rule.condition;
                    }
                    condition = sqlLocale ? this.l10n.getConstant(condition.toUpperCase()).toUpperCase() : condition.toUpperCase();
                    queryStr += ' ' + condition + ' ';
                }
            }
        }
        if (!isRoot) {
            queryStr += ')';
        }
        if (rules.not) {
            queryStr += ')';
        }
        return queryStr;
    };
    /**
     * Sets the rules from the sql query.
     *
     * @param {string} sqlString - 'sql String' to be passed to set the rule.
     * @param {boolean} sqlLocale -  Set `true` if Localization for Sql query.
     * @returns {void}
     */
    QueryBuilder.prototype.setRulesFromSql = function (sqlString, sqlLocale) {
        sqlString = sqlString.replace(/`/g, '');
        var ruleModel = this.getRulesFromSql(sqlString, sqlLocale);
        this.setRules({ condition: ruleModel.condition, not: ruleModel.not, rules: ruleModel.rules });
    };
    /**
     * Get the rules from SQL query.
     *
     * @param {string} sqlString - 'sql String' to be passed to get the rule.
     * @param {boolean} sqlLocale - Set `true` if Localization for Sql query.
     * @returns {object} - Rules from SQL query
     */
    QueryBuilder.prototype.getRulesFromSql = function (sqlString, sqlLocale) {
        this.parser = [];
        this.sqlParser(sqlString, sqlLocale);
        this.rule = { condition: 'and', not: false, rules: [] };
        var rule = this.processParser(this.parser, this.rule, [0], sqlLocale);
        if (this.enableNotCondition) {
            return { condition: rule.condition, not: rule.not, rules: rule.rules };
        }
        else {
            return { condition: rule.condition, rules: rule.rules };
        }
    };
    /**
     * Gets the sql query from rules.
     *
     * @param {RuleModel} rule - 'rule' to be passed to get the sql.
     * @param {boolean} allowEscape - Set `true` if it exclude the escape character.
     *  @param {boolean} sqlLocale - Set `true` if Localization for Sql query.
     * @returns {object} - Sql query from rules.
     */
    QueryBuilder.prototype.getSqlFromRules = function (rule, allowEscape, sqlLocale) {
        if (!rule) {
            rule = this.getValidRules();
        }
        rule = this.getRuleCollection(rule, false);
        return this.getSqlString(this.getValidRules(rule), allowEscape, null, sqlLocale).replace(/"/g, '\'');
    };
    QueryBuilder.prototype.sqlParser = function (sqlString, sqlLocale) {
        var st = 0;
        var str;
        do {
            str = sqlString.slice(st);
            st += this.parseSqlStrings(str, sqlLocale);
        } while (str !== '');
        return this.parser;
    };
    QueryBuilder.prototype.parseSqlStrings = function (sqlString, sqlLocale) {
        var operators = ['=', '!=', '<=', '>=', '<', '>'];
        var conditions;
        if (sqlLocale) {
            conditions = [this.l10n.getConstant('AND').toUpperCase(), this.l10n.getConstant('OR').toUpperCase(), this.l10n.getConstant('NOT').toUpperCase()];
        }
        else {
            conditions = ['AND', 'OR', 'NOT'];
        }
        var subOp;
        if (sqlLocale) {
            subOp = [this.l10n.getConstant('In').toUpperCase(), this.l10n.getConstant('NotIn').toUpperCase(),
                this.l10n.getConstant('Like').toUpperCase(), this.l10n.getConstant('NotLike').toUpperCase(),
                this.l10n.getConstant('Between').toUpperCase(), this.l10n.getConstant('NotBetween').toUpperCase(),
                this.l10n.getConstant('IsNull').toUpperCase(), this.l10n.getConstant('IsNotNull').toUpperCase(),
                this.l10n.getConstant('IsEmpty').toUpperCase(), this.l10n.getConstant('IsNotEmpty').toUpperCase()];
        }
        else {
            subOp = ['IN', 'NOT IN', 'LIKE', 'NOT LIKE', 'BETWEEN', 'NOT BETWEEN', 'IS NULL', 'IS NOT NULL', 'IS EMPTY', 'IS NOT EMPTY'];
        }
        var regexStr;
        var regex;
        var matchValue;
        for (var i = 0, iLen = operators.length; i < iLen; i++) {
            regexStr = /^\w+$/.test(operators[i]) ? '\\b' : '';
            // eslint-disable-next-line
            regex = new RegExp('^(' + operators[i] + ')' + regexStr, 'ig');
            if (regex.exec(sqlString)) {
                this.parser.push(['Operators', operators[i].toLowerCase()]);
                return operators[i].length;
            }
        }
        var lastPasrser = this.parser[this.parser.length - 1];
        if (!lastPasrser || (lastPasrser && lastPasrser[0] !== 'Literal')) {
            for (var i = 0, iLen = conditions.length; i < iLen; i++) {
                regexStr = /^\w+$/.test(conditions[i]) ? '\\b' : '';
                // eslint-disable-next-line
                regex = new RegExp('^(' + conditions[i] + ')' + regexStr, 'ig');
                if (regex.exec(sqlString)) {
                    this.parser.push(['Conditions', conditions[i].toLowerCase()]);
                    return conditions[i].length;
                }
            }
        }
        for (var i = 0, iLen = subOp.length; i < iLen; i++) {
            regexStr = /^\w+$/.test(subOp[i]) ? '\\b' : '';
            // eslint-disable-next-line
            regex = new RegExp('^(' + subOp[i] + ')' + regexStr, 'ig');
            if (regex.exec(sqlString)) {
                this.parser.push(['SubOperators', subOp[i].toLowerCase()]);
                return subOp[i].length;
            }
        }
        //Left Parenthesis
        if (/^\(/.exec(sqlString)) {
            this.parser.push(['Left', '(']);
            return 1;
        }
        //Right Parenthesis
        if (/^\)/.exec(sqlString)) {
            this.parser.push(['Right', ')']);
            return 1;
        }
        //Boolean
        if (/^(true|false)/.exec(sqlString)) {
            matchValue = /^(true|false)/.exec(sqlString)[0];
            this.parser.push(['String', matchValue]);
            return matchValue.length;
        }
        //Null
        if (/^null/.exec(sqlString)) {
            matchValue = /^null/.exec(sqlString)[0];
            this.parser.push(['String', null]);
            return matchValue.length;
        }
        // eslint-disable-next-line
        if (/^`?([a-z_][a-z0-9_.\[\]\(\)]{0,}(\:(number|float|string|date|boolean))?)`?/i.exec(sqlString)) {
            // eslint-disable-next-line
            matchValue = /^`?([a-zåäö_][a-z0-9åäö_.\[\]\(\)]{0,}(\:(number|float|string|date|boolean))?)`?/i.exec(sqlString)[1];
            this.parser.push(['Literal', matchValue]);
            return matchValue.length;
        }
        // eslint-disable-next-line
        if (this.checkLiteral() && /^'?([a-z_][a-z0-9 _.\[\]\(\)]{0,}(\:(number|float|string|date|boolean))?)'?/i.exec(sqlString)) {
            // eslint-disable-next-line
            matchValue = /^'?([a-z_][a-z0-9 _.\[\]\(\)]{0,}(\:(number|float|string|date|boolean))?)'?/i.exec(sqlString)[1];
            this.parser.push(['Literal', matchValue]);
            return matchValue.length + 2;
        }
        if (this.checkNumberLiteral(sqlString, sqlLocale)) {
            // eslint-disable-next-line
            matchValue = /^[0-9]+(\.[0-9]+)?/.exec(sqlString)[0];
            this.parser.push(['Literal', matchValue]);
            return matchValue.length;
        }
        //String
        // eslint-disable-next-line
        if (/^'((?:[^\\']+?|\\.|'')*)'(?!')/.exec(sqlString)) {
            // eslint-disable-next-line
            matchValue = /^'((?:[^\\']+?|\\.|'')*)'(?!')/.exec(sqlString)[0];
            if (matchValue[matchValue.length - 2] === '(') {
                var isClosed = false;
                for (var j = matchValue.length; j < sqlString.length; j++) {
                    matchValue += sqlString[j];
                    if (sqlString[j] === ')') {
                        isClosed = true;
                    }
                    if (isClosed && sqlString[j] === '\'') {
                        break;
                    }
                }
            }
            this.parser.push(['String', matchValue]);
            return matchValue.length;
        }
        // Double String
        // eslint-disable-next-line
        if (/^"([^\\"]*(?:\\.[^\\"]*)*)"/.exec(sqlString)) {
            // eslint-disable-next-line
            matchValue = /^"([^\\"]*(?:\\.[^\\"]*)*)"/.exec(sqlString)[0];
            this.parser.push(['DoubleString', matchValue]);
            return matchValue.length;
        }
        //Number
        // eslint-disable-next-line
        if (/^[0-9]+(\.[0-9]+)?/.exec(sqlString)) {
            // eslint-disable-next-line
            matchValue = /^[0-9]+(\.[0-9]+)?/.exec(sqlString)[0];
            this.parser.push(['Number', matchValue]);
            return matchValue.length;
        }
        //Negative Number
        // eslint-disable-next-line
        if (/^-?[0-9]+(\.[0-9]+)?/.exec(sqlString)) {
            // eslint-disable-next-line
            matchValue = /^-?[0-9]+(\.[0-9]+)?/.exec(sqlString)[0];
            this.parser.push(['Number', matchValue]);
            return matchValue.length;
        }
        return 1;
    };
    QueryBuilder.prototype.checkLiteral = function () {
        var lastParser = this.parser[this.parser.length - 1];
        if (!lastParser) {
            return true;
        }
        else {
            var secParser = this.parser[this.parser.length - 2];
            if (lastParser[0] === 'Left' && (secParser && secParser[0] === 'Conditions')) {
                return true;
            }
        }
        return false;
    };
    QueryBuilder.prototype.checkNumberLiteral = function (sqlString, sqlLocale) {
        var lastParser = this.parser[this.parser.length - 1];
        if (!lastParser) {
            return true;
        }
        else {
            // eslint-disable-next-line
            if (/^[0-9]+(\.[0-9]+)?/.exec(sqlString)) {
                var secParser = this.parser[this.parser.length - 2];
                var betweenParser = this.parser[this.parser.length - 3];
                if (lastParser[0] === 'Left' && (secParser && secParser[0] === 'Conditions')) {
                    return true;
                }
                var betweenOperator = sqlLocale ? this.l10n.getConstant('Between').toLowerCase() : 'between';
                if (lastParser[0] === 'Conditions' && (betweenParser && betweenParser[1].indexOf(betweenOperator) < 0)) {
                    return true;
                }
            }
        }
        return false;
    };
    QueryBuilder.prototype.getOperator = function (value, operator, sqlLocale) {
        var operators = {
            '=': 'equal', '!=': 'notequal', '<': 'lessthan', '>': 'greaterthan', '<=': 'lessthanorequal',
            '>=': 'greaterthanorequal', 'in': 'in', 'not in': 'notin', 'between': 'between', 'not between': 'notbetween',
            'is empty': 'isempty', 'is null': 'isnull', 'is not null': 'isnotnull', 'is not empty': 'isnotempty'
        };
        if (sqlLocale) {
            var localeOperator = Object.keys(this.sqlOperators);
            for (var i = 0; i < localeOperator.length; i++) {
                if (this.sqlOperators[localeOperator[i]] === operator.toUpperCase()) {
                    if (value && value.indexOf('%') === 0 && value[value.length - 1] === '%') {
                        return (localeOperator[i] === 'notcontains') ? 'notcontains' : 'contains';
                    }
                    else if (value && value.indexOf('%') !== 0 && value.indexOf('%') === value.length - 1) {
                        return (localeOperator[i] === 'notstartswith') ? 'notstartswith' : 'startswith';
                    }
                    else if (value && value.indexOf('%') === 0 && value.indexOf('%') !== value.length - 1) {
                        return (localeOperator[i] === 'notendswith') ? 'notendswith' : 'endswith';
                    }
                    return localeOperator[i];
                }
            }
            return null;
        }
        if (value) {
            if (value.indexOf('%') === 0 && value[value.length - 1] === '%') {
                return (operator === 'not like') ? 'notcontains' : 'contains';
            }
            else if (value.indexOf('%') !== 0 && value.indexOf('%') === value.length - 1) {
                return (operator === 'not like') ? 'notstartswith' : 'startswith';
            }
            else if (value.indexOf('%') === 0 && value.indexOf('%') !== value.length - 1) {
                return (operator === 'not like') ? 'notendswith' : 'endswith';
            }
        }
        else {
            if (operator === 'not like') {
                return 'notequal';
            }
            else if (operator === 'like') {
                return 'equal';
            }
        }
        return operators["" + operator];
    };
    QueryBuilder.prototype.getTypeFromColumn = function (rules) {
        var columnData = this.getColumn(rules.field);
        if (!isNullOrUndefined(columnData)) {
            return columnData.type;
        }
        return null;
    };
    QueryBuilder.prototype.getLabelFromColumn = function (field) {
        var label = '';
        var l = 0;
        if (this.separator !== '') {
            var fieldColl = field.split(this.separator);
            for (var i = 0; i < fieldColl.length; i++) {
                label += this.getLabelFromField(fieldColl, i + 1);
                l++;
                if (l < fieldColl.length) {
                    label += this.separator;
                }
            }
            return label;
        }
        else {
            var labelItem = this.getColumn(field).label;
            return labelItem;
        }
    };
    QueryBuilder.prototype.getLabelFromField = function (field, startIdx) {
        var fieldName = '';
        var j = 0;
        for (var k = 0; k < startIdx; k++) {
            fieldName += field[k];
            j++;
            if (j < startIdx) {
                fieldName += this.separator;
            }
        }
        return this.getColumn(fieldName).label;
    };
    QueryBuilder.prototype.processParser = function (parser, rules, levelColl, sqlLocale) {
        var j;
        var jLen;
        var rule;
        var subRules;
        var numVal = [];
        var strVal = [];
        var k;
        var kLen;
        var l;
        var lLen;
        var grpCount;
        var operator;
        var isLeftOpened = false;
        for (var i = 0, iLen = parser.length; i < iLen; i++) {
            if (parser[i][0] === 'Literal') {
                var column = this.getColumn(parser[i][1]);
                rule = { label: (column && column.label) ? column.label : parser[i][1], field: parser[i][1] };
                if (parser[i + 1][0] === 'SubOperators') {
                    if (parser[i + 1][1].indexOf('null') > -1 || parser[i + 1][1].indexOf('empty') > -1) {
                        rule.operator = this.getOperator(' ', parser[i + 1][1], sqlLocale);
                        rule.value = null;
                        rule.type = this.getTypeFromColumn(rule);
                    }
                    else {
                        var oper = parser[i + 3][1] ? parser[i + 3][1].replace(/'/g, '') : parser[i + 3][1];
                        rule.operator = this.getOperator(oper, parser[i + 1][1], sqlLocale);
                    }
                    operator = parser[i + 1][1];
                    i++;
                    j = i + 1;
                    jLen = iLen;
                    if (sqlLocale && rule.operator === 'contains' || rule.operator === 'startswith' || rule.operator === 'endswith') {
                        operator = 'like';
                    }
                    else if (sqlLocale && rule.operator === 'notcontains' || rule.operator === 'notstartswith' || rule.operator === 'notendswith') {
                        operator = 'not like';
                    }
                    else if (sqlLocale) {
                        operator = rule.operator;
                    }
                    for (j = i + 1; j < jLen; j++) {
                        if (operator.indexOf('between') < 0 && parser[j][0] === 'Left') {
                            isLeftOpened = true;
                        }
                        else if (parser[j][0] === 'Right' && isLeftOpened) {
                            i = j;
                            isLeftOpened = false;
                            break;
                        }
                        else {
                            if (operator.indexOf('null') > -1 || operator.indexOf('empty') > -1) {
                                break;
                            }
                            if (operator.indexOf('like') > -1 && parser[j][0] === 'String') {
                                var val = parser[j][1];
                                if (parser[j][1] && parser[j][1][0] === '\'') {
                                    val = parser[j][1].substring(1, parser[j][1].length - 1);
                                }
                                val = val ? val.replace(/%/g, '') : parser[j][1];
                                rule.value = val;
                                rule.type = 'string';
                            }
                            else if (operator.indexOf('between') > -1) {
                                if (parser[j][0] === 'Literal' || parser[j][0] === 'Left') {
                                    break;
                                }
                                if (parser[j][0] === 'Number') {
                                    numVal.push(Number(parser[j][1]));
                                }
                                else if (parser[j][0] === 'String') {
                                    var val = parser[j][1];
                                    if (parser[j][1] && parser[j][1][0] === '\'') {
                                        val = parser[j][1].substring(1, parser[j][1].length - 1);
                                    }
                                    strVal.push(val);
                                }
                            }
                            else {
                                if (parser[j][0] === 'Number') {
                                    numVal.push(Number(parser[j][1]));
                                }
                                else if (parser[j][0] === 'String') {
                                    var val = parser[j][1];
                                    if (parser[j][1] && parser[j][1][0] === '\'') {
                                        val = parser[j][1].substring(1, parser[j][1].length - 1);
                                    }
                                    strVal.push(val);
                                }
                            }
                            rule.type = this.getTypeFromColumn(rule);
                        }
                    }
                    if (operator.indexOf('like') < 0) {
                        if (parser[j - 1][0] === 'Number') {
                            rule.value = numVal;
                            rule.type = 'number';
                        }
                        else if (parser[j - 1][0] === 'String') {
                            rule.value = strVal;
                            rule.type = 'string';
                        }
                        else if (operator.indexOf('between') > -1 && parser[j - 1][0] === 'Conditions') {
                            if (strVal.length !== 0) {
                                rule.value = strVal;
                                rule.type = 'string';
                            }
                            else {
                                rule.value = numVal;
                                rule.type = 'number';
                            }
                        }
                        numVal = [];
                        strVal = [];
                        rule.type = this.getTypeFromColumn(rule);
                    }
                }
                else if (parser[i + 1][0] === 'Operators') {
                    rule.operator = this.getOperator(parser[i + 2][1], parser[i + 1][1], sqlLocale);
                    if (parser[i + 2][0] === 'Number') {
                        rule.type = 'number';
                        rule.value = Number(parser[i + 2][1]);
                    }
                    else {
                        rule.type = 'string';
                        rule.value = parser[i + 2][1] ? parser[i + 2][1].replace(/'/g, '') : parser[i + 2][1];
                    }
                    rule.type = this.getTypeFromColumn(rule);
                }
                rules.rules.push(rule);
            }
            else if (parser[i][0] === 'Left') {
                if (!(parser[0][0] === 'Left') && (parser[i - 1][1] === 'not' || sqlLocale && this.l10n.getConstant('NOT').toLowerCase() === parser[i - 1][1])) {
                    continue;
                }
                this.parser = parser.splice(i + 1, iLen - (i + 1));
                if (this.enableNotCondition) {
                    subRules = { condition: 'and', rules: [], not: false };
                }
                else {
                    subRules = { condition: 'and', rules: [] };
                }
                grpCount = 0;
                kLen = rules.rules.length;
                for (k = 0; k < kLen; k++) { //To get the group position
                    if (rules.rules[k].rules) {
                        grpCount++;
                    }
                }
                levelColl.push(grpCount);
                rules.rules.push(subRules);
                subRules = this.processParser(this.parser, subRules, levelColl, sqlLocale);
                return rules;
            }
            else if (parser[i][0] === 'Conditions') {
                if (parser[i][1] === 'not' || (sqlLocale && this.l10n.getConstant('NOT').toLowerCase() === parser[i][1])) {
                    rules.not = true;
                }
                else {
                    rules.condition = parser[i][1];
                }
            }
            else if (parser[i][0] === 'Right') {
                this.parser = parser.splice(i + 1, iLen - (i + 1));
                levelColl.pop(); //To get the parent Group
                rules = this.rule;
                lLen = levelColl.length;
                for (l = 0; l < lLen; l++) {
                    rules = this.findGroupByIdx(levelColl[l], rules, l === 0);
                }
                return this.processParser(this.parser, rules, levelColl, sqlLocale);
            }
        }
        return rules;
    };
    __decorate([
        Event()
    ], QueryBuilder.prototype, "created", void 0);
    __decorate([
        Event()
    ], QueryBuilder.prototype, "actionBegin", void 0);
    __decorate([
        Event()
    ], QueryBuilder.prototype, "beforeChange", void 0);
    __decorate([
        Event()
    ], QueryBuilder.prototype, "change", void 0);
    __decorate([
        Event()
    ], QueryBuilder.prototype, "dataBound", void 0);
    __decorate([
        Event()
    ], QueryBuilder.prototype, "ruleChange", void 0);
    __decorate([
        Property({ ruleDelete: true, groupInsert: true, groupDelete: true })
    ], QueryBuilder.prototype, "showButtons", void 0);
    __decorate([
        Property(false)
    ], QueryBuilder.prototype, "summaryView", void 0);
    __decorate([
        Property(false)
    ], QueryBuilder.prototype, "allowValidation", void 0);
    __decorate([
        Property('Default')
    ], QueryBuilder.prototype, "fieldMode", void 0);
    __decorate([
        Property([])
    ], QueryBuilder.prototype, "columns", void 0);
    __decorate([
        Property(null)
    ], QueryBuilder.prototype, "fieldModel", void 0);
    __decorate([
        Property(null)
    ], QueryBuilder.prototype, "operatorModel", void 0);
    __decorate([
        Property(null)
    ], QueryBuilder.prototype, "valueModel", void 0);
    __decorate([
        Property()
    ], QueryBuilder.prototype, "headerTemplate", void 0);
    __decorate([
        Property('')
    ], QueryBuilder.prototype, "cssClass", void 0);
    __decorate([
        Property([])
    ], QueryBuilder.prototype, "dataSource", void 0);
    __decorate([
        Property('Horizontal')
    ], QueryBuilder.prototype, "displayMode", void 0);
    __decorate([
        Property(false)
    ], QueryBuilder.prototype, "enablePersistence", void 0);
    __decorate([
        Property('Default')
    ], QueryBuilder.prototype, "sortDirection", void 0);
    __decorate([
        Property(5)
    ], QueryBuilder.prototype, "maxGroupCount", void 0);
    __decorate([
        Property('auto')
    ], QueryBuilder.prototype, "height", void 0);
    __decorate([
        Property('auto')
    ], QueryBuilder.prototype, "width", void 0);
    __decorate([
        Property(false)
    ], QueryBuilder.prototype, "matchCase", void 0);
    __decorate([
        Property(0)
    ], QueryBuilder.prototype, "immediateModeDelay", void 0);
    __decorate([
        Property(false)
    ], QueryBuilder.prototype, "enableNotCondition", void 0);
    __decorate([
        Property(false)
    ], QueryBuilder.prototype, "readonly", void 0);
    __decorate([
        Property('')
    ], QueryBuilder.prototype, "separator", void 0);
    __decorate([
        Complex({ condition: 'and', rules: [] }, Rule)
    ], QueryBuilder.prototype, "rule", void 0);
    QueryBuilder = __decorate([
        NotifyPropertyChanges
    ], QueryBuilder);
    return QueryBuilder;
}(Component));
export { QueryBuilder };
var LevelColl = /** @class */ (function () {
    function LevelColl() {
    }
    return LevelColl;
}());
