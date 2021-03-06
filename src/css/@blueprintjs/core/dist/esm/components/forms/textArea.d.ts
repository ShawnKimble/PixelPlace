/// <reference types="react" />
import * as React from "react";
import { IIntentProps, IProps } from "../../common/props";
export interface ITextAreaProps extends React.AllHTMLAttributes<HTMLTextAreaElement>, IIntentProps, IProps {
    /**
     * Whether the text area should take up the full width of its container.
     */
    fill?: boolean;
    /**
     * Whether the text area should appear with large styling.
     */
    large?: boolean;
}
export declare class TextArea extends React.Component<ITextAreaProps, {}> {
    static displayName: string;
    render(): JSX.Element;
}
export declare const TextAreaFactory: React.ComponentFactory<Readonly<{
    children?: React.ReactNode;
}> & Readonly<ITextAreaProps>, TextArea>;
