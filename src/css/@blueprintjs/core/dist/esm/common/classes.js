/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */
import { Intent } from "./intent";
// modifiers
export var DARK = "pt-dark";
export var ACTIVE = "pt-active";
export var MINIMAL = "pt-minimal";
export var DISABLED = "pt-disabled";
export var SMALL = "pt-small";
export var LARGE = "pt-large";
export var LOADING = "pt-loading";
export var INTERACTIVE = "pt-interactive";
export var ALIGN_LEFT = "pt-align-left";
export var ALIGN_RIGHT = "pt-align-right";
export var INLINE = "pt-inline";
export var FILL = "pt-fill";
export var FIXED = "pt-fixed";
export var FIXED_TOP = "pt-fixed-top";
export var VERTICAL = "pt-vertical";
export var ROUND = "pt-round";
// text utilities
export var TEXT_MUTED = "pt-text-muted";
export var TEXT_OVERFLOW_ELLIPSIS = "pt-text-overflow-ellipsis";
export var UI_TEXT_LARGE = "pt-ui-text-large";
// components
export var ALERT = "pt-alert";
export var ALERT_BODY = "pt-alert-body";
export var ALERT_CONTENTS = "pt-alert-contents";
export var ALERT_FOOTER = "pt-alert-footer";
export var BREADCRUMB = "pt-breadcrumb";
export var BREADCRUMB_CURRENT = "pt-breadcrumb-current";
export var BREADCRUMBS = "pt-breadcrumbs";
export var BREADCRUMBS_COLLAPSED = "pt-breadcrumbs-collapsed";
export var BUTTON = "pt-button";
export var BUTTON_GROUP = "pt-button-group";
export var CALLOUT = "pt-callout";
export var CALLOUT_TITLE = "pt-callout-title";
export var CARD = "pt-card";
export var COLLAPSE = "pt-collapse";
export var COLLAPSIBLE_LIST = "pt-collapse-list";
export var CONTEXT_MENU = "pt-context-menu";
export var CONTEXT_MENU_POPOVER_TARGET = "pt-context-menu-popover-target";
export var CONTROL = "pt-control";
export var CONTROL_GROUP = "pt-control-group";
export var CONTROL_INDICATOR = "pt-control-indicator";
export var DIALOG = "pt-dialog";
export var DIALOG_CONTAINER = "pt-dialog-container";
export var DIALOG_BODY = "pt-dialog-body";
export var DIALOG_CLOSE_BUTTON = "pt-dialog-close-button";
export var DIALOG_FOOTER = "pt-dialog-footer";
export var DIALOG_FOOTER_ACTIONS = "pt-dialog-footer-actions";
export var DIALOG_HEADER = "pt-dialog-header";
export var DIALOG_HEADER_TITLE = "pt-dialog-header-title";
export var EDITABLE_TEXT = "pt-editable-text";
export var ELEVATION_0 = "pt-elevation-0";
export var ELEVATION_1 = "pt-elevation-1";
export var ELEVATION_2 = "pt-elevation-2";
export var ELEVATION_3 = "pt-elevation-3";
export var ELEVATION_4 = "pt-elevation-4";
export var INPUT = "pt-input";
export var INPUT_GROUP = "pt-input-group";
export var CHECKBOX = "pt-checkbox";
export var RADIO = "pt-radio";
export var SWITCH = "pt-switch";
export var FILE_UPLOAD = "pt-file-upload";
export var FILE_UPLOAD_INPUT = "pt-file-upload-input";
export var INTENT_PRIMARY = "pt-intent-primary";
export var INTENT_SUCCESS = "pt-intent-success";
export var INTENT_WARNING = "pt-intent-warning";
export var INTENT_DANGER = "pt-intent-danger";
export var LABEL = "pt-label";
export var FORM_GROUP = "pt-form-group";
export var FORM_CONTENT = "pt-form-content";
export var FORM_HELPER_TEXT = "pt-form-helper-text";
export var MENU = "pt-menu";
export var MENU_ITEM = "pt-menu-item";
export var MENU_ITEM_LABEL = "pt-menu-item-label";
export var MENU_SUBMENU = "pt-submenu";
export var MENU_DIVIDER = "pt-menu-divider";
export var MENU_HEADER = "pt-menu-header";
export var NAVBAR = "pt-navbar";
export var NAVBAR_GROUP = "pt-navbar-group";
export var NAVBAR_HEADING = "pt-navbar-heading";
export var NAVBAR_DIVIDER = "pt-navbar-divider";
export var NON_IDEAL_STATE = "pt-non-ideal-state";
export var NON_IDEAL_STATE_ACTION = "pt-non-ideal-state-action";
export var NON_IDEAL_STATE_DESCRIPTION = "pt-non-ideal-state-description";
export var NON_IDEAL_STATE_ICON = "pt-non-ideal-state-icon";
export var NON_IDEAL_STATE_TITLE = "pt-non-ideal-state-title";
export var NON_IDEAL_STATE_VISUAL = "pt-non-ideal-state-visual";
export var NUMERIC_INPUT = "pt-numeric-input";
export var OVERLAY = "pt-overlay";
export var OVERLAY_BACKDROP = "pt-overlay-backdrop";
export var OVERLAY_CONTENT = "pt-overlay-content";
export var OVERLAY_INLINE = "pt-overlay-inline";
export var OVERLAY_OPEN = "pt-overlay-open";
export var OVERLAY_SCROLL_CONTAINER = "pt-overlay-scroll-container";
export var POPOVER = "pt-popover";
export var POPOVER_ARROW = "pt-popover-arrow";
export var POPOVER_BACKDROP = "pt-popover-backdrop";
export var POPOVER_CONTENT = "pt-popover-content";
export var POPOVER_DISMISS = "pt-popover-dismiss";
export var POPOVER_DISMISS_OVERRIDE = "pt-popover-dismiss-override";
export var POPOVER_OPEN = "pt-popover-open";
export var POPOVER_TARGET = "pt-popover-target";
export var TRANSITION_CONTAINER = "pt-transition-container";
export var PROGRESS_BAR = "pt-progress-bar";
export var PROGRESS_METER = "pt-progress-meter";
export var PROGRESS_NO_STRIPES = "pt-no-stripes";
export var PROGRESS_NO_ANIMATION = "pt-no-animation";
export var PORTAL = "pt-portal";
export var SELECT = "pt-select";
export var SKELETON = "pt-skeleton";
export var SLIDER = "pt-slider";
export var SLIDER_HANDLE = SLIDER + "-handle";
export var SLIDER_LABEL = SLIDER + "-label";
export var RANGE_SLIDER = "pt-range-slider";
export var SPINNER = "pt-spinner";
export var SVG_SPINNER = "pt-svg-spinner";
export var TAB = "pt-tab";
export var TAB_LIST = "pt-tab-list";
export var TAB_PANEL = "pt-tab-panel";
export var TABS = "pt-tabs";
export var TABLE = "pt-table";
export var TABLE_CONDENSED = "pt-condensed";
export var TABLE_STRIPED = "pt-striped";
export var TABLE_BORDERED = "pt-bordered";
export var TAG = "pt-tag";
export var TAG_REMOVABLE = "pt-tag-removable";
export var TAG_REMOVE = "pt-tag-remove";
export var TOAST = "pt-toast";
export var TOAST_CONTAINER = "pt-toast-container";
export var TOAST_MESSAGE = "pt-toast-message";
export var TOOLTIP = "pt-tooltip";
export var TREE = "pt-tree";
export var TREE_NODE = "pt-tree-node";
export var TREE_NODE_CARET = "pt-tree-node-caret";
export var TREE_NODE_CARET_CLOSED = "pt-tree-node-caret-closed";
export var TREE_NODE_CARET_NONE = "pt-tree-node-caret-none";
export var TREE_NODE_CARET_OPEN = "pt-tree-node-caret-open";
export var TREE_NODE_CONTENT = "pt-tree-node-content";
export var TREE_NODE_EXPANDED = "pt-tree-node-expanded";
export var TREE_NODE_ICON = "pt-tree-node-icon";
export var TREE_NODE_LABEL = "pt-tree-node-label";
export var TREE_NODE_LIST = "pt-tree-node-list";
export var TREE_NODE_SECONDARY_LABEL = "pt-tree-node-secondary-label";
export var TREE_NODE_SELECTED = "pt-tree-node-selected";
export var TREE_ROOT = "pt-tree-root";
export var ICON = "pt-icon";
export var ICON_STANDARD = "pt-icon-standard";
export var ICON_LARGE = "pt-icon-large";
/** Return CSS class for icon, whether or not 'pt-icon-' prefix is included */
export function iconClass(iconName) {
    if (iconName == null) {
        return undefined;
    }
    return iconName.indexOf("pt-icon-") === 0 ? iconName : "pt-icon-" + iconName;
}
export function intentClass(intent) {
    if (intent === void 0) { intent = Intent.NONE; }
    if (intent === Intent.NONE || Intent[intent] == null) {
        return undefined;
    }
    return "pt-intent-" + Intent[intent].toLowerCase();
}
