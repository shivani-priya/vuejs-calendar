//COMMON LOGIC GOES HERE

import Vue from 'vue'
import App from './components/App.vue'
// import './style.scss' SERVER WONT NEED CSS

Vue.config.devtools = true
// import Vuex from 'vuex';
// Vue.use(Vuex);
import store from './store';

import moment from 'moment-timezone';
moment.tz.setDefault('UTC');
Object.defineProperty(Vue.prototype,'$moment',{ get(){ return this.$root.moment}})

/*GOES IN WEBENTRY.JS
let events=window.__INITIAL_STATE__.map(event => {
  return {
    description: event.description,
    date: moment(event.date)
  }
});
*/

export default function(events){
    let initialState = Object.assign({}, store.state, { events });
    store.replaceState(initialState);
  
    return new Vue({
        //REMOVED EL AS SERVER DOESNT NEED THAT AS WELL
      data: {
        moment
      },
      components: {
        App
      },
      store,
      render(createElement) {
        return createElement(
          'div',
          { attrs: { id: 'app'} },
          [
            createElement('app')
          ]
        );
      }
    });
}