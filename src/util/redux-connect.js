import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

export default (mode,action)=>{
    return connect(
        state=>state[mode],
        dispatch=>bindActionCreators(action,dispatch)
    )
}


