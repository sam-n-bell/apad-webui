<template>
<div>
    <el-form class="login-form" :rules="rules" ref="login_form" :model="login_details">
        <el-row>
            <el-col>
                <el-form-item label="Email" prop="email">
                    <el-input v-model="login_details.email"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <el-form-item label="Password" prop="password">
                    <el-input v-model="login_details.password" show-password></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <el-button round type="primary" style="width: 100%;" @click="login('login_form')">Login</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <el-button size="mini" style="width: 100%;" type="text" @click="pushToRegistration()">Create an account here</el-button>
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
        login_details: {
            email: "",
            password: ""
        },
        rules: {
          email: [
              { required: true, trigger: 'blur' }
          ],
          password: [
              { required: true, trigger: 'blur'}
          ]
        }
    }
  },
  methods: {
    login: async function (form_name) {
        try {
            this.$refs[form_name].validate(async (valid) => {
                if (valid) {
                    try {
                        await this.$store.dispatch('user/login', this.login_details)
                        this.$router.push('/events');
                        this.$notify.success('You\'re logged in')
                    } catch (err) {
                        this.$notify.error("Login failed " + err.message.message);
                    }
                } 
            });
        } catch (err) {
            this.$notify.error("Unknown error " + err.message.message);
        }
    },
    pushToRegistration () {
        this.$router.push('register')
    }
  },
  mounted: async function () {
      
  }
}
</script>

<style>
 .login-form {
     max-width: 200px;
     margin: 0 auto;
 }
</style>
