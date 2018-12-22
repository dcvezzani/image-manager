<template>
  <div class="photo container">
    <p>photo: {{id}}</p>
    <img v-if="photo" :src="photo.location" :alt="photo.name">
  </div>
</template>

<script>
import tinyToast from 'tiny-toast'
import { uuidv4 } from '../lib/utils'

export default {
  name: 'Photo',
  props: ['id'], 
  data () {
    return {
      msg: 'Welcome to Your Vue.js App', 
      photo: null,
      // responseQueue: {},
    }
  }, 
  methods:{
    test: function(){}, 
    test: function(){
      console.log("test");

      // const uuid = uuidv4()
      // const self = this
      // this.responseQueue[uuid] = () => {
      //   console.log('photo was fetched', data)
      //   self.photos = data.payload;
      // }
    }, 
  },
  sockets:{
    'db:photos:done': function(resp){
      const uuid = uuidv4()
      switch (resp.action) {
        case 'show': {
          console.log('photo was fetched', resp)
          this.photo = resp.payload;
          tinyToast.show('Photo was fetched').hide(3000)
          break
        }
        default:
          console.log('Warning: Unhandled socket action', resp)
      }
    },
  }, 
  mounted () {
    this.$socket.emit('db:photos', {action: 'show', payload: this.id})
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
