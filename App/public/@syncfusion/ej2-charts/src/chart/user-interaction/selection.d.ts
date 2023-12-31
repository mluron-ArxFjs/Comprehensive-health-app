import { ChartLocation } from '../../common/utils/helper';
import { Rect, SvgRenderer, CanvasRenderer } from '@syncfusion/ej2-svg-base';
import { SelectionMode, HighlightMode } from '../utils/enum';
import { Chart } from '../chart';
import { Series, Points } from '../series/chart-series';
import { SeriesModel } from '../series/chart-series-model';
import { Indexes, Index } from '../../common/model/base';
import { BaseSelection } from '../../common/user-interaction/selection';
/**
 * `Selection` module handles the selection for chart.
 *
 * @private
 */
export declare class Selection extends BaseSelection {
    /** @private */
    renderer: SvgRenderer | CanvasRenderer;
    /** @private */
    isSeriesMode: boolean;
    private isdrawRect;
    private resizing;
    /** @private */
    rectPoints: Rect;
    private closeIconId;
    private closeIcon;
    private draggedRectGroup;
    private multiRectGroup;
    private draggedRect;
    private lassoPath;
    /** @private */
    selectedDataIndexes: Indexes[];
    /** @private */
    highlightDataIndexes: Indexes[];
    multiDataIndexes: Points[][];
    pathIndex: number;
    seriesIndex: number;
    /** @private */
    series: Series[];
    private dragging;
    private count;
    private isMultiDrag;
    private targetIndex;
    private dragRect;
    private dragRectArray;
    filterArray: Rect[];
    private totalSelectedPoints;
    private rectGrabbing;
    private path;
    private resizeMode;
    /** @private */
    chart: Chart;
    /** @private */
    currentMode: SelectionMode | HighlightMode;
    /** @private */
    previousSelectedEle: Element[];
    /**
     * Constructor for selection module.
     *
     * @private
     */
    constructor(chart: Chart);
    /**
     * Binding events for selection module.
     */
    private addEventListener;
    /**
     * Chart mouse down
     */
    private mousedown;
    /**
     * UnBinding events for selection module.
     */
    private removeEventListener;
    /**
     * To find private variable values
     */
    private initPrivateVariables;
    /**
     * Method to select the point and series.
     *
     * @returns {void}
     */
    invokeSelection(chart: Chart): void;
    generateStyle(series: SeriesModel): string;
    /**
     *  Method to get the selected data index
     *
     * @private
     */
    selectDataIndex(chart: Chart, indexes: Index[]): void;
    /**
     *  Method to get the selected index element
     *
     * @private
     */
    getElementByIndex(chart: Chart, index: Index, suffix?: string, marker?: boolean): Element[];
    /**
     *  Method to get the selected cluster element
     *
     * @private
     */
    getClusterElements(chart: Chart, index: Index): Element[];
    /**
     *  Method to get trackball elements
     *
     * @private
     */
    findTrackballElements(selectedElements: Element[] | NodeListOf<HTMLElement>, className: string): void;
    /**
     *  Method to get the selected element
     *
     * @private
     */
    findElements(chart: Chart, series: SeriesModel, index: Index, suffix?: string, marker?: boolean): Element[];
    /**
     * To find the selected element.
     *
     * @returns {void}
     * @private
     */
    isAlreadySelected(targetElem: Element, eventType: string): boolean;
    private mouseClick;
    /**
     * To find the selected element.
     *
     * @returns {void}
     * @private
     */
    calculateSelectedElements(targetElement: HTMLElement, eventType: string): void;
    /**
     *  Method to perform the selection
     *
     * @private
     */
    performSelection(index: Index, chart: Chart, element?: Element): void;
    /**
     *  Method to get the selected data index
     *
     * @private
     */
    selectionComplete(chart: Chart, index: Index, selectionMode: SelectionMode | HighlightMode): void;
    /**
     *  Method to perform selection
     *
     * @private
     */
    selection(chart: Chart, index: Index, selectedElements: Element[]): void;
    /**
     *  Method to get the cluster selection element
     *
     * @private
     */
    clusterSelection(chart: Chart, index: Index): void;
    /**
     * Method to remove the multi selected elements
     *
     * @private
     */
    removeMultiSelectElements(chart: Chart, index: Index[], currentIndex: Index, seriesCollection: SeriesModel[]): void;
    /**
     * Method to remove the selection
     *
     * @private
     */
    blurEffect(chartId: string, visibleSeries: Series[], isLegend?: boolean, index?: number): void;
    /**
     * Method to add the add/remove class to element
     *
     * @private
     */
    checkSelectionElements(element: Element, className: string, visibility: boolean, isLegend?: boolean, series?: number, legendStrokeColor?: string): void;
    /**
     *  Method to apply the styles
     *
     * @private
     */
    applyStyles(elements: Element[]): void;
    /**
     *  Method to get the selection class
     *
     * @private
     */
    getSelectionClass(id: string): string;
    /**
     *  Method to remove styles
     *
     * @private
     */
    removeStyles(elements: Element[]): void;
    /**
     *  Method to remove the selected data index
     *
     * @private
     */
    addOrRemoveIndex(indexes: Index[], index: Index, isAdd?: boolean): void;
    /**
     *  Method to get the equal index
     *
     * @private
     */
    toEquals(first: Index, second: Index, checkSeriesOnly: boolean): boolean;
    /**
     * To redraw the selected points.
     *
     * @returns {void}
     * @private
     */
    redrawSelection(chart: Chart, oldMode: SelectionMode | HighlightMode, chartRedraw?: boolean): void;
    /** @private */
    legendSelection(chart: Chart, series: number, targetElement: Element, eventType: string): void;
    /** @private */
    rangeColorMappingEnabled(): boolean;
    removeSelection(chart: Chart, series: number, selectedElements: NodeListOf<HTMLElement>, seriesStyle: string, isBlurEffectNeeded: boolean): void;
    /** @private */
    getSeriesElements(series: SeriesModel): Element[];
    /** @private */
    indexFinder(id: string): Index;
    /**
     * Drag selection that returns the selected data.
     *
     * @returns {void}
     * @private
     */
    calculateDragSelectedElements(chart: Chart, dragRect: Rect, isClose?: boolean): void;
    private removeOffset;
    private isPointSelect;
    /**
     * Method to draw dragging rect.
     *
     * @returns {void}
     * @private
     */
    drawDraggingRect(chart: Chart, dragRect: Rect): void;
    /**
     * To get drag selected group element index from its id
     *
     * @param {string} id element id
     */
    private getIndex;
    private createCloseButton;
    /**
     * Method to remove dragged element.
     *
     * @returns {void}
     * @private
     */
    removeDraggedElements(chart: Chart, targetElement: HTMLElement, eventType: string): void;
    /**
     * Method to resize the drag rect.
     *
     * @returns {void}
     * @private
     */
    resizingSelectionRect(chart: Chart, location: ChartLocation, tapped?: boolean, target?: Element): void;
    private findResizeMode;
    private changeCursorStyle;
    private removeSelectedElements;
    private setAttributes;
    /**
     * Method to move the dragged rect.
     *
     * @returns {void}
     * @private
     */
    draggedRectMoved(chart: Chart, grabbedPoint: Rect, doDrawing?: boolean, target?: Element): void;
    private mouseLeave;
    /**
     * To complete the selection.
     *
     * @returns {void}
     * @private
     */
    completeSelection(target: HTMLElement, eventType: string): void;
    private getDragRect;
    /** @private */
    dragStart(chart: Chart, seriesClipRect: Rect, mouseDownX: number, mouseDownY: number, event: Event): void;
    private isDragRect;
    /** @private */
    mouseMove(event: PointerEvent | TouchEvent): void;
    /**
     * highlight parts
     *
     * @private
     */
    highlightChart(target: Element, eventType: string): void;
    /**
     * selection and drag selection
     *
     * @private
     */
    selectionAndDrag(chart: Chart, target: Element, eventType: string): void;
    /**
     * remove highlighted legend when not focused.
     *
     * @private
     */
    removeLegendHighlightStyles(): void;
    private getPath;
    private pointChecking;
    /**
     * Get module name.
     *
     * @private
     */
    getModuleName(): string;
    /**
     * To destroy the selection.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
