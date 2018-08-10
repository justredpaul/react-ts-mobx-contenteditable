// @ts-ignore
import React, { Component } from "react";

export const withInjection = (WrappedComponent: any, injectFunction: any) => {
    return class extends Component {
        handleClick = (event: any) => {
            event.preventDefault();
            event.stopPropagation();
            injectFunction(WrappedComponent);
        };

        render() {
            return (
                <button className="injectable-button" onClick={this.handleClick}>
                    <WrappedComponent />
                </button>
            );
        }
    }
};
