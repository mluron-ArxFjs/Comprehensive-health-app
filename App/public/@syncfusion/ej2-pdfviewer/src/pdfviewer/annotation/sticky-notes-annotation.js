import { AjaxHandler } from '../index';
import { createElement, Browser, Internationalization, isBlazor, isNullOrUndefined } from '@syncfusion/ej2-base';
import { Accordion, ContextMenu as Context } from '@syncfusion/ej2-navigations';
import { InPlaceEditor } from '@syncfusion/ej2-inplace-editor';
import { cloneObject } from '../drawing/drawing-util';
/**
 * StickyNotes module
 */
var StickyNotesAnnotation = /** @class */ (function () {
    /**
     * @param pdfViewer
     * @param pdfViewerBase
     * @param pdfViewer
     * @param pdfViewerBase
     * @private
     */
    function StickyNotesAnnotation(pdfViewer, pdfViewerBase) {
        this.moreButtonId = '';
        this.commentsCount = 0;
        this.commentsreplyCount = 0;
        this.commentContextMenu = [];
        this.isAccordionContainer = true;
        this.isCreateContextMenu = false;
        this.isCommentsSelected = false;
        /**
         * @private
         */
        this.isAddAnnotationProgramatically = false;
        /**
         * @private
         */
        this.isEditableElement = false;
        this.isPageCommentsRendered = false;
        this.isCommentsRendered = false;
        /**
         * @private
         */
        this.isAnnotationRendered = false;
        /**
         * @private
         */
        this.textFromCommentPanel = false;
        this.pdfViewer = pdfViewer;
        this.pdfViewerBase = pdfViewerBase;
        this.opacity = this.pdfViewer.stickyNotesSettings.opacity ? this.pdfViewer.stickyNotesSettings.opacity : 1;
    }
    /**
     * @param stickyAnnotations
     * @param pageNumber
     * @param canvas
     * @private
     */
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.renderStickyNotesAnnotations = function (stickyAnnotations, pageNumber, canvas) {
        if (stickyAnnotations) {
            if (stickyAnnotations.length > 0) {
                for (var i = 0; i < stickyAnnotations.length; i++) {
                    // eslint-disable-next-line
                    var annotation = stickyAnnotations[i];
                    var isAdded = false;
                    // eslint-disable-next-line
                    var pageAnnotations = this.getAnnotations(pageNumber, null, 'sticky');
                    if (pageAnnotations !== null) {
                        for (var k = 0; k < pageAnnotations.length; k++) {
                            var annotationName = annotation.annotName ? annotation.annotName : annotation.AnnotName;
                            var pageAnnotationName = pageAnnotations[k].annotName ? pageAnnotations[k].annotName : pageAnnotations[k].AnnotName;
                            if (pageAnnotationName && annotationName && pageAnnotationName === annotationName) {
                                isAdded = true;
                                break;
                            }
                        }
                    }
                    if (!isAdded) {
                        annotation.annotationAddMode = this.pdfViewer.annotationModule.findAnnotationMode(annotation, pageNumber, annotation.AnnotType);
                        var annotationObject = null;
                        // eslint-disable-next-line
                        var position = annotation.Bounds;
                        var author = annotation.Author;
                        // eslint-disable-next-line max-len
                        annotation.AnnotationSettings = annotation.AnnotationSettings ? annotation.AnnotationSettings : this.pdfViewer.annotationModule.updateAnnotationSettings(annotation);
                        annotation.allowedInteractions = annotation.AllowedInteraction ? annotation.AllowedInteraction : this.pdfViewer.annotationModule.updateAnnotationAllowedInteractions(annotation);
                        var isPrint = true;
                        if (annotation.annotationAddMode === 'Imported Annotation') {
                            isPrint = annotation.IsPrint;
                        }
                        else {
                            isPrint = annotation.AnnotationSettings.isPrint;
                        }
                        if (annotation.IsLock) {
                            annotation.AnnotationSettings.isLock = annotation.IsLock;
                        }
                        annotationObject = {
                            // eslint-disable-next-line max-len
                            shapeAnnotationType: 'sticky', author: author, modifiedDate: annotation.ModifiedDate, subject: annotation.Subject, note: annotation.Note, opacity: annotation.Opacity, state: annotation.State, stateModel: annotation.StateModel,
                            pathData: '', comments: this.pdfViewer.annotationModule.getAnnotationComments(annotation.Comments, annotation, author), review: { state: annotation.State, stateModel: annotation.StateModel, modifiedDate: annotation.ModifiedDate, author: author }, pageNumber: pageNumber,
                            // eslint-disable-next-line max-len
                            bounds: { left: annotation.Bounds.X, top: annotation.Bounds.Y, width: annotation.Bounds.Width, height: annotation.Bounds.Height, right: annotation.Bounds.Right, bottom: annotation.Bounds.Bottom },
                            annotName: annotation.AnnotName, color: annotation.color,
                            annotationSelectorSettings: this.getSettings(annotation),
                            customData: this.pdfViewer.annotation.getCustomData(annotation),
                            annotationSettings: annotation.AnnotationSettings, allowedInteractions: annotation.allowedInteractions,
                            isPrint: isPrint, isCommentLock: annotation.IsCommentLock
                        };
                        var annot = void 0;
                        // eslint-disable-next-line max-len
                        annotation.AnnotationSelectorSettings = annotation.AnnotationSelectorSettings ? annotation.AnnotationSelectorSettings : this.pdfViewer.annotationSelectorSettings;
                        annot = {
                            // eslint-disable-next-line max-len
                            author: author, modifiedDate: annotationObject.modifiedDate, annotName: annotationObject.annotName, pageIndex: pageNumber, bounds: { x: position.Left, y: position.Top, width: position.Width, height: position.Height }, strokeColor: 'transparent', stampStrokeColor: '', data: this.setImageSource(), shapeAnnotationType: 'StickyNotes',
                            subject: annotationObject.subject, notes: annotationObject.note, opacity: annotationObject.opacity, id: annotationObject.annotName, fillColor: annotationObject.color,
                            annotationSelectorSettings: annotation.AnnotationSelectorSettings,
                            annotationSettings: annotationObject.annotationSettings,
                            // eslint-disable-next-line max-len
                            annotationAddMode: annotation.annotationAddMode, isPrint: isPrint, isCommentLock: annotationObject.isCommentLock
                        };
                        if (canvas) {
                            this.drawStickyNotes(position.Left, position.Top, position.Width, position.Height, pageNumber, annot, canvas);
                        }
                        else {
                            this.pdfViewer.add(annot);
                            this.drawStickyNotes(position.Left, position.Top, position.Width, position.Height, pageNumber, annot);
                            this.pdfViewer.annotationModule.storeAnnotations(pageNumber, annotationObject, '_annotations_sticky');
                        }
                        if (this.isAddAnnotationProgramatically) {
                            // eslint-disable-next-line
                            var settings = {
                                opacity: annot.opacity, borderColor: annot.strokeColor, borderWidth: annot.thickness, author: annotation.author, subject: annotation.subject, modifiedDate: annotation.modifiedDate,
                                // eslint-disable-next-line
                                fillColor: annot.fillColor, fontSize: annot.fontSize, width: annot.bounds.width, height: annot.bounds.height, fontColor: annot.fontColor, fontFamily: annot.fontFamily, defaultText: annot.dynamicText, fontStyle: annot.font, textAlignment: annot.textAlign
                            };
                            this.pdfViewer.fireAnnotationAdd(annot.pageIndex, annot.annotName, 'StickyNotes', annot.bounds, settings);
                        }
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
    StickyNotesAnnotation.prototype.getSettings = function (annotation) {
        var selector = this.pdfViewer.annotationSelectorSettings;
        if (annotation.AnnotationSelectorSettings) {
            selector = annotation.AnnotationSelectorSettings;
        }
        else if (this.pdfViewer.stickyNotesSettings.annotationSelectorSettings) {
            selector = this.pdfViewer.stickyNotesSettings.annotationSelectorSettings;
        }
        return selector;
    };
    /**
     * @param X
     * @param Y
     * @param width
     * @param height
     * @param pageIndex
     * @param annotation
     * @param canvas
     * @param X
     * @param Y
     * @param width
     * @param height
     * @param pageIndex
     * @param annotation
     * @param canvas
     * @param X
     * @param Y
     * @param width
     * @param height
     * @param pageIndex
     * @param annotation
     * @param canvas
     * @private
     */
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.drawStickyNotes = function (X, Y, width, height, pageIndex, annotation, canvas) {
        var _this = this;
        var annot;
        var annotationObject = null;
        var image = new Image();
        // eslint-disable-next-line
        var proxy = this;
        image.onload = function () {
            var commentsDivid;
            var annotationName;
            // eslint-disable-next-line max-len
            var author = (_this.pdfViewer.annotationSettings.author !== 'Guest') ? _this.pdfViewer.annotationSettings.author : _this.pdfViewer.stickyNotesSettings.author;
            if (annotation) {
                annot = {
                    // eslint-disable-next-line max-len
                    author: annotation.author, modifiedDate: annotation.modifiedDate, annotName: annotation.annotName, data: image.src, bounds: { x: X, y: Y, width: width, height: height }, subject: annotation.subject,
                    notes: annotation.notes, opacity: annotation.opacity, id: annotation.annotName, shapeAnnotationType: 'StickyNotes', strokeColor: 'transparent', stampStrokeColor: '', pageIndex: annotation.pageIndex, isPrint: annotation.isPrint
                };
            }
            else {
                annotationName = _this.pdfViewer.annotation.createGUID();
                commentsDivid = proxy.addComments('sticky', pageIndex + 1);
                if (commentsDivid) {
                    document.getElementById(commentsDivid).id = annotationName;
                }
                // eslint-disable-next-line
                var annotationSelectorSettings = _this.pdfViewer.stickyNotesSettings.annotationSelectorSettings ? _this.pdfViewer.stickyNotesSettings.annotationSelectorSettings : _this.pdfViewer.annotationSelectorSettings;
                var isPrint = _this.pdfViewer.stickyNotesSettings.isPrint;
                annot = {
                    // eslint-disable-next-line max-len
                    bounds: { x: X, y: Y, width: width, height: height }, pageIndex: pageIndex, data: image.src, modifiedDate: _this.getDateAndTime(),
                    shapeAnnotationType: 'StickyNotes', strokeColor: 'transparent', stampStrokeColor: '', annotName: annotationName, id: annotationName, opacity: _this.opacity, isPrint: isPrint
                };
                // eslint-disable-next-line max-len
                var isLock = _this.pdfViewer.stickyNotesSettings.isLock ? _this.pdfViewer.stickyNotesSettings.isLock : _this.pdfViewer.annotationSettings.isLock;
                // eslint-disable-next-line
                var allowedInteractions = _this.pdfViewer.annotationModule.updateAnnotationAllowedInteractions(annotation);
                annotationObject = {
                    // eslint-disable-next-line max-len
                    author: author, allowedInteractions: allowedInteractions, modifiedDate: _this.getDateAndTime(), subject: 'Sticky Note', shapeAnnotationType: 'sticky', pageNumber: pageIndex,
                    // eslint-disable-next-line max-len
                    note: '', opacity: _this.opacity, pathData: '', state: '', stateModel: '', color: 'rgba(255,255,0)', comments: [], annotName: annotationName,
                    // eslint-disable-next-line max-len
                    bounds: { left: X, top: Y, width: width, height: height }, review: { state: '', stateModel: '', modifiedDate: '', author: author },
                    annotationSelectorSettings: annotationSelectorSettings,
                    // eslint-disable-next-line max-len
                    customData: _this.pdfViewer.annotationModule.getData('sticky'), annotationSettings: { isLock: isLock }, isPrint: isPrint, isCommentLock: false
                };
            }
            if (!annotation) {
                // eslint-disable-next-line max-len
                proxy.pdfViewer.annotation.addAction(pageIndex, null, annot, 'Addition', '', annot, annot);
                proxy.pdfViewer.add(annot);
                proxy.pdfViewer.annotationModule.storeAnnotations(pageIndex, annotationObject, '_annotations_sticky');
            }
            if (proxy.pdfViewerBase.isAddComment) {
                // eslint-disable-next-line max-len
                // eslint-disable-next-line
                var bounds = { left: annot.bounds.x, top: annot.bounds.y, width: annot.bounds.width, height: annot.bounds.height };
                _this.pdfViewerBase.updateDocumentEditedProperty(true);
                // eslint-disable-next-line
                var settings = { opacity: annot.opacity, author: author, modifiedDate: annot.modifiedDate, subject: annot.shapeAnnotationType };
                _this.pdfViewer.fireAnnotationAdd(annot.pageIndex, annot.annotName, 'StickyNotes', bounds, settings);
            }
            if (canvas) {
                // eslint-disable-next-line
                proxy.pdfViewer.renderDrawing(canvas, pageIndex);
            }
            else {
                // eslint-disable-next-line
                var canvass = document.getElementById(proxy.pdfViewer.element.id + '_annotationCanvas_' + pageIndex);
                // eslint-disable-next-line
                proxy.pdfViewer.renderDrawing(canvass, pageIndex);
            }
            if (Browser.isDevice) {
                proxy.pdfViewer.select([annot.id], annot.annotationSelectorSettings);
            }
            proxy.pdfViewerBase.isAddComment = false;
        };
        image.src = this.setImageSource();
    };
    StickyNotesAnnotation.prototype.setImageSource = function () {
        // eslint-disable-next-line max-len
        var imageSource = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgd2lkdGg9IjE2IgogICBoZWlnaHQ9IjE1IgogICB2aWV3Qm94PSIwIDAgNC4yMzMzMzMxIDMuOTY4NzQ5NyIKICAgdmVyc2lvbj0iMS4xIj4KICA8ZyBpZD0ibGF5ZXIxIj4KICAgIDxwYXRoCiAgICAgICBkPSJNIDMuODM4OSwwLjk0MTY3IEMgMy42NTM5LDAuNzAzNjcgMy40MTU5LDAuNTE3NjcgMy4xMjQ5LDAuMzg1NjcgMi44MDc5LDAuMjUzNjcgMi40ODk5LDAuMTczNjcgMi4xMTk5LDAuMTczNjcgMS43NDg5LDAuMTczNjcgMS40MzE5LDAuMjUzNjcgMS4xMTQyLDAuMzg1NjcgMC44MjMxNiwwLjUxNzY3IDAuNTg1MTYsMC43MDM2NyAwLjQwMDE2LDAuOTQxNjcgMC4yMTUxNiwxLjE3OTcgMC4xMzUxNiwxLjQxNzcgMC4xMzUxNiwxLjcwODcgMC4xMzUxNiwxLjk0NjcgMC4xODgxNiwyLjE1ODcgMC4zMjAxNiwyLjM0MzcgMC40NTMxNiwyLjU1NTcgMC42MTExNiwyLjcxMzcgMC44MjMxNiwyLjg0NjcgMC43OTIxNiwzLjE1NDcgMC42NTAxNiwzLjM4MjcgMC40NzkxNiwzLjU4NzcgMC40MjgxNiwzLjY2NzcgMC41MTcxNiwzLjc0MTcgMC42OTExNiwzLjcxOTcgMS4wODgyLDMuNjM5NyAxLjQwNDksMy40NTQ3IDEuNjQyOSwzLjE2MzcgMS44MDE5LDMuMTkwNyAxLjk2MDksMy4yMTY3IDIuMTE5OSwzLjIxNjcgMi40ODk5LDMuMjE2NyAyLjgwNzksMy4xMzc3IDMuMTI0OSwzLjAwNTcgMy40MTU5LDIuODcyNyAzLjY4MDksMi42ODc3IDMuODM4OSwyLjQ0OTcgNC4wMjQ5LDIuMjExNyA0LjEwMzksMS45NzM3IDQuMTAzOSwxLjY4MjcgNC4xMDM5LDEuNDE3NyA0LjAyNDksMS4xNTI3IDMuODM4OSwwLjk0MTY3IFoiCiAgICAgICBpZD0icGF0aDE1MjQiCiAgICAgICBzdHlsZT0iZmlsbDojZmZmNzAwO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDowLjI2NDU4MztzdHJva2Utb3BhY2l0eToxIiAvPgogICAgPHBhdGgKICAgICAgIGQ9Ik0gMy4wNDI5LDEuNDE2NyBIIDEuMTkxMiBDIDEuMTExMiwxLjQxNjcgMS4wNTkyLDEuMzYzNyAxLjA1OTIsMS4yODM3IDEuMDU5MiwxLjIwNDcgMS4xMTEyLDEuMTUxNyAxLjE5MTIsMS4xNTE3IEggMy4wNDI5IEMgMy4xMjE5LDEuMTUxNyAzLjE3NDksMS4yMDQ3IDMuMTc0OSwxLjI4MzcgMy4xNzQ5LDEuMzYzNyAzLjEyMTksMS40MTY3IDMuMDQyOSwxLjQxNjcgWiIKICAgICAgIGlkPSJwYXRoMTUzNiIKICAgICAgIHN0eWxlPSJzdHJva2Utd2lkdGg6MC4yNjQ1ODMiIC8+CiAgICA8cGF0aAogICAgICAgZD0iTSAzLjA0MjksMS45NDU3IEggMS4xOTEyIEMgMS4xMTEyLDEuOTQ1NyAxLjA1OTIsMS44OTI3IDEuMDU5MiwxLjgxMjcgMS4wNTkyLDEuNzMzNyAxLjExMTIsMS42ODA3IDEuMTkxMiwxLjY4MDcgSCAzLjA0MjkgQyAzLjEyMTksMS42ODA3IDMuMTc0OSwxLjczMzcgMy4xNzQ5LDEuODEyNyAzLjE3NDksMS44OTI3IDMuMTIxOSwxLjk0NTcgMy4wNDI5LDEuOTQ1NyBaIgogICAgICAgaWQ9InBhdGgxNTQwIgogICAgICAgc3R5bGU9InN0cm9rZS13aWR0aDowLjI2NDU4MyIgLz4KICA8L2c+Cjwvc3ZnPgo=';
        return imageSource;
    };
    /**
     * @private
     */
    StickyNotesAnnotation.prototype.createRequestForComments = function () {
        var jsonObject;
        var proxy = this;
        var startIndex = 0;
        var pageLimit = 20;
        var pageCount = proxy.pdfViewerBase.pageCount;
        if (!proxy.isCommentsRendered) {
            if (pageLimit < pageCount) {
                pageCount = pageLimit;
            }
            else {
                proxy.isPageCommentsRendered = true;
            }
        }
        if (!this.isCommentsRendered) {
            // eslint-disable-next-line max-len
            jsonObject = { pageStartIndex: startIndex.toString(), pageEndIndex: pageCount.toString(), hashId: this.pdfViewerBase.hashId, action: 'RenderAnnotationComments', elementId: this.pdfViewer.element.id, uniqueId: proxy.pdfViewerBase.documentId };
            proxy.isCommentsRendered = true;
        }
        else {
            // eslint-disable-next-line max-len
            jsonObject = { pageStartIndex: pageLimit.toString(), pageEndIndex: pageCount.toString(), hashId: this.pdfViewerBase.hashId, action: 'RenderAnnotationComments', elementId: this.pdfViewer.element.id, uniqueId: proxy.pdfViewerBase.documentId };
        }
        if (this.pdfViewerBase.jsonDocumentId) {
            // eslint-disable-next-line
            jsonObject.documentId = this.pdfViewerBase.jsonDocumentId;
        }
        var url = this.pdfViewer.serviceUrl + '/' + this.pdfViewer.serverActionSettings.renderComments;
        proxy.commentsRequestHandler = new AjaxHandler(proxy.pdfViewer);
        proxy.commentsRequestHandler.url = url;
        proxy.commentsRequestHandler.mode = true;
        proxy.commentsRequestHandler.responseType = 'text';
        proxy.commentsRequestHandler.send(jsonObject);
        // eslint-disable-next-line
        proxy.commentsRequestHandler.onSuccess = function (result) {
            // eslint-disable-next-line
            var data = result.data;
            var redirect = proxy.pdfViewerBase.checkRedirection(data);
            if (!redirect) {
                if (data) {
                    if (typeof data !== 'object') {
                        try {
                            data = JSON.parse(data);
                            if (typeof data !== 'object') {
                                data = JSON.parse(data);
                            }
                            if (typeof data !== 'object') {
                                proxy.pdfViewerBase.onControlError(500, data, this.pdfViewer.serverActionSettings.renderComments);
                                data = null;
                            }
                        }
                        catch (error) {
                            proxy.pdfViewerBase.onControlError(500, data, this.pdfViewer.serverActionSettings.renderComments);
                            data = null;
                        }
                    }
                    if (data) {
                        var isInitialRender = false;
                        if (proxy.pdfViewerBase.annotationComments) {
                            // eslint-disable-next-line
                            proxy.pdfViewerBase.annotationComments = data.annotationDetails;
                        }
                        else {
                            proxy.pdfViewerBase.annotationComments = data.annotationDetails;
                            isInitialRender = true;
                        }
                        if (data.annotationDetails && data.uniqueId === proxy.pdfViewerBase.documentId) {
                            proxy.pdfViewer.fireAjaxRequestSuccess(this.pdfViewer.serverActionSettings.renderComments, data);
                            proxy.isAnnotationRendered = true;
                            // eslint-disable-next-line
                            var annotationCollections = void 0;
                            if (proxy.pdfViewerBase.documentAnnotationCollections) {
                                // eslint-disable-next-line max-len
                                annotationCollections = proxy.updateAnnotationsInDocumentCollections(proxy.pdfViewerBase.annotationComments, proxy.pdfViewerBase.documentAnnotationCollections);
                            }
                            else {
                                // eslint-disable-next-line
                                var newCollection = proxy.pdfViewerBase.createAnnotationsCollection();
                                // eslint-disable-next-line max-len
                                annotationCollections = proxy.updateAnnotationsInDocumentCollections(proxy.pdfViewerBase.annotationComments, newCollection);
                            }
                            proxy.pdfViewerBase.annotationComments = annotationCollections;
                            proxy.pdfViewerBase.documentAnnotationCollections = annotationCollections;
                            for (var i = data.startPageIndex; i < data.endPageIndex; i++) {
                                var newData = data.annotationDetails[i];
                                proxy.pdfViewerBase.updateModifiedDateToLocalDate(newData, "annotationOrder");
                                proxy.pdfViewerBase.updateModifiedDateToLocalDate(newData, "freeTextAnnotation");
                                proxy.pdfViewerBase.updateModifiedDateToLocalDate(newData, "measureShapeAnnotation");
                                proxy.pdfViewerBase.updateModifiedDateToLocalDate(newData, "shapeAnnotation");
                                proxy.pdfViewerBase.updateModifiedDateToLocalDate(newData, "signatureAnnotation");
                                proxy.pdfViewerBase.updateModifiedDateToLocalDate(newData, "signatureInkAnnotation");
                                proxy.pdfViewerBase.updateModifiedDateToLocalDate(newData, "stampAnnotations");
                                proxy.pdfViewerBase.updateModifiedDateToLocalDate(newData, "stickyNotesAnnotation");
                                proxy.pdfViewerBase.updateModifiedDateToLocalDate(newData, "textMarkupAnnotation");
                            }
                            for (var j = data.startPageIndex; j < data.endPageIndex; j++) {
                                if (data.annotationDetails[j]) {
                                    proxy.renderAnnotationCollections(data.annotationDetails[j], j, isInitialRender);
                                }
                            }
                            if (!proxy.isPageCommentsRendered) {
                                proxy.isPageCommentsRendered = true;
                                proxy.createRequestForComments();
                            }
                        }
                    }
                }
            }
        };
        // eslint-disable-next-line
        proxy.commentsRequestHandler.onFailure = function (result) {
            this.pdfViewer.fireAjaxRequestFailed(result.status, result.statusText);
        };
        // eslint-disable-next-line
        proxy.commentsRequestHandler.onError = function (result) {
            proxy.pdfViewer.fireAjaxRequestFailed(result.status, result.statusText, proxy.pdfViewer.serverActionSettings.renderComments);
        };
    };
    /**
     * @param excistingAnnotation
     * @param newAnnotation
     * @private
     */
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.updateAnnotationsInDocumentCollections = function (excistingAnnotation, newAnnotation) {
        for (var i = 0; i < this.pdfViewerBase.pageCount; i++) {
            if (excistingAnnotation[i] && newAnnotation[i]) {
                // eslint-disable-next-line max-len
                if (excistingAnnotation[i].textMarkupAnnotation && excistingAnnotation[i].textMarkupAnnotation.length !== 0 && newAnnotation[i].textMarkupAnnotation) {
                    for (var j = 0; j < excistingAnnotation[i].textMarkupAnnotation.length; j++) {
                        // eslint-disable-next-line max-len
                        this.updateDocumentAnnotationCollections(excistingAnnotation[i].textMarkupAnnotation[j], newAnnotation[i].textMarkupAnnotation);
                    }
                }
                // eslint-disable-next-line max-len
                if (excistingAnnotation[i].shapeAnnotation && excistingAnnotation[i].shapeAnnotation.length !== 0 && newAnnotation[i].shapeAnnotation) {
                    for (var j = 0; j < excistingAnnotation[i].shapeAnnotation.length; j++) {
                        // eslint-disable-next-line max-len
                        this.updateDocumentAnnotationCollections(excistingAnnotation[i].shapeAnnotation[j], newAnnotation[i].shapeAnnotation);
                    }
                }
                // eslint-disable-next-line max-len
                if (excistingAnnotation[i].measureShapeAnnotation && excistingAnnotation[i].measureShapeAnnotation.length !== 0 && newAnnotation[i].measureShapeAnnotation) {
                    for (var j = 0; j < excistingAnnotation[i].measureShapeAnnotation.length; j++) {
                        // eslint-disable-next-line max-len
                        this.updateDocumentAnnotationCollections(excistingAnnotation[i].measureShapeAnnotation[j], newAnnotation[i].measureShapeAnnotation);
                    }
                }
                // eslint-disable-next-line max-len
                if (excistingAnnotation[i].stampAnnotations && excistingAnnotation[i].stampAnnotations.length !== 0 && newAnnotation[i].stampAnnotations) {
                    for (var j = 0; j < excistingAnnotation[i].stampAnnotations.length; j++) {
                        // eslint-disable-next-line max-len
                        this.updateDocumentAnnotationCollections(excistingAnnotation[i].stampAnnotations[j], newAnnotation[i].stampAnnotations);
                    }
                }
                // eslint-disable-next-line max-len
                if (excistingAnnotation[i].stickyNotesAnnotation && excistingAnnotation[i].stickyNotesAnnotation.length !== 0 && newAnnotation[i].stickyNotesAnnotation) {
                    for (var j = 0; j < excistingAnnotation[i].stickyNotesAnnotation.length; j++) {
                        // eslint-disable-next-line max-len
                        this.updateDocumentAnnotationCollections(excistingAnnotation[i].stickyNotesAnnotation[j], newAnnotation[i].stickyNotesAnnotation);
                    }
                }
                // eslint-disable-next-line max-len
                if (excistingAnnotation[i].freeTextAnnotation && excistingAnnotation[i].freeTextAnnotation.length !== 0 && newAnnotation[i].freeTextAnnotation) {
                    for (var j = 0; j < excistingAnnotation[i].freeTextAnnotation.length; j++) {
                        // eslint-disable-next-line max-len
                        this.updateDocumentAnnotationCollections(excistingAnnotation[i].freeTextAnnotation[j], newAnnotation[i].freeTextAnnotation);
                    }
                }
                // eslint-disable-next-line max-len
                if (excistingAnnotation[i].signatureAnnotation && excistingAnnotation[i].signatureAnnotation.length !== 0 && newAnnotation[i].signatureAnnotation) {
                    for (var j = 0; j < excistingAnnotation[i].signatureAnnotation.length; j++) {
                        // eslint-disable-next-line max-len
                        this.updateDocumentAnnotationCollections(excistingAnnotation[i].signatureAnnotation[j], newAnnotation[i].signatureAnnotation);
                    }
                }
                // eslint-disable-next-line max-len
                if (excistingAnnotation[i].signatureInkAnnotation && excistingAnnotation[i].signatureInkAnnotation.length !== 0 && newAnnotation[i].signatureInkAnnotation) {
                    for (var j = 0; j < excistingAnnotation[i].signatureInkAnnotation.length; j++) {
                        // eslint-disable-next-line max-len
                        this.updateDocumentAnnotationCollections(excistingAnnotation[i].signatureInkAnnotation[j], newAnnotation[i].signatureInkAnnotation);
                    }
                }
            }
        }
        return newAnnotation;
    };
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.updateDocumentAnnotationCollections = function (excistingAnnotation, newAnnotation) {
        if (newAnnotation.length === 0) {
            newAnnotation.push(excistingAnnotation);
        }
        else {
            var isAdded = false;
            for (var i = 0; i < newAnnotation.length; i++) {
                // eslint-disable-next-line max-len
                if ((excistingAnnotation.AnnotName && newAnnotation[i].AnnotName) && (excistingAnnotation.AnnotName === newAnnotation[i].AnnotName)) {
                    isAdded = true;
                    break;
                }
            }
            if (!isAdded) {
                newAnnotation.push(excistingAnnotation);
            }
        }
    };
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.renderAnnotationCollections = function (pageAnnotations, pageNumber, isInitialRender) {
        // eslint-disable-next-line
        var pageCollections = [];
        var collection = pageAnnotations.annotationOrder;
        for (var l = 0; l < collection.length; l++) {
            var annotation = collection[parseInt(l.toString(), 10)];
            var type = annotation.AnnotType ? annotation.AnnotType : annotation.AnnotationType;
            if (this.pdfViewer.dateTimeFormat) {
                annotation.ModifiedDate = this.pdfViewer.annotationModule.stickyNotesAnnotationModule.getDateAndTime(annotation.ModifiedDate);
            }
            pageCollections.push(annotation);
            switch (type) {
                case "textMarkup":
                    if (!isNullOrUndefined(this.pdfViewer.annotationModule) && (!isNullOrUndefined(this.pdfViewer.annotationModule.textMarkupAnnotationModule))) {
                        this.updateCollections(this.pdfViewer.annotationModule.textMarkupAnnotationModule.updateTextMarkupAnnotationCollections(annotation, pageNumber));
                    }
                    break;
                case "shape_measure":
                    if (!isNullOrUndefined(this.pdfViewer.annotationModule) && (!isNullOrUndefined(this.pdfViewer.annotationModule.measureAnnotationModule))) {
                        this.updateCollections(this.pdfViewer.annotationModule.measureAnnotationModule.updateMeasureAnnotationCollections(annotation, pageNumber));
                    }
                    break;
                case "shape":
                    if (!isNullOrUndefined(this.pdfViewer.annotationModule) && (!isNullOrUndefined(this.pdfViewer.annotationModule.shapeAnnotationModule))) {
                        this.updateCollections(this.pdfViewer.annotationModule.shapeAnnotationModule.updateShapeAnnotationCollections(annotation, pageNumber));
                    }
                    break;
                case "sticky":
                    this.updateCollections(this.updateStickyNotesAnnotationCollections(annotation, pageNumber));
                    break;
                case "stamp":
                    if (!isNullOrUndefined(this.pdfViewer.annotationModule) && (!isNullOrUndefined(this.pdfViewer.annotationModule.stampAnnotationModule))) {
                        this.updateCollections(this.pdfViewer.annotationModule.stampAnnotationModule.updateStampAnnotationCollections(annotation, pageNumber));
                    }
                    break;
                case "Ink":
                    if (!isNullOrUndefined(this.pdfViewer.annotationModule) && (!isNullOrUndefined(this.pdfViewer.annotationModule.inkAnnotationModule))) {
                        this.updateCollections(this.pdfViewer.annotationModule.inkAnnotationModule.updateInkCollections(annotation, pageNumber));
                    }
                    break;
                case "Text Box":
                    if (!isNullOrUndefined(this.pdfViewer.annotationModule) && (!isNullOrUndefined(this.pdfViewer.annotationModule.freeTextAnnotationModule))) {
                        this.updateCollections(this.pdfViewer.annotationModule.freeTextAnnotationModule.updateFreeTextAnnotationCollections(annotation, pageNumber));
                    }
                    break;
                default:
                    break;
            }
        }
        if (pageAnnotations.signatureAnnotation && pageAnnotations.signatureAnnotation.length !== 0) {
            for (var i = 0; i < pageAnnotations.signatureAnnotation.length; i++) {
                if (this.pdfViewer.dateTimeFormat) {
                    // eslint-disable-next-line max-len
                    pageAnnotations.signatureAnnotation[i].ModifiedDate = this.pdfViewer.annotationModule.stickyNotesAnnotationModule.getDateAndTime(pageAnnotations.signatureAnnotation[i].ModifiedDate);
                }
                // eslint-disable-next-line max-len
                this.updateCollections(this.pdfViewerBase.signatureModule.updateSignatureCollections(pageAnnotations.signatureAnnotation[i], pageNumber), true);
            }
        }
        if (this.pdfViewer.toolbarModule) {
            this.renderAnnotationComments(pageCollections, pageNumber);
        }
        if (isInitialRender) {
            for (var i = 0; i < this.pdfViewerBase.renderedPagesList.length; i++) {
                if (this.pdfViewerBase.renderedPagesList[i] === pageNumber) {
                    this.pdfViewerBase.renderAnnotations(pageNumber, pageAnnotations, false);
                }
            }
        }
    };
    /**
     * @param annotation
     * @param isSignature
     * @param annotation
     * @param isSignature
     * @private
     */
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.updateCollections = function (annotation, isSignature) {
        var isAdded = false;
        // eslint-disable-next-line
        var collections;
        if (isSignature) {
            collections = this.pdfViewer.signatureCollection;
        }
        else {
            collections = this.pdfViewer.annotationCollection;
        }
        if (collections && annotation) {
            for (var i = 0; i < collections.length; i++) {
                if (isSignature) {
                    if (collections[i].signatureName === annotation.signatureName) {
                        isAdded = true;
                        break;
                    }
                }
                else {
                    if (collections[i].annotationId === annotation.annotationId) {
                        isAdded = true;
                        break;
                    }
                }
            }
        }
        if (!isAdded && annotation) {
            if (isSignature) {
                this.pdfViewer.signatureCollection.push(annotation);
            }
            else {
                this.pdfViewer.annotationCollection.push(annotation);
            }
        }
    };
    /**
     * @param data
     * @param pageIndex
     * @private
     */
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.renderAnnotationComments = function (data, pageIndex) {
        pageIndex = pageIndex + 1;
        if (data) {
            if (data.length !== 0) {
                this.createPageAccordion(pageIndex);
                for (var i = 0; i < data.length; i++) {
                    if (data[i].AnnotName && (data[i].AnnotName.split('freeText').length === 1)) {
                        this.createCommentControlPanel(data[i], pageIndex);
                    }
                }
                // eslint-disable-next-line
                var newCommentsDiv = document.querySelectorAll('.e-pv-new-comments-div');
                if (newCommentsDiv) {
                    for (var j = 0; j < newCommentsDiv.length; j++) {
                        newCommentsDiv[j].style.display = 'none';
                    }
                }
            }
        }
    };
    /**
     * @private
     */
    StickyNotesAnnotation.prototype.initializeAcccordionContainer = function () {
        // eslint-disable-next-line max-len
        var commentPanelText = createElement('div', { id: this.pdfViewer.element.id + '_commentsPanelText', className: 'e-pv-comments-panel-text' });
        if (isBlazor()) {
            var promise = this.pdfViewer._dotnetInstance.invokeMethodAsync('GetLocaleText', 'PdfViewer_NoCommentsYet');
            promise.then(function (value) {
                commentPanelText.textContent = value;
            });
        }
        else {
            commentPanelText.textContent = this.pdfViewer.localeObj.getConstant('No Comments Yet');
        }
        this.updateCommentPanelTextTop();
        this.pdfViewerBase.navigationPane.commentsContentContainer.appendChild(commentPanelText);
        // eslint-disable-next-line max-len
        this.accordionContentContainer = createElement('div', { id: this.pdfViewer.element.id + '_accordionContentContainer', className: 'e-pv-accordion-content-container' });
        this.pdfViewerBase.navigationPane.commentsContentContainer.appendChild(this.accordionContentContainer);
        // eslint-disable-next-line max-len
        this.pdfViewerBase.navigationPane.annotationMenuObj.enableItems([this.pdfViewer.localeObj.getConstant('Export Annotations')], false);
        // eslint-disable-next-line max-len
        this.pdfViewerBase.navigationPane.annotationMenuObj.enableItems([this.pdfViewer.localeObj.getConstant('Export XFDF')], false);
    };
    /**
     * @private
     */
    StickyNotesAnnotation.prototype.updateCommentPanelTextTop = function () {
        var commentPanelText = document.getElementById(this.pdfViewer.element.id + '_commentsPanelText');
        // eslint-disable-next-line max-len
        if (this.pdfViewerBase.navigationPane.commentPanelContainer && this.pdfViewerBase.navigationPane.commentPanelContainer.clientHeight && commentPanelText.style.display !== 'none') {
            commentPanelText.style.paddingTop = (this.pdfViewerBase.navigationPane.commentPanelContainer.clientHeight / 2) - 47 + 'px';
            commentPanelText.style.paddingLeft = (this.pdfViewerBase.navigationPane.commentPanelContainer.clientWidth) / 3 + 'px';
        }
    };
    /**
     * @param pageIndex
     * @private
     */
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.createPageAccordion = function (pageIndex) {
        var pageAccordionContainer = document.getElementById(this.pdfViewer.element.id + '_accordionContainer' + pageIndex);
        if (pageAccordionContainer === null) {
            this.accordionContent = createElement('div', { id: this.pdfViewer.element.id + '_accordioncontent' + pageIndex });
            this.accordionContent.style.zIndex = '1000';
            // eslint-disable-next-line max-len
            this.accordionPageContainer = createElement('div', { id: this.pdfViewer.element.id + '_accordionPageContainer' + pageIndex, className: 'e-pv-accordion-page-container' });
            this.accordionPageContainer.appendChild(this.accordionContent);
            this.pdfViewerBase.viewerMainContainer.appendChild(this.accordionPageContainer);
            // eslint-disable-next-line max-len
            this.accordionContainer = createElement('div', { id: this.pdfViewer.element.id + '_accordionContainer' + pageIndex, className: 'e-pv-accordion-container' });
            var pageAccordion = new Accordion({
                items: [
                    // eslint-disable-next-line max-len
                    { header: this.pdfViewer.localeObj.getConstant('Page') + ' ' + (pageIndex), expanded: true, content: '#' + this.pdfViewer.element.id + '_accordioncontent' + pageIndex + '' }
                ]
            });
            pageAccordion.appendTo(this.accordionContainer);
            this.accordionContainer.style.order = 'pageIndex';
            this.alignAccordionContainer(this.accordionContainer, pageIndex);
            if (document.getElementById(this.pdfViewer.element.id + '_commentsPanelText')) {
                // eslint-disable-next-line max-len
                this.pdfViewerBase.navigationPane.annotationMenuObj.enableItems([this.pdfViewer.localeObj.getConstant('Export Annotations')], true);
                // eslint-disable-next-line max-len
                this.pdfViewerBase.navigationPane.annotationMenuObj.enableItems([this.pdfViewer.localeObj.getConstant('Export XFDF')], true);
                document.getElementById(this.pdfViewer.element.id + '_commentsPanelText').style.display = 'none';
            }
            if (document.getElementById(this.pdfViewer.element.id + '_accordionContentContainer')) {
                document.getElementById(this.pdfViewer.element.id + '_accordionContentContainer').style.display = 'block';
            }
            return this.accordionContainer;
        }
    };
    StickyNotesAnnotation.prototype.alignAccordionContainer = function (accordionDiv, pageIndex) {
        var isAdded = true;
        if (this.accordionContentContainer) {
            if (this.isAccordionContainer) {
                this.accordionContentContainer.appendChild(accordionDiv);
                isAdded = false;
            }
            else {
                for (var i = 1; i <= this.pdfViewerBase.pageCount; i++) {
                    var nextElement = document.getElementById(this.pdfViewer.element.id + '_accordionContainer' + i);
                    if (nextElement) {
                        if (pageIndex < i) {
                            this.accordionContentContainer.insertBefore(accordionDiv, nextElement);
                            isAdded = false;
                            break;
                        }
                    }
                }
            }
            if (isAdded) {
                this.accordionContentContainer.appendChild(accordionDiv);
                isAdded = false;
            }
            this.isAccordionContainer = false;
        }
    };
    /**
     * @param pageNumber
     * @private
     */
    StickyNotesAnnotation.prototype.updateCommentPanelScrollTop = function (pageNumber) {
        var accordionDiv = document.getElementById(this.pdfViewer.element.id + '_accordionContainer' + pageNumber);
        if (accordionDiv) {
            var scrollValue = accordionDiv.offsetTop + accordionDiv.clientTop - 35;
            this.pdfViewerBase.navigationPane.commentsContentContainer.scrollTop = scrollValue;
        }
    };
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.getButtonState = function (editObj, commentTextBox) {
        commentTextBox.addEventListener('keyup', function (event) {
            if (editObj.element.querySelector('.e-btn-save')) {
                if ((event.srcElement.value !== '' || event.srcElement.defaultValue != '') && event.srcElement.defaultValue !== event.srcElement.value) {
                    editObj.element.querySelector('.e-btn-save').ej2_instances[0].disabled = false;
                }
            }
        });
    };
    /**
     * @param data
     * @param pageIndex
     * @param type
     * @param annotationSubType
     * @param data
     * @param pageIndex
     * @param type
     * @param annotationSubType
     * @param data
     * @param pageIndex
     * @param type
     * @param annotationSubType
     * @private
     */
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.createCommentControlPanel = function (data, pageIndex, type, annotationSubType, isReRender) {
        var accordionContent = document.getElementById(this.pdfViewer.element.id + '_accordioncontent' + pageIndex);
        if (accordionContent) {
            // eslint-disable-next-line
            var accordionExpand = document.getElementById(this.pdfViewer.element.id + '_accordionContainer' + pageIndex);
            if (accordionExpand) {
                accordionExpand.ej2_instances[0].expandItem(true);
            }
            // eslint-disable-next-line max-len
            this.commentsContainer = createElement('div', { id: this.pdfViewer.element.id + 'commentscontainer_' + pageIndex + '_' + this.commentsCount, className: 'e-pv-comments-container' });
            this.commentsContainer.accessKey = pageIndex.toString() + '_' + this.commentsCount;
            var isCommentsAdded = false;
            if (data) {
                this.commentsContainer.id = data.AnnotName;
                if (data.AnnotName) {
                    for (var j = 0; j < accordionContent.childElementCount; j++) {
                        if (accordionContent.children[j].id === data.AnnotName) {
                            isCommentsAdded = true;
                            if (isReRender) {
                                // To remove the existing div element in the comment panel while importing the annotation with the same name. (EJ2-62092)
                                var id = document.getElementById(accordionContent.children[j].id);
                                id.remove();
                                isCommentsAdded = false;
                            }
                            break;
                        }
                    }
                }
                if (data.Name && data.Name === 'freeText') {
                    this.commentsContainer.setAttribute('name', 'freeText');
                }
                else {
                    this.commentsContainer.setAttribute('name', data.AnnotType);
                }
            }
            if (type) {
                this.commentsContainer.setAttribute('name', type);
            }
            this.commentsContainer.addEventListener('mousedown', this.commentsAnnotationSelect.bind(this));
            // eslint-disable-next-line max-len
            var commentDiv = createElement('div', { id: this.pdfViewer.element.id + '_commentdiv_' + pageIndex + '_' + this.commentsCount, className: 'e-pv-comments-div' });
            this.commentsCount = this.commentsCount + 1;
            this.commentsContainer.appendChild(commentDiv);
            this.updateCommentPanelScrollTop(pageIndex);
            if (!isCommentsAdded) {
                accordionContent.appendChild(this.commentsContainer);
            }
            var title = void 0;
            if (data) {
                title = this.commentsContainer.getAttribute('name');
                if (title === 'null') {
                    title = data.AnnotationType;
                }
                this.createTitleContainer(commentDiv, title, pageIndex, data.Subject, data.ModifiedDate, data.Author);
            }
            else {
                title = this.commentsContainer.getAttribute('name');
                this.createTitleContainer(commentDiv, title, pageIndex, annotationSubType);
            }
            // eslint-disable-next-line max-len
            var commentTextBox = createElement('div', { id: this.pdfViewer.element.id + '_commenttextbox_' + pageIndex + '_' + this.commentsCount, className: 'e-pv-comment-textbox' });
            // eslint-disable-next-line
            var editObj_1 = new InPlaceEditor({
                mode: 'Inline',
                type: 'Text',
                model: { placeholder: this.pdfViewer.localeObj.getConstant('Add a comment') + '..' },
                emptyText: '',
                editableOn: 'EditIconClick',
                saveButton: {
                    content: this.pdfViewer.localeObj.getConstant('Post'),
                    cssClass: 'e-outline',
                    disabled: true
                },
                cancelButton: {
                    content: this.pdfViewer.localeObj.getConstant('Cancel'),
                    cssClass: 'e-outline'
                },
                submitOnEnter: true
            });
            if (data && (!isNullOrUndefined(data.Note) || !isNullOrUndefined(data.Text))) {
                editObj_1.created = function () {
                    setTimeout(function () {
                        editObj_1.element.querySelector('.e-editable-value').innerText = !isNullOrUndefined(data.Note) ? data.Note : !isNullOrUndefined(data.Text) ? data.Text : '';
                    });
                };
                editObj_1.beginEdit = function () {
                    editObj_1.value = editObj_1.valueEle.innerText;
                };
            }
            editObj_1.appendTo(commentTextBox);
            // eslint-disable-next-line
            var textBox = document.querySelectorAll('.e-editable-inline');
            for (var j = 0; j < textBox.length; j++) {
                textBox[j].style.display = 'none';
            }
            if (!data && type !== 'freeText') {
                editObj_1.enableEditMode = true;
            }
            this.getButtonState(editObj_1, commentTextBox);
            editObj_1.actionSuccess = this.createCommentDiv.bind(this, editObj_1);
            commentDiv.appendChild(commentTextBox);
            if (data) {
                editObj_1.value = !isNullOrUndefined(data.Note) ? data.Note : !isNullOrUndefined(data.Text) ? data.Text : '';
                var isCommentLocked = this.checkIslockProperty(data);
                if (isCommentLocked && data.Comments == null) {
                    this.createCommentDiv(this.commentsContainer);
                }
                if (data.Name === 'freeText') {
                    editObj_1.value = data.MarkupText;
                }
                if (data.State) {
                    // eslint-disable-next-line max-len
                    var statusContainer = createElement('div', { id: this.pdfViewer.element.id + 'status' + '_container', className: 'e-pv-status-container' });
                    // eslint-disable-next-line max-len
                    var statusDiv = createElement('div', { id: this.pdfViewer.element.id + 'status' + '_div', className: 'e-pv-status-div' });
                    var statusSpan = createElement('span', { id: this.pdfViewer.element.id + 'status' + '_icon' });
                    statusDiv.appendChild(statusSpan);
                    statusContainer.appendChild(statusDiv);
                    commentDiv.appendChild(statusContainer);
                    this.updateStatusContainer(data.State, statusSpan, statusDiv, statusContainer);
                }
                if (data.Comments) {
                    for (var j = 0; j < data.Comments.length; j++) {
                        this.renderComments(data.Comments[j], this.commentsContainer);
                    }
                    if (data.Note !== ' ' && data.Note !== '' && data.Note !== null) {
                        this.createCommentDiv(this.commentsContainer);
                    }
                }
            }
            this.isNewcommentAdded = true;
            commentDiv.addEventListener('click', this.commentsDivClickEvent.bind(this));
            commentDiv.addEventListener('mouseover', this.commentDivMouseOver.bind(this));
            commentDiv.addEventListener('mouseleave', this.commentDivMouseLeave.bind(this));
            commentDiv.addEventListener('mouseout', this.commentDivMouseLeave.bind(this));
            commentDiv.addEventListener('focusout', this.commentDivMouseLeave.bind(this));
            commentTextBox.addEventListener('dblclick', this.openEditorElement.bind(this));
            commentTextBox.addEventListener('focusin', this.commentDivFocus.bind(this));
            return (this.commentsContainer.id);
        }
        return '';
    };
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.commentDivFocus = function (args) {
        if (isNullOrUndefined(this.pdfViewer.freeTextSettings.defaultText)) {
            this.pdfViewer.freeTextSettings.defaultText = "Type here";
        }
        // eslint-disable-next-line
        if (!isNullOrUndefined(args.target) && !isNullOrUndefined(this.pdfViewer.freeTextSettings.defaultText) && this.pdfViewer.selectedItems && this.pdfViewer.selectedItems.annotations[0] && this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'FreeText' && args.target.value === this.pdfViewer.freeTextSettings.defaultText) {
            args.target.select();
        }
        // eslint-disable-next-line
        if (!this.isNewcommentAdded) {
            if (args.relatedTarget !== null && args.relatedTarget.id === this.pdfViewer.element.id + '_viewerContainer') {
                args.preventDefault();
                args.target.blur();
            }
        }
        else {
            var proxy_1 = this;
            var pageNumber_1 = this.pdfViewerBase.currentPageNumber;
            setTimeout(function () {
                proxy_1.updateScrollPosition(pageNumber_1);
            }, 500);
        }
    };
    StickyNotesAnnotation.prototype.updateScrollPosition = function (pageNumber) {
        var accordionDiv = document.getElementById(this.pdfViewer.element.id + '_accordionContainer' + pageNumber);
        if (accordionDiv && this.isNewcommentAdded) {
            var commentHeight = 0;
            // eslint-disable-next-line
            var textBox = document.querySelectorAll('.e-editable-inline');
            if (textBox[0]) {
                commentHeight = textBox[0].getBoundingClientRect().height;
            }
            var scrollValue = accordionDiv.offsetTop + accordionDiv.clientTop + commentHeight;
            if (this.pdfViewerBase.navigationPane.commentsContentContainer.scrollTop < scrollValue) {
                this.pdfViewerBase.navigationPane.commentsContentContainer.scrollTop = scrollValue;
            }
            this.isNewcommentAdded = false;
        }
    };
    StickyNotesAnnotation.prototype.updateCommentsScrollTop = function (isCommentsAdded) {
        // eslint-disable-next-line max-len
        var accordionDiv = document.getElementById(this.pdfViewer.element.id + '_accordionContainer' + this.pdfViewerBase.currentPageNumber);
        // eslint-disable-next-line
        var commentsContainer = document.querySelector('.e-pv-comments-border');
        var commentsHeight = 0;
        if (accordionDiv && commentsContainer) {
            commentsHeight = commentsContainer.getBoundingClientRect().height;
            var scrollValue = void 0;
            if (isCommentsAdded) {
                scrollValue = accordionDiv.offsetTop + commentsContainer.offsetTop + (commentsHeight / 4);
            }
            else {
                scrollValue = accordionDiv.offsetTop + commentsContainer.offsetTop - 70;
            }
            this.pdfViewerBase.navigationPane.commentsContentContainer.scrollTop = scrollValue;
        }
    };
    /**
     * @param args
     * @private
     */
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.createCommentDiv = function (args) {
        var _this = this;
        var commentsContainer;
        var titleContainer;
        // eslint-disable-next-line
        var newCommentDiv = createElement('div', { id: this.pdfViewer.element.id + '_newcommentdiv_' + this.commentsCount + '_' + this.commentsreplyCount, className: 'e-pv-new-comments-div' });
        if (args.localName) {
            commentsContainer = args;
        }
        else {
            commentsContainer = args.valueEle.parentElement.parentElement.parentElement.parentElement;
            titleContainer = args.valueEle.parentElement.parentElement.previousSibling.childNodes[1];
        }
        // eslint-disable-next-line
        var commentObj = new InPlaceEditor({
            mode: 'Inline',
            type: 'Text',
            value: '',
            editableOn: 'Click',
            model: { placeholder: this.pdfViewer.localeObj.getConstant('Add a reply') + '..' },
            emptyText: this.pdfViewer.localeObj.getConstant('Add a reply'),
            saveButton: {
                content: this.pdfViewer.localeObj.getConstant('Post'),
                cssClass: 'e-outline',
                disabled: true
            },
            cancelButton: {
                content: this.pdfViewer.localeObj.getConstant('Cancel'),
                cssClass: 'e-outline'
            },
            submitOnEnter: true
        });
        commentObj.appendTo(newCommentDiv);
        newCommentDiv.lastChild.firstChild.click();
        // eslint-disable-next-line
        this.getButtonState(commentObj, newCommentDiv);
        if (args.valueEle) {
            if (args.value != null && args.value !== ' ') {
                // eslint-disable-next-line max-len
                if (this.pdfViewer.selectedItems.annotations[0] && this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'FreeText') {
                    this.modifyTextProperty(args.value, args.prevValue, args.valueEle.parentNode.parentNode.parentNode.parentNode.id);
                }
                else {
                    try {
                        this.modifyTextProperty(args.value, args.prevValue, args.valueEle.parentNode.parentNode.parentNode.parentNode.id);
                    }
                    catch (error) {
                        this.modifyTextProperty(args.value, args.prevValue);
                    }
                }
                this.updateModifiedDate(titleContainer);
            }
            if (args.valueEle.parentElement.parentElement.parentElement.parentElement.childElementCount === 1) {
                if (args.value != null && args.value !== '' && args.value !== ' ') {
                    commentsContainer.appendChild(newCommentDiv);
                    setTimeout(function () {
                        _this.updateCommentsScrollTop(true);
                    }, 50);
                }
            }
        }
        else {
            commentsContainer.appendChild(newCommentDiv);
            setTimeout(function () {
                _this.updateCommentsScrollTop(true);
            }, 50);
        }
        commentObj.actionSuccess = this.saveCommentDiv.bind(this, commentObj);
    };
    /**
     * @param args
     * @param comment
     * @private
     */
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.saveCommentDiv = function (args, comment) {
        var commentsContainer;
        var annotationAuthor;
        // eslint-disable-next-line
        var lastElement;
        var commentValue;
        if (comment.name && args.value !== '') {
            commentsContainer = args.valueEle.parentElement.parentElement.parentElement;
            lastElement = args.valueEle.parentElement.parentElement;
            commentValue = args.value;
        }
        else {
            commentsContainer = args;
            lastElement = commentsContainer.lastChild;
            commentValue = comment;
        }
        if (commentsContainer && lastElement) {
            commentsContainer.removeChild(lastElement);
            var replyTextBox = createElement('div', { id: this.pdfViewer.element.id + '_replytextbox_' + this.commentsCount + '_' + this.commentsreplyCount });
            this.commentsreplyCount = this.commentsreplyCount + 1;
            // eslint-disable-next-line
            var replyCommentDiv = createElement('div', { id: this.pdfViewer.element.id + 'replyDiv_' + this.commentsCount + '_' + this.commentsreplyCount, className: 'e-pv-reply-div' });
            replyCommentDiv.id = this.pdfViewer.annotation.createGUID();
            annotationAuthor = this.getAuthorName(this.pdfViewer.selectedItems.annotations[0], commentsContainer);
            this.createReplyDivTitleContainer(replyCommentDiv, null, annotationAuthor);
            replyCommentDiv.addEventListener('mouseover', this.commentDivMouseOver.bind(this));
            replyCommentDiv.addEventListener('mouseleave', this.commentDivMouseLeave.bind(this));
            replyCommentDiv.addEventListener('click', this.commentDivOnSelect.bind(this));
            replyTextBox.addEventListener('dblclick', this.openEditorElement.bind(this));
            replyCommentDiv.style.border = 1 + 'px';
            replyCommentDiv.style.borderColor = 'black';
            replyCommentDiv.style.zIndex = 1002;
            // eslint-disable-next-line
            var saveObj_1 = new InPlaceEditor({
                mode: 'Inline',
                type: 'Text',
                emptyText: '',
                editableOn: 'EditIconClick',
                model: { placeholder: this.pdfViewer.localeObj.getConstant('Add a reply') + '..' },
                value: commentValue,
                saveButton: {
                    content: this.pdfViewer.localeObj.getConstant('Post'),
                    cssClass: 'e-outline',
                    disabled: true
                },
                cancelButton: {
                    content: this.pdfViewer.localeObj.getConstant('Cancel'),
                    cssClass: 'e-outline'
                }
            });
            saveObj_1.created = function () {
                setTimeout(function () {
                    saveObj_1.element.querySelector('.e-editable-value').innerText = commentValue;
                });
            };
            saveObj_1.beginEdit = function () {
                saveObj_1.value = saveObj_1.valueEle.innerText;
            };
            saveObj_1.appendTo(replyTextBox);
            saveObj_1.actionSuccess = this.modifyProperty.bind(this, saveObj_1);
            replyCommentDiv.appendChild(replyTextBox);
            replyCommentDiv.style.paddingLeft = 24 + 'px';
            commentsContainer.appendChild(replyCommentDiv);
            // eslint-disable-next-line
            this.getButtonState(saveObj_1, replyTextBox);
            replyCommentDiv.addEventListener('click', this.commentsDivClickEvent.bind(this));
            replyCommentDiv.addEventListener('dblclick', this.commentsDivDoubleClickEvent.bind(this));
            this.createCommentDiv(replyCommentDiv.parentElement);
            this.modifyCommentsProperty(commentValue, replyCommentDiv.id, commentsContainer.id);
        }
    };
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.renderComments = function (data, commentDiv, undoRedoAction, id, isCommentAction) {
        var annotationAuthor;
        var replyTextBox = createElement('div', { id: this.pdfViewer.element.id + '_replytextbox_' + this.commentsCount + '_' + this.commentsreplyCount });
        this.commentsreplyCount = this.commentsreplyCount + 1;
        var replyDiv = createElement('div', { id: 'replyDiv_' + this.commentsCount + '_' + this.commentsreplyCount, className: 'e-pv-reply-div' });
        if (undoRedoAction) {
            replyDiv.id = data.annotName;
            annotationAuthor = data.author;
        }
        else {
            replyDiv.id = data.AnnotName;
            annotationAuthor = data.Author;
        }
        replyDiv.style.border = 1 + 'px';
        replyDiv.style.borderColor = 'black';
        if (!annotationAuthor) {
            annotationAuthor = commentDiv.getAttribute('author');
        }
        if (undoRedoAction) {
            if (data.modifiedDate !== undefined) {
                this.createReplyDivTitleContainer(replyDiv, data.modifiedDate, annotationAuthor);
            }
            else {
                this.createReplyDivTitleContainer(replyDiv, null, annotationAuthor);
            }
        }
        else {
            this.createReplyDivTitleContainer(replyDiv, data.ModifiedDate, annotationAuthor);
        }
        replyDiv.addEventListener('mouseover', this.commentDivMouseOver.bind(this));
        replyDiv.addEventListener('mouseleave', this.commentDivMouseLeave.bind(this));
        replyDiv.addEventListener('click', this.commentDivOnSelect.bind(this));
        replyTextBox.addEventListener('dblclick', this.openEditorElement.bind(this));
        // eslint-disable-next-line
        var saveObj = new InPlaceEditor({
            mode: 'Inline',
            type: 'Text',
            emptyText: '',
            editableOn: 'EditIconClick',
            model: { placeholder: this.pdfViewer.localeObj.getConstant('Add a reply') + '..' },
            value: '',
            saveButton: {
                content: this.pdfViewer.localeObj.getConstant('Post'),
                cssClass: 'e-outline',
                disabled: true
            },
            cancelButton: {
                content: this.pdfViewer.localeObj.getConstant('Cancel'),
                cssClass: 'e-outline'
            }
        });
        if (undoRedoAction) {
            saveObj.value = data.note;
        }
        else {
            saveObj.value = data.Note;
        }
        saveObj.created = function () {
            setTimeout(function () {
                saveObj.element.querySelector('.e-editable-value').innerText = undoRedoAction ? data ? data.note : '' : data ? data.Note : '';
            });
        };
        saveObj.beginEdit = function () {
            saveObj.value = saveObj.valueEle.innerText;
        };
        saveObj.appendTo(replyTextBox);
        replyDiv.appendChild(replyTextBox);
        if (undoRedoAction) {
            data.State = data.state;
        }
        if (data.State) {
            // eslint-disable-next-line max-len
            var statusContainer = createElement('div', { id: this.pdfViewer.element.id + 'status' + '_container', className: 'e-pv-status-container' });
            // eslint-disable-next-line max-len
            var statusDiv = createElement('div', { id: this.pdfViewer.element.id + 'status' + '_div', className: 'e-pv-status-div' });
            var statusSpan = createElement('span', { id: this.pdfViewer.element.id + 'status' + '_icon' });
            statusDiv.appendChild(statusSpan);
            statusContainer.appendChild(statusDiv);
            replyDiv.appendChild(statusContainer);
            this.updateStatusContainer(data.State, statusSpan, statusDiv, statusContainer);
        }
        replyDiv.style.paddingLeft = 24 + 'px';
        // eslint-disable-next-line
        this.getButtonState(saveObj, replyTextBox);
        if (undoRedoAction) {
            if (isCommentAction) {
                commentDiv.appendChild(replyDiv);
            }
            else {
                // eslint-disable-next-line
                var commentsDiv = document.getElementById(id);
                if (data.position) {
                    commentsDiv.insertBefore(replyDiv, commentsDiv.childNodes[data.position]);
                }
                else {
                    // eslint-disable-next-line
                    if (commentsDiv) {
                        if (commentsDiv.childElementCount > 1) {
                            commentsDiv.insertBefore(replyDiv, commentsDiv.childNodes[commentsDiv.childElementCount - 1]);
                        }
                        else {
                            commentDiv.appendChild(replyDiv);
                        }
                    }
                }
            }
        }
        else {
            commentDiv.appendChild(replyDiv);
        }
        replyDiv.addEventListener('click', this.commentsDivClickEvent.bind(this));
        replyDiv.addEventListener('dblclick', this.commentsDivDoubleClickEvent.bind(this));
        saveObj.actionSuccess = this.modifyProperty.bind(this, saveObj);
    };
    /**
     * @param data
     * @param pageIndex
     * @param isCopy
     * @param data
     * @param pageIndex
     * @param isCopy
     * @private
     */
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.createCommentsContainer = function (data, pageIndex, isCopy) {
        // eslint-disable-next-line
        var accordionContentContainer = document.getElementById(this.pdfViewer.element.id + '_accordionContainer' + pageIndex);
        if (!accordionContentContainer) {
            // eslint-disable-next-line max-len
            var accordionPageContainer = document.getElementById(this.pdfViewer.element.id + '_accordionPageContainer' + pageIndex);
            if (accordionPageContainer) {
                accordionPageContainer.parentElement.removeChild(accordionPageContainer);
            }
            accordionContentContainer = this.createPageAccordion(pageIndex);
            if (accordionContentContainer) {
                accordionContentContainer.ej2_instances[0].expandItem(true);
            }
        }
        var accordionContent = document.getElementById(this.pdfViewer.element.id + '_accordioncontent' + pageIndex);
        // eslint-disable-next-line max-len
        this.commentsContainer = createElement('div', { id: this.pdfViewer.element.id + 'commentscontainer_' + pageIndex + '_' + this.commentsCount, className: 'e-pv-comments-container' });
        this.commentsContainer.accessKey = pageIndex.toString() + '_' + this.commentsCount;
        if (data) {
            this.commentsContainer.id = data.annotName ? data.annotName : data.annotationId;
        }
        this.commentsContainer.addEventListener('mousedown', this.commentsAnnotationSelect.bind(this));
        // eslint-disable-next-line max-len
        var commentDiv = createElement('div', { id: this.pdfViewer.element.id + '_commentdiv_' + pageIndex + '_' + this.commentsCount, className: 'e-pv-comments-div' });
        this.commentsCount = this.commentsCount + 1;
        this.commentsContainer.appendChild(commentDiv);
        this.updateCommentPanelScrollTop(pageIndex);
        if (data && accordionContent) {
            if (data.position || data.position === 0) {
                accordionContent.insertBefore(this.commentsContainer, accordionContent.children[data.position]);
            }
            else {
                accordionContent.appendChild(this.commentsContainer);
            }
        }
        if (data && accordionContent) {
            if (data.indent) {
                this.commentsContainer.setAttribute('name', 'shape_measure');
                this.createTitleContainer(commentDiv, 'shape_measure', pageIndex, data.subject, data.modifiedDate, data.author);
            }
            else if (data.shapeAnnotationType === 'sticky' || data.shapeAnnotationType === 'stamp') {
                // eslint-disable-next-line max-len
                var annotType = this.createTitleContainer(commentDiv, data.shapeAnnotationType, pageIndex, null, data.modifiedDate, data.author);
                this.commentsContainer.setAttribute('name', annotType);
                if (annotType === 'sticky') {
                    if (!isCopy) {
                        this.addStickyNotesAnnotations((pageIndex - 1), data);
                    }
                }
            }
            else if (data.shapeAnnotationType === 'textMarkup') {
                this.commentsContainer.setAttribute('name', 'textMarkup');
                this.createTitleContainer(commentDiv, 'textMarkup', pageIndex, data.subject, data.modifiedDate, data.author);
            }
            else if (data.shapeAnnotationType === 'FreeText') {
                data.note = data.dynamicText;
                this.commentsContainer.setAttribute('name', 'freetext');
                this.createTitleContainer(commentDiv, 'freeText', pageIndex, data.subject, data.modifiedDate);
            }
            else if (data.shapeAnnotationType === 'Ink') {
                data.note = data.dynamicText;
                this.commentsContainer.setAttribute('name', 'ink');
                this.createTitleContainer(commentDiv, 'ink', pageIndex, data.subject, data.modifiedDate);
            }
            else {
                this.commentsContainer.setAttribute('name', 'shape');
                if (data.shapeAnnotationType === 'Line') {
                    this.createTitleContainer(commentDiv, 'shape', pageIndex, data.subject, data.modifiedDate, data.author);
                }
                else {
                    this.createTitleContainer(commentDiv, 'shape', pageIndex, data.shapeAnnotationType, data.modifiedDate, data.author);
                }
            }
        }
        // eslint-disable-next-line max-len
        var commentTextBox = createElement('div', { id: this.pdfViewer.element.id + '_commenttextbox_' + pageIndex + '_' + this.commentsCount, className: 'e-pv-comment-textbox' });
        // eslint-disable-next-line
        var editObj = new InPlaceEditor({
            mode: 'Inline',
            type: 'Text',
            model: { placeholder: this.pdfViewer.localeObj.getConstant('Add a comment') + '..' },
            emptyText: '',
            editableOn: 'EditIconClick',
            saveButton: {
                content: this.pdfViewer.localeObj.getConstant('Post'),
                cssClass: 'e-outline',
                disabled: true
            },
            cancelButton: {
                content: this.pdfViewer.localeObj.getConstant('Cancel'),
                cssClass: 'e-outline'
            },
            submitOnEnter: true
        });
        editObj.appendTo(commentTextBox);
        // eslint-disable-next-line
        var textBox = document.querySelectorAll('.e-editable-inline');
        for (var j = 0; j < textBox.length; j++) {
            textBox[j].style.display = 'none';
        }
        // eslint-disable-next-line
        commentTextBox.addEventListener('keydown', function (event) {
            if (editObj.element.querySelector('.e-btn-save')) {
                if (event.srcElement.value !== '') {
                    editObj.element.querySelector('.e-btn-save').ej2_instances[0].disabled = false;
                }
                else {
                    editObj.element.querySelector('.e-btn-save').ej2_instances[0].disabled = true;
                }
            }
        });
        editObj.actionSuccess = this.createCommentDiv.bind(this, editObj);
        commentDiv.appendChild(commentTextBox);
        if (data) {
            editObj.value = data.note;
            if (data.state) {
                // eslint-disable-next-line max-len
                var statusContainer = createElement('div', { id: this.pdfViewer.element.id + 'status' + '_container', className: 'e-pv-status-container' });
                // eslint-disable-next-line max-len
                var statusDiv = createElement('div', { id: this.pdfViewer.element.id + 'status' + '_div', className: 'e-pv-status-div' });
                var statusSpan = createElement('span', { id: this.pdfViewer.element.id + 'status' + '_icon' });
                statusDiv.appendChild(statusSpan);
                statusContainer.appendChild(statusDiv);
                commentDiv.appendChild(statusContainer);
                this.updateStatusContainer(data.state, statusSpan, statusDiv, statusContainer);
            }
            if (data.comments) {
                for (var j = 0; j < data.comments.length; j++) {
                    this.renderComments(data.comments[j], this.commentsContainer, true, null, true);
                }
                if (data.comments.length > 0) {
                    this.createCommentDiv(this.commentsContainer);
                }
            }
        }
        commentDiv.addEventListener('click', this.commentsDivClickEvent.bind(this));
        commentDiv.addEventListener('mouseover', this.commentDivMouseOver.bind(this));
        commentDiv.addEventListener('mouseleave', this.commentDivMouseLeave.bind(this));
        commentDiv.addEventListener('mouseout', this.commentDivMouseLeave.bind(this));
        commentDiv.addEventListener('focusout', this.commentDivMouseLeave.bind(this));
        commentTextBox.addEventListener('dblclick', this.openEditorElement.bind(this));
        return (this.commentsContainer.id);
    };
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.modifyProperty = function (args) {
        var commentElement = args.element.parentElement.id;
        var parentElement = args.element.parentElement.parentElement.id;
        var titleElement = args.element.previousSibling.firstChild;
        this.updateModifiedDate(titleElement);
        this.modifyCommentsProperty(args.value, commentElement, parentElement, args.prevValue);
    };
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.createTitleContainer = function (commentsDivElement, type, pageIndex, subType, modifiedDate, author, note) {
        var annotationType = this.getAnnotationType(type);
        // eslint-disable-next-line max-len
        var commentTitleContainer = createElement('div', { id: this.pdfViewer.element.id + '_commentTitleConatiner_' + pageIndex + '_' + this.commentsCount, className: 'e-pv-comment-title-container' });
        // eslint-disable-next-line max-len
        var commentTypeSpan = createElement('span', { id: this.pdfViewer.element.id + '_commenttype' + '_icon' + pageIndex + '_' + this.commentsCount });
        commentTypeSpan.style.opacity = '0.6';
        this.updateCommentIcon(commentTypeSpan, annotationType, subType);
        var annotationAuthor;
        if (!author) {
            annotationAuthor = this.pdfViewer.annotationModule.updateAnnotationAuthor(annotationType, subType);
        }
        else {
            annotationAuthor = author;
        }
        commentTypeSpan.style.padding = 8 + 'px';
        commentTypeSpan.style.cssFloat = 'left';
        commentTitleContainer.appendChild(commentTypeSpan);
        // eslint-disable-next-line max-len
        var commentsTitle = createElement('div', { id: this.pdfViewer.element.id + '_commentTitle_' + pageIndex + '_' + this.commentsCount, className: 'e-pv-comment-title' });
        if (!modifiedDate) {
            commentsTitle.textContent = annotationAuthor + ' - ' + this.setModifiedDate();
        }
        else {
            commentsTitle.textContent = annotationAuthor + ' - ' + this.convertUTCDateToLocalDate(modifiedDate);
        }
        commentTitleContainer.appendChild(commentsTitle);
        this.moreButtonId = this.pdfViewer.element.id + '_more-options_' + this.commentsCount + '_' + this.commentsreplyCount;
        // eslint-disable-next-line max-len
        var moreOptionsButton = createElement('button', { id: this.moreButtonId, className: 'e-pv-more-options-button e-btn', attrs: { 'tabindex': '-1' } });
        moreOptionsButton.style.visibility = 'hidden';
        moreOptionsButton.style.zIndex = '1001';
        moreOptionsButton.setAttribute('type', 'button');
        moreOptionsButton.setAttribute('aria-label', 'more button');
        // eslint-disable-next-line max-len
        var moreOptionsButtonSpan = createElement('span', { id: this.pdfViewer.element.id + '_more-options_icon', className: 'e-pv-more-icon e-pv-icon' });
        moreOptionsButton.appendChild(moreOptionsButtonSpan);
        moreOptionsButtonSpan.style.opacity = '0.87';
        commentTitleContainer.appendChild(moreOptionsButton);
        commentsDivElement.appendChild(commentTitleContainer);
        // eslint-disable-next-line
        var commentsContainer = commentsDivElement.parentElement;
        if (commentsContainer) {
            var author_1 = this.pdfViewer.annotationModule.updateAnnotationAuthor(annotationType, subType);
            commentsContainer.setAttribute('author', author_1);
        }
        if (!this.isCreateContextMenu) {
            this.createCommentContextMenu();
        }
        this.isCreateContextMenu = true;
        commentTitleContainer.addEventListener('dblclick', this.openTextEditor.bind(this));
        moreOptionsButton.addEventListener('mouseup', this.moreOptionsClick.bind(this));
        return annotationType;
    };
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.createReplyDivTitleContainer = function (commentsDivElement, modifiedDate, annotationAuthor) {
        // eslint-disable-next-line max-len
        var replyTitleContainer = createElement('div', { id: this.pdfViewer.element.id + '_replyTitleConatiner_' + this.commentsCount + '_' + this.commentsreplyCount, className: 'e-pv-reply-title-container' });
        // eslint-disable-next-line max-len
        var replyTitle = createElement('div', { id: this.pdfViewer.element.id + '_replyTitle_' + this.commentsCount + '_' + this.commentsreplyCount, className: 'e-pv-reply-title' });
        if (!modifiedDate) {
            replyTitle.textContent = annotationAuthor + ' - ' + this.setModifiedDate();
        }
        else {
            replyTitle.textContent = annotationAuthor + ' - ' + this.setExistingAnnotationModifiedDate(modifiedDate);
        }
        replyTitleContainer.appendChild(replyTitle);
        this.moreButtonId = this.pdfViewer.element.id + '_more-options_' + this.commentsCount + '_' + this.commentsreplyCount;
        // eslint-disable-next-line max-len
        var moreButton = createElement('button', { id: this.moreButtonId, className: 'e-pv-more-options-button e-btn', attrs: { 'tabindex': '-1' } });
        moreButton.style.visibility = 'hidden';
        moreButton.style.zIndex = '1001';
        moreButton.setAttribute('type', 'button');
        moreButton.setAttribute('aria-label', 'more button');
        // eslint-disable-next-line max-len
        var moreButtonSpan = createElement('span', { id: this.pdfViewer.element.id + '_more-options_icon', className: 'e-pv-more-icon e-pv-icon' });
        moreButton.appendChild(moreButtonSpan);
        moreButtonSpan.style.opacity = '0.87';
        replyTitleContainer.appendChild(moreButton);
        commentsDivElement.appendChild(replyTitleContainer);
        replyTitleContainer.addEventListener('dblclick', this.openTextEditor.bind(this));
        moreButton.addEventListener('mouseup', this.moreOptionsClick.bind(this));
    };
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.updateCommentIcon = function (commentSpan, annotationType, annotationSubType) {
        if (annotationType === 'sticky') {
            commentSpan.className = 'e-pv-comment-icon e-pv-icon';
        }
        else if (annotationType === 'stamp') {
            commentSpan.className = 'e-pv-stamp-icon e-pv-icon';
        }
        else if (annotationType === 'shape') {
            if (annotationSubType === 'Line') {
                commentSpan.className = 'e-pv-shape-line-icon e-pv-icon';
            }
            else if (annotationSubType === 'LineWidthArrowHead' || annotationSubType === 'Arrow') {
                commentSpan.className = 'e-pv-shape-arrow-icon e-pv-icon';
            }
            else if (annotationSubType === 'Circle' || annotationSubType === 'Ellipse' || annotationSubType === 'Oval') {
                commentSpan.className = 'e-pv-shape-circle-icon e-pv-icon';
            }
            else if (annotationSubType === 'Rectangle' || annotationSubType === 'Square') {
                commentSpan.className = 'e-pv-shape-rectangle-icon e-pv-icon';
            }
            else if (annotationSubType === 'Polygon') {
                commentSpan.className = 'e-pv-shape-pentagon-icon e-pv-icon';
            }
            else {
                commentSpan.className = 'e-pv-annotation-shape-icon e-pv-icon';
            }
        }
        else if (annotationType === 'measure') {
            if (annotationSubType === 'Distance' || annotationSubType === 'Distance calculation') {
                commentSpan.className = 'e-pv-calibrate-distance-icon e-pv-icon';
            }
            else if (annotationSubType === 'Perimeter' || annotationSubType === 'Perimeter calculation') {
                commentSpan.className = 'e-pv-calibrate-perimeter-icon e-pv-icon';
            }
            else if (annotationSubType === 'Radius' || annotationSubType === 'Radius calculation') {
                commentSpan.className = 'e-pv-calibrate-radius-icon e-pv-icon';
            }
            else if (annotationSubType === 'Area' || annotationSubType === 'Area calculation') {
                commentSpan.className = 'e-pv-calibrate-area-icon e-pv-icon';
            }
            else if (annotationSubType === 'Volume' || annotationSubType === 'Volume calculation') {
                commentSpan.className = 'e-pv-calibrate-volume-icon e-pv-icon';
            }
            else {
                commentSpan.className = 'e-pv-annotation-calibrate-icon e-pv-icon';
            }
        }
        else if (annotationType === 'textMarkup') {
            if (annotationSubType === 'Highlight') {
                commentSpan.className = 'e-pv-highlight-icon e-pv-icon';
            }
            else if (annotationSubType === 'Underline') {
                commentSpan.className = 'e-pv-underline-icon e-pv-icon';
            }
            else if (annotationSubType === 'Strikethrough') {
                commentSpan.className = 'e-pv-strikethrough-icon e-pv-icon';
            }
            else {
                commentSpan.className = 'e-pv-annotation-icon e-pv-icon';
            }
        }
        else if (annotationType === 'freeText') {
            commentSpan.className = 'e-pv-freetext-icon e-pv-icon';
        }
        else if (annotationType === 'ink' || annotationSubType === 'Ink') {
            commentSpan.className = 'e-pv-inkannotation-icon e-pv-icon';
        }
    };
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.updateStatusContainer = function (state, statusSpan, statusDiv, statusContainer) {
        if (state === 'Accepted') {
            statusDiv.style.backgroundColor = 'rgb(24,169,85)';
            statusSpan.className = 'e-pv-accepted-icon';
        }
        else if (state === 'Completed') {
            statusDiv.style.backgroundColor = 'rgb(0,122,255)';
            statusSpan.className = 'e-pv-completed-icon';
        }
        else if (state === 'Cancelled') {
            statusDiv.style.backgroundColor = 'rgb(245,103,0)';
            statusSpan.className = 'e-pv-cancelled-icon';
        }
        else if (state === 'Rejected') {
            statusDiv.style.backgroundColor = 'rgb(255,59,48)';
            statusSpan.className = 'e-pv-rejected-icon';
        }
        else {
            statusSpan.className = '';
            statusContainer.parentElement.removeChild(statusContainer);
        }
    };
    /**
     * @param removeDiv
     * @private
     */
    StickyNotesAnnotation.prototype.updateAccordionContainer = function (removeDiv) {
        // eslint-disable-next-line
        var pageNumber = parseInt(removeDiv.accessKey.split('_')[0]);
        var accordionContent = document.getElementById(this.pdfViewer.element.id + '_accordionContainer' + pageNumber);
        if (accordionContent) {
            accordionContent.parentElement.removeChild(accordionContent);
        }
        var accordionContentContainer = document.getElementById(this.pdfViewer.element.id + '_accordionContentContainer');
        if (accordionContentContainer) {
            if (accordionContentContainer.childElementCount === 0) {
                accordionContentContainer.style.display = 'none';
                if (document.getElementById(this.pdfViewer.element.id + '_commentsPanelText')) {
                    // eslint-disable-next-line max-len
                    this.pdfViewerBase.navigationPane.annotationMenuObj.enableItems([this.pdfViewer.localeObj.getConstant('Export Annotations')], false);
                    // eslint-disable-next-line max-len
                    this.pdfViewerBase.navigationPane.annotationMenuObj.enableItems([this.pdfViewer.localeObj.getConstant('Export XFDF')], false);
                    document.getElementById(this.pdfViewer.element.id + '_commentsPanelText').style.display = 'block';
                    this.updateCommentPanelTextTop();
                }
            }
        }
    };
    /**
     * @private
     */
    StickyNotesAnnotation.prototype.createCommentContextMenu = function () {
        // eslint-disable-next-line max-len
        this.commentContextMenu = [
            { text: this.pdfViewer.localeObj.getConstant('Edit') },
            { text: this.pdfViewer.localeObj.getConstant('Delete Context') },
            {
                // eslint-disable-next-line max-len
                text: this.pdfViewer.localeObj.getConstant('Set Status'), items: [{ text: this.pdfViewer.localeObj.getConstant('None') }, { text: this.pdfViewer.localeObj.getConstant('Accepted') }, { text: this.pdfViewer.localeObj.getConstant('Cancelled') }, { text: this.pdfViewer.localeObj.getConstant('Completed') }, { text: this.pdfViewer.localeObj.getConstant('Rejected') }]
            }
        ];
        var commentMenuElement = createElement('ul', { id: this.pdfViewer.element.id + '_comment_context_menu' });
        this.pdfViewer.element.appendChild(commentMenuElement);
        this.commentMenuObj = new Context({
            target: '#' + this.moreButtonId, items: this.commentContextMenu,
            beforeOpen: this.contextMenuBeforeOpen.bind(this),
            select: this.commentMenuItemSelect.bind(this)
        });
        if (this.pdfViewer.enableRtl) {
            this.commentMenuObj.enableRtl = true;
        }
        this.commentMenuObj.appendTo(commentMenuElement);
        if (Browser.isDevice && !this.pdfViewer.enableDesktopMode) {
            this.commentMenuObj.animationSettings.effect = 'ZoomIn';
        }
        else {
            this.commentMenuObj.animationSettings.effect = 'SlideDown';
        }
    };
    StickyNotesAnnotation.prototype.contextMenuBeforeOpen = function (args) {
        // eslint-disable-next-line
        var contextActiveDiv;
        // eslint-disable-next-line
        var contextDiv = document.querySelectorAll('.e-pv-more-options-button');
        if (contextDiv) {
            for (var i = 0; i < contextDiv.length; i++) {
                if (contextDiv[i].style.visibility === 'visible') {
                    contextActiveDiv = contextDiv[i].parentElement.nextSibling;
                }
            }
        }
        var isCommentLocked = this.checkIslockProperty(contextActiveDiv);
        if (isCommentLocked) {
            this.commentMenuObj.enableItems([this.pdfViewer.localeObj.getConstant('Edit')], false);
            this.commentMenuObj.enableItems([this.pdfViewer.localeObj.getConstant('Delete Context')], false);
        }
        else {
            this.commentMenuObj.enableItems([this.pdfViewer.localeObj.getConstant('Edit')], true);
            this.commentMenuObj.enableItems([this.pdfViewer.localeObj.getConstant('Delete Context')], true);
        }
    };
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.commentMenuItemSelect = function (args) {
        // eslint-disable-next-line
        var contextActiveDiv;
        // eslint-disable-next-line
        var contextDiv = document.querySelectorAll('.e-pv-more-options-button');
        if (contextDiv) {
            for (var i = 0; i < contextDiv.length; i++) {
                if (contextDiv[i].style.visibility === 'visible') {
                    contextActiveDiv = contextDiv[i].parentElement.nextSibling;
                }
            }
            if (args.item) {
                switch (args.item.text) {
                    case this.pdfViewer.localeObj.getConstant('Edit'):
                        // eslint-disable-next-line
                        var commentShow = document.querySelectorAll('.e-pv-new-comments-div');
                        for (var i = 0; i < commentShow.length; i++) {
                            commentShow[i].style.display = 'none';
                        }
                        contextActiveDiv.ej2_instances[0].enableEditMode = true;
                        break;
                    case this.pdfViewer.localeObj.getConstant('Delete Context'):
                        if (contextActiveDiv.parentElement.parentElement.firstChild === contextActiveDiv.parentElement) {
                            this.pdfViewer.annotationModule.deleteAnnotation();
                        }
                        else {
                            // eslint-disable-next-line max-len
                            this.modifyCommentDeleteProperty(contextActiveDiv.parentElement.parentElement, contextActiveDiv.parentElement);
                        }
                        break;
                    case this.pdfViewer.localeObj.getConstant('Set Status'):
                        break;
                    case this.pdfViewer.localeObj.getConstant('Accepted'):
                        if (contextActiveDiv.parentElement.lastChild.id === this.pdfViewer.element.id + 'status_container') {
                            contextActiveDiv.parentElement.lastChild.remove();
                        }
                        // eslint-disable-next-line max-len
                        var acceptedStatusDiv = createElement('div', { id: this.pdfViewer.element.id + 'status' + '_container', className: 'e-pv-status-container' });
                        // eslint-disable-next-line max-len
                        var statusDiv = createElement('div', { id: this.pdfViewer.element.id + 'status' + '_div', className: 'e-pv-status-div' });
                        var statusSpan = createElement('span', { id: this.pdfViewer.element.id + 'status' + '_icon', className: 'e-pv-accepted-icon' });
                        statusDiv.style.backgroundColor = 'rgb(24,169,85)';
                        statusDiv.appendChild(statusSpan);
                        acceptedStatusDiv.appendChild(statusDiv);
                        contextActiveDiv.parentElement.appendChild(acceptedStatusDiv);
                        this.modifyStatusProperty('Accepted', contextActiveDiv.parentElement);
                        break;
                    case this.pdfViewer.localeObj.getConstant('Completed'):
                        if (contextActiveDiv.parentElement.lastChild.id === this.pdfViewer.element.id + 'status_container') {
                            contextActiveDiv.parentElement.lastChild.remove();
                        }
                        // eslint-disable-next-line max-len
                        var completedStatusDiv = createElement('div', { id: this.pdfViewer.element.id + 'status' + '_container', className: 'e-pv-status-container' });
                        // eslint-disable-next-line max-len
                        var statusElement = createElement('div', { id: this.pdfViewer.element.id + 'status' + '_div', className: 'e-pv-status-div' });
                        // eslint-disable-next-line max-len
                        var statusOptionSpan = createElement('span', { id: this.pdfViewer.element.id + 'status' + '_icon', className: 'e-pv-completed-icon' });
                        statusElement.style.backgroundColor = 'rgb(0,122,255)';
                        statusElement.appendChild(statusOptionSpan);
                        completedStatusDiv.appendChild(statusElement);
                        contextActiveDiv.parentElement.appendChild(completedStatusDiv);
                        this.modifyStatusProperty('Completed', contextActiveDiv.parentElement);
                        break;
                    case this.pdfViewer.localeObj.getConstant('Cancelled'):
                        if (contextActiveDiv.parentElement.lastChild.id === this.pdfViewer.element.id + 'status_container') {
                            contextActiveDiv.parentElement.lastChild.remove();
                        }
                        // eslint-disable-next-line max-len
                        var cancelStatusDiv = createElement('div', { id: this.pdfViewer.element.id + 'status' + '_container', className: 'e-pv-status-container' });
                        // eslint-disable-next-line max-len
                        var cancelStatusElement = createElement('div', { id: this.pdfViewer.element.id + 'status' + '_div', className: 'e-pv-status-div' });
                        // eslint-disable-next-line max-len
                        var cancelStatusSpan = createElement('span', { id: this.pdfViewer.element.id + 'status' + '_icon', className: 'e-pv-cancelled-icon' });
                        cancelStatusElement.style.backgroundColor = 'rgb(245,103,0)';
                        cancelStatusElement.appendChild(cancelStatusSpan);
                        cancelStatusDiv.appendChild(cancelStatusElement);
                        contextActiveDiv.parentElement.appendChild(cancelStatusDiv);
                        this.modifyStatusProperty('Cancelled', contextActiveDiv.parentElement);
                        break;
                    case this.pdfViewer.localeObj.getConstant('Rejected'):
                        if (contextActiveDiv.parentElement.lastChild.id === this.pdfViewer.element.id + 'status_container') {
                            contextActiveDiv.parentElement.lastChild.remove();
                        }
                        // eslint-disable-next-line max-len
                        var rejectedStatusDiv = createElement('div', { id: this.pdfViewer.element.id + 'status' + '_container', className: 'e-pv-status-container' });
                        // eslint-disable-next-line max-len
                        var rejectedStatusElement = createElement('div', { id: this.pdfViewer.element.id + 'status' + '_div', className: 'e-pv-status-div' });
                        // eslint-disable-next-line max-len
                        var rejectedStatusSpan = createElement('span', { id: this.pdfViewer.element.id + 'status' + '_icon', className: 'e-pv-rejected-icon' });
                        rejectedStatusElement.style.backgroundColor = 'rgb(255,59,48)';
                        rejectedStatusElement.appendChild(rejectedStatusSpan);
                        rejectedStatusDiv.appendChild(rejectedStatusElement);
                        contextActiveDiv.parentElement.appendChild(rejectedStatusDiv);
                        this.modifyStatusProperty('Rejected', contextActiveDiv.parentElement);
                        break;
                    case this.pdfViewer.localeObj.getConstant('None'):
                        if (contextActiveDiv.parentElement.lastChild.id === this.pdfViewer.element.id + 'status_container') {
                            contextActiveDiv.parentElement.lastChild.remove();
                        }
                        this.modifyStatusProperty('None', contextActiveDiv.parentElement);
                        break;
                    default:
                        break;
                }
            }
        }
    };
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.moreOptionsClick = function (event, isMoreOptionClick) {
        if (document.getElementById(this.pdfViewer.element.id + '_comment_context_menu').style.display !== 'block') {
            this.pdfViewer.annotationModule.checkContextMenuDeleteItem(this.commentMenuObj);
            this.commentMenuObj.open(event.clientY, event.clientX, event.currentTarget);
        }
        if (this.pdfViewer.annotationModule && this.pdfViewer.annotationModule.inkAnnotationModule) {
            // eslint-disable-next-line
            var currentPageNumber = parseInt(this.pdfViewer.annotationModule.inkAnnotationModule.currentPageNumber);
            this.pdfViewer.annotationModule.inkAnnotationModule.drawInkAnnotation(currentPageNumber);
        }
    };
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.openTextEditor = function (event) {
        // eslint-disable-next-line
        var commentShow = document.querySelectorAll('.e-pv-new-comments-div');
        for (var i = 0; i < commentShow.length; i++) {
            commentShow[i].style.display = 'none';
        }
        var isCommentLocked = this.checkIslockProperty(event.currentTarget.nextSibling);
        if (isCommentLocked) {
            event.currentTarget.nextSibling.ej2_instances[0].enableEditMode = false;
        }
        else if (event.currentTarget.parentElement.parentElement) {
            var isLocked = this.checkAnnotationSettings(event.currentTarget.parentElement.parentElement.id);
            if (!isLocked) {
                event.currentTarget.nextSibling.ej2_instances[0].enableEditMode = true;
            }
        }
        else {
            event.currentTarget.nextSibling.ej2_instances[0].enableEditMode = true;
        }
    };
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.checkIslockProperty = function (commentEvent) {
        // eslint-disable-next-line
        var annotCollection = this.pdfViewer.annotationCollection;
        // eslint-disable-next-line
        var annotation;
        if (commentEvent.IsCommentLock) {
            return true;
        }
        // eslint-disable-next-line max-len
        if (this.pdfViewer.annotationModule.textMarkupAnnotationModule && this.pdfViewer.annotationModule.textMarkupAnnotationModule.currentTextMarkupAnnotation) {
            annotation = this.pdfViewer.annotationModule.textMarkupAnnotationModule.currentTextMarkupAnnotation;
        }
        else if (this.pdfViewer.selectedItems.annotations[0]) {
            annotation = this.pdfViewer.selectedItems.annotations[0];
        }
        for (var i = 0; i < annotCollection.length; i++) {
            // eslint-disable-next-line max-len
            var note = annotCollection[i].note ? annotCollection[i].note : annotCollection[i].notes;
            if (annotCollection[i].isCommentLock === true && (commentEvent.textContent === note || annotCollection[i].dynamicText === commentEvent.textContent)) {
                return true;
            }
            for (var j = 0; j < annotCollection[i].comments.length; j++) {
                if (annotation && annotCollection[i].annotationId === annotation.annotName) {
                    // eslint-disable-next-line max-len
                    if (annotCollection[i].comments[j].isLock === true && commentEvent.textContent === annotCollection[i].comments[j].note) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.openEditorElement = function (event) {
        // eslint-disable-next-line
        var commentShow = document.querySelectorAll('.e-pv-new-comments-div');
        for (var i = 0; i < commentShow.length; i++) {
            commentShow[i].style.display = 'none';
        }
        var isCommentLocked = this.checkIslockProperty(event.currentTarget);
        if (isCommentLocked) {
            event.currentTarget.ej2_instances[0].enableEditMode = false;
        }
        else if (event.currentTarget.parentElement.parentElement) {
            var isLocked = this.checkAnnotationSettings(event.currentTarget.parentElement.parentElement.id);
            if (!isLocked) {
                if (!isNullOrUndefined(this.pdfViewer.selectedItems) && this.pdfViewer.selectedItems.annotations[0] && this.pdfViewer.selectedItems.annotations[0].isReadonly) {
                    event.currentTarget.ej2_instances[0].enableEditMode = false;
                }
                else {
                    event.currentTarget.ej2_instances[0].enableEditMode = true;
                }
            }
        }
        else {
            event.currentTarget.ej2_instances[0].enableEditMode = true;
        }
    };
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.commentsDivClickEvent = function (event) {
        // eslint-disable-next-line
        var annotation = this.findAnnotationObject(event.currentTarget.parentElement.id);
        var isLocked = this.checkAnnotationSettings(event.currentTarget.parentElement.id);
        if (!isLocked) {
            var isCommentsSelect = false;
            if (event.clientX === 0 && event.clientY === 0) {
                this.isSetAnnotationType = true;
            }
            else {
                this.isSetAnnotationType = false;
            }
            if (event.target.className === 'e-pv-more-icon e-pv-icon') {
                return null;
            }
            // eslint-disable-next-line
            var x = document.querySelectorAll('.e-pv-more-options-button');
            for (var i = 0; i < x.length; i++) {
                x[i].style.visibility = 'hidden';
            }
            if (document.getElementById(this.pdfViewer.element.id + '_commantPanel').style.display === 'none') {
                this.pdfViewer.annotationModule.showCommentsPanel();
            }
            if (event.currentTarget.parentElement.classList.contains('e-pv-comments-border')) {
                isCommentsSelect = true;
            }
            event.currentTarget.firstChild.lastChild.style.visibility = 'visible';
            // eslint-disable-next-line
            var commentsContainer = document.querySelectorAll('.e-pv-comments-border');
            if (commentsContainer) {
                for (var j = 0; j < commentsContainer.length; j++) {
                    commentsContainer[j].classList.remove('e-pv-comments-border');
                }
            }
            event.currentTarget.parentElement.classList.add('e-pv-comments-border');
            // eslint-disable-next-line
            var commentShow = document.querySelectorAll('.e-pv-new-comments-div');
            for (var i = 0; i < commentShow.length; i++) {
                commentShow[i].style.display = 'none';
            }
            // eslint-disable-next-line
            var editElement = event.currentTarget.parentElement.lastChild;
            // eslint-disable-next-line
            var commentsElement = event.currentTarget.parentElement;
            if (editElement) {
                editElement.style.display = 'block';
                if (editElement.querySelector('.e-editable-inline')) {
                    if (!this.isEditableElement) {
                        editElement.querySelector('.e-editable-inline').style.display = 'block';
                    }
                    for (var i = 0; i < commentsElement.childElementCount; i++) {
                        // eslint-disable-next-line
                        var activeElement = commentsElement.childNodes[i];
                        // eslint-disable-next-line
                        var textElement = activeElement.querySelector('.e-editable-inline');
                        if (textElement) {
                            if (textElement.style.display === '') {
                                editElement.style.display = 'none';
                                editElement.querySelector('.e-editable-inline').style.display = 'none';
                            }
                        }
                    }
                }
                if (this.isSetAnnotationType) {
                    if (!isCommentsSelect) {
                        this.updateCommentsScrollTop();
                    }
                }
            }
            if (event.currentTarget.parentElement.childElementCount === 1) {
                if (!this.pdfViewer.enableShapeLabel) {
                    event.currentTarget.childNodes[1].ej2_instances[0].enableEditMode = true;
                }
                else {
                    var type = event.currentTarget.parentElement.getAttribute('name');
                    if (this.isSetAnnotationType && type === 'shape') {
                        event.currentTarget.childNodes[1].ej2_instances[0].enableEditMode = false;
                    }
                    else {
                        event.currentTarget.childNodes[1].ej2_instances[0].enableEditMode = true;
                    }
                }
            }
            var editModule = void 0;
            if (event && event.currentTarget && event.currentTarget.childNodes[1]) {
                editModule = event.currentTarget.childNodes[1].ej2_instances[0];
            }
            if (event.currentTarget && event.currentTarget.id && editModule) {
                // eslint-disable-next-line
                if (annotation && annotation.isCommentLock) {
                    editModule.enableEditMode = false;
                    this.createCommentDiv(event.currentTarget);
                }
                this.pdfViewer.fireCommentSelect(event.currentTarget.id, event.currentTarget.childNodes[1].ej2_instances[0].value, annotation);
            }
            this.commentDivOnSelect(event);
            event.preventDefault();
        }
    };
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.commentsDivDoubleClickEvent = function (event) {
        // eslint-disable-next-line
        var commentShow = document.querySelectorAll('.e-pv-new-comments-div');
        for (var i = 0; i < commentShow.length; i++) {
            commentShow[i].style.display = 'none';
        }
        var isCommentLocked = this.checkIslockProperty(event.currentTarget.children[1]);
        if (isCommentLocked) {
            if (event.currentTarget.childElementCount === 2) {
                event.currentTarget.lastChild.ej2_instances[0].enableEditMode = false;
            }
            else {
                event.currentTarget.childNodes[1].ej2_instances[0].enableEditMode = false;
            }
        }
        else if (event.currentTarget) {
            var isLocked = this.checkAnnotationSettings(event.currentTarget.parentElement.id);
            if (!isLocked) {
                if (event.currentTarget.childElementCount === 2) {
                    event.currentTarget.lastChild.ej2_instances[0].enableEditMode = true;
                }
                else {
                    event.currentTarget.childNodes[1].ej2_instances[0].enableEditMode = true;
                }
            }
        }
    };
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.commentDivOnSelect = function (event) {
        // eslint-disable-next-line
        var commentSelect = document.querySelectorAll('.e-pv-comments-select');
        for (var z = 0; z < commentSelect.length; z++) {
            commentSelect[z].classList.remove('e-pv-comments-select');
        }
        var activeElement = document.getElementById(event.currentTarget.id);
        if (activeElement) {
            activeElement.classList.remove('e-pv-comments-hover');
            activeElement.classList.remove('e-pv-comments-leave');
            activeElement.classList.add('e-pv-comments-select');
            if (event.currentTarget.nextSibling) {
                if (event.currentTarget.nextSibling.classList.contains('e-pv-new-comments-div')) {
                    var activeSiblingElement = document.getElementById(event.currentTarget.nextSibling.id);
                    activeSiblingElement.classList.remove('e-pv-comments-hover');
                    activeSiblingElement.classList.remove('e-pv-comments-leave');
                    activeSiblingElement.classList.add('e-pv-comments-select');
                }
            }
        }
    };
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.commentDivMouseOver = function (event) {
        var activeElement = document.getElementById(event.currentTarget.id);
        if (activeElement) {
            activeElement.classList.remove('e-pv-comments-select');
            activeElement.classList.remove('e-pv-comments-leave');
            activeElement.classList.add('e-pv-comments-hover');
            if (event.currentTarget.nextSibling) {
                if (event.currentTarget.nextSibling.classList.contains('e-pv-new-comments-div')) {
                    var activeSiblingElement = document.getElementById(event.currentTarget.nextSibling.id);
                    activeSiblingElement.classList.remove('e-pv-comments-select');
                    activeSiblingElement.classList.remove('e-pv-comments-leave');
                    activeSiblingElement.classList.add('e-pv-comments-hover');
                }
            }
        }
    };
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.commentDivMouseLeave = function (event) {
        var activeElement = document.getElementById(event.currentTarget.id);
        if (activeElement) {
            activeElement.classList.remove('e-pv-comments-hover');
            activeElement.classList.remove('e-pv-comments-select');
            activeElement.classList.add('e-pv-comments-leave');
            if (event.currentTarget.nextSibling) {
                if (event.currentTarget.nextSibling.classList.contains('e-pv-new-comments-div')) {
                    var activeSiblingElement = document.getElementById(event.currentTarget.nextSibling.id);
                    activeSiblingElement.classList.remove('e-pv-comments-hover');
                    activeSiblingElement.classList.remove('e-pv-comments-select');
                    activeSiblingElement.classList.add('e-pv-comments-leave');
                }
            }
        }
    };
    /**
     * @param event
     * @private
     */
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.drawIcons = function (event) {
        // eslint-disable-next-line
        if (this.pdfViewerBase.isCommentIconAdded) {
            var pageIndex = this.pdfViewer.annotation.getEventPageNumber(event);
            var pageCurrentRect = this.pdfViewerBase.getElement('_pageDiv_' + pageIndex).getBoundingClientRect();
            var zoomValue = this.pdfViewerBase.getZoomFactor();
            this.pdfViewer.annotationModule.isFormFieldShape = false;
            // eslint-disable-next-line max-len
            this.pdfViewer.annotation.stickyNotesAnnotationModule.drawStickyNotes((event.clientX - pageCurrentRect.left) / zoomValue, (event.clientY - pageCurrentRect.top) / zoomValue, 30, 30, pageIndex, null);
            this.pdfViewerBase.isCommentIconAdded = false;
            var commentsButton = document.getElementById(this.pdfViewer.element.id + '_comment');
            if (isBlazor()) {
                commentsButton = commentsButton.children[0];
            }
            if (commentsButton && commentsButton.classList.contains('e-pv-select')) {
                commentsButton.classList.remove('e-pv-select');
            }
            else {
                var commentsIcon = document.getElementById(this.pdfViewer.element.id + '_commentIcon');
                if (commentsIcon) {
                    this.pdfViewer.enableRtl ? commentsIcon.className = 'e-pv-comment-icon e-pv-icon e-icon-left e-right' : commentsIcon.className = 'e-pv-comment-icon e-pv-icon e-icon-left';
                }
            }
        }
    };
    /**
     * @param annotationType
     * @param pageNumber
     * @param annotationSubType
     * @param annotationType
     * @param pageNumber
     * @param annotationSubType
     * @param annotationType
     * @param pageNumber
     * @param annotationSubType
     * @private
     */
    StickyNotesAnnotation.prototype.addComments = function (annotationType, pageNumber, annotationSubType) {
        var commentsDivid;
        // eslint-disable-next-line max-len
        var accordion = document.getElementById(this.pdfViewer.element.id + '_accordionContainer' + pageNumber);
        if (accordion) {
            // eslint-disable-next-line max-len
            commentsDivid = this.pdfViewer.annotation.stickyNotesAnnotationModule.createCommentControlPanel(null, pageNumber, annotationType, annotationSubType);
        }
        else {
            this.pdfViewer.annotation.stickyNotesAnnotationModule.createPageAccordion(pageNumber);
            // eslint-disable-next-line max-len
            commentsDivid = this.pdfViewer.annotation.stickyNotesAnnotationModule.createCommentControlPanel(null, pageNumber, annotationType, annotationSubType);
        }
        return commentsDivid;
    };
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.commentsAnnotationSelect = function (event) {
        var element = event.currentTarget;
        var isLocked = this.checkAnnotationSettings(element.id);
        // When the isLock is set to true, it comes and checks whether the allowedInteractions is select and set the isLock to false, In that case if enters the condition and makes the comment panel to editable mode. So, have removed the condition in openEditorElement, commentsDivClickEvent, openTextEditor,commentAnnotationSelect methods. (Task id: 835410)
        if (!isLocked) {
            if (element.classList.contains('e-pv-comments-border')) {
                // eslint-disable-next-line
                var commentsDiv = document.querySelectorAll('.e-pv-comments-div');
                for (var j = 0; j < commentsDiv.length; j++) {
                    commentsDiv[j].style.minHeight = 60 + 'px';
                }
                if (event.currentTarget.childElementCount === 1) {
                    if (event.currentTarget.childNodes[0].querySelector('.e-editable-inline')) {
                        event.currentTarget.childNodes[0].style.minHeight = event.currentTarget.childNodes[0].clientHeight;
                    }
                }
            }
            if (event.target.className === 'e-pv-more-icon e-pv-icon' || event.target.className === 'e-pv-more-options-button e-btn') {
                event.preventDefault();
                return null;
            }
            // eslint-disable-next-line
            var pageNumber = parseInt(element.accessKey.split('_')[0]);
            if (!element.classList.contains('e-pv-comments-border')) {
                // eslint-disable-next-line
                var commentsContainer = document.querySelectorAll('.e-pv-comments-border');
                if (commentsContainer) {
                    for (var j = 0; j < commentsContainer.length; j++) {
                        commentsContainer[j].classList.remove('e-pv-comments-border');
                    }
                }
                var commentsDiv = document.getElementById(element.id);
                if (commentsDiv) {
                    // eslint-disable-next-line
                    document.querySelectorAll('.e-pv-more-options-button[style*="visibility: visible"]').forEach(function (moreButton) { return moreButton.style.visibility = 'hidden'; });
                    if (event.target.className === 'e-editable-value-wrapper') {
                        event.target.parentElement.parentElement.firstChild.lastChild.style.visibility = 'visible';
                    }
                    else if (event.target.className === 'e-pv-reply-title' || event.target.className === 'e-pv-comment-title') {
                        event.target.parentElement.lastChild.style.visibility = 'visible';
                    }
                    else if (event.target.className === 'e-editable-value') {
                        event.target.parentElement.parentElement.parentElement.firstChild.lastChild.style.visibility = 'visible';
                    }
                    commentsDiv.classList.add('e-pv-comments-border');
                }
                // eslint-disable-next-line
                var commentTextBox = document.querySelectorAll('.e-pv-new-comments-div');
                for (var j = 0; j < commentTextBox.length; j++) {
                    commentTextBox[j].style.display = 'none';
                }
                if (commentsDiv) {
                    // eslint-disable-next-line
                    var currentTextBox = commentsDiv.querySelector('.e-pv-new-comments-div');
                    if (currentTextBox) {
                        currentTextBox.style.display = 'block';
                    }
                }
                // eslint-disable-next-line
                var textDiv = element.lastChild;
                this.isEditableElement = false;
                if (textDiv.querySelector('.e-editable-inline')) {
                    textDiv.style.display = 'block';
                    textDiv.querySelector('.e-editable-inline').style.display = 'block';
                    for (var i = 0; i < element.childElementCount; i++) {
                        // eslint-disable-next-line
                        var activeElement = element.childNodes[i];
                        // eslint-disable-next-line
                        var textElement = activeElement.querySelector('.e-editable-inline');
                        if (textElement) {
                            if (textElement.style.display === '') {
                                if (textDiv.classList.contains('e-pv-new-comments-div')) {
                                    this.isEditableElement = true;
                                    textDiv.style.display = 'none';
                                    textDiv.querySelector('.e-editable-inline').style.display = 'none';
                                }
                            }
                        }
                    }
                }
                this.isSetAnnotationType = false;
                if (event.currentTarget.childElementCount === 1) {
                    event.currentTarget.childNodes[0].childNodes[1].ej2_instances[0].enableEditMode = true;
                }
            }
            else {
                this.isSetAnnotationType = true;
            }
            if (!this.isSetAnnotationType) {
                if (this.pdfViewer.navigation) {
                    this.pdfViewer.navigationModule.goToPage(pageNumber);
                }
                var annotType = element.getAttribute('name');
                if (annotType === 'null' || annotType === 'Ink') {
                    annotType = 'ink';
                }
                this.isCommentsSelected = false;
                this.setAnnotationType(element.id, annotType, pageNumber);
                if (!this.isCommentsSelected) {
                    this.selectAnnotationObj = { id: element.id, annotType: annotType, pageNumber: pageNumber };
                }
            }
        }
        else {
            var pageNumber = parseInt(element.accessKey.split('_')[0]);
            if (this.pdfViewer.navigation) {
                this.pdfViewer.navigationModule.goToPage(pageNumber);
            }
            var annotType = element.getAttribute('name');
            if (annotType === 'null' || annotType === 'Ink') {
                annotType = 'ink';
            }
            this.isCommentsSelected = false;
            this.setAnnotationType(element.id, annotType, pageNumber);
            if (!this.isCommentsSelected) {
                this.selectAnnotationObj = { id: element.id, annotType: annotType, pageNumber: pageNumber };
            }
        }
        this.isSetAnnotationType = false;
    };
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.findAnnotationObject = function (id) {
        // eslint-disable-next-line max-len
        if (this.pdfViewer.annotationModule.textMarkupAnnotationModule && this.pdfViewer.annotationModule.textMarkupAnnotationModule.currentTextMarkupAnnotation) {
            return this.pdfViewer.annotationModule.textMarkupAnnotationModule.currentTextMarkupAnnotation;
        }
        else if (this.pdfViewer.selectedItems.annotations[0]) {
            return this.pdfViewer.selectedItems.annotations[0];
        }
        // eslint-disable-next-line
        var annotationCollection = this.pdfViewer.annotationCollection;
        if (annotationCollection) {
            for (var i = 0; i < annotationCollection.length; i++) {
                if (annotationCollection[i].annotationId && (annotationCollection[i].annotationId === id)) {
                    if (annotationCollection[i].shapeAnnotationType === 'textMarkup') {
                        return annotationCollection[i];
                    }
                    else {
                        annotationCollection = this.pdfViewer.annotations;
                        for (var j = 0; j < annotationCollection.length; j++) {
                            if (annotationCollection[j].annotName && (annotationCollection[j].annotName === id)) {
                                return annotationCollection[j];
                            }
                        }
                    }
                }
            }
        }
    };
    StickyNotesAnnotation.prototype.checkAnnotationSettings = function (id) {
        // eslint-disable-next-line
        var annotationCollection = this.pdfViewer.annotationCollection;
        if (annotationCollection) {
            for (var i = 0; i < annotationCollection.length; i++) {
                if (annotationCollection[i].annotationId && (annotationCollection[i].annotationId === id)) {
                    if (annotationCollection[i].annotationSettings && annotationCollection[i].annotationSettings.isLock) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }
            return false;
        }
        else {
            return false;
        }
    };
    StickyNotesAnnotation.prototype.updateCommentsContainerWidth = function () {
        var accordionContainer = document.getElementById(this.pdfViewer.element.id + '_accordionContentContainer');
        var commentsContentContainer = document.getElementById(this.pdfViewer.element.id + '_commentscontentcontainer');
        accordionContainer.style.width = commentsContentContainer.clientWidth + 'px';
    };
    /**
     * @param pageIndex
     * @private
     */
    StickyNotesAnnotation.prototype.selectCommentsAnnotation = function (pageIndex) {
        if (this.selectAnnotationObj && !this.isCommentsSelected) {
            if ((this.selectAnnotationObj.pageNumber - 1) === pageIndex) {
                // eslint-disable-next-line max-len
                this.setAnnotationType(this.selectAnnotationObj.id, this.selectAnnotationObj.annotType, this.selectAnnotationObj.pageNumber);
                this.selectAnnotationObj = null;
                this.isCommentsSelected = true;
            }
        }
    };
    StickyNotesAnnotation.prototype.setAnnotationType = function (id, type, pageNumber) {
        var typeString = (type === 'measure') ? 'shape_measure' : type;
        if (typeString === 'freeText') {
            typeString = 'freetext';
        }
        // eslint-disable-next-line
        var storeCommentObject = window.sessionStorage.getItem(this.pdfViewerBase.documentId + '_annotations_' + typeString);
        if (this.pdfViewerBase.isStorageExceed) {
            storeCommentObject = this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_' + typeString];
        }
        if (storeCommentObject) {
            var annotationCommentObject = JSON.parse(storeCommentObject);
            // eslint-disable-next-line
            var annotation = this.pdfViewer.selectedItems.annotations[0];
            // eslint-disable-next-line max-len
            var index = this.pdfViewer.annotationModule.
                getPageCollection(annotationCommentObject, (pageNumber - 1));
            if (annotationCommentObject[index]) {
                // eslint-disable-next-line
                var pageCollections = annotationCommentObject[index].annotations;
                for (var i = 0; i < pageCollections.length; i++) {
                    var currentSelector = pageCollections[i].annotationSelectorSettings;
                    if (pageCollections[i].annotName === id) {
                        if (annotation) {
                            this.pdfViewer.fireAnnotationUnSelect(annotation.annotName, annotation.pageIndex, annotation);
                        }
                        this.pdfViewer.clearSelection(pageNumber - 1);
                        if (type === 'textMarkup') {
                            // eslint-disable-next-line max-len
                            this.pdfViewer.annotationModule.textMarkupAnnotationModule.clearCurrentAnnotationSelection(pageNumber - 1, true);
                            // eslint-disable-next-line max-len
                            var canvas = this.pdfViewerBase.getElement('_annotationCanvas_' + (pageNumber - 1));
                            this.pdfViewer.annotationModule.textMarkupAnnotationModule.selectAnnotation(pageCollections[i], canvas, (pageNumber - 1));
                            this.pdfViewer.annotation.textMarkupAnnotationModule.currentTextMarkupAnnotation = pageCollections[i];
                            this.pdfViewer.annotation.textMarkupAnnotationModule.selectTextMarkupCurrentPage = pageNumber - 1;
                            this.pdfViewer.annotation.textMarkupAnnotationModule.enableAnnotationPropertiesTool(true);
                            if (this.pdfViewer.toolbarModule && this.pdfViewer.enableAnnotationToolbar) {
                                this.pdfViewer.toolbarModule.annotationToolbarModule.isToolbarHidden = true;
                                // eslint-disable-next-line max-len
                                this.pdfViewer.toolbarModule.annotationToolbarModule.showAnnotationToolbar(this.pdfViewer.toolbarModule.annotationItem);
                            }
                        }
                        else if (type === 'stamp') {
                            this.pdfViewer.select([pageCollections[i].randomId], currentSelector);
                            this.pdfViewer.annotation.onAnnotationMouseDown();
                        }
                        else if (type === 'sticky') {
                            this.pdfViewer.select([pageCollections[i].annotName], currentSelector);
                            this.pdfViewer.annotation.onAnnotationMouseDown();
                        }
                        else if (type === 'ink') {
                            this.pdfViewer.select([pageCollections[i].id], currentSelector);
                            this.pdfViewer.annotation.onAnnotationMouseDown();
                        }
                        else {
                            this.pdfViewer.select([pageCollections[i].id], currentSelector);
                            this.pdfViewer.annotation.onAnnotationMouseDown();
                        }
                        if (type === 'textMarkup') {
                            if (pageCollections[i].rect || pageCollections[i].bounds) {
                                // eslint-disable-next-line max-len
                                var scrollValue = this.pdfViewerBase.pageSize[pageNumber - 1].top * this.pdfViewerBase.getZoomFactor() + (this.pdfViewer.annotationModule.getAnnotationTop(pageCollections[i]) * this.pdfViewerBase.getZoomFactor());
                                if (scrollValue) {
                                    var scroll_1 = (scrollValue - 20).toString();
                                    // eslint-disable-next-line radix
                                    this.pdfViewerBase.viewerContainer.scrollTop = parseInt(scroll_1);
                                }
                            }
                        }
                        else {
                            var top_1 = pageCollections[i].bounds.top;
                            if (type === 'ink') {
                                top_1 = pageCollections[i].bounds.y;
                            }
                            // eslint-disable-next-line max-len
                            var scrollValue = this.pdfViewerBase.pageSize[pageNumber - 1].top * this.pdfViewerBase.getZoomFactor() + ((top_1) * this.pdfViewerBase.getZoomFactor());
                            var scroll_2 = (scrollValue - 20).toString();
                            // eslint-disable-next-line radix
                            this.pdfViewerBase.viewerContainer.scrollTop = parseInt(scroll_2);
                        }
                        this.isCommentsSelected = true;
                    }
                }
            }
        }
    };
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.modifyTextProperty = function (text, previousValue, annotationName) {
        // eslint-disable-next-line
        var currentAnnotation;
        var module = this.pdfViewer.annotationModule.textMarkupAnnotationModule;
        if (module && module.currentTextMarkupAnnotation) {
            currentAnnotation = this.pdfViewer.annotationModule.textMarkupAnnotationModule.currentTextMarkupAnnotation;
        }
        if (currentAnnotation) {
            if (currentAnnotation.annotName !== annotationName) {
                currentAnnotation = this.pdfViewer.selectedItems.annotations[0];
            }
        }
        else {
            currentAnnotation = this.pdfViewer.selectedItems.annotations[0];
        }
        if (isNullOrUndefined(currentAnnotation) && annotationName) {
            currentAnnotation = this.pdfViewer.annotationCollection.filter(function (annot) { return annot.annotationId === annotationName; })[0];
        }
        if (annotationName && (currentAnnotation.annotName !== annotationName)) {
            for (var i = 0; i < this.pdfViewer.annotations.length; i++) {
                if (annotationName === this.pdfViewer.annotations[i].annotName) {
                    currentAnnotation = this.pdfViewer.annotations[i];
                    break;
                }
            }
        }
        if (currentAnnotation) {
            // eslint-disable-next-line
            var commentsDiv = document.getElementById(currentAnnotation.annotName);
            if (commentsDiv) {
                // eslint-disable-next-line
                var pageNumber = void 0;
                if (commentsDiv.accessKey.split('_')[0]) {
                    // eslint-disable-next-line
                    pageNumber = parseInt(commentsDiv.accessKey.split('_')[0]);
                }
                else {
                    pageNumber = this.pdfViewerBase.currentPageNumber;
                }
                var type = commentsDiv.getAttribute('name');
                var pageIndex = pageNumber - 1;
                // eslint-disable-next-line
                var pageAnnotations = void 0;
                var isMeasure = false;
                // eslint-disable-next-line max-len
                if (currentAnnotation.shapeAnnotationType === 'FreeText' || (this.pdfViewer.enableShapeLabel && (type === 'shape' || type === 'shape_measure'))) {
                    var isTextAdded = false;
                    if (annotationName) {
                        if (currentAnnotation.annotName !== annotationName) {
                            this.pdfViewer.annotation.modifyDynamicTextValue(text, annotationName);
                            isTextAdded = true;
                        }
                    }
                    if (!isTextAdded) {
                        if (currentAnnotation.shapeAnnotationType === 'FreeText') {
                            if (currentAnnotation.dynamicText !== text) {
                                this.textFromCommentPanel = true;
                                this.pdfViewer.annotation.modifyDynamicTextValue(text, currentAnnotation.annotName);
                            }
                            currentAnnotation.dynamicText = text;
                        }
                        else {
                            this.pdfViewer.annotation.modifyDynamicTextValue(text, currentAnnotation.annotName);
                            currentAnnotation.labelContent = text;
                            currentAnnotation.notes = text;
                        }
                        this.pdfViewer.nodePropertyChange(currentAnnotation, {});
                    }
                }
                if (currentAnnotation.measureType && currentAnnotation.measureType !== '') {
                    pageAnnotations = this.getAnnotations(pageIndex, null, 'shape_measure');
                    isMeasure = true;
                }
                else {
                    pageAnnotations = this.getAnnotations(pageIndex, null, currentAnnotation.shapeAnnotationType);
                }
                if (pageAnnotations !== null && currentAnnotation.shapeAnnotationType !== 'FreeText') {
                    for (var i = 0; i < pageAnnotations.length; i++) {
                        if (pageAnnotations[i].annotName === currentAnnotation.annotName) {
                            // eslint-disable-next-line
                            var clonedObject = cloneObject(pageAnnotations[i]);
                            if (text !== null) {
                                if (pageAnnotations[i].note !== text) {
                                    // eslint-disable-next-line max-len
                                    this.pdfViewer.annotation.addAction(pageIndex, i, pageAnnotations[i], 'Text Property Added', '', clonedObject, pageAnnotations[i]);
                                    currentAnnotation = pageAnnotations[i];
                                    currentAnnotation.note = text;
                                    if (currentAnnotation.enableShapeLabel) {
                                        currentAnnotation.labelContent = text;
                                    }
                                    // eslint-disable-next-line max-len
                                    currentAnnotation.modifiedDate = this.getDateAndTime();
                                    if (!isMeasure) {
                                        this.updateUndoRedoCollections(currentAnnotation, pageIndex);
                                    }
                                    else {
                                        this.updateUndoRedoCollections(currentAnnotation, pageIndex, 'shape_measure');
                                    }
                                    if (!previousValue || previousValue === '') {
                                        // eslint-disable-next-line max-len
                                        this.pdfViewer.fireCommentAdd(currentAnnotation.annotName, currentAnnotation.note, currentAnnotation);
                                    }
                                    else {
                                        // eslint-disable-next-line max-len
                                        this.pdfViewer.fireCommentEdit(currentAnnotation.annotName, currentAnnotation.note, currentAnnotation);
                                    }
                                    return currentAnnotation;
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    /**
     * @param date
     * @private
     */
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.getDateAndTime = function (date) {
        if (!date) {
            date = new Date();
        }
        this.globalize = new Internationalization();
        var dateOptions = { format: this.pdfViewer.dateTimeFormat, type: 'dateTime' };
        // eslint-disable-next-line
        var dateTime = this.globalize.formatDate(new Date(date), dateOptions);
        return dateTime;
    };
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.modifyCommentsProperty = function (text, annotName, parentElement, previousValue) {
        // eslint-disable-next-line
        var currentAnnotation;
        if (this.pdfViewer.annotationModule.textMarkupAnnotationModule.currentTextMarkupAnnotation) {
            currentAnnotation = this.pdfViewer.annotationModule.textMarkupAnnotationModule.currentTextMarkupAnnotation;
        }
        else {
            currentAnnotation = this.pdfViewer.selectedItems.annotations[0];
        }
        if (currentAnnotation) {
            // eslint-disable-next-line
            var commentsDiv = document.getElementById(currentAnnotation.annotName);
            // eslint-disable-next-line
            var pageNumber = parseInt(commentsDiv.accessKey.split('_')[0]);
            var pageIndex = pageNumber - 1;
            // eslint-disable-next-line
            var pageAnnotations = void 0;
            var isMeasure = false;
            var author = this.getAuthorName(currentAnnotation, commentsDiv);
            if (currentAnnotation.measureType && currentAnnotation.measureType !== '') {
                pageAnnotations = this.getAnnotations(pageIndex, null, 'shape_measure');
                isMeasure = true;
            }
            else {
                pageAnnotations = this.getAnnotations(pageIndex, null, currentAnnotation.shapeAnnotationType);
            }
            if (pageAnnotations !== null) {
                for (var i = 0; i < pageAnnotations.length; i++) {
                    if (pageAnnotations[i].annotName === currentAnnotation.annotName) {
                        currentAnnotation = pageAnnotations[i];
                    }
                }
            }
            // eslint-disable-next-line
            var clonedObject = cloneObject(currentAnnotation);
            if (currentAnnotation.comments.length > 0) {
                var isComment = false;
                for (var j = 0; j < currentAnnotation.comments.length; j++) {
                    if (currentAnnotation.comments[j].annotName === annotName) {
                        isComment = true;
                        currentAnnotation.comments[j].note = text;
                        // eslint-disable-next-line max-len
                        currentAnnotation.comments[j].modifiedDate = this.getDateAndTime();
                    }
                }
                // eslint-disable-next-line max-len
                var newArray = { annotName: annotName, parentId: parentElement, subject: 'Comments', comments: [], author: author, note: text, shapeAnnotationType: '', state: '', stateModel: '', modifiedDate: this.getDateAndTime(), review: { state: '', stateModel: '', modifiedDate: this.getDateAndTime(), author: author }, isLock: false };
                if (!isComment) {
                    currentAnnotation.comments[currentAnnotation.comments.length] = newArray;
                }
            }
            else {
                // eslint-disable-next-line max-len
                var newArray = { annotName: annotName, parentId: parentElement, subject: 'Comments', comments: [], author: author, note: text, shapeAnnotationType: '', state: '', stateModel: '', modifiedDate: this.getDateAndTime(), review: { state: '', stateModel: '', modifiedDate: this.getDateAndTime(), author: author }, isLock: false };
                currentAnnotation.comments[currentAnnotation.comments.length] = newArray;
            }
            // eslint-disable-next-line max-len
            this.pdfViewer.annotation.addAction(pageIndex, null, currentAnnotation, 'Comments Property Added', '', clonedObject, currentAnnotation);
            if (!isMeasure) {
                this.updateUndoRedoCollections(currentAnnotation, pageIndex);
            }
            else {
                this.updateUndoRedoCollections(currentAnnotation, pageIndex, 'shape_measure');
            }
        }
        if (previousValue !== undefined) {
            this.pdfViewer.fireCommentEdit(annotName, text, currentAnnotation);
        }
        else {
            this.pdfViewer.fireCommentAdd(annotName, text, currentAnnotation);
        }
    };
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.modifyStatusProperty = function (text, statusElement) {
        // eslint-disable-next-line
        var currentAnnotation;
        if (this.pdfViewer.annotation.textMarkupAnnotationModule.currentTextMarkupAnnotation) {
            currentAnnotation = this.pdfViewer.annotation.textMarkupAnnotationModule.currentTextMarkupAnnotation;
        }
        else {
            currentAnnotation = this.pdfViewer.selectedItems.annotations[0];
        }
        if (currentAnnotation) {
            // eslint-disable-next-line
            var commentsDiv = document.getElementById(currentAnnotation.annotName);
            // eslint-disable-next-line
            var pageNumber = parseInt(commentsDiv.accessKey.split('_')[0]);
            var pageIndex = pageNumber - 1;
            // eslint-disable-next-line
            var pageAnnotations = void 0;
            var isMeasure = false;
            var author = commentsDiv.getAttribute('author');
            if (currentAnnotation.measureType && currentAnnotation.measureType !== '') {
                pageAnnotations = this.getAnnotations(pageIndex, null, 'shape_measure');
                isMeasure = true;
            }
            else {
                pageAnnotations = this.getAnnotations(pageIndex, null, currentAnnotation.shapeAnnotationType);
            }
            if (pageAnnotations !== null) {
                for (var i = 0; i < pageAnnotations.length; i++) {
                    if (pageAnnotations[i].annotName === currentAnnotation.annotName) {
                        currentAnnotation = pageAnnotations[i];
                    }
                }
            }
            // eslint-disable-next-line
            var clonedObject = cloneObject(currentAnnotation);
            if (statusElement.parentElement.firstChild.id === statusElement.id) {
                // eslint-disable-next-line max-len
                currentAnnotation.review = { state: text, stateModel: 'Review', author: author, modifiedDate: this.getDateAndTime(), annotId: statusElement.id };
                currentAnnotation.state = text;
                currentAnnotation.stateModel = 'Review';
                // eslint-disable-next-line max-len
                this.pdfViewer.annotation.addAction(pageIndex, null, currentAnnotation, 'Status Property Added', '', clonedObject, currentAnnotation);
                this.pdfViewer.fireCommentStatusChanged(statusElement.id, currentAnnotation.note, currentAnnotation, currentAnnotation.state);
            }
            else {
                for (var j = 0; j < currentAnnotation.comments.length; j++) {
                    if (currentAnnotation.comments[j].annotName === statusElement.id) {
                        // eslint-disable-next-line
                        var clonedObj = cloneObject(currentAnnotation.comments[j]);
                        currentAnnotation.comments[j].state = text;
                        currentAnnotation.comments[j].stateModel = 'Review';
                        // eslint-disable-next-line max-len
                        currentAnnotation.comments[j].review = { state: text, stateModel: 'Review', author: author, modifiedDate: this.getDateAndTime(), annotId: statusElement.id };
                        // eslint-disable-next-line max-len
                        this.pdfViewer.annotation.addAction(pageIndex, null, currentAnnotation, 'Status Property Added', '', clonedObj, currentAnnotation.comments[j]);
                        this.pdfViewer.fireCommentStatusChanged(currentAnnotation.comments[j].annotName, currentAnnotation.comments[j].note, currentAnnotation, currentAnnotation.comments[j].state);
                    }
                }
            }
            if (!isMeasure) {
                this.updateUndoRedoCollections(currentAnnotation, pageIndex);
            }
            else {
                this.updateUndoRedoCollections(currentAnnotation, pageIndex, 'shape_measure');
            }
        }
    };
    /**
     * @param commentsElement
     * @param replyElement
     * @private
     */
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.modifyCommentDeleteProperty = function (commentsElement, replyElement) {
        // eslint-disable-next-line
        var clonedObject;
        // eslint-disable-next-line
        var clonedAnnotation;
        // eslint-disable-next-line
        var currentAnnotation;
        // eslint-disable-next-line
        var commentsParentElement = document.getElementById(commentsElement.id);
        if (commentsParentElement) {
            // eslint-disable-next-line
            var pageNumber = parseInt(commentsParentElement.accessKey.split('_')[0]);
            var pageIndex = pageNumber - 1;
            var annotType = commentsElement.getAttribute('name');
            // eslint-disable-next-line
            var pageAnnotations = this.getAnnotations(pageIndex, null, annotType);
            if (pageAnnotations !== null) {
                for (var i = 0; i < pageAnnotations.length; i++) {
                    if (pageAnnotations[i].annotName === commentsElement.id) {
                        currentAnnotation = pageAnnotations[i];
                    }
                }
            }
            for (var i = 1; i < commentsParentElement.childElementCount; i++) {
                if (commentsParentElement.childNodes[i].id === replyElement.id) {
                    clonedAnnotation = cloneObject(currentAnnotation);
                    var positionValue = (i - 1);
                    currentAnnotation.comments[positionValue].position = i;
                    clonedObject = cloneObject(currentAnnotation.comments[positionValue]);
                    // eslint-disable-next-line max-len
                    this.pdfViewer.fireCommentDelete(currentAnnotation.comments[positionValue].annotName, currentAnnotation.comments[positionValue].note, currentAnnotation);
                    currentAnnotation.comments.splice(positionValue, 1);
                    replyElement.remove();
                }
            }
            // eslint-disable-next-line max-len
            this.pdfViewer.annotation.addAction(pageIndex, null, clonedAnnotation, 'Comments Reply Deleted', '', clonedObject, currentAnnotation);
            this.updateUndoRedoCollections(currentAnnotation, pageIndex);
        }
    };
    /**
     * @param annotation
     * @private
     */
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.updateOpacityValue = function (annotation) {
        // eslint-disable-next-line
        var pageAnnotations = this.getAnnotations(annotation.pageIndex, null, annotation.shapeAnnotationType);
        this.pdfViewer.annotationModule.isFormFieldShape = false;
        if (pageAnnotations !== null) {
            for (var i = 0; i < pageAnnotations.length; i++) {
                if (pageAnnotations[i].annotName === annotation.annotName) {
                    pageAnnotations[i].opacity = annotation.opacity;
                    this.updateUndoRedoCollections(pageAnnotations[i], annotation.pageIndex);
                }
            }
        }
    };
    /**
     * @param annotation
     * @param isAction
     * @param undoAnnotation
     * @param annotation
     * @param isAction
     * @param undoAnnotation
     * @param annotation
     * @param isAction
     * @param undoAnnotation
     * @private
     */
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.undoAction = function (annotation, isAction, undoAnnotation) {
        if (isAction === 'Text Property Added') {
            if (annotation) {
                // eslint-disable-next-line
                var commentsMainDiv = document.getElementById(annotation.annotName);
                if (commentsMainDiv) {
                    // eslint-disable-next-line
                    var pageNumber = parseInt(commentsMainDiv.accessKey.split('_')[0]);
                    var pageIndex = pageNumber - 1;
                    // eslint-disable-next-line
                    var clonedAnnotationObject = cloneObject(annotation);
                    commentsMainDiv.firstChild.firstChild.nextSibling.ej2_instances[0].value = undoAnnotation.note;
                    var value = undoAnnotation.note;
                    annotation.note = value;
                    if (commentsMainDiv.childElementCount === 2) {
                        commentsMainDiv.lastChild.style.display = 'block';
                    }
                    this.updateUndoRedoCollections(annotation, pageIndex);
                    return clonedAnnotationObject;
                }
            }
        }
        else if (isAction === 'Comments Property Added') {
            if (annotation.comments.length > 0) {
                // eslint-disable-next-line
                var commentsDiv = document.getElementById(annotation.annotName);
                var pageIndex = this.pdfViewerBase.currentPageNumber - 1;
                if (commentsDiv) {
                    // eslint-disable-next-line
                    var pageNumber = parseInt(commentsDiv.accessKey.split('_')[0]);
                    pageIndex = pageNumber - 1;
                }
                // eslint-disable-next-line
                var clonedAnnotationObject = cloneObject(annotation);
                // eslint-disable-next-line
                var comment = annotation.comments[annotation.comments.length - 1];
                // eslint-disable-next-line
                var removeDiv = document.getElementById(comment.annotName);
                if (removeDiv) {
                    removeDiv.remove();
                }
                annotation = undoAnnotation;
                this.updateUndoRedoCollections(annotation, pageIndex);
                return clonedAnnotationObject;
            }
        }
        else if (isAction === 'Status Property Added') {
            if (annotation) {
                // eslint-disable-next-line
                var commentsDiv = document.getElementById(annotation.annotName);
                var pageIndex = this.pdfViewerBase.currentPageNumber - 1;
                if (commentsDiv) {
                    // eslint-disable-next-line
                    var pageNumber = parseInt(commentsDiv.accessKey.split('_')[0]);
                    pageIndex = pageNumber - 1;
                }
                // eslint-disable-next-line
                var clonedAnnotationObject = cloneObject(annotation);
                if (annotation.annotName === undoAnnotation.annotName) {
                    annotation.review = undoAnnotation.review;
                    annotation.state = undoAnnotation.state;
                    annotation.stateModel = undoAnnotation.stateModel;
                    this.pdfViewer.annotation.redoCommentsElement.push(annotation);
                }
                else {
                    for (var j = 0; j < annotation.comments.length; j++) {
                        if (annotation.comments[j].annotName === undoAnnotation.annotName) {
                            annotation.comments[j].state = undoAnnotation.state;
                            annotation.comments[j].stateModel = undoAnnotation.stateModel;
                            annotation.comments[j].review = undoAnnotation.review;
                            this.pdfViewer.annotation.redoCommentsElement.push(annotation.comments[j]);
                            break;
                        }
                    }
                }
                // eslint-disable-next-line
                var activeDiv = document.getElementById(undoAnnotation.annotName);
                if (activeDiv.lastChild.id === this.pdfViewer.element.id + 'status' + '_container') {
                    activeDiv.lastChild.remove();
                }
                else {
                    if (activeDiv.firstChild.lastChild.id === this.pdfViewer.element.id + 'status' + '_container') {
                        activeDiv.firstChild.lastChild.remove();
                    }
                }
                this.updateUndoRedoCollections(annotation, pageIndex);
                return clonedAnnotationObject;
            }
        }
        else if (isAction === 'Comments Reply Deleted') {
            // eslint-disable-next-line
            var commentsDiv = document.getElementById(annotation.annotName);
            if (commentsDiv) {
                // eslint-disable-next-line
                var pageNumber = parseInt(commentsDiv.accessKey.split('_')[0]);
                var pageIndex = pageNumber - 1;
                this.renderComments(undoAnnotation, commentsDiv, true, annotation.annotName);
                this.pdfViewer.annotation.redoCommentsElement.push(undoAnnotation);
                this.updateUndoRedoCollections(annotation, pageIndex);
                return annotation;
            }
        }
        else if (isAction === 'dynamicText Change') {
            if (annotation) {
                // eslint-disable-next-line
                var commentsMainDiv = document.getElementById(annotation.annotName);
                if (commentsMainDiv) {
                    // eslint-disable-next-line
                    commentsMainDiv.firstChild.firstChild.nextSibling.ej2_instances[0].value = undoAnnotation.dynamicText;
                    return annotation;
                }
            }
        }
    };
    /**
     * @param annotation
     * @param isAction
     * @param undoAnnotation
     * @param annotation
     * @param isAction
     * @param undoAnnotation
     * @private
     */
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.redoAction = function (annotation, isAction, undoAnnotation) {
        if (isAction === 'Text Property Added') {
            // eslint-disable-next-line
            var commentsMainDiv = document.getElementById(annotation.annotName);
            if (commentsMainDiv) {
                // eslint-disable-next-line
                var pageNumber = parseInt(commentsMainDiv.accessKey.split('_')[0]);
                var pageIndex = pageNumber - 1;
                commentsMainDiv.firstChild.firstChild.nextSibling.ej2_instances[0].value = annotation.note;
                commentsMainDiv.lastChild.style.display = 'block';
                this.updateUndoRedoCollections(annotation, pageIndex);
                return annotation;
            }
        }
        else if (isAction === 'Comments Property Added') {
            // eslint-disable-next-line
            var comment = annotation.comments[annotation.comments.length - 1];
            var commentsDiv = document.getElementById(annotation.annotName);
            if (commentsDiv) {
                // eslint-disable-next-line
                var pageNumber = parseInt(commentsDiv.accessKey.split('_')[0]);
                var pageIndex = pageNumber - 1;
                this.renderComments(comment, commentsDiv, true, annotation.annotName);
                this.updateUndoRedoCollections(annotation, pageIndex);
                return annotation;
            }
        }
        else if (isAction === 'Status Property Added') {
            // eslint-disable-next-line
            var poppedItem = this.pdfViewer.annotation.redoCommentsElement.pop();
            var pageIndex = this.pdfViewerBase.currentPageNumber - 1;
            if (poppedItem) {
                // eslint-disable-next-line max-len
                var statusContainer = createElement('div', { id: this.pdfViewer.element.id + 'status' + '_container', className: 'e-pv-status-container' });
                // eslint-disable-next-line max-len
                var statusDiv = createElement('div', { id: this.pdfViewer.element.id + 'status' + '_div', className: 'e-pv-status-div' });
                var statusSpan = createElement('span', { id: this.pdfViewer.element.id + 'status' + '_icon' });
                statusDiv.appendChild(statusSpan);
                statusContainer.appendChild(statusDiv);
                // eslint-disable-next-line
                var activeDiv = document.getElementById(annotation.annotName);
                if (activeDiv) {
                    // eslint-disable-next-line
                    var pageNumber = parseInt(activeDiv.accessKey.split('_')[0]);
                    pageIndex = pageNumber - 1;
                }
                // eslint-disable-next-line
                if (annotation.annotName === poppedItem.annotName) {
                    this.updateStatusContainer(annotation.state, statusSpan, statusDiv, statusContainer);
                    for (var i = 0; i < activeDiv.firstChild.children.length; i++) {
                        if (activeDiv.firstChild.children[i].id === this.pdfViewer.element.id + 'status_container') {
                            activeDiv.firstChild.children[i].parentElement.removeChild(activeDiv.firstChild.children[i]);
                        }
                    }
                    activeDiv.firstChild.appendChild(statusContainer);
                }
                else {
                    for (var i = 0; i < annotation.comments.length; i++) {
                        if (annotation.comments[i].annotName === poppedItem.annotName) {
                            this.updateStatusContainer(annotation.comments[i].state, statusSpan, statusDiv, statusContainer);
                            var statusElement = document.getElementById(poppedItem.annotName);
                            for (var i_1 = 0; i_1 < statusElement.children.length; i_1++) {
                                if (statusElement.children[i_1].id === this.pdfViewer.element.id + 'status_container') {
                                    statusElement.children[i_1].parentElement.removeChild(statusElement.children[i_1]);
                                }
                            }
                            if (statusElement) {
                                statusElement.appendChild(statusContainer);
                            }
                        }
                    }
                }
            }
            this.updateUndoRedoCollections(annotation, pageIndex);
            return annotation;
        }
        else if (isAction === 'Comments Reply Deleted') {
            var pageIndex = this.pdfViewerBase.currentPageNumber - 1;
            // eslint-disable-next-line
            var activeDiv = document.getElementById(annotation.annotName);
            if (activeDiv) {
                // eslint-disable-next-line
                var pageNumber = parseInt(activeDiv.accessKey.split('_')[0]);
                pageIndex = pageNumber - 1;
            }
            // eslint-disable-next-line
            var poppedItem = this.pdfViewer.annotation.redoCommentsElement.pop();
            // eslint-disable-next-line
            var clonedAnnotationObject = cloneObject(annotation);
            for (var i = 0; i < annotation.comments.length; i++) {
                if (annotation.comments[i].annotName === poppedItem.annotName) {
                    // eslint-disable-next-line
                    var replyElement = document.getElementById(poppedItem.annotName);
                    annotation.comments.splice(i, 1);
                    replyElement.remove();
                }
            }
            this.updateUndoRedoCollections(annotation, pageIndex);
            return clonedAnnotationObject;
        }
        else if (isAction === 'dynamicText Change') {
            if (annotation) {
                // eslint-disable-next-line
                var commentsMainDiv = document.getElementById(annotation.annotName);
                if (commentsMainDiv) {
                    // eslint-disable-next-line
                    commentsMainDiv.firstChild.firstChild.nextSibling.ej2_instances[0].value = annotation.dynamicText;
                    return annotation;
                }
            }
        }
    };
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.updateUndoRedoCollections = function (annotationBase, pageNumber, shapeType, action) {
        var annotationType = (!shapeType) ? annotationBase.shapeAnnotationType : shapeType;
        if (annotationBase.indent && annotationBase.indent !== '') {
            annotationType = 'shape_measure';
        }
        // eslint-disable-next-line
        var pageAnnotations = this.getAnnotations(pageNumber, null, annotationType);
        if (pageAnnotations !== null) {
            for (var i = 0; i < pageAnnotations.length; i++) {
                if (annotationBase.annotName === pageAnnotations[i].annotName) {
                    pageAnnotations[i] = annotationBase;
                    this.pdfViewer.annotationModule.storeAnnotationCollections(pageAnnotations[i], pageNumber);
                    if (action) {
                        pageAnnotations.splice(i, 1);
                        this.deleteStickyNotesAnnotations(pageAnnotations, pageNumber);
                    }
                }
            }
            if (annotationType === 'shape_measure') {
                this.manageAnnotations(pageAnnotations, pageNumber, 'shape_measure');
            }
            else {
                this.manageAnnotations(pageAnnotations, pageNumber, annotationBase.shapeAnnotationType);
            }
        }
    };
    /**
     * @param pageIndex
     * @param type
     * @private
     */
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.addAnnotationComments = function (pageIndex, type) {
        var pageNumber = pageIndex + 1;
        // eslint-disable-next-line
        var poppedItem = this.pdfViewer.annotation.undoCommentsElement.pop();
        if (poppedItem) {
            this.createCommentsContainer(poppedItem, pageNumber);
            this.updateUndoRedoCollections(poppedItem, pageIndex, type);
        }
    };
    /**
     * @param annotation
     * @param type
     * @param action
     * @private
     */
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.findPosition = function (annotation, type, action) {
        var index;
        // eslint-disable-next-line
        var commentsDiv = document.getElementById(annotation.annotName);
        if (commentsDiv) {
            // eslint-disable-next-line
            var pageNumber = parseInt(commentsDiv.accessKey.split('_')[0]);
            var pageIndex = pageNumber - 1;
            // eslint-disable-next-line
            var parentDiv = commentsDiv.parentElement;
            for (var i = 0; i < parentDiv.childElementCount; i++) {
                if (parentDiv.childNodes[i].id === annotation.annotName) {
                    index = i;
                }
            }
            if (type === 'Stamp' || type === 'Image') {
                type = 'stamp';
            }
            else if (type === 'FreeText') {
                type = 'freetext';
            }
            else if (type === 'StickyNotes' || type === 'sticky') {
                type = 'sticky';
            }
            else if (type === 'Ink') {
                type = 'ink';
            }
            // eslint-disable-next-line
            var pageAnnotations = this.getAnnotations(pageIndex, null, type);
            if (pageAnnotations !== null) {
                for (var i = 0; i < pageAnnotations.length; i++) {
                    if (pageAnnotations[i].annotName === annotation.annotName) {
                        // eslint-disable-next-line
                        var clonedObject = cloneObject(pageAnnotations[i]);
                        pageAnnotations[i].position = index;
                        this.pdfViewer.annotation.undoCommentsElement.push(pageAnnotations[i]);
                        if (type === 'sticky') {
                            this.updateUndoRedoCollections(clonedObject, pageIndex, null, action);
                        }
                    }
                }
            }
        }
    };
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.getAnnotations = function (pageIndex, shapeAnnotations, type) {
        // eslint-disable-next-line
        var annotationCollection;
        if (type === 'Stamp' || type === 'stamp' || type === 'Image') {
            type = 'stamp';
        }
        else if (type === 'StickyNotes' || type === 'sticky') {
            type = 'sticky';
        }
        else if (type === 'textMarkup') {
            type = 'textMarkup';
        }
        else if (type === 'shape' || type === 'Line' || type === 'Radius' || type === 'Rectangle' || type === 'Ellipse'
            || type === 'Polygon' || type === 'LineWidthArrowHead' || type === 'Square' || type === 'Circle') {
            type = 'shape';
        }
        else if (type === 'FreeText' || type === 'freetext' || type === 'freeText') {
            type = 'freetext';
        }
        else if (type === 'ink' || type === 'Ink') {
            type = 'ink';
        }
        else {
            type = 'shape_measure';
        }
        // eslint-disable-next-line
        var storeObject = window.sessionStorage.getItem(this.pdfViewerBase.documentId + '_annotations_' + type);
        if (this.pdfViewerBase.isStorageExceed) {
            storeObject = this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_' + type];
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
    StickyNotesAnnotation.prototype.manageAnnotations = function (pageAnnotations, pageNumber, type) {
        if (type === 'Stamp' || type === 'stamp') {
            type = 'stamp';
        }
        else if (type === 'Sticky' || type === 'sticky') {
            type = 'sticky';
        }
        else if (type === 'textMarkup') {
            type = 'textMarkup';
        }
        else if (type === 'shape' || type === 'Line' || type === 'Radius' || type === 'Rectangle' || type === 'Ellipse'
            || type === 'Polygon' || type === 'LineWidthArrowHead' || type === 'Square' || type === 'Circle') {
            type = 'shape';
        }
        else if (type === 'FreeText') {
            type = 'freetext';
        }
        else if (type === 'ink' || type === 'Ink') {
            type = 'ink';
        }
        else {
            type = 'shape_measure';
        }
        // eslint-disable-next-line
        var storeObject = window.sessionStorage.getItem(this.pdfViewerBase.documentId + '_annotations_' + type);
        if (this.pdfViewerBase.isStorageExceed) {
            storeObject = this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_' + type];
        }
        if (storeObject) {
            var annotObject = JSON.parse(storeObject);
            if (!this.pdfViewerBase.isStorageExceed) {
                window.sessionStorage.removeItem(this.pdfViewerBase.documentId + '_annotations_' + type);
            }
            var index = this.pdfViewer.annotationModule.getPageCollection(annotObject, pageNumber);
            if (annotObject[index]) {
                annotObject[index].annotations = pageAnnotations;
            }
            var annotationStringified = JSON.stringify(annotObject);
            if (this.pdfViewerBase.isStorageExceed) {
                this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_' + type] = annotationStringified;
            }
            else {
                window.sessionStorage.setItem(this.pdfViewerBase.documentId + '_annotations_' + type, annotationStringified);
            }
        }
    };
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.updateStickyNotes = function (annotation, id) {
        // eslint-disable-next-line
        var storeObject = window.sessionStorage.getItem(this.pdfViewerBase.documentId + '_annotations_sticky');
        if (this.pdfViewerBase.isStorageExceed) {
            storeObject = this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_sticky'];
        }
        if (storeObject) {
            // eslint-disable-next-line
            var bounds = annotation.bounds;
            var annotObject = JSON.parse(storeObject);
            for (var k = 0; k < annotObject.length; k++) {
                // eslint-disable-next-line
                var currentAnnot = annotObject[k];
                for (var j = 0; j < currentAnnot.annotations.length; j++) {
                    if (annotObject[k].annotations[j].annotName === annotation.annotName) {
                        if (!this.pdfViewerBase.isStorageExceed) {
                            window.sessionStorage.removeItem(this.pdfViewerBase.documentId + '_annotations_sticky');
                        }
                        var pageIndex = this.pdfViewer.annotationModule.getPageCollection(annotObject, 0);
                        if (annotObject[pageIndex]) {
                            // eslint-disable-next-line max-len
                            annotObject[k].annotations[j].bounds = { left: bounds.x, top: bounds.y, width: bounds.width, height: bounds.height, right: bounds.right, bottom: bounds.bottom };
                        }
                        var annotationStringified = JSON.stringify(annotObject);
                        if (this.pdfViewerBase.isStorageExceed) {
                            // eslint-disable-next-line max-len
                            this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_sticky'] = annotationStringified;
                        }
                        else {
                            window.sessionStorage.setItem(this.pdfViewerBase.documentId + '_annotations_sticky', annotationStringified);
                        }
                        break;
                    }
                }
            }
        }
    };
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.saveStickyAnnotations = function () {
        // eslint-disable-next-line
        var storeObject = window.sessionStorage.getItem(this.pdfViewerBase.documentId + '_annotations_sticky');
        if (this.pdfViewerBase.isStorageExceed) {
            storeObject = this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_sticky'];
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
                        pageAnnotationObject.annotations[z].bounds = JSON.stringify(this.pdfViewer.annotation.getBounds(pageAnnotationObject.annotations[z].bounds, pageAnnotationObject.pageIndex));
                    }
                    newArray = pageAnnotationObject.annotations;
                }
                annotations[pageAnnotationObject.pageIndex] = newArray;
            }
        }
        return JSON.stringify(annotations);
    };
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.deleteStickyNotesAnnotations = function (pageAnnotations, pageNumber) {
        // eslint-disable-next-line
        var storeObject = window.sessionStorage.getItem(this.pdfViewerBase.documentId + '_annotations_sticky');
        if (this.pdfViewerBase.isStorageExceed) {
            storeObject = this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_sticky'];
        }
        if (storeObject) {
            var annotObject = JSON.parse(storeObject);
            if (!this.pdfViewerBase.isStorageExceed) {
                window.sessionStorage.removeItem(this.pdfViewerBase.documentId + '_annotations_sticky');
            }
            var index = this.pdfViewer.annotationModule.getPageCollection(annotObject, pageNumber);
            if (annotObject[index]) {
                annotObject[index].annotations = pageAnnotations;
            }
            var annotationStringified = JSON.stringify(annotObject);
            if (this.pdfViewerBase.isStorageExceed) {
                this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_sticky'] = annotationStringified;
            }
            else {
                window.sessionStorage.setItem(this.pdfViewerBase.documentId + '_annotations_sticky', annotationStringified);
            }
        }
    };
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.addStickyNotesAnnotations = function (pageNumber, annotationBase) {
        var pageAnnotations = this.getAnnotations(pageNumber, null, 'sticky');
        if (pageAnnotations) {
            pageAnnotations.push(annotationBase);
        }
        this.manageAnnotations(pageAnnotations, pageNumber, 'sticky');
    };
    /**
     * @param annotName
     * @param text
     * @private
     */
    StickyNotesAnnotation.prototype.addTextToComments = function (annotName, text) {
        // eslint-disable-next-line
        var commentsMainDiv = document.getElementById(annotName);
        if (commentsMainDiv) {
            commentsMainDiv.firstChild.firstChild.nextSibling.ej2_instances[0].value = text;
        }
    };
    /**
     * @param newAnnotation
     * @param annotation
     * @param isCut
     * @param newAnnotation
     * @param annotation
     * @param isCut
     * @param newAnnotation
     * @param annotation
     * @param isCut
     * @private
     */
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.updateAnnotationCollection = function (newAnnotation, annotation, isCut) {
        var type = this.findAnnotationType(annotation);
        // eslint-disable-next-line
        var pageAnnotations = this.getAnnotations(annotation.pageIndex, null, type);
        if (isCut) {
            pageAnnotations = this.pdfViewer.annotationModule.removedAnnotationCollection;
        }
        if (pageAnnotations !== null) {
            for (var i = 0; i < pageAnnotations.length; i++) {
                if (isCut && !pageAnnotations[i].annotName) {
                    pageAnnotations[i].annotName = pageAnnotations[i].annotationId;
                }
                if (pageAnnotations[i].annotName === annotation.annotName) {
                    // eslint-disable-next-line
                    var updateAnnotation = cloneObject(pageAnnotations[i]);
                    updateAnnotation.annotName = newAnnotation.annotName;
                    if (type === 'shape' || type === 'shape_measure' || type === 'freetext' || type === 'ink') {
                        updateAnnotation.id = newAnnotation.id;
                    }
                    if (type === 'stamp') {
                        updateAnnotation.randomId = newAnnotation.id;
                    }
                    if (type === 'ink') {
                        updateAnnotation.bounds.x = newAnnotation.bounds.x;
                        updateAnnotation.bounds.y = newAnnotation.bounds.y;
                    }
                    else {
                        updateAnnotation.bounds.left = newAnnotation.bounds.x;
                        updateAnnotation.bounds.top = newAnnotation.bounds.y;
                        updateAnnotation.vertexPoints = newAnnotation.vertexPoints;
                    }
                    updateAnnotation.note = updateAnnotation.note ? updateAnnotation.note : '';
                    updateAnnotation.comments = [];
                    // eslint-disable-next-line max-len
                    updateAnnotation.review = { state: '', stateModel: '', modifiedDate: updateAnnotation.ModifiedDate, author: updateAnnotation.author };
                    updateAnnotation.state = '';
                    updateAnnotation.stateModel = '';
                    updateAnnotation.pageNumber = annotation.pageIndex;
                    this.pdfViewer.annotationModule.storeAnnotations(annotation.pageIndex, updateAnnotation, '_annotations_' + type);
                    this.createCommentsContainer(updateAnnotation, annotation.pageIndex + 1, true);
                    if (isCut) {
                        this.pdfViewer.annotationModule.removedAnnotationCollection = [];
                    }
                    break;
                }
            }
        }
    };
    StickyNotesAnnotation.prototype.findAnnotationType = function (annotation) {
        var annotType;
        if (annotation.measureType !== '') {
            annotType = 'shape_measure';
        }
        else {
            if (annotation.shapeAnnotationType === 'StickyNotes') {
                annotType = 'sticky';
            }
            else if (annotation.shapeAnnotationType === 'Stamp' || annotation.shapeAnnotationType === 'Image') {
                annotType = 'stamp';
            }
            else if (annotation.shapeAnnotationType === 'FreeText') {
                annotType = 'freetext';
            }
            else if (annotation.shapeAnnotationType === 'Ink') {
                annotType = 'ink';
            }
            else {
                annotType = 'shape';
            }
        }
        return annotType;
    };
    StickyNotesAnnotation.prototype.setExistingAnnotationModifiedDate = function (date) {
        var modifiedDateTime;
        if (date !== '') {
            modifiedDateTime = this.setModifiedDate(date);
        }
        else {
            modifiedDateTime = this.setModifiedDate();
        }
        return modifiedDateTime;
    };
    StickyNotesAnnotation.prototype.updateModifiedTime = function (time, minutes) {
        var modifiedTime;
        if (time >= 12) {
            if (time === 12) {
                modifiedTime = time + ':' + minutes + ' PM';
            }
            else {
                modifiedTime = (time - 12) + ':' + minutes + ' PM';
            }
        }
        else {
            modifiedTime = time + ':' + minutes + ' AM';
        }
        return modifiedTime;
    };
    StickyNotesAnnotation.prototype.setModifiedDate = function (data) {
        var dateTime;
        if (data) {
            dateTime = this.getDateAndTime(data);
        }
        else {
            dateTime = this.getDateAndTime();
        }
        var date = new Date(dateTime);
        var modifiedTime;
        var modifiedDate = date.toString().split(' ').splice(1, 2).join(' ');
        if (date.toLocaleTimeString().split(' ').length === 2) {
            // eslint-disable-next-line max-len
            modifiedTime = date.toLocaleTimeString().split(' ')[0].split(':').splice(0, 2).join(':') + ' ' + date.toLocaleTimeString().split(' ')[1];
        }
        else {
            // eslint-disable-next-line
            var time = parseInt(date.toLocaleTimeString().split(':')[0]);
            var minutes = date.toLocaleTimeString().split(':')[1];
            modifiedTime = this.updateModifiedTime(time, minutes);
        }
        var modifiedDateTime = modifiedDate + ', ' + modifiedTime;
        return modifiedDateTime;
    };
    StickyNotesAnnotation.prototype.convertUTCDateToLocalDate = function (date) {
        var dateTime = new Date(Date.parse(date));
        this.globalize = new Internationalization(this.pdfViewer.locale);
        var timeValue = dateTime.toLocaleTimeString(this.globalize.culture);
        var newTime;
        if (!isNullOrUndefined(timeValue.split(' ')[1])) {
            newTime = (timeValue.split(':').splice(0, 2).join(':')) + ' ' + timeValue.split(' ')[1];
        }
        else {
            newTime = (timeValue.split(':').splice(0, 2).join(':'));
        }
        var newDate = dateTime.toString().split(' ').splice(1, 2).join(' ');
        var dateTimeValue = newDate + ',' + ' ' + newTime;
        return dateTimeValue;
    };
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.updateModifiedDate = function (titleContainer) {
        if (titleContainer.id === this.pdfViewer.element.id + '_commenttype_icon') {
            titleContainer = titleContainer.nextSibling;
        }
        var author = titleContainer.textContent.split('-')[0];
        titleContainer.textContent = author + ' - ' + this.setModifiedDate();
    };
    /**
     * @param annotation
     * @param isBounds
     * @param isUndoRedoAction
     * @private
     */
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.updateAnnotationModifiedDate = function (annotation, isBounds, isUndoRedoAction) {
        // eslint-disable-next-line
        var titleContainer;
        if (annotation) {
            // eslint-disable-next-line
            var commentsContainer = document.getElementById(annotation.annotName);
            if (commentsContainer) {
                if (!isBounds) {
                    titleContainer = commentsContainer.firstChild.firstChild.childNodes[1];
                    var author = titleContainer.textContent.split('-')[0];
                    titleContainer.textContent = author + ' - ' + this.setModifiedDate();
                }
                else {
                    var type = this.findAnnotationType(annotation);
                    // eslint-disable-next-line
                    var pageAnnotations = this.getAnnotations(annotation.pageIndex, null, type);
                    if (pageAnnotations != null && annotation) {
                        for (var i = 0; i < pageAnnotations.length; i++) {
                            if (annotation.annotName === pageAnnotations[i].annotName) {
                                // eslint-disable-next-line max-len
                                if (annotation.bounds.x !== pageAnnotations[i].bounds.left || annotation.bounds.y !== pageAnnotations[i].bounds.top || annotation.bounds.height !== pageAnnotations[i].bounds.height || annotation.bounds.width !== pageAnnotations[i].bounds.width) {
                                    titleContainer = commentsContainer.firstChild.firstChild.childNodes[1];
                                    var author = titleContainer.textContent.split('-')[0];
                                    titleContainer.textContent = author + ' - ' + this.setModifiedDate();
                                }
                            }
                            if (pageAnnotations[i].shapeAnnotationType === 'sticky') {
                                this.pdfViewer.annotationModule.storeAnnotationCollections(pageAnnotations[i], annotation.pageIndex);
                            }
                        }
                    }
                }
                if (isUndoRedoAction) {
                    titleContainer = commentsContainer.firstChild.firstChild.childNodes[1];
                    if (annotation.modifiedDate !== undefined) {
                        var author = titleContainer.textContent.split('-')[0];
                        titleContainer.textContent = author + ' - ' + this.setExistingAnnotationModifiedDate(annotation.modifiedDate);
                    }
                }
            }
        }
    };
    /**
     * @param annotation
     * @param pageNumber
     * @param annotation
     * @param pageNumber
     * @private
     */
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.saveImportedStickyNotesAnnotations = function (annotation, pageNumber) {
        var annotationObject = null;
        if (!annotation.Author) {
            // eslint-disable-next-line max-len
            annotation.Author = (this.pdfViewer.annotationSettings.author !== 'Guest') ? this.pdfViewer.annotationSettings.author : this.pdfViewer.stickyNotesSettings.author;
        }
        // eslint-disable-next-line max-len
        var isLock = this.pdfViewer.stickyNotesSettings.isLock ? this.pdfViewer.stickyNotesSettings.isLock : this.pdfViewer.annotationSettings.isLock;
        // eslint-disable-next-line
        var allowedInteractions = this.pdfViewer.annotationModule.updateAnnotationAllowedInteractions(annotation);
        annotationObject = {
            // eslint-disable-next-line max-len
            shapeAnnotationType: 'sticky', author: annotation.Author, allowedInteractions: allowedInteractions, modifiedDate: annotation.ModifiedDate, subject: annotation.Subject, note: annotation.Note, opacity: annotation.Opacity, state: annotation.State, stateModel: annotation.StateModel,
            pathData: '', comments: this.pdfViewer.annotationModule.getAnnotationComments(annotation.Comments, annotation, annotation.Author), review: { state: annotation.State, stateModel: annotation.StateModel, modifiedDate: annotation.ModifiedDate, author: annotation.Author }, pageNumber: pageNumber,
            // eslint-disable-next-line max-len
            bounds: { left: annotation.Bounds.X, top: annotation.Bounds.Y, width: annotation.Bounds.Width, height: annotation.Bounds.Height, right: annotation.Bounds.Right, bottom: annotation.Bounds.Bottom },
            annotName: annotation.AnnotName, color: annotation.color,
            annotationSelectorSettings: this.getSettings(annotation),
            customData: this.pdfViewer.annotation.getCustomData(annotation),
            annotationSettings: { isLock: isLock }, isPrint: annotation.IsPrint, isCommentLock: annotation.IsCommentLock
        };
        this.pdfViewer.annotationModule.storeAnnotations(pageNumber, annotationObject, '_annotations_sticky');
    };
    /**
     * @param annotation
     * @param pageNumber
     * @param annotation
     * @param pageNumber
     * @private
     */
    // eslint-disable-next-line
    StickyNotesAnnotation.prototype.updateStickyNotesAnnotationCollections = function (annotation, pageNumber) {
        // eslint-disable-next-line
        var annotationObject = null;
        if (!annotation.Author) {
            // eslint-disable-next-line max-len
            annotation.Author = (this.pdfViewer.annotationSettings.author !== 'Guest') ? this.pdfViewer.annotationSettings.author : this.pdfViewer.stickyNotesSettings.author;
        }
        // eslint-disable-next-line max-len
        var isLock = this.pdfViewer.stickyNotesSettings.isLock ? this.pdfViewer.stickyNotesSettings.isLock : this.pdfViewer.annotationSettings.isLock;
        // eslint-disable-next-line
        var allowedInteractions = annotation.AllowedInteraction ? annotation.AllowedInteraction : this.pdfViewer.annotationModule.updateAnnotationAllowedInteractions(annotation);
        if (annotation.IsLock) {
            isLock = annotation.isLock;
        }
        annotationObject = {
            // eslint-disable-next-line max-len
            shapeAnnotationType: 'sticky', author: annotation.Author, allowedInteractions: allowedInteractions, modifiedDate: annotation.ModifiedDate, subject: annotation.Subject, note: annotation.Note, opacity: annotation.Opacity, state: annotation.State, stateModel: annotation.StateModel,
            pathData: '', comments: this.pdfViewer.annotationModule.getAnnotationComments(annotation.Comments, annotation, annotation.Author), review: { state: annotation.State, stateModel: annotation.StateModel, modifiedDate: annotation.ModifiedDate, author: annotation.Author },
            // eslint-disable-next-line max-len
            bounds: { left: annotation.Bounds.X, top: annotation.Bounds.Y, width: annotation.Bounds.Width, height: annotation.Bounds.Height, right: annotation.Bounds.Right, bottom: annotation.Bounds.Bottom },
            annotationId: annotation.AnnotName, color: annotation.color, pageNumber: pageNumber,
            customData: this.pdfViewer.annotation.getCustomData(annotation),
            annotationSettings: { isLock: isLock }, isPrint: annotation.IsPrint, isCommentLock: annotation.IsCommentLock
        };
        return annotationObject;
    };
    /**
     * @private
     */
    StickyNotesAnnotation.prototype.clear = function () {
        this.commentsCount = 0;
        this.commentsreplyCount = 0;
        this.isAccordionContainer = true;
        this.isEditableElement = false;
        this.isCreateContextMenu = false;
        this.isPageCommentsRendered = false;
        this.isCommentsRendered = false;
        this.isAnnotationRendered = false;
        if (this.commentMenuObj) {
            this.commentMenuObj.destroy();
        }
        // eslint-disable-next-line
        var accordionPages = document.querySelectorAll('.e-pv-accordion-page-container');
        if (accordionPages) {
            for (var j = 0; j < accordionPages.length; j++) {
                // eslint-disable-next-line
                accordionPages[j].remove();
            }
        }
        if (this.commentsRequestHandler) {
            this.commentsRequestHandler.clear();
        }
    };
    /**
     * @private
     */
    StickyNotesAnnotation.prototype.getModuleName = function () {
        return 'StickyNotesAnnotation';
    };
    /**
     * This method used to add annotations with using program.
     *
     * @param annotationObject - It describes type of annotation object
     * @param offset - It describes about the annotation bounds or location
     * @returns Object
     * @private
     */
    StickyNotesAnnotation.prototype.updateAddAnnotationDetails = function (annotationObject, offset) {
        //Creating new object if annotationObject is null
        if (!annotationObject) {
            annotationObject = { offset: { x: 1, y: 1 }, pageNumber: 0 };
            offset = annotationObject.offset;
        }
        else if (!annotationObject.offset)
            offset = { x: 1, y: 1 };
        else
            offset = annotationObject.offset;
        //Creating the CurrentDate and Annotation name
        var currentDateString = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
        var annotationName = this.pdfViewer.annotation.createGUID();
        //Creating annotation settings
        var annotationSelectorSettings = this.pdfViewer.stickyNotesSettings.annotationSelectorSettings ? this.pdfViewer.stickyNotesSettings.annotationSelectorSettings : this.pdfViewer.annotationSelectorSettings;
        var annotationSettings = this.pdfViewer.annotationModule.updateSettings(this.pdfViewer.stickyNotesSettings);
        annotationObject.author = this.pdfViewer.annotationModule.updateAnnotationAuthor('sticky', annotationSettings.annotationSubType);
        var allowedInteractions = this.pdfViewer.stickyNotesSettings.allowedInteractions ? this.pdfViewer.stickyNotesSettings.allowedInteractions : this.pdfViewer.annotationSettings.allowedInteractions;
        annotationSettings.isLock = annotationObject.isLock ? annotationObject.isLock : annotationSettings.isLock;
        //Creating Annotation objects with it's proper properties
        var stickyNotesAnnotation = [];
        var stickyNotes = {
            AllowedInteractions: annotationObject.allowedInteractions ? annotationObject.allowedInteractions : allowedInteractions,
            AnnotName: annotationName,
            AnnotType: 'sticky',
            AnnotationFlags: null,
            AnnotationSelectorSettings: annotationObject.annotationSelectorSettings ? annotationObject.annotationSelectorSettings : annotationSelectorSettings,
            AnnotationSettings: annotationSettings,
            Author: annotationObject.author ? annotationObject.author : 'Guest',
            Bounds: { X: offset.x, Y: offset.y, Width: 30, Height: 30, Left: offset.x, Top: offset.y, Location: { X: offset.x, Y: offset.y }, Size: { Height: 30, IsEmpty: false, Width: 30 } },
            Color: { IsEmpty: false, B: 51, Blue: 0.2, C: 0, G: 255 },
            Comments: null,
            CreatedDate: currentDateString,
            CustomData: annotationObject.customData ? annotationObject.customData : null,
            ExistingCustomData: null,
            Icon: 'Comment',
            IsCommentLock: false,
            IsLock: annotationObject.isLock ? annotationObject.isLock : false,
            IsPrint: annotationObject.isPrint ? annotationObject.isPrint : true,
            ModifiedDate: '',
            Note: "",
            Opacity: annotationObject.opacity ? annotationObject.opacity : 1,
            Reference: null,
            Size: { IsEmpty: true, Width: 0, Height: 0 },
            State: "",
            StateModel: "",
            StrokeColor: null,
            SubType: null,
            Subject: 'Sticky Note',
            Type: null
        };
        //Adding the annotation object to an array and return it
        stickyNotesAnnotation[0] = stickyNotes;
        return { stickyNotesAnnotation: stickyNotesAnnotation };
    };
    /**
     * @private
    */
    StickyNotesAnnotation.prototype.getAnnotationType = function (type) {
        var annotationType;
        if (type === 'stamp' || type === 'Stamp') {
            annotationType = 'stamp';
        }
        else if (type === 'shape' || type === 'Line' || type === 'Radius' || type === 'Rectangle' || type === 'Ellipse'
            || type === 'Polygon' || type === 'LineWidthArrowHead' || type === 'Square' || type === 'Circle') {
            annotationType = 'shape';
        }
        else if (type === 'textMarkup') {
            annotationType = 'textMarkup';
        }
        else if (type === 'freeText' || type === 'FreeText') {
            annotationType = 'freeText';
        }
        else if (type === 'sticky' || type === 'StickyNotes') {
            annotationType = 'sticky';
        }
        else if (type === 'measure' || type === 'shape_measure') {
            annotationType = 'measure';
        }
        else if (type === 'ink' || type === 'Ink') {
            annotationType = 'ink';
        }
        return annotationType;
    };
    /**
     * @private
    */
    StickyNotesAnnotation.prototype.getAuthorName = function (annotation, commonDiv) {
        var author;
        if (annotation) {
            var type = annotation.shapeAnnotationType;
            var annotationType = this.getAnnotationType(type);
            author = this.pdfViewer.annotationModule.updateAnnotationAuthor(annotationType, type);
        }
        else {
            author = commonDiv.getAttribute('author');
        }
        return author;
    };
    return StickyNotesAnnotation;
}());
export { StickyNotesAnnotation };
