import { TreeMap } from '../../index';
import { ExportType } from '../utils/enum';
import { PdfPageOrientation } from '@syncfusion/ej2-pdf-export';
/**
 * PdfExport module handles the export to pdf functionality for treemap.
 *
 * @hidden
 */
export declare class PdfExport {
    /**
     * Constructor for Maps
     *
     * @param {TreeMap} control - Specifies the treemap instance
     */
    constructor(control: TreeMap);
    /**
     * This method is used to perform the export functionality for the rendered treemap.
     *
     * @param {TreeMap} treeMap - Specifies the treemap instance.
     * @param {ExportType} type - Specifies the type of the document.
     * @param {string} fileName - Specifies the name of the document.
     * @param {PdfPageOrientation} orientation - Specifies the orientation of the PDF document to export the treemap.
     * @param {boolean} allowDownload - Specifies whether to download the document or not.
     * @returns {Promise} - Returns the string.
     * @private
     */
    export(treeMap: TreeMap, type: ExportType, fileName: string, orientation?: PdfPageOrientation, allowDownload?: boolean): Promise<string>;
    protected getModuleName(): string;
    /**
     * To destroy the PdfExport.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
