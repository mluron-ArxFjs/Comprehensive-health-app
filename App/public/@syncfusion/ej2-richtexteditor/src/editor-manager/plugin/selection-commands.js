/**
 * `Selection` module is used to handle RTE Selections.
 */
import { NodeSelection } from './../../selection/index';
import { NodeCutter } from './nodecutter';
import { InsertMethods } from './insert-methods';
import { IsFormatted } from './isformatted';
import { isIDevice, setEditFrameFocus } from '../../common/util';
import { isNullOrUndefined as isNOU, Browser, closest, detach } from '@syncfusion/ej2-base';
import { DOMNode } from './dom-node';
var SelectionCommands = /** @class */ (function () {
    function SelectionCommands() {
    }
    /**
     * applyFormat method
     *
     * @param {Document} docElement - specifies the document
     * @param {string} format - specifies the string value
     * @param {Node} endNode - specifies the end node
     * @param {string} enterAction - specifies the enter key action
     * @param {string} value - specifies the string value
     * @param {string} selector - specifies the string
     * @param {FormatPainterValue} painterValues specifies the element created and last child
     * @returns {void}
     * @hidden

     */
    SelectionCommands.applyFormat = function (docElement, format, endNode, enterAction, value, selector, painterValues) {
        this.enterAction = enterAction;
        var validFormats = ['bold', 'italic', 'underline', 'strikethrough', 'superscript',
            'subscript', 'uppercase', 'lowercase', 'fontcolor', 'fontname', 'fontsize', 'backgroundcolor'];
        if (validFormats.indexOf(format) > -1 || value === 'formatPainter') {
            if (format === 'backgroundcolor' && value === '') {
                value = 'transparent';
            }
            var domSelection = new NodeSelection();
            var domNode = new DOMNode(endNode, docElement);
            var nodeCutter = new NodeCutter();
            var isFormatted = new IsFormatted();
            var range = domSelection.getRange(docElement);
            var save = domSelection.save(range, docElement);
            var nodes = range.collapsed ? domSelection.getSelectionNodeCollection(range) :
                domSelection.getSelectionNodeCollectionBr(range);
            var isCollapsed = false;
            var isFormat = false;
            var isCursor = false;
            var preventRestore = false;
            var isFontStyle = (['fontcolor', 'fontname', 'fontsize', 'backgroundcolor'].indexOf(format) > -1);
            if (range.collapsed) {
                var currentFormatNode = isFormatted.getFormattedNode(range.startContainer, format, endNode);
                var currentSelector = !isNOU(currentFormatNode) ?
                    (currentFormatNode.getAttribute('style') === null ? currentFormatNode.nodeName :
                        currentFormatNode.nodeName + '[style=\'' + currentFormatNode.getAttribute('style') + '\']') : null;
                if (nodes.length > 0) {
                    isCollapsed = true;
                    range = nodeCutter.GetCursorRange(docElement, range, nodes[0]);
                }
                else if (range.startContainer.nodeType === 3 && ((range.startContainer.parentElement.childElementCount > 0 &&
                    range.startOffset > 0 && range.startContainer.parentElement.firstElementChild.tagName.toLowerCase() !== 'br') ||
                    !isNOU(currentFormatNode) && currentFormatNode ===
                        (range.startContainer.parentElement.closest(currentSelector)) &&
                        ((range.startContainer.parentElement.closest(currentSelector)).textContent.replace(
                        // eslint-disable-next-line
                        new RegExp(String.fromCharCode(8203), 'g'), '').trim().length !== 0))) {
                    isCollapsed = true;
                    range = nodeCutter.GetCursorRange(docElement, range, range.startContainer);
                    nodes.push(range.startContainer);
                }
                else {
                    var cursorNode = this.insertCursorNode(docElement, domSelection, range, isFormatted, nodeCutter, format, value, endNode);
                    domSelection.endContainer = domSelection.startContainer = domSelection.getNodeArray(cursorNode, true);
                    var childNodes = cursorNode.nodeName === 'BR' && cursorNode.parentNode.childNodes;
                    if (!isNOU(childNodes) && childNodes.length === 1 && childNodes[0].nodeName === 'BR' && nodes.length === 0) {
                        domSelection.setSelectionText(docElement, range.startContainer, range.endContainer, 0, 0);
                        preventRestore = true;
                    }
                    else {
                        domSelection.endOffset = domSelection.startOffset = 1;
                    }
                    if (cursorNode.nodeName === 'BR' && cursorNode.parentNode.textContent.length === 0) {
                        preventRestore = true;
                    }
                }
            }
            isCursor = range.collapsed;
            var isSubSup = false;
            for (var index = 0; index < nodes.length; index++) {
                var formatNode = isFormatted.getFormattedNode(nodes[index], format, endNode);
                if (formatNode === null) {
                    if (format === 'subscript') {
                        formatNode = isFormatted.getFormattedNode(nodes[index], 'superscript', endNode);
                        isSubSup = formatNode === null ? false : true;
                    }
                    else if (format === 'superscript') {
                        formatNode = isFormatted.getFormattedNode(nodes[index], 'subscript', endNode);
                        isSubSup = formatNode === null ? false : true;
                    }
                }
                if (index === 0 && formatNode === null) {
                    isFormat = true;
                }
                if (formatNode !== null && (!isFormat || isFontStyle)) {
                    nodes[index] = this.removeFormat(nodes, index, formatNode, isCursor, isFormat, isFontStyle, range, nodeCutter, format, value, domSelection, endNode, domNode);
                }
                else {
                    nodes[index] = this.insertFormat(docElement, nodes, index, formatNode, isCursor, isFormat, isFontStyle, range, nodeCutter, format, value, painterValues, domNode, endNode);
                }
                domSelection = this.applySelection(nodes, domSelection, nodeCutter, index, isCollapsed);
            }
            if (isIDevice()) {
                setEditFrameFocus(endNode, selector);
            }
            if (!preventRestore) {
                save.restore();
            }
            if (isSubSup) {
                this.applyFormat(docElement, format, endNode, enterAction);
            }
        }
    };
    SelectionCommands.insertCursorNode = function (docElement, domSelection, range, isFormatted, nodeCutter, format, value, endNode) {
        var cursorNodes = domSelection.getNodeCollection(range);
        var domNode = new DOMNode(endNode, docElement);
        var cursorFormat = (cursorNodes.length > 0) ?
            (cursorNodes.length > 1 && range.startContainer === range.endContainer) ?
                this.getCursorFormat(isFormatted, cursorNodes, format, endNode) :
                isFormatted.getFormattedNode(cursorNodes[0], format, endNode) : null;
        var cursorNode = null;
        if (cursorFormat) {
            cursorNode = cursorNodes[0];
            if (cursorFormat.firstChild.textContent.charCodeAt(0) === 8203 && cursorFormat.firstChild.nodeType === 3) {
                // eslint-disable-next-line
                var regEx = new RegExp(String.fromCharCode(8203), 'g');
                var emptySpaceNode = void 0;
                if (cursorFormat.firstChild === cursorNode) {
                    cursorNode.textContent = (cursorFormat.parentElement && (domNode.isBlockNode(cursorFormat.parentElement) &&
                        cursorFormat.parentElement.textContent.length <= 1 ? cursorFormat.parentElement.childElementCount > 1 :
                        cursorFormat.childElementCount === 0) &&
                        (cursorFormat.parentElement.textContent.length > 1 ||
                            cursorFormat.parentElement.firstChild && cursorFormat.parentElement.firstChild.nodeType === 1) ?
                        cursorNode.textContent : cursorNode.textContent.replace(regEx, ''));
                    emptySpaceNode = cursorNode;
                }
                else {
                    cursorFormat.firstChild.textContent = cursorFormat.firstChild.textContent.replace(regEx, '');
                    emptySpaceNode = cursorFormat.firstChild;
                }
                var pointer = void 0;
                if (emptySpaceNode.textContent.length === 0) {
                    if (!isNOU(emptySpaceNode.previousSibling)) {
                        cursorNode = emptySpaceNode.previousSibling;
                        pointer = emptySpaceNode.textContent.length - 1;
                        domSelection.setCursorPoint(docElement, emptySpaceNode, pointer);
                    }
                    else if (!isNOU(emptySpaceNode.parentElement) && emptySpaceNode.parentElement.textContent.length === 0) {
                        var brElem = document.createElement('BR');
                        emptySpaceNode.parentElement.appendChild(brElem);
                        detach(emptySpaceNode);
                        cursorNode = brElem;
                        domSelection.setCursorPoint(docElement, cursorNode.parentElement, 0);
                    }
                }
            }
            if ((['fontcolor', 'fontname', 'fontsize', 'backgroundcolor'].indexOf(format) > -1)) {
                if (format === 'fontcolor') {
                    cursorFormat.style.color = value;
                }
                else if (format === 'fontname') {
                    cursorFormat.style.fontFamily = value;
                }
                else if (format === 'fontsize') {
                    cursorFormat.style.fontSize = value;
                }
                else {
                    cursorFormat.style.backgroundColor = value;
                }
                cursorNode = cursorFormat;
            }
            else {
                InsertMethods.unwrap(cursorFormat);
            }
        }
        else {
            if (cursorNodes.length > 1 && range.startOffset > 0 && (cursorNodes[0].firstElementChild &&
                cursorNodes[0].firstElementChild.tagName.toLowerCase() === 'br')) {
                cursorNodes[0].innerHTML = '';
            }
            if (cursorNodes.length === 1 && range.startOffset === 0 && (cursorNodes[0].nodeName === 'BR' ||
                cursorNodes[0].nextSibling.nodeName === 'BR')) {
                detach(cursorNodes[0].nodeName === '#text' ? cursorNodes[0].nextSibling : cursorNodes[0]);
            }
            cursorNode = this.getInsertNode(docElement, range, format, value).firstChild;
        }
        return cursorNode;
    };
    SelectionCommands.getCursorFormat = function (isFormatted, cursorNodes, format, endNode) {
        var currentNode;
        for (var index = 0; index < cursorNodes.length; index++) {
            currentNode = cursorNodes[index].lastElementChild ?
                cursorNodes[index].lastElementChild : cursorNodes[index];
        }
        return isFormatted.getFormattedNode(currentNode, format, endNode);
    };
    SelectionCommands.removeFormat = function (nodes, index, formatNode, isCursor, isFormat, isFontStyle, range, nodeCutter, format, value, domSelection, endNode, domNode) {
        var splitNode = null;
        var startText = range.startContainer.nodeName === '#text' ?
            range.startContainer.textContent.substring(range.startOffset, range.startContainer.textContent.length) :
            range.startContainer.textContent;
        var nodeText = nodes[index].textContent;
        if (!(range.startContainer === range.endContainer && range.startOffset === 0
            && range.endOffset === range.startContainer.length)) {
            var nodeIndex = [];
            var cloneNode = nodes[index];
            do {
                nodeIndex.push(domSelection.getIndex(cloneNode));
                cloneNode = cloneNode.parentNode;
            } while (cloneNode && (cloneNode !== formatNode));
            if (nodes[index].nodeName !== 'BR') {
                cloneNode = splitNode = (isCursor && (formatNode.textContent.length - 1) === range.startOffset) ?
                    nodeCutter.SplitNode(range, formatNode, true)
                    : nodeCutter.GetSpliceNode(range, formatNode);
            }
            if (!isCursor) {
                while (cloneNode && cloneNode.childNodes.length > 0 && ((nodeIndex.length - 1) >= 0)
                    && (cloneNode.childNodes.length > nodeIndex[nodeIndex.length - 1])) {
                    cloneNode = cloneNode.childNodes[nodeIndex[nodeIndex.length - 1]];
                    nodeIndex.pop();
                }
                if (nodes[index].nodeName !== 'BR') {
                    if (cloneNode.nodeType === 3 && !(isCursor && cloneNode.nodeValue === '')) {
                        nodes[index] = cloneNode;
                    }
                    else {
                        var divNode = document.createElement('div');
                        divNode.innerHTML = '&#8203;';
                        if (cloneNode.nodeType !== 3) {
                            cloneNode.insertBefore(divNode.firstChild, cloneNode.firstChild);
                            nodes[index] = cloneNode.firstChild;
                        }
                        else {
                            cloneNode.parentNode.insertBefore(divNode.firstChild, cloneNode);
                            nodes[index] = cloneNode.previousSibling;
                            cloneNode.parentNode.removeChild(cloneNode);
                        }
                    }
                }
            }
            else {
                var lastNode = splitNode;
                for (; lastNode.firstChild !== null && lastNode.firstChild.nodeType !== 3; null) {
                    lastNode = lastNode.firstChild;
                }
                lastNode.innerHTML = '&#8203;';
                nodes[index] = lastNode.firstChild;
            }
        }
        else if (isFontStyle && !nodes[index].contains(formatNode) && nodes[index].nodeType === 3 &&
            nodes[index].textContent !== formatNode.textContent) {
            // If the selection is within the format node .
            var isFullNodeSelected = nodes[index].textContent === nodes[index].wholeText;
            var nodeTraverse = nodes[index];
            var styleElement = this.GetFormatNode(format, value);
            // while loop and traverse back until text content does not match with parent text content
            while (nodeTraverse && nodeTraverse.textContent === nodeTraverse.parentElement.textContent) {
                nodeTraverse = nodeTraverse.parentElement;
            }
            if (isFullNodeSelected && formatNode.textContent !== nodeTraverse.textContent) {
                var nodeArray = [];
                var priorityNode = this.getPriorityFormatNode(nodeTraverse, endNode);
                if (priorityNode && priorityNode.textContent === nodeTraverse.textContent) {
                    nodeTraverse = priorityNode;
                }
                nodeArray.push(nodeTraverse);
                this.applyStyles(nodeArray, 0, styleElement);
                return nodes[index];
            }
        }
        var fontStyle;
        if (format === 'backgroundcolor') {
            fontStyle = formatNode.style.fontSize;
        }
        var bgStyle;
        if (format === 'fontsize') {
            var bg = closest(nodes[index].parentElement, 'span[style*=' + 'background-color' + ']');
            if (!isNOU(bg)) {
                bgStyle = bg.style.backgroundColor;
            }
        }
        var formatNodeStyles = formatNode.getAttribute('style');
        var formatNodeTagName = formatNode.tagName;
        var child = InsertMethods.unwrap(formatNode);
        if (child[0] && !isFontStyle) {
            var nodeTraverse = child[index] ? child[index] : child[0];
            var textNode = nodeTraverse;
            for (; nodeTraverse && nodeTraverse.parentElement && nodeTraverse.parentElement !== endNode; 
            // eslint-disable-next-line
            nodeTraverse = nodeTraverse) {
                var nodeTraverseCondition = void 0;
                if (formatNode.nodeName === 'SPAN') {
                    nodeTraverseCondition = nodeTraverse.parentElement.tagName.toLocaleLowerCase()
                        === formatNode.tagName.toLocaleLowerCase() && nodeTraverse.parentElement.getAttribute('style') === formatNodeStyles;
                }
                else {
                    nodeTraverseCondition = nodeTraverse.parentElement.tagName.toLocaleLowerCase()
                        === formatNode.tagName.toLocaleLowerCase();
                }
                if (nodeTraverse.parentElement && nodeTraverseCondition &&
                    (nodeTraverse.parentElement.childElementCount > 1 || range.startOffset > 1)) {
                    if (textNode.parentElement && textNode.parentElement.tagName.toLocaleLowerCase()
                        === formatNode.tagName.toLocaleLowerCase()) {
                        if ((range.startOffset === range.endOffset) && textNode.nodeType !== 1 &&
                            !isNOU(textNode.textContent) && textNode.parentElement.childElementCount > 1) {
                            range.setStart(textNode, 0);
                            range.setEnd(textNode, textNode.textContent.length);
                            nodeCutter.SplitNode(range, textNode.parentElement, false);
                        }
                    }
                    if (nodeTraverse.parentElement.tagName.toLocaleLowerCase() === 'span') {
                        if (formatNode.style.textDecoration === 'underline' &&
                            nodeTraverse.parentElement.style.textDecoration !== 'underline') {
                            nodeTraverse = nodeTraverse.parentElement;
                            continue;
                        }
                    }
                    InsertMethods.unwrap(nodeTraverse.parentElement);
                    nodeTraverse = !isNOU(nodeTraverse.parentElement) && !domNode.isBlockNode(nodeTraverse.parentElement) ? textNode :
                        nodeTraverse.parentElement;
                }
                else {
                    nodeTraverse = nodeTraverse.parentElement;
                }
            }
        }
        if (child.length > 0 && isFontStyle) {
            for (var num = 0; num < child.length; num++) {
                if (child[num].nodeType !== 3 || (child[num].textContent &&
                    child[num].textContent.trim().length > 0)) {
                    child[num] = InsertMethods.Wrap(child[num], this.GetFormatNode(format, value, formatNodeTagName, formatNodeStyles));
                    if (child[num].textContent === startText) {
                        if (num === 0) {
                            range.setStartBefore(child[num]);
                        }
                        else if (num === child.length - 1) {
                            range.setEndAfter(child[num]);
                        }
                    }
                }
            }
            var currentNodeElem = nodes[index].parentElement;
            if (!isNOU(fontStyle) && fontStyle !== '') {
                currentNodeElem.style.fontSize = fontStyle;
            }
            if (!isNOU(bgStyle) && bgStyle !== '') {
                currentNodeElem.style.backgroundColor = bgStyle;
            }
            if ((format === 'backgroundcolor' && !isNOU(fontStyle) && fontStyle !== '') &&
                currentNodeElem.parentElement.innerHTML === currentNodeElem.outerHTML) {
                var curParentElem = currentNodeElem.parentElement;
                curParentElem.parentElement.insertBefore(currentNodeElem, curParentElem);
                detach(curParentElem);
            }
            if (format === 'fontsize' || format === 'fontcolor') {
                var liElement = nodes[index].parentElement;
                var parentElement = nodes[index].parentElement;
                while (!isNOU(parentElement) && parentElement.tagName.toLowerCase() !== 'li') {
                    parentElement = parentElement.parentElement;
                    liElement = parentElement;
                }
                var num = index;
                var liChildContent = '';
                while (num >= 0 && !isNOU(liElement) && liElement.tagName.toLowerCase() === 'li' && liElement.textContent.replace('/\u200B/g', '').trim().includes(nodes[num].textContent.trim())) {
                    liChildContent = ' ' + nodes[num].textContent.trim() + liChildContent;
                    num--;
                }
                var isNestedList = false;
                var nestedListCount = 0;
                var isNestedListItem = false;
                if (!isNOU(liElement) && liElement.childNodes) {
                    for (var num_1 = 0; num_1 < liElement.childNodes.length; num_1++) {
                        if (liElement.childNodes[num_1].nodeName === ('OL' || 'UL')) {
                            nestedListCount++;
                            isNestedList = true;
                        }
                    }
                }
                if (!isNOU(liElement) && liElement.tagName.toLowerCase() === 'li' &&
                    liElement.textContent.split('\u200B').join('').trim() === liChildContent.split('\u200B').join('').trim()) {
                    if (format === 'fontsize') {
                        liElement.style.fontSize = value;
                    }
                    else {
                        liElement.style.color = value;
                        liElement.style.textDecoration = 'inherit';
                    }
                }
                else if (!isNOU(liElement) && liElement.tagName.toLowerCase() === 'li' && isNestedList) {
                    if (isNestedList && nestedListCount > 0) {
                        for (var num_2 = 0; num_2 < liElement.childNodes.length; num_2++) {
                            if (nodes[index].textContent === liElement.childNodes[num_2].textContent && nodes[index].textContent === nodeText && liElement.textContent.replace('/\u200B/g', '').trim().includes(liChildContent.split('\u200B').join('').trim())) {
                                isNestedListItem = true;
                            }
                        }
                    }
                    if (isNestedListItem) {
                        for (var num_3 = 0; num_3 < liElement.childNodes.length; num_3++) {
                            if (liElement.childNodes[num_3].nodeName === ('OL' || 'UL')) {
                                liElement.childNodes[num_3].style.fontSize = 'initial';
                            }
                        }
                        if (format === 'fontsize') {
                            liElement.style.fontSize = value;
                        }
                        else {
                            liElement.style.color = value;
                            liElement.style.textDecoration = 'inherit';
                        }
                    }
                }
            }
        }
        return nodes[index];
    };
    SelectionCommands.insertFormat = function (docElement, nodes, index, formatNode, isCursor, isFormat, isFontStyle, range, nodeCutter, format, value, painterValues, domNode, endNode) {
        if (!isCursor) {
            if ((formatNode === null && isFormat) || isFontStyle) {
                if (nodes[index].nodeName !== 'BR') {
                    nodes[index] = nodeCutter.GetSpliceNode(range, nodes[index]);
                    nodes[index].textContent = nodeCutter.TrimLineBreak(nodes[index].textContent);
                }
                if (format === 'uppercase' || format === 'lowercase') {
                    nodes[index].textContent = (format === 'uppercase') ? nodes[index].textContent.toLocaleUpperCase()
                        : nodes[index].textContent.toLocaleLowerCase();
                }
                else if (!(isFontStyle === true && value === '')) {
                    var element = this.GetFormatNode(format, value);
                    if (value === 'formatPainter' || isFontStyle) {
                        var liElement = nodes[index].parentElement;
                        var parentElement = nodes[index].parentElement;
                        while (!isNOU(parentElement) && parentElement.tagName.toLowerCase() !== 'li') {
                            parentElement = parentElement.parentElement;
                            liElement = parentElement;
                        }
                        if (!isNOU(liElement) && liElement.tagName.toLowerCase() === 'li' &&
                            liElement.textContent.trim() === nodes[index].textContent.trim()) {
                            if (format === 'fontsize') {
                                liElement.style.fontSize = value;
                            }
                            else if (format === 'fontcolor') {
                                liElement.style.color = value;
                                liElement.style.textDecoration = 'inherit';
                            }
                        }
                        if (value === 'formatPainter') {
                            return this.insertFormatPainterElem(nodes, index, range, nodeCutter, painterValues, domNode);
                        }
                        var currentNode = nodes[index];
                        var priorityNode = this.getPriorityFormatNode(currentNode, endNode);
                        // 1. Checking is there any priority node present in the selection range. (Use case for nested styles);
                        // 2  Or font style is applied. (Use case not a nested style)
                        if (!isNOU(priorityNode) || isFontStyle) {
                            var currentFormatNode = isNOU(priorityNode) ? currentNode : priorityNode;
                            currentFormatNode = !isNOU(priorityNode) && priorityNode.style.fontSize !== '' ?
                                currentFormatNode.firstChild : currentFormatNode;
                            if (isNOU(priorityNode) || format === 'fontsize') {
                                while (currentFormatNode) {
                                    var isSameTextContent = currentFormatNode.parentElement.textContent.trim()
                                        === nodes[index].textContent.trim();
                                    var parent_1 = currentFormatNode.parentElement;
                                    if (!domNode.isBlockNode(parent_1) && isSameTextContent &&
                                        !(parent_1.nodeName === 'SPAN' && parent_1.classList.contains('e-img-inner'))) {
                                        currentFormatNode = parent_1;
                                    }
                                    else {
                                        break;
                                    }
                                }
                            }
                            var nodeList = [];
                            // Since color is different for different themnes, we need to wrap the fontColor over the text node.
                            if (format === 'fontcolor') {
                                var closestAnchor = closest(nodes[index].parentElement, 'A');
                                if (!isNOU(closestAnchor) && closestAnchor.firstChild.textContent.trim()
                                    === nodes[index].textContent.trim()) {
                                    currentFormatNode = nodes[index];
                                }
                            }
                            if (nodes[index].textContent.trim() !== currentFormatNode.textContent.trim()) {
                                currentFormatNode = nodes[index];
                            }
                            nodeList[0] = currentFormatNode;
                            this.applyStyles(nodeList, 0, element);
                        }
                        else {
                            nodes[index] = this.applyStyles(nodes, index, element);
                        }
                    }
                    else {
                        nodes[index] = this.applyStyles(nodes, index, element);
                    }
                }
            }
            else {
                nodes[index] = nodeCutter.GetSpliceNode(range, nodes[index]);
            }
        }
        else {
            if (format !== 'uppercase' && format !== 'lowercase') {
                var element = this.getInsertNode(docElement, range, format, value);
                nodes[index] = element.firstChild;
                nodeCutter.position = 1;
            }
            else {
                nodeCutter.position = range.startOffset;
            }
        }
        return nodes[index];
    };
    SelectionCommands.applyStyles = function (nodes, index, element) {
        if (!(nodes[index].nodeName === 'BR' && this.enterAction === 'BR')) {
            nodes[index] = (index === (nodes.length - 1)) || nodes[index].nodeName === 'BR' ?
                InsertMethods.Wrap(nodes[index], element)
                : InsertMethods.WrapBefore(nodes[index], element, true);
            nodes[index] = this.getChildNode(nodes[index], element);
        }
        return nodes[index];
    };
    SelectionCommands.getPriorityFormatNode = function (node, endNode) {
        var isFormatted = new IsFormatted();
        var fontSizeNode = isFormatted.getFormattedNode(node, 'fontsize', endNode);
        var fontColorNode;
        var backgroundColorNode;
        var fontNameNode;
        if (isNOU(fontSizeNode)) {
            backgroundColorNode = isFormatted.getFormattedNode(node, 'backgroundcolor', endNode);
            if (isNOU(backgroundColorNode)) {
                fontNameNode = isFormatted.getFormattedNode(node, 'fontname', endNode);
                if (isNOU(fontNameNode)) {
                    fontColorNode = isFormatted.getFormattedNode(node, 'fontcolor', endNode);
                    if (isNOU(fontColorNode)) {
                        return null;
                    }
                    else {
                        return fontColorNode;
                    }
                }
                else {
                    return fontNameNode;
                }
            }
            else {
                return backgroundColorNode;
            }
        }
        else {
            return fontSizeNode;
        }
    };
    SelectionCommands.getInsertNode = function (docElement, range, format, value) {
        var element = this.GetFormatNode(format, value);
        element.innerHTML = '&#8203;';
        if (Browser.isIE) {
            var frag = docElement.createDocumentFragment();
            frag.appendChild(element);
            range.insertNode(frag);
        }
        else {
            range.insertNode(element);
        }
        return element;
    };
    SelectionCommands.getChildNode = function (node, element) {
        if (node === undefined || node === null) {
            element.innerHTML = '&#8203;';
            node = element.firstChild;
        }
        return node;
    };
    SelectionCommands.applySelection = function (nodes, domSelection, nodeCutter, index, isCollapsed) {
        if (nodes.length === 1 && !isCollapsed) {
            domSelection.startContainer = domSelection.getNodeArray(nodes[index], true);
            domSelection.endContainer = domSelection.startContainer;
            domSelection.startOffset = 0;
            domSelection.endOffset = nodes[index].textContent.length;
        }
        else if (nodes.length === 1 && isCollapsed) {
            domSelection.startContainer = domSelection.getNodeArray(nodes[index], true);
            domSelection.endContainer = domSelection.startContainer;
            domSelection.startOffset = nodeCutter.position;
            domSelection.endOffset = nodeCutter.position;
        }
        else if (index === 0) {
            domSelection.startContainer = domSelection.getNodeArray(nodes[index], true);
            domSelection.startOffset = 0;
        }
        else if (index === nodes.length - 1) {
            domSelection.endContainer = domSelection.getNodeArray(nodes[index], false);
            domSelection.endOffset = nodes[index].textContent.length;
        }
        return domSelection;
    };
    SelectionCommands.GetFormatNode = function (format, value, tagName, styles) {
        var node;
        switch (format) {
            case 'bold':
                return document.createElement('strong');
            case 'italic':
                return document.createElement('em');
            case 'underline':
                node = document.createElement('span');
                this.updateStyles(node, tagName, styles);
                node.style.textDecoration = 'underline';
                return node;
            case 'strikethrough':
                node = document.createElement('span');
                this.updateStyles(node, tagName, styles);
                node.style.textDecoration = 'line-through';
                return node;
            case 'superscript':
                return document.createElement('sup');
            case 'subscript':
                return document.createElement('sub');
            case 'fontcolor':
                node = document.createElement('span');
                this.updateStyles(node, tagName, styles);
                node.style.color = value;
                node.style.textDecoration = 'inherit';
                return node;
            case 'fontname':
                node = document.createElement('span');
                this.updateStyles(node, tagName, styles);
                node.style.fontFamily = value;
                return node;
            case 'fontsize':
                node = document.createElement('span');
                this.updateStyles(node, tagName, styles);
                node.style.fontSize = value;
                return node;
            default:
                node = document.createElement('span');
                this.updateStyles(node, tagName, styles);
                node.style.backgroundColor = value;
                return node;
        }
    };
    SelectionCommands.updateStyles = function (ele, tag, styles) {
        if (styles !== null && tag === 'SPAN') {
            ele.setAttribute('style', styles);
        }
    };
    // Below function is used to insert the element created by the format painter plugin.
    SelectionCommands.insertFormatPainterElem = function (nodes, index, range, nodeCutter, painterValues, domNode) {
        var parent = !domNode.isBlockNode(nodes[index].parentElement) ?
            nodes[index].parentElement : nodes[index];
        if (!domNode.isBlockNode(parent)) {
            while (parent.textContent.trim() === parent.parentElement.textContent.trim() && !domNode.isBlockNode(parent.parentElement)) {
                parent = parent.parentElement;
            }
        }
        // The below code is used to remove the already present inline style from the text node.
        if (!isNOU(parent) && parent.nodeType === 1 && !(parent.classList.contains('e-rte-img-caption') || parent.classList.contains('e-img-inner'))) {
            this.formatPainterCleanup(index, nodes, parent, range, nodeCutter, domNode);
        }
        var elem = painterValues.element;
        // The below code is used to apply the inline format copied.
        if (!isNOU(elem)) {
            // Step 1: Cloning the element that is created by format painter.
            // Step 2: Finding the last child of the nested elememt using the paintervalues.lastchild nodename
            // Step 3: Assigning the nodes[index] text content to the last child element.
            // Step 4: Wrapping the cloned element with the nodes[index]
            var clonedElement = elem.cloneNode(true);
            var elemList = clonedElement.querySelectorAll(painterValues.lastChild.nodeName);
            var lastElement = void 0;
            if (elemList.length > 0) {
                lastElement = elemList[elemList.length - 1];
            }
            else {
                if (!isNOU(clonedElement) && clonedElement.nodeName === painterValues.lastChild.nodeName) {
                    lastElement = clonedElement;
                }
            }
            lastElement.textContent = nodes[index].textContent;
            var lastChild = lastElement.childNodes[0];
            nodes[index] = InsertMethods.Wrap(nodes[index], clonedElement);
            nodes[index].textContent = '';
            nodes[index] = lastChild;
        }
        return nodes[index];
    };
    SelectionCommands.formatPainterCleanup = function (index, nodes, parent, range, nodeCutter, domNode) {
        var INVALID_TAGS = ['A', 'AUDIO', 'IMG', 'VIDEO', 'IFRAME'];
        if (index === 0 && parent.textContent.trim() !== nodes[index].textContent.trim()) {
            nodeCutter.SplitNode(range, parent, true);
            var childELemList = nodes[index].parentElement.childNodes;
            for (var i = 0; i < childELemList.length; i++) {
                if (childELemList[i].textContent.trim() === nodes[i].textContent.trim()) {
                    parent.parentNode.insertBefore(childELemList[i], parent);
                    break;
                }
            }
            var blockChildNodes = parent.parentElement.childNodes;
            for (var k = 0; k < blockChildNodes.length; k++) {
                if (blockChildNodes[k].textContent.trim() === '' || blockChildNodes[k].textContent.length === 0) {
                    detach(blockChildNodes[k]);
                }
            }
        }
        else if (parent.textContent.trim() !== nodes[index].textContent.trim()) {
            parent.parentElement.insertBefore(nodes[index], parent);
        }
        else {
            while (!isNOU(parent) && parent.nodeType !== 3 && !domNode.isBlockNode(parent)) {
                var temp = void 0;
                for (var i = 0; i < parent.childNodes.length; i++) {
                    var currentChild = parent.childNodes[i];
                    if (currentChild.textContent.trim().length !== 0 && currentChild.nodeType !== 3) {
                        temp = parent.childNodes[i];
                    }
                }
                if (INVALID_TAGS.indexOf(parent.tagName) === -1) {
                    InsertMethods.unwrap(parent);
                }
                parent = temp;
            }
        }
    };
    SelectionCommands.enterAction = 'P';
    return SelectionCommands;
}());
export { SelectionCommands };
