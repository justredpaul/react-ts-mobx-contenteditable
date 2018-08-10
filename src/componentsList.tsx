// @ts-ignore
import React, { Component } from 'react';
import { DummyComponent } from "./dummyComponent";
import { withInjection } from "./injectableHOC";
// @ts-ignore
const nanoid = require("nanoid");
import { store } from "./componentsStore";
import { SecondDummyComponent } from "./secondDummyComponent";

type Props = {
    addComponentFunction: any
};

const generateInlineElement = (id: string) => {
    const inlineElement = document.createElement('span');
    inlineElement.setAttribute('class', 'component-wrapper');
    inlineElement.setAttribute('id', id);
    return inlineElement;
};

const insertInlineElement = () => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const parent = range.startContainer.parentElement;
    if (parent && ~Array.from(parent.classList).indexOf('editable-block')) {
        const id = nanoid();
        const fragment = document.createDocumentFragment();
        const inlineElement = generateInlineElement(id);

        fragment.appendChild(inlineElement);
        range.insertNode(fragment);

        return id;
    }
    throw new Error('Bad container to add');
};

const insertInlineAtCaretPosition = () => {
    return new Promise((resolve, reject) => {
        try {
            const id = insertInlineElement();
            resolve(id);
        } catch (error) {
            reject(error);
        }
    });
};

const addNewComponent = (element: any) => {
    insertInlineAtCaretPosition()
        .then((id: string) => {
            const wrapper: HTMLElement = (document.getElementById(id) as HTMLElement);
            store.addComponent({
                element,
                wrapper
            })
        })
        .catch(error => console.error(error));
};

const DummyComponentWithInjectionHOC = withInjection(
    DummyComponent,
    () => { addNewComponent(<DummyComponent />); }
);
const SecondDummyComponentWithInjectionHOC = withInjection(
    SecondDummyComponent,
    () => { addNewComponent(<SecondDummyComponent />); }
);

export class ComponentsList extends Component<Props> {
    render() {
        return (
            <section className="components-list">
                <h1 className="components-list__heading">Список компонентов</h1>
                <ul className="components-list__list">
                    <li className="components-list__item">
                        <DummyComponentWithInjectionHOC />
                    </li>
                    <li className="components-list__item">
                        <SecondDummyComponentWithInjectionHOC />
                    </li>
                </ul>
            </section>
        )
    }
}
