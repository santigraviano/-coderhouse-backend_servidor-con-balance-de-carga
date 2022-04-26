const args = require('../services/args')
const os = require('os')

class MainController {
  index(req, res) {
    const { user } = req
    res.render('index', { user })
  }

  info(req, res) {
    const info = {
      args: JSON.stringify(args, null, 2),
      execPath: process.execPath,
      platform: process.platform,
      pid: process.pid,
      version: process.version,
      projectPath: process.cwd(),
      rss: JSON.stringify(process.memoryUsage(), null, 2),
      cpus: os.cpus().length
    }
    res.render('info', { info })
  }
}

module.exports = new MainController()