// @ts-ignore
import React, { Component } from 'react';
import { observer } from "mobx-react";
import Portal from "./portal";
import { InlineComponent } from "./componentsStore";

type Props = {
    componentsList: InlineComponent[],
};

@observer
class EditableBlock extends Component<Props> {
    private _blockElement: any;

    private getBlockRef = (node: any) => {
        this._blockElement = node
    };

    componentDidMount() {
        this._blockElement.focus();
    }

    render() {
        const {props: {componentsList}} = this;
        return (
            <div>
                <section
                    className="editable-block"
                    contentEditable
                    ref={this.getBlockRef}>
                    Это редактируемая область...
                </section>
                {componentsList.map(({element, wrapper}) => (
                    <Portal rootElement={wrapper}>
                        {element}
                    </Portal>
                ))}
            </div>
        )
    }
}

export default EditableBlock;