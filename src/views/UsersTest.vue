<template>
  <div>
      <el-form label-position="top" label-width="150px">
        <el-row>
           <el-col :span="12">
                <el-form-item :label="user_id !== null ? 'User id: ' + user_id : 'User'">
                    <el-select v-model="user_id" @change="getUserPosts()"> 
                        <el-option v-for="user in users" 
                        :key="user.id" 
                        :label="user.name" 
                        :value="user.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
           <el-col :span="12">
                <el-form-item label="JSON data from URL">
                    <pre>{{posts}}</pre>
                </el-form-item>
            </el-col>
        </el-row>
      </el-form>
  </div>
</template>

<script>

export default {
  components: {
    
  },
  data: function () {
    return {
      count: 0,
      user_id: null,
      users: [],
      posts: []
    }
  },
  methods: {
    getUsers: async function(){
      try {
        let response = await this.$http.get('/users');
        this.users = response.data;
        console.log(response);
      } catch (err) {
        this.$notify.error('Couldn\'t get users');
      }
    },
    getUserPosts: async function() {
      try {
        let response = await this.$http.get(`/posts?userId=${this.user_id}`)
        this.posts = response.data;
      } catch (err) {
        this.$notify.error(`Couldn\'t get user ${this.user_id} posts`);
      }
    }

  },
  mounted: async function () {
    await this.getUsers();
  }
}
</script>
