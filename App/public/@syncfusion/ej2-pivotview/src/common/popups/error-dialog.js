import { createElement, remove } from '@syncfusion/ej2-base';
import * as cls from '../base/css-constant';
import { Dialog } from '@syncfusion/ej2-popups';
/**
 * `ErrorDialog` module to create error dialog.
 */
/** @hidden */
var ErrorDialog = /** @class */ (function () {
    /**
     * Constructor for the dialog action.
     *
     * @param {PivotCommon} parent - parent.
     * @hidden
     */
    function ErrorDialog(parent) {
        this.parent = parent;
    }
    /**
     * Creates the error dialog for the unexpected action done.
     *
     * @function createErrorDialog
     * @param {string} title - title.
     * @param {string} description - description.
     * @param {HTMLElement} target - target.
     * @returns {void}
     * @hidden
     */
    ErrorDialog.prototype.createErrorDialog = function (title, description, target) {
        var errorDialog = createElement('div', {
            id: this.parent.parentID + '_ErrorDialog',
            className: cls.ERROR_DIALOG_CLASS
        });
        this.parent.element.appendChild(errorDialog);
        var zIndex = target ? Number(target.style.zIndex) + 1 : (this.parent.moduleName === 'pivotfieldlist' &&
            this.parent.renderMode === 'Popup' && this.parent.control ? this.parent.control.dialogRenderer.fieldListDialog.zIndex + 1 :
            (this.parent.moduleName === 'pivotfieldlist' && this.parent.renderMode === 'Fixed' && this.parent.control ? 1000002 :
                (this.parent.moduleName === 'pivotview' && this.parent.control ? 1000002 : 1000001)));
        this.errorPopUp = new Dialog({
            animationSettings: { effect: 'Fade' },
            allowDragging: false,
            header: title,
            content: description,
            isModal: true,
            visible: true,
            showCloseIcon: true,
            enableRtl: this.parent.enableRtl,
            enableHtmlSanitizer: this.parent.enableHtmlSanitizer,
            width: 'auto',
            height: 'auto',
            zIndex: zIndex,
            position: { X: 'center', Y: 'center' },
            buttons: [
                {
                    click: this.closeErrorDialog.bind(this),
                    buttonModel: { cssClass: cls.OK_BUTTON_CLASS + (this.parent.cssClass ? (' ' + this.parent.cssClass) : ''), content: this.parent.localeObj.getConstant('ok'), isPrimary: true }
                }
            ],
            cssClass: this.parent.cssClass,
            closeOnEscape: true,
            target: document.body,
            close: this.removeErrorDialog.bind(this)
        });
        this.errorPopUp.isStringTemplate = true;
        this.errorPopUp.appendTo(errorDialog);
    };
    ErrorDialog.prototype.closeErrorDialog = function () {
        this.errorPopUp.close();
    };
    ErrorDialog.prototype.removeErrorDialog = function () {
        if (this.errorPopUp && !this.errorPopUp.isDestroyed) {
            this.errorPopUp.destroy();
        }
        if (document.getElementById(this.parent.parentID + '_ErrorDialog')) {
            remove(document.getElementById(this.parent.parentID + '_ErrorDialog'));
        }
    };
    return ErrorDialog;
}());
export { ErrorDialog };
