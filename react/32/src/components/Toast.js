import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./toast.css";

const types = ["success", "info", "error", "default", "warning"];
const destroyFns = [];
export default class Toast extends Component {
    static getDerivedStateFromProps(props, state) {
        if (props.visible) {
            state.visible = props.visible;
        }
        return null;
    }
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }
    closeToastHandler() {
        this.setState({ visible: false });
        this.props.destroy && this.props.destroy();
    }
    render() {
        const { type, children, showClose,left,top } = this.props;
        const { visible } = this.state;
        const newType = types.indexOf(type) > -1 ? type : "default";
        return (
            <React.Fragment>
                {
                    visible ? (
                        <div className={`toast toast-${newType}`} style={{ left,top }}>
                            {children}
                            {
                                showClose ? <span className="toast-close-btn" onClick={this.closeToastHandler.bind(this)}>&times;</span> : null
                            }
                        </div>
                    ) : null
                }
            </React.Fragment>
        )
    }
}
export function createToast(config) {
    const div = document.createElement("div");
    const app = document.querySelector(".toast-container");
    app.appendChild(div);
    let currentConfig = { ...config, close, visible: true,destroy };
    function destroy() {
        const unMountResult = ReactDOM.unmountComponentAtNode(div);
        if (unMountResult && div.parentElement) {
            div.parentElement.removeChild(div);
        }
        for (let i = 0, l = destroyFns.length; i < l; i++) {
            const fn = destroyFns[i];
            if (fn === close) {
                destroyFns.splice(i, 1);
                break;
            }
        }
    }
    function close() {
        currentConfig = {
            ...currentConfig,
            visible: false
        }
        render(currentConfig);
    }
    function render(props) {
        setTimeout(() => ReactDOM.render(<Toast {...props}>{props.message}</Toast>,div));
    }
    function update(updateConfig) {
        if (typeof updateConfig === 'function') {
            currentConfig = updateConfig(currentConfig);
        } else {
            currentConfig = {
                ...currentConfig,
                ...updateConfig
            }
        }
        render(currentConfig);
    }
    render(currentConfig);
    destroyFns.push(destroy);
    let autoCloseTime = Number(config.autoCloseTime);
        autoCloseTime = Number.isNaN(autoCloseTime) ? 0 : Math.min(10000, autoCloseTime);
    if(autoCloseTime > 0){
        setTimeout(() => {
            destroy();
        }, autoCloseTime);
    }
    return {
        destroy,
        close,
        update
    }
}
createToast.destroyAll = () => {
    destroyFns.forEach(destroy => {
        destroy && destroy();
    });
}