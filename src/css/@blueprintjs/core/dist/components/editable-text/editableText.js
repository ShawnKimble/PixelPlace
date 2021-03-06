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
var compatibility_1 = require("../../compatibility");
var BUFFER_WIDTH_EDGE = 5;
var BUFFER_WIDTH_IE = 30;
var EditableText = (function (_super) {
    tslib_1.__extends(EditableText, _super);
    function EditableText(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.refHandlers = {
            content: function (spanElement) {
                _this.valueElement = spanElement;
            },
            input: function (input) {
                if (input != null) {
                    input.focus();
                    var length_1 = input.value.length;
                    input.setSelectionRange(_this.props.selectAllOnFocus ? 0 : length_1, length_1);
                    if (!_this.props.selectAllOnFocus) {
                        input.scrollLeft = input.scrollWidth;
                    }
                }
            },
        };
        _this.cancelEditing = function () {
            var _a = _this.state, lastValue = _a.lastValue, value = _a.value;
            _this.setState({ isEditing: false, value: lastValue });
            if (value !== lastValue) {
                utils_1.safeInvoke(_this.props.onChange, lastValue);
            }
            utils_1.safeInvoke(_this.props.onCancel, lastValue);
        };
        _this.toggleEditing = function () {
            if (_this.state.isEditing) {
                var value = _this.state.value;
                _this.setState({ isEditing: false, lastValue: value });
                utils_1.safeInvoke(_this.props.onConfirm, value);
            }
            else if (!_this.props.disabled) {
                _this.setState({ isEditing: true });
            }
        };
        _this.handleFocus = function () {
            if (!_this.props.disabled) {
                _this.setState({ isEditing: true });
            }
        };
        _this.handleTextChange = function (event) {
            var value = event.target.value;
            // state value should be updated only when uncontrolled
            if (_this.props.value == null) {
                _this.setState({ value: value });
            }
            utils_1.safeInvoke(_this.props.onChange, value);
        };
        _this.handleKeyEvent = function (event) {
            var altKey = event.altKey, ctrlKey = event.ctrlKey, metaKey = event.metaKey, shiftKey = event.shiftKey, which = event.which;
            if (which === Keys.ESCAPE) {
                _this.cancelEditing();
                return;
            }
            var hasModifierKey = altKey || ctrlKey || metaKey || shiftKey;
            if (which === Keys.ENTER) {
                // prevent IE11 from full screening with alt + enter
                // shift + enter adds a newline by default
                if (altKey || shiftKey) {
                    event.preventDefault();
                }
                if (_this.props.confirmOnEnterKey && _this.props.multiline) {
                    if (event.target != null && hasModifierKey) {
                        insertAtCaret(event.target, "\n");
                        _this.handleTextChange(event);
                    }
                    else {
                        _this.toggleEditing();
                    }
                }
                else if (!_this.props.multiline || hasModifierKey) {
                    _this.toggleEditing();
                }
            }
        };
        var value = props.value == null ? props.defaultValue : props.value;
        _this.state = {
            inputHeight: 0,
            inputWidth: 0,
            isEditing: props.isEditing === true && props.disabled === false,
            lastValue: value,
            value: value,
        };
        return _this;
    }
    EditableText.prototype.render = function () {
        var _a = this.props, disabled = _a.disabled, multiline = _a.multiline;
        var value = this.props.value == null ? this.state.value : this.props.value;
        var hasValue = value != null && value !== "";
        var classes = classNames(Classes.EDITABLE_TEXT, Classes.intentClass(this.props.intent), (_b = {},
            _b[Classes.DISABLED] = disabled,
            _b["pt-editable-editing"] = this.state.isEditing,
            _b["pt-editable-placeholder"] = !hasValue,
            _b["pt-multiline"] = multiline,
            _b), this.props.className);
        var contentStyle;
        if (multiline) {
            // set height only in multiline mode when not editing
            // otherwise we're measuring this element to determine appropriate height of text
            contentStyle = { height: !this.state.isEditing ? this.state.inputHeight : null };
        }
        else {
            // minWidth only applies in single line mode (multiline == width 100%)
            contentStyle = {
                height: this.state.inputHeight,
                lineHeight: this.state.inputHeight != null ? this.state.inputHeight + "px" : null,
                minWidth: this.props.minWidth,
            };
        }
        // make enclosing div focusable when not editing, so it can still be tabbed to focus
        // (when editing, input itself is focusable so div doesn't need to be)
        var tabIndex = this.state.isEditing || disabled ? null : 0;
        return (React.createElement("div", { className: classes, onFocus: this.handleFocus, tabIndex: tabIndex },
            this.maybeRenderInput(value),
            React.createElement("span", { className: "pt-editable-content", ref: this.refHandlers.content, style: contentStyle }, hasValue ? value : this.props.placeholder)));
        var _b;
    };
    EditableText.prototype.componentDidMount = function () {
        this.updateInputDimensions();
    };
    EditableText.prototype.componentDidUpdate = function (_, prevState) {
        if (this.state.isEditing && !prevState.isEditing) {
            utils_1.safeInvoke(this.props.onEdit);
        }
        this.updateInputDimensions();
    };
    EditableText.prototype.componentWillReceiveProps = function (nextProps) {
        var state = {};
        if (nextProps.value != null) {
            state.value = nextProps.value;
        }
        if (nextProps.isEditing != null) {
            state.isEditing = nextProps.isEditing;
        }
        if (nextProps.disabled || (nextProps.disabled == null && this.props.disabled)) {
            state.isEditing = false;
        }
        this.setState(state);
    };
    EditableText.prototype.maybeRenderInput = function (value) {
        var _a = this.props, maxLength = _a.maxLength, multiline = _a.multiline;
        if (!this.state.isEditing) {
            return undefined;
        }
        var props = {
            className: "pt-editable-input",
            maxLength: maxLength,
            onBlur: this.toggleEditing,
            onChange: this.handleTextChange,
            onKeyDown: this.handleKeyEvent,
            ref: this.refHandlers.input,
            style: {
                height: this.state.inputHeight,
                lineHeight: !multiline && this.state.inputHeight != null ? this.state.inputHeight + "px" : null,
                width: multiline ? "100%" : this.state.inputWidth,
            },
            value: value,
        };
        return multiline ? React.createElement("textarea", tslib_1.__assign({}, props)) : React.createElement("input", tslib_1.__assign({ type: "text" }, props));
    };
    EditableText.prototype.updateInputDimensions = function () {
        if (this.valueElement != null) {
            var _a = this.props, maxLines = _a.maxLines, minLines = _a.minLines, minWidth = _a.minWidth, multiline = _a.multiline;
            var _b = this.valueElement, parentElement_1 = _b.parentElement, textContent = _b.textContent;
            var _c = this.valueElement, scrollHeight_1 = _c.scrollHeight, scrollWidth = _c.scrollWidth;
            var lineHeight = getLineHeight(this.valueElement);
            // add one line to computed <span> height if text ends in newline
            // because <span> collapses that trailing whitespace but <textarea> shows it
            if (multiline && this.state.isEditing && /\n$/.test(textContent)) {
                scrollHeight_1 += lineHeight;
            }
            if (lineHeight > 0) {
                // line height could be 0 if the isNaN block from getLineHeight kicks in
                scrollHeight_1 = utils_1.clamp(scrollHeight_1, minLines * lineHeight, maxLines * lineHeight);
            }
            // Chrome's input caret height misaligns text so the line-height must be larger than font-size.
            // The computed scrollHeight must also account for a larger inherited line-height from the parent.
            scrollHeight_1 = Math.max(scrollHeight_1, getFontSize(this.valueElement) + 1, getLineHeight(parentElement_1));
            // IE11 & Edge needs a small buffer so text does not shift prior to resizing
            if (compatibility_1.Browser.isEdge()) {
                scrollWidth += BUFFER_WIDTH_EDGE;
            }
            else if (compatibility_1.Browser.isInternetExplorer()) {
                scrollWidth += BUFFER_WIDTH_IE;
            }
            this.setState({
                inputHeight: scrollHeight_1,
                inputWidth: Math.max(scrollWidth, minWidth),
            });
            // synchronizes the ::before pseudo-element's height while editing for Chrome 53
            if (multiline && this.state.isEditing) {
                this.setTimeout(function () { return (parentElement_1.style.height = scrollHeight_1 + "px"); });
            }
        }
    };
    EditableText.defaultProps = {
        confirmOnEnterKey: false,
        defaultValue: "",
        disabled: false,
        maxLines: Infinity,
        minLines: 1,
        minWidth: 80,
        multiline: false,
        placeholder: "Click to Edit",
    };
    EditableText = tslib_1.__decorate([
        PureRender
    ], EditableText);
    return EditableText;
}(abstractComponent_1.AbstractComponent));
exports.EditableText = EditableText;
function getFontSize(element) {
    var fontSize = getComputedStyle(element).fontSize;
    return fontSize === "" ? 0 : parseInt(fontSize.slice(0, -2), 10);
}
function getLineHeight(element) {
    // getComputedStyle() => 18.0001px => 18
    var lineHeight = parseInt(getComputedStyle(element).lineHeight.slice(0, -2), 10);
    // this check will be true if line-height is a keyword like "normal"
    if (isNaN(lineHeight)) {
        // @see http://stackoverflow.com/a/18430767/6342931
        var line = document.createElement("span");
        line.innerHTML = "<br>";
        element.appendChild(line);
        var singleLineHeight = element.offsetHeight;
        line.innerHTML = "<br><br>";
        var doubleLineHeight = element.offsetHeight;
        element.removeChild(line);
        // this can return 0 in edge cases
        lineHeight = doubleLineHeight - singleLineHeight;
    }
    return lineHeight;
}
function insertAtCaret(el, text) {
    var selectionEnd = el.selectionEnd, selectionStart = el.selectionStart, value = el.value;
    if (selectionStart >= 0) {
        var before_1 = value.substring(0, selectionStart);
        var after_1 = value.substring(selectionEnd, value.length);
        var len = text.length;
        el.value = "" + before_1 + text + after_1;
        el.selectionStart = selectionStart + len;
        el.selectionEnd = selectionStart + len;
    }
}
exports.EditableTextFactory = React.createFactory(EditableText);
