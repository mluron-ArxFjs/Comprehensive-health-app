import { Page, LineWidget, TextElementBox, TabElementBox, CommentCharacterElementBox } from './page';
import { BaselineAlignment, Underline } from '../../index';
import { DocumentHelper } from './viewer';
import { Point } from '../editor/editor-helper';
import { SpellChecker } from '../spell-check/spell-checker';
import { DocumentCanvasElement, DocumentCanvasRenderingContext2D } from './document-canvas';
import { Dictionary } from '../../base/dictionary';
/**
 * @private
 */
export declare class Renderer {
    /**
     * @private
     */
    commentMarkDictionary: Dictionary<HTMLElement, CommentCharacterElementBox[]>;
    isPrinting: boolean;
    isExporting: boolean;
    private pageLeft;
    private pageTop;
    private documentHelper;
    private pageIndex;
    private pageCanvasIn;
    private isFieldCode;
    private leftPosition;
    private topPosition;
    private height;
    private exportPageCanvas;
    readonly pageCanvas: HTMLCanvasElement | DocumentCanvasElement;
    readonly spellChecker: SpellChecker;
    private readonly selectionCanvas;
    private readonly pageContext;
    private readonly selectionContext;
    constructor(documentHelper: DocumentHelper);
    private readonly viewer;
    renderWidgets(page: Page, left: number, top: number, width: number, height: number): void;
    private setPageSize;
    private renderHFWidgets;
    private renderHeaderSeparator;
    private getFooterHeight;
    private getHeaderFooterType;
    renderDashLine(context: CanvasRenderingContext2D | DocumentCanvasRenderingContext2D, x: number, y: number, width: number, fillStyle: string, isSmallDash: boolean): void;
    renderSolidLine(context: CanvasRenderingContext2D | DocumentCanvasRenderingContext2D, x: number, y: number, width: number, fillStyle: string): void;
    private renderHeaderFooterMark;
    private renderHeaderFooterMarkText;
    private render;
    private renderFloatingItems;
    private isOverLappedShapeWidget;
    private renderShapeElementBox;
    private renderWidget;
    private renderLockRegionBorder;
    private renderHeader;
    private renderParagraphWidget;
    private renderParagraphBorder;
    private getContainerWidth;
    private getTopMargin;
    private getBottomMargin;
    private renderfootNoteWidget;
    private renderTableWidget;
    private renderTableRowWidget;
    private renderTableCellWidget;
    private checkHeaderFooterLineWidget;
    private renderEditRegionHighlight;
    private renderSearchHighlight;
    private renderSelectionHighlight;
    private renderSelectionHighlightOnTable;
    private renderLine;
    private isBookmarkEndAtStart;
    private isRenderable;
    private combineHexColors;
    private renderBookmark;
    private retriveCharacterformat;
    private toSkipFieldCode;
    getUnderlineYPosition(lineWidget: LineWidget): number;
    private renderListTextElementBox;
    private getDefaultFontColor;
    private renderTextElementBox;
    private tabMark;
    private replaceSpace;
    private inverseCharacter;
    private getBackgroundColorHeirachy;
    private handleChangeDetectedElements;
    handleUnorderedElements(currentText: string, elementBox: TextElementBox, underlineY: number, iteration: number, markIndex: number, isLastItem?: boolean, beforeIndex?: number): void;
    renderWavyLine(elementBox: TextElementBox, left: number, top: number, underlineY: number, color: string, underline: Underline, baselineAlignment: BaselineAlignment, backgroundColor?: string): void;
    drawWavy(from: Point, to: Point, frequency: number, amplitude: number, step: number, color: string, height: number, backColor: string, negative?: number): void;
    /**
     * @private
     */
    getTabLeader(elementBox: TabElementBox): string;
    private getTabLeaderString;
    private clipRect;
    private getTrimmedWidth;
    private renderUnderline;
    private renderStrikeThrough;
    private renderImageElementBox;
    private renderTableOutline;
    private renderTableCellOutline;
    private renderCellBackground;
    private drawTextureStyle;
    private getForeColor;
    private getColorValue;
    private renderSingleBorder;
    getScaledValue(value: number, type?: number): number;
    private checkRevisionType;
    private getRevisionColor;
    private getRevisionType;
    private getFormfieldInLine;
    /**
     * Destroys the internal objects which is maintained.
     *
     * @returns {void}
     */
    destroy(): void;
}
