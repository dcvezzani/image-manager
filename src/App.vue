<template>
  <div id="app">

    <div class="router-links">
      <router-link to="/Photos">Photos</router-link>
      <router-link to="/Photo/1">Photo</router-link>
    </div>
    
    <router-view/>
  </div>
</template>

<script>
import tinyToast from 'tiny-toast'

export default {
  name: 'App', 
  sockets: {
    connect: function () {
      console.log('socket connected')
      this.$socket.emit('join', {server: true, greeting: 'Greetings server'})
    },
    joined: function (msg) {
      console.log('socket-in:joined:', msg)
    },
    err: function (data) {
      console.log('Socket IO Error', data)
      tinyToast.show('Socket IO Error').hide(3000)
    }
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
