import { isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * @hidden
 */
var ShapeAnnotation = /** @class */ (function () {
    function ShapeAnnotation(pdfviewer, pdfViewerBase) {
        /**
         * @private
         */
        this.shapeCount = 0;
        /**
         * @private
         */
        this.isAddAnnotationProgramatically = false;
        this.pdfViewer = pdfviewer;
        this.pdfViewerBase = pdfViewerBase;
    }
    /**
     * @param shapeAnnotations
     * @param pageNumber
     * @param isImportAcion
     * @private
     */
    // eslint-disable-next-line
    ShapeAnnotation.prototype.renderShapeAnnotations = function (shapeAnnotations, pageNumber, isImportAcion, isAnnotOrderAction) {
        if (shapeAnnotations) {
            if (shapeAnnotations.length >= 1) {
                // eslint-disable-next-line
                var shapeAnnots = this.pdfViewer.annotation.getStoredAnnotations(pageNumber, shapeAnnotations, '_annotations_shape');
                if (!shapeAnnots || isAnnotOrderAction || isImportAcion) {
                    for (var i = 0; i < shapeAnnotations.length; i++) {
                        // eslint-disable-next-line
                        var annotation = shapeAnnotations[i];
                        annotation.annotationAddMode = this.pdfViewer.annotationModule.findAnnotationMode(annotation, pageNumber, annotation.AnnotType);
                        var annotationObject = null;
                        this.shapeCount = this.shapeCount + 1;
                        var isAnnotationRotated = void 0;
                        if (annotation.ShapeAnnotationType) {
                            if (isImportAcion) {
                                if (this.pdfViewerBase.isJsonImported) {
                                    annotation.Bounds = this.pdfViewerBase.importJsonForRotatedDocuments(annotation.Rotate, pageNumber, annotation.Bounds, annotation.AnnotationRotation);
                                    isAnnotationRotated = this.pdfViewerBase.isPageRotated;
                                }
                            }
                            var vertexPoints = null;
                            if (annotation.VertexPoints) {
                                vertexPoints = [];
                                if (isImportAcion && this.pdfViewerBase.isJsonImported) {
                                    vertexPoints = this.pdfViewerBase.calculateVertexPoints(annotation.Rotate, pageNumber, annotation.VertexPoints, annotation.AnnotationRotation);
                                }
                                else {
                                    for (var j = 0; j < annotation.VertexPoints.length; j++) {
                                        var x = annotation.VertexPoints[j].X ? annotation.VertexPoints[j].X : annotation.VertexPoints[j].x;
                                        var y = annotation.VertexPoints[j].Y ? annotation.VertexPoints[j].Y : annotation.VertexPoints[j].y;
                                        var point = { x: x, y: y };
                                        vertexPoints.push(point);
                                    }
                                }
                            }
                            // eslint-disable-next-line
                            if (annotation.Bounds && annotation.EnableShapeLabel === true) {
                                // eslint-disable-next-line max-len
                                annotation.LabelBounds = this.pdfViewer.annotationModule.inputElementModule.calculateLabelBoundsFromLoadedDocument(annotation.Bounds);
                                // eslint-disable-next-line max-len
                                annotation.LabelBorderColor = annotation.LabelBorderColor ? annotation.LabelBorderColor : annotation.StrokeColor;
                                annotation.FontColor = annotation.FontColor ? annotation.FontColor : annotation.StrokeColor;
                                annotation.LabelFillColor = annotation.LabelFillColor ? annotation.LabelFillColor : annotation.FillColor;
                                annotation.FontSize = annotation.FontSize ? annotation.FontSize : 16;
                                // eslint-disable-next-line max-len
                                annotation.LabelSettings = annotation.LabelSettings ? annotation.LabelSettings : this.pdfViewer.shapeLabelSettings;
                            }
                            // eslint-disable-next-line max-len
                            annotation.AnnotationSelectorSettings = annotation.AnnotationSelectorSettings ? annotation.AnnotationSelectorSettings : this.pdfViewer.annotationSelectorSettings;
                            // eslint-disable-next-line max-len
                            annotation.AnnotationSettings = annotation.AnnotationSettings ? annotation.AnnotationSettings : this.pdfViewer.annotationModule.updateAnnotationSettings(annotation);
                            // eslint-disable-next-line max-len
                            annotation.allowedInteractions = annotation.AllowedInteractions ? annotation.AllowedInteractions : this.pdfViewer.annotationModule.updateAnnotationAllowedInteractions(annotation);
                            var left = annotation.Bounds.X ? annotation.Bounds.X : annotation.Bounds.x;
                            var top_1 = annotation.Bounds.Y ? annotation.Bounds.Y : annotation.Bounds.y;
                            var width = annotation.Bounds.Width ? annotation.Bounds.Width : annotation.Bounds.width;
                            var height = annotation.Bounds.Height ? annotation.Bounds.Height : annotation.Bounds.height; // eslint-disable-next-line max-len
                            annotationObject = {
                                id: 'shape' + this.shapeCount, shapeAnnotationType: annotation.ShapeAnnotationType, author: annotation.Author, allowedInteractions: annotation.allowedInteractions, modifiedDate: annotation.ModifiedDate, subject: annotation.Subject, pageNumber: pageNumber,
                                // eslint-disable-next-line max-len
                                note: annotation.Note, strokeColor: annotation.StrokeColor, fillColor: annotation.FillColor, opacity: annotation.Opacity, thickness: annotation.Thickness, rectangleDifference: annotation.RectangleDifference,
                                borderStyle: annotation.BorderStyle, borderDashArray: annotation.BorderDashArray, rotateAngle: annotation.RotateAngle, isCloudShape: annotation.IsCloudShape,
                                // eslint-disable-next-line max-len
                                cloudIntensity: annotation.CloudIntensity, vertexPoints: vertexPoints, lineHeadStart: annotation.LineHeadStart, lineHeadEnd: annotation.LineHeadEnd, isLocked: annotation.IsLocked, comments: this.pdfViewer.annotationModule.getAnnotationComments(annotation.Comments, annotation, annotation.Author), review: { state: annotation.State, stateModel: annotation.StateModel, modifiedDate: annotation.ModifiedDate, author: annotation.Author }, annotName: annotation.AnnotName,
                                bounds: { left: left, top: top_1, width: width, height: height, right: annotation.Bounds.Right, bottom: annotation.Bounds.Bottom },
                                // eslint-disable-next-line max-len
                                labelContent: annotation.LabelContent, enableShapeLabel: annotation.EnableShapeLabel, labelFillColor: annotation.LabelFillColor,
                                fontColor: annotation.FontColor, labelBorderColor: annotation.LabelBorderColor, fontSize: annotation.FontSize,
                                // eslint-disable-next-line max-len
                                labelBounds: annotation.LabelBounds, annotationSelectorSettings: this.getSettings(annotation), labelSettings: annotation.LabelSettings, annotationSettings: annotation.AnnotationSettings,
                                customData: this.pdfViewer.annotation.getCustomData(annotation), isPrint: annotation.IsPrint, isCommentLock: annotation.IsCommentLock, isAnnotationRotated: isAnnotationRotated
                            };
                            var annot = void 0;
                            // eslint-disable-next-line
                            var vPoints = annotationObject.vertexPoints;
                            if (vertexPoints == null) {
                                vPoints = [];
                            }
                            // eslint-disable-next-line max-len
                            annotation.AnnotationSelectorSettings = annotation.AnnotationSelectorSettings ? annotation.AnnotationSelectorSettings : this.pdfViewer.annotationSelectorSettings;
                            annot = {
                                // eslint-disable-next-line max-len
                                id: 'shape' + this.shapeCount, shapeAnnotationType: this.getShapeType(annotationObject), author: annotationObject.author, allowedInteractions: annotationObject.allowedInteractions, modifiedDate: annotationObject.modifiedDate, annotName: annotationObject.annotName,
                                subject: annotationObject.subject, notes: annotationObject.note, fillColor: annotationObject.fillColor, strokeColor: annotationObject.strokeColor, opacity: annotationObject.opacity,
                                // eslint-disable-next-line max-len
                                thickness: annotationObject.thickness, borderStyle: annotationObject.borderStyle, borderDashArray: annotationObject.borderDashArray ? annotationObject.borderDashArray.toString() : '0', rotateAngle: parseFloat(annotationObject.rotateAngle.split('Angle')[1]), comments: annotationObject.comments, review: annotationObject.review, isCloudShape: annotationObject.isCloudShape, cloudIntensity: annotationObject.cloudIntensity, taregetDecoraterShapes: this.pdfViewer.annotation.getArrowType(annotationObject.lineHeadEnd),
                                // eslint-disable-next-line max-len
                                sourceDecoraterShapes: this.pdfViewer.annotation.getArrowType(annotationObject.lineHeadStart), vertexPoints: vPoints, bounds: { x: annotationObject.bounds.left, y: annotationObject.bounds.top, width: annotationObject.bounds.width, height: annotationObject.bounds.height },
                                pageIndex: annotationObject.pageNumber,
                                // eslint-disable-next-line max-len
                                labelContent: annotation.LabelContent, enableShapeLabel: annotation.EnableShapeLabel, labelFillColor: annotation.LabelFillColor,
                                fontColor: annotation.FontColor, labelBorderColor: annotation.LabelBorderColor, fontSize: annotation.FontSize,
                                labelBounds: annotation.LabelBounds, annotationSelectorSettings: annotation.AnnotationSelectorSettings,
                                annotationSettings: annotationObject.annotationSettings, annotationAddMode: annotation.annotationAddMode,
                                isPrint: annotation.IsPrint, isCommentLock: annotationObject.isCommentLock
                            };
                            var addedAnnot = this.pdfViewer.add(annot);
                            this.pdfViewer.annotationModule.storeAnnotations(pageNumber, annotationObject, '_annotations_shape');
                            if (this.isAddAnnotationProgramatically) {
                                var settings = {
                                    opacity: annot.opacity, strokeColor: annot.strokeColor, thickness: annot.thickness, modifiedDate: annot.modifiedDate,
                                    width: annot.bounds.width, height: annot.bounds.height
                                };
                                this.pdfViewer.fireAnnotationAdd(annot.pageIndex, annot.annotName, annotation.ShapeAnnotationType, annot.bounds, settings);
                            }
                        }
                    }
                }
            }
            else if (shapeAnnotations.shapeAnnotationType) {
                var annotationObject = this.createAnnotationObject(shapeAnnotations);
                if (!isNullOrUndefined(shapeAnnotations.formFieldAnnotationType) && shapeAnnotations.formFieldAnnotationType !== "")
                    this.pdfViewer.annotationModule.isFormFieldShape = true;
                else
                    this.pdfViewer.annotationModule.isFormFieldShape = false;
                this.pdfViewer.annotationModule.storeAnnotations(pageNumber, annotationObject, '_annotations_shape');
                this.pdfViewer.annotationModule.triggerAnnotationAdd(shapeAnnotations);
            }
        }
    };
    /**
     * @param annotation
     * @private
     */
    // eslint-disable-next-line
    ShapeAnnotation.prototype.getSettings = function (annotation) {
        var selector = this.pdfViewer.annotationSelectorSettings;
        if (annotation.AnnotationSelectorSettings) {
            selector = annotation.AnnotationSelectorSettings;
        }
        else {
            selector = this.getSelector(annotation.ShapeAnnotationType, annotation.Subject);
        }
        return selector;
    };
    /**
     * @param type
     * @private
     */
    ShapeAnnotation.prototype.setAnnotationType = function (type) {
        this.updateShapeProperties();
        this.pdfViewerBase.disableTextSelectionMode();
        var author = 'Guest';
        switch (type) {
            case 'Line':
                this.currentAnnotationMode = 'Line';
                // eslint-disable-next-line max-len
                var modifiedDateLine = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
                // eslint-disable-next-line max-len
                author = (this.pdfViewer.annotationSettings.author !== 'Guest') ? this.pdfViewer.annotationSettings.author : this.pdfViewer.lineSettings.author ? this.pdfViewer.lineSettings.author : 'Guest';
                this.pdfViewer.drawingObject = {
                    // eslint-disable-next-line max-len
                    shapeAnnotationType: this.setShapeType('Line'), fillColor: this.lineFillColor, notes: '', strokeColor: this.lineStrokeColor, opacity: this.lineOpacity,
                    thickness: this.lineThickness, modifiedDate: modifiedDateLine, borderDashArray: this.lineDashArray.toString(),
                    // eslint-disable-next-line max-len
                    sourceDecoraterShapes: this.pdfViewer.annotation.getArrowType(this.lineStartHead.toString()), taregetDecoraterShapes: this.pdfViewer.annotation.getArrowType(this.lineEndHead.toString()),
                    author: author, subject: 'Line', lineHeadStart: this.lineStartHead, lineHeadEnd: this.lineEndHead, isCommentLock: false
                };
                this.pdfViewer.tool = 'Line';
                break;
            case 'Arrow':
                this.currentAnnotationMode = 'Arrow';
                // eslint-disable-next-line max-len
                var modifiedDateArrow = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
                author = (this.pdfViewer.annotationSettings.author !== 'Guest') ? this.pdfViewer.annotationSettings.author : this.pdfViewer.arrowSettings.author ? this.pdfViewer.arrowSettings.author : 'Guest';
                this.pdfViewer.drawingObject = {
                    shapeAnnotationType: this.setShapeType('Arrow'), opacity: this.arrowOpacity,
                    // eslint-disable-next-line max-len
                    sourceDecoraterShapes: this.pdfViewer.annotation.getArrowType(this.arrowStartHead.toString()),
                    taregetDecoraterShapes: this.pdfViewer.annotation.getArrowType(this.arrowEndHead.toString()),
                    // eslint-disable-next-line max-len
                    fillColor: this.arrowFillColor, strokeColor: this.arrowStrokeColor, notes: '', thickness: this.arrowThickness,
                    borderDashArray: this.arrowDashArray.toString(), author: author, subject: 'Arrow',
                    // eslint-disable-next-line max-len
                    modifiedDate: modifiedDateArrow, lineHeadStart: this.arrowStartHead, lineHeadEnd: this.arrowEndHead, isCommentLock: false
                };
                this.pdfViewer.tool = 'Line';
                break;
            case 'Rectangle':
                this.currentAnnotationMode = 'Rectangle';
                // eslint-disable-next-line max-len
                var modifiedDateRect = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
                // eslint-disable-next-line max-len
                author = (this.pdfViewer.annotationSettings.author !== 'Guest') ? this.pdfViewer.annotationSettings.author : this.pdfViewer.rectangleSettings.author ? this.pdfViewer.rectangleSettings.author : 'Guest';
                this.pdfViewer.drawingObject = {
                    shapeAnnotationType: this.setShapeType('Rectangle'), strokeColor: this.rectangleStrokeColor,
                    fillColor: this.rectangleFillColor, opacity: this.rectangleOpacity, notes: '',
                    thickness: this.rectangleThickness, borderDashArray: '0', modifiedDate: modifiedDateRect,
                    author: author, subject: 'Rectangle', isCommentLock: false
                };
                this.pdfViewer.tool = 'DrawTool';
                break;
            case 'Circle':
                this.currentAnnotationMode = 'Circle';
                // eslint-disable-next-line max-len
                var modifiedDateCir = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
                // eslint-disable-next-line max-len
                author = (this.pdfViewer.annotationSettings.author !== 'Guest') ? this.pdfViewer.annotationSettings.author : this.pdfViewer.circleSettings.author ? this.pdfViewer.circleSettings.author : 'Guest';
                this.pdfViewer.drawingObject = {
                    shapeAnnotationType: this.setShapeType('Circle'), strokeColor: this.circleStrokeColor,
                    fillColor: this.circleFillColor, opacity: this.circleOpacity, notes: '',
                    thickness: this.circleThickness, borderDashArray: '0', modifiedDate: modifiedDateCir,
                    author: author, subject: 'Circle', isCommentLock: false
                };
                this.pdfViewer.tool = 'DrawTool';
                break;
            case 'Polygon':
                this.currentAnnotationMode = 'Polygon';
                // eslint-disable-next-line max-len
                var modifiedDatePolygon = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
                // eslint-disable-next-line max-len
                author = (this.pdfViewer.annotationSettings.author !== 'Guest') ? this.pdfViewer.annotationSettings.author : this.pdfViewer.polygonSettings.author ? this.pdfViewer.polygonSettings.author : 'Guest';
                this.pdfViewer.drawingObject = {
                    strokeColor: this.polygonStrokeColor, fillColor: this.polygonFillColor,
                    opacity: this.polygonOpacity, thickness: this.polygonThickness, borderDashArray: '0',
                    notes: '', author: author, subject: 'Polygon',
                    modifiedDate: modifiedDatePolygon, borderStyle: '', isCommentLock: false
                };
                this.pdfViewer.tool = 'Polygon';
                break;
        }
    };
    ShapeAnnotation.prototype.updateShapeProperties = function () {
        this.lineFillColor = this.pdfViewer.lineSettings.fillColor ? this.pdfViewer.lineSettings.fillColor : '#ffffff00';
        this.lineStrokeColor = this.pdfViewer.lineSettings.strokeColor ? this.pdfViewer.lineSettings.strokeColor : '#ff0000';
        this.lineThickness = this.pdfViewer.lineSettings.thickness ? this.pdfViewer.lineSettings.thickness : 1;
        this.lineOpacity = this.pdfViewer.lineSettings.opacity ? this.pdfViewer.lineSettings.opacity : 1;
        this.lineDashArray = this.pdfViewer.lineSettings.borderDashArray ? this.pdfViewer.lineSettings.borderDashArray : 0;
        this.lineStartHead = this.pdfViewer.lineSettings.lineHeadStartStyle ? this.pdfViewer.lineSettings.lineHeadStartStyle : 'None';
        this.lineEndHead = this.pdfViewer.lineSettings.lineHeadEndStyle ? this.pdfViewer.lineSettings.lineHeadEndStyle : 'None';
        this.arrowFillColor = this.pdfViewer.arrowSettings.fillColor ? this.pdfViewer.arrowSettings.fillColor : '#ffffff00';
        this.arrowStrokeColor = this.pdfViewer.arrowSettings.strokeColor ? this.pdfViewer.arrowSettings.strokeColor : '#ff0000';
        this.arrowThickness = this.pdfViewer.arrowSettings.thickness ? this.pdfViewer.arrowSettings.thickness : 1;
        this.arrowOpacity = this.pdfViewer.arrowSettings.opacity ? this.pdfViewer.arrowSettings.opacity : 1;
        this.arrowDashArray = this.pdfViewer.arrowSettings.borderDashArray ? this.pdfViewer.arrowSettings.borderDashArray : 0;
        this.arrowStartHead = this.pdfViewer.arrowSettings.lineHeadStartStyle ? this.pdfViewer.arrowSettings.lineHeadStartStyle : 'Closed';
        this.arrowEndHead = this.pdfViewer.arrowSettings.lineHeadEndStyle ? this.pdfViewer.arrowSettings.lineHeadEndStyle : 'Closed';
        this.rectangleFillColor = this.pdfViewer.rectangleSettings.fillColor ? this.pdfViewer.rectangleSettings.fillColor : '#ffffff00';
        this.rectangleStrokeColor = this.pdfViewer.rectangleSettings.strokeColor ? this.pdfViewer.rectangleSettings.strokeColor : '#ff0000';
        this.rectangleThickness = this.pdfViewer.rectangleSettings.thickness ? this.pdfViewer.rectangleSettings.thickness : 1;
        this.rectangleOpacity = this.pdfViewer.rectangleSettings.opacity ? this.pdfViewer.rectangleSettings.opacity : 1;
        this.circleFillColor = this.pdfViewer.circleSettings.fillColor ? this.pdfViewer.circleSettings.fillColor : '#ffffff00';
        this.circleStrokeColor = this.pdfViewer.circleSettings.strokeColor ? this.pdfViewer.circleSettings.strokeColor : '#ff0000';
        this.circleThickness = this.pdfViewer.circleSettings.thickness ? this.pdfViewer.circleSettings.thickness : 1;
        this.circleOpacity = this.pdfViewer.circleSettings.opacity ? this.pdfViewer.circleSettings.opacity : 1;
        this.polygonFillColor = this.pdfViewer.polygonSettings.fillColor ? this.pdfViewer.polygonSettings.fillColor : '#ffffff00';
        this.polygonStrokeColor = this.pdfViewer.polygonSettings.strokeColor ? this.pdfViewer.polygonSettings.strokeColor : '#ff0000';
        this.polygonThickness = this.pdfViewer.polygonSettings.thickness ? this.pdfViewer.polygonSettings.thickness : 1;
        this.polygonOpacity = this.pdfViewer.polygonSettings.opacity ? this.pdfViewer.polygonSettings.opacity : 1;
    };
    ShapeAnnotation.prototype.setShapeType = function (shape) {
        var shapeType;
        switch (shape) {
            case 'Line':
                shapeType = 'Line';
                break;
            case 'Circle':
                shapeType = 'Ellipse';
                break;
            case 'Square':
                shapeType = 'Rectangle';
                break;
            case 'Polyline':
                shapeType = 'Line';
                break;
            case 'Arrow':
                shapeType = 'LineWidthArrowHead';
                break;
        }
        return shapeType;
    };
    ShapeAnnotation.prototype.getShapeType = function (shape) {
        var shapeType;
        switch (shape.shapeAnnotationType) {
            case 'Line':
                shapeType = 'Line';
                break;
            case 'Circle':
                shapeType = 'Ellipse';
                break;
            case 'Square':
                shapeType = 'Rectangle';
                break;
            case 'Polyline':
                shapeType = 'Line';
                break;
            case 'Polygon':
                shapeType = 'Polygon';
                break;
        }
        // eslint-disable-next-line max-len
        if ((shape.shapeAnnotationType === 'Line' || shape.shapeAnnotationType === 'Polyline') && (shape.lineHeadStart !== 'None' || shape.lineHeadEnd !== 'None')) {
            shapeType = 'LineWidthArrowHead';
        }
        return shapeType;
    };
    ShapeAnnotation.prototype.getShapeAnnotType = function (shape) {
        var shapeType;
        switch (shape) {
            case 'Line':
            case 'LineWidthArrowHead':
                shapeType = 'Line';
                break;
            case 'Rectangle':
                shapeType = 'Square';
                break;
            case 'Ellipse':
                shapeType = 'Circle';
                break;
            case 'Polygon':
                shapeType = 'Polygon';
                break;
        }
        return shapeType;
    };
    /**
     * @param property
     * @param pageNumber
     * @param annotationBase
     * @param property
     * @param pageNumber
     * @param annotationBase
     * @param property
     * @param pageNumber
     * @param annotationBase
     * @private
     */
    // eslint-disable-next-line
    ShapeAnnotation.prototype.modifyInCollection = function (property, pageNumber, annotationBase) {
        if (!isNullOrUndefined(annotationBase.formFieldAnnotationType) && annotationBase.formFieldAnnotationType !== "")
            this.pdfViewer.annotationModule.isFormFieldShape = true;
        else
            this.pdfViewer.annotationModule.isFormFieldShape = false;
        this.pdfViewerBase.updateDocumentEditedProperty(true);
        var currentAnnotObject = null;
        if (annotationBase) {
            if (property === 'bounds') {
                this.pdfViewer.annotationModule.stickyNotesAnnotationModule.updateAnnotationModifiedDate(annotationBase, true);
            }
        }
        var pageAnnotations = this.getAnnotations(pageNumber, null);
        if (pageAnnotations != null && annotationBase) {
            for (var i = 0; i < pageAnnotations.length; i++) {
                if (annotationBase.id === pageAnnotations[i].id) {
                    if (property === 'bounds') {
                        if (pageAnnotations[i].shapeAnnotationType === 'Line') {
                            pageAnnotations[i].vertexPoints = annotationBase.vertexPoints;
                            // eslint-disable-next-line max-len
                            pageAnnotations[i].bounds = { left: annotationBase.bounds.x, top: annotationBase.bounds.y, width: annotationBase.bounds.width, height: annotationBase.bounds.height, right: annotationBase.bounds.right, bottom: annotationBase.bounds.bottom };
                        }
                        else if (pageAnnotations[i].shapeAnnotationType === 'Polygon') {
                            pageAnnotations[i].vertexPoints = annotationBase.vertexPoints;
                            // eslint-disable-next-line max-len
                            pageAnnotations[i].bounds = { left: annotationBase.bounds.x, top: annotationBase.bounds.y, width: annotationBase.bounds.width, height: annotationBase.bounds.height, right: annotationBase.bounds.right, bottom: annotationBase.bounds.bottom };
                        }
                        else {
                            // eslint-disable-next-line max-len
                            pageAnnotations[i].bounds = { left: annotationBase.bounds.x, top: annotationBase.bounds.y, width: annotationBase.bounds.width, height: annotationBase.bounds.height, right: annotationBase.bounds.right, bottom: annotationBase.bounds.bottom };
                        }
                        if (pageAnnotations[i].enableShapeLabel === true && annotationBase.wrapper) {
                            var labelTop = 0;
                            var labelLeft = 0;
                            var labelWidth = 0;
                            var labelHeight = 24.6;
                            var labelMaxWidth = 151;
                            if (annotationBase.wrapper.bounds.width) {
                                // eslint-disable-next-line max-len
                                labelWidth = (annotationBase.wrapper.bounds.width / 2);
                                labelWidth = (labelWidth > 0 && labelWidth < labelMaxWidth) ? labelWidth : labelMaxWidth;
                            }
                            if (annotationBase.wrapper.bounds.left) {
                                // eslint-disable-next-line max-len
                                labelLeft = (annotationBase.wrapper.bounds.left + (annotationBase.wrapper.bounds.width / 2) - (labelWidth / 2));
                            }
                            if (annotationBase.wrapper.bounds.top) {
                                // eslint-disable-next-line max-len
                                labelTop = (annotationBase.wrapper.bounds.top + (annotationBase.wrapper.bounds.height / 2) - 12.3);
                            }
                            // eslint-disable-next-line max-len
                            pageAnnotations[i].labelBounds = { left: labelLeft, top: labelTop, width: labelWidth, height: labelHeight, right: 0, bottom: 0 };
                        }
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
                    else if (property === 'dashArray') {
                        pageAnnotations[i].borderDashArray = annotationBase.wrapper.children[0].style.strokeDashArray;
                        pageAnnotations[i].borderStyle = annotationBase.borderStyle;
                    }
                    else if (property === 'startArrow') {
                        // eslint-disable-next-line max-len
                        pageAnnotations[i].lineHeadStart = this.pdfViewer.annotation.getArrowTypeForCollection(annotationBase.sourceDecoraterShapes);
                    }
                    else if (property === 'endArrow') {
                        // eslint-disable-next-line max-len
                        pageAnnotations[i].lineHeadEnd = this.pdfViewer.annotation.getArrowTypeForCollection(annotationBase.taregetDecoraterShapes);
                    }
                    else if (property === 'notes') {
                        pageAnnotations[i].note = annotationBase.notes;
                    }
                    else if (property === 'delete') {
                        currentAnnotObject = pageAnnotations.splice(i, 1)[0];
                        break;
                    }
                    else if (property === 'labelContent') {
                        pageAnnotations[i].note = annotationBase.labelContent;
                        pageAnnotations[i].labelContent = annotationBase.labelContent;
                        break;
                    }
                    else if (property === 'fontColor') {
                        pageAnnotations[i].fontColor = annotationBase.fontColor;
                    }
                    else if (property === 'fontSize') {
                        pageAnnotations[i].fontSize = annotationBase.fontSize;
                    }
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
     * @param pageNumber
     * @param annotationBase
     * @private
     */
    ShapeAnnotation.prototype.addInCollection = function (pageNumber, annotationBase) {
        var pageAnnotations = this.getAnnotations(pageNumber, null);
        if (pageAnnotations) {
            pageAnnotations.push(annotationBase);
        }
        this.manageAnnotations(pageAnnotations, pageNumber);
    };
    /**
     * @private
     */
    ShapeAnnotation.prototype.saveShapeAnnotations = function () {
        // eslint-disable-next-line
        var storeObject = window.sessionStorage.getItem(this.pdfViewerBase.documentId + '_annotations_shape');
        if (this.pdfViewerBase.isStorageExceed) {
            storeObject = this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_shape'];
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
                        if (!this.pdfViewerBase.checkFormFieldCollection(pageAnnotationObject.annotations[z].id)) {
                            this.pdfViewer.annotationModule.updateModifiedDate(pageAnnotationObject.annotations[z]);
                            if (this.pdfViewerBase.isJsonExported) {
                                if (pageAnnotationObject.annotations[z].isAnnotationRotated) {
                                    pageAnnotationObject.annotations[z].bounds = this.pdfViewer.annotation.getBounds(pageAnnotationObject.annotations[z].bounds, pageAnnotationObject.pageIndex);
                                    pageAnnotationObject.annotations[z].vertexPoints = this.pdfViewer.annotation.getVertexPoints(pageAnnotationObject.annotations[z].vertexPoints, pageAnnotationObject.pageIndex);
                                }
                                else {
                                    var pageDetails = this.pdfViewerBase.pageSize[pageAnnotationObject.pageIndex];
                                    if (pageDetails) {
                                        pageAnnotationObject.annotations[z].annotationRotation = pageDetails.rotation;
                                        ;
                                    }
                                }
                            }
                            // eslint-disable-next-line max-len
                            pageAnnotationObject.annotations[z].bounds = JSON.stringify(this.pdfViewer.annotation.getBounds(pageAnnotationObject.annotations[z].bounds, pageAnnotationObject.pageIndex));
                            var strokeColorString = pageAnnotationObject.annotations[z].strokeColor;
                            pageAnnotationObject.annotations[z].strokeColor = JSON.stringify(this.getRgbCode(strokeColorString));
                            var fillColorString = pageAnnotationObject.annotations[z].fillColor;
                            pageAnnotationObject.annotations[z].fillColor = JSON.stringify(this.getRgbCode(fillColorString));
                            // eslint-disable-next-line max-len
                            pageAnnotationObject.annotations[z].vertexPoints = JSON.stringify(this.pdfViewer.annotation.getVertexPoints(pageAnnotationObject.annotations[z].vertexPoints, pageAnnotationObject.pageIndex));
                            if (pageAnnotationObject.annotations[z].rectangleDifference !== null) {
                                // eslint-disable-next-line max-len
                                pageAnnotationObject.annotations[z].rectangleDifference = JSON.stringify(pageAnnotationObject.annotations[z].rectangleDifference);
                            }
                            if (pageAnnotationObject.annotations[z].enableShapeLabel === true) {
                                // eslint-disable-next-line max-len
                                pageAnnotationObject.annotations[z].labelBounds = JSON.stringify(this.pdfViewer.annotationModule.inputElementModule.calculateLabelBounds(JSON.parse(pageAnnotationObject.annotations[z].bounds)));
                                var labelFillColorString = pageAnnotationObject.annotations[z].labelFillColor;
                                pageAnnotationObject.annotations[z].labelFillColor = JSON.stringify(this.getRgbCode(labelFillColorString));
                                var labelBorderColorString = pageAnnotationObject.annotations[z].labelBorderColor;
                                pageAnnotationObject.annotations[z].labelBorderColor = JSON.stringify(this.getRgbCode(labelBorderColorString));
                                pageAnnotationObject.annotations[z].labelSettings.fillColor = labelFillColorString;
                                var fontColorString = pageAnnotationObject.annotations[z].labelSettings.fontColor;
                                pageAnnotationObject.annotations[z].fontColor = JSON.stringify(this.getRgbCode(fontColorString));
                            }
                        }
                        else {
                            pageAnnotationObject.annotations[z] = "";
                        }
                    }
                    pageAnnotationObject.annotations = pageAnnotationObject.annotations.filter(function (item) { return item; });
                    newArray = pageAnnotationObject.annotations;
                }
                annotations[pageAnnotationObject.pageIndex] = newArray;
            }
        }
        return JSON.stringify(annotations);
    };
    ShapeAnnotation.prototype.manageAnnotations = function (pageAnnotations, pageNumber) {
        // eslint-disable-next-line
        var storeObject = window.sessionStorage.getItem(this.pdfViewerBase.documentId + '_annotations_shape');
        if (this.pdfViewerBase.isStorageExceed) {
            storeObject = this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_shape'];
        }
        if (storeObject) {
            var annotObject = JSON.parse(storeObject);
            if (!this.pdfViewerBase.isStorageExceed) {
                window.sessionStorage.removeItem(this.pdfViewerBase.documentId + '_annotations_shape');
            }
            var index = this.pdfViewer.annotationModule.getPageCollection(annotObject, pageNumber);
            if (annotObject[index]) {
                annotObject[index].annotations = pageAnnotations;
            }
            var annotationStringified = JSON.stringify(annotObject);
            if (this.pdfViewerBase.isStorageExceed) {
                this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_shape'] = annotationStringified;
            }
            else {
                window.sessionStorage.setItem(this.pdfViewerBase.documentId + '_annotations_shape', annotationStringified);
            }
        }
    };
    ShapeAnnotation.prototype.createAnnotationObject = function (annotationModel) {
        var bound;
        var labelBound;
        var annotationName = this.pdfViewer.annotation.createGUID();
        if (!annotationModel.formFieldAnnotationType) {
            // eslint-disable-next-line max-len
            var commentsDivid = this.pdfViewer.annotation.stickyNotesAnnotationModule.addComments('shape', (annotationModel.pageIndex + 1), annotationModel.shapeAnnotationType);
            if (commentsDivid) {
                document.getElementById(commentsDivid).id = annotationName;
            }
        }
        annotationModel.annotName = annotationName;
        if (annotationModel.wrapper.bounds) {
            bound = {
                // eslint-disable-next-line max-len
                left: annotationModel.wrapper.bounds.x, top: annotationModel.wrapper.bounds.y, height: annotationModel.wrapper.bounds.height, width: annotationModel.wrapper.bounds.width,
                right: annotationModel.wrapper.bounds.right, bottom: annotationModel.wrapper.bounds.bottom
            };
            labelBound = this.pdfViewer.annotationModule.inputElementModule.calculateLabelBounds(annotationModel.wrapper.bounds);
        }
        else {
            bound = { left: 0, top: 0, height: 0, width: 0, right: 0, bottom: 0 };
            labelBound = { left: 0, top: 0, height: 0, width: 0, right: 0, bottom: 0 };
        }
        if (annotationModel.subject === 'Line' && annotationModel.shapeAnnotationType === 'Polygon') {
            annotationModel.author = this.pdfViewer.annotationModule.updateAnnotationAuthor('shape', 'Polygon');
        }
        else {
            annotationModel.author = this.pdfViewer.annotationModule.updateAnnotationAuthor('shape', annotationModel.subject);
        }
        this.pdfViewer.annotation.stickyNotesAnnotationModule.addTextToComments(annotationName, annotationModel.notes);
        // eslint-disable-next-line radix
        var borderDashArray = parseInt(annotationModel.borderDashArray);
        borderDashArray = isNaN(borderDashArray) ? 0 : borderDashArray;
        // eslint-disable-next-line
        var annotationSettings = this.pdfViewer.annotationModule.findAnnotationSettings(annotationModel, true);
        annotationModel.isPrint = annotationSettings.isPrint;
        var setting = this.pdfViewer.shapeLabelSettings;
        var labelSettings = { borderColor: annotationModel.strokeColor, fillColor: annotationModel.fillColor, fontColor: annotationModel.fontColor,
            fontSize: annotationModel.fontSize, labelContent: annotationModel.labelContent, labelHeight: setting.labelHeight, labelWidth: setting.labelMaxWidth, opacity: annotationModel.opacity
        };
        return {
            // eslint-disable-next-line max-len
            id: annotationModel.id, shapeAnnotationType: this.getShapeAnnotType(annotationModel.shapeAnnotationType), author: annotationModel.author, allowedInteractions: this.pdfViewer.annotationModule.updateAnnotationAllowedInteractions(annotationModel), subject: annotationModel.subject, note: annotationModel.notes,
            strokeColor: annotationModel.strokeColor, annotName: annotationName, comments: [], review: { state: '', stateModel: '', modifiedDate: this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime(), author: annotationModel.author },
            fillColor: annotationModel.fillColor, opacity: annotationModel.opacity, thickness: annotationModel.thickness, pageNumber: annotationModel.pageIndex,
            // eslint-disable-next-line max-len
            borderStyle: annotationModel.borderStyle, borderDashArray: borderDashArray, bounds: bound, modifiedDate: this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime(),
            rotateAngle: 'RotateAngle' + annotationModel.rotateAngle, isCloudShape: annotationModel.isCloudShape, cloudIntensity: annotationModel.cloudIntensity,
            // eslint-disable-next-line max-len
            vertexPoints: annotationModel.vertexPoints, lineHeadStart: this.pdfViewer.annotation.getArrowTypeForCollection(annotationModel.sourceDecoraterShapes),
            lineHeadEnd: this.pdfViewer.annotation.getArrowTypeForCollection(annotationModel.taregetDecoraterShapes), rectangleDifference: [], isLocked: annotationSettings.isLock,
            // eslint-disable-next-line max-len
            labelContent: annotationModel.labelContent, enableShapeLabel: annotationModel.enableShapeLabel, labelFillColor: annotationModel.labelFillColor,
            fontColor: annotationModel.fontColor, labelBorderColor: annotationModel.labelBorderColor, fontSize: annotationModel.fontSize,
            // eslint-disable-next-line max-len
            labelBounds: labelBound, annotationSelectorSettings: this.getSelector(annotationModel.shapeAnnotationType, annotationModel.subject), labelSettings: labelSettings, annotationSettings: annotationSettings,
            customData: this.pdfViewer.annotation.getShapeData(annotationModel.shapeAnnotationType, annotationModel.subject), isPrint: annotationModel.isPrint, isCommentLock: annotationModel.isCommentLock, isAnnotationRotated: false
        };
    };
    ShapeAnnotation.prototype.getSelector = function (type, subject) {
        var selector = this.pdfViewer.annotationSelectorSettings;
        if (type === 'Line' && subject !== 'Arrow' && this.pdfViewer.lineSettings.annotationSelectorSettings) {
            selector = this.pdfViewer.lineSettings.annotationSelectorSettings;
        }
        else if ((type === 'LineWidthArrowHead' || subject === 'Arrow') && this.pdfViewer.lineSettings.annotationSelectorSettings) {
            selector = this.pdfViewer.arrowSettings.annotationSelectorSettings;
        }
        else if ((type === 'Rectangle' || type === 'Square') && this.pdfViewer.rectangleSettings.annotationSelectorSettings) {
            selector = this.pdfViewer.rectangleSettings.annotationSelectorSettings;
        }
        else if ((type === 'Ellipse' || type === 'Circle') && this.pdfViewer.circleSettings.annotationSelectorSettings) {
            selector = this.pdfViewer.circleSettings.annotationSelectorSettings;
        }
        else if (type === 'Polygon' && this.pdfViewer.polygonSettings.annotationSelectorSettings) {
            selector = this.pdfViewer.polygonSettings.annotationSelectorSettings;
        }
        return selector;
    };
    // eslint-disable-next-line
    ShapeAnnotation.prototype.getAnnotations = function (pageIndex, shapeAnnotations) {
        // eslint-disable-next-line
        var annotationCollection;
        // eslint-disable-next-line
        var storeObject = window.sessionStorage.getItem(this.pdfViewerBase.documentId + '_annotations_shape');
        if (this.pdfViewerBase.isStorageExceed) {
            storeObject = this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_shape'];
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
    ShapeAnnotation.prototype.getRgbCode = function (colorString) {
        if (!colorString.match(/#([a-z0-9]+)/gi) && !colorString.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/)) {
            colorString = this.pdfViewer.annotationModule.nameToHash(colorString);
        }
        var stringArray = colorString.split(',');
        if (isNullOrUndefined(stringArray[1])) {
            colorString = this.pdfViewer.annotationModule.getValue(colorString, 'rgba');
            stringArray = colorString.split(',');
        }
        // eslint-disable-next-line radix
        var r = parseInt(stringArray[0].split('(')[1]);
        // eslint-disable-next-line radix
        var g = parseInt(stringArray[1]);
        // eslint-disable-next-line radix
        var b = parseInt(stringArray[2]);
        // eslint-disable-next-line radix
        var a = parseFloat(stringArray[3]);
        return { r: r, g: g, b: b, a: a };
    };
    /**
     * @param annotation
     * @param pageNumber
     * @param annotation
     * @param pageNumber
     * @private
     */
    // eslint-disable-next-line
    ShapeAnnotation.prototype.saveImportedShapeAnnotations = function (annotation, pageNumber) {
        var annotationObject = null;
        var vertexPoints = null;
        annotation.Author = this.pdfViewer.annotationModule.updateAnnotationAuthor('shape', annotation.Subject);
        if (annotation.VertexPoints) {
            vertexPoints = [];
            for (var j = 0; j < annotation.VertexPoints.length; j++) {
                var point = { x: annotation.VertexPoints[j].X, y: annotation.VertexPoints[j].Y };
                vertexPoints.push(point);
            }
        }
        if (annotation.Bounds && annotation.EnableShapeLabel === true) {
            // eslint-disable-next-line max-len
            annotation.LabelBounds = this.pdfViewer.annotationModule.inputElementModule.calculateLabelBoundsFromLoadedDocument(annotation.Bounds);
            // eslint-disable-next-line max-len
            annotation.LabelBorderColor = annotation.LabelBorderColor ? annotation.LabelBorderColor : annotation.StrokeColor;
            annotation.FontColor = annotation.FontColor ? annotation.FontColor : annotation.StrokeColor;
            annotation.LabelFillColor = annotation.LabelFillColor ? annotation.LabelFillColor : annotation.FillColor;
            annotation.FontSize = annotation.FontSize ? annotation.FontSize : 16;
            annotation.LabelSettings = annotation.LabelSettings ? annotation.LabelSettings : this.pdfViewer.shapeLabelSettings;
        }
        // eslint-disable-next-line max-len
        annotation.AnnotationSettings = annotation.AnnotationSettings ? annotation.AnnotationSettings : this.pdfViewer.annotationModule.updateAnnotationSettings(annotation);
        // eslint-disable-next-line max-len
        annotation.allowedInteractions = annotation.AllowedInteractions ? annotation.AllowedInteractions : this.pdfViewer.annotationModule.updateAnnotationAllowedInteractions(annotation);
        // eslint-disable-next-line max-len
        annotationObject = {
            id: 'shape', shapeAnnotationType: annotation.ShapeAnnotationType, author: annotation.Author, allowedInteractions: annotation.allowedInteractions, modifiedDate: annotation.ModifiedDate, subject: annotation.Subject, pageNumber: pageNumber,
            // eslint-disable-next-line max-len
            note: annotation.Note, strokeColor: annotation.StrokeColor, fillColor: annotation.FillColor, opacity: annotation.Opacity, thickness: annotation.Thickness, rectangleDifference: annotation.RectangleDifference,
            borderStyle: annotation.BorderStyle, borderDashArray: annotation.BorderDashArray, rotateAngle: annotation.RotateAngle, isCloudShape: annotation.IsCloudShape,
            // eslint-disable-next-line max-len
            cloudIntensity: annotation.CloudIntensity, vertexPoints: vertexPoints, lineHeadStart: annotation.LineHeadStart, lineHeadEnd: annotation.LineHeadEnd, isLocked: annotation.IsLocked, comments: this.pdfViewer.annotationModule.getAnnotationComments(annotation.Comments, annotation, annotation.Author), review: { state: annotation.State, stateModel: annotation.StateModel, modifiedDate: annotation.ModifiedDate, author: annotation.Author }, annotName: annotation.AnnotName,
            bounds: { left: annotation.Bounds.X, top: annotation.Bounds.Y, width: annotation.Bounds.Width, height: annotation.Bounds.Height, right: annotation.Bounds.Right, bottom: annotation.Bounds.Bottom },
            labelContent: annotation.LabelContent, enableShapeLabel: annotation.EnableShapeLabel, labelFillColor: annotation.LabelFillColor,
            labelBorderColor: annotation.LabelBorderColor, fontColor: annotation.FontColor, fontSize: annotation.FontSize,
            // eslint-disable-next-line max-len
            labelBounds: annotation.LabelBounds, annotationSelectorSettings: this.getSettings(annotation), labelSettings: annotation.LabelSettings, annotationSettings: annotation.AnnotationSettings,
            customData: this.pdfViewer.annotation.getCustomData(annotation), isPrint: annotation.IsPrint, isCommentLock: annotation.IsCommentLock, isAnnotationRotated: false
        };
        this.pdfViewer.annotationModule.storeAnnotations(pageNumber, annotationObject, '_annotations_shape');
    };
    /**
     * @param annotation
     * @param pageNumber
     * @param annotation
     * @param pageNumber
     * @private
     */
    // eslint-disable-next-line
    ShapeAnnotation.prototype.updateShapeAnnotationCollections = function (annotation, pageNumber) {
        // eslint-disable-next-line
        var annotationObject = null;
        var vertexPoints = null;
        if (annotation.VertexPoints) {
            vertexPoints = [];
            for (var j = 0; j < annotation.VertexPoints.length; j++) {
                var point = { x: annotation.VertexPoints[j].X, y: annotation.VertexPoints[j].Y };
                vertexPoints.push(point);
            }
        }
        if (annotation.Bounds && annotation.EnableShapeLabel === true) {
            // eslint-disable-next-line max-len
            annotation.LabelBounds = this.pdfViewer.annotationModule.inputElementModule.calculateLabelBoundsFromLoadedDocument(annotation.Bounds);
            // eslint-disable-next-line max-len
            annotation.LabelBorderColor = annotation.LabelBorderColor ? annotation.LabelBorderColor : annotation.StrokeColor;
            annotation.FontColor = annotation.FontColor ? annotation.FontColor : annotation.StrokeColor;
            annotation.LabelFillColor = annotation.LabelFillColor ? annotation.LabelFillColor : annotation.FillColor;
            annotation.FontSize = annotation.FontSize ? annotation.FontSize : 16;
            var settings = this.pdfViewer.shapeLabelSettings;
            var labelSettings = { borderColor: annotation.StrokeColor, fillColor: annotation.FillColor, fontColor: annotation.FontColor,
                fontSize: annotation.FontSize, labelContent: annotation.LabelContent, labelHeight: settings.labelHeight, labelWidth: settings.labelWidth, opacity: annotation.Opacity
            };
            annotation.LabelSettings = annotation.LabelSettings ? annotation.LabelSettings : labelSettings;
        }
        // eslint-disable-next-line max-len
        annotation.AnnotationSettings = annotation.AnnotationSettings ? annotation.AnnotationSettings : this.pdfViewer.annotationModule.updateAnnotationSettings(annotation);
        if (annotation.IsLocked) {
            annotation.AnnotationSettings.isLock = annotation.IsLocked;
        }
        // eslint-disable-next-line max-len
        annotation.allowedInteractions = annotation.AllowedInteractions ? annotation.AllowedInteractions : this.pdfViewer.annotationModule.updateAnnotationAllowedInteractions(annotation);
        // eslint-disable-next-line max-len
        annotationObject = {
            id: 'shape', shapeAnnotationType: annotation.ShapeAnnotationType, author: annotation.Author, allowedInteractions: annotation.allowedInteractions, modifiedDate: annotation.ModifiedDate, subject: annotation.Subject,
            // eslint-disable-next-line max-len
            note: annotation.Note, strokeColor: annotation.StrokeColor, fillColor: annotation.FillColor, opacity: annotation.Opacity, thickness: annotation.Thickness, rectangleDifference: annotation.RectangleDifference,
            borderStyle: annotation.BorderStyle, borderDashArray: annotation.BorderDashArray, rotateAngle: annotation.RotateAngle, isCloudShape: annotation.IsCloudShape,
            // eslint-disable-next-line max-len
            cloudIntensity: annotation.CloudIntensity, vertexPoints: vertexPoints, lineHeadStart: annotation.LineHeadStart, lineHeadEnd: annotation.LineHeadEnd, isLocked: annotation.IsLocked, comments: this.pdfViewer.annotationModule.getAnnotationComments(annotation.Comments, annotation, annotation.Author), review: { state: annotation.State, stateModel: annotation.StateModel, modifiedDate: annotation.ModifiedDate, author: annotation.Author }, annotationId: annotation.AnnotName,
            bounds: { left: annotation.Bounds.X, top: annotation.Bounds.Y, width: annotation.Bounds.Width, height: annotation.Bounds.Height, right: annotation.Bounds.Right, bottom: annotation.Bounds.Bottom },
            labelContent: annotation.LabelContent, enableShapeLabel: annotation.EnableShapeLabel, labelFillColor: annotation.LabelFillColor,
            labelBorderColor: annotation.LabelBorderColor, fontColor: annotation.FontColor, fontSize: annotation.FontSize,
            // eslint-disable-next-line max-len
            labelBounds: annotation.LabelBounds, pageNumber: pageNumber, labelSettings: annotation.LabelSettings, annotationSettings: annotation.AnnotationSettings,
            customData: this.pdfViewer.annotation.getCustomData(annotation), isPrint: annotation.IsPrint, isCommentLock: annotation.IsCommentLock
        };
        return annotationObject;
    };
    /**
     * This method used to add annotations with using program.
     *
     * @param annotationType - It describes the annotation type
     * @param annotationObject - It describes type of annotation object
     * @param offset - It describes about the annotation bounds or location
     * @returns Object
     * @private
     */
    ShapeAnnotation.prototype.updateAddAnnotationDetails = function (annotationType, annotationObject, offset) {
        //Creating new object if annotationObject is null
        if (!annotationObject) {
            annotationObject = { offset: { x: 10, y: 10 }, pageNumber: 0, width: undefined, height: undefined };
            offset = annotationObject.offset;
        }
        else if (!annotationObject.offset)
            offset = { x: 10, y: 10 };
        else
            offset = annotationObject.offset;
        //Initialize the annotation settings
        var annotationSelectorSettings = null;
        var allowedInteractions = null;
        var annotationSettings = null;
        var shapeAnnotationType = '';
        var isArrow = false;
        var vertexPoints = null;
        //Creating the CurrentDate and Annotation name
        var currentDateString = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
        var annotationName = this.pdfViewer.annotation.createGUID();
        if (annotationType == 'Line') {
            //Creating annotation settings
            annotationSelectorSettings = this.pdfViewer.lineSettings.annotationSelectorSettings ? this.pdfViewer.lineSettings.annotationSelectorSettings : this.pdfViewer.annotationSelectorSettings;
            annotationSettings = this.pdfViewer.annotationModule.updateSettings(this.pdfViewer.lineSettings);
            annotationObject.author = this.pdfViewer.annotationModule.updateAnnotationAuthor('shape', annotationType);
            allowedInteractions = this.pdfViewer.lineSettings.allowedInteractions ? this.pdfViewer.lineSettings.allowedInteractions : this.pdfViewer.annotationSettings.allowedInteractions;
            shapeAnnotationType = 'Line';
            if (annotationObject.vertexPoints)
                vertexPoints = annotationObject.vertexPoints;
            else
                vertexPoints = [{ x: offset.x, y: offset.y }, { x: offset.x + 100, y: offset.y }];
            annotationObject.width = annotationObject.width ? annotationObject.width : 1;
            annotationObject.height = annotationObject.height ? annotationObject.height : 1;
        }
        else if (annotationType == 'Arrow') {
            //Creating annotation settings
            annotationSelectorSettings = this.pdfViewer.arrowSettings.annotationSelectorSettings ? this.pdfViewer.arrowSettings.annotationSelectorSettings : this.pdfViewer.annotationSelectorSettings;
            annotationSettings = this.pdfViewer.annotationModule.updateSettings(this.pdfViewer.arrowSettings);
            annotationObject.author = this.pdfViewer.annotationModule.updateAnnotationAuthor('shape', annotationType);
            allowedInteractions = this.pdfViewer.arrowSettings.allowedInteractions ? this.pdfViewer.arrowSettings.allowedInteractions : this.pdfViewer.annotationSettings.allowedInteractions;
            shapeAnnotationType = 'Line';
            isArrow = true;
            if (annotationObject.vertexPoints)
                vertexPoints = annotationObject.vertexPoints;
            else
                vertexPoints = [{ x: offset.x, y: offset.y }, { x: offset.x + 100, y: offset.y }];
            annotationObject.width = annotationObject.width ? annotationObject.width : 1;
            annotationObject.height = annotationObject.height ? annotationObject.height : 1;
        }
        else if (annotationType == 'Rectangle') {
            //Creating annotation settings
            annotationSelectorSettings = this.pdfViewer.rectangleSettings.annotationSelectorSettings ? this.pdfViewer.rectangleSettings.annotationSelectorSettings : this.pdfViewer.annotationSelectorSettings;
            annotationSettings = this.pdfViewer.annotationModule.updateSettings(this.pdfViewer.rectangleSettings);
            annotationObject.author = this.pdfViewer.annotationModule.updateAnnotationAuthor('shape', annotationType);
            allowedInteractions = this.pdfViewer.rectangleSettings.allowedInteractions ? this.pdfViewer.rectangleSettings.allowedInteractions : this.pdfViewer.annotationSettings.allowedInteractions;
            shapeAnnotationType = 'Square';
            annotationObject.width = annotationObject.width ? annotationObject.width : 150;
            annotationObject.height = annotationObject.height ? annotationObject.height : 75;
        }
        else if (annotationType == 'Circle') {
            //Creating annotation settings
            annotationSelectorSettings = this.pdfViewer.circleSettings.annotationSelectorSettings ? this.pdfViewer.circleSettings.annotationSelectorSettings : this.pdfViewer.annotationSelectorSettings;
            annotationSettings = this.pdfViewer.annotationModule.updateSettings(this.pdfViewer.circleSettings);
            annotationObject.author = this.pdfViewer.annotationModule.updateAnnotationAuthor('shape', annotationType);
            allowedInteractions = this.pdfViewer.circleSettings.allowedInteractions ? this.pdfViewer.circleSettings.allowedInteractions : this.pdfViewer.annotationSettings.allowedInteractions;
            shapeAnnotationType = 'Circle';
            annotationObject.width = annotationObject.width ? annotationObject.width : 100;
            annotationObject.height = annotationObject.height ? annotationObject.height : 90;
        }
        else if (annotationType == 'Polygon') {
            //Creating annotation settings
            annotationSelectorSettings = this.pdfViewer.polygonSettings.annotationSelectorSettings ? this.pdfViewer.polygonSettings.annotationSelectorSettings : this.pdfViewer.annotationSelectorSettings;
            annotationSettings = this.pdfViewer.annotationModule.updateSettings(this.pdfViewer.polygonSettings);
            annotationObject.author = this.pdfViewer.annotationModule.updateAnnotationAuthor('shape', annotationType);
            allowedInteractions = this.pdfViewer.polygonSettings.allowedInteractions ? this.pdfViewer.polygonSettings.allowedInteractions : this.pdfViewer.annotationSettings.allowedInteractions;
            shapeAnnotationType = 'Polygon';
            if (annotationObject.vertexPoints)
                vertexPoints = annotationObject.vertexPoints;
            else
                vertexPoints = [{ x: offset.x, y: offset.y }, { x: offset.x + 42, y: offset.y - 29 }, { x: offset.x + 89, y: offset.y - 1 }, { x: offset.x + 78, y: offset.y + 42 }, { x: offset.x + 11, y: offset.y + 42 }, { x: offset.x, y: offset.y }];
            annotationObject.width = annotationObject.width ? annotationObject.width : 1;
            annotationObject.height = annotationObject.height ? annotationObject.height : 1;
        }
        annotationSettings.isLock = annotationObject.isLock ? annotationObject.isLock : annotationSettings.isLock;
        annotationSettings.minHeight = annotationObject.minHeight ? annotationObject.minHeight : annotationSettings.minHeight;
        annotationSettings.minWidth = annotationObject.minWidth ? annotationObject.minWidth : annotationSettings.minWidth;
        annotationSettings.maxWidth = annotationObject.maxWidth ? annotationObject.maxWidth : annotationSettings.maxWidth;
        annotationSettings.maxHeight = annotationObject.maxHeight ? annotationObject.maxHeight : annotationSettings.maxHeight;
        //Converting points model into vertex property
        if (vertexPoints)
            vertexPoints = this.pdfViewer.annotation.getVertexPointsXY(vertexPoints);
        //Creating Annotation objects with it's proper properties
        var shapeAnnotation = [];
        var shape = {
            AllowedInteractions: annotationObject.allowedInteractions ? annotationObject.allowedInteractions : allowedInteractions,
            AnnotName: annotationName,
            AnnotType: 'shape',
            AnnotationSelectorSettings: annotationObject.annotationSelectorSettings ? annotationObject.annotationSelectorSettings : annotationSelectorSettings,
            AnnotationSettings: annotationSettings,
            Author: annotationObject.author ? annotationObject.author : 'Guest',
            BorderDashArray: annotationObject.borderDashArray ? annotationObject.borderDashArray : 0,
            BorderStyle: 'Solid',
            Bounds: { X: offset.x, Y: offset.y, Width: annotationObject.width, Height: annotationObject.height, Left: offset.x, Top: offset.y, Location: { X: offset.x, Y: offset.y }, Size: { Height: annotationObject.height, IsEmpty: false, Width: annotationObject.width } },
            CloudIntensity: 0,
            Comments: null,
            CustomData: annotationObject.customData ? annotationObject.customData : null,
            CreatedDate: currentDateString,
            EnableShapeLabel: false,
            ExistingCustomData: null,
            FillColor: annotationObject.fillColor ? annotationObject.fillColor : '#ffffff00',
            FontColor: null,
            FontSize: 0,
            IsCloudShape: false,
            IsCommentLock: false,
            IsLocked: annotationObject.isLock ? annotationObject.isLock : false,
            IsPrint: annotationObject.isPrint ? annotationObject.isPrint : true,
            LabelBorderColor: null,
            LabelBounds: { X: 0, Y: 0, Width: 0, Height: 0 },
            LabelContent: null,
            LabelFillColor: null,
            LabelSettings: null,
            LineHeadEnd: annotationObject.lineHeadStartStyle ? annotationObject.lineHeadStartStyle : isArrow ? 'ClosedArrow' : 'None',
            LineHeadStart: annotationObject.lineHeadEndStyle ? annotationObject.lineHeadEndStyle : isArrow ? 'ClosedArrow' : 'None',
            ModifiedDate: '',
            Note: '',
            Opacity: annotationObject.opacity ? annotationObject.opacity : 1,
            RectangleDifference: null,
            RotateAngle: 'RotateAngle0',
            ShapeAnnotationType: shapeAnnotationType,
            State: '',
            StateModel: '',
            StrokeColor: annotationObject.strokeColor ? annotationObject.strokeColor : '#ff0000',
            Subject: annotationType.toString(),
            Thickness: annotationObject.thickness ? annotationObject.thickness : 1,
            VertexPoints: vertexPoints
        };
        //Adding the annotation object to an array and return it
        shapeAnnotation[0] = shape;
        return { shapeAnnotation: shapeAnnotation };
    };
    return ShapeAnnotation;
}());
export { ShapeAnnotation };
