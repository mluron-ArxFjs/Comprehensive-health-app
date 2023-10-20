import { Dialog, Popup } from '@syncfusion/ej2-popups';
/**
 * `Table` module is used to handle table actions.
 */
export declare class Table {
    ensureInsideTableList: boolean;
    element: HTMLElement;
    private rteID;
    private parent;
    private dlgDiv;
    private tblHeader;
    popupObj: Popup;
    editdlgObj: Dialog;
    private createTableButton;
    private contentModule;
    private rendererFactory;
    private quickToolObj;
    private resizeBtnStat;
    private pageX;
    private pageY;
    private curTable;
    private activeCell;
    private colIndex;
    private columnEle;
    private rowTextBox;
    private columnTextBox;
    private tableWidthNum;
    private tableCellPadding;
    private tableCellSpacing;
    private rowEle;
    private l10n;
    private moveEle;
    private helper;
    private dialogRenderObj;
    private currentColumnResize;
    private currentMarginLeft;
    private previousTableElement;
    private constructor();
    protected addEventListener(): void;
    protected removeEventListener(): void;
    private updateCss;
    private setCssClass;
    private selectionTable;
    private afterRender;
    private dropdownSelect;
    private UpdateCells;
    private keyDown;
    private tableModulekeyUp;
    private openDialog;
    private showDialog;
    private closeDialog;
    private onToolbarAction;
    private verticalAlign;
    private tableStyles;
    private insideList;
    private tabSelection;
    private tableArrowNavigation;
    private setBGColor;
    private hideTableQuickToolbar;
    private tableHeader;
    private editAreaClickHandler;
    private tableCellSelect;
    private tableMouseUp;
    private tableCellLeave;
    private tableCellClick;
    private tableInsert;
    private cellSelect;
    private tableMove;
    private resizeHelper;
    private tableResizeEleCreation;
    removeResizeElement(): void;
    private calcPos;
    private getPointX;
    private getPointY;
    private resizeStart;
    private removeHelper;
    private appendHelper;
    private setHelperHeight;
    private updateHelper;
    private calMaxCol;
    private resizing;
    private getCurrentTableWidth;
    private findFirstLastColCells;
    private convertPixelToPercentage;
    private cancelResizeAction;
    private resizeEnd;
    private resizeBtnInit;
    private addRow;
    private addColumn;
    private removeRowColumn;
    private removeTable;
    private renderDlgContent;
    private docClick;
    private drawTable;
    private editTable;
    private insertTableDialog;
    private tableCellDlgContent;
    private clearDialogObj;
    private createDialog;
    private customTable;
    private cancelDialog;
    private applyProperties;
    private tableDlgContent;
    /**
     * Destroys the ToolBar.
     *
     * @function destroy
     * @returns {void}
     * @hidden

     */
    destroy(): void;
    private moduleDestroy;
    /**
     * For internal use only - Get the module name.
     *
     * @returns {void}
     */
    private getModuleName;
}
