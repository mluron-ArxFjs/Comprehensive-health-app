import * as CONSTANT from './../base/constant';
import { append, detach, createElement, isNullOrUndefined as isNOU } from '@syncfusion/ej2-base';
import { NodeSelection } from './../../selection/index';
import { selfClosingTags } from '../../common/config';
import { getLastTextNode } from '../../common/util';
export var markerClassName = {
    startSelection: 'e-editor-select-start',
    endSelection: 'e-editor-select-end'
};
/**
 * DOMNode internal plugin
 *
 * @hidden

 */
var DOMNode = /** @class */ (function () {
    /**
     * Constructor for creating the DOMNode plugin
     *
     * @param {Element} parent - specifies the parent element
     * @param {Document} currentDocument - specifies the current document.
     * @hidden

     */
    function DOMNode(parent, currentDocument) {
        this.parent = parent;
        this.nodeSelection = new NodeSelection();
        this.currentDocument = currentDocument;
    }
    /**
     * contents method
     *
     * @param {Element} element - specifies the element.
     * @returns {void}
     * @hidden

     */
    DOMNode.prototype.contents = function (element) {
        return (element && 'IFRAME' !== element.tagName ? Array.prototype.slice.call(element.childNodes || []) : []);
    };
    /**
     * isBlockNode method
     *
     * @param {Element} element - specifies the node element.
     * @returns {boolean} - sepcifies the boolean value
     * @hidden

     */
    DOMNode.prototype.isBlockNode = function (element) {
        return (!!element && (element.nodeType === Node.ELEMENT_NODE && CONSTANT.BLOCK_TAGS.indexOf(element.tagName.toLowerCase()) >= 0));
    };
    /**
     * isLink method
     *
     * @param {Element} element - specifies the element
     * @returns {boolean} -  specifies the boolean value
     * @hidden

     */
    DOMNode.prototype.isLink = function (element) {
        return (!!element && (element.nodeType === Node.ELEMENT_NODE && 'a' === element.tagName.toLowerCase()));
    };
    /**
     * blockParentNode method
     *
     * @param {Element} element - specifies the element
     * @returns {Element} - returns the element value
     * @hidden

     */
    DOMNode.prototype.blockParentNode = function (element) {
        for (; element && element.parentNode !== this.parent && ((!element.parentNode ||
            !this.hasClass(element.parentNode, 'e-node-inner'))); null) {
            element = element.parentNode;
            if (this.isBlockNode(element)) {
                return element;
            }
        }
        return element;
    };
    /**
     * rawAttributes method
     *
     * @param {Element} element - specifies the element
     * @returns {string} - returns the string value
     * @hidden

     */
    DOMNode.prototype.rawAttributes = function (element) {
        var rawAttr = {};
        var attributes = element.attributes;
        if (attributes.length > 0) {
            for (var d = 0; d < attributes.length; d++) {
                var e = attributes[d];
                rawAttr[e.nodeName] = e.value;
            }
        }
        return rawAttr;
    };
    /**
     * attributes method
     *
     * @param {Element} element - sepcifies the element.
     * @returns {string} - returns the string value.
     * @hidden

     */
    DOMNode.prototype.attributes = function (element) {
        if (!element) {
            return '';
        }
        var attr = '';
        var rawAttr = this.rawAttributes(element);
        var orderRawAttr = Object.keys(rawAttr).sort();
        for (var e = 0; e < orderRawAttr.length; e++) {
            var attrKey = orderRawAttr[e];
            var attrValue = rawAttr["" + attrKey];
            /* eslint-disable */
            if (attrValue.indexOf("'") < 0 && attrValue.indexOf('"') >= 0) {
                attr += ' ' + attrKey + "='" + attrValue + "'";
            }
            else if (attrValue.indexOf('"') >= 0 && attrValue.indexOf("'") >= 0) {
                /* eslint-enable */
                attrValue = attrValue.replace(/"/g, '&quot;');
                attr += ' ' + attrKey + '="' + attrValue + '"';
            }
            else {
                attr += ' ' + attrKey + '="' + attrValue + '"';
            }
        }
        return attr;
    };
    /**
     * clearAttributes method
     *
     * @param {Element} element - specifies the element
     * @returns {void}
     * @hidden

     */
    DOMNode.prototype.clearAttributes = function (element) {
        for (var attr = element.attributes, c = attr.length - 1; c >= 0; c--) {
            var key = attr[c];
            element.removeAttribute(key.nodeName);
        }
    };
    /**
     * openTagString method
     *
     * @param {Element} element - specifies the element.
     * @returns {string} - returns the string
     * @hidden

     */
    DOMNode.prototype.openTagString = function (element) {
        return '<' + element.tagName.toLowerCase() + this.attributes(element) + '>';
    };
    /**
     * closeTagString method
     *
     * @param {Element} element - specifies the element
     * @returns {string} - returns the string value
     * @hidden

     */
    DOMNode.prototype.closeTagString = function (element) {
        return '</' + element.tagName.toLowerCase() + '>';
    };
    /**
     * createTagString method
     *
     * @param {string} tagName - specifies the tag name
     * @param {Element} relativeElement - specifies the relative element
     * @param {string} innerHTML - specifies the string value
     * @returns {string} - returns the string value.
     * @hidden

     */
    DOMNode.prototype.createTagString = function (tagName, relativeElement, innerHTML) {
        return '<' + tagName.toLowerCase() + this.attributes(relativeElement) + '>' + innerHTML + '</' + tagName.toLowerCase() + '>';
    };
    /**
     * isList method
     *
     * @param {Element} element - specifes the element.
     * @returns {boolean} - returns the boolean value
     * @hidden

     */
    DOMNode.prototype.isList = function (element) {
        return !!element && ['UL', 'OL'].indexOf(element.tagName) >= 0;
    };
    /**
     * isElement method
     *
     * @param {Element} element - specifes the element.
     * @returns {boolean} - returns the boolean value
     * @hidden

     */
    DOMNode.prototype.isElement = function (element) {
        return element === this.parent;
    };
    /**
     * isEditable method
     *
     * @param {Element} element - specifes the element.
     * @returns {boolean} - returns the boolean value
     * @hidden

     */
    DOMNode.prototype.isEditable = function (element) {
        return ((!element.getAttribute || element.getAttribute('contenteditable') === 'true')
            && ['STYLE', 'SCRIPT'].indexOf(element.tagName) < 0);
    };
    /**
     * hasClass method
     *
     * @param {Element} element - specifes the element.
     * @param {string} className - specifies the class name value
     * @returns {boolean} - returns the boolean value
     * @hidden

     */
    DOMNode.prototype.hasClass = function (element, className) {
        return element && element.classList && element.classList.contains(className);
    };
    /**
     * replaceWith method
     *
     * @param {Element} element - specifes the element.
     * @param {string} value - specifies the string value
     * @returns {void}
     * @hidden

     */
    DOMNode.prototype.replaceWith = function (element, value) {
        var parentNode = element.parentNode;
        parentNode.insertBefore(this.parseHTMLFragment(value), element);
        detach(element);
    };
    /**
     * parseHTMLFragment method
     *
     * @param {string} value - specifies the string value
     * @returns {Element} - returns the element
     * @hidden

     */
    DOMNode.prototype.parseHTMLFragment = function (value) {
        /* eslint-disable */
        var temp = createElement('template');
        temp.innerHTML = value;
        if (temp.content instanceof DocumentFragment) {
            return temp.content;
        }
        else {
            return document.createRange().createContextualFragment(value);
        }
        /* eslint-enable */
    };
    /**
     * wrap method
     *
     * @param {Element} element - specifies the element
     * @param {Element} wrapper - specifies the element.
     * @returns {Element} - returns the element
     * @hidden

     */
    DOMNode.prototype.wrap = function (element, wrapper) {
        element.parentNode.insertBefore(wrapper, element);
        wrapper = element.previousSibling;
        wrapper.appendChild(element);
        return wrapper;
    };
    /**
     * insertAfter method
     *
     * @param {Element} newNode - specifies the new node element
     * @param {Element} referenceNode - specifies the referenece node
     * @returns {void}
     * @hidden

     */
    DOMNode.prototype.insertAfter = function (newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    };
    /**
     * wrapInner method
     *
     * @param {Element} parent - specifies the parent element.
     * @param {Element} wrapper - specifies the wrapper element.
     * @returns {Element} - returns the element
     * @hidden

     */
    DOMNode.prototype.wrapInner = function (parent, wrapper) {
        parent.appendChild(wrapper);
        wrapper = parent.querySelector('.e-rte-wrap-inner');
        wrapper.classList.remove('e-rte-wrap-inner');
        if (wrapper.classList.length === 0) {
            wrapper.removeAttribute('class');
        }
        while (parent.firstChild !== wrapper) {
            wrapper.appendChild(parent.firstChild);
        }
        return wrapper;
    };
    /**
     * unWrap method
     *
     * @param {Element} element - specifies the element.
     * @returns {Element} - returns the element.
     * @hidden

     */
    DOMNode.prototype.unWrap = function (element) {
        var parent = element.parentNode;
        var unWrapNode = [];
        while (element.firstChild) {
            unWrapNode.push(element.firstChild);
            parent.insertBefore(element.firstChild, element);
        }
        unWrapNode = unWrapNode.length > 0 ? unWrapNode : [element.parentNode];
        parent.removeChild(element);
        return unWrapNode;
    };
    /**
     * getSelectedNode method
     *
     * @param {Element} element - specifies the element
     * @param {number} index - specifies the index value.
     * @returns {Element} - returns the element
     * @hidden

     */
    DOMNode.prototype.getSelectedNode = function (element, index) {
        if (element.nodeType === Node.ELEMENT_NODE && element.childNodes.length > 0 &&
            element.childNodes[index - 1] && element.childNodes[index - 1].nodeType === Node.ELEMENT_NODE &&
            (element.childNodes[index - 1].classList.contains(markerClassName.startSelection) ||
                element.childNodes[index - 1].classList.contains(markerClassName.endSelection))) {
            element = element.childNodes[index - 1];
        }
        else if (element.nodeType === Node.ELEMENT_NODE && element.childNodes.length > 0 && element.childNodes[index]) {
            element = element.childNodes[index];
        }
        if (element.nodeType === Node.TEXT_NODE) {
            element = element.parentNode;
        }
        return element;
    };
    /**
     * nodeFinds method
     *
     * @param {Element} element - specifies the element.
     * @param {Element[]} elements - specifies the array of elements
     * @returns {Element[]} - returnts the array elements
     * @hidden

     */
    DOMNode.prototype.nodeFinds = function (element, elements) {
        var existNodes = [];
        for (var i = 0; i < elements.length; i++) {
            if (element.contains(elements[i]) && element !== elements[i]) {
                existNodes.push(elements[i]);
            }
        }
        return existNodes;
    };
    /**
     * isEditorArea method
     *
     * @returns {boolean} - returns the boolean value
     * @hidden

     */
    DOMNode.prototype.isEditorArea = function () {
        var range = this.getRangePoint(0);
        var element;
        for (element = range.commonAncestorContainer; element && !this.isElement(element); null) {
            element = element.parentNode;
        }
        return !!this.isElement(element);
    };
    /**
     * getRangePoint method
     *
     * @param {number} point - specifies the number value.
     * @returns {Range} - returns the range.
     * @hidden

     */
    DOMNode.prototype.getRangePoint = function (point) {
        var selection = this.getSelection();
        var ranges = [];
        if (selection && selection.getRangeAt && selection.rangeCount) {
            ranges = [];
            for (var f = 0; f < selection.rangeCount; f++) {
                ranges.push(selection.getRangeAt(f));
            }
        }
        else {
            ranges = [this.currentDocument.createRange()];
        }
        return 'undefined' !== typeof point ? ranges[point] : ranges;
    };
    DOMNode.prototype.getSelection = function () {
        return this.nodeSelection.get(this.currentDocument);
    };
    /**
     * getPreviousNode method
     *
     * @param {Element} element - specifies the element
     * @returns {Element} - returns the element
     * @hidden

     */
    DOMNode.prototype.getPreviousNode = function (element) {
        element = element.previousElementSibling;
        for (; element && element.textContent === '\n'; null) {
            element = element.previousElementSibling;
        }
        return element;
    };
    /**
     * encode method
     *
     * @param {string} value - specifies the string value
     * @returns {string} - specifies the string value
     * @hidden

     */
    DOMNode.prototype.encode = function (value) {
        var divNode = document.createElement('div');
        divNode.innerText = value;
        // eslint-disable-next-line
        return divNode.innerHTML.replace(/<br\s*[\/]?>/gi, '\n');
    };
    /**
     * saveMarker method
     *
     * @param {NodeSelection} save - specifies the node selection,
     * @param {string} action - specifies the action  value.
     * @returns {NodeSelection} - returns the value
     * @hidden

     */
    DOMNode.prototype.saveMarker = function (save, action) {
        var start = this.parent.querySelector('.' + markerClassName.startSelection);
        var end = this.parent.querySelector('.' + markerClassName.endSelection);
        var startTextNode;
        var endTextNode;
        if (start.textContent === '' && isNOU(end) && action !== 'tab') {
            if (isNOU(action) && save.range.startContainer.nodeType === 1 &&
                save.range.startContainer.querySelectorAll('audio,video,image').length === 0) {
                start.innerHTML = '<br>';
            }
            else if (start.childNodes.length === 1 && start.childNodes[0].nodeName === 'BR') {
                start.innerHTML = '&#65279;&#65279;<br>';
            }
            else {
                start.innerHTML = '&#65279;&#65279;';
            }
        }
        if (this.hasClass(start, markerClassName.startSelection) && start.classList.length > 1) {
            var replace = this.createTagString(CONSTANT.DEFAULT_TAG, start, this.encode(start.textContent));
            this.replaceWith(start, replace);
            start = this.parent.querySelector('.' + markerClassName.startSelection);
            start.classList.remove(markerClassName.startSelection);
            startTextNode = start.childNodes[0];
        }
        else {
            startTextNode = this.unWrap(start)[0];
        }
        if (this.hasClass(end, markerClassName.endSelection) && end.classList.length > 1) {
            var replace = this.createTagString(CONSTANT.DEFAULT_TAG, end, this.encode(end.textContent));
            this.replaceWith(end, replace);
            end = this.parent.querySelector('.' + markerClassName.endSelection);
            end.classList.remove(markerClassName.endSelection);
            endTextNode = end.childNodes[0];
        }
        else {
            endTextNode = end ? this.unWrap(end)[0] : startTextNode;
        }
        save.startContainer = save.getNodeArray(startTextNode, true);
        save.endContainer = save.getNodeArray(endTextNode, false);
        return save;
    };
    DOMNode.prototype.marker = function (className, textContent) {
        return '<span class="' + className + '">' + textContent + '</span>';
    };
    /**
     * setMarker method
     *
     * @param {NodeSelection} save - specifies the node selection.
     * @returns {void}
     * @hidden

     */
    DOMNode.prototype.setMarker = function (save) {
        var range = save.range;
        var startChildNodes = range.startContainer.childNodes;
        var isTableStart = startChildNodes.length > 1 && startChildNodes[0].nodeName === 'TABLE';
        var start = ((isTableStart ? getLastTextNode(startChildNodes[range.startOffset + 1]) :
            startChildNodes[(range.startOffset > 0) ? (range.startOffset - 1) : range.startOffset]) || range.startContainer);
        var end = (range.endContainer.childNodes[(range.endOffset > 0) ? (range.endOffset - 1) : range.endOffset]
            || range.endContainer);
        if ((start.nodeType === Node.ELEMENT_NODE && end.nodeType === Node.ELEMENT_NODE) && (start.contains(end) || end.contains(start))) {
            var existNode = start.contains(end) ? start : end;
            var isElement = existNode.nodeType !== Node.TEXT_NODE;
            if (isElement) {
                var nodes = [];
                var textNodes = [];
                for (var node = existNode; existNode.contains(node); null) {
                    if (nodes.indexOf(node) < 0 && node.childNodes && node.childNodes.length) {
                        nodes.push(node);
                        node = node.childNodes[0];
                    }
                    else if (node.nextSibling) {
                        node = node.nextSibling;
                    }
                    else if (node.parentNode) {
                        node = node.parentNode;
                        nodes.push(node);
                    }
                    if (textNodes.indexOf(node) < 0 && (node.nodeType === Node.TEXT_NODE ||
                        (CONSTANT.IGNORE_BLOCK_TAGS.indexOf(node.parentNode.tagName.toLocaleLowerCase()) >= 0
                            && (node.tagName === 'BR' || node.tagName === 'IMG')))) {
                        textNodes.push(node);
                    }
                }
                if (textNodes.length) {
                    start = start.contains(end) ? textNodes[0] : start;
                    end = textNodes[textNodes.length - 1];
                }
            }
        }
        if (start !== end) {
            if (start.nodeType !== Node.TEXT_NODE && ((start.tagName === 'BR' &&
                CONSTANT.IGNORE_BLOCK_TAGS.indexOf(start.parentNode.tagName.toLocaleLowerCase()) >= 0) ||
                start.tagName === 'IMG')) {
                this.replaceWith(start, this.marker(markerClassName.startSelection, this.encode(start.textContent)));
                var markerStart = range.startContainer.querySelector('.' + markerClassName.startSelection);
                markerStart.appendChild(start);
            }
            else {
                if (start.nodeType !== 3 && start.nodeName !== '#text' && start.nodeName !== 'BR') {
                    var marker = this.marker(markerClassName.startSelection, '');
                    append([this.parseHTMLFragment(marker)], start);
                }
                else {
                    this.replaceWith(start, this.marker(markerClassName.startSelection, this.encode(start.textContent)));
                }
            }
            if (end.nodeType !== Node.TEXT_NODE && end.tagName === 'BR' &&
                CONSTANT.IGNORE_BLOCK_TAGS.indexOf(end.parentNode.tagName.toLocaleLowerCase()) >= 0) {
                this.replaceWith(end, this.marker(markerClassName.endSelection, this.encode(end.textContent)));
                var markerEnd = range.endContainer.querySelector('.' + markerClassName.endSelection);
                markerEnd.appendChild(end);
            }
            else {
                this.ensureSelfClosingTag(end, markerClassName.endSelection, range);
            }
        }
        else {
            this.ensureSelfClosingTag(start, markerClassName.startSelection, range);
        }
    };
    /**
     * ensureSelfClosingTag method
     *
     * @param {Element} start - specifies the element.
     * @param {string} className - specifes the class name string value
     * @param {Range} range - specifies the range value
     * @returns {void}
     * @hidden

     */
    DOMNode.prototype.ensureSelfClosingTag = function (start, className, range) {
        var isTable = false;
        if (start.nodeType === 3) {
            this.replaceWith(start, this.marker(className, this.encode(start.textContent)));
        }
        else if (start.tagName === 'BR') {
            this.replaceWith(start, this.marker(className, this.encode(start.textContent)));
            var markerStart = range.startContainer.querySelector('.' + className);
            markerStart.appendChild(start);
        }
        else {
            if (start.tagName === 'IMG') {
                var parNode = document.createElement('p');
                start.parentElement.insertBefore(parNode, start);
                parNode.appendChild(start);
                start = parNode.children[0];
            }
            if (start.tagName === 'TABLE') {
                isTable = true;
                if (start.textContent === '') {
                    var tdNode = start.querySelectorAll('td');
                    start = tdNode[tdNode.length - 1];
                    start = !isNOU(start.childNodes[0]) ? start.childNodes[0] : start;
                }
                else {
                    var lastNode = start.lastChild;
                    while (lastNode.nodeType !== 3 && lastNode.nodeName !== '#text' &&
                        lastNode.nodeName !== 'BR') {
                        lastNode = lastNode.lastChild;
                    }
                    start = lastNode;
                }
            }
            for (var i = 0; i < selfClosingTags.length; i++) {
                start = (start.tagName === selfClosingTags[i] && !isTable) ? start.parentNode : start;
            }
            if (start.nodeType === 3 && start.nodeName === '#text') {
                this.replaceWith(start, this.marker(className, this.encode(start.textContent)));
            }
            else if (start.nodeName === 'BR') {
                this.replaceWith(start, this.marker(markerClassName.endSelection, this.encode(start.textContent)));
                var markerEnd = range.endContainer.querySelector('.' + markerClassName.endSelection);
                markerEnd.appendChild(start);
            }
            else {
                var marker = this.marker(className, '');
                append([this.parseHTMLFragment(marker)], start);
            }
        }
    };
    /**
     * createTempNode method
     *
     * @param {Element} element - specifies the element.
     * @returns {Element} - returns the element
     * @hidden

     */
    DOMNode.prototype.createTempNode = function (element) {
        var textContent = element.textContent;
        if (element.tagName === 'BR') {
            var wrapper = '<' + CONSTANT.DEFAULT_TAG + '></' + CONSTANT.DEFAULT_TAG + '>';
            var node = element.parentNode;
            if (CONSTANT.IGNORE_BLOCK_TAGS.indexOf(node.tagName.toLocaleLowerCase()) >= 0) {
                element = this.wrap(element, this.parseHTMLFragment(wrapper));
            }
        }
        else if (((element.nodeType !== Node.TEXT_NODE &&
            (element.classList.contains(markerClassName.startSelection) ||
                element.classList.contains(markerClassName.endSelection))) ||
            textContent.replace(/\n/g, '').replace(/(^ *)|( *$)/g, '').length > 0 ||
            textContent.length && textContent.indexOf('\n') < 0)) {
            var wrapper = '<' + CONSTANT.DEFAULT_TAG + '></' + CONSTANT.DEFAULT_TAG + '>';
            var target = element;
            element = this.wrap(element, this.parseHTMLFragment(wrapper));
            var ignoreBr = target.nodeType === Node.ELEMENT_NODE && target.firstChild && target.firstChild.nodeName === 'BR'
                && (target.classList.contains(markerClassName.startSelection) ||
                    target.classList.contains(markerClassName.endSelection));
            if (!ignoreBr && element.nextElementSibling && element.nextElementSibling.tagName === 'BR') {
                element.appendChild(element.nextElementSibling);
            }
        }
        return element;
    };
    /**
     * getImageTagInSelection method
     *
     * @returns {void}
     * @hidden

     */
    DOMNode.prototype.getImageTagInSelection = function () {
        var selection = this.getSelection();
        if (this.isEditorArea() && selection.rangeCount) {
            return selection.focusNode.querySelectorAll('img');
        }
        return null;
    };
    /**
     * blockNodes method
     *
     * @returns {Node[]} - returns the node array values
     * @hidden

     */
    DOMNode.prototype.blockNodes = function () {
        var collectionNodes = [];
        var selection = this.getSelection();
        if (this.isEditorArea() && selection.rangeCount) {
            var ranges = this.getRangePoint();
            for (var j = 0; j < ranges.length; j++) {
                var parentNode = void 0;
                var range = ranges[j];
                var startNode = this.getSelectedNode(range.startContainer, range.startOffset);
                var endNode = this.getSelectedNode(range.endContainer, range.endOffset);
                if (this.isBlockNode(startNode) && collectionNodes.indexOf(startNode) < 0) {
                    collectionNodes.push(startNode);
                }
                parentNode = this.blockParentNode(startNode);
                if (parentNode && collectionNodes.indexOf(parentNode) < 0) {
                    if (CONSTANT.IGNORE_BLOCK_TAGS.indexOf(parentNode.tagName.toLocaleLowerCase()) >= 0 && (startNode.tagName === 'BR' ||
                        startNode.nodeType === Node.TEXT_NODE ||
                        startNode.classList.contains(markerClassName.startSelection) ||
                        startNode.classList.contains(markerClassName.endSelection))) {
                        var tempNode = startNode.previousSibling &&
                            startNode.previousSibling.nodeType === Node.TEXT_NODE ?
                            startNode.previousSibling : startNode;
                        if (!startNode.nextSibling && !startNode.previousSibling && startNode.tagName === 'BR') {
                            collectionNodes.push(tempNode);
                        }
                        else {
                            collectionNodes.push(this.createTempNode(tempNode));
                        }
                    }
                    else {
                        collectionNodes.push(parentNode);
                    }
                }
                var nodes = [];
                for (var node = startNode; node !== endNode && node !== this.parent; null) {
                    if (nodes.indexOf(node) < 0 && node.childNodes && node.childNodes.length) {
                        nodes.push(node);
                        node = node.childNodes[0];
                    }
                    else if (node && node.nodeType !== 8 && (node.tagName === 'BR' || (node.nodeType === Node.TEXT_NODE &&
                        node.textContent.trim() !== '') || (node.nodeType !== Node.TEXT_NODE &&
                        (node.classList.contains(markerClassName.startSelection) ||
                            node.classList.contains(markerClassName.endSelection)))) &&
                        CONSTANT.IGNORE_BLOCK_TAGS.indexOf(node.parentNode.tagName.toLocaleLowerCase()) >= 0) {
                        node = this.createTempNode(node);
                    }
                    else if (node.nextSibling && node.nextSibling.nodeType !== 8 &&
                        (node.nextSibling.tagName === 'BR' ||
                            node.nextSibling.nodeType === Node.TEXT_NODE ||
                            node.nextSibling.classList.contains(markerClassName.startSelection) ||
                            node.nextSibling.classList.contains(markerClassName.endSelection)) &&
                        CONSTANT.IGNORE_BLOCK_TAGS.indexOf(node.nextSibling.parentNode.tagName.toLocaleLowerCase()) >= 0) {
                        node = this.createTempNode(node.nextSibling);
                    }
                    else if (node.nextSibling) {
                        node = node.nextSibling;
                    }
                    else if (node.parentNode) {
                        node = node.parentNode;
                        nodes.push(node);
                    }
                    if (collectionNodes.indexOf(node) < 0 && node.nodeType === Node.ELEMENT_NODE &&
                        CONSTANT.IGNORE_BLOCK_TAGS.indexOf(node.parentNode.tagName.toLocaleLowerCase()) >= 0 &&
                        (node.classList.contains(markerClassName.startSelection) ||
                            node.classList.contains(markerClassName.endSelection))) {
                        collectionNodes.push(this.createTempNode(node));
                    }
                    if (this.isBlockNode(node) && this.ignoreTableTag(node) && nodes.indexOf(node) < 0 &&
                        collectionNodes.indexOf(node) < 0 && (node !== endNode || range.endOffset > 0)) {
                        collectionNodes.push(node);
                    }
                    if (node.nodeName === 'IMG' && node.parentElement.contentEditable === 'true') {
                        collectionNodes.push(node);
                    }
                }
                parentNode = this.blockParentNode(endNode);
                if (parentNode && this.ignoreTableTag(parentNode) && collectionNodes.indexOf(parentNode) < 0 &&
                    (!isNOU(parentNode.previousElementSibling) && parentNode.previousElementSibling.tagName !== 'IMG')) {
                    collectionNodes.push(parentNode);
                }
            }
        }
        for (var i = collectionNodes.length - 1; i > 0; i--) {
            var nodes = this.nodeFinds(collectionNodes[i], collectionNodes);
            if (nodes.length) {
                var listNodes = collectionNodes[i].querySelectorAll('ul, ol');
                if (collectionNodes[i].tagName === 'LI' && listNodes.length > 0) {
                    continue;
                }
                else {
                    collectionNodes.splice(i, 1);
                }
            }
        }
        return collectionNodes;
    };
    DOMNode.prototype.ignoreTableTag = function (element) {
        return !(CONSTANT.TABLE_BLOCK_TAGS.indexOf(element.tagName.toLocaleLowerCase()) >= 0);
    };
    return DOMNode;
}());
export { DOMNode };
