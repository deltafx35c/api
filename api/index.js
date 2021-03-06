const router = require('express').Router()

router.use(require('./users'))
router.use(require('./photos'))
router.use(require('./resources'))
router.use(require('./schedule'))
router.use(require('./chat'))

module.exports = router