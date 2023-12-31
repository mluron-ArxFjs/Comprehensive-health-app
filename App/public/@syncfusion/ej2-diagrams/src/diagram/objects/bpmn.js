/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsdoc/require-returns */
/* eslint-disable jsdoc/require-param */
/* eslint-disable valid-jsdoc */
/* eslint-disable @typescript-eslint/ban-types */
import { Node } from './../objects/node';
import { DiagramElement } from './../core/elements/diagram-element';
import { Canvas } from './../core/containers/canvas';
import { Container } from './../core/containers/container';
import { PathElement } from './../core/elements/path-element';
import { TextElement } from './../core/elements/text-element';
import { updateStyle } from './../../diagram/utility/diagram-util';
import { randomId, cloneObject } from './../utility/base-util';
import { Connector } from './../objects/connector';
import { BpmnAnnotation } from './../objects/node';
import { Transform, DiagramAction } from '../enum/enum';
import { findAngle, getIntersectionPoints, getPortDirection } from '../utility/connector';
import { Point } from '../primitives/point';
import { NodeConstraints, ConnectorConstraints } from '../enum/enum';
import { Rect } from '../primitives/rect';
import { Size } from '../primitives/size';
import { getDiagramElement } from '../utility/dom-util';
import { isBlazor } from '@syncfusion/ej2-base';
import { removeElement } from '../utility/dom-util';
/**
 * BPMN Diagrams contains the BPMN functionalities
 */
var BpmnDiagrams = /** @class */ (function () {
    //End size region
    /**
     * Constructor for the BpmnDiagrams module
     *
     * @private
     */
    function BpmnDiagrams() {
        //Code conversion for Bpmn Shapes
        //Start Region
        /**   @private  */
        this.annotationObjects = {};
        //constructs the BpmnDiagrams module
    }
    Object.defineProperty(BpmnDiagrams.prototype, "textAnnotationConnectors", {
        /**   @private  */
        get: function () {
            var connectors = [];
            for (var _i = 0, _a = Object.keys(this.annotationObjects); _i < _a.length; _i++) {
                var key = _a[_i];
                var entry = this.annotationObjects["" + key];
                for (var _b = 0, _c = Object.keys(entry); _b < _c.length; _b++) {
                    var annotation = _c[_b];
                    var key_1 = 'connector';
                    connectors.push(entry["" + annotation]["" + key_1]);
                }
            }
            return connectors;
        },
        enumerable: true,
        configurable: true
    });
    /** @private */
    BpmnDiagrams.prototype.getTextAnnotationConn = function (obj) {
        var connectors = [];
        if (obj.shape.type === 'Bpmn' && obj.shape.annotations.length !== 0) {
            var entry = this.annotationObjects[obj.id];
            for (var _i = 0, _a = Object.keys(entry); _i < _a.length; _i++) {
                var annotation = _a[_i];
                var key = 'connector';
                connectors.push(entry["" + annotation]["" + key]);
            }
        }
        return connectors;
    };
    /**   @private  */
    BpmnDiagrams.prototype.getSize = function (node, content) {
        var size = new Size(node.width, node.height);
        if (size.width === undefined || size.height === undefined) {
            if (!(content instanceof PathElement)) {
                size.width = size.width || 50;
                size.height = size.height || 50;
            }
            if (content.actualSize.width && content.actualSize.height) {
                return content.actualSize;
            }
            else {
                content.measure(new Size());
                size.width = size.width || content.desiredSize.width;
                size.height = size.height || content.desiredSize.height;
            }
            if (node.maxWidth !== undefined) {
                size.width = Math.min(size.width, node.maxWidth);
            }
            if (node.maxHeight !== undefined) {
                size.height = Math.min(size.height, node.maxHeight);
            }
            if (node.minWidth !== undefined) {
                size.width = Math.max(size.width, node.minWidth);
            }
            if (node.minHeight !== undefined) {
                size.height = Math.max(size.height, node.minHeight);
            }
        }
        return size;
    };
    /** @private */
    BpmnDiagrams.prototype.initBPMNContent = function (content, node, diagram) {
        var shape = (isBlazor() ? node.shape : node.shape);
        var bpmnShape = (isBlazor() ? node.shape.bpmnShape : node.shape.shape);
        if (bpmnShape === 'Event') {
            content = this.getBPMNEventShape(node, shape.event);
        }
        if (bpmnShape === 'Gateway') {
            content = this.getBPMNGatewayShape(node);
        }
        if (bpmnShape === 'DataObject') {
            content = this.getBPMNDataObjectShape(node);
        }
        if (bpmnShape === 'Message' || bpmnShape === 'DataSource') {
            content = this.getBPMNShapes(node);
        }
        // if (shape.shape === 'Group') {
        //     content = this.getBPMNGroup(node, diagram);
        //     content.style.strokeDashArray = '2 2 6 2';
        //     content.horizontalAlignment = 'Center';
        //     content.verticalAlignment = 'Center';
        // }
        if (bpmnShape === 'Activity') {
            content = this.getBPMNActivityShape(node);
        }
        if (bpmnShape === 'TextAnnotation') {
            content = this.renderBPMNTextAnnotation(diagram, node, content);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        var annotations = {};
        if (shape.annotations.length > 0) {
            for (var i = 0; i < shape.annotations.length && shape.annotations[parseInt(i.toString(), 10)].text; i++) {
                content.children.push(this.getBPMNTextAnnotation(node, diagram, shape.annotations[parseInt(i.toString(), 10)], content));
            }
            content.style.strokeDashArray = '2 2 6 2';
        }
        return content;
    };
    /** @private */
    BpmnDiagrams.prototype.getBPMNShapes = function (node) {
        var bpmnShape = new PathElement();
        //set style
        this.setStyle(bpmnShape, node);
        if ((node.constraints & NodeConstraints.Shadow) !== 0) {
            bpmnShape.shadow = node.shadow;
        }
        var bpmnShapeData = getBpmnShapePathData((isBlazor() ? node.shape.bpmnShape :
            node.shape.shape));
        bpmnShape.data = bpmnShapeData;
        bpmnShape.id = node.id + '_' + (isBlazor() ? node.shape.bpmnShape :
            node.shape.shape);
        if (node.width !== undefined && node.height !== undefined) {
            bpmnShape.width = node.width;
            bpmnShape.height = node.height;
        }
        return bpmnShape;
    };
    /** @private */
    // public getBPMNGroup(node: Node, diagram: Diagram): Container {
    //     let group: Container = new Container();
    //     group.id = node.id + '_group';
    //     //group.style.strokeDashArray = '2 2 6 2';
    //     if (!group.children) { group.children = []; }
    //     let grp: BpmnGroup = ((node.shape as BpmnShape).group as BpmnGroup);
    //     if ((node.shape as BpmnShape).group as BpmnGroup) {
    //         for (let i: number = 0; i < grp.children.length; i++) {
    //             let b: Node | Connector = diagram.nameTable[grp.children[i]];
    //             group.children.push(b.wrapper);
    //         }
    //     }
    //     return group;
    // }
    /** @private */
    BpmnDiagrams.prototype.getBPMNGatewayShape = function (node) {
        var gatewayshape = new Canvas();
        //childNode0
        var gatewayNode = new PathElement();
        gatewayNode.id = node.id + '_0_gateway';
        gatewayNode.offsetX = node.offsetX;
        gatewayNode.offsetY = node.offsetY;
        gatewayNode.data = 'M 40 20 L 20 40 L 0 20 L 20 0 L 40 20 Z';
        this.setStyle(gatewayNode, node);
        //childNode1
        var gatewayTypeNode = new PathElement();
        gatewayTypeNode.id = node.id + '_1_gatewayType';
        //set style - opacity
        gatewayTypeNode.style.opacity = node.style.opacity;
        gatewayTypeNode.style.strokeColor = node.style.strokeColor;
        gatewayTypeNode.horizontalAlignment = 'Center';
        gatewayTypeNode.verticalAlignment = 'Center';
        gatewayTypeNode.relativeMode = 'Object';
        var shapeType = node.shape.gateway;
        //let gatewayTypeNodeShapeData: string;
        var gatewayTypeNodeShapeData = getBpmnGatewayShapePathData(shapeType.type);
        if (shapeType.type === 'EventBased' || shapeType.type === 'ExclusiveEventBased' || shapeType.type === 'ParallelEventBased') {
            gatewayTypeNode.style.fill = 'white';
        }
        else {
            gatewayTypeNode.style.fill = 'black';
        }
        gatewayTypeNode.data = gatewayTypeNodeShapeData;
        // append child and set style
        gatewayshape.style.fill = 'transparent';
        gatewayshape.style.strokeColor = 'transparent';
        gatewayshape.style.strokeWidth = 0;
        gatewayshape.children = [gatewayNode, gatewayTypeNode];
        var size = this.getSize(node, gatewayNode);
        this.setSizeForBPMNGateway(node.shape.gateway, gatewayshape, size.width, size.height);
        return gatewayshape;
    };
    /** @private */
    BpmnDiagrams.prototype.getBPMNDataObjectShape = function (node) {
        var dataObjectshape = new Canvas();
        var shape = node.shape.dataObject;
        //childNode0
        var dataobjNode = new PathElement();
        dataobjNode.id = node.id + '_0_dataobj';
        dataobjNode.data = 'M29.904,5 L7.853,5 L7.853,45 L42.147,45 L42.147,17.242,L29.932,5,L29.932,17.242,L42.147,17.242';
        var size = this.getSize(node, dataobjNode);
        dataobjNode.width = size.width;
        dataobjNode.height = size.height;
        this.setStyle(dataobjNode, node);
        //childNode1
        var dataobjTypeNode = new PathElement();
        dataobjTypeNode.id = node.id + '_1_type';
        dataobjTypeNode.width = 25;
        dataobjTypeNode.height = 20;
        dataobjTypeNode.margin.left = 5;
        dataobjTypeNode.margin.top = 5;
        dataobjTypeNode.data = 'M 3 9.4 l 6 0 v 2.4 l 3.6 -4 L 9 4 v 2.5 H 3 V 9.4 Z';
        //set style - opacity
        dataobjTypeNode.style.opacity = node.style.opacity;
        //childNode2
        var dataobjCollectionNode = new PathElement();
        dataobjCollectionNode.id = node.id + '_2_collection';
        dataobjCollectionNode.width = 7.5;
        dataobjCollectionNode.height = 15;
        dataobjCollectionNode.style.fill = 'black';
        dataobjCollectionNode.visible = true;
        dataobjCollectionNode.horizontalAlignment = 'Center';
        dataobjCollectionNode.verticalAlignment = 'Bottom';
        dataobjCollectionNode.relativeMode = 'Object';
        //set style - opacity
        dataobjCollectionNode.style.opacity = node.style.opacity;
        dataobjCollectionNode.data = 'M 0 0 L 0.1 0 L 0.1 2 L 0 2 Z M 0.4 0 L 0.6 0 L 0.6 2 L0.4 2 Z M 0.9 0 L 1 0 L 1 2 L 0.9 2 Z';
        switch (shape.type) {
            case 'None':
                dataobjTypeNode.visible = false;
                break;
            case 'Input':
                dataobjTypeNode.style.fill = 'white';
                break;
            case 'Output':
                dataobjTypeNode.style.fill = 'black';
                break;
        }
        if (shape.collection === false) {
            dataobjCollectionNode.visible = false;
        }
        //append child and set style
        dataObjectshape.style.fill = 'transparent';
        dataObjectshape.style.strokeColor = 'transparent';
        dataObjectshape.style.strokeWidth = 0;
        dataObjectshape.children = [dataobjNode, dataobjTypeNode, dataobjCollectionNode];
        return dataObjectshape;
    };
    /** @private */
    BpmnDiagrams.prototype.getBPMNTaskShape = function (node) {
        var shape = node.shape.activity;
        var task = shape.task;
        var taskShapes = new Canvas();
        //childNode0
        var taskNode = new DiagramElement();
        taskNode.cornerRadius = 10;
        var size = this.getSize(node, taskNode);
        taskNode.id = node.id + '_0_task';
        taskNode.width = size.width;
        taskNode.height = size.height;
        this.setStyle(taskNode, node);
        // if task as call
        if ((task.call !== undefined) && task.call === true) {
            taskNode.style.strokeWidth = 4;
        }
        taskShapes.width = size.width;
        taskShapes.height = size.height;
        var childCount = this.getTaskChildCount(node);
        var x;
        var childSpace = childCount * 12;
        var area = size.width / 2 - childSpace;
        if (childCount === 1) {
            x = area + 8;
        }
        else {
            x = area + (childCount - 1) * 8;
        }
        //childNode1
        var taskTypeNode = new PathElement();
        if (task.type === 'Receive' || task.type === 'Send') {
            taskTypeNode.width = 18;
            taskTypeNode.height = 16;
        }
        else if (task.type === 'Manual') {
            taskTypeNode.width = 16;
            taskTypeNode.height = 11;
        }
        else {
            taskTypeNode.width = 20;
            taskTypeNode.height = 20;
        }
        taskTypeNode.id = node.id + '_1_tasktType';
        taskTypeNode.margin.left = 5;
        taskTypeNode.margin.top = 5;
        var taskTypeNodeData = getBpmnTaskShapePathData(task.type);
        taskTypeNode.data = taskTypeNodeData;
        taskTypeNode.style.fill = 'transparent';
        taskTypeNode.style.opacity = node.style.opacity;
        if (task.type === 'Send') {
            taskTypeNode.style.fill = 'black';
        }
        // append child and set style
        taskShapes.style.fill = 'transparent';
        taskShapes.style.strokeColor = 'transparent';
        taskShapes.style.strokeWidth = 0;
        taskShapes.children = [taskNode, taskTypeNode];
        //childnode for service
        if (task.type === 'Service') {
            var taskTypeNodeService = new PathElement();
            taskTypeNodeService.id = node.id + '_1_taskTypeService';
            taskTypeNodeService.data = taskTypeNodeData;
            taskTypeNodeService.margin.left = taskTypeNode.margin.left + 9;
            taskTypeNodeService.margin.top = taskTypeNode.margin.top + 9;
            taskTypeNodeService.style.fill = 'white';
            taskTypeNodeService.style.opacity = node.style.opacity;
            taskShapes.children.push(taskTypeNodeService);
        }
        // if task as loop
        var loopType = task.loop;
        var taskLoopNode = new PathElement(); //let childNode2data: string;
        var childNode2data = getBpmnLoopShapePathData(loopType);
        taskLoopNode.data = childNode2data;
        taskLoopNode.style.fill = 'black';
        if (loopType !== 'None') {
            taskLoopNode.visible = true;
        }
        else {
            taskLoopNode.visible = false;
        }
        if (childCount === 1) {
            x = area + 9;
        }
        taskLoopNode.margin.left = x;
        if (taskLoopNode.visible === true) {
            x += 12 + 8;
        }
        taskLoopNode.width = 12;
        taskLoopNode.height = 12;
        taskLoopNode.margin.bottom = 5;
        taskLoopNode.id = node.id + '_2_loop';
        taskLoopNode.horizontalAlignment = 'Left';
        taskLoopNode.verticalAlignment = 'Bottom';
        taskLoopNode.setOffsetWithRespectToBounds(0, 1, 'Fraction');
        taskLoopNode.relativeMode = 'Point';
        taskLoopNode.style.fill = 'transparent';
        taskTypeNode.style.opacity = node.style.opacity;
        taskShapes.children.push(taskLoopNode);
        //if task as compensation
        var taskCompNode = new PathElement();
        taskCompNode = this.getBPMNCompensationShape(node, taskCompNode);
        if (task.compensation === true) {
            taskCompNode.visible = true;
        }
        else {
            taskCompNode.visible = false;
        }
        if (childCount === 1) {
            x = area + 9;
        }
        taskCompNode.margin.left = x - 3;
        x += 12 + 6;
        taskShapes.children.push(taskCompNode);
        return taskShapes;
    };
    /** @private */
    BpmnDiagrams.prototype.getBPMNEventShape = function (node, subEvent, sub, id) {
        var eventshape = new Canvas();
        var event;
        var trigger;
        var width;
        var height;
        id = id || node.id;
        var pathdata = 'M164.1884,84.6909000000001C156.2414,84.6909000000001,149.7764,78.2259000000001,149.7764,70.2769000000001' +
            'C149.7764,62.3279000000001,156.2414,55.8629000000001,164.1884,55.8629000000001C172.1354,55.8629000000001,178.6024,' +
            '62.3279000000001,178.6024,70.2769000000001C178.6024,78.2259000000001,172.1354,84.6909000000001,164.1884,84.6909000000001';
        var shapeEvent = node.shape.event;
        if ((!isBlazor() && node.shape.shape === 'Event') ||
            (isBlazor() && node.shape.bpmnShape === 'Event')) {
            event = shapeEvent.event;
            trigger = shapeEvent.trigger;
        }
        width = subEvent.width;
        height = subEvent.height;
        if (sub) {
            width = width || 20;
            height = height || 20;
        }
        else if (subEvent.width === undefined || subEvent.height === undefined) {
            var pathElement = new PathElement();
            pathElement.data = pathdata;
            var size = this.getSize(node, pathElement);
            width = size.width;
            height = size.height;
        }
        var shapeActivity = node.shape.activity;
        if ((!isBlazor() && node.shape.shape === 'Activity') ||
            (isBlazor() && node.shape.bpmnShape === 'Activity')) {
            var subProcess = shapeActivity.subProcess;
            event = subEvent.event;
            trigger = subEvent.trigger;
        }
        //childNode0
        var innerEvtNode = new PathElement();
        innerEvtNode.data = pathdata;
        innerEvtNode.id = id + '_0_event';
        innerEvtNode.width = width;
        innerEvtNode.height = height;
        innerEvtNode.horizontalAlignment = 'Center';
        innerEvtNode.verticalAlignment = 'Center';
        innerEvtNode.relativeMode = 'Object';
        this.setStyle(innerEvtNode, node);
        //childNode1
        var outerEvtNode = new PathElement();
        outerEvtNode.data = pathdata;
        outerEvtNode.id = id + '_1_event';
        outerEvtNode.style.gradient = node.style.gradient;
        outerEvtNode.horizontalAlignment = 'Center';
        outerEvtNode.verticalAlignment = 'Center';
        outerEvtNode.relativeMode = 'Object';
        // set style opacity & strokeColor
        outerEvtNode.style.strokeColor = node.style.strokeColor;
        outerEvtNode.style.opacity = node.style.opacity;
        //childNode2
        var triggerNode = new PathElement();
        var triggerNodeData = getBpmnTriggerShapePathData(trigger);
        triggerNode.data = triggerNodeData;
        triggerNode.id = id + '_2_trigger';
        triggerNode.horizontalAlignment = 'Center';
        triggerNode.verticalAlignment = 'Center';
        triggerNode.relativeMode = 'Object';
        // set style opacity & strokeColor
        triggerNode.style.strokeColor = node.style.strokeColor;
        triggerNode.style.opacity = node.style.opacity;
        switch (event) {
            case 'Start':
                outerEvtNode.visible = false;
                break;
            case 'NonInterruptingStart':
                innerEvtNode.style.strokeDashArray = '2 3';
                outerEvtNode.visible = false;
                break;
            case 'Intermediate':
                innerEvtNode.style.fill = node.style.fill;
                innerEvtNode.style.gradient = null;
                break;
            case 'NonInterruptingIntermediate':
                innerEvtNode.style.fill = node.style.fill;
                innerEvtNode.style.gradient = null;
                innerEvtNode.style.strokeDashArray = '2 3';
                outerEvtNode.style.strokeDashArray = '2 3';
                break;
            case 'ThrowingIntermediate':
            case 'End':
                innerEvtNode.style.fill = event !== 'End' ? node.style.fill : node.style.fill !== 'white' ? node.style.fill : 'black';
                innerEvtNode.style.gradient = null;
                triggerNode.style.fill = 'black';
                triggerNode.style.strokeColor = 'white';
                break;
        }
        //append child and set style
        eventshape.style.fill = 'transparent';
        eventshape.style.strokeColor = 'transparent';
        eventshape.style.strokeWidth = 0;
        eventshape.children = [innerEvtNode, outerEvtNode, triggerNode];
        this.setSizeForBPMNEvents(shapeEvent, eventshape, width, height);
        return eventshape;
    };
    BpmnDiagrams.prototype.setEventVisibility = function (node, canvas) {
        var event = node.shape.event.event;
        var innerEvtNode = canvas[0];
        var outerEvtNode = canvas[1];
        var triggerNode = canvas[2];
        switch (event) {
            case 'Start':
                outerEvtNode.visible = false;
                break;
            case 'NonInterruptingStart':
                innerEvtNode.style.strokeDashArray = '2 3';
                outerEvtNode.visible = false;
                break;
        }
    };
    BpmnDiagrams.prototype.setSubProcessVisibility = function (node) {
        var subProcess = node.shape.activity.subProcess;
        var eventLength = subProcess.events.length;
        var index = (node.shape.activity.subProcess.type === 'Transaction') ? 2 : 0;
        var elementWrapper = node.wrapper.children[0].children[0];
        if (subProcess.adhoc === false) {
            elementWrapper.children[3 + index + eventLength].visible = false;
        }
        if (subProcess.compensation === false) {
            elementWrapper.children[4 + index + eventLength].visible = false;
        }
        if (eventLength > 0) {
            for (var i = 0; i < eventLength; i++) {
                this.setEventVisibility(node, elementWrapper.children[2 + i].children);
            }
        }
    };
    /** @private */
    BpmnDiagrams.prototype.getBPMNSubProcessShape = function (node) {
        var subProcessShapes = new Canvas();
        var loopType;
        var events;
        var event;
        var subprocessAdhoc = new PathElement();
        var subProcessEventsShapes = new Canvas();
        var subProcessLoopShapes = new PathElement();
        var shape = node.shape.activity;
        var subProcess = shape.subProcess;
        var subChildCount = this.getSubprocessChildCount(node);
        var x;
        var subprocessNode = new DiagramElement();
        subprocessNode.id = node.id + '_0_Subprocess';
        subprocessNode.style.fill = 'transparent';
        subprocessNode.cornerRadius = 10;
        var size = this.getSize(node, subprocessNode);
        subprocessNode.width = size.width;
        subprocessNode.height = size.height;
        subProcessShapes.children = [subprocessNode];
        if (shape.subProcess.type === 'Transaction') {
            this.getBPMNSubProcessTransaction(node, node.shape, subProcessShapes);
        }
        var iconSpace = 4;
        var subChildSpace = 12;
        var childSpace = subChildCount * subChildSpace;
        var area = size.width / 2;
        if (subChildCount === 1) {
            x = area - (subChildSpace * 0.5);
        }
        else {
            x = area - (childSpace / 2) - ((subChildCount - 1) * iconSpace) / 2;
        }
        //set style
        this.setStyle(subprocessNode, node);
        if ((node.constraints & NodeConstraints.Shadow) !== 0) {
            subProcessShapes.shadow = node.shadow;
        }
        var collapsedShape = new PathElement();
        collapsedShape.id = node.id + '_0_collapsed';
        collapsedShape.width = 12;
        collapsedShape.height = 12;
        collapsedShape.style.fill = 'black';
        collapsedShape.style.strokeColor = node.style.strokeColor;
        collapsedShape.margin.bottom = 5;
        collapsedShape.horizontalAlignment = 'Left';
        collapsedShape.verticalAlignment = 'Bottom';
        collapsedShape.setOffsetWithRespectToBounds(0, 1, 'Fraction');
        collapsedShape.relativeMode = 'Point';
        collapsedShape.data = getBpmnShapePathData('collapsedShape');
        collapsedShape.margin.left = x;
        if (subProcess.collapsed === true && !subProcess.processes) {
            collapsedShape.visible = true;
        }
        else {
            collapsedShape.visible = false;
        }
        if (collapsedShape.visible === true) {
            x += 12 + 6;
        }
        subProcessShapes.children.push(collapsedShape);
        if (subProcess.type === 'Event') {
            subprocessNode.style.strokeWidth = 1;
            subprocessNode.style.strokeDashArray = '2 2';
            events = subProcess.events;
            for (var i = 0; i < events.length; i++) {
                event = events[parseInt(i.toString(), 10)];
                this.getBPMNSubEvent(event, node, subProcessShapes);
            }
        }
        // set loop for subprocess
        subProcessLoopShapes = this.getBPMNSubProcessLoopShape(node);
        if (subChildCount === 1) {
            x = area + 8;
        }
        subProcessLoopShapes.margin.left = x;
        if (subProcessLoopShapes.visible === true) {
            x += subChildSpace + iconSpace;
        }
        subProcessShapes.children.push(subProcessLoopShapes);
        // set boundary for subprocess
        subprocessNode.id = node.id + '_boundary';
        if (subProcess.boundary === 'Default') {
            subprocessNode.style.strokeWidth = 1;
            subprocessNode.style.strokeDashArray = '1 0';
        }
        if (subProcess.boundary === 'Call') {
            subprocessNode.style.strokeWidth = 4;
            subprocessNode.style.strokeDashArray = '1 0';
        }
        if (subProcess.boundary === 'Event') {
            subprocessNode.style.strokeWidth = 1;
            subprocessNode.style.strokeDashArray = '2 2';
        }
        //set adhoc for subprocess
        subprocessAdhoc = this.getBPMNAdhocShape(node, subprocessAdhoc, subProcess);
        if (subChildCount === 1) {
            x = area + 8;
        }
        subprocessAdhoc.margin.left = x;
        if (subprocessAdhoc.visible === true) {
            x += subChildSpace + iconSpace;
        }
        subProcessShapes.children.push(subprocessAdhoc);
        //set compensation for subprocess
        var subprocessComp = new PathElement();
        if (subProcess.compensation === true) {
            subprocessComp.visible = true;
        }
        else {
            subprocessComp.visible = false;
        }
        subprocessComp = this.getBPMNCompensationShape(node, subprocessComp);
        if (subChildCount === 1) {
            x = area + 8;
        }
        subprocessComp.margin.left = x;
        if (subprocessComp.visible === true) {
            x += subChildSpace + iconSpace;
        }
        subProcessShapes.children.push(subprocessComp);
        //set style for subprocess
        subProcessShapes.style.strokeColor = 'transparent';
        subProcessShapes.style.strokeWidth = 0;
        subProcessShapes.style.fill = 'transparent';
        return subProcessShapes;
    };
    BpmnDiagrams.prototype.getBPMNSubEvent = function (event, node, container, id) {
        container.children = container.children || [];
        //let eventContainer: Canvas;
        var eventContainer = this.getBPMNEventShape(node, event, true, id);
        this.getBPMNSubprocessEvent(node, eventContainer, event);
        eventContainer.id = id || (node.id + '_subprocessEvents');
        eventContainer.width = event.width || 20;
        eventContainer.height = event.height || 20;
        // set offset for subevents
        eventContainer.setOffsetWithRespectToBounds(event.offset.x, event.offset.y, 'Fraction');
        eventContainer.relativeMode = 'Point';
        //set margin for subevents
        eventContainer.margin = event.margin;
        //set alignment for subevents
        eventContainer.horizontalAlignment = event.horizontalAlignment;
        eventContainer.verticalAlignment = event.verticalAlignment;
        // set style for subevent
        eventContainer.style.fill = 'transparent';
        eventContainer.style.strokeColor = 'transparent';
        eventContainer.style.strokeWidth = 0;
        container.children.push(eventContainer);
    };
    BpmnDiagrams.prototype.getBPMNSubProcessTransaction = function (node, shape, container) {
        var shapeWidth = container.children[0].width;
        var shapeHeight = container.children[0].height;
        var innerRect = new DiagramElement();
        innerRect.margin = { left: 3, right: 0, top: 3, bottom: 0 };
        innerRect.id = node.id + '_0_Subprocess_innnerRect';
        innerRect.cornerRadius = 10;
        innerRect.width = shapeWidth - 6;
        //EJ2-824711 - Fill color is not applied properly for BPMN transaction subProcess. 
        innerRect.style.fill = 'transparent';
        innerRect.height = shapeHeight - 6;
        container.children.push(innerRect);
        var transactionEvents = new Canvas();
        transactionEvents.id = node.id + '_transaction_events';
        transactionEvents.style.gradient = node.style.gradient;
        var transaction = shape.activity.subProcess.transaction;
        this.getBPMNSubEvent(transaction.success, node, transactionEvents, node.id + '_success');
        this.getBPMNSubEvent(transaction.cancel, node, transactionEvents, node.id + '_cancel');
        this.getBPMNSubEvent(transaction.failure, node, transactionEvents, node.id + '_failure');
        this.updateDiagramContainerVisibility(transactionEvents.children[0], transaction.success.visible);
        this.updateDiagramContainerVisibility(transactionEvents.children[1], transaction.cancel.visible);
        this.updateDiagramContainerVisibility(transactionEvents.children[2], transaction.failure.visible);
        transactionEvents.float = true;
        transactionEvents.width = shapeWidth;
        transactionEvents.height = shapeHeight;
        transactionEvents.style.fill = transactionEvents.style.strokeColor = 'transparent';
        container.children.push(transactionEvents);
    };
    /** @private */
    BpmnDiagrams.prototype.getBPMNSubProcessLoopShape = function (node) {
        var shape = node.shape.activity;
        var loopType;
        var subprocessLoop = new PathElement();
        var subprocessLoopData;
        var subProcess = shape.subProcess;
        // eslint-disable-next-line prefer-const
        loopType = subProcess.loop;
        // eslint-disable-next-line prefer-const
        subprocessLoopData = getBpmnLoopShapePathData(loopType);
        if (loopType !== 'None') {
            subprocessLoop.visible = true;
        }
        else {
            subprocessLoop.visible = false;
        }
        subprocessLoop.id = node.id + '_loop';
        subprocessLoop.data = subprocessLoopData;
        subprocessLoop.style.fill = 'black';
        subprocessLoop.width = 12;
        subprocessLoop.height = 12;
        subprocessLoop.horizontalAlignment = 'Left';
        subprocessLoop.verticalAlignment = 'Bottom';
        subprocessLoop.setOffsetWithRespectToBounds(0, 1, 'Fraction');
        subprocessLoop.relativeMode = 'Point';
        subprocessLoop.margin.bottom = 5;
        subprocessLoop.style.fill = 'transparent';
        subprocessLoop.style.strokeColor = node.style.strokeColor;
        return subprocessLoop;
    };
    /** @private */
    BpmnDiagrams.prototype.drag = function (obj, tx, ty, diagram) {
        var node = diagram.nameTable[(obj).processId];
        if (obj.margin.top + ty >= 0) {
            diagram.nodePropertyChange(obj, {}, { margin: { top: obj.margin.top + ty } });
        }
        if (obj.margin.left + tx >= 0) {
            diagram.nodePropertyChange(obj, {}, { margin: { left: obj.margin.left + tx } });
        }
        //const diffX: number = 0;
        //const diffY: number = 0;
        var bound = this.getChildrenBound(node, obj.id, diagram);
        this.updateSubProcessess(bound, obj, diagram);
        node.wrapper.measure(new Size(undefined, undefined));
        node.wrapper.arrange(node.wrapper.desiredSize);
        diagram.refreshCanvasLayers();
        diagram.updateSelector();
        this.updateDocks(obj, diagram);
    };
    /** @private */
    BpmnDiagrams.prototype.dropBPMNchild = function (target, source, diagram) {
        if (source && source.shape.type === 'Bpmn' && target.shape.type === 'Bpmn'
            && ((!isBlazor() && source.shape.shape !== 'TextAnnotation') ||
                (isBlazor() && source.shape.bpmnShape !== 'TextAnnotation'))) {
            var subProcess = diagram.nameTable[target.id].shape.activity.subProcess;
            if (diagram.currentSymbol && target.shape.type === 'Bpmn' && !subProcess.collapsed) {
                source.processId = target.id;
                return;
            }
            subProcess.processes = subProcess.processes || [];
            if (subProcess.processes && subProcess.processes.indexOf(source.id) === -1 && !subProcess.collapsed) {
                subProcess.processes.push(source.id);
                var redoElement = cloneObject(source);
                var sources = diagram.nameTable[source.id].wrapper;
                var targetWrapper = diagram.nameTable[target.id].wrapper;
                sources.margin.top = (sources.offsetY - (sources.actualSize.height / 2))
                    - (target.offsetY - (target.actualSize.height / 2));
                sources.margin.left = (sources.offsetX - (sources.actualSize.width / 2))
                    - (target.offsetX - (target.actualSize.width / 2));
                sources.margin.top = (sources.margin.top < 0) ? 0 : sources.margin.top;
                sources.margin.left = (sources.margin.left < 0) ? 0 : sources.margin.left;
                diagram.nameTable[source.id].processId = target.id;
                targetWrapper.children.push(diagram.nameTable[source.id].wrapper);
                var bound = this.getChildrenBound(target, source.id, diagram);
                this.updateSubProcessess(bound, source, diagram);
                targetWrapper.measure(new Size(undefined, undefined));
                targetWrapper.arrange(targetWrapper.desiredSize);
                diagram.refreshCanvasLayers();
                diagram.updateSelector();
                var edges = [];
                edges = edges.concat(source.outEdges, source.inEdges);
                for (var i = edges.length - 1; i >= 0; i--) {
                    if (diagram.bpmnModule.textAnnotationConnectors.indexOf(diagram.nameTable[edges[parseInt(i.toString(), 10)]]) === -1) {
                        diagram.remove(diagram.nameTable[edges[parseInt(i.toString(), 10)]]);
                    }
                }
                var obj = cloneObject(source);
                var entry = {
                    type: 'PositionChanged', undoObject: { nodes: [redoElement] },
                    redoObject: { nodes: [obj] }, category: 'Internal'
                };
                diagram.addHistoryEntry(entry);
                if (diagram.mode === 'SVG') {
                    if (source.zIndex < target.zIndex) {
                        diagram.updateProcesses(source);
                        this.updateSubprocessNodeIndex(source, diagram, target);
                    }
                }
                this.updateDocks(source, diagram);
            }
        }
    };
    BpmnDiagrams.prototype.updateIndex = function (diagram, source) {
        //let processNode: Node;
        var processNode = source;
        var nodeindex = diagram.getIndex(processNode, processNode.id);
        diagram.nodes.splice(Number(nodeindex), 1);
        processNode.zIndex = diagram.nodes[diagram.nodes.length - 1].zIndex + 1;
        diagram.nodes.push(processNode);
    };
    BpmnDiagrams.prototype.updateSubprocessNodeIndex = function (source, diagram, target) {
        if (source.shape.activity.subProcess.processes
            && source.shape.activity.subProcess.processes.length > 0) {
            for (var i = 0; i < source.shape.activity.subProcess.processes.length; i++) {
                this.updateIndex(diagram, source);
                var processes = source.shape.activity.subProcess.processes[parseInt(i.toString(), 10)];
                if (diagram.nameTable["" + processes].shape.activity.subProcess.processes.length > 0) {
                    this.updateSubprocessNodeIndex(diagram.nameTable["" + processes], diagram, target);
                }
                else {
                    var node = diagram.nameTable[source.shape.activity.subProcess.processes[parseInt(i.toString(), 10)]];
                    this.updateIndex(diagram, node);
                }
            }
        }
        else {
            this.updateIndex(diagram, source);
        }
    };
    /** @private */
    BpmnDiagrams.prototype.updateDocks = function (obj, diagram) {
        if (obj.shape.type === 'Bpmn' && obj.shape.activity.subProcess.processes &&
            !obj.shape.activity.subProcess.collapsed) {
            var processTable = obj.shape.activity.subProcess.processes;
            for (var _i = 0, processTable_1 = processTable; _i < processTable_1.length; _i++) {
                var i = processTable_1[_i];
                var actualObject = diagram.nameTable["" + i];
                if (actualObject) {
                    diagram.updateConnectorEdges(actualObject);
                    actualObject.wrapper.measure(new Size(actualObject.wrapper.width, actualObject.wrapper.height));
                    actualObject.wrapper.arrange(actualObject.wrapper.desiredSize);
                    if (actualObject.shape.activity.subProcess.processes
                        && actualObject.shape.activity.subProcess.processes.length) {
                        this.updateDocks(actualObject, diagram);
                    }
                }
            }
        }
    };
    /** @private */
    BpmnDiagrams.prototype.removeBpmnProcesses = function (currentObj, diagram) {
        var element = diagram.nameTable[currentObj.processId];
        if (currentObj.shape.type === 'Bpmn' && currentObj.shape.activity.subProcess.processes &&
            currentObj.shape.activity.subProcess.processes.length > 0) {
            var processes = currentObj.shape.activity.subProcess.processes;
            for (var j = processes.length - 1; j >= 0; j--) {
                diagram.remove(diagram.nameTable[processes[parseInt(j.toString(), 10)]]);
            }
        }
        if (element) {
            diagram.removeDependentConnector(currentObj);
            var processes = element.shape.activity.subProcess.processes;
            this.removeChildFromBPMN(element.wrapper, currentObj.id);
            var processIndex = processes.indexOf(currentObj.id);
            processes.splice(processIndex, 1);
        }
    };
    /** @private */
    BpmnDiagrams.prototype.removeChildFromBPMN = function (wrapper, name) {
        for (var _i = 0, _a = wrapper.children; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i.id === name) {
                wrapper.children.splice(wrapper.children.indexOf(i), 1);
            }
            else if (i.children) {
                this.removeChildFromBPMN(i, name);
            }
        }
    };
    /** @private */
    BpmnDiagrams.prototype.removeProcess = function (id, diagram) {
        var node = diagram.nameTable["" + id];
        if (node) {
            var parent_1 = diagram.nameTable[node.processId];
            if (parent_1 && parent_1.shape.type === 'Bpmn') {
                var processes = parent_1.shape.activity.subProcess.processes;
                diagram.removeDependentConnector(node);
                this.removeChildFromBPMN(parent_1.wrapper, id);
                var processIndex = processes.indexOf(id);
                processes.splice(processIndex, 1);
                node.processId = '';
                diagram.refreshDiagramLayer();
                diagram.updateSelector();
            }
        }
    };
    /** @private */
    BpmnDiagrams.prototype.addProcess = function (process, parentId, diagram) {
        //let id: string;
        process.id = process.id || randomId();
        var id = process.id;
        var node = diagram.nameTable["" + id];
        if (!node) {
            diagram.add(process);
        }
        process.processId = parentId;
        var parentNode = diagram.nameTable["" + parentId];
        var subProcess = parentNode.shape.activity.subProcess;
        if (node && parentNode && parentNode.shape.type === 'Bpmn' && node.shape.type === 'Bpmn' &&
            subProcess.processes) {
            node.processId = parentId;
            var processes = parentNode.shape.activity.subProcess.processes;
            if (processes.indexOf(id) < 0) {
                processes.push(id);
            }
            parentNode.wrapper.children.push(node.wrapper);
            parentNode.wrapper.measure(new Size());
            parentNode.wrapper.arrange(parentNode.wrapper.desiredSize);
            diagram.bpmnModule.updateDocks(parentNode, diagram);
            diagram.refreshDiagramLayer();
            if (diagram.mode === 'SVG' && (node.shape && node.shape.activity
                && !node.shape.activity.subProcess.processes)) {
                var child = getDiagramElement(parentId + '_groupElement');
                child.appendChild(getDiagramElement(process.id + '_groupElement'));
            }
        }
    };
    /** @private */
    BpmnDiagrams.prototype.getChildrenBound = function (node, excludeChild, diagram) {
        var processes = node.shape.activity.subProcess.processes;
        var bound;
        if (processes && processes.length) {
            for (var _i = 0, processes_1 = processes; _i < processes_1.length; _i++) {
                var i = processes_1[_i];
                if (excludeChild !== i) {
                    if (!bound) {
                        bound = diagram.nameTable["" + i].wrapper.bounds;
                    }
                    else {
                        bound = diagram.nameTable["" + i].wrapper.bounds.uniteRect(bound);
                    }
                }
            }
        }
        return bound || diagram.nameTable["" + excludeChild].wrapper.bounds;
    };
    /** @private */
    BpmnDiagrams.prototype.updateSubProcessess = function (bound, obj, diagram) {
        var diffX;
        var diffY;
        var node = diagram.nameTable[obj.processId];
        var right;
        var bottom;
        var pivot = { x: 0.5, y: 0.5 };
        if ((node.wrapper.bounds.left + obj.margin.left + obj.width) > (node.wrapper.bounds.right)) {
            right = true;
        }
        if ((node.wrapper.bounds.top + obj.margin.top + obj.height) > (node.wrapper.bounds.bottom)) {
            bottom = true;
        }
        if (right) {
            pivot.x = 0;
        }
        if (bottom) {
            pivot.y = 0;
        }
        var actualSize = node.wrapper.actualSize;
        if (right) {
            diffX = (obj.wrapper.margin.left + obj.wrapper.bounds.width) / actualSize.width;
        }
        if (bottom) {
            diffY = (obj.wrapper.margin.top + obj.wrapper.bounds.height) / actualSize.height;
        }
        if (diffX > 0 || diffY > 0) {
            diagram.commandHandler.scale(diagram.nameTable[obj.processId], diffX || 1, diffY || 1, pivot);
        }
    };
    /** @private */
    BpmnDiagrams.prototype.getBPMNCompensationShape = function (node, compensationNode) {
        compensationNode.id = node.id + '_0_compensation';
        compensationNode.width = 12;
        compensationNode.height = 12;
        compensationNode.margin.bottom = 5;
        compensationNode.style.fill = 'transparent';
        compensationNode.style.strokeColor = node.style.strokeColor;
        compensationNode.horizontalAlignment = 'Left';
        compensationNode.verticalAlignment = 'Bottom';
        compensationNode.relativeMode = 'Object';
        compensationNode.data = 'M 22.462 18.754 l -6.79 3.92 l 6.79 3.92 V 22.89 l 6.415 3.705 v -7.841 l -6.415 3.705 V 18.754 Z' +
            ' M 28.331 19.701 v 5.947 l -5.149 -2.973 L 28.331 19.701 Z M 21.916 25.647 l -5.15 -2.973 l 5.15 -2.973 V 25.647 Z' +
            ' M 22.275 12.674 c -5.513 0 -9.999 4.486 -9.999 9.999 c 0 5.514 4.486 10.001 9.999 10.001' +
            ' c 5.514 0 9.999 -4.486 9.999 -10.001 C 32.274 17.16 27.789 12.674 22.275 12.674 Z M 22.275 32.127 ' +
            ' c -5.212 0 -9.453 -4.241 -9.453 -9.454 c 0 -5.212 4.241 -9.453 9.453 -9.453 c 5.212 0 9.453 4.241 9.453 9.453' +
            ' C 31.728 27.887 27.487 32.127 22.275 32.127 Z';
        return compensationNode;
    };
    /** @private */
    BpmnDiagrams.prototype.getBPMNActivityShape = function (node) {
        var eventshape = new Canvas();
        var content;
        var shape = node.shape.activity;
        var task = shape.activity;
        var subProcess = shape.subProcess;
        var activityType = shape.activity;
        if (task === 'Task') {
            content = this.getBPMNTaskShape(node);
        }
        if (task === 'SubProcess' && subProcess) {
            content = this.getBPMNSubProcessShape(node);
        }
        content.id = task + node.id;
        eventshape.children = [content];
        eventshape.style.fill = 'transparent';
        eventshape.style.strokeColor = 'transparent';
        eventshape.style.strokeWidth = 0;
        return eventshape;
    };
    /** @private */
    BpmnDiagrams.prototype.getBPMNSubprocessEvent = function (node, subProcessEventsShapes, events) {
        var annotations;
        var ports;
        if (events.annotations.length !== 0) {
            for (var i = 0; i < events.annotations.length; i++) {
                var annot = events.annotations[parseInt(i.toString(), 10)];
                annotations = node.initAnnotationWrapper(annot);
                annotations.width = events.width;
                annotations.height = events.height;
                subProcessEventsShapes.children.push(annotations);
            }
        }
        if (events.ports.length !== 0) {
            for (var i = 0; i < events.ports.length; i++) {
                var port = events.ports[parseInt(i.toString(), 10)];
                ports = node.initPortWrapper(port);
                subProcessEventsShapes.children.push(ports);
            }
        }
    };
    /** @private */
    BpmnDiagrams.prototype.getBPMNAdhocShape = function (node, adhocNode, subProcess) {
        adhocNode.id = node.id + '_0_adhoc';
        adhocNode.width = 12;
        adhocNode.height = 8;
        adhocNode.style.fill = 'black';
        adhocNode.style.strokeColor = node.style.strokeColor;
        adhocNode.margin.bottom = 5;
        adhocNode.horizontalAlignment = 'Left';
        adhocNode.verticalAlignment = 'Bottom';
        adhocNode.relativeMode = 'Object';
        adhocNode.data = 'M 49.832 76.811 v -2.906 c 0 0 0.466 -1.469 1.931 -1.5 c 1.465 -0.031 2.331 1.219 2.897 1.688 ' +
            's 1.06 0.75 1.526 0.75 c 0.466 0 1.548 -0.521 1.682 -1.208 s 0.083 3.083 0.083 3.083 s -0.76 0.969 -1.859 0.969 ' +
            'c -1.066 0 -1.865 -0.625 -2.464 -1.438 s -1.359 -0.998 -2.064 -0.906 C 50.598 75.467 49.832 76.811 49.832 76.811 Z';
        if (subProcess && subProcess.adhoc === true) {
            adhocNode.visible = true;
        }
        else {
            adhocNode.visible = false;
        }
        return adhocNode;
    };
    /** @private */
    BpmnDiagrams.prototype.getBPMNTextAnnotation = function (node, diagram, annotation, content) {
        annotation.id = annotation.id || randomId();
        annotation.nodeId = node.id;
        var annotationContainer = new Canvas();
        var annotationPath = new PathElement();
        var textElement = new TextElement();
        var margin = 10;
        annotationPath.id = node.id + '_' + annotation.id + '_path';
        annotationPath.width = annotation.width;
        annotationPath.height = annotation.height;
        annotationPath.relativeMode = 'Object';
        textElement.id = node.id + '_' + annotation.id + '_text';
        textElement.content = annotation.text;
        var style = node.style;
        textElement.style = {
            fontSize: style.fontSize, italic: style.italic, gradient: null, opacity: style.opacity,
            bold: style.bold, textWrapping: style.textWrapping, color: style.color, fill: 'white',
            fontFamily: style.fontFamily, whiteSpace: style.whiteSpace, textOverflow: 'Wrap',
            strokeColor: 'none', strokeWidth: 0,
            strokeDashArray: style.strokeDashArray, textAlign: style.textAlign, textDecoration: style.textDecoration
        };
        textElement.horizontalAlignment = 'Center';
        textElement.verticalAlignment = 'Center';
        textElement.relativeMode = 'Object';
        textElement.margin = { left: 5, right: 5, top: 5, bottom: 5 };
        annotationContainer.offsetX = node.offsetX + annotation.length *
            Math.cos(annotation.angle * (Math.PI / 180));
        annotationContainer.offsetY = node.offsetY + annotation.length *
            Math.sin(annotation.angle * (Math.PI / 180));
        annotationContainer.float = true;
        annotationContainer.transform = Transform.Self;
        annotationContainer.id = node.id + '_textannotation_' + annotation.id;
        annotationContainer.style.strokeColor = 'transparent';
        annotationContainer.margin = { left: margin, right: margin, top: margin, bottom: margin };
        annotationContainer.relativeMode = 'Object';
        annotationContainer.rotateAngle = 0;
        annotationContainer.children = [annotationPath, textElement];
        var annotationNode = new Node(node.shape, 'annotations', { id: annotationContainer.id, shape: { type: 'Bpmn', shape: 'TextAnnotation' } }, true);
        annotationNode.ports = [
            {
                id: annotationPath.id + '_port', shape: 'Square',
                offset: { x: 0, y: 0.5 }
            }
        ];
        annotationNode.offsetX = annotationContainer.offsetX;
        annotationNode.offsetY = annotationContainer.offsetY;
        annotationNode.text = annotation.text;
        annotationNode.angle = annotation.angle;
        annotationNode.length = annotation.length;
        annotationNode.width = annotation.width;
        annotationNode.height = annotation.height;
        annotationNode.wrapper = annotationContainer;
        annotationContainer.children.push(annotationNode.initPortWrapper(annotationNode.ports[0]));
        var bounds = new Rect(0, 0, 0, 0);
        var width = node.width || node.minWidth || 0;
        var height = node.height || node.minHeight || 0;
        if (width !== undefined && height !== undefined) {
            bounds = new Rect(node.offsetX - width / 2, node.offsetY - height / 2, width, height);
        }
        this.setAnnotationPath(bounds, annotationContainer, { x: annotationNode.offsetX, y: annotationNode.offsetY }, annotationNode, annotation.length, annotation.angle);
        var connector = {
            id: node.id + '_' + annotation.id + '_connector',
            constraints: ConnectorConstraints.Default & ~(ConnectorConstraints.DragTargetEnd | ConnectorConstraints.Drag),
            sourceID: node.id, targetID: annotationContainer.id,
            targetDecorator: { shape: 'None' }
        };
        var annotationConnector = new Connector(node.shape, 'annotations', connector, true);
        annotationConnector.targetPortID = annotationNode.ports[0].id;
        annotationConnector.init(diagram);
        annotationConnector.wrapper.float = false;
        annotationConnector.wrapper.transform = Transform.Self;
        content.children.push(annotationConnector.wrapper);
        annotationConnector.zIndex = 10000;
        var entry = this.annotationObjects[node.id];
        if (!entry) {
            entry = {};
        }
        if (!entry[annotation.id]) {
            entry[annotation.id] = {};
        }
        var nodeKey = 'node';
        var connKey = 'connector';
        entry[annotation.id]["" + nodeKey] = annotationNode;
        entry[annotation.id]["" + connKey] = annotationConnector;
        this.annotationObjects[node.id] = entry;
        diagram.initObject(annotationNode, undefined, false);
        annotationNode.zIndex = 10000;
        return annotationContainer;
    };
    /** @private */
    BpmnDiagrams.prototype.renderBPMNTextAnnotation = function (diagram, annotation, content) {
        annotation.id = annotation.id || randomId();
        var annotationsContainer = new Canvas();
        var annotationPath = new PathElement();
        var textObject = new TextElement();
        var margin = 10;
        annotationPath.id = '_' + annotation.id + '_path';
        annotationPath.width = annotation.width;
        annotationPath.height = annotation.height;
        annotationPath.relativeMode = 'Object';
        textObject.id = annotation.id + '_text';
        textObject.content = annotation.shape.annotation.text;
        var textStyle = annotation.style;
        textObject.style = {
            fontSize: textStyle.fontSize, italic: textStyle.italic, gradient: null, opacity: textStyle.opacity,
            bold: textStyle.bold, textWrapping: textStyle.textWrapping, color: textStyle.color, fill: 'white',
            fontFamily: textStyle.fontFamily, whiteSpace: textStyle.whiteSpace, textOverflow: 'Wrap',
            strokeColor: 'none', strokeWidth: 0,
            strokeDashArray: textStyle.strokeDashArray, textAlign: textStyle.textAlign, textDecoration: textStyle.textDecoration
        };
        textObject.horizontalAlignment = 'Left';
        textObject.verticalAlignment = 'Center';
        textObject.relativeMode = 'Object';
        textObject.margin = { left: 5, right: 5, top: 5, bottom: 5 };
        annotationsContainer.offsetX = annotation.offsetX + annotation.shape.annotation.length *
            Math.cos(annotation.shape.annotation.angle * (Math.PI / 180));
        annotationsContainer.offsetY = annotation.offsetY + annotation.shape.annotation.length *
            Math.sin(annotation.shape.annotation.angle * (Math.PI / 180));
        annotationsContainer.float = true;
        //    annotationContainer.transform = Transform.Self;
        annotationsContainer.id = annotation.id + '_textannotation_' + annotation.id;
        annotationsContainer.style.strokeColor = 'transparent';
        annotationsContainer.margin = { left: margin, right: margin, top: margin, bottom: margin };
        annotationsContainer.relativeMode = 'Object';
        annotationsContainer.rotateAngle = 0;
        annotationsContainer.children = [annotationPath, textObject];
        var annotationObject = new Node(annotation.shape, 'annotations', { id: annotationsContainer.id, shape: { type: 'Bpmn', shape: 'TextAnnotation' } }, true);
        annotationObject.ports = [
            {
                id: annotationPath.id + '_port', shape: 'Square',
                offset: { x: 0, y: 0.5 }
            }
        ];
        annotationObject.offsetX = annotationsContainer.offsetX;
        annotationObject.offsetY = annotationsContainer.offsetY;
        if (annotationObject.shape && annotationObject.shape.annotation) {
            annotationObject.text = annotation.shape.annotation.text;
            annotationObject.angle = annotation.shape.annotation.angle;
            annotationObject.length = annotation.shape.annotation.length;
        }
        annotationObject.width = annotation.width;
        annotationObject.height = annotation.height;
        annotationObject.wrapper = annotationsContainer;
        annotationsContainer.children.push(annotationObject.initPortWrapper(annotationObject.ports[0]));
        var bounds = new Rect(0, 0, 0, 0);
        var width = annotation.width || 0;
        var height = annotation.height || 0;
        if (width !== undefined && height !== undefined) {
            bounds = new Rect(annotation.offsetX - width / 2, annotation.offsetY - height / 2, width, height);
        }
        this.setAnnotationPath(bounds, annotationsContainer, { x: annotationObject.offsetX, y: annotationObject.offsetY }, annotationObject, annotation.length, annotation.angle);
        return annotationsContainer;
    };
    /** @private */
    BpmnDiagrams.prototype.getTextAnnotationWrapper = function (node, id) {
        if (node && node.shape.type === 'Bpmn') {
            var shape = (isBlazor() ? node.shape.bpmnShape : node.shape.shape);
            if (shape === 'TextAnnotation') {
                return node.wrapper.children[1];
            }
            else if (this.annotationObjects[node.id] && this.annotationObjects[node.id]["" + id]) {
                var annotationNode = this.annotationObjects[node.id]["" + id].node;
                return this.getTextAnnotationWrapper(annotationNode, id);
            }
        }
        return null;
    };
    /** @private */
    BpmnDiagrams.prototype.addAnnotation = function (node, annotation, diagram) {
        var bpmnShapeContent = node.wrapper.children[0];
        var shape = node.shape;
        annotation.nodeId = node.id;
        var annotationObj = new BpmnAnnotation(shape, 'annotations', annotation, true);
        shape.annotations.push(annotationObj);
        bpmnShapeContent.children.push(this.getBPMNTextAnnotation(node, diagram, annotation, bpmnShapeContent));
        node.wrapper.measure(new Size());
        node.wrapper.arrange(node.wrapper.desiredSize);
        return this.annotationObjects[node.id][annotation.id].connector;
    };
    BpmnDiagrams.prototype.clearAnnotations = function (obj, diagram) {
        var bpmnShape = obj.shape;
        if (bpmnShape.annotations.length) {
            for (var i = bpmnShape.annotations.length - 1; i >= 0; i--) {
                var annotation = bpmnShape.annotations[parseInt(i.toString(), 10)];
                this.removeAnnotationObjects(obj, annotation, diagram);
            }
        }
        delete this.annotationObjects[obj.id];
    };
    /** @private */
    BpmnDiagrams.prototype.checkAndRemoveAnnotations = function (node, diagram) {
        //remove connector path
        //remove annotation node wrapper
        //remove from a quad
        if (node.shape.type === 'Bpmn') {
            if ((!isBlazor() && node.shape.shape === 'TextAnnotation') ||
                (isBlazor() && node.shape.bpmnShape === 'TextAnnotation')) {
                var id = node.id.split('_');
                var annotationId = id[id.length - 1];
                var nodeId = id[id.length - 3] || id[0];
                var parentNode = diagram.nameTable["" + nodeId];
                var bpmnShape = parentNode.shape;
                for (var _i = 0, _a = bpmnShape.annotations; _i < _a.length; _i++) {
                    var annotation = _a[_i];
                    if (annotation.id === annotationId) {
                        var index = bpmnShape.annotations.indexOf(annotation);
                        if (index !== -1) {
                            diagram.removeDependentConnector(node);
                            this.removeAnnotationObjects(parentNode, annotation, diagram);
                            return true;
                        }
                    }
                }
            }
            else if (node.shape.annotations && node.shape.annotations.length) {
                this.clearAnnotations(node, diagram);
            }
        }
        return false;
    };
    BpmnDiagrams.prototype.removeAnnotationObjects = function (parentNode, annotation, diagram) {
        var bpmnShape = parentNode.shape;
        var index = bpmnShape.annotations.indexOf(annotation);
        if (index !== -1) {
            if (!(diagram.diagramActions & DiagramAction.UndoRedo) && !(diagram.diagramActions & DiagramAction.Group)) {
                var entry_1 = {
                    type: 'CollectionChanged', changeType: 'Remove', undoObject: cloneObject(annotation),
                    redoObject: cloneObject(annotation), category: 'Internal'
                };
                diagram.addHistoryEntry(entry_1);
            }
            bpmnShape.annotations.splice(index, 1);
            var entry = this.annotationObjects[parentNode.id];
            if (entry && entry[annotation.id]) {
                var annotationNode = entry[annotation.id].node;
                var annotationConnector = entry[annotation.id].connector;
                diagram.removeElements(annotationNode);
                diagram.removeElements(annotationConnector);
                var nodeContent = parentNode.wrapper.children[0];
                index = nodeContent.children.indexOf(annotationNode.wrapper);
                nodeContent.children.splice(index, 1);
                index = nodeContent.children.indexOf(annotationConnector.wrapper);
                nodeContent.children.splice(index, 1);
                diagram.removeFromAQuad(annotationNode);
                diagram.removeFromAQuad(annotationConnector);
                delete diagram.nameTable[annotationNode.id];
                delete diagram.nameTable[annotationConnector.id];
                delete entry[annotation.id];
            }
        }
    };
    BpmnDiagrams.prototype.setAnnotationPath = function (parentBounds, wrapper, position, node, length, angle) {
        var rotateAngle = this.getAnnotationPathAngle(position, parentBounds);
        var data = '';
        var pathElement = wrapper.children[0];
        var portElement = wrapper.children[2];
        var textElement = wrapper.children[1];
        pathElement.horizontalAlignment = 'Stretch';
        pathElement.verticalAlignment = 'Stretch';
        textElement.margin.left = textElement.margin.right = 5;
        textElement.margin.top = textElement.margin.bottom = 5;
        var point;
        var segment;
        if (rotateAngle === 0) {
            data = 'M10,20 L0,20 L0,0 L10,0';
            pathElement.width = 10;
            pathElement.horizontalAlignment = 'Left';
            portElement.setOffsetWithRespectToBounds(0, 0.5, 'Fraction');
            textElement.margin.top = textElement.margin.bottom = 10;
            point = parentBounds.middleRight;
            segment = {
                x1: parentBounds.right, y1: parentBounds.top,
                x2: parentBounds.right, y2: parentBounds.bottom
            };
        }
        else if (rotateAngle === 180) {
            data = 'M0,0 L10,0 L10,20 L0,20';
            pathElement.width = 10;
            pathElement.horizontalAlignment = 'Right';
            portElement.setOffsetWithRespectToBounds(1, 0.5, 'Fraction');
            textElement.margin.top = textElement.margin.bottom = 10;
            point = parentBounds.middleLeft;
            segment = {
                x1: parentBounds.left, y1: parentBounds.top,
                x2: parentBounds.left, y2: parentBounds.bottom
            };
        }
        else if (rotateAngle === 90) {
            data = 'M20,10 L20,0 L0,0 L0,10';
            pathElement.height = 10;
            pathElement.verticalAlignment = 'Top';
            portElement.setOffsetWithRespectToBounds(0.5, 0, 'Fraction');
            textElement.margin.left = textElement.margin.right = 10;
            point = parentBounds.bottomCenter;
            segment = {
                x1: parentBounds.right, y1: parentBounds.bottom,
                x2: parentBounds.left, y2: parentBounds.bottom
            };
        }
        else {
            data = 'M0,0 L0,10 L20,10 L20,0';
            pathElement.height = 10;
            pathElement.verticalAlignment = 'Bottom';
            portElement.setOffsetWithRespectToBounds(0.5, 1, 'Fraction');
            textElement.margin.left = textElement.margin.right = 10;
            point = parentBounds.topCenter;
            segment = {
                x1: parentBounds.right, y1: parentBounds.top,
                x2: parentBounds.left, y2: parentBounds.top
            };
        }
        var center = parentBounds.center;
        var endPoint = Point.transform(position, angle, Math.max(parentBounds.width, parentBounds.height));
        point = getIntersectionPoints(segment, [center, endPoint], false, center);
        pathElement.data = data;
        if (length !== undefined && angle !== undefined) {
            point = Point.transform(point, angle, length);
            wrapper.offsetX = node.offsetX = point.x;
            wrapper.offsetY = node.offsetY = point.y;
        }
    };
    /**   @private  */
    BpmnDiagrams.prototype.isBpmnTextAnnotation = function (activeLabel, diagram) {
        if (this.annotationObjects) {
            var parentNodeId = activeLabel.parentId;
            var annotationId = activeLabel.id;
            var parentNode = diagram.nameTable["" + parentNodeId];
            if (parentNode && parentNode.shape.type === 'Bpmn' && this.annotationObjects["" + parentNodeId] &&
                this.annotationObjects["" + parentNodeId]["" + annotationId]) {
                return parentNode;
            }
            return null;
        }
        return null;
    };
    /** @private */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    BpmnDiagrams.prototype.updateTextAnnotationContent = function (parentNode, activeLabel, text, diagram) {
        var parentNodeId = activeLabel.parentId;
        var annotationId = activeLabel.id;
        if (this.annotationObjects["" + parentNodeId] && this.annotationObjects["" + parentNodeId]["" + annotationId]) {
            for (var _i = 0, _a = parentNode.shape.annotations; _i < _a.length; _i++) {
                var annotation = _a[_i];
                if (annotation.id === annotationId) {
                    annotation.text = text;
                    var wrapper = this.annotationObjects["" + parentNodeId]["" + annotationId].node.wrapper.children[1];
                    wrapper.content = text;
                    wrapper.visible = true;
                    parentNode.wrapper.measure(new Size());
                    parentNode.wrapper.arrange(parentNode.wrapper.desiredSize);
                }
            }
        }
    };
    /**   @private  */
    BpmnDiagrams.prototype.updateQuad = function (actualObject, diagram) {
        var annotation = actualObject.shape.annotations;
        var annotationNode;
        if (annotation && annotation.length > 0) {
            for (var i = 0; i < annotation.length; i++) {
                annotationNode = this.annotationObjects[actualObject.id][annotation[parseInt(i.toString(), 10)].id].node;
                diagram.updateQuad(annotationNode);
            }
        }
    };
    /** @private */
    BpmnDiagrams.prototype.updateTextAnnotationProp = function (actualObject, oldObject, diagram, isChild) {
        if (actualObject.shape.type === 'Bpmn') {
            var annotation = actualObject.shape.annotations;
            if (annotation && annotation.length > 0) {
                for (var i = 0; i < actualObject.wrapper.children[0].children.length; i++) {
                    for (var j = 0; j < annotation.length; j++) {
                        var annotationId = actualObject.wrapper.children[0].children[parseInt(i.toString(), 10)].id.split('_');
                        var id = annotationId[annotationId.length - 1];
                        if (id === annotation[parseInt(j.toString(), 10)].id) {
                            var annotationNode = this.annotationObjects[actualObject.id][annotation[parseInt(j.toString(), 10)].id].node;
                            var connector = this.annotationObjects[actualObject.id][annotation[parseInt(j.toString(), 10)].id].connector;
                            var direction = getPortDirection(connector.targetPoint, actualObject.wrapper.bounds, actualObject.wrapper.bounds, false);
                            var position = connector.sourcePoint;
                            // EJ2-63939 - If it is swimlane children node means we take the offsetX from the wrapper.
                            position = {
                                x: connector.sourcePoint.x + (isChild ? actualObject.wrapper.offsetX : actualObject.offsetX) - (oldObject.offsetX),
                                y: connector.sourcePoint.y + (isChild ? actualObject.wrapper.offsetY : actualObject.offsetY) - (oldObject.offsetY)
                            };
                            position = Point.transform(position, annotation[parseInt(j.toString(), 10)].angle, annotation[parseInt(j.toString(), 10)].length);
                            actualObject.wrapper.children[0].children[parseInt(i.toString(), 10)].offsetX =
                                annotationNode.offsetX = position.x;
                            actualObject.wrapper.children[0].children[parseInt(i.toString(), 10)].offsetY =
                                annotationNode.offsetY = position.y;
                            diagram.updateQuad(annotationNode);
                        }
                    }
                }
            }
        }
    };
    // /** @private */
    // public findInteractableObject(obj: ConnectorModel, diagram: Diagram): NodeModel | ConnectorModel {
    //     if (obj.targetID) {
    //         let targetNode: NodeModel = diagram.nameTable[obj.targetID];
    //         if (targetNode.shape.type === 'Bpmn' && (targetNode.shape as BpmnShape).shape === 'TextAnnotation') {
    //             return targetNode;
    //         }
    //     }
    //     return obj;
    // }
    /** @private */
    BpmnDiagrams.prototype.getSubprocessChildCount = function (node) {
        var count = 0;
        var shape = node.shape.activity;
        //let loopType: string;
        var subProcess = shape.subProcess;
        var loopType = subProcess.loop;
        if (loopType !== undefined && loopType !== 'None') {
            count++;
        }
        if ((subProcess.compensation !== undefined) &&
            subProcess.compensation === true) {
            count++;
        }
        if ((subProcess.collapsed !== undefined) &&
            subProcess.collapsed === true) {
            count++;
        }
        if ((subProcess.adhoc !== undefined) &&
            subProcess.adhoc === true) {
            count++;
        }
        return count;
    };
    /** @private */
    BpmnDiagrams.prototype.getTaskChildCount = function (node) {
        var count = 0;
        var shape = node.shape.activity;
        var task = shape.task;
        var loopType;
        if ((task.compensation !== undefined) &&
            task.compensation === true) {
            count++;
        }
        if ((task.loop !== undefined) &&
            task.loop !== 'None') {
            count++;
        }
        return count;
    };
    /** @private */
    BpmnDiagrams.prototype.setStyle = function (child, node) {
        //set style
        child.style.fill = node.style.fill;
        child.style.strokeColor = node.style.strokeColor;
        child.style.strokeWidth = node.style.strokeWidth;
        child.style.strokeDashArray = node.style.strokeDashArray;
        child.style.opacity = node.style.opacity;
        child.style.gradient = node.style.gradient;
        if ((node.constraints & NodeConstraints.Shadow) !== 0) {
            child.shadow = node.shadow;
        }
    };
    //End code conversion region
    //Update BPMN Shapes on NodePropertyChange
    //Start region
    /** @private */
    BpmnDiagrams.prototype.updateBPMN = function (changedProp, oldObject, actualObject, diagram) {
        var newShape = changedProp.shape || {};
        var elementWrapper = actualObject.wrapper.children[0];
        var actualShape = actualObject.shape.shape ||
            (actualObject.shape.bpmnShape);
        var sizeChanged = changedProp.width !== undefined || changedProp.height !== undefined;
        if (((isBlazor() && newShape.bpmnShape === 'Gateway') || newShape.shape === 'Gateway') &&
            newShape.gateway) {
            this.removeBPMNElementFromDOM(actualObject, diagram);
            actualObject.wrapper.children[0] = this.getBPMNGatewayShape(actualObject);
        }
        else if (((isBlazor() && newShape.bpmnShape === 'DataObject') || newShape.shape === 'DataObject') &&
            newShape.dataObject) {
            this.removeBPMNElementFromDOM(actualObject, diagram);
            actualObject.wrapper.children[0] = this.getBPMNDataObjectShape(actualObject);
        }
        else if (((isBlazor() && newShape.bpmnShape === 'Activity') || newShape.shape === 'Activity') &&
            newShape.activity) {
            this.removeBPMNElementFromDOM(actualObject, diagram);
            actualObject.wrapper.children[0] = this.getBPMNActivityShape(actualObject);
        }
        /**
         * EJ2-EJ2-60644 - Bpmn event fill color does not applied while changing event in runtime.
         */
        else if (((isBlazor() && newShape.bpmnShape === 'Event' ||
            actualObject.shape.bpmnShape === 'Event' || actualObject.shape.shape === 'Event') || newShape.shape === 'Event') &&
            newShape.event) {
            this.removeBPMNElementFromDOM(actualObject, diagram);
            var shapeEvent = newShape.event;
            actualObject.wrapper.children[0] = this.getBPMNEventShape(actualObject, shapeEvent);
        }
        else if (((isBlazor() && newShape.bpmnShape === 'Message') || newShape.shape === 'Message') ||
            ((isBlazor() && newShape.bpmnShape === 'DataSource') || newShape.shape === 'DataSource')) {
            this.removeBPMNElementFromDOM(actualObject, diagram);
            actualObject.wrapper.children[0] = this.getBPMNShapes(actualObject);
            //}
            // else if (newShape.shape === 'Group') {
            //     actualObject.wrapper.children[0] = this.getBPMNGroup(actualObject, diagram);
        }
        else if (newShape.gateway !== undefined || (actualShape === 'Gateway' && sizeChanged)) {
            this.updateBPMNGateway(actualObject, changedProp);
        }
        else if (newShape.dataObject !== undefined || (actualShape === 'DataObject' && sizeChanged)) {
            this.updateBPMNDataObject(actualObject, changedProp, oldObject);
        }
        else if (newShape.activity !== undefined || (actualShape === 'Activity' && sizeChanged)) {
            this.updateBPMNActivity(actualObject, changedProp, oldObject, diagram);
        }
        else if (newShape.event !== undefined || (actualShape === 'Event' && sizeChanged)) {
            this.updateBPMNEvent(actualObject, changedProp, oldObject);
        }
        actualObject.wrapper.children[0].id = actualObject.wrapper.children[0].id || elementWrapper.id;
        if (changedProp.style) {
            updateStyle(changedProp.style, elementWrapper instanceof Container ? ((!isBlazor() && actualObject.shape.shape === 'Activity' ||
                (isBlazor() && actualObject.shape.bpmnShape === 'Activity'))) ?
                elementWrapper.children[0].children[0] :
                elementWrapper.children[0] : elementWrapper);
            if (changedProp.style && changedProp.style.strokeColor) {
                if (elementWrapper.children.length > 0) {
                    if (((!isBlazor() && actualObject.shape.shape === 'Activity') ||
                        (isBlazor() && actualObject.shape.bpmnShape === 'Activity')) &&
                        actualObject.shape.activity.activity === 'SubProcess') {
                        var child = elementWrapper.children[0];
                        this.updateBPMNStyle(child, changedProp.style.strokeColor);
                    }
                    else if (((!isBlazor() && actualObject.shape.shape === 'Gateway')
                        || (isBlazor() && actualObject.shape.bpmnShape === 'Gateway')) ||
                        ((!isBlazor() && actualObject.shape.shape === 'Event')
                            || (isBlazor() && actualObject.shape.bpmnShape === 'Event'))) {
                        this.updateBPMNStyle(elementWrapper, changedProp.style.strokeColor);
                    }
                }
            }
        }
    };
    /**
    * EJ2-60574 -BPMN shape do not get changed at runtime properly
    */
    BpmnDiagrams.prototype.removeBPMNElementFromDOM = function (actualObject, diagram) {
        for (var _i = 0, _a = diagram.views; _i < _a.length; _i++) {
            var elementId = _a[_i];
            removeElement(actualObject.id + '_groupElement', elementId);
        }
    };
    /** @private */
    BpmnDiagrams.prototype.updateBPMNStyle = function (elementWrapper, changedProp) {
        for (var i = 0; i < elementWrapper.children.length; i++) {
            var child = elementWrapper.children[parseInt(i.toString(), 10)];
            updateStyle({ strokeColor: changedProp }, child);
        }
    };
    /** @private */
    BpmnDiagrams.prototype.updateBPMNGateway = function (node, changedProp) {
        var bpmnShape = node.shape;
        var elementWrapper = node.wrapper.children[0];
        if (bpmnShape) {
            updateStyle(node.style, elementWrapper.children[0]);
            var pathData = getBpmnGatewayShapePathData(bpmnShape.gateway.type);
            var dataobjTypeNode = this.updateGatewaySubType(elementWrapper, node, pathData);
            removeElement(elementWrapper.children[1].id);
            elementWrapper.children.splice(1, 1);
            elementWrapper.children.push(dataobjTypeNode);
        }
        if (changedProp.width !== undefined || changedProp.height !== undefined) {
            this.setSizeForBPMNGateway(node.shape.gateway, elementWrapper, changedProp.width || node.width, changedProp.height || node.height);
        }
    };
    /**
     * Used to update Bpmn gateway child in runtime
     * EJ2-60581
     * @param elementWrapper
     * @param node
     * @param pathData
     * @returns
     */
    BpmnDiagrams.prototype.updateGatewaySubType = function (elementWrapper, node, pathData) {
        var dataobjTypeNode = new PathElement();
        dataobjTypeNode.id = node.id + '_1_gatewayType';
        dataobjTypeNode.width = elementWrapper.children[1].width;
        dataobjTypeNode.height = elementWrapper.children[1].height;
        dataobjTypeNode.margin.left = elementWrapper.children[1].margin.left;
        dataobjTypeNode.margin.top = elementWrapper.children[1].margin.top;
        dataobjTypeNode.data = pathData;
        dataobjTypeNode.offsetX = elementWrapper.children[1].offsetX;
        dataobjTypeNode.offsetY = elementWrapper.children[1].offsetY;
        dataobjTypeNode.style = elementWrapper.children[1].style;
        dataobjTypeNode.horizontalAlignment = elementWrapper.children[1].horizontalAlignment;
        dataobjTypeNode.verticalAlignment = elementWrapper.children[1].verticalAlignment;
        dataobjTypeNode.relativeMode = elementWrapper.children[1].relativeMode;
        dataobjTypeNode.transform = elementWrapper.children[1].transform;
        return dataobjTypeNode;
    };
    /** @private */
    BpmnDiagrams.prototype.updateBPMNDataObject = function (node, newObject, oldObject) {
        var bpmnShape = newObject.shape;
        var elementWrapper = node.wrapper.children[0];
        if (bpmnShape) {
            var elementWrapperChild1 = elementWrapper.children[1];
            var elementWrapperChild2 = elementWrapper.children[2];
            if (newObject.style !== undefined) {
                updateStyle(newObject.style, elementWrapper.children[0]);
                elementWrapperChild1.style.opacity = node.style.opacity;
                elementWrapperChild2.style.opacity = node.style.opacity;
            }
            if (bpmnShape.dataObject) {
                switch (bpmnShape.dataObject.type) {
                    case 'None':
                        elementWrapperChild1.visible = false;
                        break;
                    case 'Input':
                        elementWrapperChild1.style.fill = 'white';
                        break;
                    case 'Output':
                        elementWrapperChild1.style.fill = 'black';
                        break;
                }
                if (oldObject.shape.dataObject.type === 'None') {
                    elementWrapperChild1.visible = true;
                }
                if (newObject.shape.dataObject.collection !== undefined) {
                    elementWrapperChild2.visible = bpmnShape.dataObject.collection;
                }
            }
        }
        if (newObject.width !== undefined || newObject.height !== undefined) {
            this.setSizeForBPMNDataObjects(node.shape.dataObject, elementWrapper, newObject.width || node.width, newObject.height || node.height);
        }
    };
    /** @private */
    BpmnDiagrams.prototype.getEvent = function (node, oldObject, event, child0, child1, child2) {
        switch (event) {
            case 'Start':
                child1.visible = false;
                child0.style.strokeDashArray = '';
                child2.style.fill = 'white';
                child2.style.strokeColor = 'black';
                child0.style.fill = 'white';
                break;
            case 'NonInterruptingStart':
                child0.style.strokeDashArray = '2 3';
                child2.style.fill = 'white';
                child0.style.fill = 'white';
                child2.style.strokeColor = 'black';
                child1.visible = false;
                break;
            case 'Intermediate':
                child0.style.strokeDashArray = '';
                child0.style.fill = 'white';
                child1.style.strokeDashArray = '';
                child0.style.gradient = null;
                child2.style.fill = 'white';
                child2.style.strokeColor = 'black';
                this.updateEventVisibility(oldObject, child1);
                break;
            case 'NonInterruptingIntermediate':
                child0.style.fill = 'white';
                child0.style.gradient = null;
                child2.style.fill = 'white';
                child2.style.strokeColor = 'black';
                child0.style.strokeDashArray = '2 3';
                child1.style.strokeDashArray = '2 3';
                this.updateEventVisibility(oldObject, child1);
                break;
            case 'ThrowingIntermediate':
            case 'End':
                child0.style.fill = event !== 'End' ? 'white' : 'black';
                child0.style.strokeDashArray = '';
                child1.style.strokeDashArray = '';
                child0.style.gradient = null;
                child2.style.fill = 'black';
                this.updateEventVisibility(oldObject, child1);
                child2.style.strokeColor = node.style.fill;
                break;
        }
    };
    /** @private */
    BpmnDiagrams.prototype.updateEventVisibility = function (oldObject, child1) {
        if (oldObject.shape.activity && oldObject.shape.activity.subProcess &&
            oldObject.shape.activity.subProcess.events &&
            oldObject.shape.activity.subProcess.events[0] !== undefined &&
            oldObject.shape.activity.subProcess.events[0].event !== undefined) {
            if (oldObject.shape.activity.subProcess.events[0].event === 'NonInterruptingStart' ||
                oldObject.shape.activity.subProcess.events[0].event === 'Start') {
                child1.visible = true;
            }
        }
        else if (oldObject.shape.event !== undefined) {
            if (oldObject.shape.event.event === 'NonInterruptingStart' ||
                oldObject.shape.event.event === 'Start') {
                child1.visible = true;
            }
        }
    };
    /** @private */
    BpmnDiagrams.prototype.updateBPMNEvent = function (node, newObject, oldObject) {
        var bpmnShape = newObject.shape;
        var trigger;
        var elementWrapper = node.wrapper.children[0];
        if (bpmnShape) {
            var elementWrapperChild0 = elementWrapper.children[0];
            var elementWrapperChild1 = elementWrapper.children[1];
            var elementWrapperChild2 = elementWrapper.children[2];
            //let event: string;
            if (newObject.style !== undefined) {
                updateStyle(node.style, elementWrapper.children[0]);
                if (newObject.style.opacity !== undefined || newObject.style.strokeColor !== undefined) {
                    elementWrapperChild1.style.opacity = node.style.opacity;
                    elementWrapperChild1.style.strokeColor = node.style.strokeColor;
                }
            }
            var event_1 = bpmnShape.event.event;
            trigger = bpmnShape.event.trigger;
            if (event_1 !== undefined) {
                this.getEvent(node, oldObject, event_1, elementWrapperChild0, elementWrapperChild1, elementWrapperChild2);
            }
            if (trigger !== undefined) {
                this.updateBPMNEventTrigger(node, newObject);
            }
        }
        if (newObject.width !== undefined || newObject.height !== undefined || trigger !== undefined) {
            this.setSizeForBPMNEvents(node.shape.event, elementWrapper, newObject.width || node.width, newObject.height || node.height);
        }
    };
    /** @private */
    BpmnDiagrams.prototype.updateBPMNEventTrigger = function (node, newObject) {
        var bpmnShape = node.shape;
        var elementWrapper = node.wrapper.children[0].children[2];
        elementWrapper.canMeasurePath = true;
        if (newObject.style &&
            (newObject.style.strokeColor !== undefined || newObject.style.opacity !== undefined)) {
            updateStyle(node.style, elementWrapper);
        }
        var bpmnshapeTriggerdata = getBpmnTriggerShapePathData(bpmnShape.event.trigger);
        elementWrapper.data = bpmnshapeTriggerdata;
    };
    /** @private */
    BpmnDiagrams.prototype.updateBPMNActivity = function (node, newObject, oldObject, diagram) {
        var bpmnShape = newObject.shape;
        var elementWrapper = node.wrapper.children[0];
        var size = this.getSize(node, elementWrapper.children[0].children[0]);
        if (bpmnShape) {
            var oldProp = oldObject.shape.activity.activity;
            var actualObjectProp = node.shape.activity.activity;
            if ((oldProp === 'SubProcess' || oldProp === 'Task') && (actualObjectProp === 'SubProcess' || actualObjectProp === 'Task')) {
                diagram.removeElements(node);
                node.wrapper.children[0] = this.getBPMNActivityShape(node);
            }
            else {
                if (actualObjectProp === 'Task' && bpmnShape.activity.task !== undefined) {
                    this.updateBPMNActivityTask(node, newObject);
                    var subChildCount = this.getTaskChildCount(node);
                    var x = void 0;
                    var childSpace = subChildCount * 12;
                    var area = size.width / 2 - childSpace;
                    if (subChildCount === 1) {
                        x = area + 8;
                    }
                    else {
                        x = area + (subChildCount - 1) * 8;
                    }
                    if (bpmnShape.activity.task.loop !== undefined) {
                        this.updateBPMNActivityTaskLoop(node, newObject, x, subChildCount, area, 2);
                    }
                }
                if (actualObjectProp === 'SubProcess' && bpmnShape.activity.subProcess !== undefined) {
                    this.updateBPMNActivitySubProcess(node, newObject, oldObject, diagram);
                }
            }
            this.setSizeForBPMNActivity(node.shape.activity, elementWrapper, newObject.width || size.width, newObject.height || size.height, node);
        }
        if (newObject.width !== undefined || newObject.height !== undefined) {
            this.setSizeForBPMNActivity(node.shape.activity, elementWrapper, newObject.width || size.width, newObject.height || size.height, node);
        }
    };
    /** @private */
    BpmnDiagrams.prototype.updateBPMNActivityTask = function (node, newObject) {
        var bpmnShape = newObject.shape;
        var elementWrapper = node.wrapper.children[0].children[0];
        var task = bpmnShape.activity.task;
        for (var i = 0; i < elementWrapper.children.length; i++) {
            if (elementWrapper.children[parseInt(i.toString(), 10)].id === node.id + '_1_taskTypeService') {
                elementWrapper.children.splice(i, 1);
                var element = document.getElementById(node.id + '_1_taskTypeService');
                element.parentNode.removeChild(element);
            }
        }
        if (task.type === 'Receive' || task.type === 'Send') {
            elementWrapper.children[1].height = 14;
        }
        else {
            elementWrapper.children[1].height = 20;
        }
        if (task.type !== undefined) {
            var bpmnshapeTaskdata = getBpmnTaskShapePathData(task.type);
            elementWrapper.children[1].data = bpmnshapeTaskdata;
            for (var i = 0; i < elementWrapper.children.length; i++) {
                if (elementWrapper.children[parseInt(i.toString(), 10)].id === node.id + '_1_tasktType') {
                    elementWrapper.children.splice(i, 1);
                    var element = document.getElementById(node.id + '_1_tasktType');
                    element.parentNode.removeChild(element);
                }
            }
            var taskTypeNode = new PathElement();
            taskTypeNode.id = node.id + '_1_tasktType';
            taskTypeNode.margin.left = 5;
            taskTypeNode.margin.top = 5;
            taskTypeNode.data = bpmnshapeTaskdata;
            taskTypeNode.style.fill = 'transparent';
            taskTypeNode.style.opacity = node.style.opacity;
            /**
            * Used to update the Bpmn activity task type at runtime
            * EJ2-60586
            */
            if (task.type === 'Receive' || task.type === 'Send') {
                taskTypeNode.width = 18;
                taskTypeNode.height = 16;
                if (task.type === 'Send') {
                    taskTypeNode.style.fill = 'black';
                }
                elementWrapper.children.splice(1, 0, taskTypeNode);
            }
            else if (task.type === 'Manual') {
                taskTypeNode.width = 16;
                taskTypeNode.height = 11;
                elementWrapper.children.splice(1, 0, taskTypeNode);
            }
            else if (task.type !== 'Service') {
                taskTypeNode.width = 20;
                taskTypeNode.height = 20;
                elementWrapper.children.splice(1, 0, taskTypeNode);
            }
            else {
                taskTypeNode.width = 20;
                taskTypeNode.height = 20;
                elementWrapper.children.splice(1, 0, taskTypeNode);
                var taskTypeNodeService = new PathElement();
                taskTypeNodeService.id = node.id + '_1_taskTypeService';
                taskTypeNodeService.data = bpmnshapeTaskdata;
                taskTypeNodeService.margin.left = elementWrapper.children[1].margin.left + 9;
                taskTypeNodeService.margin.top = elementWrapper.children[1].margin.top + 9;
                taskTypeNodeService.style.fill = 'white';
                taskTypeNodeService.style.opacity = node.style.opacity;
                elementWrapper.children.splice(2, 0, taskTypeNodeService);
            }
        }
        if (bpmnShape.activity.task.call !== undefined) {
            if (bpmnShape.activity.task.call !== false) {
                elementWrapper.children[0].style.strokeWidth = 4;
            }
            else {
                elementWrapper.children[0].style.strokeWidth = 1;
            }
        }
        if (bpmnShape.activity.task.compensation !== undefined) {
            if (bpmnShape.activity.task.compensation === true) {
                elementWrapper.children[3].visible = true;
            }
            else {
                elementWrapper.children[3].visible = false;
            }
        }
    };
    /** @private */
    BpmnDiagrams.prototype.updateBPMNActivityTaskLoop = function (node, newObject, x, subChildCount, area, start) {
        var bpmnShape = newObject.shape;
        var elementWrapper = node.wrapper.children[0].children[0];
        var activity = bpmnShape.activity;
        var loop;
        var index = 0;
        var bpmnshapeLoopdata;
        if (activity.subProcess !== undefined) {
            var subProcess = activity.subProcess;
            index = (activity.subProcess.type === 'Transaction') ? 2 : 0;
            loop = subProcess.loop;
            bpmnshapeLoopdata = getBpmnLoopShapePathData(loop);
            elementWrapper.children[2 + index].data = bpmnshapeLoopdata;
            elementWrapper.children[2 + index].visible = (loop === 'None') ? false : true;
        }
        else if (activity.task !== undefined && activity.task.loop !== undefined) {
            bpmnshapeLoopdata = getBpmnLoopShapePathData(activity.task.loop);
            elementWrapper.children[2].data = bpmnshapeLoopdata;
            elementWrapper.children[2].visible = (activity.task.loop === 'None') ? false : true;
        }
        this.updateChildMargin(elementWrapper, subChildCount, area, x, start + index);
    };
    /** @private */
    BpmnDiagrams.prototype.updateChildMargin = function (elementWrapper, subChildCount, area, x, start) {
        if (subChildCount === 1) {
            for (var i = start; i < elementWrapper.children.length; i++) {
                if (i !== 2 && elementWrapper.children[parseInt(i.toString(), 10)].visible === true) {
                    elementWrapper.children[parseInt(i.toString(), 10)].margin.left = x;
                    x = area + 8;
                }
            }
        }
        else {
            x = area + (subChildCount - 1) * 8;
            for (var i = start; i < elementWrapper.children.length; i++) {
                if (i !== 2 && elementWrapper.children[parseInt(i.toString(), 10)].visible === true) {
                    elementWrapper.children[parseInt(i.toString(), 10)].margin.left = x;
                    x += 12 + 8;
                }
            }
        }
    };
    /** @private */
    BpmnDiagrams.prototype.updateBPMNActivitySubProcess = function (node, newObject, oldObject, diagram) {
        var bpmnShape = newObject.shape;
        var elementWrapper = node.wrapper.children[0];
        var size = this.getSize(node, elementWrapper.children[0].children[0]);
        var subProcess = bpmnShape.activity.subProcess;
        var subChildCount = this.getSubprocessChildCount(node);
        var x;
        var childSpace = subChildCount * 12;
        var area = size.width / 2 - childSpace;
        if (subChildCount === 1) {
            x = area + 8;
        }
        else {
            x = area + (subChildCount - 1) * 8;
        }
        updateStyle(node.style, elementWrapper.children[0].children[0]);
        if (subProcess.events !== undefined) {
            this.updateBPMNSubProcessEvent(node, newObject, oldObject, diagram);
        }
        if (subProcess.adhoc !== undefined) {
            this.updateBPMNSubProcessAdhoc(node, oldObject, subProcess, x, subChildCount, area);
        }
        if (subProcess.boundary !== undefined) {
            this.updateBPMNSubProcessBoundary(node, subProcess);
        }
        if (subProcess.collapsed !== undefined) {
            this.updateBPMNSubProcessCollapsed(node, oldObject, subProcess, x, subChildCount, area, diagram);
        }
        if (subProcess.compensation !== undefined) {
            this.updateBPMNSubProcessCompensation(node, oldObject, subProcess, x, subChildCount, area);
        }
        if (subProcess.loop !== undefined) {
            this.updateBPMNSubProcessLoop(node, oldObject, subProcess, x, subChildCount, area);
        }
        if (subProcess.transaction !== undefined) {
            this.updateBPMNSubProcessTransaction(node, newObject, oldObject, diagram);
        }
    };
    /** @private */
    BpmnDiagrams.prototype.updateBPMNSubProcessEvent = function (node, newObject, oldObject, diagram) {
        var bpmnShape = newObject.shape;
        var elementWrapper = node.wrapper.children[0];
        var nodeContent = elementWrapper.children[0];
        var index;
        var j = 0;
        var elementWrapperChildLen = elementWrapper.children[0].children.length;
        var subProcess = bpmnShape.activity.subProcess;
        var events;
        var start = 2;
        for (var _i = 0, _a = Object.keys(subProcess.events); _i < _a.length; _i++) {
            var key = _a[_i];
            var eventIndex = Number(key);
            var eventWrapper = nodeContent.children[eventIndex + start];
            var actualEvent = node.shape.activity.subProcess.events[parseInt(eventIndex.toString(), 10)];
            this.updateBPMNSubEvent(node, subProcess.events[parseInt(eventIndex.toString(), 10)], actualEvent, eventWrapper, newObject, oldObject, diagram);
        }
    };
    BpmnDiagrams.prototype.updateBPMNSubEvent = function (node, newEvent, actualEvent, eventWrapper, newObject, oldObject, diagram) {
        var elementWrapper = node.wrapper.children[0];
        var bpmnShape = newObject.shape;
        var child0 = eventWrapper.children[0];
        var child1 = eventWrapper.children[1];
        var child2 = eventWrapper.children[2];
        var eventType;
        var trigger;
        if (newObject.style) {
            if (newObject.style.strokeColor !== undefined || newObject.style.opacity !== undefined) {
                elementWrapper.children[0].children[1].style.strokeColor = newObject.style.strokeColor;
                elementWrapper.children[0].children[1].style.opacity = newObject.style.opacity;
            }
        }
        if (bpmnShape.activity.subProcess !== undefined) {
            eventType = newEvent.event;
            trigger = newEvent.trigger;
        }
        if (eventType !== undefined) {
            this.getEvent(newObject, oldObject, eventType, child0, child1, child2);
        }
        if (trigger !== undefined) {
            if (newObject.style) {
                updateStyle(newObject.style, elementWrapper.children[0]);
            }
            var bpmnshapeTriggerdata = getBpmnTriggerShapePathData(trigger);
            eventWrapper.children[2].data = bpmnshapeTriggerdata;
        }
        if (newEvent.height !== undefined || newEvent.width !== undefined) {
            this.getEventSize(newEvent, eventWrapper);
        }
        if (newEvent.id !== undefined) {
            eventWrapper.id = newEvent.id;
        }
        if (newEvent.margin !== undefined) {
            eventWrapper.margin = newEvent.margin;
        }
        if (newEvent.horizontalAlignment !== undefined) {
            eventWrapper.horizontalAlignment = newEvent.horizontalAlignment;
        }
        if (newEvent.verticalAlignment !== undefined) {
            eventWrapper.verticalAlignment = newEvent.verticalAlignment;
        }
        if (newEvent.offset !== undefined) {
            eventWrapper.setOffsetWithRespectToBounds(actualEvent.offset.x, actualEvent.offset.y, 'Fraction');
            eventWrapper.relativeMode = 'Point';
        }
        if (newEvent.annotations !== undefined) {
            var annotations = void 0;
            var annotation = elementWrapper.children[0].children[2];
            if (eventWrapper.children[3] && eventWrapper.children.length > 3) {
                annotations = eventWrapper.children[3];
                diagram.updateAnnotation(newEvent.annotations[0], annotations, annotation);
            }
        }
        if (newEvent.ports !== undefined) {
            var ports = void 0;
            var port = elementWrapper.children[0].children[2];
            if (eventWrapper.children[4] && eventWrapper.children.length > 4) {
                ports = eventWrapper.children[4];
                diagram.updatePort(newEvent.ports[0], ports, port);
            }
        }
        if (newEvent.visible !== undefined) {
            this.updateDiagramContainerVisibility(eventWrapper, newEvent.visible);
        }
    };
    BpmnDiagrams.prototype.updateBPMNSubProcessTransaction = function (node, newObject, oldObject, diagram) {
        var transaction = newObject.shape.activity.subProcess.transaction;
        var eventContainer = node.wrapper.children[0].children[0].children[2];
        var actualEvent;
        if (transaction.success !== undefined) {
            actualEvent = node.shape.activity.subProcess.transaction.success;
            this.updateBPMNSubEvent(node, transaction.success, actualEvent, eventContainer.children[0], newObject, oldObject, diagram);
        }
        if (transaction.cancel !== undefined) {
            actualEvent = node.shape.activity.subProcess.transaction.cancel;
            this.updateBPMNSubEvent(node, transaction.cancel, actualEvent, eventContainer.children[1], newObject, oldObject, diagram);
        }
        if (transaction.failure !== undefined) {
            actualEvent = node.shape.activity.subProcess.transaction.failure;
            this.updateBPMNSubEvent(node, transaction.failure, actualEvent, eventContainer.children[2], newObject, oldObject, diagram);
        }
        for (var _i = 0, _a = node.outEdges; _i < _a.length; _i++) {
            var edge = _a[_i];
            var connector = diagram.nameTable["" + edge];
            switch (connector.sourcePortID) {
                case 'success':
                    if (transaction.success && transaction.success.visible !== undefined) {
                        diagram.connectorPropertyChange(connector, {}, { sourcePortID: 'success' });
                    }
                    break;
                case 'cancel':
                    if (transaction.cancel && transaction.cancel.visible !== undefined) {
                        diagram.connectorPropertyChange(connector, {}, { sourcePortID: 'cancel' });
                    }
                    break;
                case 'failure':
                    if (transaction.failure && transaction.failure.visible !== undefined) {
                        diagram.connectorPropertyChange(connector, {}, { sourcePortID: 'failure' });
                    }
                    break;
            }
        }
    };
    /** @private */
    BpmnDiagrams.prototype.getEventSize = function (events, wrapperChild) {
        if (events.height !== undefined) {
            wrapperChild.height = events.height;
            wrapperChild.children[0].height = events.height;
            wrapperChild.children[1].height = events.height * 0.85;
            wrapperChild.children[2].height = events.height * 0.54;
        }
        if (events.width !== undefined) {
            wrapperChild.width = events.width;
            wrapperChild.children[0].width = events.width;
            wrapperChild.children[1].width = events.width * 0.85;
            wrapperChild.children[2].width = events.width * 0.54;
        }
    };
    /** @private */
    BpmnDiagrams.prototype.updateBPMNSubProcessAdhoc = function (node, oldObject, subProcess, x, subChildCount, area) {
        var shape = node.shape;
        var elementWrapper = node.wrapper.children[0].children[0];
        var index = (node.shape.activity.subProcess.type === 'Transaction') ? 2 : 0;
        if (subProcess.adhoc === false) {
            elementWrapper.children[3 + index].visible = false;
        }
        else {
            elementWrapper.children[3 + index].visible = true;
        }
        this.updateChildMargin(elementWrapper, subChildCount, area, x, 3 + index);
    };
    /** @private */
    BpmnDiagrams.prototype.updateBPMNSubProcessBoundary = function (node, subProcess) {
        var shape = node.shape;
        var elementWrapper = (node.wrapper.children[0].children[0].children[0]);
        if (subProcess.boundary === 'Default') {
            elementWrapper.style.strokeWidth = 1;
            elementWrapper.style.strokeDashArray = '1 0';
        }
        if (subProcess.boundary === 'Call') {
            elementWrapper.style.strokeWidth = 4;
            elementWrapper.style.strokeDashArray = '1 0';
        }
        if (subProcess.boundary === 'Event') {
            elementWrapper.style.strokeWidth = 1;
            elementWrapper.style.strokeDashArray = '2 2';
        }
    };
    /** @private */
    BpmnDiagrams.prototype.updateElementVisibility = function (node, visible, diagram) {
        if (node.shape.activity.subProcess.processes
            && node.shape.activity.subProcess.processes.length > 0) {
            var processes = node.shape.activity.subProcess.processes;
            for (var j = processes.length - 1; j >= 0; j--) {
                var currentNode = diagram.nameTable[processes[parseInt(j.toString(), 10)]];
                currentNode.visible = visible;
                diagram.updateElementVisibility(currentNode.wrapper, currentNode, visible);
                if (visible) {
                    if ((!isBlazor() && currentNode.shape.shape === 'Event') ||
                        (isBlazor() && currentNode.shape.bpmnShape === 'Event')) {
                        this.setEventVisibility(currentNode, currentNode.wrapper.children[0].children);
                    }
                    if (currentNode.shape.activity.activity === 'SubProcess') {
                        this.setSubProcessVisibility(currentNode);
                    }
                }
                var connectors = currentNode.inEdges.concat(currentNode.outEdges);
                for (var i = connectors.length - 1; i >= 0; i--) {
                    var connector = diagram.nameTable[connectors[parseInt(i.toString(), 10)]];
                    connector.visible = visible;
                    diagram.updateElementVisibility(connector.wrapper, connector, visible);
                }
            }
        }
        if (visible) {
            if ((!isBlazor() && node.shape.shape === 'Event') ||
                (isBlazor() && node.shape.bpmnShape === 'Event')) {
                this.setEventVisibility(node, node.wrapper.children[0].children);
            }
            if (node.shape.activity.activity === 'SubProcess') {
                this.setSubProcessVisibility(node);
            }
            if (node.shape.activity.activity === 'Task' &&
                ((!isBlazor() && node.shape.shape === 'Activity') ||
                    (isBlazor() && node.shape.bpmnShape === 'Activity'))
                && node.shape.activity.subProcess.loop === 'None') {
                node.wrapper.children[0].children[0].children[3].visible = false;
            }
        }
    };
    /** @private */
    BpmnDiagrams.prototype.updateBPMNSubProcessCollapsed = function (node, oldObject, subProcess, x, subChildCount, area, diagram) {
        var eventLength = node.shape.activity.subProcess.events.length;
        var elementWrapper = node.wrapper.children[0].children[0];
        var index = (node.shape.activity.subProcess.type === 'Transaction') ? 3 : 1;
        if (subProcess.collapsed === false) {
            this.updateElementVisibility(node, true, diagram);
            elementWrapper.children[index + eventLength].visible = false;
        }
        else {
            this.updateElementVisibility(node, false, diagram);
            elementWrapper.children[index + eventLength].visible = true;
        }
        this.updateChildMargin(elementWrapper, subChildCount, area, x, 3 + eventLength);
    };
    /** @private */
    BpmnDiagrams.prototype.updateBPMNSubProcessCompensation = function (node, oldObject, subProcess, x, subChildCount, area) {
        var elementWrapper = node.wrapper.children[0].children[0];
        var index = (node.shape.activity.subProcess.type === 'Transaction') ? 2 : 0;
        if (subProcess.compensation === false) {
            elementWrapper.children[4 + index].visible = false;
        }
        else {
            elementWrapper.children[4 + index].visible = true;
        }
        this.updateChildMargin(elementWrapper, subChildCount, area, x, 4 + index);
    };
    /** @private */
    BpmnDiagrams.prototype.updateBPMNSubProcessLoop = function (node, oldObject, subProcess, x, subChildCount, area) {
        this.updateBPMNActivityTaskLoop(node, node, x, subChildCount, area, 1);
    };
    /** @private */
    BpmnDiagrams.prototype.updateBPMNConnector = function (actualObject, oldObject, connection, diagram) {
        var flowType = connection.shape;
        //EJ2-66905 - Changing BPMN flow connectors at runtime is not working properly.
        var flow = actualObject.shape.flow;
        if ((flowType.flow === 'Sequence' || flowType.sequence) && flow === 'Sequence') {
            actualObject = this.getSequence(actualObject, oldObject, connection, diagram);
        }
        if ((flowType.flow === 'Association' || flowType.association) && flow === 'Association') {
            actualObject = this.getAssociation(actualObject, oldObject, connection, diagram);
        }
        if ((flowType.flow === 'Message' || flowType.message) && flow === 'Message') {
            actualObject = this.getMessage(actualObject, oldObject, connection, diagram);
        }
        return actualObject;
    };
    /** @private */
    BpmnDiagrams.prototype.getSequence = function (actualObject, oldObject, connection, diagram) {
        if ((connection.shape.sequence) === 'Normal' || actualObject.shape.sequence === 'Normal') {
            actualObject.targetDecorator.shape = 'Arrow';
            actualObject.sourceDecorator.shape = 'None';
            actualObject.style.strokeDashArray = 'None';
            actualObject.targetDecorator.style.fill = 'black';
            actualObject.targetDecorator.width = 10;
            actualObject.targetDecorator.height = 10;
            diagram.connectorPropertyChange(actualObject, oldObject, {
                targetDecorator: { shape: 'Arrow', style: { fill: 'black' }, height: 10, width: 10 },
                sourceDecorator: { shape: 'None' },
                style: { strokeDashArray: 'None' }
            });
            actualObject.wrapper.children[3].visible = false;
        }
        if ((connection.shape.sequence) === 'Default' || actualObject.shape.sequence === 'Default') {
            actualObject.targetDecorator.shape = 'Arrow';
            actualObject.sourceDecorator.shape = 'None';
            actualObject.style.strokeDashArray = 'None';
            actualObject.targetDecorator.style.fill = 'black';
            actualObject.targetDecorator.width = 10;
            actualObject.targetDecorator.height = 10;
            diagram.connectorPropertyChange(actualObject, oldObject, {
                style: { strokeDashArray: 'None' },
                targetDecorator: { shape: 'Arrow', style: { fill: 'black' }, height: 10, width: 10 },
                sourceDecorator: { shape: 'None' }
            });
            var segment = new PathElement();
            var pathseq = new PathElement();
            var pathseqData = void 0;
            segment = actualObject.getSegmentElement(actualObject, segment);
            var anglePoints = actualObject.intermediatePoints;
            for (var j = 0; j < anglePoints.length - 1; j++) {
                // eslint-disable-next-line no-global-assign
                length = length + actualObject.distance(anglePoints[parseInt(j.toString(), 10)], anglePoints[j + 1]);
                pathseqData = actualObject.findPath(anglePoints[parseInt(j.toString(), 10)], anglePoints[j + 1]);
            }
            var content = new PathElement();
            content.data = pathseqData[0];
            content.id = actualObject.id + '_' + connection.shape.sequence || actualObject.shape.sequence;
            content.offsetX = pathseqData[1].x;
            content.offsetY = pathseqData[1].y;
            content.rotateAngle = 45;
            content.transform = Transform.Self;
            this.removeDomElement(actualObject, diagram, content);
        }
        if ((connection.shape.sequence) === 'Conditional' || actualObject.shape.sequence === 'Conditional') {
            actualObject.sourceDecorator.shape = 'Diamond';
            actualObject.sourceDecorator.width = 20;
            actualObject.sourceDecorator.height = 10;
            actualObject.sourceDecorator.style.fill = 'white';
            actualObject.targetDecorator.style.fill = 'black';
            actualObject.style.strokeDashArray = 'None';
            actualObject.targetDecorator.shape = 'Arrow';
            diagram.connectorPropertyChange(actualObject, oldObject, {
                style: { strokeDashArray: 'None' },
                targetDecorator: { shape: 'Arrow', style: { fill: 'black' }, height: 10, width: 10 },
                sourceDecorator: { shape: 'Diamond', width: 20, height: 10, style: { fill: 'white' } }
            });
            actualObject.wrapper.children[3].visible = false;
        }
        return actualObject;
    };
    /** @private */
    BpmnDiagrams.prototype.getAssociation = function (actualObject, oldObject, connection, diagram) {
        if ((connection.shape.association) === 'Default' || actualObject.shape.association === 'Default') {
            actualObject.sourceDecorator.shape = 'None';
            actualObject.targetDecorator.shape = 'None';
            actualObject.style.strokeDashArray = '2 2';
            diagram.connectorPropertyChange(actualObject, oldObject, {
                style: { strokeDashArray: '2 2' },
                targetDecorator: { shape: 'None' },
                sourceDecorator: { shape: 'None' }
            });
            actualObject.wrapper.children[3].visible = false;
        }
        if ((connection.shape.association) === 'Directional' || actualObject.shape.association === 'Directional') {
            actualObject.sourceDecorator.shape = 'None';
            actualObject.style.strokeDashArray = '2 2';
            actualObject.targetDecorator.shape = 'OpenArrow';
            actualObject.targetDecorator.width = 10;
            actualObject.targetDecorator.height = 10;
            diagram.connectorPropertyChange(actualObject, oldObject, {
                style: { strokeDashArray: '2 2' },
                targetDecorator: { shape: 'OpenArrow', width: 10, height: 10 },
                sourceDecorator: { shape: 'None' }
            });
            actualObject.wrapper.children[3].visible = false;
        }
        if ((connection.shape.association) === 'BiDirectional' || actualObject.shape.association === 'BiDirectional') {
            actualObject.sourceDecorator.shape = 'OpenArrow';
            actualObject.targetDecorator.shape = 'OpenArrow';
            actualObject.sourceDecorator.width = 10;
            actualObject.sourceDecorator.height = 10;
            actualObject.sourceDecorator.style.fill = 'black';
            diagram.connectorPropertyChange(actualObject, oldObject, {
                style: { strokeDashArray: '2 2' },
                targetDecorator: { shape: 'OpenArrow', width: 10, height: 10 },
                sourceDecorator: { shape: 'OpenArrow', width: 10, height: 10, style: { fill: 'black' } }
            });
            actualObject.wrapper.children[3].visible = false;
        }
        return actualObject;
    };
    /** @private */
    BpmnDiagrams.prototype.getMessage = function (actualObject, oldObject, connection, diagram) {
        var segmentOffset = 0.5;
        var angle;
        var pt;
        actualObject.sourceDecorator.shape = 'Circle';
        actualObject.sourceDecorator.width = 10;
        actualObject.targetDecorator.shape = 'Arrow';
        actualObject.sourceDecorator.height = 10;
        actualObject.sourceDecorator.style.fill = 'White';
        actualObject.targetDecorator.style.fill = 'White';
        diagram.connectorPropertyChange(actualObject, oldObject, { sourceDecorator: { shape: 'Circle', style: { fill: 'White' }, width: 10, height: 10 }, targetDecorator: { shape: 'Arrow', style: { fill: 'white' } } });
        var anglePoints = actualObject.intermediatePoints;
        var length = 0;
        for (var j = 0; j < anglePoints.length - 1; j++) {
            /* eslint-disable */
            length = length + actualObject.distance(anglePoints[j], anglePoints[j + 1]);
            /* eslint-enable */
            var offLength = length * segmentOffset;
            if (length >= offLength) {
                angle = findAngle(anglePoints[parseInt(j.toString(), 10)], anglePoints[j + 1]);
                pt = Point.transform(anglePoints[parseInt(j.toString(), 10)], angle, offLength);
            }
        }
        var content = new PathElement();
        actualObject.wrapper.children[0].style.strokeDashArray = ' 4 4';
        actualObject.style.strokeDashArray = '4 4';
        content.id = actualObject.id + '_' + connection.shape.message || actualObject.shape.message;
        content.width = 25;
        content.height = 15;
        content.data = 'M0,0 L19.8,12.8 L40,0 L0, 0 L0, 25.5 L40, 25.5 L 40, 0';
        content.horizontalAlignment = 'Center';
        content.verticalAlignment = 'Center';
        content.transform = Transform.Self;
        content.style.fill = connection.shape.message === 'NonInitiatingMessage' ?
            'lightgrey' : 'white';
        content.offsetX = pt.x;
        content.offsetY = pt.y;
        if ((connection.shape.message !== 'Default' && connection.shape.message !== undefined) || actualObject.shape.message !== 'Default') {
            content.style.fill = (connection.shape.message || actualObject.shape.message) === 'NonInitiatingMessage' ?
                'lightgrey' : 'white';
        }
        else {
            content.visible = false;
        }
        this.removeDomElement(actualObject, diagram, content);
        return actualObject;
    };
    // To remove old wrapper element from dom.
    BpmnDiagrams.prototype.removeDomElement = function (actualObject, diagram, content) {
        for (var _i = 0, _a = diagram.views; _i < _a.length; _i++) {
            var elementId = _a[_i];
            removeElement(actualObject.id + '_groupElement', elementId);
            removeElement(actualObject.id + '_content_groupElement', elementId);
            removeElement(actualObject.id + '_html_element', elementId);
        }
        actualObject.wrapper.children.splice(3, 1);
        actualObject.wrapper.children.splice(3, 0, content);
    };
    //End update Region
    //size updation
    BpmnDiagrams.prototype.setSizeForBPMNEvents = function (event, wrapper, width, height) {
        wrapper.children[0].width = width;
        wrapper.children[0].height = height;
        //child node 1 - event node
        var eventNode = wrapper.children[1];
        eventNode.width = width * 0.85;
        eventNode.height = height * 0.85;
        var triggerNode = wrapper.children[2];
        if (event.trigger === 'Message') {
            triggerNode.width = width * 0.54;
            triggerNode.height = height * 0.4;
        }
        else {
            triggerNode.width = width * 0.5;
            triggerNode.height = height * 0.5;
        }
    };
    /** @private */
    BpmnDiagrams.prototype.updateAnnotationDrag = function (node, diagram, tx, ty) {
        var checkAnnotation = node.id.split('_');
        if (checkAnnotation[1] === 'textannotation') {
            var parentNode = void 0;
            for (var j = 0; j < node.inEdges.length; j++) {
                var connector = diagram.nameTable[node.inEdges[parseInt(j.toString(), 10)]];
                if (connector) {
                    parentNode = diagram.nameTable[connector.sourceID];
                }
                var start = { x: node.offsetX + tx, y: node.offsetY + ty };
                var end = connector.sourcePoint;
                var length_1 = Point.findLength(start, end);
                var angle = Point.findAngle(end, start);
                if (parentNode.shape.annotations) {
                    for (var x = 0; x < (parentNode.shape.annotations).length; x++) {
                        if ((parentNode.shape.annotations)[parseInt(x.toString(), 10)].id === checkAnnotation[checkAnnotation.length - 1]) {
                            (parentNode.shape.annotations[parseInt(x.toString(), 10)]).length = length_1;
                            (parentNode.shape.annotations[parseInt(x.toString(), 10)]).angle = angle;
                            this.setAnnotationPath(parentNode.wrapper.bounds, node.wrapper, start, node);
                            return false;
                        }
                    }
                }
            }
        }
        if (node.processId) {
            this.drag(node, tx, ty, diagram);
            return true;
        }
        return false;
    };
    BpmnDiagrams.prototype.getAnnotationPathAngle = function (point, bounds) {
        var direction = getPortDirection(point, bounds, bounds, false);
        var rotateAngle = 0;
        switch (direction) {
            case 'Right':
                rotateAngle = 0;
                break;
            case 'Left':
                rotateAngle = 180;
                break;
            case 'Bottom':
                rotateAngle = 90;
                break;
            case 'Top':
                rotateAngle = 270;
                break;
        }
        return rotateAngle;
    };
    BpmnDiagrams.prototype.setSizeForBPMNGateway = function (event, wrapper, width, height) {
        wrapper.children[0].width = width;
        wrapper.children[0].height = height;
        wrapper.children[1].width = width * 0.45;
        wrapper.children[1].height = height * 0.45;
    };
    BpmnDiagrams.prototype.setSizeForBPMNDataObjects = function (event, wrapper, width, height) {
        wrapper.children[0].width = width;
        wrapper.children[0].height = height;
    };
    BpmnDiagrams.prototype.setSizeForBPMNActivity = function (activity, wrapper, width, height, node) {
        //child node 1 - event node
        wrapper.children[0].width = width;
        wrapper.children[0].height = height;
        wrapper.children[0].children[0].width = width;
        wrapper.children[0].children[0].height = height;
        if (activity.subProcess.type === 'Transaction') {
            wrapper.children[0].children[1].width = Math.max(width - 6, 1);
            wrapper.children[0].children[1].height = Math.max(height - 6, 1);
            wrapper.children[0].children[2].width = width;
            wrapper.children[0].children[2].height = height;
        }
        var taskNode = new DiagramElement();
        var x;
        var size = this.getSize(node, taskNode);
        var childCount;
        var iconSpace = 4;
        if (activity.activity === 'Task') {
            childCount = this.getTaskChildCount(node);
        }
        else {
            childCount = this.getSubprocessChildCount(node);
        }
        var childSpace = childCount * 12;
        var area = (width || size.width) / 2;
        if (childCount === 1) {
            x = area - 6;
        }
        else {
            x = area - (childSpace / 2) - ((childCount - 1) * iconSpace) / 2;
        }
        for (var i = 0; i < wrapper.children[0].children.length; i++) {
            if (wrapper.children[0].children[parseInt(i.toString(), 10)].visible &&
                (wrapper.children[0].children[parseInt(i.toString(), 10)].id.indexOf('_loop') > -1 ||
                    wrapper.children[0].children[parseInt(i.toString(), 10)].id.indexOf('_0_compensation') > -1 ||
                    wrapper.children[0].children[parseInt(i.toString(), 10)].id.indexOf('_0_adhoc') > -1 ||
                    wrapper.children[0].children[parseInt(i.toString(), 10)].id.indexOf('_0_collapsed') > -1)) {
                wrapper.children[0].children[parseInt(i.toString(), 10)].margin.left = x;
                x += wrapper.children[0].children[parseInt(i.toString(), 10)].actualSize.width + iconSpace;
            }
        }
    };
    BpmnDiagrams.prototype.updateDiagramContainerVisibility = function (element, visible) {
        if (element instanceof Container) {
            for (var i = 0; i < element.children.length; i++) {
                this.updateDiagramContainerVisibility(element.children[parseInt(i.toString(), 10)], visible);
            }
        }
        element.visible = visible;
    };
    /**
     *To destroy the ruler
     *
     * @returns {void} To destroy the ruler
     */
    BpmnDiagrams.prototype.destroy = function () {
        /**
         * Destroys the BpmnDiagrams module
         */
    };
    /**
     * Get module name.
     *
     * @returns {string}   Get module name.
     */
    BpmnDiagrams.prototype.getModuleName = function () {
        /**
         * Returns the module name
         */
        return 'Bpmn';
    };
    return BpmnDiagrams;
}());
export { BpmnDiagrams };
/**
 * getBpmnShapePathData method \
 *
 * @returns { string } getBpmnShapePathData method .\
 * @param {string} shape - provide the shape value.
 *
 * @private
 */
export function getBpmnShapePathData(shape) {
    return bpmnShapes[shape.toString()];
}
/**
 * getBpmnTriggerShapePathData method \
 *
 * @returns { string } getBpmnTriggerShapePathData method .\
 * @param {string} shape - provide the shape value.
 *
 * @private
 */
export function getBpmnTriggerShapePathData(shape) {
    return bpmnTriggerShapes[shape.toString()];
}
/**
 * getBpmnGatewayShapePathData method \
 *
 * @returns { string } getBpmnGatewayShapePathData method .\
 * @param {string} shape - provide the shape value.
 *
 * @private
 */
export function getBpmnGatewayShapePathData(shape) {
    return bpmnGatewayShapes[shape.toString()];
}
/**
 * getBpmnTaskShapePathData method \
 *
 * @returns { string } getBpmnTaskShapePathData method .\
 * @param {string} shape - provide the shape value.
 *
 * @private
 */
export function getBpmnTaskShapePathData(shape) {
    return bpmnTaskShapes[shape.toString()];
}
/**
 * getBpmnLoopShapePathData method \
 *
 * @returns { string } getBpmnLoopShapePathData method .\
 * @param {string} shape - provide the shape value.
 *
 * @private
 */
export function getBpmnLoopShapePathData(shape) {
    return bpmnLoopShapes[shape.toString()];
}
var bpmnShapes = {
    'Event': 'M80.5,12.5 C80.5,19.127417 62.59139,24.5 40.5,24.5 C18.40861,24.5 0.5,19.127417 0.5,12.5' +
        'C0.5,5.872583 18.40861,0.5 40.5,0.5 C62.59139,0.5 80.5,5.872583 80.5,12.5 z',
    'Message': 'M0,0L19.8,12.8L40,0L0,0L0,25.5L40,25.5L40,0z',
    'DataSource': 'M 0 10.6 c 0 5.9 16.8 10.6 37.5 10.6 S 75 16.4 75 10.6 v 0 v 68.9 v -0.1 C 75 85.3 58.2 90 37.5 90 ' +
        'S 0 85.3 0 79.4 l 0 0.1 V 56 V 40.6 L 0 10.6 C 0 4.7 16.8 0 37.5 0 S 75 4.7 75 10.6 S 58.2 21.2 37.5 21.2' +
        'S 0 16.5 0 10.6 l 0 6.7 v -0.2 c 0 5.9 16.8 10.6 37.5 10.6 S 75 22.9 75 17.1 v 6.8 v -0.1 ' +
        'c 0 5.9 -16.8 10.6 -37.5 10.6 S 0 29.6 0 23.8',
    'SubProcess': 'M100,100 h200 a20,20 0 0 1 20,20 v200 a20,20 0 0 1 -20,20 h-200 ' +
        'a20,20 0 0 1 -20,-20 v-200 a20,20 0 0 1 20,-20 z',
    'collapsedShape': 'M 8.13789 15 H 0 V 0 H 8.13789 V 15 Z M 0.625991 13.75 H 7.51189 V 1.25 H 0.625991 V 13.75 Z ' +
        'M 2.18095 7.03125 L 5.95631 7.03125 L 5.95631 7.46875 L 2.18095 7.46875 Z M 3.8342 3.73 ' +
        'L 4.30369 3.73 L 4.30369 11.2687 L 3.8342 11.2687 Z'
};
var bpmnTriggerShapes = {
    // 'None': '',
    'Message': 'M0,0 L19.8,12.8 L40,0 L0, 0 L0, 25.5 L40, 25.5 L 40, 0',
    'Timer': 'M40,20c0,8.654-5.496,16.024-13.189,18.81' +
        'C24.685,39.58,22.392,40,20,40C8.954,40,0,31.046,0,20S8.954,0,20,0S40,8.954,40,20z M20,0 L20,2.583 L20,5.283 M10.027,2.681' +
        'L11.659,5.507 L12.669,7.257 M2.731,9.989 L6.014,11.885 L7.307,12.631 M0.067,19.967 L2.667,19.967 L5.35,19.967' +
        'M2.748,29.939 L5.731,28.217 L7.323,27.298 M10.056,37.236 L11.292,35.095 L12.698,32.66 M20.033,39.9 L20.033,36.417 L20.033,34.617' +
        'M30.006,37.219 L28.893,35.292 L27.364,32.643 M37.302,29.911 L34.608,28.355 L32.727,27.269' +
        'M39.967,19.933 L37.417,19.933 L34.683,19.933 M37.286,9.961 L34.583,11.521 L32.71,12.602 M29.977,2.664 L28.653,4.957 L27.336,' +
        '7.24 M22.104,8.5 L19.688,20 L24.75,20 L31.604,20 L24.75,20 L19.688,20z',
    'Error': 'M 23.77 18.527 l -7.107 27.396 l 8.507 -17.247 L 36.94 40.073 l 6.394 -25.997 l -8.497 15.754 L 23.77 18.527 Z',
    'Escalation': 'M 30.001 8.098 L 11.842 43.543 l 18.159 -18.882 l 18.162 18.882 L 30.001 8.098 Z ',
    'Cancel': 'M 3.5 16 L 0 12.6 L 4.6 8 L 0 3.5 L 3.4 0 L 8 4.6 l 4.5 -4.5 L 16 3.5 L 11.5 8 l 4.5 4.5 l -3.4 3.5 L 8 11.4 L 3.5 16 Z',
    'Compensation': 'M 25.7086 0 L 0 25 L 25.7086 50 V 26.3752 L 50 50 V 0 L 25.7086 23.6248 V 0 Z ',
    'Conditional': 'M 0 0 H 16 V 16 H 0 z M 1.14 3.2 H 14.85 M 1.14 6.4 H 14.85 M 1.14 9.6 H 14.85 M 1.14 12.8 H 14.85',
    'Link': 'M 32.014 19.258 v 5.992 H 9.373 v 9.504 h 22.641 v 5.988 L 50.622 30 L 32.014 19.258 Z',
    'Signal': 'M 50 50 H 0 L 25.0025 0 L 50 50 Z',
    'Terminate': 'M 25 50 C 11.21 50 0 38.79 0 25 C 0 11.21 11.21 0 25 0 C 38.78 0 50 11.21 50 25 C 50 38.79 38.78 50 25 50',
    'Multiple': 'M 17.784 48.889 H 42.21 l 7.548 -23.23 L 29.997 11.303 L 10.236 25.658 L 17.784 48.889 Z',
    'Parallel': 'M 27.276 49.986 h 5.58 v -17.15 h 17.146 V 27.17 h -17.15 l 0.004 -17.15 h -5.58 l -0.004 17.15 ' +
        'H 9.994 v 5.666 h 17.278 L 27.276 49.986 Z'
};
var bpmnGatewayShapes = {
    'None': '',
    //exclusive
    'Exclusive': 'M 11.196 29.009 l 6.36 -9.712 l -5.764 -8.899 h 4.393 l 3.732 5.979 l 3.656 -5.979 h 4.354 l -5.789 9.039' +
        'l 6.36 9.572 h -4.532 l -4.126 -6.437 l -4.139 6.437 H 11.196 Z',
    //inclusive
    'Inclusive': 'M 20.323 31.333 c -6.625 0 -12.015 -5.39 -12.015 -12.015 s 5.39 -12.015 12.015 -12.015 ' +
        's 12.016 5.39 12.016 12.015 S 26.948 31.333 20.323 31.333 Z M 20.323 9.303 c -5.522 0 -10.015 4.493 -10.015 10.015 ' +
        's 4.492 10.015 10.015 10.015 s 10.016 -4.493 10.016 -10.015 S 25.846 9.303 20.323 9.303 Z',
    //parallel
    'Parallel': 'M 18.394 29.542 v -8.833 H 9.626 v -3.691 h 8.768 V 8.251 h 3.734 v 8.767 h 8.768 v 3.691 h -8.768 v 8.833 H 18.394 Z',
    //complex
    'Complex': 'M29.198,19.063L23.089,19.063L27.794,14.358L26.38,12.944L21.223,18.101L21.223,10.443L19.223,10.443L19.223,17.976' +
        'L14.022,12.776L12.608,14.19L17.48,19.063L10.365,19.063L10.365,21.063L18.261,21.063L12.392,26.932L13.806,28.346' +
        'L19.223,22.929L19.223,30.225L21.223,30.225L21.223,22.805L25.925,27.507L27.339,26.093L22.309,21.063L29.198,21.063z',
    //eventbased
    'EventBased': 'M 20.322 29.874 c -5.444 0 -9.873 -4.43 -9.873 -9.874 s 4.429 -9.874 9.873 -9.874 s 9.874 4.429 9.874 9.874 ' +
        'S 25.767 29.874 20.322 29.874 Z M 20.322 32.891 c -7.107 0 -12.89 -5.783 -12.89 -12.891 c 0 -7.107 5.782 -12.89 12.89 -12.89 ' +
        'c 7.108 0 12.891 5.783 12.891 12.89 C 33.213 27.108 27.431 32.891 20.322 32.891 Z M 24.191 25.386 ' +
        'h -7.984 l -2.469 -7.595 l 6.461 -4.693 l 6.461 4.693 L 24.191 25.386 Z',
    //exclusive event based
    'ExclusiveEventBased': 'M 30 15 C 30 23.28 23.28 30 15 30 S 0 23.28 0 15 S 6.72 0 15 0 S 30 6.72 30 15 z M 15 5 ' +
        'L 5 12.5 L 8 22.5 H 22 L 25 12.5 z',
    //parallel event based
    'ParallelEventBased': 'M 35 17.5 C 35 27.16 27.16 35 17.5 35 S 0 27.16 0 17.5 S 7.84 0 17.5 0 S 35 7.84 35 17.5 z M 14.58 5.83 ' +
        'V 14.58 H 5.83 V 20.42 H 14.58 V 29.17 H 20.42 V 20.42 H 29.17 V 14.58 H 20.42 V 5.83 z'
};
var bpmnTaskShapes = {
    'None': '',
    'Service': 'M 32.699 20.187 v -4.005 h -3.32 c -0.125 -0.43 -0.292 -0.83 -0.488 -1.21 l 2.373 -2.375 ' +
        'l -2.833 -2.83 l -2.333 2.333 c -0.44 -0.253 -0.9 -0.448 -1.387 -0.595 v -3.32 h -4.003 v 3.32 c -0.46 0.137 -0.89' +
        '0.322 -1.3 0.537 l -2.285 -2.275 l -2.833 2.83 l 2.285 2.278 c -0.235 0.42 -0.41 0.847 -0.547 1.307 h -3.33 v 4.005 h 3.33 ' +
        'c 0.148 0.488 0.343 0.955 0.588 1.395 l -2.325 2.325 l 2.822 2.832 l 2.373 -2.382 c 0.392 0.205 0.792 0.37 1.212 0.497 v 3.33 ' +
        'h 4.003 v -3.33 c 0.46 -0.138 0.89 -0.323 1.3 -0.547 l 2.43 2.432 l 2.822 -2.832 l -2.42 -2.422 c 0.222 -0.41 0.4 -0.85 0.535' +
        '-1.297 H 32.699 Z M 22.699 21.987 c -2.1 0 -3.803 -1.703 -3.803 -3.803 c 0 -2.1 1.703 -3.803 3.803 -3.803 c 2.1 0 3.803 ' +
        '1.703 3.803 3.803 C 26.502 20.285 24.8 21.987 22.699 21.987 Z',
    'Receive': 'M 12.217 12.134 v 13.334 h 20 V 12.134 H 12.217 Z M 30.44 13.007 l -8.223 5.35 l -8.223 -5.35 H 30.44 Z M 13.09' +
        ' 24.594 V 13.459 l 9.127 5.94 l 9.127 -5.94 v 11.135 H 13.09 Z',
    'Send': 'M0,1.2260086 L8.0000002,8.3380068 16,1.2260086 16,12.000007 0,12.000007 z M1.6300015,0 L14.371001,0 8.0000055,5.662 z',
    'InstantiatingReceive': 'M 16.306 17.39 v 8.79 h 13.198 v -8.79 H 16.306 Z M 28.375 17.946 l -5.47 3.558 l -5.47 -3.558 ' +
        'H 28.375 Z M 28.948 25.625 H 16.861 v -7.389 l 6.043 3.931 l 6.043 -3.931 V 25.625 Z M 22.905 11.785' +
        'c -5.514 0 -9.999 4.486 -9.999 10 c 0 5.514 4.485 10 9.999 10 s 9.999 -4.486 9.999 -10 ' +
        'C 32.904 16.272 28.419 11.785 22.905 11.785 Z M 22.905 31.239 c -5.212 0 -9.453 -4.241 -9.453 -9.454' +
        'c 0 -5.212 4.241 -9.453 9.453 -9.453 s 9.452 4.241 9.452 9.453 C 32.357 26.998 28.117 31.239 22.905 31.239 Z',
    'Manual': 'M9.21 612 L5.82 612 L1.07 612 a1.07317 1 -180 0 1 -1.07317 -1 L0 604.75 A3.42007 1.59344 -180 0 0 1.61 604 L2.6 604 L5.99 604 a0.721171 0.672 0 0 1 0.721171 0.672 a0.721171 0.672 0 0 1 -0.721171 0.672 L2.6 605.34 a0.48818 0.183302 -90 0 0 0.0837073 0.342385 L5.63 605.69 a0.721171 0.672 0 0 1 0.184585 -0.0223847 L10.28 605.66 a0.721171 0.672 0 0 1 0.721171 0.672 a0.721171 0.672 0 0 1 -0.721171 0.672 L5.82 607.01 a0.721171 0.672 0 0 1 -0.184585 -0.0223847 L5.63 607.35 a0.721171 0.672 0 0 1 0.184585 -0.0223847 L10.01 607.33 a0.721171 0.672 0 0 1 0.721171 0.672 a0.721171 0.672 0 0 1 -0.721171 0.672 L5.82 608.67 a0.721171 0.672 0 0 1 -0.184585 -0.0223847 L5.63 609.01 a0.721171 0.672 0 0 1 0.184585 -0.0223847 L9.47 608.99 a0.721171 0.672 0 0 1 0.721171 0.672 a0.721171 0.672 0 0 1 -0.721171 0.672 L5.82 610.34 a0.721171 0.672 0 0 1 -0.184585 -0.0223847 L5.63 610.68 a0.721171 0.672 0 0 1 0.184585 -0.0223847 L9.21 610.66 a0.721171 0.672 0 0 1 0.721171 0.672 a0.721171 0.672 0 0 1 -0.721171 0.672',
    'BusinessRule': 'M 32.844 13.245 h -0.089 v 0 H 13.764 v -0.015 h -1.009 v 16.989 h 0.095 v 0.011 h 19.716 v -0.011 h 0.278 ' +
        'V 13.245 Z M 31.844 14.229 v 4.185 h -18.08 v -4.185 H 31.844 Z M 18.168 25.306 v 3.938 h -4.404 v -3.938 H 18.168 Z ' +
        'M 13.764 24.322 v -4.923 h 4.404 v 4.923 H 13.764 Z M 19.177 25.306 h 12.667 v 3.938 H 19.177 V 25.306 Z M 19.177 24.322' +
        'v -4.923 h 12.667 v 4.923 H 19.177 Z',
    'User': 'M8.6751149,13.75 L10.79009,18.703003 11.664047,18.696991 13.792084,13.75 13.824066,13.75 C18.177001,13.75 21.709022,' +
        '17.259003 21.748998,21.60199 21.748998,21.649994 21.743993,21.700012 21.735021,21.747009 21.137981,24.774994 18.775997,' +
        '27.144989 15.74904,27.75 L6.7491024,27.75 C3.7231224,27.144989 1.3601628,24.774994 0.76312089,21.747009 0.75414884,21.700012 0.74914402,' +
        '21.649994 0.75012076,21.60199 0.78912175,17.259003 4.3221171,13.75 8.6751149,13.75 z M11.249014,0.75 C14.287014,0.75 16.749015,' +
        '3.2119999 16.749015,6.25 16.749015,9.2880001 14.287014,11.75 11.249014,11.75 8.211015,11.75 5.7490147,9.2880001 5.7490147,6.25 5.7490147,3.2119999 8.211015,0.75 11.249014,0.75 z',
    'Script': 'M22.3,80.4 A82.9529,77.0159,-180,0,0,10.3,46.7 A69.8467,64.8477,0,0,1,0,19.7 A27.6207,25.6439,0,0,1,12.1,0 L84.7,0 A37.4124,34.7347,-180,0,0,77.7,19.6 A82.8871,76.9547,' +
        '-180,0,0,89.7,53.3 A69.8146,64.81790000000001,0,0,1,100,80.3 A27.603399999999997,25.6278,0,0,1,87.9,100 L15.3,100 A37.4265,34.7479,-180,0,0,22.3,80.4 M12.5,28.6 L67.3,28.6 M18.3,42.9 L72.1,42.9 M80.8,' +
        '57.1 L26,57.1 M85.6,71.4 L32.6,71.4'
};
var bpmnLoopShapes = {
    'None': '',
    'Standard': 'M 52.002 73.379 c -2.494 -2.536 -6.55 -2.534 -9.043 0 c -1.208 1.228 -1.874 2.861 -1.874 4.598 ' +
        'c 0 1.225 0.337 2.395 0.957 3.411 l -1.167 1.186 l 2.071 0.458 l 2.071 0.458 l -0.45 -2.106 l -0.45 -2.106 l -1.292 1.314' +
        'c -1.119 -2.065 -0.842 -4.709 0.877 -6.458 c 2.084 -2.119 5.475 -2.117 7.557 0 c 2.083 2.119 2.083 5.565 0 7.685' +
        'c -0.976 0.992 -2.272 1.557 -3.65 1.59 l 0.025 1.068 c 1.65 -0.041 3.2 -0.716 4.368 -1.903 ' +
        'c 1.208 -1.228 1.874 -2.861 1.874 -4.597 C 53.875 76.24 53.209 74.607 52.002 73.379 Z',
    'ParallelMultiInstance': 'M 51.5,69.5 L52.5,69.5 L52.5,84.5 L51.5 84.5 Z M 46.5,69.5 L47.5,69.5 L47.5,84.5 L46.5 84.5 Z' +
        ' M 41.5,69.5 L42.5,69.5 L42.5,84.5 L41.5 84.5 Z  ',
    'SequenceMultiInstance': 'M 40.375,71.5 L 55.375,71.5 L 55.375,72.5 L 40.375,72.5 Z M 40.375,76.5 L 55.375,76.5 ' +
        'L 55.375,77.5 L 40.375,77.5 Z M 40.375,76.5 L 55.375,76.5 L 55.375,77.5 L 40.375,77.5 Z M 40.375,81.5 L 55.375,81.5' +
        'L 55.375,82.5 L 40.375,82.5 Z'
};
