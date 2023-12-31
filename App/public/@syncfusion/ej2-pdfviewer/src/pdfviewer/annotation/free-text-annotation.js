/* eslint-disable */
import { FontStyle } from './../base/types';
import { isBlazor, isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * @hidden
 */
var FreeTextAnnotation = /** @class */ (function () {
    function FreeTextAnnotation(pdfviewer, pdfViewerBase) {
        /**
         * @private
         */
        this.inputBoxCount = 0;
        /**
         * @private
         */
        this.isFreeTextValueChange = false;
        /**
         * @private
         */
        this.isAddAnnotationProgramatically = false;
        /**
         * @private
         */
        this.isInuptBoxInFocus = false;
        /**
         * @private
         */
        // eslint-disable-next-line
        this.freeTextPageNumbers = [];
        /**
         * @private
         */
        this.selectedText = '';
        /**
         * @private
         */
        this.isTextSelected = false;
        this.selectionStart = 0;
        this.selectionEnd = 0;
        /**
         * @private
         */
        this.isBold = false;
        /**
         * @private
         */
        this.isItalic = false;
        /**
         * @private
         */
        this.isUnderline = false;
        /**
         * @private
         */
        this.isStrikethrough = false;
        this.isReadonly = false;
        this.isMaximumWidthReached = false;
        this.freeTextPaddingLeft = 4;
        this.freeTextPaddingTop = 5;
        this.defaultFontSize = 16;
        /**
         * @private
         */
        this.previousText = 'Type Here';
        /**
         * @private
         */
        this.currentPosition = [];
        this.pdfViewer = pdfviewer;
        this.pdfViewerBase = pdfViewerBase;
        this.updateTextProperties();
        this.inputBoxElement = document.createElement('textarea');
        this.inputBoxElement.style.position = 'absolute';
        this.inputBoxElement.style.Width = this.defautWidth;
        this.inputBoxElement.style.Height = this.defaultHeight;
        this.inputBoxElement.style.zIndex = '5';
        this.inputBoxElement.style.fontSize = this.fontSize + 'px';
        this.inputBoxElement.className = 'free-text-input';
        this.inputBoxElement.style.resize = 'none';
        this.inputBoxElement.style.borderColor = this.borderColor;
        this.inputBoxElement.style.background = this.fillColor;
        this.inputBoxElement.style.borderStyle = this.borderStyle;
        this.inputBoxElement.style.borderWidth = this.borderWidth + 'px';
        this.inputBoxElement.style.padding = this.padding;
        this.inputBoxElement.style.paddingLeft = this.freeTextPaddingLeft + 'px';
        this.inputBoxElement.style.paddingTop = this.freeTextPaddingTop * (parseFloat(this.inputBoxElement.style.fontSize) / this.defaultFontSize) + 'px';
        this.inputBoxElement.style.borderRadius = '2px';
        this.inputBoxElement.style.verticalAlign = 'middle';
        this.inputBoxElement.style.fontFamily = this.fontFamily;
        this.inputBoxElement.style.color = this.pdfViewer.freeTextSettings.fontColor ?
            this.pdfViewer.freeTextSettings.fontColor : '#000';
        this.inputBoxElement.style.overflow = 'hidden';
        this.inputBoxElement.style.wordBreak = this.wordBreak;
        this.inputBoxElement.readOnly = this.isReadonly;
        this.inputBoxElement.addEventListener('focusout', this.onFocusOutInputBox.bind(this));
        this.inputBoxElement.addEventListener('keydown', this.onKeyDownInputBox.bind(this));
        this.inputBoxElement.addEventListener('mouseup', this.onMouseUpInputBox.bind(this));
        this.freeTextPageNumbers = [];
    }
    /**
     * @private
     */
    FreeTextAnnotation.prototype.updateTextProperties = function () {
        this.defautWidth = this.pdfViewer.freeTextSettings.width ? this.pdfViewer.freeTextSettings.width : 151;
        this.defaultHeight = this.pdfViewer.freeTextSettings.height ? this.pdfViewer.freeTextSettings.height : 24.6;
        this.borderColor = this.pdfViewer.freeTextSettings.borderColor ? this.pdfViewer.freeTextSettings.borderColor : '#ffffff00';
        this.fillColor = this.pdfViewer.freeTextSettings.fillColor ? this.pdfViewer.freeTextSettings.fillColor : '#fff';
        this.borderStyle = this.pdfViewer.freeTextSettings.borderStyle ? this.pdfViewer.freeTextSettings.borderStyle : 'solid';
        this.borderWidth = this.pdfViewer.freeTextSettings.borderWidth ? this.pdfViewer.freeTextSettings.borderWidth : 1;
        this.fontSize = this.pdfViewer.freeTextSettings.fontSize ? this.pdfViewer.freeTextSettings.fontSize : 16;
        this.opacity = this.pdfViewer.freeTextSettings.opacity ? this.pdfViewer.freeTextSettings.opacity : 1;
        this.fontColor = this.pdfViewer.freeTextSettings.fontColor ? this.pdfViewer.freeTextSettings.fontColor : '#000';
        // eslint-disable-next-line max-len
        this.author = (this.pdfViewer.freeTextSettings.author !== 'Guest') ? this.pdfViewer.freeTextSettings.author : this.pdfViewer.annotationSettings.author ? this.pdfViewer.annotationSettings.author : 'Guest';
        if (!isNullOrUndefined(this.pdfViewer.annotationModule)) {
            if (this.getRgbCode(this.borderColor).a === 0) {
                this.borderWidth = 0;
            }
        }
        if (this.pdfViewer.freeTextSettings.fontFamily) {
            var fontName = this.pdfViewer.freeTextSettings.fontFamily;
            if (fontName === 'Helvetica' || fontName === 'Times New Roman' || fontName === 'Courier' || fontName === 'Symbol' || fontName === 'ZapfDingbats') {
                this.fontFamily = fontName;
            }
            else {
                this.fontFamily = 'Helvetica';
            }
        }
        else {
            this.fontFamily = 'Helvetica';
        }
        this.textAlign = this.pdfViewer.freeTextSettings.textAlignment ? this.pdfViewer.freeTextSettings.textAlignment : 'Left';
        this.defaultText = this.pdfViewer.freeTextSettings.defaultText ? this.pdfViewer.freeTextSettings.defaultText : 'Type here';
        this.isReadonly = false;
        if (this.pdfViewer.freeTextSettings.enableAutoFit) {
            this.wordBreak = 'break-all';
            this.padding = '2px';
        }
        else {
            this.padding = '0px';
            this.wordBreak = 'break-word';
        }
        // eslint-disable-next-line max-len
        if (this.pdfViewer.freeTextSettings.isLock || this.pdfViewer.annotationSettings.isLock || this.pdfViewer.freeTextSettings.isReadonly) {
            this.isReadonly = true;
        }
        if (this.pdfViewer.freeTextSettings.fontStyle === 1) {
            this.isBold = true;
        }
        else if (this.pdfViewer.freeTextSettings.fontStyle === 2) {
            this.isItalic = true;
        }
        else if (this.pdfViewer.freeTextSettings.fontStyle === 4) {
            this.isUnderline = true;
        }
        else if (this.pdfViewer.freeTextSettings.fontStyle === 8) {
            this.isStrikethrough = true;
        }
        else if (3 === this.pdfViewer.freeTextSettings.fontStyle) {
            this.isBold = true;
            this.isItalic = true;
        }
        else if (5 === this.pdfViewer.freeTextSettings.fontStyle) {
            this.isBold = true;
            this.isUnderline = true;
        }
        else if (9 === this.pdfViewer.freeTextSettings.fontStyle) {
            this.isBold = true;
            this.isStrikethrough = true;
        }
        else if (7 === this.pdfViewer.freeTextSettings.fontStyle) {
            this.isBold = true;
            this.isItalic = true;
            this.isUnderline = true;
        }
        else if (11 === this.pdfViewer.freeTextSettings.fontStyle) {
            this.isBold = true;
            this.isItalic = true;
            this.isStrikethrough = true;
        }
        else if (14 === this.pdfViewer.freeTextSettings.fontStyle) {
            this.isBold = true;
            this.isUnderline = true;
            this.isStrikethrough = true;
        }
        else if (6 === this.pdfViewer.freeTextSettings.fontStyle) {
            this.isUnderline = true;
            this.isItalic = true;
        }
    };
    /**
     * @param shapeAnnotations
     * @param pageNumber
     * @param isImportAction
     * @private
     */
    // eslint-disable-next-line
    FreeTextAnnotation.prototype.renderFreeTextAnnotations = function (shapeAnnotations, pageNumber, isImportAction, isAnnotOrderAction) {
        var isFreeTextAdded = false;
        if (!isImportAction) {
            for (var p = 0; p < this.freeTextPageNumbers.length; p++) {
                if (this.freeTextPageNumbers[p] === pageNumber) {
                    isFreeTextAdded = true;
                    break;
                }
            }
        }
        if (shapeAnnotations && (!isFreeTextAdded || isAnnotOrderAction)) {
            if (shapeAnnotations.length >= 1) {
                this.freeTextPageNumbers.push(pageNumber);
                for (var i = 0; i < shapeAnnotations.length; i++) {
                    // eslint-disable-next-line
                    var annotation = shapeAnnotations[i];
                    annotation.annotationAddMode = this.pdfViewer.annotationModule.findAnnotationMode(annotation, pageNumber, annotation.AnnotType);
                    if (annotation.AnnotType) {
                        var vertexPoints = null;
                        if (annotation.VertexPoints) {
                            vertexPoints = [];
                            for (var j = 0; j < annotation.VertexPoints.length; j++) {
                                var point = { x: annotation.VertexPoints[j].X, y: annotation.VertexPoints[j].Y };
                                vertexPoints.push(point);
                            }
                        }
                        // eslint-disable-next-line max-len
                        annotation.AnnotationSettings = annotation.AnnotationSettings ? annotation.AnnotationSettings : this.pdfViewer.annotationModule.updateSettings(this.pdfViewer.freeTextSettings);
                        var annot = void 0;
                        var paddingValue = 0.5;
                        var annotationBoundsX = !isNullOrUndefined(annotation.Bounds.X) ? annotation.Bounds.X - paddingValue : annotation.Bounds.x;
                        var annotationBoundsY = !isNullOrUndefined(annotation.Bounds.Y) ? annotation.Bounds.Y - paddingValue : annotation.Bounds.y;
                        var width = annotation.Bounds.Width ? annotation.Bounds.Width : annotation.Bounds.width;
                        var height = annotation.Bounds.Height ? annotation.Bounds.Height : annotation.Bounds.height;
                        var isAddedProgramatically = annotation.isAddAnnotationProgramatically ? annotation.isAddAnnotationProgramatically : false;
                        var rotateValue = this.getRotationValue(pageNumber, isAddedProgramatically);
                        var originalRotation = annotation.Rotate;
                        var pageRotate = annotation.PageRotation;
                        if (Math.sign(annotation.Rotate) === 1) {
                            annotation.Rotate = -annotation.Rotate + rotateValue;
                        }
                        else {
                            annotation.Rotate = annotation.Rotate + rotateValue;
                        }
                        // eslint-disable-next-line
                        var rotateAngle = Math.abs(annotation.Rotate);
                        if (isImportAction && rotateValue !== pageRotate) {
                            if (this.pdfViewerBase.isJsonImported) {
                                var pageDetails = this.pdfViewerBase.pageSize[pageNumber];
                                var boundsX = annotation.Bounds.X;
                                var boundsY = annotation.Bounds.Y;
                                var annotationWidth = width;
                                var annotationHeight = height;
                                if (pageRotate > 0) {
                                    var rotatation = pageRotate / 90;
                                    if (rotatation === 1) {
                                        height = width;
                                        width = annotation.Bounds.Height;
                                        annotationBoundsX = annotation.Bounds.Y;
                                        if (rotateValue !== 270) {
                                            annotationBoundsY = pageDetails.height - annotation.Bounds.X - annotation.Bounds.Width;
                                        }
                                        else {
                                            annotationBoundsY = pageDetails.width - annotation.Bounds.X - annotation.Bounds.Width;
                                        }
                                    }
                                    else if (rotatation === 2) {
                                        if (rotateValue !== 270 && rotateValue !== 90) {
                                            annotationBoundsX = pageDetails.width - annotation.Bounds.X - annotation.Bounds.Width;
                                            annotationBoundsY = pageDetails.height - annotation.Bounds.Y - annotation.Bounds.Height;
                                        }
                                        else {
                                            annotationBoundsX = pageDetails.height - annotation.Bounds.X - annotation.Bounds.Width;
                                            annotationBoundsY = pageDetails.width - annotation.Bounds.Y - annotation.Bounds.Height;
                                        }
                                    }
                                    else if (rotatation === 3) {
                                        height = width;
                                        width = annotation.Bounds.Height;
                                        if (rotateValue !== 90) {
                                            annotationBoundsX = pageDetails.width - annotation.Bounds.Y - width;
                                        }
                                        else {
                                            annotationBoundsX = pageDetails.height - annotation.Bounds.Y - width;
                                        }
                                        annotationBoundsY = annotation.Bounds.X;
                                    }
                                    boundsX = annotationBoundsX;
                                    boundsY = annotationBoundsY;
                                    annotationWidth = width;
                                    annotationHeight = height;
                                }
                                rotateAngle = (rotateValue / 90) % 4;
                                if (rotateAngle === 1) {
                                    height = width;
                                    width = annotationHeight;
                                    annotationBoundsX = pageDetails.width - boundsY - annotationHeight - paddingValue;
                                    annotationBoundsY = boundsX - paddingValue;
                                    rotateAngle = 90;
                                }
                                else if (rotateAngle === 2) {
                                    annotationBoundsX = pageDetails.width - boundsX - annotationWidth - paddingValue;
                                    annotationBoundsY = pageDetails.height - boundsY - annotationHeight - paddingValue;
                                    rotateAngle = 180;
                                }
                                else if (rotateAngle === 3) {
                                    height = width;
                                    width = annotationHeight;
                                    annotationBoundsX = boundsY - paddingValue;
                                    annotationBoundsY = pageDetails.height - boundsX - height - paddingValue;
                                    rotateAngle = 270;
                                }
                                else if (rotateAngle === 0) {
                                    annotationBoundsX = boundsX - paddingValue;
                                    annotationBoundsY = boundsY - paddingValue;
                                }
                            }
                        }
                        if (rotateAngle === 90 || rotateAngle === 270) {
                            var rotationHeight = height;
                            var rotationWidth = width;
                            height = rotationWidth;
                            width = rotationHeight;
                            annotationBoundsX = (annotationBoundsX - (width / 2)) + (height / 2);
                            annotationBoundsY = (annotationBoundsY) + (width / 2 - height / 2);
                        }
                        // eslint-disable-next-line
                        annotation.allowedInteractions = annotation.AllowedInteractions ? annotation.AllowedInteractions : this.pdfViewer.annotationModule.updateAnnotationAllowedInteractions(annotation);
                        // eslint-disable-next-line
                        annot = {
                            author: annotation.Author, modifiedDate: annotation.ModifiedDate, subject: annotation.Subject, id: 'freetext' + this.inputBoxCount,
                            rotateAngle: annotation.Rotate, dynamicText: annotation.MarkupText, strokeColor: annotation.StrokeColor,
                            thickness: annotation.Thickness, fillColor: annotation.FillColor,
                            bounds: {
                                x: annotationBoundsX, y: annotationBoundsY, left: annotationBoundsX, top: annotationBoundsY,
                                width: width, height: height, right: annotation.Bounds.Right,
                                bottom: annotation.Bounds.Bottom
                            }, annotName: annotation.AnnotName, shapeAnnotationType: 'FreeText',
                            // eslint-disable-next-line
                            pageIndex: pageNumber, opacity: annotation.Opacity, fontColor: annotation.FontColor, fontSize: annotation.FontSize, pageRotation: rotateValue,
                            fontFamily: annotation.FontFamily, notes: annotation.MarkupText, textAlign: annotation.TextAlign,
                            // eslint-disable-next-line
                            comments: this.pdfViewer.annotationModule.getAnnotationComments(annotation.Comments, annotation, annotation.Author),
                            review: { state: annotation.State, stateModel: annotation.StateModel, modifiedDate: annotation.ModifiedDate, author: annotation.Author },
                            // eslint-disable-next-line max-len
                            font: { isBold: annotation.Font.Bold, isItalic: annotation.Font.Italic, isStrikeout: annotation.Font.Strikeout, isUnderline: annotation.Font.Underline },
                            annotationSelectorSettings: this.getSettings(annotation), annotationSettings: annotation.AnnotationSettings,
                            // eslint-disable-next-line
                            customData: this.pdfViewer.annotation.getCustomData(annotation), annotationAddMode: annotation.annotationAddMode, allowedInteractions: annotation.allowedInteractions,
                            isPrint: annotation.IsPrint, isCommentLock: annotation.IsCommentLock, isReadonly: annotation.IsReadonly,
                            isAddAnnotationProgrammatically: isAddedProgramatically
                        };
                        if (isImportAction) {
                            annot.id = annotation.AnnotName;
                            annot.previousFontSize = annotation.FontSize ? annotation.FontSize : this.fontSize;
                        }
                        var addedAnnot = this.pdfViewer.add(annot);
                        this.pdfViewer.annotationModule.storeAnnotations(pageNumber, annot, '_annotations_freetext');
                        if (this.isAddAnnotationProgramatically) {
                            // eslint-disable-next-line
                            var settings = {
                                opacity: annot.opacity, borderColor: annot.strokeColor, borderWidth: annot.thickness, author: annotation.author, subject: annotation.subject, modifiedDate: annotation.modifiedDate,
                                // eslint-disable-next-line
                                fillColor: annot.fillColor, fontSize: annot.fontSize, width: annot.bounds.width, height: annot.bounds.height, fontColor: annot.fontColor, fontFamily: annot.fontFamily, defaultText: annot.dynamicText, fontStyle: annot.font, textAlignment: annot.textAlign
                            };
                            this.pdfViewer.fireAnnotationAdd(annot.pageIndex, annot.annotName, 'FreeText', annot.bounds, settings);
                        }
                        this.inputBoxCount += 1;
                        this.pdfViewer.annotation.freeTextAnnotationModule.isFreeTextValueChange = true;
                        this.pdfViewer.nodePropertyChange(addedAnnot, {});
                        this.pdfViewer.annotation.freeTextAnnotationModule.isFreeTextValueChange = false;
                    }
                }
            }
        }
    };
    /**
     * @param annotation
     * @private
     */
    // eslint-disable-next-line
    FreeTextAnnotation.prototype.getSettings = function (annotation) {
        var selector = this.pdfViewer.annotationSelectorSettings;
        if (annotation.AnnotationSelectorSettings) {
            selector = annotation.AnnotationSelectorSettings;
        }
        else if (this.pdfViewer.freeTextSettings.annotationSelectorSettings) {
            selector = this.pdfViewer.freeTextSettings.annotationSelectorSettings;
        }
        return selector;
    };
    /**
     * @param type
     * @private
     */
    FreeTextAnnotation.prototype.setAnnotationType = function (type) {
        this.pdfViewerBase.disableTextSelectionMode();
        this.pdfViewer.annotationModule.isFormFieldShape = false;
        switch (type) {
            case 'FreeText':
                this.currentAnnotationMode = 'FreeText';
                this.updateTextProperties();
                // eslint-disable-next-line max-len
                var modifiedDateRect = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
                this.pdfViewer.drawingObject = {
                    shapeAnnotationType: 'FreeText', strokeColor: this.borderColor,
                    fillColor: this.fillColor, opacity: this.opacity, notes: '', isCommentLock: false,
                    thickness: this.borderWidth, borderDashArray: '0', modifiedDate: modifiedDateRect,
                    // eslint-disable-next-line max-len
                    author: this.pdfViewer.freeTextSettings.author, subject: 'Text Box', font: { isBold: this.isBold, isItalic: this.isItalic, isStrikeout: this.isStrikethrough, isUnderline: this.isUnderline }, textAlign: this.textAlign
                };
                this.pdfViewer.tool = 'Select';
                break;
        }
    };
    /**
     * @param property
     * @param pageNumber
     * @param annotationBase
     * @param isNewAdded
     * @param property
     * @param pageNumber
     * @param annotationBase
     * @param isNewAdded
     * @param property
     * @param pageNumber
     * @param annotationBase
     * @param isNewAdded
     * @param property
     * @param pageNumber
     * @param annotationBase
     * @param isNewAdded
     * @private
     */
    // eslint-disable-next-line
    FreeTextAnnotation.prototype.modifyInCollection = function (property, pageNumber, annotationBase, isNewAdded) {
        if (!isNullOrUndefined(annotationBase.formFieldAnnotationType) && annotationBase.formFieldAnnotationType !== "") {
            this.pdfViewer.annotationModule.isFormFieldShape = true;
        }
        else {
            this.pdfViewer.annotationModule.isFormFieldShape = false;
        }
        if (!isNewAdded) {
            this.pdfViewerBase.updateDocumentEditedProperty(true);
        }
        var currentAnnotObject = null;
        var pageAnnotations = this.getAnnotations(pageNumber, null);
        if (pageAnnotations != null && annotationBase) {
            for (var i = 0; i < pageAnnotations.length; i++) {
                if (annotationBase.id === pageAnnotations[i].id) {
                    if (property === 'bounds') {
                        // eslint-disable-next-line max-len
                        pageAnnotations[i].bounds = { left: annotationBase.bounds.x, top: annotationBase.bounds.y, width: annotationBase.bounds.width, height: annotationBase.bounds.height, right: annotationBase.bounds.right, bottom: annotationBase.bounds.bottom };
                    }
                    else if (property === 'fill') {
                        pageAnnotations[i].fillColor = annotationBase.wrapper.children[0].style.fill;
                    }
                    else if (property === 'stroke') {
                        pageAnnotations[i].strokeColor = annotationBase.wrapper.children[0].style.strokeColor;
                    }
                    else if (property === 'opacity') {
                        pageAnnotations[i].opacity = annotationBase.wrapper.children[0].style.opacity;
                    }
                    else if (property === 'thickness') {
                        pageAnnotations[i].thickness = annotationBase.wrapper.children[0].style.strokeWidth;
                    }
                    else if (property === 'notes') {
                        pageAnnotations[i].note = annotationBase.notes;
                    }
                    else if (property === 'delete') {
                        currentAnnotObject = pageAnnotations.splice(i, 1)[0];
                        break;
                    }
                    else if (property === 'dynamicText') {
                        if (pageAnnotations[i].dynamicText !== annotationBase.dynamicText) {
                            this.pdfViewer.fireCommentEdit(pageAnnotations[i].annotName, annotationBase.dynamicText, pageAnnotations[i]);
                        }
                        pageAnnotations[i].dynamicText = annotationBase.dynamicText;
                    }
                    else if (property === 'fontColor') {
                        pageAnnotations[i].fontColor = annotationBase.fontColor;
                    }
                    else if (property === 'fontSize') {
                        pageAnnotations[i].fontSize = annotationBase.fontSize;
                    }
                    else if (property === 'fontFamily') {
                        pageAnnotations[i].fontFamily = annotationBase.fontFamily;
                    }
                    else if (property === 'textPropertiesChange') {
                        // eslint-disable-next-line max-len
                        pageAnnotations[i].font = { isBold: annotationBase.font.isBold, isItalic: annotationBase.font.isItalic, isStrikeout: annotationBase.font.isStrikeout, isUnderline: annotationBase.font.isUnderline };
                    }
                    else if (property === 'textAlign') {
                        pageAnnotations[i].textAlign = annotationBase.textAlign;
                    }
                    // eslint-disable-next-line max-len
                    pageAnnotations[i].modifiedDate = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
                    this.pdfViewer.annotationModule.storeAnnotationCollections(pageAnnotations[i], pageNumber);
                }
            }
            this.manageAnnotations(pageAnnotations, pageNumber);
        }
        return currentAnnotObject;
    };
    /**
     * @param pageNumber
     * @param annotationBase
     * @private
     */
    FreeTextAnnotation.prototype.addInCollection = function (pageNumber, annotationBase) {
        if (annotationBase) {
            var pageAnnotations = this.getAnnotations(pageNumber, null);
            if (pageAnnotations) {
                pageAnnotations.push(annotationBase);
            }
            this.manageAnnotations(pageAnnotations, pageNumber);
        }
    };
    /**
     * @private
     */
    FreeTextAnnotation.prototype.saveFreeTextAnnotations = function () {
        // eslint-disable-next-line
        var storeObject = window.sessionStorage.getItem(this.pdfViewerBase.documentId + '_annotations_freetext');
        if (this.pdfViewerBase.isStorageExceed) {
            storeObject = this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_freetext'];
        }
        // eslint-disable-next-line
        var annotations = new Array();
        for (var j = 0; j < this.pdfViewerBase.pageCount; j++) {
            annotations[j] = [];
        }
        if (storeObject && !this.pdfViewer.annotationSettings.skipDownload) {
            var annotationCollection = JSON.parse(storeObject);
            for (var i = 0; i < annotationCollection.length; i++) {
                var newArray = [];
                var pageAnnotationObject = annotationCollection[i];
                if (pageAnnotationObject) {
                    for (var z = 0; pageAnnotationObject.annotations.length > z; z++) {
                        this.pdfViewer.annotationModule.updateModifiedDate(pageAnnotationObject.annotations[z]);
                        // eslint-disable-next-line max-len
                        pageAnnotationObject.annotations[z].bounds = this.getBoundsBasedOnRotation(pageAnnotationObject.annotations[z].bounds, pageAnnotationObject.annotations[z].rotateAngle, pageAnnotationObject.pageIndex, pageAnnotationObject.annotations[z]);
                        // eslint-disable-next-line max-len
                        pageAnnotationObject.annotations[z].bounds = JSON.stringify(this.pdfViewer.annotation.getBounds(pageAnnotationObject.annotations[z].bounds, pageAnnotationObject.pageIndex));
                        var strokeColorString = pageAnnotationObject.annotations[z].strokeColor;
                        pageAnnotationObject.annotations[z].strokeColor = JSON.stringify(this.getRgbCode(strokeColorString));
                        var fillColorString = pageAnnotationObject.annotations[z].fillColor;
                        pageAnnotationObject.annotations[z].fillColor = JSON.stringify(this.getRgbCode(fillColorString));
                        var fontColorString = pageAnnotationObject.annotations[z].fontColor;
                        pageAnnotationObject.annotations[z].fontColor = JSON.stringify(this.getRgbCode(fontColorString));
                        // eslint-disable-next-line max-len
                        pageAnnotationObject.annotations[z].vertexPoints = JSON.stringify(pageAnnotationObject.annotations[z].vertexPoints);
                        if (pageAnnotationObject.annotations[z].rectangleDifference !== null) {
                            // eslint-disable-next-line max-len
                            pageAnnotationObject.annotations[z].rectangleDifference = JSON.stringify(pageAnnotationObject.annotations[z].rectangleDifference);
                        }
                        pageAnnotationObject.annotations[z].padding = this.getPaddingValues(this.fontSize);
                    }
                    newArray = pageAnnotationObject.annotations;
                }
                annotations[pageAnnotationObject.pageIndex] = newArray;
            }
        }
        return JSON.stringify(annotations);
    };
    // eslint-disable-next-line
    FreeTextAnnotation.prototype.getRotationValue = function (pageIndex, isAddedProgrammatically) {
        // eslint-disable-next-line
        var pageDetails = this.pdfViewerBase.pageSize[pageIndex];
        if (!isNullOrUndefined(isAddedProgrammatically) && isAddedProgrammatically) {
            return 0;
        }
        else {
            if (pageDetails.rotation === 0) {
                return 0;
            }
            else if (pageDetails.rotation === 1) {
                return 90;
            }
            else if (pageDetails.rotation === 2) {
                return 180;
            }
            else if (pageDetails.rotation === 3) {
                return 270;
            }
            return 0;
        }
    };
    FreeTextAnnotation.prototype.getBoundsBasedOnRotation = function (bounds, rotateAngle, pageIndex, annotation, isAddedProgrammatically) {
        var rotateValue = this.getRotationValue(pageIndex, isAddedProgrammatically);
        var paddingValue = 0.5;
        annotation.rotateAngle = rotateAngle - rotateValue;
        annotation.pageRotation = rotateValue;
        if (rotateAngle === 90 || rotateAngle === -90 || rotateAngle === 270 || rotateAngle === -270) {
            var x = bounds.left + (bounds.width / 2) - (bounds.height / 2);
            var y = bounds.top - (bounds.width / 2 - bounds.height / 2);
            return { x: x + paddingValue, y: y + paddingValue, left: x + paddingValue, top: y + paddingValue, width: bounds.height, height: bounds.width };
        }
        else {
            return { x: bounds.left + paddingValue, y: bounds.top + paddingValue, left: bounds.left + paddingValue, top: bounds.top + paddingValue, width: bounds.width, height: bounds.height };
        }
    };
    FreeTextAnnotation.prototype.manageAnnotations = function (pageAnnotations, pageNumber) {
        // eslint-disable-next-line
        var storeObject = window.sessionStorage.getItem(this.pdfViewerBase.documentId + '_annotations_freetext');
        if (this.pdfViewerBase.isStorageExceed) {
            storeObject = this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_freetext'];
        }
        if (storeObject) {
            var annotObject = JSON.parse(storeObject);
            if (!this.pdfViewerBase.isStorageExceed) {
                window.sessionStorage.removeItem(this.pdfViewerBase.documentId + '_annotations_freetext');
            }
            var index = this.pdfViewer.annotationModule.getPageCollection(annotObject, pageNumber);
            if (annotObject[index]) {
                annotObject[index].annotations = pageAnnotations;
            }
            var annotationStringified = JSON.stringify(annotObject);
            if (this.pdfViewerBase.isStorageExceed) {
                this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_freetext'] = annotationStringified;
            }
            else {
                window.sessionStorage.setItem(this.pdfViewerBase.documentId + '_annotations_freetext', annotationStringified);
            }
        }
    };
    // eslint-disable-next-line
    FreeTextAnnotation.prototype.getAnnotations = function (pageIndex, shapeAnnotations) {
        // eslint-disable-next-line
        var annotationCollection;
        // eslint-disable-next-line
        var storeObject = window.sessionStorage.getItem(this.pdfViewerBase.documentId + '_annotations_freetext');
        if (this.pdfViewerBase.isStorageExceed) {
            storeObject = this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_freetext'];
        }
        if (storeObject) {
            var annotObject = JSON.parse(storeObject);
            var index = this.pdfViewer.annotationModule.getPageCollection(annotObject, pageIndex);
            if (annotObject[index]) {
                annotationCollection = annotObject[index].annotations;
            }
            else {
                annotationCollection = shapeAnnotations;
            }
        }
        else {
            annotationCollection = shapeAnnotations;
        }
        return annotationCollection;
    };
    // eslint-disable-next-line
    FreeTextAnnotation.prototype.getRgbCode = function (colorString) {
        if (!colorString.match(/#([a-z0-9]+)/gi) && !colorString.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/)) {
            colorString = this.pdfViewer.annotationModule.nameToHash(colorString);
        }
        var stringArray = colorString.split(',');
        if (isNullOrUndefined(stringArray[1])) {
            colorString = this.pdfViewer.annotationModule.getValue(colorString, 'rgba');
            stringArray = colorString.split(',');
        }
        // eslint-disable-next-line radix
        var r = parseFloat(stringArray[0].split('(')[1]);
        // eslint-disable-next-line radix
        var g = parseFloat(stringArray[1]);
        // eslint-disable-next-line radix
        var b = parseFloat(stringArray[2]);
        // eslint-disable-next-line radix
        var a = parseFloat(stringArray[3]);
        return { r: r, g: g, b: b, a: a };
    };
    /**
     * @private
     */
    // eslint-disable-next-line
    FreeTextAnnotation.prototype.onFocusOutInputBox = function () {
        var allowServerDataBind = this.pdfViewer.allowServerDataBinding;
        this.pdfViewer.enableServerDataBinding(false);
        if (!this.pdfViewerBase.isFreeTextContextMenu) {
            this.pdfViewer.fireBeforeAddFreeTextAnnotation(this.inputBoxElement.value);
            // eslint-disable-next-line
            var pageIndex = this.inputBoxElement.id && this.inputBoxElement.id.split("_freeText_")[1] && this.inputBoxElement.id.split("_freeText_")[1].split("_")[0] ? parseFloat(this.inputBoxElement.id.split("_freeText_")[1].split("_")[0]) : this.pdfViewerBase.currentPageNumber - 1;
            var pageDiv = this.pdfViewerBase.getElement('_pageDiv_' + (pageIndex));
            var width = parseFloat(this.inputBoxElement.style.width);
            var padding = parseFloat(this.inputBoxElement.style.paddingLeft);
            if (this.pdfViewer.freeTextSettings.enableAutoFit && !this.isMaximumWidthReached && !this.isNewFreeTextAnnot) {
                var fontsize = parseFloat(this.inputBoxElement.style.fontSize);
                this.inputBoxElement.style.width = ((width + padding) - fontsize) + 'px';
            }
            if (this.pdfViewer.freeTextSettings.enableAutoFit && !this.isMaximumWidthReached && this.isNewFreeTextAnnot) {
                width = parseFloat(this.inputBoxElement.style.width);
                var characterLength = 8;
                this.inputBoxElement.style.width = (width - characterLength) + 'px';
            }
            var inputEleHeight = parseFloat(this.inputBoxElement.style.height);
            var inputEleWidth = parseFloat(this.inputBoxElement.style.width);
            var inputEleLeft = parseFloat(this.inputBoxElement.style.left);
            if (this.pdfViewerBase.isMixedSizeDocument) {
                var canvas = document.getElementById(this.pdfViewer.element.id + '_annotationCanvas_' + pageIndex);
                inputEleLeft = inputEleLeft - canvas.offsetLeft;
            }
            var inputEleTop = parseFloat(this.inputBoxElement.style.top);
            var zoomFactor = this.pdfViewerBase.getZoomFactor();
            if (this.pdfViewer.isValidFreeText) {
                this.inputBoxElement.value = 'Type Here';
                this.pdfViewer.isValidFreeText = false;
            }
            var inputValue = this.inputBoxElement.value;
            var isNewlyAdded = false;
            if (this.isNewFreeTextAnnot === true) {
                // eslint-disable-next-line max-len
                var currentDateString = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
                var annotationName = this.pdfViewer.annotation.createGUID();
                this.isNewFreeTextAnnot = false;
                isNewlyAdded = true;
                var annot = void 0;
                var commentsDivid = this.pdfViewer.annotation.stickyNotesAnnotationModule.addComments('freeText', pageIndex + 1);
                if (commentsDivid) {
                    document.getElementById(commentsDivid).id = annotationName;
                }
                // eslint-disable-next-line
                var annotationSelectorSettings = this.pdfViewer.freeTextSettings.annotationSelectorSettings ? this.pdfViewer.freeTextSettings.annotationSelectorSettings : this.pdfViewer.annotationSelectorSettings;
                // eslint-disable-next-line
                var annotationSettings = this.pdfViewer.annotationModule.updateSettings(this.pdfViewer.freeTextSettings);
                // eslint-disable-next-line
                this.author = this.author ? this.author : this.pdfViewer.freeTextSettings.author ? this.pdfViewer.freeTextSettings.author : 'Guest';
                // eslint-disable-next-line
                var allowedInteractions = this.pdfViewer.freeTextSettings.allowedInteractions ? this.pdfViewer.freeTextSettings.allowedInteractions : this.pdfViewer.annotationSettings.allowedInteractions;
                // eslint-disable-next-line
                annot = {
                    author: this.author, modifiedDate: currentDateString, subject: 'Text Box', id: 'free_text' + this.inputBoxCount,
                    // eslint-disable-next-line max-len
                    rotateAngle: 0, dynamicText: inputValue, strokeColor: this.borderColor, thickness: this.borderWidth, fillColor: this.fillColor,
                    bounds: {
                        left: inputEleLeft / zoomFactor, top: inputEleTop / zoomFactor, x: inputEleLeft / zoomFactor,
                        y: inputEleTop / zoomFactor, width: inputEleWidth / zoomFactor, height: inputEleHeight / zoomFactor
                    }, annotName: annotationName,
                    shapeAnnotationType: 'FreeText', pageIndex: pageIndex, fontColor: this.fontColor, fontSize: this.fontSize,
                    fontFamily: this.fontFamily, opacity: this.opacity, comments: [], textAlign: this.textAlign,
                    // eslint-disable-next-line max-len
                    font: { isBold: this.isBold, isItalic: this.isItalic, isStrikeout: this.isStrikethrough, isUnderline: this.isUnderline },
                    review: { state: 'Unmarked', stateModel: 'None', modifiedDate: currentDateString, author: this.author },
                    // eslint-disable-next-line max-len
                    annotationSelectorSettings: annotationSelectorSettings, annotationSettings: annotationSettings,
                    customData: this.pdfViewer.annotationModule.getData('FreeText'), isPrint: (this.pdfViewer.freeTextSettings && !isNullOrUndefined(this.pdfViewer.freeTextSettings.isPrint)) ? this.pdfViewer.freeTextSettings.isPrint : true,
                    allowedInteractions: allowedInteractions, isReadonly: this.isReadonly
                };
                if (this.pdfViewer.enableRtl) {
                    annot.textAlign = 'Right';
                }
                var annotation = this.pdfViewer.add(annot);
                // eslint-disable-next-line
                var bounds = { left: annot.bounds.x, top: annot.bounds.y, width: annot.bounds.width, height: annot.bounds.height };
                // eslint-disable-next-line
                var settings = {
                    opacity: annot.opacity, borderColor: annot.strokeColor, borderWidth: annot.thickness, author: annotation.author, subject: annotation.subject, modifiedDate: annotation.modifiedDate,
                    // eslint-disable-next-line
                    fillColor: annot.fillColor, fontSize: annot.fontSize, width: annot.bounds.width, height: annot.bounds.height, fontColor: annot.fontColor, fontFamily: annot.fontFamily, defaultText: annot.dynamicText, fontStyle: annot.font, textAlignment: annot.textAlign
                };
                this.pdfViewer.annotation.storeAnnotations(pageIndex, annot, '_annotations_freetext');
                this.pdfViewer.fireAnnotationAdd(annot.pageIndex, annot.annotName, 'FreeText', bounds, settings);
                this.pdfViewer.fireCommentAdd(annot.annotName, annot.dynamicText, annot);
                // eslint-disable-next-line
                this.pdfViewer.annotation.addAction(pageIndex, null, annot, 'Addition', '', annot, annot);
                this.pdfViewer.renderSelector(annot.pageIndex);
                this.pdfViewer.clearSelection(annot.pageIndex);
                this.pdfViewerBase.updateDocumentEditedProperty(true);
                this.selectedAnnotation = annotation;
            }
            this.isInuptBoxInFocus = false;
            // eslint-disable-next-line
            if (this.selectedAnnotation && this.pdfViewer.selectedItems.annotations) {
                inputEleWidth = (inputEleWidth / zoomFactor);
                inputEleHeight = (inputEleHeight / zoomFactor);
                var heightDiff = (inputEleHeight - this.selectedAnnotation.bounds.height);
                var y = undefined;
                if (heightDiff > 0) {
                    y = this.selectedAnnotation.wrapper.offsetY + (heightDiff / 2);
                    y = y > 0 ? y : undefined;
                }
                var widthDiff = (inputEleWidth - this.selectedAnnotation.bounds.width);
                var x = undefined;
                if (widthDiff > 0) {
                    x = this.selectedAnnotation.wrapper.offsetX + (widthDiff / 2);
                    x = x > 0 ? x : undefined;
                }
                else {
                    widthDiff = Math.abs(widthDiff);
                    x = this.selectedAnnotation.wrapper.offsetX - (widthDiff / 2);
                }
                this.selectedAnnotation.bounds.width = inputEleWidth;
                this.selectedAnnotation.bounds.height = inputEleHeight;
                var lineSpace = 0;
                lineSpace = ((parseFloat(this.inputBoxElement.style.fontSize) / zoomFactor) / (this.defaultFontSize / 2));
                this.selectedAnnotation.wrapper.children[1].margin.left = this.freeTextPaddingLeft;
                this.selectedAnnotation.wrapper.children[1].margin.top = ((parseFloat(this.inputBoxElement.style.paddingTop) / zoomFactor)) + lineSpace;
                this.pdfViewer.annotation.modifyDynamicTextValue(inputValue, this.selectedAnnotation.annotName);
                this.selectedAnnotation.dynamicText = inputValue;
                this.modifyInCollection('dynamicText', pageIndex, this.selectedAnnotation, isNewlyAdded);
                this.modifyInCollection('bounds', pageIndex, this.selectedAnnotation, isNewlyAdded);
                // eslint-disable-next-line
                this.pdfViewer.nodePropertyChange(this.selectedAnnotation, { bounds: { width: this.selectedAnnotation.bounds.width, height: this.selectedAnnotation.bounds.height, y: y, x: x } });
                // eslint-disable-next-line
                var commentsDiv = document.getElementById(this.selectedAnnotation.annotName);
                if (commentsDiv && commentsDiv.childNodes) {
                    if (commentsDiv.childNodes[0].ej2_instances) {
                        commentsDiv.childNodes[0].ej2_instances[0].value = inputValue;
                    }
                    else if (commentsDiv.childNodes[0].childNodes && commentsDiv.childNodes[0].childNodes[1].ej2_instances) {
                        commentsDiv.childNodes[0].childNodes[1].ej2_instances[0].value = inputValue;
                    }
                }
                this.pdfViewer.renderSelector(this.selectedAnnotation.pageIndex, this.selectedAnnotation.annotationSelectorSettings);
            }
            if (this.inputBoxElement.parentElement) {
                if (pageDiv && (pageDiv.id === this.inputBoxElement.parentElement.id)) {
                    pageDiv.removeChild(this.inputBoxElement);
                }
                else {
                    this.inputBoxElement.parentElement.removeChild(this.inputBoxElement);
                }
            }
            var canvass = document.getElementById(this.pdfViewer.element.id + '_annotationCanvas_' + pageIndex);
            // eslint-disable-next-line
            this.pdfViewer.renderDrawing(canvass, pageIndex);
            this.inputBoxCount += 1;
        }
        else {
            this.inputBoxElement.focus();
            if (!this.isTextSelected) {
                window.getSelection().removeAllRanges();
            }
        }
        this.pdfViewer.enableServerDataBinding(allowServerDataBind, true);
    };
    /**
     * @param event
     * @private
     */
    FreeTextAnnotation.prototype.onKeyDownInputBox = function (event) {
        var inuptEleObj = this;
        if (event.which === 9 || (isNullOrUndefined(this.pdfViewer.selectedItems.annotations[0]) && !this.isNewFreeTextAnnot)) {
            event.preventDefault();
        }
        this.selectedAnnotation = this.pdfViewer.selectedItems.annotations && this.isNewFreeTextAnnot ? this.pdfViewer.selectedItems.annotations[0]
            : this.selectedAnnotation;
        setTimeout(function () {
            if (inuptEleObj.defaultHeight < inuptEleObj.inputBoxElement.scrollHeight
                // eslint-disable-next-line radix
                && parseInt(inuptEleObj.inputBoxElement.style.height) < inuptEleObj.inputBoxElement.scrollHeight) {
                inuptEleObj.updateFreeTextAnnotationSize(true);
            }
            else {
                inuptEleObj.updateFreeTextAnnotationSize(false);
            }
            // eslint-disable-next-line
        }, 0);
    };
    FreeTextAnnotation.prototype.updateFreeTextAnnotationSize = function (isSize) {
        var inuptEleObj = this;
        var enableAutoFit = inuptEleObj.pdfViewer.freeTextSettings.enableAutoFit;
        if (enableAutoFit) {
            this.autoFitFreeText();
        }
        else {
            this.isMaximumWidthReached = true;
        }
        if (this.isMaximumWidthReached) {
            // eslint-disable-next-line max-len
            var previousHeight = inuptEleObj.inputBoxElement.getBoundingClientRect().height;
            if (!isSize && !inuptEleObj.inputBoxElement.readOnly) {
                inuptEleObj.inputBoxElement.style.height = 'auto';
            }
            var currentHeight = inuptEleObj.inputBoxElement.getBoundingClientRect().height;
            var difference = currentHeight - previousHeight;
            var fontSize = parseFloat(inuptEleObj.inputBoxElement.style.fontSize);
            // eslint-disable-next-line max-len
            inuptEleObj.inputBoxElement.style.height = inuptEleObj.inputBoxElement.readOnly ? inuptEleObj.inputBoxElement.style.height : inuptEleObj.inputBoxElement.scrollHeight + (fontSize / 2) + 'px';
            inuptEleObj.inputBoxElement.style.height = (difference < 0 && !inuptEleObj.inputBoxElement.readOnly) ? (previousHeight + 'px') : inuptEleObj.inputBoxElement.style.height;
        }
        var zoomFactor = inuptEleObj.pdfViewerBase.getZoomFactor();
        var inputEleHeight = parseFloat(this.inputBoxElement.style.height);
        var inputEleWidth = parseFloat(this.inputBoxElement.style.width);
        inputEleHeight = ((inputEleHeight) / zoomFactor);
        inputEleWidth = ((inputEleWidth) / zoomFactor);
        if (this.selectedAnnotation) {
            var heightDiff = (inputEleHeight - inuptEleObj.selectedAnnotation.bounds.height);
            var y = 0;
            if (heightDiff > 0) {
                y = inuptEleObj.selectedAnnotation.wrapper.offsetY + (heightDiff / 2);
            }
            else {
                heightDiff = Math.abs(heightDiff);
                y = inuptEleObj.selectedAnnotation.wrapper.offsetY - (heightDiff / 2);
            }
            if (enableAutoFit) {
                var widthDiff = (inputEleWidth - inuptEleObj.selectedAnnotation.bounds.width);
                var x = 0;
                if (widthDiff > 0) {
                    x = inuptEleObj.selectedAnnotation.wrapper.offsetX + (widthDiff / 2);
                }
                else {
                    widthDiff = Math.abs(widthDiff);
                    x = inuptEleObj.selectedAnnotation.wrapper.offsetX - (widthDiff / 2);
                }
            }
            inuptEleObj.selectedAnnotation.bounds.width = inputEleWidth;
            inuptEleObj.selectedAnnotation.bounds.height = inputEleHeight;
            if (enableAutoFit) {
                // eslint-disable-next-line
                inuptEleObj.pdfViewer.nodePropertyChange(inuptEleObj.selectedAnnotation, { bounds: { width: inuptEleObj.selectedAnnotation.bounds.width, height: inuptEleObj.selectedAnnotation.bounds.height, y: y, x: x } });
            }
            else {
                // eslint-disable-next-line
                inuptEleObj.pdfViewer.nodePropertyChange(inuptEleObj.selectedAnnotation, { bounds: { width: inuptEleObj.selectedAnnotation.bounds.width, height: inuptEleObj.selectedAnnotation.bounds.height, y: y } });
            }
            inuptEleObj.pdfViewer.renderSelector(inuptEleObj.selectedAnnotation.pageIndex, this.selectedAnnotation.annotationSelectorSettings);
        }
    };
    /**
     * @param event
     * @private
     */
    FreeTextAnnotation.prototype.autoFitFreeText = function (xPosition, yPosition) {
        var pageIndex = this.pdfViewerBase.currentPageNumber - 1;
        var pageDiv = this.pdfViewerBase.getElement('_pageDiv_' + (pageIndex));
        // eslint-disable-next-line
        var canvas = this.pdfViewerBase.getElement('_annotationCanvas_' + pageIndex);
        // eslint-disable-next-line
        var context = canvas.getContext("2d");
        // eslint-disable-next-line
        var fontSize = this.inputBoxElement.style.fontSize;
        if (this.pdfViewer.freeTextSettings.fontStyle === FontStyle.Bold || this.inputBoxElement.style.fontWeight === 'bold') {
            context.font = 'bold' + ' ' + fontSize + ' ' + this.inputBoxElement.style.fontFamily;
        }
        else {
            context.font = fontSize + ' ' + this.inputBoxElement.style.fontFamily;
        }
        var highestTextNode = "";
        // eslint-disable-next-line
        var textNodes = [];
        var textboxValue = this.inputBoxElement.value;
        if (textboxValue.indexOf('\n') > -1) {
            textNodes = textboxValue.split('\n');
            for (var j = 0; j < textNodes.length; j++) {
                // eslint-disable-next-line
                var textNodeData = context.measureText(textNodes[j]);
                // eslint-disable-next-line
                var highestTextNodeData = context.measureText(highestTextNode);
                if (textNodeData.width > highestTextNodeData.width) {
                    highestTextNode = textNodes[j];
                }
            }
            this.isMaximumWidthReached = true;
        }
        else {
            highestTextNode = textboxValue;
            this.isMaximumWidthReached = false;
        }
        // eslint-disable-next-line
        var textwidth = context.measureText(highestTextNode);
        fontSize = parseFloat(this.inputBoxElement.style.fontSize);
        var inputEleWidth;
        var characterLength = 8;
        var inputEleHeight = (fontSize + (fontSize / 2));
        if (this.isNewFreeTextAnnot) {
            inputEleWidth = Math.ceil(textwidth.width + ((characterLength + 1) * 2));
            this.inputBoxElement.style.height = inputEleHeight + 'px';
            this.inputBoxElement.style.top = (yPosition) - (inputEleHeight / 2) + 'px';
        }
        else {
            inputEleWidth = Math.ceil(textwidth.width) + fontSize + Math.ceil(characterLength / 2);
        }
        if (!xPosition) {
            this.inputBoxElement.style.height = inputEleHeight + 'px';
        }
        this.inputBoxElement.style.width = inputEleWidth + 'px';
        var maxWidth = this.pdfViewerBase.getPageWidth(pageIndex) - parseFloat(this.inputBoxElement.style.left);
        if (parseFloat(this.inputBoxElement.style.width) > maxWidth) {
            this.isMaximumWidthReached = true;
            if (this.isNewAddedAnnot && xPosition) {
                inputEleWidth = inputEleWidth - characterLength;
                this.inputBoxElement.style.width = inputEleWidth + 'px';
                var width = xPosition + (inputEleWidth * this.pdfViewerBase.getZoomFactor());
                var x = parseFloat(this.inputBoxElement.style.left);
                if (width >= this.pdfViewerBase.getPageWidth(pageIndex)) {
                    x = this.pdfViewerBase.getPageWidth(pageIndex) - inputEleWidth;
                }
                this.inputBoxElement.style.left = x + 'px';
            }
            else {
                this.inputBoxElement.style.width = maxWidth + 'px';
            }
        }
    };
    /**
     * @param event
     * @private
     */
    FreeTextAnnotation.prototype.onMouseUpInputBox = function (event) {
        // eslint-disable-next-line
        var target = event.target;
        this.selectionStart = 0;
        this.selectionEnd = 0;
        if (event.which === 3 && target) {
            this.selectionStart = target.selectionStart;
            this.selectionEnd = target.selectionEnd;
        }
        if (event.which === 3 && window.getSelection() != null && window.getSelection().toString() !== '') {
            this.isTextSelected = true;
        }
        else {
            this.isTextSelected = false;
        }
    };
    /**
     * @param currentPosition
     * @param annotation
     * @param pageIndex
     * @private
     */
    FreeTextAnnotation.prototype.addInuptElemet = function (currentPosition, annotation, pageIndex) {
        if (annotation === void 0) { annotation = null; }
        this.currentPosition = [];
        if (isNullOrUndefined(pageIndex)) {
            pageIndex = this.pdfViewerBase.currentPageNumber - 1;
        }
        if (annotation) {
            pageIndex = annotation.pageIndex;
        }
        if (isBlazor() && annotation === null && this.pdfViewer.selectedItems.annotations.length === 0) {
            this.updateTextProperties();
        }
        this.inputBoxElement.id = this.pdfViewer.element.id + '_freeText_' + pageIndex + '_' + this.inputBoxCount;
        var pageDiv = this.pdfViewerBase.getElement('_pageDiv_' + (pageIndex));
        var canvass = document.getElementById(this.pdfViewer.element.id + '_annotationCanvas_' + pageIndex);
        var zoomFactor = this.pdfViewerBase.getZoomFactor();
        this.inputBoxElement.value = (annotation && annotation.dynamicText) ? annotation.dynamicText : this.defaultText;
        this.inputBoxElement.style.boxSizing = 'border-box';
        this.inputBoxElement.style.left = ((currentPosition.x)) + 'px';
        this.inputBoxElement.style.top = ((currentPosition.y)) - ((this.defaultHeight * zoomFactor) / 2) + 'px';
        if (this.pdfViewer.freeTextSettings.enableAutoFit) {
            this.inputBoxElement.style.wordBreak = 'break-all';
        }
        else {
            this.inputBoxElement.style.wordBreak = 'break-word';
        }
        if (annotation) {
            this.applyFreetextStyles(zoomFactor, annotation.isReadonly);
        }
        else {
            this.applyFreetextStyles(zoomFactor);
        }
        if (this.isBold) {
            this.inputBoxElement.style.fontWeight = 'bold';
        }
        else {
            this.inputBoxElement.style.fontWeight = 'normal';
        }
        if (this.isItalic) {
            this.inputBoxElement.style.fontStyle = 'italic';
        }
        else {
            this.inputBoxElement.style.fontStyle = 'normal';
        }
        this.inputBoxElement.style.textDecoration = 'none';
        if (this.isUnderline) {
            this.inputBoxElement.style.textDecoration = 'underline';
        }
        if (this.isStrikethrough) {
            this.inputBoxElement.style.textDecoration = 'line-through';
        }
        if (this.pdfViewer.enableRtl) {
            this.inputBoxElement.style.textAlign = 'right';
            this.inputBoxElement.style.direction = 'rtl';
            this.inputBoxElement.style.left = ((currentPosition.x)) - ((this.defautWidth * zoomFactor / 2));
        }
        else {
            this.inputBoxElement.style.textAlign = this.textAlign.toLowerCase();
        }
        this.inputBoxElement.style.borderColor = this.borderColor;
        this.inputBoxElement.style.color = this.fontColor;
        this.inputBoxElement.style.background = this.fillColor;
        if (annotation && annotation.wrapper && annotation.wrapper.children[0]) {
            this.inputBoxElement.style.opacity = annotation.wrapper.children[0].style.opacity;
        }
        if (this.isNewFreeTextAnnot === true) {
            this.pdfViewer.clearSelection(pageIndex);
        }
        if (annotation && annotation.wrapper && annotation.wrapper.bounds) {
            var annotationBounds = annotation.wrapper.bounds;
            if (annotationBounds.left) {
                this.inputBoxElement.style.left = ((annotationBounds.left) * zoomFactor) + 'px';
            }
            if (annotationBounds.top) {
                this.inputBoxElement.style.top = ((annotationBounds.top) * zoomFactor) + 'px';
            }
            // eslint-disable-next-line max-len
            this.inputBoxElement.style.height = annotationBounds.height ? (annotationBounds.height * zoomFactor) + 'px' : (this.defaultHeight * zoomFactor) + 'px';
            // eslint-disable-next-line max-len
            this.inputBoxElement.style.width = annotationBounds.width ? (annotationBounds.width * zoomFactor) + 'px' : (this.defautWidth * zoomFactor) + 'px';
            this.selectedAnnotation = annotation;
            this.previousText = this.selectedAnnotation.dynamicText;
            this.selectedAnnotation.dynamicText = '';
            this.inputBoxElement.style.borderColor = this.selectedAnnotation.strokeColor;
            this.inputBoxElement.style.color = this.selectedAnnotation.fontColor;
            this.inputBoxElement.style.background = this.selectedAnnotation.fillColor;
            if (this.selectedAnnotation.font.isBold === true) {
                this.inputBoxElement.style.fontWeight = 'bold';
            }
            if (this.selectedAnnotation.font.isItalic === true) {
                this.inputBoxElement.style.fontStyle = 'italic';
            }
            if (this.selectedAnnotation.font.isUnderline === true) {
                this.inputBoxElement.style.textDecoration = 'underline';
            }
            if (this.selectedAnnotation.font.isStrikeout === true) {
                this.inputBoxElement.style.textDecoration = 'line-through';
            }
            if (this.pdfViewer.enableRtl) {
                this.inputBoxElement.style.textAlign = 'right';
                this.inputBoxElement.style.direction = 'rtl';
            }
            else if (this.selectedAnnotation.textAlign) {
                this.inputBoxElement.style.textAlign = this.selectedAnnotation.textAlign;
            }
            this.inputBoxElement.style.fontSize = (this.selectedAnnotation.fontSize * zoomFactor) + 'px';
            this.inputBoxElement.style.fontFamily = this.selectedAnnotation.fontFamily;
            this.pdfViewer.nodePropertyChange(this.selectedAnnotation, {});
        }
        if (this.pdfViewerBase.isMixedSizeDocument) {
            this.inputBoxElement.style.left = (parseFloat(this.inputBoxElement.style.left)) + canvass.offsetLeft + 'px';
        }
        this.pdfViewer.annotation.freeTextAnnotationModule.isFreeTextValueChange = false;
        if (this.pdfViewer.freeTextSettings.enableAutoFit) {
            this.autoFitFreeText(currentPosition.x, currentPosition.y);
        }
        this.inputBoxElement.style.paddingLeft = (this.freeTextPaddingLeft * zoomFactor) + 'px';
        this.inputBoxElement.style.paddingTop = (this.freeTextPaddingTop * ((parseFloat(this.inputBoxElement.style.fontSize) / zoomFactor) / this.defaultFontSize) / zoomFactor) + 'px';
        var lineSpace = 0;
        lineSpace = ((parseFloat(this.inputBoxElement.style.fontSize) / zoomFactor) / (this.defaultFontSize / 2));
        this.inputBoxElement.style.paddingTop = ((parseFloat(this.inputBoxElement.style.paddingTop)) - lineSpace) + 'px';
        pageDiv.appendChild(this.inputBoxElement);
        // eslint-disable-next-line
        if (!this.pdfViewer.freeTextSettings.enableAutoFit && (this.defaultHeight * zoomFactor) < this.inputBoxElement.scrollHeight && parseInt(this.inputBoxElement.style.height) < this.inputBoxElement.scrollHeight) {
            this.inputBoxElement.style.height = this.inputBoxElement.scrollHeight + 'px';
        }
        this.isInuptBoxInFocus = true;
        this.inputBoxElement.focus();
        if (this.isNewFreeTextAnnot === true || this.inputBoxElement.value === this.defaultText) {
            this.inputBoxElement.select();
            this.pdfViewerBase.isFreeTextSelected = true;
        }
        this.currentPosition.push(parseInt(this.inputBoxElement.style.left) / zoomFactor, parseInt(this.inputBoxElement.style.top) / zoomFactor, parseInt(this.inputBoxElement.style.width) / zoomFactor, parseInt(this.inputBoxElement.style.height) / zoomFactor);
    };
    FreeTextAnnotation.prototype.applyFreetextStyles = function (zoomFactor, isReadonly) {
        this.inputBoxElement.style.height = (this.defaultHeight * zoomFactor) + 'px';
        this.inputBoxElement.style.width = (this.defautWidth * zoomFactor) + 'px';
        this.inputBoxElement.style.borderWidth = (this.borderWidth * zoomFactor) + 'px';
        this.inputBoxElement.style.fontSize = (this.fontSize * zoomFactor) + 'px';
        this.inputBoxElement.style.fontFamily = this.fontFamily;
        this.inputBoxElement.readOnly = isNullOrUndefined(isReadonly) ? this.isReadonly : isReadonly;
    };
    /**
     * @private
     */
    FreeTextAnnotation.prototype.copySelectedText = function () {
        if (window.getSelection() !== null) {
            this.selectedText = window.getSelection().toString();
            var textArea = document.createElement('textarea');
            textArea.contentEditable = 'true';
            textArea.textContent = this.selectedText;
            textArea.style.position = 'fixed';
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
            }
            catch (ex) {
                console.warn('Copy to clipboard failed.', ex);
            }
            finally {
                if (textArea) {
                    document.body.removeChild(textArea);
                }
            }
        }
    };
    /**
     * @param target
     * @private
     */
    // eslint-disable-next-line
    FreeTextAnnotation.prototype.pasteSelectedText = function (target) {
        if (this.selectedText !== '' && target) {
            // eslint-disable-next-line
            var text = target.value;
            target.value = text.slice(0, this.selectionStart) + this.selectedText + text.slice(this.selectionEnd, text.length);
        }
        // eslint-disable-next-line
        var events = event;
        this.onKeyDownInputBox(events);
    };
    /**
     * @param target
     * @private
     */
    // eslint-disable-next-line
    FreeTextAnnotation.prototype.cutSelectedText = function (target) {
        if (window.getSelection() !== null) {
            // eslint-disable-next-line
            var text = target.value;
            this.selectedText = window.getSelection().toString();
            target.value = text.slice(0, target.selectionStart) + text.slice(target.selectionEnd);
            var textArea = document.createElement('textarea');
            textArea.contentEditable = 'true';
            textArea.textContent = this.selectedText;
            textArea.style.position = 'fixed';
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('cut');
            }
            catch (ex) {
                console.warn('Copy to clipboard failed.', ex);
            }
            finally {
                if (textArea) {
                    document.body.removeChild(textArea);
                }
            }
        }
    };
    /**
     * @param shapeAnnotations
     * @param pageNumber
     * @private
     */
    // eslint-disable-next-line
    FreeTextAnnotation.prototype.saveImportedFreeTextAnnotations = function (shapeAnnotations, pageNumber) {
        // eslint-disable-next-line
        var annotation = shapeAnnotations;
        if (annotation.AnnotType) {
            var vertexPoints = null;
            if (annotation.VertexPoints) {
                vertexPoints = [];
                for (var j = 0; j < annotation.VertexPoints.length; j++) {
                    var point = { x: annotation.VertexPoints[j].X, y: annotation.VertexPoints[j].Y };
                    vertexPoints.push(point);
                }
            }
            // eslint-disable-next-line max-len
            annotation.AnnotationSettings = annotation.AnnotationSettings ? annotation.AnnotationSettings : this.pdfViewer.annotationModule.updateSettings(this.pdfViewer.freeTextSettings);
            var annot = void 0;
            // eslint-disable-next-line max-len
            annotation.allowedInteractions = annotation.AllowedInteractions ? annotation.AllowedInteractions : this.pdfViewer.annotationModule.updateAnnotationAllowedInteractions(annotation);
            var annotationBoundsX = !isNullOrUndefined(annotation.Bounds.X) ? annotation.Bounds.X : annotation.Bounds.x;
            var annotationBoundsY = !isNullOrUndefined(annotation.Bounds.Y) ? annotation.Bounds.Y : annotation.Bounds.y;
            var annotationBoundsWidth = annotation.Bounds.Width ? annotation.Bounds.Width : annotation.Bounds.width;
            var annotationBoundsHeight = annotation.Bounds.Height ? annotation.Bounds.Height : annotation.Bounds.height;
            // eslint-disable-next-line
            annot = {
                author: annotation.Author, allowedInteractions: annotation.allowedInteractions, modifiedDate: annotation.ModifiedDate, subject: annotation.Subject, id: 'freetext',
                rotateAngle: annotation.Rotate, dynamicText: annotation.MarkupText, strokeColor: annotation.StrokeColor,
                thickness: annotation.Thickness, fillColor: annotation.FillColor,
                bounds: {
                    x: annotationBoundsX, y: annotationBoundsY, left: annotationBoundsX, top: annotationBoundsY,
                    width: annotationBoundsWidth, height: annotationBoundsHeight, right: annotation.Bounds.Right,
                    bottom: annotation.Bounds.Bottom
                }, annotName: annotation.AnnotName, shapeAnnotationType: 'FreeText',
                // eslint-disable-next-line
                pageIndex: pageNumber, opacity: annotation.Opacity, fontColor: annotation.FontColor, fontSize: annotation.FontSize,
                fontFamily: annotation.FontFamily, notes: annotation.MarkupText, textAlign: annotation.TextAlign,
                // eslint-disable-next-line
                comments: this.pdfViewer.annotationModule.getAnnotationComments(annotation.Comments, annotation, annotation.Author), review: { state: annotation.State, stateModel: annotation.StateModel, modifiedDate: annotation.ModifiedDate, author: annotation.Author },
                font: { isBold: annotation.Font.Bold, isItalic: annotation.Font.Italic, isStrikeout: annotation.Font.Strikeout, isUnderline: annotation.Font.Underline },
                annotationSelectorSettings: this.getSettings(annotation), annotationSettings: annotation.AnnotationSettings,
                // eslint-disable-next-line max-len
                customData: this.pdfViewer.annotation.getCustomData(annotation), isPrint: annotation.IsPrint, isCommentLock: annotation.IsCommentLock, isReadonly: annotation.IsReadonly
            };
            this.pdfViewer.annotationModule.storeAnnotations(pageNumber, annot, '_annotations_freetext');
        }
    };
    /**
     * @param shapeAnnotations
     * @param pageNumber
     * @private
     */
    // eslint-disable-next-line
    FreeTextAnnotation.prototype.updateFreeTextAnnotationCollections = function (shapeAnnotations, pageNumber) {
        // eslint-disable-next-line
        var annotation = shapeAnnotations;
        annotation.annotationAddMode = this.pdfViewer.annotationModule.findAnnotationMode(annotation, pageNumber, annotation.AnnotType);
        if (annotation.AnnotType) {
            var vertexPoints = null;
            if (annotation.VertexPoints) {
                vertexPoints = [];
                for (var j = 0; j < annotation.VertexPoints.length; j++) {
                    var point = { x: annotation.VertexPoints[j].X, y: annotation.VertexPoints[j].Y };
                    vertexPoints.push(point);
                }
            }
            // eslint-disable-next-line max-len
            annotation.AnnotationSettings = annotation.AnnotationSettings ? annotation.AnnotationSettings : this.pdfViewer.annotationModule.updateSettings(this.pdfViewer.freeTextSettings);
            if (annotation.IsLocked) {
                annotation.AnnotationSettings.isLock = annotation.IsLocked;
            }
            // eslint-disable-next-line max-len
            annotation.allowedInteractions = annotation.AllowedInteractions ? annotation.AllowedInteractions : this.pdfViewer.annotationModule.updateAnnotationAllowedInteractions(annotation);
            var annotationBoundsX = annotation.Bounds.X ? annotation.Bounds.X : annotation.Bounds.x;
            var annotationBoundsY = annotation.Bounds.Y ? annotation.Bounds.Y : annotation.Bounds.y;
            var width = annotation.Bounds.Width ? annotation.Bounds.Width : annotation.Bounds.width;
            var height = annotation.Bounds.Height ? annotation.Bounds.Height : annotation.Bounds.height;
            // eslint-disable-next-line
            var annot = void 0;
            // eslint-disable-next-line
            annot = {
                author: annotation.Author, allowedInteractions: annotation.allowedInteractions, modifiedDate: annotation.ModifiedDate, subject: annotation.Subject, id: 'freetext',
                rotateAngle: annotation.Rotate, dynamicText: annotation.MarkupText, strokeColor: annotation.StrokeColor,
                thickness: annotation.Thickness, fillColor: annotation.FillColor,
                bounds: {
                    x: annotationBoundsX, y: annotationBoundsY, left: annotationBoundsX, top: annotationBoundsY,
                    width: width, height: height, right: annotation.Bounds.Right,
                    bottom: annotation.Bounds.Bottom
                }, annotationId: annotation.AnnotName, shapeAnnotationType: 'FreeText',
                // eslint-disable-next-line
                pageIndex: pageNumber, opacity: annotation.Opacity, fontColor: annotation.FontColor, fontSize: annotation.FontSize,
                fontFamily: annotation.FontFamily, notes: annotation.MarkupText,
                // eslint-disable-next-line
                comments: this.pdfViewer.annotationModule.getAnnotationComments(annotation.Comments, annotation, annotation.Author), review: { state: annotation.State, stateModel: annotation.StateModel, modifiedDate: annotation.ModifiedDate, author: annotation.Author },
                customData: this.pdfViewer.annotation.getCustomData(annotation),
                font: { isBold: annotation.Font.Bold, isItalic: annotation.Font.Italic, isStrikeout: annotation.Font.Strikeout, isUnderline: annotation.Font.Underline }, pageNumber: pageNumber, annotationSettings: annotation.AnnotationSettings, isCommentLock: annotation.IsCommentLock, isReadonly: annotation.IsReadonly, isPrint: annotation.IsPrint,
            };
            return annot;
        }
    };
    /**
     * This method used to add annotations with using program.
     *
     * @param annotationType - It describes type of annotation
     * @param offset - It describes about the annotation bounds
     * @returns Object
     * @private
     */
    FreeTextAnnotation.prototype.updateAddAnnotationDetails = function (annotationObject, offset) {
        //Creating new object if annotationObject is null
        if (!annotationObject) {
            annotationObject = { offset: { x: 1, y: 1 }, pageNumber: 0, width: undefined, height: undefined };
            offset = annotationObject.offset;
        }
        else if (!annotationObject.offset)
            offset = { x: 1, y: 1 };
        else
            offset = annotationObject.offset;
        //Creating the CurrentDate and Annotation name
        var currentDateString = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
        var annotationName = this.pdfViewer.annotation.createGUID();
        var fontStyle = annotationObject.fontStyle ? annotationObject.fontStyle : FontStyle.None;
        //Creating annotation settings
        var annotationSelectorSettings = this.pdfViewer.freeTextSettings.annotationSelectorSettings ? this.pdfViewer.freeTextSettings.annotationSelectorSettings : this.pdfViewer.annotationSelectorSettings;
        var annotationSettings = this.pdfViewer.annotationModule.updateSettings(this.pdfViewer.freeTextSettings);
        var allowedInteractions = this.pdfViewer.freeTextSettings.allowedInteractions ? this.pdfViewer.freeTextSettings.allowedInteractions : this.pdfViewer.annotationSettings.allowedInteractions;
        annotationObject.author = this.pdfViewer.annotationModule.updateAnnotationAuthor('freeText', annotationSettings.annotationSubType);
        annotationSettings.isLock = annotationObject.isLock ? annotationObject.isLock : annotationSettings.isLock;
        if (this.pdfViewer.freeTextSettings.isLock || this.pdfViewer.annotationSettings.isLock || this.pdfViewer.freeTextSettings.isReadonly) {
            annotationObject.isReadonly = true;
        }
        annotationSettings.minHeight = annotationObject.minHeight ? annotationObject.minHeight : 0;
        annotationSettings.minWidth = annotationObject.minWidth ? annotationObject.minWidth : 0;
        annotationSettings.maxWidth = annotationObject.maxWidth ? annotationObject.maxWidth : 0;
        annotationSettings.maxHeight = annotationObject.maxHeight ? annotationObject.maxHeight : 0;
        annotationObject.width = annotationObject.width ? annotationObject.width : 150;
        annotationObject.height = annotationObject.height ? annotationObject.height : 24.6;
        //Creating Annotation objects with it's proper properties
        var freeTextAnnotation = [];
        var freeText = {
            AllowedInteractions: annotationObject.allowedInteractions ? annotationObject.allowedInteractions : allowedInteractions,
            AnnotName: annotationName,
            AnnotType: 'freeText',
            AnnotationFlags: 'Default',
            AnnotationIntent: null,
            AnnotationSelectorSettings: annotationObject.annotationSelectorSettings ? annotationObject.annotationSelectorSettings : annotationSelectorSettings,
            AnnotationSettings: annotationSettings,
            Author: annotationObject.author ? annotationObject.author : 'Guest',
            Border: { HorizontalRadius: 0, VerticalRadius: 0, Width: annotationObject.borderWidth ? annotationObject.borderWidth : 1 },
            BorderColor: { IsEmpty: true, B: 255, Blue: 1, C: 0, G: 255 },
            Bounds: { X: offset.x, Y: offset.y, Width: annotationObject.width, Height: annotationObject.height, Left: offset.x, Top: offset.y, Right: offset.x + annotationObject.width, Bottom: offset.y + annotationObject.height },
            CalloutLines: null,
            Color: { IsEmpty: false, B: 51, Blue: 0.2, C: 0, G: 255 },
            Comments: null,
            CreatedDate: currentDateString,
            CustomData: annotationObject.customData ? annotationObject.customData : null,
            ExistingCustomData: null,
            FillColor: annotationObject.fillColor ? annotationObject.fillColor : '#ffffff00',
            Flatten: false,
            FlattenPopups: false,
            Font: { Bold: fontStyle == FontStyle.Bold ? true : false, Italic: fontStyle == FontStyle.Italic ? true : false, Strikeout: fontStyle == FontStyle.Strikethrough ? true : false, Underline: fontStyle == FontStyle.Underline ? true : false },
            FontColor: annotationObject.fontColor ? annotationObject.fontColor : '#000',
            FontFamily: annotationObject.fontFamily ? annotationObject.fontFamily : 'Helvetica',
            FontSize: annotationObject.fontSize ? annotationObject.fontSize : 16,
            FreeTextAnnotationType: 'Text Box',
            InnerColor: null,
            IsCommentLock: false,
            IsLock: annotationObject.isLock ? annotationObject.isLock : false,
            IsPrint: (annotationObject.isPrint !== null && annotationObject.isPrint !== undefined) ? annotationObject.isPrint : true,
            Layer: null,
            LineEndingStyle: 'OpenArrow',
            Location: null,
            MarkupText: annotationObject.defaultText ? annotationObject.defaultText : 'Type Here',
            ModifiedDate: '',
            Name: annotationName,
            Opacity: annotationObject.opacity ? annotationObject.opacity : 1,
            Page: null,
            PageTags: null,
            ReviewHistory: null,
            Rotate: 0,
            IsReadonly: annotationObject.isReadonly ? annotationObject.isReadonly : false,
            State: 'Unmarked',
            StateModel: 'None',
            StrokeColor: annotationObject.borderColor ? annotationObject.borderColor : '#ffffff00',
            Subject: 'Text Box',
            Text: annotationObject.defaultText ? annotationObject.defaultText : 'Type Here',
            TextAlign: annotationObject.textAlignment ? annotationObject.textAlignment : 'Left',
            TextMarkupColor: null,
            Thickness: annotationObject.borderWidth ? annotationObject.borderWidth : 1,
            isAddAnnotationProgramatically: true
        };
        //Adding the annotation object to an array and return it
        freeTextAnnotation[0] = freeText;
        return { freeTextAnnotation: freeTextAnnotation };
    };
    /**
     * This method used to get the padding.
    */
    FreeTextAnnotation.prototype.getPaddingValues = function (fontSize) {
        var leftPadding = 4; // Left padding used in the drawing.js
        var topPadding = 5; // Top padding used in the drawing.js
        var inputBoxpadding = 2; // we have set the input box padding for the free text.
        topPadding = (topPadding - inputBoxpadding) * (fontSize / 16);
        return [leftPadding, topPadding];
    };
    /**
     * @private
     * This method used tp get the current position of x and y.
    */
    FreeTextAnnotation.prototype.addInputInZoom = function (currentPosition) {
        var zoomFactor = this.pdfViewerBase.getZoomFactor();
        this.inputBoxElement.style.left = (currentPosition.x * zoomFactor) + 'px';
        this.inputBoxElement.style.top = (currentPosition.y * zoomFactor) + 'px';
        this.inputBoxElement.style.height = (currentPosition.height * zoomFactor) + 'px';
        this.inputBoxElement.style.width = (currentPosition.width * zoomFactor) + 'px';
        this.inputBoxElement.style.borderWidth = (this.borderWidth * zoomFactor) + 'px';
        this.inputBoxElement.style.fontSize = (this.fontSize * zoomFactor) + 'px';
    };
    return FreeTextAnnotation;
}());
export { FreeTextAnnotation };
