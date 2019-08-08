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
    

  },
  mounted: async function () {
    
      this.$store.dispatch('venues/getVenues');
    
  }
}
</script>