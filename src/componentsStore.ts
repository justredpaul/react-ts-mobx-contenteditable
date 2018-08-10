import { observable } from "mobx";

export type InlineComponent = {
    element: any,
    wrapper: HTMLElement,
};

// @ts-ignore
class ComponentsStore {
    @observable components: InlineComponent[] = [];

    public addComponent(component: InlineComponent): void {
        this.components.push(component);
    }
}

export const store = new ComponentsStore();
