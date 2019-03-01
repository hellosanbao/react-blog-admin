import React, {Component} from 'react'
import { CSSTransition } from 'react-transition-group'
import 'animate.css/animate.min.css'
export function wrapAnimation(WrappedComponent) {
    return class extends Component {
        state={
            show:false
        }
        componentDidMount(){
            this.setState({
                show:true
            })
        }
        render() {
            return (
                <CSSTransition
                    in={this.state.show}
                    classNames={{
                        enter: 'animated',
                        enterActive: 'fadeIn',
                        exit: 'animated',
                        exitActive: 'fadeOut'
                    }}
                    timeout={1000}
                    mountOnEnter={true}
                    unmountOnExit={true}
                >
                    <WrappedComponent {...this.props} />
                </CSSTransition>
            )
        }
    }
}
