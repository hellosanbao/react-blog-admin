import {
    observable,
    action,
    computed,
  } from 'mobx'
  
  class HomeState {
    @observable count = 2
  
    @observable name = '宝爷'
  
    @action add() {
      this.count += 1
    }
    @computed get total() {
      return this.count * 3;
    }
  }
  
  export default new HomeState()