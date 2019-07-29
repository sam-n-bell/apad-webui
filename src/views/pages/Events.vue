<template>
    <div>
        <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-row>
                    <el-col :span="6" style="float: right;">
                        <create-event></create-event>
                    </el-col>
                </el-row>
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
export default {
  components: {
    CreateEvent
  },
  data: function () {
    return {
        events: []
    }
  },
  methods: {
      joinEvent: async function (event_id) {

      }
  },
  mounted: async function () {

   }
}
</script>