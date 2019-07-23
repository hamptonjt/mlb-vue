<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <mlb/>
  </div>
</template>

<script>
import mlb from './components/mlb.vue'
import { mapActions } from 'vuex'

export default {
  name: 'app',
  components: {
    mlb
  },
  methods: {
    ...mapActions('mlb', {
      fetchTeamInfo: 'fetchTeamInfo'
    })
  },
  created: function() {
    this.fetchTeamInfo()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
