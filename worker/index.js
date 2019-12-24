const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  // attempt to reconnect
  retry_strategy: () => 1000
});
const sub = redisClient.duplicate();

function fib(index) {
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
}
//  any time a new message arrives, run the callback
sub.on('message', (channel, message) => {
  // calculate new fib and inset it into a hash called values 
  // keu message and value 
  redisClient.hset('values', message, fib(parseInt(message)));
});
// anytime a new value is inserte into redit
sub.subscribe('insert');
