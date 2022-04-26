require('dotenv/config')
const cluster = require('cluster')
const cpus = require('os').cpus().length
const args = require('./services/args')
const { server } = require('./server.js')
const { connectIO } = require('./services/io.js')
const { initializeMongo } = require('./services/mongo.js')
const { initializeRedis } = require('./services/redis')

const bootstrap = async () => {
  if (process.env.DB === 'mongo' || process.env.SESSION_DRIVER === 'mongo') {
    await initializeMongo()
  }

  if (process.env.SESSION_DRIVER === 'redis') {
    await initializeRedis()
  }

  connectIO(server)
}

const startServer = () => {
  server.listen(args.port, () => {
    console.log(`Worker with pid ${process.pid} listening to port ${ args.port }`)
  })
}

bootstrap()

if (args.mode == 'cluster' &&  cluster.isPrimary) {
  console.log(`Master #${process.pid} is running`)

  for (let i = 0; i < cpus; i++) {
    cluster.fork()
  }


  let killedProcesses = 0
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died with code ${code}`)
    killedProcesses += 1

    if (killedProcesses == cpus) {
      process.exit()
    }
  })
}
else {
  startServer()
}