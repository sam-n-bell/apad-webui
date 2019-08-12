<template>
  <div>
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-form>
            <el-row>
              <el-col :span="6">
                <el-date-picker v-model="day" type="date" value-format="yyyy-MM-dd" @change="getEvents()"></el-date-picker>
              </el-col>
              <el-col :span="6">
                  <el-select v-model="venue_id" @change="getEvents()">
                      <el-option :key=null :value=null label=""></el-option>
                      <el-option v-for="venue in venues"
                      :key=venue.venue_id :value=venue.venue_id :label=venue.name>
                      </el-option>
                  </el-select>
              </el-col>
              <el-col :span="6">
                <time-picker v-on:timeChanged="setTime"></time-picker>
                {{time}}
              </el-col>
              <el-col :span="6" style="float: right;">
                <create-event v-on:eventCreated="getEvents"></create-event>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <el-table :data="events" width="100%">
          <el-table-column sortable label="Name" prop=name></el-table-column>
          <el-table-column sortable label="Venue" prop=venue_name></el-table-column>
          <el-table-column sortable label="Day">
            <template slot-scope="scope">{{scope.row.event_day}}</template>
          </el-table-column>
          <el-table-column sortable label="Start time">
            <template slot-scope="scope">{{scope.row.start_time | time}}</template>
          </el-table-column>
          <el-table-column sortable label="Players">
              <template slot-scope="scope">
                  {{scope.row.current_num_players}} out of {{scope.row.max_players}}
              </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-button @click="openJoinEvent(scope.row)" 
              v-if="scope.row.created_by !== user.user_id 
              && !isPastDate(scope.row)
              && scope.row.current_num_players < scope.row.max_players">Join Event</el-button>
            </template>
          </el-table-column>
          <el-table-column v-if="user.administrator == 1">
            <template slot-scope="scope">
              <el-button @click="cancelEvent(scope.row)">Cancel Event</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>

    <el-dialog
        title="Join Event"
        :visible.sync="join_event_dialog"
        width="40%"
        :before-close="handleClose">
        <el-form :model="new_participant" :rules="rules" ref="join_form" label-position="top">
           <el-row>
             {{new_participant}}
                <el-form-item label="User being added (if not you)" v-if="$store.state.user.current_user.administrator == 1">
                    <el-select v-model="new_participant.user_id">
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
                <el-col :span="12">
                <el-form-item prop=num_guests label="No. of Guests">
                    <el-input-number :min="0" :max="selected_event.max_players - 2" v-model="new_participant.num_guests"></el-input-number>
                </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-form-item label="Participant Comment">
                    <el-input type="textarea" v-model="new_participant.participant_comment"></el-input>
                    <small>What position are you playing? Comments in general.</small>
                </el-form-item>
            </el-row>

        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="joinEvent('join_form')">Join</el-button>
            <el-button @click="close('join_form')">Cancel</el-button>
        </span>
        </el-dialog>
  </div>
</template>

<script>
import CreateEvent from "../components/CreateEvent";
import TimePicker from "../components/TimePicker";
import moment from "moment";
export default {
  components: {
    CreateEvent,
    TimePicker
  },
  data: function() {
    return {
      events: [],
      venue_id: [],
      day: null,
      time: null,
      my_events_only: false,
      selected_event: {},
      join_event_dialog: false,
      new_participant: {
        user_id: null,
        num_guests: 0,
        participant_comment: '',
      },
      rules: {
          num_guests: [
            { required: true, message: 'Specify how many guests you\'re bringing', trigger: 'blur' }
          ]
      }
    };
  },
  computed: {
    venues() {
        return this.$store.state.venues.venues;
    },
    user() {
        return this.$store.state.user.current_user;
    },
    users () {
         return this.$store.state.user.users_list;
      }
  },
  methods: {
    cancelEvent: async function (event) {
        this.$confirm(`Are you sure you want to delete ${event.name}?`, 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
                }).then(async () => {
                    try {
                        await this.$http.delete(`/events/${event.event_id}`)
                        this.$message({
                            type: 'success',
                            message: 'Event Deleted'
                        });
                    } catch (err) {
                        this.$notify.error('Problem removing event');
                    } finally {
                      await this.getEvents();
                    }
                }).catch(() => {});
    },
    openJoinEvent (event) {
        this.selected_event = event;
        this.join_event_dialog = true;
    },
    closeJoinDialog (form_name) {
        this.$refs[form_name].resetFields();
        this.join_event_dialog = false;
        this.selected_event = {};
    },
    handleClose(done) {
        this.$confirm('Are you sure to close this dialog?')
          .then(_ => {
            done();
            this.resetForm('join_form')
          })
          .catch(_ => {});
    },
    joinEvent: async function(form_name) {
      this.$refs[form_name].validate(async (valid) => {
          if (valid) {
              try {
                if (this.new_participant.user_id == null) {
                    this.new_participant.created_by = this.user.user_id;
                }
                if (this.new_participant.participant_comment == '') {
                    this.new_participant.participant_comment = 'No comment provided :('
                }
                if (this.new_participant.user_id === this.selected_event.created_by) {
                    this.new_participant = null;
                    this.$message.info('Can\'t select the person who made the event');
                } else {
                    await this.$http.post(`/events/${this.selected_event.event_id}/join`, this.new_participant);
                    this.$notify.success('Joined Event');
                    await this.getEvents();
                    this.closeJoinDialog(form_name);
                }
              } catch (err) {
                this.$notify.error('Error: ' + err.message.message)
              }
          }
      });
    },
    setTime(time) {
      this.time = time;
      this.getEvents();
    },
    getEvents: async function() {
      try {
          let query = `?date=${this.day}`;
          if (this.time !== null && this.time !== "") query += `&time=${this.time}`
          if (this.venue_id !== null && this.venue_id !== "") query += `&venueId=${this.venue_id}`
          let request = await this.$http.get('/events' + query)
          this.events = request.data;
      } catch (err) {
        this.$notify.error("Unable to get events");
      }
    },
    isPastDate(event) {
        let event_moment_object = moment(event.event_day + ' ' + event.start_time, 'MM/DD/YYYY HH:mm:ss');
        let today = moment();
        if (today.isAfter(event_moment_object)) {
            return true
        } else {
            return false
        }
    }
  },
  mounted: async function() {
    this.day = moment().format("YYYY-MM-DD");
    await this.getEvents();
  }
};
</script>