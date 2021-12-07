<template>
     <div :class="classObject" @click="captureClick">
         {{ day.format('D') }}
        <ul class="event-list">
            <li v-for="event in events">{{ event.description }}</li>
        </ul>
     </div>
</template>
<script>
    export default {
        props: [ 'day' ],
        computed: {
             events() {
                // let mockData = [
                //     { description: 'Random event 1', date: this.$moment('2021-12-06', 'YYYY-MM-DD') },
                //     { description: 'Random event 2', date: this.$moment('2021-12-16', 'YYYY-MM-DD') },
                //     { description: 'Random event 3', date: this.$moment('2021-10-29', 'YYYY-MM-DD') }
                // ];
                return this.$store.state.events.filter(event => event.date.isSame(this.day, 'day'));
            },
            classObject() {
                 let eventFormDate = this.$store.state.eventFormDate;
                let eventFormActive = this.$store.state.eventFormActive;
                let today = this.day.isSame(this.$moment(), 'day');
                return {
                    day: true,
                    today,
                    past: this.day.isSameOrBefore(this.$moment(), 'day') && !today,
                    active: eventFormDate.isSame(this.day, 'day') && eventFormActive
                };
            }
        },
         methods: {
            captureClick(event) {
                this.$store.commit('eventFormPos', { x: event.clientX, y: event.clientY });
                this.$store.commit('eventFormActive', true);
                // console.log(event)
                 this.$store.commit('eventFormDate', this.day);
            }
        }
    }
</script>