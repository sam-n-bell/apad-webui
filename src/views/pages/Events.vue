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
                <create-event></create-event>
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
              <el-button @click="joinEvent(scope.row.event_id)" v-if="scope.row.created_by !== user.user_id">Join Event</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
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
      my_events_only: false
    };
  },
  computed: {
    venues() {
        return this.$store.state.venues.venues;
    },
    user() {
        return this.$store.state.user.current_user;
    }
  },
  methods: {
    joinEvent: async function(event_id) {},
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
    }
  },
  mounted: async function() {
    this.day = moment().format("YYYY-MM-DD");
    await this.getEvents();
  }
};
</script>