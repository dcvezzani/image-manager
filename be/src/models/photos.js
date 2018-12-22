import db from '../db'

const TABLE_NAME = 'photos'

const executeQuery = (query, options, callback) => {
  if (Model.debug) console.log("query.toString()", query.toString());
  query.asCallback((err, rows) => {
    if (err) return callback({msg: 'Unable to execute query', raw: err, query});
    callback(err, rows);
  });
}

const Model = {
  debug: false, 
  all: (callback) => {
    let query = db(TABLE_NAME).select();
    // query.orderBy('name', 'asc')
    executeQuery(query, {}, callback)
  },

  show: (id, callback) => {
    let filter = id
    switch(typeof id) {
      case 'string': {
        filter = {id: parseInt(id)}
        break;
      }
      case 'number': {
        filter = {id}
        break;
      }
    }

    let query = db(TABLE_NAME).where(filter);
    // query.orderBy('name', 'asc')
    executeQuery(query, {}, callback)
  },

  create: (entry, callback) => {
    let query = db(TABLE_NAME).insert(entry);
    // query.orderBy('name', 'asc')
    executeQuery(query, {}, callback)
  },

  update: (entry, callback) => {
    const {recordedAt} = entry
    let query = db(TABLE_NAME).update(entry).where({id});
    // query.orderBy('name', 'asc')
    executeQuery(query, {}, callback)
  },

  destroy: (entry, callback) => {
    const {recordedAt} = entry
    let query = db(TABLE_NAME).where({id}).del();
    // query.orderBy('name', 'asc')
    executeQuery(query, {}, callback)
  },
}

export default Model

