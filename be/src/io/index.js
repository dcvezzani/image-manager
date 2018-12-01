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

    const withClient = (func) => {
      return (data={}) => func(client, data);
    };
        
		client.on('db:photos:index', withClient(photos.index));
	});

  console.log(`Socket IO started.  Waiting for clients to connect (${JSON.stringify(options)}).`);
};
    

