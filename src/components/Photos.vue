<template>
  <div class="photos container">
    
    <router-link v-for="photo in photos" :to="photoRoute(photo.id)" :key="photo.id">
      <img :src="photo.location" :alt="photo.name" class="thumbnail">
    </router-link>
    
  </div>
</template>

<script>
import tinyToast from 'tiny-toast'
import { uuidv4 } from '../lib/utils'

export default {
  name: 'Photos',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App', 
      photos: [],
    }
  }, 
  methods:{
    test: function(){}, 
    photoRoute: function(id){
      return { name: 'Photo', params: {id} }
    }, 
  }, 
  sockets:{
    'db:photos:index-done': function(data){
      console.log('index was fetched', data)
      this.photos = data.payload;
    },
    'db:photos:done': function(resp){
      const uuid = uuidv4()
      switch (resp.action) {
        case 'index': {
          console.log('index was fetched', resp)
          this.photos = resp.payload;
          tinyToast.show('Photo was fetched').hide(3000)
          break
        }
        default:
          console.log('Warning: Unhandled socket action', resp)
      }
    },
  }, 
  mounted () {
    this.$socket.emit('db:photos', {action: 'index', asdf: true});
  }, 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.photos .field {
  width: fit-content;
  margin: 0 auto; 
  margin-top: 2em;
}
img.thumbnail {
  width: 200px; 
  height: 200px;
  padding: 5px;
}
</style>
