const router = require('express').Router()

let wsSet = new Set()
router.ws('/echo', function (ws, req) {
  wsSet.add(ws)
  ws.on('pong', () => {
    ws.isAlive = true
  })
  ws.on('message', (msg) => {
    wsSet.forEach(wsNode => wsNode.send(msg))
  })
  ws.on('close', () => {
    wsSet.delete(ws)
  })

  const interval = setInterval(() => {
    wsSet.forEach((wsNode) => {
      if (wsNode.isAlive === false) return wsNode.terminate()
      wsNode.isAlive = false
      wsNode.ping()
    })
  }, 2000)
})

module.exports = router