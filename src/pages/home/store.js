const stateDefault = {
    text: 'hello',
    atext: 'hello a',
}

//reducer
export function home  (state = stateDefault, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {...state,text:action.text}
    case 'ADD_TODO_ASYNC':
      return {...state,atext:action.text}
    default:
      return state
  }
}

//action
export const action = {
  todoapp (text) {
    return {
      type: 'ADD_TODO',
      text
    }
  },
  asyncTodoApp (text) {
    return (dispatch,getState) => {
      console.log(getState())
      setTimeout(()=>{
        dispatch({
          type: 'ADD_TODO_ASYNC',
          text
        })
      },100)
    }
  }
}



