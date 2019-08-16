<template>
<div v-if="$store.state.user.logged_in">
    <el-menu
  class="el-menu-demo"
  mode="horizontal"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b"
  :default-active="active_link">
  <!-- <el-menu-item index="1" @click="logout()" style="float: right;">Logout of {{user.name}}</el-menu-item> -->
  <el-menu-item index="1" style="float: right;">
    <el-dropdown>
    <el-button size="mini" type="text">
                  {{user.email}}<i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <el-button type="text" @click="logout()">Logout</el-button>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu-item>
  <el-menu-item index="events" @click="pushTo('events')"><router-link to="events">Events</router-link></el-menu-item>
  <el-menu-item index="myevents" @click="pushTo('myevents')"><router-link to="myevents">My Events</router-link></el-menu-item>
  <el-menu-item index="venues" @click="pushTo('venues')"><router-link to="venues">Venues</router-link></el-menu-item>
  <el-menu-item v-if="$store.state.user.current_user.administrator == true" index="users" @click="pushTo('users')"><router-link to="users">Users</router-link></el-menu-item>
  <el-menu-item index="info" @click="pushTo('info')"><router-link to="info">Info</router-link></el-menu-item>
</el-menu>
</div>
</template>

<script>
export default {
  name: 'home',
  components: {
    
  },
  data: function () {
    return {
      count: 0,
      active_link: '1'
      
    }
  },
  computed: {
    user () {
      return this.$store.state.user.current_user;
    }
  },
  watch: {
    $route (newVal, oldVal) {
      this.active_link = newVal.name
    }
  },
  methods: {
    logout: async function() {
      await this.$store.dispatch('user/logout');
    },
    pushTo (route_name) {
      this.$router.push({ name: route_name })
    }
  },
  mounted: async function () {
    this.activeLink = this.$route.path
  }
}
</script>