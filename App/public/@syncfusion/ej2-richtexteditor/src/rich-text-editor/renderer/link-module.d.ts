import { IRenderer } from './../base/interface';
import { ServiceLocator } from './../services/service-locator';
/**
 * `Link` module is used to handle undo actions.
 */
export declare class Link {
    private rteID;
    private i10n;
    private parent;
    contentModule: IRenderer;
    private dialogObj;
    private checkBoxObj;
    serviceLocator: ServiceLocator;
    private rendererFactory;
    private quickToolObj;
    private dialogRenderObj;
    private constructor();
    protected addEventListener(): void;
    private onToolbarAction;
    protected removeEventListener(): void;
    private onIframeMouseDown;
    private updateCss;
    private setCssClass;
    private showLinkQuickToolbar;
    private hideLinkQuickToolbar;
    private editAreaClickHandler;
    private onKeyDown;
    private openDialog;
    private showDialog;
    private closeDialog;
    private clearDialogObj;
    private linkDialog;
    private insertlink;
    private isUrl;
    private checkUrl;
    private removeLink;
    private openLink;
    private getAnchorNode;
    private editLink;
    private cancelDialog;
    private onDocumentClick;
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
