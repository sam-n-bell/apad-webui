<template>
    <div>
        <el-button style="float: right; padding: 3px 0" type="text" @click="openDialog()">Create User</el-button>
        <el-dialog
        title="Add New User"
        :visible.sync="create_user_dialog"
        width="40%"
        :before-close="handleClose">
        {{new_user}}
        <el-form :model="new_user" :rules="rules" ref="user_form" label-position="top">
            <el-row>
                <el-form-item label="Name" prop="name">
                    <el-input v-model="new_user.name"></el-input>
                </el-form-item>
            </el-row>
             <el-row>
                <el-form-item label="Email" prop="email">
                    <el-input v-model="new_user.email"></el-input>
                </el-form-item>
            </el-row>
             <el-row>
                <el-form-item label="Password" prop="password">
                    <el-input v-model="new_user.password"></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="Make Administrator?">
                    <el-switch
                    v-model="new_user.administrator"
                    active-color ="13ce66"
                    inactive-color="ff4949"
                    active-text="Yes"
                    inactive-text="No">
                    </el-switch>
                </el-form-item>
            </el-row>

        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="createUser('user_form')">Save</el-button>
            <el-button @click="close('user_form')">Cancel</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>

export default {
  components: {
    
  },
  data: function () {
    return {
      create_user_dialog: false,
      new_user: {
          name: '',
          email: '',
          password: '',
          administrator: false,
      },
      rules: {
          name: [
            { required: true, message: 'Please give the user a name', trigger: 'blur' }
          ],
          email: [
            { required: true, message: 'Please give the user an email', trigger: 'blur' }
          ],
          password: [
            { required: true, message: 'Please give the user a password', trigger: 'blur' }
          ]
      }
    }
  },
  computed: {
      
  },
  methods: {
    createUser: async function (form_name) {
        try {
            //POST to route
            this.$refs[form_name].validate(async (valid) => {
                if (valid) {
                    console.log('submitting new user');
                    console.log(this.new_user);
                    await this.$http.post('/users', this.new_user)
                    this.$notify.success('Success')
                    await this.$store.dispatch('user/getUsers')
                    this.close(form_name);
                } 
            });
        } catch (err) {
            this.$notify.error('Unable to create user');
            this.close(form_name);
        } finally {

        }
    },
    close (form_name) {
        this.resetForm(form_name);
        this.add_user_dialog = false
    },
    handleClose(done) {
        this.$confirm('Are you sure to close this dialog?')
          .then(_ => {
            done();
            this.resetForm('user_form')
          })
          .catch(_ => {});
    },
    resetForm(form_name) {
        this.$refs[form_name].resetFields();
    },
    openDialog: async function () {
        this.create_user_dialog = true;
    },
   
    resetForm(form_name) {
        this.$refs[form_name].resetFields();
        this.create_user_dialog = false;
    }
  },
  mounted: async function () {
    
  }
}
</script>