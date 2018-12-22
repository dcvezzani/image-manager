import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Photos from '@/components/Photos'
import Photo from '@/components/Photo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, 
    {
      path: '/photos',
      name: 'Photos',
      component: Photos
    }, 
    {
      path: '/photo/:id',
      name: 'Photo',
      component: Photo, 
      props: true,
    }, 
  ]
})
