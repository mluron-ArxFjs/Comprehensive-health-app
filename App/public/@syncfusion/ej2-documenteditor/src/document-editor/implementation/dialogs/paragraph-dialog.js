import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { createElement, L10n } from '@syncfusion/ej2-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { WParagraphFormat } from '../index';
import { RadioButton, CheckBox } from '@syncfusion/ej2-buttons';
import { Tab } from '@syncfusion/ej2-navigations';
/**
 * The Paragraph dialog is used to modify formatting of selected paragraphs.
 */
var ParagraphDialog = /** @class */ (function () {
    /**
     * @param {DocumentHelper} documentHelper - Specifies the document helper.
     * @private
     */
    function ParagraphDialog(documentHelper) {
        var _this = this;
        //paragraph Format properties
        this.leftIndent = undefined;
        this.rightIndent = undefined;
        this.beforeSpacing = undefined;
        this.afterSpacing = undefined;
        this.spaceBeforeAuto = false;
        this.spaceAfterAuto = false;
        this.textAlignment = undefined;
        this.firstLineIndent = undefined;
        this.lineSpacingIn = undefined;
        this.lineSpacingType = undefined;
        this.paragraphFormat = undefined;
        this.bidi = undefined;
        this.contextualSpacing = undefined;
        this.isStyleDialog = false;
        this.directionDiv = undefined;
        this.keepWithNextValue = undefined;
        this.keepLineTogetherValue = undefined;
        this.widowControlValue = undefined;
        this.tabObj = undefined;
        /**
         * @private
         * @param {KeyboardEvent} event - Specifies the event args.
         * @returns {void}
         */
        this.keyUpParagraphSettings = function (event) {
            if (event.keyCode === 13) {
                _this.applyParagraphFormat();
            }
        };
        /**
         * @private
         * @param {KeyboardEvent} event - Specifies the event args.
         * @returns {void}
         */
        this.changeBeforeSpacing = function (event) {
            var local = new L10n('documenteditor', _this.documentHelper.owner.defaultLocale);
            local.setLocale(_this.documentHelper.owner.locale);
            if (event.value === -1) {
                _this.beforeSpacingIn.element.value = local.getConstant('Auto');
                _this.beforeSpacingIn.step = 1;
                _this.spaceBeforeAuto = true;
                _this.beforeSpacing = 5;
            }
            else {
                _this.beforeSpacing = event.value;
                _this.beforeSpacingIn.step = 6;
                _this.spaceBeforeAuto = false;
            }
        };
        /**
         * @private
         * @param {NumericFocusEventArgs} event - Specifies the event args.
         * @returns {void}
         */
        this.focusBeforeSpacing = function (event) {
            var local = new L10n('documenteditor', _this.documentHelper.owner.defaultLocale);
            local.setLocale(_this.documentHelper.owner.locale);
            if (event.value === -1) {
                _this.beforeSpacingIn.element.value = local.getConstant('Auto');
            }
        };
        /**
         * @private
         * @param {NumericFocusEventArgs} event - Specifies the event args.
         * @returns {void}
         */
        this.blurBeforeSpacing = function (event) {
            var local = new L10n('documenteditor', _this.documentHelper.owner.defaultLocale);
            local.setLocale(_this.documentHelper.owner.locale);
            if (event.value === -1) {
                var proxy_1 = _this.beforeSpacingIn;
                setTimeout(function () {
                    proxy_1.element.value = local.getConstant('Auto');
                }, 0);
            }
        };
        /**
        * @private
        * @param {ClickEventArgs} event - Specifies the event args.
        * @returns {void}
        */
        this.clickBeforeSpacing = function () {
            var local = new L10n('documenteditor', _this.documentHelper.owner.defaultLocale);
            local.setLocale(_this.documentHelper.owner.locale);
            if (_this.beforeSpacingIn.element.value === '-1.0')
                _this.beforeSpacingIn.element.value = local.getConstant('Auto');
        };
        /**
         * @private
         * @param {NumericChangeArgs} event - Specifies the event args.
         * @returns {void}
         */
        this.changeAfterSpacing = function (event) {
            var local = new L10n('documenteditor', _this.documentHelper.owner.defaultLocale);
            local.setLocale(_this.documentHelper.owner.locale);
            if (event.value === -1) {
                _this.afterSpacingIn.element.value = local.getConstant('Auto');
                _this.afterSpacingIn.step = 1;
                _this.spaceAfterAuto = true;
                _this.afterSpacing = 5;
            }
            else {
                _this.afterSpacing = event.value;
                _this.afterSpacingIn.step = 6;
                _this.spaceAfterAuto = false;
            }
        };
        /**
         * @private
         * @param {NumericFocusEventArgs} event - Specifies the event args.
         * @returns {void}
         */
        this.focusAfterSpacing = function (event) {
            var local = new L10n('documenteditor', _this.documentHelper.owner.defaultLocale);
            local.setLocale(_this.documentHelper.owner.locale);
            if (event.value === -1) {
                _this.afterSpacingIn.element.value = local.getConstant('Auto');
            }
        };
        /**
         * @private
         * @param {NumericFocusEventArgs} event - Specifies the event args.
         * @returns {void}
         */
        this.blurAfterSpacing = function (event) {
            var local = new L10n('documenteditor', _this.documentHelper.owner.defaultLocale);
            local.setLocale(_this.documentHelper.owner.locale);
            if (event.value === -1) {
                var proxy_2 = _this.afterSpacingIn;
                setTimeout(function () {
                    proxy_2.element.value = local.getConstant('Auto');
                }, 0);
            }
        };
        /**
        * @private
        * @param {ClickEventArgs} event - Specifies the event args.
        * @returns {void}
        */
        this.clickAfterSpacing = function () {
            var local = new L10n('documenteditor', _this.documentHelper.owner.defaultLocale);
            local.setLocale(_this.documentHelper.owner.locale);
            if (_this.afterSpacingIn.element.value === '-1.0')
                _this.afterSpacingIn.element.value = local.getConstant('Auto');
        };
        /**
         * @private
         * @param {NumericChangeArgs} event - Specifies the event args.
         * @returns {void}
         */
        this.changeLeftIndent = function (event) {
            _this.leftIndent = event.value;
        };
        /**
         * @private
         * @param {NumericChangeArgs} event - Specifies the event args.
         * @returns {void}
         */
        this.changeRightIndent = function (event) {
            _this.rightIndent = event.value;
        };
        /**
         * @private
         * @param {NumericChangeArgs} event - Specifies the event args.
         * @returns {void}
         */
        this.changeLineSpacingValue = function (event) {
            _this.lineSpacingIn = event.value;
        };
        /**
         * @private
         * @param {NumericChangeArgs} event - Specifies the event args.
         * @returns {void}
         */
        this.changeFirstLineIndent = function (event) {
            _this.firstLineIndent = event.value;
            if (_this.special.index === 2) {
                _this.firstLineIndent = -(_this.firstLineIndent);
                _this.leftIndent = _this.leftIndentIn.value + event.value;
            }
        };
        /**
         * @private
         * @param {DropDownChangeArgs} event - Specifies the event args.
         * @returns {void}
         */
        this.changeByTextAlignment = function (args) {
            _this.textAlignment = args.value;
        };
        /**
         * @private
         * @param {ChangeArgs} event - Specifies change event args.
         * @returns {void}
         */
        this.changeBidirectional = function (event) {
            if (event.value === 'ltr') {
                _this.rtlButton.checked = !_this.ltrButton.checked;
                _this.bidi = false;
            }
            else {
                _this.ltrButton.checked = !_this.rtlButton.checked;
                _this.bidi = true;
            }
            _this.changeAlignmentByBidi();
        };
        /**
         * @private
         * @param {ChangeEventArgs} args - Specifies change event args.
         * @returns {void}
         */
        this.changeContextualSpacing = function (args) {
            _this.contextualSpacing = args.checked;
        };
        /**
         * @private
         * @param {ChangeEventArgs} args - Specifies change event args.
         * @returns {void}
         */
        this.changeKeepWithNext = function (args) {
            _this.keepWithNextValue = args.checked;
        };
        /**
         * @private
         * @param {ChangeEventArgs} args - Specifies change event args.
         * @returns {void}
         */
        this.changeKeepLinesTogether = function (args) {
            _this.keepLineTogetherValue = args.checked;
        };
        /**
         * @private
         * @param {ChangeEventArgs} args - Specifies change event args.
         * @returns {void}
         */
        this.changeWidowControl = function (args) {
            _this.widowControlValue = args.checked;
        };
        /**
         * @private
         * @returns {void}
         */
        this.changeByValue = function () {
            var paragraphFormat = _this.documentHelper.selection.paragraphFormat;
            switch (_this.special.index) {
                case 0:
                    if (paragraphFormat.firstLineIndent !== 0) {
                        _this.byIn.value = 0;
                        _this.leftIndent = _this.leftIndentIn.value;
                    }
                    break;
                case 1:
                    if (paragraphFormat.firstLineIndent === 0 || isNullOrUndefined(paragraphFormat.firstLineIndent)) {
                        _this.byIn.value = 0.1;
                    }
                    else if (paragraphFormat.firstLineIndent < 0) {
                        _this.byIn.value = -(paragraphFormat.firstLineIndent);
                        if (Math.abs(paragraphFormat.firstLineIndent) <= _this.leftIndent) {
                            _this.leftIndent = paragraphFormat.firstLineIndent + _this.leftIndent;
                        }
                    }
                    break;
                case 2:
                    if (paragraphFormat.firstLineIndent === 0 || isNullOrUndefined(paragraphFormat.firstLineIndent)) {
                        paragraphFormat.firstLineIndent = -0.1;
                    }
                    else if (paragraphFormat.firstLineIndent > 0) {
                        _this.byIn.value = (paragraphFormat.firstLineIndent);
                        if (!isNullOrUndefined(_this.leftIndent)) {
                            _this.leftIndent = _this.leftIndent + paragraphFormat.firstLineIndent;
                        }
                        else {
                            _this.leftIndent = paragraphFormat.firstLineIndent;
                        }
                    }
                    break;
            }
        };
        /**
         * @private
         * @returns {void}
         */
        this.changeBySpacing = function () {
            if (isNullOrUndefined(_this.lineSpacing)) {
                return;
            }
            switch (_this.lineSpacing.index) {
                case 0:
                    _this.lineSpacingType = 'AtLeast';
                    _this.atIn.value = 12;
                    break;
                case 1:
                    _this.lineSpacingType = 'Exactly';
                    _this.atIn.value = 12;
                    break;
                case 2:
                    _this.lineSpacingType = 'Multiple';
                    _this.atIn.value = 1;
                    break;
            }
        };
        /* eslint-enable */
        /**
         * @private
         * @returns {void}
         */
        this.loadParagraphDialog = function () {
            if (_this.isStyleDialog) {
                _this.directionDiv.classList.add('e-de-disabledbutton');
            }
            else {
                _this.directionDiv.classList.remove('e-de-disabledbutton');
            }
            var selectionFormat;
            if (_this.paragraphFormat) {
                selectionFormat = _this.paragraphFormat;
            }
            else {
                selectionFormat = _this.documentHelper.selection.paragraphFormat;
            }
            var alignValue = _this.getAlignmentValue(selectionFormat.textAlignment);
            _this.alignment.index = alignValue;
            if (selectionFormat.spaceBeforeAuto) {
                _this.beforeSpacingIn.value = -1;
            }
            else {
                if (selectionFormat.beforeSpacing === -1) {
                    _this.beforeSpacingIn.value = undefined;
                }
                else {
                    _this.beforeSpacingIn.value = selectionFormat.beforeSpacing;
                }
            }
            if (selectionFormat.spaceAfterAuto) {
                _this.afterSpacingIn.value = -1;
            }
            else {
                if (selectionFormat.afterSpacing === -1) {
                    _this.afterSpacingIn.value = undefined;
                }
                else {
                    _this.afterSpacingIn.value = selectionFormat.afterSpacing;
                }
            }
            _this.leftIndentIn.value = selectionFormat.leftIndent;
            _this.rightIndentIn.value = selectionFormat.rightIndent;
            _this.byIn.value = Math.abs(selectionFormat.firstLineIndent);
            var lineSpaceValue = _this.lineSpacing.index;
            _this.keepWithNextValue = undefined;
            _this.keepLineTogetherValue = undefined;
            _this.widowControlValue = undefined;
            if (selectionFormat.firstLineIndent > 0) {
                _this.special.index = 1;
            }
            else if (selectionFormat.firstLineIndent < 0) {
                _this.special.index = 2;
                _this.leftIndentIn.value = selectionFormat.leftIndent - _this.byIn.value;
            }
            if (selectionFormat.lineSpacingType === 'AtLeast') {
                lineSpaceValue = 0;
            }
            else if (selectionFormat.lineSpacingType === 'Exactly') {
                lineSpaceValue = 1;
            }
            else {
                lineSpaceValue = 2;
            }
            _this.lineSpacing.index = lineSpaceValue;
            _this.atIn.value = selectionFormat.lineSpacing;
            if (_this.documentHelper.selection.caret.style.display !== 'none') {
                _this.documentHelper.selection.caret.style.display = 'none';
            }
            if (selectionFormat.bidi) {
                _this.rtlButton.checked = true;
                _this.ltrButton.checked = false;
            }
            else {
                _this.ltrButton.checked = true;
                _this.rtlButton.checked = false;
            }
            if (isNullOrUndefined(selectionFormat.keepWithNext)) {
                _this.keepWithNext.indeterminate = true;
            }
            else {
                _this.keepWithNext.checked = selectionFormat.keepWithNext;
            }
            if (isNullOrUndefined(selectionFormat.keepLinesTogether)) {
                _this.keepLinesTogether.indeterminate = true;
            }
            else {
                _this.keepLinesTogether.checked = selectionFormat.keepLinesTogether;
            }
            if (isNullOrUndefined(selectionFormat.widowControl)) {
                _this.widowControlIn.indeterminate = true;
            }
            else {
                _this.widowControlIn.checked = selectionFormat.widowControl;
            }
            _this.contextSpacing.checked = selectionFormat.contextualSpacing;
        };
        /**
         * @private
         * @returns {void}
         */
        this.applyParagraphFormat = function () {
            var paraFormat;
            var isApply;
            if (_this.paragraphFormat) {
                paraFormat = _this.paragraphFormat;
                isApply = false;
            }
            else {
                paraFormat = new WParagraphFormat();
                paraFormat.borders = undefined;
                isApply = true;
            }
            if (!isNullOrUndefined(_this.beforeSpacing)) {
                paraFormat.beforeSpacing = _this.beforeSpacing;
            }
            if (!isNullOrUndefined(_this.afterSpacing)) {
                paraFormat.afterSpacing = _this.afterSpacing;
            }
            if (!isNullOrUndefined(_this.spaceBeforeAuto)) {
                paraFormat.spaceBeforeAuto = _this.spaceBeforeAuto;
            }
            if (!isNullOrUndefined(_this.spaceAfterAuto)) {
                paraFormat.spaceAfterAuto = _this.spaceAfterAuto;
            }
            if (!isNullOrUndefined(_this.lineSpacingType)) {
                paraFormat.lineSpacingType = _this.lineSpacingType;
            }
            if (!isNullOrUndefined(_this.leftIndent)) {
                paraFormat.leftIndent = _this.leftIndent;
            }
            if (!isNullOrUndefined(_this.rightIndent)) {
                paraFormat.rightIndent = _this.rightIndent;
            }
            if (!isNullOrUndefined(_this.lineSpacingIn)) {
                paraFormat.lineSpacing = _this.lineSpacingIn;
            }
            if (!isNullOrUndefined(_this.firstLineIndent)) {
                paraFormat.firstLineIndent = Math.abs(_this.firstLineIndent);
                if (_this.special.index === 2) {
                    paraFormat.firstLineIndent = -paraFormat.firstLineIndent;
                    paraFormat.leftIndent = _this.leftIndentIn.value + _this.byIn.value;
                }
            }
            if (!isNullOrUndefined(_this.bidi)) {
                paraFormat.bidi = _this.bidi;
            }
            if (!isNullOrUndefined(_this.textAlignment)) {
                var textAlignment = _this.textAlignment;
                if (paraFormat.bidi) {
                    if (textAlignment === 'Right') {
                        textAlignment = 'Left';
                    }
                    else if (textAlignment === 'Left') {
                        textAlignment = 'Right';
                    }
                }
                paraFormat.textAlignment = textAlignment;
            }
            if (!isNullOrUndefined(_this.contextualSpacing)) {
                paraFormat.contextualSpacing = _this.contextualSpacing;
            }
            if (!isNullOrUndefined(_this.keepWithNextValue)) {
                paraFormat.keepWithNext = _this.keepWithNextValue;
            }
            else if (_this.documentHelper.selection.paragraphFormat.keepWithNext) {
                paraFormat.keepWithNext = _this.documentHelper.selection.paragraphFormat.keepWithNext;
            }
            if (!isNullOrUndefined(_this.keepLineTogetherValue)) {
                paraFormat.keepLinesTogether = _this.keepLineTogetherValue;
            }
            else if (_this.documentHelper.selection.paragraphFormat.keepLinesTogether) {
                paraFormat.keepLinesTogether = _this.documentHelper.selection.paragraphFormat.keepLinesTogether;
            }
            if (!isNullOrUndefined(_this.widowControlValue)) {
                paraFormat.widowControl = _this.widowControlValue;
            }
            else if (_this.documentHelper.selection.paragraphFormat.widowControl) {
                paraFormat.widowControl = _this.documentHelper.selection.paragraphFormat.widowControl;
            }
            if (isApply) {
                _this.onParagraphFormat(paraFormat);
            }
            else {
                _this.documentHelper.owner.styleDialogModule.updateParagraphFormat();
            }
            _this.documentHelper.hideDialog();
        };
        /**
         * @private
         * @returns {void}
         */
        this.closeParagraphDialog = function () {
            _this.leftIndent = undefined;
            _this.afterSpacing = undefined;
            _this.beforeSpacing = undefined;
            _this.firstLineIndent = undefined;
            _this.textAlignment = undefined;
            _this.rightIndent = undefined;
            _this.lineSpacingIn = undefined;
            _this.lineSpacingType = undefined;
            _this.paragraphFormat = undefined;
            _this.documentHelper.hideDialog();
        };
        this.documentHelper = documentHelper;
    }
    Object.defineProperty(ParagraphDialog.prototype, "owner", {
        get: function () {
            return this.documentHelper.owner.viewer;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @returns {string} Returns module name
     */
    ParagraphDialog.prototype.getModuleName = function () {
        return 'ParagraphDialog';
    };
    /* eslint-disable */
    /**
     * @private
     * @param {L10n} locale - Specifies the locale.
     * @returns {void}
     */
    ParagraphDialog.prototype.initParagraphDialog = function (locale) {
        var tabContainer = createElement('div');
        var ejtab = createElement('div');
        var instance = this;
        var ownerId = this.documentHelper.owner.containerId;
        //let id: string = ownerId + '_paragraph_dialog';
        var indentContainer = createElement('div', { className: 'e-de-dlg-tab-first-child e-de-para-dlg-container' });
        this.target = tabContainer;
        tabContainer.appendChild(ejtab);
        var div = createElement('div', { styles: 'width:400px;' });
        var generalDiv = createElement('div');
        var genLabel = createElement('div', { className: 'e-de-para-dlg-heading', innerHTML: locale.getConstant('General') });
        generalDiv.appendChild(genLabel);
        var alignmentWholeDiv = createElement('div', { className: 'e-de-container-row' });
        generalDiv.appendChild(alignmentWholeDiv);
        var alignmentDiv = createElement('div', { className: 'e-de-subcontainer-left' });
        alignmentWholeDiv.appendChild(alignmentDiv);
        var alignment = createElement('select', {
            id: ownerId + '_Alignment',
            innerHTML: '<option value="Center">' + locale.getConstant('Center') +
                '</option><option value="Left">' + locale.getConstant('Left') +
                '</option><option value="Right">' + locale.getConstant('Right') +
                '</option><option value="Justify">' + locale.getConstant('Justify') + '</option>'
        });
        alignmentDiv.appendChild(alignment);
        alignmentDiv.setAttribute('aria-labelledby', alignment.innerText);
        var dirLabel = createElement('div', {
            className: 'e-de-dlg-sub-header', innerHTML: locale.getConstant('Direction')
        });
        this.directionDiv = createElement('div', { className: 'e-de-container-row' });
        var rtlDiv = createElement('div', { className: 'e-de-rtl-btn-div' });
        var rtlInputELe = createElement('input', { id: ownerId + '_rtlEle' });
        rtlDiv.appendChild(rtlInputELe);
        this.directionDiv.appendChild(rtlDiv);
        var isRtl = this.documentHelper.owner.enableRtl;
        if (isRtl) {
            rtlDiv.classList.add('e-de-rtl');
        }
        var ltrDiv = createElement('div', { className: 'e-de-ltr-btn-div' });
        var ltrInputELe = createElement('input', { id: ownerId + '_ltrEle' });
        ltrDiv.appendChild(ltrInputELe);
        this.directionDiv.appendChild(ltrDiv);
        generalDiv.appendChild(dirLabel);
        generalDiv.appendChild(this.directionDiv);
        this.rtlButton = new RadioButton({
            label: locale.getConstant('Right-to-left'), enableRtl: isRtl,
            value: 'rtl', cssClass: 'e-small', change: this.changeBidirectional
        });
        this.rtlButton.appendTo(rtlInputELe);
        rtlInputELe.setAttribute('aria-label', locale.getConstant('Right-to-left'));
        this.ltrButton = new RadioButton({
            label: locale.getConstant('Left-to-right'), enableRtl: isRtl,
            value: 'ltr', cssClass: 'e-small', change: this.changeBidirectional
        });
        this.ltrButton.appendTo(ltrInputELe);
        ltrInputELe.setAttribute('aria-label', locale.getConstant('Left-to-right'));
        var indentionWholeDiv = createElement('div');
        var indentLabel = createElement('div', { className: 'e-de-para-dlg-heading',
            innerHTML: locale.getConstant('Indentation')
        });
        indentionWholeDiv.appendChild(indentLabel);
        var indentionSubDiv1 = createElement('div', { className: 'e-de-container-row' });
        indentionWholeDiv.appendChild(indentionSubDiv1);
        var indentionSubDiv2 = createElement('div', { className: 'e-de-container-row' });
        indentionWholeDiv.appendChild(indentionSubDiv2);
        var beforeTextDiv = createElement('div', { className: 'e-de-subcontainer-left' });
        indentionSubDiv1.appendChild(beforeTextDiv);
        var afterTextDiv = createElement('div', { className: 'e-de-subcontainer-right' });
        indentionSubDiv1.appendChild(afterTextDiv);
        var specialDiv = createElement('div', { className: 'e-de-subcontainer-left' });
        indentionSubDiv2.appendChild(specialDiv);
        var byDiv = createElement('div', { className: 'e-de-subcontainer-right' });
        indentionSubDiv2.appendChild(byDiv);
        var spacingDiv = createElement('div');
        var leftSpacingDiv = createElement('div');
        spacingDiv.appendChild(leftSpacingDiv);
        // let contextSpacingStyles: string = 'float:left';
        // if (isRtl) {
        //     contextSpacingStyles = 'float:right;';
        // }
        var contextSpacingDiv = createElement('div', { className: 'e-de-container-row' });
        spacingDiv.appendChild(contextSpacingDiv);
        var rightSpacingDiv = createElement('div', { className: 'e-de-container-row' });
        spacingDiv.appendChild(rightSpacingDiv);
        var contextInputEle = createElement('input', {
            attrs: { type: 'checkbox' },
            id: ownerId + '_contextSpacing'
        });
        contextSpacingDiv.appendChild(contextInputEle);
        var leftIndent = createElement('input', { id: ownerId + '_leftIndent', attrs: { 'type': 'text' } });
        var rightIndent = createElement('input', { id: ownerId + '_rightIndent', attrs: { 'type': 'text' } });
        beforeTextDiv.appendChild(leftIndent);
        beforeTextDiv.setAttribute('aria-labelledby', locale.getConstant('Indent from left'));
        afterTextDiv.appendChild(rightIndent);
        afterTextDiv.setAttribute('aria-labelledby', locale.getConstant('Indent from right'));
        var special = createElement('select', {
            id: ownerId + '_special',
            innerHTML: '<option value="None">' + locale.getConstant('None') +
                '</option><option value="First Line">' + locale.getConstant('First line') +
                '</option><option value="Hanging">' + locale.getConstant('Hanging') + '</option> '
        });
        var by = createElement('input', { id: ownerId + '_By', attrs: { 'type': 'text' } });
        specialDiv.setAttribute('aria-labelledby', 'Special');
        specialDiv.appendChild(special);
        byDiv.appendChild(by);
        byDiv.setAttribute('aria-labelledby', 'By');
        var spaceLabel = createElement('div', { className: 'e-de-para-dlg-heading', innerHTML: locale.getConstant('Spacing') });
        var spacingWholeDiv = createElement('div', { className: 'e-de-container-row' });
        var beforeSpacingWholeDiv = createElement('div', { className: 'e-de-subcontainer-left' });
        var beforeSpacing = createElement('input', { id: ownerId + '_beforeSpacing', attrs: { 'type': 'text' } });
        var afterSpacingWholeDiv = createElement('div', { className: 'e-de-subcontainer-right' });
        var afterSpacing = createElement('input', { id: ownerId + '_afterSpacing', attrs: { 'type': 'text' } });
        leftSpacingDiv.appendChild(spaceLabel);
        leftSpacingDiv.appendChild(spacingWholeDiv);
        beforeSpacingWholeDiv.appendChild(beforeSpacing);
        spacingWholeDiv.appendChild(beforeSpacingWholeDiv);
        afterSpacingWholeDiv.appendChild(afterSpacing);
        spacingWholeDiv.appendChild(afterSpacingWholeDiv);
        var lineSpacingDiv = createElement('div', { className: 'e-de-subcontainer-left' });
        var lineSpacing = createElement('select', {
            id: ownerId + '_lineSpacing',
            innerHTML: '<option value="At least">' + locale.getConstant('At least') +
                '</option><option value="Exactly">' + locale.getConstant('Exactly') +
                '</option><option value="Multiple">' + locale.getConstant('Multiple') + '</option>'
        });
        var lineTypeDiv = createElement('div', { className: 'e-de-subcontainer-right' });
        var lineSpacingAt = createElement('input', { id: ownerId + '_lineSpacingAt', attrs: { 'type': 'text' } });
        lineSpacingDiv.appendChild(lineSpacing);
        rightSpacingDiv.appendChild(lineSpacingDiv);
        lineTypeDiv.appendChild(lineSpacingAt);
        rightSpacingDiv.appendChild(lineTypeDiv);
        div.appendChild(generalDiv);
        div.appendChild(indentionWholeDiv);
        div.appendChild(spacingDiv);
        indentContainer.appendChild(div);
        this.leftIndentIn = new NumericTextBox({
            format: 'n1', value: 0, min: -1584, max: 1584, enablePersistence: false, floatLabelType: 'Always', placeholder: locale.getConstant('Before text'), change: this.changeLeftIndent
        });
        this.leftIndentIn.appendTo(leftIndent);
        this.rightIndentIn = new NumericTextBox({
            format: 'n1', value: 0, min: -1584, max: 1584, enablePersistence: false, floatLabelType: 'Always', placeholder: locale.getConstant('After text'), change: this.changeRightIndent
        });
        this.rightIndentIn.appendTo(rightIndent);
        this.byIn = new NumericTextBox({
            format: 'n1', value: 0, min: 0, max: 1584, enablePersistence: false, floatLabelType: 'Always', placeholder: locale.getConstant('By'), change: this.changeFirstLineIndent
        });
        this.byIn.appendTo(by);
        this.beforeSpacingIn = new NumericTextBox({
            format: 'n1', value: 0, min: -1, max: 1584, step: 6, enablePersistence: false, floatLabelType: 'Always', placeholder: locale.getConstant('Before'),
            change: this.changeBeforeSpacing,
            focus: this.focusBeforeSpacing,
            blur: this.blurBeforeSpacing,
        });
        this.beforeSpacingIn.appendTo(beforeSpacing);
        var beforeSpacingSpinDown = beforeSpacingWholeDiv.getElementsByClassName("e-input-group-icon e-spin-down")[0];
        beforeSpacingSpinDown.addEventListener('click', this.clickBeforeSpacing);
        this.afterSpacingIn = new NumericTextBox({
            format: 'n1', value: 0, min: -1, max: 1584, step: 6, enablePersistence: false, floatLabelType: 'Always', placeholder: locale.getConstant('After'),
            change: this.changeAfterSpacing,
            focus: this.focusAfterSpacing,
            blur: this.blurAfterSpacing
        });
        this.afterSpacingIn.appendTo(afterSpacing);
        var afterSpacingSpinDown = afterSpacingWholeDiv.getElementsByClassName("e-input-group-icon e-spin-down")[0];
        afterSpacingSpinDown.addEventListener('click', this.clickAfterSpacing);
        this.atIn = new NumericTextBox({
            format: 'n1', value: 0, min: 1, max: 1584, step: 0.5, enablePersistence: false, floatLabelType: 'Always', placeholder: locale.getConstant('At'), change: this.changeLineSpacingValue
        });
        this.special = new DropDownList({ change: this.changeByValue, enableRtl: isRtl, floatLabelType: 'Always', placeholder: locale.getConstant('Special') });
        this.special.appendTo(special);
        this.lineSpacing = new DropDownList({ change: this.changeBySpacing, enableRtl: isRtl, floatLabelType: 'Always', placeholder: locale.getConstant('Line Spacing'), htmlAttributes: { 'aria-labelledby': locale.getConstant('Line Spacing') } });
        this.lineSpacing.appendTo(lineSpacing);
        this.alignment = new DropDownList({ change: this.changeByTextAlignment, enableRtl: isRtl, floatLabelType: 'Always', placeholder: locale.getConstant('Alignment'), htmlAttributes: { 'aria-labelledby': locale.getConstant('Alignment') } });
        this.alignment.appendTo(alignment);
        this.atIn.appendTo(lineSpacingAt);
        this.contextSpacing = new CheckBox({
            change: this.changeContextualSpacing,
            label: locale.getConstant("Contextual Spacing"),
            enableRtl: isRtl
        });
        this.contextSpacing.appendTo(contextInputEle);
        contextInputEle.setAttribute('aria-labelledby', locale.getConstant("Contextual Spacing"));
        indentContainer.addEventListener('keyup', instance.keyUpParagraphSettings);
        if (isRtl) {
            afterSpacingWholeDiv.classList.add('e-de-rtl');
            lineTypeDiv.classList.add('e-de-rtl');
        }
        var lineBreakContainer = createElement('div', { className: 'e-de-dlg-tab-first-child' });
        var paginationDiv = createElement('div', { className: 'e-de-para-dlg-sub-container' });
        this.paginationDiv = paginationDiv;
        var paginationLabel = createElement('div', { className: 'e-de-para-dlg-heading', innerHTML: locale.getConstant('Pagination') });
        paginationDiv.appendChild(paginationLabel);
        var widowContorlContainer = createElement('div', { styles: 'display:block' });
        paginationDiv.appendChild(widowContorlContainer);
        var keepNextContainer = createElement('div', { styles: 'display:block' });
        paginationDiv.appendChild(keepNextContainer);
        var keepLines = createElement('div', { styles: 'display:block' });
        paginationDiv.appendChild(keepLines);
        var keepWithNext = createElement('input', {
            attrs: { type: 'checkbox' },
        });
        keepNextContainer.appendChild(keepWithNext);
        this.keepWithNext = new CheckBox({
            change: this.changeKeepWithNext,
            label: locale.getConstant('Keep With Next'),
            enableRtl: isRtl,
            cssClass: 'e-de-para-dlg-cs-check-box'
        });
        this.keepWithNext.appendTo(keepWithNext);
        keepWithNext.setAttribute('aria-label', locale.getConstant('Keep With Next'));
        var keepLinesTogether = createElement('input', {
            attrs: { type: 'checkbox' },
        });
        keepLines.appendChild(keepLinesTogether);
        this.keepLinesTogether = new CheckBox({
            change: this.changeKeepLinesTogether,
            label: locale.getConstant('Keep Lines Together'),
            enableRtl: isRtl,
            cssClass: 'e-de-para-dlg-cs-check-box'
        });
        this.keepLinesTogether.appendTo(keepLinesTogether);
        keepLinesTogether.setAttribute('aria-label', locale.getConstant('Keep Lines Together'));
        var widowControl = createElement('input', {
            attrs: { type: 'checkbox' },
        });
        widowContorlContainer.appendChild(widowControl);
        this.widowControlIn = new CheckBox({
            change: this.changeWidowControl,
            label: locale.getConstant('WidowControl'),
            enableRtl: isRtl,
            cssClass: 'e-de-para-dlg-cs-check-box'
        });
        this.widowControlIn.appendTo(widowControl);
        widowControl.setAttribute('aria-label', locale.getConstant('WidowControl'));
        lineBreakContainer.appendChild(paginationDiv);
        var items = [
            { header: { text: locale.getConstant('Indents and Spacing') }, content: indentContainer },
            { header: { text: locale.getConstant('Line and Page Breaks') }, content: lineBreakContainer }
        ];
        this.tabObj = new Tab({ items: items, enableRtl: isRtl, animation: { previous: { effect: 'None' }, next: { effect: 'None' } } }, ejtab);
        this.tabObj.isStringTemplate = true;
    };
    ParagraphDialog.prototype.changeAlignmentByBidi = function () {
        if (this.textAlignment === 'Left') {
            this.textAlignment = 'Right';
        }
        else if (this.textAlignment === 'Right') {
            this.textAlignment = 'Left';
        }
        if (!isNullOrUndefined(this.textAlignment)) {
            this.alignment.index = this.getAlignmentValue(this.textAlignment);
        }
        else {
            if (this.alignment.index === 0) {
                this.textAlignment = 'Center';
            }
            else {
                this.textAlignment = 'Justify';
            }
        }
    };
    ParagraphDialog.prototype.getAlignmentValue = function (textAlignment) {
        var alignValue;
        if (textAlignment === 'Center') {
            alignValue = 0;
        }
        else if (textAlignment === 'Left') {
            alignValue = 1;
        }
        else if (textAlignment === 'Right') {
            alignValue = 2;
        }
        else {
            alignValue = 3;
        }
        return alignValue;
    };
    /**
     * Applies Paragraph Format
     *
     * @private
     * @param {WParagraphFormat} paragraphFormat - Specifies the paragraph format.
     * @returns {void}
     */
    ParagraphDialog.prototype.onParagraphFormat = function (paragraphFormat) {
        var selection = this.documentHelper.selection;
        var isListBidi = paragraphFormat.bidi && selection.paragraphFormat.listId !== -1;
        if (!isListBidi) {
            this.documentHelper.layout.isBidiReLayout = true;
        }
        this.documentHelper.owner.editor.setPreviousBlockToLayout();
        this.documentHelper.owner.editorModule.initHistory('ParagraphFormat');
        this.documentHelper.owner.isShiftingEnabled = true;
        if (this.documentHelper.selection.isEmpty) {
            this.documentHelper.owner.editorModule.applyParaFormatProperty(selection.start.paragraph, undefined, paragraphFormat, false);
            this.documentHelper.owner.editor.layoutItemBlock(selection.start.paragraph, false);
        }
        else {
            this.documentHelper.owner.editorModule.updateSelectionParagraphFormatting('ParagraphFormat', paragraphFormat, false);
        }
        this.documentHelper.owner.editorModule.reLayout(selection);
        if (!isListBidi) {
            this.documentHelper.layout.isBidiReLayout = false;
        }
    };
    /**
     * @private
     * @param {WParagraphFormat} paragraphFormat - Specifies the paragraph format.
     * @returns {void}
     */
    ParagraphDialog.prototype.show = function (paragraphFormat) {
        if (paragraphFormat) {
            this.isStyleDialog = true;
            this.paragraphFormat = paragraphFormat;
        }
        else {
            this.isStyleDialog = false;
        }
        var local = new L10n('documenteditor', this.documentHelper.owner.defaultLocale);
        local.setLocale(this.documentHelper.owner.locale);
        if (!this.target) {
            this.initParagraphDialog(local);
        }
        this.loadParagraphDialog();
        this.documentHelper.dialog.header = local.getConstant('Paragraph');
        this.documentHelper.dialog.content = this.target;
        this.documentHelper.dialog.height = 'auto';
        this.documentHelper.dialog.width = 'auto';
        this.documentHelper.dialog.buttons = [{
                click: this.applyParagraphFormat,
                buttonModel: { content: local.getConstant('Ok'), cssClass: 'e-flat e-para-okay', isPrimary: true }
            },
            {
                click: this.closeParagraphDialog,
                buttonModel: { content: local.getConstant('Cancel'), cssClass: 'e-flat e-para-cancel' }
            }];
        this.documentHelper.dialog.beforeOpen = this.documentHelper.updateFocus;
        this.documentHelper.dialog.close = this.documentHelper.updateFocus;
        this.documentHelper.dialog.dataBind();
        this.documentHelper.dialog.show();
        var dialogElement = this.documentHelper.dialog.element;
        if (dialogElement) {
            var width = this.documentHelper.updateDialogTabHeight(dialogElement, this.target);
            this.paginationDiv.style.width = width.toString() + 'px';
        }
    };
    /**
     * @private
     * @returns {void}
     */
    ParagraphDialog.prototype.destroy = function () {
        if (this.afterSpacingIn) {
            this.afterSpacingIn.destroy();
            this.afterSpacingIn = undefined;
        }
        if (this.beforeSpacingIn) {
            this.beforeSpacingIn.destroy();
            this.beforeSpacingIn = undefined;
        }
        if (this.leftIndentIn) {
            this.leftIndentIn.destroy();
            this.leftIndentIn = undefined;
        }
        if (this.rightIndentIn) {
            this.rightIndentIn.destroy();
            this.rightIndentIn = undefined;
        }
        if (this.byIn) {
            this.byIn.destroy();
            this.byIn = undefined;
        }
        if (this.special) {
            this.special.destroy();
            this.special = undefined;
        }
        if (this.atIn) {
            this.atIn.destroy();
            this.atIn = undefined;
        }
        if (this.alignment) {
            this.alignment.change = undefined;
            this.alignment.destroy();
        }
        this.alignment = undefined;
        if (this.lineSpacing) {
            this.lineSpacing.change = undefined;
            this.lineSpacing.destroy();
        }
        this.lineSpacing = undefined;
        if (this.special) {
            this.special.change = undefined;
            this.special.destroy();
        }
        this.special = undefined;
        if (!isNullOrUndefined(this.target)) {
            if (this.target.parentElement) {
                this.target.parentElement.removeChild(this.target);
            }
            for (var q = 0; q < this.target.childNodes.length; q++) {
                this.target.removeChild(this.target.childNodes[parseInt(q.toString(), 10)]);
                q--;
            }
            this.target = undefined;
            if (this.paragraphFormat) {
                this.paragraphFormat.destroy();
                this.paragraphFormat = undefined;
            }
            this.documentHelper = undefined;
        }
    };
    return ParagraphDialog;
}());
export { ParagraphDialog };
