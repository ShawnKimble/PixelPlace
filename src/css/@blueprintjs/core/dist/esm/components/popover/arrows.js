/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */
import { Position } from "../../common/position";
// this value causes popover and target edges to line up on 50px targets
export var MIN_ARROW_SPACING = 18;
export function computeArrowOffset(sideLength, arrowSize, minimum) {
    if (minimum === void 0) { minimum = MIN_ARROW_SPACING; }
    return Math.max(Math.round((sideLength - arrowSize) / 2), minimum);
}
export function getPopoverTransformOrigin(position, arrowSize, targetDimensions) {
    var offsetX = computeArrowOffset(targetDimensions.width, arrowSize);
    var offsetY = computeArrowOffset(targetDimensions.height, arrowSize);
    switch (position) {
        case Position.TOP_LEFT:
            return offsetX + "px bottom";
        case Position.TOP_RIGHT:
            return "calc(100% - " + offsetX + "px) bottom";
        case Position.BOTTOM_LEFT:
            return offsetX + "px top";
        case Position.BOTTOM_RIGHT:
            return "calc(100% - " + offsetX + "px) top";
        case Position.LEFT_TOP:
            return "right " + offsetY + "px";
        case Position.LEFT_BOTTOM:
            return "right calc(100% - " + offsetY + "px)";
        case Position.RIGHT_TOP:
            return "left " + offsetY + "px";
        case Position.RIGHT_BOTTOM:
            return "left calc(100% - " + offsetY + "px)";
        default:
            return undefined;
    }
}
export function getArrowPositionStyles(position, arrowSize, ignoreTargetDimensions, targetDimensions, inline) {
    // compute the offset to center an arrow with given hypotenuse in a side of the given length
    var popoverOffset = function (sideLength) {
        var offset = computeArrowOffset(sideLength, arrowSize, 0);
        return offset < MIN_ARROW_SPACING ? MIN_ARROW_SPACING - offset : 0;
    };
    var popoverOffsetX = popoverOffset(targetDimensions.width);
    var popoverOffsetY = popoverOffset(targetDimensions.height);
    // TOP, RIGHT, BOTTOM, LEFT are handled purely in CSS because of centering transforms
    switch (position) {
        case Position.TOP_LEFT:
        case Position.BOTTOM_LEFT:
            return {
                arrow: ignoreTargetDimensions ? {} : { left: computeArrowOffset(targetDimensions.width, arrowSize) },
                container: { marginLeft: -popoverOffsetX },
            };
        case Position.TOP_RIGHT:
        case Position.BOTTOM_RIGHT:
            return {
                arrow: ignoreTargetDimensions ? {} : { right: computeArrowOffset(targetDimensions.width, arrowSize) },
                container: { marginLeft: popoverOffsetX },
            };
        case Position.RIGHT_TOP:
        case Position.LEFT_TOP:
            return {
                arrow: ignoreTargetDimensions ? {} : { top: computeArrowOffset(targetDimensions.height, arrowSize) },
                container: inline ? { top: -popoverOffsetY } : { marginTop: -popoverOffsetY },
            };
        case Position.RIGHT_BOTTOM:
        case Position.LEFT_BOTTOM:
            return {
                arrow: ignoreTargetDimensions ? {} : { bottom: computeArrowOffset(targetDimensions.height, arrowSize) },
                container: inline ? { bottom: -popoverOffsetY } : { marginTop: popoverOffsetY },
            };
        default:
            return {};
    }
}
