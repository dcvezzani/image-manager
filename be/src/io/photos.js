import Photo from '../models/photos'

const photos = {
  index: (client, data) => {
			console.log(`index: ${JSON.stringify(data)}`, { client, data });

      Photo.all((err, photos) => {
        client.emit('index-done', {payload: photos});
      })
  }, 
}

export default photos;
