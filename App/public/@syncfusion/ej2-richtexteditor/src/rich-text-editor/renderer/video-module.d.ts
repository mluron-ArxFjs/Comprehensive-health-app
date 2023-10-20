import { IImageNotifyArgs } from '../base/interface';
import { Uploader } from '@syncfusion/ej2-inputs';
import { Dialog } from '@syncfusion/ej2-popups';
export declare class Video {
    element: HTMLElement;
    private rteID;
    private parent;
    dialogObj: Dialog;
    uploadObj: Uploader;
    private i10n;
    private inputUrl;
    private embedInputUrl;
    private uploadUrl;
    private contentModule;
    private rendererFactory;
    private quickToolObj;
    private vidResizeDiv;
    private vidDupPos;
    private resizeBtnStat;
    private videoEle;
    private prevSelectedVidEle;
    private isVideoUploaded;
    private isAllowedTypes;
    private pageX;
    private pageY;
    private dialogRenderObj;
    private deletedVid;
    private changedWidthValue;
    private changedHeightValue;
    private inputWidthValue;
    private inputHeightValue;
    private removingVideoName;
    private constructor();
    protected addEventListener(): void;
    protected removeEventListener(): void;
    private afterRender;
    private clearDialogObj;
    private onKeyUp;
    private undoStack;
    private onIframeMouseDown;
    private videoSize;
    private vidsizeInput;
    private insertSize;
    private resizeEnd;
    private resizeStart;
    private videoClick;
    private onCutHandler;
    private videoResize;
    private getPointX;
    private getPointY;
    private vidResizePos;
    private calcPos;
    private setAspectRatio;
    private pixToPerc;
    private vidDupMouseMove;
    private resizing;
    private cancelResizeAction;
    private resizeVidDupPos;
    private resizeBtnInit;
    private onToolbarAction;
    private onKeyDown;
    private openDialog;
    private showDialog;
    private closeDialog;
    private checkVideoBack;
    private checkVideoDel;
    private alignmentSelect;
    private deleteVideo;
    private videoRemovePost;
    private triggerPost;
    private onDocumentClick;
    private removeResizeEle;
    private onWindowResize;
    private break;
    private inline;
    private alignVideo;
    private editAreaClickHandler;
    private showVideoQuickToolbar;
    hideVideoQuickToolbar(): void;
    private isEmbedVidElem;
    private insertingVideo;
    insertVideo(e: IImageNotifyArgs): void;
    private urlPopup;
    private videoUpload;
    private checkExtension;
    private fileSelect;
    private cancelDialog;
    private insertVideoUrl;
    /**
     * Destroys the ToolBar.
     *
     * @method destroy
     * @returns {void}
     * @hidden

     */
    destroy(): void;
    /**
     * For internal use only - Get the module name.
     *
     * @returns {void}
     * @hidden
     */
    private getModuleName;
}
