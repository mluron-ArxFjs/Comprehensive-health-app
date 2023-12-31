/* eslint-disable */
import { L10n, createElement, isNullOrUndefined } from '@syncfusion/ej2-base';
import { Button } from '@syncfusion/ej2-buttons';
import { ListView } from '@syncfusion/ej2-lists';
import { TextElementBox, ErrorTextElementBox } from '../viewer/page';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
/**
 * Spell check dialog
 */
var SpellCheckDialog = /** @class */ (function () {
    /**
     * @param {DocumentHelper} documentHelper - Specifies the document helper.
     * @private
     */
    function SpellCheckDialog(documentHelper) {
        var _this = this;
        /**
         * @param {SelectEventArgs} args - Specifies the event args.
         * @returns {void}
         */
        this.selectHandler = function (args) {
            _this.selectedText = args.text;
        };
        /**
         * @private
         * @returns {void}
         */
        this.onCancelButtonClick = function () {
            _this.documentHelper.clearSelectionHighlight();
            _this.documentHelper.hideDialog();
        };
        /**
         * @private
         * @returns {void}
         */
        this.onIgnoreClicked = function () {
            if (!isNullOrUndefined(_this.elementBox)) {
                showSpinner(_this.documentHelper.dialog.element);
                _this.parent.spellChecker.manageReplace('Ignore Once', _this.elementBox);
                _this.removeErrors();
                _this.parent.spellChecker.checkForNextError();
                // this.documentHelper.hideDialog();
                hideSpinner(_this.documentHelper.dialog.element);
            }
        };
        /**
         * @private
         * @returns {void}
         */
        this.onIgnoreAllClicked = function () {
            if (!isNullOrUndefined(_this.elementBox)) {
                showSpinner(_this.documentHelper.dialog.element);
                var text = _this.elementBox.text;
                _this.parent.spellChecker.handleIgnoreAllItems({ element: _this.elementBox, text: text });
                _this.parent.spellChecker.checkForNextError();
                // this.documentHelper.hideDialog();
                hideSpinner(_this.documentHelper.dialog.element);
            }
        };
        /**
         * @private
         * @returns {void}
         */
        this.addToDictClicked = function () {
            if (!isNullOrUndefined(_this.elementBox)) {
                showSpinner(_this.documentHelper.dialog.element);
                _this.parent.spellChecker.handleAddToDictionary({ element: _this.elementBox, text: _this.elementBox.text });
                if (_this.parent.spellChecker.errorWordCollection.containsKey(_this.errorText)) {
                    _this.parent.spellChecker.errorWordCollection.remove(_this.errorText);
                }
                _this.parent.spellChecker.checkForNextError();
                _this.documentHelper.hideDialog();
            }
        };
        /**
         * @private
         * @returns {void}
         */
        this.changeButtonClicked = function () {
            if (!isNullOrUndefined(_this.selectedText)) {
                _this.isSpellChecking = true;
                showSpinner(_this.documentHelper.dialog.element);
                _this.parent.spellChecker.manageReplace(_this.selectedText, _this.elementBox);
                _this.removeErrors();
                _this.parent.spellChecker.checkForNextError();
                _this.documentHelper.dialog.content = '';
                hideSpinner(_this.documentHelper.dialog.element);
            }
        };
        /**
         * @private
         * @returns {void}
         */
        this.changeAllButtonClicked = function () {
            if (!isNullOrUndefined(_this.selectedText)) {
                _this.isSpellChecking = true;
                showSpinner(_this.documentHelper.dialog.element);
                var elements = _this.parent.spellChecker.errorWordCollection.get(_this.errorText);
                for (var i = 0; i < elements.length; i++) {
                    if (elements[i] instanceof ErrorTextElementBox && !elements[i].ischangeDetected) {
                        _this.parent.spellChecker.manageReplace(_this.selectedText, elements[i]);
                    }
                    else if (elements[i] instanceof TextElementBox) {
                        var matchResults = _this.parent.spellChecker.getMatchedResultsFromElement(elements[i]);
                        var results = matchResults.textResults;
                        var markIndex = (elements[i].ischangeDetected) ?
                            elements[i].start.offset : elements[i].line.getOffset(elements[i], 0);
                        _this.parent.searchModule.textSearch.updateMatchedTextLocation(matchResults.matches, results, matchResults.elementInfo, 0, elements[i], false, null, markIndex);
                        for (var j = 0; j < results.length; j++) {
                            var element = _this.parent.spellChecker.createErrorElementWithInfo(results.innerList[j], elements[i]);
                            _this.parent.spellChecker.manageReplace(_this.selectedText, element);
                        }
                    }
                }
                if (_this.parent.spellChecker.errorWordCollection.containsKey(_this.errorText)) {
                    _this.parent.spellChecker.errorWordCollection.remove(_this.errorText);
                }
                _this.parent.spellChecker.checkForNextError();
                _this.documentHelper.dialog.content = '';
                // this.documentHelper.hideDialog();
                hideSpinner(_this.documentHelper.dialog.element);
            }
        };
        this.documentHelper = documentHelper;
        createSpinner({ target: this.documentHelper.dialog.element, cssClass: 'e-spin-overlay' });
    }
    Object.defineProperty(SpellCheckDialog.prototype, "parent", {
        get: function () {
            return this.documentHelper.owner;
        },
        enumerable: true,
        configurable: true
    });
    SpellCheckDialog.prototype.getModuleName = function () {
        return 'SpellCheckDialog';
    };
    SpellCheckDialog.prototype.removeErrors = function () {
        if (!isNullOrUndefined(this.errorText) && this.parent.spellChecker.errorWordCollection.containsKey(this.errorText)) {
            var textElement = this.parent.spellChecker.errorWordCollection.get(this.errorText);
            textElement.splice(0, 1);
            if (textElement.length === 0) {
                this.parent.spellChecker.errorWordCollection.remove(this.errorText);
            }
        }
        if (this.parent.spellChecker.errorWordCollection.length === 0) {
            this.documentHelper.hideDialog();
        }
    };
    /**
     * @private
     * @param {string} error - Specifies error element box.
     * @param {ElementBox} elementbox - Specifies the element box.
     * @returns {void}
     */
    SpellCheckDialog.prototype.show = function (error, elementbox) {
        this.target = undefined;
        this.localValue = new L10n('documenteditor', this.documentHelper.owner.defaultLocale);
        this.localValue.setLocale(this.documentHelper.owner.locale);
        if (!this.target) {
            this.updateSuggestionDialog(error, elementbox);
        }
    };
    /**
     * @private
     * @param {string} error - Specifies error element box.
     * @param {ElementBox} elementbox - Specifies the element box.
     * @returns {void}
     */
    SpellCheckDialog.prototype.updateSuggestionDialog = function (error, elementBox) {
        var _this = this;
        this.elementBox = elementBox;
        var suggestions;
        if (this.isSpellChecking) {
            /* eslint-disable @typescript-eslint/no-explicit-any */
            this.parent.spellChecker.callSpellChecker(this.parent.spellChecker.languageID, error, false, true).then(function (data) {
                /* eslint-disable @typescript-eslint/no-explicit-any */
                var jsonObject = JSON.parse(data);
                suggestions = jsonObject.Suggestions;
                _this.isSpellChecking = false;
                _this.handleRetrievedSuggestion(error, suggestions);
            });
        }
        else {
            error = this.parent.spellChecker.manageSpecialCharacters(error, undefined, true);
            suggestions = this.parent.spellChecker.errorSuggestions.containsKey(error) ?
                this.parent.spellChecker.errorSuggestions.get(error) : [];
            this.handleRetrievedSuggestion(error, suggestions);
        }
    };
    SpellCheckDialog.prototype.handleRetrievedSuggestion = function (error, suggestions) {
        error = this.parent.spellChecker.manageSpecialCharacters(error, undefined, true);
        this.initSpellCheckDialog(this.localValue, error, suggestions);
        if (this.documentHelper.selection.caret.style.display !== 'none') {
            this.documentHelper.selection.caret.style.display = 'none';
        }
        this.documentHelper.dialog.header = this.localValue.getConstant('Spelling Editor');
        this.documentHelper.dialog.height = 'auto';
        this.documentHelper.dialog.width = 'auto';
        this.documentHelper.dialog.content = this.target;
        this.documentHelper.dialog.beforeOpen = this.documentHelper.updateFocus;
        this.documentHelper.dialog.buttons = [{
                click: this.onCancelButtonClick,
                buttonModel: { content: this.localValue.getConstant('Cancel'), cssClass: 'e-control e-flat', isPrimary: true }
            }];
        this.documentHelper.dialog.dataBind();
        this.documentHelper.dialog.show();
        hideSpinner(this.documentHelper.dialog.element);
    };
    /**
     * @private
     * @param {L10n} localValue - Specifies the locale value.
     * @param {string} error - Specifies the error text.
     * @param {string[]} suggestion - Specifies the suggestion.
     * @param {boolean} isRtl - Specifies the is rtl
     * @returns {void}
     */
    SpellCheckDialog.prototype.initSpellCheckDialog = function (localValue, error, suggestion, isRtl) {
        var id = this.documentHelper.owner.containerId + '_add_SpellCheck';
        this.target = createElement('div', { id: id, className: 'e-de-insert-spellchecker' });
        this.errorText = error;
        var textContainer = createElement('div', {
            className: 'e-de-dlg-sub-header', innerHTML: localValue.getConstant('Spelling')
        });
        this.target.appendChild(textContainer);
        var spellContainer = createElement('div', { className: 'e-de-spellcheck-error-container' });
        var listviewDiv = createElement('div', { className: 'e-de-dlg-spellcheck-listview' });
        spellContainer.appendChild(listviewDiv);
        this.spellingListView = new ListView({
            dataSource: [error],
            cssClass: 'e-dlg-spellcheck-listitem'
        });
        this.spellingListView.appendTo(listviewDiv);
        var buttonDiv = createElement('div', { className: 'e-de-spellcheck-btncontainer' });
        spellContainer.appendChild(buttonDiv);
        var ignoreButtonElement = createElement('button', { innerHTML: localValue.getConstant('Ignore') });
        buttonDiv.appendChild(ignoreButtonElement);
        ignoreButtonElement.setAttribute('aria-label', localValue.getConstant('Ignore'));
        var ignorebutton = new Button({ cssClass: 'e-control e-de-ok-button e-de-spellcheck-btn' });
        ignorebutton.appendTo(ignoreButtonElement);
        ignoreButtonElement.addEventListener('click', this.onIgnoreClicked);
        var ignoreAllButtonElement = createElement('button', { innerHTML: localValue.getConstant('Ignore All') });
        ignoreAllButtonElement.setAttribute('aria-label', localValue.getConstant('Ignore All'));
        buttonDiv.appendChild(ignoreAllButtonElement);
        var ignoreAllbutton = new Button({ cssClass: 'e-control e-de-ok-button e-de-spellcheck-btn' });
        ignoreAllbutton.appendTo(ignoreAllButtonElement);
        ignoreAllButtonElement.addEventListener('click', this.onIgnoreAllClicked);
        var addDictButtonElement = createElement('button', { innerHTML: localValue.getConstant('Add to Dictionary') });
        addDictButtonElement.setAttribute('aria-label', localValue.getConstant('Add to Dictionary'));
        buttonDiv.appendChild(addDictButtonElement);
        var addDictButton = new Button({ cssClass: 'e-control e-de-ok-button e-de-spellcheck-btn' });
        addDictButton.appendTo(addDictButtonElement);
        addDictButtonElement.addEventListener('click', this.addToDictClicked);
        this.target.appendChild(spellContainer);
        var suggestionDiv = createElement('div', {
            className: 'e-de-dlg-sub-header', innerHTML: localValue.getConstant('Suggestions')
        });
        this.target.appendChild(suggestionDiv);
        var suggestionContainer = createElement('div', { className: 'e-de-spellcheck-suggestion-container' });
        this.target.appendChild(suggestionContainer);
        var suggestListDiv = createElement('div', { className: 'e-de-dlg-spellcheck-listview' });
        suggestListDiv.setAttribute('aria-label', localValue.getConstant('Suggestions'));
        suggestionContainer.appendChild(suggestListDiv);
        this.suggestionListView = new ListView({
            dataSource: suggestion,
            cssClass: 'e-dlg-spellcheck-listitem'
        });
        this.suggestionListView.appendTo(suggestListDiv);
        this.suggestionListView.addEventListener('select', this.selectHandler);
        var suggestBtnContainder = createElement('div', { className: 'e-de-spellcheck-btncontainer' });
        suggestionContainer.appendChild(suggestBtnContainder);
        var changeButtonElement = createElement('button', { innerHTML: localValue.getConstant('Change') });
        changeButtonElement.setAttribute('aria-label', localValue.getConstant('Change'));
        suggestBtnContainder.appendChild(changeButtonElement);
        var changeButton = new Button({ cssClass: 'e-control e-de-ok-button e-de-spellcheck-btn' });
        changeButton.appendTo(changeButtonElement);
        changeButtonElement.addEventListener('click', this.changeButtonClicked);
        var changeAllButtonElement = createElement('button', { innerHTML: localValue.getConstant('Change All') });
        changeAllButtonElement.setAttribute('aria-label', localValue.getConstant('Change All'));
        suggestBtnContainder.appendChild(changeAllButtonElement);
        var changeAllbutton = new Button({ cssClass: 'e-control e-de-ok-button e-de-spellcheck-btn' });
        changeAllbutton.appendTo(changeAllButtonElement);
        changeAllButtonElement.addEventListener('click', this.changeAllButtonClicked);
        if (isNullOrUndefined(suggestion) || suggestion.length === 0) {
            changeButton.disabled = true;
            changeAllbutton.disabled = true;
        }
    };
    /**
     * @private
     * @returns {void}
     */
    SpellCheckDialog.prototype.destroy = function () {
        if (this.target) {
            this.target.remove();
            this.target = undefined;
        }
        if (this.elementBox) {
            this.elementBox.destroy();
            this.elementBox = undefined;
        }
        this.documentHelper = undefined;
        if (this.spellingListView) {
            this.spellingListView.destroy();
            this.spellingListView = undefined;
        }
        if (this.suggestionListView) {
            this.suggestionListView.destroy();
            this.suggestionListView = undefined;
        }
    };
    return SpellCheckDialog;
}());
export { SpellCheckDialog };
