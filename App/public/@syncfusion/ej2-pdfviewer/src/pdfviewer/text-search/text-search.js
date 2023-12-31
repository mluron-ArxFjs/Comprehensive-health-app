/* eslint-disable */
import { createElement, Browser, isNullOrUndefined, isBlazor } from '@syncfusion/ej2-base';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { AjaxHandler } from '../index';
import { createSpinner, showSpinner, hideSpinner } from '../index';
/**
 * TextSearch module
 */
var TextSearch = /** @class */ (function () {
    /**
     * @param pdfViewer
     * @param pdfViewerBase
     * @param pdfViewer
     * @param pdfViewerBase
     * @private
     */
    function TextSearch(pdfViewer, pdfViewerBase) {
        var _this = this;
        /**
         * @private
         */
        this.isTextSearch = false;
        /**
         * @private
         */
        this.searchCount = 0;
        this.searchIndex = 0;
        this.currentSearchIndex = 0;
        this.startIndex = null;
        this.searchPageIndex = null;
        this.searchString = null;
        this.isMatchCase = false;
        this.searchRequestHandler = null;
        // eslint-disable-next-line
        this.textContents = new Array();
        // eslint-disable-next-line
        this.searchMatches = new Array();
        // eslint-disable-next-line
        this.searchCollection = new Array();
        this.searchedPages = [];
        this.isPrevSearch = false;
        /**
         * @private
         */
        this.searchTextDivzIndex = "-1";
        // eslint-disable-next-line
        this.tempElementStorage = new Array();
        /**
         * @private
         */
        this.isMessagePopupOpened = false;
        /**
         * @private
         */
        this.isTextRetrieved = false;
        this.isTextSearched = false;
        this.isTextSearchEventTriggered = false;
        this.isSearchText = false;
        // eslint-disable-next-line
        this.checkBoxOnChange = function (event) {
            if (isBlazor()) {
                if (event.currentTarget && event.currentTarget.checked) {
                    _this.isMatchCase = true;
                }
                else {
                    _this.isMatchCase = false;
                }
            }
            else {
                if (event.checked) {
                    _this.isMatchCase = true;
                }
                else {
                    _this.isMatchCase = false;
                }
            }
            if (_this.isTextSearch) {
                _this.resetVariables();
                _this.clearAllOccurrences();
                var inputString = _this.searchInput.value;
                _this.searchIndex = 0;
                _this.textSearch(inputString);
            }
        };
        this.searchKeypressHandler = function (event) {
            _this.enableNextButton(true);
            _this.enablePrevButton(true);
            if (event.which === 13) {
                _this.initiateTextSearch(_this.searchInput);
                _this.updateSearchInputIcon(false);
            }
            else {
                _this.resetVariables();
            }
        };
        this.searchClickHandler = function (event) {
            _this.searchButtonClick(_this.searchBtn, _this.searchInput);
        };
        this.nextButtonOnClick = function (event) {
            _this.nextSearch();
        };
        this.prevButtonOnClick = function (event) {
            _this.prevSearch();
        };
        this.pdfViewer = pdfViewer;
        this.pdfViewerBase = pdfViewerBase;
    }
    /**
     * @private
     */
    TextSearch.prototype.createTextSearchBox = function () {
        var _this = this;
        // eslint-disable-next-line max-len
        this.searchBox = createElement('div', { id: this.pdfViewer.element.id + '_search_box', className: 'e-pv-search-bar' });
        var toolbarElement;
        if (isBlazor()) {
            toolbarElement = document.getElementById('toolbarContainer');
        }
        else {
            toolbarElement = this.pdfViewerBase.getElement('_toolbarContainer');
        }
        if (toolbarElement) {
            if (isBlazor()) {
                this.searchBox.style.top = toolbarElement.clientHeight + 'px';
            }
            else {
                this.searchBox.style.top = toolbarElement.clientHeight + 'px';
            }
        }
        var searchElementsContainer = createElement('div', { id: this.pdfViewer.element.id + '_search_box_elements', className: 'e-pv-search-bar-elements' });
        // eslint-disable-next-line max-len
        var searchInputContainer = createElement('div', { id: this.pdfViewer.element.id + '_search_input_container', className: 'e-input-group e-pv-search-input' });
        this.searchInput = createElement('input', { id: this.pdfViewer.element.id + '_search_input', className: 'e-input' });
        this.searchInput.type = 'text';
        if (isBlazor()) {
            var promise = this.pdfViewer._dotnetInstance.invokeMethodAsync('GetLocaleText', 'PdfViewer_Findindocument');
            promise.then(function (value) {
                _this.searchInput.placeholder = value;
            });
        }
        else {
            this.searchInput.placeholder = this.pdfViewer.localeObj.getConstant('Find in document');
        }
        // eslint-disable-next-line max-len
        this.searchBtn = createElement('span', { id: this.pdfViewer.element.id + '_search_box-icon', className: 'e-input-group-icon e-input-search-group-icon e-pv-search-icon' });
        searchInputContainer.appendChild(this.searchInput);
        searchInputContainer.appendChild(this.searchBtn);
        searchElementsContainer.appendChild(searchInputContainer);
        if (this.pdfViewer.enableRtl) {
            this.prevSearchBtn = this.createSearchBoxButtons('prev_occurrence', 'e-pv-next-search');
        }
        else {
            this.prevSearchBtn = this.createSearchBoxButtons('prev_occurrence', 'e-pv-prev-search');
        }
        this.prevSearchBtn.setAttribute('aria-label', 'Previous Search text');
        searchElementsContainer.appendChild(this.prevSearchBtn);
        if (this.pdfViewer.enableRtl) {
            this.nextSearchBtn = this.createSearchBoxButtons('next_occurrence', 'e-pv-prev-search');
        }
        else {
            this.nextSearchBtn = this.createSearchBoxButtons('next_occurrence', 'e-pv-next-search');
        }
        this.nextSearchBtn.setAttribute('aria-label', 'Next Search text');
        searchElementsContainer.appendChild(this.nextSearchBtn);
        // eslint-disable-next-line max-len
        var matchCaseContainer = createElement('div', { id: this.pdfViewer.element.id + '_match_case_container', className: 'e-pv-match-case-container' });
        var matchCaseInput = createElement('input', { id: this.pdfViewer.element.id + '_match_case' });
        matchCaseInput.type = 'checkbox';
        if (isBlazor()) {
            matchCaseInput.style.height = '17px';
            matchCaseInput.style.width = '17px';
            matchCaseInput.addEventListener('change', this.checkBoxOnChange.bind(this));
        }
        matchCaseContainer.appendChild(matchCaseInput);
        this.searchBox.appendChild(searchElementsContainer);
        this.searchBox.appendChild(matchCaseContainer);
        this.pdfViewerBase.mainContainer.appendChild(this.searchBox);
        if (isBlazor()) {
            // eslint-disable-next-line max-len
            var matchCaseText_1 = createElement('span', { id: this.pdfViewer.element.id + '_search_box_text', styles: 'position: absolute; padding-top: 3px; padding-left: 8px; padding-right: 8px; font-size: 13px' });
            var promise = this.pdfViewer._dotnetInstance.invokeMethodAsync('GetLocaleText', 'PdfViewer_Matchcase');
            promise.then(function (value) {
                matchCaseText_1.textContent = value;
            });
            matchCaseContainer.appendChild(matchCaseText_1);
        }
        else {
            // eslint-disable-next-line max-len
            var checkBox = new CheckBox({ cssClass: 'e-pv-match-case', label: this.pdfViewer.localeObj.getConstant('Match case'), change: this.checkBoxOnChange.bind(this) });
            checkBox.appendTo(matchCaseInput);
        }
        var waitingPopup = createElement('div', { id: this.pdfViewer.element.id + '_textSearchLoadingIndicator' });
        searchInputContainer.appendChild(waitingPopup);
        waitingPopup.style.position = 'absolute';
        waitingPopup.style.top = '15px';
        waitingPopup.style.left = searchInputContainer.clientWidth - 46 + 'px';
        createSpinner({ target: waitingPopup, cssClass: 'e-spin-center' });
        this.setLoaderProperties(waitingPopup);
        this.showSearchBox(false);
        if (this.pdfViewer.enableRtl) {
            this.searchBox.classList.add('e-rtl');
            this.searchBox.style.left = '88.3px';
        }
        else {
            this.searchBox.classList.remove('e-rtl');
            this.searchBox.style.right = '88.3px';
        }
        this.searchInput.addEventListener('focus', function () {
            _this.searchInput.parentElement.classList.add('e-input-focus');
        });
        this.searchInput.addEventListener('blur', function () {
            _this.searchInput.parentElement.classList.remove('e-input-focus');
        });
        this.searchInput.addEventListener('keydown', this.searchKeypressHandler.bind(this));
        this.searchBtn.addEventListener('click', this.searchClickHandler.bind(this));
        this.nextSearchBtn.addEventListener('click', this.nextButtonOnClick.bind(this));
        this.prevSearchBtn.addEventListener('click', this.prevButtonOnClick.bind(this));
    };
    TextSearch.prototype.setLoaderProperties = function (element) {
        var spinnerElement = element.firstChild.firstChild.firstChild;
        if (spinnerElement) {
            spinnerElement.style.height = '18px';
            spinnerElement.style.width = '18px';
            spinnerElement.style.transformOrigin = '9px 9px 9px';
        }
    };
    TextSearch.prototype.showLoadingIndicator = function (isShow) {
        var waitingPopup = document.getElementById(this.pdfViewer.element.id + '_textSearchLoadingIndicator');
        if (waitingPopup) {
            if (isShow) {
                showSpinner(waitingPopup);
            }
            else {
                hideSpinner(waitingPopup);
            }
        }
    };
    /**
     * @private
     */
    TextSearch.prototype.textSearchBoxOnResize = function () {
        if (this.pdfViewer.toolbarModule && this.pdfViewer.enableToolbar) {
            var secondaryToolbar = this.pdfViewerBase.getElement('_toolbarContainer_popup');
            if (secondaryToolbar) {
                if (secondaryToolbar.contains(this.pdfViewerBase.getElement('_search').parentElement)) {
                    this.searchBox.style.right = '0px';
                }
            }
        }
        else {
            // eslint-disable-next-line max-len
            if (this.pdfViewerBase.viewerContainer.clientWidth + this.pdfViewerBase.viewerContainer.offsetLeft < this.searchBox.offsetLeft + this.searchBox.clientWidth) {
                this.searchBox.style.right = '0px';
                // eslint-disable-next-line
                this.searchBox.style.width = parseInt(this.searchBox.style.width) - ((this.searchBox.offsetLeft + this.searchBox.clientWidth) - (this.pdfViewerBase.viewerContainer.clientWidth)) + 'px';
                // eslint-disable-next-line
                this.searchInput.style.width = parseInt(this.searchInput.style.width) - ((this.searchBox.offsetLeft + this.searchBox.clientWidth) - (this.pdfViewerBase.viewerContainer.clientWidth)) + 'px';
            }
            else {
                this.searchBox.style.right = '88.3px';
                this.searchBox.style.width = '';
                this.searchInput.style.width = '';
            }
        }
    };
    /**
     * @param isShow
     * @private
     */
    TextSearch.prototype.showSearchBox = function (isShow) {
        if (isShow) {
            this.searchBox.style.display = 'block';
        }
        else {
            this.searchBox.style.display = 'none';
            this.searchInput.value = '';
        }
        this.onTextSearchClose();
    };
    /**
     * @private
     */
    TextSearch.prototype.searchAfterSelection = function () {
        if (this.isTextSearch) {
            this.initSearch(this.searchPageIndex, true);
            this.highlightOthers();
        }
    };
    TextSearch.prototype.initiateTextSearch = function (searchElement) {
        var inputString = searchElement.value;
        if (inputString && inputString.length > 0 && inputString[inputString.length - 1] === ' ') {
            inputString = inputString.slice(0, inputString.length - 1);
        }
        this.initiateSearch(inputString);
    };
    /**
     * @param inputString
     * @private
     */
    TextSearch.prototype.initiateSearch = function (inputString) {
        if (inputString !== this.searchString) {
            this.isTextSearch = false;
            this.searchPageIndex = this.pdfViewerBase.currentPageNumber - 1;
        }
        this.clearAllOccurrences();
        if (inputString !== '') {
            // eslint-disable-next-line
            if (this.searchMatches[this.searchPageIndex] && inputString === this.searchString) {
                if (this.searchMatches[this.searchPageIndex].length === 0) {
                    this.initSearch(this.searchPageIndex, false);
                }
                else {
                    this.nextSearch();
                }
            }
            else {
                this.resetVariables();
                this.searchIndex = 0;
                this.textSearch(inputString);
            }
        }
    };
    TextSearch.prototype.textSearch = function (inputString) {
        if (inputString !== '' || inputString) {
            this.searchString = inputString;
            this.isTextSearch = true;
            this.isSearchText = true;
            this.searchPageIndex = this.pdfViewerBase.currentPageNumber - 1;
            this.searchCount = 0;
            this.isTextSearchEventTriggered = false;
            this.showLoadingIndicator(true);
            this.pdfViewer.fireTextSearchStart(inputString, this.isMatchCase);
            if (this.pdfViewer.isExtractText) {
                if (this.isTextRetrieved) {
                    for (var i = 0; i < this.pdfViewerBase.pageCount; i++) {
                        this.initSearch(i, false, true);
                    }
                }
                else {
                    this.isTextSearched = true;
                    for (var i = 0; i < this.documentTextCollection.length; i++) {
                        this.initSearch(i, false, true);
                    }
                }
            }
            this.initSearch(this.searchPageIndex, false);
            this.highlightOthers();
        }
    };
    TextSearch.prototype.nextSearch = function () {
        this.isPrevSearch = false;
        this.isTextSearch = true;
        this.isSearchText = false;
        if (this.searchString) {
            this.clearAllOccurrences();
            this.searchIndex = this.searchIndex + 1;
            if (this.searchMatches[this.searchPageIndex]) {
                // eslint-disable-next-line max-len
                if (this.searchIndex >= this.searchMatches[this.searchPageIndex].length) {
                    this.searchIndex = 0;
                    this.searchPageIndex = ((this.searchPageIndex + 1) < this.pdfViewerBase.pageCount) ? (this.searchPageIndex + 1) : 0;
                    if (this.pdfViewerBase.pageCount > 1) {
                        this.initSearch(this.searchPageIndex, false);
                    }
                    else {
                        this.initSearch(this.searchPageIndex, true);
                        if (!this.isMessagePopupOpened) {
                            this.onMessageBoxOpen();
                        }
                        this.pdfViewerBase.updateScrollTop(this.searchPageIndex);
                    }
                    this.showLoadingIndicator(true);
                }
                else {
                    this.highlightSearchedTexts(this.searchPageIndex, false, undefined);
                    this.showLoadingIndicator(false);
                }
                this.highlightOthers(true);
            }
            else {
                this.initiateTextSearch(this.searchInput);
            }
        }
        else {
            this.initiateTextSearch(this.searchInput);
        }
    };
    TextSearch.prototype.prevSearch = function () {
        this.isPrevSearch = true;
        this.isTextSearch = true;
        this.isSearchText = false;
        if (this.searchString) {
            this.clearAllOccurrences();
            this.searchIndex = this.searchIndex - 1;
            if (this.searchIndex < 0) {
                this.searchPageIndex = ((this.searchPageIndex - 1) < 0) ? (this.pdfViewerBase.pageCount - 1) : this.searchPageIndex - 1;
                this.initSearch(this.searchPageIndex, false);
                this.showLoadingIndicator(true);
            }
            else {
                this.highlightSearchedTexts(this.searchPageIndex, false, undefined);
                this.showLoadingIndicator(false);
            }
            this.highlightOthers(true);
        }
        else {
            this.searchIndex = this.searchIndex - 1;
            this.searchPageIndex = ((this.searchPageIndex - 1) < 0) ? (this.pdfViewerBase.pageCount - 1) : this.searchPageIndex - 1;
            var inputString = this.searchInput.value;
            this.textSearch(inputString);
        }
    };
    TextSearch.prototype.initSearch = function (pageIndex, isSinglePageSearch, isCount) {
        // eslint-disable-next-line
        var storedData = this.pdfViewerBase.getStoredData(pageIndex, true);
        var pageText = null;
        var textContents = null;
        // eslint-disable-next-line
        var characterBounds = null;
        if (isCount) {
            if (this.documentTextCollection.length !== 0) {
                // eslint-disable-next-line
                var documentIndex = this.documentTextCollection[pageIndex][pageIndex];
                var pageTextData = documentIndex.pageText ? documentIndex.pageText : documentIndex.PageText;
                if (this.documentTextCollection[pageIndex] && documentIndex) {
                    // eslint-disable-next-line max-len
                    this.getSearchTextContent(pageIndex, this.searchString, pageTextData, textContents, isSinglePageSearch, this.documentTextCollection[pageIndex]);
                }
            }
        }
        else {
            if (storedData) {
                // eslint-disable-next-line
                pageText = storedData['pageText'];
                // eslint-disable-next-line
                textContents = storedData['textContent'];
                characterBounds = this.pdfViewerBase.textLayer.characterBound[pageIndex];
                this.textContents[pageIndex] = textContents;
                this.getPossibleMatches(pageIndex, this.searchString, pageText, textContents, isSinglePageSearch, characterBounds);
            }
            else {
                if (!isSinglePageSearch) {
                    this.createRequestForSearch(pageIndex);
                }
            }
        }
        if (this.pdfViewerBase.pageCount === (this.searchedPages && this.searchedPages.length)) {
            if (!this.isTextSearchEventTriggered) {
                this.isTextSearchEventTriggered = true;
                this.pdfViewer.fireTextSearchComplete(this.searchString, this.isMatchCase);
            }
        }
    };
    // eslint-disable-next-line
    TextSearch.prototype.getPossibleMatches = function (pageIndex, searchString, pageString, textContents, isSinglePageSearch, characterBounds) {
        var arrayReturns;
        if (this.searchMatches && !this.searchMatches[pageIndex]) {
            var pageText = pageString;
            var searchText = searchString;
            var multiSearch = (pageText.replace((/(\s\r\n)/gm), ' ')).replace((/(\r\n)/gm), " ");
            var Multiline = (pageString.replace((/(\s\r\n)/gm), '  ')).replace((/(\r\n)/gm), " ");
            var specialCharcterSearch = multiSearch.replace(/[^a-zA-z0-9" "]/g, "");
            var queryLength = searchString.length;
            if (!this.isMatchCase) {
                searchText = searchString.toLowerCase();
                pageText = pageString.toLowerCase();
                multiSearch = multiSearch.toLowerCase();
                Multiline = Multiline.toLowerCase();
                specialCharcterSearch = specialCharcterSearch.toLowerCase();
            }
            var matches = [];
            var matchedArray = [];
            var matchIndex = -queryLength;
            var newIndex = -queryLength;
            var multiSearchIndex = -queryLength;
            var MultilineIndex = -queryLength;
            var specialcharcterIndex = -queryLength;
            while (matchIndex !== 0 || matchIndex === 0) {
                if (searchText === '' || searchText === ' ' || !searchText) {
                    break;
                }
                matchIndex = pageText.indexOf(searchText, matchIndex + queryLength);
                if (searchText.indexOf(' ') !== -1) {
                    var newString = searchString.replace(' ', '\r\n');
                    newIndex = pageText.indexOf(newString, newIndex + queryLength);
                    newIndex = -1;
                    if (!(newIndex <= -1)) {
                        if (newIndex < matchIndex) {
                            matches.push(newIndex);
                        }
                    }
                }
                if (matchIndex <= -1 && newIndex <= -1) {
                    break;
                }
                if (!(matchIndex <= -1)) {
                    matches.push(matchIndex);
                }
                if (newIndex > matchIndex && !(newIndex <= -1)) {
                    matches.push(newIndex);
                }
            }
            if (matches.length == 0) {
                multiSearchIndex = multiSearch.indexOf(searchText, multiSearchIndex + queryLength);
                MultilineIndex = Multiline.indexOf(searchText, MultilineIndex + queryLength);
                specialcharcterIndex = specialCharcterSearch.indexOf(searchText, specialcharcterIndex + queryLength);
                if (multiSearchIndex !== -1) {
                    arrayReturns = this.correctLinetext(searchString, matchIndex, pageText);
                    matchIndex = -arrayReturns[0].length;
                    for (var i = 0; i < arrayReturns.length; i++) {
                        matchIndex = pageText.indexOf(arrayReturns[i].trim(), matchIndex + (arrayReturns[i - 1] === undefined || null ? arrayReturns[0].length : arrayReturns[i - 1].length));
                        matchedArray.push(matchIndex);
                        if (matchedArray.length > 1) {
                            if ((matchedArray[1] - (matchedArray[0] + arrayReturns[0].length)) <= 3) {
                                matches.push(matchedArray);
                                this.searchMatches[pageIndex] = matches;
                            }
                            else {
                                i = -1;
                                matchIndex = matchedArray[0] + arrayReturns[0].length;
                                matchedArray.splice(0, matchedArray.length);
                            }
                        }
                    }
                }
                else if (specialcharcterIndex !== -1) {
                    arrayReturns = this.correctLinetext(searchString, matchIndex, pageText);
                    matchIndex = -arrayReturns[0].length;
                    for (var i = 0; i < arrayReturns.length; i++) {
                        matchIndex = pageText.indexOf(arrayReturns[i].trim(), matchIndex + (arrayReturns[i - 1] === undefined || null ? arrayReturns[0].length : arrayReturns[i - 1].length));
                        matchedArray.push(matchIndex);
                        if (matchedArray.length > 1) {
                            if ((matchedArray[1] - (matchedArray[0] + arrayReturns[0].length)) <= 3) {
                                matches.push(matchedArray);
                                this.searchMatches[pageIndex] = matches;
                            }
                            else {
                                i = -1;
                                matchIndex = matchedArray[0] + arrayReturns[0].length;
                                matchedArray.splice(0, matchedArray.length);
                            }
                        }
                    }
                }
                else if (MultilineIndex !== -1) {
                    arrayReturns = this.correctLinetext(searchString, matchIndex, pageText);
                    matchIndex = -arrayReturns[0].length;
                    for (var i = 0; i < arrayReturns.length; i++) {
                        matchIndex = pageText.indexOf(arrayReturns[i].trim(), matchIndex + (arrayReturns[i - 1] === undefined || null ? arrayReturns[0].length : arrayReturns[i - 1].length));
                        matchedArray.push(matchIndex);
                        if (matchedArray.length > 1) {
                            if ((matchedArray[1] - (matchedArray[0] + arrayReturns[0].length)) <= 3) {
                                matches.push(matchedArray);
                                this.searchMatches[pageIndex] = matches;
                            }
                            else {
                                i = -1;
                                matchIndex = matchedArray[0] + arrayReturns[0].length;
                                matchedArray.splice(0, matchedArray.length);
                            }
                        }
                    }
                }
                if (matches.length > 1) {
                    matches.splice(1, matches.length);
                }
            }
            if (this.searchMatches && matches.length > 0) {
                this.searchMatches[pageIndex] = matches;
            }
        }
        if (!isSinglePageSearch) {
            if (this.searchedPages.indexOf(pageIndex) === -1) {
                this.searchedPages.push(pageIndex);
                this.startIndex = this.searchedPages[0];
            }
            this.updateSearchInputIcon(false);
        }
        if (this.searchMatches && this.searchMatches[pageIndex] && this.searchMatches[pageIndex].length !== 0) {
            if (!isSinglePageSearch) {
                if (this.isPrevSearch) {
                    this.searchIndex = this.searchMatches[pageIndex].length - 1;
                }
                if ((this.pdfViewerBase.currentPageNumber - 1) !== this.searchPageIndex) {
                    // eslint-disable-next-line max-len
                    if (this.searchMatches.length > 0 && (this.searchIndex === 0 || this.searchIndex === -1) && (this.searchPageIndex) === this.currentSearchIndex) {
                        if (!this.isMessagePopupOpened && !this.isSearchText) {
                            this.onMessageBoxOpen();
                        }
                        this.searchPageIndex = this.getSearchPage(this.pdfViewerBase.currentPageNumber - 1);
                        this.searchedPages = [this.searchPageIndex];
                    }
                    // eslint-disable-next-line max-len
                    else if (this.isPrevSearch && this.searchMatches && this.searchMatches.length > 0 && (this.searchMatches[this.searchPageIndex] && this.searchMatches[this.searchPageIndex].length > 0) && this.searchedPages.length === this.pdfViewerBase.pageCount && this.startIndex - 1 === this.searchPageIndex) {
                        if (!this.isMessagePopupOpened) {
                            this.onMessageBoxOpen();
                        }
                        this.searchedPages = [this.startIndex];
                    }
                    this.pdfViewerBase.updateScrollTop(this.searchPageIndex);
                }
                else if (this.searchMatches && (this.searchMatches[this.searchPageIndex] && this.searchMatches[this.searchPageIndex].length > 0) && this.searchedPages.length === this.pdfViewerBase.pageCount && this.startIndex === this.searchPageIndex && this.pdfViewerBase.pageCount > 1) {
                    if (!this.isMessagePopupOpened) {
                        this.onMessageBoxOpen();
                    }
                    this.searchedPages = [this.startIndex];
                }
            }
            this.highlightSearchedTexts(pageIndex, isSinglePageSearch, arrayReturns);
        }
        else {
            if (!isSinglePageSearch) {
                if (this.isPrevSearch) {
                    this.searchPageIndex = ((this.searchPageIndex - 1) < 0) ? (this.pdfViewerBase.pageCount - 1) : this.searchPageIndex - 1;
                }
                else {
                    this.searchPageIndex = ((this.searchPageIndex + 1) < this.pdfViewerBase.pageCount) ? (this.searchPageIndex + 1) : 0;
                }
                if (this.searchedPages.indexOf(this.searchPageIndex) === -1 && this.searchedPages.length !== this.pdfViewerBase.pageCount) {
                    this.showLoadingIndicator(true);
                    this.initSearch(this.searchPageIndex, false);
                }
                else {
                    var searchPageIndex = this.getSearchPage(pageIndex);
                    // eslint-disable-next-line max-len
                    if (this.searchMatches && isNullOrUndefined(this.searchMatches[this.searchPageIndex]) && this.searchedPages.length === this.pdfViewerBase.pageCount) {
                        // eslint-disable-next-line max-len
                        if (!this.isMessagePopupOpened) {
                            this.onMessageBoxOpen();
                        }
                        this.pdfViewerBase.updateScrollTop(this.startIndex);
                        // eslint-disable-next-line max-len
                    }
                    else if (this.searchMatches && this.searchMatches.length > 0 && (this.searchIndex === 0 || this.searchIndex === -1) && (searchPageIndex) === this.currentSearchIndex) {
                        if (this.isPrevSearch) {
                            // eslint-disable-next-line max-len
                            if (!this.isMessagePopupOpened) {
                                this.onMessageBoxOpen();
                            }
                            this.searchPageIndex = searchPageIndex;
                            this.searchedPages = [searchPageIndex];
                            this.searchIndex = -1;
                        }
                        else {
                            if (!this.isMessagePopupOpened && this.pdfViewerBase.currentPageNumber !== 1 && !this.isSearchText) {
                                this.onMessageBoxOpen();
                            }
                            this.searchPageIndex = searchPageIndex;
                            this.searchedPages = [searchPageIndex];
                            this.searchIndex = 0;
                        }
                        this.highlightSearchedTexts(this.searchPageIndex, isSinglePageSearch, undefined);
                    }
                    else if (this.searchMatches && (this.searchMatches[this.searchPageIndex] && this.searchMatches[this.searchPageIndex].length > 0) && this.searchedPages.length === this.pdfViewerBase.pageCount) {
                        if (!this.isMessagePopupOpened) {
                            this.onMessageBoxOpen();
                        }
                        this.searchPageIndex = this.startIndex;
                        this.searchedPages = [this.searchPageIndex];
                        this.searchIndex = 0;
                        this.pdfViewerBase.updateScrollTop(this.startIndex);
                        this.highlightSearchedTexts(this.searchPageIndex, isSinglePageSearch, undefined);
                    }
                }
            }
        }
    };
    TextSearch.prototype.correctLinetext = function (searchString, matchIndex, pageText) {
        var indiuvalLineArray = [];
        var searchArray = searchString.split(/[" "]+/);
        if (!this.isMatchCase) {
            searchArray = searchString.toLowerCase().split(/[" "]+/);
        }
        matchIndex = 0;
        var linestring = "";
        var mergedText = pageText.replace(/ \r\n/g, " ");
        mergedText = mergedText.replace(/\r\n/g, " ");
        mergedText = mergedText.replace(/[^a-zA-Z0-9 ]/g, '');
        searchString = searchString.replace(/[^a-zA-Z0-9 ]/g, '');
        var result = mergedText.match(searchString);
        if (!this.isMatchCase) {
            result = mergedText.match(searchString.toLowerCase());
        }
        if (isNullOrUndefined(result)) {
            return indiuvalLineArray;
        }
        else {
            result = pageText.slice(result.index, pageText.length);
        }
        var pageCheck = result;
        for (var i = 0; i < searchArray.length; i++) {
            var searchArrayText = linestring + searchArray[i];
            matchIndex = pageText.indexOf(searchArrayText, matchIndex);
            pageCheck = pageCheck ? pageCheck.replace(searchArray[i - 1], "") : pageText.replace(searchArray[i - 1], "");
            if ((pageCheck[pageCheck.indexOf(searchArray[i]) - 1] === "\n" && (pageCheck[pageCheck.indexOf(searchArray[i + 1]) - 1]) === "\n") || (pageCheck[pageCheck.indexOf(searchArray[i]) - 1] === "\n" && isNullOrUndefined((pageCheck[pageCheck.indexOf(searchArray[i + 1]) - 1])))) {
                matchIndex = -1;
                if (linestring === "") {
                    linestring = searchArray[i];
                    i = i + 1;
                }
            }
            if (matchIndex !== -1) {
                linestring += searchArray[i] + " ";
                if (i == (searchArray.length - 1)) {
                    indiuvalLineArray.push(linestring);
                }
            }
            else {
                indiuvalLineArray.push(linestring);
                linestring = searchArray[i] + " ";
                if (pageCheck[pageCheck.indexOf(searchArray[i]) - 1] == "\n" && pageCheck[pageCheck.indexOf(searchArray[i + 1]) - 1] == "\n") {
                    indiuvalLineArray.push(linestring);
                    linestring = searchArray[i + 1] + " ";
                    pageCheck = pageCheck ? pageCheck.replace(searchArray[i - 1], "") : pageText.replace(searchArray[i - 1], "");
                    i = i + 1;
                }
                if (i == (searchArray.length - 1)) {
                    indiuvalLineArray.push(linestring);
                }
            }
        }
        return indiuvalLineArray;
    };
    // eslint-disable-next-line
    TextSearch.prototype.getSearchTextContent = function (pageIndex, searchString, pageString, textContents, isSinglePageSearch, characterBounds) {
        var pageText = pageString;
        var searchText = searchString;
        var queryLength = searchString.length;
        if (!this.isMatchCase) {
            searchText = searchString.toLowerCase();
            pageText = pageString.toLowerCase();
        }
        var matches = [];
        var matchIndex = -queryLength;
        var newIndex = -queryLength;
        while (matchIndex !== 0) {
            if (searchText === '' || searchText === ' ' || !searchText) {
                break;
            }
            matchIndex = pageText.indexOf(searchText, matchIndex + queryLength);
            if (searchText.indexOf(' ') !== -1) {
                var newString = searchString.replace(' ', '\r\n');
                newIndex = pageText.indexOf(newString, newIndex + queryLength);
                if (!(newIndex <= -1)) {
                    if (newIndex < matchIndex) {
                        matches.push(newIndex);
                    }
                }
            }
            if (matchIndex <= -1 && newIndex <= -1) {
                break;
            }
            if (!(matchIndex <= -1)) {
                matches.push(matchIndex);
            }
            if (newIndex > matchIndex && !(newIndex <= -1)) {
                matches.push(newIndex);
            }
        }
        if (matches.length !== 0) {
            this.searchCount = this.searchCount + matches.length;
        }
        this.searchMatches[pageIndex] = matches;
    };
    TextSearch.prototype.getSearchPage = function (pageIndex) {
        var pageNumber = null;
        if (this.isPrevSearch) {
            for (var i = pageIndex; i >= 0; i--) {
                if (i !== pageIndex && this.searchMatches[i]) {
                    pageNumber = i;
                    break;
                }
            }
            if (!pageNumber) {
                for (var j = this.pdfViewerBase.pageCount - 1; j > pageIndex; j--) {
                    if (this.searchMatches[j]) {
                        pageNumber = j;
                        break;
                    }
                }
            }
        }
        else {
            for (var i = pageIndex; i < this.pdfViewerBase.pageCount; i++) {
                if (i !== pageIndex && this.searchMatches[i]) {
                    pageNumber = i;
                    break;
                }
            }
            if (!pageNumber) {
                if (pageIndex === 0) {
                    pageNumber = pageIndex;
                }
                else {
                    for (var j = 0; j < pageIndex; j++) {
                        if (this.searchMatches[j]) {
                            pageNumber = j;
                            break;
                        }
                    }
                }
            }
        }
        return pageNumber;
    };
    TextSearch.prototype.highlightSearchedTexts = function (pageIndex, isSinglePageSearch, ArrayReturns) {
        // eslint-disable-next-line
        var matches = this.searchMatches[pageIndex];
        var prevEnd = null;
        // eslint-disable-next-line
        var scrollPoint = { y: -100, x: -100 };
        var startId;
        var className;
        var searchingText = this.searchString;
        // eslint-disable-next-line
        var characterBounds = this.pdfViewerBase.textLayer.characterBound[pageIndex];
        var isHighlight = false;
        if (isSinglePageSearch && (this.pdfViewerBase.currentPageNumber - 1) !== this.searchPageIndex) {
            if (this.searchMatches.length > 0) {
                if (pageIndex === this.getSearchPage(this.pdfViewerBase.currentPageNumber - 1)) {
                    isHighlight = true;
                }
            }
        }
        if (characterBounds) {
            for (var i = 0; i < matches.length; i++) {
                if (matches[i].length !== undefined && ArrayReturns !== undefined) {
                    if (i === this.searchIndex && pageIndex === this.searchPageIndex) {
                        for (var j = 0; j < ArrayReturns.length; j++) {
                            className = 'e-pv-search-text-highlight';
                            this.searchString = ArrayReturns[j].trim();
                            this.addDivForSearch(i, pageIndex, characterBounds, this.searchString.length, className, j);
                        }
                    }
                    else {
                        for (var j = 0; j < ArrayReturns.length; j++) {
                            className = 'e-pv-search-text-highlightother';
                            this.searchString = ArrayReturns[j].trim();
                            this.addDivForSearch(i, pageIndex, characterBounds, this.searchString.length, className, j);
                        }
                    }
                }
                else if (i === this.searchIndex && pageIndex === this.searchPageIndex) {
                    className = 'e-pv-search-text-highlight';
                }
                else {
                    className = 'e-pv-search-text-highlightother';
                }
                if (matches[i].length == undefined) {
                    this.addDivForSearch(i, pageIndex, characterBounds, this.searchString.length, className, undefined);
                }
            }
            this.searchString = searchingText;
            if (pageIndex === this.searchPageIndex && !isSinglePageSearch) {
                var element = this.pdfViewerBase.getElement('_searchtext_' + pageIndex + '_' + this.searchIndex);
                if (element) {
                    var targetScrollElement = this.getScrollElement(element);
                    this.scrollToSearchStr(targetScrollElement, scrollPoint);
                }
                else {
                    this.pdfViewerBase.updateScrollTop(pageIndex);
                    var element_1 = this.pdfViewerBase.getElement('_searchtext_' + pageIndex + '_' + this.searchIndex);
                    if (element_1) {
                        var targetScrollElement = this.getScrollElement(element_1);
                        this.scrollToSearchStr(targetScrollElement, scrollPoint);
                    }
                }
            }
        }
    };
    // eslint-disable-next-line
    TextSearch.prototype.addDivForSearch = function (index, pageIndex, characterBounds, queryLength, className, nestedIndex) {
        var textLayer = this.pdfViewerBase.getElement('_textLayer_' + pageIndex);
        if (isNullOrUndefined(textLayer) && className === 'e-pv-search-text-highlight') {
            if (this.pdfViewer.navigation) {
                this.pdfViewer.navigation.goToPage(pageIndex + 1);
            }
        }
        var count;
        if (this.searchMatches[pageIndex][index].length !== undefined) {
            count = this.searchMatches[pageIndex][index][nestedIndex];
        }
        else {
            count = this.searchMatches[pageIndex][index];
        }
        var initial = count;
        var divCount = 0;
        while (count < initial + queryLength) {
            count = this.addDivElement(count, characterBounds, queryLength, className, index, pageIndex, initial, divCount, nestedIndex);
            divCount++;
        }
        if (className === 'e-pv-search-text-highlight') {
            this.showLoadingIndicator(false);
        }
    };
    // eslint-disable-next-line
    TextSearch.prototype.addDivElement = function (count, characterBounds, queryLength, className, index, pageIndex, initial, divCount, nestedIndex) {
        var height = 0;
        var width = 0;
        var top = 0;
        var left = 0;
        var isRTL = false;
        if (characterBounds[count]) {
            left = characterBounds[count].X;
            top = characterBounds[count].Y;
        }
        var v = 0;
        if ((count - initial) !== 0) {
            v = count - initial;
            queryLength += 1;
        }
        for (v = v; v < queryLength; v++) {
            if (characterBounds[count]) {
                // eslint-disable-next-line
                var charBound = characterBounds[count];
                if (left > charBound.X + charBound.Width) {
                    isRTL = true;
                }
                top = (top < charBound.Y) ? top : charBound.Y;
                var topDifference = (top < charBound.Y) ? (charBound.Y - top) : (top - charBound.Y);
                height = (height > (topDifference + charBound.Height)) ? height : (topDifference + charBound.Height);
                count++;
            }
        }
        var isContinuation = false;
        if (!isRTL) {
            if (initial + queryLength !== count) {
                isContinuation = true;
                if (characterBounds[count - 1]) {
                    width = (characterBounds[count - 1].X - left);
                }
            }
            else {
                isContinuation = false;
                // eslint-disable-next-line
                var storedData = this.pdfViewerBase.getStoredData(pageIndex, true);
                var pageText = null;
                if (storedData) {
                    pageText = storedData['pageText'];
                }
                else if (this.pdfViewer.isExtractText && this.documentTextCollection.length !== 0) {
                    // eslint-disable-next-line
                    var documentIndex = this.documentTextCollection[pageIndex][pageIndex];
                    pageText = documentIndex.pageText ? documentIndex.pageText : documentIndex.PageText;
                }
                if (characterBounds[count]) {
                    if (pageText && (pageText[count] === '' || pageText[count] === ' ' || pageText[count] === '\r' || pageText[count] === '\n') && (characterBounds[count].Width) === 0) {
                        width = (characterBounds[count - 1].X - left) + characterBounds[count - 1].Width;
                    }
                    else {
                        width = (characterBounds[count].X - left);
                    }
                }
                else {
                    if (characterBounds[count - 1]) {
                        width = (characterBounds[count - 1].X - left);
                    }
                }
            }
        }
        else {
            var charBound = characterBounds[(initial + queryLength) - 1];
            left = charBound.X;
            width = characterBounds[initial].X - characterBounds[(initial + queryLength) - 1].X;
            top = (top < charBound.Y) ? top : charBound.Y;
            var topDifference = (top < charBound.Y) ? (charBound.Y - top) : (top - charBound.Y);
            height = (height > (topDifference + charBound.Height)) ? height : (topDifference + charBound.Height);
            //some RTL character calculated width is zero and width difference value calculated from Y possition difference in the same line.
            var widthDifference = characterBounds[initial - 1].Y - characterBounds[initial].Y;
            for (var j = (initial + queryLength) - 1; j >= initial; j--) {
                charBound = characterBounds[j];
                if (charBound.Width === 0) {
                    widthDifference = charBound.Y - characterBounds[j - 1].Y;
                }
            }
            width = width + widthDifference;
        }
        this.createSearchTextDiv(index, pageIndex, height, width, top, left, className, isContinuation, divCount, nestedIndex);
        return count;
    };
    // eslint-disable-next-line
    TextSearch.prototype.createSearchTextDiv = function (index, pageIndex, height, width, top, left, className, isContinuation, divCount, nestedIndex) {
        var idString = '_searchtext_' + pageIndex + '_' + index;
        if (isContinuation) {
            idString += '_' + divCount;
        }
        if (nestedIndex !== undefined && this.pdfViewerBase.getElement(idString)) {
            var textDiv = createElement('div', { id: this.pdfViewer.element.id + idString + "_" + nestedIndex });
            // eslint-disable-next-line
            var pageDetails = this.pdfViewerBase.pageSize[pageIndex];
            this.calculateBounds(textDiv, height, width, top, left, pageDetails);
            textDiv.classList.add(className);
            if (className === 'e-pv-search-text-highlight') {
                // eslint-disable-next-line max-len
                textDiv.style.backgroundColor = (this.pdfViewer.textSearchColorSettings.searchHighlightColor === '') ? '#fdd835' : this.pdfViewer.textSearchColorSettings.searchHighlightColor;
                var bounds = { left: left, top: top, width: width, height: height };
                this.pdfViewer.fireTextSearchHighlight(this.searchString, this.isMatchCase, bounds, (pageIndex + 1));
            }
            else if (className === 'e-pv-search-text-highlightother') {
                // eslint-disable-next-line max-len
                textDiv.style.backgroundColor = (this.pdfViewer.textSearchColorSettings.searchColor === '') ? '#8b4c12' : this.pdfViewer.textSearchColorSettings.searchColor;
            }
            var textLayer = this.pdfViewerBase.getElement('_textLayer_' + pageIndex);
            textDiv.style.zIndex = this.searchTextDivzIndex;
            if (textLayer) {
                textLayer.appendChild(textDiv);
            }
        }
        if (!this.pdfViewerBase.getElement(idString)) {
            var textDiv = createElement('div', { id: this.pdfViewer.element.id + idString });
            // eslint-disable-next-line
            var pageDetails = this.pdfViewerBase.pageSize[pageIndex];
            this.calculateBounds(textDiv, height, width, top, left, pageDetails);
            textDiv.classList.add(className);
            if (className === 'e-pv-search-text-highlight') {
                // eslint-disable-next-line max-len
                textDiv.style.backgroundColor = (this.pdfViewer.textSearchColorSettings.searchHighlightColor === '') ? '#fdd835' : this.pdfViewer.textSearchColorSettings.searchHighlightColor;
                var bounds = { left: left, top: top, width: width, height: height };
                this.pdfViewer.fireTextSearchHighlight(this.searchString, this.isMatchCase, bounds, (pageIndex + 1));
            }
            else if (className === 'e-pv-search-text-highlightother') {
                // eslint-disable-next-line max-len
                textDiv.style.backgroundColor = (this.pdfViewer.textSearchColorSettings.searchColor === '') ? '#8b4c12' : this.pdfViewer.textSearchColorSettings.searchColor;
            }
            var textLayer = this.pdfViewerBase.getElement('_textLayer_' + pageIndex);
            textDiv.style.zIndex = this.searchTextDivzIndex;
            if (textLayer) {
                textLayer.appendChild(textDiv);
            }
        }
    };
    // eslint-disable-next-line
    TextSearch.prototype.calculateBounds = function (textDiv, height, width, top, left, pageDetails) {
        if (pageDetails.rotation === 0 || pageDetails.rotation === 2) {
            textDiv.style.height = Math.ceil(height) * this.pdfViewerBase.getZoomFactor() + 'px';
            textDiv.style.width = width * this.pdfViewerBase.getZoomFactor() + 'px';
            if (pageDetails.rotation === 2) {
                textDiv.style.top = (pageDetails.height - top - height) * this.pdfViewerBase.getZoomFactor() + 'px';
                textDiv.style.left = Math.ceil(pageDetails.width - left - width) * this.pdfViewerBase.getZoomFactor() + 'px';
            }
            else {
                textDiv.style.top = top * this.pdfViewerBase.getZoomFactor() + 'px';
                textDiv.style.left = left * this.pdfViewerBase.getZoomFactor() + 'px';
            }
        }
        else if (pageDetails.rotation === 1) {
            textDiv.style.height = width * this.pdfViewerBase.getZoomFactor() + 'px';
            textDiv.style.width = height * this.pdfViewerBase.getZoomFactor() + 'px';
            textDiv.style.top = left * this.pdfViewerBase.getZoomFactor() + 'px';
            textDiv.style.left = (pageDetails.height - top - height) * this.pdfViewerBase.getZoomFactor() + 'px';
        }
        else if (pageDetails.rotation === 3) {
            textDiv.style.height = width * this.pdfViewerBase.getZoomFactor() + 'px';
            textDiv.style.width = height * this.pdfViewerBase.getZoomFactor() + 'px';
            textDiv.style.left = ((pageDetails.width - pageDetails.height) + top) * this.pdfViewerBase.getZoomFactor() + 'px';
            textDiv.style.top = (pageDetails.height - left - width) * this.pdfViewerBase.getZoomFactor() + 'px';
        }
    };
    TextSearch.prototype.isClassAvailable = function () {
        var isClass = false;
        for (var j = 0; j < this.tempElementStorage.length; j++) {
            if (this.tempElementStorage[j].classString) {
                // eslint-disable-next-line max-len
                if (this.tempElementStorage[j].classString === 'e-pv-search-text-highlight' || this.tempElementStorage[j].classString === 'e-pv-search-text-highlightother') {
                    isClass = true;
                    break;
                }
            }
        }
        return isClass;
    };
    TextSearch.prototype.getScrollElement = function (element) {
        var targetElement = element;
        if (element.childNodes.length > 0) {
            for (var i = 0; i < element.childNodes.length; i++) {
                if (element.childNodes[i].classList) {
                    if (element.childNodes[i].classList.contains('e-pv-search-text-highlight')) {
                        targetElement = element.childNodes[i];
                    }
                }
            }
        }
        return targetElement;
    };
    // eslint-disable-next-line
    TextSearch.prototype.scrollToSearchStr = function (element, scrollPoint) {
        var parent = element.offsetParent;
        var offsetY = element.offsetTop + element.clientTop;
        var offsetX = element.offsetLeft + element.clientLeft;
        while (parent.id !== this.pdfViewerBase.viewerContainer.id) {
            offsetY += parent.offsetTop;
            offsetX += parent.offsetLeft;
            parent = parent.offsetParent;
        }
        if (scrollPoint) {
            offsetY += scrollPoint.y;
            offsetX += scrollPoint.x;
            if (Browser.isDevice && !this.pdfViewer.enableDesktopMode) {
                parent.scrollLeft = offsetX;
            }
            else {
                if (this.pdfViewerBase.getZoomFactor() > 1.5) {
                    parent.scrollLeft = offsetX;
                }
            }
        }
        parent.scrollTop = offsetY;
        this.pdfViewerBase.updateMobileScrollerPosition();
    };
    /**
     * @param pageIndex
     * @private
     */
    TextSearch.prototype.resizeSearchElements = function (pageIndex) {
        var searchDivs = document.querySelectorAll('div[id*="' + this.pdfViewer.element.id + '_searchtext_' + pageIndex + '"]');
        for (var i = 0; i < searchDivs.length; i++) {
            var textDiv = searchDivs[i];
            var previousZoomFactor = 1;
            if (this.pdfViewer.magnificationModule) {
                previousZoomFactor = this.pdfViewer.magnificationModule.previousZoomFactor;
            }
            // eslint-disable-next-line max-len
            var outputdata = pageIndex + '_' + previousZoomFactor + '_' + this.pdfViewerBase.getZoomFactor();
            if (textDiv.getAttribute('name') !== outputdata) {
                // eslint-disable-next-line
                textDiv.style.width = (parseFloat(textDiv.style.width) / previousZoomFactor) * this.pdfViewerBase.getZoomFactor() + 'px';
                // eslint-disable-next-line
                textDiv.style.height = (parseFloat(textDiv.style.height) / previousZoomFactor) * this.pdfViewerBase.getZoomFactor() + 'px';
                // eslint-disable-next-line
                textDiv.style.top = (parseFloat(textDiv.style.top) / previousZoomFactor) * this.pdfViewerBase.getZoomFactor() + 'px';
                // eslint-disable-next-line
                textDiv.style.left = (parseFloat(textDiv.style.left) / previousZoomFactor) * this.pdfViewerBase.getZoomFactor() + 'px';
                textDiv.setAttribute('name', outputdata);
            }
        }
    };
    /**
     * @param pageNumber
     * @private
     */
    TextSearch.prototype.highlightOtherOccurrences = function (pageNumber) {
        this.initSearch(pageNumber, true);
    };
    TextSearch.prototype.highlightOthers = function (isSearched) {
        var indexes = this.getIndexes();
        var lowerPageValue = parseFloat(indexes.lowerPageValue.toString());
        var higherPageValue = parseFloat(indexes.higherPageValue.toString());
        for (var i = lowerPageValue; i <= higherPageValue; i++) {
            this.highlightOtherOccurrences(i);
        }
        if (isSearched) {
            this.showLoadingIndicator(false);
        }
    };
    /**
     * @private
     */
    TextSearch.prototype.clearAllOccurrences = function () {
        var searchTextDivs = document.querySelectorAll('div[id*="' + this.pdfViewer.element.id + '_searchtext_"]');
        for (var i = 0; i < searchTextDivs.length; i++) {
            searchTextDivs[i].parentElement.removeChild(searchTextDivs[i]);
        }
    };
    /**
     * @private
     */
    // eslint-disable-next-line
    TextSearch.prototype.getIndexes = function () {
        var lowerPageValue = this.pdfViewerBase.currentPageNumber - 3;
        lowerPageValue = (lowerPageValue > 0) ? lowerPageValue : 0;
        var higherPageValue = this.pdfViewerBase.currentPageNumber + 1;
        higherPageValue = (higherPageValue < this.pdfViewerBase.pageCount) ? higherPageValue : (this.pdfViewerBase.pageCount - 1);
        return { lowerPageValue: lowerPageValue, higherPageValue: higherPageValue };
    };
    TextSearch.prototype.applyTextSelection = function () {
        if (this.pdfViewer.textSelectionModule && !this.pdfViewerBase.isTextSelectionDisabled) {
            var indexes = this.getIndexes();
            var lowerPageValue = parseFloat(indexes.lowerPageValue.toString());
            var higherPageValue = parseFloat(indexes.higherPageValue.toString());
            for (var i = lowerPageValue; i <= higherPageValue; i++) {
                this.pdfViewer.textSelectionModule.applySelectionRangeOnScroll(i);
            }
        }
    };
    /**
     * @private
     */
    TextSearch.prototype.resetTextSearch = function () {
        this.resetVariables();
        this.onTextSearchClose();
        this.searchPageIndex = null;
        this.searchIndex = 0;
        this.updateSearchInputIcon(true);
        this.enableNextButton(false);
        this.enablePrevButton(false);
        this.documentTextCollection = [];
        this.isTextRetrieved = false;
        this.isTextSearched = false;
        this.isSearchText = false;
        if (this.searchRequestHandler) {
            this.searchRequestHandler.clear();
        }
    };
    TextSearch.prototype.onTextSearchClose = function () {
        this.isPrevSearch = false;
        this.isTextSearch = false;
        if (this.pdfViewerBase.pageCount > 0) {
            this.clearAllOccurrences();
        }
    };
    TextSearch.prototype.createRequestForSearch = function (pageIndex) {
        var proxy = this;
        var viewPortWidth = 816;
        var viewPortHeight = this.pdfViewer.element.clientHeight;
        var pageWidth = this.pdfViewerBase.pageSize[pageIndex].width;
        var pageHeight = this.pdfViewerBase.pageSize[pageIndex].height;
        var tileCount = this.pdfViewerBase.getTileCount(pageWidth);
        var noTileX = viewPortWidth >= pageWidth ? 1 : tileCount;
        var noTileY = viewPortWidth >= pageWidth ? 1 : tileCount;
        var isTileRendering = false;
        var tileSettings = this.pdfViewer.tileRenderingSettings;
        if (tileSettings.enableTileRendering && tileSettings.x > 0 && tileSettings.y > 0) {
            noTileX = viewPortWidth >= pageWidth ? 1 : tileSettings.x;
            noTileY = viewPortWidth >= pageWidth ? 1 : tileSettings.y;
        }
        if (noTileX > 1 && noTileY > 1) {
            isTileRendering = true;
        }
        var _loop_1 = function (x) {
            var _loop_2 = function (y) {
                var jsonObject = void 0;
                // eslint-disable-next-line max-len
                jsonObject = { xCoordinate: x, yCoordinate: y, pageNumber: pageIndex, viewPortWidth: viewPortWidth, viewPortHeight: viewPortHeight, documentId: proxy.pdfViewerBase.getDocumentId(), hashId: proxy.pdfViewerBase.hashId, zoomFactor: proxy.pdfViewerBase.getZoomFactor(), tilecount: tileCount, action: 'Search', elementId: proxy.pdfViewer.element.id, uniqueId: proxy.pdfViewerBase.documentId,
                    tileXCount: noTileX, tileYCount: noTileY };
                if (this_1.pdfViewerBase.jsonDocumentId) {
                    // eslint-disable-next-line
                    jsonObject.documentId = this_1.pdfViewerBase.jsonDocumentId;
                }
                this_1.searchRequestHandler = new AjaxHandler(this_1.pdfViewer);
                this_1.searchRequestHandler.url = this_1.pdfViewer.serviceUrl + '/' + this_1.pdfViewer.serverActionSettings.renderPages;
                this_1.searchRequestHandler.responseType = 'json';
                this_1.searchRequestHandler.send(jsonObject);
                // eslint-disable-next-line
                this_1.searchRequestHandler.onSuccess = function (result) {
                    // eslint-disable-next-line
                    var data = result.data;
                    if (data) {
                        if (typeof data !== 'object') {
                            try {
                                data = JSON.parse(data);
                            }
                            catch (error) {
                                proxy.pdfViewerBase.onControlError(500, data, this.pdfViewer.serverActionSettings.renderPages);
                                data = null;
                            }
                        }
                        if (data) {
                            if (!isNullOrUndefined(data.pageText) && data.uniqueId === proxy.pdfViewerBase.documentId) {
                                proxy.pdfViewer.fireAjaxRequestSuccess(this.pdfViewer.serverActionSettings.renderPages, data);
                                var pageNumber = (data.pageNumber !== undefined) ? data.pageNumber : pageIndex;
                                if (viewPortWidth >= pageWidth) {
                                    proxy.pdfViewerBase.storeWinData(data, pageNumber);
                                }
                                else {
                                    proxy.pdfViewerBase.storeWinData(data, pageNumber, data.tileX, data.tileY);
                                }
                                if (!isTileRendering) {
                                    proxy.initSearch(pageIndex, false);
                                }
                                else {
                                    if (x === (noTileX - 1) && y === (noTileY - 1)) {
                                        proxy.initSearch(pageIndex, false);
                                    }
                                }
                            }
                            else if (isTileRendering && data.uniqueId === proxy.pdfViewerBase.documentId) {
                                proxy.pdfViewer.fireAjaxRequestSuccess(this.pdfViewer.serverActionSettings.renderPages, data);
                                var pageNumber = (data.pageNumber !== undefined) ? data.pageNumber : pageIndex;
                                proxy.pdfViewerBase.storeWinData(data, pageNumber, data.tileX, data.tileY);
                                if (x === (noTileX - 1) && y === (noTileY - 1)) {
                                    proxy.initSearch(pageIndex, false);
                                }
                            }
                        }
                    }
                };
                // eslint-disable-next-line
                this_1.searchRequestHandler.onFailure = function (result) {
                    proxy.pdfViewer.fireAjaxRequestFailed(result.status, result.statusText, this.pdfViewer.serverActionSettings.renderPages);
                };
                // eslint-disable-next-line
                this_1.searchRequestHandler.onError = function (result) {
                    proxy.pdfViewerBase.openNotificationPopup();
                    // eslint-disable-next-line max-len
                    proxy.pdfViewer.fireAjaxRequestFailed(result.status, result.statusText, this.pdfViewer.serverActionSettings.renderPages);
                };
            };
            for (var y = 0; y < noTileY; y++) {
                _loop_2(y);
            }
        };
        var this_1 = this;
        for (var x = 0; x < noTileX; x++) {
            _loop_1(x);
        }
    };
    /**
     * @private
     */
    TextSearch.prototype.getPDFDocumentTexts = function () {
        var startIndex = 0;
        var endIndex = 50;
        var pageCount = this.pdfViewerBase.pageCount;
        if (endIndex >= pageCount) {
            endIndex = pageCount;
        }
        this.createRequestForGetPdfTexts(startIndex, endIndex);
    };
    /**
     * @param startIndex
     * @param endIndex
     * @private
     */
    TextSearch.prototype.createRequestForGetPdfTexts = function (startIndex, endIndex) {
        var proxy = this;
        var jsonObject;
        // eslint-disable-next-line max-len
        jsonObject = { pageStartIndex: startIndex, pageEndIndex: endIndex, documentId: proxy.pdfViewerBase.getDocumentId(), hashId: proxy.pdfViewerBase.hashId, action: 'RenderPdfTexts', elementId: proxy.pdfViewer.element.id, uniqueId: proxy.pdfViewerBase.documentId };
        if (this.pdfViewerBase.jsonDocumentId) {
            // eslint-disable-next-line
            jsonObject.documentId = this.pdfViewerBase.jsonDocumentId;
        }
        this.searchRequestHandler = new AjaxHandler(this.pdfViewer);
        this.searchRequestHandler.url = this.pdfViewer.serviceUrl + '/' + this.pdfViewer.serverActionSettings.renderTexts;
        this.searchRequestHandler.responseType = 'json';
        this.searchRequestHandler.send(jsonObject);
        // eslint-disable-next-line
        this.searchRequestHandler.onSuccess = function (result) {
            // eslint-disable-next-line
            var data = result.data;
            if (data) {
                if (typeof data !== 'object') {
                    try {
                        data = JSON.parse(data);
                    }
                    catch (error) {
                        proxy.pdfViewerBase.onControlError(500, data, this.pdfViewer.serverActionSettings.renderTexts);
                        data = null;
                    }
                }
                if (data) {
                    if (data.documentTextCollection && data.uniqueId === proxy.pdfViewerBase.documentId) {
                        proxy.pdfViewer.fireAjaxRequestSuccess(this.pdfViewer.serverActionSettings.renderTexts, data);
                        if (proxy.documentTextCollection.length > 0) {
                            proxy.documentTextCollection = data.documentTextCollection.concat(proxy.documentTextCollection);
                            proxy.documentTextCollection = proxy.orderPdfTextCollections(proxy.documentTextCollection);
                        }
                        else {
                            proxy.documentTextCollection = data.documentTextCollection;
                        }
                        var pageCount = proxy.pdfViewerBase.pageCount;
                        if (endIndex !== pageCount) {
                            startIndex = endIndex;
                            endIndex = endIndex + 50;
                            if (endIndex >= pageCount) {
                                endIndex = pageCount;
                            }
                            proxy.createRequestForGetPdfTexts(startIndex, endIndex);
                        }
                        else {
                            proxy.isTextRetrieved = true;
                            proxy.pdfViewer.fireTextExtractionCompleted(proxy.documentTextCollection);
                            if (proxy.isTextSearched && proxy.searchString.length > 0) {
                                proxy.textSearch(proxy.searchString);
                                proxy.isTextSearched = false;
                            }
                        }
                    }
                }
            }
        };
        // eslint-disable-next-line
        this.searchRequestHandler.onFailure = function (result) {
            proxy.pdfViewer.fireAjaxRequestFailed(result.status, result.statusText, this.pdfViewer.serverActionSettings.renderTexts);
        };
        // eslint-disable-next-line
        this.searchRequestHandler.onError = function (result) {
            proxy.pdfViewerBase.openNotificationPopup();
            proxy.pdfViewer.fireAjaxRequestFailed(result.status, result.statusText, this.pdfViewer.serverActionSettings.renderTexts);
        };
    };
    // eslint-disable-next-line
    TextSearch.prototype.orderPdfTextCollections = function (oldCollection) {
        // eslint-disable-next-line
        var annotationCollectionList = [];
        for (var i = 0; i < oldCollection.length; i++) {
            if (annotationCollectionList.length === 0) {
                annotationCollectionList.push(oldCollection[i]);
            }
            else {
                // eslint-disable-next-line
                if (parseInt(Object.keys(oldCollection[i])[0]) > parseInt(Object.keys(annotationCollectionList[annotationCollectionList.length - 1])[0])) {
                    annotationCollectionList.push(oldCollection[i]);
                }
                else {
                    for (var j = 0; j < annotationCollectionList.length; j++) {
                        // eslint-disable-next-line
                        if ((parseInt(Object.keys(oldCollection[i])[0]) < parseInt(Object.keys(annotationCollectionList[j])[0]))) {
                            annotationCollectionList.splice(j, 0, oldCollection[i]);
                            break;
                        }
                    }
                }
            }
        }
        return annotationCollectionList;
    };
    TextSearch.prototype.createSearchBoxButtons = function (id, className) {
        // eslint-disable-next-line max-len
        var button = createElement('button', { id: this.pdfViewer.element.id + '_' + id, className: 'e-btn e-icon-btn e-pv-search-btn ' + className });
        button.setAttribute('type', 'button');
        // eslint-disable-next-line max-len
        var iconSpan = createElement('span', { id: this.pdfViewer.element.id + '_' + id + 'Icon', className: 'e-pv-icon-search ' + className + '-icon' });
        button.disabled = true;
        button.appendChild(iconSpan);
        return button;
    };
    TextSearch.prototype.enablePrevButton = function (isEnable) {
        if ((!Browser.isDevice || this.pdfViewer.enableDesktopMode)) {
            if (isEnable) {
                this.prevSearchBtn.removeAttribute('disabled');
            }
            else {
                if (this.prevSearchBtn) {
                    this.prevSearchBtn.disabled = true;
                }
            }
        }
    };
    TextSearch.prototype.enableNextButton = function (isEnable) {
        if (!Browser.isDevice || this.pdfViewer.enableDesktopMode) {
            if (isEnable) {
                this.nextSearchBtn.removeAttribute('disabled');
            }
            else {
                if (this.nextSearchBtn) {
                    this.nextSearchBtn.disabled = true;
                }
            }
        }
    };
    /**
     * @private
     */
    TextSearch.prototype.resetVariables = function () {
        this.searchedPages = [];
        // eslint-disable-next-line
        this.searchMatches = new Array();
    };
    /**
     * @param element
     * @param inputElement
     * @private
     */
    TextSearch.prototype.searchButtonClick = function (element, inputElement) {
        this.isMessagePopupOpened = false;
        if (isBlazor() && (Browser.isDevice && !this.pdfViewer.enableDesktopMode)) {
            var searchElement = this.pdfViewerBase.getElement('_search_box-icon');
            element = searchElement.children[0].children[0];
            inputElement = this.pdfViewerBase.getElement('_search_input');
        }
        if (element.classList.contains('e-pv-search-icon')) {
            this.initiateTextSearch(inputElement);
        }
        else if (element.classList.contains('e-pv-search-close')) {
            this.showLoadingIndicator(false);
            inputElement.value = '';
            this.resetTextSearch();
            inputElement.focus();
        }
    };
    TextSearch.prototype.updateSearchInputIcon = function (isEnable) {
        if (isBlazor()) {
            if (this.searchBtn && (Browser.isDevice && !this.pdfViewer.enableDesktopMode)) {
                this.searchBtn = this.pdfViewerBase.getElement('_search_box-icon').children[0].children[0];
            }
        }
        if (this.searchBtn) {
            if (isEnable) {
                this.searchBtn.classList.remove('e-pv-search-close');
                this.searchBtn.classList.add('e-pv-search-icon');
            }
            else {
                this.searchBtn.classList.remove('e-pv-search-icon');
                this.searchBtn.classList.add('e-pv-search-close');
            }
        }
    };
    TextSearch.prototype.onMessageBoxOpen = function () {
        var _this = this;
        this.showLoadingIndicator(false);
        this.pdfViewerBase.getElement('_search_input').blur();
        this.isMessagePopupOpened = true;
        if (!Browser.isDevice || this.pdfViewer.enableDesktopMode) {
            if (isBlazor()) {
                var promise = this.pdfViewer._dotnetInstance.invokeMethodAsync('GetLocaleText', 'PdfViewer_Nomatches');
                promise.then(function (value) {
                    _this.pdfViewerBase.textLayer.createNotificationPopup(value);
                });
            }
            else {
                this.pdfViewerBase.textLayer.createNotificationPopup(this.pdfViewer.localeObj.getConstant('No matches'));
            }
        }
        else {
            if (isBlazor()) {
                var promise = this.pdfViewer._dotnetInstance.invokeMethodAsync('GetLocaleText', 'PdfViewer_NoTextFound');
                promise.then(function (value) {
                    _this.pdfViewerBase.navigationPane.createTooltipMobile(value);
                });
            }
            else {
                this.pdfViewerBase.navigationPane.createTooltipMobile(this.pdfViewer.localeObj.getConstant('No Text Found'));
            }
        }
    };
    /**
     * Searches the target text in the PDF document and highlights the occurrences in the pages
     *
     * @param  {string} searchText - Specifies the searchText content
     * @param  {boolean} isMatchCase - If set true , its highlights the MatchCase content
     * @returns void
     */
    TextSearch.prototype.searchText = function (searchText, isMatchCase) {
        if (searchText && searchText.length > 0 && searchText[searchText.length - 1] === ' ') {
            searchText = searchText.slice(0, searchText.length - 1);
        }
        this.searchString = searchText;
        this.isMatchCase = isMatchCase;
        this.searchIndex = 0;
        this.textSearch(searchText);
    };
    /**
     * Searches the next occurrence of the searched text from the current occurrence of the PdfViewer.
     *
     * @returns void
     */
    TextSearch.prototype.searchNext = function () {
        this.nextSearch();
    };
    /**
     * Searches the previous occurrence of the searched text from the current occurrence of the PdfViewer.
     *
     * @returns void
     */
    TextSearch.prototype.searchPrevious = function () {
        this.prevSearch();
    };
    /**
     * Cancels the text search of the PdfViewer.
     *
     * @returns void
     */
    TextSearch.prototype.cancelTextSearch = function () {
        this.resetTextSearch();
    };
    /**
     * @private
     */
    TextSearch.prototype.destroy = function () {
        this.searchMatches = undefined;
    };
    /**
     * @private
     */
    TextSearch.prototype.getModuleName = function () {
        return 'TextSearch';
    };
    return TextSearch;
}());
export { TextSearch };
