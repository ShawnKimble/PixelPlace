"use strict";
/*
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var classNames = require("classnames");
var PureRender = require("pure-render-decorator");
var React = require("react");
var abstractComponent_1 = require("../../common/abstractComponent");
var Classes = require("../../common/classes");
var Keys = require("../../common/keys");
var utils_1 = require("../../common/utils");
// props that require number values, for validation
var NUMBER_PROPS = ["max", "min", "stepSize", "tickSize", "value"];
var Handle = (function (_super) {
    tslib_1.__extends(Handle, _super);
    function Handle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isMoving: false,
        };
        _this.refHandlers = {
            handle: function (el) { return (_this.handleElement = el); },
        };
        _this.beginHandleMovement = function (event) {
            document.addEventListener("mousemove", _this.handleHandleMovement);
            document.addEventListener("mouseup", _this.endHandleMovement);
            _this.setState({ isMoving: true });
            _this.changeValue(_this.clientToValue(_this.mouseEventClientOffset(event)));
        };
        _this.beginHandleTouchMovement = function (event) {
            document.addEventListener("touchmove", _this.handleHandleTouchMovement);
            document.addEventListener("touchend", _this.endHandleTouchMovement);
            document.addEventListener("touchcancel", _this.endHandleTouchMovement);
            _this.setState({ isMoving: true });
            _this.changeValue(_this.clientToValue(_this.touchEventClientOffset(event)));
        };
        _this.endHandleMovement = function (event) {
            _this.handleMoveEndedAt(_this.mouseEventClientOffset(event));
        };
        _this.endHandleTouchMovement = function (event) {
            _this.handleMoveEndedAt(_this.touchEventClientOffset(event));
        };
        _this.handleMoveEndedAt = function (clientPixel) {
            _this.removeDocumentEventListeners();
            _this.setState({ isMoving: false });
            // not using changeValue because we want to invoke the handler regardless of current prop value
            var onRelease = _this.props.onRelease;
            var finalValue = _this.clamp(_this.clientToValue(clientPixel));
            utils_1.safeInvoke(onRelease, finalValue);
        };
        _this.handleHandleMovement = function (event) {
            _this.handleMovedTo(_this.mouseEventClientOffset(event));
        };
        _this.handleHandleTouchMovement = function (event) {
            _this.handleMovedTo(_this.touchEventClientOffset(event));
        };
        _this.handleMovedTo = function (clientPixel) {
            if (_this.state.isMoving && !_this.props.disabled) {
                _this.changeValue(_this.clientToValue(clientPixel));
            }
        };
        _this.handleKeyDown = function (event) {
            var _a = _this.props, stepSize = _a.stepSize, value = _a.value;
            var which = event.which;
            if (which === Keys.ARROW_DOWN || which === Keys.ARROW_LEFT) {
                _this.changeValue(value - stepSize);
                // this key event has been handled! prevent browser scroll on up/down
                event.preventDefault();
            }
            else if (which === Keys.ARROW_UP || which === Keys.ARROW_RIGHT) {
                _this.changeValue(value + stepSize);
                event.preventDefault();
            }
        };
        _this.handleKeyUp = function (event) {
            if ([Keys.ARROW_UP, Keys.ARROW_DOWN, Keys.ARROW_LEFT, Keys.ARROW_RIGHT].indexOf(event.which) >= 0) {
                utils_1.safeInvoke(_this.props.onRelease, _this.props.value);
            }
        };
        return _this;
    }
    Handle.prototype.render = function () {
        var _a = this.props, className = _a.className, disabled = _a.disabled, label = _a.label, min = _a.min, tickSize = _a.tickSize, value = _a.value, vertical = _a.vertical;
        var isMoving = this.state.isMoving;
        var handleMidpoint = this.getHandleMidpointAndOffset(this.handleElement, true).handleMidpoint;
        var offset = Math.round((value - min) * tickSize - handleMidpoint);
        var style = vertical ? { bottom: offset } : { left: offset };
        return (React.createElement("span", { className: classNames(Classes.SLIDER_HANDLE, (_b = {}, _b[Classes.ACTIVE] = isMoving, _b), className), onKeyDown: disabled ? null : this.handleKeyDown, onKeyUp: disabled ? null : this.handleKeyUp, onMouseDown: disabled ? null : this.beginHandleMovement, onTouchStart: disabled ? null : this.beginHandleTouchMovement, ref: this.refHandlers.handle, style: style, tabIndex: 0 }, label == null ? null : React.createElement("span", { className: Classes.SLIDER_LABEL }, label)));
        var _b;
    };
    Handle.prototype.componentWillUnmount = function () {
        this.removeDocumentEventListeners();
    };
    /** Convert client pixel to value between min and max. */
    Handle.prototype.clientToValue = function (clientPixel) {
        var _a = this.props, stepSize = _a.stepSize, tickSize = _a.tickSize, value = _a.value, vertical = _a.vertical;
        if (this.handleElement == null) {
            return value;
        }
        // #1769: this logic doesn't work perfectly when the tick size is
        // smaller than the handle size; it may be off by a tick or two.
        var clientPixelNormalized = vertical ? window.innerHeight - clientPixel : clientPixel;
        var handleCenterPixel = this.getHandleElementCenterPixel(this.handleElement);
        var pixelDelta = clientPixelNormalized - handleCenterPixel;
        // convert pixels to range value in increments of `stepSize`
        var valueDelta = Math.round(pixelDelta / (tickSize * stepSize)) * stepSize;
        return value + valueDelta;
    };
    Handle.prototype.mouseEventClientOffset = function (event) {
        return this.props.vertical ? event.clientY : event.clientX;
    };
    Handle.prototype.touchEventClientOffset = function (event) {
        var touch = event.changedTouches[0];
        return this.props.vertical ? touch.clientY : touch.clientX;
    };
    Handle.prototype.validateProps = function (props) {
        for (var _i = 0, NUMBER_PROPS_1 = NUMBER_PROPS; _i < NUMBER_PROPS_1.length; _i++) {
            var prop = NUMBER_PROPS_1[_i];
            if (typeof props[prop] !== "number") {
                throw new Error("[Blueprint] <Handle> requires number value for " + prop + " prop");
            }
        }
    };
    /** Clamp value and invoke callback if it differs from current value */
    Handle.prototype.changeValue = function (newValue, callback) {
        if (callback === void 0) { callback = this.props.onChange; }
        newValue = this.clamp(newValue);
        if (!isNaN(newValue) && this.props.value !== newValue) {
            utils_1.safeInvoke(callback, newValue);
        }
    };
    /** Clamp value between min and max props */
    Handle.prototype.clamp = function (value) {
        return utils_1.clamp(value, this.props.min, this.props.max);
    };
    Handle.prototype.getHandleElementCenterPixel = function (handleElement) {
        var _a = this.getHandleMidpointAndOffset(handleElement), handleMidpoint = _a.handleMidpoint, handleOffset = _a.handleOffset;
        return handleOffset + handleMidpoint;
    };
    Handle.prototype.getHandleMidpointAndOffset = function (handleElement, useOppositeDimension) {
        if (useOppositeDimension === void 0) { useOppositeDimension = false; }
        if (handleElement == null) {
            return { handleMidpoint: 0, handleOffset: 0 };
        }
        var vertical = this.props.vertical;
        // getBoundingClientRect().height includes border size; clientHeight does not.
        var handleRect = handleElement.getBoundingClientRect();
        var sizeKey = vertical
            ? useOppositeDimension ? "width" : "height"
            : useOppositeDimension ? "height" : "width";
        // "bottom" value seems to be consistently incorrect, so explicitly
        // calculate it using the window offset instead.
        var handleOffset = vertical ? window.innerHeight - (handleRect.top + handleRect[sizeKey]) : handleRect.left;
        return { handleMidpoint: handleRect[sizeKey] / 2, handleOffset: handleOffset };
    };
    Handle.prototype.removeDocumentEventListeners = function () {
        document.removeEventListener("mousemove", this.handleHandleMovement);
        document.removeEventListener("mouseup", this.endHandleMovement);
        document.removeEventListener("touchmove", this.handleHandleTouchMovement);
        document.removeEventListener("touchend", this.endHandleTouchMovement);
        document.removeEventListener("touchcancel", this.endHandleTouchMovement);
    };
    Handle.displayName = "Blueprint.SliderHandle";
    Handle = tslib_1.__decorate([
        PureRender
    ], Handle);
    return Handle;
}(abstractComponent_1.AbstractComponent));
exports.Handle = Handle;
