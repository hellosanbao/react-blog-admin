import React, { Component } from 'react';
import { Provider } from 'mobx-react'
import stores from '../store'
import Route from '../routes'
import './App.scss';
class App extends Component {
  render() {
    return (
      <Provider {...stores}>
        <Route/>
      </Provider>
    );
  }
}

export default App;