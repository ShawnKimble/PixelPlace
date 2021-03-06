"use strict";
/*
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// HACKHACK: these components should go in separate files
// tslint:disable max-classes-per-file
var React = require("react");
var props_1 = require("../../common/props");
var abstractButton_1 = require("./abstractButton");
var Button = (function (_super) {
    tslib_1.__extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Button.prototype.render = function () {
        return (React.createElement("button", tslib_1.__assign({ type: "button" }, props_1.removeNonHTMLProps(this.props), this.getCommonButtonProps()), this.renderChildren()));
    };
    Button.displayName = "Blueprint.Button";
    return Button;
}(abstractButton_1.AbstractButton));
exports.Button = Button;
exports.ButtonFactory = React.createFactory(Button);
var AnchorButton = (function (_super) {
    tslib_1.__extends(AnchorButton, _super);
    function AnchorButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AnchorButton.prototype.render = function () {
        var _a = this.props, href = _a.href, _b = _a.tabIndex, tabIndex = _b === void 0 ? 0 : _b;
        var commonProps = this.getCommonButtonProps();
        return (React.createElement("a", tslib_1.__assign({ role: "button" }, props_1.removeNonHTMLProps(this.props), commonProps, { href: commonProps.disabled ? undefined : href, tabIndex: commonProps.disabled ? undefined : tabIndex }), this.renderChildren()));
    };
    AnchorButton.displayName = "Blueprint.AnchorButton";
    return AnchorButton;
}(abstractButton_1.AbstractButton));
exports.AnchorButton = AnchorButton;
exports.AnchorButtonFactory = React.createFactory(AnchorButton);
