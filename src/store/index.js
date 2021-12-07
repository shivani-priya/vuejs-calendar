import Vue from 'vue'
Vue.config.devtools = true
import Vuex from 'vuex';
Vue.use(Vuex);

import moment from 'moment-timezone';
moment.tz.setDefault('UTC');

import Axios from 'axios';

export default new Vuex.Store({
// store : {
    state: {
      currentYear: 2021,
      currentMonth: 12,
      eventFormPosX: 0,
    eventFormPosY: 0,
    eventFormActive: false,
    events: [
      // { description: 'Random event 1', date: moment('2021-12-06', 'YYYY-MM-DD') },
      // { description: 'Random event 2', date: moment('2021-12-16', 'YYYY-MM-DD') },
      // { description: 'Random event 3', date: moment('2021-10-29', 'YYYY-MM-DD') }
            ],
            eventFormDate: moment()//Current day
    },
    mutations: {
        setCurrentMonth(state, payload) {
            //payload: any data that the components wants to send
          state.currentMonth = payload;
        },
        setCurrentYear(state, payload) {
          state.currentYear = payload;
        },
        eventFormPos(state, payload) {
          state.eventFormPosX = payload.x;
          state.eventFormPosY = payload.y;
        },
        eventFormActive(state, payload) {
          state.eventFormActive = payload;
        },
        addEvent(state, payload) {
         
          
          //Here we are doing 2 things:creating the obj and pushing it to state(events property in the state)
          //And, Trigerring a post which goes off and sends it to out server
          // let obj = {
          //   description: payload,
          //   date: state.eventFormDate
          // };
          state.events.push(payload);
          // Axios.post('/add_event', obj);
        },
        eventFormDate(state, payload) {
          state.eventFormDate = payload
        }
      },
      actions: {
        addEvent(context, payload) {
          //Context is basically store which gives us access to both the mutations and state
          console.log(context)

          return new Promise((resolve, reject) => {
            let obj = {
              description: payload,
              date: context.state.eventFormDate
            };
            // context.commit('addEvent', obj);

            Axios.post('/add_event', obj)
          .then(response => {
              if (response.status === 200) {
                context.commit('addEvent', obj);
                resolve();
              } else {
                reject();
              }
            })
          
        })
      }
    }
});