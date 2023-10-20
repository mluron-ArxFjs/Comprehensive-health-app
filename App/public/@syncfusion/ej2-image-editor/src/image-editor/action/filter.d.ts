import { ImageEditor } from '../index';
export declare class Filter {
    private parent;
    private lowerContext;
    private adjustmentLevel;
    private tempAdjustmentLevel;
    private adjustmentValue;
    private isBrightnessAdjusted;
    private appliedFilter;
    constructor(parent: ImageEditor);
    destroy(): void;
    private addEventListener;
    private removeEventListener;
    private filter;
    private updatePrivateVariables;
    getModuleName(): string;
    private updateBrightFilter;
    private reset;
    private updateFinetunes;
    private initFilter;
    private updateAdj;
    private setTempFilterValue;
    private getDefaultCurrentFilter;
    private getFilterValue;
    private getSaturationFilterValue;
    private setFilterAdj;
    private setFilter;
    private setAdjustment;
    private setFilterValue;
    private setSaturationFilterValue;
    private updateFilter;
    private finetuneImage;
    private setCurrAdjValue;
    private getCurrentObj;
}