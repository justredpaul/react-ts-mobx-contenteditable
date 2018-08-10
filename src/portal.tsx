// @ts-ignore
import React, { Component } from "react";
import { createPortal } from "react-dom";
import { observer } from "mobx-react";

type Props = {
    children: JSX.Element,
    rootElement: HTMLElement,
};

@observer
class Portal extends Component<Props> {
    private readonly containerElement: HTMLElement;

    constructor(props: Props) {
        super(props);
        this.containerElement = document.createElement('div');
        this.containerElement.style.display = 'inline';
        this.containerElement.contentEditable = 'false';
    }

    componentDidMount() {
        this.props.rootElement.appendChild(this.containerElement);
    }

    componentWillUnmount() {
        this.props.rootElement.removeChild(this.containerElement);
    }

    render() {
        return createPortal(
            this.props.children,
            this.containerElement
        );
    }
}

export default Portal;