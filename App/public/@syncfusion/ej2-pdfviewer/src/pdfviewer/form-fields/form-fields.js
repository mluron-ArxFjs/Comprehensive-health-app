import { Browser, isBlazor, isNullOrUndefined, initializeCSPTemplate } from '@syncfusion/ej2-base';
import { splitArrayCollection, processPathData, cornersPointsBeforeRotation } from '@syncfusion/ej2-drawings';
import { Tooltip } from '@syncfusion/ej2-popups';
/**
 * The `FormFields` module is to render formfields in the PDF document.
 *
 * @hidden
 */
var FormFields = /** @class */ (function () {
    /**
     * @param viewer
     * @param base
     * @param viewer
     * @param base
     * @private
     */
    function FormFields(viewer, base) {
        // eslint-disable-next-line
        this.maintainTabIndex = {};
        // eslint-disable-next-line
        this.maintanMinTabindex = {};
        this.isSignatureField = false;
        this.paddingDifferenceValue = 10;
        this.indicatorPaddingValue = 4;
        this.isKeyDownCheck = false;
        this.signatureFontSizeConstent = 1.35;
        /**
         * @private
         */
        // eslint-disable-next-line
        this.readOnlyCollection = [];
        this.isSignatureRendered = false;
        /**
         * @private
         */
        // eslint-disable-next-line
        this.signatureFieldCollection = [];
        this.selectedIndex = [];
        /**
         * @private
         */
        // eslint-disable-next-line
        this.renderedPageList = [];
        this.pdfViewer = viewer;
        this.pdfViewerBase = base;
    }
    /**
     * @param pageIndex
     * @private
     */
    FormFields.prototype.renderFormFields = function (pageIndex, isImportFormField) {
        this.maxTabIndex = 0;
        this.minTabIndex = -1;
        // eslint-disable-next-line        
        if (this.renderedPageList.indexOf(pageIndex) !== -1 && !isImportFormField) {
            this.data = this.pdfViewerBase.getItemFromSessionStorage('_formDesigner');
            if (!this.data || this.data === '[]') {
                this.data = this.pdfViewerBase.getItemFromSessionStorage('_formfields');
            }
        }
        else {
            this.data = this.pdfViewerBase.getItemFromSessionStorage('_formfields');
        }
        if (this.data) {
            // eslint-disable-next-line
            this.formFieldsData = JSON.parse(this.data);
            var textLayer = document.getElementById(this.pdfViewer.element.id + '_textLayer_' + pageIndex);
            var canvasElement = document.getElementById(this.pdfViewer.element.id + '_pageCanvas_' + pageIndex);
            var count = void 0;
            if (this.formFieldsData !== null && canvasElement !== null && textLayer !== null) {
                var flag = false;
                for (var i = 0; i < this.formFieldsData.length; i++) {
                    var formField = this.formFieldsData[i];
                    if (!flag && isNullOrUndefined(formField.ActualFieldName) && formField.PageIndex === pageIndex) {
                        count = parseInt(formField.FieldName.slice(formField.FieldName.lastIndexOf("_") + 1));
                        flag = true;
                    }
                }
                if (this.renderedPageList.indexOf(pageIndex) === -1) {
                    this.renderedPageList.push(pageIndex);
                }
                var _loop_1 = function (i_1) {
                    // eslint-disable-next-line
                    var currentData = this_1.formFieldsData[i_1];
                    if (currentData.FieldName !== '') {
                        if (currentData.IsInitialField) {
                            currentData.Name = 'InitialField';
                        }
                        // eslint-disable-next-line
                        var font = currentData['Font'];
                        if (this_1.pdfViewer.formDesigner) {
                            if (parseFloat(currentData['PageIndex']) == pageIndex) {
                                var fontFamily = void 0;
                                var fontStyle = void 0;
                                var fontSize = void 0;
                                if (font !== null && font.Height) {
                                    fontFamily = font.Name;
                                    if (font.Italic) {
                                        fontStyle = 'Italic';
                                    }
                                    if (font.Bold) {
                                        fontStyle = 'Bold';
                                    }
                                    if (font.Strikeout) {
                                        fontStyle = 'Strikethrough';
                                    }
                                    if (font.Underline) {
                                        fontStyle = 'Underline';
                                    }
                                    fontSize = this_1.ConvertPointToPixel(font.Size);
                                }
                                var textAlignment = currentData.Alignment === 2 ? 'right' : (currentData.Alignment === 1 ? 'center' : 'left');
                                var backgroundColor = currentData['BackColor'];
                                var bounds = currentData['LineBounds'];
                                var backColor = 'rgba(' + backgroundColor.R + ',' + backgroundColor.G + ',' + backgroundColor.B + ',' + 1 + ')';
                                if (currentData.IsTransparent === true) {
                                    backColor = "rgba(0,0,0,0)";
                                }
                                backColor = this_1.rgbaToHex(backColor);
                                // set default color if field have black color as bg.
                                if (backColor === '#000000ff') {
                                    backColor = '#daeaf7ff';
                                }
                                // eslint-disable-next-line
                                var fontColor = currentData['FontColor'];
                                var left = this_1.ConvertPointToPixel(bounds.X);
                                var top_1 = this_1.ConvertPointToPixel(bounds.Y);
                                var width = this_1.ConvertPointToPixel(bounds.Width);
                                var height = this_1.ConvertPointToPixel(bounds.Height);
                                var boundArray = { left: left, top: top_1, width: width, height: height };
                                var isFieldRotated = false;
                                var rotateFieldAngle = 0;
                                if (currentData["Rotation"] !== 0) {
                                    if (currentData["RotationAngle"] === -90 || currentData["RotationAngle"] === -270 || currentData["RotationAngle"] === -180) {
                                        boundArray = this_1.getBounds(boundArray, pageIndex, 0, isFieldRotated);
                                    }
                                }
                                else {
                                    isFieldRotated = true;
                                    boundArray = this_1.getBounds(boundArray, pageIndex, 0, isFieldRotated);
                                    rotateFieldAngle = this_1.getAngle(pageIndex);
                                }
                                var foreColor = 'rgba(' + fontColor.R + ',' + fontColor.G + ',' + fontColor.B + ',' + 1 + ')';
                                foreColor = this_1.rgbaToHex(foreColor);
                                var borderColor = currentData['BorderColor'];
                                var borderRGB = 'rgba(' + borderColor.R + ',' + borderColor.G + ',' + borderColor.B + ',' + 1 + ')';
                                borderRGB = this_1.rgbaToHex(borderRGB);
                                var borderWidth = currentData['BorderWidth'];
                                this_1.selectedIndex = [];
                                elementValue = "";
                                if (currentData.Name === 'RadioButton' || currentData.Name === 'CheckBox') {
                                    elementValue = currentData['Text'] ? currentData['Text'] : currentData['Value'];
                                }
                                else {
                                    elementValue = currentData['Text'];
                                }
                                var fieldProperties = {
                                    bounds: { X: boundArray.left, Y: boundArray.top, Width: boundArray.width, Height: boundArray.height }, pageNumber: parseFloat(currentData['PageIndex']) + 1, name: currentData['ActualFieldName'], tooltip: currentData['ToolTip'],
                                    value: elementValue, insertSpaces: currentData['InsertSpaces'], isChecked: currentData['Selected'], isSelected: currentData['Selected'], fontFamily: fontFamily, fontStyle: fontStyle, backgroundColor: backColor, color: foreColor, borderColor: borderRGB, thickness: borderWidth, fontSize: fontSize, isMultiline: currentData.Multiline, rotateAngle: rotateFieldAngle,
                                    isReadOnly: currentData['IsReadonly'], isRequired: currentData['IsRequired'], alignment: textAlignment, options: this_1.getListValues(currentData), selectedIndex: this_1.selectedIndex, maxLength: currentData.MaxLength, visibility: currentData.Visible === 1 ? "hidden" : "visible", font: { isItalic: !isNullOrUndefined(font) ? font.Italic : false, isBold: !isNullOrUndefined(font) ? font.Bold : false, isStrikeout: !isNullOrUndefined(font) ? font.Strikeout : false, isUnderline: !isNullOrUndefined(font) ? font.Underline : false }, isTransparent: currentData.IsTransparent
                                };
                                if (!currentData.id && this_1.pdfViewer.formFieldCollections[i_1] && !isNullOrUndefined(currentData['ActualFieldName'])) {
                                    fieldProperties.id = this_1.pdfViewer.formFieldCollections[i_1].id;
                                }
                                if (currentData.Name === 'DropDown' || currentData.Name === 'ListBox') {
                                    fieldProperties.value = currentData['SelectedValue'];
                                }
                                // eslint-disable-next-line
                                var fieldType = this_1.getFormFieldType(currentData);
                                if (currentData.Name !== 'SignatureText' || currentData.Name !== 'SignatureImage') {
                                    if (!isNullOrUndefined(this_1.getFormFieldType(currentData))) {
                                        if (currentData.IsRequired) {
                                            var thickness = fieldProperties.thickness;
                                            thickness = thickness > 0 ? thickness : 1;
                                            fieldProperties.thickness = thickness;
                                        }
                                        var addedElement1 = this_1.pdfViewer.formDesignerModule.addFormField(fieldType, fieldProperties, false, fieldProperties.id);
                                        if (addedElement1 && addedElement1.parentElement) {
                                            currentData.id = addedElement1.parentElement.id.split('_')[0];
                                        }
                                        if (addedElement1 && addedElement1.style.visibility === "hidden") {
                                            addedElement1.childNodes[0].disabled = true;
                                        }
                                    }
                                }
                                if (fieldType === 'SignatureField' || fieldType === 'InitialField') {
                                    this_1.addSignaturePath(currentData, count);
                                    if (!isNullOrUndefined(currentData.Value)) {
                                        this_1.renderExistingAnnnot(currentData, parseFloat(currentData['PageIndex']) + 1, null, isFieldRotated);
                                        this_1.isSignatureRendered = true;
                                        count++;
                                    }
                                }
                                if (currentData.ActualFieldName === null && this_1.formFieldsData.filter(function (item) { return item.FieldName.includes(currentData.FieldName.replace(/_\d$/, '')); }).filter(function (value) { return value.Name != 'ink'; }).length === 0) {
                                    this_1.renderExistingAnnnot(currentData, parseFloat(currentData['PageIndex']) + 1, null, isFieldRotated);
                                    this_1.pdfViewerBase.signatureModule.storeSignatureData(pageIndex, currentData);
                                    this_1.isSignatureRendered = true;
                                    count++;
                                }
                                this_1.pdfViewerBase.isLoadedFormFieldAdded = true;
                            }
                        }
                        else {
                            // eslint-disable-next-line
                            if (parseFloat(currentData['PageIndex']) == pageIndex) {
                                // eslint-disable-next-line
                                var field = this_1.createFormFields(currentData, pageIndex, i_1, null, count);
                                var inputField = field.currentField;
                                var signCount = field.count;
                                var isFieldRotated = false;
                                if (currentData.ActualFieldName === null && this_1.formFieldsData.filter(function (item) { return item.FieldName.includes(currentData.FieldName.replace(/_\d$/, '')); }).filter(function (value) { return value.Name != 'ink'; }).length === 0) {
                                    this_1.renderExistingAnnnot(currentData, parseFloat(currentData['PageIndex']) + 1, null, isFieldRotated);
                                    this_1.pdfViewerBase.signatureModule.storeSignatureData(pageIndex, currentData);
                                    this_1.isSignatureRendered = true;
                                    count++;
                                }
                                if (inputField) {
                                    // eslint-disable-next-line
                                    var divElement = this_1.createParentElement(currentData, pageIndex);
                                    // eslint-disable-next-line
                                    var bounds = currentData['LineBounds'];
                                    // eslint-disable-next-line
                                    var font_1 = currentData['Font'];
                                    // eslint-disable-next-line
                                    rotateAngle = 0;
                                    if (currentData['Rotation'] === 0) {
                                        isFieldRotated = true;
                                        rotateAngle = this_1.getAngle(pageIndex);
                                        if (divElement) {
                                            divElement.style.transform = 'rotate(' + rotateAngle + 'deg)';
                                        }
                                        else {
                                            inputField.style.transform = 'rotate(' + rotateAngle + 'deg)';
                                        }
                                    }
                                    else {
                                        if (divElement) {
                                            divElement.style.transform = 'rotate(' + rotateAngle + 'deg)';
                                        }
                                        else {
                                            inputField.style.transform = 'rotate(' + rotateAngle + 'deg)';
                                        }
                                    }
                                    this_1.applyPosition(inputField, bounds, font_1, pageIndex, 0, isFieldRotated);
                                    inputField.InsertSpaces = currentData.InsertSpaces;
                                    if (inputField.InsertSpaces) {
                                        var zoomFactor = this_1.pdfViewerBase.getZoomFactor();
                                        // eslint-disable-next-line
                                        var font_2 = ((parseInt(inputField.style.width) / inputField.maxLength) - (parseFloat(inputField.style.fontSize) / 2)) - (0.6 * zoomFactor);
                                        // eslint-disable-next-line
                                        inputField.style.letterSpacing = '' + font_2 + 'px';
                                        inputField.style.fontFamily = 'monospace';
                                        inputField.style.paddingLeft = (font_2 / 2) + 'px';
                                    }
                                    // eslint-disable-next-line
                                    currentData['uniqueID'] = this_1.pdfViewer.element.id + 'input_' + pageIndex + '_' + i_1;
                                    for (var j = 0; j < this_1.pdfViewer.formFieldCollections.length; j++) {
                                        if ((inputField.type === 'text' || inputField.type === 'password' || inputField.type === 'textarea') && currentData.Name !== 'SignatureField') {
                                            if (currentData['uniqueID'] === this_1.pdfViewer.formFieldCollections[j].id) {
                                                this_1.pdfViewer.formFieldCollections[j].value = currentData['Text'];
                                            }
                                        }
                                    }
                                    if (isNullOrUndefined(currentData.Value)) {
                                        currentData.Value = currentData['Text'];
                                    }
                                    if (currentData.ToolTip) {
                                        this_1.setToolTip(currentData.ToolTip, inputField);
                                    }
                                    this_1.applyCommonProperties(inputField, pageIndex, i_1, currentData, isFieldRotated);
                                    this_1.checkIsReadonly(currentData, inputField);
                                    this_1.applyTabIndex(currentData, inputField, pageIndex);
                                    this_1.checkIsRequiredField(currentData, inputField);
                                    this_1.applyDefaultColor(inputField);
                                    this_1.updateFormFieldsCollection(currentData);
                                    if (divElement) {
                                        divElement.appendChild(inputField);
                                        textLayer.appendChild(divElement);
                                    }
                                    else {
                                        inputField.style.position = 'absolute';
                                        textLayer.appendChild(inputField);
                                    }
                                    inputField.addEventListener('focus', this_1.focusFormFields.bind(this_1));
                                    inputField.addEventListener('blur', this_1.blurFormFields.bind(this_1));
                                    inputField.addEventListener('click', this_1.updateFormFields.bind(this_1));
                                    inputField.addEventListener('change', this_1.changeFormFields.bind(this_1));
                                    inputField.addEventListener('keydown', this_1.updateFormFieldsValue.bind(this_1));
                                    inputField.addEventListener('keyup', this_1.updateSameFieldsValue.bind(this_1));
                                    count = signCount;
                                }
                            }
                        }
                    }
                };
                var this_1 = this, elementValue, rotateAngle;
                for (var i_1 = 0; i_1 < this.formFieldsData.length; i_1++) {
                    _loop_1(i_1);
                }
                if (!this.pdfViewer.formDesigner) {
                    window.sessionStorage.removeItem(this.pdfViewerBase.documentId + '_formfields');
                    this.pdfViewerBase.setItemInSessionStorage(this.formFieldsData, '_formfields');
                }
            }
        }
        if (this.pdfViewerBase.isFocusField && this.pdfViewerBase.focusField) {
            var currentField = document.getElementById(this.pdfViewerBase.focusField.id);
            if (currentField) {
                if ((this.pdfViewerBase.focusField.type === "SignatureField" || this.pdfViewerBase.focusField.type === "InitialField") && this.pdfViewer.formDesignerModule) {
                    var y = this.pdfViewerBase.focusField.bounds.y;
                    var height = this.pdfViewerBase.pageSize[pageIndex].height;
                    this.pdfViewer.bookmark.goToBookmark(this.pdfViewerBase.focusField.pageIndex, height - y);
                }
                else {
                    currentField.focus();
                }
                this.pdfViewerBase.isFocusField = false;
                this.pdfViewerBase.focusField = [];
            }
        }
    };
    FormFields.prototype.setToolTip = function (tooltipContent, targetElement) {
        //initialize tooltip component
        var tooltip = new Tooltip({
            content: initializeCSPTemplate(function () { return tooltipContent; })
        });
        // render initialized tooltip
        tooltip.appendTo(targetElement);
    };
    FormFields.prototype.trim = function (str) {
        return str.replace(/^\s+|\s+$/gm, '');
    };
    FormFields.prototype.rgbaToHex = function (rgba) {
        var inParts = rgba.substring(rgba.indexOf("(")).split(",");
        var r = parseInt(this.trim(inParts[0].substring(1)), 10);
        var g = parseInt(this.trim(inParts[1]), 10);
        var b = parseInt(this.trim(inParts[2]), 10);
        var a = parseFloat(parseFloat(this.trim(inParts[3].substring(0, inParts[3].length - 1))).toFixed(2));
        var outParts = [
            r.toString(16),
            g.toString(16),
            b.toString(16),
            Math.round(a * 255).toString(16).substring(0, 2)
        ];
        // Pad single-digit output values
        outParts.forEach(function (part, i) {
            if (part.length === 1) {
                outParts[i] = '0' + part;
            }
        });
        return ('#' + outParts.join(''));
    };
    FormFields.prototype.getListValues = function (currentData) {
        var listItem = currentData['TextList'];
        var options = [];
        for (var i = 0; i < listItem.length; i++) {
            if (listItem[i] === currentData['SelectedValue'])
                this.selectedIndex.push(i);
            options.push({ itemName: listItem[i], itemValue: listItem[i] });
        }
        if (this.getFormFieldType(currentData) === 'ListBox') {
            this.selectedIndex = currentData['SelectedList'];
        }
        return options;
    };
    // eslint-disable-next-line
    FormFields.prototype.createParentElement = function (data, pageIndex) {
        // eslint-disable-next-line
        var divElement;
        // eslint-disable-next-line
        if (data['Name'] === 'Textbox' || data['Name'] === 'Password') {
            divElement = document.createElement('div');
            divElement.style.background = 'white';
            if (data.InsertSpaces) {
                divElement.style.background = 'transparent';
            }
            // eslint-disable-next-line
            var bounds = data['LineBounds'];
            // eslint-disable-next-line
            var font = data['Font'];
            // eslint-disable-next-line
            divElement.style.position = 'absolute';
            // eslint-disable-next-line
            var isFieldRotated = false;
            if (data['Rotation'] === 0) {
                isFieldRotated = true;
            }
            this.applyPosition(divElement, bounds, font, pageIndex, 0, isFieldRotated);
        }
        return divElement;
    };
    /**
     * @private
     */
    FormFields.prototype.getAngle = function (pageIndex) {
        // eslint-disable-next-line
        var angle = 0;
        // eslint-disable-next-line
        var pageDetails = this.pdfViewerBase.pageSize[pageIndex];
        if (pageDetails && pageDetails.rotation) {
            switch (pageDetails.rotation) {
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
    FormFields.prototype.nextField = function () {
        this.signatureFieldNavigate(true);
    };
    FormFields.prototype.previousField = function () {
        this.signatureFieldNavigate(false);
    };
    FormFields.prototype.signatureFieldNavigate = function (nextSign) {
        var isNextSignField = nextSign;
        // eslint-disable-next-line
        var signatureFields = this.signatureFieldCollection;
        var collectionData = this.pdfViewer.formFieldCollections;
        if (signatureFields.length === 0) {
            signatureFields = this.getSignField();
        }
        // eslint-disable-next-line
        var currentField;
        if (this.currentTarget) {
            if (this.pdfViewer.formDesignerModule) {
                for (var i = 0; i < collectionData.length; i++) {
                    currentField = collectionData[i];
                    if (this.currentTarget.id === currentField.id) {
                        this.currentTarget = document.getElementById(currentField.id);
                        this.getSignatureIndex(i, collectionData.length, isNextSignField);
                        break;
                    }
                }
            }
            else {
                for (var i = 0; i < signatureFields.length; i++) {
                    currentField = this.pdfViewer.formDesignerModule ? signatureFields[i].FormField : signatureFields[i];
                    if (this.currentTarget.id === currentField.uniqueID) {
                        this.currentTarget = document.getElementById(currentField.uniqueID);
                        this.getSignatureIndex(i, signatureFields.length, isNextSignField);
                        break;
                    }
                }
            }
        }
        else {
            if (nextSign) {
                if (this.pdfViewer.formDesignerModule) {
                    currentField = signatureFields[0];
                    if (currentField.id) {
                        this.currentTarget = document.getElementById(currentField.id);
                        this.getSignatureIndex(0, signatureFields.length, isNextSignField, true);
                    }
                }
                else {
                    currentField = signatureFields[0];
                    if (currentField.uniqueID) {
                        this.currentTarget = document.getElementById(currentField.uniqueID);
                        this.getSignatureIndex(0, signatureFields.length, isNextSignField, true);
                    }
                }
            }
        }
    };
    FormFields.prototype.getSignatureIndex = function (currentSignatureIndex, signatureCount, isNextSign, isFirstNavigate) {
        var signatureIndex = currentSignatureIndex;
        if (!isFirstNavigate) {
            if (isNextSign) {
                signatureIndex++;
            }
            else {
                signatureIndex--;
            }
        }
        if (signatureCount === 1) {
            this.renderSignatureField(0);
        }
        else {
            if (signatureIndex < signatureCount && signatureIndex >= 0) {
                this.renderSignatureField(signatureIndex);
            }
            else {
                if (isNextSign) {
                    if (signatureIndex >= signatureCount) {
                        this.renderSignatureField(0);
                    }
                }
                else {
                    if (signatureIndex <= 0) {
                        this.renderSignatureField(signatureCount - 1);
                    }
                }
            }
        }
    };
    FormFields.prototype.renderSignatureField = function (currentSignIndex) {
        var curSignIndex = currentSignIndex;
        // eslint-disable-next-line
        var signatureFields = this.signatureFieldCollection;
        var collectionData = this.pdfViewer.formFieldCollections;
        // eslint-disable-next-line
        var currentField;
        if (curSignIndex < collectionData.length) {
            for (var i = 0; i < collectionData.length; i++) {
                if (this.pdfViewer.formDesignerModule) {
                    var curSignIndexId = collectionData[curSignIndex].id;
                    var signatureFieldData = collectionData[i];
                    if (curSignIndexId === signatureFieldData.id) {
                        var pageIndex = signatureFieldData.pageIndex >= 0 ? signatureFieldData.pageIndex : signatureFieldData.pageNumber;
                        var isRender = this.pdfViewer.annotationModule.findRenderPageList(pageIndex);
                        if (!isRender) {
                            this.pdfViewer.navigation.goToPage(pageIndex + 1);
                            this.renderFormFields(pageIndex, false);
                        }
                        this.currentTarget = document.getElementById(signatureFieldData.id);
                        currentField = signatureFieldData;
                        break;
                    }
                }
                else {
                    var curSignIndexId = this.pdfViewer.formDesignerModule ? signatureFields[curSignIndex].FormField.uniqueID : signatureFields[curSignIndex].uniqueID;
                    var signatureFieldData = this.pdfViewer.formDesignerModule ? signatureFields[i].FormField : signatureFields[i];
                    if (curSignIndexId === signatureFieldData.uniqueID) {
                        var pageIndex_1 = signatureFieldData.PageIndex >= 0 ? signatureFieldData.PageIndex : signatureFieldData.pageNumber;
                        var isRender_1 = this.pdfViewer.annotationModule.findRenderPageList(pageIndex_1);
                        if (!isRender_1) {
                            this.pdfViewer.navigation.goToPage(pageIndex_1 + 1);
                            this.renderFormFields(pageIndex_1, false);
                        }
                        this.currentTarget = document.getElementById(signatureFieldData.uniqueID);
                        currentField = signatureFieldData;
                        break;
                    }
                }
            }
            if (this.currentTarget === null) {
                var pageIndex_2 = currentField.PageIndex >= 0 ? currentField.PageIndex : currentField.pageNumber;
                this.pdfViewer.navigation.goToPage(pageIndex_2);
                this.currentTarget = document.getElementById(currentField.uniqueID);
            }
            if (this.currentTarget) {
                if (this.currentTarget.className === 'e-pdfviewer-signatureformfields-signature' && !(this.pdfViewer.formDesignerModule)) {
                    document.getElementById(this.currentTarget.id).focus();
                    this.pdfViewer.select([this.currentTarget.id], null);
                }
                else if (this.currentTarget.className === 'e-pdfviewer-signatureformfields' || this.currentTarget.className === 'e-pdfviewer-signatureformfields-signature') {
                    if (this.pdfViewer.formDesignerModule) {
                        document.getElementById(this.currentTarget.id).parentElement.focus();
                    }
                    else {
                        document.getElementById(this.currentTarget.id).focus();
                    }
                }
            }
        }
    };
    /**
     * @private
     */
    FormFields.prototype.setFocus = function (id) {
        if (!id) {
            if (this.currentTarget) {
                document.getElementById(this.currentTarget.id).focus();
            }
        }
        else {
            this.removeFocus();
            var signatureElement = document.getElementById(id);
            signatureElement.classList.add('e-pv-signature-focus');
        }
    };
    /**
     * @private
     */
    FormFields.prototype.removeFocus = function () {
        if (this.signatureFieldCollection) {
            // eslint-disable-next-line
            var signatureFields = this.signatureFieldCollection;
            if (signatureFields.length === 0) {
                signatureFields = this.getSignField();
            }
            for (var i = 0; i < this.signatureFieldCollection.length; i++) {
                var signatureFieldId = this.pdfViewer.formDesignerModule ? this.signatureFieldCollection[i].FormField.uniqueID : this.signatureFieldCollection[i].uniqueID;
                var signatureElement = document.getElementById(signatureFieldId);
                if (signatureElement) {
                    signatureElement.classList.remove('e-pv-signature-focus');
                }
            }
            if (this.pdfViewer.formFieldsModule.currentTarget) {
                this.pdfViewer.formFieldsModule.currentTarget.classList.remove('e-pv-signature-focus');
            }
        }
    };
    // eslint-disable-next-line
    FormFields.prototype.getSignField = function () {
        if (this.pdfViewer.formDesignerModule) {
            this.signatureFieldCollection =
                this.pdfViewer.formDesignerModule.getFormDesignerSignField(this.signatureFieldCollection);
        }
        else {
            this.signatureFieldCollection = this.getFormFieldSignField();
        }
        return this.signatureFieldCollection;
    };
    FormFields.prototype.getFormFieldSignField = function () {
        // eslint-disable-next-line
        var data = this.pdfViewerBase.getItemFromSessionStorage('_formfields');
        // eslint-disable-next-line
        var currentData;
        if (data) {
            // eslint-disable-next-line
            var formFieldsData = JSON.parse(data);
            for (var i = 0; i < formFieldsData.length; i++) {
                currentData = formFieldsData[i];
                if (currentData.Name === 'SignatureField' || currentData.Name === 'InitialField') {
                    // eslint-disable-next-line
                    currentData['uniqueID'] = this.pdfViewer.element.id + 'input_' + currentData.PageIndex + '_' + i;
                    this.signatureFieldCollection.push(formFieldsData[i]);
                }
            }
        }
        return this.signatureFieldCollection;
    };
    /**
     * @private
     */
    FormFields.prototype.formFieldCollections = function () {
        // eslint-disable-next-line
        var data = this.pdfViewerBase.getItemFromSessionStorage('_formfields');
        if (data) {
            // eslint-disable-next-line
            var formFieldsData = JSON.parse(data);
            for (var i = 0; i < formFieldsData.length; i++) {
                // eslint-disable-next-line
                var currentData = formFieldsData[i];
                // eslint-disable-next-line
                var type = currentData['Name'];
                if (this.pdfViewer.formDesignerModule) {
                    if (currentData.Name !== 'ink' && currentData.Name !== 'SignatureImage' && currentData.Name !== 'SignatureText') {
                        this.retreiveFormFieldsData(currentData, true);
                    }
                }
                else {
                    if (currentData.Name !== 'ink') {
                        // eslint-disable-next-line
                        var formFieldCollection = { name: this.retriveFieldName(currentData), id: this.pdfViewer.element.id + 'input_' + parseFloat(currentData['PageIndex']) + '_' + i, isReadOnly: false, type: currentData.IsInitialField ? 'InitialField' : type, value: this.retriveCurrentValue(currentData), fontName: '', isRequired: currentData.IsRequired };
                        this.pdfViewer.formFieldCollections.push(formFieldCollection);
                    }
                }
            }
        }
    };
    FormFields.prototype.retreiveFormFieldsData = function (currentData, isCollection) {
        var fontFamily;
        var fontStyle;
        var fontSize;
        if (currentData.FieldName !== '') {
            if (currentData.IsInitialField) {
                currentData.Name = 'InitialField';
            }
            // eslint-disable-next-line
            var font = currentData['Font'];
            if (font !== null && font.Height) {
                fontFamily = font.Name;
                if (font.Italic) {
                    fontStyle = 'Italic';
                }
                if (font.Bold) {
                    fontStyle = 'Bold';
                }
                if (font.Strikeout) {
                    fontStyle = 'Strikethrough';
                }
                if (font.Underline) {
                    fontStyle = 'Underline';
                }
                fontSize = this.ConvertPointToPixel(font.Size);
            }
            var textAlignment = currentData.Alignment === 2 ? 'right' : (currentData.Alignment === 1 ? 'center' : 'left');
            var backgroundColor = currentData['BackColor'];
            var bounds = currentData['LineBounds'];
            var backColor = 'rgba(' + backgroundColor.R + ',' + backgroundColor.G + ',' + backgroundColor.B + ',' + 1 + ')';
            backColor = this.rgbaToHex(backColor);
            // set default color if field have black color as bg.
            if (currentData.IsTransparent === true) {
                backColor = "rgba(0,0,0,0)";
            }
            else if (backColor === '#000000ff') {
                backColor = '#daeaf7ff';
            }
            // eslint-disable-next-line
            var fontColor = currentData['FontColor'];
            var left = this.ConvertPointToPixel(bounds.X);
            var top_2 = this.ConvertPointToPixel(bounds.Y);
            var width = this.ConvertPointToPixel(bounds.Width);
            var height = this.ConvertPointToPixel(bounds.Height);
            var boundArray = { left: left, top: top_2, width: width, height: height };
            var foreColor = 'rgba(' + fontColor.R + ',' + fontColor.G + ',' + fontColor.B + ',' + 1 + ')';
            foreColor = this.rgbaToHex(foreColor);
            var borderColor = currentData['BorderColor'];
            var borderRGB = 'rgba(' + borderColor.R + ',' + borderColor.G + ',' + borderColor.B + ',' + 1 + ')';
            borderRGB = this.rgbaToHex(borderRGB);
            var borderWidth = currentData['BorderWidth'];
            this.selectedIndex = [];
            var fieldProperties = {
                bounds: { X: boundArray.left, Y: boundArray.top, Width: boundArray.width, Height: boundArray.height }, pageNumber: parseFloat(currentData['PageIndex']) + 1, name: currentData['ActualFieldName'], tooltip: currentData['ToolTip'],
                value: currentData['Text'], isChecked: currentData['Selected'], isSelected: currentData['Selected'], fontFamily: fontFamily, fontStyle: fontStyle, backgroundColor: backColor, color: foreColor, borderColor: borderRGB, thickness: borderWidth, fontSize: fontSize, isMultiline: currentData.Multiline,
                isReadOnly: currentData['IsReadonly'], isRequired: currentData['IsRequired'], insertSpaces: currentData['InsertSpaces'], alignment: textAlignment, options: this.getListValues(currentData), selectedIndex: this.selectedIndex, maxLength: currentData.MaxLength, visibility: currentData.Visible === 1 ? "hidden" : "visible", font: { isItalic: !isNullOrUndefined(font) ? font.Italic : false, isBold: !isNullOrUndefined(font) ? font.Bold : false, isStrikeout: !isNullOrUndefined(font) ? font.Strikeout : false, isUnderline: !isNullOrUndefined(font) ? font.Underline : false }
            };
            if (currentData.Name === 'DropDown' || currentData.Name === 'ListBox') {
                fieldProperties.value = currentData['SelectedValue'];
            }
            // eslint-disable-next-line
            var fieldType = this.getFormFieldType(currentData);
            if (fieldType === 'SignatureField' || fieldType === 'InitialField') {
                this.addSignaturePath(currentData);
                if (this.isSignatureField) {
                    fieldProperties.value = currentData.Value;
                }
            }
            var addedElement = this.pdfViewer.formDesignerModule.addFormField(fieldType, fieldProperties, isCollection);
            return addedElement;
        }
        return null;
    };
    /**
     * @param formField
     * @private
     */
    FormFields.prototype.updateFormFieldsCollection = function (formField) {
        var type = formField['Name'];
        var formFieldCollection = {
            name: this.retriveFieldName(formField), id: formField.uniqueID, isReadOnly: formField.IsReadonly, isRequired: formField.IsRequired, isSelected: type === 'CheckBox' ? false : formField.Selected,
            isChecked: type === 'RadioButton' ? false : formField.Selected, type: type, value: type === 'ListBox' || type === 'DropDown' ? formField.SelectedValue : formField.Value, fontName: formField.FontFamily ? formField.FontFamily : ''
        };
        this.pdfViewer.formFieldCollections[this.pdfViewer.formFieldCollections.findIndex(function (el) { return el.id === formFieldCollection.id; })] = formFieldCollection;
    };
    // eslint-disable-next-line
    FormFields.prototype.updateFormFieldValues = function (formFields) {
        this.readOnlyCollection.push(formFields.id);
        if (formFields) {
            // eslint-disable-next-line
            var currentElement = document.getElementById(formFields.id);
            if (currentElement) {
                if (formFields.isReadOnly) {
                    currentElement.disabled = true;
                    currentElement.style.backgroundColor = '';
                    currentElement.style.cursor = 'default';
                }
                else {
                    if (currentElement.style.backgroundColor === '') {
                        currentElement.style.backgroundColor = 'rgba(0, 20, 200, 0.2)';
                    }
                    currentElement.disabled = false;
                    currentElement.style.cursor = '';
                }
            }
            this.updateDataInSession(currentElement);
        }
    };
    /**
     * @param currentData
     * @private
     */
    // eslint-disable-next-line
    FormFields.prototype.retriveFieldName = function (currentData) {
        // eslint-disable-next-line
        var currentField;
        // eslint-disable-next-line
        switch (currentData['Name']) {
            case 'Textbox':
            case 'Password':
            case 'SignatureField':
            case 'InitialField':
                currentField = currentData.FieldName;
                break;
            case 'RadioButton':
            case 'CheckBox':
                currentField = currentData.GroupName;
                break;
            case 'DropDown':
            case 'ListBox':
                currentField = currentData.Text;
                break;
        }
        return currentField;
    };
    // eslint-disable-next-line
    FormFields.prototype.retriveCurrentValue = function (currentData) {
        // eslint-disable-next-line
        var currentField;
        // eslint-disable-next-line
        switch (currentData['Name']) {
            case 'Textbox':
            case 'Password':
                currentField = currentData.Text;
                break;
            case 'SignatureField':
                currentField = currentData.Value;
                break;
            case 'RadioButton':
            case 'CheckBox':
                currentField = currentData.Selected;
                break;
            case 'DropDown':
                currentField = currentData.SelectedValue;
                break;
            case 'ListBox':
                currentField = currentData.SelectedList;
                break;
        }
        return currentField;
    };
    // eslint-disable-next-line
    FormFields.prototype.getSignatureBounds = function (LineBounds, bounds, pageIndex) {
        // eslint-disable-next-line
        var pageDetails = this.pdfViewerBase.pageSize[pageIndex];
        // eslint-disable-next-line
        var bound = 0;
        switch (pageDetails.rotation) {
            case 0:
                bound = bounds;
                break;
            case 1:
                bound = { x: bounds.x + LineBounds.Width + (bounds.width / 3.5), y: pageDetails.width - LineBounds.X + (bounds.height / 4) };
                break;
            case 2:
                bound = { x: pageDetails.width - bounds.x - bounds.width, y: pageDetails.height - bounds.y - bounds.height };
                break;
            case 3:
                bound = { x: bounds.y - (bounds.width / 2) + bounds.height, y: bounds.x + (bounds.width / 3) };
                break;
        }
        return bound;
    };
    /**
     * @private
     */
    // eslint-disable-next-line
    FormFields.prototype.downloadFormFieldsData = function () {
        // eslint-disable-next-line
        var data = this.pdfViewerBase.getItemFromSessionStorage('_formfields');
        if (data) {
            // eslint-disable-next-line
            var formFieldsData = JSON.parse(data);
            // eslint-disable-next-line
            var datas = {};
            var fieldDatas = [];
            for (var m = 0; m < formFieldsData.length; m++) {
                // eslint-disable-next-line
                var currentData = formFieldsData[m];
                var isRequired = currentData.IsRequired;
                if (currentData.Name === 'Textbox' || currentData.Name === 'Password' || currentData.Multiline) {
                    if (isRequired && (currentData.Text === '' || currentData.Text === null)) {
                        this.pdfViewerBase.validateForm = true;
                        this.pdfViewerBase.nonFillableFields[currentData.FieldName] = currentData.Text;
                    }
                    else {
                        delete (this.pdfViewerBase.nonFillableFields[currentData.FieldName]);
                    }
                    fieldDatas = { fieldValue: currentData.Text, isReadOnly: currentData.IsReadonly };
                    datas[currentData.FieldName] = fieldDatas;
                }
                else if (currentData.Name === 'RadioButton' && currentData.Selected) {
                    if (isRequired && currentData.Selected === false) {
                        this.pdfViewerBase.validateForm = true;
                        this.pdfViewerBase.nonFillableFields[currentData.GroupName] = currentData.Value;
                    }
                    else {
                        delete (this.pdfViewerBase.nonFillableFields[currentData.GroupName]);
                    }
                    fieldDatas = { fieldValue: currentData.Value, isReadOnly: currentData.IsReadonly };
                    datas[currentData.GroupName] = fieldDatas;
                }
                else if (currentData.Name === 'CheckBox') {
                    if (isRequired && currentData.Selected === false) {
                        this.pdfViewerBase.validateForm = true;
                        this.pdfViewerBase.nonFillableFields[currentData.GroupName] = currentData.Selected;
                    }
                    else {
                        delete (this.pdfViewerBase.nonFillableFields[currentData.GroupName]);
                    }
                    if (currentData.CheckboxIndex && currentData.Selected) {
                        fieldDatas = { fieldValue: currentData.CheckboxIndex, isReadOnly: currentData.IsReadonly };
                        datas[currentData.GroupName] = fieldDatas;
                    }
                    else if (datas[currentData.GroupName] === undefined || datas[currentData.GroupName] === null) {
                        fieldDatas = { fieldValue: currentData.Selected, isReadOnly: currentData.IsReadonly };
                        datas[currentData.GroupName] = fieldDatas;
                    }
                }
                else if (currentData.Name === 'DropDown') {
                    if (isRequired && currentData.SelectedValue === '') {
                        this.pdfViewerBase.validateForm = true;
                        this.pdfViewerBase.nonFillableFields[currentData.Text] = currentData.SelectedValue;
                    }
                    else {
                        delete (this.pdfViewerBase.nonFillableFields[currentData.Text]);
                    }
                    fieldDatas = { fieldValue: currentData.SelectedValue, isReadOnly: currentData.IsReadonly };
                    datas[currentData.Text] = fieldDatas;
                }
                else if (currentData.Name === 'ListBox') {
                    // eslint-disable-next-line
                    var childItems = currentData['TextList'];
                    var childItemsText = [];
                    for (var m_1 = 0; m_1 < currentData.SelectedList.length; m_1++) {
                        // eslint-disable-next-line
                        var currentElement = currentData.SelectedList[m_1];
                        childItemsText.push(childItems[currentElement]);
                    }
                    fieldDatas = { fieldValue: JSON.stringify(childItemsText), isReadOnly: currentData.IsReadonly };
                    datas[currentData.Text] = fieldDatas;
                }
                else if (currentData.Name === 'SignatureField' || currentData.Name === 'InitialField') {
                    // eslint-disable-next-line
                    var csData = void 0;
                    if (currentData.Value === null || currentData.Value === '') {
                        this.addSignaturePath(currentData);
                    }
                    if (currentData.Value && currentData.Value !== '') {
                        csData = currentData.Value;
                        var fontFamily = currentData.fontFamily ? currentData.fontFamily : currentData.FontFamily;
                        if (fontFamily) {
                            datas[currentData.FieldName + 'fontName'] = fontFamily;
                            datas[currentData.FieldName + 'fontSize'] = currentData.fontSize ? currentData.fontSize : currentData.FontSize;
                        }
                        else if (currentData.Value.split('base64,')[1]) {
                            datas[currentData.FieldName + 'ImageData'] = true;
                        }
                        else {
                            // eslint-disable-next-line
                            var collectionData = processPathData(currentData.Value);
                            csData = splitArrayCollection(collectionData);
                        }
                    }
                    if (isRequired && currentData.Value === null || currentData.Value === '') {
                        this.pdfViewerBase.validateForm = true;
                        this.pdfViewerBase.nonFillableFields[currentData.FieldName] = JSON.stringify(csData);
                    }
                    else {
                        delete (this.pdfViewerBase.nonFillableFields[currentData.FieldName]);
                    }
                    datas[currentData.FieldName] = JSON.stringify(csData);
                    if (currentData.Bounds) {
                        // eslint-disable-next-line
                        var bounds = this.getSignatureBounds(currentData.LineBounds, currentData.Bounds, currentData.PageIndex);
                        currentData.Bounds.x = bounds.x;
                        currentData.Bounds.y = bounds.y;
                        datas[currentData.FieldName + 'bounds'] = JSON.stringify(currentData.Bounds);
                    }
                    else {
                        // eslint-disable-next-line
                        var lineBounds = currentData.LineBounds;
                        // eslint-disable-next-line
                        var bounds = { x: this.ConvertPointToPixel(lineBounds.X), y: this.ConvertPointToPixel(lineBounds.Y), width: this.ConvertPointToPixel(lineBounds.Width), height: this.ConvertPointToPixel(lineBounds.Height) };
                        datas[currentData.FieldName + 'bounds'] = JSON.stringify(bounds);
                    }
                    datas[currentData.FieldName + 'isReadOnly'] = currentData.IsReadonly;
                }
            }
            return (JSON.stringify(datas));
        }
    };
    FormFields.prototype.focusFormFields = function (event) {
        // eslint-disable-next-line
        var currentTarget = event.target;
        // eslint-disable-next-line
        if (currentTarget && (currentTarget.className !== 'e-pdfviewer-signatureformfields' && currentTarget.className !== 'e-pdfviewer-signatureformfields e-pv-signature-focus')) {
            // eslint-disable-next-line
            var backgroundcolor = currentTarget.style.backgroundColor;
            // eslint-disable-next-line
            var currentIndex = backgroundcolor.lastIndexOf(',');
            // eslint-disable-next-line
            var currentColor = backgroundcolor.slice(0, currentIndex + 1) + 0 + ')';
            currentTarget.style.backgroundColor = currentColor;
            if (currentTarget.type === 'checkbox') {
                currentTarget.style.webkitAppearance = '';
            }
            currentTarget.style.boxShadow = "0 0 5px " + (currentTarget.style.borderColor === 'transparent' ? '#000000' : currentTarget.style.borderColor);
        }
        else if (currentTarget) {
            // eslint-disable-next-line
            if (currentTarget.className === 'e-pdfviewer-signatureformfields' || currentTarget.className === 'e-pdfviewer-signatureformfields-signature' || currentTarget.className === 'e-pdfviewer-signatureformfields e-pv-signature-focus' || currentTarget.className === 'e-pdfviewer-signatureformfields-signature  e-pv-signature-focus') {
                this.setFocus(currentTarget.id);
            }
        }
    };
    FormFields.prototype.blurFormFields = function (event) {
        // eslint-disable-next-line
        var currentTarget = event.target;
        if (currentTarget.InsertSpaces && this.isKeyDownCheck) {
            // eslint-disable-next-line
            var font = parseInt(currentTarget.style.width) - (parseInt(currentTarget.style.height) / 2);
            currentTarget.style.width = '' + font + 'px';
            this.isKeyDownCheck = false;
        }
        if (currentTarget.type === 'checkbox') {
            this.pdfViewer.fireFocusOutFormField(currentTarget.name, currentTarget.checked);
        }
        else {
            this.pdfViewer.fireFocusOutFormField(currentTarget.name, currentTarget.value);
        }
        // eslint-disable-next-line
        var backgroundcolor = currentTarget.style.backgroundColor;
        // eslint-disable-next-line
        var currentIndex = backgroundcolor.lastIndexOf(',');
        // eslint-disable-next-line
        var currentColor = backgroundcolor.slice(0, currentIndex + 1) + 0.2 + ')';
        currentTarget.style.backgroundColor = currentColor;
        currentTarget.style.boxShadow = 'none';
        if ((currentTarget.type === 'checkbox') && !currentTarget.checked) {
            currentTarget.style.webkitAppearance = 'none';
        }
        else {
            currentTarget.style.webkitAppearance = '';
        }
    };
    FormFields.prototype.updateFormFields = function (event) {
        // eslint-disable-next-line
        var currentTarget = event.target;
        if (currentTarget.className === 'e-pdfviewer-ListBox') {
            currentTarget = currentTarget.parentElement;
            this.updateDataInSession(currentTarget);
        }
        else if (currentTarget.className === 'e-pdfviewer-signatureformfields' || currentTarget.className === 'e-pdfviewer-signatureformfields e-pv-signature-focus') {
            this.currentTarget = currentTarget;
        }
        else if (currentTarget.className === 'e-pv-buttonItem' || currentTarget.type === 'button') {
            this.pdfViewer.fireButtonFieldClickEvent(currentTarget.value, currentTarget.name, currentTarget.id);
        }
        for (var m = 0; m < this.pdfViewer.formFieldCollections.length; m++) {
            if (currentTarget.id === this.pdfViewer.formFieldCollections[m].id) {
                if (this.pdfViewer.formDesignerModule || this.pdfViewer.annotationModule) {
                    this.pdfViewer.fireFormFieldClickEvent('formFieldClicked', this.pdfViewer.formFieldCollections[m]);
                }
                // eslint-disable-next-line
                if (currentTarget.className === 'e-pdfviewer-signatureformfields' || currentTarget.className === 'e-pdfviewer-signatureformfields-signature' || currentTarget.className === 'e-pdfviewer-signatureformfields e-pv-signature-focus' || currentTarget.className === 'e-pdfviewer-signatureformfields-signature  e-pv-signature-focus') {
                    this.setFocus(currentTarget.id);
                }
            }
        }
    };
    /**
     * @param signatureType
     * @param value
     * @param target
     * @param fontname
     * @param signatureType
     * @param value
     * @param target
     * @param fontname
     * @private
     */
    // eslint-disable-next-line
    FormFields.prototype.drawSignature = function (signatureType, value, target, fontname) {
        var annot;
        // eslint-disable-next-line
        var proxy = this;
        var bounds;
        var targetBounds;
        var parentElementBounds;
        var data;
        if (this.pdfViewer.formDesigner) {
            data = this.pdfViewerBase.getItemFromSessionStorage('_formDesigner');
        }
        else {
            data = this.pdfViewerBase.getItemFromSessionStorage('_formfields');
        }
        var formFieldsData = JSON.parse(data);
        if (this.pdfViewer.formDesignerModule) {
            var targetName = this.currentTarget && this.currentTarget.offsetParent ? this.currentTarget.offsetParent.name : this.currentTarget ? this.currentTarget.name : target.name ? target.name : target.offsetParent.name;
        }
        else {
            var targetName = this.currentTarget ? this.currentTarget.name : target.name ? target.name : target.offsetParent.name;
        }
        var _loop_2 = function () {
            var fieldName = this_2.pdfViewer.formDesigner ? formFieldsData[i].FormField.name : formFieldsData[i].FieldName;
            if (this_2.pdfViewer.formDesigner ? fieldName === targetName : fieldName === targetName && (!isNullOrUndefined(formFieldsData[i].ActualFieldName))) {
                target = this_2.pdfViewer.formDesigner ? document.getElementById(formFieldsData[i].Key.split("_")[0]) : document.getElementById(formFieldsData[i].uniqueID);
                // eslint-disable-next-line
                var currentField_1 = target;
                var signatureAdd_1 = true;
                this_2.pdfViewer.annotations.filter(function (item) {
                    if (!isNullOrUndefined(currentField_1) && item.id === target.id + "_content") {
                        signatureAdd_1 = false;
                    }
                });
                if (!isNullOrUndefined(currentField_1) && signatureAdd_1) {
                    var elementId = currentField_1.offsetParent.offsetParent.id.split("_")[0];
                    var signatureField_1 = this_2.pdfViewer.nameTable[elementId];
                    if (target && target.offsetParent && signatureField_1) {
                        targetBounds = target.getBoundingClientRect();
                        parentElementBounds = target.offsetParent.offsetParent.offsetParent.getBoundingClientRect();
                        this_2.pdfViewerBase.drawSignatureWithTool = true;
                        if (target.nextSibling && target.nextSibling.id.indexOf("initial") !== -1) {
                            this_2.pdfViewer.isInitialFieldToolbarSelection = true;
                        }
                    }
                    var currentValue_1 = value ? value : this_2.pdfViewerBase.signatureModule.outputString;
                    var currentFont = fontname ? fontname : this_2.pdfViewerBase.signatureModule.fontName;
                    var zoomvalue = this_2.pdfViewerBase.getZoomFactor();
                    var currentWidth = this_2.pdfViewerBase.drawSignatureWithTool ? targetBounds.width / zoomvalue : parseFloat(currentField_1.style.width) / zoomvalue;
                    var currentHeight = this_2.pdfViewerBase.drawSignatureWithTool ? targetBounds.height / zoomvalue : parseFloat(currentField_1.style.height) / zoomvalue;
                    var currentLeft = this_2.pdfViewerBase.drawSignatureWithTool ? ((targetBounds.left - parentElementBounds.left)) / zoomvalue : parseFloat(currentField_1.style.left) / zoomvalue;
                    var currentTop = this_2.pdfViewerBase.drawSignatureWithTool ? ((targetBounds.top - parentElementBounds.top)) / zoomvalue : parseFloat(currentField_1.style.top) / zoomvalue;
                    var currentPage_1 = this_2.pdfViewerBase.drawSignatureWithTool ? target.nextElementSibling ? parseFloat(target.nextElementSibling.id.split("_")[1]) : parseFloat(currentField_1.id.split('_')[1]) : parseFloat(currentField_1.id.split('_')[1]);
                    var currentIndex = this_2.pdfViewerBase.drawSignatureWithTool ? target.nextElementSibling ? parseFloat(target.nextElementSibling.id.split('_')[2]) : parseFloat(currentField_1.id.split('_')[2]) : parseFloat(currentField_1.id.split('_')[2]);
                    var signString_1 = this_2.pdfViewerBase.signatureModule.saveImageString;
                    var signatureFontFamily_1;
                    var signatureFontSize_1;
                    var rotateAngleString = currentField_1.offsetParent.offsetParent.style.transform ? currentField_1.offsetParent.offsetParent.style.transform : currentField_1.style.transform;
                    rotateAngleString = rotateAngleString.substring(rotateAngleString.indexOf("(") + 1, rotateAngleString.indexOf("d"));
                    var rotateAngle_1 = rotateAngleString ? parseInt(rotateAngleString) : 0;
                    if (signatureType === 'Type') {
                        if (!currentFont) {
                            currentFont = 'Helvetica';
                        }
                        // eslint-disable-next-line
                        bounds = this_2.getSignBounds(currentIndex, rotateAngle_1, currentPage_1, zoomvalue, currentLeft, currentTop, currentWidth, currentHeight);
                        if (this_2.pdfViewer.signatureFitMode === 'Default') {
                            bounds = this_2.getDefaultBoundsforSign(bounds);
                        }
                        annot = {
                            // eslint-disable-next-line max-len
                            id: currentField_1.id, bounds: { x: bounds.x, y: bounds.y, width: bounds.width, height: bounds.height }, pageIndex: currentPage_1, data: currentValue_1, modifiedDate: '',
                            shapeAnnotationType: 'SignatureText', opacity: 1, rotateAngle: rotateAngle_1, annotName: 'SignatureText', comments: [], review: { state: '', stateModel: '', modifiedDate: '', author: '' }, fontFamily: currentFont, fontSize: bounds.height / this_2.signatureFontSizeConstent
                        };
                        if (annot.shapeAnnotationType === 'SignatureText') {
                            var textWidth = this_2.getTextWidth(annot.data, annot.fontSize, annot.fontFamily);
                            var widthRatio = 1;
                            if (textWidth > bounds.width)
                                widthRatio = bounds.width / textWidth;
                            annot.fontSize = this_2.getFontSize(Math.floor((annot.fontSize * widthRatio)));
                        }
                        signString_1 = annot.data;
                        signatureFontFamily_1 = annot.fontFamily;
                        signatureFontSize_1 = annot.fontSize;
                    }
                    else if (signatureType === 'Image') {
                        // eslint-disable-next-line
                        bounds = this_2.getSignBounds(currentIndex, rotateAngle_1, currentPage_1, zoomvalue, currentLeft, currentTop, currentWidth, currentHeight);
                        var currentTarget_1 = target;
                        var image_1 = new Image();
                        image_1.src = currentValue_1;
                        image_1.onload = function () {
                            proxy.imageOnLoad(bounds, image_1, currentValue_1, currentPage_1, rotateAngle_1, currentField_1, signatureField_1, signString_1, signatureFontFamily_1, signatureFontSize_1, currentTarget_1);
                        };
                    }
                    else {
                        if ((currentValue_1.indexOf('base64')) !== -1) {
                            // eslint-disable-next-line
                            bounds = this_2.getSignBounds(currentIndex, rotateAngle_1, currentPage_1, zoomvalue, currentLeft, currentTop, currentWidth, currentHeight);
                            if (this_2.pdfViewer.signatureFitMode === 'Default') {
                                bounds = this_2.getDefaultBoundsforSign(bounds);
                            }
                            annot = {
                                // eslint-disable-next-line max-len
                                id: currentField_1.id, bounds: { x: bounds.x, y: bounds.y, width: bounds.width, height: bounds.height }, pageIndex: currentPage_1, data: currentValue_1, modifiedDate: '',
                                shapeAnnotationType: 'SignatureImage', opacity: 1, rotateAngle: rotateAngle_1, annotName: 'SignatureField', comments: [], review: { state: '', stateModel: '', modifiedDate: '', author: '' }
                            };
                            signString_1 = annot.data;
                        }
                        else {
                            // eslint-disable-next-line
                            if (this_2.pdfViewer.signatureFitMode === 'Default') {
                                // eslint-disable-next-line
                                var signatureBounds = this_2.updateSignatureAspectRatio(currentValue_1, false, currentField_1);
                                // eslint-disable-next-line
                                bounds = this_2.getSignBounds(currentIndex, rotateAngle_1, currentPage_1, zoomvalue, currentLeft, currentTop, signatureBounds.width, signatureBounds.height, true);
                                bounds.x = bounds.x + signatureBounds.left;
                                bounds.y = bounds.y + signatureBounds.top;
                            }
                            else {
                                bounds = this_2.getSignBounds(currentIndex, rotateAngle_1, currentPage_1, zoomvalue, currentLeft, currentTop, currentWidth, currentHeight);
                            }
                            annot = {
                                // eslint-disable-next-line max-len
                                id: currentField_1.id, bounds: { x: bounds.x, y: bounds.y, width: bounds.width, height: bounds.height }, pageIndex: currentPage_1, data: currentValue_1, modifiedDate: '',
                                shapeAnnotationType: 'Path', opacity: 1, rotateAngle: rotateAngle_1, annotName: 'SignatureField', comments: [], review: { state: '', stateModel: '', modifiedDate: '', author: '' }
                            };
                        }
                    }
                    if (this_2.pdfViewerBase.drawSignatureWithTool && signatureField_1 && signatureType !== 'Image') {
                        annot.id = signatureField_1.id + "_content";
                        var obj = this_2.pdfViewer.add(annot);
                        signatureField_1.wrapper.children.push(obj.wrapper);
                    }
                    else if (signatureType !== 'Image') {
                        this_2.pdfViewer.add(annot);
                    }
                    if (annot && annot.shapeAnnotationType === 'Path' && currentValue_1 !== '') {
                        this_2.pdfViewerBase.currentSignatureAnnot = annot;
                        // eslint-disable-next-line
                        var position = { currentHeight: currentHeight, currentWidth: currentWidth, currentLeft: currentLeft, currentTop: currentTop };
                        this_2.pdfViewerBase.signatureModule.addSignatureCollection(bounds, position);
                        signString_1 = this_2.pdfViewerBase.signatureModule.saveImageString;
                        this_2.pdfViewerBase.currentSignatureAnnot = null;
                    }
                    if (signatureType !== 'Image') {
                        // eslint-disable-next-line
                        var canvass = document.getElementById(this_2.pdfViewer.element.id + '_annotationCanvas_' + currentPage_1);
                        // eslint-disable-next-line
                        this_2.pdfViewer.renderDrawing(canvass, currentPage_1);
                        this_2.pdfViewerBase.signatureModule.showSignatureDialog(false);
                        if (currentField_1.className === 'e-pdfviewer-signatureformfields e-pv-signature-focus') {
                            currentField_1.className = 'e-pdfviewer-signatureformfields-signature e-pv-signature-focus';
                        }
                        else {
                            currentField_1.className = 'e-pdfviewer-signatureformfields-signature';
                        }
                        if (this_2.pdfViewerBase.drawSignatureWithTool && signatureField_1) {
                            var key = target.offsetParent.offsetParent.id.split('_')[0] + '_content';
                            annot.bounds = { x: bounds.x * zoomvalue, y: bounds.y * zoomvalue, width: bounds.width * zoomvalue, height: bounds.height * zoomvalue };
                            this_2.updateSignatureDataInSession(annot, key);
                        }
                        else {
                            this_2.updateDataInSession(currentField_1, annot.data, annot.bounds, signatureFontFamily_1, signatureFontSize_1);
                        }
                        currentField_1.style.pointerEvents = 'none';
                        if (this_2.pdfViewer.annotation) {
                            this_2.pdfViewer.annotation.addAction(annot.pageIndex, null, annot, 'FormField Value Change', '', annot, annot);
                        }
                        // eslint-disable-next-line
                        if (annot.shapeAnnotationType === 'Path' || annot.shapeAnnotationType === "SignatureText") {
                            this_2.pdfViewer.fireSignatureAdd(annot.pageIndex, annot.id, annot.shapeAnnotationType, annot.bounds, annot.opacity, null, null, signString_1);
                        }
                        this_2.pdfViewer.fireFocusOutFormField(currentField_1.name, currentValue_1);
                    }
                }
            }
        };
        var this_2 = this;
        for (var i = 0; i < formFieldsData.length; i++) {
            _loop_2();
        }
        if (signatureType !== 'Image') {
            this.pdfViewerBase.signatureModule.hideSignaturePanel();
            this.pdfViewerBase.drawSignatureWithTool = false;
            this.pdfViewer.isInitialFieldToolbarSelection = false;
        }
    };
    //  EJ2-62918- Image signature width is wrong while adding programmatically and it is fixed by adding an onload event.
    //  A function was added and it was called
    FormFields.prototype.imageOnLoad = function (bounds, image, currentValue, currentPage, rotateAngle, currentField, signatureField, signString, signatureFontFamily, signatureFontSize, target) {
        if (target && target.offsetParent && signatureField) {
            this.pdfViewerBase.drawSignatureWithTool = true;
            if (target.nextSibling && target.nextSibling.id.indexOf("initial") !== -1) {
                this.pdfViewer.isInitialFieldToolbarSelection = true;
            }
        }
        var annot;
        if (this.pdfViewer.signatureFitMode === 'Default') {
            {
                var padding = Math.min(bounds.height / this.paddingDifferenceValue, bounds.width / this.paddingDifferenceValue);
                var maxHeight = bounds.height - padding;
                var maxWidth = bounds.width - padding;
                var imageWidth = image.width;
                var imageHeight = image.height;
                var beforeWidth = bounds.width;
                var beforeHeight = bounds.height;
                var ratio = Math.min(maxWidth / imageWidth, maxHeight / imageHeight);
                bounds.width = imageWidth * ratio;
                bounds.height = imageHeight * ratio;
                bounds.x = bounds.x + (beforeWidth - bounds.width) / 2;
                bounds.y = bounds.y + (beforeHeight - bounds.height) / 2;
            }
            annot = {
                // eslint-disable-next-line max-len
                id: currentField.id, bounds: { x: bounds.x, y: bounds.y, width: bounds.width, height: bounds.height }, pageIndex: currentPage, data: currentValue, modifiedDate: '',
                shapeAnnotationType: 'SignatureImage', opacity: 1, rotateAngle: rotateAngle, annotName: 'SignatureField', comments: [], review: { state: '', stateModel: '', modifiedDate: '', author: '' }
            };
            signString = annot.data;
            if (this.pdfViewerBase.drawSignatureWithTool && signatureField) {
                annot.id = signatureField.id + "_content";
                var obj = this.pdfViewer.add(annot);
                signatureField.wrapper.children.push(obj.wrapper);
            }
            else {
                this.pdfViewer.add(annot);
            }
            var canvass = document.getElementById(this.pdfViewer.element.id + '_annotationCanvas_' + currentPage);
            // eslint-disable-next-line
            this.pdfViewer.renderDrawing(canvass, currentPage);
            this.pdfViewerBase.signatureModule.showSignatureDialog(false);
            if (currentField.className === 'e-pdfviewer-signatureformfields e-pv-signature-focus') {
                currentField.className = 'e-pdfviewer-signatureformfields-signature e-pv-signature-focus';
            }
            else {
                currentField.className = 'e-pdfviewer-signatureformfields-signature';
            }
            if (this.pdfViewerBase.drawSignatureWithTool && signatureField) {
                var zoomvalue = this.pdfViewerBase.getZoomFactor();
                var key = target.offsetParent.offsetParent.id.split('_')[0] + '_content';
                annot.bounds = { x: bounds.x * zoomvalue, y: bounds.y * zoomvalue, width: bounds.width * zoomvalue, height: bounds.height * zoomvalue };
                this.updateSignatureDataInSession(annot, key);
            }
            else {
                this.updateDataInSession(currentField, annot.data, annot.bounds, signatureFontFamily, signatureFontSize);
            }
            currentField.style.pointerEvents = 'none';
            if (this.pdfViewer.annotation) {
                this.pdfViewer.annotation.addAction(annot.pageIndex, null, annot, 'FormField Value Change', '', annot, annot);
            }
            // eslint-disable-next-line
            if (annot.shapeAnnotationType === "SignatureImage") {
                this.pdfViewer.fireSignatureAdd(annot.pageIndex, annot.id, annot.shapeAnnotationType, annot.bounds, annot.opacity, null, null, signString);
            }
            this.pdfViewer.fireFocusOutFormField(currentField.name, currentValue);
        }
        this.pdfViewerBase.signatureModule.hideSignaturePanel();
        this.pdfViewerBase.drawSignatureWithTool = false;
        this.pdfViewer.isInitialFieldToolbarSelection = false;
    };
    FormFields.prototype.updateSignatureDataInSession = function (annot, key) {
        var data = this.pdfViewerBase.getItemFromSessionStorage('_formDesigner');
        var formFieldsData = JSON.parse(data);
        if (!isNullOrUndefined(formFieldsData)) {
            var _loop_3 = function (i) {
                if (formFieldsData[i].Key === key) {
                    var formFieldIndex = this_3.pdfViewer.formFieldCollection.findIndex(function (el) { return el.id === formFieldsData[i].FormField.id.split('_')[0]; });
                    if (annot.shapeAnnotationType === "SignatureText") {
                        formFieldsData[i].FormField.signatureType = "Text";
                        this_3.pdfViewerBase.formFieldCollection[i].FormField.signatureType = "Text";
                        this_3.pdfViewer.nameTable[key].signatureType = "Text";
                        formFieldsData[i].FormField.fontFamily = annot.fontFamily === "TimesRoman" ? "Times New Roman" : annot.fontFamily;
                        this_3.pdfViewerBase.formFieldCollection[i].FormField.fontFamily = annot.fontFamily;
                        this_3.pdfViewer.nameTable[key].fontFamily = annot.fontFamily;
                        formFieldsData[i].FormField.fontSize = annot.fontSize;
                        this_3.pdfViewerBase.formFieldCollection[i].FormField.fontSize = annot.fontSize;
                        this_3.pdfViewer.nameTable[key].fontSize = annot.fontSize;
                        formFieldIndex > -1 ? this_3.pdfViewer.formFieldCollection[formFieldIndex].signatureType = "Text" : null;
                    }
                    else if (annot.shapeAnnotationType === "SignatureImage") {
                        formFieldsData[i].FormField.signatureType = "Image";
                        this_3.pdfViewerBase.formFieldCollection[i].FormField.signatureType = "Image";
                        this_3.pdfViewer.nameTable[key].signatureType = "Image";
                        formFieldIndex > -1 ? this_3.pdfViewer.formFieldCollection[formFieldIndex].signatureType = "Image" : null;
                    }
                    else {
                        formFieldsData[i].FormField.signatureType = "Path";
                        this_3.pdfViewerBase.formFieldCollection[i].FormField.signatureType = "Path";
                        this_3.pdfViewer.nameTable[key].signatureType = "Path";
                        formFieldIndex > -1 ? this_3.pdfViewer.formFieldCollection[formFieldIndex].signatureType = "Path" : null;
                    }
                    formFieldsData[i].FormField.signatureBound = annot.bounds;
                    this_3.pdfViewerBase.formFieldCollection[i].FormField.signatureBound = annot.bounds;
                    this_3.pdfViewer.nameTable[key].signatureBound = annot.bounds;
                    formFieldIndex > -1 ? this_3.pdfViewer.formFieldCollection[formFieldIndex].signatureBound = annot.bounds : null;
                    if (annot.shapeAnnotationType === "Path") {
                        var collectionData = processPathData(annot.data);
                        var csData = splitArrayCollection(collectionData);
                        formFieldsData[i].FormField.value = JSON.stringify(csData);
                        this_3.pdfViewer.nameTable[key].value = annot.data;
                        this_3.pdfViewer.nameTable[key.split('_')[0]].value = annot.data;
                        this_3.pdfViewerBase.formFieldCollection[i].FormField.value = JSON.stringify(csData);
                        formFieldIndex > -1 ? this_3.pdfViewer.formFieldCollection[formFieldIndex].value = JSON.stringify(csData) : null;
                    }
                    else {
                        formFieldsData[i].FormField.value = annot.data;
                        this_3.pdfViewerBase.formFieldCollection[i].FormField.value = annot.data;
                        this_3.pdfViewer.nameTable[key.split('_')[0]].value = annot.data;
                        this_3.pdfViewer.nameTable[key].value = annot.data;
                        formFieldIndex > -1 ? this_3.pdfViewer.formFieldCollection[formFieldIndex].value = annot.data : null;
                    }
                    this_3.pdfViewer.formDesigner.updateFormFieldCollections(formFieldsData[i].FormField);
                    this_3.pdfViewer.formDesigner.updateFormFieldPropertiesChanges("formFieldPropertiesChange", formFieldsData[i].FormField, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, "", formFieldsData[i].FormField.value);
                }
            };
            var this_3 = this;
            for (var i = 0; i < formFieldsData.length; i++) {
                _loop_3(i);
            }
        }
        this.pdfViewerBase.setItemInSessionStorage(formFieldsData, '_formDesigner');
    };
    /**
     * @private
     */
    FormFields.prototype.getDefaultBoundsforSign = function (bounds) {
        return { x: bounds.x + 4, y: bounds.y + 4, width: bounds.width - 8, height: bounds.height - 8 };
    };
    /**
     * @private
      */
    // eslint-disable-next-line
    FormFields.prototype.getSignBounds = function (currentIndex, rotateAngle, currentPage, zoomvalue, currentLeft, currentTop, currentWidth, currentHeight, isDraw) {
        // eslint-disable-next-line
        var bounds;
        var signatureId = this.pdfViewer.isInitialFieldToolbarSelection ? 'initialIcon' : 'signIcon';
        var signIcon = document.getElementById(signatureId + '_' + currentPage + '_' + currentIndex);
        var signLeft = signIcon ? parseFloat(signIcon.style.left) * zoomvalue : 0;
        var difference = (currentLeft * zoomvalue) - (signLeft / zoomvalue);
        if (rotateAngle === 90 || rotateAngle === 270) {
            this.rotateAngle = 0;
            if (signIcon.style.left !== '') {
                if (isDraw) {
                    return bounds = { x: currentLeft - (difference / zoomvalue) - zoomvalue, y: currentTop + (difference / zoomvalue) + zoomvalue, width: currentWidth, height: currentHeight };
                }
                else {
                    return bounds = { x: currentLeft - (difference / zoomvalue) - zoomvalue, y: currentTop + (difference / zoomvalue) + zoomvalue, width: currentHeight, height: currentWidth };
                }
            }
            else {
                difference = 10;
                if (isDraw) {
                    return bounds = { x: currentLeft - currentWidth, y: currentTop + currentWidth, width: currentHeight, height: currentWidth };
                }
                else {
                    return bounds = { x: currentLeft - currentWidth - difference / 2, y: currentTop + currentWidth + difference, width: currentHeight, height: currentWidth };
                }
            }
        }
        else {
            this.rotateAngle = 0;
            return bounds = { x: currentLeft, y: currentTop, width: currentWidth, height: currentHeight };
        }
    };
    // eslint-disable-next-line
    FormFields.prototype.updateSameFieldsValue = function (event) {
        if (this.formFieldsData) {
            for (var i = 0; i < this.formFieldsData.length; i++) {
                // eslint-disable-next-line
                var currentField = this.formFieldsData[i];
                if (event.target.name === currentField.FieldName && event.target.id !== currentField.uniqueID) {
                    // eslint-disable-next-line
                    var currentTarget = document.getElementById(this.formFieldsData[i].uniqueID);
                    if (currentTarget) {
                        currentTarget.value = event.target.value;
                    }
                    else {
                        currentField.Text = event.target.value;
                        this.pdfViewerBase.setItemInSessionStorage(this.formFieldsData, '_formfields');
                    }
                }
            }
        }
    };
    FormFields.prototype.updateFormFieldsValue = function (event) {
        // eslint-disable-next-line
        var currentTarget = event.target;
        var fieldIndex;
        var nextFields;
        if (currentTarget.InsertSpaces && !this.isKeyDownCheck) {
            // eslint-disable-next-line
            var font = parseInt(currentTarget.style.width) + (parseInt(currentTarget.style.height) / 2);
            currentTarget.style.width = '' + font + 'px';
            this.isKeyDownCheck = true;
        }
        if (event.which === 9 && currentTarget && (currentTarget.className === 'e-pdfviewer-formFields' || currentTarget.className === 'e-pdfviewer-signatureformfields e-pv-signature-focus' || currentTarget.className === 'e-pdfviewer-signatureformfields-signature')) {
            // eslint-disable-next-line
            var id = currentTarget.id.split('input_')[1].split('_')[0];
            // eslint-disable-next-line
            var textLayer = document.getElementById(this.pdfViewer.element.id + '_textLayer_' + parseInt(id));
            // eslint-disable-next-line
            var currentFields = textLayer.getElementsByClassName('e-pdfviewer-formFields');
            var istabindexed = true;
            fieldIndex = this.pdfViewer.formFieldCollections.findIndex(function (field) { return field.id === currentTarget.id; });
            if ((!event.shiftKey && event.key === "Tab")) {
                nextFields = fieldIndex + 1 < this.pdfViewer.formFieldCollections.length ? this.pdfViewer.formFieldCollections[fieldIndex + 1] : this.pdfViewer.formFieldCollections[0];
            }
            this.pdfViewer.focusFormField(nextFields);
            istabindexed = true;
            event.preventDefault();
            var tabindex = currentTarget.tabIndex + 1;
            while (!istabindexed) {
                for (var l = 0; l < currentFields.length; l++) {
                    istabindexed = false;
                    if (currentFields[l].tabIndex === (tabindex)) {
                        currentFields[l].focus();
                        istabindexed = true;
                        event.preventDefault();
                        break;
                    }
                }
                if (this.maintainTabIndex[id] === tabindex) {
                    istabindexed = true;
                }
                tabindex = tabindex + 1;
            }
        }
        if ((event.shiftKey && event.key === "Tab")) {
            var fieldIndex_1 = this.pdfViewer.formFieldCollections.findIndex(function (field) { return field.id === currentTarget.id; });
            var nextField = fieldIndex_1 > 0 ? this.pdfViewer.formFieldCollections[fieldIndex_1 - 1] : this.pdfViewer.formFieldCollections[this.pdfViewer.formFieldCollections.length - 1];
            this.pdfViewer.focusFormField(nextField);
            event.preventDefault();
        }
        if (event.currentTarget.classList.contains('e-pdfviewer-signatureformfields') ||
            event.currentTarget.classList.contains('e-pdfviewer-signatureformfields-signature')) {
            if (event.key === 'Enter') {
                // eslint-disable-next-line
                var currentTarget_2 = event.target;
                for (var m = 0; m < this.pdfViewer.formFieldCollections.length; m++) {
                    if (currentTarget_2.id === this.pdfViewer.formFieldCollections[m].id) {
                        this.setFocus(currentTarget_2.id);
                        this.pdfViewer.fireFormFieldClickEvent('formFieldClicked', this.pdfViewer.formFieldCollections[m]);
                    }
                }
            }
            else {
                event.preventDefault();
            }
        }
    };
    FormFields.prototype.changeFormFields = function (event) {
        // eslint-disable-next-line
        var currentTarget = event.target;
        this.updateDataInSession(currentTarget);
    };
    FormFields.prototype.calculateSignatureBounds = function (signatureCavasWidth, signatureCavasHeight, newdifferenceX, newdifferenceY, isSignature, currentField, currentData) {
        var ratioX = newdifferenceX / signatureCavasWidth;
        var ratioY = newdifferenceY / signatureCavasHeight;
        var zoomvalue = this.pdfViewerBase.getZoomFactor();
        var currentWidth = 0;
        var currentHeight = 0;
        var isSignatureStretched = false;
        var isHeightStretched = false;
        var leftDifference = 0;
        var topDifference = 0;
        if (isSignature) {
            currentWidth = this.pdfViewer.handWrittenSignatureSettings.width ? this.pdfViewer.handWrittenSignatureSettings.width : 150;
            currentHeight = this.pdfViewer.handWrittenSignatureSettings.height ? this.pdfViewer.handWrittenSignatureSettings.height : 100;
        }
        else {
            var fieldWidth = currentField ? currentField.style.width === '100%' ? currentField.clientWidth : parseFloat(currentField.style.width) : this.ConvertPointToPixel(currentData.LineBounds.Width);
            var fieldHeight = currentField ? currentField.style.height === '100%' ? currentField.clientHeight : parseFloat(currentField.style.height) : this.ConvertPointToPixel(currentData.LineBounds.Height);
            var fieldWidthRatio = fieldWidth / fieldHeight;
            var fieldHeightRatio = fieldHeight / fieldWidth;
            var canvasWidthRatio = signatureCavasWidth / signatureCavasHeight;
            var canvasHeightRatio = signatureCavasHeight / signatureCavasWidth;
            var fieldRotation = currentField ? currentField.offsetParent.offsetParent.style.transform ? currentField.offsetParent.offsetParent.style.transform : currentField.style.transform : currentData.RotationAngle;
            if ((fieldWidthRatio > canvasWidthRatio) || (fieldHeightRatio > canvasWidthRatio) || ((Math.abs(fieldWidthRatio - fieldHeightRatio)) <= 1)) {
                var ratioDifference = 0;
                if ((fieldHeightRatio > canvasWidthRatio) || ((Math.abs(fieldWidthRatio - fieldHeightRatio)) <= 1)) {
                    isHeightStretched = true;
                    ratioDifference = fieldHeightRatio / canvasHeightRatio;
                }
                else {
                    isSignatureStretched = true;
                    ratioDifference = fieldWidthRatio / canvasWidthRatio;
                }
                if (fieldRotation === 'rotate(90deg)' || fieldRotation === 'rotate(270deg)') {
                    // eslint-disable-next-line
                    currentWidth = fieldHeight / zoomvalue;
                    // eslint-disable-next-line
                    currentHeight = fieldWidth / zoomvalue;
                }
                else {
                    if (isSignatureStretched) {
                        // eslint-disable-next-line
                        leftDifference = fieldWidth / zoomvalue;
                        // eslint-disable-next-line
                        currentWidth = (fieldWidth / ratioDifference) / zoomvalue;
                        // eslint-disable-next-line
                        currentHeight = fieldHeight / zoomvalue;
                    }
                    if (isHeightStretched) {
                        // eslint-disable-next-line
                        topDifference = fieldHeight / zoomvalue;
                        // eslint-disable-next-line
                        currentWidth = fieldWidth / zoomvalue;
                        // eslint-disable-next-line
                        currentHeight = (fieldHeight / ratioDifference) / zoomvalue;
                    }
                }
            }
            else {
                if (fieldRotation === 'rotate(90deg)' || fieldRotation === 'rotate(270deg)') {
                    // eslint-disable-next-line
                    currentWidth = fieldHeight / zoomvalue;
                    // eslint-disable-next-line
                    currentHeight = fieldWidth / zoomvalue;
                }
                else {
                    // eslint-disable-next-line
                    currentWidth = fieldWidth / zoomvalue;
                    // eslint-disable-next-line
                    currentHeight = fieldHeight / zoomvalue;
                }
            }
        }
        var currentLeftDiff = (signatureCavasWidth - newdifferenceX) / 2;
        var currentTopDiff = (signatureCavasHeight - newdifferenceY) / 2;
        if (isSignatureStretched) {
            currentLeftDiff = (currentLeftDiff / signatureCavasWidth) * leftDifference;
            var leftValueDiff = ((leftDifference * ratioX) - (currentWidth * ratioX)) / 2;
            currentLeftDiff = currentLeftDiff + leftValueDiff;
            currentTopDiff = (currentTopDiff / signatureCavasHeight) * currentHeight;
        }
        else if (isHeightStretched) {
            currentLeftDiff = (currentLeftDiff / signatureCavasWidth) * currentWidth;
            currentTopDiff = (currentTopDiff / signatureCavasHeight) * topDifference;
            var topValueDiff = ((topDifference * ratioY) - (currentHeight * ratioY)) / 2;
            currentTopDiff = currentTopDiff + topValueDiff;
        }
        else {
            currentLeftDiff = (currentLeftDiff / signatureCavasWidth) * currentWidth;
            currentTopDiff = (currentTopDiff / signatureCavasHeight) * currentHeight;
        }
        currentWidth = currentWidth * ratioX;
        currentHeight = currentHeight * ratioY;
        return { currentLeftDiff: currentLeftDiff, currentTopDiff: currentTopDiff, currentWidth: currentWidth, currentHeight: currentHeight };
    };
    /**
     * @param data
     * @param isSignature
     * @param currentField
     * @param data
     * @param isSignature
     * @param currentField
     * @param data
     * @param isSignature
     * @param currentField
     * @private
     */
    // eslint-disable-next-line
    FormFields.prototype.updateSignatureAspectRatio = function (data, isSignature, currentField, currentData) {
        // eslint-disable-next-line
        var collectionData = processPathData(data);
        // eslint-disable-next-line
        var csData = splitArrayCollection(collectionData);
        var minimumX = -1;
        var minimumY = -1;
        var maximumX = -1;
        var maximumY = -1;
        var signatureCanvas = document.getElementById(this.pdfViewer.element.id + '_signatureCanvas_');
        var signatureCavasWidth = 0;
        var signatureCavasHeight = 0;
        for (var m = 0; m < csData.length; m++) {
            // eslint-disable-next-line
            var val = csData[m];
            if (minimumX === -1) {
                // eslint-disable-next-line
                minimumX = parseFloat(val['x'].toString());
                // eslint-disable-next-line
                maximumX = parseFloat(val['x'].toString());
                // eslint-disable-next-line
                minimumY = parseFloat(val['y'].toString());
                // eslint-disable-next-line
                maximumY = parseFloat(val['y'].toString());
            }
            else {
                // eslint-disable-next-line
                var point1 = parseFloat(val['x'].toString());
                // eslint-disable-next-line
                var point2 = parseFloat(val['y'].toString());
                if (minimumX >= point1) {
                    minimumX = point1;
                }
                if (minimumY >= point2) {
                    minimumY = point2;
                }
                if (maximumX <= point1) {
                    maximumX = point1;
                }
                if (maximumY <= point2) {
                    maximumY = point2;
                }
            }
        }
        signatureCavasWidth = signatureCanvas ? signatureCanvas.clientWidth : 650;
        signatureCavasHeight = signatureCanvas ? signatureCanvas.clientHeight : 300;
        var newdifferenceX = maximumX - minimumX;
        var newdifferenceY = maximumY - minimumY;
        var signBounds = this.calculateSignatureBounds(signatureCavasWidth, signatureCavasHeight, newdifferenceX, newdifferenceY, isSignature, currentField, currentData);
        if (isSignature) {
            var zoomvalue = this.pdfViewerBase.getZoomFactor();
            var pageIndex = this.pdfViewerBase.currentPageNumber - 1;
            var pageDiv = document.getElementById(this.pdfViewer.element.id + '_pageDiv_' + pageIndex);
            var currentLeft = ((parseFloat(pageDiv.style.width) / 2) - (signBounds.currentWidth / 2)) / zoomvalue;
            // eslint-disable-next-line max-len
            var currentTop = ((parseFloat(pageDiv.style.height) / 2) - (signBounds.currentHeight / 2)) / zoomvalue;
            return { x: currentLeft, y: currentTop, width: signBounds.currentWidth, height: signBounds.currentHeight };
        }
        else {
            return { left: signBounds.currentLeftDiff, top: signBounds.currentTopDiff, width: signBounds.currentWidth, height: signBounds.currentHeight };
        }
    };
    /**
     * @param target
     * @param signaturePath
     * @param signatureBounds
     * @param signatureFontFamily
     * @param signatureFontSize
     * @param target
     * @param signaturePath
     * @param signatureBounds
     * @param signatureFontFamily
     * @param signatureFontSize
     * @param target
     * @param signaturePath
     * @param signatureBounds
     * @param signatureFontFamily
     * @param signatureFontSize
     * @param target
     * @param signaturePath
     * @param signatureBounds
     * @param signatureFontFamily
     * @param signatureFontSize
     * @param target
     * @param signaturePath
     * @param signatureBounds
     * @param signatureFontFamily
     * @param signatureFontSize
     * @private
     */
    // eslint-disable-next-line
    FormFields.prototype.updateDataInSession = function (target, signaturePath, signatureBounds, signatureFontFamily, signatureFontSize) {
        this.pdfViewerBase.updateDocumentEditedProperty(true);
        // eslint-disable-next-line
        var filterFields = [];
        var fieldsByName = " ";
        var filterFieldName = [];
        var filterArrayLength = 0;
        var data = this.pdfViewerBase.getItemFromSessionStorage('_formfields');
        if (data && !this.pdfViewer.formDesignerModule) {
            // eslint-disable-next-line
            var FormFieldsData = JSON.parse(data);
            filterFields = FormFieldsData.filter(function (item) { return item.uniqueID === target.id; });
            if (filterFields.length > 0) {
                fieldsByName = filterFields[0].FieldName;
                filterFieldName = FormFieldsData.filter(function (item) { return item.FieldName === fieldsByName; });
                filterArrayLength = filterFieldName.length;
            }
            for (var m = 0; m < FormFieldsData.length; m++) {
                // eslint-disable-next-line
                var currentData = FormFieldsData[m];
                if (currentData.uniqueID === target.id || fieldsByName === currentData.FieldName) {
                    if (target && target.type === 'text' || target.type === 'password' || target.type === 'textarea') {
                        var signField = target;
                        if (signField.classList.contains('e-pdfviewer-signatureformfields') || signField.classList.contains('e-pdfviewer-signatureformfields-signature')) {
                            if (signaturePath) {
                                currentData.Value = signaturePath;
                            }
                            if (signatureBounds) {
                                currentData.Bounds = signatureBounds;
                            }
                            if (signatureFontFamily) {
                                currentData.FontFamily = signatureFontFamily;
                                currentData.FontSize = signatureFontSize;
                            }
                        }
                        else {
                            currentData.Text = target.value;
                            currentData.Value = target.value;
                        }
                    }
                    else if (target.type === 'radio') {
                        if (target.checked) {
                            for (var l = 0; l < FormFieldsData.length; l++) {
                                // eslint-disable-next-line
                                var currentType = FormFieldsData[l];
                                if (FormFieldsData[l].GroupName === target.name) {
                                    FormFieldsData[l].Selected = false;
                                }
                            }
                            if (target.value == currentData.Value) {
                                currentData.Selected = true;
                                break;
                            }
                            else {
                                currentData.Selected = false;
                            }
                        }
                    }
                    else if (target.type === 'checkbox') {
                        var targetCheckBox = target.id;
                        var filterCheckBoxSameName = FormFieldsData.filter(function (sameNameCheckboxField) { return (sameNameCheckboxField.GroupName === target.name) && sameNameCheckboxField.Name == 'CheckBox'; });
                        for (var l = 0; l < filterCheckBoxSameName.length; l++) {
                            // eslint-disable-next-line
                            var currentType = filterCheckBoxSameName[l];
                            currentType.Selected = false;
                            currentType.checked = false;
                            // eslint-disable-next-line
                            var currentTarget = document.getElementById(currentType.uniqueID);
                            if (currentTarget) {
                                if (targetCheckBox !== currentTarget.id) {
                                    currentTarget.Selected = false;
                                    currentTarget.checked = false;
                                    currentTarget.style.webkitAppearance = 'none';
                                }
                            }
                        }
                        if (target.checked) {
                            currentData.Selected = true;
                        }
                        else {
                            currentData.Selected = false;
                        }
                    }
                    else if (target.type === 'select-one' && target.size === 0) {
                        // eslint-disable-next-line
                        var currentValue = target.options[target.selectedIndex].text;
                        // eslint-disable-next-line
                        var childrens = target.children;
                        var isChildElements = false;
                        for (var k = 0; k < childrens.length; k++) {
                            if (childrens[k].text === currentValue) {
                                currentData.SelectedValue = currentValue;
                            }
                        }
                    }
                    else if (target.type === 'select-multiple' || target.size > 0) {
                        // eslint-disable-next-line
                        var currentValue = target.selectedOptions;
                        currentData.SelectedList = [];
                        for (var z = 0; z < currentValue.length; z++) {
                            // eslint-disable-next-line
                            var childrens = target.children;
                            for (var k = 0; k < childrens.length; k++) {
                                if (childrens[k] === currentValue[z]) {
                                    currentData.SelectedList.push(k);
                                }
                            }
                        }
                        currentData.SelectedValue = target.value;
                        var index = currentData.TextList ? currentData.TextList.indexOf(target.value) : 0;
                        currentData.selectedIndex = index > -1 ? index : 0;
                        currentData.SelectedList = [currentData.selectedIndex];
                    }
                    if (target.disabled) {
                        currentData.IsReadonly = true;
                    }
                    this.updateFormFieldsCollection(currentData);
                    filterArrayLength--;
                    if (filterArrayLength == 0)
                        break;
                }
                else if (target && target.getAttribute('list') != null && target.type === 'text' && currentData.uniqueID === target.list.id) {
                    currentData.SelectedValue = target.value;
                }
                this.updateFormFieldsCollection(currentData);
            }
            window.sessionStorage.removeItem(this.pdfViewerBase.documentId + '_formfields');
            this.pdfViewerBase.setItemInSessionStorage(FormFieldsData, '_formfields');
        }
        if (this.pdfViewer.formDesignerModule && target && target.id) {
            var selectedItem = this.pdfViewer.nameTable[target.id.split('_')[0]];
            if (selectedItem && selectedItem.wrapper && selectedItem.wrapper.children[0]) {
                selectedItem.value = target.value;
                var point = cornersPointsBeforeRotation(selectedItem.wrapper.children[0]).topLeft;
                this.pdfViewer.formDesignerModule.updateFormDesignerFieldInSessionStorage(point, selectedItem.wrapper.children[0], selectedItem.formFieldAnnotationType, selectedItem);
            }
        }
    };
    /**
     * @private
     */
    FormFields.prototype.removeExistingFormFields = function () {
        var data = this.pdfViewerBase.getItemFromSessionStorage('_formDesigner');
        var formFieldsData = JSON.parse(data);
        if (formFieldsData) {
            for (var i = 0; i < formFieldsData.length; i++) {
                if (formFieldsData[i].FormField.formFieldAnnotationType === "RadioButton") {
                    var buttonItem = [];
                    buttonItem = formFieldsData[i].FormField.radiobuttonItem;
                    var sameButtonItemId = formFieldsData[i].FormField.id.split('_')[0];
                    for (var j = 0; j < buttonItem.length; j++) {
                        var otherButton = buttonItem[j];
                        if (otherButton.id.split('_')[0] !== sameButtonItemId) {
                            this.pdfViewer.formDesignerModule.deleteFormField(otherButton.id.split('_')[0]);
                        }
                    }
                }
                if (formFieldsData[i].Key) {
                    this.pdfViewer.formDesignerModule.deleteFormField(formFieldsData[i].Key.split('_')[0]);
                }
            }
        }
    };
    // eslint-disable-next-line
    FormFields.prototype.applyCommonProperties = function (inputdiv, pageIndex, index, currentData, isFieldRotated) {
        // eslint-disable-next-line
        var inputField = document.getElementById(this.pdfViewer.element.id + 'input_' + pageIndex + '_' + index);
        if (inputField) {
            var textLayer = document.getElementById(this.pdfViewer.element.id + '_textLayer_' + pageIndex);
            if (inputdiv.type === 'text' && inputField.parentElement !== textLayer) {
                inputField.parentElement.remove();
            }
            if (!(inputField.className === "e-pdfviewer-signatureformfields e-pv-signature-focus")) {
                inputField.remove();
            }
        }
        // eslint-disable-next-line
        var signIcon = document.getElementById('signIcon_' + pageIndex + '_' + index);
        var left = parseFloat(inputdiv.style.left);
        var top = parseInt(inputdiv.style.top);
        var width = parseFloat(inputdiv.style.width);
        var height = parseFloat(inputdiv.style.height);
        var signIconWidth;
        var signIconHeght;
        var hightDifference;
        var widthDifference;
        var zoomvalue = this.pdfViewerBase.getZoomFactor();
        if (signIcon && !isFieldRotated) {
            signIconWidth = parseFloat(signIcon.style.width);
            signIconHeght = parseFloat(signIcon.style.height);
            if (signIcon.style.transform == 'rotate(90deg)') {
                signIcon.style.transform = 'rotate(0deg)';
                hightDifference = height / 2;
                widthDifference = signIconWidth * zoomvalue;
                signIcon.style.left = ((left - (hightDifference - (signIconWidth * zoomvalue))) + (widthDifference / 2)) + 'px';
            }
            if (signIcon.style.transform == 'rotate(180deg)') {
                signIcon.style.transform = 'rotate(0deg)';
                signIcon.style.left = left + 'px';
                signIcon.style.top = (top) + 'px';
            }
            if (signIcon.style.transform == 'rotate(270deg)') {
                signIcon.style.transform = 'rotate(0deg)';
                hightDifference = height / 2;
                widthDifference = signIconWidth * zoomvalue;
                signIcon.style.left = ((left - (hightDifference - widthDifference)) + (widthDifference / 2)) + 'px';
                signIcon.style.top = ((top + (width + (signIconHeght * zoomvalue)) + ((signIconHeght * zoomvalue) / 2))) + 'px';
            }
        }
        if (currentData.IsSignatureField && this.isSignatureField) {
            inputdiv.className = 'e-pdfviewer-signatureformfields-signature';
            inputdiv.style.pointerEvents = 'none';
        }
        else if (currentData.IsSignatureField) {
            if (currentData.Value) {
                inputdiv.className = 'e-pdfviewer-signatureformfields-signature';
                inputdiv.style.pointerEvents = 'none';
            }
            else {
                inputdiv.className = 'e-pdfviewer-signatureformfields';
            }
        }
        else if (currentData.Name !== 'Button') {
            inputdiv.className = 'e-pdfviewer-formFields';
        }
        inputdiv.id = this.pdfViewer.element.id + 'input_' + pageIndex + '_' + index;
        inputdiv.ariaLabel = this.pdfViewer.element.id + 'input_' + pageIndex;
        inputdiv.style.zIndex = 1000;
    };
    /**
     * @param currentData
     * @param pageIndex
     * @param index
     * @param printContainer
     * @param currentData
     * @param pageIndex
     * @param index
     * @param printContainer
     * @private
     */
    // eslint-disable-next-line
    FormFields.prototype.createFormFields = function (currentData, pageIndex, index, printContainer, count) {
        // eslint-disable-next-line
        var currentField;
        // eslint-disable-next-line
        switch (currentData['Name']) {
            case 'Textbox':
                currentField = this.createTextBoxField(currentData, pageIndex, 'text');
                break;
            case 'Password':
                currentField = this.createTextBoxField(currentData, pageIndex, 'password');
                break;
            case 'RadioButton':
                currentField = this.createRadioBoxField(currentData, pageIndex, 'radio');
                break;
            case 'CheckBox':
                currentField = this.createRadioBoxField(currentData, pageIndex, 'checkbox', printContainer);
                break;
            case 'DropDown':
                currentField = this.createDropDownField(currentData, pageIndex, index, printContainer);
                break;
            case 'ListBox':
                currentField = this.createListBoxField(currentData, pageIndex);
                break;
            case 'InitialField':
            case 'SignatureField':
                currentField = this.createSignatureField(currentData, pageIndex, index, printContainer, count);
                var isFieldRotated = false;
                if (currentData['Rotation'] === 0) {
                    isFieldRotated = true;
                }
                if (currentData.Value && currentData.Value !== '') {
                    this.renderExistingAnnnot(currentData, index, printContainer, isFieldRotated);
                    this.isSignatureRendered = true;
                    count++;
                }
                break;
            case 'Button':
                currentField = this.createButtonField(currentData, pageIndex);
                break;
            case 'ink':
                if (this.pdfViewer.formDesignerModule) {
                    if (currentData.Value && currentData.Value !== '' && !this.isSignatureRendered) {
                        this.renderExistingAnnnot(currentData, index, printContainer);
                    }
                }
                break;
            case 'SignatureText':
            case 'SignatureImage':
                if (currentData.Value && currentData.Value !== '' && !this.isSignatureRendered) {
                    this.renderExistingAnnnot(currentData, index, printContainer);
                }
                break;
        }
        return { currentField: currentField, count: count };
    };
    FormFields.prototype.getFormFieldType = function (currentData) {
        // eslint-disable-next-line
        var currentField;
        // eslint-disable-next-line
        switch (currentData['Name']) {
            case 'Textbox':
                currentField = 'Textbox';
                break;
            case 'Password':
                currentField = 'Password';
                break;
            case 'RadioButton':
                currentField = 'RadioButton';
                break;
            case 'CheckBox':
                currentField = 'CheckBox';
                break;
            case 'DropDown':
                currentField = 'DropDown';
                break;
            case 'ListBox':
                currentField = 'ListBox';
                break;
            case 'SignatureField':
                currentField = 'SignatureField';
                if (currentData.IsInitialField) {
                    currentField = 'InitialField';
                }
                break;
            case 'InitialField':
                currentField = 'InitialField';
                break;
        }
        return currentField;
    };
    // eslint-disable-next-line
    FormFields.prototype.createButtonField = function (data, pageIndex) {
        // eslint-disable-next-line
        var inputField = document.createElement('input');
        if (data.Value && (this.isBase64(data.Value) || this.isURL(data.Value))) {
            inputField.type = 'image';
            inputField.src = data.Value;
        }
        else {
            inputField.type = 'button';
        }
        inputField.className = 'e-pv-buttonItem';
        if (data.Text !== '') {
            inputField.value = data.Text;
        }
        else {
            inputField.value = '';
        }
        inputField.name = data.FieldName;
        return inputField;
    };
    /**
     * Returns the boolean value based on the imgae source base64
     *
     * @param {string} imageSrc - Passing the image source.
     *
     * @returns {boolean}
     */
    FormFields.prototype.isBase64 = function (imageSrc) {
        return /^data:([a-zA-Z]*\/[a-zA-Z+.-]*);base64,/.test(imageSrc);
    };
    /**
     * Returns the boolean value based on the imgae source URL
     *
     * @param {string} imageSrc - Passing the image source.
     *
     * @returns {boolean}
     */
    FormFields.prototype.isURL = function (imageSrc) {
        try {
            new URL(imageSrc);
            return true;
        }
        catch (_a) {
            return false;
        }
    };
    // eslint-disable-next-line
    FormFields.prototype.createTextBoxField = function (data, pageIndex, type) {
        // eslint-disable-next-line
        var inputField;
        if (data.Visible === 1) {
            return;
        }
        if (data.Multiline) {
            inputField = document.createElement('textarea');
            inputField.style.resize = 'none';
        }
        else {
            inputField = document.createElement('input');
            inputField.type = type;
        }
        if (data.MaxLength > 0) {
            inputField.maxLength = data.MaxLength;
        }
        this.addAlignmentPropety(data, inputField);
        if (data.Text !== '') {
            inputField.value = data.Text;
        }
        else {
            inputField.value = '';
        }
        if (!this.pdfViewer.enableAutoComplete) {
            inputField.autocomplete = 'off';
        }
        inputField.name = data.FieldName;
        return inputField;
    };
    // eslint-disable-next-line
    FormFields.prototype.checkIsReadonly = function (data, inputField) {
        var isReadonly = false;
        for (var n = 0; n < this.readOnlyCollection.length; n++) {
            if (inputField.id === this.readOnlyCollection[n]) {
                isReadonly = true;
                break;
            }
        }
        if (!this.pdfViewer.formDesignerModule && !this.pdfViewer.annotationModule && (data.IsInitialField || data.IsSignatureField)) {
            isReadonly = true;
        }
        if (data.IsReadonly || (!this.pdfViewer.enableFormFields) || isReadonly) {
            inputField.disabled = true;
            inputField.style.cursor = 'default';
            inputField.style.backgroundColor = 'transparent';
        }
        else {
            // eslint-disable-next-line
            var borderColor = data.BackColor;
            inputField.style.backgroundColor = 'rgba(' + borderColor.R + ',' + borderColor.G + ',' + borderColor.B + ',' + 0.2 + ')';
            // eslint-disable-next-line
            var fontColor = data.FontColor;
            inputField.style.color = 'rgba(' + fontColor.R + ',' + fontColor.G + ',' + fontColor.B + ',' + 1 + ')';
        }
    };
    /**
     * @param isReadonly
     * @private
     */
    // eslint-disable-next-line max-len
    FormFields.prototype.formFieldsReadOnly = function (isReadonly) {
        // eslint-disable-next-line
        var formFields = document.getElementsByClassName('e-pdfviewer-formFields');
        this.makeformFieldsReadonly(formFields, isReadonly);
        // eslint-disable-next-line
        var signatureFields = document.getElementsByClassName('e-pdfviewer-signatureformfields');
        this.makeformFieldsReadonly(signatureFields, isReadonly);
    };
    // eslint-disable-next-line
    FormFields.prototype.makeformFieldsReadonly = function (formFields, isReadonly) {
        for (var i = 0; i < formFields.length; i++) {
            if (formFields[i]) {
                // eslint-disable-next-line
                var inputField = formFields[i];
                if (!isReadonly) {
                    inputField.disabled = true;
                    inputField.style.cursor = 'default';
                }
                else {
                    // eslint-disable-next-line
                    inputField.disabled = false;
                }
            }
        }
    };
    // eslint-disable-next-line
    FormFields.prototype.applyTabIndex = function (data, inputField, pageIndex) {
        inputField.tabIndex = data.TabIndex;
        this.maxTabIndex = Math.max(this.maxTabIndex, inputField.tabIndex);
        if (this.minTabIndex === -1) {
            this.minTabIndex = inputField.tabIndex;
        }
        this.minTabIndex = Math.min(this.minTabIndex, inputField.tabIndex);
        this.maintainTabIndex[pageIndex.toString()] = this.maxTabIndex;
        this.maintanMinTabindex[pageIndex.toString()] = this.minTabIndex;
    };
    // eslint-disable-next-line
    FormFields.prototype.checkIsRequiredField = function (data, inputField) {
        if (data.IsRequired) {
            inputField.required = true;
            inputField.style.border = '1px solid red';
        }
        else {
            // eslint-disable-next-line
            var borderColor = data.BorderColor;
            inputField.style.border = data.BorderWidth;
            inputField.style.borderColor = 'rgba(' + borderColor.R + ',' + borderColor.G + ',' + borderColor.B + ',' + 1 + ')';
        }
        if (inputField.type !== 'checkbox' && inputField.type !== 'radio') {
            var borderStyle = data.BorderStyle;
            this.addBorderStylePropety(borderStyle, inputField);
        }
    };
    // eslint-disable-next-line
    FormFields.prototype.applyDefaultColor = function (inputField) {
        // eslint-disable-next-line max-len
        if (inputField.type !== 'button' && (inputField.style.backgroundColor === 'rgba(255, 255, 255, 0.2)' || inputField.style.backgroundColor === 'rgba(0, 0, 0, 0.2)') || inputField.style.backgroundColor === 'rgba(218, 234, 247, 0.2)') {
            inputField.style.backgroundColor = 'rgba(0, 20, 200, 0.2)';
        }
        if (inputField.style.color === 'rgba(255, 255, 255, 0.2)') {
            inputField.style.color = 'black';
        }
    };
    // eslint-disable-next-line
    FormFields.prototype.addAlignmentPropety = function (data, inputField) {
        // eslint-disable-next-line
        var alignment = data.Alignment;
        switch (alignment) {
            case 0:
                inputField.style.textAlign = 'left';
                break;
            case 1:
                inputField.style.textAlign = 'center';
                break;
            case 2:
                inputField.style.textAlign = 'right';
                break;
            case 3:
                inputField.style.textAlign = 'justify';
                break;
        }
    };
    // eslint-disable-next-line
    FormFields.prototype.addBorderStylePropety = function (borderStyle, inputField) {
        // eslint-disable-next-line
        switch (borderStyle) {
            case 0:
                inputField.style.borderStyle = 'solid';
                break;
            case 1:
                inputField.style.borderStyle = 'dashed';
                break;
            case 2:
                inputField.style.borderStyle = 'outset';
                break;
            case 3:
                inputField.style.borderStyle = 'inset';
                break;
            case 4:
                inputField.style.borderStyle = 'outset';
                break;
            case 5:
                inputField.style.borderStyle = 'dotted';
                break;
            case 6:
                inputField.style.borderStyle = 'inset';
                break;
        }
    };
    // eslint-disable-next-line
    FormFields.prototype.createRadioBoxField = function (data, pageIndex, type, printContainer) {
        // eslint-disable-next-line
        var inputField = document.createElement('input');
        inputField.type = type;
        if (data.Selected) {
            inputField.checked = true;
        }
        else if (type === 'checkbox' && !printContainer) {
            inputField.style.webkitAppearance = 'none';
        }
        inputField.name = data.GroupName;
        inputField.value = data.Value;
        return inputField;
    };
    // eslint-disable-next-line
    FormFields.prototype.createDropDownField = function (data, pageIndex, index, printContainer) {
        // eslint-disable-next-line
        var inputField = document.createElement('select');
        // eslint-disable-next-line
        var childItems = data['TextList'];
        if (data.Selected && !printContainer) {
            // eslint-disable-next-line
            var previousField = document.getElementById('editableDropdown' + pageIndex + '_' + index);
            if (previousField) {
                previousField.remove();
            }
            // eslint-disable-next-line
            var inputFields = document.createElement('input');
            inputFields.id = 'editableDropdown' + pageIndex + '_' + index;
            inputFields.setAttribute('list', this.pdfViewer.element.id + 'input_' + pageIndex + '_' + index);
            // eslint-disable-next-line
            var bounds = data['LineBounds'];
            // eslint-disable-next-line
            var font = data['Font'];
            inputFields.style.position = 'absolute';
            inputFields.style.border = '0px';
            // eslint-disable-next-line
            this.applyPosition(inputFields, bounds, font, pageIndex, data['Rotation']);
            inputFields.style.backgroundColor = 'rgba(0, 20, 200, 0.2)';
            inputFields.className = 'e-pdfviewer-formFields';
            if (data.selectedIndex === -1) {
                inputFields.value = data.SelectedValue;
            }
            if (printContainer) {
                printContainer.appendChild(inputFields);
            }
            else {
                var textLayer = document.getElementById(this.pdfViewer.element.id + '_textLayer_' + pageIndex);
                textLayer.appendChild(inputFields);
            }
            inputFields.addEventListener('focus', this.focusFormFields.bind(this));
            inputFields.addEventListener('blur', this.blurFormFields.bind(this));
            inputFields.addEventListener('click', this.updateFormFields.bind(this));
            inputFields.addEventListener('change', this.changeFormFields.bind(this));
            inputFields.addEventListener('keydown', this.updateFormFieldsValue.bind(this));
            inputField = document.createElement('DATALIST');
        }
        for (var j = 0; j < childItems.length; j++) {
            // eslint-disable-next-line
            var option = document.createElement('option');
            option.className = 'e-dropdownSelect';
            if (data.SelectedValue === childItems[j] || data.selectedIndex === j) {
                option.selected = true;
            }
            else {
                option.selected = false;
            }
            option.innerHTML = childItems[j];
            inputField.appendChild(option);
        }
        inputField.name = data.Text;
        return inputField;
    };
    // eslint-disable-next-line
    FormFields.prototype.createListBoxField = function (data, pageIndex) {
        // eslint-disable-next-line
        var inputField = document.createElement('select');
        // eslint-disable-next-line
        var childItems = data['TextList'];
        if (data.MultiSelect) {
            inputField.multiple = true;
        }
        else {
            inputField.multiple = false;
            inputField.size = childItems.length;
        }
        for (var j = 0; j < childItems.length; j++) {
            // eslint-disable-next-line
            var option = document.createElement('option');
            option.className = 'e-pdfviewer-ListBox';
            for (var k = 0; k < data.SelectedList.length; k++) {
                if (data.SelectedList[k] === j) {
                    option.selected = true;
                }
            }
            option.innerHTML = childItems[j];
            inputField.appendChild(option);
        }
        inputField.name = data.Text;
        return inputField;
    };
    // eslint-disable-next-line
    FormFields.prototype.createSignatureField = function (data, pageIndex, index, printContainer, count) {
        // eslint-disable-next-line
        var inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.name = data.FieldName;
        var zoomvalue = this.pdfViewerBase.getZoomFactor();
        // eslint-disable-next-line
        var previousField = document.getElementById('signIcon_' + pageIndex + '_' + index);
        if (previousField && !printContainer) {
            previousField.remove();
        }
        this.pdfViewerBase.isInitialField = data.IsInitialField;
        var signIndicator = this.pdfViewerBase.isInitialField ? "Initial" : "Sign";
        //check whether the width for sign indicator has default value or not and then set the default width value for initial field.
        var signatureFieldIndicatorWidth = this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings ? (this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings.width === 19 ? (this.pdfViewerBase.isInitialField ? 27 : 19) : this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings.width) : 19;
        // eslint-disable-next-line
        var span = document.createElement('span');
        var textLayer = document.getElementById(this.pdfViewer.element.id + '_textLayer_' + pageIndex);
        // eslint-disable-next-line
        var bounds = data['LineBounds'];
        // eslint-disable-next-line
        var font = data['Font'];
        var left = this.ConvertPointToPixel(bounds.X);
        var top = this.ConvertPointToPixel(bounds.Y);
        var indicatorWidth = this.ConvertPointToPixel(bounds.Width);
        var indicatorHeight = this.ConvertPointToPixel(bounds.Height);
        // eslint-disable-next-line max-len
        var height = this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings ? (this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings.height > indicatorHeight * zoomvalue / 2 ? indicatorHeight * zoomvalue / 2 : this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings.height) : indicatorHeight * zoomvalue / 2;
        // eslint-disable-next-line max-len
        var width = signatureFieldIndicatorWidth > indicatorWidth * zoomvalue / 2 ? indicatorWidth * zoomvalue / 2 : signatureFieldIndicatorWidth;
        // eslint-disable-next-line max-len
        var size = this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings ? (this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings.fontSize > height / 2 ? 10 : this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings.fontSize) : 10;
        var fontSize = size > width ? width / 2 : (size > height ? height / 2 : size);
        span.style.position = 'absolute';
        span.id = 'signIcon_' + pageIndex + '_' + index;
        var rotation = this.getAngle(pageIndex);
        // eslint-disable-next-line
        var annotBounds = { left: left, top: top, width: width, height: height };
        // eslint-disable-next-line
        var fieldBounds = this.getBounds(annotBounds, pageIndex);
        span.style.transform = 'rotate(' + rotation + 'deg)';
        span.style.left = fieldBounds.left * zoomvalue + 'px';
        span.style.top = fieldBounds.top * zoomvalue + 'px';
        if (Browser.isDevice && !this.pdfViewer.enableDesktopMode) {
            span.style.height = 5 + 'px';
            span.style.width = 10 + 'px';
            span.style.fontSize = '3px';
        }
        else {
            span.style.height = height + 'px';
            span.style.width = width + 'px';
            span.style.fontSize = fontSize + 'px';
            if (isBlazor()) {
                span.style.fontSize = (fontSize - 1) + 'px';
            }
        }
        if (!((height + this.indicatorPaddingValue) > indicatorHeight * zoomvalue) && !((width + this.indicatorPaddingValue) > indicatorWidth * zoomvalue)) {
            span.style.padding = '2px';
        }
        span.style.textAlign = 'center';
        span.style.boxSizing = 'content-box';
        // eslint-disable-next-line
        span.innerHTML = this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings ? (this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings.text ? this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings.text : signIndicator) : signIndicator;
        span.style.color = this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings ? (this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings.color ? this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings.color : 'black') : 'black';
        // eslint-disable-next-line
        span.style.backgroundColor = this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings ? (this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings.backgroundColor ? this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings.backgroundColor : 'orange') : 'orange';
        span.style.opacity = this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings ? (this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings.opacity ? this.pdfViewer.signatureFieldSettings.signatureIndicatorSettings.opacity : 1) : 1;
        if (!isNullOrUndefined(textLayer)) {
            textLayer.appendChild(span);
        }
        this.addSignaturePath(data, count);
        return inputField;
    };
    // eslint-disable-next-line
    FormFields.prototype.addSignaturePath = function (signData, count) {
        this.isSignatureField = false;
        // eslint-disable-next-line
        var data = this.pdfViewerBase.getItemFromSessionStorage('_formfields');
        if (data) {
            // eslint-disable-next-line
            var formFieldsData = JSON.parse(data);
            for (var m = 0; m < formFieldsData.length; m++) {
                // eslint-disable-next-line
                var currentData = formFieldsData[m];
                // eslint-disable-next-line max-len
                if (currentData.ActualFieldName === null && count && (currentData.Name === 'ink' || currentData.Name === 'SignatureField' || currentData.Name === 'SignatureImage' || currentData.Name === 'SignatureText') && (this.pdfViewer.formDesigner ? ((currentData.FieldName.split('_')[0]) === (signData.ActualFieldName) || (currentData.FieldName.split('_')[0]) === (signData.FieldName)) : ((currentData.FieldName.split('_')[0] === (signData.FieldName)) && !isNullOrUndefined(signData.ActualFieldName)) && currentData.Value && currentData.Value !== '')) {
                    signData.Value = currentData.Value;
                    signData.FontFamily = currentData.FontFamily;
                    signData.FontSize = currentData.FontSize;
                    this.isSignatureField = true;
                    signData.Bounds = currentData.LineBounds;
                }
                if (currentData.ActualFieldName === null && count && (currentData.Name === 'ink' || currentData.Name === 'SignatureField' || currentData.Name === 'SignatureImage' || currentData.Name === 'SignatureText') && this.pdfViewer.formDesigner ? currentData.FieldName === signData.ActualFieldName + '_' + count || currentData.FieldName === signData.FieldName + '_' + count : ((currentData.FieldName === signData.FieldName + '_' + count || currentData.FieldName === signData.ActualFieldName + '_' + count) && !isNullOrUndefined(signData.ActualFieldName)) && currentData.Value && currentData.Value !== '') {
                    signData.Value = currentData.Value;
                    signData.FontFamily = currentData.FontFamily;
                    signData.FontSize = currentData.FontSize;
                    this.isSignatureField = true;
                    if (!signData.Bounds) {
                        signData.Bounds = currentData.LineBounds;
                    }
                    break;
                }
            }
        }
        return this.isSignatureField;
    };
    // eslint-disable-next-line
    FormFields.prototype.getBounds = function (bound, pageIndex, rotation, isFieldRotated) {
        // eslint-disable-next-line
        var pageDetails = this.pdfViewerBase.pageSize[pageIndex];
        // eslint-disable-next-line
        var bounds;
        if (rotation > 0) {
            bounds = this.getBoundsPosition(rotation, bound, pageDetails, isFieldRotated);
        }
        else {
            bounds = this.getBoundsPosition(pageDetails.rotation, bound, pageDetails, isFieldRotated);
        }
        return bounds;
    };
    // eslint-disable-next-line
    FormFields.prototype.getBoundsPosition = function (rotation, bound, pageDetails, isFieldRotated) {
        // eslint-disable-next-line
        var bounds;
        if (!isFieldRotated) {
            switch (rotation) {
                case 90:
                    // eslint-disable-next-line
                    bounds = { left: pageDetails.width - bound.top - bound.height, top: bound.left, width: bound.height, height: bound.width };
                    break;
                case 180:
                    // eslint-disable-next-line
                    bounds = { left: pageDetails.width - bound.left - bound.width, top: pageDetails.height - bound.top - bound.height, width: bound.width, height: bound.height };
                    break;
                case 270:
                    // eslint-disable-next-line
                    bounds = { left: bound.top, top: pageDetails.height - bound.left - bound.width, width: bound.height, height: bound.width };
                    break;
                case 0:
                    // eslint-disable-next-line
                    bounds = bound;
                    break;
                case 1:
                    // eslint-disable-next-line
                    bounds = { left: pageDetails.width - bound.top - bound.height, top: bound.left, width: bound.height, height: bound.width };
                    break;
                case 2:
                    // eslint-disable-next-line
                    bounds = { left: pageDetails.width - bound.left - bound.width, top: pageDetails.height - bound.top - bound.height, width: bound.width, height: bound.height };
                    break;
                case 3:
                    // eslint-disable-next-line
                    bounds = { left: bound.top, top: pageDetails.height - bound.left - bound.width, width: bound.height, height: bound.width };
                    break;
            }
            if (!bounds) {
                bounds = bound;
            }
        }
        else {
            switch (rotation) {
                case 0:
                    // eslint-disable-next-line
                    bounds = bound;
                    break;
                case 1:
                    // eslint-disable-next-line
                    bounds = { left: pageDetails.width - bound.top - bound.height - (bound.width / 2 - bound.height / 2), top: bound.left + (bound.width / 2 - bound.height / 2), width: bound.width, height: bound.height };
                    break;
                case 2:
                    // eslint-disable-next-line
                    bounds = { left: pageDetails.width - bound.left - bound.width, top: pageDetails.height - bound.top - bound.height, width: bound.width, height: bound.height };
                    break;
                case 3:
                    // eslint-disable-next-line
                    bounds = { left: bound.top - (bound.width / 2 - bound.height / 2), top: (pageDetails.height - bound.left - bound.width + (bound.width / 2 - bound.height / 2)), width: bound.width, height: bound.height };
                    break;
            }
            if (!bounds) {
                bounds = bound;
            }
        }
        return bounds;
    };
    // eslint-disable-next-line
    FormFields.prototype.applyPosition = function (inputField, bounds, font, pageIndex, rotation, isFieldRotated) {
        if (bounds) {
            var left = this.ConvertPointToPixel(bounds.X);
            var top_3 = this.ConvertPointToPixel(bounds.Y);
            var width = this.ConvertPointToPixel(bounds.Width);
            var height = this.ConvertPointToPixel(bounds.Height);
            var fontHeight = 0;
            // eslint-disable-next-line
            var fieldBounds = { left: left, top: top_3, width: width, height: height };
            // eslint-disable-next-line
            var annotBounds = this.getBounds(fieldBounds, pageIndex, rotation, isFieldRotated);
            if (font !== null && font.Height) {
                inputField.style.fontFamily = font.Name;
                if (font.Italic) {
                    inputField.style.fontStyle = 'italic';
                }
                if (font.Bold) {
                    inputField.style.fontWeight = 'Bold';
                }
                fontHeight = this.ConvertPointToPixel(font.Size);
            }
            this.pdfViewerBase.setStyleToTextDiv(inputField, annotBounds.left, annotBounds.top, fontHeight, annotBounds.width, annotBounds.height, false);
        }
    };
    // eslint-disable-next-line
    FormFields.prototype.renderExistingAnnnot = function (data, index, printContainer, isFieldRotated) {
        if (!printContainer) {
            // eslint-disable-next-line
            var bounds = void 0;
            if (data.Bounds && data.Name !== 'ink') {
                bounds = data.Bounds;
            }
            else {
                bounds = data.LineBounds;
            }
            var currentLeft = void 0;
            var currentTop = void 0;
            var currentWidth = void 0;
            var currentHeight = void 0;
            if (bounds.x || bounds.y || bounds.width || bounds.height) {
                currentLeft = bounds.x;
                currentTop = bounds.y;
                currentWidth = bounds.width;
                currentHeight = bounds.height;
            }
            else {
                currentLeft = this.ConvertPointToPixel(bounds.X);
                currentTop = this.ConvertPointToPixel(bounds.Y);
                currentWidth = this.ConvertPointToPixel(bounds.Width);
                currentHeight = this.ConvertPointToPixel(bounds.Height);
            }
            // eslint-disable-next-line
            var currentPage = parseFloat(data['PageIndex']);
            // eslint-disable-next-line
            var bound = { left: currentLeft, top: currentTop, width: currentWidth, height: currentHeight };
            // eslint-disable-next-line
            var newBounds = this.updateSignatureBounds(bound, currentPage, isFieldRotated);
            var annot = void 0;
            var fontFamily = data.FontFamily ? data.FontFamily : data.fontFamily;
            // eslint-disable-next-line
            if ((this.pdfViewerBase.isSignatureImageData(data.Value))) {
                annot = {
                    // eslint-disable-next-line max-len
                    id: this.pdfViewer.element.id + 'input_' + currentPage + '_' + index, bounds: newBounds, pageIndex: currentPage, data: data.Value, modifiedDate: '',
                    shapeAnnotationType: 'SignatureImage', opacity: 1, rotateAngle: isFieldRotated ? this.getAngle(currentPage) : 0, annotName: 'SignatureField', comments: [], review: { state: '', stateModel: '', modifiedDate: '', author: '' }
                };
            }
            else if (this.pdfViewerBase.isSignaturePathData(data.Value)) {
                var bound_1 = newBounds;
                var tempBounds = { left: newBounds.x, top: newBounds.y, width: newBounds.width, height: newBounds.height };
                bound_1 = this.updateSignatureBounds(tempBounds, currentPage, false);
                annot = {
                    // eslint-disable-next-line max-len
                    id: this.pdfViewer.element.id + 'input_' + currentPage + '_' + index, bounds: bound_1, pageIndex: currentPage, data: data.Value, modifiedDate: '',
                    shapeAnnotationType: 'Path', opacity: 1, rotateAngle: 0, annotName: 'SignatureField', comments: [], review: { state: '', stateModel: '', modifiedDate: '', author: '' }
                };
            }
            else {
                annot = {
                    // eslint-disable-next-line max-len
                    id: this.pdfViewer.element.id + 'input_' + currentPage + '_' + index, bounds: newBounds, pageIndex: currentPage, data: data.Value, modifiedDate: '',
                    shapeAnnotationType: 'SignatureText', opacity: 1, rotateAngle: isFieldRotated ? this.getAngle(currentPage) : 0, annotName: 'SignatureField', comments: [], review: { state: '', stateModel: '', modifiedDate: '', author: '' }, fontFamily: data.FontFamily, fontSize: data.FontSize
                };
                annot.fontFamily = fontFamily === "TimesRoman" ? "Times New Roman" : fontFamily;
                annot.fontSize = data.FontSize ? data.FontSize : data.fontSize;
            }
            if ((data.Name === 'SignatureField' || data.Name === 'InitialField') && !isNullOrUndefined(data.id)) {
                var elementId = data.id;
                var signatureFieldElement = document.getElementById(elementId + '_content_html_element');
                var signatureField = this.pdfViewer.nameTable[elementId];
                annot.id = signatureField.id + "_content";
                var obj = this.pdfViewer.add(annot);
                signatureField.wrapper.children.push(obj.wrapper);
                if (!isNullOrUndefined(signatureFieldElement) && this.isSignatureField) {
                    var inputField = signatureFieldElement.children[0].children[0];
                    inputField.style.pointerEvents = 'none';
                    inputField.className = 'e-pdfviewer-signatureformfields-signature';
                    inputField.parentElement.style.pointerEvents = 'none';
                }
                else if (!isNullOrUndefined(signatureFieldElement) && data.Value) {
                    var inputField = signatureFieldElement.children[0].children[0];
                    inputField.style.pointerEvents = 'none';
                    inputField.className = 'e-pdfviewer-signatureformfields-signature';
                    inputField.parentElement.style.pointerEvents = 'none';
                }
            }
            else {
                var target = document.getElementById(annot.id);
                if (target && target.classList.contains('e-pdfviewer-signatureformfields-signature')) {
                    this.pdfViewer.annotation.deleteAnnotationById(annot.id);
                }
                this.pdfViewer.add(annot);
                if (target) {
                    this.updateDataInSession(target, annot.data, annot.bounds);
                    this.pdfViewer.fireSignatureAdd(annot.pageIndex, annot.id, annot.shapeAnnotationType, annot.bounds, annot.opacity, annot.strokeColor, annot.thickness, annot.data);
                }
            }
            data.Bounds = annot.bounds;
            if (this.pdfViewer.formDesignerModule) {
                var zoomvalue = this.pdfViewerBase.getZoomFactor();
                annot.bounds = { x: currentLeft * zoomvalue, y: currentTop * zoomvalue, width: currentWidth * zoomvalue, height: currentHeight * zoomvalue };
                this.updateSignatureDataInSession(annot, annot.id);
            }
            // eslint-disable-next-line
            var canvass = document.getElementById(this.pdfViewer.element.id + '_annotationCanvas_' + currentPage);
            // eslint-disable-next-line
            this.pdfViewer.renderDrawing(canvass, currentPage);
        }
    };
    /**
     * @private
     */
    // eslint-disable-next-line
    FormFields.prototype.updateSignatureBounds = function (bound, pageIndex, isFieldRotated) {
        // eslint-disable-next-line
        var pageDetails = this.pdfViewerBase.pageSize[pageIndex];
        if (pageDetails) {
            if (!isFieldRotated) {
                if (pageDetails.rotation === 1) {
                    // eslint-disable-next-line max-len
                    return { x: pageDetails.width - bound.top - bound.height, y: bound.left, width: bound.height, height: bound.width };
                }
                else if (pageDetails.rotation === 2) {
                    // eslint-disable-next-line max-len
                    return { x: pageDetails.width - bound.left - bound.width, y: pageDetails.height - bound.top - bound.height, width: bound.width, height: bound.height };
                }
                else if (pageDetails.rotation === 3) {
                    // eslint-disable-next-line max-len
                    return { x: bound.top, y: (pageDetails.height - bound.left - bound.width), width: bound.height, height: bound.width };
                }
                else {
                    // eslint-disable-next-line max-len
                    return { x: bound.left, y: bound.top, width: bound.width, height: bound.height };
                }
            }
            else {
                if (pageDetails.rotation === 1) {
                    // eslint-disable-next-line max-len
                    return { x: pageDetails.width - bound.top - bound.height - (bound.width / 2 - bound.height / 2), y: bound.left + (bound.width / 2 - bound.height / 2), width: bound.width, height: bound.height };
                }
                else if (pageDetails.rotation === 2) {
                    // eslint-disable-next-line max-len
                    return { x: pageDetails.width - bound.left - bound.width, y: pageDetails.height - bound.top - bound.height, width: bound.width, height: bound.height };
                }
                else if (pageDetails.rotation === 3) {
                    // eslint-disable-next-line max-len
                    return { x: bound.top - (bound.width / 2 - bound.height / 2), y: (pageDetails.height - bound.left - bound.width + (bound.width / 2 - bound.height / 2)), width: bound.width, height: bound.height };
                }
                else {
                    // eslint-disable-next-line max-len
                    return { x: bound.left, y: bound.top, width: bound.width, height: bound.height };
                }
            }
        }
        else {
            return { x: bound.left, y: bound.top, width: bound.width, height: bound.height };
        }
    };
    FormFields.prototype.resetFormFields = function () {
        var formFieldData = this.pdfViewer.formFieldCollections;
        for (var i = 0; i < formFieldData.length; i++) {
            var currentData = formFieldData[i];
            this.currentTarget = document.getElementById(currentData.id);
            if (currentData.type === 'Textbox') {
                this.currentTarget.value = currentData.value;
            }
            else if (currentData.type === 'RadioButton') {
                this.currentTarget.checked = currentData.value;
                if (currentData.value) {
                    this.updateDataInSession(this.currentTarget);
                }
            }
            else if (currentData.type === 'DropDown') {
                this.currentTarget.value = currentData.value;
            }
            else if (currentData.type === 'CheckBox') {
                this.currentTarget.checked = currentData.value;
            }
            else if (currentData.type === 'SignatureField') {
                // eslint-disable-next-line
                var annotation = this.pdfViewer.nameTable[currentData.id];
                if (annotation) {
                    if (this.currentTarget && this.currentTarget.className === 'e-pdfviewer-signatureformfields-signature') {
                        this.currentTarget.className = 'e-pdfviewer-signatureformfields';
                        this.currentTarget.style.pointerEvents = '';
                        this.updateDataInSession(this.currentTarget, '');
                    }
                    this.pdfViewer.remove(annotation);
                    this.pdfViewer.renderDrawing();
                }
            }
            if (currentData.type !== 'RadioButton' && currentData.type !== 'SignatureField') {
                this.updateDataInSession(this.currentTarget);
            }
        }
    };
    /**
     * @private
     */
    // eslint-disable-next-line
    FormFields.prototype.clearFormFieldStorage = function () {
        // eslint-disable-next-line
        var sessionSize = Math.round(JSON.stringify(window.sessionStorage).length / 1024);
        var maxSessionSize = 4500;
        if (this.pdfViewerBase.isStorageExceed) {
            var storageLength = window.sessionStorage.length;
            // eslint-disable-next-line
            var formFieldsList = [];
            for (var i = 0; i < storageLength; i++) {
                if (window.sessionStorage.key(i) && window.sessionStorage.key(i).split('_')[3]) {
                    if (window.sessionStorage.key(i).split('_')[3] === 'formfields') {
                        // eslint-disable-next-line max-len
                        this.pdfViewerBase.formFieldStorage[window.sessionStorage.key(i)] = window.sessionStorage.getItem(window.sessionStorage.key(i));
                        formFieldsList.push(window.sessionStorage.key(i));
                    }
                    else if (window.sessionStorage.key(i).split('_')[3] === 'formDesigner') {
                        this.pdfViewerBase.formFieldStorage[window.sessionStorage.key(i)] = window.sessionStorage.getItem(window.sessionStorage.key(i));
                        formFieldsList.push(window.sessionStorage.key(i));
                    }
                }
            }
            if (formFieldsList) {
                for (var i = 0; i < formFieldsList.length; i++) {
                    window.sessionStorage.removeItem(formFieldsList[i]);
                }
            }
        }
    };
    // eslint-disable-next-line
    FormFields.prototype.clearFormFields = function (formField) {
        // eslint-disable-next-line
        var data = this.pdfViewerBase.getItemFromSessionStorage('_formfields');
        if (data) {
            // eslint-disable-next-line
            var formFieldsData = void 0;
            if (formField) {
                formFieldsData = [formField];
            }
            else {
                formFieldsData = JSON.parse(data);
            }
            var isFirstRadio = true;
            for (var m = 0; m < formFieldsData.length; m++) {
                // eslint-disable-next-line
                var currentData = formFieldsData[m];
                if (formField) {
                    currentData.uniqueID = formField.id;
                    currentData.Name = formField.type;
                }
                // eslint-disable-next-line
                this.currentTarget = document.getElementById(currentData.uniqueID);
                if (currentData.Name === 'Textbox') {
                    this.currentTarget.value = '';
                }
                else if (currentData.Name === 'RadioButton') {
                    if (isFirstRadio) {
                        this.currentTarget.checked = true;
                        this.updateDataInSession(this.currentTarget);
                        isFirstRadio = false;
                    }
                }
                else if (currentData.Name === 'DropDown') {
                    this.currentTarget.value = currentData.TextList[0];
                }
                else if (currentData.Name === 'CheckBox') {
                    this.currentTarget.checked = false;
                }
                else if (currentData.Name === 'SignatureField' || currentData.Name === 'InitialField') {
                    // eslint-disable-next-line
                    var annotation = this.pdfViewer.nameTable[currentData.uniqueID];
                    if (annotation.propName !== 'annotations') {
                        annotation = this.pdfViewer.nameTable[currentData.uniqueID + '_content'];
                    }
                    if (annotation) {
                        if (this.currentTarget && this.currentTarget.className === 'e-pdfviewer-signatureformfields-signature') {
                            this.currentTarget.className = 'e-pdfviewer-signatureformfields';
                            this.currentTarget.style.pointerEvents = '';
                            this.currentTarget.parentElement.style.pointerEvents = '';
                            this.updateDataInSession(this.currentTarget, '');
                            if (formField) {
                                formField.value = '';
                                formField.signatureType = [formField.signatureType];
                                formField.signatureType[0] = '';
                            }
                        }
                        this.pdfViewer.annotation.deleteAnnotationById(annotation.id);
                    }
                }
                if (currentData.Name !== 'SignatureField' && currentData.Name !== 'ink' && currentData.Name !== 'RadioButton') {
                    this.updateDataInSession(this.currentTarget);
                }
            }
        }
    };
    /**
     * @param number
     * @private
     */
    // eslint-disable-next-line
    FormFields.prototype.ConvertPointToPixel = function (number) {
        return (number * (96 / 72));
    };
    /**
     * @private
     */
    FormFields.prototype.destroy = function () {
        this.currentTarget = null;
        this.readOnlyCollection = [];
        if (this.pdfViewerBase && this.pdfViewerBase.signatureModule)
            this.pdfViewerBase.signatureModule.destroy();
    };
    /**
     * @private
     */
    FormFields.prototype.getModuleName = function () {
        return 'FormFields';
    };
    /**
     * @private
     * Get the text wdith
     * @param text
     * @param font
     * @param fontFamily
    */
    FormFields.prototype.getTextWidth = function (text, font, fontFamily) {
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        var fontName;
        if (font) {
            fontName = font + 'px' + ' ' + fontFamily;
        }
        context.font = fontName || getComputedStyle(document.body).font;
        return context.measureText(text).width;
    };
    /**
     * @private
     * @param {number} fontSize - Font size.
     * @returns {number} - Returns the font size.
    */
    FormFields.prototype.getFontSize = function (fontSize) {
        return fontSize;
        ;
    };
    return FormFields;
}());
export { FormFields };
