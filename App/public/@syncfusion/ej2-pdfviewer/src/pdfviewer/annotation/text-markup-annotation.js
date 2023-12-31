import { createElement, Browser, isNullOrUndefined, isBlazor } from '@syncfusion/ej2-base';
/**
 * The `TextMarkupAnnotation` module is used to handle text markup annotation actions of PDF viewer.
 *
 * @hidden
 */
var TextMarkupAnnotation = /** @class */ (function () {
    /**
     * @param pdfViewer
     * @param viewerBase
     * @private
     */
    function TextMarkupAnnotation(pdfViewer, viewerBase) {
        var _this = this;
        /**
         * @private
         */
        this.currentTextMarkupAddMode = '';
        /**
         * @private
         */
        this.selectTextMarkupCurrentPage = null;
        /**
         * @private
         */
        this.currentTextMarkupAnnotation = null;
        /**
         * @private
         */
        this.isAddAnnotationProgramatically = false;
        this.currentAnnotationIndex = null;
        this.isAnnotationSelect = false;
        /**
         * @private
         */
        this.isDropletClicked = false;
        /**
         * @private
         */
        this.isRightDropletClicked = false;
        /**
         * @private
         */
        this.isLeftDropletClicked = false;
        /**
         * @private
         */
        this.isSelectionMaintained = false;
        this.isExtended = false;
        this.isNewAnnotation = false;
        this.selectedTextMarkup = null;
        this.multiPageCollection = [];
        this.triggerAddEvent = false;
        /**
         * @private
         */
        this.isSelectedAnnotation = false;
        this.dropletHeight = 20;
        /**
         * @private
         */
        this.annotationClickPosition = {};
        // eslint-disable-next-line
        this.maintainSelection = function (event) {
            _this.isDropletClicked = true;
            _this.pdfViewer.textSelectionModule.initiateSelectionByTouch();
            _this.isExtended = true;
            _this.pdfViewer.textSelectionModule.selectionRangeArray = [];
        };
        // eslint-disable-next-line
        this.selectionEnd = function (event) {
            if (_this.isDropletClicked) {
                _this.isDropletClicked = false;
            }
        };
        // eslint-disable-next-line
        this.annotationLeftMove = function (event) {
            if (_this.isDropletClicked) {
                _this.isLeftDropletClicked = true;
            }
        };
        // eslint-disable-next-line
        this.annotationRightMove = function (event) {
            if (_this.isDropletClicked) {
                _this.isRightDropletClicked = true;
            }
        };
        this.pdfViewer = pdfViewer;
        this.pdfViewerBase = viewerBase;
    }
    /**
     * @private
     */
    TextMarkupAnnotation.prototype.createAnnotationSelectElement = function () {
        // eslint-disable-next-line max-len
        this.dropDivAnnotationLeft = createElement('div', { id: this.pdfViewer.element.id + '_droplet_left', className: 'e-pv-drop' });
        this.dropDivAnnotationLeft.style.borderRight = '2px solid';
        // eslint-disable-next-line max-len
        this.dropDivAnnotationRight = createElement('div', { id: this.pdfViewer.element.id + '_droplet_right', className: 'e-pv-drop' });
        this.dropDivAnnotationRight.style.borderLeft = '2px solid';
        this.dropElementLeft = createElement('div', { className: 'e-pv-droplet', id: this.pdfViewer.element.id + '_dropletspan_left' });
        this.dropElementLeft.style.transform = 'rotate(0deg)';
        this.dropDivAnnotationLeft.appendChild(this.dropElementLeft);
        this.dropElementRight = createElement('div', { className: 'e-pv-droplet', id: this.pdfViewer.element.id + '_dropletspan_right' });
        this.dropElementRight.style.transform = 'rotate(-90deg)';
        this.dropDivAnnotationRight.appendChild(this.dropElementRight);
        this.pdfViewerBase.pageContainer.appendChild(this.dropDivAnnotationLeft);
        this.pdfViewerBase.pageContainer.appendChild(this.dropDivAnnotationRight);
        this.dropElementLeft.style.top = '20px';
        this.dropElementRight.style.top = '20px';
        this.dropElementRight.style.left = '-8px';
        this.dropElementLeft.style.left = '-8px';
        this.dropDivAnnotationLeft.style.display = 'none';
        this.dropDivAnnotationRight.style.display = 'none';
        this.dropDivAnnotationLeft.addEventListener('mousedown', this.maintainSelection);
        this.dropDivAnnotationLeft.addEventListener('mousemove', this.annotationLeftMove);
        this.dropDivAnnotationLeft.addEventListener('mouseup', this.selectionEnd);
        this.dropDivAnnotationRight.addEventListener('mousedown', this.maintainSelection);
        this.dropDivAnnotationRight.addEventListener('mousemove', this.annotationRightMove);
        this.dropDivAnnotationRight.addEventListener('mouseup', this.selectionEnd);
    };
    /**
     * @param target
     * @param x
     * @param y
     * @param target
     * @param x
     * @param y
     * @param target
     * @param x
     * @param y
     * @private
     */
    // eslint-disable-next-line
    TextMarkupAnnotation.prototype.textSelect = function (target, x, y) {
        if (this.isLeftDropletClicked) {
            var leftElement = this.dropDivAnnotationRight.getBoundingClientRect();
            var rightElement = this.dropDivAnnotationLeft.getBoundingClientRect();
            var clientX = x;
            var clientY = y;
            if (target.classList.contains('e-pv-text')) {
                if ((rightElement.top - 25) > leftElement.top) {
                    this.pdfViewer.textSelectionModule.textSelectionOnDrag(target, clientX, clientY, true);
                }
                else {
                    this.pdfViewer.textSelectionModule.textSelectionOnDrag(target, clientX, clientY, false);
                }
                this.updateLeftposition(clientX, clientY);
            }
        }
        else if (this.isRightDropletClicked) {
            var leftElement = this.dropDivAnnotationLeft.getBoundingClientRect();
            var clientX = x;
            var clientY = y;
            if (target.classList.contains('e-pv-text')) {
                if ((clientY) >= leftElement.top) {
                    this.pdfViewer.textSelectionModule.textSelectionOnDrag(target, clientX, clientY, true);
                }
                else {
                    this.pdfViewer.textSelectionModule.textSelectionOnDrag(target, clientX, clientY, false);
                }
                this.updatePosition(clientX, clientY);
            }
        }
    };
    /**
     * @param hide
     * @private
     */
    TextMarkupAnnotation.prototype.showHideDropletDiv = function (hide) {
        var type = this.pdfViewer.annotationModule.textMarkupAnnotationModule.currentTextMarkupAddMode;
        var isEnableResizer = this.isEnableTextMarkupResizer(type);
        if (isEnableResizer && this.dropDivAnnotationLeft && this.dropDivAnnotationRight) {
            if (hide) {
                this.dropDivAnnotationLeft.style.display = 'none';
                this.dropDivAnnotationRight.style.display = 'none';
            }
            else {
                this.dropDivAnnotationLeft.style.display = '';
                this.dropDivAnnotationRight.style.display = '';
                this.updateDropletStyles(type);
            }
        }
    };
    /**
     * @param type
     * @private
     */
    TextMarkupAnnotation.prototype.isEnableTextMarkupResizer = function (type) {
        var isEnableResizer = false;
        if (type) {
            if (type === 'Highlight' && this.pdfViewer.highlightSettings.enableTextMarkupResizer) {
                isEnableResizer = true;
            }
            else if (type === 'Underline' && this.pdfViewer.underlineSettings.enableTextMarkupResizer) {
                isEnableResizer = true;
            }
            else if (type === 'Strikethrough' && this.pdfViewer.strikethroughSettings.enableTextMarkupResizer) {
                isEnableResizer = true;
            }
            else if (this.pdfViewer.enableTextMarkupResizer) {
                isEnableResizer = true;
            }
        }
        else {
            if (this.pdfViewer.enableTextMarkupResizer) {
                isEnableResizer = true;
            }
            else if (this.pdfViewer.highlightSettings.enableTextMarkupResizer) {
                isEnableResizer = true;
            }
            else if (this.pdfViewer.underlineSettings.enableTextMarkupResizer) {
                isEnableResizer = true;
            }
            else if (this.pdfViewer.strikethroughSettings.enableTextMarkupResizer) {
                isEnableResizer = true;
            }
        }
        return isEnableResizer;
    };
    TextMarkupAnnotation.prototype.updateDropletStyles = function (type) {
        if (this.isEnableTextMarkupResizer(type) && this.dropDivAnnotationLeft && this.dropDivAnnotationLeft.offsetWidth > 0) {
            this.dropDivAnnotationLeft.style.width = this.dropletHeight * this.pdfViewerBase.getZoomFactor() + 'px';
            this.dropDivAnnotationRight.style.width = this.dropletHeight * this.pdfViewerBase.getZoomFactor() + 'px';
            this.dropElementLeft.style.width = this.dropletHeight * this.pdfViewerBase.getZoomFactor() + 'px';
            this.dropElementRight.style.width = this.dropletHeight * this.pdfViewerBase.getZoomFactor() + 'px';
            this.dropDivAnnotationLeft.style.height = this.dropletHeight * this.pdfViewerBase.getZoomFactor() + 'px';
            this.dropDivAnnotationRight.style.height = this.dropletHeight * this.pdfViewerBase.getZoomFactor() + 'px';
            this.dropElementLeft.style.height = this.dropletHeight * this.pdfViewerBase.getZoomFactor() + 'px';
            this.dropElementRight.style.height = this.dropletHeight * this.pdfViewerBase.getZoomFactor() + 'px';
            this.dropElementLeft.style.top = this.dropletHeight * this.pdfViewerBase.getZoomFactor() + 'px';
            this.dropElementRight.style.top = this.dropletHeight * this.pdfViewerBase.getZoomFactor() + 'px';
        }
    };
    TextMarkupAnnotation.prototype.updateAnnotationBounds = function () {
        this.isSelectionMaintained = false;
        // eslint-disable-next-line
        var annotation = this.currentTextMarkupAnnotation;
        if (annotation && annotation.isMultiSelect) {
            this.showHideDropletDiv(true);
            this.updateMultiAnnotBounds(annotation);
        }
        else if (annotation && annotation.bounds) {
            this.retreieveSelection(annotation, null);
            this.pdfViewer.textSelectionModule.maintainSelection(this.selectTextMarkupCurrentPage, false);
            this.isSelectionMaintained = true;
            window.getSelection().removeAllRanges();
        }
    };
    // eslint-disable-next-line
    TextMarkupAnnotation.prototype.updateMultiAnnotBounds = function (annotation) {
        if (!annotation.annotpageNumbers) {
            var annotationList = this.getAnnotations(annotation.pageNumber, null);
            if (annotationList) {
                for (var z = 0; z < annotationList.length; z++) {
                    if (annotationList[z].annotName === annotation.annotName) {
                        annotation = annotationList[z];
                        break;
                    }
                }
            }
        }
        var lowestNumber = annotation.annotpageNumbers[0];
        var highestNumber = annotation.annotpageNumbers[0];
        for (var p = 0; p < annotation.annotpageNumbers.length; p++) {
            var currentPage = annotation.annotpageNumbers[p];
            if (currentPage >= highestNumber) {
                highestNumber = currentPage;
            }
            if (currentPage <= lowestNumber) {
                lowestNumber = currentPage;
            }
        }
        for (var k = lowestNumber; k <= highestNumber; k++) {
            var annotationList = this.getAnnotations(k, null);
            if (annotationList) {
                for (var j = 0; j < annotation.annotNameCollection.length; j++) {
                    // eslint-disable-next-line
                    var currentAnnot = annotation.annotNameCollection[j];
                    for (var z = 0; z < annotationList.length; z++) {
                        if (annotationList[z].annotName === currentAnnot) {
                            // eslint-disable-next-line
                            var newAnnotation = annotationList[z];
                            this.retreieveSelection(newAnnotation, null);
                            this.pdfViewer.textSelectionModule.maintainSelection(newAnnotation.pageNumber, false);
                        }
                    }
                }
            }
        }
        this.isSelectionMaintained = true;
        window.getSelection().removeAllRanges();
    };
    // eslint-disable-next-line
    TextMarkupAnnotation.prototype.retreieveSelection = function (annotation, element) {
        for (var k = 0; k < annotation.bounds.length; k++) {
            // eslint-disable-next-line
            var bound = annotation.bounds[k];
            var x = (bound.left ? bound.left : bound.Left) * this.pdfViewerBase.getZoomFactor();
            var y = (bound.top ? bound.top : bound.Top) * this.pdfViewerBase.getZoomFactor();
            var width = (bound.width ? bound.width : bound.Width) * this.pdfViewerBase.getZoomFactor();
            var height = bound.height ? bound.height : bound.Height;
            // eslint-disable-next-line
            var textLayer = this.pdfViewerBase.getElement('_textLayer_' + annotation.pageNumber);
            if (textLayer) {
                // eslint-disable-next-line
                var textDivs = textLayer.childNodes;
                for (var n = 0; n < textDivs.length; n++) {
                    if (textDivs[n]) {
                        // eslint-disable-next-line
                        var rangebounds = textDivs[n].getBoundingClientRect();
                        var top_1 = this.getClientValueTop(rangebounds.top, annotation.pageNumber);
                        // eslint-disable-next-line max-len
                        var currentLeft = rangebounds.left - this.pdfViewerBase.getElement('_pageDiv_' + annotation.pageNumber).getBoundingClientRect().left;
                        var totalLeft = currentLeft + rangebounds.width;
                        // eslint-disable-next-line
                        var textDiVLeft = parseInt(textDivs[n].style.left);
                        // eslint-disable-next-line
                        var currentTop = parseInt(textDivs[n].style.top);
                        var isLeftBounds = this.pdfViewer.textSelectionModule.checkLeftBounds(currentLeft, textDiVLeft, totalLeft, x);
                        var isTopBounds = this.pdfViewer.textSelectionModule.checkTopBounds(top_1, currentTop, y);
                        if (isLeftBounds && isTopBounds) {
                            element = textDivs[n];
                            break;
                        }
                    }
                }
                if (element != null) {
                    // eslint-disable-next-line
                    var boundingRect = this.pdfViewerBase.getElement('_textLayer_' + annotation.pageNumber).getBoundingClientRect();
                    this.pdfViewer.textSelectionModule.textSelectionOnMouseMove(element, x + boundingRect.left, y + boundingRect.top, false);
                    if ((annotation.bounds.length - 1) === k) {
                        // eslint-disable-next-line max-len
                        this.pdfViewer.textSelectionModule.textSelectionOnMouseMove(element, x + boundingRect.left + width, y + boundingRect.top, false);
                    }
                }
            }
        }
    };
    /**
     * @param x
     * @param y
     * @param isSelected
     * @private
     */
    TextMarkupAnnotation.prototype.updatePosition = function (x, y, isSelected) {
        this.showHideDropletDiv(false);
        var pageTopValue = this.pdfViewerBase.pageSize[this.pdfViewerBase.currentPageNumber - 1].top;
        var topClientValue = this.getClientValueTop(y, this.pdfViewerBase.currentPageNumber - 1);
        // eslint-disable-next-line
        var rightDivElement = document.getElementById(this.pdfViewer.element.id + '_droplet_right');
        if (isSelected) {
            // eslint-disable-next-line max-len
            rightDivElement.style.top = topClientValue * this.pdfViewerBase.getZoomFactor() + pageTopValue * this.pdfViewerBase.getZoomFactor() + 'px';
        }
        else {
            // eslint-disable-next-line max-len
            rightDivElement.style.top = topClientValue + pageTopValue * this.pdfViewerBase.getZoomFactor() + 'px';
        }
        // eslint-disable-next-line max-len
        rightDivElement.style.left = x + this.pdfViewerBase.viewerContainer.scrollLeft - this.pdfViewerBase.viewerContainer.getBoundingClientRect().left + 'px';
    };
    /**
     * @param x
     * @param y
     * @param isSelected
     * @param x
     * @param y
     * @param isSelected
     * @private
     */
    TextMarkupAnnotation.prototype.updateLeftposition = function (x, y, isSelected) {
        this.showHideDropletDiv(false);
        var pageTopValue = this.pdfViewerBase.pageSize[this.pdfViewerBase.currentPageNumber - 1].top;
        var topClientValue = this.getClientValueTop(y, this.pdfViewerBase.currentPageNumber - 1);
        // eslint-disable-next-line
        var leftDivElement = document.getElementById(this.pdfViewer.element.id + '_droplet_left');
        leftDivElement.style.display = '';
        if (isSelected) {
            // eslint-disable-next-line max-len
            leftDivElement.style.top = topClientValue * this.pdfViewerBase.getZoomFactor() + pageTopValue * this.pdfViewerBase.getZoomFactor() + 'px';
        }
        else {
            // eslint-disable-next-line max-len
            leftDivElement.style.top = topClientValue + pageTopValue * this.pdfViewerBase.getZoomFactor() + 'px';
        }
        // eslint-disable-next-line max-len
        leftDivElement.style.left = x + this.pdfViewerBase.viewerContainer.scrollLeft - this.pdfViewerBase.viewerContainer.getBoundingClientRect().left - (this.dropletHeight * this.pdfViewerBase.getZoomFactor()) + 'px';
    };
    TextMarkupAnnotation.prototype.getClientValueTop = function (clientValue, pageNumber) {
        if (this.pdfViewerBase.getElement('_pageDiv_' + pageNumber)) {
            // eslint-disable-next-line max-len
            return clientValue - this.pdfViewerBase.getElement('_pageDiv_' + pageNumber).getBoundingClientRect().top;
        }
        else {
            return clientValue;
        }
    };
    /**
     * @param textMarkupAnnotations
     * @param pageNumber
     * @param isImportTextMarkup
     * @param textMarkupAnnotations
     * @param pageNumber
     * @param isImportTextMarkup
     * @param textMarkupAnnotations
     * @param pageNumber
     * @param isImportTextMarkup
     * @private
     */
    // eslint-disable-next-line
    TextMarkupAnnotation.prototype.renderTextMarkupAnnotationsInPage = function (textMarkupAnnotations, pageNumber, isImportTextMarkup, isAnnotOrderAction) {
        var canvas = this.pdfViewerBase.getElement('_annotationCanvas_' + pageNumber);
        if (isImportTextMarkup) {
            this.renderTextMarkupAnnotations(null, pageNumber, canvas, this.pdfViewerBase.getZoomFactor());
            this.renderTextMarkupAnnotations(textMarkupAnnotations, pageNumber, canvas, this.pdfViewerBase.getZoomFactor(), true);
        }
        else {
            this.renderTextMarkupAnnotations(textMarkupAnnotations, pageNumber, canvas, this.pdfViewerBase.getZoomFactor(), null, isAnnotOrderAction);
        }
    };
    // eslint-disable-next-line
    TextMarkupAnnotation.prototype.renderTextMarkupAnnotations = function (textMarkupAnnotations, pageNumber, canvas, factor, isImportAction, isAnnotOrderAction) {
        if (canvas) {
            var context = canvas.getContext('2d');
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.setLineDash([]);
            // eslint-disable-next-line
            var annotations = void 0;
            if (!isImportAction && !isAnnotOrderAction) {
                annotations = this.getAnnotations(pageNumber, textMarkupAnnotations);
            }
            else {
                annotations = textMarkupAnnotations;
            }
            if (annotations) {
                for (var i = 0; i < annotations.length; i++) {
                    // eslint-disable-next-line
                    var annotation = annotations[i];
                    var annotationObject = null;
                    var isAnnotationRotated = void 0;
                    if (annotation.TextMarkupAnnotationType) {
                        if (isImportAction) {
                            if (this.pdfViewerBase.isJsonImported) {
                                var newArray = [];
                                for (var i_1 = 0; i_1 < annotation.Bounds.length; i_1++) {
                                    // eslint-disable-next-line
                                    annotation.Bounds[i_1] = this.pdfViewerBase.importJsonForRotatedDocuments(annotation.Rotate, pageNumber, annotation.Bounds[i_1], annotation.AnnotationRotation);
                                    annotation.Bounds[i_1].left = annotation.Bounds[i_1].X;
                                    annotation.Bounds[i_1].top = annotation.Bounds[i_1].Y;
                                    newArray.push(annotation.Bounds[i_1]);
                                }
                                annotation.Bounds = newArray;
                                isAnnotationRotated = this.pdfViewerBase.isPageRotated;
                            }
                        }
                        // eslint-disable-next-line max-len
                        annotation.annotationAddMode = this.pdfViewer.annotationModule.findAnnotationMode(annotation, pageNumber, annotation.AnnotType);
                        // eslint-disable-next-line max-len
                        annotation.allowedInteractions = annotation.AllowedInteractions ? annotation.AllowedInteractions : this.pdfViewer.annotationModule.updateAnnotationAllowedInteractions(annotation);
                        // eslint-disable-next-line max-len
                        annotation.AnnotationSettings = annotation.AnnotationSettings ? annotation.AnnotationSettings : this.pdfViewer.annotationModule.updateAnnotationSettings(annotation);
                        // eslint-disable-next-line max-len
                        annotationObject = {
                            textMarkupAnnotationType: annotation.TextMarkupAnnotationType, color: annotation.Color, allowedInteractions: annotation.allowedInteractions, opacity: annotation.Opacity, bounds: annotation.Bounds, author: annotation.Author, subject: annotation.Subject, modifiedDate: annotation.ModifiedDate, note: annotation.Note, rect: annotation.Rect,
                            // eslint-disable-next-line max-len
                            annotName: annotation.AnnotName, comments: this.pdfViewer.annotationModule.getAnnotationComments(annotation.Comments, annotation, annotation.Author), review: { state: annotation.State, stateModel: annotation.StateModel, modifiedDate: annotation.ModifiedDate, author: annotation.Author }, shapeAnnotationType: 'textMarkup', pageNumber: pageNumber,
                            textMarkupContent: annotation.TextMarkupContent, textMarkupStartIndex: 0, textMarkupEndIndex: 0, annotationSelectorSettings: this.getSettings(annotation),
                            // eslint-disable-next-line max-len
                            customData: this.pdfViewer.annotation.getCustomData(annotation), annotationAddMode: annotation.annotationAddMode, annotationSettings: annotation.AnnotationSettings, isPrint: annotation.IsPrint, isCommentLock: annotation.IsCommentLock, isAnnotationRotated: isAnnotationRotated, annotationRotation: annotation.AnnotationRotation
                        };
                        if (annotation.IsMultiSelect) {
                            annotationObject.annotNameCollection = annotation.AnnotNameCollection;
                            annotationObject.annotpageNumbers = annotation.AnnotpageNumbers;
                            annotationObject.isMultiSelect = annotation.IsMultiSelect;
                        }
                        if (annotation.textMarkupContent && annotation.textMarkupContent !== '') {
                            annotationObject.textMarkupContent = annotation.textMarkupContent;
                            annotationObject.textMarkupStartIndex = annotation.textMarkupStartIndex;
                            annotationObject.textMarkupEndIndex = annotation.textMarkupEndIndex;
                        }
                        if (isNullOrUndefined(annotation.TextMarkupContent) && isNullOrUndefined(annotation.textMarkupContent)) {
                            var markedBounds = annotation.Bounds[0];
                            var storedData = this.pdfViewerBase.getStoredData(pageNumber, true);
                            if (isNullOrUndefined(storedData)) {
                                this.pdfViewerBase.requestForTextExtraction(pageNumber, annotationObject);
                            }
                            else {
                                var pageCharText = storedData.pageText.split('');
                                var characterBounds = this.pdfViewerBase.textLayer.characterBound[pageNumber];
                                var textMarkupContent = this.pdfViewerBase.textMarkUpContent(markedBounds, pageCharText, characterBounds);
                                annotationObject.textMarkupContent = textMarkupContent;
                            }
                        }
                        this.pdfViewer.annotationModule.storeAnnotations(pageNumber, annotationObject, '_annotations_textMarkup');
                        if (this.isAddAnnotationProgramatically) {
                            // eslint-disable-next-line
                            var settings = {
                                opacity: annotationObject.opacity, author: annotation.author, subject: annotation.subject, modifiedDate: annotation.modifiedDate,
                                // eslint-disable-next-line
                                width: annotationObject.bounds.width, height: annotationObject.bounds.height
                            };
                            this.pdfViewer.fireAnnotationAdd(annotationObject.pageNumber, annotationObject.annotName, annotation.TextMarkupAnnotationType, annotationObject.bounds, settings);
                        }
                    }
                    // eslint-disable-next-line max-len
                    var type = annotation.TextMarkupAnnotationType ? annotation.TextMarkupAnnotationType : annotation.textMarkupAnnotationType;
                    // eslint-disable-next-line
                    var annotBounds = annotation.Bounds ? annotation.Bounds : annotation.bounds;
                    var opacity = annotation.Opacity ? annotation.Opacity : annotation.opacity;
                    var color = annotation.Color ? annotation.Color : annotation.color;
                    var annotationRotation = annotation.AnnotationRotation ? annotation.AnnotationRotation : annotation.annotationRotation;
                    var isPrint = true;
                    if (annotation.TextMarkupAnnotationType) {
                        isPrint = annotation.IsPrint;
                    }
                    if (annotation.textMarkupAnnotationType) {
                        isPrint = annotation.isPrint;
                    }
                    switch (type) {
                        case 'Highlight':
                            this.renderHighlightAnnotation(annotBounds, opacity, color, context, factor, isPrint, pageNumber);
                            break;
                        case 'Strikethrough':
                            this.renderStrikeoutAnnotation(annotBounds, opacity, color, context, factor, pageNumber, isPrint, annotationRotation);
                            break;
                        case 'Underline':
                            this.renderUnderlineAnnotation(annotBounds, opacity, color, context, factor, pageNumber, isPrint, annotationRotation);
                            break;
                    }
                }
            }
            var isMaintainedSelector = false;
            if (this.currentTextMarkupAnnotation && this.currentTextMarkupAnnotation.annotpageNumbers) {
                for (var m = 0; m < this.currentTextMarkupAnnotation.annotpageNumbers.length; m++) {
                    if (pageNumber === this.currentTextMarkupAnnotation.annotpageNumbers[m]) {
                        isMaintainedSelector = true;
                        this.isAnnotationSelect = false;
                        break;
                    }
                }
            }
            if ((pageNumber === this.selectTextMarkupCurrentPage) || isMaintainedSelector) {
                if (!this.isAnnotationSelect) {
                    this.maintainAnnotationSelection();
                }
                else {
                    this.isAnnotationSelect = false;
                }
            }
        }
    };
    /**
     * @param annotation
     * @private
     */
    // eslint-disable-next-line
    TextMarkupAnnotation.prototype.getSettings = function (annotation) {
        var selector;
        if (annotation.AnnotationSelectorSettings) {
            selector = annotation.AnnotationSelectorSettings;
        }
        else {
            selector = this.getSelector(annotation.TextMarkupAnnotationType);
        }
        return selector;
    };
    /**
     * @param type
     * @private
     */
    TextMarkupAnnotation.prototype.drawTextMarkupAnnotations = function (type) {
        this.isTextMarkupAnnotationMode = true;
        this.pdfViewer.annotationModule.isFormFieldShape = false;
        this.currentTextMarkupAddMode = type;
        var isCleared = true;
        this.multiPageCollection = [];
        var selectionObject = this.pdfViewer.textSelectionModule ? this.pdfViewer.textSelectionModule.selectionRangeArray : [];
        if (selectionObject.length > 0 && !this.isSelectionMaintained) {
            this.convertSelectionToTextMarkup(type, selectionObject, this.pdfViewerBase.getZoomFactor());
        }
        var selection = window.getSelection();
        var targetElement;
        if (selection && selection.anchorNode) {
            targetElement = selection.anchorNode.parentElement;
        }
        if (this.isEnableTextMarkupResizer(type) && this.isExtended && window.getSelection().toString()) {
            var pageBounds = this.getDrawnBounds();
            if (pageBounds[0] && pageBounds[0].bounds) {
                // eslint-disable-next-line
                var currentAnnot = this.currentTextMarkupAnnotation;
                for (var k = 0; k < pageBounds.length; k++) {
                    if (currentAnnot && currentAnnot.pageNumber === pageBounds[k].pageIndex) {
                        this.currentTextMarkupAnnotation = currentAnnot;
                        this.selectTextMarkupCurrentPage = pageBounds[k].pageIndex;
                        this.updateTextMarkupAnnotationBounds(pageBounds, k);
                    }
                    else {
                        if (currentAnnot) {
                            if (type === '') {
                                type = currentAnnot.textMarkupAnnotationType;
                            }
                        }
                        if (!currentAnnot.isMultiSelect) {
                            var isMultiSelect = false;
                            if (this.isMultiAnnotation(type)) {
                                this.multiPageCollection.push(currentAnnot);
                                isMultiSelect = true;
                            }
                            // eslint-disable-next-line max-len
                            this.drawTextMarkups(type, pageBounds[k].bounds, pageBounds[k].pageIndex, pageBounds[k].rect, this.pdfViewerBase.getZoomFactor(), pageBounds[k].textContent, pageBounds[k].startIndex, pageBounds[k].endIndex, isMultiSelect, targetElement);
                        }
                        else {
                            if (currentAnnot.isMultiSelect && currentAnnot.annotNameCollection) {
                                this.modifyCurrentAnnotation(currentAnnot, pageBounds, k);
                            }
                        }
                    }
                }
            }
        }
        else if (window.getSelection().toString()) {
            var pageBounds = this.getDrawnBounds();
            var isMultiSelect = this.isMultiPageAnnotations(pageBounds, type);
            if (pageBounds.length > 0) {
                for (var i = 0; i < pageBounds.length; i++) {
                    if (type === '') {
                        isCleared = false;
                    }
                    // eslint-disable-next-line max-len
                    this.drawTextMarkups(type, pageBounds[i].bounds, pageBounds[i].pageIndex, pageBounds[i].rect, this.pdfViewerBase.getZoomFactor(), pageBounds[i].textContent, pageBounds[i].startIndex, pageBounds[i].endIndex, isMultiSelect, targetElement);
                }
            }
        }
        if (this.multiPageCollection) {
            for (var j = 0; j < this.multiPageCollection.length; j++) {
                this.updateAnnotationNames(this.multiPageCollection[j], this.multiPageCollection[j].pageNumber);
            }
        }
        this.isExtended = false;
        this.isSelectionMaintained = false;
        // this.pdfViewerBase.annotationHelper.redoCollection = [];
        if (isCleared && this.pdfViewer.textSelectionModule) {
            this.pdfViewer.textSelectionModule.clearTextSelection();
        }
        if (this.isEnableTextMarkupResizer(type)) {
            this.updateAnnotationBounds();
        }
    };
    // eslint-disable-next-line
    TextMarkupAnnotation.prototype.isMultiPageAnnotations = function (pageBounds, type) {
        var isMultiSelect = false;
        for (var n = 0; n < pageBounds.length; n++) {
            if (pageBounds[n].pageIndex !== pageBounds[0].pageIndex && this.isMultiAnnotation(type)) {
                isMultiSelect = true;
                break;
            }
        }
        return isMultiSelect;
    };
    TextMarkupAnnotation.prototype.isMultiAnnotation = function (type) {
        var isSelection = false;
        if (type === 'Highlight' && this.pdfViewer.highlightSettings.enableMultiPageAnnotation) {
            isSelection = true;
        }
        else if (type === 'Underline' && this.pdfViewer.underlineSettings.enableMultiPageAnnotation) {
            isSelection = true;
        }
        else if (type === 'Strikethrough' && this.pdfViewer.strikethroughSettings.enableMultiPageAnnotation) {
            isSelection = true;
        }
        else if (this.pdfViewer.enableMultiPageAnnotation) {
            isSelection = true;
        }
        return isSelection;
    };
    // eslint-disable-next-line
    TextMarkupAnnotation.prototype.modifyCurrentAnnotation = function (currentAnnot, pageBounds, index) {
        for (var c = 0; c < currentAnnot.annotNameCollection.length; c++) {
            // eslint-disable-next-line
            var currentAnnots = currentAnnot.annotNameCollection[c];
            var annotationList = this.getAnnotations(pageBounds[index].pageIndex, null);
            if (annotationList) {
                for (var z = 0; z < annotationList.length; z++) {
                    if (annotationList[z].annotName === currentAnnots) {
                        this.currentTextMarkupAnnotation = annotationList[z];
                        this.selectTextMarkupCurrentPage = pageBounds[index].pageIndex;
                        this.updateTextMarkupAnnotationBounds(pageBounds, index);
                        break;
                    }
                }
            }
        }
    };
    // eslint-disable-next-line
    TextMarkupAnnotation.prototype.drawAnnotationSelector = function (newAnnotation, annotation, newcanvas) {
        var newBounds = [];
        var x = 0;
        var y = 0;
        var width = 0;
        var height = 0;
        var currentTop = 0;
        var nextTop = 0;
        for (var i = 0; i < newAnnotation.bounds.length; i++) {
            currentTop = newAnnotation.bounds[i].top ? newAnnotation.bounds[i].top : newAnnotation.bounds[i].Top;
            nextTop = !isNullOrUndefined(newAnnotation.bounds[i + 1]) ? newAnnotation.bounds[i + 1].top ? newAnnotation.bounds[i + 1].top : newAnnotation.bounds[i + 1].Top : 0;
            if (newAnnotation.bounds.length > 1 && i < newAnnotation.bounds.length - 1 && currentTop === nextTop) {
                newBounds.push(newAnnotation.bounds[i]);
            }
            else {
                if (i === newAnnotation.bounds.length - 1 || newAnnotation.bounds.length >= 1) {
                    newBounds.push(newAnnotation.bounds[i]);
                }
                if (newBounds.length >= 1) {
                    x = newBounds[0].left ? newBounds[0].left : newBounds[0].Left;
                    y = newBounds[0].top ? newBounds[0].top : newBounds[0].Top;
                    height = newBounds[0].height ? newBounds[0].height : newBounds[0].Height;
                    for (var j = 0; j < newBounds.length; j++) {
                        if ((!isNaN(newBounds[j].width) && newBounds[j].width > 0) || (!isNaN(newBounds[j].Width) && newBounds[j].Width > 0)) {
                            width += newBounds[j].width ? newBounds[j].width : newBounds[j].Width;
                        }
                    }
                    if (!newcanvas) {
                        newcanvas = this.pdfViewerBase.getElement('_annotationCanvas_' + newAnnotation.pageNumber);
                    }
                    // eslint-disable-next-line max-len
                    this.drawAnnotationSelectRect(newcanvas, this.getMagnifiedValue(x - 0.5, this.pdfViewerBase.getZoomFactor()), this.getMagnifiedValue(y - 0.5, this.pdfViewerBase.getZoomFactor()), this.getMagnifiedValue(width + 0.5, this.pdfViewerBase.getZoomFactor()), this.getMagnifiedValue(height + 0.5, this.pdfViewerBase.getZoomFactor()), annotation);
                    newBounds = [];
                    width = 0;
                }
            }
        }
    };
    // eslint-disable-next-line
    TextMarkupAnnotation.prototype.selectMultiPageAnnotations = function (annotation) {
        for (var k = 0; k < annotation.annotNameCollection.length; k++) {
            // eslint-disable-next-line
            var currentAnnot = annotation.annotNameCollection[k];
            if (currentAnnot !== annotation.annotName) {
                for (var p = 0; p < annotation.annotpageNumbers.length; p++) {
                    var currentPage = annotation.annotpageNumbers[p];
                    var annotationList = this.getAnnotations(currentPage, null);
                    if (annotationList) {
                        for (var z = 0; z < annotationList.length; z++) {
                            if (annotationList[z].annotName === currentAnnot) {
                                // eslint-disable-next-line
                                var newAnnotation = annotationList[z];
                                this.drawAnnotationSelector(newAnnotation, annotation);
                            }
                        }
                    }
                }
            }
        }
    };
    // eslint-disable-next-line
    TextMarkupAnnotation.prototype.deletMultiPageAnnotation = function (annotation) {
        for (var k = 0; k < annotation.annotNameCollection.length; k++) {
            // eslint-disable-next-line
            var currentAnnot = annotation.annotNameCollection[k];
            if (currentAnnot !== annotation.annotName) {
                for (var p = 0; p < annotation.annotpageNumbers.length; p++) {
                    var currentPage = annotation.annotpageNumbers[p];
                    var annotationList = this.getAnnotations(currentPage, null);
                    if (annotationList) {
                        for (var z = 0; z < annotationList.length; z++) {
                            if (annotationList[z].annotName === currentAnnot) {
                                // eslint-disable-next-line
                                var newAnnotation = annotationList[z];
                                var deletedAnnotation = null;
                                deletedAnnotation = annotationList.splice(z, 1)[0];
                                this.pdfViewer.annotationModule.addAction(currentPage, z, deletedAnnotation, 'Text Markup Deleted', null);
                                this.currentAnnotationIndex = z;
                                this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(deletedAnnotation, 'textMarkup');
                                var removeDiv = document.getElementById(deletedAnnotation.annotName);
                                if (removeDiv) {
                                    if (removeDiv.parentElement.childElementCount === 1) {
                                        this.pdfViewer.annotationModule.stickyNotesAnnotationModule.updateAccordionContainer(removeDiv);
                                    }
                                    else {
                                        removeDiv.remove();
                                    }
                                }
                                this.pdfViewer.annotationModule.updateAnnotationCollection(newAnnotation);
                                this.manageAnnotations(annotationList, currentPage);
                                // eslint-disable-next-line max-len
                                this.pdfViewer.annotationModule.updateImportAnnotationCollection(newAnnotation, newAnnotation.pageNumber, 'textMarkupAnnotation');
                                var annotationId = newAnnotation.annotName;
                                // eslint-disable-next-line
                                var annotationBounds = newAnnotation.bounds;
                                this.pdfViewer.annotationModule.renderAnnotations(currentPage, null, null, null);
                            }
                        }
                    }
                }
            }
        }
    };
    // eslint-disable-next-line
    TextMarkupAnnotation.prototype.modifyMultiPageAnnotations = function (annotation, property, value) {
        for (var k = 0; k < annotation.annotNameCollection.length; k++) {
            // eslint-disable-next-line
            var currentAnnot = annotation.annotNameCollection[k];
            if (currentAnnot !== annotation.annotName) {
                for (var p = 0; p < annotation.annotpageNumbers.length; p++) {
                    var currentPage = annotation.annotpageNumbers[p];
                    var annotationList = this.getAnnotations(currentPage, null);
                    if (annotationList) {
                        for (var z = 0; z < annotationList.length; z++) {
                            if (annotationList[z].annotName === currentAnnot) {
                                if (property === 'Color') {
                                    annotationList[z].color = value;
                                }
                                else {
                                    annotationList[z].opacity = value;
                                }
                                annotationList[z].modifiedDate = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
                                this.currentAnnotationIndex = z;
                                if (status === null || status === 'changed') {
                                    // eslint-disable-next-line max-len
                                    this.pdfViewer.annotationModule.addAction(annotationList[z].pageNumber, z, annotationList[z], 'Text Markup Property modified', property);
                                }
                                this.pdfViewer.annotationModule.stickyNotesAnnotationModule.updateAnnotationModifiedDate(annotationList[z]);
                                this.manageAnnotations(annotationList, currentPage);
                                this.pdfViewer.annotationModule.renderAnnotations(currentPage, null, null, null);
                            }
                        }
                    }
                }
            }
        }
    };
    TextMarkupAnnotation.prototype.convertSelectionToTextMarkup = function (type, selectionObject, factor) {
        var isMultiSelect = false;
        this.triggerAddEvent = false;
        this.multiPageCollection = [];
        for (var i = 0; i < selectionObject.length; i++) {
            var textValue = selectionObject[i].textContent;
            // eslint-disable-next-line
            var indexes = void 0;
            if (selectionObject[i].startNode === selectionObject[i].endNode) {
                var parentText = document.getElementById(selectionObject[i].startNode).textContent;
                indexes = this.getIndexNumbers(selectionObject[i].pageNumber, textValue, parentText);
            }
            else {
                indexes = this.getIndexNumbers(selectionObject[i].pageNumber, textValue);
            }
            if (!isMultiSelect) {
                for (var n = 1; n < selectionObject.length; n++) {
                    if (selectionObject[n].pageNumber !== selectionObject[0].pageNumber && this.isMultiAnnotation(type)) {
                        isMultiSelect = true;
                        break;
                    }
                }
            }
            if (this.isMultiAnnotation(type) && (selectionObject.length - 1) === i) {
                this.triggerAddEvent = true;
            }
            // eslint-disable-next-line max-len
            this.drawTextMarkups(type, selectionObject[i].rectangleBounds, selectionObject[i].pageNumber, selectionObject[i].bound, factor, textValue, indexes.startIndex, indexes.endIndex, isMultiSelect, document.getElementById(selectionObject[i].startNode));
        }
    };
    // eslint-disable-next-line
    TextMarkupAnnotation.prototype.updateTextMarkupAnnotationBounds = function (pageBounds, currentIndex) {
        if (this.currentTextMarkupAnnotation) {
            var pageAnnotations = this.getAnnotations(pageBounds[currentIndex].pageIndex, null);
            var annotation = null;
            if (pageAnnotations) {
                for (var i = 0; i < pageAnnotations.length; i++) {
                    if (JSON.stringify(this.currentTextMarkupAnnotation) === JSON.stringify(pageAnnotations[i])) {
                        pageAnnotations[i].bounds = pageBounds[currentIndex].bounds;
                        pageAnnotations[i].textMarkupContent = pageBounds[currentIndex].textContent;
                        pageAnnotations[i].textMarkupStartIndex = pageBounds[currentIndex].startIndex;
                        pageAnnotations[i].textMarkupEndIndex = pageBounds[currentIndex].endIndex;
                        pageAnnotations[i].modifiedDate = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
                        annotation = pageAnnotations[i];
                    }
                }
                this.manageAnnotations(pageAnnotations, pageBounds[currentIndex].pageIndex);
                this.currentTextMarkupAnnotation = null;
                this.pdfViewer.annotationModule.renderAnnotations(pageBounds[currentIndex].pageIndex, null, null, null);
                this.pdfViewerBase.updateDocumentEditedProperty(true);
                if (annotation) {
                    // eslint-disable-next-line
                    var settings = { opacity: annotation.opacity, color: annotation.color, author: annotation.author, subject: annotation.subject, modifiedDate: annotation.modifiedDate };
                    // eslint-disable-next-line max-len
                    var multiPageCollection = this.multiPageCollectionList(annotation);
                    if (multiPageCollection.length > 0) {
                        if ((pageBounds.length - 1) === currentIndex) {
                            // eslint-disable-next-line max-len
                            this.pdfViewer.fireAnnotationResize(pageBounds[currentIndex].pageIndex, annotation.annotName, annotation.textMarkupAnnotationType, annotation.bounds, settings, annotation.textMarkupContent, annotation.textMarkupStartIndex, annotation.textMarkupEndIndex, null, multiPageCollection);
                        }
                    }
                    else {
                        // eslint-disable-next-line max-len
                        this.pdfViewer.fireAnnotationResize(pageBounds[currentIndex].pageIndex, annotation.annotName, annotation.textMarkupAnnotationType, annotation.bounds, settings, annotation.textMarkupContent, annotation.textMarkupStartIndex, annotation.textMarkupEndIndex, null);
                    }
                }
                // eslint-disable-next-line max-len
                this.currentAnnotationIndex = null;
                this.selectTextMarkupCurrentPage = null;
            }
        }
    };
    /**
     * @param annotation
     * @private
     */
    // eslint-disable-next-line
    TextMarkupAnnotation.prototype.multiPageCollectionList = function (annotation) {
        var multiPageCollectionList = [];
        if (annotation.isMultiSelect && annotation.annotNameCollection) {
            multiPageCollectionList.push(annotation);
            for (var k = 0; k < annotation.annotNameCollection.length; k++) {
                // eslint-disable-next-line
                var currentAnnot = annotation.annotNameCollection[k];
                if (currentAnnot !== annotation.annotName) {
                    for (var p = 0; p < annotation.annotpageNumbers.length; p++) {
                        var currentPage = annotation.annotpageNumbers[p];
                        var annotationList = this.getAnnotations(currentPage, null);
                        if (annotationList) {
                            for (var z = 0; z < annotationList.length; z++) {
                                if (annotationList[z].annotName === currentAnnot) {
                                    multiPageCollectionList.push(annotationList[z]);
                                }
                            }
                        }
                    }
                }
            }
        }
        return multiPageCollectionList;
    };
    // eslint-disable-next-line
    TextMarkupAnnotation.prototype.updateAnnotationNames = function (annotations, pageNumber) {
        if (annotations) {
            var pageAnnotations = this.getAnnotations(pageNumber, null);
            var annotation = null;
            if (pageAnnotations) {
                for (var i = 0; i < pageAnnotations.length; i++) {
                    if (annotations.annotName === pageAnnotations[i].annotName) {
                        // eslint-disable-next-line
                        var annotNamesCollections = [];
                        // eslint-disable-next-line
                        var annotpageNumbers = [];
                        for (var p = 0; p < this.multiPageCollection.length; p++) {
                            annotNamesCollections.push(this.multiPageCollection[p].annotName);
                            annotpageNumbers.push(this.multiPageCollection[p].pageNumber);
                        }
                        pageAnnotations[i].isMultiSelect = true;
                        pageAnnotations[i].annotNameCollection = annotNamesCollections;
                        pageAnnotations[i].annotpageNumbers = annotpageNumbers;
                        annotation = pageAnnotations[i];
                    }
                }
                this.manageAnnotations(pageAnnotations, pageNumber);
            }
        }
    };
    // eslint-disable-next-line
    TextMarkupAnnotation.prototype.updateAnnotationContent = function (annotation, pageBound) {
        if (annotation) {
            var pageAnnotations = this.getAnnotations(this.selectTextMarkupCurrentPage, null);
            var annotation_1 = null;
            if (pageAnnotations) {
                for (var i = 0; i < pageAnnotations.length; i++) {
                    if (JSON.stringify(this.currentTextMarkupAnnotation) === JSON.stringify(pageAnnotations[i])) {
                        pageAnnotations[i].textMarkupContent = pageBound.textContent;
                        pageAnnotations[i].textMarkupStartIndex = pageBound.startIndex;
                        pageAnnotations[i].textMarkupEndIndex = pageBound.endIndex;
                        annotation_1 = pageAnnotations[i];
                    }
                    this.pdfViewer.annotationModule.storeAnnotationCollections(pageAnnotations[i], this.selectTextMarkupCurrentPage);
                }
                this.manageAnnotations(pageAnnotations, this.selectTextMarkupCurrentPage);
            }
        }
    };
    // eslint-disable-next-line
    TextMarkupAnnotation.prototype.drawTextMarkups = function (type, bounds, pageNumber, rect, factor, textContent, startIndex, endIndex, isMultiSelect, targetElement) {
        var annotation = null;
        this.isNewAnnotation = false;
        var author = 'Guest';
        var subject;
        var context = this.getPageContext(pageNumber);
        var modifiedDate = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
        this.highlightColor = this.highlightColor ? this.highlightColor : this.pdfViewer.highlightSettings.color;
        this.underlineColor = this.underlineColor ? this.underlineColor : this.pdfViewer.underlineSettings.color;
        this.strikethroughColor = this.strikethroughColor ? this.strikethroughColor : this.pdfViewer.strikethroughSettings.color;
        this.highlightOpacity = this.pdfViewer.highlightSettings.opacity;
        this.underlineOpacity = this.pdfViewer.underlineSettings.opacity;
        this.strikethroughOpacity = this.pdfViewer.strikethroughSettings.opacity;
        this.annotationAddMode = 'UI Drawn Annotation';
        // eslint-disable-next-line
        var allowedInteractions;
        var pageDetails = this.pdfViewerBase.pageSize[pageNumber];
        var annotationRotate = 0;
        var pageRotation = this.getAngle(pageDetails.rotation);
        if (context) {
            context.setLineDash([]);
            switch (type) {
                case 'Highlight':
                    this.isNewAnnotation = true;
                    subject = 'Highlight';
                    // eslint-disable-next-line max-len
                    author = (this.pdfViewer.highlightSettings.author !== 'Guest' && this.pdfViewer.highlightSettings.author) ? this.pdfViewer.highlightSettings.author : this.pdfViewer.annotationSettings.author ? this.pdfViewer.annotationSettings.author : 'Guest';
                    allowedInteractions = this.pdfViewer.highlightSettings.allowedInteractions ? this.pdfViewer.highlightSettings.allowedInteractions : ['None'];
                    // eslint-disable-next-line max-len
                    if (isNullOrUndefined(this.highlightOpacity)) {
                        this.highlightOpacity = 1;
                    }
                    annotation = this.getAddedAnnotation(type, this.highlightColor, this.highlightOpacity, bounds, author, subject, modifiedDate, '', false, rect, pageNumber, textContent, startIndex, endIndex, isMultiSelect, allowedInteractions, annotationRotate);
                    if (annotation) {
                        // eslint-disable-next-line max-len
                        this.renderHighlightAnnotation(annotation.bounds, annotation.opacity, annotation.color, context, factor, annotation.isPrint, pageNumber);
                    }
                    break;
                case 'Strikethrough':
                    this.isNewAnnotation = true;
                    subject = 'Strikethrough';
                    // eslint-disable-next-line max-len
                    author = (this.pdfViewer.strikethroughSettings.author !== 'Guest' && this.pdfViewer.strikethroughSettings.author) ? this.pdfViewer.strikethroughSettings.author : this.pdfViewer.annotationSettings.author ? this.pdfViewer.annotationSettings.author : 'Guest';
                    allowedInteractions = this.pdfViewer.strikethroughSettings.allowedInteractions ? this.pdfViewer.strikethroughSettings.allowedInteractions : ['None'];
                    // eslint-disable-next-line max-len
                    if (targetElement && targetElement.style.transform !== '') {
                        if (targetElement.style.transform.startsWith('rotate(90deg)')) {
                            annotationRotate = Math.abs(pageRotation - 90);
                        }
                        else if (targetElement.style.transform.startsWith('rotate(180deg)')) {
                            annotationRotate = Math.abs(pageRotation - 180);
                        }
                        else if (targetElement.style.transform.startsWith('rotate(-90deg)')) {
                            annotationRotate = Math.abs(pageRotation - 270);
                        }
                        else {
                            annotationRotate = pageRotation;
                        }
                    }
                    if (isNullOrUndefined(this.strikethroughOpacity)) {
                        this.strikethroughOpacity = 1;
                    }
                    annotation = this.getAddedAnnotation(type, this.strikethroughColor, this.strikethroughOpacity, bounds, author, subject, modifiedDate, '', false, rect, pageNumber, textContent, startIndex, endIndex, isMultiSelect, allowedInteractions, annotationRotate);
                    if (annotation) {
                        // eslint-disable-next-line max-len
                        this.renderStrikeoutAnnotation(annotation.bounds, annotation.opacity, annotation.color, context, factor, pageNumber, annotation.isPrint, annotation.annotationRotation);
                    }
                    break;
                case 'Underline':
                    this.isNewAnnotation = true;
                    subject = 'Underline';
                    // eslint-disable-next-line max-len
                    author = (this.pdfViewer.underlineSettings.author !== 'Guest' && this.pdfViewer.underlineSettings.author) ? this.pdfViewer.underlineSettings.author : this.pdfViewer.annotationSettings.author ? this.pdfViewer.annotationSettings.author : 'Guest';
                    allowedInteractions = this.pdfViewer.underlineSettings.allowedInteractions ? this.pdfViewer.underlineSettings.allowedInteractions : ['None'];
                    // eslint-disable-next-line max-len
                    if (targetElement && targetElement.style.transform !== '') {
                        if (targetElement.style.transform.startsWith('rotate(90deg)')) {
                            annotationRotate = Math.abs(pageRotation - 90);
                        }
                        else if (targetElement.style.transform.startsWith('rotate(180deg)')) {
                            annotationRotate = Math.abs(pageRotation - 180);
                        }
                        else if (targetElement.style.transform.startsWith('rotate(-90deg)')) {
                            annotationRotate = Math.abs(pageRotation - 270);
                        }
                        else {
                            annotationRotate = pageRotation;
                        }
                    }
                    if (isNullOrUndefined(this.underlineOpacity)) {
                        this.underlineOpacity = 1;
                    }
                    annotation = this.getAddedAnnotation(type, this.underlineColor, this.underlineOpacity, bounds, author, subject, modifiedDate, '', false, rect, pageNumber, textContent, startIndex, endIndex, isMultiSelect, allowedInteractions, annotationRotate);
                    if (annotation) {
                        // eslint-disable-next-line max-len
                        this.renderUnderlineAnnotation(annotation.bounds, annotation.opacity, annotation.color, context, factor, pageNumber, annotation.isPrint, annotation.annotationRotation);
                    }
                    break;
            }
            this.isNewAnnotation = false;
            if (annotation) {
                this.pdfViewerBase.updateDocumentEditedProperty(true);
                // eslint-disable-next-line
                var settings = { opacity: annotation.opacity, color: annotation.color, author: annotation.author, subject: annotation.subject, modifiedDate: annotation.modifiedDate };
                var index = this.pdfViewer.annotationModule.actionCollection[this.pdfViewer.annotationModule.actionCollection.length - 1].index;
                // eslint-disable-next-line max-len
                if (this.isMultiAnnotation(type)) {
                    if (this.triggerAddEvent) {
                        // eslint-disable-next-line max-len
                        this.pdfViewer.fireAnnotationAdd(pageNumber, annotation.annotName, type, annotation.bounds, settings, textContent, startIndex, endIndex, null, this.multiPageCollection);
                    }
                }
                else {
                    // eslint-disable-next-line max-len
                    this.pdfViewer.fireAnnotationAdd(pageNumber, annotation.annotName, type, annotation.bounds, settings, textContent, startIndex, endIndex);
                }
            }
            if (Browser.isDevice && !this.pdfViewer.enableDesktopMode && this.pdfViewer.enableToolbar && this.pdfViewer.enableAnnotationToolbar) {
                this.pdfViewer.toolbarModule.annotationToolbarModule.createPropertyTools(type);
            }
        }
    };
    TextMarkupAnnotation.prototype.getAngle = function (rotation) {
        // eslint-disable-next-line
        var angle = 0;
        if (rotation) {
            switch (rotation) {
                case 0:
                    angle = 0;
                    break;
                case 1:
                    angle = 90;
                    break;
                case 2:
                    angle = 180;
                    break;
                case 3:
                    angle = 270;
                    break;
            }
        }
        return angle;
    };
    // eslint-disable-next-line
    TextMarkupAnnotation.prototype.retreiveTextIndex = function (annotation) {
        if (annotation.textMarkupContent === '') {
            this.retreieveSelection(annotation, null);
            var pageBounds = this.getDrawnBounds();
            window.getSelection().removeAllRanges();
            if (pageBounds[0] && pageBounds[0].bounds) {
                this.updateAnnotationContent(annotation, pageBounds[0]);
                annotation.textMarkupContent = pageBounds[0].textContent;
                annotation.textMarkupStartIndex = pageBounds[0].startIndex;
                annotation.textMarkupEndIndex = pageBounds[0].endIndex;
            }
        }
        return annotation;
    };
    // eslint-disable-next-line
    TextMarkupAnnotation.prototype.renderHighlightAnnotation = function (bounds, opacity, color, context, factor, isPrint, pageIndex) {
        var zoomRatio = this.pdfViewerBase.getZoomRatio(factor);
        for (var i = 0; i < bounds.length; i++) {
            // eslint-disable-next-line
            var bound = bounds[i];
            context.beginPath();
            var x = bound.X ? bound.X : bound.left;
            var y = bound.Y ? bound.Y : bound.top;
            var width = bound.Width ? bound.Width : bound.width;
            var height = bound.Height ? bound.Height : bound.height;
            x = x ? x : bound.x;
            y = y ? y : bound.y;
            // The highlighted position is slightly increased. So Subtract -1 from the height. 
            height = height - 1;
            if (context.canvas.id === this.pdfViewer.element.id + '_print_annotation_layer_' + pageIndex) {
                if (isPrint) {
                    // eslint-disable-next-line max-len
                    context.rect((x * zoomRatio), (y * zoomRatio), (width * zoomRatio), (height * zoomRatio));
                    context.globalAlpha = opacity * 0.5;
                    context.closePath();
                    context.fillStyle = color;
                    context.msFillRule = 'nonzero';
                    context.fill();
                }
            }
            else {
                // eslint-disable-next-line max-len
                context.rect((x * zoomRatio), (y * zoomRatio), (width * zoomRatio), (height * zoomRatio));
                context.globalAlpha = opacity * 0.5;
                context.closePath();
                context.fillStyle = color;
                context.msFillRule = 'nonzero';
                context.fill();
            }
        }
        context.save();
    };
    // eslint-disable-next-line
    TextMarkupAnnotation.prototype.renderStrikeoutAnnotation = function (bounds, opacity, color, context, factor, pageNumber, isPrint, annotationRotation) {
        for (var i = 0; i < bounds.length; i++) {
            // eslint-disable-next-line
            var bound = this.getProperBounds(bounds[i]);
            var pageDetails = this.pdfViewerBase.pageSize[pageNumber];
            var factorRatio = this.pdfViewerBase.getZoomRatio(factor);
            var rotation = pageDetails.rotation;
            if (annotationRotation) {
                var pageRotation = this.getAngle(rotation);
                rotation = Math.abs(annotationRotation - pageRotation) / 90;
            }
            if (context.canvas.id === this.pdfViewer.element.id + '_print_annotation_layer_' + pageNumber) {
                if (isPrint) {
                    if (rotation === 1) {
                        // eslint-disable-next-line max-len
                        this.drawLine(opacity, (bound.x + (bound.width / 2)), bound.y, bound.width, bound.height, color, factorRatio, context, pageNumber, annotationRotation);
                    }
                    else if (rotation === 2) {
                        // eslint-disable-next-line max-len
                        this.drawLine(opacity, bound.x, (bound.y + (bound.height / 2)), bound.width, bound.height, color, factorRatio, context, pageNumber, annotationRotation);
                    }
                    else if (rotation === 3) {
                        this.drawLine(opacity, bound.x, bound.y, (bound.width / 2), bound.height, color, factorRatio, context, pageNumber, annotationRotation);
                    }
                    else {
                        this.drawLine(opacity, bound.x, bound.y, bound.width, (bound.height / 2), color, factorRatio, context, pageNumber, annotationRotation);
                    }
                }
            }
            else {
                if (rotation === 1) {
                    // eslint-disable-next-line max-len
                    this.drawLine(opacity, (bound.x + (bound.width / 2)), bound.y, bound.width, bound.height, color, factorRatio, context, pageNumber, annotationRotation);
                }
                else if (rotation === 2) {
                    // eslint-disable-next-line max-len
                    this.drawLine(opacity, bound.x, (bound.y + (bound.height / 2)), bound.width, bound.height, color, factorRatio, context, pageNumber, annotationRotation);
                }
                else if (rotation === 3) {
                    this.drawLine(opacity, bound.x, bound.y, (bound.width / 2), bound.height, color, factorRatio, context, pageNumber, annotationRotation);
                }
                else {
                    this.drawLine(opacity, bound.x, bound.y, bound.width, (bound.height / 2), color, factorRatio, context, pageNumber, annotationRotation);
                }
            }
        }
    };
    // eslint-disable-next-line
    TextMarkupAnnotation.prototype.renderUnderlineAnnotation = function (bounds, opacity, color, context, factor, pageNumber, isPrint, annotationRotation) {
        for (var i = 0; i < bounds.length; i++) {
            // eslint-disable-next-line
            var boundValues = this.getProperBounds(bounds[i]);
            var factorRatio = this.pdfViewerBase.getZoomRatio(factor);
            if (context.canvas.id === this.pdfViewer.element.id + '_print_annotation_layer_' + pageNumber) {
                if (isPrint) {
                    // eslint-disable-next-line max-len
                    this.drawLine(opacity, boundValues.x, boundValues.y, boundValues.width, boundValues.height, color, factorRatio, context, pageNumber, annotationRotation);
                }
            }
            else {
                // eslint-disable-next-line max-len
                this.drawLine(opacity, boundValues.x, boundValues.y, boundValues.width, boundValues.height, color, factorRatio, context, pageNumber, annotationRotation);
            }
        }
    };
    // eslint-disable-next-line
    TextMarkupAnnotation.prototype.getProperBounds = function (bound) {
        var x = bound.X ? bound.X : bound.left;
        var y = bound.Y ? bound.Y : bound.top;
        var width = bound.Width ? bound.Width : bound.width;
        var height = bound.Height ? bound.Height : bound.height;
        x = x ? x : bound.x;
        y = y ? y : bound.y;
        return { x: x, y: y, width: width, height: height };
    };
    // eslint-disable-next-line max-len
    TextMarkupAnnotation.prototype.drawLine = function (opacity, x, y, width, height, color, factor, context, pageNumber, annotationRotation) {
        context.globalAlpha = opacity;
        if (isBlazor()) {
            y = y - 1;
        }
        height = height - 1;
        context.beginPath();
        var pageDetails = this.pdfViewerBase.pageSize[pageNumber];
        var rotation = pageDetails.rotation;
        if (annotationRotation) {
            var pageRotation = this.getAngle(rotation);
            rotation = Math.abs(annotationRotation - pageRotation) / 90;
        }
        if (rotation === 1) {
            context.moveTo((x * factor), (y * factor));
            context.lineTo((x * factor), (y + height) * factor);
        }
        else if (rotation === 2) {
            context.moveTo((x * factor), (y * factor));
            context.lineTo((width + x) * factor, (y * factor));
        }
        else if (rotation === 3) {
            context.moveTo((width + x) * factor, (y * factor));
            context.lineTo((width + x) * factor, (y + height) * factor);
        }
        else {
            context.moveTo((x * factor), (y + height) * factor);
            context.lineTo((width + x) * factor, (y + height) * factor);
        }
        context.lineWidth = 1;
        context.strokeStyle = color;
        context.closePath();
        context.msFillRule = 'nonzero';
        context.stroke();
    };
    /**
     * @param textMarkupAnnotations
     * @param pageIndex
     * @param stampData
     * @param shapeData
     * @param measureShapeData
     * @param stickyData
     * @param textMarkupAnnotations
     * @param pageIndex
     * @param stampData
     * @param shapeData
     * @param measureShapeData
     * @param stickyData
     * @private
     */
    // eslint-disable-next-line
    TextMarkupAnnotation.prototype.printTextMarkupAnnotations = function (textMarkupAnnotations, pageIndex, stampData, shapeData, measureShapeData, stickyData, freeTextData) {
        var canvas = createElement('canvas', { id: this.pdfViewer.element.id + '_print_annotation_layer_' + pageIndex });
        canvas.style.width = 816 + 'px';
        canvas.style.height = 1056 + 'px';
        var pageWidth = this.pdfViewerBase.pageSize[pageIndex].width;
        var pageHeight = this.pdfViewerBase.pageSize[pageIndex].height;
        var zoom = this.pdfViewerBase.getZoomFactor();
        var zoomRatio = this.pdfViewerBase.getZoomRatio(zoom);
        canvas.height = pageHeight * zoomRatio;
        canvas.width = pageWidth * zoomRatio;
        // eslint-disable-next-line
        var textMarkupannotations = this.getAnnotations(pageIndex, null, '_annotations_textMarkup');
        // eslint-disable-next-line
        var shapeAnnotation = this.getAnnotations(pageIndex, null, '_annotations_shape');
        // eslint-disable-next-line
        var measureShapeAnnotation = this.getAnnotations(pageIndex, null, '_annotations_shape_measure');
        // eslint-disable-next-line
        var stampAnnotation = this.getAnnotations(pageIndex, null, '_annotations_stamp');
        // eslint-disable-next-line
        var stickyNoteAnnotation = this.getAnnotations(pageIndex, null, '_annotations_sticky');
        if (stampAnnotation || shapeAnnotation || stickyNoteAnnotation || measureShapeAnnotation) {
            this.pdfViewer.renderDrawing(canvas, pageIndex);
        }
        else {
            this.pdfViewer.annotation.renderAnnotations(pageIndex, shapeData, measureShapeData, null, canvas, null, null, freeTextData);
            this.pdfViewer.annotation.stampAnnotationModule.renderStampAnnotations(stampData, pageIndex, canvas);
            this.pdfViewer.annotation.stickyNotesAnnotationModule.renderStickyNotesAnnotations(stickyData, pageIndex, canvas);
        }
        var zoomFactor = this.pdfViewerBase.getZoomFactor();
        if (textMarkupannotations) {
            this.renderTextMarkupAnnotations(null, pageIndex, canvas, zoomFactor);
        }
        else {
            this.renderTextMarkupAnnotations(textMarkupAnnotations, pageIndex, canvas, zoomFactor);
        }
        var imageSource = canvas.toDataURL();
        return imageSource;
    };
    /**
     * @private
     */
    TextMarkupAnnotation.prototype.saveTextMarkupAnnotations = function () {
        // eslint-disable-next-line
        var storeTextMarkupObject = window.sessionStorage.getItem(this.pdfViewerBase.documentId + '_annotations_textMarkup');
        if (this.pdfViewerBase.isStorageExceed) {
            storeTextMarkupObject = this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_textMarkup'];
        }
        // eslint-disable-next-line
        var textMarkupAnnotations = new Array();
        for (var j = 0; j < this.pdfViewerBase.pageCount; j++) {
            textMarkupAnnotations[j] = [];
        }
        if (storeTextMarkupObject && !this.pdfViewer.annotationSettings.skipDownload) {
            var textMarkupAnnotationCollection = JSON.parse(storeTextMarkupObject);
            for (var i = 0; i < textMarkupAnnotationCollection.length; i++) {
                var newArray = [];
                var pageAnnotationObject = textMarkupAnnotationCollection[i];
                if (pageAnnotationObject) {
                    for (var z = 0; pageAnnotationObject.annotations.length > z; z++) {
                        this.pdfViewer.annotationModule.updateModifiedDate(pageAnnotationObject.annotations[z]);
                        if (this.pdfViewerBase.isJsonExported) {
                            if (pageAnnotationObject.annotations[z].isAnnotationRotated) {
                                pageAnnotationObject.annotations[z].bounds = this.getBoundsForSave(pageAnnotationObject.annotations[z].bounds, i);
                            }
                            else {
                                var pageDetails = this.pdfViewerBase.pageSize[pageAnnotationObject.pageIndex];
                                if (pageDetails) {
                                    pageAnnotationObject.annotations[z].annotationRotation = pageDetails.rotation;
                                }
                            }
                        }
                        // eslint-disable-next-line max-len
                        pageAnnotationObject.annotations[z].bounds = JSON.stringify(this.getBoundsForSave(pageAnnotationObject.annotations[z].bounds, i));
                        var colorString = pageAnnotationObject.annotations[z].color;
                        pageAnnotationObject.annotations[z].color = JSON.stringify(this.getRgbCode(colorString));
                        pageAnnotationObject.annotations[z].rect = JSON.stringify(pageAnnotationObject.annotations[z].rect);
                    }
                    newArray = pageAnnotationObject.annotations;
                }
                textMarkupAnnotations[pageAnnotationObject.pageIndex] = newArray;
            }
        }
        return JSON.stringify(textMarkupAnnotations);
    };
    /**
     * @private
     */
    TextMarkupAnnotation.prototype.deleteTextMarkupAnnotation = function () {
        if (this.currentTextMarkupAnnotation) {
            var isLock = false;
            if (this.currentTextMarkupAnnotation.annotationSettings) {
                // eslint-disable-next-line
                isLock = this.currentTextMarkupAnnotation.annotationSettings.isLock;
                if (this.pdfViewer.annotationModule.checkAllowedInteractions('Delete', this.currentTextMarkupAnnotation)) {
                    isLock = false;
                }
            }
            if (!isLock) {
                var deletedAnnotation = null;
                this.showHideDropletDiv(true);
                // eslint-disable-next-line
                var annotation = this.currentTextMarkupAnnotation;
                if (this.currentTextMarkupAnnotation.isMultiSelect && annotation.annotNameCollection) {
                    this.deletMultiPageAnnotation(annotation);
                }
                var pageAnnotations = this.getAnnotations(this.selectTextMarkupCurrentPage, null);
                if (pageAnnotations) {
                    for (var i = 0; i < pageAnnotations.length; i++) {
                        if (this.currentTextMarkupAnnotation.annotName === pageAnnotations[i].annotName) {
                            deletedAnnotation = pageAnnotations.splice(i, 1)[0];
                            // eslint-disable-next-line max-len
                            this.pdfViewer.annotationModule.addAction(this.selectTextMarkupCurrentPage, i, deletedAnnotation, 'Text Markup Deleted', null);
                            this.currentAnnotationIndex = i;
                            this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(deletedAnnotation, 'textMarkup');
                            var removeDiv = document.getElementById(deletedAnnotation.annotName);
                            if (removeDiv) {
                                if (removeDiv.parentElement.childElementCount === 1) {
                                    this.pdfViewer.annotationModule.stickyNotesAnnotationModule.updateAccordionContainer(removeDiv);
                                }
                                else {
                                    removeDiv.remove();
                                }
                            }
                        }
                    }
                    this.pdfViewer.annotationModule.updateAnnotationCollection(this.currentTextMarkupAnnotation);
                    this.manageAnnotations(pageAnnotations, this.selectTextMarkupCurrentPage);
                    // eslint-disable-next-line max-len
                    this.pdfViewer.annotationModule.updateImportAnnotationCollection(this.currentTextMarkupAnnotation, this.currentTextMarkupAnnotation.pageNumber, 'textMarkupAnnotation');
                    var annotationId = this.currentTextMarkupAnnotation.annotName;
                    // eslint-disable-next-line
                    var annotationBounds = this.currentTextMarkupAnnotation.bounds;
                    this.currentTextMarkupAnnotation = null;
                    this.pdfViewer.annotationModule.renderAnnotations(this.selectTextMarkupCurrentPage, null, null, null);
                    this.pdfViewerBase.updateDocumentEditedProperty(true);
                    // eslint-disable-next-line max-len
                    var multiPageCollection = this.multiPageCollectionList(annotation);
                    if (multiPageCollection.length > 0) {
                        multiPageCollection.push(deletedAnnotation);
                        // eslint-disable-next-line max-len
                        this.pdfViewer.fireAnnotationRemove(this.selectTextMarkupCurrentPage, annotationId, deletedAnnotation.textMarkupAnnotationType, annotationBounds, deletedAnnotation.textMarkupContent, deletedAnnotation.textMarkupStartIndex, deletedAnnotation.textMarkupEndIndex, multiPageCollection);
                    }
                    else {
                        // eslint-disable-next-line max-len
                        this.pdfViewer.fireAnnotationRemove(this.selectTextMarkupCurrentPage, annotationId, deletedAnnotation.textMarkupAnnotationType, annotationBounds, deletedAnnotation.textMarkupContent, deletedAnnotation.textMarkupStartIndex, deletedAnnotation.textMarkupEndIndex);
                    }
                    this.currentAnnotationIndex = null;
                    this.selectTextMarkupCurrentPage = null;
                    if (Browser.isDevice && !this.pdfViewer.enableDesktopMode) {
                        // eslint-disable-next-line max-len
                        this.pdfViewer.toolbarModule.annotationToolbarModule.hideMobileAnnotationToolbar();
                        this.pdfViewer.toolbarModule.showToolbar(true);
                    }
                }
            }
        }
    };
    /**
     * @param color
     * @private
     */
    TextMarkupAnnotation.prototype.modifyColorProperty = function (color) {
        if (this.currentTextMarkupAnnotation) {
            var pageAnnotations = this.modifyAnnotationProperty('Color', color, null);
            this.manageAnnotations(pageAnnotations, this.selectTextMarkupCurrentPage);
            this.pdfViewer.annotationModule.renderAnnotations(this.selectTextMarkupCurrentPage, null, null, null);
            this.pdfViewerBase.updateDocumentEditedProperty(true);
            // eslint-disable-next-line
            var annotation = this.currentTextMarkupAnnotation;
            // eslint-disable-next-line max-len
            var multiPageCollection = this.multiPageCollectionList(annotation);
            if (multiPageCollection.length > 0) {
                // eslint-disable-next-line max-len
                this.pdfViewer.fireAnnotationPropertiesChange(this.selectTextMarkupCurrentPage, annotation.annotName, annotation.textMarkupAnnotationType, true, false, false, false, annotation.textMarkupContent, annotation.textMarkupStartIndex, annotation.textMarkupEndIndex, multiPageCollection);
                this.currentAnnotationIndex = null;
            }
            else {
                // eslint-disable-next-line max-len
                this.pdfViewer.fireAnnotationPropertiesChange(this.selectTextMarkupCurrentPage, annotation.annotName, annotation.textMarkupAnnotationType, true, false, false, false, annotation.textMarkupContent, annotation.textMarkupStartIndex, annotation.textMarkupEndIndex);
                this.currentAnnotationIndex = null;
            }
        }
    };
    /**
     * @param args
     * @param isOpacity
     * @private
     */
    TextMarkupAnnotation.prototype.modifyOpacityProperty = function (args, isOpacity) {
        if (this.currentTextMarkupAnnotation) {
            var pageAnnotations = void 0;
            if (isOpacity) {
                pageAnnotations = this.modifyAnnotationProperty('Opacity', isOpacity, 'changed');
            }
            else {
                pageAnnotations = this.modifyAnnotationProperty('Opacity', args.value / 100, args.name);
            }
            if (pageAnnotations) {
                this.manageAnnotations(pageAnnotations, this.selectTextMarkupCurrentPage);
                this.pdfViewer.annotationModule.renderAnnotations(this.selectTextMarkupCurrentPage, null, null, null);
                if (isOpacity || args.name === 'changed') {
                    this.pdfViewerBase.updateDocumentEditedProperty(true);
                    // eslint-disable-next-line
                    var annotation = this.currentTextMarkupAnnotation;
                    // eslint-disable-next-line max-len
                    var multiPageCollection = this.multiPageCollectionList(annotation);
                    if (multiPageCollection.length > 0) {
                        // eslint-disable-next-line max-len
                        this.pdfViewer.fireAnnotationPropertiesChange(this.selectTextMarkupCurrentPage, annotation.annotName, annotation.textMarkupAnnotationType, false, true, false, false, annotation.textMarkupContent, annotation.textMarkupStartIndex, annotation.textMarkupEndIndex, multiPageCollection);
                        this.currentAnnotationIndex = null;
                    }
                    else {
                        // eslint-disable-next-line max-len
                        this.pdfViewer.fireAnnotationPropertiesChange(this.selectTextMarkupCurrentPage, annotation.annotName, annotation.textMarkupAnnotationType, false, true, false, false, annotation.textMarkupContent, annotation.textMarkupStartIndex, annotation.textMarkupEndIndex);
                        this.currentAnnotationIndex = null;
                    }
                }
            }
        }
    };
    /**
     * @param property
     * @param value
     * @param status
     * @param annotName
     * @private
     */
    // eslint-disable-next-line
    TextMarkupAnnotation.prototype.modifyAnnotationProperty = function (property, value, status, annotName) {
        // eslint-disable-next-line
        var annotation = this.currentTextMarkupAnnotation;
        this.pdfViewer.annotationModule.isFormFieldShape = false;
        if (annotation.isMultiSelect && annotation.annotNameCollection) {
            this.modifyMultiPageAnnotations(annotation, property, value);
        }
        var pageAnnotations = this.getAnnotations(this.selectTextMarkupCurrentPage, null);
        if (pageAnnotations) {
            for (var i = 0; i < pageAnnotations.length; i++) {
                if (JSON.stringify(this.currentTextMarkupAnnotation) === JSON.stringify(pageAnnotations[i])) {
                    if (property === 'Color') {
                        pageAnnotations[i].color = value;
                    }
                    else if (property === 'Opacity') {
                        pageAnnotations[i].opacity = value;
                    }
                    else if (property === 'AnnotationSettings') {
                        pageAnnotations[i].annotationSettings = { isLock: value };
                    }
                    pageAnnotations[i].modifiedDate = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
                    this.currentAnnotationIndex = i;
                    if (status === null || status === 'changed') {
                        // eslint-disable-next-line max-len
                        this.pdfViewer.annotationModule.addAction(this.selectTextMarkupCurrentPage, i, this.currentTextMarkupAnnotation, 'Text Markup Property modified', property);
                    }
                    this.currentTextMarkupAnnotation = pageAnnotations[i];
                    this.pdfViewer.annotationModule.stickyNotesAnnotationModule.updateAnnotationModifiedDate(pageAnnotations[i]);
                    this.pdfViewer.annotationModule.storeAnnotationCollections(pageAnnotations[i], this.selectTextMarkupCurrentPage);
                }
            }
        }
        return pageAnnotations;
    };
    /**
     * @param annotation
     * @param pageNumber
     * @param index
     * @param action
     * @private
     */
    TextMarkupAnnotation.prototype.undoTextMarkupAction = function (annotation, pageNumber, index, action) {
        var pageAnnotations = this.getAnnotations(pageNumber, null);
        if (pageAnnotations) {
            if (action === 'Text Markup Added') {
                this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(pageAnnotations[index], 'textMarkup');
                // eslint-disable-next-line
                var removeDiv = document.getElementById(pageAnnotations[index].annotName);
                if (removeDiv) {
                    if (removeDiv.parentElement.childElementCount === 1) {
                        this.pdfViewer.annotationModule.stickyNotesAnnotationModule.updateAccordionContainer(removeDiv);
                    }
                    else {
                        removeDiv.parentElement.removeChild(removeDiv);
                    }
                }
                pageAnnotations.splice(index, 1);
            }
            else if (action === 'Text Markup Deleted') {
                // eslint-disable-next-line max-len
                this.pdfViewer.annotationModule.stickyNotesAnnotationModule.addAnnotationComments(pageNumber, annotation.shapeAnnotationType);
                pageAnnotations.splice(index, 0, annotation);
            }
        }
        this.clearCurrentAnnotation();
        this.pdfViewerBase.updateDocumentEditedProperty(true);
        this.manageAnnotations(pageAnnotations, pageNumber);
        this.pdfViewer.annotationModule.renderAnnotations(pageNumber, null, null, null);
    };
    /**
     * @param annotation
     * @param pageNumber
     * @param index
     * @param property
     * @param isUndoAction
     * @param annotation
     * @param pageNumber
     * @param index
     * @param property
     * @param isUndoAction
     * @param annotation
     * @param pageNumber
     * @param index
     * @param property
     * @param isUndoAction
     * @param annotation
     * @param pageNumber
     * @param index
     * @param property
     * @param isUndoAction
     * @private
     */
    // eslint-disable-next-line max-len
    TextMarkupAnnotation.prototype.undoRedoPropertyChange = function (annotation, pageNumber, index, property, isUndoAction) {
        var pageAnnotations = this.getAnnotations(pageNumber, null);
        if (pageAnnotations) {
            if (property === 'Color') {
                var tempColor = pageAnnotations[index].color;
                pageAnnotations[index].color = annotation.color;
                annotation.color = tempColor;
            }
            else {
                var tempOpacity = pageAnnotations[index].opacity;
                pageAnnotations[index].opacity = annotation.opacity;
                annotation.opacity = tempOpacity;
            }
            this.pdfViewer.annotationModule.stickyNotesAnnotationModule.updateAnnotationModifiedDate(annotation, null, true);
            if (isUndoAction) {
                annotation.modifiedDate = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
            }
        }
        this.clearCurrentAnnotation();
        this.pdfViewerBase.updateDocumentEditedProperty(true);
        this.manageAnnotations(pageAnnotations, pageNumber);
        this.pdfViewer.annotationModule.renderAnnotations(pageNumber, null, null, null);
        return annotation;
    };
    /**
     * @param annotation
     * @param pageNumber
     * @param index
     * @param action
     * @private
     */
    TextMarkupAnnotation.prototype.redoTextMarkupAction = function (annotation, pageNumber, index, action) {
        var pageAnnotations = this.getAnnotations(pageNumber, null);
        if (pageAnnotations) {
            if (action === 'Text Markup Added') {
                // eslint-disable-next-line max-len
                this.pdfViewer.annotationModule.stickyNotesAnnotationModule.addAnnotationComments(pageNumber, annotation.shapeAnnotationType);
                pageAnnotations.push(annotation);
            }
            else if (action === 'Text Markup Deleted') {
                this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(pageAnnotations[index], 'textMarkup');
                // eslint-disable-next-line
                var removeDiv = document.getElementById(pageAnnotations[index].annotName);
                if (removeDiv) {
                    if (removeDiv.parentElement.childElementCount === 1) {
                        this.pdfViewer.annotationModule.stickyNotesAnnotationModule.updateAccordionContainer(removeDiv);
                    }
                    else {
                        removeDiv.remove();
                    }
                }
                pageAnnotations.splice(index, 1);
            }
        }
        this.clearCurrentAnnotation();
        this.pdfViewerBase.updateDocumentEditedProperty(true);
        this.manageAnnotations(pageAnnotations, pageNumber);
        this.pdfViewer.annotationModule.renderAnnotations(pageNumber, null, null, null);
    };
    /**
     * @param pageNumber
     * @param note
     * @param pageNumber
     * @param note
     * @private
     */
    TextMarkupAnnotation.prototype.saveNoteContent = function (pageNumber, note) {
        var pageAnnotations = this.getAnnotations(pageNumber, null);
        if (pageAnnotations) {
            for (var i = 0; i < pageAnnotations.length; i++) {
                if (JSON.stringify(this.currentTextMarkupAnnotation) === JSON.stringify(pageAnnotations[i])) {
                    pageAnnotations[i].note = note;
                }
            }
        }
        this.manageAnnotations(pageAnnotations, pageNumber);
        this.pdfViewerBase.updateDocumentEditedProperty(true);
    };
    TextMarkupAnnotation.prototype.clearCurrentAnnotation = function () {
        if (!this.isExtended) {
            if (this.pdfViewer.isMaintainSelection && !this.pdfViewer.textSelectionModule.isTextSelection) {
                this.selectTextMarkupCurrentPage = this.selectTextMarkupCurrentPage;
                this.currentTextMarkupAnnotation = this.currentTextMarkupAnnotation;
            }
            else {
                this.selectTextMarkupCurrentPage = null;
                this.currentTextMarkupAnnotation = null;
            }
            var isSkip = false;
            // eslint-disable-next-line max-len
            if (this.pdfViewer.annotation.freeTextAnnotationModule && this.pdfViewer.annotation.freeTextAnnotationModule.isInuptBoxInFocus) {
                isSkip = true;
            }
            if (!isSkip) {
                this.enableAnnotationPropertiesTool(false);
            }
        }
    };
    /**
     * @param pageNumber
     * @param isSelect
     * @param pageNumber
     * @param isSelect
     * @private
     */
    TextMarkupAnnotation.prototype.clearCurrentAnnotationSelection = function (pageNumber, isSelect) {
        if (isSelect) {
            this.isAnnotationSelect = true;
        }
        else {
            this.isAnnotationSelect = false;
        }
        var lowerPageIndex = (pageNumber - 2) >= 0 ? (pageNumber - 2) : 0;
        // eslint-disable-next-line max-len
        var higherPageIndex = (pageNumber + 2) < this.pdfViewerBase.pageCount ? (pageNumber + 2) : this.pdfViewerBase.pageCount - 1;
        for (var k = lowerPageIndex; k <= higherPageIndex; k++) {
            this.clearAnnotationSelection(k);
        }
    };
    // eslint-disable-next-line
    TextMarkupAnnotation.prototype.getBoundsForSave = function (bounds, pageIndex) {
        // eslint-disable-next-line
        var newArray = [];
        for (var i = 0; i < bounds.length; i++) {
            // eslint-disable-next-line
            var bound = this.getAnnotationBounds(bounds[i], pageIndex);
            newArray.push(bound);
        }
        return newArray;
    };
    // eslint-disable-next-line
    TextMarkupAnnotation.prototype.getAnnotationBounds = function (bounds, pageIndex) {
        var left = bounds.left ? bounds.left : bounds.Left;
        var top = bounds.top ? bounds.top : bounds.Top;
        var height = bounds.height ? bounds.height : bounds.Height;
        var width = bounds.width ? bounds.width : bounds.Width;
        var pageDetails = this.pdfViewerBase.pageSize[pageIndex];
        left = left ? left : bounds.x;
        top = top ? top : bounds.y;
        if (pageDetails) {
            if (pageDetails.rotation === 1) {
                return { left: top, top: pageDetails.width - (left + width), width: height, height: width };
            }
            else if (pageDetails.rotation === 2) {
                // eslint-disable-next-line max-len
                return { left: pageDetails.width - left - width, top: pageDetails.height - top - height, width: width, height: height };
            }
            else if (pageDetails.rotation === 3) {
                return { left: pageDetails.height - top - height, top: left, width: height, height: width };
            }
            else {
                return { left: left, top: top, width: width, height: height };
            }
        }
        else {
            return { left: left, top: top, width: width, height: height };
        }
    };
    // eslint-disable-next-line
    TextMarkupAnnotation.prototype.getRgbCode = function (colorString) {
        if (!colorString.match(/#([a-z0-9]+)/gi) && !colorString.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/)) {
            colorString = this.pdfViewer.annotationModule.nameToHash(colorString);
        }
        var markupStringArray = colorString.split(',');
        if (isNullOrUndefined(markupStringArray[1])) {
            colorString = this.pdfViewer.annotationModule.getValue(colorString, 'rgba');
            markupStringArray = colorString.split(',');
        }
        // eslint-disable-next-line radix
        var textMarkupR = parseInt(markupStringArray[0].split('(')[1]);
        // eslint-disable-next-line radix
        var textMarkupG = parseInt(markupStringArray[1]);
        // eslint-disable-next-line radix
        var textMarkupB = parseInt(markupStringArray[2]);
        // eslint-disable-next-line radix
        var textMarkupA = parseInt(markupStringArray[3]);
        return { a: textMarkupA, r: textMarkupR, g: textMarkupG, b: textMarkupB };
    };
    TextMarkupAnnotation.prototype.getDrawnBounds = function () {
        var pageBounds = [];
        var selection = window.getSelection();
        if (selection.anchorNode !== null) {
            var range = document.createRange();
            var isBackWardSelection = this.pdfViewerBase.textLayer.isBackWardSelection(selection);
            if (selection.anchorNode === selection.focusNode) {
                var pageId = this.pdfViewerBase.textLayer.getPageIndex(selection.anchorNode);
                var startIndex = 0;
                var endIndex = 0;
                if (!isNaN(pageId)) {
                    var pageRect = this.pdfViewerBase.getElement('_pageDiv_' + pageId).getBoundingClientRect();
                    if (this.pdfViewerBase.isMixedSizeDocument) {
                        pageRect = this.pdfViewerBase.getElement('_textLayer_' + pageId).getBoundingClientRect();
                    }
                    if (isBackWardSelection) {
                        range.setStart(selection.focusNode, selection.focusOffset);
                        range.setEnd(selection.anchorNode, selection.anchorOffset);
                    }
                    else {
                        if (selection.anchorOffset < selection.focusOffset) {
                            startIndex = selection.anchorOffset;
                            endIndex = selection.focusOffset;
                            range.setStart(selection.anchorNode, selection.anchorOffset);
                            range.setEnd(selection.focusNode, selection.focusOffset);
                        }
                        else {
                            startIndex = selection.focusOffset;
                            endIndex = selection.anchorOffset;
                            range.setStart(selection.focusNode, selection.focusOffset);
                            range.setEnd(selection.anchorNode, selection.anchorOffset);
                        }
                    }
                    var boundingRect = range.getBoundingClientRect();
                    // eslint-disable-next-line
                    var indexes = this.getIndexNumbers(pageId, range.toString(), range.commonAncestorContainer.textContent.toString());
                    // eslint-disable-next-line max-len
                    var rectangle = { left: this.getDefaultValue(boundingRect.left - pageRect.left), top: this.getDefaultValue(boundingRect.top - pageRect.top), width: this.getDefaultValue(boundingRect.width), height: this.getDefaultValue(boundingRect.height), right: this.getDefaultValue(boundingRect.right - pageRect.left), bottom: this.getDefaultValue(boundingRect.bottom - pageRect.top) };
                    var rectangleArray = [];
                    rectangleArray.push(rectangle);
                    // eslint-disable-next-line
                    var rect = { left: rectangle.left, top: rectangle.top, right: rectangle.right, bottom: rectangle.bottom };
                    pageBounds.push({ pageIndex: pageId, bounds: rectangleArray, rect: rect, startIndex: indexes.startIndex, endIndex: indexes.endIndex, textContent: range.toString() });
                }
            }
            else {
                var startNode = void 0;
                var endNode = void 0;
                var selectionStartOffset = void 0;
                var selectionEndOffset = void 0;
                if (isBackWardSelection) {
                    startNode = selection.focusNode;
                    selectionStartOffset = selection.focusOffset;
                    endNode = selection.anchorNode;
                    selectionEndOffset = selection.anchorOffset;
                }
                else {
                    startNode = selection.anchorNode;
                    selectionStartOffset = selection.anchorOffset;
                    endNode = selection.focusNode;
                    selectionEndOffset = selection.focusOffset;
                }
                var anchorPageId = this.pdfViewerBase.textLayer.getPageIndex(startNode);
                var anchorTextId = this.pdfViewerBase.textLayer.getTextIndex(startNode, anchorPageId);
                var focusPageId = this.pdfViewerBase.textLayer.getPageIndex(endNode);
                var focusTextId = this.pdfViewerBase.textLayer.getTextIndex(endNode, focusPageId);
                var startOffset = 0;
                var endOffset = 0;
                var currentId = 0;
                for (var i = anchorPageId; i <= focusPageId; i++) {
                    var selectionRects = [];
                    var pageStartId = void 0;
                    var pageEndId = void 0;
                    var pageStartOffset = void 0;
                    var pageEndOffset = void 0;
                    var textDivs = this.pdfViewerBase.getElement('_textLayer_' + i).childNodes;
                    var pageRect = this.pdfViewerBase.getElement('_pageDiv_' + i).getBoundingClientRect();
                    if (this.pdfViewerBase.isMixedSizeDocument) {
                        pageRect = this.pdfViewerBase.getElement('_textLayer_' + i).getBoundingClientRect();
                    }
                    if (i === anchorPageId) {
                        currentId = anchorTextId;
                    }
                    else {
                        currentId = 0;
                    }
                    for (var j = currentId; j < textDivs.length; j++) {
                        var textElement = textDivs[j];
                        if (j === currentId) {
                            pageStartId = currentId;
                            pageStartOffset = (i === anchorPageId) ? selectionStartOffset : 0;
                        }
                        else {
                            pageEndId = j;
                            pageEndOffset = (i === focusPageId) ? selectionEndOffset : textElement.textContent.length;
                        }
                        if (j === anchorTextId && i === anchorPageId) {
                            startOffset = selectionStartOffset;
                        }
                        else {
                            startOffset = 0;
                        }
                        if (j === focusTextId && i === focusPageId) {
                            endOffset = selectionEndOffset;
                        }
                        else {
                            endOffset = textElement.textContent.length;
                        }
                        for (var k = 0; k < textElement.childNodes.length; k++) {
                            var node = textElement.childNodes[k];
                            range.setStart(node, startOffset);
                            range.setEnd(node, endOffset);
                        }
                        var boundingRect = range.getBoundingClientRect();
                        // eslint-disable-next-line max-len
                        var rectangle = { left: this.getDefaultValue(boundingRect.left - pageRect.left), top: this.getDefaultValue(boundingRect.top - pageRect.top), width: this.getDefaultValue(boundingRect.width), height: this.getDefaultValue(boundingRect.height), right: this.getDefaultValue(boundingRect.right - pageRect.left), bottom: this.getDefaultValue(boundingRect.bottom - pageRect.top) };
                        selectionRects.push(rectangle);
                        range.detach();
                        if (i === focusPageId && j === focusTextId) {
                            break;
                        }
                    }
                    if (!pageEndId) {
                        pageEndId = pageStartId;
                    }
                    if (!pageEndOffset) {
                        pageEndOffset = endOffset;
                    }
                    var startElementNode = this.pdfViewerBase.getElement('_text_' + i + '_' + pageStartId).childNodes[0];
                    var endElementNode = this.pdfViewerBase.getElement('_text_' + i + '_' + pageEndId).childNodes[0];
                    var pageRange = document.createRange();
                    pageRange.setStart(startElementNode, pageStartOffset);
                    pageRange.setEnd(endElementNode, pageEndOffset);
                    var pageRectBounds = pageRange.getBoundingClientRect();
                    var textValue = pageRange.toString();
                    // eslint-disable-next-line
                    var indexes = this.getIndexNumbers(i, textValue);
                    // eslint-disable-next-line max-len
                    var pageRectangle = { left: this.getDefaultValue(pageRectBounds.left - pageRect.left), top: this.getDefaultValue(pageRectBounds.top - pageRect.top), width: this.getDefaultValue(pageRectBounds.width), height: this.getDefaultValue(pageRectBounds.height), right: this.getDefaultValue(pageRectBounds.right - pageRect.left), bottom: this.getDefaultValue(pageRectBounds.bottom - pageRect.top) };
                    // eslint-disable-next-line
                    var rect = { left: pageRectangle.left, top: pageRectangle.top, right: pageRectangle.right, bottom: pageRectangle.bottom };
                    pageBounds.push({ pageIndex: i, bounds: selectionRects, rect: rect, startIndex: indexes.startIndex, endIndex: indexes.endIndex, textContent: textValue });
                }
            }
        }
        selection.removeAllRanges();
        return pageBounds;
    };
    // eslint-disable-next-line
    TextMarkupAnnotation.prototype.getIndexNumbers = function (pageNumber, content, parentText) {
        // eslint-disable-next-line
        var storedData = this.pdfViewerBase.getStoredData(pageNumber);
        var startIndex;
        var endIndex;
        if (storedData) {
            var previousIndex = 0;
            var pageText = storedData.pageText;
            for (var p = 0; p < pageNumber; p++) {
                if (this.pdfViewer.isExtractText) {
                    // eslint-disable-next-line
                    var documentIndex = this.pdfViewer.textSearchModule.documentTextCollection[p][p];
                    var pageTextData = documentIndex.pageText ? documentIndex.pageText : documentIndex.PageText;
                    // eslint-disable-next-line max-len
                    if (this.pdfViewer.textSearchModule && this.pdfViewer.textSearchModule.documentTextCollection && this.pdfViewer.textSearchModule.isTextRetrieved) {
                        if (this.pdfViewer.textSearchModule.documentTextCollection[p]) {
                            previousIndex = previousIndex + pageTextData.length;
                        }
                    }
                    else {
                        // eslint-disable-next-line max-len
                        if (this.pdfViewer.textSearchModule && this.pdfViewer.textSearchModule.documentTextCollection) {
                            if (pageNumber <= this.pdfViewer.textSearchModule.documentTextCollection.length) {
                                if (this.pdfViewer.textSearchModule.documentTextCollection[p]) {
                                    // eslint-disable-next-line max-len
                                    previousIndex = previousIndex + pageTextData.length;
                                }
                            }
                            else {
                                previousIndex = 0;
                                break;
                            }
                        }
                    }
                }
            }
            if (!isNullOrUndefined(parentText)) {
                var parentIndex = pageText.indexOf(parentText);
                var initialIndex = parentText.indexOf(content);
                startIndex = (parentIndex + initialIndex) + previousIndex;
            }
            else {
                startIndex = (pageText.indexOf(content)) + previousIndex;
            }
            endIndex = startIndex + (content.length - 1);
        }
        return { startIndex: startIndex, endIndex: endIndex };
    };
    /**
     * @param pageNumber
     * @private
     */
    TextMarkupAnnotation.prototype.rerenderAnnotationsPinch = function (pageNumber) {
        var annotCanvas = this.pdfViewerBase.getElement('_annotationCanvas_' + pageNumber);
        if (annotCanvas) {
            var oldAnnotCanvas = this.pdfViewerBase.getElement('_old_annotationCanvas_' + pageNumber);
            if (oldAnnotCanvas) {
                if (annotCanvas) {
                    oldAnnotCanvas.id = annotCanvas.id;
                    annotCanvas.parentElement.removeChild(annotCanvas);
                }
                else {
                    oldAnnotCanvas.id = this.pdfViewer.element.id + '_annotationCanvas_' + pageNumber;
                }
                annotCanvas = oldAnnotCanvas;
            }
            annotCanvas.style.width = '';
            annotCanvas.style.height = '';
            if (this.pdfViewer.restrictZoomRequest) {
                // eslint-disable-next-line max-len
                annotCanvas.style.width = this.pdfViewerBase.pageSize[pageNumber].width * this.pdfViewerBase.getZoomFactor() + 'px';
                // eslint-disable-next-line max-len
                annotCanvas.style.height = this.pdfViewerBase.pageSize[pageNumber].height * this.pdfViewerBase.getZoomFactor() + 'px';
            }
            else {
                // eslint-disable-next-line max-len
                annotCanvas.width = this.pdfViewerBase.pageSize[pageNumber].width * this.pdfViewerBase.getZoomFactor();
                annotCanvas.height = this.pdfViewerBase.pageSize[pageNumber].height * this.pdfViewerBase.getZoomFactor();
            }
            this.renderTextMarkupAnnotations(null, pageNumber, annotCanvas, this.pdfViewerBase.getZoomFactor());
        }
    };
    /**
     * @param pageNumber
     * @private
     */
    TextMarkupAnnotation.prototype.rerenderAnnotations = function (pageNumber) {
        // eslint-disable-next-line
        var oldCanvasCollection = document.querySelectorAll('#' + this.pdfViewer.element.id + '_old_annotationCanvas_' + pageNumber);
        for (var i = 0; i < oldCanvasCollection.length; i++) {
            if (oldCanvasCollection[i]) {
                oldCanvasCollection[i].parentElement.removeChild(oldCanvasCollection[i]);
            }
        }
        var newCanvas = this.pdfViewerBase.getElement('_annotationCanvas_' + pageNumber);
        if (newCanvas) {
            newCanvas.style.display = 'block';
        }
    };
    /**
     * @param event
     * @private
     */
    TextMarkupAnnotation.prototype.onTextMarkupAnnotationMouseUp = function (event) {
        var pageNumber = this.pdfViewer.annotationModule.getEventPageNumber(event);
        if (!isNullOrUndefined(pageNumber) && !isNaN(pageNumber)) {
            var canvas = this.pdfViewerBase.getElement('_annotationCanvas_' + pageNumber);
            if (this.currentTextMarkupAnnotation) {
                this.selectedTextMarkup = this.currentTextMarkupAnnotation;
            }
            else {
                this.selectedTextMarkup = null;
            }
            this.clearCurrentSelectedAnnotation();
            var currentAnnot = this.getCurrentMarkupAnnotation(event.clientX, event.clientY, pageNumber, canvas);
            if (currentAnnot && !window.getSelection().toString()) {
                var isLock = false;
                var isSelection = false;
                if (currentAnnot.annotationSettings && currentAnnot.annotationSettings.isLock) {
                    isLock = currentAnnot.annotationSettings.isLock;
                    if (isLock && this.pdfViewer.annotationModule.checkAllowedInteractions('Select', currentAnnot)) {
                        isLock = false;
                        if (this.pdfViewer.annotationModule.checkAllowedInteractions('PropertyChange', currentAnnot)) {
                            isSelection = false;
                        }
                        else {
                            isSelection = true;
                        }
                    }
                }
                if (!isLock) {
                    var canvasParentPosition = canvas.parentElement.getBoundingClientRect();
                    var leftClickPosition = event.clientX - canvasParentPosition.left;
                    var topClickPosition = event.clientY - canvasParentPosition.top;
                    this.annotationClickPosition = { x: leftClickPosition, y: topClickPosition };
                    this.selectAnnotation(currentAnnot, canvas, pageNumber, event);
                    if (Browser.isDevice && !this.pdfViewer.enableDesktopMode && this.pdfViewer.enableToolbar && this.pdfViewer.enableAnnotationToolbar) {
                        this.pdfViewer.toolbarModule.annotationToolbarModule.createPropertyTools(this.currentTextMarkupAnnotation.textMarkupAnnotationType);
                    }
                    this.currentTextMarkupAnnotation = currentAnnot;
                    this.selectTextMarkupCurrentPage = pageNumber;
                    if (!isSelection) {
                        this.enableAnnotationPropertiesTool(true);
                    }
                    var commentPanelDiv = document.getElementById(this.pdfViewer.element.id + '_commantPanel');
                    if (commentPanelDiv && commentPanelDiv.style.display === 'block') {
                        // eslint-disable-next-line
                        var accordionExpand = document.getElementById(this.pdfViewer.element.id + '_accordionContainer' + (pageNumber + 1));
                        if (accordionExpand) {
                            accordionExpand.ej2_instances[0].expandItem(true);
                        }
                        // eslint-disable-next-line
                        var comments = document.getElementById(currentAnnot.annotName);
                        if (comments) {
                            comments.firstChild.click();
                        }
                    }
                    if (!isBlazor()) {
                        if (this.pdfViewer.toolbarModule && this.pdfViewer.enableAnnotationToolbar) {
                            this.pdfViewer.toolbarModule.annotationToolbarModule.isToolbarHidden = true;
                            // eslint-disable-next-line max-len
                            this.pdfViewer.toolbarModule.annotationToolbarModule.showAnnotationToolbar(this.pdfViewer.toolbarModule.annotationItem);
                        }
                    }
                }
            }
            else {
                this.clearCurrentAnnotation();
            }
            if (this.pdfViewer.isMaintainSelection && !this.pdfViewer.textSelectionModule.isTextSelection) {
                if (currentAnnot) {
                    this.clearCurrentAnnotationSelection(pageNumber);
                }
            }
            else {
                this.clearCurrentAnnotationSelection(pageNumber);
            }
        }
        else {
            if (!this.pdfViewerBase.isClickedOnScrollBar(event, true)) {
                this.clearCurrentAnnotation();
                this.clearCurrentAnnotationSelection(pageNumber);
            }
        }
    };
    /**
     * @param event
     * @private
     */
    TextMarkupAnnotation.prototype.onTextMarkupAnnotationTouchEnd = function (event) {
        var pageNumber = this.pdfViewer.annotationModule.getEventPageNumber(event);
        if (!isNullOrUndefined(pageNumber) && !isNaN(pageNumber)) {
            if (this.currentTextMarkupAnnotation) {
                this.selectedTextMarkup = this.currentTextMarkupAnnotation;
            }
            else {
                this.selectedTextMarkup = null;
            }
            this.clearCurrentAnnotationSelection(pageNumber);
            var touchCanvas = this.pdfViewerBase.getElement('_annotationCanvas_' + pageNumber);
            this.clearCurrentSelectedAnnotation();
            // eslint-disable-next-line max-len
            var currentAnnot = this.getCurrentMarkupAnnotation(event.touches[0].clientX, event.touches[0].clientY, pageNumber, touchCanvas);
            if (currentAnnot) {
                var isLock = false;
                if (currentAnnot.annotationSettings && currentAnnot.annotationSettings.isLock) {
                    isLock = currentAnnot.annotationSettings.isLock;
                }
                if (!isLock) {
                    var canvasParentPosition = touchCanvas.parentElement.getBoundingClientRect();
                    var leftClickPosition = event.touches[0].clientX - canvasParentPosition.left;
                    var topClickPosition = event.touches[0].clientY - canvasParentPosition.top;
                    this.annotationClickPosition = { x: leftClickPosition, y: topClickPosition };
                    this.selectAnnotation(currentAnnot, touchCanvas, pageNumber, event);
                    if (Browser.isDevice && !this.pdfViewer.enableDesktopMode && this.pdfViewer.enableToolbar && this.pdfViewer.enableAnnotationToolbar) {
                        this.pdfViewer.toolbarModule.annotationToolbarModule.createPropertyTools(this.currentTextMarkupAnnotation.textMarkupAnnotationType);
                    }
                    this.currentTextMarkupAnnotation = currentAnnot;
                    this.selectTextMarkupCurrentPage = pageNumber;
                    this.enableAnnotationPropertiesTool(true);
                    // eslint-disable-next-line
                    var accordionExpand = document.getElementById(this.pdfViewer.element.id + '_accordionContainer' + (pageNumber + 1));
                    if (accordionExpand) {
                        accordionExpand.ej2_instances[0].expandItem(true);
                    }
                    // eslint-disable-next-line
                    var comments = document.getElementById(currentAnnot.annotName);
                    if (comments) {
                        if (!Browser.isDevice) {
                            comments.firstChild.click();
                        }
                    }
                }
            }
            else {
                this.clearCurrentAnnotation();
            }
            this.clearCurrentAnnotationSelection(pageNumber);
        }
        else if (this.selectTextMarkupCurrentPage != null && (Browser.isDevice && !this.pdfViewer.enableDesktopMode)) {
            var number = this.selectTextMarkupCurrentPage;
            this.selectTextMarkupCurrentPage = null;
            this.clearAnnotationSelection(number);
        }
        else {
            this.clearCurrentAnnotation();
            this.clearCurrentAnnotationSelection(pageNumber);
        }
    };
    /**
     * @private
     */
    TextMarkupAnnotation.prototype.clearCurrentSelectedAnnotation = function () {
        if (this.currentTextMarkupAnnotation) {
            this.clearAnnotationSelection(this.selectTextMarkupCurrentPage);
            // eslint-disable-next-line
            var currentAnnot = this.currentTextMarkupAnnotation;
            this.pdfViewer.fireAnnotationUnSelect(currentAnnot.annotName, currentAnnot.pageNumber, currentAnnot);
            this.clearCurrentAnnotation();
        }
    };
    /**
     * @param event
     * @private
     */
    TextMarkupAnnotation.prototype.onTextMarkupAnnotationMouseMove = function (event) {
        var eventTarget = event.target;
        // eslint-disable-next-line
        var pageIndex = parseInt(eventTarget.id.split('_text_')[1]) || parseInt(eventTarget.id.split('_textLayer_')[1]) || parseInt(eventTarget.id.split('_annotationCanvas_')[1]);
        if (event.target && (eventTarget.id.indexOf('_text') > -1 || eventTarget.id.indexOf('_annotationCanvas') > -1 || eventTarget.classList.contains('e-pv-hyperlink')) && this.pdfViewer.annotation) {
            pageIndex = this.pdfViewer.annotation.getEventPageNumber(event);
            var canvas = this.pdfViewerBase.getElement('_annotationCanvas_' + pageIndex);
            var currentAnnot = this.getCurrentMarkupAnnotation(event.clientX, event.clientY, pageIndex, canvas);
            if (currentAnnot) {
                eventTarget.style.cursor = 'pointer';
                // eslint-disable-next-line
                var currentPosition = this.pdfViewerBase.getMousePosition(event);
                // eslint-disable-next-line
                var relativePosition = this.pdfViewerBase.relativePosition(event);
                // eslint-disable-next-line
                var viewerPositions = { left: relativePosition.x, top: relativePosition.y };
                // eslint-disable-next-line
                var mousePositions = { left: currentPosition.x, top: currentPosition.y };
                // eslint-disable-next-line
                var annotationSettings = { opacity: currentAnnot.opacity, color: currentAnnot.color, author: currentAnnot.author, subject: currentAnnot.subject, modifiedDate: currentAnnot.modifiedDate };
                // eslint-disable-next-line max-len
                this.pdfViewerBase.isMousedOver = true;
                this.pdfViewer.fireAnnotationMouseover(currentAnnot.annotName, currentAnnot.pageNumber, currentAnnot.textMarkupAnnotationType, currentAnnot.bounds, annotationSettings, mousePositions, viewerPositions);
                // this.showPopupNote(event, currentAnnot);
            }
            else {
                this.pdfViewer.annotationModule.hidePopupNote();
                if (this.pdfViewerBase.isPanMode && !this.pdfViewerBase.getAnnotationToolStatus()) {
                    eventTarget.style.cursor = 'grab';
                }
                if (this.pdfViewerBase.isMousedOver && !this.pdfViewerBase.isFormFieldMousedOver) {
                    this.pdfViewer.fireAnnotationMouseLeave(pageIndex);
                    this.pdfViewerBase.isMousedOver = false;
                }
            }
        }
    };
    // eslint-disable-next-line
    TextMarkupAnnotation.prototype.showPopupNote = function (event, annotation) {
        if (annotation.note) {
            // eslint-disable-next-line max-len
            this.pdfViewer.annotationModule.showPopupNote(event, annotation.color, annotation.author, annotation.note, annotation.textMarkupAnnotationType);
        }
    };
    TextMarkupAnnotation.prototype.getCurrentMarkupAnnotation = function (clientX, clientY, pageNumber, canvas) {
        var currentTextMarkupAnnotations = [];
        if (canvas) {
            var canvasParentPosition = canvas.parentElement.getBoundingClientRect();
            if (canvas.clientWidth !== canvas.parentElement.clientWidth) {
                canvasParentPosition = canvas.getBoundingClientRect();
            }
            var leftClickPosition = clientX - canvasParentPosition.left;
            var topClickPosition = clientY - canvasParentPosition.top;
            var annotationList = this.getAnnotations(pageNumber, null);
            var isAnnotationGot = false;
            if (annotationList) {
                for (var i = 0; i < annotationList.length; i++) {
                    var annotation = annotationList[i];
                    for (var j = 0; j < annotation.bounds.length; j++) {
                        // eslint-disable-next-line
                        var bound = annotation.bounds[j];
                        var left = bound.left ? bound.left : bound.Left;
                        var top_2 = bound.top ? bound.top : bound.Top;
                        var width = bound.width ? bound.width : bound.Width;
                        var height = bound.height ? bound.height : bound.Height;
                        // eslint-disable-next-line max-len
                        if (leftClickPosition >= this.getMagnifiedValue(left, this.pdfViewerBase.getZoomFactor()) && leftClickPosition <= this.getMagnifiedValue(left + width, this.pdfViewerBase.getZoomFactor()) && topClickPosition >= this.getMagnifiedValue(top_2, this.pdfViewerBase.getZoomFactor()) && topClickPosition <= this.getMagnifiedValue(top_2 + height, this.pdfViewerBase.getZoomFactor())) {
                            currentTextMarkupAnnotations.push(annotation);
                            isAnnotationGot = true;
                        }
                        else {
                            if (isAnnotationGot) {
                                isAnnotationGot = false;
                                break;
                            }
                        }
                    }
                }
            }
            var currentAnnot = null;
            if (currentTextMarkupAnnotations.length > 1) {
                currentAnnot = this.compareCurrentAnnotations(currentTextMarkupAnnotations);
            }
            else if (currentTextMarkupAnnotations.length === 1) {
                currentAnnot = currentTextMarkupAnnotations[0];
            }
            return currentAnnot;
        }
        else {
            return null;
        }
    };
    TextMarkupAnnotation.prototype.compareCurrentAnnotations = function (annotations) {
        var previousX;
        var currentAnnotation = null;
        for (var i = 0; i < annotations.length; i++) {
            if (i === annotations.length - 1) {
                break;
            }
            // eslint-disable-next-line
            var firstAnnotBounds = annotations[i].bounds;
            var firstXposition = firstAnnotBounds[0].left ? firstAnnotBounds[0].left : firstAnnotBounds[0].Left;
            var firstYposition = firstAnnotBounds[0].top ? firstAnnotBounds[0].top : firstAnnotBounds[0].Top;
            // eslint-disable-next-line
            var secondAnnotBounds = annotations[i + 1].bounds;
            var secondXposition = secondAnnotBounds[0].left ? secondAnnotBounds[0].left : secondAnnotBounds[0].Left;
            var secondYposition = secondAnnotBounds[0].top ? secondAnnotBounds[0].top : secondAnnotBounds[0].Top;
            if ((firstXposition < secondXposition) || (firstYposition < secondYposition)) {
                previousX = secondXposition;
                currentAnnotation = annotations[i + 1];
            }
            else {
                previousX = firstXposition;
                currentAnnotation = annotations[i];
            }
            if (previousX && (i === (annotations.length - 2))) {
                if ((previousX === firstXposition) && (previousX === secondXposition)) {
                    previousX = secondXposition;
                    currentAnnotation = annotations[i + 1];
                }
            }
        }
        return currentAnnotation;
    };
    /**
     * @param pageNumber
     * @private
     */
    TextMarkupAnnotation.prototype.clearAnnotationSelection = function (pageNumber) {
        var canvas = this.pdfViewerBase.getElement('_annotationCanvas_' + pageNumber);
        if (canvas) {
            var context = canvas.getContext('2d');
            context.setLineDash([]);
            this.pdfViewer.annotationModule.renderAnnotations(pageNumber, null, null, null);
        }
    };
    /**
     * @param annotation
     * @param canvas
     * @param pageNumber
     * @param event
     * @param isProgrammaticSelection
     * @param annotation
     * @param canvas
     * @param pageNumber
     * @param event
     * @param isProgrammaticSelection
     * @private
     */
    // eslint-disable-next-line max-len
    TextMarkupAnnotation.prototype.selectAnnotation = function (annotation, canvas, pageNumber, event, isProgrammaticSelection) {
        if (this.pdfViewer.selectedItems.annotations[0]) {
            this.pdfViewer.clearSelection(this.pdfViewer.selectedItems.annotations[0].pageIndex);
            this.pdfViewer.clearSelection(this.selectTextMarkupCurrentPage);
        }
        var isLock = false;
        if (annotation.annotationSettings && annotation.annotationSettings.isLock) {
            isLock = annotation.annotationSettings.isLock;
            if (isLock && this.pdfViewer.annotationModule.checkAllowedInteractions('Select', annotation)) {
                isLock = false;
            }
        }
        if (!isLock) {
            var isCurrentTextMarkup = false;
            if (!this.currentTextMarkupAnnotation) {
                isCurrentTextMarkup = true;
            }
            if (this.selectedTextMarkup && annotation && !isProgrammaticSelection) {
                if (this.selectedTextMarkup.annotName === annotation.annotName) {
                    isCurrentTextMarkup = false;
                }
                else {
                    isCurrentTextMarkup = true;
                }
            }
            if (!isNaN(pageNumber)) {
                this.selectTextMarkupCurrentPage = pageNumber;
                this.currentTextMarkupAnnotation = annotation;
                annotation = this.retreiveTextIndex(annotation);
                this.currentTextMarkupAnnotation = annotation;
            }
            if (this.isSelectedAnnotation && this.pdfViewer.textSelectionModule) {
                this.pdfViewerBase.isSelection = true;
                this.updateAnnotationBounds();
            }
            // eslint-disable-next-line
            var currentEvent = event;
            if (this.isEnableTextMarkupResizer(annotation.textMarkupAnnotationType) && annotation && currentEvent && !currentEvent.touches) {
                this.updateCurrentResizerPosition(annotation);
            }
            this.drawAnnotationSelector(annotation, this.currentTextMarkupAnnotation, canvas);
            if (annotation.isMultiSelect && annotation.annotNameCollection) {
                this.selectMultiPageAnnotations(annotation);
            }
            if (annotation.annotName !== '' && !this.isNewAnnotation) {
                if (isCurrentTextMarkup) {
                    var isSelected = false;
                    if (!currentEvent) {
                        isSelected = true;
                    }
                    // eslint-disable-next-line max-len
                    this.pdfViewer.annotationModule.annotationSelect(annotation.annotName, this.selectTextMarkupCurrentPage, annotation, null, false, isSelected);
                    this.selectedTextMarkup = null;
                }
            }
            if (annotation && this.isEnableTextMarkupResizer(annotation.textMarkupAnnotationType)) {
                this.isTextMarkupAnnotationMode = true;
            }
        }
    };
    /**
     * @param annotation
     * @private
     */
    // eslint-disable-next-line
    TextMarkupAnnotation.prototype.updateCurrentResizerPosition = function (annotation) {
        if (!annotation) {
            annotation = this.currentTextMarkupAnnotation;
        }
        if (annotation) {
            if (this.isEnableTextMarkupResizer(annotation.textMarkupAnnotationType) && annotation) {
                // eslint-disable-next-line
                var textElement = this.pdfViewerBase.getElement('_textLayer_' + this.selectTextMarkupCurrentPage);
                if (textElement) {
                    // eslint-disable-next-line
                    var boundingRect = textElement.getBoundingClientRect();
                    var left = annotation.bounds[0].left ? annotation.bounds[0].left : annotation.bounds[0].Left;
                    var top_3 = annotation.bounds[0].top ? annotation.bounds[0].top : annotation.bounds[0].Top;
                    this.updateLeftposition(left * this.pdfViewerBase.getZoomFactor() + boundingRect.left, (boundingRect.top + top_3), true);
                    // eslint-disable-next-line
                    var endPosition = annotation.bounds[annotation.bounds.length - 1];
                    var endLeft = endPosition.left ? endPosition.left : endPosition.Left;
                    var endTop = endPosition.top ? endPosition.top : endPosition.Top;
                    var endWidth = endPosition.width ? endPosition.width : endPosition.Width;
                    // eslint-disable-next-line max-len
                    this.updatePosition((endLeft + endWidth) * this.pdfViewerBase.getZoomFactor() + boundingRect.left, (endTop + boundingRect.top), true);
                }
            }
        }
    };
    // eslint-disable-next-line
    TextMarkupAnnotation.prototype.drawAnnotationSelectRect = function (canvas, x, y, width, height, annotation) {
        var ratio = this.pdfViewerBase.getZoomRatio();
        if (canvas) {
            var context = canvas.getContext('2d');
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.beginPath();
            if (typeof (annotation).annotationSelectorSettings === 'string') {
                // eslint-disable-next-line max-len
                var lineDash = JSON.parse(annotation.annotationSelectorSettings).selectorLineDashArray.length === 0 ? [4] : JSON.parse(annotation.annotationSelectorSettings).selectorLineDashArray;
                if (lineDash.length > 2) {
                    lineDash = [lineDash[0], lineDash[1]];
                }
                context.setLineDash(lineDash);
                context.globalAlpha = 1;
                context.rect(x * ratio, y * ratio, width * ratio, height * ratio);
                context.closePath();
                // eslint-disable-next-line max-len
                var borderColor = JSON.parse(annotation.annotationSelectorSettings).selectionBorderColor === '' ? '#0000ff' : JSON.parse(annotation.annotationSelectorSettings).selectionBorderColor;
                context.strokeStyle = borderColor;
                // eslint-disable-next-line max-len
                context.lineWidth = JSON.parse(annotation.annotationSelectorSettings).selectionBorderThickness === 1 ? 1 : (annotation.annotationSelectorSettings).selectionBorderThickness;
                context.stroke();
                context.save();
            }
            else {
                // eslint-disable-next-line max-len
                var lineDash = (annotation.annotationSelectorSettings).selectorLineDashArray.length === 0 ? [4] : (annotation.annotationSelectorSettings).selectorLineDashArray;
                if (lineDash.length > 2) {
                    lineDash = [lineDash[0], lineDash[1]];
                }
                context.setLineDash(lineDash);
                context.globalAlpha = 1;
                context.rect(x * ratio, y * ratio, width * ratio, height * ratio);
                context.closePath();
                // eslint-disable-next-line max-len
                var borderColor = (annotation.annotationSelectorSettings).selectionBorderColor === '' ? '#0000ff' : (annotation.annotationSelectorSettings).selectionBorderColor;
                context.strokeStyle = borderColor;
                // eslint-disable-next-line max-len
                context.lineWidth = (annotation.annotationSelectorSettings).selectionBorderThickness ? 1 : (annotation.annotationSelectorSettings).selectionBorderThickness;
                context.stroke();
                context.save();
            }
        }
    };
    /**
     * @param isEnable
     * @private
     */
    TextMarkupAnnotation.prototype.enableAnnotationPropertiesTool = function (isEnable) {
        if (this.pdfViewer.toolbarModule && this.pdfViewer.toolbarModule.annotationToolbarModule) {
            // eslint-disable-next-line max-len
            this.pdfViewer.toolbarModule.annotationToolbarModule.colorDropDownElementInBlazor = this.pdfViewer.element.querySelector('.e-pv-annotation-color-container');
        }
        // eslint-disable-next-line max-len
        if (this.pdfViewer.toolbarModule && this.pdfViewer.toolbarModule.annotationToolbarModule) {
            if (!Browser.isDevice) {
                this.pdfViewer.toolbarModule.annotationToolbarModule.createMobileAnnotationToolbar(isEnable);
            }
        }
        // eslint-disable-next-line max-len
        if (this.pdfViewer.toolbarModule && this.pdfViewer.toolbarModule.annotationToolbarModule && this.pdfViewer.toolbarModule.annotationToolbarModule.isMobileAnnotEnabled && this.pdfViewer.selectedItems.annotations.length === 0) {
            if (this.pdfViewer.toolbarModule.annotationToolbarModule) {
                this.pdfViewer.toolbarModule.annotationToolbarModule.selectAnnotationDeleteItem(isEnable);
                var enable = isEnable;
                if (this.isTextMarkupAnnotationMode) {
                    enable = true;
                }
                this.pdfViewer.toolbarModule.annotationToolbarModule.enableTextMarkupAnnotationPropertiesTools(enable);
                if (this.currentTextMarkupAnnotation) {
                    if (!isBlazor()) {
                        // eslint-disable-next-line max-len
                        this.pdfViewer.toolbarModule.annotationToolbarModule.updateColorInIcon(this.pdfViewer.toolbarModule.annotationToolbarModule.colorDropDownElement, this.currentTextMarkupAnnotation.color);
                    }
                    else {
                        // eslint-disable-next-line max-len
                        this.pdfViewer.toolbarModule.annotationToolbarModule.updateColorInIcon(this.pdfViewer.toolbarModule.annotationToolbarModule.colorDropDownElementInBlazor, this.currentTextMarkupAnnotation.color);
                    }
                }
                else {
                    if (!isNullOrUndefined(this.isTextMarkupAnnotationMode) && !this.isTextMarkupAnnotationMode) {
                        if (!isBlazor()) {
                            // eslint-disable-next-line max-len
                            this.pdfViewer.toolbarModule.annotationToolbarModule.updateColorInIcon(this.pdfViewer.toolbarModule.annotationToolbarModule.colorDropDownElement, '#000000');
                        }
                        else {
                            // eslint-disable-next-line max-len
                            this.pdfViewer.toolbarModule.annotationToolbarModule.updateColorInIcon(this.pdfViewer.toolbarModule.annotationToolbarModule.colorDropDownElementInBlazor, '#000000');
                        }
                    }
                    else {
                        this.pdfViewer.toolbarModule.annotationToolbarModule.setCurrentColorInPicker();
                    }
                }
            }
        }
    };
    /**
     * @private
     */
    TextMarkupAnnotation.prototype.maintainAnnotationSelection = function () {
        if (this.currentTextMarkupAnnotation) {
            var canvas = this.pdfViewerBase.getElement('_annotationCanvas_' + this.selectTextMarkupCurrentPage);
            if (canvas) {
                this.selectAnnotation(this.currentTextMarkupAnnotation, canvas, this.selectTextMarkupCurrentPage);
            }
        }
    };
    // private storeAnnotations(pageNumber: number, annotation: ITextMarkupAnnotation): number {
    // eslint-disable-next-line
    //     let storeObject: any = window.sessionStorage.getItem(this.pdfViewerBase.documentId + '_annotations_textMarkup');
    //     let index: number = 0;
    //     if (!storeObject) {
    //         let markupAnnotation: IPageAnnotations = { pageIndex: pageNumber, annotations: [] };
    //         markupAnnotation.annotations.push(annotation);
    //         index = markupAnnotation.annotations.indexOf(annotation);
    //         let annotationCollection: IPageAnnotations[] = [];
    //         annotationCollection.push(markupAnnotation);
    //         let annotationStringified: string = JSON.stringify(annotationCollection);
    //         window.sessionStorage.setItem(this.pdfViewerBase.documentId + '_annotations_textMarkup', annotationStringified);
    //     } else {
    //         let annotObject: IPageAnnotations[] = JSON.parse(storeObject);
    //         window.sessionStorage.removeItem(this.pdfViewerBase.documentId + '_annotations_textMarkup');
    //         let pageIndex: number = this.pdfViewer.annotationModule.getPageCollection(annotObject, pageNumber);
    //         if (annotObject[pageIndex]) {
    //             (annotObject[pageIndex] as IPageAnnotations).annotations.push(annotation);
    //             index = (annotObject[pageIndex] as IPageAnnotations).annotations.indexOf(annotation);
    //         } else {
    //             let markupAnnotation: IPageAnnotations = { pageIndex: pageNumber, annotations: [] };
    //             markupAnnotation.annotations.push(annotation);
    //             index = markupAnnotation.annotations.indexOf(annotation);
    //             annotObject.push(markupAnnotation);
    //         }
    //         let annotationStringified: string = JSON.stringify(annotObject);
    //         window.sessionStorage.setItem(this.pdfViewerBase.documentId + '_annotations_textMarkup', annotationStringified);
    //     }
    //     return index;
    // }
    /**
     * @param pageAnnotations
     * @param pageNumber
     * @private
     */
    TextMarkupAnnotation.prototype.manageAnnotations = function (pageAnnotations, pageNumber) {
        // eslint-disable-next-line
        var storeObject = window.sessionStorage.getItem(this.pdfViewerBase.documentId + '_annotations_textMarkup');
        if (this.pdfViewerBase.isStorageExceed) {
            storeObject = this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_textMarkup'];
        }
        if (storeObject) {
            var annotObject = JSON.parse(storeObject);
            if (!this.pdfViewerBase.isStorageExceed) {
                window.sessionStorage.removeItem(this.pdfViewerBase.documentId + '_annotations_textMarkup');
            }
            var index = this.pdfViewer.annotationModule.getPageCollection(annotObject, pageNumber);
            if (annotObject[index]) {
                annotObject[index].annotations = pageAnnotations;
            }
            var annotationStringified = JSON.stringify(annotObject);
            if (this.pdfViewerBase.isStorageExceed) {
                this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_textMarkup'] = annotationStringified;
            }
            else {
                window.sessionStorage.setItem(this.pdfViewerBase.documentId + '_annotations_textMarkup', annotationStringified);
            }
        }
    };
    /**
     * @param pageIndex
     * @param textMarkupAnnotations
     * @param id
     * @param pageIndex
     * @param textMarkupAnnotations
     * @param id
     * @private
     */
    // eslint-disable-next-line
    TextMarkupAnnotation.prototype.getAnnotations = function (pageIndex, textMarkupAnnotations, id) {
        // eslint-disable-next-line
        var annotationCollection;
        // eslint-disable-next-line
        if (id == null || id == undefined) {
            id = '_annotations_textMarkup';
        }
        // eslint-disable-next-line
        var storeObject = window.sessionStorage.getItem(this.pdfViewerBase.documentId + id);
        if (this.pdfViewerBase.isStorageExceed) {
            storeObject = this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + id];
        }
        if (storeObject) {
            var annotObject = JSON.parse(storeObject);
            var index = this.pdfViewer.annotationModule.getPageCollection(annotObject, pageIndex);
            if (annotObject[index]) {
                annotationCollection = annotObject[index].annotations;
            }
            else {
                annotationCollection = textMarkupAnnotations;
            }
        }
        else {
            annotationCollection = textMarkupAnnotations;
        }
        return annotationCollection;
    };
    // eslint-disable-next-line max-len
    // eslint-disable-next-line
    TextMarkupAnnotation.prototype.getAddedAnnotation = function (type, color, opacity, bounds, author, subject, predefinedDate, note, isCommentLock, rect, pageNumber, textContent, startIndex, endIndex, isMultiSelect, allowedInteractions, annotationRotate) {
        // eslint-disable-next-line max-len
        var modifiedDate = predefinedDate ? predefinedDate : this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
        var annotationName = this.pdfViewer.annotation.createGUID();
        var commentsDivid = this.pdfViewer.annotation.stickyNotesAnnotationModule.addComments('textMarkup', pageNumber + 1, type);
        if (commentsDivid) {
            document.getElementById(commentsDivid).id = annotationName;
        }
        // eslint-disable-next-line
        var annotationSettings = this.pdfViewer.annotationSettings ? this.pdfViewer.annotationSettings : this.pdfViewer.annotationModule.updateAnnotationSettings(this.pdfViewer.annotation);
        var isPrint = this.getIsPrintValue(type);
        var annotation = {
            // eslint-disable-next-line max-len
            textMarkupAnnotationType: type, color: color, opacity: opacity, bounds: bounds, author: author, allowedInteractions: allowedInteractions, subject: subject, modifiedDate: modifiedDate, note: note, rect: rect,
            annotName: annotationName, comments: [], review: { state: '', stateModel: '', author: author, modifiedDate: modifiedDate }, shapeAnnotationType: 'textMarkup', pageNumber: pageNumber,
            // eslint-disable-next-line max-len
            textMarkupContent: textContent, textMarkupStartIndex: startIndex, textMarkupEndIndex: endIndex, isMultiSelect: isMultiSelect, annotationSelectorSettings: this.getSelector(type),
            customData: this.pdfViewer.annotation.getTextMarkupData(subject), annotationAddMode: this.annotationAddMode, annotationSettings: annotationSettings, isPrint: isPrint, isCommentLock: isCommentLock, isAnnotationRotated: false, annotationRotation: annotationRotate
        };
        if (isMultiSelect) {
            this.multiPageCollection.push(annotation);
        }
        var isSkip = false;
        if (isMultiSelect && this.isExtended) {
            isSkip = true;
        }
        if (document.getElementById(annotationName) && !isSkip) {
            document.getElementById(annotationName).addEventListener('mouseup', this.annotationDivSelect(annotation, pageNumber));
        }
        var storedIndex = this.pdfViewer.annotationModule.storeAnnotations(pageNumber, annotation, '_annotations_textMarkup');
        this.pdfViewer.annotationModule.addAction(pageNumber, storedIndex, annotation, 'Text Markup Added', null);
        return annotation;
    };
    TextMarkupAnnotation.prototype.getSelector = function (type) {
        var selector = this.pdfViewer.annotationSelectorSettings;
        if (type === 'Highlight' && this.pdfViewer.highlightSettings.annotationSelectorSettings) {
            selector = this.pdfViewer.highlightSettings.annotationSelectorSettings;
        }
        else if (type === 'Underline' && this.pdfViewer.underlineSettings.annotationSelectorSettings) {
            selector = this.pdfViewer.underlineSettings.annotationSelectorSettings;
        }
        else if (type === 'Strikethrough' && this.pdfViewer.strikethroughSettings.annotationSelectorSettings) {
            selector = this.pdfViewer.strikethroughSettings.annotationSelectorSettings;
        }
        return selector;
    };
    TextMarkupAnnotation.prototype.getIsPrintValue = function (type) {
        var isPrint = true;
        if (type === 'Highlight') {
            isPrint = this.pdfViewer.highlightSettings.isPrint;
        }
        if (type === 'Underline') {
            isPrint = this.pdfViewer.underlineSettings.isPrint;
        }
        if (type === 'Strikethrough') {
            isPrint = this.pdfViewer.strikethroughSettings.isPrint;
        }
        if (isNullOrUndefined(isPrint)) {
            isPrint = true;
        }
        return isPrint;
    };
    // eslint-disable-next-line
    TextMarkupAnnotation.prototype.annotationDivSelect = function (annotation, pageNumber) {
        var canvas = this.pdfViewerBase.getElement('_annotationCanvas_' + pageNumber);
        this.selectAnnotation(annotation, canvas, pageNumber);
        if (this.pdfViewer.toolbarModule) {
            if (this.pdfViewer.toolbarModule.annotationToolbarModule && this.pdfViewer.enableAnnotationToolbar) {
                this.pdfViewer.toolbarModule.annotationToolbarModule.clearShapeMode();
                this.pdfViewer.toolbarModule.annotationToolbarModule.clearMeasureMode();
                var isLock = false;
                if (annotation.annotationSettings && annotation.annotationSettings.isLock) {
                    isLock = annotation.annotationSettings.isLock;
                }
                if (isLock) {
                    if (this.pdfViewer.annotationModule.checkAllowedInteractions('PropertyChange', annotation)) {
                        this.pdfViewer.toolbarModule.annotationToolbarModule.enableTextMarkupAnnotationPropertiesTools(true);
                        this.pdfViewer.toolbarModule.annotationToolbarModule.setCurrentColorInPicker();
                    }
                    if (this.pdfViewer.annotationModule.checkAllowedInteractions('Delete', annotation)) {
                        this.pdfViewer.toolbarModule.annotationToolbarModule.selectAnnotationDeleteItem(true);
                    }
                }
                else {
                    this.pdfViewer.toolbarModule.annotationToolbarModule.enableTextMarkupAnnotationPropertiesTools(true);
                    this.pdfViewer.toolbarModule.annotationToolbarModule.selectAnnotationDeleteItem(true);
                    this.pdfViewer.toolbarModule.annotationToolbarModule.setCurrentColorInPicker();
                }
                this.pdfViewer.toolbarModule.annotationToolbarModule.isToolbarHidden = true;
                if (!isBlazor()) {
                    this.pdfViewer.toolbarModule.annotationToolbarModule.showAnnotationToolbar(this.pdfViewer.toolbarModule.annotationItem);
                }
            }
        }
    };
    TextMarkupAnnotation.prototype.getPageContext = function (pageNumber) {
        var canvas = this.pdfViewerBase.getElement('_annotationCanvas_' + pageNumber);
        var context = null;
        if (canvas) {
            context = canvas.getContext('2d');
        }
        return context;
    };
    TextMarkupAnnotation.prototype.getDefaultValue = function (value) {
        return value / this.pdfViewerBase.getZoomFactor();
    };
    TextMarkupAnnotation.prototype.getMagnifiedValue = function (value, factor) {
        return value * factor;
    };
    /**
     * @param annotation
     * @param pageNumber
     * @private
     */
    // eslint-disable-next-line
    TextMarkupAnnotation.prototype.saveImportedTextMarkupAnnotations = function (annotation, pageNumber) {
        var annotationObject = null;
        annotation.Author = this.pdfViewer.annotationModule.updateAnnotationAuthor('textMarkup', annotation.Subject);
        // eslint-disable-next-line max-len
        annotation.allowedInteractions = this.pdfViewer.annotationModule.updateAnnotationAllowedInteractions(annotation);
        annotation.AnnotationSettings = annotation.AnnotationSettings ? annotation.AnnotationSettings : this.pdfViewer.annotationModule.updateSettings(this.pdfViewer.customStampSettings);
        // eslint-disable-next-line max-len
        annotationObject = {
            // eslint-disable-next-line max-len
            textMarkupAnnotationType: annotation.TextMarkupAnnotationType, color: annotation.Color, opacity: annotation.Opacity, allowedInteractions: annotation.allowedInteractions, bounds: annotation.Bounds, author: annotation.Author, subject: annotation.Subject, modifiedDate: annotation.ModifiedDate, note: annotation.Note, rect: annotation.Rect,
            annotName: annotation.AnnotName, comments: this.pdfViewer.annotationModule.getAnnotationComments(annotation.Comments, annotation, annotation.Author), review: { state: annotation.State, stateModel: annotation.StateModel, modifiedDate: annotation.ModifiedDate, author: annotation.Author },
            shapeAnnotationType: 'textMarkup',
            pageNumber: pageNumber, textMarkupContent: '', textMarkupStartIndex: 0,
            // eslint-disable-next-line max-len
            textMarkupEndIndex: 0, annotationSelectorSettings: this.getSettings(annotation), customData: this.pdfViewer.annotation.getCustomData(annotation),
            isMultiSelect: annotation.IsMultiSelect, annotNameCollection: annotation.AnnotNameCollection, annotpageNumbers: annotation.AnnotpageNumbers,
            // eslint-disable-next-line max-len
            annotationAddMode: this.annotationAddMode, annotationSettings: annotation.AnnotationSettings, isPrint: annotation.IsPrint, isCommentLock: annotation.IsCommentLock, isAnnotationRotated: false
        };
        this.pdfViewer.annotationModule.storeAnnotations(pageNumber, annotationObject, '_annotations_textMarkup');
    };
    /**
     * @param annotation
     * @param pageNumber
     * @param annotation
     * @param pageNumber
     * @private
     */
    // eslint-disable-next-line
    TextMarkupAnnotation.prototype.updateTextMarkupAnnotationCollections = function (annotation, pageNumber) {
        // eslint-disable-next-line
        var annotationObject = null;
        // eslint-disable-next-line max-len
        annotation.allowedInteractions = annotation.AllowedInteractions ? annotation.AllowedInteractions : this.pdfViewer.annotationModule.updateAnnotationAllowedInteractions(annotation);
        annotationObject = {
            // eslint-disable-next-line max-len
            textMarkupAnnotationType: annotation.TextMarkupAnnotationType, allowedInteractions: annotation.allowedInteractions, color: annotation.Color, opacity: annotation.Opacity, bounds: annotation.Bounds, author: annotation.Author, subject: annotation.Subject, modifiedDate: annotation.ModifiedDate, note: annotation.Note, rect: annotation.Rect,
            annotationId: annotation.AnnotName, comments: this.pdfViewer.annotationModule.getAnnotationComments(annotation.Comments, annotation, annotation.Author), review: { state: annotation.State, stateModel: annotation.StateModel, modifiedDate: annotation.ModifiedDate, author: annotation.Author }, shapeAnnotationType: 'textMarkup', pageNumber: pageNumber, isMultiSelect: annotation.IsMultiSelect, annotNameCollection: annotation.AnnotNameCollection, annotpageNumbers: annotation.AnnotpageNumbers, customData: this.pdfViewer.annotation.getCustomData(annotation),
            isPrint: annotation.IsPrint, isCommentLock: annotation.IsCommentLock
        };
        return annotationObject;
    };
    /**
     * @param textMarkUpSettings
     * @private
     */
    // eslint-disable-next-line
    TextMarkupAnnotation.prototype.updateTextMarkupSettings = function (textMarkUpSettings) {
        if (textMarkUpSettings === 'highlightSettings') {
            // eslint-disable-next-line max-len
            this.highlightColor = this.pdfViewer.highlightSettings.color ? this.pdfViewer.highlightSettings.color : this.highlightColor;
            // eslint-disable-next-line max-len
            this.highlightOpacity = this.pdfViewer.highlightSettings.opacity ? this.pdfViewer.highlightSettings.opacity : this.highlightOpacity;
        }
        if (textMarkUpSettings === 'underlineSettings') {
            // eslint-disable-next-line max-len
            this.underlineColor = this.pdfViewer.underlineSettings.color ? this.pdfViewer.underlineSettings.color : this.underlineColor;
            // eslint-disable-next-line max-len
            this.underlineOpacity = this.pdfViewer.underlineSettings.opacity ? this.pdfViewer.underlineSettings.opacity : this.underlineOpacity;
        }
        if (textMarkUpSettings === 'strikethroughSettings') {
            // eslint-disable-next-line max-len
            this.strikethroughColor = this.pdfViewer.strikethroughSettings.color ? this.pdfViewer.strikethroughSettings.color : this.strikethroughColor;
            // eslint-disable-next-line max-len
            this.strikethroughOpacity = this.pdfViewer.strikethroughSettings.opacity ? this.pdfViewer.strikethroughSettings.opacity : this.strikethroughOpacity;
        }
    };
    /**
     * @private
     */
    TextMarkupAnnotation.prototype.clear = function () {
        this.selectTextMarkupCurrentPage = null;
        this.currentTextMarkupAnnotation = null;
        this.annotationClickPosition = null;
        window.sessionStorage.removeItem(this.pdfViewerBase.documentId + '_annotations_textMarkup');
    };
    /**
     * Get vertex points properties
     * @private
     */
    TextMarkupAnnotation.prototype.getOffsetPoints = function (points) {
        var offsetPoints = [];
        //Converting points model into vertex property
        for (var j = 0; j < points.length; j++) {
            offsetPoints[j] = { X: points[j].x, Y: points[j].y, Width: points[j].width, Height: points[j].height, Left: points[j].x, Top: points[j].y };
        }
        return offsetPoints;
    };
    /**
     * This method used to add annotations with using program.
     *
     * @param annotationType - It describes the annotation type
     * @param annotationObject - It describes type of annotation object
     * @returns Object
     * @private
     */
    TextMarkupAnnotation.prototype.updateAddAnnotationDetails = function (annotationType, annotationObject) {
        //Creating new object if annotationObject is null
        if (!annotationObject) {
            annotationObject = { pageNumber: 0 };
        }
        //Initialize the annotation settings
        var annotSelectorSettings = null;
        var annotallowedInteractions = null;
        var textMarkupAnnotationType = '';
        var annotSettings = null;
        var color = '';
        var bounds = [];
        //Creating the CurrentDate and Annotation name
        var currentDateString = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
        var annotationName = this.pdfViewer.annotation.createGUID();
        if (annotationType == 'Highlight') {
            //Creating annotation settings
            annotSelectorSettings = this.pdfViewer.highlightSettings.annotationSelectorSettings ? this.pdfViewer.highlightSettings.annotationSelectorSettings : this.pdfViewer.annotationSelectorSettings;
            annotSettings = this.pdfViewer.annotationModule.updateSettings(this.pdfViewer.highlightSettings);
            annotationObject.author = this.pdfViewer.annotationModule.updateAnnotationAuthor('textMarkup', annotationType);
            annotallowedInteractions = this.pdfViewer.highlightSettings.allowedInteractions ? this.pdfViewer.highlightSettings.allowedInteractions : this.pdfViewer.annotationSettings.allowedInteractions;
            textMarkupAnnotationType = 'Highlight';
            color = annotationObject.color ? annotationObject.color : '#ffff00';
        }
        else if (annotationType == 'Underline') {
            //Creating annotation settings
            annotSelectorSettings = this.pdfViewer.underlineSettings.annotationSelectorSettings ? this.pdfViewer.underlineSettings.annotationSelectorSettings : this.pdfViewer.annotationSelectorSettings;
            annotSettings = this.pdfViewer.annotationModule.updateSettings(this.pdfViewer.underlineSettings);
            annotationObject.author = this.pdfViewer.annotationModule.updateAnnotationAuthor('textMarkup', annotationType);
            annotallowedInteractions = this.pdfViewer.underlineSettings.allowedInteractions ? this.pdfViewer.underlineSettings.allowedInteractions : this.pdfViewer.annotationSettings.allowedInteractions;
            textMarkupAnnotationType = 'Underline';
            color = annotationObject.color ? annotationObject.color : '#00ff00';
        }
        else if (annotationType == 'Strikethrough') {
            //Creating annotation settings
            annotSelectorSettings = this.pdfViewer.strikethroughSettings.annotationSelectorSettings ? this.pdfViewer.strikethroughSettings.annotationSelectorSettings : this.pdfViewer.annotationSelectorSettings;
            annotSettings = this.pdfViewer.annotationModule.updateSettings(this.pdfViewer.strikethroughSettings);
            annotationObject.author = this.pdfViewer.annotationModule.updateAnnotationAuthor('textMarkup', annotationType);
            annotallowedInteractions = this.pdfViewer.strikethroughSettings.allowedInteractions ? this.pdfViewer.strikethroughSettings.allowedInteractions : this.pdfViewer.annotationSettings.allowedInteractions;
            textMarkupAnnotationType = 'Strikethrough';
            color = annotationObject.color ? annotationObject.color : '#ff0000';
        }
        annotSettings.isLock = annotationObject.isLock ? annotationObject.isLock : annotSettings.isLock;
        //Creating the offset points
        if (annotationObject.bounds) {
            bounds = this.getOffsetPoints(annotationObject.bounds);
        }
        else
            bounds = [{ X: 1, Y: 1, Width: 100, Height: 14, Left: 1, Top: 1, Location: { X: 1, Y: 1 }, Size: { Height: 14, IsEmpty: false, Width: 100 } }];
        //Creating Annotation objects with it's proper properties       
        var textMarkupAnnotation = [];
        var textmarkup = {
            AllowedInteractions: annotationObject.allowedInteractions ? annotationObject.allowedInteractions : annotallowedInteractions,
            AnnotName: annotationName,
            AnnotNameCollection: null,
            AnnotType: 'textMarkup',
            AnnotationSelectorSettings: annotationObject.annotationSelectorSettings ? annotationObject.annotationSelectorSettings : annotSelectorSettings,
            AnnotationSettings: annotSettings,
            Author: annotationObject.author ? annotationObject.author : 'Guest',
            Bounds: bounds,
            Color: annotationObject.color ? annotationObject.color : color,
            Comments: null,
            CreatedDate: currentDateString,
            CustomData: annotationObject.customData ? annotationObject.customData : null,
            ExistingCustomData: null,
            EnableMultiPageAnnotation: annotationObject.enableMultiPageAnnotation ? annotationObject.enableMultiPageAnnotation : false,
            EnableTextMarkupResizer: annotationObject.enableTextMarkupResizer ? annotationObject.enableTextMarkupResizer : false,
            IsCommentLock: false,
            IsMultiSelect: false,
            IsLock: annotationObject.isLock ? annotationObject.isLock : false,
            IsPrint: annotationObject.isPrint ? annotationObject.isPrint : true,
            ModifiedDate: '',
            Note: '',
            Opacity: annotationObject.opacity ? annotationObject.opacity : 1,
            Rect: {},
            State: '',
            StateModel: '',
            Subject: textMarkupAnnotationType,
            TextMarkupAnnotationType: textMarkupAnnotationType,
        };
        //Adding the annotation object to an array and return it
        textMarkupAnnotation[0] = textmarkup;
        return { textMarkupAnnotation: textMarkupAnnotation };
    };
    return TextMarkupAnnotation;
}());
export { TextMarkupAnnotation };
