import socketIo from 'socket.io';
import photos from './photos.js';

export const io = (server) => {
  const options = { path: '/io-photos'};
	const io = socketIo(server, options);

	io.on('connection', function(client) {  
		console.log('Client connected...');

		client.on('join', function(data) {
			console.log(`join: ${JSON.stringify(data)}`);
			client.emit('joined', 'Greetings program');
		});

		client.on('error', function(err) {
			client.emit('err', {msg: 'Something bad happened with socket.io', err});
		});

    const withClient = (func) => {
      return (data={}) => func(client, data);
    };

		client.on(photos.prefix, payload => {
        if (photos[payload.action]) {
          return withClient(photos[payload.action])(payload)
        } else {
          console.log(client);
          client.emit('err', {msg: 'No io action handler defined', ...payload});
        }
    });
	});

  console.log(`Socket IO started.  Waiting for clients to connect (${JSON.stringify(options)}).`);
};
