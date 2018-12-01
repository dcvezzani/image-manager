import db from '../db'

const executeQuery = (query, options, callback) => {
  if (Photo.debug) console.log("query.toString()", query.toString());
  query.asCallback((err, rows) => {
    if (err) return callback({msg: 'Unable to execute query', raw: err, query: query.toString()});
    callback(err, rows);
  });
}

const all = (callback) => {
  let query = db('photos').select();
  // query.orderBy('name', 'asc')
  executeQuery(query, {}, callback)
}

const show = (id, callback) => {
  let query = db('photos').select({id});
  // query.orderBy('name', 'asc')
  executeQuery(query, {}, callback)
}

const create = (photo, callback) => {
  let query = db('photos').insert(photo);
  // query.orderBy('name', 'asc')
  executeQuery(query, {}, callback)
}

const Photo = {
  debug: false, 
	all, 
	show, 
	create, 
}

export default Photo
