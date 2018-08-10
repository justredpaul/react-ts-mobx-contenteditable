// @ts-ignore
import React, { Component } from 'react';
import { render } from 'react-dom';
import { ComponentsList } from './componentsList';
import EditableBlock from './editableBlock';
import './index.css';
import { store } from "./componentsStore";
import { observer } from "mobx-react";

type AppProps = {
    store: typeof store
};

@observer
class App extends Component<AppProps> {
  constructor(props: Readonly<AppProps>) {
    super(props);
  }

  render() {
    return (
      <main className="main">
        <ComponentsList addComponentFunction={this.props.store.addComponent} />
        <EditableBlock componentsList={this.props.store.components} />
      </main>
    );
  }
}

render(
    <App store={store} />,
    document.getElementById('root'),
);
