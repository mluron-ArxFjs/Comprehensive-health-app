var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Node } from '../objects/node';
import { Connector, BezierSegment, StraightSegment } from '../objects/connector';
import { Point } from '../primitives/point';
import { BpmnSubEvent } from '../objects/node';
import { PointPort } from '../objects/port';
import { rotatePoint, cloneObject, randomId } from '../utility/base-util';
import { Rect } from '../primitives/rect';
import { getFreeHandPath, getPolygonPath } from '../utility/path-util';
import { canOutConnect, canInConnect, canAllowDrop, canPortInConnect, canPortOutConnect, canMove } from '../utility/constraints-util';
import { transformPointByMatrix, rotateMatrix, identityMatrix } from '../primitives/matrix';
import { NodeConstraints, DiagramEvent, PortConstraints } from './../enum/enum';
import { TextElement } from '../core/elements/text-element';
import { contains } from './actions';
import { Selector } from '../objects/node';
import { getInOutConnectPorts, cloneBlazorObject, getDropEventArguements, getObjectType, checkPort } from '../utility/diagram-util';
import { initializeCSPTemplate, isBlazor } from '@syncfusion/ej2-base';
import { DeepDiffMapper } from '../utility/diff-map';
import { findAngle } from '../utility/connector';
/**
 * Defines the interactive tools
 */
var ToolBase = /** @class */ (function () {
    /**
     * Initializes the tool
     *
     * @param {CommandHandler} command Command that is corresponding to the current action
     * @param protectChange
     */
    function ToolBase(command, protectChange) {
        if (protectChange === void 0) { protectChange = false; }
        /**
         * Command that is corresponding to the current action
         */
        this.commandHandler = null;
        this.deepDiffer = new DeepDiffMapper();
        /**
         * Sets/Gets whether the interaction is being done
         */
        this.inAction = false;
        /**
         * Sets/Gets the protect change
         */
        this.isProtectChange = false;
        /**
         * Sets/Gets the current element that is under mouse
         */
        this.currentElement = null;
        /**   @private  */
        this.blocked = false;
        this.isTooltipVisible = false;
        /** @private */
        this.childTable = {};
        /**
         * Sets/Gets the previous object when mouse down
         */
        this.undoElement = { nodes: [], connectors: [] };
        this.checkProperty = true;
        this.undoParentElement = { nodes: [], connectors: [] };
        this.commandHandler = command;
        this.isProtectChange = protectChange;
    }
    ToolBase.prototype.startAction = function (currentElement) {
        this.currentElement = currentElement;
        this.inAction = true;
    };
    /**
     * @param args
     * @private
     */
    ToolBase.prototype.mouseDown = function (args) {
        if (isBlazor()) {
            this.commandHandler.enableCloneObject(true);
            this.commandHandler.ismouseEvents(true);
        }
        this.currentElement = args.source;
        this.startPosition = this.currentPosition = this.prevPosition = args.position;
        this.isTooltipVisible = true;
        this.startAction(args.source);
        this.checkProperty = true;
        // Bug fix - EJ2-44495 -Node does not gets selected on slight movement of mouse when drag constraints disabled for node
        this.mouseDownElement = args.source;
    };
    ToolBase.prototype.checkPropertyValue = function () {
        if (this.checkProperty) {
            this.commandHandler.startTransaction(this.isProtectChange);
        }
    };
    /**
     * @param args
     * @private
     */
    ToolBase.prototype.mouseMove = function (args) {
        this.currentPosition = args.position;
        if (this.inAction) {
            this.commandHandler.startTransaction(this.isProtectChange);
            this.checkProperty = false;
        }
        //this.currentElement = currentElement;
        return !this.blocked;
    };
    /**
     * @param args
     * @private
     */
    ToolBase.prototype.mouseUp = function (args) {
        this.checkPropertyValue();
        this.currentPosition = args.position;
        // this.currentElement = currentElement;
        this.isTooltipVisible = false;
        this.commandHandler.endTransaction(this.isProtectChange);
        if (isBlazor()) {
            this.commandHandler.enableCloneObject(false);
            this.commandHandler.ismouseEvents(false);
            this.commandHandler.getBlazorOldValues(args, this instanceof LabelDragTool);
        }
        this.endAction();
        // Bug fix - EJ2-44495 -Node does not gets selected on slight movement of mouse when drag constraints disabled for node
        this.mouseDownElement = null;
    };
    ToolBase.prototype.endAction = function () {
        if (!this.isTooltipVisible) {
            this.commandHandler.closeTooltip();
        }
        this.commandHandler = null;
        this.currentElement = null;
        this.currentPosition = null;
        this.inAction = false;
        this.blocked = false;
    };
    /**
     * @param args
     * @private
     */
    ToolBase.prototype.mouseWheel = function (args) {
        this.currentPosition = args.position;
    };
    /**
     * @param args
     * @private
     */
    ToolBase.prototype.mouseLeave = function (args) {
        this.mouseUp(args);
    };
    ToolBase.prototype.updateSize = function (shape, startPoint, endPoint, corner, initialBounds, angle) {
        shape = this.commandHandler.renderContainerHelper(shape) || shape;
        var horizontalsnap = { snapped: false, offset: 0, left: false, right: false };
        var verticalsnap = { snapped: false, offset: 0, top: false, bottom: false };
        var difx = this.currentPosition.x - this.startPosition.x;
        var dify = this.currentPosition.y - this.startPosition.y;
        var snapEnabled = (!(shape instanceof TextElement)) && this.commandHandler.snappingModule
            && this.commandHandler.snappingModule.canSnap();
        var snapLine = snapEnabled ? this.commandHandler.snappingModule.getLayer() : null;
        var rotateAngle = (shape instanceof TextElement) ? angle : shape.rotateAngle;
        var matrix;
        matrix = identityMatrix();
        rotateMatrix(matrix, -rotateAngle, 0, 0);
        var x = shape.offsetX;
        var y = shape.offsetY;
        var w = shape.width;
        var h = shape.height;
        x = x - w * shape.pivot.x;
        y = y - h * shape.pivot.y;
        var deltaWidth = 0;
        var deltaHeight = 0;
        var diff;
        var width = (shape instanceof TextElement) ? shape.actualSize.width : shape.width;
        var height = (shape instanceof TextElement) ? shape.actualSize.height : shape.height;
        switch (corner) {
            case 'ResizeWest':
                diff = transformPointByMatrix(matrix, ({ x: difx, y: dify }));
                difx = diff.x;
                dify = diff.y;
                deltaHeight = 1;
                difx = snapEnabled ? this.commandHandler.snappingModule.snapLeft(horizontalsnap, verticalsnap, snapLine, difx, dify, shape, endPoint === startPoint, initialBounds) :
                    difx;
                dify = 0;
                deltaWidth = (initialBounds.width - difx) / width;
                break;
            case 'ResizeEast':
                diff = transformPointByMatrix(matrix, ({ x: difx, y: dify }));
                difx = diff.x;
                dify = diff.y;
                difx = snapEnabled ? this.commandHandler.snappingModule.snapRight(horizontalsnap, verticalsnap, snapLine, difx, dify, shape, endPoint === startPoint, initialBounds) :
                    difx;
                dify = 0;
                deltaWidth = (initialBounds.width + difx) / width;
                deltaHeight = 1;
                break;
            case 'ResizeNorth':
                deltaWidth = 1;
                diff = transformPointByMatrix(matrix, ({ x: difx, y: dify }));
                difx = diff.x;
                dify = diff.y;
                dify = snapEnabled ? this.commandHandler.snappingModule.snapTop(horizontalsnap, verticalsnap, snapLine, difx, dify, shape, endPoint === startPoint, initialBounds) :
                    dify;
                deltaHeight = (initialBounds.height - dify) / height;
                break;
            case 'ResizeSouth':
                deltaWidth = 1;
                diff = transformPointByMatrix(matrix, ({ x: difx, y: dify }));
                difx = diff.x;
                dify = diff.y;
                dify = snapEnabled ? this.commandHandler.snappingModule.snapBottom(horizontalsnap, verticalsnap, snapLine, difx, dify, shape, endPoint === startPoint, initialBounds) :
                    dify;
                deltaHeight = (initialBounds.height + dify) / height;
                break;
            case 'ResizeNorthEast':
                diff = transformPointByMatrix(matrix, ({ x: difx, y: dify }));
                difx = diff.x;
                dify = diff.y;
                difx = snapEnabled ? this.commandHandler.snappingModule.snapRight(horizontalsnap, verticalsnap, snapLine, difx, dify, shape, endPoint === startPoint, initialBounds) :
                    difx;
                dify = snapEnabled ? this.commandHandler.snappingModule.snapTop(horizontalsnap, verticalsnap, snapLine, difx, dify, shape, endPoint === startPoint, initialBounds) :
                    dify;
                deltaWidth = (initialBounds.width + difx) / width;
                deltaHeight = (initialBounds.height - dify) / height;
                break;
            case 'ResizeNorthWest':
                diff = transformPointByMatrix(matrix, ({ x: difx, y: dify }));
                difx = diff.x;
                dify = diff.y;
                dify = !snapEnabled ? dify : this.commandHandler.snappingModule.snapTop(horizontalsnap, verticalsnap, snapLine, difx, dify, shape, endPoint === startPoint, initialBounds);
                difx = !snapEnabled ? difx : this.commandHandler.snappingModule.snapLeft(horizontalsnap, verticalsnap, snapLine, difx, dify, shape, endPoint === startPoint, initialBounds);
                deltaWidth = (initialBounds.width - difx) / width;
                deltaHeight = (initialBounds.height - dify) / height;
                break;
            case 'ResizeSouthEast':
                diff = transformPointByMatrix(matrix, ({ x: difx, y: dify }));
                difx = diff.x;
                dify = diff.y;
                dify = !snapEnabled ? dify : this.commandHandler.snappingModule.snapBottom(horizontalsnap, verticalsnap, snapLine, difx, dify, shape, endPoint === startPoint, initialBounds);
                difx = !snapEnabled ? difx : this.commandHandler.snappingModule.snapRight(horizontalsnap, verticalsnap, snapLine, difx, dify, shape, endPoint === startPoint, initialBounds);
                deltaHeight = (initialBounds.height + dify) / height;
                deltaWidth = (initialBounds.width + difx) / width;
                break;
            case 'ResizeSouthWest':
                diff = transformPointByMatrix(matrix, ({ x: difx, y: dify }));
                difx = diff.x;
                dify = diff.y;
                dify = snapEnabled ? this.commandHandler.snappingModule.snapBottom(horizontalsnap, verticalsnap, snapLine, difx, dify, shape, endPoint === startPoint, initialBounds) : dify;
                difx = snapEnabled ? this.commandHandler.snappingModule.snapLeft(horizontalsnap, verticalsnap, snapLine, difx, dify, shape, endPoint === startPoint, initialBounds) : difx;
                deltaWidth = (initialBounds.width - difx) / width;
                deltaHeight = (initialBounds.height + dify) / height;
                break;
        }
        return { width: deltaWidth, height: deltaHeight };
    };
    ToolBase.prototype.getPivot = function (corner) {
        switch (corner) {
            case 'ResizeWest':
                return { x: 1, y: 0.5 };
            case 'ResizeEast':
                return { x: 0, y: 0.5 };
            case 'ResizeNorth':
                return { x: 0.5, y: 1 };
            case 'ResizeSouth':
                return { x: 0.5, y: 0 };
            case 'ResizeNorthEast':
                return { x: 0, y: 1 };
            case 'ResizeNorthWest':
                return { x: 1, y: 1 };
            case 'ResizeSouthEast':
                return { x: 0, y: 0 };
            case 'ResizeSouthWest':
                return { x: 1, y: 0 };
        }
        return { x: 0.5, y: 0.5 };
    };
    //method to get node shape name
    ToolBase.prototype.getShapeType = function () {
        var shape;
        if (this.commandHandler.diagram.drawingObject.shape.type === 'Image' || 'HTML' || 'Native' || 'Path') {
            shape = this.commandHandler.diagram.drawingObject.shape.type;
        }
        else {
            shape = this.commandHandler.diagram.drawingObject.shape.shape;
        }
        return shape;
    };
    //EJ2-52203-Method to trigger ElementDraw Event when we draw node or connector with the drawing Tool
    ToolBase.prototype.triggerElementDrawEvent = function (source, state, objectType, elementType, isMouseDownAction) {
        var arg = {
            source: source, state: state, objectType: objectType, cancel: false, elementType: elementType
        };
        this.commandHandler.triggerEvent(DiagramEvent.elementDraw, arg);
        if (isMouseDownAction && arg.cancel) {
            {
                this.commandHandler.diagram.resetTool();
            }
        }
    };
    return ToolBase;
}());
export { ToolBase };
/**
 * Helps to select the objects
 */
var SelectTool = /** @class */ (function (_super) {
    __extends(SelectTool, _super);
    function SelectTool(commandHandler, protectChange, action) {
        var _this = _super.call(this, commandHandler, true) || this;
        _this.action = action;
        return _this;
    }
    /**
     * @param args
     * @private
     */
    SelectTool.prototype.mouseDown = function (args) {
        this.inAction = true;
        _super.prototype.mouseDown.call(this, args);
    };
    /**
     * @param args
     * @private
     */
    SelectTool.prototype.mouseMove = function (args) {
        _super.prototype.mouseMove.call(this, args);
        //draw selected region
        if (this.inAction && Point.equals(this.currentPosition, this.prevPosition) === false) {
            var rect = Rect.toBounds([this.prevPosition, this.currentPosition]);
            // Bug fix - EJ2-44495 -Node does not gets selected on slight movement of mouse when drag constraints disabled for node
            if (this.mouseDownElement && !canMove(this.mouseDownElement)) {
                this.commandHandler.clearObjectSelection(this.mouseDownElement);
            }
            else {
                this.commandHandler.clearSelectedItems();
                this.commandHandler.drawSelectionRectangle(rect.x, rect.y, rect.width, rect.height);
            }
        }
        return !this.blocked;
    };
    /**
     * @param args
     * @private
     */
    SelectTool.prototype.mouseUp = function (args) {
        this.checkPropertyValue();
        //rubber band selection
        if (!this.commandHandler.isUserHandle(this.currentPosition)) {
            if (Point.equals(this.currentPosition, this.prevPosition) === false && this.inAction) {
                var region = Rect.toBounds([this.prevPosition, this.currentPosition]);
                this.commandHandler.doRubberBandSelection(region);
            }
            else {
                //single selection
                var arrayNodes = this.commandHandler.getSelectedObject();
                if (!this.commandHandler.hasSelection() || !args.info || !args.info.ctrlKey) {
                    this.commandHandler.clearSelection(args.source === null ? true : false);
                    if (this.action === 'LabelSelect') {
                        this.commandHandler.labelSelect(args.source, args.sourceWrapper);
                    }
                    else if (args.source) {
                        this.commandHandler.selectObjects([args.source], false, arrayNodes);
                    }
                }
                else {
                    //handling multiple selection
                    if (args && args.source) {
                        if (!this.commandHandler.isSelected(args.source)) {
                            this.commandHandler.selectObjects([args.source], true);
                        }
                        else {
                            if (args.clickCount === 1) {
                                this.commandHandler.unSelect(args.source);
                                this.commandHandler.updateBlazorSelector();
                            }
                        }
                    }
                }
            }
        }
        this.inAction = false;
        _super.prototype.mouseUp.call(this, args);
    };
    /**
     * @param args
     * @private
     */
    SelectTool.prototype.mouseLeave = function (args) {
        if (this.inAction) {
            this.mouseUp(args);
        }
    };
    return SelectTool;
}(ToolBase));
export { SelectTool };
var FixedUserHandleTool = /** @class */ (function (_super) {
    __extends(FixedUserHandleTool, _super);
    function FixedUserHandleTool() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param args
     * @private
     */
    FixedUserHandleTool.prototype.mouseUp = function (args) {
        this.checkPropertyValue();
        this.inAction = false;
        var val = args.source;
        var fixedUserHandle;
        var iconId = args.sourceWrapper.id;
        for (var i = 0; i < val.fixedUserHandles.length; i++) {
            if (iconId.indexOf(val.fixedUserHandles[parseInt(i.toString(), 10)].id) > -1) {
                fixedUserHandle = val.fixedUserHandles[parseInt(i.toString(), 10)];
            }
        }
        if (isBlazor()) {
            var element = getObjectType(args.source) === Connector ? { connector: args.source }
                : { node: args.source };
            var fixedUserHandles = getObjectType(args.source) === Connector ?
                { connectorFixedUserHandle: fixedUserHandle }
                : { nodeFixedUserHandle: fixedUserHandle };
            var arg = {
                fixedUserHandle: fixedUserHandles,
                element: element
            };
            var trigger = DiagramEvent.fixedUserHandleClick;
            this.commandHandler.triggerEvent(trigger, arg);
            _super.prototype.mouseUp.call(this, args);
        }
        else {
            var arg = {
                fixedUserHandle: fixedUserHandle,
                element: args.source
            };
            var trigger = DiagramEvent.fixedUserHandleClick;
            this.commandHandler.triggerEvent(trigger, arg);
            _super.prototype.mouseUp.call(this, args);
        }
    };
    return FixedUserHandleTool;
}(ToolBase));
export { FixedUserHandleTool };
/**
 * Helps to edit the selected connectors
 */
var ConnectTool = /** @class */ (function (_super) {
    __extends(ConnectTool, _super);
    function ConnectTool(commandHandler, endPoint) {
        var _this = _super.call(this, commandHandler, true) || this;
        _this.isConnected = false;
        _this.endPoint = endPoint;
        return _this;
    }
    /**
     * @param args
     * @private
     */
    ConnectTool.prototype.mouseDown = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var selectorModel, connector, arg, oldValue, connectors, i, segment, segmentpoint1, segmentpoint2;
            return __generator(this, function (_a) {
                if (isBlazor() && args && args.source) {
                    this.commandHandler.insertSelectedObjects();
                    this.commandHandler.insertBlazorConnector(args.source);
                    selectorModel = args.source;
                    if (selectorModel.connectors) {
                        connector = selectorModel.connectors[0];
                        this.oldConnector = cloneObject(connector);
                        arg = {
                            connector: cloneBlazorObject(connector),
                            oldValue: { connectorTargetValue: { portId: undefined, nodeId: undefined } },
                            newValue: { connectorTargetValue: { portId: undefined, nodeId: undefined } },
                            cancel: false, state: 'Changing', connectorEnd: this.endPoint
                        };
                        this.tempArgs = arg;
                    }
                }
                this.inAction = true;
                this.undoElement = undefined;
                if (!(this instanceof ConnectorDrawingTool)) {
                    this.undoElement = cloneObject(args.source);
                }
                _super.prototype.mouseDown.call(this, args);
                if (args.source && args.source.connectors) {
                    oldValue = { x: this.prevPosition.x, y: this.prevPosition.y };
                    connectors = args.source.connectors[0];
                    this.oldConnector = cloneObject(connectors);
                }
                // Sets the selected segment
                if (this.endPoint === 'BezierSourceThumb' || this.endPoint === 'BezierTargetThumb') {
                    for (i = 0; i < connectors.segments.length; i++) {
                        segment = connectors.segments[parseInt(i.toString(), 10)];
                        segmentpoint1 = !Point.isEmptyPoint(segment.point1) ? segment.point1 : segment.bezierPoint1;
                        segmentpoint2 = !Point.isEmptyPoint(segment.point2) ? segment.point2 : segment.bezierPoint2;
                        //(EJ2-70650)-Unable to drag bezier control thumb, when we increase handleSize value 
                        //Added below code for drag the bezier control thumb while increasing handle size(For hitPadding)
                        if (this.currentElement.handleSize !== connectors.hitPadding) {
                            connectors.hitPadding = this.currentElement.handleSize;
                        }
                        if (contains(this.currentPosition, segmentpoint1, connectors.hitPadding) ||
                            contains(this.currentPosition, segmentpoint2, connectors.hitPadding)) {
                            this.selectedSegment = segment;
                        }
                    }
                }
                this.currentPosition = args.position;
                return [2 /*return*/];
            });
        });
    };
    /**
     * @param args
     * @private
     */
    ConnectTool.prototype.mouseUp = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var trigger, temparg, nodeEndId, portEndId, diagram, blazorInterop, blazor, eventObj, connector, nodeEndId, portEndId, arg, oldValues, connector, targetPortName, targetNodeNode, target, arg, trigger, obj, entry, obj, entry, connector;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!isBlazor()) return [3 /*break*/, 3];
                        trigger = DiagramEvent.connectionChange;
                        temparg = void 0;
                        if (!(this.tempArgs && this.oldConnector)) return [3 /*break*/, 3];
                        this.commandHandler.updatePropertiesToBlazor(args, false);
                        this.tempArgs.state = 'Changed';
                        nodeEndId = this.endPoint === 'ConnectorSourceEnd' ? 'sourceID' : 'targetID';
                        portEndId = this.endPoint === 'ConnectorSourceEnd' ? 'sourcePortID' : 'targetPortID';
                        this.tempArgs.oldValue = this.endPoint === 'ConnectorSourceEnd' ?
                            { connectorSourceValue: { nodeId: this.oldConnector["" + nodeEndId], portId: this.oldConnector["" + portEndId] } } :
                            { connectorTargetValue: { nodeId: this.oldConnector["" + nodeEndId], portId: this.oldConnector["" + portEndId] } };
                        temparg = {
                            state: this.tempArgs.state, oldValue: this.tempArgs.oldValue,
                            newValue: this.tempArgs.newValue, cancel: this.tempArgs.cancel, connectorEnd: this.tempArgs.connectorEnd
                        };
                        diagram = 'diagram';
                        blazorInterop = 'sfBlazor';
                        blazor = 'Blazor';
                        if (!(window && window["" + blazor] && this.commandHandler["" + diagram].connectionChange)) return [3 /*break*/, 2];
                        eventObj = { 'EventName': 'connectionChange', args: JSON.stringify(this.tempArgs) };
                        return [4 /*yield*/, window["" + blazorInterop].updateBlazorDiagramEvents(eventObj, this.commandHandler["" + diagram])];
                    case 1:
                        temparg = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (temparg) {
                            this.commandHandler.updateConnectorValue(temparg);
                        }
                        _a.label = 3;
                    case 3:
                        if (!isBlazor() && this.isConnected && args.source.connectors) {
                            connector = args.source.connectors[0];
                            nodeEndId = this.endPoint === 'ConnectorSourceEnd' ? 'sourceID' : 'targetID';
                            portEndId = this.endPoint === 'ConnectorSourceEnd' ? 'sourcePortID' : 'targetPortID';
                            arg = {
                                connector: cloneBlazorObject(connector),
                                oldValue: { nodeId: this.oldConnector["" + nodeEndId], portId: this.oldConnector["" + portEndId] },
                                newValue: { nodeId: connector["" + nodeEndId], portId: connector["" + portEndId] }, cancel: false,
                                state: 'Changed', connectorEnd: this.endPoint
                            };
                            if (connector["" + nodeEndId] !== this.oldConnector["" + nodeEndId]) {
                                this.commandHandler.triggerEvent(DiagramEvent.connectionChange, arg);
                                this.isConnected = false;
                            }
                        }
                        this.checkPropertyValue();
                        this.commandHandler.updateSelector();
                        this.commandHandler.removeSnap();
                        this.commandHandler.changeAnnotationDrag(args);
                        if ((!(this instanceof ConnectorDrawingTool)) && ((this.endPoint === 'ConnectorSourceEnd' &&
                            args.source.connectors.length &&
                            ((!Point.equals(args.source.connectors[0].sourcePoint, this.undoElement.connectors[0].sourcePoint) ||
                                (args.source.connectors[0].sourceID !== this.undoElement.connectors[0].sourceID)))) ||
                            (this.endPoint === 'ConnectorTargetEnd' &&
                                ((!Point.equals(args.source.connectors[0].targetPoint, this.undoElement.connectors[0].targetPoint))
                                    || (args.source.connectors[0].targetID !== this.undoElement.connectors[0].targetID))))) {
                            oldValues = void 0;
                            connector = void 0;
                            if (args.source && args.source.connectors) {
                                oldValues = { x: this.prevPosition.x, y: this.prevPosition.y };
                                connector = args.source.connectors[0];
                            }
                            targetPortName = void 0;
                            targetNodeNode = void 0;
                            if (args.target) {
                                target = this.commandHandler.findTarget(args.targetWrapper, args.target, this.endPoint === 'ConnectorSourceEnd', true);
                                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                                (target instanceof PointPort) ? targetPortName = target.id : targetNodeNode = target.id;
                            }
                            arg = {
                                connector: connector, state: 'Completed', targetNode: targetNodeNode,
                                oldValue: oldValues, newValue: oldValues, cancel: false, targetPort: targetPortName
                            };
                            if (isBlazor()) {
                                arg = {
                                    connector: cloneBlazorObject(connector), state: 'Completed', targetNode: targetNodeNode,
                                    oldValue: cloneBlazorObject(oldValues), newValue: oldValues, cancel: arg.cancel, targetPort: targetPortName
                                };
                            }
                            trigger = this.endPoint === 'ConnectorSourceEnd' ? DiagramEvent.sourcePointChange : DiagramEvent.targetPointChange;
                            this.commandHandler.triggerEvent(trigger, arg);
                            this.commandHandler.removeTerminalSegment(connector, true);
                            if (this.undoElement && args.source) {
                                obj = void 0;
                                obj = cloneObject(args.source);
                                entry = {
                                    type: 'ConnectionChanged', redoObject: cloneObject(obj), undoObject: cloneObject(this.undoElement),
                                    category: 'Internal'
                                };
                                this.commandHandler.addHistoryEntry(entry);
                            }
                        }
                        else if (!(this instanceof ConnectorDrawingTool) &&
                            (this.endPoint === 'BezierTargetThumb' || this.endPoint === 'BezierSourceThumb')) {
                            if (this.undoElement && args.source) {
                                obj = cloneObject(args.source);
                                entry = {
                                    type: 'SegmentChanged', redoObject: obj, undoObject: this.undoElement, category: 'Internal'
                                };
                                this.commandHandler.addHistoryEntry(entry);
                            }
                        }
                        this.commandHandler.updateBlazorSelector();
                        this.canCancel = undefined;
                        this.tempArgs = undefined;
                        //(EJ2-66201) - Exception occurs when mouse-hover on ports in node
                        if (args.source && args.source.connectors) {
                            connector = args.source.connectors[0];
                            if (connector.isBezierEditing) {
                                connector.isBezierEditing = false;
                            }
                        }
                        _super.prototype.mouseUp.call(this, args);
                        return [2 /*return*/];
                }
            });
        });
    };
    /* tslint:disable */
    /**
     * @param args
     * @private
     */
    ConnectTool.prototype.mouseMove = function (args) {
        _super.prototype.mouseMove.call(this, args);
        var tempArgs;
        if ((!(this instanceof ConnectorDrawingTool)) && ((this.endPoint === 'ConnectorSourceEnd' &&
            Point.equals(args.source.connectors[0].sourcePoint, this.undoElement.connectors[0].sourcePoint)) ||
            (this.endPoint === 'ConnectorTargetEnd' &&
                Point.equals(args.source.connectors[0].targetPoint, this.undoElement.connectors[0].targetPoint)))) {
            var oldValue = void 0;
            var connectors = void 0;
            if (args.source && args.source.connectors) {
                oldValue = { x: this.prevPosition.x, y: this.prevPosition.y };
                connectors = args.source.connectors[0];
            }
            var targetPort = void 0;
            var targetNode = void 0;
            if (args.target) {
                targetNode = args.target.id;
                var target = this.commandHandler.findTarget(args.targetWrapper, args.target, this.endPoint === 'ConnectorSourceEnd', true);
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                (target instanceof PointPort || target instanceof BpmnSubEvent) ? targetPort = target.id : targetNode = target.id;
            }
            var arg = {
                connector: connectors, state: 'Start', targetNode: targetNode,
                oldValue: oldValue, newValue: oldValue, cancel: false, targetPort: targetPort
            };
            if (isBlazor()) {
                arg = {
                    connector: cloneBlazorObject(connectors), state: 'Start', targetNode: targetNode,
                    oldValue: oldValue, newValue: oldValue, cancel: arg.cancel, targetPort: targetPort
                };
            }
            var trigger = this.endPoint === 'ConnectorSourceEnd' ?
                DiagramEvent.sourcePointChange : DiagramEvent.targetPointChange;
            this.commandHandler.triggerEvent(trigger, arg);
        }
        this.currentPosition = args.position;
        if (this.currentPosition && this.prevPosition) {
            var diffX = this.currentPosition.x - this.prevPosition.x;
            var diffY = this.currentPosition.y - this.prevPosition.y;
            var newValue = void 0;
            var oldValue = void 0;
            var inPort = void 0;
            var outPort = void 0;
            this.currentPosition = this.commandHandler.snapConnectorEnd(this.currentPosition);
            var connector = void 0;
            if (args.source && args.source.connectors) {
                newValue = { x: this.currentPosition.x, y: this.currentPosition.y };
                oldValue = { x: this.prevPosition.x, y: this.prevPosition.y };
                connector = args.source.connectors[0];
            }
            var targetPortId = void 0;
            var targetNodeId = void 0;
            if (args.target) {
                var target = this.commandHandler.findTarget(args.targetWrapper, args.target, this.endPoint === 'ConnectorSourceEnd', true);
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                (target instanceof PointPort) ? targetPortId = target.id : targetNodeId = target.id;
            }
            var arg = {
                connector: connector, state: 'Progress', targetNode: targetNodeId,
                oldValue: oldValue, newValue: newValue, cancel: false, targetPort: targetPortId
            };
            if (isBlazor()) {
                arg = {
                    connector: cloneBlazorObject(connector), state: 'Progress', targetNode: targetNodeId,
                    oldValue: oldValue, newValue: newValue, cancel: arg.cancel, targetPort: targetPortId
                };
            }
            if (!(this instanceof ConnectorDrawingTool)) {
                var trigger = this.endPoint === 'ConnectorSourceEnd' ?
                    DiagramEvent.sourcePointChange : DiagramEvent.targetPointChange;
                this.commandHandler.triggerEvent(trigger, arg);
            }
            if (args.target) {
                inPort = getInOutConnectPorts(args.target, true);
                outPort = getInOutConnectPorts(args.target, false);
            }
            if (!arg.cancel && this.inAction && this.endPoint !== undefined && diffX !== 0 || diffY !== 0) {
                // EJ2-65331 - The condition checks whether the cancel argument is true or false
                if (!arg.cancel) {
                    this.blocked = !this.commandHandler.dragConnectorEnds(this.endPoint, args.source, this.currentPosition, this.selectedSegment, args.target, targetPortId);
                    this.commandHandler.updateSelector();
                }
                if (args.target && ((this.endPoint === 'ConnectorSourceEnd' && (canOutConnect(args.target) || canPortOutConnect(outPort)))
                    || (this.endPoint === 'ConnectorTargetEnd' && (canInConnect(args.target) || canPortInConnect(inPort))))) {
                    if (this.commandHandler.canDisconnect(this.endPoint, args, targetPortId, targetNodeId)) {
                        tempArgs = this.commandHandler.disConnect(args.source, this.endPoint, this.canCancel);
                        this.isConnected = true;
                    }
                    var target = this.commandHandler.findTarget(args.targetWrapper, args.target, this.endPoint === 'ConnectorSourceEnd', true);
                    if (target instanceof Node) {
                        if ((canInConnect(target) && this.endPoint === 'ConnectorTargetEnd')
                            || (canOutConnect(target) && this.endPoint === 'ConnectorSourceEnd')) {
                            tempArgs = this.commandHandler.connect(this.endPoint, args, this.canCancel);
                            this.isConnected = true;
                        }
                    }
                    else {
                        var isConnect = this.checkConnect(target);
                        if (isConnect) {
                            this.isConnected = true;
                            tempArgs = this.commandHandler.connect(this.endPoint, args, this.canCancel);
                        }
                    }
                }
                else if (this.endPoint.indexOf('Bezier') === -1) {
                    this.isConnected = true;
                    tempArgs = this.commandHandler.disConnect(args.source, this.endPoint, this.canCancel);
                    this.commandHandler.updateSelector();
                }
            }
            if (this.commandHandler.canEnableDefaultTooltip()) {
                var content_1 = this.getTooltipContent(args.position);
                var contentTemp = function () {
                    return content_1;
                };
                this.commandHandler.showTooltip(args.source, args.position, initializeCSPTemplate(contentTemp), 'ConnectTool', this.isTooltipVisible);
                this.isTooltipVisible = false;
            }
            if (tempArgs) {
                this.tempArgs = tempArgs;
            }
        }
        this.prevPosition = this.currentPosition;
        return !this.blocked;
    };
    /**
     * @param args
     * @private
     */
    ConnectTool.prototype.mouseLeave = function (args) {
        this.mouseUp(args);
    };
    ConnectTool.prototype.getTooltipContent = function (position) {
        return 'X:' + Math.round(position.x) + ' ' + 'Y:' + Math.round(position.y);
    };
    ConnectTool.prototype.checkConnect = function (target) {
        if (canPortInConnect(target) && this.endPoint === 'ConnectorTargetEnd') {
            return true;
        }
        else if (canPortOutConnect(target) && this.endPoint === 'ConnectorSourceEnd') {
            return true;
        }
        else if (!(target.constraints & PortConstraints.None) && !canPortInConnect(target) && !canPortOutConnect(target)
            && (target.constraints === undefined || (target.constraints & (PortConstraints.Default & ~(PortConstraints.InConnect | PortConstraints.OutConnect))) > 0)) {
            return true;
        }
        return false;
    };
    /**   @private  */
    ConnectTool.prototype.endAction = function () {
        _super.prototype.endAction.call(this);
        this.prevPosition = null;
        this.endPoint = null;
    };
    return ConnectTool;
}(ToolBase));
export { ConnectTool };
/**
 * Drags the selected objects
 */
var MoveTool = /** @class */ (function (_super) {
    __extends(MoveTool, _super);
    function MoveTool(commandHandler, objType) {
        var _this = _super.call(this, commandHandler, true) || this;
        /**   @private  */
        _this.currentTarget = null;
        _this.canCancel = false;
        _this.canTrigger = false;
        _this.objectType = objType;
        return _this;
    }
    /**
     * @param args
     * @private
     */
    MoveTool.prototype.mouseDown = function (args) {
        if (args.source instanceof Node || args.source instanceof Connector) {
            var arrayNodes = this.commandHandler.getSelectedObject();
            this.commandHandler.selectObjects([args.source], args.info && args.info.ctrlKey, arrayNodes);
            var selectedObject = { nodes: [], connectors: [] };
            if (args.source instanceof Node) {
                selectedObject.nodes.push(cloneObject(args.source));
            }
            else {
                selectedObject.connectors.push(cloneObject(args.source));
            }
            this.undoElement = cloneObject(selectedObject);
        }
        else {
            this.undoElement = cloneObject(args.source);
        }
        this.undoParentElement = this.commandHandler.getSubProcess(args.source);
        if (this.objectType === 'Port') {
            this.portId = args.sourceWrapper.id;
        }
        this.commandHandler.insertBlazorConnector(args.source);
        var oldValues;
        if (isBlazor()) {
            this.commandHandler.insertSelectedObjects();
            this.startPosition = this.currentPosition = this.prevPosition = args.position;
            this.initialOffset = { x: 0, y: 0 };
            if (args.source) {
                oldValues = { offsetX: args.source.wrapper.offsetX, offsetY: args.source.wrapper.offsetY };
            }
            var arg = {
                source: cloneObject(args.source), state: 'Start', oldValue: oldValues, newValue: {},
                target: cloneObject(args.target), targetPosition: args.position, allowDrop: true, cancel: false
            };
            this.tempArgs = arg;
        }
        _super.prototype.mouseDown.call(this, args);
        this.initialOffset = { x: 0, y: 0 };
    };
    /* tslint:disable */
    /**
     * @param args
     * @param isPreventHistory
     * @param args
     * @param isPreventHistory
     * @private
     */
    MoveTool.prototype.mouseUp = function (args, isPreventHistory) {
        return __awaiter(this, void 0, void 0, function () {
            var oldValues, newValues, arg, blazorArgs, diagram, blazorInterop, blazor, eventObj, tx, ty, obj, historyAdded, object, redoObject, wrapper, arg, canAddHistory, entry, entry_1, snappedPoint, arg, nodes, isEndGroup, temp, i, i, entry;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(isBlazor() && this.objectType !== 'Port')) return [3 /*break*/, 3];
                        this.commandHandler.updatePropertiesToBlazor(args, false);
                        if (args.source) {
                            newValues = { offsetX: args.source.wrapper.offsetX, offsetY: args.source.wrapper.offsetY };
                            oldValues = { offsetX: args.source.wrapper.offsetX, offsetY: args.source.wrapper.offsetY };
                        }
                        arg = {
                            state: 'Completed',
                            oldValue: cloneBlazorObject(this.tempArgs.oldValue), newValue: cloneBlazorObject(newValues),
                            target: cloneBlazorObject(this.currentTarget), targetPosition: cloneBlazorObject(this.currentPosition),
                            allowDrop: true, cancel: false
                        };
                        blazorArgs = void 0;
                        diagram = 'diagram';
                        blazorInterop = 'sfBlazor';
                        blazor = 'Blazor';
                        if (!(window && window["" + blazor] && this.commandHandler["" + diagram].positionChange)) return [3 /*break*/, 2];
                        eventObj = { 'EventName': 'positionChange', args: JSON.stringify(arg) };
                        return [4 /*yield*/, window["" + blazorInterop].updateBlazorDiagramEvents(eventObj, this.commandHandler["" + diagram])];
                    case 1:
                        blazorArgs = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (blazorArgs && blazorArgs.cancel) {
                            this.commandHandler.enableCloneObject(true);
                            this.commandHandler.ismouseEvents(true);
                            this.canCancel = true;
                        }
                        if (this.canCancel) {
                            this.commandHandler.insertBlazorObject(args.source);
                            tx = this.tempArgs.oldValue.offsetX - args.source.wrapper.offsetX;
                            ty = this.tempArgs.oldValue.offsetY - args.source.wrapper.offsetY;
                            this.commandHandler.dragSelectedObjects(tx, ty);
                        }
                        _a.label = 3;
                    case 3:
                        this.checkPropertyValue();
                        historyAdded = false;
                        redoObject = { nodes: [], connectors: [] };
                        if (!(this.objectType !== 'Port')) return [3 /*break*/, 8];
                        if (args.source instanceof Node || args.source instanceof Connector) {
                            if (args.source instanceof Node) {
                                redoObject.nodes.push(cloneObject(args.source));
                            }
                            else {
                                redoObject.connectors.push(cloneObject(args.source));
                            }
                            obj = cloneObject(redoObject);
                            wrapper = args.source.wrapper;
                            obj.offsetX = wrapper.offsetX;
                            obj.offsetY = wrapper.offsetY;
                        }
                        else {
                            obj = cloneObject(args.source);
                        }
                        object = this.commandHandler.renderContainerHelper(args.source) || args.source || this.commandHandler.renderContainerHelper(args.source);
                        if ((object.id === 'helper') || (object.id !== 'helper')) {
                            //EJ2-71257 - Position change event completed state is not fired on selecting the node first and then dragging the node while changing node width at progress state.
                            // If object is instanceof selector then checked the length of selected objects is 1 or not. 
                            if ((((object instanceof Selector && ((Math.round(object.width) === Math.round(this.undoElement.width) && Math.round(object.height) === Math.round(this.undoElement.height)) || (object.selectedObjects && object.selectedObjects.length === 1))) || !(object instanceof Selector)) && (object.offsetX !== this.undoElement.offsetX || object.offsetY !== this.undoElement.offsetY ||
                                object.sourcePoint !== this.undoElement.sourcePoint
                                // eslint-disable-next-line max-len
                                || object.targetPoint !== this.undoElement.targetPoint)) || this.isSelectionHasConnector(object)) {
                                if (args.source) {
                                    newValues = { offsetX: args.source.wrapper.offsetX, offsetY: args.source.wrapper.offsetY };
                                    oldValues = { offsetX: args.source.wrapper.offsetX, offsetY: args.source.wrapper.offsetY };
                                }
                                arg = {
                                    source: args.source, state: 'Completed', oldValue: oldValues, newValue: newValues,
                                    target: this.currentTarget, targetPosition: this.currentPosition, allowDrop: true, cancel: false
                                };
                                arg = {
                                    source: cloneBlazorObject(args.source), state: 'Completed',
                                    oldValue: cloneBlazorObject(oldValues), newValue: cloneBlazorObject(newValues),
                                    target: cloneBlazorObject(this.currentTarget), targetPosition: cloneBlazorObject(this.currentPosition),
                                    allowDrop: arg.allowDrop, cancel: arg.cancel
                                };
                                if (isBlazor()) {
                                    arg = this.getBlazorPositionChangeEventArgs(arg, this.currentTarget);
                                }
                                canAddHistory = true;
                                //EJ2-69852): Position Change event trigger for clicking second time in swimlane header issue
                                if (!isBlazor()) {
                                    if (object.id === 'helper') {
                                        if (this.canTrigger) {
                                            this.commandHandler.triggerEvent(DiagramEvent.positionChange, arg);
                                            this.connectorEndPointChangeEvent(arg);
                                            canAddHistory = true;
                                        }
                                        else {
                                            canAddHistory = false;
                                        }
                                    }
                                    else {
                                        this.commandHandler.triggerEvent(DiagramEvent.positionChange, arg);
                                        this.connectorEndPointChangeEvent(arg);
                                    }
                                }
                                if (!isPreventHistory && canAddHistory) {
                                    this.commandHandler.startGroupAction();
                                    historyAdded = true;
                                    entry = {
                                        type: 'PositionChanged',
                                        redoObject: cloneObject(obj), undoObject: cloneObject(this.undoElement), category: 'Internal'
                                    };
                                    if (obj.nodes[0] && obj.nodes[0].processId) {
                                        entry_1 = {
                                            type: 'SizeChanged', category: 'Internal',
                                            undoObject: this.undoParentElement, redoObject: this.commandHandler.getSubProcess(args.source)
                                        };
                                        this.commandHandler.addHistoryEntry(entry_1);
                                    }
                                    this.commandHandler.addHistoryEntry(entry);
                                }
                            }
                        }
                        snappedPoint = this.commandHandler.snapPoint(this.prevPosition, this.currentPosition, 0, 0);
                        this.commandHandler.removeSnap();
                        this.commandHandler.removeHighlighter();
                        if (!(args.source && this.currentTarget && canAllowDrop(this.currentTarget) &&
                            this.commandHandler.isDroppable(args.source, this.currentTarget))) return [3 /*break*/, 7];
                        this.commandHandler.drop(this.currentElement, this.currentTarget, this.currentPosition);
                        if (this.currentTarget && this.currentTarget instanceof Connector) {
                            if (this.commandHandler.diagram.enableConnectorSplit === true) {
                                if (this.currentElement) {
                                    if (this.currentElement && this.currentElement instanceof Node) {
                                        this.commandHandler.connectorSplit(this.currentElement, this.currentTarget);
                                    }
                                    else if (this.currentElement instanceof Selector && !(this.commandHandler.PreventConnectorSplit)) {
                                        if (this.currentElement.nodes.length > 0) {
                                            this.commandHandler.connectorSplit(this.currentElement.nodes[0], this.currentTarget);
                                            this.commandHandler.PreventConnectorSplit = false;
                                        }
                                    }
                                }
                            }
                        }
                        arg = {
                            element: args.source, target: this.currentTarget, position: this.currentPosition, cancel: false
                        };
                        if (!isBlazor()) return [3 /*break*/, 5];
                        arg = getDropEventArguements(args, arg);
                        return [4 /*yield*/, this.commandHandler.triggerEvent(DiagramEvent.drop, arg)];
                    case 4:
                        arg = (_a.sent()) || arg;
                        return [3 /*break*/, 6];
                    case 5:
                        this.commandHandler.triggerEvent(DiagramEvent.drop, arg);
                        _a.label = 6;
                    case 6:
                        if (!arg.cancel && args.source && this.commandHandler.isParentAsContainer(this.currentTarget)) {
                            nodes = (args.source instanceof Selector) ? args.source.nodes : [args.source];
                            isEndGroup = false;
                            temp = void 0;
                            for (i = 0; i < nodes.length; i++) {
                                if (nodes[0].parentId === nodes[parseInt(i.toString(), 10)].parentId) {
                                    temp = true;
                                }
                                else {
                                    temp = false;
                                    break;
                                }
                            }
                            for (i = 0; i < nodes.length; i++) {
                                if (!nodes[parseInt(i.toString(), 10)].container && temp) {
                                    isEndGroup = true;
                                    this.commandHandler.updateLaneChildrenZindex(nodes[parseInt(i.toString(), 10)], this.currentTarget);
                                    this.commandHandler.dropChildToContainer(this.currentTarget, nodes[parseInt(i.toString(), 10)]);
                                    this.commandHandler.renderContainerHelper(nodes[parseInt(i.toString(), 10)]);
                                }
                            }
                            if (historyAdded && this.commandHandler.isContainer && isEndGroup) {
                                this.commandHandler.endGroupAction();
                            }
                        }
                        _a.label = 7;
                    case 7:
                        if (args.source && this.currentTarget) {
                            this.commandHandler.dropAnnotation(args.source, this.currentTarget);
                        }
                        this.commandHandler.updateSelector();
                        if (historyAdded && !this.commandHandler.isContainer) {
                            this.commandHandler.endGroupAction();
                        }
                        return [3 /*break*/, 9];
                    case 8:
                        redoObject.nodes.push(cloneObject(args.source));
                        args.portId = this.portId;
                        obj = cloneObject(redoObject);
                        entry = {
                            type: 'PortPositionChanged', objectId: this.portId,
                            redoObject: cloneObject(obj), undoObject: cloneObject(this.undoElement), category: 'Internal'
                        };
                        this.commandHandler.addHistoryEntry(entry);
                        _a.label = 9;
                    case 9:
                        this.commandHandler.updateBlazorSelector();
                        _super.prototype.mouseUp.call(this, args);
                        return [2 /*return*/];
                }
            });
        });
    };
    //EJ2-59309-While drag the connected node the connector endPointChange event does not get trigger
    MoveTool.prototype.connectorEndPointChangeEvent = function (arg, snappedPoint) {
        var selectedElement = arg.source;
        if (selectedElement instanceof Selector && selectedElement.nodes.length > 0) {
            for (var i = 0; i < selectedElement.nodes.length; i++) {
                var node = selectedElement.nodes[parseInt(i.toString(), 10)];
                if (node && node.inEdges.length > 0) {
                    for (var j = 0; j < node.inEdges.length; j++) {
                        var connector = this.commandHandler.diagram.getObject(node.inEdges[parseInt(j.toString(), 10)]);
                        this.triggerEndPointEvent(connector, arg, snappedPoint, 'targetPointChange');
                    }
                }
                if (node && node.outEdges.length > 0) {
                    for (var j = 0; j < node.outEdges.length; j++) {
                        var connector = this.commandHandler.diagram.getObject(node.outEdges[parseInt(j.toString(), 10)]);
                        this.triggerEndPointEvent(connector, arg, snappedPoint, 'sourcePointChange');
                    }
                }
            }
        }
    };
    MoveTool.prototype.triggerEndPointEvent = function (connector, arg, snappedPoint, eventName) {
        var args = {
            connector: connector, state: arg.state, targetNode: connector.targetID, targetPort: connector.targetPortID,
            sourceNode: connector.sourceID, sourcePort: connector.sourcePortID, oldValue: { x: connector.targetPoint.x, y: connector.targetPoint.y },
            newValue: { x: connector.targetPoint.x + (snappedPoint ? snappedPoint.x : 0), y: connector.targetPoint.y + (snappedPoint ? snappedPoint.y : 0) }, cancel: arg.cancel
        };
        this.commandHandler.triggerEvent((eventName === 'targetPointChange') ? DiagramEvent.targetPointChange : DiagramEvent.sourcePointChange, args);
    };
    MoveTool.prototype.isSelectionHasConnector = function (args) {
        if (args.nodes && args.connectors && args.nodes.length > 0 && args.connectors.length > 0 &&
            (args.width !== this.undoElement.width || args.height !== this.undoElement.height)) {
            return true;
        }
        return false;
    };
    MoveTool.prototype.getBlazorPositionChangeEventArgs = function (args, target) {
        args = {
            source: cloneBlazorObject(args.source), state: args.state, oldValue: args.oldValue, newValue: args.newValue,
            target: getObjectType(target) === Connector ? { connector: cloneBlazorObject(target) }
                : { node: cloneBlazorObject(target) },
            targetPosition: this.currentPosition, allowDrop: true, cancel: false
        };
        return args;
    };
    /* tslint:disable */
    /**
     * @param args
     * @private
     */
    MoveTool.prototype.mouseMove = function (args) {
        _super.prototype.mouseMove.call(this, args);
        var isSame = false;
        var object;
        object = this.commandHandler.renderContainerHelper(args.source) ||
            args.source;
        if (object instanceof Node || object instanceof Connector) {
            if (object instanceof Node) {
                if (object.offsetX === this.undoElement.nodes[0].offsetX &&
                    object.offsetY === this.undoElement.nodes[0].offsetY) {
                    isSame = true;
                }
            }
            else {
                if (Point.equals(object.sourcePoint, this.undoElement.connectors[0].sourcePoint) &&
                    Point.equals(object.targetPoint, this.undoElement.connectors[0].targetPoint)) {
                    isSame = true;
                }
            }
        }
        else {
            if (object.wrapper.offsetX === this.undoElement.wrapper.offsetX &&
                object.wrapper.offsetY === this.undoElement.wrapper.offsetY) {
                isSame = true;
            }
        }
        var oldValues;
        if (object) {
            oldValues = { offsetX: object.wrapper.offsetX, offsetY: object.wrapper.offsetY };
        }
        var arg = {
            source: object, state: 'Start', oldValue: oldValues, newValue: oldValues,
            target: args.target, targetPosition: args.position, allowDrop: true, cancel: false
        };
        arg = {
            source: cloneBlazorObject(object), state: 'Start', oldValue: cloneBlazorObject(oldValues),
            newValue: cloneBlazorObject(oldValues),
            target: args.target, targetPosition: args.position, allowDrop: arg.allowDrop, cancel: arg.cancel
        };
        if (isSame && !isBlazor()) {
            this.commandHandler.triggerEvent(DiagramEvent.positionChange, arg);
            this.connectorEndPointChangeEvent(arg);
        }
        this.currentPosition = args.position;
        if (this.objectType !== 'Port') {
            var x = this.currentPosition.x - this.prevPosition.x;
            var y = this.currentPosition.y - this.prevPosition.y;
            var diffX = this.initialOffset.x + (this.currentPosition.x - this.prevPosition.x);
            var diffY = this.initialOffset.y + (this.currentPosition.y - this.prevPosition.y);
            this.commandHandler.dragOverElement(args, this.currentPosition);
            this.commandHandler.disConnect(args.source);
            this.commandHandler.removeSnap();
            var oldValues_1;
            var newValues = void 0;
            var snappedPoint = this.commandHandler.snapPoint(this.prevPosition, this.currentPosition, diffX, diffY);
            this.initialOffset.x = diffX - snappedPoint.x;
            this.initialOffset.y = diffY - snappedPoint.y;
            if (object) {
                oldValues_1 = { offsetX: object.wrapper.offsetX, offsetY: object.wrapper.offsetY };
                newValues = {
                    offsetX: object.wrapper.offsetX + snappedPoint.x,
                    offsetY: object.wrapper.offsetY + snappedPoint.y
                };
            }
            if (this.currentTarget && args.target !== this.currentTarget) {
                this.commandHandler.removeChildFromBPmn(args.source, args.target, this.currentTarget);
            }
            this.currentTarget = args.target;
            var arg_1 = {
                source: object, state: 'Progress', oldValue: oldValues_1, newValue: newValues,
                target: args.target, targetPosition: args.position, allowDrop: true, cancel: false
            };
            if (isBlazor()) {
                arg_1 = this.getBlazorPositionChangeEventArgs(arg_1, args.target);
            }
            if (!isBlazor()) {
                this.commandHandler.triggerEvent(DiagramEvent.positionChange, arg_1);
                this.canTrigger = true;
                this.connectorEndPointChangeEvent(arg_1, snappedPoint);
            }
            if (!arg_1.cancel && !this.canCancel) {
                this.blocked = !this.commandHandler.dragSelectedObjects(snappedPoint.x, snappedPoint.y);
                var blocked = !(this.commandHandler.mouseOver(this.currentElement, this.currentTarget, this.currentPosition));
                this.blocked = this.blocked || blocked;
            }
            this.commandHandler.removeStackHighlighter();
            this.commandHandler.renderStackHighlighter(args);
            if (this.currentTarget && (args.source !== this.currentTarget) &&
                this.commandHandler.isDroppable(args.source, this.currentTarget) && args.source.id !== 'helper') {
                var object_1 = (args.source instanceof Selector) ? args.source.nodes[0] : args.source;
                if ((!this.commandHandler.isParentAsContainer(object_1, true))
                    && (object_1.shape.type !== 'SwimLane' && !object_1.shape.isPhase)) {
                    if (this.currentTarget.isLane) {
                        this.commandHandler.renderStackHighlighter(args, this.currentTarget);
                    }
                    else {
                        this.commandHandler.drawHighlighter(this.currentTarget);
                    }
                }
            }
            else {
                this.commandHandler.removeHighlighter();
            }
            if (this.commandHandler.canEnableDefaultTooltip()) {
                var content_2 = this.getTooltipContent(args.source);
                var contentTemp = function () {
                    return content_2;
                };
                this.commandHandler.showTooltip(args.source, args.position, initializeCSPTemplate(contentTemp), 'MoveTool', this.isTooltipVisible);
                this.isTooltipVisible = false;
            }
        }
        else {
            var matrix = identityMatrix();
            var node = args.source;
            rotateMatrix(matrix, -node.rotateAngle, node.offsetX, node.offsetY);
            var prevPosition = transformPointByMatrix(matrix, { x: this.prevPosition.x, y: this.prevPosition.y });
            var position = transformPointByMatrix(matrix, { x: args.position.x, y: args.position.y });
            this.commandHandler.portDrag(args.source, args.sourceWrapper, position.x - prevPosition.x, position.y - prevPosition.y);
        }
        this.prevPosition = this.currentPosition;
        return !this.blocked;
    };
    MoveTool.prototype.getTooltipContent = function (node) {
        return 'X:' + Math.round(node.wrapper.bounds.x) + ' ' + 'Y:' + Math.round(node.wrapper.bounds.y);
    };
    /**
     * @param args
     * @private
     */
    MoveTool.prototype.mouseLeave = function (args) {
        this.mouseUp(args);
    };
    /**   @private  */
    MoveTool.prototype.endAction = function () {
        _super.prototype.endAction.call(this);
        this.currentTarget = null;
        this.prevPosition = null;
    };
    return MoveTool;
}(ToolBase));
export { MoveTool };
/**
 * Rotates the selected objects
 */
var RotateTool = /** @class */ (function (_super) {
    __extends(RotateTool, _super);
    function RotateTool(commandHandler) {
        var _this = _super.call(this, commandHandler, true) || this;
        /** @private */
        _this.rotateStart = false;
        return _this;
    }
    /**
     * @param args
     * @private
     */
    RotateTool.prototype.mouseDown = function (args) {
        if (isBlazor()) {
            var object = void 0;
            object = this.commandHandler.renderContainerHelper(args.source) || args.source;
            var oldValue = { rotateAngle: object.wrapper.rotateAngle };
            var arg = {
                source: cloneBlazorObject(args.source), state: 'Start', oldValue: oldValue, newValue: undefined, cancel: false
            };
            var temparg = arg;
            this.tempArgs = temparg;
            if (this.tempArgs && this.tempArgs.cancel) {
                this.canCancel = true;
            }
        }
        this.undoElement = cloneObject(args.source);
        if (this.undoElement.nodes[0] && this.undoElement.nodes[0].children) {
            var objects = [];
            var nodes = this.commandHandler.getAllDescendants(this.undoElement.nodes[0], objects);
            for (var i = 0; i < nodes.length; i++) {
                var node = this.commandHandler.cloneChild(nodes[parseInt(i.toString(), 10)].id);
                this.childTable[nodes[parseInt(i.toString(), 10)].id] = cloneObject(node);
            }
        }
        _super.prototype.mouseDown.call(this, args);
    };
    /**
     * @param args
     * @private
     */
    RotateTool.prototype.mouseUp = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var diagram, blazorInterop, blazor, object_2, oldValue, newValue, arg, blazorArgs, eventObj, object, oldValue, arg, obj, entry;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.checkPropertyValue();
                        if (!isBlazor()) return [3 /*break*/, 3];
                        diagram = 'diagram';
                        blazorInterop = 'sfBlazor';
                        blazor = 'Blazor';
                        this.commandHandler.updatePropertiesToBlazor(args, false);
                        object_2 = this.commandHandler.renderContainerHelper(args.source) || args.source;
                        oldValue = { rotateAngle: this.tempArgs.oldValue.rotateAngle };
                        newValue = { rotateAngle: object_2.wrapper.rotateAngle };
                        arg = {
                            state: 'Completed', oldValue: oldValue, newValue: newValue, cancel: false
                        };
                        blazorArgs = void 0;
                        if (!(window && window["" + blazor] && this.commandHandler["" + diagram].rotateChange)) return [3 /*break*/, 2];
                        eventObj = { 'EventName': 'rotateChange', args: JSON.stringify(arg) };
                        return [4 /*yield*/, window["" + blazorInterop].updateBlazorDiagramEvents(eventObj, this.commandHandler["" + diagram])];
                    case 1:
                        blazorArgs = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (blazorArgs && blazorArgs.cancel) {
                            this.commandHandler.enableCloneObject(true);
                            this.commandHandler.ismouseEvents(true);
                            this.canCancel = true;
                        }
                        if (this.canCancel) {
                            this.commandHandler.insertBlazorObject(args.source);
                            this.commandHandler.rotatePropertyChnage(this.tempArgs.oldValue.rotateAngle);
                        }
                        _a.label = 3;
                    case 3:
                        object = this.commandHandler.renderContainerHelper(args.source) || args.source;
                        if (this.undoElement.rotateAngle !== object.wrapper.rotateAngle) {
                            oldValue = { rotateAngle: object.wrapper.rotateAngle };
                            arg = {
                                source: args.source, state: 'Completed', oldValue: oldValue,
                                newValue: oldValue, cancel: false
                            };
                            if (!isBlazor()) {
                                this.commandHandler.triggerEvent(DiagramEvent.rotateChange, arg);
                            }
                            obj = void 0;
                            obj = cloneObject(args.source);
                            entry = {
                                type: 'RotationChanged', redoObject: cloneObject(obj), undoObject: cloneObject(this.undoElement), category: 'Internal',
                                childTable: this.childTable
                            };
                            this.commandHandler.addHistoryEntry(entry);
                            this.commandHandler.updateSelector();
                            this.rotateStart = false;
                        }
                        this.commandHandler.updateBlazorSelector();
                        this.canCancel = undefined;
                        this.tempArgs = undefined;
                        _super.prototype.mouseUp.call(this, args);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param args
     * @private
     */
    RotateTool.prototype.mouseMove = function (args) {
        _super.prototype.mouseMove.call(this, args);
        var object;
        object = this.commandHandler.renderContainerHelper(args.source) || args.source;
        //EJ2-837158-Resize - Event "Start" state triggers multiple times in rotate action
        if (this.undoElement.rotateAngle === object.wrapper.rotateAngle && !this.rotateStart) {
            var oldValue_1 = { rotateAngle: object.wrapper.rotateAngle };
            var arg_2 = {
                source: args.source, state: 'Start', oldValue: oldValue_1, newValue: oldValue_1, cancel: false
            };
            if (!isBlazor()) {
                this.commandHandler.triggerEvent(DiagramEvent.rotateChange, arg_2);
            }
            this.rotateStart = true;
        }
        this.currentPosition = args.position;
        var refPoint = { x: object.wrapper.offsetX, y: object.wrapper.offsetY };
        var angle = Point.findAngle(refPoint, this.currentPosition) + 90;
        var snapAngle = this.commandHandler.snapAngle(angle);
        angle = snapAngle !== 0 ? snapAngle : angle;
        angle = (angle + 360) % 360;
        var oldValue = { rotateAngle: object.wrapper.rotateAngle };
        var newValue = { rotateAngle: angle };
        var arg = {
            source: args.source, state: 'Progress', oldValue: oldValue,
            newValue: newValue, cancel: false
        };
        var arg1 = {
            source: cloneBlazorObject(args.source), state: 'Progress', oldValue: cloneBlazorObject(oldValue),
            newValue: cloneBlazorObject(newValue), cancel: arg.cancel
        };
        if (!isBlazor()) {
            this.commandHandler.triggerEvent(DiagramEvent.rotateChange, arg1);
        }
        if ((!isBlazor() && !arg1.cancel) || (isBlazor() && !this.canCancel)) {
            this.blocked = !(this.commandHandler.rotateSelectedItems(angle - object.wrapper.rotateAngle));
        }
        if (this.commandHandler.canEnableDefaultTooltip()) {
            var content_3 = this.getTooltipContent(args.source);
            var contentTemp = function () {
                return content_3;
            };
            this.commandHandler.showTooltip(args.source, args.position, initializeCSPTemplate(contentTemp), 'RotateTool', this.isTooltipVisible);
            this.isTooltipVisible = false;
        }
        return !this.blocked;
    };
    RotateTool.prototype.getTooltipContent = function (node) {
        return Math.round((node.rotateAngle % 360)).toString() + '\xB0';
    };
    /**
     * @param args
     * @private
     */
    RotateTool.prototype.mouseLeave = function (args) {
        this.mouseUp(args);
    };
    /**   @private  */
    RotateTool.prototype.endAction = function () {
        _super.prototype.endAction.call(this);
    };
    return RotateTool;
}(ToolBase));
export { RotateTool };
/**
 * Scales the selected objects
 */
var ResizeTool = /** @class */ (function (_super) {
    __extends(ResizeTool, _super);
    function ResizeTool(commandHandler, corner) {
        var _this = _super.call(this, commandHandler, true) || this;
        /** @private */
        _this.resizeStart = false;
        /**   @private  */
        _this.initialBounds = new Rect();
        _this.canCancel = false;
        _this.corner = corner;
        return _this;
    }
    /**
     * @param args
     * @private
     */
    ResizeTool.prototype.mouseDown = function (args) {
        var oldValues;
        if (isBlazor()) {
            this.commandHandler.insertSelectedObjects();
            this.startPosition = this.currentPosition = this.prevPosition = args.position;
            this.currentElement = args.source;
            this.initialBounds.x = args.source.wrapper.offsetX;
            this.initialBounds.y = args.source.wrapper.offsetY;
            this.initialBounds.height = args.source.wrapper.actualSize.height;
            this.initialBounds.width = args.source.wrapper.actualSize.width;
            if (args.source) {
                oldValues = {
                    offsetX: args.source.wrapper.offsetX, offsetY: args.source.wrapper.offsetY,
                    width: args.source.wrapper.actualSize.width, height: args.source.wrapper.actualSize.height
                };
            }
            var arg = {
                source: cloneBlazorObject(args.source), state: 'Start', oldValue: oldValues, newValue: cloneBlazorObject(this.currentElement), cancel: false
            };
            this.tempArgs = arg;
        }
        this.undoElement = cloneObject(args.source);
        this.undoParentElement = this.commandHandler.getSubProcess(args.source);
        _super.prototype.mouseDown.call(this, args);
        if (this.undoElement.nodes[0] && this.undoElement.nodes[0].children) {
            var elements = [];
            var nodes = this.commandHandler.getAllDescendants(this.undoElement.nodes[0], elements);
            for (var i = 0; i < nodes.length; i++) {
                var node = this.commandHandler.cloneChild(nodes[parseInt(i.toString(), 10)].id);
                this.childTable[nodes[parseInt(i.toString(), 10)].id] = cloneObject(node);
            }
        }
        this.commandHandler.checkSelection(args.source, this.corner);
        _super.prototype.mouseDown.call(this, args);
        this.initialBounds.x = args.source.wrapper.offsetX;
        this.initialBounds.y = args.source.wrapper.offsetY;
        this.initialBounds.height = args.source.wrapper.actualSize.height;
        this.initialBounds.width = args.source.wrapper.actualSize.width;
    };
    /**
     * @param args
     * @param isPreventHistory
     * @param args
     * @param isPreventHistory
     * @private
     */
    ResizeTool.prototype.mouseUp = function (args, isPreventHistory) {
        return __awaiter(this, void 0, void 0, function () {
            var diagram, blazorInterop, blazor, obj, oldValues, arg, blazorArgs, eventObj, scaleWidth, scaleHeight, object, deltaValues, oldValue, arg, obj, entry, entry_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!isBlazor()) return [3 /*break*/, 4];
                        diagram = 'diagram';
                        blazorInterop = 'sfBlazor';
                        blazor = 'Blazor';
                        this.commandHandler.updatePropertiesToBlazor(args, false);
                        obj = cloneObject(args.source);
                        oldValues = {
                            width: args.source.wrapper.actualSize.width, height: args.source.wrapper.actualSize.height,
                            offsetX: args.source.wrapper.offsetX, offsetY: args.source.wrapper.offsetY
                        };
                        arg = {
                            oldValue: this.tempArgs.oldValue, newValue: oldValues, cancel: false,
                            state: 'Completed'
                        };
                        if (!!this.canCancel) return [3 /*break*/, 3];
                        blazorArgs = void 0;
                        if (!(window && window["" + blazor] && this.commandHandler["" + diagram].sizeChange)) return [3 /*break*/, 2];
                        eventObj = { 'EventName': 'sizeChange', args: JSON.stringify(arg) };
                        return [4 /*yield*/, window["" + blazorInterop].updateBlazorDiagramEvents(eventObj, this.commandHandler["" + diagram])];
                    case 1:
                        blazorArgs = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (blazorArgs && blazorArgs.cancel) {
                            this.commandHandler.enableCloneObject(true);
                            this.commandHandler.ismouseEvents(true);
                            this.commandHandler.insertBlazorObject(args.source);
                            scaleWidth = this.tempArgs.oldValue.width / obj.wrapper.actualSize.width;
                            scaleHeight = this.tempArgs.oldValue.height / obj.wrapper.actualSize.height;
                            this.commandHandler.scaleSelectedItems(scaleWidth, scaleHeight, this.getPivot(this.corner));
                        }
                        _a.label = 3;
                    case 3:
                        this.tempArgs = undefined;
                        this.canCancel = undefined;
                        _a.label = 4;
                    case 4:
                        this.checkPropertyValue();
                        this.commandHandler.removeSnap();
                        this.commandHandler.updateSelector();
                        object = this.commandHandler.renderContainerHelper(args.source) || args.source;
                        if ((this.undoElement.offsetX !== object.wrapper.offsetX || this.undoElement.offsetY !== object.wrapper.offsetY ||
                            this.undoElement.width !== object.wrapper.bounds.width || this.undoElement.height !== object.wrapper.bounds.height)) {
                            if (!isBlazor()) {
                                deltaValues = this.updateSize(args.source, this.currentPosition, this.prevPosition, this.corner, this.initialBounds);
                                this.blocked = this.scaleObjects(deltaValues.width, deltaValues.height, this.corner, this.currentPosition, this.prevPosition, object);
                                oldValue = {
                                    offsetX: args.source.wrapper.offsetX, offsetY: args.source.wrapper.offsetY,
                                    width: args.source.wrapper.actualSize.width, height: args.source.wrapper.actualSize.height
                                };
                                arg = {
                                    source: cloneBlazorObject(args.source), state: 'Completed',
                                    oldValue: oldValue, newValue: oldValue, cancel: false
                                };
                                this.commandHandler.triggerEvent(DiagramEvent.sizeChange, arg);
                            }
                            obj = cloneObject(args.source);
                            entry = {
                                type: 'SizeChanged', redoObject: cloneObject(obj), undoObject: cloneObject(this.undoElement), category: 'Internal',
                                childTable: this.childTable
                            };
                            this.resizeStart = false;
                            if (!isPreventHistory) {
                                this.commandHandler.startGroupAction();
                                this.commandHandler.addHistoryEntry(entry);
                                if (obj.nodes[0] && obj.nodes[0].processId) {
                                    entry_2 = {
                                        type: 'SizeChanged', redoObject: this.commandHandler.getSubProcess(args.source),
                                        undoObject: this.undoParentElement, category: 'Internal'
                                    };
                                    this.commandHandler.addHistoryEntry(entry_2);
                                }
                                this.commandHandler.endGroupAction();
                            }
                        }
                        this.commandHandler.updateBlazorSelector();
                        _super.prototype.mouseUp.call(this, args);
                        return [2 /*return*/, !this.blocked];
                }
            });
        });
    };
    /**
     * @param args
     * @private
     */
    ResizeTool.prototype.mouseMove = function (args) {
        _super.prototype.mouseMove.call(this, args);
        var object;
        object = this.commandHandler.renderContainerHelper(args.source) || args.source;
        //EJ2-837158-Resize - Event "Start" state triggers multiple times in resize
        if (this.undoElement.offsetX === object.wrapper.offsetX && this.undoElement.offsetY === object.wrapper.offsetY && !this.resizeStart) {
            var oldValue = {
                offsetX: args.source.wrapper.offsetX, offsetY: args.source.wrapper.offsetY,
                width: args.source.wrapper.actualSize.width, height: args.source.wrapper.actualSize.height
            };
            var arg = {
                source: args.source, state: 'Start', oldValue: oldValue, newValue: this.currentElement, cancel: false
            };
            if (!isBlazor()) {
                this.commandHandler.triggerEvent(DiagramEvent.sizeChange, arg);
            }
            this.resizeStart = true;
        }
        this.currentPosition = args.position;
        var x = this.currentPosition.x - this.startPosition.x;
        var y = this.currentPosition.y - this.startPosition.y;
        var changes = { x: x, y: y };
        changes = rotatePoint(-this.currentElement.wrapper.rotateAngle, undefined, undefined, changes);
        var sx = (this.currentElement.wrapper.actualSize.width + changes.x) / this.currentElement.wrapper.actualSize.width;
        var sy = (this.currentElement.wrapper.actualSize.height + changes.y) / this.currentElement.wrapper.actualSize.height;
        changes = this.getChanges(changes);
        this.commandHandler.removeSnap();
        var deltaValues = this.updateSize(args.source, this.startPosition, this.currentPosition, this.corner, this.initialBounds);
        this.blocked = !(this.scaleObjects(deltaValues.width, deltaValues.height, this.corner, this.startPosition, this.currentPosition, object));
        if (this.commandHandler.canEnableDefaultTooltip()) {
            var content_4 = this.getTooltipContent(args.source);
            //Task 834121: Content-Security-Policy support for diagram
            var contentTemp = function () {
                return content_4;
            };
            this.commandHandler.showTooltip(args.source, args.position, initializeCSPTemplate(contentTemp), 'ResizeTool', this.isTooltipVisible);
            this.isTooltipVisible = false;
        }
        this.prevPosition = this.currentPosition;
        return !this.blocked;
    };
    /**
     * @param args
     * @private
     */
    ResizeTool.prototype.mouseLeave = function (args) {
        this.mouseUp(args);
    };
    ResizeTool.prototype.getTooltipContent = function (node) {
        return 'W:' + Math.round(node.wrapper.bounds.width) + ' ' + 'H:' + Math.round(node.wrapper.bounds.height);
    };
    ResizeTool.prototype.getChanges = function (change) {
        switch (this.corner) {
            case 'ResizeEast':
                return { x: change.x, y: 0 };
            case 'ResizeSouthEast':
                return change;
            case 'ResizeSouth':
                return { x: 0, y: change.y };
            case 'ResizeNorth':
                return { x: 0, y: -change.y };
            case 'ResizeNorthEast':
                return { x: change.x, y: -change.y };
            case 'ResizeNorthWest':
                return { x: -change.x, y: -change.y };
            case 'ResizeWest':
                return { x: -change.x, y: 0 };
            case 'ResizeSouthWest':
                return { x: -change.x, y: change.y };
        }
        return change;
    };
    /**
     * Updates the size with delta width and delta height using scaling.
     */
    /**
     * Aspect ratio used to resize the width or height based on resizing the height or width
     *
     * @param deltaWidth
     * @param deltaHeight
     * @param corner
     * @param startPoint
     * @param endPoint
     * @param source
     * @param deltaWidth
     * @param deltaHeight
     * @param corner
     * @param startPoint
     * @param endPoint
     * @param source
     * @param deltaWidth
     * @param deltaHeight
     * @param corner
     * @param startPoint
     * @param endPoint
     * @param source
     * @param deltaWidth
     * @param deltaHeight
     * @param corner
     * @param startPoint
     * @param endPoint
     * @param source
     * @param deltaWidth
     * @param deltaHeight
     * @param corner
     * @param startPoint
     * @param endPoint
     * @param source
     * @param deltaWidth
     * @param deltaHeight
     * @param corner
     * @param startPoint
     * @param endPoint
     * @param source
     */
    ResizeTool.prototype.scaleObjects = function (deltaWidth, deltaHeight, corner, startPoint, endPoint, source) {
        if (source instanceof Selector && source.nodes.length === 1 && source.nodes[0].constraints & NodeConstraints.AspectRatio) {
            if (corner === 'ResizeWest' || corner === 'ResizeEast' || corner === 'ResizeNorth' || corner === 'ResizeSouth') {
                if (!(deltaHeight === 1 && deltaWidth === 1)) {
                    deltaHeight = deltaWidth = Math.max(deltaHeight === 1 ? 0 : deltaHeight, deltaWidth === 1 ? 0 : deltaWidth);
                }
            }
            else if (startPoint !== endPoint) {
                deltaHeight = deltaWidth = Math.max(deltaHeight, deltaWidth);
            }
            else {
                deltaHeight = deltaWidth = 0;
            }
        }
        var oldValue = {
            offsetX: source.offsetX, offsetY: source.offsetY,
            width: source.width, height: source.height
        };
        this.blocked = this.commandHandler.scaleSelectedItems(deltaWidth, deltaHeight, this.getPivot(this.corner));
        var newValue = {
            offsetX: source.offsetX, offsetY: source.offsetY,
            width: source.width, height: source.height
        };
        var arg;
        arg = { source: source, state: 'Progress', oldValue: oldValue, newValue: newValue, cancel: false };
        var arg1;
        arg1 = {
            source: cloneBlazorObject(source), state: 'Progress',
            oldValue: cloneBlazorObject(oldValue), newValue: cloneBlazorObject(newValue), cancel: arg.cancel
        };
        if (!isBlazor()) {
            this.commandHandler.triggerEvent(DiagramEvent.sizeChange, arg1);
        }
        if (arg1.cancel || this.canCancel) {
            this.commandHandler.scaleSelectedItems(1 / deltaWidth, 1 / deltaHeight, this.getPivot(this.corner));
        }
        return this.blocked;
    };
    return ResizeTool;
}(ToolBase));
export { ResizeTool };
/**
 * Draws a node that is defined by the user
 */
var NodeDrawingTool = /** @class */ (function (_super) {
    __extends(NodeDrawingTool, _super);
    function NodeDrawingTool(commandHandler, sourceObject) {
        var _this = _super.call(this, commandHandler, true) || this;
        _this.sourceObject = sourceObject;
        return _this;
    }
    /**
     * @param args
     * @private
     */
    NodeDrawingTool.prototype.mouseDown = function (args) {
        _super.prototype.mouseDown.call(this, args);
        this.inAction = true;
        this.commandHandler.setFocus();
        this.triggerElementDrawEvent(args.source, 'Start', 'Node', this.getShapeType(), true);
    };
    /**
     * @param args
     * @private
     */
    NodeDrawingTool.prototype.mouseMove = function (args) {
        _super.prototype.mouseMove.call(this, args);
        var checkBoundaryConstraints;
        var node = {
            offsetX: this.currentPosition.x, width: 3, height: 3,
            offsetY: this.currentPosition.y
        };
        if (!this.drawingObject) {
            this.drawingObject = this.commandHandler.drawObject(node);
        }
        this.triggerElementDrawEvent(this.drawingObject, 'Progress', 'Node', this.getShapeType(), false);
        if (this.inAction && Point.equals(this.currentPosition, this.prevPosition) === false) {
            var rect = Rect.toBounds([this.prevPosition, this.currentPosition]);
            checkBoundaryConstraints = this.commandHandler.checkBoundaryConstraints(undefined, undefined, rect);
            if (checkBoundaryConstraints) {
                this.commandHandler.updateNodeDimension(this.drawingObject, rect);
            }
        }
        return checkBoundaryConstraints;
    };
    /**
     * @param args
     * @private
     */
    NodeDrawingTool.prototype.mouseUp = function (args) {
        this.checkPropertyValue();
        var checkBoundaryConstraints;
        var rect = Rect.toBounds([this.prevPosition, this.currentPosition]);
        checkBoundaryConstraints = this.commandHandler.checkBoundaryConstraints(undefined, undefined, rect);
        if (this.drawingObject && this.drawingObject instanceof Node) {
            this.commandHandler.addObjectToDiagram(this.drawingObject);
            this.triggerElementDrawEvent(this.drawingObject, 'Completed', 'Node', this.getShapeType(), false);
            this.drawingObject = null;
        }
        this.commandHandler.updateBlazorSelector();
        _super.prototype.mouseUp.call(this, args);
        this.inAction = false;
    };
    /**   @private  */
    NodeDrawingTool.prototype.endAction = function () {
        _super.prototype.endAction.call(this);
    };
    /**
     * @param args
     * @private
     */
    NodeDrawingTool.prototype.mouseLeave = function (args) {
        if (this.inAction) {
            this.mouseUp(args);
        }
    };
    return NodeDrawingTool;
}(ToolBase));
export { NodeDrawingTool };
/**
 * Draws a connector that is defined by the user
 */
var ConnectorDrawingTool = /** @class */ (function (_super) {
    __extends(ConnectorDrawingTool, _super);
    function ConnectorDrawingTool(commandHandler, endPoint, sourceObject) {
        var _this = _super.call(this, commandHandler, endPoint) || this;
        _this.sourceObject = sourceObject;
        return _this;
    }
    /**
     * @param args
     * @private
     */
    ConnectorDrawingTool.prototype.mouseDown = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                _super.prototype.mouseDown.call(this, args);
                this.inAction = true;
                this.commandHandler.setFocus();
                this.triggerElementDrawEvent(args.source, 'Start', 'Connector', this.commandHandler.diagram.drawingObject.type, true);
                return [2 /*return*/];
            });
        });
    };
    /**
     * @param args
     * @private
     */
    ConnectorDrawingTool.prototype.mouseMove = function (args) {
        this.commandHandler.enableServerDataBinding(false);
        if (this.inAction) {
            var connector = {
                sourcePoint: this.currentPosition, targetPoint: this.currentPosition
            };
            if (!this.drawingObject) {
                this.drawingObject = this.commandHandler.drawObject(connector);
            }
            args.source = this.drawingObject;
            this.triggerElementDrawEvent(args.source, 'Progress', 'Connector', this.drawingObject.type, false);
            if (((args.target && args.target instanceof Node) || (args.actualObject && args.sourceWrapper && checkPort(args.actualObject, args.sourceWrapper)))
                && (this.endPoint !== 'ConnectorTargetEnd' || (canInConnect(args.target)))) {
                this.commandHandler.connect(this.endPoint, args);
            }
            this.endPoint = 'ConnectorTargetEnd';
        }
        if (!this.inAction) {
            this.commandHandler.updateSelector();
            if (args.source && args.sourceWrapper) {
                this.commandHandler.renderHighlighter(args, true);
            }
        }
        _super.prototype.mouseMove.call(this, args);
        this.commandHandler.enableServerDataBinding(true);
        return !this.blocked;
    };
    /**
     * @param args
     * @private
     */
    ConnectorDrawingTool.prototype.mouseUp = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.commandHandler.enableServerDataBinding(false);
                this.checkPropertyValue();
                if (this.drawingObject && this.drawingObject instanceof Connector) {
                    this.commandHandler.addObjectToDiagram(this.drawingObject);
                    this.triggerElementDrawEvent(this.drawingObject, 'Completed', 'Connector', this.drawingObject.type, false);
                    this.drawingObject = null;
                }
                this.commandHandler.updateBlazorSelector();
                this.inAction = false;
                this.commandHandler.enableServerDataBinding(true);
                _super.prototype.mouseUp.call(this, args);
                return [2 /*return*/];
            });
        });
    };
    /**   @private  */
    ConnectorDrawingTool.prototype.endAction = function () {
        _super.prototype.endAction.call(this);
    };
    /**
     * @param args
     * @private
     */
    ConnectorDrawingTool.prototype.mouseLeave = function (args) {
        if (this.inAction) {
            this.mouseUp(args);
        }
    };
    return ConnectorDrawingTool;
}(ConnectTool));
export { ConnectorDrawingTool };
var TextDrawingTool = /** @class */ (function (_super) {
    __extends(TextDrawingTool, _super);
    function TextDrawingTool(commandHandler) {
        return _super.call(this, commandHandler, true) || this;
    }
    /**
     * @param args
     * @private
     */
    TextDrawingTool.prototype.mouseDown = function (args) {
        _super.prototype.mouseDown.call(this, args);
        this.commandHandler.clearSelection();
        var node = {
            shape: { type: 'Text' },
            offsetX: this.currentPosition.x,
            offsetY: this.currentPosition.y
        };
        if (!args.source) {
            this.drawingNode = this.commandHandler.drawObject(node);
        }
    };
    /**
     * @param args
     * @private
     */
    TextDrawingTool.prototype.mouseMove = function (args) {
        _super.prototype.mouseMove.call(this, args);
        if (!this.drawingNode) {
            var node = {
                shape: { type: 'Text' }, offsetX: this.currentPosition.x, width: 30, height: 30,
                // EJ2-42640-Text size is different if Text Node is created over another diagram commited by sivakumar sekar
                // commanded style property and added it after the object is drawn
                // style: { strokeDashArray: '2 2', fill: 'transparent' },
                offsetY: this.currentPosition.y
            };
            this.drawingNode = this.commandHandler.drawObject(node);
            this.drawingNode.style.strokeDashArray = '2 2';
            this.drawingNode.style.fill = 'transparent';
        }
        else {
            this.drawingNode.style.strokeColor = 'black';
            this.drawingNode.style.strokeDashArray = '2 2';
            this.drawingNode.style.fill = 'transparent';
        }
        if (this.inAction && Point.equals(this.currentPosition, this.prevPosition) === false) {
            var rect = Rect.toBounds([this.prevPosition, this.currentPosition]);
            this.commandHandler.updateNodeDimension(this.drawingNode, rect);
        }
        return !this.blocked;
    };
    /**
     * @param args
     * @private
     */
    TextDrawingTool.prototype.mouseUp = function (args) {
        this.checkPropertyValue();
        if (this.drawingNode) {
            this.drawingNode.style.strokeColor = 'none';
            this.drawingNode.style.fill = 'none';
        }
        else {
            this.drawingNode = args.source;
        }
        if (this.drawingNode && (this.drawingNode instanceof Node || this.drawingNode instanceof Connector)) {
            this.commandHandler.addText(this.drawingNode, this.currentPosition);
        }
        _super.prototype.mouseUp.call(this, args);
        this.inAction = false;
    };
    /**   @private  */
    TextDrawingTool.prototype.endAction = function () {
        _super.prototype.endAction.call(this);
    };
    return TextDrawingTool;
}(ToolBase));
export { TextDrawingTool };
/**
 * Pans the diagram control on drag
 */
var ZoomPanTool = /** @class */ (function (_super) {
    __extends(ZoomPanTool, _super);
    function ZoomPanTool(commandHandler, zoom) {
        var _this = _super.call(this, commandHandler) || this;
        _this.zooming = zoom;
        return _this;
    }
    /**
     * @param args
     * @private
     */
    ZoomPanTool.prototype.mouseDown = function (args) {
        _super.prototype.mouseDown.call(this, args);
        this.inAction = true;
        this.commandHandler.setBlazorDiagramProps(true);
    };
    /**
     * @param args
     * @private
     */
    ZoomPanTool.prototype.mouseMove = function (args) {
        _super.prototype.mouseMove.call(this, args);
        if (this.inAction) {
            if (!this.zooming && Point.equals(this.currentPosition, this.prevPosition) === false) {
                var difX = this.currentPosition.x - this.prevPosition.x;
                var difY = this.currentPosition.y - this.prevPosition.y;
                this.commandHandler.scroll(difX, difY, this.currentPosition);
            }
            else if (args.moveTouches && args.moveTouches.length && args.moveTouches.length >= 2) {
                var startTouch0 = args.startTouches[0];
                var startTouch1 = args.startTouches[1];
                var moveTouch0 = args.moveTouches[0];
                var moveTouch1 = args.moveTouches[1];
                var scale = this.getDistance(moveTouch0, moveTouch1) / this.getDistance(startTouch0, startTouch1);
                var focusPoint = args.position;
                this.commandHandler.zoom(scale, 0, 0, focusPoint);
                this.updateTouch(startTouch0, moveTouch0);
                this.updateTouch(startTouch1, moveTouch1);
            }
        }
        this.commandHandler.dataBinding();
        return !this.blocked;
    };
    /**
     * @param args
     * @private
     */
    ZoomPanTool.prototype.mouseUp = function (args) {
        this.commandHandler.setBlazorDiagramProps(false);
        this.checkPropertyValue();
        this.commandHandler.updatePanState(false);
        _super.prototype.mouseUp.call(this, args);
        this.inAction = false;
    };
    /**   @private  */
    ZoomPanTool.prototype.endAction = function () {
        _super.prototype.endAction.call(this);
    };
    ZoomPanTool.prototype.getDistance = function (touch1, touch2) {
        var x = touch2.pageX - touch1.pageX;
        var y = touch2.pageY - touch1.pageY;
        return Math.sqrt((x * x) + (y * y));
    };
    ZoomPanTool.prototype.updateTouch = function (startTouch, moveTouch) {
        startTouch.pageX = moveTouch.pageX;
        startTouch.pageY = moveTouch.pageY;
    };
    return ZoomPanTool;
}(ToolBase));
export { ZoomPanTool };
/**
 * Animate the layout during expand and collapse
 */
var ExpandTool = /** @class */ (function (_super) {
    __extends(ExpandTool, _super);
    function ExpandTool(commandHandler) {
        return _super.call(this, commandHandler, true) || this;
    }
    /**
     * @param args
     * @private
     */
    ExpandTool.prototype.mouseUp = function (args) {
        this.checkPropertyValue();
        this.commandHandler.initExpand(args);
        _super.prototype.mouseUp.call(this, args);
    };
    return ExpandTool;
}(ToolBase));
export { ExpandTool };
/**
 * Opens the annotation hypeLink at mouse up
 */
var LabelTool = /** @class */ (function (_super) {
    __extends(LabelTool, _super);
    function LabelTool(commandHandler) {
        return _super.call(this, commandHandler, true) || this;
    }
    /**
     * @param args
     * @private
     */
    LabelTool.prototype.mouseUp = function (args) {
        this.checkPropertyValue();
        var tab = '_blank';
        var windowOption = '';
        var windowHeight = window.innerHeight;
        var windowWidth = window.innerWidth;
        var screenTop = window.screenTop;
        var screenLeft = window.screenLeft;
        if (args.sourceWrapper.hyperlink.hyperlinkOpenState === 'CurrentTab') {
            tab = '_self';
        }
        else if (args.sourceWrapper.hyperlink.hyperlinkOpenState === 'NewWindow') {
            windowOption = 'height=' + windowHeight + ',width=' + windowWidth + ',top=' + screenTop + ',left=' + screenLeft;
        }
        var win = window.open(args.sourceWrapper.hyperlink.link, tab, windowOption);
        win.focus();
        _super.prototype.mouseUp.call(this, args);
    };
    return LabelTool;
}(ToolBase));
export { LabelTool };
/**
 * Draws a Polygon shape node dynamically using polygon Tool
 */
var PolygonDrawingTool = /** @class */ (function (_super) {
    __extends(PolygonDrawingTool, _super);
    function PolygonDrawingTool(commandHandler) {
        return _super.call(this, commandHandler, true) || this;
    }
    /**
     * @param args
     * @private
     */
    PolygonDrawingTool.prototype.mouseDown = function (args) {
        _super.prototype.mouseDown.call(this, args);
        this.inAction = true;
        if (!this.drawingObject) {
            this.startPoint = { x: this.startPosition.x, y: this.startPosition.y };
            var node = {
                offsetX: this.currentPosition.x,
                offsetY: this.currentPosition.y,
                width: 5, height: 5,
                style: { strokeColor: 'black', strokeWidth: 1 },
                shape: {
                    type: 'Basic',
                    shape: 'Polygon',
                    points: [{ x: this.startPoint.x, y: this.startPoint.y }, { x: this.currentPosition.x, y: this.currentPosition.y }]
                }
            };
            if (isBlazor() && node.shape.type === 'Basic') {
                node.shape.basicShape = 'Polygon';
            }
            this.drawingObject = this.commandHandler.drawObject(node);
        }
        else {
            var pt = void 0;
            var obj = this.drawingObject.shape;
            pt = obj.points[obj.points.length - 1];
            pt = { x: pt.x, y: pt.y };
            this.drawingObject.shape.points.push(pt);
        }
    };
    /**
     * @param args
     * @private
     */
    PolygonDrawingTool.prototype.mouseMove = function (args) {
        _super.prototype.mouseMove.call(this, args);
        if (this.inAction) {
            var obj = this.drawingObject.shape;
            if (this.drawingObject && this.currentPosition) {
                obj.points[obj.points.length - 1].x = this.currentPosition.x;
                obj.points[obj.points.length - 1].y = this.currentPosition.y;
                this.drawingObject.wrapper.children[0].data = getPolygonPath(this.drawingObject.shape.points);
                if (this.inAction && Point.equals(this.currentPosition, this.prevPosition) === false) {
                    var region = Rect.toBounds(this.drawingObject.shape.points);
                    this.commandHandler.updateNodeDimension(this.drawingObject, region);
                }
            }
        }
        return true;
    };
    /**
     * @param args
     * @param dblClickArgs
     * @param args
     * @param dblClickArgs
     * @private
     */
    PolygonDrawingTool.prototype.mouseUp = function (args, dblClickArgs) {
        this.checkPropertyValue();
        _super.prototype.mouseMove.call(this, args);
        if (this.inAction) {
            this.inAction = false;
            if (this.drawingObject) {
                this.commandHandler.addObjectToDiagram(this.drawingObject);
            }
        }
        this.endAction();
    };
    /**
     * @param args
     * @private
     */
    PolygonDrawingTool.prototype.mouseWheel = function (args) {
        _super.prototype.mouseWheel.call(this, args);
        this.mouseMove(args);
    };
    /**   @private  */
    PolygonDrawingTool.prototype.endAction = function () {
        this.inAction = false;
        this.drawingObject = null;
    };
    return PolygonDrawingTool;
}(ToolBase));
export { PolygonDrawingTool };
/**
 * Draws a PolyLine Connector dynamically using PolyLine Drawing Tool
 */
var PolyLineDrawingTool = /** @class */ (function (_super) {
    __extends(PolyLineDrawingTool, _super);
    function PolyLineDrawingTool(commandHandler) {
        return _super.call(this, commandHandler, true) || this;
    }
    /**
     * @param args
     * @private
     */
    PolyLineDrawingTool.prototype.mouseMove = function (args) {
        _super.prototype.mouseMove.call(this, args);
        if (this.inAction) {
            var obj = this.drawingObject;
            obj.targetPoint = this.currentPosition;
            this.commandHandler.updateConnectorPoints(obj);
        }
        return true;
    };
    /**
     * @param args
     * @private
     */
    PolyLineDrawingTool.prototype.mouseDown = function (args) {
        _super.prototype.mouseDown.call(this, args);
        this.inAction = true;
        if (!this.drawingObject) {
            var connector = {
                id: 'Connector',
                type: 'Straight',
                sourcePoint: this.currentPosition,
                targetPoint: this.currentPosition
            };
            this.drawingObject = this.commandHandler.drawObject(connector);
        }
        else {
            var drawObject = this.drawingObject;
            var segment = void 0;
            segment = new StraightSegment(drawObject, 'segments', { type: 'Straight' }, true);
            segment.point = this.currentPosition;
            drawObject.segments[drawObject.segments.length - 1] = segment;
        }
    };
    /**
     * @param args
     * @private
     */
    PolyLineDrawingTool.prototype.mouseWheel = function (args) {
        _super.prototype.mouseWheel.call(this, args);
        this.mouseMove(args);
    };
    /**
     * @param args
     * @private
     */
    PolyLineDrawingTool.prototype.mouseUp = function (args) {
        this.checkPropertyValue();
        _super.prototype.mouseMove.call(this, args);
        if (this.inAction) {
            if (this.drawingObject) {
                var drawObject = this.drawingObject;
                drawObject.segments[drawObject.segments.length - 1].point = { x: 0, y: 0 };
                this.commandHandler.addObjectToDiagram(this.drawingObject);
            }
        }
        this.endAction();
    };
    /**   @private  */
    PolyLineDrawingTool.prototype.endAction = function () {
        this.drawingObject = null;
        this.inAction = false;
    };
    return PolyLineDrawingTool;
}(ToolBase));
export { PolyLineDrawingTool };
var LabelDragTool = /** @class */ (function (_super) {
    __extends(LabelDragTool, _super);
    function LabelDragTool(commandHandler) {
        return _super.call(this, commandHandler, true) || this;
    }
    /**
     * @param args
     * @private
     */
    LabelDragTool.prototype.mouseDown = function (args) {
        this.inAction = true;
        this.undoElement = cloneObject(args.source);
        this.annotationId = args.sourceWrapper.id;
        _super.prototype.mouseDown.call(this, args);
    };
    /**
     * @param args
     * @private
     */
    LabelDragTool.prototype.mouseMove = function (args) {
        _super.prototype.mouseMove.call(this, args);
        var difx = this.currentPosition.x - this.prevPosition.x;
        var dify = this.currentPosition.y - this.prevPosition.y;
        var node = args.source;
        if (node instanceof Node) {
            var matrix = identityMatrix();
            rotateMatrix(matrix, -node.rotateAngle, 0, 0);
            var diff = transformPointByMatrix(matrix, { x: difx, y: dify });
            difx = diff.x;
            dify = diff.y;
        }
        if (this.inAction) {
            this.commandHandler.labelDrag(args.source, args.sourceWrapper, difx, dify);
            this.commandHandler.updateSelector();
        }
        this.prevPosition = this.currentPosition;
        return !this.blocked;
    };
    /**
     * @param args
     * @private
     */
    LabelDragTool.prototype.mouseUp = function (args) {
        this.checkPropertyValue();
        var redoValue = args.source;
        this.inAction = false;
        var entryValue = {
            type: 'AnnotationPropertyChanged',
            objectId: this.annotationId, undoObject: cloneObject(this.undoElement),
            category: 'Internal', redoObject: cloneObject(redoValue)
        };
        this.commandHandler.addHistoryEntry(entryValue);
        _super.prototype.mouseUp.call(this, args);
    };
    /**
     * @param args
     * @private
     */
    LabelDragTool.prototype.mouseLeave = function (args) {
        this.mouseUp(args);
    };
    return LabelDragTool;
}(ToolBase));
export { LabelDragTool };
var LabelResizeTool = /** @class */ (function (_super) {
    __extends(LabelResizeTool, _super);
    function LabelResizeTool(commandHandler, corner) {
        var _this = _super.call(this, commandHandler, true) || this;
        _this.corner = corner;
        return _this;
    }
    /**
     * @param args
     * @private
     */
    LabelResizeTool.prototype.mouseDown = function (args) {
        this.inAction = true;
        var object = (args.source.nodes.length) ?
            args.source.nodes[0] : args.source.connectors[0];
        this.annotationId = args.source.wrapper.children[0].id;
        this.undoElement = cloneObject(object);
        var annotation = args.source.wrapper.children[0];
        this.initialBounds = {
            x: annotation.offsetX,
            y: annotation.offsetY,
            width: annotation.actualSize.width,
            height: annotation.actualSize.height
        };
        _super.prototype.mouseDown.call(this, args);
    };
    /**
     * @param args
     * @private
     */
    LabelResizeTool.prototype.mouseMove = function (args) {
        _super.prototype.mouseMove.call(this, args);
        if (this.inAction) {
            this.resizeObject(args);
        }
        return !this.blocked;
    };
    /**
     * @param args
     * @private
     */
    LabelResizeTool.prototype.mouseUp = function (args) {
        this.checkPropertyValue();
        var redoObject = (args.source.nodes.length) ?
            args.source.nodes[0] : args.source.connectors[0];
        this.inAction = false;
        var entry = {
            type: 'AnnotationPropertyChanged', objectId: this.annotationId,
            redoObject: cloneObject(redoObject), undoObject: cloneObject(this.undoElement), category: 'Internal'
        };
        this.commandHandler.addHistoryEntry(entry);
        _super.prototype.mouseUp.call(this, args);
    };
    /**
     * @param args
     * @private
     */
    LabelResizeTool.prototype.mouseLeave = function (args) {
        this.mouseUp(args);
    };
    /**
     * @param args
     * @private
     */
    LabelResizeTool.prototype.resizeObject = function (args) {
        var object;
        object = (args.source.nodes.length) ? args.source.nodes[0] : args.source.connectors[0];
        var textElement = args.source.wrapper.children[0];
        var deltaWidth;
        var deltaHeight;
        var center = { x: textElement.offsetX, y: textElement.offsetY };
        var rotateAngle = textElement.rotateAngle;
        rotateAngle += (object instanceof Node) ? object.rotateAngle : 0;
        rotateAngle = (rotateAngle + 360) % 360;
        var trans = identityMatrix();
        rotateMatrix(trans, rotateAngle, center.x, center.y);
        var corner = this.corner.slice(5);
        var pivot = this.updateSize(textElement, this.startPosition, this.currentPosition, corner, this.initialBounds, rotateAngle);
        var x = textElement.offsetX - textElement.actualSize.width * textElement.pivot.x;
        var y = textElement.offsetY - textElement.actualSize.height * textElement.pivot.y;
        var pivotPoint = this.getPivot(corner);
        pivotPoint = { x: x + textElement.actualSize.width * pivotPoint.x, y: y + textElement.actualSize.height * pivotPoint.y };
        var point = transformPointByMatrix(trans, pivotPoint);
        pivot.x = point.x;
        pivot.y = point.y;
        deltaWidth = pivot.width;
        deltaHeight = pivot.height;
        deltaWidth = (deltaWidth < 0) ? 1 : deltaWidth;
        deltaHeight = (deltaHeight < 0) ? 1 : deltaHeight;
        this.commandHandler.labelResize(object, args.source.annotation, deltaWidth, deltaHeight, pivot, args.source);
        this.commandHandler.updateSelector();
    };
    return LabelResizeTool;
}(ToolBase));
export { LabelResizeTool };
var LabelRotateTool = /** @class */ (function (_super) {
    __extends(LabelRotateTool, _super);
    function LabelRotateTool(commandHandler) {
        return _super.call(this, commandHandler, true) || this;
    }
    /**
     * @param args
     * @private
     */
    LabelRotateTool.prototype.mouseDown = function (args) {
        this.inAction = true;
        this.annotationId = args.source.wrapper.children[0].id;
        var object = (args.source.nodes.length) ?
            args.source.nodes[0] : args.source.connectors[0];
        this.undoElement = cloneObject(object);
        _super.prototype.mouseDown.call(this, args);
    };
    /**
     * @param args
     * @private
     */
    LabelRotateTool.prototype.mouseMove = function (args) {
        _super.prototype.mouseMove.call(this, args);
        if (args.source) {
            if (this.inAction) {
                var object = args.source.nodes[0] ? args.source.nodes[0] :
                    args.source.connectors[0];
                var annotation = void 0;
                annotation = (args.source.annotation);
                this.commandHandler.labelRotate(object, annotation, this.currentPosition, args.source);
                this.commandHandler.updateSelector();
            }
        }
        this.prevPosition = this.currentPosition;
        return !this.blocked;
    };
    /**
     * @param args
     * @private
     */
    LabelRotateTool.prototype.mouseUp = function (args) {
        this.checkPropertyValue();
        this.inAction = false;
        var redoEntry = (args.source.nodes.length) ?
            args.source.nodes[0] : args.source.connectors[0];
        var entryObject = {
            type: 'AnnotationPropertyChanged', objectId: this.annotationId,
            redoObject: cloneObject(redoEntry),
            undoObject: cloneObject(this.undoElement), category: 'Internal'
        };
        this.commandHandler.addHistoryEntry(entryObject);
        _super.prototype.mouseUp.call(this, args);
    };
    /**
     * @param args
     * @private
     */
    LabelRotateTool.prototype.mouseLeave = function (args) {
        this.mouseUp(args);
    };
    return LabelRotateTool;
}(ToolBase));
export { LabelRotateTool };
/**
 * EJ2-33302 - Freehand drawing support in diagram control.
 */
var FreeHandTool = /** @class */ (function (_super) {
    __extends(FreeHandTool, _super);
    function FreeHandTool(commandHandler) {
        return _super.call(this, commandHandler, true) || this;
    }
    /**
     * mouseMove - Collect the points using current mouse position and convert it into pathData.
     * @param args
     * @private
     */
    FreeHandTool.prototype.mouseMove = function (args) {
        _super.prototype.mouseMove.call(this, args);
        if (this.inAction) {
            var obj = this.drawingObject.shape;
            if (this.drawingObject && this.currentPosition) {
                var pt = this.currentPosition;
                obj.points.push(pt);
                this.drawingObject.wrapper.children[0].data = getFreeHandPath(this.drawingObject.shape.points);
                obj.data = getFreeHandPath(obj.points);
                if (this.inAction && Point.equals(this.currentPosition, this.prevPosition) === false) {
                    var region = Rect.toBounds(this.drawingObject.shape.points);
                    this.commandHandler.updateNodeDimension(this.drawingObject, region);
                }
            }
        }
        return true;
    };
    /**
     * @param args
     * @private
     */
    FreeHandTool.prototype.mouseDown = function (args) {
        _super.prototype.mouseDown.call(this, args);
        this.inAction = true;
        if (!this.drawingObject) {
            this.startPoint = { x: this.startPosition.x, y: this.startPosition.y };
            var node = {
                offsetX: this.currentPosition.x,
                offsetY: this.currentPosition.y,
                width: 5, height: 5,
                style: { strokeColor: 'black', strokeWidth: 1, fill: 'transparent' },
                shape: {
                    type: 'Path',
                    points: [{ x: this.startPoint.x, y: this.startPoint.y }, { x: this.currentPosition.x, y: this.currentPosition.y }]
                }
            };
            this.drawingObject = this.commandHandler.drawObject(node);
        }
    };
    /**
     * mouseUp - Remove the drawn object. Reduce and smoothen the collected points and create
     * a bezier connector using the smoothened points.
     * @param args
     * @private
     */
    FreeHandTool.prototype.mouseUp = function (args) {
        this.checkPropertyValue();
        var tolerance = 10;
        var smoothValue = 0.5;
        if (this.inAction) {
            this.inAction = false;
            if (this.drawingObject) {
                var obj = this.drawingObject.shape;
                var points = obj.points;
                this.commandHandler.addObjectToDiagram(this.drawingObject);
                var prevId = this.drawingObject.id;
                var prevObj = this.commandHandler.diagram.nameTable["" + prevId];
                this.commandHandler.diagram.remove(prevObj);
                points = this.pointReduction(points, tolerance);
                //EJ2-69816 - Added below code to set the allow segment reset as false to avoid the unwanted segment reset.
                var newObj = {
                    id: 'newConnector' + randomId(), type: 'Bezier',
                    sourcePoint: { x: points[0].x, y: points[0].y }, targetPoint: { x: points[points.length - 1].x, y: points[points.length - 1].y },
                    segments: [], targetDecorator: { shape: 'None' }, bezierSettings: { allowSegmentsReset: false }
                };
                this.drawingObject = this.commandHandler.drawObject(newObj);
                this.drawingObject = this.bezierCurveSmoothness(points, smoothValue, this.drawingObject, obj);
                this.commandHandler.updateConnectorPoints(this.drawingObject);
                this.commandHandler.addObjectToDiagram(this.drawingObject);
                //(EJ2-70838)- Added code to resolve style property not added dynamically for freehand connector
                // Added code to resolve style property not added dynamically for freehand connector
                _super.prototype.mouseUp.call(this, args);
            }
        }
    };
    /**
     * Reduce the collected points based on tolerance value.
     * @param points
     * @param tolerance
     * @returns points
     */
    FreeHandTool.prototype.pointReduction = function (points, tolerance) {
        if (points === null || points.length < 3) {
            return points;
        }
        var firstPoint = 0;
        var lastPoint = points.length - 1;
        var pointIndex = [];
        pointIndex.push(firstPoint);
        pointIndex.push(lastPoint);
        while (points[parseInt(firstPoint.toString(), 10)] === (points[parseInt(lastPoint.toString(), 10)])) {
            lastPoint--;
        }
        this.reduction(points, firstPoint, lastPoint, tolerance, pointIndex);
        var returnedPoints = [];
        pointIndex.sort(function (a, b) { return a - b; });
        pointIndex.forEach(function (element) {
            returnedPoints.push(points[parseInt(element.toString(), 10)]);
        });
        return returnedPoints;
    };
    FreeHandTool.prototype.reduction = function (points, firstPoint, lastPoint, tolerance, pointIndex) {
        var maxDistance = 0;
        var largestPointIndex = 0;
        for (var i = firstPoint; i < lastPoint; i++) {
            var distance = this.perpendicularDistance(points[parseInt(firstPoint.toString(), 10)], points[parseInt(lastPoint.toString(), 10)], points[parseInt(i.toString(), 10)]);
            if (distance > maxDistance) {
                maxDistance = distance;
                largestPointIndex = i;
            }
        }
        if (maxDistance > tolerance && largestPointIndex !== 0) {
            pointIndex.push(largestPointIndex);
            this.reduction(points, firstPoint, largestPointIndex, tolerance, pointIndex);
            this.reduction(points, largestPointIndex, lastPoint, tolerance, pointIndex);
        }
    };
    /**
     * Calculate the perpendicular distance of each point with first and last points
     * @param point1
     * @param point2
     * @param point3
     * @returns
     */
    FreeHandTool.prototype.perpendicularDistance = function (point1, point2, point3) {
        var area = Math.abs(.5 * ((point1.x * point2.y - point2.x * point1.y) +
            (point2.x * point3.y - point3.x * point2.y) + (point3.x * point1.y - point1.x * point3.y)));
        var base = Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
        var height = area / base * 2;
        return height;
    };
    /**
     * Smoothen the bezier curve based on the points and smoothValue.
     * @param points
     * @param smoothValue
     * @param drawingObject
     * @param obj
     * @returns drawingObject
     */
    FreeHandTool.prototype.bezierCurveSmoothness = function (points, smoothValue, drawingObject, obj) {
        if (points.length < 3) {
            return drawingObject;
        }
        for (var i = 0; i < points.length - 1; i++) {
            var pointx1 = points[parseInt(i.toString(), 10)].x;
            var pointy1 = points[parseInt(i.toString(), 10)].y;
            var pointx2 = points[i + 1].x;
            var pointy2 = points[i + 1].y;
            var pointx0 = void 0;
            var pointy0 = void 0;
            if (i === 0) {
                var previousPoint = points[parseInt(i.toString(), 10)];
                pointx0 = previousPoint.x;
                pointy0 = previousPoint.y;
            }
            else {
                pointx0 = points[i - 1].x;
                pointy0 = points[i - 1].y;
            }
            var pointx3 = void 0, pointy3 = void 0;
            if (i === points.length - 2) {
                var nextPoint = points[i + 1];
                pointx3 = nextPoint.x;
                pointy3 = nextPoint.y;
            }
            else {
                pointx3 = points[i + 2].x;
                pointy3 = points[i + 2].y;
            }
            var xc1 = (pointx0 + pointx1) / 2.0;
            var yc1 = (pointy0 + pointy1) / 2.0;
            var xc2 = (pointx1 + pointx2) / 2.0;
            var yc2 = (pointy1 + pointy2) / 2.0;
            var xc3 = (pointx2 + pointx3) / 2.0;
            var yc3 = (pointy2 + pointy3) / 2.0;
            var point0 = {};
            var point1 = {};
            var point2 = {};
            var point3 = {};
            point0.x = pointx0;
            point0.y = pointy0;
            point1.x = pointx1;
            point1.y = pointy1;
            point2.x = pointx2;
            point2.y = pointy2;
            point3.x = pointx3;
            point3.y = pointy3;
            var len1 = Point.findLength(point0, point1);
            var len2 = Point.findLength(point1, point2);
            var len3 = Point.findLength(point2, point3);
            var k1 = len1 / (len1 + len2);
            var k2 = len2 / (len2 + len3);
            var xm1 = xc1 + (xc2 - xc1) * k1;
            var ym1 = yc1 + (yc2 - yc1) * k1;
            var xm2 = xc2 + (xc3 - xc2) * k2;
            var ym2 = yc2 + (yc3 - yc2) * k2;
            var Controlpointx1 = xm1 + (xc2 - xm1) * smoothValue + pointx1 - xm1;
            var Controlpointy1 = ym1 + (yc2 - ym1) * smoothValue + pointy1 - ym1;
            var Controlpointx2 = xm2 + (xc2 - xm2) * smoothValue + pointx2 - xm2;
            var Controlpointy2 = ym2 + (yc2 - ym2) * smoothValue + pointy2 - ym2;
            var segment = new BezierSegment(obj, 'segments', { type: 'Bezier' }, true);
            var cnPt1 = { x: Controlpointx1, y: Controlpointy1 };
            var cnPt2 = { x: Controlpointx2, y: Controlpointy2 };
            var segSourcePoint = { x: pointx1, y: pointy1 };
            var segTargetPoint = { x: pointx2, y: pointy2 };
            segment.type = 'Bezier';
            drawingObject.segments[parseInt(i.toString(), 10)] = segment;
            if (i === 0) {
                cnPt1 = { x: pointx1, y: pointy1 };
            }
            if (i === points.length - 2) {
                cnPt2 = { x: pointx2, y: pointy2 };
            }
            drawingObject.segments[parseInt(i.toString(), 10)].vector1 = { angle: findAngle(segSourcePoint, cnPt1), distance: Point.findLength(segSourcePoint, cnPt1) };
            drawingObject.segments[parseInt(i.toString(), 10)].vector2 = { angle: findAngle(segTargetPoint, cnPt2), distance: Point.findLength(segTargetPoint, cnPt2) };
            drawingObject.segments[parseInt(i.toString(), 10)].point = segTargetPoint;
        }
        return drawingObject;
    };
    return FreeHandTool;
}(ToolBase));
export { FreeHandTool };
