<template>
<div>
    <el-row>
        <h1> Download the App Here!</h1>
        <el-form>
         <!-- <form action="https://github.com/sbell9/events-android"> -->
         <el-button type="primary" round @click="pushToDownload()"> Download Here</el-button>
    <!-- <input type="submit" value="Download here" /> -->
           </el-form>
        </el-row>
</div>
</template>

<script>

export default {
  components: {
    
  },
  data: function () {
        },

        methods:{
         pushToDownload () {
        window.location = "https://github.com/sbell9/events-android"
    }
        }
  }
 
</script>


