import { ChildProperty } from '@syncfusion/ej2-base';
import { Rect, TextOption, Size } from '@syncfusion/ej2-svg-base';
import { Chart, ILegendRegions } from '../../chart';
import { LegendSettingsModel, LocationModel } from './legend-model';
import { MarginModel, FontModel, BorderModel, ContainerPaddingModel } from '../model/base-model';
import { ChartLocation } from '../utils/helper';
import { RectOption } from '../utils/helper';
import { LegendPosition, LegendShape, ChartSeriesType, ChartShape, LegendMode } from '../../chart/utils/enum';
import { Legend } from '../../chart/legend/legend';
import { AccumulationType } from '../../accumulation-chart/model/enum';
import { AccumulationChart } from '../../accumulation-chart/accumulation';
import { AccumulationLegend } from '../../accumulation-chart/renderer/legend';
import { BulletChart } from '../../bullet-chart/bullet-chart';
import { BulletChartLegend } from '../../bullet-chart/legend/legend';
import { Alignment, LegendTitlePosition, TextWrap, LabelOverflow } from '../utils/enum';
import { StockChart } from '../../stock-chart';
import { StockLegend } from '../../stock-chart/legend/legend';
/**
 * Configures the location for the legend.
 */
export declare class Location extends ChildProperty<Location> {
    /**
     * X coordinate of the legend in pixels.
     *
     * @default 0
     */
    x: number;
    /**
     * Y coordinate of the legend in pixels.
     *
     * @default 0
     */
    y: number;
}
/**
 * Configures the legends in charts.
 */
export declare class LegendSettings extends ChildProperty<LegendSettings> {
    /**
     * If set to true, legend will be visible.
     *
     * @default true
     */
    visible: boolean;
    /**
     * The height of the legend in pixels.
     *
     * @default null
     */
    height: string;
    /**
     * The width of the legend in pixels.
     *
     * @default null
     */
    width: string;
    /**
     * Specifies the location of the legend, relative to the chart.
     * If x is 20, legend moves by 20 pixels to the right of the chart. It requires the `position` to be `Custom`.
     * ```html
     * <div id='Chart'></div>
     * ```
     * ```typescript
     * let chart: Chart = new Chart({
     * ...
     *   legendSettings: {
     *     visible: true,
     *     position: 'Custom',
     *     location: { x: 100, y: 150 },
     *   },
     * ...
     * });
     * chart.appendTo('#Chart');
     * ```
     */
    location: LocationModel;
    /**
     * Position of the legend in the chart are,
     * * Auto: Places the legend based on area type.
     * * Top: Displays the legend at the top of the chart.
     * * Left: Displays the legend at the left of the chart.
     * * Bottom: Displays the legend at the bottom of the chart.
     * * Right: Displays the legend at the right of the chart.
     * * Custom: Displays the legend  based on the given x and y values.
     *
     * @default 'Auto'
     */
    position: LegendPosition;
    /**
     * Mode of legend items.
     * * Series: Legend items generated based on series count.
     * * Point: Legend items generated based on unique data points.
     * * Range: Legend items generated based on range color mapping property.
     * * Gradient: Single linear bar generated based on range color mapping property.
     * This property is applicable for chart component only.
     */
    mode: LegendMode;
    /**
     * Option to customize the padding around the legend items.
     *
     * @default 8
     */
    padding: number;
    /**
     * Option to customize the padding between legend items.
     *
     * @default null
     */
    itemPadding: number;
    /**
     * Legend in chart can be aligned as follows:
     * * Near: Aligns the legend to the left of the chart.
     * * Center: Aligns the legend to the center of the chart.
     * * Far: Aligns the legend to the right of the chart.
     *
     * @default 'Center'
     */
    alignment: Alignment;
    /**
     * Options to customize the legend text.
     */
    textStyle: FontModel;
    /**
     * Shape height of the legend in pixels.
     *
     * @default 10
     */
    shapeHeight: number;
    /**
     * Shape width of the legend in pixels.
     *
     * @default 10
     */
    shapeWidth: number;
    /**
     * Options to customize the border of the legend.
     */
    border: BorderModel;
    /**
     *  Options to customize left, right, top and bottom margins of the chart.
     */
    margin: MarginModel;
    /**
     *  Options to customize left, right, top and bottom padding for legend container of the chart.
     */
    containerPadding: ContainerPaddingModel;
    /**
     * Padding between the legend shape and text.
     *
     * @default 8
     */
    shapePadding: number;
    /**
     * The background color of the legend that accepts value in hex and rgba as a valid CSS color string.
     *
     * @default 'transparent'
     */
    background: string;
    /**
     * Opacity of the legend.
     *
     * @default 1
     */
    opacity: number;
    /**
     * If set to true, series' visibility collapses based on the legend visibility.
     *
     * @default true
     */
    toggleVisibility: boolean;
    /**
     * If set to true, the series get highlighted, while hovering the legend.
     *
     * @default false
     */
    enableHighlight: boolean;
    /**
     * Description for legends.
     *
     * @default null
     */
    description: string;
    /**
     * TabIndex value for the legend.
     *
     * @default 3
     */
    tabIndex: number;
    /**
     * Title for legends.
     *
     * @default null
     */
    title: string;
    /**
     * Options to customize the legend title.
     */
    titleStyle: FontModel;
    /**
     * legend title position.
     *
     * @default 'Top'
     */
    titlePosition: LegendTitlePosition;
    /**
     * Defines the text wrap behavior to employ when the individual legend text overflows
     * * `Normal` -  Specifies to break words only at allowed break points.
     * * `Wrap` - Specifies to break a word once it is too long to fit on a line by itself.
     * * `AnyWhere` - Specifies to break a word at any point if there are no otherwise-acceptable break points in the line.
     *
     * @default 'Normal'
     */
    textWrap: TextWrap;
    /**
     * Defines the text overflow behavior to employ when the individual legend text overflows
     * * `Clip` -  Specifies the text is clipped and not accessible.
     * * `Ellipsis` -  Specifies an ellipsis (“...”) to the clipped text.
     *
     * @default 'Ellipsis'
     */
    textOverflow: LabelOverflow;
    /**
     * maximum width for the legend title.
     *
     * @default 100
     */
    maximumTitleWidth: number;
    /**
     * Maximum label width for the legend text.
     *
     * @default null
     */
    maximumLabelWidth: number;
    /**
     * If set to true, legend will be visible using pages.
     *
     * @default true
     */
    enablePages: boolean;
    /**
     * If `isInversed` set to true, then it inverses legend item content (image and text).
     *
     * @default false.
     */
    isInversed: boolean;
    /**
     * If `reverse` set to true, then it reverse the legend items order.
     *
     * @default false
     */
    reverse: boolean;
}
/**
 * Legend base class for Chart and Accumulation chart.
 *
 * @private
 */
export declare class BaseLegend {
    protected chart: Chart | AccumulationChart | BulletChart | StockChart;
    protected legend: LegendSettingsModel;
    protected maxItemHeight: number;
    protected rowHeights: number[];
    protected pageHeights: number[];
    protected columnHeights: number[];
    protected isPaging: boolean;
    private clipPathHeight;
    totalPages: number;
    protected isVertical: boolean;
    protected fivePixel: number;
    private rowCount;
    protected pageButtonSize: number;
    protected pageXCollections: number[];
    protected maxColumns: number;
    maxWidth: number;
    protected legendID: string;
    private clipRect;
    private legendTranslateGroup;
    protected currentPage: number;
    protected backwardArrowOpacity: number;
    protected forwardArrowOpacity: number;
    private isChartControl;
    private isAccChartControl;
    private isBulletChartControl;
    private isStockChartControl;
    private accessbilityText;
    protected arrowWidth: number;
    protected arrowHeight: number;
    protected library: Legend | AccumulationLegend | BulletChartLegend | StockLegend;
    /**  @private */
    position: LegendPosition;
    chartRowCount: number;
    /**
     * Gets the legend bounds in chart.
     *
     * @private
     */
    legendBounds: Rect;
    /** @private */
    legendCollections: LegendOptions[];
    private legendTitleCollections;
    protected legendTitleSize: Size;
    private isTop;
    protected isTitle: boolean;
    /** @private */
    clearTooltip: number;
    protected pagingClipRect: RectOption;
    protected currentPageNumber: number;
    protected legendRegions: ILegendRegions[];
    protected pagingRegions: Rect[];
    protected totalNoOfPages: number;
    /** @private */
    calTotalPage: boolean;
    private bulletChart;
    protected isRtlEnable: boolean;
    protected isReverse: boolean;
    protected itemPadding: number;
    /**
     * Constructor for the dateTime module.
     *
     * @private
     */
    constructor(chart?: Chart | AccumulationChart | BulletChart | StockChart);
    /**
     * Calculate the bounds for the legends.
     *
     * @returns {void}
     * @private
     */
    calculateLegendBounds(rect: Rect, availableSize: Size, maxLabelSize: Size): void;
    /**
     * To find legend position based on available size for chart and accumulation chart
     *
     * @param position
     * @param availableSize
     * @param position
     * @param availableSize
     * @returns {void}
     */
    private getPosition;
    /**
     * To set bounds for chart and accumulation chart
     *
     * @param computedWidth
     * @param computedHeight
     * @param legend
     * @param legendBounds
     * @param computedWidth
     * @param computedHeight
     * @param legend
     * @param legendBounds
     * @param computedWidth
     * @param computedHeight
     * @param legend
     * @param legendBounds
     * @param computedWidth
     * @param computedHeight
     * @param legend
     * @param legendBounds
     * @returns {void}
     */
    protected setBounds(computedWidth: number, computedHeight: number, legend: LegendSettingsModel, legendBounds: Rect): void;
    /**
     * To find legend location based on position, alignment for chart and accumulation chart
     *
     * @param position
     * @param alignment
     * @param legendBounds
     * @param rect
     * @param availableSize
     * @param maxLabelSize
     * @param position
     * @param alignment
     * @param legendBounds
     * @param rect
     * @param availableSize
     * @param maxLabelSize
     * @param position
     * @param alignment
     * @param legendBounds
     * @param rect
     * @param availableSize
     * @param maxLabelSize
     * @param position
     * @param alignment
     * @param legendBounds
     * @param rect
     * @param availableSize
     * @param maxLabelSize
     * @param position
     * @param alignment
     * @param legendBounds
     * @param rect
     * @param availableSize
     * @param maxLabelSize
     * @param position
     * @param alignment
     * @param legendBounds
     * @param rect
     * @param availableSize
     * @param maxLabelSize
     */
    private getLocation;
    /**
     * To find legend alignment for chart and accumulation chart
     *
     * @param start
     * @param size
     * @param legendSize
     * @param alignment
     * @param start
     * @param size
     * @param legendSize
     * @param alignment
     * @param start
     * @param size
     * @param legendSize
     * @param alignment
     * @param start
     * @param size
     * @param legendSize
     * @param alignment
     */
    private alignLegend;
    /**
     * Renders the legend.
     *
     * @param chart
     * @param legend
     * @param legendBounds
     * @param redraw
     * @param chart
     * @param legend
     * @param legendBounds
     * @param redraw
     * @param chart
     * @param legend
     * @param legendBounds
     * @param redraw
     * @param chart
     * @param legend
     * @param legendBounds
     * @param redraw
     * @returns {void}
     * @private
     */
    renderLegend(chart: Chart | AccumulationChart | BulletChart | StockChart, legend: LegendSettingsModel, legendBounds: Rect, redraw?: boolean): void;
    /** @private */
    private getLinearLegend;
    /**
     * To find first valid legend text index for chart and accumulation chart
     *
     * @param legendCollection
     * @returns {number}
     * @private
     */
    private findFirstLegendPosition;
    /**
     * To get the legend title text width and height.
     *
     * @param legend
     * @param legendBounds
     */
    protected calculateLegendTitle(legend: LegendSettingsModel, legendBounds: Rect): void;
    /**
     * Render the legend title
     *
     * @param chart
     * @param legend
     * @param legendBounds
     * @param legendGroup
     */
    private renderLegendTitle;
    /**
     * To create legend rendering elements for chart and accumulation chart
     *
     * @param chart
     * @param legendBounds
     * @param legendGroup
     * @param legend
     * @param id
     * @param redraw
     */
    private createLegendElements;
    /**
     * To render legend symbols for chart and accumulation chart
     *
     * @param legendOption
     * @param group
     * @param i
     * @param legendOption
     * @param group
     * @param i
     * @param legendOption
     * @param group
     * @param i
     */
    protected renderSymbol(legendOption: LegendOptions, group: Element, legendIndex: number): void;
    /**
     * To render legend text for chart and accumulation chart
     *
     * @param chart
     * @param legendOption
     * @param group
     * @param textOptions
     * @param i
     * @param chart
     * @param legendOption
     * @param group
     * @param textOptions
     * @param i
     * @param chart
     * @param legendOption
     * @param group
     * @param textOptions
     * @param i
     * @param chart
     * @param legendOption
     * @param group
     * @param textOptions
     * @param i
     * @param chart
     * @param legendOption
     * @param group
     * @param textOptions
     * @param i
     */
    protected renderText(chart: Chart | AccumulationChart | BulletChart | StockChart, legendOption: LegendOptions, group: Element, textOptions: TextOption, i: number, legendIndex: number): void;
    /**
     * To render legend paging elements for chart and accumulation chart
     *
     * @param chart
     * @param bounds
     * @param textOption
     * @param legendGroup
     * @param chart
     * @param bounds
     * @param textOption
     * @param legendGroup
     * @param chart
     * @param bounds
     * @param textOption
     * @param legendGroup
     * @param chart
     * @param bounds
     * @param textOption
     * @param legendGroup
     */
    private renderPagingElements;
    private getPageHeight;
    /**
     * To translate legend pages for chart and accumulation chart
     *
     * @param pagingText
     * @param page
     * @param pageNumber
     * @param legend
     * @param pagingText
     * @param page
     * @param pageNumber
     * @param legend
     * @param pagingText
     * @param page
     * @param pageNumber
     * @param legend
     * @param pagingText
     * @param page
     * @param pageNumber
     * @param legend
     */
    protected translatePage(isCanvas: boolean, pagingText: Element, page: number, pageNumber: number, legend?: LegendSettingsModel): number;
    /**
     * To change legend pages for chart and accumulation chart
     *
     * @param event
     * @param pageUp
     * @param event
     * @param pageUp
     */
    protected changePage(event: Event, pageUp: boolean): void;
    /**
     * To hide the backward and forward arrow
     *
     * @param arrowElement
     */
    private hideArrow;
    /**
     * To show the  backward and forward arrow
     *
     * @param arrowElement
     */
    private showArrow;
    /**
     * To find legend elements id based on chart or accumulation chart
     *
     * @param option
     * @param prefix
     * @param count
     * @param option
     * @param prefix
     * @param count
     * @param option
     * @param prefix
     * @param count
     * @private
     */
    generateId(option: LegendOptions, prefix: string, count: number): string;
    /**
     * To show or hide trimmed text tooltip for legend.
     *
     * @param event
     * @returns {void}
     * @private
     */
    move(event: Event): void;
}
/**
 * Class for legend options
 *
 * @private
 */
export declare class LegendOptions {
    render: boolean;
    text: string;
    fill: string;
    shape: LegendShape;
    visible: boolean;
    type: ChartSeriesType | AccumulationType;
    textSize: Size;
    location: ChartLocation;
    url?: string;
    pointIndex?: number;
    seriesIndex?: number;
    markerShape?: ChartShape;
    markerVisibility?: boolean;
    textCollection?: string[];
    dashArray?: string;
    constructor(text: string, fill: string, shape: LegendShape, visible: boolean, type: ChartSeriesType | AccumulationType, url?: string, markerShape?: ChartShape, markerVisibility?: boolean, pointIndex?: number, seriesIndex?: number, dashArray?: string);
}
