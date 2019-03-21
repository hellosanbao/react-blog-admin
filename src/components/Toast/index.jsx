import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Loading from '@src/components/Loading'
import './index.scss'

class Toast extends Component {
    static show = (params = {}) => {
        let container = document.createElement("div");
        document.body.appendChild(container);

        function closeHandle() {
            ReactDOM.unmountComponentAtNode(container);
            document.body.removeChild(container);
            container = null;
        }

        ReactDOM.render(
            <Toast {...params} />,
            container
        );
        setTimeout(closeHandle, params.duration || 1000)
    };
    static showLoading(params = {}) {
        this.container = document.createElement("div");
        let container = this.container
        document.body.appendChild(container);
        params.loading = true

        ReactDOM.render(
            <Toast {...params} />,
            container
        );
    };
    static hideLoading() {
        let container = this.container
        ReactDOM.unmountComponentAtNode(container);
        document.body.removeChild(container);
        container = null;
    }

    onChange = e => {
        this.setState({ text: e.target.value });
    };

    handleOk = () => {
        this.props.onOk(this.state.text);
    };

    render() {
        const { content, loading } = this.props;
        return (
            <div className="Toast">
                <div className="mask"></div>
                {
                    loading ? <Loading /> :
                        <div className="toastContent animated fadeInDown">{content}</div>
                }

            </div>
        );
    }
}


export default Toast