import { PdfViewer } from '../index';
import { PdfViewerBase } from '../index';
import { AjaxHandler } from '../index';
/**
 * Print module
 */
export declare class Print {
    private pdfViewer;
    private pdfViewerBase;
    private printViewerContainer;
    private printCanvas;
    private printHeight;
    private printWidth;
    /**
     * @private
     */
    printRequestHandler: AjaxHandler;
    private frameDoc;
    private iframe;
    private printWindow;
    /**
     * @param viewer
     * @param base
     * @private
     */
    constructor(viewer: PdfViewer, base: PdfViewerBase);
    /**
     * Print the PDF document being loaded in the ejPdfViewer control.
     *
     * @returns void
     */
    print(): void;
    private createRequestForPrint;
    private renderFieldsForPrint;
    private createFormDesignerFields;
    /**
     * @param inputField
     * @param bounds
     * @param font
     * @param heightRatio
     * @param widthRatio
     * @param inputField
     * @param bounds
     * @param font
     * @param heightRatio
     * @param widthRatio
     * @private
     */
    applyPosition(inputField: any, bounds: any, font: any, heightRatio: number, widthRatio: number, isFormDesignerField?: boolean, zoomValue?: number, pageIndex?: number): any;
    private printWindowOpen;
    private createPrintLoadingIndicator;
    /**
     * @private
     */
    destroy(): void;
    /**
     * @private
     */
    getModuleName(): string;
}
