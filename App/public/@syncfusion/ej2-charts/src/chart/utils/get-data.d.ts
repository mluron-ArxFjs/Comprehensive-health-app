import { Chart } from '../chart';
import { PointData, AccPointData } from '../../common/utils/helper';
import { Series } from '../series/chart-series';
/**
 * To get the data on mouse move.
 *
 * @private
 */
export declare class ChartData {
    /** @private */
    chart: Chart;
    lierIndex: number;
    /** @private */
    currentPoints: PointData[] | AccPointData[];
    /** @private */
    previousPoints: PointData[] | AccPointData[];
    insideRegion: boolean;
    commonXvalues: number[];
    /**
     * Constructor for the data.
     *
     * @private
     */
    constructor(chart: Chart);
    /**
     * Method to get the Data.
     *
     * @private
     */
    getData(): PointData;
    isSelected(chart: Chart): boolean;
    private getRectPoint;
    /**
     * Checks whether the region contains a point
     */
    private checkRegionContainsPoint;
    /**
     * To check the point in threshold region for column and bar series
     *
     * @param {number} x X coordinate
     * @param {number} y Y coodinate
     * @param {Points} point point
     * @param {Rect} rect point rect region
     * @param {Series} series series
     */
    private isPointInThresholdRegion;
    /**
     * @private
     */
    getClosest(series: Series, value: number, xvalues?: number[]): number;
    private binarySearch;
    getClosestX(chart: Chart, series: Series, xvalues?: number[]): PointData;
    /**
     * Merge all visible series X values for shared tooltip (EJ2-47072)
     *
     * @param visibleSeries
     * @private
     */
    mergeXvalues(visibleSeries: Series[]): number[];
    commonXValue(visibleSeries: Series[]): number[];
    private getDistinctValues;
}
