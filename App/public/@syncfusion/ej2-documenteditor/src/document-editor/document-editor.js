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
import { Component, Property, NotifyPropertyChanges, Event, ChildProperty, classList, Complex, formatUnit } from '@syncfusion/ej2-base';
import { isNullOrUndefined, L10n, Browser } from '@syncfusion/ej2-base';
import { Save } from '@syncfusion/ej2-file-utils';
import { LayoutViewer, PageLayoutViewer, WebLayoutViewer, BulletsAndNumberingDialog } from './index';
import { Print } from './index';
import { BodyWidget, ParagraphWidget } from './index';
import { WSectionFormat, WParagraphFormat, WCharacterFormat } from './index';
import { SfdtReader } from './index';
import { Selection } from './index';
import { Editor, EditorHistory } from './index';
import { WStyles } from './index';
import { Search } from './index';
import { OptionsPane } from './index';
import { WordExport } from './index';
import { TextExport } from './index';
import { ContextMenu } from './index';
import { ImageResizer } from './index';
import { SfdtExport } from './index';
import { HyperlinkDialog, TableDialog, BookmarkDialog, StylesDialog, TableOfContentsDialog } from './index';
import { PageSetupDialog, ParagraphDialog, ListDialog, StyleDialog, FontDialog } from './index';
import { TablePropertiesDialog, BordersAndShadingDialog, CellOptionsDialog, TableOptionsDialog } from './index';
import { SpellChecker } from './implementation/spell-check/spell-checker';
import { SpellCheckDialog } from './implementation/dialogs/spellCheck-dialog';
import { DocumentHelper } from './index';
import { CheckBoxFormFieldDialog, DropDownFormField, TextFormField, CheckBoxFormField } from './implementation/index';
import { TextFormFieldDialog } from './implementation/dialogs/form-field-text-dialog';
import { DropDownFormFieldDialog } from './implementation/dialogs/form-field-drop-down-dialog';
import { RevisionCollection } from './implementation/track-changes/track-changes';
import { NotesDialog } from './implementation/dialogs/notes-dialog';
import { FootNoteWidget } from './implementation/viewer/page';
import { internalZoomFactorChange, contentChangeEvent, documentChangeEvent, selectionChangeEvent, zoomFactorChangeEvent, beforeFieldFillEvent, afterFieldFillEvent, serviceFailureEvent, viewChangeEvent, customContextMenuSelectEvent, customContextMenuBeforeOpenEvent, internalviewChangeEvent, internalDocumentEditorSettingsChange } from './base/constants';
import { Optimized, Regular, HelperMethods } from './index';
import { ColumnsDialog } from './implementation/dialogs/columns-dialog';
import { ZipArchiveItem, ZipArchive } from '@syncfusion/ej2-compression';
/**
 * The `DocumentEditorSettings` module is used to provide the customize property of Document Editor.
 */
var DocumentEditorSettings = /** @class */ (function (_super) {
    __extends(DocumentEditorSettings, _super);
    function DocumentEditorSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('#FFE97F')
    ], DocumentEditorSettings.prototype, "searchHighlightColor", void 0);
    __decorate([
        Property(['Algerian', 'Arial', 'Calibri', 'Cambria', 'Cambria Math', 'Candara', 'Courier New', 'Georgia', 'Impact', 'Segoe Print', 'Segoe Script', 'Segoe UI', 'Symbol', 'Times New Roman', 'Verdana', 'Wingdings'])
    ], DocumentEditorSettings.prototype, "fontFamilies", void 0);
    __decorate([
        Property({ shadingColor: '#cfcfcf', applyShading: true, selectionColor: '#cccccc', formFillingMode: 'Popup' })
    ], DocumentEditorSettings.prototype, "formFieldSettings", void 0);
    __decorate([
        Property({ interval: 2000, itertationCount: 5 })
    ], DocumentEditorSettings.prototype, "autoResizeSettings", void 0);
    __decorate([
        Property({ roomName: '', editableRegionColor: '#22b24b', lockedRegionColor: '#f44336' })
    ], DocumentEditorSettings.prototype, "collaborativeEditingSettings", void 0);
    __decorate([
        Property(1)
    ], DocumentEditorSettings.prototype, "printDevicePixelRatio", void 0);
    __decorate([
        Property(true)
    ], DocumentEditorSettings.prototype, "enableOptimizedTextMeasuring", void 0);
    __decorate([
        Property(true)
    ], DocumentEditorSettings.prototype, "allowDragAndDrop", void 0);
    __decorate([
        Property(32767)
    ], DocumentEditorSettings.prototype, "maximumRows", void 0);
    __decorate([
        Property(63)
    ], DocumentEditorSettings.prototype, "maximumColumns", void 0);
    __decorate([
        Property(false)
    ], DocumentEditorSettings.prototype, "showHiddenMarks", void 0);
    __decorate([
        Property(false)
    ], DocumentEditorSettings.prototype, "showBookmarks", void 0);
    __decorate([
        Property(true)
    ], DocumentEditorSettings.prototype, "highlightEditableRanges", void 0);
    __decorate([
        Property(true)
    ], DocumentEditorSettings.prototype, "optimizeSfdt", void 0);
    return DocumentEditorSettings;
}(ChildProperty));
export { DocumentEditorSettings };
/**
 * Represents the settings and properties of the document that is opened in Document editor component.
 */
var DocumentSettings = /** @class */ (function (_super) {
    __extends(DocumentSettings, _super);
    function DocumentSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Word2013')
    ], DocumentSettings.prototype, "compatibilityMode", void 0);
    return DocumentSettings;
}(ChildProperty));
export { DocumentSettings };
/**
 * Represents the settings required for resizing the Document editor automatically when the visibility of parent element changed.
 */
var AutoResizeSettings = /** @class */ (function (_super) {
    __extends(AutoResizeSettings, _super);
    function AutoResizeSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(2000)
    ], AutoResizeSettings.prototype, "interval", void 0);
    __decorate([
        Property(5)
    ], AutoResizeSettings.prototype, "iterationCount", void 0);
    return AutoResizeSettings;
}(ChildProperty));
export { AutoResizeSettings };
/**
 * The Document editor component is used to draft, save or print rich text contents as page by page.
 */
var DocumentEditor = /** @class */ (function (_super) {
    __extends(DocumentEditor, _super);
    /**
     * Initializes a new instance of the DocumentEditor class.
     *
     * @param {DocumentEditorModel} options Specifies the document editor model.
     * @param {string | HTMLElement} element Specifies the element.
     */
    function DocumentEditor(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.enableHeaderFooterIn = false;
        /**
         * @private
         */
        _this.isShiftingEnabled = false;
        /**
         * @private
         */
        _this.isLayoutEnabled = true;
        /**
         * @private
         */
        _this.isPastingContent = false;
        /**
         * @private
         */
        _this.parser = undefined;
        _this.disableHistoryIn = false;
        /**
         * @private
         */
        _this.findResultsList = undefined;
        /**
         * @private
         */
        _this.tablePropertiesDialogModule = undefined;
        /**
         * @private
         */
        _this.bordersAndShadingDialogModule = undefined;
        /**
         * @private
         */
        _this.cellOptionsDialogModule = undefined;
        /**
         * @private
         */
        _this.tableOptionsDialogModule = undefined;
        /**
         * @private
         */
        _this.paragraphDialogModule = undefined;
        /**
         * @private
         */
        _this.imageResizerModule = undefined;
        _this.createdTriggered = false;
        /**
         * @private
         */
        _this.defaultLocale = {
            'Table': 'Table',
            'Row': 'Row',
            'Cell': 'Cell',
            'Ok': 'OK',
            'Apply': 'Apply',
            'Cancel': 'Cancel',
            'Size': 'Size',
            'Preferred Width': 'Preferred width',
            'Points': 'Points',
            'Percent': 'Percent',
            'Measure in': 'Measure in',
            'Alignment': 'Alignment',
            'Left': 'Left',
            'Center': 'Center',
            'Right': 'Right',
            'Justify': 'Justify',
            'Indent from left': 'Indent from left',
            'Borders and Shading': 'Borders and Shading',
            'Options': 'Options',
            'Specify height': 'Specify height',
            'At least': 'At least',
            'Exactly': 'Exactly',
            'Row height is': 'Row height is',
            'Allow row to break across pages': 'Allow row to break across pages',
            'Repeat as header row at the top of each page': 'Repeat as header row at the top of each page',
            'Vertical alignment': 'Vertical alignment',
            'Top': 'Top',
            'Bottom': 'Bottom',
            'Default cell margins': 'Default cell margins',
            'Default cell spacing': 'Default cell spacing',
            'Allow spacing between cells': 'Allow spacing between cells',
            'Cell margins': 'Cell margins',
            'Same as the whole table': 'Same as the whole table',
            'Borders': 'Borders',
            'None': 'None',
            'Style': 'Style',
            'Width': 'Width',
            'Height': 'Height',
            'Letter': 'Letter',
            '1, 2, 3, ...': '1, 2, 3, ...',
            'a, b, c, ...': 'a, b, c, ...',
            'A, B, C, ...': 'A, B, C, ...',
            'I, II, III, ...': 'I, II, III, ...',
            'i, ii, iii, ...': 'i, ii, iii, ...',
            'Tabloid': 'Tabloid',
            'Legal': 'Legal',
            'Statement': 'Statement',
            'Executive': 'Executive',
            'A3': 'A3',
            'A4': 'A4',
            'A5': 'A5',
            'B4': 'B4',
            'B5': 'B5',
            'Custom Size': 'Custom size',
            'Different odd and even': 'Different odd and even',
            'Different first page': 'Different first page',
            'From edge': 'From edge',
            'Header': 'Header',
            'Footer': 'Footer',
            'First Page Header': 'First Page Header',
            'First Page Footer': 'First Page Footer',
            'Even Page Header': 'Even Page Header',
            'Even Page Footer': 'Even Page Footer',
            'Odd Page Header': 'Odd Page Header',
            'Odd Page Footer': 'Odd Page Footer',
            'Same as Previous': 'Same as Previous',
            'Section': 'Section',
            'Margin': 'Margins',
            'Paper': 'Paper',
            'Layout': 'Layout',
            'Orientation': 'Orientation',
            'Landscape': 'Landscape',
            'Portrait': 'Portrait',
            'Show page numbers': 'Show page numbers',
            'Right align page numbers': 'Right align page numbers',
            'Nothing': 'Nothing',
            'Tab leader': 'Tab leader',
            'Show levels': 'Show levels',
            'Use hyperlinks instead of page numbers': 'Use hyperlinks instead of page numbers',
            'Build table of contents from': 'Build table of contents from',
            'Styles': 'Styles',
            'Available styles': 'Available styles',
            'TOC level': 'TOC level',
            'Heading': 'Heading',
            'Heading 1': 'Heading 1',
            'Heading 2': 'Heading 2',
            'Heading 3': 'Heading 3',
            'Heading 4': 'Heading 4',
            'Heading 5': 'Heading 5',
            'Heading 6': 'Heading 6',
            'List Paragraph': 'List Paragraph',
            'Normal': 'Normal',
            'Outline levels': 'Outline levels',
            'Table entry fields': 'Table entry fields',
            'Modify': 'Modify',
            'Color': 'Color',
            'Setting': 'Setting',
            'Box': 'Box',
            'All': 'All',
            'Custom': 'Custom',
            'Preview': 'Preview',
            'Shading': 'Shading',
            'Fill': 'Fill',
            'Apply To': 'Apply to',
            'Table Properties': 'Table Properties',
            'Cell Options': 'Cell Options',
            'Table Options': 'Table Options',
            'Insert Table': 'Insert Table',
            'Number of columns': 'Number of columns',
            'Number of rows': 'Number of rows',
            'Text to display': 'Text to display',
            'ScreenTip text': 'ScreenTip text',
            'Address': 'Address',
            'Insert Hyperlink': 'Insert Hyperlink',
            'Edit Hyperlink': 'Edit Hyperlink',
            'Insert': 'Insert',
            'General': 'General',
            'Indentation': 'Indentation',
            'Before text': 'Before text',
            'Special': 'Special',
            'First line': 'First line',
            'Hanging': 'Hanging',
            'After text': 'After text',
            'By': 'By',
            'Before': 'Before',
            'Line Spacing': 'Line spacing',
            'After': 'After',
            'At': 'At',
            'Multiple': 'Multiple',
            'Spacing': 'Spacing',
            'Define new Multilevel list': 'Define new Multilevel list',
            'List level': 'List level',
            'Choose level to modify': 'Choose level to modify',
            'Level': 'Level',
            'Number format': 'Number format',
            'Number style for this level': 'Number style for this level',
            'Enter formatting for number': 'Enter formatting for number',
            'Start at': 'Start at',
            'Restart list after': 'Restart list after',
            'Position': 'Position',
            'Text indent at': 'Text indent at',
            'Aligned at': 'Aligned at',
            'Follow number with': 'Follow number with',
            'Tab character': 'Tab character',
            'Space': 'Space',
            'Arabic': 'Arabic',
            'UpRoman': 'UpRoman',
            'LowRoman': 'LowRoman',
            'UpLetter': 'UpLetter',
            'LowLetter': 'LowLetter',
            'Number': 'Number',
            'Leading zero': 'Leading zero',
            'Bullet': 'Bullet',
            'Ordinal': 'Ordinal',
            'Ordinal Text': 'Ordinal Text',
            'For East': 'For East',
            'No Restart': 'No Restart',
            'Font': 'Font',
            'Font style': 'Font style',
            'Underline style': 'Underline style',
            'Font color': 'Font color',
            'Effects': 'Effects',
            'Strikethrough': 'Strikethrough',
            'Superscript': 'Superscript',
            'Subscript': 'Subscript',
            'Double strikethrough': 'Double strikethrough',
            'Regular': 'Regular',
            'Bold': 'Bold',
            'Italic': 'Italic',
            'Cut': 'Cut',
            'Copy': 'Copy',
            'Paste': 'Paste',
            'Hyperlink': 'Hyperlink',
            'Open Hyperlink': 'Open Hyperlink',
            'Copy Hyperlink': 'Copy Hyperlink',
            'Remove Hyperlink': 'Remove Hyperlink',
            'Paragraph': 'Paragraph',
            'Linked Style': 'Linked(Paragraph and Character)',
            'Character': 'Character',
            'Merge Cells': 'Merge Cells',
            'Insert Above': 'Insert Above',
            'Insert Below': 'Insert Below',
            'Insert Left': 'Insert Left',
            'Insert Right': 'Insert Right',
            'Delete': 'Delete',
            'Delete Table': 'Delete Table',
            'Delete Row': 'Delete Row',
            'Delete Column': 'Delete Column',
            'File Name': 'File Name',
            'Format Type': 'Format Type',
            'Save': 'Save',
            'Navigation': 'Navigation',
            'Results': 'Results',
            'Replace': 'Replace',
            'Replace All': 'Replace All',
            'We replaced all': 'We replaced all',
            'Find': 'Find',
            'No matches': 'No matches',
            'All Done': 'All Done',
            'Result': 'Result',
            'of': 'of',
            'instances': 'instances',
            'with': 'with',
            'Click to follow link': 'Click to follow link',
            'Continue Numbering': 'Continue Numbering',
            'Bookmark name': 'Bookmark name',
            'Close': 'Close',
            'Restart At': 'Restart At',
            'Properties': 'Properties',
            'Name': 'Name',
            'Style type': 'Style type',
            'Style based on': 'Style based on',
            'Style for following paragraph': 'Style for following paragraph',
            'Formatting': 'Formatting',
            'Numbering and Bullets': 'Numbering and Bullets',
            'Numbering': 'Numbering',
            'Update Field': 'Update Field',
            'Edit Field': 'Edit Field',
            'Bookmark': 'Bookmark',
            'Page Setup': 'Page Setup',
            'No bookmarks found': 'No bookmarks found',
            'Number format tooltip information': 'Single-level number format: </br>[PREFIX]%[LEVELNUMBER][SUFFIX]</br>'
                + 'For example, "Chapter %1." will display numbering like</br>Chapter 1. Item</br>Chapter 2. Item</br>…'
                + '</br>Chapter N. Item</br>'
                + '</br>Multilevel number format:</br>[PREFIX]%[LEVELNUMBER][SUFFIX]+[PREFIX]%[LEVELNUMBER][SUFFIX]'
                + '</br>For example, "%1.%2." will display numbering like</br>1.1. Item</br>1.2. Item</br>…</br>1.N. Item',
            'Format': 'Format',
            'Create New Style': 'Create New Style',
            'Modify Style': 'Modify Style',
            'New': 'New',
            'InsertFootnote': 'InsertFootnote',
            'InsertEndnote': 'InsertEndnote',
            'Footnote': 'Footnote',
            'Endnote': 'Endnote',
            'Notes Options': 'Notes Options',
            'Bullets': 'Bullets',
            'Use bookmarks': 'Use bookmarks',
            'Table of Contents': 'Table of Contents',
            'AutoFit': 'AutoFit',
            'AutoFit to Contents': 'AutoFit to Contents',
            'AutoFit to Window': 'AutoFit to Window',
            'Fixed Column Width': 'Fixed Column Width',
            'Reset': 'Reset',
            'Match case': 'Match case',
            'Whole words': 'Whole words',
            'Add': 'Add',
            'Go To': 'Go To',
            'Search for': 'Search for',
            'Replace with': 'Replace with',
            'TOC 1': 'TOC 1',
            'TOC 2': 'TOC 2',
            'TOC 3': 'TOC 3',
            'TOC 4': 'TOC 4',
            'TOC 5': 'TOC 5',
            'TOC 6': 'TOC 6',
            'TOC 7': 'TOC 7',
            'TOC 8': 'TOC 8',
            'TOC 9': 'TOC 9',
            'Right-to-left': 'Right-to-left',
            'Left-to-right': 'Left-to-right',
            'Direction': 'Direction',
            'Table direction': 'Table direction',
            'Indent from right': 'Indent from right',
            /* eslint-disable */
            "Contextual Spacing": "Don't add space between paragraphs of the same style",
            "Password Mismatch": "The password don't match",
            'Restrict Editing': 'Restrict Editing',
            'Formatting restrictions': 'Formatting restrictions',
            'Allow formatting': 'Allow formatting',
            'Editing restrictions': 'Editing restrictions',
            'Read only': 'Read only',
            'Exceptions Optional': 'Exceptions (optional)',
            'Select Part Of Document And User': 'Select parts of the document and choose users who are allowed to freely edit them.',
            'Everyone': 'Everyone',
            'More users': 'More users',
            'Add Users': 'Add Users',
            'Enforcing Protection': 'Yes, Start Enforcing Protection',
            'Start Enforcing Protection': 'Start Enforcing Protection',
            'Enter User': 'Enter User',
            'Users': 'Users',
            'Enter new password': 'Enter new password',
            'Reenter new password to confirm': 'Reenter new password to confirm',
            'Your permissions': 'Your permissions',
            'Protected Document': 'This document is protected from unintentional editing.',
            'FormFieldsOnly': 'You may only fill in forms in this region.',
            'CommentsOnly': 'You may only insert comments into this region.',
            'ReadOnlyProtection': 'You may edit in this region.',
            'Stop Protection': 'Stop Protection',
            'Password': 'Password',
            'Spelling Editor': 'Spelling Editor',
            'Spelling': 'Spelling',
            'Spell Check': 'Spell Check',
            'Underline errors': 'Underline errors',
            'Ignore': 'Ignore',
            'Ignore All': 'Ignore All',
            'Add to Dictionary': 'Add to Dictionary',
            'Change': 'Change',
            'Change All': 'Change All',
            'Suggestions': 'Suggestions',
            'The password is incorrect': 'The password is incorrect',
            'Error in establishing connection with web server': 'Error in establishing connection with web server',
            'Highlight the regions I can edit': 'Highlight the regions I can edit',
            'Show All Regions I Can Edit': 'Show All Regions I Can Edit',
            'Find Next Region I Can Edit': 'Find Next Region I Can Edit',
            'Keep source formatting': 'Keep source formatting',
            'Match destination formatting': 'Match destination formatting',
            'InsertAsRows': 'Insert as New Rows',
            'InsertAsColumns': 'Insert as New Columns',
            'OverwriteCells': 'Overwrite Cells',
            'NestTable': 'Nest Table',
            'Text only': 'Text only',
            'Comments': 'Comments',
            'Type your comment': 'Type your comment',
            'Post': 'Post',
            'Reply': 'Reply',
            'New Comment': 'New Comment',
            'Edit': 'Edit',
            'Resolve': 'Resolve',
            'Reopen': 'Reopen',
            'No comments in this document': 'No comments in this document',
            'more': 'more',
            'Type your comment here': 'Type your comment here',
            'Next Comment': 'Next Comment',
            'Previous Comment': 'Previous Comment',
            'Un-posted comments': 'Un-posted comments',
            'Discard Comment': 'Added comments not posted. If you continue, that comment will be discarded.',
            'No Headings': 'No Heading Found!',
            'Add Headings': 'This document has no headings. Please add headings and try again.',
            'More Options': 'More Options',
            'Click to see this comment': 'Click to see this comment',
            'Form Fields': 'Form Fields',
            'Text Form': 'Text Form',
            'Check Box': 'Check Box',
            'Drop Down Form Field': 'Drop Down Form Field',
            'Dropdown items': 'Drop-down items',
            'Items in dropdown list': 'Items in drop-down list',
            'ADD': 'ADD',
            'REMOVE': 'REMOVE',
            'Field settings': 'Field settings',
            'Tooltip': 'Tooltip',
            'Dropdown enabled': 'Drop-down enabled',
            'Check Box Form Field': 'Check Box Form Field',
            'Check box size': 'Check box size',
            'Auto': 'Auto',
            'Default value': 'Default value',
            'Not checked': 'Not checked',
            'Checked': 'Checked',
            'Check box enabled': 'Check box enabled',
            'Text Form Field': 'Text Form Field',
            'Type': 'Type',
            'Default text': 'Default text',
            'Maximum length': 'Maximum length',
            'Text format': 'Text format',
            'Fillin enabled': 'Fill-in enabled',
            'Default number': 'Default number',
            'Default date': 'Default date',
            'Date format': 'Date format',
            'Merge Track': 'This action wont be marked as change. Do you want to continue?',
            'UnTrack': 'Cannot be tracked !',
            'Accept': 'Accept',
            'Reject': 'Reject',
            'Previous Changes': 'Previous Changes',
            'Next Changes': 'Next Changes',
            'Inserted': 'Inserted',
            'Deleted': 'Deleted',
            'Move From': 'Move From',
            'Move To': 'Move To',
            'Changes': 'Changes',
            'Accept all': 'Accept all',
            'Reject all': 'Reject all',
            'No changes': 'No changes',
            'Accept Changes': 'Accept Changes',
            'Reject Changes': 'Reject Changes',
            'User': 'User',
            'View': 'View',
            'Insertion': 'Insertion',
            'Deletion': 'Deletion',
            'All caps': 'All caps',
            'This region is locked by': 'This region is locked by',
            'Lock': 'Lock',
            'Unlock': 'Unlock',
            'Already locked': 'Selected or part of region is already locked by another user',
            'Click to View/Edit Footnote': 'Click to View/Edit Footnote',
            'Click to View/Edit Endnote': 'Click to View/Edit Endnote',
            'Multiple Comment': 'Please post your comment',
            'No suggestions': 'No suggestions',
            'More Suggestion': 'More Suggestion',
            'Ignore Once': 'Ignore Once',
            'Keep With Next': 'Keep with next',
            'Keep Lines Together': 'Keep lines together',
            'WidowControl': 'Widow/Orphan control',
            'Indents and Spacing': 'Indents and Spacing',
            'Line and Page Breaks': 'Line and Page Breaks',
            'Pagination': 'Pagination',
            'Single': 'Single',
            'DashSmallGap': 'DashSmallGap',
            'DashDot': 'DashDot',
            'Double': 'Double',
            'ThinThickSmallGap': 'ThinThickSmallGap',
            'ThickThinSmallGap': 'ThickThinSmallGap',
            'ThickThinMediumGap': 'ThickThinMediumGap',
            'ThickThinLargeGap': 'ThickThinLargeGap',
            'SingleWavy': 'SingleWavy',
            'DoubleWavy': 'DoubleWavy',
            'Inset': 'Inset',
            'DashLargeGap': 'DashLargeGap',
            'Dot': 'Dot',
            'DashDotDot': 'DashDotDot',
            'Triple': 'Triple',
            'ThinThickThinSmallGap': 'ThinThickThinSmallGap',
            'ThinThickThinMediumGap': 'ThinThickThinMediumGap',
            'ThinThickThinLargeGap': 'ThinThickThinLargeGap',
            'DashDotStroked': 'DashDotStroked',
            'Engrave3D': 'Engrave3D',
            'Thick': 'Thick',
            'Outset': 'Outset',
            'Emboss3D': 'Emboss3D',
            'ThinThickLargeGap': 'ThinThickLargeGap',
            'ThinThickMediumGap': 'ThinThickMediumGap',
            'Number of rows must be between': 'Number of rows must be between',
            'Number of columns must be between': 'Number of columns must be between',
            'and': 'and',
            'Unlimited': 'Unlimited',
            'Regular text': 'Regular text',
            'Date': 'Date',
            'Uppercase': 'Uppercase',
            'Lowercase': 'Lowercase',
            'FirstCapital': 'FirstCapital',
            'TitleCase': 'Titlecase',
            'Filling in forms': 'Filling in forms',
            'px': 'px',
            'Tracked changes': 'Tracked changes',
            'TrackChangesOnly': 'You may edit in this region, but all change will be tracked.',
            'RemovedIgnoreExceptions': 'If you make this change in document protection, Word will ignore all the exceptions in this document.',
            'RemovedIgnore': 'Do you want to remove the ignored exceptions?',
            'Information': 'Information',
            'Yes': 'Yes',
            'No': 'No',
            'Page Break': 'Page Break',
            'Column Break': 'Column Break',
            'Section Break Next Page': 'Section Break (Next Page)',
            'Section Break Continuous': 'Section Break (Continuous)',
            'Unsupported format': 'The file format you have selected isn\'t supported. Please choose valid format.',
            'One': 'One',
            'Two': 'Two',
            'Three': 'Three',
            'Presets': 'Presets',
            'Columns': 'Columns',
            'Split your text into two or more columns': 'Split your text into two or more columns',
            'Line between column': 'Line between column',
            'Width and Spacing': 'Width and Spacing',
            'Equal column width': 'Equal column width',
            'Column': 'Column',
            'Paste Content Dialog': 'Due to browser’s security policy, paste from system clipboard is restricted. Alternatively use the keyboard shortcut',
            'Paste Content CheckBox': 'Don’t show again',
            'BookMarkList': 'List of bookmarks in the document',
            'Discard': 'Discard',
            'The top/bottom margins are too large for the page height in some sections.': 'The top/bottom margins are too large for the page height in some sections.',
            'Column width cannot be less than 36 pt.': 'Column width cannot be less than 36 pt.',
            'Left and right margins.': 'Settings you chose for the left and right margins, column spacing, or pargraph indents are too large for the page width in same secitions.'
        };
        _this.initHelper();
        return _this;
    }
    DocumentEditor_1 = DocumentEditor;
    Object.defineProperty(DocumentEditor.prototype, "enableHeaderAndFooter", {
        /**
         * @private
         * @returns {boolean} Returns true if header and footer is enabled.
         */
        get: function () {
            return this.enableHeaderFooterIn;
        },
        /**
         * @private
         * @param {boolean} value True if enable the header and footer; Otherwise, false.
         */
        set: function (value) {
            this.enableHeaderFooterIn = value;
            if (!value && this.selection && this.selection.isWebLayout) {
                this.selection.isWebLayout = false;
            }
            this.viewer.updateScrollBars();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentEditor.prototype, "pageCount", {
        /**
         * Gets the total number of pages.
         *
         * @returns {number} Returns the page count.
         */
        get: function () {
            if (!this.isDocumentLoaded || isNullOrUndefined(this.viewer) || this.viewer instanceof WebLayoutViewer) {
                return 1;
            }
            return this.documentHelper.pages.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentEditor.prototype, "selection", {
        /**
         * Gets the selection object of the document editor.
         *
         * @default undefined
         * @aspType Selection
         * @returns {Selection} Returns the selection object.
         */
        get: function () {
            return this.selectionModule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentEditor.prototype, "editor", {
        /**
         * Gets the editor object of the document editor.
         *
         * @aspType Editor
         * @returns {Editor} Returns the editor object.
         */
        get: function () {
            return this.editorModule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentEditor.prototype, "editorHistory", {
        /**
         * Gets the editor history object of the document editor.
         *
         * @aspType EditorHistory
         * @returns {EditorHistory} Returns the editor history object.
         */
        get: function () {
            return this.editorHistoryModule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentEditor.prototype, "search", {
        /**
         * Gets the search object of the document editor.
         *
         * @aspType Search
         * @returns { Search } Returns the search object.
         */
        get: function () {
            return this.searchModule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentEditor.prototype, "contextMenu", {
        /**
         * Gets the context menu object of the document editor.
         *
         * @aspType ContextMenu
         * @returns {ContextMenu} Returns the context menu object.
         */
        get: function () {
            return this.contextMenuModule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentEditor.prototype, "spellCheckDialog", {
        /**
         * Gets the spell check dialog object of the document editor.
         *
         * @returns {SpellCheckDialog} Returns the spell check dialog object.
         */
        get: function () {
            return this.spellCheckDialogModule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentEditor.prototype, "spellChecker", {
        /**
         * Gets the spell check object of the document editor.
         *
         * @aspType SpellChecker
         * @returns {SpellChecker} Returns the spell checker object.
         */
        get: function () {
            return this.spellCheckerModule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentEditor.prototype, "containerId", {
        /**
         * @private
         * @returns {string }- Returns the container id.
         */
        get: function () {
            return this.element.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentEditor.prototype, "isDocumentLoaded", {
        /**
         * @private
         * @returns {boolean} - Returns true if document is loaded.
         */
        get: function () {
            return this.isDocumentLoadedIn;
        },
        /**
         * @private
         */
        set: function (value) {
            this.isDocumentLoadedIn = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentEditor.prototype, "revisions", {
        /**
         * Gets the revision collection which contains information about changes made from original document
         *
         * @returns {RevisionCollection} Returns the revision collection object.
         */
        get: function () {
            if (isNullOrUndefined(this.revisionsInternal)) {
                this.revisionsInternal = new RevisionCollection(this);
            }
            return this.revisionsInternal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentEditor.prototype, "enableHistoryMode", {
        /**
         * Determines whether history needs to be enabled or not.
         *
         * @default - false
         * @private
         * @returns {boolean} Returns true if history module is enabled.
         */
        get: function () {
            return this.enableEditorHistory && !isNullOrUndefined(this.editorHistoryModule);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentEditor.prototype, "documentStart", {
        /**
         * Gets the start text position in the document.
         *
         * @default undefined
         * @private
         * @returns {TextPosition} - Returns the document start.
         */
        get: function () {
            if (!isNullOrUndefined(this.selectionModule)) {
                return this.selection.getDocumentStart();
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentEditor.prototype, "documentEnd", {
        /**
         * Gets the end text position in the document.
         *
         * @default undefined
         * @private
         * @returns {TextPosition} - Returns the document end.
         */
        get: function () {
            if (!isNullOrUndefined(this.selectionModule)) {
                return this.selection.getDocumentEnd();
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentEditor.prototype, "isReadOnlyMode", {
        /**
         * @private
         * @returns {TextPosition} - Returns isReadOnlyMode.
         */
        get: function () {
            return this.isReadOnly || isNullOrUndefined(this.editorModule)
                || isNullOrUndefined(this.selectionModule) || !isNullOrUndefined(this.editor) && this.editor.restrictEditing;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentEditor.prototype, "isSpellCheck", {
        /**
         * @private
         * @returns {TextPosition} - Returns isSpellCheck.
         */
        get: function () {
            return this.enableSpellCheck && this.spellChecker.enableSpellCheck;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentEditor.prototype, "enableImageResizerMode", {
        /**
         * Specifies to enable image resizer option
         *
         * @private
         * @returns {boolean} - Returns enableImageResizerMode.
         */
        get: function () {
            return this.enableImageResizer && !isNullOrUndefined(this.imageResizerModule);
        },
        enumerable: true,
        configurable: true
    });
    DocumentEditor.prototype.preRender = function () {
        if (this.documentEditorSettings && this.documentEditorSettings.enableOptimizedTextMeasuring) {
            DocumentEditor_1.Inject(Optimized);
        }
        else {
            DocumentEditor_1.Inject(Regular);
        }
        //pre render section
        this.findResultsList = [];
        if (!isNullOrUndefined(this.element) && this.element.id === '') {
            //Set unique id, if id is empty
            this.element.id = HelperMethods.getUniqueElementId();
        }
        if (this.refreshing) {
            this.initHelper();
        }
    };
    DocumentEditor.prototype.initHelper = function () {
        this.documentHelper = new DocumentHelper(this);
        if (this.layoutType === 'Pages') {
            this.viewer = new PageLayoutViewer(this);
        }
        else {
            this.viewer = new WebLayoutViewer(this);
        }
        this.parser = new SfdtReader(this.documentHelper);
    };
    DocumentEditor.prototype.render = function () {
        if (!isNullOrUndefined(this.element)) {
            var container = this.element;
            container.style.minHeight = '200px';
            container.style.minWidth = '200px';
            if (this.height !== '') {
                this.element.style.height = formatUnit(this.height);
            }
            if (this.width !== '') {
                this.element.style.width = formatUnit(this.width);
            }
        }
        this.textMeasureHelper = (this.optimizedModule) ? this.optimizedModule : this.regularModule;
        if (isNullOrUndefined(this.textMeasureHelper)) {
            this.textMeasureHelper = new Optimized(this.documentHelper);
        }
        this.documentHelper.initializeComponents();
        this.openBlank();
        this.renderComplete();
        this.createdTriggered = true;
    };
    /**
     * Get component name
     *
     * @private
     * @returns {string} - Returns module name.
     */
    DocumentEditor.prototype.getModuleName = function () {
        return 'DocumentEditor';
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @private
     * @param {DocumentEditorModel} model - Specifies the new model.
     * @param {DocumentEditorModel} oldProp - Specifies the old model.
     * @returns {void}
     */
    DocumentEditor.prototype.onPropertyChanged = function (model, oldProp) {
        var _this = this;
        for (var _i = 0, _a = Object.keys(model); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'enableTrackChanges':
                    if (this.documentHelper.isTrackedOnlyMode && !model.enableTrackChanges) {
                        this.enableTrackChanges = true;
                    }
                    break;
                case 'autoResizeOnVisibilityChange':
                    if (model.autoResizeOnVisibilityChange) {
                        this.documentHelper.triggerAutoResizeInterval();
                    }
                    break;
                case 'zoomFactor':
                    if (this.viewer && oldProp.zoomFactor !== model.zoomFactor) {
                        this.documentHelper.zoomFactor = model.zoomFactor;
                    }
                    break;
                case 'layoutType':
                    if (this.selection && this.selection.isWebLayout) {
                        break;
                    }
                    this.viewer.destroy();
                    if (this.layoutType === 'Pages') {
                        this.viewer = new PageLayoutViewer(this);
                    }
                    else {
                        if (this.enableHeaderAndFooter === true) {
                            this.selection.closeHeaderFooter();
                        }
                        this.viewer = new WebLayoutViewer(this);
                    }
                    /* eslint-disable */
                    var paragraph = this.selection.start.paragraph;
                    if (paragraph.containerWidget instanceof FootNoteWidget) {
                        this.selection.clearSelectionHighlightInSelectedWidgets();
                        this.selection.selectContent(this.documentStart, true);
                    }
                    this.editor.layoutWholeDocument(true);
                    setTimeout(function () {
                        _this.fireViewChange();
                    }, 200);
                    break;
                case 'locale':
                    this.localizeDialogs();
                    break;
                case 'isReadOnly':
                    if (!isNullOrUndefined(this.optionsPaneModule) && this.optionsPaneModule.isOptionsPaneShow) {
                        this.optionsPaneModule.showHideOptionsPane(false);
                        this.documentHelper.updateFocus();
                    }
                    if (this.showComments) {
                        this.commentReviewPane.showHidePane(true, 'Comments');
                    }
                    this.commentReviewPane.enableDisableItems();
                    this.trackChangesPane.enableDisableButton(!this.isReadOnly && !this.documentHelper.isDocumentProtected);
                    break;
                case 'currentUser':
                case 'userColor':
                    if (this.selection && this.documentHelper.isDocumentProtected) {
                        this.selection.highlightEditRegion();
                    }
                    this.viewer.updateScrollBars();
                    break;
                case 'pageGap':
                case 'pageOutline':
                    this.viewer.updateScrollBars();
                    break;
                case 'zIndex':
                    if (this.documentHelper.dialog) {
                        this.documentHelper.dialog.zIndex = model.zIndex + 10;
                    }
                    if (this.documentHelper.dialog2) {
                        this.documentHelper.dialog2.zIndex = model.zIndex;
                    }
                    break;
                case 'showComments':
                    if (this.viewer && model.showComments !== oldProp.showComments) {
                        this.documentHelper.showComments(model.showComments);
                    }
                    this.viewer.updateScrollBars();
                    break;
                case 'enableRtl':
                    this.localizeDialogs(model.enableRtl);
                    break;
                case 'enableComment':
                    if (this.viewer && this.showComments) {
                        this.showComments = this.showComments ? this.enableComment : false;
                        this.documentHelper.showComments(model.enableComment);
                    }
                    this.viewer.updateScrollBars();
                    break;
                case 'showRevisions':
                    if (this.isReadOnly || this.documentHelper.isDocumentProtected) {
                        this.documentHelper.showRevisions(false);
                    }
                    else if (this.viewer) {
                        this.documentHelper.showRevisions(model.showRevisions);
                    }
                    this.viewer.updateScrollBars();
                    break;
                case 'documentSettings':
                    if (!isNullOrUndefined(model.documentSettings.compatibilityMode)) {
                        var oldValue = oldProp.documentSettings.compatibilityMode;
                        var newValue = model.documentSettings.compatibilityMode;
                        if ((oldValue == "Word2013" && newValue != "Word2013") || (oldValue != "Word2013" && newValue == "Word2013")) {
                            if (this.documentHelper.compatibilityMode !== newValue) {
                                this.documentHelper.compatibilityMode = newValue;
                                this.editor.layoutWholeDocument(true);
                            }
                        }
                    }
                    this.viewer.updateScrollBars();
                    break;
                case 'documentEditorSettings':
                    if (!isNullOrUndefined(model.documentEditorSettings.enableOptimizedTextMeasuring)) {
                        //Clears previously cached height information.
                        this.documentHelper.heightInfoCollection = {};
                        if (model.documentEditorSettings.enableOptimizedTextMeasuring) {
                            this.textMeasureHelper = this.optimizedModule;
                        }
                        else {
                            this.textMeasureHelper = this.regularModule;
                        }
                        this.viewer.updateScrollBars();
                    }
                    if (!isNullOrUndefined(model.documentEditorSettings.showHiddenMarks) && (model.documentEditorSettings.showHiddenMarks !== oldProp.documentEditorSettings.showHiddenMarks)) {
                        this.viewer.updateScrollBars();
                    }
                    if (!isNullOrUndefined(model.documentEditorSettings.highlightEditableRanges)) {
                        if (this.documentHelper && this.documentHelper.restrictEditingPane) {
                            this.documentHelper.restrictEditingPane.highlightCheckBox.checked = model.documentEditorSettings.highlightEditableRanges;
                        }
                    }
                    break;
                case 'height':
                    this.element.style.height = formatUnit(this.height);
                    this.resize();
                    break;
                case 'width':
                    this.element.style.width = formatUnit(this.width);
                    this.resize();
                    break;
                case 'enableAutoFocus':
                    this.enableAutoFocus = model.enableAutoFocus;
                    break;
            }
        }
    };
    DocumentEditor.prototype.localizeDialogs = function (enableRtl) {
        if (this.locale !== '') {
            var l10n = new L10n('documenteditor', this.defaultLocale);
            l10n.setLocale(this.locale);
            if (!isNullOrUndefined(enableRtl)) {
                this.documentHelper.dialog.enableRtl = enableRtl;
                this.documentHelper.dialog2.enableRtl = enableRtl;
            }
            if (this.optionsPaneModule) {
                this.optionsPaneModule.initOptionsPane(l10n, enableRtl);
            }
            if (this.paragraphDialogModule) {
                this.paragraphDialogModule.initParagraphDialog(l10n);
            }
            if (this.footNotesDialogModule) {
                this.footNotesDialogModule.notesDialog(l10n, enableRtl);
            }
            if (this.pageSetupDialogModule) {
                this.pageSetupDialogModule.initPageSetupDialog(l10n, enableRtl);
            }
            if (this.columnsDialogModule) {
                this.columnsDialogModule.initColumnsDialog(l10n, enableRtl);
            }
            if (this.fontDialogModule) {
                this.fontDialogModule.initFontDialog(l10n, enableRtl);
            }
            if (this.hyperlinkDialogModule) {
                this.hyperlinkDialogModule.initHyperlinkDialog(l10n, enableRtl);
            }
            if (this.contextMenuModule) {
                this.contextMenuModule.contextMenuInstance.destroy();
                this.contextMenuModule.initContextMenu(l10n, enableRtl);
            }
            if (this.listDialogModule) {
                this.listDialogModule.initListDialog(l10n, enableRtl);
            }
            if (this.tablePropertiesDialogModule) {
                this.tablePropertiesDialogModule.initTablePropertyDialog(l10n, enableRtl);
            }
            if (this.bordersAndShadingDialogModule) {
                this.bordersAndShadingDialogModule.initBordersAndShadingsDialog(l10n, enableRtl);
            }
            if (this.cellOptionsDialogModule) {
                this.cellOptionsDialogModule.initCellMarginsDialog(l10n, enableRtl);
            }
            if (this.tableOptionsDialogModule) {
                this.tableOptionsDialogModule.initTableOptionsDialog(l10n, enableRtl);
            }
            if (this.tableDialogModule) {
                this.tableDialogModule.initTableDialog(l10n);
            }
            if (this.styleDialogModule) {
                this.styleDialogModule.initStyleDialog(l10n, enableRtl);
            }
            if (this.tableOfContentsDialogModule) {
                this.tableOfContentsDialogModule.initTableOfContentDialog(l10n, enableRtl);
            }
            if (this.commentReviewPane && this.commentReviewPane.parentPaneElement) {
                if (this.enableRtl) {
                    classList(this.commentReviewPane.parentPaneElement, ['e-rtl'], []);
                }
                else {
                    classList(this.commentReviewPane.parentPaneElement, [], ['e-rtl']);
                }
            }
        }
    };
    /**
     * Sets the default character format for document editor
     *
     * @param {CharacterFormatProperties} characterFormat Specifies the character format.
     * @returns {void}
     */
    DocumentEditor.prototype.setDefaultCharacterFormat = function (characterFormat) {
        this.characterFormat = JSON.parse(HelperMethods.sanitizeString(JSON.stringify(characterFormat)));
        this.documentHelper.setDefaultDocumentFormat();
        if (!isNullOrUndefined(this.selection)) {
            this.selection.retrieveCurrentFormatProperties();
        }
    };
    /**
     * Sets the default paragraph format for document editor
     *
     * @param {ParagraphFormatProperties} paragraphFormat Specifies the paragraph format.
     * @returns {void}
     */
    DocumentEditor.prototype.setDefaultParagraphFormat = function (paragraphFormat) {
        this.paragraphFormat = JSON.parse(HelperMethods.sanitizeString(JSON.stringify(paragraphFormat)));
        this.documentHelper.setDefaultDocumentFormat();
        if (!isNullOrUndefined(this.selection)) {
            this.selection.retrieveCurrentFormatProperties();
        }
    };
    /**
     * Sets the default section format for document editor
     *
     * @param {SectionFormatProperties} sectionFormat Specifies the section format.
     * @returns {void}
     */
    DocumentEditor.prototype.setDefaultSectionFormat = function (sectionFormat) {
        this.sectionFormat = JSON.parse(HelperMethods.sanitizeString(JSON.stringify(sectionFormat)));
        this.documentHelper.setDefaultDocumentFormat();
        if (!isNullOrUndefined(this.selection)) {
            this.selection.retrieveCurrentFormatProperties();
        }
    };
    /**
     * Gets the properties to be maintained in the persisted state.
     *
     * @private
     * @returns {string} - Returns the persisted data.
     */
    DocumentEditor.prototype.getPersistData = function () {
        return 'documenteditor';
    };
    DocumentEditor.prototype.clearPreservedCollectionsInViewer = function () {
        if (this.viewer instanceof LayoutViewer) {
            this.documentHelper.clearDocumentItems();
        }
    };
    /**
     * @private
     * @returns {HTMLElement} - Returns the document editor element.
     */
    DocumentEditor.prototype.getDocumentEditorElement = function () {
        return this.element;
    };
    /**
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.fireContentChange = function () {
        if (this.enableLockAndEdit && this.collaborativeEditingModule) {
            this.collaborativeEditingModule.saveContent();
        }
        var eventArgs = { source: this };
        this.trigger(contentChangeEvent, eventArgs);
    };
    /**
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.fireDocumentChange = function () {
        if (this.enableLockAndEdit && this.enableEditor) {
            this.editor.enforceProtection('', false, true);
        }
        var eventArgs = { source: this };
        this.trigger(documentChangeEvent, eventArgs);
    };
    /**
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.fireSelectionChange = function () {
        if (!this.documentHelper.isCompositionStart && Browser.isDevice && this.editorModule) {
            this.editorModule.predictText();
        }
        var eventArgs = { source: this, isCompleted: this.documentHelper.isCompleted };
        // if (this.createdTriggered) {
        this.trigger(selectionChangeEvent, eventArgs);
        this.documentHelper.isSelectionCompleted = this.documentHelper.isCompleted;
        this.documentHelper.isCompleted = true;
        // }
    };
    /**
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.fireZoomFactorChange = function () {
        var eventArgs = { source: this };
        this.trigger(zoomFactorChangeEvent, eventArgs);
        this.notify(internalZoomFactorChange, eventArgs);
    };
    /**
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.fireBeformFieldFill = function () {
        var eventArgs = {};
        this.trigger(beforeFieldFillEvent, eventArgs);
    };
    /**
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.fireAfterFormFieldFill = function () {
        var eventArgs = {};
        this.trigger(afterFieldFillEvent, eventArgs);
    };
    /**
     * @private
     * @param {ServiceFailureArgs} eventArgs - Specifies the event args.
     * @returns {void}
     */
    DocumentEditor.prototype.fireServiceFailure = function (eventArgs) {
        this.trigger(serviceFailureEvent, eventArgs);
    };
    /**
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.fireViewChange = function () {
        if (this.viewer && this.documentHelper.pages.length > 0) {
            if (this.viewer.visiblePages.length > 0) {
                var pages = this.viewer.visiblePages;
                var eventArgs = {
                    startPage: pages[0].index + 1,
                    endPage: pages[pages.length - 1].index + 1,
                    source: this
                };
                this.trigger(viewChangeEvent, eventArgs);
                this.notify(internalviewChangeEvent, eventArgs);
            }
        }
    };
    /**
     * @private
     * @param {string} item - Specifies the menu items.
     * @returns {void}
     */
    DocumentEditor.prototype.fireCustomContextMenuSelect = function (item) {
        var eventArgs = { id: item };
        this.trigger(customContextMenuSelectEvent, eventArgs);
    };
    /**
     * @private
     * @param {string[]} item - Specifies the menu items.
     * @returns {void}
     */
    DocumentEditor.prototype.fireCustomContextMenuBeforeOpen = function (item) {
        var eventArgs = { ids: item };
        this.trigger(customContextMenuBeforeOpenEvent, eventArgs);
    };
    /**
     * Shows the Paragraph dialog
     *
     * @private
     * @param {WParagraphFormat} paragraphFormat - Specifies the paragraph format.
     * @returns {void}
     */
    DocumentEditor.prototype.showParagraphDialog = function (paragraphFormat) {
        if (this.paragraphDialogModule && !this.isReadOnlyMode && this.viewer) {
            this.paragraphDialogModule.show(paragraphFormat);
        }
    };
    /**
     * Shows the margin dialog
     *
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.showPageSetupDialog = function () {
        if (this.pageSetupDialogModule && !this.isReadOnlyMode && this.viewer) {
            this.pageSetupDialogModule.show();
        }
    };
    /**
     * Shows insert columns dialog
     *
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.showColumnsDialog = function () {
        if (this.columnsDialogModule && !this.isReadOnlyMode && this.viewer) {
            this.columnsDialogModule.show();
        }
    };
    /**
     * Shows the Footnote dialog
     *
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.showFootNotesDialog = function () {
        if (this.footNotesDialogModule && !this.isReadOnlyMode && this.viewer) {
            this.footNotesDialogModule.show();
        }
    };
    /**
     * Shows the font dialog
     *
     * @private
     * @param {WCharacterFormat} characterFormat - Specifies character format.
     * @returns {void}
     */
    DocumentEditor.prototype.showFontDialog = function (characterFormat) {
        if (this.fontDialogModule && !this.isReadOnlyMode && this.viewer) {
            this.fontDialogModule.showFontDialog(characterFormat);
        }
    };
    /**
     * Shows the cell option dialog
     *
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.showCellOptionsDialog = function () {
        if (this.cellOptionsDialogModule && !this.isReadOnlyMode && this.viewer) {
            this.cellOptionsDialogModule.show();
        }
    };
    /**
     * Shows the table options dialog.
     *
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.showTableOptionsDialog = function () {
        if (this.tableOptionsDialogModule && !this.isReadOnlyMode && this.viewer) {
            this.tableOptionsDialogModule.show();
        }
    };
    /**
     * Shows insert table dialog
     *
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.showTableDialog = function () {
        if (this.tableDialogModule && !this.isReadOnlyMode && this.viewer) {
            this.tableDialogModule.show();
        }
    };
    /**
     * Shows the table of content dialog
     *
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.showTableOfContentsDialog = function () {
        if (this.tableOfContentsDialogModule && !this.isReadOnlyMode && this.viewer) {
            this.tableOfContentsDialogModule.show();
        }
    };
    /**
     * Shows the style dialog
     *
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.showStyleDialog = function () {
        if (this.styleDialogModule && !this.isReadOnlyMode && this.viewer) {
            this.styleDialogModule.show();
        }
    };
    /**
     * Shows the hyperlink dialog
     *
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.showHyperlinkDialog = function () {
        if (this.hyperlinkDialogModule && !this.isReadOnlyMode && this.viewer) {
            this.hyperlinkDialogModule.show();
        }
    };
    /**
     * Shows the bookmark dialog.
     *
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.showBookmarkDialog = function () {
        if (this.bookmarkDialogModule && !this.isReadOnlyMode && this.viewer) {
            this.bookmarkDialogModule.show();
        }
    };
    /**
     * Shows the styles dialog.
     *
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.showStylesDialog = function () {
        if (this.stylesDialogModule && !this.isReadOnlyMode && this.viewer) {
            this.stylesDialogModule.show();
        }
    };
    /**
     * Shows the List dialog
     *
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.showListDialog = function () {
        if (this.listDialogModule && !this.isReadOnlyMode && this.viewer) {
            this.listDialogModule.showListDialog();
        }
    };
    /**
     * Shows the table properties dialog
     *
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.showTablePropertiesDialog = function () {
        if (this.tablePropertiesDialogModule && !this.isReadOnlyMode && this.viewer) {
            this.tablePropertiesDialogModule.show();
        }
    };
    /**
     * Shows the borders and shading dialog
     *
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.showBordersAndShadingDialog = function () {
        if (this.bordersAndShadingDialogModule && !this.isReadOnlyMode && this.viewer) {
            this.bordersAndShadingDialogModule.show();
        }
    };
    /* eslint-disable  */
    DocumentEditor.prototype.requiredModules = function () {
        var modules = [];
        if (this.enableLockAndEdit) {
            modules.push({
                member: 'CollaborativeEditing', args: [this]
            });
        }
        if (this.enablePrint) {
            modules.push({
                member: 'Print', args: []
            });
        }
        if (this.enableSfdtExport || this.enableWordExport || this.enableTextExport || this.enableSelection || this.enableEditor) {
            modules.push({
                member: 'SfdtExport', args: [this.documentHelper]
            });
        }
        if (this.enableWordExport) {
            modules.push({
                member: 'WordExport', args: []
            });
        }
        if (this.enableTextExport) {
            modules.push({
                member: 'TextExport', args: []
            });
        }
        if (this.enableSelection || this.enableSearch || this.enableEditor) {
            modules.push({
                member: 'Selection', args: [this]
            });
            if (this.enableContextMenu) {
                modules.push({
                    member: 'ContextMenu', args: [this.documentHelper]
                });
            }
        }
        if (this.enableSearch) {
            modules.push({
                member: 'Search', args: [this]
            });
            if (this.enableOptionsPane) {
                modules.push({
                    member: 'OptionsPane', args: [this.documentHelper]
                });
            }
        }
        if (this.documentEditorSettings && this.documentEditorSettings.enableOptimizedTextMeasuring) {
            DocumentEditor_1.Inject(Optimized);
            modules.push({ member: 'Optimized', args: [this.documentHelper] });
        }
        else {
            DocumentEditor_1.Inject(Regular);
            modules.push({ member: 'Regular', args: [this.documentHelper] });
        }
        if (this.enableEditor) {
            modules.push({
                member: 'Editor', args: [this.documentHelper]
            });
            if (this.enableImageResizer) {
                modules.push({
                    member: 'ImageResizer', args: [this, this.documentHelper]
                });
            }
            if (this.enableEditorHistory) {
                modules.push({
                    member: 'EditorHistory', args: [this]
                });
            }
            if (this.enableHyperlinkDialog) {
                modules.push({
                    member: 'HyperlinkDialog', args: [this.documentHelper]
                });
            }
            if (this.enableTableDialog) {
                modules.push({
                    member: 'TableDialog', args: [this.documentHelper]
                });
            }
            if (this.enableBookmarkDialog) {
                modules.push({
                    member: 'BookmarkDialog', args: [this.documentHelper]
                });
            }
            if (this.enableTableOfContentsDialog) {
                modules.push({
                    member: 'TableOfContentsDialog', args: [this.documentHelper]
                });
            }
            if (this.enablePageSetupDialog) {
                modules.push({
                    member: 'PageSetupDialog', args: [this.documentHelper]
                });
            }
            if (this.enableColumnsDialog) {
                modules.push({
                    member: 'ColumnsDialog', args: [this.documentHelper]
                });
            }
            if (this.enableFootnoteAndEndnoteDialog) {
                modules.push({
                    member: 'FootNotesDialog', args: [this.documentHelper]
                });
            }
            if (this.enableStyleDialog) {
                modules.push({
                    member: 'StylesDialog', args: [this.documentHelper]
                });
                modules.push({
                    member: 'StyleDialog', args: [this.documentHelper]
                });
                modules.push({
                    member: 'BulletsAndNumberingDialog', args: [this.documentHelper]
                });
            }
            if (this.enableListDialog) {
                modules.push({
                    member: 'ListDialog', args: [this.documentHelper]
                });
            }
            if (this.enableParagraphDialog) {
                modules.push({
                    member: 'ParagraphDialog', args: [this.documentHelper]
                });
            }
            if (this.enableFontDialog) {
                modules.push({
                    member: 'FontDialog', args: [this.documentHelper]
                });
            }
            if (this.enableTablePropertiesDialog) {
                modules.push({
                    member: 'TablePropertiesDialog', args: [this.documentHelper]
                });
                modules.push({
                    member: 'CellOptionsDialog', args: [this.documentHelper]
                });
            }
            if (this.enableBordersAndShadingDialog) {
                modules.push({
                    member: 'BordersAndShadingDialog', args: [this.documentHelper]
                });
            }
            if (this.enableTableOptionsDialog) {
                modules.push({
                    member: 'TableOptionsDialog', args: [this.documentHelper]
                });
            }
            if (this.enableSpellCheck) {
                modules.push({
                    member: 'SpellChecker', args: [this.documentHelper]
                });
                modules.push({
                    member: 'SpellCheckDialog', args: [this.documentHelper]
                });
            }
            if (this.enableFormField) {
                modules.push({
                    member: 'TextFormFieldDialog', args: [this]
                });
                modules.push({
                    member: 'DropDownFormFieldDialog', args: [this]
                });
                modules.push({
                    member: 'CheckBoxFormFieldDialog', args: [this]
                });
            }
        }
        return modules;
    };
    /* eslint-enable */
    // Public Implementation Starts
    /**
     * Opens the given Sfdt text.
     *
     * @param {string} sfdtText Specifies the sfdt text.
     * @returns {void}
     */
    DocumentEditor.prototype.open = function (sfdtText) {
        sfdtText = HelperMethods.sanitizeString(sfdtText);
        if (!isNullOrUndefined(this.viewer)) {
            this.clearPreservedCollectionsInViewer();
            this.documentHelper.userCollection.push('Everyone');
            this.documentHelper.lists = [];
            this.documentHelper.abstractLists = [];
            this.documentHelper.styles = new WStyles();
            this.documentHelper.cachedPages = [];
            this.clearSpellCheck();
            if (this.isSpellCheck) {
                if (this.isSpellCheck && !this.spellChecker.enableOptimizedSpellCheck) {
                    this.documentHelper.triggerElementsOnLoading = true;
                    this.documentHelper.triggerSpellCheck = true;
                }
            }
            if (!isNullOrUndefined(sfdtText) && this.viewer) {
                this.documentHelper.setDefaultDocumentFormat();
                this.documentHelper.onDocumentChanged(this.parser.convertJsonToDocument(sfdtText));
                if (this.editorModule) {
                    this.editorModule.intializeDefaultStyles();
                }
            }
            if (this.isSpellCheck) {
                if (this.isSpellCheck && !this.spellChecker.enableOptimizedSpellCheck) {
                    this.documentHelper.triggerElementsOnLoading = false;
                    this.documentHelper.triggerSpellCheck = false;
                }
            }
        }
    };
    /**
     * Scrolls view to start of the given page number if exists.
     *
     * @param {number} pageNumber Specifies the page number.
     * @returns {void}
     */
    DocumentEditor.prototype.scrollToPage = function (pageNumber) {
        if (isNullOrUndefined(this.viewer) || pageNumber < 1 || pageNumber > this.documentHelper.pages.length) {
            return false;
        }
        this.viewer.scrollToPage(pageNumber - 1);
        return true;
    };
    /**
     * Enables all the modules.
     *
     * @returns {void}
     */
    DocumentEditor.prototype.enableAllModules = function () {
        this.enablePrint = this.enableSfdtExport = this.enableWordExport = this.enableTextExport
            = this.enableSelection = this.enableContextMenu = this.enableSearch = this.enableOptionsPane
                = this.enableEditor = this.enableImageResizer = this.enableEditorHistory
                    = this.enableHyperlinkDialog = this.enableTableDialog = this.enableBookmarkDialog
                        = this.enableTableOfContentsDialog = this.enableFootnoteAndEndnoteDialog
                            = this.enablePageSetupDialog = this.enableStyleDialog
                                = this.enableListDialog = this.enableParagraphDialog = this.enableFontDialog
                                    = this.enableTablePropertiesDialog = this.enableBordersAndShadingDialog
                                        = this.enableTableOptionsDialog = this.enableSpellCheck = this.enableComment
                                            = this.enableFormField = this.enableColumnsDialog = true;
        /* eslint-disable-next-line max-len */
        DocumentEditor_1.Inject(Print, SfdtExport, WordExport, TextExport, Selection, Search, Editor, ImageResizer, EditorHistory, ContextMenu, OptionsPane, HyperlinkDialog, TableDialog, NotesDialog, BookmarkDialog, TableOfContentsDialog, PageSetupDialog, StyleDialog, ListDialog, ParagraphDialog, BulletsAndNumberingDialog, FontDialog, TablePropertiesDialog, BordersAndShadingDialog, TableOptionsDialog, CellOptionsDialog, StylesDialog, SpellChecker, SpellCheckDialog, CheckBoxFormFieldDialog, TextFormFieldDialog, DropDownFormFieldDialog, ColumnsDialog);
    };
    /**
     * Resizes the component and its sub elements based on given size or container size.
     *
     * @param {number} width Specifies the width
     * @param {number} height Specifies the hight
     * @returns {void}
     */
    DocumentEditor.prototype.resize = function (width, height) {
        if (this.element) {
            if (!isNullOrUndefined(width) && width > 200) {
                this.element.style.width = width + 'px';
            }
            if (!isNullOrUndefined(height) && height > 200) {
                this.element.style.height = height + 'px';
            }
            if (this.viewer) {
                this.documentHelper.updateViewerSize();
            }
            if (this.trackChangesPane.toolbar) {
                this.trackChangesPane.toolbar.refreshOverflow();
            }
        }
    };
    /**
     * Gets all the form field names in current document.
     *
     * @returns {string[]} Returns all the form field names in current document.
     */
    DocumentEditor.prototype.getFormFieldNames = function () {
        var formFieldNames = [];
        var formFields = this.documentHelper.formFields;
        for (var i = 0; i < formFields.length; i++) {
            if (formFields[parseInt(i.toString(), 10)].formFieldData.name !== '') {
                formFieldNames.push(formFields[parseInt(i.toString(), 10)].formFieldData.name);
            }
        }
        return formFieldNames;
    };
    /**
     * Gets the form field by name
     *
     * @param {string} name - The form field name.
     * @returns {TextFormFieldInfo | CheckBoxFormFieldInfo | DropDownFormFieldInfo} Returns the form field info.
     */
    DocumentEditor.prototype.getFormFieldInfo = function (name) {
        name = HelperMethods.sanitizeString(name);
        var formFields = this.documentHelper.formFields;
        for (var i = 0; i < formFields.length; i++) {
            if ((formFields[parseInt(i.toString(), 10)].formFieldData.name === name) && (formFields[parseInt(i.toString(), 10)].formFieldData.name !== '')) {
                return formFields[parseInt(i.toString(), 10)].formFieldData.getFormFieldInfo();
            }
        }
        return undefined;
    };
    /**
     * Sets the form field info with the specified name.
     *
     * @param {string} name Specifies the form field name
     * @param {TextFormFieldInfo | CheckBoxFormFieldInfo | DropDownFormFieldInfo} formFieldInfo - Form Field info.
     * @returns {void}
     */
    DocumentEditor.prototype.setFormFieldInfo = function (name, formFieldInfo) {
        name = HelperMethods.sanitizeString(name);
        var formFields = this.documentHelper.formFields;
        for (var i = 0; i < formFields.length; i++) {
            if ((formFields[parseInt(i.toString(), 10)].formFieldData.name === name) && (formFields[parseInt(i.toString(), 10)].formFieldData.name !== '')) {
                var currentField = formFields[parseInt(i.toString(), 10)];
                if (this.selection) {
                    this.selection.selectFieldInternal(currentField);
                    if (this.editor) {
                        this.editor.setFormField(currentField, formFieldInfo);
                    }
                }
                return;
            }
        }
    };
    /**
     * Resets the form field value to default with the specified form field name.
     *
     * @param {string} name Specifies the form field name
     * @returns {void}
     */
    DocumentEditor.prototype.resetFormFields = function (name) {
        if (!isNullOrUndefined(name)) {
            name = HelperMethods.sanitizeString(name);
        }
        var formFields = this.documentHelper.formFields;
        for (var i = 0; i < formFields.length; i++) {
            if (isNullOrUndefined(name) || name === formFields[parseInt(i.toString(), 10)].formFieldData.name) {
                if (formFields[parseInt(i.toString(), 10)].formFieldData instanceof TextFormField) {
                    this.editor.updateFormField(formFields[parseInt(i.toString(), 10)], formFields[parseInt(i.toString(), 10)].formFieldData.defaultValue, true);
                }
                else if (formFields[parseInt(i.toString(), 10)].formFieldData instanceof CheckBoxFormField) {
                    /* eslint-disable-next-line max-len */
                    this.editor.toggleCheckBoxFormField(formFields[parseInt(i.toString(), 10)], true, formFields[parseInt(i.toString(), 10)].formFieldData.defaultValue);
                }
                else if (formFields[parseInt(i.toString(), 10)].formFieldData instanceof DropDownFormField) {
                    this.editor.updateFormField(formFields[parseInt(i.toString(), 10)], 0, true);
                }
            }
        }
    };
    /**
     * Imports the form field values.
     *
     * @param {FormFieldData[]} formData Specifies the form field values.
     * @returns {void}
     */
    DocumentEditor.prototype.importFormData = function (formData) {
        var formField = this.documentHelper.formFields;
        for (var i = 0; i < formData.length; i++) {
            var formFieldData = formData[parseInt(i.toString(), 10)];
            var fieldName = formFieldData.fieldName;
            for (var j = 0; j < formField.length; j++) {
                if (formField[parseInt(j.toString(), 10)].formFieldData.name === fieldName) {
                    if (formField[parseInt(j.toString(), 10)].formFieldData instanceof CheckBoxFormField) {
                        this.editor.toggleCheckBoxFormField(formField[parseInt(j.toString(), 10)], true, formFieldData.value);
                    }
                    else if (formField[parseInt(j.toString(), 10)].formFieldData instanceof TextFormField) {
                        this.editor.updateFormField(formField[parseInt(j.toString(), 10)], formFieldData.value);
                    }
                    else if (formField[parseInt(j.toString(), 10)].formFieldData instanceof DropDownFormField) {
                        this.editor.updateFormField(formField[parseInt(j.toString(), 10)], formFieldData.value);
                    }
                }
            }
        }
    };
    /**
     * Exports the form field values.
     *
     * @returns {FormFieldData[]} Returns the form field data.
     */
    DocumentEditor.prototype.exportFormData = function () {
        var data = [];
        var formField = this.documentHelper.formFields;
        for (var i = 0; i < formField.length; i++) {
            if (formField[parseInt(i.toString(), 10)].formFieldData.name !== '') {
                var formData = { fieldName: '', value: '' };
                formData.fieldName = formField[parseInt(i.toString(), 10)].formFieldData.name;
                if (formField[parseInt(i.toString(), 10)].formFieldData instanceof CheckBoxFormField) {
                    formData.value = formField[parseInt(i.toString(), 10)].formFieldData.checked;
                }
                else if (formField[parseInt(i.toString(), 10)].formFieldData instanceof TextFormField) {
                    var resultText = '';
                    if (this.documentHelper.isInlineFormFillProtectedMode) {
                        resultText = this.editorModule.getFieldResultText(formField[parseInt(i.toString(), 10)]);
                    }
                    else {
                        resultText = formField[parseInt(i.toString(), 10)].resultText;
                    }
                    var rex = RegExp(this.documentHelper.textHelper.getEnSpaceCharacter(), 'gi');
                    if (resultText.replace(rex, '') === '') {
                        resultText = '';
                    }
                    formData.value = resultText;
                }
                else if (formField[parseInt(i.toString(), 10)].formFieldData instanceof DropDownFormField) {
                    formData.value = formField[parseInt(i.toString(), 10)].formFieldData.selectedIndex;
                }
                data.push(formData);
            }
        }
        return data;
    };
    /**
     * Updates the fields in the current document.
     * Currently cross reference field only supported.
     *
     * @returns {void}
     */
    DocumentEditor.prototype.updateFields = function () {
        for (var i = 0; i < this.documentHelper.fields.length; i++) {
            var field = this.documentHelper.fields[parseInt(i.toString(), 10)];
            var code = this.selection.getFieldCode(field);
            if (code.toLowerCase().trim().indexOf('ref ') === 0) {
                this.selection.updateRefField(field);
            }
        }
    };
    /**
     * Shifts the focus to the document.
     *
     * @returns {void}
     */
    DocumentEditor.prototype.focusIn = function () {
        if (this.viewer) {
            this.documentHelper.updateFocus();
        }
    };
    /**
     * Fits the page based on given fit type.
     *
     * @param {PageFitType} pageFitType - The default value of ‘pageFitType’ parameter is 'None'
     * @returns {void}
     */
    DocumentEditor.prototype.fitPage = function (pageFitType) {
        if (isNullOrUndefined(pageFitType)) {
            pageFitType = 'None';
        }
        if (this.viewer) {
            this.viewer.pageFitType = pageFitType;
        }
    };
    /**
     * Exports the specified page as image.
     *
     * @param {number} pageNumber Specifies the page number starts from index `1`.
     * @param {number} format Specifies the image format.
     * @returns {HTMLImageElement} Returns the html image element.
     */
    DocumentEditor.prototype.exportAsImage = function (pageNumber, format) {
        if (isNullOrUndefined(this.viewer)) {
            throw new Error('Invalid operation.');
        }
        if (this.printModule) {
            var mimeType = format === 'Png' ? 'image/png' : 'image/jpeg';
            return this.printModule.exportAsImage(this.documentHelper, pageNumber, mimeType);
        }
        return undefined;
    };
    /**
     * Exports the specified page as content.
     *
     * @param {number} pageNumber Specifies the page number starts from index `1`.
     * @private
     * @returns {string} Returns the page as content.
     */
    DocumentEditor.prototype.exportAsPath = function (pageNumber) {
        if (!isNullOrUndefined(pageNumber) && pageNumber <= this.documentHelper.pages.length && pageNumber >= 1) {
            var printPage = this.documentHelper.pages[(pageNumber - 1)];
            this.documentHelper.render.isExporting = true;
            this.documentHelper.render.renderWidgets(printPage, 0, 0, 0, 0);
            //get the image data from the canvas
            var imageData = this.documentHelper.render.pageCanvas.toDataURL();
            this.documentHelper.render.pageCanvas.getContext("2d").renderedPath = "";
            this.documentHelper.render.isExporting = false;
            return imageData;
        }
        return undefined;
    };
    /**
     * Prints the document.
     *
     * @param {Window} printWindow - Default value of 'printWindow' parameter is undefined.
     * @returns {void}
     */
    DocumentEditor.prototype.print = function (printWindow) {
        if (isNullOrUndefined(this.viewer)) {
            throw new Error('Invalid operation.');
        }
        if (this.printModule) {
            if (this.layoutType === 'Continuous') {
                this.documentHelper.isWebPrinting = true;
                this.viewer = new PageLayoutViewer(this);
                this.editor.layoutWholeDocument();
                this.printModule.print(this.documentHelper, printWindow);
                this.viewer = new WebLayoutViewer(this);
                this.editor.layoutWholeDocument();
                this.documentHelper.isWebPrinting = false;
            }
            else {
                this.printModule.print(this.documentHelper, printWindow);
            }
        }
        else {
            throw new Error('Invalid operation. Print is not enabled.');
        }
    };
    /**
     * Serializes the data to JSON string.
     *
     * @returns {string} Returns the data as JSON string.
     */
    DocumentEditor.prototype.serialize = function () {
        var json = '';
        if (this.enableSfdtExport && this.sfdtExportModule instanceof SfdtExport) {
            json = this.sfdtExportModule.serialize();
        }
        else {
            throw new Error('Invalid operation. Sfdt export is not enabled.');
        }
        return json;
    };
    /**
     * Saves the document.
     *
     * @param {string} fileName Specifies the file name.
     * @param {FormatType} formatType Specifies the format type.
     * @returns {void}
     */
    DocumentEditor.prototype.save = function (fileName, formatType) {
        var _this = this;
        if (!isNullOrUndefined(fileName)) {
            fileName = HelperMethods.sanitizeString(fileName);
        }
        fileName = fileName || 'Untitled';
        if (isNullOrUndefined(this.documentHelper)) {
            throw new Error('Invalid operation.');
        }
        if (formatType === 'Docx' && this.wordExportModule) {
            if (this.wordExportModule) {
                this.wordExportModule.save(this.documentHelper, fileName);
            }
        }
        else if (formatType === 'Txt' && this.textExportModule) {
            this.textExportModule.save(this.documentHelper, fileName);
        }
        else if (formatType === 'Sfdt' && this.enableSfdtExport && this.sfdtExportModule) {
            if (this.documentEditorSettings.optimizeSfdt) {
                var jsonString = this.serialize();
                var blob = new Blob([jsonString], {
                    type: 'application/json'
                });
                var archiveItem = new ZipArchiveItem(blob, "sfdt");
                var mArchive = new ZipArchive();
                mArchive.addItem(archiveItem);
                mArchive.saveAsBlob().then(function (blob) {
                    _this.zipArchiveBlobToSfdtFile(blob, fileName);
                });
            }
            else {
                var jsonString = this.serialize();
                var blob = new Blob([jsonString], {
                    type: 'application/json'
                });
                Save.save(fileName + '.sfdt', blob);
            }
        }
        else {
            throw new Error('Invalid operation. Specified export is not enabled.');
        }
    };
    DocumentEditor.prototype.zipArchiveBlobToSfdtFile = function (blob, fileName) {
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = function () {
            var dataUrl = reader.result;
            var base64 = dataUrl.split(',')[1];
            var jsonString = {};
            jsonString.sfdt = base64;
            var blob = new Blob([JSON.stringify(jsonString)], {
                type: 'application/json'
            });
            Save.save(fileName + '.sfdt', blob);
        };
    };
    ;
    /**
     * Saves the document as blob.
     *
     * @param {FormatType} formatType Specifies the format type.
     * @returns {Promise<Blob>} Returns the document as blob.
     */
    DocumentEditor.prototype.saveAsBlob = function (formatType) {
        var _this = this;
        if (isNullOrUndefined(this.viewer)) {
            throw new Error('Invalid operation');
        }
        return new Promise(function (resolve) {
            if (formatType === 'Docx' && _this.wordExportModule) {
                resolve(_this.wordExportModule.saveAsBlob(_this.documentHelper));
            }
            else if (formatType === 'Txt' && _this.textExportModule) {
                resolve(_this.textExportModule.saveAsBlob(_this.documentHelper));
            }
            else if (formatType === 'Sfdt' && _this.enableSfdtExport && _this.sfdtExportModule) {
                if (_this.documentEditorSettings.optimizeSfdt) {
                    _this.sfdtExportModule.saveAsBlob(_this.documentHelper).then(function (blob) {
                        _this.getBase64StringFromBlob(blob).then(function (base64) {
                            var jsonString = {};
                            jsonString.sfdt = base64;
                            var blob = new Blob([JSON.stringify(jsonString)], {
                                type: 'application/json'
                            });
                            resolve(blob);
                        });
                    });
                }
                else {
                    resolve(_this.sfdtExportModule.saveAsBlobNonOptimized(_this.documentHelper));
                }
            }
        });
    };
    DocumentEditor.prototype.getBase64StringFromBlob = function (blob) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = function () {
                var dataUrl = reader.result;
                var base64 = dataUrl.split(',')[1];
                resolve(base64);
            };
        });
    };
    /**
     * Opens a blank document.
     *
     * @returns {void}
     */
    DocumentEditor.prototype.openBlank = function () {
        var sections = [];
        sections.push(this.createNewBodyWidget());
        /* eslint-disable-next-line max-len */
        var hfs = this.parser.parseHeaderFooter({ header: {}, footer: {}, evenHeader: {}, evenFooter: {}, firstPageHeader: {}, firstPageFooter: {} }, undefined);
        if (this.viewer) {
            this.clearPreservedCollectionsInViewer();
            this.documentHelper.userCollection.push('Everyone');
            this.documentHelper.cachedPages = [];
            this.clearSpellCheck();
            this.documentHelper.setDefaultDocumentFormat();
            this.documentHelper.headersFooters.push(hfs);
            if (this.editorModule) {
                this.editorModule.intializeDefaultStyles();
                var style = this.documentHelper.styles.findByName('Normal');
                for (var i = 0; i < sections.length; i++) {
                    var paragraph = sections[parseInt(i.toString(), 10)].childWidgets[0];
                    paragraph.paragraphFormat.baseStyle = style;
                    paragraph.paragraphFormat.listFormat.baseStyle = style;
                }
            }
            this.documentHelper.onDocumentChanged(sections);
        }
    };
    /**
     * Gets the style names based on given style type.
     *
     * @param {StyleType} styleType Specifies the style type.
     * @returns {string[]} Returns the style names.
     */
    DocumentEditor.prototype.getStyleNames = function (styleType) {
        if (this.viewer) {
            return this.documentHelper.styles.getStyleNames(styleType);
        }
        return [];
    };
    /**
     * Gets the style objects on given style type.
     *
     * @param {StyleType} styleType Specifies the style type.
     * @returns {Object[]} Returns the Specifies styles.
     */
    DocumentEditor.prototype.getStyles = function (styleType) {
        if (this.viewer) {
            return this.documentHelper.styles.getStyles(styleType);
        }
        return [];
    };
    /* eslint-enable */
    /**
     * Gets the bookmarks.
     *
     * @returns {string[]} Returns the bookmark collection.
     */
    DocumentEditor.prototype.getBookmarks = function () {
        var bookmarks = [];
        if (this.viewer) {
            bookmarks = this.documentHelper.getBookmarks(true);
        }
        return bookmarks;
    };
    /**
     * Shows the dialog.
     *
     * @param {DialogType} dialogType Specifies the dialog type.
     * @returns {void}
     */
    DocumentEditor.prototype.showDialog = function (dialogType) {
        switch (dialogType) {
            case 'Hyperlink':
                this.showHyperlinkDialog();
                break;
            case 'Table':
                this.showTableDialog();
                break;
            case 'Bookmark':
                this.showBookmarkDialog();
                break;
            case 'TableOfContents':
                this.showTableOfContentsDialog();
                break;
            case 'PageSetup':
                this.showPageSetupDialog();
                break;
            case 'Columns':
                this.showColumnsDialog();
                break;
            case 'List':
                this.showListDialog();
                break;
            case 'Styles':
                this.showStylesDialog();
                break;
            case 'Style':
                this.showStyleDialog();
                break;
            case 'Paragraph':
                this.showParagraphDialog();
                break;
            case 'Font':
                this.showFontDialog();
                break;
            case 'TableProperties':
                this.showTablePropertiesDialog();
                break;
            case 'BordersAndShading':
                this.showBordersAndShadingDialog();
                break;
            case 'TableOptions':
                this.showTableOptionsDialog();
                break;
            case 'SpellCheck':
                this.showSpellCheckDialog();
                break;
        }
    };
    /**
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.toggleShowHiddenMarksInternal = function () {
        this.documentEditorSettings.showHiddenMarks = !this.documentEditorSettings.showHiddenMarks;
        this.notify(internalDocumentEditorSettingsChange, this.documentEditorSettings);
    };
    /**
     * Shows the options pane.
     *
     * @returns {void}
     */
    DocumentEditor.prototype.showOptionsPane = function () {
        if (!isNullOrUndefined(this.optionsPaneModule) && !isNullOrUndefined(this.viewer)) {
            this.optionsPaneModule.showHideOptionsPane(true);
        }
    };
    /**
     * Shows the restrict editing pane.
     *
     * @param {boolean} show Specifies to show or hide restrict editing pane.
     * @returns {void}
     */
    DocumentEditor.prototype.showRestrictEditingPane = function (show) {
        show = isNullOrUndefined(show) ? true : show;
        if (this.documentHelper && this.documentHelper.restrictEditingPane) {
            this.documentHelper.restrictEditingPane.showHideRestrictPane(show);
        }
    };
    /**
     * Shows the spell check dialog.
     *
     * @private
     * @returns {void}
     */
    DocumentEditor.prototype.showSpellCheckDialog = function () {
        if (this.spellCheckDialogModule && this.spellChecker) {
            var element = this.spellChecker.retriveText();
            if (!isNullOrUndefined(element)) {
                this.spellCheckDialogModule.show(element.text, element.element);
            }
        }
    };
    /**
     * Destroys all managed resources used by this object.
     *
     * @returns {void}
     */
    DocumentEditor.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.destroyDependentModules();
        if (!isNullOrUndefined(this.documentHelper)) {
            this.documentHelper.destroy();
        }
        if (this.viewer) {
            this.viewer.componentDestroy();
        }
        this.viewer = undefined;
        if (!isNullOrUndefined(this.element)) {
            this.element.classList.remove('e-documenteditor');
            this.element.innerHTML = '';
        }
        if (!this.refreshing) {
            this.element = undefined;
        }
        if (this.parser) {
            this.parser.destroy();
            this.parser = undefined;
        }
        if (this.revisionsInternal) {
            this.revisionsInternal.destroy();
            this.revisionsInternal = undefined;
        }
        this.findResultsList = [];
        this.findResultsList = undefined;
        this.documentHelper = undefined;
    };
    DocumentEditor.prototype.createNewBodyWidget = function () {
        var section = new BodyWidget();
        section.index = 0;
        section.sectionFormat = new WSectionFormat(section);
        if (this.sectionFormat) {
            this.parser.parseSectionFormat(0, this.sectionFormat, section.sectionFormat);
        }
        var paragraph = new ParagraphWidget();
        paragraph.index = 0;
        paragraph.paragraphFormat = new WParagraphFormat(paragraph);
        paragraph.characterFormat = new WCharacterFormat(paragraph);
        section.childWidgets.push(paragraph);
        paragraph.containerWidget = section;
        return section;
    };
    DocumentEditor.prototype.clearSpellCheck = function () {
        if (!isNullOrUndefined(this.spellChecker)) {
            if (!isNullOrUndefined(this.spellChecker.errorWordCollection)) {
                this.spellChecker.errorWordCollection.clear();
            }
            if (!isNullOrUndefined(this.spellChecker.uniqueWordsCollection)) {
                this.spellChecker.uniqueWordsCollection.clear();
            }
        }
    };
    DocumentEditor.prototype.destroyDependentModules = function () {
        if (this.printModule) {
            this.printModule.destroy();
            this.printModule = undefined;
        }
        if (this.sfdtExportModule) {
            this.sfdtExportModule.destroy();
            this.sfdtExportModule = undefined;
        }
        if (this.optionsPaneModule) {
            this.optionsPaneModule.destroy();
            this.optionsPaneModule = undefined;
        }
        if (this.commentReviewPane) {
            this.commentReviewPane.destroy();
            this.commentReviewPane = undefined;
        }
        if (this.trackChangesPane) {
            this.trackChangesPane.destroy();
            this.trackChangesPane = undefined;
        }
        if (!isNullOrUndefined(this.hyperlinkDialogModule)) {
            this.hyperlinkDialogModule.destroy();
            this.hyperlinkDialogModule = undefined;
        }
        if (this.searchModule) {
            this.searchModule.destroy();
            this.searchModule = undefined;
        }
        if (this.contextMenuModule) {
            this.contextMenuModule.componentDestroy();
            this.contextMenuModule = undefined;
        }
        if (this.editorModule) {
            this.editorModule.destroy();
            this.editorModule = undefined;
        }
        if (this.selectionModule) {
            this.selectionModule.destroy();
            this.selectionModule = undefined;
        }
        if (this.editorHistoryModule) {
            this.editorHistoryModule.destroy();
            this.editorHistoryModule = undefined;
        }
        if (!isNullOrUndefined(this.paragraphDialogModule)) {
            this.paragraphDialogModule.destroy();
            this.paragraphDialogModule = undefined;
        }
        if (this.pageSetupDialogModule) {
            this.pageSetupDialogModule.destroy();
            this.pageSetupDialogModule = undefined;
        }
        if (this.columnsDialogModule) {
            this.columnsDialogModule.destroy();
            this.columnsDialogModule = undefined;
        }
        if (this.footNotesDialogModule) {
            this.footNotesDialogModule.destroy();
            this.footNotesDialogModule = undefined;
        }
        if (this.fontDialogModule) {
            this.fontDialogModule.destroy();
            this.fontDialogModule = undefined;
        }
        if (this.listDialogModule) {
            this.listDialogModule.destroy();
            this.listDialogModule = undefined;
        }
        if (this.imageResizerModule) {
            this.imageResizerModule.destroy();
            this.imageResizerModule = undefined;
        }
        if (this.tablePropertiesDialogModule) {
            this.tablePropertiesDialogModule.destroy();
            this.tablePropertiesDialogModule = undefined;
        }
        if (this.bordersAndShadingDialogModule) {
            this.bordersAndShadingDialogModule.destroy();
            this.bordersAndShadingDialogModule = undefined;
        }
        if (this.cellOptionsDialogModule) {
            this.cellOptionsDialogModule.destroy();
            this.cellOptionsDialogModule = undefined;
        }
        if (this.tableOptionsDialogModule) {
            this.tableOptionsDialogModule.destroy();
            this.tableOptionsDialogModule = undefined;
        }
        if (this.tableDialogModule) {
            this.tableDialogModule.destroy();
            this.tableDialogModule = undefined;
        }
        if (this.bookmarkDialogModule) {
            this.bookmarkDialogModule.destroy();
            this.bookmarkDialogModule = undefined;
        }
        if (this.styleDialogModule) {
            this.styleDialogModule.destroy();
            this.styleDialogModule = undefined;
        }
        if (this.textExportModule) {
            this.textExportModule.destroy();
            this.textExportModule = undefined;
        }
        if (this.wordExportModule) {
            this.wordExportModule.destroy();
            this.wordExportModule = undefined;
        }
        if (this.tableOfContentsDialogModule) {
            this.tableOfContentsDialogModule.destroy();
            this.tableOfContentsDialogModule = undefined;
        }
        if (this.spellCheckerModule) {
            this.spellCheckerModule.destroy();
            this.spellCheckerModule = undefined;
        }
        if (this.checkBoxFormFieldDialogModule) {
            this.checkBoxFormFieldDialogModule.destroy();
            this.checkBoxFormFieldDialogModule = undefined;
        }
        if (this.dropDownFormFieldDialogModule) {
            this.dropDownFormFieldDialogModule.destroy();
            this.dropDownFormFieldDialogModule = undefined;
        }
        if (this.textFormFieldDialogModule) {
            this.textFormFieldDialogModule.destroy();
            this.textFormFieldDialogModule = undefined;
        }
        if (this.spellCheckDialogModule) {
            this.spellCheckDialogModule.destroy();
            this.spellCheckDialogModule = undefined;
        }
        if (this.stylesDialogModule) {
            this.stylesDialogModule.destroy();
            this.stylesDialogModule = undefined;
        }
        if (this.optimizedModule) {
            this.optimizedModule.destroy();
            this.optimizedModule = undefined;
        }
        if (this.regularModule) {
            this.regularModule.destroy();
            this.regularModule = undefined;
        }
    };
    var DocumentEditor_1;
    __decorate([
        Property('KeepSourceFormatting')
    ], DocumentEditor.prototype, "defaultPasteOption", void 0);
    __decorate([
        Property('Pages')
    ], DocumentEditor.prototype, "layoutType", void 0);
    __decorate([
        Property('')
    ], DocumentEditor.prototype, "currentUser", void 0);
    __decorate([
        Property('#FFFF00')
    ], DocumentEditor.prototype, "userColor", void 0);
    __decorate([
        Property(20)
    ], DocumentEditor.prototype, "pageGap", void 0);
    __decorate([
        Property('')
    ], DocumentEditor.prototype, "documentName", void 0);
    __decorate([
        Property('100%')
    ], DocumentEditor.prototype, "width", void 0);
    __decorate([
        Property('200px')
    ], DocumentEditor.prototype, "height", void 0);
    __decorate([
        Property('')
    ], DocumentEditor.prototype, "serviceUrl", void 0);
    __decorate([
        Property(1)
    ], DocumentEditor.prototype, "zoomFactor", void 0);
    __decorate([
        Property(2000)
    ], DocumentEditor.prototype, "zIndex", void 0);
    __decorate([
        Property(true)
    ], DocumentEditor.prototype, "isReadOnly", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enablePrint", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableSelection", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableEditor", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableEditorHistory", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableSfdtExport", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableWordExport", void 0);
    __decorate([
        Property(true)
    ], DocumentEditor.prototype, "enableAutoFocus", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableTextExport", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableOptionsPane", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableContextMenu", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableHyperlinkDialog", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableBookmarkDialog", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableTableOfContentsDialog", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableSearch", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableParagraphDialog", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableListDialog", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableTablePropertiesDialog", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableBordersAndShadingDialog", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableFootnoteAndEndnoteDialog", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableColumnsDialog", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enablePageSetupDialog", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableStyleDialog", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableFontDialog", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableTableOptionsDialog", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableTableDialog", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableImageResizer", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableSpellCheck", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableComment", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableTrackChanges", void 0);
    __decorate([
        Property(true)
    ], DocumentEditor.prototype, "enableFormField", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "acceptTab", void 0);
    __decorate([
        Property(true)
    ], DocumentEditor.prototype, "useCtrlClickToFollowHyperlink", void 0);
    __decorate([
        Property('#000000')
    ], DocumentEditor.prototype, "pageOutline", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableCursorOnReadOnly", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableLocalPaste", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "enableLockAndEdit", void 0);
    __decorate([
        Complex({}, DocumentEditorSettings)
    ], DocumentEditor.prototype, "documentEditorSettings", void 0);
    __decorate([
        Complex({}, DocumentSettings)
    ], DocumentEditor.prototype, "documentSettings", void 0);
    __decorate([
        Property({ systemClipboard: 'SystemClipboard', spellCheck: 'SpellCheck', restrictEditing: 'RestrictEditing', canLock: 'CanLock', getPendingActions: 'GetPendingActions' })
    ], DocumentEditor.prototype, "serverActionSettings", void 0);
    __decorate([
        Property([])
    ], DocumentEditor.prototype, "headers", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "showComments", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "showRevisions", void 0);
    __decorate([
        Property(false)
    ], DocumentEditor.prototype, "autoResizeOnVisibilityChange", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "documentChange", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "viewChange", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "zoomFactorChange", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "selectionChange", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "requestNavigate", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "contentChange", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "keyDown", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "searchResultsChange", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "created", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "destroyed", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "customContextMenuSelect", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "customContextMenuBeforeOpen", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "beforePaneSwitch", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "commentBegin", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "commentEnd", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "beforeFileOpen", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "commentDelete", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "beforeAcceptRejectChanges", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "beforeCommentAction", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "trackChange", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "beforeFormFieldFill", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "serviceFailure", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "afterFormFieldFill", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "actionComplete", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "contentControl", void 0);
    __decorate([
        Event()
    ], DocumentEditor.prototype, "beforeXmlHttpRequestSend", void 0);
    DocumentEditor = DocumentEditor_1 = __decorate([
        NotifyPropertyChanges
    ], DocumentEditor);
    return DocumentEditor;
}(Component));
export { DocumentEditor };
/**
 * The `ServerActionSettings` module is used to provide the server action methods of Document Editor.
 */
var ServerActionSettings = /** @class */ (function (_super) {
    __extends(ServerActionSettings, _super);
    function ServerActionSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('SystemClipboard')
    ], ServerActionSettings.prototype, "systemClipboard", void 0);
    __decorate([
        Property('SpellCheck')
    ], ServerActionSettings.prototype, "spellCheck", void 0);
    __decorate([
        Property('RestrictEditing')
    ], ServerActionSettings.prototype, "restrictEditing", void 0);
    __decorate([
        Property('CanLock')
    ], ServerActionSettings.prototype, "canLock", void 0);
    __decorate([
        Property('GetPendingActions')
    ], ServerActionSettings.prototype, "getPendingActions", void 0);
    return ServerActionSettings;
}(ChildProperty));
export { ServerActionSettings };
/**
 * Form field settings.
 */
var FormFieldSettings = /** @class */ (function (_super) {
    __extends(FormFieldSettings, _super);
    function FormFieldSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('#cfcfcf')
    ], FormFieldSettings.prototype, "shadingColor", void 0);
    __decorate([
        Property(true)
    ], FormFieldSettings.prototype, "applyShading", void 0);
    __decorate([
        Property('#cccccc')
    ], FormFieldSettings.prototype, "selectionColor", void 0);
    __decorate([
        Property('Popup')
    ], FormFieldSettings.prototype, "formFillingMode", void 0);
    __decorate([
        Property([])
    ], FormFieldSettings.prototype, "formattingExceptions", void 0);
    return FormFieldSettings;
}(ChildProperty));
export { FormFieldSettings };
/**
 * Represents the collaborative editing settings.
 */
var CollaborativeEditingSettings = /** @class */ (function (_super) {
    __extends(CollaborativeEditingSettings, _super);
    function CollaborativeEditingSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], CollaborativeEditingSettings.prototype, "roomName", void 0);
    __decorate([
        Property('#22b24b')
    ], CollaborativeEditingSettings.prototype, "editableRegionColor", void 0);
    __decorate([
        Property('#f44336')
    ], CollaborativeEditingSettings.prototype, "lockedRegionColor", void 0);
    __decorate([
        Property(3000)
    ], CollaborativeEditingSettings.prototype, "saveTimeout", void 0);
    return CollaborativeEditingSettings;
}(ChildProperty));
export { CollaborativeEditingSettings };
/**
 * The `ServerActionSettings` module is used to provide the server action methods of Document Editor Container.
 */
var ContainerServerActionSettings = /** @class */ (function (_super) {
    __extends(ContainerServerActionSettings, _super);
    function ContainerServerActionSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Import')
    ], ContainerServerActionSettings.prototype, "import", void 0);
    return ContainerServerActionSettings;
}(ServerActionSettings));
export { ContainerServerActionSettings };
