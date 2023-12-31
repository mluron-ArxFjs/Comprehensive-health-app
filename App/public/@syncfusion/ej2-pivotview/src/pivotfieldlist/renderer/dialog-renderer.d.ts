import { PivotFieldList } from '../base/field-list';
import { Dialog } from '@syncfusion/ej2-popups';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { Tab } from '@syncfusion/ej2-navigations';
/**
 * Module to render Pivot Field List Dialog
 */
/** @hidden */
export declare class DialogRenderer {
    /** @hidden */
    parent: PivotFieldList;
    /** @hidden */
    parentElement: HTMLElement;
    /** @hidden */
    fieldListDialog: Dialog;
    /** @hidden */
    deferUpdateCheckBox: CheckBox;
    /** @hidden */
    adaptiveElement: Tab;
    private deferUpdateApplyButton;
    private deferUpdateCancelButton;
    private lastTabIndex;
    /** Constructor for render module
     *
     * @param {PivotFieldList} parent - Instance of field list.
     */
    constructor(parent: PivotFieldList);
    /**
     * Initialize the field list layout rendering
     *
     * @returns {void}
     * @private
     */
    render(): void;
    private renderStaticLayout;
    private renderDeferUpdateButtons;
    private createDeferUpdateButtons;
    private onCheckChange;
    private applyButtonClick;
    private onCloseFieldList;
    private renderFieldListDialog;
    private dialogOpen;
    /**
     * Called internally if any of the field added to axis.
     *
     * @param {string[]} selectedNodes - selectedNodes
     * @returns {void}
     * @hidden
     */
    updateDataSource(selectedNodes: string[]): void;
    private onDeferUpdateClick;
    private renderAdaptiveLayout;
    private tabSelect;
    private createCalculatedButton;
    private createAddButton;
    private createAxisTable;
    private showCalculatedField;
    private showFieldListDialog;
    /**  @hidden */
    onShowFieldList(): void;
    private removeFieldListIcon;
    private keyPress;
    private wireDialogEvent;
    private unWireDialogEvent;
    /**
     * Destroys the Field Table component.
     *
     * @function destroy
     * @returns {void}
     * @hidden
     */
    destroy(): void;
}
