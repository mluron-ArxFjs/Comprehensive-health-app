import { Component, EmitType } from '@syncfusion/ej2-base';
import { INotifyPropertyChanged, ModuleDeclaration } from '@syncfusion/ej2-base';
import { Internationalization } from '@syncfusion/ej2-base';
import { SvgRenderer, Rect, Size } from '@syncfusion/ej2-svg-base';
import { Query } from '@syncfusion/ej2-data';
import { OrientationType, TickPosition, LabelsPlacement, TextPosition, FeatureType, TargetType } from './utils/enum';
import { AnimationModel, BorderModel } from '../common/model/base-model';
import { MarginModel } from '../common/model/base-model';
import { BulletChartModel } from './bullet-chart-model';
import { Data } from '../common/model/data';
import { BulletChartAxis } from './renderer/bullet-axis';
import { ScaleGroup } from './renderer/scale-render';
import { BulletTooltip } from './user-interaction/tooltip';
import { IPrintEventArgs } from '../chart/model/chart-interface';
import { ExportType } from '../common/utils/enum';
import { AccumulationChart } from '../accumulation-chart/accumulation';
import { Chart } from '../chart/chart';
import { ChartTheme } from '../chart/utils/enum';
import { RangeNavigator } from '../range-navigator/range-navigator';
import { Range } from './model/bullet-base';
import { BulletChartLegendSettingsModel } from '../bullet-chart/model/bullet-base-model';
import { IBulletMouseEventArgs, IBulletLegendRenderEventArgs } from '../bullet-chart/model/bullet-interface';
import { BulletChartLegend } from '../bullet-chart/legend/legend';
import { BulletTooltipSettingsModel, RangeModel } from './model/bullet-base-model';
import { MajorTickLinesSettingsModel, MinorTickLinesSettingsModel } from './model/bullet-base-model';
import { BulletLabelStyleModel, BulletDataLabelModel } from './model/bullet-base-model';
import { IBulletStyle, IBulletchartTooltipEventArgs, IBulletLoadedEventArgs } from './model/bullet-interface';
import { PdfPageOrientation } from '@syncfusion/ej2-pdf-export';
/**
 * bullet chart
 */
export declare class BulletChart extends Component<HTMLElement> implements INotifyPropertyChanged {
    /**
     * `bulletTooltipModule` is used to manipulate and add tooltip to the feature bar.
     */
    bulletTooltipModule: BulletTooltip;
    /**
     * `bulletChartLegendModule` is used to manipulate and add legend in accumulation chart.
     */
    bulletChartLegendModule: BulletChartLegend;
    /**
     * The width of the bullet chart as a string accepts input as both like '100px' or '100%'.
     * If specified as '100%, bullet chart renders to the full width of its parent element.
     *
     * @default null
     * @aspDefaultValueIgnore
     */
    width: string;
    /**
     * The height of the bullet chart as a string accepts input both as '100px' or '100%'.
     * If specified as '100%, bullet chart renders to the full height of its parent element.
     *
     * @default null
     * @aspDefaultValueIgnore
     */
    height: string;
    /**
     * The locale of the bullet chart as a string.
     *
     * @default null
     * @aspDefaultValueIgnore
     */
    locale: string;
    /**
     * Options for customizing major tick lines.
     */
    majorTickLines: MajorTickLinesSettingsModel;
    /**
     * Options for customizing minor tick lines.
     */
    minorTickLines: MinorTickLinesSettingsModel;
    /**
     * Specifies the minimum range of an scale.
     *
     * @default null
     */
    minimum: number;
    /**
     * Specifies the maximum range of an scale.
     *
     * @default null
     */
    maximum: number;
    /**
     * Specifies the interval for an scale.
     *
     * @default null
     */
    interval: number;
    /**
     * specifies the interval of minor ticks.
     *
     * @default 4
     */
    minorTicksPerInterval: number;
    /**
     * Options for customizing labels
     */
    labelStyle: BulletLabelStyleModel;
    /**
     * Options for customizing values labels.
     */
    categoryLabelStyle: BulletLabelStyleModel;
    /**
     * Specifies the format of the bullet chart axis labels.
     *
     * @default ''
     */
    labelFormat: string;
    /**
     * Specifies the title of the bullet chart.
     *
     * @default ''
     */
    title: string;
    /**
     * Options for customizing the title styles of the bullet chart.
     */
    titleStyle: BulletLabelStyleModel;
    /**
     * Specifies the sub title of the bullet chart.
     *
     * @default ''
     */
    subtitle: string;
    /**
     * Options for customizing the sub title styles of the bullet chart.
     */
    subtitleStyle: BulletLabelStyleModel;
    /**
     * Orientation of the scale.
     *
     * @default 'Horizontal'
     */
    orientation: OrientationType;
    /**
     * Options for customizing the color and width of the chart border.
     */
    border: BorderModel;
    /**
     * Options for customizing the tooltip of the BulletChart.
     */
    tooltip: BulletTooltipSettingsModel;
    /**
     * provides Qualitative ranges of the bullet chart.
     */
    ranges: RangeModel[];
    /**
     * specifies the axis label position of the bullet chart.
     *
     * @default 'Outside'
     */
    labelPosition: LabelsPlacement;
    /**
     * specifies the tick position of the bullet chart.
     *
     * @default 'Outside'
     */
    tickPosition: TickPosition;
    /**
     * Sets the title position of bullet chart.
     *
     * @default 'Top'.
     */
    titlePosition: TextPosition;
    /**
     * If set to true, the axis will render at the opposite side of its default position.
     *
     * @default false
     */
    opposedPosition: boolean;
    /**
     * Specifies the theme for the bullet chart.
     *
     * @default 'Material'
     */
    theme: ChartTheme;
    /**
     * Options for customizing animation of the feature bar.
     */
    animation: AnimationModel;
    /**
     * Options for customizing data label of the feature bar.
     */
    dataLabel: BulletDataLabelModel;
    /**
     * Options for customizing the legend of the bullet chart.
     */
    legendSettings: BulletChartLegendSettingsModel;
    /**
     * default value for enableGroupSeparator.
     *
     * @default false
     */
    enableGroupSeparator: boolean;
    /**
     *  Options to customize left, right, top and bottom margins of the bullet chart.
     */
    margin: MarginModel;
    /**
     * Options for customizing comparative bar color bullet chart.
     *
     * @default 5
     */
    targetWidth: number;
    /**
     * Default stroke of comparative measure.
     *
     * @default '#191919'
     */
    targetColor: string;
    /**
     * Options for customizing feature bar height of the bullet chart.
     *
     * @default 6
     */
    valueHeight: number;
    /**
     * Default stroke color of feature measure.
     *
     * @default null
     */
    valueFill: string;
    /**
     * Options for customizing the color and width of the feature bar border.
     */
    valueBorder: BorderModel;
    /**
     * default value of multiple data bullet chart.
     *
     * @isdatamanager false
     * @default null
     */
    dataSource: Object;
    /**
     * It defines the query for the data source.
     *
     * @default null
     */
    query: Query;
    /**
     * It defines the category for the data source.
     *
     * @default null
     */
    categoryField: string;
    /**
     * Default type on feature measure.
     *
     * @default 'Rect'
     */
    type: FeatureType;
    /**
     * The DataSource field that contains the value value.
     *
     * @default ''
     */
    valueField: string;
    /**
     * The DataSource field that contains the target value.
     *
     * @default ''
     */
    targetField: string;
    /**
     * The DataSource field that contains the target value.
     *
     * @default ['Rect', 'Cross', 'Circle']
     */
    targetTypes: TargetType[];
    /**
     * TabIndex value for the bullet chart.
     *
     * @default 1
     */
    tabIndex: number;
    /**
     * Triggers before the bulletchart tooltip is rendered.
     *
     * @event tooltipRender
     */
    tooltipRender: EmitType<IBulletchartTooltipEventArgs>;
    /**
     * Triggers before bullet chart load.
     *
     * @event load
     */
    load: EmitType<IBulletLoadedEventArgs>;
    /**
     * Triggers after the bullet chart rendering
     *
     * @event loaded
     */
    loaded: EmitType<IBulletLoadedEventArgs>;
    /**
     * Triggers on clicking the chart.
     *
     * @event bulletChartMouseClick
     */
    bulletChartMouseClick: EmitType<IBulletMouseEventArgs>;
    /**
     * Triggers before the legend is rendered.
     *
     * @event legendRender

     */
    legendRender: EmitType<IBulletLegendRenderEventArgs>;
    /**
     * Triggers before the prints gets started.
     *
     * @event beforePrint
     */
    beforePrint: EmitType<IPrintEventArgs>;
    /** @private */
    renderer: SvgRenderer;
    /** @private */
    svgObject: HTMLElement;
    /** @private */
    intl: Internationalization;
    /** @private */
    bulletAxis: BulletChartAxis;
    /** @private */
    scale: ScaleGroup;
    /** @private */
    availableSize: Size;
    /** @private */
    private bulletid;
    /** @private */
    delayRedraw: boolean;
    /** @private */
    dataModule: Data;
    /** @private */
    animateSeries: boolean;
    /** @private */
    containerWidth: number;
    /** @private */
    resizeBound: any;
    /** @private */
    private resizeTo;
    /** @private */
    containerHeight: number;
    /** @private */
    private dataCount;
    /** @private */
    redraw: boolean;
    /** @private */
    private titleCollections;
    /** @private */
    private subTitleCollections;
    /** @private */
    initialClipRect: Rect;
    /** @private */
    bulletChartRect: Rect;
    /** @private */
    isTouch: boolean;
    /** @private */
    mouseX: number;
    /** @private */
    mouseY: number;
    private padding;
    /** @private */
    leftSize: number;
    /** @private */
    rightSize: number;
    /** @private */
    topSize: number;
    /** @private */
    bottomSize: number;
    /** @private */
    maxLabelSize: Size;
    maxTitleSize: Size;
    /** @private */
    themeStyle: IBulletStyle;
    /** @private */
    rangeCollection: number[];
    /** @private */
    intervalDivs: number[];
    /** @private */
    format: Function;
    private isLegend;
    /**
     * Gets the current visible ranges of the bullet Chart.
     *
     * @hidden
     */
    visibleRanges: Range[];
    /**
     * Constructor for creating the bullet chart
     *
     * @hidden
     */
    constructor(options?: BulletChartModel, element?: string | HTMLElement);
    /**
     * Initialize the event handler.
     */
    protected preRender(): void;
    /**
     * To initialize the private variables
     */
    private initPrivateValues;
    /**
     * Method to set culture for BulletChart
     */
    private setCulture;
    /**
     * To Initialize the bullet chart rendering.
     */
    protected render(): void;
    /**
     * Theming for bullet chart
     */
    private setTheme;
    private findRange;
    protected getActualDesiredIntervalsCount(availableSize: Size): number;
    /**
     * Numeric Nice Interval for the axis.
     *
     * @private
     * @returns {number} calculateNumericNiceInterval.
     */
    protected calculateNumericNiceInterval(delta: number): number;
    /**
     * To set the left and top position for data label template for center aligned bulletchart
     */
    private setSecondaryElementPosition;
    /**
     * Method to create SVG element.
     */
    createSvg(chart: BulletChart): void;
    /**
     * Creating a background element to the svg object
     */
    private renderChartBackground;
    /**
     * Rendering the bullet elements
     */
    private renderBulletElements;
    /**
     * To render the legend
     */
    private renderBulletLegend;
    /**
     * Handles the bullet chart resize.
     *
     * @returns {boolean}
     * @private
     */
    private bulletResize;
    /**
     * Process the data values of feature and comparative measure bar
     */
    private bindData;
    /**
     * Rendering the feature and comaparative measure bars
     */
    private drawMeasures;
    /**
     * To calculate the title bounds
     */
    private calculatePosition;
    /**
     * Calculate the rect values based on title position.
     *
     * @returns {void}
     * @private
     */
    getBulletBounds(maxTitlteWidth: number, titleHeight: number, subTitleHeight: number, margin: MarginModel): Rect;
    /**
     * Calculate maximum label width for category values.
     *
     * @private
     * @returns {Size} To get a label width
     */
    getMaxLabelWidth(): Size;
    private calculateVisibleElements;
    /**
     * To render the title of the bullet chart
     */
    private renderBulletChartTitle;
    /**
     * To render the data label for bullet chart
     */
    private renderDataLabel;
    private findHorizontalAlignment;
    private findVerticalAlignment;
    /**
     * To render the sub title of the bullet chart
     */
    private renderBulletChartSubTitle;
    /**
     * To calculate the available size and width of the container
     */
    private calculateAvailableSize;
    removeSvg(): void;
    protected getPersistData(): string;
    /** Wire, UnWire and Event releated calculation Started here */
    /**
     * Method to un-bind events for bullet chart
     */
    private unWireEvents;
    /**
     * Method to bind events for bullet chart
     */
    private wireEvents;
    private setStyle;
    /**
     * Handles the mouse move on the bullet chart.
     *
     * @private
     */
    private bulletMouseMove;
    /**
     * To find mouse x, y for aligned bullet chart element svg position
     */
    private setPointMouseXY;
    /**
     * Handles the mouse leave on the bullet chart.
     *
     * @private
     */
    bulletMouseLeave(e: PointerEvent): void;
    /**
     * Handles the touch event.
     *
     * @returns {boolean} Touchh event.
     * @private
     */
    private isTouchEvent;
    /**
     * Handles the mouse down on the bullet chart.
     *
     * @private
     */
    private bulletMouseDown;
    /**
     * Handles the mouse click on bullet chart.
     *
     * @returns {boolean} Mouse click of bullet chart.
     * @private
     */
    bulletChartOnMouseClick(e: PointerEvent | TouchEvent): boolean;
    /**
     * Handles the print method for bullet chart control.
     */
    print(id?: string[] | string | Element): void;
    /**
     * Handles the export method for bullet chart control.
     *
     * @param {ExportType} type Type of the export.
     * @param {string} fileName File name for exporting.
     * @param {PdfPageOrientation} orientation Orientation of the export.
     * @param {Chart | AccumulationChart | RangeNavigator | BulletChart} controls To mention the exporting chart.
     * @param {number} width Width of the export.
     * @param {number} height Height of the export.
     */
    export(type: ExportType, fileName: string, orientation?: PdfPageOrientation, controls?: (Chart | AccumulationChart | RangeNavigator | BulletChart)[], width?: number, height?: number, isVertical?: boolean): void;
    /**
     * Called internally if any of the property value changed.
     *
     * @private
     */
    onPropertyChanged(newProp: BulletChartModel, oldProp: BulletChartModel): void;
    /**
     * To provide the array of modules needed for bullet chart rendering
     *
     * @private
     * @returns {ModuleDeclaration[]} requiredModules
     */
    requiredModules(): ModuleDeclaration[];
    getModuleName(): string;
    /**
     * To destroy the widget
     *
     * @returns {void} Destroy method
     * @member of BulletChart
     */
    destroy(): void;
}
