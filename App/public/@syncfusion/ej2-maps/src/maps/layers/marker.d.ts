import { Maps } from '../../index';
import { LayerSettings, MarkerClusterData } from '../index';
/**
 * Marker class
 */
export declare class Marker {
    private maps;
    private isMarkerExplode;
    private trackElements;
    private markerSVGObject;
    /**
     * @private
     */
    sameMarkerData: MarkerClusterData[];
    constructor(maps: Maps);
    markerRender(maps: Maps, layerElement: Element, layerIndex: number, factor: number, type: string): void;
    /**
     * To find zoom level for individual layers like India, USA.
     *
     * @param {number} mapWidth - Specifies the width of the maps
     * @param {number} mapHeight - Specifies the height of the maps
     * @param {number} maxZoomFact - Specifies the maximum zoom factor
     * @returns {number} - Returns the scale factor
     */
    private calculateIndividualLayerMarkerZoomLevel;
    /**
     * To calculate center position and factor value dynamically
     *
     * @param {LayerSettings[]} layersCollection - Specifies the layer settings instance.
     * @returns {void}
     * @private
     */
    calculateZoomCenterPositionAndFactor(layersCollection: LayerSettings[]): void;
    /**
     * To check and trigger marker click event
     * @param {PointerEvent} e - Specifies the pointer event argument.
     * @returns {void}
     * @private
     */
    markerClick(e: PointerEvent): void;
    /**
     * To check and trigger Cluster click event
     * @param {PointerEvent} e - Specifies the pointer event argument.
     * @returns {void}
     * @private
     */
    markerClusterClick(e: PointerEvent): void;
    /**
     * To get marker from target id
     *
     * @param {string} target - Specifies the target
     * @returns {string} - Returns the string
     */
    private getMarker;
    /**
     * To check and trigger marker move event
     *
     * @param {PointerEvent} e - Specifies the pointer event argument.
     * @returns {void}
     * @private
     */
    markerMove(e: PointerEvent): void;
    /**
     * To check and trigger cluster move event
     *
     * @param {PointerEvent} e - Specifies the pointer event argument.
     * @returns {void}
     * @private
     */
    markerClusterMouseMove(e: PointerEvent): void;
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name
     */
    protected getModuleName(): string;
    /**
     * To destroy the layers.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
