import { Dialog, DialogModel } from '@syncfusion/ej2-popups';
import { IRichTextEditor } from '../base/interface';
/**
 * Dialog Renderer
 */
export declare class DialogRenderer {
    dialogObj: Dialog;
    private parent;
    constructor(parent?: IRichTextEditor);
    protected addEventListener(): void;
    protected removeEventListener(): void;
    /**
     * dialog render method
     *
     * @param {DialogModel} e - specifies the dialog model.
     * @returns {void}
     * @hidden

     */
    render(e: DialogModel): Dialog;
    private beforeOpen;
    private beforeOpenCallback;
    private open;
    private beforeClose;
    /**
     * dialog close method
     *
     * @param {Object} args - specifies the arguments.
     * @returns {void}
     * @hidden

     */
    close(args: Object): void;
    private moduleDestroy;
}
