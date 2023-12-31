var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { TextPosition, ImageInfo } from '../selection/selection-helper';
import { ParagraphWidget, LineWidget, ElementBox, TextElementBox, Margin, ImageElementBox, BlockWidget, BlockContainer, BodyWidget, TableWidget, TableCellWidget, TableRowWidget, Widget, ListTextElementBox, BookmarkElementBox, HeaderFooterWidget, FieldTextElementBox, TabElementBox, EditRangeStartElementBox, EditRangeEndElementBox, CommentElementBox, CommentCharacterElementBox, CheckBoxFormField, DropDownFormField, TextFormField, ShapeElementBox, TextFrame, ContentControl, FootnoteElementBox, FootNoteWidget } from '../viewer/page';
import { WCharacterFormat } from '../format/character-format';
import { HelperMethods, Base64 } from './editor-helper';
import { isNullOrUndefined, Browser, classList, L10n } from '@syncfusion/ej2-base';
import { WParagraphFormat, WSectionFormat, WListFormat, WTableFormat, WRowFormat, WCellFormat, WBorder, WBorders, WTabStop } from '../index';
import { WList } from '../list/list';
import { WAbstractList } from '../list/abstract-list';
import { WListLevel } from '../list/list-level';
import { WLevelOverride } from '../list/level-override';
import { FieldElementBox } from '../viewer/page';
import { protectionTypeChangeEvent, imagesProperty, abstractListIdProperty } from '../../base/index';
import { SelectionCharacterFormat } from '../index';
import { PageLayoutViewer } from '../index';
import { WCharacterStyle } from '../format/style';
import { HistoryInfo } from '../editor-history/index';
import { TableResizer } from './table-resizer';
import { Dictionary } from '../../base/dictionary';
import { WParagraphStyle } from '../format/style';
import { showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
import { DialogUtility } from '@syncfusion/ej2-popups';
import { Revision } from '../track-changes/track-changes';
import { XmlHttpRequestHandler } from '../../base/ajax-helper';
import { beforeCommentActionEvent, trackChangeEvent, beforeXmlHttpRequestSend, internalStyleCollectionChange } from '../../base/index';
import { SectionBreakType } from '../../base/types';
import { sectionsProperty, commentsProperty, bidiProperty, revisionsProperty, lastParagraphMarkCopiedProperty, sectionFormatProperty, revisionIdProperty, contextualSpacingProperty, keepWithNextProperty, keepLinesTogetherProperty, widowControlProperty, outlineLevelProperty, numberFormatProperty, startAtProperty, paragraphFormatProperty, listsProperty, abstractListsProperty, listIdProperty, listLevelNumberProperty, leftIndentProperty, rightIndentProperty, firstLineIndentProperty, textAlignmentProperty, afterSpacingProperty, beforeSpacingProperty, lineSpacingProperty, lineSpacingTypeProperty, listFormatProperty, cellsProperty, rowsProperty, blocksProperty, listLevelPatternProperty, levelsProperty, stylesProperty, nameProperty } from '../../index';
import { SanitizeHtmlHelper } from '@syncfusion/ej2-base';
import { ChangesSingleView } from '../track-changes/track-changes-pane';
/**
 * Editor module
 */
var Editor = /** @class */ (function () {
    /**
     * Initialize the editor module
     *
     * @param {DocumentHelper} documentHelper - Document helper
     * @private
     */
    function Editor(documentHelper) {
        var _this = this;
        this.nodes = [];
        this.editHyperlinkInternal = false;
        this.startParagraph = undefined;
        this.endParagraph = undefined;
        this.formFieldCounter = 1;
        this.skipFieldDeleteTracking = false;
        this.skipFootNoteDeleteTracking = false;
        this.isForHyperlinkFormat = false;
        this.isTrackingFormField = false;
        this.isInsertText = false;
        this.keywordIndex = 0;
        /**
        * @private
        */
        this.isFootnoteElementRemoved = false;
        /**
        * @private
        */
        this.isEndnoteElementRemoved = false;
        /**
        * @private
        */
        this.handledEnter = false;
        /**
         * @private
         */
        this.removeEditRange = false;
        /**
         * @private
         */
        this.isRemoveRevision = false;
        /**
         * @private
         */
        this.isFootNoteInsert = false;
        /**
         * @private
         */
        this.isTableInsert = false;
        /**
         * @private
         */
        this.isFootNote = false;
        /**
         * @private
         */
        this.isHandledComplex = false;
        /**
         * @private
         */
        this.isUserInsert = false;
        /**
         * @private
         */
        this.tableResize = undefined;
        /**
         * @private
         */
        this.tocStyles = {};
        /**
         * @private
         */
        this.triggerPageSpellCheck = true;
        /**
         * @private
         */
        this.chartType = false;
        /**
         * @private
         */
        this.removedBookmarkElements = [];
        /**
         * @private
         */
        this.removedEditRangeStartElements = [];
        /**
         * @private
         */
        this.removedEditRangeEndElements = [];
        /**
         * @private
         */
        this.tocBookmarkId = 0;
        /**
         * @private
         */
        this.copiedData = undefined;
        /**
        * @private
        */
        this.isPasteContentCheck = false;
        this.pageRefFields = {};
        this.delBlockContinue = false;
        this.delBlock = undefined;
        this.delSection = undefined;
        /**
         * @private
         */
        this.isInsertingTOC = false;
        this.editStartRangeCollection = [];
        this.skipReplace = false;
        this.skipTableElements = false;
        /**
         * @private
         */
        this.listNumberFormat = '';
        /**
         * @private
         */
        this.listLevelNumber = 0;
        /**
         * @private
         */
        this.isXmlMapped = false;
        this.combineLastBlock = false;
        /* eslint-disable @typescript-eslint/no-explicit-any */
        /**
         * @private
         */
        this.copiedContent = '';
        /**
         * @private
         */
        this.copiedTextContent = '';
        /**
         * @private
         */
        this.previousParaFormat = undefined;
        this.previousCharFormat = undefined;
        this.previousSectionFormat = undefined;
        this.pasteTextPosition = undefined;
        //public isSkipHistory: boolean = false;
        /**
         * @private
         */
        this.isPaste = false;
        /**
         * @private
         */
        this.isPasteListUpdated = false;
        /**
         * @private
         */
        this.isHtmlPaste = false;
        /**
         * @private
         */
        this.isInsertField = false;
        /**
         * @private
         */
        this.isBordersAndShadingDialog = false;
        /**
         * @private
        */
        this.pasteImageIndex = undefined;
        /**
         * @private
         * @returns {void}
         */
        this.onTextInputInternal = function () {
            if (Browser.isDevice) {
                var documentHelper = _this.documentHelper;
                var nbsp = new RegExp(String.fromCharCode(160), 'g');
                var lineFeed = new RegExp(String.fromCharCode(10), 'g');
                documentHelper.prefix = documentHelper.prefix.replace(nbsp, ' ').replace(lineFeed, ' ');
                var text = documentHelper.editableDiv.textContent.replace(nbsp, ' ').replace(lineFeed, ' ');
                var textBoxText = text.substring(2);
                if (documentHelper.isCompositionStart && documentHelper.isCompositionUpdated) {
                    documentHelper.isCompositionUpdated = false;
                    if (!documentHelper.owner.isReadOnlyMode && documentHelper.owner.isDocumentLoaded && _this.canEditContentControl) {
                        if (documentHelper.prefix.substring(2) !== textBoxText) {
                            if (_this.selection.isEmpty) {
                                /* eslint-disable-next-line max-len */
                                _this.selection.start.setPositionForLineWidget(documentHelper.selection.start.currentWidget, _this.selection.start.offset - (documentHelper.prefix.length - 2));
                                _this.handleTextInput(textBoxText);
                                documentHelper.prefix = '@' + String.fromCharCode(160) + textBoxText;
                            }
                            else {
                                _this.handleTextInput(textBoxText);
                                documentHelper.prefix = '@' + String.fromCharCode(160) + textBoxText;
                            }
                        }
                    }
                    return;
                }
                else if (documentHelper.isCompositionStart && documentHelper.isCompositionEnd && documentHelper.suffix === '') {
                    if (documentHelper.prefix.substring(2) !== textBoxText) {
                        if (_this.selection.isEmpty && documentHelper.isCompositionStart) {
                            documentHelper.isCompositionStart = false;
                            /* eslint-disable-next-line max-len */
                            _this.selection.start.setPositionForLineWidget(documentHelper.selection.start.currentWidget, _this.selection.start.offset - documentHelper.prefix.substring(2).length);
                            _this.selection.retrieveCurrentFormatProperties();
                            if (documentHelper.suffix === '' || textBoxText === '') {
                                _this.handleTextInput(textBoxText);
                            }
                        }
                        else if (!_this.selection.isEmpty) {
                            documentHelper.isCompositionStart = false;
                            _this.handleTextInput(textBoxText);
                        }
                    }
                    else if (textBoxText === '') {
                        documentHelper.isCompositionStart = false;
                        _this.handleBackKey();
                    }
                    else if (documentHelper.prefix.substring(2) === textBoxText && documentHelper.suffix === '') {
                        documentHelper.isCompositionStart = false;
                        _this.handleTextInput(' ');
                    }
                    documentHelper.isCompositionEnd = false;
                    return;
                }
                else if (documentHelper.isCompositionEnd || documentHelper.isCompositionStart && !documentHelper.isCompositionUpdated) {
                    if (textBoxText.length < documentHelper.prefix.length &&
                        /* eslint-disable-next-line max-len */
                        textBoxText === documentHelper.prefix.substring(2, documentHelper.prefix.length - 1) || documentHelper.editableDiv.innerText.length < 2) {
                        _this.handleBackKey();
                        return;
                    }
                    else if (documentHelper.suffix !== '' &&
                        documentHelper.editableDiv.innerText[documentHelper.editableDiv.innerText.length - 1] !== String.fromCharCode(160)) {
                        documentHelper.isCompositionStart = false;
                        //When cursor is placed in between a word and chosen a word from predicted words.
                        /* eslint-disable-next-line max-len */
                        _this.selection.start.setPositionForLineWidget(documentHelper.selection.start.currentWidget, _this.selection.start.offset - (documentHelper.prefix.length - 2));
                        /* eslint-disable-next-line max-len */
                        _this.selection.end.setPositionForLineWidget(documentHelper.selection.end.currentWidget, _this.selection.end.offset + documentHelper.suffix.length);
                        //Retrieve the character format properties. Since the selection was changed manually.
                        _this.selection.retrieveCurrentFormatProperties();
                        _this.handleTextInput(textBoxText);
                        return;
                    }
                }
                if (text !== '\r' && text !== '\b' && text !== String.fromCharCode(27) && !documentHelper.owner.isReadOnlyMode && documentHelper.isControlPressed === false && _this.canEditContentControl) {
                    if (text === '@' || text[0] !== '@' || text === '' || text.length < documentHelper.prefix.length &&
                        textBoxText === documentHelper.prefix.substring(2, documentHelper.prefix.length - 1)) {
                        _this.handleBackKey();
                        if (documentHelper.editableDiv.innerText.length < 2) {
                            _this.predictText();
                        }
                    }
                    else if (text.indexOf(documentHelper.prefix) === 0 && text.length > documentHelper.prefix.length) {
                        _this.handleTextInput(text.substring(documentHelper.prefix.length));
                    }
                    else if (text.indexOf(documentHelper.prefix) === -1 && text[text.length - 1] !== String.fromCharCode(160)
                        && text[text.length - 1] !== ' ') {
                        if ((textBoxText.charAt(0).toLowerCase() + textBoxText.slice(1)) === documentHelper.prefix.substring(2)) {
                            /* eslint-disable-next-line max-len */
                            _this.selection.start.setPositionParagraph(documentHelper.selection.start.currentWidget, _this.selection.start.offset - (documentHelper.prefix.length - 2));
                        }
                        _this.handleTextInput(textBoxText);
                    }
                    else if (text.length !== 2) {
                        _this.handleTextInput(' ');
                    }
                }
            }
            else {
                var text = _this.documentHelper.editableDiv.innerText;
                if (text !== String.fromCharCode(160)) {
                    if (text !== '\r' && text !== '\b' && text !== String.fromCharCode(27) && !_this.owner.isReadOnlyMode && _this.documentHelper.isControlPressed === false && _this.canEditContentControl) {
                        _this.handleTextInput(text);
                    }
                }
                else {
                    _this.handleTextInput(' ');
                }
                _this.documentHelper.editableDiv.innerText = '';
            }
        };
        /**
         * Fired on paste.
         *
         * @param {ClipboardEvent} event - Specfies clipboard event
         * @private
         * @returns {void}
         */
        this.onPaste = function (event) {
            if (!_this.owner.isReadOnlyMode && _this.canEditContentControl) {
                _this.pasteInternal(event);
            }
            event.preventDefault();
        };
        this.documentHelper = documentHelper;
        this.tableResize = new TableResizer(this.documentHelper.owner);
        this.base64 = new Base64();
    }
    Object.defineProperty(Editor.prototype, "restrictFormatting", {
        /**
         * @private
         * @returns {boolean} - Returns the restrict formatting
         */
        get: function () {
            return this.documentHelper.isDocumentProtected && (this.documentHelper.restrictFormatting
                || (!this.documentHelper.restrictFormatting && !this.selection.isSelectionInEditRegion()))
                && this.documentHelper.protectionType !== 'RevisionsOnly';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Editor.prototype, "restrictEditing", {
        /**
         * @private
         * @returns {boolean} - Returns the restrict editing
         */
        get: function () {
            return this.documentHelper.isDocumentProtected && ((this.documentHelper.protectionType === 'ReadOnly' || this.documentHelper.isCommentOnlyMode)
                && !this.selection.isSelectionInEditRegion() || this.documentHelper.protectionType === 'FormFieldsOnly');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Editor.prototype, "canEditContentControl", {
        /**
         * @private
         * @returns {boolean} - Returns the can edit content control.
         */
        get: function () {
            if (this.owner.isReadOnlyMode) {
                return false;
            }
            if (this.selection.checkContentControlLocked()) {
                return false;
            }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Editor.prototype, "viewer", {
        get: function () {
            if (!isNullOrUndefined(this.owner)) {
                return this.owner.viewer;
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Editor.prototype, "editorHistory", {
        get: function () {
            return this.documentHelper.owner.editorHistory;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Editor.prototype, "selection", {
        get: function () {
            if (this.documentHelper) {
                return this.documentHelper.selection;
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Editor.prototype, "owner", {
        get: function () {
            return this.documentHelper.owner;
        },
        enumerable: true,
        configurable: true
    });
    Editor.prototype.getModuleName = function () {
        return 'Editor';
    };
    /**
     * Sets the field information for the selected field.
     *
     * @param { FieldInfo } fieldInfo – Specifies the field information.
     * @returns {void}
     * > Nested field gets replaced completely with the specified field information.
     */
    Editor.prototype.setFieldInfo = function (fieldInfo) {
        var field = this.selection.getHyperlinkField(true);
        if (!isNullOrUndefined(field)) {
            this.selection.selectField();
            this.insertField(fieldInfo.code, fieldInfo.result);
        }
    };
    /**
     * Inserts the specified field at cursor position.
     *
     * @param {string} code Specify the field code.
     * @param {string} result Specify the field result.
     * @returns {void}
     */
    Editor.prototype.insertField = function (code, result) {
        code = HelperMethods.sanitizeString(code);
        if (!isNullOrUndefined(result)) {
            result = HelperMethods.sanitizeString(result);
        }
        this.isInsertField = true;
        var fieldCode = code;
        fieldCode = HelperMethods.trimStart(fieldCode);
        if (fieldCode.substring(0, 8) === 'NUMPAGES') {
            this.insertPageCount(result);
        }
        else if (fieldCode.substring(0, 4) === 'PAGE') {
            this.insertPageNumber(result);
        }
        else {
            if (isNullOrUndefined(result)) {
                if (fieldCode.substring(0, 10) === 'MERGEFIELD') {
                    fieldCode = fieldCode.substring(10).trim();
                    var index = fieldCode.indexOf('\\*');
                    result = '«' + fieldCode.substring(0, index).trim() + '»';
                }
            }
            var paragraph = new ParagraphWidget();
            var insertFormat = new WCharacterFormat();
            var selectionFormat = this.copyInsertFormat(insertFormat, false);
            var line = new LineWidget(paragraph);
            var fieldBegin = new FieldElementBox(0);
            fieldBegin.characterFormat.mergeFormat(selectionFormat);
            line.children.push(fieldBegin);
            var fieldCodeSpan = new TextElementBox();
            fieldCodeSpan.characterFormat.mergeFormat(selectionFormat);
            fieldCodeSpan.text = code;
            line.children.push(fieldCodeSpan);
            var fieldSeparator = new FieldElementBox(2);
            fieldSeparator.characterFormat.mergeFormat(selectionFormat);
            fieldSeparator.fieldBegin = fieldBegin;
            fieldBegin.fieldSeparator = fieldSeparator;
            line.children.push(fieldSeparator);
            var fieldResultSpan = new TextElementBox();
            fieldResultSpan.text = result;
            fieldResultSpan.characterFormat.mergeFormat(selectionFormat);
            line.children.push(fieldResultSpan);
            var fieldEnd = new FieldElementBox(1);
            fieldEnd.characterFormat.mergeFormat(selectionFormat);
            fieldEnd.fieldSeparator = fieldSeparator;
            fieldEnd.fieldBegin = fieldBegin;
            fieldBegin.fieldEnd = fieldEnd;
            fieldSeparator.fieldEnd = fieldEnd;
            line.children.push(fieldEnd);
            fieldBegin.line = line;
            paragraph.childWidgets.push(line);
            this.documentHelper.fields.push(fieldBegin);
            var section = new BodyWidget();
            section.sectionFormat = new WSectionFormat(section);
            section.childWidgets.push(paragraph);
            this.pasteContentsInternal([section], false);
        }
        this.isInsertField = false;
    };
    Editor.prototype.isLinkedStyle = function (styleName) {
        var styleObj = this.documentHelper.styles.findByName(styleName);
        return !isNullOrUndefined(styleObj.link);
    };
    /**
     * Applies the specified style for paragraph.
     *
     * @param {string} style Specify the style name to apply.
     * @param {boolean} clearDirectFormatting - Removes manual formatting (formatting not applied using a style)
     * from the selected text, to match the formatting of the applied style. Default value is false.
     * @returns {void}
     */
    Editor.prototype.applyStyle = function (style, clearDirectFormatting) {
        clearDirectFormatting = isNullOrUndefined(clearDirectFormatting) ? false : clearDirectFormatting;
        var startPosition = undefined;
        var endPosition = undefined;
        if (clearDirectFormatting) {
            this.initComplexHistory('ApplyStyle');
            this.setOffsetValue(this.selection);
            startPosition = this.startOffset;
            endPosition = this.endOffset;
            var isSelectionEmpty = this.selection.isEmpty;
            this.clearFormattingInternal(!this.isLinkedStyle(style));
            if (isSelectionEmpty && !this.selection.isEmpty) {
                this.selection.end.setPositionInternal(this.selection.start);
            }
        }
        var styleObj = this.documentHelper.styles.findByName(style);
        if (styleObj !== undefined) {
            if (styleObj instanceof WCharacterStyle && styleObj.type === 'Character') {
                if (this.selection.isEmpty) {
                    var offset = this.selection.start.offset;
                    var preservedStartPosition = this.selection.start.clone();
                    var preservedEndPosition = this.selection.end.clone();
                    this.selection.selectCurrentWord();
                    if (offset === this.selection.start.offset || offset === this.selection.end.offset - 1) {
                        this.selection.start = preservedStartPosition;
                        this.selection.end = preservedEndPosition;
                        this.selection.characterFormat.copyFormat(styleObj.characterFormat);
                    }
                    else {
                        this.onApplyCharacterFormat('styleName', styleObj, false, true);
                    }
                }
                else {
                    this.onApplyCharacterFormat('styleName', styleObj, false, true);
                }
            }
            else {
                this.onApplyParagraphFormat('styleName', styleObj, false, true);
            }
        }
        else {
            /* eslint-disable-next-line max-len */
            this.documentHelper.owner.parser.parseStyle(JSON.parse(this.getCompleteStyles()), JSON.parse(this.documentHelper.preDefinedStyles.get(style)), this.documentHelper.styles);
            this.applyStyle(style);
        }
        if (this.editorHistory && this.editorHistory.currentHistoryInfo && this.editorHistory.currentHistoryInfo.action === 'ApplyStyle') {
            this.startOffset = startPosition;
            this.endOffset = endPosition;
            this.editorHistory.updateComplexHistory();
        }
        this.startParagraph = undefined;
        this.endParagraph = undefined;
    };
    // Public Implementation Starts
    /**
     * Moves the selected content in the document editor control to clipboard.
     *
     * @returns {void}
     */
    Editor.prototype.cut = function () {
        if (this.owner.isReadOnlyMode || this.selection.isEmpty || !this.canEditContentControl) {
            return;
        }
        this.selection.copySelectedContent(true);
        this.documentHelper.owner.parser.isCutPerformed = true;
    };
    /**
     * Inserts the editing region in the current selection range for the specified user.
     *
     * @param {string} user Specifies the native rendering
     * @returns {void}
     */
    Editor.prototype.insertEditingRegion = function (user) {
        this.insertEditRangeElement(user && user !== '' ? user : 'Everyone');
    };
    Editor.prototype.enforceProtection = function (credential, restrictFormatType, isReadOnly) {
        var typeOfProtection;
        var limitToFormatting;
        if (typeof (restrictFormatType) === 'boolean') {
            typeOfProtection = isReadOnly ? 'ReadOnly' : this.documentHelper.protectionType;
            limitToFormatting = restrictFormatType;
        }
        else {
            limitToFormatting = true;
            typeOfProtection = restrictFormatType;
        }
        this.documentHelper.restrictFormatting = limitToFormatting;
        this.documentHelper.protectionType = typeOfProtection;
        this.selection.isHighlightEditRegion = true;
        this.addProtection(credential, this.documentHelper.protectionType, false);
    };
    Editor.prototype.enforceProtectionAsync = function (credential, restrictFormatType, isReadOnly) {
        return __awaiter(this, void 0, void 0, function () {
            var typeOfProtection, limitToFormatting;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof (restrictFormatType) === 'boolean') {
                            typeOfProtection = isReadOnly ? 'ReadOnly' : this.documentHelper.protectionType;
                            limitToFormatting = restrictFormatType;
                        }
                        else {
                            limitToFormatting = true;
                            typeOfProtection = restrictFormatType;
                        }
                        this.documentHelper.restrictFormatting = limitToFormatting;
                        this.documentHelper.protectionType = typeOfProtection;
                        this.selection.isHighlightEditRegion = true;
                        return [4 /*yield*/, this.addProtection(credential, this.documentHelper.protectionType, true)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Editor.prototype.getCommentHierarchicalIndex = function (comment) {
        var index = '';
        while (comment.ownerComment) {
            if (!isNullOrUndefined(comment.ownerComment)) {
                index = comment.ownerComment.replyComments.indexOf(comment) + ';' + index;
                comment = comment.ownerComment;
            }
            else {
                index = comment.replyComments.indexOf(comment) + ';' + index;
                comment = comment;
            }
        }
        index = 'C;' + this.documentHelper.comments.indexOf(comment) + ';' + index;
        return index;
    };
    Editor.prototype.alertBox = function () {
        var localObj = new L10n('documenteditor', this.owner.defaultLocale);
        localObj.setLocale(this.owner.locale);
        DialogUtility.alert({
            title: localObj.getConstant('Information'),
            content: localObj.getConstant('Multiple Comment')
        });
    };
    /**
     * Inserts the comment.
     *
     * @param {string} text Specify the comment text to be inserted.
     * @returns {void}
     */
    // Comment implementation starts
    Editor.prototype.insertComment = function (text) {
        if (isNullOrUndefined(this.selection.start) || (this.owner.isReadOnlyMode && !this.documentHelper.isCommentOnlyMode) || this.viewer.owner.enableHeaderAndFooter
            || !this.viewer.owner.enableComment) {
            return;
        }
        if (this.viewer.owner.commentReviewPane.commentPane.isEditMode) {
            return this.alertBox();
        }
        if (isNullOrUndefined(text)) {
            text = '';
        }
        this.insertCommentInternal(text);
    };
    Editor.prototype.insertCommentInternal = function (text) {
        this.documentHelper.layout.allowLayout = false;
        if (this.selection.isEmpty) {
            // If selection is at paragraph end, move selection to previous word similar to MS Word
            if (this.selection.start.isAtSamePosition(this.selection.end) && this.selection.start.isAtParagraphEnd) {
                var startOffset = this.selection.start.offset;
                this.selection.start.offset = startOffset - 1 !== -1 ? startOffset - 1 : startOffset;
            }
            this.selection.selectCurrentWord();
        }
        // If paragraph mark selected, remove paragraph mark selection
        if (this.selection.isParagraphLastLine(this.selection.end.currentWidget)
            && this.selection.end.offset === this.selection.getLineLength(this.selection.end.currentWidget) + 1) {
            this.selection.end.offset -= 1;
        }
        var paragraphInfo = this.selection.getParagraphInfo(this.selection.start);
        var startIndex = this.selection.getHierarchicalIndex(paragraphInfo.paragraph, paragraphInfo.offset.toString());
        var endParagraphInfo = this.selection.getParagraphInfo(this.selection.end);
        var endIndex = this.selection.getHierarchicalIndex(endParagraphInfo.paragraph, endParagraphInfo.offset.toString());
        this.initComplexHistory('InsertComment');
        var startPosition = this.selection.start;
        var endPosition = this.selection.end;
        var position = new TextPosition(this.owner);
        if (!this.selection.isForward) {
            startPosition = this.selection.end;
            endPosition = this.selection.start;
        }
        // Clones the end position.
        position.setPositionInternal(endPosition);
        var commentRangeStart = new CommentCharacterElementBox(0);
        var commentRangeEnd = new CommentCharacterElementBox(1);
        var isSameLine = startPosition.currentWidget === endPosition.currentWidget;
        // Adds comment start at selection start position.
        endPosition.setPositionInternal(startPosition);
        this.initInsertInline(commentRangeStart);
        if (isNullOrUndefined(position.paragraph) ||
            (position.currentWidget && position.currentWidget.children.length === 0 && position.currentWidget.indexInOwner === -1)) {
            var endPos = this.selection.getTextPosBasedOnLogicalIndex(endIndex);
            position.setPositionInternal(endPos);
        }
        // Updates the cloned position, since comment start is added in the same line.
        if (isSameLine) {
            position.setPositionParagraph(position.currentWidget, position.offset + commentRangeStart.length);
        }
        // Adds comment end and comment at selection end position.
        startPosition.setPositionInternal(position);
        endPosition.setPositionInternal(position);
        this.initInsertInline(commentRangeEnd);
        var commentAdv = new CommentElementBox(HelperMethods.getUtcDate());
        if (this.owner.editorHistory) {
            this.initHistory('InsertCommentWidget');
            this.owner.editorHistory.currentBaseHistoryInfo.removedNodes.push(commentAdv);
        }
        commentAdv.author = this.owner.currentUser ? this.owner.currentUser : 'Guest user';
        commentAdv.initial = this.constructCommentInitial(commentAdv.author);
        commentAdv.text = SanitizeHtmlHelper.sanitize(text);
        commentAdv.commentId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        commentRangeStart.comment = commentAdv;
        commentRangeStart.commentId = commentAdv.commentId;
        commentRangeEnd.comment = commentAdv;
        commentRangeEnd.commentId = commentAdv.commentId;
        commentAdv.commentStart = commentRangeStart;
        commentAdv.commentEnd = commentRangeEnd;
        this.addCommentWidget(commentAdv, true, true, true);
        if (this.editorHistory) {
            this.editorHistory.currentBaseHistoryInfo.insertPosition = this.getCommentHierarchicalIndex(commentAdv);
            this.editorHistory.updateHistory();
        }
        // this.selection.selectPosition(this.selection.getTextPosBasedOnLogicalIndex(startIndex), this.selection.getTextPosBasedOnLogicalIndex(endIndex));
        if (this.editorHistory) {
            this.editorHistory.updateComplexHistory();
        }
        this.reLayout(this.selection, false);
        this.documentHelper.layout.allowLayout = true;
        if (!this.isUserInsert) {
            var comment = this.owner.commentReviewPane.commentPane.comments.get(commentAdv);
            comment.postComment();
        }
    };
    /**
     * Deletes all the comments in the current document.
     *
     * @returns {void}
     */
    Editor.prototype.deleteAllComments = function () {
        if (this.documentHelper.comments.length === 0) {
            return;
        }
        // this.documentHelper.clearSearchHighlight();
        this.initComplexHistory('DeleteAllComments');
        this.owner.isLayoutEnabled = false;
        var historyInfo;
        if (this.editorHistory && this.editorHistory.currentHistoryInfo) {
            historyInfo = this.editorHistory.currentHistoryInfo;
        }
        while (this.documentHelper.comments.length > 0) {
            var comment = this.documentHelper.comments[0];
            this.initComplexHistory('DeleteComment');
            this.deleteCommentInternal(comment);
            if (this.editorHistory && this.editorHistory.currentHistoryInfo) {
                historyInfo.addModifiedAction(this.editorHistory.currentHistoryInfo);
            }
        }
        this.selection.selectContent(this.owner.documentStart, true);
        if (this.editorHistory) {
            this.editorHistory.currentHistoryInfo = historyInfo;
            this.editorHistory.updateComplexHistory();
        }
    };
    /**
     * Deletes the current selected comment.
     *
     * @returns {void}
     */
    Editor.prototype.deleteComment = function () {
        if ((this.owner.isReadOnlyMode && !this.documentHelper.isCommentOnlyMode) || isNullOrUndefined(this.owner) || isNullOrUndefined(this.owner.viewer)
            || isNullOrUndefined(this.owner.documentHelper.currentSelectedComment) || this.owner.enableHeaderAndFooter
            || !this.viewer.owner.enableComment) {
            return;
        }
        this.deleteCommentInternal(this.owner.documentHelper.currentSelectedComment);
    };
    /**
     * @param {CommentElementBox} comment - Specified the comment element box
     * @private
     * @returns {void}
     */
    Editor.prototype.deleteCommentInternal = function (comment) {
        this.initComplexHistory('DeleteComment');
        if (comment) {
            if (comment.replyComments.length > 0) {
                for (var i = comment.replyComments.length - 1; i >= 0; i--) {
                    this.deleteCommentInternal(comment.replyComments[i]);
                }
            }
            this.deleteCommentWidgetInternal(comment);
            var commentStart = comment.commentStart;
            var commentEnd = comment.commentEnd;
            if (commentEnd.indexInOwner !== -1) {
                this.removeInline(commentEnd);
            }
            if (commentStart.indexInOwner !== -1) {
                this.removeInline(commentStart);
            }
            commentStart.removeCommentMark();
        }
        if (this.editorHistory) {
            this.editorHistory.updateComplexHistory();
        }
    };
    Editor.prototype.deleteCommentWidgetInternal = function (comment) {
        if (this.owner.editorHistory) {
            this.initHistory('DeleteCommentWidget');
            this.owner.editorHistory.currentBaseHistoryInfo.insertPosition = this.getCommentHierarchicalIndex(comment);
            this.owner.editorHistory.currentBaseHistoryInfo.removedNodes.push(comment);
        }
        this.deleteCommentWidget(comment);
        if (this.editorHistory) {
            this.editorHistory.updateHistory();
        }
    };
    /**
     * @param {CommentElementBox} comment - Specified the comment element box
     * @private
     * @returns {void}
     */
    Editor.prototype.deleteCommentWidget = function (comment) {
        var commentIndex = this.documentHelper.comments.indexOf(comment);
        if (commentIndex !== -1) {
            this.documentHelper.comments.splice(commentIndex, 1);
        }
        else if (comment.isReply && comment.ownerComment) {
            commentIndex = comment.ownerComment.replyComments.indexOf(comment);
            comment.ownerComment.replyComments.splice(commentIndex, 1);
        }
        if (this.owner.commentReviewPane) {
            this.owner.commentReviewPane.deleteComment(comment);
            if (this.documentHelper.currentSelectedComment === comment) {
                this.documentHelper.currentSelectedComment = undefined;
            }
        }
    };
    /**
     * @param {CommentElementBox} comment - Specified the comment element box
     * @private
     * @returns {void}
     */
    Editor.prototype.resolveComment = function (comment) {
        if (this.owner.isReadOnlyMode && !this.documentHelper.isCommentOnlyMode) {
            return;
        }
        var eventArgs = { author: comment.author, cancel: false, type: 'Resolve' };
        this.owner.trigger(beforeCommentActionEvent, eventArgs);
        if (eventArgs.cancel && eventArgs.type === 'Resolve') {
            return;
        }
        this.initHistory('ResolveComment');
        if (this.editorHistory && this.editorHistory.currentBaseHistoryInfo) {
            this.editorHistory.currentBaseHistoryInfo.removedNodes.push(comment);
        }
        this.resolveOrReopenComment(comment, true);
    };
    /**
     * @param {CommentElementBox} comment - Specified the comment element box
     * @private
     * @returns {void}
     */
    Editor.prototype.reopenComment = function (comment) {
        if (this.owner.isReadOnlyMode && !this.documentHelper.isCommentOnlyMode) {
            return;
        }
        var eventArgs = { author: comment.author, cancel: false, type: 'Reopen' };
        this.owner.trigger(beforeCommentActionEvent, eventArgs);
        if (eventArgs.cancel && eventArgs.type === 'Reopen') {
            return;
        }
        this.initHistory('ResolveComment');
        if (this.editorHistory && this.editorHistory.currentBaseHistoryInfo) {
            this.editorHistory.currentBaseHistoryInfo.removedNodes.push(comment);
        }
        this.resolveOrReopenComment(comment, false);
    };
    /**
     * @private
     */
    Editor.prototype.resolveOrReopenComment = function (comment, resolve) {
        comment.isResolved = resolve;
        for (var i = 0; i < comment.replyComments.length; i++) {
            comment.replyComments[i].isResolved = resolve;
        }
        if (this.owner.commentReviewPane) {
            if (resolve) {
                this.owner.commentReviewPane.resolveComment(comment);
            }
            else {
                this.owner.commentReviewPane.reopenComment(comment);
            }
        }
        this.reLayout(this.selection, false, false);
    };
    /**
     * @param {CommentElementBox} parentComment - Specified the parent comment
     * @param {string} text - Specified the text.
     * @private
     * @returns {void}
     */
    Editor.prototype.replyComment = function (parentComment, text) {
        if (this.owner.isReadOnlyMode && !this.documentHelper.isCommentOnlyMode) {
            return;
        }
        var commentWidget = parentComment;
        if (parentComment) {
            this.initComplexHistory('InsertComment');
            var currentCmtStart = commentWidget.commentStart;
            var currentCmtEnd = commentWidget.commentEnd;
            var offset = currentCmtStart.line.getOffset(currentCmtStart, 1);
            var startPosition = new TextPosition(this.documentHelper.owner);
            startPosition.setPositionParagraph(currentCmtStart.line, offset);
            var endOffset = currentCmtEnd.line.getOffset(currentCmtEnd, 1);
            var endPosition = new TextPosition(this.documentHelper.owner);
            endPosition.setPositionParagraph(currentCmtEnd.line, endOffset);
            this.selection.start.setPositionInternal(startPosition);
            this.selection.end.setPositionInternal(endPosition);
            startPosition = this.selection.start;
            endPosition = this.selection.end;
            var position = new TextPosition(this.owner);
            // Clones the end position.
            position.setPositionInternal(endPosition);
            var commentRangeStart = new CommentCharacterElementBox(0);
            var commentRangeEnd = new CommentCharacterElementBox(1);
            var isAtSameLine = startPosition.currentWidget === endPosition.currentWidget;
            // Adds comment start at selection start position.
            endPosition.setPositionInternal(startPosition);
            this.initInsertInline(commentRangeStart);
            // Updates the cloned position, since comment start is added in the same paragraph.
            if (isAtSameLine) {
                position.setPositionParagraph(position.currentWidget, position.offset + commentRangeStart.length);
            }
            // Adds comment end and comment at selection end position.
            startPosition.setPositionInternal(position);
            endPosition.setPositionInternal(position);
            this.initInsertInline(commentRangeEnd);
            var replyComment = new CommentElementBox(HelperMethods.getUtcDate());
            replyComment.author = this.owner.currentUser ? this.owner.currentUser : 'Guest user';
            replyComment.text = text ? text : '';
            replyComment.commentId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            replyComment.isReply = true;
            commentWidget.replyComments.push(replyComment);
            replyComment.ownerComment = commentWidget;
            if (this.owner.editorHistory) {
                this.initHistory('InsertCommentWidget');
                this.owner.editorHistory.currentBaseHistoryInfo.removedNodes.push(replyComment);
            }
            commentRangeStart.comment = replyComment;
            commentRangeStart.commentId = replyComment.commentId;
            commentRangeEnd.comment = replyComment;
            commentRangeEnd.commentId = replyComment.commentId;
            replyComment.commentStart = commentRangeStart;
            replyComment.commentEnd = commentRangeEnd;
            if (this.owner.commentReviewPane) {
                this.owner.commentReviewPane.addReply(replyComment, false, true);
            }
            if (this.editorHistory) {
                this.editorHistory.currentBaseHistoryInfo.insertPosition = this.getCommentHierarchicalIndex(replyComment);
                this.editorHistory.updateHistory();
            }
            if (this.editorHistory) {
                this.editorHistory.updateComplexHistory();
            }
            this.reLayout(this.selection);
        }
    };
    Editor.prototype.removeInline = function (element) {
        this.selection.start.setPositionParagraph(element.line, element.line.getOffset(element, 0));
        this.selection.end.setPositionParagraph(this.selection.start.currentWidget, this.selection.start.offset + element.length);
        this.initHistory('RemoveInline');
        if (this.editorHistory && this.editorHistory.currentBaseHistoryInfo) {
            this.updateHistoryPosition(this.selection.start, true);
        }
        this.removeSelectedContents(this.documentHelper.selection);
        if (this.editorHistory) {
            this.editorHistory.updateHistory();
        }
        this.fireContentChange();
    };
    /**
     * @param {CommentElementBox} commentWidget - Specifies the comment
     * @param {boolean} isNewComment - Specifies is new comment
     * @param {boolean} showComments - Specifies show comments
     * @param {boolean} selectComment - Specified select comment
     * @private
     * @returns {void}
     */
    Editor.prototype.addCommentWidget = function (commentWidget, isNewComment, showComments, selectComment) {
        if (this.documentHelper.comments.indexOf(commentWidget) === -1) {
            var isInserted = false;
            if (this.documentHelper.comments.length > 0) {
                var currentStart = this.selection.getElementPosition(commentWidget.commentStart).startPosition;
                for (var i = 0; i < this.documentHelper.comments.length; i++) {
                    /* eslint-disable-next-line max-len */
                    var paraIndex = this.selection.getElementPosition(this.documentHelper.comments[i].commentStart).startPosition;
                    if (currentStart.isExistBefore(paraIndex)) {
                        isInserted = true;
                        this.documentHelper.comments.splice(i, 0, commentWidget);
                        break;
                    }
                }
            }
            if (!isInserted) {
                this.documentHelper.comments.push(commentWidget);
            }
            if (this.owner.commentReviewPane) {
                this.owner.showComments = showComments;
                this.owner.commentReviewPane.selectedTab = 0;
                this.owner.commentReviewPane.addComment(commentWidget, isNewComment, selectComment);
                if (selectComment) {
                    this.owner.selection.selectComment(commentWidget);
                }
            }
        }
    };
    /**
     * @param {CommentElementBox} comment - Specifies comment element box
     * @param {string} hierarchicalIndex - Specifies the hierachical index.
     * @private
     * @returns {void}
     */
    Editor.prototype.addReplyComment = function (comment, hierarchicalIndex) {
        var index = hierarchicalIndex.split(';');
        var ownerComment = this.documentHelper.comments[parseInt(index[1], 10)];
        if (index[2] !== '') {
            ownerComment.replyComments.splice(parseInt(index[2], 10), 0, comment);
            comment.ownerComment = ownerComment;
        }
        if (this.owner.commentReviewPane) {
            this.owner.showComments = true;
            this.owner.commentReviewPane.addReply(comment, false, true);
            this.owner.selection.selectComment(comment);
        }
    };
    /**
     * @param {string} password - Specifies the password
     * @param {string} protectionType - Specifies the protection type
     * @param {boolean} isAsync - specifies whether the send method is synchronous or asynchronous
     * @private
     * @returns {void}
     */
    Editor.prototype.addProtection = function (password, protectionType, isAsync) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        isAsync = isNullOrUndefined(isAsync) ? true : isAsync;
                        if (password === '') {
                            _this.protectDocument(protectionType);
                            resolve();
                        }
                        else {
                            _this.currentProtectionType = protectionType;
                            var enforceProtectionHandler = new XmlHttpRequestHandler();
                            var passwordBase64 = _this.base64.encodeString(password);
                            /* eslint-disable @typescript-eslint/no-explicit-any */
                            var formObject = {
                                passwordBase64: passwordBase64,
                                saltBase64: '',
                                spinCount: 100000
                            };
                            /* eslint-enable @typescript-eslint/no-explicit-any */
                            var url = _this.owner.serviceUrl + _this.owner.serverActionSettings.restrictEditing;
                            enforceProtectionHandler.url = url;
                            enforceProtectionHandler.contentType = 'application/json;charset=UTF-8';
                            enforceProtectionHandler.onSuccess = function (result) {
                                _this.enforceProtectionInternal(result);
                                resolve();
                            };
                            enforceProtectionHandler.onFailure = function (result) {
                                _this.protectionFailureHandler(result);
                                reject();
                            };
                            enforceProtectionHandler.onError = function (result) {
                                _this.protectionFailureHandler(result);
                                reject();
                            };
                            enforceProtectionHandler.customHeaders = _this.owner.headers;
                            var httprequestEventArgs = { serverActionType: 'RestrictEditing', headers: _this.owner.headers, timeout: 0, cancel: false, withCredentials: false };
                            _this.owner.trigger(beforeXmlHttpRequestSend, httprequestEventArgs);
                            if (httprequestEventArgs.cancel) {
                                if (_this.documentHelper.dialog.visible) {
                                    _this.documentHelper.dialog.hide();
                                }
                            }
                            else {
                                enforceProtectionHandler.send(formObject, httprequestEventArgs, isAsync);
                            }
                        }
                    })];
            });
        });
    };
    /* eslint-disable @typescript-eslint/no-explicit-any */
    Editor.prototype.protectionFailureHandler = function (result) {
        var localeValue = new L10n('documenteditor', this.owner.defaultLocale);
        localeValue.setLocale(this.documentHelper.owner.locale);
        if (result.name === 'onError') {
            DialogUtility.alert(localeValue.getConstant('Error in establishing connection with web server'));
        }
        else {
            this.owner.fireServiceFailure(result);
            console.error(result.statusText);
        }
    };
    Editor.prototype.enforceProtectionInternal = function (result) {
        var data = JSON.parse(result.data);
        this.documentHelper.saltValue = data[0];
        this.documentHelper.hashValue = data[1];
        this.protectDocument(this.currentProtectionType);
    };
    Editor.prototype.toggleTrackChangesProtection = function (enabled) {
        this.viewer.owner.enableTrackChanges = enabled;
        var eventArgs = { isTrackChangesEnabled: enabled };
        this.owner.trigger(trackChangeEvent, eventArgs);
    };
    Editor.prototype.protectDocument = function (protectionType) {
        this.protect(protectionType);
        var restrictPane = this.documentHelper.restrictEditingPane.restrictPane;
        if (restrictPane && restrictPane.style.display === 'block') {
            this.documentHelper.restrictEditingPane.showStopProtectionPane(true);
            this.documentHelper.restrictEditingPane.loadPaneValue();
            this.documentHelper.dialog.hide();
        }
        this.owner.notify(protectionTypeChangeEvent, {});
        if (protectionType === 'RevisionsOnly') {
            this.toggleTrackChangesProtection(true);
        }
        this.owner.trackChangesPane.enableDisableButton(false);
    };
    /**
     * Stops the document protection.
     *
     * @param {string} password Specify the password to stop protection.
     * @returns {void}
     */
    /* eslint-disable @typescript-eslint/no-explicit-any */
    Editor.prototype.stopProtection = function (password) {
        if (this.documentHelper.isDocumentProtected) {
            if ((!isNullOrUndefined(this.documentHelper.saltValue) && this.documentHelper.saltValue === '')
                && (!isNullOrUndefined(this.documentHelper.hashValue) && this.documentHelper.hashValue === '')
                && (!isNullOrUndefined(password) && password === '')) {
                this.unProtectDocument();
                return;
            }
            var unProtectDocumentHandler = new XmlHttpRequestHandler();
            var passwordBase64 = this.base64.encodeString(password);
            var formObject = {
                passwordBase64: passwordBase64,
                saltBase64: this.documentHelper.saltValue,
                spinCount: 100000
            };
            unProtectDocumentHandler.url = this.owner.serviceUrl + this.owner.serverActionSettings.restrictEditing;
            unProtectDocumentHandler.contentType = 'application/json;charset=UTF-8';
            unProtectDocumentHandler.customHeaders = this.owner.headers;
            unProtectDocumentHandler.onSuccess = this.onUnProtectionSuccess.bind(this);
            unProtectDocumentHandler.onFailure = this.protectionFailureHandler.bind(this);
            unProtectDocumentHandler.onError = this.protectionFailureHandler.bind(this);
            var httprequestEventArgs = { serverActionType: 'RestrictEditing', headers: this.owner.headers, timeout: 0, cancel: false, withCredentials: false };
            this.owner.trigger(beforeXmlHttpRequestSend, httprequestEventArgs);
            if (httprequestEventArgs.cancel) {
                if (this.documentHelper.dialog.visible) {
                    this.documentHelper.dialog.hide();
                }
            }
            else {
                unProtectDocumentHandler.send(formObject, httprequestEventArgs, false);
            }
            this.toggleTrackChangesProtection(false);
        }
    };
    /**
     * Stops the document protection.
     *
     * @param {string} password Specify the password to stop protection.
     * @returns {Promise} Returns a Promise which is resolved when protection is stopped, or rejected if for any reason protection cannot be stopped.
     */
    /* eslint-disable @typescript-eslint/no-explicit-any */
    Editor.prototype.stopProtectionAsync = function (password) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (_this.documentHelper.isDocumentProtected) {
                            if ((!isNullOrUndefined(_this.documentHelper.saltValue) && _this.documentHelper.saltValue === '')
                                && (!isNullOrUndefined(_this.documentHelper.hashValue) && _this.documentHelper.hashValue === '')
                                && (!isNullOrUndefined(password) && password === '')) {
                                _this.unProtectDocument();
                                resolve();
                                return;
                            }
                            var unProtectDocumentHandler = new XmlHttpRequestHandler();
                            var passwordBase64 = _this.base64.encodeString(password);
                            var formObject = {
                                passwordBase64: passwordBase64,
                                saltBase64: _this.documentHelper.saltValue,
                                spinCount: 100000
                            };
                            unProtectDocumentHandler.url = _this.owner.serviceUrl + _this.owner.serverActionSettings.restrictEditing;
                            unProtectDocumentHandler.contentType = 'application/json;charset=UTF-8';
                            unProtectDocumentHandler.customHeaders = _this.owner.headers;
                            unProtectDocumentHandler.onSuccess = function (result) {
                                _this.onUnProtectionSuccess(result);
                                resolve();
                            };
                            unProtectDocumentHandler.onFailure = function (result) {
                                _this.protectionFailureHandler(result);
                                reject();
                            };
                            unProtectDocumentHandler.onError = function (result) {
                                _this.protectionFailureHandler(result);
                                reject();
                            };
                            var httprequestEventArgs = { serverActionType: 'RestrictEditing', headers: _this.owner.headers, timeout: 0, cancel: false, withCredentials: false };
                            _this.owner.trigger(beforeXmlHttpRequestSend, httprequestEventArgs);
                            if (httprequestEventArgs.cancel) {
                                if (_this.documentHelper.dialog.visible) {
                                    _this.documentHelper.dialog.hide();
                                }
                            }
                            else {
                                unProtectDocumentHandler.send(formObject, httprequestEventArgs);
                            }
                            _this.toggleTrackChangesProtection(false);
                        }
                    })];
            });
        });
    };
    Editor.prototype.onUnProtectionSuccess = function (result) {
        var encodeString = JSON.parse(result.data);
        this.validateHashValue(encodeString[1]);
    };
    Editor.prototype.validateHashValue = function (currentHashValue) {
        var localeValue = new L10n('documenteditor', this.owner.defaultLocale);
        localeValue.setLocale(this.documentHelper.owner.locale);
        var decodeUserHashValue = this.base64.decodeString(currentHashValue);
        var documentHashValue = this.documentHelper.hashValue;
        var defaultHashValue = this.base64.decodeString(documentHashValue);
        var stopProtection = true;
        if (decodeUserHashValue.length === defaultHashValue.length) {
            for (var i = 0; i < decodeUserHashValue.length; i++) {
                if (decodeUserHashValue[i] !== defaultHashValue[i]) {
                    stopProtection = false;
                    break;
                }
            }
        }
        else {
            stopProtection = false;
        }
        if (stopProtection) {
            this.unProtectDocument();
        }
        else {
            DialogUtility.alert(localeValue.getConstant('The password is incorrect'));
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Editor.prototype.unProtectDocument = function () {
        var previousProtectionType = this.documentHelper.protectionType;
        this.documentHelper.isDocumentProtected = false;
        this.documentHelper.restrictFormatting = false;
        this.documentHelper.protectionType = 'NoProtection';
        this.documentHelper.saltValue = '';
        this.documentHelper.hashValue = '';
        this.documentHelper.selection.highlightEditRegion();
        var restrictPane = this.documentHelper.restrictEditingPane.restrictPane;
        if (restrictPane && restrictPane.style.display === 'block') {
            this.documentHelper.restrictEditingPane.showStopProtectionPane(false);
        }
        if (previousProtectionType === 'RevisionsOnly') {
            this.toggleTrackChangesProtection(false);
        }
        this.owner.trackChangesPane.enableDisableButton(true);
        if (!isNullOrUndefined(this.editorHistory)) {
            this.owner.editorHistory.clearHistory();
        }
        this.owner.notify(protectionTypeChangeEvent, {});
        this.documentHelper.dialog.hide();
    };
    /**
     * Notify content change event
     *
     * @private
     * @returns {void}
     */
    Editor.prototype.fireContentChange = function () {
        this.owner.documentHelper.render.commentMarkDictionary.clear();
        if (this.selection.isHighlightEditRegion) {
            if (this.owner.enableLockAndEdit) {
                this.owner.collaborativeEditingModule.updateLockRegion();
            }
            else {
                this.selection.onHighlight();
            }
        }
        this.selection.highlightFormFields();
        if (!this.isPaste) {
            this.copiedContent = undefined;
            this.copiedTextContent = '';
            this.previousSectionFormat = undefined;
            this.previousParaFormat = undefined;
            this.previousCharFormat = undefined;
            this.selection.isViewPasteOptions = false;
            if (this.isPasteListUpdated) {
                this.isPasteListUpdated = false;
            }
            this.selection.showHidePasteOptions(undefined, undefined);
        }
        if (this.documentHelper.owner.isLayoutEnabled && !this.documentHelper.owner.editor.isUserInsert && !this.documentHelper.owner.isShiftingEnabled) {
            this.documentHelper.owner.fireContentChange();
        }
        if (this.owner.isSpellCheck && !isNullOrUndefined(this.selection.editPosition)) {
            this.triggerPageSpellCheck = false;
        }
    };
    /**
     * Update physical location for text position
     *
     * @param {boolean} isSelectionChanged - Specifies the selection change
     * @private
     * @returns {void}
     */
    Editor.prototype.updateSelectionTextPosition = function (isSelectionChanged) {
        this.getOffsetValue(this.selection);
        this.selection.start.updatePhysicalPosition(true);
        if (this.selection.isEmpty) {
            this.selection.end.setPositionInternal(this.selection.start);
        }
        else {
            this.selection.end.updatePhysicalPosition(true);
        }
        this.selection.upDownSelectionLength = this.selection.end.location.x;
        this.selection.fireSelectionChanged(isSelectionChanged);
    };
    /**
     * Predict text
     *
     * @private
     * @returns {void}
     */
    Editor.prototype.predictText = function () {
        this.documentHelper.suffix = '';
        if (this.selection.start.paragraph.isEmpty() || this.selection.start.offset === 0 &&
            this.selection.start.currentWidget.isFirstLine() || this.selection.end.offset === 0 &&
            this.selection.end.currentWidget.isFirstLine()) {
            this.documentHelper.prefix = '';
        }
        else {
            this.getPrefixAndSuffix();
        }
        this.documentHelper.prefix = '@' + String.fromCharCode(160) + this.documentHelper.prefix; // &nbsp;
        this.documentHelper.editableDiv.innerText = this.documentHelper.prefix;
        this.documentHelper.selection.setEditableDivCaretPosition(this.documentHelper.prefix.length);
    };
    /* eslint-disable  */
    Editor.prototype.getPrefixAndSuffix = function () {
        //let viewer: LayoutViewer = this.owner.viewer;
        var editor = this.owner;
        var documentHelper = editor.documentHelper;
        if (this.selection.text !== '') {
            documentHelper.prefix = '';
            return;
        }
        else {
            var startIndex = 0;
            var inlineInfo = this.selection.start.currentWidget.getInline(this.selection.start.offset, startIndex);
            var inline = inlineInfo.element;
            startIndex = inlineInfo.index;
            if (inline !== undefined) {
                var boxInfo = this.selection.getElementBoxInternal(inline, startIndex);
                var box = boxInfo.element;
                startIndex = boxInfo.index;
                var spaceIndex = 0;
                if (!isNullOrUndefined(box)) {
                    var prefixAdded = false;
                    if (box instanceof TextElementBox && startIndex > 0 && box.line.isFirstLine()) {
                        documentHelper.prefix = '';
                    }
                    if (!(inline instanceof TextElementBox)) {
                        inline = this.selection.getPreviousTextElement(inline);
                    }
                    /* eslint-disable no-cond-assign */
                    while ((spaceIndex = documentHelper.prefix.lastIndexOf(' ')) < 0 && inline instanceof TextElementBox) {
                        if (inline.previousNode instanceof TextElementBox && documentHelper.prefix.indexOf(' ') === -1) {
                            if (!prefixAdded) {
                                documentHelper.prefix = inline.text.substring(0, startIndex);
                                prefixAdded = true;
                            }
                            else {
                                documentHelper.prefix = inline.text + documentHelper.prefix;
                            }
                            inline = inline.previousNode;
                            // If the line has no elements then break the loop to avoid the exception.
                            if (inline instanceof ListTextElementBox) {
                                break;
                            }
                            if (!(inline instanceof TextElementBox)) {
                                inline = this.selection.getPreviousTextElement(inline);
                            }
                        }
                        else if (!(inline.previousNode instanceof TextElementBox)) {
                            if (!prefixAdded) {
                                documentHelper.prefix = inline.text.substring(0, startIndex);
                                prefixAdded = true;
                            }
                            else {
                                documentHelper.prefix = inline.text + documentHelper.prefix;
                            }
                            break;
                        }
                    }
                    if (!(documentHelper.prefix.length > 1 && documentHelper.prefix[documentHelper.prefix.length - 1] === ' ' &&
                        documentHelper.prefix[documentHelper.prefix.length - 2] === '.')) {
                        spaceIndex = documentHelper.prefix.lastIndexOf(' ');
                    }
                    else {
                        spaceIndex = -1;
                        documentHelper.prefix = '';
                    }
                    documentHelper.prefix = spaceIndex < 0 ? documentHelper.prefix : documentHelper.prefix.substring(spaceIndex);
                    if (documentHelper.prefix.indexOf(' ') === 0 && documentHelper.prefix.length >= 1) {
                        documentHelper.prefix = documentHelper.prefix.substring(1);
                    }
                    // suffix text prediction
                    var endIndex = 0;
                    var endInlineInfo = this.selection.end.currentWidget.getInline(this.selection.end.offset, endIndex);
                    var endInline = endInlineInfo.element;
                    endIndex = endInlineInfo.index;
                    boxInfo = this.selection.getElementBoxInternal(endInline, endIndex);
                    box = boxInfo.element;
                    endIndex = boxInfo.index;
                    if (box) {
                        var suffixAdded = false;
                        if (box instanceof TextElementBox && endIndex < box.length) {
                            documentHelper.suffix = '';
                        }
                        // boxIndex = renderedElements.get(endInline).indexOf(box);
                        while ((spaceIndex = documentHelper.suffix.indexOf(' ')) < 0 && endInline instanceof TextElementBox) {
                            if (endInline.nextNode instanceof TextElementBox && documentHelper.suffix.indexOf(' ') === -1) {
                                if (!suffixAdded) {
                                    documentHelper.suffix = box.text.substring(endIndex);
                                    suffixAdded = true;
                                }
                                else {
                                    documentHelper.suffix = documentHelper.suffix + endInline.text;
                                }
                                endInline = endInline.nextNode;
                            }
                            else if (!(endInline.nextNode instanceof TextElementBox)) {
                                if (!suffixAdded) {
                                    documentHelper.suffix = box.text.substring(endIndex);
                                    suffixAdded = true;
                                }
                                else {
                                    documentHelper.suffix = documentHelper.suffix + endInline.text;
                                }
                                break;
                            }
                        }
                        spaceIndex = documentHelper.suffix.indexOf(' ');
                        documentHelper.suffix = spaceIndex < 0 ? documentHelper.suffix : documentHelper.suffix.substring(0, spaceIndex);
                    }
                }
            }
        }
    };
    /**
     * key action
     * @private
     * @returns {void}
     */
    /* eslint-disable  */
    Editor.prototype.onKeyDownInternal = function (event, ctrl, shift, alt) {
        var key = event.which || event.keyCode;
        this.owner.focusIn();
        if (ctrl && !shift && !alt) {
            this.documentHelper.isControlPressed = true;
            switch (key) {
                case 8:
                    event.preventDefault();
                    this.handleCtrlBackKey();
                    break;
                case 46:
                    event.preventDefault();
                    this.handleCtrlDelete();
                    break;
                case 9:
                    event.preventDefault();
                    if (this.owner.acceptTab) {
                        this.selection.handleTabKey(false, false);
                    }
                    break;
                case 13:
                    event.preventDefault();
                    this.insertPageBreak();
                    break;
                case 48:
                    event.preventDefault();
                    var value = 0;
                    var beforeSpacing = this.documentHelper.selection.start.paragraph.paragraphFormat.beforeSpacing;
                    if (beforeSpacing > 12) {
                        value = 12;
                    }
                    else if (beforeSpacing > 0 && beforeSpacing <= 12) {
                        value = 0;
                    }
                    else if (beforeSpacing === 0) {
                        value = 12;
                    }
                    this.onApplyParagraphFormat('beforeSpacing', value, true, false);
                    break;
                case 49:
                    event.preventDefault();
                    if (!this.owner.isReadOnlyMode || this.selection.isInlineFormFillMode()) {
                        this.onApplyParagraphFormat('lineSpacing', 1, false, false);
                    }
                    break;
                case 50:
                    event.preventDefault();
                    if (!this.owner.isReadOnlyMode || this.selection.isInlineFormFillMode()) {
                        this.onApplyParagraphFormat('lineSpacing', 2, false, false);
                    }
                    break;
                case 53:
                    event.preventDefault();
                    if (!this.owner.isReadOnlyMode || this.selection.isInlineFormFillMode()) {
                        this.onApplyParagraphFormat('lineSpacing', 1.5, false, false);
                    }
                    break;
                case 66:
                    event.preventDefault();
                    if (!this.owner.isReadOnlyMode || this.selection.isInlineFormFillMode()) {
                        this.toggleBold();
                    }
                    break;
                case 68:
                    event.preventDefault();
                    if (!this.owner.isReadOnlyMode && this.owner.fontDialogModule) {
                        this.owner.fontDialogModule.showFontDialog();
                    }
                    break;
                case 69:
                    if (!this.owner.isReadOnlyMode || this.selection.isInlineFormFillMode()) {
                        this.toggleTextAlignment('Center');
                    }
                    event.preventDefault();
                    break;
                case 72:
                    event.preventDefault();
                    if (!this.owner.isReadOnly && this.owner.optionsPaneModule) {
                        this.owner.optionsPaneModule.isReplace = true;
                        this.owner.optionsPaneModule.showHideOptionsPane(true);
                    }
                    break;
                case 73:
                    event.preventDefault();
                    if (!this.owner.isReadOnlyMode || this.selection.isInlineFormFillMode()) {
                        this.toggleItalic();
                    }
                    break;
                case 74:
                    if (!this.owner.isReadOnlyMode || this.selection.isInlineFormFillMode()) {
                        this.toggleTextAlignment('Justify');
                    }
                    event.preventDefault();
                    break;
                case 75:
                    event.preventDefault();
                    if (this.owner.hyperlinkDialogModule && !this.owner.isReadOnlyMode) {
                        this.owner.hyperlinkDialogModule.show();
                    }
                    break;
                case 76:
                    if (!this.owner.isReadOnlyMode || this.selection.isInlineFormFillMode()) {
                        this.toggleTextAlignment('Left');
                    }
                    event.preventDefault();
                    break;
                case 77:
                    if (!this.owner.isReadOnlyMode || this.selection.isInlineFormFillMode()) {
                        this.owner.selection.increaseIndent();
                    }
                    event.preventDefault();
                    break;
                case 78:
                    event.preventDefault();
                    if (!this.owner.isReadOnlyMode) {
                        this.owner.openBlank();
                    }
                    break;
                case 82:
                    if (!this.owner.isReadOnlyMode || this.selection.isInlineFormFillMode()) {
                        this.toggleTextAlignment('Right');
                    }
                    event.preventDefault();
                    break;
                case 85:
                    event.preventDefault();
                    if (!this.owner.isReadOnlyMode || this.selection.isInlineFormFillMode()) {
                        this.owner.selection.toggleUnderline('Single');
                    }
                    break;
                case 88:
                    event.preventDefault();
                    if (!this.owner.isReadOnlyMode) {
                        this.owner.editor.cut();
                    }
                    break;
                case 89:
                    if (this.owner.enableEditorHistory) {
                        this.editorHistory.redo();
                        event.preventDefault();
                    }
                    break;
                case 90:
                    if (this.owner.enableEditorHistory) {
                        this.editorHistory.undo();
                        event.preventDefault();
                    }
                    break;
                case 219:
                    event.preventDefault();
                    if (!this.owner.isReadOnlyMode || this.selection.isInlineFormFillMode()) {
                        this.onApplyCharacterFormat('fontSize', 'decrement', true);
                    }
                    break;
                case 221:
                    event.preventDefault();
                    if (!this.owner.isReadOnlyMode || this.selection.isInlineFormFillMode()) {
                        this.onApplyCharacterFormat('fontSize', 'increment', true);
                    }
                    break;
                case 187:
                    event.preventDefault();
                    if (!this.owner.isReadOnlyMode || this.selection.isInlineFormFillMode()) {
                        this.toggleBaselineAlignment('Subscript');
                    }
                    break;
            }
        }
        else if (shift && !ctrl && !alt) {
            switch (key) {
                case 9:
                    if (this.owner.acceptTab) {
                        event.preventDefault();
                        this.selection.handleTabKey(false, true);
                    }
                    else {
                        this.documentHelper.editableDiv.blur();
                    }
                    break;
                case 13:
                    this.handleShiftEnter();
                    event.preventDefault();
                    break;
            }
        }
        else if (shift && ctrl && !alt) {
            switch (key) {
                case 13:
                    if (!this.owner.isReadOnlyMode) {
                        event.preventDefault();
                        this.insertColumnBreak();
                    }
                    break;
                case 68:
                    if (!this.owner.isReadOnlyMode) {
                        this.owner.selection.toggleUnderline('Double');
                    }
                    break;
                case 77:
                    if (!this.owner.isReadOnlyMode) {
                        this.owner.selection.decreaseIndent();
                    }
                    event.preventDefault();
                    break;
                case 188:
                    event.preventDefault();
                    if (!this.owner.isReadOnlyMode) {
                        this.onApplyCharacterFormat('fontSize', 'decrement', true);
                    }
                    break;
                case 190:
                    event.preventDefault();
                    if (!this.owner.isReadOnlyMode) {
                        this.onApplyCharacterFormat('fontSize', 'increment', true);
                    }
                    break;
                case 187:
                    event.preventDefault();
                    if (!this.owner.isReadOnlyMode) {
                        this.toggleBaselineAlignment('Superscript');
                    }
                    break;
                case 69:
                    event.preventDefault();
                    if (!this.owner.isReadOnlyMode) {
                        var eventArgs = { isTrackChangesEnabled: !this.owner.enableTrackChanges };
                        this.owner.trigger(trackChangeEvent, eventArgs);
                    }
            }
        }
        else if (!shift && ctrl && alt) {
            switch (key) {
                case 72:
                    event.preventDefault();
                    if (!this.owner.isReadOnlyMode && this.owner.isDocumentLoaded) {
                        this.toggleHighlightColor();
                    }
                    break;
                case 70:
                    event.preventDefault();
                    if (!this.owner.isReadOnlyMode && this.owner.isDocumentLoaded) {
                        this.insertFootnote();
                    }
                    break;
                case 68:
                    event.preventDefault();
                    if (!this.owner.isReadOnlyMode && this.owner.isDocumentLoaded) {
                        this.insertEndnote();
                    }
                    break;
            }
        }
        else {
            switch (key) {
                case 8:
                    event.preventDefault();
                    this.handleBackKey();
                    break;
                case 9:
                    if (this.owner.acceptTab) {
                        event.preventDefault();
                        this.selection.handleTabKey(true, false);
                    }
                    else {
                        this.documentHelper.editableDiv.blur();
                    }
                    break;
                case 13:
                    event.preventDefault();
                    if (this.owner.isSpellCheck) {
                        this.documentHelper.triggerSpellCheck = true;
                    }
                    this.handleEnterKey();
                    if (this.owner.isSpellCheck) {
                        this.documentHelper.triggerSpellCheck = false;
                    }
                    break;
                case 27:
                    event.preventDefault();
                    if (!this.isPaste) {
                        this.copiedContent = undefined;
                        this.copiedTextContent = '';
                        this.previousParaFormat = undefined;
                        this.previousCharFormat = undefined;
                        this.previousSectionFormat = undefined;
                        this.selection.isViewPasteOptions = false;
                        if (this.isPasteListUpdated) {
                            this.isPasteListUpdated = false;
                        }
                        this.selection.showHidePasteOptions(undefined, undefined);
                    }
                    break;
                case 46:
                    this.handleDelete();
                    event.preventDefault();
                    break;
                case 32:
                    this.selection.handleSpaceBarKey();
                    break;
                case 120:
                    var textPosition = this.selection.getDocumentEnd();
                    textPosition.offset = (this.selection.getDocumentEnd().offset + 1);
                    if (this.selection.start.isAtSamePosition(this.selection.getDocumentStart()) &&
                        this.selection.end.isAtSamePosition(textPosition)) {
                        this.owner.updateFields();
                    }
                    else {
                        this.selection.updateRefField();
                    }
                    break;
            }
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Editor.prototype.handleShiftEnter = function () {
        if (!this.owner.isReadOnlyMode) {
            this.handleTextInput('\v');
        }
        this.selection.checkForCursorVisibility();
    };
    /**
     * Handles back key.
     *
     * @private
     * @returns {void}
     */
    Editor.prototype.handleBackKey = function () {
        if ((!this.owner.isReadOnlyMode && this.canEditContentControl) || this.selection.isInlineFormFillMode()) {
            this.owner.editorModule.onBackSpace();
        }
        this.selection.checkForCursorVisibility();
    };
    /**
     * Handles delete
     *
     * @private
     * @returns {void}
     */
    Editor.prototype.handleDelete = function () {
        if ((!this.owner.isReadOnlyMode && this.canEditContentControl) || this.selection.isInlineFormFillMode()) {
            this.owner.editorModule.delete();
        }
        this.selection.checkForCursorVisibility();
    };
    /**
     * Handles enter key.
     *
     * @private
     * @returns {void}
     */
    Editor.prototype.handleEnterKey = function () {
        if ((!this.owner.isReadOnlyMode && this.canEditContentControl) || this.selection.isInlineFormFillMode()) {
            if (Browser.isDevice) {
                this.documentHelper.isCompositionStart = false;
            }
            this.owner.editorModule.onEnter();
        }
        this.selection.checkForCursorVisibility();
    };
    /**
     * Handles Control back key.
     *
     * @private
     * @returns {void}
     */
    Editor.prototype.handleCtrlBackKey = function () {
        var start = this.selection.start;
        var end = this.selection.end;
        if (!this.owner.isReadOnlyMode || this.selection.isInlineFormFillMode()) {
            if (!this.selection.isForward) {
                start = end;
            }
            if (this.selection.isEmpty) {
                this.selection.handleControlShiftLeftKey();
                this.owner.editorModule.onBackSpace();
                /* eslint-disable max-len */
            }
            else if (((isNullOrUndefined(start.paragraph.previousRenderedWidget) || start.paragraph.previousRenderedWidget instanceof TableWidget)
                && start.offset === 0)) {
                return;
            }
            else {
                this.selection.handleLeftKey();
                this.selection.handleControlShiftLeftKey();
                this.owner.editorModule.onBackSpace();
            }
        }
    };
    /**
     * Handles Ctrl delete
     *
     * @private
     * @returns {void}
     */
    Editor.prototype.handleCtrlDelete = function () {
        if ((!this.owner.isReadOnlyMode && this.canEditContentControl) || this.selection.isInlineFormFillMode()) {
            if (!this.selection.isEmpty) {
                this.selection.handleLeftKey();
                this.selection.handleControlShiftRightKey();
                var selectedText = this.selection.text;
                var checkSpace = HelperMethods.endsWith(selectedText);
                if (checkSpace) {
                    this.selection.handleShiftLeftKey();
                }
                this.owner.editorModule.delete();
            }
            else {
                this.selection.handleControlShiftRightKey();
                this.owner.editorModule.delete();
            }
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Editor.prototype.handleTextInput = function (text) {
        var _this = this;
        if (!this.owner.isReadOnlyMode && this.canEditContentControl || this.selection.isInlineFormFillMode()) {
            if (this.animationTimer) {
                clearTimeout(this.animationTimer);
            }
            classList(this.selection.caret, [], ['e-de-cursor-animation']);
            this.owner.editorModule.insertText(text);
            /* eslint-disable @typescript-eslint/indent */
            this.animationTimer = setTimeout(function () {
                if (_this.animationTimer) {
                    clearTimeout(_this.animationTimer);
                }
                if (_this.selection && _this.selection.caret) {
                    classList(_this.selection.caret, ['e-de-cursor-animation'], []);
                }
            }, 600);
        }
        this.selection.checkForCursorVisibility();
    };
    /**
     * Copies to format.
     * @param {WCharacterFormat} format
     * @private
     * @returns {void}
     */
    Editor.prototype.copyInsertFormat = function (format, copy) {
        var insertFormat = new WCharacterFormat();
        var sFormat = this.selection.characterFormat;
        if (copy) {
            insertFormat.copyFormat(format);
        }
        if (!isNullOrUndefined(sFormat.bidi) && format.bidi !== sFormat.bidi) {
            insertFormat.bidi = sFormat.bidi;
        }
        if (!isNullOrUndefined(sFormat.bold) && format.bold !== sFormat.bold) {
            insertFormat.bold = sFormat.bold;
        }
        if (!isNullOrUndefined(sFormat.italic) && format.italic !== sFormat.italic) {
            insertFormat.italic = sFormat.italic;
        }
        if (sFormat.fontSize > 0 && format.fontSize !== sFormat.fontSize) {
            insertFormat.fontSize = sFormat.fontSize;
        }
        if (!isNullOrUndefined(sFormat.fontFamily) && format.fontFamily !== sFormat.fontFamily) {
            insertFormat.fontFamily = sFormat.fontFamily;
        }
        if (!isNullOrUndefined(sFormat.highlightColor) && format.highlightColor !== sFormat.highlightColor) {
            insertFormat.highlightColor = sFormat.highlightColor;
        }
        if (!isNullOrUndefined(sFormat.baselineAlignment) && format.baselineAlignment !== sFormat.baselineAlignment) {
            insertFormat.baselineAlignment = sFormat.baselineAlignment;
        }
        if (!isNullOrUndefined(sFormat.fontColor) && format.fontColor !== sFormat.fontColor) {
            insertFormat.fontColor = sFormat.fontColor;
        }
        if (!isNullOrUndefined(sFormat.underline) && format.underline !== sFormat.underline) {
            insertFormat.underline = sFormat.underline;
        }
        if (!isNullOrUndefined(sFormat.strikethrough) && format.strikethrough !== sFormat.strikethrough) {
            insertFormat.strikethrough = sFormat.strikethrough;
        }
        return insertFormat;
    };
    Editor.prototype.getResultContentControlText = function (element) {
        var ele = element.nextNode;
        var text = '';
        while (!(ele instanceof ContentControl)) {
            if (ele instanceof TextElementBox) {
                text += ele.text;
            }
            if (isNullOrUndefined(ele)) {
                break;
            }
            if (isNullOrUndefined(ele.nextNode)) {
                if (ele.paragraph.nextRenderedWidget) {
                    ele = ele.paragraph.nextRenderedWidget.firstChild.children[0];
                }
                else {
                    break;
                }
            }
            else {
                ele = ele.nextNode;
            }
        }
        return text;
    };
    Editor.prototype.updateXmlMappedContentControl = function () {
        if (this.isXmlMapped) {
            var startInlineEle = this.getContentControl();
            if (startInlineEle && startInlineEle.contentControlProperties) {
                this.updateCustomXml(startInlineEle.contentControlProperties.xmlMapping.storeItemId, startInlineEle.contentControlProperties.xmlMapping.xPath, this.getResultContentControlText(startInlineEle));
            }
        }
    };
    Editor.prototype.updateCustomXml = function (itemId, xPath, text) {
        if (this.documentHelper.customXmlData.containsKey(itemId)) {
            var xml = this.documentHelper.customXmlData.get(itemId);
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(xml, 'text/xml');
            var lastText = xPath.substring(xPath.lastIndexOf('/') + 1);
            lastText = lastText.split('[')[0];
            lastText = lastText.substring(lastText.lastIndexOf(':') + 1);
            lastText = lastText.substring(lastText.lastIndexOf('@') + 1);
            var htmlCollec = xmlDoc.getElementsByTagName(lastText);
            if (htmlCollec.length > 0) {
                htmlCollec[0].childNodes[0].nodeValue = text;
            }
            else if (xmlDoc.documentElement.attributes.length > 0 && xmlDoc.documentElement.attributes.getNamedItem(lastText) !== null) {
                xmlDoc.documentElement.attributes.getNamedItem(lastText).value = text;
            }
            else {
                return;
            }
            var newXml = new XMLSerializer();
            var xmlString = newXml.serializeToString(xmlDoc);
            this.documentHelper.customXmlData.set(itemId, xmlString);
        }
    };
    /**
     * Inserts the specified text at cursor position
     * @param {string} text Specify the text to insert.
     */
    Editor.prototype.insertText = function (text) {
        if (isNullOrUndefined(text) || text === ''
            || this.owner.isReadOnly
            || this.documentHelper.protectionType === 'ReadOnly' && !this.selection.isSelectionInEditRegion()
            || this.documentHelper.protectionType === 'CommentsOnly') {
            return;
        }
        text = HelperMethods.sanitizeString(text);
        this.insertTextInternal(text, false);
    };
    /**
     * @private
     * @returns {void}
     */
    /* eslint-disable  */
    Editor.prototype.insertTextInternal = function (text, isReplace, revisionType, allowLayout) {
        if (text.indexOf('\r') >= 0 || text.indexOf('\n') >= 0) {
            if (text === '\r' || text === '\n' || text === '\r\n') {
                this.onEnter();
            }
            else {
                this.isInsertText = true;
                this.pasteContents(text);
                this.isInsertText = false;
            }
            return;
        }
        if (this.documentHelper.protectionType === 'FormFieldsOnly' && this.selection.isInlineFormFillMode()) {
            var inline = this.selection.currentFormField;
            if (!inline.formFieldData.enabled) {
                return;
            }
            var resultText = this.getFieldResultText(inline);
            var rex = new RegExp(this.owner.documentHelper.textHelper.getEnSpaceCharacter(), 'gi');
            if (resultText.length > 0 && resultText.replace(rex, '') === '') {
                resultText = '';
                this.documentHelper.isTextFormEmpty = true;
                this.selection.selectFieldInternal(inline);
            }
            var maxLength = inline.formFieldData.maxLength;
            if (maxLength !== 0 && resultText.length >= maxLength) {
                this.documentHelper.isTextFormEmpty = false;
                return;
            }
        }
        if (isReplace) {
            this.documentHelper.layout.isReplaceAll = !isNullOrUndefined(allowLayout) ? !allowLayout : false;
        }
        var selection = this.documentHelper.selection;
        var insertPosition;
        var isRemoved = true;
        revisionType = (this.owner.enableTrackChanges && isNullOrUndefined(revisionType)) ? 'Insertion' : revisionType;
        var commentStarts = this.checkAndRemoveComments();
        this.isListTextSelected();
        if (selection.bookmarks.length > 0) {
            this.extendSelectionToBookmarkStart();
        }
        if (isNullOrUndefined(revisionType) || revisionType === 'Insertion') {
            this.initHistory('Insert');
        }
        var paragraphInfo = this.selection.getParagraphInfo(selection.start);
        var paraFormat = paragraphInfo.paragraph.paragraphFormat;
        selection.editPosition = selection.getHierarchicalIndex(paragraphInfo.paragraph, paragraphInfo.offset.toString());
        var bidi = selection.start.paragraph.paragraphFormat.bidi;
        if ((!selection.isEmpty && !selection.isImageSelected) ||
            this.documentHelper.isListTextSelected && selection.contextType === 'List') {
            selection.isSkipLayouting = true;
            selection.skipFormatRetrieval = true;
            var endPosition = undefined;
            var endParagraphInfo = undefined;
            var endOffset = 0;
            var paragraphLength = 0;
            if (this.owner.enableTrackChanges) {
                if (!this.selection.start.isExistBefore(this.selection.end)) {
                    endParagraphInfo = this.selection.getParagraphInfo(selection.start);
                    endPosition = this.selection.start.clone();
                }
                else {
                    endParagraphInfo = this.selection.getParagraphInfo(selection.end);
                    endPosition = this.selection.end.clone();
                }
                paragraphLength = endParagraphInfo.paragraph.getLength();
                endOffset = endParagraphInfo.offset;
                this.skipReplace = true;
            }
            isRemoved = this.removeSelectedContents(selection);
            this.skipReplace = false;
            if (!isNullOrUndefined(endPosition) && this.owner.search && this.owner.search.isRepalceTracking) {
                this.owner.search.isRepalceTracking = false;
                this.selection.start.setPositionInternal(this.selection.start);
                this.selection.end.setPositionInternal(endPosition);
            }
            else if (endOffset > 0) {
                var updatedParagraphLength = endParagraphInfo.paragraph.getLength();
                if (paragraphLength !== updatedParagraphLength) {
                    endOffset -= paragraphLength - updatedParagraphLength;
                }
                this.setPositionParagraph(endParagraphInfo.paragraph, endOffset, true);
            }
            selection.skipFormatRetrieval = false;
            selection.isSkipLayouting = false;
        }
        else if (selection.isEmpty && !this.documentHelper.isListTextSelected && !isReplace) {
            this.documentHelper.isTextInput = true;
        }
        paragraphInfo = this.selection.getParagraphInfo(selection.start);
        paragraphInfo.paragraph.paragraphFormat.copyFormat(paraFormat);
        var isSpecialChars = this.documentHelper.textHelper.containsSpecialCharAlone(text);
        if (isRemoved) {
            selection.owner.isShiftingEnabled = true;
            this.updateInsertPosition();
            insertPosition = selection.start;
            if (insertPosition.paragraph.isEmpty()) {
                var span = new TextElementBox();
                var insertFormat = this.copyInsertFormat(insertPosition.paragraph.characterFormat, true);
                span.characterFormat.copyFormat(insertFormat);
                span.text = text;
                var isBidi = this.documentHelper.textHelper.getRtlLanguage(text).isRtl || this.selection.characterFormat.bidi;
                span.characterFormat.bidi = isBidi;
                span.isRightToLeft = isBidi;
                span.line = insertPosition.paragraph.childWidgets[0];
                span.margin = new Margin(0, 0, 0, 0);
                span.line.children.push(span);
                if (this.owner.enableTrackChanges) {
                    if (span.paragraph.characterFormat.revisions.length > 0) {
                        var matchedRevisions = this.getMatchedRevisionsToCombine(span.paragraph.characterFormat.revisions, revisionType);
                        if (matchedRevisions.length > 0) {
                            this.mapMatchedRevisions(matchedRevisions, span.paragraph.characterFormat, span, true);
                        }
                    }
                    else if (!this.checkToCombineRevisionWithPrevPara(span, revisionType)) {
                        this.insertRevision(span, revisionType);
                    }
                }
                if ((insertPosition.paragraph.paragraphFormat.textAlignment === 'Center'
                    || insertPosition.paragraph.paragraphFormat.textAlignment === 'Right') &&
                    insertPosition.paragraph.paragraphFormat.listFormat.listId === -1) {
                    insertPosition.paragraph.x = this.owner.viewer.clientActiveArea.x;
                }
                this.documentHelper.layout.reLayoutParagraph(insertPosition.paragraph, 0, 0);
            }
            else {
                var indexInInline = 0;
                var inlineObj = insertPosition.currentWidget.getInline(insertPosition.offset, indexInInline, bidi, (isReplace) ? false : true);
                var inline = inlineObj.element;
                indexInInline = inlineObj.index;
                inline.ischangeDetected = true;
                if (inline instanceof TextElementBox && text !== ' ' && this.documentHelper.owner.isSpellCheck) {
                    this.owner.spellChecker.removeErrorsFromCollection({ 'element': inline, 'text': inline.text });
                    if (!isReplace) {
                        inline.ignoreOnceItems = [];
                    }
                }
                if (inline.canTrigger && inline.text.length <= 1) {
                    inline.canTrigger = false;
                }
                // Todo: compare selection format
                var insertFormat = this.copyInsertFormat(inline.characterFormat, true);
                var isBidi = this.documentHelper.textHelper.getRtlLanguage(text).isRtl || this.selection.characterFormat.bidi;
                var insertLangId = this.documentHelper.textHelper.getRtlLanguage(text).id;
                var inlineLangId = 0;
                var isRtl = false;
                var isInlineContainsSpecChar = false;
                var isTextContainsSpecChar = false;
                if (inline instanceof TextElementBox) {
                    inlineLangId = this.documentHelper.textHelper.getRtlLanguage(inline.text).id;
                    isRtl = this.documentHelper.textHelper.getRtlLanguage(inline.text).isRtl;
                    isTextContainsSpecChar = this.documentHelper.textHelper.containsSpecialCharAlone(text);
                }
                if ((!isBidi && inline.characterFormat.bidi && (inlineLangId !== 0 || (isTextContainsSpecChar && isRtl)))
                    || (text === ' ' && this.selection.characterFormat.bidi)) {
                    isBidi = true;
                }
                if (isBidi || !this.documentHelper.owner.isSpellCheck) {
                    insertFormat.bidi = isBidi;
                }
                if ((!this.documentHelper.owner.isSpellCheck || (text !== ' ' && inline.text !== ' ')) && insertFormat.isSameFormat(inline.characterFormat) && this.canInsertRevision(inline, revisionType)
                    || (text.trim() === '' && !isBidi && inline.characterFormat.bidi) || isRtl && insertFormat.isSameFormat(inline.characterFormat) && isSpecialChars) {
                    this.insertTextInline(inline, selection, text, indexInInline);
                }
                else {
                    var tempSpan = new TextElementBox();
                    tempSpan.text = text;
                    tempSpan.line = inline.line;
                    tempSpan.isRightToLeft = isRtl;
                    tempSpan.characterFormat.copyFormat(insertFormat);
                    if (inline instanceof FootnoteElementBox) {
                        tempSpan.characterFormat.baselineAlignment = 'Normal';
                    }
                    var isRevisionCombined = false;
                    var insertIndex = inline.indexInOwner;
                    var prevRevisionCount = tempSpan.revisions.length;
                    if (indexInInline === inline.length) {
                        var index = -1;
                        index = insertIndex + 1;
                        if (this.owner.enableTrackChanges && !(inline instanceof BookmarkElementBox)) {
                            isRevisionCombined = this.checkToMapRevisionWithInlineText(inline, indexInInline, tempSpan, isBidi, revisionType);
                            if (!isRevisionCombined && tempSpan.revisions.length === prevRevisionCount) {
                                if (inline.nextNode != undefined && inline.nextNode.revisions.length == 1) {
                                    isRevisionCombined = this.checkToMapRevisionWithNextNode(inline.nextNode, tempSpan, isBidi, revisionType);
                                }
                                else if (inline.paragraph.characterFormat.revisions.length == 1 && inline.paragraph.characterFormat.revisions[0].revisionType == 'Deletion') {
                                    isRevisionCombined = this.checkToMapRevisionWithNextNode(inline.nextNode, tempSpan, isBidi, revisionType, inline.paragraph);
                                }
                                else {
                                    isRevisionCombined = this.checkToMapRevisionWithNextNode(inline.nextNode, tempSpan, isBidi, revisionType);
                                }
                            }
                        }
                        if (!isRevisionCombined) {
                            inline.line.children.splice(index, 0, tempSpan);
                            this.checkToCombineRevisionsinBlocks(tempSpan, prevRevisionCount === tempSpan.revisions.length, true, revisionType);
                        }
                    }
                    else if (indexInInline === 0) {
                        if (this.owner.enableTrackChanges) {
                            isRevisionCombined = this.checkToMapRevisionWithInlineText(inline, indexInInline, tempSpan, isBidi, revisionType);
                            if (!isRevisionCombined && tempSpan.revisions.length === 0) {
                                this.checkToMapRevisionWithPreviousNode(inline.previousNode, tempSpan, isBidi, revisionType);
                            }
                        }
                        if (!isRevisionCombined) {
                            inline.line.children.splice(insertIndex, 0, tempSpan);
                            this.checkToCombineRevisionsinBlocks(tempSpan, prevRevisionCount === tempSpan.revisions.length, true, revisionType);
                        }
                    }
                    else {
                        if (inline instanceof TextElementBox) {
                            var splittedSpan = new TextElementBox();
                            splittedSpan.line = inline.line;
                            splittedSpan.characterFormat.copyFormat(inline.characterFormat);
                            splittedSpan.text = inline.text.substring(indexInInline);
                            if (!this.owner.enableTrackChanges && !this.selection.isInField) {
                                this.updateRevisionForSpittedTextElement(inline, splittedSpan);
                            }
                            inline.text = inline.text.slice(0, indexInInline);
                            if (this.owner.enableTrackChanges) {
                                isRevisionCombined = this.checkToMapRevisionWithInlineText(inline, indexInInline, tempSpan, isBidi, revisionType);
                                if (isRevisionCombined || tempSpan.revisions.length > prevRevisionCount) {
                                    this.copyElementRevision(inline, splittedSpan, true);
                                }
                                else if (tempSpan.revisions.length === prevRevisionCount) {
                                    this.updateRevisionForSpittedTextElement(inline, splittedSpan);
                                    this.insertRevision(tempSpan, revisionType);
                                }
                            }
                            else if (this.selection.isInField) {
                                this.copyElementRevision(inline, splittedSpan, false);
                                this.updateElementInFieldRevision(inline, tempSpan, inline.revisions, true);
                            }
                            if (this.owner.isSpellCheck) {
                                this.owner.spellChecker.updateSplittedElementError(inline, splittedSpan);
                            }
                            inline.line.children.splice(insertIndex + 1, 0, splittedSpan);
                        }
                        if (!isRevisionCombined) {
                            inline.line.children.splice(insertIndex + 1, 0, tempSpan);
                        }
                    }
                    this.documentHelper.layout.reLayoutParagraph(insertPosition.paragraph, inline.line.indexInOwner, 0);
                }
            }
            this.documentHelper.layout.allowLayout = true;
            this.setPositionParagraph(paragraphInfo.paragraph, paragraphInfo.offset + text.length, true);
            this.updateEndPosition();
            if (!isNullOrUndefined(this.editorHistory) && !isNullOrUndefined(this.editorHistory.currentHistoryInfo)
                && (this.editorHistory.currentHistoryInfo.action === 'ListSelect') &&
                this.documentHelper.isListTextSelected) {
                this.editorHistory.updateHistory();
                this.editorHistory.updateComplexHistory();
            }
            if (isNullOrUndefined(revisionType) || revisionType === 'Insertion') {
                this.reLayout(selection);
            }
            this.documentHelper.isTextInput = false;
            this.documentHelper.isTextFormEmpty = false;
        }
        this.updateXmlMappedContentControl();
        if (!isReplace && isRemoved && (text === ' ' || text === '\t' || text === '\v')) {
            var isList = false;
            if (!(text === '\v')) {
                isList = this.checkAndConvertList(selection, text === '\t');
            }
            if (!isList) {
                if (!isNullOrUndefined(selection.getHyperlinkField())) {
                    return;
                }
                //Checks if the previous text is URL, then it is auto formatted to hyperlink.
                this.checkAndConvertToHyperlink(selection, false);
            }
        }
        this.updateHistoryForComments(commentStarts);
    };
    Editor.prototype.extendSelectionToBookmarkStart = function () {
        if (this.documentHelper.bookmarks.length > 0) {
            var startPos = this.selection.start;
            var endPos = this.selection.end;
            if (!this.selection.isForward) {
                startPos = this.selection.end;
                endPos = this.selection.start;
            }
            var bookMark = void 0;
            var selectionBookmark = this.selection.bookmarks;
            for (var i = 0; i < selectionBookmark.length; i++) {
                bookMark = this.documentHelper.bookmarks.get(selectionBookmark[i]);
                if (this.selection.isElementInSelection(bookMark.reference, false) &&
                    !this.selection.isElementInSelection(bookMark, true)) {
                    var bookmarkPargraph = bookMark.line.paragraph;
                    var selectionParagraphInfo = this.selection.getParagraphInfo(startPos);
                    if (bookmarkPargraph.equals(selectionParagraphInfo.paragraph)) {
                        var elementOffset = bookMark.line.getOffset(bookMark, bookMark.bookmarkType);
                        if (bookMark.line === startPos.currentWidget && selectionParagraphInfo.offset === elementOffset + 1) {
                            startPos.offset--;
                        }
                    }
                }
            }
        }
    };
    Editor.prototype.updateElementInFieldRevision = function (revisionElement, elementToInclude, revisions, isEnd) {
        for (var i = 0; i < revisions.length; i++) {
            var currentRevision = revisions[i];
            var rangeIndex = currentRevision.range.indexOf(revisionElement);
            currentRevision.range.splice(isEnd ? rangeIndex + 1 : rangeIndex, 0, elementToInclude);
            this.owner.trackChangesPane.updateCurrentTrackChanges(currentRevision);
        }
    };
    /**
     * Retrieves the resultant field text from the specified field element box.
     * @param item Specify the field element box to retrieve field text.
     * @returns Returns the resultant field text.
     */
    Editor.prototype.retrieveFieldResultantText = function (item) {
        var resultantText = '';
        if (item.fieldType === 1) {
            var textElement = item.previousElement;
            while (!isNullOrUndefined(textElement) && textElement instanceof TextElementBox) {
                resultantText = textElement.text + resultantText;
                textElement = (!isNullOrUndefined(textElement.previousNode)) ? textElement.previousNode.previousValidNodeForTracking : undefined;
            }
        }
        return resultantText;
    };
    Editor.prototype.checkToCombineRevisionsinBlocks = function (tempSpan, checkWidget, isEnd, revisionType) {
        if (!checkWidget || !this.owner.enableTrackChanges) {
            return;
        }
        // if (tempSpan instanceof FieldElementBox && tempSpan.fieldType === 2) {
        //     return;
        // }
        if (tempSpan instanceof BookmarkElementBox || tempSpan instanceof CommentCharacterElementBox || tempSpan instanceof EditRangeStartElementBox || tempSpan instanceof EditRangeEndElementBox) {
            return;
        }
        var isCombined = false;
        if (isEnd) {
            isCombined = this.combineRevisionWithNextPara(tempSpan, revisionType);
        }
        else {
            isCombined = this.combineRevisionWithPrevPara(tempSpan, revisionType);
        }
        if (!isCombined) {
            this.insertRevision(tempSpan, revisionType);
        }
    };
    Editor.prototype.checkToMapRevisionWithNextNode = function (inline, tempSpan, isBidi, revisionType, inlinePara) {
        if (!isNullOrUndefined(inlinePara) && inlinePara.characterFormat.revisions.length == 1) {
            var nextElementPara = inlinePara.characterFormat;
            if (!isNullOrUndefined(nextElementPara)) {
                return this.checkToMapRevisionWithInlineText(undefined, 0, tempSpan, isBidi, revisionType, nextElementPara);
            }
            return false;
        }
        if (isNullOrUndefined(inline)) {
            return false;
        }
        var nextElement = inline.nextValidNodeForTracking;
        if (!isNullOrUndefined(nextElement)) {
            return this.checkToMapRevisionWithInlineText(nextElement, 0, tempSpan, isBidi, revisionType);
        }
        return false;
    };
    Editor.prototype.checkToMapRevisionWithPreviousNode = function (inline, tempSpan, isBidi, revisionType) {
        if (isNullOrUndefined(inline)) {
            return false;
        }
        var prevElement = inline.previousValidNodeForTracking;
        if (!isNullOrUndefined(prevElement)) {
            return this.checkToMapRevisionWithInlineText(prevElement, prevElement.length, tempSpan, isBidi, revisionType);
        }
        return false;
    };
    Editor.prototype.checkToMapRevisionWithInlineText = function (inline, indexInInline, newElement, isBidi, revisionType, inlinePara) {
        if (!isNullOrUndefined(inlinePara)) {
            if (revisionType === 'Deletion') {
                this.updateLastElementRevision(newElement);
            }
            if (!isNullOrUndefined(inlinePara) && inlinePara.revisions.length > 0) {
                return this.applyMatchedRevisionInorder(undefined, newElement, indexInInline, true, isBidi, revisionType, inlinePara);
            }
        }
        else if (!isNullOrUndefined(inline)) {
            if (revisionType === 'Deletion') {
                this.updateLastElementRevision(newElement);
            }
            if (inline.length === indexInInline && inline.previousValidNodeForTracking != undefined) {
                inline = inline.previousValidNodeForTracking;
                indexInInline = inline.length;
                if (inline.revisions.length > 0) {
                    return this.applyMatchedRevisionInorder(inline, newElement, indexInInline, false, isBidi, revisionType);
                }
            }
            else if (indexInInline === 0) {
                inline = inline.nextValidNodeForTracking;
                if (!isNullOrUndefined(inline) && inline.revisions.length > 0) {
                    return this.applyMatchedRevisionInorder(inline, newElement, indexInInline, true, isBidi, revisionType);
                }
            }
        }
        return false;
    };
    Editor.prototype.combineElementRevisions = function (inline, elementToCombine) {
        if (inline.revisions.length === 0 || elementToCombine.revisions.length === 0) {
            return;
        }
        for (var i = 0; i < inline.revisions.length; i++) {
            var prevRevision = inline.revisions[i];
            for (var j = 0; j < elementToCombine.revisions.length; j++) {
                var currentRevision = elementToCombine.revisions[i];
                if (prevRevision.range.indexOf(elementToCombine) === -1 && currentRevision.revisionType === prevRevision.revisionType && currentRevision.author === prevRevision.author) {
                    elementToCombine.revisions.splice(j, 1);
                    prevRevision.range.push(elementToCombine);
                    elementToCombine.revisions.splice(j, 0, prevRevision);
                    this.owner.trackChangesPane.updateCurrentTrackChanges(prevRevision);
                }
            }
        }
    };
    Editor.prototype.applyMatchedRevisionInorder = function (inline, newElement, indexInInline, isBegin, isBidi, revisionType, inlinePara) {
        var revisionsMatched;
        if (!isNullOrUndefined(inlinePara) && isNullOrUndefined(inline)) {
            revisionsMatched = this.getMatchedRevisionsToCombine(inlinePara.revisions, revisionType);
            if (revisionsMatched.length > 0) {
                this.mapMatchedRevisions(revisionsMatched, inlinePara, newElement, isBegin);
            }
            return false;
        }
        else {
            revisionsMatched = this.getMatchedRevisionsToCombine(inline.revisions, revisionType);
            if (revisionsMatched.length > 0) {
                this.mapMatchedRevisions(revisionsMatched, inline, newElement, isBegin);
            }
            return false;
        }
    };
    Editor.prototype.copyElementRevision = function (elementToCopy, elementToInclude, isSplitElementMerged) {
        if (!this.isTrackingFormField) {
            for (var i = 0; i < elementToCopy.revisions.length; i++) {
                var currentRevision = elementToCopy.revisions[i];
                var rangeIndex = currentRevision.range.indexOf(elementToCopy);
                elementToInclude.revisions.splice(0, 0, currentRevision);
                currentRevision.range.splice(rangeIndex + ((isSplitElementMerged) ? 2 : 1), 0, elementToInclude);
                this.owner.trackChangesPane.updateCurrentTrackChanges(currentRevision);
            }
        }
    };
    /* eslint-disable @typescript-eslint/no-explicit-any */
    Editor.prototype.mapMatchedRevisions = function (revisions, revisionElement, elementToInclude, isBegin) {
        for (var i = 0; i < revisions.length; i++) {
            var currentRevision = revisions[i];
            if (!this.isRevisionAlreadyIn(elementToInclude, currentRevision) || elementToInclude instanceof WCharacterFormat) {
                elementToInclude.revisions.splice(0, 0, currentRevision);
                if (elementToInclude instanceof FootnoteElementBox) {
                    this.insertRevisionForFootnoteWidget(elementToInclude, currentRevision);
                }
                var rangeIndex = currentRevision.range.indexOf(revisionElement);
                currentRevision.range.splice((isBegin) ? rangeIndex : rangeIndex + 1, 0, elementToInclude);
                this.owner.trackChangesPane.updateCurrentTrackChanges(currentRevision);
            }
        }
    };
    Editor.prototype.isRevisionAlreadyIn = function (element, revision) {
        if (element.revisions.length > 0) {
            for (var i = 0; i < element.revisions.length; i++) {
                var elementRevision = element.revisions[i];
                if (elementRevision.revisionID === revision.revisionID) {
                    return true;
                }
            }
        }
        return false;
    };
    Editor.prototype.getMatchedRevisionsToCombine = function (revisions, revisionType) {
        var matchedRevisions = [];
        for (var i = 0; i < revisions.length; i++) {
            if (this.isRevisionMatched(revisions[i], revisionType)) {
                matchedRevisions.push(revisions[i]);
            }
        }
        return matchedRevisions;
    };
    Editor.prototype.decideInlineForTrackChanges = function (inline, revisionType) {
        var matched = false;
        if (this.owner.enableTrackChanges && !this.canInsertRevision(inline, revisionType)) {
            var currentElement = inline.nextValidNodeForTracking;
            if (!isNullOrUndefined(currentElement) && this.canInsertRevision(currentElement, revisionType)) {
                inline = currentElement;
                matched = true;
            }
        }
        return { 'element': inline, 'isMatched': matched };
    };
    /**
     * @private
     * @returns {void}
     */
    Editor.prototype.insertIMEText = function (text, isUpdate) {
        if (this.documentHelper.lastComposedText === text && isUpdate) {
            return;
        }
        // Clone selection start position
        var paragraphInfo = this.selection.getParagraphInfo(this.selection.start);
        var startPosition = this.selection.getHierarchicalIndex(paragraphInfo.paragraph, paragraphInfo.offset.toString());
        // Insert IME text in current selection
        this.insertText(text);
        this.documentHelper.lastComposedText = text;
        // update selection start
        var start = this.selection.start;
        this.setPositionForCurrentIndex(start, startPosition);
        // Update selection end
        var endPosition = new TextPosition(this.owner);
        endPosition.setPositionForLineWidget(start.currentWidget, start.offset + text.length);
        if (this.owner.enableTrackChanges) {
            if (!isUpdate) {
                this.selection.start.setPositionInternal(this.selection.end);
            }
            this.selection.end.updatePhysicalPosition(true);
        }
        else {
            this.selection.selectPosition(isUpdate ? start : endPosition, endPosition);
        }
    };
    /**
      * Inserts the section break at cursor position with specified section break type.
      *
      * @param {SectionBreakType} sectionBreakType Specifies the section break type.
      * > If this parameter is not set, it inserts the section break of type new page.
      * @returns {void}
      */
    Editor.prototype.insertSectionBreak = function (sectionBreakType) {
        if (isNullOrUndefined(sectionBreakType)) {
            sectionBreakType = SectionBreakType.NewPage;
        }
        var selection = this.documentHelper.selection;
        if (isNullOrUndefined(selection) || this.owner.isReadOnlyMode || selection.start.paragraph.isInHeaderFooter) {
            return;
        }
        if (sectionBreakType === SectionBreakType.Continuous) {
            this.initHistory('SectionBreakContinuous');
        }
        else {
            this.initHistory('SectionBreak');
        }
        if (!selection.isEmpty) {
            selection.selectContent(selection.isForward ? selection.start : selection.end, true);
        }
        this.documentHelper.owner.isShiftingEnabled = true;
        this.updateInsertPosition();
        if (sectionBreakType === SectionBreakType.Continuous) {
            this.insertSection(selection, true, undefined, true);
        }
        else {
            this.insertSection(selection, true, undefined, undefined, true);
        }
        this.updateEndPosition();
        this.reLayout(selection, true);
        //if (this.owner.layoutType === 'Continuous') {
        this.layoutWholeDocument(true);
        //} 
    };
    Editor.prototype.combineRevisionWithBlocks = function (elementBox, revisionType) {
        if (!this.owner.enableTrackChanges || isNullOrUndefined(elementBox)) {
            return;
        }
        while (elementBox instanceof BookmarkElementBox || elementBox instanceof CommentCharacterElementBox) {
            elementBox = elementBox.nextElement;
        }
        if (isNullOrUndefined(elementBox)) {
            return;
        }
        var prevPara = elementBox.paragraph.previousRenderedWidget;
        if (prevPara instanceof TableWidget) {
            return;
        }
        var isNew = true;
        if (!isNullOrUndefined(prevPara) && !prevPara.isEmpty() && prevPara.characterFormat.revisions.length > 0) {
            var lastLine_1 = prevPara.lastChild;
            if (isNullOrUndefined(lastLine_1) || lastLine_1.children.length === 0) {
                return;
            }
            var lastElement_1 = lastLine_1.children[lastLine_1.children.length - 1];
            while (lastElement_1 instanceof BookmarkElementBox || lastElement_1 instanceof CommentCharacterElementBox) {
                lastElement_1 = lastElement_1.previousElement;
            }
            if (lastElement_1.revisions.length > 0) {
                if (this.compareElementRevision(prevPara.characterFormat, elementBox)) {
                    var currentRevision = elementBox.revisions[elementBox.revisions.length - 1];
                    if (this.compareElementRevision(lastElement_1, elementBox)) {
                        var lastElementRevision = lastElement_1.revisions[lastElement_1.revisions.length - 1];
                        isNew = false;
                        if (currentRevision !== lastElementRevision) {
                            this.clearAndUpdateRevisons(currentRevision.range, lastElementRevision, lastElementRevision.range.indexOf(lastElement_1) + 1);
                        }
                    }
                }
            }
        }
        prevPara = null;
        var lastLine = elementBox.paragraph.lastChild;
        var lastElement = lastLine.children[lastLine.children.length - 1];
        elementBox = lastElement == undefined ? elementBox : lastElement;
        var nextPara = elementBox.paragraph.nextRenderedWidget;
        if (nextPara instanceof TableWidget) {
            return;
        }
        if (!isNullOrUndefined(nextPara) && !nextPara.isEmpty() && elementBox.paragraph.characterFormat.revisions.length > 0) {
            // let lastLine: LineWidget = elementBox.paragraph.lastChild as LineWidget;
            // let lastElement: ElementBox = lastLine.children[lastLine.children.length - 1];
            var firstLine = nextPara.firstChild;
            var firstElement = firstLine.children[0];
            while (firstElement instanceof BookmarkElementBox || firstElement instanceof CommentCharacterElementBox) {
                firstElement = firstElement.previousElement;
            }
            if (isNullOrUndefined(firstElement)) {
                return;
            }
            if (firstElement.revisions.length > 0) {
                var firstEleRevision = firstElement.revisions[firstElement.revisions.length - 1];
                if (this.compareElementRevision(elementBox.paragraph.characterFormat, firstElement)) {
                    if (this.compareElementRevision(elementBox, firstElement)) {
                        var lastElementRevision = elementBox.revisions[elementBox.revisions.length - 1];
                        isNew = false;
                        if (firstEleRevision !== lastElementRevision) {
                            this.clearAndUpdateRevisons(firstEleRevision.range, lastElementRevision, lastElementRevision.range.indexOf(elementBox) + 1);
                        }
                    }
                }
            }
        }
        if (elementBox.revisions.length === 0) {
            this.insertRevision(elementBox, revisionType);
        }
    };
    Editor.prototype.checkToCombineRevisionWithNextPara = function (elementBox, revisionType) {
        var nextPara = elementBox.paragraph.nextRenderedWidget;
        if (nextPara instanceof TableWidget) {
            return false;
        }
        if (!isNullOrUndefined(nextPara) && !nextPara.isEmpty()) {
            var firstLine = nextPara.firstChild;
            var firstElement = firstLine.children[0];
            while (firstElement instanceof BookmarkElementBox || firstElement instanceof CommentCharacterElementBox) {
                firstElement = firstElement.previousElement;
            }
            if (isNullOrUndefined(firstElement)) {
                return false;
            }
            if (firstElement.revisions.length > 0) {
                var mappedRevisions = this.getMatchedRevisionsToCombine(firstElement.revisions, revisionType);
                if (mappedRevisions.length > 0) {
                    this.mapMatchedRevisions(mappedRevisions, firstElement, elementBox, true);
                    return true;
                }
            }
        }
        return false;
    };
    Editor.prototype.checkToCombineRevisionWithPrevPara = function (elementBox, revisionType) {
        var prevPara = elementBox.paragraph.previousRenderedWidget;
        if (prevPara instanceof TableWidget) {
            return false;
        }
        if (!isNullOrUndefined(prevPara) && prevPara.characterFormat.revisions.length > 0) {
            if (!this.isRevisionMatched(prevPara.characterFormat, revisionType)) {
                return false;
            }
            // let firstLine: LineWidget = prevPara.firstChild as LineWidget;
            // let lastLine: LineWidget = prevPara.lastChild as LineWidget;
            // if (isNullOrUndefined(lastLine) || lastLine.children.length === 0) {
            //     return false;
            // }
            // let lastElement: ElementBox = lastLine.children[lastLine.children.length - 1];
            // if (lastElement instanceof BookmarkElementBox || lastElement instanceof CommentCharacterElementBox) {
            //     lastElement = lastElement.previousValidNodeForTracking;
            // }
            // if (isNullOrUndefined(lastElement)) {
            //     return false;
            // }
            // if (lastElement.revisions.length > 0) {
            var mappedRevisions = this.getMatchedRevisionsToCombine(prevPara.characterFormat.revisions, revisionType);
            if (mappedRevisions.length > 0) {
                this.mapMatchedRevisions(mappedRevisions, prevPara.characterFormat, elementBox, false);
                return true;
            }
            // }
        }
        return false;
    };
    Editor.prototype.combineRevisionWithNextPara = function (elementBox, revisionType) {
        var isLastLine = elementBox.line.isLastLine();
        var nextElement = elementBox.nextNode;
        if (isLastLine && isNullOrUndefined(nextElement)) {
            return this.checkToCombineRevisionWithNextPara(elementBox, revisionType);
        }
        return false;
    };
    Editor.prototype.combineRevisionWithPrevPara = function (elementBox, revisionType) {
        var isFirstLine = elementBox.line.isFirstLine();
        var prevElement = elementBox.previousNode;
        if (isFirstLine && isNullOrUndefined(prevElement)) {
            return this.checkToCombineRevisionWithPrevPara(elementBox, revisionType);
        }
        return false;
    };
    /**
     * Removes the specified revision from the document.
     *
     * @param revisionToRemove Specify the revision to be removed.
     * @returns {void}
     */
    Editor.prototype.removeRevision = function (revisionToRemove) {
        var elementInfo = this.selection.start.currentWidget.getInline(this.selection.start.offset + 1, 0);
        var elementBox = elementInfo.element;
        if (elementInfo.element.revisions.length > 0) {
            for (var i = 0; i < elementBox.revisions.length; i++) {
                if (elementBox.revisions[i].revisionType === revisionToRemove.revisionType) {
                    var revision = elementBox.revisions[i];
                    var startIndex = revision.range.indexOf(elementBox);
                    for (var j = startIndex; startIndex < revision.range.length; startIndex++) {
                        revision.range[j].revisions.splice(i, 1);
                        revision.range.splice(j, 1);
                        this.owner.trackChangesPane.updateCurrentTrackChanges(revision);
                    }
                }
            }
        }
    };
    /**
     * Clears the specified revision from the document.
     *
     * @param revision Specify the revision to clear from the document.
     * @returns {void}
     */
    Editor.prototype.clearElementRevision = function (revision) {
        if (isNullOrUndefined(revision)) {
            return;
        }
        for (var i = 0; i < revision.range.length; i++) {
            if (revision.range[i] instanceof ElementBox) {
                var currentElement = revision.range[i];
                currentElement.revisions.splice(currentElement.revisions.length - 1, 1);
                revision.range.splice(i, 1);
                this.owner.trackChangesPane.updateCurrentTrackChanges(revision);
            }
        }
    };
    /**
     * @private
     * @returns {void}
     */
    /* eslint-disable @typescript-eslint/no-explicit-any */
    Editor.prototype.insertRevision = function (item, type, author, date, spittedRange) {
        author = !isNullOrUndefined(author) ? author : this.owner.currentUser ? this.owner.currentUser : 'Guest user';
        var currentDate = !isNullOrUndefined(date) ? date : HelperMethods.getUtcDate();
        if (item instanceof ElementBox && !isNullOrUndefined(item.line) && item.line.paragraph.associatedCell || (item instanceof WCharacterFormat && item.ownerBase instanceof ParagraphWidget && item.ownerBase.associatedCell)) {
            var cellWidget = undefined;
            if (item instanceof ElementBox) {
                cellWidget = item.line.paragraph.associatedCell;
            }
            else if (item instanceof WCharacterFormat) {
                cellWidget = item.ownerBase.associatedCell;
            }
            if (cellWidget.ownerRow.rowFormat.revisions.length > 0) {
                var rowFormat = cellWidget.ownerRow.rowFormat;
                var matchedRevisions = this.getMatchedRevisionsToCombine(rowFormat.revisions, type);
                if (matchedRevisions.length > 0) {
                    for (var i = 0; i < matchedRevisions.length; i++) {
                        item.revisions.splice(0, 0, matchedRevisions[i]);
                        matchedRevisions[i].range.push(item);
                    }
                    return;
                }
            }
        }
        var revision = new Revision(this.owner, author, currentDate);
        revision.revisionType = type;
        revision.revisionID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        if (!isNullOrUndefined(spittedRange) && spittedRange.length > 0) {
            this.clearAndUpdateRevisons(spittedRange, revision, spittedRange.indexOf(item));
        }
        if (!isNullOrUndefined(item)) {
            if (item instanceof FootnoteElementBox) {
                this.insertRevisionForFootnoteWidget(item, revision);
            }
            item.revisions.push(revision);
            revision.range.push(item);
        }
        this.updateRevisionCollection(revision);
    };
    Editor.prototype.insertRevisionForFootnoteWidget = function (element, revision) {
        var blocks = element.bodyWidget.childWidgets;
        this.skipFootNoteDeleteTracking = true;
        for (var j = 0; j < blocks.length; j++) {
            this.insertRevisionForBlock(blocks[j], revision.revisionType, false, revision);
        }
        this.skipFootNoteDeleteTracking = false;
    };
    /**
     * Method help to clear previous revisions and include new revision at specified index
     *
     * @param range - range of elements to be cleared
     * @param revision - revision to be inserted
     * @param index - index at which to be included in the revision range
     * @returns {void}
     */
    Editor.prototype.clearAndUpdateRevisons = function (range, revision, index) {
        for (var i = 0; i < range.length; i++) {
            if (range[i] instanceof ElementBox) {
                var currentElement = range[i];
                currentElement.revisions.splice(currentElement.revisions.length - 1, 1);
                currentElement.revisions.push(revision);
                revision.range.splice(index + i, 0, currentElement);
                this.owner.trackChangesPane.updateCurrentTrackChanges(revision);
            }
        }
    };
    Editor.prototype.splitRevisionByElement = function (item, revision) {
        if (item.revisions.length > 0) {
            var range = revision.range;
            var index = range.indexOf(item);
            revision.range = range.splice(0, index + 1);
            this.owner.trackChangesPane.updateCurrentTrackChanges(revision);
            return range;
        }
        return undefined;
    };
    /**
     * Method to update revision for the splitted text element
     * @param inline - Original text element
     * @param splittedSpan - Splitted element
     */
    Editor.prototype.updateRevisionForSpittedTextElement = function (inline, splittedSpan) {
        for (var i = 0; i < inline.revisions.length; i++) {
            var revision = inline.revisions[i];
            /* eslint-disable @typescript-eslint/no-explicit-any */
            var splittedRange = this.splitRevisionByElement(inline, revision);
            this.insertRevision(splittedSpan, revision.revisionType, revision.author, revision.date, splittedRange);
        }
    };
    Editor.prototype.isRevisionMatched = function (item, type) {
        var author = this.owner.currentUser ? this.owner.currentUser : 'Guest user';
        if (item instanceof Revision) {
            if ((isNullOrUndefined(type) || type === item.revisionType) && item.author === author) {
                return true;
            }
        }
        else if (item.revisions.length > 0) {
            for (var i = 0; i < item.revisions.length; i++) {
                var elementRevision = item.revisions[i];
                if ((isNullOrUndefined(type) || type === elementRevision.revisionType) && elementRevision.author === author) {
                    return true;
                }
            }
        }
        return false;
    };
    Editor.prototype.compareElementRevision = function (element, compare) {
        if (element.revisions.length === 0 || compare.revisions.length === 0) {
            return false;
        }
        for (var i = 0; i < element.revisions.length; i++) {
            var currentRevision = element.revisions[i];
            for (var j = 0; j < compare.revisions.length; j++) {
                if (currentRevision.author === compare.revisions[j].author && currentRevision.revisionType === compare.revisions[j].revisionType) {
                    return true;
                }
            }
        }
        return false;
    };
    /* eslint-disable @typescript-eslint/no-explicit-any */
    Editor.prototype.canInsertRevision = function (item, type) {
        var revisionType = isNullOrUndefined(type) ? 'Insertion' : type;
        if (revisionType === 'Deletion') {
            return false;
        }
        if (this.owner.enableTrackChanges) {
            return this.isRevisionMatched(item, revisionType);
            //if it has revision
        }
        else if (item.revisions.length > 0) {
            return false;
        }
        return true;
    };
    Editor.prototype.insertRevisionAtEnd = function (item, newElement, revisionType) {
        if (newElement instanceof BookmarkElementBox || newElement instanceof CommentCharacterElementBox || newElement instanceof EditRangeStartElementBox || newElement instanceof EditRangeEndElementBox) {
            return false;
        }
        item = item.previousValidNodeForTracking;
        if (isNullOrUndefined(item)) {
            return false;
        }
        return this.insertRevisionAtPosition(item, newElement, true, revisionType);
    };
    Editor.prototype.insertRevisionAtPosition = function (item, newElement, isEnd, revisionType) {
        // if (newElement instanceof FieldElementBox && (newElement as FieldElementBox).fieldType === 2) {
        //     return false;
        // }
        var prevRevisionLength = newElement.revisions.length;
        var isRevisionCombined = this.checkToMapRevisionWithInlineText(item, (isEnd) ? item.length : 0, newElement, false, revisionType);
        // Check to combine with previous and next element
        if (isEnd) {
            if (!isRevisionCombined && newElement.revisions.length === prevRevisionLength) {
                isRevisionCombined = this.checkToMapRevisionWithNextNode(item.nextNode, newElement, false, revisionType);
            }
        }
        else {
            if (!isRevisionCombined && newElement.revisions.length === prevRevisionLength) {
                isRevisionCombined = this.checkToMapRevisionWithPreviousNode(item.previousNode, newElement, false, revisionType);
            }
        }
        return isRevisionCombined;
    };
    Editor.prototype.insertRevisionAtBegining = function (item, newElement, revisionType) {
        if (newElement instanceof BookmarkElementBox || newElement instanceof CommentCharacterElementBox || newElement instanceof EditRangeStartElementBox || newElement instanceof EditRangeEndElementBox) {
            return false;
        }
        item = item.nextValidNodeForTracking;
        if (isNullOrUndefined(item)) {
            return false;
        }
        return this.insertRevisionAtPosition(item, newElement, false, revisionType);
    };
    Editor.prototype.splitRevisionForSpittedElement = function (element, spittedElement) {
        for (var i = element.revisions.length - 1; i >= 0; i--) {
            var revision = element.revisions[i];
            var splittedRange = this.splitRevisionByElement(element, revision);
            this.insertRevision(spittedElement, revision.revisionType, revision.author, revision.date, splittedRange);
        }
    };
    /**
     * Method to combine element revision if not inserts new revision
     */
    // private checkToCombineRevision(element: ElementBox, newElement: ElementBox, revisionType: RevisionType): boolean {
    //     let isCombined: boolean = false;
    //     if (this.isRevisionMatched(element, revisionType)) {
    //         isCombined = true;
    //         this.combineElementRevision(element, newElement, true);
    //     } else {
    //         this.insertRevision(newElement, revisionType);
    //     }
    //     return isCombined;
    // }
    Editor.prototype.combineElementRevision = function (currentElementRevisions, elementToCombine) {
        for (var i = 0; i < currentElementRevisions.length; i++) {
            for (var j = 0; j < elementToCombine.length; j++) {
                var currentRevision = currentElementRevisions[i];
                var revisionToCombine = elementToCombine[j];
                if (currentRevision.author === revisionToCombine.author && currentRevision.revisionType === revisionToCombine.revisionType) {
                    var rangeLength = revisionToCombine.range.length;
                    for (var k = 0; k < rangeLength; k++) {
                        var item = revisionToCombine.range[0];
                        item.revisions.splice(item.revisions.indexOf(revisionToCombine), 1);
                        revisionToCombine.range.splice(0, 1);
                        this.owner.trackChangesPane.updateCurrentTrackChanges(revisionToCombine);
                        currentRevision.range.push(item);
                        this.owner.trackChangesPane.updateCurrentTrackChanges(currentRevision);
                        item.revisions.push(currentRevision);
                    }
                    if (revisionToCombine.range.length === 0) {
                        this.owner.revisions.remove(revisionToCombine);
                    }
                }
            }
        }
    };
    Editor.prototype.combineRevisions = function (block, startPosition, endposition) {
        if (!this.owner.enableTrackChanges) {
            return;
        }
        var info = this.selection.getLineInfo(block, startPosition.offset);
        var elementInfo = info.line.getInline(startPosition.offset, 0);
        var currentElement = elementInfo.element;
        if (currentElement.revisions.length > 0) {
            if (this.isRevisionMatched(currentElement, 'Insertion')) {
                var nextElement = currentElement.nextElement;
                if (!isNullOrUndefined(nextElement) && nextElement.revisions.length > 0) {
                    var revision = currentElement.revisions[currentElement.revisions.length - 1];
                    var range = nextElement.revisions[nextElement.revisions.length - 1].range;
                    this.clearAndUpdateRevisons(range, revision, revision.range.indexOf(currentElement) + 1);
                }
            }
        }
        // let startOffset: number = startPosition.currentWidget.getOffset(firstElement, 0);
        // let endOffset: number = endposition.currentWidget.getOffset(lastElement, 0);
    };
    /**
     * Method to update the revision for whole block
     *
     * @private
     * @returns {void}
     */
    Editor.prototype.insertRevisionForBlock = function (widget, revisionType, isTOC, revision, skipReLayout) {
        if (widget.childWidgets.length === 0 || !this.owner.enableTrackChanges) {
            return;
        }
        if (revisionType === 'Deletion') {
            var editPostion = this.selection.editPosition;
            var start = this.selection.start.clone();
            var end = this.selection.end.clone();
            this.documentHelper.layout.clearListElementBox(widget);
            for (var i = 0; i < widget.childWidgets.length; i++) {
                var line = (widget.childWidgets[i]);
                this.removeContent(line, 0, this.documentHelper.selection.getLineLength(line));
            }
            this.selection.editPosition = editPostion;
            this.selection.start.setPositionInternal(start);
            this.selection.end.setPositionInternal(end);
            // let textPosition: TextPosition = this.selection.getTextPosBasedOnLogicalIndex(editPostion);
            // this.selection.selectContent(textPosition, true);
            this.removeEmptyLine(widget);
            if (!skipReLayout) {
                this.documentHelper.layout.reLayoutParagraph(widget, 0, 0);
            }
        }
        else {
            var skipParaMark = false;
            if (isNullOrUndefined(revision)) {
                var author = this.owner.currentUser ? this.owner.currentUser : 'Guest user';
                revision = new Revision(this.owner, author, HelperMethods.getUtcDate());
                revision.revisionID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                revision.revisionType = revisionType;
            }
            for (var i = 0; i < widget.childWidgets.length; i++) {
                var elemets = widget.childWidgets[i].children;
                if (elemets.length === 0) {
                    var paraIndex = widget.containerWidget.childWidgets.indexOf(widget);
                    var prevWidget = undefined;
                    if (paraIndex > 0) {
                        prevWidget = widget.containerWidget.childWidgets[paraIndex - 1];
                    }
                    if (!isNullOrUndefined(prevWidget) && prevWidget instanceof ParagraphWidget && prevWidget.characterFormat.revisions.length > 0) {
                        if (this.isRevisionMatched(prevWidget.characterFormat, revisionType)) {
                            var mappedRevisions = this.getMatchedRevisionsToCombine(prevWidget.characterFormat.revisions, revisionType);
                            if (mappedRevisions.length > 0) {
                                this.mapMatchedRevisions(mappedRevisions, prevWidget.characterFormat, widget.characterFormat, false);
                                skipParaMark = true;
                                revision = undefined;
                            }
                        }
                    }
                }
                for (var j = 0; j < elemets.length; j++) {
                    if (j === 0 && !isTOC) {
                        var prevRevisionCount = elemets[i].revisions.length;
                        this.checkToCombineRevisionsinBlocks(elemets[i], true, false, 'Insertion');
                        if (elemets[i].revisions.length > prevRevisionCount) {
                            revision = elemets[i].revisions[elemets[i].revisions.length - 1];
                        }
                        else {
                            elemets[j].revisions.push(revision);
                            revision.range.push(elemets[j]);
                        }
                    }
                    else {
                        elemets[j].revisions.push(revision);
                        revision.range.push(elemets[j]);
                    }
                }
            }
            if (!isTOC && !skipParaMark) {
                widget.characterFormat.revisions.push(revision);
                revision.range.push(widget.characterFormat);
            }
            this.owner.trackChangesPane.updateCurrentTrackChanges(revision);
            if (!isNullOrUndefined(revision)) {
                this.updateRevisionCollection(revision);
            }
        }
    };
    Editor.prototype.updateRevisionCollection = function (revision) {
        var isInserted = false;
        var paraIndex = undefined;
        if (this.owner.revisions.changes.indexOf(revision) < 0) {
            if (!this.documentHelper.revisionsInternal.containsKey(revision.revisionID)) {
                this.documentHelper.revisionsInternal.add(revision.revisionID, revision);
            }
            if (this.owner.revisions.changes.length > 0) {
                var currentStart = this.owner.selection.start;
                for (var i = 0; i < this.owner.revisions.changes.length; i++) {
                    var currentRange = this.owner.revisions.changes[i].range[0];
                    if (currentRange instanceof ElementBox && !isNullOrUndefined(currentRange.line) && currentRange.line.paragraph.bodyWidget) {
                        paraIndex = this.selection.getElementPosition(this.owner.revisions.changes[i].range[0]).startPosition;
                    }
                    else if (currentRange instanceof WRowFormat) {
                        var rowWidget = currentRange.ownerBase;
                        var firstCell = rowWidget.childWidgets[0];
                        var firstPara = this.selection.getFirstParagraph(firstCell);
                        if (firstPara.bodyWidget) {
                            var selection = this.documentHelper.selection;
                            this.updateEditPosition(firstCell, selection);
                            paraIndex = this.selection.getTextPosBasedOnLogicalIndex(selection.editPosition);
                        }
                    }
                    else if (currentRange instanceof WCharacterFormat) {
                        var paraWidget = currentRange.ownerBase;
                        if (paraWidget.lastChild && paraWidget.lastChild.paragraph.bodyWidget) {
                            var offset = paraWidget.getLength();
                            var startPosition = new TextPosition(this.owner);
                            startPosition.setPositionParagraph(paraWidget.lastChild, offset);
                            paraIndex = startPosition;
                        }
                    }
                    if (!isNullOrUndefined(paraIndex) && !isNullOrUndefined(currentStart)) {
                        if (currentStart.isExistBefore(paraIndex)) {
                            isInserted = true;
                            this.owner.revisions.changes.splice(i, 0, revision);
                            if (!(revision.range[0] instanceof WRowFormat)) {
                                var currentChangeView = new ChangesSingleView(this.owner, this.owner.trackChangesPane);
                                this.owner.trackChangesPane.changesInfoDiv.insertBefore(currentChangeView.createSingleChangesDiv(revision), this.owner.trackChangesPane.changesInfoDiv.children[i + 1]);
                                this.owner.trackChangesPane.revisions.splice(i, 0, revision);
                                this.owner.trackChangesPane.changes.add(revision, currentChangeView);
                                this.owner.trackChangesPane.renderedChanges.add(revision, currentChangeView);
                            }
                            break;
                        }
                    }
                }
            }
            if (!isInserted) {
                this.owner.revisions.changes.push(revision);
                if (!(revision.range[0] instanceof WRowFormat)) {
                    var currentChangeView = new ChangesSingleView(this.owner, this.owner.trackChangesPane);
                    this.owner.trackChangesPane.changesInfoDiv.appendChild(currentChangeView.createSingleChangesDiv(revision));
                    this.owner.trackChangesPane.revisions.push(revision);
                    this.owner.trackChangesPane.changes.add(revision, currentChangeView);
                    this.owner.trackChangesPane.renderedChanges.add(revision, currentChangeView);
                }
            }
            this.documentHelper.updateAuthorIdentity();
        }
    };
    /**
     * @private
     * @returns {BodyWidget}
     */
    Editor.prototype.insertSection = function (selection, selectFirstBlock, isUndoing, sectionBreakContinuous, sectionBreakNewPage, sectionFormat) {
        var newSectionFormat;
        if (!isNullOrUndefined(sectionFormat)) {
            newSectionFormat = sectionFormat;
        }
        else {
            newSectionFormat = this.selection.start.paragraph.bodyWidget.sectionFormat.cloneFormat();
        }
        var lastBlock;
        var firstBlock;
        if (selection.start.paragraph.isInsideTable) {
            var table = this.documentHelper.layout.getParentTable(selection.start.paragraph);
            table = table.combineWidget(this.owner.viewer);
            var insertBefore = false;
            if (selection.start.paragraph.associatedCell.rowIndex === 0) {
                insertBefore = true;
            }
            var newParagraph = new ParagraphWidget();
            var previousBlock = table.previousRenderedWidget;
            if (!insertBefore) {
                lastBlock = this.splitTable(table, selection.start.paragraph.associatedCell.ownerRow);
                this.documentHelper.layout.layoutBodyWidgetCollection(lastBlock.index, lastBlock.containerWidget, lastBlock, false);
                lastBlock = lastBlock.getSplitWidgets().pop();
            }
            else {
                lastBlock = table;
            }
            var insertIndex = 0;
            if ((isNullOrUndefined(previousBlock) || !previousBlock.bodyWidget.equals(lastBlock.bodyWidget)) && insertBefore) {
                insertIndex = 0;
                newParagraph.index = 0;
            }
            else {
                insertIndex = lastBlock.indexInOwner + 1;
                newParagraph.index = lastBlock.index + 1;
            }
            lastBlock.containerWidget.childWidgets.splice(insertIndex, 0, newParagraph);
            newParagraph.containerWidget = lastBlock.containerWidget;
            this.updateNextBlocksIndex(newParagraph, true);
            this.documentHelper.layout.layoutBodyWidgetCollection(newParagraph.index, newParagraph.containerWidget, newParagraph, false);
            lastBlock = newParagraph;
        }
        else {
            var paragraphInfo = this.selection.getParagraphInfo(selection.start);
            var selectionStart = this.selection.getHierarchicalIndex(paragraphInfo.paragraph, paragraphInfo.offset.toString());
            //Split Paragraph
            if (!isUndoing) {
                this.splitParagraphInternal(selection, selection.start.paragraph, selection.start.currentWidget, selection.start.offset);
            }
            this.setPositionForCurrentIndex(selection.start, selectionStart);
            lastBlock = selection.start.paragraph.getSplitWidgets().pop();
            if (isUndoing && lastBlock.previousRenderedWidget !== undefined) {
                lastBlock = lastBlock.previousRenderedWidget;
            }
        }
        //Split body widget
        firstBlock = this.splitBodyWidget(lastBlock.bodyWidget, newSectionFormat, lastBlock, sectionBreakContinuous, sectionBreakNewPage).firstChild;
        if (isUndoing) {
            this.layoutWholeDocument(true);
        }
        if (firstBlock instanceof TableWidget) {
            firstBlock.updateRowIndex(0);
        }
        this.documentHelper.layout.layoutBodyWidgetCollection(firstBlock.index, firstBlock.containerWidget, firstBlock, false);
        if (firstBlock instanceof TableWidget) {
            firstBlock = this.documentHelper.getFirstParagraphInFirstCell(firstBlock);
        }
        if (selectFirstBlock) {
            selection.selectParagraphInternal(firstBlock, true);
        }
        return firstBlock;
    };
    /**
     * @private
     */
    Editor.prototype.splitBodyWidget = function (bodyWidget, sectionFormat, startBlock, sectionBreakContinuous, sectionBreakNewPage) {
        //let sectionIndex: number;
        //Move blocks after the start block to next body widget
        var newBodyWidget = this.documentHelper.layout.moveBlocksToNextPage(startBlock, true, undefined, sectionBreakContinuous);
        if (this.editorHistory.isUndoing) {
            startBlock.bodyWidget.sectionFormat = sectionFormat;
        }
        if (newBodyWidget.page === undefined) {
            newBodyWidget.page = bodyWidget.page;
            bodyWidget.page.bodyWidgets.splice(bodyWidget.page.bodyWidgets.indexOf(bodyWidget) + 1, 0, newBodyWidget);
        }
        else if (bodyWidget.page.bodyWidgets.length > 1 && newBodyWidget.page !== undefined && !this.editorHistory.isUndoing) {
            var temp_NewBody = newBodyWidget;
            while (!isNullOrUndefined(bodyWidget.nextRenderedWidget) && newBodyWidget !== bodyWidget.nextRenderedWidget) {
                var startindex = bodyWidget.nextRenderedWidget.page.bodyWidgets.indexOf(bodyWidget.nextRenderedWidget);
                newBodyWidget.page.bodyWidgets.push(bodyWidget.nextRenderedWidget);
                bodyWidget.nextRenderedWidget.page.bodyWidgets.splice(startindex, 1);
            }
            while (!isNullOrUndefined(newBodyWidget.nextRenderedWidget)) {
                newBodyWidget.nextRenderedWidget.page = newBodyWidget.page;
                newBodyWidget = newBodyWidget.nextRenderedWidget;
            }
            newBodyWidget = temp_NewBody;
            newBodyWidget.sectionFormat = new WSectionFormat(newBodyWidget);
            this.viewer.owner.parser.parseSectionFormat(0, bodyWidget.sectionFormat, newBodyWidget.sectionFormat);
            newBodyWidget.sectionFormat.breakCode = 'NewPage';
        }
        //Update SectionIndex for splitted body widget
        if (sectionBreakContinuous) {
            newBodyWidget.sectionFormat = new WSectionFormat(newBodyWidget);
            this.viewer.owner.parser.parseSectionFormat(0, bodyWidget.sectionFormat, newBodyWidget.sectionFormat);
            newBodyWidget.sectionFormat.breakCode = 'NoBreak';
        }
        if (sectionBreakNewPage) {
            newBodyWidget.sectionFormat = new WSectionFormat(newBodyWidget);
            this.viewer.owner.parser.parseSectionFormat(0, bodyWidget.sectionFormat, newBodyWidget.sectionFormat);
            newBodyWidget.sectionFormat.breakCode = 'NewPage';
        }
        this.updateSectionIndex(newBodyWidget.sectionFormat, newBodyWidget, true);
        if (newBodyWidget.sectionFormat.numberOfColumns > 1) {
            this.updateColumnIndex(newBodyWidget, false);
        }
        // insert New header footer widget in to section index 
        if (this.editorHistory && !this.editorHistory.isUndoing) {
            this.insertRemoveHeaderFooter(newBodyWidget.sectionIndex, true);
        }
        // if (this.documentHelper.viewer instanceof PageLayoutViewer) {
        //     //update header and footer for splitted widget
        //     this.documentHelper.layout.layoutHeaderFooter(newBodyWidget, this.owner.viewer as PageLayoutViewer, newBodyWidget.page);
        // }
        //Update Child item index from 0 for new Section
        this.updateBlockIndex(0, newBodyWidget.firstChild);
        // Start sinfting from first block
        this.owner.viewer.updateClientArea(newBodyWidget, newBodyWidget.page);
        return newBodyWidget;
    };
    Editor.prototype.insertRemoveHeaderFooter = function (sectionIndex, insert) {
        if (this.documentHelper.headersFooters[sectionIndex]) {
            // Need to handle further
            this.documentHelper.headersFooters.splice(sectionIndex, 0, {});
        }
        else {
            this.documentHelper.headersFooters[sectionIndex] = {};
        }
    };
    Editor.prototype.updateBlockIndex = function (blockIndex, block) {
        var blocks;
        var sectionIndex = block.bodyWidget.sectionIndex;
        do {
            blocks = block.getSplitWidgets();
            for (var i = 0; i < blocks.length; i++) {
                blocks[i].index = blockIndex;
            }
            blockIndex++;
            block = blocks.pop().nextRenderedWidget;
        } while (!isNullOrUndefined(block) && block.bodyWidget.sectionIndex === sectionIndex);
    };
    /**
     * @private
     * @returns {void}
     */
    Editor.prototype.updateSectionIndex = function (sectionFormat, startBodyWidget, increaseIndex) {
        var currentSectionIndex = startBodyWidget.sectionIndex;
        var blockIndex = 0;
        var bodyWidget = startBodyWidget;
        do {
            if (bodyWidget.index === currentSectionIndex && sectionFormat) {
                bodyWidget.sectionFormat = sectionFormat;
            }
            if (increaseIndex) {
                bodyWidget.index++;
            }
            else {
                bodyWidget.index--;
            }
            bodyWidget = bodyWidget.nextRenderedWidget;
        } while (bodyWidget);
    };
    /**
    * @private
    * @returns {void}
    */
    Editor.prototype.updateColumnIndex = function (startBodyWidget, increaseIndex) {
        var bodyWidget = startBodyWidget;
        do {
            if (!increaseIndex && bodyWidget.columnIndex === 0) {
                break;
            }
            if (increaseIndex) {
                bodyWidget.columnIndex++;
            }
            else {
                bodyWidget.columnIndex--;
            }
            if (!isNullOrUndefined(bodyWidget.nextRenderedWidget) && bodyWidget.sectionIndex !== bodyWidget.nextRenderedWidget.sectionIndex) {
                break;
            }
            bodyWidget = bodyWidget.nextRenderedWidget;
        } while (bodyWidget);
    };
    //Auto convert List
    Editor.prototype.checkAndConvertList = function (selection, isTab) {
        var list = selection.paragraphFormat.getList();
        if (!isNullOrUndefined(list) || selection.start.paragraph.containerWidget instanceof FootNoteWidget) {
            return false;
        }
        var convertList = false;
        var isLeadingZero = false;
        var indexInInline = 0;
        var inlineObj = selection.start.currentWidget.getInline(selection.start.offset - 1, indexInInline);
        var inline = inlineObj.element;
        indexInInline = inlineObj.index;
        if (!(inline instanceof TextElementBox)) {
            return false;
        }
        var span = inline;
        var text = span.text.substring(0, indexInInline);
        var tabValue = 0;
        var length = 0;
        while (!isNullOrUndefined(span.previousNode)) {
            if (span.previousNode instanceof TextElementBox && (span.previousNode.text === '\t' || span.previousNode.text.trim().length === 0)) {
                (span.previousNode.text === '\t') ? tabValue += 36 : length = span.previousNode.text.length * 2.5;
                span = span.previousNode;
                continue;
            }
            return false;
        }
        span = inline;
        var index = 0;
        var tabIndex = text.lastIndexOf('\t');
        index = (tabIndex >= 0) ? tabIndex + 1 : text.lastIndexOf(' ') + 1;
        while (span.previousNode instanceof TextElementBox && index === 0) {
            span = span.previousNode;
            var previousText = span.text;
            tabIndex = previousText.lastIndexOf('\t');
            index = (tabIndex >= 0) ? tabIndex + 1 : previousText.lastIndexOf(' ') + 1;
            text = span.text + text;
            text = text.substring(index);
        }
        text = HelperMethods.trimStart(text);
        var numberFormat = text.substring(1, 2);
        var previousList = undefined;
        var listLevelPattern = this.getListLevelPattern(text.substring(0, 1));
        if (listLevelPattern !== 'None' && this.checkNumberFormat(numberFormat, listLevelPattern === 'Bullet', text)) {
            convertList = true;
        }
        else if (this.checkLeadingZero(text)) {
            isLeadingZero = true;
            convertList = true;
        }
        else {
            previousList = this.checkNextLevelAutoList(text);
            if (!isNullOrUndefined(previousList)) {
                convertList = true;
            }
        }
        if (convertList && listLevelPattern === 'Bullet' && inline.text === '- ' && (!isNullOrUndefined(inline.paragraph.previousWidget) && !(inline.paragraph.previousWidget.firstChild.children[0] instanceof ListTextElementBox))) {
            convertList = false;
        }
        if (convertList) {
            this.initComplexHistory('AutoList');
            var paragraph = inline.paragraph;
            selection.start.setPositionParagraph(paragraph.childWidgets[0], paragraph.childWidgets[0].getOffset(inline, indexInInline + 1));
            selection.end.setPositionParagraph(paragraph.childWidgets[0], 0);
            this.initHistory('Delete');
            this.deleteSelectedContents(selection, false);
            this.reLayout(selection, false);
            var followCharacter = isTab ? 'Tab' : 'Space';
            numberFormat = !isLeadingZero ? '%1' + numberFormat : '%1' + text.substring(text.length - 1, text.length);
            var leadingZeroText = text.substring(text.length - 3, text.length - 1);
            listLevelPattern = !isLeadingZero ? listLevelPattern : this.getListLevelPattern(leadingZeroText);
            var listLevel = new WListLevel(undefined);
            listLevel.listLevelPattern = listLevelPattern;
            if (listLevelPattern === 'Bullet') {
                if (text === '*') {
                    listLevel.numberFormat = String.fromCharCode(61623);
                    listLevel.characterFormat.fontFamily = 'Symbol';
                }
                else if (text === '-') {
                    listLevel.numberFormat = '-';
                }
            }
            else {
                listLevel.numberFormat = numberFormat;
            }
            listLevel.followCharacter = followCharacter;
            var leftIndent = selection.paragraphFormat.leftIndent;
            if (tabValue !== 0 || length !== 0) {
                listLevel.paragraphFormat.leftIndent = leftIndent + 18 + tabValue + length;
            }
            else if (indexInInline > 2) {
                listLevel.paragraphFormat.leftIndent = leftIndent + (indexInInline - 2) * 2.5 + 18;
            }
            else if (leftIndent > 0) {
                listLevel.paragraphFormat.leftIndent = leftIndent + 18;
            }
            else {
                listLevel.paragraphFormat.leftIndent = 36;
            }
            listLevel.paragraphFormat.firstLineIndent = -18;
            if ((!isLeadingZero && text.substring(0, 1) === '0') || leadingZeroText === '00') {
                listLevel.startAt = 0;
            }
            else {
                listLevel.startAt = 1;
            }
            if (!isNullOrUndefined(previousList)) {
                selection.paragraphFormat.setList(previousList);
            }
            else {
                this.autoConvertList(selection, listLevel);
            }
            if (this.editorHistory && !isNullOrUndefined(this.editorHistory.currentHistoryInfo)) {
                this.editorHistory.updateComplexHistory();
            }
            else {
                this.reLayout(selection);
            }
        }
        return convertList;
    };
    Editor.prototype.checkNextLevelAutoList = function (text) {
        var selection = this.documentHelper.selection;
        var previousList = undefined;
        var convertList = false;
        var currentParagraph = selection.start.paragraph;
        var prevParagraph = selection.getPreviousParagraphBlock(currentParagraph);
        var isList = false;
        while (!isNullOrUndefined(prevParagraph) && prevParagraph instanceof ParagraphWidget) {
            if (prevParagraph.paragraphFormat.listFormat && prevParagraph.paragraphFormat.listFormat.listId !== -1) {
                isList = true;
                break;
            }
            prevParagraph = selection.getPreviousParagraphBlock(prevParagraph);
        }
        if (isList) {
            var listNumber = this.documentHelper.layout.getListNumber(prevParagraph.paragraphFormat.listFormat, true);
            var prevListText = listNumber.substring(0, listNumber.length - 1);
            var currentListText = text.substring(0, text.length - 1);
            //check if numberFormat equal
            var inputString = void 0;
            if (listNumber.substring(listNumber.length - 1) !== text.substring(text.length - 1)) {
                convertList = false;
            }
            else if (currentListText.match(/^[0-9]+$/) && prevListText.match(/^[0-9]+$/)) {
                inputString = parseInt(currentListText, 10);
                if (parseInt(prevListText, 10) === inputString || parseInt(prevListText, 10) + 1 === inputString
                    || parseInt(prevListText, 10) + 2 === inputString) {
                    convertList = true;
                }
            }
            else if (currentListText.match(/^[a-zA-Z]+$/) && prevListText.match(/^[a-zA-Z]+$/)) {
                if (prevListText.charCodeAt(0) === text.charCodeAt(0) || prevListText.charCodeAt(0) + 1 === text.charCodeAt(0)
                    || prevListText.charCodeAt(0) + 2 === text.charCodeAt(0)) {
                    convertList = true;
                }
                else if (currentListText.match(/^[MDCLXVImdclxvi]+$/) && prevListText.match(/^[MDCLXVImdclxvi]+$/)) {
                    var prevListNumber = this.getNumber(prevListText.toUpperCase());
                    var currentListNumber = this.getNumber(currentListText.toUpperCase());
                    if (prevListNumber === currentListNumber || prevListNumber + 1 === currentListNumber
                        || prevListNumber + 2 === currentListNumber) {
                        convertList = true;
                    }
                }
            }
            if (convertList) {
                previousList = this.documentHelper.getListById(prevParagraph.paragraphFormat.listFormat.listId);
            }
        }
        return previousList;
    };
    Editor.prototype.getNumber = function (roman) {
        var conversion = { 'M': 1000, 'D': 500, 'C': 100, 'L': 50, 'X': 10, 'V': 5, 'I': 1 };
        var arr = roman.split('');
        var num = 0;
        for (var i = 0; i < arr.length; i++) {
            var currentValue = conversion[arr[i]];
            var nextValue = conversion[arr[i + 1]];
            if (currentValue < nextValue) {
                num -= (currentValue);
            }
            else {
                num += (currentValue);
            }
        }
        return num;
    };
    Editor.prototype.getListLevelPattern = function (value) {
        switch (value) {
            case '0':
            case '1':
                return 'Arabic';
            case 'I':
                return 'UpRoman';
            case 'i':
                return 'LowRoman';
            case 'A':
                return 'UpLetter';
            case 'a':
                return 'LowLetter';
            case '*':
            case '-':
                return 'Bullet';
            case '00':
            case '01':
                return 'LeadingZero';
            default:
                return 'None';
        }
    };
    Editor.prototype.autoConvertList = function (selection, listLevel) {
        var start = selection.start;
        if (!selection.isForward) {
            start = selection.end;
        }
        var newList = new WList();
        if (this.documentHelper.lists.length > 0) {
            newList.listId = this.documentHelper.lists[this.documentHelper.lists.length - 1].listId + 1;
        }
        else {
            newList.listId = 0;
        }
        var newAbstractList = new WAbstractList();
        var layout = this.documentHelper;
        if (layout.abstractLists.length > 0) {
            newAbstractList.abstractListId = layout.abstractLists[layout.abstractLists.length - 1].abstractListId + 1;
        }
        else {
            newAbstractList.abstractListId = 0;
        }
        newList.abstractListId = newAbstractList.abstractListId;
        newList.abstractList = newAbstractList;
        layout.abstractLists.push(newAbstractList);
        newAbstractList.levels.push(listLevel);
        listLevel.ownerBase = newAbstractList;
        selection.paragraphFormat.setList(newList);
        selection.paragraphFormat.listLevelNumber = 0;
    };
    Editor.prototype.checkNumberFormat = function (numberFormat, isBullet, text) {
        if (isBullet) {
            return numberFormat === '';
        }
        else {
            var index = text.indexOf(numberFormat);
            return (numberFormat === '.' || numberFormat === ')'
                || numberFormat === '>' || numberFormat === '-') && text.substring(index, text.length - 1) === '';
        }
    };
    Editor.prototype.checkLeadingZero = function (text) {
        var j;
        var isZero = false;
        for (var i = 0; i <= text.length - 1; i++) {
            if (text.charAt(i) === '0') {
                isZero = true;
                continue;
            }
            j = i;
            break;
        }
        var numberFormat = undefined;
        if (text.charAt(j) === '1') {
            numberFormat = text.charAt(j + 1);
        }
        else {
            numberFormat = text.charAt(j);
        }
        return isZero && this.checkNumberFormat(numberFormat, false, text);
    };
    Editor.prototype.getPageFromBlockWidget = function (block) {
        var page = undefined;
        if (block.containerWidget instanceof BodyWidget) {
            page = block.containerWidget.page;
        }
        else if (block.containerWidget instanceof HeaderFooterWidget) {
            page = block.containerWidget.page;
        }
        else if (block.containerWidget instanceof TableCellWidget) {
            page = block.containerWidget.bodyWidget.page;
        }
        return page;
    };
    /**
     * @private
     * @returns {void}
     */
    Editor.prototype.insertTextInline = function (element, selection, text, index, skipReLayout) {
        if (element instanceof TextElementBox) {
            element.text = HelperMethods.insert(element.text, index, text);
            if (this.owner.enableTrackChanges) {
                var revision = element.revisions[0];
                this.owner.trackChangesPane.updateCurrentTrackChanges(revision);
            }
            var paragraph = element.line.paragraph;
            var lineIndex = paragraph.childWidgets.indexOf(element.line);
            var elementIndex = element.line.children.indexOf(element);
            if (isNullOrUndefined(skipReLayout) || !skipReLayout) {
                this.documentHelper.layout.reLayoutParagraph(paragraph, lineIndex, elementIndex, element.line.paragraph.bidi);
            }
        }
        else if (element instanceof ImageElementBox) {
            this.insertImageText(element, selection, text, index);
        }
        else if (element instanceof FieldElementBox) {
            if (element.fieldType === 0) {
                this.insertFieldBeginText(element, selection, text, index);
            }
            else if (element.fieldType === 2) {
                this.insertFieldSeparatorText(element, selection, text, index);
            }
            else {
                this.insertFieldEndText(element, selection, text, index);
            }
        }
        else if (element instanceof BookmarkElementBox || element instanceof EditRangeStartElementBox
            || element instanceof EditRangeEndElementBox) {
            this.insertBookMarkText(element, text);
        }
    };
    Editor.prototype.insertFieldBeginText = function (fieldBegin, selection, text, index) {
        var spanObj = new TextElementBox();
        spanObj.text = text;
        var lineIndex = fieldBegin.line.paragraph.childWidgets.indexOf(fieldBegin.line);
        var spanIndex = fieldBegin.line.children.indexOf(fieldBegin);
        spanObj.characterFormat.copyFormat(fieldBegin.characterFormat);
        fieldBegin.line.children.splice(spanIndex, 0, spanObj);
        spanObj.line = fieldBegin.line;
        this.documentHelper.layout.reLayoutParagraph(fieldBegin.line.paragraph, lineIndex, spanIndex);
    };
    Editor.prototype.insertBookMarkText = function (element, text) {
        var spanObj = new TextElementBox();
        spanObj.text = text;
        var lineIndex = element.line.paragraph.childWidgets.indexOf(element.line);
        var spanIndex = element.line.children.indexOf(element);
        spanObj.characterFormat.copyFormat(element.characterFormat);
        if (element instanceof EditRangeEndElementBox || element instanceof BookmarkElementBox) {
            element.line.children.splice(spanIndex, 0, spanObj);
        }
        else {
            element.line.children.splice(spanIndex + 1, 0, spanObj);
        }
        spanObj.line = element.line;
        this.documentHelper.layout.reLayoutParagraph(element.line.paragraph, lineIndex, spanIndex);
    };
    Editor.prototype.insertFieldSeparatorText = function (fieldSeparator, selection, text, index) {
        var previousInline = selection.getPreviousTextInline(fieldSeparator);
        var nextInline = selection.getNextTextInline(fieldSeparator);
        var span = new TextElementBox();
        span.text = text;
        var spanIndex = fieldSeparator.line.children.indexOf(fieldSeparator);
        if (index === fieldSeparator.length) {
            spanIndex++;
        }
        if (isNullOrUndefined(previousInline) && isNullOrUndefined(nextInline)) {
            span.characterFormat.copyFormat(fieldSeparator.line.paragraph.characterFormat);
        }
        else if (isNullOrUndefined(previousInline)) {
            span.characterFormat.copyFormat(nextInline.characterFormat);
        }
        else {
            span.characterFormat.copyFormat(previousInline.characterFormat);
        }
        fieldSeparator.line.children.splice(spanIndex, 0, span);
        span.line = fieldSeparator.line;
        var lineIndex = fieldSeparator.line.paragraph.childWidgets.indexOf(fieldSeparator.line);
        this.documentHelper.layout.reLayoutParagraph(fieldSeparator.line.paragraph, lineIndex, spanIndex);
    };
    Editor.prototype.insertFieldEndText = function (fieldEnd, selection, text, index) {
        var span = new TextElementBox();
        span.text = text;
        var spanIndex = fieldEnd.line.children.indexOf(fieldEnd);
        span.characterFormat.copyFormat(fieldEnd.characterFormat);
        if (selection.isInlineFormFillMode() && index == 0) {
            // special case to insert text before fieldEnd while filling a text form field.
            // when spell check enabled the white space and charaters are inserted as saperate text element box and getInline returns fieldEnd with index 0
            fieldEnd.line.children.splice(spanIndex, 0, span);
        }
        else {
            fieldEnd.line.children.splice(spanIndex + 1, 0, span);
        }
        span.line = fieldEnd.line;
        var lineIndex = fieldEnd.line.paragraph.childWidgets.indexOf(fieldEnd.line);
        if (this.owner.enableTrackChanges) {
            var isBidi = this.documentHelper.textHelper.getRtlLanguage(text).isRtl;
            var revisionType = 'Insertion';
            var isRevisionCombined = this.checkToMapRevisionWithInlineText(fieldEnd, index, span, isBidi, revisionType);
            if (!isRevisionCombined && span.revisions.length === 0) {
                isRevisionCombined = this.checkToMapRevisionWithNextNode(fieldEnd.nextNode, span, isBidi, revisionType);
            }
        }
        this.documentHelper.layout.reLayoutParagraph(fieldEnd.line.paragraph, lineIndex, spanIndex);
    };
    Editor.prototype.insertImageText = function (image, selection, text, index) {
        var previousInlineObj = selection.getPreviousTextInline(image);
        var nextInlineObj = selection.getNextTextInline(image);
        var line = image.line;
        var element = new TextElementBox();
        var paragraph = line.paragraph;
        var lineIndex = paragraph.childWidgets.indexOf(line);
        element.text = text;
        var spanIndex = line.children.indexOf(image);
        if (index === image.length) {
            spanIndex++;
        }
        if (isNullOrUndefined(previousInlineObj) && isNullOrUndefined(nextInlineObj)) {
            element.characterFormat.copyFormat(paragraph.characterFormat);
        }
        else if (isNullOrUndefined(previousInlineObj)) {
            element.characterFormat.copyFormat(nextInlineObj.characterFormat);
        }
        else {
            element.characterFormat.copyFormat(previousInlineObj.characterFormat);
        }
        line.children.splice(spanIndex, 0, element);
        element.line = line;
        this.documentHelper.layout.reLayoutParagraph(paragraph, lineIndex, spanIndex);
    };
    /**
     * @private
     */
    Editor.prototype.isListTextSelected = function () {
        if (this.documentHelper.isListTextSelected) {
            this.initComplexHistory('ListSelect');
            if (this.documentHelper.selection.start.paragraph.paragraphFormat.listFormat && this.documentHelper.selection.start.paragraph.paragraphFormat.listFormat.listId !== -1) {
                this.onApplyList(undefined);
            }
        }
    };
    //Auto Format and insert Hyperlink Implementation starts
    Editor.prototype.checkAndConvertToHyperlink = function (selection, isEnter, paragraph) {
        var text;
        var span;
        if (isEnter) {
            span = paragraph.lastChild.children[paragraph.lastChild.children.length - 1];
            text = span.text;
        }
        else {
            var indexInInline = 0;
            var inlineObj = selection.start.currentWidget.getInline(selection.start.offset - 1, indexInInline);
            var inline = inlineObj.element;
            indexInInline = inlineObj.index;
            if (!(inline instanceof TextElementBox)) {
                return;
            }
            span = inline;
            text = span.text.substring(0, indexInInline);
        }
        var index = 0;
        var tabCharIndex = text.lastIndexOf('\t');
        index = (tabCharIndex >= 0) ? tabCharIndex + 1 : text.lastIndexOf(' ') + 1;
        while (span.previousElement instanceof TextElementBox && index === 0) {
            span = span.previousNode;
            var previousText = span.text;
            tabCharIndex = previousText.lastIndexOf('\t');
            index = (tabCharIndex >= 0) ? tabCharIndex + 1 : previousText.lastIndexOf(' ') + 1;
            text = span.text + text;
        }
        text = text.substring(index);
        var lowerCaseText = text.toLowerCase();
        var containsURL = false;
        if (lowerCaseText.substring(0, 8) === 'file:///'
            || (lowerCaseText.substring(0, 7) === 'http://' && lowerCaseText.length > 7)
            || (lowerCaseText.substring(0, 8) === 'https://' && lowerCaseText.length > 8)
            || (lowerCaseText.substring(0, 4) === 'www.' && lowerCaseText.length > 4)
            || (lowerCaseText.substring(0, 3) === '\\' && lowerCaseText.length > 3)
            || (lowerCaseText.substring(0, 7) === 'mailto:' && lowerCaseText.length > 7)) {
            containsURL = true;
            if (lowerCaseText.substring(0, 4) === 'www.' && lowerCaseText.length > 4) {
                text = 'http://' + text;
            }
        }
        else {
            var atIndex = text.indexOf('@');
            var dotIndex = text.indexOf('.');
            if (atIndex > 0 && atIndex < dotIndex && dotIndex < text.length - 1) {
                containsURL = true;
                text = 'mailto:' + text;
            }
        }
        if (containsURL) {
            var startPos = new TextPosition(this.documentHelper.owner);
            startPos.setPositionParagraph(span.line, span.line.getOffset(span, index));
            var endPos = new TextPosition(this.documentHelper.owner);
            if (isEnter) {
                endPos.setPositionParagraph(span.line, span.line.getEndOffset());
            }
            else {
                if (selection.end.currentWidget.children.length === 0 && selection.end.offset === 0) {
                    var prevLine = selection.end.currentWidget.previousLine;
                    endPos.setPositionParagraph(prevLine, prevLine.getEndOffset());
                }
                else {
                    endPos.setPositionParagraph(selection.end.currentWidget, selection.end.offset - 1);
                }
            }
            this.autoFormatHyperlink(selection, text, startPos, endPos);
        }
    };
    Editor.prototype.autoFormatHyperlink = function (selection, url, startPosition, endPosition) {
        this.initComplexHistory('AutoFormatHyperlink');
        var blockInfo = this.selection.getParagraphInfo(startPosition);
        var start = this.selection.getHierarchicalIndex(blockInfo.paragraph, blockInfo.offset.toString());
        if (this.editorHistory && this.editorHistory.currentHistoryInfo) {
            this.editorHistory.currentHistoryInfo.insertPosition = start;
        }
        // Moves the selection to URL text start and end position.
        selection.start.setPositionInternal(startPosition);
        selection.end.setPositionInternal(endPosition);
        // Preserves the character format for hyperlink field.
        var temp = this.getCharacterFormat(selection);
        var format = new WCharacterFormat();
        format.copyFormat(temp);
        var fieldEnd = this.createHyperlinkElement(url, startPosition, endPosition, format);
        // Moves the selection to the end of field end position.
        selection.start.setPositionParagraph(fieldEnd.line, (fieldEnd.line).getOffset(fieldEnd, 1));
        // Moves to next text position. (To achieve common behavior for space and enter).
        selection.start.moveNextPosition();
        selection.end.setPositionInternal(selection.start);
        blockInfo = this.selection.getParagraphInfo(selection.end);
        var end = this.selection.getHierarchicalIndex(blockInfo.paragraph, blockInfo.offset.toString());
        if (this.editorHistory && this.editorHistory.currentHistoryInfo) {
            this.editorHistory.currentHistoryInfo.endPosition = end;
            this.editorHistory.updateComplexHistory();
            this.reLayout(selection);
        }
        else {
            this.updateComplexWithoutHistory(0, start, end);
        }
    };
    Editor.prototype.appylingHyperlinkFormat = function (selection) {
        this.initHistory('Underline');
        this.updateCharacterFormatWithUpdate(selection, 'underline', 'Single', false);
        if (this.editorHistory) {
            this.editorHistory.updateHistory();
        }
        this.reLayout(selection, false);
        // Applies font color for field result.
        this.initHistory('FontColor');
        this.isForHyperlinkFormat = true;
        this.updateCharacterFormatWithUpdate(selection, 'fontColor', '#0563c1', false);
        this.isForHyperlinkFormat = false;
        if (this.editorHistory) {
            this.editorHistory.updateHistory();
        }
        this.reLayout(selection, false);
    };
    Editor.prototype.createHyperlinkElement = function (url, startPosition, endPosition, format) {
        var selection = this.selection;
        this.documentHelper.layout.allowLayout = false;
        this.documentHelper.layout.isReplaceAll = true;
        this.appylingHyperlinkFormat(selection);
        //this.documentHelper.layout.allowLayout = true;
        // Adds the field end at the URL text end position.
        var fieldEnd = new FieldElementBox(1);
        fieldEnd.characterFormat.copyFormat(format);
        fieldEnd.line = selection.end.currentWidget;
        selection.start.setPositionInternal(selection.end);
        // this.insertElementInCurrentLine(selection, fieldEnd, true);
        this.initInsertInline(fieldEnd);
        // Moves the selection to URL text start position.        
        selection.start.setPositionInternal(startPosition);
        selection.end.setPositionInternal(selection.start);
        // Adds field begin, field code and field separator at the URL text start position.
        var begin = this.insertHyperlinkfield(selection, format, url);
        var lineIndex = selection.start.paragraph.childWidgets.indexOf(begin.line);
        var index = begin.line.children.indexOf(begin);
        fieldEnd.linkFieldCharacter(this.documentHelper);
        this.documentHelper.layout.isReplaceAll = false;
        this.documentHelper.layout.allowLayout = true;
        this.documentHelper.layout.reLayoutParagraph(selection.start.paragraph, lineIndex, index);
        return fieldEnd;
    };
    Editor.prototype.insertHyperlinkfield = function (selection, format, url, isBookmark) {
        // Adds field begin, field code and field separator at the URL text start position.
        var begin = new FieldElementBox(0);
        begin.characterFormat.copyFormat(format);
        begin.line = selection.start.currentWidget;
        this.initInsertInline(begin);
        var span = new TextElementBox();
        span.characterFormat.copyFormat(format);
        if (isBookmark) {
            span.text = ' HYPERLINK \\l \"' + url + '\" ';
        }
        else {
            span.text = ' HYPERLINK \"' + url + '\" ';
        }
        span.line = selection.start.currentWidget;
        this.initInsertInline(span);
        var separator = new FieldElementBox(2);
        separator.characterFormat.copyFormat(format);
        separator.line = selection.start.currentWidget;
        this.initInsertInline(separator);
        return begin;
    };
    /**
     * @private
     */
    /* eslint-disable @typescript-eslint/no-explicit-any */
    Editor.prototype.unlinkRangeFromRevision = function (inline, removeCollection) {
        for (var i = 0; i < inline.revisions.length; i++) {
            var currentRevision = inline.revisions[i];
            var rangeIndex = currentRevision.range.indexOf(inline);
            if (rangeIndex >= 0) {
                currentRevision.range.splice(rangeIndex, 1);
                this.owner.trackChangesPane.updateCurrentTrackChanges(currentRevision);
            }
            if (currentRevision.range.length === 0 && removeCollection) {
                this.owner.revisions.remove(currentRevision);
                if (this.isRemoveRevision && this.documentHelper.revisionsInternal.containsKey(currentRevision.revisionID)) {
                    this.documentHelper.revisionsInternal.remove(currentRevision.revisionID);
                    this.owner.trackChangesPane.updateTrackChanges();
                }
            }
        }
    };
    /**
     * @private
     */
    /* eslint-disable @typescript-eslint/no-explicit-any */
    Editor.prototype.unlinkWholeRangeInRevision = function (item, revision) {
        var currentRevision = revision;
        item.revisions.splice(item.revisions.indexOf(item), 1);
        var rangeLength = currentRevision.range.length;
        for (var rangeIndex = 0; rangeIndex < rangeLength; rangeIndex++) {
            currentRevision.range.splice(0, 1);
            this.owner.trackChangesPane.updateCurrentTrackChanges(currentRevision);
        }
        if (currentRevision.range.length === 0) {
            this.owner.revisions.remove(currentRevision);
            if (this.isRemoveRevision && this.documentHelper.revisionsInternal.containsKey(currentRevision.revisionID)) {
                this.documentHelper.revisionsInternal.remove(currentRevision.revisionID);
                this.owner.trackChangesPane.updateTrackChanges();
            }
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Editor.prototype.unLinkFieldCharacter = function (inline) {
        if (inline instanceof FieldElementBox && inline.fieldType === 0) {
            if (inline.fieldEnd) {
                if (this.documentHelper) {
                    this.documentHelper.fieldToLayout = inline;
                    this.documentHelper.fieldEndParagraph = inline.line.paragraph;
                }
                // inline.line.paragraph.addFieldCharacter(inline.fieldEnd);
                if (inline.fieldEnd) {
                    inline.fieldEnd.fieldBegin = undefined;
                }
                inline.fieldEnd = undefined;
            }
        }
        if (inline instanceof FieldElementBox && inline.fieldType === 2) {
            if (!isNullOrUndefined(inline.fieldEnd)) {
                if (this.documentHelper) {
                    this.documentHelper.fieldToLayout = inline.fieldBegin;
                    this.documentHelper.fieldEndParagraph = inline.line.paragraph;
                }
                inline.fieldBegin.fieldSeparator = undefined;
                inline.fieldEnd.fieldSeparator = undefined;
            }
        }
        else if (inline instanceof FieldElementBox && inline.fieldType === 1) {
            if (inline.fieldBegin) {
                if (!isNullOrUndefined(this.documentHelper)) {
                    this.documentHelper.fieldToLayout = inline.fieldBegin;
                    this.documentHelper.fieldEndParagraph = inline.line.paragraph;
                }
                var fieldIndex = this.documentHelper.fields.indexOf(inline.fieldBegin);
                if (fieldIndex !== -1) {
                    this.documentHelper.fields.splice(fieldIndex, 1);
                }
                var formFieldIndex = this.documentHelper.formFields.indexOf(inline.fieldBegin);
                if (formFieldIndex !== -1) {
                    this.documentHelper.formFields.splice(formFieldIndex, 1);
                }
                inline.fieldBegin.fieldEnd = undefined;
                inline.fieldBegin = undefined;
            }
        }
    };
    Editor.prototype.getCharacterFormat = function (selection) {
        if (selection.start.paragraph.isEmpty()) {
            return selection.start.paragraph.characterFormat;
        }
        else {
            var info = selection.start.currentWidget.getInline(selection.start.offset, 0);
            return info.element.characterFormat;
        }
    };
    /**
     * Inserts the Hyperlink.
     *
     * @param {string} address Specify the Hyperlink URL to be inserted.
     * @param {string} displayText Specify the display text for the hyperlink
     * @param {string} screenTip Specify the screen tip text.
     * @returns {void}
     */
    Editor.prototype.insertHyperlink = function (address, displayText, screenTip) {
        address = address.replace(/\s/g, "");
        if (isNullOrUndefined(displayText)) {
            displayText = address;
        }
        if (!isNullOrUndefined(screenTip)) {
            address = address + '\" \\o \"' + screenTip;
        }
        this.insertHyperlinkInternal(address, displayText, this.owner.selection.text !== displayText, false);
    };
    /**
     * @private
     */
    Editor.prototype.insertHyperlinkInternal = function (url, displayText, remove, isBookmark) {
        var selection = this.documentHelper.selection;
        if (selection.start.paragraph.associatedCell !== selection.end.paragraph.associatedCell) {
            return;
        }
        if (remove) {
            //Empty selection Hyperlink insert
            this.insertHyperlinkInternalInternal(selection, url, displayText, isBookmark);
        }
        else {
            this.documentHelper.layout.allowLayout = false;
            //Non-Empty Selection- change the selected text to Field       
            // this.preservedFontCol = this.getFontColor();
            var startPosition = selection.start;
            var endPosition = selection.end;
            if (!selection.isForward) {
                startPosition = selection.end;
                endPosition = selection.start;
            }
            var fieldStartPosition = new TextPosition(this.documentHelper.owner);
            fieldStartPosition.setPositionInternal(startPosition);
            var temp = this.getCharacterFormat(selection);
            var format = new WCharacterFormat(undefined);
            format.copyFormat(temp);
            this.initComplexHistory('InsertHyperlink');
            var blockInfo = this.selection.getParagraphInfo(startPosition);
            var start = this.selection.getHierarchicalIndex(blockInfo.paragraph, blockInfo.offset.toString());
            if (this.editorHistory && this.editorHistory.currentHistoryInfo) {
                this.editorHistory.currentHistoryInfo.insertPosition = this.selection.getHierarchicalIndex(blockInfo.paragraph, blockInfo.offset.toString());
            }
            this.appylingHyperlinkFormat(selection);
            startPosition.setPositionInternal(endPosition);
            // Adds the field end at the URL text end position.
            var fieldEnd = new FieldElementBox(1);
            fieldEnd.characterFormat.copyFormat(format);
            fieldEnd.line = selection.end.currentWidget;
            startPosition.setPositionInternal(endPosition);
            // this.insertElementInCurrentLine(selection, fieldEnd, true);
            this.initInsertInline(fieldEnd);
            // Moves the selection to URL text start position.        
            startPosition.setPositionInternal(fieldStartPosition);
            endPosition.setPositionInternal(startPosition);
            // Adds field begin, field code and field separator at the URL text start position.
            var begin = this.insertHyperlinkfield(selection, format, url, isBookmark);
            fieldEnd.linkFieldCharacter(this.documentHelper);
            var lineIndex = selection.start.paragraph.childWidgets.indexOf(begin.line);
            var index = begin.line.children.indexOf(begin);
            this.documentHelper.layout.allowLayout = true;
            this.documentHelper.layout.reLayoutParagraph(selection.start.paragraph, lineIndex, index);
            var lineWidget = fieldEnd.line;
            selection.selects(lineWidget, lineWidget.getOffset(fieldEnd, fieldEnd.length), true);
            blockInfo = this.selection.getParagraphInfo(endPosition);
            var end = this.selection.getHierarchicalIndex(blockInfo.paragraph, blockInfo.offset.toString());
            if (this.editorHistory && this.editorHistory.currentHistoryInfo) {
                this.editorHistory.currentHistoryInfo.endPosition = this.selection.getHierarchicalIndex(blockInfo.paragraph, blockInfo.offset.toString());
                this.editorHistory.updateComplexHistory();
            }
            else {
                this.updateComplexWithoutHistory(1, start, end);
            }
        }
    };
    Editor.prototype.insertHyperlinkInternalInternal = function (selection, url, displayText, isBookmark) {
        if (isNullOrUndefined(selection.start)) {
            return;
        }
        if (this.editHyperlink(selection, url, displayText)) {
            return;
        }
        var commentStarts = this.checkAndRemoveComments();
        this.initHistory('InsertHyperlink');
        var isRemoved = true;
        if (!selection.isEmpty) {
            var isTrackEnabled = this.owner.enableTrackChanges;
            this.owner.enableTrackChanges = false;
            isRemoved = this.removeSelectedContents(selection);
            this.owner.enableTrackChanges = isTrackEnabled;
        }
        if (isRemoved) {
            // Preserves the character format for hyperlink field.
            var temp = this.getCharacterFormat(selection);
            var format = new WCharacterFormat();
            format.copyFormat(temp);
            this.insertHyperlinkByFormat(selection, url, displayText, format, isBookmark);
        }
        this.updateHistoryForComments(commentStarts);
    };
    Editor.prototype.insertHyperlinkByFormat = function (selection, url, displayText, format, isBookmark) {
        this.updateInsertPosition();
        selection.owner.isShiftingEnabled = true;
        var indexInInline = 0;
        //let initial: number = indexInInline;
        var element = [];
        var fieldBegin = new FieldElementBox(0);
        element.push(fieldBegin);
        var span = new TextElementBox();
        if (isBookmark) {
            span.text = ' HYPERLINK \\l \"' + url + '\" ';
        }
        else {
            span.text = ' HYPERLINK \"' + url + '\" ';
        }
        element.push(span);
        var fieldSeparator = new FieldElementBox(2);
        element.push(fieldSeparator);
        if (!isNullOrUndefined(displayText) && displayText !== '') {
            span = new TextElementBox();
            span.characterFormat.underline = 'Single';
            span.characterFormat.fontColor = '#0563c1';
            span.text = displayText;
            element.push(span);
        }
        var fieldEnd = new FieldElementBox(1);
        element.push(fieldEnd);
        this.insertElement(element);
        //let paragraph: ParagraphWidget = selection.start.paragraph;
        fieldEnd.linkFieldCharacter(this.documentHelper);
        if (this.documentHelper.fields.indexOf(fieldBegin) === -1) {
            this.documentHelper.fields.push(fieldBegin);
        }
        //let offset: number = fieldEnd.line.getOffset(fieldEnd, 1);
        selection.selects(fieldEnd.line, fieldEnd.line.getOffset(fieldEnd, fieldEnd.length), true);
        this.updateEndPosition();
        this.reLayout(selection, true);
    };
    Editor.prototype.initInsertInline = function (element, insertHyperlink, isInsertRemovedBookamrk) {
        var selection = this.selection;
        var isSelectionUpdated = false;
        if (!this.isInsertingTOC && isInsertRemovedBookamrk && element instanceof BookmarkElementBox) {
            selection.start.offset--;
            selection.end.offset--;
            isSelectionUpdated = true;
        }
        this.initHistory('InsertInline');
        this.insertInlineInSelection(selection, element);
        if (this.editorHistory) {
            this.editorHistory.updateHistory();
        }
        if (isSelectionUpdated) {
            selection.start.offset++;
            selection.end.offset++;
        }
    };
    Editor.prototype.insertElementInCurrentLine = function (selection, inline) {
        if (this.checkIsNotRedoing()) {
            selection.owner.isShiftingEnabled = true;
        }
        if (!selection.isEmpty) {
            this.removeSelectedContents(selection);
        }
        this.updateInsertPosition();
        this.insertElement([inline]);
        if (this.checkEndPosition(selection)) {
            this.updateHistoryPosition(selection.start, false);
        }
        this.fireContentChange();
    };
    /**
     * Edit Hyperlink
     * @param {Selection} selection - Specified the selection
     * @param {string} url - Specifies the url
     * @param {string} displayText - Specified the display test
     * @param {boolean} isBookmark - Specifies is bookmark
     * @private
     * @returns {boolean} - Return tru of hyperlink is edited.
     */
    Editor.prototype.editHyperlink = function (selection, url, displayText, isBookmark) {
        var fieldBegin = selection.getHyperlinkField();
        if (isNullOrUndefined(fieldBegin)) {
            return false;
        }
        this.initHistory('InsertHyperlink');
        this.editHyperlinkInternal = isNullOrUndefined(this.editorHistory)
            || (this.editorHistory && isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo));
        var fieldResult = '';
        var isNestedField = false;
        // Preserves the character format for hyperlink field.
        var temp = this.getCharacterFormat(selection);
        var format = new WCharacterFormat();
        format.copyFormat(temp);
        var fieldSeparator = undefined;
        if (!isNullOrUndefined(fieldBegin.fieldSeparator)) {
            fieldSeparator = fieldBegin.fieldSeparator;
            var fieldObj = selection.getHyperlinkDisplayText(fieldBegin.fieldSeparator.line.paragraph, fieldBegin.fieldSeparator, fieldBegin.fieldEnd, isNestedField, format);
            fieldResult = fieldObj.displayText;
            isNestedField = fieldObj.isNestedField;
            format = fieldObj.format;
        }
        var offset = fieldBegin.line.getOffset(fieldBegin, 0);
        selection.start.setPositionParagraph(fieldBegin.line, offset);
        offset = fieldBegin.fieldEnd.line.getOffset(fieldBegin.fieldEnd, 1);
        selection.end.setPositionParagraph(fieldBegin.fieldEnd.line, offset);
        this.skipFieldDeleteTracking = true;
        this.deleteSelectedContents(selection, false);
        if (!isNestedField && fieldResult !== displayText || isNullOrUndefined(fieldSeparator)) {
            this.insertHyperlinkByFormat(selection, url, displayText, format, isBookmark);
            this.skipFieldDeleteTracking = false;
        }
        else {
            //Modify the new hyperlink url. Inserts field begin, url and field separator.
            this.updateInsertPosition();
            var newFieldBegin = new FieldElementBox(0);
            newFieldBegin.characterFormat.copyFormat(fieldBegin.characterFormat);
            newFieldBegin.line = selection.start.currentWidget;
            this.insertInlineInternal(newFieldBegin);
            var span = new TextElementBox();
            span.characterFormat.copyFormat(fieldBegin.characterFormat);
            if (isBookmark) {
                span.text = ' HYPERLINK \\l \"' + url + '\" ';
            }
            else {
                span.text = ' HYPERLINK \"' + url + '\" ';
            }
            span.line = selection.start.currentWidget;
            this.insertInlineInternal(span);
            var nodes = this.editorHistory && this.editorHistory.currentBaseHistoryInfo ?
                this.editorHistory.currentBaseHistoryInfo.removedNodes : this.nodes;
            this.insertClonedFieldResult(selection, nodes, fieldSeparator);
            var fieldEnd = selection.end.currentWidget.getInline(selection.end.offset, 0).element;
            fieldEnd.linkFieldCharacter(this.documentHelper);
            this.skipFieldDeleteTracking = false;
            var paragraph = newFieldBegin.line.paragraph;
            var lineIndex = newFieldBegin.line.paragraph.childWidgets.indexOf(newFieldBegin.line);
            var elementIndex = newFieldBegin.line.children.indexOf(newFieldBegin);
            this.documentHelper.layout.reLayoutParagraph(paragraph, lineIndex, elementIndex);
            offset = newFieldBegin.fieldEnd.line.getOffset(newFieldBegin.fieldEnd, 1);
            selection.selects(newFieldBegin.fieldEnd.line, offset, true);
            this.updateEndPosition();
            this.reLayout(selection, true);
        }
        this.editHyperlinkInternal = false;
        this.nodes = [];
        return true;
    };
    Editor.prototype.insertClonedFieldResult = function (selection, nodes, fieldSeparator) {
        var fieldEnd;
        var isStarted = false;
        for (var i = nodes.length - 1; i > -1; i--) {
            var node = nodes[i];
            if (!isStarted) {
                if (fieldSeparator === node) {
                    isStarted = true;
                }
                else {
                    if (node instanceof ParagraphWidget && node === fieldSeparator.line.paragraph) {
                        isStarted = true;
                        var paragraph = undefined;
                        if (i === nodes.length - 1) {
                            paragraph = selection.start.paragraph;
                            var fieldParagraph = fieldSeparator.line.paragraph;
                            this.getClonedFieldResultWithSel(fieldParagraph, selection, fieldSeparator);
                        }
                        else {
                            paragraph = this.getClonedFieldResult(fieldSeparator.line.paragraph, fieldSeparator);
                            this.insertParagraph(paragraph, true);
                        }
                        selection.selectParagraphInternal(selection.getNextParagraphBlock(paragraph), true);
                    }
                    continue;
                }
            }
            if (node instanceof ElementBox) {
                this.insertInlineInternal(node.clone());
            }
            else if (node instanceof BlockWidget) {
                this.insertBlock(node.clone());
            }
            // else if (node instanceof WSection)
            //     editor.insertSection((node as WSection)._Clone());
        }
    };
    Editor.prototype.getClonedFieldResultWithSel = function (paragraph, selection, fieldSeparator) {
        var lineIndex = paragraph.childWidgets.indexOf(fieldSeparator.line);
        var elementIndex = paragraph.childWidgets[lineIndex].children.indexOf(fieldSeparator);
        for (var j = lineIndex; j < paragraph.childWidgets.length; j++) {
            var lineWidget = paragraph.childWidgets[j];
            if (j !== lineIndex) {
                elementIndex = 0;
            }
            for (var i = elementIndex; i < lineWidget.children.length; i++) {
                this.insertInlineInternal(lineWidget.children[i].clone());
            }
        }
    };
    Editor.prototype.getClonedFieldResult = function (curParagraph, fieldSeparator) {
        var paragraph = new ParagraphWidget();
        paragraph.characterFormat.copyFormat(curParagraph.characterFormat);
        paragraph.paragraphFormat.copyFormat(curParagraph.paragraphFormat);
        var lineIndex = curParagraph.childWidgets.indexOf(fieldSeparator.line);
        var elementIndex = curParagraph.childWidgets[lineIndex].children.indexOf(fieldSeparator);
        for (var j = lineIndex; j < curParagraph.childWidgets.length; j++) {
            var lineWidget = curParagraph.childWidgets[j];
            if (j !== lineIndex) {
                elementIndex = 0;
            }
            for (var i = elementIndex; i < lineWidget.children.length; i++) {
                paragraph.childWidgets[0].children.push(lineWidget.children[i]);
            }
        }
        return paragraph;
    };
    /**
     * Removes the hyperlink if selection is within hyperlink.
     *
     * @returns {void}
     */
    Editor.prototype.removeHyperlink = function () {
        if (this.owner.isReadOnlyMode) {
            return;
        }
        var selection = this.selection;
        var fieldBegin = selection.getHyperlinkField();
        if (isNullOrUndefined(fieldBegin)) {
            return;
        }
        var fieldEnd = fieldBegin.fieldEnd;
        var fieldSeparator = fieldBegin.fieldSeparator;
        var fieldStartPosition = new TextPosition(selection.owner);
        fieldStartPosition.setPositionParagraph(fieldBegin.line, (fieldBegin.line).getOffset(fieldBegin, 0));
        var blockInfo = this.selection.getParagraphInfo(fieldStartPosition);
        var fieldStartString = this.selection.getHierarchicalIndex(blockInfo.paragraph, blockInfo.offset.toString());
        var fieldSeparatorPosition = new TextPosition(selection.owner);
        fieldSeparatorPosition.setPositionParagraph(fieldSeparator.line, (fieldSeparator.line).getOffset(fieldSeparator, fieldSeparator.length));
        blockInfo = this.selection.getParagraphInfo(fieldSeparatorPosition);
        var fieldSeparatorString = this.selection.getHierarchicalIndex(blockInfo.paragraph, blockInfo.offset.toString());
        this.initComplexHistory('RemoveHyperlink');
        selection.start.setPositionParagraph(fieldEnd.line, (fieldEnd.line).getOffset(fieldEnd, 0));
        blockInfo = this.selection.getParagraphInfo(selection.start);
        var startIndex = this.selection.getHierarchicalIndex(blockInfo.paragraph, blockInfo.offset.toString());
        selection.end.setPositionInternal(selection.start);
        this.delete();
        selection.start.setPositionInternal(this.selection.getTextPosBasedOnLogicalIndex(fieldSeparatorString));
        this.initHistory('Underline');
        this.updateCharacterFormatWithUpdate(selection, 'underline', 'None', false);
        if (this.editorHistory) {
            this.editorHistory.updateHistory();
        }
        selection.end.setPositionInternal(this.selection.getTextPosBasedOnLogicalIndex(startIndex));
        // Applies font color for field result.
        this.initHistory('FontColor');
        this.updateCharacterFormatWithUpdate(selection, 'fontColor', undefined, false);
        if (this.editorHistory) {
            this.editorHistory.updateHistory();
        }
        this.reLayout(selection, false);
        selection.end.setPositionInternal(selection.start);
        selection.start.setPositionInternal(this.selection.getTextPosBasedOnLogicalIndex(fieldStartString));
        this.initHistory('Delete');
        this.deleteSelectedContents(selection, false);
        this.reLayout(selection, true);
        if (this.editorHistory && !isNullOrUndefined(this.editorHistory.currentHistoryInfo)) {
            this.editorHistory.updateComplexHistory();
        }
    };
    //Paste Implementation starts
    /**
     * Paste copied clipboard content on Paste event
     * @param {ClipboardEvent} event - Specifies the paste event
     * @param {any} pasteWindow - Specifies the paste window
     * @private
     */
    Editor.prototype.pasteInternal = function (event, pasteWindow) {
        this.currentPasteOptions = this.owner.defaultPasteOption;
        this.isHtmlPaste = false;
        if (this.documentHelper.owner.enableLocalPaste) {
            this.paste();
        }
        else {
            this.selection.isViewPasteOptions = true;
            if (this.selection.pasteElement) {
                this.selection.pasteElement.style.display = 'none';
            }
            if (isNullOrUndefined(pasteWindow)) {
                pasteWindow = window;
            }
            var textContent = '';
            var htmlContent = '';
            var rtfContent = '';
            var clipbordData = pasteWindow.clipboardData ? pasteWindow.clipboardData : event.clipboardData;
            if (Browser.info.name !== 'msie') {
                rtfContent = clipbordData.getData('Text/Rtf');
                htmlContent = clipbordData.getData('Text/Html');
            }
            this.copiedTextContent = textContent = HelperMethods.sanitizeString(clipbordData.getData('Text'));
            this.previousCharFormat = new WCharacterFormat();
            this.previousCharFormat.copyFormat(this.selection.start.paragraph.characterFormat);
            this.previousParaFormat = new WParagraphFormat();
            this.previousParaFormat.copyFormat(this.selection.start.paragraph.paragraphFormat);
            if (this.documentHelper.protectionType === 'FormFieldsOnly' && this.documentHelper.selection.isInlineFormFillMode()) {
                htmlContent = '';
                rtfContent = '';
            }
            if (rtfContent !== '') {
                this.pasteAjax(rtfContent, '.rtf');
            }
            else if (htmlContent !== '') {
                this.isHtmlPaste = true;
                var doc = new DOMParser().parseFromString(htmlContent, 'text/html');
                var result = new XMLSerializer().serializeToString(doc);
                result = result.replace(/<!--StartFragment-->/gi, '');
                result = result.replace(/<!--EndFragment-->/gi, '');
                // Removed namesapce which is added when using XMLSerializer.
                // When copy content from MS Word, the clipboard html content already have same namespace which cause duplicate namespace
                // Here, removed the duplicate namespace.
                result = result.replace('xmlns="http://www.w3.org/1999/xhtml"', '');
                this.pasteAjax(result, '.html');
            }
            else if (textContent !== null && textContent !== '') {
                this.selection.currentPasteAction = 'TextOnly';
                this.pasteContents(textContent);
                this.applyPasteOptions(this.currentPasteOptions, true);
                this.copiedContent = undefined;
                this.documentHelper.editableDiv.innerHTML = '';
            }
            else if (Browser.info.name !== 'msie' && clipbordData.items !== undefined && clipbordData.items.length !== 0) {
                for (var m = 0; m < clipbordData.items.length; m++) {
                    var item = clipbordData.items[m];
                    if (item.type === 'image/png' || (item.type === "image/svg+xml" && item.kind !== 'string')) {
                        this.pasteImage(item.getAsFile());
                    }
                }
            }
            else if (Browser.info.name === 'msie' && clipbordData.files !== undefined && clipbordData.files.length !== 0 &&
                (clipbordData.files[0].type === 'image/png')) {
                this.pasteImage(clipbordData.files[0]);
            }
            // if (textContent !== '') {
            //     this.pasteContents(textContent);
            //     this.documentHelper.editableDiv.innerHTML = '';
            // }
        }
    };
    Editor.prototype.pasteImage = function (imgFile) {
        var _this = this;
        var fileReader = new FileReader();
        fileReader.onload = function () {
            _this.onPasteImage(fileReader.result);
        };
        fileReader.readAsDataURL(imgFile);
    };
    /**
     * @private
     * @returns {void}
     */
    Editor.prototype.onPasteImage = function (data) {
        var image = document.createElement('img');
        var editor = this;
        image.addEventListener('load', function () {
            editor.insertImage(data, this.width, this.height, this.alt);
        });
        image.src = data;
    };
    Editor.prototype.pasteAjax = function (content, type) {
        var proxy = this;
        /* eslint-disable @typescript-eslint/no-explicit-any */
        var formObject = {
            content: content,
            type: type
        };
        var editor = this;
        this.pasteRequestHandler = new XmlHttpRequestHandler();
        this.owner.documentHelper.viewerContainer.focus();
        showSpinner(this.owner.element);
        this.pasteRequestHandler.url = proxy.owner.serviceUrl + this.owner.serverActionSettings.systemClipboard;
        this.pasteRequestHandler.responseType = 'json';
        this.pasteRequestHandler.contentType = 'application/json;charset=UTF-8';
        this.pasteRequestHandler.customHeaders = proxy.owner.headers;
        this.pasteRequestHandler.onSuccess = this.pasteFormattedContent.bind(this);
        this.pasteRequestHandler.onFailure = this.onPasteFailure.bind(this);
        this.pasteRequestHandler.onError = this.onPasteFailure.bind(this);
        var httprequestEventArgs = { serverActionType: 'SystemClipboard', headers: this.owner.headers, timeout: 0, cancel: false, withCredentials: false, clipboardData: formObject };
        this.owner.trigger(beforeXmlHttpRequestSend, httprequestEventArgs);
        if (httprequestEventArgs.cancel) {
            hideSpinner(this.owner.element);
        }
        else {
            this.pasteRequestHandler.send(formObject, httprequestEventArgs);
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Editor.prototype.pasteFormattedContent = function (result) {
        var _this = this;
        if (this.isPasteListUpdated) {
            this.isPasteListUpdated = false;
        }
        this.pasteContents(isNullOrUndefined(result.data) ? this.copiedTextContent : HelperMethods.getSfdtDocument(result.data));
        if (this.currentPasteOptions !== 'KeepSourceFormatting') {
            this.applyPasteOptions(this.currentPasteOptions);
        }
        hideSpinner(this.owner.element);
        setTimeout(function () {
            if (!isNullOrUndefined(_this.viewer)) {
                _this.documentHelper.isScrollHandler = true;
                _this.isPasteContentCheck = true;
                _this.viewer.updateScrollBars();
                _this.documentHelper.isScrollHandler = false;
                _this.isPasteContentCheck = false;
            }
        }, 0);
    };
    Editor.prototype.onPasteFailure = function (result) {
        this.owner.fireServiceFailure(result);
        console.error(result.status, result.statusText);
        hideSpinner(this.owner.element);
        this.documentHelper.updateFocus();
    };
    /**
     * Pastes the provided sfdt content or the data present in local clipboard if any.
     *
     * @param {string} sfdt Specifies the sfdt content to paste at current position.
     * @param {PasteOptions} defaultPasteOption Specifies the paste options.
     * @returns {void}
     */
    Editor.prototype.paste = function (sfdt, defaultPasteOption) {
        var _this = this;
        if (isNullOrUndefined(sfdt)) {
            sfdt = this.owner.enableLocalPaste ? HelperMethods.sanitizeString(this.copiedData) : undefined;
        }
        if (!isNullOrUndefined(defaultPasteOption)) {
            this.currentPasteOptions = defaultPasteOption;
        }
        /* eslint-disable @typescript-eslint/no-explicit-any */
        if (sfdt) {
            var document_1 = HelperMethods.getSfdtDocument(sfdt);
            this.pasteContents(document_1);
            this.applyPasteOptions(this.currentPasteOptions);
            if (this.chartType) {
                setTimeout(function () {
                    if (!isNullOrUndefined(_this.viewer)) {
                        _this.viewer.updateScrollBars();
                    }
                }, 30);
                this.chartType = false;
            }
        }
    };
    Editor.prototype.getUniqueListOrAbstractListId = function (isList) {
        if (isList && this.documentHelper.lists.length) {
            var sortedList = this.documentHelper.lists.slice().sort(function (a, b) {
                return a.listId - b.listId;
            });
            return sortedList[sortedList.length - 1].listId + 1;
        }
        else if (this.documentHelper.abstractLists.length) {
            var sortedAbsList = this.documentHelper.abstractLists.slice().sort(function (a, b) {
                return a.abstractListId - b.abstractListId;
            });
            return sortedAbsList[sortedAbsList.length - 1].abstractListId + 1;
        }
        return 0;
    };
    Editor.prototype.checkSameLevelFormat = function (lstLevelNo, abstractList, list) {
        return abstractList[levelsProperty[this.keywordIndex]][lstLevelNo][listLevelPatternProperty[this.keywordIndex]] === list.abstractList.levels[lstLevelNo].listLevelPattern
            && abstractList[levelsProperty[this.keywordIndex]][lstLevelNo][numberFormatProperty[this.keywordIndex]] === list.abstractList.levels[lstLevelNo].numberFormat
            && (abstractList[levelsProperty[this.keywordIndex]][lstLevelNo][listLevelPatternProperty[this.keywordIndex]] === (this.keywordIndex == 1 ? 10 : 'Bullet')
                || abstractList[levelsProperty[this.keywordIndex]][lstLevelNo][startAtProperty[this.keywordIndex]] === list.abstractList.levels[lstLevelNo].startAt);
    };
    Editor.prototype.listLevelPatternInCollection = function (lstLevelNo, listLevel) {
        var _this = this;
        return this.documentHelper.lists.filter(function (list) {
            return list.abstractList.levels[lstLevelNo].listLevelPattern === listLevel[listLevelPatternProperty[_this.keywordIndex]]
                && list.abstractList.levels[lstLevelNo].numberFormat === listLevel[numberFormatProperty[_this.keywordIndex]]
                && (listLevel[listLevelPatternProperty[_this.keywordIndex]] === (_this.keywordIndex == 1 ? 10 : 'Bullet') || list.abstractList.levels[lstLevelNo].startAt === listLevel[startAtProperty[_this.keywordIndex]])
                && _this.isEqualParagraphFormat(list.abstractList.levels[lstLevelNo].paragraphFormat, listLevel[paragraphFormatProperty[_this.keywordIndex]]);
        })[0];
    };
    Editor.prototype.isEqualParagraphFormat = function (source, dest) {
        if ((isNullOrUndefined(dest[leftIndentProperty[this.keywordIndex]]) && source.leftIndent !== 0)
            || (!isNullOrUndefined(dest[leftIndentProperty[this.keywordIndex]]) && Math.round(source.leftIndent) !== Math.round(dest[leftIndentProperty[this.keywordIndex]]))) {
            return false;
        }
        if ((isNullOrUndefined(dest[rightIndentProperty[this.keywordIndex]]) && source.rightIndent !== 0)
            || (!isNullOrUndefined(dest[rightIndentProperty[this.keywordIndex]]) && Math.round(source.rightIndent) !== Math.round(dest[rightIndentProperty[this.keywordIndex]]))) {
            return false;
        }
        if ((isNullOrUndefined(dest[firstLineIndentProperty[this.keywordIndex]]) && source.firstLineIndent !== 0)
            || (!isNullOrUndefined(dest[firstLineIndentProperty[this.keywordIndex]]) && Math.round(source.firstLineIndent) !== Math.round(dest[firstLineIndentProperty[this.keywordIndex]]))) {
            return false;
        }
        if ((isNullOrUndefined(dest[beforeSpacingProperty[this.keywordIndex]]) && source.beforeSpacing !== 0)
            || (!isNullOrUndefined(dest[beforeSpacingProperty[this.keywordIndex]]) && Math.round(source.beforeSpacing) !== Math.round(dest[beforeSpacingProperty[this.keywordIndex]]))) {
            return false;
        }
        if ((isNullOrUndefined(dest[afterSpacingProperty[this.keywordIndex]]) && source.afterSpacing !== 0)
            || (!isNullOrUndefined(dest.afterSpacing) && Math.round(source.afterSpacing) !== Math.round(dest[afterSpacingProperty[this.keywordIndex]]))) {
            return false;
        }
        if ((isNullOrUndefined(dest[textAlignmentProperty[this.keywordIndex]]) && source.textAlignment !== 'Left')
            || (!isNullOrUndefined(dest[textAlignmentProperty[this.keywordIndex]]) && source.textAlignment !== dest[textAlignmentProperty[this.keywordIndex]])) {
            return false;
        }
        if ((isNullOrUndefined(dest[bidiProperty[this.keywordIndex]]) && source.bidi !== false)
            || (!isNullOrUndefined(dest[bidiProperty[this.keywordIndex]]) && source.bidi !== dest[bidiProperty[this.keywordIndex]])) {
            return false;
        }
        if ((isNullOrUndefined(dest[contextualSpacingProperty[this.keywordIndex]]) && source.contextualSpacing !== false)
            || (!isNullOrUndefined(dest.contextualSpacing) && source.contextualSpacing !== dest[contextualSpacingProperty[this.keywordIndex]])) {
            return false;
        }
        if ((isNullOrUndefined(dest[keepWithNextProperty[this.keywordIndex]]) && source.keepWithNext !== false)
            || (!isNullOrUndefined(dest[keepWithNextProperty[this.keywordIndex]]) && source.keepWithNext !== dest[keepWithNextProperty[this.keywordIndex]])) {
            return false;
        }
        if ((isNullOrUndefined(dest[keepLinesTogetherProperty[this.keywordIndex]]) && source.keepLinesTogether !== false)
            || (!isNullOrUndefined(dest[keepLinesTogetherProperty[this.keywordIndex]]) && source.keepLinesTogether !== dest[keepLinesTogetherProperty[this.keywordIndex]])) {
            return false;
        }
        if ((isNullOrUndefined(dest[widowControlProperty[this.keywordIndex]]) && source.widowControl !== false)
            || (!isNullOrUndefined(dest[widowControlProperty[this.keywordIndex]]) && source.widowControl !== dest[widowControlProperty[this.keywordIndex]])) {
            return false;
        }
        if ((isNullOrUndefined(dest[outlineLevelProperty[this.keywordIndex]]) && source.outlineLevel !== 'BodyText')
            || (!isNullOrUndefined(dest[outlineLevelProperty[this.keywordIndex]]) && source.outlineLevel !== dest[outlineLevelProperty[this.keywordIndex]])) {
            return false;
        }
        if ((isNullOrUndefined(dest[lineSpacingProperty[this.keywordIndex]]) && source.lineSpacing !== 1)
            || (!isNullOrUndefined(dest[lineSpacingProperty[this.keywordIndex]]) && Math.round(source.lineSpacing) !== Math.round(dest[lineSpacingProperty[this.keywordIndex]]))) {
            return false;
        }
        if ((isNullOrUndefined(dest[lineSpacingTypeProperty[this.keywordIndex]]) && source.lineSpacingType !== 'Multiple')
            || (!isNullOrUndefined(dest[lineSpacingTypeProperty[this.keywordIndex]]) && source.lineSpacingType !== dest[lineSpacingTypeProperty[this.keywordIndex]])) {
            return false;
        }
        return true;
    };
    Editor.prototype.getBlocksToUpdate = function (blocks) {
        var blcks = [];
        for (var i = 0; i < blocks.length; i++) {
            var obj = blocks[i];
            if (obj[paragraphFormatProperty[this.keywordIndex]] && obj[paragraphFormatProperty[this.keywordIndex]][listFormatProperty[this.keywordIndex]]
                && Object.keys(obj[paragraphFormatProperty[this.keywordIndex]][listFormatProperty[this.keywordIndex]]).length > 0) {
                blcks.push(obj);
            }
            else if (obj[rowsProperty[this.keywordIndex]]) {
                for (var j = 0; j < obj[rowsProperty[this.keywordIndex]].length; j++) {
                    var currentRow = obj[rowsProperty[this.keywordIndex]][j];
                    for (var k = 0; k < currentRow[cellsProperty[this.keywordIndex]].length; k++) {
                        var cell = currentRow[cellsProperty[this.keywordIndex]][k];
                        blcks = blcks.concat(this.getBlocksToUpdate(cell[blocksProperty[this.keywordIndex]]));
                    }
                }
            }
        }
        return blcks;
    };
    Editor.prototype.updateListIdForBlocks = function (blocks, abstractList, list, id, idToUpdate) {
        var update = false;
        for (var i = 0; i < blocks.length; i++) {
            var obj = blocks[i];
            if (obj[paragraphFormatProperty[this.keywordIndex]] && obj[paragraphFormatProperty[this.keywordIndex]][listFormatProperty[this.keywordIndex]]
                && Object.keys(obj[paragraphFormatProperty[this.keywordIndex]][listFormatProperty[this.keywordIndex]]).length > 0) {
                var format = obj[paragraphFormatProperty[this.keywordIndex]][listFormatProperty[this.keywordIndex]];
                var existingList = this.listLevelPatternInCollection(format[listLevelNumberProperty[this.keywordIndex]], abstractList[levelsProperty[this.keywordIndex]][format[listLevelNumberProperty[this.keywordIndex]]]);
                if (format[listIdProperty[this.keywordIndex]] === id) {
                    if (isNullOrUndefined(existingList) && (!list || (list
                        && !this.checkSameLevelFormat(format[listLevelNumberProperty[this.keywordIndex]], abstractList, list)))) {
                        update = true;
                        format[listIdProperty[this.keywordIndex]] = idToUpdate;
                    }
                    else if (!isNullOrUndefined(existingList)
                        && this.checkSameLevelFormat(format[listLevelNumberProperty[this.keywordIndex]], abstractList, existingList)) {
                        if (!format.isUpdated) {
                            format[listIdProperty[this.keywordIndex]] = existingList[listIdProperty[this.keywordIndex]];
                            format.isUpdated = true;
                        }
                        update = false;
                    }
                }
            }
            else if (obj[rowsProperty[this.keywordIndex]]) {
                for (var j = 0; j < obj[rowsProperty[this.keywordIndex]].length; j++) {
                    var row = obj[rowsProperty[this.keywordIndex]][j];
                    for (var k = 0; k < row[cellsProperty[this.keywordIndex]].length; k++) {
                        var cell = row[cellsProperty[this.keywordIndex]][k];
                        var toUpdate = this.updateListIdForBlocks(cell[blocksProperty[this.keywordIndex]], abstractList, list, id, idToUpdate);
                        if (!update) {
                            update = toUpdate;
                        }
                    }
                }
            }
        }
        return update;
    };
    Editor.prototype.updatePasteContent = function (pasteContent, sectionId) {
        var _this = this;
        var uniqueListId = this.getUniqueListOrAbstractListId(true);
        if (pasteContent[listsProperty[this.keywordIndex]].filter(function (obj) { return obj[listIdProperty[_this.keywordIndex]] === uniqueListId; }).length > 0) {
            var sortedPasteList = pasteContent[listsProperty[this.keywordIndex]].slice().sort(function (a, b) {
                return a[listIdProperty[_this.keywordIndex]] - b[listIdProperty[_this.keywordIndex]];
            });
            uniqueListId = sortedPasteList[sortedPasteList.length - 1][listIdProperty[this.keywordIndex]] + 1;
        }
        var uniqueAbsLstId = this.getUniqueListOrAbstractListId(false);
        if (pasteContent[abstractListsProperty[this.keywordIndex]].filter(function (obj) {
            return obj[abstractListIdProperty[_this.keywordIndex]] === uniqueAbsLstId;
        }).length > 0) {
            var sortedPasteAbsList = pasteContent[abstractListsProperty[this.keywordIndex]].slice().sort(function (a, b) {
                return a[abstractListIdProperty[_this.keywordIndex]] - b[abstractListIdProperty[_this.keywordIndex]];
            });
            uniqueAbsLstId = sortedPasteAbsList[sortedPasteAbsList.length - 1][abstractListIdProperty[this.keywordIndex]] + 1;
        }
        var _loop_1 = function (k) {
            var list = pasteContent[listsProperty[this_1.keywordIndex]][k];
            var abstractList = pasteContent[abstractListsProperty[this_1.keywordIndex]].filter(function (obj) {
                return obj[abstractListIdProperty[_this.keywordIndex]] === list[abstractListIdProperty[_this.keywordIndex]];
            })[0];
            var lstDup = this_1.documentHelper.lists.filter(function (obj) {
                return obj.listId === list[listIdProperty[_this.keywordIndex]];
            });
            if (!isNullOrUndefined(abstractList)) {
                var isUpdate = this_1.updateListIdForBlocks(pasteContent[sectionsProperty[this_1.keywordIndex]][sectionId][blocksProperty[this_1.keywordIndex]], abstractList, lstDup[0], list[listIdProperty[this_1.keywordIndex]], uniqueListId);
                if (isUpdate) {
                    abstractList[abstractListIdProperty[this_1.keywordIndex]] = uniqueAbsLstId;
                    list[listIdProperty[this_1.keywordIndex]] = uniqueListId;
                    list[abstractListIdProperty[this_1.keywordIndex]] = uniqueAbsLstId;
                    uniqueListId++;
                    uniqueAbsLstId++;
                }
                else {
                    pasteContent[listsProperty[this_1.keywordIndex]].splice(k, 1);
                    pasteContent[abstractListsProperty[this_1.keywordIndex]].splice(pasteContent[abstractListsProperty[this_1.keywordIndex]].indexOf(abstractList), 1);
                    k--;
                }
            }
            out_k_1 = k;
        };
        var this_1 = this, out_k_1;
        for (var k = 0; k < pasteContent[listsProperty[this.keywordIndex]].length; k++) {
            _loop_1(k);
            k = out_k_1;
        }
        var blocks = this.getBlocksToUpdate(pasteContent[sectionsProperty[this.keywordIndex]][sectionId][blocksProperty[this.keywordIndex]]);
        for (var i = 0; i < blocks.length; i++) {
            var blck = blocks[i];
            delete blck[paragraphFormatProperty[this.keywordIndex]][listFormatProperty[this.keywordIndex]].isUpdated;
        }
    };
    /**
     * @private
     */
    Editor.prototype.getBlocks = function (pasteContent, isPaste, sections, comments, revision) {
        var widgets = [];
        if (typeof (pasteContent) === 'string') {
            var startParagraph = this.selection.start.paragraph;
            if (!this.selection.isForward) {
                startParagraph = this.selection.end.paragraph;
            }
            var arr = [];
            var txt = pasteContent;
            txt = txt.replace(/\r\n/g, '\r');
            if (this.isInsertText) {
                if (navigator !== undefined && navigator.userAgent.indexOf('Firefox') !== -1) {
                    txt = txt.replace(/\r/g, '\n');
                }
                else {
                    txt = txt.replace(/\n/g, '\r');
                }
            }
            if (navigator !== undefined && navigator.userAgent.indexOf('Firefox') !== -1) {
                arr = txt.split('\n');
            }
            else {
                arr = txt.split('\r');
            }
            var widget = [];
            var bodyWidget = new BodyWidget();
            bodyWidget.sectionFormat = new WSectionFormat(bodyWidget);
            bodyWidget.childWidgets = widget;
            for (var i = 0; i < arr.length; i++) {
                if (i === arr.length - 1 && arr[i].length === 0) {
                    continue;
                }
                var currentInline = this.selection.start.currentWidget.getInline(this.selection.start.offset, 0);
                var element = this.selection.getPreviousValidElement(currentInline.element);
                if (element !== currentInline.element) {
                    element = this.selection.getNextValidElement(currentInline.element);
                }
                var insertFormat = void 0;
                if (startParagraph.isEmpty()) {
                    insertFormat = startParagraph.characterFormat;
                }
                else if (!isNullOrUndefined(element)) {
                    insertFormat = element.characterFormat;
                }
                else {
                    this.copyInsertFormat(startParagraph.characterFormat, false);
                }
                var insertParaFormat = this.documentHelper.selection.copySelectionParagraphFormat();
                if (!isNullOrUndefined(this.previousParaFormat)) {
                    insertParaFormat = this.previousParaFormat;
                }
                var paragraph = new ParagraphWidget();
                paragraph.paragraphFormat.copyFormat(insertParaFormat);
                var line = new LineWidget(paragraph);
                if (arr[i].length > 0) {
                    //Too many character in single line it took time past the content will cause layout performance, so spliting by space.
                    var words = arr[i].split(/(\s+)/);
                    for (var j = 0; j < words.length; j++) {
                        var textElement = new TextElementBox();
                        textElement.characterFormat.copyFormat(insertFormat);
                        textElement.text = words[j];
                        line.children.push(textElement);
                        textElement.line = line;
                    }
                }
                paragraph.childWidgets.push(line);
                paragraph.containerWidget = bodyWidget;
                widget.push(paragraph);
            }
            widgets.push(bodyWidget);
        }
        else {
            this.viewer.owner.parser.addCustomStyles(pasteContent);
            if (pasteContent[commentsProperty[this.keywordIndex]] && pasteContent[commentsProperty[this.keywordIndex]].length > 0) {
                this.documentHelper.owner.parser.commentsCollection = new Dictionary();
                this.documentHelper.owner.parser.commentStarts = new Dictionary();
                this.documentHelper.owner.parser.commentEnds = new Dictionary();
                this.documentHelper.owner.parser.parseComments(pasteContent, comments ? comments : this.documentHelper.comments);
            }
            var bodyWidget = void 0;
            this.selection.currentPasteAction = 'DefaultPaste';
            for (var i = 0; i < pasteContent[sectionsProperty[this.keywordIndex]].length; i++) {
                var parser = this.documentHelper.owner.parser;
                parser.keywordIndex = this.keywordIndex;
                parser.isPaste = isPaste;
                parser.isHtmlPaste = this.isHtmlPaste;
                if (!this.isPasteListUpdated && !isNullOrUndefined(pasteContent[listsProperty[this.keywordIndex]])) {
                    if (this.documentHelper.lists.length > 0) {
                        this.updatePasteContent(pasteContent, i);
                    }
                    this.isPasteListUpdated = true;
                    if (!isNullOrUndefined(pasteContent[abstractListsProperty[this.keywordIndex]])) {
                        parser.parseAbstractList(pasteContent, this.documentHelper.abstractLists);
                    }
                    if (!isNullOrUndefined(pasteContent[listsProperty[this.keywordIndex]])) {
                        parser.parseList(pasteContent, this.documentHelper.lists);
                    }
                }
                if (!isNullOrUndefined(pasteContent[revisionsProperty[this.keywordIndex]])) {
                    if (isPaste) {
                        var revisionChanges = this.viewer.owner.revisionsInternal.changes;
                        if (!isNullOrUndefined(parser.revisionCollection)) {
                            parser.revisionCollection = undefined;
                        }
                        parser.revisionCollection = new Dictionary();
                        var revisionCollection = parser.revisionCollection;
                        if (!(this.documentHelper.owner.sfdtExportModule.copyWithTrackChange && parser.isCutPerformed)) {
                            if (pasteContent[revisionsProperty[this.keywordIndex]].length >= 1) {
                                for (var i_1 = 0; i_1 < pasteContent[revisionsProperty[this.keywordIndex]].length; i_1++) {
                                    var revisionCheck = true;
                                    if (revisionCollection.containsKey(pasteContent[revisionsProperty[this.keywordIndex]][i_1][revisionIdProperty[this.keywordIndex]])) {
                                        if (revisionChanges.length > 0) {
                                            for (var j_1 = 0; j_1 < revisionChanges.length; j_1++) {
                                                if (revisionChanges[j_1].revisionID === pasteContent[revisionsProperty[this.keywordIndex]][i_1][revisionIdProperty[this.keywordIndex]]) {
                                                    revisionCheck = false;
                                                }
                                            }
                                        }
                                        if (revisionCheck) {
                                            var revision_1 = revisionCollection.get(pasteContent[revisionsProperty[this.keywordIndex]][i_1][revisionIdProperty[this.keywordIndex]]);
                                            revisionChanges.push(revision_1);
                                        }
                                    }
                                    else {
                                        parser.parseRevisions(pasteContent, revisionChanges);
                                    }
                                }
                            }
                        }
                        this.documentHelper.owner.sfdtExportModule.copyWithTrackChange = false;
                    }
                    else {
                        parser.revisionCollection = this.documentHelper.revisionsInternal;
                        parser.parseRevisions(pasteContent, revision);
                    }
                }
                bodyWidget = new BodyWidget();
                bodyWidget.sectionFormat = new WSectionFormat(bodyWidget);
                if (!isPaste) {
                    sections.unshift(bodyWidget);
                }
                else {
                    widgets.push(bodyWidget);
                }
                if (isPaste && !isNullOrUndefined(pasteContent[stylesProperty[this.keywordIndex]])) {
                    for (var j = 0; j < pasteContent[stylesProperty[this.keywordIndex]].length; j++) {
                        var styleName = pasteContent[stylesProperty[this.keywordIndex]][j][nameProperty[this.keywordIndex]];
                        var style = this.documentHelper.styles.findByName(styleName);
                        if (isNullOrUndefined(style)) {
                            parser.parseStyle(pasteContent, pasteContent[stylesProperty[this.keywordIndex]][j], this.documentHelper.styles);
                        }
                    }
                }
                parser.parseBody(pasteContent[sectionsProperty[this.keywordIndex]][i][blocksProperty[this.keywordIndex]], bodyWidget.childWidgets, undefined, undefined, undefined, pasteContent[stylesProperty[this.keywordIndex]]);
                if (pasteContent[lastParagraphMarkCopiedProperty[this.keywordIndex]] && this.selection.start.paragraph.isEmpty() && this.documentHelper.pages.length == 1 && this.documentHelper.pages[0].bodyWidgets[0].childWidgets.length == 1) {
                    parser.parseSectionFormat(this.keywordIndex, pasteContent[sectionsProperty[this.keywordIndex]][i][sectionFormatProperty[this.keywordIndex]], bodyWidget.sectionFormat);
                }
                parser.isPaste = false;
                parser.isHtmlPaste = false;
            }
            if (pasteContent[lastParagraphMarkCopiedProperty[this.keywordIndex]]) {
                var paragraphWidget = new ParagraphWidget();
                bodyWidget.childWidgets.push(paragraphWidget);
            }
        }
        if (this.currentPasteOptions === 'MergeWithExistingFormatting') {
            this.applyMergeFormat(widgets);
        }
        return widgets;
    };
    Editor.prototype.applyMergeFormat = function (bodyWidgets) {
        var startParagraph = this.selection.start.paragraph;
        var currentInline = this.selection.start.currentWidget.getInline(this.selection.start.offset, 0);
        var element = this.selection.getPreviousValidElement(currentInline.element);
        var insertFormat = element ? element.characterFormat :
            this.copyInsertFormat(startParagraph.characterFormat, false);
        var insertParaFormat = this.documentHelper.selection.copySelectionParagraphFormat();
        for (var k = 0; k < bodyWidgets.length; k++) {
            var widgets = bodyWidgets[k].childWidgets;
            for (var i = 0; i < widgets.length; i++) {
                var widget = widgets[i];
                if (widget instanceof ParagraphWidget) {
                    widget.paragraphFormat.copyFormat(insertParaFormat);
                    this.applyFormatInternal(widget, insertFormat);
                }
                else {
                    for (var j = 0; j < widget.childWidgets.length; j++) {
                        var row = widget.childWidgets[j];
                        for (var k_1 = 0; k_1 < row.childWidgets.length; k_1++) {
                            var cell = row.childWidgets[k_1];
                            for (var l = 0; l < cell.childWidgets.length; l++) {
                                this.applyFormatInternal(cell.childWidgets[l], insertFormat);
                            }
                        }
                    }
                }
            }
        }
    };
    Editor.prototype.applyFormatInternal = function (widget, insertFormat) {
        if (widget instanceof ParagraphWidget) {
            for (var j = 0; j < widget.childWidgets.length; j++) {
                var lineWidget = widget.childWidgets[j];
                for (var k = 0; k < lineWidget.children.length; k++) {
                    var inlineCharacterFormat = lineWidget.children[k].characterFormat;
                    var characterFormat = inlineCharacterFormat.cloneFormat();
                    if (characterFormat.bold) {
                        lineWidget.children[k].characterFormat.bold = characterFormat.bold;
                    }
                    if (characterFormat.italic) {
                        lineWidget.children[k].characterFormat.italic = characterFormat.italic;
                    }
                    if (characterFormat.underline !== 'None') {
                        lineWidget.children[k].characterFormat.underline = characterFormat.underline;
                    }
                }
            }
        }
        else {
            for (var j = 0; j < widget.childWidgets.length; j++) {
                var rowWidget = widget.childWidgets[j];
                for (var k = 0; k < rowWidget.childWidgets.length; k++) {
                    var cellWidget = rowWidget.childWidgets[k];
                    for (var l = 0; l < cellWidget.childWidgets.length; l++) {
                        this.applyFormatInternal(cellWidget.childWidgets[l], insertFormat);
                    }
                }
            }
        }
    };
    /**
     * @private
     */
    Editor.prototype.applyPasteOptions = function (options, isPasteOptionTextOnly) {
        if (isNullOrUndefined(this.copiedContent) || this.copiedTextContent === '' || isPasteOptionTextOnly) {
            return;
        }
        //this.isSkipHistory = true;
        this.currentPasteOptions = options;
        var start = this.selection.isForward ? this.selection.start : this.selection.end;
        var currentFormat = start.paragraph.paragraphFormat;
        var copiedContent = this.copiedContent;
        var copiedTextContent = this.copiedTextContent;
        if (this.editorHistory && this.editorHistory.canUndo()) {
            this.editorHistory.undo();
            this.editorHistory.redoStack.pop();
        }
        this.copiedContent = copiedContent;
        this.copiedTextContent = copiedTextContent;
        this.selection.isViewPasteOptions = true;
        // }
        switch (options) {
            case 'KeepSourceFormatting':
                this.pasteContents(this.copiedContent !== '' ? this.copiedContent : this.copiedTextContent);
                break;
            case 'MergeWithExistingFormatting':
                this.pasteContents(this.copiedContent !== '' ? this.copiedContent : this.copiedTextContent, currentFormat);
                break;
            case 'KeepTextOnly':
                this.pasteContents(this.copiedTextContent);
                break;
        }
        //this.isSkipHistory = false;
    };
    /**
     * @private
     */
    Editor.prototype.applyTablePasteOptions = function (options) {
        if (isNullOrUndefined(this.copiedContent) || this.copiedTextContent === '') {
            return;
        }
        this.isPaste = true;
        var copiedContent = this.copiedContent !== '' ? this.copiedContent : this.copiedTextContent;
        if (this.editorHistory && this.editorHistory.canUndo()) {
            this.editorHistory.undo();
            this.editorHistory.redoStack.pop();
        }
        var widgets = this.getBlocks(copiedContent, true);
        var currentFormat = this.selection.start.paragraph.paragraphFormat;
        switch (options) {
            case 'NestTable':
                this.pasteAsNestedTable(widgets, currentFormat);
                break;
            case 'InsertAsRows':
                this.pasteAsNewRow(widgets[0].childWidgets[0]);
                break;
            case 'InsertAsColumns':
                this.pasteAsNewColumn(widgets[0].childWidgets[0]);
                break;
            case 'OverwriteCells':
                this.pasteOverwriteCell(widgets[0].childWidgets[0]);
                break;
        }
        this.isPaste = false;
    };
    /**
     * @private
     * @returns {void}
     */
    Editor.prototype.pasteContents = function (content, currentFormat) {
        if (!isNullOrUndefined(content.optimizeSfdt) && content.optimizeSfdt) {
            this.keywordIndex = 1;
        }
        if (typeof (content) !== 'string') {
            this.copiedContent = content;
        }
        if (this.documentHelper.protectionType === 'FormFieldsOnly' && this.documentHelper.selection.isInlineFormFillMode()) {
            var inline = this.selection.getCurrentFormField();
            var resultText = this.getFieldResultText();
            var maxLength = inline.formFieldData.maxLength;
            var selectedTextLength = this.documentHelper.selection.text.length;
            if (maxLength > 0) {
                if (selectedTextLength === 0) {
                    var contentlength = maxLength - resultText.length;
                    content = content.substring(0, contentlength);
                }
                else if (selectedTextLength > 0) {
                    content = content.substring(0, selectedTextLength);
                }
            }
        }
        if (!isNullOrUndefined(content[imagesProperty[this.keywordIndex]])) {
            var images = content[imagesProperty[this.keywordIndex]];
            if (this.documentHelper.images.length > 0) {
                this.pasteImageIndex = new Dictionary();
                var newImages = {};
                for (var img in images) {
                    var newIndex = this.documentHelper.images.length + parseInt(img);
                    newImages[newIndex] = images[img];
                    this.pasteImageIndex.add(img, newIndex.toString());
                }
                content[imagesProperty[this.keywordIndex]] = newImages;
                images = newImages;
            }
            this.documentHelper.owner.parser.parseImages(images);
        }
        this.pasteContentsInternal(this.getBlocks(content, true), true, currentFormat);
        if (content[commentsProperty[this.keywordIndex]] && content[commentsProperty[this.keywordIndex]].length > 0) {
            this.documentHelper.layout.layoutComments(this.documentHelper.comments);
        }
        if (!isNullOrUndefined(this.pasteImageIndex)) {
            this.pasteImageIndex.destroy();
        }
        this.pasteImageIndex = undefined;
        this.isInsertField = false;
    };
    Editor.prototype.pasteContentsInternal = function (widgets, isPaste, currentFormat) {
        this.isPaste = isPaste;
        var selection = this.documentHelper.selection;
        if (selection.start.paragraph.isInsideTable && selection.end.paragraph.isInsideTable) {
            var isTablePaste = false;
            if (widgets.length === 1) {
                var childWidgets = widgets[0].childWidgets;
                if ((childWidgets.length < 3)) {
                    if (childWidgets.length === 1 && childWidgets[0] instanceof TableWidget || childWidgets.length === 2 && childWidgets[0] instanceof TableWidget && childWidgets[1].isEmpty()) {
                        isTablePaste = true;
                    }
                }
            }
            if (isTablePaste) {
                var startCell = selection.start.paragraph.associatedCell;
                var endCell = selection.end.paragraph.associatedCell;
                var newTable = widgets[0].childWidgets[0];
                // tslint:disable-next-line:max-line-length
                if (startCell.ownerTable.equals(endCell.ownerTable)) {
                    if (selection.start.paragraph.associatedCell.rowIndex === 0 && selection.end.paragraph.associatedCell.rowIndex === 0
                        && startCell.equals(endCell) && !this.selection.isCellSelected(startCell, selection.start, selection.end)) {
                        this.selection.currentPasteAction = 'InsertAsColumns';
                        this.pasteAsNewColumn(newTable);
                    }
                    else {
                        this.selection.currentPasteAction = 'OverwriteCells';
                        this.pasteOverwriteCell(newTable);
                    }
                    this.isPaste = false;
                    return;
                }
            }
        }
        var commentStartToInsert;
        //if (!this.isSkipHistory) {
        commentStartToInsert = this.checkAndRemoveComments();
        //}
        this.defaultPaste(widgets, currentFormat);
        //if (!this.isSkipHistory) {
        this.updateHistoryForComments(commentStartToInsert);
        //}
    };
    Editor.prototype.defaultPaste = function (widgets, currentFormat) {
        var selection = this.documentHelper.selection;
        var isRemoved = true;
        var layoutWholeDocument = false;
        //if (!this.isSkipHistory) {
        this.initComplexHistory('Paste');
        //}
        if (this.documentHelper.isListTextSelected) {
            var paragraph = selection.start.paragraph;
            if (paragraph.paragraphFormat.listFormat && paragraph.paragraphFormat.listFormat.listId !== -1) {
                this.onApplyList(undefined);
            }
        }
        //if (!this.isSkipHistory) {
        this.initHistory('Paste');
        //}
        if (!selection.isEmpty || this.documentHelper.isListTextSelected) {
            isRemoved = this.removeSelectedContentInternal(selection, selection.start, selection.end);
        }
        if (isRemoved) {
            layoutWholeDocument = this.pasteContent(widgets, currentFormat);
        }
        else if (this.editorHistory) {
            this.editorHistory.currentBaseHistoryInfo = undefined;
        }
        if (this.editorHistory && this.editorHistory.currentHistoryInfo) {
            this.editorHistory.updateHistory();
            this.editorHistory.updateComplexHistory();
        }
        else {
            this.reLayout(selection, selection.isEmpty);
        }
        if (layoutWholeDocument) {
            this.layoutWholeDocument(true);
        }
        this.isPaste = false;
    };
    Editor.prototype.pasteAsNewColumn = function (data) {
        if (this.owner.isReadOnlyMode || !this.canEditContentControl) {
            return;
        }
        if (this.selection.start.paragraph.isInsideTable) {
            if (this.checkIsNotRedoing()) {
                this.initHistory('PasteColumn');
            }
            var startCell = this.getOwnerCell(this.selection.isForward);
            var table = startCell.ownerRow.ownerTable.combineWidget(this.owner.viewer);
            if (this.editorHistory) {
                //Clones the entire table to preserve in history.
                var clonedTable = this.cloneTableToHistoryInfo(table);
            }
            this.selection.owner.isLayoutEnabled = false;
            var cloneTable = data.clone();
            var rowWidget = cloneTable.childWidgets[0];
            var numberOfRows = cloneTable.childWidgets.length;
            var numberOfColumns = rowWidget.childWidgets.length;
            var cellIndex = startCell.columnIndex;
            var startParagraph = undefined;
            var newCell = undefined;
            var columnCount = numberOfColumns;
            var rowSpannedCells = [];
            if (numberOfRows > table.childWidgets.length) {
                this.addRows(numberOfRows - table.childWidgets.length, table);
                this.tableUpdate(table);
            }
            else if (table.childWidgets.length > numberOfRows) {
                this.addRows(table.childWidgets.length - numberOfRows, cloneTable, table);
                this.tableUpdate(table);
            }
            for (var i = 0; i < columnCount; i++) {
                for (var j = 0; j < table.childWidgets.length; j++) {
                    var row = table.childWidgets[j];
                    var rowWidget_1 = cloneTable.childWidgets[j];
                    var cellWidget = rowWidget_1.childWidgets[i];
                    var cell = row.childWidgets[startCell.columnIndex];
                    newCell = this.createColumn(this.selection.getLastParagraph(startCell));
                    newCell.index = j;
                    newCell.rowIndex = row.index;
                    newCell.containerWidget = row;
                    var prevCell = row.previousWidget;
                    var spannedCell = this.rowspannedCollection(row, rowSpannedCells);
                    if (cell != null) {
                        newCell.cellFormat.copyFormat(cell.cellFormat);
                        newCell.cellFormat.rowSpan = 1;
                    }
                    else if (spannedCell.length > 0) {
                        for (var z = 0; z < spannedCell.length; z++) {
                            if (prevCell.rowIndex + (spannedCell[z].cellFormat.rowSpan - 1) >= row.rowIndex) {
                                newCell.cellFormat.copyFormat(spannedCell[z].cellFormat);
                                newCell.cellFormat.rowSpan = 1;
                            }
                        }
                    }
                    cellWidget.containerWidget = newCell.containerWidget;
                    newCell.childWidgets = cellWidget.childWidgets;
                    if (isNullOrUndefined(startParagraph)) {
                        startParagraph = this.selection.getFirstParagraph(newCell);
                    }
                    if (cellIndex === 0) {
                        row.childWidgets.splice(i, 0, newCell);
                    }
                    else {
                        this.insertSpannedCells(row, rowSpannedCells, newCell, cellIndex);
                    }
                }
            }
            this.tableReLayout(table, startParagraph, newCell);
        }
    };
    Editor.prototype.pasteAsNestedTable = function (widgets, currentFormat) {
        var data = widgets[0].childWidgets[0];
        if (this.selection.start.paragraph.isInsideTable) {
            if (this.checkIsNotRedoing()) {
                this.initHistory('PasteNested');
            }
            var startCell = this.getOwnerCell(this.selection.isForward);
            var table = startCell.ownerRow.ownerTable.combineWidget(this.owner.viewer);
            if (this.editorHistory) {
                //Clones the entire table to preserve in history.
                this.cloneTableToHistoryInfo(table);
            }
            var startParagraph = undefined;
            var dataTable = data.clone();
            var endCell = this.selection.end.paragraph.containerWidget;
            var pasteCell = void 0;
            if (startCell != endCell) {
                var row = startCell.ownerRow;
                while (row != endCell.ownerRow.nextRow) {
                    for (var cellIndex = startCell.columnIndex; cellIndex <= endCell.columnIndex; cellIndex++) {
                        pasteCell = row.childWidgets[cellIndex];
                        var clonedTable = dataTable.clone();
                        var newPara = new ParagraphWidget();
                        pasteCell.childWidgets = [];
                        pasteCell.childWidgets[0] = clonedTable;
                        pasteCell.childWidgets[1] = newPara;
                        newPara.containerWidget = pasteCell;
                        clonedTable.containerWidget = pasteCell;
                        clonedTable.index = 0;
                        newPara.index = 1;
                        row.childWidgets[cellIndex] = pasteCell;
                        if (isNullOrUndefined(startParagraph)) {
                            startParagraph = this.selection.getFirstParagraph(pasteCell);
                        }
                    }
                    row = row.nextRow;
                }
                this.tableReLayout(table, startParagraph, pasteCell);
            }
            else {
                this.defaultPaste(widgets, currentFormat);
            }
        }
    };
    Editor.prototype.pasteOverwriteCell = function (data) {
        if (this.selection.start.paragraph.isInsideTable) {
            if (this.checkIsNotRedoing()) {
                this.initHistory('PasteOverwrite');
            }
            var startCell = this.getOwnerCell(this.selection.isForward);
            var table = startCell.ownerRow.ownerTable.combineWidget(this.owner.viewer);
            if (this.editorHistory) {
                //Clones the entire table to preserve in history.
                this.cloneTableToHistoryInfo(table);
            }
            var cloneTable = data.clone();
            // let rowWidget: TableRowWidget = cloneTable.childWidgets[0] as TableRowWidget;
            var numberOfRows = cloneTable.childWidgets.length;
            var endCell = this.getOwnerCell(!this.selection.isForward);
            // let columnCount: number = numberOfColumns;
            // let newCell: TableCellWidget = undefined;
            var coloumnIndexPaste = startCell.columnIndex;
            var rowIndexPaste = startCell.rowIndex;
            var startParagraph = undefined;
            var row = this.selection.start.paragraph.associatedCell.ownerRow;
            var rowWidget = cloneTable.childWidgets[0];
            var newCells = void 0; // = rowWidget.childWidgets[0] as TableCellWidget;
            var numberOfColumns = rowWidget.childWidgets.length;
            var row2 = startCell.ownerRow;
            if (startCell != endCell) {
                var k = 0;
                var rowSpan = void 0;
                var rowSpanIndex = void 0;
                var columnSpan = void 0;
                var cloneCells = void 0;
                while (row2 != endCell.ownerRow.nextRow) {
                    rowWidget = cloneTable.childWidgets[k] || cloneTable.childWidgets[k = 0];
                    var rowWidgetLength = rowWidget.childWidgets.length;
                    var cellIndexSE = 0;
                    for (var cellIndex = startCell.columnIndex; cellIndex <= endCell.columnIndex; cellIndex++) {
                        rowWidget = cloneTable.childWidgets[k];
                        if (rowSpan > 1 && rowSpanIndex === cellIndex) {
                            cellIndex++;
                            rowSpan--;
                            rowSpanIndex = null;
                        }
                        if (columnSpan > 1 && cellIndexSE >= (rowWidgetLength - (columnSpan - 1))) {
                            columnSpan = 1;
                            cellIndex = cellIndex + (columnSpan - 1);
                            cellIndexSE = 0;
                        }
                        newCells = rowWidget.childWidgets[cellIndexSE] || rowWidget.childWidgets[cellIndexSE = 0];
                        cloneCells = newCells.clone();
                        var pasteCell = row2.childWidgets[cellIndex];
                        for (var x = 0; x < cloneCells.childWidgets.length; x++) {
                            var newPara = cloneCells.childWidgets[x];
                            newPara.containerWidget = pasteCell;
                            cloneCells.childWidgets[x] = newPara;
                        }
                        pasteCell.childWidgets = cloneCells.childWidgets;
                        if (newCells.cellFormat.rowSpan > 1) {
                            rowSpan = newCells.cellFormat.rowSpan;
                            rowSpanIndex = cellIndex;
                        }
                        if (newCells.cellFormat.columnSpan > 1) {
                            columnSpan = newCells.cellFormat.columnSpan;
                        }
                        row2.childWidgets[cellIndex] = pasteCell;
                        if (isNullOrUndefined(startParagraph)) {
                            startParagraph = this.selection.getFirstParagraph(cloneCells);
                        }
                        cellIndexSE++;
                    }
                    row2 = row2.nextRow;
                    k++;
                }
                this.tableReLayout(table, startParagraph, cloneCells);
            }
            else {
                var rowsToAdd = void 0;
                var rowSpan = void 0;
                var rowSpanIndex = void 0;
                var pasteCell = void 0;
                if (numberOfRows > table.childWidgets.length - rowIndexPaste) {
                    rowsToAdd = numberOfRows - table.childWidgets.length + rowIndexPaste;
                    this.addRows(rowsToAdd, table);
                }
                for (var i = 0; i < numberOfRows; i++) {
                    var cellIndex = startCell.columnIndex;
                    rowWidget = cloneTable.childWidgets[i];
                    var numberOfColumns_1 = rowWidget.childWidgets.length;
                    for (var cellIterate = 0; cellIterate < numberOfColumns_1; cellIterate++) {
                        newCells = rowWidget.childWidgets[cellIterate];
                        var cloneCells = newCells.clone();
                        if (rowSpan > 1 && rowSpanIndex === cellIndex) {
                            cellIndex++;
                            rowSpan--;
                            rowSpanIndex = null;
                        }
                        pasteCell = row.childWidgets[cellIndex];
                        if (!pasteCell) {
                            pasteCell = cloneCells;
                            pasteCell.containerWidget = row;
                            pasteCell.index = cellIndex;
                        }
                        for (var index = 0; index < cloneCells.childWidgets.length; index++) {
                            var newPara = cloneCells.childWidgets[index];
                            newPara.containerWidget = pasteCell;
                            cloneCells.childWidgets[index] = newPara;
                        }
                        pasteCell.childWidgets = cloneCells.childWidgets;
                        if (newCells.cellFormat.rowSpan > 1) {
                            rowSpan = newCells.cellFormat.rowSpan; //getting span
                            rowSpanIndex = cellIndex;
                        }
                        row.childWidgets.splice(cellIndex++, 1, pasteCell);
                        if (isNullOrUndefined(startParagraph)) {
                            startParagraph = this.selection.getFirstParagraph(pasteCell);
                        }
                    }
                    row = row.nextRow;
                }
                this.tableReLayout(table, startParagraph, pasteCell);
            }
        }
    };
    Editor.prototype.pasteAsNewRow = function (data) {
        if (this.owner.isReadOnlyMode || !this.canEditContentControl) {
            return;
        }
        if (this.checkIsNotRedoing()) {
            this.initHistory('PasteRow');
        }
        this.documentHelper.owner.isShiftingEnabled = true;
        var startCell = this.getOwnerCell(this.selection.isForward).getSplitWidgets()[0];
        var endCell = this.getOwnerCell(!this.selection.isForward).getSplitWidgets()[0];
        var table = startCell.ownerTable.combineWidget(this.owner.viewer);
        var row = endCell.ownerRow;
        if (this.editorHistory) {
            this.cloneTableToHistoryInfo(table);
        }
        var rowCount = this.getRowCountToInsert();
        var columncount = this.getColumnCountToInsert();
        var rows = [];
        var index = row.rowIndex;
        index++;
        var pasteRowCount = data.childWidgets.length;
        for (var i = 0; i < pasteRowCount; i++) {
            var newRow = data.childWidgets[i].clone();
            if (this.owner.enableTrackChanges) {
                this.insertRevision(newRow.rowFormat, 'Insertion');
            }
            rows.push(newRow);
        }
        table.insertTableRowsInternal(rows, index, false);
        var cellWidget = undefined;
        var paragraphWidget = undefined;
        if ((table.childWidgets[index] instanceof TableRowWidget)) {
            cellWidget = table.childWidgets[index].firstChild;
            paragraphWidget = this.selection.getFirstParagraph(cellWidget);
        }
        else {
            var widget = undefined;
            while (!(widget instanceof TableWidget)) {
                widget = table.nextRenderedWidget;
            }
            paragraphWidget = this.documentHelper.getFirstParagraphInFirstCell(widget);
        }
        this.documentHelper.layout.reLayoutTable(table);
        this.selection.selectParagraphInternal(paragraphWidget, true);
        this.reLayout(this.selection, true);
    };
    Editor.prototype.tableUpdate = function (table) {
        table.isGridUpdated = false;
        table.calculateGrid();
        table.buildTableColumns();
        table.isGridUpdated = true;
    };
    Editor.prototype.rowspannedCollection = function (row, rowSpannedCells) {
        for (var j = 0; j < row.childWidgets.length; j++) {
            var rowCell = row.childWidgets[j];
            if (rowCell.cellFormat.rowSpan > 1) {
                rowSpannedCells.push(rowCell);
            }
        }
        return rowSpannedCells;
    };
    Editor.prototype.insertSpannedCells = function (row, rowSpannedCells, newCell, cellIndex) {
        var isCellInserted = false;
        for (var j = 0; j < row.childWidgets.length; j++) {
            var rowCell = row.childWidgets[j];
            // Add the row spanned cells to colection for adding column before / after row spnned cells.
            if (rowCell.cellFormat.rowSpan > 1) {
                rowSpannedCells.push(rowCell);
            }
            if (rowCell.columnIndex + rowCell.cellFormat.columnSpan === cellIndex) {
                row.childWidgets.splice(rowCell.cellIndex + 1, 0, newCell);
                isCellInserted = true;
            }
            else if (cellIndex > rowCell.columnIndex && rowCell.columnIndex + rowCell.cellFormat.columnSpan > cellIndex
                && cellIndex < rowCell.columnIndex + rowCell.cellFormat.columnSpan) {
                row.childWidgets.splice(rowCell.cellIndex + 1, 0, newCell);
                isCellInserted = true;
            }
            if (isCellInserted) {
                break;
            }
        }
        // If the cell is not inserted for row, then check for row spanned cells.
        if (!isCellInserted) {
            if (rowSpannedCells.length > 0) {
                for (var k = 0; k < rowSpannedCells.length; k++) {
                    var rowSpannedCell = rowSpannedCells[k];
                    if (rowSpannedCell.ownerRow !== row
                        && row.rowIndex <= rowSpannedCell.ownerRow.rowIndex + rowSpannedCell.cellFormat.rowSpan - 1) {
                        if (rowSpannedCell.columnIndex + rowSpannedCell.cellFormat.columnSpan === cellIndex) {
                            if (rowSpannedCell.cellIndex > row.childWidgets.length) {
                                row.childWidgets.push(newCell);
                            }
                            else {
                                row.childWidgets.splice(rowSpannedCell.cellIndex + 1, 0, newCell);
                            }
                            isCellInserted = true;
                        }
                        else if (cellIndex > rowSpannedCell.columnIndex &&
                            rowSpannedCell.columnIndex + rowSpannedCell.cellFormat.columnSpan > cellIndex
                            && cellIndex < rowSpannedCell.columnIndex + rowSpannedCell.cellFormat.columnSpan) {
                            row.childWidgets.splice(rowSpannedCell.columnIndex, 0, newCell);
                            isCellInserted = true;
                        }
                    }
                    if (isCellInserted) {
                        break;
                    }
                }
            }
        }
    };
    Editor.prototype.addRows = function (count, table, ownerTable) {
        var rowPlacement = 'Below';
        if (this.owner.isReadOnlyMode || !this.canEditContentControl) {
            return;
        }
        var isInsertRow = false;
        var startPos = this.selection.isForward ? this.selection.start : this.selection.end;
        var endPos = this.selection.isForward ? this.selection.end : this.selection.start;
        var rows = table.childWidgets.length;
        var rowWidget = table.childWidgets[rows - 1];
        var column = rowWidget.childWidgets.length;
        var cloneTable = ownerTable ? ownerTable : table;
        if (startPos.paragraph.isInsideTable) {
            var startCell = this.getOwnerCell(this.selection.isForward).getSplitWidgets()[0];
            var endCell = rowWidget.childWidgets[column - 1];
            var row = endCell.ownerRow;
            this.rowInsertion(count, rowPlacement, startCell, endCell, row, table, isInsertRow);
        }
        //this.reLayout(this.selection, true);
    };
    Editor.prototype.pasteContent = function (widgets, currentFormat) {
        this.documentHelper.owner.isShiftingEnabled = true;
        var insertPosition = '';
        this.updateInsertPosition();
        if (this.editorHistory && this.editorHistory.currentBaseHistoryInfo) {
            insertPosition = this.editorHistory.currentBaseHistoryInfo.insertPosition;
        }
        else {
            var position = this.selection.start;
            if (!this.selection.isForward) {
                position = this.selection.end;
            }
            var blockInfo = this.selection.getParagraphInfo(position);
            insertPosition = this.selection.getHierarchicalIndex(blockInfo.paragraph, blockInfo.offset.toString());
        }
        this.documentHelper.owner.isLayoutEnabled = true;
        this.documentHelper.owner.isPastingContent = true;
        var layoutWholeDocument = this.pasteCopiedData(widgets, currentFormat);
        var endPosition = '';
        this.updateEndPosition();
        if (this.editorHistory && this.editorHistory.currentBaseHistoryInfo) {
            endPosition = this.editorHistory.currentBaseHistoryInfo.endPosition;
        }
        else {
            var blockInfo = this.selection.getParagraphInfo(this.selection.start);
            endPosition = this.selection.getHierarchicalIndex(blockInfo.paragraph, blockInfo.offset.toString());
        }
        var startPosition = new TextPosition(this.documentHelper.owner);
        this.setPositionForCurrentIndex(startPosition, insertPosition);
        var end = new TextPosition(this.documentHelper.owner);
        this.setPositionForCurrentIndex(end, endPosition);
        this.pasteTextPosition = { startPosition: startPosition, endPosition: end };
        this.documentHelper.owner.isPastingContent = false;
        this.documentHelper.selection.fireSelectionChanged(true);
        return layoutWholeDocument;
    };
    Editor.prototype.pasteCopiedData = function (bodyWidget, currentFormat) {
        var layoutWholeDocument = false;
        if (this.documentHelper.layout.isBidiReLayout) {
            this.documentHelper.layout.isBidiReLayout = false;
        }
        if (this.isPaste && this.isSectionEmpty(this.selection) && !this.selection.start.paragraph.isInHeaderFooter) {
            this.previousSectionFormat = new WSectionFormat();
            this.previousSectionFormat.copyFormat(this.selection.start.paragraph.bodyWidget.sectionFormat);
            this.selection.start.paragraph.bodyWidget.sectionFormat.copyFormat(bodyWidget[0].sectionFormat);
            this.selection.start.paragraph.bodyWidget.sectionFormat.footerDistance = this.previousSectionFormat.footerDistance;
            this.selection.start.paragraph.bodyWidget.sectionFormat.headerDistance = this.previousSectionFormat.headerDistance;
            if (this.owner.viewer instanceof PageLayoutViewer) {
                var page = this.selection.start.paragraph.bodyWidget.page;
                this.owner.viewer.updatePageBoundingRectangle(this.selection.start.paragraph.bodyWidget, page, page.boundingRectangle.y);
                this.owner.viewer.updateClientArea(this.selection.start.paragraph.bodyWidget, page);
            }
            layoutWholeDocument = true;
        }
        for (var k = 0; k < bodyWidget.length; k++) {
            var widgets = bodyWidget[k].childWidgets;
            for (var j = 0; j < widgets.length; j++) {
                var widget = widgets[j];
                if (widget instanceof ParagraphWidget && widget.childWidgets.length === 0) {
                    widget.childWidgets[0] = new LineWidget(widget);
                }
                if (widget instanceof ParagraphWidget && !isNullOrUndefined(currentFormat)) {
                    widget.paragraphFormat.copyFormat(currentFormat);
                    var insertFormat = this.copyInsertFormat(this.selection.start.paragraph.characterFormat, false);
                    widget.characterFormat.mergeFormat(insertFormat);
                }
                if (j === widgets.length - 1 && widget instanceof ParagraphWidget) {
                    var newParagraph = widget;
                    if (newParagraph.childWidgets.length > 0
                        && newParagraph.childWidgets[0].children.length > 0) {
                        var insertPosition = this.selection.start;
                        if ((insertPosition.paragraph.paragraphFormat.textAlignment === 'Center'
                            || insertPosition.paragraph.paragraphFormat.textAlignment === 'Right') &&
                            insertPosition.paragraph.paragraphFormat.listFormat.listId === -1) {
                            insertPosition.paragraph.x = this.owner.viewer.clientActiveArea.x;
                        }
                        if (this.currentPasteOptions === 'KeepTextOnly') {
                            var paraFormat = new WParagraphFormat(this.selection.start.paragraph);
                            this.selection.start.paragraph.paragraphFormat = paraFormat;
                        }
                        this.insertElement(newParagraph.childWidgets[0].children, newParagraph.paragraphFormat);
                    }
                }
                else if (widget instanceof BlockWidget) {
                    var startParagraph = this.selection.start.paragraph;
                    var isTable = widget instanceof TableWidget;
                    if (isTable) {
                        var table = widget;
                        this.generateTableRevision(table);
                        if (startParagraph.isInsideTable) {
                            //Handled to resize table based on parent cell width.
                            var clientWidth = startParagraph.getContainerWidth();
                            table.fitCellsToClientArea(clientWidth);
                        }
                        if (startParagraph.isEmpty() && startParagraph.previousWidget instanceof TableWidget && !this.isPaste) {
                            this.insertTableRows(table, startParagraph.previousWidget);
                            return layoutWholeDocument;
                        }
                    }
                    this.insertBlockInternal(widget);
                }
            }
        }
        return layoutWholeDocument;
    };
    Editor.prototype.generateTableRevision = function (table) {
        if (this.owner.enableTrackChanges && !isNullOrUndefined(table)) {
            for (var i = 0; i < table.childWidgets.length; i++) {
                var row = table.childWidgets[i];
                this.insertRevision(row.rowFormat, 'Insertion');
                for (var j = 0; j < row.childWidgets.length; j++) {
                    var cell = row.childWidgets[j];
                    for (var k = 0; k < cell.childWidgets.length; k++) {
                        var para = cell.childWidgets[k];
                        if (!isNullOrUndefined(para)) {
                            this.insertRevisionForBlock(para, 'Insertion');
                        }
                    }
                }
            }
        }
    };
    Editor.prototype.isSectionEmpty = function (selection) {
        var startParagraph = selection.start.paragraph;
        if (startParagraph) {
            if (startParagraph.isInsideTable || startParagraph.isInHeaderFooter ||
                startParagraph !== selection.end.paragraph) {
                return false;
            }
            var bodyWidget = startParagraph.bodyWidget;
            if (bodyWidget) {
                var page = bodyWidget.page;
                if (page) {
                    if ((isNullOrUndefined(page.previousPage) || page.previousPage.sectionIndex !== page.sectionIndex)
                        && isNullOrUndefined(page.nextPage) && startParagraph.isEmpty() &&
                        bodyWidget.childWidgets.length === 1) {
                        var isEmpty = true;
                        var sectionIndex = selection.start.paragraph.bodyWidget.sectionIndex;
                        var headerFooters = this.documentHelper.headersFooters[sectionIndex];
                        if (headerFooters) {
                            for (var index in headerFooters) {
                                var headerFooter = headerFooters[index];
                                if (!isNullOrUndefined(headerFooter)) {
                                    var widget = headerFooter.childWidgets[0];
                                    if (widget instanceof TableWidget) {
                                        isEmpty = false;
                                    }
                                    else if ((widget instanceof ParagraphWidget) && !widget.isEmpty()) {
                                        isEmpty = false;
                                    }
                                }
                                else {
                                    isEmpty = false;
                                }
                                if (!isEmpty) {
                                    break;
                                }
                            }
                            return isEmpty;
                        }
                    }
                }
            }
        }
        return false;
    };
    /**
     * Insert table on undo
     *
     * @param {TableWidget} table - Specifies the table
     * @param {TableWidget} newTable - Speciefies the new table
     * @param {boolean} moveRows - Specifies the new row
     * @private
     * @private {void}
     */
    Editor.prototype.insertTableInternal = function (table, newTable, moveRows) {
        //Gets the index of current table.
        var insertIndex = table.getIndex();
        if (moveRows) {
            //Moves the rows to table.
            for (var i = 0, index = 0; i < table.childWidgets.length; i++, index++) {
                var row = table.childWidgets[i];
                newTable.childWidgets.splice(index, 0, row);
                row.containerWidget = newTable;
                table.childWidgets.splice(i, 1);
                i--;
            }
        }
        var owner = table.containerWidget;
        //remove old table revisions if it is present.
        this.constructRevisionsForTable(table, false);
        this.removeBlock(table, true);
        //Inserts table in the current table position.        
        var blockAdvCollection = owner.childWidgets;
        blockAdvCollection.splice(insertIndex, 0, newTable);
        newTable.index = table.index;
        table.containerWidget = undefined;
        newTable.containerWidget = owner;
        this.documentHelper.layout.clearTableWidget(newTable, true, true, true);
        newTable.buildTableColumns();
        this.constructRevisionsForTable(newTable, true);
        newTable.isGridUpdated = true;
        this.updateNextBlocksIndex(newTable, true);
        this.documentHelper.layout.linkFieldInTable(newTable);
        this.documentHelper.layout.layoutBodyWidgetCollection(newTable.index, owner, newTable, false);
    };
    /* eslint-disable @typescript-eslint/no-explicit-any */
    Editor.prototype.canConstructRevision = function (item) {
        if ((item.revisions.length > 0 && item.revisions[0].range.length === 0) || item.removedIds.length > 0) {
            return true;
        }
        return false;
    };
    Editor.prototype.constructRevisionsForTable = function (table, canConstructRevision) {
        for (var i = 0; i < table.childWidgets.length; i++) {
            var rowWidget = table.childWidgets[i];
            if (canConstructRevision) {
                if (this.canConstructRevision(rowWidget.rowFormat)) {
                    this.constructRevisionFromID(rowWidget.rowFormat, true);
                }
                for (var rowIndex = 0; rowIndex < rowWidget.childWidgets.length; rowIndex++) {
                    var cellWidget = rowWidget.childWidgets[rowIndex];
                    for (var paraIndex = 0; paraIndex < cellWidget.childWidgets.length; paraIndex++) {
                        if (cellWidget.childWidgets[paraIndex] instanceof ParagraphWidget) {
                            this.constructRevisionsForBlock(cellWidget.childWidgets[paraIndex], canConstructRevision);
                        }
                    }
                }
            }
            else {
                this.removeDeletedCellRevision(rowWidget);
            }
        }
    };
    Editor.prototype.constructRevisionsForBlock = function (paragraph, canConstructRevision) {
        for (var linIndex = 0; linIndex < paragraph.childWidgets.length; linIndex++) {
            var lineWidget = paragraph.childWidgets[linIndex];
            for (var elementIndex = 0; elementIndex < lineWidget.children.length; elementIndex++) {
                if (canConstructRevision) {
                    if (lineWidget.children[elementIndex] instanceof ElementBox && this.canConstructRevision(lineWidget.children[elementIndex])) {
                        this.constructRevisionFromID(lineWidget.children[elementIndex], true);
                    }
                }
            }
        }
        if (this.canConstructRevision(paragraph.characterFormat)) {
            this.constructRevisionFromID(paragraph.characterFormat, true);
        }
    };
    /**
     * @private
     * @param paraWidget
     * @param startoffset
     * @param endoffset
     * @param revisionId
     * @param isParaMarkIncluded
     * @returns {void}
     */
    Editor.prototype.applyRevisionForCurrentPara = function (paraWidget, startoffset, endoffset, revisionId, isParaMarkIncluded) {
        var elementInfo = paraWidget.getInline(startoffset + 1, 0);
        var currentElement = elementInfo.element;
        var skipElement = false;
        if (startoffset === paraWidget.getLength()) {
            skipElement = true;
        }
        var endElement = paraWidget.getInline(endoffset, 0).element;
        if (endoffset > paraWidget.getLength()) {
            isParaMarkIncluded = true;
        }
        if (!isNullOrUndefined(currentElement) && !isNullOrUndefined(endElement)) {
            if (!skipElement && currentElement === endElement) {
                currentElement.removedIds.push(revisionId);
                this.constructRevisionFromID(currentElement, true);
            }
            else {
                while (!isNullOrUndefined(currentElement) && currentElement !== endElement) {
                    if (!skipElement) {
                        currentElement.removedIds.push(revisionId);
                        this.constructRevisionFromID(currentElement, true);
                    }
                    if (!isNullOrUndefined(currentElement.nextNode)) {
                        if (currentElement.nextNode instanceof BookmarkElementBox) {
                            currentElement = currentElement.nextNode;
                        }
                        else {
                            currentElement = currentElement.nextNode.nextValidNodeForTracking;
                        }
                    }
                    skipElement = false;
                }
                if (!isNullOrUndefined(currentElement) && !skipElement) {
                    currentElement.removedIds.push(revisionId);
                    this.constructRevisionFromID(currentElement, true);
                }
            }
        }
        else if (!isNullOrUndefined(currentElement) && !skipElement) {
            currentElement.removedIds.push(revisionId);
            this.constructRevisionFromID(currentElement, true);
        }
        else if (!isNullOrUndefined(endElement)) {
            endElement.removedIds.push(revisionId);
            this.constructRevisionFromID(endElement, true);
        }
        if (isParaMarkIncluded) {
            paraWidget.characterFormat.removedIds.push(revisionId);
            this.constructRevisionFromID(paraWidget.characterFormat, true);
        }
    };
    /**
     * Insert table on undo
     *
     * @param {Selection} selection - Specified the selection
     * @param {WBlock} block - Spcifies the block
     * @param {WTable} table - Specifies the table.
     * @private
     * @returns {void}
     */
    Editor.prototype.insertBlockTable = function (selection, block, table) {
        var offset = selection.start.offset;
        var lineIndex = selection.start.paragraph.childWidgets.indexOf(selection.start.currentWidget);
        if (block instanceof ParagraphWidget && offset > 0) {
            //Moves the inline items before selection start to the inserted paragraph.
            this.moveInlines(selection.start.paragraph, block, 0, 0, selection.start.paragraph.firstChild, offset, selection.start.currentWidget);
            selection.selectParagraphInternal(selection.start.paragraph, true);
            if (this.checkInsertPosition(selection)) {
                this.updateHistoryPosition(this.selection.getHierarchicalIndex(block, offset.toString()), true);
            }
        }
        if (offset > 0 && this.checkInsertPosition(selection)) {
            this.updateHistoryPosition(selection.start, true);
        }
        var index = table.indexInOwner;
        table.containerWidget.childWidgets.splice(index, 0, block);
        block.containerWidget = table.containerWidget;
        block.index = table.index;
        this.updateNextBlocksIndex(block, true);
        this.documentHelper.layout.layoutBodyWidgetCollection(block.index, block.containerWidget, block, false);
        if (this.checkInsertPosition(selection)) {
            var paragraph = undefined;
            if (block instanceof ParagraphWidget) {
                paragraph = block;
            }
            if (block instanceof TableWidget) {
                paragraph = this.documentHelper.getFirstParagraphInFirstCell(block);
            }
            this.updateHistoryPosition(this.selection.getHierarchicalIndex(paragraph, '0'), true);
        }
    };
    /**
     * On cut handle selected content remove and relayout
     *
     * @param {Selection} selection - Specified the selection
     * @private
     * @returns {void}
     */
    Editor.prototype.handleCut = function (selection) {
        var startPosition = selection.start;
        var endPosition = selection.end;
        if (!selection.isForward) {
            startPosition = selection.end;
            endPosition = selection.start;
        }
        // this.owner.isShiftingEnabled = true;     
        var image = undefined;
        if (startPosition.paragraph === endPosition.paragraph && startPosition.offset + 1 === endPosition.offset) {
            //Gets selected image and copy image to clipboard.
            var index = 0;
            var currentInline = startPosition.paragraph.getInline(endPosition.offset, index);
            var inline = currentInline.element;
            image = inline;
        }
        var removedCommentStart = this.checkAndRemoveComments();
        var blockInfo = this.selection.getParagraphInfo(startPosition);
        selection.editPosition = this.selection.getHierarchicalIndex(blockInfo.paragraph, blockInfo.offset.toString());
        this.initHistory('Cut');
        selection.owner.isShiftingEnabled = true;
        if (this.editorHistory && this.editorHistory.currentBaseHistoryInfo) {
            if (this.checkInsertPosition(selection)) {
                this.updateHistoryPosition(selection.editPosition, true);
            }
        }
        this.deleteSelectedContent(endPosition.paragraph, selection, startPosition, endPosition, 3);
        var textPosition = new TextPosition(selection.owner);
        this.setPositionForCurrentIndex(textPosition, selection.editPosition);
        selection.selectContent(textPosition, true);
        if (this.editorHistory && this.editorHistory.currentBaseHistoryInfo) {
            if (this.checkEndPosition(selection)) {
                this.updateHistoryPosition(selection.end, false);
            }
        }
        this.reLayout(selection);
        this.updateHistoryForComments(removedCommentStart);
    };
    Editor.prototype.insertInlineInternal = function (element, revisionType) {
        var selection = this.selection;
        var length = element.length;
        var paragraphInfo = this.selection.getParagraphInfo(selection.start);
        revisionType = (isNullOrUndefined(revisionType) ? 'Insertion' : revisionType);
        if (selection.start.paragraph.isEmpty()) {
            var paragraph = selection.start.paragraph;
            if ((paragraph.paragraphFormat.textAlignment === 'Center' || paragraph.paragraphFormat.textAlignment === 'Right')
                && paragraph.paragraphFormat.listFormat.listId === -1) {
                paragraph.x = this.owner.viewer.clientActiveArea.x;
            }
            var isUndoing = !isNullOrUndefined(this.editorHistory) ? (this.editorHistory.isUndoing || this.editorHistory.isRedoing) : false;
            paragraph.childWidgets[0].children.push(element);
            element.line = paragraph.childWidgets[0];
            if (this.owner.enableTrackChanges && element.isValidNodeForTracking && !isUndoing) {
                this.insertRevision(element, revisionType);
            }
            if (element.removedIds.length > 0 || isUndoing) {
                this.constructRevisionFromID(element, true);
            }
            element.linkFieldCharacter(this.documentHelper);
            if (element instanceof FootnoteElementBox) {
                if (element.footnoteType === 'Footnote') {
                    this.updateFootnoteCollection(element);
                }
                if (element.footnoteType === 'Endnote') {
                    this.updateEndnoteCollection(element);
                }
            }
            this.documentHelper.layout.reLayoutParagraph(paragraph, 0, 0, undefined, undefined);
        }
        else {
            var indexInInline = 0;
            var inlineObj = selection.start.currentWidget.getInline(selection.start.offset, indexInInline);
            var curInline = inlineObj.element;
            indexInInline = inlineObj.index;
            this.insertElementInternal(curInline, element, indexInInline, revisionType, true);
        }
        var revision = element.revisions[0];
        if (!isNullOrUndefined(revision)) {
            this.owner.trackChangesPane.updateCurrentTrackChanges(revision);
        }
        this.setPositionParagraph(paragraphInfo.paragraph, paragraphInfo.offset + length, true);
    };
    Editor.prototype.insertElement = function (element, paragraphFormat) {
        var selection = this.selection;
        var length = 0;
        var paragraph = undefined;
        var lineIndex = -1;
        var lineWidget = undefined;
        var insertIndex = 0;
        var begin = undefined;
        var paragraphInfo = this.selection.getParagraphInfo(selection.start);
        var isTrackingEnabled = this.owner.enableTrackChanges;
        var curInline = undefined;
        var prevElement = undefined;
        var indexInInline = 0;
        if (selection.start.paragraph.isEmpty()) {
            paragraph = selection.start.paragraph;
            lineWidget = paragraph.childWidgets[0];
            lineIndex = 0;
        }
        else {
            var inlineObj = selection.start.currentWidget.getInline(selection.start.offset, indexInInline);
            curInline = inlineObj.element;
            indexInInline = inlineObj.index;
            paragraph = curInline.line.paragraph;
            lineIndex = paragraph.childWidgets.indexOf(curInline.line);
            insertIndex = curInline.indexInOwner;
            lineWidget = curInline.line;
            if (indexInInline === curInline.length) { // Add new Element in current 
                insertIndex++;
                begin = false;
            }
            else if (indexInInline === 0) {
                if (isNullOrUndefined(curInline.previousNode)) {
                    insertIndex = 0;
                }
                begin = true;
            }
            else {
                insertIndex++;
                prevElement = new TextElementBox();
                prevElement.characterFormat.copyFormat(curInline.characterFormat);
                prevElement.text = curInline.text.substring(indexInInline);
                curInline.text = curInline.text.slice(0, indexInInline);
                if (curInline.revisions.length > 0 && !this.owner.enableTrackChanges) {
                    this.splitRevisionForSpittedElement(curInline, prevElement);
                }
                lineWidget.children.splice(insertIndex, 0, prevElement);
                prevElement.line = curInline.line;
            }
        }
        for (var i = 0; i < element.length; i++) {
            length += element[i].length;
            if (element[i] instanceof TextElementBox && element[i].text.indexOf(' ') >= 0) {
                this.documentHelper.triggerSpellCheck = true;
            }
            var prevRevisionsCount = element[i].revisions.length;
            element[i].ischangeDetected = true;
            lineWidget.children.splice(insertIndex, 0, element[i]);
            element[i].line = lineWidget;
            element[i].linkFieldCharacter(this.documentHelper);
            var isRevisionCombined = this.updateRevisionForElement(curInline, element[i], indexInInline, (i === 0) ? true : false, prevElement, begin);
            //Check to combine elements with previous / next para
            if (isTrackingEnabled && !isRevisionCombined && element[i].revisions.length === prevRevisionsCount) {
                //if (!(element[i] instanceof FieldElementBox && (element[i] as FieldElementBox).fieldType === 2)) {
                this.checkToCombineRevisionsinBlocks(element[i], prevRevisionsCount === element[i].revisions.length, (i > 0 && i === element.length - 1), 'Insertion');
                //}
            }
            curInline = element[i];
            insertIndex++;
        }
        if ((!this.isPaste) && paragraphFormat && (isNullOrUndefined(paragraph.paragraphFormat.listFormat.list) ||
            (!isNullOrUndefined(paragraph.paragraphFormat.listFormat) && paragraph.paragraphFormat.listFormat.listId === -1))) {
            paragraph.paragraphFormat.copyFormat(paragraphFormat);
        }
        if (this.isPaste) {
            this.viewer.updateClientAreaForBlock(paragraph, true);
            paragraph.x = this.viewer.clientActiveArea.x;
        }
        this.documentHelper.layout.reLayoutParagraph(paragraph, lineIndex, 0, this.isInsertField ? undefined : paragraph.paragraphFormat.bidi);
        this.setPositionParagraph(paragraphInfo.paragraph, paragraphInfo.offset + length, true);
    };
    Editor.prototype.updateRevisionForElement = function (currentElement, newElement, indexInInline, isFirstItem, prevElement, isBeginning) {
        if (!this.owner.enableTrackChanges) {
            return false;
        }
        if (isNullOrUndefined(currentElement) && isNullOrUndefined(prevElement)) {
            return false;
        }
        var isMiddle = isNullOrUndefined(isBeginning) ? true : false;
        var prevRevisionCount = newElement.revisions.length;
        if (isFirstItem) {
            if (isMiddle) {
                var isRevisionCombined = this.checkToMapRevisionWithInlineText(currentElement, indexInInline, newElement, false, 'Insertion');
                if (isRevisionCombined || newElement.revisions.length > prevRevisionCount) {
                    this.copyElementRevision(currentElement, prevElement, true);
                }
                else if (newElement.revisions.length === 0) {
                    this.splitRevisionForSpittedElement(currentElement, prevElement);
                    this.insertRevision(newElement, 'Insertion');
                }
            }
            else if (isBeginning) {
                return this.insertRevisionAtBegining(currentElement, newElement, 'Insertion');
            }
            else {
                return this.insertRevisionAtEnd(currentElement, newElement, 'Insertion');
            }
        }
        else {
            // if (currentElement instanceof FieldElementBox && currentElement.fieldType === 2) {
            //     currentElement = (currentElement as FieldElementBox).previousElement;
            // }
            return this.insertRevisionAtEnd(currentElement, newElement, 'Insertion');
        }
        return false;
    };
    Editor.prototype.insertElementInternal = function (element, newElement, index, revisionType, relayout) {
        var line = element.line;
        var paragraph = line.paragraph;
        var lineIndex = line.indexInOwner;
        var insertIndex = element.indexInOwner;
        var isBidi = paragraph.paragraphFormat.bidi && element.isRightToLeft;
        var isEqualFormat = false;
        revisionType = isNullOrUndefined(revisionType) ? 'Insertion' : revisionType;
        var isUndoing = this.skipTracking();
        var isTrackingEnabled = this.owner.enableTrackChanges;
        var isRevisionCombined = false;
        var prevRevisionCount = newElement.revisions.length;
        if (this.owner.editorHistory && (this.owner.editorHistory.isUndoing || this.owner.editorHistory.isRedoing)
            && newElement instanceof TextElementBox) {
            isEqualFormat = element.characterFormat.isEqualFormat(newElement.characterFormat)
                && this.documentHelper.textHelper.isRTLText(newElement.text);
        }
        if (!isEqualFormat) {
            if (index === element.length) {
                // Add new Element in current 
                insertIndex = this.incrementCommentIndex(isBidi, element, insertIndex);
                if (newElement.removedIds.length > 0 || isUndoing) {
                    this.constructRevisionFromID(newElement, true, element);
                }
                else if (isTrackingEnabled && !isUndoing && !this.skipFieldDeleteTracking) {
                    isRevisionCombined = this.insertRevisionAtEnd(element, newElement, revisionType);
                }
                line.children.splice(insertIndex, 0, newElement);
            }
            else if (index === 0) {
                if (newElement.removedIds.length > 0) {
                    this.constructRevisionFromID(newElement, false);
                }
                else if (isTrackingEnabled && !isUndoing && !this.skipFieldDeleteTracking) {
                    isRevisionCombined = this.insertRevisionAtBegining(element, newElement, revisionType);
                }
                if (isNullOrUndefined(element.previousNode)) {
                    element.line.children.splice(0, 0, newElement);
                    insertIndex = 0;
                }
                else {
                    element.line.children.splice(insertIndex, 0, newElement);
                }
            }
            else {
                insertIndex = this.incrementCommentIndex(isBidi, element, insertIndex);
                var textElement = new TextElementBox();
                textElement.characterFormat.copyFormat(element.characterFormat);
                textElement.text = element.text.substring(index);
                if (element.revisions.length > 0 && !isTrackingEnabled && !isUndoing && newElement.removedIds.length === 0) {
                    this.splitRevisionForSpittedElement(element, textElement);
                }
                element.text = element.text.substr(0, index);
                line.children.splice(insertIndex, 0, textElement);
                textElement.line = element.line;
                isRevisionCombined = true;
                this.isTrackingFormField = element.previousElement instanceof FieldElementBox ? true : false;
                if (newElement.removedIds.length > 0 && !this.isTrackingFormField) {
                    this.constructRevisionFromID(newElement, false);
                    this.copyElementRevision(element, textElement, true);
                }
                else if (this.owner.enableTrackChanges) {
                    if (!(newElement instanceof BookmarkElementBox) && !(newElement instanceof CommentCharacterElementBox) && !(newElement instanceof EditRangeStartElementBox) && !(newElement instanceof EditRangeEndElementBox)) {
                        var isRevisionCombined_1 = this.checkToMapRevisionWithInlineText(element, index, newElement, isBidi, revisionType);
                        if (isRevisionCombined_1 || newElement.revisions.length > prevRevisionCount) {
                            this.copyElementRevision(element, textElement, true);
                        }
                        else if (newElement.revisions.length === prevRevisionCount) {
                            this.splitRevisionForSpittedElement(element, textElement);
                            this.insertRevision(newElement, revisionType);
                        }
                    }
                    else {
                        this.copyElementRevision(element, textElement, false);
                    }
                }
                //Inserts the new inline.
                line.children.splice(insertIndex, 0, newElement);
                insertIndex -= 1;
            }
        }
        else {
            element.text = element.text.substring(0, index) + newElement.text + element.text.substring(index);
        }
        newElement.line = element.line;
        if (newElement instanceof BookmarkElementBox) {
            var bookmarkCol = this.documentHelper.bookmarks;
            if (newElement.reference) {
                newElement.reference.reference = newElement;
            }
            if (!bookmarkCol.containsKey(newElement.name)) {
                bookmarkCol.add(newElement.name, newElement);
            }
        }
        if (!isNullOrUndefined(newElement.line.paragraph.containerWidget) && !isNullOrUndefined(newElement.line.paragraph.containerWidget.containerWidget) && newElement.line.paragraph.containerWidget.containerWidget instanceof FootNoteWidget) {
            newElement.line.paragraph.containerWidget.containerWidget.height += newElement.height;
        }
        newElement.linkFieldCharacter(this.documentHelper);
        if (newElement instanceof ContentControl && newElement.type === 0) {
            this.documentHelper.contentControlCollection.push(newElement);
        }
        if ((newElement instanceof ImageElementBox && newElement.textWrappingStyle !== 'Inline') || newElement instanceof ShapeElementBox) {
            if (paragraph.floatingElements.indexOf(newElement) === -1) {
                paragraph.floatingElements.push(newElement);
            }
            if (paragraph.bodyWidget.floatingElements.indexOf(newElement) === -1 && newElement.textWrappingStyle !== 'Inline') {
                paragraph.bodyWidget.floatingElements.push(newElement);
            }
        }
        if (isTrackingEnabled && !isRevisionCombined && !isUndoing && !this.skipFieldDeleteTracking) {
            this.checkToCombineRevisionsinBlocks(newElement, prevRevisionCount === newElement.revisions.length, (index === element.length), revisionType);
        }
        if (newElement instanceof FootnoteElementBox) {
            if (isUndoing) {
                // this.documentHelper.layout.isLayoutWhole = true;
                newElement.isLayout = false;
            }
            if (newElement.footnoteType === 'Footnote') {
                this.updateFootnoteCollection(newElement);
            }
            if (newElement.footnoteType === 'Endnote') {
                this.updateEndnoteCollection(newElement);
            }
        }
        if (relayout) {
            this.documentHelper.layout.reLayoutParagraph(paragraph, lineIndex, insertIndex, undefined, undefined);
        }
    };
    Editor.prototype.incrementCommentIndex = function (isBidi, element, insertIndex) {
        if (!this.owner.editorHistory || !(this.owner.editorHistory && this.owner.editorHistory.currentHistoryInfo) || (this.owner.editorHistory && this.owner.editorHistory.currentHistoryInfo
            && (this.owner.editorHistory.currentHistoryInfo.action !== "SkipCommentInline" ||
                this.owner.editorHistory.currentHistoryInfo.action === "SkipCommentInline" &&
                    (this.owner.editorHistory.currentHistoryInfo.modifiedActions[0] === this.editorHistory.currentBaseHistoryInfo
                        || (this.owner.editorHistory.currentHistoryInfo.modifiedActions[0] !== this.editorHistory.currentBaseHistoryInfo
                            && !(element instanceof CommentCharacterElementBox)))))) {
            insertIndex++;
        }
        return insertIndex;
    };
    /**
     * @private
     * @returns {void}
     */
    /* eslint-disable @typescript-eslint/no-explicit-any */
    Editor.prototype.constructRevisionFromID = function (insertElement, isEnd, prevElement) {
        if (insertElement.removedIds.length > 0) {
            for (var i = 0; i < insertElement.removedIds.length; i++) {
                var revisionToInclude = undefined;
                if (this.documentHelper.revisionsInternal.containsKey(insertElement.removedIds[i])) {
                    revisionToInclude = this.documentHelper.revisionsInternal.get(insertElement.removedIds[i]);
                    insertElement.revisions.push(revisionToInclude);
                    isEnd = isEnd ? true : this.skipTracking();
                    if (isEnd) {
                        if (this.editorHistory.isRedoing && this.owner.editorHistory.currentBaseHistoryInfo && this.owner.editorHistory.currentBaseHistoryInfo.action === 'BackSpace') {
                            isEnd = false;
                        }
                    }
                    if (!isNullOrUndefined(prevElement)) {
                        var rangeIndex = revisionToInclude.range.indexOf(prevElement);
                        if (rangeIndex >= 0) {
                            revisionToInclude.range.splice(rangeIndex + ((isEnd) ? 1 : 0), 0, insertElement);
                        }
                        else {
                            revisionToInclude.range.splice(0, 0, insertElement);
                        }
                    }
                    else {
                        revisionToInclude.range.splice((isEnd) ? revisionToInclude.range.length : 0, 0, insertElement);
                    }
                    this.owner.trackChangesPane.updateCurrentTrackChanges(revisionToInclude);
                    this.updateRevisionCollection(revisionToInclude);
                }
            }
            insertElement.removedIds = [];
        }
        else {
            // on undoing revisions will be cloned , so need to update range information.
            for (var i = 0; i < insertElement.revisions.length; i++) {
                var currentRevision = insertElement.revisions[i];
                if (this.documentHelper.revisionsInternal.containsKey(currentRevision.revisionID)) {
                    currentRevision = this.documentHelper.revisionsInternal.get(currentRevision.revisionID);
                    currentRevision.range.splice(isEnd ? currentRevision.range.length : 0, 0, insertElement);
                    this.updateRevisionCollection(currentRevision);
                }
            }
        }
    };
    /**
     * Insert block on undo
     *
     * @param {Selection} selection - Specifies the selection
     * @param {WBlock} block - Specifes the block
     * @private
     * @returns {void}
     */
    Editor.prototype.insertBlock = function (block) {
        var isRemoved = true;
        var selection = this.selection;
        if (!selection.isEmpty) {
            isRemoved = this.removeSelectedContents(selection);
        }
        if (!isRemoved) {
            selection.selectContent(selection.start, false);
        }
        this.insertBlockInternal(block);
        if (this.checkInsertPosition(selection)) {
            var paragraph = undefined;
            if (block instanceof ParagraphWidget) {
                paragraph = block;
            }
            else {
                paragraph = this.documentHelper.getFirstParagraphInFirstCell(block);
            }
            this.updateHistoryPosition(this.selection.getHierarchicalIndex(paragraph, '0'), true);
        }
        this.fireContentChange();
    };
    Editor.prototype.insertBlockInternal = function (block) {
        var selection = this.selection;
        var isRemoved = true;
        var startPara = this.selection.start.paragraph;
        if (!selection.start.isAtParagraphStart) {
            if (block instanceof ParagraphWidget) {
                if (!this.isInsertingTOC && this.owner.enableTrackChanges && !this.skipTracking()) {
                    this.insertRevisionForBlock(block, 'Insertion');
                }
                var startPosition = selection.start.clone();
                //let prevBlock: ParagraphWidget = (block as ParagraphWidget).clone()
                if (!this.isInsertingTOC && this.owner.enableTrackChanges && !this.skipTracking()) {
                    this.insertRevisionForBlock(block, 'Insertion');
                }
                this.insertNewParagraphWidget(block, false);
                if (!this.isInsertingTOC) {
                    this.combineRevisions(block, startPosition, this.selection.end);
                }
                return;
            }
            this.updateInsertPosition();
            startPara = startPara.combineWidget(this.owner.viewer);
            this.splitParagraph(startPara, startPara.firstChild, 0, selection.start.currentWidget, selection.start.offset, false);
            selection.selectParagraphInternal(this.selection.start.paragraph, true);
        }
        var bodyWidget = selection.start.paragraph.containerWidget;
        var blockIndex = selection.start.paragraph.index;
        if (!isNullOrUndefined(bodyWidget)) {
            var insertIndex = bodyWidget.childWidgets.indexOf(selection.start.paragraph);
            bodyWidget.childWidgets.splice(insertIndex, 0, block);
            block.containerWidget = bodyWidget;
            block.index = blockIndex;
            block.height = 0;
            if (block instanceof TableWidget) {
                block.isGridUpdated = false;
                block.buildTableColumns();
                block.isGridUpdated = true;
            }
            this.updateNextBlocksIndex(block, true);
            if (!this.isInsertingTOC && this.owner.enableTrackChanges && !this.skipTracking() && block instanceof ParagraphWidget) {
                this.insertRevisionForBlock(block, 'Insertion');
            }
            else if (block instanceof ParagraphWidget) {
                this.constructRevisionsForBlock(block, true);
            }
            else if (block instanceof TableWidget) {
                this.constructRevisionsForTable(block, true);
            }
            this.documentHelper.layout.layoutBodyWidgetCollection(blockIndex, bodyWidget, block, false);
        }
    };
    /**
     * Inserts the image with specified size at cursor position in the document editor.
     *

     *
     * @param {string} imageString  Base64 string, web URL or file URL.
     * @param {number} width Specify the image width.
     * @param {number} height Specify the image height.
     * @param {string} alternateText Specify the image alternateText.
     * @returns {void}
     */
    Editor.prototype.insertImage = function (imageString, width, height, alternateText) {
        this.insertImageInternal(imageString, false, width, height, alternateText);
    };
    /**
     * Inserts an image with a specified size at the cursor position in the DocumentEditor component.
     *
     * @param {string} imageString - The Base64 string, web URL, or file URL of the image to be inserted.
     * @param {number} width - The width of the image. Optional parameter, if not specified, the original width of the image will be used.
     * @param {number} height - The height of the image. Optional parameter, if not specified, the original height of the image will be used.
     * @param {string} alternateText - The alternate text of the image. Optional parameter, if specified, this text will be displayed when the image is not available or when images are disabled in the document.
     * @returns {Promise<void>} - A Promise that is resolved when the image has been inserted successfully, or rejected if the image could not be inserted for any reason.
     */
    Editor.prototype.insertImageAsync = function (imageString, width, height, alternateText) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.insertImageInternal(imageString, false, width, height, alternateText)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Inserts the image with specified size at cursor position in the document editor.
     *
     * @private
     * @param {string} imageString Base64 string, web URL or file URL.
     * @param {boolean} isUiInteracted Is image instered from UI interaction.
     * @param {number} width? Image width
     * @param {number} height? Image height
     * @param {string} alternateText? Image alternateText
     * @returns {void}
     */
    Editor.prototype.insertImageInternal = function (imageString, isUiInteracted, width, height, alternateText) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var formField = _this.selection.getCurrentFormField();
                        var isFormFillProtectedMode = _this.documentHelper.protectionType === 'FormFieldsOnly' && !isNullOrUndefined(formField) && formField.formFieldData instanceof TextFormField;
                        if ((_this.owner.isReadOnlyMode || !_this.canEditContentControl) && !isFormFillProtectedMode) {
                            resolve();
                            return;
                        }
                        if (isNullOrUndefined(width) && isNullOrUndefined(height)) {
                            var image = document.createElement('img');
                            var editor_1 = _this;
                            image.addEventListener('load', function () {
                                editor_1.insertPicture(imageString, this.width, this.height, this.alt, true);
                                resolve();
                            });
                            image.src = imageString;
                        }
                        else {
                            _this.insertPicture(imageString, width, height, alternateText, isUiInteracted);
                            resolve();
                        }
                        setTimeout(function () {
                            if (!isNullOrUndefined(_this.viewer)) {
                                _this.viewer.updateScrollBars();
                            }
                        }, 30);
                    })];
            });
        });
    };
    /**
     * Inserts a table of specified size at cursor position in the document editor.
     *
     * @param {number} rows Default value of ‘rows’ parameter is 1.
     * @param {number} columns Default value of ‘columns’ parameter is 1.
     * @returns {void}
     */
    Editor.prototype.insertTable = function (rows, columns) {
        var startPos = this.selection.start;
        if (this.owner.isReadOnlyMode || !this.canEditContentControl) {
            return;
        }
        rows = rows || 1;
        columns = columns || 1;
        var localeValue = new L10n('documenteditor', this.owner.defaultLocale);
        localeValue.setLocale(this.documentHelper.owner.locale);
        if (columns < 1 || columns > this.documentHelper.owner.documentEditorSettings.maximumColumns) {
            var columnAlertPopup = localeValue.getConstant('Number of columns must be between') + ' 1 ' + localeValue.getConstant('and') + ' ' + this.documentHelper.owner.documentEditorSettings.maximumColumns.toString();
            DialogUtility.alert(columnAlertPopup).enableRtl = this.documentHelper.owner.enableRtl;
            return;
        }
        if (rows < 1 || rows > this.documentHelper.owner.documentEditorSettings.maximumRows) {
            var rowAlertPopup = localeValue.getConstant('Number of rows must be between') + ' 1 ' + localeValue.getConstant('and') + ' ' + this.documentHelper.owner.documentEditorSettings.maximumColumns.toString();
            localeValue.getConstant('Number of rows must be between 1 and 32767.').replace("32767", this.documentHelper.owner.documentEditorSettings.maximumRows.toString());
            DialogUtility.alert(rowAlertPopup).enableRtl = this.documentHelper.owner.enableRtl;
            return;
        }
        var table = this.createTable(rows, columns);
        var clientWidth = startPos.paragraph.getContainerWidth() - table.tableFormat.leftIndent;
        table.splitWidthToTableCells(clientWidth);
        var removedComment;
        var prevBlock = startPos.paragraph.previousWidget;
        if (startPos.currentWidget.isFirstLine() && startPos.offset === 0 && prevBlock instanceof TableWidget) {
            this.insertTableRows(table, prevBlock);
            table.destroy();
            return;
        }
        else {
            removedComment = this.checkAndRemoveComments();
            this.initHistory('InsertTable');
            this.documentHelper.owner.isShiftingEnabled = true;
            this.insertBlock(table);
            if (!isNullOrUndefined(table.containerWidget) && !isNullOrUndefined(table.containerWidget.containerWidget) && table.containerWidget.containerWidget instanceof FootNoteWidget) {
                table.containerWidget.containerWidget.height += table.height;
                this.isTableInsert = true;
            }
        }
        var startLine = this.documentHelper.getFirstParagraphInFirstCell(table).childWidgets[0];
        startPos.setPosition(startLine, true);
        this.selection.end.setPositionInternal(startPos);
        var lastParagraph = this.documentHelper.getLastParagraphInLastCell(table.getSplitWidgets().pop());
        var endOffset = lastParagraph.getLength() + 1;
        if (this.editorHistory && this.editorHistory.currentBaseHistoryInfo) {
            this.editorHistory.currentBaseHistoryInfo.endPosition = this.selection.getHierarchicalIndex(lastParagraph, endOffset.toString());
        }
        this.reLayout(this.selection);
        this.isTableInsert = false;
        this.updateHistoryForComments(removedComment);
    };
    /**
     * Inserts the specified number of rows to the table above or below to the row at cursor position.
     *
     * @param {boolean} above The above parameter is optional and if omitted,
     * it takes the value as false and inserts below the row at cursor position.
     * @param {number} count The count parameter is optional and if omitted, it takes the value as 1.
     * @returns {void}
     */
    Editor.prototype.insertRow = function (above, count) {
        var rowPlacement = above ? 'Above' : 'Below';
        if (this.owner.isReadOnlyMode || !this.canEditContentControl) {
            return;
        }
        var isInsertRow = true;
        var startPos = this.selection.isForward ? this.selection.start : this.selection.end;
        var endPos = this.selection.isForward ? this.selection.end : this.selection.start;
        if (startPos.paragraph.isInsideTable) {
            if (this.checkIsNotRedoing()) {
                this.initHistory(rowPlacement === 'Above' ? 'InsertRowAbove' : 'InsertRowBelow');
            }
            this.documentHelper.owner.isShiftingEnabled = true;
            var startCell = this.getOwnerCell(this.selection.isForward).getSplitWidgets()[0];
            var endCell = this.getOwnerCell(!this.selection.isForward).getSplitWidgets()[0];
            var table = startCell.ownerTable.combineWidget(this.owner.viewer);
            var row = rowPlacement === 'Below' ? endCell.ownerRow : startCell.ownerRow;
            if (this.editorHistory) {
                var clonedTable = this.cloneTableToHistoryInfo(table);
            }
            this.rowInsertion(count, rowPlacement, startCell, endCell, row, table, isInsertRow);
        }
        this.reLayout(this.selection, true);
    };
    Editor.prototype.rowInsertion = function (count, rowPlacement, startCell, endCell, row, table, isInsertRow) {
        var rowCount = count ? count : this.getRowCountToInsert();
        var rows = [];
        var index = row.rowIndex;
        if (rowPlacement === 'Below') {
            index++;
            var isAffectedByRowSpannedCell = isNullOrUndefined(endCell.previousWidget)
                || endCell.columnIndex === endCell.previousWidget.columnIndex + 1;
            var isRowSpanEnd = endCell.cellIndex !== endCell.columnIndex && isAffectedByRowSpannedCell
                && row.rowIndex + startCell.cellFormat.rowSpan - 1 === endCell.ownerRow.rowIndex;
            if (!isRowSpanEnd) {
                if (endCell.cellFormat.rowSpan > 1) {
                    if (!isNullOrUndefined(row.nextWidget) && row.nextWidget instanceof TableRowWidget) {
                        endCell.cellFormat.rowSpan += rowCount;
                        row = row.nextWidget;
                    }
                }
            }
            row.bottomBorderWidth = 0;
        }
        for (var i = 0; i < rowCount; i++) {
            var cellCountInfo = this.updateRowspan(row, rowPlacement === 'Below' ? endCell : startCell, rowPlacement);
            var newRow = this.createRowAndColumn(cellCountInfo.count, i, index, table);
            newRow.rowFormat.copyFormat(row.rowFormat);
            if (this.owner.enableTrackChanges) {
                this.insertRevision(newRow.rowFormat, 'Insertion');
            }
            this.updateCellFormatForInsertedRow(newRow, cellCountInfo.cellFormats);
            rows.push(newRow);
        }
        table.insertTableRowsInternal(rows, index, isInsertRow);
        var cell = undefined;
        var paragraph = undefined;
        if ((table.childWidgets[index] instanceof TableRowWidget)) {
            cell = table.childWidgets[index].firstChild;
            paragraph = this.selection.getFirstParagraph(cell);
        }
        else {
            var widget = undefined;
            while (!(widget instanceof TableWidget)) {
                widget = table.nextRenderedWidget;
            }
            paragraph = this.documentHelper.getFirstParagraphInFirstCell(widget);
        }
        if (isInsertRow) {
            this.documentHelper.layout.reLayoutTable(table);
        }
        this.selection.selectParagraphInternal(paragraph, true);
    };
    /**
     * Fits the table based on AutoFitType.
     *
     * @param {AutoFitType} fitType Specify the auto fit type.
     * @returns {void}
     */
    Editor.prototype.autoFitTable = function (fitType) {
        if (this.documentHelper.owner.isReadOnlyMode || !this.canEditContentControl) {
            return;
        }
        var startPosition = this.selection.start;
        var endPosition = this.selection.end;
        if (!this.selection.isForward) {
            startPosition = this.selection.end;
            endPosition = this.selection.start;
        }
        var tableAdv = this.selection.getTable(startPosition, endPosition);
        tableAdv = tableAdv.getSplitWidgets()[0];
        var parentTable = this.documentHelper.layout.getParentTable(tableAdv);
        if (!isNullOrUndefined(parentTable)) {
            this.setOffsetValue(this.selection);
            parentTable = parentTable.combineWidget(this.owner.viewer);
            this.initHistory(fitType === 'FitToContents' ? 'TableAutoFitToContents' : fitType === 'FitToWindow' ? 'TableAutoFitToWindow' : 'TableFixedColumnWidth');
            if (this.documentHelper.owner.editorHistoryModule) {
                this.cloneTableToHistoryInfo(parentTable);
            }
            parentTable.updateProperties(true, tableAdv, fitType);
            this.documentHelper.owner.isShiftingEnabled = true;
            //Layouts the table.
            this.documentHelper.layout.reLayoutTable(tableAdv);
            this.reLayout(this.selection, true);
        }
    };
    Editor.prototype.updateCellFormatForInsertedRow = function (newRow, cellFormats) {
        for (var i = 0; i < newRow.childWidgets.length; i++) {
            newRow.childWidgets[i].cellFormat.copyFormat(cellFormats[i]);
            newRow.childWidgets[i].cellFormat.rowSpan = 1;
        }
    };
    Editor.prototype.updateRowspan = function (row, startCell, rowPlacement) {
        var spannedCells = row.getPreviousRowSpannedCells(true);
        var count = 0;
        var cellFormats = [];
        for (var i = 0; i < row.childWidgets.length; i++) {
            var cell = row.childWidgets[i];
            var isCellIncluded = false;
            // Need to check with all the row spanned cells. if the start cell contains rowspan greater than 1, 
            // and when inserting below, need to increment rowspan for all row spanned cells by 1 except
            // if the spanned cells is placed in the same column or cell to be cloned has the same row index of cloned cell row index.
            // and when inserting above, if cloned cell placed in the same row of start cell or
            // if the cloned cell has equal column index, need to skip updating rowspan value of cloned cell.
            // else update row span value for spanned cell except 
            // if the spanned cells is placed in the same column or cell to be cloned has the same row index of cloned cell row index.
            var isRowSpanned = (isNullOrUndefined(cell.previousWidget)
                || cell.columnIndex !== cell.previousWidget.columnIndex + 1);
            for (var j = 0; j < spannedCells.length; j++) {
                if (isRowSpanned) {
                    var spannedCell = spannedCells[j];
                    var clonedRowIndex = spannedCell.ownerRow.rowIndex + spannedCell.cellFormat.rowSpan - 1;
                    if (cell.columnIndex < spannedCell.columnIndex && cell.cellIndex !== cell.columnIndex) {
                        isCellIncluded = true;
                        count++;
                        cellFormats.push(cell.cellFormat);
                    }
                    if (startCell.cellFormat.rowSpan === 1) {
                        // Need to check whether cell is affected by a row spanned cell. if cell is placed on the row where it is affected 
                        // by row spanned cell, then if we are inserting row below, need to add new cell with spanned cell width
                        // or if we are inserting above, need to update row span value of the spanned cell.
                        // if cell is placed inbetween the spanned cell , 
                        // then if we are inserting below, need to update row span value of spanned cell or
                        // if we are inserting above, need to skip updating row span value except
                        // if start cell is placed on the same row of spanned cell or if start cell placed in the same column.
                        if (clonedRowIndex > cell.ownerRow.rowIndex) {
                            if (rowPlacement === 'Above'
                                && spannedCell.ownerRow === startCell.ownerRow) {
                                continue;
                            }
                            else {
                                spannedCell.cellFormat.rowSpan += 1;
                                spannedCells.splice(j, 1);
                                j--;
                            }
                        }
                        else if (cell.cellIndex !== cell.columnIndex && isRowSpanned && clonedRowIndex === cell.ownerRow.rowIndex) {
                            if (rowPlacement === 'Above') {
                                spannedCell.cellFormat.rowSpan += 1;
                                spannedCells.splice(j, 1);
                                j--;
                            }
                            else {
                                count++;
                                cellFormats.push(spannedCell.cellFormat);
                                spannedCells.splice(j, 1);
                                j--;
                            }
                        }
                    }
                    else {
                        if (spannedCell !== startCell) {
                            if (rowPlacement === 'Above'
                                && (spannedCell.ownerRow === startCell.ownerRow || spannedCell.columnIndex === startCell.columnIndex)) {
                                continue;
                            }
                            else {
                                if (spannedCell.columnIndex !== startCell.columnIndex
                                    && spannedCell.ownerRow.rowIndex !== cell.ownerRow.rowIndex
                                    && (clonedRowIndex > startCell.ownerRow.rowIndex
                                        || (rowPlacement === 'Above' && clonedRowIndex === startCell.ownerRow.rowIndex))) {
                                    spannedCell.cellFormat.rowSpan += 1;
                                    spannedCells.splice(j, 1);
                                    j--;
                                }
                            }
                        }
                    }
                }
            }
            if (spannedCells.indexOf(cell) === -1 && cell.cellFormat.rowSpan > 1) {
                isCellIncluded = true;
            }
            if (!isCellIncluded) {
                count++;
                cellFormats.push(cell.cellFormat);
            }
        }
        return { count: count, cellFormats: cellFormats };
    };
    Editor.prototype.insertTableRows = function (table, prevBlock) {
        this.initHistory('InsertTableBelow');
        table.containerWidget = prevBlock.containerWidget;
        prevBlock = prevBlock.combineWidget(this.owner.viewer);
        // if (this.editorHistory) {
        //     let clonedTable: TableWidget = this.cloneTableToHistoryInfo(prevBlock);
        // }
        var row = prevBlock.childWidgets[prevBlock.childWidgets.length - 1];
        prevBlock.insertTableRowsInternal(table.childWidgets, prevBlock.childWidgets.length, true);
        var paragraph = this.selection.getFirstParagraph(row.nextWidget.childWidgets[0]);
        if (this.checkInsertPosition(this.selection)) {
            this.updateHistoryPosition(this.selection.getHierarchicalIndex(paragraph, '0'), true);
        }
        prevBlock.isDefaultFormatUpdated = false;
        this.documentHelper.layout.reLayoutTable(prevBlock);
        this.selection.start.setPosition(paragraph.firstChild, true);
        if (this.editorHistory && this.editorHistory.currentBaseHistoryInfo) {
            this.updateHistoryPosition(this.selection.end, false);
        }
        this.selection.end.setPosition(paragraph.firstChild, true);
        this.reLayout(this.selection);
    };
    /**
     * Inserts the specified number of columns to the table left or right to the column at cursor position.
     *
     * @param {number} left The left parameter is optional and if omitted, it takes the value as false and
     * inserts to the right of column at cursor position.
     * @param {number} count The count parameter is optional and if omitted, it takes the value as 1.
     * @returns {void}
     */
    Editor.prototype.insertColumn = function (left, count) {
        if (this.owner.isReadOnlyMode || !this.canEditContentControl) {
            return;
        }
        var columnPlacement = left ? 'Left' : 'Right';
        if (this.selection.start.paragraph.isInsideTable) {
            if (this.checkIsNotRedoing()) {
                this.initHistory(columnPlacement === 'Left' ? 'InsertColumnLeft' : 'InsertColumnRight');
            }
            this.selection.owner.isShiftingEnabled = true;
            var startCell = this.getOwnerCell(this.selection.isForward);
            var endCell = this.getOwnerCell(!this.selection.isForward);
            var table = startCell.ownerRow.ownerTable.combineWidget(this.owner.viewer);
            if (this.editorHistory) {
                //Clones the entire table to preserve in history.
                this.cloneTableToHistoryInfo(table);
            }
            this.selection.owner.isLayoutEnabled = false;
            var cellIndex = startCell.columnIndex;
            if (columnPlacement === 'Right') {
                cellIndex = endCell.columnIndex + endCell.cellFormat.columnSpan;
            }
            var startParagraph = undefined;
            var newCell = undefined;
            var columnCount = count ? count : this.getColumnCountToInsert();
            var rowSpannedCells = [];
            //let rowSpanCellIndex: number = cellIndex;
            for (var i = 0; i < columnCount; i++) {
                for (var j = 0; j < table.childWidgets.length; j++) {
                    var row = table.childWidgets[j];
                    newCell = this.createColumn(this.selection.getLastParagraph(startCell));
                    newCell.index = j;
                    newCell.rowIndex = row.rowIndex;
                    newCell.containerWidget = row;
                    newCell.cellFormat.copyFormat(startCell.cellFormat);
                    newCell.cellFormat.rowSpan = 1;
                    if (isNullOrUndefined(startParagraph)) {
                        startParagraph = this.selection.getFirstParagraph(newCell);
                    }
                    if (cellIndex === 0) {
                        row.childWidgets.splice(cellIndex, 0, newCell);
                    }
                    else {
                        this.insertSpannedCells(row, rowSpannedCells, newCell, cellIndex);
                    }
                    this.copyCellFormats(row, cellIndex);
                }
            }
            this.tableReLayout(table, startParagraph, newCell);
        }
    };
    Editor.prototype.copyCellFormats = function (row, index) {
        var newCell = row.childWidgets[index];
        if (!isNullOrUndefined(newCell)) {
            var newCellPara = newCell.childWidgets[0];
            (index == (row.childWidgets.length - 1)) ? --index : ++index;
            var nextCell = row.childWidgets[index];
            var nextCellpara = nextCell.childWidgets[0];
            var line = void 0;
            var nextCellTextBox = void 0;
            if (nextCellpara.childWidgets.length > 0) {
                line = nextCellpara.childWidgets[0];
                if (line.children.length > 0) {
                    nextCellTextBox = line.children[0];
                }
            }
            newCellPara.paragraphFormat.copyFormat(nextCellpara.paragraphFormat);
            if (!isNullOrUndefined(nextCellTextBox)) {
                newCellPara.characterFormat.copyFormat(nextCellTextBox.characterFormat);
            }
            else {
                newCellPara.characterFormat.copyFormat(nextCellpara.characterFormat);
            }
        }
    };
    Editor.prototype.tableReLayout = function (table, startParagraph, newCell) {
        table.updateRowIndex(0);
        var parentTable = this.documentHelper.layout.getParentTable(table);
        if (parentTable) {
            parentTable.fitChildToClientArea();
        }
        else {
            table.fitChildToClientArea();
        }
        this.selection.owner.isLayoutEnabled = true;
        table.isGridUpdated = false;
        table.buildTableColumns();
        table.isGridUpdated = true;
        this.documentHelper.skipScrollToPosition = true;
        this.documentHelper.layout.reLayoutTable(table);
        this.selection.start.setPosition(startParagraph.firstChild, true);
        this.selection.end.setPosition(this.selection.getLastParagraph(newCell).firstChild, false);
        if (this.checkIsNotRedoing() || isNullOrUndefined(this.editorHistory)) {
            this.reLayout(this.selection);
        }
    };
    /**
     * Creates table with specified rows and columns.
     * @private
     *
     * @returns {TableWidget}
     */
    Editor.prototype.createTable = function (rows, columns) {
        var startPara = this.selection.start.paragraph;
        var table = new TableWidget();
        table.tableFormat.preferredWidthType = 'Auto';
        table.tableFormat.leftIndent = this.selection.start.paragraph.leftIndent;
        table.tableFormat.initializeTableBorders();
        var index = 0;
        while (index < rows) {
            var tableRow = this.createRowAndColumn(columns, index);
            tableRow.rowFormat.heightType = 'Auto';
            if (this.owner.enableTrackChanges) {
                this.insertRevision(tableRow.rowFormat, 'Insertion');
            }
            tableRow.containerWidget = table;
            table.childWidgets.push(tableRow);
            index++;
        }
        return table;
    };
    Editor.prototype.createRowAndColumn = function (columns, rowIndex, index, table) {
        var tableWidget = table;
        var startPara = this.selection.start.paragraph;
        var tableRow = new TableRowWidget();
        tableRow.rowFormat = new WRowFormat(tableRow);
        tableRow.index = rowIndex;
        for (var i = 0; i < columns; i++) {
            if (!isNullOrUndefined(index) && !isNullOrUndefined(tableWidget)) {
                if (index && index > 0 && tableWidget.childWidgets[index - 1] && tableWidget.childWidgets[index - 1].childWidgets[i]) {
                    startPara = tableWidget.childWidgets[index - 1].childWidgets[i].childWidgets[0];
                }
                else if (index == 0) {
                    startPara = tableWidget.childWidgets[index].childWidgets[i].childWidgets[0];
                }
            }
            var tableCell = this.createColumn(startPara, true);
            tableCell.index = i;
            tableCell.rowIndex = rowIndex;
            tableCell.containerWidget = tableRow;
            tableRow.childWidgets.push(tableCell);
        }
        return tableRow;
    };
    Editor.prototype.createColumn = function (paragraph, isNewRow) {
        var tableCell = new TableCellWidget();
        var para = new ParagraphWidget();
        if (isNewRow) {
            para.paragraphFormat.copyFormat(paragraph.paragraphFormat);
            para.paragraphFormat.leftIndent = 0;
            para.paragraphFormat.firstLineIndent = 0;
            var elementBox = paragraph.childWidgets[0].children[0];
            if (!isNullOrUndefined(elementBox)) {
                para.characterFormat.copyFormat(elementBox.characterFormat);
            }
            else {
                para.characterFormat.copyFormat(paragraph.characterFormat);
            }
        }
        para.containerWidget = tableCell;
        tableCell.childWidgets.push(para);
        tableCell.cellFormat = new WCellFormat(tableCell);
        return tableCell;
    };
    Editor.prototype.getColumnCountToInsert = function () {
        var count = 1;
        var start = this.selection.start;
        var end = this.selection.end;
        if (!this.selection.isForward) {
            start = this.selection.end;
            end = this.selection.start;
        }
        if (start && end && this.selection.getTable(start, end)) {
            if (start.paragraph.associatedCell === end.paragraph.associatedCell) {
                return count = 1;
            }
            if (start.paragraph.associatedCell.ownerRow === end.paragraph.associatedCell.ownerRow) {
                return count = count + end.paragraph.associatedCell.cellIndex - start.paragraph.associatedCell.cellIndex;
            }
            else {
                count = 0;
                var selectedCells = start.paragraph.associatedCell.ownerTable.getColumnCellsForSelection(start.paragraph.associatedCell, end.paragraph.associatedCell);
                for (var i = 0; i < selectedCells.length; i++) {
                    if (start.paragraph.associatedCell.ownerRow === selectedCells[i].ownerRow) {
                        count++;
                    }
                }
            }
        }
        return count === 0 ? 1 : count;
    };
    Editor.prototype.getRowCountToInsert = function () {
        var count = 1;
        var start = this.selection.start;
        var end = this.selection.end;
        if (!this.selection.isForward) {
            start = this.selection.end;
            end = this.selection.start;
        }
        if (!isNullOrUndefined(start) && !isNullOrUndefined(end) && !isNullOrUndefined(this.selection.getTable(start, end))) {
            if (start.paragraph.associatedCell === end.paragraph.associatedCell ||
                start.paragraph.associatedCell.ownerRow === end.paragraph.associatedCell.ownerRow) {
                return count = 1;
            }
            else {
                return count = count +
                    this.getOwnerRow(!this.selection.isForward).rowIndex - this.getOwnerRow(this.selection.isForward).rowIndex;
            }
        }
        return count === 0 ? 1 : count;
    };
    Editor.prototype.getOwnerCell = function (isStart) {
        var cell = undefined;
        var startCell = isStart ? this.selection.start.paragraph.associatedCell
            : this.selection.end.paragraph.associatedCell;
        var endCell = isStart ? this.selection.end.paragraph.associatedCell
            : this.selection.start.paragraph.associatedCell;
        cell = startCell;
        var owner = cell.ownerTable;
        while (!isNullOrUndefined(owner) && owner.containerWidget instanceof TableCellWidget && owner !== endCell.ownerTable) {
            cell = owner.containerWidget;
            owner = cell.ownerTable;
        }
        return cell;
    };
    Editor.prototype.getOwnerRow = function (isStart) {
        var row;
        var startRow = isStart ? this.selection.start.paragraph.associatedCell.ownerRow
            : this.selection.end.paragraph.associatedCell.ownerRow;
        var endRow = isStart ? this.selection.end.paragraph.associatedCell.ownerRow
            : this.selection.start.paragraph.associatedCell.ownerRow;
        row = startRow;
        var owner = row.ownerTable;
        while (!isNullOrUndefined(owner) && owner.containerWidget instanceof TableCellWidget && owner !== endRow.ownerTable) {
            row = owner.containerWidget.ownerRow;
            owner = row.ownerTable;
        }
        return row;
    };
    Editor.prototype.getOwnerTable = function (isStart) {
        var table = undefined;
        var startTable = this.selection.start.paragraph.associatedCell.ownerTable;
        var endTable = this.selection.end.paragraph.associatedCell.ownerTable;
        table = isStart ? startTable : endTable;
        while (table.containerWidget instanceof TableCellWidget && table !== (isStart ? endTable : startTable)) {
            table = table.containerWidget.ownerTable;
        }
        return table;
    };
    /**
     * Merge Selected cells
     *
     * @private
     * @returns {void}
     */
    Editor.prototype.mergeSelectedCellsInTable = function () {
        if (!this.canMergeCells()) {
            return;
        }
        if (this.owner.enableTrackChanges) {
            var localizeValue = new L10n('documenteditor', this.owner.defaultLocale);
            localizeValue.setLocale(this.owner.locale);
            this.alertDialog = DialogUtility.alert({
                title: localizeValue.getConstant('UnTrack'),
                content: localizeValue.getConstant('Merge Track'),
                showCloseIcon: true,
                okButton: {
                    text: 'Ok', click: this.confirmCellMerge.bind(this)
                },
                closeOnEscape: true,
                position: { X: 'center', Y: 'center' },
                animationSettings: { effect: 'Zoom' }
            });
            this.alertDialog.enableRtl = this.owner.enableRtl;
        }
        else {
            this.confirmCellMerge();
        }
    };
    Editor.prototype.confirmCellMerge = function () {
        if (this.checkIsNotRedoing()) {
            this.initHistory('MergeCells');
        }
        this.selection.owner.isShiftingEnabled = true;
        var startPosition = this.selection.start;
        var endPosition = this.selection.end;
        if (!this.selection.isForward) {
            startPosition = this.selection.end;
            endPosition = this.selection.start;
        }
        var startOwnerCell = this.getOwnerCell(this.selection.isForward);
        var endOwnerCell = this.getOwnerCell(!this.selection.isForward);
        var containerCell = this.selection.getContainerCellOf(startOwnerCell, endOwnerCell);
        if (containerCell.ownerTable.contains(endOwnerCell)) {
            if (!this.selection.containsCell(containerCell, endOwnerCell)) {
                //Start and End are in different cells.               
                var table = startOwnerCell.ownerTable.combineWidget(this.owner.viewer);
                startOwnerCell = this.selection.getSelectedCell(startOwnerCell, containerCell);
                endOwnerCell = this.selection.getSelectedCell(endOwnerCell, containerCell);
                //Merges the selected cells.               
                var mergedCell = this.mergeSelectedCells(table, startOwnerCell, endOwnerCell);
                var firstParagraph = this.selection.getFirstParagraph(mergedCell);
                startPosition.setPosition(firstParagraph.firstChild, true);
                var lastParagraph = this.selection.getLastParagraph(mergedCell);
                endPosition.setPosition(lastParagraph.lastChild, false);
                this.selection.fireSelectionChanged(false);
            }
        }
        if (this.checkIsNotRedoing() || isNullOrUndefined(this.editorHistory)) {
            this.reLayout(this.selection, false);
        }
        if (!isNullOrUndefined(this.alertDialog)) {
            this.alertDialog.close();
            this.alertDialog = undefined;
        }
    };
    Editor.prototype.mergeSelectedCells = function (table, startCell, endCell) {
        //Clones the entire table to preserve in history.
        var clonedTable = this.cloneTableToHistoryInfo(table);
        this.selection.owner.isLayoutEnabled = false;
        //Merges the selected cells.
        var start = this.selection.getCellLeft(startCell.ownerRow, startCell);
        var end = start + startCell.cellFormat.cellWidth;
        var endCellLeft = this.selection.getCellLeft(endCell.ownerRow, endCell);
        var endCellRight = endCellLeft + endCell.cellFormat.cellWidth;
        var cellInfo = this.updateSelectedCellsInTable(start, end, endCellLeft, endCellRight);
        start = cellInfo.start;
        end = cellInfo.end;
        var count = table.childWidgets.indexOf(endCell.ownerRow);
        var rowStartIndex = table.childWidgets.indexOf(startCell.ownerRow);
        var mergedCell = undefined;
        var firstBlock;
        for (var i = rowStartIndex; i <= count; i++) {
            var row = table.childWidgets[i];
            for (var j = 0; j < row.childWidgets.length; j++) {
                var cell = row.childWidgets[j];
                var cellStart = this.selection.getCellLeft(row, cell);
                if (HelperMethods.round(start, 2) <= HelperMethods.round(cellStart, 2)
                    && HelperMethods.round(cellStart, 2) < HelperMethods.round(end, 2)) {
                    var lastBlock = cell.lastChild;
                    if (lastBlock instanceof ParagraphWidget && lastBlock.isEmpty()) {
                        cell.childWidgets.pop();
                    }
                    if (isNullOrUndefined(mergedCell)) {
                        mergedCell = cell;
                        firstBlock = lastBlock;
                    }
                    else {
                        if (i === rowStartIndex) {
                            mergedCell.cellFormat.preferredWidth += cell.cellFormat.preferredWidth;
                            mergedCell.cellFormat.columnSpan += cell.cellFormat.columnSpan;
                            this.mergeBorders(mergedCell, cell);
                        }
                        for (var k = 0; k < cell.childWidgets.length; k++) {
                            var block = cell.childWidgets[k];
                            var newBlock = block.clone();
                            newBlock.containerWidget = mergedCell;
                            mergedCell.childWidgets.push(newBlock);
                        }
                        row.childWidgets.splice(j, 1);
                        cell.destroy();
                        j--;
                        for (var l = this.documentHelper.contentControlCollection.length - 1; l > -1; l--) {
                            var content = this.documentHelper.contentControlCollection[l];
                            if (isNullOrUndefined(content.contentControlProperties)) {
                                this.documentHelper.contentControlCollection.splice(l);
                            }
                        }
                    }
                }
            }
            //To Ensure minimul content. 
            if ((mergedCell.childWidgets.length === 0 || mergedCell.childWidgets.length === 1 && mergedCell.childWidgets[0] instanceof TableWidget) && firstBlock) {
                var newBlock = firstBlock.clone();
                mergedCell.childWidgets.push(newBlock);
                newBlock.containerWidget = mergedCell;
            }
            if (row.childWidgets.length === 0) {
                var rowIndex = table.childWidgets.indexOf(row);
                row.updateRowBySpannedCells();
                table.childWidgets.splice(rowIndex, 1);
                row.destroy();
                count--;
                i--;
            }
        }
        if (!isNullOrUndefined(mergedCell) && rowStartIndex < count) {
            mergedCell.cellFormat.rowSpan = count - rowStartIndex + 1;
        }
        this.updateBlockIndexAfterMerge(mergedCell);
        table.updateRowIndex(0);
        table.calculateGrid();
        table.isGridUpdated = false;
        table.buildTableColumns();
        table.isGridUpdated = true;
        this.documentHelper.layout.reLayoutTable(table);
        //Layouts the table after merging cells.
        this.selection.owner.isLayoutEnabled = true;
        return mergedCell;
    };
    Editor.prototype.mergeBorders = function (mergedCell, tableCell) {
        var mergedCellborders = undefined;
        var cellBorders = null;
        if (!isNullOrUndefined(mergedCell.cellFormat.borders)) {
            mergedCellborders = mergedCell.cellFormat.borders;
        }
        if (!isNullOrUndefined(tableCell.cellFormat.borders)) {
            cellBorders = tableCell.cellFormat.borders;
        }
        if (isNullOrUndefined(mergedCellborders) && isNullOrUndefined(cellBorders)) {
            return;
        }
        if (isNullOrUndefined(mergedCellborders)) {
            mergedCellborders = new WBorders(mergedCell.cellFormat);
            mergedCellborders.copyFormat(cellBorders);
        }
        else if (isNullOrUndefined(cellBorders)) {
            return;
        }
        else {
            if (mergedCell.ownerRow.rowIndex === tableCell.ownerRow.rowIndex) {
                mergedCellborders.top = mergedCell.getBorderBasedOnPriority(mergedCellborders.top, cellBorders.bottom);
                mergedCellborders.bottom = mergedCell.getBorderBasedOnPriority(mergedCellborders.bottom, cellBorders.bottom);
            }
        }
    };
    Editor.prototype.updateBlockIndexAfterMerge = function (cell) {
        for (var i = 0; i < cell.childWidgets.length; i++) {
            cell.childWidgets[i].index = i;
        }
    };
    /**
     * Determines whether the merge cell operation can be done.
     *
     * @returns {boolean} Returns true if to merge cells; Otherwise, false.
     */
    Editor.prototype.canMergeCells = function () {
        if (this.selection.isEmpty || !this.selection.start.paragraph.isInsideTable || !this.selection.end.paragraph.isInsideTable) {
            return false;
        }
        var startPos = this.selection.start;
        var endPos = this.selection.end;
        if (!this.selection.isForward) {
            startPos = this.selection.end;
            endPos = this.selection.start;
        }
        var startCell = this.getOwnerCell(this.selection.isForward);
        var endCell = this.getOwnerCell(!this.selection.isForward);
        var containerCell = this.selection.getContainerCellOf(startCell, endCell);
        if (containerCell.ownerTable.contains(endCell)) {
            if (!this.selection.containsCell(containerCell, endCell)) {
                startCell = this.selection.getSelectedCell(startCell, containerCell);
                endCell = this.selection.getSelectedCell(endCell, containerCell);
                var rowSpan = 1;
                if (startCell.ownerRow === endCell.ownerRow) {
                    var startCellIndex = startCell.ownerRow.childWidgets.indexOf(startCell);
                    for (var i = startCellIndex; i <= startCell.ownerRow.childWidgets.indexOf(endCell); i++) {
                        var cell = startCell.ownerRow.childWidgets[i];
                        var prevCell = cell.previousWidget;
                        if (i !== startCellIndex) {
                            if (cell.cellFormat.rowSpan !== rowSpan) {
                                return false;
                            }
                            if (!isNullOrUndefined(prevCell)
                                && cell.columnIndex !== (prevCell.cellFormat.columnSpan + prevCell.columnIndex)) {
                                return false;
                            }
                        }
                        rowSpan = cell.cellFormat.rowSpan;
                    }
                    return true;
                }
                return this.canMergeSelectedCellsInTable(startCell.ownerTable, startCell, endCell);
            }
        }
        return false;
    };
    Editor.prototype.canMergeSelectedCellsInTable = function (table, startCell, endCell) {
        var count = table.childWidgets.indexOf(endCell.ownerRow);
        var rowStartIndex = table.childWidgets.indexOf(startCell.ownerRow);
        var startLeft = this.selection.getCellLeft(startCell.ownerRow, startCell);
        var endLeft = startLeft + startCell.cellFormat.cellWidth;
        var endCellLeft = this.selection.getCellLeft(endCell.ownerRow, endCell);
        var endCellRight = endCellLeft + endCell.cellFormat.cellWidth;
        var cellInfo = this.updateSelectedCellsInTable(startLeft, endLeft, endCellLeft, endCellRight);
        startLeft = cellInfo.start;
        endLeft = cellInfo.end;
        var selectionLeft = 0;
        var selectionRight = 0;
        var isRowLeftWithinSel = false;
        var isRowRightWithinSel = false;
        var rowSpannedCells = [];
        for (var i = rowStartIndex; i <= count; i++) {
            var row = table.childWidgets[i];
            var rowLeft = 0;
            var rowRight = 0;
            var isStarted = false;
            for (var j = 0; j < row.childWidgets.length; j++) {
                var cell = row.childWidgets[j];
                var cellStart = this.selection.getCellLeft(row, cell);
                if (this.checkCellWithInSelection(startLeft, endLeft, cellStart)) {
                    isRowLeftWithinSel = false;
                    isRowRightWithinSel = false;
                    if (cell.cellFormat.rowSpan > 1) {
                        rowSpannedCells.push(cell);
                    }
                    if (!isStarted) {
                        rowLeft = cellStart;
                        rowRight = cellStart;
                        isStarted = true;
                    }
                    var prevCell = cell.previousWidget;
                    if (rowRight !== 0 && HelperMethods.round(rowRight, 0) !== HelperMethods.round(cellStart, 0)) {
                        rowRight = cellStart;
                    }
                    rowRight += HelperMethods.convertPointToPixel(cell.cellFormat.cellWidth);
                    var isPrevCellWithinSel = this.checkPrevOrNextCellIsWithinSel(startLeft, endLeft, cell, true);
                    var isNextCellWithinSel = this.checkPrevOrNextCellIsWithinSel(startLeft, endLeft, cell, false);
                    // When selected cell not having row spanned cells and column index is not having immediate cell index value,
                    // then returned false.
                    var isNoRowSpan = rowSpannedCells.length === 0 || rowSpannedCells.length === 1 && rowSpannedCells[0] === cell;
                    // checks whether current cell is with in selection.
                    var isCellWithInSel = this.checkCurrentCell(rowSpannedCells, cell, isPrevCellWithinSel, isNextCellWithinSel);
                    // when last selected row not having equal row span then returned false.
                    if (i === count && !isNullOrUndefined(prevCell) && cell.cellFormat.rowSpan > prevCell.cellFormat.rowSpan
                        && !isCellWithInSel) {
                        return false;
                    }
                    if (i !== rowStartIndex) {
                        for (var m = 0; m < rowSpannedCells.length; m++) {
                            {
                                var rowSpan = (rowSpannedCells[m].ownerRow.rowIndex + rowSpannedCells[m].cellFormat.rowSpan) - 1;
                                if (rowSpan >= row.rowIndex) {
                                    if (rowSpannedCells[m].columnIndex > cell.columnIndex) {
                                        isRowRightWithinSel = true;
                                    }
                                    else {
                                        isRowLeftWithinSel = true;
                                    }
                                    if (i === count && rowSpannedCells[m] !== cell
                                        && rowSpan > (cell.ownerRow.rowIndex + cell.cellFormat.rowSpan - 1)) {
                                        return false;
                                    }
                                    if (rowSpan === row.rowIndex && !this.checkPrevOrNextCellIsWithinSel(startLeft, endLeft, cell, false)) {
                                        rowSpannedCells.splice(rowSpannedCells.indexOf(rowSpannedCells[m]), 1);
                                    }
                                }
                            }
                        }
                    }
                    if (isPrevCellWithinSel && !isNullOrUndefined(prevCell)
                        && isNoRowSpan
                        && (cell.columnIndex !== prevCell.columnIndex + 1 && this.checkCellWidth(cell))) {
                        return false;
                    }
                }
            }
            if (i === rowStartIndex) {
                selectionLeft = rowLeft;
                selectionRight = rowRight;
            }
            else {
                if (rowRight > 0 && rowLeft > 0) {
                    if (!((isRowLeftWithinSel || Math.round(selectionLeft) === Math.round(rowLeft))
                        && (isRowRightWithinSel || Math.round(selectionRight) === Math.round(rowRight)))) {
                        return false;
                    }
                }
                if (i === count) {
                    return true;
                }
            }
        }
        return false;
    };
    Editor.prototype.checkCellWidth = function (cell) {
        var prevCell = cell.previousWidget;
        var cellLeft = this.documentHelper.selection.getCellLeft(cell.ownerRow, cell);
        var prevCellLeft = this.documentHelper.selection.getCellLeft(cell.ownerRow, prevCell);
        var left = prevCellLeft + HelperMethods.convertPointToPixel(prevCell.cellFormat.cellWidth);
        if (HelperMethods.round(left, 2) !== HelperMethods.round(cellLeft, 2)) {
            return true;
        }
        return false;
    };
    Editor.prototype.checkCellWithInSelection = function (startLeft, endLeft, cellStart) {
        if (HelperMethods.round(startLeft, 2) <= HelperMethods.round(cellStart, 2)
            && HelperMethods.round(cellStart, 2) < HelperMethods.round(endLeft, 2)) {
            return true;
        }
        return false;
    };
    Editor.prototype.checkPrevOrNextCellIsWithinSel = function (startLeft, endLeft, cell, isPrev) {
        var prevOrNextCell = isPrev ? cell.previousWidget : cell.nextWidget;
        var cellStart = 0;
        if (isNullOrUndefined(prevOrNextCell)) {
            return false;
        }
        cellStart = this.documentHelper.selection.getCellLeft(prevOrNextCell.ownerRow, prevOrNextCell);
        return this.checkCellWithInSelection(startLeft, endLeft, cellStart);
    };
    Editor.prototype.checkCurrentCell = function (rowSpannedCells, cell, isPrevCellWithInSel, isNextCellWithinSel) {
        var cellOwner = cell.ownerRow;
        if (rowSpannedCells.length > 0) {
            for (var i = 0; i < rowSpannedCells.length; i++) {
                var spannedCellOwner = rowSpannedCells[i].ownerRow;
                var rowSpan = (spannedCellOwner.rowIndex + rowSpannedCells[i].cellFormat.rowSpan) - 1;
                if (rowSpannedCells[i] === cell && (rowSpannedCells.length === 1 || this.checkRowSpannedCells(rowSpannedCells, cell))
                    && !(isNextCellWithinSel || isPrevCellWithInSel)) {
                    return true;
                }
                if (rowSpannedCells[i] !== cell && spannedCellOwner.rowIndex < cellOwner.rowIndex
                    && rowSpan === (cellOwner.rowIndex + cell.cellFormat.rowSpan - 1)) {
                    return true;
                }
            }
        }
        return false;
    };
    Editor.prototype.checkRowSpannedCells = function (rowSpannedCells, cell) {
        for (var i = 0; i < rowSpannedCells.length; i++) {
            if (rowSpannedCells[i] !== cell && rowSpannedCells[i].columnIndex === cell.columnIndex) {
                return true;
            }
        }
        return false;
    };
    /**
     * @private
     * @returns {void}
     */
    Editor.prototype.insertNewParagraphWidget = function (newParagraph, insertAfter) {
        this.updateInsertPosition();
        this.insertParagraph(newParagraph, insertAfter);
        if (!insertAfter) {
            var nextParagraph = void 0;
            var currentParagraph = newParagraph;
            do {
                nextParagraph = this.selection.getNextParagraphBlock(currentParagraph);
                currentParagraph = nextParagraph;
            } while (nextParagraph && nextParagraph.equals(newParagraph));
            if (!isNullOrUndefined(nextParagraph)) {
                this.selection.selectParagraphInternal(nextParagraph, true);
            }
            else {
                this.selection.selectParagraphInternal(newParagraph, true);
            }
        }
        this.fireContentChange();
    };
    Editor.prototype.insertParagraph = function (newParagraph, insertAfter) {
        var lineWidget = this.selection.start.currentWidget;
        var offset = this.selection.start.offset;
        if (this.editorHistory && this.editorHistory.isUndoing &&
            this.editorHistory.currentBaseHistoryInfo.action === 'InsertTextParaReplace') {
            offset = 0;
        }
        var currentParagraph = this.selection.start.paragraph;
        currentParagraph = currentParagraph.combineWidget(this.owner.viewer);
        if (insertAfter) {
            var length_1 = this.selection.getLineLength(currentParagraph.lastChild);
            var insertIndex_1 = newParagraph.firstChild ? newParagraph.firstChild.children.length : 0;
            this.moveInlines(currentParagraph, newParagraph, insertIndex_1, offset, lineWidget, length_1, currentParagraph.lastChild);
        }
        else if (offset > 0) {
            this.moveInlines(currentParagraph, newParagraph, 0, 0, currentParagraph.firstChild, offset, lineWidget);
        }
        var splittedWidget = currentParagraph.getSplitWidgets();
        currentParagraph = insertAfter ? splittedWidget[splittedWidget.length - 1] : splittedWidget[0];
        var insertIndex = currentParagraph.containerWidget.childWidgets.indexOf(currentParagraph);
        if (insertAfter) {
            insertIndex++;
        }
        var bodyWidget = currentParagraph.containerWidget;
        newParagraph.index = currentParagraph.index;
        newParagraph.containerWidget = bodyWidget;
        bodyWidget.childWidgets.splice(insertIndex, 0, newParagraph);
        this.constructRevisionsForBlock(newParagraph, true);
        this.updateNextBlocksIndex(insertAfter ? currentParagraph : newParagraph, true);
        newParagraph.height = 0;
        this.documentHelper.layout.layoutBodyWidgetCollection(newParagraph.index, bodyWidget, newParagraph, false);
    };
    Editor.prototype.moveInlines = function (currentParagraph, newParagraph, insertIndex, startOffset, startLine, endOffset, endLine, removeBlock) {
        if (newParagraph.childWidgets.length === 0) {
            var line = new LineWidget(newParagraph);
            newParagraph.childWidgets.push(line);
        }
        var isMoved = false;
        this.documentHelper.layout.clearListElementBox(currentParagraph);
        this.documentHelper.layout.clearListElementBox(newParagraph);
        for (var j = 0; j < currentParagraph.childWidgets.length; j++) {
            var lineWidget = currentParagraph.childWidgets[j];
            if (startLine === lineWidget && endLine === lineWidget) {
                insertIndex = this.moveContent(lineWidget, startOffset, endOffset, insertIndex, newParagraph);
                break;
            }
            if (endLine === lineWidget) {
                insertIndex = this.moveContent(lineWidget, 0, endOffset, insertIndex, newParagraph);
                break;
            }
            else if (startLine === lineWidget) {
                isMoved = true;
                insertIndex = this.moveContent(lineWidget, startOffset, this.documentHelper.selection.getLineLength(lineWidget), insertIndex, newParagraph);
            }
            else if (isMoved) {
                insertIndex = this.moveContent(lineWidget, 0, this.documentHelper.selection.getLineLength(lineWidget), insertIndex, newParagraph);
            }
        }
        this.removeEmptyLine(currentParagraph);
        if (!currentParagraph.isInsideTable && !removeBlock) {
            this.viewer.updateClientArea(currentParagraph.bodyWidget, currentParagraph.bodyWidget.page);
            this.documentHelper.layout.reLayoutParagraph(currentParagraph, 0, 0);
        }
    };
    Editor.prototype.moveContent = function (lineWidget, startOffset, endOffset, insertIndex, paragraph) {
        var count = 0;
        //let lineIndex: number = lineWidget.paragraph.childWidgets.indexOf(lineWidget);
        for (var i = 0; i < lineWidget.children.length; i++) {
            var inline = lineWidget.children[i];
            if (startOffset >= count + inline.length || inline instanceof ListTextElementBox) {
                if (!(inline instanceof ListTextElementBox)) {
                    count += inline.length;
                }
                continue;
            }
            var startIndex = 0;
            if (startOffset > count) {
                startIndex = startOffset - count;
            }
            var endIndex = endOffset - count;
            if (endIndex > inline.length) {
                endIndex = inline.length;
            }
            if (startIndex > 0) {
                count += startIndex;
            }
            if (startIndex === 0 && endIndex === inline.length) {
                if (inline instanceof ShapeElementBox) {
                    var shapeIndex = lineWidget.paragraph.floatingElements.indexOf(inline);
                    if (shapeIndex !== -1) {
                        lineWidget.paragraph.floatingElements.splice(shapeIndex, 1);
                    }
                }
                paragraph.firstChild.children.splice(insertIndex, 0, inline);
                inline.line = paragraph.firstChild;
                insertIndex++;
                // if (editAction < 4) {
                // this.unLinkFieldCharacter(inline);
                lineWidget.children.splice(i, 1);
                i--;
                // }
            }
            else if (inline instanceof TextElementBox) {
                // if (editAction < 4) {
                var span = new TextElementBox();
                span.characterFormat.copyFormat(inline.characterFormat);
                span.text = inline.text.substr(startIndex, endIndex - startIndex);
                inline.ischangeDetected = true;
                span.ischangeDetected = true;
                paragraph.firstChild.children.splice(insertIndex, 0, span);
                span.line = paragraph.firstChild;
                insertIndex++;
                this.updateRevisionForMovedContent(inline, span);
                inline.text = inline.text.slice(0, startIndex) + inline.text.slice(endIndex);
                inline.ischangeDetected = true;
            }
            if (endOffset <= count + endIndex - startIndex) {
                break;
            }
            count += endIndex - startIndex;
        }
        return insertIndex;
    };
    Editor.prototype.updateRevisionForMovedContent = function (inline, tempSpan) {
        for (var i = 0; i < inline.revisions.length; i++) {
            var currentRevision = inline.revisions[i];
            var rangeIndex = currentRevision.range.indexOf(inline);
            tempSpan.revisions.splice(0, 0, currentRevision);
            currentRevision.range.splice(rangeIndex, 0, tempSpan);
            this.owner.trackChangesPane.updateCurrentTrackChanges(currentRevision);
        }
    };
    /**
     * update complex changes when history is not preserved
     *
     * @param {number} action - Specifies the action
     * @param {string} start - Specifies the selection start
     * @param {string} end - Specified the selection end
     * @private
     * @returns {void}
     */
    Editor.prototype.updateComplexWithoutHistory = function (action, start, end) {
        var selection = this.documentHelper.selection;
        if (action === 0) {
            var startPosition = new TextPosition(selection.owner);
            this.setPositionForCurrentIndex(startPosition, start);
            this.documentHelper.layout.reLayoutParagraph(startPosition.paragraph, 0, 0);
            this.setPositionForCurrentIndex(selection.start, end);
            this.setPositionForCurrentIndex(selection.end, end);
        }
        if (action === 1) {
            var startPosition = new TextPosition(selection.owner);
            this.setPositionForCurrentIndex(startPosition, start);
            var endPosition = new TextPosition(selection.owner);
            this.setPositionForCurrentIndex(endPosition, end);
            this.documentHelper.layout.reLayoutParagraph(startPosition.paragraph, 0, 0);
            if (endPosition.paragraph !== startPosition.paragraph) {
                this.documentHelper.layout.reLayoutParagraph(endPosition.paragraph, 0, 0);
            }
        }
        if (selection.owner.isShiftingEnabled) {
            this.documentHelper.layout.shiftLayoutedItems(false);
            if (this.documentHelper.owner.enableHeaderAndFooter) {
                this.updateHeaderFooterWidget();
            }
        }
        selection.owner.isShiftingEnabled = false;
        selection.start.updatePhysicalPosition(true);
        if (selection.isEmpty) {
            selection.end.setPositionInternal(selection.start);
        }
        else {
            selection.end.updatePhysicalPosition(true);
        }
        selection.upDownSelectionLength = selection.end.location.x;
        selection.fireSelectionChanged(true);
        this.documentHelper.updateFocus();
        this.owner.viewer.updateScrollBars();
        this.fireContentChange();
        this.isHandledComplex = true;
    };
    /**
     * Re-layout content.
     *
     * @param {Selection} selection - Specifies the selection
     * @param isSelectionChanged - Specifies the selection changed
     * @private
     * @returns {void}
     */
    Editor.prototype.reLayout = function (selection, isSelectionChanged, isLayoutChanged) {
        if (!isNullOrUndefined(this.previousBlockToLayout)) {
            // Layout content for previous page to fix content based on KeepWithNext format.
            var previousBlock = this.previousBlockToLayout;
            this.documentHelper.layout.layoutBodyWidgetCollection(previousBlock.index, previousBlock.bodyWidget, previousBlock, false, false);
            this.previousBlockToLayout = undefined;
        }
        if (!this.documentHelper.isComposingIME && this.editorHistory && this.editorHistory.isHandledComplexHistory()) {
            if (this.editorHistory.currentHistoryInfo && this.editorHistory.currentHistoryInfo.action !== 'ClearFormat') {
                if (this.editorHistory.currentHistoryInfo.action !== 'ApplyStyle') {
                    if (this.editorHistory.currentHistoryInfo.action === 'DragAndDropContent') {
                        this.documentHelper.layout.shiftLayoutedItems(true);
                    }
                    this.startParagraph = undefined;
                    this.endParagraph = undefined;
                }
            }
            this.isHandledComplex = false;
            if (this.editorHistory.currentHistoryInfo && (this.editorHistory.currentHistoryInfo.action === 'ColumnBreak'
                || this.editorHistory.currentHistoryInfo.action === 'PageBreak')) {
            }
            else {
                return;
            }
        }
        if (!isNullOrUndefined(selection.editRegionHighlighters)) {
            selection.editRegionHighlighters.clear();
        }
        if (isNullOrUndefined(this.documentHelper.blockToShift)) {
            this.documentHelper.removeEmptyPages();
            this.documentHelper.layout.updateFieldElements();
            /*  if (!isNullOrUndefined(selection.start.paragraph.bodyWidget.page.footnoteWidget)) {
                  let foot: FootNoteWidget = selection.start.paragraph.bodyWidget.page.footnoteWidget;
                  //this.documentHelper.layout.layoutfootNote(foot);
              }
              if (!isNullOrUndefined(selection.start.paragraph.bodyWidget.page.endnoteWidget)) {
                  let foot: FootNoteWidget = selection.start.paragraph.bodyWidget.page.endnoteWidget;
                  //this.documentHelper.layout.layoutfootNote(foot);
              }*/
            this.owner.viewer.updateScrollBars();
            if (!selection.owner.isShiftingEnabled || this.documentHelper.isRowOrCellResizing) {
                selection.fireSelectionChanged(true);
                this.startParagraph = undefined;
                this.endParagraph = undefined;
            }
        }
        if (isNullOrUndefined(isSelectionChanged)) {
            isSelectionChanged = selection.isEmpty;
        }
        if (this.owner.showRevisions && this.owner.trackChangesPane.isUpdateTrackChanges(this.owner.revisions.length)) {
            this.owner.trackChangesPane.updateTrackChanges();
        }
        if (selection.owner.isShiftingEnabled) {
            selection.owner.isShiftingEnabled = false;
            selection.owner.isLayoutEnabled = true;
            var bodyWidget = selection.start.paragraph.bodyWidget;
            var splittedSection = bodyWidget.getSplitWidgets();
            bodyWidget = splittedSection[splittedSection.length - 1];
            if (((!isNullOrUndefined(bodyWidget.nextRenderedWidget) && bodyWidget.nextRenderedWidget.sectionFormat.breakCode === 'NoBreak' && this.documentHelper.layout.isMultiColumnDoc) || (bodyWidget.sectionFormat.breakCode === 'NoBreak' && (bodyWidget.sectionIndex === bodyWidget.page.bodyWidgets[0].sectionIndex) && bodyWidget.sectionFormat.numberOfColumns > 1)) && !(bodyWidget instanceof HeaderFooterWidget) && !(!isNullOrUndefined(bodyWidget.containerWidget) && bodyWidget.containerWidget instanceof FootNoteWidget)) {
                var startPosition = this.documentHelper.selection.start;
                var endPosition = this.documentHelper.selection.end;
                var startInfo = this.selection.getParagraphInfo(startPosition);
                var endInfo = this.selection.getParagraphInfo(endPosition);
                var startIndex = this.selection.getHierarchicalIndex(startInfo.paragraph, startInfo.offset.toString());
                var endIndex = this.selection.getHierarchicalIndex(endInfo.paragraph, endInfo.offset.toString());
                var isContinuousSection = this.documentHelper.selection.start.paragraph.bodyWidget.getSplitWidgets()[0].indexInOwner !== 0;
                this.documentHelper.layout.isInitialLoad = true;
                var sections = this.combineFollowingSection();
                this.documentHelper.layout.layoutItems(sections, true, isContinuousSection);
                this.documentHelper.owner.isShiftingEnabled = false;
                this.setPositionForCurrentIndex(startPosition, startIndex);
                this.setPositionForCurrentIndex(endPosition, endIndex);
                this.documentHelper.selection.selectPosition(startPosition, endPosition);
                this.owner.viewer.updateScrollBars();
            }
            else {
                this.documentHelper.layout.shiftLayoutedItems(true);
            }
            if (this.documentHelper.owner.enableHeaderAndFooter) {
                this.updateHeaderFooterWidget();
            }
            if (!this.documentHelper.isRowOrCellResizing) {
                if (!isNullOrUndefined(selection.start.paragraph)) {
                    if (!isNullOrUndefined(selection.start.paragraph.bodyWidget.containerWidget) && selection.start.paragraph.bodyWidget.containerWidget instanceof FootNoteWidget) {
                        if (selection.start.paragraph.bodyWidget.containerWidget.footNoteType === 'Footnote') {
                            this.documentHelper.layout.isRelayoutFootnote = true;
                            this.shiftFootnotePageContent(selection.start.paragraph.bodyWidget.containerWidget);
                            //this.documentHelper.layout.layoutfootNote(selection.start.paragraph.bodyWidget.containerWidget);
                        }
                        else {
                            this.documentHelper.layout.isRelayoutFootnote = false;
                            this.shiftFootnotePageContent();
                        }
                    }
                }
                this.getOffsetValue(selection);
                selection.upDownSelectionLength = selection.end.location.x;
                selection.fireSelectionChanged(true);
                if (this.owner.enableAutoFocus) {
                    this.documentHelper.updateFocus();
                }
                this.startParagraph = undefined;
                this.endParagraph = undefined;
                //this.documentHelper.layout.allowLayout = true;
            }
        }
        else if (this.documentHelper.owner.enableHeaderAndFooter) {
            this.updateHeaderFooterWidget();
        }
        if (this.editorHistory && this.editorHistory.currentBaseHistoryInfo &&
            ((this.editorHistory.currentBaseHistoryInfo.action !== 'RowResizing'
                && this.editorHistory.currentBaseHistoryInfo.action !== 'CellResizing')
                || (this.editorHistory.isUndoing || this.editorHistory.isRedoing))) {
            if (this.editorHistory.currentBaseHistoryInfo.modifiedProperties.length > 0) {
                this.editorHistory.currentBaseHistoryInfo.updateSelection();
            }
            if (!(this.editorHistory.undoStack && this.editorHistory.undoStack.length > 0 && this.editorHistory.undoStack[this.editorHistory.undoStack.length - 1] instanceof HistoryInfo &&
                this.editorHistory.undoStack[this.editorHistory.undoStack.length - 1].modifiedActions &&
                this.editorHistory.undoStack[this.editorHistory.undoStack.length - 1].modifiedActions[this.editorHistory.undoStack[this.editorHistory.undoStack.length - 1].modifiedActions.length - 1] === this.editorHistory.currentBaseHistoryInfo)) {
                this.editorHistory.updateHistory();
            }
            else {
                this.editorHistory.currentBaseHistoryInfo = undefined;
            }
        }
        if (isLayoutChanged) {
            return;
        }
        this.fireContentChange();
        if (this.owner.enableLockAndEdit) {
            // Editable region border get updated in content changes event.
            // So, handled rerendering content after applying border.
            this.owner.viewer.updateScrollBars();
        }
        this.owner.documentHelper.layout.isRelayout = false;
        this.isFootnoteElementRemoved = false;
        this.isEndnoteElementRemoved = false;
    };
    /**
     * @private
     * @returns {void}
     */
    Editor.prototype.updateHeaderFooterWidget = function (headerFooterWidget) {
        if (isNullOrUndefined(headerFooterWidget)) {
            headerFooterWidget = this.selection.start.paragraph.bodyWidget;
        }
        this.updateHeaderFooterWidgetToPage(headerFooterWidget);
        this.shiftPageContent(headerFooterWidget.headerFooterType, headerFooterWidget.sectionFormat);
    };
    Editor.prototype.updateHeaderFooterWidgetToPage = function (node) {
        var currentPage = node.page;
        //node = this.documentHelper.layout.updateHeaderFooterToParent(node);
        var isEvenPage = (node.headerFooterType === 'EvenHeader' || node.headerFooterType === 'EvenFooter');
        var isFirstPage = (node.headerFooterType === 'FirstPageHeader' || node.headerFooterType === 'FirstPageFooter');
        for (var i = 0; i < this.documentHelper.pages.length; i++) {
            var page = this.documentHelper.pages[i];
            if (page.bodyWidgets[0].sectionFormat.differentFirstPage && isFirstPage
                && (page.headerWidgetIn.headerFooterType == node.headerFooterType || page.footerWidgetIn.headerFooterType == node.headerFooterType)) {
                this.updateHeaderFooterWidgetToPageInternal(page, node, node.headerFooterType.indexOf('Header') !== -1);
                continue;
            }
            if (page.bodyWidgets[0].sectionFormat.differentFirstPage &&
                (isFirstPage || (!isFirstPage && page.index == 0 || page.sectionIndex != page.previousPage.sectionIndex))) {
                continue;
            }
            //if (currentPage !== page) {
            if (page.bodyWidgets[0].sectionFormat.differentOddAndEvenPages) {
                if (isEvenPage && (i + 1) % 2 === 0) {
                    this.updateHeaderFooterWidgetToPageInternal(page, node, node.headerFooterType.indexOf('Header') !== -1);
                }
                else if ((!isEvenPage && (i + 1) % 2 !== 0)) {
                    if (i > 0 || !(page.bodyWidgets[0].sectionFormat.differentFirstPage)) {
                        this.updateHeaderFooterWidgetToPageInternal(page, node, node.headerFooterType.indexOf('Header') !== -1);
                    }
                }
            }
            else {
                this.updateHeaderFooterWidgetToPageInternal(page, node, node.headerFooterType.indexOf('Header') !== -1);
            }
            //}
        }
    };
    Editor.prototype.updateHeaderFooterWidgetToPageInternal = function (page, widget, isHeader) {
        var update = false;
        if (isHeader) {
            update = widget != page.headerWidgetIn && widget.page.headerWidget == page.headerWidget;
        }
        else {
            update = widget != page.footerWidgetIn && widget.page.footerWidget == page.footerWidget;
        }
        if (update) {
            var hfWidget = widget.clone();
            this.documentHelper.layout.clearBlockWidget(hfWidget.childWidgets, true, true, true);
            hfWidget.page = page;
            hfWidget.parentHeaderFooter = widget;
            this.owner.viewer.updateHFClientArea(hfWidget.sectionFormat, isHeader);
            hfWidget = this.documentHelper.layout.layoutHeaderFooterItems(this.owner.viewer, hfWidget);
            var headerOrFooter = void 0;
            if (isHeader) {
                headerOrFooter = page.headerWidgetIn;
                page.headerWidget = hfWidget;
            }
            else {
                headerOrFooter = page.footerWidgetIn;
                page.footerWidget = hfWidget;
            }
            this.removeFieldInWidget(headerOrFooter);
            this.removeFieldInWidget(headerOrFooter, undefined, true);
            headerOrFooter.destroy();
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Editor.prototype.removeFieldInWidget = function (widget, isBookmark, isContentControl) {
        if (isNullOrUndefined(isBookmark)) {
            isBookmark = false;
        }
        for (var i = 0; i < widget.childWidgets.length; i++) {
            this.removeFieldInBlock(widget.childWidgets[i], isBookmark, isContentControl);
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Editor.prototype.removeFieldInBlock = function (block, isBookmark, isContentControl) {
        if (block instanceof TableWidget) {
            if (block.wrapTextAround && !isNullOrUndefined(block.bodyWidget)) {
                var index = block.bodyWidget.floatingElements.indexOf(block);
                if (index !== -1) {
                    block.bodyWidget.floatingElements.splice(index, 1);
                }
            }
            this.removeFieldTable(block, isBookmark, isContentControl);
        }
        else if (block instanceof TableRowWidget) {
            for (var i = 0; i < block.childWidgets.length; i++) {
                this.removeFieldInWidget(block.childWidgets[i], isBookmark, isContentControl);
            }
        }
        else {
            this.removeField(block, isBookmark, isContentControl);
        }
    };
    Editor.prototype.removeFieldTable = function (table, isBookmark, isContentControl) {
        for (var i = 0; i < table.childWidgets.length; i++) {
            var row = table.childWidgets[i];
            for (var j = 0; j < row.childWidgets.length; j++) {
                this.removeFieldInWidget(row.childWidgets[j], isBookmark, isContentControl);
            }
        }
    };
    Editor.prototype.shiftFootnotePageContent = function (foot) {
        var section = this.documentHelper.pages[0].bodyWidgets[0];
        if (!isNullOrUndefined(foot)) {
            var index = this.documentHelper.pages.indexOf(foot.page);
            section = this.documentHelper.pages[index].bodyWidgets[0];
        }
        if (!isNullOrUndefined(section.page.footnoteWidget)) {
            this.checkAndShiftFromBottom(section.page, section.page.footnoteWidget);
        }
        if (!isNullOrUndefined(section.page.endnoteWidget)) {
            //this.checkAndShiftFromBottom(section.page, section.page.endnoteWidget);
        }
        if (this.documentHelper.blockToShift) {
            this.documentHelper.renderedLists.clear();
            this.documentHelper.renderedLevelOverrides = [];
            this.documentHelper.layout.shiftLayoutedItems(false);
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Editor.prototype.shiftPageContent = function (type, sectionFormat) {
        // let type: HeaderFooterType = headerFooter.headerFooterType;
        var pageIndex;
        if (type.indexOf('First') !== -1) {
            pageIndex = 0;
        }
        else if (sectionFormat.differentOddAndEvenPages) {
            var isEven = type.indexOf('Even') !== -1;
            if (sectionFormat.differentFirstPage) {
                pageIndex = isEven ? 1 : 2;
            }
            else {
                pageIndex = !isEven ? 0 : 1;
            }
        }
        else {
            pageIndex = sectionFormat.differentFirstPage ? 1 : 0;
            if (pageIndex === 1 && this.documentHelper.pages.length === 1) {
                pageIndex = 0;
            }
        }
        var section = this.documentHelper.pages[pageIndex].bodyWidgets[0];
        do {
            if (type.indexOf('Header') !== -1) {
                var widget = section.page.headerWidget;
                var isNotEmpty = !widget.isEmpty || widget.isEmpty && this.owner.enableHeaderAndFooter;
                var firstBlock = section.firstChild;
                var top_1 = HelperMethods.convertPointToPixel(sectionFormat.topMargin);
                var headerDistance = HelperMethods.convertPointToPixel(sectionFormat.headerDistance);
                if (isNotEmpty) {
                    top_1 = Math.max(headerDistance + section.page.headerWidget.height, top_1);
                }
                if (firstBlock.y !== top_1 && section.sectionFormat.breakCode !== "NoBreak") {
                    this.owner.viewer.updateClientArea(section, section.page);
                    firstBlock = firstBlock.combineWidget(this.owner.viewer);
                    var prevWidget = firstBlock.previousRenderedWidget;
                    if (prevWidget) {
                        if (firstBlock.containerWidget.equals(prevWidget.containerWidget) && !(prevWidget.containerWidget.lastChild instanceof ParagraphWidget && (prevWidget.containerWidget.lastChild.isEndsWithPageBreak || prevWidget.containerWidget.lastChild.isEndsWithColumnBreak))) {
                            this.owner.viewer.cutFromTop(prevWidget.y + prevWidget.height);
                            this.documentHelper.layout.updateContainerWidget(firstBlock, prevWidget.containerWidget, prevWidget.indexInOwner + 1, false);
                        }
                    }
                    this.documentHelper.blockToShift = firstBlock;
                }
            }
            else {
                this.checkAndShiftFromBottom(section.page, section.page.footerWidget);
            }
            if (this.documentHelper.blockToShift) {
                this.documentHelper.renderedLists.clear();
                this.documentHelper.renderedLevelOverrides = [];
                this.documentHelper.layout.shiftLayoutedItems(false);
            }
            while (section) {
                var previousSection = section;
                do {
                    //To skip section continuous, since it already shifted in `shiftLayoutedItems` method.
                    var splittedSection = section.getSplitWidgets();
                    section = splittedSection[splittedSection.length - 1].nextRenderedWidget;
                } while (section && previousSection.page === section.page);
                if (section) {
                    if (pageIndex === 0) {
                        break;
                    }
                    else {
                        if (section.page.index + 1 % 2 === 0 && pageIndex === 1 ||
                            (section.page.index + 1 % 2 !== 0 && pageIndex === 2)) {
                            break;
                        }
                        var nextPage = section.page.nextPage;
                        if (!isNullOrUndefined(nextPage) && nextPage.bodyWidgets[0].equals(section)) {
                            section = nextPage.bodyWidgets[0];
                            break;
                        }
                    }
                }
            }
        } while (section);
    };
    Editor.prototype.checkAndShiftFromBottom = function (page, footerWidget) {
        var bodyWidget = page.bodyWidgets[0];
        var blockToShift;
        if (bodyWidget.childWidgets.length > 1) {
            for (var i = 0; i < bodyWidget.childWidgets.length; i++) {
                var block = bodyWidget.childWidgets[i];
                if (block.y + block.height > footerWidget.y) {
                    blockToShift = block;
                    break;
                }
                if (!(footerWidget instanceof FootNoteWidget)) {
                    if (bodyWidget.childWidgets.length - 1 === i && block.y + block.height < footerWidget.y) {
                        blockToShift = block;
                        break;
                    }
                }
            }
            if (!isNullOrUndefined(blockToShift)) {
                this.owner.viewer.updateClientArea(bodyWidget, page, true);
                this.owner.viewer.cutFromTop(blockToShift.y);
                this.documentHelper.blockToShift = blockToShift;
            }
        }
    };
    Editor.prototype.allowFormattingInFormFields = function (property) {
        if (this.documentHelper.protectionType === 'FormFieldsOnly' && this.selection.isInlineFormFillMode() &&
            !isNullOrUndefined(this.owner.documentEditorSettings.formFieldSettings.formattingExceptions)) {
            for (var j = 0; j < this.owner.documentEditorSettings.formFieldSettings.formattingExceptions.length; j++) {
                if (property.toLowerCase() === this.owner.documentEditorSettings.formFieldSettings.formattingExceptions[j].toLowerCase()) {
                    return true;
                }
            }
        }
        return false;
    };
    Editor.prototype.getContentControl = function () {
        for (var i = 0; i < this.documentHelper.contentControlCollection.length; i++) {
            var contentControlStart = this.documentHelper.contentControlCollection[i];
            var position = this.selection.getPosition(contentControlStart);
            var cCstart = position.startPosition;
            var cCend = position.endPosition;
            var start = this.selection.start;
            var end = this.selection.end;
            if (!this.selection.isForward) {
                start = this.selection.end;
                end = this.selection.start;
            }
            if ((start.isExistAfter(cCstart) || start.isAtSamePosition(cCstart))
                && (end.isExistBefore(cCend) || end.isAtSamePosition(cCend))) {
                return contentControlStart;
            }
        }
        return undefined;
    };
    Editor.prototype.checkPlainTextContentControl = function () {
        var start = this.selection.start;
        var end = this.selection.end;
        if (!this.selection.isForward) {
            end = this.selection.start;
            start = this.selection.end;
        }
        var startIndex = 0;
        var endIndex = 0;
        var startInline = start.currentWidget.getInline(start.offset, startIndex);
        var endInline = end.currentWidget.getInline(end.offset, endIndex);
        startIndex = startInline.index;
        endIndex = endInline.index;
        var startInlineEle = startInline.element;
        var endInlineEle = endInline.element;
        var startPosition;
        var endPosition;
        if ((startInlineEle && startInlineEle.contentControlProperties && startInlineEle.contentControlProperties.type === 'Text')
            || (endInlineEle && endInlineEle.contentControlProperties && endInlineEle.contentControlProperties.type === 'Text')) {
            startInlineEle = this.getContentControl();
            if (startInlineEle.contentControlProperties && !isNullOrUndefined(startInlineEle)) {
                var offset = startInlineEle.line.getOffset(startInlineEle, 1);
                startPosition = new TextPosition(this.owner);
                startPosition.setPositionParagraph(startInlineEle.line, offset);
            }
            else {
                startPosition = start;
            }
            if (endInlineEle.contentControlProperties && startInlineEle.reference) {
                endInlineEle = startInlineEle.reference;
                var endoffset = endInlineEle.line.getOffset(endInlineEle, endInlineEle.length);
                endPosition = new TextPosition(this.owner);
                endPosition.setPositionParagraph(endInlineEle.line, endoffset);
            }
            else {
                endPosition = end;
            }
            this.selection.selectRange(startPosition, endPosition);
        }
        else if (start.paragraph.contentControlProperties
            && start.paragraph.contentControlProperties.type === 'Text') {
            this.selection.selectParagraph();
        }
    };
    //Paste Implementation ends
    //Character Format apply implementation starts
    /**
     * Applies character format for selection.
     *
     * @param {string} property - Specifies the property
     * @param {Object} value - Specifies the value
     * @param {boolean} update - Spcifies the update
     * @private
     * @returns {void}
     */
    Editor.prototype.onApplyCharacterFormat = function (property, value, update, applyStyle) {
        var allowFormatting = this.documentHelper.isFormFillProtectedMode
            && this.documentHelper.selection.isInlineFormFillMode() && this.allowFormattingInFormFields(property);
        if ((this.restrictFormatting && !allowFormatting) || this.selection.checkContentControlLocked(true)) {
            return;
        }
        this.documentHelper.layout.isBidiReLayout = true;
        var selection = this.documentHelper.selection;
        if ((selection.owner.isReadOnlyMode && !allowFormatting) || !selection.owner.isDocumentLoaded) {
            return;
        }
        update = isNullOrUndefined(update) ? false : update;
        applyStyle = isNullOrUndefined(applyStyle) ? false : applyStyle;
        var action = (property[0].toUpperCase() + property.slice(1));
        var paragraph = selection.start.paragraph;
        var lastLine = paragraph.childWidgets[paragraph.childWidgets.length - 1];
        this.checkPlainTextContentControl();
        if (selection.isEmpty && selection.contextType !== 'List' && !applyStyle) {
            selection.skipFormatRetrieval = true;
            if (selection.end.isAtParagraphEnd) {
                this.initHistory(action);
                this.documentHelper.owner.isShiftingEnabled = true;
                this.applyCharFormatValue(paragraph.characterFormat, property, value, update);
                this.reLayout(this.documentHelper.selection);
                this.documentHelper.updateFocus();
            }
            else {
                selection.fireSelectionChanged(true);
            }
            selection.skipFormatRetrieval = false;
            return;
        }
        //Skip consider highlightcolor if paragraph mark alone is selected similar to Microsoft Word behaviour
        if (property === 'highlightColor' && selection.start.isInSameParagraph(selection.end)) {
            var start = selection.start;
            var end = selection.end;
            if (!this.selection.isForward) {
                end = selection.start;
                start = selection.end;
            }
            if (end.offset === selection.getLineLength(end.currentWidget) + 1 && end.offset - 1 === start.offset) {
                return;
            }
        }
        this.setOffsetValue(selection);
        this.initHistory(action);
        // Todo: Complete Microsoft Word behavior on apply formatting in empty selection
        // if (selection.isEmpty) {
        //     this.documentHelper.owner.isShiftingEnabled = true;
        //     this.applyCharFormatValue(paragraph.characterFormat, property, value, update);
        //     this.reLayout(this.documentHelper.selection);
        //     this.documentHelper.updateFocus();
        //     return;
        // }
        if (selection.contextType === 'List') {
            // this.updateCharacterFormatForListText(selection, action, value, update);
            this.applyCharacterFormatForListText(selection, property, value, update);
        }
        else {
            //Iterate and update format.
            this.updateSelectionCharacterFormatting(property, value, update);
        }
        this.documentHelper.layout.isBidiReLayout = false;
    };
    Editor.prototype.applyCharacterFormatForListText = function (selection, property, values, update) {
        var listLevel = selection.getListLevel(selection.start.paragraph);
        if (isNullOrUndefined(listLevel)) {
            return;
        }
        var characterFormat = listLevel.characterFormat;
        switch (property) {
            case 'bold':
                this.applyListCharacterFormatByValue(selection, characterFormat, 'bold', !(characterFormat.bold));
                break;
            case 'italic':
                this.applyListCharacterFormatByValue(selection, characterFormat, 'italic', !(characterFormat.italic));
                break;
            case 'fontColor':
                this.applyListCharacterFormatByValue(selection, characterFormat, 'fontColor', values);
                break;
            case 'fontFamily':
                this.applyListCharacterFormatByValue(selection, characterFormat, 'fontFamily', values);
                break;
            case 'fontSize':
                this.applyListCharacterFormatByValue(selection, characterFormat, 'fontSize', values);
                break;
            case 'highlightColor':
                this.applyListCharacterFormatByValue(selection, characterFormat, 'highlightColor', values);
                break;
            case 'baselineAlignment':
                if (characterFormat.baselineAlignment === values) {
                    values = 'Normal';
                }
                this.applyListCharacterFormatByValue(selection, characterFormat, 'baselineAlignment', values);
                break;
            case 'strikethrough':
                if (characterFormat.strikethrough === values) {
                    values = 'None';
                }
                this.applyListCharacterFormatByValue(selection, characterFormat, 'strikethrough', values);
                break;
            case 'underline':
                if (characterFormat.underline === values) {
                    values = 'None';
                }
                this.applyListCharacterFormatByValue(selection, characterFormat, 'underline', values);
                break;
            case 'characterFormat':
                this.applyListCharacterFormatByValue(selection, characterFormat, undefined, values);
                break;
        }
    };
    Editor.prototype.applyListCharacterFormatByValue = function (selection, format, property, value) {
        this.initHistory('ListCharacterFormat');
        this.applyCharFormatValue(format, property, value, false);
        this.editorHistory.updateHistory();
        this.reLayout(selection);
        this.fireContentChange();
    };
    /**
     * @private
     * @returns {void}
     */
    Editor.prototype.updateListCharacterFormat = function (selection, property, value) {
        this.updateListTextSelRange(selection, property, value, false);
    };
    Editor.prototype.updateListTextSelRange = function (selection, property, value, update) {
        this.documentHelper.owner.isShiftingEnabled = true;
        var startPositionInternal = selection.start;
        var endPositionInternal = selection.end;
        if (!selection.isForward) {
            startPositionInternal = selection.end;
            endPositionInternal = selection.start;
        }
        this.initHistoryPosition(selection, startPositionInternal);
        var listLevel = selection.getListLevel(selection.start.paragraph);
        this.applyCharFormatValue(listLevel.characterFormat, property, value, update);
        this.startSelectionReLayouting(startPositionInternal.paragraph, selection, startPositionInternal, endPositionInternal);
    };
    /**
     * @private
     * @returns {void}
     */
    Editor.prototype.updateInsertPosition = function () {
        var selection = this.documentHelper.selection;
        var position = selection.start;
        if (!selection.isForward) {
            position = selection.end;
        }
        if (this.editorHistory && !isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo)
            && !isNullOrUndefined(position)) {
            if (isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo.insertPosition)) {
                this.updateHistoryPosition(position, true);
            }
        }
    };
    /**
     * Preserve paragraph and offset value for selection
     *
     * @private
     * @returns {void}
     */
    Editor.prototype.setOffsetValue = function (selection) {
        var info = this.selection.getParagraphInfo(selection.start);
        this.startParagraph = info.paragraph;
        this.startOffset = info.offset;
        info = this.selection.getParagraphInfo(selection.end);
        this.endParagraph = info.paragraph;
        this.endOffset = info.offset;
    };
    /**
     * Toggles the highlight color property of selected contents.
     *
     * @param {HighlightColor} highlightColor Specify the highlight color to be applied (default: Yellow).
     * @returns {void}
     */
    Editor.prototype.toggleHighlightColor = function (highlightColor) {
        var selection = this.documentHelper.selection;
        if (isNullOrUndefined(highlightColor) || highlightColor === 'NoColor') {
            highlightColor = 'Yellow';
        }
        //In Ms Word the highlight color is took from the ribbon. So we Have given yellow as constant.
        if (selection.characterFormat.highlightColor === highlightColor) {
            highlightColor = 'NoColor';
        }
        this.selection.characterFormat.highlightColor = highlightColor;
    };
    /**
     * Toggles the subscript formatting of selected contents.
     *
     * @returns {void}
     */
    Editor.prototype.toggleSubscript = function () {
        if (this.owner.isReadOnlyMode || this.restrictFormatting) {
            return;
        }
        var value = this.selection.characterFormat.baselineAlignment === 'Subscript' ? 'Normal' : 'Subscript';
        this.selection.characterFormat.baselineAlignment = value;
    };
    /**
     * Toggles the superscript formatting of selected contents.
     *
     * @returns {void}
     */
    Editor.prototype.toggleSuperscript = function () {
        if (this.owner.isReadOnlyMode || this.restrictFormatting) {
            return;
        }
        var value = this.selection.characterFormat.baselineAlignment === 'Superscript' ? 'Normal' : 'Superscript';
        this.selection.characterFormat.baselineAlignment = value;
    };
    /**
     * Increases the left indent of selected paragraphs to a factor of 36 points.
     *
     * @returns {void}
     */
    Editor.prototype.increaseIndent = function () {
        if (!this.owner.isReadOnlyMode || this.selection.isInlineFormFillMode()) {
            this.onApplyParagraphFormat('leftIndent', this.documentHelper.defaultTabWidth, true, false);
        }
    };
    /**
     * Decreases the left indent of selected paragraphs to a factor of 36 points.
     *
     * @returns {void}
     */
    Editor.prototype.decreaseIndent = function () {
        if (!this.owner.isReadOnlyMode || this.selection.isInlineFormFillMode()) {
            this.onApplyParagraphFormat('leftIndent', -this.documentHelper.defaultTabWidth, true, false);
        }
    };
    /**
     * Clears the list format for selected paragraphs.
     *
     * @returns {void}
     */
    Editor.prototype.clearList = function () {
        this.selection.owner.editorModule.onApplyList(undefined);
    };
    /**
     * Applies the bullet list to selected paragraphs.
     *
     * @param {string} bullet Specify the bullet character to be applied.
     * @param {string} fontFamily Specify the bullet font family name.
     * @returns {void}
     */
    Editor.prototype.applyBullet = function (bullet, fontFamily) {
        if (!this.owner.isReadOnlyMode || this.selection.isInlineFormFillMode()) {
            this.applyBulletOrNumbering(bullet, 'Bullet', fontFamily);
        }
    };
    /**
     * Applies the numbering list to selected paragraphs.
     *
     * @param {string} numberFormat  “%n” representations in ‘numberFormat’ parameter will be replaced by respective list level’s value.
     * `“%1)” will be displayed as “1)” `
     * @param {ListLevelPattern} listLevelPattern  Default value of ‘listLevelPattern’ parameter is ListLevelPattern.Arabic
     * @returns {void}
     */
    Editor.prototype.applyNumbering = function (numberFormat, listLevelPattern) {
        if (!this.owner.isReadOnlyMode || this.selection.isInlineFormFillMode()) {
            this.applyBulletOrNumbering(numberFormat, listLevelPattern, 'Verdana');
        }
    };
    /**
     * Toggles the baseline alignment property of selected contents.
     *
     * @param {BaselineAlignment} baseAlignment Specifies the baseline alignment.
     * @returns {void}
     */
    Editor.prototype.toggleBaselineAlignment = function (baseAlignment) {
        this.updateProperty(2, baseAlignment);
    };
    Editor.prototype.clearFormattingInternal = function (isCompletePara) {
        var selection = this.documentHelper.selection;
        this.setPreviousBlockToLayout();
        this.initComplexHistory('ClearFormat');
        // let startIndex: string = selection.start.getHierarchicalIndexInternal();
        // let endIndex: string = selection.end.getHierarchicalIndexInternal();
        if (selection.isEmpty || (!isNullOrUndefined(isCompletePara) && isCompletePara)) {
            selection.start.moveToParagraphStartInternal(selection, false);
            selection.end.moveToParagraphEndInternal(selection, false);
        }
        this.setOffsetValue(selection);
        if (this.editorHistory) {
            this.editorHistory.initializeHistory('ClearCharacterFormat');
        }
        this.updateSelectionCharacterFormatting('ClearCharacterFormat', undefined, false);
        this.getOffsetValue(selection);
        if (this.editorHistory) {
            this.editorHistory.updateHistory();
        }
        this.setOffsetValue(selection);
        if (this.editorHistory) {
            this.editorHistory.initializeHistory('ClearParagraphFormat');
        }
        this.updateParagraphFormatInternal('ClearParagraphFormat', undefined, false);
        if (this.editorHistory) {
            this.editorHistory.updateHistory();
        }
        this.getOffsetValue(selection);
        if (this.editorHistory && !isNullOrUndefined(this.editorHistory.currentHistoryInfo)) {
            this.editorHistory.updateComplexHistory();
        }
        this.startParagraph = undefined;
        this.endParagraph = undefined;
        // else {
        //     this.checkAndUpdatedSelection(startIndex, endIndex);
        // }
    };
    /**
     * Clears the formatting.
     *
     * @returns {void}
     */
    Editor.prototype.clearFormatting = function () {
        this.clearFormattingInternal();
    };
    Editor.prototype.updateProperty = function (type, value) {
        var selection = this.selection;
        if (((this.owner.isReadOnlyMode || this.restrictFormatting) && !this.selection.isInlineFormFillMode()) || !selection.owner.isDocumentLoaded) {
            return;
        }
        var startPosition = selection.start;
        var endPosition = selection.end;
        if (!selection.isForward) {
            startPosition = selection.end;
            endPosition = selection.start;
        }
        var indexInInline = 0;
        var inlineObj = startPosition.currentWidget.getInline(startPosition.offset, indexInInline);
        var inline = inlineObj.element;
        indexInInline = inlineObj.index;
        var paragraph = startPosition.paragraph;
        if (!isNullOrUndefined(inline) && inline.length === indexInInline && !this.selection.isEmpty) {
            inline = inline.nextNode;
        }
        if (type === 1) {
            var currentUnderline = 'None';
            if (!isNullOrUndefined(inline)) {
                currentUnderline = inline.characterFormat.underline;
            }
            else if (!isNullOrUndefined(paragraph)) {
                currentUnderline = paragraph.characterFormat.underline;
            }
            this.selection.characterFormat.underline = value === currentUnderline ? 'None' : value;
        }
        else {
            var script = 'Normal';
            if (!isNullOrUndefined(inline)) {
                script = inline.characterFormat.baselineAlignment;
            }
            else if (!isNullOrUndefined(paragraph)) {
                script = paragraph.characterFormat.baselineAlignment;
            }
            if (script === value) {
                value = 'Normal';
            }
            this.selection.characterFormat.baselineAlignment = value;
        }
    };
    Editor.prototype.getCompleteStyles = function () {
        var completeStylesString = '{"styles":[';
        for (var _i = 0, _a = this.documentHelper.preDefinedStyles.keys; _i < _a.length; _i++) {
            var name_1 = _a[_i];
            completeStylesString += (this.documentHelper.preDefinedStyles.get(name_1) + ',');
        }
        return completeStylesString.slice(0, -1) + ']}';
    };
    /**
     * Initialize default styles
     *
     * @private
     * @returns {void}
     */
    Editor.prototype.intializeDefaultStyles = function () {
        var existingStyles = this.owner.getStyleNames('Paragraph');
        var defaultStyleNames = ['Normal', 'Heading 1', 'Heading 2', 'Heading 3', 'Heading 4', 'Heading 5', 'Heading 6', 'Header', 'Footer'];
        var styleNames = defaultStyleNames.filter(function (val) {
            return existingStyles.indexOf(val) === -1;
        });
        for (var _i = 0, styleNames_1 = styleNames; _i < styleNames_1.length; _i++) {
            var name_2 = styleNames_1[_i];
            this.createStyle(this.documentHelper.preDefinedStyles.get(name_2));
        }
    };
    /**
     * Creates a new style or modifies an existing style with the specified style properties.
     *
     * > If modifyExistingStyle parameter is set to true and a style already exists with same name, it modifies the specified properties in the existing style.
     * > If modifyExistingStyle parameter is set to false and a style already exists with same name, it creates a new style with unique name by appending ‘_1’. Hence, the newly style will not have the specified name.
     * > If no style exists with same name, it creates a new style.
     *
     * @param {string} styleString The style properties.
     * @param {boolean} modifyExistingStyle The Boolean value denotes whether to modify the properties in the existing style or create a new style.
     *
     * @returns {string} Returns the name of the created style.
     */
    Editor.prototype.createStyle = function (styleString, modifyExistingStyle) {
        return this.createStyleIn(styleString, modifyExistingStyle).name;
    };
    /**
     * @private
     * Adds a new style to the document or updates an existing style.
     *
     * @param {string} styleString - The style to be added or updated.
     * @param {boolean} modifyExistingStyle - Whether to modify an existing style.
     * @returns {Object} - The style that was added or updated.
     */
    Editor.prototype.createStyleIn = function (styleString, modifyExistingStyle) {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        var style = JSON.parse(styleString);
        var styleObj = this.documentHelper.styles.findByName(style.name);
        var inputStyleType = style.type;
        if (isNullOrUndefined(styleObj) || isNullOrUndefined(modifyExistingStyle) || !modifyExistingStyle) {
            if (styleObj !== undefined) {
                // Create a new style with new name and add it to collection.
                style.name = this.getUniqueStyleName(style.name);
            }
            this.documentHelper.owner.parser.parseStyle(JSON.parse(this.getCompleteStyles()), style, this.documentHelper.styles, true);
        }
        else {
            if (inputStyleType === styleObj.type) {
                // Update the existing style with the newly received style information(Json)
                this.setStyle(styleObj, style);
            }
            else {
                // Create a new style with new name and add it to collection.
                style.name = this.getUniqueStyleName(style.name);
                this.documentHelper.owner.parser.parseStyle(JSON.parse(this.getCompleteStyles()), style, this.documentHelper.styles, true);
            }
        }
        this.owner.notify(internalStyleCollectionChange, {});
        return this.documentHelper.styles.findByName(style.name);
    };
    /**
     * Modify the Style
     * @private
     * @returns {void}
     */
    Editor.prototype.setStyle = function (styleObj, style) {
        // based on Style
        if (!isNullOrUndefined(style.basedOn)) {
            var basedOn = this.documentHelper.styles.findByName(style.basedOn);
            if (!isNullOrUndefined(basedOn)) {
                if (basedOn.type === style.type) {
                    styleObj.basedOn = basedOn;
                }
            }
            else {
                var basedStyle = this.getStyle(style.basedOn, JSON.parse(this.getCompleteStyles()));
                var styleData = void 0;
                if (!isNullOrUndefined(basedStyle) && basedStyle.type === style.type) {
                    styleData = basedStyle;
                }
                else {
                    if (style.type === 'Paragraph') {
                        styleData = JSON.parse('{"type":"Paragraph","name":"Normal","next":"Normal"}');
                    }
                    else {
                        styleData = JSON.parse('{"type": "Character","name": "Default Paragraph Font"}');
                    }
                }
                styleObj.basedOn = this.documentHelper.styles.findByName(styleData.name);
            }
        }
        // next style
        if (!isNullOrUndefined(style.next)) {
            if (style.type === "Paragraph") {
                if (style.next === style.name) {
                    styleObj.next = styleObj;
                }
                else {
                    var next = this.documentHelper.styles.findByName(style.next);
                    if (!isNullOrUndefined(next) && next.type === styleObj.type) {
                        styleObj.next = next;
                    }
                    else {
                        styleObj.next = styleObj;
                    }
                }
            }
        }
        // link style
        if (!isNullOrUndefined(style.link)) {
            var link = this.documentHelper.styles.findByName(style.link);
            var styleString = void 0;
            if (!isNullOrUndefined(link) && (link.type === "Character")) {
                this.documentHelper.owner.parser.parseCharacterFormat(0, style.characterFormat, link.characterFormat);
                styleObj.link = link;
            }
            else {
                //Construct the CharacterStyle string
                var charaStyle = {};
                charaStyle.characterFormat = style.characterFormat;
                var newCharStyle = this.documentHelper.styles.findByName(style.name + ' Char');
                if (newCharStyle.name !== undefined) {
                    charaStyle.name = this.getUniqueStyleName(style.name) + ' Char';
                }
                else {
                    charaStyle.name = style.name + ' Char';
                }
                charaStyle.type = 'Character';
                charaStyle.basedOn = 'Default Paragraph Font';
                styleString = charaStyle;
                this.documentHelper.owner.parser.parseStyle(JSON.parse(this.getCompleteStyles()), styleString, this.documentHelper.styles);
                styleObj.link = this.documentHelper.styles.findByName(styleString.name);
            }
            if (style.type == 'Character') {
                for (var i = 0; i < this.documentHelper.styles.length; i++) {
                    var styleFormCollection = this.documentHelper.styles.getItem(i);
                    var styleLink = styleFormCollection.link;
                    var linkName = styleLink === undefined ? "" : styleLink.name;
                    if (styleFormCollection.type === 'Paragraph' && linkName === style.link) {
                        if (!isNullOrUndefined(styleFormCollection.characterFormat)) {
                            this.documentHelper.owner.parser.parseCharacterFormat(0, style.characterFormat, styleFormCollection.characterFormat);
                        }
                    }
                }
            }
        }
        //update the new paragraph style 
        if (!isNullOrUndefined(style.paragraphFormat)) {
            this.documentHelper.owner.parser.parseParagraphFormat(0, style.paragraphFormat, styleObj.paragraphFormat);
        }
        //update the new character style 
        if (!isNullOrUndefined(style.characterFormat)) {
            this.documentHelper.owner.parser.parseCharacterFormat(0, style.characterFormat, styleObj.characterFormat);
        }
    };
    Editor.prototype.getStyle = function (name, data) {
        for (var i = 0; i < data.styles.length; i++) {
            if (data.styles[i].name === name) {
                return data.styles[i];
            }
        }
        return undefined;
    };
    Editor.prototype.getUniqueStyleName = function (name) {
        var uniqueName = this.getUniqueName(name);
        var style = this.documentHelper.styles.findByName(uniqueName);
        while (!isNullOrUndefined(style)) {
            uniqueName = this.getUniqueStyleName(style.name);
            style = this.documentHelper.styles.findByName(uniqueName);
        }
        return uniqueName;
    };
    Editor.prototype.getUniqueName = function (name) {
        var matchArray = name.match(/\d+$/);
        var returnName;
        if (!isNullOrUndefined(matchArray) && matchArray.length > 0) {
            return name.replace(matchArray[0], (parseInt(matchArray[0], 10) + 1).toString());
        }
        else {
            return name + '_1';
        }
    };
    /**
     * Update Character format for selection
     * @private
     */
    Editor.prototype.updateSelectionCharacterFormatting = function (property, values, update) {
        if (isNullOrUndefined(property)) {
            property = 'CharacterFormat';
        }
        switch (property) {
            case 'bold':
                this.updateCharacterFormat('bold', values);
                break;
            case 'italic':
                this.updateCharacterFormat('italic', values);
                break;
            case 'fontColor':
                this.updateCharacterFormat('fontColor', values);
                break;
            case 'fontFamily':
                this.updateCharacterFormat('fontFamily', values);
                break;
            case 'fontSize':
                this.documentHelper.layout.isBidiReLayout = false;
                this.updateCharacterFormatWithUpdate(this.documentHelper.selection, 'fontSize', values, update);
                break;
            case 'highlightColor':
                this.updateCharacterFormat('highlightColor', values);
                break;
            case 'baselineAlignment':
                this.updateCharacterFormat('baselineAlignment', values);
                break;
            case 'strikethrough':
                this.updateCharacterFormat('strikethrough', values);
                break;
            case 'underline':
                this.updateCharacterFormat('underline', values);
                break;
            case 'styleName':
                this.updateCharacterFormatWithUpdate(this.documentHelper.selection, 'styleName', values, true, true);
                break;
            case 'CharacterFormat':
                this.updateCharacterFormat(undefined, values);
                break;
            case 'ClearCharacterFormat':
                this.updateCharacterFormat(undefined, values);
                break;
            case 'allCaps':
                this.updateCharacterFormat('allCaps', values);
                break;
        }
        this.reLayout(this.documentHelper.selection);
    };
    Editor.prototype.updateCharacterFormat = function (property, value) {
        this.updateCharacterFormatWithUpdate(this.documentHelper.selection, property, value, false);
    };
    Editor.prototype.updateCharacterFormatWithUpdate = function (selection, property, value, update, styleName) {
        styleName = isNullOrUndefined(styleName) ? false : styleName;
        this.documentHelper.owner.isShiftingEnabled = true;
        var startPosition = selection.start;
        var endPosition = selection.end;
        if (!selection.isEmpty && !selection.isForward) {
            startPosition = selection.end;
            endPosition = selection.start;
        }
        if (selection.isEmpty && styleName) {
            var offset = startPosition.offset;
            var preservedStartPosition = startPosition.clone();
            var preservedEndPosition = endPosition.clone();
            this.selection.selectCurrentWord();
            if (offset === this.selection.start.offset || offset === this.selection.end.offset - 1) {
                this.selection.start = preservedStartPosition;
                this.selection.end = preservedEndPosition;
            }
        }
        this.applyCharFormatSelectedContent(startPosition.paragraph, selection, startPosition, endPosition, property, value, update);
    };
    Editor.prototype.applyCharFormatSelectedContent = function (paragraph, selection, start, end, property, value, update) {
        //Selection start in cell.
        if (start.paragraph.isInsideTable && (!end.paragraph.isInsideTable
            || start.paragraph.associatedCell !== end.paragraph.associatedCell
            || selection.isCellSelected(start.paragraph.associatedCell, start, end))) {
            var cell = void 0;
            start.paragraph.associatedCell.ownerTable.combineWidget(this.owner.viewer);
            if (this.checkInsertPosition(selection)) {
                this.updateHistoryPosition(start, true);
            }
            cell = start.paragraph.associatedCell;
            this.applyCharFormatCell(cell, selection, start, end, property, value, update);
            var table = cell.ownerTable;
            this.documentHelper.layout.layoutBodyWidgetCollection(table.index, table.containerWidget, table, false);
        }
        else {
            this.applyCharFormat(paragraph, selection, start, end, property, value, update);
        }
    };
    Editor.prototype.applyCharFormatForSelectedPara = function (paragraph, selection, property, value, update) {
        for (var i = 0; i < paragraph.childWidgets.length; i++) {
            var line = paragraph.childWidgets[i];
            for (var j = 0; j < line.children.length; j++) {
                var element = line.children[j];
                this.applyCharFormatValue(element.characterFormat, property, value, update);
            }
        }
        this.applyCharFormatValue(paragraph.characterFormat, property, value, update);
    };
    Editor.prototype.splittedLastParagraph = function (paragraph) {
        var splittedWidets = paragraph.getSplitWidgets();
        return splittedWidets[splittedWidets.length - 1];
    };
    Editor.prototype.getNextParagraphForCharacterFormatting = function (block, start, end, property, value, update) {
        var widgetCollection = block.getSplitWidgets();
        block = widgetCollection[widgetCollection.length - 1];
        block = this.documentHelper.selection.getNextRenderedBlock(block);
        if (!isNullOrUndefined(block)) { //Goto the next block.
            if (block instanceof ParagraphWidget) {
                this.applyCharFormat(block, this.documentHelper.selection, start, end, property, value, update);
            }
            else {
                this.applyCharFormatForTable(0, block, this.documentHelper.selection, start, end, property, value, update);
            }
        }
    };
    Editor.prototype.applyCharFormat = function (paragraph, selection, start, end, property, value, update) {
        paragraph = paragraph.combineWidget(this.owner.viewer);
        var startOffset = 0;
        var length = selection.getParagraphLength(paragraph);
        var startLineWidget = paragraph.childWidgets.indexOf(start.currentWidget) !== -1 ?
            paragraph.childWidgets.indexOf(start.currentWidget) : 0;
        var endOffset = end.offset;
        var endLineWidget = paragraph.childWidgets.indexOf(end.currentWidget) !== -1 ?
            paragraph.childWidgets.indexOf(end.currentWidget) : paragraph.childWidgets.length - 1;
        if (!isNullOrUndefined(selection)) {
            if (paragraph === start.paragraph) {
                startOffset = start.offset;
            }
        }
        if (!paragraph.equals(end.paragraph)) {
            var lastLine = paragraph.childWidgets[paragraph.childWidgets.length - 1];
            //Skip consider highlightcolor if paragraph mark alone is selected similar to Microsoft Word behaviour
            if (!(property === 'highlightColor' && selection.isParagraphLastLine(lastLine)
                && start.currentWidget === lastLine && start.offset === selection.getLineLength(lastLine))) {
                this.applyCharFormatValue(paragraph.characterFormat, property, value, update);
            }
            endOffset = length;
        }
        else {
            var lastLine = paragraph.childWidgets[paragraph.childWidgets.length - 1];
            if (selection.isParagraphLastLine(lastLine) && end.currentWidget === lastLine
                && ((endOffset === selection.getLineLength(lastLine) + 1) || (selection.isEmpty && selection.end.isAtParagraphEnd))) {
                this.applyCharFormatValue(paragraph.characterFormat, property, value, update);
            }
        }
        // let count: number = 0;
        for (var i = startLineWidget; i <= endLineWidget; i++) {
            var line = paragraph.childWidgets[i];
            if (i !== startLineWidget) {
                startOffset = selection.getStartLineOffset(line);
            }
            if (line === end.currentWidget) {
                endOffset = end.offset;
            }
            else {
                endOffset = selection.getLineLength(line);
            }
            var count = 0;
            var isStarted = true;
            var endElement = undefined;
            var indexOf = -1;
            var isIncrease = true;
            for (var j = 0; j < line.children.length; isIncrease ? j++ : j--) {
                var inlineObj = line.children[j];
                isStarted = false;
                if (inlineObj instanceof ListTextElementBox) {
                    continue;
                }
                if (endElement === inlineObj) {
                    endElement = undefined;
                    j = indexOf;
                    indexOf = -1;
                    isIncrease = true;
                }
                if (startOffset >= count + inlineObj.length) {
                    count += inlineObj.length;
                    continue;
                }
                var startIndex = 0;
                if (startOffset > count) {
                    startIndex = startOffset - count;
                }
                var endIndex = endOffset - count;
                var inlineLength = inlineObj.length;
                if (endIndex > inlineLength) {
                    endIndex = inlineLength;
                }
                var index = this.applyCharFormatInline(inlineObj, selection, startIndex, endIndex, property, value, update);
                j += index;
                if (endOffset <= count + inlineLength) {
                    break;
                }
                count += inlineLength;
            }
        }
        var endParagraph = end.paragraph;
        this.documentHelper.layout.reLayoutParagraph(paragraph, startLineWidget, 0);
        if (paragraph.equals(endParagraph)) {
            return;
        }
        this.getNextParagraphForCharacterFormatting(paragraph, start, end, property, value, update);
    };
    /**
     * Toggles the bold property of selected contents.
     *
     * @returns {void}
     */
    Editor.prototype.toggleBold = function () {
        if ((this.owner.isReadOnlyMode || this.restrictFormatting) && !this.selection.isInlineFormFillMode()) {
            return;
        }
        var value = this.getCurrentSelectionValue('bold');
        this.selection.characterFormat.bold = value;
    };
    /**
     * Toggles the bold property of selected contents.
     *
     * @returns {void}
     */
    Editor.prototype.toggleItalic = function () {
        if ((this.owner.isReadOnlyMode || this.restrictFormatting) && !this.selection.isInlineFormFillMode()) {
            return;
        }
        var value = this.getCurrentSelectionValue('italic');
        this.selection.characterFormat.italic = value;
    };
    /**
     * Change the selected text to uppercase.
     * @private
     */
    Editor.prototype.changeCase = function (property) {
        if (this.selection.isEmpty || ((this.owner.isReadOnlyMode || this.restrictFormatting) && !this.selection.isInlineFormFillMode())) {
            return;
        }
        this.initHistory('Uppercase');
        this.documentHelper.owner.isShiftingEnabled = true;
        var selection = this.selection;
        var startPosition = selection.start;
        var endPosition = selection.end;
        if (!selection.isForward) {
            startPosition = selection.end;
            endPosition = selection.start;
        }
        this.changeSelectedTextCase(selection, startPosition, endPosition, property);
        this.reLayout(selection);
    };
    /**
     * Change the selected text case.
     * @private
     */
    /* eslint-disable-next-line max-len */
    Editor.prototype.changeSelectedTextCase = function (selection, startPosition, endPosition, property, removedTextNodes) {
        var blockInfo = this.selection.getParagraphInfo(startPosition);
        selection.editPosition = this.selection.getHierarchicalIndex(blockInfo.paragraph, blockInfo.offset.toString());
        if (this.editorHistory && this.editorHistory.currentBaseHistoryInfo) {
            if (this.checkInsertPosition(selection)) {
                this.updateHistoryPosition(startPosition, true);
            }
        }
        var isRevert = this.editorHistory.isUndoing;
        if (isRevert && !isNullOrUndefined(removedTextNodes) && removedTextNodes.length > 0) {
            this.removedTextNodes = removedTextNodes;
        }
        var endPos = endPosition.selection.endOffset;
        this.changeTextCase(startPosition.paragraph, selection, startPosition, endPosition, property, isRevert);
        if (this.editorHistory && this.editorHistory.currentBaseHistoryInfo) {
            if (endPosition.selection.endOffset !== endPos) {
                endPosition = selection.getTextPosBasedOnLogicalIndex(endPos);
            }
            if (this.checkEndPosition(selection)) {
                this.updateHistoryPosition(endPosition, false);
            }
            selection.selectPosition(startPosition, endPosition);
        }
    };
    /* eslint-disable-next-line max-len */
    Editor.prototype.changeTextCase = function (para, selection, startPosition, endPosition, property, isRevert) {
        if (startPosition.paragraph.isInsideTable && (!endPosition.paragraph.isInsideTable
            || startPosition.paragraph.associatedCell !== endPosition.paragraph.associatedCell
            || selection.isCellSelected(startPosition.paragraph.associatedCell, startPosition, endPosition))) {
            var tableCell = void 0;
            startPosition.paragraph.associatedCell.ownerTable.combineWidget(this.owner.viewer);
            if (this.checkInsertPosition(selection)) {
                this.updateHistoryPosition(startPosition, true);
            }
            tableCell = startPosition.paragraph.associatedCell;
            this.changeCaseParaFormatInCell(tableCell, startPosition, endPosition, property, isRevert);
            var table = tableCell.ownerTable;
            this.documentHelper.layout.layoutBodyWidgetCollection(table.index, table.containerWidget, table, false);
        }
        else {
            this.changeCaseParagraph(para, selection, startPosition, endPosition, property, isRevert);
        }
    };
    /* eslint-disable-next-line max-len */
    Editor.prototype.changeCaseParagraph = function (para, selection, startPos, endPos, property, isRevert) {
        para = para.combineWidget(this.owner.viewer);
        var startOffsetVal = 0;
        var len = selection.getParagraphLength(para);
        var startLine = para.childWidgets.indexOf(startPos.currentWidget) !== -1 ?
            para.childWidgets.indexOf(startPos.currentWidget) : 0;
        var endOffsetVal = endPos.offset;
        var endLine = para.childWidgets.indexOf(endPos.currentWidget) !== -1 ?
            para.childWidgets.indexOf(endPos.currentWidget) : para.childWidgets.length - 1;
        if (!isNullOrUndefined(selection)) {
            if (para === startPos.paragraph) {
                startOffsetVal = startPos.offset;
            }
        }
        if (!para.equals(endPos.paragraph)) {
            endOffsetVal = len;
        }
        // let count: number = 0;
        for (var i = startLine; i <= endLine; i++) {
            var line = para.childWidgets[i];
            if (i !== startLine) {
                startOffsetVal = selection.getStartLineOffset(line);
            }
            if (line === endPos.currentWidget) {
                endOffsetVal = endPos.offset;
            }
            else {
                endOffsetVal = selection.getLineLength(line);
            }
            var textCount = 0;
            var isIterationStarted = true;
            var endElementBox = undefined;
            var childIndex = -1;
            var isIncreaseIteration = true;
            /* eslint-disable-next-line max-len */
            for (var j = 0; j < line.children.length; isIncreaseIteration ? j++ : j--) {
                var child = line.children[j];
                isIterationStarted = false;
                if (child instanceof ListTextElementBox) {
                    continue;
                }
                if (endElementBox === child) {
                    endElementBox = undefined;
                    j = childIndex;
                    childIndex = -1;
                    isIncreaseIteration = true;
                }
                if (startOffsetVal >= textCount + child.length) {
                    textCount += child.length;
                    continue;
                }
                var startIndex = 0;
                if (startOffsetVal > textCount) {
                    startIndex = startOffsetVal - textCount;
                }
                var endIndex = endOffsetVal - textCount;
                var inlineLength = child.length;
                if (endIndex > inlineLength) {
                    endIndex = inlineLength;
                }
                var index = this.changeCaseInline(child, selection, startIndex, endIndex, property, isRevert);
                j += index;
                if (endOffsetVal <= textCount + inlineLength) {
                    break;
                }
                textCount += inlineLength;
            }
        }
        var endPara = endPos.paragraph;
        this.documentHelper.layout.reLayoutParagraph(para, startLine, 0);
        if (para.equals(endPara)) {
            return;
        }
        this.changeCaseNextBlock(para, startPos, endPos, property, isRevert);
    };
    /* eslint-disable-next-line max-len */
    Editor.prototype.changeCaseInline = function (inline, selection, startIndex, endIndex, property, isRevert) {
        if (inline instanceof TextElementBox) {
            if (startIndex === 0 && endIndex === inline.length) {
                this.changeCaseInlineInternal(inline, selection, startIndex, endIndex, property, isRevert);
            }
            else {
                return this.changeCaseInlineInternal(inline, selection, startIndex, endIndex, property, isRevert);
            }
        }
        return 0;
    };
    Editor.prototype.addRemovedTextNodes = function (inline, newText) {
        if (inline instanceof TextElementBox) {
            if (!isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo)) {
                var span = this.editorHistory.currentBaseHistoryInfo.removedNodes[0];
                if (isNullOrUndefined(span)) {
                    span = new TextElementBox();
                    span.text = '';
                    this.editorHistory.currentBaseHistoryInfo.removedNodes.push(span);
                }
                span.text += newText;
            }
        }
    };
    /* eslint-disable-next-line max-len */
    Editor.prototype.changeCaseInlineInternal = function (inlineObj, selection, startIndex, endIndex, property, isRevert) {
        var x = 0;
        var index = inlineObj.line.children.indexOf(inlineObj);
        var paragraph = inlineObj.paragraph;
        var lineIndex = paragraph.childWidgets.indexOf(inlineObj.line);
        var textElement;
        if (startIndex > 0) {
            var textToChange = inlineObj.text.substr(startIndex, endIndex - startIndex);
            this.addRemovedTextNodes(inlineObj, textToChange);
            textElement = new TextElementBox();
            textElement.characterFormat.copyFormat(inlineObj.characterFormat);
            textElement.line = inlineObj.line;
            //Change the text case
            textElement.text = this.getChangeCaseText(textToChange, property, isRevert);
            textElement.isRightToLeft = inlineObj.isRightToLeft;
            index++;
            inlineObj.line.children.splice(index, 0, textElement);
            x++;
        }
        if (endIndex < inlineObj.length) {
            textElement = new TextElementBox();
            textElement.characterFormat.copyFormat(inlineObj.characterFormat);
            textElement.text = inlineObj.text.substring(endIndex);
            textElement.line = inlineObj.line;
            textElement.isRightToLeft = inlineObj.isRightToLeft;
            index++;
            inlineObj.line.children.splice(index, 0, textElement);
            x++;
        }
        var textElementBox = inlineObj;
        if (startIndex === 0) {
            var newText = textElementBox.text.substr(0, endIndex);
            this.addRemovedTextNodes(inlineObj, newText);
            //Change the text case
            textElementBox.text = this.getChangeCaseText(newText, property, isRevert);
        }
        else {
            var preText = textElementBox.text.substr(0, startIndex);
            textElementBox.text = preText;
        }
        return x;
    };
    /* eslint-disable-next-line max-len */
    Editor.prototype.changeCaseNextBlock = function (block, start, end, property, isRevert) {
        block = this.getNextBlockForChangeCase(block, start, end, property, isRevert);
        if (!isNullOrUndefined(block)) { //Goto the next block.
            if (block instanceof ParagraphWidget) {
                this.changeCaseParagraph(block, this.documentHelper.selection, start, end, property, isRevert);
            }
            else {
                this.changeCaseForTable(0, block, this.documentHelper.selection, start, end, property, isRevert);
            }
        }
    };
    /* eslint-disable-next-line max-len */
    Editor.prototype.getNextBlockForChangeCase = function (block, start, end, property, isRevert) {
        var widgetCollection = block.getSplitWidgets();
        block = widgetCollection[widgetCollection.length - 1];
        block = this.documentHelper.selection.getNextRenderedBlock(block);
        return block;
    };
    Editor.prototype.getChangeCaseText = function (input, property, isRevert) {
        if (isRevert) {
            if (!isNullOrUndefined(this.removedTextNodes) && this.removedTextNodes.length > 0) {
                var textElement = this.removedTextNodes[0];
                var oldText = textElement.text.substr(0, input.length);
                textElement.text = textElement.text.substr(oldText.length, textElement.length - oldText.length);
                input = oldText;
                if (textElement.text === '') {
                    this.removedTextNodes.splice(0, 1);
                }
            }
        }
        else {
            switch (property) {
                case 'Uppercase':
                    input = input.toUpperCase();
                    break;
                default:
                    break;
            }
        }
        return input;
    };
    // Table
    /* eslint-disable-next-line max-len */
    Editor.prototype.changeCaseForTable = function (indexToStart, tableWidget, selection, startPos, endPos, property, isRevert) {
        tableWidget = tableWidget.combineWidget(this.owner.viewer);
        for (var i = indexToStart; i < tableWidget.childWidgets.length; i++) {
            var row = tableWidget.childWidgets[i];
            for (var j = 0; j < row.childWidgets.length; j++) {
                this.changeCaseForSelectedCell(row.childWidgets[j], selection, property, isRevert);
            }
            if (endPos.paragraph.isInsideTable && selection.containsRow(row, endPos.paragraph.associatedCell)) {
                this.documentHelper.layout.layoutBodyWidgetCollection(tableWidget.index, tableWidget.containerWidget, tableWidget, false);
                return;
            }
        }
        this.documentHelper.layout.layoutBodyWidgetCollection(tableWidget.index, tableWidget.containerWidget, tableWidget, false);
        this.changeCaseNextBlock(tableWidget, startPos, endPos, property, isRevert);
    };
    /* eslint-disable-next-line max-len */
    Editor.prototype.changeCaseForSelectedCell = function (cell, selection, property, isRevert) {
        for (var i = 0; i < cell.childWidgets.length; i++) {
            var block = cell.childWidgets[i];
            if (block instanceof ParagraphWidget) {
                this.changeCaseForSelectedPara(block, selection, property, isRevert);
            }
            else {
                this.changeCaseForSelTable(block, selection, property, isRevert);
            }
        }
    };
    /* eslint-disable-next-line max-len */
    Editor.prototype.changeCaseForSelectedPara = function (paragraph, selection, property, isRevert) {
        for (var i = 0; i < paragraph.childWidgets.length; i++) {
            var line = paragraph.childWidgets[i];
            for (var j = 0; j < line.children.length; j++) {
                var element = line.children[j];
                if (!isNullOrUndefined(element) && element instanceof TextElementBox) {
                    this.addRemovedTextNodes(element, element.text);
                    element.text = this.getChangeCaseText(element.text, property, isRevert);
                }
            }
        }
    };
    /* eslint-disable-next-line max-len */
    Editor.prototype.changeCaseForSelTable = function (tableWidget, selection, property, isRevert) {
        for (var i = 0; i < tableWidget.childWidgets.length; i++) {
            var row = tableWidget.childWidgets[i];
            for (var j = 0; j < row.childWidgets.length; j++) {
                this.changeCaseForSelectedCell(row.childWidgets[j], selection, property, isRevert);
            }
        }
    };
    // Cell
    /* eslint-disable-next-line max-len */
    Editor.prototype.changeCaseParaFormatInCell = function (tableCell, startPos, endPos, property, isRevert) {
        var selection = this.documentHelper.selection;
        if (endPos.paragraph.isInsideTable) {
            var cellContainer = selection.getContainerCellOf(tableCell, endPos.paragraph.associatedCell);
            if (cellContainer.ownerTable.contains(endPos.paragraph.associatedCell)) {
                var startCell = selection.getSelectedCell(tableCell, cellContainer);
                var endCell = selection.getSelectedCell(endPos.paragraph.associatedCell, cellContainer);
                if (selection.containsCell(cellContainer, endPos.paragraph.associatedCell)) {
                    //Selection end is in container cell.
                    if (selection.isCellSelected(cellContainer, startPos, endPos)) {
                        this.changeCaseParaForCellInternal(cellContainer, selection, property, isRevert);
                    }
                    else {
                        if (startCell === cellContainer) {
                            this.changeCaseParagraph(startPos.paragraph, selection, startPos, endPos, property, isRevert);
                        }
                        else {
                            this.changeCaseParaForRow(startCell.ownerRow, selection, startPos, endPos, property, isRevert);
                        }
                    }
                }
                else {
                    //Change case of other selected cells in the current table.
                    this.changeCaseParaForTableCell(cellContainer.ownerTable, cellContainer, endCell, property, isRevert);
                }
            }
            else {
                this.changeCaseParaForRow(cellContainer.ownerRow, selection, startPos, endPos, property, isRevert);
            }
        }
        else {
            var wCell = selection.getContainerCell(tableCell);
            this.changeCaseParaForRow(wCell.ownerRow, selection, startPos, endPos, property, isRevert);
        }
    };
    // Table
    /* eslint-disable-next-line max-len */
    Editor.prototype.changeCaseParaForTableCell = function (tableWidget, startCell, endCell, property, isRevert) {
        var selection = this.documentHelper.selection;
        var cellStartValue = selection.getCellLeft(startCell.ownerRow, startCell);
        var cellEndValue = cellStartValue + startCell.cellFormat.cellWidth;
        var cellEndLeft = selection.getCellLeft(endCell.ownerRow, endCell);
        var cellEndRight = cellEndLeft + endCell.cellFormat.cellWidth;
        var cellInfo = this.updateSelectedCellsInTable(cellStartValue, cellEndValue, cellEndLeft, cellEndRight);
        cellStartValue = cellInfo.start;
        cellEndValue = cellInfo.end;
        var count = tableWidget.childWidgets.indexOf(endCell.ownerRow);
        for (var m = tableWidget.childWidgets.indexOf(startCell.ownerRow); m <= count; m++) {
            var row = tableWidget.childWidgets[m];
            for (var j = 0; j < row.childWidgets.length; j++) {
                var left = selection.getCellLeft(row, row.childWidgets[j]);
                if (Math.round(cellStartValue) <= Math.round(left) && Math.round(left) < Math.round(cellEndValue)) {
                    this.changeCaseParaForCellInternal(row.childWidgets[j], selection, property, isRevert);
                }
            }
        }
    };
    /* eslint-disable-next-line max-len */
    Editor.prototype.changeCaseParaForCellInternal = function (tableCell, selection, property, isRevert) {
        for (var i = 0; i < tableCell.childWidgets.length; i++) {
            var childBlock = tableCell.childWidgets[i];
            if (childBlock instanceof ParagraphWidget) {
                this.changeCaseForSelectedPara(childBlock, selection, property, isRevert);
            }
            else {
                this.changeCaseParaFormatTableInternal(childBlock, selection, property, isRevert);
            }
        }
    };
    /* eslint-disable-next-line max-len */
    Editor.prototype.changeCaseParaFormatTableInternal = function (table, selection, property, isRevert) {
        for (var x = 0; x < table.childWidgets.length; x++) {
            var row = table.childWidgets[x];
            for (var y = 0; y < row.childWidgets.length; y++) {
                this.changeCaseParaForCellInternal(row.childWidgets[y], selection, property, isRevert);
            }
        }
    };
    // Row
    /* eslint-disable-next-line max-len */
    Editor.prototype.changeCaseParaForRow = function (wRow, selection, start, end, property, isRevert) {
        for (var i = wRow.rowIndex; i < wRow.ownerTable.childWidgets.length; i++) {
            var row = wRow.ownerTable.childWidgets[i];
            for (var j = 0; j < row.childWidgets.length; j++) {
                this.changeCaseParaForCellInternal(row.childWidgets[j], selection, property, isRevert);
            }
            if (end.paragraph.isInsideTable && this.documentHelper.selection.containsRow(row, end.paragraph.associatedCell)) {
                return;
            }
        }
        this.changeCaseNextBlock(wRow.ownerTable, start, end, property, isRevert);
    };
    /**
     * Toggles the all Caps formatting for the selected content.
     *
     * @returns {void}
     */
    Editor.prototype.toggleAllCaps = function () {
        if (this.documentHelper.owner.isReadOnlyMode && !this.selection.isInlineFormFillMode()) {
            return;
        }
        var value = this.getCurrentSelectionValue('allCaps');
        this.selection.characterFormat.allCaps = value;
    };
    Editor.prototype.getCurrentSelectionValue = function (property) {
        var value = false;
        if ((property === 'bold' || property === 'italic')) {
            var characterFormat = this.getSelectedCharacterFormat();
            if (property === 'bold') {
                value = !(characterFormat.bold);
            }
            if (property === 'italic') {
                value = !(characterFormat.italic);
            }
        }
        return value;
    };
    Editor.prototype.getSelectedCharacterFormat = function () {
        var index = 0;
        var start = this.selection.start;
        if (!this.selection.isForward) {
            start = this.selection.end;
        }
        var lineWidget = start.currentWidget;
        var inlineObj = lineWidget.getInline(start.offset, index);
        var inline = inlineObj.element;
        // inline.ownerBase
        index = inlineObj.index;
        var characterFormat = lineWidget.paragraph.characterFormat;
        if (!isNullOrUndefined(inline)) {
            if (this.selection.isEmpty && this.selection.contextType === 'List') {
                var listLevel = this.selection.getListLevel(this.selection.start.paragraph);
                if (listLevel.characterFormat.uniqueCharacterFormat) {
                    characterFormat = listLevel.characterFormat;
                }
            }
            else if (!this.selection.isEmpty && index === inline.length) {
                characterFormat = isNullOrUndefined(inline.nextNode) ? lineWidget.paragraph.characterFormat
                    : inline.nextNode.characterFormat;
            }
            else {
                characterFormat = inline.characterFormat;
            }
        }
        return characterFormat;
    };
    /**
     * Toggles the underline property of selected contents.
     *
     * @param underline Specify the underline to be toggled (default: Single).
     * @returns {void}
     */
    Editor.prototype.toggleUnderline = function (underline) {
        if ((this.owner.isReadOnlyMode || this.restrictFormatting) && !this.selection.isInlineFormFillMode()) {
            return;
        }
        this.updateProperty(1, underline);
    };
    /**
     * Toggles the strike through property of selected contents.
     *
     * @param {Strikethrough} strikethrough Specify the strike through to be toggled (default: SingleStrike).
     * @returns {void}
     */
    Editor.prototype.toggleStrikethrough = function (strikethrough) {
        if (!this.owner.isReadOnlyMode || this.selection.isInlineFormFillMode()) {
            var value = void 0;
            if (isNullOrUndefined(strikethrough)) {
                value = this.selection.characterFormat.strikethrough === 'SingleStrike' ? 'None' : 'SingleStrike';
            }
            else {
                value = strikethrough;
            }
            this.selection.characterFormat.strikethrough = value;
        }
    };
    Editor.prototype.updateFontSize = function (format, value) {
        if (typeof (value) === 'number' && !(value < 0 && format.fontSize === 1)) {
            return format.fontSize + value;
        }
        var fontsizeCollection = [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 26, 28, 36, 48, 72];
        if (typeof (value) === 'string' && value === 'increment') {
            if (format.fontSize < 8) {
                return format.fontSize + 1;
            }
            else if (format.fontSize >= 72 && format.fontSize < 80) {
                return 80;
            }
            else if (format.fontSize >= 80) {
                return format.fontSize + 10;
            }
            else {
                for (var i = 0; i < fontsizeCollection.length; i++) {
                    if (format.fontSize < fontsizeCollection[i]) {
                        return fontsizeCollection[i];
                    }
                }
            }
        }
        else if (typeof (value) === 'string' && value === 'decrement' && format.fontSize > 1) {
            if (format.fontSize <= 8) {
                return format.fontSize - 1;
            }
            else if (format.fontSize > 72 && format.fontSize <= 80) {
                return 72;
            }
            else if (format.fontSize > 80) {
                return format.fontSize - 10;
            }
            else {
                for (var i = 0; i < fontsizeCollection.length; i++) {
                    if (format.fontSize <= fontsizeCollection[i]) {
                        return fontsizeCollection[i - 1];
                    }
                }
            }
        }
        return format.fontSize;
    };
    // Inline
    Editor.prototype.applyCharFormatInline = function (inline, selection, startIndex, endIndex, property, value, update) {
        if (startIndex === 0 && endIndex === inline.length) {
            this.applyCharFormatValue(inline.characterFormat, property, value, update);
            return 0;
        }
        else if (inline instanceof TextElementBox) {
            return this.formatInline(inline, selection, startIndex, endIndex, property, value, update);
        }
        return 0;
    };
    Editor.prototype.formatInline = function (inline, selection, startIndex, endIndex, property, value, update) {
        var x = 0;
        var node = inline;
        var index = inline.line.children.indexOf(node);
        var paragraph = inline.paragraph;
        var textElement;
        var indexCountForRevision = 0;
        if (startIndex > 0) {
            indexCountForRevision += 1;
            textElement = new TextElementBox();
            textElement.characterFormat.copyFormat(inline.characterFormat);
            textElement.line = inline.line;
            textElement.text = inline.text.substr(startIndex, endIndex - startIndex);
            textElement.isRightToLeft = inline.isRightToLeft;
            this.applyCharFormatValue(textElement.characterFormat, property, value, update);
            index++;
            node.line.children.splice(index, 0, textElement);
            x++;
            this.updateRevisionForFormattedContent(inline, textElement, indexCountForRevision);
            // this.addToLinkedFields(span);                      
        }
        if (endIndex < node.length) {
            indexCountForRevision += 1;
            textElement = new TextElementBox();
            textElement.characterFormat.copyFormat(inline.characterFormat);
            textElement.text = node.text.substring(endIndex);
            textElement.line = inline.line;
            textElement.isRightToLeft = inline.isRightToLeft;
            index++;
            node.line.children.splice(index, 0, textElement);
            x++;
            this.updateRevisionForFormattedContent(inline, textElement, indexCountForRevision);
            // this.addToLinkedFields(span);                       
        }
        if (startIndex === 0) {
            inline.text = inline.text.substr(0, endIndex);
            this.applyCharFormatValue(inline.characterFormat, property, value, update);
        }
        else {
            inline.text = inline.text.substr(0, startIndex);
        }
        return x;
    };
    Editor.prototype.updateRevisionForFormattedContent = function (inline, tempSpan, indexCount) {
        for (var i = 0; i < inline.revisions.length; i++) {
            var currentRevision = inline.revisions[i];
            var rangeIndex = currentRevision.range.indexOf(inline) + indexCount;
            tempSpan.revisions.splice(0, 0, currentRevision);
            currentRevision.range.splice(rangeIndex, 0, tempSpan);
            this.owner.trackChangesPane.updateCurrentTrackChanges(currentRevision);
        }
    };
    // Cell
    Editor.prototype.applyCharFormatCell = function (cell, selection, start, end, property, value, update) {
        if (end.paragraph.isInsideTable) {
            var containerCell = selection.getContainerCellOf(cell, end.paragraph.associatedCell);
            if (containerCell.ownerTable.contains(end.paragraph.associatedCell)) {
                var startCell = selection.getSelectedCell(cell, containerCell);
                var endCell = selection.getSelectedCell(end.paragraph.associatedCell, containerCell);
                if (selection.containsCell(containerCell, end.paragraph.associatedCell)) {
                    //Selection end is in container cell.
                    if (selection.isCellSelected(containerCell, start, end)) {
                        value = this.getCharacterFormatValueOfCell(cell, selection, value, property);
                        this.applyCharFormatForSelectedCell(containerCell, selection, property, value, update);
                    }
                    else {
                        if (startCell === containerCell) {
                            this.applyCharFormat(start.paragraph, selection, start, end, property, value, update);
                        }
                        else {
                            this.applyCharFormatRow(startCell.ownerRow, selection, start, end, property, value, update);
                        }
                    }
                }
                else { //Format other selected cells in current table.
                    this.applyCharFormatForTableCell(containerCell.ownerTable, selection, containerCell, endCell, property, value, update);
                }
            }
            else {
                this.applyCharFormatRow(containerCell.ownerRow, selection, start, end, property, value, update);
            }
        }
        else {
            var tableCell = selection.getContainerCell(cell);
            this.applyCharFormatRow(tableCell.ownerRow, selection, start, end, property, value, update);
        }
    };
    Editor.prototype.applyCharFormatForSelectedCell = function (cell, selection, property, value, update) {
        for (var i = 0; i < cell.childWidgets.length; i++) {
            var block = cell.childWidgets[i];
            if (block instanceof ParagraphWidget) {
                this.applyCharFormatForSelectedPara(block, selection, property, value, update);
            }
            else {
                this.applyCharFormatForSelTable(block, selection, property, value, update);
            }
        }
    };
    // Row
    Editor.prototype.applyCharFormatRow = function (row, selection, start, end, property, value, update) {
        value = this.getCharacterFormatValueOfCell(row.childWidgets[0], selection, value, property);
        this.applyCharFormatForTable(row.rowIndex, row.ownerTable, selection, start, end, property, value, update);
    };
    // Table
    Editor.prototype.applyCharFormatForTable = function (index, table, selection, start, end, property, value, update) {
        table = table.combineWidget(this.owner.viewer);
        for (var i = index; i < table.childWidgets.length; i++) {
            var row = table.childWidgets[i];
            for (var j = 0; j < row.childWidgets.length; j++) {
                this.applyCharFormatForSelectedCell(row.childWidgets[j], selection, property, value, update);
            }
            if (end.paragraph.isInsideTable && selection.containsRow(row, end.paragraph.associatedCell)) {
                this.documentHelper.layout.layoutBodyWidgetCollection(table.index, table.containerWidget, table, false);
                return;
            }
        }
        this.documentHelper.layout.layoutBodyWidgetCollection(table.index, table.containerWidget, table, false);
        this.getNextParagraphForCharacterFormatting(table, start, end, property, value, update);
    };
    Editor.prototype.applyCharFormatForSelTable = function (tableWidget, selection, property, value, update) {
        for (var i = 0; i < tableWidget.childWidgets.length; i++) {
            var row = tableWidget.childWidgets[i];
            for (var j = 0; j < row.childWidgets.length; j++) {
                this.applyCharFormatForSelectedCell(row.childWidgets[j], selection, property, value, update);
            }
        }
    };
    Editor.prototype.applyCharFormatForTableCell = function (table, selection, startCell, endCell, property, value, update) {
        var startCellLeft = selection.getCellLeft(startCell.ownerRow, startCell);
        var startCellRight = startCellLeft + startCell.cellFormat.cellWidth;
        var endCellLeft = selection.getCellLeft(endCell.ownerRow, endCell);
        var endCellRight = endCellLeft + endCell.cellFormat.cellWidth;
        var cellInfo = this.updateSelectedCellsInTable(startCellLeft, startCellRight, endCellLeft, endCellRight);
        startCellLeft = cellInfo.start;
        startCellRight = cellInfo.end;
        var count = table.childWidgets.indexOf(endCell.ownerRow);
        var isStarted = false;
        for (var i = table.childWidgets.indexOf(startCell.ownerRow); i <= count; i++) {
            var row = table.childWidgets[i];
            for (var j = 0; j < row.childWidgets.length; j++) {
                var left = selection.getCellLeft(row, row.childWidgets[j]);
                if (HelperMethods.round(startCellLeft, 2) <= HelperMethods.round(left, 2) &&
                    HelperMethods.round(left, 2) < HelperMethods.round(startCellRight, 2)) {
                    if (!isStarted) {
                        value = this.getCharacterFormatValueOfCell(row.childWidgets[j], selection, value, property);
                        isStarted = true;
                    }
                    this.applyCharFormatForSelectedCell(row.childWidgets[j], selection, property, value, update);
                }
            }
        }
    };
    Editor.prototype.updateSelectedCellsInTable = function (start, end, endCellLeft, endCellRight) {
        var selection = this.documentHelper.selection;
        if (start > endCellLeft) {
            start = endCellLeft;
        }
        if (end < endCellRight) {
            end = endCellRight;
        }
        if (start > selection.upDownSelectionLength) {
            start = selection.upDownSelectionLength;
        }
        if (end < selection.upDownSelectionLength) {
            end = selection.upDownSelectionLength;
        }
        return { start: start, end: end };
    };
    Editor.prototype.getCharacterFormatValueOfCell = function (cell, selection, value, property) {
        if (typeof (value) === 'boolean' || (value === undefined && (property === 'bold' || property === 'italic'))) {
            var firstParagraph = selection.getFirstParagraph(cell);
            var format = firstParagraph.characterFormat;
            if (firstParagraph.childWidgets.length > 0 && firstParagraph.childWidgets[0].children.length > 0) {
                format = firstParagraph.childWidgets[0].children[0].characterFormat;
            }
            value = !format.getPropertyValue(property);
        }
        return value;
    };
    /**
     * Apply Character format for selection
     *
     * @private
     * @returns {void}
     */
    Editor.prototype.applyCharFormatValueInternal = function (selection, format, property, value) {
        this.applyCharFormatValue(format, property, value, false);
    };
    Editor.prototype.copyInlineCharacterFormat = function (sourceFormat, destFormat) {
        destFormat.uniqueCharacterFormat = sourceFormat.uniqueCharacterFormat;
        destFormat.baseCharStyle = sourceFormat.baseCharStyle;
    };
    Editor.prototype.applyCharFormatValue = function (format, property, value, update) {
        if (update && property === 'fontSize') {
            value = this.updateFontSize(format, value);
        }
        if (this.editorHistory && !isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo)) {
            value = this.editorHistory.currentBaseHistoryInfo.addModifiedProperties(format, property, value);
        }
        if (value instanceof WCharacterFormat) {
            if (this.editorHistory && (this.editorHistory.isUndoing || this.editorHistory.isRedoing)) {
                this.copyInlineCharacterFormat(value, format);
            }
            else {
                format.copyFormat(value);
            }
            return;
        }
        if (this.isForHyperlinkFormat && this.owner.enableTrackChanges && format.ownerBase instanceof ElementBox) {
            var currentElement = format.ownerBase;
            var prevElement = currentElement.previousNode;
            if (isNullOrUndefined(prevElement)) {
                var paraWidget = currentElement.paragraph.previousWidget;
                if (!isNullOrUndefined(paraWidget) && !paraWidget.isEmpty()) {
                    var lineWidget = paraWidget.lastChild;
                    prevElement = lineWidget.children[lineWidget.children.length - 1];
                }
            }
            while (!isNullOrUndefined(prevElement) && !(prevElement instanceof TextElementBox)) {
                prevElement = prevElement.previousNode;
            }
            if (!isNullOrUndefined(prevElement) && prevElement.revisions.length > 0) {
                var currentRevision = prevElement.revisions[prevElement.revisions.length - 1];
                if (!this.isRevisionAlreadyIn(currentElement, currentRevision)) {
                    currentElement.revisions.push(currentRevision);
                    currentRevision.range.push(currentElement);
                    this.owner.trackChangesPane.updateCurrentTrackChanges(currentRevision);
                }
            }
            else {
                this.insertRevision(currentElement, 'Insertion');
            }
        }
        if (isNullOrUndefined(value)) {
            format.clearFormat();
            return;
        }
        if (property === 'bold') {
            format.bold = value;
        }
        else if (property === 'italic') {
            format.italic = value;
        }
        else if (property === 'fontColor') {
            format.fontColor = value;
        }
        else if (property === 'fontFamily') {
            format.fontFamily = value;
            format.fontFamilyAscii = value;
            format.fontFamilyFarEast = value;
            format.fontFamilyNonFarEast = value;
            format.fontFamilyBidi = value;
        }
        else if (property === 'fontSize') {
            format.fontSize = value;
        }
        else if (property === 'highlightColor') {
            format.highlightColor = value;
        }
        else if (property === 'baselineAlignment') {
            format.baselineAlignment = value;
        }
        else if (property === 'strikethrough') {
            format.strikethrough = value;
        }
        else if (property === 'underline') {
            format.underline = value;
        }
        else if (property === 'styleName') {
            format.baseCharStyle = value;
        }
        else if (property === 'allCaps') {
            format.allCaps = value;
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Editor.prototype.onImageFormat = function (elementBox, width, height, alternateText) {
        var modifiedFormat = new ImageInfo(elementBox);
        if (this.editorHistory) {
            this.editorHistory.initializeHistory('ImageResizing');
            this.editorHistory.currentBaseHistoryInfo.modifiedProperties.push(modifiedFormat);
        }
        this.setOffsetValue(this.selection);
        elementBox.width = width;
        elementBox.height = height;
        elementBox.alternateText = alternateText;
        this.documentHelper.layout.reLayoutParagraph(elementBox.line.paragraph, elementBox.line.indexInOwner, 0);
        this.reLayout(this.selection, false);
        if (this.documentHelper.owner.imageResizerModule) {
            this.documentHelper.owner.imageResizerModule.positionImageResizer(elementBox);
        }
    };
    /**
     * Toggles the text alignment of selected paragraphs.
     *
     * @param {TextAlignment} textAlignment Specifies the text alignment.
     * @returns {void}
     */
    Editor.prototype.toggleTextAlignment = function (textAlignment) {
        if ((this.documentHelper.owner.isReadOnlyMode && !this.selection.isInlineFormFillMode()) || !this.documentHelper.owner.isDocumentLoaded) {
            return;
        }
        // Toggle performed based on current selection format similar to MS word behavior.
        if (!isNullOrUndefined(this.documentHelper.selection.paragraphFormat.textAlignment) && this.documentHelper.selection.paragraphFormat.textAlignment === textAlignment) {
            if (textAlignment === 'Left') {
                this.onApplyParagraphFormat('textAlignment', 'Justify', false, true);
            }
            else {
                this.onApplyParagraphFormat('textAlignment', 'Left', false, true);
            }
        }
        else {
            this.onApplyParagraphFormat('textAlignment', textAlignment, false, true);
        }
    };
    /**
     * @private
     */
    Editor.prototype.setPreviousBlockToLayout = function () {
        var startPosition = this.documentHelper.selection.start;
        if (!this.documentHelper.selection.isForward) {
            startPosition = this.documentHelper.selection.end;
        }
        var startParagraph = startPosition.paragraph;
        if (startParagraph.paragraphFormat.keepWithNext) {
            var bodyWidget = startParagraph.bodyWidget;
            if (!isNullOrUndefined(bodyWidget) && bodyWidget instanceof BodyWidget && bodyWidget.page) {
                var previousPage = bodyWidget.page.previousPage;
                if (previousPage) {
                    this.previousBlockToLayout = previousPage.bodyWidgets[0].lastChild;
                }
            }
        }
    };
    /**
     * Apply borders for selected paragraph borders
     * @private
     */
    Editor.prototype.applyParagraphBorders = function (property, bordersType, value) {
        var borders = new WBorder();
        switch (property) {
            case 'color':
                borders.color = value;
                break;
            case 'lineWidth':
                borders.lineWidth = value;
                break;
            case 'lineStyle':
                borders.lineStyle = value;
                break;
            case 'shadow':
                borders.shadow = value;
                break;
            case 'space':
                borders.space = value;
                break;
        }
        this.onApplyParagraphFormat(bordersType, borders, false, false);
    };
    /**
     * Applies paragraph format for the selection ranges.
     *
     * @param {string} property - Specifies the property
     * @param {Object} value - Specifies the value
     * @param {boolean} update - Specifies the update
     * @param {boolean} isSelectionChanged - Specifies the selection change.
     * @private
     * @returns {void}
     */
    Editor.prototype.onApplyParagraphFormat = function (property, value, update, isSelectionChanged) {
        var allowFormatting = this.documentHelper.isFormFillProtectedMode
            && this.documentHelper.selection.isInlineFormFillMode() && this.allowFormattingInFormFields(property);
        if (this.restrictFormatting && !allowFormatting) {
            return;
        }
        this.setPreviousBlockToLayout();
        var action = property === 'bidi' ? 'ParagraphBidi' : (property[0].toUpperCase() + property.slice(1));
        this.documentHelper.owner.isShiftingEnabled = true;
        var selection = this.documentHelper.selection;
        var currentPara = selection.start.paragraph;
        var isFirstParaForList = false;
        if (!selection.isForward) {
            currentPara = selection.end.paragraph;
        }
        if (property == 'leftIndent') {
            isFirstParaForList = this.isFirstParaForList(selection, currentPara);
        }
        // To stop the indentation when the paragraph x position is at the clientArea's x position
        if (value <= 0 && property == 'leftIndent') {
            var x = HelperMethods.convertPointToPixel(value);
            if ((currentPara.x + x) < this.viewer.clientArea.x) {
                this.documentHelper.owner.isShiftingEnabled = false;
                return;
            }
        }
        this.initHistory(action);
        if ((this.owner.isReadOnlyMode && !allowFormatting) || !this.owner.isDocumentLoaded) {
            return;
        }
        if (property === 'leftIndent') {
            if (!isNullOrUndefined(selection.paragraphFormat.listId) && selection.paragraphFormat.listId !== -1 && update) {
                if (isFirstParaForList) {
                    this.updateListLevelIndent(value, currentPara);
                }
                else {
                    this.updateListLevel(value > 0);
                }
                return;
            }
        }
        var isSkipSelection = !((value instanceof WCharacterStyle) && property == 'styleName' && selection.isEmpty);
        if (isSkipSelection && selection.isEmpty) {
            this.setOffsetValue(selection);
            var isBidiList = selection.paragraphFormat.bidi &&
                (property === 'listFormat' || selection.paragraphFormat.listId !== -1);
            if (!isBidiList) {
                this.documentHelper.layout.isBidiReLayout = true;
            }
            if (update && property === 'leftIndent') {
                value = this.getIndentIncrementValue(selection.start.paragraph, value);
            }
            var para = selection.start.paragraph;
            var layout = this.documentHelper.layout;
            // let footNoteWidgetsInfo: FootNoteWidgetsInfo = layout.getFootNodeWidgetsToShiftToPage(para);
            para = para.combineWidget(this.owner.viewer);
            this.applyParaFormatProperty(para, property, value, update);
            this.layoutItemBlock(para, false);
            // if (footNoteWidgetsInfo.footNoteWidgets.length > 0) {
            //     layout.moveFootNotesToPage(footNoteWidgetsInfo.footNoteWidgets, footNoteWidgetsInfo.fromBodyWidget, footNoteWidgetsInfo.toBodyWidget);
            //     layout.layoutfootNote(footNoteWidgetsInfo.toBodyWidget.page.footnoteWidget);
            // }
        }
        else {
            //Iterate and update formatting's.      
            if (action !== 'ParagraphBidi') {
                this.setOffsetValue(selection);
            }
            this.updateSelectionParagraphFormatting(property, value, update);
        }
        this.reLayout(selection);
    };
    /**
     * Updates the indent value in the ListLevel
     * @param {Object} value - Specifies the value
     * @param {ParagraphWidget} currentPara - Specifies the selected paragraph
     * @private
     * @returns {void}
     */
    Editor.prototype.updateListLevelIndent = function (value, currentPara) {
        var list = this.documentHelper.getListById(currentPara.paragraphFormat.listFormat.listId);
        var abstractList = this.documentHelper.getAbstractListById(list.abstractListId);
        var level;
        this.initHistory('List');
        if (value < 0) {
            if ((abstractList.levels[0].paragraphFormat.leftIndent + value) <= 0) {
                value = 18 - abstractList.levels[0].paragraphFormat.leftIndent;
            }
        }
        if (value == 0) {
            return;
        }
        for (var i = 0; i < abstractList.levels.length; i++) {
            if (this.editorHistory && !isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo)) {
                this.editorHistory.currentBaseHistoryInfo.addModifiedPropertiesForList(abstractList.levels[i]);
            }
            level = abstractList.levels[i];
            level.paragraphFormat.leftIndent += value;
        }
        //To Do, Implement relayouting logic for this listStyle applied paragraphs alone.
        //And shift remaining elements without layouting again.
        //It will improve the performance in large size documents.
        //The same can be reused in style modifications.
        this.documentHelper.owner.isShiftingEnabled = true;
        this.layoutWholeDocument();
        this.documentHelper.owner.isShiftingEnabled = false;
    };
    /**
     * To check the current selection is first paragraph for list
     * @param {Selection} selection - Specifies the selection
     * @param {ParagraphWidget} currentPara - Specifies the current paragraph
     * @private
     * @returns {boolean}
     */
    Editor.prototype.isFirstParaForList = function (selection, currentPara) {
        var isFirstParaForList = false;
        if (!isNullOrUndefined(selection.paragraphFormat.listId) && selection.paragraphFormat.listId !== -1 && currentPara.paragraphFormat.listFormat.listLevelNumber === 0) {
            //Getting the previous paragraph with same listId
            var previousParagraph = this.updateWholeListItems(currentPara, true, selection.paragraphFormat.listId);
            if (isNullOrUndefined(previousParagraph)) {
                isFirstParaForList = true;
            }
        }
        return isFirstParaForList;
    };
    /**
     * Update the list level
     *
     * @param {boolean} increaseLevel - Specifies the increase level
     * @private
     * @returns {void}
     */
    Editor.prototype.updateListLevel = function (increaseLevel) {
        // Increment or Decrement list level for Multilevel lists.
        var documentHelper = this.documentHelper;
        var listFormat = this.documentHelper.selection.start.paragraph.paragraphFormat.listFormat;
        var paragraphFormat = this.documentHelper.selection.start.paragraph.paragraphFormat;
        var list = documentHelper.getListById(paragraphFormat.listFormat.listId);
        var listLevel = documentHelper.layout.getListLevel(list, paragraphFormat.listFormat.listLevelNumber);
        var levelNumber;
        if (increaseLevel) {
            levelNumber = paragraphFormat.listFormat.listLevelNumber + 1;
        }
        else {
            levelNumber = paragraphFormat.listFormat.listLevelNumber - 1;
        }
        var nextListLevel = documentHelper.layout.getListLevel(list, levelNumber);
        if (!isNullOrUndefined(nextListLevel)) {
            this.onApplyListInternal(list, levelNumber);
            documentHelper.selection.start.updatePhysicalPosition(true);
            documentHelper.selection.end.updatePhysicalPosition(true);
            documentHelper.selection.updateCaretPosition();
        }
    };
    /**
     * Applies list
     *
     * @param {WList} list - Specified the list
     * @param {number} listLevelNumber - Specified the list level number
     * @private
     * @returns {void}
     */
    Editor.prototype.onApplyListInternal = function (list, listLevelNumber) {
        //let selection: Selection = this.documentHelper.selection;
        var listFormat = new WListFormat();
        if (!isNullOrUndefined(list) && listLevelNumber >= 0 && listLevelNumber < 9) {
            listFormat.listId = list.listId;
            listFormat.listLevelNumber = listLevelNumber;
        }
        this.onApplyParagraphFormat('listFormat', listFormat, false, false);
    };
    /**
     * Apply paragraph format to selection range
     *
     * @param {string} property - Specifies the property
     * @param {Object} value - Specifies the value
     * @param {boolean} update - Specifies the update
     * @private
     * @returns {void}
     */
    Editor.prototype.updateSelectionParagraphFormatting = function (property, value, update) {
        var selection = this.documentHelper.selection;
        if (property === 'leftIndent' && update) {
            if (!isNullOrUndefined(selection.start) && selection.start.isExistBefore(selection.end)) {
                value = this.getIndentIncrementValue(selection.start.paragraph, value);
            }
            else {
                value = this.getIndentIncrementValue(selection.end.paragraph, value);
            }
        }
        this.updateParagraphFormatInternal(property, value, update);
    };
    Editor.prototype.getIndentIncrementValue = function (currentParagraph, incrementFactor) {
        var currentParagraphIndent = currentParagraph.paragraphFormat.leftIndent;
        if (currentParagraphIndent < 0) {
            // In MS Word, if the current paragraph left indent is lesser that or equal to 0
            // then performing decrement indent will set left indent to 0. 
            if (incrementFactor < 0 || currentParagraphIndent + incrementFactor >= 0) {
                return -currentParagraphIndent;
            }
            else {
                var incrementValue = -this.getIndentIncrementValueInternal(-currentParagraphIndent, -incrementFactor);
                return incrementValue % incrementFactor === 0 ? incrementValue : incrementValue + incrementFactor;
            }
        }
        else {
            return this.getIndentIncrementValueInternal(currentParagraphIndent, incrementFactor);
        }
    };
    Editor.prototype.getIndentIncrementValueInternal = function (position, incrementFactor) {
        var tabValue = Math.abs(incrementFactor);
        if (position === 0 || tabValue === 0) {
            return incrementFactor > 0 ? tabValue : 0;
        }
        else {
            var diff = ((Math.round(position) * 100) % (Math.round(tabValue) * 100)) / 100;
            var cnt = (Math.round(position) - diff) / Math.round(tabValue);
            var fPosition = cnt * tabValue;
            if (incrementFactor > 0) {
                fPosition += tabValue;
            }
            return (fPosition - position) === 0 ? incrementFactor : fPosition - position;
        }
    };
    Editor.prototype.updateParagraphFormatInternal = function (property, value, update) {
        if (isNullOrUndefined(property)) {
            property = 'ParagraphFormat';
        }
        switch (property) {
            case 'afterSpacing':
                this.updateParagraphFormat('afterSpacing', value, false);
                break;
            case 'beforeSpacing':
                this.updateParagraphFormat('beforeSpacing', value, false);
                break;
            case 'spaceAfterAuto':
                this.updateParagraphFormat('spaceAfterAuto', value, false);
                break;
            case 'spaceBeforeAuto':
                this.updateParagraphFormat('spaceBeforeAuto', value, false);
                break;
            case 'rightIndent':
                this.updateParagraphFormat('rightIndent', value, false);
                break;
            case 'leftIndent':
                this.updateParagraphFormat('leftIndent', value, update);
                break;
            case 'firstLineIndent':
                this.updateParagraphFormat('firstLineIndent', value, false);
                break;
            case 'lineSpacing':
                this.updateParagraphFormat('lineSpacing', value, false);
                break;
            case 'lineSpacingType':
                this.updateParagraphFormat('lineSpacingType', value, false);
                break;
            case 'textAlignment':
                this.updateParagraphFormat('textAlignment', value, false);
                break;
            case 'borders':
            case 'topBorder':
            case 'bottomBorder':
            case 'leftBorder':
            case 'rightBorder':
            case 'horizontalBorder':
            case 'verticalBorder':
                this.updateParagraphFormat(property, value, false);
                break;
            case 'listFormat':
                this.updateParagraphFormat('listFormat', value, false);
                break;
            case 'ParagraphFormat':
                this.updateParagraphFormat(undefined, value, false);
                break;
            case 'styleName':
                this.updateParagraphFormat('styleName', value, false);
                break;
            case 'ClearParagraphFormat':
                // this.initializeHistory('ClearParagraphFormat', selectionRange);
                this.updateParagraphFormat(undefined, value, false);
                break;
            case 'bidi':
                var isBidiList = this.selection.paragraphFormat.listId !== -1;
                if (!isBidiList) {
                    this.documentHelper.layout.isBidiReLayout = true;
                }
                this.updateParagraphFormat('bidi', value, false);
                if (!isBidiList) {
                    this.documentHelper.layout.isBidiReLayout = false;
                }
                break;
            case 'contextualSpacing':
                this.updateParagraphFormat('contextualSpacing', value, false);
                break;
        }
    };
    /**
     * Update paragraph format on undo
     *
     * @param {string} property - Specifies the property
     * @param {Object} value - Specifies the value
     * @param {boolean} update - Specifies the update
     * @private
     * @returns {void}
     */
    Editor.prototype.updateParagraphFormat = function (property, value, update) {
        var selection = this.documentHelper.selection;
        var startPosition = selection.start;
        var endPosition = selection.end;
        if (!selection.isForward) {
            startPosition = selection.end;
            endPosition = selection.start;
        }
        // this.updateInsertPosition(selection, startPosition);
        this.applyParaFormatSelectedContent(startPosition, endPosition, property, value, update);
        // this.startSelectionReLayouting(startPosition.paragraph, selection, startPosition, endPosition);
    };
    Editor.prototype.applyParaFormatSelectedContent = function (start, end, property, value, update) {
        var selection = this.documentHelper.selection;
        if (start.paragraph.isInsideTable && (!end.paragraph.isInsideTable
            || start.paragraph.associatedCell !== end.paragraph.associatedCell
            || selection.isCellSelected(start.paragraph.associatedCell, start, end))) {
            var cell = void 0;
            start.paragraph.associatedCell.ownerTable.combineWidget(this.owner.viewer);
            if (this.checkInsertPosition(selection)) {
                this.updateHistoryPosition(start, true);
            }
            cell = start.paragraph.associatedCell;
            this.applyParaFormatInCell(cell, start, end, property, value, update);
            var table = cell.ownerTable;
            this.documentHelper.layout.layoutBodyWidgetCollection(table.index, table.containerWidget, table, false);
        }
        else {
            if (!isNullOrUndefined(value) && !this.selection.isEmpty && property === 'styleName' && this.applyCharacterStyle(start.paragraph, start, end, property, value, update)) {
                return;
            }
            else {
                this.applyParaFormat(start.paragraph, start, end, property, value, update);
            }
        }
    };
    /**
     * Apply Paragraph format
     *
     * @param {ParagraphWidget} paragraph - Specifies the selection
     * @param {string} property - Specifies the property
     * @param {Object} value - Specifies the value
     * @param {boolean} update - Specifies the update
     * @private
     * @returns {void}
     */
    Editor.prototype.applyParaFormatProperty = function (paragraph, property, value, update) {
        var format = paragraph.paragraphFormat;
        if (update && property === 'leftIndent') {
            value = format.leftIndent + value;
        }
        if (property === 'listFormat' && value instanceof WListFormat) {
            var listFormat = value;
            if (!listFormat.hasValue('listLevelNumber')) {
                listFormat.listLevelNumber = format.listFormat.listLevelNumber;
            }
        }
        if (this.editorHistory && !isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo)) {
            value = this.editorHistory.currentBaseHistoryInfo.addModifiedPropertiesForParagraphFormat(format, property, value);
        }
        if (value instanceof WParagraphFormat) {
            if (isNullOrUndefined(property)) {
                if (this.editorHistory && (this.editorHistory.isUndoing || this.editorHistory.isRedoing)) {
                    this.copyParagraphFormat(value, format);
                }
                else {
                    format.copyFormat(value);
                }
            }
            else if (property === 'listFormat') {
                format.listFormat = value.listFormat;
                format.listFormat.ownerBase = format;
                // this.handleListFormat(format, value as WParagraphFormat);
            }
        }
        if (isNullOrUndefined(value)) {
            format.clearFormat();
            this.documentHelper.layout.reLayoutParagraph(format.ownerBase, 0, 0);
            return;
        }
        if (property === 'afterSpacing') {
            format.afterSpacing = value;
        }
        else if (property === 'beforeSpacing') {
            format.beforeSpacing = value;
        }
        else if (property === 'leftIndent') {
            format.leftIndent = value;
        }
        else if (property === 'lineSpacingType') {
            format.lineSpacingType = value;
        }
        else if (property === 'lineSpacing') {
            format.lineSpacing = value;
        }
        else if (property === 'rightIndent') {
            format.rightIndent = value;
        }
        else if (property === 'firstLineIndent') {
            format.firstLineIndent = value;
        }
        else if (property === 'textAlignment') {
            var textAlignment = value;
            if (format.bidi && !(this.editorHistory.isUndoing || this.editorHistory.isRedoing)) {
                if (textAlignment === 'Left') {
                    textAlignment = 'Right';
                }
                else if (textAlignment === 'Right') {
                    textAlignment = 'Left';
                }
            }
            format.textAlignment = textAlignment;
            //this.documentHelper.layout.allowLayout = false;
        }
        else if (property === 'topBorder') {
            this.applyBorder(format.borders.top, value);
        }
        else if (property === 'bottomBorder') {
            this.applyBorder(format.borders.bottom, value);
        }
        else if (property === 'leftBorder') {
            this.applyBorder(format.borders.left, value);
        }
        else if (property === 'rightBorder') {
            this.applyBorder(format.borders.right, value);
        }
        else if (property === 'horizontalBorder') {
            this.applyBorder(format.borders.horizontal, value);
        }
        else if (property === 'verticalBorder') {
            this.applyBorder(format.borders.vertical, value);
        }
        else if (property === 'borders') {
            format.borders.copyFormat(value);
        }
        else if (property === 'styleName') {
            if (typeof (value) === 'string') {
                value = this.documentHelper.styles.findByName(value);
            }
            format.applyStyle(value);
        }
        else if (property === 'listFormat') {
            if (value instanceof WParagraphFormat) {
                value = value.listFormat;
            }
            format.listFormat.copyFormat(value);
            this.documentHelper.layout.clearListElementBox(format.ownerBase);
            if (format.listFormat.listId >= 0) {
                format.clearIndent();
            }
            this.layoutItemBlock(format.ownerBase, false);
            return;
        }
        else if (property === 'bidi') {
            format.bidi = value;
        }
        else if (property === 'keepWithNext') {
            format.keepWithNext = value;
        }
        else if (property === 'keepLinesTogether') {
            format.keepLinesTogether = value;
        }
        else if (property === 'widowControl') {
            format.widowControl = value;
        }
        else if (property === 'contextualSpacing') {
            format.contextualSpacing = value;
        }
        else if (property === 'spaceAfterAuto') {
            format.spaceAfterAuto = value;
        }
        else if (property === 'spaceBeforeAuto') {
            format.spaceBeforeAuto = value;
        }
    };
    Editor.prototype.copyParagraphFormat = function (sourceFormat, destFormat) {
        destFormat.uniqueParagraphFormat = sourceFormat.uniqueParagraphFormat;
        destFormat.listFormat = sourceFormat.listFormat;
        destFormat.listFormat.ownerBase = destFormat;
        destFormat.baseStyle = sourceFormat.baseStyle;
        //destFormat.borders = sourceFormat.borders;
    };
    /**
     * Copies list level paragraph format
     *
     * @param {WParagraphFormat} oldFormat - Specifies the old format
     * @param {WParagraphFormat} newFormat - Specifies the new format
     * @private
     * @returns {void}
     */
    Editor.prototype.copyFromListLevelParagraphFormat = function (oldFormat, newFormat) {
        if (!isNullOrUndefined(newFormat.leftIndent)) {
            oldFormat.leftIndent = newFormat.leftIndent;
        }
        if (!isNullOrUndefined(newFormat.firstLineIndent)) {
            oldFormat.firstLineIndent = newFormat.firstLineIndent;
        }
    };
    /**
     * Applies the continue numbering from the previous list.
     *
     * @returns {void}
     */
    Editor.prototype.applyContinueNumbering = function () {
        var selection = this.selection;
        if (this.editorHistory) {
            this.editorHistory.initializeHistory('ContinueNumbering');
        }
        this.applyContinueNumberingInternal(selection);
    };
    Editor.prototype.applyContinueNumberingInternal = function (selection) {
        var paragraph = selection.start.paragraph;
        var numberingInfo = this.getContinueNumberingInfo(paragraph);
        var paraFormat = this.getParagraphFormat(paragraph, numberingInfo.listLevelNumber, numberingInfo.listPattern);
        this.changeListId(numberingInfo.currentList, paragraph, paraFormat, numberingInfo.listLevelNumber, numberingInfo.listPattern);
        this.reLayout(selection, false);
        if (this.owner.enableAutoFocus) {
            this.documentHelper.updateFocus();
        }
    };
    Editor.prototype.getContinueNumberingInfo = function (paragraph) {
        var currentList = undefined;
        var listLevelNumber = 0;
        var listPattern = 'None';
        if (!isNullOrUndefined(paragraph.paragraphFormat)
            && !isNullOrUndefined(paragraph.paragraphFormat.listFormat)) {
            currentList = this.documentHelper.getListById(paragraph.paragraphFormat.listFormat.listId);
            listLevelNumber = paragraph.paragraphFormat.listFormat.listLevelNumber;
        }
        var documentHelper = this.documentHelper;
        if (listLevelNumber !== 0 && !isNullOrUndefined(currentList) &&
            !isNullOrUndefined(documentHelper.getAbstractListById(currentList.abstractListId))
            && !isNullOrUndefined(documentHelper.getAbstractListById(currentList.abstractListId).levels[listLevelNumber])) {
            var listLevel = this.documentHelper.layout.getListLevel(currentList, listLevelNumber);
            if (!isNullOrUndefined(listLevel)) {
                listPattern = listLevel.listLevelPattern;
            }
        }
        return {
            currentList: currentList,
            listLevelNumber: listLevelNumber,
            listPattern: listPattern
        };
    };
    /**
     * @private
     * @returns {void}
     */
    Editor.prototype.revertContinueNumbering = function (selection, format) {
        var paragraph = selection.start.paragraph;
        var numberingInfo = this.getContinueNumberingInfo(paragraph);
        this.changeListId(numberingInfo.currentList, paragraph, format, numberingInfo.listLevelNumber, numberingInfo.listPattern);
        this.reLayout(selection, false);
        if (this.editorHistory && !isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo)) {
            this.editorHistory.updateHistory();
        }
    };
    Editor.prototype.changeListId = function (list, block, format, levelNum, listType) {
        if (isNullOrUndefined(block)) {
            return;
        }
        if (block instanceof ParagraphWidget) {
            if (list.listId === block.paragraphFormat.listFormat.listId
                && levelNum === block.paragraphFormat.listFormat.listLevelNumber) {
                if (this.editorHistory) {
                    var baseHistoryInfo = this.editorHistory.currentBaseHistoryInfo;
                    if (!isNullOrUndefined(baseHistoryInfo)) {
                        format = baseHistoryInfo.addModifiedPropertiesForContinueNumbering(block.paragraphFormat, format);
                    }
                }
                block.paragraphFormat.copyFormat(format);
                this.documentHelper.layout.reLayoutParagraph(block, 0, 0);
            }
        }
        return this.changeListId(list, block.nextRenderedWidget, format, levelNum, listType);
    };
    Editor.prototype.getParagraphFormat = function (paragraph, levelNumber, listType) {
        if (!isNullOrUndefined(paragraph.previousRenderedWidget)) {
            if (paragraph.previousRenderedWidget instanceof ParagraphWidget) {
                if (!isNullOrUndefined(paragraph.previousRenderedWidget.paragraphFormat.listFormat)
                    && paragraph.previousRenderedWidget.paragraphFormat.listFormat.listId !== -1) {
                    var listLevel = this.selection.getListLevel(paragraph.previousRenderedWidget);
                    if (levelNumber === 0) {
                        return paragraph.previousRenderedWidget.paragraphFormat;
                    }
                    else if (listType === listLevel.listLevelPattern
                        || this.checkNumberArabic(listType, listLevel.listLevelPattern)) {
                        return paragraph.previousRenderedWidget.paragraphFormat;
                    }
                    else {
                        return this.getParagraphFormat(paragraph.previousRenderedWidget, levelNumber, listType);
                    }
                }
                else {
                    return this.getParagraphFormat(paragraph.previousRenderedWidget, levelNumber, listType);
                }
            }
        }
        return undefined;
    };
    Editor.prototype.checkNumberArabic = function (listType, levelPattern) {
        if ((listType === 'Number' && levelPattern === 'Arabic')
            || (levelPattern === 'Number' && listType === 'Arabic')) {
            return true;
        }
        return false;
    };
    /**
     * @private
     * @returns {void}
     */
    Editor.prototype.applyRestartNumbering = function (selection) {
        if (this.editorHistory) {
            this.editorHistory.initializeHistory('RestartNumbering');
        }
        this.restartListAt(selection);
    };
    /**
     * @private
     * @returns {void}
     */
    Editor.prototype.restartListAt = function (selection) {
        var currentList = selection.paragraphFormat.getList();
        var list = currentList.clone();
        list.listId = this.documentHelper.lists[(this.documentHelper.lists.length - 1)].listId + 1;
        this.documentHelper.lists.push(list);
        var abstractList = currentList.abstractList.clone();
        abstractList.abstractListId = this.documentHelper.abstractLists[(this.documentHelper.abstractLists.length - 1)].abstractListId + 1;
        list.abstractListId = abstractList.abstractListId;
        list.abstractList = abstractList;
        this.documentHelper.abstractLists.push(abstractList);
        this.restartListAtInternal(selection, list.listId);
    };
    /**
     * @private
     * @returns {void}
     */
    Editor.prototype.restartListAtInternal = function (selection, listId) {
        var numberingInfo = this.getContinueNumberingInfo(selection.start.paragraph);
        this.changeRestartNumbering(numberingInfo.currentList, selection.start.paragraph, listId);
        this.reLayout(selection, false);
        this.documentHelper.updateFocus();
    };
    Editor.prototype.changeRestartNumbering = function (list, block, listId) {
        if (isNullOrUndefined(block)) {
            return;
        }
        if (block instanceof ParagraphWidget) {
            if (list.listId === block.paragraphFormat.listFormat.listId) {
                if (this.editorHistory) {
                    var baseHistoryInfo = this.editorHistory.currentBaseHistoryInfo;
                    if (!isNullOrUndefined(baseHistoryInfo)) {
                        listId = baseHistoryInfo.addModifiedPropertiesForRestartNumbering(block.paragraphFormat.listFormat, listId);
                    }
                }
                block.paragraphFormat.listFormat.listId = listId;
                this.documentHelper.layout.reLayoutParagraph(block, 0, 0);
            }
        }
        return this.changeRestartNumbering(list, block.nextRenderedWidget, listId);
    };
    Editor.prototype.applyParaFormat = function (paragraph, start, end, property, value, update) {
        this.setOffsetValue(this.selection);
        paragraph = paragraph.combineWidget(this.owner.viewer);
        //Apply Paragraph Format for spitted paragraph
        this.applyParaFormatProperty(paragraph, property, value, update);
        this.layoutItemBlock(paragraph, false);
        this.getOffsetValue(this.selection);
        if (paragraph.equals(end.paragraph)) {
            return;
        }
        this.getNextParagraphForFormatting(paragraph, start, end, property, value, update);
    };
    Editor.prototype.applyCharacterStyle = function (paragraph, start, end, property, value, update) {
        var paragraphWidget = paragraph.getSplitWidgets();
        var selection = end.owner.selection;
        var lastLine = end.currentWidget;
        var isParaSelected = start.offset === 0 && (selection.isParagraphLastLine(lastLine) && end.currentWidget === lastLine
            && end.offset === selection.getLineLength(lastLine) + 1 || end.isAtParagraphEnd);
        if (!isParaSelected && (end.paragraph === paragraph || paragraphWidget.indexOf(end.paragraph) !== -1)) {
            if (((value.type === 'Paragraph') && ((value.link) instanceof WCharacterStyle)) || (value.type === 'Character')) {
                var obj = (value.type === 'Character') ? value : value.link;
                this.updateSelectionCharacterFormatting(property, obj, update);
                return true;
            }
        }
        return false;
    };
    // Cell
    Editor.prototype.applyParaFormatInCell = function (cell, start, end, property, value, update) {
        var selection = this.documentHelper.selection;
        if (end.paragraph.isInsideTable) {
            var cellContainer = selection.getContainerCellOf(cell, end.paragraph.associatedCell);
            if (cellContainer.ownerTable.contains(end.paragraph.associatedCell)) {
                var startCell = selection.getSelectedCell(cell, cellContainer);
                var endCell = selection.getSelectedCell(end.paragraph.associatedCell, cellContainer);
                if (selection.containsCell(cellContainer, end.paragraph.associatedCell)) {
                    //Selection end is in container cell.
                    if (selection.isCellSelected(cellContainer, start, end)) {
                        value = this.getParaFormatValueInCell(cellContainer, property, value);
                        this.applyParaFormatCellInternal(cellContainer, property, value, update);
                    }
                    else {
                        if (startCell === cellContainer) {
                            this.applyParaFormat(start.paragraph, start, end, property, value, update);
                        }
                        else {
                            this.applyParagraphFormatRow(startCell.ownerRow, start, end, property, value, update);
                        }
                    }
                }
                else {
                    //Format other selected cells in current table.
                    this.applyParaFormatTableCell(cellContainer.ownerTable, cellContainer, endCell, property, value, update);
                }
            }
            else {
                this.applyParagraphFormatRow(cellContainer.ownerRow, start, end, property, value, update);
            }
        }
        else {
            var wCell = selection.getContainerCell(cell);
            this.applyParagraphFormatRow(wCell.ownerRow, start, end, property, value, update);
        }
    };
    Editor.prototype.applyParaFormatCellInternal = function (cell, property, value, update) {
        for (var i = 0; i < cell.childWidgets.length; i++) {
            var block = cell.childWidgets[i];
            if (block instanceof ParagraphWidget) {
                this.applyParaFormatProperty(block, property, value, update);
            }
            else {
                this.applyParagraphFormatTableInternal(block, property, value, update);
            }
        }
    };
    Editor.prototype.getParaFormatValueInCell = function (cell, property, value) {
        if (typeof value === 'boolean') {
            var firstPara = this.documentHelper.selection.getFirstParagraph(cell);
            value = !firstPara.paragraphFormat.getPropertyValue(property);
        }
        return value;
    };
    // Row
    Editor.prototype.applyParagraphFormatRow = function (wRow, start, end, property, value, update) {
        value = this.getParaFormatValueInCell(wRow.childWidgets[0], property, value);
        for (var i = wRow.rowIndex; i < wRow.ownerTable.childWidgets.length; i++) {
            var row = wRow.ownerTable.childWidgets[i];
            for (var j = 0; j < row.childWidgets.length; j++) {
                this.applyParaFormatCellInternal(row.childWidgets[j], property, value, update);
            }
            if (end.paragraph.isInsideTable && this.documentHelper.selection.containsRow(row, end.paragraph.associatedCell)) {
                return;
            }
        }
        this.getNextParagraphForFormatting(wRow.ownerTable, start, end, property, value, update);
    };
    // Table
    Editor.prototype.applyParaFormatTableCell = function (table, startCell, endCell, property, value, update) {
        var selection = this.documentHelper.selection;
        var startValue = selection.getCellLeft(startCell.ownerRow, startCell);
        var endValue = startValue + startCell.cellFormat.cellWidth;
        var endCellLeft = selection.getCellLeft(endCell.ownerRow, endCell);
        var endCellRight = endCellLeft + endCell.cellFormat.cellWidth;
        var cellInfo = this.updateSelectedCellsInTable(startValue, endValue, endCellLeft, endCellRight);
        startValue = cellInfo.start;
        endValue = cellInfo.end;
        var count = table.childWidgets.indexOf(endCell.ownerRow);
        var isStarted = false;
        for (var m = table.childWidgets.indexOf(startCell.ownerRow); m <= count; m++) {
            var row = table.childWidgets[m];
            for (var j = 0; j < row.childWidgets.length; j++) {
                var left = selection.getCellLeft(row, row.childWidgets[j]);
                if (Math.round(startValue) <= Math.round(left) && Math.round(left) < Math.round(endValue)) {
                    if (!isStarted) {
                        value = this.getParaFormatValueInCell(row.childWidgets[j], property, value);
                        isStarted = true;
                    }
                    this.applyParaFormatCellInternal(row.childWidgets[j], property, value, update);
                }
            }
        }
    };
    Editor.prototype.applyParaFormatTable = function (table, start, end, property, value, update) {
        table = table.combineWidget(this.owner.viewer);
        var selection = this.documentHelper.selection;
        for (var m = 0; m < table.childWidgets.length; m++) {
            var tableRow = table.childWidgets[m];
            for (var k = 0; k < tableRow.childWidgets.length; k++) {
                this.applyParaFormatCellInternal(tableRow.childWidgets[k], property, value, update);
            }
            if (end.paragraph.isInsideTable && selection.containsRow(tableRow, end.paragraph.associatedCell)) {
                this.documentHelper.layout.layoutBodyWidgetCollection(table.index, table.containerWidget, table, false);
                return;
            }
        }
        this.documentHelper.layout.layoutBodyWidgetCollection(table.index, table.containerWidget, table, false);
        this.getNextParagraphForFormatting(table, start, end, property, value, update);
    };
    Editor.prototype.getNextParagraphForFormatting = function (block, start, end, property, value, update) {
        var widgetCollection = block.getSplitWidgets();
        block = widgetCollection[widgetCollection.length - 1];
        block = this.documentHelper.selection.getNextRenderedBlock(block);
        if (!isNullOrUndefined(block)) { //Goto the next block.
            if (block instanceof ParagraphWidget) {
                this.applyParaFormat(block, start, end, property, value, update);
            }
            else {
                this.applyParaFormatTable(block, start, end, property, value, update);
            }
        }
    };
    Editor.prototype.applyParagraphFormatTableInternal = function (table, property, value, update) {
        for (var x = 0; x < table.childWidgets.length; x++) {
            var row = table.childWidgets[x];
            for (var y = 0; y < row.childWidgets.length; y++) {
                this.applyParaFormatCellInternal(row.childWidgets[y], property, value, update);
            }
        }
    };
    /**
     * Apply column format changes
     *
     * @param {string} property - Specifies the property
     * @param {Object} value - Specifies the value
     * @private
     * @returns {void}
     */
    Editor.prototype.onApplyColumnFormat = function (property, value) {
        if (this.restrictFormatting) {
            return;
        }
        this.initHistory('SectionFormat');
        var selection = this.documentHelper.selection;
        selection.owner.isShiftingEnabled = true;
        var startPosition = selection.start;
        var endPosition = selection.end;
        if (!selection.isForward) {
            startPosition = selection.end;
            endPosition = selection.start;
        }
        var startPageIndex;
        var endPageIndex;
        this.documentHelper.clearContent();
        var startSectionIndex = startPosition.paragraph.bodyWidget.sectionIndex;
        var endSectionIndex = endPosition.paragraph.bodyWidget.sectionIndex;
        var isMultipleSection = false;
        for (var i = 0; i < this.documentHelper.pages.length; i++) {
            if (this.documentHelper.pages[i].bodyWidgets[0].index === startSectionIndex) {
                startPageIndex = i;
            }
            else {
                isMultipleSection = true;
            }
        }
        for (var i = startPageIndex; i < this.documentHelper.pages.length; i++) {
            var bodyWidget = this.documentHelper.pages[i].bodyWidgets[0];
            endPageIndex = i;
            if ((bodyWidget.index === startSectionIndex)) {
                continue;
            }
            else if ((bodyWidget.index >= startSectionIndex) && bodyWidget.index <= endSectionIndex) {
                continue;
            }
            else {
                endPageIndex = i - 1;
                break;
            }
        }
        if (isMultipleSection && property == "differentOddAndEvenPages" && startPosition.paragraph.isInHeaderFooter) {
            startPageIndex = 0;
            endPageIndex = this.documentHelper.pages.length - 1;
        }
        // let startPageIndex: number = this.documentHelper.pages.indexOf((selection.start.paragraph.containerWidget as BodyWidget).page);
        // let endPageIndex: number = this.documentHelper.pages.indexOf((selection.end.paragraph.containerWidget as BodyWidget).page);
        var update = true;
        var index = 0;
        for (var i = startPageIndex; i <= endPageIndex; i++) {
            if (index !== this.documentHelper.pages[i].bodyWidgets[0].index && !update) {
                update = true;
            }
            this.applyPropertyValueForSection(this.documentHelper.pages[i].bodyWidgets[0].sectionFormat, property, value, update);
            index = this.documentHelper.pages[i].bodyWidgets[0].index;
            update = false;
        }
        this.layoutWholeDocument();
        this.fireContentChange();
    };
    //Paragraph Format apply implementation Ends
    // Apply Selection Section Format Option Implementation Starts
    /**
     * Apply section format selection changes
     *
     * @param {string} property - Specifies the property
     * @param {Object} value - Specifies the value
     * @private
     * @returns {void}
     */
    Editor.prototype.onApplySectionFormat = function (property, value) {
        if (this.restrictFormatting) {
            return;
        }
        if (!isNullOrUndefined(property)) {
            var action = (property[0].toUpperCase() + property.slice(1));
            this.initHistory(action);
        }
        else {
            this.initHistory('SectionFormat');
        }
        this.updateSectionFormat(property, value);
    };
    /**
     *
     * @private
     * @returns {void}
     */
    Editor.prototype.removeInlineHeaderFooterWidget = function (sectionIndex, headerFooterType, propertyName, value) {
        if (sectionIndex != 0) {
            var headerFooters = this.documentHelper.headersFooters[sectionIndex];
            var index = this.viewer.getHeaderFooter(headerFooterType);
            var sectionFormat = this.selection.start.paragraph.containerWidget.sectionFormat.cloneFormat();
            if (!isNullOrUndefined(value)) {
                if (!isNullOrUndefined(propertyName)) {
                    var action = (propertyName[0].toUpperCase() + propertyName.slice(1));
                    this.initHistory(action);
                    var blockInfo = this.selection.getParagraphInfo(this.selection.start);
                    this.selection.editPosition = this.selection.getHierarchicalIndex(blockInfo.paragraph, blockInfo.offset.toString());
                    if (this.checkInsertPosition(this.selection)) {
                        this.setPositionForHistory(this.selection.editPosition);
                    }
                }
                if (value) {
                    if (headerFooters && !isNullOrUndefined(headerFooters[index])) {
                        sectionFormat.removedHeaderFooters.push(headerFooters[index]);
                        this.editorHistory.currentBaseHistoryInfo.addModifiedPropertiesForSection(sectionFormat, propertyName, value);
                        delete headerFooters[index];
                    }
                }
                else {
                    var parentHeaderFooter = this.viewer.getCurrentHeaderFooter(headerFooterType, sectionIndex);
                    if (!isNullOrUndefined(parentHeaderFooter) && isNullOrUndefined(headerFooters[index])) {
                        var HeaderFooterWidget_1 = parentHeaderFooter.clone();
                        headerFooters[index] = HeaderFooterWidget_1;
                        sectionFormat.removedHeaderFooters.push(HeaderFooterWidget_1);
                        this.editorHistory.currentBaseHistoryInfo.addModifiedPropertiesForSection(sectionFormat, propertyName, value);
                    }
                }
                this.selection.updateTextPositionForBlockContainer(this.selection.start.paragraph.containerWidget);
                this.layoutWholeDocument();
                this.fireContentChange();
            }
        }
    };
    /**
     *
     * @private
     * @returns {void}
     */
    Editor.prototype.updateHeaderFooters = function (propertyName, value, sectionIndex, widget) {
        var headerFooters = this.documentHelper.headersFooters[sectionIndex];
        var index = this.viewer.getHeaderFooter(widget.headerFooterType);
        var headerFooter = headerFooters[index];
        if (this.editorHistory.isUndoing || this.editorHistory.isRedoing) {
            if (isNullOrUndefined(headerFooter)) {
                this.documentHelper.headersFooters[sectionIndex][index] = widget;
            }
            else if (!isNullOrUndefined(headerFooter)) {
                delete headerFooters[index];
            }
        }
        this.selection.updateTextPositionForBlockContainer(this.selection.start.paragraph.containerWidget);
        this.layoutWholeDocument();
    };
    /**
     * Update section format
     *
     * @param {string} property - Specifies the property
     * @param {Object} value - Specifies the value
     * @private
     * @returns {void}
     */
    Editor.prototype.updateSectionFormat = function (property, value) {
        if (this.documentHelper.selection.startPage === 1 && property === "differentFirstPage") {
            var paraInfo = void 0;
            if (this.documentHelper.selection.start.paragraph.containerWidget instanceof TableCellWidget) {
                paraInfo = this.getFirstChildOfTable(this.documentHelper.selection.start.paragraph.containerWidget);
            }
            else {
                paraInfo = this.documentHelper.selection.start.paragraph.containerWidget.childWidgets[0];
            }
            var startIndex = this.selection.getHierarchicalIndex(paraInfo, "0");
            this.documentHelper.selection.select(startIndex, startIndex);
        }
        var selection = this.documentHelper.selection;
        selection.owner.isShiftingEnabled = true;
        var startPosition = selection.start;
        var endPosition = selection.end;
        if (!selection.isForward) {
            startPosition = selection.end;
            endPosition = selection.start;
        }
        var startPageIndex;
        var endPageIndex;
        this.documentHelper.clearContent();
        var startSectionIndex = startPosition.paragraph.bodyWidget.sectionIndex;
        var endSectionIndex = endPosition.paragraph.bodyWidget.sectionIndex;
        var isMultipleSection = false;
        var isSkip = false;
        for (var i = 0; i < this.documentHelper.pages.length; i++) {
            for (var j = 0; j < this.documentHelper.pages[i].bodyWidgets.length; j++) {
                if (this.documentHelper.pages[i].bodyWidgets[j].index === startSectionIndex) {
                    startPageIndex = i;
                    if (selection.isForward) {
                        isSkip = true;
                        break;
                    }
                }
                else {
                    isMultipleSection = true;
                }
            }
            if (isSkip) {
                break;
            }
        }
        for (var i = startPageIndex; i < this.documentHelper.pages.length; i++) {
            for (var j = 0; j < this.documentHelper.pages[i].bodyWidgets.length; j++) {
                var bodyWidget = this.documentHelper.pages[i].bodyWidgets[j];
                if ((bodyWidget.index === startSectionIndex)) {
                    endPageIndex = i;
                    continue;
                }
                else if ((bodyWidget.index >= startSectionIndex) && bodyWidget.index <= endSectionIndex) {
                    endPageIndex = i;
                    continue;
                }
            }
        }
        if (isMultipleSection && property == "differentOddAndEvenPages" && startPosition.paragraph.isInHeaderFooter) {
            startPageIndex = 0;
            endPageIndex = this.documentHelper.pages.length - 1;
        }
        // let startPageIndex: number = this.documentHelper.pages.indexOf((selection.start.paragraph.containerWidget as BodyWidget).page);
        // let endPageIndex: number = this.documentHelper.pages.indexOf((selection.end.paragraph.containerWidget as BodyWidget).page);
        var update = true;
        var index = 0;
        for (var i = startPageIndex; i <= endPageIndex; i++) {
            for (var j = 0; j < this.documentHelper.pages[i].bodyWidgets.length; j++) {
                if ((this.documentHelper.pages[i].bodyWidgets[j].index >= startSectionIndex && this.documentHelper.pages[i].bodyWidgets[j].index <= endSectionIndex) ||
                    (!selection.isForward && this.documentHelper.pages[i].bodyWidgets[j].index <= startSectionIndex && this.documentHelper.pages[i].bodyWidgets[j].index >= endSectionIndex)) {
                    if (index !== this.documentHelper.pages[i].bodyWidgets[j].index && !update) {
                        update = true;
                    }
                    this.applyPropertyValueForSection(this.documentHelper.pages[i].bodyWidgets[j].sectionFormat, property, value, update);
                    index = this.documentHelper.pages[i].bodyWidgets[j].index;
                    update = false;
                    var body = this.documentHelper.pages[i].bodyWidgets[j];
                    if (!isNullOrUndefined(body.nextWidget) && (body.sectionFormat.pageHeight !== body.nextWidget.sectionFormat.pageHeight || body.sectionFormat.pageWidth !== body.nextWidget.sectionFormat.pageWidth) && body.nextWidget.sectionFormat.breakCode === 'NoBreak') {
                        body.nextWidget.sectionFormat.breakCode = 'NewPage';
                        body = this.documentHelper.layout.getBodyWidget(body.nextWidget, false);
                        if (!isNullOrUndefined(body.nextWidget)) {
                            body.nextWidget.sectionFormat.breakCode = 'NewPage';
                        }
                    }
                }
            }
        }
        this.layoutWholeDocument();
        this.fireContentChange();
    };
    Editor.prototype.getFirstChildOfTable = function (cellWidget) {
        var ownerTable = cellWidget.ownerTable;
        return ownerTable.childWidgets[0].childWidgets[0].childWidgets[0];
    };
    //Apply Selection Table Format option implementation starts
    /**
     * Apply table format property changes
     *
     * @param {string} property - Specifies the property
     * @param {Object} value - Specifies the value
     * @private
     * @returns {void}
     */
    Editor.prototype.onApplyTableFormat = function (property, value) {
        if (this.restrictFormatting) {
            return;
        }
        var action = this.getTableFormatAction(property);
        this.viewer.owner.isShiftingEnabled = true;
        var selection = this.documentHelper.selection;
        var table = selection.start.paragraph.associatedCell.ownerTable;
        table = table.combineWidget(this.owner.viewer);
        if (selection.isEmpty) {
            this.initHistory(action);
            this.applyTablePropertyValue(selection, property, value, table);
        }
        else {
            this.updateSelectionTableFormat(this.selection, action, value);
        }
        table.calculateGrid();
        this.selection.owner.isLayoutEnabled = true;
        this.documentHelper.layout.reLayoutTable(table);
        this.reLayout(selection, false);
    };
    Editor.prototype.getTableFormatAction = function (property) {
        switch (property) {
            case 'tableAlignment':
                return 'TableAlignment';
            case 'leftIndent':
                return 'TableLeftIndent';
            case 'leftMargin':
                return 'DefaultCellLeftMargin';
            case 'rightMargin':
                return 'DefaultCellRightMargin';
            case 'bottomMargin':
                return 'DefaultCellBottomMargin';
            case 'topMargin':
                return 'DefaultCellTopMargin';
            case 'preferredWidth':
                return 'TablePreferredWidth';
            case 'preferredWidthType':
                return 'TablePreferredWidthType';
            case 'shading':
                return 'Shading';
            case 'bidi':
                return 'TableBidi';
            default:
                return 'DefaultCellSpacing';
        }
    };
    // Apply Selection Row Format Option Implementation Starts
    /**
     * Apply table row format property changes
     *
     * @param {string} property - Specifies the property
     * @param {Object} value - Specifies the value
     * @private
     * @returns {void}
     */
    Editor.prototype.onApplyTableRowFormat = function (property, value) {
        if (this.restrictFormatting) {
            return;
        }
        var action = this.getRowAction(property);
        this.documentHelper.owner.isShiftingEnabled = true;
        var selection = this.documentHelper.selection;
        if (selection.isEmpty) {
            this.initHistory(action);
            var table = selection.start.paragraph.associatedCell.ownerRow.ownerTable;
            this.applyRowPropertyValue(selection, property, value, selection.start.paragraph.associatedCell.ownerRow);
        }
        else {
            this.updateSelectionTableFormat(this.selection, action, value);
        }
        this.reLayout(selection, false);
    };
    Editor.prototype.getRowAction = function (property) {
        switch (property) {
            case 'height':
                return 'RowHeight';
            case 'heightType':
                return 'RowHeightType';
            case 'isHeader':
                return 'RowHeader';
            default:
                return 'AllowBreakAcrossPages';
        }
    };
    /**
     * Apply table cell property changes
     *
     * @param {string} property - Specifies the property
     * @param {Object} value - Specifies the value
     * @private
     * @returns {void}
     */
    Editor.prototype.onApplyTableCellFormat = function (property, value) {
        if (this.restrictFormatting) {
            return;
        }
        var action = this.getTableCellAction(property);
        this.documentHelper.owner.isShiftingEnabled = true;
        var selection = this.documentHelper.selection;
        var table = selection.start.paragraph.associatedCell.ownerTable;
        table = table.combineWidget(this.owner.viewer);
        if (selection.isEmpty) {
            this.initHistory(action);
            this.applyCellPropertyValue(selection, property, value, selection.start.paragraph.associatedCell.cellFormat);
            table.calculateGrid();
            this.selection.owner.isLayoutEnabled = true;
            this.documentHelper.layout.reLayoutTable(table);
        }
        else {
            this.updateSelectionTableFormat(this.selection, action, value);
        }
        this.reLayout(selection, false);
    };
    Editor.prototype.getTableCellAction = function (property) {
        switch (property) {
            case 'verticalAlignment':
                return 'CellContentVerticalAlignment';
            case 'leftMargin':
                return 'CellLeftMargin';
            case 'rightMargin':
                return 'CellRightMargin';
            case 'bottomMargin':
                return 'CellBottomMargin';
            case 'topMargin':
                return 'CellTopMargin';
            case 'preferredWidth':
                return 'CellPreferredWidth';
            case 'shading':
                return 'Shading';
            default:
                return 'CellPreferredWidthType';
        }
    };
    Editor.prototype.applyPropertyValueForSection = function (sectionFormat, property, value, update) {
        //let selection: Selection = this.documentHelper.selection;
        if (update && this.editorHistory && !isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo)) {
            if (property === 'columns') {
                sectionFormat.numberOfColumns = value.length;
            }
            value = this.editorHistory.currentBaseHistoryInfo.addModifiedPropertiesForSection(sectionFormat, property, value);
        }
        if (isNullOrUndefined(value)) {
            return;
        }
        if (value instanceof WSectionFormat) {
            if (isNullOrUndefined(property)) {
                sectionFormat.copyFormat(value, this.editorHistory);
            }
            return;
        }
        if (property === 'pageHeight') {
            sectionFormat.pageHeight = value;
        }
        else if (property === 'pageWidth') {
            sectionFormat.pageWidth = value;
        }
        else if (property === 'leftMargin') {
            sectionFormat.leftMargin = value;
        }
        else if (property === 'rightMargin') {
            sectionFormat.rightMargin = value;
        }
        else if (property === 'topMargin') {
            sectionFormat.topMargin = value;
        }
        else if (property === 'bottomMargin') {
            sectionFormat.bottomMargin = value;
        }
        else if (property === 'differentFirstPage') {
            sectionFormat.differentFirstPage = value;
        }
        else if (property === 'differentOddAndEvenPages') {
            sectionFormat.differentOddAndEvenPages = value;
        }
        else if (property === 'headerDistance') {
            sectionFormat.headerDistance = value;
        }
        else if (property === 'footerDistance') {
            sectionFormat.footerDistance = value;
        }
        else if (property === 'pageStartingNumber') {
            sectionFormat.pageStartingNumber = value;
        }
        else if (property === 'restartPageNumbering') {
            sectionFormat.restartPageNumbering = value;
        }
        else if (property === 'endnoteNumberFormat') {
            sectionFormat.endnoteNumberFormat = value;
        }
        else if (property === 'footNoteNumberFormat') {
            sectionFormat.footNoteNumberFormat = value;
        }
        else if (property === 'restartIndexForEndnotes') {
            sectionFormat.restartIndexForEndnotes = value;
        }
        else if (property === 'restartIndexForFootnotes') {
            sectionFormat.restartIndexForFootnotes = value;
        }
        else if (property === 'initialFootNoteNumber') {
            sectionFormat.initialFootNoteNumber = value;
        }
        else if (property === 'initialEndNoteNumber') {
            sectionFormat.initialEndNoteNumber = value;
        }
        else if (property == 'numberOfColumns') {
            sectionFormat.numberOfColumns = value;
        }
        else if (property == 'equalWidth') {
            sectionFormat.equalWidth = value;
        }
        else if (property == 'lineBetweenColumns') {
            sectionFormat.lineBetweenColumns = value;
        }
        else if (property == 'columns') {
            sectionFormat.columns = value;
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Editor.prototype.layoutWholeDocument = function (isLayoutChanged) {
        this.documentHelper.layout.isInitialLoad = true;
        this.documentHelper.layout.isLayoutWhole = true;
        var startPosition = this.documentHelper.selection.start;
        var endPosition = this.documentHelper.selection.end;
        if (startPosition.isExistAfter(endPosition)) {
            startPosition = this.documentHelper.selection.end;
            endPosition = this.documentHelper.selection.start;
        }
        if (this.owner.layoutType == 'Continuous' && (this.documentHelper.selection.isinEndnote || this.documentHelper.selection.isinFootnote)) {
            this.documentHelper.selection.footnoteReferenceElement(startPosition, endPosition);
            startPosition = endPosition;
        }
        var startInfo = this.selection.getParagraphInfo(startPosition);
        var endInfo = this.selection.getParagraphInfo(endPosition);
        var startIndex = this.selection.getHierarchicalIndex(startInfo.paragraph, startInfo.offset.toString());
        var endIndex = this.selection.getHierarchicalIndex(endInfo.paragraph, endInfo.offset.toString());
        this.documentHelper.renderedLists.clear();
        this.documentHelper.renderedLevelOverrides = [];
        // this.viewer.owner.isLayoutEnabled = true;
        var sections = this.combineSection();
        this.documentHelper.clearContent();
        // this.documentHelper.layout.isRelayout = false;
        this.documentHelper.layout.layoutItems(sections, true);
        // this.documentHelper.layout.isRelayout = true;
        this.documentHelper.owner.isShiftingEnabled = false;
        this.setPositionForCurrentIndex(startPosition, startIndex);
        this.setPositionForCurrentIndex(endPosition, endIndex);
        this.documentHelper.selection.selectPosition(startPosition, endPosition);
        this.reLayout(this.documentHelper.selection, undefined, isLayoutChanged);
        this.documentHelper.layout.isLayoutWhole = false;
        this.documentHelper.layout.isInitialLoad = false;
    };
    Editor.prototype.combineSection = function () {
        var sections = [];
        var nextSection = this.documentHelper.pages[0].bodyWidgets[0];
        do {
            nextSection = this.combineSectionChild(nextSection, sections, false);
        } while (nextSection);
        for (var j = 0; j < this.documentHelper.pages.length; j++) {
            this.documentHelper.pages[j].destroy();
            j--;
        }
        return sections;
    };
    Editor.prototype.combineFollowingSection = function () {
        var sections = [];
        var nextSection = this.documentHelper.selection.start.paragraph.bodyWidget.getSplitWidgets()[0];
        if (nextSection.childWidgets[0] instanceof ParagraphWidget) {
            this.updateWholeListItems(nextSection.childWidgets[0]);
        }
        else {
            var block = this.documentHelper.getFirstParagraphInFirstCell(nextSection.childWidgets[0]);
            this.viewer.owner.editorModule.updateWholeListItems(block);
        }
        var pageIndex = this.documentHelper.pages.indexOf(nextSection.page);
        var startIndex = nextSection.indexInOwner === 0 ? pageIndex : pageIndex + 1;
        do {
            nextSection = this.combineSectionChild(nextSection, sections, false);
        } while (nextSection);
        for (var i = startIndex; i < this.documentHelper.pages.length; i++) {
            this.documentHelper.pages[i].destroy();
            i--;
        }
        for (var j = pageIndex; j < this.documentHelper.pages.length; j++) {
            for (var k = 0; k < this.documentHelper.pages[j].bodyWidgets.length; k++) {
                if (this.documentHelper.pages[j].bodyWidgets[k].childWidgets.length === 0) {
                    this.documentHelper.pages[j].bodyWidgets.splice(k, 1);
                    k--;
                }
            }
        }
        return sections;
    };
    Editor.prototype.combineSectionChild = function (bodyWidget, sections, destoryPage) {
        var previousBodyWidget = bodyWidget;
        var temp = new BodyWidget();
        var emptyBody = false;
        temp.sectionFormat = bodyWidget.sectionFormat;
        temp.index = previousBodyWidget.index;
        do {
            emptyBody = false;
            previousBodyWidget = bodyWidget;
            if (bodyWidget.lastChild) {
                bodyWidget.lastChild.combineWidget(this.owner.viewer);
            }
            bodyWidget = bodyWidget.nextRenderedWidget;
            for (var j = 0; j < previousBodyWidget.childWidgets.length; j++) {
                var block = previousBodyWidget.childWidgets[j];
                if (block instanceof TableWidget) {
                    this.documentHelper.layout.clearTableWidget(block, true, true, true);
                }
                else {
                    block.x = 0;
                    block.y = 0;
                    block.width = 0;
                    block.height = 0;
                }
                temp.childWidgets.push(block);
                previousBodyWidget.childWidgets.splice(j, 1);
                j--;
                block.containerWidget = temp;
            }
            for (var i = 0; i < previousBodyWidget.page.bodyWidgets.length; i++) {
                if (previousBodyWidget.page.bodyWidgets[i].childWidgets.length === 0) {
                    emptyBody = true;
                }
                else {
                    emptyBody = false;
                    break;
                }
            }
            if (emptyBody && destoryPage) {
                previousBodyWidget.page.destroy();
            }
            // this.documentHelper.pages.splice(previousBodyWidget.page.index, 1);
        } while (bodyWidget && previousBodyWidget.index === bodyWidget.index);
        sections.push(temp);
        return bodyWidget;
    };
    Editor.prototype.updateSelectionTableFormat = function (selection, action, value) {
        switch (action) {
            case 'TableAlignment':
                this.editorHistory.initializeHistory('TableAlignment');
                this.updateTableFormat(selection, 'tableAlignment', value);
                break;
            case 'TableLeftIndent':
                this.editorHistory.initializeHistory('TableLeftIndent');
                this.updateTableFormat(selection, 'leftIndent', value);
                break;
            case 'DefaultCellSpacing':
                this.editorHistory.initializeHistory('DefaultCellSpacing');
                this.updateTableFormat(selection, 'cellSpacing', value);
                break;
            case 'DefaultCellLeftMargin':
                this.editorHistory.initializeHistory('DefaultCellLeftMargin');
                this.updateTableFormat(selection, 'leftMargin', value);
                break;
            case 'DefaultCellRightMargin':
                this.editorHistory.initializeHistory('DefaultCellRightMargin');
                this.updateTableFormat(selection, 'rightMargin', value);
                break;
            case 'DefaultCellTopMargin':
                this.editorHistory.initializeHistory('DefaultCellTopMargin');
                this.updateTableFormat(selection, 'topMargin', value);
                break;
            case 'TablePreferredWidth':
                this.editorHistory.initializeHistory('TablePreferredWidth');
                this.updateTableFormat(selection, 'preferredWidth', value);
                break;
            case 'TablePreferredWidthType':
                this.editorHistory.initializeHistory('TablePreferredWidthType');
                this.updateTableFormat(selection, 'preferredWidthType', value);
                break;
            case 'DefaultCellBottomMargin':
                this.editorHistory.initializeHistory('DefaultCellBottomMargin');
                this.updateTableFormat(selection, 'bottomMargin', value);
                break;
            case 'CellContentVerticalAlignment':
                this.editorHistory.initializeHistory('CellContentVerticalAlignment');
                this.updateCellFormat(selection, 'verticalAlignment', value);
                break;
            case 'CellLeftMargin':
                this.editorHistory.initializeHistory('CellLeftMargin');
                this.updateCellFormat(selection, 'leftMargin', value);
                break;
            case 'CellRightMargin':
                this.editorHistory.initializeHistory('CellRightMargin');
                this.updateCellFormat(selection, 'rightMargin', value);
                break;
            case 'CellTopMargin':
                this.editorHistory.initializeHistory('CellTopMargin');
                this.updateCellFormat(selection, 'topMargin', value);
                break;
            case 'CellBottomMargin':
                this.editorHistory.initializeHistory('CellBottomMargin');
                this.updateCellFormat(selection, 'bottomMargin', value);
                break;
            case 'CellPreferredWidth':
                this.editorHistory.initializeHistory('CellPreferredWidth');
                this.updateCellFormat(selection, 'preferredWidth', value);
                break;
            case 'CellPreferredWidthType':
                this.editorHistory.initializeHistory('CellPreferredWidthType');
                this.updateCellFormat(selection, 'preferredWidthType', value);
                break;
            case 'Shading':
                this.editorHistory.initializeHistory('Shading');
                this.updateCellFormat(selection, 'shading', value);
                break;
            case 'RowHeight':
                this.editorHistory.initializeHistory('RowHeight');
                this.updateRowFormat(selection, 'height', value);
                break;
            case 'RowHeightType':
                this.editorHistory.initializeHistory('RowHeightType');
                this.updateRowFormat(selection, 'heightType', value);
                break;
            case 'RowHeader':
                this.editorHistory.initializeHistory('RowHeader');
                this.updateRowFormat(selection, 'isHeader', value);
                break;
            case 'AllowBreakAcrossPages':
                this.editorHistory.initializeHistory('AllowBreakAcrossPages');
                this.updateRowFormat(selection, 'allowBreakAcrossPages', value);
                break;
            case 'TableBidi':
                this.editorHistory.initializeHistory(action);
                this.updateTableFormat(selection, 'bidi', value);
                break;
        }
    };
    // Update Table Properties
    /**
     * Update Table Format on undo
     *
     * @param {Selection} selection - Specifies the selection
     * @param {string} property - Specifies the property
     * @param {Object} value - Specifies the value
     * @private
     * @returns {void}
     */
    Editor.prototype.updateTableFormat = function (selection, property, value) {
        var tableStartPosition = selection.start;
        var tableEndPosition = selection.end;
        if (!selection.isForward) {
            tableStartPosition = selection.end;
            tableEndPosition = selection.start;
        }
        this.initHistoryPosition(selection, tableStartPosition);
        this.applyTablePropertyValue(selection, property, value, tableStartPosition.paragraph.associatedCell.ownerTable);
        if (this.editorHistory && (this.editorHistory.isUndoing || this.editorHistory.isRedoing)) {
            this.documentHelper.layout.reLayoutTable(tableStartPosition.paragraph.associatedCell.ownerTable);
        }
    };
    /**
     * update cell format on undo
     *
     * @param {Selection} selection - Specifies the selection
     * @param {string} property - Specifies the property
     * @param {Object} value - Specifies the value
     * @private
     * @returns {void}
     */
    Editor.prototype.updateCellFormat = function (selection, property, value) {
        selection.owner.isShiftingEnabled = true;
        var newStartPosition = selection.start;
        var newEndPosition = selection.end;
        if (!selection.isForward) {
            newStartPosition = selection.end;
            newEndPosition = selection.start;
        }
        this.initHistoryPosition(selection, newStartPosition);
        this.updateFormatForCell(selection, property, value);
    };
    /**
     * Update row format on undo
     *
     * @param {Selection} selection - Specifies the selection
     * @param {string} property - Specifies the property
     * @param {Object} value - Specifies the value
     * @private
     * @returns {void}
     */
    Editor.prototype.updateRowFormat = function (selection, property, value) {
        var rowStartPosition = selection.start;
        var rowEndPosition = selection.end;
        if (!selection.isForward) {
            rowStartPosition = selection.end;
            rowEndPosition = selection.start;
        }
        this.initHistoryPosition(selection, rowStartPosition);
        this.applyRowFormat(rowStartPosition.paragraph.associatedCell.ownerRow, rowStartPosition, rowEndPosition, property, value);
    };
    Editor.prototype.initHistoryPosition = function (selection, position) {
        if (this.documentHelper.owner.editorHistoryModule && !isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo)) {
            if (!isNullOrUndefined(position)) {
                if (isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo.insertPosition)) {
                    this.editorHistory.currentBaseHistoryInfo.insertPosition = position.getHierarchicalIndexInternal();
                }
            }
            else if (isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo.insertPosition)) {
                this.editorHistory.currentBaseHistoryInfo.insertPosition = selection.start.getHierarchicalIndexInternal();
            }
        }
    };
    Editor.prototype.startSelectionReLayouting = function (paragraph, selection, start, end) {
        selection.owner.isLayoutEnabled = true;
        if (start.paragraph.isInsideTable) {
            var table = start.paragraph.associatedCell.ownerTable;
            while (table.isInsideTable) {
                table = table.associatedCell.ownerTable;
            }
            this.reLayoutSelectionOfTable(table, selection, start, end);
        }
        else {
            this.reLayoutSelection(paragraph, selection, start, end);
        }
    };
    Editor.prototype.reLayoutSelectionOfTable = function (table, selection, start, end) {
        var isEnded = false;
        this.documentHelper.layout.layoutBodyWidgetCollection(table.index, table.containerWidget, table, false);
        // If the selection ends in the current table, need to stop relayouting.
        if (!isNullOrUndefined(end.paragraph.associatedCell) && table.contains(end.paragraph.associatedCell)) {
            return true;
        }
        var block = selection.getNextRenderedBlock(table);
        // Relayout the next block.
        if (!isNullOrUndefined(block)) {
            isEnded = this.reLayoutSelectionOfBlock(block, selection, start, end);
        }
        return isEnded;
    };
    Editor.prototype.reLayoutSelection = function (paragraph, selection, start, end) {
        if (start.paragraph === paragraph) {
            var startOffset = start.offset;
            var length_2 = selection.getParagraphLength(paragraph);
            var indexInInline = 0;
            var index = 0;
            var inlineObj = paragraph.getInline(start.offset, indexInInline);
            var inline = inlineObj.element;
            indexInInline = inlineObj.index;
            if (!isNullOrUndefined(inline)) {
                if (indexInInline === inline.length && !isNullOrUndefined(inline.nextNode)) {
                    inline = inline.nextNode;
                }
                index = inline.line.children.indexOf(inline);
            }
            var lineIndex = 0;
            if (start.currentWidget.paragraph === paragraph) {
                lineIndex = paragraph.childWidgets.indexOf(start.currentWidget);
                index = start.currentWidget.children.indexOf(inline);
            }
            // If selection start inline is at new inline, need to relayout from the previous inline.
            if (inline instanceof TextElementBox && !inline.line && index > 0) {
                this.documentHelper.layout.reLayoutParagraph(paragraph, lineIndex, index - 1);
            }
            else {
                this.documentHelper.layout.reLayoutParagraph(paragraph, lineIndex, index);
            }
        }
        else {
            this.documentHelper.layout.reLayoutParagraph(paragraph, 0, 0);
        }
        // If the selection ends at the current paragraph, need to stop relayouting.
        if (end.paragraph === paragraph) {
            return true;
        }
        // _Relayout the next block.
        var block = selection.getNextRenderedBlock(paragraph);
        if (!isNullOrUndefined(block)) {
            return this.reLayoutSelectionOfBlock(block, selection, start, end);
        }
        return false;
    };
    //Relayouting Start    
    Editor.prototype.reLayoutSelectionOfBlock = function (block, selection, start, end) {
        if (block instanceof ParagraphWidget) {
            return this.reLayoutSelection(block, selection, start, end);
        }
        else {
            return undefined;
            // return this.reLayoutSelectionOfTable(block as TableWidget, selection, start, end);
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Editor.prototype.layoutItemBlock = function (block, shiftNextWidget) {
        var section = undefined;
        if (block.containerWidget instanceof BlockContainer) {
            // let index: number = section.childWidgets.indexOf(block);
            if (!isNullOrUndefined(this.documentHelper.owner)
                && this.documentHelper.owner.isLayoutEnabled) {
                block = block.combineWidget(this.viewer);
                section = block.containerWidget;
                this.documentHelper.layout.layoutBodyWidgetCollection(block.index, section, block, false);
            }
        }
        else if (block.containerWidget instanceof TableCellWidget) {
            var cell = block.containerWidget;
            cell = this.documentHelper.selection.getContainerCell(cell);
            if (!isNullOrUndefined(this.documentHelper.owner)
                && this.documentHelper.owner.isLayoutEnabled) {
                this.documentHelper.layout.reLayoutTable(block);
            }
        }
    };
    /**
     * @private
     * @returns {boolean}
     */
    Editor.prototype.removeSelectedContents = function (selection) {
        return this.removeSelectedContentInternal(selection, selection.start, selection.end);
    };
    Editor.prototype.removeSelectedContentInternal = function (selection, startPosition, endPosition) {
        var startPos = startPosition;
        var endPos = endPosition;
        if (!startPosition.isExistBefore(endPosition)) {
            startPos = endPosition;
            endPos = startPosition;
        }
        if (startPos.paragraph === endPos.paragraph && startPos.paragraph.childWidgets.indexOf(startPos.currentWidget) === startPos.paragraph.childWidgets.length - 1 &&
            startPos.offset === selection.getParagraphLength(startPos.paragraph) && startPos.offset + 1 === endPos.offset) {
            selection.owner.isShiftingEnabled = true;
            selection.selectContent(startPos, true);
            return true;
        }
        var paragraphInfo = this.selection.getParagraphInfo(startPos);
        selection.editPosition = this.selection.getHierarchicalIndex(paragraphInfo.paragraph, paragraphInfo.offset.toString());
        var start = startPos.clone();
        var body = start.paragraph.containerWidget;
        var isFirstLine = start.currentWidget.isFirstLine();
        var isMultipleSectionSelected = this.checkMultipleSectionSelected(start, endPos);
        var isRemoved = this.removeSelectedContent(endPos.paragraph, selection, startPos, endPos);
        var textPosition = new TextPosition(selection.owner);
        if (isMultipleSectionSelected && this.selection.currentPasteAction == "DefaultPaste" && isFirstLine && start.offset < 1) {
            var currentParagraph = start.paragraph;
            var paragraph = new ParagraphWidget();
            var line = new LineWidget(paragraph);
            line.paragraph = paragraph;
            paragraph.containerWidget = body;
            paragraph.childWidgets.push(line);
            body.childWidgets.push(paragraph);
            paragraph.index = currentParagraph.index;
            paragraph.x = start.location.x;
            paragraph.y = start.location.y;
        }
        this.setPositionForCurrentIndex(textPosition, selection.editPosition);
        selection.selectContent(textPosition, true);
        return isRemoved;
    };
    Editor.prototype.checkMultipleSectionSelected = function (start, end) {
        var startSectionIndex = this.getBodyWidgetIndex(start);
        var endSectionIndex = this.getBodyWidgetIndex(end);
        if (startSectionIndex == endSectionIndex) {
            return false;
        }
        return true;
    };
    Editor.prototype.getBodyWidgetIndex = function (textPosition) {
        var position = textPosition.hierarchicalPosition;
        var index = position.indexOf(';');
        var value = position.substring(0, index);
        position = position.substring(index).replace(';', '');
        index = position.indexOf(';');
        value = position.substring(0, index);
        var bodyWidgetIndex = parseInt(value, 10);
        return bodyWidgetIndex;
    };
    Editor.prototype.removeSelectedContent = function (paragraph, selection, start, end) {
        //If end is not table end and start is outside the table, then skip removing the contents and move caret to start position.
        if (end.paragraph.isInsideTable
            && end.paragraph !== this.documentHelper.getLastParagraphInLastCell(end.paragraph.associatedCell.ownerTable)
            && (!start.paragraph.isInsideTable
                || start.paragraph.associatedCell.ownerTable.index !== end.paragraph.associatedCell.ownerTable.index)) {
            return false;
        }
        selection.owner.isShiftingEnabled = true;
        this.deleteSelectedContent(paragraph, selection, start, end, 2);
        return true;
    };
    Editor.prototype.deleteSelectedContent = function (paragraph, selection, start, end, editAction, skipDeletecell) {
        var indexInInline = 0;
        var inlineObj = start.currentWidget.getInline(start.offset, indexInInline);
        var inline = inlineObj.element;
        indexInInline = inlineObj.index;
        // if (!isNullOrUndefined(inline)) {
        //     inline = selection.getNextRenderedInline(inline, indexInInline);
        // }
        // if (inline instanceof WFieldBegin && !isNullOrUndefined((inline as WFieldBegin).fieldEnd)) {
        //     let fieldEndOffset: number = ((inline as WFieldBegin).fieldEnd.owner as WParagraph).getOffset((inline as WFieldBegin).fieldEnd, 1);
        //     let fieldEndIndex: string = WordDocument.getHierarchicalIndexOf((inline as WFieldBegin).fieldEnd.owner as WParagraph, fieldEndOffset.toString());
        //     let selectionEndIndex: string = end.getHierarchicalIndexInternal();
        //     if (!TextPosition.isForwardSelection(fieldEndIndex, selectionEndIndex)) {
        //         //If selection end is after field begin, moves selection start to field separator.
        //         start.moveToInline((inline as WFieldBegin).fieldSeparator, 1);
        //         selection.editPosition = start.getHierarchicalIndexInternal();
        //         if (!isNullOrUndefined(selection.currentBaseHistoryInfo)) {
        //             selection.currentBaseHistoryInfo.insertPosition = selection.editPosition;
        //         }
        //     }
        // }
        indexInInline = 0;
        inlineObj = end.currentWidget.getInline(end.offset, indexInInline);
        inline = inlineObj.element;
        indexInInline = inlineObj.index;
        // if (!isNullOrUndefined(inline)) {
        //     inline = selection.getNextRenderedInline(inline, indexInInline);
        // }
        // if (inline instanceof WFieldEnd && !isNullOrUndefined((inline as WFieldEnd).fieldBegin)) {
        //     let fieldBeginOffset: number = ((inline as WFieldEnd).fieldBegin.owner as WParagraph).getOffset((inline as WFieldEnd).fieldBegin, 0);
        //     let fieldBeginIndex: string = WordDocument.getHierarchicalIndexOf((inline as WFieldEnd).fieldBegin.owner as WParagraph, fieldBeginOffset.toString());
        //     let selectionStartIndex: string = start.getHierarchicalIndexInternal();
        //     if (!TextPosition.isForwardSelection(selectionStartIndex, fieldBeginIndex)) {
        //         //If field begin is before selection start, move selection end to inline item before field end.
        //         let prevInline: WInline = selection.getPreviousTextInline(inline);
        //         if (isNullOrUndefined(prevInline)) {
        //             end.moveBackward();
        //         } else {
        //             end.moveToInline(prevInline, prevInline.length);
        //         }
        //     }
        // }
        // if (inline instanceof FootnoteElementBox) {
        //     this.removeFootnote(inline);
        // }
        if (end.paragraph !== paragraph) {
            this.deleteSelectedContent(end.paragraph, selection, start, end, editAction);
            return;
        }
        //  Selection start in cell.
        if (end.paragraph.isInsideTable && (!start.paragraph.isInsideTable
            || start.paragraph.associatedCell !== end.paragraph.associatedCell
            || (selection.isCellSelected(end.paragraph.associatedCell, start, end) && !skipDeletecell))) {
            end.paragraph.associatedCell.ownerTable.combineWidget(this.owner.viewer);
            this.deleteTableCell(end.paragraph.associatedCell, selection, start, end, editAction);
        }
        else {
            var shiftPara = undefined;
            if (this.owner.viewer instanceof PageLayoutViewer && paragraph.bodyWidget.sectionFormat.numberOfColumns > 1 && paragraph === paragraph.bodyWidget.lastChild && !isNullOrUndefined(paragraph.bodyWidget.nextRenderedWidget) && paragraph.bodyWidget.index !== paragraph.bodyWidget.nextRenderedWidget.index && paragraph.bodyWidget.page === paragraph.bodyWidget.nextRenderedWidget.page) {
                shiftPara = paragraph.nextRenderedWidget;
            }
            this.deletePara(paragraph, start, end, editAction);
            if (this.delBlockContinue && this.delBlock) {
                if (this.delSection) {
                    var bodyWidget = paragraph.bodyWidget instanceof BodyWidget ? paragraph.bodyWidget : undefined;
                    this.deleteSection(selection, this.delSection, bodyWidget, editAction);
                    this.delSection = undefined;
                }
                this.deleteBlock(this.delBlock, selection, start, end, editAction);
                this.delBlockContinue = false;
                this.delBlock = undefined;
            }
            if (this.owner.viewer instanceof PageLayoutViewer && shiftPara !== undefined) {
                this.documentHelper.blockToShift = shiftPara;
            }
        }
    };
    /**
     * Merges the selected cells.
     *
     * @returns {void}
     */
    Editor.prototype.mergeCells = function () {
        if (this.owner.isReadOnlyMode || !this.canEditContentControl || !this.owner.isDocumentLoaded) {
            return;
        }
        if (!isNullOrUndefined(this.documentHelper) && !this.selection.isEmpty) {
            this.mergeSelectedCellsInTable();
        }
    };
    /**
     * Deletes the entire table at selection.
     *
     * @returns {void}
     */
    Editor.prototype.deleteTable = function () {
        if (this.owner.isReadOnlyMode || !this.canEditContentControl) {
            return;
        }
        var startPos = this.selection.isForward ? this.selection.start : this.selection.end;
        if (startPos.paragraph.isInsideTable) {
            var table = this.getOwnerTable(this.selection.isForward).combineWidget(this.owner.viewer);
            this.selection.selectTable();
            var commentStart = [];
            this.selection.owner.isShiftingEnabled = true;
            if (this.checkIsNotRedoing()) {
                commentStart = this.checkAndRemoveComments();
                this.initHistory('DeleteTable');
                //Sets the insert position in history info as current table.    
                this.updateHistoryPosition(startPos, true);
            }
            var considerTrackChanges = true;
            if (!this.skipTracking()) {
                var count = 0;
                for (var i = 0; i < table.childWidgets.length; i++) {
                    var row = table.childWidgets[i];
                    if (row.rowFormat.revisions.length === 1 && row.rowFormat.revisions[0].revisionType === 'Insertion'
                        && row.rowFormat.revisions[0].author === (this.owner.currentUser === '' ? 'Guest user' : this.owner.currentUser)) {
                        this.isRemoveRevision = true;
                        this.unlinkRangeFromRevision(row.rowFormat, true);
                        this.isRemoveRevision = false;
                        if (row.rowFormat.revisions[0].range.length === 0) {
                            row.rowFormat.revisions.splice(0, 1);
                        }
                        count++;
                    }
                }
                if (count === table.childWidgets.length) {
                    considerTrackChanges = false;
                }
            }
            var paragraph = this.getParagraphForSelection(table);
            if (this.editorHistory && this.editorHistory.currentBaseHistoryInfo) {
                this.editorHistory.currentBaseHistoryInfo.removedNodes.push(table.clone());
            }
            if (this.owner.enableTrackChanges && considerTrackChanges) {
                for (var i = 0; i < table.childWidgets.length; i++) {
                    if (i === 0) {
                        var nextCell = table.childWidgets[0];
                        paragraph = this.selection.getFirstParagraph(nextCell);
                    }
                    this.trackRowDeletion(table.childWidgets[i]);
                }
            }
            else {
                this.removeBlock(table);
            }
            this.selection.selectParagraphInternal(paragraph, true);
            if (this.checkIsNotRedoing() || isNullOrUndefined(this.editorHistory)) {
                this.reLayout(this.selection);
                this.updateHistoryForComments(commentStart);
            }
        }
    };
    /**
     * Deletes the selected column(s).
     *
     * @returns {void}
     */
    Editor.prototype.deleteColumn = function () {
        if (this.owner.isReadOnlyMode || !this.canEditContentControl) {
            return;
        }
        if (this.owner.enableTrackChanges) {
            var locale = new L10n('documenteditor', this.owner.defaultLocale);
            locale.setLocale(this.owner.locale);
            this.alertDialog = DialogUtility.alert({
                title: locale.getConstant('UnTrack'),
                content: locale.getConstant('Merge Track'),
                showCloseIcon: true,
                okButton: {
                    text: 'Ok', click: this.onDeleteColumnConfirmed.bind(this)
                },
                closeOnEscape: true,
                position: { X: 'center', Y: 'center' },
                animationSettings: { effect: 'Zoom' }
            });
            this.alertDialog.enableRtl = this.owner.enableRtl;
        }
        else {
            this.onDeleteColumnConfirmed();
        }
    };
    Editor.prototype.onDeleteColumnConfirmed = function () {
        var startPos = this.selection.isForward ? this.selection.start : this.selection.end;
        var endPos = this.selection.isForward ? this.selection.end : this.selection.start;
        if (startPos.paragraph.isInsideTable) {
            this.selection.selectColumn();
            var commentStart = [];
            this.selection.owner.isShiftingEnabled = true;
            if (this.checkIsNotRedoing()) {
                commentStart = this.checkAndRemoveComments();
                this.initHistory('DeleteColumn');
            }
            var startCell = this.getOwnerCell(this.selection.isForward);
            var endCell = this.getOwnerCell(!this.selection.isForward);
            var table = startCell.ownerTable.combineWidget(this.owner.viewer);
            if (this.editorHistory && this.editorHistory.currentBaseHistoryInfo) {
                this.cloneTableToHistoryInfo(table);
            }
            var paragraph = undefined;
            if (endCell.nextWidget) {
                var nextCell = endCell.nextWidget;
                paragraph = this.selection.getFirstParagraph(nextCell);
            }
            else if (startCell.previousWidget) {
                var previousCell = startCell.previousWidget;
                paragraph = this.selection.getFirstParagraph(previousCell);
            }
            if (isNullOrUndefined(paragraph)) {
                paragraph = this.getParagraphForSelection(table);
            }
            //retrieve the cell collection based on start and end cell to remove. 
            var deleteCells = table.getColumnCellsForSelection(startCell, endCell);
            for (var i = 0; i < table.childWidgets.length; i++) {
                var row = table.childWidgets[i];
                if (row.childWidgets.length === 1) {
                    if (deleteCells.indexOf(row.childWidgets[0]) >= 0) {
                        this.removeFieldInWidget(row.childWidgets[0], true);
                        table.childWidgets.splice(table.childWidgets.indexOf(row), 1);
                        row.destroy();
                        i--;
                    }
                }
                else {
                    for (var j = 0; j < row.childWidgets.length; j++) {
                        var tableCell = row.childWidgets[j];
                        if (deleteCells.indexOf(tableCell) >= 0) {
                            this.removeFieldInWidget(tableCell, true);
                            row.childWidgets.splice(j, 1);
                            tableCell.destroy();
                            j--;
                        }
                    }
                    if (row.childWidgets.length === 0) {
                        table.childWidgets.splice(table.childWidgets.indexOf(row), 1);
                        row.destroy();
                        i--;
                    }
                }
            }
            if (table.childWidgets.length === 0) {
                // Before disposing table reset the paragrph.
                paragraph = this.getParagraphForSelection(table);
                this.removeBlock(table);
                if (this.editorHistory && this.editorHistory.currentBaseHistoryInfo) {
                    this.editorHistory.currentBaseHistoryInfo.action = 'DeleteTable';
                }
                table.destroy();
            }
            else {
                this.updateTable(table);
            }
            this.selection.selectParagraphInternal(paragraph, true);
            if (isNullOrUndefined(this.editorHistory) || this.checkIsNotRedoing()) {
                this.reLayout(this.selection, true);
                this.updateHistoryForComments(commentStart);
            }
            if (!isNullOrUndefined(this.alertDialog)) {
                this.alertDialog.close();
                this.alertDialog = undefined;
            }
        }
    };
    /**
     * Deletes the selected row(s).
     *
     * @returns {void}
     */
    Editor.prototype.deleteRow = function () {
        if (this.owner.isReadOnlyMode || !this.canEditContentControl) {
            return;
        }
        var startPos = !this.selection.isForward ? this.selection.end : this.selection.start;
        var endPos = !this.selection.isForward ? this.selection.start : this.selection.end;
        var blockInfo = this.selection.getParagraphInfo(startPos);
        var startIndex = this.selection.getHierarchicalIndex(blockInfo.paragraph, blockInfo.offset.toString());
        if (startPos.paragraph.isInsideTable) {
            var startCell = this.getOwnerCell(this.selection.isForward);
            var endCell = this.getOwnerCell(!this.selection.isForward);
            this.selection.selectRow();
            var commentStart = [];
            if (this.checkIsNotRedoing()) {
                commentStart = this.checkAndRemoveComments();
                this.initHistory('DeleteRow');
            }
            this.selection.owner.isShiftingEnabled = true;
            var table = startCell.ownerTable.combineWidget(this.owner.viewer);
            var row = this.getOwnerRow(true);
            if (this.editorHistory && this.editorHistory.currentBaseHistoryInfo) {
                this.cloneTableToHistoryInfo(table);
            }
            var paragraph = undefined;
            if (row.nextWidget) {
                var nextCell = row.nextWidget.childWidgets[0];
                paragraph = this.selection.getFirstParagraph(nextCell);
            }
            if (isNullOrUndefined(paragraph)) {
                paragraph = this.getParagraphForSelection(table);
            }
            startPos = startPos.clone();
            if (!this.selection.isEmpty) {
                var containerCell = this.selection.getContainerCellOf(startCell, endCell);
                if (containerCell.ownerTable.contains(endCell)) {
                    startCell = this.selection.getSelectedCell(startCell, containerCell);
                    endCell = this.selection.getSelectedCell(endCell, containerCell);
                    if (this.selection.containsCell(containerCell, endCell)) {
                        row = startCell.ownerRow;
                        this.removeRow(row);
                    }
                    else {
                        row = startCell.ownerRow;
                        var endRow = endCell.ownerRow;
                        //Update the selection paragraph.
                        paragraph = undefined;
                        if (endRow.nextWidget) {
                            var nextCell = endRow.nextWidget.childWidgets[0];
                            paragraph = this.selection.getFirstParagraph(nextCell);
                        }
                        if (isNullOrUndefined(paragraph)) {
                            paragraph = this.getParagraphForSelection(table);
                        }
                        for (var i = 0; i < table.childWidgets.length; i++) {
                            var tableRow = table.childWidgets[i];
                            if (tableRow.rowIndex >= row.rowIndex && tableRow.rowIndex <= endRow.rowIndex) {
                                if (this.owner.enableTrackChanges && this.checkIsNotRedoing()) {
                                    this.trackRowDeletion(tableRow, true, false);
                                }
                                else {
                                    this.removeFieldInBlock(tableRow, true);
                                    table.childWidgets.splice(i, 1);
                                    tableRow.destroy();
                                    i--;
                                }
                            }
                        }
                        if (table.childWidgets.length === 0) {
                            this.removeBlock(table);
                            if (this.editorHistory && this.editorHistory.currentBaseHistoryInfo) {
                                this.editorHistory.currentBaseHistoryInfo.action = 'DeleteTable';
                            }
                            table.destroy();
                        }
                        else {
                            this.updateTable(table);
                        }
                    }
                }
            }
            else {
                if (this.owner.enableTrackChanges) {
                    this.trackRowDeletion(row, true, false);
                }
                else {
                    this.removeRow(row);
                }
            }
            if (!this.owner.enableTrackChanges || isNullOrUndefined(table.childWidgets)) {
                this.selection.selectParagraphInternal(paragraph, true);
            }
            else {
                var textPosition = this.selection.getTextPosBasedOnLogicalIndex(startIndex);
                this.selection.selectContent(textPosition, true);
                // this.selection.start.setPositionInternal(startPos);
                // this.selection.end.setPositionInternal(this.selection.start);
            }
            if (isNullOrUndefined(this.editorHistory) || this.checkIsNotRedoing()) {
                this.reLayout(this.selection, true);
                this.updateHistoryForComments(commentStart);
            }
        }
    };
    Editor.prototype.trackRowDeletion = function (row, canremoveRow, updateHistory) {
        var rowFormat = row.rowFormat;
        if (!isNullOrUndefined(rowFormat)) {
            var canInsertRevision = true;
            if (rowFormat.revisions.length > 0) {
                var revision = this.retrieveRevisionInOder(rowFormat);
                if (revision.revisionType === 'Insertion') {
                    if (this.isRevisionMatched(rowFormat, undefined)) {
                        if (isNullOrUndefined(canremoveRow) || canremoveRow) {
                            this.removeRow(row);
                        }
                        else {
                            this.removeRevisionsInRow(row);
                        }
                        return true;
                    }
                }
                else if (revision.revisionType === 'Deletion') {
                    this.unlinkWholeRangeInRevision(rowFormat, revision);
                }
            }
            if (canInsertRevision) {
                if ((isNullOrUndefined(updateHistory) || updateHistory) && this.editorHistory && this.editorHistory.currentBaseHistoryInfo) {
                    this.editorHistory.currentBaseHistoryInfo.action = 'RemoveRowTrack';
                }
                this.insertRevision(rowFormat, 'Deletion');
            }
            for (var i = 0; i < row.childWidgets.length; i++) {
                var cellWidget = row.childWidgets[i];
                for (var j = 0; j < cellWidget.childWidgets.length; j++) {
                    if (cellWidget.childWidgets[j] instanceof TableWidget) {
                        this.trackInnerTable(cellWidget.childWidgets[i], canremoveRow, updateHistory);
                    }
                    else {
                        var paraWidget = cellWidget.childWidgets[j];
                        // We used this boolean since for table tracking we should add removed nodes only for entire table not for every elements in the table
                        this.skipTableElements = true;
                        this.insertRevisionForBlock(paraWidget, 'Deletion', undefined, undefined, true);
                        this.skipTableElements = false;
                    }
                }
            }
        }
        return false;
    };
    Editor.prototype.trackInnerTable = function (tableWidget, canremoveRow, updateHistory) {
        for (var i = 0; i < tableWidget.childWidgets.length; i++) {
            this.trackRowDeletion(tableWidget.childWidgets[i], canremoveRow, updateHistory);
        }
    };
    Editor.prototype.returnDeleteRevision = function (revisions) {
        for (var i = 0; i < revisions.length; i++) {
            if (revisions[i].revisionType === 'Deletion') {
                return revisions[i];
            }
        }
        return undefined;
    };
    Editor.prototype.removeRow = function (row) {
        var table = row.ownerTable;
        if (row.rowFormat.revisions.length > 0) {
            this.removeRevisionsInRow(row);
        }
        if (table.childWidgets.length === 1) {
            this.removeBlock(table);
            if (this.editorHistory && this.editorHistory.currentBaseHistoryInfo) {
                this.editorHistory.currentBaseHistoryInfo.action = 'Delete';
            }
            table.destroy();
        }
        else {
            this.removeFieldInBlock(row, true);
            table.childWidgets.splice(table.childWidgets.indexOf(row), 1);
            row.destroy();
            this.updateTable(table);
        }
    };
    /**
     * @private
     * @param {TableWidget} table Specifies the table widget
     * @returns {void}
     */
    Editor.prototype.updateTable = function (table) {
        table = table.combineWidget(this.viewer);
        table.updateRowIndex(0);
        table.isGridUpdated = false;
        table.buildTableColumns();
        table.isGridUpdated = true;
        this.documentHelper.layout.reLayoutTable(table);
    };
    Editor.prototype.getParagraphForSelection = function (table) {
        var paragraph = undefined;
        var nextWidget = table.nextWidget ? table.nextWidget : table.nextRenderedWidget;
        var previousWidget = table.previousWidget ? table.previousWidget : table.previousRenderedWidget;
        if (nextWidget) {
            paragraph = nextWidget instanceof ParagraphWidget ? nextWidget
                : this.documentHelper.getFirstParagraphInFirstCell(nextWidget);
        }
        else if (previousWidget) {
            paragraph = previousWidget instanceof ParagraphWidget ? previousWidget
                : this.documentHelper.getLastParagraphInLastCell(previousWidget);
        }
        return paragraph;
    };
    Editor.prototype.deletePara = function (paragraph, start, end, editAction) {
        paragraph = paragraph.combineWidget(this.owner.viewer);
        var selection = this.documentHelper.selection;
        var paragraphStart = selection.getStartOffset(paragraph);
        var endParagraphStartOffset = selection.getStartOffset(end.paragraph);
        var startOffset = paragraphStart;
        var endOffset = 0;
        var isCombineNextParagraph = false;
        var lastLinelength = this.selection.getLineLength(paragraph.lastChild);
        var currentParagraph = paragraph;
        var section = paragraph.bodyWidget instanceof BodyWidget ? paragraph.bodyWidget : undefined;
        var startLine = undefined;
        var endLineWidget = undefined;
        var isCombineLastBlock = this.combineLastBlock;
        var tempStartOffset;
        if (paragraph === start.paragraph) {
            startOffset = start.offset;
            startLine = start.currentWidget;
            tempStartOffset = startOffset;
            if ((startOffset + 1 === this.documentHelper.selection.getLineLength(paragraph.lastChild))) {
                startOffset++;
            }
            if (end.paragraph.isInsideTable) {
                isCombineNextParagraph = this.isEndInAdjacentTable(paragraph, end.paragraph);
            }
            if (!isCombineNextParagraph) {
                isCombineNextParagraph = this.combineLastBlock;
            }
            this.combineLastBlock = false;
        }
        else {
            startLine = paragraph.firstChild;
        }
        if (paragraph !== start.paragraph && selection.isSkipLayouting) {
            selection.isSkipLayouting = false;
        }
        if (paragraph === end.paragraph) {
            endLineWidget = end.currentWidget;
            endOffset = end.offset;
        }
        else {
            endLineWidget = paragraph.lastChild;
            endOffset = this.documentHelper.selection.getLineLength(paragraph.lastChild);
        }
        // If previous widget is splitted paragraph, combine paragraph widget.
        var block = (!isNullOrUndefined(paragraph.previousRenderedWidget) && start.paragraph !== paragraph) ?
            paragraph.previousRenderedWidget.combineWidget(this.documentHelper.viewer) : undefined;
        if (startOffset > paragraphStart && start.currentWidget === paragraph.lastChild &&
            startOffset === lastLinelength && (paragraph === end.paragraph && end.offset === startOffset + 1 ||
            paragraph.nextRenderedWidget === end.paragraph && end.offset === endParagraphStartOffset) ||
            (this.editorHistory && this.editorHistory.isUndoing && this.editorHistory.currentHistoryInfo &&
                this.editorHistory.currentHistoryInfo.action === 'PageBreak' && block && block.isPageBreak()
                && (startOffset === 0 && !start.currentWidget.isFirstLine || startOffset > 0)) ||
            start.paragraph !== end.paragraph && editAction === 2 && start.paragraph === paragraph && start.paragraph.nextWidget === end.paragraph) {
            isCombineNextParagraph = true;
        }
        if ((tempStartOffset + 1 === this.documentHelper.selection.getLineLength(paragraph.lastChild))) {
            startOffset--;
        }
        var paraEnd = end.clone();
        paraEnd.offset = paraEnd.offset - 1;
        var paraReplace = (start.paragraph === paragraph && start.isAtParagraphStart && paraEnd.isAtParagraphEnd &&
            this.editorHistory && !isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo)
            && this.editorHistory.currentBaseHistoryInfo.action === 'Insert');
        if (paraReplace) {
            this.editorHistory.currentBaseHistoryInfo.action = 'InsertTextParaReplace';
        }
        var isStartParagraph = start.paragraph === paragraph;
        if (end.paragraph === paragraph && end.currentWidget !== paragraph.lastChild ||
            (end.currentWidget === paragraph.lastChild && end.offset <= selection.getLineLength(paragraph.lastChild)) || paraReplace) {
            if (end.currentWidget.isFirstLine() && end.offset > paragraphStart || !end.currentWidget.isFirstLine() || paraReplace) {
                //If selection end with this paragraph and selection doesnot include paragraph mark.               
                this.removeInlines(paragraph, startLine, startOffset, endLineWidget, endOffset, editAction);
                //Removes the splitted paragraph.
            }
            if (!isNullOrUndefined(block) && !isStartParagraph && !paraReplace) {
                this.delBlockContinue = true;
                this.delBlock = block;
                var nextSection = block.bodyWidget instanceof BodyWidget ? block.bodyWidget : undefined;
                if (nextSection && !section.equals(nextSection) && section.index !== nextSection.index) {
                    this.delSection = nextSection;
                }
                else {
                    this.delSection = undefined;
                }
            }
            else {
                this.delBlockContinue = false;
                this.delBlock = undefined;
            }
        }
        else if (start.paragraph === paragraph && (start.currentWidget !== paragraph.firstChild ||
            (start.currentWidget === paragraph.firstChild && startOffset > paragraphStart))) {
            // If selection start is after paragraph start
            //And selection does not end with this paragraph Or selection include paragraph mark.
            this.delBlockContinue = false;
            this.delBlock = undefined;
            if (editAction === 4) {
                return;
            }
            else {
                if (this.skipTracking() && this.editorHistory.currentBaseHistoryInfo.action === 'ParaMarkTrack') {
                    this.addRemovedNodes(paragraph.characterFormat.cloneFormat());
                    if (paragraph.characterFormat.revisions.length > 0) {
                        this.unlinkRangeFromRevision(paragraph.characterFormat, true);
                    }
                    paragraph.characterFormat.revisions = [];
                }
                else {
                    if (this.owner.enableTrackChanges && !this.skipTracking() && this.editorHistory.currentBaseHistoryInfo.action !== 'TOC' && this.editorHistory.currentBaseHistoryInfo.action !== 'Reject Change') {
                        if (isCombineNextParagraph) {
                            currentParagraph = this.splitParagraph(paragraph, paragraph.firstChild, 0, startLine, startOffset, true);
                            this.deleteParagraphMark(currentParagraph, selection, editAction, true);
                            this.addRemovedNodes(paragraph);
                        }
                        else {
                            this.removeInlines(paragraph, startLine, startOffset, endLineWidget, endOffset, editAction);
                        }
                    }
                    else {
                        if (!start.currentWidget.isFirstLine() && paragraph.lastChild === end.currentWidget) {
                            this.removeInlines(paragraph, startLine, startOffset, endLineWidget, endOffset, editAction);
                        }
                        else {
                            currentParagraph = this.splitParagraph(paragraph, paragraph.firstChild, 0, startLine, startOffset, true);
                            this.insertParagraphPaste(paragraph, currentParagraph, start, end, isCombineNextParagraph, editAction, isCombineLastBlock);
                            this.removeRevisionForBlock(paragraph, undefined, false, true);
                            this.addRemovedNodes(paragraph);
                        }
                    }
                }
                return;
            }
        }
        else {
            if (end.paragraph === paragraph && end.paragraph.isInsideTable && (start.currentWidget.isFirstLine() && start.offset > selection.getStartOffset(start.paragraph) || !start.currentWidget.isFirstLine()) &&
                end.offset >= selection.getLineLength(end.paragraph.lastChild) && end.paragraph.nextRenderedWidget) {
                this.combineLastBlock = true;
            }
            var newParagraph = undefined;
            var previousBlock = paragraph.previousWidget;
            var prevParagraph = (previousBlock instanceof ParagraphWidget) ? previousBlock : undefined;
            var nextWidget = paragraph.nextRenderedWidget;
            if (editAction < 4) {
                //Checks whether this is last paragraph of owner text body and previousBlock is not paragraph.
                if (this.owner.enableTrackChanges && !this.skipTracking() && this.editorHistory.currentBaseHistoryInfo && this.editorHistory.currentBaseHistoryInfo.action !== 'TOC') {
                    var removedNodeLength = -1;
                    if (this.editorHistory.currentBaseHistoryInfo) {
                        removedNodeLength = this.editorHistory.currentBaseHistoryInfo.removedNodes.length;
                    }
                    this.insertRevisionForBlock(paragraph, 'Deletion');
                    if (paragraph.isEmpty()
                        && !(!isNullOrUndefined(paragraph.previousWidget) && paragraph.previousWidget instanceof ParagraphWidget
                            && (paragraph.previousWidget.characterFormat.revisions.length === 0 ||
                                (paragraph.previousWidget.characterFormat.revisions.length > 0
                                    && paragraph.previousWidget.characterFormat.revisions[0].author !== (this.owner.currentUser === '' ? 'Guest' : this.owner.currentUser))))
                        && !(end.paragraph.previousRenderedWidget instanceof TableWidget)) {
                        newParagraph = this.checkAndInsertBlock(paragraph, start, end, editAction, prevParagraph);
                        this.removeBlock(paragraph);
                        if (removedNodeLength === -1) {
                            this.addRemovedNodes(paragraph);
                        }
                        else {
                            this.editorHistory.currentBaseHistoryInfo.removedNodes.splice(removedNodeLength, 0, paragraph);
                        }
                        this.removeRevisionForBlock(paragraph, undefined, false, true);
                    }
                    else {
                        // On deleting para, para items may be added with delete revisions so we need to ensure whether it can be combined with prev/ next para.
                        this.combineRevisionWithBlocks(paragraph.firstChild.children[0]);
                    }
                    if (paragraph === end.paragraph && paragraph.containerWidget && this.editorHistory.currentBaseHistoryInfo.action === 'Delete' && !this.isInsertingTOC) {
                        var paraInfo = this.selection.getParagraphInfo(end);
                        this.selection.editPosition = this.selection.getHierarchicalIndex(paraInfo.paragraph, paraInfo.offset.toString());
                    }
                    if (start.paragraph !== paragraph && !isNullOrUndefined(block)) {
                        this.delBlockContinue = true;
                        this.delBlock = block;
                        return;
                    }
                }
                else {
                    //this.documentHelper.comments;
                    var foot = void 0;
                    /*  if (!isNullOrUndefined(selection.start.paragraph.bodyWidget.page.footnoteWidget)) {
                          foot = selection.start.paragraph.bodyWidget.page.footnoteWidget;
                      }else if (!isNullOrUndefined(selection.start.paragraph.bodyWidget.page.endnoteWidget)) {
                          foot = selection.start.paragraph.bodyWidget.page.endnoteWidget;
                      }*/
                    newParagraph = this.checkAndInsertBlock(paragraph, start, end, editAction, prevParagraph);
                    this.removeRevisionForBlock(paragraph, undefined, false, true);
                    this.addRemovedNodes(paragraph);
                    if (!isNullOrUndefined(block) && !isStartParagraph && !paraReplace) {
                        this.delBlock = block;
                        var nextSection = block.bodyWidget instanceof BodyWidget ? block.bodyWidget : undefined;
                        if (nextSection && section.index !== nextSection.index) {
                            var bodyWidget = paragraph.bodyWidget instanceof BodyWidget ? paragraph.bodyWidget : undefined;
                            this.deleteSection(selection, nextSection, bodyWidget, editAction);
                        }
                    }
                    this.removeBlock(paragraph);
                    /* let widget: IWidget;
                     for(let i:number =0;i< foot.childWidgets.length; i++) {
                     widget = foot.childWidgets[i];
                     if (widget instanceof ParagraphWidget) {
 
                     let para: ParagraphWidget = widget;
                     if (!isNullOrUndefined(para)) {
                         this.removeBlock(para);
                     }}}*/
                }
                if (this.documentHelper.blockToShift === paragraph) {
                    this.documentHelper.blockToShift = undefined;
                }
                if (!isNullOrUndefined(newParagraph)) {
                    selection.editPosition = this.selection.getHierarchicalIndex(newParagraph, '0');
                    var offset = selection.getParagraphLength(newParagraph) + 1;
                    if (this.editorHistory && !isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo)) {
                        this.editorHistory.currentBaseHistoryInfo.endPosition = this.selection.getHierarchicalIndex(newParagraph, offset.toString());
                    }
                }
                else if (paragraph === start.paragraph && (isNullOrUndefined(nextWidget) || (!isNullOrUndefined(nextWidget) && !isNullOrUndefined(section) && section.index !== nextWidget.bodyWidget.index)) && !isNullOrUndefined(prevParagraph)) {
                    var offset = this.selection.getParagraphLength(prevParagraph);
                    // if (isNullOrUndefined(block)) {
                    selection.editPosition = this.selection.getHierarchicalIndex(prevParagraph, offset.toString());
                    if (this.editorHistory && !isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo)) {
                        this.updateHistoryPosition(selection.editPosition, true);
                        this.editorHistory.currentBaseHistoryInfo.endPosition = selection.editPosition;
                    }
                    // } else {
                    //     let offset: number = selection.getParagraphLength(paragraph) + 1;
                    //     if (block instanceof ParagraphWidget) {
                    //         prevParagraph = block as ParagraphWidget;
                    //     }
                    //     // if (block instanceof WTable) {
                    //     //     prevParagraph = (block as WTable).getFirstParagraphInFirstCell();
                    //     // }
                    //     selection.editPosition = prevLineWidget.getHierarchicalIndex('0');
                    // }
                }
            }
            if (start.paragraph !== paragraph && !isNullOrUndefined(block)) {
                this.delBlockContinue = true;
                this.delBlock = block;
            }
            else {
                this.delBlockContinue = false;
                this.delBlock = undefined;
            }
        }
        this.insertParagraphPaste(paragraph, currentParagraph, start, end, isCombineNextParagraph, editAction, isCombineLastBlock);
    };
    Editor.prototype.deleteSection = function (selection, section, nextSection, editAction) {
        if (editAction < 4) {
            this.combineSectionInternal(selection, section, nextSection);
        }
        //Copies the section properties, if this is last paragraph of section.
        if (editAction > 2) {
            section.sectionFormat.copyFormat(nextSection.sectionFormat);
        }
    };
    Editor.prototype.combineSectionInternal = function (selection, section, nextSection) {
        // if (section.sectionFormat.isEqualFormat(nextSection.sectionFormat)) {
        // } else {
        var bodyWidget = section.getSplitWidgets()[0];
        var currentSection = [];
        var previousY = bodyWidget.y;
        this.combineSectionChild(bodyWidget, currentSection, true);
        bodyWidget = currentSection[0];
        var lastBlockIndex = bodyWidget.lastChild.index;
        this.updateBlockIndex(lastBlockIndex + 1, nextSection.firstChild);
        var insertIndex = 0;
        var containerWidget = nextSection;
        containerWidget.y = previousY;
        for (var i = 0; i < bodyWidget.childWidgets.length; i++) {
            var block = bodyWidget.childWidgets.splice(i, 1)[0];
            containerWidget.childWidgets.splice(insertIndex, 0, block);
            block.containerWidget = containerWidget;
            this.documentHelper.layout.layoutBodyWidgetCollection(block.index, block.bodyWidget, block, false);
            block = block.getSplitWidgets().pop();
            containerWidget = block.containerWidget;
            insertIndex = block.indexInOwner + 1;
            i--;
        }
        if (this.documentHelper.headersFooters[bodyWidget.sectionIndex]) {
            bodyWidget.removedHeaderFooters = [];
            var headerFooters = this.documentHelper.headersFooters.splice(bodyWidget.sectionIndex, 1)[0];
            var keys = Object.keys(headerFooters);
            for (var i = 0; i < keys.length; i++) {
                var headerWidgetIn = headerFooters[keys[i]];
                //if (headerWidgetIn.page) {
                this.removeFieldInWidget(headerWidgetIn);
                // Remove content control
                this.removeFieldInWidget(headerWidgetIn, false, true);
                //}
                headerWidgetIn.page = undefined;
            }
            bodyWidget.removedHeaderFooters.push(headerFooters);
        }
        this.updateSectionIndex(undefined, nextSection, false);
        this.addRemovedNodes(bodyWidget);
        this.documentHelper.removeEmptyPages();
        if (this.editorHistory && this.editorHistory.isUndoing) {
            nextSection.sectionFormat = section.sectionFormat;
        }
        // }
    };
    /* eslint-disable max-len */
    Editor.prototype.checkAndInsertBlock = function (block, start, end, editAction, previousParagraph) {
        if (block instanceof ParagraphWidget && block === start.paragraph || block instanceof TableWidget) {
            var newParagraph = void 0; //Adds an empty paragraph, to ensure minimal content.
            if (isNullOrUndefined(block.nextWidget) && (isNullOrUndefined(previousParagraph) || previousParagraph.nextRenderedWidget instanceof TableWidget)) {
                newParagraph = new ParagraphWidget();
                if (editAction === 1 && block instanceof ParagraphWidget && !isNullOrUndefined(block.paragraphFormat.baseStyle) && block.paragraphFormat.baseStyle.name === 'Normal') {
                    newParagraph.characterFormat.copyFormat(block.characterFormat);
                    newParagraph.paragraphFormat.copyFormat(block.paragraphFormat);
                }
                newParagraph.index = block.index + 1;
                newParagraph.containerWidget = block.containerWidget;
                if (block instanceof ParagraphWidget) {
                    newParagraph.paragraphFormat.lineSpacing = block.paragraphFormat.lineSpacing;
                    newParagraph.paragraphFormat.lineSpacingType = block.paragraphFormat.lineSpacingType;
                    var style = this.documentHelper.styles.findByName('Normal');
                    if (!isNullOrUndefined(style)) {
                        newParagraph.paragraphFormat.baseStyle = new WParagraphStyle();
                        newParagraph.paragraphFormat.baseStyle.copyStyle(style);
                    }
                }
                this.documentHelper.layout.layoutBodyWidgetCollection(newParagraph.index, newParagraph.bodyWidget, newParagraph, false);
                if (block.containerWidget instanceof Widget) {
                    block.containerWidget.childWidgets.push(newParagraph);
                }
            }
            return newParagraph;
        }
        return undefined;
    };
    Editor.prototype.splitParagraph = function (paragraphAdv, startLine, startOffset, endLine, endOffset, removeBlock) {
        var paragraph = new ParagraphWidget();
        paragraph.paragraphFormat = new WParagraphFormat(paragraph);
        paragraph.characterFormat = new WCharacterFormat(paragraph);
        paragraph.paragraphFormat.copyFormat(paragraphAdv.paragraphFormat);
        paragraph.characterFormat.copyFormat(paragraphAdv.characterFormat);
        var lineWidget = new LineWidget(paragraph);
        paragraph.childWidgets.push(lineWidget);
        var blockIndex = paragraphAdv.index;
        var insertIndex = paragraphAdv.indexInOwner;
        this.moveInlines(paragraphAdv, paragraph, 0, startOffset, startLine, endOffset, endLine, removeBlock);
        if (paragraphAdv.containerWidget.childWidgets[insertIndex]) {
            var line = (paragraphAdv.containerWidget.childWidgets[insertIndex]);
            for (var i = 0; i < line.childWidgets.length; i++) {
                var linewid = line.childWidgets[i];
                for (var j = 0; j < linewid.children.length; j++) {
                    var inline = linewid.children[j];
                    if (inline instanceof FootnoteElementBox) {
                        this.removeFootnote(inline);
                    }
                }
            }
        }
        //Inserts new paragraph in the current text position.
        paragraphAdv.containerWidget.childWidgets.splice(insertIndex, 0, paragraph);
        paragraph.index = blockIndex;
        paragraph.containerWidget = paragraphAdv.containerWidget;
        this.updateNextBlocksIndex(paragraph, true);
        if (removeBlock) {
            this.removeBlock(paragraphAdv);
        }
        this.documentHelper.layout.layoutBodyWidgetCollection(blockIndex, paragraph.containerWidget, paragraph, false);
        return paragraph;
    };
    Editor.prototype.removeCommentsInBlock = function (block) {
        if (block instanceof TableWidget) {
            for (var i = 0; i < block.childWidgets.length; i++) {
                var row = block.childWidgets[i];
                for (var j = 0; j < row.childWidgets.length; j++) {
                    var cell = row.childWidgets[j];
                    for (var k = 0; k < cell.childWidgets.length; k++) {
                        var block_1 = cell.childWidgets[k];
                        this.removeCommentsInBlock(block_1);
                    }
                }
            }
        }
        else {
            this.removeCommentInPara(block);
        }
    };
    Editor.prototype.removeCommentInPara = function (block) {
        for (var i = 0; i < block.childWidgets.length; i++) {
            var lineWidget = block.childWidgets[i];
            //Iterate through each line widgets.
            for (var j = 0; j < lineWidget.children.length; j++) {
                this.removeCommentsInline(lineWidget.children[j]);
            }
        }
    };
    Editor.prototype.removeCommentsInline = function (inline) {
        if (inline instanceof CommentCharacterElementBox) {
            if (inline.commentType === 1) {
                // if (!inline.comment.isReply) {
                //     for (let i: number = 0; i < inline.comment.replyComments.length; i++) {
                //         this.removeCommentsInline(inline.comment.replyComments[i].commentEnd);
                //     }
                // }
                // if (inline.comment.commentStart && inline.comment.commentStart.commentMark) {
                //     inline.comment.commentStart.removeCommentMark();
                // }
                // if (!inline.comment.isReply && this.documentHelper.comments.indexOf(inline.comment) >= 0
                //     || inline.comment.isReply && this.documentHelper.comments.indexOf(inline.comment.ownerComment) >= 0) {
                //     this.deleteCommentWidget(inline.comment);
                // }
            }
            else {
                inline.removeCommentMark();
            }
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Editor.prototype.removeBlock = function (block, isSkipShifting, skipElementRemoval) {
        var index;
        var blockCollection;
        var containerWidget;
        if (!skipElementRemoval) {
            this.removeFieldInBlock(block);
            this.removeFieldInBlock(block, true);
            this.removeFieldInBlock(block, undefined, true);
            this.removeCommentsInBlock(block);
        }
        if (block.isInsideTable) {
            containerWidget = block.associatedCell;
            index = block.associatedCell.childWidgets.indexOf(block);
            blockCollection = block.associatedCell.childWidgets;
            this.updateNextBlocksIndex(block, false);
            block.associatedCell.childWidgets.splice(index, 1);
            block.containerWidget = undefined;
            this.documentHelper.layout.layoutBodyWidgetCollection(block.index, containerWidget, block, false);
        }
        else {
            containerWidget = block.containerWidget;
            for (var i = 0; i < block.childWidgets.length; i++) {
                var isSkipTracking = void 0;
                if (!this.isPasteRevertAction()) {
                    isSkipTracking = this.skipTracking();
                }
                if (block.childWidgets[i] instanceof TableRowWidget && !isSkipTracking) {
                    var tableDelete = block.childWidgets[i];
                    this.removeDeletedCellRevision(tableDelete);
                }
                if (block.childWidgets[i] instanceof LineWidget) {
                    var line = block.childWidgets[i];
                    for (var j = 0; j < line.children.length; j++) {
                        var element = line.children[j];
                        if (element instanceof FootnoteElementBox && !this.selection.isEmpty) {
                            this.removeFootnote(element);
                        }
                    }
                }
            }
            index = containerWidget.childWidgets.indexOf(block);
            blockCollection = containerWidget.childWidgets;
            this.updateNextBlocksIndex(block, false);
            containerWidget.childWidgets.splice(index, 1);
            block.containerWidget = undefined;
            containerWidget.height -= block.height;
            if (!isNullOrUndefined(containerWidget.containerWidget) && containerWidget.containerWidget instanceof FootNoteWidget) {
                containerWidget.containerWidget.height -= block.height;
            }
            this.documentHelper.layout.layoutBodyWidgetCollection(block.index, containerWidget, block, false, isSkipShifting);
        }
    };
    Editor.prototype.removePrevParaMarkRevision = function (currentBlock, isFromDelete) {
        isFromDelete = isNullOrUndefined(isFromDelete) ? false : isFromDelete;
        if (this.owner.enableTrackChanges || currentBlock.characterFormat.revisions.length != 0) {
            var currentPara = currentBlock;
            var rangeIndex = -1;
            var revision = void 0;
            var nonEmptyEndPara = currentPara;
            if (!isFromDelete && !isNullOrUndefined(nonEmptyEndPara.previousRenderedWidget)) {
                nonEmptyEndPara = nonEmptyEndPara.previousRenderedWidget;
            }
            if (nonEmptyEndPara.characterFormat.revisions.length > 0) {
                revision = nonEmptyEndPara.characterFormat.revisions[nonEmptyEndPara.characterFormat.revisions.length - 1];
                rangeIndex = revision.range.indexOf(nonEmptyEndPara.characterFormat);
            }
            if (rangeIndex >= 0 && !isNullOrUndefined(revision)) {
                var lastRange = revision.range[rangeIndex];
                var isParaMark = lastRange instanceof WCharacterFormat;
                if (isParaMark) {
                    revision.range.splice(rangeIndex, 1);
                    this.owner.trackChangesPane.updateCurrentTrackChanges(revision);
                    if (nonEmptyEndPara.characterFormat && nonEmptyEndPara.characterFormat.revisions.indexOf(revision) > -1) {
                        nonEmptyEndPara.characterFormat.revisions.splice(nonEmptyEndPara.characterFormat.revisions.indexOf(revision), 1);
                    }
                    if (revision.range.length == 0) {
                        this.owner.revisionsInternal.remove(revision);
                    }
                }
            }
        }
    };
    Editor.prototype.isPasteRevertAction = function () {
        if (!isNullOrUndefined(this.editorHistory) && this.editorHistory.currentBaseHistoryInfo && this.editorHistory.currentBaseHistoryInfo.action === 'Paste') {
            return true;
        }
        return false;
    };
    Editor.prototype.toCheckForTrack = function (block) {
        if (this.owner.enableTrackChanges && !this.skipTracking()) {
            if (block instanceof TableWidget && block.childWidgets.length > 0) {
                var rowFormat = block.childWidgets[0].rowFormat;
                if ((rowFormat.revisions.length > 0 && rowFormat.revisions[0].revisionType !== 'Insertion'
                    && rowFormat.revisions[0].author === (this.owner.currentUser === '' ? 'Guest user' : this.owner.currentUser))
                    || (rowFormat.revisions.length === 0)) {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * @private
     */
    Editor.prototype.removeFootnote = function (element, paragraph) {
        if (element.paragraph.bodyWidget.page.footnoteWidget) {
            var footnoteWidget = element.paragraph.bodyWidget.page.footnoteWidget;
            for (var j = 0; j < footnoteWidget.bodyWidgets.length; j++) {
                if (element === (footnoteWidget.bodyWidgets[j]).footNoteReference) {
                    footnoteWidget.height -= footnoteWidget.bodyWidgets[j].childWidgets[0].height;
                    if (this.owner.enableTrackChanges) {
                        for (var i = 0; i < footnoteWidget.bodyWidgets[j].childWidgets.length; i++) {
                            this.removeRevisionForBlock(footnoteWidget.bodyWidgets[j].childWidgets[i], undefined, false, true);
                        }
                    }
                    footnoteWidget.bodyWidgets.splice(j, 1);
                    j--;
                    this.isFootnoteElementRemoved = true;
                }
            }
            if (footnoteWidget.bodyWidgets.length === 0) {
                element.paragraph.bodyWidget.page.footnoteWidget = undefined;
            }
        }
        this.documentHelper.footnoteCollection.splice(this.documentHelper.footnoteCollection.indexOf(element), 1);
        this.updateFootNoteIndex();
    };
    Editor.prototype.removeEndnote = function (element, paragraph) {
        var lastpage = this.documentHelper.pages.length;
        var bodyWidget = this.documentHelper.pages[lastpage - 1].bodyWidgets[0];
        if (bodyWidget.page.endnoteWidget) {
            var endnoteWidget = bodyWidget.page.endnoteWidget;
            for (var j = 0; j < endnoteWidget.bodyWidgets.length; j++) {
                if (element === (endnoteWidget.bodyWidgets[j]).footNoteReference) {
                    endnoteWidget.height -= endnoteWidget.bodyWidgets[j].childWidgets[0].height;
                    endnoteWidget.bodyWidgets.splice(j, 1);
                    this.isEndnoteElementRemoved = true;
                    j--;
                }
            }
            if (endnoteWidget.bodyWidgets.length === 0) {
                bodyWidget.page.endnoteWidget = undefined;
            }
        }
        this.documentHelper.endnoteCollection.splice(this.documentHelper.endnoteCollection.indexOf(element), 1);
        this.updateEndNoteIndex();
    };
    Editor.prototype.removeAutoShape = function (inline) {
        var shapeIndex = inline.line.paragraph.floatingElements.indexOf(inline);
        var floatingElementIndex = inline.line.paragraph.bodyWidget.floatingElements.indexOf(inline);
        if (floatingElementIndex > -1) {
            inline.line.paragraph.bodyWidget.floatingElements.splice(floatingElementIndex, 1);
        }
        inline.line.paragraph.floatingElements.splice(shapeIndex, 1);
    };
    /**
     * @private
     * @returns {void}
     */
    Editor.prototype.removeField = function (block, isBookmark, isContentControl) {
        var collection = this.documentHelper.fields;
        if (isBookmark) {
            collection = this.documentHelper.bookmarks.keys;
        }
        else if (isContentControl) {
            collection = this.documentHelper.contentControlCollection;
        }
        if (block.floatingElements.length > 0) {
            for (var z = 0; z < block.floatingElements.length; z++) {
                var inline = block.floatingElements[z];
                this.removeAutoShape(inline);
            }
        }
        for (var i = 0; i < collection.length; i++) {
            var element = isBookmark ?
                this.documentHelper.bookmarks.get(collection[i]) : collection[i];
            if (element.line.paragraph === block || (element instanceof BookmarkElementBox && !isNullOrUndefined(element.reference) && element.reference.line.paragraph === block)) {
                if (isBookmark) {
                    this.documentHelper.bookmarks.remove(collection[i]);
                    element.line.children.splice(element.indexInOwner, 1);
                    if (!isNullOrUndefined(element.line.paragraph.associatedCell)) {
                        var cell = element.line.paragraph.associatedCell;
                        cell.isRenderBookmarkStart ? cell.isRenderBookmarkStart = false : cell.isRenderBookmarkEnd = false;
                    }
                    var endBookMarkElement = element.reference;
                    if (endBookMarkElement) {
                        endBookMarkElement.line.children.splice(endBookMarkElement.indexInOwner, 1);
                    }
                    if (endBookMarkElement && !isNullOrUndefined(endBookMarkElement.line.paragraph.associatedCell)) {
                        var cell = endBookMarkElement.line.paragraph.associatedCell;
                        cell.isRenderBookmarkStart ? cell.isRenderBookmarkStart = false : cell.isRenderBookmarkEnd = false;
                    }
                }
                else if (isContentControl) {
                    this.documentHelper.contentControlCollection.splice(i, 1);
                }
                else {
                    this.documentHelper.fields.splice(i, 1);
                    if (this.documentHelper.formFields.indexOf(element) !== -1) {
                        this.documentHelper.formFields.splice(this.documentHelper.formFields.indexOf(element), 1);
                    }
                }
                i--;
            }
        }
        if (this.documentHelper.footnoteCollection.length > 0) {
            for (var i = 0; i < this.documentHelper.footnoteCollection.length; i++) {
                var element = this.documentHelper.footnoteCollection[i];
                if (element.line.paragraph === block) {
                    if (element.paragraph.bodyWidget.page.footnoteWidget) {
                        var footnote = element.paragraph.bodyWidget.page.footnoteWidget;
                        for (var j = 0; j < footnote.bodyWidgets.length; j++) {
                            if (element === (footnote.bodyWidgets[j]).footNoteReference) {
                                footnote.height -= (footnote.bodyWidgets[j]).height;
                                footnote.bodyWidgets.splice(j, 1);
                                j--;
                            }
                        }
                        if (footnote.bodyWidgets.length === 0) {
                            element.paragraph.bodyWidget.page.footnoteWidget = undefined;
                        }
                    }
                    this.documentHelper.footnoteCollection.splice(i, 1);
                    i--;
                }
            }
        }
        if (this.documentHelper.endnoteCollection.length > 0) {
            for (var i = 0; i < this.documentHelper.endnoteCollection.length; i++) {
                var element = this.documentHelper.endnoteCollection[i];
                if (element.line.paragraph === block) {
                    if (element.paragraph.bodyWidget.page.endnoteWidget) {
                        var endnote = element.paragraph.bodyWidget.page.endnoteWidget;
                        for (var j = 0; j < endnote.bodyWidgets.length; j++) {
                            if (element === (endnote.bodyWidgets[j]).footNoteReference) {
                                endnote.height -= (endnote.bodyWidgets[j]).height;
                                endnote.bodyWidgets.splice(j, 1);
                                j--;
                            }
                        }
                        if (endnote.bodyWidgets.length === 0) {
                            element.paragraph.bodyWidget.page.endnoteWidget = undefined;
                        }
                    }
                    this.documentHelper.endnoteCollection.splice(i, 1);
                    i--;
                }
            }
        }
    };
    /**
     * @private
     * @param {IWidget} node Specifies the node.
     * @returns {void}
     */
    Editor.prototype.addRemovedNodes = function (node, isInsertBefore) {
        if (node instanceof CommentCharacterElementBox && node.commentType === 0 && node.commentMark) {
            node.removeCommentMark();
        }
        if (node instanceof ContentControl && node.type === 0) {
            this.documentHelper.contentControlCollection.splice(this.documentHelper.contentControlCollection.indexOf(node), 1);
        }
        if (node instanceof FieldElementBox && node.fieldType === 0) {
            if (this.documentHelper.fields.indexOf(node) !== -1) {
                this.documentHelper.fields.splice(this.documentHelper.fields.indexOf(node), 1);
            }
            if (this.documentHelper.formFields.indexOf(node) !== -1) {
                this.documentHelper.formFields.splice(this.documentHelper.formFields.indexOf(node), 1);
            }
        }
        if (this.editorHistory && !isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo)) {
            if (isInsertBefore) {
                this.editorHistory.currentBaseHistoryInfo.removedNodes.splice(0, 0, node);
            }
            else {
                this.editorHistory.currentBaseHistoryInfo.removedNodes.push(node);
            }
        }
        else if (this.editHyperlinkInternal) {
            this.nodes.push(node);
        }
    };
    Editor.prototype.deleteBlock = function (block, selection, start, end, editAction) {
        if (block instanceof ParagraphWidget) {
            this.deletePara(block, start, end, editAction);
            if (this.delBlockContinue && this.delBlock) {
                if (this.delSection) {
                    var bodyWidget = block.bodyWidget instanceof BodyWidget ? block.bodyWidget : undefined;
                    this.deleteSection(selection, this.delSection, bodyWidget, editAction);
                    this.delSection = undefined;
                }
                if (this.delBlock.indexInOwner !== -1) {
                    this.deleteBlock(this.delBlock, selection, start, end, editAction);
                }
                this.delBlockContinue = false;
                this.delBlock = undefined;
            }
        }
        else {
            this.deleteTableBlock(block, selection, start, end, editAction);
        }
    };
    Editor.prototype.deleteTableCell = function (cellAdv, selection, start, end, editAction) {
        var deletePreviousBlock = !(start.paragraph.isInsideTable && cellAdv.ownerTable.contains(start.paragraph.associatedCell));
        var previousBlock = cellAdv.ownerTable.previousRenderedWidget;
        if (start.paragraph.isInsideTable) {
            var containerCell = selection.getContainerCellOf(cellAdv, start.paragraph.associatedCell);
            if (containerCell.ownerTable.contains(start.paragraph.associatedCell)) {
                var startCell = selection.getSelectedCell(cellAdv, containerCell);
                var endCell = selection.getSelectedCell(start.paragraph.associatedCell, containerCell);
                if (selection.containsCell(containerCell, start.paragraph.associatedCell)) {
                    //Selection end is in container cell.
                    if (selection.isCellSelected(containerCell, start, end)) {
                        //Container cell is completely selected.
                        this.updateEditPosition(containerCell, selection);
                        if (editAction === 1) {
                            //Specifically handled for backspace. Delete selected cell in current table.
                            this.deleteCellsInTable(cellAdv.ownerRow.ownerTable, selection, start, end, editAction);
                        }
                        else {
                            //Delete contents within table cell or Copy contents within table cell to clipboard.
                            var isCellCleared = this.deleteCell(containerCell, selection, editAction, true);
                            if (!isCellCleared && editAction !== 2 && this.editorHistory) {
                                this.editorHistory.currentBaseHistoryInfo = undefined;
                            }
                            else if (isCellCleared) {
                                this.documentHelper.layout.reLayoutTable(containerCell.ownerRow.ownerTable);
                            }
                        }
                    }
                    else {
                        if (startCell === containerCell) {
                            this.deletePara(end.paragraph, start, end, editAction);
                            if (this.delBlockContinue && this.delBlock) {
                                if (this.delSection) {
                                    var para = end.paragraph;
                                    var bodyWidget = para.bodyWidget instanceof BodyWidget ? para.bodyWidget : undefined;
                                    this.deleteSection(selection, this.delSection, bodyWidget, editAction);
                                    this.delSection = undefined;
                                }
                                this.deleteBlock(this.delBlock, selection, start, end, editAction);
                                this.delBlockContinue = false;
                                this.delBlock = undefined;
                            }
                        }
                        else {
                            this.deleteContainer(startCell, selection, start, end, editAction);
                        }
                    }
                }
                else {
                    if (editAction === 2) {
                        //Delete contents within table cell.
                        this.deleteCell(cellAdv, selection, 2, false);
                    }
                    else {
                        //Delete other selected cells in current table.
                        this.deleteCellsInTable(containerCell.ownerTable, selection, start, end, editAction);
                    }
                }
            }
            else {
                //Selection end is different table.
                this.deleteContainer(containerCell, selection, start, end, editAction);
            }
        }
        else {
            //Selection end is outside table.
            var cell = selection.getContainerCell(cellAdv);
            this.deleteContainer(cell, selection, start, end, editAction);
        }
        if (deletePreviousBlock) {
            var sectionAdv = previousBlock.bodyWidget instanceof BodyWidget ? previousBlock.bodyWidget : undefined;
            // this.deleteContent(cellAdv.ownerTable, selection, editAction);
            if (!isNullOrUndefined(previousBlock)) {
                // let nextSection: WSection = blockAdv.section instanceof WSection ? blockAdv.section as WSection : undefined;
                // if (sectionAdv !== nextSection) {
                //     this.deleteSection(selection, sectionAdv, nextSection, editAction);
                // }
                //Goto the next block.
                this.deleteBlock(previousBlock, selection, start, end, editAction);
            }
        }
    };
    Editor.prototype.deleteCellsInTable = function (table, selection, start, end, editAction, endCells) {
        var clonedTable = undefined;
        var action = 'Delete';
        var isDeleteCells = false;
        var startCell = start.paragraph.associatedCell;
        var endCell = end.paragraph.associatedCell;
        if (!isNullOrUndefined(endCells)) {
            endCell = endCells;
        }
        if (this.editorHistory && !isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo)) {
            action = this.editorHistory.currentBaseHistoryInfo.action;
            isDeleteCells = this.editorHistory.currentBaseHistoryInfo.action === 'BackSpace' || this.editorHistory.currentBaseHistoryInfo.action === 'DeleteCells'
                || this.editorHistory.currentBaseHistoryInfo.action === 'InsertTable' || this.editorHistory.currentBaseHistoryInfo.action === 'RemoveRowTrack' || (isNullOrUndefined(startCell.ownerRow.previousWidget)
                && isNullOrUndefined(endCell.ownerRow.nextWidget) && this.editorHistory.currentBaseHistoryInfo.action === 'Cut');
            clonedTable = this.cloneTableToHistoryInfo(table);
            if (this.editorHistory.currentBaseHistoryInfo.action === 'RemoveRowTrack') {
                return;
            }
            this.editorHistory.currentBaseHistoryInfo.action = isDeleteCells ? 'DeleteCells' : 'ClearCells';
            selection.owner.isLayoutEnabled = false;
        }
        var startColumnIndex = startCell.columnIndex;
        var endColumnIndex = endCell.columnIndex + endCell.cellFormat.columnSpan - 1;
        var startRowIndex = startCell.rowIndex;
        var endRowIndex = endCell.rowIndex;
        //let cells: TableCellWidget[] = [];
        var isRowSelected = this.isWholeRowSelected(startCell.ownerRow, startColumnIndex, endColumnIndex);
        if (this.owner.enableTrackChanges && !this.skipTracking()) {
            if (!isRowSelected) {
                var localizeValue = new L10n('documenteditor', this.owner.defaultLocale);
                var tiltle = localizeValue.getConstant('UnTrack');
                var content = localizeValue.getConstant('Merge Track');
                localizeValue.setLocale(this.owner.locale);
                this.alertDialog = DialogUtility.alert({
                    title: tiltle,
                    content: content,
                    showCloseIcon: true,
                    okButton: {
                        text: 'Ok', click: this.onConfirmedTableCellsDeletion.bind(this, table, selection, startRowIndex, endRowIndex, startColumnIndex, endColumnIndex, isDeleteCells, editAction, isRowSelected, action)
                    },
                    closeOnEscape: true, position: { X: 'center', Y: 'center' },
                    animationSettings: { effect: 'Zoom' }
                });
                this.alertDialog.enableRtl = this.owner.enableRtl;
            }
            else {
                this.onConfirmedTableCellsDeletion(table, selection, startRowIndex, endRowIndex, startColumnIndex, endColumnIndex, isDeleteCells, editAction, isRowSelected, action);
            }
        }
        else {
            this.onConfirmedTableCellsDeletion(table, selection, startRowIndex, endRowIndex, startColumnIndex, endColumnIndex, isDeleteCells, editAction, isRowSelected, action);
        }
    };
    /**
     * @private
     */
    Editor.prototype.removeDeletedCellRevision = function (row) {
        if (row.rowFormat.revisions.length > 0) {
            this.unlinkRangeFromRevision(row.rowFormat, true);
        }
        for (var i = 0; i < row.childWidgets.length; i++) {
            var cellWidget = row.childWidgets[i];
            for (var j = 0; j < cellWidget.childWidgets.length; j++) {
                var paraWidget = cellWidget.childWidgets[j];
                if (!isNullOrUndefined(paraWidget) && paraWidget instanceof ParagraphWidget) {
                    for (var lineIndex = 0; lineIndex < paraWidget.childWidgets.length; lineIndex++) {
                        var lineWidget = paraWidget.childWidgets[lineIndex];
                        if (!isNullOrUndefined(lineWidget.children)) {
                            for (var elementIndex = 0; elementIndex < lineWidget.children.length; elementIndex++) {
                                var element = lineWidget.children[elementIndex];
                                if (element.revisions.length > 0) {
                                    this.unlinkRangeFromRevision(element, true);
                                }
                            }
                        }
                    }
                    this.unlinkRangeFromRevision(paraWidget.characterFormat, true);
                }
            }
        }
    };
    Editor.prototype.onConfirmedTableCellsDeletion = function (table, selection, startRowIndex, endRowIndex, startColumnIndex, endColumnIndex, isDeleteCells, editAction, isRowSelected, action) {
        for (var i = 0; i < table.childWidgets.length; i++) {
            var row = table.childWidgets[i];
            var canRemoveRow = false;
            if (row.index >= startRowIndex && row.index <= endRowIndex) {
                if (this.owner.enableTrackChanges && !this.skipTracking()) {
                    if (isRowSelected) {
                        canRemoveRow = this.trackRowDeletion(row, false);
                        if (canRemoveRow) {
                            this.onConfirmedCellDeletion(row, selection, startRowIndex, endRowIndex, startColumnIndex, endColumnIndex, isDeleteCells, editAction);
                        }
                    }
                    else {
                        this.onConfirmedCellDeletion(row, selection, startRowIndex, endRowIndex, startColumnIndex, endColumnIndex, isDeleteCells, editAction);
                    }
                }
                else {
                    this.onConfirmedCellDeletion(row, selection, startRowIndex, endRowIndex, startColumnIndex, endColumnIndex, isDeleteCells, editAction);
                }
            }
            if (!canRemoveRow && row.childWidgets.length === 0) {
                var rowToRemove = table.childWidgets[i];
                var prevRenderedRow = rowToRemove.previousRenderedWidget;
                while (!isNullOrUndefined(prevRenderedRow)) {
                    for (var k = 0; k < prevRenderedRow.childWidgets.length; k++) {
                        var cell = prevRenderedRow.childWidgets[k];
                        if (rowToRemove.rowIndex < cell.ownerRow.rowIndex + cell.cellFormat.rowSpan) {
                            cell.cellFormat.rowSpan--;
                        }
                    }
                    prevRenderedRow = prevRenderedRow.previousRenderedWidget;
                }
                this.updateNextBlocksIndex(rowToRemove, false);
                table.childWidgets.splice(i, 1);
                i--;
                endRowIndex--;
            }
        }
        //Layouts the table after delete cells.
        selection.owner.isLayoutEnabled = true;
        if (table.childWidgets.length === 0) {
            selection.editPosition = this.selection.getHierarchicalIndex(table, '0');
            this.setActionInternal(selection, action);
            this.removeBlock(table);
        }
        else {
            // Before lay outing need to update table grid.
            table.isGridUpdated = false;
            table.buildTableColumns();
            table.isGridUpdated = true;
            this.documentHelper.layout.reLayoutTable(table);
        }
        if (!isNullOrUndefined(this.alertDialog)) {
            var textPosition = selection.getTextPosBasedOnLogicalIndex(selection.editPosition);
            selection.selectContent(textPosition, true);
            this.reLayout(selection);
            this.alertDialog.close();
            this.alertDialog = undefined;
        }
    };
    Editor.prototype.onConfirmedCellDeletion = function (row, selection, startRowIndex, endRowIndex, startColumnIndex, endColumnIndex, isDeleteCells, editAction) {
        var isStarted = false;
        var isCellCleared = false;
        this.removeDeletedCellRevision(row);
        for (var j = 0; j < row.childWidgets.length; j++) {
            var cell = row.childWidgets[j];
            //this.removeRevisionForCell(cell, true);
            if (cell.columnIndex >= startColumnIndex && cell.columnIndex <= endColumnIndex) {
                if (!isStarted) {
                    this.updateEditPosition(cell, selection);
                    isStarted = true;
                }
                if (isDeleteCells) {
                    //Specific for Backspace and Cut if selection includes all rows.
                    var cell_1 = row.childWidgets[j];
                    this.updateNextBlocksIndex(cell_1, false);
                    for (var k = 0; k < cell_1.childWidgets.length; k++) {
                        var para = cell_1.childWidgets[k];
                        for (var l = 0; l < para.childWidgets.length; l++) {
                            var block = para.childWidgets[l];
                            if (block instanceof LineWidget) {
                                var line = block;
                                for (var j_2 = 0; j_2 < line.children.length; j_2++) {
                                    var element = line.children[j_2];
                                    if (element instanceof FootnoteElementBox) {
                                        this.removeFootnote(element);
                                    }
                                }
                            }
                        }
                    }
                    row.childWidgets.splice(j, 1);
                    j--;
                }
                else if (editAction < 4) {
                    isCellCleared = this.deleteCell(cell, selection, editAction, false);
                }
            }
        }
    };
    Editor.prototype.removeRevisionForRow = function (rowWidget) {
        if (rowWidget.rowFormat.revisions.length > 0 && this.skipTracking()) {
            this.unlinkRangeFromRevision(rowWidget.rowFormat, true);
            this.addRemovedRevisionInfo(rowWidget.rowFormat, undefined);
        }
    };
    Editor.prototype.removeRevisionsInRow = function (rowWidget) {
        if (rowWidget.rowFormat.revisions.length > 0) {
            for (var i = 0; i < rowWidget.rowFormat.revisions.length; i++) {
                var rowRevision = rowWidget.rowFormat.revisions[i];
                this.unlinkWholeRangeInRevision(rowWidget.rowFormat, rowRevision);
            }
        }
    };
    /**
     * @private
     */
    Editor.prototype.removeRevisionForCell = function (cellWidget, removeCollection) {
        for (var i = 0; i < cellWidget.childWidgets.length; i++) {
            if (cellWidget.childWidgets[i] instanceof ParagraphWidget) {
                var paraWidget = cellWidget.childWidgets[i];
                for (var lineIndex = 0; lineIndex < paraWidget.childWidgets.length; lineIndex++) {
                    var lineWidget = paraWidget.childWidgets[lineIndex];
                    for (var elementIndex = 0; elementIndex < lineWidget.children.length; elementIndex++) {
                        var currentElement = lineWidget.children[elementIndex];
                        if (!isNullOrUndefined(currentElement) && currentElement.revisions.length > 0) {
                            this.unlinkRangeFromRevision(currentElement, removeCollection);
                            this.addRemovedRevisionInfo(currentElement, undefined);
                        }
                    }
                }
            }
            else if (cellWidget.childWidgets[i] instanceof TableWidget) {
                this.removeRevisionForInnerTable(cellWidget.childWidgets[i]);
            }
        }
    };
    Editor.prototype.removeRevisionForInnerTable = function (tableWidget) {
        if (tableWidget.childWidgets.length > 0) {
            for (var i = 0; i < tableWidget.childWidgets.length; i++) {
                var row = tableWidget.childWidgets[i];
                if (!isNullOrUndefined(row)) {
                    this.removeRevisionForRow(row);
                }
            }
        }
    };
    /**
     * @private
     */
    Editor.prototype.removeRevisionForBlock = function (paraWidget, revision, skipParaMark, addToRevisionInfo) {
        if (paraWidget.characterFormat.revisions.length > 0 && !skipParaMark) {
            if (addToRevisionInfo) {
                this.addRemovedRevisionInfo(paraWidget.characterFormat, undefined, false);
            }
            if (isNullOrUndefined(revision)) {
                this.unlinkRangeFromRevision(paraWidget.characterFormat, true);
            }
            else {
                this.unlinkRangeByRevision(paraWidget.characterFormat, revision);
            }
            paraWidget.characterFormat.revisions = [];
        }
        if (!isNullOrUndefined(paraWidget)) {
            for (var lineIndex = 0; lineIndex < paraWidget.childWidgets.length; lineIndex++) {
                var lineWidget = paraWidget.childWidgets[lineIndex];
                for (var elementIndex = 0; elementIndex < lineWidget.children.length; elementIndex++) {
                    var currentElement = lineWidget.children[elementIndex];
                    if (!isNullOrUndefined(currentElement) && currentElement.revisions.length > 0) {
                        if (addToRevisionInfo) {
                            this.addRemovedRevisionInfo(currentElement, undefined, false);
                        }
                        if (isNullOrUndefined(revision)) {
                            this.unlinkRangeFromRevision(currentElement, true);
                        }
                        else {
                            this.unlinkRangeByRevision(currentElement, revision);
                        }
                        currentElement.revisions = [];
                    }
                }
            }
        }
    };
    Editor.prototype.unlinkRangeByRevision = function (item, revision) {
        for (var i = 0; i < item.revisions.length; i++) {
            var currentRevision = item.revisions[i];
            if (currentRevision.author === revision.author && currentRevision.revisionType === revision.revisionType) {
                item.revisions.splice(item.revisions.indexOf(revision), 1);
                var rangeIndex = revision.range.indexOf(item);
                revision.range.splice(rangeIndex, 1);
                this.owner.trackChangesPane.updateCurrentTrackChanges(revision);
            }
        }
    };
    Editor.prototype.isWholeRowSelected = function (ownerRow, startColumnIndex, endColumnIndex) {
        var columnCount = startColumnIndex + endColumnIndex;
        if (startColumnIndex === 0 && ownerRow.childWidgets.length - 1 === columnCount) {
            return true;
        }
        return false;
    };
    Editor.prototype.deleteCell = function (cell, selection, editAction, copyChildToClipboard) {
        //Checks whether this is last paragraph of owner textbody.
        var block = cell.childWidgets[0];
        if (cell.childWidgets.length === 1 && block instanceof ParagraphWidget && block.isEmpty()) {
            return false;
        }
        var totalLength = cell.childWidgets.length - 1;
        for (var i = cell.childWidgets.length - 1; i > -1; i--) {
            block = cell.childWidgets[i];
            if (editAction < 4) {
                //Checks whether this is last paragraph of owner textbody.
                if (block instanceof ParagraphWidget && i === totalLength) {
                    //Preserves empty paragraph, to ensure minimal content.
                    var paragraph = block;
                    //Removes all the inlines in the paragraph.
                    if (!this.checkClearCells(selection)) {
                        for (var j = paragraph.childWidgets.length - 1; j >= 0; j--) {
                            var inline = paragraph.childWidgets[j];
                            for (var k = inline.children.length - 1; k >= 0; k--) {
                                var element = inline.children[k];
                                if (element instanceof FootnoteElementBox) {
                                    this.removeFootnote(element);
                                }
                                else if (element instanceof BookmarkElementBox && element.bookmarkType === 0 && this.documentHelper.bookmarks.containsKey(element.name)) {
                                    this.documentHelper.bookmarks.remove(element.name);
                                }
                                this.unLinkFieldCharacter(element);
                                inline.children.splice(k, 1);
                            }
                            if (paragraph.childWidgets.length > 1) {
                                paragraph.childWidgets.splice(j, 1);
                            }
                        }
                    }
                    else if (!paragraph.isEmpty()) {
                        this.removeInlines(paragraph, paragraph.firstChild, 0, paragraph.lastChild, paragraph.lastChild.getEndOffset(), editAction);
                    }
                    continue;
                }
                this.removeBlock(block);
                if (this.checkClearCells(selection)) {
                    this.addRemovedNodes(block);
                    if (cell.childWidgets.length === 1) {
                        //Add Index for line Widget
                        selection.editPosition = this.selection.getHierarchicalIndex(cell.childWidgets[0], '0');
                        this.updateHistoryPosition(selection.editPosition, true);
                    }
                }
            }
        }
        return true;
    };
    Editor.prototype.paragrapghBookmarkCollection = function (block, existingBookmark) {
        var bookmarkCol = this.documentHelper.bookmarks;
        for (var i = 0; i < bookmarkCol.length; i++) {
            var bookmark = this.documentHelper.bookmarks.get(bookmarkCol.keys[i]);
            if (bookmark.paragraph === block) {
                existingBookmark.push(bookmark);
            }
        }
        return existingBookmark;
    };
    Editor.prototype.deleteContainer = function (cell, selection, start, end, editAction) {
        var ownerTable = cell.ownerTable;
        if (selection.containsRow(ownerTable.lastChild, end.paragraph.associatedCell)) {
            this.deleteContent(ownerTable, selection, editAction);
        }
        else {
            if (this.toCheckForTrack(ownerTable)) {
                for (var i = 0; i < ownerTable.childWidgets.length; i++) {
                    var inline = ownerTable.childWidgets[i];
                    this.trackRowDeletion(inline);
                    if (end.paragraph.isInsideTable && selection.containsRow(inline, end.paragraph.associatedCell)) {
                        this.documentHelper.layout.reLayoutTable(ownerTable);
                        return;
                    }
                }
            }
            else {
                for (var i = 0; i < ownerTable.childWidgets.length; i++) {
                    var row = ownerTable.childWidgets[i];
                    if (editAction < 4) {
                        this.updateNextBlocksIndex(row, false);
                        ownerTable.childWidgets.splice(i, 1);
                        this.addRemovedNodes(row);
                        i--;
                    }
                    if (end.paragraph.isInsideTable && selection.containsRow(row, end.paragraph.associatedCell)) {
                        this.documentHelper.layout.reLayoutTable(ownerTable);
                        return;
                    }
                }
            }
        }
    };
    Editor.prototype.deleteTableBlock = function (table, selection, start, end, editAction) {
        table = table.combineWidget(this.owner.viewer);
        if (start.paragraph.isInsideTable && table.contains(start.paragraph.associatedCell)) {
            var block = table.previousRenderedWidget;
            var previousBlock = this.checkAndInsertBlock(table, start, end, editAction, block instanceof ParagraphWidget ? block : undefined);
            if (selection.containsRow(table.firstChild, start.paragraph.associatedCell)) {
                if (this.owner.enableTrackChanges) {
                    for (var i = 0; i < table.childWidgets.length; i++) {
                        this.trackRowDeletion(table.childWidgets[i]);
                    }
                }
                else {
                    this.deleteContent(table, selection, editAction);
                }
            }
            else {
                if (this.owner.enableTrackChanges) {
                    if (isNullOrUndefined(end.paragraph.associatedCell) && !end.paragraph.isInsideTable) {
                        var previousChild = end.paragraph.previousRenderedWidget.lastChild;
                        var endCells = previousChild.lastChild;
                        this.deleteCellsInTable(table, selection, start, end, editAction, endCells);
                    }
                }
                else {
                    var newTable = this.splitTable(table, start.paragraph.associatedCell.ownerRow);
                    this.deleteContent(table, selection, editAction);
                    this.documentHelper.layout.layoutBodyWidgetCollection(newTable.index, newTable.containerWidget, newTable, false);
                }
            }
            if (!isNullOrUndefined(previousBlock)) {
                selection.editPosition = this.selection.getHierarchicalIndex(previousBlock, '0');
                if (this.editorHistory && !isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo)) {
                    this.editorHistory.currentBaseHistoryInfo.endPosition = selection.editPosition;
                }
            }
        }
        else {
            var blockAdv = table.previousRenderedWidget;
            var sectionAdv = table.bodyWidget instanceof BodyWidget ? table.bodyWidget : undefined;
            if (this.owner.enableTrackChanges) {
                for (var i = 0; i < table.childWidgets.length; i++) {
                    this.trackRowDeletion(table.childWidgets[i]);
                }
            }
            else {
                this.deleteContent(table, selection, editAction);
            }
            if (!isNullOrUndefined(blockAdv)) {
                // let nextSection: WSection = blockAdv.section instanceof WSection ? blockAdv.section as WSection : undefined;
                // if (sectionAdv !== nextSection) {
                //     this.deleteSection(selection, sectionAdv, nextSection, editAction);
                // }
                //Goto the next block.
                this.deleteBlock(blockAdv, selection, start, end, editAction);
            }
        }
    };
    Editor.prototype.splitTable = function (table, splitEndRow) {
        var newTable = new TableWidget();
        newTable.tableFormat.copyFormat(table.tableFormat);
        newTable.index = table.index;
        //Moves the rows to new table.
        for (var i = 0; i < table.childWidgets.length; i++) {
            var row = table.childWidgets[i];
            if (row === splitEndRow) {
                break;
            }
            newTable.childWidgets.push(row);
            row.containerWidget = newTable;
            table.childWidgets.splice(i, 1);
            i--;
        }
        //Inserts new table in the current text position.
        var insertIndex = table.getIndex();
        table.containerWidget.childWidgets.splice(insertIndex, 0, newTable);
        newTable.containerWidget = table.containerWidget;
        this.updateNextBlocksIndex(newTable, true);
        return newTable;
    };
    Editor.prototype.updateEditPosition = function (cell, selection) {
        var firstParagraph = this.documentHelper.getFirstParagraphInCell(cell);
        selection.editPosition = this.selection.getHierarchicalIndex(firstParagraph, '0');
    };
    Editor.prototype.deleteContent = function (table, selection, editAction) {
        if (editAction < 4) {
            this.removeBlock(table);
            this.addRemovedNodes(table);
        }
    };
    Editor.prototype.setActionInternal = function (selection, action) {
        if (this.documentHelper.owner.enableHistoryMode && !isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo)) {
            this.editorHistory.currentBaseHistoryInfo.action = action;
        }
    };
    Editor.prototype.checkClearCells = function (selection) {
        return this.editorHistory && this.editorHistory.currentBaseHistoryInfo && this.editorHistory.currentBaseHistoryInfo.action !== 'ClearCells';
    };
    Editor.prototype.isEndInAdjacentTable = function (paragraph, endParagraph) {
        var start = this.selection.getHierarchicalIndex(paragraph, '');
        var end = this.selection.getHierarchicalIndex(endParagraph, '');
        var selectionStart = start.split(';');
        var selectionEnd = end.split(';');
        return selectionStart.length < selectionEnd.length;
    };
    /**
     * @private
     * @param table
     * @returns {TableWidget}
     */
    Editor.prototype.cloneTableToHistoryInfo = function (table) {
        if (this.editorHistory && !isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo)) {
            //Clones the entire table to preserve in history.
            var clonedTable = table.clone();
            //Preserves the cloned table in history info, for future undo operation.
            this.editorHistory.currentBaseHistoryInfo.removedNodes.push(clonedTable);
            //Sets the insert position in history info as current table.
            if (this.documentHelper.selection.start.paragraph.isInsideTable &&
                this.documentHelper.selection.start.paragraph.associatedCell.ownerTable === table) {
                this.updateHistoryPosition(this.selection.getHierarchicalIndex(table, '0'), true);
            }
            return clonedTable;
        }
        return undefined;
    };
    Editor.prototype.insertParagraphPaste = function (paragraph, currentParagraph, start, end, isCombineNextParagraph, editAction, isCombineLastBlock) {
        if (this.editorHistory && (this.editorHistory.isUndoing || this.editorHistory.isRedoing) && !isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo) && this.editorHistory.currentBaseHistoryInfo.action === 'Paste') {
            var nextParagraph = this.selection.getNextParagraphBlock(currentParagraph);
            if (nextParagraph) {
                if (start.offset > 0 && nextParagraph === end.paragraph && paragraph === start.paragraph
                    && this.editorHistory.currentBaseHistoryInfo.action === 'Paste') {
                    //Combines the current paragraph with end paragraph specific for undo/redo paste action.
                    var insertIndex = 0;
                    this.removeBlock(currentParagraph);
                    this.documentHelper.layout.clearListElementBox(nextParagraph);
                    this.documentHelper.layout.clearListElementBox(currentParagraph);
                    for (var i = 0; i < currentParagraph.childWidgets.length; i++) {
                        var line = currentParagraph.childWidgets[i];
                        nextParagraph.childWidgets.splice(insertIndex, 0, line);
                        currentParagraph.childWidgets.splice(i, 1);
                        i--;
                        insertIndex++;
                        line.paragraph = nextParagraph;
                    }
                    this.documentHelper.layout.reLayoutParagraph(nextParagraph, 0, 0);
                    isCombineNextParagraph = false;
                    var offset = this.selection.editPosition.substring(this.selection.editPosition.lastIndexOf(';') + 1);
                    this.selection.editPosition = this.selection.getHierarchicalIndex(nextParagraph, offset);
                }
            }
        }
        if (isCombineNextParagraph) {
            this.deleteParagraphMark(currentParagraph, this.selection, editAction, false, isCombineLastBlock);
        }
    };
    Editor.prototype.removeInlines = function (paragraph, startLine, startOffset, endLine, endOffset, editAction) {
        var isRemoved = false;
        this.documentHelper.layout.clearListElementBox(paragraph);
        var startIndex = paragraph.childWidgets.indexOf(startLine);
        var startPosition = this.selection.start.clone();
        var endPosition = this.selection.end.clone();
        var editPosition = this.selection.editPosition;
        for (var i = paragraph.childWidgets.length - 1; i >= 0; i--) {
            var lineWidget = paragraph.childWidgets[i];
            if (startLine === lineWidget && endLine === lineWidget) {
                this.removeContent(lineWidget, startOffset, endOffset, editAction);
                isRemoved = true;
                break;
            }
            if (endLine === lineWidget) {
                isRemoved = true;
                this.removeContent(lineWidget, 0, endOffset, editAction);
            }
            else if (startLine === lineWidget) {
                this.removeContent(lineWidget, startOffset, this.documentHelper.selection.getLineLength(lineWidget), editAction);
                break;
            }
            else if (isRemoved) {
                this.removeContent(lineWidget, 0, this.documentHelper.selection.getLineLength(lineWidget), editAction);
            }
        }
        if (this.owner.enableTrackChanges && !this.skipTracking()) {
            this.selection.start.setPositionInternal(startPosition);
            this.selection.end.setPositionInternal(endPosition);
            if (this.skipReplace) {
                this.editorHistory.currentBaseHistoryInfo.insertPosition = undefined;
                this.updateInsertPosition();
            }
            this.selection.editPosition = editPosition;
        }
        if (isRemoved) {
            this.removeEmptyLine(paragraph);
            this.documentHelper.layout.reLayoutParagraph(paragraph, 0, 0);
        }
    };
    Editor.prototype.skipTracking = function () {
        if (!isNullOrUndefined(this.editorHistory) && (this.editorHistory.isUndoing || this.editorHistory.isRedoing)) {
            return true;
        }
        else if (!isNullOrUndefined(this.editorHistory) && this.editorHistory.currentBaseHistoryInfo && (this.editorHistory.currentBaseHistoryInfo.action === 'Reject Change' || this.editorHistory.currentBaseHistoryInfo.action === 'Accept Change')) {
            return true;
        }
        return false;
    };
    Editor.prototype.canHandleDeletion = function () {
        if (!isNullOrUndefined(this.editorHistory) && this.editorHistory.currentBaseHistoryInfo && (this.editorHistory.currentBaseHistoryInfo.action === 'DeleteRow')) {
            return true;
        }
        return false;
    };
    /**
     *
     * @param comment
     * Deletes comment start and end markers along with its comment widgets.
     */
    Editor.prototype.deleteCommentInSelection = function (comment) {
        //if comment end mark is in selection, both comment start and end markers will get deleted along with its comment widgets.
        var curentBaseHistoryInfo = this.editorHistory.currentBaseHistoryInfo;
        if (this.editorHistory && this.editorHistory.currentBaseHistoryInfo && !this.editorHistory.currentHistoryInfo
            && !(this.editorHistory.isUndoing || this.editorHistory.isRedoing)) {
            this.initComplexHistory('DeleteCommentInline');
        }
        this.deleteCommentInternal(comment);
        if (this.editorHistory && this.editorHistory.currentHistoryInfo) {
            if (!(this.editorHistory.isUndoing || this.editorHistory.isRedoing)) {
                this.editorHistory.currentHistoryInfo.addModifiedAction(curentBaseHistoryInfo);
            }
            this.selection.editPosition = curentBaseHistoryInfo.insertPosition;
            this.editorHistory.currentHistoryInfo.insertPosition = this.selection.editPosition;
            this.editorHistory.currentBaseHistoryInfo = curentBaseHistoryInfo;
        }
    };
    /**
     * @private
     */
    Editor.prototype.removeContent = function (lineWidget, startOffset, endOffset, editAction) {
        var count = this.selection.getLineLength(lineWidget);
        var startText = undefined;
        var textCount = 0;
        var lastText = undefined;
        for (var i = lineWidget.children.length - 1; i >= 0; i--) {
            var inline = lineWidget.children[i];
            if (isNullOrUndefined(editAction) || (editAction !== 2 && editAction !== 1)) {
                for (var k = 0; k < lineWidget.children.length; k++) {
                    var elementbox = lineWidget.children[k];
                    if (elementbox instanceof TextElementBox) {
                        var text = elementbox.text;
                        if (text.length + textCount > startOffset && !(textCount > startOffset)) {
                            startText = text[startOffset - textCount - 1];
                            if (isNullOrUndefined(startText) && (startOffset - textCount) === 0) {
                                startText = lastText;
                            }
                        }
                        // tslint:disable-next-line:max-line-length
                        if (text.length + textCount > endOffset) {
                            if ((text[endOffset - textCount] === ' ' && startOffset === 0) || (startText === ' ' && text[endOffset - textCount] === ' ')) {
                                endOffset += 1;
                            }
                        }
                        lastText = text[text.length - 1];
                    }
                    textCount += elementbox.length;
                }
            }
            if (endOffset <= count - inline.length) {
                count -= inline.length;
                continue;
            }
            var endIndex = inline.length;
            if (count > endOffset && (count - endIndex < endOffset)) {
                endIndex = endOffset - (count - inline.length);
            }
            var startIndex = 0;
            if (count - inline.length < startOffset) {
                startIndex = startOffset - (count - inline.length);
            }
            if (count > endOffset) {
                count -= (inline.length - endIndex);
            }
            if (startIndex === 0 && endIndex === inline.length) {
                if (!this.owner.enableTrackChanges || this.owner.enableTrackChanges && this.skipTracking()) {
                    if (!(this.editorHistory && (this.editorHistory.isUndoing || this.editorHistory.isRedoing))) {
                        if (inline instanceof BookmarkElementBox) {
                            this.removedBookmarkElements.push(inline);
                        }
                    }
                    if (inline instanceof BookmarkElementBox) {
                        if (this.documentHelper.bookmarks.containsKey(inline.name)) {
                            this.documentHelper.bookmarks.remove(inline.name);
                        }
                    }
                }
                if ((inline instanceof ImageElementBox && inline.textWrappingStyle !== 'Inline') || inline instanceof ShapeElementBox) {
                    this.removeAutoShape(inline);
                }
                //clear form field revisions if it is intentionally deleted.
                if (this.skipFieldDeleteTracking && inline.revisions.length > 0) {
                    var fieldInline = inline;
                    if (fieldInline instanceof FieldElementBox) {
                        if (fieldInline.fieldType === 1 || fieldInline.fieldType === 2) {
                            fieldInline = fieldInline.fieldBegin;
                        }
                        this.clearFieldElementRevisions(fieldInline, inline.revisions);
                    }
                }
                if (this.canHandleDeletion() || (this.owner.enableTrackChanges && !this.skipTracking() && !this.skipFieldDeleteTracking && !this.isInsertingTOC)) {
                    if (!this.skipTableElements && !this.skipFootNoteDeleteTracking) {
                        this.addRemovedNodes(inline.clone());
                    }
                    this.handleDeleteTracking(inline, startOffset, endOffset, i);
                }
                else {
                    // if (editAction < 4) {
                    if (inline instanceof FootnoteElementBox) {
                        inline.isLayout = false;
                    }
                    this.unLinkFieldCharacter(inline);
                    this.unlinkRangeFromRevision(inline, true);
                    this.addRemovedRevisionInfo(inline, undefined);
                    this.addRemovedNodes(inline);
                    if (inline instanceof EditRangeStartElementBox) {
                        this.removedEditRangeStartElements.push(inline);
                    }
                    else if (inline instanceof EditRangeEndElementBox) {
                        this.removedEditRangeEndElements.push(inline);
                    }
                    lineWidget.children.splice(i, 1);
                    if (!isNullOrUndefined(lineWidget.layoutedElements) && lineWidget.layoutedElements.length > 0) {
                        lineWidget.layoutedElements.splice(i, 1);
                    }
                }
            }
            else if (inline instanceof TextElementBox) {
                var span = this.handleDeleteTracking(inline, startIndex, endIndex);
                //if (editAction < 4) {
                // let span: TextElementBox = new TextElementBox();
                // span.characterFormat.copyFormat(inline.characterFormat);
                // span.text = inline.text.substr(startIndex, endIndex - startIndex);
                // for (let i = inline.revisions.length - 1; i >= 0; i--) {
                //     let revision: Revision = inline.revisions[i];
                //     let splittedRange: object[] = this.splitRevisionByElement(inline, revision);
                //     this.insertRevision(span, revision.revisionType, revision.author, revision.date, splittedRange);
                // }
                // inline.text = inline.text.slice(0, startIndex) + inline.text.slice(endIndex);
                if (!isNullOrUndefined(span)) {
                    if (!this.skipTableElements) {
                        if (inline.revisions.length > 0) {
                            this.addRemovedRevisionInfo(inline, span);
                        }
                        this.addRemovedNodes(span);
                    }
                }
                // else {
                //     this.insertTextInternal(span.text, false, 'Deletion');
                //     this.editorHistory.currentBaseHistoryInfo.revisionToRemove = inline.revisions[inline.revisions.length - 1];
                //     // let info: ElementInfo = this.selection.start.currentWidget.getInline(startOffset +1, 0);
                //     // let element: ElementBox = info.element.clone();
                //     //this.addRemovedNodes(span);
                // }
            }
            if ((!this.owner.enableTrackChanges || this.editorHistory.isUndoing) && inline instanceof FootnoteElementBox) {
                if (inline.footnoteType === 'Footnote') {
                    this.removeFootnote(inline);
                }
                else {
                    this.removeEndnote(inline);
                }
            }
            if (startOffset >= count - (endIndex - startIndex)) {
                break;
            }
            count -= (endIndex - startIndex);
            this.documentHelper.layout.clearListElementBox(lineWidget.paragraph);
        }
    };
    /**
     * Deletes comment widgets from comment pane along with history preservation.
     */
    Editor.prototype.deleteCommentWidgetInline = function (inline) {
        // let curentBaseHistoryInfo: BaseHistoryInfo = this.editorHistory.currentBaseHistoryInfo;
        // if (this.editorHistory && this.editorHistory.currentBaseHistoryInfo && !this.editorHistory.currentHistoryInfo) {
        //     this.initComplexHistory('DeleteCommentInline');
        // }
        // // if (!this.selection.isElementInSelection(inline.comment.commentStart, true)) {
        // //     this.removeCommentCharacters.push(inline.comment.commentStart);
        // // }
        // this.deleteCommentWidgetInternal(inline.comment);
        // if (this.editorHistory && this.editorHistory.currentHistoryInfo) {
        //     // let index = this.editorHistory.currentHistoryInfo.modifiedActions.indexOf(curentHistoryInfo);
        //     // this.editorHistory.currentHistoryInfo.modifiedActions.push(this.editorHistory.currentHistoryInfo.modifiedActions.splice(index, 1)[0]);
        //     let lstActionHistoryInfo: HistoryInfo = this.editorHistory.currentHistoryInfo;
        //     let frstAction: BaseHistoryInfo = lstActionHistoryInfo.modifiedActions[0];
        //     // if (frstAction.action === "DeleteCommentWidget" && frstAction.removedNodes[0] instanceof CommentElementBox
        //     //     && !(frstAction.removedNodes[0] as CommentElementBox).isReply && (lstActionHistoryInfo.modifiedActions[1].action === "DeleteCommentWidget")) {
        //     //     // index = this.editorHistory.currentHistoryInfo.modifiedActions.indexOf(curentHistoryInfo);
        //     //     // this.editorHistory.currentHistoryInfo.modifiedActions.splice(index - 1, 0, this.editorHistory.currentHistoryInfo.modifiedActions.splice(0, 1)[0]);
        //     // }
        // }
        // this.editorHistory.currentHistoryInfo.addModifiedAction(curentBaseHistoryInfo);
        // this.editorHistory.currentBaseHistoryInfo = curentBaseHistoryInfo;
        // this.selection.editPosition = curentBaseHistoryInfo.insertPosition;        
        // this.editorHistory.currentHistoryInfo.insertPosition = curentBaseHistoryInfo.insertPosition;
        // this.editorHistory.currentHistoryInfo.endPosition = curentBaseHistoryInfo.insertPosition;
        // this.editorHistory.currentHistoryInfo.selectionStart = curentBaseHistoryInfo.selectionStart;
        // this.editorHistory.currentHistoryInfo.selectionEnd = curentBaseHistoryInfo.selectionEnd;
    };
    Editor.prototype.clearFieldElementRevisions = function (inline, revision) {
        var revisions = revision;
        for (var i = 0; i < revisions.length; i++) {
            var currentRevision = revisions[i];
            for (var j = 0; j < currentRevision.range.length; j++) {
                if (currentRevision.range[j] === inline) {
                    for (var k = j; k < currentRevision.range.length; k) {
                        if (currentRevision.range[j] instanceof FieldElementBox && currentRevision.range[j].fieldType === 1 && currentRevision.range[j].fieldBegin === inline) {
                            currentRevision.removeRangeRevisionForItem(currentRevision.range[j]);
                            if (currentRevision.range.length === 0) {
                                this.owner.revisions.remove(currentRevision);
                            }
                            break;
                        }
                        currentRevision.removeRangeRevisionForItem(currentRevision.range[j]);
                    }
                }
            }
        }
    };
    Editor.prototype.addRemovedRevisionInfo = function (currentElement, spittedElement, removePrevRevisions) {
        for (var i = 0; i < currentElement.revisions.length; i++) {
            var revisionId = currentElement.revisions[i].revisionID;
            if (!isNullOrUndefined(spittedElement)) {
                spittedElement.removedIds.push(revisionId);
            }
            else {
                currentElement.removedIds.push(revisionId);
            }
        }
        if (isNullOrUndefined(spittedElement) && (isNullOrUndefined(removePrevRevisions) || removePrevRevisions)) {
            currentElement.revisions = [];
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Editor.prototype.removeEmptyLine = function (paragraph) {
        if (paragraph.childWidgets.length > 1) {
            for (var i = 0; i < paragraph.childWidgets.length; i++) {
                var lineWidget = paragraph.childWidgets[i];
                if (lineWidget.children.length === 0 && paragraph.childWidgets.length > 1) {
                    paragraph.childWidgets.splice(i, 1);
                    i--;
                }
            }
        }
    };
    //#endregion
    /**
     * Clone the list level
     *
     * @param {WListLevel} source - Specifies the source
     * @private
     * @returns {WListLevel} - Returns the list level
     */
    Editor.prototype.cloneListLevel = function (source) {
        var listLevel = new WListLevel(undefined);
        this.copyListLevel(listLevel, source);
        return listLevel;
    };
    /**
     * Copies the list level
     *
     * @param {WListLevel} destination - Specifies the destination
     * @param {WListLevel} listLevel - Specifies the list level
     * @private
     * @returns {void}
     */
    Editor.prototype.copyListLevel = function (destination, listLevel) {
        if (!isNullOrUndefined(listLevel.paragraphFormat)) {
            destination.paragraphFormat = new WParagraphFormat(destination);
            destination.paragraphFormat.copyFormat(listLevel.paragraphFormat);
        }
        if (!isNullOrUndefined(listLevel.characterFormat)) {
            destination.characterFormat = new WCharacterFormat(destination);
            destination.characterFormat.copyFormat(listLevel.characterFormat);
        }
        if (!isNullOrUndefined(listLevel.followCharacter)) {
            destination.followCharacter = listLevel.followCharacter;
        }
        if (!isNullOrUndefined(listLevel.listLevelPattern)) {
            destination.listLevelPattern = listLevel.listLevelPattern;
        }
        if (!isNullOrUndefined(listLevel.numberFormat)) {
            destination.numberFormat = listLevel.numberFormat;
        }
        if (!isNullOrUndefined(listLevel.restartLevel)) {
            destination.restartLevel = listLevel.restartLevel;
        }
        if (!isNullOrUndefined(listLevel.startAt)) {
            destination.startAt = listLevel.startAt;
        }
    };
    /**
     * Clone level override
     *
     * @param {WLevelOverride} source  @returns {void} - Specifies the level override
     * @private
     * @returns {WLevelOverride} - Returns the level overeide
     */
    Editor.prototype.cloneLevelOverride = function (source) {
        var levelOverride = new WLevelOverride();
        if (!isNullOrUndefined(source.startAt)) {
            levelOverride.startAt = source.startAt;
        }
        if (!isNullOrUndefined(source.overrideListLevel)) {
            levelOverride.overrideListLevel = source.overrideListLevel;
        }
        if (!isNullOrUndefined(source.levelNumber)) {
            levelOverride.levelNumber = source.levelNumber;
        }
        return levelOverride;
    };
    /**
     * Update List Paragraph
     * @private
     * @returns {void}
     */
    Editor.prototype.updateListParagraphs = function () {
        this.documentHelper.listParagraphs = [];
        for (var j = 0; j < this.documentHelper.pages.length; j++) {
            var bodyWidget = this.documentHelper.pages[j].bodyWidgets[0];
            for (var i = 0; i < bodyWidget.childWidgets.length; i++) {
                this.updateListParagraphsInBlock(bodyWidget.childWidgets[i]);
            }
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Editor.prototype.updateListParagraphsInBlock = function (block) {
        if (block instanceof ParagraphWidget) {
            if (!isNullOrUndefined(block.paragraphFormat)
                && !isNullOrUndefined(block.paragraphFormat.listFormat)
                && !isNullOrUndefined(block.paragraphFormat.listFormat.listId)) {
                if (block.paragraphFormat.listFormat.listId >= 0) {
                    block.paragraphFormat.clearIndent();
                }
                if (isNullOrUndefined(this.documentHelper.listParagraphs)) {
                    this.documentHelper.listParagraphs = [];
                }
                this.documentHelper.listParagraphs.push(block);
            }
        }
        else if (block instanceof TableWidget) {
            for (var i = 0; i < block.childWidgets.length; i++) {
                for (var j = 0; j < block.childWidgets[i].childWidgets.length; j++) {
                    var cell = block.childWidgets[i].childWidgets[j];
                    for (var k = 0; k < cell.childWidgets.length; k++) {
                        this.updateListParagraphsInBlock(cell.childWidgets[k]);
                    }
                }
            }
        }
    };
    /**
     * Applies list format
     *
     * @param {WList} list - Specifies the list.
     * @private
     * @returns {void}
     */
    Editor.prototype.onApplyList = function (list) {
        var selection = this.documentHelper.selection;
        this.setOffsetValue(this.documentHelper.selection);
        this.initHistory('ListFormat');
        var format = new WListFormat();
        if (!isNullOrUndefined(list)) {
            format.listId = list.listId;
        }
        this.documentHelper.owner.isShiftingEnabled = true;
        if (selection.isEmpty) {
            this.applyParaFormatProperty(selection.start.paragraph, 'listFormat', format, false);
            this.layoutItemBlock(selection.start.paragraph, false);
        }
        else {
            this.updateSelectionParagraphFormatting('listFormat', format, false);
        }
        this.documentHelper.owner.isShiftingEnabled = true;
        this.layoutWholeDocument();
        this.documentHelper.owner.isShiftingEnabled = false;
    };
    /**
     * Applies bullets or numbering list
     *
     * @param {string} format - Specifies the format
     * @param {ListLevelPattern} listLevelPattern - Specifies the list level patterns
     * @param {string} fontFamily - Specifies the font family.
     * @private
     * @returns {void}
     */
    Editor.prototype.applyBulletOrNumbering = function (format, listLevelPattern, fontFamily) {
        var selection = this.documentHelper.selection;
        var list = selection.paragraphFormat.getList();
        var isUpdate = false;
        var start = selection.start;
        if (!selection.isForward) {
            start = selection.end;
        }
        var currentParagraph = start.paragraph;
        if (isNullOrUndefined(list)) {
            while (!isNullOrUndefined(currentParagraph.previousWidget) && currentParagraph.previousWidget instanceof ParagraphWidget
                && currentParagraph.previousWidget.isEmpty() && currentParagraph.previousWidget.paragraphFormat.listFormat.listId === -1) {
                currentParagraph = currentParagraph.previousWidget;
            }
            if (currentParagraph.previousWidget && currentParagraph.previousWidget instanceof ParagraphWidget
                && currentParagraph.previousWidget.paragraphFormat.listFormat.listId !== -1) {
                currentParagraph = currentParagraph.previousWidget;
                list = this.documentHelper.getListById(currentParagraph.paragraphFormat.listFormat.listId);
                isUpdate = true;
            }
            if (!isUpdate) {
                while (!isNullOrUndefined(currentParagraph.nextWidget) && currentParagraph.nextWidget instanceof ParagraphWidget
                    && currentParagraph.nextWidget.isEmpty() && currentParagraph.nextWidget.paragraphFormat.listFormat.listId === -1) {
                    currentParagraph = currentParagraph.nextWidget;
                }
                if (currentParagraph.nextWidget && currentParagraph.nextWidget instanceof ParagraphWidget
                    && currentParagraph.nextWidget.paragraphFormat.listFormat.listId !== -1) {
                    currentParagraph = currentParagraph.nextWidget;
                    list = this.documentHelper.getListById(currentParagraph.paragraphFormat.listFormat.listId);
                    isUpdate = true;
                }
            }
        }
        var startListLevel = undefined;
        var levelNumber = -1;
        var initialListLevel = undefined;
        var isSameList = false;
        if (currentParagraph.paragraphFormat.listFormat.listId !== -1 && !isNullOrUndefined(currentParagraph.paragraphFormat.listFormat.listLevel)) {
            this.listNumberFormat = currentParagraph.paragraphFormat.listFormat.listLevel.numberFormat;
            this.listLevelPattern = currentParagraph.paragraphFormat.listFormat.listLevel.listLevelPattern;
            this.listLevelNumber = currentParagraph.paragraphFormat.listFormat.listLevelNumber;
        }
        if (!isNullOrUndefined(list)) {
            levelNumber = currentParagraph.paragraphFormat.listFormat.listLevelNumber;
            var tempList = this.documentHelper.getListById(currentParagraph.paragraphFormat.listFormat.listId);
            startListLevel = this.documentHelper.layout.getListLevel(tempList, levelNumber);
            if (levelNumber > 0) {
                initialListLevel = this.documentHelper.layout.getListLevel(tempList, 0);
                isSameList = !isNullOrUndefined(initialListLevel) && levelNumber > 0 && selection.start.isInSameParagraph(selection.end);
            }
            var abstractList = tempList.abstractList;
            if (!abstractList) {
                abstractList = this.documentHelper.getAbstractListById(list.abstractListId);
            }
            if (abstractList.levels.length === 0) {
                startListLevel = this.documentHelper.layout.getListLevel(tempList, currentParagraph.paragraphFormat.listFormat.listLevelNumber);
            }
            if (isUpdate) {
                if (listLevelPattern !== 'Bullet' && startListLevel.listLevelPattern === listLevelPattern
                    && (startListLevel.numberFormat === format || startListLevel.numberFormat.indexOf(format) !== -1)) {
                    selection.paragraphFormat.listId = list.listId;
                    selection.paragraphFormat.listLevelNumber = levelNumber;
                    selection.paragraphFormat.setList(list);
                    return;
                }
                else {
                    startListLevel = abstractList.levels[0];
                }
            }
        }
        if (isNullOrUndefined(list) || (!isNullOrUndefined(list) && levelNumber === 0
            && ((startListLevel.listLevelPattern !== listLevelPattern) || startListLevel.numberFormat !== format
                || (startListLevel.characterFormat.fontFamily !== fontFamily && startListLevel.listLevelPattern === 'Bullet')))) {
            isUpdate = false;
            list = new WList();
            if (this.documentHelper.lists.length > 0) {
                list.listId = this.documentHelper.lists[this.documentHelper.lists.length - 1].listId + 1;
            }
            else {
                list.listId = 0;
            }
            var abstractList = new WAbstractList();
            if (this.documentHelper.abstractLists.length > 0) {
                abstractList.abstractListId = this.documentHelper.abstractLists[this.documentHelper.abstractLists.length - 1].abstractListId + 1;
            }
            else {
                abstractList.abstractListId = 0;
            }
            list.abstractListId = abstractList.abstractListId;
            list.abstractList = abstractList;
            this.documentHelper.abstractLists.push(abstractList);
            if (format === 'bullet' || format === 'multiLevel' || format === 'numbering') {
                this.addListLevels(abstractList, format, selection);
            }
            else {
                var listLevel = new WListLevel(abstractList);
                listLevel.listLevelPattern = listLevelPattern;
                listLevel.numberFormat = format;
                if (listLevelPattern !== 'Bullet') {
                    listLevel.startAt = 1;
                }
                else {
                    listLevel.characterFormat.fontFamily = fontFamily;
                }
                listLevel.paragraphFormat.leftIndent = 36;
                listLevel.paragraphFormat.firstLineIndent = -18;
                abstractList.levels.push(listLevel);
                selection.paragraphFormat.listLevelNumber = 0;
            }
            selection.paragraphFormat.setList(list);
        }
        else if (isSameList && !isNullOrUndefined(list)) {
            var tempList = this.documentHelper.getListById(currentParagraph.paragraphFormat.listFormat.listId);
            var listLevel = this.documentHelper.layout.getListLevel(tempList, levelNumber);
            if (listLevelPattern === 'Bullet') {
                listLevel.numberFormat = format;
                listLevel.characterFormat.fontFamily = fontFamily;
            }
            else {
                listLevel.listLevelPattern = listLevelPattern;
                listLevel.characterFormat.fontFamily = fontFamily;
                var currentFormat = listLevel.numberFormat.substring(listLevel.numberFormat.length - 1);
                if (listLevel.numberFormat.length !== format.length && levelNumber > 0) {
                    listLevel.numberFormat = format;
                }
                else if (format.substring(format.length - 1) !== listLevel.numberFormat.substring(listLevel.numberFormat.length - 1)) {
                    listLevel.numberFormat = listLevel.numberFormat.replace(currentFormat, format.substring(format.length - 1));
                }
            }
            selection.paragraphFormat.setList(tempList);
        }
        else if (!isNullOrUndefined(list) && isUpdate) {
            selection.paragraphFormat.setList(list);
        }
        else {
            selection.paragraphFormat.setList(undefined);
        }
    };
    Editor.prototype.addListLevels = function (abstractListAdv, listName, selection) {
        var bulletCharacters = [String.fromCharCode(61558), String.fromCharCode(61656), String.fromCharCode(61607), String.fromCharCode(61623), String.fromCharCode(61608)];
        for (var i = abstractListAdv.levels.length; i < 9; i++) {
            var listLevel = new WListLevel(abstractListAdv);
            if (listName.match('bullet')) {
                listLevel.listLevelPattern = 'Bullet';
                listLevel.numberFormat = bulletCharacters[i < 5 ? i % 5 : i % 5 + 1];
                listLevel.characterFormat.fontFamily = i < 3 || i === 5 ? 'Wingdings' : 'Symbol';
            }
            else {
                if (listName.match('multiLevel')) {
                    for (var j = 0; j < i + 1; j++) {
                        listLevel.numberFormat += '%' + (j + 1).toString() + '.';
                    }
                    listLevel.listLevelPattern = 'Number';
                }
                else {
                    listLevel.numberFormat = '%' + (i + 1).toString() + ')';
                    listLevel.listLevelPattern = i % 3 === 0 ? 'Number'
                        : i % 3 === 1 ? 'LowLetter' : 'LowRoman';
                }
                listLevel.startAt = 1;
                listLevel.restartLevel = i;
            }
            if (i === 0) {
                listLevel.paragraphFormat.leftIndent = 36;
            }
            else {
                listLevel.paragraphFormat.leftIndent = 36 * i;
            }
            listLevel.paragraphFormat.firstLineIndent = -18;
            abstractListAdv.levels.push(listLevel);
            selection.paragraphFormat.listLevelNumber = i;
        }
    };
    /**
     * Inserts the page break at the cursor position.
     *
     * @returns {void}
     */
    Editor.prototype.insertPageBreak = function () {
        if (!this.owner.isReadOnlyMode) {
            if (this.documentHelper.selection.start.paragraph.isInsideTable ||
                this.documentHelper.selection.start.paragraph.isInHeaderFooter) {
                return;
            }
            this.initComplexHistory('PageBreak');
            this.onEnter('PageBreak');
            if (this.editorHistory && !isNullOrUndefined(this.editorHistory.currentHistoryInfo)) {
                this.editorHistory.updateComplexHistory();
            }
            if (this.owner.enableAutoFocus) {
                this.selection.checkForCursorVisibility();
            }
        }
    };
    /**
     * Inserts a column break at cursor position.
     *
     * @returns {void}
     */
    Editor.prototype.insertColumnBreak = function () {
        if (!this.owner.isReadOnlyMode) {
            if (this.documentHelper.selection.start.paragraph.isInsideTable ||
                this.documentHelper.selection.start.paragraph.isInHeaderFooter) {
                return;
            }
            this.initComplexHistory('ColumnBreak');
            var para = this.documentHelper.selection.start.paragraph;
            if (this.viewer instanceof PageLayoutViewer && para.bodyWidget.sectionFormat.columns.length > 1) {
                var lastbody = this.documentHelper.layout.getBodyWidget(para.bodyWidget, false);
                if ((!isNullOrUndefined(lastbody.nextRenderedWidget) && lastbody.page === lastbody.nextRenderedWidget.page)) {
                    this.documentHelper.layout.combineMultiColumn(lastbody);
                }
            }
            this.onEnter('ColumnBreak');
            if (this.editorHistory && !isNullOrUndefined(this.editorHistory.currentHistoryInfo)) {
                this.editorHistory.updateComplexHistory();
            }
            if (this.owner.enableAutoFocus) {
                this.selection.checkForCursorVisibility();
            }
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Editor.prototype.onEnter = function (breakType) {
        this.handledEnter = true;
        var selection = this.documentHelper.selection;
        var format;
        if (isNullOrUndefined(selection.start.paragraph.paragraphFormat.baseStyle) ||
            selection.start.paragraph.paragraphFormat.baseStyle.name === 'Normal' ||
            selection.start.paragraph.paragraphFormat.baseStyle.name === 'Normal (Web)') {
            format = new SelectionCharacterFormat(undefined);
            format.cloneFormat(this.selection.characterFormat);
            var eleme = selection.start.paragraph.lastChild.children[selection.start.paragraph.lastChild.children.length - 1];
            if (eleme instanceof FootnoteElementBox) {
                format.baselineAlignment = 'Normal';
            }
        }
        if (this.isXmlMapped) {
            return;
        }
        if (selection.isEmpty) {
            //ToDo: Need to handle the CTRL + Enter (Page Break) and SHIFT + Enter (Line Break) behavior.
            var hyperlinkField = selection.getHyperlinkField();
            var isSelectionOnHyperlink = !isNullOrUndefined(hyperlinkField);
            if (isSelectionOnHyperlink) {
                selection.fireRequestNavigate(hyperlinkField);
                return;
            }
            var paragraph = selection.start.paragraph;
            if (paragraph.isEmpty() && paragraph.paragraphFormat.listFormat.listId !== -1) {
                this.onApplyListInternal(this.documentHelper.getListById(paragraph.paragraphFormat.listFormat.listId), paragraph.paragraphFormat.listFormat.listLevelNumber - 1);
                return;
            }
        }
        var commentStartToInsert = this.checkAndRemoveComments();
        this.initHistory('Enter');
        var isRemoved = true;
        if (!selection.isEmpty) {
            // this.initHistoryWithSelection(selection, 'Enter');
            isRemoved = this.removeSelectedContents(selection);
        }
        if (isRemoved) {
            selection.owner.isShiftingEnabled = true;
            this.updateInsertPosition();
            var blockInfo = this.selection.getParagraphInfo(selection.start);
            var initialStart = this.selection.getHierarchicalIndex(blockInfo.paragraph, blockInfo.offset.toString());
            this.splitParagraphInternal(selection, selection.start.paragraph, selection.start.currentWidget, selection.start.offset);
            this.setPositionForCurrentIndex(selection.start, initialStart);
            if (!isNullOrUndefined(breakType) && (breakType === 'PageBreak' || breakType === 'ColumnBreak')) {
                var currentParagraph = selection.start.paragraph;
                var breakParagraph = new ParagraphWidget();
                breakParagraph.characterFormat.copyFormat(currentParagraph.characterFormat);
                breakParagraph.paragraphFormat.copyFormat(currentParagraph.paragraphFormat);
                var pageBreak = new TextElementBox();
                switch (breakType) {
                    case 'PageBreak':
                        pageBreak.text = '\f';
                        break;
                    case 'ColumnBreak':
                        pageBreak.text = String.fromCharCode(14);
                        break;
                }
                var line = new LineWidget(breakParagraph);
                line.children.push(pageBreak);
                pageBreak.line = line;
                breakParagraph.childWidgets.push(line);
                if (this.owner.enableTrackChanges && currentParagraph.characterFormat.revisions.length > 0) {
                    var currentRevision = this.retrieveRevisionInOder(currentParagraph.characterFormat);
                    currentRevision.range.push(breakParagraph.characterFormat);
                    breakParagraph.characterFormat.revisions.push(currentRevision);
                    this.owner.trackChangesPane.updateCurrentTrackChanges(currentRevision);
                    breakParagraph.characterFormat.removedIds = [];
                }
                this.insertParagraph(breakParagraph, true);
                selection.selectParagraphInternal(breakParagraph, true);
            }
            var nextNode = selection.start.paragraph.nextWidget;
            if (isNullOrUndefined(nextNode)) {
                nextNode = selection.getNextRenderedBlock(selection.start.paragraph);
            }
            selection.selectParagraphInternal(nextNode, true);
            this.updateEndPosition();
            if (!isNullOrUndefined(breakType) && this.editorHistory) {
                this.owner.editorHistory.updateHistory();
            }
            // if (!isNullOrUndefined(selection.currentHistoryInfo)) {
            //     this.updateComplexHistory();
            // } else {
            this.reLayout(selection);
            var currentPara = this.selection.start.paragraph.containerWidget.firstChild;
            if (!isNullOrUndefined(currentPara)) {
                currentPara.isChangeDetected = false;
                var nextPara = currentPara.nextRenderedWidget;
                while (this.owner.isSpellCheck && !isNullOrUndefined(nextPara)) {
                    currentPara = nextPara;
                    currentPara.isChangeDetected = false;
                    nextPara = currentPara.nextRenderedWidget;
                }
            }
            // }
            var paragraph = selection.start.paragraph.previousWidget;
            if (!isNullOrUndefined(paragraph) && !paragraph.isEmpty() &&
                paragraph.lastChild.children[paragraph.lastChild.children.length - 1] instanceof TextElementBox) {
                this.checkAndConvertToHyperlink(selection, true, paragraph);
            }
        }
        if (!isNullOrUndefined(format) && !isNullOrUndefined(selection.start.paragraph) && selection.start.paragraph.isEmpty()) {
            this.selection.isRetrieveFormatting = true;
            this.selection.characterFormat.cloneFormat(format);
            this.selection.isRetrieveFormatting = false;
        }
        this.documentHelper.layout.islayoutFootnote = false;
        this.updateHistoryForComments(commentStartToInsert);
        this.handledEnter = false;
    };
    Editor.prototype.splitParagraphInternal = function (selection, paragraphAdv, currentLine, offset) {
        var insertIndex = 0;
        var blockIndex = paragraphAdv.index;
        var currentPara = paragraphAdv;
        currentPara.isChangeDetected = (offset === 0) ? true : false;
        while (this.owner.isSpellCheck && !isNullOrUndefined(currentPara.nextRenderedWidget)) {
            currentPara = currentPara.nextRenderedWidget;
            currentPara.isChangeDetected = true;
        }
        var paragraph = new ParagraphWidget();
        var lineWidget = new LineWidget(paragraph);
        paragraph.childWidgets.push(lineWidget);
        //Cop ies the format to new paragraph.
        paragraph.paragraphFormat.ownerBase = paragraph;
        if (currentLine === paragraphAdv.lastChild && offset === selection.getLineLength(currentLine)) {
            if (paragraphAdv.paragraphFormat.baseStyle
                && paragraphAdv.paragraphFormat.baseStyle.name !== 'Normal' && paragraphAdv.paragraphFormat.baseStyle.next instanceof WParagraphStyle) {
                if (paragraphAdv.paragraphFormat.baseStyle.name === paragraphAdv.paragraphFormat.baseStyle.next.name) {
                    paragraph.paragraphFormat.copyFormat(paragraphAdv.paragraphFormat);
                    paragraph.characterFormat.copyFormat(paragraphAdv.characterFormat);
                }
                else {
                    paragraph.paragraphFormat.baseStyle = paragraphAdv.paragraphFormat.baseStyle.next;
                }
                this.selection.skipFormatRetrieval = false;
            }
            else {
                paragraph.paragraphFormat.copyFormat(paragraphAdv.paragraphFormat);
                paragraph.characterFormat.copyFormat(paragraphAdv.characterFormat);
            }
            if (paragraphAdv.lastChild.children.length > 0) {
                paragraphAdv.characterFormat.copyFormat(paragraphAdv.lastChild.children[paragraphAdv.lastChild.children.length - 1].characterFormat);
            }
            // let revisions: Revision[] = [];
            // if (paragraphAdv.characterFormat.revisions.length > 0) {
            //     revisions = paragraphAdv.characterFormat.revisions;
            // } else {
            if (this.owner.enableTrackChanges) {
                var lastLine = paragraphAdv.lastChild;
                if (!isNullOrUndefined(lastLine) && lastLine.children.length > 0) {
                    var lastElement = lastLine.children[lastLine.children.length - 1].previousValidNodeForTracking;
                    //ensure whether para mark can be combined with element revision
                    if (!isNullOrUndefined(lastElement) && !this.checkParaMarkMatchedWithElement(lastElement, paragraphAdv.characterFormat, false, 'Insertion')) {
                        this.insertParaRevision(paragraphAdv);
                    }
                }
            }
            //}
            //ToDo in future: Need to skip copying formattings to new paragraph, if the style for following paragraph is same style.
            insertIndex++;
            blockIndex++;
        }
        else {
            paragraph.paragraphFormat.copyFormat(paragraphAdv.paragraphFormat);
            paragraph.characterFormat.copyFormat(paragraphAdv.characterFormat);
            if (offset > 0 || !currentLine.isFirstLine()) {
                paragraphAdv = paragraphAdv.combineWidget(this.owner.viewer);
                this.moveInlines(paragraphAdv, paragraph, 0, 0, paragraphAdv.firstChild, offset, currentLine);
                if (this.owner.enableTrackChanges) {
                    this.insertParaRevision(paragraph, paragraphAdv.firstChild);
                }
            }
            else {
                var paragraphWidget = paragraphAdv.previousRenderedWidget;
                var isPreviousRevision = false;
                if (!isNullOrUndefined(paragraphWidget) && paragraphWidget instanceof ParagraphWidget) {
                    isPreviousRevision = paragraphWidget.characterFormat.revisions.length > 0 ? true : false;
                }
                if (this.owner.enableTrackChanges) {
                    if (!isPreviousRevision) {
                        var firstLine = paragraphAdv.firstChild;
                        var firstElement = firstLine.children[0].previousValidNodeForTracking;
                        //ensure whether para mark can be combined with element revision
                        if (!isNullOrUndefined(firstElement) && !this.checkParaMarkMatchedWithElement(firstElement, paragraph.characterFormat, true, 'Insertion')) {
                            this.insertParaRevision(paragraph);
                        }
                        else if (isNullOrUndefined(firstElement)) {
                            insertIndex++;
                            blockIndex++;
                        }
                    }
                    else {
                        if (!this.checkToMatchEmptyParaMark(paragraphAdv, paragraph)) {
                            this.insertParaRevision(paragraphAdv);
                        }
                    }
                }
            }
            paragraphAdv = paragraphAdv.getSplitWidgets()[0];
        }
        insertIndex += paragraphAdv.getIndex();
        var container = paragraphAdv.containerWidget;
        var childNodes = container.childWidgets;
        childNodes.splice(insertIndex, 0, paragraph);
        paragraph.containerWidget = container;
        paragraph.index = blockIndex;
        this.updateNextBlocksIndex(paragraph, true);
        if ((!isNullOrUndefined(container.containerWidget) && container.containerWidget instanceof FootNoteWidget) || (container instanceof TableCellWidget && !isNullOrUndefined(container.bodyWidget) && container.bodyWidget.containerWidget instanceof FootNoteWidget)) {
            var height = this.documentHelper.textHelper.getParagraphMarkSize(paragraph.characterFormat).Height;
            if (container instanceof TableCellWidget) {
                container.bodyWidget.height += height;
                container.bodyWidget.containerWidget.height += height;
            }
            else {
                container.containerWidget.height += height;
                container.height += height;
            }
        }
        if (this.owner.enableTrackChanges && (paragraph.characterFormat.revisions.length === 0 && paragraphAdv.characterFormat.revisions.length === 0)) {
            if (!this.checkToMatchEmptyParaMark(paragraphAdv)) {
                this.insertParaRevision(paragraphAdv);
            }
        }
        this.documentHelper.layout.layoutBodyWidgetCollection(blockIndex, container, paragraph, false);
    };
    Editor.prototype.insertParaRevision = function (paragraph, firstChild) {
        if (this.owner.enableTrackChanges && isNullOrUndefined(firstChild) && !this.isRevisionMatched(paragraph.characterFormat, 'Insertion')) {
            paragraph.characterFormat.revisions = [];
            this.insertRevision(paragraph.characterFormat, 'Insertion');
        }
        //If it is spitted para, we need to ensure whether first element of the spitted para matches with inserted revision
        if (!isNullOrUndefined(firstChild)) {
            if (firstChild.paragraph.isInsideTable) {
                this.insertRevision(paragraph.characterFormat, 'Insertion');
                return;
            }
            this.applyRevisionForParaMark(paragraph, firstChild, 'Insertion', true);
            // let firstElement: ElementBox = firstChild.children[0];
            // firstElement = firstElement.nextValidNodeForTracking;
            // let lastLine: LineWidget = paragraph.lastChild as LineWidget;
            // let lastElement: ElementBox = lastLine.children.length === 0 ? undefined : lastLine.children[lastLine.children.length - 1].previousValidNodeForTracking;
            // let isCombined: boolean = false;
            // //Ensure revision matched with inserted para mark
            // if (!isNullOrUndefined(lastElement)) {
            //     isCombined = this.checkParaMarkMatchedWithElement(lastElement, paragraph.characterFormat, true);
            // }
            // if (!isNullOrUndefined(firstElement)) {
            //     if (paragraph.characterFormat.revisions.length > 0) {
            //         if (this.isRevisionMatched(firstElement, 'Insertion')) {
            //             let revisionToInclude: Revision = paragraph.characterFormat.revisions[0];
            //             let matchedRevisions: Revision[] = this.getMatchedRevisionsToCombine(firstElement.revisions, 'Insertion');
            //             for (let i: number = 0; i < matchedRevisions.length; i++) {
            //                 isCombined = true;
            //                 this.clearAndUpdateRevisons(matchedRevisions[i].range, revisionToInclude, revisionToInclude.range.indexOf(paragraph.characterFormat) + 1);
            //             }
            //         }
            //     } else {
            //         isCombined = this.checkParaMarkMatchedWithElement(firstElement, paragraph.characterFormat, false);
            //     }
            // }
            // if (!isCombined) {
            //     this.insertRevision(paragraph.characterFormat, 'Insertion');
            // }
        }
    };
    Editor.prototype.applyRevisionForParaMark = function (paragraph, firstChild, revisionType, splitRevision) {
        var firstElement = firstChild.children[0];
        if (isNullOrUndefined(firstElement)) {
            return;
        }
        firstElement = firstElement.nextValidNodeForTracking;
        var lastLine = paragraph.lastChild;
        var lastElement = lastLine.children.length === 0 ? undefined : lastLine.children[lastLine.children.length - 1].previousValidNodeForTracking;
        var isCombined = false;
        var prevRevCount = paragraph.characterFormat.revisions.length;
        //Ensure revision matched with inserted para mark
        if (!isNullOrUndefined(lastElement)) {
            isCombined = this.checkParaMarkMatchedWithElement(lastElement, paragraph.characterFormat, false, revisionType);
        }
        if (!isNullOrUndefined(firstElement)) {
            //Ensure previous inserted para mark revision matched with first element of the next paragraph.
            if (paragraph.characterFormat.revisions.length > prevRevCount) {
                if (this.isRevisionMatched(firstElement, revisionType)) {
                    var revisionToInclude = paragraph.characterFormat.revisions[0];
                    var matchedRevisions = this.getMatchedRevisionsToCombine(firstElement.revisions, revisionType);
                    for (var i = 0; i < matchedRevisions.length; i++) {
                        if (matchedRevisions[i] !== revisionToInclude) {
                            isCombined = true;
                            this.clearAndUpdateRevisons(matchedRevisions[i].range, revisionToInclude, revisionToInclude.range.indexOf(paragraph.characterFormat) + 1);
                        }
                    }
                }
            }
            else {
                isCombined = this.checkParaMarkMatchedWithElement(firstElement, paragraph.characterFormat, true, revisionType);
            }
        }
        if (!isCombined && (this.owner.enableTrackChanges || firstChild.paragraph.characterFormat.revisions.length > 0)) {
            this.insertRevision(paragraph.characterFormat, revisionType);
            // for spitted paragraph on moving content we maintain same revision, so if it not matched with inserted paragraph then we need to spit it.
            if (splitRevision && lastElement.revisions.length > 0 && firstElement.revisions.length > 0) {
                this.updateRevisionForSpittedTextElement(lastElement, firstElement);
            }
        }
    };
    //Combines para mark with element revision
    Editor.prototype.checkParaMarkMatchedWithElement = function (lastElement, characterFormat, isBegin, revisionType) {
        var matchedRevisions = this.getMatchedRevisionsToCombine(lastElement.revisions, revisionType);
        if (matchedRevisions.length > 0) {
            this.mapMatchedRevisions(matchedRevisions, lastElement, characterFormat, isBegin);
            return true;
        }
        return false;
    };
    Editor.prototype.checkToMatchEmptyParaMark = function (paraWidget, paragraphAdv) {
        var prevPara = paraWidget.previousRenderedWidget;
        if (!isNullOrUndefined(prevPara) && prevPara instanceof ParagraphWidget && prevPara.characterFormat.revisions.length > 0) {
            var matchedRevisions = this.getMatchedRevisionsToCombine(prevPara.characterFormat.revisions, 'Insertion');
            if (matchedRevisions.length > 0) {
                if (!isNullOrUndefined(paragraphAdv)) {
                    this.mapMatchedRevisions(matchedRevisions, prevPara.characterFormat, paragraphAdv.characterFormat, false);
                }
                else {
                    this.mapMatchedRevisions(matchedRevisions, prevPara.characterFormat, paraWidget.characterFormat, false);
                }
                return true;
            }
        }
        return false;
    };
    Editor.prototype.checkToMatchEmptyParaMarkBack = function (paraWidget) {
        var prevPara = paraWidget.nextRenderedWidget;
        var lineWid = prevPara.childWidgets[0];
        var textWid = lineWid.children[0];
        if (!isNullOrUndefined(prevPara) && prevPara instanceof ParagraphWidget && prevPara.characterFormat.revisions.length > 0) {
            var matchedRevisions = this.getMatchedRevisionsToCombine(prevPara.characterFormat.revisions, 'Deletion');
            if (matchedRevisions.length > 0) {
                if (prevPara != undefined && lineWid != undefined && textWid != undefined && textWid.revisions.length == 1) {
                    this.mapMatchedRevisions(matchedRevisions, textWid, paraWidget.characterFormat, true);
                    return true;
                }
                else {
                    this.mapMatchedRevisions(matchedRevisions, prevPara.characterFormat, paraWidget.characterFormat, true);
                    return true;
                }
            }
        }
        else if (textWid != undefined && textWid.revisions.length == 1) {
            var matchedRevisions = this.getMatchedRevisionsToCombine(textWid.revisions, 'Deletion');
            if (matchedRevisions.length > 0) {
                this.mapMatchedRevisions(matchedRevisions, textWid, paraWidget.characterFormat, true);
                return true;
            }
        }
        return false;
    };
    /**
     * @private
     * @returns {void}
     */
    Editor.prototype.updateNextBlocksIndex = function (block, increaseIndex) {
        if (isNullOrUndefined(block.nextRenderedWidget) || block.nextRenderedWidget instanceof ParagraphWidget && block.bodyWidget.index !== block.nextRenderedWidget.bodyWidget.index) {
            return;
        }
        var nextIndex = block.containerWidget.childWidgets.indexOf(block) + 1;
        if (block.containerWidget instanceof BodyWidget && !(block.containerWidget.containerWidget instanceof FootNoteWidget)) {
            // let startSel = this.selection.startOffset.substring(0,1);
            // let endSel = this.selection.endOffset.substring(0,1);
            if (block.containerWidget.page.bodyWidgets.length > 1 && block.containerWidget.sectionFormat.numberOfColumns > 1) {
                var fromSectionIndex = block.containerWidget.indexInOwner;
                for (var i = this.documentHelper.pages.indexOf(block.containerWidget.page); i < this.documentHelper.pages.length; i++) {
                    var page = this.documentHelper.pages[i];
                    for (var j = 0; j < page.bodyWidgets.length; j++) {
                        if (page.bodyWidgets[j].indexInOwner === fromSectionIndex) {
                            for (var k = nextIndex; k < page.bodyWidgets[j].childWidgets.length; k++) {
                                var childWidget = page.bodyWidgets[j].childWidgets[k];
                                this.updateIndex(childWidget, increaseIndex);
                            }
                            nextIndex = 0;
                            if (!isNullOrUndefined(page.bodyWidgets[j].nextRenderedWidget) && page.bodyWidgets[j].nextRenderedWidget.sectionIndex === page.bodyWidgets[j].sectionIndex) {
                                fromSectionIndex++;
                            }
                        }
                    }
                    if (fromSectionIndex !== block.containerWidget.indexInOwner && !isNullOrUndefined(page.bodyWidgets[page.bodyWidgets.length - 1].nextRenderedWidget) && page.bodyWidgets[page.bodyWidgets.length - 1].nextRenderedWidget.sectionFormat.columns.length > 1) {
                        fromSectionIndex = 0;
                    }
                }
            }
            else if (block.containerWidget.page.bodyWidgets.length > 1) {
                var currentSectionIndex = block.containerWidget.index;
                for (var i = this.documentHelper.pages.indexOf(block.containerWidget.page); i < this.documentHelper.pages.length; i++) {
                    var page = this.documentHelper.pages[i];
                    for (var j = 0; j < page.bodyWidgets.length; j++) {
                        if (page.bodyWidgets[j].index === currentSectionIndex) {
                            for (var k = nextIndex; k < page.bodyWidgets[j].childWidgets.length; k++) {
                                var childWidget = page.bodyWidgets[j].childWidgets[k];
                                this.updateIndex(childWidget, increaseIndex);
                            }
                            nextIndex = 0;
                        }
                    }
                }
            }
            else {
                var currentSectionIndex = block.containerWidget.index;
                for (var j = this.documentHelper.pages.indexOf(block.containerWidget.page); j < this.documentHelper.pages.length; j++) {
                    var page = this.documentHelper.pages[j];
                    if (page.bodyWidgets[0].index === currentSectionIndex) {
                        for (var k = nextIndex; k < page.bodyWidgets[0].childWidgets.length; k++) {
                            var childWidget = page.bodyWidgets[0].childWidgets[k];
                            this.updateIndex(childWidget, increaseIndex);
                        }
                        nextIndex = 0;
                    }
                    else {
                        return;
                    }
                }
            }
        }
        else if (block.containerWidget instanceof TableCellWidget) {
            var cells = block.containerWidget.getSplitWidgets();
            var currentCellIndex = cells.indexOf(block.containerWidget);
            for (var x = currentCellIndex; x < cells.length; x++) {
                var blocks = cells[x].childWidgets;
                for (var y = nextIndex; y < blocks.length; y++) {
                    this.updateIndex(blocks[y], increaseIndex);
                }
                currentCellIndex = 0;
                nextIndex = 0;
            }
        }
        else if (block.containerWidget instanceof TableRowWidget) {
            for (var i = nextIndex; i < block.containerWidget.childWidgets.length; i++) {
                var cell = block.containerWidget.childWidgets[i];
                if (cell.rowIndex === block.containerWidget.index) {
                    this.updateIndex(cell, increaseIndex);
                }
            }
        }
        else if (block.containerWidget instanceof TableWidget) {
            for (var i = nextIndex; i < block.containerWidget.childWidgets.length; i++) {
                var row = block.containerWidget.childWidgets[i];
                this.updateIndex(row, increaseIndex);
                for (var j = 0; j < row.childWidgets.length; j++) {
                    row.childWidgets[j].rowIndex = row.index;
                }
            }
            //update Row index of all the cell
        }
        else if (block.containerWidget instanceof HeaderFooterWidget || block.containerWidget instanceof TextFrame
            || (!isNullOrUndefined(block.containerWidget) && block.containerWidget.containerWidget instanceof FootNoteWidget)) {
            for (var i = nextIndex; i < block.containerWidget.childWidgets.length; i++) {
                var nextBlock = block.containerWidget.childWidgets[i];
                this.updateIndex(nextBlock, increaseIndex);
            }
        }
    };
    Editor.prototype.updateIndex = function (widget, increment) {
        if (increment) {
            widget.index++;
        }
        else {
            widget.index--;
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Editor.prototype.updateEndPosition = function () {
        var selection = this.documentHelper.selection;
        if (this.editorHistory && !isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo)) {
            this.updateHistoryPosition(selection.start, false);
        }
    };
    Editor.prototype.checkAndRemoveComments = function () {
        var selection = this.selection;
        if (selection.isEmpty || this.owner.enableTrackChanges) {
            return [];
        }
        var initComplexHistory = false;
        var comments = this.getSelectedComments();
        if (comments.commentEndInfo.length > 0 || comments.commentStartInfo.length > 0) {
            if (!initComplexHistory) {
                initComplexHistory = true;
                this.initComplexHistory('RemoveComment');
            }
            var startPosition = this.selection.start;
            var endPosition = this.selection.end;
            if (!this.selection.isForward) {
                startPosition = this.selection.end;
                endPosition = this.selection.start;
            }
            //Get start and end position in order.
            var startBlockInfo = this.selection.getParagraphInfo(startPosition);
            var endBlockInfo = this.selection.getParagraphInfo(endPosition);
            for (var j = 0; j < comments.commentEndInfo.length; j++) {
                var commentToDelete = comments.commentEndInfo[j].comment;
                var commentStart = commentToDelete.commentStart;
                var commentEndMark = commentToDelete.commentEnd;
                var commentStartBlockInfo = this.selection.getParagraphInfoInternal(commentStart.line, commentStart.line.getOffset(commentStart, 0));
                var commentEndBlockInfo = this.selection.getParagraphInfoInternal(commentEndMark.line, commentEndMark.line.getOffset(commentEndMark, 0));
                if (endBlockInfo.paragraph === commentEndBlockInfo.paragraph) {
                    if (commentToDelete.replyComments.length > 0) {
                        for (var m = 0; m < commentToDelete.replyComments.length; m++) {
                            var replyComment = commentToDelete.replyComments[m];
                            if (!isNullOrUndefined(replyComment.commentEnd)) {
                                endBlockInfo.offset--;
                            }
                        }
                    }
                    endBlockInfo.offset--;
                }
                if (startBlockInfo.paragraph === commentStartBlockInfo.paragraph) {
                    var updateStartPosition = commentStartBlockInfo.offset < startBlockInfo.offset;
                    if (commentToDelete.replyComments.length > 0) {
                        for (var m = 0; m < commentToDelete.replyComments.length; m++) {
                            var replyComment = commentToDelete.replyComments[m];
                            if (!isNullOrUndefined(replyComment.commentStart)) {
                                var replyCommentStart = this.selection.getParagraphInfoInternal(replyComment.commentStart.line, replyComment.commentStart.line.getOffset(replyComment.commentStart, 0));
                                if (replyCommentStart.offset < startBlockInfo.offset) {
                                    startBlockInfo.offset--;
                                }
                                if (endBlockInfo.paragraph === commentStartBlockInfo.paragraph) {
                                    endBlockInfo.offset--;
                                }
                            }
                        }
                    }
                    if (updateStartPosition) {
                        startBlockInfo.offset--;
                    }
                    if (endBlockInfo.paragraph === commentStartBlockInfo.paragraph) {
                        endBlockInfo.offset--;
                    }
                }
                this.deleteCommentInternal(commentToDelete);
            }
            if (comments.commentStartInfo.length > 0) {
                for (var k = 0; k < comments.commentStartInfo.length; k++) {
                    if (comments.commentStartInfo[k].line.paragraph.equals(endBlockInfo.paragraph)) {
                        endBlockInfo.offset--;
                    }
                    this.removeInline(comments.commentStartInfo[k]);
                }
            }
            var startLineInfo = selection.getLineInfoBasedOnParagraph(startBlockInfo.paragraph, startBlockInfo.offset);
            selection.start.setPositionFromLine(startLineInfo.line, startLineInfo.offset);
            var endLineInfo = selection.getLineInfoBasedOnParagraph(endBlockInfo.paragraph, endBlockInfo.offset);
            selection.end.setPositionFromLine(endLineInfo.line, endLineInfo.offset);
        }
        return comments.commentStartInfo;
    };
    Editor.prototype.updateHistoryForComments = function (removedCommentStart) {
        if (this.editorHistory && !isNullOrUndefined(this.editorHistory.currentHistoryInfo)
            && this.editorHistory.currentHistoryInfo.action === 'RemoveComment') {
            if (!isNullOrUndefined(removedCommentStart)) {
                for (var i = 0; i < removedCommentStart.length; i++) {
                    this.initInsertInline(removedCommentStart[i], false);
                }
            }
            this.editorHistory.currentHistoryInfo.endPosition = this.selection.startOffset;
            this.editorHistory.updateComplexHistory();
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Editor.prototype.onBackSpace = function () {
        this.removeEditRange = true;
        var selection = this.documentHelper.selection;
        this.documentHelper.triggerSpellCheck = true;
        if (selection.bookmarks.length > 0) {
            this.extendSelectionToBookmarkStart();
        }
        if (selection.isEmpty) {
            this.singleBackspace(selection, false);
        }
        else {
            var comments = this.checkAndRemoveComments();
            this.initHistory('BackSpace');
            var skipBackSpace = this.deleteSelectedContents(selection, true);
            if (this.editorHistory && this.editorHistory.currentBaseHistoryInfo) {
                if (skipBackSpace) {
                    this.editorHistory.currentBaseHistoryInfo = undefined;
                }
                else {
                    if (this.checkEndPosition(selection)) {
                        this.updateHistoryPosition(selection.end, false);
                    }
                    this.reLayout(selection);
                    this.insertSpaceInFormField();
                }
            }
            if (this.editorHistory && !isNullOrUndefined(this.editorHistory.currentHistoryInfo)) {
                for (var k = 0; k < comments.length; k++) {
                    this.initInsertInline(comments[k], false);
                }
                this.editorHistory.currentHistoryInfo.endPosition = this.selection.startOffset;
                this.editorHistory.updateComplexHistory();
            }
            if (this.owner.isSpellCheck) {
                this.documentHelper.triggerSpellCheck = false;
            }
        }
        this.removeEditRange = false;
        this.documentHelper.layout.islayoutFootnote = false;
        this.updateXmlMappedContentControl();
    };
    /**
     * @private
     * @returns {boolean}
     */
    Editor.prototype.insertRemoveBookMarkElements = function (isUpdateComplexHistory) {
        var isHandledComplexHistory = false;
        for (var i = 0; i < this.removedBookmarkElements.length; i++) {
            var bookMark = this.removedBookmarkElements[i];
            if (bookMark.bookmarkType === 0) {
                var bookMarkStart = bookMark;
                if (bookMarkStart && bookMarkStart.reference && this.removedBookmarkElements.indexOf(bookMarkStart.reference) !== -1) {
                    var endIndex = this.removedBookmarkElements.indexOf(bookMarkStart.reference);
                    var startIndex = this.removedBookmarkElements.indexOf(bookMarkStart);
                    this.removedBookmarkElements.splice(endIndex, 1);
                    this.removedBookmarkElements.splice(startIndex, 1);
                    i--;
                }
                else {
                    if (this.editorHistory.currentBaseHistoryInfo && !isUpdateComplexHistory) {
                        this.initComplexHistory(this.editorHistory.currentBaseHistoryInfo.action);
                        this.editorHistory.updateHistory();
                    }
                    this.initInsertInline(bookMarkStart.clone(), undefined, true);
                    if (this.editorHistory.currentHistoryInfo && i === this.removedBookmarkElements.length - 1 && this.removedEditRangeStartElements.length === 0 && this.removedEditRangeEndElements.length === 0) {
                        this.editorHistory.updateComplexHistory();
                        isHandledComplexHistory = true;
                    }
                }
            }
            else {
                var bookMarkEnd = bookMark;
                if (bookMarkEnd && bookMarkEnd.reference && this.removedBookmarkElements.indexOf(bookMarkEnd.reference) !== -1) {
                    var endIndex = this.removedBookmarkElements.indexOf(bookMarkEnd.reference);
                    var startIndex = this.removedBookmarkElements.indexOf(bookMarkEnd);
                    this.removedBookmarkElements.splice(endIndex, 1);
                    this.removedBookmarkElements.splice(startIndex, 1);
                    i--;
                }
                else {
                    if (this.editorHistory.currentBaseHistoryInfo && !isUpdateComplexHistory) {
                        this.initComplexHistory(this.editorHistory.currentBaseHistoryInfo.action);
                        this.editorHistory.updateHistory();
                    }
                    this.initInsertInline(bookMarkEnd.clone(), undefined, true);
                    if (this.editorHistory.currentHistoryInfo && i === this.removedBookmarkElements.length - 1 && this.removedEditRangeStartElements.length === 0 && this.removedEditRangeEndElements.length === 0) {
                        this.editorHistory.updateComplexHistory();
                        isHandledComplexHistory = true;
                    }
                }
            }
        }
        this.removedBookmarkElements = [];
        return isHandledComplexHistory;
    };
    /**
     * @private
     * @returns {boolean}
     */
    Editor.prototype.insertRemovedEditRangeEndElements = function (isUpdateComplexHistory) {
        var isHandledComplexHistory = false;
        for (var i = this.removedEditRangeEndElements.length - 1; i >= 0; i--) {
            var editRangeEndElementBox = this.removedEditRangeEndElements[i];
            if (editRangeEndElementBox && this.removedEditRangeStartElements.indexOf(editRangeEndElementBox.editRangeStart) !== -1) {
                var endIndex = this.removedEditRangeEndElements.indexOf(editRangeEndElementBox);
                var startIndex = this.removedEditRangeStartElements.indexOf(editRangeEndElementBox.editRangeStart);
                this.removedEditRangeEndElements.splice(endIndex, 1);
                this.removedEditRangeStartElements.splice(startIndex, 1);
                i--;
            }
            else {
                if (this.editorHistory.currentBaseHistoryInfo && !isUpdateComplexHistory) {
                    this.initComplexHistory(this.editorHistory.currentBaseHistoryInfo.action);
                    this.editorHistory.updateHistory();
                }
                this.initInsertInline(editRangeEndElementBox.clone(), undefined, true);
                var inlineObj = this.selection.start.paragraph.getInline(this.selection.start.offset, 0);
                inlineObj.element.editRangeStart.editRangeEnd = inlineObj.element;
                if (this.editorHistory.currentHistoryInfo && i === 0 && this.removedEditRangeStartElements.length === 0 && this.removedBookmarkElements.length === 0) {
                    this.editorHistory.updateComplexHistory();
                    isHandledComplexHistory = true;
                }
            }
        }
        this.removedEditRangeEndElements = [];
        return isHandledComplexHistory;
    };
    /**
     * @private
     * @returns {boolean}
     */
    Editor.prototype.insertRemovedEditRangeStartElements = function (isUpdateComplexHistory) {
        var isHandledComplexHistory = false;
        for (var i = 0; i < this.removedEditRangeStartElements.length; i++) {
            var editRangeStartElementBox = this.removedEditRangeStartElements[i];
            if (editRangeStartElementBox && this.removedEditRangeEndElements.indexOf(editRangeStartElementBox.editRangeEnd) !== -1) {
                var endIndex = this.removedEditRangeEndElements.indexOf(editRangeStartElementBox.editRangeEnd);
                var startIndex = this.removedEditRangeStartElements.indexOf(editRangeStartElementBox);
                this.removedEditRangeEndElements.splice(endIndex, 1);
                this.removedEditRangeStartElements.splice(startIndex, 1);
                i--;
            }
            else {
                if (this.editorHistory.currentBaseHistoryInfo && !isUpdateComplexHistory) {
                    this.initComplexHistory(this.editorHistory.currentBaseHistoryInfo.action);
                    this.editorHistory.updateHistory();
                }
                this.initInsertInline(editRangeStartElementBox.clone(), undefined, true);
                var inlineObj = this.selection.start.paragraph.getInline(this.selection.start.offset, 0);
                inlineObj.element.editRangeEnd.editRangeStart = inlineObj.element;
                if (this.editorHistory.currentHistoryInfo && i === this.removedEditRangeStartElements.length - 1 && this.removedBookmarkElements.length === 0 && this.removedEditRangeEndElements.length === 0) {
                    this.editorHistory.updateComplexHistory();
                    isHandledComplexHistory = true;
                }
            }
        }
        this.removedEditRangeStartElements = [];
        return isHandledComplexHistory;
    };
    /**
     * @private
     * @param {Selection} selection - Specifies the selection
     * @param {boolean} isBackSpace - Specifies is backspace.
     * @returns {boolean}
     */
    Editor.prototype.deleteSelectedContents = function (selection, isBackSpace, skipDeletecell) {
        var skipBackSpace = this.deleteSelectedContentInternal(selection, isBackSpace, selection.start, selection.end, skipDeletecell);
        var textPosition = selection.getTextPosBasedOnLogicalIndex(selection.editPosition);
        selection.selectContent(textPosition, true);
        return skipBackSpace;
    };
    Editor.prototype.removeWholeElement = function (selection) {
        this.initHistory('BackSpace');
        this.deleteSelectedContents(selection, true);
        if (this.checkEndPosition(selection)) {
            this.updateHistoryPosition(selection.end, false);
        }
        this.reLayout(selection);
    };
    Editor.prototype.getSelectedComments = function () {
        var comments = this.documentHelper.comments;
        var commentEnds = [];
        var commentStarts = [];
        for (var i = 0; i < comments.length; i++) {
            var comment = comments[i];
            var commentEnd = comment.commentEnd;
            var commentStart = comment.commentStart;
            if (!isNullOrUndefined(commentEnd) && this.selection.isElementInSelection(commentEnd, false)) {
                commentEnds.push(commentEnd);
            }
            else if (!isNullOrUndefined(commentStart) && this.selection.isElementInSelection(commentStart, true)) {
                commentStarts.push(commentStart);
                for (var j = 0; j < comment.replyComments.length; j++) {
                    if (comment.replyComments[j].commentStart) {
                        commentStarts.push(comment.replyComments[j].commentStart);
                    }
                }
            }
        }
        return { commentStartInfo: commentStarts, commentEndInfo: commentEnds };
    };
    /**
     * Remove single character on left of cursor position
     *
     * @param {Selection} selection - Specifies the selection
     * @param {boolean} isRedoing - Specified the is redoing.
     * @private
     * @returns {void}
     */
    Editor.prototype.singleBackspace = function (selection, isRedoing) {
        var history = this.editorHistory;
        // If backspace is pressed after auto format to hyperlink is done, need to undo auto format.
        if (history && !isRedoing && !history.canRedo() && history.canUndo()) {
            var historyInfo = history.undoStack[history.undoStack.length - 1];
            var startBlockInfo = this.selection.getParagraphInfo(selection.start);
            var endBlockInfo = this.selection.getParagraphInfo(selection.end);
            if (historyInfo.action === 'AutoFormatHyperlink' && historyInfo.insertPosition === this.selection.getHierarchicalIndex(startBlockInfo.paragraph, startBlockInfo.offset.toString()) &&
                historyInfo.endPosition === this.selection.getHierarchicalIndex(endBlockInfo.paragraph, endBlockInfo.offset.toString())) {
                history.undo();
                return;
            }
        }
        var isCommentDelete = false;
        var paragraph = selection.start.paragraph;
        var currentLineWidget = selection.start.currentWidget;
        var offset = selection.start.offset;
        var indexInInline = 0;
        var inlineObj = currentLineWidget.getInline(offset, indexInInline);
        var inline = inlineObj.element;
        var initComplextHistory = false;
        var previousOffset = offset;
        var updateSelection = false;
        var previousNode;
        while (inline instanceof CommentCharacterElementBox) {
            var commentMark = inline;
            inline = inline.previousNode;
            if (isNullOrUndefined(inline)) {
                inline = previousNode;
            }
            if (!isNullOrUndefined(inline) && inline.commentType == 0) {
                previousNode = inline.previousNode;
            }
            if (inline) {
                previousOffset = inline.length;
            }
            if (commentMark.commentType === 0 && (isNullOrUndefined(inline) || !(inline instanceof CommentCharacterElementBox))) {
                if (isNullOrUndefined(inline)) {
                    inline = commentMark;
                    previousOffset = 0;
                }
                else {
                    previousOffset = inline.length;
                }
                updateSelection = true;
                break;
            }
            else if (commentMark.commentType === 1) {
                if (!initComplextHistory) {
                    this.initComplexHistory('RemoveComment');
                    initComplextHistory = true;
                }
                this.deleteCommentInternal(commentMark.comment);
                updateSelection = true;
            }
        }
        if (updateSelection) {
            //When paragraph has only comment end mark, there will be no previous inline and comment end mark will be delete
            //And paragraph will become empty paragraph.
            //So handled special case to update selection.
            if (isNullOrUndefined(inline)) {
                var lineWidget = paragraph.childWidgets[0];
                selection.start.setPositionParagraph(lineWidget, 0);
                selection.end.setPositionParagraph(lineWidget, 0);
            }
            else {
                paragraph = inline.line.paragraph;
                offset = inline.line.getOffset(inline, previousOffset);
                selection.start.setPositionParagraph(inline.line, offset);
                selection.end.setPositionParagraph(inline.line, offset);
            }
        }
        if (this.selection.isInlineFormFillMode()) {
            if (inline instanceof FieldElementBox && inline.fieldType === 2) {
                return;
            }
            var resultText = this.getFieldResultText();
            if (resultText.length === 1) {
                this.selection.selectFieldInternal(this.selection.getCurrentFormField());
                this.insertTextInternal(this.documentHelper.textHelper.repeatChar(this.documentHelper.textHelper.getEnSpaceCharacter(), 5), true);
                this.selection.selectTextElementStartOfField(this.selection.getCurrentFormField());
                return;
            }
        }
        indexInInline = inlineObj.index;
        if (inline instanceof TextElementBox) {
            inline.ignoreOnceItems = [];
        }
        if (inline instanceof TextElementBox) {
            inline.ignoreOnceItems = [];
        }
        var previousInline = inline;
        if (inline instanceof FieldElementBox && inline.fieldType === 2) {
            if (HelperMethods.isLinkedFieldCharacter(inline)) {
                var begin = inline.fieldBegin;
                var end = inline.fieldEnd;
                if (begin.nextNode instanceof BookmarkElementBox && begin.nextNode.reference) {
                    end = begin.nextNode.reference;
                }
                selection.start.setPositionParagraph(begin.line, begin.line.getOffset(begin, 0));
                selection.end.setPositionParagraph(end.line, end.line.getOffset(end, 0) + 1);
                selection.fireSelectionChanged(true);
                return;
            }
        }
        if (!this.owner.enableTrackChanges && inline instanceof FootnoteElementBox) {
            if (inline.footnoteType === 'Footnote') {
                this.removeFootnote(inline);
            }
            else {
                this.removeEndnote(inline);
            }
        }
        if (inline && (inline instanceof ContentControl || inline.previousNode instanceof ContentControl)) {
            if (inline instanceof ContentControl && inline.previousNode && !(inline.previousElement instanceof ListTextElementBox)) {
                inline = inline.previousNode;
                paragraph = inline.line.paragraph;
                offset = inline.line.getOffset(inline, inline.length);
            }
            if (inline && inline.length === 1 && inline.nextNode instanceof ContentControl
                && inline.previousNode instanceof ContentControl) {
                var start = inline.previousNode;
                var end = inline.nextNode;
                if (!start.contentControlProperties.lockContentControl) {
                    selection.start.setPositionParagraph(start.line, start.line.getOffset(start, 0));
                    selection.end.setPositionParagraph(end.line, end.line.getOffset(end, 0) + 1);
                    this.removeWholeElement(selection);
                    return;
                }
            }
        }
        // if (inline instanceof CommentCharacterElementBox && inline.commentType === 1) {
        //     let comment: CommentElementBox = inline.comment;
        //     if (comment.isReply) {
        //         comment = comment.ownerComment;
        //     }
        //     while (inline instanceof CommentCharacterElementBox) {
        //         inline = inline.previousNode;
        //     }
        //     this.deleteCommentInternal(comment);
        //     paragraph = inline.line.paragraph;
        //     offset = inline.line.getOffset(inline, inline.length);
        //     selection.start.setPositionParagraph(inline.line, offset);
        //     selection.end.setPositionParagraph(inline.line, offset);
        //     isCommentDelete = true;
        // }
        if (inline instanceof FieldElementBox && inline.fieldType === 1 && !this.selection.isInlineFormFillMode()) {
            var prevInline = selection.getPreviousValidElement(inline);
            if (prevInline instanceof FieldElementBox) {
                inline = prevInline.fieldBegin;
                paragraph = inline.line.paragraph;
                offset = inline.line.getOffset(inline, 0);
                if (inline.nextNode instanceof BookmarkElementBox && inline.nextNode.reference) {
                    var start = inline.nextNode.reference;
                    selection.start.setPositionParagraph(start.line, start.line.getOffset(start, 1));
                }
                selection.end.setPositionParagraph(inline.line, offset); //Selects the entire field.
                selection.fireSelectionChanged(true);
                return;
            }
            else if (prevInline !== inline) {
                inline = prevInline; //Updates the offset to delete next content.
                paragraph = inline.line.paragraph;
                offset = inline.line.getOffset(inline, inline.length);
            }
        }
        if (inline instanceof EditRangeStartElementBox || inline instanceof EditRangeEndElementBox) {
            if ((inline.nextNode instanceof EditRangeEndElementBox && inline.editRangeEnd === inline.nextNode)
                || (inline.previousNode instanceof EditRangeStartElementBox
                    && inline.editRangeStart === inline.previousNode)) {
                return;
            }
            if (inline instanceof EditRangeStartElementBox && !(inline.previousNode instanceof EditRangeEndElementBox)) {
                return;
            }
            if (inline instanceof EditRangeEndElementBox) {
                do {
                    if (!isNullOrUndefined(inline.previousNode)) {
                        inline = inline.previousNode;
                        paragraph = inline.line.paragraph;
                        offset = inline.line.getOffset(inline, inline.length);
                    }
                    else {
                        break;
                    }
                } while (inline instanceof EditRangeEndElementBox);
            }
            if (inline.length === 1 && inline.nextNode instanceof EditRangeEndElementBox
                && inline.previousNode instanceof EditRangeStartElementBox) {
                var start = inline.previousNode;
                var end = inline.nextNode;
                selection.start.setPositionParagraph(start.line, start.line.getOffset(start, 0));
                selection.end.setPositionParagraph(end.line, end.line.getOffset(end, 0) + 1);
                this.removeWholeElement(selection);
                return;
            }
        }
        if (inline && (inline instanceof BookmarkElementBox || inline.previousNode instanceof BookmarkElementBox)) {
            if (inline instanceof BookmarkElementBox && inline.bookmarkType === 1) {
                if (inline.previousNode) {
                    inline = inline.previousNode;
                    paragraph = inline.line.paragraph;
                    offset = inline.line.getOffset(inline, inline.length);
                }
                else {
                    // remove paragraph mark and move bookmark to previous paragraph
                    if (paragraph.previousRenderedWidget instanceof ParagraphWidget) {
                        var prevParagraph = paragraph.previousRenderedWidget;
                        var line = prevParagraph.lastChild;
                        selection.start.setPositionParagraph(inline.line, inline.line.getOffset(inline, 0));
                        selection.end.setPositionParagraph(line, line.getEndOffset());
                        this.removeWholeElement(selection);
                        return;
                    }
                }
                // Remove bookmark if selection is in between bookmark start and end element.
            }
            else if (inline.nextNode instanceof BookmarkElementBox && inline instanceof BookmarkElementBox &&
                inline.bookmarkType === 0 && inline.reference === inline.nextNode) {
                this.deleteBookmark(inline.name);
                return;
            }
            if (inline.length === 1 && inline.nextNode instanceof BookmarkElementBox && inline.previousNode instanceof BookmarkElementBox) {
                var begin = inline.previousNode;
                var end = inline.nextNode;
                selection.start.setPositionParagraph(begin.line, begin.line.getOffset(begin, 0));
                selection.end.setPositionParagraph(end.line, end.line.getOffset(end, 0) + 1);
                this.removeWholeElement(selection);
                return;
            }
        }
        if (!isRedoing) {
            this.initHistory('BackSpace');
        }
        if (offset === selection.getStartOffset(paragraph) && selection.start.currentWidget.isFirstLine()) {
            if (paragraph.paragraphFormat.listFormat && paragraph.paragraphFormat.listFormat.listId !== -1) {
                this.onApplyList(undefined);
                return;
            }
            if (paragraph.paragraphFormat.firstLineIndent !== 0) {
                this.onApplyParagraphFormat('firstLineIndent', 0, false, false);
                return;
            }
            if (paragraph.paragraphFormat.leftIndent !== 0) {
                this.onApplyParagraphFormat('leftIndent', 0, false, false);
                return;
            }
            if (!paragraph.paragraphFormat.bidi && paragraph.paragraphFormat.textAlignment !== 'Left') {
                this.onApplyParagraphFormat('textAlignment', 'Left', false, true);
                return;
            }
            if (paragraph.previousRenderedWidget instanceof ParagraphWidget) {
                selection.owner.isShiftingEnabled = true;
                var previousParagraph = paragraph.previousRenderedWidget;
                // if (isNullOrUndefined(previousParagraph)) {
                //     previousParagraph = this.documentHelper.selection.getPreviousBlock(paragraph) as ParagraphWidget;
                // }
                if (this.owner.enableTrackChanges && paragraph.previousRenderedWidget != undefined && paragraph.previousRenderedWidget.characterFormat.revisions.length == 0) {
                    if (!this.checkToMatchEmptyParaMarkBack(previousParagraph)) {
                        this.insertRevision(previousParagraph.characterFormat, 'Deletion');
                        var endOffset = this.documentHelper.selection.getLineLength(previousParagraph.lastChild);
                        var previousIndex = previousParagraph.childWidgets.length - 1;
                        this.documentHelper.layout.reLayoutParagraph(previousParagraph, previousIndex, 0);
                        selection.selects(previousParagraph.childWidgets[previousIndex], endOffset, true);
                        this.addRemovedNodes(paragraph);
                    }
                    else {
                        var endOffset = this.documentHelper.selection.getLineLength(previousParagraph.lastChild);
                        var previousIndex = previousParagraph.childWidgets.length - 1;
                        this.documentHelper.layout.reLayoutParagraph(previousParagraph, previousIndex, 0);
                        selection.selects(previousParagraph.childWidgets[previousIndex], endOffset, true);
                        this.addRemovedNodes(paragraph);
                    }
                }
                else if (previousParagraph.isEmpty() && !this.owner.enableTrackChanges) {
                    this.removePrevParaMarkRevision(paragraph);
                    if (!(paragraph === paragraph.bodyWidget.lastChild && previousParagraph.bodyWidget.index !== paragraph.bodyWidget.index)) {
                        this.removeBlock(previousParagraph);
                        this.addRemovedNodes(previousParagraph);
                    }
                    else {
                        var endOffset = this.documentHelper.selection.getLineLength(previousParagraph.lastChild);
                        var previousIndex = previousParagraph.childWidgets.length - 1;
                        selection.selects(previousParagraph.childWidgets[previousIndex], endOffset, true);
                    }
                }
                else if (this.owner.enableTrackChanges && previousParagraph.characterFormat.revisions != undefined && previousParagraph.characterFormat.revisions[0].revisionType == 'Deletion') {
                    var endOffset = this.documentHelper.selection.getLineLength(previousParagraph.lastChild);
                    var previousIndex = previousParagraph.childWidgets.length - 1;
                    this.documentHelper.layout.reLayoutParagraph(previousParagraph, previousIndex, 0);
                    selection.selects(previousParagraph.childWidgets[previousIndex], endOffset, true);
                    this.addRemovedNodes(paragraph);
                }
                else {
                    var checkCombine = false;
                    if (!(paragraph === paragraph.bodyWidget.lastChild && previousParagraph.bodyWidget.index !== paragraph.bodyWidget.index) && paragraph.bodyWidget.sectionFormat.breakCode !== 'NoBreak') {
                        this.removePrevParaMarkRevision(paragraph);
                        this.removeBlock(paragraph, false, true);
                        checkCombine = true;
                    }
                    var endOffset = this.documentHelper.selection.getLineLength(previousParagraph.lastChild);
                    var previousIndex = previousParagraph.childWidgets.length - 1;
                    var lineWidget = void 0;
                    if (!paragraph.isEmpty() && checkCombine) {
                        for (var i = 0; i < paragraph.childWidgets.length; i++) {
                            lineWidget = paragraph.childWidgets[i];
                            previousParagraph.childWidgets.push(lineWidget);
                            for (var j = 0; j < lineWidget.children.length; j++) {
                                if (lineWidget.children[j] instanceof FootnoteElementBox) {
                                    var index = this.documentHelper.footnoteCollection.indexOf(lineWidget.children[j]);
                                    if (index === -1) {
                                        lineWidget.children[j].isLayout = false;
                                        var indexcolle = parseInt(lineWidget.children[j].text);
                                        this.documentHelper.footnoteCollection.splice(indexcolle - 1, 0, lineWidget.children[j]);
                                        // this.documentHelper.footnoteCollection.push(lineWidget.children[j] as FootnoteElementBox);
                                    }
                                }
                            }
                            paragraph.childWidgets.splice(i, 1);
                            i--;
                            lineWidget.paragraph = previousParagraph;
                        }
                    }
                    this.documentHelper.layout.reLayoutParagraph(previousParagraph, previousIndex, 0);
                    selection.selects(previousParagraph.childWidgets[previousIndex], endOffset, true);
                    if (checkCombine) {
                        this.addRemovedNodes(paragraph);
                    }
                }
                this.setPositionForHistory();
                var footNoteWidgets = this.documentHelper.layout.getFootNoteWidgetsOf(paragraph);
                if (footNoteWidgets.length > 0) {
                    var layout = this.documentHelper.layout;
                    var bodyWidget = paragraph.bodyWidget;
                    layout.layoutfootNote(bodyWidget.page.footnoteWidget);
                }
                // if (!isRedoing) {
                this.reLayout(selection);
                // }
            }
            else {
                if (this.editorHistory) {
                    this.editorHistory.currentBaseHistoryInfo = undefined;
                }
            }
        }
        else {
            if (!isRedoing) {
                selection.owner.isShiftingEnabled = true;
            }
            var paragraphInfo = this.selection.getParagraphInfo(selection.start);
            var lineWidget = selection.start.currentWidget;
            var removeOffset = offset - 1;
            if (removeOffset < 0) {
                lineWidget = lineWidget.previousLine;
                removeOffset = this.documentHelper.selection.getLineLength(lineWidget) + removeOffset;
            }
            this.removeAtOffset(lineWidget, selection, removeOffset);
            this.setPositionParagraph(paragraphInfo.paragraph, paragraphInfo.offset - 1, false);
            this.setPositionForHistory();
            if (!isRedoing) {
                this.reLayout(selection);
                if (isCommentDelete) {
                    this.owner.editorHistory.undoStack[this.owner.editorHistory.undoStack.length - 2].modifiedActions.push(this.owner.editorHistory.undoStack[this.owner.editorHistory.undoStack.length - 1]);
                    this.owner.editorHistory.undoStack.splice(this.owner.editorHistory.undoStack.length - 1, 1);
                    isCommentDelete = false;
                }
            }
            else {
                this.fireContentChange();
            }
        }
        if (initComplextHistory && this.editorHistory && this.editorHistory.currentHistoryInfo) {
            this.editorHistory.currentHistoryInfo.endPosition = this.selection.startOffset;
            this.editorHistory.updateComplexHistory();
        }
    };
    Editor.prototype.setPositionForHistory = function (editPosition) {
        var selection = this.documentHelper.selection;
        if (this.editorHistory && !isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo)) {
            if (isNullOrUndefined(editPosition)) {
                this.updateHistoryPosition(selection.start, true);
                this.editorHistory.currentBaseHistoryInfo.endPosition = this.editorHistory.currentBaseHistoryInfo.insertPosition;
            }
            else {
                this.editorHistory.currentBaseHistoryInfo.insertPosition = editPosition;
                this.editorHistory.currentBaseHistoryInfo.endPosition = editPosition;
            }
        }
    };
    Editor.prototype.removeAtOffset = function (lineWidget, selection, offset) {
        var count = 0;
        var lineIndex = lineWidget.paragraph.childWidgets.indexOf(lineWidget);
        var childLength = lineWidget.children.length;
        for (var i = 0; i < childLength; i++) {
            var inline = lineWidget.children[i];
            if (inline instanceof ListTextElementBox) {
                continue;
            }
            var isBreak = this.removeCharacter(inline, offset, count, lineWidget, lineIndex, i);
            if (isBreak) {
                break;
            }
            count += inline.length;
        }
    };
    Editor.prototype.removeCharacter = function (inline, offset, count, lineWidget, lineIndex, i, isRearrange) {
        var isBreak = false;
        if (inline instanceof BookmarkElementBox && inline.reference && inline.line !== inline.reference.line && !(lineWidget.children[i] instanceof BookmarkElementBox)) {
            if (!isNullOrUndefined(inline.line.previousLine)) {
                inline.line.previousLine.children.splice(inline.line.previousLine.children.length, 0, inline);
                inline.line = inline.line.previousLine;
            }
            else if (!isNullOrUndefined(inline.line.paragraph.previousRenderedWidget)) {
                inline.line.paragraph.previousRenderedWidget.lastChild.children.splice(inline.line.paragraph.previousRenderedWidget.lastChild.children.length, 0, inline);
                inline.line = inline.line.paragraph.previousRenderedWidget.lastChild;
            }
            else if (!isNullOrUndefined(inline.line.paragraph.nextRenderedWidget)) {
                inline.line.paragraph.nextRenderedWidget.firstChild.children.splice(inline.line.paragraph.nextRenderedWidget.firstChild.children.length, 0, inline);
                inline.line = inline.line.paragraph.nextRenderedWidget.firstChild;
            }
            lineWidget.children.splice(i, 1);
            if (!isNullOrUndefined(lineWidget.layoutedElements) && lineWidget.layoutedElements.length > 0) {
                lineWidget.layoutedElements.splice(i, 1);
            }
            return true;
        }
        if (offset < count + inline.length) {
            var indexInInline = offset - count;
            inline.ischangeDetected = true;
            if (this.owner.isSpellCheck) {
                this.owner.spellChecker.removeErrorsFromCollection({ 'element': inline, 'text': inline.text });
                if (!inline.canTrigger) {
                    this.documentHelper.triggerSpellCheck = false;
                }
            }
            if (offset === count && inline.length === 1) {
                if (this.owner.enableTrackChanges && !this.skipTracking()) {
                    this.addRemovedNodes(inline.clone());
                    this.handleDeleteTracking(inline, indexInInline, 1, i);
                }
                else {
                    this.unLinkFieldCharacter(inline);
                    this.unlinkRangeFromRevision(inline, true);
                    this.addRemovedRevisionInfo(inline, undefined);
                    this.addRemovedNodes(inline);
                    if (this.owner.enableTrackChanges && this.editorHistory.isRedoing && inline instanceof FootnoteElementBox) {
                        if (inline.footnoteType === 'Footnote') {
                            this.removeFootnote(inline);
                        }
                        else {
                            this.removeEndnote(inline);
                        }
                    }
                    lineWidget.children.splice(i, 1);
                    if (!isNullOrUndefined(lineWidget.layoutedElements) && lineWidget.layoutedElements.length > 0) {
                        lineWidget.layoutedElements.splice(i, 1);
                    }
                }
                this.documentHelper.layout.reLayoutParagraph(lineWidget.paragraph, lineIndex, i, undefined, isRearrange);
            }
            else {
                var span = this.handleDeleteTracking(inline, indexInInline, 1);
                this.documentHelper.layout.reLayoutParagraph(lineWidget.paragraph, lineIndex, i, undefined, isRearrange);
                if (!isNullOrUndefined(span)) {
                    if (inline.revisions.length > 0) {
                        this.addRemovedRevisionInfo(inline, span);
                    }
                    this.addRemovedNodes(span);
                }
            }
            isBreak = true;
        }
        return isBreak;
    };
    Editor.prototype.removeCharacterInLine = function (inline, indexInInline, endOffset) {
        var span = new TextElementBox();
        if (inline instanceof TextElementBox) {
            span.characterFormat.copyFormat(inline.characterFormat);
            var removedCount = (endOffset === 1) ? 1 : (endOffset - indexInInline);
            span.text = inline.text.substr(indexInInline, removedCount);
            var text = inline.text;
            inline.text = text.substring(0, indexInInline) + text.substring(indexInInline + removedCount, text.length);
            if (inline.contentControlProperties) {
                span.contentControlProperties = inline.contentControlProperties.clone();
            }
        }
        return span;
    };
    Editor.prototype.removeRevisionsInformation = function (elementBox, indexInInline, endOffset, elementIndex) {
        var removeElement = elementBox.previousElement;
        var revision;
        revision = this.retrieveRevisionInOder(removeElement);
        if (revision.revisionType === 'Insertion') {
            if (this.isRevisionMatched(removeElement, undefined)) {
                elementBox.line.children.splice(elementIndex, 1);
            }
        }
    };
    Editor.prototype.handleDeleteTracking = function (elementBox, indexInInline, endOffset, elementIndex, startIndex, endIndex) {
        var isTrackingEnabled = this.owner.enableTrackChanges;
        var isUndoing = isNullOrUndefined(this.editorHistory) ? false : (this.editorHistory.isUndoing || this.editorHistory.isRedoing);
        var removedNode = undefined;
        if (this.canHandleDeletion() || (isTrackingEnabled && !this.skipTracking())) {
            if (elementBox instanceof BookmarkElementBox || elementBox instanceof CommentCharacterElementBox || elementBox instanceof EditRangeStartElementBox || elementBox instanceof EditRangeEndElementBox) {
                if (elementBox instanceof BookmarkElementBox && elementBox.previousElement instanceof FieldElementBox && elementBox.previousElement.formFieldData) {
                    if (elementBox.previousElement.revisions.length > 0) {
                        this.removeRevisionsInformation(elementBox, indexInInline, endOffset, elementIndex);
                    }
                }
                else {
                    if (isTrackingEnabled && elementBox instanceof BookmarkElementBox) {
                        if (!this.checkToCombineRevisionsInSides(elementBox, 'Deletion')) {
                            this.insertRevision(elementBox, 'Deletion');
                        }
                        this.updateLastElementRevision(elementBox);
                    }
                    else {
                        elementBox.line.children.splice(elementBox.indexInOwner, 1);
                    }
                }
                return undefined;
            }
            var isDelete = false;
            if (this.owner.editorHistory) {
                isDelete = (!isNullOrUndefined(this.owner.editorHistory.currentBaseHistoryInfo) && this.owner.editorHistory.currentBaseHistoryInfo.action === 'Delete');
            }
            if (!this.skipTableElements) {
                this.updateEndRevisionIndex();
            }
            if (elementBox.revisions.length > 0) {
                var revision = this.retrieveRevisionInOder(elementBox);
                var index = this.owner.revisions.changes.indexOf(revision);
                if (revision.revisionType === 'Insertion') {
                    if (this.isRevisionMatched(elementBox, undefined)) {
                        // inserted revision same author as delete revision so we can delete
                        if (isNullOrUndefined(elementIndex)) {
                            removedNode = this.removeCharacterInLine(elementBox, indexInInline, endOffset);
                            var revision_2 = elementBox.revisions[0];
                            if (!isNullOrUndefined(revision_2)) {
                                this.owner.trackChangesPane.updateCurrentTrackChanges(revision_2);
                            }
                        }
                        else {
                            var index_1 = revision.range.indexOf(elementBox);
                            revision.range.splice(index_1, 1);
                            this.owner.trackChangesPane.updateCurrentTrackChanges(revision);
                            if (revision.range.length === 0) {
                                this.owner.revisionsInternal.remove(revision);
                            }
                            this.unLinkFieldCharacter(elementBox);
                            elementBox.line.children.splice(elementIndex, 1);
                        }
                        if (elementBox instanceof FootnoteElementBox) {
                            if (elementBox.footnoteType === 'Footnote') {
                                this.removeFootnote(elementBox);
                            }
                            else {
                                this.removeEndnote(elementBox);
                            }
                        }
                    }
                    else {
                        //Insert revision and delete revision (which is to be included) haven't matched
                        if (isNullOrUndefined(elementIndex)) {
                            var text = this.removeCharacterInLine(elementBox, indexInInline, endOffset);
                            var revision_3 = elementBox.revisions[0];
                            if (!isNullOrUndefined(revision_3)) {
                                this.owner.trackChangesPane.updateCurrentTrackChanges(revision_3);
                            }
                            if (indexInInline === 0) {
                                var prevElement = elementBox.previousElement;
                                this.handleDeletionForInsertRevision(prevElement, elementBox, text, endOffset, indexInInline, true);
                            }
                            else if (elementBox.length !== indexInInline) {
                                for (var i = elementBox.revisions.length - 1; i >= 0; i--) {
                                    var revision_4 = elementBox.revisions[i];
                                    var index_2 = revision_4.range.indexOf(elementBox);
                                    var newElement = new TextElementBox();
                                    newElement.characterFormat.copyFormat(elementBox.characterFormat);
                                    newElement.line = elementBox.line;
                                    newElement.text = elementBox.text.substr(indexInInline);
                                    newElement.revisions.splice(0, 0, revision_4);
                                    revision_4.range.splice(index_2 + 1, 0, newElement);
                                    text.revisions.splice(0, 0, revision_4);
                                    text.line = elementBox.line;
                                    revision_4.range.splice(index_2 + 1, 0, text);
                                    this.owner.trackChangesPane.updateCurrentTrackChanges(revision_4);
                                    elementBox.text = elementBox.text.substr(0, indexInInline);
                                    var indexInOwner = elementBox.indexInOwner;
                                    elementBox.line.children.splice(indexInOwner + 1, 0, newElement);
                                    elementBox.line.children.splice(indexInOwner + 1, 0, text);
                                    this.addRemovedNodes(text.clone());
                                    this.insertRevision(text, 'Deletion');
                                    this.updateLastElementRevision(text);
                                }
                            }
                            else if (elementBox.length === indexInInline) {
                                var nextElement = elementBox.nextElement;
                                this.handleDeletionForInsertRevision(nextElement, elementBox, text, endOffset, indexInInline, false);
                            }
                            else {
                                if (endOffset === 1) {
                                    if (!isDelete) {
                                        this.selection.start.movePreviousPosition();
                                        this.selection.end.setPositionInternal(this.selection.start);
                                    }
                                }
                                else {
                                    this.updateCursorForInsertRevision(elementBox, indexInInline, endOffset);
                                }
                                this.addRemovedNodes(text.clone());
                                this.insertInlineInternal(text, 'Deletion');
                            }
                        }
                        else if (!this.checkToCombineRevisionsInSides(elementBox, 'Deletion')) {
                            this.insertRevision(elementBox, 'Deletion');
                            this.updateLastElementRevision(elementBox);
                        }
                        else {
                            this.updateLastElementRevision(elementBox);
                        }
                    }
                }
                else if (revision.revisionType === 'Deletion') {
                    if (index !== -1 && revision.author !== this.owner.currentUser && revision.range.length > 0) {
                        var range = revision.range;
                        var startOff = range[0] instanceof WCharacterFormat ? 0 : range[0].line.getOffset(range[0], 0);
                        var lastEle = range[range.length - 1] instanceof WCharacterFormat ? range[range.length - 2] : range[range.length - 1];
                        var endOff = lastEle.line.getOffset(lastEle, lastEle.length);
                        var isRevisionInserted = false;
                        if (startOff === indexInInline && endOff === endOffset) {
                            range.splice(range.indexOf(elementBox), 1);
                            this.owner.trackChangesPane.updateCurrentTrackChanges(revision);
                            elementBox.revisions.splice(elementBox.revisions.indexOf(revision), 1);
                            if (!this.checkToCombineRevisionsInSides(elementBox, 'Deletion')) {
                                this.insertRevision(elementBox, 'Deletion');
                                isRevisionInserted = true;
                                this.updateLastElementRevision(elementBox);
                            }
                            else {
                                this.combineElementRevision(elementBox.revisions, elementBox.revisions);
                            }
                            if (isRevisionInserted && elementBox.line.getOffset(elementBox, 0) === startOff) {
                                this.owner.revisions.changes.splice(index, 1);
                            }
                        }
                    }
                    if (endOffset === 1) {
                        if (isDelete) {
                            this.selection.start.moveNextPosition();
                            this.selection.end.setPositionInternal(this.selection.start);
                        }
                        else {
                            this.selection.start.movePreviousPosition();
                            this.selection.end.setPositionInternal(this.selection.start);
                        }
                    }
                    else {
                        if (this.isRevisionMatched(elementBox, 'Deletion')) {
                            this.updateCursorForInsertRevision(elementBox, indexInInline, endOffset);
                        }
                        else {
                            var rangeIndex = revision.range.indexOf(elementBox);
                            var endOff = elementBox.line.getOffset(elementBox, elementBox.length);
                            if (endOff >= endOffset && (revision.range.length > (rangeIndex + 1))) {
                                this.updateRevisionForSpittedTextElement(elementBox, revision.range[(rangeIndex + 1)]);
                                revision.range.splice(revision.range.indexOf(elementBox), 1);
                                this.toCombineOrInsertRevision(elementBox, 'Deletion');
                                this.owner.trackChangesPane.updateCurrentTrackChanges(revision);
                            }
                            else if (revision.range.length === 1 || indexInInline === 0) {
                                this.handleDeleteBySplitting(elementBox, indexInInline, endOffset);
                                if (rangeIndex > 0 && revision.range.length !== 1) {
                                    this.updateRevisionForSpittedTextElement(revision.range[(rangeIndex - 1)], revision.range[rangeIndex]);
                                    revision = this.retrieveRevisionInOder(elementBox);
                                    revision.range.splice(revision.range.indexOf(elementBox), 1);
                                }
                            }
                            else {
                                revision.range.splice(revision.range.indexOf(elementBox), 1);
                                this.toCombineOrInsertRevision(elementBox, 'Deletion');
                            }
                        }
                    }
                    this.updateLastElementRevision(elementBox);
                }
            }
            else {
                //No revision information in the element
                if (!isNullOrUndefined(elementIndex)) {
                    if (!this.checkToCombineRevisionsInSides(elementBox, 'Deletion')) {
                        this.insertRevision(elementBox, 'Deletion');
                    }
                    if (!this.skipFootNoteDeleteTracking) {
                        this.updateLastElementRevision(elementBox);
                    }
                }
                else {
                    this.handleDeleteBySplitting(elementBox, indexInInline, endOffset);
                }
            }
        }
        else {
            removedNode = this.removeCharacterInLine(elementBox, indexInInline, endOffset);
            var revision = elementBox.revisions[0];
            if (!isNullOrUndefined(revision)) {
                this.owner.trackChangesPane.updateCurrentTrackChanges(revision);
            }
        }
        return removedNode;
    };
    Editor.prototype.toCombineOrInsertRevision = function (elementBox, type) {
        if (!this.checkToCombineRevisionsInSides(elementBox, type)) {
            this.insertRevision(elementBox, type);
            this.updateLastElementRevision(elementBox);
        }
        else {
            this.combineElementRevision(elementBox.revisions, elementBox.revisions);
        }
    };
    Editor.prototype.updateLastElementRevision = function (elementBox) {
        if (!this.skipTableElements) {
            if (this.editorHistory && this.editorHistory.currentBaseHistoryInfo && !this.skipReplace && (!isNullOrUndefined(this.owner.search) ? !this.owner.search.isRepalceTracking : true)) {
                if (isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo.lastElementRevision)) {
                    this.editorHistory.currentBaseHistoryInfo.lastElementRevision = elementBox;
                    elementBox.isMarkedForRevision = true;
                }
            }
        }
    };
    Editor.prototype.updateEndRevisionIndex = function () {
        if (!isNullOrUndefined(this.editorHistory.undoStack) && this.editorHistory.undoStack.length > 0) {
            var prevHistoryInfo = this.editorHistory.undoStack[this.editorHistory.undoStack.length - 1];
            if (prevHistoryInfo.lastElementRevision && isNullOrUndefined(prevHistoryInfo.endRevisionLogicalIndex)) {
                prevHistoryInfo.updateEndRevisionInfo();
            }
        }
    };
    Editor.prototype.retrieveRevisionInOder = function (elementBox) {
        if (elementBox.revisions.length === 1) {
            return elementBox.revisions[0];
        }
        for (var i = 0; i < elementBox.revisions.length; i++) {
            if (elementBox.revisions[i].revisionType === 'Deletion') {
                return elementBox.revisions[i];
            }
        }
        return elementBox.revisions[elementBox.revisions.length - 1];
    };
    Editor.prototype.handleDeletionForInsertRevision = function (elementToEnsure, currentElement, spittedSpan, endOffset, indexInInline, isBegin) {
        if (!isNullOrUndefined(elementToEnsure) && currentElement.revisions.length === 0 && this.isRevisionMatched(elementToEnsure, 'Deletion')) {
            this.addRemovedNodes(spittedSpan.clone());
            this.insertTextInline(elementToEnsure, this.selection, spittedSpan.text, 0);
        }
        else {
            var revision = currentElement.revisions[currentElement.revisions.length - 1];
            var index = revision.range.indexOf(currentElement);
            revision.range.splice((isBegin) ? index : index + 1, 0, spittedSpan);
            this.owner.trackChangesPane.updateCurrentTrackChanges(revision);
            spittedSpan.revisions.splice(0, 0, revision);
            var isDelete = false;
            if (this.owner.editorHistory) {
                isDelete = (!isNullOrUndefined(this.owner.editorHistory.currentBaseHistoryInfo) && this.owner.editorHistory.currentBaseHistoryInfo.action === 'Delete');
            }
            if (endOffset === 1 && !isDelete) {
                this.selection.start.movePreviousPosition();
                this.selection.end.setPositionInternal(this.selection.start);
            }
            else {
                this.updateCursorForInsertRevision(currentElement, indexInInline, endOffset);
            }
            this.addRemovedNodes(spittedSpan.clone());
            this.insertInlineInternal(spittedSpan, 'Deletion');
        }
    };
    Editor.prototype.handleDeleteBySplitting = function (elementBox, indexInInline, endOffset) {
        var isDelete = false;
        if (this.owner.editorHistory) {
            isDelete = (!isNullOrUndefined(this.owner.editorHistory.currentBaseHistoryInfo) && this.owner.editorHistory.currentBaseHistoryInfo.action === 'Delete');
        }
        //Update cursor position to insert removed content
        if (endOffset === 1) {
            var startPosition = elementBox.line.getOffset(elementBox, 0);
            if (startPosition > 0) {
                var currentPosition = new TextPosition(this.owner);
                currentPosition.setPositionForLineWidget(elementBox.line, startPosition + indexInInline);
                this.selection.start.setPositionInternal(currentPosition);
                this.selection.end.setPositionInternal(this.selection.start);
            }
            else {
                if (!isDelete) {
                    this.selection.start.movePreviousPosition();
                    this.selection.end.setPositionInternal(this.selection.start);
                }
            }
        }
        else {
            this.updateCursorForInsertRevision(elementBox, indexInInline, endOffset);
        }
        var spittedElement = this.removeCharacterInLine(elementBox, indexInInline, endOffset);
        var revision = elementBox.revisions[0];
        if (!isNullOrUndefined(revision)) {
            this.owner.trackChangesPane.updateCurrentTrackChanges(revision);
        }
        this.addRemovedNodes(spittedElement.clone());
        this.insertTextInternal(spittedElement.text, false, 'Deletion');
    };
    Editor.prototype.updateCursorForInsertRevision = function (inline, startOffset, endOffset) {
        var startPosition = inline.line.getOffset(inline, 0);
        if (startPosition > 0) {
            startOffset = startPosition + startOffset;
            endOffset = startPosition + endOffset;
        }
        var currentPosition = new TextPosition(this.owner);
        currentPosition.setPositionFromLine(inline.line, startOffset);
        var endPosition = new TextPosition(this.owner);
        endPosition.setPositionFromLine(inline.line, endOffset);
        if (!currentPosition.isExistBefore(endPosition)) {
            this.selection.start.setPositionInternal(endPosition);
            this.selection.end.setPositionInternal(endPosition);
        }
        else {
            this.selection.end.setPositionInternal(currentPosition);
            this.selection.start.setPositionInternal(currentPosition);
        }
    };
    Editor.prototype.checkToCombineRevisionsInSides = function (currentElement, revisionType) {
        var prevElement = currentElement.previousNode;
        var nextElement = currentElement.nextNode;
        var isCombined = false;
        if (!isNullOrUndefined(prevElement)) {
            if (!(prevElement instanceof BookmarkElementBox)) {
                prevElement = prevElement.previousValidNodeForTracking;
            }
            if (!isNullOrUndefined(prevElement)) {
                var matchedRevisions = this.getMatchedRevisionsToCombine(prevElement.revisions, revisionType);
                if (matchedRevisions.length > 0) {
                    this.mapMatchedRevisions(matchedRevisions, prevElement, currentElement, false);
                    isCombined = true;
                }
            }
        }
        if (!isNullOrUndefined(nextElement)) {
            if (!(nextElement instanceof BookmarkElementBox)) {
                nextElement = nextElement.nextValidNodeForTracking;
            }
            if (!isNullOrUndefined(nextElement)) {
                var matchedRevisions = this.getMatchedRevisionsToCombine(nextElement.revisions, revisionType);
                if (matchedRevisions.length > 0) {
                    if (isCombined) {
                        this.combineElementRevision(currentElement.revisions, nextElement.revisions);
                    }
                    else {
                        this.mapMatchedRevisions(matchedRevisions, nextElement, currentElement, true);
                    }
                    isCombined = true;
                }
            }
        }
        return isCombined;
    };
    /**
     * Removes the current selected content or one character right of the cursor.
     *
     * @returns {void}
     */
    Editor.prototype.delete = function () {
        this.removeEditRange = true;
        var selection = this.documentHelper.selection;
        if (selection.bookmarks.length > 0) {
            this.extendSelectionToBookmarkStart();
        }
        if (selection.isEmpty) {
            this.singleDelete(selection, false);
        }
        else {
            var commentStarts = this.checkAndRemoveComments();
            this.initHistory('Delete');
            this.deleteSelectedContentInternal(selection, false, selection.start, selection.end);
            var textPosition = new TextPosition(selection.owner);
            this.setPositionForCurrentIndex(textPosition, selection.editPosition);
            selection.selectContent(textPosition, true);
            this.reLayout(selection);
            this.insertSpaceInFormField();
            if (this.editorHistory && !isNullOrUndefined(this.editorHistory.currentHistoryInfo)) {
                for (var k = 0; k < commentStarts.length; k++) {
                    this.initInsertInline(commentStarts[k], false);
                }
                this.editorHistory.currentHistoryInfo.endPosition = this.selection.startOffset;
                this.editorHistory.updateComplexHistory();
            }
        }
        this.removeEditRange = false;
        this.documentHelper.layout.islayoutFootnote = false;
        this.updateXmlMappedContentControl();
    };
    Editor.prototype.deleteEditElement = function (selection) {
        this.initHistory('Delete');
        this.deleteSelectedContentInternal(selection, false, selection.start, selection.end);
        var textPosition = new TextPosition(selection.owner);
        this.setPositionForCurrentIndex(textPosition, selection.editPosition);
        selection.selectContent(textPosition, true);
        this.reLayout(selection);
    };
    Editor.prototype.removeContentControlMark = function (start, end) {
        if (!start.contentControlProperties.lockContentControl) {
            this.selection.start.setPositionParagraph(start.line, start.line.getOffset(start, 0));
            this.selection.end.setPositionParagraph(end.line, end.line.getOffset(end, 0) + 1);
            this.deleteEditElement(this.selection);
            return true;
        }
        return false;
    };
    /**
     * Remove single character on right of cursor position
     *
     * @param {Selection} selection - Specifies the selection
     * @param {boolean} isRedoing - Specified the is redoing.
     * @private
     * @returns {void}
     */
    /* eslint-disable  */
    Editor.prototype.singleDelete = function (selection, isRedoing) {
        var lineWidget = selection.start.currentWidget;
        var paragraph = selection.start.paragraph;
        var offset = selection.start.offset;
        var indexInInline = 0;
        var inlineObj = lineWidget.getInline(selection.start.offset, indexInInline);
        var inline = inlineObj.element;
        if (this.selection.isInlineFormFillMode()) {
            if (inline instanceof FieldElementBox && inline.fieldType === 1) {
                return;
            }
            var resultText = this.getFieldResultText();
            if (!(inline instanceof TextElementBox)) {
                inline = inline.nextElement;
            }
            if (resultText.length === 1 && inline instanceof TextElementBox) {
                this.selection.selectFieldInternal(this.selection.getCurrentFormField());
                this.insertTextInternal(this.documentHelper.textHelper.repeatChar(this.documentHelper.textHelper.getEnSpaceCharacter(), 5), true);
                this.selection.selectTextElementStartOfField(this.selection.getCurrentFormField());
                return;
            }
            else {
                if (inline instanceof FieldElementBox && inline.fieldType === 1) {
                    return;
                }
            }
        }
        indexInInline = inlineObj.index;
        if (paragraph.paragraphFormat.listFormat && paragraph.paragraphFormat.listFormat.listId !== -1 &&
            this.documentHelper.isListTextSelected && selection.contextType === 'List') {
            this.onApplyList(undefined);
            return;
        }
        if (!isNullOrUndefined(inline) && indexInInline === inline.length && !isNullOrUndefined(inline.nextNode)) {
            inline = inline.nextNode;
            if (inline instanceof FieldElementBox && inline.fieldType === 1 &&
                !isNullOrUndefined(inline.fieldBegin.formFieldData)) {
                return;
            }
            if (inline instanceof FootnoteElementBox) {
                return;
            }
            indexInInline = 0;
        }
        var updateSelection = inline instanceof CommentCharacterElementBox;
        //Skip removing comment start/end mark on delete key
        while (inline instanceof CommentCharacterElementBox) {
            if (inline.nextNode) {
                inline = inline.nextNode;
                indexInInline = 0;
            }
            else {
                indexInInline = 1;
                break;
            }
        }
        if (updateSelection) {
            paragraph = inline.line.paragraph;
            offset = inline.line.getOffset(inline, indexInInline);
            selection.start.setPositionParagraph(inline.line, offset);
            selection.end.setPositionParagraph(inline.line, offset);
        }
        if (!this.owner.enableTrackChanges && inline instanceof FootnoteElementBox) {
            if (inline.footnoteType === 'Footnote') {
                this.removeFootnote(inline);
            }
            else {
                this.removeEndnote(inline);
            }
        }
        if (!isNullOrUndefined(inline)) {
            var nextRenderedInline = undefined;
            var nextInline = selection.getNextValidElement(inline);
            if (nextInline instanceof ElementBox) {
                nextRenderedInline = nextInline;
            }
            if (!isNullOrUndefined(nextRenderedInline) && nextRenderedInline instanceof FieldElementBox
                && nextRenderedInline.fieldType === 0) { //Selects the entire field.
                inline = nextRenderedInline.fieldEnd;
                paragraph = inline.line.paragraph;
                offset = inline.line.getOffset(inline, 1);
                selection.end.setPositionParagraph(inline.line, offset);
                if (inline.nextNode instanceof BookmarkElementBox) {
                    var end = inline.nextNode;
                    selection.end.setPositionParagraph(end.line, end.line.getOffset(end, 1));
                }
                selection.fireSelectionChanged(true);
                return;
            }
            else if (inline !== nextRenderedInline) { //Updates the offset to delete next content.               
                inline = nextRenderedInline;
                paragraph = inline.line.paragraph;
                offset = inline.line.getOffset(inline, 0);
                if (inline instanceof FieldElementBox && inline.fieldType === 1) {
                    offset++;
                }
            }
        }
        if (inline instanceof EditRangeStartElementBox || inline instanceof EditRangeEndElementBox) {
            if ((inline.nextNode instanceof EditRangeEndElementBox && inline.editRangeEnd === inline.nextNode)
                || (inline.previousNode instanceof EditRangeStartElementBox
                    && inline.editRangeStart === inline.previousNode)) {
                return;
            }
            if (this.documentHelper.isDocumentProtected &&
                this.documentHelper.protectionType === 'ReadOnly') {
                if (inline instanceof EditRangeStartElementBox || inline instanceof EditRangeEndElementBox) {
                    return;
                }
            }
            else {
                if (inline instanceof EditRangeStartElementBox) {
                    inline = inline.nextNode;
                    offset = inline.line.getOffset(inline, 0);
                    paragraph = inline.line.paragraph;
                }
                else if (inline instanceof EditRangeEndElementBox) {
                    offset++;
                }
            }
            if (inline.length === 1 && inline.nextNode instanceof EditRangeEndElementBox
                && inline.previousNode instanceof EditRangeStartElementBox) {
                var editStart = inline.previousNode;
                var editEnd = inline.nextNode;
                selection.start.setPositionParagraph(editStart.line, editStart.line.getOffset(editStart, 0));
                selection.end.setPositionParagraph(editEnd.line, editEnd.line.getOffset(editEnd, 0) + 1);
                this.deleteEditElement(selection);
                return;
            }
        }
        if (inline && (inline instanceof ContentControl || inline.nextNode instanceof ContentControl)) {
            if (inline instanceof ContentControl && inline.nextNode) {
                inline = inline.nextNode;
                paragraph = inline.line.paragraph;
                offset = inline.line.getOffset(inline, 0);
                // Move cursor inbetween content control
                selection.start.setPositionParagraph(inline.line, offset);
                selection.end.setPositionParagraph(inline.line, offset);
                return;
            }
            if (inline && inline.length === 1 && inline.nextNode instanceof ContentControl
                && inline.previousNode instanceof ContentControl) {
                if (this.removeContentControlMark(inline.previousNode, inline.nextNode)) {
                    return;
                }
            }
            // Remove content if content control is empty
            if (inline instanceof ContentControl && inline.previousNode instanceof ContentControl
                && inline.previousNode.reference === inline) {
                // Remove content control if there is no element presen in between start and end mark.
                if (this.removeContentControlMark(inline.previousNode, inline)) {
                    return;
                }
            }
        }
        if (inline && (inline instanceof BookmarkElementBox && inline.bookmarkType === 0
            || inline.nextNode instanceof BookmarkElementBox)) {
            if (inline.nextNode && inline instanceof BookmarkElementBox) {
                inline = inline.nextNode;
                paragraph = inline.line.paragraph;
                offset = inline.line.getOffset(inline, 0);
                selection.start.setPositionParagraph(inline.line, offset);
                selection.end.setPositionParagraph(inline.line, offset);
            }
            if (inline.length === 1 && inline.nextNode instanceof BookmarkElementBox
                && inline.previousNode instanceof BookmarkElementBox) {
                var bookMarkBegin = inline.previousNode;
                var bookMarkEnd = inline.nextNode;
                selection.start.setPositionParagraph(bookMarkBegin.line, bookMarkBegin.line.getOffset(bookMarkBegin, 0));
                selection.end.setPositionParagraph(bookMarkEnd.line, bookMarkEnd.line.getOffset(bookMarkEnd, 0) + 1);
                this.deleteEditElement(selection);
                return;
            }
            if (inline instanceof BookmarkElementBox) {
                offset = inline.line.getOffset(inline, 1);
            }
        }
        if (selection.start.currentWidget.isLastLine() && offset === this.documentHelper.selection.getLineLength(selection.start.currentWidget)) {
            if (paragraph.isInsideTable && isNullOrUndefined(paragraph.nextWidget)) {
                return;
            }
            var previousParagraph = undefined;
            var newParagraph = undefined;
            var nextParagraph = selection.getNextParagraphBlock(paragraph);
            if (isNullOrUndefined(nextParagraph)) {
                if (offset > 0) {
                    return;
                }
                else {
                    if (paragraph.previousWidget instanceof ParagraphWidget) {
                        previousParagraph = paragraph.previousWidget;
                    }
                    if (paragraph.previousWidget instanceof FootNoteWidget) {
                        return;
                    }
                    if (paragraph.previousWidget instanceof TableWidget) {
                        return;
                    }
                    if (isNullOrUndefined(previousParagraph)) {
                        return;
                        //Adds an empty paragraph, to ensure minimal content.
                    }
                }
            }
            if (!isRedoing) {
                this.initHistory('Delete');
            }
            if (paragraph.isEndsWithPageBreak || paragraph.isEndsWithColumnBreak) {
                var lastLine = paragraph.lastChild;
                var lastChild = lastLine.children[lastLine.children.length - 1];
                this.selection.start.setPositionForSelection(lastLine, lastChild, 0, this.selection.start.location);
            }
            var blockInfo = this.selection.getParagraphInfo(selection.start);
            selection.editPosition = this.selection.getHierarchicalIndex(blockInfo.paragraph, blockInfo.offset.toString());
            if (this.checkInsertPosition(selection)) {
                this.setPositionForHistory(selection.editPosition);
            }
            selection.owner.isShiftingEnabled = true;
            if (paragraph.isEmpty()) {
                this.removePrevParaMarkRevision(paragraph, true);
                this.removeBlock(paragraph, false, true);
                this.addRemovedNodes(paragraph);
                if (isNullOrUndefined(nextParagraph)) {
                    if (isNullOrUndefined(previousParagraph)) {
                        // selection.selectParagraphInternal(newParagraph, true, true);
                        var paraEndOffset = selection.getParagraphLength(newParagraph) + 1;
                        if (this.editorHistory && !isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo)) {
                            this.updateHistoryPosition(selection.start, true);
                            this.editorHistory.currentBaseHistoryInfo.endPosition = this.selection.getHierarchicalIndex(newParagraph, paraEndOffset.toString());
                        }
                    }
                    else {
                        selection.selectParagraphInternal(previousParagraph, false);
                        this.setPositionForHistory();
                    }
                }
                else {
                    selection.selectParagraphInternal(nextParagraph, true);
                }
            }
            else {
                if (this.owner.enableTrackChanges && paragraph.nextRenderedWidget instanceof ParagraphWidget) {
                    var nextParagraph_1 = paragraph.nextRenderedWidget;
                    var startingOffset = 0;
                    var nextIndex = nextParagraph_1.childWidgets.length - 1;
                    paragraph = paragraph.combineWidget(this.owner.viewer);
                    var currentParagraph = this.splitParagraph(paragraph, paragraph.firstChild, 0, selection.start.currentWidget, selection.start.offset, true);
                    if (paragraph != undefined && paragraph.characterFormat.revisions.length != 0 && paragraph.characterFormat.revisions[0].revisionType == 'Insertion') {
                        this.removePrevParaMarkRevision(paragraph, true);
                        this.deleteParagraphMark(currentParagraph, selection, 0);
                        this.addRemovedNodes(paragraph);
                        this.setPositionForCurrentIndex(selection.start, selection.editPosition);
                        selection.selectContent(selection.start, true);
                    }
                    else {
                        this.removePrevParaMarkRevision(paragraph, true);
                        this.deleteParagraphMark(currentParagraph, selection, 0, true);
                        this.addRemovedNodes(paragraph);
                        this.setPositionForCurrentIndex(selection.start, selection.editPosition);
                        selection.selects(nextParagraph_1.childWidgets[nextIndex], startingOffset, true);
                    }
                }
                else {
                    paragraph = paragraph.combineWidget(this.owner.viewer);
                    var currentParagraph = this.splitParagraph(paragraph, paragraph.firstChild, 0, selection.start.currentWidget, selection.start.offset, true);
                    this.removePrevParaMarkRevision(paragraph, true);
                    this.deleteParagraphMark(currentParagraph, selection, 0);
                    this.addRemovedNodes(paragraph);
                    this.setPositionForCurrentIndex(selection.start, selection.editPosition);
                    selection.selectContent(selection.start, true);
                }
            }
            // if (!isRedoing) {
            this.reLayout(selection);
            // }
        }
        else {
            this.singleDeleteInternal(selection, isRedoing, paragraph);
        }
        var line = selection.start.currentWidget;
        var elementInfo = line.getInline(selection.start.offset + 1, 0);
        if (elementInfo.element instanceof BookmarkElementBox) {
            selection.start.offset++;
            selection.end.offset++;
        }
    };
    Editor.prototype.singleDeleteInternal = function (selection, isRedoing, paragraph) {
        if (!isRedoing) {
            selection.owner.isShiftingEnabled = true;
            this.initHistory('Delete');
        }
        if (this.checkInsertPosition(selection)) {
            this.updateHistoryPosition(selection.start, true);
            this.editorHistory.currentBaseHistoryInfo.endPosition = this.editorHistory.currentBaseHistoryInfo.insertPosition;
        }
        var paragraphInfo = this.selection.getParagraphInfo(selection.start);
        var lineWidget = selection.start.currentWidget;
        var removeOffset = selection.start.offset;
        var lineLength = selection.getLineLength(selection.start.currentWidget);
        if (removeOffset >= lineLength) {
            lineWidget = lineWidget.nextLine;
            removeOffset = removeOffset - lineLength;
        }
        this.removeAtOffset(lineWidget, selection, removeOffset);
        if (this.owner.enableTrackChanges && !isNullOrUndefined(this.editorHistory) && this.editorHistory.currentBaseHistoryInfo && this.editorHistory.currentBaseHistoryInfo.action === 'Delete' && lineLength !== selection.getLineLength(selection.start.currentWidget)) {
            this.setPositionParagraph(paragraphInfo.paragraph, paragraphInfo.offset, false);
        }
        else if (this.owner.enableTrackChanges && !this.skipTracking()) {
            this.setPositionParagraph(paragraphInfo.paragraph, paragraphInfo.offset + 1, false);
        }
        else {
            this.setPositionParagraph(paragraphInfo.paragraph, paragraphInfo.offset, false);
        }
        if (!isRedoing) {
            this.reLayout(selection);
        }
        else {
            this.fireContentChange();
        }
    };
    Editor.prototype.deleteParagraphMark = function (paragraph, selection, editAction, handleParaMark, isCombineLastBlock) {
        if (isNullOrUndefined(paragraph.containerWidget)) {
            return;
        }
        paragraph = paragraph.combineWidget(this.owner.viewer);
        var nextParagraph = selection.getNextParagraphBlock(paragraph);
        if (paragraph.isInsideTable && isNullOrUndefined(paragraph.nextWidget) || isNullOrUndefined(nextParagraph)) {
            return;
        }
        //BodyWidget
        var section = paragraph.containerWidget instanceof BodyWidget ? paragraph.containerWidget : undefined;
        var table = undefined;
        if (selection.getNextRenderedBlock(paragraph) instanceof TableWidget) {
            table = selection.getNextRenderedBlock(paragraph);
        }
        else {
            table = undefined;
        }
        if (nextParagraph.isInsideTable && !isNullOrUndefined(table) && table.contains(nextParagraph.associatedCell)) {
            if (editAction < 4) {
                // let nextSection: BodyWidget = table.containerWidget instanceof BodyWidget ? table.containerWidget : undefined;
                // if (section !== nextSection) {
                //     this.combineSection(section, selection, nextSection);
                // }                
                var offset = 0;
                this.removeBlock(paragraph);
                this.documentHelper.layout.clearListElementBox(nextParagraph);
                this.documentHelper.layout.clearListElementBox(paragraph);
                for (var i = paragraph.childWidgets.length - 1; i >= 0; i--) {
                    var line = paragraph.childWidgets[i];
                    for (var j = line.children.length - 1; j >= 0; j--) {
                        var element = line.children[j];
                        offset += element.length;
                        nextParagraph.firstChild.children.unshift(element);
                        element.line = nextParagraph.firstChild;
                        // this.layoutInlineCollection(false, 0, nextParagraph.inlines, inline);
                    }
                }
                this.documentHelper.layout.reLayoutParagraph(nextParagraph, 0, 0);
                if (offset > 0) {
                    selection.editPosition = this.selection.getHierarchicalIndex(nextParagraph, offset.toString());
                }
            }
        }
        else {
            if (editAction < 4) {
                // let nextSection: WSection = nextParagraph.section instanceof WSection ? nextParagraph.section as WSection : undefined;
                // if (section !== nextSection) {
                //     this.combineSection(section, selection, nextSection);
                // }
                var prevLength = paragraph.childWidgets.length - 1;
                var nextPara = nextParagraph.getSplitWidgets();
                nextParagraph = nextParagraph.combineWidget(this.owner.viewer);
                this.documentHelper.layout.clearListElementBox(nextParagraph);
                this.documentHelper.layout.clearListElementBox(paragraph);
                this.updateEditPositionOnMerge(paragraph, nextParagraph);
                var canRemoveParaMark = (!isNullOrUndefined(handleParaMark) && handleParaMark) ? this.handleDeleteParaMark(paragraph, nextPara[0]) : true;
                if (canRemoveParaMark) {
                    var prevLastLineIndex = paragraph.childWidgets.length - 1;
                    var elementIndex = paragraph.childWidgets[prevLastLineIndex].children.length - 1;
                    for (var i = 0; i < nextParagraph.childWidgets.length; i++) {
                        var inline = nextParagraph.childWidgets[i];
                        if (nextParagraph.characterFormat.revisions.length > 0) {
                            for (var i_2 = 0; i_2 < nextParagraph.characterFormat.revisions.length; i_2++) {
                                for (var j = 0; j < nextParagraph.characterFormat.revisions[i_2].range.length; j++) {
                                    nextParagraph.characterFormat.revisions[i_2].range[j].ownerBase = paragraph;
                                }
                                paragraph.characterFormat.revisions.push(nextParagraph.characterFormat.revisions[i_2]);
                            }
                        }
                        nextParagraph.childWidgets.splice(i, 1);
                        paragraph.childWidgets.push(inline);
                        inline.paragraph = paragraph;
                        i--;
                    }
                    if (nextParagraph.bodyWidget.index !== paragraph.bodyWidget.index) {
                        this.deleteSection(selection, paragraph.bodyWidget, nextParagraph.bodyWidget, editAction);
                    }
                    if (nextParagraph.childWidgets.length === 0) {
                        nextParagraph.childWidgets.push(new LineWidget(nextParagraph));
                    }
                    this.documentHelper.layout.reLayoutParagraph(paragraph, 0, 0);
                    this.removeBlock(nextParagraph);
                    //this.combineRevisionOnDeleteParaMark(paragraph, prevLastLineIndex, elementIndex);
                    if (this.editorHistory.currentBaseHistoryInfo.action !== "Insert") {
                        this.addRemovedNodes(nextParagraph, isCombineLastBlock);
                    }
                }
            }
        }
    };
    Editor.prototype.handleDeleteParaMark = function (currentPara, nextPara) {
        if (!this.owner.enableTrackChanges && currentPara.characterFormat.revisions.length > 0) {
            // If tracking disabled and revision exists then remove revision from character format
            for (var i = 0; i < currentPara.characterFormat.revisions.length; i++) {
                var currentRevision = currentPara.characterFormat.revisions[i];
                var rangeIndex = currentRevision.range.indexOf(currentPara.characterFormat);
                currentRevision.range.splice(rangeIndex, 1);
                this.owner.trackChangesPane.updateCurrentTrackChanges(currentRevision);
                if (currentRevision.range.length === 0) {
                    this.owner.revisions.remove(currentRevision);
                }
                return true;
            }
        }
        if (this.owner.enableTrackChanges) {
            var canRemoveParaMark = false;
            if (currentPara.characterFormat.revisions.length > 0) {
                var deleteRevision = this.retrieveRevisionByType(currentPara.characterFormat, 'Deletion');
                if (!isNullOrUndefined(deleteRevision) && this.isRevisionMatched(deleteRevision, 'Deletion')) {
                    var revisionIndex = currentPara.characterFormat.revisions.indexOf(deleteRevision);
                    currentPara.characterFormat.revisions.splice(revisionIndex, 1);
                    deleteRevision.range.splice(deleteRevision.range.indexOf(currentPara.characterFormat), 1);
                    this.owner.trackChangesPane.updateCurrentTrackChanges(deleteRevision);
                    if (deleteRevision.range.length === 0) {
                        this.owner.revisions.remove(deleteRevision);
                    }
                    canRemoveParaMark = true;
                }
                var insertRevision = this.retrieveRevisionByType(currentPara.characterFormat, 'Insertion');
                if (!isNullOrUndefined(insertRevision) && this.isRevisionMatched(currentPara.characterFormat, 'Insertion')) {
                    var rangeIndex = insertRevision.range.indexOf(currentPara.characterFormat);
                    insertRevision.range.splice(rangeIndex, 1);
                    this.owner.trackChangesPane.updateCurrentTrackChanges(insertRevision);
                    if (insertRevision.range.length === 0) {
                        this.owner.revisions.remove(insertRevision);
                    }
                    canRemoveParaMark = true;
                }
                if (canRemoveParaMark) {
                    return true;
                }
                else {
                    this.applyRevisionForParaMark(currentPara, nextPara.firstChild, 'Deletion', false);
                }
                return false;
            }
            else {
                this.applyRevisionForParaMark(currentPara, nextPara.firstChild, 'Deletion', false);
                return false;
            }
        }
        return true;
    };
    Editor.prototype.insertDeleteParaMarkRevision = function (currentPara, nextPara) {
        var lastLine = currentPara.lastChild;
        var lastElement = lastLine.children.length > 0 ? lastLine.children[lastLine.children.length - 1].previousValidNodeForTracking : undefined;
        if (!isNullOrUndefined(lastElement)) {
            var matchedRevisions = this.getMatchedRevisionsToCombine(lastElement.revisions, 'Deletion');
            if (matchedRevisions.length > 0) {
                this.mapMatchedRevisions(matchedRevisions, lastElement, currentPara.characterFormat, false);
            }
        }
        var firstLine = nextPara.firstChild;
        var firstElement = firstLine.children[0].nextValidNodeForTracking;
    };
    Editor.prototype.retrieveRevisionByType = function (item, revisionToRetrieve) {
        for (var i = 0; i < item.revisions.length; i++) {
            if (item.revisions[i].revisionType === revisionToRetrieve) {
                return item.revisions[i];
            }
        }
        return undefined;
    };
    Editor.prototype.combineRevisionOnDeleteParaMark = function (paragraph, lineIndex, elementIndex) {
        var lastLine = paragraph.childWidgets[lineIndex];
        var lastElement = lastLine.children[elementIndex];
        var firstElement = lastElement.nextNode;
        firstElement = firstElement.nextValidNodeForTracking;
        lastElement = lastElement.nextValidNodeForTracking;
        if (firstElement.revisions.length > 0 && lastElement.revisions.length > 0) {
            this.combineElementRevisions(lastElement, firstElement);
        }
    };
    Editor.prototype.updateEditPositionOnMerge = function (currentParagraph, nextParagraph) {
        if (this.documentHelper.selection.editPosition === this.selection.getHierarchicalIndex(nextParagraph, '0') &&
            nextParagraph.nextRenderedWidget === undefined) {
            this.documentHelper.selection.editPosition = this.selection.getHierarchicalIndex(currentParagraph, this.documentHelper.selection.getLineLength(currentParagraph.lastChild).toString());
        }
    };
    Editor.prototype.checkEndPosition = function (selection) {
        return (this.editorHistory && !isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo)
            && isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo.endPosition));
    };
    Editor.prototype.checkInsertPosition = function (selection) {
        return (this.editorHistory && !isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo)
            && isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo.insertPosition));
    };
    Editor.prototype.checkIsNotRedoing = function () {
        return this.documentHelper.owner.enableHistoryMode && !this.editorHistory.isRedoing;
    };
    /**
     * deleteSelectedContentInternal
     * @private
     */
    Editor.prototype.deleteSelectedContentInternal = function (selection, isBackSpace, startPosition, endPosition, skipDeletecell) {
        var startPos = startPosition;
        var endPos = endPosition;
        if (!startPosition.isExistBefore(endPosition)) {
            startPos = endPosition;
            endPos = startPosition;
        }
        var blockInfo = this.selection.getParagraphInfo(startPos);
        selection.editPosition = this.selection.getHierarchicalIndex(blockInfo.paragraph, blockInfo.offset.toString());
        var skipBackSpace = false;
        if (isBackSpace && startPos.isInSameParagraph(endPos)) {
            //Handled specifically to skip removal of contents, if selection is only paragraph mark and next rendered block is table.
            if (startPos.offset < endPos.offset && startPos.offset === selection.getParagraphLength(endPos.paragraph)) {
                var nextBlock = selection.getNextRenderedBlock(startPos.paragraph);
                skipBackSpace = nextBlock instanceof TableWidget;
            }
            //Handled specifically to remove paragraph completely (Delete behavior), if the selected paragraph is empty.
            if (endPos.offset === 1 && endPos.offset > selection.getParagraphLength(endPos.paragraph)
                && !(endPos.paragraph.isInsideTable && isNullOrUndefined(endPos.paragraph.nextWidget))) {
                isBackSpace = false;
            }
        }
        if (!skipBackSpace) {
            selection.owner.isShiftingEnabled = true;
            if (this.checkInsertPosition(selection)) {
                this.editorHistory.currentBaseHistoryInfo.insertPosition = selection.editPosition;
            }
            var editAction = (isBackSpace ? 1 : 0);
            this.deleteSelectedContent(endPos.paragraph, selection, startPos, endPos, editAction, skipDeletecell);
        }
        return skipBackSpace;
    };
    /**
     * Init EditorHistory
     *
     * @private
     * @param {Action} action Specified the action.
     * @returns {void}
     */
    Editor.prototype.initHistory = function (action) {
        if (this.documentHelper.owner.enableHistoryMode) {
            this.editorHistory.initializeHistory(action);
        }
    };
    /**
     * Init Complex EditorHistory
     *
     * @private
     * @param {Action} action Specified the action.
     * @returns {void}
     */
    Editor.prototype.initComplexHistory = function (action) {
        if (this.documentHelper.owner.enableHistoryMode) {
            this.editorHistory.initComplexHistory(this.documentHelper.selection, action);
        }
    };
    //Insert Picture implementation starts
    /**
     * Insert image
     *
     * @private
     * @param {string} base64String Base64 string, web URL or file URL.
     * @param {number} width Image width
     * @param {number} height Image height
     * @param {string} alternateText Image alternateText
     * @returns {void}
     */
    Editor.prototype.insertPicture = function (base64String, width, height, alternateText, isUiInteracted) {
        var imageElementBox = new ImageElementBox(true);
        if (HelperMethods.formatClippedString(base64String).extension === '.svg') {
            imageElementBox.metaFileImageString = base64String;
            imageElementBox.isMetaFile = true;
            this.generateFallBackImage(base64String, width, height, imageElementBox);
        }
        else {
            imageElementBox.imageString = base64String;
            imageElementBox.element.crossOrigin = 'Anonymous';
        }
        imageElementBox.width = width;
        imageElementBox.height = height;
        if (!isNullOrUndefined(alternateText) || alternateText != "") {
            imageElementBox.alternateText = alternateText;
        }
        imageElementBox.textWrappingStyle = 'Inline';
        this.documentHelper.addBase64StringInCollection(imageElementBox);
        imageElementBox.element.src = this.documentHelper.getImageString(imageElementBox);
        this.insertPictureInternal(imageElementBox, isUiInteracted);
    };
    Editor.prototype.generateFallBackImage = function (base64String, width, height, imageElementBox) {
        var drawImage = new Image();
        drawImage.onload = function () {
            var displayPixelRatio = Math.max(1, window.devicePixelRatio || 1);
            var draw = document.createElement('canvas');
            draw.width = width * displayPixelRatio;
            draw.height = height * displayPixelRatio;
            var context = draw.getContext('2d');
            context.scale(displayPixelRatio, displayPixelRatio);
            context.drawImage(drawImage, 0, 0, width, height);
            imageElementBox.imageString = draw.toDataURL('image/png', 1);
        };
        drawImage.src = base64String;
    };
    Editor.prototype.insertPictureInternal = function (imageElementBox, isUiInteracted) {
        var selection = this.documentHelper.selection;
        var removedCommentStart = this.checkAndRemoveComments();
        this.initHistory('InsertInline');
        if (isUiInteracted) {
            this.fitImageToPage(selection, imageElementBox);
        }
        this.insertInlineInSelection(selection, imageElementBox);
        this.reLayout(selection);
        this.updateHistoryForComments(removedCommentStart);
    };
    Editor.prototype.fitImageToPage = function (selection, imageElementBox) {
        var section = selection.start.paragraph.bodyWidget;
        var pageHeight = section.sectionFormat.pageHeight - section.sectionFormat.topMargin - section.sectionFormat.topMargin;
        var width = 0;
        if (section instanceof BodyWidget && section.sectionFormat.columns.length > 1) {
            // column width
            var colIndex = section.columnIndex;
            width = section.sectionFormat.columns[colIndex].width;
        }
        else {
            // page width
            width = HelperMethods.convertPointToPixel(section.sectionFormat.pageWidth - section.sectionFormat.leftMargin - section.sectionFormat.rightMargin);
        }
        // Resize image based on page width or column width
        if (imageElementBox.width > width) {
            imageElementBox.height = imageElementBox.height * width / imageElementBox.width;
            imageElementBox.width = width;
        }
        if (imageElementBox.height > pageHeight) {
            imageElementBox.width = imageElementBox.width * pageHeight / imageElementBox.height;
            imageElementBox.height = pageHeight;
        }
    };
    //Insert Picture implementation ends
    /**
     * @param {selection} Selection context.
     * @param {elementBox} Elementbox
     * @param selection
     * @param elementBox
     * @private
     */
    Editor.prototype.insertInlineInSelection = function (selection, elementBox) {
        if (this.checkIsNotRedoing()) {
            selection.owner.isShiftingEnabled = true;
        }
        if (!selection.isEmpty) {
            this.removeSelectedContents(selection);
        }
        this.updateInsertPosition();
        this.insertInlineInternal(elementBox);
        if (this.checkEndPosition(selection)) {
            this.updateHistoryPosition(selection.start, false);
        }
        this.fireContentChange();
    };
    /**
     * @private
     * @returns {void}
     */
    Editor.prototype.onPortrait = function () {
        var sectionFormat = new WSectionFormat();
        var width = this.documentHelper.selection.sectionFormat.pageWidth;
        var height = this.documentHelper.selection.sectionFormat.pageHeight;
        if (width > height) {
            sectionFormat.pageWidth = height;
            sectionFormat.pageHeight = width;
        }
        this.onApplySectionFormat(undefined, sectionFormat);
    };
    /**
     * @private
     * @returns {void}
     */
    Editor.prototype.onLandscape = function () {
        var sectionFormat = new WSectionFormat();
        var width = this.documentHelper.selection.sectionFormat.pageWidth;
        var height = this.documentHelper.selection.sectionFormat.pageHeight;
        if (width < height) {
            sectionFormat.pageWidth = height;
            sectionFormat.pageHeight = width;
        }
        this.onApplySectionFormat(undefined, sectionFormat);
    };
    Editor.prototype.copyValues = function () {
        var format = new WSectionFormat();
        format.bottomMargin = this.documentHelper.selection.sectionFormat.bottomMargin;
        format.topMargin = this.documentHelper.selection.sectionFormat.topMargin;
        format.leftMargin = this.documentHelper.selection.sectionFormat.leftMargin;
        format.rightMargin = this.documentHelper.selection.sectionFormat.rightMargin;
        format.pageHeight = this.documentHelper.selection.sectionFormat.pageHeight;
        format.pageWidth = this.documentHelper.selection.sectionFormat.pageWidth;
        format.footerDistance = this.documentHelper.selection.sectionFormat.footerDistance;
        format.headerDistance = this.documentHelper.selection.sectionFormat.headerDistance;
        return format;
    };
    /**
     * @param property
     * @private
     * @returns {void}
     */
    Editor.prototype.changeMarginValue = function (property) {
        var sectionFormat = this.copyValues();
        if (property === 'lastCustomSetting' || property === 'normal') {
            sectionFormat.topMargin = 72;
            sectionFormat.bottomMargin = 72;
            sectionFormat.leftMargin = 72;
            sectionFormat.rightMargin = 72;
        }
        else if (property === 'narrow') {
            sectionFormat.topMargin = 36;
            sectionFormat.bottomMargin = 36;
            sectionFormat.leftMargin = 36;
            sectionFormat.rightMargin = 36;
        }
        else if (property === 'moderate') {
            sectionFormat.topMargin = 72;
            sectionFormat.bottomMargin = 72;
            sectionFormat.leftMargin = 54;
            sectionFormat.rightMargin = 54;
        }
        else if (property === 'wide') {
            sectionFormat.topMargin = 72;
            sectionFormat.bottomMargin = 72;
            sectionFormat.leftMargin = 144;
            sectionFormat.rightMargin = 144;
        }
        else if (property === 'mirrored') {
            sectionFormat.topMargin = 72;
            sectionFormat.bottomMargin = 72;
            sectionFormat.leftMargin = 90;
            sectionFormat.rightMargin = 72;
        }
        else if (property === 'office2003Default') {
            sectionFormat.topMargin = 72;
            sectionFormat.bottomMargin = 72;
            sectionFormat.leftMargin = 90;
            sectionFormat.rightMargin = 90;
        }
        this.onApplySectionFormat(undefined, sectionFormat);
    };
    /**
     * @param property
     * @private
     * @returns {void}
     */
    Editor.prototype.onPaperSize = function (property) {
        var sectionFormat = this.copyValues();
        var width = this.documentHelper.selection.sectionFormat.pageWidth;
        var height = this.documentHelper.selection.sectionFormat.pageHeight;
        if (property === 'letter') {
            if (width < height) {
                sectionFormat.pageWidth = 612;
                sectionFormat.pageHeight = 792;
            }
            else {
                sectionFormat.pageWidth = 792;
                sectionFormat.pageHeight = 612;
            }
        }
        else if (property === 'tabloid') {
            if (width < height) {
                sectionFormat.pageWidth = 792;
                sectionFormat.pageHeight = 1224;
            }
            else {
                sectionFormat.pageWidth = 1224;
                sectionFormat.pageHeight = 792;
            }
        }
        else if (property === 'legal') {
            if (width < height) {
                sectionFormat.pageWidth = 612;
                sectionFormat.pageHeight = 1008;
            }
            else {
                sectionFormat.pageWidth = 1008;
                sectionFormat.pageHeight = 612;
            }
        }
        else if (property === 'statement') {
            if (width < height) {
                sectionFormat.pageWidth = 396;
                sectionFormat.pageHeight = 612;
            }
            else {
                sectionFormat.pageWidth = 612;
                sectionFormat.pageHeight = 396;
            }
        }
        else if (property === 'executive') {
            if (width < height) {
                sectionFormat.pageWidth = 522;
                sectionFormat.pageHeight = 756;
            }
            else {
                sectionFormat.pageWidth = 756;
                sectionFormat.pageHeight = 522;
            }
        }
        else if (property === 'a3') {
            if (width < height) {
                sectionFormat.pageWidth = 841.9;
                sectionFormat.pageHeight = 1190.55;
            }
            else {
                sectionFormat.pageWidth = 1190.55;
                sectionFormat.pageHeight = 841.9;
            }
        }
        else if (property === 'a4') {
            if (width < height) {
                sectionFormat.pageWidth = 595.3;
                sectionFormat.pageHeight = 841.9;
            }
            else {
                sectionFormat.pageWidth = 841.9;
                sectionFormat.pageHeight = 595.3;
            }
        }
        else if (property === 'a5') {
            if (width < height) {
                sectionFormat.pageWidth = 419.55;
                sectionFormat.pageHeight = 595.3;
            }
            else {
                sectionFormat.pageWidth = 595.3;
                sectionFormat.pageHeight = 419.55;
            }
        }
        else if (property === 'b4') {
            if (width < height) {
                sectionFormat.pageWidth = 728.5;
                sectionFormat.pageHeight = 1031.8;
            }
            else {
                sectionFormat.pageWidth = 1031.8;
                sectionFormat.pageHeight = 728.5;
            }
        }
        else if (property === 'b5') {
            if (width < height) {
                sectionFormat.pageWidth = 515.9;
                sectionFormat.pageHeight = 728.5;
            }
            else {
                sectionFormat.pageWidth = 728.5;
                sectionFormat.pageHeight = 515.9;
            }
        }
        this.onApplySectionFormat(undefined, sectionFormat);
    };
    //Update List Items
    /**
     * @param blockAdv
     * @param updateNextBlockList
     * @param blockAdv
     * @param updateNextBlockList
     * @private
     * @returns {void}
     */
    Editor.prototype.updateListItemsTillEnd = function (blockAdv, updateNextBlockList) {
        var block = updateNextBlockList ? this.documentHelper.selection.getNextRenderedBlock(blockAdv) : blockAdv;
        while (!isNullOrUndefined(block) && !this.documentHelper.isTextInput) {
            //Updates the list value of the rendered paragraph.
            this.updateRenderedListItems(block);
            block = block.getSplitWidgets().pop().nextRenderedWidget;
        }
    };
    /**
     * @param block
     * @private
     * @returns {void}
     */
    Editor.prototype.updateWholeListItems = function (block, isFindingListParagraph, listID) {
        this.documentHelper.renderedLists.clear();
        this.documentHelper.renderedLevelOverrides = [];
        var sectionIndex = block.bodyWidget.index;
        var currentBlock;
        for (var j = 0; j < this.documentHelper.pages.length; j++) {
            var page = this.documentHelper.pages[j];
            for (var i = 0; i < page.bodyWidgets.length; i++) {
                if (page.bodyWidgets[i].index === sectionIndex) {
                    currentBlock = this.getNextBlockForList(page.bodyWidgets[i].firstChild);
                    if (!isNullOrUndefined(currentBlock)) {
                        break;
                    }
                }
            }
            if (!isNullOrUndefined(currentBlock)) {
                break;
            }
        }
        var isListUpdated = false;
        do {
            var listSearchResultInfo = null;
            if (isFindingListParagraph) {
                listSearchResultInfo = { paragraph: null, listId: listID };
            }
            isListUpdated = this.updateListItems(currentBlock, block, listSearchResultInfo);
            if (isListUpdated) {
                if (!isNullOrUndefined(listSearchResultInfo)) {
                    if (listSearchResultInfo.paragraph == block) {
                        return null;
                    }
                    else {
                        return listSearchResultInfo.paragraph;
                    }
                }
                break;
            }
            currentBlock = currentBlock.getSplitWidgets().pop().nextRenderedWidget;
            if (!isNullOrUndefined(currentBlock)) {
                currentBlock = this.getNextBlockForList(currentBlock);
            }
        } while (currentBlock);
        return null;
    };
    Editor.prototype.getNextBlockForList = function (currentBlock) {
        if (currentBlock instanceof ParagraphWidget &&
            this.documentHelper.layout.isFirstElementWithPageBreak(currentBlock)) {
            var nextBlock = currentBlock.nextRenderedWidget;
            if (!isNullOrUndefined(nextBlock) && nextBlock.equals(currentBlock)) {
                return nextBlock;
            }
        }
        return currentBlock;
    };
    Editor.prototype.updateListItems = function (blockAdv, block, listSearchResultInfo) {
        var isListUpdated = false;
        if (blockAdv instanceof ParagraphWidget) {
            isListUpdated = this.updateListItemsForPara(blockAdv, block, listSearchResultInfo);
        }
        else {
            isListUpdated = this.updateListItemsForTable(blockAdv, block, listSearchResultInfo);
        }
        return isListUpdated;
    };
    Editor.prototype.updateListItemsForTable = function (table, block, listSearchResultInfo) {
        if (isNullOrUndefined(listSearchResultInfo) && block instanceof TableWidget && table.equals(block)) {
            return true;
        }
        var row = table.firstChild;
        do {
            var isListUpdated = this.updateListItemsForRow(row, block, listSearchResultInfo);
            if (isListUpdated) {
                return true;
            }
            row = row.getSplitWidgets().pop().nextRenderedWidget;
        } while (row);
        return false;
    };
    Editor.prototype.updateListItemsForRow = function (row, block, listSearchResultInfo) {
        if (isNullOrUndefined(listSearchResultInfo) && block.isInsideTable && row.childWidgets.indexOf(this.documentHelper.selection.getContainerCell(block.associatedCell)) !== -1) {
            //Returns as list updated, inorder to start list numbering from first list paragraph of this row.
            return true;
        }
        var cell = row.firstChild;
        do {
            this.updateListItemsForCell(cell, block, listSearchResultInfo);
            if (!isNullOrUndefined(listSearchResultInfo) && !isNullOrUndefined(listSearchResultInfo.paragraph)) {
                return true;
            }
            cell = cell.nextRenderedWidget;
        } while (cell);
        return false;
    };
    Editor.prototype.updateListItemsForCell = function (cell, block, listSearchResultInfo) {
        if (cell.childWidgets.length === 0) {
            return;
        }
        var currentBlock = cell.firstChild;
        do {
            this.updateListItems(currentBlock, block, listSearchResultInfo);
            if (!isNullOrUndefined(listSearchResultInfo) && !isNullOrUndefined(listSearchResultInfo.paragraph)) {
                break;
            }
            currentBlock = currentBlock.getSplitWidgets().pop().nextRenderedWidget;
        } while (currentBlock);
    };
    // public abstract updateListParagraphs(): void;
    /**
     * @param block
     * @private
     * @returns {void}
     */
    Editor.prototype.updateRenderedListItems = function (block) {
        if (block instanceof ParagraphWidget) {
            // if the block is a column break pick the next rendered widget.
            if (block.isEndsWithColumnBreak) {
                block = block.nextRenderedWidget;
            }
            this.updateRenderedListItemsForPara(block);
        }
        else {
            this.updateRenderedListItemsForTable(block);
        }
    };
    Editor.prototype.updateRenderedListItemsForTable = function (table) {
        var row = table.firstChild;
        do {
            this.updateRenderedListItemsForRow(row);
            row = row.getSplitWidgets().pop().nextRenderedWidget;
        } while (row);
    };
    Editor.prototype.updateRenderedListItemsForRow = function (row) {
        var cell = row.firstChild;
        do {
            this.updateRenderedListItemsForCell(cell);
            cell = cell.nextRenderedWidget;
        } while (cell);
    };
    Editor.prototype.updateRenderedListItemsForCell = function (cell) {
        if (cell.childWidgets.length === 0) {
            return;
        }
        var currentBlock = cell.firstChild;
        do {
            this.updateRenderedListItems(currentBlock);
            currentBlock = currentBlock.getSplitWidgets().pop().nextRenderedWidget;
        } while (currentBlock);
    };
    Editor.prototype.updateListItemsForPara = function (paragraph, block, listSearchResultInfo) {
        if (paragraph.equals(block)) {
            if (!isNullOrUndefined(listSearchResultInfo)) {
                listSearchResultInfo.paragraph = paragraph;
            }
            return true;
        }
        else {
            var currentList = undefined;
            var levelNumber = 0;
            if (!isNullOrUndefined(paragraph.paragraphFormat) && !isNullOrUndefined(paragraph.paragraphFormat.listFormat)) {
                if (!isNullOrUndefined(listSearchResultInfo) && paragraph.paragraphFormat.listFormat.listId === listSearchResultInfo.listId) {
                    listSearchResultInfo.paragraph = paragraph;
                    return true;
                }
                currentList = this.documentHelper.getListById(paragraph.paragraphFormat.listFormat.listId);
                levelNumber = paragraph.paragraphFormat.listFormat.listLevelNumber;
            }
            if (!isNullOrUndefined(currentList) && !isNullOrUndefined(this.documentHelper.getAbstractListById(currentList.abstractListId))
                && !isNullOrUndefined(this.documentHelper.getAbstractListById(currentList.abstractListId).levels[levelNumber])) {
                var currentListLevel = this.documentHelper.layout.getListLevel(currentList, levelNumber);
                //Updates the list numbering from document start for reLayouting.
                this.updateListNumber(currentListLevel, paragraph, false);
            }
        }
        return false;
    };
    Editor.prototype.updateRenderedListItemsForPara = function (paragraph) {
        if (!isNullOrUndefined(this.documentHelper.getListById(paragraph.paragraphFormat.listFormat.listId))) {
            var currentList = this.documentHelper.getListById(paragraph.paragraphFormat.listFormat.listId);
            var listLevelNumber = paragraph.paragraphFormat.listFormat.listLevelNumber;
            if (!isNullOrUndefined(currentList) && !isNullOrUndefined(this.documentHelper.getAbstractListById(currentList.abstractListId))
                && !isNullOrUndefined(this.documentHelper.getAbstractListById(currentList.abstractListId).levels[paragraph.paragraphFormat.listFormat.listLevelNumber])) {
                var currentListLevel = this.documentHelper.layout.getListLevel(currentList, listLevelNumber);
                //Updates the list numbering from document start for reLayouting.
                this.updateListNumber(currentListLevel, paragraph, true);
            }
        }
    };
    Editor.prototype.updateListNumber = function (currentListLevel, paragraph, isUpdate) {
        if (currentListLevel.listLevelPattern !== 'Bullet') {
            var element = undefined;
            if (paragraph.childWidgets.length > 0) {
                var lineWidget = paragraph.childWidgets[0];
                if (lineWidget.children.length > 0) {
                    element = lineWidget.children[0];
                }
            }
            var listWholeWidth = void 0;
            if (!isNullOrUndefined(element) && element.nextElement instanceof ListTextElementBox) {
                listWholeWidth = element.width + element.nextElement.width;
            }
            if (!isNullOrUndefined(element) && element instanceof ListTextElementBox) {
                var text = this.documentHelper.layout.getListNumber(paragraph.paragraphFormat.listFormat);
                if (isUpdate) {
                    var prevWidth = element.width;
                    element.text = text;
                    var currentWidth = this.documentHelper.textHelper.getTextSize(element, element.characterFormat);
                    if (currentWidth > prevWidth) {
                        element.width = currentWidth;
                    }
                    this.documentHelper.textHelper.updateTextSize(element, paragraph);
                    if (!isNullOrUndefined(listWholeWidth) && element.width < listWholeWidth) {
                        element.nextElement.width = (listWholeWidth - element.width);
                    }
                }
            }
        }
    };
    /**
     * Get offset value to update in selection
     *
     * @param selection
     * @private
     * @returns {void}
     */
    Editor.prototype.getOffsetValue = function (selection) {
        if (this.startParagraph) {
            var lineInfo = selection.getLineInfoBasedOnParagraph(this.startParagraph, this.startOffset);
            selection.start.setPositionFromLine(lineInfo.line, lineInfo.offset);
        }
        selection.start.updatePhysicalPosition(true);
        if (selection.isEmpty) {
            selection.end.setPositionInternal(selection.start);
        }
        else {
            if (this.endParagraph) {
                var lineInfo = selection.getLineInfoBasedOnParagraph(this.endParagraph, this.endOffset);
                selection.end.setPositionFromLine(lineInfo.line, lineInfo.offset);
            }
            selection.end.updatePhysicalPosition(true);
        }
    };
    Editor.prototype.setPositionParagraph = function (paragraph, offset, skipSelectionChange) {
        var selection = this.documentHelper.selection;
        var lineInfo = selection.getLineInfoBasedOnParagraph(paragraph, offset);
        selection.start.setPositionFromLine(lineInfo.line, lineInfo.offset);
        selection.end.setPositionInternal(selection.start);
        if (!skipSelectionChange) {
            selection.fireSelectionChanged(true);
        }
    };
    /**
     * @param textPosition
     * @param editPosition
     * @param textPosition
     * @param editPosition
     * @private
     * @returns {void}
     */
    Editor.prototype.setPositionForCurrentIndex = function (textPosition, editPosition) {
        var blockInfo = this.selection.getParagraph({ index: editPosition });
        var lineInfo = this.selection.getLineInfoBasedOnParagraph(blockInfo.paragraph, blockInfo.offset);
        textPosition.setPositionForLineWidget(lineInfo.line, lineInfo.offset);
    };
    /**
     * Inserts the page number in the current cursor position.
     *
     * @param {string} numberFormat - Optional switch that overrides the numeral style of the page number.
     * @returns {void}
     */
    Editor.prototype.insertPageNumber = function (numberFormat) {
        if (isNullOrUndefined(numberFormat)) {
            numberFormat = '';
        }
        else {
            numberFormat = ' \\*' + numberFormat;
        }
        var fieldCode = 'PAGE ' + numberFormat + ' \\* MERGEFORMAT';
        this.createFields(fieldCode);
    };
    /**
     * @param numberFormat
     * @private
     * @returns {void}
     */
    Editor.prototype.insertPageCount = function (numberFormat) {
        if (isNullOrUndefined(numberFormat)) {
            numberFormat = '';
        }
        else {
            numberFormat = ' \*' + numberFormat;
        }
        var fieldCode = 'NUMPAGES ' + numberFormat + ' \* MERGEFORMAT';
        this.createFields(fieldCode);
    };
    Editor.prototype.createFields = function (fieldCode) {
        var paragraph = new ParagraphWidget();
        var line = new LineWidget(paragraph);
        var fieldBegin = new FieldElementBox(0);
        line.children.push(fieldBegin);
        var fieldtext = new FieldTextElementBox();
        fieldtext.fieldBegin = fieldBegin;
        fieldtext.text = '1';
        var text = new TextElementBox();
        text.text = fieldCode;
        line.children.push(text);
        var fieldSeparator = new FieldElementBox(2);
        fieldSeparator.fieldBegin = fieldBegin;
        fieldBegin.fieldSeparator = fieldSeparator;
        line.children.push(fieldSeparator);
        line.children.push(fieldtext);
        var fieldEnd = new FieldElementBox(1);
        fieldEnd.fieldBegin = fieldBegin;
        fieldEnd.fieldSeparator = fieldSeparator;
        fieldSeparator.fieldEnd = fieldEnd;
        fieldBegin.fieldEnd = fieldEnd;
        line.children.push(fieldEnd);
        fieldBegin.line = line;
        paragraph.childWidgets.push(line);
        this.documentHelper.fields.push(fieldBegin);
        var bodyWidget = new BodyWidget();
        bodyWidget.sectionFormat = new WSectionFormat(bodyWidget);
        bodyWidget.childWidgets.push(paragraph);
        this.pasteContentsInternal([bodyWidget], false);
    };
    /**
     * Inserts the specified bookmark at the current selection range.
     *
     * @param {string} name Specify the name of bookmark to be inserted.
     * @returns {void}
     */
    Editor.prototype.insertBookmark = function (name) {
        if (this.documentHelper.bookmarks.containsKey(name)) {
            var existingBookmark = this.documentHelper.bookmarks.get(name);
            existingBookmark.line.children.splice(existingBookmark.line.children.indexOf(existingBookmark), 1);
            /* eslint-disable-next-line max-len */
            if (existingBookmark.reference) {
                existingBookmark.reference.line.children.splice(existingBookmark.reference.line.children.indexOf(existingBookmark.reference), 1);
            }
            this.documentHelper.bookmarks.remove(name);
            if (!isNullOrUndefined(existingBookmark.reference) && !isNullOrUndefined(existingBookmark.reference.paragraph.associatedCell)) {
                var row = existingBookmark.reference.paragraph.associatedCell.ownerRow;
                if (row.isRenderBookmarkEnd) {
                    row.isRenderBookmarkEnd = false;
                }
                if (!isNullOrUndefined(existingBookmark.properties)) {
                    var columnFirst = parseInt(existingBookmark.properties["columnFirst"]);
                    var row_1 = existingBookmark.paragraph.associatedCell.ownerRow;
                    var cell = row_1.getCellUsingColumnIndex(row_1.rowIndex, columnFirst);
                    if (!isNullOrUndefined(cell)) {
                        cell.isRenderBookmarkStart = false;
                    }
                    var columnLast = parseInt(existingBookmark.properties["columnLast"]);
                    var endRow = existingBookmark.reference.paragraph.associatedCell.ownerRow;
                    var endCell = undefined;
                    var cellIndex = columnLast;
                    while (isNullOrUndefined(endCell) && cellIndex > -1) {
                        endCell = endRow.getCell(endRow.rowIndex, cellIndex);
                        if (isNullOrUndefined(endCell)) {
                            cellIndex--;
                        }
                    }
                    if (endCell.isRenderBookmarkEnd) {
                        endCell.isRenderBookmarkEnd = false;
                    }
                }
            }
            else {
                if (!isNullOrUndefined(existingBookmark.properties)) {
                    var columnFirst = parseInt(existingBookmark.properties["columnFirst"]);
                    var row = existingBookmark.paragraph.associatedCell.ownerRow;
                    var cell = row.getCellUsingColumnIndex(row.rowIndex, columnFirst);
                    if (!isNullOrUndefined(cell) && cell.isRenderBookmarkStart) {
                        cell.isRenderBookmarkStart = false;
                    }
                }
            }
        }
        var bookmark = new BookmarkElementBox(0);
        bookmark.name = name;
        var bookmarkEnd = new BookmarkElementBox(1);
        bookmarkEnd.name = name;
        bookmark.reference = bookmarkEnd;
        bookmarkEnd.reference = bookmark;
        bookmark.properties = this.selection.getBookmarkProperties(bookmark);
        bookmarkEnd.properties = this.selection.getBookmarkProperties(bookmarkEnd);
        this.owner.isShiftingEnabled = true;
        this.initComplexHistory('InsertBookmark');
        this.insertElements([bookmarkEnd], [bookmark], true);
        if (this.editorHistory) {
            this.editorHistory.updateComplexHistoryInternal();
        }
        if (this.documentHelper.owner.enableHeaderAndFooter) {
            this.updateHeaderFooterWidget();
        }
        this.documentHelper.bookmarks.add(name, bookmark);
        if (!isNullOrUndefined(bookmark.properties)) {
            this.selection.selectBookmarkInTable(bookmark);
        }
        else {
            this.selection.start.setPositionForSelection(bookmark.line, bookmark, 1, this.selection.start.location);
            var endOffset = 0;
            if (!isNullOrUndefined(bookmarkEnd.properties)) {
                if (bookmarkEnd.properties['isAfterParagraphMark']) {
                    endOffset = 2;
                }
            }
            this.selection.end.setPositionForSelection(bookmarkEnd.line, bookmarkEnd, endOffset, this.selection.end.location);
            var block = this.documentHelper.blockToShift;
            if (!isNullOrUndefined(block) && this.viewer instanceof PageLayoutViewer && block.bodyWidget.sectionFormat.columns.length > 1) {
                var lastbody = this.documentHelper.layout.getBodyWidget(block.bodyWidget, false);
                if ((!isNullOrUndefined(lastbody.nextRenderedWidget) && lastbody.nextRenderedWidget.sectionFormat.breakCode === 'NoBreak' && lastbody.page === lastbody.nextRenderedWidget.page)) {
                    this.reLayout(this.selection);
                }
            }
            this.owner.isShiftingEnabled = false;
            this.selection.fireSelectionChanged(true);
            this.fireContentChange();
        }
        if (this.owner.documentEditorSettings.showBookmarks == true) {
            this.viewer.updateScrollBars();
        }
    };
    /**
     * Deletes the specified bookmark in the current document.
     *
     * @param {string} bookmarkName Specify the name of bookmark to be deleted.
     * @returns {void}
     */
    Editor.prototype.deleteBookmark = function (bookmarkName) {
        var bookmarks = this.documentHelper.bookmarks;
        var bookmark = bookmarks.get(bookmarkName);
        if (bookmark instanceof BookmarkElementBox) {
            this.initHistory('DeleteBookmark');
            if (this.editorHistory) {
                this.editorHistory.currentBaseHistoryInfo.setBookmarkInfo(bookmark);
                this.editorHistory.updateHistory();
            }
            this.deleteBookmarkInternal(bookmark);
        }
        this.fireContentChange();
        if (this.owner.documentEditorSettings.showBookmarks == true) {
            this.viewer.updateScrollBars();
        }
    };
    /**
     * @param bookmark
     * @private
     * @returns {void}
     */
    Editor.prototype.deleteBookmarkInternal = function (bookmark) {
        var previousNode = bookmark.previousNode;
        if (previousNode instanceof FieldElementBox && previousNode.fieldType === 0
            && !isNullOrUndefined(previousNode.formFieldData)) {
            previousNode.formFieldData.name = '';
        }
        if (!isNullOrUndefined(bookmark.properties)) {
            var columnFirst = parseInt(bookmark.properties["columnFirst"]);
            var row = bookmark.paragraph.associatedCell.ownerRow;
            var cell = row.getCellUsingColumnIndex(row.rowIndex, columnFirst);
            if (!isNullOrUndefined(cell)) {
                cell.isRenderBookmarkStart = false;
            }
            var columnLast = parseInt(bookmark.properties["columnLast"]);
            if (!isNullOrUndefined(bookmark.reference) && !isNullOrUndefined(bookmark.reference.paragraph.associatedCell)) {
                var endRow = bookmark.reference.paragraph.associatedCell.ownerRow;
                var endCell = undefined;
                var cellIndex = columnLast;
                while (isNullOrUndefined(endCell) && cellIndex > -1) {
                    endCell = endRow.getCell(endRow.rowIndex, cellIndex);
                    if (isNullOrUndefined(endCell)) {
                        cellIndex--;
                    }
                }
                if (endCell.isRenderBookmarkEnd) {
                    endCell.isRenderBookmarkEnd = false;
                }
            }
        }
        else {
            if (this.documentHelper.selection.isRenderBookmarkAtEnd(bookmark)) {
                if (!isNullOrUndefined(bookmark.reference) && !isNullOrUndefined(bookmark.reference.paragraph.associatedCell)) {
                    var row = bookmark.reference.paragraph.associatedCell.ownerRow;
                    if (row.isRenderBookmarkEnd) {
                        row.isRenderBookmarkEnd = false;
                    }
                }
            }
        }
        this.documentHelper.bookmarks.remove(bookmark.name);
        bookmark.line.children.splice(bookmark.indexInOwner, 1);
        if (!isNullOrUndefined(bookmark.reference)) {
            bookmark.reference.line.children.splice(bookmark.reference.indexInOwner, 1);
        }
        // Remove bookmark from header footer collections
        var paragraph = bookmark.line.paragraph;
        if (bookmark.line.paragraph.isInHeaderFooter) {
            var headerFooterWidget = undefined;
            if (paragraph.containerWidget instanceof TableCellWidget) {
                headerFooterWidget = paragraph.containerWidget.getContainerTable().containerWidget;
            }
            else if (paragraph.containerWidget instanceof HeaderFooterWidget) {
                headerFooterWidget = paragraph.containerWidget;
            }
            this.updateHeaderFooterWidget(headerFooterWidget);
        }
    };
    Editor.prototype.getSelectionInfo = function (isBookmark) {
        var start = this.selection.start;
        var end = this.selection.end;
        if (!this.selection.isForward) {
            start = this.selection.end;
            end = this.selection.start;
        }
        if (!(end.offset === this.selection.getLineLength(end.currentWidget) + 1
            && this.selection.isParagraphLastLine(end.currentWidget))) {
            end.offset += 1;
        }
        var blockInfo = this.selection.getParagraphInfo(start);
        var startIndex = this.selection.getHierarchicalIndex(blockInfo.paragraph, blockInfo.offset.toString());
        blockInfo = this.selection.getParagraphInfo(end);
        var endIndex = this.selection.getHierarchicalIndex(blockInfo.paragraph, blockInfo.offset.toString());
        var selectedWidgets = this.selection.selectedWidgets.keys;
        if ((!isNullOrUndefined(isBookmark) && isBookmark == true) && !this.selection.hasMergedCells()) {
            if (start.paragraph.isInsideTable) {
                var startCell_1 = this.selection.getCellFromSelection(0);
                if (!isNullOrUndefined(startCell_1) && startCell_1 instanceof TableCellWidget) {
                    startIndex = this.selection.getActualOffset(startCell_1, 0);
                }
            }
            if (end.paragraph.isInsideTable) {
                var endCell_1 = this.selection.getCellFromSelection(1);
                if (!isNullOrUndefined(endCell_1) && endCell_1 instanceof TableCellWidget) {
                    endIndex = this.selection.getActualOffset(endCell_1, 1);
                }
            }
        }
        else {
            if (selectedWidgets[0] instanceof TableCellWidget) {
                if (start.paragraph.isInsideTable) {
                    var startCell = this.selection.getCellFromSelectionInTable(0);
                    if (!isNullOrUndefined(startCell) && startCell instanceof TableCellWidget) {
                        startIndex = this.selection.getActualOffset(startCell, 0);
                    }
                }
            }
            if (selectedWidgets[selectedWidgets.length - 1] instanceof TableCellWidget) {
                if (end.paragraph.isInsideTable) {
                    var endCell = this.selection.getCellFromSelectionInTable(1);
                    if (!isNullOrUndefined(endCell) && endCell instanceof TableCellWidget) {
                        endIndex = this.selection.getActualOffset(endCell, 1);
                    }
                }
            }
        }
        return { 'start': startIndex, 'end': endIndex };
    };
    Editor.prototype.insertElements = function (endElements, startElements, isBookmark) {
        var info = this.getSelectionInfo(isBookmark);
        if (isBookmark) {
            if (!isNullOrUndefined(startElements[0].properties) && startElements[0].bookmarkType == 0) {
                var cells = this.selection.selectedWidgets.keys;
                if (cells[0] instanceof TableCellWidget && cells[cells.length - 1] instanceof TableCellWidget) {
                    if (cells.length > 0) {
                        var firstcell = cells[0];
                        var lastCell = cells[cells.length - 1];
                        var firstrow = firstcell.ownerRow;
                        var lastRow = lastCell.ownerRow;
                        var startCell = firstrow.getCell(firstrow.rowIndex, 0);
                        var firstPara = this.documentHelper.getFirstParagraphInCell(startCell);
                        info.start = this.documentHelper.selection.getHierarchicalIndex(firstPara, "0");
                        var lastCellInRow = lastRow.getCell(lastRow.rowIndex, lastRow.childWidgets.length - 1);
                        var lastPara = this.selection.getLastParagraph(lastCellInRow);
                        var offset = this.selection.getParagraphLength(lastPara);
                        info.end = this.documentHelper.selection.getHierarchicalIndex(lastPara, offset.toString());
                    }
                }
            }
        }
        if (!isNullOrUndefined(startElements)) {
            this.insertElementsInternal(this.selection.getTextPosBasedOnLogicalIndex(info.start), startElements);
        }
        if (!isNullOrUndefined(endElements)) {
            this.insertElementsInternal(this.selection.getTextPosBasedOnLogicalIndex(info.end), endElements);
        }
    };
    Editor.prototype.insertElementsInternal = function (position, elements, isRelayout) {
        this.selection.selectPosition(position, position);
        this.initHistory('InsertElements');
        this.updateInsertPosition();
        var indexInInline = 0;
        var paragraphInfo = this.selection.getParagraphInfo(this.selection.start);
        if (this.selection.start.paragraph.isEmpty()) {
            var paragraph = this.selection.start.paragraph;
            paragraph.childWidgets[0].children.push(elements[0]);
            elements[0].line = paragraph.childWidgets[0];
            elements[0].linkFieldCharacter(this.documentHelper);
            this.documentHelper.layout.reLayoutParagraph(paragraph, 0, 0);
            this.setPositionParagraph(paragraphInfo.paragraph, paragraphInfo.offset + length, true);
            position.setPositionForSelection(elements[0].line, elements[0], elements[0].length, this.selection.start.location);
            this.selection.selectPosition(position, position);
        }
        else {
            var inlineObj = this.selection.start.currentWidget.getInline(this.documentHelper.selection.start.offset, indexInInline);
            var curInline = inlineObj.element;
            indexInInline = inlineObj.index;
            var firstElement = elements[0];
            this.insertElementInternal(curInline, firstElement, indexInInline, undefined, true);
            var index = firstElement.indexInOwner;
            var lastElement = firstElement;
            for (var i = 1; i < elements.length; i++) {
                lastElement = elements[i];
                firstElement.line.children.splice(index + i, 0, lastElement);
            }
            position.setPositionForSelection(lastElement.line, lastElement, lastElement.length, this.selection.start.location);
            this.selection.selectPosition(position, position);
        }
        if (this.editorHistory) {
            if (this.checkEndPosition()) {
                this.updateHistoryPosition(this.selection.start, false);
            }
            this.editorHistory.updateHistory();
        }
    };
    /**
     * @param index
     * @private
     * @returns {CommentElementBox}
     */
    Editor.prototype.getCommentElementBox = function (index) {
        var position = index.split(';');
        var comment = this.documentHelper.comments[parseInt(position[1], 10)];
        if (position.length > 2 && position[2] !== '') {
            return comment.replyComments[parseInt(position[2], 10)];
        }
        return comment;
    };
    /**
     * @param position
     * @private
     * @returns {BlockInfo}
     */
    Editor.prototype.getBlock = function (position) {
        var bodyWidget = this.selection.getBodyWidget(position);
        return this.getBlockInternal(bodyWidget, position);
    };
    Editor.prototype.getBlockInternal = function (widget, position) {
        if (position.index === '' || isNullOrUndefined(position)) {
            return undefined;
        }
        var index = position.index.indexOf(';');
        var value = position.index.substring(0, index);
        position.index = position.index.substring(index).replace(';', '');
        var node = widget;
        // if (node instanceof WSection && value === 'HF') {
        //     //Gets the block in Header footers.
        //     let blockObj: BlockInfo = this.getBlock((node as WSection).headerFooters, position);
        //     return { 'node': (!isNullOrUndefined(blockObj)) ? blockObj.node : undefined, 'position': (!isNullOrUndefined(blockObj)) ? blockObj.position : undefined };
        // }
        index = parseInt(value, 10);
        var childWidget = this.selection.getBlockByIndex(widget, index);
        if (childWidget) {
            var child = childWidget;
            if (position.index.indexOf(';') >= 0) {
                if (child instanceof ParagraphWidget) {
                    if (position.index.indexOf(';') >= 0) {
                        position.index = '0';
                    }
                    return { 'node': child, 'position': position };
                }
                if (child instanceof Widget) {
                    var blockObj = this.getBlockInternal(child, position);
                    return { 'node': (!isNullOrUndefined(blockObj)) ? blockObj.node : undefined, 'position': (!isNullOrUndefined(blockObj)) ? blockObj.position : undefined };
                }
            }
            else {
                return { 'node': child, 'position': position };
            }
        }
        else {
            return { 'node': node, 'position': position };
        }
        return { 'node': node, 'position': position };
    };
    /**
     * @param position
     * @param isInsertPosition
     * @private
     * @returns {void}
     */
    Editor.prototype.updateHistoryPosition = function (position, isInsertPosition) {
        if (this.editorHistory && !isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo)) {
            var hierarchicalIndex = void 0;
            if (position instanceof TextPosition) {
                var blockInfo = this.selection.getParagraphInfo(position);
                hierarchicalIndex = this.selection.getHierarchicalIndex(blockInfo.paragraph, blockInfo.offset.toString());
            }
            else {
                hierarchicalIndex = position;
            }
            if (isInsertPosition) {
                this.editorHistory.currentBaseHistoryInfo.insertPosition = hierarchicalIndex;
            }
            else {
                this.editorHistory.currentBaseHistoryInfo.endPosition = hierarchicalIndex;
            }
        }
    };
    /**
     * Applies the borders based on given settings.
     *
     * @param {BorderSettings} settings Specify the border settings to be applied.
     * @returns {void}
     */
    Editor.prototype.applyBorders = function (settings) {
        this.initHistory('Borders');
        var startPos = this.selection.isForward ? this.selection.start : this.selection.end;
        var endPos = this.selection.isForward ? this.selection.end : this.selection.start;
        var table = startPos.paragraph.associatedCell.ownerTable;
        table = table.combineWidget(this.owner.viewer);
        if (this.editorHistory) {
            var clonedTable = this.cloneTableToHistoryInfo(table);
        }
        var startCell = startPos.paragraph.associatedCell;
        var endCell = endPos.paragraph.associatedCell;
        var cells;
        var border = this.getBorder(settings.borderColor, settings.lineWidth, settings.borderStyle);
        if (this.selection.isEmpty) {
            //Apply borders for current selected cell initially.
            if (settings.type === 'OutsideBorders' || settings.type === 'AllBorders' ||
                settings.type === 'LeftBorder') {
                endCell.cellFormat.borders.left.copyFormat(border);
            }
            if (settings.type === 'OutsideBorders' || settings.type === 'AllBorders' ||
                settings.type === 'TopBorder') {
                endCell.cellFormat.borders.top.copyFormat(border);
            }
            if (settings.type === 'OutsideBorders' || settings.type === 'AllBorders' ||
                settings.type === 'RightBorder') {
                endCell.cellFormat.borders.right.copyFormat(border);
            }
            if (settings.type === 'OutsideBorders' || settings.type === 'AllBorders' ||
                settings.type === 'BottomBorder') {
                endCell.cellFormat.borders.bottom.copyFormat(border);
            }
            if (settings.type === 'AllBorders' || settings.type === 'InsideBorders'
                || settings.type === 'InsideVerticalBorder') {
                endCell.cellFormat.borders.vertical.copyFormat(border);
            }
            if (settings.type === 'AllBorders' || settings.type === 'InsideBorders'
                || settings.type === 'InsideHorizontalBorder') {
                endCell.cellFormat.borders.horizontal.copyFormat(border);
            }
            if (settings.type === 'NoBorder') {
                this.clearAllBorderValues(endCell.cellFormat.borders);
            }
        }
        else {
            if (settings.type === 'OutsideBorders' || settings.type === 'TopBorder') {
                var selectedCell = this.getTopBorderCellsOnSelection();
                for (var i = 0; i < selectedCell.length; i++) {
                    selectedCell[i].cellFormat.borders.top.copyFormat(border);
                }
            }
            if (settings.type === 'OutsideBorders' || settings.type === 'LeftBorder') {
                var selectedCell = this.getLeftBorderCellsOnSelection();
                for (var i = 0; i < selectedCell.length; i++) {
                    selectedCell[i].cellFormat.borders.left.copyFormat(border);
                }
            }
            if (settings.type === 'OutsideBorders' || settings.type === 'RightBorder') {
                var selectedCell = this.getRightBorderCellsOnSelection();
                for (var i = 0; i < selectedCell.length; i++) {
                    selectedCell[i].cellFormat.borders.right.copyFormat(border);
                }
            }
            if (settings.type === 'OutsideBorders' || settings.type === 'BottomBorder') {
                var selectedCell = this.getBottomBorderCellsOnSelection();
                for (var i = 0; i < selectedCell.length; i++) {
                    selectedCell[i].cellFormat.borders.bottom.copyFormat(border);
                }
            }
        }
        //Apply Only borders property to selected cells
        if (settings.type === 'BottomBorder' || settings.type === 'AllBorders' || settings.type === 'OutsideBorders'
            || settings.type === 'NoBorder') {
            cells = this.getAdjacentCellToApplyBottomBorder();
            for (var i = 0; i < cells.length; i++) {
                var cell = cells[i];
                if (settings.type === 'NoBorder') {
                    cell.cellFormat.borders.top.copyFormat(this.clearBorder());
                }
                else {
                    cell.cellFormat.borders.top.copyFormat(border);
                }
            }
        }
        if (settings.type === 'AllBorders' || settings.type === 'OutsideBorders' || settings.type === 'RightBorder'
            || settings.type === 'NoBorder') {
            cells = this.getAdjacentCellToApplyRightBorder();
            for (var i = 0; i < cells.length; i++) {
                var cell = cells[i];
                if (settings.type === 'NoBorder') {
                    cell.cellFormat.borders.left.copyFormat(this.clearBorder());
                }
                else {
                    cell.cellFormat.borders.left.copyFormat(border);
                }
            }
        }
        if (settings.type === 'AllBorders' || settings.type === 'NoBorder') {
            this.applyAllBorders(border, settings.type);
        }
        if (settings.type === 'InsideBorders' || settings.type === 'InsideVerticalBorder'
            || settings.type === 'InsideHorizontalBorder' || settings.type === 'NoBorder') {
            this.applyInsideBorders(border, settings.type, table);
        }
        this.updateGridForTableDialog(table, false);
        this.reLayout(this.selection, false);
        this.editorHistory.updateHistory();
    };
    Editor.prototype.applyAllBorders = function (border, borderType) {
        var cells = this.selection.getSelectedCells();
        for (var i = 0; i < cells.length; i++) {
            if (borderType === 'NoBorder') {
                cells[i].cellFormat.borders.left.copyFormat(this.clearBorder());
                cells[i].cellFormat.borders.right.copyFormat(this.clearBorder());
                cells[i].cellFormat.borders.top.copyFormat(this.clearBorder());
                cells[i].cellFormat.borders.bottom.copyFormat(this.clearBorder());
            }
            else {
                cells[i].cellFormat.borders.left.copyFormat(border);
                cells[i].cellFormat.borders.right.copyFormat(border);
                cells[i].cellFormat.borders.top.copyFormat(border);
                cells[i].cellFormat.borders.bottom.copyFormat(border);
            }
        }
    };
    Editor.prototype.applyInsideBorders = function (border, borderType, table) {
        var cells = this.selection.getSelectedCells();
        for (var i = 0; i < cells.length; i++) {
            var cell = cells[i];
            var isLastSelectedRow = cell.ownerRow === cells[cells.length - 1].ownerRow;
            var isLastRightCell = (cell.columnIndex + cell.cellFormat.columnSpan - 1) === cells[cells.length - 1].columnIndex;
            if (borderType === 'NoBorder') {
                cell.cellFormat.borders.right.copyFormat(this.clearBorder());
                cell.cellFormat.borders.bottom.copyFormat(this.clearBorder());
            }
            else {
                if (!isLastRightCell && borderType !== 'InsideHorizontalBorder') {
                    cell.cellFormat.borders.right.copyFormat(border);
                }
                if (!isLastSelectedRow && borderType !== 'InsideVerticalBorder') {
                    cell.cellFormat.borders.bottom.copyFormat(border);
                }
            }
            if (!isLastSelectedRow && borderType !== 'InsideVerticalBorder') {
                // Apply adjacent bottom borders.
                var nextRowIndex = cell.ownerRow.rowIndex + cell.cellFormat.rowSpan;
                var nextRow = table.childWidgets[nextRowIndex];
                if (nextRow) {
                    var selectedCells = this.getAdjacentBottomBorderOnEmptyCells(nextRow, cell, true);
                    for (var j = 0; j < selectedCells.length; j++) {
                        if (borderType === 'NoBorder') {
                            selectedCells[j].cellFormat.borders.top.copyFormat(this.clearBorder());
                        }
                        else {
                            selectedCells[j].cellFormat.borders.top.copyFormat(border);
                        }
                    }
                }
            }
            if (!isLastRightCell && borderType !== 'InsideHorizontalBorder') {
                // Apply adjacent right borders.
                var rightBorderCells = this.getSelectedCellsNextWidgets(cell, table);
                for (var k = 0; k < rightBorderCells.length; k++) {
                    if (borderType === 'NoBorder') {
                        rightBorderCells[k].cellFormat.borders.left.copyFormat(this.clearBorder());
                    }
                    else {
                        rightBorderCells[k].cellFormat.borders.left.copyFormat(border);
                    }
                }
            }
        }
    };
    Editor.prototype.getTopBorderCellsOnSelection = function () {
        var startPos = this.selection.isForward ? this.selection.start : this.selection.end;
        var startCell = startPos.paragraph.associatedCell;
        var topBorderCells = [];
        var cells = this.selection.getSelectedCells();
        for (var i = 0; i < cells.length; i++) {
            if (cells[i].ownerRow === startCell.ownerRow) {
                topBorderCells.push(cells[i]);
            }
        }
        return topBorderCells;
    };
    Editor.prototype.getLeftBorderCellsOnSelection = function () {
        var startPos = this.selection.isForward ? this.selection.start : this.selection.end;
        var startCell = startPos.paragraph.associatedCell;
        var cells = this.selection.getSelectedCells();
        var leftBorderCells = [];
        for (var i = 0; i < cells.length; i++) {
            if (cells[i].columnIndex === startCell.columnIndex) {
                leftBorderCells.push(cells[i]);
            }
        }
        return leftBorderCells;
    };
    Editor.prototype.getRightBorderCellsOnSelection = function () {
        var cells = this.selection.getSelectedCells();
        var rightBorderCells = [];
        for (var i = 0; i < cells.length; i++) {
            if ((cells[i].columnIndex + cells[i].cellFormat.columnSpan - 1) === cells[cells.length - 1].columnIndex) {
                rightBorderCells.push(cells[i]);
            }
        }
        return rightBorderCells;
    };
    Editor.prototype.getBottomBorderCellsOnSelection = function () {
        var endPos = this.selection.isForward ? this.selection.end : this.selection.start;
        var endCell = endPos.paragraph.associatedCell;
        var cells = this.selection.getSelectedCells();
        var bottomBorderCells = [];
        for (var i = 0; i < cells.length; i++) {
            if (cells[i].ownerRow === endCell.ownerRow) {
                bottomBorderCells.push(cells[i]);
            }
        }
        return bottomBorderCells;
    };
    Editor.prototype.clearAllBorderValues = function (borders) {
        var border = this.clearBorder();
        borders.bottom.copyFormat(border);
        borders.left.copyFormat(border);
        borders.right.copyFormat(border);
        borders.top.copyFormat(border);
        borders.vertical.copyFormat(border);
        borders.horizontal.copyFormat(border);
    };
    Editor.prototype.clearBorder = function () {
        var border = new WBorder();
        border.lineStyle = 'Cleared';
        return border;
    };
    Editor.prototype.getAdjacentCellToApplyBottomBorder = function () {
        var cells = [];
        var startPos = this.selection.start;
        var endPos = this.selection.end;
        if (!this.selection.isForward) {
            startPos = this.selection.end;
            endPos = this.selection.start;
        }
        var table = startPos.paragraph.associatedCell.ownerTable;
        table = table.combineWidget(this.owner.viewer);
        var startCell = startPos.paragraph.associatedCell;
        var endCell = endPos.paragraph.associatedCell;
        var nextRowIndex = endCell.ownerRow.rowIndex + endCell.cellFormat.rowSpan;
        var nextRow = table.childWidgets[nextRowIndex];
        if (nextRow) {
            if (endCell.cellFormat.columnSpan > 1) {
                for (var i = endCell.columnIndex; i < endCell.columnIndex + endCell.cellFormat.columnSpan; i++) {
                    cells.push(nextRow.childWidgets[i]);
                }
            }
            else {
                cells = this.getAdjacentBottomBorderOnEmptyCells(nextRow, endCell);
                if (!this.selection.isEmpty) {
                    for (var i = 0; i < nextRow.childWidgets.length; i++) {
                        var nextCellColIndex = nextRow.childWidgets[i].columnIndex;
                        if (nextCellColIndex >= startCell.columnIndex && nextCellColIndex <= endCell.columnIndex) {
                            cells.push(nextRow.childWidgets[i]);
                        }
                    }
                }
            }
        }
        return cells;
    };
    Editor.prototype.getAdjacentBottomBorderOnEmptyCells = function (nextRow, cell, isSingleCell) {
        var cells = [];
        if (cell.cellFormat.columnSpan > 1) {
            for (var i = cell.columnIndex; i < cell.columnIndex + cell.cellFormat.columnSpan; i++) {
                cells.push(nextRow.childWidgets[i]);
            }
        }
        else {
            if (this.selection.isEmpty || isSingleCell) {
                for (var i = 0; i < nextRow.childWidgets.length; i++) {
                    if (nextRow.childWidgets[i].columnIndex === cell.columnIndex) {
                        cells.push(nextRow.childWidgets[i]);
                    }
                }
            }
        }
        return cells;
    };
    Editor.prototype.getAdjacentCellToApplyRightBorder = function () {
        var cells = [];
        var startPosIn = this.selection.start;
        var endPosIn = this.selection.end;
        if (!this.selection.isForward) {
            startPosIn = this.selection.end;
            endPosIn = this.selection.start;
        }
        var table = startPosIn.paragraph.associatedCell.ownerTable;
        table = table.combineWidget(this.owner.viewer);
        var startCell = startPosIn.paragraph.associatedCell;
        var endCell = endPosIn.paragraph.associatedCell;
        if (this.selection.isEmpty) {
            var selectedCell = startPosIn.paragraph.associatedCell;
            cells = this.getSelectedCellsNextWidgets(selectedCell, table);
        }
        else {
            var selectedCells = this.getRightBorderCellsOnSelection();
            for (var i = 0; i < selectedCells.length; i++) {
                var cell = selectedCells[i];
                cells = cells.concat(this.getSelectedCellsNextWidgets(cell, table));
            }
        }
        return cells;
    };
    Editor.prototype.getSelectedCellsNextWidgets = function (selectedCell, table) {
        var cells = [];
        if (!isNullOrUndefined(selectedCell.nextWidget)) {
            cells.push(selectedCell.nextWidget);
            if (selectedCell.cellFormat.rowSpan > 1) {
                var nextRowIndex = selectedCell.ownerRow.rowIndex + selectedCell.cellFormat.rowSpan;
                for (var i = selectedCell.ownerRow.rowIndex + 1; i < nextRowIndex; i++) {
                    var nextRow = table.childWidgets[i];
                    if (nextRow) {
                        for (var j = 0; j < nextRow.childWidgets.length; j++) {
                            if (nextRow.childWidgets[j].columnIndex ===
                                selectedCell.nextWidget.columnIndex) {
                                cells.push(nextRow.childWidgets[j]);
                            }
                        }
                    }
                }
            }
        }
        return cells;
    };
    Editor.prototype.getBorder = function (borderColor, lineWidth, borderStyle) {
        var border = new WBorder();
        border.color = borderColor || '#000000';
        border.lineWidth = lineWidth || 1;
        border.lineStyle = borderStyle || 'Single';
        return border;
    };
    /**
     * Applies borders
     *
     * @param {WBorders} sourceBorders
     * @param {WBorders} applyBorders
     * @private
     * @returns {void}
     */
    Editor.prototype.applyBordersInternal = function (sourceBorders, applyBorders) {
        if (!isNullOrUndefined(sourceBorders) && !isNullOrUndefined(sourceBorders)) {
            if (!isNullOrUndefined(sourceBorders.top)) {
                this.applyBorder(sourceBorders.top, applyBorders.top);
            }
            if (!isNullOrUndefined(sourceBorders.bottom)) {
                this.applyBorder(sourceBorders.bottom, applyBorders.bottom);
            }
            if (!isNullOrUndefined(sourceBorders.left)) {
                this.applyBorder(sourceBorders.left, applyBorders.left);
            }
            if (!isNullOrUndefined(sourceBorders.right)) {
                this.applyBorder(sourceBorders.right, applyBorders.right);
            }
            if (!isNullOrUndefined(sourceBorders.horizontal)) {
                this.applyBorder(sourceBorders.horizontal, applyBorders.horizontal);
            }
            if (!isNullOrUndefined(sourceBorders.vertical)) {
                this.applyBorder(sourceBorders.vertical, applyBorders.vertical);
            }
            if (!isNullOrUndefined(sourceBorders.diagonalUp)) {
                this.applyBorder(sourceBorders.diagonalUp, applyBorders.diagonalUp);
            }
            if (!isNullOrUndefined(sourceBorders.diagonalDown)) {
                this.applyBorder(sourceBorders.diagonalDown, applyBorders.diagonalDown);
            }
        }
    };
    /**
     * Apply shading to table
     *
     * @param {WShading} sourceShading
     * @param {WShading} applyShading
     * @private
     * @returns {void}
     */
    Editor.prototype.applyShading = function (sourceShading, applyShading) {
        if (!isNullOrUndefined(applyShading) && !isNullOrUndefined(sourceShading)) {
            if (!isNullOrUndefined(applyShading.backgroundColor)
                && sourceShading.backgroundColor !== applyShading.backgroundColor) {
                sourceShading.backgroundColor = applyShading.backgroundColor;
            }
            if (!isNullOrUndefined(applyShading.foregroundColor)
                && sourceShading.foregroundColor !== applyShading.foregroundColor) {
                sourceShading.foregroundColor = applyShading.foregroundColor;
            }
            if (!isNullOrUndefined(applyShading.textureStyle)
                && sourceShading.textureStyle !== applyShading.textureStyle) {
                sourceShading.textureStyle = applyShading.textureStyle;
            }
        }
    };
    Editor.prototype.applyBorder = function (sourceBorder, applyBorder) {
        if (!isNullOrUndefined(sourceBorder) && !isNullOrUndefined(applyBorder)) {
            if (!isNullOrUndefined(applyBorder.color)
                && sourceBorder.color !== applyBorder.color) {
                sourceBorder.color = applyBorder.color;
            }
            if (!isNullOrUndefined(applyBorder.lineStyle)
                && sourceBorder.lineStyle !== applyBorder.lineStyle) {
                sourceBorder.lineStyle = applyBorder.lineStyle;
            }
            if (!isNullOrUndefined(applyBorder.lineWidth)
                && sourceBorder.lineWidth !== applyBorder.lineWidth) {
                sourceBorder.lineWidth = applyBorder.lineWidth;
            }
            if (!isNullOrUndefined(applyBorder.shadow)
                && sourceBorder.shadow !== applyBorder.shadow) {
                sourceBorder.shadow = applyBorder.shadow;
            }
            if (!isNullOrUndefined(applyBorder.space)
                && sourceBorder.space !== applyBorder.space) {
                sourceBorder.space = applyBorder.space;
            }
        }
    };
    /**
     * Apply Table Format changes
     *
     * @param {WTableFormat} format Specifies table format
     * @param {boolean} isShading Specifies shading.
     * @private
     * @returns {void}
     */
    Editor.prototype.onTableFormat = function (format, isShading) {
        if (!isNullOrUndefined(this.selection.tableFormat)) {
            if (isNullOrUndefined(isShading)) {
                isShading = false;
            }
            this.documentHelper.owner.isShiftingEnabled = true;
            this.editorHistory.initializeHistory('TableFormat');
            var table = this.selection.start.paragraph.associatedCell.ownerTable.combineWidget(this.owner.viewer);
            if (isShading) {
                for (var i = 0; i < table.childWidgets.length; i++) {
                    var rowWidget = table.childWidgets[i];
                    rowWidget.rowFormat.borders.copyFormat(format.borders);
                    for (var j = 0; j < rowWidget.childWidgets.length; j++) {
                        var cellWidget = rowWidget.childWidgets[j];
                        cellWidget.cellFormat.shading.copyFormat(format.shading);
                        cellWidget.cellFormat.borders.copyFormat(format.borders);
                    }
                }
            }
            this.applyTableFormat(table, undefined, format);
            this.reLayout(this.selection, false);
        }
    };
    Editor.prototype.applyTableFormat = function (table, property, value) {
        this.applyTablePropertyValue(this.documentHelper.selection, undefined, value, table);
    };
    Editor.prototype.applyTablePropertyValue = function (selection, property, value, table) {
        var sourceFormat = table.tableFormat;
        if (!isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo)) {
            value = this.editorHistory.currentBaseHistoryInfo.addModifiedTableProperties(sourceFormat, property, value);
        }
        if (value instanceof WTableFormat) {
            if (isNullOrUndefined(property)) {
                this.handleTableFormat(sourceFormat, value);
            }
            return;
        }
        if (property === 'preferredWidth') {
            sourceFormat.preferredWidth = value;
        }
        else if (property === 'leftIndent') {
            sourceFormat.leftIndent = value;
        }
        else if (property === 'tableAlignment') {
            sourceFormat.tableAlignment = value;
        }
        else if (property === 'cellSpacing') {
            sourceFormat.cellSpacing = value;
        }
        else if (property === 'leftMargin') {
            sourceFormat.leftMargin = value;
        }
        else if (property === 'rightMargin') {
            sourceFormat.rightMargin = value;
        }
        else if (property === 'topMargin') {
            sourceFormat.topMargin = value;
        }
        else if (property === 'bottomMargin') {
            sourceFormat.bottomMargin = value;
        }
        else if (property === 'preferredWidthType') {
            sourceFormat.preferredWidthType = value;
        }
        else if (property === 'bidi') {
            sourceFormat.bidi = value;
        }
        if (property === 'shading') {
            sourceFormat.shading = value;
        }
        else if (property === 'borders') {
            sourceFormat.borders = value;
        }
        // if (!isNullOrUndefined(table)) {
        //     this.layoutItemBlock(table, true);
        // }
    };
    Editor.prototype.handleTableFormat = function (tableFormat, applyFormat) {
        if (this.isBordersAndShadingDialog || this.editorHistory.isUndoing
            || this.editorHistory.isRedoing) {
            if (!isNullOrUndefined(tableFormat.borders)) {
                this.applyBordersInternal(tableFormat.borders, applyFormat.borders);
            }
            if (!isNullOrUndefined(tableFormat.shading)) {
                this.applyShading(tableFormat.shading, applyFormat.shading);
            }
        }
        if (!this.isBordersAndShadingDialog) {
            if (applyFormat.hasValue('bidi') && applyFormat.bidi !== tableFormat.bidi) {
                tableFormat.bidi = applyFormat.bidi;
            }
            if (applyFormat.hasValue('preferredWidth') && applyFormat.preferredWidth !== tableFormat.preferredWidth) {
                tableFormat.preferredWidth = applyFormat.preferredWidth;
            }
            if (applyFormat.hasValue('preferredWidthType') && applyFormat.preferredWidthType !== tableFormat.preferredWidthType) {
                tableFormat.preferredWidthType = applyFormat.preferredWidthType;
            }
            if (applyFormat.hasValue('tableAlignment') && applyFormat.tableAlignment !== tableFormat.tableAlignment) {
                tableFormat.tableAlignment = applyFormat.tableAlignment;
            }
            if (applyFormat.hasValue('leftIndent') && applyFormat.leftIndent !== tableFormat.leftIndent) {
                tableFormat.leftIndent = applyFormat.leftIndent;
            }
        }
        this.updateGridForTableDialog(tableFormat.ownerBase, false);
    };
    Editor.prototype.updateGridForTableDialog = function (table, shiftNextItem) {
        if (table.tableHolder) {
            table.updateRowIndex(0);
            table.isGridUpdated = false;
        }
        this.documentHelper.layout.reLayoutTable(table);
    };
    /**
     * Applies Row Format Changes
     *
     * @param {WRowFormat} format Specifies row format
     * @private
     * @returns {void}
     */
    Editor.prototype.onRowFormat = function (format) {
        if (isNullOrUndefined(this.selection) || isNullOrUndefined(format)) {
            return;
        }
        this.editorHistory.initializeHistory('RowFormat');
        this.documentHelper.owner.isShiftingEnabled = true;
        var rowStartPos = this.selection.isForward ? this.selection.start : this.selection.end;
        var rowEndPos = this.selection.isForward ? this.selection.end : this.selection.start;
        var table = rowStartPos.paragraph.associatedCell.ownerTable.combineWidget(this.owner.viewer);
        this.applyRowFormat(rowStartPos.paragraph.associatedCell.ownerRow, rowStartPos, rowEndPos, undefined, format);
        this.reLayout(this.selection, false);
    };
    Editor.prototype.applyRowFormat = function (row, start, end, property, value) {
        this.applyRowPropertyValue(this.documentHelper.selection, property, value, row);
        if (end.paragraph.associatedCell.ownerRow === row) {
            return;
        }
        var newRow = row.nextWidget;
        if (!isNullOrUndefined(newRow)) {
            this.applyRowFormat(newRow, start, end, property, value);
        }
    };
    Editor.prototype.applyRowPropertyValue = function (selection, property, value, row) {
        var applyFormat = row.rowFormat;
        if (!isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo)) {
            value = this.editorHistory.currentBaseHistoryInfo.addModifiedRowProperties(applyFormat, property, value);
        }
        if (value instanceof WRowFormat) {
            if (isNullOrUndefined(property)) {
                this.handleRowFormat(value, applyFormat);
            }
            return;
        }
        if (property === 'heightType') {
            applyFormat.heightType = value;
        }
        else if (property === 'height') {
            applyFormat.height = value;
        }
        else if (property === 'isHeader') {
            applyFormat.isHeader = value;
        }
        else if (property === 'allowBreakAcrossPages') {
            applyFormat.allowBreakAcrossPages = value;
        }
        if (!isNullOrUndefined(row.ownerTable)) {
            this.layoutItemBlock(row.ownerTable, true);
        }
    };
    Editor.prototype.handleRowFormat = function (format, applyFormat) {
        if (format.hasValue('allowBreakAcrossPages') && format.allowBreakAcrossPages !== applyFormat.allowBreakAcrossPages) {
            applyFormat.allowBreakAcrossPages = format.allowBreakAcrossPages;
        }
        if (format.hasValue('isHeader') && format.isHeader !== applyFormat.isHeader) {
            applyFormat.isHeader = format.isHeader;
        }
        if (format.hasValue('heightType') && format.heightType !== applyFormat.heightType) {
            applyFormat.heightType = format.heightType;
        }
        if (format.hasValue('height') && format.height !== applyFormat.height) {
            applyFormat.height = format.height;
        }
        this.updateGridForTableDialog(applyFormat.ownerBase.ownerTable, true);
    };
    /**
     * Applies Cell Format changes
     *
     * @param {WCellFormat} format Specifies cell format
     * @private
     * @returns {void}
     */
    Editor.prototype.onCellFormat = function (format) {
        if (isNullOrUndefined(this.selection) || isNullOrUndefined(format)) {
            return;
        }
        this.editorHistory.initializeHistory('CellFormat');
        this.updateFormatForCell(this.selection, undefined, format);
        this.reLayout(this.selection, false);
    };
    /**
     * Applies Paragraph Format changes
     *
     * @param {WParagraphFormat} format Specifies cell format
     * @private
     * @returns {void}
     */
    Editor.prototype.onParaFormat = function (format) {
        if (isNullOrUndefined(this.selection) || isNullOrUndefined(format)) {
            return;
        }
        this.editorHistory.initializeHistory('ParagraphFormat');
        this.updateParagraphFormat(undefined, format, false);
        this.reLayout(this.selection, false);
    };
    /**
     * @param selection
     * @param value
     * @private
     * @returns {void}
     */
    Editor.prototype.updateCellMargins = function (selection, value) {
        var cellStartPosition = selection.start;
        var cellEndPosition = selection.end;
        if (!selection.isForward) {
            cellStartPosition = selection.end;
            cellEndPosition = selection.start;
        }
        this.initHistoryPosition(selection, cellStartPosition);
        this.documentHelper.owner.cellOptionsDialogModule.applyCellMarginValue(cellStartPosition.paragraph.associatedCell.ownerRow, cellStartPosition, cellEndPosition, value);
    };
    Editor.prototype.updateFormatForCell = function (selection, property, value) {
        var start = selection.start;
        var end = selection.end;
        if (!selection.isForward) {
            start = selection.end;
            end = selection.start;
        }
        var startCell = start.paragraph.associatedCell;
        var endCell = end.paragraph.associatedCell;
        var cells;
        var table = startCell.ownerTable.combineWidget(this.owner.viewer);
        var appliedFormat;
        for (var k = startCell.columnIndex; k <= endCell.columnIndex; k++) {
            cells = this.getSelectedCellInColumn(startCell.ownerTable, startCell.ownerRow.rowIndex, k, endCell.ownerRow.rowIndex);
            for (var i = 0; i < cells.length; i++) {
                appliedFormat = this.applyCellPropertyValue(this.documentHelper.selection, property, value, cells[i].cellFormat);
            }
        }
        this.updateGridForTableDialog(table, false);
    };
    Editor.prototype.getSelectedCellInColumn = function (table, rowStartIndex, columnIndex, rowEndIndex) {
        var cells = [];
        for (var i = rowStartIndex; i <= rowEndIndex; i++) {
            var row = table.childWidgets[i];
            for (var j = 0; j < row.childWidgets.length; j++) {
                if (row.childWidgets[j].columnIndex === columnIndex) {
                    cells.push(row.childWidgets[j]);
                }
            }
        }
        return cells;
    };
    Editor.prototype.getColumnCells = function (table, columnIndex, isLeftSideCollection) {
        var cells = [];
        for (var k = 0; k < table.childWidgets.length; k++) {
            var row = table.childWidgets[k];
            for (var i = 0; i < row.childWidgets.length; i++) {
                var cell = row.childWidgets[i];
                if (isLeftSideCollection) {
                    if (cell.columnIndex + cell.cellFormat.columnSpan === columnIndex) {
                        cells.push(cell);
                    }
                }
                else {
                    if (cell.columnIndex === columnIndex) {
                        cells.push(cell);
                    }
                }
            }
        }
        return cells;
    };
    Editor.prototype.getTableWidth = function (table) {
        if (table.tableFormat.preferredWidth !== 0 || table.tableFormat.preferredWidthType === 'Percent') {
            if (table.tableFormat.preferredWidthType === 'Auto' || table.tableFormat.preferredWidthType === 'Point') {
                return table.tableFormat.preferredWidth;
            }
            else {
                if (table.tableFormat.preferredWidth === 0) {
                    return 0;
                }
                else {
                    return HelperMethods.convertPixelToPoint(this.owner.viewer.clientArea.width) / 100 * table.tableFormat.preferredWidth;
                }
            }
        }
        return HelperMethods.convertPixelToPoint(this.documentHelper.layout.getTableWidth(table));
    };
    Editor.prototype.applyCellPropertyValue = function (selection, property, value, applyFormat) {
        if (!isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo)) {
            value = this.editorHistory.currentBaseHistoryInfo.addModifiedCellProperties(applyFormat, property, value);
        }
        if (value instanceof WCellFormat) {
            if (isNullOrUndefined(property)) {
                this.handleCellFormat(value, applyFormat);
            }
            return value;
        }
        if (property === 'leftMargin') {
            applyFormat.leftMargin = value;
        }
        else if (property === 'topMargin') {
            applyFormat.topMargin = value;
        }
        else if (property === 'rightMargin') {
            applyFormat.rightMargin = value;
        }
        else if (property === 'bottomMargin') {
            applyFormat.bottomMargin = value;
        }
        else if (property === 'preferredWidth') {
            applyFormat.preferredWidth = value;
            applyFormat.cellWidth = value;
        }
        else if (property === 'cellWidth') {
            applyFormat.cellWidth = value;
        }
        else if (property === 'columnSpan') {
            applyFormat.columnSpan = value;
        }
        else if (property === 'rowSpan') {
            applyFormat.rowSpan = value;
        }
        else if (property === 'preferredWidthType') {
            applyFormat.preferredWidthType = value;
        }
        else if (property === 'verticalAlignment') {
            applyFormat.verticalAlignment = value;
        }
        if (property === 'shading') {
            applyFormat.shading = value;
        }
        else if (property === 'borders') {
            applyFormat.borders = value;
        }
        return undefined;
    };
    Editor.prototype.handleCellFormat = function (cellFormat, applyFormat) {
        if (!isNullOrUndefined(cellFormat) && !isNullOrUndefined(applyFormat)) {
            if (this.isBordersAndShadingDialog) {
                if (!isNullOrUndefined(cellFormat.borders)) {
                    this.applyBordersInternal(applyFormat.borders, cellFormat.borders);
                }
                if (!isNullOrUndefined(cellFormat.shading)) {
                    this.applyShading(applyFormat.shading, cellFormat.shading);
                }
                // this.layoutRow((applyFormat.ownerBase as TableCellWidget).ownerRow, this.documentHelper, false);
            }
            else {
                if (cellFormat.hasValue('preferredWidth') && applyFormat.preferredWidth !== cellFormat.preferredWidth) {
                    applyFormat.preferredWidth = cellFormat.preferredWidth;
                }
                if (cellFormat.hasValue('preferredWidthType') && applyFormat.preferredWidthType !== cellFormat.preferredWidthType) {
                    applyFormat.preferredWidthType = cellFormat.preferredWidthType;
                }
                if (cellFormat.hasValue('verticalAlignment') && applyFormat.verticalAlignment !== cellFormat.verticalAlignment) {
                    applyFormat.verticalAlignment = cellFormat.verticalAlignment;
                }
            }
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Editor.prototype.destroy = function () {
        if (this.tableResize) {
            this.tableResize.destroy();
            this.tableResize = undefined;
        }
        if (this.previousCharFormat) {
            this.previousCharFormat.destroy();
            this.previousCharFormat = undefined;
        }
        if (this.previousParaFormat) {
            this.previousParaFormat.destroy();
            this.previousParaFormat = undefined;
        }
        if (this.alertDialog) {
            this.alertDialog.destroy();
        }
        this.alertDialog = undefined;
        if (this.base64) {
            this.base64.destroy();
        }
        this.base64 = undefined;
        this.endParagraph = undefined;
        this.copiedData = undefined;
        this.copiedTextContent = undefined;
        this.listNumberFormat = undefined;
        this.nodes = [];
        this.removedTextNodes = [];
        this.removedBookmarkElements = [];
        this.editStartRangeCollection = [];
        this.documentHelper = undefined;
    };
    /**
     * Updates the table of contents.
     *
     * @param tocField
     * @private
     * @returns {void}
     */
    Editor.prototype.updateToc = function (tocField) {
        if (isNullOrUndefined(tocField)) {
            tocField = this.selection.getTocFieldInternal();
        }
        if (!this.documentHelper.layout.isTocField(tocField)) {
            return;
        }
        // Decode field code to get parameters
        var code = this.selection.getFieldCode(tocField);
        if (code.toLocaleLowerCase().indexOf('toc') !== -1) {
            this.insertTableOfContents(this.validateTocSettings(this.getTocSettings(code, tocField)));
        }
    };
    Editor.prototype.getTocSettings = function (code, tocField) {
        var tocSettings = {};
        tocSettings.includePageNumber = true;
        tocSettings.rightAlign = true;
        // Decode field code to get parameters
        if (code.toLowerCase() === 'toc \\mergeformat') {
            tocSettings.startLevel = 1;
            tocSettings.endLevel = 3;
        }
        else {
            var swtiches = code.split('\\');
            for (var i = 0; i < swtiches.length; i++) {
                var swtch = swtiches[i];
                if (swtch.length === 0) {
                    continue;
                }
                switch (swtch[0]) {
                    case 'o':
                        if (!isNullOrUndefined(swtch.match(/\d+/g))) {
                            var levels = swtch.match(/\d+/g).map(Number);
                            tocSettings.startLevel = levels[0];
                            tocSettings.endLevel = levels[1];
                        }
                        else {
                            tocSettings.startLevel = 1;
                            tocSettings.endLevel = 9;
                        }
                        break;
                    case 'h':
                        tocSettings.includeHyperlink = true;
                        break;
                    case 'n':
                        tocSettings.includePageNumber = false;
                        break;
                    case 'p':
                        tocSettings.rightAlign = false;
                        break;
                    case 'u':
                        tocSettings.includeOutlineLevels = true;
                        break;
                    case 't':
                        this.decodeTSwitch(tocSettings, swtch);
                        break;
                }
            }
        }
        //assigns tab leader.
        var tabs = tocField.paragraph.paragraphFormat.getUpdatedTabs();
        if (tabs.length > 0) {
            tocSettings.tabLeader = tabs[tabs.length - 1].tabLeader;
        }
        if (tocSettings.rightAlign && isNullOrUndefined(tocSettings.tabLeader)) {
            tocSettings.tabLeader = 'Dot';
        }
        return tocSettings;
    };
    Editor.prototype.decodeTSwitch = function (tocSettings, tSwitch) {
        tocSettings.levelSettings = {};
        tSwitch = tSwitch.replace('t', '');
        tSwitch = tSwitch.replace('"', '');
        tSwitch = tSwitch.replace('"', '');
        tSwitch = tSwitch.trim();
        var levels = tSwitch.split(',');
        for (var index = 0; index < levels.length; index++) {
            tocSettings.levelSettings[levels[index]] = parseInt(levels[index + 1], 10);
            index++;
        }
    };
    /**
     * Inserts, modifies or updates the table of contents based on given settings.
     *
     * @param {TableOfContentsSettings} tableOfContentsSettings Specify the table of content settings to be inserted.
     * @returns {void}
     */
    Editor.prototype.insertTableOfContents = function (tableOfContentsSettings) {
        this.isInsertingTOC = true;
        var removedCommentStart = this.checkAndRemoveComments();
        this.initComplexHistory('TOC');
        if (isNullOrUndefined(tableOfContentsSettings)) {
            //Initializes with default value.
            tableOfContentsSettings = {};
            tableOfContentsSettings.startLevel = 1;
            tableOfContentsSettings.endLevel = 3;
            tableOfContentsSettings.includeHyperlink = true;
            tableOfContentsSettings.includeOutlineLevels = true;
            tableOfContentsSettings.includePageNumber = true;
            tableOfContentsSettings.rightAlign = true;
            tableOfContentsSettings.tabLeader = 'Dot';
        }
        var tocField = undefined;
        var code = undefined;
        if (this.selection.contextType === 'TableOfContents') {
            tocField = this.selection.getTocFieldInternal();
        }
        if (tocField instanceof FieldElementBox) {
            this.selection.start.setPositionForSelection(tocField.line, tocField, 0, this.selection.start.location);
            var offset = 2;
            if (tocField.fieldEnd.paragraph === tocField.fieldEnd.paragraph.bodyWidget.lastChild) {
                offset--;
            }
            this.selection.end.setPositionForSelection(tocField.fieldEnd.line, tocField.fieldEnd, offset, this.selection.end.location);
            this.delete();
        }
        // Build TOC field code based on parameter
        code = this.constructTocFieldCode(tableOfContentsSettings);
        var isStartParagraph = this.selection.start.isAtParagraphStart;
        var blockInfo = this.selection.getParagraphInfo(this.selection.start);
        var initialStart = this.selection.getHierarchicalIndex(blockInfo.paragraph, blockInfo.offset.toString());
        // Build TOC fields
        var widgets = this.buildToc(this.validateTocSettings(tableOfContentsSettings), code, true, isStartParagraph);
        if (widgets.length > 0) {
            var tocLastPara = new ParagraphWidget();
            var tocLastLine = new LineWidget(tocLastPara);
            tocLastPara.childWidgets.push(tocLastLine);
            var index = 0;
            if (!isStartParagraph) {
                index = 1;
            }
            var line = widgets[index].childWidgets[0];
            var fieldBegin = line.children[0];
            this.appendEndField(fieldBegin, tocLastLine);
            widgets.push(tocLastPara);
            this.appendEmptyPara(widgets);
        }
        else {
            var localizeValue = new L10n('documenteditor', this.owner.defaultLocale);
            localizeValue.setLocale(this.owner.locale);
            DialogUtility.alert({
                title: localizeValue.getConstant('No Headings'),
                content: localizeValue.getConstant('Add Headings'),
                showCloseIcon: true,
                closeOnEscape: true,
                position: { X: 'center', Y: 'center' },
                animationSettings: { effect: 'Zoom' }
            }).enableRtl = this.owner.enableRtl;
        }
        this.setPositionForCurrentIndex(this.selection.start, initialStart);
        this.selection.end.setPositionInternal(this.selection.start);
        var bodyWidget = new BodyWidget();
        bodyWidget.sectionFormat = new WSectionFormat(bodyWidget);
        bodyWidget.childWidgets = widgets;
        this.pasteContentsInternal([bodyWidget], false);
        this.isInsertingTOC = false;
        this.updatePageRef();
        if (this.editorHistory) {
            this.editorHistory.updateComplexHistoryInternal();
            this.updateHistoryForComments(removedCommentStart);
        }
        if (widgets.length === 0) {
            this.owner.editorHistory.undo();
            this.owner.editorHistory.redoStack.pop();
        }
    };
    Editor.prototype.appendEmptyPara = function (widgets) {
        var emptyPara = new ParagraphWidget();
        var emptyLine = new LineWidget(emptyPara);
        emptyPara.childWidgets.push(emptyLine);
        widgets.push(emptyPara);
    };
    Editor.prototype.constructTocFieldCode = function (tocSettings) {
        var tocFieldCode = 'TOC';
        //appends styles level
        if (!isNullOrUndefined(tocSettings.startLevel) && tocSettings.startLevel !== 0 && !isNullOrUndefined(tocSettings.endLevel) && tocSettings.endLevel !== 0) {
            tocFieldCode = tocFieldCode + ' \\o "' + tocSettings.startLevel + '-' + tocSettings.endLevel + '"';
        }
        if (tocSettings.includePageNumber && !tocSettings.rightAlign) {
            tocFieldCode = tocFieldCode + ' \\p " "';
        }
        if (!tocSettings.includePageNumber) {
            tocFieldCode = tocFieldCode + ' \\n';
        }
        if (tocSettings.includeHyperlink) {
            tocFieldCode = tocFieldCode + ' \\h \\z';
        }
        if (tocSettings.includeOutlineLevels) {
            tocFieldCode = tocFieldCode + ' \\u';
        }
        var tSwitch = this.constructTSwitch(tocSettings);
        if (tSwitch.length > 6) {
            tocFieldCode = tocFieldCode + tSwitch;
        }
        return tocFieldCode;
    };
    Editor.prototype.constructTSwitch = function (tocSettings) {
        var tSwitch = '';
        var prefix = ' \\t ';
        if (!isNullOrUndefined(tocSettings.levelSettings)) {
            for (var _i = 0, _a = Object.keys(tocSettings.levelSettings); _i < _a.length; _i++) {
                var key = _a[_i];
                tSwitch = tSwitch + key + ',' + tocSettings.levelSettings[key].toString() + ',';
            }
        }
        tSwitch = tSwitch.slice(0, -1);
        tSwitch = prefix + '"' + tSwitch + '"';
        return tSwitch;
    };
    Editor.prototype.appendEndField = function (fieldBegin, lineWidget) {
        var fieldEnd = new FieldElementBox(1);
        fieldEnd.fieldSeparator = fieldBegin.fieldSeparator;
        fieldBegin.fieldSeparator.fieldEnd = fieldEnd;
        fieldEnd.fieldBegin = fieldBegin;
        fieldEnd.fieldBegin.fieldEnd = fieldEnd;
        fieldEnd.line = lineWidget;
        //For TOC we used to append field end at last we need to map that inserted revision to field end.
        if (fieldBegin.revisions.length > 0) {
            var currentRevision = fieldBegin.revisions[fieldBegin.revisions.length - 1];
            currentRevision.range.push(fieldEnd);
            this.owner.trackChangesPane.updateCurrentTrackChanges(currentRevision);
            fieldEnd.revisions.push(currentRevision);
        }
        lineWidget.children.push(fieldEnd);
    };
    Editor.prototype.validateTocSettings = function (tocSettings) {
        if (isNullOrUndefined(tocSettings.startLevel) || tocSettings.startLevel < 1) {
            tocSettings.startLevel = 1;
        }
        if (isNullOrUndefined(tocSettings.endLevel) || tocSettings.endLevel < tocSettings.endLevel) {
            tocSettings.endLevel = tocSettings.startLevel > 3 ? tocSettings.startLevel : 3;
        }
        if (isNullOrUndefined(tocSettings.includeHyperlink)) {
            tocSettings.includeHyperlink = false;
        }
        if (isNullOrUndefined(tocSettings.includePageNumber)) {
            tocSettings.includePageNumber = false;
        }
        if (isNullOrUndefined(tocSettings.rightAlign)) {
            tocSettings.rightAlign = false;
        }
        if (isNullOrUndefined(tocSettings.levelSettings)) {
            tocSettings.levelSettings = {};
        }
        return tocSettings;
    };
    /**
     * Builds the TOC
     *
     * @private
     * @returns {ParagraphWidget[]}
     *
     */
    Editor.prototype.buildToc = function (tocSettings, fieldCode, isFirstPara, isStartParagraph) {
        var tocDomBody = this.documentHelper.pages[0].bodyWidgets[0];
        var widgets = [];
        this.createHeadingLevels(tocSettings);
        if (tocSettings.includeOutlineLevels) {
            this.createOutlineLevels(tocSettings);
        }
        var sectionFormat = this.selection.start.paragraph.bodyWidget.sectionFormat;
        var widget = tocDomBody.childWidgets[0];
        while (widget !== undefined) {
            if (widget instanceof ParagraphWidget && (this.isHeadingStyle(widget) || (tocSettings.includeOutlineLevels && this.isOutlineLevelStyle(widget)))) {
                var bookmarkName = this.insertTocBookmark(widget);
                this.createTOCWidgets(widget, widgets, fieldCode, bookmarkName, tocSettings, isFirstPara, isStartParagraph, sectionFormat);
                isFirstPara = false;
            }
            widget = this.selection.getNextParagraphBlock(widget.getSplitWidgets().pop());
        }
        this.tocStyles = {};
        return widgets;
    };
    Editor.prototype.createOutlineLevels = function (settings) {
        for (var i = settings.startLevel; i <= settings.endLevel; i++) {
            var levelStyle = 'Level' + i.toString();
            if (isNullOrUndefined(this.tocStyles[levelStyle])) {
                this.tocStyles[levelStyle] = i;
            }
        }
    };
    Editor.prototype.createHeadingLevels = function (settings) {
        //let normalStyle: string = 'Normal';
        for (var i = settings.startLevel; i <= settings.endLevel; i++) {
            var headingStyle = 'Heading ' + i.toString();
            if (isNullOrUndefined(this.tocStyles[headingStyle])) {
                this.tocStyles[headingStyle] = i;
            }
        }
        if (!isNullOrUndefined(settings.levelSettings)) {
            for (var _i = 0, _a = Object.keys(settings.levelSettings); _i < _a.length; _i++) {
                var key = _a[_i];
                this.tocStyles[key] = settings.levelSettings[key];
            }
        }
    };
    Editor.prototype.isHeadingStyle = function (para) {
        var style = para.paragraphFormat.baseStyle;
        if (style !== undefined) {
            return isNullOrUndefined(this.tocStyles[style.name]) ? false : true;
        }
        return false;
    };
    Editor.prototype.isOutlineLevelStyle = function (para) {
        var styleName = para.paragraphFormat.outlineLevel;
        return isNullOrUndefined(this.tocStyles[styleName]) ? false : true;
    };
    Editor.prototype.createTocFieldElement = function (lineWidget, fieldCode, isSkipRevision) {
        //begin
        var fieldBegin = new FieldElementBox(0);
        fieldBegin.hasFieldEnd = true;
        fieldBegin.line = lineWidget;
        lineWidget.children.push(fieldBegin);
        var currentRevision = undefined;
        //format toc
        var textElement = new TextElementBox();
        textElement.text = fieldCode;
        textElement.line = lineWidget;
        lineWidget.children.push(textElement);
        //field separator
        var fieldSeparator = new FieldElementBox(2);
        fieldSeparator.fieldBegin = fieldBegin;
        fieldSeparator.fieldBegin.fieldSeparator = fieldSeparator;
        fieldSeparator.line = lineWidget;
        lineWidget.children.push(fieldSeparator);
        // If revision enabled.
        return fieldBegin;
    };
    Editor.prototype.createTOCWidgets = function (widget, widgets, fieldCode, bookmarkName, tocSettings, isFirstPara, isStartParagraph, sectionFormat) {
        var fieldBegin = undefined;
        var tocPara = undefined;
        var tocLine = undefined;
        var emptyParaAppended = false;
        if (widgets.length === 1 && widgets[0].childWidgets[0].children.length === 3 && !isNullOrUndefined(isFirstPara) && !isFirstPara) {
            tocLine = widgets[0].childWidgets[0];
        }
        else {
            tocPara = new ParagraphWidget();
            var styleName = undefined;
            //Adds toc syles into paragraph
            var headingStyleName = widget.paragraphFormat.baseStyle.name;
            if (tocSettings.includeOutlineLevels && isNullOrUndefined(this.tocStyles[headingStyleName])) {
                styleName = widget.paragraphFormat.outlineLevel;
            }
            else {
                styleName = headingStyleName;
            }
            var tocStyleName = 'TOC ' + this.tocStyles[styleName];
            var paraStyle = this.documentHelper.styles.findByName(tocStyleName, 'Paragraph');
            if (isNullOrUndefined(paraStyle)) {
                this.documentHelper.owner.parser.parseStyle(JSON.parse(this.getCompleteStyles()), JSON.parse(this.documentHelper.preDefinedStyles.get(tocStyleName)), this.documentHelper.styles, true);
                paraStyle = this.documentHelper.styles.findByName(tocStyleName, 'Paragraph');
            }
            tocPara.paragraphFormat.applyStyle(paraStyle);
            //Creates right tab for page number.
            if (tocSettings.rightAlign && tocSettings.includePageNumber) {
                var tabStop = new WTabStop();
                tabStop.position = sectionFormat.pageWidth - (sectionFormat.leftMargin + sectionFormat.rightMargin);
                tabStop.tabLeader = tocSettings.tabLeader;
                tabStop.deletePosition = 0;
                tabStop.tabJustification = 'Right';
                tocPara.paragraphFormat.tabs.push(tabStop);
            }
            tocLine = new LineWidget(tocPara);
            tocPara.childWidgets.push(tocLine);
        }
        //creates toc field element if it is insert
        if ((isFirstPara !== undefined) && isFirstPara) {
            if (!isNullOrUndefined(isStartParagraph) && !isStartParagraph) {
                this.appendEmptyPara(widgets);
                emptyParaAppended = true;
            }
            this.createTocFieldElement(tocLine, fieldCode);
        }
        var text = '';
        var isFieldCode = false;
        var paragraph = widget;
        while (paragraph instanceof ParagraphWidget) {
            for (var lineIndex = 0; lineIndex < paragraph.childWidgets.length; lineIndex++) {
                var lineWidget = paragraph.childWidgets[lineIndex];
                for (var elementIndex = 0; elementIndex < lineWidget.children.length; elementIndex++) {
                    var element = lineWidget.children[elementIndex];
                    if (element.isPageBreak || element.isColumnBreak) {
                        continue;
                    }
                    if ((element instanceof FieldElementBox) || (element instanceof BookmarkElementBox) || isFieldCode) {
                        if (element instanceof FieldElementBox) {
                            if (element.fieldType === 0) {
                                isFieldCode = true;
                            }
                            else if (element.fieldType === 2) {
                                isFieldCode = false;
                            }
                        }
                    }
                    else if (element instanceof TextElementBox || element instanceof ListTextElementBox) {
                        var temp = element.text;
                        var tabChar = '\t';
                        if (temp.indexOf(tabChar) !== -1) {
                            temp = temp.replace(new RegExp(tabChar, 'g'), ' ');
                        }
                        text = text + temp;
                    }
                }
            }
            paragraph = paragraph.nextSplitWidget;
        }
        if (text !== '') {
            // inserts hyperlink
            if (tocSettings.includeHyperlink && (bookmarkName !== undefined)) {
                fieldBegin = this.insertTocHyperlink(tocLine, bookmarkName, text);
            }
            else {
                var span = new TextElementBox();
                span.text = text;
                span.line = tocLine;
                tocLine.children.push(span);
            }
            //inserts page number
            if (tocSettings.includePageNumber && (bookmarkName !== undefined)) {
                if (tocSettings.rightAlign) {
                    var tabText = new TabElementBox();
                    tabText.text = '\t';
                    tabText.line = tocLine;
                    tocLine.children.push(tabText);
                }
                var pageField = this.insertTocPageNumber(bookmarkName, tocLine, tocSettings.rightAlign, widget);
                this.appendEndField(pageField, tocLine);
            }
            if (tocSettings.includeHyperlink && fieldBegin !== undefined) {
                this.appendEndField(fieldBegin, tocLine);
            }
        }
        if (!isNullOrUndefined(tocPara) && (text !== '' || isFirstPara)) {
            widgets.push(tocPara);
        }
        if (this.owner.enableTrackChanges && !isNullOrUndefined(tocPara)) {
            if (widgets.length === 1 || emptyParaAppended) {
                this.insertRevisionForBlock(tocPara, 'Insertion', true);
            }
            else {
                var revision = this.owner.revisionsInternal.changes[0];
                this.insertRevisionForBlock(tocPara, 'Insertion', true, revision);
            }
        }
    };
    Editor.prototype.insertTocHyperlink = function (lineWidget, bookmarkName, text) {
        var fieldCode = ' HYPERLINK \\l \"' + bookmarkName + '\" ';
        var fieldBegin = this.createTocFieldElement(lineWidget, fieldCode, true);
        //text element.
        var span = new TextElementBox();
        span.text = text;
        span.line = lineWidget;
        lineWidget.children.push(span);
        return fieldBegin;
    };
    Editor.prototype.getPageNumber = function (widget) {
        var pageNumber;
        if (widget.bodyWidget.sectionFormat.restartPageNumbering) {
            pageNumber = widget.bodyWidget.page.currentPageNum;
        }
        else {
            pageNumber = this.documentHelper.pages.indexOf(widget.bodyWidget.page) + 1;
        }
        return pageNumber;
    };
    Editor.prototype.insertTocPageNumber = function (bookMarkname, lineWidget, isRightAlign, widget) {
        var fieldCode = ' PAGEREF' + bookMarkname + ' \\h ';
        var fieldBegin = this.createTocFieldElement(lineWidget, fieldCode, true);
        var text = (this.getPageNumber(widget)).toString();
        var span = new FieldTextElementBox();
        span.fieldBegin = fieldBegin;
        if (!isRightAlign) {
            text = ' ' + text;
        }
        span.text = text;
        span.line = lineWidget;
        lineWidget.children.push(span);
        this.pageRefFields[bookMarkname] = span;
        return fieldBegin;
    };
    Editor.prototype.updatePageRef = function () {
        for (var _i = 0, _a = Object.keys(this.pageRefFields); _i < _a.length; _i++) {
            var key = _a[_i];
            if (this.documentHelper.bookmarks.containsKey(key)) {
                var bookmark = this.documentHelper.bookmarks.get(key);
                var pageRef = (this.getPageNumber(bookmark.paragraph)).toString();
                var span = this.pageRefFields[key];
                if (pageRef !== span.text) {
                    span.text = pageRef;
                    var paragraph = span.paragraph;
                    var lineIndex = paragraph.childWidgets.indexOf(span.line);
                    var elementIndex = span.line.children.indexOf(span);
                    if (!isNullOrUndefined(paragraph.containerWidget)) {
                        this.documentHelper.layout.reLayoutParagraph(paragraph, lineIndex, elementIndex);
                    }
                }
            }
        }
    };
    /**
     * Inserts toc bookmark.
     *
     * @param widget
     * @returns {string}
     */
    Editor.prototype.insertTocBookmark = function (widget) {
        var bookmarkName = undefined;
        var lineLength = widget.childWidgets.length;
        if (lineLength > 0) {
            var splitParagraph = widget.getSplitWidgets();
            var firstParagraph = splitParagraph[0];
            var lastParagraph = splitParagraph.pop();
            var startLine = firstParagraph.childWidgets[0];
            var endLine = lastParagraph.childWidgets[lastParagraph.childWidgets.length - 1];
            if ((startLine !== undefined) && (endLine !== undefined)) {
                var startElement = startLine.children[0];
                if (startElement instanceof ListTextElementBox || startElement instanceof CommentCharacterElementBox) {
                    do {
                        startElement = startElement.nextNode;
                    } while (startElement instanceof ListTextElementBox || startElement instanceof CommentCharacterElementBox);
                }
                //Returns the bookmark if already present for paragraph.
                if (!isNullOrUndefined(startElement) && startElement instanceof BookmarkElementBox && startElement.bookmarkType === 0 && (startElement.name.toLowerCase().match('^_toc'))) {
                    return startElement.name;
                }
                var endElement = endLine.children[endLine.children.length - 1];
                if ((startElement !== undefined) && (endElement !== undefined)) {
                    this.selection.start.setPositionForSelection(startLine, startElement, 0, this.selection.start.location);
                    this.selection.end.setPositionForSelection(endLine, endElement, endElement.length, this.selection.end.location);
                    bookmarkName = this.generateBookmarkName();
                    this.insertBookmark(bookmarkName);
                }
            }
        }
        return bookmarkName;
    };
    Editor.prototype.generateBookmarkName = function () {
        this.tocBookmarkId++;
        var count = 10 - this.tocBookmarkId.toString().length;
        var formatString = '';
        while (count - 1 > 0) {
            formatString = '0' + formatString;
            count--;
        }
        var bookmarkName = '_Toc' + formatString + this.tocBookmarkId;
        return bookmarkName;
    };
    /**
     * Change cell content alignment
     *
     * @param verticalAlignment
     * @param textAlignment
     * @param verticalAlignment
     * @param textAlignment
     * @private
     * @returns {void}
     */
    Editor.prototype.onCellContentAlignment = function (verticalAlignment, textAlignment) {
        this.owner.isShiftingEnabled = true;
        var selection = this.owner.selection;
        if (selection.isEmpty && selection.start.paragraph.isInsideTable) {
            if (this.owner.editorHistory) {
                this.owner.editorHistory.initComplexHistory(selection, 'MultiSelection');
            }
            //Selecting the table cell to update the all the paragraph format.
            selection.selectTableCell();
            this.initHistory('CellContentVerticalAlignment');
            var cellFormat = selection.start.paragraph.associatedCell.cellFormat;
            this.applyCellPropertyValue(selection, 'verticalAlignment', verticalAlignment, cellFormat);
            this.reLayout(selection, false);
            this.initHistory('TextAlignment');
            this.updateParagraphFormat('textAlignment', textAlignment, false);
            this.reLayout(this.owner.selection, false);
            if (this.owner.editorHistory) {
                this.owner.editorHistory.updateComplexHistory();
            }
        }
        else {
            if (this.owner.editorHistory) {
                this.owner.editorHistory.initComplexHistory(selection, 'MultiSelection');
            }
            if (!isNullOrUndefined(selection.getTable(selection.start, selection.end))) {
                //Table cell vertical alignment.
                this.updateSelectionTableFormat(selection, 'CellContentVerticalAlignment', verticalAlignment);
                this.reLayout(this.owner.selection, false);
                this.initHistory('TextAlignment');
                //Paragraph text alignment.
                this.updateSelectionParagraphFormatting('textAlignment', textAlignment, false);
                this.reLayout(selection, false);
            }
            if (this.owner.editorHistory) {
                this.owner.editorHistory.updateComplexHistory();
            }
        }
    };
    //Restrict editing implementation starts
    /**
     * @param user
     * @private
     * @returns {void}
     */
    Editor.prototype.insertEditRangeElement = function (user) {
        if (this.documentHelper.isDocumentProtected || this.documentHelper.selection.isEmpty) {
            return;
        }
        this.initComplexHistory('RestrictEditing');
        this.selection.skipEditRangeRetrieval = true;
        var selection = this.documentHelper.selection;
        var startPos = this.selection.start;
        var endPos = this.selection.end;
        if (!this.selection.isForward) {
            startPos = this.selection.end;
            endPos = this.selection.start;
        }
        if (selection.start.paragraph.isInsideTable && selection.end.paragraph.isInsideTable
            && selection.start.paragraph.associatedCell.ownerTable.contains(selection.end.paragraph.associatedCell)) {
            var startCell = this.getOwnerCell(this.selection.isForward);
            var endCell = this.getOwnerCell(!this.selection.isForward);
            if (startCell.rowIndex === endCell.rowIndex) {
                var startIndex = startCell.ownerRow.childWidgets.indexOf(startCell);
                var endIndex = startCell.ownerRow.childWidgets.indexOf(endCell);
                var startElement = [];
                var endElement = [];
                for (var i = startIndex; i <= endIndex; i++) {
                    var editStart = this.addEditElement(user);
                    if (i == startIndex) {
                        if (this.editorHistory && this.editorHistory.currentHistoryInfo) {
                            this.editorHistory.currentHistoryInfo.editRangeStart = editStart;
                        }
                    }
                    editStart.columnFirst = i;
                    editStart.columnLast = i;
                    editStart.line = selection.start.currentWidget;
                    var editEnd = editStart.editRangeEnd;
                    editEnd.line = selection.end.currentWidget;
                    startElement.push(editStart);
                    endElement.push(editEnd);
                }
                this.insertElements(endElement, startElement);
                if (this.editorHistory) {
                    this.editorHistory.updateComplexHistoryInternal();
                }
                var offset = startElement[0].line.getOffset(startElement[0], 1);
                this.selection.start.setPositionParagraph(startElement[0].line, offset);
                offset = endElement[0].line.getOffset(endElement[0], 1);
                this.selection.end.setPositionParagraph(endElement[0].line, offset);
                this.selection.fireSelectionChanged(true);
                this.fireContentChange();
            }
            else {
                this.insertEditRangeInsideTable(startCell, endCell, user);
                if (this.editorHistory) {
                    this.editorHistory.updateComplexHistoryInternal();
                }
                var startLine = this.documentHelper.getFirstParagraphInCell(startCell).childWidgets[0];
                var endLine = this.selection.getLastParagraph(endCell).childWidgets[0];
                var offset = startLine.getOffset(startLine.children[0], 1);
                this.selection.start.setPositionParagraph(startLine, offset);
                offset = endLine.getOffset(endLine.children[0], 1);
                this.selection.end.setPositionParagraph(endLine, offset);
                this.selection.fireSelectionChanged(true);
                this.fireContentChange();
            }
        }
        else {
            this.addRestrictEditingForSelectedArea(user);
        }
        this.selection.skipEditRangeRetrieval = false;
    };
    Editor.prototype.insertEditRangeInsideTable = function (startCell, endCell, user) {
        var table = startCell.ownerTable;
        var count = table.childWidgets.indexOf(endCell.ownerRow);
        var rowStartIndex = table.childWidgets.indexOf(startCell.ownerRow);
        var startLeft = this.selection.getCellLeft(startCell.ownerRow, startCell);
        var endLeft = startLeft + startCell.cellFormat.cellWidth;
        var endCellLeft = this.selection.getCellLeft(endCell.ownerRow, endCell);
        var endCellRight = endCellLeft + endCell.cellFormat.cellWidth;
        var cellInfo = this.updateSelectedCellsInTable(startLeft, endLeft, endCellLeft, endCellRight);
        startLeft = cellInfo.start;
        endLeft = cellInfo.end;
        var endElement = [];
        for (var i = rowStartIndex; i <= count; i++) {
            var row = table.childWidgets[i];
            var cellSelectionStartIndex = -1;
            var cellSelectionEndIndex = -1;
            for (var j = 0; j < row.childWidgets.length; j++) {
                var cell = row.childWidgets[j];
                var cellStart = this.selection.getCellLeft(row, cell);
                if (this.checkCellWithInSelection(startLeft, endLeft, cellStart)) {
                    if (cellSelectionStartIndex === -1) {
                        cellSelectionStartIndex = j;
                    }
                    cellSelectionEndIndex = j;
                }
            }
            var newEndElement = [];
            for (var z = cellSelectionStartIndex; z <= cellSelectionEndIndex; z++) {
                var index = 0;
                var startCell_2 = void 0;
                var startParagraph = void 0;
                if (z === cellSelectionStartIndex) {
                    startCell_2 = row.childWidgets[cellSelectionStartIndex];
                    startParagraph = this.documentHelper.getFirstParagraphInCell(startCell_2).childWidgets[0];
                }
                var editStart = this.addEditElement(user);
                if (z === cellSelectionStartIndex) {
                    if (this.editorHistory && this.editorHistory.currentHistoryInfo) {
                        this.editorHistory.currentHistoryInfo.editRangeStart = editStart;
                    }
                }
                editStart.columnFirst = z;
                editStart.columnLast = z;
                editStart.line = startParagraph;
                editStart.line.children.splice(index, 0, editStart);
                index++;
                var editEnd = editStart.editRangeEnd;
                newEndElement.push(editEnd);
                if (endElement.length > 0 && z === cellSelectionEndIndex) {
                    for (var l = 0; l < endElement.length; l++) {
                        endElement[l].line = editStart.line;
                        editStart.line.children.splice(index, 0, endElement[l]);
                        index++;
                    }
                    endElement = [];
                }
            }
            endElement = newEndElement;
            if (i === count && endElement.length > 0) {
                var cellWidget = row.childWidgets[cellSelectionEndIndex];
                var lastLine = this.selection.getLastParagraph(cellWidget).lastChild;
                var index = lastLine.children.length - 1;
                for (var l = 0; l < endElement.length; l++) {
                    endElement[l].line = lastLine;
                    lastLine.children.splice(index, 0, endElement[l]);
                    index++;
                }
            }
        }
    };
    Editor.prototype.addRestrictEditingForSelectedArea = function (user) {
        var editStart = this.addEditElement(user);
        var editEnd = editStart.editRangeEnd;
        if (this.editorHistory && this.editorHistory.currentHistoryInfo) {
            this.editorHistory.currentHistoryInfo.editRangeStart = editStart;
        }
        this.owner.isShiftingEnabled = true;
        this.insertElements([editEnd], [editStart]);
        if (this.editorHistory) {
            this.editorHistory.updateComplexHistoryInternal();
        }
        var offset = editStart.line.getOffset(editStart, 1);
        this.selection.start.setPositionParagraph(editStart.line, offset);
        offset = editEnd.line.getOffset(editEnd, 1);
        this.selection.end.setPositionParagraph(editEnd.line, offset);
        var block = this.documentHelper.blockToShift;
        if (!isNullOrUndefined(block) && this.viewer instanceof PageLayoutViewer && block.bodyWidget.sectionFormat.columns.length > 1) {
            var lastbody = this.documentHelper.layout.getBodyWidget(block.bodyWidget, false);
            if ((!isNullOrUndefined(lastbody.nextRenderedWidget) && lastbody.nextRenderedWidget.sectionFormat.breakCode === 'NoBreak' && lastbody.page === lastbody.nextRenderedWidget.page)) {
                this.reLayout(this.selection);
            }
        }
        this.owner.isShiftingEnabled = false;
        this.selection.fireSelectionChanged(true);
        this.fireContentChange();
    };
    /**
     * @param user
     * @private
     * @returns {void}
     */
    Editor.prototype.addEditElement = function (user) {
        var editStart = new EditRangeStartElementBox();
        if (user.toLocaleLowerCase() === 'everyone') {
            editStart.group = user;
        }
        else {
            editStart.user = user;
        }
        var editEnd = new EditRangeEndElementBox();
        editEnd.editRangeStart = editStart;
        editStart.editRangeEnd = editEnd;
        this.editStartRangeCollection.push(editStart);
        this.addEditCollectionToDocument();
        this.editStartRangeCollection = [];
        return editStart;
    };
    /**
     * @param protectionType
     * @private
     * @returns {void}
     */
    Editor.prototype.protect = function (protectionType) {
        this.documentHelper.isDocumentProtected = true;
        this.documentHelper.protectionType = protectionType;
        this.selection.highlightEditRegion();
        if (this.editorHistory) {
            this.editorHistory.destroy();
        }
    };
    Editor.prototype.addEditCollectionToDocument = function () {
        for (var i = 0; i < this.editStartRangeCollection.length; i++) {
            var editStart = this.editStartRangeCollection[i];
            var user = editStart.user === '' ? editStart.group : editStart.user;
            if (this.documentHelper.editRanges.length > 0 && this.documentHelper.editRanges.containsKey(user)) {
                this.documentHelper.editRanges.get(user).push(editStart);
            }
            else {
                var collection = [];
                collection.push(editStart);
                this.documentHelper.editRanges.add(user, collection);
            }
        }
        this.selection.updateEditRangeCollection();
    };
    /**
     * @param editStart
     * @param user
     * @private
     * @returns {void}
     */
    Editor.prototype.updateRangeCollection = function (editStart, user) {
        if (this.documentHelper.editRanges.length > 0 && this.documentHelper.editRanges.containsKey(user)) {
            this.documentHelper.editRanges.get(user).push(editStart);
        }
        else {
            var collection = [];
            collection.push(editStart);
            this.documentHelper.editRanges.add(user, collection);
        }
    };
    /**
     * @param user
     * @private
     * @returns {void}
     */
    Editor.prototype.removeUserRestrictions = function (user) {
        if (!this.selection.checkSelectionIsAtEditRegion()) {
            return;
        }
        this.selection.skipEditRangeRetrieval = true;
        var editStart = this.selection.getEditRangeStartElement();
        this.initHistory('RemoveEditRange');
        if (this.editorHistory) {
            this.editorHistory.currentBaseHistoryInfo.setEditRangeInfo(editStart);
            this.editorHistory.updateHistory();
        }
        if (editStart.user === user || editStart.group === user) {
            this.removeUserRestrictionsInternal(editStart, user);
        }
        this.selection.updateEditRangeCollection();
        this.fireContentChange();
        this.selection.skipEditRangeRetrieval = false;
    };
    /**
     * @param editStart
     * @param currentUser
     * @private
     * @returns {void}
     */
    Editor.prototype.removeUserRestrictionsInternal = function (editStart, currentUser) {
        var user = currentUser;
        if (isNullOrUndefined(currentUser)) {
            user = editStart.user === '' ? editStart.group : editStart.user;
        }
        var index = this.documentHelper.editRanges.get(user).indexOf(editStart);
        this.documentHelper.editRanges.get(user).splice(index, 1);
        if (this.documentHelper.editRanges.get(user).length === 0) {
            this.documentHelper.editRanges.remove(user);
        }
        if (editStart.columnFirst != -1 && editStart.columnLast != -1) {
            var row = editStart.paragraph.associatedCell.ownerRow;
            if (row.editRangeID.containsKey(editStart.editRangeId)) {
                var cell = row.getCellUsingColumnIndex(row.rowIndex, editStart.columnFirst);
                if (!isNullOrUndefined(cell)) {
                    if (cell.isRenderEditRangeStart && cell.isRenderEditRangeEnd) {
                        cell.isRenderEditRangeEnd = false;
                        cell.isRenderEditRangeStart = false;
                        row.editRangeID.remove(editStart.editRangeId);
                    }
                }
            }
            else {
                var table = editStart.paragraph.associatedCell.ownerTable;
                for (var i = row.rowIndex - 1; i >= 0; i--) {
                    var previousRow = table.childWidgets[i];
                    if (previousRow.editRangeID.containsKey(editStart.editRangeId)) {
                        var previousCell = previousRow.getCellUsingColumnIndex(previousRow.rowIndex, editStart.columnFirst);
                        if (!isNullOrUndefined(previousCell)) {
                            if (previousCell.isRenderEditRangeStart && previousCell.isRenderEditRangeEnd) {
                                previousCell.isRenderEditRangeEnd = false;
                                previousCell.isRenderEditRangeStart = false;
                                previousRow.editRangeID.remove(editStart.editRangeId);
                                break;
                            }
                        }
                    }
                }
            }
        }
        editStart.removeEditRangeMark();
        editStart.editRangeEnd.line.children.splice(editStart.editRangeEnd.indexInOwner, 1);
        editStart.line.children.splice(editStart.indexInOwner, 1);
    };
    /**
     * @private
     * @returns {void}
     */
    Editor.prototype.removeAllEditRestrictions = function () {
        this.selection.skipEditRangeRetrieval = true;
        var startPosition = this.selection.start;
        var endPosition = this.selection.end;
        var editStart = [];
        var keys = this.documentHelper.editRanges.keys;
        for (var j = 0; j < keys.length; j++) {
            editStart = this.documentHelper.editRanges.get(keys[j]);
            for (var i = 0; i < editStart.length; i++) {
                editStart[i].editRangeEnd.line.children.splice(editStart[i].editRangeEnd.indexInOwner, 1);
                editStart[i].line.children.splice(editStart[i].indexInOwner, 1);
            }
        }
        this.documentHelper.editRanges.clear();
        this.selection.updateEditRangeCollection();
        this.selection.start.setPositionInternal(startPosition);
        this.selection.end.setPositionInternal(endPosition);
        this.selection.editRegionHighlighters.clear();
        this.owner.viewer.updateScrollBars();
        this.selection.fireSelectionChanged(false);
        this.selection.skipEditRangeRetrieval = false;
    };
    /**
     * Inserts the specified form field at the current selection.
     *
     * @param {FormFieldType} type Specify the Form field type to insert.
     * @returns {void}
     */
    Editor.prototype.insertFormField = function (type) {
        if (isNullOrUndefined(this.selection.start) || this.owner.enableHeaderAndFooter) {
            return;
        }
        this.initHistory('InsertHyperlink');
        var isRemoved = true;
        if (!this.selection.isEmpty) {
            isRemoved = this.removeSelectedContents(this.selection);
        }
        if (isRemoved) {
            this.insertFormFieldInternal(type);
        }
    };
    Editor.prototype.insertFormFieldInternal = function (type) {
        this.updateInsertPosition();
        var element = [];
        var temp = this.getCharacterFormat(this.selection);
        var format = new WCharacterFormat(undefined);
        format.copyFormat(temp);
        var fieldBegin = new FieldElementBox(0);
        fieldBegin.formFieldData = this.getFormFieldData(type);
        fieldBegin.characterFormat.copyFormat(format);
        element.push(fieldBegin);
        var bookmark = new BookmarkElementBox(0);
        bookmark.characterFormat.copyFormat(format);
        fieldBegin.formFieldData.name = this.getBookmarkName(type, 'Insert', this.formFieldCounter);
        bookmark.name = fieldBegin.formFieldData.name;
        element.push(bookmark);
        var span = new TextElementBox();
        span.text = this.getFormFieldCode(type);
        element.push(span);
        var fieldSeparator = new FieldElementBox(2);
        element.push(fieldSeparator);
        var result = new TextElementBox();
        if (type === 'CheckBox') {
            result.text = String.fromCharCode(9744);
        }
        else {
            result.text = this.documentHelper.textHelper.repeatChar(this.documentHelper.textHelper.getEnSpaceCharacter(), 5);
        }
        result.characterFormat.copyFormat(format);
        element.push(result);
        var fieldEnd = new FieldElementBox(1);
        fieldEnd.characterFormat.copyFormat(format);
        element.push(fieldEnd);
        var bookmarkEnd = new BookmarkElementBox(1);
        bookmarkEnd.characterFormat.copyFormat(format);
        bookmarkEnd.name = fieldBegin.formFieldData.name;
        bookmarkEnd.reference = bookmark;
        bookmark.reference = bookmarkEnd;
        element.push(bookmarkEnd);
        this.documentHelper.layout.isInsertFormField = true;
        this.insertElement(element);
        this.documentHelper.layout.isInsertFormField = false;
        var paragraph = this.selection.start.paragraph;
        fieldEnd.linkFieldCharacter(this.documentHelper);
        if (this.documentHelper.fields.indexOf(fieldBegin) === -1) {
            this.documentHelper.fields.push(fieldBegin);
        }
        this.addFormFieldWidget(fieldBegin);
        var offset = bookmarkEnd.line.getOffset(bookmarkEnd, 1);
        this.selection.selects(bookmarkEnd.line, offset, true);
        this.updateEndPosition();
        this.reLayout(this.selection, true);
    };
    Editor.prototype.addFormFieldWidget = function (fieldBegin) {
        if (this.documentHelper.formFields.indexOf(fieldBegin) === -1) {
            var isInserted = false;
            if (this.documentHelper.formFields.length > 0) {
                var currentStart = this.selection.getElementPosition(fieldBegin).startPosition;
                for (var i = 0; i < this.documentHelper.formFields.length; i++) {
                    /* eslint-disable-next-line max-len */
                    var paraIndex = this.selection.getElementPosition(this.documentHelper.formFields[i]).startPosition;
                    if (currentStart.isExistBefore(paraIndex)) {
                        isInserted = true;
                        this.documentHelper.formFields.splice(i, 0, fieldBegin);
                        break;
                    }
                }
            }
            if (!isInserted) {
                this.documentHelper.formFields.push(fieldBegin);
            }
        }
    };
    Editor.prototype.getFormFieldData = function (type) {
        switch (type) {
            case 'Text':
                return new TextFormField();
            case 'CheckBox':
                return new CheckBoxFormField();
            case 'DropDown':
                return new DropDownFormField();
        }
    };
    /**
     * @param field
     * @param info
     * @private
     * @returns {void}
     */
    Editor.prototype.setFormField = function (field, info) {
        var type;
        var formField;
        if (!isNullOrUndefined(info.format)) {
            type = 'Text';
            formField = new TextFormField();
        }
        else if (!isNullOrUndefined(info.sizeType)) {
            type = 'CheckBox';
            formField = new CheckBoxFormField();
        }
        else if (!isNullOrUndefined(info.dropdownItems)) {
            type = 'DropDown';
            formField = new DropDownFormField();
        }
        if (!isNullOrUndefined(type) && !isNullOrUndefined(formField)) {
            formField.name = !isNullOrUndefined(info.name) ? info.name : field.formFieldData.name;
            formField.copyFieldInfo(info);
            this.editFormField(type, formField);
        }
    };
    /**
     * @param type
     * @param formData
     * @param type
     * @param formData
     * @private
     * @returns {boolean}
     */
    Editor.prototype.editFormField = function (type, formData) {
        var begin = this.selection.getCurrentFormField();
        if (isNullOrUndefined(begin) || isNullOrUndefined(begin.formFieldData)) {
            return false;
        }
        this.initComplexHistory('FormField');
        var bookmarkStart;
        var bookmarkEnd;
        if (formData.name !== '') {
            if (begin.formFieldData.name !== formData.name &&
                this.documentHelper.bookmarks.containsKey(formData.name)) {
                this.deleteBookmark(formData.name);
            }
            bookmarkStart = new BookmarkElementBox(0);
            bookmarkStart.name = formData.name;
            bookmarkEnd = new BookmarkElementBox(1);
            bookmarkEnd.name = formData.name;
            bookmarkStart.reference = bookmarkEnd;
            bookmarkEnd.reference = bookmarkStart;
        }
        this.initHistory('InsertHyperlink');
        this.editHyperlinkInternal = isNullOrUndefined(this.editorHistory)
            || (this.editorHistory && isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo));
        // Preserves the character format for hyperlink field.
        var temp = begin.characterFormat.cloneFormat();
        var format = new WCharacterFormat();
        format.copyFormat(temp);
        var textFormat = begin.fieldSeparator.nextElement.characterFormat.cloneFormat();
        var currentOffset = begin.line.getOffset(begin, 0);
        this.selection.start.setPositionParagraph(begin.line, currentOffset);
        var endElement = begin.fieldEnd;
        if (begin.nextNode && begin.nextNode instanceof BookmarkElementBox) {
            endElement = begin.nextNode.reference;
        }
        currentOffset = endElement.line.getOffset(endElement, 1);
        this.selection.end.setPositionParagraph(endElement.line, currentOffset);
        this.skipFieldDeleteTracking = true;
        this.deleteSelectedContents(this.selection, false);
        this.skipFieldDeleteTracking = false;
        this.updateInsertPosition();
        var element = [];
        var fieldBegin = new FieldElementBox(0);
        fieldBegin.formFieldData = formData;
        element.push(fieldBegin);
        fieldBegin.characterFormat.copyFormat(format);
        if (!isNullOrUndefined(bookmarkStart)) {
            element.push(bookmarkStart);
        }
        var span = new TextElementBox();
        span.text = this.getFormFieldCode(type);
        element.push(span);
        var fieldSeparator = new FieldElementBox(2);
        fieldSeparator.characterFormat.copyFormat(format);
        element.push(fieldSeparator);
        span = new TextElementBox();
        span.characterFormat.copyFormat(textFormat);
        span.text = this.getDefaultText(formData);
        if (type === 'CheckBox') {
            span.characterFormat.copyFormat(fieldBegin.characterFormat);
            if (formData.sizeType === 'Exactly') {
                span.characterFormat.fontSize = formData.size;
            }
        }
        else if (formData instanceof TextFormField) {
            if (formData.defaultValue !== '') {
                if (formData.type === 'Text') {
                    span.text = HelperMethods.formatText(formData.format, formData.defaultValue);
                }
                else if (formData.type === 'Number') {
                    span.text = HelperMethods.formatNumber(formData.format, formData.defaultValue);
                }
                else {
                    span.text = HelperMethods.formatDate(formData.format, formData.defaultValue);
                }
            }
        }
        element.push(span);
        var fieldEnd = new FieldElementBox(1);
        fieldEnd.characterFormat.copyFormat(format);
        element.push(fieldEnd);
        var lastElement = fieldEnd;
        if (!isNullOrUndefined(bookmarkEnd)) {
            lastElement = bookmarkEnd;
            element.push(bookmarkEnd);
        }
        this.documentHelper.layout.isInsertFormField = true;
        this.insertElement(element);
        this.documentHelper.layout.isInsertFormField = false;
        var paragraph = this.selection.start.paragraph;
        fieldEnd.linkFieldCharacter(this.documentHelper);
        if (this.documentHelper.fields.indexOf(fieldBegin) === -1) {
            this.documentHelper.fields.push(fieldBegin);
        }
        this.addFormFieldWidget(fieldBegin);
        var offset = lastElement.line.getOffset(lastElement, 1);
        this.selection.selects(lastElement.line, offset, true);
        this.updateEndPosition();
        if (this.editorHistory && this.editorHistory.currentBaseHistoryInfo) {
            this.editorHistory.updateHistory();
        }
        if (this.editorHistory && this.editorHistory.currentHistoryInfo) {
            this.editorHistory.updateComplexHistory();
        }
        this.reLayout(this.selection, true);
        this.editHyperlinkInternal = false;
        this.nodes = [];
        return true;
    };
    Editor.prototype.getDefaultText = function (formField) {
        var defaultText = '';
        if (formField instanceof CheckBoxFormField) {
            defaultText = formField.defaultValue ? String.fromCharCode(9745) : String.fromCharCode(9744);
        }
        else if (formField instanceof DropDownFormField) {
            if (formField.dropdownItems.length > 0) {
                defaultText = formField.dropdownItems[0];
            }
            else {
                defaultText = this.documentHelper.textHelper.repeatChar(this.documentHelper.textHelper.getEnSpaceCharacter(), 5);
            }
        }
        else if (formField instanceof TextFormField) {
            if (formField.defaultValue !== '') {
                defaultText = formField.defaultValue;
            }
            else {
                defaultText = this.documentHelper.textHelper.repeatChar(this.documentHelper.textHelper.getEnSpaceCharacter(), 5);
            }
        }
        return defaultText;
    };
    Editor.prototype.getFormFieldCode = function (type) {
        switch (type) {
            case 'Text':
                return 'FORMTEXT';
            case 'CheckBox':
                return 'FORMCHECKBOX';
            case 'DropDown':
                return 'FORMDROPDOWN';
        }
    };
    /**
     * @param field
     * @param reset
     * @param value
     * @param field
     * @param reset
     * @param value
     * @private
     * @returns {void}
     */
    Editor.prototype.toggleCheckBoxFormField = function (field, reset, value) {
        var formFieldData = field.formFieldData;
        if (formFieldData instanceof CheckBoxFormField && formFieldData.enabled) {
            this.initHistory('UpdateFormField');
            if (this.editorHistory) {
                var currentValue = void 0;
                if (formFieldData instanceof CheckBoxFormField) {
                    currentValue = formFieldData.checked;
                }
                this.editorHistory.currentBaseHistoryInfo.setFormFieldInfo(field, currentValue);
                this.editorHistory.updateHistory();
            }
            if (reset) {
                formFieldData.checked = value;
            }
            else {
                formFieldData.checked = !formFieldData.checked;
            }
            var separator = field.fieldSeparator;
            var checkBoxTextElement = separator.nextNode;
            if (formFieldData.checked) {
                checkBoxTextElement.text = String.fromCharCode(9745);
            }
            else {
                checkBoxTextElement.text = String.fromCharCode(9744);
            }
            this.owner.documentHelper.layout.reLayoutParagraph(field.line.paragraph, 0, 0);
            this.reLayout(this.selection, false);
        }
    };
    /**
     * @param field
     * @param value
     * @param reset
     * @private
     * @returns {void}
     */
    Editor.prototype.updateFormField = function (field, value, reset) {
        var formFieldData = field.formFieldData;
        if (formFieldData) {
            this.updateFormFieldInternal(field, formFieldData, value, reset);
        }
    };
    Editor.prototype.updateFormFieldInternal = function (field, formFieldData, value, reset) {
        if (formFieldData instanceof TextFormField) {
            if (value === '') {
                if (reset) {
                    value = this.getDefaultText(formFieldData);
                }
                else {
                    value = this.documentHelper.textHelper.repeatChar(this.documentHelper.textHelper.getEnSpaceCharacter(), 5);
                }
            }
            var formattedText = value;
            var type = formFieldData.type;
            if (type === 'Text' && formFieldData.format !== '') {
                formattedText = HelperMethods.formatText(formFieldData.format, value);
            }
            this.updateFormFieldResult(field, formattedText);
        }
        else if (formFieldData instanceof DropDownFormField) {
            var text = formFieldData.dropdownItems[value];
            formFieldData.selectedIndex = value;
            this.updateFormFieldResult(field, text);
        }
        var endoffset = field.fieldEnd.line.getOffset(field.fieldEnd, 1);
        var startPos = new TextPosition(this.owner);
        startPos.setPositionParagraph(field.fieldEnd.line, endoffset);
        //selects the field range
        this.documentHelper.selection.selectRange(startPos, startPos);
        this.reLayout(this.selection, false);
    };
    Editor.prototype.updateFormFieldResult = function (field, value) {
        //When protection is enabled with type Form Filling below method selects the field result alone.
        this.selection.selectFieldInternal(field, false, true);
        this.insertText(value);
    };
    Editor.prototype.checkBookmarkAvailability = function (name, action) {
        var bookmarkCol = this.documentHelper.bookmarks;
        for (var i = 0; i < bookmarkCol.length; i++) {
            if (bookmarkCol.containsKey(name)) {
                return false;
            }
        }
        return true;
    };
    Editor.prototype.getBookmarkName = function (type, action, count) {
        var name;
        var available = false;
        while (available === false) {
            name = type + count;
            available = this.checkBookmarkAvailability(name, action);
            count = count + 1;
        }
        return name;
    };
    /**
     * @param formField
     * @private
     * @returns {void}
     */
    Editor.prototype.applyFormTextFormat = function (formField) {
        if (!isNullOrUndefined(formField)) {
            var text = this.getFieldResultText(formField);
            var currentValue = text;
            text = HelperMethods.formatText(formField.formFieldData.format, text);
            if (formField.fieldSeparator != undefined) {
                this.applyTextFormatInternal(formField, text);
            }
            this.initHistory('FormTextFormat');
            if (this.editorHistory) {
                this.editorHistory.currentBaseHistoryInfo.setFormFieldInfo(formField, currentValue);
                this.editorHistory.updateHistory();
            }
        }
    };
    // Inserts 5 space on Form Fill inline mode if length is 0
    Editor.prototype.insertSpaceInFormField = function () {
        if (this.documentHelper.isInlineFormFillProtectedMode && this.selection.isInlineFormFillMode()) {
            var resultText = this.getFieldResultText();
            if (resultText.length === 0 || resultText === '\r') {
                this.insertTextInternal(this.documentHelper.textHelper.repeatChar(this.documentHelper.textHelper.getEnSpaceCharacter(), 5), true);
                this.selection.selectTextElementStartOfField(this.selection.getCurrentFormField());
            }
        }
    };
    /**
     * @param formField
     * @private
     * @returns {string}
     */
    Editor.prototype.getFieldResultText = function (formField) {
        if (isNullOrUndefined(formField)) {
            formField = this.selection.getCurrentFormField();
        }
        //Stores the current selection index, to reset after getting the result text
        var previousStartIndex = this.selection.startOffset;
        var previousEndIndex = this.selection.endOffset;
        this.selection.isModifyingSelectionInternally = true;
        this.selection.selectFieldInternal(formField, false, true);
        var resultText = this.selection.getText(false);
        //Resets the selection back to the original index
        this.selection.select(previousStartIndex, previousEndIndex);
        this.selection.isModifyingSelectionInternally = false;
        return resultText;
    };
    /**
     * @param field
     * @param text
     * @private
     * @returns {void}
     */
    Editor.prototype.applyTextFormatInternal = function (field, text) {
        var textElement = field.fieldSeparator.nextElement;
        var start = 0;
        text = text.replace(/\r/g, '');
        do {
            if (!isNullOrUndefined(textElement) && textElement instanceof TextElementBox) {
                textElement.text = text.slice(start, start + textElement.text.length);
                start = start + textElement.length;
            }
            if (isNullOrUndefined(textElement.nextElement)) {
                if (!isNullOrUndefined(textElement.line.nextLine)) {
                    textElement = textElement.line.nextLine.children[0];
                }
                else {
                    this.documentHelper.layout.layoutBodyWidgetCollection(textElement.paragraph.index, textElement.paragraph.bodyWidget, textElement.paragraph, true);
                    var nextBlock = textElement.paragraph.nextRenderedWidget;
                    if (isNullOrUndefined(nextBlock)) {
                        break;
                    }
                    if (nextBlock instanceof TableWidget) {
                        nextBlock = this.documentHelper.getFirstParagraphBlock(nextBlock);
                    }
                    while (nextBlock.isEmpty()) {
                        nextBlock = nextBlock.nextRenderedWidget;
                    }
                    textElement = nextBlock.childWidgets[0].children[0];
                }
            }
            else {
                textElement = textElement.nextElement;
            }
        } while (!(textElement instanceof FieldElementBox && textElement.fieldType === 1 &&
            textElement.fieldBegin.formFieldData instanceof TextFormField));
        this.documentHelper.layout.layoutBodyWidgetCollection(textElement.paragraph.index, textElement.paragraph.bodyWidget, textElement.paragraph, true);
        this.selection.isFormatUpdated = true;
        this.reLayout(this.selection, false);
        this.selection.isFormatUpdated = false;
    };
    Editor.prototype.constructCommentInitial = function (authorName) {
        var splittedName = authorName.split(' ');
        var initials = '';
        for (var i = 0; i < splittedName.length; i++) {
            if (splittedName[i].length > 0 && splittedName[i] !== '') {
                initials += splittedName[i][0];
            }
        }
        return initials;
    };
    /**
     * Inserts the footnote at the current selection.
     *
     * @returns {void}
     */
    Editor.prototype.insertFootnote = function () {
        if (this.selection.isinFootnote || this.selection.isinEndnote) {
            return;
        }
        this.isFootNoteInsert = true;
        this.isFootNote = true;
        var footnote = new FootnoteElementBox();
        footnote.characterFormat.baselineAlignment = 'Superscript';
        footnote.footnoteType = 'Footnote';
        footnote.text = 's';
        var paragraph = new ParagraphWidget();
        var lineWidget = new LineWidget(paragraph);
        var text = new TextElementBox();
        paragraph.paragraphFormat.afterSpacing = 0;
        text.characterFormat.baselineAlignment = 'Superscript';
        text.line = lineWidget;
        text.text = '?';
        lineWidget.children.push(text);
        var text1 = new TextElementBox();
        text1.text = ' ';
        text1.line = lineWidget;
        lineWidget.children.push(text1);
        paragraph.childWidgets.push(lineWidget);
        footnote.bodyWidget.childWidgets.push(paragraph);
        if (!this.selection.isEmpty) {
            this.selection.handleRightKey();
        }
        this.initInsertInline(footnote);
        // this.documentHelper.layout.isLayoutWhole = true;
        // this.layoutWholeDocument();
        // this.documentHelper.layout.isLayoutWhole = false;
        var footPara;
        if (footnote.paragraph.bodyWidget.page.footnoteWidget) {
            for (var i = 0; i < footnote.paragraph.bodyWidget.page.footnoteWidget.bodyWidgets.length; i++) {
                if ((footnote.paragraph.bodyWidget.page.footnoteWidget.bodyWidgets[i]).footNoteReference === footnote) {
                    footPara = footnote.paragraph.bodyWidget.page.footnoteWidget.bodyWidgets[i].childWidgets[0];
                }
            }
        }
        this.selection.start.setPositionForLineWidget(footPara.childWidgets[0], text1.line.getOffset(text1, footnote.text.length));
        this.selection.end.setPositionInternal(this.selection.start);
        // this.selection.fireSelectionChanged(true);
        this.updateFootNoteIndex();
        this.reLayout(this.selection, false);
        this.separator('footnote');
        this.continuationSeparator('footnote');
        this.isFootNote = false;
    };
    Editor.prototype.updateFootnoteCollection = function (footnote) {
        if (this.documentHelper.footnoteCollection.indexOf(footnote) === -1) {
            var isInserted = false;
            if (this.documentHelper.footnoteCollection.length > 0) {
                var currentStart = this.selection.getElementPosition(footnote).startPosition;
                for (var i = 0; i < this.documentHelper.footnoteCollection.length; i++) {
                    var paraIndex = this.selection.getElementPosition(this.documentHelper.footnoteCollection[i]).startPosition;
                    if (currentStart.isExistBefore(paraIndex)) {
                        isInserted = true;
                        this.documentHelper.footnoteCollection.splice(i, 0, footnote);
                        break;
                    }
                }
            }
            if (!isInserted) {
                this.documentHelper.footnoteCollection.push(footnote);
            }
            // this.viewer.updateScrollBars();
        }
    };
    // Footnote implementation ends
    /**
     * Inserts the endnote at the current selection
     *
     * @returns {void}
     */
    Editor.prototype.insertEndnote = function () {
        if (this.selection.isinFootnote || this.selection.isinEndnote) {
            return;
        }
        this.documentHelper.layout.isEndnoteContentChanged = true;
        var endnote = new FootnoteElementBox();
        endnote.characterFormat.baselineAlignment = 'Superscript';
        endnote.footnoteType = 'Endnote';
        endnote.text = 's';
        var paragraph = new ParagraphWidget();
        var lineWidget = new LineWidget(paragraph);
        var footText = new TextElementBox();
        paragraph.paragraphFormat.afterSpacing = 0;
        footText.characterFormat.baselineAlignment = 'Superscript';
        footText.line = lineWidget;
        footText.text = '?';
        lineWidget.children.push(footText);
        var followText = new TextElementBox();
        followText.text = ' ';
        followText.line = lineWidget;
        lineWidget.children.push(followText);
        paragraph.childWidgets.push(lineWidget);
        endnote.bodyWidget.childWidgets.push(paragraph);
        if (!this.selection.isEmpty) {
            this.selection.handleRightKey();
        }
        this.initInsertInline(endnote);
        // this.documentHelper.layout.isLayoutWhole = true;
        // this.layoutWholeDocument();
        // this.documentHelper.layout.isLayoutWhole = false;
        var lastpage = this.documentHelper.pages.length;
        var bodyWidget = this.documentHelper.pages[lastpage - 1].bodyWidgets[0];
        var footPara;
        if (bodyWidget.page.endnoteWidget) {
            for (var i = 0; i < bodyWidget.page.endnoteWidget.bodyWidgets.length; i++) {
                if ((bodyWidget.page.endnoteWidget.bodyWidgets[i]).footNoteReference === endnote) {
                    footPara = bodyWidget.page.endnoteWidget.bodyWidgets[i].childWidgets[0];
                }
            }
        }
        this.selection.start.setPositionForLineWidget(footPara.childWidgets[0], footText.line.getOffset(followText, endnote.text.length));
        this.selection.end.setPositionInternal(this.selection.start);
        this.updateEndNoteIndex();
        this.documentHelper.layout.isLayoutWhole = true;
        this.layoutWholeDocument();
        this.documentHelper.layout.isLayoutWhole = false;
        this.reLayout(this.selection, false);
        this.owner.documentHelper.blockToShift = undefined;
        this.separator('endnote');
        this.continuationSeparator('endnote');
        this.documentHelper.layout.isEndnoteContentChanged = false;
    };
    Editor.prototype.updateEndnoteCollection = function (endnote) {
        if (this.documentHelper.endnoteCollection.indexOf(endnote) === -1) {
            var isInserted = false;
            if (this.documentHelper.endnoteCollection.length > 0) {
                var currentStart = this.selection.getElementPosition(endnote).startPosition;
                for (var i = 0; i < this.documentHelper.endnoteCollection.length; i++) {
                    var paraIndex = this.selection.getElementPosition(this.documentHelper.endnoteCollection[i]).startPosition;
                    if (currentStart.isExistBefore(paraIndex)) {
                        isInserted = true;
                        this.documentHelper.endnoteCollection.splice(i, 0, endnote);
                        break;
                    }
                }
            }
            if (!isInserted) {
                this.documentHelper.endnoteCollection.push(endnote);
            }
            var lastpage = this.documentHelper.pages.length;
            if (this.documentHelper.endnoteCollection.length > 0) {
                var positionchanged = false;
                // this.documentHelper.layout.isFootnoteContentChanged = true;
                var foot = void 0;
                var endnoteWidget = void 0;
                var footIndex = this.documentHelper.endnoteCollection.indexOf(endnote);
                var insertIndex = 1;
                var height = 0;
                var isCreated = void 0;
                var bodyWidget = this.documentHelper.pages[lastpage - 1].bodyWidgets[0];
                if (bodyWidget.page.endnoteWidget) {
                    for (var j = 0; j < bodyWidget.page.endnoteWidget.bodyWidgets.length; j++) {
                        var currentIndex = this.documentHelper.endnoteCollection.indexOf((bodyWidget.page.endnoteWidget.bodyWidgets[j]).footNoteReference);
                        if (currentIndex > footIndex) {
                            if (currentIndex - footIndex === 1) {
                                insertIndex = j;
                                positionchanged = true;
                                break;
                            }
                        }
                    }
                }
                // endnote.isLayout = true;
                foot = endnote; //this.documentHelper.endnoteCollection[i];
                if (bodyWidget.page.endnoteWidget instanceof FootNoteWidget && bodyWidget.page.endnoteWidget.footNoteType === 'Endnote') {
                    endnoteWidget = bodyWidget.page.endnoteWidget;
                }
                else {
                    isCreated = true;
                    endnoteWidget = new FootNoteWidget();
                    endnoteWidget.footNoteType = 'Endnote';
                    endnoteWidget.page = bodyWidget.page;
                    var newParagraph = new ParagraphWidget();
                    newParagraph.characterFormat = new WCharacterFormat();
                    newParagraph.paragraphFormat = new WParagraphFormat();
                    newParagraph.index = 0;
                    var lineWidget = new LineWidget(newParagraph);
                    newParagraph.childWidgets.push(lineWidget);
                    //endnoteWidget.childWidgets.push(newParagraph);
                    this.viewer.cutFromTop(this.viewer.clientActiveArea.y + 18);
                }
                var body = foot.bodyWidget;
                for (var j = 0; j < foot.bodyWidget.childWidgets.length; j++) {
                    var block = foot.bodyWidget.childWidgets[j];
                    //body.childWidgets.push(block);
                    if (this.documentHelper.layout.isLayoutWhole) {
                        block.containerWidget = undefined;
                    }
                    else {
                        block.containerWidget = body;
                        body.page = bodyWidget.page;
                        body.sectionFormat = endnoteWidget.sectionFormat;
                        block.containerWidget.containerWidget = endnoteWidget;
                    }
                    // endnoteWidget.bodyWidgets[j].childWidgets.push(block);
                    if (positionchanged) {
                        endnoteWidget.bodyWidgets.splice(insertIndex, 0, body);
                    }
                    else {
                        endnoteWidget.bodyWidgets.push(body);
                    }
                }
                insertIndex++;
                if (isCreated) {
                    bodyWidget.page.endnoteWidget = endnoteWidget;
                }
                // endNote.containerWidget = bodyWidget;
                endnoteWidget.height += height;
                //         }
                // this.documentHelper.layout.layoutfootNote(endnoteWidget);
                //this.layoutfootNote(endNote);
            }
            // this.viewer.updateScrollBars();
        }
    };
    Editor.prototype.updateEndNoteIndex = function () {
        var endNoteCollec = this.documentHelper.endnoteCollection;
        for (var i = 0; i < endNoteCollec.length; i++) {
            endNoteCollec[i].text = this.documentHelper.layout.getFootEndNote(endNoteCollec[i].paragraph.bodyWidget.sectionFormat.endnoteNumberFormat, i + 1);
            if (!isNullOrUndefined(endNoteCollec[i].bodyWidget.childWidgets[0].childWidgets[0].children[0])) {
                endNoteCollec[i].bodyWidget.childWidgets[0].childWidgets[0].children[0].text = endNoteCollec[i].text;
            }
        }
    };
    Editor.prototype.separator = function (type) {
        //let block = new page_1.block;
        var paragraph = new ParagraphWidget();
        var lineWidget = new LineWidget(paragraph);
        var text = new TextElementBox();
        text.characterFormat.fontColor = '#00000000';
        text.line = lineWidget;
        text.text = String.fromCharCode(3);
        lineWidget.children.push(text);
        paragraph.childWidgets.push(lineWidget);
        if (type === 'footnote' && this.documentHelper.footnotes.separator.length < 1) {
            this.documentHelper.footnotes.separator.push(paragraph);
        }
        else if (type === 'endnote' && this.documentHelper.endnotes.separator.length < 1) {
            this.documentHelper.endnotes.separator.push(paragraph);
        }
    };
    Editor.prototype.continuationSeparator = function (type) {
        //var block = new page_1.block;
        var paragraph = new ParagraphWidget();
        var lineWidget = new LineWidget(paragraph);
        var text = new TextElementBox();
        text.characterFormat.fontColor = '#00000000';
        text.line = lineWidget;
        text.text = String.fromCharCode(4);
        lineWidget.children.push(text);
        paragraph.childWidgets.push(lineWidget);
        if (type === 'footnote' && this.documentHelper.footnotes.continuationSeparator.length < 1) {
            this.documentHelper.footnotes.continuationSeparator.push(paragraph);
        }
        else if (type === 'endnote' && this.documentHelper.endnotes.continuationSeparator.length < 1) {
            this.documentHelper.endnotes.continuationSeparator.push(paragraph);
        }
    };
    Editor.prototype.updateFootNoteIndex = function () {
        var footNoteCollec = this.documentHelper.footnoteCollection;
        for (var i = 0; i < footNoteCollec.length; i++) {
            footNoteCollec[i].text = (i + 1).toString();
            if (!isNullOrUndefined(footNoteCollec[i].bodyWidget.childWidgets[0].childWidgets[0].children[0])) {
                footNoteCollec[i].bodyWidget.childWidgets[0].childWidgets[0].children[0].text = (i + 1).toString();
            }
        }
    };
    /**
    * @private
    */
    Editor.prototype.clear = function () {
        if (this.pageRefFields) {
            this.pageRefFields = {};
        }
    };
    return Editor;
}());
export { Editor };
