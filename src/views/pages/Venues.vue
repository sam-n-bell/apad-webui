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
                <el-table-column sortable label="Opens" prop=open_time>
                    <template slot-scope="scope">
                        {{scope.row.open_time | time}}
                    </template>
                </el-table-column>
                <el-table-column sortable label="Closes" prop=close_time>
                    <template slot-scope="scope">
                        {{scope.row.close_time | time}}
                    </template>
                </el-table-column>
                <el-table-column v-if="$store.state.user.current_user.administrator == true">
                    <template slot-scope="scope">
                        <el-button type="danger" @click="removeVenue(scope.row)">Delete</el-button>
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
    }
  },
  computed: {
      venues () {
          return this.$store.state.venues.venues;
      }
  },
  methods: {
    removeVenue: async function (venue) {
        this.$confirm(`Are you sure you want to delete ${venue.name}?`, 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
                }).then(async () => {
                    try {
                        await this.$http.delete(`/venues/${venue.venue_id}`)
                        this.$message({
                            type: 'success',
                            message: 'Venue Deleted'
                        });
                        await this.$store.dispatch('venues/getVenues');
                    } catch (err) {
                        this.$notify.error('Problem removing venue');
                    }
                }).catch(() => {});
    }
  },
  mounted: async function () {
    
      this.$store.dispatch('venues/getVenues');
    
  }
}
</script>