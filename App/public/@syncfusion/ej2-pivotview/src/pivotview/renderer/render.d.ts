import { PivotEngine } from '../../base/engine';
import { PivotView } from '../base/pivotview';
import { ColumnModel } from '@syncfusion/ej2-grids';
import { GridSettingsModel } from '../model/gridsettings-model';
import { OlapEngine } from '../../base/olap/engine';
/**
 * Module to render PivotGrid control
 */
/** @hidden */
export declare class Render {
    /** @hidden */
    parent: PivotView;
    /** @hidden */
    engine: PivotEngine | OlapEngine;
    /** @hidden */
    gridSettings: GridSettingsModel;
    /** @hidden */
    rowStartPos: number;
    /** @hidden */
    maxIndent: number;
    /** @hidden */
    resColWidth: number;
    /** @hidden */
    isOverflows: boolean;
    /** @hidden */
    isAutoFitEnabled: boolean;
    /** @hidden */
    pivotColumns: ColumnModel[];
    /** @hidden */
    indentCollection: {
        [key: number]: number;
    };
    private formatList;
    private colPos;
    private colGrandPos;
    private rowGrandPos;
    private lastSpan;
    private aggMenu;
    private field;
    private fieldCaption;
    private lvlCollection;
    private hierarchyCollection;
    private lvlPosCollection;
    private hierarchyPosCollection;
    private position;
    private measurePos;
    private maxMeasurePos;
    private hierarchyCount;
    private actualText;
    private timeOutObj;
    /** Constructor for render module
     *
     * @param {PivotView} parent - Instance of pivot table.
     */
    constructor(parent: PivotView);
    /** @hidden */
    render(refreshRequired?: boolean): void;
    private initProperties;
    private refreshHeader;
    /** @hidden */
    bindGrid(parent: PivotView, isEmpty: boolean): void;
    private headerRefreshed;
    private beforeExcelExport;
    private rowSelected;
    private rowDeselected;
    private cellSelected;
    private cellSelecting;
    private cellDeselected;
    private queryCellInfo;
    private headerCellInfo;
    private excelHeaderQueryCellInfo;
    private pdfQueryCellInfo;
    private excelQueryCellInfo;
    private pdfHeaderQueryCellInfo;
    private pdfExportComplete;
    private excelExportComplete;
    private dataBound;
    private setFocusOnLastCell;
    private getCellElement;
    private contextMenuOpen;
    private getMenuItem;
    private contextMenuClick;
    private validateColumnTotalcell;
    private validateField;
    private updateAggregate;
    private injectGridModules;
    /** @hidden */
    updateGridSettings(): void;
    private updatePivotColumns;
    private clearColumnSelection;
    private appendValueSortIcon;
    private onResizeStop;
    private setGroupWidth;
    /** @hidden */
    selected(): void;
    private onSelect;
    private rowCellBoundEvent;
    private onOlapRowCellBoundEvent;
    private columnCellBoundEvent;
    private updateWrapper;
    private onOlapColumnCellBoundEvent;
    private isSpannedCell;
    private onHyperCellClick;
    private getRowStartPos;
    private frameDataSource;
    /** @hidden */
    frameEmptyData(): any[];
    /** @hidden */
    calculateColWidth(colCount: number): number;
    /** @hidden */
    resizeColWidth(colCount: number): number;
    /** @hidden */
    calculateGridWidth(): number | string;
    /** @hidden */
    calculateGridHeight(elementCreated?: boolean): number | string;
    /**
     * It used to frame stacked headers.
     *
     * @returns {ColumnModel[]} - Returns grid columns.
     * @hidden
     */
    frameStackedHeaders(): ColumnModel[];
    private configLastColumnWidth;
    /** @hidden */
    setSavedWidth(column: string, width: number): number;
    /** @hidden */
    frameEmptyColumns(): ColumnModel[];
    /** @hidden */
    getFormatList(): {
        [key: string]: string;
    };
    private getValidHeader;
    private excelColumnEvent;
    private pdfColumnEvent;
    private excelRowEvent;
    private pdfRowEvent;
    private excelDataBound;
    private exportHeaderEvent;
    private exportContentEvent;
    private unWireEvents;
    private wireEvents;
}
