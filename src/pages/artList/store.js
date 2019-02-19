import { observable } from 'mobx'
  
  class ArtListState {
    @observable title = 'this is list'
  }
  
  export default new ArtListState()