import { WListFormat, WCharacterFormat } from '../format/index';
import { LineWidget, Page, ChartElementBox } from '../viewer/page';
import { DocumentHelper } from '../viewer';
/**
 * Exports the document to Sfdt format.
 */
export declare class SfdtExport {
    private startLine;
    private endLine;
    private endOffset;
    private endCell;
    private startColumnIndex;
    private endColumnIndex;
    private lists;
    private document;
    private writeInlineStyles;
    private nextBlock;
    private blockContent;
    private startContent;
    private multipleLineContent;
    private nestedContent;
    private contentType;
    private editRangeId;
    private selectedCommentsId;
    private selectedRevisionId;
    private startBlock;
    private endBlock;
    private nestedBlockContent;
    private nestedBlockEnabled;
    private blocks;
    private contentInline;
    private isContentControl;
    private isBlockClosed;
    /**
     * @private
     */
    keywordIndex: number;
    /**
     * @private
     */
    private isExport;
    /**
     * @private
     */
    isPartialExport: boolean;
    private documentHelper;
    private checkboxOrDropdown;
    /**
     * @private
     */
    copyWithTrackChange: boolean;
    constructor(documentHelper: DocumentHelper);
    private readonly viewer;
    private readonly owner;
    private getModuleName;
    private clear;
    /**
     * Serialize the data as Syncfusion document text.
     *
     * @private
     */
    serialize(): string;
    /**
     * Serialize the data as Syncfusion document text.
     *
     * @private
     */
    seralizeInternal(index: number): string;
    /**
     * @private
     * @param documentHelper - Specifies document helper instance.
     * @returns {Promise<Blob>}
     */
    saveAsBlobNonOptimized(documentHelper: DocumentHelper): Promise<Blob>;
    /**
     * @private
     * @param documentHelper - Specifies document helper instance.
     * @returns {Promise<Blob>}
     */
    saveAsBlob(documentHelper: DocumentHelper): Promise<Blob>;
    private updateEditRangeId;
    /**
     * @private
     */
    write(index?: number, line?: LineWidget, startOffset?: number, endLine?: LineWidget, endOffset?: number, writeInlineStyles?: boolean, isExport?: boolean): any;
    private getNextBlock;
    /**
     * @private
     */
    Initialize(): void;
    /**
     * @private
     */
    writePage(page: Page): any;
    private writeBodyWidget;
    private writeHeaderFooters;
    private writeHeaderFooter;
    private createSection;
    private writeBlock;
    private writeParagraphs;
    private contentControlProperty;
    private tounCheckedState;
    private toCheckedState;
    private blockContentControl;
    private tableContentControl;
    private tableContentControls;
    private writeParagraph;
    private writeInlines;
    private inlineContentControl;
    private nestedContentProperty;
    private inlineContentControls;
    private writeInline;
    private writeInlineRevisions;
    private writeShape;
    writeChart(element: ChartElementBox, inline: any): void;
    private writeChartTitleArea;
    private writeChartDataFormat;
    private writeChartLayout;
    private writeChartArea;
    private writeChartLegend;
    private writeChartCategoryAxis;
    private writeChartDataTable;
    private writeChartCategory;
    private createChartCategory;
    private writeChartData;
    private createChartData;
    private createChartSeries;
    private writeChartSeries;
    private writeChartDataLabels;
    private writeChartTrendLines;
    private writeLines;
    private writeLine;
    private writeInlinesFootNote;
    private writeInlinesContentControl;
    private createParagraph;
    /**
     * @private
     */
    writeCharacterFormat(format: WCharacterFormat, isInline?: boolean): any;
    private writeParagraphFormat;
    private writeThemes;
    private writeMajorMinorFontScheme;
    private writeFontSchemeList;
    private writeTabs;
    /**
     * @private
     */
    writeListFormat(format: WListFormat, isInline?: boolean): any;
    private writeTable;
    private writeRow;
    private writeRowInternal;
    private writeCell;
    private createTable;
    private writeTablePositioning;
    private createRow;
    private createCell;
    private writeShading;
    private writeBorders;
    private writeCellFormat;
    private writeRowFormat;
    private writeRowRevisions;
    private writeTableFormat;
    private footnotes;
    private seprators;
    private endnotes;
    private endnoteSeparator;
    private writeStyles;
    private writeStyle;
    writeRevisions(documentHelper: DocumentHelper): void;
    private writeRevision;
    writeComments(documentHelper: DocumentHelper): void;
    writeCustomXml(documentHelper: DocumentHelper): void;
    writeImages(documentHelper: DocumentHelper): void;
    private writeComment;
    private commentInlines;
    private writeLists;
    private writeAbstractList;
    private writeList;
    private writeLevelOverrides;
    private writeListLevel;
    private getParentBlock;
    private getParentCell;
    private getWidthTypeEnumValue;
    private getTableAlignmentEnumValue;
    private getTextureStyleEnumValue;
    private getHeighTypeEnumValue;
    private getCellVerticalAlignmentEnumValue;
    private getListLevelPatternEnumValue;
    private getStyleTypeEnumValue;
    private getProtectionTypeEnumValue;
    private getRevisionTypeEnumValue;
    private getFootnoteTypeEnumValue;
    private getFootnoteRestartIndexEnumValue;
    private getFootEndNoteNumberFormatEnumValue;
    private getTextVerticalAlignmentEnumValue;
    private getShapeVerticalAlignmentEnumValue;
    private getShapeHorizontalAlignmentEnumValue;
    private getVerticalOriginEnumValue;
    private getHorizontalOriginEnumValue;
    private getTableVerticalRelationEnumValue;
    private getTableHorizontalRelationEnumValue;
    private getTableVerticalPositionEnumValue;
    private getTableHorizontalPositionEnumValue;
    private getLineDashStyleEnumValue;
    private getHorizontalPositionAbsEnumValue;
    private getTabJustificationEnumValue;
    private getTabLeaderEnumValue;
    private getTextFormFieldTypeEnumValue;
    private getTextFormFieldFormatEnumValue;
    private getCheckBoxSizeTypeEnumValue;
    private getContentControlAppearanceEnumValue;
    private getContentControlTypeEnumValue;
    private getDateCalendarTypeEnumValue;
    private getDateStorageFormatEnumValue;
    private getTextWrappingStyleEnumValue;
    private getTextWrappingTypeEnumValue;
    private getCompatibilityModeEnumValue;
    private getLineFormatTypeEnumValue;
    private getAutoShapeTypeEnumValue;
    private getFollowCharacterType;
    /**
     * @private
     * @returns {void}
     */
    destroy(): void;
}
