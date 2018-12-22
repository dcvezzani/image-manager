import Model from '../models/photos'

const prefix = 'db:photos';

const actions = {
  prefix, 
  index: (client, data) => {
			console.log(`index:`, { data });

      Model.all((err, rows) => {
			  console.log(`all:`, { err, rows });
        client.emit(`${prefix}:done`, {err, payload: rows, action: data.action});
      })
  }, 
  show: (client, data) => {
			console.log(`show:`, { data });

      const id = data.payload
      console.log(">>>id", id);
      Model.show(id, (err, rows) => {
			  console.log(`show:`, { err, rows });
        client.emit(`${prefix}:done`, {err, payload: rows[0], action: data.action});
      })
  }, 
  save: (client, data) => {
			console.log(`save:`, { data });

      const {recordedAt} = data.payload
      Model.show({recordedAt}, (err, rows) => {
        if (err) return console.log(`error:`, { err, rows });

        if (rows.length === 0) {
          Model.create(data.payload, (err, rows) => {
            console.log(`created:`, { err, rows });
            client.emit(`${prefix}:done`, {err, payload: rows, action: data.action});
          })
        } else {
          Model.update(data.payload, (err, rows) => {
            console.log(`updated:`, { err, rows });
            client.emit(`${prefix}:done`, {err, payload: rows, action: data.action});
          })
        }
      })
  }, 
  load: (client, data) => {
			console.log(`load:`, { data });

      Model.show(data.payload, (err, rows) => {
			  console.log(`loaded:`, { err, rows });
        client.emit(`${prefix}:done`, {err, payload: rows, action: data.action});
      })
  }, 
  destroy: (client, data) => {
			console.log(`destroy:`, { data });

      Model.destroy(data.payload, (err, rows) => {
			  console.log(`destroyed:`, { err, rows });
        client.emit(`${prefix}:done`, {err, payload: rows, action: data.action});
      })
  }, 
}

export default actions;

