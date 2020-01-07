var admin = require('firebase-admin');
const serviceAccount = require('dotenv').config();

const firebaseToken = 'wellDoneToken';

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://welldone-795e5.firebaseio.com'
});

const payload = {
	notification: {
		title: 'Notification Title',
		body: 'This is an example notification'
	}
};

const options = {
	priority: 'high',
	timeToLive: 60 * 60 * 24 // 1 day
};

firebase
	.messaging()
	.sendToDevice(firebaseToken, payload, options)
	.then(function(response) {
		console.log('Successfully sent message', response);
	})
	.catch(function(error) {
		console.log('Error sending message:', error);
	});
