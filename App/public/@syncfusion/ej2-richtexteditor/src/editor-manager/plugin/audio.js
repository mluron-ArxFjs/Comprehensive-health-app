import { createElement, isNullOrUndefined as isNOU, detach, addClass, Browser } from '@syncfusion/ej2-base';
import * as CONSTANT from './../base/constant';
import * as classes from './../base/classes';
import { InsertHtml } from './inserthtml';
/**
 * Audio internal component
 *
 * @hidden

 */
var AudioCommand = /** @class */ (function () {
    /**
     * Constructor for creating the Audio plugin
     *
     * @param {EditorManager} parent - specifies the parent element
     * @hidden

     */
    function AudioCommand(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    AudioCommand.prototype.addEventListener = function () {
        this.parent.observer.on(CONSTANT.AUDIO, this.audioCommand, this);
    };
    /**
     * audioCommand method
     *
     * @param {IHtmlItem} e - specifies the element
     * @returns {void}
     * @hidden

     */
    AudioCommand.prototype.audioCommand = function (e) {
        var selectNode;
        var value = e.value.toString().toLowerCase();
        if (value === 'inline' || value === 'break' || value === 'audioremove') {
            selectNode = e.item.selectNode[0];
        }
        switch (value) {
            case 'audio':
            case 'audioreplace':
                this.createAudio(e);
                break;
            case 'inline':
                selectNode.removeAttribute('class');
                selectNode.closest('.' + classes.CLASS_AUDIO_WRAP).style.display = 'inline-block';
                addClass([selectNode], [classes.CLASS_AUDIO, classes.CLASS_AUDIO_INLINE, classes.CLASS_AUDIO_FOCUS]);
                this.callBack(e);
                break;
            case 'break':
                selectNode.removeAttribute('class');
                selectNode.closest('.' + classes.CLASS_AUDIO_WRAP).style.display = 'block';
                addClass([selectNode], [classes.CLASS_AUDIO_BREAK, classes.CLASS_AUDIO, classes.CLASS_AUDIO_FOCUS]);
                this.callBack(e);
                break;
            case 'audioremove':
                detach(selectNode);
                this.callBack(e);
                break;
        }
    };
    AudioCommand.prototype.createAudio = function (e) {
        var _this = this;
        var isReplaced = false;
        var wrapElement;
        if (!isNOU(e.item.selectParent) && e.item.selectParent[0].classList &&
            (e.item.selectParent[0].classList.contains(classes.CLASS_CLICK_ELEM) ||
                e.item.selectParent[0].classList.contains(classes.CLASS_AUDIO_WRAP))) {
            var audioEle = e.item.selectParent[0].querySelector('source');
            this.setStyle(audioEle, e);
            isReplaced = true;
        }
        else {
            wrapElement = createElement('span', { className: classes.CLASS_AUDIO_WRAP, attrs: { contentEditable: 'false', title: e.item.fileName } });
            var audElement = createElement('audio', { className: classes.CLASS_AUDIO + ' ' + classes.CLASS_AUDIO_INLINE, attrs: { controls: '' } });
            var sourceElement = createElement('source');
            var clickElement = createElement('span', { className: classes.CLASS_CLICK_ELEM });
            this.setStyle(sourceElement, e);
            audElement.appendChild(sourceElement);
            clickElement.appendChild(audElement);
            wrapElement.appendChild(clickElement);
            if (!isNOU(e.item.selection)) {
                e.item.selection.restore();
            }
            InsertHtml.Insert(this.parent.currentDocument, wrapElement, this.parent.editableElement);
            if (wrapElement.nextElementSibling === null) {
                var insertElem = createElement('br');
                wrapElement.parentNode.insertBefore(insertElem, wrapElement.nextSibling);
            }
        }
        if (e.callBack && (isNOU(e.selector) || !isNOU(e.selector) && e.selector !== 'pasteCleanupModule')) {
            var selectedNode = this.parent.nodeSelection.getSelectedNodes(this.parent.currentDocument)[0];
            var audioElm_1 = (e.value === 'AudioReplace' || isReplaced) ? e.item.selectParent[0].querySelector('audio')
                : (Browser.isIE ? selectedNode : selectedNode.querySelector('audio'));
            audioElm_1.addEventListener('loadeddata', function () {
                if (e.value !== 'AudioReplace' || !isReplaced) {
                    e.callBack({
                        requestType: 'Audios',
                        editorMode: 'HTML',
                        event: e.event,
                        range: _this.parent.nodeSelection.getRange(_this.parent.currentDocument),
                        elements: [audioElm_1]
                    });
                }
            });
            if (isReplaced) {
                audioElm_1.load();
            }
        }
    };
    AudioCommand.prototype.setStyle = function (sourceElement, e) {
        if (!isNOU(e.item.url)) {
            sourceElement.setAttribute('src', e.item.url);
        }
        sourceElement.type = e.item.fileName && e.item.fileName.split('.').length > 0 ?
            'audio/' + e.item.fileName.split('.')[e.item.fileName.split('.').length - 1] :
            e.item.url && e.item.url.split('.').length > 0 ? 'audio/' + e.item.url.split('.')[e.item.url.split('.').length - 1] : '';
    };
    AudioCommand.prototype.callBack = function (e) {
        if (e.callBack) {
            e.callBack({
                requestType: e.item.subCommand,
                editorMode: 'HTML',
                event: e.event,
                range: this.parent.nodeSelection.getRange(this.parent.currentDocument),
                elements: this.parent.nodeSelection.getSelectedNodes(this.parent.currentDocument)
            });
        }
    };
    return AudioCommand;
}());
export { AudioCommand };
