<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-row>
                    <el-col :span="6" style="float: right;">
                        <create-venue></create-venue>
                    </el-col>
                </el-row>
            </div>
            <el-table :data="venues" width="100%">
                <el-table-column sortable label="Name" prop=name></el-table-column>
                <el-table-column sortable label="Address" prop=address></el-table-column>
                <el-table-column sortable label="Activities" prop=activities></el-table-column>
                <el-table-column sortable label="Opens">
                    <template slot-scope="scope">
                        {{scope.row.open_time | time}}
                    </template>
                </el-table-column>
                <el-table-column sortable label="Closes">
                    <template slot-scope="scope">
                        {{scope.row.close_time | time}}
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>


<script>
import CreateVenue from '../components/CreateVenue';
export default {
  components: {
    CreateVenue
  },
  data: function () {
    return {
      venues: [],
      add_venue_dialog: false,
      new_venue: {
          name: '',
          address: '',
          activities: '',
      }
    }
  },
  methods: {
    

  },
  mounted: async function () {
      let venue1 = {
          venue_id: 1,
          name: 'Highland Lanes',
          address: '999 Texas HWY Austin TX 78759',
          activities: 'bowling',
          open_time: '08:00:00',
          close_time: '20:00:00',
      };
      let venue2 = {
          venue_id: 1,
          name: 'Walnut Creek Volleyball Courts',
          address: '186 Parmer ln  Austin TX 78760',
          activities: 'volleyball',
          open_time: '08:00:00',
          close_time: '20:00:00',
      }
      this.venues.push(venue1, venue2)
  }
}
</script>