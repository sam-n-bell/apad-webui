<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data: function () {
    return {
      count: 0
    }
  },
  methods: {
    getData: async function(){
      let response = await this.$http.get('http://127.0.0.1:5000/');
      console.log(response);
    }
  },
  mounted: async function () {
    await this.getData();
  }
}
</script>
