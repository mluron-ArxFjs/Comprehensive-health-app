import * as CONSTANT from './../base/constant';
import { NodeSelection } from '../../selection/selection';
import { NodeCutter } from './nodecutter';
import { InsertHtml } from './inserthtml';
import { createElement, isNullOrUndefined as isNOU, closest } from '@syncfusion/ej2-base';
/**
 * Link internal component
 *
 * @hidden

 */
var LinkCommand = /** @class */ (function () {
    /**
     * Constructor for creating the Formats plugin
     *
     * @param {EditorManager} parent - specifies the editor manager
     * @hidden

     */
    function LinkCommand(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    LinkCommand.prototype.addEventListener = function () {
        this.parent.observer.on(CONSTANT.LINK, this.linkCommand, this);
    };
    LinkCommand.prototype.linkCommand = function (e) {
        switch (e.value.toString().toLocaleLowerCase()) {
            case 'createlink':
            case 'editlink':
                this.createLink(e);
                break;
            case 'openlink':
                this.openLink(e);
                break;
            case 'removelink':
                this.removeLink(e);
                break;
        }
    };
    LinkCommand.prototype.createLink = function (e) {
        var closestAnchor = (!isNOU(e.item.selectParent) && e.item.selectParent.length > 0) &&
            closest(e.item.selectParent[0], 'a');
        closestAnchor = !isNOU(closestAnchor) ? closestAnchor :
            (!isNOU(e.item.selectParent) && e.item.selectParent.length > 0) ? (e.item.selectParent[0]) : null;
        if (!isNOU(closestAnchor) && closestAnchor.tagName === 'A') {
            var anchorEle = closestAnchor;
            var linkText = '';
            if (!isNOU(e.item.url)) {
                anchorEle.setAttribute('href', e.item.url);
            }
            if (!isNOU(e.item.title)) {
                anchorEle.setAttribute('title', e.item.title);
            }
            if (!isNOU(e.item.text) && e.item.text !== '') {
                linkText = anchorEle.innerText;
                anchorEle.innerText = e.item.text;
            }
            if (!isNOU(e.item.target)) {
                anchorEle.setAttribute('target', e.item.target);
            }
            else {
                anchorEle.removeAttribute('target');
            }
            if (linkText === e.item.text) {
                e.item.selection.setSelectionText(this.parent.currentDocument, anchorEle, anchorEle, 1, 1);
                e.item.selection.restore();
            }
            else {
                var startIndex = e.item.action === 'Paste' ? anchorEle.childNodes[0].textContent.length : 0;
                e.item.selection.setSelectionText(this.parent.currentDocument, anchorEle.childNodes[0], anchorEle.childNodes[0], startIndex, anchorEle.childNodes[0].textContent.length);
            }
        }
        else {
            var domSelection = new NodeSelection();
            var range = domSelection.getRange(this.parent.currentDocument);
            if (range.endContainer.nodeName === '#text' && range.startContainer.textContent.length === (range.endOffset + 1) &&
                range.endContainer.textContent.charAt(range.endOffset) === ' ' && (!isNOU(range.endContainer.nextSibling) && range.endContainer.nextSibling.nodeName === 'A')) {
                domSelection.setSelectionText(this.parent.currentDocument, range.startContainer, range.endContainer, range.startOffset, range.endOffset + 1);
                range = domSelection.getRange(this.parent.currentDocument);
            }
            var text = isNOU(e.item.text) ? true : e.item.text.replace(/ /g, '').localeCompare(range.toString()
                .replace(/\n/g, ' ').replace(/ /g, '')) < 0;
            if (e.event && e.event.type === 'keydown' && (e.event.keyCode === 32
                || e.event.keyCode === 13) || e.item.action === 'Paste' || range.collapsed || text) {
                var anchor = this.createAchorNode(e);
                anchor.innerText = e.item.text === '' ? e.item.url : e.item.text;
                e.item.selection.restore();
                InsertHtml.Insert(this.parent.currentDocument, anchor, this.parent.editableElement);
                if (e.event && e.event.type === 'keydown' && (e.event.keyCode === 32
                    || e.event.keyCode === 13)) {
                    var startContainer = e.item.selection.range.startContainer;
                    startContainer.textContent = this.removeText(startContainer.textContent, e.item.text);
                }
                else {
                    var startIndex = e.item.action === 'Paste' ? anchor.childNodes[0].textContent.length : 0;
                    e.item.selection.setSelectionText(this.parent.currentDocument, anchor.childNodes[0], anchor.childNodes[0], startIndex, anchor.childNodes[0].textContent.length);
                }
            }
            else {
                this.createLinkNode(e);
            }
        }
        if (e.callBack) {
            e.callBack({
                requestType: 'Links',
                editorMode: 'HTML',
                event: e.event,
                range: this.parent.nodeSelection.getRange(this.parent.currentDocument),
                elements: this.parent.nodeSelection.getSelectedNodes(this.parent.currentDocument)
            });
        }
    };
    LinkCommand.prototype.createLinkNode = function (e) {
        var domSelection = new NodeSelection();
        var nodeCutter = new NodeCutter();
        var range = domSelection.getRange(this.parent.currentDocument);
        var nodes = this.getSelectionNodes(domSelection.getNodeCollection(range));
        var save = domSelection.save(range, this.parent.currentDocument);
        var txtArray = [];
        var inlineNodes = [];
        var currentNode;
        var removeNodes = [];
        var anchorNodes = [];
        var finalinlineNodes = [];
        var cloneNode;
        for (var index = 0; index < nodes.length; index++) {
            nodes[index] = nodeCutter.GetSpliceNode(range, nodes[index]);
            txtArray[index] = nodes[index];
        }
        for (var i = 0; i < txtArray.length; i++) {
            var check = true;
            currentNode = txtArray[i];
            while (check === true) {
                if (currentNode.parentNode.nodeName === 'A') {
                    var anchorEle = currentNode.parentNode;
                    currentNode.parentNode.parentNode.insertBefore(anchorEle.firstChild, anchorEle);
                    currentNode.parentNode.removeChild(anchorEle);
                }
                if (this.isBlockNode(currentNode.parentNode) || txtArray.length === 0 || i === 0 || i === txtArray.length - 1
                    || range.startContainer.nodeType === 3) {
                    inlineNodes[i] = currentNode;
                    check = false;
                }
                else {
                    currentNode = currentNode.parentNode;
                }
            }
        }
        for (var i = 0, j_1 = 0; i < inlineNodes.length; i++) {
            if (i === 0) {
                finalinlineNodes[j_1] = inlineNodes[i];
            }
            if (inlineNodes.length > 1 && i < inlineNodes.length - 1) {
                if ((inlineNodes[i].parentElement === inlineNodes[i + 1].parentElement) &&
                    (inlineNodes[i] === inlineNodes[i + 1])) {
                    continue;
                }
                else {
                    finalinlineNodes[j_1 + 1] = inlineNodes[i + 1];
                    j_1++;
                }
            }
        }
        var j = 0;
        anchorNodes[j] = this.createAchorNode(e);
        for (var i = 0; i < finalinlineNodes.length; i++) {
            if (i === 0) {
                cloneNode = finalinlineNodes[i].cloneNode(true);
                anchorNodes[i].appendChild(cloneNode);
            }
            if (i < finalinlineNodes.length - 1) {
                if (finalinlineNodes[i].parentNode === finalinlineNodes[i + 1].parentNode) {
                    var cln = finalinlineNodes[i + 1].cloneNode(true);
                    anchorNodes[j].appendChild(cln);
                }
                else {
                    j = j + 1;
                    anchorNodes[j] = this.createAchorNode(e);
                    cloneNode = finalinlineNodes[i + 1].cloneNode(true);
                    anchorNodes[j].appendChild(cloneNode);
                }
            }
        }
        this.parent.nodeSelection.setRange(document, save.range);
        for (var i = 0, j_2 = 0, k = 0; i <= finalinlineNodes.length; i++) {
            if (i === 0) {
                finalinlineNodes[i].parentNode.insertBefore(anchorNodes[j_2], finalinlineNodes[i].nextSibling);
                if (this.parent.domNode.blockNodes().length === 1) {
                    this.parent.nodeSelection.setSelectionNode(this.parent.currentDocument, anchorNodes[j_2]);
                }
                removeNodes[k] = finalinlineNodes[i];
                k++;
            }
            if (i < finalinlineNodes.length - 1) {
                if (finalinlineNodes[i].parentNode === finalinlineNodes[i + 1].parentNode) {
                    removeNodes[k] = finalinlineNodes[i + 1];
                    k++;
                }
                else {
                    j_2 = j_2 + 1;
                    finalinlineNodes[i + 1].parentNode.insertBefore(anchorNodes[j_2], finalinlineNodes[i + 1]);
                    removeNodes[k] = finalinlineNodes[i + 1];
                    k++;
                }
            }
        }
        for (var i = 0; i < removeNodes.length; i++) {
            if (removeNodes[i].parentNode) {
                removeNodes[i].parentNode.removeChild(removeNodes[i]);
            }
        }
    };
    LinkCommand.prototype.createAchorNode = function (e) {
        var anchorEle = createElement('a', {
            className: 'e-rte-anchor',
            attrs: {
                href: e.item.url,
                title: isNOU(e.item.title) || e.item.title === '' ? e.item.url : e.item.title
            }
        });
        if (!isNOU(e.item.target)) {
            anchorEle.setAttribute('target', e.item.target);
        }
        return anchorEle;
    };
    LinkCommand.prototype.getSelectionNodes = function (nodeCollection) {
        nodeCollection = nodeCollection.reverse();
        for (var index = 0; index < nodeCollection.length; index++) {
            if (nodeCollection[index].nodeType !== 3 || nodeCollection[index].textContent.trim() === '') {
                if (nodeCollection[index].nodeName !== 'IMG') {
                    nodeCollection.splice(index, 1);
                    index--;
                }
            }
        }
        return nodeCollection.reverse();
    };
    LinkCommand.prototype.isBlockNode = function (element) {
        return (!!element && (element.nodeType === Node.ELEMENT_NODE && CONSTANT.BLOCK_TAGS.indexOf(element.tagName.toLowerCase()) >= 0));
    };
    LinkCommand.prototype.removeText = function (text, val) {
        var arr = text.split(' ');
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === val) {
                arr.splice(i, 1);
                i--;
            }
        }
        return arr.join(' ') + ' ';
    };
    LinkCommand.prototype.openLink = function (e) {
        document.defaultView.open(e.item.url, e.item.target);
        this.callBack(e);
    };
    LinkCommand.prototype.removeLink = function (e) {
        var blockNodes = this.parent.domNode.blockNodes();
        if (blockNodes.length < 2) {
            this.parent.domNode.setMarker(e.item.selection);
            var closestAnchor = closest(e.item.selectParent[0], 'a');
            var selectParent = closestAnchor ? closestAnchor : e.item.selectParent[0];
            var parent_1 = selectParent.parentNode;
            var child = [];
            for (; selectParent.firstChild; null) {
                child.push(parent_1.insertBefore(selectParent.firstChild, selectParent));
            }
            parent_1.removeChild(selectParent);
            if (child && child.length === 1) {
                e.item.selection.startContainer = e.item.selection.getNodeArray(child[child.length - 1], true);
                e.item.selection.endContainer = e.item.selection.startContainer;
            }
            e.item.selection = this.parent.domNode.saveMarker(e.item.selection);
        }
        else {
            for (var i = 0; i < blockNodes.length; i++) {
                var linkNode = blockNodes[i].querySelectorAll('a');
                for (var j = 0; j < linkNode.length; j++) {
                    if (document.getSelection().containsNode(linkNode[j], true)) {
                        linkNode[j].outerHTML = linkNode[j].innerHTML;
                    }
                }
            }
        }
        e.item.selection.restore();
        this.callBack(e);
    };
    LinkCommand.prototype.callBack = function (e) {
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
    return LinkCommand;
}());
export { LinkCommand };
