/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */
import * as tslib_1 from "tslib";
import * as classNames from "classnames";
import * as React from "react";
import * as Classes from "../../common/classes";
import * as Errors from "../../common/errors";
import { Position } from "../../common/position";
import { Menu } from "../menu/menu";
import { MenuItem } from "../menu/menuItem";
import { Popover } from "../popover/popover";
export var CollapseFrom;
(function (CollapseFrom) {
    CollapseFrom[CollapseFrom["START"] = 0] = "START";
    CollapseFrom[CollapseFrom["END"] = 1] = "END";
})(CollapseFrom || (CollapseFrom = {}));
var CollapsibleList = (function (_super) {
    tslib_1.__extends(CollapsibleList, _super);
    function CollapsibleList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CollapsibleList.prototype.render = function () {
        var _this = this;
        var collapseFrom = this.props.collapseFrom;
        var childrenLength = React.Children.count(this.props.children);
        var _a = this.partitionChildren(), visibleChildren = _a[0], collapsedChildren = _a[1];
        var visibleItems = visibleChildren.map(function (child, index) {
            var absoluteIndex = collapseFrom === CollapseFrom.START ? childrenLength - 1 - index : index;
            return (React.createElement("li", { className: _this.props.visibleItemClassName, key: absoluteIndex }, _this.props.renderVisibleItem(child.props, absoluteIndex)));
        });
        if (collapseFrom === CollapseFrom.START) {
            // reverse START list so separators appear before items
            visibleItems.reverse();
        }
        // construct dropdown menu for collapsed items
        var collapsedPopover;
        if (collapsedChildren.length > 0) {
            var position = collapseFrom === CollapseFrom.END ? Position.BOTTOM_RIGHT : Position.BOTTOM_LEFT;
            collapsedPopover = (React.createElement("li", { className: this.props.visibleItemClassName },
                React.createElement(Popover, tslib_1.__assign({ content: React.createElement(Menu, null, collapsedChildren), position: position }, this.props.dropdownProps), this.props.dropdownTarget)));
        }
        return (React.createElement("ul", { className: classNames(Classes.COLLAPSIBLE_LIST, this.props.className) },
            collapseFrom === CollapseFrom.START ? collapsedPopover : null,
            visibleItems,
            collapseFrom === CollapseFrom.END ? collapsedPopover : null));
    };
    // splits the list of children into two arrays: visible and collapsed
    CollapsibleList.prototype.partitionChildren = function () {
        if (this.props.children == null) {
            return [[], []];
        }
        var childrenArray = React.Children.map(this.props.children, function (child, index) {
            if (child.type !== MenuItem) {
                throw new Error(Errors.COLLAPSIBLE_LIST_INVALID_CHILD);
            }
            return React.cloneElement(child, { key: "visible-" + index });
        });
        if (this.props.collapseFrom === CollapseFrom.START) {
            // reverse START list so we can always slice visible items from the front of the list
            childrenArray.reverse();
        }
        var visibleItemCount = this.props.visibleItemCount;
        return [childrenArray.slice(0, visibleItemCount), childrenArray.slice(visibleItemCount)];
    };
    CollapsibleList.displayName = "Blueprint.CollapsibleList";
    CollapsibleList.defaultProps = {
        collapseFrom: CollapseFrom.START,
        dropdownTarget: null,
        renderVisibleItem: null,
        visibleItemCount: 3,
    };
    return CollapsibleList;
}(React.Component));
export { CollapsibleList };
export var CollapsibleListFactory = React.createFactory(CollapsibleList);
