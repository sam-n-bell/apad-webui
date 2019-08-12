<template>
  <div>
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
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
          <el-table-column>
            <template slot-scope="scope">
                  <el-dropdown split-button type="primary">
                  I want to...
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-if="scope.row.created_by !== user.user_id">
                      <el-button type="text" @click="leaveEvent(scope.row)">Leave Event</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item v-if="scope.row.created_by === user.user_id || user.administrator == 1">
                      <el-button type="text" @click="cancelEvent(scope.row)">Cancel Event</el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  components: {
  },
  data: function() {
    return {
      events: []
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
    leaveEvent: async function(event) {
      this.$confirm(`Are you sure you want to leave ${event.name}?`, 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
        }).then(async () => {
            try {
                await this.$http.delete(`/events/${event.event_id}/leave`)
                this.$message({
                    type: 'success',
                    message: 'Removed from event'
                });
            } catch (err) {
                this.$notify.error('Problem leaving event');
            } finally {
              await this.getEvents();
            }
        }).catch(() => {});
    },
    cancelEvent: async function(event) {
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
    getEvents: async function() {
      try {
          let request = await this.$http.get('/my-events')
          this.events = request.data;
      } catch (err) {
        this.$notify.error("Unable to get my events");
      }
    }
  },
  mounted: async function() {
    await this.getEvents();
  }
};
</script>