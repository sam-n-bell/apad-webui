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
                <el-table-column v-if="$store.state.user.current_user.administrator == true">
                    <template slot-scope="scope">
                        <el-button type="danger" @click="removeUser(scope.row)">Delete</el-button>
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
    removeUser: async function (user) {
        this.$confirm(`Are you sure you want to delete ${user.name}?`, 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
                }).then(async () => {
                    try {
                        await this.$http.delete(`/users/${user.user_id}`)
                        this.$message({
                            type: 'success',
                            message: 'User Deleted'
                        });
                        await this.$store.dispatch('user/getUsers')
                    } catch (err) {
                        console.log(err.message)
                        this.$notify.error('Problem removing user');
                    }
                }).catch(() => {});

    }

  },
  mounted: async function () {
       this.$store.dispatch('user/getUsers');
  }
}
</script>