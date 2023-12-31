import { Indexes } from '../../common/model/base';
import { IndexesModel } from '../../common/model/base-model';
import { Chart, SelectionPattern } from '../../chart';
import { AccumulationChart } from '../../accumulation-chart';
/**
 * Selection Module handles the selection for chart.
 *
 * @private
 */
export declare class BaseSelection {
    /** @private */
    styleId: string;
    protected unselected: string;
    protected control: Chart | AccumulationChart;
    constructor(control: Chart | AccumulationChart);
    /**
     * To create selection styles for series
     *
     * @returns {void}
     */
    protected seriesStyles(): void;
    /**
     * To create the pattern for series/points.
     *
     * @param chart
     * @param color
     * @param index
     * @param patternName
     * @param opacity
     * @param chart
     * @param color
     * @param index
     * @param patternName
     * @param opacity
     * @param chart
     * @param color
     * @param index
     * @param patternName
     * @param opacity
     * @param chart
     * @param color
     * @param index
     * @param patternName
     * @param opacity
     * @param chart
     * @param color
     * @param index
     * @param patternName
     * @param opacity
     */
    pattern(chart: Chart | AccumulationChart, color: string, index: number, patternName: SelectionPattern, opacity: number): string;
    /**
     * To load the pattern into svg
     *
     * @param chart
     * @param options
     * @param pattern
     * @param svgRenderer
     * @param chart
     * @param options
     * @param pattern
     * @param svgRenderer
     * @param chart
     * @param options
     * @param pattern
     * @param svgRenderer
     * @param chart
     * @param options
     * @param pattern
     * @param svgRenderer
     */
    private loadPattern;
    /**
     * To concat indexes
     *
     * @param userIndexes
     * @param localIndexes
     * @param userIndexes
     * @param localIndexes
     */
    protected concatIndexes(userIndexes: IndexesModel[], localIndexes: Indexes[]): Indexes[];
    /**
     * Selected points series visibility checking on legend click
     *
     * @param selectedIndexes
     */
    protected checkVisibility(selectedIndexes: Indexes[], chart?: Chart): boolean;
    /**
     * To add svg element style class
     *
     * @param element
     * @param className
     * @param element
     * @param className
     * @private
     */
    addSvgClass(element: Element, className: string): void;
    /**
     * To remove svg element style class
     *
     * @param element
     * @param className
     * @param element
     * @param className
     * @private
     */
    removeSvgClass(element: Element, className: string): void;
    /**
     * To get children from parent element
     *
     * @param parent
     */
    protected getChildren(parent: Element): Element[];
}
