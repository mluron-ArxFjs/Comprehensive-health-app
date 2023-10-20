import { EventHandler, extend, isBlazor, isNullOrUndefined } from '@syncfusion/ej2-base';
import { ShapeType } from '../index';
var FreehandDrawing = /** @class */ (function () {
    function FreehandDrawing(parent) {
        this.fhdObj = { lastWidth: 0, lastVelocity: 0, time: 0, pointX: 0, pointY: 0 };
        this.isFreehandDrawing = false;
        this.freehandDownPoint = { x: 0, y: 0 };
        this.isFreehandPointMoved = false;
        this.pointCounter = 0;
        // eslint-disable-next-line
        this.selPointColl = {};
        this.currFHDIdx = 0; // Specifies id for every freehand drawing - uses while deleting
        this.selPoints = [];
        this.dummyPoints = [];
        this.tempFHDStyles = { strokeColor: null, fillColor: null, strokeWidth: null };
        this.parent = parent;
        this.addEventListener();
    }
    FreehandDrawing.prototype.destroy = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.removeEventListener();
    };
    FreehandDrawing.prototype.addEventListener = function () {
        this.parent.on('freehand-draw', this.draw, this);
        this.parent.on('destroyed', this.destroy, this);
    };
    FreehandDrawing.prototype.removeEventListener = function () {
        this.parent.off('freehand-draw', this.draw);
        this.parent.off('destroyed', this.destroy);
    };
    FreehandDrawing.prototype.draw = function (args) {
        this.updateFhdPvtVar();
        switch (args.prop) {
            case 'hoverFhd': {
                this.hoverFhd(args.value['strokeColor'], args.value['strokeWidth']);
                break;
            }
            case 'freehandDownHandler':
                this.freehandDownHandler(args.value['e'], args.value['canvas']);
                break;
            case 'freehandUpHandler':
                this.freehandUpHandler(args.value['e'], args.value['canvas'], args.value['context']);
                break;
            case 'handle-freehand-draw': {
                var id = parseInt(args.value['id'].split('_')[1], 10) - 1;
                if (this.isFHDIdx(id)) {
                    this.deleteFhd(id, true);
                }
                break;
            }
            case 'freehandRedraw':
                this.freehandRedraw(args.value['context'], args.value['points']);
                break;
            case 'deleteFhd': {
                var id = parseInt(args.value['id'].split('_')[1], 10) - 1;
                this.deleteFhd(id, true);
                break;
            }
            case 'selectFhd': {
                var id = null;
                if (args.value['id']) {
                    id = parseInt(args.value['id'].split('_')[1], 10) - 1;
                }
                this.selectFhd(id);
                break;
            }
            case 'applyFhd':
                this.applyFhd();
                break;
            case 'cancelFhd':
                this.cancelFhd();
                break;
            case 'updateFHDCurPts':
                this.updateFHDCurPts();
                break;
            case 'rotateFhdColl':
                this.rotateFhdColl();
                break;
            case 'flipFHDColl':
                this.flipFHDColl(args.value['value']);
                break;
            case 'panFHDColl':
                this.panFHDColl(args.value['xDiff'], args.value['yDiff'], args.value['panRegion']);
                break;
            case 'updateFHDColl':
                this.updateFHDColl();
                break;
            case 'zoomFHDColl':
                this.zoomFHDColl(args.value['isPreventApply']);
                break;
            case 'apply-pen-draw':
                this.applyPenDraw();
                break;
            case 'freeHandDraw':
                this.freeHandDraw(args.value['value']);
                break;
            case 'isFHDIdx':
                this.isFHDIdx(args.value['index'], args.value['obj']);
                break;
            case 'getSqPtFD':
                this.getSqPtFD(args.value['idx'], args.value['obj']);
                break;
            case 'getSelPointColl':
                args.value['obj']['selPointColl'] = extend([], this.selPointColl);
                break;
            case 'setSelPointColl':
                this.selPointColl = extend([], args.value['obj']['selPointColl']);
                break;
            case 'setFreehandDrawHoveredIndex':
                this.fhdHovIdx = args.value['index'];
                break;
            case 'getFreehandDrawHoveredIndex':
                args.value['obj']['index'] = this.fhdHovIdx;
                break;
            case 'setPointCounter':
                this.pointCounter = args.value['value'];
                break;
            case 'getPenStrokeWidth':
                args.value['obj']['penStrokeWidth'] = this.penStrokeWidth;
                break;
            case 'setPenStrokeWidth':
                this.penStrokeWidth = args.value['value'];
                break;
            case 'getCurrentFreehandDrawIndex':
                args.value['obj']['currentFreehandDrawIndex'] = this.currFHDIdx;
                break;
            case 'setCurrentFreehandDrawIndex':
                this.currFHDIdx = args.value['value'];
                break;
            case 'updateCropPtsForSel':
                this.updateCropPtsForSel();
                break;
            case 'getFreehandDrawSelectedId':
                args.value['obj']['freehandDrawSelectedId'] = this.fhdSelID;
                break;
            case 'resetFreehandDrawSelectedId':
                this.fhdSelID = null;
                break;
            case 'getTempFreeHandDrawEditingStyles':
                args.value['obj']['tempFreeHandDrawEditingStyles'] = this.tempFHDStyles;
                break;
            case 'setFreehandSelectedIndex':
                this.fhdSelIdx = args.value['index'];
                break;
            case 'getFreehandSelectedIndex':
                args.value['obj']['freehandSelectedIndex'] = this.fhdSelIdx;
                break;
            case 'reset':
                this.reset();
                break;
        }
    };
    FreehandDrawing.prototype.updateFhdPvtVar = function () {
        var parent = this.parent;
        if (parent.lowerCanvas) {
            this.lowerContext = parent.lowerCanvas.getContext('2d');
        }
        if (parent.upperCanvas) {
            this.upperContext = parent.upperCanvas.getContext('2d');
        }
    };
    FreehandDrawing.prototype.reset = function () {
        this.fhdObj = { lastWidth: 0, lastVelocity: 0, time: 0, pointX: 0, pointY: 0 };
        this.isFreehandDrawing = this.isFreehandPointMoved = false;
        this.selPoints = [];
        this.dummyPoints = [];
        this.freehandDownPoint = { x: 0, y: 0 };
        this.selPointColl = {};
        this.fhdHovIdx = null;
        this.pointCounter = 0;
        this.fhdSelID = null;
        this.penStrokeWidth = undefined;
        this.currFHDIdx = 0;
        this.fhdSelIdx = null;
        this.tempFHDStyles = { strokeColor: null, fillColor: null, strokeWidth: null };
    };
    FreehandDrawing.prototype.getModuleName = function () {
        return 'freehand-draw';
    };
    FreehandDrawing.prototype.hoverFhd = function (fillStyle, strokeWidth) {
        var parent = this.parent;
        parent.lowerCanvas = document.querySelector('#' + parent.element.id + '_lowerCanvas');
        this.lowerContext = parent.lowerCanvas.getContext('2d');
        parent.upperCanvas = document.querySelector('#' + parent.element.id + '_upperCanvas');
        this.upperContext = parent.upperCanvas.getContext('2d');
        var context = this.upperContext;
        var idx = -1;
        if (this.fhdHovIdx > -1) {
            idx = this.fhdHovIdx;
        }
        else {
            idx = this.fhdSelIdx;
        }
        parent.points = extend([], parent.pointColl[idx].points);
        this.pointCounter = 0;
        var len = parent.points.length;
        var controlPoint1;
        var controlPoint2;
        var startPoint;
        var endPoint;
        var minStrokeWidth = 0;
        var maxStrokeWidth = 0;
        context.fillStyle = fillStyle ? fillStyle : parent.pointColl[idx].strokeColor;
        context.strokeStyle = context.fillStyle;
        minStrokeWidth = maxStrokeWidth = this.penStrokeWidth = strokeWidth ?
            strokeWidth : parent.pointColl[idx].strokeWidth;
        if (len === 1) {
            controlPoint1 = controlPoint2 = startPoint = endPoint = parent.points[0];
            this.startDraw(context, controlPoint1, controlPoint2, startPoint, endPoint, minStrokeWidth, maxStrokeWidth);
        }
        for (var l = 0; l < len - 3; l++) {
            if (parent.points[l + 1] && parent.points[l + 2] && parent.points[l + 2]) {
                controlPoint1 = (this.calcCurveCP(parent.points[l + 0], parent.points[l + 1], parent.points[l + 2])).controlPoint2;
                controlPoint2 = (this.calcCurveCP(parent.points[l + 1], parent.points[l + 2], parent.points[l + 3])).controlPoint1;
                if (l === 0) {
                    startPoint = parent.points[l];
                }
                else {
                    startPoint = parent.points[l + 1];
                }
                endPoint = parent.points[l + 2];
                this.startDraw(context, controlPoint1, controlPoint2, startPoint, endPoint, minStrokeWidth, maxStrokeWidth);
            }
        }
        context.closePath();
        // Outer selection
        var point = this.getSqPtFD(idx);
        var tempLineWidth = context.lineWidth;
        context.lineWidth = 2;
        context.strokeStyle = parent.themeColl[parent.theme]['primaryColor'];
        context.beginPath();
        context.rect(point.startX, point.startY, point.width, point.height);
        context.stroke();
        context.closePath();
        context.lineWidth = tempLineWidth;
    };
    FreehandDrawing.prototype.freehandDownHandler = function (e, canvas) {
        this.parent.lowerCanvas = document.querySelector('#' + this.parent.element.id + '_lowerCanvas');
        this.lowerContext = this.parent.lowerCanvas.getContext('2d');
        this.parent.upperCanvas = document.querySelector('#' + this.parent.element.id + '_upperCanvas');
        this.upperContext = this.parent.upperCanvas.getContext('2d');
        this.fhdObj.time = new Date().getTime();
        this.isFreehandDrawing = true;
        if (e.type === 'mousedown') {
            this.freehandDownPoint = { x: e.clientX, y: e.clientY };
        }
        else {
            this.freehandDownPoint = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
        this.isFreehandPointMoved = false;
        EventHandler.add(canvas, 'mousemove touchmove', this.freehandMoveHandler, this);
    };
    FreehandDrawing.prototype.freehandUpHandler = function (e, canvas, context) {
        var rect = canvas.getBoundingClientRect();
        var parent = this.parent;
        EventHandler.remove(canvas, 'mousemove touchmove', this.freehandMoveHandler);
        if (parent.points.length === 0) {
            if (e.type === 'mouseup') {
                this.processPoint(e.clientX - rect.left, e.clientY - rect.top, true, context);
            }
            else {
                if (!this.isFreehandPointMoved) {
                    this.processPoint(this.freehandDownPoint.x - rect.left, this.freehandDownPoint.y - rect.top, true, context);
                }
            }
        }
        context.closePath();
        var prevCropObj = extend({}, parent.cropObj, {}, true);
        var object = { currObj: {} };
        parent.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
        var prevObj = object['currObj'];
        prevObj.objColl = extend([], parent.objColl, [], true);
        prevObj.pointColl = extend([], parent.pointColl, [], true);
        prevObj.afterCropActions = extend([], parent.afterCropActions, [], true);
        var selPointCollObj = { selPointColl: null };
        parent.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
            value: { obj: selPointCollObj } });
        prevObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
        var fhCnt = parent.freehandCounter;
        parent.pointColl[fhCnt] = {};
        parent.pointColl[fhCnt].points = extend([], parent.points);
        parent.pointColl[fhCnt].strokeColor = parent.activeObj.strokeSettings.strokeColor;
        parent.pointColl[fhCnt].strokeWidth = this.penStrokeWidth;
        parent.pointColl[fhCnt].flipState = parent.transform.currFlipState;
        parent.pointColl[fhCnt].id = 'pen_' + (this.currFHDIdx + 1);
        parent.points = [];
        this.dummyPoints = [];
        this.selPointColl[fhCnt] = {};
        this.selPointColl[fhCnt].points = extend([], this.selPoints);
        this.selPoints = [];
        this.pointCounter = 0;
        parent.freehandCounter++;
        this.currFHDIdx++;
        this.isFreehandDrawing = false;
        parent.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
            value: { operation: 'freehand-draw', previousObj: prevObj, previousObjColl: prevObj.objColl,
                previousPointColl: prevObj.pointColl, previousSelPointColl: prevObj.selPointColl,
                previousCropObj: prevCropObj, previousText: null,
                currentText: null, previousFilter: null, isCircleCrop: null } });
    };
    FreehandDrawing.prototype.freehandMoveHandler = function (e) {
        this.isFreehandPointMoved = true;
        var rect = this.parent.upperCanvas.getBoundingClientRect();
        var x;
        var y;
        if (e.type === 'mousemove') {
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
        }
        else {
            x = e.touches[0].clientX - rect.left;
            y = e.touches[0].clientY - rect.top;
        }
        if (this.isFreehandDrawing) {
            this.processPoint(x, y, false, this.upperContext);
        }
    };
    FreehandDrawing.prototype.processPoint = function (x, y, mouseDown, context) {
        var parent = this.parent;
        var lastPoint = this.point(x, y, new Date().getTime());
        lastPoint = parent.points.length > 0 && parent.points[parent.points.length - 1];
        var isLastPointTooClose = lastPoint ? this.distanceTo(lastPoint) <= 5 : false;
        var controlPoint1;
        var controlPoint2;
        var startPoint;
        var endPoint;
        this.selPoints.push({ x: x, y: y, ratioX: (x - parent.img.destLeft) / parent.img.destWidth,
            ratioY: (y - parent.img.destTop) / parent.img.destHeight,
            time: this.fhdObj.time });
        if (!lastPoint || !(lastPoint && isLastPointTooClose) || mouseDown) {
            this.fhdObj.time = new Date().getTime();
            parent.points.push({ x: x, y: y, ratioX: (x - parent.img.destLeft) / parent.img.destWidth,
                ratioY: (y - parent.img.destTop) / parent.img.destHeight,
                time: this.fhdObj.time });
            this.dummyPoints.push({ x: x, y: y, ratioX: (x - parent.img.destLeft) / parent.img.destWidth,
                ratioY: (y - parent.img.destTop) / parent.img.destHeight,
                time: this.fhdObj.time });
            if (this.dummyPoints.length > 2) {
                if (this.dummyPoints.length === 3) {
                    this.dummyPoints.unshift(this.dummyPoints[0]);
                }
                var p0 = this.dummyPoints[0];
                var p1 = this.dummyPoints[1];
                var p2 = this.dummyPoints[2];
                var p3 = this.dummyPoints[3];
                controlPoint1 = this.calcCurveCP(p0, p1, p2).controlPoint2;
                controlPoint2 = this.calcCurveCP(p1, p2, p3).controlPoint1;
                startPoint = this.dummyPoints[1];
                endPoint = this.dummyPoints[2];
                var minStrokeWidth = 0.5;
                var maxStrokeWidth = 5;
                if (!isNullOrUndefined(this.penStrokeWidth)) {
                    minStrokeWidth = maxStrokeWidth = this.penStrokeWidth;
                }
                this.startDraw(context, controlPoint1, controlPoint2, startPoint, endPoint, minStrokeWidth, maxStrokeWidth);
                this.pointCounter++;
                this.dummyPoints.shift();
            }
            if (mouseDown) {
                controlPoint1 = controlPoint2 = startPoint = endPoint = { x: x, y: y, time: new Date().getTime() };
                var minStrokeWidth = 0.5;
                var maxStrokeWidth = 5;
                if (!isNullOrUndefined(this.penStrokeWidth)) {
                    minStrokeWidth = maxStrokeWidth = this.penStrokeWidth;
                }
                this.startDraw(context, controlPoint1, controlPoint2, startPoint, endPoint, minStrokeWidth, maxStrokeWidth);
            }
        }
    };
    FreehandDrawing.prototype.calcCurveCP = function (p1, p2, p3) {
        if (!p2) {
            p2 = p1;
        }
        if (!p3) {
            p3 = p2;
        }
        var dx1 = p1.x - p2.x;
        var dy1 = p1.y - p2.y;
        var dx2 = p2.x - p3.x;
        var dy2 = p2.y - p3.y;
        var m1 = { x: (p1.x + p2.x) / 2.0, y: (p1.y + p2.y) / 2.0 };
        var m2 = { x: (p2.x + p3.x) / 2.0, y: (p2.y + p3.y) / 2.0 };
        var l1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
        var l2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        var dxm = (m1.x - m2.x);
        var dym = (m1.y - m2.y);
        var k = l2 / (l1 + l2);
        var cm = { x: m2.x + dxm * k, y: m2.y + dym * k };
        var tx = p2.x - cm.x;
        var ty = p2.y - cm.y;
        return {
            controlPoint1: this.point(m1.x + tx, m1.y + ty, 0),
            controlPoint2: this.point(m2.x + tx, m2.y + ty, 0)
        };
    };
    FreehandDrawing.prototype.point = function (x, y, time) {
        this.fhdObj.pointX = x;
        this.fhdObj.pointY = y;
        return { x: this.fhdObj.pointX, y: this.fhdObj.pointY, time: time };
    };
    FreehandDrawing.prototype.startDraw = function (context, controlPoint1, controlPoint2, startPoint, endPoint, minStrokeWidth, maxStrokeWidth) {
        var tempVelocity;
        tempVelocity = this.pointVelocity(startPoint);
        tempVelocity = 0.7 * tempVelocity + (1 - 0.7) * this.fhdObj.lastVelocity;
        var newWidth = Math.max(maxStrokeWidth / (0.7 + 1), minStrokeWidth);
        this.drawCurve(this.fhdObj.time, newWidth, context, controlPoint1, controlPoint2, startPoint, endPoint, maxStrokeWidth);
        this.fhdObj.lastVelocity = tempVelocity;
        this.fhdObj.time = newWidth;
    };
    FreehandDrawing.prototype.pointVelocity = function (startPoint) {
        return (this.fhdObj.time !== startPoint.time) ? this.distanceTo(startPoint) /
            (this.fhdObj.time - startPoint.time) : 0;
    };
    FreehandDrawing.prototype.distanceTo = function (start) {
        return Math.sqrt(Math.pow(this.fhdObj.pointX - start.x, 2) + Math.pow(this.fhdObj.pointY - start.y, 2));
    };
    FreehandDrawing.prototype.drawCurve = function (startWidth, endWidth, context, controlPoint1, controlPoint2, startPoint, endPoint, maxStrokeWidth) {
        var width;
        var i;
        var t1;
        var t2;
        var t3;
        var u1;
        var u2;
        var u3;
        var x;
        var y;
        var widthValue = endWidth - startWidth;
        var bezierLength = this.bezierLength(controlPoint1, controlPoint2, startPoint, endPoint);
        var drawSteps = Math.ceil(bezierLength) * 2;
        context.beginPath();
        for (i = 0; i < drawSteps; i++) {
            t1 = i / drawSteps;
            t2 = t1 * t1;
            t3 = t2 * t1;
            u1 = 1 - t1;
            u2 = u1 * u1;
            u3 = u2 * u1;
            x = u3 * startPoint.x;
            x += 3 * u2 * t1 * controlPoint1.x;
            x += 3 * u1 * t2 * controlPoint2.x;
            x += t3 * endPoint.x;
            y = u3 * startPoint.y;
            y += 3 * u2 * t1 * controlPoint1.y;
            y += 3 * u1 * t2 * controlPoint2.y;
            y += t3 * endPoint.y;
            width = Math.min(startWidth + t3 * widthValue, maxStrokeWidth);
            this.drawArc(x, y, width, context);
        }
        context.closePath();
        context.fill();
    };
    FreehandDrawing.prototype.bezierLength = function (controlPoint1, controlPoint2, startPoint, endPoint) {
        var steps = 10;
        var length = 0;
        var i;
        var t;
        var pointX1;
        var pointY1;
        var pointX2;
        var pointY2;
        var pointX3;
        var pointY3;
        for (i = 0; i <= steps; i++) {
            t = i / steps;
            pointX1 = this.bezierPoint(t, startPoint.x, controlPoint1.x, controlPoint2.x, endPoint.x);
            pointY1 = this.bezierPoint(t, startPoint.y, controlPoint1.y, controlPoint2.y, endPoint.y);
            if (i > 0) {
                pointX3 = pointX1 - pointX2;
                pointY3 = pointY1 - pointY2;
                length += Math.sqrt(pointX3 * pointX3 + pointY3 * pointY3);
            }
            pointX2 = pointX1;
            pointY2 = pointY1;
        }
        return length;
    };
    FreehandDrawing.prototype.bezierPoint = function (t, startPoint, cp1, cp2, endPoint) {
        return startPoint * (1.0 - t) * (1.0 - t) * (1.0 - t) + 3.0 * cp1 * (1.0 - t) * (1.0 - t) * t + 3.0 *
            cp2 * (1.0 - t) * t * t + endPoint * t * t * t;
    };
    FreehandDrawing.prototype.drawArc = function (x, y, size, context) {
        if ((x > this.parent.img.destLeft && y > this.parent.img.destTop && x < (this.parent.img.destLeft + this.parent.img.destWidth) &&
            y < (this.parent.img.destTop + this.parent.img.destHeight) ||
            (context !== this.lowerContext && context !== this.upperContext))) {
            context.moveTo(x, y);
            context.arc(x, y, size, 0, 2 * Math.PI, false);
        }
    };
    FreehandDrawing.prototype.freehandRedraw = function (context, points) {
        var parent = this.parent;
        parent.lowerCanvas = document.querySelector('#' + parent.element.id + '_lowerCanvas');
        this.lowerContext = parent.lowerCanvas.getContext('2d');
        parent.upperCanvas = document.querySelector('#' + parent.element.id + '_upperCanvas');
        this.upperContext = parent.upperCanvas.getContext('2d');
        var temp = context.filter;
        context.filter = 'none';
        if (points) {
            parent.pointColl[parent.freehandCounter] = {};
            parent.pointColl[parent.freehandCounter].points = points;
            parent.pointColl[parent.freehandCounter].strokeColor = parent.activeObj.strokeSettings.strokeColor;
            parent.pointColl[parent.freehandCounter].strokeWidth = this.penStrokeWidth;
            parent.pointColl[parent.freehandCounter].flipState = parent.transform.currFlipState;
            parent.freehandCounter++;
        }
        for (var n = 0; n < parent.freehandCounter; n++) {
            parent.points = extend([], parent.pointColl[n].points);
            this.pointCounter = 0;
            var len = parent.points.length;
            var controlPoint1 = void 0;
            var controlPoint2 = void 0;
            var startPoint = void 0;
            var endPoint = void 0;
            var minStrokeWidth = void 0;
            var maxStrokeWidth = void 0;
            if (len > 0) {
                context.fillStyle = parent.pointColl[n].strokeColor;
                minStrokeWidth = maxStrokeWidth = this.penStrokeWidth = parent.pointColl[n].strokeWidth;
            }
            if (len === 1) {
                controlPoint1 = controlPoint2 = startPoint = endPoint = parent.points[0];
                this.startDraw(context, controlPoint1, controlPoint2, startPoint, endPoint, minStrokeWidth, maxStrokeWidth);
            }
            for (var l = 0; l < len - 3; l++) {
                if (parent.points[l + 1] && parent.points[l + 2] && parent.points[l + 2]) {
                    controlPoint1 = (this.calcCurveCP(parent.points[l + 0], parent.points[l + 1], parent.points[l + 2])).controlPoint2;
                    controlPoint2 = (this.calcCurveCP(parent.points[l + 1], parent.points[l + 2], parent.points[l + 3])).controlPoint1;
                    if (l === 0) {
                        startPoint = parent.points[l];
                    }
                    else {
                        startPoint = parent.points[l + 1];
                    }
                    endPoint = parent.points[l + 2];
                    this.startDraw(context, controlPoint1, controlPoint2, startPoint, endPoint, minStrokeWidth, maxStrokeWidth);
                }
            }
            context.closePath();
        }
        context.filter = temp;
    };
    FreehandDrawing.prototype.getSqPtFD = function (idx, obj) {
        var activePoint = { startX: 0, startY: 0, endX: 0, endY: 0, width: 0, height: 0 };
        var sPoints = extend([], this.selPointColl[idx].points, []);
        this.parent.points = extend([], this.parent.pointColl[idx].points);
        this.pointCounter = 0;
        var len = sPoints.length;
        for (var l = 0; l < len; l++) {
            if (activePoint.startX === 0 && activePoint.startY === 0 && activePoint.endX === 0 && activePoint.endY === 0) {
                activePoint.startX = sPoints[l].x;
                activePoint.startY = sPoints[l].y;
                activePoint.endX = sPoints[l].x;
                activePoint.endY = sPoints[l].y;
            }
            else {
                activePoint.startX = Math.min(activePoint.startX, sPoints[l].x);
                activePoint.startY = Math.min(activePoint.startY, sPoints[l].y);
                activePoint.endX = Math.max(activePoint.endX, sPoints[l].x);
                activePoint.endY = Math.max(activePoint.endY, sPoints[l].y);
            }
        }
        activePoint.startX -= this.penStrokeWidth;
        activePoint.startY -= this.penStrokeWidth;
        activePoint.endX += this.penStrokeWidth;
        activePoint.endY += this.penStrokeWidth;
        activePoint.width = activePoint.endX - activePoint.startX;
        activePoint.height = activePoint.endY - activePoint.startY;
        if (obj) {
            obj['activePoint'] = activePoint;
        }
        return activePoint;
    };
    FreehandDrawing.prototype.applyPenDraw = function () {
        var parent = this.parent;
        if (parent.currObjType.shape === 'freehanddraw') {
            parent.notify('shape', { prop: 'apply', onPropertyChange: false, value: { shape: null, obj: null, canvas: null } });
            parent.upperCanvas.style.cursor = parent.cursor = 'default';
            parent.currObjType.shape = '';
        }
        parent.notify('shape', { prop: 'clearActObj' });
    };
    FreehandDrawing.prototype.applyFhd = function () {
        var parent = this.parent;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var selectedPoint = parent.pointColl[this.fhdSelIdx];
        if (selectedPoint.strokeColor === '#42a5f5') {
            selectedPoint.strokeColor = this.tempFHDStyles.strokeColor;
        }
        if (!isBlazor()) {
            parent.notify('toolbar', { prop: 'setSelectedFreehandColor', value: { color: '#42a5f5' } });
        }
        this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
        this.lowerContext.clearRect(0, 0, parent.lowerCanvas.width, parent.lowerCanvas.height);
        parent.notify('draw', { prop: 'render-image', value: { isMouseWheel: null } });
        if (!isBlazor()) {
            parent.notify('toolbar', { prop: 'refresh-main-toolbar', onPropertyChange: false });
        }
        if (selectedPoint) {
            selectedPoint.isSelected = false;
        }
        parent.notify('selection', { prop: 'resetFreehandDrawVariables' });
        this.fhdHovIdx = this.fhdSelIdx = null;
    };
    FreehandDrawing.prototype.cancelFhd = function () {
        var parent = this.parent;
        if (!isBlazor()) {
            parent.notify('toolbar', { prop: 'setSelectedFreehandColor', value: { color: '#42a5f5' } });
        }
        this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
        this.pointCounter = 0;
        if (parent.pointColl[this.fhdSelIdx]) {
            parent.pointColl[this.fhdSelIdx].strokeColor = this.tempFHDStyles.strokeColor;
            parent.pointColl[this.fhdSelIdx].strokeWidth = this.tempFHDStyles.strokeWidth;
            parent.pointColl[this.fhdSelIdx].isSelected = false;
        }
        this.fhdHovIdx = this.fhdSelIdx = this.fhdSelID = null;
        parent.notify('selection', { prop: 'resetFreehandDrawVariables' });
        parent.activeObj.strokeSettings.strokeColor = this.tempFHDStyles.strokeColor;
        parent.activeObj.strokeSettings.strokeWidth = this.penStrokeWidth = this.tempFHDStyles.strokeWidth;
        this.tempFHDStyles = { strokeColor: null, strokeWidth: null, fillColor: null };
        if (!isBlazor()) {
            parent.notify('toolbar', { prop: 'refresh-main-toolbar', onPropertyChange: false });
        }
    };
    FreehandDrawing.prototype.selectFhd = function (index) {
        var _this = this;
        var parent = this.parent;
        parent.notify('selection', { prop: 'setFreehandDrawEditing', onPropertyChange: false, value: { bool: true } });
        if (index || index === 0) {
            if (this.isFHDIdx(index)) {
                this.fhdSelIdx = this.fhdHovIdx = index;
                this.hoverFhd();
                parent.upperCanvas.style.cursor = parent.cursor = 'pointer';
            }
            else {
                return;
            }
        }
        this.fhdSelIdx = this.fhdHovIdx;
        parent.pointColl[this.fhdSelIdx].isSelected = true;
        this.fhdSelID = parent.pointColl[this.fhdSelIdx].id;
        if (parent.pointColl[this.fhdHovIdx].strokeColor !== '#42a5f5') {
            parent.activeObj.strokeSettings.strokeColor = this.tempFHDStyles.strokeColor =
                parent.pointColl[this.fhdHovIdx].strokeColor;
        }
        parent.activeObj.strokeSettings.strokeWidth = this.tempFHDStyles.strokeWidth =
            parent.pointColl[this.fhdHovIdx].strokeWidth;
        var obj = { bool: false };
        parent.notify('selection', { prop: 'getFreehandDrawEditing', onPropertyChange: false, value: { obj: obj } });
        if (obj['bool']) {
            var shapeSettings = { id: 'pen_' + (this.fhdSelIdx + 1), type: ShapeType.FreehandDraw,
                startX: parent.pointColl[this.fhdSelIdx].points[0].x, startY: parent.pointColl[this.fhdSelIdx].points[0].y,
                strokeColor: parent.pointColl[this.fhdSelIdx].strokeColor, strokeWidth: parent.pointColl[this.fhdSelIdx].strokeWidth,
                points: parent.pointColl[this.fhdSelIdx].points };
            var shapeChangingArgs = { action: 'select', previousShapeSettings: shapeSettings,
                currentShapeSettings: shapeSettings };
            if (isBlazor() && parent.events && parent.events.shapeChanging.hasDelegate === true) {
                /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                parent.dotNetRef.invokeMethodAsync('ShapeEventAsync', 'OnShape', shapeChangingArgs).then(function (shapeChangingArgs) {
                    parent.activeObj.strokeSettings.strokeColor = parent.pointColl[_this.fhdSelIdx].strokeColor =
                        shapeChangingArgs.currentShapeSettings.strokeColor;
                    parent.activeObj.strokeSettings.strokeWidth = parent.pointColl[_this.fhdSelIdx].strokeWidth =
                        shapeChangingArgs.currentShapeSettings.strokeWidth;
                    parent.pointColl[_this.fhdSelIdx].points = shapeChangingArgs.currentShapeSettings.points;
                    _this.freehandRedraw(_this.upperContext);
                    parent.updateToolbar(parent.element, 'colorToolbar');
                });
            }
            else {
                parent.trigger('shapeChanging', shapeChangingArgs);
                parent.activeObj.strokeSettings.strokeColor = parent.pointColl[this.fhdSelIdx].strokeColor =
                    shapeChangingArgs.currentShapeSettings.strokeColor;
                parent.activeObj.strokeSettings.strokeWidth = parent.pointColl[this.fhdSelIdx].strokeWidth =
                    shapeChangingArgs.currentShapeSettings.strokeWidth;
                parent.pointColl[this.fhdSelIdx].points = shapeChangingArgs.currentShapeSettings.points;
                this.freehandRedraw(this.upperContext);
                parent.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'pen',
                        isApplyBtn: null, isCropping: null, isZooming: null, cType: null } });
            }
        }
        else {
            parent.okBtn();
        }
    };
    FreehandDrawing.prototype.deleteFhd = function (index, isId) {
        var parent = this.parent;
        if (this.isFHDIdx(index)) {
            this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
            // eslint-disable-next-line
            var tempPointColl = extend({}, parent.pointColl, {}, true);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var tempSelPointColl = extend({}, this.selPointColl, {}, true);
            parent.pointColl = {};
            this.selPointColl = {};
            var count = 0;
            if (isNullOrUndefined(isId)) {
                for (var i = 0; i < parent.freehandCounter; i++) {
                    if (i !== index) {
                        parent.pointColl[count] = tempPointColl[i];
                        this.selPointColl[count] = tempSelPointColl[i];
                        count++;
                    }
                }
            }
            else {
                for (var i = 0; i < parent.freehandCounter; i++) {
                    if (parseInt(tempPointColl[i].id.split('_')[1], 10) - 1 !== index) {
                        parent.pointColl[count] = tempPointColl[i];
                        this.selPointColl[count] = tempSelPointColl[i];
                        count++;
                    }
                }
            }
            parent.freehandCounter -= 1;
            this.fhdHovIdx = this.fhdSelIdx = null;
            parent.notify('selection', { prop: 'resetFreehandDrawVariables' });
            parent.notify('draw', { prop: 'render-image', value: { isMouseWheel: true } });
            if (!isBlazor()) {
                parent.notify('toolbar', { prop: 'refresh-main-toolbar', onPropertyChange: false });
            }
        }
    };
    FreehandDrawing.prototype.zoomX = function (x) {
        return (x * this.parent.img.destWidth) + this.parent.img.destLeft;
    };
    FreehandDrawing.prototype.zoomY = function (y) {
        return (y * this.parent.img.destHeight) + this.parent.img.destTop;
    };
    FreehandDrawing.prototype.zoomFHDColl = function (isPreventApply) {
        var parent = this.parent;
        // Updating point collection for zoom
        for (var n = 0; n < parent.freehandCounter; n++) {
            parent.points = extend([], parent.pointColl[n].points, []);
            this.pointCounter = 0;
            var len = parent.points.length;
            for (var l = 0; l < len; l++) {
                parent.points[l].x = this.zoomX(parent.points[l].ratioX);
                parent.points[l].y = this.zoomY(parent.points[l].ratioY);
            }
        }
        // Updating each points for cursor styles for zoom
        this.updateFHDCurPts();
        if (isNullOrUndefined(isPreventApply)) {
            this.freehandRedraw(this.lowerContext, null);
        }
    };
    FreehandDrawing.prototype.updateFHDCurPts = function () {
        var parent = this.parent;
        for (var n = 0; n < parent.freehandCounter; n++) {
            if (this.selPointColl[n]) {
                this.selPoints = extend([], this.selPointColl[n].points, []);
                this.pointCounter = 0;
                var len = this.selPoints.length;
                for (var l = 0; l < len; l++) {
                    this.selPoints[l].x = this.zoomX(this.selPoints[l].ratioX);
                    this.selPoints[l].y = this.zoomY(this.selPoints[l].ratioY);
                }
            }
        }
    };
    FreehandDrawing.prototype.rotateFhdColl = function () {
        var parent = this.parent;
        // Update rotation points for point collection
        for (var n = 0; n < parent.freehandCounter; n++) {
            parent.points = extend([], parent.pointColl[n].points, []);
            this.pointCounter = 0;
            var len = parent.points.length;
            for (var l = 0; l < len; l++) {
                parent.points[l].y = parent.img.destTop + (parent.img.destHeight * parent.points[l].ratioX);
                parent.points[l].x = (parent.img.destLeft + parent.img.destWidth) - (parent.img.destWidth *
                    parent.points[l].ratioY);
                parent.points[l].ratioX = (parent.points[l].x - parent.img.destLeft) / parent.img.destWidth;
                parent.points[l].ratioY = (parent.points[l].y - parent.img.destTop) / parent.img.destHeight;
            }
        }
        // Update rotation points for each point for cursor styles
        for (var n = 0; n < parent.freehandCounter; n++) {
            if (this.selPointColl[n]) {
                this.selPoints = extend([], this.selPointColl[n].points, []);
                this.pointCounter = 0;
                var len = this.selPoints.length;
                for (var l = 0; l < len; l++) {
                    this.selPoints[l].y = parent.img.destTop + (parent.img.destHeight * this.selPoints[l].ratioX);
                    this.selPoints[l].x = (parent.img.destLeft + parent.img.destWidth) - (parent.img.destWidth *
                        this.selPoints[l].ratioY);
                    this.selPoints[l].ratioX = (this.selPoints[l].x - parent.img.destLeft) / parent.img.destWidth;
                    this.selPoints[l].ratioY = (this.selPoints[l].y - parent.img.destTop) / parent.img.destHeight;
                }
            }
        }
        this.updateFHDCurPts();
    };
    FreehandDrawing.prototype.flipFHDColl = function (value) {
        var lowercaseValue = value.toLowerCase();
        if (lowercaseValue === 'horizontal') {
            this.pointsHorizontalFlip();
        }
        else if (lowercaseValue === 'vertical') {
            this.pointsVerticalFlip();
        }
        else {
            this.pointsHorizontalFlip();
            for (var i = 0; i < this.parent.freehandCounter; i++) {
                this.parent.pointColl[i].shapeFlip = '';
            }
            this.pointsVerticalFlip();
        }
    };
    FreehandDrawing.prototype.pointsHorizontalFlip = function () {
        var parent = this.parent;
        // Update flip value for point collection
        for (var n = 0; n < parent.freehandCounter; n++) {
            if (parent.pointColl[n].shapeFlip !== parent.transform.currFlipState) {
                parent.points = extend([], parent.pointColl[n].points, []);
                this.pointCounter = 0;
                var len = parent.points.length;
                for (var l = 0; l < len; l++) {
                    if (parent.points[l].x <= parent.img.destLeft + (parent.img.destWidth / 2)) {
                        parent.points[l].x = (parent.img.destLeft + parent.img.destWidth) - (parent.points[l].x
                            - parent.img.destLeft);
                    }
                    else if (parent.points[l].x >= parent.img.destLeft + (parent.img.destWidth / 2)) {
                        parent.points[l].x = parent.img.destLeft + (parent.img.destLeft + parent.img.destWidth -
                            parent.points[l].x);
                    }
                    parent.points[l].ratioX = (parent.points[l].x - parent.img.destLeft) / parent.img.destWidth;
                    parent.points[l].ratioY = (parent.points[l].y - parent.img.destTop) / parent.img.destHeight;
                }
                parent.pointColl[n].shapeFlip = parent.transform.currFlipState;
            }
        }
        // Update flip value for each points for cursor styles
        for (var n = 0; n < parent.freehandCounter; n++) {
            if (this.selPointColl[n]) {
                if (this.selPointColl[n].shapeFlip !== parent.transform.currFlipState) {
                    this.selPoints = extend([], this.selPointColl[n].points, []);
                    this.pointCounter = 0;
                    var len = this.selPoints.length;
                    for (var l = 0; l < len; l++) {
                        if (this.selPoints[l].x <= parent.img.destLeft + (parent.img.destWidth / 2)) {
                            this.selPoints[l].x = (parent.img.destLeft + parent.img.destWidth) - (this.selPoints[l].x -
                                parent.img.destLeft);
                        }
                        else if (this.selPoints[l].x >= parent.img.destLeft + (parent.img.destWidth / 2)) {
                            this.selPoints[l].x = parent.img.destLeft + (parent.img.destLeft + parent.img.destWidth -
                                this.selPoints[l].x);
                        }
                        this.selPoints[l].ratioX = (this.selPoints[l].x - parent.img.destLeft) / parent.img.destWidth;
                        this.selPoints[l].ratioY = (this.selPoints[l].y - parent.img.destTop) / parent.img.destHeight;
                    }
                }
            }
        }
        this.updateFHDCurPts();
    };
    FreehandDrawing.prototype.pointsVerticalFlip = function () {
        var parent = this.parent;
        // Update flip value for point collection
        for (var n = 0; n < parent.freehandCounter; n++) {
            if (parent.pointColl[n].shapeFlip !== parent.transform.currFlipState) {
                parent.points = extend([], parent.pointColl[n].points, []);
                this.pointCounter = 0;
                var len = parent.points.length;
                for (var l = 0; l < len; l++) {
                    if (parent.points[l].y <= parent.img.destTop + (parent.img.destHeight / 2)) {
                        parent.points[l].y = (parent.img.destTop + parent.img.destHeight) -
                            (parent.points[l].y - parent.img.destTop);
                    }
                    else if (parent.points[l].y >= parent.img.destTop + (parent.img.destHeight / 2)) {
                        parent.points[l].y = parent.img.destTop + (parent.img.destTop + parent.img.destHeight -
                            parent.points[l].y);
                    }
                    parent.points[l].ratioX = (parent.points[l].x - parent.img.destLeft) / parent.img.destWidth;
                    parent.points[l].ratioY = (parent.points[l].y - parent.img.destTop) / parent.img.destHeight;
                }
                parent.pointColl[n].shapeFlip = parent.transform.currFlipState;
            }
        }
        // Update flip value for each points for cursor styles
        for (var n = 0; n < parent.freehandCounter; n++) {
            if (this.selPointColl[n]) {
                if (this.selPointColl[n].shapeFlip !== parent.transform.currFlipState) {
                    this.selPoints = extend([], this.selPointColl[n].points, []);
                    this.pointCounter = 0;
                    var len = this.selPoints.length;
                    for (var l = 0; l < len; l++) {
                        if (this.selPoints[l].y <= parent.img.destTop + (parent.img.destHeight / 2)) {
                            this.selPoints[l].y = (parent.img.destTop + parent.img.destHeight) - (this.selPoints[l].y -
                                parent.img.destTop);
                        }
                        else if (this.selPoints[l].y >= parent.img.destTop + (parent.img.destHeight / 2)) {
                            this.selPoints[l].y = parent.img.destTop + (parent.img.destTop + parent.img.destHeight -
                                this.selPoints[l].y);
                        }
                        this.selPoints[l].ratioX = (this.selPoints[l].x - parent.img.destLeft) / parent.img.destWidth;
                        this.selPoints[l].ratioY = (this.selPoints[l].y - parent.img.destTop) / parent.img.destHeight;
                    }
                }
            }
        }
        this.updateFHDCurPts();
    };
    FreehandDrawing.prototype.updateFHDColl = function () {
        var parent = this.parent;
        for (var i = 0; i < parent.objColl.length; i++) {
            parent.objColl[i].imageRatio = { startX: ((parent.objColl[i].activePoint.startX - parent.img.destLeft) /
                    parent.img.destWidth), startY: ((parent.objColl[i].activePoint.startY - parent.img.destTop) / parent.img.destHeight),
                endX: ((parent.objColl[i].activePoint.endX - parent.img.destLeft) / parent.img.destWidth),
                endY: ((parent.objColl[i].activePoint.endY - parent.img.destTop) / parent.img.destHeight),
                width: parent.img.destWidth / parent.objColl[i].activePoint.width, height: parent.img.destHeight /
                    parent.objColl[i].activePoint.height };
            if (parent.objColl[i].shape === 'path') {
                for (var j = 0; j < parent.objColl[i].pointColl.length; j++) {
                    parent.objColl[i].pointColl[j].ratioX =
                        (parent.objColl[i].pointColl[j].x - parent.img.destLeft) / parent.img.destWidth;
                    parent.objColl[i].pointColl[j].ratioY =
                        (parent.objColl[i].pointColl[j].y - parent.img.destTop) / parent.img.destHeight;
                }
            }
            parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
        }
        for (var n = 0; n < parent.freehandCounter; n++) {
            parent.points = extend([], parent.pointColl[n].points, []);
            this.pointCounter = 0;
            var len = parent.points.length;
            for (var l = 0; l < len; l++) {
                parent.points[l].ratioX = (parent.points[l].x - parent.img.destLeft) / parent.img.destWidth;
                parent.points[l].ratioY = (parent.points[l].y - parent.img.destTop) / parent.img.destHeight;
            }
        }
        for (var n = 0; n < parent.freehandCounter; n++) {
            if (this.selPointColl[n]) {
                this.selPoints = extend([], this.selPointColl[n].points, []);
                this.pointCounter = 0;
                var len = this.selPoints.length;
                for (var l = 0; l < len; l++) {
                    this.selPoints[l].ratioX = (this.selPoints[l].x - parent.img.destLeft) / parent.img.destWidth;
                    this.selPoints[l].ratioY = (this.selPoints[l].y - parent.img.destTop) / parent.img.destHeight;
                }
            }
        }
    };
    FreehandDrawing.prototype.panFHDColl = function (xDiff, yDiff, panRegion) {
        var parent = this.parent;
        // Updating point collection for panning
        for (var n = 0; n < parent.freehandCounter; n++) {
            parent.points = extend([], parent.pointColl[n].points, []);
            this.pointCounter = 0;
            var len = parent.points.length;
            for (var l = 0; l < len; l++) {
                if (panRegion === '' || panRegion === 'vertical') {
                    parent.points[l].x += xDiff;
                }
                else {
                    parent.points[l].x -= xDiff;
                }
                if (panRegion === '' || panRegion === 'horizontal') {
                    parent.points[l].y += yDiff;
                }
                else {
                    parent.points[l].y -= yDiff;
                }
            }
        }
        // Updating each points for cursor styles for panning
        for (var n = 0; n < parent.freehandCounter; n++) {
            if (this.selPointColl[n]) {
                this.selPoints = extend([], this.selPointColl[n].points, []);
                this.pointCounter = 0;
                var len = this.selPoints.length;
                for (var l = 0; l < len; l++) {
                    if (panRegion === '' || panRegion === 'vertical') {
                        this.selPoints[l].x += xDiff;
                    }
                    else {
                        this.selPoints[l].x -= xDiff;
                    }
                    if (panRegion === '' || panRegion === 'horizontal') {
                        this.selPoints[l].y += yDiff;
                    }
                    else {
                        this.selPoints[l].y -= yDiff;
                    }
                }
            }
        }
        this.freehandRedraw(this.lowerContext, null);
    };
    FreehandDrawing.prototype.freeHandDraw = function (value) {
        var parent = this.parent;
        if (value) {
            parent.points = [];
            this.dummyPoints = [];
            parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
            parent.togglePen = true;
            parent.upperCanvas.style.cursor = parent.cursor = 'crosshair';
            parent.upperCanvas.style.display = 'block';
            if (isNullOrUndefined(parent.activeObj.strokeSettings)) {
                var obj = { strokeSettings: {} };
                parent.notify('shape', { prop: 'getStrokeSettings', onPropertyChange: false,
                    value: { obj: obj } });
                parent.activeObj.strokeSettings = obj['strokeSettings'];
            }
            if (isNullOrUndefined(parent.activeObj.strokeSettings.strokeWidth)) {
                parent.activeObj.strokeSettings.strokeWidth = 4;
            }
            if (!isBlazor()) {
                parent.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'pen',
                        isApplyBtn: null, isCropping: null, isZooming: null, cType: null } });
            }
            else {
                parent.updateToolbar(parent.element, 'pen');
            }
        }
        else {
            parent.upperCanvas.style.cursor = parent.cursor = 'default';
            parent.notify('shape', { prop: 'apply', onPropertyChange: false, value: { shape: null, obj: null, canvas: null } });
            if (!isBlazor()) {
                parent.notify('toolbar', { prop: 'refresh-main-toolbar', onPropertyChange: false });
                parent.notify('toolbar', { prop: 'setCurrentToolbar', value: { type: 'main' } });
            }
            else {
                parent.updateToolbar(parent.element, 'imageLoaded');
            }
            parent.notify('selection', { prop: 'setFreehandDrawCustomized', value: { isFreehandDrawCustomized: false } });
        }
    };
    FreehandDrawing.prototype.isFHDIdx = function (index, obj) {
        var isIndex = false;
        for (var i = 0; i < this.parent.freehandCounter; i++) {
            if (this.parent.pointColl[i].id &&
                parseInt(this.parent.pointColl[i].id.split('_')[1], 10) - 1 === index) {
                isIndex = true;
                break;
            }
        }
        if (obj) {
            obj['isIndex'] = isIndex;
        }
        return isIndex;
    };
    FreehandDrawing.prototype.updateCropPtsForSel = function () {
        var parent = this.parent;
        for (var n = 0; n < parent.freehandCounter; n++) {
            var obj = { selPointColl: extend([], this.selPointColl) };
            if (obj['selPointColl'][n]) {
                this.selPoints = extend([], obj['selPointColl'][n].points, []);
                this.pointCounter = 0;
                var len = this.selPoints.length;
                for (var l = 0; l < len; l++) {
                    this.selPoints[l].ratioX = (this.selPoints[l].x -
                        parent.activeObj.activePoint.startX) / parent.activeObj.activePoint.width;
                    this.selPoints[l].ratioY = (this.selPoints[l].y -
                        parent.activeObj.activePoint.startY) / parent.activeObj.activePoint.height;
                }
            }
        }
    };
    return FreehandDrawing;
}());
export { FreehandDrawing };
