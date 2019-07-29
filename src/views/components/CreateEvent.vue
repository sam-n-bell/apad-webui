<template>
    <div>
        <el-button style="float: right; padding: 3px 0" type="text" @click="openDialog()">Create Event</el-button>
        <el-dialog
        title="Schedule Event"
        :visible.sync="create_event_dialog"
        width="30%"
        :before-close="handleClose">
        <el-form :model="new_event" :rules="rules" ref="event_form">
            <el-row>
                <el-form-item label="Event Creator" v-if="$store.state.user.user_details.administrator == 1">
                    <el-select v-model="new_event.created_by">
                        <el-option v-for="user in users"
                        :key="user.user_id"
                        :value="user.user_id"
                        :label=user.name
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="Name" prop="name">
                </el-form-item>
            </el-row>
            <el-row>
                <!-- <el-form-item label="Venue" prop="venue">
                    <el-select v-model="new_event.venue_id">
                        <el-option v-for="venue in venues"
                        :key="venue.venue_id"
                        :value="venue.venue_id"
                        :label=venue.name
                        ></el-option>
                    </el-select>
                </el-form-item> -->
            </el-row>
            <el-row>
                <el-form-item label="Max # of Players" prop="max_players">
                </el-form-item>
            </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="saveVenue('venue_form')">Save</el-button>
            <el-button @click="add_venue_dialog = false">Cancel</el-button>
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
      create_event_dialog: false,
      new_event: {
          name: '',
          venue_id: '',
          max_players: 0,
          start_time: '',
          event_day: '',
          num_guests: 0,
          description: ''
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
  computed: {
      users () {
         return this.$store.state.user.users_list;
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
            this.$notify.error('Unable to create event');
        }
    },
    openDialog () {
        this.create_event_dialog = true;
    },
    handleClose(done) {
        this.$confirm('Are you sure to close this dialog?')
          .then(_ => {
            done();
            this.resetForm('event_form')
          })
          .catch(_ => {});
    },
    resetForm(form_name) {
        this.$refs[form_name].resetFields();
        this.create_event_dialog = false;
    }
  },
  mounted: async function () {
      console.log(this.$store.state.user.users_list.length)
      if (this.$store.state.user.users_list.length == 0) {
          console.log('get users');
          await this.$store.dispatch('user/getUsers')
      }
  }
}
</script>