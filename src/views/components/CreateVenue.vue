<template>
    <div>
        <el-button style="float: right; padding: 3px 0" type="text" @click="openDialog()">Create Venue</el-button>
        <el-dialog
        title="Add New Venue"
        :visible.sync="add_venue_dialog"
        width="30%"
        :before-close="handleClose">
        <el-form :model="new_venue" :rules="rules" ref="venue_form">
            <el-row>
                <el-form-item label="Name" prop="name">
                    <el-input v-model="new_venue.name"></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="Address" prop="address">
                    <el-input v-model="new_venue.address"></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="Activities" prop="activities">
                    <el-input v-model="new_venue.activities"></el-input>
                </el-form-item>
            </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="saveVenue('venue_form')">Save</el-button>
            <el-button @click="close('venue_form')">Cancel</el-button>
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
      add_venue_dialog: false,
      new_venue: {
          name: '',
          address: '',
          activities: '',
      },
      rules: {
          name: [
            { required: true, message: 'Please input a name', trigger: 'blur' }
          ],
          address: [
            { required: true, message: 'Give an address', trigger: 'blur' }
          ],
          activities: [
            { required: true, message: 'Describe what activities can be played here', trigger: 'blur' }
          ]
      }
    }
  },
  methods: {
    saveVenue: async function (form_name) {
        try {
            //POST to route
            this.$refs[form_name].validate((valid) => {
                if (valid) {
                    this.resetForm(form_name);
                } 
            });
        } catch (err) {
            console.log(err.message)
            this.$notify.error('Unable to create venue');
        }
    },
    openDialog () {
        this.add_venue_dialog = true;
    },
    close (form_name) {
        this.resetForm('venue_form');
        this.add_venue_dialog = false
    },
    handleClose(done) {
        this.$confirm('Are you sure to close this dialog?')
          .then(_ => {
            done();
            this.resetForm('venue_form')
          })
          .catch(_ => {});
    },
    resetForm(form_name) {
        this.$refs[form_name].resetFields();
    }
  },
  mounted: async function () {
      
  }
}
</script>