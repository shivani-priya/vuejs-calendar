 <template>
    <div id="event-form" :class="{ active: active }" :style="{ top: top, left: left }">
        <h4>Add an event</h4>
         <p>{{ date.format('dddd, MMM Do') }}</p>
        <div class="text">
            <input v-focus type="text" placeholder="Add Event for reminders..." v-model="description"
            @keyup.enter="create">
            <!-- Adding key modifiers above and adding event handlers to it -->
        </div>
        <div class="buttons">
            <button @click="create">Create</button>
        </div>
        <button id="close-button" @click="close">&#10005;</button>
    </div>
</template>
<script>
 export default {
     data() {
            return {
                description: ''
            }
        },
        methods: {
           close() {
               this.$store.commit('eventFormActive', false);
           },
            create() {
                if (this.description.length > 0) {
                    //Instead of Mutating the event we are dispatching it
                this.$store.dispatch('addEvent', this.description).then(_ => {
                //After we commit new event
                this.description = '';
                    this.$store.commit('eventFormActive', false);
                })
            }
            }
        },
        computed: {
             date() {
                return this.$store.state.eventFormDate;
            },
            active() {
                return this.$store.state.eventFormActive;
            },
            top() {
                return `${this.$store.state.eventFormPosY}px`;
                // return '500px';

            },
            left() {
                return `${this.$store.state.eventFormPosX}px`;
                // return '500px';
               

            }
        },
         directives: {
            focus: {
                update(el) {//When component is updated then
                console.debug('update')
                    el.focus();
                }
            }
        }
    }
</script>