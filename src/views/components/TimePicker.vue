<template>
    <div>
        <el-select v-model="selected_time" @change="emitTime()">
            <el-option :key=null :value=null label=""></el-option>
            <el-option v-for="time in times"
            :key=time.value
            :value=time.value
            :label=time.label></el-option>
        </el-select>
    </div>
</template>

<script>
import moment from 'moment'
export default {
  components: {
    
  },
  data: function () {
    return {
        times: [],
        selected_time: null
    }
  },
  methods: {
      createTimes () {
          let start = moment('08:00:00', 'HH:mm:ss');
          let end = moment('20:00:00', 'HH:mm:ss');
          for (start = moment('08:00:00', 'HH:mm:ss'); start.isBefore(end); start.add(1, 'hours')) {
              this.times.push({
                  label: start.format('h:mm A'),
                  value: start.format('HH:mm:ss'),
              });
          }
      },
      emitTime() {
          console.log('emitting ', this.selected_time)
          this.$emit('timeChanged', this.selected_time)
      }
  },
  mounted: async function () {
      this.createTimes();
   }
}
</script>