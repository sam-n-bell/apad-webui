<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-row>
                    <el-col :span="6" style="float: right;">
                       <create-user></create-user>
                    </el-col>
                </el-row>
            </div>
            <el-table :data="users" width="100%">
                <el-table-column sortable label="Name" prop=name></el-table-column>
                <el-table-column sortable label="Email" prop=email></el-table-column>
                <el-table-column sortable label="Administrator" prop=administrator>
                    <template slot-scope="scope">
                        {{scope.row.administrator | yesno}}
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>


<script>
import CreateUser from '../components/CreateUser';
export default {
  components: {
    CreateUser
  },
  data: function () {
    return {
    }
  },
  computed: {
      users () {
          return this.$store.state.user.users_list;
      }
  },
  methods: {
    

  },
  mounted: async function () {
       this.$store.dispatch('user/getUsers');
  }
}
</script>