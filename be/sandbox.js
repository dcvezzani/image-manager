import async from 'async'
import fs from 'fs'
import Photo from './src/models/photos'

// Photo.debug = true

const path = "/Users/dcvezzani/personal-projects/image-manager/data";
const files = {};
const fileNames = [];
const inserts = [];

async.series(
  {
    // from db
    fetchAllPhotos: (cb) => {
      Photo.all((err, rows) => {
        if (err) return cb(err, {msg: `err: ${err}`});
        rows.forEach(row => fileNames.push(row.name));
        console.log(fileNames);
        cb();
      });
    },

    // from filesystem
    gatherInserts: (cb) => {
      fs.readdir(path, function(err, items) {
        if (err) return cb(err, {msg: `Unable to read directory: ${path}`});
        items.filter(item => {
          return !fileNames.includes(item);
        }).forEach(item => {
          inserts.push({name: item, location: `http://localhost:7015/images/${item}`, description: 'some photo scraped from the web'})
        });
        cb();
      });
    },

    applyInserts: (cb) => {
      if (inserts.length === 0) return cb(`There are not any inserts to apply`);
      Photo.create(inserts, (err, rows) => {
        if (err) return cb(err, {msg: `Unable to apply inserts`});
        console.log(rows);
        cb();
      });
    },
  }, (err) => {
    if (err) return console.log(`err: ${err}`);
    console.log({fileNames, inserts});
	}
);
