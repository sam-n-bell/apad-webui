<template>
    <div>
        <el-button style="float: right; padding: 3px 0" type="text" @click="openDialog()">Create Event</el-button>
        <el-dialog
        title="Schedule Event"
        :visible.sync="create_event_dialog"
        width="40%"
        :before-close="handleClose">
        <el-form :model="new_event" :rules="rules" ref="event_form" label-position="top">
            <el-row>
                <el-form-item label="Event Creator (if not you)" v-if="$store.state.user.current_user.administrator == 1">
                    <el-select v-model="new_event.created_by">
                        <el-option key=null, value=null, label=" "></el-option>
                        <el-option v-for="user in users"
                        :key="user.user_id"
                        :value="user.user_id"
                        :label=user.name
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="Event Name" prop="name">
                    <el-input v-model="new_event.name"></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                {{new_event.event_day + ' ' + new_event.start_time}}
                <el-form-item label="Venue" prop="venue_id">
                    <el-select v-model="new_event.venue_id" @change="getTimeSlots()">
                        <el-option v-for="venue in venues"
                        :key="venue.venue_id"
                        :value="venue.venue_id"
                        :label=venue.name
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="Day" prop="event_day">
                        <el-date-picker
                        v-model="new_event.event_day"
                        type="date"
                        placeholder="Pick a day"
                        value-format="yyyy-MM-dd"
                        @change="getTimeSlots()">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            <el-col :span="12" v-if="new_event.venue_id !== '' && new_event.venue_id !== ''">
                <el-form-item label="Available Times" prop="start_time">
                    <el-select v-model="new_event.start_time">
                        <el-option v-for="time in time_slots"
                        :key=time.value
                        :value=time.value
                        :label=time.label>
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="Max No. of Players" prop="max_players">
                        <el-input-number :min="2" v-model="new_event.max_players"></el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                <el-form-item prop=num_guests :label="new_event.created_by == null ? 'No. of Guests I\'m Brining' : 'No. of Guests Orangizer is Brining'">
                    <el-input-number :min="0" :max="new_event.max_players - 1" v-model="new_event.num_guests"></el-input-number>
                </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-form-item label="Participant Comment">
                    <el-input type="textarea" v-model="new_event.participant_comment"></el-input>
                    <small>What position are you playing? Comments in general.</small>
                </el-form-item>
            </el-row>

        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="createEvent('event_form')">Save</el-button>
            <el-button @click="close('event_form')">Cancel</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
import moment from 'moment';

export default {
  components: {
    
  },
  data: function () {
    return {
      create_event_dialog: false,
      time_slots: [],
      new_event: {
          name: '',
          venue_id: '',
          max_players: 2,
          start_time: '',
          event_day: '',
          num_guests: 0,
          participant_comment: '',
          created_by: null
      },
      rules: {
          name: [
            { required: true, message: 'Please give the event a name', trigger: 'blur' }
          ],
          venue_id: [
            { required: true, message: 'Where is the event located?', trigger: 'blur' }
          ],
          event_day: [
            { required: true, message: 'Specify what day the event is', trigger: 'blur' }
          ],
          start_time: [
            { required: true, message: 'Specify when event starts', trigger: 'blur' }
          ],
          num_guests: [
            { required: true, message: 'Specify how many guests you\'re bringing', trigger: 'blur' }
          ],
          max_players: [
            { required: true, message: 'Specify how many people can participate', trigger: 'blur' }
          ]
      }
    }
  },
  computed: {
      users () {
         return this.$store.state.user.users_list;
      },
      user () {
         return this.$store.state.user.current_user;
      },
      venues () {
         return this.$store.state.venues.venues;
      }
  },
  methods: {
    createEvent: async function (form_name) {
            //POST to route
            this.$refs[form_name].validate(async (valid) => {
                if (valid) {
                    try {
                    if (this.new_event.created_by == null) {
                        this.new_event.created_by = this.user.user_id;
                    }
                    if (this.new_event.participant_comment == '') {
                        this.new_event.participant_comment = 'No comment provided :('
                    }
                    if (this.isNotPastDate()) {
                        await this.$http.post('/events', this.new_event);
                        this.close(form_name);
                    } else {
                        this.$message.error('Event occurs in the past')
                    }
                    //emit event
                    this.$emit('eventCreated');
                    } catch (err) {
                        console.log(err)
                        this.$notify.error('Unable to create event');
                    }
                } 
            });
    },
    isNotPastDate () {
        let event_daytime = moment(this.new_event.event_day + ' ' + this.new_event.start_time, 'YYYY-MM-DD HH:mm:ss');
        console.log(event_daytime)
        let now = moment();
        console.log(now)
        if (now.isBefore(event_daytime)) {
            return true
        } 
        return false
    },
    close (form_name) {
        this.add_venue_dialog = false;
        this.resetForm(form_name);
    },
    handleClose(done) {
        this.$confirm('Are you sure to close this dialog?')
          .then(_ => {
            done();
            this.resetForm('event_form')
          })
          .catch(_ => {});
    },
    resetForm(form_name) {
        this.$refs[form_name].resetFields();
    },
    openDialog: async function () {
        await this.getTimeSlots();
        this.create_event_dialog = true;
    },
    getTimeSlots:async function () {
        try {
            if (this.new_event.venue_id !== '' && this.new_event.event_day !== '') {
                console.log(`${this.new_event.venue_id}/availability?day=${this.new_event.event_day}`)
                let slots = await this.$http.get(`${this.new_event.venue_id}/availability?day=${this.new_event.event_day}`)
                this.time_slots = slots.data;
            }
        } catch (err) {
            this.$notify.error('Issue getting timeslots for venue')
        }
    },
    handleClose(done) {
        this.$confirm('Are you sure to close this dialog?')
          .then(_ => {
            done();
            this.resetForm('event_form')
          })
          .catch(_ => {});
    },
    resetForm(form_name) {
        this.$refs[form_name].resetFields();
        this.create_event_dialog = false;
    }
  },
  mounted: async function () {
      console.log(this.$store.state.user.users_list.length)
      if (this.$store.state.user.users_list.length == 0) {
          await this.$store.dispatch('user/getUsers')
      }
      if (this.$store.state.venues.venues.length == 0) {
          await this.$store.dispatch('venues/getVenues')
      }
      this.new_event.event_day = moment().format('YYYY-MM-DD')
  }
}
</script>