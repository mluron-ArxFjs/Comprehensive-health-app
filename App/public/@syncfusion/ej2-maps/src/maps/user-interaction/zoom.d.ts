import { Maps, ITouches } from '../../index';
import { Point, Rect } from '../utils/helper';
import { LayerSettings } from '../index';
import { PanDirection } from '../utils/enum';
/**
 * Zoom module used to process the zoom for maps
 */
export declare class Zoom {
    private maps;
    /** @private */
    toolBarGroup: Element;
    private currentToolbarEle;
    /** @private */
    zoomingRect: Rect;
    /** @private */
    selectionColor: string;
    private fillColor;
    private zoomElements;
    private panElements;
    /** @private */
    isPanning: boolean;
    /** @private */
    mouseEnter: boolean;
    /** @private */
    baseTranslatePoint: Point;
    private wheelEvent;
    private cancelEvent;
    /** @private */
    currentScale: number;
    /** @private */
    isTouch: boolean;
    /** @private */
    rectZoomingStart: boolean;
    /** @private */
    touchStartList: ITouches[] | TouchList;
    /** @private */
    touchMoveList: ITouches[] | TouchList;
    /** @private */
    previousTouchMoveList: ITouches[] | TouchList;
    /** @private */
    mouseDownPoints: Point;
    /** @private */
    mouseMovePoints: Point;
    /** @private */
    isDragZoom: boolean;
    /** @private */
    currentLayer: LayerSettings;
    private panColor;
    private clearTimeout;
    /** @private */
    zoomColor: string;
    /** @private */
    browserName: string;
    /** @private */
    isPointer: Boolean;
    private handled;
    private fingers;
    /** @private */
    firstMove: boolean;
    private isPan;
    private isZoomFinal;
    private isZoomSelection;
    private interaction;
    private lastScale;
    private pinchFactor;
    private startTouches;
    private zoomshapewidth;
    private index;
    /** @private */
    intersect: any[];
    private templateCount;
    private distanceX;
    private distanceY;
    /** @private */
    mouseDownLatLong: any;
    /** @private */
    mouseMoveLatLong: any;
    /** @private */
    isSingleClick: boolean;
    /** @private */
    layerCollectionEle: Element;
    constructor(maps: Maps);
    /**
     * To perform zooming for maps
     *
     * @param {Point} position - Specifies the position.
     * @param {number} newZoomFactor - Specifies the zoom factor.
     * @param {string} type - Specifies the type.
     * @returns {void}
     * @private
     */
    performZooming(position: Point, newZoomFactor: number, type: string): void;
    private calculateInitalZoomTranslatePoint;
    private triggerZoomEvent;
    private getTileTranslatePosition;
    /**
     * @private
     */
    performRectZooming(): void;
    private setInteraction;
    private updateInteraction;
    /**
     * @private
     */
    performPinchZooming(e: PointerEvent | TouchEvent): void;
    /**
     * @private
     */
    drawZoomRectangle(): void;
    /**
     * To animate the zooming process
     *
     * @param {Element} element - Specifies the element
     * @param {boolean} animate - Specifies the boolean value
     * @param {number} x - Specifies the x value
     * @param {number} y - Specifies the y value
     * @param {number} scale - Specifies the scale value
     * @returns {void}
     */
    private animateTransform;
    /**
     * @private
     */
    applyTransform(maps: Maps, animate?: boolean): void;
    private markerTranslates;
    /**
     * To translate the layer template elements
     *
     * @param {number} x - Specifies the x value
     * @param {number} y - Specifies the y value
     * @param {number} scale - Specifies the scale value
     * @param {Maps} maps - Specifies the maps value
     * @returns {void}
     * @private
     */
    processTemplate(x: number, y: number, scale: number, maps: Maps): void;
    private dataLabelTranslate;
    private markerTranslate;
    private markerLineAnimation;
    /**
     * @param {PanDirection} direction - Specifies the direction of the panning.
     * @param {number} xDifference - Specifies the distance moved in the horizontal direction.
     * @param {number} yDifference - Specifies the distance moved in the vertical direction.
     * @param {PointerEvent | TouchEvent | KeyboardEvent} mouseLocation - Specifies the pointer event argument.
     * @returns {void}
     * @private
     */
    panning(direction: PanDirection, xDifference: number, yDifference: number, mouseLocation?: PointerEvent | TouchEvent | KeyboardEvent): void;
    private toAlignSublayer;
    /**
     * @private
     */
    toolBarZooming(zoomFactor: number, type: string): void;
    /**
     * @private
     */
    createZoomingToolbars(): void;
    /**
     * @private
     */
    performToolBarAction(e: PointerEvent): void;
    /**
     * @param {string} type - Specifies the type.
     * @returns {void}
     * @private
     */
    performZoomingByToolBar(type: string): void;
    private panningStyle;
    private applySelection;
    /**
     * @private
     */
    showTooltip(e: PointerEvent): void;
    /**
     * @private
     */
    removeTooltip(): void;
    /**
     * @private
     */
    alignToolBar(): void;
    /**
     * @private
     */
    removeToolbarOpacity(factor: number, id: string): void;
    private setOpacity;
    private removeZoomOpacity;
    /**
     * @private
     */
    removeToolbarClass(zoomClassStyle: string, zoomInClassStyle: string, zoomOutClassStyle: string, panClassStyle: string, resetClassStyle: string): void;
    private removePanColor;
    private removeZoomColor;
    /**
     * To bind events.
     *
     * @param {Element} element - Specifies the element.
     * @param {any} process - Specifies the process.
     * @returns {void}
     * @private
     */
    wireEvents(element: Element, process: any): void;
    /**
     * @private
     */
    mapMouseWheel(e: WheelEvent): void;
    /**
     * @private
     */
    doubleClick(e: PointerEvent): void;
    /**
     * @private
     */
    mouseDownHandler(e: PointerEvent | TouchEvent): void;
    /**
     * @private
     */
    mouseMoveHandler(e: PointerEvent | TouchEvent): void;
    /**
     * @private
     */
    mouseUpHandler(e: PointerEvent | TouchEvent): void;
    /**
     * @private
     */
    mouseCancelHandler(e: PointerEvent): void;
    /**
     * To handle the click event for maps.
     *
     * @param {PointerEvent} e - Specifies the pointer event.
     * @returns {void}
     * @private
     */
    click(e: PointerEvent): void;
    /**
     * @private
     */
    getMousePosition(pageX: number, pageY: number): Point;
    /**
     * @private
     */
    addEventListener(): void;
    /**
     * @private
     */
    removeEventListener(): void;
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the zoom.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
