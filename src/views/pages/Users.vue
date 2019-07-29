<template>
<h1>Users</h1>
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
 if (this.$store.state.user.user_details.administrator !== 1) {
          this.$router.push('/events')
      }  }
}
</script>