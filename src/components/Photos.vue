<template>
  <div class="photos container">
    
<div class="field is-grouped">
  <div class="control">
    <button @click="test" class="button is-link">Submit</button>
  </div>
  <div class="control">
    <button class="button is-text">Cancel</button>
  </div>
</div>

    <img v-for="photo in photos" :key="photo.id" :src="photo.location" :alt="photo.name" class="thumbnail">
    
  </div>
</template>

<script>
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
    test: function(){
      console.log("test");
      this.$socket.emit('db:photos:index', {asdf: true});
    }, 
  }, 
  sockets:{
    'index-done': function(data){
      console.log('index was fetched', data)
      this.photos = data.payload;
    },
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
