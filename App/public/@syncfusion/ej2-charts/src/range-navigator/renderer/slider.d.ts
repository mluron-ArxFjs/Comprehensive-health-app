import { RangeNavigator } from '../index';
import { DataPoint } from '../utils/helper';
import { VisibleRangeModel } from '../../chart/axis/axis';
import { Rect, SvgRenderer } from '@syncfusion/ej2-svg-base';
/**
 * Class for slider
 */
export declare class RangeSlider {
    private leftUnSelectedElement;
    private rightUnSelectedElement;
    private selectedElement;
    private leftSlider;
    private rightSlider;
    /** @private */
    control: RangeNavigator;
    /** @private */
    isDrag: boolean;
    private elementId;
    currentSlider: string;
    startX: number;
    endX: number;
    private sliderWidth;
    currentStart: number;
    currentEnd: number;
    selectedPeriod: string;
    private previousMoveX;
    private thumpPadding;
    private thumbColor;
    points: DataPoint[];
    leftRect: Rect;
    rightRect: Rect;
    midRect: Rect;
    private labelIndex;
    private thumbVisible;
    private thumpY;
    sliderY: number;
    /** @private */
    isIOS: Boolean;
    constructor(range: RangeNavigator);
    /**
     * Render Slider elements for range navigator.
     *
     * @param {RangeNavigator} range RangeNavigator instance
     */
    render(range: RangeNavigator): void;
    /**
     * Thumb creation performed.
     *
     * @param {SvgRenderer} render SvgRenderer
     * @param {Rect} bounds bounds
     * @param {Element} parent parent element
     * @param {string} id id
     * @param {Element} sliderGroup sliderGroup
     */
    createThump(render: SvgRenderer, bounds: Rect, parent: Element, id: string, sliderGroup?: Element): void;
    /**
     * Set slider value for range navigator.
     */
    setSlider(start: number, end: number, trigger: boolean, showTooltip: boolean, resize?: boolean): void;
    /**
     * Trigger changed event.
     *
     * @param {VisibleRangeModel} range axis visible range
     */
    triggerEvent(range: VisibleRangeModel): void;
    /**
     * @hidden
     */
    private addEventListener;
    /**
     * @hidden
     */
    private removeEventListener;
    /**
     * Move move handler perfomed here
     *
     * @hidden
     * @param {PointerEvent} e mouse event argument
     */
    mouseMoveHandler(e: PointerEvent | TouchEvent): void;
    /**
     * To get the range value
     *
     * @param {number} x xValue
     */
    private getRangeValue;
    /**
     * Moused down handler for slider perform here
     *
     * @param {PointerEvent} e mouse event argument
     */
    private mouseDownHandler;
    /**
     * To get the current slider element
     *
     * @param {string} id slider element id
     */
    private getCurrentSlider;
    /**
     * Mouse up handler performed here
     */
    private mouseUpHandler;
    /**
     * Allow Snapping perfomed here
     *
     * @param {RangeNavigator} control RangeNavigator instance
     * @param {number} start start
     * @param {number} end end
     * @param {boolean} trigger trigger
     * @param {boolean} tooltip tooltip
     * @private
     */
    setAllowSnapping(control: RangeNavigator, start: number, end: number, trigger: boolean, tooltip: boolean): void;
    /**
     * Animation Calculation for slider navigation.
     */
    performAnimation(start: number, end: number, control: RangeNavigator, animationDuration?: number): void;
    /**
     * Mouse Cancel Handler
     */
    private mouseCancelHandler;
    /**
     * Destroy Method Calling here
     */
    destroy(): void;
}
