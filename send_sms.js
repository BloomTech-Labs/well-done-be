// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = 'AC99e909241f2a0a8beef5ff8d2708a990';
const authToken = '4aa812bf4292f6b413e843fbdc3931f2';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+14845562641',
     to: '+16144990635'
   })
  .then(message => console.log(message.sid));
