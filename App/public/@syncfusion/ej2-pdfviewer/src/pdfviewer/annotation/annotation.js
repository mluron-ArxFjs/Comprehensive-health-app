import { TextMarkupAnnotation, ShapeAnnotation, StampAnnotation, StickyNotesAnnotation, MeasureAnnotation, InkAnnotation, AllowedInteraction, DynamicStampItem, SignStampItem, StandardBusinessStampItem } from '../index';
import { createElement, Browser, isNullOrUndefined, isBlazor } from '@syncfusion/ej2-base';
import { NumericTextBox, Slider, ColorPicker } from '@syncfusion/ej2-inputs';
import { Dialog } from '@syncfusion/ej2-popups';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
import { processPathData, splitArrayCollection } from '@syncfusion/ej2-drawings';
import { isLineShapes, cloneObject } from '../drawing/drawing-util';
import { NodeDrawingTool, LineTool, MoveTool, ResizeTool, ConnectTool } from '../drawing/tools';
import { updateDistanceLabel, updateRadiusLabel, updatePerimeterLabel, updateCalibrateLabel } from '../drawing/connector-util';
import { FreeTextAnnotation } from './free-text-annotation';
import { InputElement } from './input-element';
import { InPlaceEditor } from '@syncfusion/ej2-inplace-editor';
/**
 * The `Annotation` module is used to handle annotation actions of PDF viewer.
 */
var Annotation = /** @class */ (function () {
    /**
     * @param pdfViewer
     * @param viewerBase
     * @param pdfViewer
     * @param viewerBase
     * @private
     */
    function Annotation(pdfViewer, viewerBase) {
        this.isUndoRedoAction = false;
        this.isUndoAction = false;
        this.annotationSelected = true;
        this.isAnnotDeletionApiCall = false;
        this.removedDocumentAnnotationCollection = [];
        /**
         * @private
         */
        this.isShapeCopied = false;
        /**
         * @private
         */
        this.actionCollection = [];
        /**
         * @private
         */
        this.redoCollection = [];
        /**
         * @private
         */
        this.isPopupNoteVisible = false;
        /**
         * @private
         */
        this.undoCommentsElement = [];
        /**
         * @private
         */
        this.redoCommentsElement = [];
        /**
         * @private
         */
        this.selectAnnotationId = null;
        /**
         * @private
         */
        this.isAnnotationSelected = false;
        /**
         * @private
         */
        this.annotationPageIndex = null;
        this.previousIndex = null;
        // eslint-disable-next-line
        this.overlappedAnnotations = [];
        /**
         * @private
         */
        // eslint-disable-next-line
        this.overlappedCollections = [];
        /**
         * @private
         */
        // eslint-disable-next-line
        this.isFormFieldShape = false;
        /**
         * @private
         */
        // eslint-disable-next-line
        this.removedAnnotationCollection = [];
        this.pdfViewer = pdfViewer;
        this.pdfViewerBase = viewerBase;
        if (this.pdfViewer.enableTextMarkupAnnotation) {
            this.textMarkupAnnotationModule = new TextMarkupAnnotation(this.pdfViewer, this.pdfViewerBase);
        }
        if (this.pdfViewer.enableShapeAnnotation) {
            this.shapeAnnotationModule = new ShapeAnnotation(this.pdfViewer, this.pdfViewerBase);
        }
        if (this.pdfViewer.enableMeasureAnnotation) {
            this.measureAnnotationModule = new MeasureAnnotation(this.pdfViewer, this.pdfViewerBase);
        }
        this.stampAnnotationModule = new StampAnnotation(this.pdfViewer, this.pdfViewerBase);
        this.stickyNotesAnnotationModule = new StickyNotesAnnotation(this.pdfViewer, this.pdfViewerBase);
        this.freeTextAnnotationModule = new FreeTextAnnotation(this.pdfViewer, this.pdfViewerBase);
        this.inputElementModule = new InputElement(this.pdfViewer, this.pdfViewerBase);
        this.inkAnnotationModule = new InkAnnotation(this.pdfViewer, this.pdfViewerBase);
    }
    /**
     * Set annotation type to be added in next user interaction in PDF Document.
     *
     * @param type
     * @param dynamicStampItem
     * @param signStampItem
     * @param standardBusinessStampItem
     * @returns void
     */
    // eslint-disable-next-line max-len
    Annotation.prototype.setAnnotationMode = function (type, dynamicStampItem, signStampItem, standardBusinessStampItem) {
        var allowServerDataBind = this.pdfViewer.allowServerDataBinding;
        this.pdfViewer.enableServerDataBinding(false);
        if (this.pdfViewer.tool === "Stamp" && this.pdfViewer.toolbarModule) {
            this.pdfViewer.toolbarModule.updateStampItems();
        }
        if (this.pdfViewer.toolbarModule && this.pdfViewer.toolbarModule.annotationToolbarModule) {
            this.pdfViewer.toolbarModule.annotationToolbarModule.resetFreeTextAnnot();
        }
        type !== 'None' ? this.triggerAnnotationUnselectEvent() : null;
        this.pdfViewer.tool = "";
        if (this.pdfViewer.toolbarModule) {
            this.pdfViewer.toolbarModule.deSelectCommentAnnotation();
        }
        if (type === 'None') {
            this.clearAnnotationMode();
        }
        else if (type === 'Highlight' || type === 'Strikethrough' || type === 'Underline') {
            if (this.textMarkupAnnotationModule) {
                this.textMarkupAnnotationModule.isSelectionMaintained = false;
                this.textMarkupAnnotationModule.drawTextMarkupAnnotations(type.toString());
            }
        }
        else if (type === 'Line' || type === 'Arrow' || type === 'Rectangle' || type === 'Circle' || type === 'Polygon') {
            if (this.shapeAnnotationModule) {
                this.shapeAnnotationModule.setAnnotationType(type);
            }
        }
        else if (type === 'Distance' || type === 'Perimeter' || type === 'Area' || type === 'Radius' || type === 'Volume') {
            if (this.measureAnnotationModule) {
                this.measureAnnotationModule.setAnnotationType(type);
            }
        }
        else if (type === 'FreeText' && this.freeTextAnnotationModule) {
            this.freeTextAnnotationModule.setAnnotationType('FreeText');
            this.freeTextAnnotationModule.isNewFreeTextAnnot = true;
            this.freeTextAnnotationModule.isNewAddedAnnot = true;
        }
        else if (type === 'HandWrittenSignature') {
            this.pdfViewerBase.signatureModule.setAnnotationMode();
        }
        else if (type === 'Initial') {
            this.pdfViewerBase.signatureModule.setInitialMode();
        }
        else if (type === 'Ink') {
            this.inkAnnotationModule.setAnnotationMode();
        }
        else if (type === 'StickyNotes') {
            this.pdfViewerBase.isCommentIconAdded = true;
            this.pdfViewerBase.isAddComment = true;
            // eslint-disable-next-line max-len
            var pageDiv = document.getElementById(this.pdfViewer.element.id + '_pageDiv_' + (this.pdfViewerBase.currentPageNumber - 1));
            if (pageDiv) {
                pageDiv.addEventListener('mousedown', this.pdfViewer.annotationModule.stickyNotesAnnotationModule.drawIcons.bind(this));
            }
        }
        else if (type === 'Stamp') {
            this.pdfViewer.annotation.stampAnnotationModule.isStampAddMode = true;
            this.pdfViewer.annotationModule.stampAnnotationModule.isStampAnnotSelected = true;
            this.pdfViewerBase.stampAdded = true;
            if (dynamicStampItem) {
                // eslint-disable-next-line
                var stampName = DynamicStampItem[dynamicStampItem];
                this.pdfViewerBase.isDynamicStamp = true;
                this.stampAnnotationModule.retrieveDynamicStampAnnotation(stampName);
            }
            else if (signStampItem) {
                // eslint-disable-next-line
                var stampName = SignStampItem[signStampItem];
                this.pdfViewerBase.isDynamicStamp = false;
                this.stampAnnotationModule.retrievestampAnnotation(stampName);
            }
            else if (standardBusinessStampItem) {
                // eslint-disable-next-line
                var stampName = StandardBusinessStampItem[standardBusinessStampItem];
                this.pdfViewerBase.isDynamicStamp = false;
                this.stampAnnotationModule.retrievestampAnnotation(stampName);
            }
        }
        this.pdfViewer.enableServerDataBinding(allowServerDataBind, true);
        this.pdfViewerBase.initiateTextSelection();
    };
    Annotation.prototype.deleteAnnotationById = function (annotationId) {
        if (annotationId) {
            this.isAnnotDeletionApiCall = true;
            this.annotationSelected = false;
            this.selectAnnotation(annotationId);
            this.deleteAnnotation();
            this.isAnnotDeletionApiCall = false;
        }
    };
    Annotation.prototype.clearAnnotationMode = function () {
        if (this.textMarkupAnnotationModule) {
            this.textMarkupAnnotationModule.isTextMarkupAnnotationMode = false;
        }
        if (this.freeTextAnnotationModule) {
            this.freeTextAnnotationModule.isNewFreeTextAnnot = false;
            this.freeTextAnnotationModule.isNewAddedAnnot = false;
        }
        if (this.pdfViewerBase.isTextMarkupAnnotationModule()) {
            this.pdfViewer.annotation.textMarkupAnnotationModule.currentTextMarkupAddMode = '';
        }
        if (this.pdfViewerBase.isShapeAnnotationModule()) {
            this.pdfViewer.annotation.shapeAnnotationModule.currentAnnotationMode = '';
        }
        if (this.pdfViewerBase.isCalibrateAnnotationModule()) {
            this.pdfViewer.annotation.measureAnnotationModule.currentAnnotationMode = '';
        }
        if (this.pdfViewer.annotationModule.inkAnnotationModule) {
            // eslint-disable-next-line
            var currentPageNumber = parseInt(this.pdfViewer.annotationModule.inkAnnotationModule.currentPageNumber);
            this.pdfViewer.annotationModule.inkAnnotationModule.drawInkAnnotation(currentPageNumber);
        }
    };
    Annotation.prototype.deleteAnnotation = function () {
        if (this.textMarkupAnnotationModule) {
            this.textMarkupAnnotationModule.deleteTextMarkupAnnotation();
        }
        var selectedAnnotation = this.pdfViewer.selectedItems.annotations[0];
        if (selectedAnnotation) {
            var data = window.sessionStorage.getItem(this.pdfViewerBase.documentId + '_formfields');
            var formFieldsData = JSON.parse(data);
            var newFormFieldsData = [];
            if (formFieldsData) {
                for (var x = 0; x < formFieldsData.length; x++) {
                    if (formFieldsData[x].uniqueID == selectedAnnotation.id) {
                        formFieldsData[x].Value = '';
                        for (var y = 0; y < formFieldsData.length; y++) {
                            if (formFieldsData[y].Name === 'ink') {
                                formFieldsData[y].Value = '';
                            }
                            if (formFieldsData[x].FieldName === formFieldsData[y].FieldName && formFieldsData[y].Name === 'ink') {
                                formFieldsData.splice(y, 1);
                            }
                        }
                        newFormFieldsData.push(formFieldsData[x]);
                    }
                    else {
                        newFormFieldsData.push(formFieldsData[x]);
                    }
                }
                window.sessionStorage.setItem(this.pdfViewerBase.documentId + '_formfields', JSON.stringify(newFormFieldsData));
            }
        }
        var isLock = false;
        var isReadOnly = false;
        if (this.pdfViewer.selectedItems.annotations.length > 0) {
            // eslint-disable-next-line
            var annotation_1 = this.pdfViewer.selectedItems.annotations[0];
            var type = annotation_1.shapeAnnotationType;
            if (type === 'Path' || annotation_1.formFieldAnnotationType === 'SignatureField' || annotation_1.formFieldAnnotationType === 'InitialField' || type === 'HandWrittenSignature' || type === 'SignatureText' || type === 'SignatureImage') {
                var inputFields = document.getElementById(annotation_1.id);
                if (inputFields && inputFields.disabled) {
                    isReadOnly = true;
                }
            }
            if (annotation_1.annotationSettings) {
                isLock = annotation_1.annotationSettings.isLock;
                if (isLock && this.checkAllowedInteractions('Delete', annotation_1)) {
                    isLock = false;
                }
            }
            if (!isLock && !isReadOnly) {
                var pageNumber = annotation_1.pageIndex;
                // eslint-disable-next-line
                var shapeType = annotation_1.shapeAnnotationType;
                // eslint-disable-next-line
                var undoElement = void 0;
                if (shapeType === 'Line' || shapeType === 'LineWidthArrowHead' || shapeType === 'Polygon' || shapeType === 'Ellipse' || shapeType === 'Rectangle' || shapeType === 'Radius' || shapeType === 'Distance') {
                    // eslint-disable-next-line max-len
                    if (isNullOrUndefined(annotation_1.measureType) || annotation_1.measureType === '') {
                        this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(annotation_1, 'shape');
                        this.updateImportAnnotationCollection(annotation_1, pageNumber, 'shapeAnnotation');
                    }
                    else {
                        // eslint-disable-next-line max-len
                        this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(annotation_1, 'measure');
                        // eslint-disable-next-line max-len
                        this.updateImportAnnotationCollection(annotation_1, pageNumber, 'measureShapeAnnotation');
                    }
                    undoElement = this.modifyInCollections(annotation_1, 'delete');
                }
                else if (shapeType === 'FreeText') {
                    // eslint-disable-next-line max-len
                    this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(annotation_1, 'FreeText', 'delete');
                    undoElement = this.modifyInCollections(annotation_1, 'delete');
                    this.updateImportAnnotationCollection(annotation_1, pageNumber, 'freeTextAnnotation');
                }
                else if (shapeType === 'HandWrittenSignature' || shapeType === 'SignatureImage' || shapeType === 'SignatureText') {
                    undoElement = this.modifyInCollections(annotation_1, 'delete');
                }
                else if (shapeType === 'Ink') {
                    // eslint-disable-next-line max-len
                    this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(annotation_1, 'Ink', 'delete');
                    undoElement = this.modifyInCollections(annotation_1, 'delete');
                    this.updateImportAnnotationCollection(annotation_1, pageNumber, 'signatureInkAnnotation');
                }
                else {
                    undoElement = this.pdfViewer.selectedItems.annotations[0];
                    // eslint-disable-next-line max-len
                    this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(undoElement, undoElement.shapeAnnotationType, 'delete');
                    // eslint-disable-next-line max-len
                    this.pdfViewer.annotation.stampAnnotationModule.updateSessionStorage(annotation_1, null, 'delete');
                }
                if (shapeType === 'StickyNotes') {
                    this.updateImportAnnotationCollection(annotation_1, pageNumber, 'stickyNotesAnnotation');
                }
                if (shapeType === 'Stamp' || 'Image') {
                    this.updateImportAnnotationCollection(annotation_1, pageNumber, 'stampAnnotations');
                }
                // eslint-disable-next-line max-len
                this.pdfViewer.annotation.addAction(pageNumber, null, annotation_1, 'Delete', '', undoElement, annotation_1);
                // eslint-disable-next-line
                var removeDiv = void 0;
                if (annotation_1.annotName !== '') {
                    removeDiv = document.getElementById(annotation_1.annotName);
                }
                else {
                    if (undoElement) {
                        if (undoElement.annotName !== '') {
                            removeDiv = document.getElementById(undoElement.annotName);
                        }
                    }
                }
                this.removeCommentPanelDiv(removeDiv);
                var selectedAnnot = this.pdfViewer.selectedItems.annotations[0];
                var annotationId = selectedAnnot.annotName;
                var annotType = this.getAnnotationType(selectedAnnot.shapeAnnotationType, selectedAnnot.measureType);
                if (shapeType === 'Path' || selectedAnnot.formFieldAnnotationType === 'SignatureField' || selectedAnnot.formFieldAnnotationType === 'InitialField' || shapeType === 'HandWrittenSignature' || shapeType === 'SignatureText' || shapeType === 'SignatureImage') { // eslint-disable-next-line
                    var formFieldCollection = this.pdfViewer.retrieveFormFields();
                    var index = formFieldCollection.findIndex(function (el) { return el.id === annotation_1.id; });
                    var formFieldName = void 0;
                    if (index > -1) {
                        formFieldName = formFieldCollection[index].name;
                    }
                    for (var m = 0; m < formFieldCollection.length; m++) {
                        if (selectedAnnot.id === formFieldCollection[m].id || (isNullOrUndefined(formFieldName) && formFieldName === formFieldCollection[m].name)) {
                            formFieldCollection[m].value = '';
                            formFieldCollection[m].signatureType = '';
                            var annotation_2 = this.getAnnotationsFromCollections(formFieldCollection[m].id);
                            this.updateInputFieldDivElement(annotation_2);
                            undoElement = this.modifyInCollections(annotation_2, 'delete');
                            // eslint-disable-next-line max-len
                            this.pdfViewer.annotation.addAction(annotation_2.pageIndex, null, annotation_2, 'Delete', '', undoElement, annotation_2);
                            if (this.pdfViewer.formDesignerModule && selectedAnnot.formFieldAnnotationType)
                                this.updateFormFieldCollection(annotation_2);
                            else
                                this.updateAnnotationCollection(annotation_2);
                            this.pdfViewer.remove(annotation_2);
                        }
                    }
                    if (this.pdfViewer.formDesignerModule && selectedAnnot.formFieldAnnotationType)
                        this.updateFormFieldCollection(annotation_1);
                    else
                        this.updateAnnotationCollection(annotation_1);
                }
                if (this.pdfViewer.formDesignerModule && selectedAnnot.formFieldAnnotationType)
                    this.updateFormFieldCollection(annotation_1);
                else
                    this.updateAnnotationCollection(annotation_1);
                var formFieldObj = this.pdfViewer.nameTable[annotation_1.id.split("_")[0]];
                if (formFieldObj != null && (formFieldObj.formFieldAnnotationType === 'SignatureField' || formFieldObj.formFieldAnnotationType === 'InitialField')) {
                    var index = this.pdfViewer.formFieldCollections.findIndex(function (el) { return el.id === annotation_1.id.split("_")[0]; });
                    var formFieldName = void 0;
                    if (index > -1) {
                        formFieldName = this.pdfViewer.formFieldCollections[index].name;
                    }
                    for (var i = 0; i < this.pdfViewer.formFieldCollections.length; i++) {
                        if (formFieldName === this.pdfViewer.formFieldCollections[i].name) {
                            var formFieldsIndex = this.pdfViewer.formFieldCollections[i];
                            this.pdfViewer.fireFormFieldPropertiesChangeEvent("formFieldPropertiesChange", formFieldsIndex, formFieldsIndex.pageIndex, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, formFieldsIndex.value, "");
                            formFieldsIndex.value = "";
                            formFieldsIndex.signatureType = "";
                            this.pdfViewer.formDesignerModule.updateFormFieldCollections(formFieldsIndex);
                            var annotation_3 = this.getAnnotationsFromCollections(formFieldsIndex.id + '_content');
                            if (!isNullOrUndefined(annotation_3)) {
                                undoElement = this.modifyInCollections(annotation_3, 'delete');
                                // eslint-disable-next-line max-len
                                this.pdfViewer.annotation.addAction(annotation_3.pageIndex, null, annotation_3, 'Delete', '', undoElement, annotation_3);
                                this.updateInputFieldDivElement(annotation_3);
                                var formFieldObject = this.pdfViewer.nameTable[annotation_3.id.split("_")[0]];
                                formFieldObject.wrapper.children.splice(formFieldObject.wrapper.children.indexOf(annotation_3.wrapper.children[0]), 1);
                                this.pdfViewer.remove(annotation_3);
                            }
                        }
                    }
                }
                this.pdfViewer.remove(annotation_1);
                this.pdfViewer.renderDrawing();
                this.pdfViewer.clearSelection(pageNumber);
                this.pdfViewerBase.setItemInSessionStorage(this.pdfViewerBase.formFieldCollection, '_formDesigner');
                this.pdfViewerBase.updateDocumentEditedProperty(true);
                this.pdfViewerBase.tool = null;
                this.pdfViewer.tool = null;
                if (selectedAnnot.shapeAnnotationType === 'HandWrittenSignature' || selectedAnnot.shapeAnnotationType === 'SignatureText' || selectedAnnot.shapeAnnotationType === 'SignatureImage' || selectedAnnot.shapeAnnotationType === 'Path') {
                    // eslint-disable-next-line max-len
                    var bounds = { left: selectedAnnot.bounds.x, top: selectedAnnot.bounds.y, width: selectedAnnot.bounds.width, height: selectedAnnot.bounds.height };
                    // eslint-disable-next-line max-len
                    this.pdfViewer.fireSignatureRemove(pageNumber, selectedAnnot.id, selectedAnnot.shapeAnnotationType, bounds);
                }
                else if (this.pdfViewer.annotationModule) {
                    // eslint-disable-next-line max-len
                    this.pdfViewer.fireAnnotationRemove(pageNumber, annotationId, annotType, selectedAnnot.bounds);
                }
                if (this.pdfViewer.textSelectionModule) {
                    this.pdfViewer.textSelectionModule.enableTextSelectionMode();
                }
            }
        }
        this.updateToolbar(true);
        if (this.pdfViewer.toolbarModule) {
            if (this.pdfViewer.toolbarModule.annotationToolbarModule && !isLock) {
                this.pdfViewer.toolbarModule.annotationToolbarModule.selectAnnotationDeleteItem(false, true);
                this.pdfViewer.toolbarModule.annotationToolbarModule.enableTextMarkupAnnotationPropertiesTools(false);
            }
        }
    };
    /**
     * @param annotationId
    */
    // eslint-disable-next-line max-len
    Annotation.prototype.getAnnotationsFromCollections = function (annotationId) {
        var collections = this.pdfViewer.annotations;
        if (collections && annotationId) {
            for (var i = 0; i < collections.length; i++) {
                if (collections[i].id === annotationId) {
                    return collections[i];
                }
            }
        }
    };
    ;
    /**
     * @param annotation
    */
    Annotation.prototype.updateInputFieldDivElement = function (annotation) {
        var inputFields = document.getElementById(annotation.id);
        var signatureFieldElement = document.getElementById(annotation.id + "_html_element");
        if (inputFields === null && !isNullOrUndefined(signatureFieldElement)) {
            inputFields = signatureFieldElement.children[0].children[0];
        }
        if (inputFields && inputFields.classList.contains('e-pdfviewer-signatureformfields-signature')) {
            inputFields.className = 'e-pdfviewer-signatureformfields';
            inputFields.style.pointerEvents = '';
            inputFields.parentElement.style.pointerEvents = '';
        }
        if (this.pdfViewer.formDesignerModule) {
            this.pdfViewer.formDesignerModule.updateSignatureValue(annotation.id);
        }
        else {
            this.pdfViewer.formFieldsModule.updateDataInSession(inputFields, '');
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
    Annotation.prototype.storeAnnotationCollections = function (annotation, pageNumber) {
        if (this.isFormFieldShape) {
            var collectionDetails = this.checkFormDesignCollection(annotation);
            var selectAnnotation = cloneObject(annotation);
            selectAnnotation.formFieldId = annotation.annotName;
            selectAnnotation.pageNumber = pageNumber;
            delete selectAnnotation.annotName;
            if (annotation.id) {
                selectAnnotation.uniqueKey = annotation.id;
                delete selectAnnotation.id;
            }
            if (collectionDetails.isExisting) {
                this.pdfViewer.formFieldCollection.splice(collectionDetails.position, 0, selectAnnotation);
            }
            else {
                this.pdfViewer.formFieldCollection.push(selectAnnotation);
            }
        }
        else {
            // eslint-disable-next-line
            var collectionDetails = this.checkAnnotationCollection(annotation);
            // eslint-disable-next-line
            var selectAnnotation = cloneObject(annotation);
            selectAnnotation.annotationId = annotation.annotName;
            selectAnnotation.pageNumber = pageNumber;
            delete selectAnnotation.annotName;
            if (annotation.shapeAnnotationType === 'stamp') {
                selectAnnotation.uniqueKey = annotation.randomId;
                delete selectAnnotation.randomId;
            }
            if (annotation.shapeAnnotationType === 'sticky') {
                selectAnnotation.uniqueKey = annotation.annotName;
            }
            if (annotation.id) {
                selectAnnotation.uniqueKey = annotation.id;
                delete selectAnnotation.id;
            }
            // eslint-disable-next-line
            if (selectAnnotation.customData && annotation.customData && JSON.stringify(selectAnnotation.customData) !== JSON.stringify(annotation.customData)) {
                selectAnnotation.customData = annotation.customData;
            }
            if (collectionDetails.isExisting) {
                this.pdfViewer.annotationCollection.splice(collectionDetails.position, 0, selectAnnotation);
            }
            else {
                this.pdfViewer.annotationCollection.push(selectAnnotation);
            }
        }
    };
    Annotation.prototype.checkFormDesignCollection = function (annotation) {
        // eslint-disable-next-line
        var collections = this.pdfViewer.formFieldCollection;
        if (collections && annotation) {
            for (var i = 0; i < collections.length; i++) {
                if (collections[i].formFieldId === annotation.annotName) {
                    this.pdfViewer.formFieldCollection.splice(i, 1);
                    return { isExisting: true, position: i };
                }
            }
        }
        return { isExisting: false, position: null };
    };
    Annotation.prototype.updateFormFieldCollection = function (annotation) {
        // eslint-disable-next-line
        var collections = this.pdfViewer.formFieldCollection;
        if (collections && annotation) {
            for (var i = 0; i < collections.length; i++) {
                if (collections[i].formFieldId === annotation.annotName) {
                    this.removedAnnotationCollection.push(collections[i]);
                    this.pdfViewer.formFieldCollection.splice(i, 1);
                    break;
                }
            }
        }
    };
    /**
     * @param annotation
     * @private
     */
    // eslint-disable-next-line
    Annotation.prototype.getCustomData = function (annotation) {
        var customData;
        if (annotation.ExistingCustomData && !annotation.CustomData) {
            customData = JSON.parse(annotation.ExistingCustomData);
        }
        else if (annotation.CustomData === null) {
            if (annotation.shapeAnnotationType === 'sticky') {
                customData = this.pdfViewer.stickyNotesSettings.customData;
            }
            if (annotation.shapeAnnotationType === 'Stamp') {
                customData = this.pdfViewer.stampSettings.customData;
            }
            if (annotation.shapeAnnotationType === 'FreeText') {
                customData = this.pdfViewer.freeTextSettings.customData;
            }
            if (annotation.id === 'shape') {
                customData = this.getShapeData(annotation.ShapeAnnotationType, annotation.subject);
            }
            if (annotation.id === 'measure') {
                customData = this.getMeasureData(annotation.Subject);
            }
            if (annotation.shapeAnnotationType === 'textMarkup') {
                customData = this.getTextMarkupData(annotation.subject);
            }
            if (annotation.shapeAnnotationType === 'Ink') {
                customData = this.pdfViewer.inkAnnotationSettings.customData;
            }
        }
        else {
            customData = annotation.CustomData;
        }
        return customData;
    };
    /**
     * @param type
     * @param subject
     * @private
     */
    // eslint-disable-next-line
    Annotation.prototype.getShapeData = function (type, subject) {
        var customData;
        if (type === 'Line' && subject !== 'Arrow' && this.pdfViewer.lineSettings.customData) {
            customData = this.pdfViewer.lineSettings.customData;
        }
        else if ((type === 'LineWidthArrowHead' || subject === 'Arrow') && this.pdfViewer.arrowSettings.customData) {
            customData = this.pdfViewer.arrowSettings.customData;
        }
        else if ((type === 'Rectangle' || type === 'Square') && this.pdfViewer.rectangleSettings.customData) {
            customData = this.pdfViewer.rectangleSettings.customData;
        }
        else if ((type === 'Ellipse' || type === 'Circle') && this.pdfViewer.circleSettings.customData) {
            customData = this.pdfViewer.circleSettings.customData;
        }
        else if (type === 'Polygon' && this.pdfViewer.polygonSettings.customData) {
            customData = this.pdfViewer.polygonSettings.customData;
        }
        else if (this.pdfViewer.annotationSettings.customData) {
            customData = this.pdfViewer.annotationSettings.customData;
        }
        return customData;
    };
    /**
     * @param type
     * @private
     */
    // eslint-disable-next-line
    Annotation.prototype.getMeasureData = function (type) {
        var customData;
        if ((type === 'Distance' || type === 'Distance calculation') && this.pdfViewer.distanceSettings.customData) {
            customData = this.pdfViewer.distanceSettings.customData;
        }
        else if ((type === 'Line' || type === 'Perimeter calculation') && this.pdfViewer.lineSettings.customData) {
            customData = this.pdfViewer.lineSettings.customData;
            // eslint-disable-next-line max-len
        }
        else if ((type === 'Polygon' || type === 'Area calculation' || type === 'Volume calculation') && this.pdfViewer.polygonSettings.customData) {
            customData = this.pdfViewer.polygonSettings.customData;
        }
        else if ((type === 'Radius' || type === 'Radius calculation') && this.pdfViewer.radiusSettings.customData) {
            customData = this.pdfViewer.radiusSettings.customData;
        }
        else if (this.pdfViewer.annotationSettings.customData) {
            customData = this.pdfViewer.annotationSettings.customData;
        }
        return customData;
    };
    /**
     * @param type
     * @private
     */
    // eslint-disable-next-line
    Annotation.prototype.getTextMarkupData = function (type) {
        var customData;
        if (type === 'Highlight' && this.pdfViewer.highlightSettings.customData) {
            customData = this.pdfViewer.highlightSettings.customData;
        }
        else if (type === 'Underline' && this.pdfViewer.underlineSettings.customData) {
            customData = this.pdfViewer.underlineSettings.customData;
        }
        else if (type === 'Strikethrough' && this.pdfViewer.strikethroughSettings.customData) {
            customData = this.pdfViewer.strikethroughSettings.customData;
        }
        else if (this.pdfViewer.annotationSettings.customData) {
            customData = this.pdfViewer.annotationSettings.customData;
        }
        return customData;
    };
    /**
     * @param type
     * @private
     */
    // eslint-disable-next-line
    Annotation.prototype.getData = function (type) {
        var customData;
        if (type === 'FreeText' && this.pdfViewer.freeTextSettings.customData) {
            customData = this.pdfViewer.freeTextSettings.customData;
        }
        else if ((type === 'image' || type === 'Stamp') && this.pdfViewer.stampSettings.customData) {
            customData = this.pdfViewer.stampSettings.customData;
        }
        else if (type === 'sticky' && this.pdfViewer.stickyNotesSettings.customData) {
            customData = this.pdfViewer.stickyNotesSettings.customData;
        }
        else if (this.pdfViewer.annotationSettings.customData) {
            customData = this.pdfViewer.annotationSettings.customData;
        }
        return customData;
    };
    /**
     * @private
     */
    // eslint-disable-next-line
    Annotation.prototype.clearAnnotationStorage = function () {
        // eslint-disable-next-line
        var sessionSize = Math.round(JSON.stringify(window.sessionStorage).length / 1024);
        var maxSessionSize = 4500;
        if (sessionSize > maxSessionSize) {
            var storageLength = window.sessionStorage.length;
            // eslint-disable-next-line
            var annotationList = [];
            for (var i = 0; i < storageLength; i++) {
                if (window.sessionStorage.key(i) && window.sessionStorage.key(i).split('_')[3]) {
                    if (window.sessionStorage.key(i).split('_')[3] === 'annotations') {
                        // eslint-disable-next-line max-len
                        this.pdfViewerBase.annotationStorage[window.sessionStorage.key(i)] = window.sessionStorage.getItem(window.sessionStorage.key(i));
                        annotationList.push(window.sessionStorage.key(i));
                    }
                }
            }
            if (annotationList) {
                for (var i = 0; i < annotationList.length; i++) {
                    window.sessionStorage.removeItem(annotationList[i]);
                }
            }
        }
    };
    /**
     * @param annotation
     * @private
     */
    // eslint-disable-next-line
    Annotation.prototype.checkAnnotationCollection = function (annotation) {
        // eslint-disable-next-line
        var collections = this.pdfViewer.annotationCollection;
        if (collections && annotation) {
            for (var i = 0; i < collections.length; i++) {
                if (collections[i].annotationId === annotation.annotName) {
                    this.pdfViewer.annotationCollection.splice(i, 1);
                    return { isExisting: true, position: i };
                }
            }
        }
        return { isExisting: false, position: null };
    };
    /**
     * @param annotation
     * @private
     */
    // eslint-disable-next-line
    Annotation.prototype.updateAnnotationCollection = function (annotation) {
        // eslint-disable-next-line
        var collections = this.pdfViewer.annotationCollection;
        if (collections && annotation) {
            for (var i = 0; i < collections.length; i++) {
                if (collections[i].annotationId === annotation.annotName || collections[i].annotationId === annotation.annotationId) {
                    this.removedAnnotationCollection.push(collections[i]);
                    this.pdfViewer.annotationCollection.splice(i, 1);
                    break;
                }
            }
        }
    };
    /**
     * @param annotation
     * @param pageNumber
     * @param annotationType
     * @private
     */
    // eslint-disable-next-line
    Annotation.prototype.updateImportAnnotationCollection = function (annotation, pageNumber, annotationType) {
        if (this.pdfViewerBase.isImportAction) {
            if (this.pdfViewerBase.importedAnnotation && this.pdfViewerBase.importedAnnotation[pageNumber]) {
                // eslint-disable-next-line
                var currentPageAnnotations = this.pdfViewerBase.importedAnnotation[pageNumber];
                if (currentPageAnnotations[annotationType]) {
                    this.pdfViewerBase.importedAnnotation[pageNumber].annotationOrder = this.pdfViewerBase.importedAnnotation[pageNumber].annotationOrder.filter(function (currentAnnotation) {
                        return !(annotation.annotName === currentAnnotation.AnnotName || annotation.annotName === currentAnnotation.annotName);
                    });
                }
                if (!isNullOrUndefined(this.pdfViewerBase.importedAnnotation) && !isNullOrUndefined(this.pdfViewerBase.importedAnnotation[pageNumber]) && !isNullOrUndefined(this.pdfViewerBase.importedAnnotation[pageNumber][annotationType])) {
                    this.pdfViewerBase.importedAnnotation[pageNumber][annotationType] = this.pdfViewerBase.importedAnnotation[pageNumber][annotationType].filter(function (currentAnnotation) {
                        return annotation.annotName !== currentAnnotation.AnnotName;
                    });
                }
            }
        }
        // eslint-disable-next-line
        var documentcollections = this.pdfViewerBase.documentAnnotationCollections;
        if (documentcollections && documentcollections[pageNumber]) {
            // eslint-disable-next-line
            var documentPageCollections = documentcollections[pageNumber];
            if (documentPageCollections && documentPageCollections[annotationType]) {
                for (var i = 0; i < documentPageCollections[annotationType].length; i++) {
                    // eslint-disable-next-line max-len
                    if (annotation.annotName === documentPageCollections[annotationType][i].AnnotName) {
                        this.pdfViewerBase.documentAnnotationCollections[pageNumber][annotationType].splice(i, 1);
                        break;
                    }
                }
            }
        }
    };
    /**
     * Select the annotations using annotation object or annotation Id.
     *
     * @param annotationId
     * @returns void
     */
    Annotation.prototype.selectAnnotation = function (annotationId) {
        // eslint-disable-next-line
        var annotation;
        var id;
        if (typeof annotationId === 'object') {
            annotation = annotationId;
            id = annotation.annotationId;
            annotation = this.getAnnotationsFromAnnotationCollections(id);
        }
        if (typeof annotationId === 'string') {
            annotation = this.getAnnotationsFromAnnotationCollections(annotationId);
            id = annotationId;
        }
        if (annotation) {
            var pageIndex = isNullOrUndefined(annotation.pageNumber) ? annotation.pageIndex : annotation.pageNumber;
            var isRender = false;
            isRender = this.findRenderPageList(pageIndex);
            var currentSelector = this.pdfViewer.annotationSelectorSettings;
            //let pageIndex: number = this.getPageNumberFromAnnotationCollections(annotation);
            if (annotation && pageIndex >= 0) {
                if (annotation.shapeAnnotationType === 'textMarkup') {
                    if (annotation.rect || annotation.bounds) {
                        // eslint-disable-next-line max-len
                        var scrollValue = this.pdfViewerBase.pageSize[pageIndex].top * this.pdfViewerBase.getZoomFactor() + (this.getAnnotationTop(annotation)) * this.pdfViewerBase.getZoomFactor();
                        if (!this.isAnnotDeletionApiCall) {
                            var scroll_1 = (scrollValue - 20).toString();
                            // eslint-disable-next-line radix
                            this.pdfViewerBase.viewerContainer.scrollTop = parseInt(scroll_1);
                            this.pdfViewerBase.viewerContainer.scrollLeft = this.getAnnotationLeft(annotation) * this.pdfViewerBase.getZoomFactor();
                        }
                    }
                    else {
                        if (this.pdfViewer.navigation) {
                            this.pdfViewer.navigation.goToPage(pageIndex + 1);
                        }
                    }
                }
                else {
                    if (annotation.bounds) {
                        // eslint-disable-next-line max-len
                        var scrollValue = this.pdfViewerBase.pageSize[pageIndex].top * this.pdfViewerBase.getZoomFactor() + (annotation.bounds.top) * this.pdfViewerBase.getZoomFactor();
                        var scrollLeft = annotation.bounds.left * this.pdfViewerBase.getZoomFactor();
                        if (annotation.shapeAnnotationType === 'Ink') {
                            // eslint-disable-next-line max-len
                            scrollValue = this.pdfViewerBase.pageSize[pageIndex].top * this.pdfViewerBase.getZoomFactor() + (annotation.bounds.y) * this.pdfViewerBase.getZoomFactor();
                            scrollLeft = annotation.bounds.x * this.pdfViewerBase.getZoomFactor();
                        }
                        if (!this.isAnnotDeletionApiCall) {
                            var scroll_2 = (scrollValue - 20).toString();
                            // eslint-disable-next-line radix
                            this.pdfViewerBase.viewerContainer.scrollTop = parseInt(scroll_2);
                            this.pdfViewerBase.viewerContainer.scrollLeft = scrollLeft;
                        }
                    }
                    else {
                        if (this.pdfViewer.navigation) {
                            this.pdfViewer.navigation.goToPage(pageIndex + 1);
                        }
                    }
                }
                if (isRender) {
                    if (this.previousIndex) {
                        this.pdfViewer.clearSelection(this.previousIndex);
                    }
                    this.pdfViewer.clearSelection(pageIndex);
                    this.previousIndex = pageIndex;
                    if (annotation.shapeAnnotationType === 'textMarkup') {
                        // eslint-disable-next-line max-len
                        this.pdfViewer.annotationModule.textMarkupAnnotationModule.clearCurrentAnnotationSelection(pageIndex, true);
                        // eslint-disable-next-line max-len
                        var canvas = this.pdfViewerBase.getElement('_annotationCanvas_' + pageIndex);
                        // eslint-disable-next-line
                        var textMarkupAnnotation = this.getTextMarkupAnnotations(pageIndex, annotation);
                        if (textMarkupAnnotation) {
                            this.textMarkupAnnotationModule.currentTextMarkupAnnotation = null;
                            this.textMarkupAnnotationModule.isSelectedAnnotation = true;
                            this.textMarkupAnnotationModule.showHideDropletDiv(true);
                            this.textMarkupAnnotationModule.annotationClickPosition = null;
                            this.textMarkupAnnotationModule.selectAnnotation(textMarkupAnnotation, canvas, pageIndex, null, true);
                            this.textMarkupAnnotationModule.currentTextMarkupAnnotation = textMarkupAnnotation;
                            this.textMarkupAnnotationModule.selectTextMarkupCurrentPage = pageIndex;
                            this.textMarkupAnnotationModule.enableAnnotationPropertiesTool(true);
                            this.textMarkupAnnotationModule.isSelectedAnnotation = false;
                            if (this.pdfViewer.toolbarModule && this.pdfViewer.enableAnnotationToolbar) {
                                this.pdfViewer.toolbarModule.annotationToolbarModule.isToolbarHidden = true;
                                // eslint-disable-next-line max-len
                                this.pdfViewer.toolbarModule.annotationToolbarModule.showAnnotationToolbar(this.pdfViewer.toolbarModule.annotationItem);
                            }
                        }
                    }
                    else if (annotation.shapeAnnotationType === 'stamp' || annotation.ShapeAnnotationType === 'stamp') {
                        this.pdfViewer.select([annotation.uniqueKey], currentSelector);
                        this.pdfViewer.annotation.onAnnotationMouseDown();
                    }
                    else if (annotation.shapeAnnotationType === 'sticky' || annotation.ShapeAnnotationType === 'sticky') {
                        this.pdfViewer.select([annotation.annotationId], currentSelector);
                        this.pdfViewer.annotation.onAnnotationMouseDown();
                    }
                    else {
                        this.pdfViewer.select([annotation.uniqueKey], currentSelector);
                        this.pdfViewer.annotation.onAnnotationMouseDown();
                    }
                    // eslint-disable-next-line max-len
                    var commentElement = document.getElementById(this.pdfViewer.element.id + '_commantPanel');
                    if (commentElement && commentElement.style.display === 'block') {
                        // eslint-disable-next-line
                        var accordionExpand = document.getElementById(this.pdfViewer.element.id + '_accordionContainer' + this.pdfViewer.currentPageNumber);
                        if (accordionExpand) {
                            accordionExpand.ej2_instances[0].expandItem(true);
                        }
                        // eslint-disable-next-line
                        var commentsDiv = document.getElementById(id);
                        if (commentsDiv) {
                            if (!commentsDiv.classList.contains('e-pv-comments-border')) {
                                commentsDiv.firstChild.click();
                            }
                        }
                    }
                }
                else if (annotation.uniqueKey || (annotation.shapeAnnotationType === "textMarkup" && annotation.annotationAddMode === "Imported Annotation")) {
                    this.selectAnnotationId = id;
                    this.isAnnotationSelected = true;
                    this.annotationPageIndex = pageIndex;
                    this.selectAnnotationFromCodeBehind();
                }
            }
            if (!isRender && !annotation.uniqueKey) {
                var collections = this.updateCollectionForNonRenderedPages(annotation, id, pageIndex);
                collections.pageIndex = pageIndex;
                this.pdfViewer.annotation.addAction(pageIndex, null, collections, 'Delete', '', collections, collections);
                this.undoCommentsElement.push(collections);
                var removeDiv = document.getElementById(annotation.annotationId);
                this.removeCommentPanelDiv(removeDiv);
            }
        }
    };
    // To update the collections for the non-rendered pages.
    Annotation.prototype.updateCollectionForNonRenderedPages = function (annotation, id, pageIndex) {
        var collections;
        var annotationCollection = this.pdfViewer.annotationCollection;
        if (annotationCollection.length) {
            var collectionDetails = annotationCollection.filter(function (annotCollection) {
                return annotCollection.annotationId === id;
            });
            collections = collectionDetails[0];
            this.updateAnnotationCollection(collectionDetails[0]);
        }
        var annotationType = this.getTypeOfAnnotation(annotation);
        var collection = this.pdfViewerBase.documentAnnotationCollections[pageIndex];
        if (collection[annotationType].length) {
            for (var x = 0; x < collection[annotationType].length; x++) {
                if (collection[annotationType][x].AnnotName === annotation.annotationId) {
                    var type = collection[annotationType][x];
                    this.removedDocumentAnnotationCollection.push(type);
                    collection[annotationType].splice(x, 1);
                    break;
                }
            }
        }
        return collections;
    };
    // To get the annotation type to update the document Annotation collections
    Annotation.prototype.getTypeOfAnnotation = function (annotation) {
        var annotationType;
        if (annotation.id && annotation.id.toLowerCase() === "shape") {
            annotationType = "shapeAnnotation";
        }
        else if (annotation.id && annotation.id.toLowerCase() === "measure") {
            annotationType = "measureShapeAnnotation";
        }
        else if (annotation.id && annotation.id.toLowerCase() === "freetext") {
            annotationType = "freeTextAnnotation";
        }
        else if (annotation.shapeAnnotationType && annotation.shapeAnnotationType.toLowerCase() === "textmarkup") {
            annotationType = "textMarkupAnnotation";
        }
        else if (annotation.shapeAnnotationType && annotation.shapeAnnotationType.toLowerCase() === "stamp") {
            annotationType = "stampAnnotations";
        }
        else if (annotation.shapeAnnotationType && annotation.shapeAnnotationType.toLowerCase() === "ink") {
            annotationType = "signatureInkAnnotation";
        }
        else if (annotation.shapeAnnotationType && annotation.shapeAnnotationType.toLowerCase() === "sticky") {
            annotationType = "stickyNotesAnnotation";
        }
        return annotationType;
    };
    // To remove the commnet panel div
    Annotation.prototype.removeCommentPanelDiv = function (removeDiv) {
        if (removeDiv) {
            if (removeDiv.parentElement.childElementCount === 1) {
                this.stickyNotesAnnotationModule.updateAccordionContainer(removeDiv);
            }
            else {
                removeDiv.remove();
            }
        }
    };
    /**
     * Clear the annotation selection.
     *
     * @returns void
     */
    Annotation.prototype.clearSelection = function () {
        if (this.textMarkupAnnotationModule && this.textMarkupAnnotationModule.currentTextMarkupAnnotation) {
            this.textMarkupAnnotationModule.clearCurrentSelectedAnnotation();
            this.textMarkupAnnotationModule.clearCurrentAnnotationSelection(this.textMarkupAnnotationModule.selectTextMarkupCurrentPage);
        }
        else {
            if (this.pdfViewer.selectedItems && this.pdfViewer.selectedItems.annotations[0]) {
                // eslint-disable-next-line
                var currentAnnotation = this.pdfViewer.selectedItems.annotations[0];
                this.pdfViewer.clearSelection(currentAnnotation.pageIndex);
            }
            else {
                this.pdfViewer.clearSelection(this.pdfViewer.currentPageNumber - 1);
            }
        }
    };
    /**
     * @param annotation
     * @private
     */
    // eslint-disable-next-line
    Annotation.prototype.getAnnotationTop = function (annotation) {
        if (annotation.rect && (annotation.rect.Top || annotation.rect.top)) {
            return annotation.rect.Top || annotation.rect.top;
        }
        else {
            return annotation.bounds[0].Top || annotation.bounds[0].top;
        }
    };
    /**
      * @param annotation
      */
    // eslint-disable-next-line
    Annotation.prototype.getAnnotationLeft = function (annotation) {
        if (annotation.rect) {
            if (annotation.rect.Left) {
                return annotation.rect.Left;
            }
            else {
                return annotation.rect.left;
            }
        }
        else {
            if (annotation.bounds[0].Left) {
                return annotation.bounds[0].Left;
            }
            else {
                return annotation.bounds[0].left;
            }
        }
    };
    /**
     * @private
     */
    Annotation.prototype.selectAnnotationFromCodeBehind = function () {
        if (this.isAnnotationSelected && this.selectAnnotationId) {
            // eslint-disable-next-line
            var annotation = this.getAnnotationsFromAnnotationCollections(this.selectAnnotationId);
            var id = this.selectAnnotationId;
            var pageIndex = annotation.pageNumber;
            var currentSelector = this.pdfViewer.annotationSelectorSettings;
            if (annotation && (this.annotationPageIndex >= 0) && this.annotationPageIndex === pageIndex) {
                if (this.previousIndex) {
                    this.pdfViewer.clearSelection(this.previousIndex);
                }
                this.pdfViewer.clearSelection(pageIndex);
                this.previousIndex = pageIndex;
                if (annotation.shapeAnnotationType === 'textMarkup') {
                    // eslint-disable-next-line max-len
                    this.pdfViewer.annotationModule.textMarkupAnnotationModule.clearCurrentAnnotationSelection(pageIndex, true);
                    // eslint-disable-next-line max-len
                    var canvas = this.pdfViewerBase.getElement('_annotationCanvas_' + pageIndex);
                    // eslint-disable-next-line
                    var textMarkupAnnotation = this.getTextMarkupAnnotations(pageIndex, annotation);
                    if (textMarkupAnnotation) {
                        this.textMarkupAnnotationModule.currentTextMarkupAnnotation = null;
                        this.textMarkupAnnotationModule.isSelectedAnnotation = true;
                        this.textMarkupAnnotationModule.showHideDropletDiv(true);
                        this.textMarkupAnnotationModule.annotationClickPosition = null;
                        this.textMarkupAnnotationModule.selectAnnotation(textMarkupAnnotation, canvas, pageIndex);
                        this.textMarkupAnnotationModule.currentTextMarkupAnnotation = textMarkupAnnotation;
                        this.textMarkupAnnotationModule.selectTextMarkupCurrentPage = pageIndex;
                        this.textMarkupAnnotationModule.enableAnnotationPropertiesTool(true);
                        this.textMarkupAnnotationModule.isSelectedAnnotation = false;
                        if (this.pdfViewer.toolbarModule && this.pdfViewer.enableAnnotationToolbar) {
                            this.pdfViewer.toolbarModule.annotationToolbarModule.isToolbarHidden = true;
                            // eslint-disable-next-line max-len
                            this.pdfViewer.toolbarModule.annotationToolbarModule.showAnnotationToolbar(this.pdfViewer.toolbarModule.annotationItem);
                        }
                    }
                }
                else if (annotation.shapeAnnotationType === 'stamp' || annotation.ShapeAnnotationType === 'stamp') {
                    this.pdfViewer.select([annotation.uniqueKey], currentSelector);
                    this.pdfViewer.annotation.onAnnotationMouseDown();
                }
                else if (annotation.shapeAnnotationType === 'sticky' || annotation.ShapeAnnotationType === 'sticky') {
                    this.pdfViewer.select([annotation.annotationId], currentSelector);
                    this.pdfViewer.annotation.onAnnotationMouseDown();
                }
                else if (annotation.uniqueKey) {
                    this.pdfViewer.select([annotation.uniqueKey], currentSelector);
                    this.pdfViewer.annotation.onAnnotationMouseDown();
                }
                else {
                    this.pdfViewer.select([annotation.annotationId], currentSelector);
                    this.pdfViewer.annotation.onAnnotationMouseDown();
                }
                // eslint-disable-next-line max-len
                var commentElement = document.getElementById(this.pdfViewer.element.id + '_commantPanel');
                if (commentElement && commentElement.style.display === 'block') {
                    // eslint-disable-next-line
                    var accordionExpand = document.getElementById(this.pdfViewer.element.id + '_accordionContainer' + this.pdfViewer.currentPageNumber);
                    if (accordionExpand) {
                        accordionExpand.ej2_instances[0].expandItem(true);
                    }
                    // eslint-disable-next-line
                    var commentsDiv = document.getElementById(id);
                    if (commentsDiv) {
                        if (!commentsDiv.classList.contains('e-pv-comments-border')) {
                            commentsDiv.firstChild.click();
                        }
                    }
                }
            }
            this.isAnnotationSelected = false;
            this.selectAnnotationId = null;
            this.annotationPageIndex = null;
        }
    };
    /**
     * @param pageIndex
     * @private
     */
    Annotation.prototype.findRenderPageList = function (pageIndex) {
        var isRender = false;
        // eslint-disable-next-line
        var pageList = this.pdfViewerBase.renderedPagesList;
        if (pageList) {
            for (var i = 0; i < pageList.length; i++) {
                if (pageList[i] === pageIndex) {
                    isRender = true;
                    return isRender;
                }
            }
        }
        return isRender;
    };
    // eslint-disable-next-line
    Annotation.prototype.getPageNumberFromAnnotationCollections = function (annotation) {
        // eslint-disable-next-line
        var collections = this.pdfViewer.annotations;
        if (annotation) {
            if (annotation.shapeAnnotationType === 'textMarkup') {
                return annotation.pageNumber;
            }
            else {
                if (collections) {
                    for (var i = 0; i < collections.length; i++) {
                        if (collections[i].annotName === annotation.annotationId) {
                            return collections[i].pageIndex;
                        }
                    }
                }
            }
        }
    };
    // eslint-disable-next-line
    Annotation.prototype.getAnnotationsFromAnnotationCollections = function (annotationId) {
        // eslint-disable-next-line
        var collections = this.pdfViewer.annotationCollection;
        if (collections && annotationId) {
            for (var i = 0; i < collections.length; i++) {
                if (collections[i].annotationId === annotationId) {
                    return collections[i];
                }
            }
        }
        if (this.pdfViewer.selectedItems.annotations.length === 0)
            this.pdfViewer.selectedItems.annotations.push(this.pdfViewer.nameTable[annotationId]);
    };
    // eslint-disable-next-line
    Annotation.prototype.getTextMarkupAnnotations = function (pageIndex, annotation) {
        // eslint-disable-next-line
        var storeObject = window.sessionStorage.getItem(this.pdfViewerBase.documentId + '_annotations_textMarkup');
        if (this.pdfViewerBase.isStorageExceed) {
            storeObject = this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_textMarkup'];
        }
        if (storeObject) {
            // eslint-disable-next-line
            var annotObject = JSON.parse(storeObject);
            var index = this.getPageCollection(annotObject, pageIndex);
            if (annotObject[index]) {
                for (var i = 0; i < annotObject[index].annotations.length; i++) {
                    if (annotObject[index].annotations[i].annotName === annotation.annotationId) {
                        return annotObject[index].annotations[i];
                    }
                }
                return null;
            }
        }
        else {
            return null;
        }
    };
    /**
     * @param type
     * @param measureType
     * @param type
     * @param measureType
     * @private
     */
    Annotation.prototype.getAnnotationType = function (type, measureType) {
        var annotType;
        if (measureType === '' || isNullOrUndefined(measureType)) {
            switch (type) {
                case 'Line':
                    annotType = 'Line';
                    break;
                case 'LineWidthArrowHead':
                    annotType = 'Arrow';
                    break;
                case 'Rectangle':
                    annotType = 'Rectangle';
                    break;
                case 'Ellipse':
                    annotType = 'Circle';
                    break;
                case 'Polygon':
                    annotType = 'Polygon';
                    break;
                case 'Stamp':
                    annotType = 'Stamp';
                    break;
                case 'Image':
                    annotType = 'Image';
                    break;
                case 'FreeText':
                    annotType = 'FreeText';
                    break;
                case 'Ink':
                    annotType = 'Ink';
                    break;
                case 'StickyNotes':
                    annotType = 'StickyNotes';
                    break;
            }
        }
        else {
            switch (measureType) {
                case 'Distance':
                    annotType = 'Distance';
                    break;
                case 'Perimeter':
                    annotType = 'Perimeter';
                    break;
                case 'Area':
                    annotType = 'Area';
                    break;
                case 'Radius':
                    annotType = 'Radius';
                    break;
                case 'Volume':
                    annotType = 'Volume';
                    break;
            }
        }
        return annotType;
    };
    /**
     * @param pageNumber
     * @param annotationId
     * @private
     */
    Annotation.prototype.getAnnotationIndex = function (pageNumber, annotationId) {
        var pageAnnotationBases = this.pdfViewer.drawing.getPageObjects(pageNumber);
        var index = null;
        for (var i = 0; i < pageAnnotationBases.length; i++) {
            if (pageAnnotationBases[i].id === annotationId) {
                index = i;
                break;
            }
        }
        return index;
    };
    /**
     * @private
     */
    Annotation.prototype.initializeCollection = function () {
        this.actionCollection = [];
        this.redoCollection = [];
        this.pdfViewerBase.customStampCollection = [];
        if (!this.popupNote) {
            this.createNote();
        }
    };
    /**
     * @private
     */
    Annotation.prototype.showCommentsPanel = function () {
        if (this.pdfViewer.enableCommentPanel) {
            var commentPanel = document.getElementById(this.pdfViewer.element.id + '_commantPanel');
            if (commentPanel) {
                if (commentPanel.style.display === 'none') {
                    commentPanel.style.display = 'block';
                    if (Browser.isDevice && !isBlazor()) {
                        // eslint:disable-next-line
                        var viewer = document.getElementById(this.pdfViewer.element.id + '_viewerMainContainer');
                        // eslint:disable-next-line
                        viewer.insertBefore(this.pdfViewerBase.navigationPane.commentPanelContainer, this.pdfViewer.toolbarModule.toolbarElement);
                    }
                    if (this.pdfViewerBase.navigationPane.commentPanelResizer) {
                        this.pdfViewerBase.navigationPane.commentPanelResizer.style.display = 'block';
                    }
                    this.pdfViewerBase.navigationPane.setCommentPanelResizeIconTop();
                    this.pdfViewer.annotation.stickyNotesAnnotationModule.updateCommentPanelTextTop();
                    var viewerContainer = document.getElementById(this.pdfViewer.element.id + '_viewerContainer');
                    var pageContainer = document.getElementById(this.pdfViewer.element.id + '_pageViewContainer');
                    if (viewerContainer) {
                        if (this.pdfViewer.enableRtl) {
                            viewerContainer.style.left = this.pdfViewerBase.navigationPane.getViewerContainerRight() + 'px';
                        }
                        else {
                            viewerContainer.style.right = this.pdfViewerBase.navigationPane.getViewerContainerRight() + 'px';
                        }
                        // eslint-disable-next-line max-len
                        viewerContainer.style.width = (this.pdfViewer.element.clientWidth - this.pdfViewerBase.navigationPane.getViewerContainerLeft() - this.pdfViewerBase.navigationPane.getViewerContainerRight()) + 'px';
                        pageContainer.style.width = (viewerContainer.offsetWidth - this.pdfViewerBase.navigationPane.getViewerContainerScrollbarWidth()) + 'px';
                    }
                    this.pdfViewerBase.updateZoomValue();
                    if (this.pdfViewer.annotation && this.pdfViewer.annotation.textMarkupAnnotationModule) {
                        this.pdfViewer.annotation.textMarkupAnnotationModule.showHideDropletDiv(true);
                    }
                    if (Browser.isDevice && !isBlazor()) {
                        commentPanel.style.height = this.pdfViewerBase.viewerMainContainer.clientHeight + 'px';
                        if (this.pdfViewer.selectedItems.annotations.length > 0) {
                            // eslint:disable-next-line
                            var commentDiv = document.getElementById(this.pdfViewer.selectedItems.annotations[0].annotName);
                            if (commentDiv && commentDiv.lastElementChild.children[1] && commentDiv.lastElementChild.children[1].ej2_instances) {
                                commentDiv.lastElementChild.children[1].ej2_instances[0].enableEditMode = true;
                            }
                            else if (commentDiv && commentDiv.lastElementChild.ej2_instances) {
                                commentDiv.lastElementChild.ej2_instances[0].enableEditMode = true;
                                commentDiv.lastElementChild.style.display = 'block';
                                commentDiv.lastElementChild.children[1] ? commentDiv.lastElementChild.children[1].style.display = 'block' : null;
                            }
                        }
                        if (this.pdfViewer.toolbarModule.annotationToolbarModule.toolbar) {
                            this.pdfViewer.toolbarModule.annotationToolbarModule.toolbar.element.style.display = 'none';
                            if (this.pdfViewer.toolbarModule.annotationToolbarModule.propertyToolbar) {
                                this.pdfViewer.toolbarModule.annotationToolbarModule.propertyToolbar.element.style.display = 'none';
                            }
                        }
                    }
                }
            }
        }
    };
    /**
     * @param pageNumber
     * @param index
     * @param annotation
     * @param actionString
     * @param property
     * @param node
     * @param redo
     * @param pageNumber
     * @param index
     * @param annotation
     * @param actionString
     * @param property
     * @param node
     * @param redo
     * @private
     */
    // eslint-disable-next-line
    Annotation.prototype.addAction = function (
    // eslint-disable-next-line
    pageNumber, index, annotation, actionString, property, node, redo) {
        var action = {
            pageIndex: pageNumber, index: index, annotation: annotation,
            action: actionString, modifiedProperty: property, undoElement: node, redoElement: redo
        };
        this.actionCollection.push(action);
        this.updateToolbar();
    };
    /**
     * @private
     */
    Annotation.prototype.undo = function () {
        var actionObject = this.actionCollection.pop();
        if (actionObject) {
            // eslint-disable-next-line
            var shapeType = actionObject.annotation.shapeAnnotationType;
            this.isUndoRedoAction = true;
            this.isUndoAction = true;
            switch (actionObject.action) {
                case 'Text Markup Added':
                case 'Text Markup Deleted':
                    if (this.textMarkupAnnotationModule) {
                        // eslint-disable-next-line max-len
                        this.textMarkupAnnotationModule.undoTextMarkupAction(actionObject.annotation, actionObject.pageIndex, actionObject.index, actionObject.action);
                    }
                    break;
                case 'Text Markup Property modified':
                    if (this.textMarkupAnnotationModule) {
                        // eslint-disable-next-line max-len
                        actionObject.annotation = this.textMarkupAnnotationModule.undoRedoPropertyChange(actionObject.annotation, actionObject.pageIndex, actionObject.index, actionObject.modifiedProperty, true);
                    }
                    break;
                case 'Drag':
                case 'Resize':
                    if (isLineShapes(actionObject.annotation)) {
                        // eslint-disable-next-line max-len
                        this.pdfViewer.nodePropertyChange(actionObject.annotation, { bounds: actionObject.undoElement.bounds, vertexPoints: actionObject.undoElement.vertexPoints, leaderHeight: actionObject.undoElement.leaderHeight });
                    }
                    else {
                        this.pdfViewer.nodePropertyChange(actionObject.annotation, { bounds: actionObject.undoElement.bounds });
                    }
                    // eslint-disable-next-line max-len
                    if (actionObject.annotation.measureType === 'Distance' || actionObject.annotation.measureType === 'Perimeter' || actionObject.annotation.measureType === 'Area' ||
                        actionObject.annotation.measureType === 'Radius' || actionObject.annotation.measureType === 'Volume') {
                        this.pdfViewer.nodePropertyChange(actionObject.annotation, { notes: actionObject.undoElement.notes });
                        this.updateCalibrateValues(actionObject.annotation);
                    }
                    if (actionObject.annotation.formFieldAnnotationType) {
                        this.pdfViewer.formDesigner.updateHTMLElement(actionObject.annotation);
                    }
                    this.pdfViewer.clearSelection(this.pdfViewerBase.activeElements.activePageID);
                    this.pdfViewer.select([actionObject.annotation.id]);
                    // eslint-disable-next-line max-len
                    if (actionObject.annotation.shapeAnnotationType === 'Line' || actionObject.annotation.shapeAnnotationType === 'Rectangle' || actionObject.annotation.shapeAnnotationType === 'Ellipse' || actionObject.annotation.shapeAnnotationType === 'Polygon' || actionObject.annotation.shapeAnnotationType === 'LineWidthArrowHead' ||
                        actionObject.annotation.shapeAnnotationType === 'Radius' || actionObject.annotation.shapeAnnotationType === 'FreeText' || actionObject.annotation.shapeAnnotationType === 'HandWrittenSignature' || actionObject.annotation.shapeAnnotationType === 'SignatureText' || actionObject.annotation.shapeAnnotationType === 'SignatureImage' || actionObject.annotation.shapeAnnotationType === 'Ink') {
                        this.modifyInCollections(actionObject.annotation, 'bounds');
                    }
                    break;
                case 'Addition':
                    if (this.pdfViewer.formDesigner && actionObject.annotation.formFieldAnnotationType) {
                        this.pdfViewer.formDesigner.deleteFormField(actionObject.undoElement.id, false);
                    }
                    else {
                        var isAnnotationUpdate = false;
                        // eslint-disable-next-line max-len
                        if (shapeType === 'Line' || shapeType === 'LineWidthArrowHead' || shapeType === 'Polygon' || shapeType === 'Ellipse' || shapeType === 'Rectangle' || shapeType === 'Radius' || shapeType === 'Distance') {
                            if (actionObject.annotation.measureType === '' || isNullOrUndefined(actionObject.annotation.measureType)) {
                                this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(actionObject.annotation, 'shape');
                            }
                            else {
                                this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(actionObject.annotation, 'measure');
                            }
                            isAnnotationUpdate = true;
                            // eslint-disable-next-line
                            var annotationObject = actionObject.annotation;
                            // eslint-disable-next-line
                            var wrapper = annotationObject.wrapper ? annotationObject.wrapper : null;
                            if (wrapper && wrapper.bounds) {
                                actionObject.annotation.bounds = wrapper.bounds;
                            }
                            actionObject.duplicate = this.modifyInCollections(actionObject.annotation, 'delete');
                        }
                        if (shapeType === 'Stamp' || shapeType === 'Image') {
                            // eslint-disable-next-line max-len
                            this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(actionObject.annotation, actionObject.annotation.shapeAnnotationType, 'delete');
                            // eslint-disable-next-line max-len
                            this.stampAnnotationModule.updateSessionStorage(actionObject.annotation, null, 'delete');
                            isAnnotationUpdate = true;
                        }
                        if (shapeType === 'FreeText' || shapeType === 'HandWrittenSignature' || shapeType === 'SignatureImage' || shapeType === 'SignatureText' || shapeType === 'Ink') {
                            isAnnotationUpdate = true;
                            // eslint-disable-next-line max-len
                            this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(actionObject.annotation, actionObject.annotation.shapeAnnotationType, 'delete');
                            actionObject.duplicate = this.modifyInCollections(actionObject.annotation, 'delete');
                        }
                        if (!isAnnotationUpdate) {
                            // eslint-disable-next-line max-len
                            this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(actionObject.annotation, actionObject.annotation.shapeAnnotationType, 'delete');
                        }
                        this.pdfViewer.clearSelection(this.pdfViewerBase.activeElements.activePageID);
                        this.pdfViewer.remove(actionObject.annotation);
                        this.pdfViewer.renderDrawing(null, actionObject.annotation.pageIndex);
                        // eslint-disable-next-line
                        var removeDiv = document.getElementById(actionObject.annotation.annotName);
                        if (removeDiv) {
                            if (removeDiv.parentElement.childElementCount === 1) {
                                this.stickyNotesAnnotationModule.updateAccordionContainer(removeDiv);
                            }
                            else {
                                removeDiv.parentElement.removeChild(removeDiv);
                            }
                        }
                        if (Browser.isDevice && !this.pdfViewer.enableDesktopMode) {
                            var mobileAnnotationToolbar = document.getElementById(this.pdfViewer.element.id + '_propertyToolbar');
                            if (mobileAnnotationToolbar && mobileAnnotationToolbar.children.length > 0) {
                                this.pdfViewer.toolbarModule.annotationToolbarModule.toolbarCreated = false;
                                this.pdfViewer.toolbarModule.annotationToolbarModule.createAnnotationToolbarForMobile();
                            }
                        }
                    }
                    break;
                case 'Delete':
                    if (this.pdfViewer.formDesigner && actionObject.annotation.formFieldAnnotationType) {
                        actionObject.undoElement.bounds.x = actionObject.undoElement.wrapper.bounds.x;
                        actionObject.undoElement.bounds.y = actionObject.undoElement.wrapper.bounds.y;
                        this.pdfViewer.formDesigner.drawFormField(actionObject.undoElement);
                    }
                    else {
                        // eslint-disable-next-line max-len
                        if (shapeType === 'Line' || shapeType === 'LineWidthArrowHead' || shapeType === 'Polygon' || shapeType === 'Ellipse' || shapeType === 'Rectangle' || shapeType === 'Radius' || shapeType === 'Distance') {
                            if (actionObject.annotation.measureType === '' || isNullOrUndefined(actionObject.annotation.measureType)) {
                                shapeType = 'shape';
                                this.shapeAnnotationModule.addInCollection(actionObject.annotation.pageIndex, actionObject.undoElement);
                            }
                            else {
                                shapeType = 'shape_measure';
                                this.measureAnnotationModule.addInCollection(actionObject.annotation.pageIndex, actionObject.undoElement);
                            }
                        }
                        if (shapeType === 'Stamp' || shapeType === 'Image') {
                            this.stampAnnotationModule.updateDeleteItems(actionObject.annotation.pageIndex, actionObject.annotation);
                        }
                        else if (shapeType === 'FreeText') {
                            this.freeTextAnnotationModule.addInCollection(actionObject.annotation.pageIndex, actionObject.undoElement);
                        }
                        else if (shapeType === 'Ink') {
                            this.inkAnnotationModule.addInCollection(actionObject.annotation.pageIndex, actionObject.undoElement);
                        }
                        else if (shapeType === 'HandWrittenSignature' || shapeType === 'SignatureText' || shapeType === 'SignatureImage') {
                            this.pdfViewerBase.signatureModule.addInCollection(actionObject.annotation.pageIndex, actionObject.undoElement);
                        }
                        if (!actionObject.annotation.annotationId) {
                            var addedAnnot = this.pdfViewer.add(actionObject.annotation);
                            if ((shapeType === 'FreeText' || addedAnnot.enableShapeLabel) && addedAnnot) {
                                this.pdfViewer.nodePropertyChange(addedAnnot, {});
                            }
                        }
                        var formFieldObj = void 0;
                        if (actionObject.annotation.id) {
                            formFieldObj = this.pdfViewer.nameTable[actionObject.annotation.id.split("_")[0]];
                        }
                        if (formFieldObj != null && (formFieldObj.formFieldAnnotationType === 'SignatureField' || formFieldObj.formFieldAnnotationType === 'InitialField')) {
                            formFieldObj.wrapper.children.push(actionObject.annotation.wrapper.children[0]);
                            if (actionObject.annotation.shapeAnnotationType === "SignatureText")
                                formFieldObj.wrapper.children.push(actionObject.annotation.wrapper.children[1]);
                            var key = actionObject.annotation.id.split('_')[0] + '_content';
                            var data = null;
                            if (this.pdfViewer.formDesignerModule) {
                                data = this.pdfViewerBase.getItemFromSessionStorage('_formDesigner');
                            }
                            if (data) {
                                var formFieldsData = JSON.parse(data);
                                for (var i = 0; i < formFieldsData.length; i++) {
                                    if (formFieldsData[i].Key === key) {
                                        if (actionObject.annotation.shapeAnnotationType === "SignatureText") {
                                            formFieldsData[i].FormField.signatureType = "Text";
                                            formFieldsData[i].FormField.value = actionObject.annotation.data;
                                            this.pdfViewerBase.formFieldCollection[i].FormField.value = actionObject.annotation.data;
                                            this.pdfViewerBase.formFieldCollection[i].FormField.signatureType = "Text";
                                        }
                                        else if (actionObject.annotation.shapeAnnotationType === "SignatureImage") {
                                            formFieldsData[i].FormField.signatureType = "Image";
                                            formFieldsData[i].FormField.value = actionObject.annotation.data;
                                            this.pdfViewerBase.formFieldCollection[i].FormField.value = actionObject.annotation.data;
                                            this.pdfViewerBase.formFieldCollection[i].FormField.signatureType = "Image";
                                        }
                                        else {
                                            formFieldsData[i].FormField.signatureType = "Path";
                                            this.pdfViewerBase.formFieldCollection[i].FormField.signatureType = "Path";
                                            var collectionData = processPathData(actionObject.annotation.data);
                                            var csData = splitArrayCollection(collectionData);
                                            formFieldsData[i].FormField.value = JSON.stringify(csData);
                                            this.pdfViewerBase.formFieldCollection[i].FormField.value = JSON.stringify(csData);
                                        }
                                    }
                                }
                                this.pdfViewerBase.setItemInSessionStorage(this.pdfViewerBase.formFieldCollection, '_formDesigner');
                            }
                        }
                        this.pdfViewer.renderDrawing(null, actionObject.annotation.pageIndex);
                        // eslint-disable-next-line max-len
                        this.pdfViewer.annotationModule.stickyNotesAnnotationModule.addAnnotationComments(actionObject.annotation.pageIndex, shapeType);
                        if (actionObject.annotation.annotationId) {
                            var removedAnnotationCollection = this.removedAnnotationCollection[this.removedAnnotationCollection.length - 1];
                            var annotationType = this.getTypeOfAnnotation(removedAnnotationCollection);
                            this.pdfViewer.annotationCollection.push(removedAnnotationCollection);
                            this.removedAnnotationCollection.splice(this.removedAnnotationCollection.length - 1);
                            var pageNumber = actionObject.annotation.pageNumber >= 0 ? actionObject.annotation.pageNumber : actionObject.annotation.pageIndex;
                            this.pdfViewerBase.documentAnnotationCollections[pageNumber][annotationType].push(this.removedDocumentAnnotationCollection[this.removedDocumentAnnotationCollection.length - 1]);
                            this.removedDocumentAnnotationCollection.splice(this.removedDocumentAnnotationCollection.length - 1);
                        }
                    }
                    break;
                case 'stampOpacity':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { opacity: actionObject.undoElement.opacity });
                    this.stickyNotesAnnotationModule.updateAnnotationModifiedDate(actionObject.annotation, null, true);
                    actionObject.annotation.modifiedDate = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
                    break;
                case 'Shape Stroke':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { strokeColor: actionObject.undoElement.strokeColor });
                    this.modifyInCollections(actionObject.annotation, 'stroke');
                    this.pdfViewer.renderDrawing();
                    break;
                case 'Shape Fill':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { fillColor: actionObject.undoElement.fillColor });
                    this.modifyInCollections(actionObject.annotation, 'fill');
                    this.pdfViewer.renderDrawing();
                    break;
                case 'Shape Opacity':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { opacity: actionObject.undoElement.opacity });
                    if (actionObject.annotation.shapeAnnotationType === 'StickyNotes') {
                        this.stickyNotesAnnotationModule.updateOpacityValue(actionObject.annotation);
                        this.stickyNotesAnnotationModule.updateAnnotationModifiedDate(actionObject.annotation, null, true);
                        actionObject.annotation.modifiedDate = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
                    }
                    else {
                        this.modifyInCollections(actionObject.annotation, 'opacity');
                    }
                    this.pdfViewer.renderDrawing();
                    break;
                case 'Shape Thickness':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { thickness: actionObject.undoElement.thickness });
                    this.modifyInCollections(actionObject.annotation, 'thickness');
                    this.pdfViewer.renderDrawing();
                    break;
                case 'Line properties change':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, {
                        // eslint-disable-next-line max-len
                        fillColor: actionObject.undoElement.fillColor, borderDashArray: actionObject.undoElement.borderDashArray, borderStyle: actionObject.undoElement.borderStyle,
                        // eslint-disable-next-line max-len
                        strokeColor: actionObject.undoElement.strokeColor, opacity: actionObject.undoElement.opacity, thickness: actionObject.undoElement.thickness,
                        sourceDecoraterShapes: this.getArrowType(actionObject.undoElement.lineHeadStart), taregetDecoraterShapes: this.getArrowType(actionObject.undoElement.lineHeadEnd)
                    });
                    this.updateCollectionForLineProperty(actionObject.annotation);
                    this.pdfViewer.renderDrawing();
                    break;
                case 'Text Property Added':
                    // eslint-disable-next-line max-len
                    actionObject.annotation = this.pdfViewer.annotationModule.stickyNotesAnnotationModule.undoAction(actionObject.annotation, actionObject.action, actionObject.undoElement);
                    this.stickyNotesAnnotationModule.updateAnnotationModifiedDate(actionObject.annotation, null, true);
                    actionObject.annotation.modifiedDate = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
                    break;
                case 'Comments Property Added':
                    // eslint-disable-next-line max-len
                    actionObject.annotation = this.pdfViewer.annotationModule.stickyNotesAnnotationModule.undoAction(actionObject.annotation, actionObject.action, actionObject.undoElement);
                    break;
                case 'Status Property Added':
                    // eslint-disable-next-line max-len
                    actionObject.annotation = this.pdfViewer.annotationModule.stickyNotesAnnotationModule.undoAction(actionObject.annotation, actionObject.action, actionObject.undoElement);
                    break;
                case 'Comments Reply Deleted':
                    // eslint-disable-next-line max-len
                    actionObject.annotation = this.pdfViewer.annotationModule.stickyNotesAnnotationModule.undoAction(actionObject.annotation, actionObject.action, actionObject.undoElement);
                    break;
                case 'dynamicText Change':
                    this.pdfViewer.annotation.freeTextAnnotationModule.isFreeTextValueChange = true;
                    actionObject.annotation.dynamicText = actionObject.undoElement.dynamicText;
                    if (this.pdfViewer.selectedItems.annotations[0]) {
                        this.pdfViewer.selectedItems.annotations[0].dynamicText = actionObject.undoElement.dynamicText;
                    }
                    // eslint-disable-next-line
                    this.pdfViewer.annotationModule.stickyNotesAnnotationModule.undoAction(actionObject.annotation, actionObject.action, actionObject.undoElement);
                    this.stickyNotesAnnotationModule.updateAnnotationModifiedDate(actionObject.annotation, null, true);
                    this.modifyInCollections(actionObject.annotation, 'dynamicText');
                    if (this.pdfViewer.selectedItems.annotations[0]) {
                        this.pdfViewer.nodePropertyChange(this.pdfViewer.selectedItems.annotations[0], {});
                    }
                    else {
                        this.pdfViewer.nodePropertyChange(actionObject.annotation, {});
                    }
                    this.pdfViewer.annotation.freeTextAnnotationModule.isFreeTextValueChange = false;
                    this.pdfViewer.clearSelection(this.pdfViewerBase.activeElements.activePageID);
                    break;
                case 'fontColor':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { fontColor: actionObject.undoElement.fontColor });
                    this.modifyInCollections(actionObject.annotation, 'fontColor');
                    this.pdfViewer.renderDrawing();
                    break;
                case 'fontSize':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { fontSize: actionObject.undoElement.fontSize });
                    this.modifyInCollections(actionObject.annotation, 'fontSize');
                    this.pdfViewer.renderDrawing();
                    break;
                case 'fontFamily':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { fontFamily: actionObject.undoElement.fontFamily });
                    this.modifyInCollections(actionObject.annotation, 'fontFamily');
                    this.pdfViewer.renderDrawing();
                    break;
                case 'textAlign':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { textAlign: actionObject.undoElement.textAlign });
                    this.modifyInCollections(actionObject.annotation, 'textAlign');
                    this.pdfViewer.renderDrawing();
                    break;
                case 'textPropertiesChange':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { font: actionObject.undoElement.font });
                    this.modifyInCollections(actionObject.annotation, 'textPropertiesChange');
                    this.pdfViewer.renderDrawing();
                    break;
                case 'Rotate':
                    // eslint-disable-next-line max-len
                    this.pdfViewer.nodePropertyChange(actionObject.annotation.annotations[0], { bounds: actionObject.undoElement.bounds, rotateAngle: actionObject.undoElement.rotateAngle });
                    this.modifyInCollections(actionObject.annotation.annotations[0], 'bounds');
                    this.pdfViewer.renderDrawing();
                    break;
                case 'FormDesigner Properties Change':
                    if (actionObject.undoElement && actionObject.undoElement.isMultiline !== actionObject.redoElement.isMultiline) {
                        this.undoRedoMultiline(actionObject.undoElement);
                    }
                    this.updateFormFieldPropertiesChanges(actionObject.undoElement.formFieldAnnotationType, actionObject.undoElement);
                    break;
                case 'FormField Value Change':
                    if (actionObject.annotation.formFieldAnnotationType) {
                        if (actionObject.annotation.formFieldAnnotationType == "RadioButton") {
                            this.updateFormFieldValueChange(actionObject.annotation.formFieldAnnotationType, actionObject.undoElement, false);
                            this.updateFormFieldValueChange(actionObject.annotation.formFieldAnnotationType, actionObject.redoElement, true);
                        }
                        else {
                            this.updateFormFieldValueChange(actionObject.annotation.formFieldAnnotationType, actionObject.annotation, actionObject.undoElement);
                        }
                    }
                    else {
                        var spanElement = document.getElementById(actionObject.annotation.id + "_html_element").children[0].children[0];
                        spanElement.className = 'e-pdfviewer-signatureformfields';
                        var formFieldObj = this.pdfViewer.nameTable[actionObject.annotation.id.split("_")[0]];
                        var annotationObj = this.pdfViewer.nameTable[actionObject.annotation.id];
                        formFieldObj.wrapper.children.splice(formFieldObj.wrapper.children.indexOf(annotationObj.wrapper.children[0]), 1);
                        if (actionObject.annotation.shapeAnnotationType === "SignatureText")
                            formFieldObj.wrapper.children.splice(formFieldObj.wrapper.children.indexOf(annotationObj.wrapper.children[1]), 1);
                        var key = actionObject.annotation.id.split('_')[0] + '_content';
                        var data = null;
                        if (this.pdfViewer.formDesignerModule) {
                            data = this.pdfViewerBase.getItemFromSessionStorage('_formDesigner');
                        }
                        if (data) {
                            var formFieldsData = JSON.parse(data);
                            for (var i = 0; i < formFieldsData.length; i++) {
                                if (formFieldsData[i].Key === key) {
                                    formFieldsData[i].FormField.value = '';
                                    formFieldsData[i].FormField.signatureType = '';
                                    this.pdfViewerBase.formFieldCollection[i].FormField.value = '';
                                    this.pdfViewerBase.formFieldCollection[i].FormField.signatureType = '';
                                }
                            }
                            this.pdfViewer.remove(actionObject.annotation);
                            this.pdfViewer.renderDrawing();
                            this.pdfViewerBase.setItemInSessionStorage(this.pdfViewerBase.formFieldCollection, '_formDesigner');
                        }
                    }
            }
            this.redoCollection.push(actionObject);
            this.updateToolbar();
            this.isUndoRedoAction = false;
            this.isUndoAction = false;
        }
    };
    /**
     * @private
     */
    Annotation.prototype.redo = function () {
        var actionObject = this.redoCollection.pop();
        if (actionObject) {
            // eslint-disable-next-line
            var shapeType = actionObject.annotation.shapeAnnotationType;
            this.isUndoRedoAction = true;
            switch (actionObject.action) {
                case 'Text Markup Property modified':
                    if (this.textMarkupAnnotationModule) {
                        // eslint-disable-next-line max-len
                        actionObject.annotation = this.textMarkupAnnotationModule.undoRedoPropertyChange(actionObject.annotation, actionObject.pageIndex, actionObject.index, actionObject.modifiedProperty);
                    }
                    break;
                case 'Text Markup Added':
                case 'Text Markup Deleted':
                    if (this.textMarkupAnnotationModule) {
                        // eslint-disable-next-line max-len
                        this.textMarkupAnnotationModule.redoTextMarkupAction(actionObject.annotation, actionObject.pageIndex, actionObject.index, actionObject.action);
                    }
                    break;
                case 'Drag':
                case 'Resize':
                    if (isLineShapes(actionObject.annotation)) {
                        this.pdfViewer.nodePropertyChange(
                        // eslint-disable-next-line max-len
                        actionObject.annotation, { bounds: actionObject.redoElement.bounds, vertexPoints: actionObject.redoElement.vertexPoints, leaderHeight: actionObject.redoElement.leaderHeight });
                    }
                    else {
                        this.pdfViewer.nodePropertyChange(actionObject.annotation, { bounds: actionObject.redoElement.bounds });
                    }
                    // eslint-disable-next-line max-len
                    if (actionObject.annotation.measureType === 'Distance' || actionObject.annotation.measureType === 'Perimeter' || actionObject.annotation.measureType === 'Area' ||
                        actionObject.annotation.measureType === 'Radius' || actionObject.annotation.measureType === 'Volume') {
                        this.pdfViewer.nodePropertyChange(actionObject.annotation, { notes: actionObject.redoElement.notes });
                        this.updateCalibrateValues(actionObject.annotation);
                    }
                    if (actionObject.annotation.formFieldAnnotationType) {
                        this.pdfViewer.formDesigner.updateHTMLElement(actionObject.annotation);
                    }
                    this.pdfViewer.clearSelection(this.pdfViewerBase.activeElements.activePageID);
                    this.pdfViewer.select([actionObject.annotation.id]);
                    // eslint-disable-next-line max-len
                    if (actionObject.annotation.shapeAnnotationType === 'Line' || actionObject.annotation.shapeAnnotationType === 'Rectangle' || actionObject.annotation.shapeAnnotationType === 'Ellipse' || actionObject.annotation.shapeAnnotationType === 'Polygon' || actionObject.annotation.shapeAnnotationType === 'LineWidthArrowHead'
                        || actionObject.annotation.shapeAnnotationType === 'Radius' || actionObject.annotation.shapeAnnotationType === 'FreeText' || actionObject.annotation.shapeAnnotationType === 'HandWrittenSignature' || actionObject.annotation.shapeAnnotationType === 'SignatureText' || actionObject.annotation.shapeAnnotationType === 'SignatureImage' || actionObject.annotation.shapeAnnotationType === 'Ink') {
                        this.modifyInCollections(actionObject.annotation, 'bounds');
                    }
                    break;
                case 'Addition':
                    if (this.pdfViewer.formDesigner && actionObject.annotation.formFieldAnnotationType) {
                        actionObject.redoElement.bounds.x = actionObject.redoElement.wrapper.bounds.x;
                        actionObject.redoElement.bounds.y = actionObject.redoElement.wrapper.bounds.y;
                        this.pdfViewer.formDesigner.drawFormField(actionObject.redoElement);
                    }
                    else {
                        // eslint-disable-next-line max-len
                        if (shapeType === 'Line' || shapeType === 'LineWidthArrowHead' || shapeType === 'Polygon' || shapeType === 'Ellipse' || shapeType === 'Rectangle' || shapeType === 'Radius' || shapeType === 'Distance') {
                            if (actionObject.annotation.measureType === '' || isNullOrUndefined(actionObject.annotation.measureType)) {
                                shapeType = 'shape';
                                this.shapeAnnotationModule.addInCollection(actionObject.annotation.pageIndex, actionObject.duplicate);
                            }
                            else {
                                shapeType = 'shape_measure';
                                this.measureAnnotationModule.addInCollection(actionObject.annotation.pageIndex, actionObject.duplicate);
                            }
                        }
                        if (shapeType === 'FreeText') {
                            this.freeTextAnnotationModule.addInCollection(actionObject.annotation.pageIndex, actionObject.duplicate);
                        }
                        if (shapeType === 'Stamp' || shapeType === 'Image') {
                            this.stampAnnotationModule.updateDeleteItems(actionObject.annotation.pageIndex, actionObject.redoElement);
                        }
                        if (shapeType === 'HandWrittenSignature' || shapeType === 'SignatureText' || shapeType === 'SignatureImage') {
                            this.pdfViewerBase.signatureModule.addInCollection(actionObject.annotation.pageIndex, actionObject.duplicate);
                        }
                        if (shapeType === 'Ink') {
                            this.inkAnnotationModule.addInCollection(actionObject.annotation.pageIndex, actionObject.duplicate);
                        }
                        var addedAnnot = this.pdfViewer.add(actionObject.annotation);
                        this.pdfViewer.select([actionObject.annotation.id]);
                        if ((shapeType === 'FreeText' || addedAnnot.enableShapeLabel) && addedAnnot) {
                            this.pdfViewer.nodePropertyChange(addedAnnot, {});
                        }
                        this.pdfViewer.renderDrawing(null, actionObject.annotation.pageIndex);
                        // eslint-disable-next-line max-len
                        this.pdfViewer.annotationModule.stickyNotesAnnotationModule.addAnnotationComments(actionObject.annotation.pageIndex, shapeType);
                        if (Browser.isDevice && !this.pdfViewer.enableDesktopMode) {
                            var mobileAnnotationToolbar = document.getElementById(this.pdfViewer.element.id + '_propertyToolbar');
                            if (mobileAnnotationToolbar && mobileAnnotationToolbar.children.length > 0) {
                                this.pdfViewer.toolbarModule.annotationToolbarModule.toolbarCreated = false;
                                this.pdfViewer.toolbarModule.annotationToolbarModule.createAnnotationToolbarForMobile();
                            }
                        }
                    }
                    break;
                case 'Delete':
                    if (this.pdfViewer.formDesigner && actionObject.annotation.formFieldAnnotationType) {
                        this.pdfViewer.formDesigner.deleteFormField(actionObject.redoElement.id, false);
                    }
                    else {
                        var isUpdate = false;
                        var sType = actionObject.annotation.shapeAnnotationType;
                        // eslint-disable-next-line max-len
                        if (shapeType === 'Line' || shapeType === 'LineWidthArrowHead' || shapeType === 'Polygon' || shapeType === 'Ellipse' || shapeType === 'Rectangle' || shapeType === 'Radius' || shapeType === 'Distance') {
                            if (actionObject.annotation.measureType === '' || isNullOrUndefined(actionObject.annotation.measureType)) {
                                sType = 'shape';
                            }
                            else {
                                sType = 'measure';
                            }
                            // eslint-disable-next-line max-len
                            this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(actionObject.annotation, sType, 'delete');
                            this.modifyInCollections(actionObject.annotation, 'delete');
                            isUpdate = true;
                        }
                        if (shapeType === 'Stamp' || shapeType === 'Image') {
                            // eslint-disable-next-line max-len
                            this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(actionObject.annotation, sType, 'delete');
                            this.stampAnnotationModule.updateSessionStorage(actionObject.annotation, null, 'delete');
                            isUpdate = true;
                        }
                        if (shapeType === 'FreeText' || shapeType === 'HandWrittenSignature' || shapeType === 'SignatureText' || shapeType === 'SignatureImage') {
                            // eslint-disable-next-line max-len
                            this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(actionObject.annotation, sType, 'delete');
                            this.modifyInCollections(actionObject.annotation, 'delete');
                        }
                        if (!isUpdate) {
                            // eslint-disable-next-line max-len
                            this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(actionObject.annotation, sType, 'delete');
                        }
                        var formFieldObj = void 0;
                        if (actionObject.annotation.id) {
                            formFieldObj = this.pdfViewer.nameTable[actionObject.annotation.id.split("_")[0]];
                        }
                        if (formFieldObj != null && (formFieldObj.formFieldAnnotationType === 'SignatureField' || formFieldObj.formFieldAnnotationType === 'InitialField')) {
                            formFieldObj.wrapper.children.splice(formFieldObj.wrapper.children.indexOf(actionObject.annotation.wrapper.children[0]), 1);
                            if (actionObject.annotation.shapeAnnotationType === "SignatureText")
                                formFieldObj.wrapper.children.splice(formFieldObj.wrapper.children.indexOf(actionObject.annotation.wrapper.children[1]), 1);
                            var key = actionObject.annotation.id.split('_')[0] + '_content';
                            var data = null;
                            if (this.pdfViewer.formDesignerModule) {
                                data = this.pdfViewerBase.getItemFromSessionStorage('_formDesigner');
                            }
                            if (data) {
                                var formFieldsData = JSON.parse(data);
                                for (var i = 0; i < formFieldsData.length; i++) {
                                    if (formFieldsData[i].Key === key) {
                                        formFieldsData[i].FormField.value = '';
                                        formFieldsData[i].FormField.signatureType = '';
                                        this.pdfViewerBase.formFieldCollection[i].FormField.value = '';
                                        this.pdfViewerBase.formFieldCollection[i].FormField.signatureType = '';
                                    }
                                }
                                this.pdfViewerBase.setItemInSessionStorage(this.pdfViewerBase.formFieldCollection, '_formDesigner');
                            }
                        }
                        this.pdfViewer.clearSelection(actionObject.annotation.pageIndex);
                        this.pdfViewer.remove(actionObject.annotation);
                        this.pdfViewer.renderDrawing(null, actionObject.annotation.pageIndex);
                        // eslint-disable-next-line
                        var id = actionObject.annotation.annotName ? actionObject.annotation.annotName : actionObject.annotation.annotationId;
                        var removeDiv = document.getElementById(id);
                        this.removeCommentPanelDiv(removeDiv);
                        if (actionObject.annotation.annotationId) {
                            var collections = this.updateCollectionForNonRenderedPages(actionObject.annotation, id, actionObject.annotation.pageIndex);
                            this.undoCommentsElement.push(collections);
                        }
                    }
                    break;
                case 'stampOpacity':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { opacity: actionObject.redoElement.opacity });
                    this.stickyNotesAnnotationModule.updateAnnotationModifiedDate(actionObject.annotation, null, true);
                    break;
                case 'Shape Stroke':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { strokeColor: actionObject.redoElement.strokeColor });
                    this.modifyInCollections(actionObject.annotation, 'stroke');
                    this.pdfViewer.renderDrawing();
                    break;
                case 'Shape Fill':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { fillColor: actionObject.redoElement.fillColor });
                    this.modifyInCollections(actionObject.annotation, 'fill');
                    this.pdfViewer.renderDrawing();
                    break;
                case 'Shape Opacity':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { opacity: actionObject.redoElement.opacity });
                    if (actionObject.annotation.shapeAnnotationType === 'StickyNotes') {
                        this.stickyNotesAnnotationModule.updateOpacityValue(actionObject.annotation);
                        this.stickyNotesAnnotationModule.updateAnnotationModifiedDate(actionObject.annotation, null, true);
                    }
                    else {
                        this.modifyInCollections(actionObject.annotation, 'opacity');
                    }
                    this.pdfViewer.renderDrawing();
                    break;
                case 'Shape Thickness':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { thickness: actionObject.redoElement.thickness });
                    this.modifyInCollections(actionObject.annotation, 'thickness');
                    this.pdfViewer.renderDrawing();
                    break;
                case 'Line properties change':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, {
                        // eslint-disable-next-line max-len
                        fillColor: actionObject.redoElement.fillColor, strokeColor: actionObject.redoElement.strokeColor, opacity: actionObject.redoElement.opacity, thickness: actionObject.redoElement.thickness,
                        sourceDecoraterShapes: this.getArrowType(actionObject.redoElement.lineHeadStart), taregetDecoraterShapes: this.getArrowType(actionObject.redoElement.lineHeadEnd),
                        borderDashArray: actionObject.redoElement.borderDashArray, borderStyle: actionObject.redoElement.borderStyle
                    });
                    this.updateCollectionForLineProperty(actionObject.annotation);
                    this.pdfViewer.renderDrawing();
                    break;
                case 'Text Property Added':
                    // eslint-disable-next-line max-len
                    actionObject.annotation = this.pdfViewer.annotationModule.stickyNotesAnnotationModule.redoAction(actionObject.annotation, actionObject.action, actionObject.undoElement);
                    this.stickyNotesAnnotationModule.updateAnnotationModifiedDate(actionObject.annotation, null, true);
                    break;
                case 'Comments Property Added':
                    // eslint-disable-next-line max-len
                    actionObject.annotation = this.pdfViewer.annotationModule.stickyNotesAnnotationModule.redoAction(actionObject.annotation, actionObject.action, actionObject.undoElement);
                    break;
                case 'Status Property Added':
                    // eslint-disable-next-line max-len
                    actionObject.annotation = this.pdfViewer.annotationModule.stickyNotesAnnotationModule.redoAction(actionObject.annotation, actionObject.action);
                    break;
                case 'Comments Reply Deleted':
                    // eslint-disable-next-line max-len
                    actionObject.annotation = this.pdfViewer.annotationModule.stickyNotesAnnotationModule.redoAction(actionObject.annotation, actionObject.action);
                    break;
                case 'dynamicText Change':
                    this.pdfViewer.annotation.freeTextAnnotationModule.isFreeTextValueChange = true;
                    actionObject.annotation.dynamicText = actionObject.redoElement.dynamicText;
                    // eslint-disable-next-line
                    var annotation = this.pdfViewer.selectedItems.annotations[0];
                    if (annotation) {
                        annotation.dynamicText = actionObject.redoElement.dynamicText;
                        annotation.bounds.height = actionObject.redoElement.bounds.height;
                    }
                    // eslint-disable-next-line max-len
                    this.pdfViewer.annotationModule.stickyNotesAnnotationModule.redoAction(actionObject.annotation, actionObject.action, actionObject.undoElement);
                    this.stickyNotesAnnotationModule.updateAnnotationModifiedDate(actionObject.annotation, null, true);
                    this.modifyInCollections(actionObject.annotation, 'dynamicText');
                    if (annotation) {
                        this.pdfViewer.nodePropertyChange(annotation, {});
                    }
                    else {
                        this.pdfViewer.nodePropertyChange(actionObject.annotation, {});
                    }
                    this.pdfViewer.annotation.freeTextAnnotationModule.isFreeTextValueChange = false;
                    this.pdfViewer.clearSelection(this.pdfViewerBase.activeElements.activePageID);
                    this.pdfViewer.select([actionObject.annotation.id]);
                    break;
                case 'fontColor':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { fontColor: actionObject.redoElement.fontColor });
                    this.modifyInCollections(actionObject.annotation, 'fontColor');
                    this.pdfViewer.renderDrawing();
                    break;
                case 'fontSize':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { fontSize: actionObject.redoElement.fontSize });
                    this.modifyInCollections(actionObject.annotation, 'fontSize');
                    this.pdfViewer.renderDrawing();
                    break;
                case 'textAlign':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { textAlign: actionObject.redoElement.textAlign });
                    this.modifyInCollections(actionObject.annotation, 'textAlign');
                    this.pdfViewer.renderDrawing();
                    break;
                case 'textPropertiesChange':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { font: actionObject.redoElement.font });
                    this.modifyInCollections(actionObject.annotation, 'textPropertiesChange');
                    this.pdfViewer.renderDrawing();
                    break;
                case 'Rotate':
                    // eslint-disable-next-line max-len
                    this.pdfViewer.nodePropertyChange(actionObject.annotation.annotations[0], { bounds: actionObject.redoElement.bounds, rotateAngle: actionObject.redoElement.rotateAngle });
                    this.modifyInCollections(actionObject.annotation.annotations[0], 'bounds');
                    this.pdfViewer.renderDrawing();
                    break;
                case 'FormDesigner Properties Change':
                    if (actionObject.redoElement && actionObject.undoElement.isMultiline !== actionObject.redoElement.isMultiline) {
                        this.undoRedoMultiline(actionObject.redoElement);
                    }
                    this.updateFormFieldPropertiesChanges(actionObject.redoElement.formFieldAnnotationType, actionObject.redoElement);
                    break;
                case 'FormField Value Change':
                    if (actionObject.annotation.formFieldAnnotationType) {
                        if (actionObject.annotation.formFieldAnnotationType == "RadioButton") {
                            this.updateFormFieldValueChange(actionObject.annotation.formFieldAnnotationType, actionObject.undoElement, true);
                            this.updateFormFieldValueChange(actionObject.annotation.formFieldAnnotationType, actionObject.redoElement, false);
                        }
                        else {
                            this.updateFormFieldValueChange(actionObject.annotation.formFieldAnnotationType, actionObject.annotation, actionObject.redoElement);
                        }
                    }
                    else {
                        var spanElement = document.getElementById(actionObject.annotation.id + "_html_element").children[0].children[0];
                        spanElement.className = 'e-pdfviewer-signatureformfields-signature';
                        var formFieldObj = this.pdfViewer.nameTable[actionObject.annotation.id.split("_")[0]];
                        var annotationObj = this.pdfViewer.nameTable[actionObject.annotation.id];
                        formFieldObj.wrapper.children.push(annotationObj.wrapper.children[0]);
                        if (actionObject.annotation.shapeAnnotationType === "SignatureText")
                            formFieldObj.wrapper.children.push(annotationObj.wrapper.children[1]);
                        var key = actionObject.annotation.id.split('_')[0] + '_content';
                        var data = null;
                        if (this.pdfViewer.formDesignerModule) {
                            data = this.pdfViewerBase.getItemFromSessionStorage('_formDesigner');
                        }
                        if (data) {
                            var formFieldsData = JSON.parse(data);
                            for (var i = 0; i < formFieldsData.length; i++) {
                                if (formFieldsData[i].Key === key) {
                                    if (actionObject.annotation.shapeAnnotationType === "SignatureText") {
                                        formFieldsData[i].FormField.signatureType = "Text";
                                        formFieldsData[i].FormField.value = actionObject.annotation.data;
                                        this.pdfViewerBase.formFieldCollection[i].FormField.value = actionObject.annotation.data;
                                        this.pdfViewerBase.formFieldCollection[i].FormField.signatureType = "Text";
                                    }
                                    else if (actionObject.annotation.shapeAnnotationType === "SignatureImage") {
                                        formFieldsData[i].FormField.signatureType = "Image";
                                        formFieldsData[i].FormField.value = actionObject.annotation.data;
                                        this.pdfViewerBase.formFieldCollection[i].FormField.value = actionObject.annotation.data;
                                        this.pdfViewerBase.formFieldCollection[i].FormField.signatureType = "Image";
                                    }
                                    else {
                                        formFieldsData[i].FormField.signatureType = "Path";
                                        this.pdfViewerBase.formFieldCollection[i].FormField.signatureType = "Path";
                                        var collectionData = processPathData(actionObject.annotation.data);
                                        var csData = splitArrayCollection(collectionData);
                                        formFieldsData[i].FormField.value = JSON.stringify(csData);
                                        this.pdfViewerBase.formFieldCollection[i].FormField.value = JSON.stringify(csData);
                                    }
                                }
                            }
                            this.pdfViewer.add(actionObject.annotation);
                            var canvass = document.getElementById(this.pdfViewer.element.id + '_annotationCanvas_' + actionObject.pageIndex);
                            this.pdfViewer.renderDrawing(canvass, actionObject.pageIndex);
                            this.pdfViewerBase.setItemInSessionStorage(this.pdfViewerBase.formFieldCollection, '_formDesigner');
                        }
                    }
            }
            if (actionObject.redoElement && actionObject.redoElement.modifiedDate !== undefined) {
                actionObject.annotation.modifiedDate = actionObject.redoElement.modifiedDate;
            }
            this.actionCollection.push(actionObject);
            this.updateToolbar();
            this.isUndoRedoAction = false;
        }
    };
    Annotation.prototype.undoRedoMultiline = function (element) {
        if (element.isMultiline && element.formFieldAnnotationType === 'Textbox') {
            this.pdfViewer.formDesignerModule.renderMultilineText(element, true);
        }
        else if (element.formFieldAnnotationType === 'Textbox') {
            this.pdfViewer.formDesignerModule.renderTextbox(element, true);
        }
    };
    Annotation.prototype.updateFormFieldValueChange = function (formFieldAnnotationType, annotation, value) {
        if (annotation) {
            var formFieldModel = this.pdfViewer.formDesigner.getFormField(annotation.id.split("_")[0]);
            var data = null;
            if (this.pdfViewer.formDesignerModule) {
                data = this.pdfViewerBase.getItemFromSessionStorage('_formDesigner');
            }
            if (data) {
                var formFieldsData = JSON.parse(data);
                var index = this.pdfViewer.formDesigner.getFormFiledIndex(annotation.id.split('_')[0]);
                switch (formFieldAnnotationType) {
                    case 'Textbox':
                    case 'PasswordField':
                    case 'RadioButton':
                    case 'DropdownList':
                    case 'ListBox':
                        var inputElement = document.getElementById(annotation.id.split("_")[0] + "_content_html_element").firstElementChild.firstElementChild;
                        if (formFieldAnnotationType == 'Textbox' || formFieldAnnotationType == 'PasswordField') {
                            formFieldModel.value = value;
                            this.pdfViewer.formDesigner.updateValuePropertyChange(formFieldModel, inputElement, true, index, formFieldsData);
                        }
                        else if (formFieldAnnotationType == 'RadioButton') {
                            formFieldModel.isSelected = value;
                            this.pdfViewer.formDesigner.updateIsSelectedPropertyChange(formFieldModel, inputElement.firstElementChild, true, index, formFieldsData);
                        }
                        else if (formFieldAnnotationType == 'DropdownList' || formFieldAnnotationType == 'ListBox') {
                            formFieldModel.selectedIndex = value;
                            formFieldsData[index].FormField.selectedIndex = value;
                            this.pdfViewerBase.formFieldCollection[index].FormField.selectedIndex = value;
                            this.pdfViewer.nameTable[formFieldsData[index].Key.split("_")[0]].selectedIndex = value;
                            if (formFieldAnnotationType == 'ListBox') {
                                for (var k = 0; k < inputElement.options.length; k++) {
                                    inputElement.options[k].selected = value.includes(k) ? true : false;
                                }
                            }
                            else {
                                inputElement.selectedIndex = value;
                            }
                        }
                        break;
                    case 'Checkbox':
                        var checkboxDivElement = document.getElementById(annotation.id.split("_")[0] + "_content_html_element").firstElementChild.firstElementChild.lastElementChild;
                        formFieldModel.isChecked = value;
                        this.pdfViewer.formDesigner.updateIsCheckedPropertyChange(formFieldModel, checkboxDivElement, true, index, formFieldsData);
                        break;
                }
                this.pdfViewerBase.setItemInSessionStorage(this.pdfViewerBase.formFieldCollection, '_formDesigner');
            }
        }
    };
    Annotation.prototype.updateFormFieldPropertiesChanges = function (formFieldAnnotationType, element) {
        switch (formFieldAnnotationType) {
            case 'Textbox':
            case 'PasswordField':
                this.pdfViewer.formDesigner.updateTextboxFormDesignerProperties(element, true);
                break;
            case 'Checkbox':
                this.pdfViewer.formDesigner.updateCheckboxFormDesignerProperties(element, true);
                break;
            case 'RadioButton':
                this.pdfViewer.formDesigner.updateRadioButtonDesignerProperties(element, true);
                break;
            case 'DropdownList':
                this.pdfViewer.formDesigner.updateDropdownFormDesignerProperties(element, true);
                break;
            case 'ListBox':
                this.pdfViewer.formDesigner.updateListBoxFormDesignerProperties(element, true);
                break;
            case 'SignatureField':
            case 'InitialField':
                this.pdfViewer.formDesigner.updateSignatureTextboxProperties(element, true);
        }
    };
    Annotation.prototype.updateCollectionForLineProperty = function (pdfAnnotationBase) {
        this.modifyInCollections(pdfAnnotationBase, 'fill');
        this.modifyInCollections(pdfAnnotationBase, 'stroke');
        this.modifyInCollections(pdfAnnotationBase, 'opacity');
        this.modifyInCollections(pdfAnnotationBase, 'thickness');
        this.modifyInCollections(pdfAnnotationBase, 'dashArray');
        this.modifyInCollections(pdfAnnotationBase, 'startArrow');
        this.modifyInCollections(pdfAnnotationBase, 'endArrow');
    };
    Annotation.prototype.updateToolbar = function (isAnnotationDelete) {
        if (this.pdfViewer.toolbarModule) {
            this.pdfViewer.toolbarModule.updateUndoRedoButtons();
        }
        if (this.actionCollection && this.actionCollection.length == 0) {
            this.pdfViewerBase.updateDocumentEditedProperty(false);
        }
        else {
            this.pdfViewerBase.updateDocumentEditedProperty(true);
        }
        if (isAnnotationDelete) {
            //This below lines are commented for the below task -EJ2-61754-IsDocumentEdited API is not Properly working for delete annotations
            //Also refer EJ2-55205-The isDocumentEdited property is False on adding handwritten signature
            // let isEdited: boolean = false;
            // if (this.pdfViewer.annotationCollection && this.pdfViewer.annotationCollection.length > 0 && this.pdfViewer.signatureCollection && this.pdfViewer.signatureCollection.length > 0) {
            //     isEdited = true;
            // }
            // if (!isEdited && this.pdfViewer.isDocumentEdited) {
            this.pdfViewerBase.updateDocumentEditedProperty(true);
            // }
        }
    };
    Annotation.prototype.createNote = function () {
        // eslint-disable-next-line max-len
        this.popupNote = createElement('div', { id: this.pdfViewer.element.id + '_annotation_note', className: 'e-pv-annotation-note', styles: 'display:none' });
        this.popupNoteAuthor = createElement('div', { id: this.pdfViewer.element.id + '_annotation_note_author', className: 'e-pv-annotation-note-author' });
        this.popupNote.appendChild(this.popupNoteAuthor);
        // eslint-disable-next-line max-len
        this.popupNoteContent = createElement('div', { id: this.pdfViewer.element.id + '_annotation_note_content', className: 'e-pv-annotation-note-content' });
        this.popupNote.appendChild(this.popupNoteContent);
        this.pdfViewerBase.mainContainer.appendChild(this.popupNote);
    };
    /**
     * @param event
     * @param color
     * @param author
     * @param note
     * @param type
     * @param event
     * @param color
     * @param author
     * @param note
     * @param type
     * @private
     */
    // eslint-disable-next-line
    Annotation.prototype.showPopupNote = function (event, color, author, note, type) {
        var mainContainerPosition = this.pdfViewerBase.mainContainer.getBoundingClientRect();
        var popupNoteClientRect = this.popupNote.getBoundingClientRect();
        if (author) {
            this.popupNoteAuthor.textContent = author;
        }
        this.popupNoteContent.textContent = note;
        if (type === 'Highlight') {
            this.popupNote.style.backgroundColor = 'rgb(237, 232, 177)';
        }
        else if (type === 'Underline') {
            this.popupNote.style.backgroundColor = 'rgb(187, 241, 191)';
        }
        else if (type === 'Strikethrough') {
            this.popupNote.style.backgroundColor = 'rgb(242, 188, 207)';
        }
        this.popupNote.style.display = 'block';
        var topPosition = (event.pageY - mainContainerPosition.top + 5);
        var leftPosition = (event.pageX - mainContainerPosition.left + 5);
        if (leftPosition + popupNoteClientRect.width > mainContainerPosition.width) {
            leftPosition = leftPosition - popupNoteClientRect.width;
        }
        if (topPosition + popupNoteClientRect.height > mainContainerPosition.height) {
            topPosition = topPosition - popupNoteClientRect.height;
        }
        this.popupNote.style.top = topPosition + 'px';
        this.popupNote.style.left = leftPosition + 'px';
    };
    /**
     * @private
     */
    Annotation.prototype.hidePopupNote = function () {
        if (this.popupNote) {
            this.popupNote.style.display = 'none';
        }
    };
    Annotation.prototype.createTextMarkupPopup = function () {
        var _this = this;
        var elementId = this.pdfViewer.element.id;
        // eslint-disable-next-line max-len
        this.popupElement = createElement('div', { id: elementId + '_popup_annotation_note', className: 'e-pv-annotation-popup-menu', styles: 'display:none' });
        var headerElement = createElement('div', { id: elementId + '_popup_header', className: 'e-pv-annotation-popup-header' });
        // eslint-disable-next-line max-len
        this.authorPopupElement = createElement('div', { id: elementId + '_popup_author', className: 'e-pv-annotation-popup-author' });
        headerElement.appendChild(this.authorPopupElement);
        // eslint-disable-next-line max-len
        var closeBtn = createElement('span', { id: elementId + '_popup_close', className: 'e-pv-annotation-popup-close e-pv-icon' });
        headerElement.appendChild(closeBtn);
        this.popupElement.appendChild(headerElement);
        // eslint-disable-next-line max-len
        this.modifiedDateElement = createElement('div', { id: elementId + '_popup_modified_time', className: 'e-pv-annotation-modified-time' });
        this.popupElement.appendChild(this.modifiedDateElement);
        // eslint-disable-next-line max-len
        var contentContainer = createElement('div', { id: elementId + '_popup_content_container', className: 'e-pv-annotation-popup-note-container' });
        this.noteContentElement = createElement('div', { id: elementId + '_popup_content', className: 'e-pv-annotation-popup-content' });
        this.noteContentElement.contentEditable = 'true';
        contentContainer.appendChild(this.noteContentElement);
        this.popupElement.appendChild(contentContainer);
        this.pdfViewerBase.viewerContainer.appendChild(this.popupElement);
        closeBtn.addEventListener('click', this.saveClosePopupMenu.bind(this));
        closeBtn.addEventListener('touchend', this.saveClosePopupMenu.bind(this));
        this.popupElement.addEventListener('mousedown', this.onPopupElementMoveStart.bind(this));
        this.popupElement.addEventListener('mousemove', this.onPopupElementMove.bind(this));
        window.addEventListener('mouseup', this.onPopupElementMoveEnd.bind(this));
        this.popupElement.addEventListener('touchstart', this.onPopupElementMoveStart.bind(this));
        this.popupElement.addEventListener('touchmove', this.onPopupElementMove.bind(this));
        window.addEventListener('touchend', this.onPopupElementMoveEnd.bind(this));
        this.noteContentElement.addEventListener('mousedown', function () {
            _this.noteContentElement.focus();
        });
    };
    // eslint-disable-next-line
    Annotation.prototype.onPopupElementMoveStart = function (event) {
        if (event.type === 'touchstart') {
            event = event.changedTouches[0];
        }
        if ((event.target.id !== (this.noteContentElement.id) || !(event.target.contains(this.noteContentElement.childNodes[0])))) {
            this.isPopupMenuMoved = true;
            var popupElementClientRect = this.popupElement.getBoundingClientRect();
            this.clientX = event.clientX - popupElementClientRect.left;
            // eslint-disable-next-line max-len
            this.clientY = (event.clientY - popupElementClientRect.top) + (this.pdfViewerBase.pageSize[this.currentAnnotPageNumber].top * this.pdfViewerBase.getZoomFactor());
        }
    };
    // eslint-disable-next-line
    Annotation.prototype.onPopupElementMove = function (event) {
        if (event.type === 'touchmove') {
            event = event.changedTouches[0];
        }
        // eslint-disable-next-line max-len
        if (this.isPopupMenuMoved && (event.target.id !== (this.noteContentElement.id) || !(event.target.contains(this.noteContentElement.childNodes[0])))) {
            var left = (event.clientX - this.clientX) + parseFloat(this.popupElement.style.left);
            var top_1 = ((event.clientY - this.clientY) + parseFloat(this.popupElement.style.top));
            this.clientX = event.clientX;
            this.clientY = event.clientY;
            var clientPosition = this.popupElement.getBoundingClientRect();
            var pageDiv = document.getElementById(this.pdfViewer.element.id + '_pageDiv_' + this.currentAnnotPageNumber);
            // eslint-disable-next-line max-len
            if (left > parseFloat(pageDiv.style.left) && (left + clientPosition.width) < (parseFloat(pageDiv.style.left) + parseFloat(pageDiv.style.width))) {
                this.popupElement.style.left = (left) + 'px';
            }
            else {
                this.popupElement.style.left = parseFloat(this.popupElement.style.left) + 'px';
            }
            // eslint-disable-next-line max-len
            if (top_1 > parseFloat(pageDiv.style.top) && (top_1 + clientPosition.height) < (parseFloat(pageDiv.style.top) + parseFloat(pageDiv.style.height))) {
                this.popupElement.style.top = (top_1) + 'px';
            }
            else {
                this.popupElement.style.top = parseFloat(this.popupElement.style.top) + 'px';
            }
        }
    };
    Annotation.prototype.onPopupElementMoveEnd = function () {
        this.isPopupMenuMoved = false;
    };
    Annotation.prototype.saveClosePopupMenu = function () {
        if (this.textMarkupAnnotationModule) {
            this.textMarkupAnnotationModule.saveNoteContent(this.currentAnnotPageNumber, this.noteContentElement.innerText);
        }
        this.closePopupMenu();
    };
    /**
     * @private
     */
    Annotation.prototype.closePopupMenu = function () {
        if (this.popupElement) {
            this.popupElement.parentElement.removeChild(this.popupElement);
            this.popupElement = null;
            this.isPopupNoteVisible = false;
        }
    };
    /**
     * @param event
     * @private
     */
    // eslint-disable-next-line
    Annotation.prototype.showAnnotationPopup = function (event) {
        if (this.textMarkupAnnotationModule) {
            this.currentAnnotPageNumber = this.getEventPageNumber(event);
            // eslint-disable-next-line max-len
            if (this.textMarkupAnnotationModule && (event.target !== (this.noteContentElement) || (event.target.contains(this.noteContentElement.childNodes[0])))) {
                this.hidePopupNote();
                if (!this.popupElement) {
                    this.createTextMarkupPopup();
                    this.popupElement.style.display = 'block';
                    this.authorPopupElement.textContent = this.textMarkupAnnotationModule.currentTextMarkupAnnotation.author;
                    // eslint-disable-next-line max-len
                    this.modifiedDateElement.textContent = this.getProperDate(this.textMarkupAnnotationModule.currentTextMarkupAnnotation.modifiedDate);
                    this.noteContentElement.textContent = this.textMarkupAnnotationModule.currentTextMarkupAnnotation.note;
                    var clientPosition = this.popupElement.getBoundingClientRect();
                    // eslint-disable-next-line max-len
                    var pageDiv = document.getElementById(this.pdfViewer.element.id + '_pageDiv_' + this.currentAnnotPageNumber);
                    var canvasPosition = pageDiv.getBoundingClientRect();
                    var topPosition = ((event.clientY) - canvasPosition.top) + parseFloat(pageDiv.style.top);
                    var leftPosition = (event.clientX);
                    if ((leftPosition + clientPosition.width) > (parseFloat(pageDiv.style.left) + parseFloat(pageDiv.style.width))) {
                        this.popupElement.style.left = (leftPosition - clientPosition.width) + 'px';
                    }
                    else {
                        this.popupElement.style.left = leftPosition + 'px';
                    }
                    if ((topPosition + clientPosition.height) > (parseFloat(pageDiv.style.top) + parseFloat(pageDiv.style.height))) {
                        this.popupElement.style.top = (topPosition - clientPosition.height) + 'px';
                    }
                    else {
                        this.popupElement.style.top = topPosition + 'px';
                    }
                    this.isPopupNoteVisible = true;
                }
            }
        }
    };
    /**
     * @param args
     * @param isOpacity
     * @param args
     * @param isOpacity
     * @private
     */
    // eslint-disable-next-line
    Annotation.prototype.modifyOpacity = function (args, isOpacity) {
        var currentAnnotation = this.pdfViewer.selectedItems.annotations[0];
        var clonedObject = cloneObject(currentAnnotation);
        var redoClonedObject = cloneObject(currentAnnotation);
        var opacityValue = 1;
        if (isOpacity) {
            opacityValue = args / 100;
        }
        else {
            opacityValue = args.value / 100;
        }
        if (currentAnnotation.opacity !== opacityValue) {
            redoClonedObject.opacity = opacityValue;
            this.pdfViewer.nodePropertyChange(currentAnnotation, { opacity: opacityValue });
            if (currentAnnotation.shapeAnnotationType === 'StickyNotes') {
                this.stickyNotesAnnotationModule.updateOpacityValue(currentAnnotation);
            }
            else {
                this.modifyInCollections(currentAnnotation, 'opacity');
            }
            if (currentAnnotation.shapeAnnotationType === 'HandWrittenSignature' || currentAnnotation.shapeAnnotationType === 'SignatureImage' || currentAnnotation.shapeAnnotationType === 'SignatureText') {
                // eslint-disable-next-line max-len
                this.pdfViewer.fireSignaturePropertiesChange(currentAnnotation.pageIndex, currentAnnotation.signatureName, currentAnnotation.shapeAnnotationType, false, true, false, clonedObject.opacity, redoClonedObject.opacity);
            }
            else {
                this.triggerAnnotationPropChange(currentAnnotation, false, false, false, true);
            }
            // eslint-disable-next-line max-len
            this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'Shape Opacity', '', clonedObject, redoClonedObject);
            this.pdfViewer.renderDrawing();
        }
    };
    /**
     * @param currentColor
     * @private
     */
    Annotation.prototype.modifyFontColor = function (currentColor) {
        var currentAnnotation = this.pdfViewer.selectedItems.annotations[0];
        var clonedObject = cloneObject(currentAnnotation);
        var redoClonedObject = cloneObject(currentAnnotation);
        redoClonedObject.fontColor = currentColor;
        this.pdfViewer.nodePropertyChange(currentAnnotation, { fontColor: currentColor });
        this.modifyInCollections(currentAnnotation, 'fontColor');
        this.triggerAnnotationPropChange(currentAnnotation, false, false, false, true);
        // eslint-disable-next-line max-len
        this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'fontColor', '', clonedObject, redoClonedObject);
        this.pdfViewer.renderDrawing();
    };
    /**
     * @param currentValue
     * @private
     */
    Annotation.prototype.modifyFontFamily = function (currentValue) {
        var currentAnnotation = this.pdfViewer.selectedItems.annotations[0];
        var clonedObject = cloneObject(currentAnnotation);
        var redoClonedObject = cloneObject(currentAnnotation);
        redoClonedObject.fontFamily = currentValue;
        if (this.pdfViewer.freeTextSettings.enableAutoFit) {
            this.updateFontFamilyRenderSize(currentAnnotation, currentValue);
        }
        else {
            this.pdfViewer.nodePropertyChange(currentAnnotation, { fontFamily: currentValue });
        }
        this.modifyInCollections(currentAnnotation, 'fontFamily');
        this.triggerAnnotationPropChange(currentAnnotation, false, false, false, true);
        // eslint-disable-next-line max-len
        this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'fontFamily', '', clonedObject, redoClonedObject);
        this.pdfViewer.renderDrawing();
    };
    /**
     * @param currentValue
     * @private
     */
    Annotation.prototype.modifyFontSize = function (currentValue, isInteracted) {
        var currentAnnotation = this.pdfViewer.selectedItems.annotations[0];
        var clonedObject = cloneObject(currentAnnotation);
        var redoClonedObject = cloneObject(currentAnnotation);
        redoClonedObject.fontSize = currentValue;
        var freeTextAnnotation = this.freeTextAnnotationModule;
        var x = currentAnnotation.bounds.x;
        var y = currentAnnotation.bounds.y;
        currentAnnotation.fontSize = currentValue;
        if (freeTextAnnotation && !freeTextAnnotation.isNewFreeTextAnnot && currentAnnotation.dynamicText !== '') {
            freeTextAnnotation.addInuptElemet({ x: x, y: y }, currentAnnotation);
            if (currentAnnotation) {
                if (currentAnnotation.previousFontSize != currentValue) {
                    freeTextAnnotation.inputBoxElement.style.height = 'auto';
                    if (isInteracted) {
                        freeTextAnnotation.inputBoxElement.style.height = freeTextAnnotation.inputBoxElement.scrollHeight + 5 + 'px';
                    }
                    else {
                        if (freeTextAnnotation.inputBoxElement.scrollHeight + 5 > currentAnnotation.bounds.height) {
                            freeTextAnnotation.inputBoxElement.style.height = freeTextAnnotation.inputBoxElement.scrollHeight + 5 + 'px';
                        }
                        else {
                            freeTextAnnotation.inputBoxElement.style.height = currentAnnotation.bounds.height + 'px';
                        }
                    }
                }
                var inputEleHeight = parseFloat(freeTextAnnotation.inputBoxElement.style.height);
                var inputEleWidth = parseFloat(freeTextAnnotation.inputBoxElement.style.width);
                var zoomFactor = this.pdfViewerBase.getZoomFactor();
                inputEleWidth = ((inputEleWidth) / zoomFactor);
                inputEleHeight = ((inputEleHeight) / zoomFactor);
                var heightDiff = (inputEleHeight - currentAnnotation.bounds.height);
                var y_1 = undefined;
                if (heightDiff > 0) {
                    y_1 = currentAnnotation.wrapper.offsetY + (heightDiff / 2);
                    y_1 = y_1 > 0 ? y_1 : undefined;
                }
                else {
                    heightDiff = Math.abs(heightDiff);
                    y_1 = currentAnnotation.wrapper.offsetY - (heightDiff / 2);
                    y_1 = y_1 > 0 ? y_1 : undefined;
                }
                var widthDiff = (inputEleWidth - currentAnnotation.bounds.width);
                var x_1 = undefined;
                if (widthDiff > 0) {
                    x_1 = currentAnnotation.wrapper.offsetX + (widthDiff / 2);
                    x_1 = x_1 > 0 ? x_1 : undefined;
                }
                else {
                    widthDiff = Math.abs(widthDiff);
                    x_1 = currentAnnotation.wrapper.offsetX - (widthDiff / 2);
                }
                currentAnnotation.bounds.width = inputEleWidth;
                currentAnnotation.bounds.height = inputEleHeight;
                // eslint-disable-next-line max-len
                this.pdfViewer.nodePropertyChange(currentAnnotation, { fontSize: currentValue, bounds: { width: currentAnnotation.bounds.width, height: currentAnnotation.bounds.height, y: y_1, x: x_1 } });
                this.pdfViewer.renderSelector(currentAnnotation.pageIndex, this.pdfViewer.annotationSelectorSettings);
                currentAnnotation.previousFontSize = currentValue;
            }
            this.modifyInCollections(currentAnnotation, 'fontSize');
            this.modifyInCollections(currentAnnotation, 'bounds');
            this.triggerAnnotationPropChange(currentAnnotation, false, false, false, true);
            // eslint-disable-next-line max-len
            this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'fontSize', '', clonedObject, redoClonedObject);
            this.pdfViewer.renderDrawing();
        }
    };
    /**
     * @param currentValue
     * @private
     */
    Annotation.prototype.modifyTextAlignment = function (currentValue) {
        var currentAnnotation = this.pdfViewer.selectedItems.annotations[0];
        var clonedObject = cloneObject(currentAnnotation);
        var redoClonedObject = cloneObject(currentAnnotation);
        redoClonedObject.textAlign = currentValue;
        this.pdfViewer.nodePropertyChange(currentAnnotation, { textAlign: currentValue });
        this.modifyInCollections(currentAnnotation, 'textAlign');
        this.triggerAnnotationPropChange(currentAnnotation, false, false, false, true);
        // eslint-disable-next-line max-len
        this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'textAlign', '', clonedObject, redoClonedObject);
        this.pdfViewer.renderDrawing();
    };
    /**
     * @param fontInfo
     * @param action
     * @private
     */
    Annotation.prototype.modifyTextProperties = function (fontInfo, action) {
        var currentAnnotation = this.pdfViewer.selectedItems.annotations[0];
        var clonedObject = cloneObject(currentAnnotation);
        var redoClonedObject = cloneObject(currentAnnotation);
        if (action === 'bold') {
            redoClonedObject.font.isBold = fontInfo.isBold;
        }
        else if (action === 'italic') {
            redoClonedObject.font.isItalic = fontInfo.isItalic;
        }
        else if (action === 'underline') {
            redoClonedObject.font.isUnderline = fontInfo.isUnderline;
            if (redoClonedObject.font.isUnderline && redoClonedObject.font.isStrikeout) {
                redoClonedObject.font.isStrikeout = false;
            }
        }
        else if (action === 'strikeout') {
            redoClonedObject.font.isStrikeout = fontInfo.isStrikeout;
            if (redoClonedObject.font.isUnderline && redoClonedObject.font.isStrikeout) {
                redoClonedObject.font.isUnderline = false;
            }
        }
        this.pdfViewer.nodePropertyChange(currentAnnotation, { font: fontInfo });
        this.modifyInCollections(currentAnnotation, 'textPropertiesChange');
        this.triggerAnnotationPropChange(currentAnnotation, false, false, false, true);
        // eslint-disable-next-line max-len
        this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'textPropertiesChange', '', clonedObject, redoClonedObject);
        this.pdfViewer.renderDrawing();
    };
    /**
     * @param thicknessValue
     * @private
     */
    Annotation.prototype.modifyThickness = function (thicknessValue) {
        var currentAnnotation = this.pdfViewer.selectedItems.annotations[0];
        if (currentAnnotation.thickness !== thicknessValue) {
            var clonedObject = cloneObject(currentAnnotation);
            var redoClonedObject = cloneObject(currentAnnotation);
            redoClonedObject.thickness = thicknessValue;
            this.pdfViewer.nodePropertyChange(currentAnnotation, { thickness: thicknessValue });
            this.modifyInCollections(currentAnnotation, 'thickness');
            if (currentAnnotation.shapeAnnotationType === 'HandWrittenSignature' || currentAnnotation.shapeAnnotationType === 'SignatureText' || currentAnnotation.shapeAnnotationType === 'SignatureImage') {
                // eslint-disable-next-line max-len
                this.pdfViewer.fireSignaturePropertiesChange(currentAnnotation.pageIndex, currentAnnotation.signatureName, currentAnnotation.shapeAnnotationType, false, false, true, clonedObject.thickness, redoClonedObject.thickness);
            }
            else {
                this.triggerAnnotationPropChange(currentAnnotation, false, false, true, false);
            }
            // eslint-disable-next-line max-len
            this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'Shape Thickness', '', clonedObject, redoClonedObject);
            this.pdfViewer.renderDrawing();
        }
    };
    /**
     * @param color
     * @private
     */
    Annotation.prototype.modifyStrokeColor = function (color) {
        var currentAnnotation = this.pdfViewer.selectedItems.annotations[0];
        var clonedObject = cloneObject(currentAnnotation);
        var redoClonedObject = cloneObject(currentAnnotation);
        redoClonedObject.strokeColor = color;
        this.pdfViewer.nodePropertyChange(currentAnnotation, { strokeColor: color });
        this.modifyInCollections(currentAnnotation, 'stroke');
        if (currentAnnotation.shapeAnnotationType === 'HandWrittenSignature' || currentAnnotation.shapeAnnotationType === 'SignatureText' || currentAnnotation.shapeAnnotationType === 'SignatureImage') {
            // eslint-disable-next-line max-len
            this.pdfViewer.fireSignaturePropertiesChange(currentAnnotation.pageIndex, currentAnnotation.signatureName, currentAnnotation.shapeAnnotationType, true, false, false, clonedObject.strokeColor, redoClonedObject.strokeColor);
        }
        else {
            this.triggerAnnotationPropChange(currentAnnotation, false, true, false, false);
        }
        // eslint-disable-next-line max-len
        this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'Shape Stroke', '', clonedObject, redoClonedObject);
        this.pdfViewer.renderDrawing();
    };
    /**
     * @param color
     * @private
     */
    Annotation.prototype.modifyFillColor = function (color) {
        var currentAnnotation = this.pdfViewer.selectedItems.annotations[0];
        var clonedObject = cloneObject(currentAnnotation);
        var redoClonedObject = cloneObject(currentAnnotation);
        redoClonedObject.fillColor = color;
        this.pdfViewer.nodePropertyChange(this.pdfViewer.selectedItems.annotations[0], { fillColor: color });
        this.modifyInCollections(currentAnnotation, 'fill');
        this.triggerAnnotationPropChange(currentAnnotation, true, false, false, false);
        // eslint-disable-next-line max-len
        this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'Shape Fill', '', clonedObject, redoClonedObject);
        this.pdfViewer.renderDrawing();
    };
    /**
     * @param dynamicText
     * @param annotName
     * @private
     */
    Annotation.prototype.modifyDynamicTextValue = function (dynamicText, annotName) {
        var currentAnnotation = null;
        currentAnnotation = this.pdfViewer.annotations.filter(function (s) { return s.annotName === annotName; })[0];
        if (currentAnnotation) {
            var clonedObject = cloneObject(currentAnnotation);
            var redoClonedObject = cloneObject(currentAnnotation);
            currentAnnotation.dynamicText = dynamicText;
            redoClonedObject.dynamicText = dynamicText;
            if (clonedObject.dynamicText === '') {
                clonedObject.dynamicText = this.freeTextAnnotationModule.previousText;
            }
            this.pdfViewer.nodePropertyChange(currentAnnotation, { dynamicText: dynamicText });
            this.pdfViewer.renderSelector(currentAnnotation.pageIndex, currentAnnotation.annotationSelectorSettings);
            // eslint-disable-next-line max-len
            this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'dynamicText Change', '', clonedObject, redoClonedObject);
            this.modifyInCollections(currentAnnotation, 'dynamicText');
            if (!isNullOrUndefined(this.freeTextAnnotationModule) && this.freeTextAnnotationModule.previousText !== 'Type Here' && this.freeTextAnnotationModule.previousText !== currentAnnotation.dynamicText) {
                this.triggerAnnotationPropChange(currentAnnotation, false, false, false, false, false, false, false, true, this.freeTextAnnotationModule.previousText, currentAnnotation.dynamicText);
            }
            this.pdfViewer.renderDrawing();
        }
    };
    // eslint-disable-next-line
    Annotation.prototype.modifyInCollections = function (annotationBase, property) {
        // eslint-disable-next-line
        var returnObj;
        if (annotationBase.measureType === '' || isNullOrUndefined(annotationBase.measureType)) {
            if (annotationBase.shapeAnnotationType === 'FreeText') {
                returnObj = this.freeTextAnnotationModule.modifyInCollection(property, annotationBase.pageIndex, annotationBase);
            }
            else if (annotationBase.shapeAnnotationType === 'HandWrittenSignature' || annotationBase.shapeAnnotationType === 'SignatureText' || annotationBase.shapeAnnotationType === 'SignatureImage') {
                // eslint-disable-next-line max-len
                returnObj = this.pdfViewerBase.signatureModule.modifySignatureCollection(property, annotationBase.pageIndex, annotationBase);
            }
            else if (annotationBase.shapeAnnotationType === 'Stamp') {
                returnObj = this.stampAnnotationModule.modifyInCollection(property, annotationBase.pageIndex, annotationBase);
            }
            else if (annotationBase.shapeAnnotationType === 'Ink') {
                // eslint-disable-next-line max-len
                returnObj = this.inkAnnotationModule.modifySignatureInkCollection(property, annotationBase.pageIndex, annotationBase);
            }
            else {
                returnObj = this.shapeAnnotationModule.modifyInCollection(property, annotationBase.pageIndex, annotationBase);
            }
        }
        else if (annotationBase.measureType === 'Distance' || annotationBase.measureType === 'Perimeter' ||
            annotationBase.measureType === 'Radius' || annotationBase.measureType === 'Area' || annotationBase.measureType === 'Volume') {
            returnObj = this.measureAnnotationModule.modifyInCollection(property, annotationBase.pageIndex, annotationBase);
        }
        if (this.isUndoRedoAction) {
            this.stickyNotesAnnotationModule.updateAnnotationModifiedDate(annotationBase, null, true);
            if (this.isUndoAction) {
                annotationBase.modifiedDate = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
            }
        }
        else {
            if (property !== 'bounds') {
                this.stickyNotesAnnotationModule.updateAnnotationModifiedDate(annotationBase);
            }
        }
        return returnObj;
    };
    /**
     * @private
     */
    Annotation.prototype.createPropertiesWindow = function () {
        var _this = this;
        if (!isBlazor()) {
            var elementID = this.pdfViewer.element.id;
            // eslint-disable-next-line max-len
            var dialogDiv = createElement('div', { id: elementID + '_properties_window', className: 'e-pv-properties-window' });
            var appearanceTab = this.createAppearanceTab();
            this.pdfViewerBase.pageContainer.appendChild(dialogDiv);
            this.propertiesDialog = new Dialog({
                showCloseIcon: true, closeOnEscape: false, isModal: true, header: this.pdfViewer.localeObj.getConstant('Line Properties'),
                target: this.pdfViewer.element, content: appearanceTab, close: function () {
                    _this.destroyPropertiesWindow();
                }
            });
            if (!Browser.isDevice || this.pdfViewer.enableDesktopMode) {
                this.propertiesDialog.buttons = [
                    // eslint-disable-next-line max-len
                    { buttonModel: { content: this.pdfViewer.localeObj.getConstant('OK'), isPrimary: true }, click: this.onOkClicked.bind(this) },
                    { buttonModel: { content: this.pdfViewer.localeObj.getConstant('Cancel') }, click: this.onCancelClicked.bind(this) }
                ];
            }
            else {
                this.propertiesDialog.buttons = [
                    { buttonModel: { content: this.pdfViewer.localeObj.getConstant('Cancel') }, click: this.onCancelClicked.bind(this) },
                    // eslint-disable-next-line max-len
                    { buttonModel: { content: this.pdfViewer.localeObj.getConstant('OK'), isPrimary: true }, click: this.onOkClicked.bind(this) }
                ];
            }
            if (this.pdfViewer.enableRtl) {
                this.propertiesDialog.enableRtl = true;
            }
            this.propertiesDialog.appendTo(dialogDiv);
            if (this.pdfViewer.selectedItems.annotations[0] && this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'Line') {
                // eslint-disable-next-line
                var fillColor = document.getElementById(this.pdfViewer.element.id + '_properties_fill_color');
                fillColor.disabled = true;
            }
            // eslint-disable-next-line max-len
            this.startArrowDropDown.content = this.createContent(this.getArrowString(this.pdfViewer.selectedItems.annotations[0].sourceDecoraterShapes)).outerHTML;
            this.endArrowDropDown.content = this.createContent(this.getArrowString(this.pdfViewer.selectedItems.annotations[0].taregetDecoraterShapes)).outerHTML;
            this.thicknessBox.value = this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.strokeWidth;
            this.fillColorPicker.value = this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.fill;
            this.refreshColorPicker(this.fillColorPicker);
            this.strokeColorPicker.value = this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.strokeColor;
            this.refreshColorPicker(this.strokeColorPicker);
            this.updateColorInIcon(this.fillDropDown.element, this.fillColorPicker.value);
            this.updateColorInIcon(this.strokeDropDown.element, this.strokeColorPicker.value);
            this.opacitySlider.value = this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.opacity * 100;
            this.updateOpacityIndicator();
            // eslint-disable-next-line
            if (parseInt(this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.strokeDashArray) >= 3) {
                this.lineStyleDropDown.content = this.createDropDownContent('dashed').outerHTML;
            }
            else if (this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.strokeDashArray === '2') {
                this.lineStyleDropDown.content = this.createDropDownContent('dotted').outerHTML;
            }
            else if (this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.strokeDashArray === '0') {
                this.lineStyleDropDown.content = this.createDropDownContent('solid').outerHTML;
            }
            this.selectedLineStyle = this.pdfViewer.selectedItems.annotations[0].borderStyle;
            this.selectedLineDashArray = this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.strokeDashArray;
            if (this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'Distance') {
                this.leaderLengthBox.value = this.pdfViewer.selectedItems.annotations[0].leaderHeight;
            }
        }
        else {
            var opacityValue = this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.opacity * 100;
            var lineStartElement = this.getArrowString(this.pdfViewer.selectedItems.annotations[0].sourceDecoraterShapes);
            var lineEndElement = this.getArrowString(this.pdfViewer.selectedItems.annotations[0].taregetDecoraterShapes);
            var lineStyleElement = void 0;
            // eslint-disable-next-line
            if (parseInt(this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.strokeDashArray) >= 3) {
                lineStyleElement = 'Dashed';
            }
            else if (this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.strokeDashArray === '2') {
                lineStyleElement = 'Dotted';
            }
            else if (this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.strokeDashArray === '0') {
                lineStyleElement = 'Solid';
            }
            this.pdfViewer._dotnetInstance.invokeMethodAsync('OpenPropertiesDialog', opacityValue, lineStartElement, lineEndElement, lineStyleElement);
        }
    };
    Annotation.prototype.updatePropertiesWindowInBlazor = function () {
        // eslint-disable-next-line
        var thicknessElement = document.querySelector('#' + this.pdfViewer.element.id + '_line_thickness');
        // eslint-disable-next-line
        var fillColorElement = document.querySelector('#' + this.pdfViewer.element.id + '_properties_fill_color_button');
        // eslint-disable-next-line
        var strokeColorElement = document.querySelector('#' + this.pdfViewer.element.id + '_properties_stroke_color_button');
        // eslint-disable-next-line
        var leaderLengthElement = document.querySelector('#' + this.pdfViewer.element.id + '_properties_leader_length');
        thicknessElement.value = this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.strokeWidth;
        fillColorElement.value = this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.fill;
        strokeColorElement.value = this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.strokeColor;
        this.onStrokeColorChange(strokeColorElement.value);
        this.onFillColorChange(fillColorElement.value);
        if (this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'Distance') {
            // eslint-disable-next-line
            leaderLengthElement.value = parseInt(this.pdfViewer.selectedItems.annotations[0].leaderHeight.toString());
        }
    };
    Annotation.prototype.destroyPropertiesWindow = function () {
        if (this.strokeColorPicker) {
            this.strokeColorPicker.destroy();
            this.strokeColorPicker = null;
        }
        if (this.fillColorPicker) {
            this.fillColorPicker.destroy();
            this.fillColorPicker = null;
        }
        if (this.endArrowDropDown) {
            this.endArrowDropDown.destroy();
            this.endArrowDropDown = null;
        }
        if (this.startArrowDropDown) {
            this.startArrowDropDown.destroy();
            this.startArrowDropDown = null;
        }
        if (this.opacitySlider) {
            this.opacitySlider.destroy();
            this.opacitySlider = null;
        }
        if (this.thicknessBox) {
            this.thicknessBox.destroy();
            this.thicknessBox = null;
        }
        if (this.lineStyleDropDown) {
            this.lineStyleDropDown.destroy();
            this.lineStyleDropDown = null;
        }
        if (this.leaderLengthBox) {
            this.leaderLengthBox.destroy();
            this.leaderLengthBox = null;
        }
        if (this.propertiesDialog) {
            this.propertiesDialog.destroy();
            this.propertiesDialog = null;
        }
        var dialogElement = this.pdfViewerBase.getElement('_properties_window');
        if (dialogElement) {
            dialogElement.parentElement.removeChild(dialogElement);
        }
    };
    Annotation.prototype.refreshColorPicker = function (colorPick) {
        colorPick.setProperties({ 'value': colorPick.value }, true);
        colorPick.refresh();
    };
    Annotation.prototype.createAppearanceTab = function () {
        var _this = this;
        var elementID = this.pdfViewer.element.id;
        // eslint-disable-next-line max-len
        var items = [{ text: this.pdfViewer.localeObj.getConstant('None') }, { text: this.pdfViewer.localeObj.getConstant('Open Arrow') }, { text: this.pdfViewer.localeObj.getConstant('Closed Arrow') },
            { text: this.pdfViewer.localeObj.getConstant('Round Arrow') }, { text: this.pdfViewer.localeObj.getConstant('Square Arrow') }, { text: this.pdfViewer.localeObj.getConstant('Diamond Arrow') }];
        // eslint-disable-next-line max-len
        var appearanceDiv = createElement('div', { id: elementID + '_properties_appearance' });
        var lineStyleContainer = createElement('div', { className: 'e-pv-properties-line-style-prop' });
        appearanceDiv.appendChild(lineStyleContainer);
        // eslint-disable-next-line max-len
        var lineHeadStartElement = this.createInputElement(this.pdfViewer.localeObj.getConstant('Start Arrow'), lineStyleContainer, 'text', 'button', true, 'e-pv-properties-line-start', elementID + '_properties_line_start');
        // eslint-disable-next-line max-len
        this.startArrowDropDown = new DropDownButton({ items: items, cssClass: 'e-pv-properties-line-start', select: this.onStartArrowHeadStyleSelect.bind(this) }, lineHeadStartElement);
        var lineHeadEndElement = this.createInputElement(this.pdfViewer.localeObj.getConstant('End Arrow'), lineStyleContainer, 'text', 'button', true, 'e-pv-properties-line-end', elementID + '_properties_line_end');
        // eslint-disable-next-line max-len
        var borderStyleContainer = createElement('div', { className: 'e-pv-properties-border-style' });
        appearanceDiv.appendChild(borderStyleContainer);
        // eslint-disable-next-line max-len
        this.endArrowDropDown = new DropDownButton({ items: items, cssClass: 'e-pv-properties-line-end', select: this.onEndArrowHeadStyleSelect.bind(this) }, lineHeadEndElement);
        var lineStyleElement = this.createInputElement(this.pdfViewer.localeObj.getConstant('Line Style'), borderStyleContainer, 'text', 'button', true, 'e-pv-properties-line-style', elementID + '_properties_line_style');
        var dropDownTarget = this.createStyleList();
        // eslint-disable-next-line max-len
        this.lineStyleDropDown = new DropDownButton({ cssClass: 'e-pv-properties-line-style', target: dropDownTarget }, lineStyleElement);
        // eslint-disable-next-line max-len
        var thicknessElement = this.createInputElement(this.pdfViewer.localeObj.getConstant('Line Thickness'), borderStyleContainer, 'text', 'input', true, 'e-pv-properties-line-thickness', elementID + '_properties_thickness');
        this.thicknessBox = new NumericTextBox({ value: 0, format: '## pt', cssClass: 'e-pv-properties-line-thickness', min: 0, max: 12 }, thicknessElement);
        var colorStyleContainer = createElement('div', { className: 'e-pv-properties-color-style' });
        appearanceDiv.appendChild(colorStyleContainer);
        // eslint-disable-next-line max-len
        var fillColorElement = this.createInputElement(this.pdfViewer.localeObj.getConstant('Fill Color'), colorStyleContainer, 'color', 'button', true, 'e-pv-properties-line-fill-color', elementID + '_properties_fill_color');
        this.fillColorPicker = this.createColorPicker(elementID + '_properties_fill_color', true);
        this.fillColorPicker.change = function (args) {
            var currentColor = (args.currentValue.hex === '') ? '#ffffff00' : args.currentValue.hex;
            _this.fillDropDown.toggle();
            _this.updateColorInIcon(_this.fillDropDown.element, currentColor);
        };
        // eslint-disable-next-line max-len
        this.fillDropDown = this.createDropDownButton(fillColorElement, 'e-pv-properties-fill-color-icon', this.fillColorPicker.element.parentElement);
        this.fillDropDown.beforeOpen = this.onFillDropDownBeforeOpen.bind(this);
        this.fillDropDown.open = function () {
            _this.fillColorPicker.refresh();
        };
        // eslint-disable-next-line max-len
        var strokeColorElement = this.createInputElement(this.pdfViewer.localeObj.getConstant('Line Color'), colorStyleContainer, 'color', 'button', true, 'e-pv-properties-line-stroke-color', elementID + '_properties_stroke_color');
        this.strokeColorPicker = this.createColorPicker(elementID + '_properties_stroke_color', false);
        this.strokeColorPicker.change = function (args) {
            var currentColor = (args.currentValue.hex === '') ? '#ffffff00' : args.currentValue.hex;
            _this.strokeDropDown.toggle();
            _this.updateColorInIcon(_this.strokeDropDown.element, currentColor);
        };
        // eslint-disable-next-line max-len
        this.strokeDropDown = this.createDropDownButton(strokeColorElement, 'e-pv-properties-stroke-color-icon', this.strokeColorPicker.element.parentElement);
        this.strokeDropDown.beforeOpen = this.onStrokeDropDownBeforeOpen.bind(this);
        this.strokeDropDown.open = function () {
            _this.strokeColorPicker.refresh();
        };
        var opacityContainer = createElement('div', { className: 'e-pv-properties-opacity-style' });
        appearanceDiv.appendChild(opacityContainer);
        // eslint-disable-next-line max-len
        var opacityElement = this.createInputElement(this.pdfViewer.localeObj.getConstant('Opacity'), opacityContainer, '', 'div', true, 'e-pv-properties-line-opacity', elementID + '_properties_opacity');
        this.opacitySlider = new Slider({
            type: 'MinRange', max: 100, min: 0, cssClass: 'e-pv-properties-line-opacity', change: function () {
                _this.updateOpacityIndicator();
            }
        }, opacityElement);
        if (this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'Distance') {
            // eslint-disable-next-line max-len
            var lineLengthElement = this.createInputElement(this.pdfViewer.localeObj.getConstant('Leader Length'), opacityContainer, 'text', 'input', true, 'e-pv-properties-line-leader-length', elementID + '_properties_leader_length');
            this.leaderLengthBox = new NumericTextBox({ value: 0, format: '## pt', cssClass: 'e-pv-properties-line-leader-length', min: 0, max: 100 }, lineLengthElement);
        }
        return appearanceDiv;
    };
    Annotation.prototype.createContent = function (text) {
        var divElement = createElement('div', { className: 'e-pv-properties-line-style-content' });
        divElement.textContent = text;
        return divElement;
    };
    Annotation.prototype.onStrokeDropDownBeforeOpen = function () {
        if (this.pdfViewer.selectedItems.annotations.length === 1) {
            this.strokeColorPicker.value = this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.strokeColor;
        }
        this.strokeColorPicker.refresh();
    };
    Annotation.prototype.onFillDropDownBeforeOpen = function () {
        if (this.pdfViewer.selectedItems.annotations.length === 1) {
            this.fillColorPicker.value = this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.strokeColor;
        }
        this.fillColorPicker.refresh();
    };
    Annotation.prototype.createStyleList = function () {
        var _this = this;
        var ulElement = createElement('ul');
        document.body.appendChild(ulElement);
        var solidLi = this.createListForStyle('solid');
        solidLi.addEventListener('click', function () {
            _this.setThickness('0', 'solid');
        });
        ulElement.appendChild(solidLi);
        var dottedLi = this.createListForStyle('dotted');
        dottedLi.addEventListener('click', function () {
            _this.setThickness('2', 'dotted');
        });
        ulElement.appendChild(dottedLi);
        var dashedLi = this.createListForStyle('dashed');
        dashedLi.addEventListener('click', function () {
            _this.setThickness('3', 'dashed');
        });
        ulElement.appendChild(dashedLi);
        return ulElement;
    };
    Annotation.prototype.createColorPicker = function (idString, isNoColor) {
        var inputElement = createElement('input', { id: idString + '_target' });
        document.body.appendChild(inputElement);
        var colorPicker = new ColorPicker({
            inline: true, mode: 'Palette', enableOpacity: false, value: '#000000', showButtons: false, modeSwitcher: false,
            noColor: isNoColor
        });
        if (this.pdfViewer.enableRtl) {
            colorPicker.enableRtl = true;
        }
        colorPicker.appendTo(inputElement);
        return colorPicker;
    };
    Annotation.prototype.createDropDownButton = function (element, iconClass, target) {
        // eslint-disable-next-line max-len
        var dropDownButton = new DropDownButton({ iconCss: iconClass + ' e-pv-icon', target: target });
        if (this.pdfViewer.enableRtl) {
            dropDownButton.enableRtl = true;
        }
        dropDownButton.appendTo(element);
        return dropDownButton;
    };
    Annotation.prototype.updateColorInIcon = function (element, color) {
        element.childNodes[0].style.borderBottomColor = color;
    };
    /**
     * @param color
     * @private
     */
    Annotation.prototype.onFillColorChange = function (color) {
        // eslint-disable-next-line
        var colorElement = document.querySelector('#' + this.pdfViewer.element.id + '_properties_fill_color_button');
        if (color !== 'transparent') {
            colorElement.children[0].style.borderBottomColor = color;
        }
    };
    /**
     * @param color
     * @private
     */
    Annotation.prototype.onStrokeColorChange = function (color) {
        // eslint-disable-next-line
        var colorElement = document.querySelector('#' + this.pdfViewer.element.id + '_properties_stroke_color_button');
        if (color !== 'transparent') {
            colorElement.children[0].style.borderBottomColor = color;
        }
    };
    Annotation.prototype.setThickness = function (value, style, isBlazor) {
        if (!isBlazor) {
            this.lineStyleDropDown.content = this.createDropDownContent(style).outerHTML;
        }
        this.selectedLineDashArray = value;
        if (value === '0') {
            this.selectedLineStyle = 'Solid';
        }
        else if (value === '2' || value === '3') {
            this.selectedLineStyle = 'Dashed';
        }
    };
    Annotation.prototype.createDropDownContent = function (style) {
        var divElement = createElement('div', { className: 'e-pv-line-styles-content-container' });
        // eslint-disable-next-line max-len
        var spanElement = createElement('span', { className: 'e-pv-line-styles-content', styles: 'border-bottom-style:' + style });
        divElement.appendChild(spanElement);
        return divElement;
    };
    Annotation.prototype.createListForStyle = function (style) {
        var liElement = createElement('li', { className: 'e-menu-item' });
        var divElement = createElement('div', { className: 'e-pv-line-styles-container' });
        // eslint-disable-next-line max-len
        var spanElement = createElement('span', { className: 'e-pv-line-styles-item', styles: 'border-bottom-style:' + style });
        divElement.appendChild(spanElement);
        liElement.appendChild(divElement);
        return liElement;
    };
    Annotation.prototype.onStartArrowHeadStyleSelect = function (args) {
        this.startArrowDropDown.content = this.createContent(args.item.text).outerHTML;
    };
    Annotation.prototype.onEndArrowHeadStyleSelect = function (args) {
        this.endArrowDropDown.content = this.createContent(args.item.text).outerHTML;
    };
    // eslint-disable-next-line max-len
    Annotation.prototype.createInputElement = function (labelText, parentElement, inputType, input, isLabelNeeded, className, idString) {
        var container = createElement('div', { id: idString + '_container', className: className + '-container' });
        if (isLabelNeeded) {
            var label = createElement('div', { id: idString + '_label', className: className + '-label' });
            label.textContent = labelText;
            container.appendChild(label);
        }
        if (this.pdfViewer.localeObj.getConstant('Opacity') === labelText) {
            this.opacityIndicator = createElement('span', { className: 'e-pv-properties-opacity-indicator' });
            container.appendChild(this.opacityIndicator);
        }
        var textBoxInput = createElement(input, { id: idString });
        if (input === 'input') {
            textBoxInput.type = inputType;
        }
        container.appendChild(textBoxInput);
        parentElement.appendChild(container);
        return textBoxInput;
    };
    Annotation.prototype.updateOpacityIndicator = function () {
        this.opacityIndicator.textContent = this.opacitySlider.value + '%';
    };
    /**
     * @private
     */
    Annotation.prototype.onOkClicked = function (opacityValue) {
        var startArrow;
        var endArrow;
        var thickness;
        var strokeColor;
        var fillColor;
        var opacity;
        if (!isBlazor()) {
            startArrow = this.getArrowTypeFromDropDown(this.startArrowDropDown.content);
            endArrow = this.getArrowTypeFromDropDown(this.endArrowDropDown.content);
            thickness = this.thicknessBox.value;
            strokeColor = this.strokeColorPicker.getValue(this.strokeColorPicker.value, 'hex');
            strokeColor = (strokeColor === '') ? '#ffffff00' : strokeColor;
            fillColor = this.fillColorPicker.getValue(this.fillColorPicker.value, 'hex');
            // eslint-disable-next-line max-len
            fillColor = (fillColor === '' || fillColor === '#transp' || this.fillColorPicker.value === '#ffffff00') ? '#ffffff00' : fillColor;
            opacity = this.opacitySlider.value / 100;
        }
        else {
            // eslint-disable-next-line
            var lineStartElement = document.querySelector('#' + this.pdfViewer.element.id + '_properties_line_start');
            // eslint-disable-next-line
            var lineEndElement = document.querySelector('#' + this.pdfViewer.element.id + '_properties_line_end');
            // eslint-disable-next-line
            var thicknessElement = document.querySelector('#' + this.pdfViewer.element.id + '_line_thickness');
            // eslint-disable-next-line
            var lineStyleElement = document.querySelector('#' + this.pdfViewer.element.id + '_properties_style');
            // eslint-disable-next-line
            var fillColorElement = document.querySelector('#' + this.pdfViewer.element.id + '_properties_fill_color_button');
            // eslint-disable-next-line
            var strokeColorElement = document.querySelector('#' + this.pdfViewer.element.id + '_properties_stroke_color_button');
            // eslint-disable-next-line
            var opacityElement = document.querySelector('#' + this.pdfViewer.element.id + '_properties_opacity');
            startArrow = this.getArrowTypeFromDropDown(lineStartElement.value, true);
            endArrow = this.getArrowTypeFromDropDown(lineEndElement.value, true);
            // eslint-disable-next-line
            thickness = parseInt(thicknessElement.value);
            strokeColor = this.getValue(strokeColorElement.children[0].style.borderBottomColor, 'hex');
            strokeColor = (strokeColor === '') ? '#ffffff00' : strokeColor;
            fillColor = this.getValue(fillColorElement.children[0].style.borderBottomColor, 'hex');
            fillColor = (fillColor === '') ? '#ffffff00' : fillColor;
            if (opacityValue) {
                opacity = (opacityValue) / 100;
            }
            else {
                opacity = opacityElement.value / 100;
            }
            if (lineStyleElement.value) {
                if (lineStyleElement.value === 'Solid') {
                    this.setThickness('0', 'solid', true);
                }
                else if (lineStyleElement.value === 'Dotted') {
                    this.setThickness('2', 'dotted', true);
                }
                else if (lineStyleElement.value === 'Dashed') {
                    this.setThickness('3', 'dashed', true);
                }
            }
        }
        var currentAnnotation = this.pdfViewer.selectedItems.annotations[0];
        var clonedObject = cloneObject(currentAnnotation);
        var redoClonedObject = cloneObject(currentAnnotation);
        var newNode = {};
        var isColorChanged = false;
        var isStrokeColorChanged = false;
        var isThicknessChanged = false;
        var isOpacityChanged = false;
        var isLineHeadStartStyleChanged = false;
        var isLineHeadEndStyleChanged = false;
        var isBorderDashArrayChanged = false;
        if (startArrow !== currentAnnotation.sourceDecoraterShapes) {
            newNode.sourceDecoraterShapes = startArrow;
            redoClonedObject.lineHeadStart = this.getArrowString(startArrow);
            isLineHeadStartStyleChanged = true;
        }
        if (endArrow !== currentAnnotation.taregetDecoraterShapes) {
            newNode.taregetDecoraterShapes = endArrow;
            redoClonedObject.lineHeadEnd = this.getArrowString(endArrow);
            isLineHeadEndStyleChanged = true;
        }
        if (thickness !== currentAnnotation.wrapper.children[0].style.strokeWidth) {
            newNode.thickness = thickness;
            redoClonedObject.thickness = thickness;
            isThicknessChanged = true;
        }
        if (strokeColor !== currentAnnotation.wrapper.children[0].style.strokeColor) {
            newNode.strokeColor = strokeColor;
            redoClonedObject.strokeColor = strokeColor;
            isStrokeColorChanged = true;
        }
        if (fillColor !== currentAnnotation.wrapper.children[0].style.fill) {
            newNode.fillColor = fillColor;
            redoClonedObject.fillColor = fillColor;
            isColorChanged = true;
        }
        if (opacity !== currentAnnotation.wrapper.children[0].style.opacity) {
            newNode.opacity = opacity;
            redoClonedObject.opacity = opacity;
            isOpacityChanged = true;
        }
        if (this.selectedLineDashArray !== currentAnnotation.wrapper.children[0].style.strokeDashArray) {
            newNode.borderDashArray = this.selectedLineDashArray;
            newNode.borderStyle = this.selectedLineStyle;
            redoClonedObject.borderDashArray = newNode.borderDashArray;
            redoClonedObject.borderStyle = newNode.borderStyle;
            isBorderDashArrayChanged = true;
        }
        if (!isBlazor()) {
            // eslint-disable-next-line max-len
            if (this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'Distance' && this.leaderLengthBox.value !== this.pdfViewer.selectedItems.annotations[0].leaderHeight) {
                newNode.leaderHeight = this.leaderLengthBox.value;
            }
        }
        else {
            // eslint-disable-next-line
            var leaderLengthElement = document.querySelector('#' + this.pdfViewer.element.id + '_properties_leader_length');
            // eslint-disable-next-line
            if (this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'Distance' && parseInt(leaderLengthElement.value) !== this.pdfViewer.selectedItems.annotations[0].leaderHeight) {
                // eslint-disable-next-line
                newNode.leaderHeight = parseInt(leaderLengthElement.value);
            }
        }
        this.pdfViewer.nodePropertyChange(this.pdfViewer.selectedItems.annotations[0], newNode);
        this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.fill = fillColor;
        // eslint-disable-next-line max-len
        this.triggerAnnotationPropChange(this.pdfViewer.selectedItems.annotations[0], isColorChanged, isStrokeColorChanged, isThicknessChanged, isOpacityChanged, isLineHeadStartStyleChanged, isLineHeadEndStyleChanged, isBorderDashArrayChanged);
        this.modifyInCollections(this.pdfViewer.selectedItems.annotations[0], 'thickness');
        this.modifyInCollections(this.pdfViewer.selectedItems.annotations[0], 'stroke');
        this.modifyInCollections(this.pdfViewer.selectedItems.annotations[0], 'fill');
        this.modifyInCollections(this.pdfViewer.selectedItems.annotations[0], 'opacity');
        this.modifyInCollections(this.pdfViewer.selectedItems.annotations[0], 'dashArray');
        this.modifyInCollections(this.pdfViewer.selectedItems.annotations[0], 'startArrow');
        this.modifyInCollections(this.pdfViewer.selectedItems.annotations[0], 'endArrow');
        // eslint-disable-next-line max-len
        if (this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'Distance') {
            this.modifyInCollections(this.pdfViewer.selectedItems.annotations[0], 'leaderLength');
        }
        // eslint-disable-next-line max-len
        this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'Line properties change', '', clonedObject, redoClonedObject);
        this.renderAnnotations(currentAnnotation.pageIndex, null, null, null);
        if (!isBlazor()) {
            this.propertiesDialog.hide();
        }
    };
    Annotation.prototype.onCancelClicked = function () {
        this.propertiesDialog.hide();
    };
    Annotation.prototype.getArrowTypeFromDropDown = function (arrowType, isBlazor) {
        if (!isBlazor) {
            arrowType = arrowType.split('</div>')[0].split('">')[1];
        }
        var arrow = 'None';
        switch (arrowType) {
            case this.pdfViewer.localeObj.getConstant('None'):
                arrow = 'None';
                break;
            case this.pdfViewer.localeObj.getConstant('Open Arrow'):
                arrow = 'OpenArrow';
                break;
            case this.pdfViewer.localeObj.getConstant('Closed Arrow'):
                arrow = 'Arrow';
                break;
            case this.pdfViewer.localeObj.getConstant('Round Arrow'):
                arrow = 'Circle';
                break;
            case this.pdfViewer.localeObj.getConstant('Square Arrow'):
                arrow = 'Square';
                break;
            case this.pdfViewer.localeObj.getConstant('Diamond Arrow'):
                arrow = 'Diamond';
                break;
            case this.pdfViewer.localeObj.getConstant('Butt'):
                arrow = 'Butt';
                break;
        }
        return arrow;
    };
    /**
     * @param arrow
     * @private
     */
    Annotation.prototype.getArrowString = function (arrow) {
        var arrowType = this.pdfViewer.localeObj.getConstant('None');
        switch (arrow) {
            case 'Arrow':
                arrowType = this.pdfViewer.localeObj.getConstant('Closed');
                break;
            case 'OpenArrow':
                arrowType = this.pdfViewer.localeObj.getConstant('Open Arrow');
                break;
            case 'Circle':
                arrowType = this.pdfViewer.localeObj.getConstant('Round');
                break;
            case 'None':
            case 'Square':
            case 'Diamond':
                arrowType = this.pdfViewer.localeObj.getConstant(arrow);
                break;
            case 'Butt':
                arrowType = this.pdfViewer.localeObj.getConstant('Butt');
                break;
        }
        return arrowType;
    };
    /**
     * @private
     */
    Annotation.prototype.onAnnotationMouseUp = function () {
        if (this.pdfViewer.selectedItems.annotations.length !== 0) {
            if (this.pdfViewer.toolbar && this.pdfViewer.toolbar.annotationToolbarModule) {
                this.enableBasedOnType();
                this.pdfViewer.toolbar.annotationToolbarModule.selectAnnotationDeleteItem(true);
                if (!Browser.isDevice) {
                    this.pdfViewer.toolbar.annotationToolbarModule.updateAnnnotationPropertyItems();
                }
            }
            this.pdfViewerBase.disableTextSelectionMode();
        }
        else {
            if (this.pdfViewer.textSelectionModule && !this.pdfViewerBase.isPanMode && !this.pdfViewer.designerMode) {
                this.pdfViewer.textSelectionModule.enableTextSelectionMode();
            }
            // eslint-disable-next-line max-len
            if (this.pdfViewer.toolbar && this.pdfViewer.toolbar.annotationToolbarModule && (!Browser.isDevice || this.pdfViewer.enableDesktopMode)) {
                // eslint-disable-next-line max-len
                var isSkip = this.pdfViewer.toolbar.annotationToolbarModule.inkAnnotationSelected;
                if (this.pdfViewer.annotation.freeTextAnnotationModule && !this.pdfViewer.annotation.freeTextAnnotationModule.isInuptBoxInFocus && !isSkip) {
                    this.pdfViewer.toolbar.annotationToolbarModule.enableAnnotationPropertiesTools(false);
                    this.pdfViewer.toolbar.annotationToolbarModule.enableFreeTextAnnotationPropertiesTools(false);
                }
                this.pdfViewer.toolbar.annotationToolbarModule.updateAnnnotationPropertyItems();
                this.pdfViewer.toolbar.annotationToolbarModule.selectAnnotationDeleteItem(false);
            }
        }
    };
    /**
     * @param pdfAnnotationBase
     * @param event
     * @param pdfAnnotationBase
     * @param event
     * @private
     */
    // eslint-disable-next-line
    Annotation.prototype.onShapesMouseup = function (pdfAnnotationBase, event) {
        // eslint-disable-next-line max-len
        pdfAnnotationBase = !isNullOrUndefined(this.pdfViewer.selectedItems.annotations[0]) ? this.pdfViewer.selectedItems.annotations[0] : pdfAnnotationBase;
        if (pdfAnnotationBase) {
            if (this.textMarkupAnnotationModule && this.textMarkupAnnotationModule.currentTextMarkupAnnotation) {
                this.textMarkupAnnotationModule.currentTextMarkupAnnotation = null;
                this.textMarkupAnnotationModule.selectTextMarkupCurrentPage = null;
            }
            // eslint-disable-next-line max-len
            if ((this.pdfViewerBase.tool instanceof NodeDrawingTool || this.pdfViewerBase.tool instanceof LineTool) && !this.pdfViewerBase.tool.dragging) {
                // eslint-disable-next-line
                var setting = {
                    opacity: pdfAnnotationBase.opacity, fillColor: pdfAnnotationBase.fillColor, strokeColor: pdfAnnotationBase.strokeColor,
                    thickness: pdfAnnotationBase.thickness, author: pdfAnnotationBase.author, subject: pdfAnnotationBase.subject,
                    modifiedDate: pdfAnnotationBase.modifiedDate
                };
                var index = this.getAnnotationIndex(pdfAnnotationBase.pageIndex, pdfAnnotationBase.id);
                // eslint-disable-next-line
                var bounds = { left: pdfAnnotationBase.bounds.x, top: pdfAnnotationBase.bounds.y, width: pdfAnnotationBase.bounds.width, height: pdfAnnotationBase.bounds.height };
                if (this.pdfViewerBase.tool instanceof LineTool) {
                    setting.lineHeadStartStyle = this.getArrowString(pdfAnnotationBase.sourceDecoraterShapes);
                    setting.lineHeadEndStyle = this.getArrowString(pdfAnnotationBase.taregetDecoraterShapes);
                    setting.borderDashArray = pdfAnnotationBase.borderDashArray;
                }
                if (!this.pdfViewerBase.isAnnotationAdded || pdfAnnotationBase.measureType === 'Distance') {
                    if (pdfAnnotationBase.measureType === '' || isNullOrUndefined(pdfAnnotationBase.measureType)) {
                        // eslint-disable-next-line max-len
                        this.shapeAnnotationModule.renderShapeAnnotations(pdfAnnotationBase, this.pdfViewer.annotation.getEventPageNumber(event));
                    }
                    else if (pdfAnnotationBase.measureType === 'Distance' || pdfAnnotationBase.measureType === 'Perimeter' ||
                        pdfAnnotationBase.measureType === 'Radius') {
                        // eslint-disable-next-line max-len
                        this.measureAnnotationModule.renderMeasureShapeAnnotations(pdfAnnotationBase, this.pdfViewer.annotation.getEventPageNumber(event));
                    }
                }
                this.pdfViewerBase.updateDocumentEditedProperty(true);
            }
            else if (this.pdfViewerBase.tool instanceof MoveTool || this.pdfViewerBase.tool instanceof ResizeTool) {
                this.pdfViewerBase.updateDocumentEditedProperty(true);
                if (pdfAnnotationBase.measureType === '' || isNullOrUndefined(pdfAnnotationBase.measureType)) {
                    if (pdfAnnotationBase.shapeAnnotationType === 'FreeText') {
                        // eslint-disable-next-line max-len
                        this.pdfViewer.annotation.freeTextAnnotationModule.modifyInCollection('bounds', this.pdfViewer.annotation.getEventPageNumber(event), pdfAnnotationBase);
                    }
                    else if (pdfAnnotationBase.shapeAnnotationType === 'HandWrittenSignature' || pdfAnnotationBase.shapeAnnotationType === 'SignatureImage' || pdfAnnotationBase.shapeAnnotationType === 'SignatureText') {
                        // eslint-disable-next-line max-len
                        this.pdfViewerBase.signatureModule.modifySignatureCollection('bounds', this.pdfViewer.annotation.getEventPageNumber(event), pdfAnnotationBase);
                    }
                    else if (pdfAnnotationBase.shapeAnnotationType === 'Ink') {
                        // eslint-disable-next-line max-len
                        this.inkAnnotationModule.modifySignatureInkCollection('bounds', this.pdfViewer.annotation.getEventPageNumber(event), pdfAnnotationBase);
                    }
                    else if (pdfAnnotationBase.shapeAnnotationType === 'Stamp' || pdfAnnotationBase.shapeAnnotationType === 'Image') {
                        // eslint-disable-next-line max-len
                        this.stampAnnotationModule.modifyInCollection('bounds', this.pdfViewer.annotation.getEventPageNumber(event), pdfAnnotationBase);
                    }
                    else {
                        // eslint-disable-next-line max-len
                        this.pdfViewer.annotation.shapeAnnotationModule.modifyInCollection('bounds', this.pdfViewer.annotation.getEventPageNumber(event), pdfAnnotationBase);
                    }
                    // eslint-disable-next-line max-len
                }
                else if (pdfAnnotationBase.measureType === 'Distance' || pdfAnnotationBase.measureType === 'Perimeter' || pdfAnnotationBase.measureType === 'Radius' || pdfAnnotationBase.measureType === 'Area' || pdfAnnotationBase.measureType === 'Volume') {
                    this.pdfViewer.annotation.measureAnnotationModule.modifyInCollection('bounds', this.pdfViewer.annotation.getEventPageNumber(event), pdfAnnotationBase);
                }
                if (this.pdfViewerBase.tool instanceof ResizeTool) {
                    if (!pdfAnnotationBase.formFieldAnnotationType) {
                        this.triggerAnnotationResize(pdfAnnotationBase);
                    }
                }
                if (this.pdfViewerBase.tool instanceof MoveTool) {
                    if (this.pdfViewerBase.action !== 'Select') {
                        if (!pdfAnnotationBase.formFieldAnnotationType) {
                            this.triggerAnnotationMove(pdfAnnotationBase);
                        }
                    }
                }
            }
            else if (this.pdfViewerBase.tool instanceof ConnectTool) {
                this.pdfViewerBase.updateDocumentEditedProperty(true);
                if (pdfAnnotationBase.measureType === '' || isNullOrUndefined(pdfAnnotationBase.measureType)) {
                    // eslint-disable-next-line max-len
                    if ((pdfAnnotationBase.shapeAnnotationType === 'Line' || pdfAnnotationBase.shapeAnnotationType === 'LineWidthArrowHead' || pdfAnnotationBase.shapeAnnotationType === 'Polygon')) {
                        this.pdfViewer.annotation.shapeAnnotationModule.modifyInCollection('bounds', this.pdfViewer.annotation.getEventPageNumber(event), pdfAnnotationBase);
                    }
                    // eslint-disable-next-line max-len
                }
                else if (pdfAnnotationBase.measureType === 'Distance' || pdfAnnotationBase.measureType === 'Perimeter' || pdfAnnotationBase.measureType === 'Area' || pdfAnnotationBase.measureType === 'Volume') {
                    if (pdfAnnotationBase.measureType === 'Distance') {
                        // eslint-disable-next-line max-len
                        this.pdfViewer.annotation.measureAnnotationModule.modifyInCollection('leaderLength', this.pdfViewer.annotation.getEventPageNumber(event), pdfAnnotationBase);
                    }
                    // eslint-disable-next-line max-len
                    this.pdfViewer.annotation.measureAnnotationModule.modifyInCollection('bounds', this.pdfViewer.annotation.getEventPageNumber(event), pdfAnnotationBase);
                }
                this.triggerAnnotationResize(pdfAnnotationBase);
            }
            // eslint-disable-next-line max-len
            if (this.pdfViewerBase.navigationPane && this.pdfViewerBase.navigationPane.annotationMenuObj && this.pdfViewer.isSignatureEditable && (pdfAnnotationBase.shapeAnnotationType === 'HandWrittenSignature' || pdfAnnotationBase.shapeAnnotationType === 'SignatureText' || pdfAnnotationBase.shapeAnnotationType === 'SignatureImage')) {
                // eslint-disable-next-line max-len
                this.pdfViewerBase.navigationPane.annotationMenuObj.enableItems([this.pdfViewer.localeObj.getConstant('Export Annotations')], true);
                // eslint-disable-next-line max-len
                this.pdfViewerBase.navigationPane.annotationMenuObj.enableItems([this.pdfViewer.localeObj.getConstant('Export XFDF')], true);
            }
            if (this.pdfViewer.toolbarModule) {
                if (this.pdfViewer.toolbarModule.annotationToolbarModule && this.pdfViewer.enableAnnotationToolbar) {
                    this.pdfViewer.toolbarModule.annotationToolbarModule.clearTextMarkupMode();
                    if (pdfAnnotationBase.measureType === '' || isNullOrUndefined(pdfAnnotationBase.measureType)) {
                        // eslint-disable-next-line max-len
                        this.pdfViewer.toolbarModule.annotationToolbarModule.clearMeasureMode();
                    }
                    else if (pdfAnnotationBase.measureType === 'Distance' || pdfAnnotationBase.measureType === 'Perimeter' || pdfAnnotationBase.measureType === 'Area' || pdfAnnotationBase.measureType === 'Volume' || pdfAnnotationBase.measureType === 'Radius') {
                        this.pdfViewer.toolbarModule.annotationToolbarModule.clearShapeMode();
                    }
                    if (this.pdfViewer.selectedItems.annotations.length === 1 && this.pdfViewer.selectedItems.annotations[0].formFieldAnnotationType === null) {
                        this.pdfViewer.toolbarModule.annotationToolbarModule.enableAnnotationPropertiesTools(true);
                    }
                    if (!isBlazor()) {
                        if (this.pdfViewer.selectedItems.annotations.length === 1 && !this.pdfViewer.designerMode) {
                            this.pdfViewer.toolbarModule.annotationToolbarModule.selectAnnotationDeleteItem(true);
                            this.pdfViewer.toolbarModule.annotationToolbarModule.setCurrentColorInPicker();
                            this.pdfViewer.toolbarModule.annotationToolbarModule.isToolbarHidden = true;
                            // eslint-disable-next-line max-len
                            if (!this.pdfViewer.formDesignerModule && pdfAnnotationBase.properties.id != '' && pdfAnnotationBase.properties.id != null && pdfAnnotationBase.properties.id.slice(0, 4) != 'sign') {
                                var id = document.getElementById(pdfAnnotationBase.properties.id);
                                var isFieldReadOnly = id && id.disabled;
                                if (!isFieldReadOnly) {
                                    this.pdfViewer.toolbarModule.annotationToolbarModule.showAnnotationToolbar(this.pdfViewer.toolbarModule.annotationItem);
                                }
                                else if (this.pdfViewer.annotation && isFieldReadOnly) {
                                    this.pdfViewer.annotation.clearSelection();
                                }
                            }
                            else {
                                this.pdfViewer.toolbarModule.annotationToolbarModule.showAnnotationToolbar(this.pdfViewer.toolbarModule.annotationItem);
                            }
                            if (this.pdfViewer.isAnnotationToolbarVisible && this.pdfViewer.isFormDesignerToolbarVisible) {
                                var formDesignerMainDiv = document.getElementById(this.pdfViewer.element.id + "_formdesigner_toolbar");
                                formDesignerMainDiv.style.display = "none";
                                if (this.pdfViewer.toolbarModule) {
                                    this.pdfViewer.toolbarModule.formDesignerToolbarModule.isToolbarHidden = false;
                                    this.pdfViewer.toolbarModule.formDesignerToolbarModule.showFormDesignerToolbar(this.pdfViewer.toolbarModule.formDesignerItem);
                                    this.pdfViewer.toolbarModule.annotationToolbarModule.adjustViewer(true);
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    /**
     * @param pdfAnnotationBase
     * @param isNewlyAdded
     * @param pdfAnnotationBase
     * @param isNewlyAdded
     * @private
     */
    Annotation.prototype.updateCalibrateValues = function (pdfAnnotationBase, isNewlyAdded) {
        if (pdfAnnotationBase.measureType === 'Distance') {
            pdfAnnotationBase.notes = updateDistanceLabel(pdfAnnotationBase, pdfAnnotationBase.vertexPoints, this.measureAnnotationModule);
            if (pdfAnnotationBase.enableShapeLabel === true) {
                pdfAnnotationBase.labelContent = pdfAnnotationBase.notes;
            }
            // eslint-disable-next-line max-len
            this.pdfViewer.annotation.measureAnnotationModule.modifyInCollection('notes', pdfAnnotationBase.pageIndex, pdfAnnotationBase, isNewlyAdded);
            this.pdfViewer.annotation.stickyNotesAnnotationModule.addTextToComments(pdfAnnotationBase.annotName, pdfAnnotationBase.notes);
            this.renderAnnotations(pdfAnnotationBase.pageIndex, null, null, null, null);
        }
        else if (pdfAnnotationBase.measureType === 'Radius') {
            pdfAnnotationBase.notes = updateRadiusLabel(pdfAnnotationBase, this.measureAnnotationModule);
            if (pdfAnnotationBase.enableShapeLabel === true) {
                pdfAnnotationBase.labelContent = pdfAnnotationBase.notes;
            }
            // eslint-disable-next-line max-len
            this.pdfViewer.annotation.measureAnnotationModule.modifyInCollection('notes', pdfAnnotationBase.pageIndex, pdfAnnotationBase, isNewlyAdded);
            this.pdfViewer.annotation.stickyNotesAnnotationModule.addTextToComments(pdfAnnotationBase.annotName, pdfAnnotationBase.notes);
            this.renderAnnotations(pdfAnnotationBase.pageIndex, null, null, null, null);
        }
        else if (pdfAnnotationBase.measureType === 'Perimeter') {
            pdfAnnotationBase.notes = updatePerimeterLabel(pdfAnnotationBase, pdfAnnotationBase.vertexPoints, this.measureAnnotationModule);
            if (pdfAnnotationBase.enableShapeLabel === true) {
                pdfAnnotationBase.labelContent = pdfAnnotationBase.notes;
            }
            // eslint-disable-next-line max-len
            this.pdfViewer.annotation.measureAnnotationModule.modifyInCollection('notes', pdfAnnotationBase.pageIndex, pdfAnnotationBase, isNewlyAdded);
            this.pdfViewer.annotation.stickyNotesAnnotationModule.addTextToComments(pdfAnnotationBase.annotName, pdfAnnotationBase.notes);
            this.renderAnnotations(pdfAnnotationBase.pageIndex, null, null, null, null);
        }
        else if (pdfAnnotationBase.measureType === 'Area') {
            // eslint-disable-next-line max-len
            pdfAnnotationBase.notes = this.measureAnnotationModule.calculateArea(pdfAnnotationBase.vertexPoints, pdfAnnotationBase.id, pdfAnnotationBase.pageIndex);
            if (pdfAnnotationBase.enableShapeLabel === true) {
                pdfAnnotationBase.labelContent = pdfAnnotationBase.notes;
                updateCalibrateLabel(pdfAnnotationBase);
            }
            // eslint-disable-next-line max-len
            this.pdfViewer.annotation.measureAnnotationModule.modifyInCollection('notes', pdfAnnotationBase.pageIndex, pdfAnnotationBase, isNewlyAdded);
            this.pdfViewer.annotation.stickyNotesAnnotationModule.addTextToComments(pdfAnnotationBase.annotName, pdfAnnotationBase.notes);
            this.renderAnnotations(pdfAnnotationBase.pageIndex, null, null, null, null);
        }
        else if (pdfAnnotationBase.measureType === 'Volume') {
            // eslint-disable-next-line max-len
            pdfAnnotationBase.notes = this.measureAnnotationModule.calculateVolume(pdfAnnotationBase.vertexPoints, pdfAnnotationBase.id, pdfAnnotationBase.pageIndex);
            if (pdfAnnotationBase.enableShapeLabel === true) {
                pdfAnnotationBase.labelContent = pdfAnnotationBase.notes;
                updateCalibrateLabel(pdfAnnotationBase);
            }
            // eslint-disable-next-line max-len
            this.pdfViewer.annotation.measureAnnotationModule.modifyInCollection('notes', pdfAnnotationBase.pageIndex, pdfAnnotationBase, isNewlyAdded);
            this.pdfViewer.annotation.stickyNotesAnnotationModule.addTextToComments(pdfAnnotationBase.annotName, pdfAnnotationBase.notes);
            this.renderAnnotations(pdfAnnotationBase.pageIndex, null, null, null, null);
        }
    };
    /**
     * @private
     */
    Annotation.prototype.onAnnotationMouseDown = function () {
        if (this.pdfViewer.selectedItems.annotations.length === 1 && this.pdfViewer.selectedItems.annotations[0].formFieldAnnotationType === null) {
            if (this.pdfViewer.toolbar && this.pdfViewer.toolbar.annotationToolbarModule) {
                if (!isBlazor() && Browser.isDevice && !this.pdfViewer.enableDesktopMode) {
                    var commentPanel = document.getElementById(this.pdfViewer.element.id + '_commantPanel');
                    if (commentPanel.style.display === 'none') {
                        if (this.pdfViewer.enableToolbar && this.pdfViewer.enableAnnotationToolbar && this.pdfViewer.annotationModule.textMarkupAnnotationModule.currentTextMarkupAnnotation) {
                            // eslint-disable-next-line max-len
                            this.pdfViewer.toolbarModule.annotationToolbarModule.createPropertyTools("");
                        }
                        else {
                            if (this.pdfViewer.enableToolbar && this.pdfViewer.enableAnnotationToolbar) {
                                // eslint-disable-next-line max-len
                                this.pdfViewer.toolbarModule.annotationToolbarModule.createAnnotationToolbarForMobile();
                                this.pdfViewer.toolbarModule.annotationToolbarModule.createPropertyTools(this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType);
                                var editIcon = document.getElementById(this.pdfViewer.element.id + '_annotationIcon');
                                if (editIcon && !editIcon.parentElement.classList.contains('e-pv-select')) {
                                    editIcon.parentElement.classList.add('e-pv-select');
                                }
                            }
                        }
                    }
                }
                this.enableBasedOnType();
                this.pdfViewer.toolbar.annotationToolbarModule.selectAnnotationDeleteItem(true);
            }
        }
    };
    Annotation.prototype.enableBasedOnType = function () {
        var isLock = false;
        // eslint-disable-next-line
        var annotation = this.pdfViewer.selectedItems.annotations[0];
        if (annotation && annotation.annotationSettings) {
            // eslint-disable-next-line
            isLock = annotation.annotationSettings.isLock;
            if (isLock && this.checkAllowedInteractions('PropertyChange', annotation)) {
                isLock = false;
            }
        }
        if (!Browser.isDevice || this.pdfViewer.enableDesktopMode) {
            if (!isLock) {
                if (this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'Stamp' ||
                    this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'Image') {
                    this.pdfViewer.toolbar.annotationToolbarModule.enableStampAnnotationPropertiesTools(true);
                }
                else if (this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'StickyNotes') {
                    this.pdfViewer.toolbar.annotationToolbarModule.enableStampAnnotationPropertiesTools(true);
                }
                else if (this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'Path' ||
                    this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'SignatureImage' ||
                    this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'SignatureText') {
                    this.pdfViewer.toolbar.annotationToolbarModule.enableAnnotationPropertiesTools(false);
                }
                else if (this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'FreeText') {
                    this.pdfViewer.toolbar.annotationToolbarModule.enableFreeTextAnnotationPropertiesTools(true);
                }
                else if (this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'HandWrittenSignature') {
                    this.pdfViewer.toolbar.annotationToolbarModule.enableSignaturePropertiesTools(true);
                }
                else if (this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'Ink') {
                    this.pdfViewer.toolbar.annotationToolbarModule.enableSignaturePropertiesTools(true);
                }
                else {
                    if (this.pdfViewer.selectedItems.annotations.length === 1 && this.pdfViewer.selectedItems.annotations[0].formFieldAnnotationType === null) {
                        this.pdfViewer.toolbar.annotationToolbarModule.enableAnnotationPropertiesTools(true);
                    }
                }
            }
            // eslint-disable-next-line max-len
        }
        else if (!this.pdfViewer.annotationModule.textMarkupAnnotationModule.currentTextMarkupAnnotation && !(this.pdfViewer.selectedItems.annotations[0].propName === 'annotations') && (Browser.isDevice && !this.pdfViewer.enableDesktopMode)) {
            this.pdfViewer.toolbarModule.annotationToolbarModule.createMobileAnnotationToolbar(true, true);
        }
    };
    Annotation.prototype.getProperDate = function (date) {
        var dateObject = new Date(date.toString());
        if (isNaN(dateObject.getFullYear())) {
            var dateString = date.slice(2, 16);
            // eslint-disable-next-line max-len
            dateString = dateString.slice(0, 4) + '/' + dateString.slice(4, 6) + '/' + dateString.slice(6, 8) + ' ' + dateString.slice(8, 10) + ':' + dateString.slice(10, 12) + ':' + dateString.slice(12, 14);
            dateObject = new Date(dateString);
        }
        // eslint-disable-next-line max-len
        return (dateObject.getMonth() + 1) + '/' + dateObject.getDate() + '/' + dateObject.getFullYear() + ' ' + dateObject.getHours() + ':' + dateObject.getMinutes() + ':' + dateObject.getSeconds();
    };
    /**
     * @param pageAnnotations
     * @param pageNumber
     * @private
     */
    Annotation.prototype.getPageCollection = function (pageAnnotations, pageNumber) {
        var index = null;
        for (var i = 0; i < pageAnnotations.length; i++) {
            if (pageAnnotations[i].pageIndex === pageNumber) {
                index = i;
                break;
            }
        }
        return index;
    };
    /**
     * @param annotations
     * @param id
     * @param annotations
     * @param id
     * @private
     */
    // eslint-disable-next-line
    Annotation.prototype.getAnnotationWithId = function (annotations, id) {
        // eslint-disable-next-line
        var annotation;
        for (var i = 0; i < annotations.length; i++) {
            if (id === annotations[i].id) {
                annotation = annotations[i];
            }
        }
        return annotation;
    };
    /**
     * @param event
     * @private
     */
    // eslint-disable-next-line
    Annotation.prototype.getEventPageNumber = function (event) {
        var eventTarget = event.target;
        var eventParentElement = event.target.parentElement;
        if (eventTarget.classList.contains('e-pv-hyperlink')) {
            eventTarget = eventParentElement;
        }
        else if (eventParentElement && eventParentElement.classList.contains('foreign-object') && eventParentElement.parentElement && eventParentElement.parentElement.parentElement && eventParentElement.parentElement.parentElement.parentElement) {
            eventTarget = eventParentElement.parentElement.parentElement.parentElement;
        }
        else if (eventTarget.classList.contains('e-pdfviewer-formFields')) {
            eventTarget = eventParentElement;
        }
        var pageString;
        if (eventTarget) {
            // eslint-disable-next-line
            pageString = eventTarget.id.split('_text_')[1] || eventTarget.id.split('_textLayer_')[1] || eventTarget.id.split('_annotationCanvas_')[1] || eventTarget.id.split('_pageDiv_')[1];
        }
        if (isNaN(pageString)) {
            event = this.pdfViewerBase.annotationEvent;
            if (event) {
                eventTarget = event.target;
                // eslint-disable-next-line
                pageString = eventTarget.id.split('_text_')[1] || eventTarget.id.split('_textLayer_')[1] || eventTarget.id.split('_annotationCanvas_')[1] || eventTarget.id.split('_pageDiv_')[1];
            }
        }
        // eslint-disable-next-line
        return parseInt(pageString);
    };
    /**
     * @param commentsAnnotations
     * @param parentAnnotation
     * @param author
     * @param commentsAnnotations
     * @param parentAnnotation
     * @param author
     * @param commentsAnnotations
     * @param parentAnnotation
     * @param author
     * @private
     */
    // eslint-disable-next-line
    Annotation.prototype.getAnnotationComments = function (commentsAnnotations, parentAnnotation, author) {
        var newArray = [];
        var annotationObject = null;
        if (commentsAnnotations) {
            if (commentsAnnotations.length > 0) {
                for (var i = 0; i < commentsAnnotations.length; i++) {
                    // eslint-disable-next-line
                    var annotation = commentsAnnotations[i];
                    annotationObject = {
                        // eslint-disable-next-line max-len
                        shapeAnnotationType: 'sticky', author: annotation.Author, modifiedDate: annotation.ModifiedDate, note: annotation.Note, state: annotation.state, stateModel: annotation.stateModel,
                        comments: [], review: { state: annotation.State, stateModel: annotation.StateModel, modifiedDate: annotation.ModifiedDate, author: annotation.Author },
                        annotName: annotation.AnnotName, parentId: parentAnnotation.AnnotName, subject: 'Comments',
                        isLock: annotation.IsLock
                    };
                    newArray[newArray.length] = annotationObject;
                }
            }
        }
        return newArray;
    };
    Annotation.prototype.getRandomNumber = function () {
        // eslint-disable-next-line
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            // eslint-disable-next-line
            var random = Math.random() * 16 | 0, v = c == 'x' ? random : (random & 0x3 | 0x8);
            return random.toString(16);
        });
    };
    /**
     * @private
     */
    Annotation.prototype.createGUID = function () {
        // eslint-disable-next-line max-len
        return this.getRandomNumber();
    };
    /**
     * @param pageDiv
     * @param pageWidth
     * @param pageHeight
     * @param pageNumber
     * @param displayMode
     * @param pageDiv
     * @param pageWidth
     * @param pageHeight
     * @param pageNumber
     * @param displayMode
     * @private
     */
    // eslint-disable-next-line max-len
    Annotation.prototype.createAnnotationLayer = function (pageDiv, pageWidth, pageHeight, pageNumber, displayMode) {
        var canvas = this.pdfViewerBase.getElement('_annotationCanvas_' + pageNumber);
        if (canvas) {
            this.updateCanvas(canvas, pageWidth, pageHeight, pageNumber);
            return canvas;
        }
        else {
            // eslint-disable-next-line max-len
            var annotationCanvas = createElement('canvas', { id: this.pdfViewer.element.id + '_annotationCanvas_' + pageNumber, className: 'e-pv-annotation-canvas' });
            this.updateCanvas(annotationCanvas, pageWidth, pageHeight, pageNumber);
            pageDiv.appendChild(annotationCanvas);
            return annotationCanvas;
        }
    };
    /**
     * @param width
     * @param height
     * @param pageNumber
     * @private
     */
    Annotation.prototype.resizeAnnotations = function (width, height, pageNumber) {
        var canvas = this.pdfViewerBase.getElement('_annotationCanvas_' + pageNumber);
        if (canvas) {
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            this.pdfViewerBase.applyElementStyles(canvas, pageNumber);
        }
    };
    /**
     * @param pageNumber
     * @private
     */
    Annotation.prototype.clearAnnotationCanvas = function (pageNumber) {
        var canvas = this.pdfViewerBase.getElement('_annotationCanvas_' + pageNumber);
        var zoom = this.pdfViewerBase.getZoomFactor();
        var ratio = this.pdfViewerBase.getZoomRatio(zoom);
        if (canvas) {
            var width = this.pdfViewerBase.pageSize[pageNumber].width;
            var height = this.pdfViewerBase.pageSize[pageNumber].height;
            canvas.width = width * ratio;
            canvas.height = height * ratio;
            canvas.style.width = width * zoom + 'px';
            canvas.style.height = height * zoom + 'px';
        }
    };
    /**
     * @param pageNumber
     * @param shapeAnnotation
     * @param measureShapeAnnotation
     * @param textMarkupAnnotation
     * @param canvas
     * @param isImportAnnotations
     * @param pageNumber
     * @param shapeAnnotation
     * @param measureShapeAnnotation
     * @param textMarkupAnnotation
     * @param canvas
     * @param isImportAnnotations
     * @param pageNumber
     * @param shapeAnnotation
     * @param measureShapeAnnotation
     * @param textMarkupAnnotation
     * @param canvas
     * @param isImportAnnotations
     * @private
     */
    // eslint-disable-next-line
    Annotation.prototype.renderAnnotations = function (pageNumber, shapeAnnotation, measureShapeAnnotation, textMarkupAnnotation, canvas, isImportAnnotations, isAnnotOrderAction, freeTextAnnotation) {
        this.clearAnnotationCanvas(pageNumber);
        if (this.shapeAnnotationModule) {
            if (isImportAnnotations) {
                this.shapeAnnotationModule.renderShapeAnnotations(shapeAnnotation, pageNumber, true);
            }
            else {
                this.shapeAnnotationModule.renderShapeAnnotations(shapeAnnotation, pageNumber, null, isAnnotOrderAction);
            }
        }
        if (this.measureAnnotationModule) {
            if (isImportAnnotations) {
                this.measureAnnotationModule.renderMeasureShapeAnnotations(measureShapeAnnotation, pageNumber, true);
            }
            else {
                this.measureAnnotationModule.renderMeasureShapeAnnotations(measureShapeAnnotation, pageNumber, null, isAnnotOrderAction);
            }
        }
        if (this.freeTextAnnotationModule) {
            if (isImportAnnotations) {
                this.freeTextAnnotationModule.renderFreeTextAnnotations(freeTextAnnotation, pageNumber, true);
            }
            else {
                this.freeTextAnnotationModule.renderFreeTextAnnotations(freeTextAnnotation, pageNumber, null, isAnnotOrderAction);
            }
        }
        if (canvas !== null && canvas !== undefined) {
            canvas = canvas;
        }
        else {
            canvas = this.pdfViewerBase.getElement('_annotationCanvas_' + pageNumber);
        }
        this.pdfViewer.drawing.refreshCanvasDiagramLayer(canvas, pageNumber);
        if (!this.pdfViewerBase.isInkAdded && this.pdfViewer.tool === 'Ink' && this.pdfViewer.currentPageNumber - 1 === pageNumber) {
            var currentcanvas = document.getElementById(this.pdfViewer.element.id + '_annotationCanvas_' + (this.pdfViewer.currentPageNumber - 1));
            var zoom = this.pdfViewerBase.getZoomFactor();
            var ratio = this.pdfViewerBase.getWindowDevicePixelRatio();
            var context = currentcanvas.getContext('2d');
            var thickness = this.pdfViewer.inkAnnotationSettings.thickness ? this.pdfViewer.inkAnnotationSettings.thickness : 1;
            var opacity = this.pdfViewer.inkAnnotationSettings.opacity ? this.pdfViewer.inkAnnotationSettings.opacity : 1;
            var strokeColor = this.pdfViewer.inkAnnotationSettings.strokeColor ? this.pdfViewer.inkAnnotationSettings.strokeColor : '#ff0000';
            if (!Browser.isDevice || (Browser.isDevice && zoom <= 0.7)) {
                context.setTransform(ratio, 0, 0, ratio, 0, 0);
            }
            context.beginPath();
            context.lineJoin = 'round';
            context.lineCap = 'round';
            context.lineWidth = thickness * zoom > 1 ? thickness * zoom : thickness;
            context.strokeStyle = strokeColor;
            context.globalAlpha = opacity;
            var collectionData = processPathData(this.pdfViewer.annotationModule.inkAnnotationModule.updateInkDataWithZoom());
            var csData = splitArrayCollection(collectionData);
            for (var j = 0; j < csData.length; j++) {
                var pathValue = csData[j];
                switch (pathValue.command) {
                    case 'M':
                        context.moveTo(pathValue.x, pathValue.y);
                        break;
                    case 'L':
                        context.lineTo(pathValue.x, pathValue.y);
                        break;
                    default:
                        break;
                }
            }
            context.stroke();
            context.closePath();
            if (!isNullOrUndefined(this.pdfViewer.toolbarModule) && !isNullOrUndefined(this.pdfViewer.toolbarModule.annotationToolbarModule)) {
                this.pdfViewer.toolbar.annotationToolbarModule.inkAnnotationSelected = true;
            }
        }
        if (this.textMarkupAnnotationModule) {
            if (isImportAnnotations) {
                // eslint-disable-next-line
                this.textMarkupAnnotationModule.renderTextMarkupAnnotationsInPage(textMarkupAnnotation, pageNumber, true);
            }
            else {
                // eslint-disable-next-line
                this.textMarkupAnnotationModule.renderTextMarkupAnnotationsInPage(textMarkupAnnotation, pageNumber);
            }
        }
    };
    /**
     * @param pageNumber
     * @param annotation
     * @param annotationId
     * @param pageNumber
     * @param annotation
     * @param annotationId
     * @param pageNumber
     * @param annotation
     * @param annotationId
     * @private
     */
    // eslint-disable-next-line
    Annotation.prototype.storeAnnotations = function (pageNumber, annotation, annotationId) {
        // let annotationId: string = '_annotations_textMarkup';
        // if (annotation is ITextMarkupAnnotation) {
        //     annotationId = '_annotations_textMarkup';
        // } else if (annotation as IShapeAnnotation) {
        //     annotationId = '_annotations_shape';
        // } else {
        //     annotationId = '_annotations_stamp';
        // }
        // eslint-disable-next-line
        var sessionSize = Math.round(JSON.stringify(window.sessionStorage).length / 1024);
        if (sessionSize > 4500) {
            this.clearAnnotationStorage();
            this.pdfViewerBase.isStorageExceed = true;
            if (!(this.pdfViewerBase.isFormStorageExceed)) {
                this.pdfViewer.formFieldsModule.clearFormFieldStorage();
            }
        }
        // eslint-disable-next-line
        var storeObject = window.sessionStorage.getItem(this.pdfViewerBase.documentId + annotationId);
        if (this.pdfViewerBase.isStorageExceed) {
            storeObject = this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + annotationId];
        }
        var index = 0;
        if (!storeObject) {
            this.storeAnnotationCollections(annotation, pageNumber);
            var pageAnnotation = { pageIndex: pageNumber, annotations: [] };
            pageAnnotation.annotations.push(annotation);
            index = pageAnnotation.annotations.indexOf(annotation);
            var annotationCollection = [];
            annotationCollection.push(pageAnnotation);
            var annotationStringified = JSON.stringify(annotationCollection);
            if (this.pdfViewerBase.isStorageExceed) {
                this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + annotationId] = annotationStringified;
            }
            else {
                window.sessionStorage.setItem(this.pdfViewerBase.documentId + annotationId, annotationStringified);
            }
        }
        else {
            this.storeAnnotationCollections(annotation, pageNumber);
            var annotObject_1 = JSON.parse(storeObject);
            if (!this.pdfViewerBase.isStorageExceed) {
                window.sessionStorage.removeItem(this.pdfViewerBase.documentId + annotationId);
            }
            var pageIndex_1 = this.pdfViewer.annotationModule.getPageCollection(annotObject_1, pageNumber);
            if (annotObject_1[pageIndex_1]) {
                annotObject_1[pageIndex_1].annotations.filter(function (item, index) {
                    if (item.annotName === annotation.annotName) {
                        annotObject_1[pageIndex_1].annotations.splice(index, 1);
                    }
                });
                annotObject_1[pageIndex_1].annotations.push(annotation);
                index = annotObject_1[pageIndex_1].annotations.indexOf(annotation);
            }
            else {
                var markupAnnotation = { pageIndex: pageNumber, annotations: [] };
                markupAnnotation.annotations.push(annotation);
                index = markupAnnotation.annotations.indexOf(annotation);
                annotObject_1.push(markupAnnotation);
            }
            var annotationStringified = JSON.stringify(annotObject_1);
            if (this.pdfViewerBase.isStorageExceed) {
                this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + annotationId] = annotationStringified;
            }
            else {
                window.sessionStorage.setItem(this.pdfViewerBase.documentId + annotationId, annotationStringified);
            }
        }
        return index;
    };
    /**
     * @param type
     * @private
     */
    Annotation.prototype.getArrowType = function (type) {
        var decoratorShapes = 'None';
        switch (type) {
            case 'ClosedArrow':
            case 'Closed':
                decoratorShapes = 'Arrow';
                break;
            case 'OpenArrow':
            case 'Open':
                decoratorShapes = 'OpenArrow';
                break;
            case 'Square':
                decoratorShapes = 'Square';
                break;
            case 'Circle':
            case 'Round':
                decoratorShapes = 'Circle';
                break;
            case 'Diamond':
                decoratorShapes = 'Diamond';
                break;
            case 'Butt':
                decoratorShapes = 'Butt';
                break;
            case 'Slash':
                // decoratorShapes = 'Slash';
                break;
        }
        return decoratorShapes;
    };
    /**
     * @param arrow
     * @private
     */
    Annotation.prototype.getArrowTypeForCollection = function (arrow) {
        var arrowType;
        switch (arrow) {
            case 'Arrow':
                arrowType = 'ClosedArrow';
                break;
            case 'OpenArrow':
            case 'Square':
            case 'Circle':
            case 'Diamond':
            case 'None':
                arrowType = arrow.toString();
                break;
            case 'Butt':
                arrowType = 'Butt';
                break;
        }
        return arrowType;
    };
    /**
     * @param bound
     * @param pageIndex
     * @private
     */
    // eslint-disable-next-line
    Annotation.prototype.getBounds = function (bound, pageIndex) {
        var pageDetails = this.pdfViewerBase.pageSize[pageIndex];
        if (pageDetails) {
            if (pageDetails.rotation === 1) {
                return { left: bound.top, top: pageDetails.width - (bound.left + bound.width), width: bound.height, height: bound.width };
            }
            else if (pageDetails.rotation === 2) {
                // eslint-disable-next-line max-len
                return { left: pageDetails.width - bound.left - bound.width, top: pageDetails.height - bound.top - bound.height, width: bound.width, height: bound.height };
            }
            else if (pageDetails.rotation === 3) {
                return { left: pageDetails.height - bound.top - bound.height, top: bound.left, width: bound.height, height: bound.width };
            }
            else {
                return bound;
            }
        }
        else {
            return bound;
        }
    };
    /**
     * @param bound
     * @param pageIndex
     * @private
     */
    // eslint-disable-next-line
    Annotation.prototype.getInkBounds = function (bound, pageIndex) {
        var pageDetails = this.pdfViewerBase.pageSize[pageIndex];
        if (pageDetails) {
            if (pageDetails.rotation === 1) {
                return { x: bound.y, y: pageDetails.width - (bound.x + bound.width), width: bound.height, height: bound.width };
            }
            else if (pageDetails.rotation === 2) {
                // eslint-disable-next-line max-len
                return { x: pageDetails.width - bound.x - bound.width, y: pageDetails.height - bound.y - bound.height, width: bound.width, height: bound.height };
            }
            else if (pageDetails.rotation === 3) {
                return { x: pageDetails.height - bound.y - bound.height, y: bound.x, width: bound.height, height: bound.width };
            }
            else {
                return bound;
            }
        }
        else {
            return bound;
        }
    };
    /**
     * @param points
     * @param pageIndex
     * @param points
     * @param pageIndex
     * @private
     */
    // eslint-disable-next-line
    Annotation.prototype.getVertexPoints = function (points, pageIndex) {
        if (points) {
            var pageDetails = this.pdfViewerBase.pageSize[pageIndex];
            if (pageDetails.rotation === 1) {
                var points1 = [];
                for (var i = 0; i < points.length; i++) {
                    var point = { x: points[i].y, y: pageDetails.width - points[i].x };
                    points1.push(point);
                }
                return points1;
            }
            else if (pageDetails.rotation === 2) {
                var points2 = [];
                for (var i = 0; i < points.length; i++) {
                    var point = { x: pageDetails.width - points[i].x, y: pageDetails.height - points[i].y };
                    points2.push(point);
                }
                return points2;
            }
            else if (pageDetails.rotation === 3) {
                var points3 = [];
                for (var i = 0; i < points.length; i++) {
                    var point = { x: pageDetails.height - points[i].y, y: points[i].x };
                    points3.push(point);
                }
                return points3;
            }
            else {
                return points;
            }
        }
    };
    /**
     * @param pageIndex
     * @param shapeAnnotations
     * @param idString
     * @param pageIndex
     * @param shapeAnnotations
     * @param idString
     * @private
     */
    // eslint-disable-next-line
    Annotation.prototype.getStoredAnnotations = function (pageIndex, shapeAnnotations, idString) {
        // eslint-disable-next-line
        var annotationCollection;
        // eslint-disable-next-line
        var storeObject = window.sessionStorage.getItem(this.pdfViewerBase.documentId + idString);
        if (this.pdfViewerBase.isStorageExceed) {
            storeObject = this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + idString];
        }
        if (storeObject) {
            var annotObject = JSON.parse(storeObject);
            var index = this.pdfViewer.annotationModule.getPageCollection(annotObject, pageIndex);
            if (annotObject[index]) {
                annotationCollection = annotObject[index].annotations;
            }
            else {
                annotationCollection = null;
            }
        }
        else {
            annotationCollection = null;
        }
        return annotationCollection;
    };
    /**
     * @param pdfAnnotationBase
     * @param isColor
     * @param isStroke
     * @param isThickness
     * @param isOpacity
     * @param isLineStart
     * @param isLineEnd
     * @param isDashArray
     * @param isFreeText
     * @param previousText
     * @param currentText
     * @param pdfAnnotationBase
     * @param isColor
     * @param isStroke
     * @param isThickness
     * @param isOpacity
     * @param isLineStart
     * @param isLineEnd
     * @param isDashArray
     * @param isFreeText
     * @param previousText
     * @param currentText
     * @param pdfAnnotationBase
     * @param isColor
     * @param isStroke
     * @param isThickness
     * @param isOpacity
     * @param isLineStart
     * @param isLineEnd
     * @param isDashArray
     * @param isFreeText
     * @param previousText
     * @param currentText
     * @param pdfAnnotationBase
     * @param isColor
     * @param isStroke
     * @param isThickness
     * @param isOpacity
     * @param isLineStart
     * @param isLineEnd
     * @param isDashArray
     * @param isFreeText
     * @param previousText
     * @param currentText
     * @param pdfAnnotationBase
     * @param isColor
     * @param isStroke
     * @param isThickness
     * @param isOpacity
     * @param isLineStart
     * @param isLineEnd
     * @param isDashArray
     * @param isFreeText
     * @param previousText
     * @param currentText
     * @param pdfAnnotationBase
     * @param isColor
     * @param isStroke
     * @param isThickness
     * @param isOpacity
     * @param isLineStart
     * @param isLineEnd
     * @param isDashArray
     * @param isFreeText
     * @param previousText
     * @param currentText
     * @param pdfAnnotationBase
     * @param isColor
     * @param isStroke
     * @param isThickness
     * @param isOpacity
     * @param isLineStart
     * @param isLineEnd
     * @param isDashArray
     * @param isFreeText
     * @param previousText
     * @param currentText
     * @param pdfAnnotationBase
     * @param isColor
     * @param isStroke
     * @param isThickness
     * @param isOpacity
     * @param isLineStart
     * @param isLineEnd
     * @param isDashArray
     * @param isFreeText
     * @param previousText
     * @param currentText
     * @param pdfAnnotationBase
     * @param isColor
     * @param isStroke
     * @param isThickness
     * @param isOpacity
     * @param isLineStart
     * @param isLineEnd
     * @param isDashArray
     * @param isFreeText
     * @param previousText
     * @param currentText
     * @param pdfAnnotationBase
     * @param isColor
     * @param isStroke
     * @param isThickness
     * @param isOpacity
     * @param isLineStart
     * @param isLineEnd
     * @param isDashArray
     * @param isFreeText
     * @param previousText
     * @param currentText
     * @private
     */
    // eslint-disable-next-line max-len
    Annotation.prototype.triggerAnnotationPropChange = function (pdfAnnotationBase, isColor, isStroke, isThickness, isOpacity, isLineStart, isLineEnd, isDashArray, isFreeText, previousText, currentText) {
        var index = this.getAnnotationIndex(pdfAnnotationBase.pageIndex, pdfAnnotationBase.id);
        var type = this.getAnnotationType(pdfAnnotationBase.shapeAnnotationType, pdfAnnotationBase.measureType);
        // eslint-disable-next-line max-len
        var eventArgs = { name: 'annotationPropertiesChange', pageIndex: pdfAnnotationBase.pageIndex, annotationId: pdfAnnotationBase.annotName, annotationType: type, isColorChanged: isColor, isOpacityChanged: isOpacity, isThicknessChanged: isThickness, isStrokeColorChanged: isStroke };
        if (isFreeText) {
            eventArgs.isFreeTextChanged = isFreeText;
            eventArgs.previousText = previousText;
            eventArgs.currentText = currentText;
        }
        if (isLineStart) {
            eventArgs.isLineHeadStartStyleChanged = isLineStart;
        }
        if (isLineEnd) {
            eventArgs.isLineHeadEndStyleChanged = isLineEnd;
        }
        if (isDashArray) {
            eventArgs.isBorderDashArrayChanged = isDashArray;
        }
        this.pdfViewer.trigger('annotationPropertiesChange', eventArgs);
    };
    /**
     * @param pdfAnnotationBase
     * @private
     */
    Annotation.prototype.triggerAnnotationAdd = function (pdfAnnotationBase) {
        // eslint-disable-next-line
        var setting = {
            opacity: pdfAnnotationBase.opacity, fillColor: pdfAnnotationBase.fillColor, strokeColor: pdfAnnotationBase.strokeColor,
            thickness: pdfAnnotationBase.thickness, author: pdfAnnotationBase.author, subject: pdfAnnotationBase.subject,
            modifiedDate: pdfAnnotationBase.modifiedDate
        };
        // eslint-disable-next-line
        var bounds = { left: pdfAnnotationBase.wrapper.bounds.x, top: pdfAnnotationBase.wrapper.bounds.y, width: pdfAnnotationBase.wrapper.bounds.width, height: pdfAnnotationBase.wrapper.bounds.height };
        var type = this.getAnnotationType(pdfAnnotationBase.shapeAnnotationType, pdfAnnotationBase.measureType);
        if (type === 'Line' || type === 'Arrow' || type === 'Distance' || type === 'Perimeter') {
            setting.lineHeadStartStyle = this.getArrowString(pdfAnnotationBase.sourceDecoraterShapes);
            setting.lineHeadEndStyle = this.getArrowString(pdfAnnotationBase.taregetDecoraterShapes);
            setting.borderDashArray = pdfAnnotationBase.borderDashArray;
        }
        var labelSettings;
        if (this.pdfViewer.enableShapeLabel) {
            labelSettings = {
                // eslint-disable-next-line max-len
                fontColor: pdfAnnotationBase.fontColor, fontSize: pdfAnnotationBase.fontSize, fontFamily: pdfAnnotationBase.fontFamily,
                opacity: pdfAnnotationBase.labelOpacity, labelContent: pdfAnnotationBase.labelContent, fillColor: pdfAnnotationBase.labelFillColor
            };
            // eslint-disable-next-line max-len
            this.pdfViewer.fireAnnotationAdd(pdfAnnotationBase.pageIndex, pdfAnnotationBase.annotName, type, bounds, setting, null, null, null, labelSettings);
        }
        else {
            // eslint-disable-next-line max-len
            this.pdfViewer.fireAnnotationAdd(pdfAnnotationBase.pageIndex, pdfAnnotationBase.annotName, type, bounds, setting);
        }
    };
    /**
     * @param pdfAnnotationBase
     * @private
     */
    Annotation.prototype.triggerAnnotationResize = function (pdfAnnotationBase) {
        // eslint-disable-next-line
        var setting = {
            opacity: pdfAnnotationBase.opacity, fillColor: pdfAnnotationBase.fillColor, strokeColor: pdfAnnotationBase.strokeColor,
            thickness: pdfAnnotationBase.thickness, author: pdfAnnotationBase.author, subject: pdfAnnotationBase.subject,
            modifiedDate: pdfAnnotationBase.modifiedDate
        };
        var index = this.getAnnotationIndex(pdfAnnotationBase.pageIndex, pdfAnnotationBase.id);
        // eslint-disable-next-line
        var annotationBounds = pdfAnnotationBase.bounds;
        var currentPosition = { left: annotationBounds.x, top: annotationBounds.y, x: annotationBounds.x, y: annotationBounds.y, width: annotationBounds.width, height: annotationBounds.height };
        // eslint-disable-next-line max-len
        var previousPosition = { left: annotationBounds.oldProperties.x, top: annotationBounds.oldProperties.y, width: annotationBounds.oldProperties.width, height: annotationBounds.oldProperties.height };
        var type = this.getAnnotationType(pdfAnnotationBase.shapeAnnotationType, pdfAnnotationBase.measureType);
        if (type === 'Line' || type === 'Arrow' || type === 'Distance' || type === 'Perimeter') {
            setting.lineHeadStartStyle = this.getArrowString(pdfAnnotationBase.sourceDecoraterShapes);
            setting.lineHeadEndStyle = this.getArrowString(pdfAnnotationBase.taregetDecoraterShapes);
            setting.borderDashArray = pdfAnnotationBase.borderDashArray;
        }
        var labelSettings;
        if (this.pdfViewer.enableShapeLabel && (pdfAnnotationBase.shapeAnnotationType !== 'HandWrittenSignature')) {
            labelSettings = {
                // eslint-disable-next-line max-len
                fontColor: pdfAnnotationBase.fontColor, fontSize: pdfAnnotationBase.fontSize, fontFamily: pdfAnnotationBase.fontFamily,
                opacity: pdfAnnotationBase.labelOpacity, labelContent: pdfAnnotationBase.labelContent, fillColor: pdfAnnotationBase.labelFillColor, notes: pdfAnnotationBase.notes
            };
            // eslint-disable-next-line max-len
            this.pdfViewer.fireAnnotationResize(pdfAnnotationBase.pageIndex, pdfAnnotationBase.annotName, type, currentPosition, setting, null, null, null, labelSettings);
        }
        else {
            if (pdfAnnotationBase.shapeAnnotationType === 'HandWrittenSignature' || pdfAnnotationBase.shapeAnnotationType === 'SignatureText' || pdfAnnotationBase.shapeAnnotationType === 'SignatureImage') {
                // eslint-disable-next-line max-len
                this.pdfViewer.fireSignatureResize(pdfAnnotationBase.pageIndex, pdfAnnotationBase.signatureName, pdfAnnotationBase.shapeAnnotationType, pdfAnnotationBase.opacity, pdfAnnotationBase.strokeColor, pdfAnnotationBase.thickness, currentPosition, previousPosition);
            }
            else {
                // eslint-disable-next-line max-len
                this.pdfViewer.fireAnnotationResize(pdfAnnotationBase.pageIndex, pdfAnnotationBase.annotName, type, currentPosition, setting);
            }
        }
    };
    /**
     * @param pdfAnnotationBase
     * @private
     */
    // eslint-disable-next-line
    Annotation.prototype.triggerAnnotationMove = function (pdfAnnotationBase, isMoving) {
        // eslint-disable-next-line
        var setting = {
            opacity: pdfAnnotationBase.opacity, fillColor: pdfAnnotationBase.fillColor, strokeColor: pdfAnnotationBase.strokeColor,
            thickness: pdfAnnotationBase.thickness, author: pdfAnnotationBase.author, subject: pdfAnnotationBase.subject,
            modifiedDate: pdfAnnotationBase.modifiedDate
        };
        // eslint-disable-next-line
        var annotationBounds = pdfAnnotationBase.bounds;
        var currentPosition = { left: annotationBounds.x, top: annotationBounds.y, x: annotationBounds.x, y: annotationBounds.y, width: annotationBounds.width, height: annotationBounds.height };
        // eslint-disable-next-line max-len
        var previousPosition = { left: annotationBounds.oldProperties.x ? annotationBounds.oldProperties.x : annotationBounds.x, top: annotationBounds.oldProperties.y ? annotationBounds.oldProperties.y : annotationBounds.y, width: annotationBounds.width, height: annotationBounds.height };
        var type = this.getAnnotationType(pdfAnnotationBase.shapeAnnotationType, pdfAnnotationBase.measureType);
        if (type === 'Line' || type === 'Arrow' || type === 'Distance' || type === 'Perimeter') {
            setting.lineHeadStartStyle = this.getArrowString(pdfAnnotationBase.sourceDecoraterShapes);
            setting.lineHeadEndStyle = this.getArrowString(pdfAnnotationBase.taregetDecoraterShapes);
            setting.borderDashArray = pdfAnnotationBase.borderDashArray;
        }
        if (pdfAnnotationBase.shapeAnnotationType === 'HandWrittenSignature' || pdfAnnotationBase.shapeAnnotationType === 'SignatureText' || pdfAnnotationBase.shapeAnnotationType === 'SignatureImage') {
            // eslint-disable-next-line max-len
            this.pdfViewer.fireSignatureMove(pdfAnnotationBase.pageIndex, pdfAnnotationBase.signatureName, pdfAnnotationBase.shapeAnnotationType, pdfAnnotationBase.opacity, pdfAnnotationBase.strokeColor, pdfAnnotationBase.thickness, previousPosition, currentPosition);
        }
        else {
            // eslint-disable-next-line max-len
            isMoving ? this.pdfViewer.fireAnnotationMoving(pdfAnnotationBase.pageIndex, pdfAnnotationBase.annotName, type, setting, previousPosition, currentPosition) : this.pdfViewer.fireAnnotationMove(pdfAnnotationBase.pageIndex, pdfAnnotationBase.annotName, type, setting, previousPosition, currentPosition);
        }
    };
    /**
     * @param annotationId
     * @param pageNumber
     * @param annotation
     * @param annotationCollection
     * @param isDblClick
     * @param isSelected
     * @private
     */
    // eslint-disable-next-line
    Annotation.prototype.annotationSelect = function (annotationId, pageNumber, annotation, annotationCollection, isDblClick, isSelected) {
        // eslint-disable-next-line
        var annotSettings;
        if (annotation.shapeAnnotationType === 'textMarkup') {
            // eslint-disable-next-line max-len
            annotSettings = { type: 'TextMarkup', subType: annotation.subject, opacity: annotation.opacity, color: annotation.color, textMarkupContent: annotation.textMarkupContent, textMarkupStartIndex: annotation.textMarkupStartIndex, textMarkupEndIndex: annotation.textMarkupEndIndex, customData: annotation.customData };
        }
        else if (annotation.shapeAnnotationType === 'StickyNotes') {
            annotSettings = { type: 'StickyNotes', opacity: annotation.opacity, customData: annotation.customData };
        }
        else if (annotation.shapeAnnotationType === 'Stamp' || annotation.shapeAnnotationType === 'Image') {
            annotSettings = { type: 'Stamp', opacity: annotation.opacity, customData: annotation.customData };
        }
        else if (annotation.shapeAnnotationType === 'Ink') {
            annotSettings = {
                // eslint-disable-next-line max-len
                type: 'Ink', opacity: annotation.opacity, strokeColor: annotation.strokeColor, thickness: annotation.thickness, modifiedDate: annotation.modifiedDate,
                width: annotation.bounds.width, height: annotation.bounds.height, left: annotation.bounds.x, top: annotation.bounds.y, data: annotation.data, customData: annotation.customData
            };
        }
        else if (annotation.shapeAnnotationType === 'FreeText') {
            annotSettings = {
                type: 'FreeText', opacity: annotation.opacity, fillColor: annotation.fillColor,
                // eslint-disable-next-line max-len
                strokeColor: annotation.strokeColor, thickness: annotation.thickness, content: annotation.dynamicText,
                // eslint-disable-next-line max-len
                fontFamily: annotation.fontFamily, fontSize: annotation.fontSize, fontColor: annotation.fontColor, textAlign: annotation.textAlign, fontStyle: this.updateFreeTextFontStyle(annotation.font), customData: annotation.customData
            };
        }
        else if (annotation.measureType === '') {
            if (annotation.shapeAnnotationType === 'Line') {
                // eslint-disable-next-line max-len
                annotSettings = { type: 'Shape', subType: 'Line', opacity: annotation.opacity, fillColor: annotation.fillColor, strokeColor: annotation.strokeColor, thickness: annotation.thickness, borderDashArray: annotation.borderDashArray, lineHeadStartStyle: annotation.sourceDecoraterShapes, lineHeadEndStyle: annotation.taregetDecoraterShapes, customData: annotation.customData };
            }
            else if (annotation.shapeAnnotationType === 'Arrow' || annotation.shapeAnnotationType === 'LineWidthArrowHead') {
                // eslint-disable-next-line max-len
                annotSettings = { type: 'Shape', subType: 'Arrow', opacity: annotation.opacity, fillColor: annotation.fillColor, strokeColor: annotation.strokeColor, thickness: annotation.thickness, borderDashArray: annotation.borderDashArray, lineHeadStartStyle: annotation.sourceDecoraterShapes, lineHeadEndStyle: annotation.taregetDecoraterShapes, customData: annotation.customData };
            }
            else if (annotation.shapeAnnotationType === 'Rectangle') {
                annotSettings = {
                    type: 'Shape', subType: 'Rectangle', opacity: annotation.opacity, fillColor: annotation.fillColor,
                    strokeColor: annotation.strokeColor, thickness: annotation.thickness, customData: annotation.customData
                };
            }
            else if (annotation.shapeAnnotationType === 'Circle' || annotation.shapeAnnotationType === 'Ellipse') {
                annotSettings = {
                    type: 'Shape', subType: 'Circle', opacity: annotation.opacity, fillColor: annotation.fillColor,
                    strokeColor: annotation.strokeColor, thickness: annotation.thickness, customData: annotation.customData
                };
            }
            else if (annotation.shapeAnnotationType === 'Polygon') {
                annotSettings = {
                    type: 'Shape', subType: 'Polygon', opacity: annotation.opacity, fillColor: annotation.fillColor,
                    strokeColor: annotation.strokeColor, thickness: annotation.thickness, customData: annotation.customData
                };
            }
        }
        else if (annotation.measureType !== '') {
            if (annotation.measureType === 'Distance') {
                // eslint-disable-next-line max-len
                annotSettings = { type: 'Measure', subType: 'Distance', opacity: annotation.opacity, fillColor: annotation.fillColor, strokeColor: annotation.strokeColor, thickness: annotation.thickness, borderDashArray: annotation.borderDashArray, lineHeadStartStyle: annotation.sourceDecoraterShapes, lineHeadEndStyle: annotation.taregetDecoraterShapes, customData: annotation.customData };
            }
            else if (annotation.measureType === 'Perimeter') {
                // eslint-disable-next-line max-len
                annotSettings = { type: 'Measure', subType: 'Perimeter', opacity: annotation.opacity, fillColor: annotation.fillColor, strokeColor: annotation.strokeColor, thickness: annotation.thickness, borderDashArray: annotation.borderDashArray, lineHeadStartStyle: annotation.sourceDecoraterShapes, lineHeadEndStyle: annotation.taregetDecoraterShapes, customData: annotation.customData };
            }
            else if (annotation.measureType === 'Area') {
                annotSettings = {
                    type: 'Measure', subType: 'Area', opacity: annotation.opacity, fillColor: annotation.fillColor,
                    strokeColor: annotation.strokeColor, thickness: annotation.thickness, customData: annotation.customData
                };
            }
            else if (annotation.measureType === 'Radius') {
                annotSettings = {
                    type: 'Measure', subType: 'Radius', opacity: annotation.opacity, fillColor: annotation.fillColor,
                    strokeColor: annotation.strokeColor, thickness: annotation.thickness, customData: annotation.customData
                };
            }
            else if (annotation.measureType === 'Volume') {
                annotSettings = {
                    type: 'Measure', subType: 'Volume', opacity: annotation.opacity, fillColor: annotation.fillColor,
                    strokeColor: annotation.strokeColor, thickness: annotation.thickness, calibrate: annotation.calibrate,
                    annotationId: annotation.annotName, customData: annotation.customData
                };
            }
        }
        // eslint-disable-next-line
        var overlappedCollection = [];
        // eslint-disable-next-line
        var overlappedAnnotations = this.getOverlappedAnnotations(annotation, pageNumber);
        if (overlappedAnnotations && this.overlappedCollections) {
            // eslint-disable-next-line
            var overlappedCollections = [];
            // eslint-disable-next-line
            for (var i = 0; i < overlappedAnnotations.length; i++) {
                if (overlappedAnnotations[i].shapeAnnotationType !== 'textMarkup' && this.overlappedCollections || isSelected) {
                    for (var j = 0; j < this.overlappedCollections.length; j++) {
                        if (overlappedAnnotations[i].annotName === this.overlappedCollections[j].annotName) {
                            overlappedCollections.push(overlappedAnnotations[i]);
                            break;
                        }
                    }
                }
                else {
                    overlappedCollections.push(overlappedAnnotations[i]);
                }
            }
            overlappedAnnotations = overlappedCollections;
        }
        if (this.pdfViewer.enableMultiLineOverlap) {
            // eslint-disable-next-line
            for (var i = 0; i < overlappedAnnotations.length; i++) {
                if (overlappedAnnotations[i].shapeAnnotationType === 'textMarkup') {
                    var isOverlapped = false;
                    for (var j = 0; j < overlappedAnnotations[i].bounds.length; j++) {
                        // eslint-disable-next-line
                        var bounds = this.orderTextMarkupBounds(overlappedAnnotations[i].bounds[j]);
                        // eslint-disable-next-line
                        var clickedPosition = this.textMarkupAnnotationModule.annotationClickPosition;
                        if (clickedPosition && (clickedPosition.x || clickedPosition.y)) {
                            if (bounds.left <= clickedPosition.x && (bounds.left + bounds.width) >= clickedPosition.x) {
                                if (bounds.top <= clickedPosition.y && (bounds.top + bounds.height) >= clickedPosition.y) {
                                    isOverlapped = true;
                                }
                            }
                        }
                        else {
                            isOverlapped = true;
                        }
                    }
                    if (!isOverlapped) {
                        overlappedAnnotations.splice(i, 1);
                    }
                }
            }
        }
        if (overlappedAnnotations && overlappedAnnotations.length > 0) {
            annotationCollection = overlappedAnnotations;
            // eslint-disable-next-line
            for (var i = 0; i < annotationCollection.length; i++) {
                // eslint-disable-next-line
                var overlappedObject = cloneObject(annotationCollection[i]);
                overlappedObject.annotationId = annotationCollection[i].annotName;
                if (annotationId === annotationCollection[i].annotName && annotation.measureType && annotation.measureType === 'Volume') {
                    annotSettings.calibrate = annotationCollection[i].calibrate;
                }
                delete overlappedObject.annotName;
                overlappedCollection.push(overlappedObject);
            }
        }
        else {
            overlappedCollection = null;
        }
        this.addFreeTextProperties(annotation, annotSettings);
        var annotationAddMode = annotation.annotationAddMode;
        if (!isDblClick) {
            if (annotation.shapeAnnotationType === 'Stamp' || annotation.shapeAnnotationType === 'Image') {
                if (!this.pdfViewerBase.isNewStamp && this.annotationSelected) {
                    if (overlappedCollection) {
                        // eslint-disable-next-line max-len
                        this.pdfViewer.fireAnnotationSelect(annotationId, pageNumber, annotSettings, overlappedCollection, null, null, annotationAddMode);
                    }
                    else {
                        this.pdfViewer.fireAnnotationSelect(annotationId, pageNumber, annotSettings, null, null, null, annotationAddMode);
                    }
                }
            }
            else {
                var module = this.textMarkupAnnotationModule;
                var multiPageCollection = module && module.multiPageCollectionList(annotation);
                if (multiPageCollection && multiPageCollection.length === 0) {
                    multiPageCollection = null;
                }
                if (this.annotationSelected) {
                    if (overlappedCollection) {
                        isSelected = false;
                        // eslint-disable-next-line max-len
                        this.pdfViewer.fireAnnotationSelect(annotationId, pageNumber, annotSettings, overlappedCollection, multiPageCollection, isSelected, annotationAddMode);
                    }
                    else {
                        isSelected = true;
                        // eslint-disable-next-line max-len
                        this.pdfViewer.fireAnnotationSelect(annotationId, pageNumber, annotSettings, null, multiPageCollection, isSelected, annotationAddMode);
                    }
                }
            }
        }
        else {
            if (annotation.shapeAnnotationType === 'Stamp' || annotation.shapeAnnotationType === 'Image') {
                if (!this.pdfViewerBase.isNewStamp) {
                    this.pdfViewer.fireAnnotationDoubleClick(annotationId, pageNumber, annotSettings);
                }
            }
            else {
                this.pdfViewer.fireAnnotationDoubleClick(annotationId, pageNumber, annotSettings);
            }
        }
        this.annotationSelected = true;
    };
    // eslint-disable-next-line
    Annotation.prototype.selectSignature = function (signatureId, pageNumber, signatureModule) {
        // eslint-disable-next-line
        var annotBounds = signatureModule.bounds;
        // eslint-disable-next-line
        var bounds = { height: annotBounds.height, width: annotBounds.width, x: annotBounds.x, y: annotBounds.y };
        if (!this.pdfViewerBase.signatureAdded) {
            // eslint-disable-next-line max-len
            var signature = { bounds: bounds, opacity: signatureModule.opacity, thickness: signatureModule.thickness, strokeColor: signatureModule.strokeColor };
            this.pdfViewer.fireSignatureSelect(signatureId, pageNumber, signature);
        }
    };
    // eslint-disable-next-line
    Annotation.prototype.editSignature = function (signature) {
        // eslint-disable-next-line
        var currentAnnotation;
        if (signature.uniqueKey) {
            // eslint-disable-next-line
            currentAnnotation = this.pdfViewer.nameTable[signature.uniqueKey];
        }
        else {
            currentAnnotation = this.pdfViewer.selectedItems.annotations[0];
        }
        var pageNumber = currentAnnotation.pageIndex;
        if (currentAnnotation.shapeAnnotationType === 'HandWrittenSignature' || currentAnnotation.shapeAnnotationType === 'SignatureText' || currentAnnotation.shapeAnnotationType === 'SignatureImage') {
            // eslint-disable-next-line
            var clonedObject = cloneObject(currentAnnotation);
            // eslint-disable-next-line
            var redoClonedObject = cloneObject(currentAnnotation);
            if (currentAnnotation.opacity !== signature.opacity) {
                redoClonedObject.opacity = signature.opacity;
                this.pdfViewer.nodePropertyChange(currentAnnotation, { opacity: signature.opacity });
                // eslint-disable-next-line max-len
                this.pdfViewer.fireSignaturePropertiesChange(currentAnnotation.pageIndex, currentAnnotation.signatureName, currentAnnotation.shapeAnnotationType, false, true, false, clonedObject.opacity, redoClonedObject.opacity);
                // eslint-disable-next-line max-len
                this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'Shape Opacity', '', clonedObject, redoClonedObject);
            }
            if (currentAnnotation.strokeColor !== signature.strokeColor) {
                redoClonedObject.strokeColor = signature.strokeColor;
                this.pdfViewer.nodePropertyChange(currentAnnotation, { strokeColor: signature.strokeColor });
                // eslint-disable-next-line max-len
                this.pdfViewer.fireSignaturePropertiesChange(currentAnnotation.pageIndex, currentAnnotation.signatureName, currentAnnotation.shapeAnnotationType, true, false, false, clonedObject.strokeColor, redoClonedObject.strokeColor);
                // eslint-disable-next-line max-len
                this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'Shape Stroke', '', clonedObject, redoClonedObject);
            }
            if (currentAnnotation.thickness !== signature.thickness) {
                redoClonedObject.thickness = signature.thickness;
                this.pdfViewer.nodePropertyChange(currentAnnotation, { thickness: signature.thickness });
                // eslint-disable-next-line max-len
                this.pdfViewer.fireSignaturePropertiesChange(currentAnnotation.pageIndex, currentAnnotation.signatureName, currentAnnotation.shapeAnnotationType, false, false, true, clonedObject.thickness, redoClonedObject.thickness);
                // eslint-disable-next-line max-len
                this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'Shape Thickness', '', clonedObject, redoClonedObject);
            }
            currentAnnotation.modifiedDate = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
            this.pdfViewer.renderDrawing();
            this.pdfViewerBase.signatureModule.modifySignatureCollection(null, pageNumber, currentAnnotation, true);
        }
    };
    // eslint-disable-next-line
    Annotation.prototype.deletComment = function (commentDiv) {
        if (commentDiv.parentElement.firstChild === commentDiv) {
            this.deleteAnnotation();
        }
        else {
            this.pdfViewer.annotationModule.stickyNotesAnnotationModule.modifyCommentDeleteProperty(commentDiv.parentElement, commentDiv);
        }
    };
    // eslint-disable-next-line
    Annotation.prototype.addReplyComments = function (currentAnnotation, replyComment, commentType) {
        if (commentType === 'add') {
            // eslint-disable-next-line
            var commentsMainDiv = document.getElementById(currentAnnotation.annotName);
            this.pdfViewer.annotationModule.stickyNotesAnnotationModule.createCommentDiv(commentsMainDiv);
            for (var j = 0; j < replyComment.length; j++) {
                this.pdfViewer.annotationModule.stickyNotesAnnotationModule.saveCommentDiv(commentsMainDiv, replyComment[j]);
            }
        }
        else if (commentType === 'next') {
            // eslint-disable-next-line
            var commentsMainDiv = document.getElementById(currentAnnotation.annotationId);
            this.selectAnnotation(currentAnnotation);
            this.pdfViewer.annotationModule.stickyNotesAnnotationModule.saveCommentDiv(commentsMainDiv, replyComment);
        }
    };
    Annotation.prototype.editComments = function (commentId, editComment) {
        // eslint-disable-next-line
        var commentDiv = document.getElementById(commentId);
        commentDiv.childNodes[1].ej2_instances[0].value = editComment;
    };
    // eslint-disable-next-line
    Annotation.prototype.editAnnotation = function (annotation) {
        // eslint-disable-next-line
        var currentAnnotation;
        var annotationId;
        var annotationType;
        var pageNumber;
        var isTextMarkupUpdate = false;
        var textMarkupAnnotation = this.pdfViewer.annotationModule.textMarkupAnnotationModule.currentTextMarkupAnnotation;
        if ((textMarkupAnnotation && (!annotation.annotationId || !annotation.uniqueKey) && (annotation.annotationId == textMarkupAnnotation.annotName))) {
            currentAnnotation = this.pdfViewer.annotationModule.textMarkupAnnotationModule.currentTextMarkupAnnotation;
            annotationId = currentAnnotation.annotName;
            pageNumber = this.pdfViewer.annotationModule.textMarkupAnnotationModule.selectTextMarkupCurrentPage;
        }
        else {
            if (this.pdfViewer.selectedItems.annotations[0]) {
                currentAnnotation = this.pdfViewer.selectedItems.annotations[0];
                annotationId = currentAnnotation.annotName;
                pageNumber = currentAnnotation.pageIndex;
            }
        }
        if (annotation.uniqueKey !== undefined) {
            // eslint-disable-next-line
            currentAnnotation = this.pdfViewer.nameTable[annotation.uniqueKey];
            currentAnnotation.annotationSettings.isLock = annotation.annotationSettings.isLock;
            annotationId = currentAnnotation.annotName;
            pageNumber = currentAnnotation.pageIndex;
            if (isBlazor()) {
                if (annotation.allowedInteractions) {
                    var allowedInteractionsCount = annotation.allowedInteractions.length;
                    for (var i = 0; i < allowedInteractionsCount; i++) {
                        if (annotation.allowedInteractions[i] === 0) {
                            annotation.allowedInteractions[i] = AllowedInteraction.Select;
                        }
                        if (annotation.allowedInteractions[i] === 1) {
                            annotation.allowedInteractions[i] = AllowedInteraction.Move;
                        }
                        if (annotation.allowedInteractions[i] === 2) {
                            annotation.allowedInteractions[i] = AllowedInteraction.Resize;
                        }
                        if (annotation.allowedInteractions[i] === 3) {
                            annotation.allowedInteractions[i] = AllowedInteraction.Delete;
                        }
                        if (annotation.allowedInteractions[i] === 4) {
                            annotation.allowedInteractions[i] = AllowedInteraction.PropertyChange;
                        }
                        if (annotation.allowedInteractions[i] === 5) {
                            annotation.allowedInteractions[i] = AllowedInteraction.None;
                        }
                    }
                }
            }
            // eslint-disable-next-line
            currentAnnotation.allowedInteractions = annotation.allowedInteractions ? annotation.allowedInteractions : this.updateAnnotationAllowedInteractions(annotation);
        }
        if (!currentAnnotation) {
            if (annotation.shapeAnnotationType === 'sticky' && annotation.annotationId !== undefined) {
                // eslint-disable-next-line
                currentAnnotation = this.pdfViewer.nameTable[annotation.annotationId];
                currentAnnotation.annotationSettings.isLock = annotation.annotationSettings.isLock;
                annotationId = currentAnnotation.annotName;
                pageNumber = currentAnnotation.pageIndex;
            }
        }
        if (annotation.shapeAnnotationType === 'textMarkup') {
            // eslint-disable-next-line max-len
            currentAnnotation = this.pdfViewer.annotationModule.textMarkupAnnotationModule.getAnnotations(annotation.pageNumber, annotation);
            for (var i = 0; i < currentAnnotation.length; i++) {
                if (annotation.annotationId === currentAnnotation[i].annotName) {
                    isTextMarkupUpdate = true;
                    currentAnnotation = currentAnnotation[i];
                    currentAnnotation.isPrint = annotation.isPrint;
                    this.textMarkupAnnotationModule.currentTextMarkupAnnotation = currentAnnotation;
                    this.textMarkupAnnotationModule.selectTextMarkupCurrentPage = currentAnnotation.pageNumber;
                    currentAnnotation.allowedInteractions = annotation.allowedInteractions;
                    pageNumber = currentAnnotation.pageNumber;
                    annotationId = annotation.annotationId;
                    break;
                }
            }
        }
        if (currentAnnotation) {
            // eslint-disable-next-line
            var clonedObject = cloneObject(currentAnnotation);
            // eslint-disable-next-line
            var redoClonedObject = cloneObject(currentAnnotation);
            if (annotation.shapeAnnotationType === 'textMarkup') {
                annotationType = 'textMarkup';
            }
            if (annotation && annotation.isCommentLock === true) {
                currentAnnotation.isCommentLock = annotation.isCommentLock;
            }
            if (annotation.comments) {
                for (var j_1 = 0; j_1 < annotation.comments.length; j_1++) {
                    if (annotation.comments[j_1].isLock === true) {
                        if (annotationType) {
                            currentAnnotation.comments = annotation.comments;
                            currentAnnotation.comments[j_1].isLock = annotation.comments[j_1].isLock;
                        }
                        else {
                            currentAnnotation.properties.comments = annotation.comments;
                            currentAnnotation.properties.comments[j_1].isLock = annotation.comments[j_1].isLock;
                        }
                    }
                }
            }
            if (annotation && annotation.note !== '' && annotation.note !== undefined) {
                if (annotationType) {
                    currentAnnotation.note = annotation.note;
                    // eslint-disable-next-line max-len
                    this.pdfViewer.annotationModule.stickyNotesAnnotationModule.addTextToComments(currentAnnotation.annotName, currentAnnotation.note);
                }
                else {
                    currentAnnotation.notes = annotation.note;
                    // eslint-disable-next-line max-len
                    this.pdfViewer.annotationModule.stickyNotesAnnotationModule.addTextToComments(currentAnnotation.annotName, currentAnnotation.notes);
                }
            }
            else {
                if (annotation && annotation.isCommentLock && ((annotation.type && annotation.type !== 'FreeText') || annotation.shapeAnnotationType !== 'FreeText')) {
                    this.pdfViewer.annotationModule.stickyNotesAnnotationModule.addTextToComments(currentAnnotation.annotName, '  ');
                }
            }
            if (annotation.commentId && annotation.editComment && annotation.commentType === 'edit') {
                this.editComments(annotation.commentId, annotation.editComment);
            }
            if (annotation.replyComment && annotation.commentType === 'add') {
                this.addReplyComments(currentAnnotation, annotation.replyComment, annotation.commentType);
                this.pdfViewer.annotationCollection[0].note = annotation.note;
            }
            if (annotation.nextComment && annotation.commentType === 'next') {
                this.addReplyComments(annotation, annotation.nextComment, annotation.commentType);
            }
            if (annotation.note === '' && annotation.commentType === 'delete') {
                // eslint-disable-next-line
                var commentDiv = document.getElementById(annotation.annotationId);
                this.deletComment(commentDiv);
            }
            if (annotation.comments) {
                for (var j_2 = 0; j_2 < annotation.comments.length; j_2++) {
                    if (annotation.comments[j_2].note === '' && annotation.commentType === 'delete') {
                        // eslint-disable-next-line
                        var commentDiv = document.getElementById(annotation.comments[j_2].annotName);
                        this.deletComment(commentDiv);
                    }
                }
            }
            if (annotation.type === 'TextMarkup' || annotation.shapeAnnotationType === 'textMarkup') {
                if (currentAnnotation.annotationSettings && annotation.annotationSettings) {
                    if (currentAnnotation.annotationSettings.isLock !== annotation.annotationSettings.isLock) {
                        // eslint-disable-next-line max-len
                        var pageAnnotations = this.textMarkupAnnotationModule.modifyAnnotationProperty('AnnotationSettings', annotation.annotationSettings.isLock, null);
                        // eslint-disable-next-line max-len
                        this.textMarkupAnnotationModule.manageAnnotations(pageAnnotations, this.textMarkupAnnotationModule.selectTextMarkupCurrentPage);
                    }
                }
                if (currentAnnotation.opacity !== annotation.opacity) {
                    this.pdfViewer.annotationModule.textMarkupAnnotationModule.modifyOpacityProperty(null, annotation.opacity);
                }
                if (currentAnnotation.color !== annotation.color) {
                    this.pdfViewer.annotationModule.textMarkupAnnotationModule.modifyColorProperty(annotation.color);
                }
                annotationType = 'textMarkup';
                if (isTextMarkupUpdate) {
                    this.textMarkupAnnotationModule.currentTextMarkupAnnotation = null;
                    this.textMarkupAnnotationModule.selectTextMarkupCurrentPage = null;
                }
                // eslint-disable-next-line max-len
            }
            else if (annotation && annotation.stampAnnotationType === 'image' && annotation.shapeAnnotationType === 'stamp' && annotation.stampAnnotationPath) {
                annotationType = 'stamp';
                if (currentAnnotation.data !== annotation.stampAnnotationPath) {
                    currentAnnotation.data = annotation.stampAnnotationPath;
                    currentAnnotation.wrapper.children[0].imageSource = annotation.stampAnnotationPath;
                }
                if (annotation.opacity && currentAnnotation.opacity !== annotation.opacity) {
                    this.annotationPropertyChange(currentAnnotation, annotation.opacity, 'Shape Opacity', clonedObject, redoClonedObject);
                }
                this.calculateAnnotationBounds(currentAnnotation, annotation);
                // eslint-disable-next-line max-len
            }
            else if (annotation.type === 'StickyNotes' || annotation.type === 'Stamp' || annotation.shapeAnnotationType === 'sticky' || annotation.shapeAnnotationType === 'stamp') {
                if (annotation.opacity && currentAnnotation.opacity !== annotation.opacity) {
                    this.annotationPropertyChange(currentAnnotation, annotation.opacity, 'Shape Opacity', clonedObject, redoClonedObject);
                }
                this.calculateAnnotationBounds(currentAnnotation, annotation);
                if (annotation.type === 'StickyNotes' || annotation.shapeAnnotationType === 'sticky') {
                    annotationType = 'sticky';
                }
                else {
                    annotationType = 'stamp';
                }
                // eslint-disable-next-line max-len
            }
            else if (annotation.type === 'Ink' || annotation.type === 'Shape' || annotation.type === 'Measure' || annotation.shapeAnnotationType === 'Line' || annotation.shapeAnnotationType === 'Square' || annotation.shapeAnnotationType === 'Circle' || annotation.shapeAnnotationType === 'Polygon' || annotation.shapeAnnotationType === 'Polyline' || annotation.shapeAnnotationType === 'Ink') {
                this.calculateAnnotationBounds(currentAnnotation, annotation);
                if (annotation.opacity && currentAnnotation.opacity !== annotation.opacity) {
                    this.annotationPropertyChange(currentAnnotation, annotation.opacity, 'Shape Opacity', clonedObject, redoClonedObject);
                }
                if (annotation.fillColor && currentAnnotation.fillColor !== annotation.fillColor) {
                    redoClonedObject.fillColor = annotation.fillColor;
                    if (annotation.labelSettings && annotation.labelSettings.fillColor) {
                        annotation.labelSettings.fillColor = annotation.fillColor;
                    }
                    this.pdfViewer.nodePropertyChange(currentAnnotation, { fillColor: annotation.fillColor });
                    this.triggerAnnotationPropChange(currentAnnotation, true, false, false, false);
                    // eslint-disable-next-line max-len
                    this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'Shape Fill', '', clonedObject, redoClonedObject);
                }
                if (annotation.strokeColor && currentAnnotation.strokeColor !== annotation.strokeColor) {
                    redoClonedObject.strokeColor = annotation.strokeColor;
                    this.pdfViewer.nodePropertyChange(currentAnnotation, { strokeColor: annotation.strokeColor });
                    this.triggerAnnotationPropChange(currentAnnotation, false, true, false, false);
                    // eslint-disable-next-line max-len
                    this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'Shape Stroke', '', clonedObject, redoClonedObject);
                }
                if (annotation.thickness && currentAnnotation.thickness !== annotation.thickness) {
                    redoClonedObject.thickness = annotation.thickness;
                    this.pdfViewer.nodePropertyChange(currentAnnotation, { thickness: annotation.thickness });
                    this.triggerAnnotationPropChange(currentAnnotation, false, false, true, false);
                    // eslint-disable-next-line max-len
                    this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'Shape Thickness', '', clonedObject, redoClonedObject);
                }
                if (currentAnnotation.author !== annotation.author) {
                    redoClonedObject.author = annotation.author;
                    this.pdfViewer.nodePropertyChange(currentAnnotation, { author: annotation.author });
                    this.triggerAnnotationPropChange(currentAnnotation, false, true, false, false);
                }
                if (currentAnnotation.modifiedDate !== annotation.modifiedDate) {
                    redoClonedObject.modifiedDate = annotation.modifiedDate;
                    this.pdfViewer.nodePropertyChange(currentAnnotation, { modifiedDate: annotation.modifiedDate });
                }
                if (currentAnnotation.subject !== annotation.subject) {
                    redoClonedObject.subject = annotation.subject;
                    this.pdfViewer.nodePropertyChange(currentAnnotation, { subject: annotation.subject });
                    this.triggerAnnotationPropChange(currentAnnotation, false, true, false, false);
                    // eslint-disable-next-line max-len
                    this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'Shape Stroke', '', clonedObject, redoClonedObject);
                }
                if (this.pdfViewer.enableShapeLabel && currentAnnotation.fontColor !== annotation.fontColor) {
                    redoClonedObject.fontColor = annotation.fontColor;
                    this.pdfViewer.nodePropertyChange(currentAnnotation, { fontColor: annotation.fontColor });
                }
                if (this.pdfViewer.enableShapeLabel && annotation.labelSettings && annotation.labelSettings.fillColor) {
                    if (currentAnnotation.labelFillColor !== annotation.labelSettings.fillColor) {
                        redoClonedObject.labelFillColor = annotation.labelSettings.fillColor;
                        this.pdfViewer.nodePropertyChange(currentAnnotation, { labelFillColor: annotation.labelSettings.fillColor });
                    }
                }
                // eslint-disable-next-line max-len
                if (annotation.shapeAnnotationType === 'Line' || annotation.shapeAnnotationType === 'Polyline' || annotation.shapeAnnotationType === 'Polygon') {
                    if (JSON.stringify(currentAnnotation.vertexPoints) !== JSON.stringify(annotation.vertexPoints)) {
                        currentAnnotation.vertexPoints = annotation.vertexPoints;
                        this.pdfViewer.nodePropertyChange(currentAnnotation, { vertexPoints: annotation.vertexPoints });
                    }
                }
                // eslint-disable-next-line max-len
                if (annotation.subType === 'Line' || annotation.subType === 'Arrow' || annotation.subType === 'Distance' || annotation.subType === 'Perimeter') {
                    var isSourceDecoraterShapesChanged = false;
                    var isTargetDecoraterShapesChanged = false;
                    var isBorderDashArrayChanged = false;
                    clonedObject.lineHeadStart = currentAnnotation.sourceDecoraterShapes;
                    clonedObject.lineHeadEnd = currentAnnotation.taregetDecoraterShapes;
                    redoClonedObject.lineHeadStart = annotation.lineHeadStartStyle;
                    redoClonedObject.lineHeadEnd = annotation.lineHeadEndStyle;
                    redoClonedObject.borderDashArray = annotation.borderDashArray;
                    if (currentAnnotation.taregetDecoraterShapes !== annotation.lineHeadEndStyle) {
                        isTargetDecoraterShapesChanged = true;
                    }
                    if (currentAnnotation.sourceDecoraterShapes !== annotation.lineHeadStartStyle) {
                        isSourceDecoraterShapesChanged = true;
                    }
                    if (currentAnnotation.borderDashArray !== annotation.borderDashArray) {
                        isBorderDashArrayChanged = true;
                    }
                    // eslint-disable-next-line max-len
                    this.pdfViewer.nodePropertyChange(currentAnnotation, { sourceDecoraterShapes: annotation.lineHeadStartStyle, taregetDecoraterShapes: annotation.lineHeadEndStyle, borderDashArray: annotation.borderDashArray });
                    // eslint-disable-next-line max-len
                    this.triggerAnnotationPropChange(currentAnnotation, false, false, false, false, isSourceDecoraterShapesChanged, isTargetDecoraterShapesChanged, isBorderDashArrayChanged);
                    // eslint-disable-next-line max-len
                    this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'Line properties change', '', clonedObject, redoClonedObject);
                }
                // eslint-disable-next-line max-len
                if (annotation.type === 'Shape' || annotation.shapeAnnotationType === 'Line' || annotation.shapeAnnotationType === 'Square' || annotation.shapeAnnotationType === 'Circle' || annotation.shapeAnnotationType === 'Polygon') {
                    annotationType = 'shape';
                }
                if (annotation.type === 'Ink' || annotation.shapeAnnotationType === 'Ink') {
                    annotationType = 'ink';
                }
                // eslint-disable-next-line max-len
                if (annotation.type === 'Measure' || annotation.subject === 'Distance calculation' || annotation.subject === 'Perimeter calculation' || annotation.subject === 'Radius calculation' || annotation.subject === 'Area calculation' || annotation.subject === 'Volume calculation') {
                    annotationType = 'shape_measure';
                }
                if (annotation.labelSettings && this.pdfViewer.enableShapeLabel) {
                    this.updateFreeTextProperties(currentAnnotation);
                    this.pdfViewer.nodePropertyChange(currentAnnotation, {
                        // eslint-disable-next-line max-len
                        labelOpacity: annotation.labelSettings.opacity, fontColor: annotation.labelSettings.fontColor, fontSize: annotation.labelSettings.fontSize, fontFamily: annotation.labelSettings.fontFamily,
                        labelContent: currentAnnotation.notes, labelFillColor: annotation.labelSettings.fillColor
                    });
                }
                if (this.pdfViewer.enableShapeLabel && annotation.calibrate && annotation.calibrate.depth) {
                    if (this.pdfViewer.annotationModule.measureAnnotationModule.volumeDepth !== annotation.calibrate.depth) {
                        this.pdfViewer.annotationModule.measureAnnotationModule.volumeDepth = annotation.calibrate.depth;
                        // eslint-disable-next-line max-len
                        currentAnnotation.notes = this.pdfViewer.annotationModule.measureAnnotationModule.calculateVolume(currentAnnotation.vertexPoints, currentAnnotation.id, currentAnnotation.pageIndex);
                        currentAnnotation.labelContent = currentAnnotation.notes;
                        if (annotation.labelSettings && annotation.labelSettings.labelContent) {
                            annotation.labelSettings.labelContent = currentAnnotation.notes;
                        }
                        this.pdfViewer.nodePropertyChange(currentAnnotation, { labelContent: currentAnnotation.labelContent });
                        // eslint-disable-next-line max-len
                        this.pdfViewer.annotationModule.stickyNotesAnnotationModule.addTextToComments(currentAnnotation.annotName, currentAnnotation.notes);
                    }
                }
            }
            else if (annotation.type === 'FreeText' || annotation.shapeAnnotationType === 'FreeText') {
                annotationType = 'freetext';
                if (this.pdfViewer.freeTextSettings.enableAutoFit && currentAnnotation.dynamicText !== annotation.content) {
                    // eslint-disable-next-line
                    var canvas = this.pdfViewerBase.getElement('_annotationCanvas_' + currentAnnotation.pageIndex);
                    var context = canvas.getContext("2d");
                    var fontSize = annotation.fontSize;
                    var font = void 0;
                    var fontFamily = annotation.fontFamily;
                    var zoomFactor = this.pdfViewerBase.getZoomFactor();
                    // eslint-disable-next-line
                    annotation.font.isBold ? font = 'bold' + ' ' + fontSize + 'px' + ' ' + fontFamily : font = fontSize + 'px' + ' ' + fontFamily;
                    context.font = font;
                    var characterLength = 8;
                    var highestTextNode = "";
                    // eslint-disable-next-line
                    var textNodes = [];
                    var textboxValue = annotation.content ? annotation.content : annotation.dynamicText;
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
                    }
                    else {
                        highestTextNode = textboxValue;
                    }
                    // eslint-disable-next-line
                    var textwidth = context.measureText(highestTextNode);
                    annotation.bounds.width = Math.ceil(textwidth.width + ((characterLength + 1) * 2));
                    var pageDiv = this.pdfViewerBase.getElement('_pageDiv_' + (annotation.pageIndex));
                    var maxWidth = pageDiv.clientWidth - (annotation.bounds.left * zoomFactor);
                    if (annotation.bounds.width > maxWidth) {
                        annotation.bounds.width = maxWidth / zoomFactor;
                    }
                    var height = annotation.bounds.height;
                    annotation.bounds.height = height >= currentAnnotation.bounds.height ? height : currentAnnotation.bounds.height;
                }
                this.calculateAnnotationBounds(currentAnnotation, annotation);
                if (annotation.opacity && currentAnnotation.opacity !== annotation.opacity) {
                    this.triggerAnnotationPropChange(currentAnnotation, false, false, false, true);
                }
                if (annotation.fillColor && currentAnnotation.fillColor !== annotation.fillColor) {
                    this.triggerAnnotationPropChange(currentAnnotation, true, false, false, false);
                }
                if (annotation.strokeColor && currentAnnotation.strokeColor !== annotation.strokeColor) {
                    this.triggerAnnotationPropChange(currentAnnotation, false, true, false, false);
                }
                if (annotation.thickness && currentAnnotation.thickness !== annotation.thickness) {
                    this.triggerAnnotationPropChange(currentAnnotation, false, false, true, false);
                }
                annotation.content = (annotation.content && annotation.content === annotation.dynamicText) ? annotation.content : annotation.dynamicText;
                if (annotation.content && currentAnnotation.dynamicText !== annotation.content) {
                    this.triggerAnnotationPropChange(currentAnnotation, false, false, false, false, false, false, false, true, currentAnnotation.dynamicText, annotation.content);
                }
                this.pdfViewer.nodePropertyChange(currentAnnotation, {
                    // eslint-disable-next-line max-len
                    opacity: annotation.opacity, fontColor: annotation.fontColor, fontSize: annotation.fontSize, fontFamily: annotation.fontFamily,
                    // eslint-disable-next-line max-len
                    dynamicText: annotation.content, fillColor: annotation.fillColor, textAlign: annotation.textAlign, strokeColor: annotation.strokeColor, thickness: annotation.thickness, font: annotation.fontStyle ? this.setFreeTextFontStyle(annotation.fontStyle) : this.setFreeTextFontStyle(annotation.font),
                    isReadonly: annotation.isReadonly
                });
                if (annotation.content && currentAnnotation) {
                    this.updateAnnotationComments(currentAnnotation.annotName, annotation.content);
                }
                // eslint-disable-next-line
                var newCommentDiv = document.getElementById(this.pdfViewer.element.id + '_commenttextbox_editor');
                // eslint-disable-next-line
                var commentObj = new InPlaceEditor({
                    value: annotation.content
                });
                commentObj.appendTo(newCommentDiv);
            }
            currentAnnotation.modifiedDate = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
            if (currentAnnotation.customData !== annotation.customData) {
                currentAnnotation.customData = annotation.customData;
            }
            currentAnnotation.isPrint = annotation.isPrint;
            if (annotation.type !== 'TextMarkup') {
                this.pdfViewer.renderDrawing();
                this.updateCollection(annotationId, pageNumber, annotation, annotationType);
            }
        }
    };
    // eslint-disable-next-line
    Annotation.prototype.annotationPropertyChange = function (currentAnnotation, opacity, actionString, clonedObject, redoClonedObject) {
        this.pdfViewer.nodePropertyChange(currentAnnotation, { opacity: opacity });
        this.triggerAnnotationPropChange(currentAnnotation, false, false, false, true);
        // eslint-disable-next-line max-len
        this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, actionString, '', clonedObject, redoClonedObject);
    };
    // eslint-disable-next-line
    Annotation.prototype.calculateAnnotationBounds = function (currentAnnotation, annotation) {
        // eslint-disable-next-line
        var bounds = this.pdfViewerBase.convertBounds(currentAnnotation.wrapper.bounds);
        // eslint-disable-next-line
        var annotBounds = this.pdfViewerBase.convertBounds(annotation.bounds);
        if (bounds && annotBounds) {
            // eslint-disable-next-line
            if (JSON.stringify(bounds) !== JSON.stringify(annotBounds) && (Math.abs(bounds.Y - annotBounds.Y) > 2) || (Math.abs(bounds.X - annotBounds.X) > 2) || (Math.abs(bounds.Width - annotBounds.Width) > 2) || (Math.abs(bounds.Height - annotBounds.Height) > 2)) {
                // eslint-disable-next-line
                var annotationBounds = { x: annotBounds.X + (annotBounds.Width / 2), y: annotBounds.Y + (annotBounds.Height / 2), width: annotBounds.Width, height: annotBounds.Height };
                this.pdfViewer.nodePropertyChange(currentAnnotation, { bounds: annotationBounds });
                this.pdfViewer.clearSelection(this.pdfViewerBase.activeElements.activePageID);
                this.triggerAnnotationPropChange(currentAnnotation, false, false, false, false);
            }
        }
    };
    /**
     * @param annotation
     * @private
     */
    // eslint-disable-next-line
    Annotation.prototype.updateFreeTextProperties = function (annotation) {
        if (annotation.labelSettings) {
            if (annotation.labelSettings.fillColor) {
                annotation.labelFillColor = annotation.labelSettings.fillColor;
            }
            if (annotation.labelSettings.fontColor) {
                annotation.fontColor = annotation.labelSettings.fontColor;
            }
            if (annotation.labelSettings.fontSize) {
                annotation.fontSize = annotation.labelSettings.fontSize;
            }
            if (annotation.labelSettings.fontFamily) {
                annotation.fontFamily = annotation.labelSettings.fontFamily;
            }
            if (annotation.labelSettings.opacity) {
                annotation.labelOpacity = annotation.labelSettings.opacity;
            }
            if (annotation.labelSettings.labelContent) {
                annotation.labelContent = annotation.labelSettings.labelContent;
            }
        }
    };
    Annotation.prototype.updateAnnotationComments = function (annotationId, noteContent) {
        // eslint-disable-next-line
        var commentsDiv = document.getElementById(annotationId);
        if (commentsDiv && commentsDiv.childNodes) {
            if (commentsDiv.childNodes[0].ej2_instances) {
                commentsDiv.childNodes[0].ej2_instances[0].value = noteContent;
            }
            else if (commentsDiv.childNodes[0].childNodes && commentsDiv.childNodes[0].childNodes[1].ej2_instances) {
                commentsDiv.childNodes[0].childNodes[1].ej2_instances[0].value = noteContent;
            }
        }
    };
    /**
     * @param annotation
     * @param currentAnnotation
     * @private
     */
    // eslint-disable-next-line
    Annotation.prototype.addFreeTextProperties = function (annotation, currentAnnotation) {
        if (this.pdfViewer.enableShapeLabel && annotation && currentAnnotation) {
            currentAnnotation.labelSettings = {
                fontColor: annotation.fontColor, fontSize: annotation.fontSize, fontFamily: annotation.fontFamily,
                opacity: annotation.labelOpacity, labelContent: annotation.labelContent, fillColor: annotation.labelFillColor
            };
        }
    };
    Annotation.prototype.updateMeasurementSettings = function () {
        if (this.pdfViewer.enableAnnotation && this.pdfViewer.enableMeasureAnnotation) {
            // eslint-disable-next-line max-len
            var ratioString = '1 ' + this.pdfViewer.measurementSettings.conversionUnit + ' = ' + this.pdfViewer.measurementSettings.scaleRatio + ' ' + this.pdfViewer.measurementSettings.displayUnit;
            this.measureAnnotationModule.updateMeasureValues(ratioString, this.pdfViewer.measurementSettings.displayUnit, this.pdfViewer.measurementSettings.conversionUnit, this.pdfViewer.measurementSettings.depth);
        }
    };
    // eslint-disable-next-line
    Annotation.prototype.updateCollection = function (annotationId, pageNumber, annotation, annotationType) {
        // eslint-disable-next-line
        var annotationCollection;
        // eslint-disable-next-line
        var storeObject = window.sessionStorage.getItem(this.pdfViewerBase.documentId + '_annotations_' + annotationType);
        if (this.pdfViewerBase.isStorageExceed) {
            storeObject = this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_' + annotationType];
        }
        if (storeObject) {
            var annotObject = JSON.parse(storeObject);
            var index = this.getPageCollection(annotObject, pageNumber);
            if (annotObject[index]) {
                annotationCollection = annotObject[index].annotations;
                if (annotationCollection !== null) {
                    for (var i = 0; i < annotationCollection.length; i++) {
                        if (annotationCollection[i].annotName === annotationId) {
                            // eslint-disable-next-line
                            var newAnnot = this.modifyAnnotationProperties(annotationCollection[i], annotation, annotationType);
                            annotationCollection[i] = newAnnot;
                        }
                    }
                    if (!this.pdfViewerBase.isStorageExceed) {
                        window.sessionStorage.removeItem(this.pdfViewerBase.documentId + '_annotations_' + annotationType);
                    }
                    if (annotObject[index]) {
                        annotObject[index].annotations = annotationCollection;
                    }
                    var annotationStringified = JSON.stringify(annotObject);
                    if (this.pdfViewerBase.isStorageExceed) {
                        // eslint-disable-next-line max-len
                        this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_' + annotationType] = annotationStringified;
                    }
                    else {
                        // eslint-disable-next-line max-len
                        window.sessionStorage.setItem(this.pdfViewerBase.documentId + '_annotations_' + annotationType, annotationStringified);
                    }
                }
            }
        }
    };
    // eslint-disable-next-line
    Annotation.prototype.modifyAnnotationProperties = function (newAnnotation, annotation, annotationType) {
        if (annotation && annotation.isCommentLock === true) {
            newAnnotation.isCommentLock = annotation.isCommentLock;
        }
        if (annotation.comments) {
            for (var j = 0; j < annotation.comments.length; j++) {
                if (annotation.comments[j].isLock === true) {
                    newAnnotation.comments[j].isLock = annotation.comments[j].isLock;
                }
            }
        }
        if (annotation && annotation.note !== '' && annotation.note !== undefined) {
            newAnnotation.note = annotation.note;
        }
        if (annotation.commentId && annotation.editComment && annotation.commentType === 'edit') {
            // eslint-disable-next-line
            var commentDiv = document.getElementById(annotation.commentId);
            if (annotation.annotationId === annotation.commentId) {
                newAnnotation.note = commentDiv.childNodes[1].ej2_instances[0].value;
            }
            for (var j = 0; j < annotation.comments.length; j++) {
                if (annotation.comments[j].annotName === annotation.commentId) {
                    newAnnotation.comments[j].note = commentDiv.childNodes[1].ej2_instances[0].value;
                }
            }
        }
        if (annotationType === 'textMarkup') {
            newAnnotation.opacity = annotation.opacity;
            newAnnotation.color = annotation.color;
            newAnnotation.allowedInteractions = annotation.allowedInteractions;
        }
        else if (annotationType === 'sticky' || annotationType === 'stamp') {
            if (annotation.bounds) {
                newAnnotation.bounds = annotation.bounds;
            }
            newAnnotation.opacity = annotation.opacity;
            newAnnotation.annotationSettings = annotation.annotationSettings;
            newAnnotation.allowedInteractions = annotation.allowedInteractions;
            if (annotation.stampAnnotationPath) {
                newAnnotation.stampAnnotationPath = annotation.stampAnnotationPath;
            }
        }
        else if (annotationType === 'ink') {
            if (annotation.bounds) {
                newAnnotation.bounds = annotation.bounds;
            }
            newAnnotation.opacity = annotation.opacity;
            newAnnotation.strokeColor = annotation.strokeColor;
            newAnnotation.thickness = annotation.thickness;
            newAnnotation.annotationSettings = annotation.annotationSettings;
            newAnnotation.allowedInteractions = annotation.allowedInteractions;
        }
        else if (annotationType === 'shape' || annotationType === 'shape_measure') {
            if (annotation.subType === 'Line' || annotation.subType === 'Arrow' || annotation.subType === 'Distance' ||
                annotation.subType === 'Perimeter') {
                if (annotation.bounds) {
                    newAnnotation.bounds = annotation.bounds;
                }
                if (annotation.vertexPoints) {
                    newAnnotation.vertexPoints = annotation.vertexPoints;
                }
                newAnnotation.opacity = annotation.opacity;
                newAnnotation.fillColor = annotation.fillColor;
                newAnnotation.strokeColor = annotation.strokeColor;
                newAnnotation.thickness = annotation.thickness;
                newAnnotation.borderDashArray = annotation.borderDashArray;
                newAnnotation.lineHeadStart = this.getArrowTypeForCollection(annotation.lineHeadStartStyle);
                newAnnotation.lineHeadEnd = this.getArrowTypeForCollection(annotation.lineHeadEndStyle);
                newAnnotation.annotationSettings = annotation.annotationSettings;
                newAnnotation.allowedInteractions = annotation.allowedInteractions;
            }
            else {
                if (annotation.bounds) {
                    newAnnotation.bounds = annotation.bounds;
                }
                if (annotation.vertexPoints) {
                    newAnnotation.vertexPoints = annotation.vertexPoints;
                }
                newAnnotation.opacity = annotation.opacity;
                newAnnotation.fillColor = annotation.fillColor;
                newAnnotation.strokeColor = annotation.strokeColor;
                newAnnotation.thickness = annotation.thickness;
                newAnnotation.annotationSettings = annotation.annotationSettings;
                newAnnotation.allowedInteractions = annotation.allowedInteractions;
                if (annotation.calibrate) {
                    if (newAnnotation.annotName === annotation.annotationId) {
                        if (newAnnotation.calibrate.depth !== annotation.calibrate.depth) {
                            newAnnotation.calibrate.depth = annotation.calibrate.depth;
                            this.pdfViewer.annotationModule.measureAnnotationModule.volumeDepth = annotation.calibrate.depth;
                            // eslint-disable-next-line max-len
                            newAnnotation.note = this.pdfViewer.annotationModule.measureAnnotationModule.calculateVolume(newAnnotation.vertexPoints);
                        }
                    }
                }
            }
            if (this.pdfViewer.enableShapeLabel && annotation.labelSettings) {
                var text = annotation.labelSettings.labelContent;
                newAnnotation.note = text;
                newAnnotation.fontSize = annotation.labelSettings.fontSize;
                newAnnotation.labelFillColor = annotation.labelSettings.fillColor;
                if (newAnnotation.labelContent) {
                    newAnnotation.labelContent = text;
                }
                if (newAnnotation.labelSettings) {
                    newAnnotation.labelSettings = annotation.labelSettings;
                }
                this.updateAnnotationComments(newAnnotation.annotName, text);
            }
        }
        else if (annotationType === 'freetext') {
            if (annotation.bounds) {
                newAnnotation.bounds = annotation.bounds;
            }
            newAnnotation.opacity = annotation.opacity;
            newAnnotation.strokeColor = annotation.strokeColor;
            newAnnotation.thickness = annotation.thickness;
            if (annotation.content) {
                newAnnotation.dynamicText = annotation.content;
            }
            newAnnotation.fontFamily = annotation.fontFamily;
            newAnnotation.fontSize = annotation.fontSize;
            newAnnotation.fontColor = annotation.fontColor;
            newAnnotation.fillColor = annotation.fillColor;
            newAnnotation.font = annotation.font ? annotation.font : annotation.fontStyle;
            newAnnotation.textAlign = annotation.textAlign;
            newAnnotation.annotationSettings = annotation.annotationSettings;
            newAnnotation.allowedInteractions = annotation.allowedInteractions;
            newAnnotation.isReadonly = annotation.isReadonly;
        }
        newAnnotation.customData = annotation.customData;
        newAnnotation.modifiedDate = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
        newAnnotation.isPrint = annotation.isPrint;
        if (annotation.annotationSettings && !isNullOrUndefined(annotation.annotationSettings.isLock)) {
            newAnnotation.isLocked = annotation.annotationSettings.isLock;
        }
        return newAnnotation;
    };
    /**
     * @param annotationType
     * @param annotationSubType
     * @param annotationType
     * @param annotationSubType
     * @private
     */
    Annotation.prototype.updateAnnotationAuthor = function (annotationType, annotationSubType) {
        var annotationAuthor;
        if (annotationType === 'sticky') {
            // eslint-disable-next-line max-len
            annotationAuthor = (this.pdfViewer.stickyNotesSettings.author !== 'Guest') ? this.pdfViewer.stickyNotesSettings.author : this.pdfViewer.annotationSettings.author ? this.pdfViewer.annotationSettings.author : 'Guest';
        }
        else if (annotationType === 'stamp') {
            // eslint-disable-next-line max-len
            annotationAuthor = (this.pdfViewer.stampSettings.author !== 'Guest') ? this.pdfViewer.stampSettings.author : this.pdfViewer.annotationSettings.author ? this.pdfViewer.annotationSettings.author : 'Guest';
        }
        else if (annotationType === 'shape') {
            if (annotationSubType === 'Line') {
                // eslint-disable-next-line max-len
                annotationAuthor = (this.pdfViewer.lineSettings.author !== 'Guest') ? this.pdfViewer.lineSettings.author : this.pdfViewer.annotationSettings.author ? this.pdfViewer.annotationSettings.author : 'Guest';
            }
            else if (annotationSubType === 'LineWidthArrowHead' || annotationSubType === 'Arrow') {
                // eslint-disable-next-line max-len
                annotationAuthor = (this.pdfViewer.arrowSettings.author !== 'Guest') ? this.pdfViewer.arrowSettings.author : this.pdfViewer.annotationSettings.author ? this.pdfViewer.annotationSettings.author : 'Guest';
            }
            else if (annotationSubType === 'Circle' || annotationSubType === 'Ellipse' || annotationSubType === 'Oval') {
                // eslint-disable-next-line max-len
                annotationAuthor = (this.pdfViewer.circleSettings.author !== 'Guest') ? this.pdfViewer.circleSettings.author : this.pdfViewer.annotationSettings.author ? this.pdfViewer.annotationSettings.author : 'Guest';
            }
            else if (annotationSubType === 'Rectangle' || annotationSubType === 'Square') {
                // eslint-disable-next-line max-len
                annotationAuthor = (this.pdfViewer.rectangleSettings.author !== 'Guest') ? this.pdfViewer.rectangleSettings.author : this.pdfViewer.annotationSettings.author ? this.pdfViewer.annotationSettings.author : 'Guest';
            }
            else if (annotationSubType === 'Polygon') {
                // eslint-disable-next-line max-len
                annotationAuthor = (this.pdfViewer.polygonSettings.author !== 'Guest') ? this.pdfViewer.polygonSettings.author : this.pdfViewer.annotationSettings.author ? this.pdfViewer.annotationSettings.author : 'Guest';
            }
        }
        else if (annotationType === 'measure') {
            if (annotationSubType === 'Distance' || annotationSubType === 'Distance calculation') {
                // eslint-disable-next-line max-len
                annotationAuthor = (this.pdfViewer.distanceSettings.author !== 'Guest') ? this.pdfViewer.distanceSettings.author : this.pdfViewer.annotationSettings.author ? this.pdfViewer.annotationSettings.author : 'Guest';
            }
            else if (annotationSubType === 'Perimeter' || annotationSubType === 'Perimeter calculation') {
                // eslint-disable-next-line max-len
                annotationAuthor = (this.pdfViewer.perimeterSettings.author !== 'Guest') ? this.pdfViewer.perimeterSettings.author : this.pdfViewer.annotationSettings.author ? this.pdfViewer.annotationSettings.author : 'Guest';
            }
            else if (annotationSubType === 'Radius' || annotationSubType === 'Radius calculation') {
                // eslint-disable-next-line max-len
                annotationAuthor = (this.pdfViewer.radiusSettings.author !== 'Guest') ? this.pdfViewer.radiusSettings.author : this.pdfViewer.annotationSettings.author ? this.pdfViewer.annotationSettings.author : 'Guest';
            }
            else if (annotationSubType === 'Area' || annotationSubType === 'Area calculation') {
                // eslint-disable-next-line max-len
                annotationAuthor = (this.pdfViewer.areaSettings.author !== 'Guest') ? this.pdfViewer.areaSettings.author : this.pdfViewer.annotationSettings.author ? this.pdfViewer.annotationSettings.author : 'Guest';
            }
            else if (annotationSubType === 'Volume' || annotationSubType === 'Volume calculation') {
                // eslint-disable-next-line max-len
                annotationAuthor = (this.pdfViewer.volumeSettings.author !== 'Guest') ? this.pdfViewer.volumeSettings.author : this.pdfViewer.annotationSettings.author ? this.pdfViewer.annotationSettings.author : 'Guest';
            }
        }
        else if (annotationType === 'textMarkup') {
            if (annotationSubType === 'Highlight') {
                // eslint-disable-next-line max-len
                annotationAuthor = (this.pdfViewer.highlightSettings.author !== 'Guest') ? this.pdfViewer.highlightSettings.author : this.pdfViewer.annotationSettings.author ? this.pdfViewer.annotationSettings.author : 'Guest';
            }
            else if (annotationSubType === 'Underline') {
                // eslint-disable-next-line max-len
                annotationAuthor = (this.pdfViewer.underlineSettings.author !== 'Guest') ? this.pdfViewer.underlineSettings.author : this.pdfViewer.annotationSettings.author ? this.pdfViewer.annotationSettings.author : 'Guest';
            }
            else if (annotationSubType === 'Strikethrough') {
                // eslint-disable-next-line max-len
                annotationAuthor = (this.pdfViewer.strikethroughSettings.author !== 'Guest') ? this.pdfViewer.strikethroughSettings.author : this.pdfViewer.annotationSettings.author ? this.pdfViewer.annotationSettings.author : 'Guest';
            }
            else {
                // eslint-disable-next-line max-len
                annotationAuthor = this.pdfViewer.annotationSettings.author;
            }
        }
        else if (annotationType === 'freeText') {
            // eslint-disable-next-line max-len
            annotationAuthor = (this.pdfViewer.freeTextSettings.author !== 'Guest') ? this.pdfViewer.freeTextSettings.author : this.pdfViewer.annotationSettings.author ? this.pdfViewer.annotationSettings.author : 'Guest';
        }
        else if (annotationType === 'ink') {
            // eslint-disable-next-line max-len
            annotationAuthor = (this.pdfViewer.inkAnnotationSettings.author !== 'Guest') ? this.pdfViewer.inkAnnotationSettings.author : this.pdfViewer.annotationSettings.author ? this.pdfViewer.annotationSettings.author : 'Guest';
        }
        if (!annotationAuthor) {
            // eslint-disable-next-line max-len
            annotationAuthor = this.pdfViewer.annotationSettings.author;
        }
        return annotationAuthor;
    };
    /**
     * @param colour
     * @private
     */
    // eslint-disable-next-line
    Annotation.prototype.nameToHash = function (colour) {
        // eslint-disable-next-line
        var colours = {
            'aliceblue': '#f0f8ff', 'antiquewhite': '#faebd7', 'aqua': '#00ffff', 'aquamarine': '#7fffd4', 'azure': '#f0ffff',
            'beige': '#f5f5dc', 'bisque': '#ffe4c4', 'black': '#000000', 'blanchedalmond': '#ffebcd', 'blue': '#0000ff',
            'blueviolet': '#8a2be2', 'brown': '#a52a2a', 'burlywood': '#deb887', 'yellow': '#ffff00', 'yellowgreen': '#9acd32',
            'cadetblue': '#5f9ea0', 'chartreuse': '#7fff00', 'chocolate': '#d2691e', 'coral': '#ff7f50',
            'cornflowerblue': '#6495ed', 'cornsilk': '#fff8dc', 'crimson': '#dc143c',
            'cyan': '#00ffff', 'darkblue': '#00008b', 'darkcyan': '#008b8b', 'darkgoldenrod': '#b8860b', 'darkgray': '#a9a9a9',
            'darkred': '#8b0000', 'darksalmon': '#e9967a', 'darkgreen': '#006400', 'darkkhaki': '#bdb76b',
            'darkmagenta': '#8b008b', 'darkolivegreen': '#556b2f', 'darkorange': '#ff8c00', 'darkorchid': '#9932cc',
            'darkseagreen': '#8fbc8f', 'darkslateblue': '#483d8b', 'darkslategray': '#2f4f4f', 'darkturquoise': '#00ced1',
            'darkviolet': '#9400d3', 'deeppink': '#ff1493', 'deepskyblue': '#00bfff', 'dimgray': '#696969',
            'dodgerblue': '#1e90ff', 'firebrick': '#b22222', 'floralwhite': '#fffaf0',
            'forestgreen': '#228b22', 'fuchsia': '#ff00ff', 'gainsboro': '#dcdcdc', 'ghostwhite': '#f8f8ff',
            'gold': '#ffd700', 'goldenrod': '#daa520', 'gray': '#808080', 'green': '#008000',
            'greenyellow': '#adff2f', 'honeydew': '#f0fff0', 'hotpink': '#ff69b4', 'indianred ': '#cd5c5c',
            'mediumorchid': '#ba55d3', 'mediumpurple': '#9370d8', 'indigo': '#4b0082', 'ivory': '#fffff0',
            'navy': '#000080', 'oldlace': '#fdf5e6', 'olive': '#808000', 'khaki': '#f0e68c',
            'lavender': '#e6e6fa', 'lavenderblush': '#fff0f5', 'lawngreen': '#7cfc00', 'lemonchiffon': '#fffacd',
            'lightblue': '#add8e6', 'lightcoral': '#f08080', 'lightcyan': '#e0ffff',
            'lightgoldenrodyellow': '#fafad2', 'lightgrey': '#d3d3d3', 'lightgreen': '#90ee90',
            'lightpink': '#ffb6c1', 'lightsalmon': '#ffa07a', 'lightseagreen': '#20b2aa',
            'lightskyblue': '#87cefa', 'lightslategray': '#778899', 'lightsteelblue': '#b0c4de',
            'lightyellow': '#ffffe0', 'lime': '#00ff00', 'limegreen': '#32cd32', 'linen': '#faf0e6',
            'magenta': '#ff00ff', 'maroon': '#800000', 'mediumaquamarine': '#66cdaa', 'mediumblue': '#0000cd',
            'mediumseagreen': '#3cb371', 'mediumslateblue': '#7b68ee', 'mediumspringgreen': '#00fa9a',
            'mediumturquoise': '#48d1cc', 'mediumvioletred': '#c71585', 'midnightblue': '#191970',
            'mintcream': '#f5fffa', 'mistyrose': '#ffe4e1', 'moccasin': '#ffe4b5', 'navajowhite': '#ffdead',
            'rebeccapurple': '#663399', 'red': '#ff0000', 'rosybrown': '#bc8f8f', 'royalblue': '#4169e1',
            'olivedrab': '#6b8e23', 'orange': '#ffa500', 'orangered': '#ff4500', 'orchid': '#da70d6',
            'palegoldenrod': '#eee8aa', 'palegreen': '#98fb98', 'paleturquoise': '#afeeee',
            'palevioletred': '#d87093', 'papayawhip': '#ffefd5', 'peachpuff': '#ffdab9', 'peru': '#cd853f',
            'wheat': '#f5deb3', 'white': '#ffffff', 'whitesmoke': '#f5f5f5', 'pink': '#ffc0cb', 'plum': '#dda0dd',
            'steelblue': '#4682b4', 'violet': '#ee82ee', 'powderblue': '#b0e0e6', 'purple': '#800080',
            'saddlebrown': '#8b4513', 'salmon': '#fa8072', 'sandybrown': '#f4a460', 'seagreen': '#2e8b57',
            'seashell': '#fff5ee', 'sienna': '#a0522d', 'silver': '#c0c0c0', 'skyblue': '#87ceeb',
            'slateblue': '#6a5acd', 'slategray': '#708090', 'snow': '#fffafa', 'springgreen': '#00ff7f',
            'tan': '#d2b48c', 'teal': '#008080', 'thistle': '#d8bfd8', 'tomato': '#ff6347', 'turquoise': '#40e0d0'
        };
        if (typeof colours[colour.toLowerCase()] !== 'undefined') {
            return colours[colour.toLowerCase()];
        }
        return '';
    };
    // eslint-disable-next-line
    Annotation.prototype.updateFreeTextFontStyle = function (font) {
        // eslint-disable-next-line
        var fontStyle = 0;
        if (font.isBold === 1) {
            fontStyle = 1;
        }
        else if (font.isItalic === 2) {
            fontStyle = 2;
        }
        else if (font.isUnderline === 4) {
            fontStyle = 4;
        }
        else if (font.isStrikeout === 8) {
            fontStyle = 8;
        }
        else {
            fontStyle = { isBold: font.isBold, isItalic: font.isItalic, isUnderline: font.isUnderline, isStrikeout: font.isStrikeout };
        }
        return fontStyle;
    };
    // eslint-disable-next-line
    Annotation.prototype.setFreeTextFontStyle = function (fontStyle) {
        if (fontStyle === 1) {
            return { isBold: true };
        }
        else if (fontStyle === 2) {
            return { isItalic: true };
        }
        else if (fontStyle === 4) {
            return { isUnderline: true };
        }
        else if (fontStyle === 8) {
            return { isStrikeout: true };
        }
        else {
            return { isBold: fontStyle.isBold, isItalic: fontStyle.isItalic, isUnderline: fontStyle.isUnderline, isStrikeout: fontStyle.isStrikeout };
        }
    };
    /**
     * @param annotation
     * @param isSettings
     * @private
     */
    // eslint-disable-next-line
    Annotation.prototype.findAnnotationSettings = function (annotation, isSettings) {
        // eslint-disable-next-line
        var annotSettings = this.pdfViewer.annotationSettings;
        if (annotation) {
            // eslint-disable-next-line
            var shapeType = annotation.shapeAnnotationType;
            if (shapeType === 'StickyNotes' && this.pdfViewer.stickyNotesSettings) {
                annotSettings = this.pdfViewer.stickyNotesSettings;
            }
            else if (shapeType === 'Stamp' || shapeType === 'Image') {
                annotSettings = this.pdfViewer.stampSettings;
                // eslint-disable-next-line max-len
                if ((shapeType === 'image' || shapeType === 'Image')) {
                    annotSettings = this.pdfViewer.customStampSettings;
                }
            }
            else if (shapeType === 'FreeText') {
                annotSettings = this.pdfViewer.freeTextSettings;
            }
            else if (annotation.measureType === '') {
                if (shapeType === 'Line') {
                    annotSettings = this.pdfViewer.lineSettings;
                    // eslint-disable-next-line max-len
                }
                else if ((shapeType === 'Arrow' || shapeType === 'LineWidthArrowHead')) {
                    annotSettings = this.pdfViewer.arrowSettings;
                }
                else if (shapeType === 'Rectangle') {
                    annotSettings = this.pdfViewer.rectangleSettings;
                    // eslint-disable-next-line max-len
                }
                else if ((shapeType === 'Circle' || shapeType === 'Ellipse')) {
                    annotSettings = this.pdfViewer.circleSettings;
                }
                else if (shapeType === 'Polygon' && this.pdfViewer.polygonSettings) {
                    annotSettings = this.pdfViewer.polygonSettings;
                }
            }
            else if (annotation.measureType !== '') {
                if (annotation.measureType === 'Distance') {
                    annotSettings = this.pdfViewer.distanceSettings;
                }
                else if (annotation.measureType === 'Perimeter') {
                    annotSettings = this.pdfViewer.perimeterSettings;
                }
                else if (annotation.measureType === 'Area') {
                    annotSettings = this.pdfViewer.areaSettings;
                }
                else if (annotation.measureType === 'Radius') {
                    annotSettings = this.pdfViewer.radiusSettings;
                }
                else if (annotation.measureType === 'Volume') {
                    annotSettings = this.pdfViewer.volumeSettings;
                }
            }
        }
        var settings = annotation ? annotation.annotationSettings : {};
        if (settings && (settings.minWidth || settings.maxWidth || settings.minHeight || settings.maxHeight)) {
            return this.updateSettings(settings);
        }
        else if (isSettings) {
            return this.updateSettings(annotSettings);
        }
        else {
            return annotSettings;
        }
    };
    /**
     * @param annotation
     * @private
     */
    // eslint-disable-next-line
    Annotation.prototype.updateAnnotationSettings = function (annotation) {
        // eslint-disable-next-line
        var annotSettings = this.pdfViewer.annotationSettings;
        if (annotation.AnnotType === 'sticky') {
            annotSettings = this.pdfViewer.stickyNotesSettings;
        }
        else if (annotation.AnnotType === 'stamp' || annotation.AnnotType === 'image' || annotation.AnnotType === 'Image') {
            annotSettings = this.pdfViewer.stampSettings;
            // eslint-disable-next-line max-len
            if ((annotation.Subject === 'image' || annotation.Subject === 'Image')) {
                annotSettings = this.pdfViewer.customStampSettings;
            }
        }
        else if (annotation.AnnotType === 'freeText') {
            annotSettings = this.pdfViewer.freeTextSettings;
        }
        else if (annotation.AnnotType === 'ink') {
            annotSettings = this.pdfViewer.inkAnnotationSettings;
        }
        else if (annotation.AnnotType === 'shape') {
            if (annotation.Subject === 'Line') {
                annotSettings = this.pdfViewer.lineSettings;
                // eslint-disable-next-line max-len
            }
            else if ((annotation.Subject === 'Arrow' || annotation.Subject === 'LineWidthArrowHead')) {
                annotSettings = this.pdfViewer.arrowSettings;
                // eslint-disable-next-line max-len
            }
            else if ((annotation.Subject === 'Rectangle' || annotation.Subject === 'Square')) {
                annotSettings = this.pdfViewer.rectangleSettings;
                // eslint-disable-next-line max-len
            }
            else if ((annotation.Subject === 'Circle' || annotation.Subject === 'Ellipse' || annotation.Subject === 'Oval')) {
                annotSettings = this.pdfViewer.circleSettings;
            }
            else if (annotation.Subject === 'Polygon') {
                annotSettings = this.pdfViewer.polygonSettings;
            }
        }
        else if (annotation.AnnotType === 'shape_measure') {
            // eslint-disable-next-line max-len
            if ((annotation.Subject === 'Distance' || annotation.Subject === 'Distance calculation')) {
                annotSettings = this.pdfViewer.distanceSettings;
                // eslint-disable-next-line max-len
            }
            else if ((annotation.Subject === 'Perimeter' || annotation.Subject === 'Perimeter calculation')) {
                annotSettings = this.pdfViewer.perimeterSettings;
                // eslint-disable-next-line max-len
            }
            else if ((annotation.Subject === 'Area' || annotation.Subject === 'Area calculation')) {
                annotSettings = this.pdfViewer.areaSettings;
                // eslint-disable-next-line max-len
            }
            else if ((annotation.Subject === 'Radius' || annotation.Subject === 'Radius calculation')) {
                annotSettings = this.pdfViewer.radiusSettings;
                // eslint-disable-next-line max-len
            }
            else if ((annotation.Subject === 'Volume' || annotation.Subject === 'Volume calculation')) {
                annotSettings = this.pdfViewer.volumeSettings;
            }
        }
        return this.updateSettings(annotSettings);
    };
    /**
     * @param annotationSettings
     * @private
     */
    // eslint-disable-next-line
    Annotation.prototype.updateSettings = function (annotationSettings) {
        var maxHeight = 0;
        var maxWidth = 0;
        var minHeight = 0;
        var minWidth = 0;
        var isLock = false;
        var isPrint = true;
        // eslint-disable-next-line
        var settings = this.pdfViewer.annotationSettings;
        if (annotationSettings.minWidth || annotationSettings.maxWidth || annotationSettings.minHeight || annotationSettings.maxHeight) {
            maxHeight = annotationSettings.maxHeight ? annotationSettings.maxHeight : 2000;
            maxWidth = annotationSettings.maxWidth ? annotationSettings.maxWidth : 2000;
            minHeight = annotationSettings.minHeight ? annotationSettings.minHeight : 0;
            minWidth = annotationSettings.minWidth ? annotationSettings.minWidth : 0;
        }
        else if (settings.minWidth || settings.maxWidth || settings.minHeight || settings.maxHeight) {
            maxHeight = settings.maxHeight ? settings.maxHeight : 2000;
            maxWidth = settings.maxWidth ? settings.maxWidth : 2000;
            minHeight = settings.minHeight ? settings.minHeight : 0;
            minWidth = settings.minWidth ? settings.minWidth : 0;
        }
        isLock = annotationSettings.isLock ? annotationSettings.isLock : settings.isLock ? settings.isLock : false;
        isPrint = annotationSettings.isPrint;
        return { minWidth: minWidth, maxWidth: maxWidth, minHeight: minHeight, maxHeight: maxHeight, isLock: isLock, isPrint: isPrint };
    };
    // eslint-disable-next-line
    Annotation.prototype.getOverlappedAnnotations = function (annotation, pageNumber) {
        // eslint-disable-next-line
        var pageCollections = this.getPageShapeAnnotations(pageNumber);
        // eslint-disable-next-line
        var selectedAnnotation;
        for (var i = 0; i < pageCollections.length; i++) {
            if (annotation.annotName === pageCollections[i].annotName) {
                selectedAnnotation = pageCollections[i];
                break;
            }
        }
        // eslint-disable-next-line
        var annotationCollection = this.findOverlappedAnnotations(selectedAnnotation, pageCollections);
        return annotationCollection;
    };
    // eslint-disable-next-line
    Annotation.prototype.getPageShapeAnnotations = function (pageNumber) {
        // eslint-disable-next-line
        var pageCollections = [];
        // eslint-disable-next-line
        var inkObject = window.sessionStorage.getItem(this.pdfViewerBase.documentId + '_annotations_ink');
        if (inkObject) {
            var inkAnnotObject = JSON.parse(inkObject);
            if (inkAnnotObject) {
                var index = this.getPageCollection(inkAnnotObject, pageNumber);
                if (inkAnnotObject[index]) {
                    // eslint-disable-next-line
                    var inkAnnotations = inkAnnotObject[index].annotations;
                    if (inkAnnotations && inkAnnotations.length > 0) {
                        for (var i = 0; i < inkAnnotations.length; i++) {
                            pageCollections.push(inkAnnotations[i]);
                        }
                    }
                }
            }
        }
        // eslint-disable-next-line
        var shapeObject = window.sessionStorage.getItem(this.pdfViewerBase.documentId + '_annotations_shape');
        if (shapeObject) {
            var shapeAnnotObject = JSON.parse(shapeObject);
            if (shapeAnnotObject) {
                var index = this.getPageCollection(shapeAnnotObject, pageNumber);
                if (shapeAnnotObject[index]) {
                    // eslint-disable-next-line
                    var shapeAnnotations = shapeAnnotObject[index].annotations;
                    if (shapeAnnotations && shapeAnnotations.length > 0) {
                        for (var i = 0; i < shapeAnnotations.length; i++) {
                            pageCollections.push(shapeAnnotations[i]);
                        }
                    }
                }
            }
        }
        // eslint-disable-next-line
        var measureObject = window.sessionStorage.getItem(this.pdfViewerBase.documentId + '_annotations_shape_measure');
        if (measureObject) {
            var measureAnnotationObject = JSON.parse(measureObject);
            if (measureAnnotationObject) {
                var index = this.getPageCollection(measureAnnotationObject, pageNumber);
                if (measureAnnotationObject[index]) {
                    // eslint-disable-next-line
                    var measureAnnotations = measureAnnotationObject[index].annotations;
                    if (measureAnnotations && measureAnnotations.length > 0) {
                        for (var i = 0; i < measureAnnotations.length; i++) {
                            pageCollections.push(measureAnnotations[i]);
                        }
                    }
                }
            }
        }
        // eslint-disable-next-line
        var stampObject = window.sessionStorage.getItem(this.pdfViewerBase.documentId + '_annotations_stamp');
        if (stampObject) {
            var stampAnnotationObject = JSON.parse(stampObject);
            if (stampAnnotationObject) {
                var index = this.getPageCollection(stampAnnotationObject, pageNumber);
                if (stampAnnotationObject[index]) {
                    // eslint-disable-next-line
                    var stampAnnotations = stampAnnotationObject[index].annotations;
                    if (stampAnnotations && stampAnnotations.length > 0) {
                        for (var i = 0; i < stampAnnotations.length; i++) {
                            pageCollections.push(stampAnnotations[i]);
                        }
                    }
                }
            }
        }
        // eslint-disable-next-line
        var freeTextObject = window.sessionStorage.getItem(this.pdfViewerBase.documentId + '_annotations_freetext');
        if (freeTextObject) {
            var freeTextAnnotationObject = JSON.parse(freeTextObject);
            if (freeTextAnnotationObject) {
                var index = this.getPageCollection(freeTextAnnotationObject, pageNumber);
                if (freeTextAnnotationObject[index]) {
                    // eslint-disable-next-line
                    var freeTextAnnotations = freeTextAnnotationObject[index].annotations;
                    if (freeTextAnnotations && freeTextAnnotations.length > 0) {
                        for (var i = 0; i < freeTextAnnotations.length; i++) {
                            pageCollections.push(freeTextAnnotations[i]);
                        }
                    }
                }
            }
        }
        // eslint-disable-next-line
        var stickyObject = window.sessionStorage.getItem(this.pdfViewerBase.documentId + '_annotations_sticky');
        if (stickyObject) {
            var stickyNotesAnnotationObject = JSON.parse(stickyObject);
            if (stickyNotesAnnotationObject) {
                var index = this.getPageCollection(stickyNotesAnnotationObject, pageNumber);
                if (stickyNotesAnnotationObject[index]) {
                    // eslint-disable-next-line
                    var stickyNotesAnnotations = stickyNotesAnnotationObject[index].annotations;
                    if (stickyNotesAnnotations && stickyNotesAnnotations.length > 0) {
                        for (var i = 0; i < stickyNotesAnnotations.length; i++) {
                            pageCollections.push(stickyNotesAnnotations[i]);
                        }
                    }
                }
            }
        }
        // eslint-disable-next-line
        var textMarkupObject = window.sessionStorage.getItem(this.pdfViewerBase.documentId + '_annotations_textMarkup');
        if (textMarkupObject) {
            var textMarkupAnnotationObject = JSON.parse(textMarkupObject);
            if (textMarkupAnnotationObject) {
                var index = this.getPageCollection(textMarkupAnnotationObject, pageNumber);
                if (textMarkupAnnotationObject[index]) {
                    // eslint-disable-next-line
                    var textMarkupAnnotations = textMarkupAnnotationObject[index].annotations;
                    if (textMarkupAnnotations && textMarkupAnnotations.length > 0) {
                        for (var i = 0; i < textMarkupAnnotations.length; i++) {
                            pageCollections.push(textMarkupAnnotations[i]);
                        }
                    }
                }
            }
        }
        return pageCollections;
    };
    // eslint-disable-next-line
    Annotation.prototype.findOverlappedAnnotations = function (annotation, pageCollections) {
        this.overlappedAnnotations = [];
        if (annotation && annotation.bounds) {
            if (annotation.shapeAnnotationType === 'textMarkup') {
                for (var i = 0; i < annotation.bounds.length; i++) {
                    // eslint-disable-next-line
                    var bounds = this.orderTextMarkupBounds(annotation.bounds[i]);
                    this.calculateOverlappedAnnotationBounds(annotation, bounds, pageCollections);
                }
            }
            else {
                this.calculateOverlappedAnnotationBounds(annotation, annotation.bounds, pageCollections);
            }
        }
        return this.overlappedAnnotations;
    };
    // eslint-disable-next-line
    Annotation.prototype.calculateOverlappedAnnotationBounds = function (annotation, bounds, pageCollections) {
        // eslint-disable-next-line
        var selectBounds = bounds;
        if (annotation.shapeAnnotationType === 'Ink') {
            selectBounds = { left: bounds.x, top: bounds.y, height: bounds.height, width: bounds.width };
        }
        // eslint-disable-next-line
        var left = parseInt(selectBounds.left);
        // eslint-disable-next-line
        var top = parseInt(selectBounds.top);
        // eslint-disable-next-line
        var totalHeight = parseInt(selectBounds.top + selectBounds.height);
        // eslint-disable-next-line
        var totalWidth = parseInt(selectBounds.left + selectBounds.width);
        for (var i = 0; i < pageCollections.length; i++) {
            if (annotation.annotName === pageCollections[i].annotName) {
                this.checkOverlappedCollections(pageCollections[i], this.overlappedAnnotations);
            }
            else {
                var boundsCount = 1;
                if (pageCollections[i].shapeAnnotationType === 'textMarkup') {
                    boundsCount = pageCollections[i].bounds.length;
                }
                for (var j = 0; j < boundsCount; j++) {
                    // eslint-disable-next-line
                    var annotationBounds = void 0;
                    // eslint-disable-next-line
                    var annotationBoundsCollection = pageCollections[i].bounds;
                    if (pageCollections[i].shapeAnnotationType === 'Ink') {
                        // eslint-disable-next-line
                        annotationBoundsCollection = { left: annotationBoundsCollection.x, top: annotationBoundsCollection.y, height: annotationBoundsCollection.height, width: annotationBoundsCollection.width };
                    }
                    if (pageCollections[i].shapeAnnotationType !== 'textMarkup' && boundsCount === 1) {
                        annotationBounds = annotationBoundsCollection;
                    }
                    else {
                        // eslint-disable-next-line
                        annotationBounds = this.orderTextMarkupBounds(annotationBoundsCollection[j]);
                    }
                    if (annotationBounds) {
                        var isOverlapped = false;
                        // eslint-disable-next-line
                        if (((left <= parseInt(annotationBounds.left)) && (totalWidth >= parseInt(annotationBounds.left))) || ((left <= parseInt(annotationBounds.left + annotationBounds.width)) && (totalWidth >= parseInt(annotationBounds.left + annotationBounds.width)))) {
                            isOverlapped = true;
                        }
                        if (isOverlapped) {
                            // eslint-disable-next-line
                            if (((top <= parseInt(annotationBounds.top)) && (totalHeight >= parseInt(annotationBounds.top))) || ((top <= parseInt(annotationBounds.top + annotationBounds.height)) && (totalHeight >= parseInt(annotationBounds.top + annotationBounds.height)))) {
                                isOverlapped = true;
                            }
                            else {
                                isOverlapped = false;
                            }
                        }
                        if (isOverlapped) {
                            this.checkOverlappedCollections(pageCollections[i], this.overlappedAnnotations);
                        }
                        else {
                            // eslint-disable-next-line
                            if (((parseInt(annotationBounds.left) <= left) && (parseInt(annotationBounds.left + annotationBounds.width) >= left)) || ((totalWidth >= parseInt(annotationBounds.left)) && (totalWidth <= parseInt(annotationBounds.left + annotationBounds.width)))) {
                                isOverlapped = true;
                            }
                            if (isOverlapped) {
                                // eslint-disable-next-line
                                if (((parseInt(annotationBounds.top) <= top) && parseInt(annotationBounds.top + annotationBounds.height) >= top) || ((totalHeight >= parseInt(annotationBounds.top)) && (totalHeight <= parseInt(annotationBounds.top + annotationBounds.height)))) {
                                    isOverlapped = true;
                                }
                                else {
                                    isOverlapped = false;
                                }
                            }
                            if (isOverlapped) {
                                this.checkOverlappedCollections(pageCollections[i], this.overlappedAnnotations);
                            }
                            else {
                                // eslint-disable-next-line
                                if (((left <= parseInt(annotationBounds.left)) && (totalWidth >= parseInt(annotationBounds.left))) || ((left <= parseInt(annotationBounds.left + annotationBounds.width)) && (totalWidth >= parseInt(annotationBounds.left + annotationBounds.width)))) {
                                    isOverlapped = true;
                                }
                                if (isOverlapped) {
                                    // eslint-disable-next-line
                                    if (((parseInt(annotationBounds.top) <= top) && parseInt(annotationBounds.top + annotationBounds.height) >= top) || ((totalHeight >= parseInt(annotationBounds.top)) && (totalHeight <= parseInt(annotationBounds.top + annotationBounds.height)))) {
                                        isOverlapped = true;
                                    }
                                    else {
                                        isOverlapped = false;
                                    }
                                }
                                if (isOverlapped) {
                                    this.checkOverlappedCollections(pageCollections[i], this.overlappedAnnotations);
                                }
                                else {
                                    // eslint-disable-next-line
                                    if (((parseInt(annotationBounds.left) <= left) && (parseInt(annotationBounds.left + annotationBounds.width) >= left)) || ((totalWidth >= parseInt(annotationBounds.left)) && (totalWidth <= parseInt(annotationBounds.left + annotationBounds.width)))) {
                                        isOverlapped = true;
                                    }
                                    if (isOverlapped) {
                                        // eslint-disable-next-line
                                        if (((top <= parseInt(annotationBounds.top)) && (totalHeight >= parseInt(annotationBounds.top))) || ((top <= parseInt(annotationBounds.top + annotationBounds.height)) && (totalHeight >= parseInt(annotationBounds.top + annotationBounds.height)))) {
                                            isOverlapped = true;
                                        }
                                        else {
                                            isOverlapped = false;
                                        }
                                    }
                                    if (isOverlapped) {
                                        this.checkOverlappedCollections(pageCollections[i], this.overlappedAnnotations);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    /**
     * @param annotation
     * @param pageNumber
     * @param type
     * @param annotation
     * @param pageNumber
     * @param type
     * @private
     */
    // eslint-disable-next-line
    Annotation.prototype.findAnnotationMode = function (annotation, pageNumber, type) {
        // eslint-disable-next-line
        var importCollection = this.pdfViewer.viewerBase.importedAnnotation[pageNumber];
        if (importCollection) {
            // eslint-disable-next-line
            var collection = void 0;
            if (type === 'shape') {
                collection = importCollection.shapeAnnotation;
            }
            else if (type === 'shape_measure') {
                collection = importCollection.measureShapeAnnotation;
            }
            else if (type === 'freeText') {
                collection = importCollection.freeTextAnnotation;
            }
            else if (type === 'stamp') {
                collection = importCollection.stampAnnotations;
            }
            else if (type === 'sticky') {
                collection = importCollection.stickyNotesAnnotation;
            }
            else if (type === 'textMarkup') {
                collection = importCollection.textMarkupAnnotation;
            }
            if (collection) {
                for (var i = 0; i < collection.length; i++) {
                    if (collection[i].AnnotName === annotation.AnnotName) {
                        return 'Imported Annotation';
                    }
                }
            }
        }
        return 'Existing Annotation';
    };
    // eslint-disable-next-line
    Annotation.prototype.checkOverlappedCollections = function (annotation, overlappedCollections) {
        if (overlappedCollections.length > 0) {
            var isAdded = false;
            for (var i = 0; i < overlappedCollections.length; i++) {
                if (annotation.annotName === overlappedCollections[i].annotName && annotation.bounds === overlappedCollections[i].bounds) {
                    isAdded = true;
                    break;
                }
            }
            if (!isAdded) {
                overlappedCollections.push(annotation);
            }
        }
        else {
            overlappedCollections.push(annotation);
        }
    };
    // eslint-disable-next-line
    Annotation.prototype.orderTextMarkupBounds = function (bounds) {
        if (bounds.Left || bounds.Width) {
            return { left: bounds.Left, top: bounds.Top, height: bounds.Height, width: bounds.Width };
        }
        else {
            return { left: bounds.left, top: bounds.top, height: bounds.height, width: bounds.width };
        }
    };
    /**
     * @param annotation
     * @private
     */
    // eslint-disable-next-line
    Annotation.prototype.updateModifiedDate = function (annotation) {
        if (annotation.modifiedDate) {
            annotation.modifiedDate = this.setAnnotationModifiedDate(annotation.modifiedDate);
        }
        if (annotation.comments && annotation.comments.length > 0) {
            for (var i = 0; i < annotation.comments.length; i++) {
                if (annotation.comments[i].modifiedDate) {
                    annotation.comments[i].modifiedDate = this.setAnnotationModifiedDate(annotation.comments[i].modifiedDate);
                    if (annotation.comments[i].review && annotation.comments[i].review.modifiedDate) {
                        // eslint-disable-next-line max-len
                        annotation.comments[i].review.modifiedDate = this.setAnnotationModifiedDate(annotation.comments[i].review.modifiedDate);
                    }
                }
            }
        }
        if (annotation.review && annotation.review.modifiedDate) {
            annotation.review.modifiedDate = this.setAnnotationModifiedDate(annotation.review.modifiedDate);
        }
    };
    Annotation.prototype.setAnnotationModifiedDate = function (date) {
        var modifiedTime;
        var modifiedDateTime;
        if (date !== '') {
            // eslint-disable-next-line
            var time = parseInt(date.split(' ')[1].split(':')[0]);
            if (date.split(' ').length === 3) {
                // eslint-disable-next-line max-len
                modifiedTime = time + ':' + date.split(' ')[1].split(':')[1] + ':' + date.split(' ')[1].split(':')[2] + ' ' + date.split(' ')[2];
            }
            else {
                if (time >= 12) {
                    if (time === 12) {
                        modifiedTime = time + ':' + date.split(' ')[1].split(':')[1] + ':' + date.split(' ')[1].split(':')[2] + ' PM';
                    }
                    else {
                        // eslint-disable-next-line max-len
                        modifiedTime = (time - 12) + ':' + date.split(' ')[1].split(':')[1] + ':' + date.split(' ')[1].split(':')[2] + ' PM';
                    }
                }
                else {
                    modifiedTime = time + ':' + date.split(' ')[1].split(':')[1] + ':' + date.split(' ')[1].split(':')[2] + ' AM';
                }
            }
            // eslint-disable-next-line
            var dateString = date.split(' ')[0];
            // eslint-disable-next-line
            var dateStringSpilt = date.split(',');
            if (dateStringSpilt.length > 1) {
                modifiedDateTime = dateString + (' ') + modifiedTime;
            }
            else {
                modifiedDateTime = dateString + (', ') + modifiedTime;
            }
        }
        else {
            return date;
        }
        var modifiedDateToUTC = new Date(modifiedDateTime);
        modifiedDateTime = modifiedDateToUTC.toISOString();
        return modifiedDateTime;
    };
    /**
     * @private
     */
    Annotation.prototype.clear = function () {
        if (this.shapeAnnotationModule) {
            this.shapeAnnotationModule.shapeCount = 0;
        }
        if (this.measureAnnotationModule) {
            this.measureAnnotationModule.measureShapeCount = 0;
        }
        if (this.textMarkupAnnotationModule) {
            this.textMarkupAnnotationModule.clear();
        }
        if (this.stickyNotesAnnotationModule) {
            this.stickyNotesAnnotationModule.clear();
        }
        this.pdfViewer.refresh();
        this.undoCommentsElement = [];
        this.redoCommentsElement = [];
        this.overlappedAnnotations = [];
        this.previousIndex = null;
        // eslint-disable-next-line max-len
        if (this.pdfViewer.annotation && this.pdfViewer.annotation.stampAnnotationModule) {
            this.pdfViewer.annotation.stampAnnotationModule.stampPageNumber = [];
        }
        if (this.pdfViewer.annotation && this.pdfViewer.annotation.freeTextAnnotationModule) {
            this.pdfViewer.annotation.freeTextAnnotationModule.freeTextPageNumbers = [];
            this.freeTextAnnotationModule.previousText = 'Type Here';
        }
        if (this.pdfViewer.annotation && this.pdfViewer.annotation.inkAnnotationModule) {
            this.pdfViewer.annotation.inkAnnotationModule.inkAnnotationindex = [];
        }
        window.sessionStorage.removeItem(this.pdfViewerBase.documentId + '_annotations_shape');
        window.sessionStorage.removeItem(this.pdfViewerBase.documentId + '_annotations_shape_measure');
        window.sessionStorage.removeItem(this.pdfViewerBase.documentId + '_annotations_stamp');
        window.sessionStorage.removeItem(this.pdfViewerBase.documentId + '_annotations_sticky');
    };
    // eslint-disable-next-line
    Annotation.prototype.retrieveAnnotationCollection = function () {
        return this.pdfViewer.annotationCollection;
    };
    /**
     * @param interaction
     * @param annotation
     * @param interaction
     * @param annotation
     * @private
     */
    // eslint-disable-next-line
    Annotation.prototype.checkAllowedInteractions = function (interaction, annotation) {
        // eslint-disable-next-line
        var annotationInteraction = this.updateAnnotationAllowedInteractions(annotation);
        if (annotationInteraction && annotationInteraction.length > 0) {
            for (var i = 0; i < annotationInteraction.length; i++) {
                if (interaction === 'Select') {
                    // eslint-disable-next-line max-len
                    if (annotationInteraction[i] === 'Move' || annotationInteraction[i] === 'Resize' || annotationInteraction[i] === 'Delete' || annotationInteraction[i] === 'PropertyChange' || annotationInteraction[i] === 'Select') {
                        return true;
                    }
                }
                else {
                    if (annotationInteraction[i] === interaction) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    /**
     * @param menuObj
     * @private
     */
    // eslint-disable-next-line
    Annotation.prototype.checkContextMenuDeleteItem = function (menuObj) {
        // eslint-disable-next-line
        var annotation = this.findCurrentAnnotation();
        if (annotation && annotation.annotationSettings) {
            // eslint-disable-next-line
            if (annotation.annotationSettings.isLock) {
                if (this.checkAllowedInteractions('Delete', annotation)) {
                    menuObj.enableItems([this.pdfViewer.localeObj.getConstant('Delete Context')], true);
                }
                else {
                    menuObj.enableItems([this.pdfViewer.localeObj.getConstant('Delete Context')], false);
                }
            }
            else {
                menuObj.enableItems([this.pdfViewer.localeObj.getConstant('Delete Context')], true);
            }
        }
    };
    /**
     * @private
     */
    // eslint-disable-next-line
    Annotation.prototype.isEnableDelete = function () {
        // eslint-disable-next-line
        var annotation = this.findCurrentAnnotation();
        if (annotation && annotation.annotationSettings) {
            // eslint-disable-next-line
            if (annotation.annotationSettings.isLock) {
                if (this.checkAllowedInteractions('Delete', annotation)) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return true;
            }
        }
        return false;
    };
    /**
     * @private
     */
    // eslint-disable-next-line
    Annotation.prototype.findCurrentAnnotation = function () {
        if (this.textMarkupAnnotationModule && this.textMarkupAnnotationModule.currentTextMarkupAnnotation) {
            return this.textMarkupAnnotationModule.currentTextMarkupAnnotation;
        }
        if (this.pdfViewer.selectedItems.annotations && this.pdfViewer.selectedItems.annotations[0]) {
            return this.pdfViewer.selectedItems.annotations[0];
        }
    };
    /**
     * @param annotation
     * @private
     */
    // eslint-disable-next-line
    Annotation.prototype.updateAnnotationAllowedInteractions = function (annotation) {
        // eslint-disable-next-line
        var annotationInteraction = ['None'];
        if (annotation) {
            if (annotation.shapeAnnotationType === 'FreeText' && this.pdfViewer.freeTextSettings.allowedInteractions) {
                // eslint-disable-next-line max-len
                annotationInteraction = this.checkAllowedInteractionSettings(this.pdfViewer.freeTextSettings.allowedInteractions, annotation.allowedInteractions);
            }
            else if (annotation.shapeAnnotationType === 'Ink' && this.pdfViewer.inkAnnotationSettings.allowedInteractions) {
                // eslint-disable-next-line max-len
                annotationInteraction = this.checkAllowedInteractionSettings(this.pdfViewer.inkAnnotationSettings.allowedInteractions, annotation.allowedInteractions);
            }
            else if (annotation.shapeAnnotationType === 'StickyNotes' && this.pdfViewer.stickyNotesSettings.allowedInteractions) {
                // eslint-disable-next-line max-len
                annotationInteraction = this.checkAllowedInteractionSettings(this.pdfViewer.stickyNotesSettings.allowedInteractions, annotation.allowedInteractions);
            }
            else if (annotation.shapeAnnotationType === 'Stamp' && this.pdfViewer.stampSettings.allowedInteractions) {
                // eslint-disable-next-line max-len
                annotationInteraction = this.checkAllowedInteractionSettings(this.pdfViewer.stampSettings.allowedInteractions, annotation.allowedInteractions);
            }
            else if (annotation.shapeAnnotationType === 'Image' && this.pdfViewer.customStampSettings.allowedInteractions) {
                // eslint-disable-next-line max-len
                annotationInteraction = this.checkAllowedInteractionSettings(this.pdfViewer.customStampSettings.allowedInteractions, annotation.allowedInteractions);
            }
            else if (annotation.shapeAnnotationType === 'textMarkup') {
                if (annotation.textMarkupAnnotationType === 'Highlight' && this.pdfViewer.highlightSettings.allowedInteractions) {
                    // eslint-disable-next-line max-len
                    annotationInteraction = this.checkAllowedInteractionSettings(this.pdfViewer.highlightSettings.allowedInteractions, annotation.allowedInteractions);
                }
                else if (annotation.textMarkupAnnotationType === 'Underline' && this.pdfViewer.underlineSettings.allowedInteractions) {
                    // eslint-disable-next-line max-len
                    annotationInteraction = this.checkAllowedInteractionSettings(this.pdfViewer.underlineSettings.allowedInteractions, annotation.allowedInteractions);
                }
                else if (annotation.textMarkupAnnotationType === 'Strikethrough' && this.pdfViewer.strikethroughSettings.allowedInteractions) {
                    // eslint-disable-next-line max-len
                    annotationInteraction = this.checkAllowedInteractionSettings(this.pdfViewer.strikethroughSettings.allowedInteractions, annotation.allowedInteractions);
                }
            }
            else {
                if (annotation.measureType !== '') {
                    if (annotation.measureType === 'Distance' && this.pdfViewer.distanceSettings.allowedInteractions) {
                        // eslint-disable-next-line max-len
                        annotationInteraction = this.checkAllowedInteractionSettings(this.pdfViewer.distanceSettings.allowedInteractions, annotation.allowedInteractions);
                    }
                    else if (annotation.measureType === 'Perimeter' && this.pdfViewer.perimeterSettings.allowedInteractions) {
                        // eslint-disable-next-line max-len
                        annotationInteraction = this.checkAllowedInteractionSettings(this.pdfViewer.perimeterSettings.allowedInteractions, annotation.allowedInteractions);
                    }
                    else if (annotation.measureType === 'Radius' && this.pdfViewer.radiusSettings.allowedInteractions) {
                        // eslint-disable-next-line max-len
                        annotationInteraction = this.checkAllowedInteractionSettings(this.pdfViewer.radiusSettings.allowedInteractions, annotation.allowedInteractions);
                    }
                    else if (annotation.measureType === 'Area' && this.pdfViewer.areaSettings.allowedInteractions) {
                        // eslint-disable-next-line max-len
                        annotationInteraction = this.checkAllowedInteractionSettings(this.pdfViewer.areaSettings.allowedInteractions, annotation.allowedInteractions);
                    }
                    else if (annotation.measureType === 'Volume' && this.pdfViewer.volumeSettings.allowedInteractions) {
                        // eslint-disable-next-line max-len
                        annotationInteraction = this.checkAllowedInteractionSettings(this.pdfViewer.volumeSettings.allowedInteractions, annotation.allowedInteractions);
                    }
                }
                else {
                    if (annotation.shapeAnnotationType === 'Line' && this.pdfViewer.lineSettings.allowedInteractions) {
                        // eslint-disable-next-line max-len
                        annotationInteraction = this.checkAllowedInteractionSettings(this.pdfViewer.lineSettings.allowedInteractions, annotation.allowedInteractions);
                        // eslint-disable-next-line max-len
                    }
                    else if ((annotation.shapeAnnotationType === 'Arrow' || annotation.shapeAnnotationType === 'LineWidthArrowHead') && this.pdfViewer.arrowSettings.allowedInteractions) {
                        // eslint-disable-next-line max-len
                        annotationInteraction = this.checkAllowedInteractionSettings(this.pdfViewer.arrowSettings.allowedInteractions, annotation.allowedInteractions);
                        // eslint-disable-next-line max-len
                    }
                    else if ((annotation.shapeAnnotationType === 'Circle' || annotation.shapeAnnotationType === 'Ellipse' || annotation.shapeAnnotationType === 'Oval') && this.pdfViewer.circleSettings.allowedInteractions) {
                        // eslint-disable-next-line max-len
                        annotationInteraction = this.checkAllowedInteractionSettings(this.pdfViewer.circleSettings.allowedInteractions, annotation.allowedInteractions);
                    }
                    else if ((annotation.shapeAnnotationType === 'Rectangle' || annotation.shapeAnnotationType === 'Square') && this.pdfViewer.rectangleSettings.allowedInteractions) {
                        // eslint-disable-next-line max-len
                        annotationInteraction = this.checkAllowedInteractionSettings(this.pdfViewer.rectangleSettings.allowedInteractions, annotation.allowedInteractions);
                    }
                    else if (annotation.shapeAnnotationType === 'Polygon' && this.pdfViewer.polygonSettings.allowedInteractions) {
                        // eslint-disable-next-line max-len
                        annotationInteraction = this.checkAllowedInteractionSettings(this.pdfViewer.polygonSettings.allowedInteractions, annotation.allowedInteractions);
                    }
                }
            }
        }
        return annotationInteraction;
    };
    /**
     * @param annotation
     * @private
     */
    // eslint-disable-next-line
    Annotation.prototype.checkIsLockSettings = function (annotation) {
        // eslint-disable-next-line
        var isLocked = false;
        if (annotation) {
            if (annotation.shapeAnnotationType === 'FreeText') {
                isLocked = this.checkLockSettings(this.pdfViewer.freeTextSettings.isLock);
            }
            else if (annotation.shapeAnnotationType === 'Ink') {
                // eslint-disable-next-line max-len
                isLocked = this.checkLockSettings(this.pdfViewer.inkAnnotationSettings.isLock);
            }
            else if (annotation.shapeAnnotationType === 'StickyNotes') {
                isLocked = this.checkLockSettings(this.pdfViewer.stickyNotesSettings.isLock);
            }
            else if (annotation.shapeAnnotationType === 'Stamp') {
                isLocked = this.checkLockSettings(this.pdfViewer.stampSettings.isLock);
            }
            else if (annotation.shapeAnnotationType === 'Image') {
                isLocked = this.checkLockSettings(this.pdfViewer.customStampSettings.isLock);
            }
            else if (annotation.shapeAnnotationType === 'textMarkup') {
                if (annotation.textMarkupAnnotationType === 'Highlight') {
                    // eslint-disable-next-line max-len
                    isLocked = this.checkLockSettings(this.pdfViewer.highlightSettings.isLock);
                }
                else if (annotation.textMarkupAnnotationType === 'Underline') {
                    // eslint-disable-next-line max-len
                    isLocked = this.checkLockSettings(this.pdfViewer.underlineSettings.isLock);
                }
                else if (annotation.textMarkupAnnotationType === 'Strikethrough') {
                    // eslint-disable-next-line max-len
                    isLocked = this.checkLockSettings(this.pdfViewer.strikethroughSettings.isLock);
                }
            }
            else {
                if (annotation.measureType !== '') {
                    if (annotation.measureType === 'Distance') {
                        // eslint-disable-next-line max-len
                        isLocked = this.checkLockSettings(this.pdfViewer.distanceSettings.isLock);
                    }
                    else if (annotation.measureType === 'Perimeter') {
                        // eslint-disable-next-line max-len
                        isLocked = this.checkLockSettings(this.pdfViewer.perimeterSettings.isLock);
                    }
                    else if (annotation.measureType === 'Radius') {
                        // eslint-disable-next-line max-len
                        isLocked = this.checkLockSettings(this.pdfViewer.radiusSettings.isLock);
                    }
                    else if (annotation.measureType === 'Area') {
                        // eslint-disable-next-line max-len
                        isLocked = this.checkLockSettings(this.pdfViewer.areaSettings.isLock);
                    }
                    else if (annotation.measureType === 'Volume') {
                        // eslint-disable-next-line max-len
                        isLocked = this.checkLockSettings(this.pdfViewer.volumeSettings.isLock);
                    }
                }
                else {
                    if (annotation.shapeAnnotationType === 'Line') {
                        // eslint-disable-next-line max-len
                        isLocked = this.checkLockSettings(this.pdfViewer.lineSettings.isLock);
                        // eslint-disable-next-line max-len
                    }
                    else if ((annotation.shapeAnnotationType === 'Arrow' || annotation.shapeAnnotationType === 'LineWidthArrowHead')) {
                        // eslint-disable-next-line max-len
                        isLocked = this.checkLockSettings(this.pdfViewer.arrowSettings.isLock);
                        // eslint-disable-next-line max-len
                    }
                    else if ((annotation.shapeAnnotationType === 'Circle' || annotation.shapeAnnotationType === 'Ellipse' || annotation.shapeAnnotationType === 'Oval')) {
                        // eslint-disable-next-line max-len
                        isLocked = this.checkLockSettings(this.pdfViewer.circleSettings.isLock);
                    }
                    else if ((annotation.shapeAnnotationType === 'Rectangle' || annotation.shapeAnnotationType === 'Square')) {
                        // eslint-disable-next-line max-len
                        isLocked = this.checkLockSettings(this.pdfViewer.rectangleSettings.isLock);
                    }
                    else if (annotation.shapeAnnotationType === 'Polygon') {
                        // eslint-disable-next-line max-len
                        isLocked = this.checkLockSettings(this.pdfViewer.polygonSettings.isLock);
                    }
                }
            }
        }
        return isLocked;
    };
    // eslint-disable-next-line
    Annotation.prototype.checkLockSettings = function (locked) {
        var islock = false;
        if (locked || this.pdfViewer.annotationSettings.isLock) {
            islock = true;
        }
        return islock;
    };
    /**
     * @private
     */
    // eslint-disable-next-line
    Annotation.prototype.restrictContextMenu = function () {
        // eslint-disable-next-line
        var isRestrict = false;
        // eslint-disable-next-line
        var annotation = this.findCurrentAnnotation();
        if (annotation && this.checkIsLockSettings(annotation) && this.checkAllowedInteractions('Select', annotation)) {
            isRestrict = true;
        }
        return isRestrict;
    };
    // eslint-disable-next-line
    Annotation.prototype.checkAllowedInteractionSettings = function (annotationInteraction, annotationAllowedInteraction) {
        if (annotationAllowedInteraction) {
            if (annotationAllowedInteraction.length === 1) {
                if (annotationAllowedInteraction[0] !== 'None') {
                    return annotationAllowedInteraction;
                }
            }
            else {
                return annotationAllowedInteraction;
            }
        }
        if (annotationInteraction) {
            if (annotationInteraction.length === 1) {
                if (annotationInteraction[0] !== 'None') {
                    return annotationInteraction;
                }
            }
            else {
                return annotationInteraction;
            }
        }
        if (this.pdfViewer.annotationSettings.allowedInteractions) {
            return this.pdfViewer.annotationSettings.allowedInteractions;
        }
        return ['None'];
    };
    /**
     * @param value
     * @param type
     * @param value
     * @param type
     * @private
     */
    Annotation.prototype.getValue = function (value, type) {
        type = !type ? 'hex' : type.toLowerCase();
        if (value[0] === 'r') {
            var cValue = this.convertRgbToNumberArray(value);
            if (type === 'hex' || type === 'hexa') {
                var hex = this.rgbToHex(cValue);
                return type === 'hex' ? hex.slice(0, 7) : hex;
            }
            else {
                if (type === 'hsv') {
                    return this.convertToHsvString(this.rgbToHsv.apply(this, cValue.slice(0, 3)));
                }
                else {
                    if (type === 'hsva') {
                        return this.convertToHsvString(this.rgbToHsv.apply(this, cValue));
                    }
                    else {
                        return 'null';
                    }
                }
            }
        }
        else {
            if (value[0] === 'h') {
                var cValue = this.hsvToRgb.apply(this, this.convertRgbToNumberArray(value));
                if (type === 'rgba') {
                    return this.convertToRgbString(cValue);
                }
                else {
                    if (type === 'hex' || type === 'hexa') {
                        var hex = this.rgbToHex(cValue);
                        return type === 'hex' ? hex.slice(0, 7) : hex;
                    }
                    else {
                        if (type === 'rgb') {
                            return this.convertToRgbString(cValue.slice(0, 3));
                        }
                        else {
                            return 'null';
                        }
                    }
                }
            }
            else {
                value = this.roundValue(value);
                var rgb = this.hexToRgb(value);
                if (type === 'rgb' || type === 'hsv') {
                    rgb = rgb.slice(0, 3);
                }
                if (type === 'rgba' || type === 'rgb') {
                    return this.convertToRgbString(rgb);
                }
                else {
                    if (type === 'hsva' || type === 'hsv') {
                        return this.convertToHsvString(this.rgbToHsv.apply(this, rgb));
                    }
                    else {
                        if (type === 'hex') {
                            return value.slice(0, 7);
                        }
                        else {
                            if (type === 'a') {
                                return rgb[3].toString();
                            }
                            else {
                                return 'null';
                            }
                        }
                    }
                }
            }
        }
    };
    Annotation.prototype.convertRgbToNumberArray = function (value) {
        // eslint-disable-next-line max-len
        return (value.slice(value.indexOf('(') + 1, value.indexOf(')'))).split(',').map(function (n, i) {
            return (i !== 3) ? parseInt(n, 10) : parseFloat(n);
        });
    };
    Annotation.prototype.convertToRgbString = function (rgb) {
        return rgb.length ? rgb.length === 4 ? 'rgba(' + rgb.join() + ')' : 'rgb(' + rgb.join() + ')' : '';
    };
    Annotation.prototype.convertToHsvString = function (hsv) {
        return hsv.length === 4 ? 'hsva(' + hsv.join() + ')' : 'hsv(' + hsv.join() + ')';
    };
    Annotation.prototype.roundValue = function (value) {
        if (!value) {
            return '';
        }
        if (value[0] !== '#') {
            value = '#' + value;
        }
        var len = value.length;
        if (len === 4) {
            value += 'f';
            len = 5;
        }
        if (len === 5) {
            var tempValue = '';
            for (var i = 1, len_1 = value.length; i < len_1; i++) {
                tempValue += (value.charAt(i) + value.charAt(i));
            }
            value = '#' + tempValue;
            len = 9;
        }
        if (len === 7) {
            value += 'ff';
        }
        return value;
    };
    Annotation.prototype.hexToRgb = function (hex) {
        if (!hex) {
            return [];
        }
        hex = hex.trim();
        if (hex.length !== 9) {
            hex = this.roundValue(hex);
        }
        var opacity = Number((parseInt(hex.slice(-2), 16) / 255).toFixed(2));
        hex = hex.slice(1, 7);
        var bigInt = parseInt(hex, 16);
        var h = [];
        h.push((bigInt >> 16) & 255);
        h.push((bigInt >> 8) & 255);
        h.push(bigInt & 255);
        h.push(opacity);
        return h;
    };
    Annotation.prototype.rgbToHsv = function (r, g, b, opacity) {
        r /= 255;
        g /= 255;
        b /= 255;
        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);
        var h;
        var s;
        var v = max;
        var d = max - min;
        s = max === 0 ? 0 : d / max;
        if (max === min) {
            h = 0;
        }
        else {
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        var hsv = [Math.round(h * 360), Math.round(s * 1000) / 10, Math.round(v * 1000) / 10];
        if (!isNullOrUndefined(opacity)) {
            hsv.push(opacity);
        }
        return hsv;
    };
    Annotation.prototype.hsvToRgb = function (h, s, v, opacity) {
        var r;
        var g;
        var b;
        var i;
        var f;
        var p;
        var q;
        var t;
        s /= 100;
        v /= 100;
        if (s === 0) {
            r = g = b = v;
            return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255), opacity];
        }
        h /= 60;
        i = Math.floor(h);
        f = h - i;
        p = v * (1 - s);
        q = v * (1 - s * f);
        t = v * (1 - s * (1 - f));
        switch (i) {
            case 0:
                r = v;
                g = t;
                b = p;
                break;
            case 1:
                r = q;
                g = v;
                b = p;
                break;
            case 2:
                r = p;
                g = v;
                b = t;
                break;
            case 3:
                r = p;
                g = q;
                b = v;
                break;
            case 4:
                r = t;
                g = p;
                b = v;
                break;
            default:
                r = v;
                g = p;
                b = q;
        }
        var rgb = [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
        if (!isNullOrUndefined(opacity)) {
            rgb.push(opacity);
        }
        return rgb;
    };
    Annotation.prototype.rgbToHex = function (rgb) {
        // eslint-disable-next-line max-len
        return rgb.length ? ('#' + this.hex(rgb[0]) + this.hex(rgb[1]) + this.hex(rgb[2]) +
            (!isNullOrUndefined(rgb[3]) ? (rgb[3] !== 0 ? (Math.round(rgb[3] * 255) + 0x10000).toString(16).substr(-2) : '00') : '')) : '';
    };
    /**
     * @param dataFormat
     * @private
     */
    Annotation.prototype.exportAnnotationsAsStream = function (dataFormat) {
        var _this = this;
        if (this.pdfViewer.annotationModule) {
            var isAnnotations = this.pdfViewer.viewerBase.updateExportItem();
            if (isAnnotations) {
                return new Promise(function (resolve, reject) {
                    _this.pdfViewer.viewerBase.createRequestForExportAnnotations(true, dataFormat, true).then(function (value) {
                        resolve(value);
                    });
                });
            }
        }
        return null;
    };
    Annotation.prototype.hex = function (x) {
        if (!isNullOrUndefined(x)) {
            return ('0' + x.toString(16)).slice(-2);
        }
        else {
            return '0';
        }
    };
    /**
     * @param obj
     * @private
     */
    // eslint-disable-next-line
    Annotation.prototype.cloneObject = function (obj) {
        return JSON.parse(JSON.stringify(obj));
    };
    /**
     * @private
     */
    Annotation.prototype.destroy = function () {
        this.destroyPropertiesWindow();
        this.textMarkupAnnotationModule.clear();
    };
    /**
     * @private
     */
    Annotation.prototype.getModuleName = function () {
        return 'Annotation';
    };
    /**
     * Get vertex points properties
     * @private
     */
    Annotation.prototype.getVertexPointsXY = function (points) {
        var vertexPoints = [];
        //Converting points model into vertex property
        for (var j = 0; j < points.length; j++) {
            vertexPoints[j] = { X: points[j].x, Y: points[j].y };
        }
        return vertexPoints;
    };
    /**
     * Method used to add annotations using program.
     *
     * @param annotationType - It describes type of annotation object.
     * @param options -  It describes about the annotation objects and it's property.
     * @param dynamicStampItem - It describe which type of dynamic stamp.
     * @param signStampItem - It describe which type of sign stamp.
     * @param standardBusinessStampItem - It describe which type of standard business stamp.
     * @returns void
     */
    Annotation.prototype.addAnnotation = function (annotationType, options, dynamicStampItem, signStampItem, standardBusinessStampItem) {
        //Initialize the bounds and pageNumber
        var offset = { x: 1, y: 1 };
        var pageNumber = 0;
        if (options) {
            if (options.pageNumber && options.pageNumber > 0)
                pageNumber = options.pageNumber ? options.pageNumber - 1 : 0;
        }
        //Initialize the pdf annotation object array
        var annotationObject = null;
        var pdfAnnotation = [];
        this.pdfViewer.annotation.triggerAnnotationUnselectEvent();
        //Seperate the annotation type with it's method
        if (annotationType == 'FreeText') {
            pdfAnnotation[pageNumber] = this.pdfViewer.annotation.freeTextAnnotationModule.updateAddAnnotationDetails(options, offset);
            this.pdfViewer.annotation.freeTextAnnotationModule.isAddAnnotationProgramatically = true;
        }
        else if (annotationType == 'StickyNotes') {
            pdfAnnotation[pageNumber] = this.pdfViewer.annotation.stickyNotesAnnotationModule.updateAddAnnotationDetails(options, offset);
            this.pdfViewer.annotation.stickyNotesAnnotationModule.isAddAnnotationProgramatically = true;
        }
        else if (annotationType == 'Highlight' || annotationType == 'Underline' || annotationType == 'Strikethrough') {
            if (annotationType == 'Highlight')
                annotationObject = options;
            else if (annotationType == 'Underline')
                annotationObject = options;
            else if (annotationType == 'Strikethrough')
                annotationObject = options;
            pdfAnnotation[pageNumber] = this.pdfViewer.annotation.textMarkupAnnotationModule.updateAddAnnotationDetails(annotationType, annotationObject);
            this.pdfViewer.annotation.textMarkupAnnotationModule.isAddAnnotationProgramatically = true;
        }
        else if (annotationType === 'Line' || annotationType === 'Arrow' || annotationType === 'Rectangle' || annotationType === 'Circle' || annotationType === 'Polygon') {
            if (annotationType == 'Line')
                annotationObject = options;
            else if (annotationType == 'Arrow')
                annotationObject = options;
            else if (annotationType == 'Rectangle')
                annotationObject = options;
            else if (annotationType == 'Circle')
                annotationObject = options;
            else if (annotationType == 'Polygon')
                annotationObject = options;
            pdfAnnotation[pageNumber] = this.pdfViewer.annotation.shapeAnnotationModule.updateAddAnnotationDetails(annotationType, annotationObject, offset);
            this.pdfViewer.annotation.shapeAnnotationModule.isAddAnnotationProgramatically = true;
        }
        else if (annotationType === 'Distance' || annotationType === 'Perimeter' || annotationType === 'Area' || annotationType === 'Radius' || annotationType === 'Volume') {
            if (annotationType == 'Distance')
                annotationObject = options;
            else if (annotationType == 'Perimeter')
                annotationObject = options;
            else if (annotationType == 'Area')
                annotationObject = options;
            else if (annotationType == 'Radius')
                annotationObject = options;
            else if (annotationType == 'Volume')
                annotationObject = options;
            pdfAnnotation[pageNumber] = this.pdfViewer.annotation.measureAnnotationModule.updateAddAnnotationDetails(annotationType, annotationObject, offset);
            this.pdfViewer.annotation.measureAnnotationModule.isAddAnnotationProgramatically = true;
        }
        else if (annotationType === 'Stamp') {
            if (options && options.customStamps) {
                pdfAnnotation[pageNumber] = this.pdfViewer.annotation.stampAnnotationModule.updateAddAnnotationDetails(options, offset, pageNumber, dynamicStampItem, signStampItem, standardBusinessStampItem);
            }
            else {
                pdfAnnotation[pageNumber] = this.pdfViewer.annotation.stampAnnotationModule.updateAddAnnotationDetails(options, offset, pageNumber, dynamicStampItem, signStampItem, standardBusinessStampItem);
            }
            this.pdfViewer.annotation.stampAnnotationModule.isAddAnnotationProgramatically = true;
        }
        else if (annotationType === 'Ink') {
            pdfAnnotation[pageNumber] = this.pdfViewer.annotation.inkAnnotationModule.updateAddAnnotationDetails(options, offset, pageNumber);
            this.pdfViewer.annotation.inkAnnotationModule.isAddAnnotationProgramatically = true;
        }
        //Annotation rendering can be done with the import annotation method.
        var pdf = { pdfAnnotation: pdfAnnotation };
        this.pdfViewerBase.isAddAnnotation = true;
        this.pdfViewerBase.importAnnotations(pdf);
        this.pdfViewerBase.isAddAnnotation = false;
    };
    /**
     * @param annotation
     * @private
     */
    Annotation.prototype.triggerAnnotationAddEvent = function (annotation) {
        var annotationType = annotation.shapeAnnotationType;
        if (annotationType === 'Stamp' || annotationType === 'Image' || annotationType === 'Path' || annotationType === 'FreeText' || annotationType === 'StickyNotes' || annotationType === 'Ink') {
            var settings = void 0;
            if (annotationType === 'FreeText') {
                settings = {
                    opacity: annotation.opacity, borderColor: annotation.strokeColor, borderWidth: annotation.thickness, author: annotation.author, subject: annotation.subject, modifiedDate: annotation.modifiedDate,
                    fillColor: annotation.fillColor, fontSize: annotation.fontSize, width: annotation.bounds.width, height: annotation.bounds.height, fontColor: annotation.fontColor, fontFamily: annotation.fontFamily, defaultText: annotation.dynamicText, fontStyle: annotation.font, textAlignment: annotation.textAlign
                };
            }
            else {
                settings = {
                    opacity: annotation.opacity, fillColor: annotation.fillColor, strokeColor: annotation.strokeColor,
                    thickness: annotation.thickness, author: annotation.author, subject: annotation.subject,
                    modifiedDate: annotation.modifiedDate, data: annotation.data
                };
            }
            // eslint-disable-next-line
            var bounds = { left: annotation.bounds.x, top: annotation.bounds.y, width: annotation.bounds.width, height: annotation.bounds.height };
            var type = this.getAnnotationType(annotation.shapeAnnotationType, annotation.measureType);
            // eslint-disable-next-line max-len
            this.pdfViewer.fireAnnotationAdd(annotation.pageIndex, annotation.annotName, type, bounds, settings);
        }
        else if (annotationType === 'SignatureText' || annotationType === 'SignatureImage' || annotationType === 'HandWrittenSignature') {
            // eslint-disable-next-line
            var bounds = { left: annotation.bounds.x, top: annotation.bounds.y, width: annotation.bounds.width, height: annotation.bounds.height };
            // eslint-disable-next-line max-len
            this.pdfViewer.fireSignatureAdd(annotation.pageIndex, annotation.signatureName, annotation.shapeAnnotationType, bounds, annotation.opacity, annotation.strokeColor, annotation.thickness, annotation.data);
        }
        else {
            // eslint-disable-next-line
            var setting = {
                opacity: annotation.opacity, fillColor: annotation.fillColor, strokeColor: annotation.strokeColor,
                thickness: annotation.thickness, author: annotation.author, subject: annotation.subject,
                modifiedDate: annotation.modifiedDate
            };
            var bounds = { left: annotation.bounds.x, top: annotation.bounds.y, width: annotation.bounds.width, height: annotation.bounds.height };
            var type = this.getAnnotationType(annotation.shapeAnnotationType, annotation.measureType);
            if (type === 'Line' || type === 'Arrow' || type === 'Distance' || type === 'Perimeter') {
                setting.lineHeadStartStyle = this.getArrowString(annotation.sourceDecoraterShapes);
                setting.lineHeadEndStyle = this.getArrowString(annotation.taregetDecoraterShapes);
                setting.borderDashArray = annotation.borderDashArray;
            }
            var labelSettings = void 0;
            if (this.pdfViewer.enableShapeLabel) {
                labelSettings = {
                    // eslint-disable-next-line max-len
                    fontColor: annotation.fontColor, fontSize: annotation.fontSize, fontFamily: annotation.fontFamily,
                    opacity: annotation.labelOpacity, labelContent: annotation.labelContent, fillColor: annotation.labelFillColor
                };
                // eslint-disable-next-line max-len
                this.pdfViewer.fireAnnotationAdd(annotation.pageIndex, annotation.annotName, type, bounds, setting, null, null, null, labelSettings);
            }
            else {
                // eslint-disable-next-line max-len
                this.pdfViewer.fireAnnotationAdd(annotation.pageIndex, annotation.annotName, type, bounds, setting);
            }
        }
    };
    /**
     * @private
     */
    Annotation.prototype.triggerAnnotationUnselectEvent = function () {
        if (this.pdfViewer.selectedItems.annotations && this.pdfViewer.selectedItems.annotations[0]) {
            var annotation = this.pdfViewer.selectedItems.annotations[0];
            if (annotation.shapeAnnotationType !== 'HandWrittenSignature' && annotation.shapeAnnotationType !== 'SignatureText' && annotation.shapeAnnotationType !== 'SignatureImage' && annotation.shapeAnnotationType !== 'Path') {
                this.pdfViewer.fireAnnotationUnSelect(annotation.annotName, annotation.pageIndex, annotation);
                this.pdfViewer.clearSelection(annotation.pageIndex);
            }
        }
    };
    /**
     * @private
    */
    Annotation.prototype.updateFontFamilyRenderSize = function (currentAnnotation, currentValue) {
        var freeTextAnnotation = this.freeTextAnnotationModule;
        freeTextAnnotation.inputBoxElement.style.fontFamily = currentValue;
        freeTextAnnotation.autoFitFreeText();
        var zoomFactor = this.pdfViewerBase.getZoomFactor();
        var padding = parseFloat(freeTextAnnotation.inputBoxElement.style.paddingLeft);
        var inputEleHeight = currentAnnotation.bounds.height * zoomFactor;
        var characterLength = 8;
        var inputEleWidth = parseFloat(freeTextAnnotation.inputBoxElement.style.width) - characterLength;
        inputEleWidth = ((inputEleWidth) / zoomFactor);
        inputEleHeight = ((inputEleHeight) / zoomFactor);
        var heightDiff = (inputEleHeight - currentAnnotation.bounds.height);
        var y = undefined;
        if (heightDiff > 0) {
            y = currentAnnotation.wrapper.offsetY + (heightDiff / 2);
            y = y > 0 ? y : undefined;
        }
        else {
            heightDiff = Math.abs(heightDiff);
            y = currentAnnotation.wrapper.offsetY - (heightDiff / 2);
            y = y > 0 ? y : undefined;
        }
        var widthDiff = (inputEleWidth - currentAnnotation.bounds.width);
        var x = undefined;
        if (widthDiff > 0) {
            x = currentAnnotation.wrapper.offsetX + (widthDiff / 2);
            x = x > 0 ? x : undefined;
        }
        else {
            widthDiff = Math.abs(widthDiff);
            x = currentAnnotation.wrapper.offsetX - (widthDiff / 2);
        }
        currentAnnotation.bounds.width = inputEleWidth;
        currentAnnotation.bounds.height = inputEleHeight;
        this.pdfViewer.nodePropertyChange(currentAnnotation, { fontFamily: currentValue, bounds: { width: currentAnnotation.bounds.width, height: currentAnnotation.bounds.height, y: y, x: x } });
        this.pdfViewer.renderSelector(currentAnnotation.pageIndex, this.pdfViewer.annotationSelectorSettings);
        this.modifyInCollections(currentAnnotation, 'bounds');
    };
    Annotation.prototype.updateCanvas = function (canvas, pageWidth, pageHeight, pageNumber) {
        var ratio = this.pdfViewerBase.getZoomRatio();
        canvas.width = pageWidth * ratio;
        canvas.height = pageHeight * ratio;
        canvas.style.width = pageWidth + 'px';
        canvas.style.height = pageHeight + 'px';
        canvas.style.position = 'absolute';
        canvas.style.zIndex = '1';
        this.pdfViewerBase.applyElementStyles(canvas, pageNumber);
    };
    return Annotation;
}());
export { Annotation };
