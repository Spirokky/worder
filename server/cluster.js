const cluster = require('cluster');

const stopSignals = [
  'SIGHUP',
  'SIGINT',
  'SIGQUIT',
  'SIGILL',
  'SIGTRAP',
  'SIGABRT',
  'SIGBUS',
  'SIGFPE',
  'SIGUSR1',
  'SIGSEGV',
  'SIGUSR2',
  'SIGTERM'
];

const { NODE_ENV } = process.env;

const production = NODE_ENV === 'production';

let stopping = false;

cluster.on('disconnect', function() {
  if (production) {
    if (!stopping) cluster.fork();
  } else process.exit(1);
});

if (cluster.isMaster) {
  const workerCount = process.env.NODE_CLUSTER_WORKERS || 4;
  console.log(`Starting ${workerCount} workers...`);
  for (let i = 0; i < workerCount; i++) cluster.fork();

  if (production) {
    stopSignals.forEach(function(signal) {
      process.on(signal, function() {
        console.log(`Got ${signal}, stopping workers...`);
        stopping = true;
        cluster.disconnect(function() {
          console.log('All workers stopped, exiting.');
          process.exit(0);
        });
      });
    });
  }
} else require('./server.js');
