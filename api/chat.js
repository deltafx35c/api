const router = require('express').Router()

let wsSet = new Set()
router.ws('/echo', function (ws, req) {
  wsSet.add(ws)
  ws.on('pong', () => {
    ws.isAlive = true
    console.log(new Date() + ' pong')
  })
  ws.on('message', (msg) => {
    wsSet.forEach(wsNode => wsNode.send(msg))
  })
  ws.on('close', () => {
    wsSet.delete(ws)
  })
  ws.on('error', () => {
    wsSet.delete(ws)
    ws.terminate()
  })

  const interval = setInterval(() => {
    if (ws.isAlive === false || ws.readyState !== 1) {
      console.log('websocket has been closed')
      clearInterval(interval)
      return ws.terminate()
    }
    ws.isAlive = false
    ws.ping()
  }, 2000)
})

module.exports = router