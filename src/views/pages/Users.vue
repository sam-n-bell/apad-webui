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

  },
  mounted: async function () {
    // redirects to events page if person logged in is not an admin
    if (this.$store.state.user.current_user.administrator !== 1) {
              this.$router.push('/events')
          }  }
    }
</script>