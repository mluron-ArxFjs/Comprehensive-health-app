import { NumberFormatType } from '../common/index';
import { Workbook } from '../base/index';
import { DateFormatCheckArgs } from '../common/index';
import { NumberFormatArgs } from './../index';
/**
 * Specifies number format.
 */
export declare class WorkbookNumberFormat {
    private parent;
    private localeObj;
    private decimalSep;
    private groupSep;
    constructor(parent: Workbook);
    private numberFormatting;
    /**
     * @hidden
     *
     * @param {Object} args - Specifies the args.
     * @returns {string} - to get formatted cell.
     */
    getFormattedCell(args: NumberFormatArgs): string;
    private isCustomType;
    private processCustomFill;
    private processCustomDateTime;
    private processCustomConditions;
    private processCustomAccounting;
    private processCustomText;
    private thousandSeparator;
    private getSeparatorCount;
    private processDigits;
    private processFormatWithSpace;
    private removeFormatColor;
    private processCustomNumberFormat;
    private processText;
    private processFormats;
    private autoDetectGeneralFormat;
    private isPercentageValue;
    private findSuffix;
    private applyNumberFormat;
    private isCustomFormat;
    private currencyFormat;
    private applyColor;
    private setCell;
    private percentageFormat;
    private accountingFormat;
    private getFormatForOtherCurrency;
    private checkAndProcessNegativeValue;
    private shortDateFormat;
    private longDateFormat;
    private timeFormat;
    private scientificHashFormat;
    private scientificFormat;
    private fractionFormat;
    private checkAndSetColor;
    private findDecimalPlaces;
    checkDateFormat(args: DateFormatCheckArgs): void;
    private checkCustomTimeFormat;
    private checkCustomDateFormat;
    private formattedBarText;
    private getFormattedNumber;
    /**
     * Adding event listener for number format.
     *
     * @returns {void} - Adding event listener for number format.
     */
    private addEventListener;
    /**
     * Removing event listener for number format.
     *
     * @returns {void} -  Removing event listener for number format.
     */
    private removeEventListener;
    /**
     * To Remove the event listeners.
     *
     * @returns {void} - To Remove the event listeners.
     */
    destroy(): void;
    /**
     * Get the workbook number format module name.
     *
     * @returns {string} - Get the module name.
     */
    getModuleName(): string;
}
/**
 * To Get the number built-in format code from the number format type.
 *
 * @param {string} type - Specifies the type of the number formatting.
 * @returns {string} - To Get the number built-in format code from the number format type.
 */
export declare function getFormatFromType(type: NumberFormatType): string;
/**
 * @hidden
 * @param {string} format -  Specidfies the format.
 * @returns {string} - To get type from format.
 */
export declare function getTypeFromFormat(format: string): string;
