import { IFontMapping } from './interface';
import { AccumulationTheme } from '../../accumulation-chart/model/enum';
import { ChartTheme } from '../../chart/utils/enum';
import { IThemeStyle, IScrollbarThemeStyle } from '../../index';
/**
 * Specifies Chart Themes
 */
export declare namespace Theme {
    /** @private */
    const stockEventFont: IFontMapping;
}
/** @private */
export declare function getSeriesColor(theme: ChartTheme | AccumulationTheme): string[];
/** @private */
export declare function getThemeColor(theme: ChartTheme | AccumulationTheme, canvas: boolean): IThemeStyle;
/** @private */
export declare function getScrollbarThemeColor(theme: ChartTheme): IScrollbarThemeStyle;
