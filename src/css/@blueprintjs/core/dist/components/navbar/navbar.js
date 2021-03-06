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
var navbarDivider_1 = require("./navbarDivider");
var navbarGroup_1 = require("./navbarGroup");
var navbarHeading_1 = require("./navbarHeading");
// this component is simple enough that tests would be purely tautological.
/* istanbul ignore next */
var Navbar = (function (_super) {
    tslib_1.__extends(Navbar, _super);
    function Navbar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Navbar.prototype.render = function () {
        var _a = this.props, children = _a.children, className = _a.className, htmlProps = tslib_1.__rest(_a, ["children", "className"]);
        return (React.createElement("div", tslib_1.__assign({ className: classNames(Classes.NAVBAR, className) }, htmlProps), children));
    };
    Navbar.displayName = "Blueprint.Navbar";
    Navbar.Divider = navbarDivider_1.NavbarDivider;
    Navbar.Group = navbarGroup_1.NavbarGroup;
    Navbar.Heading = navbarHeading_1.NavbarHeading;
    Navbar = tslib_1.__decorate([
        PureRender
    ], Navbar);
    return Navbar;
}(React.Component));
exports.Navbar = Navbar;
