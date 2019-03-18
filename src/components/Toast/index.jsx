import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import './index.scss'

class Toast extends Component {
    static show = params => {
        let container = document.createElement("div");
        document.body.appendChild(container);

        function closeHandle() {
            ReactDOM.unmountComponentAtNode(container);
            document.body.removeChild(container);
            container = null;
        }

        ReactDOM.render(
            <Toast {...params} onClose={closeHandle} />,
            container
        );
        setTimeout(closeHandle,params.duration || 1000)
    };

    onChange = e => {
        this.setState({ text: e.target.value });
    };

    handleOk = () => {
        this.props.onOk(this.state.text);
    };

    render() {
        const { content } = this.props;
        return (
            <div className="Toast">
                <div className="mask"></div>
                <div className="toastContent animated fadeInDown">{content}</div>
            </div>
        );
    }
}


export default Toast