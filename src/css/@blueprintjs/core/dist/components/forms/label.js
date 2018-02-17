"use strict";
/**
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var classNames = require("classnames");
var PureRender = require("pure-render-decorator");
var React = require("react");
var Classes = require("../../common/classes");
// this component is simple enough that tests would be purely tautological.
/* istanbul ignore next */
var Label = (function (_super) {
    tslib_1.__extends(Label, _super);
    function Label() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Label.prototype.render = function () {
        var _a = this.props, children = _a.children, className = _a.className, disabled = _a.disabled, helperText = _a.helperText, text = _a.text, htmlProps = tslib_1.__rest(_a, ["children", "className", "disabled", "helperText", "text"]);
        var rootClasses = classNames(Classes.LABEL, (_b = {},
            _b[Classes.DISABLED] = disabled,
            _b), className);
        return (React.createElement("div", tslib_1.__assign({}, htmlProps, { className: rootClasses }),
            text,
            React.createElement("span", { className: classNames(Classes.TEXT_MUTED) }, helperText),
            children));
        var _b;
    };
    Label.displayName = "Blueprint.Label";
    Label = tslib_1.__decorate([
        PureRender
    ], Label);
    return Label;
}(React.Component));
exports.Label = Label;
exports.LabelFactory = React.createFactory(Label);
