/* eslint-disable */
import { Browser, createElement, initializeCSPTemplate } from "@syncfusion/ej2-base";
import { cornersPointsBeforeRotation, Rect, splitArrayCollection, processPathData, randomId } from "@syncfusion/ej2-drawings";
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { Dialog, Tooltip } from "@syncfusion/ej2-popups";
import { Tab } from "@syncfusion/ej2-navigations";
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
import { ColorPicker, Slider, TextBox, NumericTextBox } from "@syncfusion/ej2-inputs";
import { DropDownList } from "@syncfusion/ej2-dropdowns";
import { Button, CheckBox } from "@syncfusion/ej2-buttons";
import { DisplayMode, FontStyle } from '../base/types';
import { cloneObject } from '../drawing/drawing-util';
/* eslint-disable */
/**
 * The `FormDesigner` module is used to handle form designer actions of PDF viewer.
 */
var FormDesigner = /** @class */ (function () {
    /**
    * @param viewer
    * @param base
    * @private
    */
    function FormDesigner(viewer, base) {
        this.isFormFieldExistingInCollection = false;
        this.multilineCheckboxCheckedState = false;
        this.formFieldListItemCollection = [];
        this.formFieldListItemDataSource = [];
        this.isInitialField = false;
        this.isSetFormFieldMode = false;
        this.increasedSize = 5;
        this.defaultZoomValue = 1;
        this.signatureFieldPropertyChanged = {
            isReadOnlyChanged: false,
            isRequiredChanged: false,
            isVisibilityChanged: false,
            isNameChanged: false,
            isPrintChanged: false,
            isTooltipChanged: false,
            isThicknessChanged: false,
        };
        this.initialFieldPropertyChanged = {
            isReadOnlyChanged: false,
            isRequiredChanged: false,
            isVisibilityChanged: false,
            isNameChanged: false,
            isPrintChanged: false,
            isTooltipChanged: false,
            isThicknessChanged: false,
        };
        this.textFieldPropertyChanged = {
            isReadOnlyChanged: false,
            isRequiredChanged: false,
            isBackgroundColorChanged: false,
            isBorderColorChanged: false,
            isAlignmentChanged: false,
            isFontSizeChanged: false,
            isNameChanged: false,
            isToolTipChanged: false,
            isThicknessChanged: false,
            isVisibilityChanged: false,
            isPrintChanged: false,
            isSelected: false,
            isFontFamilyChanged: false,
            isFontStyle: false,
            isValueChanged: false,
            isMaXLength: false,
            isColorChanged: false,
            isMultilineChanged: false,
        };
        this.passwordFieldPropertyChanged = {
            isReadOnlyChanged: false,
            isRequiredChanged: false,
            isBackgroundColorChanged: false,
            isBorderColorChanged: false,
            isAlignmentChanged: false,
            isFontSizeChanged: false,
            isNameChanged: false,
            isToolTipChanged: false,
            isThicknessChanged: false,
            isVisibilityChanged: false,
            isPrintChanged: false,
            isSelected: false,
            isFontFamilyChanged: false,
            isFontStyle: false,
            isValueChanged: false,
            isMaXLength: false,
            isColorChanged: false,
        };
        this.checkBoxFieldPropertyChanged = {
            isReadOnlyChanged: false,
            isRequiredChanged: false,
            isBackgroundColorChanged: false,
            isBorderColorChanged: false,
            isNameChanged: false,
            isToolTipChanged: false,
            isThicknessChanged: false,
            isVisibilityChanged: false,
            isPrintChanged: false,
            isCheckedChanged: false,
        };
        this.radioButtonFieldPropertyChanged = {
            isReadOnlyChanged: false,
            isRequiredChanged: false,
            isBackgroundColorChanged: false,
            isBorderColorChanged: false,
            isNameChanged: false,
            isToolTipChanged: false,
            isThicknessChanged: false,
            isVisibilityChanged: false,
            isPrintChanged: false,
            isSelectedChanged: false,
        };
        this.dropdownFieldPropertyChanged = {
            isReadOnlyChanged: false,
            isRequiredChanged: false,
            isBackgroundColorChanged: false,
            isBorderColorChanged: false,
            isAlignmentChanged: false,
            isFontSizeChanged: false,
            isNameChanged: false,
            isToolTipChanged: false,
            isThicknessChanged: false,
            isVisibilityChanged: false,
            isPrintChanged: false,
            isSelected: false,
            isFontFamilyChanged: false,
            isFontStyle: false,
            isColorChanged: false,
            isOptionChanged: false,
        };
        this.listBoxFieldPropertyChanged = {
            isReadOnlyChanged: false,
            isRequiredChanged: false,
            isBackgroundColorChanged: false,
            isBorderColorChanged: false,
            isAlignmentChanged: false,
            isFontSizeChanged: false,
            isNameChanged: false,
            isToolTipChanged: false,
            isThicknessChanged: false,
            isVisibilityChanged: false,
            isPrintChanged: false,
            isSelected: false,
            isFontFamilyChanged: false,
            isFontStyle: false,
            isColorChanged: false,
            isOptionChanged: false,
        };
        /**
         * @private
         */
        this.disableSignatureClickEvent = false;
        /**
         * @private
         */
        this.formFieldIndex = 0;
        /**
         * @private
         */
        this.formFieldIdIndex = 0;
        /**
         * @private
         */
        this.isProgrammaticSelection = false;
        /**
         * @private
        */
        this.isShapeCopied = false;
        this.isDrawHelper = false;
        this.isFormFieldUpdated = false;
        /**
         * @private
         */
        this.isPropertyDialogOpen = false;
        this.pdfViewer = viewer;
        this.pdfViewerBase = base;
    }
    /**
     * @private
     */
    FormDesigner.prototype.drawHelper = function (formFieldAnnotationType, obj, event) {
        var textLayer = document.getElementById(this.pdfViewer.element.id + '_textLayer_' + this.pdfViewerBase.activeElements.activePageID);
        var canvasElement = document.getElementById(this.pdfViewer.element.id + '_pageCanvas_' + this.pdfViewerBase.activeElements.activePageID);
        if (canvasElement !== null && textLayer !== null) {
            var zoomValue = this.pdfViewerBase.getZoomFactor();
            var htmlElement = void 0;
            var HtmlElementAttribute = {
                'id': 'FormField_helper_html_element',
                'class': 'foreign-object'
            };
            var bounds = this.updateFormFieldInitialSize(obj, formFieldAnnotationType);
            htmlElement = this.createHtmlElement('div', HtmlElementAttribute);
            this.isDrawHelper = true;
            if (formFieldAnnotationType === "SignatureField" || formFieldAnnotationType === "InitialField") {
                htmlElement.appendChild(this.createSignatureDialog(this.pdfViewer, obj, bounds));
            }
            else if (formFieldAnnotationType === "DropdownList") {
                var element = { id: "dropdown_helper" };
                htmlElement.appendChild(this.createDropDownList(element, obj));
            }
            else if (formFieldAnnotationType === "ListBox") {
                var element = { id: "listbox_helper" };
                htmlElement.appendChild(this.createListBox(element, obj));
            }
            else {
                htmlElement.appendChild(this.createInputElement(formFieldAnnotationType, obj, bounds));
            }
            textLayer.appendChild(htmlElement);
            var point = this.pdfViewerBase.getMousePosition(event);
            htmlElement.setAttribute('style', 'height:' + bounds.height * zoomValue + 'px; width:' + bounds.width * zoomValue + 'px;left:' + point.x * zoomValue + 'px; top:' + point.y * zoomValue + 'px;' +
                'position:absolute;opacity: 0.5;');
        }
    };
    /**
     * @private
     */
    FormDesigner.prototype.drawHTMLContent = function (formFieldAnnotationType, element, drawingObject, pageIndex, commandHandler, fieldId) {
        var textLayer = document.getElementById(this.pdfViewer.element.id + '_textLayer_' + pageIndex);
        var canvasElement = document.getElementById(this.pdfViewer.element.id + '_pageCanvas_' + pageIndex);
        var formFieldElement = document.getElementById("form_field_" + element.id + '_html_element');
        if (formFieldElement === null && element !== null && canvasElement !== null && textLayer) {
            var zoomValue = this.pdfViewerBase.getZoomFactor();
            var htmlElement = void 0;
            var parentHtmlElement = void 0;
            var parentHtmlElementAttribute = {
                'id': "form_field_" + element.id + '_html_element',
                'class': 'foreign-object'
            };
            parentHtmlElement = this.createHtmlElement('div', parentHtmlElementAttribute);
            var HtmlElementAttribute = {
                'id': element.id + '_html_element',
                'class': 'foreign-object'
            };
            htmlElement = this.createHtmlElement('div', HtmlElementAttribute);
            if (formFieldAnnotationType === "SignatureField" || formFieldAnnotationType === "InitialField") {
                element.template = htmlElement.appendChild(this.createSignatureDialog(commandHandler, drawingObject));
            }
            else if (formFieldAnnotationType === "DropdownList") {
                element.template = htmlElement.appendChild(this.createDropDownList(element, drawingObject));
            }
            else if (formFieldAnnotationType === "ListBox") {
                element.template = htmlElement.appendChild(this.createListBox(element, drawingObject));
            }
            else {
                element.template = htmlElement.appendChild(this.createInputElement(formFieldAnnotationType, drawingObject));
            }
            this.isSetFormFieldMode = false;
            var divElement = document.createElement("div");
            divElement.id = drawingObject.id + '_designer_name';
            divElement.style.fontSize = drawingObject.fontSize ? (drawingObject.fontSize * zoomValue) + 'px' : (10 * zoomValue) + 'px';
            divElement.className = "e-pv-show-designer-name";
            if (this.pdfViewer.designerMode) {
                divElement.innerHTML = drawingObject.name;
                divElement.style.position = 'absolute';
            }
            else {
                divElement.innerHTML = "";
                divElement.style.position = 'initial';
            }
            if (formFieldAnnotationType === "Checkbox" && (Browser.isDevice)) {
                //Creating outer div for checkbox in mobile device
                var outerDiv = void 0;
                var bounds = drawingObject.bounds;
                var outerDivHeight = bounds.height + this.increasedSize;
                var outerDivWidth = bounds.width + this.increasedSize;
                var outerDivAttribute = {
                    'id': drawingObject.id + '_outer_div',
                    'className': 'e-pv-checkbox-outer-div'
                };
                outerDiv = createElement("div", outerDivAttribute);
                outerDiv.setAttribute('style', 'height:' + outerDivHeight * zoomValue + 'px; width:' + outerDivWidth * zoomValue + 'px;left:' + bounds.x * zoomValue + 'px; top:' + bounds.y * zoomValue + 'px;' +
                    'position:absolute; opacity: 1;');
                htmlElement.appendChild(divElement);
                outerDiv.addEventListener('click', this.setCheckBoxState.bind(this));
                parentHtmlElement.appendChild(htmlElement);
                textLayer.appendChild(outerDiv);
                outerDiv.appendChild(parentHtmlElement);
            }
            else {
                htmlElement.appendChild(divElement);
                parentHtmlElement.appendChild(htmlElement);
                textLayer.appendChild(parentHtmlElement);
            }
            if (formFieldAnnotationType === "RadioButton") {
                if (document.getElementsByClassName("e-pv-radiobtn-span").length > 0) {
                    var spanElement = document.getElementsByClassName("e-pv-radiobtn-span");
                    for (var i = 0; i < spanElement.length; i++) {
                        var bounds = this.getCheckboxRadioButtonBounds(drawingObject);
                        spanElement[i].style.width = (bounds.width / 2) + "px";
                        spanElement[i].style.height = (bounds.height / 2) + "px";
                        if (parseInt(spanElement[i].style.width, 10) <= 1 || parseInt(spanElement[i].style.height, 10) <= 1) {
                            spanElement[i].style.width = "1px";
                            spanElement[i].style.height = "1px";
                            spanElement[i].style.margin = "1px";
                        }
                    }
                }
            }
            var point = cornersPointsBeforeRotation(element).topLeft;
            if (formFieldAnnotationType === "Checkbox" && (Browser.isDevice)) {
                htmlElement.setAttribute('style', 'height:' + (element.actualSize.height * zoomValue) + 'px; width:' + (element.actualSize.width * zoomValue) +
                    'px;left:' + point.x * zoomValue + 'px; top:' + point.y * zoomValue + 'px;' +
                    'transform:rotate(' + (element.rotateAngle + element.parentTransform) + 'deg);' +
                    'pointer-events:' + ((this.pdfViewer.designerMode) ? 'none' : 'all')
                    + ';visibility:' + ((element.visible) ? 'visible' : 'hidden') + ';opacity:' + element.style.opacity + ';');
            }
            else {
                htmlElement.setAttribute('style', 'height:' + (element.actualSize.height * zoomValue) + 'px; width:' + (element.actualSize.width * zoomValue) +
                    'px;left:' + point.x * zoomValue + 'px; top:' + point.y * zoomValue + 'px;' +
                    'position:absolute;transform:rotate(' + (element.rotateAngle + element.parentTransform) + 'deg);' +
                    'pointer-events:' + ((this.pdfViewer.designerMode) ? 'none' : 'all')
                    + ';visibility:' + ((element.visible) ? 'visible' : 'hidden') + ';opacity:' + element.style.opacity + ';');
            }
            this.updateFormDesignerFieldInSessionStorage(point, element, formFieldAnnotationType, drawingObject);
            if (formFieldAnnotationType === "SignatureField" || formFieldAnnotationType === "InitialField") {
                if (drawingObject.value) {
                    var elementId = fieldId + "_content";
                    var value = this.pdfViewer.nameTable[elementId].value;
                    var signatureType = (value.indexOf('base64')) > -1 ? 'Image' : ((value.startsWith('M') && value.split(',')[1].split(' ')[1].startsWith('L')) ? 'Path' : 'Type');
                    this.pdfViewer.formFieldsModule.drawSignature(signatureType, value, element.template, drawingObject.fontFamily);
                }
            }
            var field = {
                name: drawingObject.name, id: drawingObject.id, value: drawingObject.value, fontFamily: drawingObject.fontFamily, fontSize: drawingObject.fontSize, fontStyle: drawingObject.fontStyle,
                color: drawingObject.color, backgroundColor: drawingObject.backgroundColor, alignment: drawingObject.alignment, isReadonly: drawingObject.isReadonly, visibility: drawingObject.visibility,
                maxLength: drawingObject.maxLength, isRequired: drawingObject.isRequired, isPrint: drawingObject.isPrint, rotation: drawingObject.rotateAngle, tooltip: drawingObject.tooltip,
                borderColor: drawingObject.borderColor, thickness: drawingObject.thickness, options: drawingObject.options, pageNumber: drawingObject.pageNumber, isChecked: drawingObject.isChecked, isSelected: drawingObject.isSelected
            };
            this.pdfViewer.fireFormFieldAddEvent("formFieldAdd", field, this.pdfViewerBase.activeElements.activePageID);
        }
        else {
            var point = cornersPointsBeforeRotation(element).topLeft;
            this.updateFormDesignerFieldInSessionStorage(point, element, formFieldAnnotationType, drawingObject);
        }
        return element.template;
    };
    /**
     * @private
    */
    FormDesigner.prototype.updateFormDesignerFieldInSessionStorage = function (point, element, formFieldType, drawingObject) {
        var zoomValue = this.pdfViewerBase.getZoomFactor();
        var formDesignObj = {
            id: element.id, lineBound: { X: point.x * zoomValue, Y: point.y * zoomValue, Width: element.actualSize.width * zoomValue, Height: element.actualSize.height * zoomValue },
            name: drawingObject.name, zoomValue: zoomValue, pageNumber: drawingObject.pageNumber, value: drawingObject.value, formFieldAnnotationType: formFieldType, isMultiline: drawingObject.isMultiline,
            signatureType: drawingObject.signatureType, signatureBound: drawingObject.signatureBound,
            fontFamily: drawingObject.fontFamily, fontSize: drawingObject.fontSize, fontStyle: drawingObject.fontStyle, fontColor: this.getRgbCode(drawingObject.color),
            borderColor: this.getRgbCode(drawingObject.borderColor), thickness: drawingObject.thickness, backgroundColor: this.getRgbCode(drawingObject.backgroundColor),
            textAlign: drawingObject.alignment, isChecked: drawingObject.isChecked, isSelected: drawingObject.isSelected, isReadonly: drawingObject.isReadonly, font: {
                isBold: drawingObject.font.isBold, isItalic: drawingObject.font.isItalic, isStrikeout: drawingObject.font.isStrikeout, isUnderline: drawingObject.font.isUnderline
            }, selectedIndex: drawingObject.selectedIndex, radiobuttonItem: null, option: drawingObject.options ? drawingObject.options : [], visibility: drawingObject.visibility, maxLength: drawingObject.maxLength, isRequired: drawingObject.isRequired, isPrint: drawingObject.isPrint, rotation: drawingObject.rotateAngle, tooltip: drawingObject.tooltip, insertSpaces: drawingObject.insertSpaces
        };
        if (formDesignObj.formFieldAnnotationType === "RadioButton") {
            formDesignObj.radiobuttonItem = [];
            formDesignObj.radiobuttonItem.push({
                id: element.id, lineBound: { X: point.x * zoomValue, Y: point.y * zoomValue, Width: element.actualSize.width * zoomValue, Height: element.actualSize.height * zoomValue },
                name: drawingObject.name, zoomValue: zoomValue, pageNumber: drawingObject.pageNumber, value: drawingObject.value, formFieldAnnotationType: formFieldType,
                fontFamily: drawingObject.fontFamily, fontSize: drawingObject.fontSize, fontStyle: drawingObject.fontStyle, fontColor: this.getRgbCode(drawingObject.color),
                borderColor: this.getRgbCode(drawingObject.borderColor), thickness: drawingObject.thickness, backgroundColor: this.getRgbCode(drawingObject.backgroundColor),
                textAlign: drawingObject.alignment, isChecked: drawingObject.isChecked, isSelected: drawingObject.isSelected, isReadonly: drawingObject.isReadonly, visibility: drawingObject.visibility,
                maxLength: drawingObject.maxLength, isRequired: drawingObject.isRequired, isPrint: drawingObject.isPrint, rotation: 0, tooltip: drawingObject.tooltip
            });
        }
        var isItemAdd = this.getRadioButtonItem(formDesignObj, drawingObject);
        if (!isItemAdd) {
            for (var i = 0; i < this.pdfViewerBase.formFieldCollection.length; i++) {
                var formFieldElement = this.pdfViewerBase.formFieldCollection[i];
                if (formFieldElement["Key"] === formDesignObj.id) {
                    this.pdfViewerBase.formFieldCollection.splice(i, 1);
                    this.pdfViewerBase.formFieldCollection.push({ Key: element.id, FormField: formDesignObj });
                    this.isFormFieldExistingInCollection = true;
                }
            }
            if (!this.isFormFieldExistingInCollection) {
                this.pdfViewerBase.formFieldCollection.push({ Key: element.id, FormField: formDesignObj });
            }
            this.pdfViewerBase.setItemInSessionStorage(this.pdfViewerBase.formFieldCollection, '_formDesigner');
            this.isFormFieldExistingInCollection = false;
            if (this.pdfViewerBase.formFieldCollection.length > 0) {
                this.pdfViewerBase.enableFormFieldButton(true);
            }
            else {
                this.pdfViewerBase.enableFormFieldButton(false);
            }
        }
    };
    FormDesigner.prototype.getRadioButtonItem = function (radiobutton, formFieldProperty) {
        var data = this.pdfViewerBase.getItemFromSessionStorage('_formDesigner');
        if (data) {
            var formFieldsData = JSON.parse(data);
            var isItemAdd = false;
            for (var i = 0; i < formFieldsData.length; i++) {
                var currentData = formFieldsData[i];
                var radiobuttonItem = void 0;
                if (radiobutton.formFieldAnnotationType === "RadioButton") {
                    if (radiobutton.radiobuttonItem && currentData.FormField.radiobuttonItem) {
                        for (var m = 0; m < currentData.FormField.radiobuttonItem.length; m++) {
                            if (currentData.FormField.radiobuttonItem[m].id === radiobutton.id) {
                                radiobuttonItem = {
                                    lineBound: radiobutton.lineBound, id: radiobutton.id,
                                    name: radiobutton.name, zoomValue: radiobutton.zoomValue, pageNumber: radiobutton.pageNumber, value: radiobutton.value, formFieldAnnotationType: radiobutton.formFieldAnnotationType,
                                    fontFamily: radiobutton.fontFamily, fontSize: radiobutton.fontSize, fontStyle: radiobutton.fontStyle, fontColor: this.getRgbCode(formFieldProperty.color),
                                    borderColor: this.getRgbCode(formFieldProperty.borderColor), thickness: formFieldProperty.thickness, backgroundColor: this.getRgbCode(formFieldProperty.backgroundColor), textAlign: radiobutton.textAlign, isChecked: radiobutton.isChecked, isSelected: radiobutton.isSelected,
                                    isReadonly: radiobutton.isReadonly, visibility: radiobutton.visibility, maxLength: radiobutton.maxLength, isRequired: radiobutton.isRequired, isPrint: radiobutton.isPrint, rotation: 0, tooltip: radiobutton.tooltip
                                };
                                currentData.FormField.radiobuttonItem.splice(m, 1);
                                currentData.FormField.radiobuttonItem.push(radiobuttonItem);
                                if (!isNullOrUndefined(this.pdfViewerBase.formFieldCollection[i])) {
                                    if (this.pdfViewerBase.formFieldCollection[i].FormField.name === currentData.FormField.name) {
                                        this.pdfViewerBase.formFieldCollection[i].FormField.radiobuttonItem = currentData.FormField.radiobuttonItem;
                                        isItemAdd = true;
                                    }
                                }
                                break;
                            }
                            else {
                                if (radiobutton.formFieldAnnotationType === currentData.FormField.formFieldAnnotationType && radiobutton.name === currentData.FormField.name) {
                                    radiobuttonItem = {
                                        lineBound: radiobutton.lineBound, id: radiobutton.id,
                                        name: radiobutton.name, zoomValue: radiobutton.zoomValue, pageNumber: radiobutton.pageNumber, value: radiobutton.value, formFieldAnnotationType: radiobutton.formFieldAnnotationType,
                                        fontFamily: radiobutton.fontFamily, fontSize: radiobutton.fontSize, fontStyle: radiobutton.fontStyle, fontColor: this.getRgbCode(formFieldProperty.color),
                                        borderColor: this.getRgbCode(formFieldProperty.borderColor), thickness: formFieldProperty.thickness, backgroundColor: this.getRgbCode(formFieldProperty.backgroundColor), textAlign: radiobutton.textAlign, isChecked: radiobutton.isChecked, isSelected: radiobutton.isSelected,
                                        isReadonly: radiobutton.isReadonly, visibility: radiobutton.visibility, maxLength: radiobutton.maxLength, isRequired: radiobutton.isRequired, isPrint: radiobutton.isPrint, rotation: 0, tooltip: radiobutton.tooltip
                                    };
                                    var isContainsRadiobuttonItem = false;
                                    for (var i_1 = 0; i_1 < currentData.FormField.radiobuttonItem.length; i_1++) {
                                        if (currentData.FormField.radiobuttonItem[i_1].id === radiobuttonItem.id) {
                                            currentData.FormField.radiobuttonItem[i_1] = radiobuttonItem;
                                            isContainsRadiobuttonItem = true;
                                            break;
                                        }
                                    }
                                    if (!isContainsRadiobuttonItem) {
                                        currentData.FormField.radiobuttonItem.push(radiobuttonItem);
                                    }
                                    if (!isNullOrUndefined(this.pdfViewerBase.formFieldCollection[i])) {
                                        this.pdfViewerBase.formFieldCollection[i].FormField.radiobuttonItem = currentData.FormField.radiobuttonItem;
                                        isItemAdd = true;
                                        for (var l = 0; l < this.pdfViewerBase.formFieldCollection.length; l++) {
                                            var formFieldElement = this.pdfViewerBase.formFieldCollection[l];
                                            if (formFieldElement["Key"] === radiobuttonItem.id) {
                                                this.pdfViewerBase.formFieldCollection.splice(l, 1);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (isItemAdd) {
                this.pdfViewerBase.setItemInSessionStorage(this.pdfViewerBase.formFieldCollection, '_formDesigner');
            }
        }
        return isItemAdd;
    };
    // eslint-disable-next-line
    FormDesigner.prototype.getRgbCode = function (colorString) {
        if (!colorString.match(/#([a-z0-9]+)/gi) && !colorString.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/)) {
            var colorCode = this.nameToHash(colorString);
            if (colorCode != "")
                colorString = colorCode;
        }
        var stringArray = colorString.split(',');
        if (isNullOrUndefined(stringArray[1])) {
            colorString = this.getValue(colorString, 'rgba');
            stringArray = colorString.split(',');
        }
        // eslint-disable-next-line radix
        var r = parseInt(stringArray[0].split('(')[1]);
        // eslint-disable-next-line radix
        var g = parseInt(stringArray[1]);
        // eslint-disable-next-line radix
        var b = parseInt(stringArray[2]);
        // eslint-disable-next-line radix
        var a = parseFloat(stringArray[3]) * 100;
        if (isNaN(a)) {
            a = 0;
        }
        return { r: r, g: g, b: b, a: a };
    };
    /**
     * @param colour
     * @private
     */
    // eslint-disable-next-line
    FormDesigner.prototype.nameToHash = function (colour) {
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
    /**
     * @param value
     * @param type
     * @param value
     * @param type
     * @private
     */
    FormDesigner.prototype.getValue = function (value, type) {
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
    FormDesigner.prototype.convertRgbToNumberArray = function (value) {
        // eslint-disable-next-line max-len
        return (value.slice(value.indexOf('(') + 1, value.indexOf(')'))).split(',').map(function (n, i) {
            return (i !== 3) ? parseInt(n, 10) : parseFloat(n);
        });
    };
    FormDesigner.prototype.convertToRgbString = function (rgb) {
        return rgb.length ? rgb.length === 4 ? 'rgba(' + rgb.join() + ')' : 'rgb(' + rgb.join() + ')' : '';
    };
    FormDesigner.prototype.convertToHsvString = function (hsv) {
        return hsv.length === 4 ? 'hsva(' + hsv.join() + ')' : 'hsv(' + hsv.join() + ')';
    };
    FormDesigner.prototype.roundValue = function (value) {
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
    FormDesigner.prototype.hexToRgb = function (hex) {
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
    FormDesigner.prototype.rgbToHsv = function (r, g, b, opacity) {
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
    FormDesigner.prototype.hsvToRgb = function (h, s, v, opacity) {
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
    FormDesigner.prototype.rgbToHex = function (rgb) {
        // eslint-disable-next-line max-len
        return rgb.length ? ('#' + this.hex(rgb[0]) + this.hex(rgb[1]) + this.hex(rgb[2]) +
            (!isNullOrUndefined(rgb[3]) ? (rgb[3] !== 0 ? (Math.round(rgb[3] * 255) + 0x10000).toString(16).substr(-2) : '00') : '')) : '';
    };
    /**
     * @private
     */
    FormDesigner.prototype.updateCanvas = function (pageNumber, canvas) {
        if (canvas !== null && canvas !== undefined) {
            canvas = canvas;
        }
        else {
            canvas = this.pdfViewerBase.getElement('_annotationCanvas_' + pageNumber);
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
        }
        this.pdfViewer.drawing.refreshCanvasDiagramLayer(canvas, pageNumber);
    };
    /**
     * @private
    */
    FormDesigner.prototype.rerenderFormFields = function (pageIndex) {
        var _this = this;
        var zoomValue = this.pdfViewerBase.getZoomFactor();
        var data = this.pdfViewerBase.getItemFromSessionStorage('_formDesigner');
        var signatureValueRender = false;
        if (data) {
            var formFieldsData = JSON.parse(data);
            var textLayer = document.getElementById(this.pdfViewer.element.id + '_textLayer_' + pageIndex);
            var canvasElement = document.getElementById(this.pdfViewer.element.id + '_pageCanvas_' + pageIndex);
            if (formFieldsData !== null && canvasElement !== null && textLayer !== null) {
                var _loop_1 = function (i) {
                    // eslint-disable-next-line
                    var currentData = formFieldsData[i].FormField;
                    if (currentData.pageNumber === pageIndex + 1) {
                        var domElementId = document.getElementById('form_field_' + currentData.id + '_html_element');
                        if (!domElementId) {
                            var signatureField = this_1.pdfViewer.nameTable[formFieldsData[i].Key.split("_")[0]];
                            var element_1 = signatureField.wrapper.children[0];
                            if (element_1) {
                                if (currentData.formFieldAnnotationType === "RadioButton") {
                                    for (var j = 0; j < currentData.radiobuttonItem.length; j++) {
                                        signatureField = this_1.pdfViewer.nameTable[currentData.radiobuttonItem[j].id.split("_")[0]];
                                        element_1 = signatureField.wrapper.children[0];
                                        currentData.radiobuttonItem[j] = this_1.renderFormFieldsInZooming(element_1, currentData.radiobuttonItem[j], signatureField, zoomValue);
                                        this_1.pdfViewerBase.formFieldCollection[i].FormField.radiobuttonItem[j].lineBound = currentData.radiobuttonItem[j].lineBound;
                                        this_1.pdfViewerBase.formFieldCollection[i].FormField.radiobuttonItem[j].zoomValue = zoomValue;
                                    }
                                }
                                else {
                                    var zoomCurrentData = this_1.renderFormFieldsInZooming(element_1, currentData, signatureField, zoomValue);
                                    if (currentData.formFieldAnnotationType === "SignatureField" || currentData.formFieldAnnotationType === "InitialField") {
                                        var proxy_1 = this_1;
                                        if (currentData.value === '') {
                                            formFieldsData.filter(function (item) {
                                                if (item.FormField.name === currentData.name && item.FormField.id !== currentData.id && !isNullOrUndefined(proxy_1.pdfViewer.nameTable[item.FormField.id]) && proxy_1.pdfViewer.nameTable[item.FormField.id].value !== '') {
                                                    currentData.value = proxy_1.pdfViewer.nameTable[item.FormField.id].value;
                                                    currentData.signatureType = item.FormField.signatureType === "Text" ? "Type" : item.FormField.signatureType;
                                                    if (currentData.value !== '') {
                                                        currentData.signatureBound = item.FormField.signatureBound;
                                                    }
                                                }
                                            });
                                            if ((isNullOrUndefined(proxy_1.pdfViewer.nameTable[currentData.id]) || proxy_1.pdfViewer.nameTable[currentData.id].value == '') && currentData.value !== '') {
                                                this_1.pdfViewer.formFieldsModule.drawSignature(currentData.signatureType, currentData.value, currentData);
                                                signatureValueRender = true;
                                            }
                                        }
                                    }
                                    currentData.lineBound = zoomCurrentData.lineBound;
                                    if (currentData.signatureBound) {
                                        currentData.signatureBound = zoomCurrentData.signatureBound;
                                        this_1.pdfViewerBase.formFieldCollection[i].FormField.signatureBound = currentData.signatureBound;
                                        if ((currentData.formFieldAnnotationType === "SignatureField" || currentData.formFieldAnnotationType === "InitialField") && currentData.signatureType === "Image" && signatureValueRender) {
                                            setTimeout(function () {
                                                if (!isNullOrUndefined(_this.pdfViewer.nameTable[element_1.id.split('_')[0] + "_content"])) {
                                                    _this.pdfViewer.nameTable[element_1.id.split('_')[0] + "_content"].signatureBound = currentData.signatureBound;
                                                }
                                            }, 10);
                                        }
                                        else {
                                            if (!isNullOrUndefined(this_1.pdfViewer.nameTable[element_1.id.split('_')[0] + "_content"])) {
                                                this_1.pdfViewer.nameTable[element_1.id.split('_')[0] + "_content"].signatureBound = currentData.signatureBound;
                                            }
                                        }
                                    }
                                    this_1.pdfViewerBase.formFieldCollection[i].FormField.lineBound = currentData.lineBound;
                                    this_1.pdfViewerBase.formFieldCollection[i].FormField.zoomValue = zoomValue;
                                }
                                this_1.pdfViewerBase.setItemInSessionStorage(this_1.pdfViewerBase.formFieldCollection, '_formDesigner');
                            }
                        }
                    }
                    if (this_1.pdfViewerBase.isFocusField && this_1.pdfViewerBase.focusField) {
                        currentField = document.getElementById(this_1.pdfViewerBase.focusField.id);
                        if (currentField) {
                            if ((this_1.pdfViewerBase.focusField.type === "SignatureField" || this_1.pdfViewerBase.focusField.type === "InitialField") && this_1.pdfViewer.formDesignerModule) {
                                currentField.parentElement.focus();
                            }
                            else {
                                currentField.focus();
                            }
                            this_1.pdfViewerBase.isFocusField = false;
                            this_1.pdfViewerBase.focusField = [];
                        }
                    }
                };
                var this_1 = this, currentField;
                for (var i = 0; i < formFieldsData.length; i++) {
                    _loop_1(i);
                }
            }
        }
    };
    FormDesigner.prototype.renderFormFieldsInZooming = function (element, currentData, signatureField, zoomValue) {
        if (element) {
            var htmlElement = void 0;
            var parentHtmlElement = void 0;
            var parentHtmlElementAttribute = {
                'id': "form_field_" + element.id + '_html_element',
                'class': 'foreign-object'
            };
            parentHtmlElement = this.createHtmlElement('div', parentHtmlElementAttribute);
            var HtmlElementAttribute = {
                'id': element.id + '_html_element',
                'class': 'foreign-object'
            };
            htmlElement = this.createHtmlElement('div', HtmlElementAttribute);
            if (currentData.formFieldAnnotationType === "SignatureField" || currentData.formFieldAnnotationType === "InitialField") {
                this.disableSignatureClickEvent = true;
                signatureField.value = currentData.value;
                signatureField.signatureType = currentData.signatureType;
                signatureField.signatureBound = currentData.signatureBound;
                element.template = htmlElement.appendChild(this.createSignatureDialog(this.pdfViewer, signatureField));
                this.disableSignatureClickEvent = false;
            }
            else if (currentData.formFieldAnnotationType === "DropdownList") {
                element.template = htmlElement.appendChild(this.createDropDownList(element, signatureField));
            }
            else if (currentData.formFieldAnnotationType === "ListBox") {
                element.template = htmlElement.appendChild(this.createListBox(element, signatureField));
            }
            else {
                element.template = htmlElement.appendChild(this.createInputElement(currentData.formFieldAnnotationType, signatureField));
            }
            var divElement = document.createElement("div");
            divElement.id = signatureField.id + '_designer_name';
            divElement.style.fontSize = signatureField.fontSize ? (signatureField.fontSize * zoomValue) + 'px' : (10 * zoomValue) + 'px';
            divElement.className = "e-pv-show-designer-name";
            if (this.pdfViewer.designerMode) {
                divElement.innerHTML = signatureField.name;
                divElement.style.position = 'absolute';
            }
            else {
                divElement.innerHTML = "";
                divElement.style.position = 'initial';
            }
            htmlElement.appendChild(divElement);
            parentHtmlElement.appendChild(htmlElement);
            var textLayer = document.getElementById(this.pdfViewer.element.id + '_textLayer_' + (currentData.pageNumber - 1));
            textLayer.appendChild(parentHtmlElement);
            if (signatureField.formFieldAnnotationType === "RadioButton") {
                if (document.getElementsByClassName("e-pv-radiobtn-span").length > 0) {
                    var bounds = this.getCheckboxRadioButtonBounds(signatureField);
                    var spanElement = document.getElementsByClassName("e-pv-radiobtn-span");
                    // this.renderRadioButtonSpan(spanElement, bounds, zoomValue);
                }
            }
            var point = cornersPointsBeforeRotation(signatureField.wrapper.children[0]).topLeft;
            if (currentData.formFieldAnnotationType === "Checkbox" && (Browser.isDevice)) {
                //ReCreate outer div while zoom options
                var outerDiv = void 0;
                var outerDivHeight = element.actualSize.height + this.increasedSize;
                var outerDivWidth = element.actualSize.width + this.increasedSize;
                var outerDivAttribute = {
                    'id': element.id + '_outer_div',
                    'className': 'e-pv-checkbox-outer-div'
                };
                outerDiv = createElement("div", outerDivAttribute);
                outerDiv.setAttribute('style', 'height:' + outerDivHeight * zoomValue + 'px; width:' + outerDivWidth * zoomValue + 'px;left:' + point.x * zoomValue + 'px; top:' + point.y * zoomValue + 'px;' +
                    'position:absolute; opacity: 1;');
                outerDiv.appendChild(parentHtmlElement);
                outerDiv.addEventListener('click', this.setCheckBoxState.bind(this));
                textLayer.appendChild(outerDiv);
                htmlElement.setAttribute('style', 'height:' + (element.actualSize.height * zoomValue) + 'px; width:' + (element.actualSize.width * zoomValue) +
                    'px;left:' + point.x * zoomValue + 'px; top:' + point.y * zoomValue + 'px;' +
                    'transform:rotate(' + (element.rotateAngle + element.parentTransform) + 'deg);' +
                    'pointer-events:' + ((this.pdfViewer.designerMode) ? 'none' : 'all')
                    + ';visibility:' + ((element.visible) ? 'visible' : 'hidden') + ';opacity:' + element.style.opacity + ';');
            }
            else {
                htmlElement.setAttribute('style', 'height:' + (element.actualSize.height * zoomValue) + 'px; width:' + (element.actualSize.width * zoomValue) +
                    'px;left:' + point.x * zoomValue + 'px; top:' + point.y * zoomValue + 'px;' +
                    'position:absolute;transform:rotate(' + (element.rotateAngle + element.parentTransform) + 'deg);' +
                    'pointer-events:' + ((this.pdfViewer.designerMode) ? 'none' : 'all')
                    + ';visibility:' + ((element.visible) ? 'visible' : 'hidden') + ';opacity:' + element.style.opacity + ';');
            }
            currentData.lineBound = { X: point.x * zoomValue, Y: point.y * zoomValue, Width: element.actualSize.width * zoomValue, Height: element.actualSize.height * zoomValue };
            if (currentData.signatureBound && signatureField.wrapper.children[1]) {
                var signPoint = signatureField.wrapper.children[1].bounds;
                currentData.signatureBound.x = signPoint.x * zoomValue;
                currentData.signatureBound.y = signPoint.y * zoomValue;
                currentData.signatureBound.width = signPoint.width * zoomValue;
                currentData.signatureBound.height = signPoint.height * zoomValue;
            }
        }
        return currentData;
    };
    /* This method was commented for this task ID EJ2-61222, A method renderRadioButtonSpan was
        implemented and the values which was already taken from getCheckBoxRadioButtonBounds,
        are again calculated based on zoomValues and the size of the radio button was changed.
        This makes the radio button big in size. Refer previous task IDs EJ2-50668 and EJ2-57850 Where these lines were added. */
    /* private renderRadioButtonSpan(spanElement: HTMLCollectionOf<Element>, bounds: any, zoomValue: number): void {
        for (let i: number = 0; i < spanElement.length; i++) {
            (spanElement as any)[i].style.width = Math.floor(bounds.width - 10) + "px";
            (spanElement as any)[i].style.height = Math.floor(bounds.height - 10) + "px";
            if (bounds.width <= 14 && parseInt((spanElement as any)[i].style.width, 10) >= 2) {
                if (parseInt((spanElement as any)[i].style.width, 10) <= 5) {
                    if (bounds.width > 10) {
                        (spanElement as any)[i].style.width = Math.floor(bounds.width / (1 + zoomValue)) + "px";
                        (spanElement as any)[i].style.height = Math.floor(bounds.height / (1 + zoomValue)) + "px";
                        (spanElement as any)[i].style.margin = Math.round(bounds.width / 4) + "px";
                    }
                    else if (bounds.width < 10 && bounds.width > 5) {
                        (spanElement as any)[i].style.width = (bounds.width / 1.85) + "px";
                        (spanElement as any)[i].style.height = (bounds.height / 1.85) + "px";
                    }
                    else if (bounds.width <= 5) {
                        (spanElement as any)[i].style.width = (bounds.width / 1.85) + "px";
                        (spanElement as any)[i].style.height = (bounds.height / 1.85) + "px";
                        (spanElement as any)[i].style.margin = (bounds.width / 3.5) + "px";
                    }
                }
            }
            if (parseInt((spanElement as any)[i].style.width, 10) <= 1 || parseInt((spanElement as any)[i].style.height, 10) <= 1) {
                if ((bounds.width * zoomValue) >= 2) {
                    (spanElement as any)[i].style.width = Math.round(bounds.width / 1.65) + "px";
                    (spanElement as any)[i].style.height = Math.round(bounds.height / 1.65) + "px";
                    (spanElement as any)[i].style.margin = bounds.width / 3.8 + "px";;
                } else {
                    (spanElement as any)[i].style.width = "1px";
                    (spanElement as any)[i].style.height = "1px";
                    (spanElement as any)[i].style.margin = "1px";
                }
            }
            if (bounds.width > 14) {
                (spanElement as any)[i].style.width = (bounds.width / 2) + "px";
                (spanElement[i] as any).style.height = (bounds.height / 2) + "px";
            }
            if (zoomValue <= 1 && zoomValue > 0.70) {
                (spanElement as any)[i].style.width = (bounds.width / 1.85) + "px";
                (spanElement[i] as any).style.height = (bounds.height / 1.85) + "px";
            }

        }
    }
    */
    /**
     * @private
     */
    FormDesigner.prototype.updateFormFieldInitialSize = function (obj, formFieldAnnotationType) {
        var zoomValue = this.pdfViewerBase.getZoomFactor();
        switch (formFieldAnnotationType) {
            case 'Textbox':
                obj.width = 200 * zoomValue;
                obj.height = 24 * zoomValue;
                break;
            case 'PasswordField':
                obj.width = 200 * zoomValue;
                obj.height = 24 * zoomValue;
                break;
            case 'SignatureField':
            case 'InitialField':
                obj.width = 200 * zoomValue;
                obj.height = 63 * zoomValue;
                break;
            case 'Checkbox':
                obj.width = 20 * zoomValue;
                obj.height = 20 * zoomValue;
                break;
            case 'RadioButton':
                obj.width = 20 * zoomValue;
                obj.height = 20 * zoomValue;
                break;
            case 'DropdownList':
                obj.width = 200 * zoomValue;
                obj.height = 24 * zoomValue;
                break;
            case 'ListBox':
                obj.width = 198 * zoomValue;
                obj.height = 66 * zoomValue;
                break;
        }
        return { width: obj.width, height: obj.height };
    };
    /**
     * @private
    */
    FormDesigner.prototype.updateHTMLElement = function (actualObject) {
        var element = actualObject.wrapper.children[0];
        var zoomValue = this.pdfViewerBase.getZoomFactor();
        if (element) {
            var htmlElement = document.getElementById(element.id + "_html_element");
            if (!isNullOrUndefined(htmlElement)) {
                var point = cornersPointsBeforeRotation(actualObject.wrapper.children[0]).topLeft;
                htmlElement.setAttribute('style', 'height:' + (element.actualSize.height * zoomValue) + 'px; width:' + (element.actualSize.width * zoomValue) +
                    'px;left:' + point.x * zoomValue + 'px; top:' + point.y * zoomValue + 'px;' +
                    'position:absolute;transform:rotate(' + (element.rotateAngle + element.parentTransform) + 'deg);' +
                    'pointer-events:' + ((this.pdfViewer.designerMode) ? 'none' : 'all')
                    + ';visibility:' + ((element.visible) ? 'visible' : 'hidden') + ';opacity:' + element.style.opacity + ';');
                var data = this.pdfViewerBase.getItemFromSessionStorage('_formDesigner');
                if (actualObject.formFieldAnnotationType === "RadioButton") {
                    var labelContainer = htmlElement.firstElementChild.firstElementChild;
                    var spanElement = htmlElement.firstElementChild.firstElementChild.lastElementChild;
                    if (element.actualSize.width > element.actualSize.height) {
                        htmlElement.firstElementChild.style.display = "inherit";
                        labelContainer.style.width = labelContainer.style.height = (element.actualSize.height * zoomValue) + "px";
                        spanElement.style.width = spanElement.style.height = (element.actualSize.height - 10) + "px";
                    }
                    else {
                        htmlElement.firstElementChild.style.display = "flex";
                        labelContainer.style.width = labelContainer.style.height = (element.actualSize.width * zoomValue) + "px";
                        spanElement.style.width = spanElement.style.height = (element.actualSize.width - 10) + "px";
                    }
                }
                if (actualObject.formFieldAnnotationType === "Checkbox") {
                    var minCheckboxWidth = 20;
                    var labelContainer = htmlElement.firstElementChild.firstElementChild;
                    var spanElement = htmlElement.firstElementChild.firstElementChild.lastElementChild.firstElementChild;
                    if (element.actualSize.width > element.actualSize.height) {
                        htmlElement.firstElementChild.style.display = "inherit";
                        labelContainer.style.width = labelContainer.style.height = (element.actualSize.height * zoomValue) + "px";
                        spanElement.style.width = ((element.actualSize.height / 5) * zoomValue) + "px";
                        spanElement.style.height = ((element.actualSize.height / 2.5) * zoomValue) + "px";
                        spanElement.style.left = ((element.actualSize.height / 2.5) * zoomValue) + "px";
                        spanElement.style.top = ((element.actualSize.height / 5) * zoomValue) + "px";
                    }
                    else {
                        htmlElement.firstElementChild.style.display = "flex";
                        labelContainer.style.width = labelContainer.style.height = (element.actualSize.width * zoomValue) + "px";
                        spanElement.style.width = ((element.actualSize.width / 5) * zoomValue) + "px";
                        spanElement.style.height = ((element.actualSize.width / 2.5) * zoomValue) + "px";
                        spanElement.style.left = ((element.actualSize.width / 2.5) * zoomValue) + "px";
                        spanElement.style.top = ((element.actualSize.width / 5) * zoomValue) + "px";
                    }
                    if (spanElement.className.indexOf("e-pv-cb-checked") !== -1) {
                        var checkboxWidth = parseInt(labelContainer.style.width, 10);
                        if (checkboxWidth > minCheckboxWidth) {
                            spanElement.style.borderWidth = "3px";
                        }
                        else if (checkboxWidth <= 15) {
                            spanElement.style.borderWidth = "1px";
                        }
                        else {
                            spanElement.style.borderWidth = "2px";
                        }
                    }
                }
                if (actualObject.formFieldAnnotationType === "SignatureField" || actualObject.formFieldAnnotationType === "InitialField") {
                    var signatureDiv = htmlElement.firstElementChild.firstElementChild;
                    var indicatorSpan = signatureDiv.nextElementSibling;
                    var bounds = this.getBounds(indicatorSpan);
                    var options = {
                        height: element.actualSize.height,
                        width: element.actualSize.width,
                        signatureIndicatorSettings: {
                            text: indicatorSpan.textContent,
                            width: bounds.width,
                            height: bounds.height,
                        },
                        initialIndicatorSettings: {
                            text: indicatorSpan.textContent,
                            width: bounds.width,
                            height: bounds.height,
                        }
                    };
                    this.updateSignatureandInitialIndicator(actualObject, options, signatureDiv);
                }
                var formFieldsData = JSON.parse(data);
                for (var i = 0; i < formFieldsData.length; i++) {
                    if (formFieldsData[i].FormField.formFieldAnnotationType === "RadioButton") {
                        for (var j = 0; j < formFieldsData[i].FormField.radiobuttonItem.length; j++) {
                            if (element.id === formFieldsData[i].FormField.radiobuttonItem[j].id) {
                                this.pdfViewerBase.formFieldCollection[i].FormField.radiobuttonItem[j].lineBound = { X: point.x * zoomValue, Y: point.y * zoomValue, Width: element.actualSize.width * zoomValue, Height: element.actualSize.height * zoomValue };
                                this.pdfViewerBase.formFieldCollection[i].FormField.radiobuttonItem[j].zoomValue = zoomValue;
                                break;
                            }
                        }
                    }
                    else {
                        if (formFieldsData[i].Key === element.id) {
                            formFieldsData[i].FormField.lineBound = { X: point.x * zoomValue, Y: point.y * zoomValue, Width: element.actualSize.width * zoomValue, Height: element.actualSize.height * zoomValue };
                            if (formFieldsData[i].FormField.signatureBound) {
                                var x = (point.x * zoomValue) + (element.actualSize.width * zoomValue) / 2;
                                x = x - formFieldsData[i].FormField.signatureBound.width / 2;
                                var y = (point.y * zoomValue) + (element.actualSize.height * zoomValue) / 2;
                                y = y - formFieldsData[i].FormField.signatureBound.height / 2;
                                formFieldsData[i].FormField.signatureBound.x = x;
                                formFieldsData[i].FormField.signatureBound.y = y;
                                this.pdfViewerBase.formFieldCollection[i].FormField.signatureBound = formFieldsData[i].FormField.signatureBound;
                                this.pdfViewer.nameTable[element.id.split('_')[0] + "_content"].signatureBound = formFieldsData[i].FormField.signatureBound;
                            }
                            this.pdfViewerBase.formFieldCollection[i].FormField.lineBound = formFieldsData[i].FormField.lineBound;
                        }
                    }
                }
                this.pdfViewerBase.setItemInSessionStorage(this.pdfViewerBase.formFieldCollection, '_formDesigner');
            }
        }
    };
    FormDesigner.prototype.getCheckboxRadioButtonBounds = function (drawingObject, bounds, isPrint) {
        var zoomValue = isPrint ? this.defaultZoomValue : this.pdfViewerBase.getZoomFactor();
        var width = 0;
        var height = 0;
        var display = '';
        if (bounds) {
            if (bounds.width > bounds.height) {
                width = height = bounds.height * zoomValue;
                display = "inherit";
            }
            else {
                width = height = bounds.width * zoomValue;
                display = "flex";
            }
        }
        else if (drawingObject) {
            if (drawingObject.bounds.width > drawingObject.bounds.height) {
                width = height = drawingObject.bounds.height * zoomValue;
                display = "inherit";
            }
            else {
                width = height = drawingObject.bounds.width * zoomValue;
                display = "flex";
            }
        }
        return { width: width, height: height, display: display };
    };
    FormDesigner.prototype.updateSessionFormFieldProperties = function (updatedFormFields) {
        var zoomValue = this.pdfViewerBase.getZoomFactor();
        var element = updatedFormFields.wrapper.children[0];
        var data = this.pdfViewerBase.getItemFromSessionStorage('_formDesigner');
        var formFieldsData = JSON.parse(data);
        for (var i = 0; i < formFieldsData.length; i++) {
            if (formFieldsData[i].FormField.formFieldAnnotationType === "RadioButton") {
                for (var j = 0; j < formFieldsData[i].FormField.radiobuttonItem.length; j++) {
                    if (element.id === formFieldsData[i].FormField.radiobuttonItem[j].id) {
                        var radioButtonItemUpdate = {
                            id: element.id, lineBound: { X: element.bounds.x * zoomValue, Y: element.bounds.y * zoomValue, Width: element.bounds.width * zoomValue, Height: element.bounds.height * zoomValue },
                            name: updatedFormFields.name, zoomValue: zoomValue, pageNumber: updatedFormFields.pageNumber, value: updatedFormFields.value, formFieldAnnotationType: updatedFormFields.formFieldAnnotationType,
                            fontFamily: updatedFormFields.fontFamily, fontSize: updatedFormFields.fontSize, fontStyle: updatedFormFields.fontStyle, fontColor: this.getRgbCode(updatedFormFields.color),
                            backgroundColor: this.getRgbCode(updatedFormFields.backgroundColor), borderColor: this.getRgbCode(updatedFormFields.borderColor), thickness: updatedFormFields.thickness, textAlign: updatedFormFields.alignment, isChecked: updatedFormFields.isChecked, isSelected: updatedFormFields.isSelected,
                            isReadonly: updatedFormFields.isReadonly, visibility: updatedFormFields.visibility, maxLength: updatedFormFields.maxLength, isRequired: updatedFormFields.isRequired, isPrint: updatedFormFields.isPrint, rotation: 0, tooltip: updatedFormFields.tooltip
                        };
                        formFieldsData[i].FormField.radiobuttonItem[j] = radioButtonItemUpdate;
                        if (this.pdfViewerBase.formFieldCollection[i] && this.pdfViewerBase.formFieldCollection[i].FormField && this.pdfViewerBase.formFieldCollection[i].FormField.radiobuttonItem[j]) {
                            this.pdfViewerBase.formFieldCollection[i].FormField.radiobuttonItem[j] = radioButtonItemUpdate;
                        }
                        break;
                    }
                }
            }
            else if (formFieldsData[i].Key === element.id) {
                var formDesignObj = {
                    id: element.id, lineBound: { X: element.bounds.x * zoomValue, Y: element.bounds.y * zoomValue, Width: element.bounds.width * zoomValue, Height: element.bounds.height * zoomValue },
                    name: updatedFormFields.name, zoomValue: zoomValue, pageNumber: updatedFormFields.pageNumber, value: updatedFormFields.value, formFieldAnnotationType: updatedFormFields.formFieldAnnotationType,
                    fontFamily: updatedFormFields.fontFamily, fontSize: updatedFormFields.fontSize, fontStyle: updatedFormFields.fontStyle, fontColor: this.getRgbCode(updatedFormFields.color),
                    backgroundColor: this.getRgbCode(updatedFormFields.backgroundColor), borderColor: this.getRgbCode(updatedFormFields.borderColor), thickness: updatedFormFields.thickness, textAlign: updatedFormFields.alignment, isChecked: updatedFormFields.isChecked, isSelected: updatedFormFields.isSelected,
                    isReadonly: updatedFormFields.isReadonly, font: { isBold: updatedFormFields.font.isBold, isItalic: updatedFormFields.font.isItalic, isStrikeout: updatedFormFields.font.isStrikeout, isUnderline: updatedFormFields.font.isUnderline }, selectedIndex: updatedFormFields.selectedIndex, radiobuttonItem: null, option: updatedFormFields.options ? updatedFormFields.options : [], visibility: updatedFormFields.visibility, maxLength: updatedFormFields.maxLength, isRequired: updatedFormFields.isRequired, isPrint: updatedFormFields.isPrint, rotation: 0, tooltip: updatedFormFields.tooltip
                };
                if (formFieldsData[i].FormField.formFieldAnnotationType === "SignatureField" || formFieldsData[i].FormField.formFieldAnnotationType === "InitialField") {
                    var updatedSignatureFormFields = updatedFormFields;
                    var formDesignObj_1 = {
                        id: element.id, lineBound: { X: element.bounds.x * zoomValue, Y: element.bounds.y * zoomValue, Width: element.bounds.width * zoomValue, Height: element.bounds.height * zoomValue },
                        name: updatedFormFields.name, zoomValue: zoomValue, pageNumber: updatedFormFields.pageNumber, value: updatedFormFields.value, formFieldAnnotationType: updatedFormFields.formFieldAnnotationType,
                        fontFamily: updatedFormFields.fontFamily, fontSize: updatedFormFields.fontSize, fontStyle: updatedFormFields.fontStyle, fontColor: this.getRgbCode(updatedFormFields.color),
                        backgroundColor: this.getRgbCode(updatedFormFields.backgroundColor), borderColor: this.getRgbCode(updatedFormFields.borderColor), thickness: updatedFormFields.thickness, textAlign: updatedFormFields.alignment, isChecked: updatedFormFields.isChecked, isSelected: updatedFormFields.isSelected,
                        isReadonly: updatedFormFields.isReadonly, font: { isBold: updatedFormFields.font.isBold, isItalic: updatedFormFields.font.isItalic, isStrikeout: updatedFormFields.font.isStrikeout, isUnderline: updatedFormFields.font.isUnderline }, selectedIndex: updatedFormFields.selectedIndex, radiobuttonItem: null, option: updatedFormFields.options ? updatedFormFields.options : [], visibility: updatedFormFields.visibility, maxLength: updatedFormFields.maxLength, isRequired: updatedFormFields.isRequired, isPrint: updatedFormFields.isPrint, rotation: 0, tooltip: updatedFormFields.tooltip,
                        signatureType: updatedFormFields.signatureType, signatureBound: updatedSignatureFormFields.signatureBound
                    };
                    formFieldsData[i].FormField = formDesignObj_1;
                    this.pdfViewerBase.formFieldCollection[i].FormField = formDesignObj_1;
                }
                else {
                    formFieldsData[i].FormField = formDesignObj;
                    this.pdfViewerBase.formFieldCollection[i].FormField = formDesignObj;
                }
                break;
            }
        }
        if (this.pdfViewerBase.formFieldCollection.length > 0) {
            this.pdfViewerBase.enableFormFieldButton(true);
        }
        else {
            this.pdfViewerBase.enableFormFieldButton(false);
        }
        this.pdfViewerBase.setItemInSessionStorage(this.pdfViewerBase.formFieldCollection, '_formDesigner');
    };
    /**
     * @private
     */
    FormDesigner.prototype.createSignatureDialog = function (commandHandler, signatureField, bounds, isPrint) {
        this.isInitialField = isNullOrUndefined(signatureField.isInitialField) ? false : signatureField.isInitialField;
        this.pdfViewerBase.isInitialField = this.isInitialField;
        this.pdfViewerBase.isInitialField = signatureField.isInitialField;
        var element = createElement("div");
        element.className = "foreign-object";
        element.style.position = "absolute";
        element.style.width = "100%";
        element.style.height = "100%";
        element.addEventListener('focus', this.focusFormFields.bind(this));
        element.addEventListener('blur', this.blurFormFields.bind(this));
        var divElement = createElement("div");
        divElement.style.width = "100%";
        divElement.style.height = "100%";
        divElement.style.position = "absolute";
        divElement.style.backgroundColor = "transparent";
        if (!isNullOrUndefined(signatureField.thickness)) {
            divElement.className = 'e-pdfviewer-signatureformfields-signature';
            divElement.style.border = (signatureField.thickness) + 'px solid #303030';
        }
        if (!isNullOrUndefined(signatureField.value) && signatureField.value !== '') {
            divElement.className = 'e-pdfviewer-signatureformfields-signature';
            divElement.style.pointerEvents = 'none';
        }
        else {
            divElement.className = 'e-pdfviewer-signatureformfields';
            divElement.style.pointerEvents = '';
        }
        divElement.id = signatureField.id;
        divElement.disabled = signatureField.isReadonly;
        element.appendChild(divElement);
        var signatureFieldSettings = this.pdfViewer.signatureFieldSettings;
        var initialFieldSettings = this.pdfViewer.initialFieldSettings;
        if (!signatureFieldSettings.signatureIndicatorSettings) {
            signatureFieldSettings.signatureIndicatorSettings = { opacity: 1, backgroundColor: 'orange', width: 19, height: 10, fontSize: 10, text: null, color: 'black' };
        }
        if (!signatureFieldSettings.signatureDialogSettings) {
            signatureFieldSettings.signatureDialogSettings = { displayMode: DisplayMode.Draw | DisplayMode.Text | DisplayMode.Upload, hideSaveSignature: false };
        }
        //check whether the width for sign indicator has default value or not and then set the default width value for initial field.
        var indicatorSettings;
        if (signatureField.isInitialField) {
            indicatorSettings = signatureField.signatureIndicatorSettings ? signatureField.signatureIndicatorSettings : initialFieldSettings.initialIndicatorSettings;
        }
        else {
            indicatorSettings = signatureField.signatureIndicatorSettings ? signatureField.signatureIndicatorSettings : signatureFieldSettings.signatureIndicatorSettings;
        }
        var defaultWidth = this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings.width === 19 ? (signatureField.isInitialField ? 30 : 25) : this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings.width;
        var signatureFieldIndicatorWidth = indicatorSettings.width ? indicatorSettings.width : (signatureField.signatureIndicatorSettings && signatureField.signatureIndicatorSettings.width) ? signatureField.signatureIndicatorSettings.width : defaultWidth;
        var defaultHeight = this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings.height === 10 ? 13 : this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings.height;
        var signatureFieldIndicatorHeight = indicatorSettings.height ? indicatorSettings.height : (signatureField.signatureIndicatorSettings && signatureField.signatureIndicatorSettings.height) ? signatureField.signatureIndicatorSettings.height : defaultHeight;
        var signatureFieldIndicatorBG = indicatorSettings.backgroundColor ? (indicatorSettings.backgroundColor === 'orange' ? '#FFE48559' : indicatorSettings.backgroundColor) : (signatureField.signatureIndicatorSettings && signatureField.signatureIndicatorSettings.backgroundColor) ? signatureField.signatureIndicatorSettings.backgroundColor : '#FFE48559';
        var signIndicator = signatureField.isInitialField ? "Initial" : "Sign";
        var signatureFieldWidth = signatureField.bounds ? signatureField.bounds.width : bounds.width;
        var signatureFieldHeight = signatureField.bounds ? signatureField.bounds.height : bounds.height;
        // eslint-disable-next-line max-len
        var height = signatureFieldIndicatorHeight > signatureFieldHeight / 2 ? signatureFieldHeight / 2 : signatureFieldIndicatorHeight;
        // eslint-disable-next-line max-len
        var width = signatureFieldIndicatorWidth > signatureFieldWidth / 2 ? signatureFieldWidth / 2 : signatureFieldIndicatorWidth;
        var fontSize = 10;
        if (signatureField.signatureIndicatorSettings && signatureField.signatureIndicatorSettings.fontSize)
            // eslint-disable-next-line max-len
            fontSize = signatureField.signatureIndicatorSettings.fontSize > height / 2 ? 10 : signatureField.signatureIndicatorSettings.fontSize;
        else
            // eslint-disable-next-line max-len
            fontSize = this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings.fontSize > height / 2 ? 10 : this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings.fontSize;
        var spanElement = createElement("span");
        if (!initialFieldSettings.initialIndicatorSettings) {
            initialFieldSettings.initialIndicatorSettings = { opacity: 1, backgroundColor: 'orange', width: 19, height: 10, fontSize: 10, text: null, color: 'black' };
        }
        if (!initialFieldSettings.initialDialogSettings) {
            initialFieldSettings.initialDialogSettings = { displayMode: DisplayMode.Draw | DisplayMode.Text | DisplayMode.Upload, hideSaveSignature: false };
        }
        var fieldText = signatureField.signatureIndicatorSettings ? signatureField.signatureIndicatorSettings.text : null;
        if (signatureField.formFieldAnnotationType == "InitialField") {
            spanElement.id = "initialIcon_" + signatureField.pageIndex + "_" + this.setFormFieldIdIndex();
            this.setIndicatorText(spanElement, fieldText, this.pdfViewer.initialFieldSettings.initialIndicatorSettings.text, "Initial");
        }
        else {
            spanElement.style.height = '';
            spanElement.style.width = '';
            spanElement.id = "signIcon_" + signatureField.pageIndex + "_" + this.setFormFieldIdIndex();
            this.setIndicatorText(spanElement, fieldText, this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings.text, "Sign");
        }
        spanElement.style.overflow = "hidden";
        spanElement.style.whiteSpace = "nowrap";
        spanElement.style.padding = "2px 3px 2px 1px";
        spanElement.style.boxSizing = "border-box";
        var zoomValue = this.pdfViewerBase.getZoomFactor();
        spanElement.style.textAlign = "left";
        spanElement.style.fontSize = (fontSize * zoomValue) + 'px';
        var boundsOfSpan = this.getBounds(spanElement);
        //Set spanelement indicator property
        spanElement.style.backgroundColor = signatureFieldIndicatorBG;
        spanElement.style.color = indicatorSettings.color;
        spanElement.style.opacity = indicatorSettings.opacity;
        spanElement.style.height = signatureFieldIndicatorHeight;
        spanElement.style.width = signatureFieldIndicatorWidth;
        spanElement.style.position = "absolute";
        var widthNew = this.setHeightWidth(signatureFieldWidth, width, boundsOfSpan.width + fontSize, zoomValue);
        spanElement.style.width = widthNew + "px";
        var heightNew = this.setHeightWidth(signatureFieldHeight, height, boundsOfSpan.height, zoomValue);
        spanElement.style.height = heightNew + "px";
        if (!isPrint) {
            element.appendChild(spanElement);
        }
        this.updateSignInitialFieldProperties(signatureField, signatureField.isInitialField, this.pdfViewer.isFormDesignerToolbarVisible, this.isSetFormFieldMode);
        if (!isNullOrUndefined(signatureField.tooltip) && signatureField.tooltip != "") {
            this.setToolTip(signatureField.tooltip, element);
        }
        this.updateSignatureFieldProperties(signatureField, element, isPrint);
        return element;
    };
    // eslint-disable-next-line
    FormDesigner.prototype.setIndicatorText = function (spanElement, fieldText, indicatorText, defaultText) {
        spanElement.innerHTML = fieldText ? fieldText : indicatorText ? indicatorText : defaultText;
    };
    FormDesigner.prototype.getBounds = function (htmlElement) {
        var clonedElement = htmlElement.cloneNode(true);
        clonedElement.style.height = '';
        clonedElement.style.width = '';
        clonedElement.id = clonedElement.id + "_clonedElement";
        document.body.appendChild(clonedElement);
        var clone = document.getElementById(clonedElement.id);
        var bounds = clone.getBoundingClientRect();
        document.body.removeChild(clonedElement);
        return bounds;
    };
    FormDesigner.prototype.updateSignatureandInitialIndicator = function (formFieldObject, options, htmlElement) {
        if (htmlElement !== null) {
            var fieldBounds = htmlElement.getBoundingClientRect();
            var zoomValue = this.pdfViewerBase.getZoomFactor();
            var spanElement = htmlElement.nextElementSibling;
            var objIndicatorSettings = void 0;
            var indicatorSettings = void 0;
            if (formFieldObject.formFieldAnnotationType === 'SignatureField') {
                objIndicatorSettings = formFieldObject.signatureIndicatorSettings;
                indicatorSettings = options.signatureIndicatorSettings;
            }
            if (formFieldObject.formFieldAnnotationType === 'InitialField') {
                // eslint-disable-next-line
                objIndicatorSettings = formFieldObject.signatureIndicatorSettings ? formFieldObject.signatureIndicatorSettings : this.pdfViewer.initialFieldSettings.initialIndicatorSettings;
                indicatorSettings = options.initialIndicatorSettings;
            }
            spanElement.style.width = '';
            spanElement.style.height = '';
            if (indicatorSettings && objIndicatorSettings) {
                if (indicatorSettings.text !== undefined) {
                    this.setIndicatorText(spanElement, indicatorSettings.text, indicatorSettings.text, "Sign");
                    objIndicatorSettings.text = indicatorSettings.text;
                }
                if (indicatorSettings.fontSize) {
                    spanElement.style.fontSize = indicatorSettings.fontSize > formFieldObject.height / 2 ? 10 : indicatorSettings.fontSize * zoomValue + "px";
                    objIndicatorSettings.fontSize = indicatorSettings.fontSize;
                }
                var bounds = this.getBounds(spanElement);
                if (indicatorSettings.color) {
                    spanElement.style.color = indicatorSettings.color;
                    objIndicatorSettings.color = this.nameToHash(indicatorSettings.color);
                }
                if (indicatorSettings.backgroundColor) {
                    spanElement.style.backgroundColor = indicatorSettings.backgroundColor;
                    objIndicatorSettings.backgroundColor = this.nameToHash(indicatorSettings.backgroundColor);
                }
                if (indicatorSettings.opacity) {
                    spanElement.style.opacity = indicatorSettings.opacity;
                    objIndicatorSettings.opacity = indicatorSettings.opacity;
                }
                if (indicatorSettings.width || options.width || indicatorSettings.text) {
                    var width = this.setHeightWidth(fieldBounds.width, indicatorSettings.width, bounds.width, zoomValue);
                    spanElement.style.width = width + "px";
                    objIndicatorSettings.width = width;
                }
                if (indicatorSettings.height || options.height || indicatorSettings.text) {
                    var height = this.setHeightWidth(fieldBounds.height, indicatorSettings.height, bounds.height, zoomValue);
                    spanElement.style.height = height + "px";
                    objIndicatorSettings.height = height;
                }
            }
            this.updateSignatureFieldProperties(formFieldObject, htmlElement, formFieldObject.isPrint);
            if (formFieldObject.signatureIndicatorSettings && objIndicatorSettings) {
                formFieldObject.signatureIndicatorSettings = objIndicatorSettings;
            }
            return formFieldObject;
        }
    };
    FormDesigner.prototype.setHeightWidth = function (fieldBound, indicatorBound, referenceBound, zoomValue) {
        var heightOrWidth;
        if (fieldBound / 2 > indicatorBound && referenceBound < indicatorBound) {
            heightOrWidth = indicatorBound * zoomValue;
        }
        else if (referenceBound <= fieldBound / 2) {
            heightOrWidth = referenceBound * zoomValue;
        }
        else {
            heightOrWidth = fieldBound / 2 * zoomValue;
        }
        return heightOrWidth;
    };
    /**
     * @private
     */
    FormDesigner.prototype.createDropDownList = function (dropdownElement, drawingObject, isPrint) {
        var element = createElement("div");
        element.className = "foreign-object";
        element.style.position = "absolute";
        element.style.width = "100%";
        element.style.height = "100%";
        var select = document.createElement("select");
        select.addEventListener('change', this.dropdownChange.bind(this));
        select.addEventListener('focus', this.focusFormFields.bind(this));
        select.addEventListener('blur', this.blurFormFields.bind(this));
        select.id = drawingObject.id;
        select.name = "editabledropdown" + this.pdfViewerBase.activeElements.activePageID + dropdownElement.id;
        select.setAttribute("aria-label", "editabledropdown" + this.pdfViewerBase.activeElements.activePageID + dropdownElement.id);
        select.className = "e-pv-formfield-dropdown";
        select.style.width = "100%";
        select.style.height = "100%";
        select.style.position = "absolute";
        this.updateDropdownFieldSettingsProperties(drawingObject, this.pdfViewer.isFormDesignerToolbarVisible, this.isSetFormFieldMode);
        var dropDownChildren = drawingObject.options ? drawingObject.options : [];
        this.updateDropdownListProperties(drawingObject, select, isPrint);
        for (var j = 0; j < dropDownChildren.length; j++) {
            var option = document.createElement("option");
            option.className = "e-pv-formfield-dropdown";
            option.value = dropDownChildren[j].itemValue;
            option.text = dropDownChildren[j].itemName;
            this.updateDropdownListProperties(drawingObject, option);
            select.appendChild(option);
        }
        select.selectedIndex = !isNullOrUndefined(drawingObject.selectedIndex) ? drawingObject.selectedIndex : 0;
        element.appendChild(select);
        if (!isNullOrUndefined(drawingObject.tooltip) && drawingObject.tooltip != "") {
            this.setToolTip(drawingObject.tooltip, element);
        }
        return element;
    };
    /**
     * @private
     */
    FormDesigner.prototype.createListBox = function (listBoxElement, drawingObject, isPrint) {
        var element = createElement("div");
        element.className = "foreign-object";
        element.style.position = "absolute";
        element.style.width = "100%";
        element.style.height = "100%";
        var select = document.createElement("select");
        select.addEventListener('click', this.listBoxChange.bind(this));
        select.addEventListener('focus', this.focusFormFields.bind(this));
        select.addEventListener('blur', this.blurFormFields.bind(this));
        select.id = drawingObject.id;
        select.name = "editabledropdown" + this.pdfViewerBase.activeElements.activePageID + listBoxElement.id;
        select.setAttribute("aria-label", "editabledropdown" + this.pdfViewerBase.activeElements.activePageID + listBoxElement.id);
        select.className = "e-pv-formfield-listbox";
        select.style.width = "100%";
        select.style.height = "100%";
        select.style.position = "absolute";
        select.multiple = true;
        this.updatelistBoxFieldSettingsProperties(drawingObject, this.pdfViewer.isFormDesignerToolbarVisible, this.isSetFormFieldMode);
        var dropDownChildren = drawingObject.options ? drawingObject.options : [];
        this.updateListBoxProperties(drawingObject, select, isPrint);
        for (var j = 0; j < dropDownChildren.length; j++) {
            var option = document.createElement("option");
            option.className = "e-pv-formfield-listbox";
            option.value = dropDownChildren[j].itemValue;
            option.text = dropDownChildren[j].itemName;
            if (!isNullOrUndefined(drawingObject.selectedIndex)) {
                for (var k = 0; k < drawingObject.selectedIndex.length; k++) {
                    if (j === drawingObject.selectedIndex[k]) {
                        option.selected = true;
                    }
                }
            }
            select.appendChild(option);
        }
        element.appendChild(select);
        if (!isNullOrUndefined(drawingObject.tooltip) && drawingObject.tooltip != "") {
            this.setToolTip(drawingObject.tooltip, element);
        }
        return element;
    };
    /**
     * @private
     */
    FormDesigner.prototype.createInputElement = function (formFieldAnnotationType, drawingObject, formFieldBounds, isPrint) {
        var zoomValue = this.pdfViewerBase.getZoomFactor();
        var element = createElement("div");
        element.className = "foreign-object";
        element.style.position = "absolute";
        element.style.width = "100%";
        element.style.height = "100%";
        var labelElement;
        var checkboxDiv;
        var innerSpan;
        var inputElement = createElement("input");
        var textArea = createElement('textarea');
        inputElement.id = drawingObject.id;
        inputElement.setAttribute("aria-label", this.pdfViewer.element.id + "formfilldesigner");
        inputElement.style.position = "absolute";
        if (formFieldAnnotationType === "Textbox") {
            if (drawingObject.isMultiline) {
                textArea = this.createTextAreaElement(inputElement.id);
                this.updateTextFieldSettingProperties(drawingObject, this.pdfViewer.isFormDesignerToolbarVisible, this.isSetFormFieldMode);
                this.updateTextboxProperties(drawingObject, textArea, isPrint);
            }
            else {
                inputElement = this.createTextboxElement(inputElement.id);
                this.updateTextFieldSettingProperties(drawingObject, this.pdfViewer.isFormDesignerToolbarVisible, this.isSetFormFieldMode);
                this.updateTextboxProperties(drawingObject, inputElement, isPrint);
            }
        }
        else if (formFieldAnnotationType == "Checkbox") {
            var zoomLevel = isPrint ? this.defaultZoomValue : this.pdfViewerBase.getZoomFactor();
            var minCheckboxWidth = 20;
            element.style.display = "flex";
            element.style.alignItems = "center";
            var bounds = this.getCheckboxRadioButtonBounds(drawingObject, formFieldBounds, isPrint);
            element.style.display = bounds.display;
            labelElement = createElement("label", { className: "e-pv-checkbox-container" });
            labelElement.style.width = drawingObject.bounds ? (drawingObject.bounds.width * zoomLevel) + "px" : bounds.width + "px";
            labelElement.style.height = drawingObject.bounds ? (drawingObject.bounds.height * zoomLevel) + "px" : bounds.height + "px";
            if (this.isDrawHelper)
                labelElement.style.cursor = 'crosshair';
            else
                labelElement.style.cursor = 'pointer';
            checkboxDiv = createElement("div", { className: "e-pv-checkbox-div" });
            if (!Browser.isDevice) {
                checkboxDiv.addEventListener('click', this.setCheckBoxState.bind(this));
                checkboxDiv.addEventListener('focus', this.focusFormFields.bind(this));
                checkboxDiv.addEventListener('blur', this.blurFormFields.bind(this));
            }
            checkboxDiv.id = drawingObject.id + "_input";
            if (drawingObject.isChecked) {
                innerSpan = createElement("span", { className: "e-pv-checkbox-span e-pv-cb-checked" });
            }
            else
                innerSpan = createElement("span", { className: "e-pv-checkbox-span e-pv-cb-unchecked" });
            innerSpan.id = drawingObject.id + "_input_span";
            labelElement.id = drawingObject.id + "_input_label";
            innerSpan.style.width = (bounds.width / 5) + "px";
            innerSpan.style.height = (bounds.height / 2.5) + "px";
            innerSpan.style.left = (bounds.width / 2.5) + "px";
            innerSpan.style.top = (bounds.height / 5) + "px";
            if (innerSpan.className.indexOf("e-pv-cb-checked") !== -1) {
                var checkboxWidth_1 = parseInt(labelElement.style.width, 10);
                if (checkboxWidth_1 > minCheckboxWidth) {
                    innerSpan.style.borderWidth = "3px";
                }
                else if (checkboxWidth_1 <= 15) {
                    innerSpan.style.borderWidth = "1px";
                }
                else {
                    innerSpan.style.borderWidth = "2px";
                }
            }
            if (isPrint) {
                checkboxDiv.style.backgroundColor = "rgb(218, 234, 247)";
                checkboxDiv.style.border = "1px solid #303030";
                checkboxDiv.style.visibility = "visible";
                checkboxDiv.style.height = "100%";
                checkboxDiv.style.width = "100%";
                checkboxDiv.style.position = "absolute";
                if (innerSpan.className.indexOf("e-pv-cb-checked") !== -1) {
                    innerSpan.style.border = "solid #303030";
                    innerSpan.style.position = "absolute";
                    innerSpan.style.borderLeft = "transparent";
                    innerSpan.style.borderTop = "transparent";
                    innerSpan.style.transform = "rotate(45deg)";
                    var checkboxWidth = parseInt(labelElement.style.width, 10);
                    if (checkboxWidth > minCheckboxWidth) {
                        innerSpan.style.borderWidth = "3px";
                    }
                    else if (checkboxWidth <= 15) {
                        innerSpan.style.borderWidth = "1px";
                    }
                    else {
                        innerSpan.style.borderWidth = "2px";
                    }
                }
            }
            inputElement.type = "checkbox";
            inputElement.style.margin = "0px";
            inputElement.style.width = bounds.width + "px";
            inputElement.style.height = bounds.height + "px";
            if (!isPrint) {
                this.updateCheckBoxFieldSettingsProperties(drawingObject, this.pdfViewer.isFormDesignerToolbarVisible, this.isSetFormFieldMode);
            }
            this.updateCheckboxProperties(drawingObject, checkboxDiv);
            inputElement.appendChild(labelElement);
            labelElement.appendChild(checkboxDiv);
            checkboxDiv.appendChild(innerSpan);
            if (isPrint) {
                inputElement.style.outlineWidth = drawingObject.thickness + 'px';
                inputElement.style.outlineColor = drawingObject.borderColor;
                inputElement.style.outlineStyle = 'solid';
                inputElement.style.background = drawingObject.backgroundColor;
            }
        }
        else if (formFieldAnnotationType == "PasswordField") {
            inputElement.type = "password";
            inputElement.className = "e-pv-formfield-input";
            inputElement.style.width = '100%';
            inputElement.style.height = '100%';
            inputElement.style.borderStyle = "solid";
            inputElement.addEventListener('click', this.inputElementClick.bind(this));
            inputElement.addEventListener('focus', this.focusFormFields.bind(this));
            inputElement.addEventListener('blur', this.blurFormFields.bind(this));
            inputElement.addEventListener('change', this.getTextboxValue.bind(this));
            this.updatePasswordFieldSettingProperties(drawingObject, this.pdfViewer.isFormDesignerToolbarVisible, this.isSetFormFieldMode);
            this.updatePasswordFieldProperties(drawingObject, inputElement, isPrint);
        }
        else {
            /*
            The below line have been commented for "EJ2-59941 bug"
            While setting the textAlign to center the radio button position moved from center to the parent element
            instead of left to the parent element
            element.style.textAlign = (Browser.info.name === "chrome") ? "-webkit-center" : "center";
            */
            element.style.display = "flex";
            element.style.alignItems = "center";
            var bounds = this.getCheckboxRadioButtonBounds(drawingObject, formFieldBounds, isPrint);
            element.style.display = bounds.display;
            labelElement = createElement("label", { className: "e-pv-radiobtn-container" });
            labelElement.style.width = bounds.width + "px";
            labelElement.style.height = bounds.height + "px";
            labelElement.style.display = "table";
            labelElement.style.verticalAlign = "middle";
            labelElement.style.borderWidth = drawingObject.thickness + 'px';
            labelElement.style.boxShadow = drawingObject.borderColor + ' 0px 0px 0px ' + drawingObject.thickness + 'px';
            labelElement.style.borderRadius = '50%';
            labelElement.style.visibility = drawingObject.visibility;
            if (this.isDrawHelper)
                labelElement.style.cursor = 'crosshair';
            else
                labelElement.style.cursor = 'pointer';
            labelElement.style.background = drawingObject.backgroundColor;
            innerSpan = createElement("span", { className: "e-pv-radiobtn-span" });
            innerSpan.id = drawingObject.id + "_input_span";
            innerSpan.style.width = Math.floor(bounds.width / 2) + "px";
            innerSpan.style.height = Math.floor(bounds.height / 2) + "px";
            if (zoomValue < 1 && bounds.width <= 20 && bounds.height <= 20) {
                innerSpan.style.margin = Math.round(parseInt(labelElement.style.width) / 3.5) + "px";
            }
            else {
                innerSpan.style.margin = Math.round(parseInt(labelElement.style.width) / 4) + "px";
            }
            labelElement.addEventListener('click', this.setRadioButtonState.bind(this));
            labelElement.id = drawingObject.id + "_input_label";
            inputElement.type = "radio";
            if (!isPrint)
                inputElement.className = "e-pv-radio-btn";
            inputElement.style.margin = "0px";
            inputElement.addEventListener('click', function (event) {
                event.stopPropagation();
            });
            inputElement.addEventListener('focus', this.focusFormFields.bind(this));
            inputElement.addEventListener('blur', this.blurFormFields.bind(this));
            inputElement.style.width = bounds.width + "px";
            inputElement.style.height = bounds.height + "px";
            this.updateRadioButtonFieldSettingProperties(drawingObject, this.pdfViewer.isFormDesignerToolbarVisible, this.isSetFormFieldMode);
            this.updateRadioButtonProperties(drawingObject, inputElement);
            labelElement.appendChild(inputElement);
            labelElement.appendChild(innerSpan);
            if (drawingObject.isRequired) {
                labelElement.style.boxShadow = 'red 0px 0px 0px ' + drawingObject.thickness + 'px';
            }
            // if (isPrint) {
            //     inputElement.style.outlineWidth = drawingObject.thickness + 'px';
            //     inputElement.style.outlineColor = drawingObject.borderColor;
            //     inputElement.style.outlineStyle = 'solid';
            //     inputElement.style.background = drawingObject.backgroundColor;
            // }
        }
        if ((formFieldAnnotationType === "Checkbox" || formFieldAnnotationType === "RadioButton") && !isPrint) {
            element.appendChild(labelElement);
        }
        else if (formFieldAnnotationType === "Checkbox" && isPrint) {
            element.appendChild(labelElement);
        }
        else {
            if (drawingObject.isMultiline) {
                element.appendChild(textArea);
            }
            else {
                element.appendChild(inputElement);
            }
        }
        if (!isNullOrUndefined(drawingObject.tooltip) && drawingObject.tooltip != "") {
            if (formFieldAnnotationType === 'RadioButton')
                this.setToolTip(drawingObject.tooltip, labelElement);
            else
                this.setToolTip(drawingObject.tooltip, element);
        }
        this.isDrawHelper = false;
        return element;
    };
    FormDesigner.prototype.listBoxChange = function (event) {
        var data = this.pdfViewerBase.getItemFromSessionStorage('_formDesigner');
        var formFieldsData = JSON.parse(data);
        for (var i = 0; i < formFieldsData.length; i++) {
            if (formFieldsData[i].Key.split("_")[0] === event.currentTarget.id.split("_")[0] ||
                this.pdfViewer.nameTable[event.currentTarget.id.split("_")[0]].name === formFieldsData[i].FormField.name) {
                if (formFieldsData[i].Key.split("_")[0] !== event.currentTarget.id.split("_")[0]) {
                    var inputElement = document.getElementById((formFieldsData[i].Key.split("_")[0] + "_content_html_element")).firstElementChild.firstElementChild;
                    for (var k = 0; k < event.currentTarget.options.length; k++) {
                        inputElement.options[k].selected = event.currentTarget.options[k].selected;
                    }
                }
                formFieldsData[i].FormField.selectedIndex = [];
                var oldValues = this.pdfViewerBase.formFieldCollection[i].FormField.selectedIndex;
                for (var j = 0; j < event.currentTarget.selectedOptions.length; j++) {
                    var selectIndex = event.currentTarget.selectedOptions[j].index;
                    var oldValueIndex = 0;
                    if (this.pdfViewerBase.formFieldCollection[i].FormField.selectedIndex && this.pdfViewerBase.formFieldCollection[i].FormField.selectedIndex.length !== 0) {
                        if (this.pdfViewerBase.formFieldCollection[i].FormField.selectedIndex[0] >= 0) {
                            oldValueIndex = this.pdfViewerBase.formFieldCollection[i].FormField.selectedIndex.pop();
                        }
                        this.pdfViewerBase.formFieldCollection[i].FormField.selectedIndex.push(oldValueIndex);
                    }
                    var oldValue = formFieldsData[i].FormField.option[oldValueIndex].itemValue;
                    formFieldsData[i].FormField.selectedIndex.push(selectIndex);
                    this.pdfViewer.nameTable[formFieldsData[i].Key.split("_")[0]].selectedIndex = formFieldsData[i].FormField.selectedIndex;
                    this.pdfViewerBase.formFieldCollection[i].FormField.selectedIndex = formFieldsData[i].FormField.selectedIndex;
                    var newValue = formFieldsData[i].FormField.option[selectIndex].itemValue;
                    this.pdfViewerBase.formFieldCollection[i].FormField.value = newValue;
                    this.updateFormFieldCollections(this.pdfViewerBase.formFieldCollection[i].FormField);
                    this.pdfViewer.fireFormFieldPropertiesChangeEvent("formFieldPropertiesChange", formFieldsData[i].FormField, this.pdfViewerBase.formFieldCollection[i].FormField.pageNumber, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, oldValue, newValue);
                }
                if (this.pdfViewer.annotation) {
                    this.pdfViewer.annotation.addAction(this.pdfViewerBase.formFieldCollection[i].FormField.pageNumber, null, this.pdfViewerBase.formFieldCollection[i].FormField, 'FormField Value Change', '', oldValues, this.pdfViewerBase.formFieldCollection[i].FormField.selectedIndex);
                }
            }
        }
        this.pdfViewerBase.setItemInSessionStorage(this.pdfViewerBase.formFieldCollection, '_formDesigner');
        this.updateFormFieldSessions();
    };
    FormDesigner.prototype.dropdownChange = function (event) {
        var data = this.pdfViewerBase.getItemFromSessionStorage('_formDesigner');
        var formFieldsData = JSON.parse(data);
        for (var i = 0; i < formFieldsData.length; i++) {
            if (formFieldsData[i].Key.split("_")[0] === event.target.id.split("_")[0] ||
                this.pdfViewer.nameTable[event.target.id.split("_")[0]].name === formFieldsData[i].FormField.name) {
                this.pdfViewerBase.formFieldCollection[i].FormField.selectedIndex = [];
                var selectIndex = document.getElementById(event.currentTarget.id).selectedIndex;
                var oldValueIndex = 0;
                if (formFieldsData[i].FormField.selectedIndex.length !== 0) {
                    oldValueIndex = formFieldsData[i].FormField.selectedIndex.pop();
                    formFieldsData[i].FormField.selectedIndex.push(oldValueIndex);
                }
                var oldValue = formFieldsData[i].FormField.option[oldValueIndex].itemValue;
                this.pdfViewerBase.formFieldCollection[i].FormField.selectedIndex.push(selectIndex);
                formFieldsData[i].FormField.selectedIndex = this.pdfViewerBase.formFieldCollection[i].FormField.selectedIndex;
                this.pdfViewer.nameTable[formFieldsData[i].Key.split("_")[0]].selectedIndex = this.pdfViewerBase.formFieldCollection[i].FormField.selectedIndex;
                var newValue = formFieldsData[i].FormField.option[selectIndex].itemValue;
                this.pdfViewerBase.formFieldCollection[i].FormField.value = newValue;
                if (formFieldsData[i].Key.split("_")[0] !== event.target.id.split("_")[0]) {
                    var inputElement = document.getElementById((formFieldsData[i].Key.split("_")[0] + "_content_html_element")).firstElementChild.firstElementChild;
                    inputElement.selectedIndex = selectIndex;
                }
                this.updateFormFieldCollections(this.pdfViewerBase.formFieldCollection[i].FormField);
                this.pdfViewer.fireFormFieldPropertiesChangeEvent("formFieldPropertiesChange", formFieldsData[i].FormField, this.pdfViewerBase.formFieldCollection[i].FormField.pageNumber, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, oldValue, newValue);
                if (this.pdfViewer.annotation) {
                    this.pdfViewer.annotation.addAction(this.pdfViewerBase.formFieldCollection[i].FormField.pageNumber, null, this.pdfViewerBase.formFieldCollection[i].FormField, 'FormField Value Change', '', oldValueIndex, selectIndex);
                }
            }
        }
        this.pdfViewerBase.setItemInSessionStorage(this.pdfViewerBase.formFieldCollection, '_formDesigner');
        this.updateFormFieldSessions();
    };
    FormDesigner.prototype.setCheckBoxState = function (event) {
        if ((Browser.isDevice) ? (event.target.className === '' || event.target.className === 'e-pv-checkbox-outer-div' || event.target.className === 'e-pv-checkbox-div') && event.currentTarget.className === 'e-pv-checkbox-outer-div' && !this.pdfViewer.designerMode : !this.pdfViewer.designerMode) {
            var minCheckboxWidth = 20;
            var isChecked = false;
            var checkTarget = void 0;
            if (Browser.isDevice) {
                checkTarget = document.getElementById(event.target.id.split("_")[0] + '_input');
            }
            else {
                checkTarget = event.target;
            }
            if (event.target.id !== 'undefined_input' && !this.pdfViewer.nameTable[event.target.id.split("_")[0]].isReadonly && !this.pdfViewer.designerMode) {
                if (checkTarget && checkTarget.firstElementChild && checkTarget.firstElementChild.className === "e-pv-checkbox-span e-pv-cb-checked") {
                    checkTarget.firstElementChild.classList.remove("e-pv-cb-checked");
                    checkTarget.firstElementChild.classList.add("e-pv-checkbox-span", "e-pv-cb-unchecked");
                    isChecked = false;
                }
                else if (checkTarget.className === "e-pv-checkbox-span e-pv-cb-checked") {
                    checkTarget.classList.remove("e-pv-cb-checked");
                    checkTarget.classList.add("e-pv-checkbox-span", "e-pv-cb-unchecked");
                    isChecked = false;
                }
                else {
                    checkTarget.firstElementChild.classList.remove("e-pv-cb-unchecked");
                    checkTarget.firstElementChild.classList.add("e-pv-checkbox-span", "e-pv-cb-checked");
                    isChecked = true;
                }
                var data = this.pdfViewerBase.getItemFromSessionStorage('_formDesigner');
                if (isChecked) {
                    if (checkTarget.firstElementChild.className.indexOf("e-pv-cb-checked") !== -1) {
                        var checkboxWidth = parseInt(event.target.parentElement.style.width, 10);
                        if (checkboxWidth > minCheckboxWidth) {
                            checkTarget.firstElementChild.style.borderWidth = "3px";
                        }
                        else if (checkboxWidth <= 15) {
                            checkTarget.firstElementChild.style.borderWidth = "1px";
                        }
                        else {
                            checkTarget.firstElementChild.style.borderWidth = "2px";
                        }
                    }
                }
                var formFieldsData = JSON.parse(data);
                for (var i = 0; i < formFieldsData.length; i++) {
                    if (formFieldsData[i].Key.split("_")[0] === event.target.id.split("_")[0] ||
                        this.pdfViewer.nameTable[event.target.id.split("_")[0]].name === formFieldsData[i].FormField.name) {
                        this.pdfViewer.nameTable[formFieldsData[i].Key.split("_")[0]].isChecked = isChecked;
                        var oldValue = this.pdfViewerBase.formFieldCollection[i].FormField.isChecked;
                        formFieldsData[i].FormField.isChecked = isChecked;
                        this.pdfViewerBase.formFieldCollection[i].FormField.isChecked = formFieldsData[i].FormField.isChecked;
                        if (formFieldsData[i].Key.split("_")[0] !== event.target.id.split("_")[0]) {
                            var checkboxElement = document.getElementById(formFieldsData[i].Key.split("_")[0] + "_input").firstElementChild;
                            if (isChecked) {
                                if (checkboxElement.classList.contains('e-pv-cb-unchecked'))
                                    checkboxElement.classList.remove('e-pv-cb-unchecked');
                                checkboxElement.classList.add("e-pv-cb-checked");
                            }
                            else {
                                if (checkboxElement.classList.contains('e-pv-cb-checked'))
                                    checkboxElement.classList.remove('e-pv-cb-checked');
                                checkboxElement.classList.add("e-pv-cb-unchecked");
                            }
                        }
                        this.updateFormFieldCollections(this.pdfViewerBase.formFieldCollection[i].FormField);
                        this.pdfViewer.fireFormFieldPropertiesChangeEvent("formFieldPropertiesChange", formFieldsData[i].FormField, this.pdfViewerBase.formFieldCollection[i].FormField.pageNumber, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, oldValue, isChecked);
                        if (this.pdfViewer.annotation) {
                            this.pdfViewer.annotation.addAction(this.pdfViewerBase.formFieldCollection[i].FormField.pageNumber, null, this.pdfViewerBase.formFieldCollection[i].FormField, 'FormField Value Change', '', oldValue, isChecked);
                        }
                    }
                }
                this.pdfViewerBase.setItemInSessionStorage(this.pdfViewerBase.formFieldCollection, '_formDesigner');
                this.updateFormFieldSessions();
            }
        }
    };
    FormDesigner.prototype.setCheckedValue = function (element, isChecked) {
        if (isChecked) {
            element.firstElementChild.classList.remove("e-pv-cb-unchecked");
            element.firstElementChild.classList.add("e-pv-checkbox-span", "e-pv-cb-checked");
        }
        else {
            element.firstElementChild.classList.remove("e-pv-cb-checked");
            element.firstElementChild.classList.add("e-pv-checkbox-span", "e-pv-cb-unchecked");
        }
    };
    FormDesigner.prototype.setRadioButtonState = function (event) {
        var data = this.pdfViewerBase.getItemFromSessionStorage('_formDesigner');
        var formFieldsData = JSON.parse(data);
        for (var i = 0; i < formFieldsData.length; i++) {
            if (formFieldsData[i].FormField.radiobuttonItem != null) {
                var oldValue = void 0;
                var undoElement = void 0;
                var redoElement = void 0;
                for (var j = 0; j < formFieldsData[i].FormField.radiobuttonItem.length; j++) {
                    if (formFieldsData[i].FormField.radiobuttonItem[j].id.split("_")[0] === event.currentTarget.id.split("_")[0]) {
                        this.pdfViewer.nameTable[event.currentTarget.id.split("_")[0]].isSelected = true;
                        formFieldsData[i].FormField.radiobuttonItem[j].isSelected = true;
                        oldValue = this.pdfViewerBase.formFieldCollection[i].FormField.radiobuttonItem[j].isSelected;
                        if (!oldValue)
                            undoElement = this.pdfViewerBase.formFieldCollection[i].FormField.radiobuttonItem[j];
                        this.pdfViewerBase.formFieldCollection[i].FormField.radiobuttonItem[j].isSelected = true;
                        this.pdfViewer.fireFormFieldPropertiesChangeEvent("formFieldPropertiesChange", formFieldsData[i].FormField, this.pdfViewerBase.formFieldCollection[i].FormField.pageNumber, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true);
                    }
                    else {
                        if (this.pdfViewer.nameTable[event.currentTarget.id.split("_")[0]].name === formFieldsData[i].FormField.radiobuttonItem[j].name) {
                            this.pdfViewer.nameTable[formFieldsData[i].FormField.radiobuttonItem[j].id.split("_")[0]].isSelected = false;
                            var oldValue_1 = this.pdfViewerBase.formFieldCollection[i].FormField.radiobuttonItem[j].isSelected;
                            formFieldsData[i].FormField.radiobuttonItem[j].isSelected = false;
                            oldValue_1 = this.pdfViewerBase.formFieldCollection[i].FormField.radiobuttonItem[j].isSelected;
                            if (oldValue_1)
                                redoElement = this.pdfViewerBase.formFieldCollection[i].FormField.radiobuttonItem[j];
                            this.pdfViewerBase.formFieldCollection[i].FormField.radiobuttonItem[j].isSelected = formFieldsData[i].FormField.radiobuttonItem[j].isSelected;
                            this.pdfViewer.fireFormFieldPropertiesChangeEvent("formFieldPropertiesChange", formFieldsData[i].FormField, this.pdfViewerBase.formFieldCollection[i].FormField.pageNumber, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false);
                        }
                    }
                    this.updateFormFieldCollections(this.pdfViewerBase.formFieldCollection[i].FormField.radiobuttonItem[j]);
                }
                if ((undoElement != null || redoElement != null) && this.pdfViewer.annotation) {
                    this.pdfViewer.annotation.addAction(this.pdfViewerBase.formFieldCollection[i].FormField.pageNumber, null, this.pdfViewerBase.formFieldCollection[i].FormField, 'FormField Value Change', '', undoElement, redoElement);
                }
            }
        }
        this.pdfViewerBase.setItemInSessionStorage(this.pdfViewerBase.formFieldCollection, '_formDesigner');
        this.updateFormFieldSessions();
    };
    FormDesigner.prototype.getTextboxValue = function (event) {
        var data = this.pdfViewerBase.getItemFromSessionStorage('_formDesigner');
        var formFieldsData = JSON.parse(data);
        for (var i = 0; i < formFieldsData.length; i++) {
            if (formFieldsData[i].Key.split("_")[0] === event.target.id.split("_")[0] ||
                this.pdfViewer.nameTable[event.target.id.split("_")[0]].name === formFieldsData[i].FormField.name) {
                var oldValue = this.pdfViewerBase.formFieldCollection[i].FormField.value;
                formFieldsData[i].FormField.value = event.target.value;
                this.pdfViewer.nameTable[formFieldsData[i].Key.split("_")[0]].value = formFieldsData[i].FormField.value;
                this.pdfViewerBase.formFieldCollection[i].FormField.value = formFieldsData[i].FormField.value;
                if (formFieldsData[i].Key.split("_")[0] !== event.target.id.split("_")[0]) {
                    var element = document.getElementById(formFieldsData[i].Key.split("_")[0] + "_content_html_element");
                    if (element && element.firstElementChild && element.firstElementChild.firstElementChild) {
                        var inputElement = element.firstElementChild.firstElementChild;
                        inputElement.value = formFieldsData[i].FormField.value;
                    }
                }
                this.updateFormFieldCollections(this.pdfViewerBase.formFieldCollection[i].FormField);
                this.pdfViewer.fireFormFieldPropertiesChangeEvent("formFieldPropertiesChange", this.pdfViewerBase.formFieldCollection[i].FormField, this.pdfViewerBase.formFieldCollection[i].FormField.pageNumber, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, oldValue, event.target.value);
                if (this.pdfViewer.annotation) {
                    this.pdfViewer.annotation.addAction(this.pdfViewerBase.formFieldCollection[i].FormField.pageNumber, null, this.pdfViewerBase.formFieldCollection[i].FormField, 'FormField Value Change', '', oldValue, event.target.value);
                }
            }
        }
        this.pdfViewerBase.setItemInSessionStorage(this.pdfViewerBase.formFieldCollection, '_formDesigner');
        this.updateFormFieldSessions();
    };
    FormDesigner.prototype.inputElementClick = function (event) {
        event.target.focus();
    };
    FormDesigner.prototype.updateFormFieldSessions = function () {
        var fieldData = this.pdfViewerBase.getItemFromSessionStorage('_formfields');
        var formFieldsDatas = JSON.parse(fieldData);
        if (formFieldsDatas && this.pdfViewer.formFieldCollection.length === formFieldsDatas.length) {
            this.pdfViewerBase.setItemInSessionStorage(this.pdfViewerBase.formFieldCollection, '_formfields');
        }
    };
    FormDesigner.prototype.focusFormFields = function (event) {
        // eslint-disable-next-line
        var currentTarget = event.target;
        if (currentTarget || currentTarget.className === "e-pv-checkbox-outer-div") {
            var colorBorder = (currentTarget.style.borderColor === 'transparent' ? '#000000' : currentTarget.style.borderColor);
            currentTarget.style.boxShadow = "0 0 5px " + colorBorder;
        }
        if (currentTarget && (currentTarget.className === "e-pv-radiobtn-container" || currentTarget.className === "e-pv-radio-btn" || currentTarget.className === "e-pv-radiobtn-span") && currentTarget.style.borderColor === 'transparent') {
            var colorBorder = (currentTarget.style.borderColor === 'transparent' ? '#000000' : currentTarget.style.borderColor);
            currentTarget.parentElement.style.boxShadow = '0px 0px 5px ' + colorBorder;
        }
        if (currentTarget && (currentTarget.className === "e-pv-radiobtn-container" || currentTarget.className === "e-pv-radio-btn" || currentTarget.className === "e-pv-radiobtn-span")) {
            currentTarget.parentElement.style.boxShadow = currentTarget.style.borderColor + '0px 0px 5px ' + currentTarget.style.borderWidth;
        }
    };
    FormDesigner.prototype.blurFormFields = function (event) {
        // eslint-disable-next-line
        var currentTarget = event.target;
        currentTarget.style.boxShadow = '';
        if (currentTarget.type === 'radio' && currentTarget.style.borderColor === 'transparent') {
            var colorBorder = (currentTarget.style.borderColor === 'transparent' ? '#000000' : currentTarget.style.borderColor);
            currentTarget.parentElement.style.boxShadow = '0px 0px 0px ' + colorBorder;
        }
        if (currentTarget.type === 'radio') {
            currentTarget.parentElement.style.boxShadow = currentTarget.style.borderColor + '0px 0px 0px ' + currentTarget.style.borderWidth;
        }
    };
    FormDesigner.prototype.setTextBoxFontStyle = function (fontStyle) {
        if (fontStyle === 1) {
            return { isBold: true };
        }
        else if (fontStyle === 2) {
            return { isItalic: true };
        }
        else if (fontStyle === 3) {
            return { isBold: true, isItalic: true };
        }
        else if (fontStyle === 4) {
            return { isUnderline: true };
        }
        else if (fontStyle === 5) {
            return { isBold: true, isUnderline: true };
        }
        else if (fontStyle === 6) {
            return { isUnderline: true, isItalic: true };
        }
        else if (fontStyle === 7) {
            return { isBold: true, isItalic: true, isUnderline: true };
        }
        else if (fontStyle === 8) {
            return { isStrikeout: true };
        }
        else if (fontStyle === 9) {
            return { isBold: true, isStrikeout: true };
        }
        else if (fontStyle === 10) {
            return { isItalic: true, isStrikeout: true };
        }
        else if (fontStyle === 11) {
            return { isBold: true, isItalic: true, isStrikeout: true };
        }
        else if (fontStyle === 12) {
            return { isUnderline: true, isStrikeout: true };
        }
        else if (fontStyle === 13) {
            return { isUnderline: true, isStrikeout: true, isBold: true };
        }
        else if (fontStyle === 14) {
            return { isItalic: true, isUnderline: true, isStrikeout: true };
        }
        else if (fontStyle === 15) {
            return { isBold: true, isItalic: true, isUnderline: true, isStrikeout: true };
        }
        return { isBold: false, isItalic: false, isStrikeout: false, isUnderline: false };
    };
    /**
     * Adds form field to the PDF page.
     *
     * @param formFieldType
     * @param options
     * @returns HTMLElement
     */
    FormDesigner.prototype.addFormField = function (formFieldType, options, isCollection, id) {
        var obj = {
            thickness: 1, bounds: { x: options.bounds.X, y: options.bounds.Y, width: options.bounds.Width, height: options.bounds.Height },
            fontFamily: !isNullOrUndefined(options.fontFamily) ? options.fontFamily : "Helvetica", fontSize: !isNullOrUndefined(options.fontSize) ? options.fontSize : 10,
            color: !isNullOrUndefined(options.color) ? options.color : "black", backgroundColor: !isNullOrUndefined(options.backgroundColor) ? options.backgroundColor : "#daeaf7ff",
            alignment: !isNullOrUndefined(options.alignment) ? options.alignment : "left", isReadonly: options.isReadOnly ? options.isReadOnly : false, rotateAngle: options.rotateAngle, isTransparent: options.isTransparent
        };
        obj.fontStyle = !isNullOrUndefined(options.fontStyle) ? options.fontStyle : "None";
        obj.visibility = !isNullOrUndefined(options.visibility) ? options.visibility : "visible";
        obj.value = !isNullOrUndefined(options.value) ? options.value : "";
        obj.isRequired = options.isRequired ? options.isRequired : false;
        obj.isPrint = options.isPrint;
        obj.pageNumber = !isNullOrUndefined(options.pageNumber) ? options.pageNumber : this.pdfViewerBase.currentPageNumber;
        obj.pageIndex = obj.pageNumber - 1;
        obj.font = options.font;
        obj.id = id;
        if (isCollection) {
            this.setFormFieldIndex();
        }
        switch (formFieldType) {
            case 'Textbox':
                obj.formFieldAnnotationType = formFieldType;
                obj.isMultiline = options.isMultiline;
                obj.name = !isNullOrUndefined(options.name) ? options.name : 'Textbox' + this.formFieldIndex;
                obj.insertSpaces = options.insertSpaces;
                obj.maxLength = options.maxLength;
                obj.thickness = !isNullOrUndefined(options.thickness) ? options.thickness : 1;
                obj.borderColor = !isNullOrUndefined(options.borderColor) ? options.borderColor : '#303030';
                if (options.font) {
                    obj.font = options.font;
                }
                else if (this.pdfViewer.textFieldSettings.fontStyle) {
                    obj.font = this.setTextBoxFontStyle(this.pdfViewer.textFieldSettings.fontStyle);
                }
                break;
            case 'Password':
                obj.formFieldAnnotationType = 'PasswordField';
                obj.name = !isNullOrUndefined(options.name) ? options.name : 'Password' + this.formFieldIndex;
                obj.maxLength = options.maxLength;
                obj.thickness = !isNullOrUndefined(options.thickness) ? options.thickness : 1;
                obj.borderColor = !isNullOrUndefined(options.borderColor) ? options.borderColor : '#303030';
                break;
            case 'DropDown':
                obj.formFieldAnnotationType = 'DropdownList';
                obj.name = !isNullOrUndefined(options.name) ? options.name : 'Dropdown' + this.formFieldIndex;
                obj.options = options.options ? options.options : [];
                for (var i = 0; i < this.pdfViewer.formFieldCollection.length; i++) {
                    var formField = this.pdfViewer.formFieldCollection[i];
                    if (formField.formFieldAnnotationType === 'DropdownList' && formField.name === obj.name) {
                        obj.options = formField.options;
                        break;
                    }
                }
                obj.selectedIndex = !isNullOrUndefined(options.selectedIndex) ? options.selectedIndex : [0];
                obj.thickness = !isNullOrUndefined(options.thickness) ? options.thickness : 1;
                obj.borderColor = !isNullOrUndefined(options.borderColor) ? options.borderColor : '#303030';
                break;
            case 'ListBox':
                obj.formFieldAnnotationType = formFieldType;
                obj.name = !isNullOrUndefined(options.name) ? options.name : 'List Box' + this.formFieldIndex;
                obj.options = options.options ? options.options : [];
                for (var i = 0; i < this.pdfViewer.formFieldCollection.length; i++) {
                    var formField = this.pdfViewer.formFieldCollection[i];
                    if (formField.formFieldAnnotationType === formFieldType && formField.name === obj.name) {
                        obj.options = formField.options;
                        break;
                    }
                }
                obj.selectedIndex = options.selectedIndex;
                obj.thickness = !isNullOrUndefined(options.thickness) ? options.thickness : 1;
                obj.borderColor = !isNullOrUndefined(options.borderColor) ? options.borderColor : '#303030';
                break;
            case 'CheckBox':
                obj.formFieldAnnotationType = 'Checkbox';
                obj.bounds = { x: options.bounds.X, y: options.bounds.Y, width: options.bounds.Width, height: options.bounds.Height };
                obj.backgroundColor = !isNullOrUndefined(options.backgroundColor) ? options.backgroundColor : "#daeaf7ff";
                obj.isReadonly = options.isReadOnly ? options.isReadOnly : false;
                obj.name = !isNullOrUndefined(options.name) ? options.name : 'Check Box' + this.formFieldIndex;
                obj.isChecked = options.isChecked ? options.isChecked : false;
                obj.visibility = options.visibility ? options.visibility : "visible";
                obj.isRequired = options.isRequired ? options.isRequired : false;
                obj.thickness = !isNullOrUndefined(options.thickness) ? options.thickness : 1;
                obj.borderColor = !isNullOrUndefined(options.borderColor) ? options.borderColor : '#303030';
                break;
            case 'RadioButton':
                obj.formFieldAnnotationType = formFieldType;
                obj.bounds = { x: options.bounds.X, y: options.bounds.Y, width: options.bounds.Width, height: options.bounds.Height };
                obj.backgroundColor = !isNullOrUndefined(options.backgroundColor) ? options.backgroundColor : "#daeaf7ff";
                obj.isReadonly = options.isReadOnly ? options.isReadOnly : false;
                obj.name = !isNullOrUndefined(options.name) ? options.name : 'Radio Button' + this.formFieldIndex;
                obj.isSelected = options.isSelected ? options.isSelected : false;
                obj.visibility = options.visibility ? options.visibility : "visible";
                obj.isRequired = options.isRequired ? options.isRequired : false;
                obj.thickness = !isNullOrUndefined(options.thickness) ? options.thickness : 1;
                obj.borderColor = !isNullOrUndefined(options.borderColor) ? options.borderColor : '#303030';
                break;
            case 'SignatureField':
                obj.formFieldAnnotationType = formFieldType;
                obj.bounds = { x: options.bounds.X, y: options.bounds.Y, width: options.bounds.Width, height: options.bounds.Height };
                obj.backgroundColor = !isNullOrUndefined(options.backgroundColor) ? options.backgroundColor : "#daeaf7ff";
                obj.fontSize = !isNullOrUndefined(options.fontSize) ? options.fontSize : 10;
                obj.fontStyle = !isNullOrUndefined(options.fontStyle) ? options.fontStyle : "None";
                obj.name = !isNullOrUndefined(options.name) ? options.name : 'Signature' + this.formFieldIndex;
                obj.isRequired = options.isRequired ? options.isRequired : false;
                obj.isReadonly = options.isReadOnly ? options.isReadOnly : false;
                obj.thickness = !isNullOrUndefined(options.thickness) ? options.thickness : 1;
                var indicatorSettings = options.signatureIndicatorSettings ? options.signatureIndicatorSettings : options.initialIndicatorSettings;
                obj.signatureIndicatorSettings = indicatorSettings ? { opacity: indicatorSettings.opacity ? indicatorSettings.opacity : 1,
                    backgroundColor: indicatorSettings.backgroundColor ? indicatorSettings.backgroundColor : 'orange', width: indicatorSettings.width ? indicatorSettings.width : 19,
                    height: indicatorSettings.height ? indicatorSettings.height : 10, fontSize: indicatorSettings.fontSize ? indicatorSettings.fontSize : 10,
                    text: indicatorSettings.text ? indicatorSettings.text : null, color: indicatorSettings.color ? indicatorSettings.color : 'black' } : null;
                break;
            case 'InitialField':
                obj.formFieldAnnotationType = formFieldType;
                obj.bounds = { x: options.bounds.X, y: options.bounds.Y, width: options.bounds.Width, height: options.bounds.Height };
                obj.backgroundColor = !isNullOrUndefined(options.backgroundColor) ? options.backgroundColor : "#daeaf7ff";
                obj.fontSize = !isNullOrUndefined(options.fontSize) ? options.fontSize : 10;
                obj.thickness = !isNullOrUndefined(options.thickness) ? options.thickness : 1;
                obj.fontStyle = !isNullOrUndefined(options.fontStyle) ? options.fontStyle : "None";
                obj.name = !isNullOrUndefined(options.name) ? options.name : 'Initial' + this.formFieldIndex;
                obj.isRequired = options.isRequired ? options.isRequired : false;
                obj.isReadonly = options.isReadOnly ? options.isReadOnly : false;
                obj.isInitialField = true;
                var indicatorSettingsInitial = options.initialIndicatorSettings ? options.initialIndicatorSettings : options.signatureIndicatorSettings;
                obj.signatureIndicatorSettings = indicatorSettingsInitial ? { opacity: indicatorSettingsInitial.opacity ? indicatorSettingsInitial.opacity : 1,
                    backgroundColor: indicatorSettingsInitial.backgroundColor ? indicatorSettingsInitial.backgroundColor : 'orange', width: indicatorSettingsInitial.width ? indicatorSettingsInitial.width : 19,
                    height: indicatorSettingsInitial.height ? indicatorSettingsInitial.height : 10, fontSize: indicatorSettingsInitial.fontSize ? indicatorSettingsInitial.fontSize : 10,
                    text: indicatorSettingsInitial.text ? indicatorSettingsInitial.text : null, color: indicatorSettingsInitial.color ? indicatorSettingsInitial.color : 'black' } : null;
                break;
        }
        obj.tooltip = !isNullOrUndefined(options.tooltip) ? options.tooltip : '';
        this.setFormFieldIndex();
        var HTMLElement = null;
        if (isCollection) {
            this.addFieldCollection(obj);
        }
        else {
            this.pdfViewerBase.disableTextSelectionMode();
            HTMLElement = this.drawFormField(obj);
        }
        return HTMLElement;
    };
    FormDesigner.prototype.addFieldCollection = function (node) {
        var formField = {
            id: randomId(), name: node.name, value: node.value,
            type: node.formFieldAnnotationType, isReadOnly: node.isReadonly, fontFamily: node.fontFamily,
            fontSize: node.fontSize, fontStyle: node.fontStyle, color: node.color, backgroundColor: node.backgroundColor, isMultiline: node.isMultiline,
            alignment: node.alignment, visibility: node.visibility, maxLength: node.maxLength, isRequired: node.isRequired,
            isPrint: node.isPrint, isSelected: node.isSelected, insertSpaces: node.insertSpaces, isChecked: node.isChecked, tooltip: node.tooltip, bounds: node.bounds, thickness: node.thickness, pageIndex: node.pageIndex, borderColor: node.borderColor, signatureIndicatorSettings: node.signatureIndicatorSettings
        };
        this.pdfViewer.formFieldCollections.push(formField);
    };
    /**
     * @private
     */
    FormDesigner.prototype.drawFormField = function (obj) {
        var node = this.pdfViewer.add(obj);
        var index = this.pdfViewer.formFieldCollections.findIndex(function (el) { return el.id === node.id; });
        // eslint-disable-next-line
        var data;
        if (index > -1) {
            data = this.pdfViewer.formFieldCollections[index];
            if (this.isFormFieldUpdated) {
                this.updateNodeBasedOnCollections(node, data);
            }
        }
        var formFieldIndex = this.pdfViewer.formFieldCollection.findIndex(function (el) { return el.id === node.id; });
        if (formFieldIndex < 0) {
            this.pdfViewer.formFieldCollection.push(node);
        }
        else if (formFieldIndex > -1) {
            this.pdfViewer.formFieldCollection[formFieldIndex] = node;
        }
        var formField = {
            id: node.id, name: node.name, value: node.value,
            type: node.formFieldAnnotationType, isReadOnly: node.isReadonly, fontFamily: node.fontFamily,
            fontSize: node.fontSize, fontStyle: node.fontStyle, color: node.color, backgroundColor: node.backgroundColor, isMultiline: node.isMultiline,
            alignment: node.alignment, visibility: node.visibility, maxLength: node.maxLength, isRequired: node.isRequired,
            isPrint: node.isPrint, isSelected: node.isSelected, isChecked: node.isChecked, tooltip: node.tooltip, bounds: node.bounds, pageIndex: node.pageIndex, thickness: node.thickness, borderColor: node.borderColor, signatureIndicatorSettings: node.signatureIndicatorSettings, insertSpaces: node.insertSpaces
        };
        if (index > -1) {
            this.pdfViewer.formFieldCollections[index] = formField;
        }
        else {
            this.pdfViewer.formFieldCollections.push(formField);
        }
        var HTMLElement = this.drawHTMLContent(node.formFieldAnnotationType, node.wrapper.children[0], node, obj.pageNumber - 1, this.pdfViewer);
        return HTMLElement;
    };
    /**
    * Update the node value based on the collections
    *
    * @param node
    * @param data
    * @returns void
    */
    FormDesigner.prototype.updateNodeBasedOnCollections = function (node, data) {
        node.name = data.name;
        node.value = data.value;
        node.isReadonly = data.isReadOnly;
        node.fontFamily = data.fontFamily;
        node.fontSize = data.fontSize;
        node.fontStyle = data.fontStyle.toString();
        node.color = data.color;
        node.backgroundColor = data.backgroundColor;
        node.alignment = data.alignment;
        node.visibility = data.visibility;
        node.maxLength = data.maxLength;
        node.isRequired = data.isRequired;
        node.isPrint = data.isPrint;
        node.isSelected = data.isSelected;
        node.isChecked = data.isChecked;
        node.tooltip = data.tooltip;
        node.thickness = data.thickness;
        node.borderColor = data.borderColor;
    };
    /**
     * Set the form field mode to add the form field on user interaction.
     *
     * @param formFieldId
     * @param options
     * @returns void
     */
    FormDesigner.prototype.setFormFieldMode = function (formFieldType, options) {
        if (this.pdfViewer.selectedItems && !isNullOrUndefined(this.pdfViewer.selectedItems.annotations) && this.pdfViewer.selectedItems.annotations.length > 0 && this.pdfViewerBase.activeElements && !isNullOrUndefined(this.pdfViewerBase.activeElements.activePageID)) {
            this.pdfViewer.clearSelection(this.pdfViewerBase.activeElements.activePageID);
        }
        switch (formFieldType) {
            case 'Textbox':
                this.activateTextboxElement(formFieldType);
                this.isSetFormFieldMode = true;
                break;
            case 'Password':
                var passwordType = 'PasswordField';
                this.activatePasswordField(passwordType);
                this.isSetFormFieldMode = true;
                break;
            case 'CheckBox':
                var checkboxType = 'Checkbox';
                this.activateCheckboxElement(checkboxType);
                this.isSetFormFieldMode = true;
                break;
            case 'RadioButton':
                this.activateRadioButtonElement(formFieldType);
                this.isSetFormFieldMode = true;
                break;
            case 'DropDown':
                var dropdownType = 'DropdownList';
                this.activateDropDownListElement(dropdownType, options);
                this.isSetFormFieldMode = true;
                break;
            case 'ListBox':
                this.activateListboxElement(formFieldType, options);
                this.isSetFormFieldMode = true;
                break;
            case 'SignatureField':
            case 'InitialField':
                this.activateSignatureBoxElement(formFieldType);
                this.isSetFormFieldMode = true;
        }
    };
    /**
     * Reset the form fields into its original state.
     *
     * @param formFieldId
     * @returns void
     */
    FormDesigner.prototype.resetFormField = function (formFieldId) {
        var formField = this.getFormField(formFieldId);
        if (formField) {
            switch (formField.formFieldAnnotationType) {
                case 'Textbox':
                    this.resetTextboxProperties(formField);
                    break;
                case 'PasswordField':
                    this.resetPasswordProperties(formField);
                    break;
                case 'Checkbox':
                    this.resetCheckboxProperties(formField);
                    break;
                case 'RadioButton':
                    this.resetRadioButtonProperties(formField);
                    break;
                case 'DropdownList':
                    this.resetDropdownListProperties(formField);
                    break;
                case 'ListBox':
                    this.resetListBoxProperties(formField);
                    break;
                case 'SignatureField':
                case 'InitialField':
                    this.resetSignatureTextboxProperties(formField);
                    break;
            }
            this.updateSessionFormFieldProperties(formField);
        }
    };
    /**
     * Select the form field in the PDF Viewer.
     *
     * @param formFieldId
     * @returns void
     */
    FormDesigner.prototype.selectFormField = function (formFieldId) {
        var formField = this.getFormField(formFieldId);
        if (formField) {
            this.isProgrammaticSelection = true;
            this.pdfViewer.select([formField.id]);
            this.isProgrammaticSelection = false;
        }
    };
    /**
     * Update the form field with the given properties and value.
     *
     * @param formFieldId
     * @param options
     * @returns void
     */
    FormDesigner.prototype.updateFormField = function (formFieldId, options) {
        var formField = this.getFormField(formFieldId);
        this.isFormFieldUpdated = true;
        if (formField) {
            if (!formField.isReadonly || (!isNullOrUndefined(options.isReadOnly) && !options.isReadOnly)) {
                switch (formField.formFieldAnnotationType) {
                    case 'Textbox':
                    case 'PasswordField':
                    case 'DropdownList':
                    case 'ListBox':
                    case 'SignatureField':
                    case 'InitialField':
                        var inputElement = document.getElementById(formField.id + "_content_html_element");
                        if (inputElement) {
                            inputElement = inputElement.firstElementChild.firstElementChild;
                            this.formFieldPropertyChange(formField, options, inputElement);
                        }
                        else {
                            this.updateFormFieldsInCollections(formFieldId, options);
                        }
                        break;
                    case 'RadioButton':
                        var radioButtonDivDivElement = document.getElementById(formField.id + "_content_html_element");
                        if (radioButtonDivDivElement) {
                            radioButtonDivDivElement = radioButtonDivDivElement.firstElementChild.firstElementChild.firstElementChild;
                            this.formFieldPropertyChange(formField, options, radioButtonDivDivElement);
                        }
                        else {
                            this.updateFormFieldsInCollections(formFieldId, options);
                        }
                        break;
                    case 'Checkbox':
                        var checkboxDivElement = document.getElementById(formField.id + "_content_html_element");
                        if (checkboxDivElement) {
                            checkboxDivElement = checkboxDivElement.firstElementChild.firstElementChild.lastElementChild;
                            this.formFieldPropertyChange(formField, options, checkboxDivElement);
                        }
                        else {
                            this.updateFormFieldsInCollections(formFieldId, options);
                        }
                        break;
                }
            }
        }
        else {
            this.updateFormFieldsInCollections(formFieldId, options);
        }
    };
    /**
    * Update the form field in the form field collections.
    * @param formFieldId
    * @param options
    * @returns void
    */
    FormDesigner.prototype.updateFormFieldsInCollections = function (formFieldId, options) {
        var formFieldCollection = this.pdfViewer.formFieldCollections;
        for (var i = 0; i < formFieldCollection.length; i++) {
            var currentData = formFieldCollection[i];
            var fieldId = (typeof formFieldId === 'object') ? formFieldId.id : formFieldId;
            if (currentData.id === fieldId) {
                this.updateFormFieldData(currentData, options);
                var formFieldIndex = this.pdfViewer.formFieldCollections.findIndex(function (el) { return el.id === formFieldId; });
                this.pdfViewer.formFieldCollections[formFieldIndex] = currentData;
            }
        }
    };
    /**
    * Update the form field data based on the value
    * @param currentData
    * @param options
    * @returns void
    */
    FormDesigner.prototype.updateFormFieldData = function (currentData, options) {
        if (options.name && currentData.name !== options.name) {
            currentData.name = options.name;
        }
        if (currentData.type !== 'SignatureField' || currentData.type !== 'InitialField') {
            if (options.thickness && currentData.thickness !== options.thickness) {
                currentData.thickness = options.thickness;
            }
            if (options.borderColor) {
                var borderColor = this.colorNametoHashValue(options.borderColor);
                if (currentData.borderColor !== borderColor) {
                    currentData.borderColor = borderColor;
                }
            }
        }
        if (options.backgroundColor) {
            var backColor = this.colorNametoHashValue(options.backgroundColor);
            if (currentData.backgroundColor !== backColor) {
                currentData.backgroundColor = backColor;
            }
        }
        if (!isNullOrUndefined(options.isReadOnly) && currentData.isReadonly !== options.isReadOnly) {
            currentData.isReadOnly = options.isReadOnly;
        }
        if (!isNullOrUndefined(options.isRequired) && currentData.isRequired !== options.isRequired) {
            currentData.isRequired = options.isRequired;
        }
        if (!isNullOrUndefined(options.isPrint) && currentData.isPrint !== options.isPrint) {
            currentData.isPrint = options.isPrint;
        }
        if (options.visibility && currentData.visibility !== options.visibility) {
            currentData.visibility = options.visibility;
        }
        if (options.tooltip && currentData.tooltip !== options.tooltip) {
            currentData.tooltip = options.tooltip;
        }
        if (currentData.type === 'Checkbox' && (!isNullOrUndefined(options.isChecked) && currentData.isChecked === options.isChecked)) {
            currentData.isChecked = options.isChecked;
        }
        if (currentData.type === 'RadioButton' && (!isNullOrUndefined(options.isSelected) && currentData.isSelected === options.isSelected)) {
            currentData.isSelected = options.isSelected;
        }
        if ((currentData.type === 'DropdownList' || currentData.type === 'ListBox') && options.options) {
            currentData.options = options.options;
        }
        if (currentData.type === 'Textbox' || currentData.type === 'SignatureField' || currentData.type === 'InitialField' ||
            currentData.type === 'DropdownList' || currentData.type === 'ListBox' ||
            currentData.type === 'PasswordField') {
            if (options.value && currentData.value !== options.value) {
                currentData.value = options.value;
            }
            if (options.fontSize && currentData.fontSize !== options.fontSize) {
                currentData.fontSize = options.fontSize;
            }
            if (options.color) {
                var color = this.colorNametoHashValue(options.color);
                if (currentData.color !== color) {
                    currentData.color = color;
                }
            }
            if (currentData.type !== 'SignatureField') {
                if (options.alignment && currentData.alignment !== options.alignment) {
                    currentData.alignment = options.alignment;
                }
                if (options.maxLength && currentData.maxLength !== options.maxLength) {
                    currentData.maxLength = options.maxLength;
                }
            }
            if (currentData.type !== 'PasswordField') {
                if (options.fontFamily && currentData.fontFamily !== options.fontFamily) {
                    currentData.fontFamily = options.fontFamily;
                }
                if (options.fontStyle && currentData.fontStyle !== options.fontStyle) {
                    currentData.fontStyle = options.fontStyle;
                }
            }
        }
    };
    /**
     * @private
     */
    FormDesigner.prototype.getSignatureBackground = function (color) {
        if (color.includes('#')) {
            if (color.length > 8) {
                color = color.slice(0, -2) + '60';
            }
            else {
                color += '60';
            }
        }
        return color;
    };
    FormDesigner.prototype.formFieldPropertyChange = function (formFieldObject, options, htmlElement) {
        var isValueChanged = false, isFontFamilyChanged = false, isFontSizeChanged = false, isFontStyleChanged = false, isColorChanged = false, isBackgroundColorChanged = false, isBorderColorChanged = false, isBorderWidthChanged = false, isAlignmentChanged = false, isReadOnlyChanged = false, isVisibilityChanged = false, isMaxLengthChanged = false, isRequiredChanged = false, isPrintChanged = false, isToolTipChanged = false, isNameChanged = false;
        var oldValue, newValue;
        var zoomValue = this.pdfViewerBase.getZoomFactor();
        if (options.name) {
            if (formFieldObject.name !== options.name) {
                isNameChanged = true;
            }
            formFieldObject.name = options.name;
            var designerName = document.getElementById(formFieldObject.id + "_designer_name");
            designerName.innerHTML = formFieldObject.name;
            designerName.style.fontSize = formFieldObject.fontSize ? (formFieldObject.fontSize * zoomValue) + 'px' : (10 * zoomValue) + 'px';
            htmlElement.name = options.name;
            this.pdfViewer.nameTable[formFieldObject.id.split('_')[0]].name = formFieldObject.name;
            if (isNameChanged) {
                this.updateFormFieldPropertiesChanges("formFieldPropertiesChange", formFieldObject, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, oldValue, newValue, isNameChanged);
            }
        }
        if (formFieldObject.formFieldAnnotationType) {
            if (!isNullOrUndefined(options.thickness)) {
                if (formFieldObject.thickness !== options.thickness) {
                    isBorderWidthChanged = true;
                    oldValue = formFieldObject.thickness;
                    newValue = options.thickness;
                }
                htmlElement.style.borderWidth = options.thickness.toString() + 'px';
                formFieldObject.thickness = options.thickness;
                this.pdfViewer.nameTable[formFieldObject.id.split('_')[0]].thickness = options.thickness;
                if (isBorderWidthChanged) {
                    this.updateFormFieldPropertiesChanges("formFieldPropertiesChange", formFieldObject, false, false, false, false, false, false, false, isBorderWidthChanged, false, false, false, false, false, false, false, oldValue, newValue);
                }
            }
            if (options.borderColor) {
                var borderColor = this.colorNametoHashValue(options.borderColor);
                if (formFieldObject.borderColor !== borderColor) {
                    isBorderColorChanged = true;
                    oldValue = formFieldObject.borderColor;
                    newValue = borderColor;
                }
                formFieldObject.borderColor = borderColor;
                htmlElement.style.borderColor = borderColor;
                if (formFieldObject.formFieldAnnotationType === 'RadioButton') {
                    htmlElement.parentElement.style.boxShadow = borderColor + ' 0px 0px 0px ' + formFieldObject.thickness + 'px';
                    this.setToolTip(options.tooltip, htmlElement.parentElement);
                }
                this.pdfViewer.nameTable[formFieldObject.id.split('_')[0]].borderColor = borderColor;
                if (isBorderColorChanged) {
                    this.updateFormFieldPropertiesChanges("formFieldPropertiesChange", formFieldObject, false, false, false, false, false, false, isBorderColorChanged, false, false, false, false, false, false, false, false, oldValue, newValue);
                }
            }
        }
        if (options.backgroundColor) {
            var backColor = this.colorNametoHashValue(options.backgroundColor);
            backColor = this.getSignatureBackground(backColor);
            if (formFieldObject.backgroundColor !== backColor) {
                isBackgroundColorChanged = true;
                oldValue = formFieldObject.backgroundColor;
                newValue = backColor;
            }
            formFieldObject.backgroundColor = backColor;
            if (formFieldObject.formFieldAnnotationType === 'SignatureField' || formFieldObject.formFieldAnnotationType === 'InitialField') {
                htmlElement.parentElement.style.background = backColor;
            }
            else {
                htmlElement.style.background = backColor;
            }
            if (formFieldObject.formFieldAnnotationType === 'RadioButton') {
                htmlElement.parentElement.style.background = formFieldObject.backgroundColor;
            }
            this.pdfViewer.nameTable[formFieldObject.id.split('_')[0]].backgroundColor = backColor;
            if (isBackgroundColorChanged) {
                this.updateFormFieldPropertiesChanges("formFieldPropertiesChange", formFieldObject, false, false, false, false, false, isBackgroundColorChanged, false, false, false, false, false, false, false, false, false, oldValue, newValue);
            }
        }
        if (options.bounds) {
            formFieldObject.bounds = { x: options.bounds.X, y: options.bounds.Y, width: options.bounds.Width, height: options.bounds.Height };
            var formField_1 = this.pdfViewer.nameTable[formFieldObject.id.split("_")[0]];
            formField_1.bounds = { x: options.bounds.X, y: options.bounds.Y, width: options.bounds.Width, height: options.bounds.Height };
            formField_1.wrapper.bounds = new Rect(options.bounds.X, options.bounds.Y, options.bounds.Width, options.bounds.Height);
            this.pdfViewer.drawing.nodePropertyChange(formField_1, {
                bounds: {
                    x: formField_1.wrapper.bounds.x, y: formField_1.wrapper.bounds.y,
                    width: formField_1.wrapper.bounds.width, height: formField_1.wrapper.bounds.height
                }
            });
            var element = formField_1.wrapper.children[0];
            var point = cornersPointsBeforeRotation(formField_1.wrapper.children[0]).topLeft;
            var hEment = document.getElementById(element.id + "_html_element");
            if (!isNullOrUndefined(hEment)) {
                hEment.setAttribute('style', 'height:' + (element.actualSize.height * zoomValue) + 'px; width:' + (element.actualSize.width * zoomValue) +
                    'px;left:' + point.x * zoomValue + 'px; top:' + point.y * zoomValue + 'px;' +
                    'position:absolute;transform:rotate(' + (element.rotateAngle + element.parentTransform) + 'deg);' +
                    'pointer-events:' + ((this.pdfViewer.designerMode) ? 'none' : 'all')
                    + ';visibility:' + ((element.visible) ? 'visible' : 'hidden') + ';opacity:' + element.style.opacity + ';');
            }
        }
        if (!isNullOrUndefined(options.isReadOnly)) {
            if (formFieldObject.isReadonly !== options.isReadOnly) {
                isReadOnlyChanged = true;
                oldValue = formFieldObject.isReadonly;
                newValue = options.isReadOnly;
            }
            formFieldObject.isReadonly = options.isReadOnly;
            this.setReadOnlyToElement(formFieldObject, htmlElement, options.isReadOnly);
            this.setReadOnlyToFormField(formFieldObject, options.isReadOnly);
            this.pdfViewer.nameTable[formFieldObject.id.split('_')[0]].isReadonly = options.isReadOnly;
            if (isReadOnlyChanged) {
                this.updateFormFieldPropertiesChanges("formFieldPropertiesChange", formFieldObject, false, false, false, false, false, false, false, false, false, isReadOnlyChanged, false, false, false, false, false, oldValue, newValue);
            }
        }
        if (!isNullOrUndefined(options.isRequired)) {
            if (formFieldObject.isRequired !== options.isRequired) {
                isRequiredChanged = true;
                oldValue = formFieldObject.isRequired;
                newValue = options.isRequired;
            }
            formFieldObject.isRequired = options.isRequired;
            this.setRequiredToElement(formFieldObject, htmlElement, options.isRequired);
            this.setRequiredToFormField(formFieldObject, options.isRequired);
            this.pdfViewer.nameTable[formFieldObject.id.split('_')[0]].isRequired = options.isRequired;
            if (isRequiredChanged) {
                this.updateFormFieldPropertiesChanges("formFieldPropertiesChange", formFieldObject, false, false, false, false, false, false, false, false, false, false, false, false, isRequiredChanged, false, false, oldValue, newValue);
            }
        }
        if (options.visibility) {
            if (formFieldObject.visibility !== options.visibility) {
                isVisibilityChanged = true;
                oldValue = formFieldObject.visibility;
                newValue = options.visibility;
            }
            formFieldObject.visibility = options.visibility;
            htmlElement.style.visibility = options.visibility;
            if (formFieldObject.formFieldAnnotationType === 'RadioButton') {
                htmlElement.parentElement.style.visibility = formFieldObject.visibility;
            }
            if (formFieldObject.formFieldAnnotationType === 'SignatureField' || formFieldObject.formFieldAnnotationType === 'InitialField') {
                htmlElement.parentElement.style.visibility = formFieldObject.visibility;
                var annotation = this.pdfViewer.nameTable[formFieldObject.id.split('_')[0] + "_content"];
                var data = this.pdfViewerBase.getItemFromSessionStorage('_formDesigner');
                var formFieldsData = JSON.parse(data);
                var index = this.getFormFiledIndex(formFieldObject.id.split('_')[0]);
                if (formFieldObject.visibility === "hidden") {
                    if (annotation) {
                        this.hideSignatureValue(formFieldObject, annotation, index, formFieldsData);
                    }
                }
                else {
                    if (annotation) {
                        this.showSignatureValue(formFieldObject, oldValue, annotation, index, formFieldsData);
                    }
                }
            }
            this.pdfViewer.nameTable[formFieldObject.id.split('_')[0]].visibility = options.visibility;
            if (isVisibilityChanged) {
                this.updateFormFieldPropertiesChanges("formFieldPropertiesChange", formFieldObject, false, false, false, false, false, false, false, false, false, false, isVisibilityChanged, false, false, false, false, oldValue, newValue);
            }
        }
        if (!isNullOrUndefined(options.isPrint)) {
            if (formFieldObject.isPrint !== options.isPrint) {
                isPrintChanged = true;
                oldValue = formFieldObject.isPrint;
                newValue = options.isPrint;
            }
            formFieldObject.isPrint = options.isPrint;
            this.pdfViewer.nameTable[formFieldObject.id.split('_')[0]].isPrint = options.isPrint;
            if (isPrintChanged) {
                this.updateFormFieldPropertiesChanges("formFieldPropertiesChange", formFieldObject, false, false, false, false, false, false, false, false, false, false, false, false, false, isPrintChanged, false, oldValue, newValue);
            }
        }
        if (options.tooltip) {
            if (formFieldObject.tooltip !== options.tooltip) {
                isToolTipChanged = true;
                oldValue = formFieldObject.tooltip;
                newValue = options.tooltip;
            }
            formFieldObject.tooltip = options.tooltip;
            if (!isNullOrUndefined(options.tooltip)) {
                if (formFieldObject.formFieldAnnotationType === 'RadioButton') {
                    this.setToolTip(options.tooltip, htmlElement.parentElement);
                }
                else {
                    this.setToolTip(options.tooltip, htmlElement);
                }
            }
            this.pdfViewer.nameTable[formFieldObject.id.split('_')[0]].tooltip = options.tooltip;
            if (isToolTipChanged) {
                this.updateFormFieldPropertiesChanges("formFieldPropertiesChange", formFieldObject, false, false, false, false, false, false, false, false, false, false, false, false, false, false, isToolTipChanged, oldValue, newValue);
            }
        }
        if (formFieldObject.formFieldAnnotationType === 'Checkbox' && (!isNullOrUndefined(options.isChecked)) || options.isChecked) {
            if (formFieldObject.isChecked !== this.checkboxCheckedState) {
                isValueChanged = true;
                oldValue = formFieldObject.isChecked;
                newValue = options.isChecked;
            }
            formFieldObject.isChecked = options.isChecked;
            htmlElement.checked = options.isChecked;
            this.setCheckedValue(htmlElement, options.isChecked);
            this.pdfViewer.nameTable[formFieldObject.id.split('_')[0]].isChecked = options.isChecked;
            if (isValueChanged) {
                this.updateFormFieldPropertiesChanges("formFieldPropertiesChange", formFieldObject, isValueChanged, false, false, false, false, false, false, false, false, false, false, false, false, false, false, oldValue, newValue);
            }
        }
        if (formFieldObject.formFieldAnnotationType === 'RadioButton' && (!isNullOrUndefined(options.isSelected)) || options.isSelected) {
            if (formFieldObject.isSelected !== options.isSelected) {
                isValueChanged = true;
                oldValue = formFieldObject.isSelected;
                newValue = this.checkboxCheckedState;
            }
            formFieldObject.isSelected = options.isSelected;
            htmlElement.checked = options.isSelected;
            this.pdfViewer.nameTable[formFieldObject.id.split('_')[0]].isSelected = options.isSelected;
            if (isValueChanged) {
                this.updateFormFieldPropertiesChanges("formFieldPropertiesChange", formFieldObject, isValueChanged, false, false, false, false, false, false, false, false, false, false, false, false, false, false, oldValue, newValue);
            }
        }
        if (formFieldObject.formFieldAnnotationType === 'DropdownList' || formFieldObject.formFieldAnnotationType === 'ListBox') {
            if (options.options) {
                formFieldObject.options = options.options;
                this.updateDropDownListDataSource(formFieldObject, htmlElement);
                this.pdfViewer.nameTable[formFieldObject.id.split('_')[0]].options = formFieldObject.options;
            }
        }
        if (formFieldObject.formFieldAnnotationType === 'Textbox' || formFieldObject.formFieldAnnotationType === 'SignatureField' || formFieldObject.formFieldAnnotationType === 'InitialField' ||
            formFieldObject.formFieldAnnotationType === 'DropdownList' || formFieldObject.formFieldAnnotationType === 'ListBox'
            || formFieldObject.formFieldAnnotationType === 'PasswordField') {
            if (options.value) {
                if (formFieldObject.value !== options.value) {
                    isValueChanged = true;
                    oldValue = formFieldObject.value;
                    newValue = options.value;
                }
                formFieldObject.value = options.value;
                if (!(formFieldObject.formFieldAnnotationType === 'DropdownList' || formFieldObject.formFieldAnnotationType === 'ListBox')) {
                    htmlElement.value = options.value;
                }
                else if (formFieldObject.formFieldAnnotationType === "DropdownList" || formFieldObject.formFieldAnnotationType === "ListBox") {
                    for (var i = 0; i < htmlElement.options.length; i++) {
                        if (htmlElement.options[i].text === options.value) {
                            htmlElement.options.selectedIndex = i;
                        }
                    }
                }
                this.pdfViewer.nameTable[formFieldObject.id.split('_')[0]].value = options.value;
                if (isValueChanged) {
                    this.updateFormFieldPropertiesChanges("formFieldPropertiesChange", formFieldObject, isValueChanged, false, false, false, false, false, false, false, false, false, false, false, false, false, false, oldValue, newValue);
                }
            }
            if (options.fontSize) {
                if (formFieldObject.fontSize !== options.fontSize) {
                    isFontSizeChanged = true;
                    oldValue = formFieldObject.fontSize;
                    newValue = options.fontSize;
                }
                formFieldObject.fontSize = options.fontSize;
                htmlElement.style.fontSize = (options.fontSize * zoomValue) + 'px';
                this.pdfViewer.nameTable[formFieldObject.id.split('_')[0]].fontSize = options.fontSize;
                if (isFontSizeChanged) {
                    this.updateFormFieldPropertiesChanges("formFieldPropertiesChange", formFieldObject, false, false, isFontSizeChanged, false, false, false, false, false, false, false, false, false, false, false, false, oldValue, newValue);
                }
            }
            if (options.color) {
                var color = this.colorNametoHashValue(options.color);
                if (formFieldObject.color !== color) {
                    isColorChanged = true;
                    oldValue = formFieldObject.color;
                    newValue = color;
                }
                formFieldObject.color = color;
                htmlElement.style.color = color;
                this.pdfViewer.nameTable[formFieldObject.id.split('_')[0]].color = color;
                if (isColorChanged) {
                    this.updateFormFieldPropertiesChanges("formFieldPropertiesChange", formFieldObject, false, false, false, false, isColorChanged, false, false, false, false, false, false, false, false, false, false, oldValue, newValue);
                }
            }
            if (formFieldObject.formFieldAnnotationType !== 'SignatureField') {
                if (options.alignment) {
                    if (formFieldObject.alignment !== options.alignment) {
                        isAlignmentChanged = true;
                        oldValue = formFieldObject.alignment;
                        newValue = options.alignment;
                    }
                    formFieldObject.alignment = options.alignment;
                    htmlElement.style.textAlign = options.alignment;
                    this.pdfViewer.nameTable[formFieldObject.id.split('_')[0]].alignment = options.alignment;
                    if (isAlignmentChanged) {
                        this.updateFormFieldPropertiesChanges("formFieldPropertiesChange", formFieldObject, false, false, false, false, false, false, false, false, isAlignmentChanged, false, false, false, false, false, false, oldValue, newValue);
                    }
                }
                if (options.maxLength) {
                    if (formFieldObject.maxLength !== options.maxLength) {
                        isMaxLengthChanged = true;
                        oldValue = formFieldObject.maxLength;
                        newValue = options.maxLength;
                    }
                    formFieldObject.maxLength = options.maxLength;
                    htmlElement.maxLength = options.maxLength;
                    this.pdfViewer.nameTable[formFieldObject.id.split('_')[0]].maxLength = options.maxLength;
                    if (isMaxLengthChanged) {
                        this.updateFormFieldPropertiesChanges("formFieldPropertiesChange", formFieldObject, false, false, false, false, false, false, false, false, false, false, false, isMaxLengthChanged, false, false, false, oldValue, newValue);
                    }
                }
            }
            if (formFieldObject.formFieldAnnotationType !== 'PasswordField') {
                if (options.fontFamily) {
                    if (formFieldObject.fontFamily !== options.fontFamily) {
                        isFontFamilyChanged = true;
                        oldValue = formFieldObject.fontFamily;
                        newValue = options.fontFamily;
                    }
                    formFieldObject.fontFamily = options.fontFamily;
                    htmlElement.style.fontFamily = options.fontFamily;
                    this.pdfViewer.nameTable[formFieldObject.id.split('_')[0]].fontFamily = options.fontFamily;
                    if (isFontFamilyChanged) {
                        this.updateFormFieldPropertiesChanges("formFieldPropertiesChange", formFieldObject, false, isFontFamilyChanged, false, false, false, false, false, false, false, false, false, false, false, false, false, oldValue, newValue);
                    }
                }
                var oldFontStyle = '';
                var newFontStyle = '';
                if (options.fontStyle) {
                    oldFontStyle += formFieldObject.font.isBold ? 'Bold' + ", " : '';
                    oldFontStyle += formFieldObject.font.isItalic ? 'Italic' + ", " : '';
                    oldFontStyle += formFieldObject.font.isStrikeout ? 'Strikethrough' + ", " : '';
                    oldFontStyle += formFieldObject.font.isUnderline ? 'Underline' + ", " : '';
                    if ((options.fontStyle & FontStyle.Bold) !== 0) {
                        htmlElement.style.fontWeight = "bold";
                        formFieldObject.fontStyle = "Bold";
                        formFieldObject.font.isBold = true;
                        this.pdfViewer.nameTable[formFieldObject.id.split('_')[0]].font.isBold = true;
                    }
                    newFontStyle += formFieldObject.font.isBold ? 'Bold' + ", " : '';
                    if ((options.fontStyle & FontStyle.Italic) !== 0) {
                        htmlElement.style.fontStyle = "italic";
                        formFieldObject.fontStyle = "Italic";
                        formFieldObject.font.isItalic = true;
                        this.pdfViewer.nameTable[formFieldObject.id.split('_')[0]].font.isItalic = true;
                    }
                    newFontStyle += formFieldObject.font.isItalic ? 'Italic' + ", " : '';
                    if ((options.fontStyle & FontStyle.Strikethrough) !== 0) {
                        htmlElement.style.textDecoration = "line-through";
                        formFieldObject.font.isStrikeout = true;
                        formFieldObject.fontStyle = "Strikethrough";
                        this.pdfViewer.nameTable[formFieldObject.id.split('_')[0]].font.isStrikeout = true;
                    }
                    newFontStyle += formFieldObject.font.isStrikeout ? 'Strikethrough' + ", " : '';
                    if ((options.fontStyle & FontStyle.Underline) !== 0) {
                        htmlElement.style.textDecoration = "underline";
                        formFieldObject.fontStyle = "Underline";
                        formFieldObject.font.isUnderline = true;
                        this.pdfViewer.nameTable[formFieldObject.id.split('_')[0]].font.isUnderline = true;
                    }
                    newFontStyle += formFieldObject.font.isUnderline ? 'Underline' + ", " : '';
                    isFontStyleChanged = true;
                    if (isFontStyleChanged) {
                        this.updateFormFieldPropertiesChanges("formFieldPropertiesChange", formFieldObject, false, false, false, isFontStyleChanged, false, false, false, false, false, false, false, false, false, false, false, oldFontStyle, newFontStyle);
                    }
                }
            }
        }
        if ((formFieldObject.formFieldAnnotationType === 'SignatureField' && options.signatureIndicatorSettings) || (formFieldObject.formFieldAnnotationType === 'InitialField' && options.initialIndicatorSettings)) {
            formFieldObject = this.updateSignatureandInitialIndicator(formFieldObject, options, htmlElement);
        }
        this.updateSessionFormFieldProperties(formFieldObject);
        var formField = {
            id: formFieldObject.id, name: formFieldObject.name, value: formFieldObject.value,
            type: formFieldObject.formFieldAnnotationType, isReadOnly: formFieldObject.isReadonly, fontFamily: formFieldObject.fontFamily,
            fontSize: formFieldObject.fontSize, fontStyle: formFieldObject.fontStyle, color: formFieldObject.color, backgroundColor: formFieldObject.backgroundColor,
            alignment: formFieldObject.alignment, visibility: formFieldObject.visibility, maxLength: formFieldObject.maxLength, isRequired: formFieldObject.isRequired,
            isPrint: formFieldObject.isPrint, tooltip: formFieldObject.tooltip, bounds: formFieldObject.bounds, thickness: formFieldObject.thickness, borderColor: formFieldObject.borderColor, pageIndex: formFieldObject.pageIndex
        };
        this.pdfViewer.formFieldCollections[this.pdfViewer.formFieldCollections.findIndex(function (el) { return el.id === formField.id; })] = formField;
    };
    FormDesigner.prototype.colorNametoHashValue = function (colorString) {
        var colorCode = colorString;
        if (!colorCode.match(/#([a-z0-9]+)/gi) && !colorCode.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/)) {
            colorCode = this.nameToHash(colorCode);
        }
        return colorCode !== '' ? colorCode : colorString;
    };
    /**
     * @private
     */
    FormDesigner.prototype.getFormField = function (formFieldId) {
        var formField;
        var formFieldCollectionObject;
        if (typeof formFieldId === 'object') {
            formFieldCollectionObject = this.getAnnotationsFromAnnotationCollections(formFieldId.id);
            if (formFieldCollectionObject)
                formField = this.pdfViewer.nameTable[formFieldCollectionObject.id];
        }
        if (typeof formFieldId === 'string') {
            formFieldCollectionObject = this.getAnnotationsFromAnnotationCollections(formFieldId);
            if (formFieldCollectionObject)
                formField = this.pdfViewer.nameTable[formFieldCollectionObject.id];
        }
        return formField;
    };
    FormDesigner.prototype.resetTextboxProperties = function (obj) {
        var inputElement = document.getElementById(obj.id + "_content_html_element").firstElementChild.firstElementChild;
        if (inputElement) {
            obj.name = 'textboxField';
            obj.value = '';
            obj.fontFamily = 'Helvetica';
            obj.fontSize = 10;
            obj.fontStyle = "None";
            obj.color = 'black';
            obj.backgroundColor = '#daeaf7ff';
            obj.alignment = 'left';
            obj.visibility = 'visible';
            obj.isReadonly = false;
            obj.isRequired = false;
            obj.tooltip = '';
            obj.isPrint = true;
            obj.borderColor = '#303030';
            obj.thickness = 1;
            obj.maxLength = 0;
            this.updateTextboxProperties(obj, inputElement);
        }
    };
    FormDesigner.prototype.resetPasswordProperties = function (obj) {
        var inputElement = document.getElementById(obj.id + "_content_html_element").firstElementChild.firstElementChild;
        if (inputElement) {
            obj.name = 'passswordField';
            obj.value = '';
            obj.fontFamily = 'Helvetica';
            obj.fontSize = 10;
            obj.fontStyle = "None";
            obj.color = 'black';
            obj.backgroundColor = '#daeaf7ff';
            obj.alignment = 'left';
            obj.visibility = 'visible';
            obj.isReadonly = false;
            obj.isRequired = false;
            obj.tooltip = '';
            obj.isPrint = true;
            obj.borderColor = '#303030';
            obj.thickness = 1;
            obj.maxLength = 0;
            this.updatePasswordFieldProperties(obj, inputElement);
        }
    };
    FormDesigner.prototype.resetCheckboxProperties = function (obj) {
        var inputElement = document.getElementById(obj.id + "_content_html_element").firstElementChild.firstElementChild;
        if (inputElement) {
            obj.name = 'checkboxField';
            obj.isChecked = false;
            obj.backgroundColor = '#daeaf7ff';
            obj.visibility = 'visible';
            obj.isReadonly = false;
            obj.isRequired = false;
            obj.tooltip = '';
            obj.isPrint = true;
            obj.borderColor = '#303030';
            obj.thickness = 1;
            this.updateCheckboxProperties(obj, inputElement);
        }
    };
    FormDesigner.prototype.resetRadioButtonProperties = function (obj) {
        var inputElement = document.getElementById(obj.id + "_content_html_element").firstElementChild.firstElementChild;
        if (inputElement) {
            obj.name = 'RadioButtonField';
            obj.isSelected = false;
            obj.backgroundColor = '#daeaf7ff';
            obj.visibility = 'visible';
            obj.isReadonly = false;
            obj.isRequired = false;
            obj.tooltip = '';
            obj.isPrint = true;
            obj.borderColor = '#303030';
            obj.thickness = 1;
            this.updateRadioButtonProperties(obj, inputElement);
        }
    };
    FormDesigner.prototype.resetDropdownListProperties = function (obj) {
        var inputElement = document.getElementById(obj.id + "_content_html_element").firstElementChild.firstElementChild;
        if (inputElement) {
            obj.name = 'dropDownField';
            obj.value = '';
            obj.fontFamily = 'Helvetica';
            obj.fontSize = 10;
            obj.fontStyle = "None";
            obj.color = 'black';
            obj.backgroundColor = '#daeaf7ff';
            obj.alignment = 'left';
            obj.visibility = 'visible';
            obj.isReadonly = false;
            obj.isRequired = false;
            obj.tooltip = '';
            obj.isPrint = true;
            obj.borderColor = '#303030';
            obj.thickness = 1;
            obj.options = [];
            this.updateDropdownListProperties(obj, inputElement);
            if (obj.options) {
                this.updateDropDownListDataSource(obj, inputElement);
            }
        }
    };
    FormDesigner.prototype.resetListBoxProperties = function (obj) {
        var inputElement = document.getElementById(obj.id + "_content_html_element").firstElementChild.firstElementChild;
        if (inputElement) {
            obj.name = 'listBoxField';
            obj.value = '';
            obj.fontFamily = 'Helvetica';
            obj.fontSize = 10;
            obj.fontStyle = "None";
            obj.color = 'black';
            obj.backgroundColor = '#daeaf7ff';
            obj.alignment = 'left';
            obj.visibility = 'visible';
            obj.isReadonly = false;
            obj.isRequired = false;
            obj.tooltip = '';
            obj.isPrint = true;
            obj.borderColor = '#303030';
            obj.thickness = 1;
            obj.options = [];
            this.updateListBoxProperties(obj, inputElement);
            if (obj.options) {
                this.updateDropDownListDataSource(obj, inputElement);
            }
        }
    };
    FormDesigner.prototype.resetSignatureTextboxProperties = function (obj) {
        var inputElement = document.getElementById(obj.id + "_content_html_element").firstElementChild.firstElementChild;
        if (inputElement) {
            obj.name = 'signatureField';
            obj.value = '';
            obj.fontFamily = 'Helvetica';
            obj.fontSize = 10;
            obj.fontStyle = "None";
            obj.color = 'black';
            obj.backgroundColor = '#daeaf7ff';
            obj.isRequired = false;
            obj.isReadonly = false;
            obj.tooltip = '';
            obj.isPrint = true;
            obj.visibility = 'visible';
            this.updateSignatureFieldProperties(obj, inputElement);
        }
    };
    /**
     * Deletes the form field from the PDF page.
     *
     * @param formFieldId
     * @param addAction
     * @returns void
     */
    FormDesigner.prototype.deleteFormField = function (formFieldId, addAction) {
        if (addAction === void 0) { addAction = true; }
        var formField = this.getFormField(formFieldId);
        if (formField) {
            this.clearSelection(formFieldId);
            this.pdfViewer.remove(formField);
            this.pdfViewer.renderDrawing();
            if (!isNullOrUndefined(this.pdfViewer.toolbar) && !isNullOrUndefined(this.pdfViewer.toolbar.formDesignerToolbarModule))
                this.pdfViewer.toolbar.formDesignerToolbarModule.showHideDeleteIcon(false);
            if (this.pdfViewerBase.formFieldCollection.length > 0) {
                this.pdfViewerBase.enableFormFieldButton(true);
            }
            else {
                this.pdfViewerBase.enableFormFieldButton(false);
            }
            if (addAction && this.pdfViewer.annotation) {
                this.pdfViewer.annotation.addAction(this.pdfViewerBase.currentPageNumber, null, formField, 'Delete', '', formField, formField);
            }
        }
    };
    /**
     * Clears the selection of the form field in the PDF page.
     *
     * @param formFieldId
     * @returns void
     */
    FormDesigner.prototype.clearSelection = function (formFieldId) {
        var formField;
        var formFieldCollectionObject;
        if (typeof formFieldId === 'object') {
            formFieldCollectionObject = this.getAnnotationsFromAnnotationCollections(formFieldId.id);
            formField = this.pdfViewer.nameTable[formFieldCollectionObject.id];
        }
        if (typeof formFieldId === 'string') {
            formFieldCollectionObject = this.getAnnotationsFromAnnotationCollections(formFieldId);
            formField = this.pdfViewer.nameTable[formFieldCollectionObject.id];
        }
        if (formField && (this.pdfViewer.selectedItems && !isNullOrUndefined(this.pdfViewer.selectedItems.properties.formFields) && this.pdfViewer.selectedItems.properties.formFields.length > 0 &&
            this.pdfViewer.selectedItems.properties.formFields[0].id === formField.id)) {
            var pageId = !isNullOrUndefined(this.pdfViewerBase.activeElements.activePageID) ? this.pdfViewerBase.activeElements.activePageID : formField.pageIndex;
            this.pdfViewer.clearSelection(pageId);
        }
    };
    /**
     * @private
     */
    FormDesigner.prototype.setMode = function (mode) {
        if (mode && mode.indexOf("designer") !== -1) {
            this.enableDisableFormFieldsInteraction(true);
            this.pdfViewerBase.disableTextSelectionMode();
        }
        else {
            this.enableDisableFormFieldsInteraction(false);
            if (this.pdfViewer.textSelectionModule) {
                this.pdfViewer.textSelectionModule.enableTextSelectionMode();
            }
        }
    };
    FormDesigner.prototype.enableDisableFormFieldsInteraction = function (enableDesignerMode) {
        var collections = this.pdfViewer.formFieldCollection;
        if (collections && collections.length > 0) {
            for (var i = 0; i < collections.length; i++) {
                var element = document.getElementById(collections[i].id + "_content_html_element");
                var designerName = document.getElementById(collections[i].id + "_designer_name");
                if (element) {
                    if (enableDesignerMode) {
                        this.pdfViewer.designerMode = true;
                        element.style.pointerEvents = "none";
                        designerName.innerHTML = collections[i].name;
                        var zoomValue = this.pdfViewerBase.getZoomFactor();
                        designerName.style.fontSize = collections[i].fontSize ? (collections[i].fontSize * zoomValue) + 'px' : (10 * zoomValue) + 'px';
                        designerName.style.position = 'absolute';
                    }
                    else {
                        this.pdfViewer.designerMode = false;
                        element.style.pointerEvents = "all";
                        designerName.innerHTML = "";
                        designerName.style.position = 'initial';
                        if (collections[i].formFieldAnnotationType === 'RadioButton') {
                            this.updateRadioButtonDesignerProperties(collections[i], true);
                        }
                        if (collections[i].formFieldAnnotationType === 'Checkbox') {
                            this.updateCheckboxFormDesignerProperties(collections[i], true);
                        }
                        this.pdfViewer.clearSelection(collections[i].pageIndex);
                    }
                }
            }
        }
    };
    // eslint-disable-next-line
    FormDesigner.prototype.getAnnotationsFromAnnotationCollections = function (annotationId) {
        // eslint-disable-next-line
        var collections = this.pdfViewer.formFieldCollection;
        if (collections && annotationId) {
            for (var i = 0; i < collections.length; i++) {
                if (collections[i].id === annotationId) {
                    return collections[i];
                }
            }
        }
    };
    /**
     * @private
     */
    FormDesigner.prototype.updateSignatureValue = function (formFieldId) {
        for (var i = 0; i < this.pdfViewerBase.formFieldCollection.length; i++) {
            if (formFieldId === this.pdfViewerBase.formFieldCollection[i].FormField.id) {
                this.pdfViewerBase.formFieldCollection[i].FormField.value = '';
                this.pdfViewer.nameTable[this.pdfViewerBase.formFieldCollection[i].FormField.id.split('_')[0]].value = '';
                this.pdfViewer.nameTable[this.pdfViewerBase.formFieldCollection[i].FormField.id].value = '';
                this.pdfViewerBase.formFieldCollection[i].FormField.signatureType = '';
                this.pdfViewer.nameTable[this.pdfViewerBase.formFieldCollection[i].FormField.id.split('_')[0]].signatureType = '';
                this.pdfViewer.nameTable[this.pdfViewerBase.formFieldCollection[i].FormField.id].signatureType = '';
            }
        }
    };
    /**
     * @private
     */
    FormDesigner.prototype.removeFieldsFromAnnotationCollections = function (annotationId) {
        var data = this.pdfViewerBase.getItemFromSessionStorage('_formDesigner');
        var formFieldsData = JSON.parse(data);
        for (var i = 0; i < formFieldsData.length; i++) {
            if (formFieldsData[i].Key.split("_")[0] === annotationId) {
                formFieldsData.splice(i, 1);
                this.pdfViewerBase.formFieldCollection.splice(i, 1);
                break;
            }
        }
        this.pdfViewerBase.setItemInSessionStorage(this.pdfViewerBase.formFieldCollection, '_formDesigner');
        var storeObject = window.sessionStorage.getItem(this.pdfViewerBase.documentId + '_annotations_shape');
        if (storeObject) {
            var annotObject = JSON.parse(storeObject);
            var index = this.pdfViewer.annotationModule.getPageCollection(annotObject, this.pdfViewerBase.currentPageNumber - 1);
            if (annotObject[index]) {
                for (var m = 0; m < annotObject[index].annotations.length; m++) {
                    if (annotationId === annotObject[index].annotations[m].id) {
                        annotObject[index].annotations.splice(m, 1);
                        break;
                    }
                }
                var annotationStringified = JSON.stringify(annotObject);
                window.sessionStorage.setItem(this.pdfViewerBase.documentId + '_annotations_shape', annotationStringified);
            }
        }
        // eslint-disable-next-line
        var collections = this.pdfViewer.formFieldCollection;
        if (collections && annotationId) {
            for (var i = 0; i < collections.length; i++) {
                if (collections[i].formFieldId === annotationId) {
                    this.pdfViewer.formFieldCollection.splice(i, 1);
                }
            }
        }
    };
    /**
     * @private
    */
    FormDesigner.prototype.setFormFieldIndex = function () {
        this.formFieldIndex = this.formFieldIndex + 1;
        return this.formFieldIndex;
    };
    FormDesigner.prototype.setFormFieldIdIndex = function () {
        this.formFieldIdIndex = this.formFieldIdIndex + 1;
        return this.formFieldIdIndex;
    };
    FormDesigner.prototype.activateTextboxElement = function (formFieldType) {
        this.pdfViewer.drawingObject = {
            formFieldAnnotationType: formFieldType,
            name: 'Textbox' + this.setFormFieldIndex(), value: '', fontFamily: 'Helvetica', fontSize: 10 * this.pdfViewerBase.getZoomFactor(), fontStyle: 'None', color: 'black',
            backgroundColor: '#daeaf7ff', thickness: 1, borderColor: '#303030', alignment: 'left', isReadonly: false, visibility: "visible", isRequired: false, isPrint: true, rotateAngle: 0, tooltip: '', font: { isItalic: false, isBold: false, isStrikeout: false, isUnderline: false }
        };
        this.pdfViewer.tool = "DrawTool";
    };
    FormDesigner.prototype.activatePasswordField = function (formFieldType) {
        this.pdfViewer.drawingObject = {
            formFieldAnnotationType: formFieldType,
            name: 'Password' + this.setFormFieldIndex(), value: '', fontFamily: 'Helvetica', fontSize: 10 * this.pdfViewerBase.getZoomFactor(), fontStyle: 'None', color: 'black',
            alignment: 'left', backgroundColor: '#daeaf7ff', thickness: 1, borderColor: '#303030', isReadonly: false, visibility: "visible", isRequired: false, isPrint: true, rotateAngle: 0, tooltip: '', font: { isItalic: false, isBold: false, isStrikeout: false, isUnderline: false }
        };
        this.pdfViewer.tool = "DrawTool";
    };
    FormDesigner.prototype.activateCheckboxElement = function (formFieldType) {
        this.pdfViewer.drawingObject = {
            formFieldAnnotationType: formFieldType,
            name: 'Check Box' + this.setFormFieldIndex(), isChecked: false, fontSize: 10 * this.pdfViewerBase.getZoomFactor(), backgroundColor: '#daeaf7ff', color: 'black', thickness: 1, borderColor: '#303030', isReadonly: false, visibility: "visible", isPrint: true, rotateAngle: 0, tooltip: ''
        };
        this.pdfViewer.tool = "DrawTool";
    };
    FormDesigner.prototype.activateRadioButtonElement = function (formFieldType) {
        this.pdfViewer.drawingObject = {
            formFieldAnnotationType: formFieldType,
            name: 'Radio Button' + this.setFormFieldIndex(), isSelected: false, fontSize: 10 * this.pdfViewerBase.getZoomFactor(), backgroundColor: '#daeaf7ff', color: 'black', thickness: 1, borderColor: '#303030', isReadonly: false, visibility: "visible", isPrint: true, rotateAngle: 0, tooltip: ''
        };
        this.pdfViewer.tool = "DrawTool";
    };
    FormDesigner.prototype.activateDropDownListElement = function (formFieldType, dropDownOptions) {
        this.pdfViewer.drawingObject = {
            formFieldAnnotationType: formFieldType,
            name: 'Dropdown' + this.setFormFieldIndex(), fontFamily: 'Helvetica', fontSize: 10 * this.pdfViewerBase.getZoomFactor(), fontStyle: 'None', color: 'black', backgroundColor: '#daeaf7ff', thickness: 1, borderColor: '#303030',
            alignment: 'left', isReadonly: false, visibility: "visible", isRequired: false, isPrint: true, rotateAngle: 0, tooltip: '',
            options: dropDownOptions, isMultiSelect: false, font: { isItalic: false, isBold: false, isStrikeout: false, isUnderline: false }
        };
        this.pdfViewer.tool = "DrawTool";
    };
    FormDesigner.prototype.activateListboxElement = function (formFieldType, listBoxOptions) {
        this.pdfViewer.drawingObject = {
            formFieldAnnotationType: formFieldType,
            name: 'List Box' + this.setFormFieldIndex(), fontFamily: 'Helvetica', fontSize: 10 * this.pdfViewerBase.getZoomFactor(), fontStyle: 'None', color: 'black', backgroundColor: '#daeaf7ff', thickness: 1, borderColor: '#303030',
            alignment: 'left', isReadonly: false, visibility: "visible", isRequired: false, isPrint: true, rotateAngle: 0, tooltip: '',
            options: listBoxOptions, isMultiSelect: true, font: { isItalic: false, isBold: false, isStrikeout: false, isUnderline: false }
        };
        this.pdfViewer.tool = "DrawTool";
    };
    FormDesigner.prototype.activateSignatureBoxElement = function (formFieldType) {
        var propertyValues = { opacity: 1, backgroundColor: 'rgba(255, 228, 133, 0.35)', width: 19, height: 10, fontSize: 10, text: null, color: 'black' };
        switch (formFieldType) {
            case "SignatureField":
                if (!isNullOrUndefined(this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings)) {
                    propertyValues = this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings;
                }
                break;
            case 'InitialField':
                if (!isNullOrUndefined(this.pdfViewer.initialFieldSettings.initialIndicatorSettings)) {
                    propertyValues = this.pdfViewer.initialFieldSettings.initialIndicatorSettings;
                }
                break;
            default:
                break;
        }
        this.pdfViewer.drawingObject = {
            formFieldAnnotationType: formFieldType,
            name: formFieldType === 'InitialField' || this.pdfViewer.isInitialFieldToolbarSelection ? 'Initial' + this.setFormFieldIndex() : 'Signature' + this.setFormFieldIndex(), fontFamily: 'Helvetica', fontSize: 10 * this.pdfViewerBase.getZoomFactor(), fontStyle: 'None', color: 'black', backgroundColor: '#daeaf7ff', alignment: 'left',
            isReadonly: false, visibility: "visible", isRequired: false, isPrint: true, rotateAngle: 0, tooltip: '', font: { isItalic: false, isBold: false, isStrikeout: false, isUnderline: false },
            isInitialField: formFieldType === 'InitialField' || this.pdfViewer.isInitialFieldToolbarSelection, signatureIndicatorSettings: { opacity: propertyValues.opacity, backgroundColor: propertyValues.backgroundColor, width: propertyValues.width, height: propertyValues.height, fontSize: propertyValues.fontSize, text: propertyValues.text, color: propertyValues.color }
        };
        this.pdfViewer.tool = "DrawTool";
    };
    /**
     * @private
    */
    FormDesigner.prototype.updateTextboxProperties = function (obj, inputElement, isPrint) {
        var fillColor = '#daeaf7ff';
        inputElement.name = obj.name ? obj.name : 'Textbox' + this.setFormFieldIndex();
        inputElement.value = obj.value ? obj.value : '';
        var zoomValue = isPrint ? this.defaultZoomValue : this.pdfViewerBase.getZoomFactor();
        if (obj.insertSpaces) {
            var font = ((obj.bounds.width * zoomValue / obj.maxLength) - (obj.fontSize * zoomValue / 2)) - (0.6 * zoomValue);
            inputElement.style.letterSpacing = '' + font + 'px';
            inputElement.style.fontFamily = 'monospace';
            inputElement.style.paddingLeft = (font / 2) + 'px';
        }
        else {
            inputElement.style.fontFamily = obj.fontFamily && this.getFontFamily(obj.fontFamily) ? obj.fontFamily : 'Helvetica';
        }
        inputElement.style.fontSize = obj.fontSize ? (obj.fontSize * zoomValue) + 'px' : (10 * zoomValue) + 'px';
        if (obj.font.isBold) {
            inputElement.style.fontWeight = "bold";
        }
        if (obj.font.isItalic) {
            inputElement.style.fontStyle = "italic";
        }
        if (obj.font.isUnderline && obj.font.isStrikeout) {
            inputElement.style.textDecoration = "underline line-through";
        }
        else if (obj.font.isStrikeout) {
            inputElement.style.textDecoration = "line-through";
        }
        else if (obj.font.isUnderline) {
            inputElement.style.textDecoration = "underline";
        }
        if (obj.isTransparent && obj.borderColor === '#ffffffff') {
            inputElement.style.backgroundColor = 'transparent';
            inputElement.style.borderColor = 'transparent';
        }
        else {
            inputElement.style.backgroundColor = obj.backgroundColor ? obj.backgroundColor : '#daeaf7ff';
            inputElement.style.borderColor = obj.borderColor ? obj.borderColor : '#303030';
        }
        inputElement.style.color = obj.color ? obj.color : 'black';
        inputElement.style.borderWidth = !isNullOrUndefined(obj.thickness) ? obj.thickness + 'px' : '1px';
        inputElement.style.textAlign = obj.alignment ? obj.alignment.toLowerCase() : 'left';
        inputElement.style.visibility = obj.visibility ? obj.visibility : 'visible';
        inputElement.style.pointerEvents = obj.isReadonly ? (obj.isMultiline ? 'default' : 'none') : 'default';
        if (obj.isReadonly) {
            inputElement.disabled = true;
            inputElement.style.cursor = 'default';
            inputElement.style.backgroundColor = obj.backgroundColor != fillColor ? obj.backgroundColor : 'transparent';
        }
        if (obj.isRequired) {
            inputElement.required = true;
            inputElement.style.border = '1px solid red';
            inputElement.style.borderWidth = !isNullOrUndefined(obj.thickness) ? obj.thickness + 'px' : '1px';
        }
        if (obj.maxLength != undefined) {
            inputElement.maxLength = obj.maxLength === 0 ? 524288 : obj.maxLength;
        }
        inputElement.tabIndex = this.formFieldIndex;
        inputElement.setAttribute("aria-label", this.pdfViewer.element.id + "formfilldesigner");
    };
    /**
     * @private
    */
    FormDesigner.prototype.updatePasswordFieldProperties = function (obj, inputElement, isPrint) {
        var fillColor = '#daeaf7ff';
        inputElement.name = obj.name ? obj.name : 'Password' + this.setFormFieldIndex();
        inputElement.value = obj.value ? obj.value : '';
        inputElement.style.fontFamily = obj.fontFamily ? obj.fontFamily : 'Helvetica';
        var zoomValue = isPrint ? this.defaultZoomValue : this.pdfViewerBase.getZoomFactor();
        inputElement.style.fontSize = obj.fontSize ? (obj.fontSize * zoomValue) + 'px' : (10 * zoomValue) + 'px';
        if (obj.font.isBold) {
            inputElement.style.fontWeight = "bold";
        }
        if (obj.font.isItalic) {
            inputElement.style.fontStyle = "italic";
        }
        if (obj.font.isStrikeout) {
            inputElement.style.textDecoration = "line-through";
        }
        if (obj.font.isUnderline) {
            inputElement.style.textDecoration = "underline";
        }
        inputElement.style.borderWidth = !isNullOrUndefined(obj.thickness) ? obj.thickness + 'px' : '1px';
        inputElement.style.color = obj.color ? obj.color : 'black';
        inputElement.style.backgroundColor = obj.backgroundColor ? obj.backgroundColor : '#daeaf7ff';
        inputElement.style.borderColor = obj.borderColor ? obj.borderColor : '#303030';
        inputElement.style.textAlign = obj.alignment ? obj.alignment.toLowerCase() : 'left';
        inputElement.style.visibility = obj.visibility ? obj.visibility : 'visible';
        inputElement.style.pointerEvents = obj.isReadonly ? 'none' : 'default';
        if (obj.isReadonly) {
            inputElement.disabled = true;
            inputElement.style.cursor = 'default';
            inputElement.style.backgroundColor = obj.backgroundColor != fillColor ? obj.backgroundColor : 'transparent';
        }
        if (obj.isRequired) {
            inputElement.required = true;
            inputElement.style.border = '1px solid red';
            inputElement.style.borderWidth = !isNullOrUndefined(obj.thickness) ? obj.thickness + 'px' : '1px';
        }
        if (obj.maxLength != undefined) {
            inputElement.maxLength = obj.maxLength === 0 ? 524288 : obj.maxLength;
        }
        inputElement.tabIndex = this.formFieldIndex;
    };
    /**
     * @private
    */
    FormDesigner.prototype.updateCheckboxProperties = function (obj, inputElement) {
        var fillColor = '#daeaf7ff';
        inputElement.name = obj.name ? obj.name : 'Check Box' + this.setFormFieldIndex();
        inputElement.checked = obj.isChecked ? true : false;
        if (obj.isTransparent && obj.borderColor === '#ffffffff') {
            inputElement.style.backgroundColor = 'transparent';
            inputElement.style.borderColor = 'transparent';
        }
        else {
            inputElement.style.backgroundColor = obj.backgroundColor ? obj.backgroundColor : '#daeaf7ff';
            inputElement.style.borderColor = obj.borderColor ? obj.borderColor : '#303030';
        }
        inputElement.style.visibility = obj.visibility ? obj.visibility : 'visible';
        inputElement.style.pointerEvents = obj.isReadonly ? 'none' : 'default';
        inputElement.style.borderWidth = !isNullOrUndefined(obj.thickness) ? obj.thickness + 'px' : '1px';
        if (obj.isReadonly) {
            inputElement.disabled = true;
            inputElement.style.cursor = 'default';
            inputElement.style.backgroundColor = obj.backgroundColor != fillColor ? obj.backgroundColor : 'transparent';
        }
        if (obj.isRequired) {
            inputElement.required = true;
            inputElement.style.border = '1px solid red';
            inputElement.style.borderWidth = !isNullOrUndefined(obj.thickness) ? obj.thickness + 'px' : '1px';
        }
        inputElement.tabIndex = this.formFieldIndex;
    };
    /**
     * @private
    */
    FormDesigner.prototype.updateRadioButtonProperties = function (obj, inputElement) {
        var fillColor = '#daeaf7ff';
        inputElement.name = obj.name ? obj.name : 'Radio Button' + this.setFormFieldIndex();
        inputElement.checked = obj.isSelected ? true : false;
        inputElement.style.backgroundColor = obj.backgroundColor ? obj.backgroundColor : '#daeaf7ff';
        inputElement.style.borderColor = obj.borderColor ? obj.borderColor : '#303030';
        inputElement.style.visibility = obj.visibility ? obj.visibility : 'visible';
        inputElement.style.pointerEvents = obj.isReadonly ? 'none' : 'default';
        inputElement.style.borderWidth = !isNullOrUndefined(obj.thickness) ? obj.thickness + 'px' : '1px';
        if (obj.isReadonly) {
            inputElement.disabled = true;
            inputElement.style.cursor = 'default';
            inputElement.style.backgroundColor = obj.backgroundColor != fillColor ? obj.backgroundColor : 'transparent';
        }
        if (obj.isRequired) {
            inputElement.required = true;
            inputElement.style.border = '1px solid red';
            inputElement.style.borderWidth = !isNullOrUndefined(obj.thickness) ? obj.thickness + 'px' : '1px';
        }
        inputElement.tabIndex = this.formFieldIndex;
    };
    /**
     * @private
    */
    FormDesigner.prototype.updateDropdownListProperties = function (obj, inputElement, isPrint) {
        var fillColor = '#daeaf7ff';
        inputElement.name = obj.name ? obj.name : 'Dropdown' + this.setFormFieldIndex();
        inputElement.value = obj.value ? obj.value : '';
        inputElement.style.fontFamily = obj.fontFamily ? obj.fontFamily : 'Helvetica';
        var zoomValue = isPrint ? this.defaultZoomValue : this.pdfViewerBase.getZoomFactor();
        inputElement.style.fontSize = obj.fontSize ? (obj.fontSize * zoomValue) + 'px' : (10 * zoomValue) + 'px';
        if (obj.font.isBold) {
            inputElement.style.fontWeight = "bold";
        }
        if (obj.font.isItalic) {
            inputElement.style.fontStyle = "italic";
        }
        if (obj.font.isStrikeout) {
            inputElement.style.textDecoration = "line-through";
        }
        if (obj.font.isUnderline) {
            inputElement.style.textDecoration = "underline";
        }
        inputElement.style.borderWidth = !isNullOrUndefined(obj.thickness) ? obj.thickness + 'px' : '1px';
        inputElement.style.color = obj.color ? obj.color : 'black';
        inputElement.style.backgroundColor = obj.backgroundColor ? obj.backgroundColor : '#daeaf7ff';
        inputElement.style.borderColor = obj.borderColor ? obj.borderColor : '#303030';
        inputElement.style.textAlign = obj.alignment ? obj.alignment.toLowerCase() : 'left';
        inputElement.style.visibility = obj.visibility ? obj.visibility : 'visible';
        inputElement.style.pointerEvents = obj.isReadonly ? 'none' : 'default';
        if (obj.isReadonly) {
            inputElement.disabled = true;
            inputElement.style.cursor = 'default';
            inputElement.style.backgroundColor = obj.backgroundColor != fillColor ? obj.backgroundColor : 'transparent';
        }
        if (obj.isRequired) {
            inputElement.required = true;
            inputElement.style.border = '1px solid red';
            inputElement.style.borderWidth = !isNullOrUndefined(obj.thickness) ? obj.thickness + 'px' : '1px';
        }
        inputElement.tabIndex = this.formFieldIndex;
    };
    /**
     * @private
    */
    FormDesigner.prototype.updateListBoxProperties = function (obj, inputElement, isPrint) {
        var fillColor = '#daeaf7ff';
        inputElement.name = obj.name ? obj.name : 'List Box' + this.setFormFieldIndex();
        inputElement.value = obj.value ? obj.value : '';
        inputElement.style.fontFamily = obj.fontFamily ? obj.fontFamily : 'Helvetica';
        var zoomValue = isPrint ? this.defaultZoomValue : this.pdfViewerBase.getZoomFactor();
        inputElement.style.fontSize = obj.fontSize ? (obj.fontSize * zoomValue) + 'px' : (10 * zoomValue) + 'px';
        if (obj.font.isBold) {
            inputElement.style.fontWeight = "bold";
        }
        if (obj.font.isItalic) {
            inputElement.style.fontStyle = "italic";
        }
        if (obj.font.isStrikeout) {
            inputElement.style.textDecoration = "line-through";
        }
        if (obj.font.isUnderline) {
            inputElement.style.textDecoration = "underline";
        }
        inputElement.style.color = obj.color ? obj.color : 'black';
        inputElement.style.backgroundColor = obj.backgroundColor ? obj.backgroundColor : '#daeaf7ff';
        inputElement.style.borderColor = obj.borderColor ? obj.borderColor : '#303030';
        inputElement.style.textAlign = obj.alignment ? obj.alignment.toLowerCase() : 'left';
        inputElement.style.visibility = obj.visibility ? obj.visibility : 'visible';
        inputElement.style.pointerEvents = obj.isReadonly ? 'none' : 'default';
        inputElement.style.borderWidth = !isNullOrUndefined(obj.thickness) ? obj.thickness + 'px' : '1px';
        if (obj.isReadonly) {
            inputElement.disabled = true;
            inputElement.style.cursor = 'default';
            inputElement.style.backgroundColor = obj.backgroundColor != fillColor ? obj.backgroundColor : 'transparent';
        }
        if (obj.isRequired) {
            inputElement.required = true;
            inputElement.style.border = '1px solid red';
            inputElement.style.borderWidth = !isNullOrUndefined(obj.thickness) ? obj.thickness + 'px' : '1px';
        }
        inputElement.tabIndex = this.formFieldIndex;
    };
    /**
     * @private
    */
    FormDesigner.prototype.updateSignatureFieldProperties = function (obj, inputElement, isPrint) {
        inputElement.name = obj.name ? obj.name : 'Signature' + this.setFormFieldIndex();
        inputElement.value = obj.value ? obj.value : '';
        inputElement.style.fontFamily = obj.fontFamily ? obj.fontFamily : 'Helvetica';
        inputElement.style.visibility = obj.visibility ? obj.visibility : 'visible';
        var zoomValue = this.pdfViewerBase.getZoomFactor();
        inputElement.style.fontSize = obj.fontSize ? (obj.fontSize * zoomValue) + 'px' : (10 * zoomValue) + 'px';
        if (obj.font.isBold) {
            inputElement.style.fontWeight = "bold";
        }
        if (obj.font.isItalic) {
            inputElement.style.fontStyle = "italic";
        }
        if (obj.font.isStrikeout) {
            inputElement.style.textDecoration = "line-through";
        }
        if (obj.font.isUnderline) {
            inputElement.style.textDecoration = "underline";
        }
        inputElement.style.color = obj.color ? obj.color : 'black';
        inputElement.style.borderWidth = !isNullOrUndefined(obj.thickness) ? obj.thickness + 'px' : '1px';
        var background = obj.backgroundColor ? obj.backgroundColor : '#FFE48559';
        background = this.getSignatureBackground(background);
        inputElement.style.backgroundColor = isPrint ? 'transparent' : background;
        if (obj.isReadonly) {
            inputElement.disabled = true;
            inputElement.style.cursor = 'default';
            inputElement.style.backgroundColor = 'transparent';
        }
        if (obj.isRequired) {
            inputElement.required = true;
            if (inputElement.firstElementChild) {
                var thickness = (obj.thickness > 0) ? obj.thickness : 1;
                inputElement.firstElementChild.style.border = thickness + 'px solid red';
            }
            else {
                inputElement.style.border = '1px solid red';
            }
            inputElement.style.borderWidth = obj.thickness ? obj.thickness + 'px' : '1px';
        }
        inputElement.tabIndex = this.formFieldIndex;
    };
    /**
     * @private
     */
    FormDesigner.prototype.createHtmlElement = function (elementType, attribute) {
        var element = createElement(elementType);
        this.setAttributeHtml(element, attribute);
        return element;
    };
    FormDesigner.prototype.setAttributeHtml = function (element, attributes) {
        var keys = Object.keys(attributes);
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] !== 'style') {
                element.setAttribute(keys[i], attributes[keys[i]]);
            }
            else {
                this.applyStyleAgainstCsp(element, attributes[keys[i]]);
            }
        }
    };
    FormDesigner.prototype.applyStyleAgainstCsp = function (svg, attributes) {
        var keys = attributes.split(';');
        for (var i = 0; i < keys.length; i++) {
            var attribute = keys[i].split(':');
            if (attribute.length === 2) {
                svg.style[attribute[0].trim()] = attribute[1].trim();
            }
        }
    };
    // eslint-disable-next-line
    FormDesigner.prototype.getFieldBounds = function (bound, pageIndex) {
        // eslint-disable-next-line
        var pageDetails = this.pdfViewerBase.pageSize[pageIndex];
        // eslint-disable-next-line max-len
        bound = { X: bound.X ? bound.X : bound.x, Y: bound.Y ? bound.Y : bound.y, Width: bound.Width ? bound.Width : bound.width, Height: bound.Height ? bound.Height : bound.height };
        // eslint-disable-next-line
        var bounds;
        if (pageDetails) {
            switch (pageDetails.rotation) {
                case 0:
                    bounds = bound;
                    break;
                case 1:
                    bounds = { X: bound.Y - (bound.Width / 2 - bound.Height / 2), Y: pageDetails.width - bound.X - bound.Height - (bound.Width / 2 - bound.Height / 2), Width: bound.Width, Height: bound.Height };
                    break;
                case 2:
                    bounds = { X: pageDetails.width - bound.X - bound.Width, Y: pageDetails.height - bound.Y - bound.Height, Width: bound.Width, Height: bound.Height };
                    break;
                case 3:
                    bounds = { X: (pageDetails.height - bound.Y - bound.Width + (bound.Width / 2 - bound.Height / 2)), Y: bound.X + (bound.Width / 2 - bound.Height / 2), Width: bound.Height, Height: bound.Width };
                    break;
            }
        }
        if (!bounds) {
            bounds = bound;
        }
        return bounds;
    };
    /**
     * @private
     */
    // eslint-disable-next-line
    FormDesigner.prototype.downloadFormDesigner = function () {
        var _this = this;
        var data = this.pdfViewerBase.getItemFromSessionStorage('_formDesigner');
        if (data) {
            var formFieldsData = JSON.parse(data);
            // Get Formfields present in non rendered pages
            if (formFieldsData.length != this.pdfViewer.formFieldCollections.length) {
                var formFieldNotContains = this.pdfViewer.formFieldCollections.filter(function (_a) {
                    var id1 = _a.id;
                    return !_this.pdfViewer.formFieldCollection.some(function (_a) {
                        var id2 = _a.id;
                        return id2 === id1;
                    });
                });
                for (var k = 0; k < formFieldNotContains.length; k++) {
                    var items = this.loadedFormFieldValue(formFieldNotContains[k]);
                    formFieldsData.push({ Key: items.id + "_content", FormField: items });
                }
            }
            for (var i = 0; i < formFieldsData.length; i++) {
                var currentData = formFieldsData[i].FormField;
                currentData.Multiline = currentData.isMultiline;
                if (currentData.isRequired) {
                    if (currentData.formFieldAnnotationType === 'Textbox' || currentData.formFieldAnnotationType === 'PasswordField' || currentData.Multiline) {
                        if (currentData.value === null || currentData.value === '') {
                            this.pdfViewerBase.validateForm = true;
                            this.pdfViewerBase.nonFillableFields[currentData.name] = currentData.value;
                        }
                        else {
                            delete (this.pdfViewerBase.nonFillableFields[currentData.name]);
                        }
                    }
                    else if (currentData.formFieldAnnotationType === 'RadioButton') {
                        if (currentData.radiobuttonItem) {
                            var isSelected = false;
                            for (var j = 0; j < currentData.radiobuttonItem.length; j++) {
                                if (currentData.radiobuttonItem[j].isSelected) {
                                    isSelected = true;
                                    break;
                                }
                            }
                            if (!isSelected) {
                                this.pdfViewerBase.validateForm = true;
                                this.pdfViewerBase.nonFillableFields[currentData.name] = isSelected;
                            }
                            else {
                                delete (this.pdfViewerBase.nonFillableFields[currentData.name]);
                            }
                        }
                    }
                    else if (currentData.formFieldAnnotationType === 'Checkbox') {
                        if (currentData.isChecked === false) {
                            this.pdfViewerBase.validateForm = true;
                            this.pdfViewerBase.nonFillableFields[currentData.name] = currentData.isChecked;
                        }
                        else {
                            delete (this.pdfViewerBase.nonFillableFields[currentData.name]);
                        }
                    }
                    else if (currentData.formFieldAnnotationType === 'DropdownList' || currentData.formFieldAnnotationType === 'ListBox') {
                        if (isNullOrUndefined(currentData.selectedIndex) || currentData.selectedIndex.length === 0) {
                            this.pdfViewerBase.validateForm = true;
                            this.pdfViewerBase.nonFillableFields[currentData.name] = currentData.selectedIndex;
                        }
                        else {
                            delete (this.pdfViewerBase.nonFillableFields[currentData.name]);
                        }
                    }
                    else if (currentData.formFieldAnnotationType === 'SignatureField' || currentData.formFieldAnnotationType === 'InitialField') {
                        if (currentData.value === null || currentData.value === '') {
                            this.pdfViewerBase.validateForm = true;
                            this.pdfViewerBase.nonFillableFields[currentData.name] = currentData.value;
                        }
                        else {
                            delete (this.pdfViewerBase.nonFillableFields[currentData.name]);
                        }
                    }
                }
            }
            return (JSON.stringify(formFieldsData));
        }
        else {
            return null;
        }
    };
    /**
     * @private
    */
    FormDesigner.prototype.loadedFormFieldValue = function (currentData) {
        var backgroundColor = this.hexToRgb(currentData.backgroundColor);
        var bounds = currentData.bounds;
        var backColor = currentData.backgroundColor ? { r: backgroundColor[0], g: backgroundColor[1], b: backgroundColor[2], a: backgroundColor[3] } : { r: 218, g: 234, b: 247, a: 100 };
        // // eslint-disable-next-line
        var fontColor = this.hexToRgb(currentData.color);
        var foreColor = currentData.color ? { r: fontColor[0], g: fontColor[1], b: fontColor[2], a: 100 } : { r: 0, g: 0, b: 0, a: 100 };
        var borderColor = this.hexToRgb(currentData.borderColor);
        var borderRGB = currentData.borderColor ? { r: borderColor[0], g: borderColor[1], b: borderColor[2], a: 100 } : { r: 48, g: 48, b: 48, a: 100 };
        var value;
        var options = [];
        var dropListoptions = [];
        var selectedIndex = [];
        var finalSignBounds;
        var signType = '';
        this.data = this.pdfViewerBase.getItemFromSessionStorage('_formfields');
        if (!isNullOrUndefined(this.data)) {
            this.formFieldsData = JSON.parse(this.data);
            if ((currentData.type === 'DropdownList' || currentData.type === 'ListBox')) {
                var dropListData = this.formFieldsData.filter(function (fieldData) { return (currentData.name === fieldData.FieldName); });
                if (dropListData.length > 0) {
                    dropListoptions = dropListData[0].TextList;
                    selectedIndex.push(dropListData[0].selectedIndex);
                    for (var i_2 = 0; i_2 < dropListoptions.length; i_2++) {
                        options.push({ itemName: dropListoptions[i_2], itemValue: dropListoptions[i_2] });
                    }
                }
            }
            if ((currentData.type === 'InitialField' || currentData.type === 'SignatureField')) {
                this.formFieldsData = JSON.parse(this.data);
                var signData_1 = this.formFieldsData.filter(function (signfieldName) { return (currentData.name === signfieldName.FieldName); });
                if (signData_1.length > 0) {
                    var boundsData = this.formFieldsData.filter(function (datafieldName) { return (datafieldName.Name === 'ink' || datafieldName.Name === 'SignatureField' || datafieldName.Name === 'SignatureImage' || datafieldName.Name === 'SignatureText') && (signData_1[0].FieldName === datafieldName.FieldName.split("_")[0]); });
                    for (var i = 0; i < boundsData.length; i++) {
                        if ((signData_1[0].FieldName !== boundsData[i].FieldName)) {
                            value = boundsData[i].Value;
                            currentData.fontFamily = boundsData[i].FontFamily;
                            currentData.fontSize = boundsData[i].FontSize;
                            if (!signData_1.Bounds) {
                                var signBounds = boundsData[i].LineBounds;
                                var currentLeft = void 0;
                                var currentTop = void 0;
                                var currentWidth = void 0;
                                var currentHeight = void 0;
                                var currentPage = parseFloat(boundsData[i].PageIndex);
                                if (signBounds.x || signBounds.y || signBounds.width || signBounds.height) {
                                    currentLeft = signBounds.x;
                                    currentTop = signBounds.y;
                                    currentWidth = signBounds.width;
                                    currentHeight = signBounds.height;
                                }
                                else {
                                    currentLeft = this.pdfViewer.formFieldsModule.ConvertPointToPixel(signBounds.X);
                                    currentTop = this.pdfViewer.formFieldsModule.ConvertPointToPixel(signBounds.Y);
                                    currentWidth = this.pdfViewer.formFieldsModule.ConvertPointToPixel(signBounds.Width);
                                    currentHeight = this.pdfViewer.formFieldsModule.ConvertPointToPixel(signBounds.Height);
                                }
                                var bound = { left: currentLeft, top: currentTop, width: currentWidth, height: currentHeight };
                                finalSignBounds = this.pdfViewer.formFieldsModule.updateSignatureBounds(bound, currentPage, false);
                            }
                            if (boundsData[i].Name === "SignatureImage") {
                                signType = 'Image';
                            }
                            if (boundsData[i].Name === "ink") {
                                signType = 'Path';
                            }
                            if (boundsData[i].Name === "SignatureText") {
                                signType = 'Text';
                            }
                            if (signType === 'Path') {
                                var collectionData = processPathData(boundsData[i].Value);
                                var csData = splitArrayCollection(collectionData);
                                value = JSON.stringify(csData);
                            }
                            break;
                        }
                    }
                }
            }
        }
        var fieldProperties = {
            lineBound: { X: bounds.x, Y: bounds.y, Width: bounds.width, Height: bounds.height },
            pageNumber: parseFloat(currentData.pageIndex) + 1, name: currentData.name, tooltip: currentData.tooltip,
            value: value ? value : currentData.value, radiobuttonItem: [],
            signatureType: currentData.signatureType ? currentData.signatureType : signType, id: currentData.id,
            insertSpaces: currentData.insertSpaces ? currentData.insertSpaces : false, isChecked: currentData.isChecked ? currentData.isChecked : false,
            isSelected: currentData.isSelected ? currentData.isSelected : false, fontFamily: currentData.fontFamily,
            fontStyle: currentData.fontStyle, backgroundColor: backColor, fontColor: foreColor, borderColor: borderRGB, thickness: currentData.thickness,
            fontSize: currentData.fontSize, isMultiline: currentData.isMultiline ? currentData.isMultiline : false, rotation: 0,
            isReadOnly: currentData.isReadOnly ? currentData.isReadOnly : false,
            isRequired: currentData.isRequired ? currentData.isRequired : false, textAlign: currentData.alignment, formFieldAnnotationType: currentData.type,
            zoomvalue: 1, option: options, maxLength: currentData.maxLength ? currentData.maxLength : 0,
            visibility: currentData.visibility, font: { isItalic: false, isBold: false, isStrikeout: false, isUnderline: false }
        };
        if (finalSignBounds) {
            fieldProperties.signatureBound = finalSignBounds;
        }
        if (selectedIndex.length > 0) {
            fieldProperties.selectedIndex = selectedIndex;
        }
        if (currentData.type === 'RadioButton') {
            var field = {
                lineBound: { X: bounds.x, Y: bounds.y, Width: bounds.width, Height: bounds.height },
                pageNumber: parseFloat(currentData.pageIndex) + 1, name: currentData.name, tooltip: currentData.tooltip,
                value: currentData.value, signatureType: currentData.signatureType ? currentData.signatureType : '', id: currentData.id,
                isChecked: currentData.isChecked ? currentData.isChecked : false, isSelected: currentData.isSelected ? currentData.isSelected : false,
                fontFamily: currentData.fontFamily, fontStyle: currentData.fontStyle, backgroundColor: backColor,
                fontColor: foreColor, borderColor: borderRGB, thickness: currentData.thickness, fontSize: currentData.fontSize, rotation: 0,
                isReadOnly: currentData.isReadOnly ? currentData.isReadOnly : false, isRequired: currentData.isRequired ? currentData.isRequired : false,
                textAlign: currentData.alignment, formFieldAnnotationType: currentData.type, zoomvalue: 1,
                maxLength: currentData.maxLength ? currentData.maxLength : 0, visibility: currentData.visibility,
                font: { isItalic: false, isBold: false, isStrikeout: false, isUnderline: false }
            };
            fieldProperties.radiobuttonItem.push(field);
        }
        else {
            fieldProperties.radiobuttonItem = [];
        }
        return fieldProperties;
    };
    /**
     * @private
     */
    // eslint-disable-next-line max-len
    FormDesigner.prototype.createAnnotationLayer = function (pageDiv, pageWidth, pageHeight, pageNumber, displayMode) {
        var canvas = this.pdfViewerBase.getElement('_annotationCanvas_' + pageNumber);
        if (canvas) {
            this.updateAnnotationCanvas(canvas, pageWidth, pageHeight, pageNumber);
            return canvas;
        }
        else {
            // eslint-disable-next-line max-len
            var annotationCanvas = createElement('canvas', { id: this.pdfViewer.element.id + '_annotationCanvas_' + pageNumber, className: 'e-pv-annotation-canvas' });
            this.updateAnnotationCanvas(annotationCanvas, pageWidth, pageHeight, pageNumber);
            pageDiv.appendChild(annotationCanvas);
            return annotationCanvas;
        }
    };
    /**
     * @private
    */
    FormDesigner.prototype.resizeAnnotations = function (width, height, pageNumber) {
        var canvas = this.pdfViewerBase.getElement('_annotationCanvas_' + pageNumber);
        if (canvas) {
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            this.pdfViewerBase.applyElementStyles(canvas, pageNumber);
        }
    };
    /**
     * @private
    */
    FormDesigner.prototype.getEventPageNumber = function (event) {
        var eventTarget = event.target;
        if (eventTarget.classList.contains('e-pv-hyperlink')) {
            eventTarget = eventTarget.parentElement;
        }
        else if (eventTarget.parentElement.classList.contains('foreign-object') || (eventTarget.parentElement.classList.contains('e-pv-radiobtn-container'))) {
            eventTarget = eventTarget.closest('.e-pv-text-layer');
        }
        // eslint-disable-next-line
        var pageString = eventTarget.id.split('_text_')[1] || eventTarget.id.split('_textLayer_')[1] || eventTarget.id.split('_annotationCanvas_')[1] || eventTarget.id.split('_pageDiv_')[1];
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
    FormDesigner.prototype.getPropertyPanelHeaderContent = function (formFieldType) {
        switch (formFieldType) {
            case 'Textbox':
                return this.pdfViewer.localeObj.getConstant('Textbox');
            case 'PasswordField':
                return this.pdfViewer.localeObj.getConstant('Password');
            case 'Checkbox':
                return this.pdfViewer.localeObj.getConstant('Check Box');
            case 'RadioButton':
                return this.pdfViewer.localeObj.getConstant('Radio Button');
            case 'DropdownList':
                return this.pdfViewer.localeObj.getConstant('Dropdown');
            case 'ListBox':
                return this.pdfViewer.localeObj.getConstant('List Box');
            case 'InitialField':
                return this.pdfViewer.localeObj.getConstant('Initial');
            case 'SignatureField':
                return this.pdfViewer.localeObj.getConstant('Signature');
        }
    };
    /**
     * @private
    */
    FormDesigner.prototype.createPropertiesWindow = function () {
        var _this = this;
        var elementID = this.pdfViewer.element.id;
        var propertyWinMinHeight;
        // eslint-disable-next-line max-len
        var dialogDiv = createElement('div', { id: elementID + '_properties_window', className: 'e-pv-properties-form-field-window' });
        var appearanceTab = this.createAppearanceTab();
        this.pdfViewerBase.pageContainer.appendChild(dialogDiv);
        if (this.pdfViewer.selectedItems.formFields[0].formFieldAnnotationType !== 'DropdownList' && this.pdfViewer.selectedItems.formFields[0].formFieldAnnotationType !== 'ListBox')
            propertyWinMinHeight = '430px';
        else
            propertyWinMinHeight = '505px';
        this.propertiesDialog = new Dialog({
            showCloseIcon: true, closeOnEscape: false, isModal: true, header: '<div class="e-pv-form-field-property-header"> ' + this.getPropertyPanelHeaderContent(this.pdfViewer.selectedItems.formFields[0].formFieldAnnotationType) + ' ' + this.pdfViewer.localeObj.getConstant('Properties') + '</div>',
            minHeight: propertyWinMinHeight, target: this.pdfViewer.element, content: appearanceTab, beforeOpen: function () {
                _this.isPropertyDialogOpen = true;
            }, allowDragging: true, close: function () {
                _this.destroyPropertiesWindow();
                _this.isPropertyDialogOpen = false;
            }
        });
        if (!Browser.isDevice || this.pdfViewer.enableDesktopMode) {
            this.propertiesDialog.buttons = [
                // eslint-disable-next-line max-len
                { buttonModel: { content: this.pdfViewer.localeObj.getConstant('Cancel') }, click: this.onCancelClicked.bind(this) },
                { buttonModel: { content: this.pdfViewer.localeObj.getConstant('OK'), isPrimary: true }, click: this.onOkClicked.bind(this) }
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
        var propertySpliterBottom = createElement('div');
        propertySpliterBottom.className = 'e-pv-properties-bottom-spliter';
        dialogDiv.appendChild(propertySpliterBottom);
        this.propertiesDialog.appendTo(dialogDiv);
    };
    FormDesigner.prototype.onOkClicked = function (args) {
        var selectedItem = this.pdfViewer.selectedItems.formFields[0];
        var clonedItem = cloneObject(selectedItem);
        if (selectedItem) {
            switch (selectedItem.formFieldAnnotationType) {
                case 'Textbox':
                case 'PasswordField':
                    if (this.formFieldMultiline && this.formFieldMultiline.checked && selectedItem.formFieldAnnotationType === 'Textbox' && this.multilineCheckboxCheckedState) {
                        this.renderMultilineText(selectedItem);
                    }
                    else if (selectedItem.formFieldAnnotationType === 'Textbox' && this.multilineCheckboxCheckedState) {
                        this.renderTextbox(selectedItem);
                    }
                    if (selectedItem.formFieldAnnotationType === 'PasswordField') {
                        this.updateTextboxFormDesignerProperties(selectedItem);
                    }
                    if (selectedItem.formFieldAnnotationType === 'Textbox') {
                        var textboxCollection = this.checkTextboxName(selectedItem);
                        if (textboxCollection && textboxCollection.length > 0) {
                            for (var i = 0; i < textboxCollection.length; i++) {
                                var item = textboxCollection[i];
                                if (item.id === selectedItem.id) {
                                    if (selectedItem.isMultiline) {
                                        this.renderMultilineText(item);
                                    }
                                    else {
                                        this.renderTextbox(item);
                                    }
                                    document.getElementById(item.id + "_content_html_element") ? this.updateTextboxFormDesignerProperties(item) : this.updateFormFieldPropertiesInCollections(item);
                                }
                            }
                        }
                    }
                    this.multilineCheckboxCheckedState = false;
                    var point = cornersPointsBeforeRotation(selectedItem.wrapper.children[0]).topLeft;
                    this.updateFormDesignerFieldInSessionStorage(point, selectedItem.wrapper.children[0], selectedItem.formFieldAnnotationType, selectedItem);
                    break;
                case 'Checkbox':
                    this.updateCheckboxFormDesignerProperties(selectedItem, false);
                    var point1 = cornersPointsBeforeRotation(selectedItem.wrapper.children[0]).topLeft;
                    this.updateFormDesignerFieldInSessionStorage(point1, selectedItem.wrapper.children[0], selectedItem.formFieldAnnotationType, selectedItem);
                    break;
                case 'RadioButton':
                    this.updateRadioButtonDesignerProperties(selectedItem, false);
                    var point2 = cornersPointsBeforeRotation(selectedItem.wrapper.children[0]).topLeft;
                    this.updateFormDesignerFieldInSessionStorage(point2, selectedItem.wrapper.children[0], selectedItem.formFieldAnnotationType, selectedItem);
                    break;
                case 'SignatureField':
                case 'InitialField':
                    this.updateSignatureTextboxProperties(selectedItem);
                    var point3 = cornersPointsBeforeRotation(selectedItem.wrapper.children[0]).topLeft;
                    this.updateFormDesignerFieldInSessionStorage(point3, selectedItem.wrapper.children[0], selectedItem.formFieldAnnotationType, selectedItem);
                    break;
                case 'DropdownList':
                    this.updateDropdownFormDesignerProperties(selectedItem);
                    var point4 = cornersPointsBeforeRotation(selectedItem.wrapper.children[0]).topLeft;
                    this.updateFormDesignerFieldInSessionStorage(point4, selectedItem.wrapper.children[0], selectedItem.formFieldAnnotationType, selectedItem);
                    break;
                case 'ListBox':
                    this.updateListBoxFormDesignerProperties(selectedItem);
                    var point5 = cornersPointsBeforeRotation(selectedItem.wrapper.children[0]).topLeft;
                    this.updateFormDesignerFieldInSessionStorage(point5, selectedItem.wrapper.children[0], selectedItem.formFieldAnnotationType, selectedItem);
                    break;
            }
            this.updateFormFieldCollections(selectedItem);
            var cloneChangedNode = cloneObject(selectedItem);
            if (this.pdfViewer.annotation) {
                this.pdfViewer.annotation.addAction(this.pdfViewerBase.currentPageNumber, null, selectedItem, 'FormDesigner Properties Change', '', clonedItem, cloneChangedNode);
            }
        }
        this.propertiesDialog.hide();
    };
    /**
     * Update the form fields properties to the collection while rendering the page
    */
    FormDesigner.prototype.updateFormFieldPropertiesInCollections = function (item) {
        var formFieldCollection = this.pdfViewer.formFieldCollections;
        for (var i = 0; i < formFieldCollection.length; i++) {
            var currentData = formFieldCollection[i];
            if (currentData.id === item.id && currentData.name === item.name) {
                this.formFieldName && this.formFieldName.value ? currentData.name = this.formFieldName.value : null;
                this.formFieldValue && (item.value !== this.formFieldValue.value) ? currentData.value = this.formFieldValue.value : null;
                this.formFieldAlign && (item.alignment !== this.formFieldAlign) ? currentData.alignment = this.formFieldAlign : null;
                this.formFieldPrinting && (item.isPrint !== this.formFieldPrinting.checked) ? currentData.isPrint = this.formFieldPrinting.checked : null;
                this.formFieldTooltip && (item.tooltip !== this.formFieldTooltip.value) ? currentData.tooltip = this.formFieldTooltip.value : null;
                this.formFieldVisibility && (item.visibility !== this.formFieldVisibility.value) ? currentData.visibility = this.formFieldVisibility : null;
                this.formFieldFontFamily && this.formFieldFontFamily.value ? currentData.fontFamily = this.formFieldFontFamily.value : null;
                this.formFieldFontSize && this.formFieldFontSize.value ? currentData.fontSize = parseInt(this.formFieldFontSize.value.toString()) : null;
                this.fontColorValue && (item.color !== this.fontColorValue) ? currentData.color = this.fontColorValue : null;
                this.backgroundColorValue && (item.backgroundColor !== this.backgroundColorValue) ? currentData.backgroundColor = this.backgroundColorValue : null;
                this.borderColorValue && (item.borderColor !== this.borderColorValue) ? currentData.borderColor = this.borderColorValue : null;
                this.formFieldBorderWidth && item.thickness !== parseInt(this.formFieldBorderWidth) ? currentData.thickness = parseInt(this.formFieldBorderWidth) : null;
                this.formFieldReadOnly && (item.isReadonly !== this.formFieldReadOnly.checked) ? currentData.isReadOnly = this.formFieldReadOnly.checked : null;
                this.formFieldRequired && (item.isRequired !== this.formFieldRequired.checked) ? currentData.isRequired = this.formFieldRequired.checked : null;
                i !== 0 && i < this.pdfViewer.formFieldCollection.length ? currentData.fontStyle = this.pdfViewer.formFieldCollection[i - 1].fontStyle : currentData.fontStyle = this.pdfViewer.formFieldCollection[i + 1].fontStyle;
                var formFieldIndex = this.pdfViewer.formFieldCollections.findIndex(function (el) { return el.id === item.id; });
                this.pdfViewer.formFieldCollections[formFieldIndex] = currentData;
            }
        }
    };
    FormDesigner.prototype.checkTextboxName = function (selectedItem) {
        var textboxObjectCollection = [];
        for (var i = 0; i < this.pdfViewer.formFieldCollection.length; i++) {
            var item = this.pdfViewer.formFieldCollection[i];
            if (item.name === selectedItem.name && item.formFieldAnnotationType === 'Textbox') {
                textboxObjectCollection.push(item);
            }
        }
        return textboxObjectCollection;
    };
    FormDesigner.prototype.renderMultilineText = function (selectedItem, isUndoRedo) {
        if (isUndoRedo) {
            this.reRenderMultilineTextbox(selectedItem, "e-pv-formfield-input");
        }
        else {
            this.addMultilineTextbox(selectedItem, "e-pv-formfield-input", true);
        }
    };
    FormDesigner.prototype.renderTextbox = function (selectedItem, isUndoRedo) {
        if (isUndoRedo) {
            this.reRenderMultilineTextbox(selectedItem, "e-pv-formfield-textarea");
        }
        else {
            this.addMultilineTextbox(selectedItem, "e-pv-formfield-textarea", false);
        }
    };
    FormDesigner.prototype.addMultilineTextbox = function (selectedItem, className, isMultiline) {
        var wrapperElement = selectedItem.wrapper.children[0];
        selectedItem.isMultiline = isMultiline;
        if (document.getElementById(wrapperElement.id + '_html_element')) {
            var htmlElement = document.getElementById(wrapperElement.id + '_html_element').children[0];
            var textAreaId = htmlElement.children[0].id;
            document.getElementById(htmlElement.children[0].id).remove();
            if (className.indexOf("e-pv-formfield-textarea") !== -1) {
                var inputElement = this.createTextboxElement(textAreaId);
                wrapperElement.template = htmlElement.appendChild(inputElement);
            }
            else {
                var textArea = this.createTextAreaElement(textAreaId);
                wrapperElement.template = htmlElement.appendChild(textArea);
            }
            var index = this.getFormFiledIndex(selectedItem.id.split('_')[0]);
            this.pdfViewerBase.formFieldCollection[index].FormField.isMultiline = selectedItem.isMultiline;
            this.pdfViewer.nameTable[selectedItem.id.split('_')[0]].isMultiline = selectedItem.isMultiline;
        }
    };
    FormDesigner.prototype.reRenderMultilineTextbox = function (selectedItem, className) {
        var wrapperElement = document.getElementById(selectedItem.id + "_content_html_element");
        if (wrapperElement) {
            var textareaElement = wrapperElement.firstElementChild.firstElementChild;
            var textareaId = textareaElement.id;
            textareaElement.remove();
            if (className.indexOf('e-pv-formfield-textarea') !== -1) {
                var textboxElement = this.createTextboxElement(textareaId);
                wrapperElement.firstElementChild.appendChild(textboxElement);
            }
            else {
                var textboxElement = this.createTextAreaElement(textareaId);
                wrapperElement.firstElementChild.appendChild(textboxElement);
            }
        }
    };
    FormDesigner.prototype.createTextAreaElement = function (id) {
        var textArea = createElement('textarea');
        textArea.id = id;
        textArea.className = 'e-pv-formfield-textarea';
        textArea.style.width = '100%';
        textArea.style.height = '100%';
        textArea.style.borderStyle = "solid";
        textArea.addEventListener('click', this.inputElementClick.bind(this));
        textArea.addEventListener('change', this.getTextboxValue.bind(this));
        return textArea;
    };
    FormDesigner.prototype.createTextboxElement = function (id) {
        var inputElement = createElement('input');
        inputElement.id = id;
        inputElement.type = "text";
        inputElement.className = "e-pv-formfield-input";
        inputElement.autocomplete = "off";
        inputElement.style.width = '100%';
        inputElement.style.height = '100%';
        inputElement.style.position = "absolute";
        inputElement.style.borderStyle = "solid";
        inputElement.addEventListener('click', this.inputElementClick.bind(this));
        inputElement.addEventListener('change', this.getTextboxValue.bind(this));
        inputElement.addEventListener('focus', this.focusFormFields.bind(this));
        inputElement.addEventListener('blur', this.blurFormFields.bind(this));
        return inputElement;
    };
    /**
     * @private
     */
    FormDesigner.prototype.updateFormFieldCollections = function (formFieldObject) {
        var formField = {
            id: formFieldObject.id.split('_')[0], name: formFieldObject.name, value: formFieldObject.value,
            type: formFieldObject.type ? formFieldObject.type : formFieldObject.formFieldAnnotationType, isReadOnly: formFieldObject.isReadonly, fontFamily: formFieldObject.fontFamily, isMultiline: formFieldObject.isMultiline,
            fontSize: formFieldObject.fontSize, fontStyle: formFieldObject.fontStyle, color: formFieldObject.color ? formFieldObject.color : this.getRgbToHex(formFieldObject.fontColor), backgroundColor: typeof formFieldObject.backgroundColor === 'string' ? formFieldObject.backgroundColor : this.getRgbToHex(formFieldObject.backgroundColor),
            alignment: formFieldObject.alignment ? formFieldObject.alignment : formFieldObject.textAlign, visibility: formFieldObject.visibility, maxLength: formFieldObject.maxLength, isRequired: formFieldObject.isRequired,
            isPrint: formFieldObject.isPrint, isSelected: formFieldObject.isSelected, isChecked: formFieldObject.isChecked, tooltip: formFieldObject.tooltip, bounds: formFieldObject.bounds ? formFieldObject.bounds : formFieldObject.lineBound, thickness: formFieldObject.thickness, borderColor: typeof formFieldObject.borderColor === 'string' ? formFieldObject.borderColor : this.getRgbToHex(formFieldObject.borderColor), pageIndex: !isNullOrUndefined(formFieldObject.pageNumber) ? formFieldObject.pageNumber - 1 : formFieldObject.pageIndex
        };
        this.pdfViewer.formFieldCollections[this.pdfViewer.formFieldCollections.findIndex(function (el) { return el.id === formField.id; })] = formField;
    };
    /**
    * Get the Hex value from the RGB value.
    */
    FormDesigner.prototype.getRgbToHex = function (color) {
        return ('#' + this.hex(color.r) + this.hex(color.g) + this.hex(color.b));
    };
    /**
     * @private
     */
    FormDesigner.prototype.updateDropdownFormDesignerProperties = function (selectedItem, isUndoRedo) {
        var dropdownElement = document.getElementById(selectedItem.id + "_content_html_element").firstElementChild.firstElementChild;
        if (this.pdfViewer.designerMode || isUndoRedo) {
            var data = this.pdfViewerBase.getItemFromSessionStorage('_formDesigner');
            var formFieldsData = JSON.parse(data);
            var index_1 = this.getFormFiledIndex(selectedItem.id.split('_')[0]);
            selectedItem.options = this.createDropdownDataSource(selectedItem);
            this.updateDropDownListDataSource(selectedItem, dropdownElement);
            selectedItem.selectedIndex = [];
            if (index_1 > -1) {
                formFieldsData[index_1].FormField.option = selectedItem.options;
                this.pdfViewerBase.formFieldCollection[index_1].FormField.option = selectedItem.options;
                if (!isNullOrUndefined(selectedItem.options) && selectedItem.options.length > 0) {
                    formFieldsData[index_1] && formFieldsData[index_1].FormField.value ? selectedItem.selectedIndex.push(selectedItem.options.findIndex(function (x) { return x.itemValue === formFieldsData[index_1].FormField.value; })) : selectedItem.selectedIndex.push(0);
                }
            }
            this.pdfViewer.nameTable[selectedItem.id.split('_')[0]].options = selectedItem.options;
            if ((this.formFieldName && this.formFieldName.value) || isUndoRedo) {
                this.updateNamePropertyChange(selectedItem, dropdownElement, isUndoRedo, index_1, formFieldsData);
            }
            if (this.formFieldValue && formFieldsData[index_1] && formFieldsData[index_1].FormField.value || isUndoRedo) {
                this.updateValuePropertyChange(selectedItem, dropdownElement, isUndoRedo, index_1, formFieldsData);
            }
            if (this.formFieldPrinting || isUndoRedo) {
                this.updateIsPrintPropertyChange(selectedItem, isUndoRedo, index_1, formFieldsData);
            }
            if ((this.formFieldTooltip) || isUndoRedo) {
                this.updateTooltipPropertyChange(selectedItem, dropdownElement, isUndoRedo, index_1, formFieldsData);
            }
            if (this.formFieldVisibility || isUndoRedo) {
                this.updateVisibilityPropertyChange(selectedItem, dropdownElement, isUndoRedo, index_1, formFieldsData);
            }
            if ((this.formFieldFontFamily && this.formFieldFontFamily.value) || isUndoRedo) {
                this.updateFontFamilyPropertyChange(selectedItem, dropdownElement, isUndoRedo, index_1, formFieldsData);
            }
            if ((this.formFieldFontSize && this.formFieldFontSize.value) || isUndoRedo) {
                this.updateFontSizePropertyChange(selectedItem, dropdownElement, isUndoRedo, index_1, formFieldsData);
            }
            this.updateFontStylePropertyChange(selectedItem, dropdownElement, isUndoRedo, index_1, formFieldsData);
            if (this.formFieldAlign || isUndoRedo) {
                this.updateAlignmentPropertyChange(selectedItem, dropdownElement, isUndoRedo, index_1, formFieldsData);
            }
            if (this.fontColorValue || isUndoRedo) {
                this.updateColorPropertyChange(selectedItem, dropdownElement, isUndoRedo, index_1, formFieldsData);
            }
            if (this.backgroundColorValue || isUndoRedo) {
                this.updateBackgroundColorPropertyChange(selectedItem, dropdownElement, isUndoRedo, index_1, formFieldsData);
            }
            if (this.borderColorValue || isUndoRedo) {
                this.updateBorderColorPropertyChange(selectedItem, dropdownElement, isUndoRedo, index_1, formFieldsData);
            }
            if (!isNullOrUndefined(this.formFieldBorderWidth) || isUndoRedo) {
                this.updateBorderThicknessPropertyChange(selectedItem, dropdownElement, isUndoRedo, index_1, formFieldsData);
            }
            if (this.formFieldReadOnly || isUndoRedo) {
                this.updateIsReadOnlyPropertyChange(selectedItem, dropdownElement, isUndoRedo, index_1, formFieldsData);
            }
            if (this.formFieldRequired || isUndoRedo) {
                this.updateIsRequiredPropertyChange(selectedItem, dropdownElement, isUndoRedo, index_1, formFieldsData);
            }
        }
        if (isUndoRedo)
            this.pdfViewerBase.setItemInSessionStorage(this.pdfViewerBase.formFieldCollection, '_formDesigner');
    };
    /**
     * @private
     */
    FormDesigner.prototype.updateListBoxFormDesignerProperties = function (selectedItem, isUndoRedo) {
        var dropdownElement = document.getElementById(selectedItem.id + "_content_html_element").firstElementChild.firstElementChild;
        if (this.pdfViewer.designerMode || isUndoRedo) {
            var data = this.pdfViewerBase.getItemFromSessionStorage('_formDesigner');
            var formFieldsData = JSON.parse(data);
            var index_2 = this.getFormFiledIndex(selectedItem.id.split('_')[0]);
            selectedItem.options = this.createDropdownDataSource(selectedItem);
            this.updateDropDownListDataSource(selectedItem, dropdownElement);
            selectedItem.selectedIndex = [];
            if (index_2 > -1) {
                formFieldsData[index_2].FormField.option = selectedItem.options;
                this.pdfViewerBase.formFieldCollection[index_2].FormField.option = selectedItem.options;
                if (!isNullOrUndefined(selectedItem.options) && selectedItem.options.length > 0) {
                    formFieldsData[index_2] && formFieldsData[index_2].FormField.value ? selectedItem.selectedIndex.push(selectedItem.options.findIndex(function (x) { return x.itemValue === formFieldsData[index_2].FormField.value; })) : selectedItem.selectedIndex.push(0);
                }
            }
            this.pdfViewer.nameTable[selectedItem.id.split('_')[0]].options = selectedItem.options;
            if ((this.formFieldName && this.formFieldName.value) || isUndoRedo) {
                this.updateNamePropertyChange(selectedItem, dropdownElement, isUndoRedo, index_2, formFieldsData);
            }
            if (this.formFieldPrinting || isUndoRedo) {
                this.updateIsPrintPropertyChange(selectedItem, isUndoRedo, index_2, formFieldsData);
            }
            if ((this.formFieldTooltip) || isUndoRedo) {
                this.updateTooltipPropertyChange(selectedItem, dropdownElement, isUndoRedo, index_2, formFieldsData);
            }
            if (this.formFieldVisibility || isUndoRedo) {
                this.updateVisibilityPropertyChange(selectedItem, dropdownElement, isUndoRedo, index_2, formFieldsData);
            }
            if ((this.formFieldFontFamily && this.formFieldFontFamily.value) || isUndoRedo) {
                this.updateFontFamilyPropertyChange(selectedItem, dropdownElement, isUndoRedo, index_2, formFieldsData);
            }
            if ((this.formFieldFontSize && this.formFieldFontSize.value) || isUndoRedo) {
                this.updateFontSizePropertyChange(selectedItem, dropdownElement, isUndoRedo, index_2, formFieldsData);
            }
            this.updateFontStylePropertyChange(selectedItem, dropdownElement, isUndoRedo, index_2, formFieldsData);
            if (this.formFieldAlign || isUndoRedo) {
                this.updateAlignmentPropertyChange(selectedItem, dropdownElement, isUndoRedo, index_2, formFieldsData);
            }
            if (this.fontColorValue || isUndoRedo) {
                this.updateColorPropertyChange(selectedItem, dropdownElement, isUndoRedo, index_2, formFieldsData);
            }
            if (this.backgroundColorValue || isUndoRedo) {
                this.updateBackgroundColorPropertyChange(selectedItem, dropdownElement, isUndoRedo, index_2, formFieldsData);
            }
            if (this.borderColorValue || isUndoRedo) {
                this.updateBorderColorPropertyChange(selectedItem, dropdownElement, isUndoRedo, index_2, formFieldsData);
            }
            if (!isNullOrUndefined(this.formFieldBorderWidth) || isUndoRedo) {
                this.updateBorderThicknessPropertyChange(selectedItem, dropdownElement, isUndoRedo, index_2, formFieldsData);
            }
            if (this.formFieldReadOnly || isUndoRedo) {
                this.updateIsReadOnlyPropertyChange(selectedItem, dropdownElement, isUndoRedo, index_2, formFieldsData);
            }
            if (this.formFieldRequired || isUndoRedo) {
                this.updateIsRequiredPropertyChange(selectedItem, dropdownElement, isUndoRedo, index_2, formFieldsData);
            }
        }
        if (isUndoRedo)
            this.pdfViewerBase.setItemInSessionStorage(this.pdfViewerBase.formFieldCollection, '_formDesigner');
    };
    FormDesigner.prototype.updateDropDownListDataSource = function (selectedItem, dropdownElement) {
        while (dropdownElement.firstChild) {
            dropdownElement.firstChild.remove();
        }
        for (var j = 0; j < selectedItem.options.length; j++) {
            var option = document.createElement("option");
            option.className = "e-pv-formfield-dropdown";
            option.value = selectedItem.options[j].itemValue;
            option.text = selectedItem.options[j].itemName;
            dropdownElement.appendChild(option);
        }
    };
    FormDesigner.prototype.createDropdownDataSource = function (selectedItem) {
        var ulItem = document.getElementById(this.pdfViewer.element.id + '_ul_list_item');
        this.formFieldListItemDataSource = [];
        if (ulItem && ulItem.children && ulItem.children.length > 0) {
            for (var i = 0; i < ulItem.children.length; i++) {
                var liItem = ulItem.children[i];
                this.formFieldListItemDataSource.push({ itemName: liItem.innerHTML, itemValue: liItem.innerHTML });
            }
        }
        else if (selectedItem && selectedItem.options.length > 0) {
            this.formFieldListItemDataSource = selectedItem.options;
        }
        return this.formFieldListItemDataSource;
    };
    /**
     * @private
     */
    FormDesigner.prototype.updateSignatureTextboxProperties = function (selectedItem, isUndoRedo) {
        var inputElement = document.getElementById(selectedItem.id + "_content_html_element").firstElementChild.firstElementChild;
        var data = this.pdfViewerBase.getItemFromSessionStorage('_formDesigner');
        var formFieldsData = JSON.parse(data);
        var index = this.getFormFiledIndex(selectedItem.id.split('_')[0]);
        if (this.pdfViewer.designerMode || isUndoRedo) {
            if ((this.formFieldName && this.formFieldName.value) || isUndoRedo) {
                this.updateNamePropertyChange(selectedItem, inputElement, isUndoRedo, index, formFieldsData);
            }
            if (this.formFieldPrinting || isUndoRedo) {
                this.updateIsPrintPropertyChange(selectedItem, isUndoRedo, index, formFieldsData);
            }
            if ((this.formFieldTooltip) || isUndoRedo) {
                this.updateTooltipPropertyChange(selectedItem, inputElement, isUndoRedo, index, formFieldsData);
            }
            if (!isNullOrUndefined(this.formFieldBorderWidth) || isUndoRedo) {
                this.updateBorderThicknessPropertyChange(selectedItem, inputElement, isUndoRedo, index, formFieldsData);
            }
            if (this.formFieldVisibility || isUndoRedo) {
                this.updateVisibilityPropertyChange(selectedItem, inputElement, isUndoRedo, index, formFieldsData);
            }
            if (this.formFieldReadOnly || isUndoRedo) {
                this.updateIsReadOnlyPropertyChange(selectedItem, inputElement, isUndoRedo, index, formFieldsData);
            }
            if (this.formFieldRequired || isUndoRedo) {
                this.updateIsRequiredPropertyChange(selectedItem, inputElement, isUndoRedo, index, formFieldsData);
            }
        }
        if (isUndoRedo)
            this.pdfViewerBase.setItemInSessionStorage(this.pdfViewerBase.formFieldCollection, '_formDesigner');
    };
    /**
     * @private
     */
    FormDesigner.prototype.updateCheckboxFormDesignerProperties = function (selectedItem, updateValue, isUndoRedo) {
        var checkBoxElement = document.getElementById(selectedItem.id + "_content_html_element").firstElementChild.firstElementChild.lastElementChild;
        var data = this.pdfViewerBase.getItemFromSessionStorage('_formDesigner');
        var formFieldsData = JSON.parse(data);
        var index = this.getFormFiledIndex(selectedItem.id.split('_')[0]);
        if ((this.formFieldName && this.formFieldName.value) || isUndoRedo) {
            this.updateNamePropertyChange(selectedItem, checkBoxElement, isUndoRedo, index, formFieldsData);
        }
        if (this.formFieldValue || isUndoRedo) {
            this.updateValuePropertyChange(selectedItem, checkBoxElement, isUndoRedo, index, formFieldsData, updateValue);
        }
        if (this.backgroundColorValue || isUndoRedo) {
            this.updateBackgroundColorPropertyChange(selectedItem, checkBoxElement, isUndoRedo, index, formFieldsData);
        }
        if (this.borderColorValue || isUndoRedo) {
            this.updateBorderColorPropertyChange(selectedItem, checkBoxElement, isUndoRedo, index, formFieldsData);
        }
        if (!isNullOrUndefined(this.formFieldBorderWidth) || isUndoRedo) {
            this.updateBorderThicknessPropertyChange(selectedItem, checkBoxElement, isUndoRedo, index, formFieldsData);
        }
        if (this.formFieldChecked) {
            this.checkboxCheckedState = this.formFieldChecked.checked;
        }
        if (this.formFieldPrinting || isUndoRedo) {
            this.updateIsPrintPropertyChange(selectedItem, isUndoRedo, index, formFieldsData);
        }
        if ((this.formFieldTooltip) || isUndoRedo) {
            this.updateTooltipPropertyChange(selectedItem, checkBoxElement, isUndoRedo, index, formFieldsData);
        }
        if (this.formFieldVisibility || isUndoRedo) {
            this.updateVisibilityPropertyChange(selectedItem, checkBoxElement, isUndoRedo, index, formFieldsData);
        }
        if (this.checkboxCheckedState != undefined || isUndoRedo) {
            this.updateIsCheckedPropertyChange(selectedItem, checkBoxElement, isUndoRedo, index, formFieldsData);
        }
        if ((this.pdfViewer.designerMode && this.borderColorValue) || isUndoRedo) {
            this.updateBorderColorPropertyChange(selectedItem, checkBoxElement, isUndoRedo, index, formFieldsData);
        }
        if ((this.pdfViewer.designerMode && this.formFieldBorderWidth) || isUndoRedo) {
            this.updateBorderThicknessPropertyChange(selectedItem, checkBoxElement, isUndoRedo, index, formFieldsData);
        }
        if (this.formFieldReadOnly || isUndoRedo) {
            this.updateIsReadOnlyPropertyChange(selectedItem, checkBoxElement, isUndoRedo, index, formFieldsData);
        }
        if (this.formFieldRequired || isUndoRedo) {
            this.updateIsRequiredPropertyChange(selectedItem, checkBoxElement, isUndoRedo, index, formFieldsData);
        }
        if (isUndoRedo)
            this.pdfViewerBase.setItemInSessionStorage(this.pdfViewerBase.formFieldCollection, '_formDesigner');
    };
    /**
     * @private
     */
    FormDesigner.prototype.updateRadioButtonDesignerProperties = function (selectedItem, updateValue, isUndoRedo) {
        var radioButton = document.getElementById(selectedItem.id + "_content_html_element").firstElementChild.firstElementChild.firstElementChild;
        var data = this.pdfViewerBase.getItemFromSessionStorage('_formDesigner');
        var formFieldsData = JSON.parse(data);
        var index = this.getFormFiledIndex(selectedItem.id.split('_')[0]);
        if ((this.formFieldName && this.formFieldName.value) || isUndoRedo) {
            this.updateNamePropertyChange(selectedItem, radioButton, isUndoRedo, index, formFieldsData);
        }
        if (this.formFieldValue || isUndoRedo) {
            this.updateValuePropertyChange(selectedItem, radioButton, isUndoRedo, index, formFieldsData, updateValue);
        }
        if (this.formFieldChecked) {
            this.checkboxCheckedState = this.formFieldChecked.checked;
        }
        if (this.formFieldPrinting || isUndoRedo) {
            this.updateIsPrintPropertyChange(selectedItem, isUndoRedo, index, formFieldsData);
        }
        if ((this.formFieldTooltip) || isUndoRedo) {
            this.updateTooltipPropertyChange(selectedItem, radioButton, isUndoRedo, index, formFieldsData);
        }
        if (this.formFieldVisibility || isUndoRedo) {
            this.updateVisibilityPropertyChange(selectedItem, radioButton, isUndoRedo, index, formFieldsData);
        }
        if ((this.pdfViewer.designerMode && !isNullOrUndefined(this.formFieldBorderWidth)) || isUndoRedo) {
            this.updateBorderThicknessPropertyChange(selectedItem, radioButton, isUndoRedo, index, formFieldsData);
        }
        if (this.backgroundColorValue || isUndoRedo) {
            this.updateBackgroundColorPropertyChange(selectedItem, radioButton, isUndoRedo, index, formFieldsData);
        }
        if (this.borderColorValue || isUndoRedo) {
            this.updateBorderColorPropertyChange(selectedItem, radioButton, isUndoRedo, index, formFieldsData);
        }
        if (this.checkboxCheckedState != undefined || isUndoRedo) {
            this.updateIsSelectedPropertyChange(selectedItem, radioButton, isUndoRedo, index, formFieldsData);
        }
        if (this.formFieldReadOnly || isUndoRedo) {
            this.updateIsReadOnlyPropertyChange(selectedItem, radioButton, isUndoRedo, index, formFieldsData);
        }
        if (this.formFieldRequired || isUndoRedo) {
            this.updateIsRequiredPropertyChange(selectedItem, radioButton, isUndoRedo, index, formFieldsData);
        }
        if (isUndoRedo) {
            var formField = this.pdfViewer.nameTable[selectedItem.id.split('_')[0]];
            var point2 = cornersPointsBeforeRotation(formField.wrapper.children[0]).topLeft;
            this.updateFormDesignerFieldInSessionStorage(point2, formField.wrapper.children[0], formField.formFieldAnnotationType, formField);
        }
    };
    /**
     * @private
     */
    FormDesigner.prototype.updateTextboxFormDesignerProperties = function (selectedItem, isUndoRedo) {
        var inputElement = document.getElementById(selectedItem.id + "_content_html_element").firstElementChild.firstElementChild;
        var isMaxLengthChanged = false;
        var oldValue, newValue;
        var data = this.pdfViewerBase.getItemFromSessionStorage('_formDesigner');
        var formFieldsData = JSON.parse(data);
        var index = this.getFormFiledIndex(selectedItem.id.split('_')[0]);
        if (this.pdfViewer.designerMode || isUndoRedo) {
            if ((this.formFieldName && this.formFieldName.value) || isUndoRedo) {
                this.updateNamePropertyChange(selectedItem, inputElement, isUndoRedo, index, formFieldsData);
            }
            if (this.formFieldValue || isUndoRedo) {
                this.updateValuePropertyChange(selectedItem, inputElement, isUndoRedo, index, formFieldsData);
            }
            if (this.formFieldPrinting || isUndoRedo) {
                this.updateIsPrintPropertyChange(selectedItem, isUndoRedo, index, formFieldsData);
            }
            if ((this.formFieldTooltip) || isUndoRedo) {
                this.updateTooltipPropertyChange(selectedItem, inputElement, isUndoRedo, index, formFieldsData);
            }
            if (this.formFieldVisibility || isUndoRedo) {
                this.updateVisibilityPropertyChange(selectedItem, inputElement, isUndoRedo, index, formFieldsData);
            }
            if ((this.formFieldFontFamily && this.formFieldFontFamily.value) || isUndoRedo) {
                this.updateFontFamilyPropertyChange(selectedItem, inputElement, isUndoRedo, index, formFieldsData);
            }
            if ((this.formFieldFontSize && this.formFieldFontSize.value) || isUndoRedo) {
                this.updateFontSizePropertyChange(selectedItem, inputElement, isUndoRedo, index, formFieldsData);
            }
            this.updateFontStylePropertyChange(selectedItem, inputElement, isUndoRedo, index, formFieldsData);
            if (this.formFieldAlign || isUndoRedo || this.multilineCheckboxCheckedState) {
                this.updateAlignmentPropertyChange(selectedItem, inputElement, isUndoRedo, index, formFieldsData);
            }
            if (this.maxLengthItem || isUndoRedo) {
                if (this.maxLengthItem && (selectedItem.maxLength !== this.maxLengthItem.value)) {
                    isMaxLengthChanged = true;
                    oldValue = selectedItem.maxLength;
                    newValue = this.maxLengthItem.value;
                }
                var maxLength = this.maxLengthItem.value === 0 ? 524288 : this.maxLengthItem.value;
                if (isUndoRedo && selectedItem.maxLength !== 0) {
                    inputElement.maxLength = selectedItem.maxLength;
                }
                else {
                    inputElement.maxLength = maxLength;
                    selectedItem.maxLength = this.maxLengthItem.value;
                }
                if (index > -1) {
                    formFieldsData[index].FormField.maxLength = selectedItem.maxLength;
                    this.pdfViewerBase.formFieldCollection[index].FormField.maxLength = selectedItem.maxLength;
                }
                this.pdfViewer.nameTable[selectedItem.id.split('_')[0]].maxLength = selectedItem.maxLength;
                if (isMaxLengthChanged) {
                    this.updateFormFieldPropertiesChanges("formFieldPropertiesChange", selectedItem, false, false, false, false, false, false, false, false, false, false, false, isMaxLengthChanged, false, false, false, oldValue, newValue);
                }
            }
            if (this.fontColorValue || isUndoRedo || this.multilineCheckboxCheckedState) {
                this.updateColorPropertyChange(selectedItem, inputElement, isUndoRedo, index, formFieldsData);
            }
            if (this.backgroundColorValue || isUndoRedo || this.multilineCheckboxCheckedState) {
                this.updateBackgroundColorPropertyChange(selectedItem, inputElement, isUndoRedo, index, formFieldsData);
            }
            if (this.borderColorValue || isUndoRedo || this.multilineCheckboxCheckedState) {
                this.updateBorderColorPropertyChange(selectedItem, inputElement, isUndoRedo, index, formFieldsData);
            }
            if (!isNullOrUndefined(this.formFieldBorderWidth) || isUndoRedo) {
                this.updateBorderThicknessPropertyChange(selectedItem, inputElement, isUndoRedo, index, formFieldsData);
            }
            if (this.formFieldReadOnly || isUndoRedo) {
                this.updateIsReadOnlyPropertyChange(selectedItem, inputElement, isUndoRedo, index, formFieldsData);
            }
            if (this.formFieldRequired || isUndoRedo) {
                this.updateIsRequiredPropertyChange(selectedItem, inputElement, isUndoRedo, index, formFieldsData);
            }
        }
        if (!this.pdfViewer.designerMode) {
            if (this.formFieldVisibility && this.formFieldVisibility.value) {
                selectedItem.visibility = this.formFieldVisibility.value;
                var visibleItem = document.getElementById(selectedItem.id + '_content_html_element').firstElementChild.firstElementChild;
                visibleItem.style.visibility = selectedItem.visibility;
            }
        }
        this.updateFormFieldCollections(selectedItem);
        if (isUndoRedo)
            this.pdfViewerBase.setItemInSessionStorage(this.pdfViewerBase.formFieldCollection, '_formDesigner');
    };
    /**
     * @private
     */
    FormDesigner.prototype.updateIsCheckedPropertyChange = function (selectedItem, element, isUndoRedo, index, formFieldsData) {
        if (this.pdfViewer.designerMode || isUndoRedo) {
            var isValueChanged = false;
            var oldValue = void 0, newValue = void 0;
            if (selectedItem.isChecked !== this.checkboxCheckedState) {
                isValueChanged = true;
                oldValue = selectedItem.isChecked;
                newValue = this.checkboxCheckedState;
            }
            if (!isUndoRedo) {
                selectedItem.isChecked = this.checkboxCheckedState;
            }
            if (index > -1) {
                formFieldsData[index].FormField.isChecked = selectedItem.isChecked;
                this.pdfViewerBase.formFieldCollection[index].FormField.isChecked = selectedItem.isChecked;
            }
            this.pdfViewer.nameTable[selectedItem.id.split('_')[0]].isChecked = selectedItem.isChecked;
            if (isValueChanged) {
                this.updateFormFieldPropertiesChanges("formFieldPropertiesChange", selectedItem, isValueChanged, false, false, false, false, false, false, false, false, false, false, false, false, false, false, oldValue, newValue);
            }
        }
        if (!this.pdfViewer.designerMode || isUndoRedo) {
            var checkboxElement = document.getElementById(selectedItem.id + "_input").firstElementChild;
            if (selectedItem.isChecked) {
                if (checkboxElement.classList.contains('e-pv-cb-unchecked'))
                    checkboxElement.classList.remove('e-pv-cb-unchecked');
                checkboxElement.classList.add("e-pv-cb-checked");
            }
            else {
                if (checkboxElement.classList.contains('e-pv-cb-checked'))
                    checkboxElement.classList.remove('e-pv-cb-checked');
                checkboxElement.classList.add("e-pv-cb-unchecked");
            }
        }
    };
    /**
    * @private
    */
    FormDesigner.prototype.updateIsSelectedPropertyChange = function (selectedItem, element, isUndoRedo, index, formFieldsData) {
        if (this.pdfViewer.designerMode || isUndoRedo) {
            var isValueChanged = false;
            var oldValue = void 0, newValue = void 0;
            if (selectedItem.isSelected !== this.checkboxCheckedState) {
                isValueChanged = true;
                oldValue = selectedItem.isSelected;
                newValue = this.checkboxCheckedState;
            }
            if (!isUndoRedo) {
                selectedItem.isSelected = this.checkboxCheckedState;
            }
            if (index > -1) {
                formFieldsData[index].FormField.isSelected = selectedItem.isSelected;
                this.pdfViewerBase.formFieldCollection[index].FormField.isSelected = selectedItem.isSelected;
                for (var i = 0; i < formFieldsData[index].FormField.radiobuttonItem.length; i++) {
                    if (formFieldsData[index].FormField.radiobuttonItem[i].id.split("_")[0] === selectedItem.id.split("_")[0]) {
                        formFieldsData[index].FormField.radiobuttonItem[i].isSelected = selectedItem.isSelected;
                        this.pdfViewerBase.formFieldCollection[index].FormField.radiobuttonItem[i].isSelected = selectedItem.isSelected;
                    }
                }
            }
            this.pdfViewer.nameTable[selectedItem.id.split('_')[0]].isSelected = selectedItem.isSelected;
            if (isValueChanged) {
                this.updateFormFieldPropertiesChanges("formFieldPropertiesChange", selectedItem, isValueChanged, false, false, false, false, false, false, false, false, false, false, false, false, false, false, oldValue, newValue);
            }
        }
        if (!this.pdfViewer.designerMode || isUndoRedo) {
            element.checked = selectedItem.isSelected;
            if (index > -1) {
                formFieldsData[index].FormField.isSelected = selectedItem.isSelected;
                this.pdfViewerBase.formFieldCollection[index].FormField.isSelected = selectedItem.isSelected;
                for (var i = 0; i < formFieldsData[index].FormField.radiobuttonItem.length; i++) {
                    if (formFieldsData[index].FormField.radiobuttonItem[i].id.split("_")[0] === selectedItem.id.split("_")[0]) {
                        formFieldsData[index].FormField.radiobuttonItem[i].isSelected = selectedItem.isSelected;
                        this.pdfViewerBase.formFieldCollection[index].FormField.radiobuttonItem[i].isSelected = selectedItem.isSelected;
                    }
                }
            }
            this.pdfViewerBase.setItemInSessionStorage(this.pdfViewerBase.formFieldCollection, '_formDesigner');
            this.pdfViewer.nameTable[selectedItem.id.split('_')[0]].isSelected = selectedItem.isSelected;
        }
    };
    /**
     * @private
     */
    FormDesigner.prototype.updateValuePropertyChange = function (selectedItem, element, isUndoRedo, index, formFieldsData, updateValue) {
        var isValueChanged = false;
        var oldValue, newValue;
        if (selectedItem.formFieldAnnotationType !== "DropdownList" && this.formFieldValue && (selectedItem.value !== this.formFieldValue.value)) {
            isValueChanged = true;
            oldValue = selectedItem.value;
            newValue = this.formFieldValue.value;
        }
        else if (selectedItem.formFieldAnnotationType === "DropdownList" && this.formFieldValue && (selectedItem.value !== formFieldsData[index].FormField.value)) {
            isValueChanged = true;
            oldValue = selectedItem.value;
            newValue = formFieldsData[index].FormField.value;
        }
        if (isUndoRedo) {
            element.value = selectedItem.value;
        }
        else {
            if (updateValue) {
                isValueChanged = false;
            }
            else {
                selectedItem.formFieldAnnotationType === "DropdownList" ? selectedItem.value = formFieldsData[index].FormField.value : selectedItem.value = this.formFieldValue.value;
                selectedItem.formFieldAnnotationType === "DropdownList" ? element.value = formFieldsData[index].FormField.value : element.value = this.formFieldValue.value;
            }
        }
        if (index > -1) {
            formFieldsData[index].FormField.value = selectedItem.value;
            this.pdfViewerBase.formFieldCollection[index].FormField.value = selectedItem.value;
        }
        this.pdfViewer.nameTable[selectedItem.id.split('_')[0]].value = selectedItem.value;
        if (isValueChanged) {
            this.updateFormFieldPropertiesChanges("formFieldPropertiesChange", selectedItem, isValueChanged, false, false, false, false, false, false, false, false, false, false, false, false, false, false, oldValue, newValue);
        }
    };
    FormDesigner.prototype.updateFontStylePropertyChange = function (selectedItem, element, isUndoRedo, index, formFieldsData) {
        var isFontStyleChanged = false;
        var oldValue = '';
        var newValue = '';
        var result = this.updateFontStyle(element, selectedItem, isUndoRedo, index, formFieldsData);
        isFontStyleChanged = result[0];
        oldValue = result[1];
        newValue = result[2];
        if (index > -1) {
            formFieldsData[index].FormField.fontStyle = selectedItem.fontStyle;
            this.pdfViewerBase.formFieldCollection[index].FormField.fontStyle = selectedItem.fontStyle;
        }
        this.pdfViewer.nameTable[selectedItem.id.split('_')[0]].fontStyle = selectedItem.fontStyle;
        if (isFontStyleChanged) {
            this.updateFormFieldPropertiesChanges("formFieldPropertiesChange", selectedItem, false, false, false, isFontStyleChanged, false, false, false, false, false, false, false, false, false, false, false, oldValue, newValue);
        }
    };
    FormDesigner.prototype.updateBorderThicknessPropertyChange = function (selectedItem, element, isUndoRedo, index, formFieldsData) {
        var isBorderWidthChanged = false;
        var oldValue, newValue;
        var borderWidth = parseInt(this.formFieldBorderWidth);
        if (selectedItem.thickness !== borderWidth) {
            isBorderWidthChanged = true;
            oldValue = selectedItem.thickness;
            newValue = borderWidth ? borderWidth : selectedItem.thickness;
        }
        if (isUndoRedo) {
            element.style.borderWidth = selectedItem.thickness.toString();
        }
        else {
            element.style.borderWidth = this.formFieldBorderWidth ? this.formFieldBorderWidth + "px" : selectedItem.thickness + "px";
            selectedItem.thickness = borderWidth;
        }
        if (index > -1) {
            formFieldsData[index].FormField.thickness = selectedItem.thickness;
            this.pdfViewerBase.formFieldCollection[index].FormField.thickness = selectedItem.thickness;
        }
        this.pdfViewer.nameTable[selectedItem.id.split('_')[0]].thickness = selectedItem.thickness;
        if (isBorderWidthChanged) {
            this.updateFormFieldPropertiesChanges("formFieldPropertiesChange", selectedItem, false, false, false, false, false, false, false, isBorderWidthChanged, false, false, false, false, false, false, false, oldValue, newValue);
        }
    };
    FormDesigner.prototype.updateBorderColorPropertyChange = function (selectedItem, element, isUndoRedo, index, formFieldsData) {
        var isBorderColorChanged = false;
        var oldValue, newValue;
        if (selectedItem.borderColor !== this.borderColorValue) {
            isBorderColorChanged = true;
            oldValue = selectedItem.borderColor;
            newValue = this.borderColorValue ? this.borderColorValue : selectedItem.borderColor;
        }
        if (isUndoRedo) {
            element.style.borderColor = selectedItem.borderColor;
        }
        else {
            element.style.borderColor = this.borderColorValue ? this.borderColorValue : selectedItem.borderColor;
            selectedItem.borderColor = this.borderColorValue ? this.borderColorValue : selectedItem.borderColor;
        }
        if (selectedItem.formFieldAnnotationType == "RadioButton")
            element.parentElement.style.boxShadow = this.borderColorValue + ' 0px 0px 0px ' + selectedItem.thickness + 'px';
        if (index > -1) {
            formFieldsData[index].FormField.borderColor = this.getRgbCode(selectedItem.borderColor);
            this.pdfViewerBase.formFieldCollection[index].FormField.borderColor = this.getRgbCode(selectedItem.borderColor);
        }
        this.pdfViewer.nameTable[selectedItem.id.split('_')[0]].borderColor = selectedItem.borderColor;
        if (isBorderColorChanged) {
            this.updateFormFieldPropertiesChanges("formFieldPropertiesChange", selectedItem, false, false, false, false, false, false, isBorderColorChanged, false, false, false, false, false, false, false, false, oldValue, newValue);
        }
    };
    FormDesigner.prototype.updateBackgroundColorPropertyChange = function (selectedItem, element, isUndoRedo, index, formFieldsData) {
        var isBackgroundColorChanged = false;
        var oldValue, newValue;
        if (selectedItem.backgroundColor !== this.backgroundColorValue) {
            isBackgroundColorChanged = true;
            oldValue = selectedItem.backgroundColor;
            newValue = this.backgroundColorValue ? this.backgroundColorValue : selectedItem.backgroundColor;
        }
        if (isUndoRedo) {
            if (selectedItem.formFieldAnnotationType == "RadioButton")
                element.parentElement.style.background = selectedItem.backgroundColor;
            else
                element.style.background = selectedItem.backgroundColor;
        }
        else {
            if (selectedItem.formFieldAnnotationType == "RadioButton")
                element.parentElement.style.background = this.backgroundColorValue ? this.backgroundColorValue : selectedItem.backgroundColor;
            else
                element.style.background = this.backgroundColorValue ? this.backgroundColorValue : selectedItem.backgroundColor;
            selectedItem.backgroundColor = this.backgroundColorValue ? this.backgroundColorValue : selectedItem.backgroundColor;
        }
        if (index > -1) {
            formFieldsData[index].FormField.backgroundColor = this.getRgbCode(selectedItem.backgroundColor);
            this.pdfViewerBase.formFieldCollection[index].FormField.backgroundColor = this.getRgbCode(selectedItem.backgroundColor);
        }
        this.pdfViewer.nameTable[selectedItem.id.split('_')[0]].backgroundColor = selectedItem.backgroundColor;
        if (isBackgroundColorChanged) {
            this.updateFormFieldPropertiesChanges("formFieldPropertiesChange", selectedItem, false, false, false, false, false, isBackgroundColorChanged, false, false, false, false, false, false, false, false, false, oldValue, newValue);
        }
    };
    FormDesigner.prototype.updateColorPropertyChange = function (selectedItem, element, isUndoRedo, index, formFieldsData) {
        var isColorChanged = false;
        var oldValue, newValue;
        if (selectedItem.color !== this.fontColorValue) {
            isColorChanged = true;
            oldValue = selectedItem.color;
            newValue = this.fontColorValue ? this.fontColorValue : selectedItem.color;
        }
        if (isUndoRedo) {
            element.style.color = selectedItem.color;
        }
        else {
            element.style.color = this.fontColorValue ? this.fontColorValue : selectedItem.color;
            selectedItem.color = this.fontColorValue ? this.fontColorValue : selectedItem.color;
        }
        if (index > -1) {
            formFieldsData[index].FormField.color = this.getRgbCode(selectedItem.color);
            this.pdfViewerBase.formFieldCollection[index].FormField.color = this.getRgbCode(selectedItem.color);
        }
        this.pdfViewer.nameTable[selectedItem.id.split('_')[0]].color = selectedItem.color;
        if (isColorChanged) {
            this.updateFormFieldPropertiesChanges("formFieldPropertiesChange", selectedItem, false, false, false, false, isColorChanged, false, false, false, false, false, false, false, false, false, false, oldValue, newValue);
        }
    };
    FormDesigner.prototype.updateAlignmentPropertyChange = function (selectedItem, element, isUndoRedo, index, formFieldsData) {
        var isAlignmentChanged = false;
        var oldValue, newValue;
        if (selectedItem.alignment !== this.formFieldAlign) {
            isAlignmentChanged = true;
            oldValue = selectedItem.alignment;
            newValue = this.formFieldAlign ? this.formFieldAlign : selectedItem.alignment;
        }
        if (isUndoRedo) {
            element.style.textAlign = selectedItem.alignment;
            if ((selectedItem.formFieldAnnotationType == "ListBox" || selectedItem.formFieldAnnotationType == "DropdownList") && element.children.length > 0) {
                element.style.textAlignLast = selectedItem.alignment;
                for (var i = 0; i < element.children.length; i++) {
                    var dropDownChild = element.children[i];
                    dropDownChild.style.textAlignLast = selectedItem.alignment;
                    dropDownChild.style.textAlign = selectedItem.alignment;
                }
            }
        }
        else {
            element.style.textAlign = this.formFieldAlign ? this.formFieldAlign : selectedItem.alignment;
            selectedItem.alignment = this.formFieldAlign ? this.formFieldAlign : selectedItem.alignment;
            if ((selectedItem.formFieldAnnotationType == "ListBox" || selectedItem.formFieldAnnotationType == "DropdownList") && element.children.length > 0) {
                element.style.textAlignLast = this.formFieldAlign ? this.formFieldAlign : selectedItem.alignment;
                for (var i = 0; i < element.children.length; i++) {
                    var dropDownChild = element.children[i];
                    dropDownChild.style.textAlignLast = this.formFieldAlign ? this.formFieldAlign : selectedItem.alignment;
                    dropDownChild.style.textAlign = this.formFieldAlign ? this.formFieldAlign : selectedItem.alignment;
                }
            }
        }
        if (index > -1) {
            formFieldsData[index].FormField.alignment = selectedItem.alignment;
            this.pdfViewerBase.formFieldCollection[index].FormField.alignment = selectedItem.alignment;
        }
        this.pdfViewer.nameTable[selectedItem.id.split('_')[0]].alignment = selectedItem.alignment;
        if (isAlignmentChanged) {
            this.updateFormFieldPropertiesChanges("formFieldPropertiesChange", selectedItem, false, false, false, false, false, false, false, false, isAlignmentChanged, false, false, false, false, false, false, oldValue, newValue);
        }
    };
    FormDesigner.prototype.updateFontSizePropertyChange = function (selectedItem, element, isUndoRedo, index, formFieldsData) {
        var isFontSizeChanged = false;
        var oldValue, newValue;
        var zoomValue = this.pdfViewerBase.getZoomFactor();
        var fontSize = this.formFieldFontSize ? parseInt(this.formFieldFontSize.value.toString()) : null;
        var selectedFontSize = parseInt(selectedItem.fontSize);
        if (selectedFontSize !== fontSize) {
            isFontSizeChanged = true;
            oldValue = selectedItem.fontSize;
            newValue = fontSize;
        }
        if (isUndoRedo) {
            element.style.fontSize = (selectedItem.fontSize * zoomValue) + 'px'.toString();
        }
        else {
            selectedItem.fontSize = fontSize;
            element.style.fontSize = parseInt(this.formFieldFontSize.value.toString()) * zoomValue + 'px';
        }
        if (index > -1) {
            formFieldsData[index].FormField.fontSize = selectedItem.fontSize;
            this.pdfViewerBase.formFieldCollection[index].FormField.fontSize = selectedItem.fontSize;
        }
        this.pdfViewer.nameTable[selectedItem.id.split('_')[0]].fontSize = selectedItem.fontSize;
        if (isFontSizeChanged) {
            this.updateFormFieldPropertiesChanges("formFieldPropertiesChange", selectedItem, false, false, isFontSizeChanged, false, false, false, false, false, false, false, false, false, false, false, false, oldValue, newValue);
        }
    };
    FormDesigner.prototype.updateFontFamilyPropertyChange = function (selectedItem, element, isUndoRedo, index, formFieldsData) {
        var isFontFamilyChanged = false;
        var oldValue, newValue;
        var fontFamily = this.formFieldFontFamily ? this.formFieldFontFamily.value.toString() : "";
        if (selectedItem.fontFamily !== fontFamily) {
            isFontFamilyChanged = true;
            oldValue = selectedItem.fontFamily;
            newValue = fontFamily;
        }
        if (isUndoRedo) {
            element.style.fontFamily = selectedItem.fontFamily;
        }
        else {
            selectedItem.fontFamily = fontFamily;
            element.style.fontFamily = fontFamily;
        }
        if (index > -1) {
            formFieldsData[index].FormField.fontFamily = selectedItem.fontFamily;
            this.pdfViewerBase.formFieldCollection[index].FormField.fontFamily = selectedItem.fontFamily;
        }
        this.pdfViewer.nameTable[selectedItem.id.split('_')[0]].fontFamily = selectedItem.fontFamily;
        if (isFontFamilyChanged) {
            this.updateFormFieldPropertiesChanges("formFieldPropertiesChange", selectedItem, false, isFontFamilyChanged, false, false, false, false, false, false, false, false, false, false, false, false, false, oldValue, newValue);
        }
    };
    FormDesigner.prototype.updateVisibilityPropertyChange = function (selectedItem, element, isUndoRedo, index, formFieldsData) {
        var isVisibilityChanged = false;
        var oldValue, newValue;
        if (this.formFieldVisibility && (selectedItem.visibility !== this.formFieldVisibility.value)) {
            isVisibilityChanged = true;
            oldValue = selectedItem.visibility;
            newValue = this.formFieldVisibility.value;
        }
        if (!isUndoRedo) {
            selectedItem.visibility = this.formFieldVisibility.value;
        }
        element.style.visibility = selectedItem.visibility;
        if (selectedItem.formFieldAnnotationType === "RadioButton") {
            element.parentElement.style.visibility = selectedItem.visibility;
        }
        if (selectedItem.formFieldAnnotationType === "SignatureField" || selectedItem.formFieldAnnotationType === "InitialField") {
            var signElement = document.getElementById(selectedItem.id + "_content_html_element").firstElementChild.children[1];
            signElement.style.visibility = selectedItem.visibility;
            signElement.parentElement.style.visibility = selectedItem.visibility;
            var annotation = this.pdfViewer.nameTable[selectedItem.id.split('_')[0] + "_content"];
            if (selectedItem.visibility === "hidden") {
                if (annotation) {
                    this.hideSignatureValue(selectedItem, annotation, index, formFieldsData);
                }
            }
            else {
                if (annotation) {
                    this.showSignatureValue(selectedItem, oldValue, annotation, index, formFieldsData);
                }
            }
        }
        if (index > -1) {
            formFieldsData[index].FormField.visibility = selectedItem.visibility;
            this.pdfViewerBase.formFieldCollection[index].FormField.visibility = selectedItem.visibility;
        }
        // selectedItem.visibility = this.formFieldVisibility.value;
        this.pdfViewer.nameTable[selectedItem.id.split('_')[0]].visibility = selectedItem.visibility;
        if (isVisibilityChanged) {
            this.pdfViewerBase.setItemInSessionStorage(this.pdfViewerBase.formFieldCollection, '_formDesigner');
            this.updateFormFieldPropertiesChanges("formFieldPropertiesChange", selectedItem, false, false, false, false, false, false, false, false, false, false, isVisibilityChanged, false, false, false, false, oldValue, newValue);
        }
    };
    FormDesigner.prototype.hideSignatureValue = function (selectedItem, annotation, index, formFieldsData) {
        selectedItem.wrapper.children.splice(selectedItem.wrapper.children.indexOf(annotation.wrapper.children[0]), 1);
        selectedItem.value = '';
        selectedItem.signatureType = '';
        formFieldsData[index].FormField.value = '';
        formFieldsData[index].FormField.signatureType = '';
        this.pdfViewerBase.formFieldCollection[index].FormField.value = '';
        this.pdfViewerBase.formFieldCollection[index].FormField.signatureType = '';
        this.pdfViewer.remove(annotation);
        this.pdfViewer.renderDrawing();
    };
    FormDesigner.prototype.showSignatureValue = function (selectedItem, oldValue, annotation, index, formFieldsData) {
        if (annotation.shapeAnnotationType === "SignatureText") {
            selectedItem.value = annotation.data;
            selectedItem.signatureType = "Text";
            formFieldsData[index].FormField.signatureType = "Text";
            formFieldsData[index].FormField.value = annotation.data;
            this.pdfViewerBase.formFieldCollection[index].FormField.value = annotation.data;
            this.pdfViewerBase.formFieldCollection[index].FormField.signatureType = "Text";
        }
        else if (annotation.shapeAnnotationType === "SignatureImage") {
            selectedItem.value = annotation.data;
            selectedItem.signatureType = "Image";
            formFieldsData[index].FormField.signatureType = "Image";
            formFieldsData[index].FormField.value = annotation.data;
            this.pdfViewerBase.formFieldCollection[index].FormField.value = annotation.data;
            this.pdfViewerBase.formFieldCollection[index].FormField.signatureType = "Image";
        }
        else {
            formFieldsData[index].FormField.signatureType = "Path";
            selectedItem.signatureType = "Path";
            this.pdfViewerBase.formFieldCollection[index].FormField.signatureType = "Path";
            var collectionData = processPathData(annotation.data);
            var csData = splitArrayCollection(collectionData);
            selectedItem.value = JSON.stringify(csData);
            formFieldsData[index].FormField.value = JSON.stringify(csData);
            this.pdfViewerBase.formFieldCollection[index].FormField.value = JSON.stringify(csData);
        }
        selectedItem.signatureBound = annotation.signatureBound;
        if (oldValue === 'hidden') {
            this.pdfViewer.add(annotation);
            selectedItem.wrapper.children.push(annotation.wrapper);
            var canvass = document.getElementById(this.pdfViewer.element.id + '_annotationCanvas_' + selectedItem.pageIndex);
            this.pdfViewer.renderDrawing(canvass, selectedItem.pageIndex);
        }
        ;
        this.pdfViewer.renderDrawing();
    };
    FormDesigner.prototype.updateTooltipPropertyChange = function (selectedItem, element, isUndoRedo, index, formFieldsData) {
        var isToolTipChanged = false;
        var oldValue, newValue;
        if (this.formFieldTooltip && (selectedItem.tooltip !== this.formFieldTooltip.value)) {
            isToolTipChanged = true;
            oldValue = selectedItem.tooltip;
            newValue = this.formFieldTooltip.value;
        }
        if (isUndoRedo) {
            this.formFieldTooltip = new TextBox();
            this.formFieldTooltip.value = selectedItem.tooltip;
        }
        else {
            selectedItem.tooltip = this.formFieldTooltip ? this.formFieldTooltip.value : selectedItem.tooltip;
        }
        if (index > -1) {
            formFieldsData[index].FormField.tooltip = selectedItem.tooltip;
            this.pdfViewerBase.formFieldCollection[index].FormField.tooltip = selectedItem.tooltip;
        }
        this.pdfViewer.nameTable[selectedItem.id.split('_')[0]].tooltip = this.formFieldTooltip.value;
        if (!isNullOrUndefined(this.formFieldTooltip.value) && this.formFieldTooltip.value !== '') {
            this.setToolTip(this.formFieldTooltip.value, selectedItem.formFieldAnnotationType == "RadioButton" || selectedItem.formFieldAnnotationType == "DropdownList" ? element.parentElement : element);
        }
        if (isToolTipChanged) {
            this.pdfViewerBase.setItemInSessionStorage(this.pdfViewerBase.formFieldCollection, '_formDesigner');
            this.updateFormFieldPropertiesChanges("formFieldPropertiesChange", selectedItem, false, false, false, false, false, false, false, false, false, false, false, false, false, false, isToolTipChanged, oldValue, newValue);
        }
    };
    FormDesigner.prototype.updateNamePropertyChange = function (selectedItem, element, isUndoRedo, index, formFieldsData) {
        var designerName = document.getElementById(selectedItem.id + "_designer_name");
        var zoomValue = this.pdfViewerBase.getZoomFactor();
        designerName.style.fontSize = selectedItem.fontSize ? (selectedItem.fontSize * zoomValue) + 'px' : (10 * zoomValue) + 'px';
        if (isUndoRedo) {
            designerName.innerHTML = selectedItem.name;
        }
        else {
            selectedItem.name = this.formFieldName ? this.formFieldName.value : selectedItem.name;
            designerName.innerHTML = selectedItem.name;
        }
        if (index > -1) {
            if (formFieldsData[index].FormField.name !== selectedItem.name) {
                this.updateFormFieldPropertiesChanges("formFieldPropertiesChange", selectedItem, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, null, null, true, formFieldsData[index].FormField.name);
            }
            formFieldsData[index].FormField.name = selectedItem.name;
            this.pdfViewerBase.formFieldCollection[index].FormField.name = selectedItem.name;
        }
        element.name = selectedItem.name;
        this.pdfViewer.nameTable[selectedItem.id.split('_')[0]].name = selectedItem.name;
        if (selectedItem.formFieldAnnotationType == "DropdownList" || selectedItem.formFieldAnnotationType == "ListBox") {
            for (var i = 0; i < this.pdfViewer.formFieldCollection.length; i++) {
                var formField = this.pdfViewer.formFieldCollection[i];
                if ((formField.formFieldAnnotationType === "DropdownList" || formField.formFieldAnnotationType === "ListBox") && formField.name === selectedItem.name && formField.id !== selectedItem.id) {
                    selectedItem.options = formField.options;
                    this.updateDropDownListDataSource(selectedItem, element);
                    break;
                }
            }
        }
    };
    FormDesigner.prototype.updateIsReadOnlyPropertyChange = function (selectedItem, element, isUndoRedo, index, formFieldsData) {
        var isReadOnlyChanged = false;
        var oldValue, newValue;
        if (this.formFieldReadOnly && (selectedItem.isReadonly !== this.formFieldReadOnly.checked)) {
            isReadOnlyChanged = true;
            oldValue = selectedItem.isReadonly;
            newValue = this.formFieldReadOnly.checked;
        }
        if (isUndoRedo) {
            this.formFieldReadOnly = new CheckBox();
            this.formFieldReadOnly.checked = selectedItem.isReadonly;
        }
        else {
            selectedItem.isReadonly = this.formFieldReadOnly.checked;
        }
        if (index > -1) {
            formFieldsData[index].FormField.isReadonly = selectedItem.isReadonly;
            this.pdfViewerBase.formFieldCollection[index].FormField.isReadonly = selectedItem.isReadonly;
        }
        this.pdfViewer.nameTable[selectedItem.id.split('_')[0]].isReadonly = selectedItem.isReadonly;
        this.setReadOnlyToElement(selectedItem, element, selectedItem.isReadonly);
        this.setReadOnlyToFormField(selectedItem, selectedItem.isReadonly);
        if (isReadOnlyChanged) {
            this.pdfViewerBase.setItemInSessionStorage(this.pdfViewerBase.formFieldCollection, '_formDesigner');
            this.updateFormFieldPropertiesChanges("formFieldPropertiesChange", selectedItem, false, false, false, false, false, false, false, false, false, isReadOnlyChanged, false, false, false, false, false, oldValue, newValue);
        }
    };
    FormDesigner.prototype.updateIsRequiredPropertyChange = function (selectedItem, element, isUndoRedo, index, formFieldsData) {
        var isRequiredChanged = false;
        var oldValue, newValue;
        if (this.formFieldRequired && (selectedItem.isRequired !== this.formFieldRequired.checked)) {
            isRequiredChanged = true;
            oldValue = selectedItem.isRequired;
            newValue = this.formFieldRequired.checked;
        }
        if (isUndoRedo) {
            this.formFieldRequired = new CheckBox();
            this.formFieldRequired.checked = selectedItem.isRequired;
        }
        else {
            selectedItem.isRequired = this.formFieldRequired.checked;
        }
        if (index > -1) {
            formFieldsData[index].FormField.isRequired = selectedItem.isRequired;
            this.pdfViewerBase.formFieldCollection[index].FormField.isRequired = selectedItem.isRequired;
            if (this.pdfViewerBase.formFieldCollection[index].FormField.radiobuttonItem) {
                for (var i = 0; i < this.pdfViewerBase.formFieldCollection[index].FormField.radiobuttonItem.length; i++) {
                    this.pdfViewerBase.formFieldCollection[index].FormField.radiobuttonItem[i].isRequired = selectedItem.isRequired;
                    this.pdfViewer.nameTable[this.pdfViewerBase.formFieldCollection[index].FormField.radiobuttonItem[i].id.split('_')[0]].isRequired = selectedItem.isRequired;
                }
                this.pdfViewerBase.setItemInSessionStorage(this.pdfViewerBase.formFieldCollection, '_formDesigner');
            }
        }
        this.pdfViewer.nameTable[selectedItem.id.split('_')[0]].isRequired = selectedItem.isRequired;
        this.setRequiredToElement(selectedItem, element, selectedItem.isRequired);
        this.setRequiredToFormField(selectedItem, selectedItem.isRequired);
        if (isRequiredChanged) {
            this.pdfViewerBase.setItemInSessionStorage(this.pdfViewerBase.formFieldCollection, '_formDesigner');
            this.updateFormFieldPropertiesChanges("formFieldPropertiesChange", selectedItem, false, false, false, false, false, false, false, false, false, false, false, false, isRequiredChanged, false, false, oldValue, newValue);
        }
    };
    FormDesigner.prototype.updateIsPrintPropertyChange = function (selectedItem, isUndoRedo, index, formFieldsData) {
        var isPrintChanged = false;
        var oldValue, newValue;
        if (this.formFieldPrinting && (selectedItem.isPrint !== this.formFieldPrinting.checked)) {
            isPrintChanged = true;
            oldValue = selectedItem.isPrint;
            newValue = this.formFieldPrinting.checked;
        }
        if (isUndoRedo) {
            this.formFieldPrinting = new CheckBox();
            this.formFieldPrinting.checked = selectedItem.isPrint;
        }
        else {
            selectedItem.isPrint = this.formFieldPrinting.checked;
        }
        if (index > -1) {
            formFieldsData[index].FormField.isPrint = selectedItem.isPrint;
            this.pdfViewerBase.formFieldCollection[index].FormField.isPrint = selectedItem.isPrint;
        }
        this.pdfViewer.nameTable[selectedItem.id.split('_')[0]].isPrint = selectedItem.isPrint;
        if (isPrintChanged) {
            this.updateFormFieldPropertiesChanges("formFieldPropertiesChange", selectedItem, false, false, false, false, false, false, false, false, false, false, false, false, false, isPrintChanged, false, oldValue, newValue);
        }
    };
    /**
     * @private
     */
    FormDesigner.prototype.getFormFiledIndex = function (id) {
        if (this.pdfViewerBase.formFieldCollection == null || this.pdfViewerBase.formFieldCollection.length == 0)
            return -1;
        var index = this.pdfViewerBase.formFieldCollection.findIndex(function (el) { return el.Key.split('_')[0] === id; });
        if (index > -1) {
            return index;
        }
        else {
            for (var i = 0; i < this.pdfViewerBase.formFieldCollection.length; i++) {
                if (this.pdfViewerBase.formFieldCollection[i].FormField.formFieldAnnotationType === 'RadioButton' && this.pdfViewerBase.formFieldCollection[i].FormField.radiobuttonItem) {
                    for (var k = 0; k < this.pdfViewerBase.formFieldCollection[i].FormField.radiobuttonItem.length; k++) {
                        if (this.pdfViewerBase.formFieldCollection[i].FormField.radiobuttonItem[k].id.split("_")[0] === id) {
                            return i;
                        }
                    }
                }
            }
        }
        return -1;
    };
    FormDesigner.prototype.updateFontStyle = function (inputElement, selectedItem, isUndoRedo, index, formFieldsData) {
        var isFontStyleChanged = false;
        var oldValue = '';
        var newValue = '';
        if (this.formFieldBold) {
            if (selectedItem.fontStyle !== 'Bold') {
                isFontStyleChanged = true;
                oldValue += selectedItem.font.isBold ? 'Bold' + ", " : '';
            }
            if (isUndoRedo) {
                if (selectedItem.font.isBold) {
                    this.setFontStyleValues(selectedItem, 'Bold', this.formFieldBold, inputElement, true, 'bold', index, formFieldsData);
                }
                else {
                    this.setFontStyleValues(selectedItem, 'None', this.formFieldBold, inputElement, false, '', index, formFieldsData);
                }
            }
            else if (this.formFieldBold === 'bold') {
                this.setFontStyleValues(selectedItem, 'Bold', this.formFieldBold, inputElement, true, 'bold', index, formFieldsData);
            }
            else {
                this.setFontStyleValues(selectedItem, 'None', 'bold', inputElement, false, '', index, formFieldsData);
            }
        }
        else if (selectedItem.font.isBold) {
            this.setFontStyleValues(selectedItem, 'None', 'bold', inputElement, false, '', index, formFieldsData);
        }
        newValue += selectedItem.font.isBold ? 'Bold' + ", " : '';
        if (this.formFieldItalic) {
            if (selectedItem.fontStyle !== 'Italic') {
                isFontStyleChanged = true;
                oldValue += selectedItem.font.isItalic ? 'Italic' + ", " : '';
            }
            if (isUndoRedo) {
                if (selectedItem.font.isItalic) {
                    this.setFontStyleValues(selectedItem, 'Italic', this.formFieldItalic, inputElement, true, 'italic', index, formFieldsData);
                }
                else {
                    this.setFontStyleValues(selectedItem, 'None', this.formFieldItalic, inputElement, false, '', index, formFieldsData);
                }
            }
            else if (this.formFieldItalic === 'italic') {
                this.setFontStyleValues(selectedItem, 'Italic', this.formFieldItalic, inputElement, true, 'italic', index, formFieldsData);
            }
            else {
                this.setFontStyleValues(selectedItem, 'None', 'italic', inputElement, false, '', index, formFieldsData);
            }
        }
        else if (selectedItem.font.isItalic) {
            this.setFontStyleValues(selectedItem, 'None', 'italic', inputElement, false, '', index, formFieldsData);
        }
        newValue += selectedItem.font.isItalic ? 'Italic' + ", " : '';
        if (this.formFieldUnderline) {
            if (selectedItem.fontStyle !== 'Underline') {
                isFontStyleChanged = true;
                oldValue += selectedItem.font.isUnderline ? 'Underline' + ", " : '';
            }
            if (isUndoRedo) {
                if (selectedItem.font.isUnderline) {
                    this.setFontStyleValues(selectedItem, 'Underline', this.formFieldUnderline, inputElement, true, 'underline', index, formFieldsData);
                }
                else {
                    this.setFontStyleValues(selectedItem, 'None', this.formFieldUnderline, inputElement, false, '', index, formFieldsData);
                }
            }
            else if (this.formFieldUnderline === 'underline') {
                this.setFontStyleValues(selectedItem, 'Underline', this.formFieldUnderline, inputElement, true, 'underline', index, formFieldsData);
            }
            else {
                this.setFontStyleValues(selectedItem, 'None', 'underline', inputElement, false, '', index, formFieldsData);
            }
        }
        else if (selectedItem.font.isUnderline) {
            this.setFontStyleValues(selectedItem, 'None', 'underline', inputElement, false, '', index, formFieldsData);
        }
        newValue += selectedItem.font.isUnderline ? 'Underline' + ", " : '';
        if (this.formFieldStrikeOut) {
            if (selectedItem.fontStyle !== 'Strikethrough') {
                isFontStyleChanged = true;
                oldValue += selectedItem.font.isStrikeout ? 'Strikethrough' + ", " : '';
            }
            if (isUndoRedo) {
                if (selectedItem.font.isStrikeout) {
                    this.setFontStyleValues(selectedItem, 'Strikethrough', this.formFieldStrikeOut, inputElement, true, 'line-through', index, formFieldsData);
                }
                else {
                    this.setFontStyleValues(selectedItem, 'None', this.formFieldStrikeOut, inputElement, false, '', index, formFieldsData);
                }
            }
            else if (this.formFieldStrikeOut === 'line-through') {
                this.setFontStyleValues(selectedItem, 'Strikethrough', this.formFieldStrikeOut, inputElement, true, 'line-through', index, formFieldsData);
            }
            else {
                this.setFontStyleValues(selectedItem, 'None', 'line-through', inputElement, false, '', index, formFieldsData);
            }
        }
        else if (selectedItem.font.isStrikeout) {
            this.setFontStyleValues(selectedItem, 'None', 'line-through', inputElement, false, '', index, formFieldsData);
        }
        newValue += selectedItem.font.isStrikeout ? 'Strikethrough' + ", " : '';
        return [isFontStyleChanged, oldValue, newValue];
    };
    FormDesigner.prototype.setFontStyleValues = function (selectedItem, selectedItemFontStyle, fontStyleType, inputElement, isFontStyleEnabled, fontStyleValue, index, formFieldsData) {
        if (fontStyleType === 'bold') {
            selectedItem.fontStyle = selectedItemFontStyle;
            selectedItem.font.isBold = isFontStyleEnabled;
            inputElement.style.fontWeight = fontStyleValue;
            this.setDropdownFontStyleValue(inputElement, fontStyleType, fontStyleValue);
            if (index > -1) {
                formFieldsData[index].FormField.font.isBold = isFontStyleEnabled;
                this.pdfViewerBase.formFieldCollection[index].FormField.font.isBold = isFontStyleEnabled;
            }
            this.pdfViewer.nameTable[selectedItem.id.split('_')[0]].font.isBold = isFontStyleEnabled;
        }
        else if (fontStyleType === 'italic') {
            inputElement.style.fontStyle = fontStyleValue;
            this.setDropdownFontStyleValue(inputElement, fontStyleType, fontStyleValue);
            selectedItem.fontStyle = selectedItemFontStyle;
            selectedItem.font.isItalic = isFontStyleEnabled;
            if (index > -1) {
                formFieldsData[index].FormField.font.isItalic = isFontStyleEnabled;
                this.pdfViewerBase.formFieldCollection[index].FormField.font.isItalic = isFontStyleEnabled;
            }
            this.pdfViewer.nameTable[selectedItem.id.split('_')[0]].font.isItalic = isFontStyleEnabled;
        }
        else if (fontStyleType === 'underline') {
            this.setDropdownFontStyleValue(inputElement, fontStyleType, fontStyleValue);
            inputElement.style.textDecoration = fontStyleValue;
            selectedItem.fontStyle = selectedItemFontStyle;
            selectedItem.font.isUnderline = isFontStyleEnabled;
            if (index > -1) {
                formFieldsData[index].FormField.font.isUnderline = isFontStyleEnabled;
                this.pdfViewerBase.formFieldCollection[index].FormField.font.isUnderline = isFontStyleEnabled;
            }
            this.pdfViewer.nameTable[selectedItem.id.split('_')[0]].font.isUnderline = isFontStyleEnabled;
        }
        else if (fontStyleType === 'line-through') {
            this.setDropdownFontStyleValue(inputElement, fontStyleType, fontStyleValue);
            inputElement.style.textDecoration = fontStyleValue;
            selectedItem.fontStyle = selectedItemFontStyle;
            selectedItem.font.isStrikeout = isFontStyleEnabled;
            if (index > -1) {
                formFieldsData[index].FormField.font.isStrikeout = isFontStyleEnabled;
                this.pdfViewerBase.formFieldCollection[index].FormField.font.isStrikeout = isFontStyleEnabled;
            }
            this.pdfViewer.nameTable[selectedItem.id.split('_')[0]].font.isStrikeout = isFontStyleEnabled;
        }
    };
    FormDesigner.prototype.setDropdownFontStyleValue = function (dropdownElement, fontStyleType, value) {
        if (dropdownElement.length > 0) {
            for (var i = 0; i < dropdownElement.length; i++) {
                if (fontStyleType === 'bold') {
                    dropdownElement[i].style.fontWeight = value;
                }
                else if (fontStyleType === 'italic') {
                    dropdownElement[i].style.fontStyle = value;
                }
                else if (fontStyleType === 'underline') {
                    dropdownElement[i].style.textDecoration = value;
                }
                else if (fontStyleType === 'line-through') {
                    dropdownElement[i].style.textDecoration = value;
                }
            }
        }
    };
    /**
     * @private
     */
    FormDesigner.prototype.updateFormFieldPropertiesChanges = function (name, selectedItem, isValueChanged, isFontFamilyChanged, isFontSizeChanged, isFontStyleChanged, isColorChanged, isBackgroundColorChanged, isBorderColorChanged, isBorderWidthChanged, isAlignmentChanged, isReadOnlyChanged, isVisibilityChanged, isMaxLengthChanged, isRequiredChanged, isPrintChanged, isToolTipChanged, oldValue, newValue, isNamechanged, previousName) {
        var field = {
            name: selectedItem.name, id: selectedItem.id, value: selectedItem.value, fontFamily: selectedItem.fontFamily, fontSize: selectedItem.fontSize, fontStyle: selectedItem.fontStyle,
            color: selectedItem.color, backgroundColor: selectedItem.backgroundColor, alignment: selectedItem.alignment, isReadonly: selectedItem.isReadonly, visibility: selectedItem.visibility,
            maxLength: selectedItem.maxLength, isRequired: selectedItem.isRequired, isPrint: selectedItem.isPrint, rotation: selectedItem.rotateAngle, tooltip: selectedItem.tooltip, options: selectedItem.options,
            isChecked: selectedItem.isChecked, isSelected: selectedItem.isSelected, previousName: previousName, currentName: selectedItem.name
        };
        this.pdfViewer.fireFormFieldPropertiesChangeEvent("formFieldPropertiesChange", field, selectedItem.pageIndex, isValueChanged, isFontFamilyChanged, isFontSizeChanged, isFontStyleChanged, isColorChanged, isBackgroundColorChanged, isBorderColorChanged, isBorderWidthChanged, isAlignmentChanged, isReadOnlyChanged, isVisibilityChanged, isMaxLengthChanged, isRequiredChanged, isPrintChanged, isToolTipChanged, oldValue, newValue, isNamechanged);
    };
    FormDesigner.prototype.onCancelClicked = function (args) {
        this.propertiesDialog.hide();
    };
    FormDesigner.prototype.createAppearanceTab = function () {
        var elementID = this.pdfViewer.element.id;
        // eslint-disable-next-line max-len
        var appearanceDiv = createElement('div', { id: elementID + '_properties_appearance' });
        if (this.pdfViewer.selectedItems.formFields[0].formFieldAnnotationType !== 'DropdownList' && this.pdfViewer.selectedItems.formFields[0].formFieldAnnotationType !== 'ListBox') {
            appearanceDiv.style.height = '260px';
        }
        else {
            appearanceDiv.style.height = '336px';
        }
        var propertySpliter = createElement('div');
        propertySpliter.className = 'e-pv-properties-header-spliter';
        appearanceDiv.appendChild(propertySpliter);
        var tabContainer = createElement('div', { className: 'e-pv-properties-tab-style-prop' });
        appearanceDiv.appendChild(tabContainer);
        // <div style="/* border-color: red; *//* border-width: 2px; *//* background: red; *//* height: 1px; */width: 100%;position: absolute;padding-top: 35px;/* border-bottom-color: black; *//* border-bottom-width: 2px; *//* border: solid; */border-bottom-style: solid;border-bottom-width: 1px;left: 0;border-bottom-color: #E0E0E0;"></div>
        if (this.pdfViewer.selectedItems && (this.pdfViewer.selectedItems.formFields[0].formFieldAnnotationType === 'ListBox' || this.pdfViewer.selectedItems.formFields[0].formFieldAnnotationType === 'DropdownList')) {
            // eslint-disable-next-line max-len
            this.tabControl = new Tab({
                items: [
                    {
                        header: { 'text': '<div class="e-pv-form-field-property-header-general"> ' + this.pdfViewer.localeObj.getConstant('General') + '</div>' }, content: this.createGeneralProperties()
                    },
                    {
                        header: { 'text': '<div class="e-pv-form-field-property-header-general"> ' + this.pdfViewer.localeObj.getConstant('Appearance') + '</div>' }, content: this.createAppearanceProperties()
                    },
                    {
                        header: { 'text': '<div class="e-pv-form-field-property-header-general"> ' + this.pdfViewer.localeObj.getConstant('Options') + '</div>' }, content: this.createOptionProperties()
                    },
                ],
            }, tabContainer);
        }
        else if (this.pdfViewer.selectedItems && (this.pdfViewer.selectedItems.formFields[0].formFieldAnnotationType === 'SignatureField' || this.pdfViewer.selectedItems.formFields[0].formFieldAnnotationType === 'InitialField')) {
            // eslint-disable-next-line max-len
            this.tabControl = new Tab({
                items: [
                    {
                        header: { 'text': '<div class="e-pv-form-field-property-header-general"> ' + this.pdfViewer.localeObj.getConstant('General') + '</div>' }, content: this.createGeneralProperties()
                    }
                ],
            }, tabContainer);
        }
        else {
            // eslint-disable-next-line max-len
            this.tabControl = new Tab({
                items: [
                    {
                        header: { 'text': '<div class="e-pv-form-field-property-header-general"> ' + this.pdfViewer.localeObj.getConstant('General') + '</div>' }, content: this.createGeneralProperties()
                    },
                    {
                        header: { 'text': '<div class="e-pv-form-field-property-header-general"> ' + this.pdfViewer.localeObj.getConstant('Appearance') + '</div>' }, content: this.createAppearanceProperties()
                    }
                ],
            }, tabContainer);
        }
        tabContainer.children[1].style.height = '100%';
        return appearanceDiv;
    };
    FormDesigner.prototype.createGeneralProperties = function () {
        var selectedItem = this.pdfViewer.selectedItems.formFields ? this.pdfViewer.selectedItems.formFields[0] : null;
        var visibilityItems = ['visible', 'hidden'];
        // eslint-disable-next-line max-len
        var elementID = this.pdfViewer.element.id;
        var generalPropertiesDiv = createElement('div', { id: elementID + '_general_prop_appearance' });
        var textStyleContainer = createElement('div', { className: 'e-pv-properties-text-edit-prop' });
        generalPropertiesDiv.appendChild(textStyleContainer);
        var formFieldNameMainDiv = createElement('div', { className: 'e-pv-properties-form-field-name-main-div' });
        // eslint-disable-next-line max-len
        var formFieldNameDiv = createElement('div', { className: 'e-pv-properties-name-edit-prop' });
        var formFieldNameContainer = createElement('input', { className: 'e-pv-properties-name-edit-input e-input' });
        formFieldNameDiv.appendChild(formFieldNameContainer);
        formFieldNameMainDiv.appendChild(formFieldNameDiv);
        // eslint-disable-next-line max-len
        this.formFieldName = new TextBox({ type: "text", floatLabelType: 'Always', placeholder: this.pdfViewer.localeObj.getConstant('Name'), value: selectedItem.name, cssClass: 'e-pv-properties-formfield-name' }, formFieldNameContainer);
        textStyleContainer.appendChild(formFieldNameMainDiv);
        var formFieldTooltipMainDiv = createElement('div', { className: 'e-pv-properties-form-field-tooltip-main-div' });
        var formFieldTooltipDiv = createElement('div', { className: 'e-pv-properties-tooltip-edit-prop' });
        var formFieldTooltipContainer = createElement('input', { className: 'e-pv-properties-tooltip-prop-input e-input' });
        formFieldTooltipDiv.appendChild(formFieldTooltipContainer);
        formFieldTooltipMainDiv.appendChild(formFieldTooltipDiv);
        // eslint-disable-next-line max-len
        this.formFieldTooltip = new TextBox({ type: "text", floatLabelType: 'Always', placeholder: this.pdfViewer.localeObj.getConstant('Tooltip'), value: selectedItem.tooltip, cssClass: 'e-pv-properties-formfield-tooltip' }, formFieldTooltipContainer);
        textStyleContainer.appendChild(formFieldTooltipMainDiv);
        var visibilityContainer = createElement('div', { className: 'e-pv-properties-visibility-style-prop' });
        generalPropertiesDiv.appendChild(visibilityContainer);
        var formFieldValueMainDiv = createElement('div', { className: 'e-pv-properties-form-field-value-main-div' });
        var formFieldValueDiv = createElement('div', { className: 'e-pv-properties-value-edit-prop' });
        var formFieldValueContainer = createElement('input', { className: 'e-pv-properties-value-input e-input' });
        formFieldValueDiv.appendChild(formFieldValueContainer);
        formFieldValueMainDiv.appendChild(formFieldValueDiv);
        if (this.pdfViewer.selectedItems.formFields[0].formFieldAnnotationType == 'PasswordField') {
            // eslint-disable-next-line max-len
            this.formFieldValue = new TextBox({ type: "password", floatLabelType: 'Always', placeholder: this.pdfViewer.localeObj.getConstant('Value'), value: selectedItem.value, cssClass: 'e-pv-properties-formfield-value' }, formFieldValueContainer);
        }
        else {
            // eslint-disable-next-line max-len
            this.formFieldValue = new TextBox({ type: "text", floatLabelType: 'Always', placeholder: this.pdfViewer.localeObj.getConstant('Value'), value: selectedItem.value, cssClass: 'e-pv-properties-formfield-value' }, formFieldValueContainer);
        }
        if (this.pdfViewer.selectedItems.formFields[0].formFieldAnnotationType !== 'Textbox' && this.pdfViewer.selectedItems.formFields[0].formFieldAnnotationType !== 'PasswordField' && this.pdfViewer.selectedItems.formFields[0].formFieldAnnotationType !== "RadioButton" && this.pdfViewer.selectedItems.formFields[0].formFieldAnnotationType !== "Checkbox") {
            this.formFieldValue.enabled = false;
            this.formFieldValue.value = '';
        }
        visibilityContainer.appendChild(formFieldValueMainDiv);
        var formFieldVisibilityMainDiv = createElement('div', { className: 'e-pv-properties-form-field-visibility-main-div' });
        var formFieldVisibilityDiv = createElement('div', { className: 'e-pv-properties-visibility-edit-prop' });
        var formFieldVisibilityContainer = createElement('input', { className: 'e-pv-properties-formfield-visibility' });
        formFieldVisibilityDiv.appendChild(formFieldVisibilityContainer);
        formFieldVisibilityMainDiv.appendChild(formFieldVisibilityDiv);
        var selectedIndex = selectedItem.visibility === 'visible' ? 0 : 1;
        this.formFieldVisibility = new DropDownList({ dataSource: visibilityItems, floatLabelType: 'Always', index: selectedIndex, value: selectedItem.visibility, placeholder: this.pdfViewer.localeObj.getConstant('Form Field Visibility'), cssClass: 'e-pv-properties-formfield-visibility' }, formFieldVisibilityContainer);
        visibilityContainer.appendChild(formFieldVisibilityMainDiv);
        var checkboxMainDiv = createElement('div', { className: 'e-pv-properties-checkbox-main-div-prop' });
        var readOnly = createElement('input', { className: 'e-pv-properties-checkbox-readonly-input e-input' });
        checkboxMainDiv.appendChild(readOnly);
        this.formFieldReadOnly = new CheckBox({ label: this.pdfViewer.localeObj.getConstant('Read Only'), checked: selectedItem.isReadonly, cssClass: 'e-pv-properties-form-field-checkbox' }, readOnly);
        if (this.pdfViewer.selectedItems.formFields[0].formFieldAnnotationType === 'Checkbox' || this.pdfViewer.selectedItems.formFields[0].formFieldAnnotationType === 'RadioButton') {
            var checkedState = createElement('input', { className: 'e-pv-properties-checkbox-checked-input e-input' });
            checkboxMainDiv.appendChild(checkedState);
            this.formFieldChecked = new CheckBox({ label: this.pdfViewer.localeObj.getConstant('Checked'), cssClass: 'e-pv-properties-form-field-checkbox', checked: selectedItem.isChecked || selectedItem.isSelected, change: this.checkBoxChange.bind(this) }, checkedState);
        }
        var required = createElement('input', { className: 'e-pv-properties-checkbox-required-input e-input' });
        checkboxMainDiv.appendChild(required);
        this.formFieldRequired = new CheckBox({ label: this.pdfViewer.localeObj.getConstant('Required'), checked: selectedItem.isRequired, cssClass: 'e-pv-properties-form-field-checkbox' }, required);
        var showPrinting = createElement('input', { className: 'e-pv-properties-checkbox-printing-input e-input' });
        checkboxMainDiv.appendChild(showPrinting);
        this.formFieldPrinting = new CheckBox({ label: this.pdfViewer.localeObj.getConstant('Show Printing'), checked: selectedItem.isPrint, cssClass: 'e-pv-properties-form-field-checkbox' }, showPrinting);
        if (selectedItem.formFieldAnnotationType === 'Textbox') {
            var multilineTextbox = createElement('input', { className: 'e-pv-properties-checkbox-multiline-input e-input' });
            checkboxMainDiv.appendChild(multilineTextbox);
            this.formFieldMultiline = new CheckBox({ label: this.pdfViewer.localeObj.getConstant('Multiline'), checked: selectedItem.isMultiline, cssClass: 'e-pv-properties-form-field-checkbox', change: this.multilineCheckboxChange.bind(this) }, multilineTextbox);
        }
        generalPropertiesDiv.appendChild(checkboxMainDiv);
        return generalPropertiesDiv;
    };
    FormDesigner.prototype.checkBoxChange = function (args) {
        this.checkboxCheckedState = args.checked;
    };
    FormDesigner.prototype.multilineCheckboxChange = function (args) {
        this.multilineCheckboxCheckedState = true;
    };
    FormDesigner.prototype.setToolTip = function (tooltipContent, targetElement) {
        //initialize tooltip component
        var tooltip = new Tooltip({
            content: initializeCSPTemplate(function () { return tooltipContent; })
        });
        // render initialized tooltip
        tooltip.appendTo(targetElement);
        tooltip.beforeOpen = this.tooltipBeforeOpen.bind(this);
    };
    FormDesigner.prototype.tooltipBeforeOpen = function (args) {
        var currentFormField = this.pdfViewer.nameTable[args.target.id.split('_')[0]];
        if (!isNullOrUndefined(currentFormField)) {
            args.element.children[0].innerHTML = currentFormField.tooltip;
        }
    };
    FormDesigner.prototype.createAppearanceProperties = function () {
        var selectedItem = this.pdfViewer.selectedItems.formFields ? this.pdfViewer.selectedItems.formFields[0] : null;
        var fontFamilyItems = ['Helvetica', 'Courier', 'Times New Roman', 'Symbol', 'ZapfDingbats'];
        var fontSizeItems = ['6px', '8px', '10px', '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px', '40px'];
        var elementID = this.pdfViewer.element.id;
        var appearancePropertiesDiv = createElement('div', { id: elementID + '_formatting_text_prop_appearance' });
        var formatTextStyleContainer = createElement('div', { className: 'e-pv-properties-format-text-style-prop' });
        appearancePropertiesDiv.appendChild(formatTextStyleContainer);
        this.createLabelElement(this.pdfViewer.localeObj.getConstant('Formatting'), formatTextStyleContainer, true, 'e-pv-properties-formfield-label', elementID + '_properties_formfield_formatting');
        var fontItemsContainer = createElement('div', { className: 'e-pv-properties-font-items-container' });
        var fontFamilyDropdownContainer = createElement('div', { className: 'e-pv-properties-font-family-container' });
        var formatdropdownContainer = createElement('input', { className: 'e-pv-properties-format-font-family-prop' });
        fontFamilyDropdownContainer.appendChild(formatdropdownContainer);
        fontItemsContainer.appendChild(fontFamilyDropdownContainer);
        this.formFieldFontFamily = new DropDownList({ dataSource: fontFamilyItems, value: this.getFontFamily(selectedItem.fontFamily) ? selectedItem.fontFamily : 'Helvetica', cssClass: 'e-pv-properties-formfield-fontfamily' }, formatdropdownContainer);
        this.setToolTip(this.pdfViewer.localeObj.getConstant('Font family'), fontFamilyDropdownContainer);
        var fontSizeContainer = createElement('div', { className: 'e-pv-properties-font-size-container' });
        var fontSizeDropdownContainer = createElement('input', { className: 'e-pv-properties-format-font-family-prop' });
        fontSizeContainer.appendChild(fontSizeDropdownContainer);
        fontItemsContainer.appendChild(fontSizeContainer);
        this.formFieldFontSize = new DropDownList({ dataSource: fontSizeItems, value: selectedItem.fontSize + 'px', cssClass: 'e-pv-properties-formfield-fontsize' }, fontSizeDropdownContainer);
        this.setToolTip(this.pdfViewer.localeObj.getConstant('Font size'), fontSizeContainer);
        var fontStyleContainer = createElement('div', { className: 'e-pv-properties-form-field-font-style' });
        fontStyleContainer.onclick = this.fontStyleClicked.bind(this);
        fontStyleContainer.appendChild(this.addClassFontItem('_formField_bold', 'e-pv-bold-icon', selectedItem.font.isBold));
        fontStyleContainer.appendChild(this.addClassFontItem('_formField_italic', 'e-pv-italic-icon', selectedItem.font.isItalic));
        fontStyleContainer.appendChild(this.addClassFontItem('_formField_underline_textinput', 'e-pv-underlinetext-icon', selectedItem.font.isUnderline));
        // eslint-disable-next-line max-len
        fontStyleContainer.appendChild(this.addClassFontItem('_formField_strikeout', 'e-pv-strikeout-icon', selectedItem.font.isStrikeout));
        fontItemsContainer.appendChild(fontStyleContainer);
        this.getFontStyle(selectedItem.font);
        appearancePropertiesDiv.appendChild(fontItemsContainer);
        var fontColorContainer = createElement('div', { className: 'e-pv-properties-font-color-container' });
        var fontAlignContainer = createElement('div', { className: 'e-pv-properties-form-field-font-align' });
        fontAlignContainer.onclick = this.fontAlignClicked.bind(this);
        var alignment = selectedItem.alignment.toLowerCase();
        fontAlignContainer.appendChild(this.addClassFontItem('_formField_left_align', 'e-pv-left-align-icon', alignment === 'left' ? true : false));
        fontAlignContainer.appendChild(this.addClassFontItem('_formField_center_align', 'e-pv-center-align-icon', alignment === 'center' ? true : false));
        fontAlignContainer.appendChild(this.addClassFontItem('_formField_right_align', 'e-pv-right-align-icon', alignment === 'right' ? true : false));
        this.getAlignment(alignment);
        fontColorContainer.appendChild(fontAlignContainer);
        this.fontColorElement = createElement('div', { className: 'e-pv-formfield-textcolor-icon', id: this.pdfViewer.element.id + 'formField_textColor' });
        this.fontColorElement.setAttribute('role', 'combobox');
        this.fontColorPalette = this.createColorPicker(this.fontColorElement.id, selectedItem.color);
        selectedItem.color !== 'black' ? this.fontColorValue = selectedItem.color : null;
        this.fontColorPalette.change = this.onFontColorChange.bind(this);
        this.fontColorDropDown = this.createDropDownButton(this.fontColorElement, 'e-pv-annotation-textcolor-icon', this.fontColorPalette.element.parentElement);
        fontColorContainer.appendChild(this.fontColorElement);
        this.setToolTip(this.pdfViewer.localeObj.getConstant('Font color'), this.fontColorDropDown.element);
        this.updateColorInIcon(this.fontColorElement, this.pdfViewer.selectedItems.formFields[0].color);
        if (selectedItem.formFieldAnnotationType === 'Checkbox' || selectedItem.formFieldAnnotationType === 'RadioButton') {
            this.fontColorPalette.disabled = true;
            this.fontColorDropDown.disabled = true;
            this.fontColorElement.style.pointerEvents = 'none';
            this.fontColorElement.style.opacity = '0.5';
            fontAlignContainer.style.pointerEvents = 'none';
            fontAlignContainer.style.opacity = '0.5';
            this.formFieldFontSize.enabled = false;
            this.formFieldFontFamily.enabled = false;
            fontFamilyDropdownContainer.style.pointerEvents = 'none';
            fontSizeContainer.style.pointerEvents = 'none';
            fontStyleContainer.style.pointerEvents = 'none';
            fontStyleContainer.style.opacity = '0.5';
        }
        var maxLengthGroup = createElement('div', { className: 'e-pv-formfield-maxlength-group', id: this.pdfViewer.element.id + 'formField_maxlength_group' });
        var maxLengthContainer = createElement('div', { className: 'e-pv-formfield-maxlength-icon', id: this.pdfViewer.element.id + 'formField_maxlength' });
        maxLengthGroup.appendChild(maxLengthContainer);
        this.createLabelElement(this.pdfViewer.localeObj.getConstant('Max Length'), maxLengthContainer, true, 'e-pv-properties-formfield-label', elementID + '_properties_formfield_maxlength');
        var maxLengthDropdownContainer = createElement('div', { className: 'e-pv-formfield-maxlength', id: this.pdfViewer.element.id + 'formField_maxlength_container' });
        var maxLengthItemDropdown = createElement('input', { className: 'e-pv-formfield-maxlength-input e-input' });
        maxLengthItemDropdown.setAttribute('aria-label', 'Max Length');
        maxLengthDropdownContainer.appendChild(maxLengthItemDropdown);
        maxLengthGroup.appendChild(maxLengthDropdownContainer);
        // Render the Numeric Textbox
        this.maxLengthItem = new NumericTextBox({ format: 'n', value: selectedItem.maxLength !== 0 ? selectedItem.maxLength : 0, min: 0 }, maxLengthItemDropdown);
        fontColorContainer.appendChild(maxLengthGroup);
        this.setToolTip(this.pdfViewer.localeObj.getConstant('Max Length'), this.maxLengthItem.element);
        if (selectedItem.formFieldAnnotationType !== 'Textbox' && selectedItem.formFieldAnnotationType !== 'PasswordField') {
            this.maxLengthItem.enabled = false;
            maxLengthContainer.style.pointerEvents = 'none';
        }
        appearancePropertiesDiv.appendChild(fontColorContainer);
        var colorContainer = createElement('div', { className: 'e-pv-properties-color-container-style-prop' });
        var backgroundColorContainer = createElement('div', { className: 'e-pv-properties-fill-color-style-prop' });
        appearancePropertiesDiv.appendChild(backgroundColorContainer);
        this.createLabelElement(this.pdfViewer.localeObj.getConstant('Fill'), backgroundColorContainer, true, 'e-pv-properties-formfield-label', elementID + '_properties_formfield_fontcolor');
        this.colorDropDownElement = createElement('div', { className: 'e-pv-formfield-fontcolor-icon', id: this.pdfViewer.element.id + 'formField_fontColor' });
        this.colorDropDownElement.setAttribute('role', 'combobox');
        this.colorPalette = this.createColorPicker(this.colorDropDownElement.id, selectedItem.backgroundColor);
        this.colorPalette.change = this.onColorPickerChange.bind(this);
        // eslint-disable-next-line max-len
        this.colorDropDown = this.createDropDownButton(this.colorDropDownElement, 'e-pv-annotation-color-icon', this.colorPalette.element.parentElement);
        this.setToolTip(this.pdfViewer.localeObj.getConstant('Fill Color'), this.colorDropDown.element);
        backgroundColorContainer.appendChild(this.colorDropDownElement);
        colorContainer.appendChild(backgroundColorContainer);
        this.updateColorInIcon(this.colorDropDownElement, this.pdfViewer.selectedItems.formFields[0].backgroundColor);
        var strokeColorContainer = createElement('div', { className: 'e-pv-properties-stroke-color-style-prop' });
        this.createLabelElement(this.pdfViewer.localeObj.getConstant('Border'), strokeColorContainer, true, 'e-pv-properties-formfield-label', elementID + '_properties_formfield_strokecolor');
        this.strokeDropDownElement = createElement('div', { className: 'e-pv-formfield-strokecolor-icon', id: this.pdfViewer.element.id + 'formField_strokeColor' });
        this.strokeDropDownElement.setAttribute('role', 'combobox');
        this.strokeColorPicker = this.createColorPicker(this.strokeDropDownElement.id, selectedItem.borderColor);
        this.strokeColorPicker.change = this.onStrokePickerChange.bind(this);
        // eslint-disable-next-line max-len
        this.strokeDropDown = this.createDropDownButton(this.strokeDropDownElement, 'e-pv-annotation-stroke-icon', this.strokeColorPicker.element.parentElement);
        this.setToolTip(this.pdfViewer.localeObj.getConstant('Border Color'), this.strokeDropDown.element);
        strokeColorContainer.appendChild(this.strokeDropDownElement);
        colorContainer.appendChild(strokeColorContainer);
        this.updateColorInIcon(this.strokeDropDownElement, this.pdfViewer.selectedItems.formFields[0].borderColor);
        var strokeThicknessContainer = createElement('div', { className: 'e-pv-properties-stroke-thickness-style-prop' });
        this.createLabelElement(this.pdfViewer.localeObj.getConstant('Thickness'), strokeThicknessContainer, true, 'e-pv-properties-formfield-label', elementID + '_properties_formfield_strokethickness');
        this.thicknessElement = createElement('div', { className: 'e-pv-formfield-strokethickness-icon', id: this.pdfViewer.element.id + 'formField_strokethickness' });
        this.thicknessElement.setAttribute('role', 'combobox');
        var thicknessContainer = this.createThicknessSlider(this.thicknessElement.id);
        // eslint-disable-next-line max-len
        this.thicknessDropDown = this.createDropDownButton(this.thicknessElement, 'e-pv-annotation-thickness-icon', thicknessContainer);
        this.thicknessDropDown.beforeOpen = this.thicknessDropDownBeforeOpen.bind(this);
        this.setToolTip(this.pdfViewer.localeObj.getConstant('Thickness'), this.thicknessDropDown.element);
        this.thicknessSlider.change = this.thicknessChange.bind(this);
        this.thicknessSlider.changed = this.thicknessChange.bind(this);
        strokeThicknessContainer.appendChild(this.thicknessElement);
        colorContainer.appendChild(strokeThicknessContainer);
        appearancePropertiesDiv.appendChild(colorContainer);
        return appearancePropertiesDiv;
    };
    FormDesigner.prototype.thicknessChange = function (args) {
        if (this.pdfViewer.selectedItems.formFields.length === 1) {
            this.formFieldBorderWidth = args.value;
            this.updateThicknessIndicator();
        }
    };
    FormDesigner.prototype.thicknessDropDownBeforeOpen = function () {
        if (this.pdfViewer.selectedItems.formFields.length === 1) {
            this.formFieldBorderWidth = this.pdfViewer.selectedItems.formFields[0].thickness.toString();
            this.thicknessSlider.value = this.pdfViewer.selectedItems.formFields[0].thickness;
        }
        this.updateThicknessIndicator();
    };
    FormDesigner.prototype.updateThicknessIndicator = function () {
        this.thicknessIndicator.textContent = this.thicknessSlider.value + ' pt';
    };
    FormDesigner.prototype.createOptionProperties = function () {
        var _this = this;
        var elementID = this.pdfViewer.element.id;
        var optionPropertiesDiv = createElement('div', { id: elementID + '_option_prop_appearance' });
        var listItemAddContainer = createElement('div', { className: 'e-pv-properties-form-field-list-add-div' });
        var formFieldListItemMainDiv = createElement('div', { className: 'e-pv-properties-form-field-list-item-main-div' });
        // eslint-disable-next-line max-len
        this.createLabelElement(this.pdfViewer.localeObj.getConstant('List Item'), formFieldListItemMainDiv, true, 'e-pv-properties-formfield-label', elementID + '_properties_formfield_listitem');
        var formFieldListItemDiv = createElement('div', { className: 'e-pv-properties-list-item-edit-prop' });
        var formFieldListItemContainer = createElement('input', { className: 'e-pv-properties-list-item-input e-input' });
        formFieldListItemContainer.setAttribute('aria-label', 'Item Name');
        formFieldListItemContainer.addEventListener('keyup', function (args) {
            _this.formFieldAddButton.disabled = true;
            _this.formFieldListItem.value = args.target.value;
            if (args.target && args.target.value) {
                if (_this.formFieldListItemCollection.length > 0) {
                    for (var i = 0; i < _this.formFieldListItemCollection.length; i++) {
                        var itemName = _this.formFieldListItemCollection[i];
                        if (itemName === args.target.value) {
                            _this.formFieldAddButton.disabled = true;
                            break;
                        }
                        else {
                            _this.formFieldAddButton.disabled = false;
                        }
                    }
                }
                else {
                    _this.formFieldAddButton.disabled = false;
                }
            }
        });
        formFieldListItemDiv.appendChild(formFieldListItemContainer);
        formFieldListItemMainDiv.appendChild(formFieldListItemDiv);
        // eslint-disable-next-line max-len
        this.formFieldListItem = new TextBox({ type: "text", cssClass: 'e-pv-properties-formfield-listitem' }, formFieldListItemContainer);
        listItemAddContainer.appendChild(formFieldListItemMainDiv);
        optionPropertiesDiv.appendChild(listItemAddContainer);
        var buttonDiv = createElement('div', { className: 'e-pv-properties-form-field-list-btn-div' });
        var buttonAddInput = createElement('button', { className: 'e-btn' });
        buttonAddInput.addEventListener('click', this.addListItemOnClick.bind(this));
        buttonDiv.appendChild(buttonAddInput);
        this.formFieldAddButton = new Button({ content: this.pdfViewer.localeObj.getConstant('Add'), disabled: true, cssClass: 'e-pv-properties-dropdown-btn' }, buttonAddInput);
        listItemAddContainer.appendChild(buttonDiv);
        var exportValueContainer = createElement('div', { className: 'e-pv-properties-form-field-export-value-div' });
        var formFieldexportValueMainDiv = createElement('div', { className: 'e-pv-properties-form-field-export-value-main-div' });
        this.createLabelElement(this.pdfViewer.localeObj.getConstant('Export Value'), formFieldexportValueMainDiv, true, 'e-pv-properties-formfield-label', elementID + '_properties_formfield_exportValue');
        var formFieldExportItemDiv = createElement('div', { className: 'e-pv-properties-export-value-edit-prop' });
        var formFieldExportItemContainer = createElement('input', { className: 'e-pv-properties-export-value-input e-input' });
        formFieldExportItemContainer.setAttribute('aria-label', 'Item Value');
        formFieldExportItemDiv.appendChild(formFieldExportItemContainer);
        formFieldexportValueMainDiv.appendChild(formFieldExportItemDiv);
        // eslint-disable-next-line max-len
        this.formFieldListItem = new TextBox({ type: "text", cssClass: 'e-pv-properties-formfield-exportvalue' }, formFieldExportItemContainer);
        exportValueContainer.appendChild(formFieldexportValueMainDiv);
        optionPropertiesDiv.appendChild(exportValueContainer);
        var dropdownListItemContainer = createElement('div', { className: 'e-pv-properties-form-field-option-dropdown-list-div' });
        var formFieldDropdownListMainDiv = createElement('div', { className: 'e-pv-properties-form-field-option-dropdown-list-item-div' });
        var selectedElement = this.pdfViewer.selectedItems.formFields[0];
        if (selectedElement.formFieldAnnotationType === 'DropdownList') {
            // eslint-disable-next-line max-len
            this.createLabelElement(this.pdfViewer.localeObj.getConstant('Dropdown Item List'), formFieldDropdownListMainDiv, true, 'e-pv-properties-formfield-label', elementID + '_properties_formfield_dropdown_listitem');
        }
        else {
            // eslint-disable-next-line max-len
            this.createLabelElement(this.pdfViewer.localeObj.getConstant('List Box Item List'), formFieldDropdownListMainDiv, true, 'e-pv-properties-formfield-label', elementID + '_properties_formfield_dropdown_listitem');
        }
        dropdownListItemContainer.appendChild(formFieldDropdownListMainDiv);
        var btnTextAreaContainer = createElement('div', { className: 'e-pv-properties-form-field-btn-textarea-container' });
        var textAreaContainer = createElement('div', { className: 'e-pv-properties-formfield-textarea', styles: 'width:300px;height:123px;border:1px solid #E0E0E0;margin-right:15px;overflow:auto' });
        var listElement = createElement('ul', { id: this.pdfViewer.element.id + '_ul_list_item', className: 'e-pv-form-designer-ul-list-items' });
        var listCount = this.createListElement(listElement);
        textAreaContainer.appendChild(listElement);
        btnTextAreaContainer.appendChild(textAreaContainer);
        var buttonGroup = createElement('div', { className: 'e-pv-properties-form-field-group-btn-div' });
        var deleteButtonDiv = createElement('div', { className: 'e-pv-properties-form-field-delete-btn-div' });
        var buttonDeleteInput = createElement('button', { className: 'e-btn' });
        buttonDeleteInput.addEventListener('click', this.deleteListItem.bind(this));
        deleteButtonDiv.appendChild(buttonDeleteInput);
        this.formFieldDeleteButton = new Button({ content: this.pdfViewer.localeObj.getConstant('Delete Item'), disabled: listCount > 0 ? false : true, cssClass: 'e-pv-properties-dropdown-btn' }, buttonDeleteInput);
        buttonGroup.appendChild(deleteButtonDiv);
        var upButtonDiv = createElement('div', { className: 'e-pv-properties-form-field-up-btn-div' });
        var buttonUpInput = createElement('button', { className: 'e-btn' });
        buttonUpInput.addEventListener('click', this.moveUpListItem.bind(this));
        upButtonDiv.appendChild(buttonUpInput);
        this.formFieldUpButton = new Button({ content: this.pdfViewer.localeObj.getConstant('Up'), disabled: listCount > 1 ? false : true, cssClass: 'e-pv-properties-dropdown-btn' }, buttonUpInput);
        buttonGroup.appendChild(upButtonDiv);
        var downButtonDiv = createElement('div', { className: 'e-pv-properties-form-field-down-btn-div' });
        var buttonDownInput = createElement('button', { className: 'e-btn' });
        buttonDownInput.addEventListener('click', this.moveDownListItem.bind(this));
        downButtonDiv.appendChild(buttonDownInput);
        this.formFieldDownButton = new Button({ content: this.pdfViewer.localeObj.getConstant('Down'), disabled: true, cssClass: 'e-pv-properties-dropdown-btn' }, buttonDownInput);
        buttonGroup.appendChild(downButtonDiv);
        btnTextAreaContainer.appendChild(buttonGroup);
        dropdownListItemContainer.appendChild(btnTextAreaContainer);
        optionPropertiesDiv.appendChild(dropdownListItemContainer);
        return optionPropertiesDiv;
    };
    FormDesigner.prototype.addListItemOnClick = function () {
        var dropdownValue = this.formFieldListItem.value;
        this.formFieldListItemCollection.push(dropdownValue);
        var ulElement = document.getElementById(this.pdfViewer.element.id + '_ul_list_item');
        if (ulElement.children && ulElement.children.length > 0) {
            for (var i = 0; i < ulElement.children.length; i++) {
                var element = ulElement.children[i];
                if (element.classList.contains('e-pv-li-select')) {
                    element.classList.remove('e-pv-li-select');
                }
            }
        }
        var createLiElement = createElement('li', { className: 'e-pv-formfield-li-element' });
        createLiElement.addEventListener('click', this.listItemOnClick.bind(this));
        createLiElement.innerHTML = dropdownValue;
        createLiElement.classList.add('e-pv-li-select');
        ulElement.appendChild(createLiElement);
        this.formFieldDeleteButton.disabled = false;
        this.formFieldAddButton.disabled = true;
        if (createLiElement.previousElementSibling) {
            this.formFieldUpButton.disabled = false;
        }
        if (!createLiElement.nextElementSibling) {
            this.formFieldDownButton.disabled = true;
        }
    };
    FormDesigner.prototype.listItemOnClick = function (args) {
        var ulElement = document.getElementById(this.pdfViewer.element.id + '_ul_list_item');
        if (ulElement.children && ulElement.children.length > 0) {
            for (var i = 0; i < ulElement.children.length; i++) {
                var element = ulElement.children[i];
                if (element.classList.contains('e-pv-li-select')) {
                    element.classList.remove('e-pv-li-select');
                }
            }
        }
        if (args.target) {
            args.target.classList.add('e-pv-li-select');
        }
        if (args.target.nextElementSibling) {
            this.formFieldDownButton.disabled = false;
        }
        else {
            this.formFieldDownButton.disabled = true;
        }
        if (args.target.previousElementSibling) {
            this.formFieldUpButton.disabled = false;
        }
        else {
            this.formFieldUpButton.disabled = true;
        }
    };
    FormDesigner.prototype.deleteListItem = function () {
        var ulElement = document.getElementById(this.pdfViewer.element.id + '_ul_list_item');
        if (ulElement.children && ulElement.children.length > 0) {
            for (var i = 0; i < ulElement.children.length; i++) {
                var element = ulElement.children[i];
                if (element.classList.contains('e-pv-li-select')) {
                    element.classList.remove('e-pv-li-select');
                    this.formFieldListItemCollection.splice(i, 1);
                    if (element.previousElementSibling) {
                        element.previousElementSibling.classList.add('e-pv-li-select');
                        if (!element.previousElementSibling.previousElementSibling) {
                            this.formFieldUpButton.disabled = true;
                        }
                    }
                    else if (element.nextElementSibling) {
                        element.nextElementSibling.classList.add('e-pv-li-select');
                        if (!element.nextElementSibling.nextElementSibling) {
                            this.formFieldDownButton.disabled = true;
                        }
                    }
                    element.remove();
                }
            }
        }
        if (ulElement.children && ulElement.children.length === 0) {
            this.formFieldDeleteButton.disabled = true;
            this.formFieldUpButton.disabled = true;
            this.formFieldDownButton.disabled = true;
        }
        if (ulElement.children && ulElement.children.length === 1) {
            this.formFieldDeleteButton.disabled = false;
            this.formFieldUpButton.disabled = true;
            this.formFieldDownButton.disabled = true;
        }
    };
    FormDesigner.prototype.moveUpListItem = function () {
        var ulElement = document.getElementById(this.pdfViewer.element.id + '_ul_list_item');
        if (ulElement.children && ulElement.children.length > 0) {
            for (var i = 0; i < ulElement.children.length; i++) {
                var element = ulElement.children[i];
                if (element.classList.contains('e-pv-li-select')) {
                    if (element.previousElementSibling) {
                        element.parentNode.insertBefore(element, element.previousElementSibling);
                        if (!element.previousElementSibling)
                            this.formFieldUpButton.disabled = true;
                    }
                    else {
                        this.formFieldUpButton.disabled = true;
                    }
                    if (element.nextElementSibling) {
                        this.formFieldDownButton.disabled = false;
                    }
                }
            }
        }
    };
    FormDesigner.prototype.moveDownListItem = function () {
        var element;
        var ulElement = document.getElementById(this.pdfViewer.element.id + '_ul_list_item');
        if (ulElement.children && ulElement.children.length > 0) {
            for (var i = 0; i < ulElement.children.length; i++) {
                element = ulElement.children[i];
                if (element.classList.contains('e-pv-li-select')) {
                    if (element.nextElementSibling) {
                        element.parentNode.insertBefore(element.nextElementSibling, element);
                        break;
                    }
                    else {
                        this.formFieldDownButton.disabled = true;
                    }
                }
            }
        }
        if (!element.nextElementSibling) {
            this.formFieldDownButton.disabled = true;
        }
        if (element.previousElementSibling) {
            this.formFieldUpButton.disabled = false;
        }
    };
    FormDesigner.prototype.createListElement = function (ulElement) {
        var selectedElement = this.pdfViewer.selectedItems.formFields[0];
        if (selectedElement) {
            if (selectedElement.options && selectedElement.options.length > 0) {
                for (var i = 0; i < selectedElement.options.length; i++) {
                    var dropdownValue = selectedElement.options[i].itemName;
                    if (this.formFieldListItemCollection[i] !== selectedElement.options[i].itemName) {
                        this.formFieldListItemCollection.push(dropdownValue);
                        var createLiElement = createElement('li', { className: 'e-pv-formfield-li-element' });
                        createLiElement.addEventListener('click', this.listItemOnClick.bind(this));
                        createLiElement.addEventListener('focus', this.focusFormFields.bind(this));
                        createLiElement.addEventListener('blur', this.blurFormFields.bind(this));
                        createLiElement.innerHTML = dropdownValue;
                        ulElement.appendChild(createLiElement);
                    }
                }
                ulElement.children[ulElement.children.length - 1].classList.add('e-pv-li-select');
            }
        }
        return ulElement.children.length;
    };
    FormDesigner.prototype.createThicknessSlider = function (idString) {
        var outerContainer = createElement('div', { className: 'e-pv-annotation-thickness-popup-container' });
        document.body.appendChild(outerContainer);
        var label = createElement('span', { id: idString + '_label', className: 'e-pv-annotation-thickness-label' });
        label.textContent = this.pdfViewer.localeObj.getConstant('Line Thickness');
        var sliderElement = createElement('div', { id: idString + '_slider' });
        this.thicknessSlider = new Slider({ type: 'MinRange', cssClass: 'e-pv-annotation-thickness-slider', max: 12, min: 0 });
        // eslint-disable-next-line max-len
        this.thicknessIndicator = createElement('div', { id: idString + '_thickness_indicator', className: 'e-pv-annotation-thickness-indicator' });
        this.thicknessIndicator.textContent = '0 pt';
        if (!this.pdfViewer.enableRtl) {
            outerContainer.appendChild(label);
            outerContainer.appendChild(sliderElement);
            this.thicknessSlider.appendTo(sliderElement);
            outerContainer.appendChild(this.thicknessIndicator);
        }
        else {
            outerContainer.appendChild(this.thicknessIndicator);
            outerContainer.appendChild(sliderElement);
            this.thicknessSlider.enableRtl = true;
            this.thicknessSlider.appendTo(sliderElement);
            outerContainer.appendChild(label);
        }
        this.thicknessSlider.element.parentElement.classList.add('e-pv-annotation-thickness-slider-container');
        return outerContainer;
    };
    FormDesigner.prototype.createColorPicker = function (idString, color) {
        var inputElement = createElement('input', { id: idString + '_target' });
        document.body.appendChild(inputElement);
        var colorPicker = new ColorPicker({
            inline: true, mode: 'Palette', cssClass: 'e-show-value', enableOpacity: false,
            value: color, showButtons: false, modeSwitcher: false
        });
        if (this.pdfViewer.enableRtl) {
            colorPicker.enableRtl = true;
        }
        colorPicker.appendTo(inputElement);
        return colorPicker;
    };
    FormDesigner.prototype.fontStyleClicked = function (args) {
        if (args.target) {
            if (args.target.id.indexOf("formField_bold") !== -1) {
                var item = (args.target.id.indexOf("formField_bold_div") !== -1) ? args.target : args.target.parentElement;
                if (item.classList.contains('e-pv-li-select'))
                    this.isBold = true;
                this.isBold = !this.isBold;
                if (this.isBold) {
                    this.formFieldBold = "bold";
                    item.classList.add('e-pv-li-select');
                }
                else {
                    this.formFieldBold = "normal";
                    item.classList.remove('e-pv-li-select');
                }
            }
            else if (args.target.id.indexOf("formField_italic") !== -1) {
                var item = (args.target.id.indexOf("formField_italic_div") !== -1) ? args.target : args.target.parentElement;
                if (item.classList.contains('e-pv-li-select'))
                    this.isItalic = true;
                this.isItalic = !this.isItalic;
                if (this.isItalic) {
                    this.formFieldItalic = "italic";
                    item.classList.add('e-pv-li-select');
                }
                else {
                    this.formFieldItalic = "normal";
                    item.classList.remove('e-pv-li-select');
                }
            }
            else if (args.target.id.indexOf("formField_underline") !== -1) {
                var item = (args.target.id.indexOf("formField_underline_textinput_div") !== -1) ? args.target : args.target.parentElement;
                if (item.classList.contains('e-pv-li-select'))
                    this.isUnderline = true;
                this.isUnderline = !this.isUnderline;
                if (this.isUnderline) {
                    this.formFieldUnderline = "underline";
                    this.isStrikeThrough = false;
                    item.classList.add('e-pv-li-select');
                }
                else {
                    this.formFieldUnderline = "none";
                    item.classList.remove('e-pv-li-select');
                }
            }
            else if (args.target.id.indexOf("formField_strikeout") !== -1) {
                var item = (args.target.id.indexOf("formField_strikeout_div") !== -1) ? args.target : args.target.parentElement;
                if (item.classList.contains('e-pv-li-select'))
                    this.isStrikeThrough = true;
                this.isStrikeThrough = !this.isStrikeThrough;
                if (this.isStrikeThrough) {
                    this.formFieldStrikeOut = "line-through";
                    this.isUnderline = false;
                    item.classList.add('e-pv-li-select');
                }
                else {
                    this.formFieldStrikeOut = "none";
                    item.classList.remove('e-pv-li-select');
                }
            }
        }
    };
    FormDesigner.prototype.clearFontAlignIconSelection = function (currentElement) {
        for (var i = 0; i < currentElement.children.length; i++) {
            if (currentElement.children[i].classList.contains('e-pv-li-select')) {
                currentElement.children[i].classList.remove('e-pv-li-select');
            }
        }
    };
    FormDesigner.prototype.fontAlignClicked = function (args) {
        if (args.target) {
            args.target.classList.remove('e-pv-li-select');
            if (args.target.id.indexOf("_formField_left_align") !== -1) {
                var item = (args.target.id.indexOf("_formField_left_align_div") !== -1) ? args.target : args.target.parentElement;
                this.formFieldAlign = "left";
                this.clearFontAlignIconSelection(args.currentTarget);
                item.classList.add('e-pv-li-select');
            }
            else if (args.target.id.indexOf("_formField_right_align") !== -1) {
                var item = (args.target.id.indexOf("_formField_right_align_div") !== -1) ? args.target : args.target.parentElement;
                this.formFieldAlign = "right";
                this.clearFontAlignIconSelection(args.currentTarget);
                item.classList.add('e-pv-li-select');
            }
            else {
                var item = (args.target.id.indexOf("_formField_center_align_div") !== -1) ? args.target : args.target.parentElement;
                this.formFieldAlign = "center";
                this.clearFontAlignIconSelection(args.currentTarget);
                item.classList.add('e-pv-li-select');
            }
        }
    };
    FormDesigner.prototype.onFontColorChange = function (args) {
        this.fontColorValue = (args.currentValue.hex === '') ? '#ffffff00' : args.currentValue.hex;
        this.updateColorInIcon(this.fontColorElement, this.fontColorValue);
        this.fontColorDropDown.toggle();
    };
    FormDesigner.prototype.onColorPickerChange = function (args) {
        this.backgroundColorValue = (args.currentValue.hex === '') ? '#ffffff00' : args.currentValue.hex;
        this.updateColorInIcon(this.colorDropDownElement, this.backgroundColorValue);
        this.colorDropDown.toggle();
    };
    /**
     * @private
     */
    FormDesigner.prototype.updateColorInIcon = function (element, color) {
        element.childNodes[0].style.borderBottomColor = color;
    };
    FormDesigner.prototype.onStrokePickerChange = function (args) {
        this.borderColorValue = (args.currentValue.hex === '') ? '#ffffff00' : args.currentValue.hex;
        this.updateColorInIcon(this.strokeDropDownElement, this.borderColorValue);
        this.strokeDropDown.toggle();
    };
    FormDesigner.prototype.createDropDownButton = function (element, iconClass, target) {
        var popup = document.getElementById(target.id + "-popup");
        if (popup) {
            popup.remove();
        }
        // eslint-disable-next-line max-len
        var dropDownButton = new DropDownButton({ iconCss: iconClass + ' e-pv-icon', target: target });
        if (this.pdfViewer.enableRtl) {
            dropDownButton.enableRtl = true;
        }
        dropDownButton.appendTo(element);
        return dropDownButton;
    };
    /**
     * @private
    */
    FormDesigner.prototype.addClassFontItem = function (idString, className, isSelectedStyle) {
        var element = createElement('div', { id: this.pdfViewer.element.id + idString + '_div' });
        element.classList.add(className + "-div");
        var spanElement = createElement('span', { id: this.pdfViewer.element.id + idString + '_span' });
        spanElement.classList.add(className);
        spanElement.classList.add("e-pv-icon");
        switch (className) {
            case 'e-pv-bold-icon':
                this.setToolTip(this.pdfViewer.localeObj.getConstant('Bold'), element);
                break;
            case 'e-pv-italic-icon':
                this.setToolTip(this.pdfViewer.localeObj.getConstant('Italic'), element);
                break;
            case 'e-pv-underlinetext-icon':
                this.setToolTip(this.pdfViewer.localeObj.getConstant('Underlines'), element);
                break;
            case 'e-pv-strikeout-icon':
                this.setToolTip(this.pdfViewer.localeObj.getConstant('Strikethroughs'), element);
                break;
            case 'e-pv-left-align-icon':
                this.setToolTip(this.pdfViewer.localeObj.getConstant('Align left'), element);
                break;
            case 'e-pv-center-align-icon':
                this.setToolTip(this.pdfViewer.localeObj.getConstant('Center'), element);
                break;
            case 'e-pv-right-align-icon':
                this.setToolTip(this.pdfViewer.localeObj.getConstant('Align right'), element);
                break;
        }
        if (isSelectedStyle)
            element.classList.add('e-pv-li-select');
        element.appendChild(spanElement);
        return element;
    };
    // eslint-disable-next-line max-len
    FormDesigner.prototype.createLabelElement = function (labelText, parentElement, isLabelNeeded, className, idString) {
        var container = createElement('div', { id: idString + '_container', className: className + '-container' });
        var label = null;
        if (isLabelNeeded) {
            label = createElement('div', { id: idString + '_label', className: className });
            label.textContent = labelText;
            container.appendChild(label);
        }
        parentElement.appendChild(label);
    };
    FormDesigner.prototype.setReadOnlyToFormField = function (selectedItem, isReadOnly) {
        for (var i = 0; i < this.pdfViewer.formFieldCollection.length; i++) {
            var formField = this.pdfViewer.formFieldCollection[i];
            if (formField.formFieldAnnotationType === selectedItem.formFieldAnnotationType && formField.name === selectedItem.name && formField.id === selectedItem.id) {
                formField.isReadonly = isReadOnly;
                switch (formField.formFieldAnnotationType) {
                    case 'Textbox':
                    case 'PasswordField':
                    case 'DropdownList':
                    case 'ListBox':
                    case 'SignatureField':
                    case 'InitialField':
                        var inputElement = document.getElementById(formField.id + "_content_html_element").firstElementChild.firstElementChild;
                        this.setReadOnlyToElement(formField, inputElement, isReadOnly);
                        break;
                    case 'RadioButton':
                        var radioButtonDivDivElement = document.getElementById(formField.id + "_content_html_element").firstElementChild.firstElementChild.firstElementChild;
                        this.setReadOnlyToElement(formField, radioButtonDivDivElement, isReadOnly);
                        break;
                    case 'Checkbox':
                        var checkboxDivElement = document.getElementById(formField.id + "_content_html_element").firstElementChild.firstElementChild.lastElementChild;
                        this.setReadOnlyToElement(formField, checkboxDivElement, isReadOnly);
                        break;
                }
            }
        }
    };
    /**
     * @private
    */
    FormDesigner.prototype.getFormDesignerSignField = function (signatureFieldCollection) {
        var collectiondata = this.pdfViewer.formFieldCollections;
        var dataCollection;
        for (var i = 0; i < collectiondata.length; i++) {
            dataCollection = collectiondata[i].type;
            if (dataCollection === "SignatureField" || dataCollection === "InitialField") {
                signatureFieldCollection.push(collectiondata[i]);
            }
        }
        return signatureFieldCollection;
    };
    FormDesigner.prototype.setRequiredToFormField = function (selectedItem, isRequired) {
        for (var i = 0; i < this.pdfViewer.formFieldCollection.length; i++) {
            var formField = this.pdfViewer.formFieldCollection[i];
            if (formField.formFieldAnnotationType === selectedItem.formFieldAnnotationType && formField.name === selectedItem.name && formField.id === selectedItem.id) {
                formField.isRequired = isRequired;
                switch (formField.formFieldAnnotationType) {
                    case 'Textbox':
                    case 'PasswordField':
                    case 'DropdownList':
                    case 'SignatureField':
                    case 'InitialField':
                        var inputElement = document.getElementById(formField.id + "_content_html_element").firstElementChild.firstElementChild;
                        this.setRequiredToElement(formField, inputElement, isRequired);
                        break;
                    case 'RadioButton':
                        var radioButtonDivDivElement = document.getElementById(formField.id + "_content_html_element").firstElementChild.firstElementChild.firstElementChild;
                        this.setRequiredToElement(formField, radioButtonDivDivElement, isRequired);
                        this.updateFormFieldCollections(formField);
                        break;
                    case 'Checkbox':
                        var checkboxDivElement = document.getElementById(formField.id + "_content_html_element").firstElementChild.firstElementChild.lastElementChild;
                        this.setRequiredToElement(formField, checkboxDivElement, isRequired);
                        break;
                    default:
                        break;
                }
            }
        }
    };
    FormDesigner.prototype.setReadOnlyToElement = function (selectedItem, inputElement, isReadOnly) {
        var fillColor = '#daeaf7ff';
        inputElement.disabled = isReadOnly;
        if (isReadOnly) {
            if (selectedItem.formFieldAnnotationType === 'RadioButton') {
                inputElement.parentElement.style.cursor = 'default';
            }
            else if (selectedItem.formFieldAnnotationType === 'SignatureField' || selectedItem.formFieldAnnotationType === 'InitialField') {
                var thickness = !isNullOrUndefined(selectedItem.thickness) ? 1 : selectedItem.thickness;
                inputElement.parentElement.style.borderWidth = thickness;
            }
            else {
                inputElement.style.cursor = 'default';
            }
        }
        if (selectedItem.formFieldAnnotationType === 'RadioButton') {
            inputElement.parentElement.style.backgroundColor = selectedItem.backgroundColor != fillColor ? selectedItem.backgroundColor : 'transparent';
        }
        else if (selectedItem.formFieldAnnotationType === 'SignatureField' || selectedItem.formFieldAnnotationType === 'InitialField') {
            var background = selectedItem.backgroundColor ? selectedItem.backgroundColor : '#FFE48559';
            inputElement.parentElement.style.backgroundColor = this.getSignatureBackground(background);
        }
        inputElement.style.backgroundColor = selectedItem.isReadonly ? (selectedItem.backgroundColor != fillColor ? selectedItem.backgroundColor : 'transparent') : selectedItem.backgroundColor;
        inputElement.style.pointerEvents = selectedItem.isReadonly ? (selectedItem.isMultiline ? 'auto' : 'none') : 'auto';
    };
    FormDesigner.prototype.setRequiredToElement = function (selectedItem, inputElement, isRequired) {
        if (isRequired) {
            inputElement.required = true;
            inputElement.style.border = '1px solid red';
            if (selectedItem.formFieldAnnotationType === 'RadioButton') {
                var thickness = selectedItem.thickness === 0 ? 1 : selectedItem.thickness;
                inputElement.parentElement.style.boxShadow = 'red 0px 0px 0px ' + thickness + 'px';
            }
            else if (selectedItem.formFieldAnnotationType === 'SignatureField' || selectedItem.formFieldAnnotationType === 'InitialField') {
                var thickness = (selectedItem.thickness > 0) ? selectedItem.thickness : 1;
                inputElement.style.border = thickness + 'px solid red';
            }
        }
        else {
            inputElement.required = false;
            if (selectedItem.formFieldAnnotationType === 'SignatureField' || selectedItem.formFieldAnnotationType === 'InitialField') {
                inputElement.style.borderWidth = selectedItem.thickness;
            }
            else {
                inputElement.style.borderWidth = selectedItem.thickness + "px";
            }
            inputElement.style.borderColor = selectedItem.borderColor;
            if (selectedItem.formFieldAnnotationType === 'RadioButton') {
                inputElement.parentElement.style.boxShadow = selectedItem.borderColor + ' 0px 0px 0px ' + selectedItem.thickness + 'px';
            }
        }
    };
    /**
     * @private
    */
    FormDesigner.prototype.destroyPropertiesWindow = function () {
        this.formFieldListItemCollection = [];
        this.formFieldListItemDataSource = [];
        this.formFieldFontFamily = null;
        this.formFieldFontSize = null;
        this.formFieldAlign = null;
        this.fontColorValue = null;
        this.backgroundColorValue = null;
        this.borderColorValue = null;
        this.formFieldBorderWidth = null;
        this.formFieldName = null;
        this.formFieldChecked = null;
        this.formFieldReadOnly = null;
        this.formFieldRequired = null;
        this.formFieldTooltip = null;
        this.formFieldPrinting = null;
        this.formFieldMultiline = null;
        this.formFieldVisibility = null;
        var dialogElement = this.pdfViewerBase.getElement('_properties_window');
        if (dialogElement) {
            dialogElement.parentElement.removeChild(dialogElement);
        }
    };
    /**
     * @private
    */
    FormDesigner.prototype.destroy = function () {
        this.destroyPropertiesWindow();
    };
    FormDesigner.prototype.hex = function (x) {
        return ('0' + x.toString(16)).slice(-2);
    };
    /**
     * @private
    */
    FormDesigner.prototype.getModuleName = function () {
        return 'FormDesigner';
    };
    FormDesigner.prototype.updateAnnotationCanvas = function (canvas, pageWidth, pageHeight, pageNumber) {
        var ratio = this.pdfViewerBase.getZoomRatio();
        canvas.width = pageWidth * ratio;
        canvas.height = pageHeight * ratio;
        canvas.style.width = pageWidth + 'px';
        canvas.style.height = pageHeight + 'px';
        canvas.style.position = 'absolute';
        canvas.style.zIndex = '1';
        this.pdfViewerBase.applyElementStyles(canvas, pageNumber);
    };
    FormDesigner.prototype.getFontFamily = function (fontFamily) {
        var fontFamilyNames = ['Helvetica', 'Courier', 'TimesRoman', 'Symbol', 'ZapfDingbats'];
        return fontFamilyNames.indexOf(fontFamily) > -1 ? true : false;
    };
    FormDesigner.prototype.updateTextFieldSettingProperties = function (drawingObject, isFormDesignerToolbarVisible, isSetFormFieldMode) {
        var textFieldSettings = this.pdfViewer.textFieldSettings;
        if (!isNullOrUndefined(textFieldSettings.isReadOnly) && this.textFieldPropertyChanged.isReadOnlyChanged) {
            drawingObject.isReadonly = textFieldSettings.isReadOnly;
        }
        if (!isNullOrUndefined(textFieldSettings.isRequired) && this.textFieldPropertyChanged.isRequiredChanged) {
            drawingObject.isRequired = textFieldSettings.isRequired;
        }
        if (textFieldSettings.value && this.textFieldPropertyChanged.isValueChanged) {
            drawingObject.value = textFieldSettings.value;
        }
        if ((textFieldSettings.backgroundColor && textFieldSettings.backgroundColor !== 'white') && this.textFieldPropertyChanged.isBackgroundColorChanged) {
            drawingObject.backgroundColor = textFieldSettings.backgroundColor;
        }
        if ((textFieldSettings.borderColor && textFieldSettings.borderColor !== 'black') && this.textFieldPropertyChanged.isBorderColorChanged) {
            drawingObject.borderColor = textFieldSettings.borderColor;
        }
        if ((textFieldSettings.alignment && textFieldSettings.alignment !== 'Left') && this.textFieldPropertyChanged.isAlignmentChanged) {
            drawingObject.alignment = textFieldSettings.alignment;
        }
        if ((textFieldSettings.color && textFieldSettings.color !== 'black') && this.textFieldPropertyChanged.isColorChanged) {
            drawingObject.color = textFieldSettings.color;
        }
        if ((textFieldSettings.fontFamily && textFieldSettings.fontFamily !== 'Helvetica') && this.textFieldPropertyChanged.isFontFamilyChanged) {
            drawingObject.fontFamily = textFieldSettings.fontFamily;
        }
        if ((textFieldSettings.fontSize && textFieldSettings.fontSize !== 10) && this.textFieldPropertyChanged.isFontSizeChanged) {
            drawingObject.fontSize = textFieldSettings.fontSize;
        }
        if (textFieldSettings.fontStyle && this.textFieldPropertyChanged.isFontStyleChanged) {
            drawingObject.fontStyle = this.getFontStyleName(textFieldSettings.fontStyle, drawingObject);
            ;
        }
        if (textFieldSettings.name && this.textFieldPropertyChanged.isNameChanged) {
            drawingObject.name = textFieldSettings.name;
        }
        if (textFieldSettings.tooltip && this.textFieldPropertyChanged.isToolTipChanged) {
            drawingObject.tooltip = textFieldSettings.tooltip;
        }
        if ((textFieldSettings.thickness && textFieldSettings.thickness !== 1) && this.textFieldPropertyChanged.isThicknessChanged) {
            drawingObject.thickness = textFieldSettings.thickness;
        }
        if (textFieldSettings.maxLength && this.textFieldPropertyChanged.isMaxLengthChanged) {
            drawingObject.maxLength = textFieldSettings.maxLength;
        }
        if (textFieldSettings.visibility && this.textFieldPropertyChanged.isVisibilityChanged) {
            drawingObject.visibility = textFieldSettings.visibility;
        }
        if (!isNullOrUndefined(textFieldSettings.isPrint) && this.textFieldPropertyChanged.isPrintChanged) {
            drawingObject.isPrint = textFieldSettings.isPrint;
        }
        if (!isNullOrUndefined(textFieldSettings.isMultiline) && this.textFieldPropertyChanged.isMultilineChanged) {
            drawingObject.isMultiline = textFieldSettings.isMultiline;
        }
    };
    FormDesigner.prototype.updatePasswordFieldSettingProperties = function (drawingObject, isFormDesignerToolbarVisible, isSetFormFieldMode) {
        var passwordFieldSettings = this.pdfViewer.passwordFieldSettings;
        if (!isNullOrUndefined(passwordFieldSettings.isReadOnly) && this.passwordFieldPropertyChanged.isReadOnlyChanged) {
            drawingObject.isReadonly = passwordFieldSettings.isReadOnly;
        }
        if (!isNullOrUndefined(passwordFieldSettings.isRequired) && this.passwordFieldPropertyChanged.isRequiredChanged) {
            drawingObject.isRequired = passwordFieldSettings.isRequired;
        }
        if (passwordFieldSettings.value && this.passwordFieldPropertyChanged.isValueChanged) {
            drawingObject.value = passwordFieldSettings.value;
        }
        if ((passwordFieldSettings.backgroundColor && passwordFieldSettings.backgroundColor !== 'white') && this.passwordFieldPropertyChanged.isBackgroundColorChanged) {
            drawingObject.backgroundColor = passwordFieldSettings.backgroundColor;
        }
        if ((passwordFieldSettings.borderColor && passwordFieldSettings.borderColor !== 'black') && this.passwordFieldPropertyChanged.isBorderColorChanged) {
            drawingObject.borderColor = passwordFieldSettings.borderColor;
        }
        if ((passwordFieldSettings.alignment && passwordFieldSettings.alignment !== 'Left') && this.passwordFieldPropertyChanged.isAlignmentChanged) {
            drawingObject.alignment = passwordFieldSettings.alignment;
        }
        if ((passwordFieldSettings.color && passwordFieldSettings.color !== 'black') && this.passwordFieldPropertyChanged.isColorChanged) {
            drawingObject.color = passwordFieldSettings.color;
        }
        if ((passwordFieldSettings.fontFamily && passwordFieldSettings.fontFamily !== 'Helvetica') && this.passwordFieldPropertyChanged.isFontFamilyChanged) {
            drawingObject.fontFamily = passwordFieldSettings.fontFamily;
        }
        if ((passwordFieldSettings.fontSize && passwordFieldSettings.fontSize !== 10) && this.passwordFieldPropertyChanged.isFontSizeChanged) {
            drawingObject.fontSize = passwordFieldSettings.fontSize;
        }
        if (passwordFieldSettings.fontStyle && this.passwordFieldPropertyChanged.isFontStyleChanged) {
            drawingObject.fontStyle = this.getFontStyleName(passwordFieldSettings.fontStyle, drawingObject);
        }
        if (passwordFieldSettings.name && this.passwordFieldPropertyChanged.isNameChanged) {
            drawingObject.name = passwordFieldSettings.name;
        }
        if (passwordFieldSettings.tooltip && this.passwordFieldPropertyChanged.isToolTipChanged) {
            drawingObject.tooltip = passwordFieldSettings.tooltip;
        }
        if ((passwordFieldSettings.thickness && passwordFieldSettings.thickness !== 1) && this.passwordFieldPropertyChanged.isThicknessChanged) {
            drawingObject.thickness = passwordFieldSettings.thickness;
        }
        if (passwordFieldSettings.maxLength && this.passwordFieldPropertyChanged.isMaxLengthChanged) {
            drawingObject.maxLength = passwordFieldSettings.maxLength;
        }
        if (passwordFieldSettings.visibility && this.passwordFieldPropertyChanged.isVisibilityChanged) {
            drawingObject.visibility = passwordFieldSettings.visibility;
        }
        if (!isNullOrUndefined(passwordFieldSettings.isPrint) && this.passwordFieldPropertyChanged.isPrintChanged) {
            drawingObject.isPrint = passwordFieldSettings.isPrint;
        }
    };
    FormDesigner.prototype.updateCheckBoxFieldSettingsProperties = function (drawingObject, isFormDesignerToolbarVisible, isSetFormFieldMode) {
        var checkBoxFieldSettings = this.pdfViewer.checkBoxFieldSettings;
        if (!isNullOrUndefined(checkBoxFieldSettings.isReadOnly) && this.checkBoxFieldPropertyChanged.isReadOnlyChanged) {
            drawingObject.isReadonly = checkBoxFieldSettings.isReadOnly;
        }
        if (!isNullOrUndefined(checkBoxFieldSettings.isRequired) && this.checkBoxFieldPropertyChanged.isRequiredChanged) {
            drawingObject.isRequired = checkBoxFieldSettings.isRequired;
        }
        if ((checkBoxFieldSettings.backgroundColor && checkBoxFieldSettings.backgroundColor !== 'white') && this.checkBoxFieldPropertyChanged.isBackgroundColorChanged) {
            drawingObject.backgroundColor = checkBoxFieldSettings.backgroundColor;
        }
        if ((checkBoxFieldSettings.borderColor && checkBoxFieldSettings.borderColor !== 'black') && this.checkBoxFieldPropertyChanged.isBorderColorChanged) {
            drawingObject.borderColor = checkBoxFieldSettings.borderColor;
        }
        if (checkBoxFieldSettings.name && this.checkBoxFieldPropertyChanged.isNameChanged) {
            drawingObject.name = checkBoxFieldSettings.name;
        }
        if (checkBoxFieldSettings.tooltip && this.checkBoxFieldPropertyChanged.isToolTipChanged) {
            drawingObject.tooltip = checkBoxFieldSettings.tooltip;
        }
        if ((checkBoxFieldSettings.thickness && checkBoxFieldSettings.thickness !== 1) && this.checkBoxFieldPropertyChanged.isThicknessChanged) {
            drawingObject.thickness = checkBoxFieldSettings.thickness;
        }
        if (checkBoxFieldSettings.visibility && this.checkBoxFieldPropertyChanged.isVisibilityChanged) {
            drawingObject.visibility = checkBoxFieldSettings.visibility;
        }
        if (!isNullOrUndefined(checkBoxFieldSettings.isPrint) && this.checkBoxFieldPropertyChanged.isPrintChanged) {
            drawingObject.isPrint = checkBoxFieldSettings.isPrint;
        }
        if (!isNullOrUndefined(checkBoxFieldSettings.isChecked) && this.checkBoxFieldPropertyChanged.isCheckedChanged) {
            drawingObject.isChecked = checkBoxFieldSettings.isChecked;
        }
    };
    FormDesigner.prototype.updateRadioButtonFieldSettingProperties = function (drawingObject, isFormDesignerToolbarVisible, isSetFormFieldMode) {
        var radioButtonFieldSettings = this.pdfViewer.radioButtonFieldSettings;
        if (!isNullOrUndefined(radioButtonFieldSettings.isReadOnly) && this.radioButtonFieldPropertyChanged.isReadOnlyChanged) {
            drawingObject.isReadonly = radioButtonFieldSettings.isReadOnly;
        }
        if (!isNullOrUndefined(radioButtonFieldSettings.isRequired) && this.radioButtonFieldPropertyChanged.isRequiredChanged) {
            drawingObject.isRequired = radioButtonFieldSettings.isRequired;
        }
        if ((radioButtonFieldSettings.backgroundColor && radioButtonFieldSettings.backgroundColor !== 'white') && this.radioButtonFieldPropertyChanged.isBackgroundColorChanged) {
            drawingObject.backgroundColor = radioButtonFieldSettings.backgroundColor;
        }
        if ((radioButtonFieldSettings.borderColor && radioButtonFieldSettings.borderColor !== 'black') && this.radioButtonFieldPropertyChanged.isBorderColorChanged) {
            drawingObject.borderColor = radioButtonFieldSettings.borderColor;
        }
        if (radioButtonFieldSettings.name && this.radioButtonFieldPropertyChanged.isNameChanged) {
            drawingObject.name = radioButtonFieldSettings.name;
        }
        if (radioButtonFieldSettings.tooltip && this.radioButtonFieldPropertyChanged.isToolTipChanged) {
            drawingObject.tooltip = radioButtonFieldSettings.tooltip;
        }
        if ((radioButtonFieldSettings.thickness && radioButtonFieldSettings.thickness !== 1) && this.radioButtonFieldPropertyChanged.isThicknessChanged) {
            drawingObject.thickness = radioButtonFieldSettings.thickness;
        }
        if (radioButtonFieldSettings.visibility && this.radioButtonFieldPropertyChanged.isVisibilityChanged) {
            drawingObject.visibility = radioButtonFieldSettings.visibility;
        }
        if (!isNullOrUndefined(radioButtonFieldSettings.isPrint) && this.radioButtonFieldPropertyChanged.isPrintChanged) {
            drawingObject.isPrint = radioButtonFieldSettings.isPrint;
        }
        if (!isNullOrUndefined(radioButtonFieldSettings.isSelected) && this.radioButtonFieldPropertyChanged.isSelectedChanged) {
            drawingObject.isSelected = radioButtonFieldSettings.isSelected;
        }
    };
    FormDesigner.prototype.updateDropdownFieldSettingsProperties = function (drawingObject, isFormDesignerToolbarVisible, isSetFormFieldMode) {
        var dropdownFieldSettings = this.pdfViewer.DropdownFieldSettings;
        if (!isNullOrUndefined(dropdownFieldSettings.isReadOnly) && this.dropdownFieldPropertyChanged.isReadOnlyChanged) {
            drawingObject.isReadonly = dropdownFieldSettings.isReadOnly;
        }
        if (!isNullOrUndefined(dropdownFieldSettings.isRequired) && this.dropdownFieldPropertyChanged.isRequiredChanged) {
            drawingObject.isRequired = dropdownFieldSettings.isRequired;
        }
        if ((dropdownFieldSettings.backgroundColor && dropdownFieldSettings.backgroundColor !== 'white') && this.dropdownFieldPropertyChanged.isBackgroundColorChanged) {
            drawingObject.backgroundColor = dropdownFieldSettings.backgroundColor;
        }
        if ((dropdownFieldSettings.borderColor && dropdownFieldSettings.borderColor !== 'black') && this.dropdownFieldPropertyChanged.isBorderColorChanged) {
            drawingObject.borderColor = dropdownFieldSettings.borderColor;
        }
        if ((dropdownFieldSettings.alignment && dropdownFieldSettings.alignment !== 'Left') && this.dropdownFieldPropertyChanged.isAlignmentChanged) {
            drawingObject.alignment = dropdownFieldSettings.alignment;
        }
        if ((dropdownFieldSettings.color && dropdownFieldSettings.color !== 'black') && this.dropdownFieldPropertyChanged.isColorChanged) {
            drawingObject.color = dropdownFieldSettings.color;
        }
        if ((dropdownFieldSettings.fontFamily && dropdownFieldSettings.fontFamily !== 'Helvetica') && this.dropdownFieldPropertyChanged.isFontFamilyChanged) {
            drawingObject.fontFamily = dropdownFieldSettings.fontFamily;
        }
        if ((dropdownFieldSettings.fontSize && dropdownFieldSettings.fontSize !== 10) && this.dropdownFieldPropertyChanged.isFontSizeChanged) {
            drawingObject.fontSize = dropdownFieldSettings.fontSize;
        }
        if (dropdownFieldSettings.fontStyle && this.dropdownFieldPropertyChanged.isFontStyleChanged) {
            drawingObject.fontStyle = this.getFontStyleName(dropdownFieldSettings.fontStyle, drawingObject);
            ;
        }
        if (dropdownFieldSettings.name && this.dropdownFieldPropertyChanged.isNameChanged) {
            drawingObject.name = dropdownFieldSettings.name;
        }
        if (dropdownFieldSettings.tooltip && this.dropdownFieldPropertyChanged.isToolTipChanged) {
            drawingObject.tooltip = dropdownFieldSettings.tooltip;
        }
        if ((dropdownFieldSettings && dropdownFieldSettings.thickness !== 1) && this.dropdownFieldPropertyChanged.isThicknessChanged) {
            drawingObject.thickness = dropdownFieldSettings.thickness;
        }
        if (dropdownFieldSettings.visibility && this.dropdownFieldPropertyChanged.isVisibilityChanged) {
            drawingObject.visibility = dropdownFieldSettings.visibility;
        }
        if (!isNullOrUndefined(dropdownFieldSettings.isPrint) && this.dropdownFieldPropertyChanged.isPrintChanged) {
            drawingObject.isPrint = dropdownFieldSettings.isPrint;
        }
        if (dropdownFieldSettings.options && this.dropdownFieldPropertyChanged.isOptionChanged) {
            drawingObject.options = drawingObject.options && drawingObject.options.length > 0 ? drawingObject.options : dropdownFieldSettings.options;
        }
    };
    FormDesigner.prototype.updatelistBoxFieldSettingsProperties = function (drawingObject, isFormDesignerToolbarVisible, isSetFormFieldMode) {
        var listBoxFieldSettings = this.pdfViewer.listBoxFieldSettings;
        if (!isNullOrUndefined(listBoxFieldSettings.isReadOnly) && this.listBoxFieldPropertyChanged.isReadOnlyChanged) {
            drawingObject.isReadonly = listBoxFieldSettings.isReadOnly;
        }
        if (!isNullOrUndefined(listBoxFieldSettings.isRequired) && this.listBoxFieldPropertyChanged.isRequiredChanged) {
            drawingObject.isRequired = listBoxFieldSettings.isRequired;
        }
        if ((listBoxFieldSettings.backgroundColor && listBoxFieldSettings.backgroundColor !== 'white') && this.listBoxFieldPropertyChanged.isBackgroundColorChanged) {
            drawingObject.backgroundColor = listBoxFieldSettings.backgroundColor;
        }
        if ((listBoxFieldSettings.borderColor && listBoxFieldSettings.borderColor !== 'black') && this.listBoxFieldPropertyChanged.isBorderColorChanged) {
            drawingObject.borderColor = listBoxFieldSettings.borderColor;
        }
        if ((listBoxFieldSettings.alignment && listBoxFieldSettings.alignment !== 'Left') && this.listBoxFieldPropertyChanged.isAlignmentChanged) {
            drawingObject.alignment = listBoxFieldSettings.alignment;
        }
        if ((listBoxFieldSettings.color && listBoxFieldSettings.color !== 'black') && this.listBoxFieldPropertyChanged.isColorChanged) {
            drawingObject.color = listBoxFieldSettings.color;
        }
        if ((listBoxFieldSettings.fontFamily && listBoxFieldSettings.fontFamily !== 'Helvetica') && this.listBoxFieldPropertyChanged.isFontFamilyChanged) {
            drawingObject.fontFamily = listBoxFieldSettings.fontFamily;
        }
        if ((listBoxFieldSettings.fontSize && listBoxFieldSettings.fontSize !== 10) && this.listBoxFieldPropertyChanged.isFontSizeChanged) {
            drawingObject.fontSize = listBoxFieldSettings.fontSize;
        }
        if (listBoxFieldSettings.fontStyle && this.listBoxFieldPropertyChanged.isFontStyleChanged) {
            drawingObject.fontStyle = this.getFontStyleName(listBoxFieldSettings.fontStyle, drawingObject);
            ;
        }
        if (listBoxFieldSettings.name && this.listBoxFieldPropertyChanged.isNameChanged) {
            drawingObject.name = listBoxFieldSettings.name;
        }
        if (listBoxFieldSettings.tooltip && this.listBoxFieldPropertyChanged.isToolTipChanged) {
            drawingObject.tooltip = listBoxFieldSettings.tooltip;
        }
        if ((listBoxFieldSettings.thickness && listBoxFieldSettings.thickness !== 1) && this.listBoxFieldPropertyChanged.isThicknessChanged) {
            drawingObject.thickness = listBoxFieldSettings.thickness;
        }
        if (listBoxFieldSettings.visibility && this.listBoxFieldPropertyChanged.isVisibilityChanged) {
            drawingObject.visibility = listBoxFieldSettings.visibility;
        }
        if (!isNullOrUndefined(listBoxFieldSettings.isPrint) && this.listBoxFieldPropertyChanged.isPrintChanged) {
            drawingObject.isPrint = listBoxFieldSettings.isPrint;
        }
        if (listBoxFieldSettings.options && this.listBoxFieldPropertyChanged.isOptionChanged) {
            drawingObject.options = drawingObject.options && drawingObject.options.length > 0 ? drawingObject.options : listBoxFieldSettings.options;
        }
    };
    FormDesigner.prototype.updateSignInitialFieldProperties = function (signatureField, isInitialField, isFormDesignerToolbarVisible, isSetFormFieldMode) {
        var initialFieldSettings = this.pdfViewer.initialFieldSettings;
        var signatureFieldSettings = this.pdfViewer.signatureFieldSettings;
        if (isInitialField) {
            if (!isNullOrUndefined(initialFieldSettings.isReadOnly) && this.initialFieldPropertyChanged.isReadOnlyChanged) {
                signatureField.isReadonly = initialFieldSettings.isReadOnly;
            }
            if (!isNullOrUndefined(initialFieldSettings.isRequired) && this.initialFieldPropertyChanged.isRequiredChanged && !this.pdfViewer.magnificationModule.isFormFieldPageZoomed) {
                signatureField.isRequired = initialFieldSettings.isRequired;
            }
            if (initialFieldSettings.visibility && this.initialFieldPropertyChanged.isVisibilityChanged && !this.pdfViewer.magnificationModule.isFormFieldPageZoomed) {
                signatureField.visibility = initialFieldSettings.visibility;
            }
            if (initialFieldSettings.tooltip && this.initialFieldPropertyChanged.isTooltipChanged && !this.pdfViewer.magnificationModule.isFormFieldPageZoomed) {
                signatureField.tooltip = initialFieldSettings.tooltip;
            }
            if ((!isNullOrUndefined(initialFieldSettings.thickness) && isSetFormFieldMode === true) && this.initialFieldPropertyChanged.isThicknessChanged) {
                signatureField.thickness = initialFieldSettings.thickness;
            }
            if (initialFieldSettings.name && this.initialFieldPropertyChanged.isNameChanged && !this.pdfViewer.magnificationModule.isFormFieldPageZoomed) {
                signatureField.name = initialFieldSettings.name;
            }
            if (!isNullOrUndefined(initialFieldSettings.isPrint) && this.initialFieldPropertyChanged.isPrintChanged && !this.pdfViewer.magnificationModule.isFormFieldPageZoomed) {
                signatureField.isPrint = initialFieldSettings.isPrint;
            }
        }
        else {
            if (!isNullOrUndefined(signatureFieldSettings.isReadOnly) && this.signatureFieldPropertyChanged.isReadOnlyChanged) {
                signatureField.isReadonly = signatureFieldSettings.isReadOnly;
            }
            if (!isNullOrUndefined(signatureFieldSettings.isRequired) && this.signatureFieldPropertyChanged.isRequiredChanged && !this.pdfViewer.magnificationModule.isFormFieldPageZoomed) {
                signatureField.isRequired = signatureFieldSettings.isRequired;
            }
            if (signatureFieldSettings.visibility && this.signatureFieldPropertyChanged.isVisibilityChanged && !this.pdfViewer.magnificationModule.isFormFieldPageZoomed) {
                signatureField.visibility = signatureFieldSettings.visibility;
            }
            if (signatureFieldSettings.tooltip && this.signatureFieldPropertyChanged.isTooltipChanged && !this.pdfViewer.magnificationModule.isFormFieldPageZoomed) {
                signatureField.tooltip = signatureFieldSettings.tooltip;
            }
            if ((!isNullOrUndefined(signatureFieldSettings.thickness) && isSetFormFieldMode === true) && this.signatureFieldPropertyChanged.isThicknessChanged) {
                signatureField.thickness = signatureFieldSettings.thickness;
            }
            if (signatureFieldSettings.name && this.signatureFieldPropertyChanged.isNameChanged && !this.pdfViewer.magnificationModule.isFormFieldPageZoomed) {
                signatureField.name = signatureFieldSettings.name;
            }
            if (!isNullOrUndefined(signatureFieldSettings.isPrint) && this.signatureFieldPropertyChanged.isPrintChanged && !this.pdfViewer.magnificationModule.isFormFieldPageZoomed) {
                signatureField.isPrint = signatureFieldSettings.isPrint;
            }
        }
    };
    /**
     * @private
     */
    FormDesigner.prototype.updateSignatureSettings = function (newSignatureFieldSettings, isInitialField) {
        isInitialField = !isNullOrUndefined(isInitialField) ? isInitialField : false;
        if (isInitialField) {
            this.initialFieldPropertyChanged.isReadOnlyChanged = !isNullOrUndefined(newSignatureFieldSettings.isReadOnly);
            this.initialFieldPropertyChanged.isRequiredChanged = !isNullOrUndefined(newSignatureFieldSettings.isRequired);
            this.initialFieldPropertyChanged.isVisibilityChanged = !isNullOrUndefined(newSignatureFieldSettings.visibility);
            this.initialFieldPropertyChanged.isTooltipChanged = !isNullOrUndefined(newSignatureFieldSettings.tooltip);
            this.initialFieldPropertyChanged.isNameChanged = !isNullOrUndefined(newSignatureFieldSettings.name);
            this.initialFieldPropertyChanged.isPrintChanged = !isNullOrUndefined(newSignatureFieldSettings.isPrint);
            this.initialFieldPropertyChanged.isThicknessChanged = !isNullOrUndefined(newSignatureFieldSettings.thickness);
        }
        else {
            this.signatureFieldPropertyChanged.isReadOnlyChanged = !isNullOrUndefined(newSignatureFieldSettings.isReadOnly);
            this.signatureFieldPropertyChanged.isRequiredChanged = !isNullOrUndefined(newSignatureFieldSettings.isRequired);
            this.signatureFieldPropertyChanged.isVisibilityChanged = !isNullOrUndefined(newSignatureFieldSettings.visibility);
            this.signatureFieldPropertyChanged.isTooltipChanged = !isNullOrUndefined(newSignatureFieldSettings.tooltip);
            this.signatureFieldPropertyChanged.isNameChanged = !isNullOrUndefined(newSignatureFieldSettings.name);
            this.signatureFieldPropertyChanged.isPrintChanged = !isNullOrUndefined(newSignatureFieldSettings.isPrint);
            this.signatureFieldPropertyChanged.isThicknessChanged = !isNullOrUndefined(newSignatureFieldSettings.thickness);
        }
    };
    /**
     * @private
     */
    FormDesigner.prototype.updateTextFieldSettings = function (textFieldSettings) {
        this.textFieldPropertyChanged.isReadOnlyChanged = !isNullOrUndefined(textFieldSettings.isReadOnly);
        this.textFieldPropertyChanged.isRequiredChanged = !isNullOrUndefined(textFieldSettings.isRequired);
        this.textFieldPropertyChanged.isValueChanged = !isNullOrUndefined(textFieldSettings.value);
        this.textFieldPropertyChanged.isBackgroundColorChanged = !isNullOrUndefined(textFieldSettings.backgroundColor);
        this.textFieldPropertyChanged.isBorderColorChanged = !isNullOrUndefined(textFieldSettings.borderColor);
        this.textFieldPropertyChanged.isAlignmentChanged = !isNullOrUndefined(textFieldSettings.alignment);
        this.textFieldPropertyChanged.isColorChanged = !isNullOrUndefined(textFieldSettings.color);
        this.textFieldPropertyChanged.isFontFamilyChanged = !isNullOrUndefined(textFieldSettings.fontFamily);
        this.textFieldPropertyChanged.isFontSizeChanged = !isNullOrUndefined(textFieldSettings.fontSize);
        this.textFieldPropertyChanged.isFontStyleChanged = !isNullOrUndefined(textFieldSettings.fontStyle);
        this.textFieldPropertyChanged.isNameChanged = !isNullOrUndefined(textFieldSettings.name);
        this.textFieldPropertyChanged.isToolTipChanged = !isNullOrUndefined(textFieldSettings.tooltip);
        this.textFieldPropertyChanged.isThicknessChanged = !isNullOrUndefined(textFieldSettings.thickness);
        this.textFieldPropertyChanged.isMaxLengthChanged = !isNullOrUndefined(textFieldSettings.maxLength);
        this.textFieldPropertyChanged.isVisibilityChanged = !isNullOrUndefined(textFieldSettings.visibility);
        this.textFieldPropertyChanged.isPrintChanged = !isNullOrUndefined(textFieldSettings.isPrint);
        this.textFieldPropertyChanged.isMultilineChanged = !isNullOrUndefined(textFieldSettings.isMultiline);
    };
    /**
     * @private
     */
    FormDesigner.prototype.updatePasswordFieldSettings = function (passwordFieldSettings) {
        this.passwordFieldPropertyChanged.isReadOnlyChanged = !isNullOrUndefined(passwordFieldSettings.isReadOnly);
        this.passwordFieldPropertyChanged.isRequiredChanged = !isNullOrUndefined(passwordFieldSettings.isRequired);
        this.passwordFieldPropertyChanged.isValueChanged = !isNullOrUndefined(passwordFieldSettings.value);
        this.passwordFieldPropertyChanged.isBackgroundColorChanged = !isNullOrUndefined(passwordFieldSettings.backgroundColor);
        this.passwordFieldPropertyChanged.isBorderColorChanged = !isNullOrUndefined(passwordFieldSettings.borderColor);
        this.passwordFieldPropertyChanged.isAlignmentChanged = !isNullOrUndefined(passwordFieldSettings.alignment);
        this.passwordFieldPropertyChanged.isColorChanged = !isNullOrUndefined(passwordFieldSettings.color);
        this.passwordFieldPropertyChanged.isFontFamilyChanged = !isNullOrUndefined(passwordFieldSettings.fontFamily);
        this.passwordFieldPropertyChanged.isFontSizeChanged = !isNullOrUndefined(passwordFieldSettings.fontSize);
        this.passwordFieldPropertyChanged.isFontStyleChanged = !isNullOrUndefined(passwordFieldSettings.fontStyle);
        this.passwordFieldPropertyChanged.isNameChanged = !isNullOrUndefined(passwordFieldSettings.name);
        this.passwordFieldPropertyChanged.isToolTipChanged = !isNullOrUndefined(passwordFieldSettings.tooltip);
        this.passwordFieldPropertyChanged.isThicknessChanged = !isNullOrUndefined(passwordFieldSettings.thickness);
        this.passwordFieldPropertyChanged.isMaxLengthChanged = !isNullOrUndefined(passwordFieldSettings.maxLength);
        this.passwordFieldPropertyChanged.isVisibilityChanged = !isNullOrUndefined(passwordFieldSettings.visibility);
        this.passwordFieldPropertyChanged.isPrintChanged = !isNullOrUndefined(passwordFieldSettings.isPrint);
    };
    /**
     * @private
     */
    FormDesigner.prototype.updateCheckBoxFieldSettings = function (checkBoxFieldSettings) {
        this.checkBoxFieldPropertyChanged.isReadOnlyChanged = !isNullOrUndefined(checkBoxFieldSettings.isReadOnly);
        this.checkBoxFieldPropertyChanged.isRequiredChanged = !isNullOrUndefined(checkBoxFieldSettings.isRequired);
        this.checkBoxFieldPropertyChanged.isBackgroundColorChanged = !isNullOrUndefined(checkBoxFieldSettings.backgroundColor);
        this.checkBoxFieldPropertyChanged.isBorderColorChanged = !isNullOrUndefined(checkBoxFieldSettings.borderColor);
        this.checkBoxFieldPropertyChanged.isNameChanged = !isNullOrUndefined(checkBoxFieldSettings.name);
        this.checkBoxFieldPropertyChanged.isToolTipChanged = !isNullOrUndefined(checkBoxFieldSettings.tooltip);
        this.checkBoxFieldPropertyChanged.isThicknessChanged = !isNullOrUndefined(checkBoxFieldSettings.thickness);
        this.checkBoxFieldPropertyChanged.isVisibilityChanged = !isNullOrUndefined(checkBoxFieldSettings.visibility);
        this.checkBoxFieldPropertyChanged.isPrintChanged = !isNullOrUndefined(checkBoxFieldSettings.isPrint);
        this.checkBoxFieldPropertyChanged.isCheckedChanged = !isNullOrUndefined(checkBoxFieldSettings.isChecked);
    };
    /**
     * @private
     */
    FormDesigner.prototype.updateRadioButtonFieldSettings = function (radioButtonFieldSettings) {
        this.radioButtonFieldPropertyChanged.isReadOnlyChanged = !isNullOrUndefined(radioButtonFieldSettings.isReadOnly);
        this.radioButtonFieldPropertyChanged.isRequiredChanged = !isNullOrUndefined(radioButtonFieldSettings.isRequired);
        this.radioButtonFieldPropertyChanged.isBackgroundColorChanged = !isNullOrUndefined(radioButtonFieldSettings.backgroundColor);
        this.radioButtonFieldPropertyChanged.isBorderColorChanged = !isNullOrUndefined(radioButtonFieldSettings.borderColor);
        this.radioButtonFieldPropertyChanged.isNameChanged = !isNullOrUndefined(radioButtonFieldSettings.name);
        this.radioButtonFieldPropertyChanged.isToolTipChanged = !isNullOrUndefined(radioButtonFieldSettings.tooltip);
        this.radioButtonFieldPropertyChanged.isThicknessChanged = !isNullOrUndefined(radioButtonFieldSettings.thickness);
        this.radioButtonFieldPropertyChanged.isVisibilityChanged = !isNullOrUndefined(radioButtonFieldSettings.visibility);
        this.radioButtonFieldPropertyChanged.isPrintChanged = !isNullOrUndefined(radioButtonFieldSettings.isPrint);
        this.radioButtonFieldPropertyChanged.isSelectedChanged = !isNullOrUndefined(radioButtonFieldSettings.isSelected);
    };
    /**
     * @private
     */
    FormDesigner.prototype.updateDropDownFieldSettings = function (dropdownFieldSettings) {
        this.dropdownFieldPropertyChanged.isReadOnlyChanged = !isNullOrUndefined(dropdownFieldSettings.isReadOnly);
        this.dropdownFieldPropertyChanged.isRequiredChanged = !isNullOrUndefined(dropdownFieldSettings.isRequired);
        this.dropdownFieldPropertyChanged.isValueChanged = !isNullOrUndefined(dropdownFieldSettings.value);
        this.dropdownFieldPropertyChanged.isBackgroundColorChanged = !isNullOrUndefined(dropdownFieldSettings.backgroundColor);
        this.dropdownFieldPropertyChanged.isBorderColorChanged = !isNullOrUndefined(dropdownFieldSettings.borderColor);
        this.dropdownFieldPropertyChanged.isAlignmentChanged = !isNullOrUndefined(dropdownFieldSettings.alignment);
        this.dropdownFieldPropertyChanged.isColorChanged = !isNullOrUndefined(dropdownFieldSettings.color);
        this.dropdownFieldPropertyChanged.isFontFamilyChanged = !isNullOrUndefined(dropdownFieldSettings.fontFamily);
        this.dropdownFieldPropertyChanged.isFontSizeChanged = !isNullOrUndefined(dropdownFieldSettings.fontSize);
        this.dropdownFieldPropertyChanged.isFontStyleChanged = !isNullOrUndefined(dropdownFieldSettings.fontStyle);
        this.dropdownFieldPropertyChanged.isNameChanged = !isNullOrUndefined(dropdownFieldSettings.name);
        this.dropdownFieldPropertyChanged.isToolTipChanged = !isNullOrUndefined(dropdownFieldSettings.tooltip);
        this.dropdownFieldPropertyChanged.isThicknessChanged = !isNullOrUndefined(dropdownFieldSettings.thickness);
        this.dropdownFieldPropertyChanged.isVisibilityChanged = !isNullOrUndefined(dropdownFieldSettings.visibility);
        this.dropdownFieldPropertyChanged.isPrintChanged = !isNullOrUndefined(dropdownFieldSettings.isPrint);
        this.dropdownFieldPropertyChanged.isOptionChanged = !isNullOrUndefined(dropdownFieldSettings.options);
    };
    /**
     * @private
     */
    FormDesigner.prototype.updateListBoxFieldSettings = function (listBoxFieldSettings) {
        this.listBoxFieldPropertyChanged.isReadOnlyChanged = !isNullOrUndefined(listBoxFieldSettings.isReadOnly);
        this.listBoxFieldPropertyChanged.isRequiredChanged = !isNullOrUndefined(listBoxFieldSettings.isRequired);
        this.listBoxFieldPropertyChanged.isBackgroundColorChanged = !isNullOrUndefined(listBoxFieldSettings.backgroundColor);
        this.listBoxFieldPropertyChanged.isBorderColorChanged = !isNullOrUndefined(listBoxFieldSettings.borderColor);
        this.listBoxFieldPropertyChanged.isAlignmentChanged = !isNullOrUndefined(listBoxFieldSettings.alignment);
        this.listBoxFieldPropertyChanged.isColorChanged = !isNullOrUndefined(listBoxFieldSettings.color);
        this.listBoxFieldPropertyChanged.isFontFamilyChanged = !isNullOrUndefined(listBoxFieldSettings.fontFamily);
        this.listBoxFieldPropertyChanged.isFontSizeChanged = !isNullOrUndefined(listBoxFieldSettings.fontSize);
        this.listBoxFieldPropertyChanged.isFontStyleChanged = !isNullOrUndefined(listBoxFieldSettings.fontStyle);
        this.listBoxFieldPropertyChanged.isNameChanged = !isNullOrUndefined(listBoxFieldSettings.name);
        this.listBoxFieldPropertyChanged.isToolTipChanged = !isNullOrUndefined(listBoxFieldSettings.tooltip);
        this.listBoxFieldPropertyChanged.isThicknessChanged = !isNullOrUndefined(listBoxFieldSettings.thickness);
        this.listBoxFieldPropertyChanged.isVisibilityChanged = !isNullOrUndefined(listBoxFieldSettings.visibility);
        this.listBoxFieldPropertyChanged.isPrintChanged = !isNullOrUndefined(listBoxFieldSettings.isPrint);
        this.listBoxFieldPropertyChanged.isOptionChanged = !isNullOrUndefined(listBoxFieldSettings.options);
    };
    FormDesigner.prototype.getFontStyleName = function (fontStyle, drawingObject) {
        var fontStyleName = 'None';
        if (fontStyle === 1) {
            drawingObject.font.isBold = true;
            fontStyleName = 'Bold';
        }
        if (fontStyle === 2) {
            drawingObject.font.isItalic = true;
            fontStyleName = 'Italic';
        }
        if (fontStyle === 3) {
            drawingObject.font.isBold = true;
            drawingObject.font.isItalic = true;
            fontStyleName = 'Bold Italic';
        }
        if (fontStyle === 4) {
            drawingObject.font.isUnderline = true;
            fontStyleName = 'Underline';
        }
        if (fontStyle === 5) {
            drawingObject.font.isBold = true;
            drawingObject.font.isUnderline = true;
            fontStyleName = 'Bold Underline';
        }
        if (fontStyle === 6) {
            drawingObject.font.isUnderline = true;
            drawingObject.font.isItalic = true;
            fontStyleName = 'Underline Italic';
        }
        if (fontStyle === 7) {
            drawingObject.font.isBold = true;
            drawingObject.font.isItalic = true;
            drawingObject.font.isUnderline = true;
            fontStyleName = 'Bold Italic Underline';
        }
        if (fontStyle === 8) {
            drawingObject.font.isStrikeout = true;
            fontStyleName = 'Strikethrough';
        }
        if (fontStyle === 9) {
            drawingObject.font.isBold = true;
            drawingObject.font.isStrikeout = true;
            fontStyleName = 'Bold Strikethrough';
        }
        if (fontStyle === 10) {
            drawingObject.font.isItalic = true;
            drawingObject.font.isStrikeout = true;
            fontStyleName = 'Italic Strikethrough';
        }
        if (fontStyle === 11) {
            drawingObject.font.isBold = true;
            drawingObject.font.isItalic = true;
            drawingObject.font.isStrikeout = true;
            fontStyleName = 'Bold Italic Strikethrough';
        }
        if (fontStyle === 12) {
            drawingObject.font.isUnderline = true;
            drawingObject.font.isStrikeout = true;
            fontStyleName = 'Underline Strikethrough';
        }
        if (fontStyle === 13) {
            drawingObject.font.isBold = true;
            drawingObject.font.isUnderline = true;
            drawingObject.font.isStrikeout = true;
            fontStyleName = 'Bold Underline Strikethrough';
        }
        if (fontStyle === 14) {
            drawingObject.font.isItalic = true;
            drawingObject.font.isUnderline = true;
            drawingObject.font.isStrikeout = true;
            fontStyleName = 'Italic Underline Strikethrough';
        }
        if (fontStyle === 15) {
            drawingObject.font.isBold = true;
            drawingObject.font.isItalic = true;
            drawingObject.font.isUnderline = true;
            drawingObject.font.isStrikeout = true;
            fontStyleName = 'Bold Italic Underline Strikethrough';
        }
        return fontStyleName;
    };
    FormDesigner.prototype.getAlignment = function (alignment) {
        var align;
        if (alignment === 'left') {
            align = 'left';
        }
        else if (alignment === 'right') {
            align = 'right';
        }
        else if (alignment === 'center') {
            align = 'center';
        }
        this.formFieldAlign = align;
    };
    FormDesigner.prototype.getFontStyle = function (font) {
        if (font.isBold) {
            this.formFieldBold = 'bold';
        }
        if (font.isItalic) {
            this.formFieldItalic = 'italic';
        }
        if (font.isUnderline) {
            this.formFieldUnderline = 'underline';
        }
        if (font.isStrikeout) {
            this.formFieldStrikeOut = 'line-through';
        }
    };
    return FormDesigner;
}());
export { FormDesigner };
