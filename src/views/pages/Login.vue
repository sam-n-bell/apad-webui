<template>
<div>
    <el-form class="login-form">
        <el-row>
            <el-col>
                <el-form-item label="Email">
                    <el-input v-model="email"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <el-form-item label="Password">
                    <el-input v-model="password" show-password></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <el-button round type="primary" style="width: 100%;" @click="login()">Login</el-button>
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
      email: "",
      password: "",
      movies: []
    }
  },
  methods: {
    login: async function () {
        try {
            this.$store.dispatch('user/login', {user_id: 1, name: 'Sam Bell', administrator: 1})
            // this.$store.commit('user/SET_USER', {user_id: 1, name: 'Sam Bell', administrator: 1});
            // this.$store.commit('user/SET_LOGGED_IN', true);
            // localStorage.setItem('auth_token', "abc123");
            this.$router.push('/events');
            this.$notify.success('Logged in');
        } catch (err) {
            this.$notify.error("Login failed", err.message);
        }
    }
  },
  mounted: async function () {
      this.$notify.info(`logged in: ${this.$store.state.user.logged_in}`)
  }
}
</script>

<style>
 .login-form {
     max-width: 200px;
     margin: 0 auto;
 }
</style>
