/// <reference types="react" />
import * as React from "react";
import { IIntentProps, IProps } from "../../common";
import { IconName } from "../icon/icon";
/** This component also supports the full range of HTML `<div>` props. */
export interface ICalloutProps extends IIntentProps, IProps {
    /** Name of icon to render on left-hand side. */
    iconName?: IconName;
    /**
     * String content of optional title element.
     *
     * Due to a conflict with the HTML prop types, to provide JSX content simply pass
     * `<h5 className="pt-callout-title">JSX title content<h5>` as first `children` element instead of using this prop.
     */
    title?: string;
}
export declare class Callout extends React.Component<ICalloutProps & React.HTMLAttributes<HTMLDivElement>, {}> {
    render(): JSX.Element;
}
