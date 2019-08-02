<template>
    <div>
        <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-form >
                <el-row>
                        <el-col :span="6">
                            Day <el-date-picker v-model="day"
                                    type="date"
                                    value-format="yyyy-MM-dd">
                                    </el-date-picker>
                        </el-col>
                    <el-col :span="6">
                        Time <time-picker v-on:timeChanged="setTime"></time-picker> {{time}}
                    </el-col>
                    <el-col :span="6">
                        My Events Only <el-switch
                        v-model="my_events_only"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                        </el-switch>
                    </el-col>
                    <el-col :span="6" style="float: right;">
                        <create-event></create-event>
                    </el-col>
                </el-row>
                </el-form>
            </div>
            <el-table :data="events" width="100%">
                <el-table-column sortable label="Name"></el-table-column>
                <el-table-column sortable label="Venue"></el-table-column>
                <el-table-column sortable label="Day">
                    <template slot-scope="scope">
                        {{scope.row.event_day | time}}
                    </template>
                </el-table-column>
                <el-table-column sortable label="Start time">
                    <template slot-scope="scope">
                        {{scope.row.start_time | time}}
                    </template>
                </el-table-column>
                <el-table-column sortable label="Players"></el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <el-button @click="joinEvent(scope.row.event_id)">Join Event</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
    </div>
</template>

<script>
import CreateEvent from '../components/CreateEvent'
import TimePicker from '../components/TimePicker'
import moment from 'moment'
export default {
  components: {
    CreateEvent, TimePicker
  },
  data: function () {
    return {
        events: [],
        venue_id: [],
        day: null,
        time: null,
        my_events_only: false
    }
  },
  methods: {
      joinEvent: async function (event_id) {

      },
      setTime (time) {
          this.time= time
      },
      getEvents: async function () {
          try {

          } catch (err) {
              this.$notify.error("Unable to get events")
          }
      }
  },
  mounted: async function () {
      this.day = moment().format('YYYY-MM-DD');
   }
}
</script>