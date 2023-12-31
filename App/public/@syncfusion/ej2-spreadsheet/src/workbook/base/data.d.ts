import { Workbook } from '../index';
import { SheetModel, RowModel, CellModel } from './index';
/**
 * Update data source to Sheet and returns Sheet
 *
 * @param {Workbook} context - Specifies the context.
 * @param {string} address - Specifies the address.
 * @param {boolean} columnWiseData - Specifies the bool value.
 * @param {boolean} valueOnly - Specifies the valueOnly.
 * @param {number[]} frozenIndexes - Specifies the freeze row and column start indexes, if it is scrolled.
 * @param {boolean} filterDialog - Specifies the bool value.
 * @param {string} formulaCellRef - Specifies the formulaCellRef.
 * @param {number} idx - Specifies the idx.
 * @param {boolean} skipHiddenRows - Specifies the skipHiddenRows.
 * @param {string} commonAddr - Specifies the common address for the address parameter specified with list of range separated by ','.
 * @param {number} dateValueForSpecificColIdx - Specify the dateValueForSpecificColIdx.
 * @returns {Promise<Map<string, CellModel> | Object[]>} - To get the data
 * @hidden
 */
export declare function getData(context: Workbook, address: string, columnWiseData?: boolean, valueOnly?: boolean, frozenIndexes?: number[], filterDialog?: boolean, formulaCellRef?: string, idx?: number, skipHiddenRows?: boolean, commonAddr?: string, dateValueForSpecificColIdx?: number, dateColData?: {
    [key: string]: Object;
}[]): Promise<Map<string, CellModel> | {
    [key: string]: CellModel;
}[]>;
/**
 * @hidden
 * @param {Workbook} context - Specifies the context.
 * @param {CellModel} cell - Specifies the cell model.
 * @param {number} rowIdx - Specifies the row index.
 * @param {number} colIdx - Specifies the column index.
 * @param {boolean} getIntValueFromDate - Specify the getIntValueFromDate.
 * @returns {string | Date} - To get the value format.
 */
export declare function getValueFromFormat(context: Workbook, cell: CellModel, rowIdx: number, colIdx: number, getIntValueFromDate?: boolean): string | Date;
/**
 * @hidden
 * @param {SheetModel | RowModel | CellModel} model - Specifies the sheet model.
 * @param {number} idx - Specifies the index value.
 * @returns {SheetModel | RowModel | CellModel} - To process the index
 */
export declare function getModel(model: (SheetModel | RowModel | CellModel)[], idx: number): SheetModel | RowModel | CellModel;
/**
 * @hidden
 * @param {SheetModel | RowModel | CellModel} model - Specifies the sheet model.
 * @param {boolean} isSheet - Specifies the bool value.
 * @param {Workbook} context - Specifies the Workbook.
 * @returns {void} - To process the index
 */
export declare function processIdx(model: (SheetModel | RowModel | CellModel)[], isSheet?: true, context?: Workbook): void;
