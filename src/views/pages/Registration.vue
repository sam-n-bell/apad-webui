<template>
<div>
    <el-form class="login-form" :rules="rules" ref="registration_form" :model="new_user">
        <el-row>
            <el-col>
                <el-form-item label="Email" prop="email">
                    <el-input v-model="new_user.email"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <el-form-item label="Name" prop="name">
                    <el-input v-model="new_user.name"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <el-form-item label="Password" prop="password">
                    <el-input v-model="new_user.password" show-password></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <el-form-item label="Password Confirmation" prop="">
                    <el-input v-model="new_user.password_confirmation" show-password></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <el-button round type="primary" style="width: 100%;" @click="register('registration_form')">Register</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <el-button size="mini" style="width: 100%;" type="text" @click="pushToLogin()">Already have an account? Login</el-button>
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
      let checkPassword = (rule, value, callback) => {
        if (!value){
            return callback(new Error('Please input a password'));
        }
        if(value != this.new_user.password_confirmation) {
            return callback(new Error('These passwords need to match'));
        }
        callback()
      };
    return {
        new_user: {
            email: "",
            password: "",
            password_confirmation: "",
            name: ""
        },
        rules: {
          email: [
              { required: true, trigger: 'blur' }
          ],
          password: [
              { required: true, trigger: 'blur'},
              //{validator: checkPassword, trigger: 'blur'}
          ],
          name: [
              {required: true, trigger: 'blur'}
          ]
        }
    }
  },
  methods: {
    register: async function (form_name) {
        try {
            this.$refs[form_name].validate(async(valid) => {
                if (valid) {
                    if (this.new_user.password === this.new_user.password_confirmation){
                    await this.$http.post('/register',this.new_user);
                    this.$router.push('/login');
                    this.$notify.success('Registration successful');
                    } else {
                        this.$message.error('Passwords do not match')
                    }
                   
                } 
            });
        } catch (err) {
            this.$notify.error("Registration failed", err.message);
        }
    },
    pushToLogin() {
        this.$router.push('login')
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
