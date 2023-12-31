import { Chart } from '../../chart';
import { AccumulationChart } from '../../accumulation-chart/accumulation';
import { AccPoints, AccumulationSeries } from '../../accumulation-chart/model/acc-base';
import { PointData, ChartLocation } from '../../common/utils/helper';
import { Rect, Size } from '@syncfusion/ej2-svg-base';
import { AccPointData } from '../../common/utils/helper';
import { ChartData } from '../../chart/utils/get-data';
import { Series, Points } from '../../chart/series/chart-series';
import { FontModel } from '../../common/model/base-model';
import { Tooltip as SVGTooltip } from '@syncfusion/ej2-svg-base';
import { ChartShape } from '../../chart/utils/enum';
/**
 * Tooltip Module used to render the tooltip for series.
 */
export declare class BaseTooltip extends ChartData {
    element: HTMLElement;
    elementSize: Size;
    textStyle: FontModel;
    isRemove: boolean;
    toolTipInterval: number;
    textElements: Element[];
    inverted: boolean;
    formattedText: string[];
    header: string;
    /**
     * @aspType string
     * @private
     */
    template: string | Function;
    /** @private */
    valueX: number;
    /** @private */
    valueY: number;
    control: AccumulationChart | Chart;
    text: string[];
    svgTooltip: SVGTooltip;
    headerText: string;
    /**
     * Constructor for tooltip module.
     *
     * @private
     */
    constructor(chart: Chart | AccumulationChart);
    getElement(id: string): HTMLElement;
    /**
     * Renders the tooltip.
     *
     * @returns {void}
     * @private
     */
    getTooltipElement(isTooltip: boolean): HTMLDivElement;
    createElement(): HTMLDivElement;
    pushData(data: PointData | AccPointData, isFirst: boolean, tooltipDiv: HTMLDivElement, isChart: boolean): boolean;
    removeHighlight(): void;
    highlightPoint(series: Series | AccumulationSeries, pointIndex: number, highlight: boolean): void;
    highlightPoints(): void;
    createTooltip(chart: Chart | AccumulationChart, isFirst: boolean, location: ChartLocation, clipLocation: ChartLocation, point: Points | AccPoints, shapes: ChartShape[], offset: number, bounds: Rect, crosshairEnabled?: boolean, extraPoints?: PointData[], templatePoint?: Points | Points[] | AccPoints, customTemplate?: string): void;
    private findPalette;
    private findColor;
    updatePreviousPoint(extraPoints: PointData[]): void;
    fadeOut(data: PointData[]): void;
    removeHighlightedMarker(data: PointData[], fadeOut: boolean): void;
    removeText(): void;
    stopAnimation(): void;
    /**
     * Removes the tooltip on mouse leave.
     *
     * @returns {void}
     * @private
     */
    removeTooltip(duration: number): void;
}
