import { ChartLocation } from '../../common/utils/helper';
import { Chart } from '../chart';
import { Series, Points } from './chart-series';
import { ChartData } from '../../chart/utils/get-data';
/**
 * Marker Module used to render the marker for line type series.
 */
export declare class MarkerExplode extends ChartData {
    private markerExplode;
    private isRemove;
    /** @private */
    elementId: string;
    /**
     * Constructor for the marker module.
     *
     * @private
     */
    constructor(chart: Chart);
    /**
     * @hidden
     */
    addEventListener(): void;
    /**
     * @hidden
     */
    removeEventListener(): void;
    /**
     * @hidden
     */
    private mouseUpHandler;
    /**
     * @hidden
     */
    private mouseMoveHandler;
    private markerMove;
    private animationDuration;
    private drawTrackBall;
    /**
     * Animates the series.
     *
     * @param  {Series} series - Defines the series to animate.
     * @returns {void}
     */
    doAnimation(series: Series, point: Points, endAnimate?: boolean): void;
    /**
     * Animation Effect Calculation End
     *
     * @private
     */
    trackballAnimate(elements: Element, delays: number, durations: number, series: Series, pointIndex: number, point: ChartLocation, isLabel: boolean, endAnimate: boolean): void;
    /**
     * @param series
     * @param point
     * @param fadeOut
     * @param series
     * @param point
     * @param fadeOut
     * @param series
     * @param point
     * @param fadeOut
     * @hidden
     */
    removeHighlightedMarker(series?: Series, point?: Points, fadeOut?: boolean): void;
}
